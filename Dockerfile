FROM node:14.9.0-alpine

WORKDIR /home/api

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . /home/api

CMD ["npm", "run","dev"]