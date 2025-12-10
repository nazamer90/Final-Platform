# 🧪 اختبار الاتصال بـ MySQL

## المهمة 3: اختبار الاتصال بـ MySQL من CPanel

### الخطوة 1: تشغيل اختبار الاتصال

```bash
cd backend
node test-mysql-connection.js
```

### التوقع:

✅ **النجاح:**
```
🔍 Testing MySQL Connection...
==================================================
Host: 102.213.180.22
Port: 3306
User: ishro_user
Database: ishroly_u7eundf
==================================================

⏳ Connecting to MySQL...
✅ Connected successfully!

📊 Testing database query...
✅ Query successful!
Query result: [ { test: 1 } ]

🗄️  Getting database info...
✅ Connected to database: ishroly_u7eundf

==================================================
🎉 All tests passed! MySQL connection is working.
==================================================
```

❌ **الفشل:**
إذا حصلت على خطأ، تحقق من:
1. IP العنوان: `102.213.180.22`
2. المنفذ: `3306`
3. اسم المستخدم: `ishro_user`
4. كلمة المرور: `@Dm1ns$$2025`
5. اسم قاعدة البيانات: `ishroly_u7eundf`
6. جدار الحماية على CPanel - تأكد من السماح بالاتصالات الخارجية

---

## المهمة 4: بناء واختبار Docker image

### الخطوة 1: بناء الصورة

```bash
cd backend
docker build -t eishro-backend:latest .
```

### الخطوة 2: تشغيل الحاوية محلياً

```bash
docker run \
  -e NODE_ENV=production \
  -e PORT=8000 \
  -e DB_HOST=102.213.180.22 \
  -e DB_PORT=3306 \
  -e DB_USER=ishro_user \
  -e DB_PASSWORD=@Dm1ns\$\$2025 \
  -e DB_NAME=ishroly_u7eundf \
  -p 8000:8000 \
  --name eishro-test \
  eishro-backend:latest
```

### الخطوة 3: اختبار من نافذة أخرى

```bash
# اختبر Health Check
curl http://localhost:8000/health

# النتيجة المتوقعة:
# {"status":"ok","timestamp":"2025-12-10T22:45:38.000Z","environment":"production"}
```

### الخطوة 4: إيقاف الحاوية

```bash
docker stop eishro-test
docker rm eishro-test
```

---

## 🚀 المهمة 5: النشر على Koyeb

بعد نجاح الاختبارات محلياً:

1. **أضف متغيرات البيئة على Koyeb**
   - انسخ من `KOYEB_ENVIRONMENT_SETUP.md`

2. **الدفع (Push) إلى GitHub**
   ```bash
   git add .
   git commit -m "Add KOYEB setup and test files"
   git push origin main
   ```

3. **النشر على Koyeb**
   - يجب أن ينشر تلقائياً من GitHub

4. **اختبر النشر**
   ```bash
   curl https://eishro-backend-xxxx.koyeb.app/health
   ```
