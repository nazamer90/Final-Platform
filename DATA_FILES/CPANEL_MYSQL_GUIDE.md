# 🗄️ دليل إعداد MySQL من CPanel - خطوة بخطوة

## 📋 جدول المحتويات
- [المقدمة](#المقدمة)
- [الخطوة 1: الدخول إلى CPanel](#الخطوة-1-الدخول-إلى-cpanel)
- [الخطوة 2: إنشاء قاعدة بيانات MySQL](#الخطوة-2-إنشاء-قاعدة-بيانات-mysql)
- [الخطوة 3: إنشاء مستخدم MySQL](#الخطوة-3-إنشاء-مستخدم-mysql)
- [الخطوة 4: ربط المستخدم بقاعدة البيانات](#الخطوة-4-ربط-المستخدم-بقاعدة-البيانات)
- [الخطوة 5: السماح بالوصول الخارجي (Remote Access)](#الخطوة-5-السماح-بالوصول-الخارجي-remote-access)
- [الخطوة 6: رفع قاعدة البيانات (إذا كانت موجودة)](#الخطوة-6-رفع-قاعدة-البيانات-إذا-كانت-موجودة)
- [الخطوة 7: اختبار الاتصال](#الخطوة-7-اختبار-الاتصال)
- [استكشاف الأخطاء](#استكشاف-الأخطاء)

---

## المقدمة

CPanel يوفر واجهة سهلة لإدارة MySQL. سنستخدمه لإنشاء قاعدة بيانات وربطها بـ Backend على Fly.io.

**ما نحتاجه في النهاية:**
- ✅ Database Name
- ✅ Database User
- ✅ Database Password
- ✅ Database Host
- ✅ Remote Access مفعّل

---

## الخطوة 1: الدخول إلى CPanel

### 1.1 فتح CPanel

اذهبي إلى لوحة التحكم الخاصة بك، عادة:
```
https://yourdomain.com:2083
```

أو:
```
https://yourdomain.com/cpanel
```

أو:
```
https://cpanel.yourdomain.com
```

### 1.2 تسجيل الدخول

- **Username:** اسم المستخدم الخاص بـ CPanel
- **Password:** كلمة المرور

اضغطي **"Log in"**

---

## الخطوة 2: إنشاء قاعدة بيانات MySQL

### 2.1 العثور على MySQL Databases

في CPanel Dashboard:

1. ابحثي عن قسم **"Databases"**
2. اضغطي على **"MySQL® Databases"** أو **"MySQL Database Wizard"**

### 2.2 إنشاء Database جديدة

#### إذا استخدمت "MySQL Database Wizard" (موصى به للمبتدئين):

**الخطوة 1: New Database**

```
Database Name: eishro_production
```

**ملاحظة:** CPanel قد يضيف prefix تلقائياً:
- إذا كان username الخاص بك: `cpanel_user`
- Database Name ستكون: `cpanel_user_eishro_production`

**نسخي الاسم الكامل!** (ستحتاجينه لاحقاً)

اضغطي **"Next Step"**

---

**الخطوة 2: Create Database User**

```
Username: eishro_user
Password: [استخدمي Password Generator أو أدخلي كلمة مرور قوية]
```

**نصيحة:** اضغطي على **"Password Generator"** لإنشاء كلمة مرور قوية تلقائياً

**انسخي:**
- ✅ Username الكامل (مع prefix)
- ✅ Password

اضغطي **"Create User"**

---

**الخطوة 3: Add User to Database**

```
User: cpanel_user_eishro_user
Database: cpanel_user_eishro_production
```

**اختاري الصلاحيات:**
- ✅ حددي **"ALL PRIVILEGES"** (جميع الصلاحيات)

أو حددي يدوياً:
- ✅ SELECT
- ✅ INSERT
- ✅ UPDATE
- ✅ DELETE
- ✅ CREATE
- ✅ DROP
- ✅ ALTER
- ✅ INDEX

اضغطي **"Next Step"**

✅ **قاعدة البيانات جاهزة!**

---

#### إذا استخدمت "MySQL Databases" (الطريقة اليدوية):

**أ) إنشاء Database:**

في قسم **"Create New Database"**:
```
New Database: eishro_production
```

اضغطي **"Create Database"**

---

**ب) إنشاء User:**

في قسم **"Add New User"**:
```
Username: eishro_user
Password: [كلمة مرور قوية]
```

اضغطي **"Create User"**

---

**ج) ربط User بـ Database:**

في قسم **"Add User To Database"**:
1. اختاري **User:** `eishro_user`
2. اختاري **Database:** `eishro_production`
3. اضغطي **"Add"**
4. حددي **"ALL PRIVILEGES"**
5. اضغطي **"Make Changes"**

---

## الخطوة 3: الحصول على معلومات الاتصال

الآن احصلي على جميع المعلومات المطلوبة:

### 3.1 Database Name

```
cpanel_user_eishro_production
```

### 3.2 Database User

```
cpanel_user_eishro_user
```

### 3.3 Database Password

كلمة المرور التي أنشأتيها (أو من Password Generator)

### 3.4 Database Host

في CPanel → MySQL Databases → أعلى الصفحة:

```
MySQL Hostname: localhost
```

**لكن للوصول الخارجي، قد يكون:**
- `yourdomain.com`
- `mysql.yourdomain.com`
- `serverXX.hostingprovider.com`

**كيف تعرفين؟**

1. في CPanel، ابحثي عن **"Remote MySQL"**
2. أو راسلي الدعم الفني لمزود الاستضافة
3. أو جربي:
   - `yourdomain.com`
   - `mysql.yourdomain.com`

**مثال:**
```
DB_HOST=ishro.ly
```

أو:
```
DB_HOST=mysql.ishro.ly
```

### 3.5 Database Port

دائماً:
```
DB_PORT=3306
```

---

## الخطوة 4: السماح بالوصول الخارجي (Remote Access)

**مهم جداً!** بدون هذه الخطوة، Fly.io لن يستطيع الاتصال بـ MySQL!

### 4.1 فتح Remote MySQL

في CPanel:
1. ابحثي عن **"Remote MySQL®"**
2. اضغطي عليها

### 4.2 إضافة Fly.io IPs

في **"Add Access Host"**:

**الخيار 1: السماح لجميع IPs (سهل، لكن أقل أماناً)**

```
Host: %
```

اضغطي **"Add Host"**

---

**الخيار 2: إضافة Fly.io IPs فقط (أكثر أماناً)**

أضيفي كل IP على حدة:

```
Host: 66.241.124.0/24
Host: 66.241.125.0/24
Host: 2a09:8280:1::/48
```

**للحصول على جميع Fly.io IPs:**
```bash
fly ips list
```

أو راجعي: https://fly.io/docs/reference/services/#ip-addresses

---

**الخيار 3: Fly.io IPv6 (موصى به)**

```
Host: 2a09:8280:1::
```

اضغطي **"Add Host"**

---

### 4.3 التحقق من Remote Access

في نفس الصفحة، يجب أن ترى:

```
Access Hosts:
- % (أو IP الذي أضفته)
```

✅ **Remote Access مفعّل!**

---

## الخطوة 5: رفع قاعدة البيانات (إذا كانت موجودة)

### 5.1 إذا كان لديك ملف SQL

**مثلاً:** `database.sql` أو `backup.sql`

1. في CPanel → **"phpMyAdmin"**
2. من القائمة اليسرى، اختاري قاعدة البيانات:
   ```
   cpanel_user_eishro_production
   ```
3. اضغطي على تبويب **"Import"**
4. اضغطي **"Choose File"**
5. اختاري ملف `.sql`
6. اضغطي **"Go"** (أسفل الصفحة)

**الوقت المتوقع:** يعتمد على حجم الملف

---

### 5.2 إذا كان لديك SQLite (database.sqlite)

**التحويل من SQLite إلى MySQL:**

1. افتحي SQLite في أداة محلية (DB Browser for SQLite)
2. Export إلى SQL:
   - File → Export → Database to SQL file
   - اختاري جميع الجداول
   - احفظي كـ `export.sql`

3. افتحي `export.sql` في محرر نصوص

4. عدلي:
   - استبدلي `AUTOINCREMENT` بـ `AUTO_INCREMENT`
   - استبدلي `INTEGER` بـ `INT`
   - استبدلي `TEXT` بـ `VARCHAR(255)` (حسب الحاجة)

5. ارفعي عبر phpMyAdmin (كما في الخطوة 5.1)

---

## الخطوة 6: اختبار الاتصال

### 6.1 من Backend على Fly.io

بعد نشر Backend، راقبي السجلات:

```bash
fly logs
```

ابحثي عن:
```
✓ Database connected successfully
```

أو:
```
❌ Error connecting to database: ...
```

### 6.2 اختبار من Terminal محلياً

إذا كان لديك `mysql` client مثبت:

```bash
mysql -h yourdomain.com -u cpanel_user_eishro_user -p cpanel_user_eishro_production
```

أدخلي Password عند الطلب.

إذا اتصلت بنجاح:
```
MySQL [(cpanel_user_eishro_production)]>
```

✅ **الاتصال يعمل!**

### 6.3 اختبار من phpMyAdmin

1. CPanel → **phpMyAdmin**
2. اختاري Database من القائمة اليسرى
3. اضغطي على أي جدول
4. اضغطي **"Browse"**

إذا رأيت البيانات، كل شيء يعمل ✅

---

## معلومات الاتصال النهائية

**احفظي هذه المعلومات في مكان آمن:**

```env
DB_HOST=yourdomain.com (أو mysql.yourdomain.com)
DB_PORT=3306
DB_NAME=cpanel_user_eishro_production
DB_USER=cpanel_user_eishro_user
DB_PASSWORD=your_secure_password_here
```

**استخدميها في:**
1. Fly.io Secrets:
```bash
fly secrets set DB_HOST=yourdomain.com
fly secrets set DB_PORT=3306
fly secrets set DB_NAME=cpanel_user_eishro_production
fly secrets set DB_USER=cpanel_user_eishro_user
fly secrets set DB_PASSWORD=your_secure_password_here
```

2. ملف `.env.fly.production` (محلياً فقط - لا ترفعيه!)

---

## استكشاف الأخطاء

### 1. Connection Timeout

**الخطأ:**
```
Error: connect ETIMEDOUT
```

**الأسباب المحتملة:**
1. ❌ Remote MySQL غير مفعّل
2. ❌ Firewall يحجب الاتصال
3. ❌ DB_HOST خاطئ

**الحل:**

**أ) تحقق من Remote MySQL:**
- CPanel → Remote MySQL
- تأكدي من وجود `%` أو Fly.io IPs

**ب) تحقق من DB_HOST:**
جربي أحد هذه:
```
yourdomain.com
mysql.yourdomain.com
localhost (إذا Backend على نفس السيرفر)
Server IP (مثل 192.168.1.1)
```

**ج) اتصلي بالدعم الفني:**
- اطلبي تفعيل Remote MySQL
- اطلبي MySQL Host للاتصال الخارجي

---

### 2. Access Denied

**الخطأ:**
```
Error: Access denied for user 'user'@'host'
```

**الأسباب:**
1. ❌ Username أو Password خاطئ
2. ❌ User غير مرتبط بـ Database
3. ❌ Privileges غير كافية

**الحل:**

**أ) تحقق من Username & Password:**
- راجعي CPanel → MySQL Databases
- تحت **"Current Users"** - تأكدي من اسم المستخدم

**ب) إعادة ربط User بـ Database:**
- CPanel → MySQL Databases
- قسم **"Add User To Database"**
- اختاري User و Database
- اضغطي **"Add"**
- حددي **"ALL PRIVILEGES"**

**ج) إعادة تعيين Password:**
- CPanel → MySQL Databases
- تحت **"Current Users"**
- اضغطي **"Change Password"**
- أدخلي كلمة مرور جديدة
- حدثي في Fly.io:
```bash
fly secrets set DB_PASSWORD=new_password
```

