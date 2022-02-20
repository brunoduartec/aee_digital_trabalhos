FROM node:17.4-alpine

WORKDIR /app


COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=production

EXPOSE 3100

CMD ["npm", "start"]