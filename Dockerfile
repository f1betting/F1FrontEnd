FROM node:18

WORKDIR /usr/src/app

COPY . ./
RUN yarn

EXPOSE 80

RUN yarn build

CMD [ "yarn", "dev" ]