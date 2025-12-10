# ==========================================
# 🚀 MULTI-STAGE DOCKERFILE FOR FLY.IO
# ==========================================
# هذا الملف يبني صورة Docker مُحسّنة للـ Backend

# ==========================================
# المرحلة 1: BUILD STAGE
# ==========================================
FROM node:18-alpine AS builder

# تحديد مجلد العمل
WORKDIR /app

# نسخ ملفات package للاستفادة من Docker cache
COPY package*.json ./

# تثبيت المكتبات فقط للإنتاج
RUN npm ci --only=production --omit=dev

# نسخ باقي الملفات
COPY . .

# بناء التطبيق (إذا كان TypeScript)
RUN if [ -f "tsconfig.json" ]; then \
    npm install --save-dev typescript @types/node && \
    npm run build; \
    fi

# ==========================================
# المرحلة 2: PRODUCTION STAGE
# ==========================================
FROM node:18-alpine

# تثبيت المكتبات الأساسية
RUN apk add --no-cache \
    ca-certificates \
    tzdata

# إنشاء مستخدم غير root لتشغيل التطبيق (أمان)
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# تحديد مجلد العمل
WORKDIR /app

# نسخ node_modules من مرحلة البناء
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules

# نسخ الملفات المبنية أو الأصلية
COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./

# إذا كان هناك ملف dist (TypeScript مبني)
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist 2>/dev/null || true

# إذا كان JavaScript مباشر
COPY --from=builder --chown=nodejs:nodejs /app/*.js ./ 2>/dev/null || true
COPY --from=builder --chown=nodejs:nodejs /app/app.ts ./app.ts 2>/dev/null || true
COPY --from=builder --chown=nodejs:nodejs /app/index.ts ./index.ts 2>/dev/null || true

# نسخ ملف server.js إذا كان موجود
COPY --chown=nodejs:nodejs server.js ./server.js 2>/dev/null || true

# نسخ المجلدات الضرورية
COPY --from=builder --chown=nodejs:nodejs /app/public ./public 2>/dev/null || true
COPY --from=builder --chown=nodejs:nodejs /app/backend ./backend 2>/dev/null || true

# إنشاء مجلدات uploads و logs
RUN mkdir -p /app/uploads /app/logs && \
    chown -R nodejs:nodejs /app/uploads /app/logs

# التبديل للمستخدم غير root
USER nodejs

# فتح المنفذ 8080
EXPOSE 8080

# متغير البيئة للمنفذ
ENV PORT=8080
ENV NODE_ENV=production

# ==========================================
# 🚀 STARTUP COMMAND
# ==========================================
# يحاول تشغيل التطبيق من عدة مسارات محتملة

CMD if [ -f "dist/index.js" ]; then \
        node dist/index.js; \
    elif [ -f "backend/dist/index.js" ]; then \
        node backend/dist/index.js; \
    elif [ -f "server.js" ]; then \
        node server.js; \
    elif [ -f "index.js" ]; then \
        node index.js; \
    elif [ -f "app.js" ]; then \
        node app.js; \
    else \
        echo "❌ No entry point found!" && exit 1; \
    fi

# ==========================================
# 📝 BUILD INSTRUCTIONS:
# ==========================================
# لبناء الصورة محلياً:
# docker build -t eishro-backend .
#
# لتشغيل الصورة محلياً:
# docker run -p 8080:8080 --env-file .env.fly.production eishro-backend
#
# على Fly.io:
# fly deploy (يبني ويرفع تلقائياً)
