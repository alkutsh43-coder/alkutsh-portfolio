// =========================================================================
// كود Google Apps Script لربط تسجيل الدخول بملف Google Sheet (إكسل) تلقائياً
// =========================================================================
// الخطوات البسيطة (تأخذ دقيقة واحدة فقط):
// 1. افتح موقع Google Drive أو: https://sheets.new لإنشاء شيت جديد.
// 2. سمِّ الملف مثلاً: "مسجلي موقع الكوتش ديزاين".
// 3. من القائمة العلوية اضغط على: Extensions (الإضافات) ثم اختر Apps Script.
// 4. امسح أي كود موجود هناك، والصق هذا الكود بالكامل بدلاً منه.
// 5. اضغط زر "Deploy" (نشر) الأزرق بالأعلى -> New deployment (نشر جديد).
// 6. اختر نوع النشر: Web app (تطبيق ويب).
// 7. في الإعدادات:
//    - Execute as: Me (أنا - بحسابك)
//    - Who has access: Anyone (أي شخص - لكي يستطيع الموقع إرسال البيانات)
// 8. اضغط Deploy وانسخ رابط الـ Web app URL الناتج.
// 9. الصق الرابط في ملف: src/config/authConfig.js داخل المتغير GOOGLE_SHEET_WEBHOOK_URL.
// =========================================================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // إذا كان الشيت فارغاً، ننشئ عناوين الأعمدة بتنسيق أنيق
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "اسم العميل",
        "البريد الإلكتروني (Gmail)",
        "تاريخ ووقت التسجيل",
        "نوع الجهاز",
        "الصفحة التي سجل منها"
      ]);
      
      // تنسيق شريط العناوين بالألوان الرسمية للكوتش ديزاين
      var headerRange = sheet.getRange(1, 1, 1, 5);
      headerRange.setBackground("#071610");
      headerRange.setFontColor("#82E16B");
      headerRange.setFontWeight("bold");
      headerRange.setHorizontalAlignment("center");
      headerRange.setFontSize(11);
      sheet.setRowHeight(1, 35);
    }
    
    // استلام وقراءة البيانات القادمة من الموقع
    var rawData = e.postData ? e.postData.contents : "{}";
    var data = JSON.parse(rawData);
    
    // إضافة صف جديد بكل تفاصيل العميل
    sheet.appendRow([
      data.name || "عميل بدون اسم",
      data.email || "غير متوفر",
      data.signedAt || new Date().toLocaleString("ar-EG"),
      data.device || "غير محدد",
      data.page || ""
    ]);
    
    // ضبط محاذاة الصف الأخير
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1, 1, 5).setHorizontalAlignment("center");
    
    // الرد بنجاح العملية
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "تم حفظ بيانات العميل بنجاح في الشيت"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// دالة اختبارية بسيطة إذا تم فتح الرابط في المتصفح
function doGet(e) {
  return ContentService.createTextOutput("Alkutsh Designs Webhook is Active and Ready!");
}
