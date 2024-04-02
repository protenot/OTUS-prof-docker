FROM node:20
WORKDIR /app
RUN mkdir -p /app

COPY  package*.json  ./

RUN yarn install --frozen-lockfile

COPY tsconfig.json ./
COPY src ./src


RUN yarn run build


CMD [ "node", "./dist/index.js" ]