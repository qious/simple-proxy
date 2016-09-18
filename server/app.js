'use strict';

// eslint-disable-next-line
process.env.NODE_CONFIG_DIR= __dirname +'/config';

const http = require('http');
const https = require('https');

const config = require('config');
const bodyParser = require('body-parser');

const app = require('./lib/express')();
const mws = require('./middleware');
const ProxyService = require('./service').Proxy;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// 处理代理
app.use(mws.proxy());

// 加载 Session
app.use(mws.session());

// 加载路由
app.use(mws.router());

// 错误处理
app.use(mws.errorHandle());

if (!module.parent) {
  if (config.http) {
    let http_server = http.createServer(app);
    http_server.listen(config.http.port, config.host);
    // eslint-disable-next-line
    console.log(`Server listen on http://${config.domain}:${config.http.port}`);
  }

  if (config.https) {
    let options = {SNICallback: ProxyService.SNICallback};
    let https_server = https.createServer(options, app);
    https_server.listen(config.https.port, config.host);
    // eslint-disable-next-line
    console.log(`Server listen on https://${config.domain}:${config.https.port}`);
  }
} else {
  module.exports = http.createServer(app);
}
