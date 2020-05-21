FROM node:13

ENV PORT="9812"
ENV SHIBI_URL="https://api.thepublictransport.de/shibi/"

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn test
RUN yarn build:prod

EXPOSE 9812
CMD [ "yarn", "run:prod" ]
