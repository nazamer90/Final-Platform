# 🚀 EISHRO Platform - Production Deployment Guide

> **حالة المشروع:** جاهز للإنتاج ✅  
> **آخر تحديث:** 2025-12-09  
> **الإصدار:** 1.0.0

---

## 📋 **المحتويات**

1. [معلومات الخادم](#معلومات-الخادم)
2. [الملفات المهمة](#الملفات-المهمة)
3. [خطوات النشر](#خطوات-النشر)
4. [الاختبار](#الاختبار)
5. [استكشاف الأخطاء](#استكشاف-الأخطاء)

---

## **معلومات الخادم**

```
🌐 Domain: ishro.ly & www.ishro.ly
🖥️  Server IP: 102.213.180.22
🔐 CPanel: https://102.213.180.22:2083
👤 CPanel User: ghoutni@gmail.com
🔑 Port: 3000 (Node.js)
💾 Database: MySQL/MariaDB
🏠 Hosting: Cloud Shared Hosting
```

---

## **الملفات المهمة**

| الملف | الوصف | متى يُستخدم |
|------|------|-----------|
| `.env` | تطوير محلي | `npm run dev` |
| `.env.production` | إنتاج | بعد الرفع على CPanel |
| `ecosystem.config.js` | إعدادات PM2 | لتشغيل Backend |
| `CPANEL_DEPLOYMENT.md` | شرح مفصل **مهم جداً** | قراءة شاملة قبل الرفع |
| `QUICK_START.md` | خطوات موجزة | للبدء السريع |
| `startup.sh` | سكريبت البدء | في خادم CPanel |
| `build-production.bat` | بناء محلي | على الجهاز الشخصي |

---

## **خطوات النشر**

### **Phase 1: تحضير محلي (على جهازك)**

#### الخطوة 1: بناء المشروع
```bash
# فتح CMD أو PowerShell في مجلد المشروع
cd c:\Users\dataf\Downloads\Eishro-Platform_V7

# تشغيل البناء
build-production.bat
```

#### الخطوة 2: إنشاء ملف ZIP
```
1. انقر بزر اليمين على مجلد المشروع
2. اختر "Send to" → "Compressed folder"
3. اسم الملف: Eishro-Platform.zip
```

---

### **Phase 2: النشر على CPanel**

#### الخطوة 1: تسجيل الدخول
1. اذهب إلى: `https://102.213.180.22:2083`
2. أدخل البيانات:
   - User: `ghoutni@gmail.com`
   - Pass: `@Dm1ns$$2025`
3. ادخل رمز التحقق (من البريد)

#### الخطوة 2: رفع المشروع
```
CPanel → File Manager → Upload
```
- اختر `Eishro-Platform.zip`
- انتظر الرفع الكامل
- اضغط كليك يمين → Extract

#### الخطوة 3: إنشاء قاعدة البيانات

```
CPanel → MySQL Databases
```

**أ. إنشاء Database:**
- Name: `ishro_production`
- اضغط Create

**ب. إنشاء User:**
```
CPanel → MySQL Users
```
- Username: `ishro_user`
- Password: (كلمة مرور قوية)
- اضغط Create

**ج. إعطاء الصلاحيات:**
```
CPanel → Add User to Database
```
- User: `ishro_user`
- Database: `ishro_production`
- حدد ✓ All Privileges
- اضغط Add

---

### **Phase 3: إعداد المشروع في CPanel**

#### الخطوة 1: فتح Terminal
```
CPanel → Terminal
```

#### الخطوة 2: الذهاب للمجلد
```bash
cd /home/ghoutni/public_html/Eishro-Platform
```

#### الخطوة 3: تحديث .env
```bash
# نسخ الملف للإنتاج
cp .env.production .env

# تعديل البيانات الحساسة
nano .env
```

**البيانات المطلوبة:**
```env
DB_PASSWORD=YOUR_PASSWORD_HERE
JWT_SECRET=YOUR_SECRET_HERE
ENCRYPTION_KEY=YOUR_KEY_HERE
```

#### الخطوة 4: تشغيل البناء
```bash
# تثبيت المتطلبات
npm install --production

cd backend
npm install --production
npm run migrate
cd ..

# بناء Frontend
npm run build
```

#### الخطوة 5: تشغيل Backend
```bash
# تثبيت PM2
npm install -g pm2

# تشغيل التطبيق
pm2 start ecosystem.config.js --env production

# حفظ البروسيس
pm2 save
pm2 startup
```

---

### **Phase 4: تفعيل النطاق**

#### الخطوة 1: Reverse Proxy
```
CPanel → Domains → ishro.ly
```

أضف:
```
ProxyPass / http://localhost:3000/
ProxyPassReverse / http://localhost:3000/
```

كرر لـ `www.ishro.ly`

#### الخطوة 2: تفعيل SSL
```
CPanel → Domains → AutoSSL
```
- اختر: `ishro.ly` و `www.ishro.ly`
- اضغط: Check & Install
- انتظر التثبيت

#### الخطوة 3: إجبار HTTPS
```
CPanel → Domains → Force HTTPS Redirect
```
- فعّل الخيار

---

## **الاختبار**

### اختبر الروابط:
```
✅ https://www.ishro.ly
✅ https://ishro.ly
✅ https://www.ishro.ly/api/health
```

### اختبر الوظائف:
```
✅ تسجيل الدخول
✅ إنشاء متجر
✅ إضافة منتج
✅ تحميل صورة
✅ تسجيل الدخول عبر Google
✅ معالجة الدفع
```

---

## **استكشاف الأخطاء**

### ❌ "Cannot GET /"
**السبب:** Static files غير موجودة  
**الحل:**
```bash
npm run build
pm2 restart ishro-backend
```

### ❌ "Database Connection Failed"
**السبب:** بيانات قاعدة البيانات غير صحيحة  
**الحل:** تحقق من:
```
✓ DB_HOST=localhost
✓ DB_USER=ishro_user
✓ DB_PASSWORD صحيح
✓ DB_NAME=ishro_production
```

### ❌ "CORS Error"
**السبب:** CORS_ORIGIN غير متطابقة  
**الحل:**
```env
CORS_ORIGIN=https://www.ishro.ly
FRONTEND_URL=https://www.ishro.ly
```

### ❌ "SSL Certificate Error"
**السبب:** SSL لم يتم تثبيته  
**الحل:**
```
CPanel → Domains → AutoSSL → Check & Install
```

### ❌ "Port 3000 Already in Use"
**السبب:** منفذ مشغول  
**الحل:**
```bash
pm2 delete all
# اختر منفذاً مختلفاً (8000 أو 8080)
# عدّل ecosystem.config.js وأعد التشغيل
```

---

## **أوامر مفيدة**

```bash
# عرض السجلات
pm2 logs ishro-backend

# إعادة تشغيل
pm2 restart ishro-backend

# إيقاف
pm2 stop ishro-backend

# تشغيل
pm2 start ishro-backend

# حذف
pm2 delete ishro-backend

# عرض الإحصائيات
pm2 monit

# حفظ الحالة
pm2 save
```

---

## **النسخ الاحتياطية**

```bash
# نسخ احتياطي من قاعدة البيانات
mysqldump -u ishro_user -p ishro_production > backup.sql

# نسخ احتياطي من المشروع
tar -czf project_backup.tar.gz /home/ghoutni/public_html/Eishro-Platform
```

---

## **الصيانة الدورية**

### يومياً:
```bash
# مراقبة السجلات
pm2 logs

# التحقق من الصحة
curl https://www.ishro.ly/api/health
```

### أسبوعياً:
```bash
# تحديث المكتبات
npm update

# نسخ احتياطي
mysqldump -u ishro_user -p ishro_production > backup.sql
```

### شهرياً:
```bash
# إعادة تشغيل المتجر
pm2 restart ishro-backend
```

---

## **قائمة التحقق النهائية ✅**

- [ ] تم البناء محلياً بنجاح
- [ ] تم رفع المشروع إلى CPanel
- [ ] تم إنشاء قاعدة البيانات
- [ ] تم تحديث ملف .env بالبيانات الصحيحة
- [ ] تم تثبيت المتطلبات
- [ ] تم بناء الواجهة الأمامية
- [ ] تم تشغيل Backend مع PM2
- [ ] تم تفعيل Reverse Proxy
- [ ] تم تفعيل SSL/HTTPS
- [ ] تم اختبار جميع الروابط
- [ ] تم اختبار الوظائف الأساسية
- [ ] تم إعداد النسخ الاحتياطية

---

## **الدعم والمساعدة**

📄 **اقرأ أولاً:** `CPANEL_DEPLOYMENT.md`  
⚡ **للبدء السريع:** `QUICK_START.md`  
🐛 **للمشاكل:** قسم استكشاف الأخطاء أعلاه

---

**تم التحضير بواسطة:** Zencoder AI  
**التاريخ:** 2025-12-09  
**الحالة:** ✅ جاهز للإنتاج
