# 简单的反向代理

### 名词解析

在计算机网络中，反向代理是代理服务器的一种。它根据客户端的请求，从后端的服务器上获取资源，然后再将这些资源返回给客户端。与前向代理不同，前向代理作为一个媒介将互联网上获取的资源返回给相关联的客户端，而反向代理是在服务器端作为代理使用，而不是客户端。 --- 《维基百科》

### 主要用途

* 在一个内网中，假如只有少部分电脑有公网IP，内网中的其他电脑如果也需要对外提供服务
* 同一台电脑上的多个程序都需要监听 80 端口时，导致冲突

本人的需求：

* 由于我们在学校实验室用的是校园网，在宿舍用的非校园网，自己或者周围同学的电脑或多或少的当服务器用，当回到宿舍时，当需要访问自己或者同学的电脑时，无法访问
* 学校很多网站都只是对内网开放，有时在非校园网时非常需要

试过的一些解决方案

* 最初时使用 `Nginx` 进行反向代理，自己一个人用还好，多个人使用，其它人对命令行可能不太熟悉
* 后来又用 `SSH -L` `SSH -R` 代理单个站点
* 也用过用 `SSH -D` 进行代理整个内网
* 后来也选用过 Ngrok (非常不错，但是自己没有通配 SSL 证书)

### 特性

* 支持 HTTP -> HTTP
* 支持 HTTP -> HTTPS
* 支持 HTTPS -> HTTP
* 支持 HTTPS -> HTTPS
* 支持 WEB界面管理
* 支持配置单个域名 SSL 证书
* 支持配置 Hostname

### 截图

![截图](/client/imgs/pic2.png)

![截图](/client/imgs/pic1.png)

#### 存在的问题

* 为了自己和同学方便，目前是使用微信企业号扫码登陆，但是对第三方开发不方便
* 不支持通配域名

#### License

MIT
