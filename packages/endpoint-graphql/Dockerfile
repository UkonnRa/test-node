#FROM python:3-alpine AS builder
#
#RUN apk add --update nodejs npm
#RUN npm install -g yarn
#RUN yarn add sqlite3

FROM node:20-alpine

RUN yarn add pg

#COPY --from=builder node_modules/ node_modules/
COPY out/bin/ bin/
COPY out/bnf.json bnf.json

ENTRYPOINT ["node", "bin/main.js"]
