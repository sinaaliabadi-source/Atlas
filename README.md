# اطلس هوشمندسازی صنعت

یک وب‌اپ Next.js 14 با App Router و Tailwind برای مرور اطلس AI Caseهای صنعت.

## پیش‌نیاز
- Node.js 18+ (تست شده روی Node 22)

## راه‌اندازی
1. نصب وابستگی‌ها:
   ```bash
   npm install
   ```
2. تبدیل فایل اکسل به JSON (فایل `ai_map_with_topics.xlsx` را در ریشه قرار دهید):
   ```bash
   npm run convert:data
   ```
   فایل خروجی در `data/atlas.json` ذخیره می‌شود. جداکننده پیش‌فرض فیلدهای `ai_case_ids` و `ai_case_labels` کاراکتر `|` در نظر گرفته شده است و در صورت نبود، از `,` استفاده می‌شود.
3. اجرای توسعه:
   ```bash
   npm run dev
   ```
4. ساخت نهایی:
   ```bash
   npm run build
   ```

## ساختار اصلی
- `app/page.tsx`: صفحه خوش‌آمدید با پس‌زمینه گرادینت و انیمیشن ورود.
- `app/atlas/page.tsx`: فلو چندمرحله‌ای انتخاب industry → type → unit → process و جستجو.
- `app/atlas/[aiCaseId]/page.tsx`: جزئیات هر AI Case به همراه مسیرهای مرتبط و ناوبری قبلی/بعدی.
- `components/`: کامپوننت‌های UI شامل `Button`, `Stepper`, `CaseCard`, `Navbar`, `Layout`.
- `scripts/convertExcelToJson.ts`: اسکریپت تبدیل اکسل به JSON در `data/atlas.json`.
- `data/atlas.json`: داده نمونه تولیدشده؛ هنگام وجود اکسل آن را با خروجی تازه جایگزین کنید.

## فونت فارسی
در `app/globals.css` فونت «یکان بخ» تعریف شده است. فایل‌های فونت را در `public/fonts/YekanBakh-Regular.woff2` و `public/fonts/YekanBakh-Bold.woff2` قرار دهید.

## فرضیات
- جداکننده ستون‌های لیستی در اکسل `|` است؛ اگر کاراکتر دیگری وجود داشته باشد، اسکریپت به صورت خودکار `,` را بررسی می‌کند.
- در نبود فایل اکسل، داده نمونه موجود برای نمایش UI استفاده شده است.
