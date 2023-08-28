FROM nginx:1.15.8-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY .well-known /var/www/.well-known
#COPY cert /var/www/cert
