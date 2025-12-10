FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app

RUN mkdir -p /app/logs /app/database

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/loader.js ./

EXPOSE 8000

ENV NODE_ENV=production
ENV PORT=8000
ENV LOG_FILE=logs/app.log

HEALTHCHECK --interval=10s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})" || exit 1

CMD ["node", "-r", "./loader.js", "dist/index.js"]
