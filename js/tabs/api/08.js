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
    }
]);
