FROM node:alpine AS build-stage

ARG NEXT_PUBLIC_IP_TOKEN
ENV NODE_ENV=production

WORKDIR /project
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine AS production-stage
COPY --from=build-stage /project/out/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /project/out /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
