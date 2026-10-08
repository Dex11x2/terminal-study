// تكملة تاب cloud: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cloud/01.js (شرح حقول الدرس في أوله)
MORE("cloud", [
    {
      t: "S3 و CloudFront",
      l: 2,
      n: "الملفات مكانها object storage مش ديسك السيرفر، والـ CDN بيوصّلها بسرعة لأي حد",
      items: [
        {
          cmd: "aws s3",
          title: "مخزن ملفات مالوش آخر، ومقفول افتراضي",
          desc: R`S3 بيخزّن objects (ملف ومعاه key زي [[uploads/42/avatar.png]]) جوه bucket، من غير حد للحجم الكلي، وبتدفع على الجيجا المخزنة والطلبات والنقل برا AWS.

أي bucket جديد مقفول افتراضي: Block Public Access شغال بإعداداته الأربعة، والـ ACLs مقفولة. خليه كده، واللي عايزه يتعرض للناس قدّمه من CloudFront أو بـ presigned URL.`,
          example: R`aws s3 mb s3://myapp-assets --region eu-central-1
aws s3api get-public-access-block --bucket myapp-assets
aws s3 cp ./logo.png s3://myapp-assets/public/logo.png
aws s3 ls s3://myapp-assets/ --recursive --human-readable
aws s3 cp s3://myapp-assets/public/logo.png ./downloaded.png
aws s3 presign s3://myapp-assets/public/logo.png --expires-in 600`,
          try: "اعمل bucket باسم فريد (الأسماء عالمية، فحط اسمك أو رقم فيه)، وارفع صورة، وافتح رابطها العادي [[https://myapp-assets.s3.eu-central-1.amazonaws.com/public/logo.png]] في المتصفح: هيطلع AccessDenied. بعدين افتح الرابط اللي طلّعه [[presign]].",
          deep: {
            why: "لو المستخدمين بيرفعوا ملفات على ديسك السيرفر، السيرفر بقى «مش قابل للاستبدال»: مينفعش تشغّل نسختين، ولو الديسك باظ الملفات راحت، ولو نقلت لازم تنقلها. S3 بيفصل الملفات عن السيرفر: أي نسخة من التطبيق تقرا وتكتب نفس المكان، و AWS بيخزّن كل ملف في أكتر من AZ.",
            how: R`اسم الـ bucket فريد على مستوى العالم (مش حسابك بس)، وبيبقى جزء من الدومين، فحروف صغيرة وأرقام وشرطة بس. ومفيش فولدرات حقيقية: الـ [[/]] جزء من اسم الـ key، والكونسول بس بيعرضها كأنها فولدرات.

[[aws s3]] أوامر عالية المستوى زي [[cp]] و [[ls]] و [[sync]]. و [[aws s3api]] بيكلّم الـ API مباشرة بكل الإعدادات. الاتنين بيكمّلوا بعض.

الـ Block Public Access أربع إعدادات: [[BlockPublicAcls]] و [[IgnorePublicAcls]] (ميسمحش بـ ACL عامة ولا يعمل بيها)، و [[BlockPublicPolicy]] و [[RestrictPublicBuckets]] (ميسمحش بـ bucket policy بتفتح للكل). ممكن تتحط على مستوى الحساب كله، ودي أقوى حماية. ولو [[get-public-access-block]] رجّع الأربعة [[true]]، محدش يقدر يفتح الـ bucket بالغلط.

[[presign]] بيعمل رابط فيه توقيع ومدة (هنا ١٠ دقايق): اللي معاه الرابط يقرا الملف ده بس لحد ما المدة تخلص، والـ bucket لسه مقفول. من الـ CLI أو الـ SDK أقصى مدة ٧ أيام، ولو اتعمل بمفاتيح مؤقتة (role) بيموت لما المفاتيح تموت.

و S3 فيه storage classes: Standard للعادي، و Intelligent-Tiering بينقل الملفات اللي محدش بيفتحها لطبقة أرخص لوحده، و Glacier للأرشيف.`,
            when: "أي ملف المستخدم بيرفعه، وأي ملف التطبيق بيولّده (PDF، وشهادات، وتقارير)، والباك أب، وملفات الموقع الـ static.",
            mistakes: "في مشروع حقيقي كانت ملفات الـ CV اللي المتقدمين بيرفعوها في bucket عام وبيتجاب لها public URL: أي حد يلاقي الرابط يشوف بيانات شخصية. الملفات الخاصة مكانها bucket مقفول وتتفتح بـ signed URL لمدة قصيرة لليوزر المسموح له بس. وغلطة تانية: تفتح Block Public Access عشان «الصور مش ظاهرة» بدل ما تحط CloudFront قدامها."
          },
          teach: R`## الفكرة: دورة حياة ملف في S3

المثال ٦ أوامر بالترتيب: اعمل مكان، اتأكد إنه مقفول، ارفع، اعرض، نزّل، وادّي حد رابط مؤقت. اتجرّبوا كلهم بـ AWS CLI 2.37 على LocalStack (محاكي AWS في Docker، بمفاتيح وهمية [[test]])، بملف تجربة صغير اسمه [[logo.png]] (٣٠ بايت).

### كلمتين الأول

| الكلمة | معناها |
|---|---|
| S3 | Simple Storage Service: مخزن ملفات |
| bucket | «الجردل» اللي الملفات جواه. اسمه فريد في الدنيا كلها |
| object | الملف نفسه + بياناته (النوع والحجم وغيره) |
| key | اسم الملف الكامل جوه الـ bucket، زي [[public/logo.png]] |

---

## ١. [[aws s3 mb s3://myapp-assets --region eu-central-1]]

| الحتة | معناها |
|---|---|
| [[s3]] | الأوامر «المريحة» بتاعة S3 |
| [[mb]] | make bucket، نفس فكرة [[mkdir]] |
| [[s3://myapp-assets]] | عنوان الـ bucket. [[s3://]] بتقول للـ CLI «ده في S3 مش على جهازك» |
| [[--region eu-central-1]] | اعمله في فرانكفورت. الـ bucket بيعيش في region واحدة |

~~~text الناتج
make_bucket: myapp-assets
~~~

على AWS الحقيقي الاسم ده غالبًا محجوز عند حد تاني، وهيرجع [[BucketAlreadyExists]]. حط اسمك أو رقم فيه.

---

## ٢. [[aws s3api get-public-access-block --bucket myapp-assets]]

[[s3api]] غير [[s3]]: بيكلّم الـ API مباشرة، بأسامي العمليات الرسمية وكل الإعدادات. و [[get-public-access-block]] بيقرا إعدادات منع الوصول العام:

~~~text الناتج
{
    "PublicAccessBlockConfiguration": {
        "BlockPublicAcls": true,
        "IgnorePublicAcls": true,
        "BlockPublicPolicy": true,
        "RestrictPublicBuckets": true
    }
}
~~~

| الإعداد | بيمنع إيه |
|---|---|
| [[BlockPublicAcls]] | حد يحط ACL (صلاحية على ملف) بتفتحه للكل |
| [[IgnorePublicAcls]] | ولو فيه ACL عامة قديمة، اتجاهلها |
| [[BlockPublicPolicy]] | حد يحط bucket policy بتفتح للكل |
| [[RestrictPublicBuckets]] | ولو فيه policy عامة، محدش من برا الحساب يوصل |

الأربعة [[true]] = الـ bucket مقفول من كل ناحية، وده الافتراضي لأي bucket جديد.

---

## ٣. [[aws s3 cp ./logo.png s3://myapp-assets/public/logo.png]]

[[cp]] زي [[cp]] بتاع لينكس: من، لـ. من جهازك ([[./logo.png]]، و [[./]] يعني الفولدر الحالي) لـ S3.

~~~text الناتج
upload: ./logo.png to s3://myapp-assets/public/logo.png
~~~

(قبله بيظهر سطر تقدّم زي [[Completed 30 Bytes/30 Bytes]] وبيتمسح.) و [[public/]] مش فولدر اتعمل: هو جزء من اسم الـ key. S3 مفيهوش فولدرات حقيقية.

---

## ٤. [[aws s3 ls s3://myapp-assets/ --recursive --human-readable]]

| الحتة | معناها |
|---|---|
| [[ls]] | اعرض |
| [[--recursive]] | كل الملفات حتى اللي جوه «فولدرات»، مش أول مستوى بس |
| [[--human-readable]] | الحجم بـ Bytes و KiB و MiB بدل رقم البايت الخام |

~~~text الناتج
2026-10-08 10:02:49   30 Bytes public/logo.png
~~~

التاريخ والوقت (آخر تعديل)، والحجم، والـ key كامل.

---

## ٥. [[aws s3 cp s3://myapp-assets/public/logo.png ./downloaded.png]]

نفس [[cp]] بالعكس: من S3 لجهازك.

~~~text الناتج
download: s3://myapp-assets/public/logo.png to ./downloaded.png
~~~

---

## ٦. [[aws s3 presign ... --expires-in 600]]

[[presign]] بيعمل رابط موقّع، و [[--expires-in 600]] صالح ٦٠٠ ثانية = ١٠ دقايق. الأمر ده مش بيكلّم S3 خالص، بيحسب التوقيع على جهازك بمفاتيحك:

~~~text الناتج (على LocalStack، فالعنوان عنوانه)
http://teach-cloud01-ls:4566/myapp-assets/public/logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=test%2F20261008%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20261008T100251Z&X-Amz-Expires=600&X-Amz-SignedHeaders=host&X-Amz-Signature=20ce8ddc6cf8...
~~~

نفك الـ query string (اللي بعد [[?]]، وكل خانة بينها [[&]]):

| الخانة | معناها |
|---|---|
| [[X-Amz-Algorithm=AWS4-HMAC-SHA256]] | طريقة التوقيع: SigV4 |
| [[X-Amz-Credential=test/20261008/eu-central-1/s3/aws4_request]] | مين وقّع (الـ access key، هنا [[test]])، واليوم، والـ region، والخدمة. [[%2F]] هي [[/]] مكتوبة بطريقة الـ URL |
| [[X-Amz-Date]] | وقت التوقيع بالـ UTC |
| [[X-Amz-Expires=600]] | صالح كام ثانية من الوقت ده |
| [[X-Amz-SignedHeaders=host]] | الـ headers الداخلة في التوقيع |
| [[X-Amz-Signature]] | التوقيع نفسه. أي تغيير في أي حاجة فوق يبوّظه |

### جرّبناه بـ curl

| التجربة | الرد |
|---|---|
| الرابط الموقّع | محتوى الملف |
| نفس الرابط وغيّرنا آخر حرف في التوقيع | [[<Code>SignatureDoesNotMatch</Code>]] |
| رابط بـ [[--expires-in 1]] واستنينا ٣ ثواني | [[<Code>AccessDenied</Code><Message>Request has expired</Message>]] |
| bucket اسمه مش موجود | [[<Code>NoSuchBucket</Code>]] |

والرابط العادي من غير توقيع؟ على AWS الحقيقي بيرجّع [[AccessDenied]] لأن الـ bucket مقفول (من الـ docs). LocalStack رجّع الملف عادي، لأنه مبيطبّقش صلاحيات الـ bucket افتراضيًا، فدي حاجة لازم تجرّبها على AWS نفسه.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[s3 mb]] | اعمل bucket (اسم فريد في الدنيا) |
| [[s3api get-public-access-block]] | اتأكد إن الأربعة [[true]] |
| [[s3 cp]] | ارفع أو نزّل، حسب مين [[s3://]] |
| [[s3 ls --recursive --human-readable]] | كل الملفات بأحجام مقروءة |
| [[s3 presign --expires-in N]] | رابط مؤقت لملف واحد، والـ bucket يفضل مقفول |

> [[s3]] للشغل اليومي، و [[s3api]] لأي إعداد. والملف الخاص ميتفتحش للعامة أبدًا: رابط موقّع لمدة قصيرة.`,
          lines: [
            "اعمل bucket في فرانكفورت (الاسم لازم يبقى فريد في الدنيا كلها).",
            "اتأكد إن الإعدادات الأربعة لمنع الوصول العام [[true]].",
            "ارفع ملف. [[public/]] جزء من الاسم مش فولدر حقيقي.",
            "اعرض كل اللي في الـ bucket بأحجام مقروءة.",
            "نزّل ملف من S3 لجهازك.",
            "رابط مؤقت لمدة ١٠ دقايق للملف ده بس، والـ bucket لسه مقفول."
          ],
          sol: R`الأوامر بتطبع بالترتيب تقريبًا: [[make_bucket: myapp-assets-ali-7]]، وبعدين JSON فيه الأربع قيم [[BlockPublicAcls]] و [[IgnorePublicAcls]] و [[BlockPublicPolicy]] و [[RestrictPublicBuckets]] كلهم [[true]] (ده الافتراضي للـ buckets الجديدة)، وبعدين [[upload: ./logo.png to s3://.../public/logo.png]]، و [[ls]] بيطبع سطر فيه التاريخ والحجم زي [[4.2 KiB public/logo.png]].

الرابط العادي في المتصفح هيرجّع XML فيه [[<Code>AccessDenied</Code>]]، لأن الـ bucket مقفول ومفيش توقيع. والرابط اللي [[presign]] طلّعه طويل وفيه [[X-Amz-Algorithm=AWS4-HMAC-SHA256]] و [[X-Amz-Expires=600]] و [[X-Amz-Signature=...]]، وبيفتح الصورة. وبعد ١٠ دقايق نفس الرابط بيرجّع [[Request has expired]].

أخطاء شائعة: [[BucketAlreadyExists]] يعني الاسم محجوز عند حد تاني في الدنيا، زوّد اسمك أو رقم. ولو فتحت رابط المثال نفسه ([[myapp-assets]]) من غير ما تغيّر الاسم هتلاقي [[NoSuchBucket]] مش AccessDenied، لأن الـ bucket ده مش موجود أصلًا. ولو الـ presign اتعمل بمفاتيح مؤقتة (login أو SSO)، الرابط بيحتوي [[X-Amz-Security-Token]] وبيموت مع الجلسة حتى لو [[--expires-in]] أطول. ولو رجّع [[SignatureDoesNotMatch]] اتأكد إن الـ region في الأمر هي region الـ bucket.`
        },
        {
          cmd: "presigned URL",
          title: "المتصفح يرفع الملف على S3 من غير ما يعدي على سيرفرك",
          desc: R`بدل ما الملف يعدي من المتصفح لسيرفرك وبعدين لـ S3، السيرفر بيعمل «إذن رفع» مؤقت (URL موقّع) لملف واحد باسم ونوع محددين، والمتصفح يرفع عليه مباشرة بـ PUT.

السيرفر بيتحقق من اليوزر والنوع ويختار الاسم، و S3 بيشيل الملف نفسه. وفي المتصفح: [[await fetch(url, { method: "PUT", headers: { "Content-Type": file.type }, body: file })]] وبعدها يبعت الـ [[key]] للـ API.`,
          example: R`import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "node:crypto";

const s3 = new S3Client({ region: "eu-central-1", requestChecksumCalculation: "WHEN_REQUIRED" });
const ALLOWED = ["image/png", "image/jpeg", "application/pdf"];

app.post("/uploads/sign", requireAuth, async (req, res) => {
  if (!ALLOWED.includes(req.body.contentType)) return res.status(400).json({ error: "type" });
  const key = $__btuploads/$__{req.user.id}/$__{randomUUID()}$__bt;
  const cmd = new PutObjectCommand({ Bucket: "myapp-assets", Key: key, ContentType: req.body.contentType });
  const url = await getSignedUrl(s3, cmd, { expiresIn: 300, signableHeaders: new Set(["content-type"]) });
  res.json({ url, key });
});`,
          try: R`شغّل الـ route، وخد الـ url وارفع بيه من الترمنال: [[curl -X PUT -H "Content-Type: image/png" --upload-file logo.png "URL"]]. جرّب نفس الـ URL بنوع [[image/gif]] وشوف SignatureDoesNotMatch. وبعدين جرّبه من المتصفح بـ fetch، وهتقابل CORS: ظبطه بـ [[aws s3api put-bucket-cors --bucket myapp-assets --cors-configuration file://cors.json]] واسمح بـ PUT من دومينك بس.`,
          flag: "script",
          deep: {
            why: "رفع الملفات عن طريق السيرفر بياكل رام وباندويدث ووقت: الطلب ماسك اتصال لحد ما الملف كله يوصل، وبعدين السيرفر يرفعه تاني. وفي Vercel جسم الطلب ليه حد ٤.٥ ميجا، وفي Lambda ٦ ميجا. الـ presigned URL بيخلّي كل واحد يعمل شغله: السيرفر يقرر، و S3 يستقبل.",
            how: R`[[getSignedUrl]] مش بيكلّم S3 خالص. بيحسب توقيع (SigV4) بالمفاتيح اللي السيرفر شايلها (يفضل role) على: الـ method (PUT)، والـ bucket، والـ key، ووقت الانتهاء. والـ Content-Type بيدخل في التوقيع بس لو طلبته: SDK v3 افتراضيًا بيشيله من التوقيع، عشان كده المثال بيبعت [[signableHeaders: new Set(["content-type"])]]؛ من غيرها أي نوع هيعدي. التوقيع ده بيتحط في الـ query string بتاع الـ URL.

لما المتصفح يعمل PUT، S3 بيعيد نفس الحساب. لو أي حاجة اتغيرت (اسم تاني، نوع تاني، المدة خلصت) التوقيع مش هيطابق والطلب يترفض. عشان كده المتصفح لازم يبعت نفس [[Content-Type]] اللي اتوقّع.

الـ URL بيشتغل بصلاحيات اللي وقّعه. لو الـ role بتاعة السيرفر مش معاها [[s3:PutObject]] على [[uploads/*]]، الرفع هيترفض حتى لو التوقيع سليم.

المتصفح بيرفع على دومين تاني (S3)، فلازم CORS على الـ bucket: [[AllowedOrigins]] دومينك، و [[AllowedMethods]] فيها [[PUT]]، و [[AllowedHeaders]] فيها [[content-type]].

بعد الرفع، المتصفح يبعت الـ [[key]] للـ API، والسيرفر يتأكد إنه بيبدأ بـ [[uploads/USER_ID/]] بتاع اليوزر ده وإن الملف موجود ([[HeadObject]]) قبل ما يحفظه في قاعدة البيانات. والقراية بعدين بـ presigned GET أو CloudFront.

الـ PUT الواحد أقصاه ٥ جيجا، وللملفات الأكبر فيه multipart upload بأكتر من URL.`,
            when: "أي رفع من المتصفح أو الموبايل: صور، وفيديوهات، و PDF، وإثبات دفع. خصوصًا لو السيرفر صغير أو serverless.",
            mistakes: R`في مشروع حقيقي كان الـ backend بيستقبل الفيديوهات بـ multer في الرام ([[memoryStorage]]) بحد ١٠٠ ميجا، وملفات PDF لحد ٥٠٠ ميجا، وبعدين يرفعها للـ storage. كام رفعة في نفس الوقت على سيرفر ١ جيجا رام كفاية توقّع الـ process. تاني غلطة: تسيب المتصفح يختار الـ key فيكتب فوق ملف حد تاني. تالت: [[expiresIn]] بالساعات بدل الدقايق. رابع: الـ PUT الموقّع مبيحددش حجم أقصى، فلو محتاج حد استخدم presigned POST مع [[content-length-range]].`
          },
          teach: R`## الفكرة: السيرفر بيدّي «تذكرة»، و S3 بيستلم الملف

الكود route في Express بيعمل حاجة واحدة: يتأكد من اليوزر ونوع الملف، يختار اسم، ويرجّع URL موقّع. السيرفر نفسه مبيشوفش الملف خالص.

~~~text
المتصفح  ── POST /uploads/sign {contentType} ──►  سيرفرك   (يتحقق ويوقّع)
المتصفح  ◄── { url, key } ─────────────────────   سيرفرك
المتصفح  ── PUT url + الملف ───────────────────►  S3       (يتأكد من التوقيع ويحفظ)
~~~

اتجرّب فعلًا: نفس الكود في [[node:22-slim]] بـ Express 5 و AWS SDK 3.1147، والـ [[S3Client]] متوجّه لـ LocalStack (محاكي AWS في Docker) بـ [[endpoint]] و [[forcePathStyle]]، و [[requireAuth]] وهمي بيحط [[req.user.id = 42]]. والرفع بـ [[curl]].

---

## ١. الـ imports

~~~js
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "node:crypto";
~~~

| الاسم | جاي منين | بيعمل إيه |
|---|---|---|
| [[S3Client]] | [[@aws-sdk/client-s3]] | الكلاينت اللي بيكلّم S3 |
| [[PutObjectCommand]] | نفس الباكدج | وصف عملية «ارفع ملف» (من غير ما تتنفذ) |
| [[getSignedUrl]] | [[@aws-sdk/s3-request-presigner]] | ياخد الوصف ويطلّع URL موقّع |
| [[randomUUID]] | [[node:crypto]] (جوه Node) | اسم عشوائي زي [[3d30da63-8086-43cc-...]] مبيتكررش |

SDK v3 مقسوم باكدجات صغيرة، فبتسطّب اللي محتاجه بس: [[npm i @aws-sdk/client-s3 @aws-sdk/s3-request-presigner]].

---

## ٢. الكلاينت والأنواع المسموحة

~~~js
const s3 = new S3Client({ region: "eu-central-1", requestChecksumCalculation: "WHEN_REQUIRED" });
const ALLOWED = ["image/png", "image/jpeg", "application/pdf"];
~~~

- [[region]]: لازم تبقى region الـ bucket، لأنها داخلة في التوقيع.
- مفيش مفاتيح مكتوبة: الـ SDK بيدوّر لوحده (متغيرات البيئة، أو الـ role على AWS).
- [[requestChecksumCalculation: "WHEN_REQUIRED"]]: النسخ الجديدة من الـ SDK بتحسب checksum لكل رفع افتراضيًا. ومع الـ presign مفيش ملف وقت التوقيع، فبيحسب checksum لملف فاضي ويحطه في الـ URL. جرّبنا من غيرها والـ URL طلع فيه:

~~~text جزء من الـ URL من غير WHEN_REQUIRED
&x-amz-checksum-crc32=AAAAAA%3D%3D&x-amz-sdk-checksum-algorithm=CRC32
~~~

[[AAAAAA==]] ده الـ CRC32 لصفر بايت. S3 الحقيقي بيقارنه بالملف اللي اترفع فيرفضه (LocalStack قبله عادي، فدي من الـ docs ومن مشكلة معروفة في الـ SDK). ومع [[WHEN_REQUIRED]] السطرين دول اختفوا من الـ URL.

- [[ALLOWED]]: قايمة الـ MIME types المسموحة. الـ MIME type هو نوع الملف بالشكل اللي الويب فاهمه: [[image/png]] و [[application/pdf]].

---

## ٣. الـ route

~~~js
app.post("/uploads/sign", requireAuth, async (req, res) => {
~~~

| الحتة | معناها |
|---|---|
| [[app.post]] | لما ييجي طلب POST |
| [[/uploads/sign]] | على المسار ده |
| [[requireAuth]] | middleware بيشتغل الأول: مش مسجّل دخول؟ يرفض. مسجّل؟ يحط [[req.user]] ويكمّل |
| [[async (req, res) =>]] | الدالة الأساسية. [[async]] لأن جواها [[await]] |

### التحقق من النوع

~~~js
if (!ALLOWED.includes(req.body.contentType)) return res.status(400).json({ error: "type" });
~~~

[[req.body.contentType]] النوع اللي المتصفح بعته (من [[file.type]]). [[includes]] موجود في القايمة؟ لو لأ ([[!]])، رد بـ 400 (طلب غلط) و [[return]] عشان الدالة متكمّلش. جرّبنا [[image/gif]]:

~~~text الناتج
{"error":"type"} 400
~~~

### الاسم

~~~js
const key = $__btuploads/$__{req.user.id}/$__{randomUUID()}$__bt;
~~~

ده template literal: نص بين علامتين [[$__bt]] وجواه [[$__{...}]] بتتبدل بقيمتها. فاليوزر 42 بياخد [[uploads/42/3d30da63-8086-43cc-9ac6-c7f8fe630035]]. السيرفر هو اللي بيختار، فاليوزر ميقدرش يكتب فوق ملف حد تاني.

### وصف الرفع

~~~js
const cmd = new PutObjectCommand({ Bucket: "myapp-assets", Key: key, ContentType: req.body.contentType });
~~~

[[new]] بيعمل object من الـ class. ده **وصف** بس: «ارفع على الـ bucket ده بالاسم ده بالنوع ده». محدش بعته لـ S3.

### التوقيع

~~~js
const url = await getSignedUrl(s3, cmd, { expiresIn: 300, signableHeaders: new Set(["content-type"]) });
~~~

| الحتة | معناها |
|---|---|
| [[await getSignedUrl(s3, cmd, ...)]] | وقّع الوصف ده بمفاتيح الكلاينت. بيتحسب على السيرفر، من غير طلب لـ S3 |
| [[expiresIn: 300]] | صالح ٣٠٠ ثانية = ٥ دقايق |
| [[signableHeaders]] | الـ headers اللي لازم تدخل في التوقيع |
| [[new Set(["content-type"])]] | Set مجموعة من غير تكرار، فيها اسم header واحد |

ليه [[signableHeaders]]؟ جرّبنا نوقّع نفس الوصف مرتين وطبعنا [[X-Amz-SignedHeaders]] من الـ URL:

~~~text الناتج
host                (من غير signableHeaders)
content-type;host   (بيها)
~~~

من غيرها الـ Content-Type مش داخل في التوقيع، فالمتصفح يقدر يرفع أي نوع على نفس الـ URL، وتحقق [[ALLOWED]] فوق يبقى ملوش لازمة.

### الرد

~~~js
res.json({ url, key });
~~~

[[{ url, key }]] اختصار لـ [[{ url: url, key: key }]].

~~~text الناتج (على LocalStack)
{"url":"http://teach-cloud01-ls:4566/myapp-assets/uploads/42/3d30da63-...?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=test%2F20261008%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20261008T100535Z&X-Amz-Expires=300&X-Amz-Signature=e492ae43...&X-Amz-SignedHeaders=content-type%3Bhost&x-id=PutObject","key":"uploads/42/3d30da63-8086-43cc-9ac6-c7f8fe630035"}
~~~

على AWS الحقيقي أول الـ URL بيبقى [[https://myapp-assets.s3.eu-central-1.amazonaws.com/uploads/42/...]]. و [[UNSIGNED-PAYLOAD]] يعني محتوى الملف نفسه مش داخل في التوقيع (لأنه مكانش موجود)، و [[%3B]] هي [[;]].

---

## ٤. الرفع بالـ URL

~~~bash
curl -X PUT -H "Content-Type: image/png" --upload-file logo.png "URL"
~~~

| الحتة | معناها |
|---|---|
| [[-X PUT]] | الـ method، ولازم PUT زي ما اتوقّع |
| [[-H "Content-Type: image/png"]] | نفس النوع اللي اتوقّع بالظبط |
| [[--upload-file logo.png]] | الملف هو الـ body |
| [["URL"]] | بين علامتين، لأن فيه [[&]] والـ shell بيفهمها «شغّل في الخلفية» |

| التجربة | الرد |
|---|---|
| [[image/png]] (زي التوقيع) | [[200]] من غير body، والملف ظهر في [[aws s3 ls s3://myapp-assets/uploads/42/]] |
| نفس الـ URL بـ [[image/gif]] | [[SignatureDoesNotMatch]] |

وفي المتصفح نفس الحركة بـ [[fetch(url, { method: "PUT", headers: { "Content-Type": file.type }, body: file })]]، ومحتاجة CORS على الـ bucket (الـ solCode).

---

## الخلاصة

| الخطوة | مين | بيعمل إيه |
|---|---|---|
| ١ | السيرفر | يتأكد من اليوزر ([[requireAuth]]) والنوع ([[ALLOWED]]) |
| ٢ | السيرفر | يختار الـ key: [[uploads/USER/UUID]] |
| ٣ | السيرفر | [[getSignedUrl]] لـ ٥ دقايق، والـ Content-Type داخل في التوقيع |
| ٤ | المتصفح | PUT مباشرة لـ S3 بنفس النوع |
| ٥ | المتصفح ثم السيرفر | يبعت الـ [[key]] للـ API، والسيرفر يتأكد منه ويحفظه |

> الـ URL بيشتغل بصلاحيات اللي وقّعه، فالـ role بتاعة السيرفر محتاجة [[s3:PutObject]] على [[uploads/*]].`,
          lines: [
            "كلاينت S3 والأمر اللي هنوقّعه.",
            "الدالة اللي بتوقّع من غير ما تكلّم S3.",
            "عشان أسامي ملفات عشوائية مبتتكررش.",
            "الكلاينت مرة واحدة، وبياخد صلاحياته من الـ role. و WHEN_REQUIRED عشان الـ SDK ميحطّش checksum لملف فاضي في الـ URL فالرفع يفشل.",
            "الأنواع المسموحة بس.",
            "route محمي: لازم اليوزر يبقى مسجّل دخول.",
            "نوع مش مسموح؟ ارفض.",
            "السيرفر هو اللي يختار الاسم: فولدر لكل يوزر واسم عشوائي.",
            "وصف الرفع: الـ bucket والاسم والنوع (المتصفح لازم يبعت نفس النوع).",
            "وقّع لمدة ٥ دقايق، وخلّي الـ Content-Type جزء من التوقيع (SDK v3 مش بيوقّعه لوحده).",
            "رجّع الـ URL والـ key للمتصفح.",
            "قفلة الـ route."
          ],
          sol: R`الـ route بيرجّع JSON فيه [[key]] زي [[uploads/42/0e2027a6-...]] و [[url]] فيه [[X-Amz-SignedHeaders=content-type%3Bhost]]، يعني الـ Content-Type داخل في التوقيع. وطلب بنوع [[image/gif]] للـ route نفسه بيرجع [[400 {"error":"type"}]] من السيرفر. والرفع بـ curl بنوع [[image/png]] يرجّع 200 من غير body، والملف يظهر في [[aws s3 ls s3://myapp-assets/uploads/42/]]. ولو غيّرت الـ header في curl لـ [[image/gif]] على نفس الـ URL، S3 يرجّع 403 [[SignatureDoesNotMatch]].

مهم: نسخ SDK v3 من أول 3.729 بتحسب checksum تلقائي، ومع الـ presign مفيش body وقت التوقيع، فالـ URL بيطلع فيه [[x-amz-checksum-crc32=AAAAAA%3D%3D]] (checksum لملف فاضي)، وأي رفع لملف حقيقي عليه بيفشل برسالة checksum. جرّبتها على 3.1143 والـ URL طلع فيه السطر ده فعلًا. الحل اللي في المثال دلوقتي: [[requestChecksumCalculation: "WHEN_REQUIRED"]] في الـ [[S3Client]]، وبعدها الـ URL بيطلع من غير checksum.

الـ CORS: من المتصفح من غير CORS هتشوف في الـ console [[blocked by CORS policy]] والطلب نفسه اتبعت كـ preflight [[OPTIONS]] واترفض. بعد [[put-bucket-cors]] بالملف اللي تحت، الـ fetch يعدّي. ولو حطيت [[AllowedOrigins: ["*"]]] هيشتغل برضه، بس ده بيسمح لأي موقع يستخدم روابطك.`,
          solCode: R`cat > cors.json <<'EOF'
{
  "CORSRules": [{
    "AllowedOrigins": ["https://myapp.example.com", "http://localhost:5173"],
    "AllowedMethods": ["PUT"],
    "AllowedHeaders": ["content-type"],
    "MaxAgeSeconds": 3000
  }]
}
EOF
aws s3api put-bucket-cors --bucket myapp-assets --cors-configuration file://cors.json
aws s3api get-bucket-cors --bucket myapp-assets`
        },
        {
          cmd: "S3 + CloudFront",
          title: "ارفع build بتاع React وقدّمه من CDN",
          desc: R`موقع static (Vite أو React أو Next.js بـ [[output: 'export']]) مجرد ملفات، والطريقة الحديثة: bucket مقفول و CloudFront قدامه بيقرا منه عن طريق OAC (Origin Access Control)، فتاخد HTTPS ودومين وكاش في كل العالم.

الملفات اللي أسماءها فيها hash ([[assets/index-a1b2c3.js]]) كاشها سنة، و [[index.html]] من غير كاش، عشان أول ما ترفع نسخة جديدة الناس تشوفها.`,
          example: R`npm run build
aws s3 sync ./dist/assets s3://myapp-site/assets --cache-control "public,max-age=31536000,immutable"
aws s3 cp ./dist/index.html s3://myapp-site/index.html --cache-control "no-cache"
aws cloudfront create-invalidation --distribution-id E1ABCDEF2GHIJK --paths "/index.html"`,
          try: "اعمل distribution من الكونسول: الـ origin هو الـ bucket، واختار Origin access control (الكونسول بيعرض يحدّث الـ bucket policy)، و Default root object [[index.html]]. ارفع بالأوامر وافتح رابط cloudfront.net. بعدين افتح [[/about]] مباشرة وشوف هيحصل إيه.",
          deep: {
            why: "S3 عنده «static website hosting» قديم، بس ده HTTP بس ومحتاج الـ bucket يبقى عام. CloudFront بيحل الاتنين: HTTPS بشهادة ببلاش من ACM، والـ bucket يفضل مقفول ومحدش يوصله غير CloudFront، والملفات بتتقدّم من أقرب نقطة للزائر.",
            how: R`OAC بيخلّي CloudFront يوقّع طلباته لـ S3. والـ bucket policy بتسمح لخدمة [[cloudfront.amazonaws.com]] تعمل [[s3:GetObject]] بشرط إن [[AWS:SourceArn]] هو الـ distribution بتاعك بس. يعني حتى لو حد عرف اسم الـ bucket مش هيقدر يقرا منه مباشرة. (OAI القديم لسه موجود، بس AWS بتنصح بـ OAC.)

مشكلة الـ SPA: لما حد يفتح [[/about]] مباشرة، CloudFront بيطلب [[about]] من S3، والملف مش موجود. ولأن الـ bucket مقفول، S3 بيرجّع 403 مش 404. الحل في Custom error responses: 403 و 404 يرجّعوا [[/index.html]] بكود 200، و React Router يكمّل.

ترتيب الرفع مهم: الـ assets الأول ثم [[index.html]]. لو عكست، فيه لحظة [[index.html]] الجديدة بتطلب ملف JS لسه مترفعش. والملفات القديمة في [[assets/]] سيبها شوية، لأن حد فاتح الصفحة القديمة لسه بيطلبها.

[[Cache-Control]] اللي بتحطه على الـ object بيرجع مع الملف، و CloudFront والمتصفح بيحترموه (في حدود الـ cache policy). [[immutable]] بيقول للمتصفح «متسألش تاني خالص»، وده آمن لأن أي تعديل بيطلع اسم جديد.

وباقي الملفات ([[favicon.ico]] و [[robots.txt]]): [[aws s3 sync ./dist s3://myapp-site --exclude "assets/*" --exclude index.html]].`,
            when: "أي frontend مش محتاج server rendering: لوحة تحكم، أو landing page، أو موقع Vite. أرخص وأسرع من تشغيله على سيرفر.",
            mistakes: "تفعّل static website hosting وتفتح الـ bucket للعامة عشان «أسهل». وتنسى الـ custom error responses، فالموقع شغال من الرئيسية بس وأي refresh على صفحة داخلية يطلع AccessDenied. وترفع [[index.html]] بكاش طويل، فالناس تفضل تشوف النسخة القديمة أيام. وتعمل invalidation لـ [[/*]] مع كل رفعة بدل ما تعتمد على الأسماء اللي فيها hash."
          },
          teach: R`## الفكرة: ٤ أوامر لكل deploy، والترتيب مهم

الـ distribution نفسه (CloudFront قدام الـ bucket بـ OAC) بيتعمل مرة واحدة من الكونسول زي ما الـ try بيقول. الأوامر الأربعة دي هي اللي بتعيدها كل مرة تنشر نسخة جديدة: ابني، ارفع الملفات الثابتة بكاش طويل، ارفع [[index.html]] بكاش صفر، وقول لـ CloudFront ينسى [[index.html]] القديمة.

أوامر S3 اتجرّبت بـ AWS CLI 2.37 على LocalStack (محاكي AWS في Docker)، على فولدر [[dist]] صغير عملناه بإيدنا فيه نفس الشكل اللي Vite بيطلّعه. CloudFront مش موجود في LocalStack المجاني، فأمره من الـ docs ومن الـ help.

---

## ١. [[npm run build]]

بيشغّل سكربت [[build]] من [[package.json]] (في Vite ده [[vite build]])، والنتيجة فولدر [[dist]]:

~~~text شكل dist
dist/
  index.html
  favicon.ico
  assets/
    index-a1b2c3.js
    index-d4e5f6.css
~~~

الحروف اللي بعد [[index-]] اسمها **hash**: بصمة محسوبة من محتوى الملف. غيّرت سطر في الكود؟ الـ hash بيتغير والاسم بيتغير. وده سر الكاش كله: الملف اللي اسمه [[index-a1b2c3.js]] عمره ما هيتغير، لأن أي نسخة جديدة هتبقى اسم تاني.

و [[index.html]] اسمه ثابت دايمًا، وهو اللي جواه أسامي ملفات الـ JS الحالية.

---

## ٢. [[aws s3 sync ./dist/assets ... --cache-control "..."]]

~~~bash
aws s3 sync ./dist/assets s3://myapp-site/assets --cache-control "public,max-age=31536000,immutable"
~~~

| الحتة | معناها |
|---|---|
| [[sync]] | خلّي المكانين زي بعض: ارفع الجديد والمتغيّر بس |
| [[./dist/assets]] | من هنا |
| [[s3://myapp-site/assets]] | لـ هنا |
| [[--cache-control "..."]] | الـ header اللي هيتحفظ مع كل ملف ويرجع معاه لكل زائر |

### الـ Cache-Control حتة حتة

| الحتة | معناها |
|---|---|
| [[public]] | مسموح لأي كاش في السكة (CloudFront والمتصفح) يحتفظ بيه |
| [[max-age=31536000]] | لمدة ٣١٥٣٦٠٠٠ ثانية = ٣٦٥ يوم × ٢٤ × ٦٠ × ٦٠ = سنة |
| [[immutable]] | متسألش السيرفر «اتغيّر؟» خالص، حتى لو اليوزر عمل refresh |

~~~text الناتج
upload: dist/assets/index-a1b2c3.js to s3://myapp-site/assets/index-a1b2c3.js
upload: dist/assets/index-d4e5f6.css to s3://myapp-site/assets/index-d4e5f6.css
~~~

وشغّلناه تاني من غير ما نغيّر حاجة: مطبعش ولا سطر. [[sync]] بيقارن الحجم ووقت التعديل، ومبيرفعش اللي زي ما هو.

---

## ٣. [[aws s3 cp ./dist/index.html ... --cache-control "no-cache"]]

[[no-cache]] اسمه مضلل: مش معناه «متكاشش». معناه «احتفظ بيه، بس اسأل السيرفر قبل ما تستخدمه كل مرة». فأول ما ترفع [[index.html]] جديد، الزائر الجاي ياخده.

~~~text الناتج
upload: dist/index.html to s3://myapp-site/index.html
~~~

### اتأكد اللي اتحفظ

[[s3api head-object]] بيجيب بيانات الملف من غير الملف نفسه:

~~~text aws s3api head-object --bucket myapp-site --key assets/index-a1b2c3.js --query "[CacheControl,ContentType]"
[
    "public,max-age=31536000,immutable",
    "text/javascript"
]
~~~

~~~text نفس الأمر على index.html
[
    "no-cache",
    "text/html"
]
~~~

و [[ContentType]] الـ CLI خمّنه لوحده من الامتداد ([[.js]] و [[.html]]). لو اتحفظ غلط (زي [[binary/octet-stream]])، المتصفح ممكن ينزّل الصفحة بدل ما يعرضها.

### ليه [[index.html]] في الآخر؟

لو رفعته الأول، فيه لحظة [[index.html]] الجديد بيطلب [[index-NEW.js]] اللي لسه مترفعش، والزائر يشوف صفحة بيضا. لما الـ assets تترفع الأول، [[index.html]] الجديد ميطلعش غير والملفات اللي بيطلبها موجودة.

### وباقي الملفات

~~~bash
aws s3 sync ./dist s3://myapp-site --exclude "assets/*" --exclude index.html
~~~

~~~text الناتج
upload: dist/favicon.ico to s3://myapp-site/favicon.ico
~~~

[[--exclude]] سيب اللي بيطابق ده، فرفع [[favicon.ico]] بس.

---

## ٤. [[aws cloudfront create-invalidation ...]]

~~~bash
aws cloudfront create-invalidation --distribution-id E1ABCDEF2GHIJK --paths "/index.html"
~~~

| الحتة | معناها |
|---|---|
| [[create-invalidation]] | قول لكل الـ edges حوالين العالم: ارموا النسخة اللي عندكم |
| [[--distribution-id E1ABCDEF2GHIJK]] | أنهي distribution (الـ ID بيبدأ بـ E) |
| [[--paths "/index.html"]] | الملف ده بس. المسار بيبدأ بـ [[/]] |

ليه محتاجينه مع إن [[index.html]] عليه [[no-cache]]؟ لأن CloudFront ممكن يكون خد نسخة قبل كده بإعدادات الـ cache policy بتاعته. الـ invalidation بيضمن إن الـ edge يجيب الجديدة. والـ assets مش محتاجة invalidation أصلًا: أسماءها جديدة. الرد (من الـ docs) فيه [[Invalidation.Id]] و [[Status: InProgress]]، وتفاصيله في الدرس الجاي.

---

## الخلاصة

| الترتيب | الأمر | الكاش | ليه |
|---|---|---|---|
| ١ | [[npm run build]] | | أسامي فيها hash |
| ٢ | [[s3 sync dist/assets]] | سنة + [[immutable]] | الاسم بيتغير مع أي تعديل |
| ٣ | [[s3 cp index.html]] | [[no-cache]] | اسمه ثابت، ولازم يتحدّث فورًا |
| ٤ | [[create-invalidation /index.html]] | | نسخة الـ edge القديمة تتشال |

> الـ bucket يفضل مقفول، و CloudFront بس اللي بيقرا منه (OAC). وصفحات الـ SPA الداخلية زي [[/about]] محتاجة custom error response ترجّع [[/index.html]].`,
          lines: [
            "ابني الموقع في dist.",
            "ارفع الـ assets (أسماءها فيها hash) بكاش سنة، و immutable.",
            "ارفع index.html في الآخر، من غير كاش.",
            "قول لـ CloudFront يرمي نسخته القديمة من index.html بس."
          ],
          sol: R`بعد الرفع، رابط [[https://dXXXX.cloudfront.net/]] المفروض يفتح الموقع (بسبب Default root object). بس [[/about]] مباشرة هيرجّع XML فيه [[<Code>AccessDenied</Code>]] بكود 403، مش 404، لأن CloudFront بيطلب ملف اسمه [[about]] من S3، والملف مش موجود، والـ bucket مقفول ومفيش [[s3:ListBucket]]، فـ S3 بيقول 403 بدل ما يعترف إن الملف مش موجود.

الحل: في الـ distribution، Error pages، اعمل custom error response لـ 403 (و 404) بـ Response page path [[/index.html]] و HTTP response code 200. بعد ما التعديل يخلص deploy، [[curl -sI https://dXXXX.cloudfront.net/about]] يرجّع [[HTTP/2 200]] والصفحة تفتح و React Router يعرض [[/about]].

لو الرئيسية نفسها رجّعت AccessDenied، يبقى الـ bucket policy مش متحدّثة بالـ OAC (انسخ الـ policy اللي الكونسول بيعرضها وحطها في الـ bucket)، أو Default root object فاضي. ولو ظهرت صفحة بيضا والـ console فيه 403 على ملفات [[/assets/]]، يبقى رفعت [[dist/assets]] لمسار غلط.`
        },
        {
          cmd: "CloudFront cache",
          title: "الـ CDN بيكاش إيه ولمدة قد إيه",
          desc: R`CloudFront عنده مئات النقط حوالين العالم (edge locations): أول زائر من منطقة بيجيب الملف من الـ origin والـ edge يحتفظ بيه، واللي بعده ياخده من الـ edge مباشرة، والهيدر [[x-cache]] بيقولك Hit ولا Miss.

مدة الكاش بتتحدد من [[Cache-Control]] اللي الـ origin بيبعته، في حدود الـ min و max TTL في الـ cache policy. ولو غيّرت ملف ومستعجل، اعمل invalidation.`,
          example: R`curl -sI https://d111111abcdef8.cloudfront.net/assets/index-a1b2c3.js | grep -i -E "x-cache|age|cache-control"
curl -sI https://d111111abcdef8.cloudfront.net/assets/index-a1b2c3.js | grep -i -E "x-cache|age"
aws cloudfront create-invalidation --distribution-id E1ABCDEF2GHIJK --paths "/blog/*" "/index.html"
aws cloudfront get-invalidation --distribution-id E1ABCDEF2GHIJK --id I2J3K4L5M6N7O8
aws cloudfront list-distributions --query "DistributionList.Items[].[Id,Origins.Items[0].DomainName]" --output table`,
          try: "اطلب نفس الملف مرتين وشوف [[x-cache]] يتحول من Miss لـ Hit، و [[age]] (عمر النسخة بالثواني) بيزيد. بعدين اعمل invalidation واطلبه تاني.",
          deep: {
            why: "من غير CDN كل زائر من الخليج أو أوروبا بيعدي لحد سيرفرك، والسيرفر بيدفع باندويدث على كل ملف. مع CDN معظم الطلبات بتخلص عند الـ edge: أسرع للزائر، وأقل حمل وتكلفة عليك. والنقل من S3 لـ CloudFront ببلاش، و CloudFront نفسه عنده حصة مجانية كل شهر.",
            how: R`الـ cache key هو اللي بيحدد «ده نفس الطلب ولا لأ»: افتراضي الدومين والمسار. لو ضفت query strings أو headers أو cookies للـ key، كل قيمة مختلفة بتبقى نسخة لوحدها، ونسبة الـ Hit بتقع. عشان كده الـ managed policy اللي اسمها [[CachingOptimized]] مبتحطش cookies ولا query strings.

الـ TTL: CloudFront بيحترم [[max-age]] أو [[s-maxage]] (الأخير للـ CDN بس) في حدود الـ min والـ max بتوع الـ policy. لو الـ origin مبعتش حاجة، بيستخدم الـ default (يوم في CachingOptimized).

للـ API: behavior لوحده لـ [[/api/*]] بـ [[CachingDisabled]]، فـ CloudFront يبقى مجرد proxy سريع. متكاشش حاجة فيها بيانات يوزر إلا لو الـ key فيه اللي يميّز اليوزر، وإلا يوزر يشوف بيانات يوزر تاني.

الـ invalidation بتقول لكل الـ edges «ارمي النسخة دي». أول ١٠٠٠ path في الشهر ببلاش على مستوى الحساب، و [[/*]] بيتحسب path واحد مهما كان عدد الملفات. بس بتاخد وقت تخلص، والأحسن دايمًا أسماء فيها hash.

و [[x-cache: RefreshHit]] يعني الـ edge سأل الـ origin «اتغير؟» ورد «لأ»، فرجّع النسخة اللي عنده.`,
            when: "الملفات الثابتة، وصور المستخدمين (مع signed URLs للخاص)، والصفحات العامة اللي مش بتتغير لكل يوزر.",
            mistakes: "تكاش [[/api/me]] فيوزر يشوف بيانات يوزر تاني. وتحط كل الـ query strings في الـ cache key فكل [[?utm_source=]] نسخة جديدة. وتعتمد على invalidation بعد كل deploy ومش فاهم ليه ناس شايفة القديم دقايق. وتنسى إن المتصفح نفسه عنده كاش: invalidation في CloudFront مبتمسحش كاش متصفح اتقاله [[max-age=31536000]]."
          },
          teach: R`## الفكرة: اسأل الـ headers، هي بتقولك كل حاجة

أول سطرين في المثال بيطلبوا نفس الملف مرتين ويبصوا على ٣ headers: الملف جه من الكاش ولا لأ، وعمره كام، ومسموح يتكاش قد إيه. وبعدهم ٣ أوامر AWS: ارمي من الكاش، وشوف الرمي خلص ولا لأ، واعرض الـ distributions.

الـ [[d111111abcdef8]] في المثال اسم مثال مش موجود. فجرّبنا نفس الـ [[curl]] على ملفات حقيقية بيقدّمها CloudFront (صور موقع AWS نفسه على [[awsstatic.com]])، من جهاز في القاهرة. وأوامر [[aws cloudfront]] محتاجة حساب حقيقي (ومش موجودة في LocalStack المجاني)، فشكلها من الـ docs.

---

## ١. السطر الأول: [[curl -sI ... | grep -i -E "..."]]

~~~bash
curl -sI https://d111111abcdef8.cloudfront.net/assets/index-a1b2c3.js | grep -i -E "x-cache|age|cache-control"
~~~

| الحتة | معناها |
|---|---|
| [[curl]] | ابعت طلب |
| [[-s]] | silent: من غير شريط تقدّم |
| [[-I]] | HEAD: هات الـ headers بس من غير الملف |
| [[grep]] | اطبع السطور اللي فيها كلمة معينة |
| [[-i]] | متفرّقش بين الحروف الكبيرة والصغيرة ([[X-Cache]] زي [[x-cache]]) |
| [[-E]] | regex «موسّع» (Extended) |

وفيه علامة [[|]] بمعنيين في نفس السطر:

- بين [[curl]] و [[grep]] اسمها pipe: ابعت ناتج الأمر الأول للتاني.
- جوه [["x-cache|age|cache-control"]] (بسبب [[-E]]) معناها «أو»: أي سطر فيه واحدة من التلاتة.

### أول طلب لملف محدش طلبه قريب

~~~text الناتج (الطلب الأول)
cache-control: max-age=31536000
x-cache: Miss from cloudfront
~~~

[[Miss from cloudfront]]: الـ edge مكانش عنده الملف، فراح جابه من الـ origin (الـ bucket أو السيرفر) واحتفظ بيه. ومفيش [[age]] لأنه لسه جاي طازة.

### بعدها بثواني

~~~text الناتج (طلبات بعدها، كل واحد بعد ثانيتين)
x-cache: Hit from cloudfront
x-amz-cf-pop: CAI50-P1
age: 8

x-cache: Hit from cloudfront
x-amz-cf-pop: CAI50-P1
age: 10
~~~

| الـ header | معناه |
|---|---|
| [[x-cache: Hit from cloudfront]] | الرد جه من الـ edge، والـ origin محدش كلّمه |
| [[age: 8]] | النسخة دي في الكاش بقالها ٨ ثواني، وبتزيد مع الوقت |
| [[cache-control: max-age=31536000]] | الـ origin قال: احتفظوا بيه سنة |
| [[x-amz-cf-pop: CAI50-P1]] | أنهي edge رد. [[CAI]] كود مطار القاهرة: فيه نقطة CloudFront في القاهرة نفسها |

### ملاحظة: جالنا Miss مرتين الأول

في التجربة الحقيقية أول طلبين الاتنين طلعوا [[Miss]]، وبعدها [[Hit]]. ليه؟ الدومين ده بيرجع ٤ عناوين IP مختلفة ([[getent ahosts]] طلّع ٤)، فكل طلب ممكن يروح لسيرفر مختلف جوه نفس الـ edge، وكل واحد ليه كاشه لحد ما يتملي. فـ Miss مرتين مش معناه إن الكاش بايظ.

### صورة مشهورة: [[age]] بالأيام

على لوجو AWS (ملف بيتطلب طول الوقت):

~~~text الناتج
content-type: image/png
cache-control: max-age=31536000
x-cache: Hit from cloudfront
age: 5771615
~~~

[[5771615]] ثانية = حوالي ٦٧ يوم في الكاش. وده مسموح لأن [[max-age]] سنة.

### فخ في الـ grep

لاحظ [[content-type: image/png]] طلعت مع إنها مش من التلاتة! لأن [[image]] جواها [[age]]، و [[grep]] بيدوّر على الحروف في أي حتة في السطر. لو عايز [[age]] بس: [[grep -i -E "^age|x-cache"]]، و [[^]] يعني «في أول السطر».

### والـ query string؟

جرّبنا نفس اللوجو بـ [[?teach=]] ورقم عشوائي، وطلع [[Hit]] برضه بنفس الـ [[age]]. يعني الـ cache policy بتاعة الموقع ده مش حاطة الـ query string في الـ cache key، زي [[CachingOptimized]]. لو كانت حاطاه، كل رقم كان هيبقى نسخة جديدة و [[Miss]].

---

## ٢. [[aws cloudfront create-invalidation ...]]

~~~bash
aws cloudfront create-invalidation --distribution-id E1ABCDEF2GHIJK --paths "/blog/*" "/index.html"
~~~

| الحتة | معناها |
|---|---|
| [[--distribution-id]] | أنهي distribution |
| [[--paths]] | قايمة مسارات بمسافة بينها |
| [["/blog/*"]] | كل اللي تحت [[/blog/]]، وبيتحسب **path واحد** مهما كان عدد الملفات |
| [["/index.html"]] | ملف واحد |

العلامات حوالين [["/blog/*"]] مهمة: من غيرها الـ shell ممكن يحاول يفك النجمة لأسامي ملفات عندك. الرد (من الـ docs) فيه [[Invalidation.Id]] زي [[I2J3K4L5M6N7O8]] و [[Status: InProgress]].

---

## ٣. [[aws cloudfront get-invalidation ...]]

بالـ [[--id]] اللي رجع من اللي فات: [[InProgress]] لسه شغال، و [[Completed]] خلص في كل الـ edges (غالبًا دقيقة أو اتنين). والطلب اللي بعده يرجع [[Miss]] مرة، وبعدين [[Hit]] تاني.

---

## ٤. [[aws cloudfront list-distributions ...]]

~~~bash
aws cloudfront list-distributions --query "DistributionList.Items[].[Id,Origins.Items[0].DomainName]" --output table
~~~

[[Origins.Items[0]]] أول origin في القايمة ([[[0]]] أول عنصر، العد من صفر)، و [[.DomainName]] عنوانه، زي [[myapp-site.s3.eu-central-1.amazonaws.com]]. فالجدول بيقولك كل distribution بيقرا من فين. ومنه بتجيب الـ ID اللي الأوامر اللي فوق محتاجاه.

---

## الخلاصة

| اللي شايفه | معناه |
|---|---|
| [[Miss from cloudfront]] | الـ edge جاب من الـ origin |
| [[Hit from cloudfront]] | من الكاش |
| [[RefreshHit from cloudfront]] | الـ edge سأل الـ origin «اتغير؟» ورد «لأ» |
| [[age: N]] | عمر النسخة بالثواني |
| [[x-amz-cf-pop]] | أنهي edge رد |

> المدة بتيجي من [[Cache-Control]] بتاع الـ origin في حدود الـ cache policy. والـ invalidation علاج للطوارئ: الحل الدايم أسامي فيها hash.`,
          lines: [
            "أول طلب: شوف x-cache و age و Cache-Control.",
            "تاني طلب: المفروض Hit، و age بيعدّ.",
            "ارمي من الكاش كل صفحات المدونة وملف index (كل واحد path).",
            "حالة الـ invalidation: InProgress ولا Completed.",
            "كل distribution والـ origin اللي بيقرا منه."
          ],
          sol: R`أول طلب بيرجّع [[x-cache: Miss from cloudfront]] ومفيش [[age]]، والطلب التاني [[x-cache: Hit from cloudfront]] ومعاه [[age: 3]] مثلًا، والرقم ده بيزيد كل ما تطلب بعدها (عمر النسخة في الـ edge بالثواني). و [[cache-control]] هو اللي انت رفعت بيه: [[public,max-age=31536000,immutable]].

بعد [[create-invalidation]] هتاخد [[Id]] وحالة [[InProgress]]، و [[get-invalidation]] بعد دقيقة أو اتنين يقول [[Completed]]. الطلب اللي بعدها يرجع [[Miss from cloudfront]] تاني، وبعدين Hit. ولو شفت [[RefreshHit from cloudfront]] ده معناه إن الـ edge سأل الـ origin «اتغيّر؟» ورد «لأ»، فكمّل بنفس النسخة.

الغلطة الشائعة: الطلبين يرجعوا Miss على طول. ده غالبًا لأنهم راحوا لـ edge مختلفين (فيه أكتر من IP)، أو لأن الـ cache policy بتحط query string أو header في الـ key، أو لأن الملف مرفوع بـ [[no-cache]] أو [[max-age=0]]. وخد بالك إن [[age]] مش هيقل بعد invalidation في المتصفح لو المتصفح نفسه كاشه: [[curl]] مفيهوش كاش، فهو الأصدق في التجربة دي.`
        }
      ]
    }
]);
