# Остановка и удаление существующих контейнеров
docker-compose -f docker-compose.yml down

# Запуск контейнеров для тестов
docker-compose -f docker-compose.yml up -d --build

# Ожидание готовности базы данных (пример с PostgreSQL)
docker-compose -f docker-compose.yml exec -T app-container wait-for-it -t 0 otusdb-container:5432


# Запуск тестов (пример с использованием Jest)
docker-compose -f docker-compose.yml run --rm app yarn run test api.test.js

# Остановка контейнеров после тестирования
docker-compose -f docker-compose.yml down
