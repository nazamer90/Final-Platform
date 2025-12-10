import{r as c,j as e,H as J,B as o,A as R,U as N,f as k,C as D,w as P,x as T,a as F,L as l,I as h,M as _,O as q,W,X as L}from"./index-CcNjQh2v.js";import{C as b}from"./checkbox-CKCxFKXv.js";import{S as G,a as K,b as Q,c as Z,d as I}from"./select-CA2aZ3FQ.js";import{C as ee}from"./CityAreaSelector-o5G7uA06.js";import{E as $}from"./eye-off-Bfbj8Prb.js";import{E as O}from"./eye-BU6p52cQ.js";import{F as se}from"./file-text-B80GRBIb.js";import"./badge-DXI0UTzt.js";import"./cities-BeLIDABV.js";import"./leaflet-BMOsD6tr.js";import"./index-Bvg4Gbqg.js";import"./map-pin-Don1UAO2.js";const ae=({date:i,onDateChange:m,placeholder:x,className:j})=>{const[r,u]=c.useState(i?X(i):"");c.useEffect(()=>{i&&u(X(i))},[i]);const f=p=>{u(p.target.value),m&&m(p.target.value?new Date(p.target.value):void 0)};return e.jsx("input",{type:"date",value:r,onChange:f,placeholder:x,className:J("h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",j)})};function X(i){const m=i.getFullYear(),x=String(i.getMonth()+1).padStart(2,"0"),j=String(i.getDate()).padStart(2,"0");return`${m}-${x}-${j}`}const ge=({onBack:i,onRegister:m,onNavigateToLogin:x,onNavigateToTerms:j})=>{const[r,u]=c.useState({firstName:"",lastName:"",email:"",password:"",confirmPassword:"",birthDate:"",gender:"",city:"",area:"",phone:"",agreeToTerms:!1,agreeToPrivacy:!1,subscribeToOffers:!0,subscribeToNewsletter:!0}),[f,p]=c.useState(!1),[v,M]=c.useState(!1),[E,w]=c.useState(!1),[a,g]=c.useState({}),[z,A]=c.useState(),[V,y]=c.useState(!1),[B,C]=c.useState(!1),t=(s,d)=>{u(n=>({...n,[s]:d})),a[s]&&g(n=>({...n,[s]:""}))},Y=()=>{const s={};return r.firstName.trim()||(s.firstName="الاسم مطلوب"),r.lastName.trim()||(s.lastName="اللقب مطلوب"),r.email.trim()?/\S+@\S+\.\S+/.test(r.email)||(s.email="البريد الإلكتروني غير صالح"):s.email="البريد الإلكتروني مطلوب",r.password?r.password.length<8&&(s.password="كلمة المرور يجب أن تكون 8 أحرف على الأقل"):s.password="كلمة المرور مطلوبة",r.confirmPassword?r.password!==r.confirmPassword&&(s.confirmPassword="كلمات المرور غير متطابقة"):s.confirmPassword="تأكيد كلمة المرور مطلوب",r.birthDate||(s.birthDate="تاريخ الميلاد مطلوب"),r.gender||(s.gender="الجنس مطلوب"),r.city||(s.city="المدينة مطلوبة"),r.area||(s.area="المنطقة مطلوبة"),r.agreeToTerms||(s.terms="يجب الموافقة على الشروط والأحكام"),r.agreeToPrivacy||(s.privacy="يجب الموافقة على سياسة الخصوصية"),g(s),Object.keys(s).length===0},U=async s=>{if(s.preventDefault(),!!Y()){w(!0);try{await new Promise(S=>setTimeout(S,2e3));const d={...r,fullName:`${r.firstName} ${r.lastName}`,registrationDate:new Date().toISOString(),userType:"visitor",id:Date.now().toString()},n=JSON.parse(localStorage.getItem("eshro_users")||"[]");if(n.find(S=>S.email===r.email)){g({email:"البريد الإلكتروني موجود مسبقاً"}),w(!1);return}n.push(d),localStorage.setItem("eshro_users",JSON.stringify(n)),m(d)}catch{g({submit:"حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى."})}finally{w(!1)}}},H=s=>{if(s){const d=s.toLocaleDateString("ar-LY");t("birthDate",d),A(s),a.birthDate&&g(n=>({...n,birthDate:""}))}};return e.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-50 relative overflow-hidden",children:[e.jsxs("div",{className:"absolute inset-0 overflow-hidden",children:[e.jsx("div",{className:"absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-green-400/20 to-green-400/5 rounded-full blur-3xl animate-pulse"}),e.jsx("div",{className:"absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"}),e.jsx("div",{className:"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-purple-500/10 to-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"})]}),e.jsx("header",{className:"relative z-10 p-4 border-b bg-white/80 backdrop-blur-sm",children:e.jsxs("div",{className:"container mx-auto flex items-center justify-between",children:[e.jsxs(o,{variant:"ghost",onClick:i,className:"flex items-center gap-2",children:[e.jsx(R,{className:"h-4 w-4"}),"العودة للرئيسية"]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"w-8 h-8 bg-primary rounded-lg flex items-center justify-center",children:e.jsx(N,{className:"h-5 w-5 text-white"})}),e.jsx("span",{className:"text-xl font-bold text-primary",children:"إشرو"})]}),e.jsx(o,{variant:"outline",onClick:x,children:"تسجيل الدخول"})]})}),e.jsxs("div",{className:"relative z-10 container mx-auto px-4 py-8",children:[e.jsxs("div",{className:"max-w-2xl mx-auto",children:[e.jsxs("div",{className:"text-center mb-8",children:[e.jsx("div",{className:"w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl",children:e.jsx(N,{className:"h-10 w-10 text-white"})}),e.jsx("h1",{className:"text-3xl font-bold text-gray-900 mb-3",children:"إنشاء حساب جديد"}),e.jsx("p",{className:"text-gray-600 leading-relaxed text-lg",children:"انضم إلى مجتمع إشرو واستمتع بتجربة تسوق مميزة"}),e.jsxs("div",{className:"flex justify-center gap-4 mt-6",children:[e.jsxs("div",{className:"flex items-center gap-2 text-sm text-gray-600",children:[e.jsx(k,{className:"h-4 w-4 text-green-500"}),e.jsx("span",{children:"توصيل مجاني"})]}),e.jsxs("div",{className:"flex items-center gap-2 text-sm text-gray-600",children:[e.jsx(k,{className:"h-4 w-4 text-green-500"}),e.jsx("span",{children:"خصومات خاصة"})]}),e.jsxs("div",{className:"flex items-center gap-2 text-sm text-gray-600",children:[e.jsx(k,{className:"h-4 w-4 text-green-500"}),e.jsx("span",{children:"دعم 24/7"})]})]})]}),e.jsxs(D,{className:"shadow-xl border-0",children:[e.jsx(P,{children:e.jsx(T,{className:"text-center",children:"معلومات الحساب"})}),e.jsxs(F,{children:[e.jsxs("form",{onSubmit:U,className:"space-y-6",children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx(l,{htmlFor:"firstName",children:"الاسم *"}),e.jsx(h,{id:"firstName",value:r.firstName,onChange:s=>t("firstName",s.target.value),placeholder:"أدخل اسمك",className:a.firstName?"border-red-500":""}),a.firstName&&e.jsx("p",{className:"text-sm text-red-600 mt-1",children:a.firstName})]}),e.jsxs("div",{children:[e.jsx(l,{htmlFor:"lastName",children:"اللقب *"}),e.jsx(h,{id:"lastName",value:r.lastName,onChange:s=>t("lastName",s.target.value),placeholder:"أدخل لقبك",className:a.lastName?"border-red-500":""}),a.lastName&&e.jsx("p",{className:"text-sm text-red-600 mt-1",children:a.lastName})]})]}),e.jsxs("div",{children:[e.jsx(l,{htmlFor:"email",children:"البريد الإلكتروني *"}),e.jsxs("div",{className:"relative",children:[e.jsx(_,{className:"absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"}),e.jsx(h,{id:"email",type:"email",value:r.email,onChange:s=>t("email",s.target.value),placeholder:"example@email.com",className:`pr-10 ${a.email?"border-red-500":""}`})]}),a.email&&e.jsx("p",{className:"text-sm text-red-600 mt-1",children:a.email})]}),e.jsxs("div",{children:[e.jsx(l,{htmlFor:"password",children:"كلمة المرور *"}),e.jsxs("div",{className:"relative",children:[e.jsx(h,{id:"password",type:f?"text":"password",value:r.password,onChange:s=>t("password",s.target.value),placeholder:"أدخل كلمة مرور قوية",className:`pr-10 ${a.password?"border-red-500":""}`}),e.jsx("button",{type:"button",onClick:()=>p(!f),className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600",children:f?e.jsx($,{className:"h-4 w-4"}):e.jsx(O,{className:"h-4 w-4"})})]}),a.password&&e.jsx("p",{className:"text-sm text-red-600 mt-1",children:a.password})]}),e.jsxs("div",{children:[e.jsx(l,{htmlFor:"confirmPassword",children:"تأكيد كلمة المرور *"}),e.jsxs("div",{className:"relative",children:[e.jsx(h,{id:"confirmPassword",type:v?"text":"password",value:r.confirmPassword,onChange:s=>t("confirmPassword",s.target.value),placeholder:"أعد إدخال كلمة المرور",className:`pr-10 ${a.confirmPassword?"border-red-500":""}`}),e.jsx("button",{type:"button",onClick:()=>M(!v),className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600",children:v?e.jsx($,{className:"h-4 w-4"}):e.jsx(O,{className:"h-4 w-4"})})]}),a.confirmPassword&&e.jsx("p",{className:"text-sm text-red-600 mt-1",children:a.confirmPassword})]}),e.jsxs("div",{children:[e.jsx(l,{children:"تاريخ الميلاد *"}),e.jsx(ae,{date:z??new Date,onDateChange:H,placeholder:"اختر تاريخ الميلاد",className:a.birthDate?"border-red-500":""}),a.birthDate&&e.jsx("p",{className:"text-sm text-red-600 mt-1",children:a.birthDate})]}),e.jsxs("div",{children:[e.jsx(l,{children:"الجنس *"}),e.jsxs(G,{value:r.gender,onValueChange:s=>t("gender",s),children:[e.jsx(K,{className:a.gender?"border-red-500":"",children:e.jsx(Q,{placeholder:"اختر الجنس"})}),e.jsxs(Z,{children:[e.jsx(I,{value:"male",children:"ذكر"}),e.jsx(I,{value:"female",children:"أنثى"})]})]}),a.gender&&e.jsx("p",{className:"text-sm text-red-600 mt-1",children:a.gender})]}),e.jsxs("div",{children:[e.jsx(l,{children:"المدينة والمنطقة *"}),e.jsx(ee,{selectedCity:r.city,selectedArea:r.area,onCityChange:s=>t("city",s),onAreaChange:s=>t("area",s),required:!0}),(a.city||a.area)&&e.jsx("p",{className:"text-sm text-red-600 mt-1",children:a.city||a.area})]}),e.jsxs("div",{children:[e.jsx(l,{htmlFor:"phone",children:"رقم الهاتف"}),e.jsx("div",{className:"relative",children:e.jsx(h,{id:"phone",value:r.phone,onChange:s=>t("phone",s.target.value),placeholder:"091XXXXXXX"})})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center space-x-2 space-x-reverse",children:[e.jsx(b,{id:"offers",checked:r.subscribeToOffers,onCheckedChange:s=>t("subscribeToOffers",!!s)}),e.jsx(l,{htmlFor:"offers",className:"text-sm",children:"الحصول على العروض من شركائنا"})]}),e.jsxs("div",{className:"flex items-center space-x-2 space-x-reverse",children:[e.jsx(b,{id:"newsletter",checked:r.subscribeToNewsletter,onCheckedChange:s=>t("subscribeToNewsletter",!!s)}),e.jsx(l,{htmlFor:"newsletter",className:"text-sm",children:"الاشتراك في النشرة البريدية"})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-start space-x-2 space-x-reverse",children:[e.jsx(b,{id:"terms",checked:r.agreeToTerms,onCheckedChange:s=>t("agreeToTerms",!!s),className:a.terms?"border-red-500":""}),e.jsxs(l,{htmlFor:"terms",className:"text-sm leading-relaxed",children:["أوافق على"," ",e.jsx("button",{type:"button",className:"text-primary hover:underline",onClick:()=>C(!0),children:"الشروط والأحكام"})]})]}),a.terms&&e.jsx("p",{className:"text-sm text-red-600",children:a.terms}),e.jsxs("div",{className:"flex items-start space-x-2 space-x-reverse",children:[e.jsx(b,{id:"privacy",checked:r.agreeToPrivacy,onCheckedChange:s=>t("agreeToPrivacy",!!s),className:a.privacy?"border-red-500":""}),e.jsxs(l,{htmlFor:"privacy",className:"text-sm leading-relaxed",children:["أوافق على"," ",e.jsx("button",{type:"button",className:"text-primary hover:underline",onClick:()=>y(!0),children:"سياسة الخصوصية"})]})]}),a.privacy&&e.jsx("p",{className:"text-sm text-red-600",children:a.privacy})]}),a.submit&&e.jsxs("div",{className:"flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg",children:[e.jsx(q,{className:"h-4 w-4 text-red-600 flex-shrink-0"}),e.jsx("span",{className:"text-sm text-red-700",children:a.submit})]}),e.jsx(o,{type:"submit",className:"w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105",disabled:E,children:E?e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"}),"جاري إنشاء الحساب..."]}):e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(N,{className:"h-5 w-5"}),"إنشاء الحساب وابدأ التسوق"]})})]}),e.jsxs("div",{className:"text-center pt-6 border-t mt-6",children:[e.jsx("p",{className:"text-sm text-gray-600 mb-3",children:"لديك حساب بالفعل؟"}),e.jsxs(o,{onClick:x,variant:"outline",className:"text-sm font-medium hover:bg-primary hover:text-white transition-colors",children:[e.jsx(N,{className:"h-4 w-4 mr-2"}),"تسجيل الدخول لحسابك"]})]})]})]})]}),V&&e.jsx("div",{className:"fixed inset-0 bg-black flex items-center justify-center z-50 p-4",children:e.jsxs(D,{className:"w-full max-w-4xl max-h-[90vh] overflow-hidden bg-black border-gray-800",children:[e.jsxs(P,{className:"bg-gradient-to-r from-green-50 to-blue-50 border-b flex flex-row items-center justify-between",children:[e.jsxs(T,{className:"flex items-center gap-2",children:[e.jsx(W,{className:"h-5 w-5 text-primary"}),"سياسة الخصوصية وحماية البيانات الشخصية"]}),e.jsx(o,{variant:"ghost",size:"sm",onClick:()=>y(!1),children:e.jsx(L,{className:"h-4 w-4"})})]}),e.jsx(F,{className:"p-0 max-h-96 overflow-auto",children:e.jsx("div",{className:"p-6 bg-white",children:e.jsx("pre",{className:"whitespace-pre-wrap text-gray-700 leading-relaxed font-sans text-sm",children:`# سياسة الخصوصية وحماية البيانات الشخصية

## مقدمة
في منصة إشرو، نحن ملتزمون بحماية خصوصيتك وبناء الثقة معك. تُعد خصوصيتك أولوية قصوى بالنسبة لنا، ونحن نحرص على حماية معلوماتك الشخصية بأعلى معايير الأمان والسرية.

## البيانات التي نجمعها
### البيانات الشخصية:
- الاسم الكامل وتاريخ الميلاد والجنس
- البريد الإلكتروني ورقم الهاتف
- العنوان والمدينة والمنطقة
- معلومات الحساب البنكي (مشفرة بالكامل)

### بيانات الاستخدام:
- سجل النشاطات والتفاعلات مع المنصة
- معلومات الجهاز ونوع المتصفح
- عنوان IP وسجل التصفح
- ملفات تعريف الارتباط (Cookies)

## كيفية حماية بياناتك
نستخدم أحدث تقنيات التشفير والأمان لحماية بياناتك:
- تشفير SSL 256-bit لجميع البيانات المرسلة
- تخزين آمن في خوادم محمية ومراقبة
- نظام مراقبة 24/7 للكشف عن التهديدات
- نسخ احتياطية دورية مشفرة

## مشاركة البيانات مع الأطراف الأخرى
لا نبيع أو نؤجر أو نشارك معلوماتك الشخصية مع أطراف ثالثة لأغراض تسويقية دون موافقتك الصريحة.

### ما نشاركه:
- معلومات الشحن مع شركات التوصيل
- بيانات الدفع مع البنوك ومعالجات الدفع
- إحصائيات عامة مع شركاء الأعمال
- البيانات المطلوبة قانوناً للجهات المختصة

### ما لا نشاركه:
- معلوماتك الشخصية لأغراض تسويقية
- بياناتك المالية مع أطراف ثالثة
- سجل تصفحك أو نشاطك الشخصي
- بياناتك مع الشركات الإعلانية

## حقوقك في التحكم ببياناتك
يحق لك:
- الوصول لبياناتك الشخصية وطلب نسخة منها
- تصحيح أو تحديث معلوماتك في أي وقت
- طلب حذف حسابك وبياناتك نهائياً
- الاعتراض على معالجة بياناتك لأغراض معينة
- طلب نقل بياناتك لمنصة أخرى
- سحب الموافقة في أي وقت

## ملفات تعريف الارتباط (Cookies)
نستخدم ملفات تعريف الارتباط لتحسين تجربتك على المنصة وتقديم محتوى مخصص.

### أنواع الكوكيز المستخدمة:
- ملفات أساسية لتشغيل الموقع بشكل صحيح
- ملفات التحليل لفهم سلوك المستخدمين
- ملفات التسويق لعرض إعلانات مناسبة
- ملفات التفضيلات لتخصيص التجربة

## فترة الاحتفاظ بالبيانات
نحتفظ ببياناتك للمدة اللازمة فقط:
- بيانات الحساب: طول فترة استخدام المنصة
- سجل الطلبات: 5 سنوات لأغراض المحاسبة
- بيانات الدفع: 3 سنوات لأغراض الامتثال
- سجل التواصل: سنتان لتحسين الخدمة

## خصوصية الأطفال
منصة إشرو مخصصة للاستخدام من قبل الأشخاص فوق سن 18 عاماً. نحن لا نجمع عمداً معلومات شخصية من الأطفال دون سن 18 عاماً دون موافقة الوالدين.

## التواصل بشأن الخصوصية
إذا كان لديك أي أسئلة أو مخاوف بشأن سياسة الخصوصية، يرجى التواصل معنا:
- مسؤول حماية البيانات: privacy@eshro.ly
- رقم الهاتف: +218 94 406 2927
- العنوان: طرابلس، ليبيا

## تحديث سياسة الخصوصية
قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سيتم إشعارك بأي تغييرات جوهرية عبر البريد الإلكتروني أو إشعار داخلي في المنصة.

**تاريخ آخر تحديث:** ${new Date().toLocaleDateString("ar-LY")}
**الإصدار:** 4.3 - منصة إشرو للتجارة الإلكترونية`})})}),e.jsx("div",{className:"p-4 border-t bg-gray-50",children:e.jsx(o,{onClick:()=>y(!1),className:"w-full",children:"فهمت، إغلاق"})})]})}),B&&e.jsx("div",{className:"fixed inset-0 bg-black flex items-center justify-center z-50 p-4",children:e.jsxs(D,{className:"w-full max-w-4xl max-h-[90vh] overflow-hidden bg-black border-gray-800",children:[e.jsxs(P,{className:"bg-gradient-to-r from-blue-50 to-green-50 border-b flex flex-row items-center justify-between",children:[e.jsxs(T,{className:"flex items-center gap-2",children:[e.jsx(se,{className:"h-5 w-5 text-primary"}),"إتفاقية وشروط إستخدام منصة إشرو"]}),e.jsx(o,{variant:"ghost",size:"sm",onClick:()=>C(!1),children:e.jsx(L,{className:"h-4 w-4"})})]}),e.jsx(F,{className:"p-0 max-h-96 overflow-auto",children:e.jsx("div",{className:"p-6 bg-white",children:e.jsx("pre",{className:"whitespace-pre-wrap text-gray-700 leading-relaxed font-sans text-sm",children:`# إتفاقية وشروط إستخدام منصة إشرو

## مقدمة
مرحباً بك في منصة إشرو للتجارة الإلكترونية، المنصة الرائدة في ليبيا لإنشاء وإدارة المتاجر الإلكترونية.

## الشروط والأحكام
هذه الشروط والأحكام تحدد القواعد واللوائح لاستخدام موقع إشرو الإلكتروني وتطبيقاته المحمولة. باستخدامك لخدماتنا، فإنك توافق على الالتزام بهذه الشروط والأحكام.

## تعريف المصطلحات
- **المنصة:** موقع إشرو الإلكتروني وتطبيقاته المحمولة
- **المستخدم:** أي شخص يستخدم خدمات المنصة سواء كتاجر أو زائر
- **التاجر:** الشخص أو الشركة المسجلة لبيع المنتجات عبر المنصة
- **الزائر:** المستخدم الذي يتصفح أو يشتري المنتجات دون بيع

## شروط التسجيل والحسابات
يجب على المستخدمين تقديم معلومات دقيقة وحديثة عند التسجيل والحفاظ على سرية كلمة المرور وعدم مشاركتها مع الآخرين.

## سياسة البيع والشراء
يجب على التجار تقديم وصف دقيق وصادق للمنتجات المعروضة وتحديد الأسعار بوضوح شاملة جميع الرسوم والضرائب.

## سياسة الشحن والتوصيل
نوفر خدمات شحن متعددة بالتعاون مع أفضل شركات الشحن في ليبيا مع ضمان سلامة المنتجات أثناء الشحن.

## سياسة الإرجاع والاستبدال
يحق للعميل إرجاع المنتج خلال 7 أيام من الاستلام مع الحفاظ على حالة المنتج الأصلية.

## حماية البيانات والخصوصية
نلتزم بحماية خصوصية مستخدمينا وفقاً لأعلى المعايير ولا نشارك البيانات الشخصية مع أطراف ثالثة دون موافقة صريحة.

## الرسوم والعمولات
تختلف العمولات حسب الباقة المختارة من التاجر ويتم خصم العمولة تلقائياً من مبيعات التاجر.

## المحتوى والملكية الفكرية
يحتفظ التاجر بحقوق الملكية الفكرية لمنتجاته وصوره ويمنح المنصة ترخيصاً محدوداً لعرض المنتجات.

## إنهاء الخدمة
يحق للمنصة إنهاء الخدمة في حالة انتهاك الشروط مع تسوية جميع المستحقات قبل إنهاء الخدمة.

## تحديث الشروط
نحتفظ بالحق في تحديث هذه الشروط في أي وقت مع إشعار المستخدمين بالتحديثات المهمة.

## القانون المعمول به
تخضع هذه الشروط للقوانين الليبية المعمول بها وأي نزاع ينشأ عن استخدام المنصة يخضع للاختصاص القضائي الليبي.

## التواصل
للتواصل معنا: support@eshro.ly | +218 94 406 2927 | طرابلس، ليبيا

**تاريخ آخر تحديث:** ${new Date().toLocaleDateString("ar-LY")}
**الإصدار:** 4.3 - منصة إشرو للتجارة الإلكترونية`})})}),e.jsx("div",{className:"p-4 border-t bg-gray-50",children:e.jsx(o,{onClick:()=>C(!1),className:"w-full",children:"فهمت، إغلاق"})})]})})]})]})};export{ge as default};
