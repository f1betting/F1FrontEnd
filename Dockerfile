FROM node:18

WORKDIR /usr/src/app

COPY . ./
COPY .env.prod ./.env

RUN yarn

RUN yarn generate-client

EXPOSE 80

RUN yarn build

CMD [ "yarn", "dev" ]