# Vercel Deployment Guide - EISHRO Platform

## 📋 Overview

نشر التطبيق بالكامل (Frontend + Backend) على Vercel مع Supabase PostgreSQL للقاعدة البيانات.

## ✅ Prerequisites

- حساب GitHub مع الـ repository
- حساب Vercel (vercel.com)
- حساب Supabase (مع project قائم)
- Supabase Connection String جاهزة

## 🎯 Step 1: تحضير الـ Backend

### 1.1 التأكد من التحديثات

تم تحديث الملفات التالية بالفعل:
- ✅ `backend/src/config/database.ts` - PostgreSQL support
- ✅ `backend/.env` - Supabase credentials
- ✅ `backend/.env.example` - معايير الـ production

### 1.2 إضافة pg driver

ستحتاج لتثبيت PostgreSQL driver:

```bash
cd backend
npm install pg
```

### 1.3 اختبار الاتصال محلياً

```bash
node test-mysql-connection.js
```

يجب أن ترى رسالة نجاح ✅

## 🚀 Step 2: نشر Backend على Vercel

### 2.1 إنشاء API Routes

أنشئ ملف `api/index.ts` في Backend (إذا لم يكن موجوداً):

```typescript
// backend/api/index.ts
import app from '../src/app';

export default app;
```

### 2.2 إنشاء `vercel.json` في Backend

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "api/index.ts"
    }
  ],
  "env": {
    "DB_DIALECT": "postgres",
    "DB_HOST": "@db_host",
    "DB_PORT": "5432",
    "DB_USER": "@db_user",
    "DB_PASSWORD": "@db_password",
    "DB_NAME": "@db_name",
    "NODE_ENV": "production"
  }
}
```

### 2.3 الدخول إلى Vercel Dashboard

1. اذهب إلى [vercel.com/dashboard](https://vercel.com/dashboard)
2. اضغط "New Project"
3. اختر GitHub repository

### 2.4 إضافة Environment Variables

في Vercel Dashboard:
1. اذهب إلى **Settings** → **Environment Variables**
2. أضف المتغيرات التالية:

| Variable | Value |
|----------|-------|
| `DB_DIALECT` | `postgres` |
| `DB_HOST` | `db.pwkgwjzakgibztwsvbjf.supabase.co` |
| `DB_PORT` | `5432` |
| `DB_USER` | `postgres` |
| `DB_PASSWORD` | `@Dm1ns$$2025` |
| `DB_NAME` | `postgres` |
| `JWT_SECRET` | `your-secret-key-here` |
| `FRONTEND_PRODUCTION_URL` | `https://ishro.ly` |
| `NODE_ENV` | `production` |

### 2.5 Deploy

```bash
cd backend
git add .
git commit -m "Setup Vercel deployment with Supabase PostgreSQL"
git push origin main
```

سيبدأ Vercel التخصيص تلقائياً.

## 🎨 Step 3: نشر Frontend على Vercel

### 3.1 إنشاء `vercel.json` في Frontend

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build"
    }
  ],
  "routes": [
    {
      "src": "/assets/(.*)",
      "dest": "/assets/$1",
      "headers": {
        "cache-control": "public, immutable, max-age=31536000"
      }
    },
    {
      "src": "/(.*)",
      "dest": "/index.html",
      "status": 200
    }
  ],
  "env": {
    "VITE_API_URL": "@vite_api_url"
  }
}
```

### 3.2 تحديث `.env.production` في Frontend

```env
VITE_API_URL=https://your-backend-vercel-domain.vercel.app/api
```

**ملاحظة**: استبدل `your-backend-vercel-domain` برابط Backend الفعلي من Vercel

### 3.3 إضافة Build Script

في `frontend/package.json`:

```json
"scripts": {
  "build": "vite build"
}
```

### 3.4 Deploy Frontend

```bash
cd frontend
git add .
git commit -m "Setup Vercel deployment"
git push origin main
```

## 🔗 Step 4: ربط الدومين ishro.ly

### 4.1 في Vercel Dashboard

1. اذهب إلى Project
2. **Settings** → **Domains**
3. أضف `ishro.ly` و `www.ishro.ly`

### 4.2 تحديث DNS في CPanel

**للـ Frontend (ishro.ly):**

في **CPanel** → **Zone Editor**:

| Type | Name | Value |
|------|------|-------|
| CNAME | ishro.ly | `cname.vercel-dns.com.` |
| CNAME | www.ishro.ly | `ishro.ly` |

**للـ Backend API:**

إذا أردت subdomain منفصل:

| Type | Name | Value |
|------|------|-------|
| CNAME | api.ishro.ly | `cname.vercel-dns.com.` |

### 4.3 انتظر التحقق

قد يستغرق 24-48 ساعة للتحقق من DNS.

## ✔️ Step 5: التحقق من الصحة

### 5.1 اختبر Frontend

```bash
curl https://ishro.ly
```

### 5.2 اختبر API Health

```bash
curl https://your-backend-url.vercel.app/health
```

يجب أن ترى:

```json
{
  "status": "ok",
  "timestamp": "2025-12-10T23:40:00.000Z",
  "environment": "production"
}
```

### 5.3 اختبر Database Connection

```bash
# تحقق من logs في Vercel Dashboard
# يجب أن ترى: ✅ Database connection established successfully
```

## 🆘 Troubleshooting

### المشكلة: "Database connection failed"

**الحل:**
1. تحقق من Supabase credentials في Vercel Environment Variables
2. تأكد أن IP Vercel مسموح في Supabase (عادة يكون مسموح تلقائياً)
3. اختبر الاتصال محلياً أولاً

### المشكلة: CORS Error

**الحل:**

تحديث `backend/src/app.ts`:

```typescript
const corsOptions = {
  origin: (origin: string | undefined, callback) => {
    const allowedOrigins = [
      'https://ishro.ly',
      'https://www.ishro.ly',
      'http://localhost:5173',
    ];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
```

### المشكلة: "502 Bad Gateway"

**الحل:**
1. تحقق من logs في Vercel
2. تأكد من وجود `/health` endpoint
3. قد تحتاج لزيادة timeout

```json
{
  "functions": {
    "api/index.ts": {
      "maxDuration": 60
    }
  }
}
```

## 📚 Useful Commands

```bash
# عرض logs من Vercel محلياً
vercel logs <project-url>

# اختبر محلياً قبل الـ deploy
npm run build
npm run dev

# تحقق من environment variables
vercel env pull
```

## 🎉 نجاح!

إذا وصلت هنا، معناه:
- ✅ Frontend يعمل على ishro.ly
- ✅ Backend يعمل على Vercel
- ✅ Database متصل بـ Supabase
- ✅ DNS مُعدّل بشكل صحيح

---

**ملاحظات مهمة:**
1. لا تنسى تحديث VITE_API_URL في Frontend عند استقرار البيانات
2. راقب Vercel logs لأي مشاكل
3. Supabase يوفر نسخ احتياطية تلقائية
4. استخدم Redis إذا أردت caching أفضل (خيارات بائعين آخرين)
