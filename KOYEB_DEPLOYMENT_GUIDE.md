# 🚀 دليل نشر EISHRO على Koyeb

## ✅ الملفات المضافة والمعدلة

### الملفات الجديدة:
1. **`backend/start.js`** - Wrapper script لتهيئة environment variables
2. **`backend/healthcheck.js`** - Health check endpoint checker
3. **`DEPLOYMENT_REPORT_PHASE_1.md`** - تقرير المرحلة الأولى
4. **`KOYEB_DEPLOYMENT_GUIDE.md`** - هذا الملف

### الملفات المعدلة:
1. **`backend/src/config/database.ts`** ✅ **الأهم** - تم تصحيحها لاستخدام MySQL بدلاً من SQLite
2. **`backend/src/config/environment.ts`** - منع تحميل .env في production
3. **`backend/src/index.ts`** - الاستماع على 0.0.0.0
4. **`backend/loader.js`** - Module aliases resolver
5. **`backend/Dockerfile`** - Multi-stage build مع health check ديناميكي
6. **`backend/package.json`** - تحديث start script

---

## 🔑 متغيرات البيئة المطلوبة على Koyeb

### قاعدة البيانات (MySQL على CPanel):
```env
DB_DIALECT=mysql
DB_HOST=your-cpanel-domain.com           # مثال: mysql.yourdomain.com
DB_PORT=3306
DB_NAME=your_database_name
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_LOGGING=false
```

### الخادم:
```env
NODE_ENV=production
PORT=8080                               # Koyeb يفرض هذا أحياناً
LOG_LEVEL=info
```

### JWT (Security):
```env
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_REFRESH_SECRET=your_refresh_token_secret
```

### Frontend URLs:
```env
FRONTEND_URL=http://localhost:5174
FRONTEND_PRODUCTION_URL=https://your-frontend-domain.vercel.app
```

---

## 🔧 خطوات النشر على Koyeb

### الخطوة 1: ربط GitHub
1. اذهب إلى [Koyeb Console](https://app.koyeb.com)
2. اختر **Create Service**
3. اختر **GitHub** كـ Source
4. ربط حسابك بـ GitHub: `https://github.com/bennouba/Final-Platform`
5. اختر **Branch**: `main`

### الخطوة 2: تكوين البناء والنشر
- **Builder**: Dockerfile
- **Dockerfile Path**: `backend/Dockerfile`
- **Environment**: `production`

### الخطوة 3: إضافة متغيرات البيئة
1. اذهب إلى **Environment**
2. أضف جميع المتغيرات أعلاه
3. **خاص بـ CPanel MySQL:**
   - `DB_HOST`: Host من CPanel (في الغالب `localhost` أو domain)
   - `DB_USER`: User من CPanel
   - `DB_PASSWORD`: Password من CPanel
   - `DB_NAME`: Database name من CPanel

### الخطوة 4: النشر
1. اختر **Deploy Now**
2. انتظر انتهاء البناء والاختبار
3. تحقق من الـ logs

---

## 📊 كيفية مسح Logs من Koyeb

### الطريقة 1: عبر لوحة التحكم (الأسهل)
```
1. اذهب إلى Koyeb Console
2. اختر Service اسمه "eishro"
3. اضغط على "Logs"
4. اختر "All instances" من الفلاتر
5. اضغط على زر التحديث (🔄) لمسح الـ logs
```

### الطريقة 2: مسح كل الـ logs تلقائياً
```
في Koyeb لا توجد طريقة مباشرة لحذف logs، لكن:
- Logs تُحذف تلقائياً بعد 7 أيام
- عند إعادة نشر (redeploy) → logs جديدة فقط
```

### الطريقة 3: بدء نشر جديد يمسح السجل
```bash
# اضغط Deploy Now من جديد
# سيبدأ instance جديد ويُلغي القديم
```

---

## 🩺 كيفية تشخيص الأخطاء

### 1. فحص الـ Health Check
```
إذا رأيت: "TCP health check failed"
→ تحقق من أن SERVER تستمع على PORT الصحيح
→ Koyeb قد يفرض PORT=8080 أو 8000
```

### 2. فحص اتصال Database
```
إذا رأيت: "Database connection failed"
→ تحقق من DB_HOST, DB_USER, DB_PASSWORD
→ تأكد من أن CPanel MySQL يقبل اتصالات خارجية
→ جرّب في الـ local أولاً
```

### 3. فحص Module Aliases
```
إذا رأيت: "Cannot find module '@config/database'"
→ تحقق من وجود loader.js
→ تحقق من package.json scripts
```

---

## 📝 ملخص التغييرات الرئيسية

| الملف | التغيير | السبب |
|------|--------|------|
| `database.ts` | استخدام MySQL بدلاً من SQLite | يدعم CPanel MySQL |
| `environment.ts` | عدم تحميل .env في production | تجنب تضارب متغيرات Koyeb |
| `index.ts` | الاستماع على 0.0.0.0 | السماح بـ external connections |
| `Dockerfile` | إضافة DB env vars | تعريف القيم الافتراضية |
| `start.js` | wrapper script جديد | تهيئة صحيحة للـ environment |
| `healthcheck.js` | استخدام PORT من env | دعم dynamic ports |

---

## 🔗 الروابط المهمة

- **Repository**: https://github.com/bennouba/Final-Platform
- **Koyeb Console**: https://app.koyeb.com
- **CPanel Database**: تم إضافته من خادمك

---

## ✨ الحالة النهائية

✅ Backend جاهز للنشر على Koyeb مع MySQL من CPanel
✅ جميع متغيرات البيئة قابلة للتخصيص
✅ Health check ديناميكي يدعم جميع الـ ports
✅ Database connection مع تعامل آمن مع الأخطاء

---

**آخر تحديث:** 10 ديسمبر 2025
