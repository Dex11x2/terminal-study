// تكملة تاب api: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/api/01.js (شرح حقول الدرس في أوله)
MORE("api", [
    {
      t: "ملفات وإيميلات ولوجات",
      l: 2,
      n: "multer و sharp للصور، و nodemailer و Resend للإيميلات، و morgan و pino للوجات",
      items: [
        {
          cmd: "multer",
          title: "استقبل ملف من فورم بحدود واضحة",
          desc: R`رفع الملفات بييجي [[multipart/form-data]] و [[express.json()]] مبيقراهوش، و [[multer]] بيقراه ويحط الملف في [[req.file]] والحقول النصية في [[req.body]].

أهم حاجة الحدود: أقصى حجم، وعدد الملفات، والأنواع المسموحة. من غيرها أي حد يرفعلك ملف ٥ جيجا.`,
          example: R`import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, cb) => {
    const ok = ["image/jpeg", "image/png", "image/webp"].includes(file.mimetype);
    cb(ok ? null : new AppError(400, "Only JPEG, PNG or WebP"), ok);
  },
});

router.post("/avatar", requireAuth, upload.single("avatar"), users.uploadAvatar);
// curl -F "avatar=@me.jpg" -H "Authorization: Bearer ..." localhost:3000/api/users/avatar`,
          try: R`ارفع صورة بـ [[curl -F]]، وبعدين ملف ٦ ميجا، وبعدين PDF غيّرت اسمه لـ [[x.jpg]]. شوف كل واحد بيرجّع إيه، وزوّد في الـ error handler إن [[MulterError]] بكود [[LIMIT_FILE_SIZE]] يتحول لـ 413.`,
          flag: "script",
          deep: {
            why: "صور البروفايل، وإيصالات الدفع، والمستندات: كل تطبيق تقريبًا بيستقبل ملفات. والرفع أخطر input عندك: كبير، و binary، واسمه ونوعه جايين من العميل، وممكن يتنفّذ لو اتحط في مكان غلط.",
            how: R`multer بيقرا الـ stream بتاع الطلب ويفصل الأجزاء. [[memoryStorage]] بيجمع الملف كله في Buffer في الرام ([[req.file.buffer]])، و [[diskStorage]] بيكتبه على الديسك وانت بتحدد الفولدر والاسم. و [[limits.fileSize]] بيقطع الرفع أول ما يعدّي الحد ويرمي [[MulterError]] بكود [[LIMIT_FILE_SIZE]]، والخطأ بيروح لـ error middleware.

[[file.mimetype]] و [[file.originalname]] جايين من العميل كما هم، فأي حد يسمّي ملف [[shell.php.jpg]] ويقول إنه [[image/jpeg]]. عشان كده الفلتر هنا أول خط بس، والتحقق الحقيقي إنك تقرا محتوى الملف (sharp بيفشل لو مش صورة، الدرس الجاي)، وعمرك ما تستخدم [[originalname]] كاسم للحفظ.

[[single]] لملف واحد، و [[array("photos", 5)]] لكذا ملف في نفس الحقل، و [[fields]] لحقول مختلفة. والحقول النصية في نفس الفورم بتوصل في [[req.body]] بعد multer بس، فالـ validation بتاعها لازم يبقى بعده.

وللملفات الكبيرة (فيديوهات)، الأحسن الواجهة ترفع مباشرة على S3 أو R2 بـ presigned URL، والـ API يدّيها اللينك بس، فالملف مبيعدّيش على السيرفر خالص.`,
            when: "أي رفع ملفات لـ Express. memoryStorage للصور الصغيرة اللي هتعالجها، و diskStorage للملفات الأكبر، و presigned URL للفيديوهات والملفات الضخمة.",
            mistakes: R`في مشروع حقيقي كان فيه [[memoryStorage]] مع حد ١٠٠ ميجا للفيديو و ٥٠٠ ميجا للـ PDF. كل رفع بيتحط كله في الرام، فكام رفعة في نفس الوقت ممكن يوقّعوا السيرفر (out of memory). للملفات الكبيرة: disk أو رفع مباشر. وفي نفس المشروع رسالة الخطأ كانت بتقول «10MB» والحد الفعلي 100MB، فخلي الرسالة تتبني من نفس الرقم. وتحفظ بـ [[originalname]] مع diskStorage، فحد يرفع ملف بنفس اسم ملف موجود في الفولدر (زي صورة يوزر تاني) ويكتب عليه، ولو [[preservePath: true]] متفعّل كمان اسم زي [[../../app.js]] يطلع بره الفولدر.`
          },
          teach: R`## middleware بيقرا الفورم ويحط الملف في [[req.file]]

المثال بيعمل حاجتين: يجهّز [[upload]] بإعدادات (الملف يتحط فين، وأقصى حجم، وأنهي أنواع مسموحة)، وبعدين يحط [[upload.single("avatar")]] في route الرفع بين [[requireAuth]] والـ controller.

اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1 و multer 2.4.0، سيرفر على بورت 5850 (بدل 3000) فيه [[AppError]] والـ error handler من درس [[error middleware]]، و [[requireAuth]] بسيط بيقبل [[Bearer test]]، و controller بيرجّع اللي في [[req.file]] كـ JSON عشان نشوفه.

---

## ١. ليه [[express.json()]] مش كفاية؟

الفورم اللي فيه ملف بيتبعت بنوع اسمه [[multipart/form-data]]: الـ body متقسم «أجزاء» (parts)، كل جزء حقل، وبينهم خط فاصل اسمه boundary. جزء فيه نص ([[name=Ali]])، وجزء فيه بايتات الصورة كلها. [[express.json()]] بيقرا [[application/json]] بس، فالطلب ده بيعدّي عليه من غير ما يتقري، و [[req.body]] بيفضل [[undefined]]. multer هو اللي بيفك الأجزاء دي.

---

## ٢. [[multer({ ... })]]: الإعدادات

~~~javascript
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, cb) => { ... },
});
~~~

[[multer(...)]] مبيعملش رفع لوحده، بيرجّع object اسمه [[upload]] فيه دوال تعمل middleware ([[single]] و [[array]] و [[fields]]).

### [[storage: multer.memoryStorage()]]

الملف يتجمع في الذاكرة (RAM) كـ [[Buffer]]، يعني array من البايتات، ويوصلك في [[req.file.buffer]]. مناسب لصورة ٥ ميجا هتعالجها بـ sharp على طول. البديل [[multer.diskStorage({ destination, filename })]] بيكتبه على الديسك.

### [[limits: { fileSize: 5 * 1024 * 1024, files: 1 }]]

- [[5 * 1024 * 1024]] = 5,242,880 بايت = ٥ ميجا (الكيلو ١٠٢٤ بايت، والميجا ١٠٢٤ كيلو). مكتوبة كضرب عشان تتقري «٥ ميجا» بدل رقم محدش فاهمه.
- [[files: 1]]: أقصى عدد ملفات في الطلب كله.

### [[fileFilter: (req, file, cb) => { ... }]]

دالة multer بيناديها لكل ملف **قبل** ما يقرا بايتاته، ومعاها [[file]] فيه معلومات الجزء: [[fieldname]] و [[originalname]] و [[mimetype]]. و [[cb]] (اختصار callback) هي اللي بترد بيها:

| النداء | معناه |
|---|---|
| [[cb(null, true)]] | مفيش خطأ، اقبل الملف |
| [[cb(null, false)]] | مفيش خطأ، بس تجاهل الملف ([[req.file]] هيبقى [[undefined]]) |
| [[cb(err)]] | ارفض الطلب كله بالخطأ ده، فيروح للـ error handler |

والسطرين اللي جوه:

~~~javascript
const ok = ["image/jpeg", "image/png", "image/webp"].includes(file.mimetype);
cb(ok ? null : new AppError(400, "Only JPEG, PNG or WebP"), ok);
~~~

- [[[...].includes(x)]]: [[true]] لو [[x]] واحد من عناصر القايمة.
- [[file.mimetype]]: النوع زي [[image/jpeg]]. **مكتوب من العميل** في الطلب، مش محسوب من محتوى الملف.
- [[ok ? null : new AppError(...)]] (الـ ternary): لو [[ok]] يبقى [[null]] (مفيش خطأ)، غير كده خطأ 400.

---

## ٣. [[router.post("/avatar", requireAuth, upload.single("avatar"), users.uploadAvatar)]]

الـ middlewares بتشتغل بالترتيب من الشمال لليمين:

1. [[requireAuth]]: من غير توكن الطلب يقف هنا بـ 401، والملف مبيتقريش أصلًا.
2. [[upload.single("avatar")]]: اقرا ملف واحد من الحقل اللي اسمه [[avatar]] وحطه في [[req.file]]، وأي حقول نص في [[req.body]].
3. [[users.uploadAvatar]]: الـ controller، والملف جاهز قدامه.

---

## ٤. نجرّب: صورة صح

[[-F]] في curl معناها form field، وبيخلي curl يبعت [[multipart/form-data]] لوحده. و [[@]] قبل الاسم معناها «حط محتوى الملف ده»:

~~~bash
curl -i -F "avatar=@me.jpg" -H "Authorization: Bearer test" localhost:5850/api/users/avatar
~~~

~~~text الناتج
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
...

{"field":"avatar","originalname":"me.jpg","mimetype":"image/jpeg","size":3118,"isBuffer":true,"body":{}}
~~~

[[size]] بالبايت، و [[isBuffer: true]] يعني [[req.file.buffer]] فيه البايتات فعلًا. ولو زوّدت [[-F "name=Ali"]] في نفس الطلب، [[body]] طلع [[{"name":"Ali"}]]: الحقول النصية بتوصل من multer، فأي validation عليها لازم ييجي بعده.

---

## ٥. نجرّب الرفض

| الطلب | الرد (قبل تعديل الـ solCode) | ليه |
|---|---|---|
| من غير [[Authorization]] | [[401]] و [[Login required]] | وقف عند [[requireAuth]] |
| ملف ٦ ميجا | [[500]] و [[Internal server error]] | multer رمى [[MulterError]] كوده [[LIMIT_FILE_SIZE]] ومالوش [[status]] |
| [[doc.pdf]] | [[400]] و [[Only JPEG, PNG or WebP]] | curl بعته [[application/pdf]] فالفلتر رفضه |
| PDF اسمه [[x.jpg]] | [[200]] و [[mimetype: "image/jpeg"]] | curl خمّن النوع من الامتداد، والفلتر صدّقه |
| [[-F "photo=@me.jpg"]] | [[500]] | اسم الحقل غلط: [[LIMIT_UNEXPECTED_FILE]] |
| ملفين في [[avatar]] | [[500]] | أكتر من [[files: 1]]: [[LIMIT_FILE_COUNT]] |

السطر التالت من تحت هو أهم سطر في الدرس: PDF عدّى كصورة. الفلتر ده بيمسك الغلط العادي بس، والتحقق الحقيقي على محتوى الملف (sharp، الدرس الجاي).

وفي لوج السيرفر الـ 500 بتاع الملف الكبير كان كده:

~~~text لوج السيرفر
MulterError: File too large
    at abortWithCode (...multer\lib\make-middleware.js:211:22)
    ...
  code: 'LIMIT_FILE_SIZE',
  field: 'avatar',
  filename: 'big.jpg',
~~~

---

## ٦. الـ solCode: [[MulterError]] يبقى 4xx

~~~javascript
if (err instanceof multer.MulterError) {
  const status = err.code === "LIMIT_FILE_SIZE" ? 413 : 400;
  return res.status(status).json({ error: err.message, code: err.code });
}
~~~

- [[instanceof multer.MulterError]]: الخطأ ده جاي من multer (مش أي خطأ تاني).
- [[err.code]]: كود ثابت تقارن بيه. الرسالة ممكن تتغير بين النسخ، والكود لأ.
- [[413]] اسمها Payload Too Large: «الطلب أكبر من المسموح». وباقي أخطاء multer (حقل غلط، ملفات كتير) غلطة في الطلب نفسه، فـ 400.
- [[return]]: عشان الكود اللي تحت ميبعتش رد تاني.

بعد التعديل، نفس الطلبات:

~~~text الناتج
ملف ٦ ميجا        HTTP/1.1 413 Payload Too Large   {"error":"File too large","code":"LIMIT_FILE_SIZE"}
حقل اسمه photo    400   {"error":"Unexpected file field","code":"LIMIT_UNEXPECTED_FILE"}
ملفين             400   {"error":"Too many files","code":"LIMIT_FILE_COUNT"}
~~~

---

## ٧. من ويندوز

[[curl.exe]] (لازم [[.exe]] عشان في Windows PowerShell 5.1 كلمة [[curl]] لوحدها اسم تاني لـ [[Invoke-WebRequest]]) بيدّي نفس النتيجة بالظبط في PowerShell 7.6 و 5.1:

~~~powershell
curl.exe -F "avatar=@me.jpg" -H "Authorization: Bearer test" http://localhost:5850/api/users/avatar
~~~

~~~text الناتج
{"field":"avatar","originalname":"me.jpg","mimetype":"image/jpeg","size":3118,"isBuffer":true,"body":{}}
~~~

أما [[Invoke-RestMethod -Form]] (موجود في PowerShell 7 بس) فبيبعت أي ملف بنوع [[application/octet-stream]] مهما كان امتداده، فالفلتر رفضه:

~~~powershell
Invoke-RestMethod http://localhost:5850/api/users/avatar -Method Post -Form @{ avatar = Get-Item ./me.jpg } -Headers @{ Authorization = "Bearer test" }
~~~

~~~text الناتج
Invoke-RestMethod:
{
  "error": "Only JPEG, PNG or WebP"
}
~~~

وده دليل تاني إن [[mimetype]] مجرد كلام العميل: نفس الصورة اتقبلت من curl واترفضت من PowerShell.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[memoryStorage()]] | الملف في [[req.file.buffer]] (للصغير اللي هتعالجه) |
| [[limits]] | أقصى حجم وعدد، والزيادة [[MulterError]] |
| [[fileFilter]] | أول فلتر بالـ [[mimetype]]، وده بيتزوّر |
| [[single("avatar")]] | ملف واحد من الحقل ده، واسم الحقل لازم يطابق الفورم |
| الـ error handler | [[LIMIT_FILE_SIZE]] تبقى 413 وباقي أخطاء multer 400 بدل 500 |`,
          lines: [
            "multer.",
            "إعدادات الرفع.",
            "خلي الملف في الذاكرة كـ Buffer عشان sharp يعالجه بعدين. مناسب للصور الصغيرة بس.",
            "أقصى حجم ٥ ميجا، وملف واحد.",
            "فلتر بيشتغل قبل ما الملف يتقري.",
            "النوع من قايمة مسموحة. خلي بالك: الـ mimetype جاي من العميل ويتزوّر، والتحقق الحقيقي بعدين بـ sharp.",
            "ارفض بـ 400 أو اقبل.",
            "قفلة الفلتر.",
            "قفلة.",
            R`[[single("avatar")]]: ملف واحد في الحقل ده، وبعد requireAuth عشان محدش يرفع من غير login.`
          ],
          sol: R`الصورة العادية بتعدّي و [[req.file]] فيه [[buffer]] و [[mimetype: "image/jpeg"]] و [[size]]. الملف الـ ٦ ميجا من غير تعديل بيرجّع 500، لأن multer بيرمي [[MulterError]] كوده [[LIMIT_FILE_SIZE]] ورسالته [[File too large]] ومالوش status. بعد التعديل: [[413]] و [[{"error":"File too large"}]].

والـ PDF اللي اسمه [[x.jpg]]: بيعدّي من الـ [[fileFilter]]! لأن [[file.mimetype]] جاي من الكلاينت، و curl بيخمّنه من الامتداد فبيبعت [[image/jpeg]]. فالفلتر ده بيحمي من الغلط العادي بس (PDF بامتداده الحقيقي بيرجع 400 و [[Only JPEG, PNG or WebP]])، والتحقق الحقيقي لازم يبقى على محتوى الملف نفسه، وده اللي sharp بيعمله في الدرس الجاي ([[Not a valid image]]).

لو الصورة الصح رجعت [[Unexpected file field]] (كود [[LIMIT_UNEXPECTED_FILE]])، يبقى اسم الحقل في [[-F "avatar=@..."]] مش زي [[upload.single("avatar")]].`,
          solCode: R`import multer from "multer";

export function errorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    const status = err.code === "LIMIT_FILE_SIZE" ? 413 : 400;
    return res.status(status).json({ error: err.message, code: err.code });
  }
  const status = err.status ?? 500;
  if (status >= 500) console.error(err);
  res.status(status).json({ error: status >= 500 ? "Internal server error" : err.message });
}`
        },
        {
          cmd: "sharp",
          title: "صغّر الصورة واتأكد إنها صورة فعلًا",
          desc: R`[[sharp]] بيقرا الصورة ويصغّرها ويحوّلها لـ WebP، ولأنه لازم يفكها عشان يشتغل عليها، لو الملف مش صورة حقيقية بيفشل.

ودي أحسن طريقة تتأكد من النوع بعد multer. وإعادة الترميز بتشيل الـ metadata (زي مكان التصوير من الـ GPS) افتراضيًا، ودا مهم لخصوصية اليوزرز.`,
          example: R`import sharp from "sharp";
import { randomUUID } from "node:crypto";

export async function saveAvatar(buffer) {
  const meta = await sharp(buffer).metadata().catch(() => null);
  if (!meta || !["jpeg", "png", "webp"].includes(meta.format)) throw new AppError(400, "Not a valid image");
  const name = $__bt$__{randomUUID()}.webp$__bt;
  await sharp(buffer).rotate().resize(512, 512, { fit: "cover" }).webp({ quality: 80 }).toFile($__btuploads/avatars/$__{name}$__bt);
  return $__bt/uploads/avatars/$__{name}$__bt;
}`,
          try: R`اعمل فولدر [[uploads/avatars]]، وارفع صورة موبايل فيها GPS، وقارن الـ EXIF قبل وبعد بأي EXIF viewer. وارفع ملف نصي اسمه منتهي بـ [[.jpg]] واتأكد إنه 400. وقارن الحجم قبل وبعد.`,
          flag: "script",
          deep: {
            why: "صورة الموبايل ٤ لـ ٨ ميجا، والبروفايل بيتعرض ٦٤ بكسل. من غير resize، كل صفحة فيها ١٠ يوزرز بتحمّل ٥٠ ميجا. ومن غير تحقق من المحتوى، أي ملف متسمّي صورة بيعدّي. وصور الموبايل فيها GPS بيقول اليوزر ساكن فين.",
            how: R`sharp مبني على مكتبة libvips (مكتوبة C)، فسريع جدًا وبيستهلك ذاكرة قليلة، والشغل التقيل بيحصل في thread pool مش على الـ event loop. و [[metadata()]] بيقرا الـ header بس من غير ما يفك الصورة كلها، فسريع.

[[rotate()]] من غير رقم بيقرا اتجاه EXIF ويلف الصورة فعلًا، لأن بعد ما الـ metadata تتشال الصورة هتظهر مقلوبة لو ملفتهاش. [[fit: "cover"]] بيقص ويملّا المقاس، و [[inside]] بيصغّر من غير قص، و [[withoutEnlargement]] بيمنع تكبير صورة صغيرة.

الاسم: [[randomUUID()]] بدل اسم اليوزر، فمفيش path traversal ولا ملف يكتب على ملف تاني.

التخزين على الديسك ([[uploads/]]) أبسط، بس بيضيع لو الـ container اتمسح من غير volume، ومبيتشاركش بين سيرفرين. للإنتاج الأحسن object storage زي S3 أو Cloudflare R2 أو Supabase Storage: [[toBuffer()]] بدل [[toFile()]]، وترفع الـ Buffer بالـ SDK بتاعهم ([[PutObjectCommand]] في [[@aws-sdk/client-s3]] مثلًا)، وتحفظ الـ key في الداتابيز. في مشروع حقيقي كان الشكل ده بالظبط: multer في الذاكرة، ثم sharp، ثم رفع لـ Supabase Storage.

والملفات الخاصة (إيصالات، ومستندات) متتخدمش static خالص: route محمي بيتأكد من الملكية وبعدين [[res.sendFile]]، أو signed URL بعمر قصير.`,
            when: "أي صورة جاية من يوزر. ولو هتعرضها بأكتر من مقاس، اعمل أكتر من نسخة (thumb و medium) وقت الرفع، أو استخدم CDN بيعمل resize.",
            mistakes: R`تحط [[uploads]] كلها على [[express.static]] ومعاها ملفات خاصة، فأي حد يخمّن الاسم ياخدها. في مشروع حقيقي إيصالات الدفع كانت جوه نفس الفولدر، واتحلّت بـ if بيمنع المسار ده بالذات من الـ static. الأنضف فولدر خاص بره الـ static خالص. وتنسى [[rotate()]] فصور الموبايل تظهر نايمة.`
          },
          teach: R`## دالة بتاخد البايتات وترجّع مسار صورة نضيفة

[[saveAvatar(buffer)]] بتاخد الـ [[Buffer]] اللي multer حطه في [[req.file.buffer]] (الدرس اللي فات)، وتعمل ٣ حاجات: تتأكد إنه صورة فعلًا، وتديله اسم جديد عشوائي، وتكتب نسخة صغيرة WebP على الديسك. وبترجّع المسار عشان يتحفظ في الداتابيز.

اتشغّل على ويندوز 11 بـ Node 24.19 و sharp 0.35.5 (مبني على libvips 8.18). الصورة اللي جربت بيها JPEG مقاسها 4000×3000 عملتها بـ sharp نفسه، وحطيت فيها EXIF زي صورة الموبايل: [[Make]] و [[Model]] وإحداثيات GPS، و [[Orientation]] بـ 6 (يعني «لفّها ٩٠ درجة وانت بتعرضها»).

---

## ١. الـ imports

~~~javascript
import sharp from "sharp";
import { randomUUID } from "node:crypto";
~~~

- [[sharp]]: المكتبة نفسها. [[sharp(buffer)]] بيرجّع object تبني عليه العمليات ورا بعض.
- [[randomUUID]] من [[node:crypto]] (مكتبة جوه Node، و [[node:]] في الأول معناها «من Node نفسه مش من npm»). UUID اختصار Universally Unique Identifier: نص عشوائي ١٢٨ بت شكله [[8773da92-4568-4cac-b7ec-805e18e44ae3]]، فرصة إنه يتكرر عمليًا صفر.

---

## ٢. [[const meta = await sharp(buffer).metadata().catch(() => null)]]

نفكّه من جوه لبرة:

1. [[sharp(buffer)]]: حمّل البايتات.
2. [[.metadata()]]: اقرا الـ header بتاع الملف بس (النوع والمقاس والـ EXIF) من غير ما تفك الصورة كلها. بترجّع Promise.
3. [[.catch(() => null)]]: لو رمت خطأ، خلي النتيجة [[null]] بدل ما الخطأ يطلع برّه.
4. [[await]]: استنى النتيجة.

على الصورة اللي جربت بيها:

~~~text meta (الحقول المهمة)
format: 'jpeg', width: 4000, height: 3000, orientation: 6, exif: <Buffer 288 بايت>
~~~

وعلى ملف نصي:

~~~text الناتج
Input buffer contains unsupported image format
~~~

ده الخطأ اللي [[.catch]] بيبلعه ويخلي [[meta]] بـ [[null]].

---

## ٣. [[if (!meta || !["jpeg", "png", "webp"].includes(meta.format)) throw ...]]

- [[!meta]]: الملف مش صورة خالص.
- [[||]]: «أو».
- [[!["jpeg", "png", "webp"].includes(meta.format)]]: صورة، بس نوعها مش في القايمة (GIF أو SVG مثلًا).

الفرق عن فلتر multer: [[meta.format]] sharp **حسبه من البايتات نفسها**، مش من كلام العميل. جربت ٣ ملفات:

~~~text الناتج
text as .jpg -> 400 Not a valid image
pdf          -> 400 Not a valid image
gif          -> 400 Not a valid image
~~~

نفس الـ PDF اللي عدّى من multer باسم [[x.jpg]] وقف هنا.

---

## ٤. [[const name = $__bt$__{randomUUID()}.webp$__bt]]

الـ backticks و [[$__{...}]] (template literal) بيحطوا قيمة جوه نص. الاسم بيبقى زي [[e953daa3-26a3-448b-a59b-f5b4f4bc1969.webp]]. وليه مش [[file.originalname]]؟ لأنه جاي من العميل: ممكن يبقى [[../../app.js]] أو نفس اسم صورة يوزر تاني.

---

## ٥. السطر الطويل: من الشمال لليمين

~~~javascript
await sharp(buffer).rotate().resize(512, 512, { fit: "cover" }).webp({ quality: 80 }).toFile($__btuploads/avatars/$__{name}$__bt);
~~~

هنا الترتيب من الشمال لليمين، كل نقطة بتضيف عملية للـ pipeline، ومفيش حاجة بتتنفذ فعلًا غير عند [[toFile]].

### [[.rotate()]]

من غير رقم: اقرا [[Orientation]] من الـ EXIF ولف البكسلات فعلًا. صورتنا 4000×3000 ومعاها [[orientation: 6]]، وبعد [[rotate()]] لوحدها بقت **3000×4000**. ليه مهم؟ لأن الـ EXIF هيتشال في الآخر، فلو ملفتش البكسلات، المتصفح مش هيلاقي حاجة تقوله يلفها والصورة تظهر نايمة.

### [[.resize(512, 512, { fit: "cover" })]]

العرض ٥١٢ والطول ٥١٢. و [[fit]] بيقول تعمل إيه لو النسبة مختلفة:

| [[fit]] | النتيجة على صورة 4000×3000 |
|---|---|
| [[cover]] | 512×512 بالظبط، والزيادة بتتقص من النص (مناسب للأفاتار المربع) |
| [[inside]] | جربته: طلع 512×384، الصورة كلها جوه المربع من غير قص |

### [[.webp({ quality: 80 })]]

حوّل لـ WebP، صيغة أصغر من JPEG لنفس الشكل وكل المتصفحات الحديثة بتعرضها. [[quality]] من 1 لـ 100، و 80 توازن كويس.

### [[.toFile($__btuploads/avatars/$__{name}$__bt)]]

اكتب الناتج. المسار **نسبي**: يعني من الفولدر اللي السيرفر اتشغّل منه (الـ cwd)، مش من مكان الملف.

---

## ٦. قبل وبعد

~~~text الناتج
before: { format: 'jpeg', width: 4000, height: 3000, orientation: 6, exifBytes: 288, size: 184926 }
saved: /uploads/avatars/8773da92-4568-4cac-b7ec-805e18e44ae3.webp
after:  { format: 'webp', width: 512, height: 512, orientation: undefined, exif: undefined, size: 4704 }
~~~

- الحجم من 184,926 بايت (حوالي 180 كيلو) لـ 4,704 بايت (أقل من 5 كيلو). صورة موبايل حقيقية فيها تفاصيل أكتر بتبقى ميجات، والناتج عشرات الكيلوبايت.
- [[exif: undefined]]: الـ GPS والموديل اتشالوا. sharp مبينقلش الـ metadata للناتج إلا لو طلبت ([[withMetadata()]] أو [[keepExif()]]).

---

## ٧. [[return $__bt/uploads/avatars/$__{name}$__bt]]

المسار اللي هيتحفظ في الداتابيز ويتعرض في الواجهة. بيبدأ بـ [[/]] لأنه عنوان URL (لو الفولدر متقدّم بـ [[express.static]])، مش مسار على الديسك.

---

## ٨. لو الفولدر مش موجود

شغّلت نفس الدالة من فولدر مفيهوش [[uploads/avatars]]:

~~~text الناتج
uploads/avatars/3f522b66-13c2-45a2-834f-b096a581a744.webp: unable to open for write
system error: No such file or directory
~~~

ده خطأ libvips (مش [[ENOENT]] بتاع Node). الحل: اعمل الفولدر مرة وانت بتقوم ([[fs.mkdirSync("uploads/avatars", { recursive: true })]])، أو شغّل السيرفر من فولدر المشروع.

---

## الخلاصة

| الخطوة | ليه |
|---|---|
| [[metadata()]] + [[catch]] | التحقق الحقيقي من النوع: من البايتات مش من الـ mimetype |
| [[randomUUID()]] | اسم مش جاي من اليوزر، فمفيش path traversal ولا كتابة على ملف تاني |
| [[rotate()]] | لف حسب EXIF **قبل** ما الـ EXIF يتشال |
| [[resize(..., { fit: "cover" })]] | مقاس ثابت، ومن 180 كيلو لـ 5 |
| [[webp()]] + [[toFile()]] | صيغة أصغر، والـ GPS ميتنقلش |`,
          lines: [
            "sharp.",
            "UUID عشوائي من Node.",
            "بتاخد الـ Buffer اللي multer جابه.",
            "اقرا معلومات الصورة. لو الملف مش صورة، sharp يرمي ونخليها null.",
            "مش صورة، أو نوع مش مسموح: 400. ده التحقق الحقيقي، مش الـ mimetype.",
            "اسم جديد عشوائي. اسم اليوزر عمره ما يدخل المسار.",
            "لف الصورة حسب EXIF، وقص ٥١٢ في ٥١٢، وحوّل لـ WebP بجودة ٨٠، واكتبها. الـ metadata بتتشال.",
            "رجّع المسار عشان يتحفظ في الداتابيز.",
            "قفلة."
          ],
          sol: R`الصورة الناتجة [[.webp]] مقاسها [[512x512]] وحجمها أصغر بكتير من الأصل (صورة موبايل ٣-٤ ميجا بتبقى عشرات الكيلوبايت). وفي الـ EXIF viewer الأصل فيه GPS وموديل الموبايل والتاريخ، والناتج مفيهوش أي EXIF: sharp مبينقلش الـ metadata إلا لو طلبت [[withMetadata()]]. و [[rotate()]] من غير أرقام بيلف الصورة حسب الـ Orientation اللي في الـ EXIF قبل ما يشيله، فالصورة متطلعش نايمة.

والملف النصي اللي اسمه [[.jpg]]: multer بيعدّيه (الـ mimetype من الامتداد)، بس [[sharp(buffer).metadata()]] بيرمي، فالـ [[catch]] بيرجّع null والرد [[400]] و [[{"error":"Not a valid image"}]].

لو طلع [[unable to open for write]] ومعاه [[system error: No such file or directory]]، يبقى فولدر [[uploads/avatars]] مش موجود أو السيرفر شغال من فولدر تاني (المسار نسبي للـ cwd). ولو الصورة طلعت مقلوبة، اتأكد إن [[rotate()]] قبل [[resize]].`
        },
        {
          cmd: "nodemailer",
          title: "ابعت إيميل من السيرفر عن طريق SMTP",
          desc: R`[[nodemailer]] بيبعت إيميلات عن طريق أي سيرفر SMTP (Gmail، أو خدمة زي Resend و Brevo و SES): transporter مرة واحدة بإعدادات من config، وبعدين [[sendMail]].

الإيميل مش مضمون ولا سريع: ممكن ياخد ثواني أو يفشل. فمتخليش الطلب يستنى عليه لو مش لازم، ومتخليش فشله يوقّع العملية الأساسية.`,
          example: R`import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: 587, secure: false,
  auth: { user: config.SMTP_USER, pass: config.SMTP_PASS },
});

export async function sendResetEmail(to, link) {
  await transporter.sendMail({
    from: '"MyApp" <no-reply@example.com>',
    to,
    subject: "Reset your password",
    text: $__btOpen this link within 30 minutes: $__{link}$__bt,
    html: $__bt<p>Open <a href="$__{link}">this link</a> within 30 minutes.</p>$__bt,
  });
}`,
          try: R`اعمل حساب تجربة على Ethereal بـ [[nodemailer.createTestAccount()]]، وحط بياناته في .env، وابعت إيميل وافتح لينك المعاينة من [[nodemailer.getTestMessageUrl(info)]]. وبعدين نادي [[transporter.verify()]] وانت بتقوم عشان تكتشف إعدادات SMTP الغلط بدري.`,
          flag: "script",
          deep: {
            why: "تأكيد الإيميل، ونسيت الباسورد، وإيصال الطلب، وتنبيهات الأدمن: كلها إيميلات السيرفر لازم يبعتها. و SMTP هو البروتوكول العام اللي أي خدمة إيميل بتفهمه، فالكود بتاعك مش مربوط بمزوّد.",
            how: R`الـ transporter بيفتح اتصال TCP بسيرفر الـ SMTP، ويعمل TLS، ويسجّل دخول، ويبعت الرسالة. [[pool: true]] بيخلي الاتصال مفتوح لإيميلات كتير ورا بعض بدل اتصال لكل واحد.

الـ deliverability (يوصل للـ inbox مش السبام) مش في الكود: الدومين بتاع [[from]] لازم عليه SPF و DKIM و DMARC في الـ DNS، ودا بيتعمل من لوحة الخدمة. و Gmail الشخصي بيقفلك بعد كام إيميل في اليوم ومش معمول لكده.

والسرعة: [[sendMail]] ممكن ياخد ثانية أو اتنين. في «نسيت الباسورد» ينفع ترد على اليوزر الأول وتبعت في الخلفية، بس لو السيرفر وقع قبل ما يبعت، الإيميل بيضيع. الحل الأصح queue (درس [[background jobs]] في «تاب بناء مشروع كامل»، وتاب «APIs متقدمة»).

ولينك الـ reset نفسه: توكن عشوائي، والـ hash بتاعه في الداتابيز، وعمره قصير (٣٠ دقيقة)، ويتستخدم مرة واحدة. ودايمًا رد «لو الإيميل موجود هيوصلك لينك» عشان محدش يعرف مين مسجّل.`,
            when: "لو معاك SMTP من أي مزوّد وعايز مرونة تغيّره. ولو المزوّد عنده API (زي Resend)، الـ API غالبًا أسهل (الدرس الجاي).",
            mistakes: R`في مشروع حقيقي كانت دالة الإرسال بتعمل [[attachments.push(logo)]] على الـ array اللي جاية من اللي نادى، فلو نفس الـ array اتستخدمت مرتين اللوجو يتكرر. متعدّلش في الـ arguments. وتعمل transporter جديد مع كل إيميل. وتبعت الإيميل جوه transaction أو قبل ما الداتا تتحفظ، فيوصل لينك لحاجة مش موجودة.`
          },
          teach: R`## transporter مرة واحدة، و [[sendMail]] لكل إيميل

المثال جزئين: [[createTransport]] بيجهّز «ساعي البريد» بعنوان سيرفر الـ SMTP وبيانات الدخول، ودالة [[sendResetEmail]] بتبعت بيه إيميل «نسيت الباسورد». SMTP اختصار Simple Mail Transfer Protocol: البروتوكول اللي سيرفرات الإيميل بتكلّم بيه بعض من الثمانينات.

اتشغّل على ويندوز 11 بـ Node 24.19 و nodemailer 10.0.15، على حساب تجربة من Ethereal (سيرفر SMTP وهمي بيستقبل الإيميل ويعرضهولك ومبيبعتهوش لحد).

---

## ١. [[nodemailer.createTransport({ ... })]]

~~~javascript
const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: 587, secure: false,
  auth: { user: config.SMTP_USER, pass: config.SMTP_PASS },
});
~~~

| الحقل | معناه |
|---|---|
| [[host]] | اسم سيرفر الـ SMTP، زي [[smtp.ethereal.email]] أو [[smtp.resend.com]] |
| [[port: 587]] | البورت المتعارف عليه لإرسال الإيميل من برنامج |
| [[secure: false]] | ابدأ الاتصال عادي، وبعدين اطلب تشفير بأمر اسمه STARTTLS. ([[secure: true]] مع بورت 465 معناها مشفّر من أول بايت) |
| [[auth.user]] و [[auth.pass]] | بيانات الدخول، من [[config]] (يعني من [[.env]]) مش مكتوبة في الكود |

السطر ده **مبيتصلش** بحاجة. بيعمل object جاهز، والاتصال بيحصل مع أول [[sendMail]] أو [[verify]]. ومتعمّلوش جوه الدالة: transporter واحد للتطبيق كله.

---

## ٢. [[sendResetEmail(to, link)]]

~~~javascript
await transporter.sendMail({
  from: '"MyApp" <no-reply@example.com>',
  to,
  subject: "Reset your password",
  text: $__btOpen this link within 30 minutes: $__{link}$__bt,
  html: $__bt<p>Open <a href="$__{link}">this link</a> within 30 minutes.</p>$__bt,
});
~~~

- [[from]]: [["MyApp" <no-reply@example.com>]] = اسم يظهر للمستلم، والإيميل بين [[< >]]. الـ single quotes برّه عشان الـ double quotes تبقى جزء من النص.
- [[to]]: كده لوحدها اختصار لـ [[to: to]] (اسم المتغير زي اسم الحقل).
- [[text]] و [[html]]: نسختين من نفس الرسالة. برنامج الإيميل بيعرض الـ HTML لو يقدر، والنص لو لأ.
- الـ backticks و [[$__{link}]]: template literal، بيحط اللينك جوه النص.

### الإيميل بيطلع شكله إيه؟

بدّلت الـ transporter بـ [[streamTransport]] (بيبني الرسالة ويرجّعها بدل ما يبعتها) وطبعتها:

~~~text الناتج (متقصّر)
From: MyApp <no-reply@example.com>
To: sara@example.com
Subject: Reset your password
MIME-Version: 1.0
Content-Type: multipart/alternative;
 boundary="--_NmP-02caa168322bb3cd-Part_1"

----_NmP-02caa168322bb3cd-Part_1
Content-Type: text/plain; charset=utf-8
...
----_NmP-02caa168322bb3cd-Part_1
Content-Type: text/html; charset=utf-8
...
~~~

[[multipart/alternative]] معناها «جزئين، نفس المحتوى، اختار واحد». وده اللي [[text]] + [[html]] عملوه. (و [[=3D]] اللي هتشوفها جوه الأجزاء هي [[=]] متشفّرة بطريقة اسمها quoted-printable، برنامج الإيميل بيرجّعها.)

---

## ٣. الـ solCode: جرّب من غير ما تبعت لحد

### [[nodemailer.createTestAccount()]]

بتكلّم Ethereal وتعمل حساب جديد وترجّع بياناته:

~~~text الناتج
account: { user: 'kpq5vodahgb362pw@ethereal.email', host: 'smtp.ethereal.email', port: 587, secure: false }
~~~

### [[await transporter.verify()]]

بيتصل فعلًا، ويعمل STARTTLS، ويسجّل دخول، ويقفل، من غير ما يبعت حاجة. طبع [[true]]. وغيّرت كل إعداد لوحده عشان أشوف الأخطاء:

| الغلط | [[err.code]] | [[err.message]] |
|---|---|---|
| host مش موجود | [[EDNS]] | [[getaddrinfo ENOTFOUND smtp.nope.invalid]] |
| بورت مفيش عليه حد | [[ESOCKET]] | [[connect ECONNREFUSED 127.0.0.1:5853]] |
| باسورد غلط | [[EAUTH]] | [[Invalid login: 535 Authentication failed]] |

- [[getaddrinfo]] دالة النظام اللي بتحوّل اسم لـ IP (DNS)، و [[ENOTFOUND]] = الاسم ملوش IP.
- [[ECONNREFUSED]] = الجهاز موجود بس مفيش برنامج سامع على البورت ده.
- [[535]] رد سيرفر الـ SMTP نفسه، زي الـ status codes في HTTP. الـ 5xx هنا معناها رفض نهائي.

عشان كده بتنادي [[verify()]] وانت بتقوم: الغلطة تبان في اللوج أول ما السيرفر يشتغل.

### [[sendMail]] والـ [[info]]

~~~text الناتج
info: {
  messageId: '<3c7e0829-d697-99da-9189-46515943bc5a@example.com>',
  accepted: [ 'me@example.com' ],
  rejected: [],
  response: '250 Accepted [STATUS=new MSGID=asX-bT.LazyYTi...]',
  envelope: { from: 'no-reply@example.com', to: [ 'me@example.com' ] }
}
https://ethereal.email/message/asX-bT.LazyYTi...
~~~

- [[250]]: رد SMTP معناه «تمام، استلمت». ده معناه إن **السيرفر** خد الرسالة، مش إنها وصلت الـ inbox.
- [[accepted]] و [[rejected]]: المستلمين اللي السيرفر قبلهم ورفضهم.
- [[getTestMessageUrl(info)]]: لينك تفتحه في المتصفح تشوف الإيميل. ولو مش باعت على Ethereal بيرجّع [[false]] (جربته على [[info]] رده [["250 OK"]] وطلع [[false]]).

ودالة المثال نفسها ([[sendResetEmail]]) اتبعتت على نفس الحساب ورجعت [[250 Accepted]] ولينك معاينة.

---

## ٤. لو الإيميل بيتبعت جوه route

[[sendMail]] من غير [[pool: true]] بيفتح اتصال جديد ويعمل TLS ويسجّل دخول مع كل إيميل، وده بياخد وقت (ممكن ثواني لو السيرفر بعيد أو بطيء). لو الـ route بيعمل [[await]] عليه، اليوزر بيستنى الوقت ده كله. ولو رميت خطأ من غير ما تمسكه، عملية «نسيت الباسورد» كلها بتقع عشان الإيميل. اللي في الـ deep: الإيميل المهم يتبعت من queue.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[createTransport]] | إعدادات SMTP مرة واحدة، مفيش اتصال لسه |
| [[port 587]] + [[secure: false]] | STARTTLS، و 465 + [[secure: true]] للمشفّر من الأول |
| [[verify()]] | اتصل وسجّل دخول من غير إرسال، وارمي لو الإعدادات غلط |
| [[sendMail]] | بيرجّع [[info]]، و [[250]] يعني السيرفر استلم مش إن الإيميل وصل |
| [[text]] + [[html]] | رسالة [[multipart/alternative]] |`,
          lines: [
            "nodemailer.",
            "transporter واحد للتطبيق كله بإعدادات ثابتة. (من غير [[pool: true]] بيفتح اتصال جديد مع كل إيميل.)",
            "سيرفر الـ SMTP من config.",
            "587 مع STARTTLS: بيبدأ عادي وبعدين يتشفّر. (465 يعني [[secure: true]] من الأول.)",
            "اليوزر والباسورد (أو API key في خدمات زي Resend).",
            "قفلة.",
            "دالة لإيميل معين.",
            "ابعت.",
            "المرسل: الاسم والإيميل. الدومين لازم يبقى متوثّق عند الخدمة.",
            "المستلم.",
            "العنوان.",
            "نسخة نص عادي، لبرامج الإيميل اللي مبتعرضش HTML ولفلاتر السبام.",
            "نسخة HTML.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`[[createTestAccount()]] بيرجّع [[user]] و [[pass]] و [[smtp.host]] ([[smtp.ethereal.email]])، حطهم في .env. بعد [[sendMail]] الـ [[info.messageId]] فيه id، و [[getTestMessageUrl(info)]] بيرجّع لينك [[https://ethereal.email/message/...]] تفتحه تشوف الإيميل زي ما هيوصل: الـ subject والـ html واللينك. الإيميل مبيوصلش لحد فعلًا، وده المطلوب في التطوير.

[[transporter.verify()]] بيرجّع [[true]] لو الإعدادات صح. ولو غلط بيرمي، والكود بيقولك السبب: [[EDNS]] و [[getaddrinfo ENOTFOUND]] للـ host الغلط، و [[ESOCKET]] و [[ECONNREFUSED]] للبورت الغلط، و [[EAUTH]] (Invalid login) لليوزر أو الباسورد الغلط. عشان كده بتناديه وانت بتقوم: تعرف المشكلة من اللوج بدل ما تعرفها من يوزر بيقول «مجاليش إيميل».

لو [[getTestMessageUrl]] رجّع [[false]]، يبقى انت مش باعت على Ethereal (الـ host أو الحساب غلط).`,
          solCode: R`import nodemailer from "nodemailer";

const account = await nodemailer.createTestAccount();
const transporter = nodemailer.createTransport({
  host: account.smtp.host, port: 587, secure: false,
  auth: { user: account.user, pass: account.pass },
});

await transporter.verify(); // بيرمي لو الإعدادات غلط
const info = await transporter.sendMail({ from: '"MyApp" <no-reply@example.com>', to: "me@example.com", subject: "Test", text: "Hello" });
console.log(nodemailer.getTestMessageUrl(info)); // https://ethereal.email/message/...`
        },
        {
          cmd: "Resend",
          title: "ابعت إيميل بـ API بدل SMTP",
          desc: R`خدمات الإيميل الحديثة بتدّيك HTTP API: بتبعت JSON بالمستلم والعنوان والمحتوى، وبترجّعلك id أو خطأ واضح. Resend مثال مشهور، و SDK بتاعه في Node سطرين.

نفس القواعد: الدومين لازم يتوثّق عندهم، والمفتاح في .env، والإرسال ميوقّعش العملية الأساسية لو فشل.`,
          example: R`import { Resend } from "resend";

const resend = new Resend(config.RESEND_API_KEY);

export async function sendWelcome(user) {
  const { data, error } = await resend.emails.send({
    from: "MyApp <hello@example.com>",
    to: [user.email],
    subject: "Welcome to MyApp",
    html: "<p>Your account is ready.</p>",
  });
  if (error) console.error("welcome email failed", { userId: user.id, error });
  return data?.id;
}`,
          try: R`اعمل حساب Resend وجرّب الإرسال من [[onboarding@resend.dev]] لإيميل حسابك (ده بيشتغل من غير توثيق دومين، للتجربة بس). وبعدين حط مفتاح غلط وشوف شكل [[error]].`,
          flag: "script",
          deep: {
            why: "SMTP بروتوكول قديم: اتصال وتسجيل دخول وبورتات ممكن تبقى مقفولة عند مزوّد السيرفر (VPS كتير بيقفلوا بورت 25 وأحيانًا غيره). الـ API مجرد HTTPS، وبيرجّع أخطاء واضحة، وفيه مميزات زي الجدولة و idempotency و webhooks لـ «اتفتح» و «ارتد».",
            how: R`[[resend.emails.send]] بيعمل POST للـ API بتاعهم والمفتاح في [[Authorization]]. ولو الطلب فشل (مفتاح غلط، أو دومين مش متوثّق، أو rate limit) بيرجّع [[error]] فيه [[name]] و [[message]] بدل ما يرمي، فلازم تبص عليه بنفسك. لو نسيت، الفشل بيعدّي بصمت.

Resend بيدعم كمان SMTP، فممكن تستخدمه من nodemailer بالـ host بتاعهم. في مشروع حقيقي كان ده الشكل: nodemailer على SMTP بتاع Resend، والـ SDK كمان متسطّب ومش مستخدم. اختار طريقة واحدة.

الإيميلات المهمة (فواتير، و reset) لو هتعيد محاولة إرسالها، Resend بيدعم [[idempotencyKey]] عشان متوصلش مرتين. وقوالب الإيميل ممكن تتكتب بـ React Email بدل HTML strings.`,
            when: "مشروع جديد: API غالبًا أسهل. SMTP لو المزوّد مش عنده API، أو عايز تبدّل مزوّدين من غير تغيير كود.",
            mistakes: R`تفتكر إن [[await resend.emails.send]] بيرمي لو فشل، فمتبصش على [[error]]. وتحط قيمة من اليوزر (زي الاسم) في الـ HTML من غير escape، فحد يسمّي نفسه HTML ويبعت لينكات تصيد في إيميلات رسمية طالعة من دومينك: هرّب أي قيمة، أو استخدم React Email اللي بيهرّب لوحده. والمفتاح في كود الواجهة بدل السيرفر.`
          },
          teach: R`## طلب HTTPS واحد بدل محادثة SMTP

الكود بيعمل client بالمفتاح مرة واحدة، ودالة [[sendWelcome]] بتبعت إيميل ترحيب وترجّع الـ id بتاعه. الفرق المهم عن أغلب المكتبات: [[resend.emails.send]] **مبيرميش** خطأ لو الإرسال فشل، بيرجّع object فيه [[data]] و [[error]] وانت اللي تبص.

اتشغّل على ويندوز 11 بـ Node 24.19 و resend 6.32.1، بمفتاح وهمي ([[re_fake_123]]) على الـ API الحقيقي بتاعهم. فاللي هتشوفه تحت هو رد Resend الحقيقي على مفتاح غلط. وشكل الرد الناجح ([[{ id: "..." }]]) من الـ docs، لأن مفيش حساب حقيقي هنا.

---

## ١. [[new Resend(config.RESEND_API_KEY)]]

- [[import { Resend } from "resend"]]: الأقواس [[{ }]] معناها named import، يعني هات الـ export اللي اسمه [[Resend]] بالظبط.
- [[new Resend(key)]]: client واحد للتطبيق كله. المفتاح بيبدأ بـ [[re_]] وبييجي من [[config]] (يعني [[.env]]).

ولو المفتاح فاضي ([[undefined]])، الـ constructor بيرمي على طول وانت بتقوم:

~~~text الناتج
Missing API key. Pass it to the constructor $__btnew Resend("re_123")$__bt
~~~

وده كويس: السيرفر يقع وانت بتشغّله بدل ما يقع مع أول يوزر.

---

## ٢. [[const { data, error } = await resend.emails.send({ ... })]]

### اللي جوه الأقواس

| الحقل | معناه |
|---|---|
| [[from]] | [["MyApp <hello@example.com>"]]: الاسم والإيميل. الدومين لازم يبقى متوثّق في حسابك |
| [[to]] | array، عشان ممكن أكتر من مستلم |
| [[subject]] | العنوان |
| [[html]] | المحتوى. (وفيه [[text]] كمان لو عايز نسخة نص) |

### الطلب اللي بيطلع فعلًا

لفّيت [[fetch]] بدالة بتطبع اللي بيعدّي عليها، فده الطلب اللي الـ SDK بعته:

~~~text الناتج
REQ POST https://api.resend.com/emails
headers {
  authorization: 'Bearer re_fake_123',
  'content-type': 'application/json',
  'user-agent': 'resend-node:6.32.1'
}
body {"from":"MyApp <hello@example.com>","html":"<p>Your account is ready.</p>","subject":"Welcome to MyApp","to":["sara@example.com"]}
~~~

يعني كل اللي الـ SDK بيعمله: POST بـ JSON، والمفتاح في [[Authorization: Bearer]]. نفس اللي ممكن تعمله بـ [[fetch]] أو curl بإيدك.

### [[{ data, error }]]: الـ destructuring

الدالة بترجّع object، والأقواس [[{ }]] على الشمال بتطلّع منه خانتين في متغيرين بنفس الاسم. وده اللي رجع بالمفتاح الغلط:

~~~text الناتج
{
  data: null,
  error: { message: 'API key is invalid', name: 'validation_error', statusCode: 401 },
  headers: { ..., server: 'cloudflare', 'www-authenticate': 'error="invalid_token"' }
}
~~~

- [[data: null]]: مفيش إيميل اتبعت.
- [[error.statusCode: 401]]: نفس الـ status بتاع HTTP، يعني «مش عارفين انت مين».
- [[error.name]]: نوع ثابت تقدر تقارن بيه. والرسالة للبني آدم.

ومفيش exception خالص: الـ [[await]] عدّى عادي. لو كتبت [[(await resend.emails.send(...)).data.id]] على طول، هتاخد [[TypeError]] لأن [[data]] بـ [[null]].

---

## ٣. [[if (error) console.error(...)]]

~~~javascript
if (error) console.error("welcome email failed", { userId: user.id, error });
~~~

بنسجّل الفشل ومعاه [[userId]] عشان نعرف مين اللي مجالوش إيميل، ومبنرميش: التسجيل نجح، والإيميل حاجة جانبية. الناتج في الترمنال:

~~~text الناتج
[Resend API Error]: {
  status: 401,
  error: { message: 'API key is invalid', name: 'validation_error', statusCode: 401 },
  path: '/emails'
}
welcome email failed {
  userId: 7,
  error: { message: 'API key is invalid', name: 'validation_error', statusCode: 401 }
}
~~~

السطر الأول مش من كودنا: الـ SDK نفسه بيطبع سطر [[Resend API Error]] بـ [[console.error]] طول ما [[NODE_ENV]] مش [[production]] (لقيته في كود المكتبة). يعني في التطوير هتشوف الخطأ حتى لو نسيت تبص على [[error]]، وفي الإنتاج **مش هتشوفه**. عشان كده السطر بتاعنا لازم يفضل.

---

## ٤. [[return data?.id]]

[[?.]] (optional chaining): لو [[data]] بـ [[null]] أو [[undefined]] رجّع [[undefined]] بدل ما تقع. الناتج في تجربتنا:

~~~text الناتج
returned: undefined
~~~

ولو نجح، [[data]] بيبقى [[{ id: "..." }]] (من الـ docs) فالدالة ترجّع الـ id، وتقدر تحفظه عشان تربطه بعدين بـ webhook «اتسلّم» أو «ارتد».

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[new Resend(key)]] | client واحد، وبيرمي لو المفتاح ناقص |
| [[emails.send({...})]] | POST لـ [[https://api.resend.com/emails]] بالمفتاح في [[Authorization]] |
| [[{ data, error }]] | مفيش throw: يا [[data]] يا [[error]] فيه [[statusCode]] و [[name]] و [[message]] |
| [[if (error) ...]] | لازم تبص بنفسك، والـ SDK بيطبع لوحده في التطوير بس |
| [[data?.id]] | ميقعش لو [[data]] بـ [[null]] |`,
          lines: [
            "SDK بتاع Resend.",
            "client بالمفتاح من config.",
            "إيميل ترحيب.",
            "ابعت. المكتبة مبترميش، بترجّع [[data]] أو [[error]].",
            "المرسل من دومين متوثّق.",
            "المستلم (ممكن أكتر من واحد).",
            "العنوان.",
            "المحتوى HTML، من غير قيم جاية من اليوزر.",
            "قفلة.",
            "لو فشل سجّله، ومتوقفش التسجيل كله عشان إيميل ترحيب.",
            "رجّع الـ id لو محتاجه.",
            "قفلة."
          ],
          sol: R`بالمفتاح الصح و [[from: "MyApp <onboarding@resend.dev>"]] و [[to]] إيميل حسابك: [[data]] فيه [[{ id: "..." }]] و [[error]] بـ null، والإيميل بيوصل خلال ثواني (بص في spam لو مش لاقيه). ولو بعت لإيميل غير إيميل حسابك من الدومين التجريبي، هتاخد error بيقولك إنك تقدر تبعت لنفسك بس لحد ما توثّق دومين.

بمفتاح غلط: الـ SDK مبيرميش exception؛ بيرجّع [[data]] بـ null و [[error]] object فيه [[statusCode]] (4xx) و [[name]] و [[message]] بيقول إن المفتاح مش صالح. عشان كده الكود بيبص على [[error]] بنفسه، ولو كتبت [[await resend.emails.send(...)]] واستخدمت [[data.id]] على طول هتاخد TypeError.

الفكرة للانترفيو: فشل إيميل الترحيب مايوقّعش التسجيل، بيتسجّل في اللوج بس (ويتعاد بـ background job في الإنتاج).`
        },
        {
          cmd: "morgan",
          title: "سطر لوج لكل طلب",
          desc: R`[[morgan]] middleware بيطبع سطر لكل طلب فيه الـ method والعنوان والـ status: [[dev]] ملوّن ومختصر ومعاه المدة للتطوير، و [[combined]] بصيغة لوجات Apache و Nginx المعروفة (فيها الـ IP والتاريخ والـ user-agent، من غير المدة).

بسيط ومفيد، بس نص عادي: صعب تدوّر فيه أو تربطه بباقي اللوجات. للإنتاج، اللوجات المنظمة (JSON) أحسن، الدرس الجاي.`,
          example: R`import morgan from "morgan";

app.use(morgan(config.NODE_ENV === "production" ? "combined" : "dev", { skip: (req) => req.path === "/health" }));
// أو صيغة مخصصة من tokens بدلها (مش جنبها): morgan(":method :url :status :response-time ms")

// GET /api/tasks 200 4.123 ms - 512
// ::ffff:10.0.0.5 - - [29/Sep/2026:10:00:00 +0000] "GET /api/tasks HTTP/1.1" 200 512 "-" "curl/8.5.0"`,
          try: R`جرّب الصيغتين، وبعدين خلي morgan يكتب في ملف بـ [[stream: fs.createWriteStream("access.log", { flags: "a" })]]. وفكّر: لو عايز تعرف كل الطلبات اللي رجعت 500 امبارح، هتدوّر إزاي؟`,
          flag: "script",
          deep: {
            why: "أول سؤال لما حاجة تبوظ: «إيه الطلبات اللي جت؟». من غير لوج للطلبات بتبقى أعمى، و morgan بيدّيك ده في سطر.",
            how: R`morgan بيسجّل وقت البداية، ويستنى الرد يخلص، ويطبع السطر بالـ tokens: [[:method]] و [[:url]] و [[:status]] و [[:response-time]] و [[:remote-addr]] و [[:user-agent]]. وتقدر تعمل token بنفسك بـ [[morgan.token("user", (req) => req.user?.id)]].

بيكتب على stdout افتراضيًا، ودا الصح في Docker و PM2: هما اللي بيجمعوا اللوج ويدوّروه (درس «docker logs» في تاب «Docker»). الكتابة في ملفات من جوه التطبيق معناها انت اللي لازم تعمل rotation.

و [[:remote-addr]] ورا proxy بيطلع IP الـ proxy إلا لو [[trust proxy]] متظبط.`,
            when: "التطوير أو المشاريع الصغيرة. ولو عندك pino، [[pino-http]] بيعمل نفس الشغل بـ JSON، فمتشغّلش الاتنين.",
            mistakes: R`في مشروع حقيقي كان فيه morgan، وكمان [[requestLogger]] يدوي، وكمان middleware بيسجّل كل رد 4xx، والتلاتة بيكتبوا على نفس الطلب، فكل طلب ٣ سطور بأشكال مختلفة. لوجر واحد للطلبات يكفي. وتسجّل [[:url]] وفيه توكنات في الـ query ([[?token=...]])، فاللوج بقى فيه أسرار.`
          },
          teach: R`## سطر واحد بيركّب لوجر للطلبات

[[morgan(format, options)]] بيرجّع middleware، و [[app.use]] بيحطه قبل كل الـ routes، فكل طلب بيعدّي عليه. الـ middleware بيفتكر وقت ما الطلب دخل، ولما الرد يخلص بيطبع سطر.

اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1 و morgan 1.12.1، سيرفر على بورت 5851 فيه [[/health]] و [[GET]] و [[POST /api/tasks]] و [[/fail]] بيرجّع 500، وطلبات curl (Git Bash).

---

## ١. نفك السطر من جوه لبرة

~~~javascript
app.use(morgan(config.NODE_ENV === "production" ? "combined" : "dev", { skip: (req) => req.path === "/health" }));
~~~

### [[config.NODE_ENV === "production" ? "combined" : "dev"]]

[[NODE_ENV]] متغير بيئة متعارف عليه بيقول التطبيق شغال فين. و [[? :]] (الـ ternary) بيختار: لو إنتاج [["combined"]]، غير كده [["dev"]]. دول أسامي صيغ جاهزة في morgan.

### [[{ skip: (req) => req.path === "/health" }]]

[[skip]] دالة morgan بيناديها مع كل طلب: لو رجّعت [[true]] السطر ميتطبعش. [[req.path]] هو العنوان من غير الـ query ([[/health?x=1]] بيبقى [[/health]]). ليه؟ الـ load balancer أو Docker بيسألوا [[/health]] كل كام ثانية، فاللوج يتملى سطور ملهاش لازمة.

### [[app.use(morgan(...))]]

ركّبه **قبل** الـ routes. لو جه بعد route بيرد، الطلب ده عمره ما هيوصل له.

---

## ٢. صيغة [[dev]]

بعت ٥ طلبات (والسطر الأول [[GET /]] هو طلب بيتأكد إن السيرفر قام، ورجّع 404):

~~~text الناتج (التطوير)
GET / 404 2.428 ms - 139
GET /api/tasks 200 0.368 ms - 22
POST /api/tasks 201 0.311 ms - 8
GET /fail 500 0.318 ms - 33
GET /nope 404 0.429 ms - 143
~~~

| الحتة | معناها |
|---|---|
| [[GET /api/tasks]] | الـ method والعنوان |
| [[200]] | الـ status. في الترمنال بيتلوّن: أخضر للـ 2xx، وأصفر للـ 4xx، وأحمر للـ 5xx |
| [[0.368 ms]] | المدة من ما الطلب دخل لحد ما الرد اتبعت، بالملّي ثانية |
| [[- 22]] | حجم الـ body بالبايت (الـ [[Content-Length]]) |

و [[/health]] مش موجود رغم إني بعته: ده الـ [[skip]].

---

## ٣. صيغة [[combined]] (لما [[NODE_ENV=production]])

~~~text الناتج (الإنتاج)
::1 - - [07/Oct/2026:08:12:40 +0000] "GET /api/tasks HTTP/1.1" 200 22 "-" "curl/8.22.0"
::1 - - [07/Oct/2026:08:12:40 +0000] "GET /fail HTTP/1.1" 500 33 "-" "curl/8.22.0"
~~~

نفس شكل لوجات Apache و Nginx، فأي أداة بتقراهم بتقرا ده:

| الحتة | معناها |
|---|---|
| [[::1]] | IP العميل. [[::1]] هو localhost في IPv6 (و [[127.0.0.1]] في IPv4) |
| [[- -]] | خانتين قديمتين (اسم اليوزر من بروتوكولات قديمة) مش مستخدمين، فـ [[-]] |
| [[07/Oct/2026:08:12:40 +0000]] | الوقت (بين قوسين مربعين في السطر)، و [[+0000]] يعني UTC |
| [["GET /fail HTTP/1.1"]] | سطر الطلب كله |
| [[500 33]] | الـ status والحجم |
| [["-"]] | الـ Referer: الصفحة اللي جه منها (مفيش) |
| [["curl/8.22.0"]] | الـ User-Agent: البرنامج اللي بعت |

مفيش مدة هنا، ومفيش ألوان.

---

## ٤. الصيغة المخصصة (السطر المتعلّق في المثال)

~~~javascript
morgan(":method :url :status :response-time ms")
~~~

كل كلمة بتبدأ بـ [[:]] اسمها token، و morgan بيبدّلها بقيمتها، وأي حاجة تانية ([[ms]]) بتتكتب زي ما هي:

~~~text الناتج
GET /health 200 2.795 ms
GET /api/tasks 200 0.481 ms
POST /api/tasks 201 0.322 ms
GET /fail 500 0.392 ms
~~~

[[/health]] ظهر هنا لأني جربتها من غير [[skip]]. وده قصد التعليق «بدلها مش جنبها»: لو حطيت الاتنين، كل طلب هيطلع مرتين.

---

## ٥. الـ solCode: في ملف، وتدوّر على الـ 500

~~~javascript
app.use(morgan("combined", { stream: fs.createWriteStream("access.log", { flags: "a" }) }));
~~~

- [[stream]]: بدل الترمنال، اكتب في الـ stream ده.
- [[fs.createWriteStream("access.log", ...)]]: stream بيكتب في ملف.
- [[flags: "a"]]: append، يعني زوّد في آخر الملف. من غيرها ([["w"]]) الملف بيتمسح مع كل تشغيل.

السطور اختفت من الترمنال وراحت للملف. وعشان تلاقي الـ 500 بس:

~~~bash
grep "07/Oct/2026" access.log | awk '$9 == 500'
~~~

~~~text الناتج
::1 - - [07/Oct/2026:08:12:42 +0000] "GET /fail HTTP/1.1" 500 33 "-" "curl/8.22.0"
~~~

- [[grep "07/Oct/2026"]]: السطور اللي فيها التاريخ ده.
- [[awk '$9 == 500']]: [[awk]] بيقسم كل سطر عند المسافات، و [[$9]] الخانة التاسعة، وبيطبع السطر لو قيمتها [[500]]. عدّها:

~~~text الخانات
$1  ::1
$2  -
$3  -
$4  [07/Oct/2026:08:12:42
$5  +0000]
$6  "GET
$7  /fail
$8  HTTP/1.1"
$9  500
~~~

ونفس الفكرة في PowerShell 7.6 و 5.1 (مفيش awk)، وطلّعت نفس السطر:

~~~powershell
Get-Content access.log | Where-Object { ($_ -split " ")[8] -eq "500" }
~~~

[[-split " "]] بيقسم عند المسافات، والرقم [[8]] بين الأقواس المربعة هو تاسع عنصر، لأن العد من صفر.

وده بالظبط الهشاشة اللي في الـ sol: لو الـ URL فيه مسافة، أو غيّرت الصيغة، رقم الخانة يتغير والفلتر يبوظ.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [["dev"]] | مختصر وملوّن ومعاه المدة، للتطوير |
| [["combined"]] | صيغة Apache: IP ووقت و user-agent، من غير مدة |
| [[":method :url ..."]] | صيغة بالـ tokens اللي تختارها |
| [[skip]] | سطور مش عايزها (الـ health check) |
| [[stream]] + [[flags: "a"]] | اكتب في ملف وزوّد عليه |`,
          lines: [
            "morgan.",
            "ملوّن في التطوير، والصيغة المعروفة في الإنتاج، ومن غير طلبات الـ health check اللي بتملّى اللوج. لوجر واحد بس، عشان كل طلب ميتكتبش مرتين."
          ],
          sol: R`[[dev]] بيطبع سطر قصير ملوّن زي [[POST /api/tasks 201 0.408 ms - 8]] (الـ status أخضر للنجاح وأحمر للـ 500). و [[combined]] بيطبع صيغة Apache: [[127.0.0.1 - - [29/Sep/2026:22:00:07 +0000] "GET /fail HTTP/1.1" 500 33 "-" "curl/8.5.0"]]. وفي الاتنين [[/health]] مش ظاهر بسبب [[skip]].

مع [[stream]]، السطور بتتكتب في [[access.log]] وبتتزوّد عليه مع كل تشغيل (بسبب [[flags: "a"]]) بدل ما تطلع في الترمنال.

عشان تلاقي كل الـ 500 امبارح: في combined الـ status هو العمود التاسع، فـ [[grep "29/Sep/2026" access.log | awk '$9 == 500']]. شغال، بس هش: أي تغيير في الصيغة يبوّظه، ومفيش user id ولا request id. وده السبب اللي بيخلي الإنتاج يستخدم لوجات JSON (درس [[pino]]) تتفلتر بالحقول.`,
          solCode: R`import fs from "node:fs";
app.use(morgan("combined", { stream: fs.createWriteStream("access.log", { flags: "a" }) }));

// كل الـ 500 في يوم معيّن
// grep "29/Sep/2026" access.log | awk '$9 == 500'`
        },
        {
          cmd: "pino",
          title: "لوجات JSON تقدر تدوّر فيها",
          desc: R`[[pino]] بيطبع كل لوج كسطر JSON فيه المستوى والوقت والرسالة وأي بيانات تحطها، و [[pino-http]] بيسجّل كل طلب ويدّيك [[req.log]] مربوط بـ id الطلب.

فكل لوجات الطلب الواحد بتتجمع مع بعض. و [[redact]] بيخفي الحقول الحساسة (التوكن والكوكيز والباسورد) قبل ما تتكتب.`,
          example: R`import pino from "pino";
import pinoHttp from "pino-http";

export const logger = pino({
  level: config.LOG_LEVEL ?? "info",
  redact: ["req.headers.authorization", "req.headers.cookie", "*.password"],
});

app.use(pinoHttp({ logger, autoLogging: { ignore: (req) => req.url === "/health" } }));

router.post("/", async (req, res) => {
  req.log.info({ title: req.body.title }, "creating task");
  res.status(201).json(await tasksService.create(req.user.id, req.body));
});`,
          try: R`ابعت طلب فيه [[Authorization]] وشوف السطر الـ JSON والتوكن مكتوب مكانه [Redacted]. وشغّل السيرفر بـ [[node server.js | npx pino-pretty]] في التطوير عشان تقراه بسهولة. وجرّب [[req.log.error({ err }, "failed")]] وشوف الـ stack بيتحط إزاي.`,
          flag: "script",
          deep: {
            why: R`في الإنتاج اللوجات بتتقري بأدوات مش بعينك: «هات كل الأخطاء لليوزر ٧ امبارح» أو «كل الطلبات اللي أخدت أكتر من ثانية». ده مستحيل مع نص حر زي [[console.log("user", id, "failed")]]، وسهل جدًا مع JSON فيه [[userId: 7]] و [[level: 50]].`,
            how: R`pino سريع لأنه بيعمل أقل حاجة ممكنة في العملية الرئيسية: يعمل JSON ويكتبه على stdout. التنسيق الحلو ([[pino-pretty]]) والإرسال لخدمة لوجات بيحصل بره (transport في worker thread أو برنامج تاني).

المستويات: trace و debug و info و warn و error و fatal. [[level]] بيحدد أقل واحد يتطبع، فـ debug بتاعة التطوير مبتظهرش في الإنتاج من غير ما تمسحها من الكود.

[[pino-http]] بيعمل child logger لكل طلب فيه [[req.id]] والـ method والعنوان. أي [[req.log.info]] في أي مكان جوه الطلب بيطلع ومعاه نفس الـ id، فتقدر تجمع قصة الطلب كلها. ولو فيه [[X-Request-Id]] جاي من Nginx، استخدمه في option الـ [[genReqId]] عشان الـ id يبقى واحد من أول ما الطلب دخل.

[[redact]] بيشتغل على المسارات دي قبل الكتابة، و [[*]] في أول المسار يعني «في أي object في المستوى ده». وده خط دفاع أخير، مش بديل إنك متسجّلش الـ body كله أصلًا.`,
            when: "أي API هيتشغّل في الإنتاج. ومع pino-http، شيل morgan.",
            mistakes: R`في مشروع حقيقي كان login بيعمل [[console.log(JSON.stringify(req.body))]] و [[JSON.stringify(req.headers)]] في الإنتاج «عشان نفهم مشكلة». يعني كل باسورد اتكتب في login اتسجّل في اللوج نص صريح، ومعاه التوكنات والكوكيز. اللوجات بتتنسخ وتتبعت وتتحفظ شهور، فعاملها كأنها عامة. وتستخدم [[console.log]] بنصوص حرة في كل مكان فمفيش طريقة تفلتر. وتسجّل [[err.message]] بس من غير الـ stack.`
          },
          teach: R`## لوجر واحد، و middleware، وسطر JSON لكل حدث

المثال ٣ حاجات: [[pino({...})]] بيعمل اللوجر بتاع التطبيق كله، و [[pinoHttp({ logger })]] middleware بيسجّل كل طلب وبيدّي كل طلب لوجر خاص بيه في [[req.log]]، و route بيستخدم [[req.log.info]].

اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1 و pino 10.4.0 و pino-http 11.0.0، سيرفر على بورت 5852، و [[tasksService.create]] وهمية بترجّع اللي اتبعتلها، و middleware بيحط [[req.user = { id: 7 }]] مكان [[requireAuth]].

---

## ١. [[pino({ level, redact })]]

~~~javascript
export const logger = pino({
  level: config.LOG_LEVEL ?? "info",
  redact: ["req.headers.authorization", "req.headers.cookie", "*.password"],
});
~~~

### [[level]]

كل مستوى ليه اسم ورقم، والرقم هو اللي بيتكتب في اللوج:

| المستوى | الرقم | لإيه |
|---|---|---|
| [[trace]] | 10 | تفاصيل دقيقة جدًا |
| [[debug]] | 20 | معلومات للتطوير |
| [[info]] | 30 | أحداث عادية: طلب خلص، طلب اتعمل |
| [[warn]] | 40 | حاجة غريبة بس مكمّلين |
| [[error]] | 50 | عملية فشلت |
| [[fatal]] | 60 | التطبيق هيقع |

[[level: "info"]] معناها اطبع من 30 وطالع. جربت: [[logger.debug("hidden")]] مطبعش حاجة، ولوجر بـ [[level: "debug"]] طبع [[{"level":20,"msg":"shown"}]]. و [[??]] بياخد [["info"]] لو [[LOG_LEVEL]] مش متحدد.

### [[redact]]

قايمة مسارات جوه أي object هيتكتب. لو المسار موجود، قيمته بتتبدّل بالنص «[Redacted]» قبل الكتابة. و [[*]] معناها «أي مفتاح في المستوى ده». جربت سطر فيه [[body.password]] و [[password]] على المستوى الأول:

~~~text الناتج (متقصّر)
"body":{"email":"a@b.c","password":"[Redacted]"},"password":"top"
~~~

[[*.password]] مسك [[body.password]] (مستوى واحد تحت أي مفتاح)، بس **مسكش** [[password]] اللي فوق خالص. لو عايزه، ضيف [["password"]] لوحده للقايمة.

---

## ٢. [[app.use(pinoHttp({ logger, autoLogging: { ignore } }))]]

- [[logger]]: استخدم نفس اللوجر (نفس المستوى ونفس الـ redact) بدل ما تعمل واحد جديد.
- [[autoLogging.ignore]]: دالة لو رجّعت [[true]] الطلب ده ملوش سطر «request completed». هنا [[/health]].

بعتّ POST فيه توكن وكوكي:

~~~bash
curl -i -X POST localhost:5852/api/tasks -H "Authorization: Bearer eyJfake.token" -H "Cookie: sid=abc" -H "Content-Type: application/json" -d '{"title":"Buy milk"}'
~~~

~~~text الرد
HTTP/1.1 201 Created
...
{"id":1,"userId":7,"title":"Buy milk"}
~~~

وده اللي اتكتب في اللوج (سطر واحد طويل، مقسوم هنا عشان يتقري):

~~~text اللوج: سطر request completed
{"level":30,"time":1791360837890,"pid":13476,"hostname":"ALI-PC",
 "req":{"id":3,"method":"POST","url":"/api/tasks","query":{},"params":{},
        "headers":{"host":"localhost:5852","user-agent":"curl/8.22.0","accept":"*/*",
                   "authorization":"[Redacted]","cookie":"[Redacted]",
                   "content-type":"application/json","content-length":"20"},
        "remoteAddress":"::1","remotePort":64089},
 "res":{"statusCode":201,"headers":{...}},
 "responseTime":0,"msg":"request completed"}
~~~

| الحقل | معناه |
|---|---|
| [[level]] | 30 = info |
| [[time]] | الوقت بالملّي ثانية من ١ يناير ١٩٧٠ (epoch)، أسرع في الكتابة من تاريخ مكتوب |
| [[pid]] و [[hostname]] | رقم الـ process واسم الجهاز، عشان لو عندك كذا نسخة |
| [[req.id]] | رقم الطلب. طلع 3 مش 2 لأن طلب [[/health]] خد رقم 2 واتجاهل |
| [[authorization]] و [[cookie]] | «[Redacted]» بسبب الـ redact |
| [[responseTime]] | المدة بالملّي ثانية |

---

## ٣. [[req.log.info({ title: req.body.title }, "creating task")]]

[[req.log]] child logger عمله pino-http للطلب ده: أي سطر بتكتبه بيه بيتلزق فيه [[req]] كله بنفس الـ [[id]]. والترتيب: object الحقول الأول، والرسالة بعده.

~~~text اللوج (متقصّر)
{"level":30,...,"req":{"id":3,"method":"POST","url":"/api/tasks",...},"title":"Buy milk","msg":"creating task"}
~~~

[[title]] بقى حقل لوحده، و [[req.id]] بـ 3 زي سطر «request completed». فلو بتدوّر على مشكلة في طلب، فلتر بـ [[req.id == 3]] وتلاقي قصته كلها.

---

## ٤. الأخطاء: [[{ err }]] مش [[{ error: err }]]

في route تجربة كتبت:

~~~javascript
req.log.error({ err }, "failed");
req.log.error({ error: err }, "failed as error");
~~~

~~~text اللوج (متقصّر)
{"level":50,...,"err":{"type":"Error","message":"db down","stack":"Error: db down\n    at file:///.../p/server.js:23:15\n ..."},"msg":"failed"}
{"level":50,...,"error":{},"msg":"failed as error"}
~~~

- [[{ err }]] اختصار [[{ err: err }]]. pino عنده serializer مخصوص للمفتاح [[err]] بيطلّع [[type]] و [[message]] و [[stack]].
- [[{ error: err }]]: اسم تاني، فمفيش serializer، والـ [[Error]] لما يتحوّل JSON بيبقى [[{}]] (خصايصه مش enumerable). ضاع كل حاجة.
- و [[logger.error(err)]] لوحده كمان شغال: جربته وطلع [[err]] كامل و [[msg]] هي رسالة الخطأ.

وملاحظة من نفس التجربة: الطلب اللي رجع 500، pino-http كتبله سطر [[request errored]] بـ [[level: 30]] (info) مش 50. لو عايز الـ 5xx يبقى error في اللوج، فيه option اسمه [[customLogLevel]] (من الـ README بتاع pino-http) بترجّع منه المستوى حسب [[res.statusCode]].

---

## ٥. [[pino-pretty]] في التطوير

~~~bash
node server.js | npx pino-pretty
~~~

[[|]] (pipe) بيودّي اللي السيرفر بيطبعه لـ pino-pretty، اللي بيحوّل كل سطر لشكل مقروء:

~~~text الناتج
[11:13:57.890] INFO (13476): creating task
    req: {
      "id": 3,
      "method": "POST",
      "url": "/api/tasks",
      ...
        "authorization": "[Redacted]",
      ...
    }
    title: "Buy milk"
~~~

[[INFO]] هي 30، و [[(13476)]] الـ pid، والحقول تحت. الوقت بالتوقيت المحلي (11 بتوقيت مصر = 08 UTC).

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[level]] | أقل مستوى يتطبع (info = 30) |
| [[redact]] | المسارات دي تبقى «[Redacted]»، و [[*.x]] مستوى واحد بس |
| [[pinoHttp({ logger })]] | سطر لكل طلب، و [[req.log]] بنفس [[req.id]] |
| [[req.log.info(obj, msg)]] | الحقول الأول والرسالة بعدها |
| [[{ err }]] | الاسم ده بالذات عشان الـ stack يتكتب |
| [[pino-pretty]] | للعين في التطوير بس |`,
          lines: [
            "pino: لوجر سريع بيطبع JSON.",
            "middleware بيسجّل الطلبات.",
            "لوجر واحد للتطبيق كله.",
            "أقل مستوى يتطبع: info في الإنتاج، و debug في التطوير.",
            "المسارات دي تتكتب [Redacted] بدل قيمتها، و [[*.password]] يعني password جوه أي object في المستوى الأول (زي [[body.password]])، مش [[password]] لوحده ولا أعمق من كده.",
            "قفلة.",
            "سجّل كل طلب (method و url و status ومدة و id) من غير الـ health check.",
            "route عادي.",
            "[[req.log]] لوجر معاه id الطلب تلقائي. البيانات object الأول، والرسالة بعدها.",
            "رد.",
            "قفلة."
          ],
          sol: R`كل سطر JSON واحد. طلب فيه Authorization بيطلع فيه [[req.headers.authorization]] قيمته النص [Redacted] بدل التوكن، ومعاه سطر [[creating task]] فيه [[req.id]] نفس رقم سطر [[request completed]]، فتقدر تجمع كل لوجات الطلب الواحد. ومعاه [[res.statusCode]] و [[responseTime]]. و [[/health]] مالوش سطر بسبب [[ignore]].

[[node server.js | npx pino-pretty]] بيحوّل نفس السطور لشكل مقروء: الوقت وبعده [[INFO (4796): creating task]] وتحته الحقول متنسّقة. في الإنتاج متستخدمهوش: سيب الـ JSON لأداة اللوجات.

و [[req.log.error({ err }, "failed")]] بيطلع سطر [[level: 50]] وفيه [[err]] object فيه [[type]] و [[message]] و [[stack]] كـ string واحد، لأن pino عنده serializer مخصوص للمفتاح [[err]]. و [[req.log.error(err)]] لوحده بيشتغل صح برضه (pino بيحط الـ Error تحت [[err]]). بس لو حطيته تحت اسم تاني زي [[{ error: err }]]، هتاخد [[{}]] فاضي من غير message ولا stack.`
        }
      ]
    },
    {
      t: "الاختبارات",
      l: 3,
      n: "اختبارات للـ API كله: supertest على الـ app من غير بورت، وقاعدة اختبار حقيقية، و factories، ومصفوفة الصلاحيات، والخدمات الخارجية، والـ webhooks",
      items: [
        {
          cmd: "app و server",
          title: "افصل الـ app عن listen عشان تختبره",
          desc: R`[[app.ts]] بيبني الـ app ويرجّعه: middleware و routes و error handler. و [[server.ts]] بس اللي بيعمل [[listen]] ويسمع للـ signals. الاختبارات بتستورد [[createApp()]] وتدّيه لـ supertest مباشرة، فمفيش بورت ثابت يتفتح، ومفيش «البورت مشغول» لما تشغّل ملفين اختبار مع بعض.

القاعدة: مفيش أي side effect وقت الـ import. لا [[listen]]، ولا اتصال بـ Redis أو queue في أول الملف من غير ما حد يطلبه.`,
          example: R`// src/app.ts
import express from "express";
export function createApp() {
  const app = express();
  app.use(express.json());
  app.get("/health", (req, res) => res.json({ ok: true }));
  app.use("/api/orders", ordersRouter);
  app.use(errorHandler);
  return app;
}

// src/server.ts
import { createApp } from "./app.js";
const server = createApp().listen(config.PORT, (err) => { if (err) throw err; logger.info({ port: config.PORT }, "listening"); });
process.on("SIGTERM", () => server.close(() => process.exit(0)));`,
          try: R`لو السيرفر بتاعك ملف واحد فيه [[app.listen]] في الآخر: قسّمه لملفين زي المثال، وخلي [[npm run dev]] يشغّل server.ts. وبعدين اكتب سكربت صغير يعمل [[import { createApp } from "./src/app.js"]] ويطبع [[typeof createApp()]]، واتأكد إن مفيش سطر «listening» اتطبع.`,
          flag: "script",
          deep: {
            why: R`لو [[app.js]] بيعمل listen وهو بيتعمله import، كل ملف اختبار هيفتح البورت 3000. أول ملف يمسكه، والتاني ياخد [[EADDRINUSE]] (في Express 5 الخطأ ده بيوصل للـ callback بتاع [[listen]]، فلو الـ callback مش بتبص عليه بيطبع «listening» ويخرج بهدوء)، والـ process مبتقفلش في الآخر لأن فيه سيرفر لسه سامع. ونفس الفصل بيفيد برّه الاختبارات: سكربت أو worker عايز يستخدم نفس الـ routes أو الإعدادات من غير ما يفتح سيرفر.`,
            how: R`supertest لما تدّيله app (مش URL) بيعمل [[http.createServer(app)]] ويـ listen على بورت 0، يعني النظام يختار بورت فاضي عشوائي، ويبعت الطلب، ويقفل السيرفر بعد الرد. فكل اختبار بيكلّم الـ app الحقيقي بكل الـ middleware بتاعه عبر HTTP حقيقي، بس على بورت مؤقت محدش شايفه.

[[createApp()]] كدالة (مش object جاهز) بيدّيك ميزة تانية: تقدر تبني app جديد لكل ملف اختبار، أو تبعتله dependencies مختلفة ([[createApp({ mailer: fakeMailer })]]) لو عايز. وده نفس اللي «تاب بناء مشروع كامل» بيعمله في هيكل المشروع.

و [[server.ts]] هو المكان الوحيد اللي فيه الحاجات اللي ليها علاقة بالـ process: البورت، و SIGTERM، والإغلاق النضيف (درس «الإغلاق النضيف» في تاب «Node و npm»).`,
            when: "من أول يوم في أي API هتكتبله اختبارات. التكلفة سطرين، ولو أجّلتها هتلاقي imports بتفتح اتصالات في كل حتة.",
            mistakes: R`[[export default app.listen(3000)]]: كده اللي بيتصدّر هو الـ server مش الـ app، والبورت بيتفتح مع أي import. وملف [[db.js]] بيعمل [[await prisma.$connect()]] أو [[redis.connect()]] في أول سطر، فأي اختبار حتى لو مش محتاج الداتابيز بيستنى اتصال. وفي الانترفيو: «إزاي بتختبر الـ API بتاعك؟» الإجابة الكويسة بتبدأ بالفصل ده، وبعدين supertest على الـ app، وبعدين قاعدة اختبار حقيقية.`
          },
          teach: R`## ملفين: واحد «يبني» والتاني «يشغّل»

[[app.ts]] فيه دالة [[createApp()]] بتبني app Express كامل وترجّعه، من غير ما تفتح أي بورت. و [[server.ts]] بيستورد الدالة دي، ويعمل [[listen]]، ويسمع لإشارة الإغلاق. الاختبارات بتستورد [[app.ts]] بس.

اتشغّل على ويندوز 11 بـ Node 24.19 و Express 5.2.1 و tsx 4.23 (عشان الملفات [[.ts]])، وجزء الـ SIGTERM على لينكس في Docker ([[node:22-slim]]، Node 22.23) لأن ويندوز مفيهوش signals بنفس الشكل. البورت 5853.

---

## ١. [[src/app.ts]]

~~~javascript
export function createApp() {
  const app = express();
  app.use(express.json());
  app.get("/health", (req, res) => res.json({ ok: true }));
  app.use("/api/orders", ordersRouter);
  app.use(errorHandler);
  return app;
}
~~~

- [[export function createApp()]]: دالة، مش [[export const app = express()]]. كل نداء بيعمل app جديد. ومفيش حاجة بتحصل وقت الـ import غير إن الدالة اتعرّفت.
- [[express()]]: app فاضي.
- [[express.json()]] ثم الـ routes ثم [[errorHandler]] في الآخر: نفس الترتيب اللي اتعلمناه في درس [[ترتيب الـ middleware]].
- [[return app]]: اللي نادى ياخده ويعمل بيه اللي هو عايزه: [[server.ts]] يعمله [[listen]]، والاختبار يديه لـ supertest.

---

## ٢. [[src/server.ts]]

### [[import { createApp } from "./app.js"]]

لاحظ [[.js]] مع إن الملف [[app.ts]]: ده عرف TypeScript في مشاريع ESM. المسار بيتكتب زي ما هيبقى بعد الـ build، و tsx و vitest بيفهموا إن المقصود [[app.ts]].

### [[const server = createApp().listen(config.PORT, (err) => { ... })]]

1. [[createApp()]]: ابني الـ app.
2. [[.listen(config.PORT, callback)]]: افتح البورت. بترجّع [[http.Server]] بنحفظه في [[server]] عشان نقفله بعدين.
3. الـ callback: في Express 5 بتتنادى في الحالتين، لما السيرفر يبدأ يسمع **أو** لما يفشل، والخطأ بيوصل في [[err]].

ليه [[if (err) throw err]]؟ جربت النسخة القديمة من غير الشرط ([[() => logger.info(...)]]) وشغّلت السيرفر مرتين على نفس البورت. التانية طبعت «listening» وخرجت بـ exit code صفر، كأن كل حاجة تمام:

~~~text الناتج (callback بتطبع err.code)
callback pid 24856 err: EADDRINUSE
second exit=0
~~~

ومع [[if (err) throw err]] نفس التجربة:

~~~text الناتج
Error: listen EADDRINUSE: address already in use :::5853
  code: 'EADDRINUSE',
  syscall: 'listen',
  address: '::',
  port: 5853
second exit=1
~~~

[[EADDRINUSE]] = Error ADDRess IN USE، يعني البورت مع برنامج تاني. و [[:::5853]] هو [[::]] (كل العناوين في IPv6) وبعده [[:5853]]. ولما السيرفر الأول اشتغل كويس طبع:

~~~text الناتج
{"port":5853,"msg":"listening"}
~~~

(في التجربة [[logger]] كان دالة صغيرة بتطبع JSON مكان pino.)

### [[process.on("SIGTERM", () => server.close(() => process.exit(0)))]]

- [[SIGTERM]]: الإشارة اللي Docker و Kubernetes و PM2 بيبعتوها لما عايزين البرنامج يقفل بأدب.
- [[process.on(...)]]: لما الإشارة توصل، شغّل الدالة دي بدل ما تقفل فورًا.
- [[server.close(cb)]]: بطّل تستقبل اتصالات جديدة، واستنى الطلبات اللي شغالة تخلص، وبعدين نادي [[cb]].
- [[process.exit(0)]]: اخرج، و [[0]] معناها «خلصت من غير مشاكل».

على لينكس في Docker: شغّلت [[server.js]] (نفس الكود بـ JavaScript)، وبعت طلب، وبعدين [[kill -TERM]]:

~~~text الناتج
{"port":5853,"msg":"listening"}
{"ok":true}
exit code after SIGTERM: 0
~~~

ولما بعت الإشارة قبل ما السطر ده يتسجّل، الـ process اتقفل على طول بـ [[143]]: ده 128 + 15، و 15 رقم SIGTERM. يعني «اتقتل بالإشارة» مش «خلص».

---

## ٣. الـ solCode: اتأكد إن الـ import مبيفتحش حاجة

~~~javascript
import { createApp } from "./src/app.js";
const app = createApp();
console.log(typeof app); // function
~~~

شغّلته بـ [[npx tsx check-app.mjs]] (لأن [[app.ts]] TypeScript، و [[node]] لوحده مش هيلاقي [[app.js]]):

~~~text الناتج
function
exit=0
~~~

- [[typeof app]] = [[function]]: الـ app في Express دالة [[(req, res, next)]] نفسها، و [[http.createServer(app)]] بيناديها مع كل طلب.
- السكربت **خلص لوحده**. ده الاختبار الحقيقي: لو كان فيه [[listen]] أو اتصال Redis أو [[setInterval]] وقت الـ import، الـ process كانت هتفضل مفتوحة.

وعشان أتأكد من الفرق، عملت النسخة الغلط: ملف بيعمل [[export default app.listen(5853)]]، وسكربت بيستورده بس:

~~~text الناتج
object Server
listening on 5853
exit=124
~~~

- [[object Server]]: اللي اتصدّر الـ server مش الـ app، فمش هينفع تديه لـ supertest زي ما هو.
- [[exit=124]]: ده [[timeout 5]] هو اللي قتله بعد ٥ ثواني. السكربت مكانش هيخلص أبدًا.

ولو السكربت بتاعك فضل مفتوح ومش عارف ليه، اطبع اللي لسه شغال قبل ما تخرج:

~~~javascript
setTimeout(() => { console.log(process.getActiveResourcesInfo()); process.exit(0); }, 1000);
~~~

على النسخة الغلط طلع:

~~~text الناتج
[ 'TCPServerWrap', 'Timeout' ]
~~~

[[TCPServerWrap]] = سيرفر TCP سامع (ده الـ [[listen]])، و [[Timeout]] = الـ [[setTimeout]] بتاعنا نفسه.

---

## الخلاصة

| الملف | فيه | مفيهوش |
|---|---|---|
| [[app.ts]] | [[createApp()]]: middleware و routes و error handler | [[listen]]، اتصالات، timers |
| [[server.ts]] | [[listen]] + [[if (err) throw err]] + SIGTERM | أي route |
| الاختبار | [[createApp()]] ويديه لـ supertest | بورت ثابت |

وفي Express 5: الـ callback بتاعة [[listen]] بتاخد الخطأ، فبص عليه.`,
          lines: [
            "express.",
            "دالة بتبني app جديد وترجّعه، من غير listen.",
            "app جديد.",
            "الـ middleware العادي.",
            "route للـ health check.",
            "الـ routers.",
            "الـ error handler في الآخر.",
            "رجّعه للي نادى: server.ts أو الاختبار.",
            "قفلة.",
            "server.ts بيستورد نفس الدالة.",
            "هو بس اللي بيعمل listen. في Express 5 لو البورت مشغول الخطأ بيوصل للـ callback نفسها، فـ [[if (err) throw err]] عشان السيرفر يقع بـ [[EADDRINUSE]] بدل ما يطبع «listening» ويخرج من غير ما يقول حاجة.",
            "ولما الـ process يتطلب منها تقفل، يقفل السيرفر الأول وبعدين يخرج."
          ],
          sol: R`الناتج الصح: [[typeof createApp()]] بيطبع [[function]] (الـ app في Express دالة [[(req, res, next)]])، ومفيش سطر «listening» ولا البورت اتفتح، والسكربت بيخلص ويقفل لوحده.

لو السكربت فضل مفتوح ومقفلش، يبقى فيه حاجة بتتفتح وقت الـ import: listen، أو اتصال Redis، أو setInterval. اطبع [[process.getActiveResourcesInfo()]] في آخر السكربت: بيقولك إيه اللي لسه مفتوح ([[TCPServerWrap]] يعني سيرفر سامع، و [[Timeout]] يعني timer)، أو علّق الـ imports واحد واحد.

ولو ظهر «listening»، يبقى [[listen]] لسه في app.ts أو في ملف بيتعمله import منه.`,
          solCode: R`// check-app.mjs
import { createApp } from "./src/app.js";
const app = createApp();
console.log(typeof app); // function
// مفيش listen: السكربت يخلص ويقفل لوحده`
        },
        {
          cmd: "supertest",
          title: "اختبر كل endpoint: الـ status والـ body",
          desc: R`[[request(app).post(url).set(header).send(body)]] بيبعت طلب حقيقي للـ app ويرجّعلك الرد، وانت بتتأكد من [[res.status]] و [[res.body]] بـ vitest.

لكل endpoint اختبر الحالة الناجحة، وكل رفض ليه كود مختلف: 400 للـ body الغلط، و 401 من غير توكن، و 404 لحاجة مش موجودة، و 502 لو خدمة برّه وقعت. أساسيات vitest نفسها (describe و it و watch) في درس [[vitest]] في تاب «فحص الكود».`,
          example: R`import request from "supertest";
import { describe, it, expect } from "vitest";
import { createApp } from "../src/app.js";
import { createUser } from "./factories.js";

const app = createApp();

describe("POST /api/orders", () => {
  it("creates an order", async () => {
    const user = await createUser();
    const res = await request(app).post("/api/orders").set("Authorization", $__btBearer $__{user.token}$__bt).send({ amountCents: 5000 });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ status: "PENDING", checkoutUrl: expect.stringContaining(res.body.id) });
  });

  it("rejects a bad amount with 400", async () => {
    const user = await createUser();
    const res = await request(app).post("/api/orders").set("Authorization", $__btBearer $__{user.token}$__bt).send({ amountCents: -1 });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("INVALID_AMOUNT");
  });
});`,
          try: R`[[npm i -D vitest supertest]]، واكتب ملف [[tests/health.test.ts]] يتأكد إن [[GET /health]] بيرجّع 200 و [[{ ok: true }]]، وإن [[GET /nope]] بيرجّع 404. شغّل [[npx vitest run]]. وبعدين غيّر الـ status في الـ route لـ 201 وشوف الاختبار بيقع بيقول إيه.`,
          flag: "script",
          deep: {
            why: R`الـ API هو العقد بينك وبين الواجهة والموبايل. اختبار الـ service لوحده مش كفاية: الـ validation والـ auth والـ error handler وشكل الـ JSON كلها بتحصل في الطبقات اللي فوقه. اختبار supertest بيعدّي على كل ده مرة واحدة، فبيمسك الغلطات اللي بتبوّظ الواجهة فعلًا: 500 بدل 400، أو حقل اتشال من الرد، أو route اتنقل.`,
            how: R`[[request(app)]] بيرجّع object تبني عليه الطلب بـ chaining، وأول ما تعمل [[await]] بيتبعت. [[.send(obj)]] بيعمل JSON ويحط [[Content-Type: application/json]] لوحده. و [[.set()]] للـ headers، و [[.query({ page: 2 })]] للـ query string.

الرد فيه [[status]] و [[headers]] و [[body]] (متحوّل من JSON) و [[text]] (النص الخام). و [[toMatchObject]] بيتأكد من الحقول اللي كتبتها بس ويتجاهل الباقي، فالاختبار ميقعش لو ضفت حقل جديد. و [[expect.any(String)]] و [[expect.stringContaining]] للقيم اللي بتتغير كل مرة زي الـ id والتاريخ.

supertest عنده [[.expect(201)]] كمان، بس [[expect(res.status).toBe(201)]] بيطلّع رسالة أوضح في vitest ويخليك تشوف الـ body لما يقع (حط [[console.log(res.body)]] مؤقتًا).

ولو عايز كوكيز تفضل بين الطلبات (login وبعده [[/me]])، استخدم [[request.agent(app)]]: بيحفظ الكوكيز زي المتصفح.`,
            when: "لكل endpoint: الحالة الناجحة، وكل كود خطأ ليه معنى مختلف. الحسابات المعقدة (سعر وخصم وضريبة) اختبرها كمان unit على الدالة نفسها، أسرع وأوضح.",
            mistakes: R`إنك تختبر [[res.status]] بس ومتبصش على الـ body، فـ endpoint بيرجّع [[{}]] بـ 200 يعدّي. أو العكس: [[toEqual]] على الرد كله بالـ id والتاريخ، فالاختبار يقع كل مرة. ونسيان [[await]] قبل [[request(app)]]: الاختبار «ينجح» من غير ما الطلب يتبعت أصلًا. واختبارات بتعتمد على ترتيبها (الأول بيعمل يوزر والتاني بيستخدمه): كل اختبار لازم يجهّز الداتا بتاعته بنفسه (درس [[factories]]).`
          },
          teach: R`## ملف اختبار: طلب حقيقي، وبعدين [[expect]] على الرد

كل [[it]] في المثال بيعمل ٣ حاجات: يجهّز يوزر، ويبعت طلب HTTP للـ app بـ supertest، ويتأكد من الـ status والـ body. مفيش سيرفر شغال ولا بورت ثابت: supertest بيشغّل الـ app على بورت مؤقت لكل طلب.

اتشغّل على ويندوز 11 بـ Node 24.19 و vitest 5.0.3 و supertest 7.3.1 و Express 5.2.1، و Prisma 7.10 على Postgres 16 في Docker (قاعدة [[myapp_test]]، الدرس الجاي). الـ app فيه [[POST /api/orders]] بيعمل الطلب وبيكلّم بوابة دفع وهمية بـ [[fetch]]، فملف الاختبار كان فيه زيادة على المثال handler بتاع msw بيرد مكان البوابة (درس [[msw و nock]]).

---

## ١. الـ imports

| السطر | ليه |
|---|---|
| [[import request from "supertest"]] | دالة [[request(app)]] اللي بتبعت الطلبات |
| [[import { describe, it, expect } from "vitest"]] | أدوات الاختبار: مجموعة، واختبار، وتأكيد |
| [[import { createApp } from "../src/app.js"]] | الـ app من غير listen (درس [[app و server]]) |
| [[import { createUser } from "./factories.js"]] | بتعمل يوزر في القاعدة وترجّعه ومعاه توكن (درس [[factories]]) |

و [[const app = createApp()]] مرة واحدة برّه الاختبارات: كل الاختبارات في الملف بتكلّم نفس الـ app.

---

## ٢. [[describe("POST /api/orders", () => { ... })]]

[[describe]] بيجمّع اختبارات تحت اسم واحد، والاسم بيظهر قبل اسم كل اختبار في الناتج. ملوش أي أثر غير التنظيم.

---

## ٣. السطر المهم: نفكّه من الشمال لليمين

~~~javascript
const res = await request(app).post("/api/orders").set("Authorization", $__btBearer $__{user.token}$__bt).send({ amountCents: 5000 });
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[request(app)]] | جهّز طلب للـ app ده |
| [[.post("/api/orders")]] | الـ method والعنوان (من غير host ولا بورت) |
| [[.set("Authorization", ...)]] | header. و [[$__btBearer $__{user.token}$__bt]] template literal بيحط التوكن بعد كلمة Bearer |
| [[.send({ amountCents: 5000 })]] | الـ body: بيعمله JSON ويحط [[Content-Type: application/json]] لوحده |
| [[await]] | **هنا بس** الطلب بيتبعت، و [[res]] بيبقى الرد |

لو نسيت [[await]]: جربت اختبار فيه [[request(app).get("/nope").expect(200)]] من غير await، و vitest قال عليه [[passed]] رغم إن الرد 404. الطلب متبعتش أصلًا قبل ما الاختبار يخلص.

### الرد اللي رجع

طبعته مرة بـ [[console.log(res.status, res.body)]]:

~~~text الناتج
201 application/json; charset=utf-8 {
  id: 'cmuxu9gjs0000fsienw01flmr',
  userId: 1,
  amountCents: 5000,
  status: 'PENDING',
  checkoutUrl: 'https://pay.example.com/c/cmuxu9gjs0000fsienw01flmr',
  gatewayTxId: null
}
~~~

[[res.body]] object جاهز (supertest عمل [[JSON.parse]] لوحده)، و [[res.text]] فيه نفس الكلام كنص خام.

(في vitest 5، [[console.log]] جوه اختبار **ناجح** مبيظهرش. بيظهر لو الاختبار وقع، أو لو شغّلت بـ [[--silent=false]].)

---

## ٤. التأكيدات

### [[expect(res.status).toBe(201)]]

[[toBe]] مقارنة بالظبط ([[Object.is]]). 201 = Created.

### [[expect(res.body).toMatchObject({ ... })]]

~~~javascript
expect(res.body).toMatchObject({ status: "PENDING", checkoutUrl: expect.stringContaining(res.body.id) });
~~~

- [[toMatchObject]]: الحقول اللي كتبتها بس لازم تطابق، والباقي ([[id]] و [[userId]] و [[amountCents]]) متجاهل. لو ضفت حقل جديد للرد بكرة، الاختبار مش هيقع.
- [[expect.stringContaining(res.body.id)]]: أي نص فيه الـ id ده. الـ id بيتغير كل مرة، فمنقدرش نكتبه ثابت، بس نقدر نتأكد إن اللينك مربوط بالطلب ده بالذات.

### اختبار الرفض

~~~javascript
const res = await request(app).post("/api/orders").set(...).send({ amountCents: -1 });
expect(res.status).toBe(400);
expect(res.body.error).toBe("INVALID_AMOUNT");
~~~

الرد الحقيقي:

~~~text الناتج
400 { error: 'INVALID_AMOUNT' }
~~~

ليه نتأكد من [[error]] كمان؟ لأن الواجهة بتعتمد على الكود ده عشان تعرض رسالة. 400 بكود تاني (مثلًا من الـ validation) معناها رسالة غلط قدام اليوزر.

---

## ٥. التشغيل

~~~bash
npx vitest run --reporter=verbose
~~~

[[run]] يعني شغّل مرة واخرج (من غيرها vitest بيفضل يراقب الملفات)، و [[--reporter=verbose]] بيكتب كل اختبار في سطر:

~~~text الناتج
 ✓ tests/orders.test.ts > POST /api/orders > creates an order 239ms
 ✓ tests/orders.test.ts > POST /api/orders > rejects a bad amount with 400 62ms
 ✓ tests/health.test.ts > GET /health 127ms
 ✓ tests/health.test.ts > unknown route is 404 38ms
 Test Files  2 passed (2)
      Tests  4 passed (4)
~~~

[[POST /api/orders > creates an order]] هو اسم الـ [[describe]] وبعده اسم الـ [[it]].

---

## ٦. الـ solCode وتجربة الـ «try»

[[tests/health.test.ts]] زي الـ solCode بالظبط نجح (الاتنين التحت في الناتج فوق). وعلى [[/nope]] الـ 404 جاي من Express نفسه، وده شكله:

~~~text الناتج
404 text/html; charset=utf-8 "<!DOCTYPE html>...<pre>Cannot GET /nope</pre>..." {}
~~~

HTML مش JSON، فـ [[res.body]] بقى [[{}]] فاضي. عشان كده الاختبار بيبص على [[res.status]] بس هنا.

ولما غيّرت [[/health]] يرجّع 201:

~~~text الناتج
 FAIL  tests/health.test.ts > GET /health
AssertionError: expected 201 to be 200 // Object.is equality

- Expected
+ Received

- 200
+ 201

 ❯ tests/health.test.ts:9:22
      9|   expect(res.status).toBe(200);
       |                      ^

 Test Files  1 failed (1)
      Tests  1 failed | 1 passed (2)
~~~

[[- Expected]] اللي انت كاتبه في الاختبار، و [[+ Received]] اللي رجع فعلًا، و [[9:22]] السطر والعمود.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[request(app)]] | طلب HTTP حقيقي على بورت مؤقت |
| [[.post()]] [[.set()]] [[.send()]] | الـ method والـ headers والـ body (JSON لوحده) |
| [[await]] | من غيره الطلب مبيتبعتش والاختبار «ينجح» |
| [[res.status]] و [[res.body]] | اتأكد من الاتنين |
| [[toMatchObject]] + [[expect.stringContaining]] | الحقول المهمة بس، والقيم المتغيرة بشكلها |`,
          lines: [
            "supertest.",
            "دوال vitest.",
            "الـ app من غير listen.",
            "factory بتعمل يوزر وتوكن (درس [[factories]]).",
            "app واحد للملف كله.",
            "مجموعة اختبارات لـ endpoint واحد.",
            "الحالة الناجحة.",
            "يوزر جديد للاختبار ده بس.",
            "ابعت POST بالتوكن والـ body.",
            "201 Created.",
            "الحقول المهمة بس، والـ checkoutUrl فيه id الطلب.",
            "قفلة.",
            "حالة الرفض.",
            "يوزر.",
            "مبلغ سالب.",
            "400 مش 500.",
            "وكود الخطأ اللي الواجهة بتعتمد عليه.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`الناتج: [[Test Files 1 passed]] و [[Tests 2 passed]]. ولما تغيّر الـ status لـ 201، vitest بيطبع [[expected 201 to be 200]] ومعاها السطر اللي وقع.

ولو [[GET /nope]] رجع 200 بـ HTML، يبقى عندك route [[*]] بيرجّع الواجهة (SPA fallback) قبل الـ 404 بتاع الـ API: خلي الـ fallback ده بعد كل routes الـ API، أو ميشتغلش على [[/api]].

ولو الأمر فضل شغال ومقفلش، يبقى فيه اتصال مفتوح (Redis أو الداتابيز): اقفله في [[afterAll]].`,
          solCode: R`import request from "supertest";
import { it, expect } from "vitest";
import { createApp } from "../src/app.js";

const app = createApp();

it("GET /health", async () => {
  const res = await request(app).get("/health");
  expect(res.status).toBe(200);
  expect(res.body).toEqual({ ok: true });
});

it("unknown route is 404", async () => {
  const res = await request(app).get("/nope");
  expect(res.status).toBe(404);
});`
        },
        {
          cmd: "قاعدة الاختبار",
          title: "قاعدة بيانات للاختبار لوحدها، وتتنضف بين الاختبارات",
          desc: R`الاختبارات بتكلّم Postgres حقيقي، بس قاعدة تانية خالص ([[myapp_test]]) عمرها ما تبقى قاعدة التطوير. قبل الاختبارات [[prisma migrate deploy]] عليها، وقبل كل اختبار بتفضّيها.

طريقتين للتنضيف: [[TRUNCATE]] لكل الجداول قبل كل اختبار (بسيطة وشغالة مع أي حاجة)، أو كل اختبار جوه transaction وتعمل ROLLBACK في الآخر (أسرع، بس صعبة لما الطلب بيعدّي على HTTP والكود بيفتح transactions بنفسه).`,
          example: R`// vitest.config.ts
import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    env: { DATABASE_URL: "postgresql://app:app@localhost:5432/myapp_test", JWT_SECRET: "test-secret" },
    setupFiles: ["./tests/setup.ts"],
    fileParallelism: false,
  },
});

// tests/setup.ts
import { afterAll, beforeEach } from "vitest";
import { db } from "../src/db.js";
beforeEach(async () => {
  await db.$executeRawUnsafe('TRUNCATE TABLE "Order", "User" RESTART IDENTITY CASCADE');
});
afterAll(() => db.$disconnect());

# package.json: "test": "dotenv run -f .env.test -- prisma migrate deploy && vitest run"`,
          try: R`اعمل قاعدة [[myapp_test]] (بـ [[createdb]] أو [[CREATE DATABASE]] في psql)، وشغّل عليها [[DATABASE_URL=... npx prisma migrate deploy]]. اكتب اختبارين: الأول يعمل يوزر بإيميل ثابت، والتاني يعمل يوزر بنفس الإيميل. من غير الـ TRUNCATE التاني هيقع بـ unique constraint لو اتشغّلوا ورا بعض، ومعاه الاتنين ينجحوا.`,
          flag: "script",
          deep: {
            why: R`الـ mock للداتابيز بيخبّي أهم الغلطات: unique constraint، و foreign key، و query غلط، و migration ناقصة، و transaction مش شغالة. الاختبار اللي بيكلّم Postgres حقيقي بيمسك ده كله. والقاعدة المنفصلة لأن الاختبارات بتمسح كل حاجة، وأول مرة حد يشغّلها على قاعدة التطوير هيخسر الداتا بتاعته.`,
            how: R`[[migrate deploy]] مش [[migrate dev]]: الـ deploy بيطبّق الـ migrations الموجودة زي الإنتاج بالظبط، ومبيولّدش migration جديدة ولا بيسألك أسئلة. فلو فيه migration ناقصة من الـ repo، الاختبارات هتقع هنا قبل ما الإنتاج يقع.

[[TRUNCATE ... RESTART IDENTITY CASCADE]] بيفضّي الجداول في أمر واحد، ويرجّع الـ sequences من الأول، و CASCADE بيعدّي على الجداول المرتبطة بـ foreign keys. أسرع بكتير من [[deleteMany]] على كل جدول بالترتيب. والأسماء بين [[""]] لأن Prisma بيعمل الجداول بحروف كبيرة. ومتفضّيش [[_prisma_migrations]]!

الـ rollback: تفتح transaction، وتشغّل الاختبار جواها، وفي الآخر ROLLBACK فكأن مفيش حاجة حصلت. سريع جدًا، بس شرطه إن كل الكود يستخدم نفس الاتصال اللي فيه الـ transaction. مع Prisma والطلب اللي بيعدّي على HTTP ده صعب: الـ client عنده pool، والـ [[$transaction]] اللي جوه الكود بيفتح transaction تانية. عشان كده TRUNCATE هي الاختيار العملي مع Prisma و supertest، و rollback تنفع أكتر في اختبارات الـ repository اللي بتدّيها الـ client بإيدك.

[[fileParallelism: false]] بيشغّل ملفات الاختبار ورا بعض، لأنهم بيشاركوا نفس القاعدة. لو عايز parallel، اعمل قاعدة أو schema لكل worker (مثلًا [[myapp_test_$__{process.env.VITEST_POOL_ID}]]).

وفي CI نفس الفكرة بـ service container لـ Postgres: درس [[services]] في تاب «GitHub Actions»، ومثال كامل في درس «ci.yml: Postgres + Prisma» في تاب «من مشاريعي».`,
            when: "أي اختبار بيعدّي على الداتابيز. والمنطق الصافي (حسابات وتحويلات) اختبره unit من غير قاعدة خالص.",
            mistakes: R`[[DATABASE_URL]] في الاختبار بييجي من [[.env]] العادي لأن حد نسي يغيّره، فالـ TRUNCATE يمسح قاعدة التطوير. حط حارس في setup: [[if (!process.env.DATABASE_URL.includes("_test")) throw ...]]. واستخدام SQLite في الاختبار و Postgres في الإنتاج: أنواع وسلوك مختلف، وهتعدّي اختبارات على حاجات بتقع في الإنتاج. وتشغيل [[migrate dev]] في CI. وملفات اختبار parallel على قاعدة واحدة: اختبارات بتقع مرة وتنجح مرة (flaky) ومحدش فاهم ليه.`
          },
          teach: R`## ٣ ملفات: إعداد vitest، وملف setup، وسطر في package.json

[[vitest.config.ts]] بيقول لـ vitest يشغّل الاختبارات على قاعدة [[myapp_test]] وبيحدد ملف setup. و [[tests/setup.ts]] بيفضّي الجداول قبل كل اختبار. وسكربت [[test]] في package.json بيطبّق الـ migrations على قاعدة الاختبار الأول، وبعدين يشغّل vitest.

اتشغّل على ويندوز 11 بـ Node 24.19 و vitest 5.0.3 و Prisma 7.10 ([[@prisma/adapter-pg]])، على Postgres 16 في Docker: container اسمه [[teach-api03-pg]] على بورت 54873 بدل 5432 (لأن 5432 مشغول بقاعدة تانية على الجهاز ده). فالـ URL في التجربة كان [[postgresql://app:app@localhost:54873/myapp_test]].

---

## ١. [[vitest.config.ts]]

~~~javascript
import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    env: { DATABASE_URL: "postgresql://app:app@localhost:5432/myapp_test", JWT_SECRET: "test-secret" },
    setupFiles: ["./tests/setup.ts"],
    fileParallelism: false,
  },
});
~~~

### [[defineConfig({ test: { ... } })]]

[[defineConfig]] جاية من [[vitest/config]] (أول سطر بعد التعليق). مبتعملش حاجة غير إنها بترجّع الـ object زي ما هو، بس بتدّي الـ editor أنواع و autocomplete. وكل إعدادات الاختبار جوه [[test]].

### [[env: { DATABASE_URL: ..., JWT_SECRET: ... }]]

متغيرات بيئة بتتحط في [[process.env]] قبل ما أي ملف اختبار يتحمّل. فـ [[src/db.ts]] لما يقرا [[process.env.DATABASE_URL]] بياخد قاعدة الاختبار. وفك الـ URL:

~~~text postgresql://app:app@localhost:5432/myapp_test
postgresql://   نوع القاعدة
app:app         اليوزر : الباسورد
@localhost:5432 الجهاز : البورت
/myapp_test     اسم القاعدة، وده الفرق الوحيد عن قاعدة التطوير
~~~

طبعت [[process.env.DATABASE_URL]] من جوه اختبار وطلع [[postgresql://app:app@localhost:54873/myapp_test]].

### [[setupFiles]]

ملف بيتشغّل قبل **كل** ملف اختبار، فالـ hooks اللي فيه بتسري على كل الاختبارات.

### [[fileParallelism: false]]

vitest افتراضيًا بيشغّل كذا ملف في نفس الوقت. هنا كلهم بيكلّموا نفس القاعدة، فملف ممكن يعمل TRUNCATE وملف تاني في نص اختبار. [[false]] = ملف ورا ملف.

---

## ٢. [[tests/setup.ts]]

~~~javascript
beforeEach(async () => {
  await db.$executeRawUnsafe('TRUNCATE TABLE "Order", "User" RESTART IDENTITY CASCADE');
});
afterAll(() => db.$disconnect());
~~~

### [[beforeEach(fn)]]

شغّل [[fn]] قبل كل [[it]]. يعني كل اختبار بيبدأ بقاعدة فاضية.

### [[db.$executeRawUnsafe('...')]]

بيبعت SQL خام زي ما هو. [[Unsafe]] لأنه مش بيحمي من SQL injection لو حطيت فيه قيم من برّه، وهنا النص ثابت فمفيش مشكلة. والـ single quotes برّه عشان الـ double quotes جوه تفضل جزء من الـ SQL.

### الـ SQL نفسه

| الحتة | معناها |
|---|---|
| [[TRUNCATE TABLE]] | فضّي الجداول دي مرة واحدة (أسرع من DELETE لأنه مبيعدّيش صف صف) |
| [["Order", "User"]] | أسماء الجداول بين [[""]]: Prisma عملها بحرف كبير، و Postgres من غير quotes بيحوّل الاسم لحروف صغيرة. و [[order]] كمان كلمة محجوزة في SQL |
| [[RESTART IDENTITY]] | رجّع عدّادات الـ ids لـ 1 |
| [[CASCADE]] | لو جدول تاني مربوط بيهم بـ foreign key، فضّيه كمان |

### [[afterAll(() => db.$disconnect())]]

بعد آخر اختبار في الملف اقفل اتصالات Prisma، وإلا الـ pool بيفضل مفتوح.

---

## ٣. نجرّب الـ «try»

اختبارين بيعملوا يوزر بنفس الإيميل، والاتنين بيتوقعوا [[id]] بـ 1:

~~~javascript
it("first user", async () => {
  const u = await db.user.create({ data: { email: "sara@test.local" } });
  expect(u.id).toBe(1);
});
it("same email again", async () => { ...نفس الكلام... });
~~~

### مع الـ [[beforeEach]]

~~~text الناتج
 ✓ dbg/users.test.ts > first user 176ms
 ✓ dbg/users.test.ts > same email again 50ms
      Tests  2 passed (2)
~~~

الاتنين نجحوا، والاتنين [[id]] بتاعهم 1: ده [[RESTART IDENTITY]].

### من غيره (setup فيه [[afterAll]] بس)

~~~text الناتج
CODE P2002 ... "originalCode":"23505","originalMessage":"duplicate key value violates unique constraint \"User_email_key\"" ...
   × same email again 15ms
Unique constraint failed on the constraint: $__btUser_email_key$__bt
      Tests  1 failed | 1 passed (2)
~~~

- [[P2002]]: كود Prisma للـ unique constraint.
- [[23505]]: نفس الخطأ بكود Postgres نفسه.
- [[User_email_key]]: اسم الـ index اللي Prisma عمله لـ [[@unique]] على [[email]].

وتشغيلة تانية من غير تنضيف وقّعت **الاتنين**، لأن [[sara@test.local]] كان لسه موجود من المرة اللي قبلها. ده بالظبط معنى «الاختبار بيعتمد على اللي حصل قبله».

---

## ٤. سكربت [[test]]

~~~text package.json
"test": "dotenv run -f .env.test -- prisma migrate deploy && vitest run"
~~~

نفكّه بالترتيب:

1. [[dotenv run -f .env.test --]]: اقرا [[.env.test]] (فيه [[DATABASE_URL]] بتاع قاعدة الاختبار) وحطه في البيئة، وشغّل الأمر اللي بعد [[--]].
2. [[prisma migrate deploy]]: طبّق أي migration لسه متطبقتش، من غير ما يولّد جديدة ولا يسأل.
3. [[&&]]: لو اللي قبلها نجحت بس.
4. [[vitest run]]: الاختبارات. ([[DATABASE_URL]] بتاعها جاي من [[vitest.config.ts]].)

أول تشغيل على قاعدة فاضية:

~~~text الناتج
◇ injected env (1) from .env.test
Loaded Prisma config from prisma.config.ts.
Datasource "db": PostgreSQL database "myapp_test", schema "public" at "localhost:54873"

1 migration found in prisma/migrations
Applying migration $__bt20261007081549_init$__bt
...
All migrations have been successfully applied.

 Test Files  2 passed (2)
      Tests  4 passed (4)
~~~

### ليه [[dotenv run -f]] مش [[dotenv -e]]؟

مكتبة [[dotenv]] (اللي [[prisma.config.ts]] في Prisma 7 بيستوردها) بقى ليها أمر اسمه [[dotenv]] من نسخة 18، وصيغته [[dotenv run -f <file> -- <cmd>]]. والصيغة القديمة [[dotenv -e .env.test -- ...]] بتاعة مكتبة تانية اسمها [[dotenv-cli]]. لما الاتنين يبقوا متسطّبين، الاسم واحد، وفي تجربتي [[node_modules/.bin/dotenv]] كان بتاع [[dotenv]] 18، فالصيغة القديمة طبعت الـ usage ووقفت:

~~~text الناتج
Usage: dotenv run [--help] [-q|--quiet] [--debug] [--override] [--fast] [-f|--file <paths>] [--] <command> [args...]
~~~

لو مشروعك فيه [[dotenv-cli]] بس (ومفيش [[dotenv]] 18)، الصيغة القديمة شغالة. المهم تعرف انت بتنادي أنهي واحد.

---

## ٥. الـ solCode: أول مرة على جهاز جديد

~~~bash
createdb -h localhost -U app myapp_test
DATABASE_URL=postgresql://app:app@localhost:5432/myapp_test npx prisma migrate deploy
npx vitest run tests/users.test.ts
~~~

- [[createdb]]: برنامج بييجي مع Postgres بيعمل قاعدة. [[-h]] الـ host، و [[-U]] اليوزر. على ويندوز من غير Postgres متسطّب شغّلته جوه الـ container: [[docker exec teach-api03-pg createdb -h localhost -U app myapp_test2]] ورجع بصفر. ومرة تانية بنفس الاسم: [[createdb: error: database creation failed: ERROR:  database "myapp_test2" already exists]].
- [[DATABASE_URL=... npx ...]] (bash بس): متغير للأمر ده لوحده. في PowerShell: [[$env:DATABASE_URL="..."; npx prisma migrate deploy]] (جربتها في PowerShell 7.6 على قاعدة متطبّق عليها قبل كده وقالت [[No pending migrations to apply.]]).

ولو نسيت [[migrate deploy]] وشغّلت على القاعدة الفاضية:

~~~text الناتج
P2021 | The table $__btpublic.User$__bt does not exist in the current database.
~~~

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[env.DATABASE_URL]] | الاختبارات على [[myapp_test]]، عمرها ما تلمس قاعدة التطوير |
| [[setupFiles]] | [[beforeEach]] و [[afterAll]] لكل الملفات |
| [[TRUNCATE ... RESTART IDENTITY CASCADE]] | كل اختبار يبدأ فاضي والـ ids من 1 |
| [[fileParallelism: false]] | ملف ورا ملف عشان القاعدة واحدة |
| [[migrate deploy]] قبل [[vitest run]] | الـ schema زي الإنتاج، و P2021 لو نسيته |`,
          lines: [
            "[[defineConfig]] من vitest، بيدّي الإعدادات أنواع و autocomplete.",
            "إعداد vitest.",
            "قسم الاختبارات.",
            "متغيرات البيئة للاختبار: قاعدة الاختبار وسر JWT ثابت.",
            "ملف بيتشغّل قبل كل ملف اختبار.",
            "ملفات الاختبار ورا بعض عشان بيشاركوا نفس القاعدة.",
            "قفلة.",
            "قفلة.",
            "hooks بتاعة vitest.",
            "نفس الـ Prisma client بتاع التطبيق.",
            "قبل كل اختبار...",
            "...فضّي الجداول وصفّر العدادات، و CASCADE للجداول المرتبطة.",
            "قفلة.",
            "في الآخر اقفل الاتصال عشان الـ process تخلص."
          ],
          sol: R`المتوقع: من غير [[beforeEach]] اللي فيه TRUNCATE، الاختبار التاني بيقع بخطأ Prisma كوده [[P2002]] ورسالته [[Unique constraint failed on the constraint: User_email_key]] (اسم الـ unique index اللي Prisma عمله على [[email]]). ومعاه الاتنين بينجحوا مهما شغّلتهم كام مرة.

لو الاتنين نجحوا من غير TRUNCATE، يبقى غالبًا الـ email مش [[@unique]] في الـ schema، أو الاختبارات مش بتكلّم نفس القاعدة اللي انت فاكرها: اطبع [[process.env.DATABASE_URL]] في الـ setup.

ولو ظهر خطأ [[P2021]] ورسالته [[The table public.User does not exist in the current database]]، يبقى نسيت [[migrate deploy]] على قاعدة الاختبار.`,
          solCode: R`createdb -h localhost -U app myapp_test
DATABASE_URL=postgresql://app:app@localhost:5432/myapp_test npx prisma migrate deploy
npx vitest run tests/users.test.ts`
        },
        {
          cmd: "factories",
          title: "داتا الاختبار: factory صغيرة بدل ملف fixtures ضخم",
          desc: R`factory دالة بتعمل صف واحد بقيم افتراضية معقولة وبترجّعه، وتقدر تغيّر أي حقل: [[createUser({ role: "ADMIN" })]]. كل اختبار بيعمل الداتا اللي محتاجها بس، فتقرا الاختبار وتفهم هو بيختبر إيه.

و [[createUser]] بترجّع كمان التوكن بتاع اليوزر، عشان مفيش اختبار محتاج يعدّي على login.`,
          example: R`// tests/factories.ts
import jwt from "jsonwebtoken";
import { db } from "../src/db.js";

let n = 0;
export async function createUser(overrides = {}) {
  n++;
  const user = await db.user.create({ data: { email: $__btuser$__{n}@test.local$__bt, ...overrides } });
  const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "5m" });
  return { ...user, token };
}

export function createOrder(user, overrides = {}) {
  return db.order.create({ data: { userId: user.id, amountCents: 5000, ...overrides } });
}`,
          try: R`اعمل [[createUser]] و [[createOrder]] زي المثال، واكتب اختبار «الأدمن يقدر يمسح طلب أي حد»: يوزر عادي عنده طلب، وأدمن بـ [[createUser({ role: "ADMIN" })]] بيعمل DELETE. لازم الاختبار كله يبقى ٦ سطور أو أقل.`,
          flag: "script",
          deep: {
            why: R`ملف fixtures كبير (٢٠ يوزر و ١٠٠ طلب في JSON) بيبدأ صغير ويكبر لحد ما محدش يعرف أنهي اختبار معتمد على أنهي صف. تعدّل حقل عشان اختبار، يقع ٥ اختبارات تانيين. والاختبار نفسه بيبقى [[expect(orders).toHaveLength(7)]] ومحدش فاهم ليه ٧. الـ factory بتخلي السبب مكتوب قدامك: عملت طلبين ليوزر A وطلب ليوزر B، فـ A يشوف ٢.`,
            how: R`القيم الافتراضية لازم تبقى صالحة وتعدّي كل الـ constraints: إيميل فريد (عشان كده العداد [[n]])، وأي حقل مطلوب ليه قيمة. و [[...overrides]] في الآخر عشان أي حاجة تكتبها تغلب الافتراضي.

العلاقات: [[createOrder(user)]] بتاخد اليوزر بدل ما تعمل واحد من عندها. كده انت اللي بتقرر مين صاحب الطلب، ودا بالظبط اللي محتاجه في اختبارات الصلاحيات (الدرس الجاي). ولو عايز الاختصار، ممكن تخلي [[user]] اختياري وتعمل واحد لو مش موجود.

التوكن: بنعمله بـ [[jwt.sign]] بنفس السر اللي الـ app شايفه في الاختبار ([[JWT_SECRET]] من vitest.config). ده أسرع من login حقيقي في كل اختبار، و login نفسه ليه اختبار لوحده. ولو الـ auth عندك session، الـ factory تعمل login بـ [[request.agent(app)]] وترجّع الـ agent.

والـ seed بتاع التطوير (درس «prisma db seed و studio» في تاب «Node و npm») حاجة تانية: داتا شكلها حلو عشان تتفرج على التطبيق. متستخدمهوش في الاختبارات.`,
            when: "من أول ما يبقى عندك أكتر من ٣ اختبارات بتعمل نفس النوع من الداتا. وفيه مكتبات (زي fishery أو @faker-js/faker للقيم العشوائية)، بس دالة صغيرة زي دي كفاية لأغلب المشاريع.",
            mistakes: R`قيم عشوائية في كل حاجة (faker لكل حقل) فالاختبار يقع مرة كل ١٠٠ مرة لأن الاسم العشوائي طلع أطول من الحد: خلي القيم ثابتة إلا لو محتاجها فريدة. و factory بتعمل ١٠ حاجات مرتبطة لوحدها (يوزر وطلبات ومدفوعات) فكل اختبار بطيء ومحدش عارف إيه اللي اتعمل. وإنك تعدّل الـ object اللي راجع من factory في اختبار وتستخدمه في اختبار تاني.`
          },
          teach: R`## دالتين بيعملوا صفوف حقيقية في قاعدة الاختبار

[[createUser]] بتعمل يوزر في القاعدة وترجّعه ومعاه توكن جاهز، و [[createOrder]] بتعمل طلب ليوزر انت بتديهولها. الاتنين ليهم قيم افتراضية، وأي حقل تبعته في [[overrides]] بيغلبها.

اتشغّل على ويندوز 11 بـ Node 24.19 و vitest 5.0.3 و Prisma 7.10 و jsonwebtoken 9.0.3، على قاعدة [[myapp_test]] (Postgres 16 في Docker) ومعاها الـ [[setup.ts]] اللي بيعمل TRUNCATE قبل كل اختبار (الدرس اللي فات).

---

## ١. [[let n = 0]]

عداد على مستوى الملف (برّه أي دالة)، فبيفضل عايش طول ما ملف الاختبار شغال. بيزيد مع كل [[createUser]] عشان كل إيميل يبقى مختلف، لأن [[email]] عليه [[@unique]].

---

## ٢. [[export async function createUser(overrides = {})]]

- [[overrides = {}]]: قيمة افتراضية للـ parameter. لو ناديت [[createUser()]] من غير حاجة، [[overrides]] بيبقى object فاضي بدل [[undefined]]، فالـ [[...overrides]] تحت ميقعش.
- [[async]]: لأن جواها [[await]] على القاعدة.

### [[n++]]

زوّد العداد 1.

### [[db.user.create({ data: { email: $__btuser$__{n}@test.local$__bt, ...overrides } })]]

- [[$__btuser$__{n}@test.local$__bt]]: template literal، فبيطلع [[user1@test.local]] ثم [[user2@test.local]]... و [[.local]] دومين محجوز مش حقيقي، فلو حاجة بعتت إيميل بالغلط مش هيوصل لحد.
- [[...overrides]] (spread): انسخ كل مفاتيح [[overrides]] هنا. ولأنه **بعد** [[email]]، لو [[overrides]] فيه [[email]] هو اللي بيكسب. ولو اتكتب قبله، الافتراضي كان هيغلب اللي انت باعته.
- [[role]] مش مكتوب: القاعدة بتحط الافتراضي اللي في الـ schema ([[@default(USER)]]).

### [[jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "5m" })]]

- الـ payload: [[sub]] (subject، يعني صاحب التوكن) و [[role]]. بيتعمل **بعد** [[create]]، فبياخد [[user.role]] الحقيقي اللي في القاعدة، سواء الافتراضي أو اللي جه من [[overrides]].
- [[process.env.JWT_SECRET]]: نفس السر اللي الـ app بيتحقق بيه، جاي من [[vitest.config.ts]] ([["test-secret"]]).
- [[expiresIn: "5m"]]: ٥ دقايق، كفاية لأي اختبار.

فكّيت توكن الأدمن بـ [[jwt.decode]]:

~~~text الناتج
{ sub: 2, role: 'ADMIN', iat: 1791361501, exp: 1791361801 }
~~~

[[iat]] (issued at) و [[exp]] (expires) بالثواني من ١٩٧٠، والفرق بينهم 300 ثانية = ٥ دقايق.

### [[return { ...user, token }]]

object جديد فيه كل حقول اليوزر، وزيادة عليهم [[token]]. فالاختبار بيكتب [[user.id]] و [[user.token]] من نفس المتغير.

---

## ٣. [[createOrder(user, overrides = {})]]

~~~javascript
return db.order.create({ data: { userId: user.id, amountCents: 5000, ...overrides } });
~~~

- بتاخد [[user]] صريح: انت اللي بتقرر الطلب بتاع مين.
- مفيش [[async]]: بترجّع الـ Promise بتاع Prisma على طول، واللي نادى يعمل [[await]]. نفس النتيجة.

---

## ٤. اللي رجع فعلًا

في اختبار واحد ناديت:

~~~javascript
const u = await createUser();
const admin = await createUser({ role: "ADMIN", email: "boss@test.local" });
const o = await createOrder(u);
const o2 = await createOrder(u, { amountCents: 100 });
~~~

~~~text الناتج
{ id: 1, email: 'user3@test.local', role: 'USER', token: 'eyJhbGciOiJIUzI1...' }
{ id: 2, email: 'boss@test.local', role: 'ADMIN', token: '...' }
{ id: 'cmuxudwrl0001nkie14fya9x5', userId: 1, amountCents: 5000, status: 'PENDING', checkoutUrl: null, gatewayTxId: null }
{ id: 'cmuxudwrr0002nkiexz6k32b2', userId: 1, amountCents: 100, status: 'PENDING', checkoutUrl: null, gatewayTxId: null }
~~~

لاحظ ٣ حاجات:

1. [[id: 1]] بس الإيميل [[user3]]: الـ TRUNCATE رجّع عداد القاعدة لـ 1، بس [[n]] في الـ JavaScript مبيرجعش (كان فيه اختبار قبله في نفس الملف عمل يوزرين). ومش مشكلة: المهم الإيميل ميتكررش.
2. [[boss@test.local]] و [[ADMIN]]: الـ overrides غلبت الافتراضي.
3. [[amountCents: 100]] في الطلب التاني، و [[status: 'PENDING']] من [[@default]] في الـ schema.

---

## ٥. الـ solCode: «الأدمن يقدر يمسح طلب أي حد»

~~~javascript
it("admin can delete anyone's order", async () => {
  const order = await createOrder(await createUser());
  const admin = await createUser({ role: "ADMIN" });
  const res = await request(app).delete($__bt/api/orders/$__{order.id}$__bt).set("Authorization", $__btBearer $__{admin.token}$__bt);
  expect(res.status).toBe(204);
  expect(await db.order.findUnique({ where: { id: order.id } })).toBeNull();
});
~~~

- [[createOrder(await createUser())]]: من جوه لبرة: اعمل يوزر، وبعدين طلب ليه. سطر واحد وواضح مين صاحب الطلب.
- [[204]]: No Content، تم ومفيش body.
- [[findUnique(...)]] + [[toBeNull()]]: اتأكد من القاعدة إن المسح حصل فعلًا، مش بس إن الرد قال كده.

~~~text الناتج
 ✓ tests/admin.test.ts > admin can delete anyone's order
~~~

وبنفس الـ factories، يوزر عادي بيحاول يمسح طلبه هو:

~~~text الناتج
normal user DELETE: 403 { error: 'Forbidden' }
~~~

الفرق بين الاختبارين كلمة واحدة في [[overrides]]، وده اللي بيخلي الـ factory مفيدة في اختبارات الصلاحيات (الدرس الجاي).

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[n]] | إيميل مختلف كل مرة عشان [[@unique]] |
| [[overrides = {}]] + [[...overrides]] في الآخر | غيّر أي حقل، واللي تبعته يكسب |
| [[jwt.sign]] بعد [[create]] | التوكن فيه الـ role الحقيقي، ومن غير login |
| [[createOrder(user)]] | صاحب الطلب مكتوب في الاختبار |
| [[return { ...user, token }]] | كل حاجة في متغير واحد |`,
          lines: [
            "jsonwebtoken عشان نعمل توكن من غير login.",
            "نفس الـ Prisma client.",
            "عداد عشان كل إيميل يبقى فريد.",
            "factory لليوزر، وأي حقل ممكن يتغيّر.",
            "زوّد العداد.",
            "اعمل اليوزر بإيميل فريد، و overrides تغلب الافتراضي.",
            "توكن بنفس السر اللي الـ app شايفه في الاختبار، عمره قصير.",
            "رجّع اليوزر ومعاه التوكن.",
            "قفلة.",
            "factory للطلب، بتاخد صاحبه صريح.",
            "طلب بمبلغ افتراضي، وأي حقل ممكن يتغيّر.",
            "قفلة."
          ],
          sol: R`الاختبار بيعمل صاحب الطلب، والطلب، والأدمن، والـ DELETE، ويتأكد إن الرد 204 وإن الطلب مبقاش موجود في القاعدة. مش كفاية تبص على الـ status: لازم تتأكد إن المسح حصل فعلًا.

لو رجع 403، يبقى الـ role مش في التوكن: الـ factory لازم تعمل [[jwt.sign]] بعد ما تعمل اليوزر بالـ role اللي اتبعت، مش قبله. ولو رجع 404، يبقى الـ route بيدوّر على الطلب بـ [[userId]] الأدمن (ownership) حتى في مسار الأدمن.`,
          solCode: R`it("admin can delete anyone's order", async () => {
  const order = await createOrder(await createUser());
  const admin = await createUser({ role: "ADMIN" });
  const res = await request(app).delete($__bt/api/orders/$__{order.id}$__bt).set("Authorization", $__btBearer $__{admin.token}$__bt);
  expect(res.status).toBe(204);
  expect(await db.order.findUnique({ where: { id: order.id } })).toBeNull();
});`
        },
        {
          cmd: "401 و 403 و 404",
          title: "مصفوفة الصلاحيات: كل route فيه :id يتختبر بيوزرين",
          desc: R`أي route فيه [[:id]] ليه على الأقل ٤ اختبارات: من غير توكن 401، وصاحب الحاجة 200، ويوزر تاني 404 (مش 200 ولا 403)، ويوزر معندوش الـ role المطلوب 403.

أخطر bug في أي API إن يوزر B يشوف أو يعدّل حاجة يوزر A بمجرد ما يغيّر الرقم في الـ URL (IDOR، درس [[ownership (IDOR)]]). الاختبار ده بيمسكه قبل ما حد تاني يمسكه.`,
          example: R`describe("GET /api/orders/:id", () => {
  it("401 without a token", async () => {
    expect((await request(app).get("/api/orders/anything")).status).toBe(401);
  });
  it("200 for the owner", async () => {
    const a = await createUser();
    const order = await createOrder(a);
    const res = await request(app).get($__bt/api/orders/$__{order.id}$__bt).set("Authorization", $__btBearer $__{a.token}$__bt);
    expect(res.status).toBe(200);
  });
  it("404 for another user", async () => {
    const [a, b] = [await createUser(), await createUser()];
    const order = await createOrder(a);
    const res = await request(app).get($__bt/api/orders/$__{order.id}$__bt).set("Authorization", $__btBearer $__{b.token}$__bt);
    expect(res.status).toBe(404);
  });
  it("403 for a non-admin on DELETE", async () => {
    const a = await createUser();
    const order = await createOrder(a);
    expect((await request(app).delete($__bt/api/orders/$__{order.id}$__bt).set("Authorization", $__btBearer $__{a.token}$__bt)).status).toBe(403);
  });
});`,
          try: R`اختار route عندك فيه [[:id]] بيعدّل حاجة (PATCH أو DELETE)، واكتبله الأربع حالات. وبعدين «اكسر» الـ service: شيل [[userId]] من الـ where، وشغّل الاختبارات. لازم اختبار «يوزر تاني» يقع. لو ماوقعش، الاختبار نفسه غلط.`,
          flag: "script",
          deep: {
            why: R`الـ auth middleware بيتأكد انت مين، بس مبيعرفش الحاجة دي بتاعة مين. كل route لازم يعمل الفحص ده بنفسه، وسهل جدًا واحد منهم ينسى. واختبار «يوزر تاني» هو الطريقة الوحيدة اللي تتأكد بيها إن كل route فاكر، ومش بتعتمد على مراجعة الكود بعينك.`,
            how: R`[[401 Unauthorized]]: مش عارفين انت مين (مفيش توكن، أو غلط، أو خلص). [[403 Forbidden]]: عارفينك، بس الـ role بتاعك مش مسموحله بالعملية دي خالص (يوزر عادي على route أدمن). [[404 Not Found]]: الحاجة دي مش موجودة بالنسبة لك.

ليه 404 مش 403 ليوزر تاني؟ لأن 403 معناها «موجود بس مش بتاعك»، وده بيسرّب معلومة: المهاجم يعرف إن الـ id ده موجود، ويقدر يعد الطلبات أو اليوزرز. لو الـ query نفسها فيها [[userId]] ([[findFirst({ where: { id, userId } })]])، الـ 404 بتطلع لوحدها من غير if زيادة.

و GET مش كفاية: كرر نفس المصفوفة على PATCH و DELETE، لأن غلطة مشهورة إن الـ GET محمي والـ update بيعمل [[update({ where: { id } })]] من غير userId. ولو فيه routes كتير، اعمل الاختبارات بـ [[it.each]] على قايمة من [method, path] عشان متكتبش نفس الكود ٢٠ مرة.

وفي Nest نفس الفكرة بالظبط، والاختبار نفسه بـ supertest (درس «Nest: الاختبارات»).`,
            when: "كل route فيه :id أو بيرجّع داتا خاصة بيوزر. ده من أهم الاختبارات في المشروع كله، وأولى من اختبارات كتير تانية.",
            mistakes: R`اختبار الصلاحيات بيوزر واحد بس (صاحب الحاجة)، فالاختبار ينجح والـ IDOR موجود. أو ترجّع 403 ليوزر تاني فتسرّب إن الحاجة موجودة. أو 403 للتوكن الغلط بدل 401، فالواجهة متعرفش إنها لازم تعمل refresh أو تودّي على login. وفي الانترفيو: «الفرق بين 401 و 403؟» قول الفرق، وقول ليه بترجّع 404 لحاجة يوزر تاني.`
          },
          teach: R`## ٤ اختبارات = ٤ أسئلة عن نفس الـ route

المثال [[describe]] واحد لـ [[GET /api/orders/:id]] جواه ٤ حالات: مين انت؟ (401)، صاحب الحاجة (200)، حد تاني (404)، و role مش كفاية (403). كل حالة بتعمل اليوزرين والطلب بتوعها بالـ factories، وبتبعت طلب، وبتتأكد من الـ status.

اتشغّل على ويندوز 11 بـ Node 24.19 و vitest 5.0.3 و supertest 7.3.1، على Postgres 16 في Docker. الـ routes بتاعة الطلبات في التجربة: [[GET]] بيعمل [[findFirst({ where: { id, userId } })]]، و [[PATCH]] بيعمل [[updateMany]] بنفس الشرط، و [[DELETE]] عليه [[requireRole("ADMIN")]]. والأخطاء بترجع [[{ error: "..." }]] من الـ error handler.

---

## ١. [[401 without a token]]

~~~javascript
expect((await request(app).get("/api/orders/anything")).status).toBe(401);
~~~

من جوه لبرة: [[request(app).get(...)]] طلب من غير [[Authorization]]، و [[await]] يبعته، والأقواس حوالين الاتنين عشان ناخد [[.status]] من الرد، و [[expect(...).toBe(401)]].

الـ id هنا [["anything"]] مش id حقيقي: [[requireAuth]] بيوقف الطلب قبل ما حد يدوّر في القاعدة، فمش فارق. الرد كان [[{"error":"Login required"}]].

---

## ٢. [[200 for the owner]]

~~~javascript
const a = await createUser();
const order = await createOrder(a);
const res = await request(app).get($__bt/api/orders/$__{order.id}$__bt).set("Authorization", $__btBearer $__{a.token}$__bt);
expect(res.status).toBe(200);
~~~

يوزر [[a]] عنده طلب، وبيطلبه بتوكنه. ده «الطريق السعيد»، ولازم يبقى موجود: من غيره ممكن الـ route يرجّع 404 لكل الناس وكل اختبارات الرفض تنجح.

---

## ٣. [[404 for another user]]: أهم واحد

~~~javascript
const [a, b] = [await createUser(), await createUser()];
const order = await createOrder(a);
const res = await request(app).get($__bt/api/orders/$__{order.id}$__bt).set("Authorization", $__btBearer $__{b.token}$__bt);
expect(res.status).toBe(404);
~~~

- [[const [a, b] = ...]]: على اليمين array فيه يوزرين، والـ destructuring بيحطهم في [[a]] و [[b]]. الـ [[await]] جوه الـ array بيتنفذوا بالترتيب.
- الطلب بتاع [[a]]، والتوكن بتاع [[b]].

الـ query فيها [[userId: req.user.id]]، فبالنسبة لـ [[b]] مفيش طلب بالـ id ده، و [[findFirst]] بيرجّع [[null]]، والـ route يرمي 404. الرد: [[{"error":"Not found"}]].

---

## ٤. [[403 for a non-admin on DELETE]]

~~~javascript
expect((await request(app).delete($__bt/api/orders/$__{order.id}$__bt).set("Authorization", $__btBearer $__{a.token}$__bt)).status).toBe(403);
~~~

[[a]] بيحاول يمسح طلبه **هو**. مفيش مشكلة ملكية، بس [[requireRole("ADMIN")]] بيوقفه: انت معروف، بس مش مسموحلك بالعملية دي. الرد: [[{"error":"Forbidden"}]].

---

## ٥. الناتج

~~~bash
npx vitest run tests/perms.test.ts --reporter=verbose
~~~

~~~text الناتج
 ✓ tests/perms.test.ts > GET /api/orders/:id > 401 without a token 119ms
 ✓ tests/perms.test.ts > GET /api/orders/:id > 200 for the owner 91ms
 ✓ tests/perms.test.ts > GET /api/orders/:id > 404 for another user 49ms
 ✓ tests/perms.test.ts > GET /api/orders/:id > 403 for a non-admin on DELETE 42ms
 ✓ tests/perms.test.ts > get by another user is 404 58ms
 ✓ tests/perms.test.ts > patch by another user is 404 54ms
      Tests  6 passed (6)
~~~

آخر سطرين من الـ solCode (تحت).

---

## ٦. «اكسر» الـ route: الـ try

شلت [[userId]] من الـ where في [[GET]] بس، وشغّلت تاني:

~~~text الناتج
 ✓ ... > 401 without a token
 ✓ ... > 200 for the owner
 × ... > 404 for another user
   → expected 200 to be 404 // Object.is equality
 ✓ ... > 403 for a non-admin on DELETE
 × tests/perms.test.ts > get by another user is 404
   → expected 200 to be 404 // Object.is equality
 ✓ tests/perms.test.ts > patch by another user is 404
      Tests  2 failed | 4 passed (6)
~~~

- [[expected 200 to be 404]]: يوزر [[b]] أخد طلب [[a]] بـ 200. ده الـ IDOR بالظبط.
- باقي الاختبارات **نجحت**، حتى الـ 200 والـ 401. يعني لو كان عندك اختبار صاحب الحاجة بس، الثغرة كانت هتعدّي.
- [[patch]] نجح لأني مكسرتهوش: كل route ليه شرطه، فكل route محتاج اختباره.

---

## ٧. الـ solCode: [[it.each]]

~~~javascript
it.each([
  ["get", (id) => $__bt/api/orders/$__{id}$__bt],
  ["patch", (id) => $__bt/api/orders/$__{id}$__bt],
])("%s by another user is 404", async (method, path) => { ... });
~~~

- [[it.each(table)]]: نفس الاختبار مرة لكل صف. كل صف array، وعناصره بتتبعت كـ parameters للدالة: [[method]] و [[path]].
- [[(id) => $__bt/api/orders/$__{id}$__bt]]: دالة بتبني العنوان، لأن الـ id مش معروف غير لما الطلب يتعمل جوه الاختبار.
- [["%s by another user is 404"]]: [[%s]] بتتبدل بأول عنصر في الصف، فالأسماء بقت [[get by another user is 404]] و [[patch by another user is 404]] زي ما شفنا.
- [[request(app)[method](...)]]: الأقواس المربعة بتنادي الدالة اللي اسمها في المتغير، فـ [[request(app)["get"](url)]] هي نفسها [[request(app).get(url)]].
- [[.send({})]]: body فاضي. الـ GET بيتجاهله، والـ PATCH محتاج body.

---

## الخلاصة

| الحالة | مين | المتوقع | بيمسك إيه |
|---|---|---|---|
| من غير توكن | محدش | 401 | route نسي [[requireAuth]] |
| صاحب الحاجة | [[a]] | 200 | الـ route شغال أصلًا |
| يوزر تاني | [[b]] على حاجة [[a]] | 404 | IDOR: ناقص [[userId]] في الـ where |
| role ناقص | [[a]] على DELETE | 403 | route نسي [[requireRole]] |

401 = مش عارفينك، 403 = عارفينك ومش مسموحلك، 404 = الحاجة دي مش موجودة بالنسبة لك.`,
          lines: [
            "مجموعة لـ route واحد.",
            "من غير توكن.",
            "لازم 401.",
            "قفلة.",
            "صاحب الطلب.",
            "يوزر A.",
            "طلب بتاع A.",
            "A بيطلب طلبه.",
            "200.",
            "قفلة.",
            "يوزر تاني.",
            "يوزرين.",
            "الطلب بتاع A.",
            "B بيطلب طلب A بالـ id بتاعه.",
            "404: بالنسبة لـ B الطلب مش موجود.",
            "قفلة.",
            "الـ role.",
            "يوزر عادي.",
            "طلبه هو.",
            "حتى على طلبه، المسح للأدمن بس: 403.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`لما تشيل [[userId]] من الـ where، اختبار «404 for another user» لازم يقع ويقول [[expected 200 to be 404]]: يعني B قدر يوصل لطلب A. ده بالظبط الـ bug اللي الاختبار معمول عشانه. رجّع الشرط والاختبار ينجح تاني.

لو الاختبار فضل ناجح وانت شايل الشرط، يبقى الاختبار بيستخدم نفس اليوزر للاتنين، أو بيبعت توكن A في الطلبين. اطبع [[a.id]] و [[b.id]] واتأكد إنهم مختلفين.

وممكن تجمع كل الـ routes اللي فيها ownership في اختبار واحد بـ [[it.each]]، زي الكود. الـ DELETE مش في القايمة لأنه للأدمن بس: يوزر B هيوقف عند [[requireRole]] ويرجع 403 قبل ما نوصل لسؤال «الطلب بتاع مين».`,
          solCode: R`it.each([
  ["get", (id) => $__bt/api/orders/$__{id}$__bt],
  ["patch", (id) => $__bt/api/orders/$__{id}$__bt],
])("%s by another user is 404", async (method, path) => {
  const [a, b] = [await createUser(), await createUser()];
  const order = await createOrder(a);
  const res = await request(app)[method](path(order.id)).set("Authorization", $__btBearer $__{b.token}$__bt).send({});
  expect(res.status).toBe(404);
});`
        },
        {
          cmd: "msw و nock",
          title: "الاختبار ميكلّمش بوابة الدفع ولا خدمة الإيميل الحقيقية",
          desc: R`أي خدمة برّه (الدفع، والإيميل، والـ SMS، و AI) بتعملها mock على مستوى الشبكة: الكود بتاعك بيعمل [[fetch]] عادي، و msw (أو nock) بيمسك الطلب قبل ما يخرج ويرجّع رد انت كاتبه. كده بتختبر الحالة الناجحة، والخدمة واقعة (503)، والرد البطيء، من غير نت ولا فلوس.

وأي طلب لبرّه ملوش handler لازم يفشل الاختبار، عشان محدش يبعت إيميل حقيقي من CI بالغلط.`,
          example: R`import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const pay = setupServer(
  http.post("https://pay.example.com/intentions", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ checkoutUrl: $__bthttps://pay.example.com/c/$__{body.ref}$__bt });
  }),
);
beforeAll(() => pay.listen({
  onUnhandledRequest(req) {
    if (new URL(req.url).hostname !== "127.0.0.1") throw new Error($__btunmocked: $__{req.method} $__{req.url}$__bt);
  },
}));
afterEach(() => pay.resetHandlers());
afterAll(() => pay.close());

it("returns 502 when the payment provider is down", async () => {
  pay.use(http.post("https://pay.example.com/intentions", () => new HttpResponse(null, { status: 503 })));
  const user = await createUser();
  const res = await request(app).post("/api/orders").set("Authorization", $__btBearer $__{user.token}$__bt).send({ amountCents: 5000 });
  expect(res.status).toBe(502);
});`,
          try: R`[[npm i -D msw@2]] (الكود هنا على msw 2)، واعمل handler لخدمة الإيميل اللي بتستخدمها (مثلًا [[POST https://api.resend.com/emails]]) بيحفظ الـ body في array. اختبر إن «نسيت الباسورد» بتبعت إيميل واحد للعنوان الصح وفيه لينك. وبعدين شيل الـ handler وشوف الاختبار بيقع بـ «unmocked».`,
          flag: "script",
          deep: {
            why: R`اختبار بيكلّم Paymob أو Resend الحقيقيين بطيء، ومحتاج مفاتيح في CI، وبيفشل لما خدمتهم تهنّج، وممكن يبعت إيميلات لناس حقيقيين. والأهم: مش هتقدر تجرّب «البوابة رجّعت 503» أو «الرد اتأخر ١٠ ثواني»، ودي بالظبط الحالات اللي الكود بتاعك لازم يتعامل معاها صح.`,
            how: R`msw بيركّب interceptor على [[fetch]] و [[http]] في Node. أي طلب بيطلع بيتقارن بالـ handlers: [[http.post(url, resolver)]]. لو فيه match، الـ resolver بيرجّع [[HttpResponse.json(...)]] والطلب عمره ما بيخرج. و [[pay.use(...)]] جوه اختبار واحد بيضيف handler مؤقت يغلب الأساسي (زي «البوابة واقعة»)، و [[resetHandlers()]] بعد كل اختبار بيشيله.

تفصيلة مهمة جربناها: supertest نفسه بيبعت طلب HTTP للـ app على [[127.0.0.1]]، و msw بيشوف الطلب ده كمان. لو كتبت [[onUnhandledRequest: "error"]] كل اختبارات supertest هتقع. عشان كده الدالة: سيب الـ localhost يعدّي، وأي حاجة تانية [[throw]]. ولاحظ إن [[print.error()]] جوه الدالة في msw 2 بيطبع رسالة بس ومبيوقفش الطلب، فالـ throw هو اللي بيضمن إن الطلب ميخرجش (msw بيرجّعله 500 فيه الرسالة). وخد بالك: msw 3 (نزل آخر سبتمبر 2026) غيّر اسم الخيار لـ [[onUnhandledFrame]] بشكل callback مختلف، والخيار القديم بيتجاهله من غير أي خطأ، فالطلبات بتخرج للنت عادي. عشان كده الدرس مثبّت على msw 2، ولو رقّيت راجع الـ migration guide.

nock بيعمل نفس الفكرة بأسلوب تاني: [[nock("https://api.resend.com").post("/emails").reply(200, { id: "em_1" })]]، و [[nock.disableNetConnect()]] مع [[nock.enableNetConnect("127.0.0.1")]] بيقفل أي طلب تاني. من nock 14 بقى بيمسك [[fetch]] كمان. و [[scope.isDone()]] بيقولك الطلب المتوقع اتبعت ولا لأ.

والبديل التالت: الكود ياخد الـ client كـ dependency ([[createApp({ mailer })]]) وتدّيله fake في الاختبار. أبسط للحاجات اللي انت عاملها wrapper، بس مش بيختبر شكل الطلب الحقيقي اللي بيطلع.`,
            when: "أي كود بيكلّم خدمة برّه. الـ msw نفسه بيتستخدم في الواجهة (React) لنفس الغرض، فلو فريقك بيستخدمه هناك خليه نفس الأداة.",
            mistakes: R`[[vi.mock("node-fetch")]] أو mock لدالة داخلية بدل الشبكة: الاختبار بيختبر الـ mock مش الكود. ونسيان [[resetHandlers]] فالـ handler الـ «واقع» يعدّي على الاختبار اللي بعده. و [[onUnhandledRequest: "bypass"]] فطلب ملوش handler يخرج للنت الحقيقي من غير ما حد ياخد باله. وmock بيرجّع شكل رد مختلف عن الخدمة الحقيقية: خد شكل الرد من الـ docs أو من لوج طلب حقيقي، مش من خيالك.`
          },
          teach: R`## سيرفر «وهمي» جوه نفس الـ process بيرد مكان بوابة الدفع

الكود بتاعك بيعمل [[fetch("https://pay.example.com/intentions")]] عادي جدًا. msw بيركّب نفسه على [[fetch]] و [[http]] في Node، فالطلب قبل ما يخرج بيتقارن بقايمة handlers. لو فيه handler للعنوان ده، الـ handler بيرد والطلب عمره ما بيخرج للنت.

اتشغّل على ويندوز 11 بـ Node 24.19 و vitest 5.0.3 و supertest 7.3.1 و msw 2.15.0 و nock 15.0.1، على Postgres 16 في Docker. الـ app فيه [[POST /api/orders]] بيعمل الطلب في القاعدة، وبعدين بيبعت [[{ ref: order.id, amountCents }]] للبوابة، ولو ردها مش [[ok]] بيرمي 502، ولو تمام بيحفظ [[checkoutUrl]] ويرد 201.

---

## ١. الـ imports

- [[setupServer]] من [[msw/node]]: نسخة Node (في المتصفح فيه [[setupWorker]] من [[msw/browser]]).
- [[http]] من [[msw]]: بيعمل handlers: [[http.get]] و [[http.post]]...
- [[HttpResponse]]: بيعمل الرد. [[HttpResponse.json(obj)]] رد JSON بـ 200.

---

## ٢. [[const pay = setupServer(handler)]]

~~~javascript
const pay = setupServer(
  http.post("https://pay.example.com/intentions", async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json({ checkoutUrl: $__bthttps://pay.example.com/c/$__{body.ref}$__bt });
  }),
);
~~~

- [[http.post(url, resolver)]]: أي POST للعنوان ده بالظبط يروح للدالة دي (الـ resolver).
- [[async ({ request }) =>]]: msw بيبعت object، والأقواس [[{ request }]] بتطلّع منه الطلب نفسه. [[request]] هنا [[Request]] عادي زي بتاع [[fetch]].
- [[await request.json()]]: اقرا الـ body اللي الكود بتاعك بعته.
- [[return HttpResponse.json({...})]]: رد شكله زي رد البوابة، والـ [[checkoutUrl]] فيه [[body.ref]]، فالاختبار يقدر يتأكد إن الكود بعت الـ id الصح.

[[setupServer]] لسه مش شغال. السطر ده بيجهّز بس.

---

## ٣. الـ hooks

~~~javascript
beforeAll(() => pay.listen({ onUnhandledRequest(req) { ... } }));
afterEach(() => pay.resetHandlers());
afterAll(() => pay.close());
~~~

| الـ hook | بيعمل إيه |
|---|---|
| [[pay.listen(...)]] قبل كل الاختبارات | ركّب الـ interception على [[fetch]] و [[http]] |
| [[pay.resetHandlers()]] بعد كل اختبار | شيل أي handler اتضاف بـ [[pay.use]] جوه اختبار، وارجع للأساسي |
| [[pay.close()]] في الآخر | فك الـ interception |

### [[onUnhandledRequest(req)]]: لو مفيش handler

~~~javascript
onUnhandledRequest(req) {
  if (new URL(req.url).hostname !== "127.0.0.1") throw new Error($__btunmocked: $__{req.method} $__{req.url}$__bt);
}
~~~

- [[new URL(req.url).hostname]]: الـ host من غير بورت ولا مسار.
- ليه [[127.0.0.1]] بيعدّي؟ لأن supertest نفسه بيبعت طلب HTTP للـ app، و msw بيشوفه كمان. طبعت عنوان طلب supertest: [[http://127.0.0.1:50463/health]]، يعني بورت مؤقت على [[127.0.0.1]].
- أي host تاني: [[throw]].

جربت [[fetch("https://api.github.com/zen")]] جوه اختبار من غير handler:

~~~text الناتج
STATUS 500 application/json unmocked: GET https://api.github.com/zen
~~~

الطلب مخرجش. msw رجّع للكود رد 500 فيه رسالة الخطأ. وده اللي هيخلي الاختبار يقع.

وليه مش [[onUnhandledRequest: "error"]] على طول؟ جربتها وطلب supertest لـ [[/health]] نفسه وقع:

~~~text الناتج
[MSW] Error: intercepted a request without a matching request handler:
InternalError: [MSW] Cannot bypass a request when using the "error" strategy for the "onUnhandledRequest" option.
~~~

---

## ٤. الاختبار: [[pay.use(...)]] للحالة دي بس

~~~javascript
pay.use(http.post("https://pay.example.com/intentions", () => new HttpResponse(null, { status: 503 })));
~~~

- [[pay.use(handler)]]: handler مؤقت **قبل** الأساسي، فهو اللي بيرد.
- [[new HttpResponse(null, { status: 503 })]]: رد من غير body، بـ 503 Service Unavailable (الخدمة واقعة).

وبعدين طلب عادي بـ supertest، و [[expect(res.status).toBe(502)]]. 502 Bad Gateway: «السيرفر اللي ورايا رد غلط»، وده المعنى الصح هنا، مش 500 (غلطة عندي) ولا 503.

~~~text الناتج
 ✓ tests/pay.test.ts > returns 502 when the payment provider is down 199ms
 ✓ tests/pay.test.ts > happy path after resetHandlers 73ms
~~~

الاختبار التاني (زوّدته) بيبعت نفس الطلب ورجع 201: [[resetHandlers()]] شال الـ 503 فرجع الـ handler الأساسي.

---

## ٥. الـ solCode: «نسيت الباسورد» بتبعت إيميل واحد

~~~javascript
const sent = [];
const mail = setupServer(
  http.post("https://api.resend.com/emails", async ({ request }) => {
    sent.push(await request.json());
    return HttpResponse.json({ id: "em_1" });
  }),
);
~~~

الـ handler بيحفظ كل body في [[sent]] ويرد زي Resend. والـ route بتاع [[/api/auth/forgot]] في التجربة بيبعت لـ Resend بـ [[fetch]]. اللي اتحفظ:

~~~text الناتج
SENT [
  {
    from: 'MyApp <hello@example.com>',
    to: [ 'user1@test.local' ],
    subject: 'Reset your password',
    html: '<a href="https://myapp.example.com/reset?token=28fe26fac430d40e7bdb83857274f634">Reset</a>'
  }
]
      Tests  1 passed (1)
~~~

والتأكيدات: [[toHaveLength(1)]] إيميل واحد بس، و [[sent[0].to]] فيه إيميل اليوزر ([[toContain]] لأن [[to]] array)، و [[toMatch(/reset\?token=/)]] regex: [[\?]] لأن [[?]] لوحدها ليها معنى في الـ regex.

ولما غيّرت عنوان الـ handler (كأنه مش موجود):

~~~text الناتج
stderr | dbg/forgot2.test.ts > forgot password sends one email
email failed 500
 FAIL  dbg/forgot2.test.ts > forgot password sends one email
AssertionError: expected [] to have a length of 1 but got +0
~~~

الطلب رجعله الـ 500 بتاع [[unmocked]]، والـ route سجّل [[email failed 500]]، والإيميل مخرجش.

---

## ٦. نفس الفكرة بـ nock

~~~javascript
nock.disableNetConnect(); nock.enableNetConnect("127.0.0.1");
const scope = nock("https://api.resend.com").post("/emails").reply(200, { id: "em_1" });
// ... الطلب ...
expect(scope.isDone()).toBe(true);
~~~

- [[disableNetConnect()]]: أي طلب لبرّه يفشل، و [[enableNetConnect("127.0.0.1")]] استثناء لـ supertest.
- [[nock(host).post(path).reply(status, body)]]: رد على طلب واحد بالشكل ده.
- [[scope.isDone()]]: [[true]] لو الطلب المتوقع اتبعت فعلًا.

الاختبار نجح بـ nock 15 (يعني بيمسك [[fetch]])، وطلب لـ GitHub من غير رد اتقفل:

~~~text الناتج
TypeError: fetch failed NetConnectNotAllowedError: Nock: Disallowed net connect for "api.github.com:443/zen"
~~~

الفرق: msw رجّع 500 للكود، و nock خلّى [[fetch]] نفسها ترمي.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[setupServer(http.post(url, fn))]] | رد جاهز لعنوان معين |
| [[listen]] / [[resetHandlers]] / [[close]] | ركّب، ونضّف بعد كل اختبار، وفك |
| [[onUnhandledRequest(req)]] + [[throw]] | سيب [[127.0.0.1]] لـ supertest، وامنع أي حاجة تانية |
| [[pay.use(...)]] | سيناريو لاختبار واحد (الخدمة واقعة) |
| [[sent.push(...)]] | احفظ اللي اتبعت واتأكد منه |

والمثال مكتوب لـ msw 2 ([[npm i -D msw@2]]). آخر نسخة على npm دلوقتي 3.0.2، وجربت عليها نفس [[onUnhandledRequest(req) { throw ... }]] في سكربت لوحده: الدالة اتجاهلت، و msw طبع تحذير بس، والطلب **خرج فعلًا** لـ GitHub ورجع [[200 text/plain]]. ده بالظبط الكلام اللي في الـ deep: من غير ما تغيّر للخيار الجديد، الحماية بتختفي من غير أي خطأ.`,
          lines: [
            "سيرفر msw للـ Node.",
            "أدوات تعريف الـ handlers والردود.",
            "سيرفر وهمي لبوابة الدفع.",
            "أي POST للعنوان ده...",
            "...اقرا الـ body اللي الكود بعته...",
            "...ورجّع رد شكله زي رد البوابة، فيه رقم الطلب.",
            "قفلة الـ handler.",
            "قفلة.",
            "قبل الاختبارات شغّل الـ interception...",
            "...ولأي طلب ملوش handler:",
            "لو مش طلب supertest للـ app على localhost، ارمي خطأ فالطلب ميخرجش.",
            "قفلة.",
            "قفلة.",
            "بعد كل اختبار شيل أي handler مؤقت.",
            "في الآخر اقفل.",
            "اختبار «البوابة واقعة».",
            "handler مؤقت للاختبار ده بس: 503.",
            "يوزر.",
            "اعمل طلب.",
            "الـ API لازم يرد 502 واضح، مش 500 ولا يعلّق.",
            "قفلة."
          ],
          sol: R`المتوقع: الاختبار ينجح، والـ array فيها عنصر واحد، الـ [[to]] بتاعه إيميل اليوزر، والـ [[html]] فيه اللينك. ولما تشيل الـ handler، الاختبار بيقع لأن الطلب رجعله 500 فيه [[unmocked: POST https://api.resend.com/emails]]، والإيميل عمره ما خرج.

لو الاختبار نجح والـ array فاضية، يبقى الإيميل بيتبعت بعد ما الرد يرجع (fire and forget) والاختبار خلص قبله: اعمل await للإرسال في الكود، أو استنى في الاختبار بـ [[vi.waitFor]].

ولو شغلك بـ nock بدل msw، نفس الفكرة في الكود التاني.`,
          solCode: R`const sent = [];
const mail = setupServer(
  http.post("https://api.resend.com/emails", async ({ request }) => {
    sent.push(await request.json());
    return HttpResponse.json({ id: "em_1" });
  }),
);
beforeAll(() => mail.listen({ onUnhandledRequest(req) { if (new URL(req.url).hostname !== "127.0.0.1") throw new Error("unmocked: " + req.url); } }));
afterAll(() => mail.close());

it("forgot password sends one email", async () => {
  const user = await createUser();
  const res = await request(app).post("/api/auth/forgot").send({ email: user.email });
  expect(res.status).toBe(200);
  expect(sent).toHaveLength(1);
  expect(sent[0].to).toContain(user.email);
  expect(sent[0].html).toMatch(/reset\?token=/);
});

// نفس الفكرة بـ nock:
// nock.disableNetConnect(); nock.enableNetConnect("127.0.0.1");
// const scope = nock("https://api.resend.com").post("/emails").reply(200, { id: "em_1" });
// ... expect(scope.isDone()).toBe(true);`
        },
        {
          cmd: "اختبار الـ webhook",
          title: "webhook: توقيع صح، وتوقيع غلط، ونفس الحدث مرتين",
          desc: R`الـ webhook ليه ٣ اختبارات لازم تبقى موجودة: توقيع صح فالطلب يتفعّل، وتوقيع غلط فيرجع 401 ومفيش حاجة تتغير في القاعدة، ونفس الحدث يوصل مرتين فالرد 200 في المرتين والأثر يحصل مرة واحدة.

الاختبار بيحسب التوقيع بنفس السر ونفس الطريقة اللي البوابة بتستخدمها، وبيبعت الـ body كنص خام بالظبط زي ما اتوقّع.`,
          example: R`import crypto from "node:crypto";

const sign = (raw) => crypto.createHmac("sha256", "test-whsec").update(raw).digest("hex");
const send = (raw, sig) => request(app).post("/webhooks/pay").set("Content-Type", "application/json").set("X-Signature", sig).send(raw);

it("rejects a bad signature and changes nothing", async () => {
  const order = await createOrder(await createUser());
  const raw = JSON.stringify({ orderId: order.id, txId: "tx_2" });
  expect((await send(raw, sign(raw + "x"))).status).toBe(401);
  expect((await db.order.findUnique({ where: { id: order.id } })).status).toBe("PENDING");
});

it("same event twice = one effect", async () => {
  const order = await createOrder(await createUser());
  const raw = JSON.stringify({ orderId: order.id, txId: "tx_3" });
  expect((await send(raw, sign(raw))).status).toBe(200);
  expect((await send(raw, sign(raw))).status).toBe(200);
  expect(await db.order.count({ where: { gatewayTxId: "tx_3" } })).toBe(1);
});`,
          try: R`اكتب الاختبار التالت الناقص: توقيع صح فالطلب يبقى PAID. وبعدين جرّب تبعت نفس الـ JSON بس بمسافة زيادة ([[JSON.stringify(obj, null, 1)]]) مع التوقيع بتاع النسخة من غير مسافات. المفروض يرجع 401. فكّر ليه، وليه ده معناه إن الـ route لازم يقرا الـ raw body.`,
          flag: "script",
          deep: {
            why: R`الـ webhook هو الـ endpoint اللي بيحوّل «طلب» لـ «مدفوع» (درس [[webhook الدفع]] في «تاب بناء مشروع كامل»). أي غلطة فيه معناها فلوس: يا طلبات بتتفعّل من غير دفع، يا ناس دفعت ومخدتش حاجة، يا اشتراك اتضاف مرتين. والبوابات بتعيد الإرسال لو ماردّتش بسرعة، فالتكرار مش احتمال نظري، ده بيحصل كل يوم.`,
            how: R`التوقيع بيتحسب على البايتات بالظبط. لو الـ route بيعمل [[express.json()]] الأول وبعدين [[JSON.stringify(req.body)]] عشان يحسب، أي فرق في المسافات أو ترتيب المفاتيح هيبوّظ المقارنة. عشان كده الـ route ده بياخد [[express.raw({ type: "application/json" })]] قبل الـ [[express.json()]] العام، ويحسب HMAC على الـ Buffer، ويقارن بـ [[timingSafeEqual]] (بعد ما يتأكد إن الطولين زي بعض، وإلا بيرمي). وفي الاختبار [[.send(raw)]] بنص جاهز عشان supertest ميعيدش التنسيق. (بعض البوابات زي Paymob بتوقّع حقول معينة بترتيب معين مش الـ body كله: شوف درس «التحقق من التوقيع» في تاب «Node و npm».)

التوقيع الغلط: مش كفاية الـ 401، لازم تقرا من القاعدة وتتأكد إن الطلب لسه PENDING. أوقات الكود بيحدّث الأول وبعدين يتحقق.

التكرار: اختبرت الـ idempotency بإنك بعت نفس الحدث مرتين وعدّيت الأثر. الكود بيعملها بـ [[updateMany]] بشرط [[status: { not: "PAID" }]]، و [[gatewayTxId]] عليه [[@unique]] كحارس أخير. والرد 200 في المرة التانية كمان: لو رجّعت 409 أو 500، البوابة هتفتكر إنه فشل وتفضل تعيد.

وحالات تانية تستاهل اختبار لو البوابة بتبعتها: دفعة فاشلة بعد نجاح (لازم يفضل PAID)، ومبلغ مختلف عن مبلغ الطلب (يتسجّل ومفيش تفعيل)، وطلب مش موجود (200 ومفيش crash).`,
            when: "أي webhook: دفع، أو اشتراكات، أو GitHub، أو تيليجرام. ولو بتستقبل الحدث وتحطه في queue، اختبر الـ route (توقيع و 200 سريعة) والـ worker (idempotent) كل واحد لوحده.",
            mistakes: R`اختبار التوقيع الصح بس، فمحدش اكتشف إن الكود بيقبل أي توقيع طوله صح. أو حساب التوقيع على [[JSON.stringify(req.body)]] بعد الـ parse. أو اختبار التكرار بإنك تبعت حدثين مختلفين. ونسيان إن الـ webhook route لازم يبقى قبل [[express.json()]] العام وإلا [[req.body]] يوصله object مش Buffer. وفي الانترفيو: «إزاي تتأكد إن الـ webhook مش بيتعالج مرتين؟» الإجابة: شرط على الحالة، و unique على id المعاملة، ورد 200 للتكرار.`
          },
          teach: R`## دالتين مساعدين، واختبارين بيقروا من القاعدة

[[sign(raw)]] بتحسب التوقيع زي ما البوابة بتحسبه، و [[send(raw, sig)]] بتبعت الحدث للـ webhook كنص خام ومعاه التوقيع. وبعدين كل اختبار بيبعت، ويتأكد من الـ status، **ويقرا من القاعدة** يشوف إيه اللي اتغير فعلًا.

اتشغّل على ويندوز 11 بـ Node 24.19 و vitest 5.0.3 و supertest 7.3.1، على Postgres 16 في Docker. الـ route في التجربة [[POST /webhooks/pay]] متركّب قبل [[express.json()]] العام، وبياخد [[express.raw({ type: "application/json" })]]، ويحسب HMAC على الـ Buffer بالسر [[WEBHOOK_SECRET]] ([["test-whsec"]] في vitest.config)، ويقارن بـ [[timingSafeEqual]]، وبعدين [[updateMany]] بشرط [[status: { not: "PAID" }]]، و [[gatewayTxId]] عليه [[@unique]].

---

## ١. [[const sign = (raw) => crypto.createHmac("sha256", "test-whsec").update(raw).digest("hex")]]

من الشمال لليمين:

| الحتة | بتعمل إيه |
|---|---|
| [[crypto.createHmac("sha256", "test-whsec")]] | جهّز HMAC بخوارزمية SHA-256 والسر ده |
| [[.update(raw)]] | ده النص اللي هيتوقّع |
| [[.digest("hex")]] | خلّص واطلع النتيجة hex (أرقام وحروف من 0 لـ f) |

HMAC = Hash-based Message Authentication Code: بصمة للنص محدش يقدر يعملها غير اللي معاه السر. والسر هنا لازم يبقى **نفس** السر اللي الـ app شايفه في الاختبار، وإلا كل التوقيعات هتطلع غلط.

طبعت التوقيع لنص واحد وتعديلات صغيرة عليه:

~~~text الناتج
raw: {"orderId":"ord_1","txId":"tx_1"}
sign(raw):     5c664fe0b95351ea926e4646129e0b50f92b028516ccd4f50529d23ce2999d30
sign(raw+x):   91078c6f3d6ff91a3077f8d1fe998e1527ada18c09688933f5096845608fde16
sign(pretty):  2f99927bf27dc3a92844abda215dd112f040190ff8a4d39ee90c2415bf5f9f42
~~~

٦٤ حرف hex = 32 بايت = 256 بت (عشان كده SHA-256). وحرف [[x]] زيادة، أو مسافات زيادة، بيطلّعوا بصمة مختلفة خالص.

---

## ٢. [[const send = (raw, sig) => request(app).post("/webhooks/pay").set(...).set(...).send(raw)]]

- [[.set("Content-Type", "application/json")]]: لازم نقولها بنفسنا. جربت: [[.send(object)]] بيحط [[application/json]]، لكن [[.send(string)]] من غير [[.set]] بيحط [[application/x-www-form-urlencoded]] (نوع الفورم العادي). ومن غير النوع الصح [[express.raw({ type: "application/json" })]] مش هيقرا الـ body.
- [[.set("X-Signature", sig)]]: التوقيع في header، زي ما البوابة بتبعته.
- [[.send(raw)]]: النص زي ما هو. لو بعتنا object، supertest هيعمله [[JSON.stringify]] بطريقته، والتوقيع لازم يتحسب على نفس البايتات بالظبط.
- مفيش [[await]] هنا: الدالة بترجّع الطلب، والاختبار هو اللي يعمل [[await send(...)]].

---

## ٣. [[rejects a bad signature and changes nothing]]

~~~javascript
const order = await createOrder(await createUser());
const raw = JSON.stringify({ orderId: order.id, txId: "tx_2" });
expect((await send(raw, sign(raw + "x"))).status).toBe(401);
expect((await db.order.findUnique({ where: { id: order.id } })).status).toBe("PENDING");
~~~

- [[sign(raw + "x")]]: توقيع صح لنص **تاني**. يعني توقيع شكله سليم وطوله صح، بس مش بتاع الحدث ده.
- الرد كان [[401 { error: 'Bad signature' }]].
- السطر الأخير بيقرا الطلب من القاعدة: لسه [[PENDING]]. الـ 401 لوحده مش كفاية لو الكود حدّث الأول وبعدين رفض.

وتوقيع طوله غلط ([["abc"]]) رجع نفس الـ 401. ده مهم لأن [[crypto.timingSafeEqual]] بيرمي لو الطولين مختلفين:

~~~text الناتج
ERR_CRYPTO_TIMING_SAFE_EQUAL_LENGTH Input buffers must have the same byte length
~~~

فالـ route لازم يقارن الطول الأول، وإلا التوقيع القصير يبقى 500 بدل 401.

---

## ٤. [[same event twice = one effect]]

~~~javascript
expect((await send(raw, sign(raw))).status).toBe(200);
expect((await send(raw, sign(raw))).status).toBe(200);
expect(await db.order.count({ where: { gatewayTxId: "tx_3" } })).toBe(1);
~~~

نفس الحدث بالحرف مرتين، زي ما البوابة بتعمل لو ردك اتأخر:

~~~text الناتج
1st: 200 { received: true } 2nd: 200 { received: true }
{ id: 'cmuxujttf0004i4ieqfnjjis4', userId: 1, amountCents: 5000, status: 'PAID', checkoutUrl: null, gatewayTxId: 'tx_5' }
~~~

- المرة التانية 200 كمان: لو رجّعت خطأ، البوابة هتفضل تعيد.
- [[db.order.count({ where: { gatewayTxId } })]] = 1: الأثر حصل مرة واحدة. في المرة التانية الشرط [[status: { not: "PAID" }]] مطابقش أي صف، فـ [[updateMany]] عدّل صفر.

---

## ٥. الـ solCode

### [[marks the order PAID with a valid signature]]

توقيع صح، و 200، و [[toMatchObject({ status: "PAID", gatewayTxId: "tx_1" })]] على الصف اللي في القاعدة.

### [[pretty JSON with the compact signature is rejected]]

~~~javascript
const obj = { orderId: order.id, txId: "tx_9" };
expect((await send(JSON.stringify(obj, null, 1), sign(JSON.stringify(obj)))).status).toBe(401);
~~~

[[JSON.stringify(obj, null, 1)]]: التالت هو عدد مسافات الإزاحة، فبيطلع:

~~~text الناتج
{
 "orderId": "ord_1",
 "txId": "tx_1"
}
~~~

نفس الداتا، بايتات مختلفة. التوقيع اتحسب على النسخة المضغوطة، والـ route حسب على اللي وصل فعلًا (المفرودة)، فـ 401. ولو الـ route كان بيحسب على [[JSON.stringify(req.body)]] بعد الـ parse، كان هيرجّع النسخة المضغوطة ويقبل. جربت الحسبة دي لوحدها: [[sign(JSON.stringify(JSON.parse(pretty))) === sign(compact)]] طلعت [[true]]. يعني الـ route الغلط بيوافق على بايتات البوابة مبعتتهاش، وبيرفض بوابة بتبعت JSON مفرود حقيقي.

~~~text الناتج
 ✓ tests/webhook.test.ts > rejects a bad signature and changes nothing 195ms
 ✓ tests/webhook.test.ts > same event twice = one effect 73ms
 ✓ tests/webhook.test.ts > marks the order PAID with a valid signature 56ms
 ✓ tests/webhook.test.ts > pretty JSON with the compact signature is rejected 48ms
~~~

---

## الخلاصة

| الاختبار | بيبعت | المتوقع | ومن القاعدة |
|---|---|---|---|
| توقيع صح | [[sign(raw)]] | 200 | [[PAID]] و [[gatewayTxId]] |
| توقيع غلط | [[sign(raw + "x")]] | 401 | لسه [[PENDING]] |
| نفس الحدث مرتين | [[sign(raw)]] × 2 | 200 و 200 | صف واحد بالـ [[txId]] ده |
| JSON مفرود بتوقيع المضغوط | بايتات مختلفة | 401 | الـ route بيحسب على الـ raw body |

والقاعدة: [[.send(raw)]] نص جاهز و [[Content-Type]] بإيدك، والسر نفس سر الـ app.`,
          lines: [
            "crypto من Node.",
            "دالة بتحسب التوقيع بنفس سر الاختبار ونفس الخوارزمية اللي الـ route بيستخدمها.",
            "دالة بتبعت نص خام بالتوقيع في header.",
            "توقيع غلط.",
            "طلب لسه PENDING.",
            "الحدث كنص.",
            "توقيع لنص تاني: لازم 401.",
            "واقرا من القاعدة: الطلب متغيّرش.",
            "قفلة.",
            "نفس الحدث مرتين.",
            "طلب.",
            "حدث واحد.",
            "المرة الأولى 200.",
            "والتانية 200 برضه، عشان البوابة تبطّل تعيد.",
            "والأثر حصل مرة واحدة بس.",
            "قفلة."
          ],
          sol: R`الاختبار الناقص: توقيع صح، والرد 200، والطلب في القاعدة بقى [[PAID]] و [[gatewayTxId]] بتاعه [[tx_1]].

ونسخة الـ JSON بالمسافات بترجع 401 لأن التوقيع اتحسب على نص تاني، والـ HMAC بيتغير لو اتغيّر بايت واحد. البوابة بتوقّع البايتات اللي بعتتها بالظبط، فانت لازم تحسب على نفس البايتات اللي وصلت (الـ raw body)، مش على object عملتله parse وبعدين stringify.

لو النسخة بالمسافات عدّت، يبقى الـ route بيحسب على [[JSON.stringify(req.body)]]، وده هيقع مع أول بوابة بتبعت JSON بتنسيق مختلف عن بتاع Node.`,
          solCode: R`it("marks the order PAID with a valid signature", async () => {
  const order = await createOrder(await createUser());
  const raw = JSON.stringify({ orderId: order.id, txId: "tx_1" });
  expect((await send(raw, sign(raw))).status).toBe(200);
  const saved = await db.order.findUnique({ where: { id: order.id } });
  expect(saved).toMatchObject({ status: "PAID", gatewayTxId: "tx_1" });
});

it("pretty JSON with the compact signature is rejected", async () => {
  const order = await createOrder(await createUser());
  const obj = { orderId: order.id, txId: "tx_9" };
  expect((await send(JSON.stringify(obj, null, 1), sign(JSON.stringify(obj)))).status).toBe(401);
});`
        }
      ]
    }
]);
