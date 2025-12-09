# ⚡ البدء السريع - النشر على ishro.ly

## **الخطوات الموجزة (5 دقائق)**

### 1️⃣ تحضير محلي (5 دقائق)
```bash
# تثبيت المتطلبات
npm install && cd backend && npm install && cd ..

# بناء Frontend
npm run build

# الملفات المُنتجة:
# - dist/          (الواجهة الأمامية)
# - backend/       (السيرفر)
```

### 2️⃣ تسجيل الدخول لـ CPanel
- **URL:** https://102.213.180.22:2083
- **User:** ghoutni@gmail.com
- **Pass:** @Dm1ns$$2025

### 3️⃣ رفع المشروع
```
File Manager → Upload → اختر المشروع → Extract
```

### 4️⃣ إعداد قاعدة البيانات
```
MySQL Databases:
- Database: ishro_production
- User: ishro_user
- Password: (قوية)
- حدد جميع الصلاحيات
```

### 5️⃣ تشغيل Backend
```bash
npm install -g pm2
pm2 start ecosystem.config.js --env production
pm2 save
```

### 6️⃣ تفعيل SSL
```
CPanel → Domains → AutoSSL → Check & Install
```

### ✅ اختبار
```
https://www.ishro.ly
```

---

## **ملفات مهمة**

| الملف | الوصف |
|------|------|
| `.env.production` | إعدادات الإنتاج |
| `ecosystem.config.js` | إعدادات PM2 |
| `CPANEL_DEPLOYMENT.md` | شرح مفصل |

---

## **النقاط المهمة**

⚠️ **تحديد المنفذ:**
- 2083 = CPanel
- 3000 = Node.js (اختيار)

💡 **تفعيل Reverse Proxy:**
```
ProxyPass / http://localhost:3000/
```

🔒 **SSL إلزامي:**
- بدون SSL لن يعمل Google OAuth

---

**المساعدة:** اقرأ `CPANEL_DEPLOYMENT.md` للتفاصيل الكاملة
