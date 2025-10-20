# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Run
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --omit=dev

# 🔹 Запускаємо NestJS і потім сідер (одразу в контейнері)
CMD node dist/main.js & sleep 5 && node dist/seed/seed.js