---

### 3. Database Not Found

**الخطأ:**
```
Error: Unknown database 'database_name'
```

**الحل:**

1. تحققي من اسم Database في CPanel:
   - MySQL Databases → **"Current Databases"**
   - انسخي الاسم **بالضبط** (مع prefix)

2. حدثي في Fly.io:
```bash
fly secrets set DB_NAME=correct_database_name
```

---

### 4. Too Many Connections

**الخطأ:**
```
Error: Too many connections
```

**الحل:**

1. أغلقي الاتصالات غير المستخدمة في الكود:
```typescript
connection.end();
```

2. استخدمي Connection Pool:
```typescript
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
```

3. في CPanel (إذا لديك صلاحيات):
   - راجعي حد الاتصالات المسموحة
   - اطلبي من الدعم الفني زيادة الحد

---

### 5. Firewall Blocking Connection

**الأعراض:**
- الاتصال يعمل محلياً
- لا يعمل من Fly.io

**الحل:**

1. **اتصلي بالدعم الفني** لمزود الاستضافة
2. اطلبي:
   - تفعيل Remote MySQL
   - إضافة Fly.io IPs إلى Whitelist
   - فتح Port 3306 للخارج

3. بعض مزودي الاستضافة يطلبون:
   - إنشاء تذكرة دعم
   - إرسال IPs المحددة

