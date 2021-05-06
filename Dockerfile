FROM node:alpine AS deps

WORKDIR /app

COPY ./ ./

RUN yarn

ENV NODE_ENV production

RUN yarn build

CMD yarn start
