FROM node:20.10.0

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm i

CMD [ "npm", "run", "dev" ]
