'use strict';

const _ = require('lodash');
const request = require('co-request');
const redis = require('../lib/redis');

let Ip = module.exports = {};

// 缓存前缀
Ip._cache_prefix = 'ip:';

// 获取缓存 Key
Ip.getCacheKeyByIp = function (ip) {
  return this._cache_prefix + ip;
};

// 通过 IP 获取缓存
Ip.getCacheByIpAsync = function* (ip) {
  let cache_key = this.getCacheKeyByIp(ip);
  let cache = yield redis.get(cache_key);
  return cache ? JSON.parse(cache) : null;
};

// 通过 IP 设置缓存
Ip.setCacheByIpAsync = function* (ip, data) {
  let cache_key = this.getCacheKeyByIp(ip);
  return yield redis.set(cache_key, JSON.stringify(data), 'EX', 604800);
};

// 通过 IP 删除缓存
Ip.removeCacheByIpAsync = function* (ip) {
  let cache_key = this.getCacheKeyByIp(ip);
  return yield redis.del(cache_key);
};

// 获取 IP 所在地
Ip.getLocationAsync = function* (ip) {
  let res;
  try {
    let url = 'http://ip.taobao.com/service/getIpInfo.php';
    let result = yield request(url, {qs: {ip}});
    res = JSON.parse(result.body);
  } catch (err) {
    return false;
  }

  if (!_.isObject(res) || res.code !== 0) {
    return false;
  }

  return res.data;
};

// 通过缓存获取所在地
Ip.getLocationWithCacheAsync = function* (ip) {
  // 从缓存中读取
  let location = yield this.getCacheByIpAsync(ip);

  // 实时读取
  if (!location) {
    location = yield this.getLocationAsync(ip);
  }

  if (!location) {
    return false;
  }

  // 写入缓存
  yield this.setCacheByIpAsync(ip, location);

  return location;
};
