# Описание проекта
Это учебный проект, выполненный в ОТУС - программа JS-professional

## Задание
*Спроектируйте и создайте структуру БД с помощью PostgreSQL    
*БД должно хранить задачи, пользователей и комментарии пользователей   
*Приложение должно работать с БД, запрашивать и хранить сущности из нее   
*Создайте и добавьте определение Dockerfile для вашего приложения
*Создайте и добавьте конфигурацию docker-compose для запуска БД и проекта вместе локально    
*Создайте рабочий процесс Github Actions pipeline для установки (или другой CI/CD), сборки докера и тестирования проекта   
## В проекте использованы:
<a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="TypeScript" width="40" height="40" />
</a>
<a href="https://nodejs.org/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" alt="Node.js" width="40" height="40" />
</a>

<a href="https://babeljs.io/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/babel/babel-original.svg" alt="Babel" width="40" height="40" />
</a>

<a href="http://www.passportjs.org/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/passport/passport-original.svg" alt="Passport.js" width="40" height="40" />
</a>

<a href="https://www.npmjs.com/package/bcrypt" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bcrypt/bcrypt-original.svg" alt="bcrypt" width="40" height="40" />
</a>

<a href="https://expressjs.com/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" alt="Express" width="40" height="40" />
</a>

<a href="https://swagger.io/specification/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/swagger/swagger-original.svg" alt="Swagger" width="40" height="40" />
</a>

<a href="https://www.postgresql.org/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" width="40" height="40" />
</a>

<a href="https://typeorm.io/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="TypeORM" width="40" height="40" />
</a>



## Установка

1. Склонируйте репозиторий: `git clone https://github.com/protenot/OTUS-prof-docker`;

2. Перейдите в каталог проекта: ` cd OTUS-prof-docker`;

3. Установите зависимости: `yarn install`;

4. Перейдите в ветку git switch docker-deploy;

5. Найдите файл .env.example и переименуйте его в .env;

6. Уберите после знака "=" все символы, которые не являются буквами и цифрами;

7. Далее введите команду docker-compose build;

8. Далее введите команду docker-compose up;

9.Приложение будет доступно по адресу http://localhost:4001/register;


## Использование

В открывшемся окне вводим регистрационные данные, они автоматически заносятся в базу данных и нажимаем кнопку register;

Далее попадаем на страницу http://localhost:4001/login, где необходимо ввести логин и пароль

В случае успешной регистрации попадаем на главную страницу, где есть возможность разлогиниться.

## Доступные URL

По адресу http://localhost:4001/api-docs/ можно посмотреть какие REST запросы доступны.
Так как проект развернут в docker контейнере

http://localhost:4001/users

http://localhost:4001/comments

http://localhost:4001/tasks




### Проект задеплоен на Docker Hub



Проект был  задеплоен на hab.docker.com. Для запуска проекта необходимо использовать  docker-compose.yml

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
