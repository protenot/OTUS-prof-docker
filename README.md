# Проект задеплоен на Docker Hub

Проект был успешно задеплоен на hab.docker.com. Для запуска проекта необходимо использовать  docker-compose.yml

## Команды для копирования образов

Для получения образов проекта, выполните следующие команды:

```bash
docker pull protenot/node
docker pull protenot/postgres

```yml
version: "3.8"

services:
  otusdb:
    container_name: postgres-container
    image: protenot/postgres
    deploy:
      mode: global
    restart: unless-stopped
    tty: true
    environment:
      - DB_HOST=otusdb
      - POSTGRES_USER=${DB_USERNAME}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
      - POSTGRES_DB=${DB_DATABASE}
    volumes:
      - otusdb:/var/lib/postgresql/data

  app:
    container_name: node-container
    image: protenot/node
    ports:
      - 4000:4000
    depends_on:
      - otusdb
    environment:
      - NODE_ENV=development
      - PORT=4000
      - DB_HOST=${DB_HOST}
      - DB_USER=${DB_USERNAME}
      - DB_PASSWORD=${DB_PASSWORD}
      - DB_NAME=${DB_DATABASE}
      - SESSION_SECRET=${SESSION_SECRET}

volumes:
  otusdb:
  env-volume:
    external: true
