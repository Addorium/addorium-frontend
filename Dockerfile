# Stage 1: Builder
FROM node:20.11.1-alpine AS builder

WORKDIR /app

# Установка зависимостей
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Копирование исходного кода и сборка
COPY . .
RUN yarn build

# Stage 2: Production
FROM node:20.11.1-alpine AS production

WORKDIR /app

# Копирование собранного приложения и установленных зависимостей
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Копирование остальных файлов (например, статических ресурсов)
COPY --from=builder /app/public ./public

# Установка переменной окружения для production
ENV NODE_ENV=production

# Запуск приложения
CMD ["yarn", "start"]

EXPOSE 3000
