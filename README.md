# umi project

## Getting Started

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```
# umi-react-eslint-app

https://blog.csdn.net/sinat_28371057/article/details/112450351

```
podman run \
--name mynginx \
--privileged=true \
-v /root:/root \
-v /etc/nginx:/etc/nginx \
-p 80:80 \
-p 443:443 \
-d nginx
```



server {
  listen 80;
  server_name localhost;

  root /root/retro/dist;
  index index.html index.htm;

  location / {
    proxy_pass http://127.0.0.1:3101;
  }
  location /api {
    proxy_pass http://127.0.0.1:3101;
  }
}


```

server {
  listen 80;
  server_name react.mobi;
  rewrite ^(.*)$ https://${server_name}$1 permanent; 
}

server {
    listen 443 ssl http2;
    server_name react.mobi;

    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;

    location /api {
			proxy_pass http://127.0.0.1:3101;
    }

    location / {
      root /root/retro/dist/index.html;
      index index.html index.htm;
      # http2_push /style.css;
      # http2_push /example.png;
    }
}
```

https://www.digitalocean.com/community/tools/nginx?domains.0.server.domain=react.mobi&domains.0.server.path=%2Froot%2Fretro&domains.0.server.documentRoot=%2Fdist&domains.0.https.certType=custom&domains.0.https.sslCertificate=%2Fetc%2Fnginx%2Fssl%2Fcert.pem&domains.0.https.sslCertificateKey=%2Fetc%2Fnginx%2Fssl%2Fkey.pem&domains.0.php.php=false&domains.0.reverseProxy.reverseProxy=true&domains.0.reverseProxy.path=%2Fapi&domains.0.reverseProxy.proxyPass=http%3A%2F%2F127.0.0.1%3A3101&domains.0.routing.index=index.html&domains.0.routing.fallbackPhp=false&domains.0.routing.fallbackPhpPath=&domains.0.logging.accessLog=true&domains.0.logging.errorLog=true&global.https.letsEncryptCertRoot=%2Fetc%2Fnginx%2Fssl%2F&global.nginx.user=nginx&global.nginx.pid=%2Fvar%2Frun%2Fnginx.pid&global.docker.dockerfile=true&global.app.lang=zhCN


mkdir /etc/nginx

mkdir /etc/nginx/ssl

acme.sh --install-cert -d react.mobi \
--key-file       /etc/nginx/ssl/key.pem  \
--fullchain-file /etc/nginx/ssl/cert.pem

openssl dhparam -out /etc/nginx/dhparam.pem 2048

echo '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' | base64 --decode | tee /etc/nginx/nginxconfig.io-react.mobi.tar.gz > /dev/null

tar -xzvf nginxconfig.io-react.mobi.tar.gz | xargs chmod 0644

# 实时监听日志
tail -f 

# 一键更新nginx
podman stop mynginx
podman rm mynginx  
podman run \
--name mynginx \
--privileged=true \
-v /root:/root \
-v /etc/nginx:/etc/nginx \
-p 80:80 \
-p 443:443 \
-d nginx
podman logs mynginx  

# ngixn 转发的路径问题
https://www.cnblogs.com/wjoyxt/p/11949943.html

# docker nginx访问宿主机
ifconfig，查看容器ip，那个地址可以访问宿主机
