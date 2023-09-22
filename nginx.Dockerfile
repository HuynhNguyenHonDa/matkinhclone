FROM nginx:1.15.8-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY cert/matkinhbaotin.com.pem /etc/ssl/certs/matkinhbaotin.com.pem
COPY cert/private.key /etc/ssl/private/private.key