---

## 🔒 نصائح الأمان

### 1. استخدمي كلمات مرور قوية

- على الأقل 16 حرف
- مزيج من حروف كبيرة وصغيرة وأرقام ورموز
- استخدمي Password Generator

### 2. قللي Remote Access Hosts

بدلاً من `%` (كل IPs)، أضيفي فقط:
```
Fly.io IPs: 66.241.124.0/24
Your IP: 123.456.789.0
```

### 3. Backup منتظم

في CPanel:

1. **Backup** → **Download a MySQL Database Backup**
2. اختاري Database
3. احفظي النسخة الاحتياطية في مكان آمن

**أو استخدمي Cron Job لـ Backup تلقائي:**
```bash
0 2 * * * mysqldump -u user -p password database > backup_$(date +\%Y\%m\%d).sql
```

### 4. مراقبة الاستخدام

راقبي:
- عدد الاتصالات
- حجم Database
- استهلاك Resources

في CPanel → **"Metrics"** أو **"Statistics"**

---

## 📊 مثال كامل للاتصال

بعد إتمام جميع الخطوات، معلوماتك ستكون:

```env
DB_HOST=ishro.ly
DB_PORT=3306
DB_NAME=cpanel_ishro_eishro_production
DB_USER=cpanel_ishro_eishro_user
DB_PASSWORD=Xy9$mK2#pL5@nQ8!wR4

# أو إذا كان على subdomain:
DB_HOST=mysql.ishro.ly
```

---

## ✅ قائمة التحقق النهائية

قبل الانتقال للخطوة التالية، تأكدي:

- [x] قاعدة بيانات MySQL منشأة
- [x] User منشأ ومرتبط بـ Database
- [x] ALL PRIVILEGES ممنوحة للـ User
- [x] Remote MySQL مفعّل (% أو Fly.io IPs)
- [x] حصلت على جميع معلومات الاتصال (Host, Port, Name, User, Password)
- [x] أضفت المعلومات في Fly.io Secrets
- [x] اختبرت الاتصال (Logs تُظهر Database connected)

---

## 🎯 الخطوة التالية

بعد إعداد MySQL:
1. أضيفي معلومات Database في Fly.io (راجع الخطوة 6)
2. أعد نشر Backend:
```bash
fly deploy
```
3. تحققي من السجلات:
```bash
fly logs
```

يجب أن ترى:
```
✓ Database connected successfully
```

---

**التالي:** [الدليل الشامل الكامل →](DEPLOYMENT_GUIDE_FINAL.md)
