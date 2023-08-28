FROM node:16-alpine as BASE

WORKDIR /app
COPY package.json ./
RUN npm install

FROM node:16-alpine AS BUILD

WORKDIR /app
COPY --from=BASE /app/node_modules ./node_modules
COPY . .
RUN npm run build \
    && rm -rf node_modules \
    && npm install --production --ignore-scripts

FROM node:16-alpine AS PRODUCTION

WORKDIR /app

COPY --from=BUILD /app/package.json ./
COPY --from=BUILD /app/node_modules ./node_modules
COPY --from=BUILD /app/.next ./.next
COPY --from=BUILD /app/public ./public

EXPOSE 3000

CMD ["npm", "run", "start"]