FROM node:20
WORKDIR /app

COPY  package*.json  ./
RUN yarn install --frozen-lockfile

COPY tsconfig.json ./
COPY src ./src
COPY dist/src/views /app/dist/src/views
RUN yarn run build
EXPOSE 4000

CMD [ "node", "./dist/src/index.js" ]