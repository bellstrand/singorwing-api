FROM node:6-slim

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY node_modules /usr/src/app/node_modules
COPY dist /usr/src/app/dist

EXPOSE 8000
CMD [ "npm", "start" ]
