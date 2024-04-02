FROM node:20
WORKDIR /app


COPY  package*.json  ./

RUN yarn install --frozen-lockfile

COPY tsconfig.json ./
COPY src ./src
COPY dist/views /app/dist/views

RUN yarn run build


CMD [ "node", "./dist/index.js" ]