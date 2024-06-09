#standalone container
FROM node:alpine as dev

WORKDIR /app

COPY package.json /app
COPY pnpm-lock.yaml /app

RUN npm install -g pnpm
RUN pnpm install

COPY . /app

RUN pnpm run build

EXPOSE 4004

CMD [ "pnpm", "start" ]

# common container
FROM node:alpine as prod

WORKDIR /coffeedoor-api-gateway

COPY ./coffeedoor-api-gateway/package.json /coffeedoor-api-gateway
COPY ./coffeedoor-api-gateway/pnpm-lock.yaml /coffeedoor-api-gateway
COPY ./coffeedoor-api-gateway/tsconfig.json tsconfig.json
COPY ./coffeedoor-api-gateway/nest-cli.json nest-cli.json

RUN npm install -g pnpm
RUN pnpm install

COPY /coffeedoor-api-gateway /coffeedoor-api-gateway

RUN pnpm run build

EXPOSE 4004
CMD [ "pnpm", "start" ]


# npm config set registry https://registry.npmjs.org/
# npm config set strict-ssl false


# kubernetes container
# FROM node:alpine

# WORKDIR /app

# COPY package.json /app
# COPY pnpm-lock.yaml /app

# RUN npm install -g pnpm
# RUN pnpm install

# COPY . /app 

# RUN pnpm run build

# CMD ["node", "dist/main"]