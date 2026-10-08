// تكملة تاب arch: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/arch/01.js (شرح حقول الدرس في أوله)
MORE("arch", [
    {
      t: "الملفات والـ realtime والإشعارات",
      l: 2,
      n: "الملفات مبتعدّيش على سيرفرك، والمستخدم يعرف اللي حصل لحظتها أو على إيميله أو موبايله",
      items: [
        {
          cmd: "signed upload URL",
          title: "رفع الملفات من غير ما تعدّي على سيرفرك",
          desc: R`الرفع على ٣ خطوات. الأول، الواجهة بتسأل السيرفر «عايز أرفع صورة نوعها كذا وحجمها كذا»، والسيرفر يتأكد من الصلاحية والنوع والحجم، ويرجّع رابط موقّع (presigned URL) عمره ٥ دقايق. التاني، المتصفح بيرفع الملف مباشرة على S3 أو R2 بـ PUT. التالت، الواجهة بتبلّغ السيرفر بالـ key، والسيرفر يربطه بالكورس.

الملف نفسه عمره ما بيعدّي على الـ API.`,
          example: R`import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: config.S3_REGION, requestChecksumCalculation: "WHEN_REQUIRED" });
const Upload = z.object({ type: z.enum(["image/jpeg", "image/png", "image/webp"]), size: z.number().int().max(5_000_000) });

router.post("/uploads/cover", requireAuth, requireRole("INSTRUCTOR", "ADMIN"), async (req, res) => {
  const { type } = Upload.parse(req.body);
  const key = $__btcovers/$__{req.user.id}/$__{crypto.randomUUID()}.$__{type.split("/")[1]}$__bt;
  const url = await getSignedUrl(s3, new PutObjectCommand({ Bucket: config.S3_BUCKET, Key: key, ContentType: type }), { expiresIn: 300, signableHeaders: new Set(["content-type"]) });
  res.json({ data: { url, key } });
});`,
          try: R`اطلب رابط، وارفع عليه صورة من المتصفح: [[fetch(url, { method: "PUT", body: file, headers: { "Content-Type": file.type } })]]. بعدين جرّب ترفع بنفس الرابط بعد ٦ دقايق (هيرفض)، وبـ Content-Type مختلف عن اللي اتوقّع (هيرفض برضه). وقبل كل ده لازم تظبط CORS على الـ bucket.`,
          flag: "script",
          deep: {
            why: "لو الملف بيعدّي على Express، كل رفع بياكل رام وCPU وباندويث من السيرفر اللي بيرد على كل الناس. فيديو ٥٠٠ ميجا ممكن يخلي السيرفر يقع، أو يوصل لحد Nginx ([[client_max_body_size]]) أو الـ timeout.",
            how: R`الرابط الموقّع جواه توقيع بمفاتيحك على حاجات محددة: الـ bucket، والـ key، والـ method، والـ Content-Type، ومدة الصلاحية. أي تغيير في أي واحدة منهم، التوقيع بيبقى غلط وS3 بترفض. يعني انت بتدّي إذن لملف واحد، في مكان واحد، لمدة ٥ دقايق. بس الـ SDK مبيوقّعش الـ Content-Type افتراضيًا، عشان كده بنضيف [[signableHeaders]] في المثال.

الـ key بيتعمل على السيرفر: فولدر المستخدم، واسم عشوائي، والامتداد من النوع المسموح. متستخدمش اسم الملف الأصلي، عشان متتعرضش لـ path traversal أو لملف يكتب فوق ملف تاني.

بس خلي بالك: الـ presigned PUT مبيقفلش الحجم. الـ [[size]] اللي الواجهة بتبعته مجرد كلام. عشان تفرض حد حقيقي، إما تستخدم presigned POST ([[createPresignedPost]] من [[@aws-sdk/s3-presigned-post]]) بشرط [[content-length-range]]، أو تعمل [[HeadObject]] في خطوة التأكيد وتمسح الملف لو كبير. وفي خطوة التأكيد كمان، اتأكد إن الـ key بيبدأ بـ [[covers/<userId>/]]، عشان محدش يربط ملف حد تاني.

والـ bucket يبقى private افتراضيًا. القراية تبقى بروابط GET موقّعة قصيرة، أو من CDN. والصور العامة بس (زي أغلفة الكورسات) ممكن تبقى public.

وفي Supabase Storage، نفس الفكرة: [[createSignedUploadUrl(path)]] على السيرفر، وبعدين [[uploadToSignedUrl(path, token, file)]] من الواجهة. والرابط صالح ساعتين. والفيديو قصة لوحده: استخدم خدمة فيديو (Bunny Stream، أو Cloudflare Stream، أو Mux)، بتحوّله HLS وبتحميه بتوكنات. والملفات الكبيرة جدًا بتترفع multipart أو resumable. والملفات اللي اترفعت ومحدش ربطها بحاجة، امسحها بـ lifecycle rule بعد يوم.`,
            when: "أي رفع أكبر من صورة بروفايل صغيرة، وأي منتج فيه فيديو أو PDF.",
            mistakes: R`في مشروع حقيقي، الرفع كان بـ multer و [[memoryStorage]]، وحد أقصى ١٠٠ ميجا للصور و ٥٠٠ للـ PDF. يعني الملف كله بيتحمّل في الرام، وكام رفع مع بعض كفاية يوقّعوا السيرفر. وفي مشروع تاني، route رفع الأدمن مكانش فيه قايمة أنواع مسموحة، والـ bucket كان public. ملف HTML أو SVG هناك ممكن يشغّل JavaScript على الدومين بتاعك. ومن الغلطات كمان: إنك تصدّق الـ Content-Type أو الامتداد اللي جاي من الـ client. أو تسيب bucket public فيه ملفات مدفوعة.`
          },
          teach: R`## السيرفر بيدّي «إذن» لملف واحد، والمتصفح بيرفع على S3 مباشرة

الـ route بيتأكد من الصلاحية والنوع والحجم، ويعمل key عشوائي، ويرجّع رابط PUT موقّع عمره ٥ دقايق. جربناه بـ AWS SDK v3 ([[@aws-sdk/client-s3]] 3.1147) على Node 24 (ويندوز 11) قصاد LocalStack 4.9 في Docker (S3 وهمي على الجهاز، وشغّلناه بـ [[S3_SKIP_SIGNATURE_VALIDATION=0]] عشان يتحقق من التوقيعات زي S3 الحقيقي). الفرق الوحيد في التجربة إن العميل فيه [[endpoint: "http://localhost:6022"]] و [[forcePathStyle: true]] ومفاتيح [[test]].

---

## ١. الـ imports

- [[S3Client]]: العميل اللي بيكلّم S3. و [[PutObjectCommand]]: أمر «حط ملف».
- [[getSignedUrl]] من [[@aws-sdk/s3-request-presigner]]: بدل ما تبعت الأمر، بتاخد منه **رابط** موقّع حد تاني يقدر ينفّذه.

---

## ٢. [[new S3Client({ region: config.S3_REGION, requestChecksumCalculation: "WHEN_REQUIRED" })]]

- [[region]]: المنطقة اللي فيها الـ bucket (زي [[eu-central-1]]). والمفاتيح بيقراها لوحده من متغيرات البيئة ([[AWS_ACCESS_KEY_ID]] و [[AWS_SECRET_ACCESS_KEY]]) أو من IAM role على السيرفر.
- [[requestChecksumCalculation: "WHEN_REQUIRED"]]: النسخ الجديدة من الـ SDK بتحسب checksum للـ body افتراضيًا. بس وقت عمل الرابط مفيش ملف، فبيحط checksum لملف **فاضي**. عملنا رابط من عميل من غير الخيار ده:

~~~text الناتج
x-amz-checksum-crc32 = AAAAAA==      ← CRC32 لـ 0 byte
~~~

S3 الحقيقي بيرفض أي ملف مش فاضي على الرابط ده لأن الـ checksum مش مطابق (LocalStack عدّاه، فالجزء ده من وثائق AWS). [[WHEN_REQUIRED]] بتشيله.

---

## ٣. [[const Upload = z.object({ type: z.enum([...]), size: z.number().int().max(5_000_000) })]]

- [[z.enum]]: ٣ أنواع صور بس. SVG مش منهم عن قصد: ملف SVG ممكن يبقى جواه JavaScript.
- [[size]]: رقم صحيح لحد ٥ مليون byte (حوالي ٥ ميجا).

~~~text الناتج
validation: 400 400 student: 403
~~~

[[image/svg+xml]] → 400، و ٩ ميجا → 400، وطالب (مش INSTRUCTOR ولا ADMIN) → 403 من [[requireRole]].

---

## ٤. [[const key = $__btcovers/$__{req.user.id}/$__{crypto.randomUUID()}.$__{type.split("/")[1]}$__bt]]

مكان الملف في الـ bucket، متركّب على السيرفر من ٣ حتت:

1. [[req.user.id]]: فولدر لكل مستخدم.
2. [[crypto.randomUUID()]]: اسم عشوائي (UUID = ٣٦ حرف مستحيل يتكرر).
3. [[type.split("/")[1]]]: [["image/webp".split("/")]] بتدّي [[["image", "webp"]]]، والعنصر رقم ١ هو الامتداد.

~~~text الناتج
covers/u_inst/1c65bc26-1990-4b13-aefd-90a1289d0678.webp
~~~

اسم الملف الأصلي مش داخل خالص، فمفيش [[../]] ولا ملف يكتب فوق ملف تاني.

---

## ٥. [[getSignedUrl(s3, new PutObjectCommand({ Bucket, Key: key, ContentType: type }), { expiresIn: 300, signableHeaders: new Set(["content-type"]) })]]

من جوه لبرة:

1. [[new PutObjectCommand({...})]]: أمر رفع للـ bucket ده، بالـ key ده، بالنوع ده.
2. [[expiresIn: 300]]: ٣٠٠ ثانية = ٥ دقايق.
3. [[signableHeaders: new Set(["content-type"])]]: دخّل header الـ Content-Type في التوقيع. [[Set]] مجموعة قيم من غير تكرار، والـ SDK عايزها بالشكل ده.
4. [[getSignedUrl]]: يحسب التوقيع بالمفتاح السري ويرجّع رابط.

فكّينا الرابط اللي رجع:

~~~text الناتج
http://localhost:6022/myapp-uploads/covers/u_inst/1c65bc26-....webp
   X-Amz-Algorithm = AWS4-HMAC-SHA256
   X-Amz-Content-Sha256 = UNSIGNED-PAYLOAD
   X-Amz-Credential = test/20261008/us-east-1/s3/aws4_request
   X-Amz-Date = 20261008T104759Z
   X-Amz-Expires = 300
   X-Amz-Signature = 092f489453…
   X-Amz-SignedHeaders = content-type;host
   x-id = PutObject
~~~

| الخانة | معناها |
|---|---|
| [[AWS4-HMAC-SHA256]] | طريقة التوقيع (Signature Version 4) |
| [[UNSIGNED-PAYLOAD]] | محتوى الملف نفسه مش داخل في التوقيع (مش معروف لسه) |
| [[X-Amz-Credential]] | مين وقّع: المفتاح العام / التاريخ / المنطقة / الخدمة |
| [[X-Amz-Date]] و [[X-Amz-Expires]] | وقّع إمتى وصالح كام ثانية |
| [[X-Amz-SignedHeaders]] | الـ headers اللي لازم تتبعت زي ما هي: [[content-type]] و [[host]] |
| [[X-Amz-Signature]] | التوقيع نفسه |

من غير [[signableHeaders]] الخانة دي بتبقى [[host]] بس، وجربنا: رفعنا png على رابط اتعمل لـ webp ونجح [[200]].

---

## ٦. الرفع على الرابط

~~~text الناتج
correct              200
HEAD: {"ContentType":"image/webp","ContentLength":15}
wrong type           403 SignatureDoesNotMatch The request signature we calculated does not match the signature you provided...
expired              403 AccessDenied Request has expired
6MB on size:10       200
~~~

- [[correct]]: PUT بنفس النوع → 200، و [[HeadObject]] بيأكد إن الملف موجود بالنوع ده.
- [[wrong type]]: [[image/png]] على رابط webp → التوقيع مش مطابق.
- [[expired]]: عملنا رابط بـ [[expiresIn: 1]] واستنينا ٢.٥ ثانية.
- [[6MB on size:10]]: طلبنا الرابط بـ [[size: 10]] ورفعنا ٦ ميجا، ونجح. ده اللي الـ [[deep]] بيقوله: الـ presigned PUT مبيقفلش الحجم، فاتأكد بـ [[HeadObject]] في خطوة التأكيد أو استخدم presigned POST.

---

## ٧. الـ solCode: الواجهة و CORS

في الواجهة: [[input.files[0]]] الملف اللي اختاره المستخدم، و [[file.type]] و [[file.size]] بيتبعتوا للسيرفر، وبعدين [[fetch(url, { method: "PUT", body: file, headers: { "Content-Type": file.type } })]].

المتصفح مش هيرفع على دومين تاني غير لو الـ bucket سامح بـ CORS. حطينا قاعدة الـ solCode على LocalStack وبعتنا الـ preflight (طلب [[OPTIONS]] اللي المتصفح بيبعته قبل الـ PUT):

~~~text الناتج
http://localhost:3000 200 access-control-allow-origin: http://localhost:3000 | access-control-allow-methods: PUT | access-control-allow-headers: content-type | access-control-max-age: 3000
https://evil.example 403
~~~

[[MaxAgeSeconds: 3000]] يعني المتصفح يفتكر الإذن ده ٥٠ دقيقة من غير ما يسأل تاني.

---

## الخلاصة

| الحماية | فين |
|---|---|
| مين يرفع | [[requireRole("INSTRUCTOR", "ADMIN")]] |
| أنهي أنواع | [[z.enum]] + [[ContentType]] جوه التوقيع |
| فين | الـ key من السيرفر، عشوائي، تحت فولدر المستخدم |
| لحد إمتى | [[expiresIn: 300]] |
| الحجم | **مش مقفول** بالـ PUT: [[HeadObject]] بعدين أو presigned POST |

الملف عمره ما بيعدّي على الـ API.`,
          lines: [
            "عميل S3 وأمر رفع ملف.",
            "دالة بتعمل رابط موقّع لأي أمر.",
            "العميل بيقرا المفاتيح من البيئة (أو IAM role على السيرفر)، و WHEN_REQUIRED عشان الـ SDK ميحطش checksum لملف فاضي جوه الرابط الموقّع.",
            "مسموح ٣ أنواع صور بس، ولحد ٥ ميجا.",
            "مسار طلب الرابط، للمدرّب والأدمن بس.",
            "اتأكد من النوع والحجم.",
            "الـ key: فولدر المستخدم، واسم عشوائي، وامتداد من النوع. مش اسم الملف الأصلي.",
            "رابط PUT موقّع للـ key ده وبالنوع ده بس، عمره ٥ دقايق.",
            "رجّع الرابط والـ key. الـ key هيتبعت تاني في خطوة التأكيد.",
            "قفلة."
          ],
          sol: R`الرابط اللي بيرجع شكله كده: [[https://BUCKET.s3.REGION.amazonaws.com/covers/USER/UUID.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=...&X-Amz-Expires=300&X-Amz-SignedHeaders=content-type%3Bhost&X-Amz-Signature=...]]. [[X-Amz-Expires=300]] هي الـ ٥ دقايق، و [[SignedHeaders=content-type;host]] معناها إن الـ Content-Type داخل في التوقيع. الرفع الصح بيرجع [[200]] وجسم فاضي.

بعد ٦ دقايق S3 بيرجع [[403]] و XML فيه [[AccessDenied]] و [[Request has expired]]. وبـ Content-Type مختلف (مثلًا image/png على رابط اتعمل لـ webp) بيرجع [[403 SignatureDoesNotMatch]]. ولو شفت في الـ Console [[blocked by CORS policy]] قبل ما الطلب يوصل أصلًا، يبقى CORS الـ bucket مش متظبط: لازم [[AllowedOrigins]] فيه origin الموقع، و [[AllowedMethods]] فيه PUT، و [[AllowedHeaders]] فيه content-type.

لو الرفع الصح نفسه رجع [[SignatureDoesNotMatch]]، اتأكد إنك باعت نفس الـ type بالظبط اللي طلبت بيه الرابط، ومن غير headers زيادة. و [[requestChecksumCalculation: "WHEN_REQUIRED"]] موجودة عشان النسخ الجديدة من SDK متضيفش checksum الـ متصفح مش بيبعته.`,
          solCode: R`// في الواجهة
const file = input.files[0];
const res = await apiFetch("/uploads/cover", { method: "POST", body: JSON.stringify({ type: file.type, size: file.size }) });
const { data: { url, key } } = await res.json();
const put = await fetch(url, { method: "PUT", body: file, headers: { "Content-Type": file.type } });
console.log(put.status, key); // 200

// CORS على الـ bucket (S3 أو R2)
[
  {
    "AllowedOrigins": ["http://localhost:3000", "https://myapp.com"],
    "AllowedMethods": ["PUT"],
    "AllowedHeaders": ["content-type"],
    "MaxAgeSeconds": 3000
  }
]`
        },
        {
          cmd: "معالجة الصور",
          title: "صورة ١٢ ميجا من الموبايل لازم تصغر قبل ما تتعرض",
          desc: R`الصورة اللي المدرّب بيرفعها من موبايله ممكن تبقى ٤٠٠٠ بكسل و ١٢ ميجا. بعد الرفع، job في الخلفية بيقراها، ويتأكد إنها صورة فعلًا، ويعمل منها مقاسين بصيغة WebP، ويعلّم على الكورس إن الغلاف جاهز. والصفحة بتعرض المقاس المناسب للشاشة.`,
          example: R`import sharp from "sharp";

export async function processCover({ key }) {
  const original = await storage.read(key);
  const meta = await sharp(original).metadata();
  if (!["jpeg", "png", "webp"].includes(meta.format)) throw new Error($__btnot an image: $__{key}$__bt);
  for (const width of [400, 1200]) {
    const out = await sharp(original).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer();
    await storage.write(key.replace(/\.\w+$/, $__bt-$__{width}.webp$__bt), out, "image/webp");
  }
  await db.course.updateMany({ where: { coverKey: key }, data: { coverReady: true } });
}`,
          try: R`صوّر صورة بموبايلك بالطول، وشغّل الدالة عليها مرة بـ [[.rotate()]] ومرة من غيرها. قارن الاتنين، وقارن حجم الأصل بحجم نسخة الـ 400.`,
          flag: "script",
          deep: {
            why: "صورة ١٢ ميجا في صفحة الكورسات معناها تحميل بطيء على الموبايل، و LCP وحش، وباندويث بتدفع تمنها. وكمان الصورة من الموبايل ممكن يبقى فيها مكان التصوير (GPS) في الـ EXIF، وده بيكشف بيت المدرّب.",
            how: R`sharp مبني على libvips، وده سريع وموفّر في الرام. [[metadata()]] بيقرا الـ header بتاع الملف، وده بيكشف ملف عامل نفسه صورة بامتداد مزيف.

[[rotate()]] من غير أرقام بيلف الصورة حسب الـ EXIF، لأن الموبايل بيصوّر بالعرض ويكتب «لفّها» في الـ metadata. والناتج من sharp بيطلع من غير الـ metadata دي افتراضيًا، فالـ GPS بيروح. و [[withoutEnlargement]] بيمنع إنه يكبّر صورة صغيرة فتبوظ.

ومقاسين كفاية لأغلب الحالات: 400 للكروت، و 1200 لصفحة الكورس. والواجهة بتختار بـ [[srcset]] أو [[sizes]]، أو بتسيب next/image يعمل ده.

ده job مش جوه الـ request. المعالجة بتاخد ثانية أو اتنين وبتاكل CPU، والـ worker ممكن يشتغل على سيرفر لوحده. ولو فشل بيتعاد (درس «background jobs» في القسم الجاي). ولحد ما يخلص، الواجهة بتعرض placeholder بسبب [[coverReady: false]].

وsharp عنده حد افتراضي لعدد البكسلات ([[limitInputPixels]])، بيحميك من صورة صغيرة في الحجم لكنها لما تتفك تبقى مليارات البكسلات (decompression bomb).

وبديل الشغل ده كله: خدمة صور زي Cloudflare Images أو imgproxy، أو next/image على سيرفرك. التفاصيل في درس الـ CDN في المستوى التالت.`,
            when: "أي صور جاية من المستخدمين: أغلفة، وصور بروفايل، وإيصالات تحويل.",
            mistakes: "إنك تعرض الأصل زي ما هو. أو تعالج جوه الـ request فالرفع ياخد ١٠ ثواني. أو تنسى rotate فتطلع الصور مقلوبة. أو تسيب الـ EXIF بالـ GPS. أو تثق في الامتداد بدل ما تقرا الـ header."
          },
          teach: R`## job بياخد الصورة الأصلية ويطلّع منها مقاسين WebP

الدالة بتقرا الملف من الـ storage، وتتأكد إنه صورة فعلًا، وتعمل نسخة عرضها ٤٠٠ ونسخة ١٢٠٠ بصيغة WebP، وتعلّم على الكورس إن الغلاف جاهز. جربناها بـ sharp 0.35 (libvips 8.18) على Node 24 (ويندوز 11). الـ [[storage]] و [[db]] في التجربة وهميين (Map في الذاكرة ودالة بتطبع)، والصورة اتعملت بـ sharp: ٤٠٠٠×٣٠٠٠ فيها noise عشان حجمها يبقى زي صورة موبايل، و EXIF فيه [[orientation: 6]].

---

## ١. [[import sharp from "sharp";]]

sharp مكتبة صور مبنية على libvips (مكتوبة بـ C)، فهي أسرع بكتير من أي حاجة مكتوبة JavaScript، ومبتحمّلش الصورة كلها في الرام مرة واحدة.

---

## ٢. [[export async function processCover({ key }) {]]

الـ job بياخد [[key]] بس (مكان الملف)، مش الصورة نفسها. الـ queue بتخزن داتا صغيرة.

### [[const original = await storage.read(key);]]

يرجّع [[Buffer]]: bytes الملف.

---

## ٣. [[const meta = await sharp(original).metadata();]]

[[metadata()]] بيقرا الـ header بتاع الملف بس من غير ما يفك الصورة كلها. بيرجّع [[format]] و [[width]] و [[height]] و [[orientation]] وغيرهم:

~~~text الناتج
original 4000 x 3000 orientation 6 71457 bytes
~~~

### [[if (!["jpeg", "png", "webp"].includes(meta.format)) throw ...]]

الـ [[format]] جاي من محتوى الملف، مش من الامتداد. جربنا ٣ ملفات اسمها [[.png]]:

~~~text الناتج
evil.png: Input buffer contains unsupported image format
anim.png (gif inside): not an image: covers/u/anim.png
bomb.png: Input image exceeds pixel limit
~~~

1. [[evil.png]] جواه HTML: [[metadata()]] نفسه رمى، لأن sharp معرفش الصيغة أصلًا.
2. [[anim.png]] جواه GIF حقيقي: sharp عرفه ([[format: "gif"]])، والسطر ده هو اللي رفضه.
3. [[bomb.png]] ملف ٦٩ byte بس، عدّلنا الـ header بتاعه يقول ٢٠٠٠٠×٢٠٠٠٠ (٤٠٠ مليون بكسل). sharp رفضه من الـ header بسبب [[limitInputPixels]] (الافتراضي حوالي ٢٦٨ مليون بكسل). ده الـ decompression bomb اللي الـ [[deep]] بيتكلم عنه.

في الحالات التلاتة الـ job بيرمي، والـ queue بتسجّله فاشل.

---

## ٤. [[for (const width of [400, 1200]) {]]

loop على المقاسين. [[for...of]] بيلف على قيم الـ array.

### [[sharp(original).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer()]]

سلسلة (chain): كل خطوة بترجع نفس الـ object فتكمّل عليه، والشغل الحقيقي بيحصل عند [[toBuffer()]]:

| الخطوة | بتعمل إيه |
|---|---|
| [[.rotate()]] | من غير رقم: لف حسب الـ EXIF orientation |
| [[.resize({ width, withoutEnlargement: true })]] | العرض ده، والطول بيتحسب بنفس النسبة، ومتكبّرش صورة أصغر |
| [[.webp({ quality: 80 })]] | حوّل WebP بجودة ٨٠ من ١٠٠ |
| [[.toBuffer()]] | نفّذ ورجّع الـ bytes |

#### ليه [[rotate()]]؟ (الـ solCode)

الموبايل بيخزن البكسلات بالعرض ويكتب في الـ EXIF «لفّها ٩٠ درجة» ([[orientation: 6]]). جربنا نفس الصورة بيها ومن غيرها:

~~~text الناتج
with rotate 400 x 533 462 bytes
no rotate 400 x 300 292 bytes
~~~

من غير [[rotate()]] الصورة طلعت نايمة (٤٠٠×٣٠٠). ولما بتلف، ٣٠٠٠×٤٠٠٠ بعرض ٤٠٠ بيبقى طولها [[4000 × 400 ÷ 3000 = 533]].

#### [[withoutEnlargement]]

صورة ٣٠٠×٢٠٠:

~~~text الناتج
small -> covers/u/small-400.webp 300x200
small -> covers/u/small-1200.webp 300x200
~~~

فضلت زي ما هي بدل ما تتمطّ وتبوظ.

### [[storage.write(key.replace(/\.\w+$/, $__bt-$__{width}.webp$__bt), out, "image/webp")]]

الـ regex [[/\.\w+$/]] معناه: نقطة ([[\.]])، وبعدها حرف أو رقم أو أكتر ([[\w+]])، في آخر النص ([[$]]). يعني الامتداد. وبيتبدل بـ [[-400.webp]]:

~~~text الناتج
wrote covers/u_inst/abc-400.webp image/webp 8598 bytes
wrote covers/u_inst/abc-1200.webp image/webp 529064 bytes
~~~

والأصل كان [[8542438]] byte (حوالي ٨.٥ ميجا)، يعني نسخة الـ ٤٠٠ أصغر منه ألف مرة تقريبًا (الصورة دي noise؛ صورة حقيقية بتختلف).

### الـ EXIF راح

~~~text الناتج
in: has EXIF 8542438 bytes
covers/u_inst/abc-400.webp 400x533 exif: none orientation: undefined
covers/u_inst/abc-1200.webp 1200x1600 exif: none orientation: undefined
~~~

sharp مبينسخش الـ metadata للناتج إلا لو طلبت ([[withMetadata]] أو [[keepExif]])، فالـ GPS وموديل الموبايل مش موجودين في اللي هيتعرض.

---

## ٥. [[db.course.updateMany({ where: { coverKey: key }, data: { coverReady: true } })]]

~~~text الناتج
updateMany {"where":{"coverKey":"covers/u_inst/abc.jpg"},"data":{"coverReady":true}}
~~~

[[updateMany]] مش [[update]] لأن [[coverKey]] مش unique، ولو الكورس اتمسح أو غيّر الغلاف في النص الـ count بيبقى 0 من غير ما يرمي.

---

## الخلاصة

| الخطوة | ليه |
|---|---|
| [[metadata()]] + قايمة صيغ | الامتداد ممكن يكدب، والـ header لأ |
| [[rotate()]] | صور الموبايل متطلعش نايمة |
| [[resize]] + [[withoutEnlargement]] | مقاس مناسب ومن غير تمطيط |
| [[webp({ quality: 80 })]] | حجم أصغر بمراحل |
| الناتج من غير EXIF | الـ GPS مش بيتنشر |
| [[coverReady]] | الواجهة تعرض placeholder لحد ما يخلص |`,
          lines: [
            "sharp: مكتبة الصور الأسرع في Node.",
            "job بياخد الـ key بتاع الملف اللي اترفع.",
            "اقرا الملف من الـ storage.",
            "اقرا الـ header بتاع الصورة الحقيقي.",
            "مش صورة فعلًا؟ ارمي error، والـ job يتسجّل فاشل.",
            "لكل مقاس من الاتنين...",
            "...لف حسب الـ EXIF، وصغّر من غير تكبير، وحوّل WebP بجودة 80.",
            "...واحفظه جنب الأصل باسم فيه المقاس.",
            "قفلة الـ loop.",
            "علّم إن الغلاف جاهز، عشان الواجهة تعرضه بدل الـ placeholder.",
            "قفلة."
          ],
          sol: R`صورة الموبايل بالطول غالبًا متخزنة بالعرض وجواها EXIF بيقول «لفّها 90 درجة» ([[orientation: 6]]). جربناها على صورة 4000×3000 عليها orientation 6: مع [[.rotate()]] نسخة الـ 400 طلعت [[400 x 533]] (بالطول، صح)، ومن غيرها طلعت [[400 x 300]] (نايمة على جنبها). ده لأن [[.rotate()]] من غير رقم بيلف حسب الـ EXIF، والـ webp الناتج مفيهوش EXIF أصلًا، فمفيش حد تاني هيلفها.

الحجم: الأصل من موبايل حديث بيبقى من ٣ لـ ١٢ ميجا، ونسخة الـ 400 webp بـ quality 80 بتبقى عشرات الكيلو بس (الرقم بيختلف حسب الصورة). يعني تقريبًا ١٠٠ مرة أصغر، وده الفرق بين صفحة كورسات بتحمّل في ثانية وصفحة بتحمّل في ٣٠.

لو النسختين طلعوا نفس الاتجاه، يبقى صورتك مفيهاش EXIF orientation (بعض التطبيقات بتلف البيكسلات نفسها قبل ما تحفظ). جرب صورة طالعة من الكاميرا مباشرة، أو اعمل واحدة بالسكربت اللي تحت.`,
          solCode: R`import sharp from "sharp";

// لو معندكش صورة فيها EXIF، اعمل واحدة: بيكسلات بالعرض و orientation 6
const photo = await sharp({ create: { width: 4000, height: 3000, channels: 3, background: "#4a7" } })
  .jpeg().withMetadata({ orientation: 6 }).toBuffer();

const m = await sharp(photo).metadata();
console.log("original", m.width, "x", m.height, "orientation", m.orientation, photo.length, "bytes");

for (const rotate of [true, false]) {
  let p = sharp(photo);
  if (rotate) p = p.rotate();
  const out = await p.resize({ width: 400, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer();
  const o = await sharp(out).metadata();
  console.log(rotate ? "with rotate" : "no rotate", o.width, "x", o.height, out.length, "bytes");
}
// with rotate 400 x 533
// no rotate 400 x 300`
        },
        {
          cmd: "socket.io",
          title: "إشعار يوصل للمستخدم لحظة ما يحصل",
          desc: R`socket.io بيفتح اتصال دايم بين المتصفح والسيرفر، فالسيرفر يقدر يبعت من غير ما حد يسأله. الاتصال بيتأكد من التوكن أول ما يتفتح، وكل مستخدم بيدخل room باسمه، وأي service عايزة تبلّغه بتنادي [[notify(userId, ...)]].

في الواجهة: [[const socket = io(API_URL, { auth: { token } })]]، وبعدها [[socket.on("notification", show)]].`,
          example: R`import { Server } from "socket.io";

export const io = new Server(httpServer, { cors: { origin: config.WEB_ORIGIN, credentials: true } });
io.use((socket, next) => {
  try {
    const payload = jwt.verify(socket.handshake.auth.token, config.JWT_SECRET);
    socket.data.userId = payload.sub;
    next();
  } catch {
    next(new Error("UNAUTHENTICATED"));
  }
});
io.on("connection", (socket) => socket.join($__btuser:$__{socket.data.userId}$__bt));
export async function notify(userId, n) {
  const saved = await db.notification.create({ data: { userId, type: n.type, payload: n.payload } });
  io.to($__btuser:$__{userId}$__bt).emit("notification", saved);
}`,
          try: R`افتح الموقع في تابين بنفس المستخدم، وتاب تالت بمستخدم تاني. نادي [[notify]] للأول من endpoint تجربة. التابين بتوعه يوصلهم، والتالت لأ. بعدين جرّب تتصل بتوكن غلط من الـ Console، ولازم يرفض.`,
          flag: "script",
          deep: {
            why: "من غيره، الواجهة بتسأل كل شوية «فيه جديد؟» (polling)، وده آلاف الطلبات من غير فايدة، والإشعار بيتأخر لحد السؤال الجاي. الاتصال الدايم بيخلي السيرفر يبعت أول ما الحاجة تحصل.",
            how: R`[[io.use]] بيشتغل مرة واحدة لكل اتصال، قبل ما يتفتح. التوكن بيتبعت في [[auth]] مش في الـ query string، لأن الـ query بيتسجّل في لوجات Nginx. ولو التحقق فشل، الاتصال مبيتفتحش خالص. والـ [[userId]] جاي من التوكن اللي السيرفر اتحقق منه، مش من كلام الـ client.

الـ room باسم المستخدم بتخلي [[io.to("user:ID")]] توصل لكل أجهزته وتاباته مع بعض. وفي شات أو كورس، بتعمل rooms للمحادثة أو الكورس، بس لازم تتأكد من العضوية قبل ما تعمل join.

الإشعار بيتحفظ في القاعدة الأول، وبعدين يتبعت. لو المستخدم مش متصل، هيشوفه لما يفتح ([[GET /me/notifications]]). يعني الـ socket للسرعة بس، مش المصدر.

والتوكن بيخلص بعد ربع ساعة، بس الاتصال اللي اتفتح بيفضل مفتوح. لو ده مهم (زي logout)، اقفل الاتصالات بنفسك: [[io.in("user:ID").disconnectSockets()]].

ولو عندك أكتر من سيرفر، المستخدم ممكن يكون متصل بسيرفر والـ notify بيحصل على سيرفر تاني. الحل Redis adapter، ومعاه sticky sessions في الـ load balancer. ده في درس الـ scaling. والـ WebSocket ورا Nginx محتاج headers الـ Upgrade (تاب «Nginx»).

وفيه بدايل. SSE أبسط لو الكلام في اتجاه واحد (من السيرفر للمتصفح بس)، وشغال على HTTP عادي. و Supabase Realtime لو شغال على Supabase. أو خدمة مدفوعة زي Pusher أو Ably لو مش عايز تشغّل حاجة بنفسك.`,
            when: "إشعارات، وشات، وحالة طلب بتتغير، ولوحة أدمن بتتحدث لوحدها. ولو التحديث كل دقيقة كفاية، الـ polling أبسط.",
            mistakes: R`في مشروع حقيقي، سيرفر الـ socket مكانش فيه أي تحقق. الـ client بيبعت [[join]] بالـ userId بتاعه هو، و [[send-message]] ومعاها senderId و senderName. يعني أي حد يقدر يسمع إشعارات أي حد، ويبعت رسايل باسمه. وكمان محتوى الرسايل كان بيتطبع في اللوج. ومن الغلطات كمان: إنك تبعت قبل ما القاعدة تحفظ، فلو الـ transaction فشلت المستخدم يشوف إشعار لحاجة محصلتش.`
          },
          teach: R`## اتصال دايم، بتوكن متأكد منه، و room لكل مستخدم

السيرفر بيتأكد من التوكن قبل ما أي اتصال يتفتح، وكل اتصال بيدخل room باسم صاحبه، و [[notify]] بتحفظ الإشعار في القاعدة وتبعته للـ room. جربناه بـ socket.io 4.8 و socket.io-client 4.8 و Prisma 7 على PostgreSQL 18 (Docker، ويندوز 11، Node 24): تابين لـ Ali، وتاب لـ Mona، واتصالين بتوكن غلط ومن غير توكن، والـ endpoint اللي في الـ solCode.

---

## ١. [[new Server(httpServer, { cors: { origin: config.WEB_ORIGIN, credentials: true } })]]

socket.io بيركب على **نفس** سيرفر HTTP بتاع Express ([[http.createServer(app)]])، فنفس البورت بيخدم الـ API والـ realtime. وأول طلبات الاتصال HTTP عادي، فالـ CORS بيحدد مين يقدر يتصل من المتصفح: الواجهة بس.

---

## ٢. [[io.use((socket, next) => { ... })]]

middleware بيشتغل **مرة واحدة لكل اتصال جديد** قبل ما يتفتح (مش مع كل رسالة).

### [[jwt.verify(socket.handshake.auth.token, config.JWT_SECRET)]]

[[socket.handshake]] بيانات أول طلب، و [[auth]] الـ object اللي الـ client بعته: [[io(url, { auth: { token } })]]. نفس التحقق بتاع [[requireAuth]].

### [[socket.data.userId = payload.sub;]]

[[socket.data]] مكان تحط فيه أي حاجة تخص الاتصال ده. الـ id من التوكن اللي اتحقق منه، مش من رسالة الـ client.

### [[next()]] أو [[next(new Error("UNAUTHENTICATED"))]]

[[next()]] من غير حاجة = افتح الاتصال. ومع [[Error]] = ارفضه، والرسالة بتوصل للـ client في [[connect_error]]:

~~~text الناتج
ali tab1 connected F0BtBs3Wq0XZLehEAAAA
ali tab2 connected GHzy9aG7AlGtf14yAAAB
mona tab connected _gAkTdl41NX3pa5qAAAC
bad token connect_error: UNAUTHENTICATED active: false
no token connect_error: UNAUTHENTICATED active: false
~~~

الرقم بعد [[connected]] هو [[socket.id]]، مختلف لكل اتصال حتى لنفس المستخدم. و [[active: false]] معناها الـ client مش هيحاول تاني لوحده بعد رفض الـ middleware، واستنينا ثانية ونص واتأكدنا:

~~~text الناتج
bad still active? false connected? false
~~~

---

## ٣. [[io.on("connection", (socket) => socket.join($__btuser:$__{socket.data.userId}$__bt))]]

[[connection]] بيحصل بعد ما الـ middleware يعدّي. و [[join]] بيدخّل الاتصال room اسمها [[user:u_ali]]. الـ room مجرد اسم لمجموعة اتصالات:

~~~text الناتج
rooms: user:u_ali=2 user:u_mona=1
~~~

تابين Ali في نفس الـ room.

---

## ٤. [[export async function notify(userId, n) {]]

### [[const saved = await db.notification.create({ data: { userId, type: n.type, payload: n.payload } });]]

الحفظ الأول. [[payload]] عمود [[Json]]، فبيقبل أي object.

### [[io.to($__btuser:$__{userId}$__bt).emit("notification", saved);]]

[[io.to(room)]] بيختار كل الاتصالات اللي في الـ room دي، و [[emit(اسم, داتا)]] بيبعت event. بنبعت الصف المحفوظ نفسه (فيه [[id]] و [[createdAt]]).

نادينا [[POST /dev/notify/u_ali]]:

~~~text الناتج
ali tab1 got {"id":"cmuzf1vgs00002oie1782gn51","userId":"u_ali","type":"order.paid","payload":{"orderId":"o_1"},"createdAt":"2026-10-08T10:51:18.028Z"}
ali tab2 got {"id":"cmuzf1vgs00002oie1782gn51",...}
POST /dev/notify/u_ali 204
saved rows: 1
~~~

التابين خدوا نفس الإشعار، وتاب Mona مخدش حاجة، وفي القاعدة صف واحد. ولاحظ إن الإشعارات اتطبعت **قبل** رد الـ 204: الـ emit وصل وهو لسه بيقفل الطلب.

---

## ٥. [[io.in("user:ID").disconnectSockets()]] (من الـ deep)

عشان الـ logout يقفل الاتصالات المفتوحة:

~~~text الناتج
after disconnectSockets: false false true
~~~

تابين Ali اتقفلوا، و Mona لسه متصلة.

---

## ٦. الـ solCode من ناحية الـ client

- [[io("http://localhost:4000", { auth: { token: ACCESS_TOKEN } })]]: يفتح الاتصال ويبعت التوكن في الـ handshake.
- [[good.on("connect", ...)]] و [[good.on("notification", ...)]]: بيسمع على الأحداث بالاسم.
- [[reconnection: false]] على الاتصال الغلط عشان التجربة متكررش المحاولة.

---

## الخلاصة

| الحاجة | الكود | النتيجة في التجربة |
|---|---|---|
| مين يتصل | [[io.use]] + [[jwt.verify]] | توكن غلط أو مفيش → [[connect_error: UNAUTHENTICATED]] |
| هو مين | [[socket.data.userId]] من التوكن | مش من كلام الـ client |
| يوصل لمين | room [[user:ID]] | كل تابات Ali، مش Mona |
| مش متصل؟ | الحفظ قبل الـ emit | الإشعار في القاعدة يتقري بعدين |
| logout | [[disconnectSockets()]] | اتصالاته بس تتقفل |`,
          lines: [
            "سيرفر socket.io.",
            "ركّبه على نفس سيرفر HTTP، و CORS للواجهة بس.",
            "middleware بيشتغل قبل ما أي اتصال يتفتح.",
            "جرّب...",
            "...تتحقق من التوكن اللي في auth.",
            "خزّن id المستخدم على الاتصال. ده من التوكن، مش من كلام الـ client.",
            "اسمح بالاتصال.",
            "لو التحقق فشل...",
            "...ارفض الاتصال.",
            "قفلة.",
            "قفلة.",
            "كل اتصال جديد يدخل room المستخدم بتاعه.",
            "دالة بتناديها أي service.",
            "احفظ الإشعار الأول، عشان لو مش متصل يلاقيه بعدين.",
            "ابعته لكل أجهزة المستخدم المتصلة.",
            "قفلة."
          ],
          sol: R`التابين بتوع المستخدم الأول يوصلهم نفس الـ event في نفس اللحظة، بالشكل [[{"id":...,"userId":"u1","type":"order.paid","payload":{...}}]]، والتاب التالت مبيوصلوش حاجة. ده لأن كل socket بيدخل room اسمها [[user:ID]]، و [[io.to(room)]] بيبعت لكل الـ sockets اللي في الـ room، مهما كانوا كام تاب أو جهاز.

الاتصال بتوكن غلط بيطلّع [[connect_error]] ورسالته [[UNAUTHENTICATED]]، ومفيش [[connect]] خالص. وخلي بالك: لما الـ middleware هو اللي رفض، الـ client مبيحاولش تاني لوحده ([[socket.active]] بيبقى [[false]])، على عكس انقطاع النت اللي بيعيد فيه لوحده. فلو التوكن انتهى، حدّث [[socket.auth.token]] واعمل [[socket.connect()]] بإيدك.

لو التالت وصله الإشعار، يبقى انت عامل [[io.emit]] بدل [[io.to(...)]]. ولو ولا تاب وصله، اتأكد إن الـ userId اللي بتبعته لـ notify هو نفس الـ [[sub]] اللي في التوكن (string مش number).`,
          solCode: R`// في Console تاب مفتوح (أو ملف client.mjs مع socket.io-client)
import { io } from "socket.io-client";

const good = io("http://localhost:4000", { auth: { token: ACCESS_TOKEN } });
good.on("connect", () => console.log("connected", good.id));
good.on("notification", (n) => console.log("got", n));

const bad = io("http://localhost:4000", { auth: { token: "abc.def.ghi" }, reconnection: false });
bad.on("connect_error", (e) => console.log("rejected:", e.message)); // rejected: UNAUTHENTICATED

// endpoint تجربة في السيرفر
router.post("/dev/notify/:userId", async (req, res) => {
  await notify(req.params.userId, { type: "test", payload: { at: Date.now() } });
  res.status(204).end();
});`
        },
        {
          cmd: "transactional email",
          title: "إيميلات النظام: تأكيد، واستعادة باسورد، وإيصال",
          desc: R`الإيميلات اللي النظام بيبعتها لوحده (استعادة باسورد، وإيصال دفع، وترحيب) بتتبعت من worker مش من الـ request. الـ route بيحط job في queue ويرد، والـ worker بيبعت عن طريق مزوّد زي Resend. ولو فشل، الـ queue بتعيده، بشرط تحدد [[attempts]] (ومعاه [[backoff]] عشان الإعادة تستنى شوية)، لأن الافتراضي في BullMQ محاولة واحدة من غير إعادة. حطهم مرة واحدة في [[defaultJobOptions]] على الـ Queue: [[new Queue("emails", { connection, defaultJobOptions: { attempts: 5, backoff: { type: "exponential", delay: 10_000 } } })]]، عشان كل الإيميلات (زي reset) تتعاد.`,
          example: R`import { Resend } from "resend";
import { Worker } from "bullmq";

const resend = new Resend(config.RESEND_API_KEY);
const templates = { reset: resetEmail, receipt: receiptEmail, welcome: welcomeEmail };

new Worker("emails", async (job) => {
  const { subject, html } = templates[job.name](job.data);
  const { error } = await resend.emails.send(
    { from: "myapp <no-reply@example.com>", to: job.data.to, subject, html },
    { idempotencyKey: $__bt$__{job.name}/$__{job.id}$__bt },
  );
  if (error) throw new Error(error.message);
}, { connection });`,
          try: R`خلي مفتاح Resend غلط عن قصد، واطلب استعادة باسورد. الـ API لازم يرد عادي، والـ job يفشل ويتعاد أكتر من مرة (شوفه في Bull Board أو في اللوج). رجّع المفتاح الصح، والـ job يعدّي في المحاولة الجاية.`,
          flag: "script",
          deep: {
            why: "مزوّد الإيميل ممكن يبطأ أو يقع. لو الإرسال جوه الـ request، التسجيل كله يبقى بطيء، أو يفشل عشان الإيميل. ولو من غير retry، الإيميل اللي فشل بيروح خالص، والطالب مستني لينك مش هييجي.",
            how: R`الـ worker بيستلم الـ job باسمه ([[reset]] أو [[receipt]]) والداتا بتاعته، ويختار القالب. القالب دالة بترجّع subject و html بلغة المستخدم. خزّن [[locale]] للمستخدم في القاعدة عشان كده، وخلي الإيميل العربي فيه [[dir="rtl"]].

[[idempotencyKey]] بيتبعت كـ argument تاني. لو الإرسال نجح بس الرد اتأخر، والـ job اتعاد، Resend بتعرف إنه نفس الإيميل ومبتبعتوش تاني. والمفتاح ده صالح ٢٤ ساعة عندهم. والـ [[throw]] لو فيه error هو اللي بيخلي BullMQ يعيد.

و [[connection]] جاي من [[lib/redis.ts]]: [[new IORedis(config.REDIS_URL, { maxRetriesPerRequest: null })]]، والـ worker محتاج الإعداد ده.

وعشان الإيميل يوصل للـ inbox مش الـ spam، لازم تأكد الدومين عند المزوّد، وتضيف في الـ DNS سجلات SPF و DKIM اللي بيدّيهالك، وسجل DMARC. وابعت من subdomain زي [[mail.example.com]]، عشان سمعة الإرسال متأثرش على الدومين الأساسي. والإيميلات التسويقية تروح من stream أو subdomain تاني غير إيميلات النظام، عشان الـ spam في التسويق ميوقّعش إيصالات الدفع.

وفي staging، الإيميلات تروح sandbox أو قايمة إيميلات بتاعة الفريق بس. والقوالب ممكن تتكتب بـ React Email أو MJML.`,
            when: "أي إيميل بيطلع نتيجة لفعل المستخدم. والإيميلات التسويقية (newsletter) ليها أداة لوحدها وقواعد إلغاء اشتراك.",
            mistakes: R`إنك تبعت من جوه الـ request. أو تبعت من Gmail شخصي. أو تنسى SPF و DKIM فكل حاجة تروح spam. أو تعيد الإرسال من غير idempotency فالطالب يوصله ٣ إيصالات. وفي مشروع حقيقي، لو مفتاح الإيميل مش موجود، الكود كان بيطبع الإيميل كله في اللوج بدل ما يقع. ده مريح في التطوير، بس في الإنتاج معناه إن لينكات الاستعادة والـ OTP بتتكتب في اللوجات. الصح إن [[config.ts]] يرفض يقوم من غير المفتاح في الإنتاج.`
          },
          teach: R`## الـ route بيحط job، والـ worker هو اللي بيبعت

الـ worker بيسمع على queue اسمها [[emails]]، ولكل job بيختار قالب باسمها، ويبعت عن طريق Resend بمفتاح idempotency، ولو فشل بيرمي عشان BullMQ يعيد. جربناه بـ BullMQ 6.3 و ioredis 6 على Redis 8 (Docker) و resend 6.32 (ويندوز 11، Node 24). معندناش حساب Resend، فخلينا الـ SDK يكلّم سيرفر وهمي على جهازنا (الـ SDK بيقرا [[RESEND_BASE_URL]] من البيئة)، والسيرفر ده بيرد بشكل خطأ Resend من وثائقهم لو المفتاح غلط. وصغّرنا الـ [[delay]] لثانية واحدة بدل ١٠ عشان منستناش.

---

## ١. [[const resend = new Resend(config.RESEND_API_KEY);]]

العميل بالمفتاح ([[re_...]]). كل طلب بيروح بـ [[Authorization: Bearer <المفتاح>]].

## ٢. [[const templates = { reset: resetEmail, receipt: receiptEmail, welcome: welcomeEmail };]]

object بيربط اسم الـ job بدالة القالب. كل دالة بتاخد الداتا وترجّع [[{ subject, html }]]. في التجربة:

~~~js
const resetEmail = (d) => ({ subject: "استعادة الباسورد", html: $__bt<div dir="rtl"><a href="$__{d.link}">غيّر الباسورد</a></div>$__bt });
~~~

---

## ٣. [[new Worker("emails", async (job) => { ... }, { connection });]]

- [["emails"]] اسم الـ queue لازم يطابق اسمها عند اللي بيضيف ([[new Queue("emails", ...)]]).
- الدالة بتتنادى لكل job. لو رجعت عادي الـ job بقت [[completed]]، ولو رمت بقت فاشلة وBullMQ يقرر يعيد ولا لأ.
- [[connection]] اتصال Redis من [[new IORedis(url, { maxRetriesPerRequest: null })]]: الـ worker بيعمل أوامر بتستنى (blocking)، و ioredis افتراضيًا بيقفلها بعد ٢٠ محاولة، فالـ [[null]] بيلغي الحد ده.

### [[const { subject, html } = templates[job.name](job.data);]]

[[templates[job.name]]] بيجيب الدالة بالاسم ([[templates["reset"]]])، وبعدين [[(job.data)]] بينادي عليها.

### [[resend.emails.send({ from, to, subject, html }, { idempotencyKey: ... })]]

- [[from: "myapp <no-reply@example.com>"]]: اسم ظاهر وإيميل من دومينك المتأكد.
- الـ argument التاني options، فيه [[idempotencyKey]] = [[reset/1]] (اسم الـ job ورقمها). الـ SDK بيبعته header اسمه [[Idempotency-Key]]، والسيرفر الوهمي طبعه:

~~~text الناتج
[fake resend] POST /emails key=re_BAD… Idempotency-Key=reset/1
~~~

ونفس المفتاح بيتبعت في **كل** محاولة لنفس الـ job، فلو محاولة وصلت بس الرد ضاع، Resend مبتبعتش الإيميل تاني (من الـ docs: المفتاح صالح ٢٤ ساعة).

### [[const { error } = ...]] و [[if (error) throw new Error(error.message);]]

[[send]] مبترميش لو Resend رفض، بترجّع [[{ data: null, error }]]. من غير السطر ده الـ job هتتعلّم [[completed]] والإيميل مبعتش. (والـ SDK بيطبع [[[Resend API Error]]] في الـ console لوحده كمان.)

---

## ٤. التجربة: مفتاح غلط وبعدين صلّحناه

الـ queue معمولة بـ [[defaultJobOptions: { attempts: 5, backoff: { type: "exponential", delay: 1000 } }]]:

~~~text الناتج
route would answer after 8 ms
0.0s attempt 1 reset 1
0.0s failed attempt 1 of 5 - API key is invalid
1.1s attempt 2 reset 1
1.1s failed attempt 2 of 5 - API key is invalid
3.2s attempt 3 reset 1
3.2s failed attempt 3 of 5 - API key is invalid
3.5s -- fix the key (simulate deploy)
7.3s attempt 4 reset 1
7.4s completed 1
~~~

- [[queue.add]] خد ٨ ملّي، فالـ route بيرد بسرعة مهما الإيميل اتأخر.
- الانتظار بين المحاولات [[delay × 2^(n-1)]]: ثانية، ٢، ٤ (مع ١٠ ثواني في الدرس: ١٠، ٢٠، ٤٠).
- بعد ما المفتاح اتصلّح، المحاولة الرابعة نجحت، والإيميل اتبعت مرة واحدة.

ومن غير [[attempts]] خالص:

~~~text الناتج
no attempts option: tries = 1 state = failed opts.attempts = 0
~~~

محاولة واحدة والـ job قعدت في الـ failed. ده ليه الـ desc بيقول حطها في [[defaultJobOptions]].

---

## الخلاصة

| الحاجة | الكود | ليه |
|---|---|---|
| الإرسال برا الـ request | [[queue.add]] + [[Worker]] | الرد في ملّي، والمزوّد يقع براحته |
| القالب | [[templates[job.name](job.data)]] | اسم الـ job بيختار الإيميل |
| مفيش تكرار | [[idempotencyKey: name/id]] | نفس المفتاح في كل محاولة |
| الفشل يتعاد | [[if (error) throw]] + [[attempts]] | [[send]] مبترميش لوحدها |
| الإعادة تستنى | [[backoff: exponential]] | متضربش خدمة واقعة |`,
          lines: [
            "SDK بتاع Resend.",
            "الـ Worker بتاع BullMQ.",
            "العميل بالمفتاح من الـ config.",
            "قالب لكل نوع إيميل. كل قالب دالة بترجّع subject و html.",
            "worker بيسمع على queue الإيميلات.",
            "اختار القالب باسم الـ job، واملاه بالداتا.",
            "ابعت...",
            "...من دومينك المتأكد، للمستخدم، بالقالب.",
            "...ومفتاح idempotency، عشان الإعادة متبعتش مرتين.",
            "قفلة الإرسال.",
            "فشل؟ ارمي error، و BullMQ هيعيد بعدين.",
            "اتصال Redis من lib/redis.ts."
          ],
          sol: R`بالمفتاح الغلط، [[POST /auth/forgot]] بيرجع 200 في ملّي ثواني عادي (جربناها: الـ API رد في حوالي 20ms)، لأنه بيحط job بس. في اللوج هتلاقي الـ job فشل: [[failed attempt 1 of 5]]، وبعدين 2، وهكذا، والوقت بينهم بيزيد (10 ثواني، 20، 40...). رسالة الخطأ هي رسالة Resend عن المفتاح (حاجة زي [[API key is invalid]])، لأن [[resend.emails.send]] مبترميش، بترجّع [[{ data: null, error }]]، وسطر [[if (error) throw]] هو اللي بيحوّلها فشل.

لو رجّعت المفتاح الصح قبل ما المحاولات تخلص، المحاولة الجاية تعدّي والإيميل يوصل مرة واحدة بس، لأن الـ [[idempotencyKey]] ثابت لنفس الـ job. ولو المحاولات خلصت، الـ job بيقعد في الـ failed، وتقدر تعيده من Bull Board.

لو الـ job فشل مرة واحدة ومتعادش، يبقى مفيش [[attempts]] (الافتراضي في BullMQ محاولة واحدة). ولو الـ API نفسه رجع 500، يبقى بتبعت الإيميل جوه الـ request. وفي BullMQ الجديد مكتبة ioredis بقت optional، فلو ظهرلك [[could not load the optional 'ioredis' package]]، سطّبها ([[npm i ioredis]]) واعمل [[connection]] من [[new IORedis(url, { maxRetriesPerRequest: null })]].`
        },
        {
          cmd: "web push",
          title: "إشعار على الموبايل والموقع مقفول",
          desc: R`الـ Web Push بيوصل إشعار للمستخدم حتى لو الموقع مقفول، طول ما المتصفح بيدعمه. المتصفح بيعمل subscription (عنوان وشوية مفاتيح) ويبعته للسيرفر يخزنه. ولما يحصل حاجة، السيرفر بيبعت على العنوان ده بمكتبة [[web-push]] ومفاتيح VAPID بتاعتك.

والـ subscription اللي بترجع 404 أو 410 معناها إن المستخدم لغى الإذن، أو مسح الموقع، وبتتمسح.`,
          example: R`import webpush from "web-push";

webpush.setVapidDetails("mailto:you@example.com", config.VAPID_PUBLIC_KEY, config.VAPID_PRIVATE_KEY);
router.post("/me/push-subscriptions", requireAuth, async (req, res) => {
  const sub = PushSub.parse(req.body);
  await db.pushSubscription.upsert({ where: { endpoint: sub.endpoint }, create: { userId: req.user.id, ...sub }, update: { userId: req.user.id } });
  res.status(204).end();
});
export async function pushTo(userId, payload) {
  for (const s of await db.pushSubscription.findMany({ where: { userId } })) {
    await webpush.sendNotification({ endpoint: s.endpoint, keys: s.keys }, JSON.stringify(payload))
      .catch((e) => [404, 410].includes(e.statusCode) && db.pushSubscription.delete({ where: { id: s.id } }));
  }
}`,
          try: R`اعمل مفاتيح بـ [[npx web-push generate-vapid-keys]]. في الواجهة سجّل service worker، واطلب الإذن من زرار، وابعت الـ subscription. نادي [[pushTo]] واقفل التاب، والإشعار لازم يوصل. بعدين الغي الإذن من إعدادات الموقع ونادي تاني، ولاحظ إن الصف اتمسح.`,
          flag: "script",
          deep: {
            why: "الإيميل بيتقري متأخر، والـ socket محتاج الموقع مفتوح. الـ push بيوصل على شاشة الموبايل: «الدرس الجديد نزل»، أو «الحصة كمان ساعة». وده بيفرق في رجوع المستخدمين.",
            how: R`مفاتيح VAPID بتتعمل مرة واحدة. الـ public key بيروح للواجهة، والـ private بيفضل على السيرفر. وفي الواجهة: [[registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey })]] بيرجّع subscription، فيها endpoint (عنوان عند Google أو Mozilla أو Apple) ومفتاحين [[p256dh]] و [[auth]].

المكتبة بتشفّر الـ payload بالمفاتيح دي، وبتبعته للـ endpoint، وخدمة المتصفح هي اللي بتوصّله للجهاز. والـ service worker بيستقبله في event اسمه [[push]] ويعرضه بـ [[showNotification]]. والـ payload صغير (حوالي ٤ كيلو)، فابعت عنوان ورابط، مش الداتا كلها.

الإذن اطلبه من زرار واضح بعد ما المستخدم يفهم هيستفيد إيه. متطلبوش أول ما الصفحة تفتح، لأن لو رفض مش هتقدر تسأله تاني. وعلى iOS، الـ web push بيشتغل بس لو الموقع متضاف على الشاشة الرئيسية كـ PWA. وخلي في جدول تفضيلات: المستخدم يختار أنواع الإشعارات اللي عايزها.

وفي تطبيق موبايل حقيقي (Capacitor مثلًا)، الإشعارات بتبقى عن طريق FCM و APNs. نفس الفكرة: token للجهاز بيتخزن، وبيتمسح لما يرجع «مش متسجّل». التفاصيل في تاب «Desktop و Mobile».`,
            when: "تذكيرات بمواعيد، وتحديثات مهمة. ومش لكل حاجة، لأن الإزعاج بيخلي المستخدم يقفل الإذن خالص.",
            mistakes: R`إنك تطلب الإذن أول ما الصفحة تفتح. أو متمسحش الـ subscriptions الميتة، فالإرسال يبطأ مع الوقت. أو تحط بيانات حساسة في نص الإشعار، وهو بيظهر على شاشة القفل. ودي حاجة كانت معمولة صح في مشروعين حقيقيين: واحد بيمسح الـ subscriptions اللي بترجع 404 و 410، والتاني بيمسح توكنات FCM اللي بترجع «not registered».`
          },
          teach: R`## المتصفح بيدّيك عنوان، والسيرفر بيبعت عليه متشفّر

المتصفح بيعمل subscription (عنوان عند خدمة الـ push ومفتاحين)، والسيرفر بيخزنها، و [[pushTo]] بتبعت لكل أجهزة المستخدم وتمسح اللي ماتت. جربنا جانب السيرفر بـ web-push 3.6 و Prisma 7 على PostgreSQL 18 (Docker، ويندوز 11، Node 24). خدمة الـ push (FCM أو Mozilla) عملناها سيرفر HTTPS وهمي على جهازنا بشهادة self-signed، والـ subscriptions عملناها بمفاتيح حقيقية بالشكل اللي المتصفح بيطلّعه ([[crypto.createECDH("prime256v1")]]). جزء المتصفح والـ service worker في الـ solCode من وثائق MDN، متجربش هنا.

---

## ١. المفاتيح: [[npx web-push generate-vapid-keys]]

~~~text الناتج (المفاتيح مختصرة)
=======================================

Public Key:
BPNbKEzIAn…yoEs

Private Key:
77L8CF8ubs…5AMk

=======================================
~~~

بالـ [[--json]] قسنا: العام ٨٧ حرف بيبدأ بـ [[B]]، والخاص ٤٣ حرف. VAPID اختصار Voluntary Application Server Identification: السيرفر بيثبت لخدمة الـ push إنه هو صاحب الـ subscription. العام ٦٥ byte (نقطة على منحنى P-256، وأول byte [[0x04]] وده اللي بيخلي base64url يبدأ بـ B)، والخاص ٣٢ byte.

### [[webpush.setVapidDetails("mailto:you@example.com", PUBLIC, PRIVATE);]]

مرة واحدة وقت التشغيل. الإيميل وسيلة تواصل لو خدمة الـ push عايزة تكلّمك.

---

## ٢. [[router.post("/me/push-subscriptions", requireAuth, ...)]]

### [[const sub = PushSub.parse(req.body);]]

[[PushSub]] من الـ solCode: [[endpoint: z.url()]] و [[keys: { p256dh, auth }]]. شكل اللي المتصفح بيبعته:

~~~text الناتج
{"endpoint":"https://localhost:6020/push/dev-1","expirationTime":null,"keys":{"p256dh":"BL-FaeR8…","auth":"MF9wMXPVyMkfkQObmYDT_g"}}
~~~

[[p256dh]] المفتاح العام بتاع المتصفح، و [[auth]] سر ١٦ byte. والاتنين بيستخدمهم السيرفر في التشفير. [[expirationTime]] مش في الـ schema فـ Zod بيشيله. وبودي غلط:

~~~text الناتج
bad body: 400
~~~

### [[db.pushSubscription.upsert({ where: { endpoint }, create: { userId, ...sub }, update: { userId } })]]

[[endpoint]] عليه [[@unique]]: نفس الجهاز بيبعت نفس الـ endpoint كل مرة. لو موجود بنحدّث صاحبه بس (حد تاني دخل من نفس المتصفح)، ولو جديد بنعمله. و [[...sub]] بيفرد [[endpoint]] و [[keys]].

~~~text الناتج
subscribe laptop 204
subscribe phone 204
same endpoint again: 204 rows: 2
~~~

الـ phone اتبعت مرتين وفضلوا صفين بس.

---

## ٣. [[export async function pushTo(userId, payload) {]]

### [[for (const s of await db.pushSubscription.findMany({ where: { userId } })) {]]

كل أجهزة المستخدم، واحد ورا التاني.

### [[webpush.sendNotification({ endpoint, keys }, JSON.stringify(payload))]]

المكتبة بتشفّر الـ payload بمفاتيح الجهاز، وتوقّع JWT بمفتاح VAPID الخاص، وتبعت POST للـ endpoint. السيرفر الوهمي طبع اللي وصله:

~~~text الناتج
[push service] POST /push/laptop TTL=2419200 enc=aes128gcm body=182B auth=vapid t=eyJ0eX…
[push service] POST /push/phone TTL=2419200 enc=aes128gcm body=182B auth=vapid t=eyJ0eX…
~~~

| الـ header | معناه |
|---|---|
| [[TTL=2419200]] | خدمة الـ push تحتفظ بالرسالة لحد ٤ أسابيع (٢٤١٩٢٠٠ ثانية) لو الجهاز مقفول. ده افتراضي المكتبة |
| [[Content-Encoding: aes128gcm]] | الجسم متشفّر: خدمة Google أو Mozilla نفسها متقدرش تقراه |
| [[Authorization: vapid t=..., k=...]] | [[t]] الـ JWT الموقّع، و [[k]] المفتاح العام |
| الجسم 182B | ٦٤ byte JSON + header التشفير والـ tag |

ولو المفاتيح بايظة المكتبة بترمي قبل ما تبعت:

~~~text الناتج
bad keys: The subscription p256dh value should be 65 bytes long.
~~~

### [[.catch((e) => [404, 410].includes(e.statusCode) && db.pushSubscription.delete(...))]]

لو خدمة الـ push ردت 404 أو 410 (Gone)، الجهاز لغى الإذن أو المتصفح اتمسح، فبنمسح الصف. [[&&]] هنا معناها «لو الشرط صح نفّذ اللي بعده». خلينا السيرفر الوهمي يرد 410 للـ phone:

~~~text الناتج
-- phone revoked permission
[push service] POST /push/laptop ... body=116B
[push service] POST /push/phone ... body=116B
rows after 410: https://localhost:6020/push/laptop
~~~

وأي خطأ تاني (زي 500 أو نت) بيتبلع ومش بيوقف الـ loop، فجهاز واحد بايظ ميمنعش الباقي.

### الحجم

بعتنا ٥٠٠٠ حرف، والمكتبة بعتتهم (5120B) من غير اعتراض، بس خدمات الـ push الحقيقية بترفض الأكبر من ٤ كيلو تقريبًا (من الـ docs). عشان كده ابعت عنوان ورابط بس.

---

## ٤. الـ solCode في المتصفح (من الـ docs)

- [[navigator.serviceWorker.register("/sw.js")]]: سجّل الـ service worker، ده اللي بيصحى لما الإشعار يوصل والموقع مقفول.
- [[Notification.requestPermission()]]: نافذة الإذن، من زرار مش أول ما الصفحة تفتح.
- [[reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: VAPID_PUBLIC_KEY })]]: [[userVisibleOnly]] وعد إن كل push هيظهر إشعار (Chrome بيطلبه)، والمفتاح العام بيربط الـ subscription بسيرفرك.
- في [[sw.js]]: [[event.waitUntil(self.registration.showNotification(...))]] يخلي المتصفح يستنى لحد ما الإشعار يظهر، و [[notificationclick]] يفتح الرابط.

---

## الخلاصة

| الخطوة | مين | اتجرب؟ |
|---|---|---|
| مفاتيح VAPID | [[generate-vapid-keys]] | أيوه |
| الإذن والـ subscription | المتصفح | من الـ docs |
| التخزين بالـ endpoint | [[upsert]] | أيوه |
| التشفير والإرسال | [[sendNotification]] | أيوه (خدمة push وهمية) |
| مسح الميت | [[404]]/[[410]] → [[delete]] | أيوه |`,
          lines: [
            "مكتبة web-push.",
            "مفاتيح VAPID بتاعتك، وإيميل تواصل لخدمات الـ push.",
            "مسار تسجيل subscription للمستخدم الداخل.",
            "اتأكد من الشكل: endpoint ومفتاحين.",
            "خزّنها، ولو الـ endpoint موجود حدّث صاحبه (جهاز مشترك).",
            "رد 204.",
            "قفلة.",
            "ابعت لكل أجهزة المستخدم.",
            "لكل subscription عنده...",
            "...ابعت الـ payload متشفّر...",
            "...ولو رجع 404 أو 410، الـ subscription ماتت، امسحها.",
            "قفلة الـ loop.",
            "قفلة."
          ],
          sol: R`[[npx web-push generate-vapid-keys]] بيطبع [[Public Key:]] (حوالي 87 حرف base64url بيبدأ غالبًا بـ B) و [[Private Key:]] (43 حرف). العام بيروح للواجهة، والخاص في .env السيرفر بس.

بعد الإذن، الـ subscription اللي بتتبعت شكلها [[{"endpoint":"https://fcm.googleapis.com/fcm/send/...","expirationTime":null,"keys":{"p256dh":"...","auth":"..."}}]] (في Firefox الـ endpoint على mozilla.com). [[pushTo]] وانت قافل التاب لازم يطلّع إشعار من النظام، لأن الـ service worker بيصحى لوحده. ولو المتصفح نفسه مقفول خالص، الإشعار بيوصل أول ما يفتح (على الموبايل بيوصل عادي).

بعد ما تلغي الإذن، خدمة الـ push بترجع [[410 Gone]] (أو 404) للـ endpoint ده، والـ catch بيمسح الصف. ممكن تاخد شوية وقت قبل ما الخدمة تعرف. ولو مفيش إشعار خالص: اتأكد إن الـ SW عنده [[push]] listener بيعمل [[showNotification]] جوه [[event.waitUntil]]، وإن الصفحة على HTTPS أو localhost، وإن إشعارات النظام نفسها مش مقفولة للمتصفح.`,
          solCode: R`// public/sw.js
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(self.registration.showNotification(data.title ?? "myapp", { body: data.body, data: { url: data.url ?? "/" } }));
});
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});

// زرار «فعّل الإشعارات» في الواجهة
async function enablePush() {
  const reg = await navigator.serviceWorker.register("/sw.js");
  if ((await Notification.requestPermission()) !== "granted") return;
  const sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: VAPID_PUBLIC_KEY });
  await apiFetch("/me/push-subscriptions", { method: "POST", body: JSON.stringify(sub) });
}

// السيرفر
const PushSub = z.object({
  endpoint: z.url(),
  keys: z.object({ p256dh: z.string(), auth: z.string() }),
});
// await pushTo(userId, { title: "كورس جديد", body: "SQL من الصفر", url: "/courses/sql" });`
        }
      ]
    }
]);
