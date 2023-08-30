FROM node:16-alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npx hardhat compile
CMD ["npm", "run", "dev"]