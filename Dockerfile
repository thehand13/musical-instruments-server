FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install -g cross-env

RUN npm install

COPY . .

COPY static static

CMD ["npm","run", "start:dev"]