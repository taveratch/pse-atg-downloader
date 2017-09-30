FROM node:8.6.0-slim

WORKDIR /app

COPY ./build/ build/
COPY package.json .

RUN npm install --dev

ADD ./proxy-server/ proxy-server/

WORKDIR /app/proxy-server

RUN npm install

WORKDIR /app

EXPOSE 5000

CMD ["npm", "run", "start"]
