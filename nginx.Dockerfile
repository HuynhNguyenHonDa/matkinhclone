FROM nginx:1.15.8-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
