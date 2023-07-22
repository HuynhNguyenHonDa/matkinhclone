FROM node:14.21.1 AS builder

# set working directory
WORKDIR /app

COPY . ./
COPY package*.json ./
COPY tsconfig.json ./
# RUN npm install --dev typescript && npm install
RUN npm install --also=dev typescript && npm install

ARG REACT_APP_HOST_IP_ADDRESS

ENV REACT_APP_ENVIRONMENT $REACT_APP_ENVIRONMENT

RUN npm run build

# expose port
EXPOSE 3000

FROM nginx:1.15.8-alpine
COPY --from=builder /app/build /usr/share/nginx/html
# to make react-router work with nginx
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
