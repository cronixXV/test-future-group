# 1. Используем Node.js для сборки
FROM node:20-alpine AS build

# 2. Устанавливаем рабочую директорию
WORKDIR /app

# 3. Копируем package.json и package-lock.json
COPY package.json package-lock.json ./

# 4. Устанавливаем зависимости
RUN npm install --frozen-lockfile

# 5. Копируем код проекта
COPY . .

# 6. Собираем production-версию
RUN npm run build

# 7. Используем Nginx для раздачи статики
FROM nginx:1.25-alpine

# 8. Копируем файлы сборки в Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# 10. Открываем порт
EXPOSE 80


