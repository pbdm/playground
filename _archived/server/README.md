# 存下远古版本的 server 配置

* 修改`/etc/nginx/sites-available/default`文件，在`serve`的框里面的空行中输入：

```sh
location /update {
    proxy_pass http://127.0.0.1:22222/github;
}
```

* `/etc/init.d/nginx restart`

* `npm install -g github-webhook-handler`

* `npm link github-webhook-handler`

* `npm install -g forever`

* `apt-get install nodejs-legacy`

* `forever start deploy.js`