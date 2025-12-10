FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 8080

ENV NODE_ENV=production
ENV PORT=8080

CMD ["node", "-r", "tsconfig-paths/register", "dist/index.js"]
