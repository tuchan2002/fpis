FROM node:16-alpine as build-stage

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.17-alpine as production-stage

COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 5000
CMD ["nginx", "-g", "daemon off;"]