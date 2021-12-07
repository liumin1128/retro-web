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
