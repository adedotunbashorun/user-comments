FROM node:16-alpine as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .
COPY ./docker/run.sh /usr/bin/run.sh
RUN chmod +x /usr/bin/run.sh

CMD /usr/bin/run.sh