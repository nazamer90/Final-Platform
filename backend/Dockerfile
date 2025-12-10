FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build || true

FROM node:18-alpine

WORKDIR /app

RUN mkdir -p /app/logs /app/database

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/loader.js ./
COPY --from=builder /app/healthcheck.js ./
COPY --from=builder /app/start.js ./

EXPOSE 8000

ENV NODE_ENV=production
ENV PORT=8000
ENV LOG_FILE=logs/app.log
ENV LOG_LEVEL=info

HEALTHCHECK --interval=10s --timeout=5s --start-period=30s --retries=5 \
  CMD node healthcheck.js

CMD ["node", "start.js"]
