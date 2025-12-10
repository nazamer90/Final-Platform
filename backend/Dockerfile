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
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/loader.js ./loader.js

EXPOSE 8000

ENV NODE_ENV=production
ENV PORT=8000

CMD ["node", "-r", "./loader.js", "dist/index.js"]
