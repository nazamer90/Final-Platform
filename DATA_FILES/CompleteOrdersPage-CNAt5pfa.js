import{u as be,j as e,C as j,w as ve,f as le,x as we,a as C,B as c,r as y,R as X,A as ye,e as Y,P as B,q as je,X as H,L as q,I as U,M as Ne,l as ke,y as Ce,N as $e}from"./index-CcNjQh2v.js";import{B as J}from"./badge-DXI0UTzt.js";import{D as oe}from"./download-BxqaPv1P.js";import{H as se,S as Se}from"./ShareMenu-BUQS5dsT.js";import{T as ae}from"./trash-2-NiObV7lF.js";import{M as ze}from"./minus-CEXB3BVj.js";import{P as Te}from"./plus-pekqOudl.js";import{M as Pe}from"./message-square-cM-luB77.js";import{C as ie}from"./clock-CBxiAAIw.js";import"./share-2-BngvMsLp.js";import"./message-circle-e6jM0U1F.js";import"./send---e8mZEA.js";import"./users-4wT6_EwO.js";/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ie=[["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["path",{d:"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6",key:"1itne7"}],["rect",{x:"6",y:"14",width:"12",height:"8",rx:"1",key:"1ue0tg"}]],De=be("printer",Ie),Me=({invoice:s,onPrint:p,onDownload:f,onClose:I})=>{const E=b=>{try{const h=new Date(b),o=String(h.getDate()).padStart(2,"0"),N=String(h.getMonth()+1).padStart(2,"0"),S=h.getFullYear();let d=h.getHours();const $=String(h.getMinutes()).padStart(2,"0"),_=String(h.getSeconds()).padStart(2,"0"),D=d>=12?"م":"ص";d=d%12,d=d||12;const M=String(d).padStart(2,"0");return`${o}/${N}/${S} ${M}:${$}:${_} ${D}`}catch{return new Date().toLocaleDateString("ar-LY")+" "+new Date().toLocaleTimeString("ar-LY")}},F=()=>{const b=window.open("","_blank");if(!b)return;const h=`
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>فاتورة ${s.id}</title>
        <style>
          @font-face {
            font-family: 'Cairo';
            src: url('/fonts/Cairo-Regular.ttf') format('truetype');
            font-weight: 400;
          }
          @font-face {
            font-family: 'Cairo';
            src: url('/fonts/Cairo-Bold.ttf') format('truetype');
            font-weight: 700;
          }
          @font-face {
            font-family: 'Cairo';
            src: url('/fonts/Cairo-Medium.ttf') format('truetype');
            font-weight: 500;
          }
          
          * {
            font-family: 'Cairo', sans-serif;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            background: white;
            color: #333;
            line-height: 1.6;
            padding: 20px;
            direction: rtl;
            font-size: 14px;
          }
          
          .invoice-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border: 1px solid #ddd;
          }
          
          .invoice-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 2px solid #dc2626;
          }
          
          .logo-section {
            display: flex;
            align-items: center;
          }
          
          .logo {
            height: 50px;
            width: auto;
            max-width: 200px;
          }
          
          .logo-fallback {
            width: 50px;
            height: 50px;
            background: #0ea5e9;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            border-radius: 8px;
            font-size: 16px;
          }
          
          .date-section {
            text-align: left;
            font-size: 14px;
            font-weight: 500;
          }
          
          .date-section div:first-child {
            font-weight: bold;
            margin-bottom: 5px;
          }
          
          .invoice-title {
            text-align: center;
            padding: 20px;
            background: #f8fafc;
            border-bottom: 1px solid #e2e8f0;
          }
          
          .invoice-title h1 {
            color: #dc2626;
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          
          .reference-number {
            font-size: 16px;
            font-weight: bold;
            color: #374151;
          }
          
          .customer-section {
            padding: 20px;
            border-bottom: 1px solid #e2e8f0;
          }
          
          .customer-title {
            background: #f3f4f6;
            padding: 15px;
            border-right: 4px solid #dc2626;
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 15px;
            text-align: center;
          }
          
          .customer-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
          }
          
          .customer-row {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          
          .customer-label {
            font-weight: bold;
            color: #374151;
            min-width: 100px;
          }
          
          .customer-value {
            color: #6b7280;
          }
          
          .products-section {
            overflow-x: auto;
          }
          
          .products-table {
            width: 100%;
            border-collapse: collapse;
          }
          
          .products-table th {
            background: #dc2626;
            color: white;
            padding: 15px 10px;
            text-align: center;
            font-weight: bold;
            border: 1px solid #b91c1c;
          }
          
          .products-table td {
            padding: 12px 10px;
            text-align: center;
            border: 1px solid #e2e8f0;
            vertical-align: middle;
          }
          
          .products-table tbody tr:nth-child(even) {
            background: #f8fafc;
          }
          
          .product-image {
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 5px;
          }
          
          .totals-section {
            background: #f8fafc;
            padding: 20px;
          }
          
          .total-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 15px;
            margin-bottom: 5px;
            border-radius: 5px;
          }
          
          .subtotal {
            background: #dc2626;
            color: white;
            font-weight: bold;
          }
          
          .shipping {
            background: #f97316;
            color: white;
            font-weight: bold;
          }
          
          .discount {
            background: #10b981;
            color: white;
            font-weight: bold;
          }
          
          .final-total {
            background: #1e40af;
            color: white;
            font-weight: bold;
            font-size: 16px;
            margin-top: 10px;
          }
          
          .terms-section {
            background: #f0f9ff;
            padding: 15px 20px;
            border-top: 1px solid #e2e8f0;
            font-size: 12px;
            color: #6b7280;
            text-align: center;
            line-height: 1.5;
          }
          
          .signatures-section {
            display: flex;
            justify-content: space-between;
            padding: 40px 20px;
            border-top: 1px solid #e2e8f0;
          }
          
          .signature {
            text-align: center;
            width: 45%;
          }
          
          .signature-title {
            font-weight: bold;
            margin-bottom: 30px;
            color: #374151;
          }
          
          .signature-line {
            width: 100%;
            height: 2px;
            border-bottom: 2px solid #374151;
          }
          
          @media print {
            body { margin: 0; padding: 10px; }
            .invoice-container { border: none; box-shadow: none; }
          }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <!-- رأس الفاتورة -->
          <div class="invoice-header">
            <div class="logo-section">
              <img src="/eshro-new-logo.png" alt="إشرو" class="logo" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
              <div class="logo-fallback" style="display:none;">إشرو</div>
            </div>
            <div class="date-section">
              <div>التاريخ/الوقت:</div>
              <div>${E(s.date)}</div>
            </div>
          </div>
          
          <!-- عنوان الفاتورة -->
          <div class="invoice-title">
            <h1>الفاتورة النهائية</h1>
            <div class="reference-number">الرقم المرجعي: ${s.id}</div>
          </div>
          
          <!-- معلومات العميل -->
          <div class="customer-section">
            <div class="customer-title">معلومات العميل</div>
            <div class="customer-info">
              <div class="customer-row">
                <span class="customer-label">الاسم:</span>
                <span class="customer-value">${s.customer.name}</span>
              </div>
              <div class="customer-row">
                <span class="customer-label">رقم الهاتف:</span>
                <span class="customer-value">${s.customer.phone}</span>
              </div>
              <div class="customer-row">
                <span class="customer-label">البريد الإلكتروني:</span>
                <span class="customer-value">${s.customer.email}</span>
              </div>
              <div class="customer-row">
                <span class="customer-label">العنوان:</span>
                <span class="customer-value">${s.customer.address}${s.customer.city?", "+s.customer.city:""}</span>
              </div>
            </div>
          </div>
          
          <!-- جدول المنتجات -->
          <div class="products-section">
            <table class="products-table">
              <thead>
                <tr>
                  <th>رقم</th>
                  <th>صورة المنتج</th>
                  <th>المواصفات</th>
                  <th>الكمية</th>
                  <th>سعر الوحدة</th>
                  <th>السعر الإجمالي</th>
                </tr>
              </thead>
              <tbody>
                ${s.items.map((o,N)=>`
                  <tr>
                    <td>${N+1}</td>
                    <td><img src="${o.image}" alt="${o.name}" class="product-image" /></td>
                    <td>
                      <div style="font-weight: bold; margin-bottom: 5px;">${o.name}</div>
                      <div style="font-size: 12px; color: #6b7280;">${o.specifications}</div>
                    </td>
                    <td>${o.quantity}</td>
                    <td>${o.unitPrice} د.ل</td>
                    <td>${o.totalPrice} د.ل</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
          
          <!-- المبالغ الإجمالية -->
          <div class="totals-section">
            <div class="total-row subtotal">
              <span>إجمالي المنتجات</span>
              <span>${s.subtotal} د.ل</span>
            </div>
            <div class="total-row shipping">
              <span>قيمة الشحن والتوصيل</span>
              <span>${s.shippingCost||0} د.ل</span>
            </div>
            <div class="total-row discount">
              <span>قيمة كوبون الخصم (${s.discountPercentage||50}%)</span>
              <span>- ${s.discountAmount||0} د.ل</span>
            </div>
            <div class="total-row final-total">
              <span>المجموع النهائي للفاتورة</span>
              <span>${s.finalTotal||s.subtotal+(s.shippingCost||0)-(s.discountAmount||0)} د.ل</span>
            </div>
          </div>
          
          <!-- الشروط والأحكام -->
          <div class="terms-section">
            هذه الفاتورة خاضعة لشروط سياسات الإرجاع والاستبدال وفق الشروط والسياسات المعتمدة لمنصة إشرو خلال 14 يوم للمنتجات الغير مفتوحة
          </div>
          
          <!-- قسم التواقيع -->
          <div class="signatures-section">
            <div class="signature">
              <div class="signature-title">توقيع إستلام الفاتورة</div>
              <div class="signature-line"></div>
            </div>
            <div class="signature">
              <div class="signature-title">توقيع خدمة التوصيل</div>
              <div class="signature-line"></div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;b.document.write(h),b.document.close(),p&&p()},Q=()=>{const b=window.open("","_blank","width=900,height=700");if(!b)return;const h=`
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>فاتورة ${s.id}</title>
        <style>
          @font-face {
            font-family: 'Cairo';
            src: url('/fonts/Cairo-Regular.ttf') format('truetype');
            font-weight: 400;
          }
          @font-face {
            font-family: 'Cairo';
            src: url('/fonts/Cairo-Bold.ttf') format('truetype');
            font-weight: 700;
          }
          @font-face {
            font-family: 'Cairo';
            src: url('/fonts/Cairo-Medium.ttf') format('truetype');
            font-weight: 500;
          }
          
          * {
            font-family: 'Cairo', sans-serif;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            background: white;
            color: #333;
            line-height: 1.6;
            padding: 20px;
            direction: rtl;
            font-size: 14px;
          }
          
          .invoice-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border: 1px solid #ddd;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          
          .invoice-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 2px solid #dc2626;
          }
          
          .logo-section {
            display: flex;
            align-items: center;
          }
          
          .logo {
            height: 50px;
            width: auto;
            max-width: 200px;
          }
          
          .logo-fallback {
            width: 50px;
            height: 50px;
            background: #0ea5e9;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            border-radius: 8px;
            font-size: 16px;
          }
          
          .date-section {
            text-align: left;
            font-size: 14px;
            font-weight: 500;
          }
          
          .date-section div:first-child {
            font-weight: bold;
            margin-bottom: 5px;
          }
          
          .invoice-title {
            text-align: center;
            padding: 20px;
            background: #f8fafc;
            border-bottom: 1px solid #e2e8f0;
          }
          
          .invoice-title h1 {
            color: #dc2626;
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          
          .reference-number {
            font-size: 16px;
            font-weight: bold;
            color: #374151;
          }
          
          .customer-section {
            padding: 20px;
            border-bottom: 1px solid #e2e8f0;
          }
          
          .customer-title {
            background: #f3f4f6;
            padding: 15px;
            border-right: 4px solid #dc2626;
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 15px;
            text-align: center;
          }
          
          .customer-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
          }
          
          .customer-row {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          
          .customer-label {
            font-weight: bold;
            color: #374151;
            min-width: 100px;
          }
          
          .customer-value {
            color: #6b7280;
          }
          
          .products-section {
            overflow-x: auto;
          }
          
          .products-table {
            width: 100%;
            border-collapse: collapse;
          }
          
          .products-table th {
            background: #dc2626;
            color: white;
            padding: 15px 10px;
            text-align: center;
            font-weight: bold;
            border: 1px solid #b91c1c;
          }
          
          .products-table td {
            padding: 12px 10px;
            text-align: center;
            border: 1px solid #e2e8f0;
            vertical-align: middle;
          }
          
          .products-table tbody tr:nth-child(even) {
            background: #f8fafc;
          }
          
          .product-image {
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 5px;
          }
          
          .totals-section {
            background: #f8fafc;
            padding: 20px;
          }
          
          .total-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 15px;
            margin-bottom: 5px;
            border-radius: 5px;
          }
          
          .subtotal {
            background: #dc2626;
            color: white;
            font-weight: bold;
          }
          
          .shipping {
            background: #f97316;
            color: white;
            font-weight: bold;
          }
          
          .discount {
            background: #10b981;
            color: white;
            font-weight: bold;
          }
          
          .final-total {
            background: #1e40af;
            color: white;
            font-weight: bold;
            font-size: 16px;
            margin-top: 10px;
          }
          
          .terms-section {
            background: #f0f9ff;
            padding: 15px 20px;
            border-top: 1px solid #e2e8f0;
            font-size: 12px;
            color: #6b7280;
            text-align: center;
            line-height: 1.5;
          }
          
          .signatures-section {
            display: flex;
            justify-content: space-between;
            padding: 40px 20px;
            border-top: 1px solid #e2e8f0;
          }
          
          .signature {
            text-align: center;
            width: 45%;
          }
          
          .signature-title {
            font-weight: bold;
            margin-bottom: 30px;
            color: #374151;
          }
          
          .signature-line {
            width: 100%;
            height: 2px;
            border-bottom: 2px solid #374151;
          }
          
          .download-buttons {
            text-align: center;
            padding: 20px;
            background: #f8fafc;
            border-top: 1px solid #e2e8f0;
          }
          
          .download-btn {
            background: #dc2626;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            margin: 0 10px;
            cursor: pointer;
            font-family: 'Cairo', sans-serif;
            font-weight: bold;
          }
          
          .download-btn:hover {
            background: #b91c1c;
          }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <!-- رأس الفاتورة -->
          <div class="invoice-header">
            <div class="logo-section">
              <img src="/eshro-new-logo.png" alt="إشرو" class="logo" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
              <div class="logo-fallback" style="display:none;">إشرو</div>
            </div>
            <div class="date-section">
              <div>التاريخ/الوقت:</div>
              <div>${E(s.date)}</div>
            </div>
          </div>
          
          <!-- عنوان الفاتورة -->
          <div class="invoice-title">
            <h1>الفاتورة النهائية</h1>
            <div class="reference-number">الرقم المرجعي: ${s.id}</div>
          </div>
          
          <!-- معلومات العميل -->
          <div class="customer-section">
            <div class="customer-title">معلومات العميل</div>
            <div class="customer-info">
              <div class="customer-row">
                <span class="customer-label">الاسم:</span>
                <span class="customer-value">${s.customer.name}</span>
              </div>
              <div class="customer-row">
                <span class="customer-label">رقم الهاتف:</span>
                <span class="customer-value">${s.customer.phone}</span>
              </div>
              <div class="customer-row">
                <span class="customer-label">البريد الإلكتروني:</span>
                <span class="customer-value">${s.customer.email}</span>
              </div>
              <div class="customer-row">
                <span class="customer-label">العنوان:</span>
                <span class="customer-value">${s.customer.address}${s.customer.city?", "+s.customer.city:""}</span>
              </div>
            </div>
          </div>
          
          <!-- جدول المنتجات -->
          <div class="products-section">
            <table class="products-table">
              <thead>
                <tr>
                  <th>رقم</th>
                  <th>صورة المنتج</th>
                  <th>المواصفات</th>
                  <th>الكمية</th>
                  <th>سعر الوحدة</th>
                  <th>السعر الإجمالي</th>
                </tr>
              </thead>
              <tbody>
                ${s.items.map((o,N)=>`
                  <tr>
                    <td>${N+1}</td>
                    <td><img src="${o.image}" alt="${o.name}" class="product-image" /></td>
                    <td>
                      <div style="font-weight: bold; margin-bottom: 5px;">${o.name}</div>
                      <div style="font-size: 12px; color: #6b7280;">${o.specifications}</div>
                    </td>
                    <td>${o.quantity}</td>
                    <td>${o.unitPrice} د.ل</td>
                    <td>${o.totalPrice} د.ل</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
          
          <!-- المبالغ الإجمالية -->
          <div class="totals-section">
            <div class="total-row subtotal">
              <span>إجمالي المنتجات</span>
              <span>${s.subtotal} د.ل</span>
            </div>
            <div class="total-row shipping">
              <span>قيمة الشحن والتوصيل</span>
              <span>${s.shippingCost||0} د.ل</span>
            </div>
            <div class="total-row discount">
              <span>قيمة كوبون الخصم (${s.discountPercentage||50}%)</span>
              <span>- ${s.discountAmount||0} د.ل</span>
            </div>
            <div class="total-row final-total">
              <span>المجموع النهائي للفاتورة</span>
              <span>${s.finalTotal||s.subtotal+(s.shippingCost||0)-(s.discountAmount||0)} د.ل</span>
            </div>
          </div>
          
          <!-- الشروط والأحكام -->
          <div class="terms-section">
            هذه الفاتورة خاضعة لشروط سياسات الإرجاع والاستبدال وفق الشروط والسياسات المعتمدة لمنصة إشرو خلال 14 يوم للمنتجات الغير مفتوحة
          </div>
          
          <!-- أزرار التحميل -->
          <div class="download-buttons">
            <button class="download-btn" onclick="window.print()">طباعة الفاتورة</button>
            <button class="download-btn" onclick="window.close()">إغلاق</button>
          </div>
          
          <!-- قسم التواقيع -->
          <div class="signatures-section">
            <div class="signature">
              <div class="signature-title">توقيع إستلام الفاتورة</div>
              <div class="signature-line"></div>
            </div>
            <div class="signature">
              <div class="signature-title">توقيع خدمة التوصيل</div>
              <div class="signature-line"></div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;b.document.write(h),b.document.close(),f&&f()};return e.jsxs(j,{className:"w-full max-w-4xl mx-auto",children:[e.jsxs(ve,{className:"text-center",children:[e.jsxs("div",{className:"flex items-center justify-center gap-2 mb-4",children:[e.jsx(le,{className:"h-6 w-6 text-green-600"}),e.jsx(we,{className:"text-2xl text-green-600",children:"تم إنشاء الفاتورة بنجاح"})]}),e.jsxs("p",{className:"text-muted-foreground",children:["رقم الفاتورة: ",e.jsx(J,{variant:"outline",children:s.id})]})]}),e.jsxs(C,{children:[e.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 justify-center items-center",children:[e.jsxs(c,{onClick:F,className:"flex items-center gap-2",size:"lg",children:[e.jsx(De,{className:"h-5 w-5"}),"طباعة الفاتورة"]}),e.jsxs(c,{onClick:Q,variant:"outline",className:"flex items-center gap-2",size:"lg",children:[e.jsx(oe,{className:"h-5 w-5"}),"معاينة وتحميل"]}),I&&e.jsx(c,{onClick:I,variant:"ghost",className:"flex items-center gap-2",size:"lg",children:"إغلاق"})]}),e.jsx("div",{className:"mt-6 p-4 bg-blue-50 rounded-lg",children:e.jsxs("div",{className:"flex items-start gap-2",children:[e.jsx("div",{className:"w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-blue-800 font-medium mb-2",children:"معلومات مهمة:"}),e.jsxs("ul",{className:"text-sm text-blue-700 space-y-1",children:[e.jsx("li",{children:"• يمكنك طباعة الفاتورة مباشرة أو حفظها كملف PDF"}),e.jsx("li",{children:"• الفاتورة تحتوي على جميع تفاصيل الطلب والدفع"}),e.jsx("li",{children:"• احتفظ بنسخة من الفاتورة للمراجع المستقبلية"})]})]})]})})]})]})},Ae=s=>{var p,f;if(s){if(Array.isArray(s.images)&&s.images.length>0)return s.images[0];if(s.image)return s.image;if(s.thumbnail)return s.thumbnail;if(Array.isArray((p=s.product)==null?void 0:p.images)&&s.product.images.length>0)return s.product.images[0];if((f=s.product)!=null&&f.image)return s.product.image}},ne=(s,p)=>{var f;return(s==null?void 0:s.id)!==void 0?String(s.id):((f=s==null?void 0:s.product)==null?void 0:f.id)!==void 0?String(s.product.id):(s==null?void 0:s.productId)!==void 0?String(s.productId):`product-${p}`},We=({orders:s=[],favorites:p=[],unavailableItems:f=[],onBack:I,onToggleFavorite:E,onRemoveFavorite:F,onNotifyWhenAvailable:Q,onAddToCart:b,onDeleteOrder:h,onRemoveUnavailableItem:o})=>{const[N,S]=y.useState([]);X.useEffect(()=>{const t=()=>{try{const i=JSON.parse(localStorage.getItem("eshro_unavailable")||"[]");S(i)}catch{S([])}};t();const a=()=>{t()};return window.addEventListener("storage",a),()=>window.removeEventListener("storage",a)},[]);const[d,$]=y.useState("purchases"),[_,D]=y.useState(!1),[M,W]=y.useState(null),[k,V]=y.useState(null),[u,z]=y.useState({name:"",phone:"",email:"",notificationTypes:[]}),[re,R]=y.useState(!1),[ce,G]=y.useState({}),[Le,de]=y.useState([]),[K,O]=y.useState(null);X.useEffect(()=>{G(t=>{const a={};return p.forEach((i,l)=>{const n=ne(i,l);a[n]=t[n]||1}),a})},[p]),X.useEffect(()=>{JSON.parse(localStorage.getItem("eshro_unavailable")||"[]").length>f.length},[f]);const Z=(t,a)=>{G(i=>{const l=i[t]||1,n=Math.max(1,l+a);return n===l?i:{...i,[t]:n}})},me=()=>{if(!u.name||!u.phone||!u.email||u.notificationTypes.length===0){alert("يرجى ملء جميع الحقول المطلوبة");return}if(!k)return;const t={id:Date.now(),productId:k.id,product:k,quantity:1,name:u.name,phone:u.phone,email:u.email,notificationTypes:u.notificationTypes,createdAt:new Date().toISOString()};de(a=>[...a,t]),R(!0),V(null),z({name:"",phone:"",email:"",notificationTypes:[]})},xe=t=>{z(a=>({...a,notificationTypes:a.notificationTypes.includes(t)?a.notificationTypes.filter(i=>i!==t):[...a.notificationTypes,t]}))},pe=t=>{var i,l,n,m,x,g;const a={id:t.id,date:t.date,time:t.time,customer:{name:((i=t.customer)==null?void 0:i.name)||"مجهول",phone:((l=t.customer)==null?void 0:l.phone)||"",email:((n=t.customer)==null?void 0:n.email)||"",address:((m=t.customer)==null?void 0:m.address)||"",city:((x=t.customer)==null?void 0:x.city)||""},items:(t.items||[]).map((r,v)=>({id:v+1,name:r.product.name,image:r.product.images[0],specifications:`المقاس: ${r.size} - اللون: ${r.color}`,quantity:r.quantity,unitPrice:r.product.price,totalPrice:r.product.price*r.quantity})),subtotal:t.subtotal,shippingCost:t.shippingCost||((g=t.shipping)==null?void 0:g.cost)||0,discountAmount:t.discountAmount||0,discountPercentage:t.discountPercentage||0,finalTotal:t.finalTotal};W(a),D(!0)},he=t=>{switch(t){case"confirmed":return{label:"مؤكد",color:"bg-blue-500",icon:e.jsx(le,{className:"h-4 w-4"})};case"processing":return{label:"جاري التحضير",color:"bg-yellow-500",icon:e.jsx(ie,{className:"h-4 w-4"})};case"shipped":return{label:"تم الشحن",color:"bg-purple-500",icon:e.jsx($e,{className:"h-4 w-4"})};case"delivered":return{label:"تم التسليم",color:"bg-green-500",icon:e.jsx(B,{className:"h-4 w-4"})};default:return{label:"غير محدد",color:"bg-gray-500",icon:e.jsx(ie,{className:"h-4 w-4"})}}},ue=t=>{try{const a=new Date(t);return a.toLocaleDateString("ar-LY")+" "+a.toLocaleTimeString("ar-LY")}catch{return t}},ge=t=>`${window.location.origin}/product/${t.id}?utm_source=favorites_share&utm_medium=social&utm_campaign=eshro`;return e.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-gray-50 to-white orders-page",id:"orders-section",children:[e.jsx("div",{className:"sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b",children:e.jsx("div",{className:"container mx-auto px-4 py-4",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs(c,{variant:"ghost",onClick:I,className:"flex items-center gap-2 hover:bg-primary/10",children:[e.jsx(ye,{className:"h-4 w-4"}),"العودة للرئيسية"]}),e.jsx("div",{className:"flex items-center gap-2",children:e.jsx("img",{src:"/eshro-new-logo.png",alt:"إشرو",className:"h-8 w-auto",onError:t=>{t.target.style.display="none";const a=t.target.parentElement;a&&(a.innerHTML+='<span class="text-xl font-bold text-primary">إشرو</span>')}})})]})})}),e.jsxs("div",{className:"container mx-auto px-4 py-8",children:[e.jsx("h1",{className:"text-3xl font-bold text-center mb-8 text-gray-900",children:"طلباتي"}),e.jsx("div",{className:"flex justify-center mb-8",children:e.jsxs("div",{className:"flex bg-gray-100 rounded-xl p-1",children:[e.jsxs("button",{onClick:()=>$("favorites"),"data-tab":"favorites",className:`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${d==="favorites"?"bg-white text-primary shadow-sm":"text-gray-600 hover:text-primary"}`,children:[e.jsx(se,{className:"h-4 w-4 inline-block ml-2"}),"طلبات المفضلة (",p.length,")"]}),e.jsxs("button",{onClick:()=>$("unavailable"),"data-tab":"unavailable",className:`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${d==="unavailable"?"bg-white text-primary shadow-sm":"text-gray-600 hover:text-primary"}`,children:[e.jsx(Y,{className:"h-4 w-4 inline-block ml-2"}),"طلبات غير متوفرة (",N.length,")"]}),e.jsxs("button",{onClick:()=>$("purchases"),"data-tab":"purchases",className:`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${d==="purchases"?"bg-white text-primary shadow-sm":"text-gray-600 hover:text-primary"}`,children:[e.jsx(B,{className:"h-4 w-4 inline-block ml-2"}),"المشتريات (",s.length,")"]})]})}),d==="favorites"&&e.jsx("div",{className:"space-y-4",children:p.length===0?e.jsxs(j,{className:"p-8 text-center",children:[e.jsx(se,{className:"h-16 w-16 text-gray-400 mx-auto mb-4"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-600 mb-2",children:"لا توجد منتجات مفضلة"}),e.jsx("p",{className:"text-gray-500",children:"ابدأ بإضافة منتجات لقائمة المفضلة لتراها هنا"})]}):e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:p.map((t,a)=>{var P,L,ee,te;const i=t,l=ne(i,a),n=Ae(i),m=i.name||((P=i.product)==null?void 0:P.name)||"منتج من متاجر إشرو",x=i.price??((L=i.product)==null?void 0:L.price)??0,g=i.originalPrice??((ee=i.product)==null?void 0:ee.originalPrice),r=ce[l]||1,v=typeof i.id=="number"?i.id:typeof((te=i.product)==null?void 0:te.id)=="number"?i.product.id:void 0,w={...i,id:v??i.id},A=Array.isArray(w.images)&&w.images.length>0?w.images:n?[n]:[],T={...w,images:A};return e.jsxs(j,{className:"overflow-hidden hover:shadow-lg transition-all duration-300",children:[e.jsxs("div",{className:"relative",children:[e.jsx("img",{src:n||"/assets/products/placeholder.png",alt:m,className:"w-full h-32 object-cover",onError:fe=>{fe.target.src="/assets/products/placeholder.png"}}),e.jsx("button",{onClick:()=>{v!==void 0&&F(v)},title:"إزالة من المفضلة",className:"absolute top-2 left-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors",children:e.jsx(ae,{className:"h-4 w-4"})}),e.jsx("div",{className:"absolute top-2 right-2",children:e.jsx(Se,{url:ge(T),title:`تحقق من هذا المنتج الرائع: ${m} - سعر مميز ${x} د.ل في متجر إشرو!`,className:"w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors",size:"sm",variant:"default"})})]}),e.jsxs(C,{className:"p-4",children:[e.jsx("h3",{className:"font-semibold text-gray-900 mb-2 line-clamp-2",children:m}),e.jsxs("div",{className:"flex items-center gap-2 mb-3",children:[e.jsxs("span",{className:"text-lg font-bold text-primary",children:[x," د.ل"]}),g!==void 0&&g>x&&e.jsxs("span",{className:"text-sm text-gray-500 line-through",children:[g," د.ل"]})]}),e.jsxs("div",{className:"flex items-center justify-between mb-3",children:[e.jsx("span",{className:"text-sm text-gray-600",children:"الكمية:"}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(c,{variant:"outline",size:"sm",onClick:()=>Z(l,-1),disabled:r<=1,children:e.jsx(ze,{className:"h-3 w-3"})}),e.jsx("span",{className:"w-8 text-center font-semibold",children:r}),e.jsx(c,{variant:"outline",size:"sm",onClick:()=>Z(l,1),children:e.jsx(Te,{className:"h-3 w-3"})})]})]}),e.jsxs(c,{onClick:()=>b(T),className:"w-full bg-primary hover:bg-primary/90 text-white",children:[e.jsx(je,{className:"h-4 w-4 mr-2"}),"أضف للسلة"]})]})]},l)})})}),d==="unavailable"&&e.jsx("div",{className:"space-y-4",children:N.length===0?e.jsxs(j,{className:"p-8 text-center",children:[e.jsx(Y,{className:"h-16 w-16 text-gray-400 mx-auto mb-4"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-600 mb-2",children:"لا توجد طلبات إشعار"}),e.jsx("p",{className:"text-gray-500",children:"عندما تطلب إشعاراً لمنتج غير متوفر، سيظهر هنا"})]}):e.jsx("div",{className:"space-y-3",children:N.map((t,a)=>{var i,l,n,m;return e.jsx(j,{className:"overflow-hidden border border-gray-200",children:e.jsx(C,{className:"p-4",children:e.jsxs("div",{className:"flex gap-4",children:[e.jsx("div",{className:"w-20 h-20 rounded-lg overflow-hidden flex-shrink-0",children:e.jsx("img",{src:((i=t.images)==null?void 0:i[0])||"/assets/products/placeholder.png",alt:t.name||"منتج غير متوفر",className:"w-full h-full object-cover opacity-80",onError:x=>{x.target.src="/assets/products/placeholder.png"}})}),e.jsx("div",{className:"flex-1",children:e.jsxs("div",{className:"flex justify-between items-start",children:[e.jsxs("div",{className:"text-right flex-1",children:[e.jsx("h3",{className:"text-lg font-bold text-gray-900 mb-2",children:t.name}),e.jsxs("div",{className:"space-y-1 text-sm text-gray-600",children:[e.jsxs("div",{children:["الكمية: ",((l=t.notificationData)==null?void 0:l.quantity)||1]}),e.jsxs("div",{children:["الهاتف: ",(n=t.notificationData)==null?void 0:n.phone]}),((m=t.notificationData)==null?void 0:m.email)&&e.jsxs("div",{children:["البريد الإلكتروني: ",t.notificationData.email]})]})]}),e.jsxs("div",{className:"text-left",children:[e.jsxs("div",{className:"text-xs text-gray-500 mb-2",children:[e.jsx("div",{children:new Date(t.requestedAt).toLocaleDateString("ar-LY")}),e.jsx("div",{children:new Date(t.requestedAt).toLocaleTimeString("ar-LY",{hour12:!0,hour:"2-digit",minute:"2-digit"})})]}),e.jsxs(c,{variant:"outline",size:"sm",onClick:()=>O(a),className:"mb-2 text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400",children:[e.jsx(H,{className:"h-4 w-4 mr-1"}),"إزالة"]}),e.jsx(J,{className:"bg-yellow-100 text-yellow-800 border border-yellow-300 px-3 py-1",children:"في الانتظار"})]})]})})]})})},a)})})}),d==="purchases"&&e.jsx("div",{className:"space-y-6",children:s.length===0?e.jsxs(j,{className:"p-8 text-center",children:[e.jsx(B,{className:"h-16 w-16 text-gray-400 mx-auto mb-4"}),e.jsx("h3",{className:"text-xl font-semibold text-gray-600 mb-2",children:"لا توجد عمليات شراء"}),e.jsx("p",{className:"text-gray-500",children:"عمليات الشراء المكتملة ستظهر هنا"})]}):e.jsx("div",{className:"space-y-4",children:s.filter(t=>t&&t.id).map(t=>{var i,l;const a=he(t.status);return e.jsx(j,{className:"overflow-hidden",children:e.jsx(C,{className:"p-6",children:e.jsx("div",{className:"flex flex-col lg:flex-row gap-6",children:e.jsxs("div",{className:"flex-1",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("div",{children:[e.jsxs("h3",{className:"text-lg font-bold text-gray-900",children:["طلب رقم: ",t.id]}),e.jsx("p",{className:"text-sm text-gray-600",children:ue(t.date)})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs(c,{variant:"outline",size:"sm",onClick:()=>{window.confirm("هل أنت متأكد من حذف هذا الطلب؟ لن يمكن استرجاع هذه العملية.")&&h(t.id)},className:"flex items-center gap-2 hover:bg-red-50 hover:border-red-300 text-red-600",children:[e.jsx(ae,{className:"h-4 w-4"}),"حذف"]}),e.jsxs(c,{variant:"outline",size:"sm",onClick:()=>pe(t),className:"flex items-center gap-2 hover:bg-primary/10 hover:border-primary",children:[e.jsx(oe,{className:"h-4 w-4"}),"تصدير الفاتورة"]}),e.jsxs(J,{className:`${a.color} text-white px-3 py-1`,children:[a.icon,e.jsx("span",{className:"mr-1",children:a.label})]})]})]}),e.jsx("div",{className:"space-y-3 mb-4",children:(t.items||[]).map((n,m)=>{var x,g,r,v,w,A,T,P;return e.jsxs("div",{className:"flex items-center gap-3 p-3 bg-gray-50 rounded-lg",children:[e.jsx("img",{src:((g=(x=n.product)==null?void 0:x.images)==null?void 0:g[0])||"/assets/products/placeholder.png",alt:((r=n.product)==null?void 0:r.name)||"منتج",className:"w-16 h-16 object-cover rounded-lg",onError:L=>{L.target.src="/assets/products/placeholder.png"}}),e.jsxs("div",{className:"flex-1",children:[e.jsx("h4",{className:"font-medium text-gray-900",children:((v=n.product)==null?void 0:v.name)||"منتج غير محدد"}),e.jsxs("div",{className:"text-sm text-gray-600",children:["المقاس: ",n.size||"غير محدد"," • اللون: ",n.color||"غير محدد"," • الكمية: ",n.quantity||0]}),e.jsxs("div",{className:"flex items-center gap-2 mt-1",children:[e.jsxs("span",{className:"text-primary font-semibold",children:[((((w=n.product)==null?void 0:w.price)||0)*(n.quantity||0)).toFixed(2)," د.ل"]}),(((A=n.product)==null?void 0:A.originalPrice)||0)>(((T=n.product)==null?void 0:T.price)||0)&&e.jsxs("span",{className:"text-xs text-gray-500 line-through",children:[((((P=n.product)==null?void 0:P.originalPrice)||0)*(n.quantity||0)).toFixed(2)," د.ل"]})]})]})]},m)})}),e.jsx("div",{className:"bg-primary/5 rounded-lg p-4",children:e.jsxs("div",{className:"space-y-3 text-sm",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("span",{children:"إجمالي المنتجات:"}),e.jsxs("span",{className:"font-medium",children:[(t.subtotal||0).toFixed(2)," د.ل"]})]}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("span",{children:"قيمة الشحن والتوصيل:"}),e.jsxs("span",{className:"font-medium",children:[(()=>{var m,x,g,r,v;const n=t.shippingCost||((m=t.shipping)==null?void 0:m.cost)||0;if(n===0&&((x=t.shipping)!=null&&x.type)){const w=((g=t.customer)==null?void 0:g.city)==="طرابلس"||((v=(r=t.customer)==null?void 0:r.city)==null?void 0:v.toLowerCase())==="tripoli";return t.shipping.type==="express"?(w?"85-120":"120-185")+" د.ل":(w?"30-45":"50-85")+" د.ل"}return n.toFixed(2)+" د.ل"})(),e.jsxs("span",{className:"text-xs text-gray-500 block",children:["(",((i=t.shipping)==null?void 0:i.type)==="express"?"سريع":"عادي"," - ",((l=t.shipping)==null?void 0:l.estimatedTime)||"24-96 ساعة",")"]})]})]}),t.discountAmount>0&&e.jsxs("div",{className:"flex justify-between items-center text-green-600",children:[e.jsxs("span",{children:["قيمة خصم الكوبون (",t.discountPercentage||1.5,"%):"]}),e.jsxs("span",{className:"font-medium",children:["-",(t.discountAmount||0).toFixed(2)," د.ل"]})]}),e.jsx("hr",{className:"border-gray-400 my-2"}),e.jsxs("div",{className:"flex justify-between items-center font-bold text-lg pt-2 bg-white rounded-lg px-3 py-2 border",children:[e.jsx("span",{children:"المجموع النهائي:"}),e.jsxs("span",{className:"text-primary text-xl",children:[((t.subtotal||0)+(t.shippingCost||0)-(t.discountAmount||0)).toFixed(2)," د.ل"]})]})]})})]})})})},t.id)})})})]}),k&&e.jsx("div",{className:"fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4",children:e.jsx(j,{className:"w-full max-w-md",children:e.jsxs(C,{className:"p-6",children:[e.jsxs("div",{className:"text-center mb-6",children:[e.jsx("img",{src:k.images[0],alt:k.name,className:"w-24 h-24 object-cover rounded-lg mx-auto mb-4"}),e.jsx("h3",{className:"text-lg font-bold text-gray-900 mb-2",children:k.name}),e.jsx("p",{className:"text-sm text-gray-600",children:"سنرسل لك إشعاراً فور توفر هذا المنتج"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx(q,{htmlFor:"notify-name",children:"الاسم بالكامل *"}),e.jsx(U,{id:"notify-name",value:u.name,onChange:t=>z(a=>({...a,name:t.target.value})),placeholder:"أدخل اسمك الكامل",className:"text-right"})]}),e.jsxs("div",{children:[e.jsx(q,{htmlFor:"notify-phone",children:"رقم الموبايل *"}),e.jsx(U,{id:"notify-phone",value:u.phone,onChange:t=>z(a=>({...a,phone:t.target.value})),placeholder:"9X XXXXXXX",className:"text-right"})]}),e.jsxs("div",{children:[e.jsx(q,{htmlFor:"notify-email",children:"البريد الإلكتروني *"}),e.jsx(U,{id:"notify-email",type:"email",value:u.email,onChange:t=>z(a=>({...a,email:t.target.value})),placeholder:"example@email.com",className:"text-right"})]}),e.jsxs("div",{children:[e.jsx(q,{children:"نوع الإشعار *"}),e.jsx("div",{className:"flex flex-wrap gap-2 mt-2",children:[{id:"email",label:"بريد إلكتروني",icon:e.jsx(Ne,{className:"h-4 w-4"})},{id:"sms",label:"SMS رسالة نصية",icon:e.jsx(Pe,{className:"h-4 w-4"})},{id:"whatsapp",label:"واتساب",icon:e.jsx(ke,{className:"h-4 w-4"})}].map(t=>e.jsxs("button",{onClick:()=>xe(t.label),className:`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 ${u.notificationTypes.includes(t.label)?"border-primary bg-primary text-white":"border-gray-300 hover:border-primary"}`,children:[t.icon,e.jsx("span",{className:"text-sm",children:t.label})]},t.id))})]}),e.jsxs("div",{className:"flex gap-3 pt-4",children:[e.jsxs(c,{onClick:me,className:"flex-1 bg-primary hover:bg-primary/90",children:[e.jsx(Y,{className:"h-4 w-4 mr-2"}),"نبهني عند التوفر"]}),e.jsxs(c,{onClick:()=>V(null),variant:"outline",children:[e.jsx(H,{className:"h-4 w-4 mr-2"}),"إلغاء"]})]})]})]})})}),re&&e.jsx("div",{className:"fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4",children:e.jsx(j,{className:"w-full max-w-md",children:e.jsxs(C,{className:"p-6 text-center",children:[e.jsx("div",{className:"w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4",children:e.jsx(Ce,{className:"h-8 w-8 text-green-600"})}),e.jsx("h3",{className:"text-xl font-bold text-gray-900 mb-2",children:"تم التسجيل بنجاح!"}),e.jsx("p",{className:"text-gray-600 mb-4",children:"شكراً لك! سنرسل لك إشعاراً فور توفر هذا المنتج إليك"}),e.jsx("p",{className:"text-sm text-gray-500 mb-6",children:"يمكنك متابعة جميع طلبات الإشعارات الخاصة بك بحسابك الشخصي بمتجر إشرو"}),e.jsxs("div",{className:"flex gap-3",children:[e.jsx(c,{onClick:()=>{R(!1),$("unavailable"),setTimeout(()=>{const t=document.querySelector(".orders-page")||document.querySelector("#orders-section");t&&t.scrollIntoView({behavior:"smooth"})},100)},className:"flex-1 bg-primary hover:bg-primary/90",children:"تابع عند التوفر"}),e.jsx(c,{onClick:()=>R(!1),variant:"outline",children:"إغلاق"})]})]})})}),_&&M&&e.jsx("div",{className:"fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4",children:e.jsx("div",{className:"max-w-4xl w-full max-h-[90vh] overflow-y-auto",children:e.jsx(Me,{invoice:M,onPrint:()=>{},onDownload:()=>{},onClose:()=>{D(!1),W(null)}})})}),K!==null&&e.jsx("div",{className:"fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4",children:e.jsx(j,{className:"w-full max-w-md",children:e.jsxs(C,{className:"p-6 text-center",children:[e.jsx("div",{className:"w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4",children:e.jsx(H,{className:"h-8 w-8 text-red-600"})}),e.jsx("h3",{className:"text-xl font-bold text-gray-900 mb-2",children:"تأكيد الإزالة"}),e.jsxs("p",{className:"text-gray-600 mb-6",children:["هل أنت متأكد من أنك تريد إزالة هذا الطلب من قائمة الطلبات غير المتوفرة؟",e.jsx("br",{}),"لن تتلقى إشعاراً عند توفر هذا المنتج بعد الإزالة."]}),e.jsxs("div",{className:"flex gap-3",children:[e.jsx(c,{onClick:()=>{const a=JSON.parse(localStorage.getItem("eshro_unavailable")||"[]").filter((i,l)=>l!==K);localStorage.setItem("eshro_unavailable",JSON.stringify(a)),S(a),window.dispatchEvent(new Event("storage")),O(null),alert("تم إزالة الطلب بنجاح!")},className:"flex-1 bg-red-600 hover:bg-red-700 text-white",children:"إزالة"}),e.jsx(c,{onClick:()=>O(null),variant:"outline",className:"flex-1",children:"إلغاء"})]})]})})})]})};export{We as default};
