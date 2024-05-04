#standalone container
FROM node:18 as dev

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install

COPY . /app

RUN npm run build

EXPOSE 4004
# CMD [ "npm", "run", "start:dev" ]
CMD [ "npm", "start" ]

# common container
FROM node:18 as prod

WORKDIR /coffeedoor-api-gateway

COPY ./coffeedoor-api-gateway/package.json /coffeedoor-api-gateway
COPY ./coffeedoor-api-gateway/package-lock.json /coffeedoor-api-gateway
COPY ./coffeedoor-api-gateway/tsconfig.json tsconfig.json
COPY ./coffeedoor-api-gateway/nest-cli.json nest-cli.json

RUN npm install

COPY /coffeedoor-api-gateway /coffeedoor-api-gateway

RUN npm run build

EXPOSE 4004
CMD [ "npm", "start" ]


# npm config set registry https://registry.npmjs.org/
# npm config set strict-ssl false