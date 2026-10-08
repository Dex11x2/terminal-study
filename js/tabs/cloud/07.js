// تكملة تاب cloud: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cloud/01.js (شرح حقول الدرس في أوله)
MORE("cloud", [
    {
      t: "Cloudflare للمطوّر: Pages و R2 و Workers و Tunnel",
      l: 2,
      n: "موقع Vite على الـ edge، وتخزين زي S3 من غير رسوم خروج، وكود صغير قبل سيرفرك، ومدخل للإنتاج من غير ما تفتح بورت",
      items: [
        {
          cmd: "Cloudflare Pages",
          title: "موقع Vite على Cloudflare: من git ولا من الترمنال",
          desc: R`موقع Vite أو React بعد [[npm run build]] مجرد فولدر [[dist]] فيه HTML و JS و CSS، و Cloudflare بيخدمه من الـ CDN بتاعه في كل مكان، والطلبات على الملفات الثابتة مجانية.

فيه طريقتين: Cloudflare Pages (تربط الريبو، وكل push يعمل build، وكل branch ليه preview URL، أو ترفع [[dist]] بـ [[wrangler pages deploy]])، أو Workers static assets (ملف [[wrangler.jsonc]] فيه [[assets]] وبعدين [[wrangler deploy]]). Cloudflare بقى بيقول إن المشاريع الجديدة تبدأ على Workers، و Pages لسه شغال ومدعوم للمشاريع الموجودة، والاتنين بيدّوك نفس النتيجة لموقع static.

ولو الموقع SPA فيه routing (React Router)، لازم تقول لـ Cloudflare «أي مسار مش ملف رجّع index.html»، وإلا [[/dashboard]] يطلع 404 لما حد يعمل refresh.`,
          example: R`npm create vite@latest my-site -- --template react-ts
cd my-site && npm i && npm run build
npx wrangler login
npx wrangler pages deploy dist --project-name my-site --branch main
npx wrangler pages deploy dist --project-name my-site --branch feature-x
# أو Workers static assets: wrangler.jsonc زي الـ sol، وبعدين
npx wrangler deploy`,
          try: R`اعمل موقع Vite فيه React Router بصفحتين ([[/]] و [[/about]]). انشره بطريقة من الاتنين، وافتح [[/about]] مباشرة (مش من لينك جوه الموقع) واعمل refresh. لو طلع 404 صلّحه. وبعدين اربط دومين فرعي من الداشبورد ([[www.example.com]]).`,
          deep: {
            why: "موقع static على VPS معناه Nginx وشهادة وسيرفر لازم يفضل شغال، عشان حاجة ممكن تتخدم من CDN ببلاش تقريبًا. Cloudflare (زي Vercel و Netlify) بيخدمه من أقرب مكان لليوزر، مع HTTPS و preview لكل branch، وده مناسب جدًا لـ landing page أو dashboard بيكلّم API منفصل.",
            how: R`Pages من git: في الداشبورد Workers & Pages ثم Create، وتختار الريبو، و build command [[npm run build]]، و output directory [[dist]]. الـ branch الأساسي production، وأي branch تاني preview على [[BRANCH.my-site.pages.dev]].

Pages من الترمنال (Direct Upload): [[wrangler pages deploy dist]] بيرفع الفولدر كما هو. [[--branch main]] (أو الـ production branch بتاع المشروع) = production، وأي اسم تاني = preview. مفيد لو الـ build بيحصل في GitHub Actions.

Workers static assets: ملف [[wrangler.jsonc]] فيه [[name]] و [[compatibility_date]] و [[assets.directory = "./dist"]]. وتقدر تضيف [[main]] (Worker بكود) فيبقى عندك API و frontend في deploy واحد (درس [[Workers]]). وفي نسخ wrangler الجديدة، ممكن [[pages deploy]] لمشروع جديد يقترح عليك تروح Workers.

الـ SPA fallback: في Workers بتكتب [[not_found_handling: "single-page-application"]]. في Pages، لو مفيش [[404.html]] في الـ output، Pages بيعامل المشروع كـ SPA ويرجّع [[index.html]] للمسارات المش موجودة. والـ redirects والـ headers في ملفات [[_redirects]] و [[_headers]] جوه [[public/]].

متغيرات البيئة: Vite بيكتب [[import.meta.env.VITE_*]] جوه الـ JS وقت الـ build، فهي مش سر، وأي حاجة سرية تروح للـ API مش للـ frontend.`,
            when: "أي frontend static أو SPA: portfolio، landing، dashboard بيكلّم API على دومين تاني. لو محتاج SSR لـ Next.js بكل مميزاته، Vercel أو سيرفر Node أسهل (تاب Next.js).",
            mistakes: R`SPA من غير fallback فكل refresh على صفحة داخلية يطلع 404. وتحط مفتاح API سري في [[VITE_API_KEY]] فيطلع في الـ JS لأي حد. وتنسى إن الـ output directory لـ Vite هو [[dist]] مش [[build]] (ده CRA القديم). وتربط الدومين الرئيسي بـ CNAME وهو مش على Cloudflare DNS.`
          },
          teach: R`## الفكرة: ابني فولدر [[dist]]، وارفعه

موقع Vite في الآخر مجرد ملفات. أول سطرين بيعملوا المشروع ويبنوه، والتالت بيربط wrangler بحسابك، والرابع والخامس بيرفعوا نفس الفولدر مرة production ومرة preview، والأخير طريقة Workers بدل Pages.

اللي اتجرّب هنا (ويندوز 11، Node 24، أكتوبر ٢٠٢٦): عمل المشروع والبناء بجد (طلع Vite 8.3.3 و React 19)، و wrangler 4.148.0 متسطّب في المشروع، وشغّلنا الموقع على الجهاز بالطريقتين ([[wrangler pages dev]] و [[wrangler dev]]) عشان نشوف الـ SPA fallback. أما [[wrangler login]] و [[deploy]] محتاجين حساب Cloudflare، فدول من الـ docs.

---

## ١. [[npm create vite@latest my-site -- --template react-ts]]

| الحتة | معناها |
|---|---|
| [[npm create vite@latest]] | شغّل أحدث نسخة من باكدج [[create-vite]] (أي [[npm create X]] بيشغّل [[create-X]]) |
| [[my-site]] | اسم الفولدر اللي هيتعمل |
| [[--]] | اللي بعدها يروح لـ [[create-vite]] مش لـ npm نفسه |
| [[--template react-ts]] | قالب React بـ TypeScript |

~~~text الناتج
◇  Scaffolding project in ...\my-site...
└  Done. Now run:
  cd my-site
  npm install
  npm run dev
~~~

> لو بتشغّله في سكربت ضيف [[--no-interactive]]، وإلا النسخ الجديدة ممكن تسألك أسئلة وتستنى.

---

## ٢. [[cd my-site && npm i && npm run build]]

[[&&]] معناها «لو اللي قبلي نجح، كمّل». [[npm i]] بيسطّب الباكدجات، و [[npm run build]] بيشغّل سكربت [[build]] من [[package.json]]، وهو هنا [[tsc -b && vite build]]: اتأكد من أنواع TypeScript الأول، وبعدين ابني.

~~~text الناتج
vite v8.3.3 building client environment for production...
✓ 20 modules transformed.
dist/index.html                   0.45 kB │ gzip:  0.29 kB
dist/assets/index-D64VDMd1.css    4.10 kB │ gzip:  1.47 kB
dist/assets/index-CVtPK4EU.js   222.44 kB │ gzip: 69.28 kB
✓ built in 485ms
~~~

| اللي في [[dist]] | ليه |
|---|---|
| [[index.html]] | صفحة واحدة بس، فيها [[<div id="root">]] فاضي و [[<script>]] بيشاور على الـ JS |
| [[assets/index-CVtPK4EU.js]] | كل كود React متجمّع. الحروف دي hash من محتوى الملف: أي تعديل = اسم جديد، فالكاش يقدر يحتفظ بيه سنة |
| عمود [[gzip]] | الحجم بعد الضغط، وده اللي بينزل فعلًا على النت (٦٩ كيلو بدل ٢٢٢) |

ده كل الموقع. مفيش سيرفر، فأي CDN يقدر يخدمه.

---

## ٣. [[npx wrangler login]]

[[npx]] بيشغّل باكدج من غير ما تسطّبه global. و [[wrangler]] هو CLI بتاع Cloudflare للـ Workers و Pages. [[login]] بيفتح المتصفح، توافق، و wrangler يحفظ token على جهازك. من غيره:

~~~text npx wrangler whoami (من غير login)
You are not authenticated. Please run $__btwrangler login$__bt.
~~~

وفي GitHub Actions مفيش متصفح: بتحط [[CLOUDFLARE_API_TOKEN]] و [[CLOUDFLARE_ACCOUNT_ID]] كـ secrets بدل [[login]] (من الـ docs).

---

## ٤. [[npx wrangler pages deploy dist --project-name my-site --branch main]]

| الحتة | معناها |
|---|---|
| [[pages deploy]] | ارفع فولدر كـ deployment على Pages (اسمها Direct Upload) |
| [[dist]] | الفولدر |
| [[--project-name my-site]] | اسم المشروع، وبيبقى جزء من الـ URL: [[my-site.pages.dev]] |
| [[--branch main]] | اسم الـ branch. لو هو الـ production branch بتاع المشروع = production، أي اسم تاني = preview |

الـ flags دي موجودة في [[wrangler pages deploy --help]] (اتشغّل). الرفع نفسه من الـ docs: بيطبع عدد الملفات اللي اترفعت، والـ URL.

## ٥. نفس الأمر بـ [[--branch feature-x]]

نفس الفولدر، بس كـ preview على [[feature-x.my-site.pages.dev]]. الـ production مش بيتلمس، فتبعت اللينك لحد يراجع قبل ما تنشر.

---

## ٦. [[npx wrangler deploy]] (Workers static assets)

هنا مفيش [[dist]] في الأمر: wrangler بيقرا كل حاجة من [[wrangler.jsonc]] (الـ solCode):

| السطر | معناه |
|---|---|
| [["name": "my-site"]] | اسم الـ Worker، والـ URL هيبقى [[my-site.SUBDOMAIN.workers.dev]] |
| [["compatibility_date"]] | «اشتغل بسلوك الـ runtime زي ما كان في التاريخ ده»، عشان تحديثات Cloudflare متكسرش كودك |
| [["assets": { "directory": "./dist" }]] | الملفات الثابتة من الفولدر ده |
| [["not_found_handling": "single-page-application"]] | أي مسار مش ملف، رجّع [[index.html]] |

و [[.jsonc]] يعني JSON بتعليقات ([[//]]).

### جرّبناه على الجهاز بـ [[wrangler dev]]

[[wrangler dev]] بيشغّل نفس الإعداد محليًا بـ workerd (نفس الـ runtime بتاع Cloudflare) على [[http://127.0.0.1:8787]]، من غير حساب:

~~~text مع not_found_handling: "single-page-application"
/                          200 text/html
/about                     200 text/html          (ده index.html)
/dashboard/settings        200 text/html          (index.html برضه)
/assets/index-CVtPK4EU.js  200 text/javascript
/assets/nope.js            200 text/html          (!)
~~~

~~~text نفس الملفات من غير not_found_handling
/          200 text/html
/about     404
~~~

يعني من غير السطر ده، أي refresh على [[/about]] = 404، وده بالظبط اللي التجربة بتطلب تصلّحه.

> لاحظ [[/assets/nope.js]]: ملف JS مش موجود رجع [[index.html]] بـ 200! لو رفعت HTML قديم بيشاور على JS اتمسح، المتصفح هياخد HTML مكان الـ JS ويطلع في الـ console [[Unexpected token '<']] بدل 404 واضح. ده تمن الـ SPA mode.

---

## Pages والـ SPA: جرّبناه بـ [[wrangler pages dev]]

[[wrangler pages dev dist]] بيشغّل الفولدر بقواعد Pages:

~~~text الناتج
/           200 text/html
/about      200 text/html
/dashboard  200 text/html
~~~

وبعدين حطينا [[404.html]] في [[dist]]:

~~~text بعد ما ضفنا dist/404.html
/about -> 404 <h1>not here</h1>
~~~

ده اللي الدرس بيقوله: Pages بيعتبر المشروع SPA طول ما مفيش [[404.html]]. أول ما الملف ده يظهر، المسارات المش موجودة بقت 404.

---

## الطريقتين جنب بعض

| | Pages | Workers static assets |
|---|---|---|
| الرفع | [[wrangler pages deploy dist]] | [[wrangler deploy]] |
| الإعداد | flags + ملفات [[_redirects]] و [[_headers]] | [[wrangler.jsonc]] |
| الـ SPA | تلقائي لو مفيش [[404.html]] | [[not_found_handling]] |
| preview | [[--branch]] | versions و preview URLs |
| تجربة محلية | [[wrangler pages dev dist]] | [[wrangler dev]] |

## الخلاصة

1. [[npm run build]] بيطلّع [[dist]]: ده الموقع كله.
2. ارفعه بـ [[pages deploy]] أو [[deploy]]، و [[--branch]] غير الـ production = preview.
3. جرّب الـ refresh على مسار داخلي **قبل** ما تنشر، بـ [[wrangler dev]] أو [[wrangler pages dev]] على جهازك.`,
          lines: [
            "مشروع Vite جديد بـ React و TypeScript.",
            "سطّب وابني: الناتج في dist.",
            "اربط wrangler بحسابك (بيفتح المتصفح).",
            "ارفع dist كـ production على Pages (أول مرة بيعمل المشروع).",
            "نفس الفولدر كـ preview لـ branch تانية (URL لوحده).",
            "أو انشر كـ Worker بـ static assets حسب wrangler.jsonc."
          ],
          sol: R`بعد [[pages deploy]] هتاخد URL زي [[https://my-site.pages.dev]] (أو URL فيه hash لكل deploy)، وللـ preview [[https://feature-x.my-site.pages.dev]]. ولو استخدمت Workers هتاخد [[https://my-site.YOUR-SUBDOMAIN.workers.dev]].

اختبار الـ refresh: [[curl -I https://my-site.pages.dev/about]] المفروض يرجّع 200 ومحتواه هو [[index.html]]. لو رجّع 404، يبقى فيه [[404.html]] في [[dist]] (فـ Pages مبقاش يعتبره SPA)، أو في Workers ناقصك [[not_found_handling]].

الغلطة الشائعة التانية: الصفحة بيضا والـ console فيه 404 على [[/assets/index-abc.js]]، وده لأنك غيّرت [[base]] في [[vite.config.ts]] أو رفعت فولدر غير [[dist]].`,
          solCode: R`// wrangler.jsonc لطريقة Workers static assets
{
  "name": "my-site",
  "compatibility_date": "2026-09-01",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "single-page-application"
  }
}`
        },
        {
          cmd: "R2",
          title: "R2: تخزين زي S3 بنفس الكود ومن غير رسوم خروج",
          desc: R`R2 تخزين ملفات (object storage) من Cloudflare بيتكلم نفس API بتاع S3، فبتستخدم [[@aws-sdk/client-s3]] زي ما هو، وبتغيّر 3 حاجات بس: الـ [[endpoint]] بقى [[https://ACCOUNT_ID.r2.cloudflarestorage.com]]، والـ [[region]] بقى [[auto]]، والمفاتيح من R2 API token.

الفرق الكبير في الفلوس: مفيش رسوم على الداتا اللي بتخرج (egress). في S3 كل جيجا بتنزل لليوزر بتتحاسب، وده ممكن يبقى أكبر بند في الفاتورة لموقع صور أو فيديو. وقت كتابة الدرس فيه free tier شهري (حوالي ١٠ جيجا تخزين وملايين من العمليات)، وبعدها بتدفع على التخزين والعمليات بس. راجع صفحة الأسعار.`,
          example: R`import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const r2 = new S3Client({
  region: "auto",
  endpoint: "https://" + process.env.R2_ACCOUNT_ID + ".r2.cloudflarestorage.com",
  credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY },
  requestChecksumCalculation: "WHEN_REQUIRED",
});

const put = new PutObjectCommand({ Bucket: "myapp-uploads", Key: "avatars/42.webp", ContentType: "image/webp" });
const uploadUrl = await getSignedUrl(r2, put, { expiresIn: 300 });
const get = new GetObjectCommand({ Bucket: "myapp-uploads", Key: "avatars/42.webp" });
const downloadUrl = await getSignedUrl(r2, get, { expiresIn: 3600 });
console.log(uploadUrl.split("?")[0]);
console.log(new URL(downloadUrl).searchParams.get("X-Amz-Expires"));`,
          try: R`من غير حساب حتى: سطّب [[@aws-sdk/client-s3]] و [[@aws-sdk/s3-request-presigner]] في فولدر تجربة، وشغّل الملف بمتغيرات وهمية ([[R2_ACCOUNT_ID=0123456789abcdef0123456789abcdef]] وأي مفاتيح). التوقيع بيتحسب على جهازك فمش محتاج نت. وبعدين لو عندك حساب: اعمل bucket و R2 API token بصلاحية Object Read & Write على الـ bucket ده بس، وارفع ملف فعلًا بـ [[curl -X PUT --upload-file]] على الـ uploadUrl.`,
          flag: "script",
          deep: {
            why: "ملفات المستخدمين مكانها object storage مش ديسك السيرفر (عشان تقدر تكبّر وتنقل). و S3 هو المعيار، بس رسوم الخروج بتفاجئ الناس: موقع بيعرض صور كتير ممكن يدفع على الترافيك أكتر من التخزين. R2 بيشيل البند ده، ولأنه بيتكلم S3 API، النقل منه وإليه تغيير إعدادات مش إعادة كتابة.",
            how: R`الكود هو هو اللي في درس [[presigned URL]]: السيرفر بيعمل رابط موقّع مؤقت، والمتصفح بيرفع عليه مباشرة بـ PUT، فالملف مبيعديش على سيرفرك. [[getSignedUrl]] بيحسب التوقيع محليًا بالمفتاح السري، ومبيكلّمش R2 خالص.

المفاتيح: من R2 في الداشبورد، Manage API tokens، واعمل token بصلاحية على bucket معين. هيدّيك Access Key ID و Secret Access Key (دول اللي بيدخلوا الـ SDK). والـ Account ID موجود في الداشبورد.

العرض للناس: الـ bucket خاص افتراضيًا. يا إما presigned GET زي المثال (لملفات خاصة)، يا إما تربط custom domain بالـ bucket ([[files.example.com]]) فيبقى public ومعاه كاش Cloudflare، ودي أحسن للصور العامة. وفيه [[r2.dev]] URL للتجربة بس (عليه rate limit ومفيش كاش).

الـ CORS: المتصفح بيرفع على دومين R2 مش دومينك، فلازم CORS policy على الـ bucket تسمح بـ [[PUT]] من [[https://myapp.example.com]] وبالـ header [[Content-Type]].

من جوه Worker مش محتاج SDK: بتعمل binding للـ bucket وتستخدم [[env.BUCKET.put()]] و [[env.BUCKET.get()]] (درس [[Workers]]).

فرق عن S3: مفيش regions بالمعنى ده (فيه location hint)، وبعض مميزات S3 مش موجودة أو مختلفة (زي بعض إعدادات الـ ACL والـ events). و [[requestChecksumCalculation: "WHEN_REQUIRED"]] في المثال مهمة: نسخ SDK v3 الجديدة بتحسب checksum افتراضيًا، وفي الـ presigned PUT بتحط في الرابط [[x-amz-checksum-crc32]] محسوب على body فاضي (قيمته [[AAAAAA==]])، فأي ملف حقيقي يترفع عليه يترفض لأن الـ checksum مش مطابق.`,
            when: "صور ومرفقات المستخدمين، والباك أب (Coolify و Dokploy بيدعموه كـ S3)، وأي ملفات بتتنزل كتير. S3 يفضل أحسن لو كل حاجة تانية على AWS ومحتاج events لـ Lambda وصلاحيات IAM.",
            mistakes: R`endpoint غلط (بتحط bucket في الـ host بإيدك أو تنسى الـ Account ID)، أو [[region: "us-east-1"]] بدل [[auto]]. و token بصلاحية على كل الـ buckets. ومفاتيح R2 في كود الـ frontend بدل presigned URL. وتستخدم [[r2.dev]] في الإنتاج. وتنسى الـ CORS فالرفع من المتصفح يفشل برسالة CORS مع إن الـ URL سليم.`
          },
          teach: R`## الفكرة: نفس كود S3، بـ ٣ إعدادات مختلفة

الملف بيعمل client بيكلّم R2 بلغة S3، وبعدين بيعمل رابطين موقّعين: واحد للرفع (٥ دقايق) وواحد للتنزيل (ساعة)، ويطبع حاجتين منهم.

اتشغّل فعلًا بـ Node 24 على ويندوز 11 و [[@aws-sdk/client-s3]] نسخة 3.1147.0، بمتغيرات وهمية زي التجربة (من غير حساب R2). التوقيع بيتحسب على الجهاز فالرابط بيطلع، بس الرفع الحقيقي عليه محتاج حساب، فده من الـ docs.

---

## ١. الـ imports

~~~js
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
~~~

| الاسم | هو إيه |
|---|---|
| [[S3Client]] | الـ client: فيه العنوان والمفاتيح والإعدادات |
| [[PutObjectCommand]] | وصف عملية «ارفع ملف» |
| [[GetObjectCommand]] | وصف عملية «هات ملف» |
| [[getSignedUrl]] | بدل ما ينفّذ العملية، بيطلّع رابط موقّع لها حد تاني يقدر ينفّذه |

الـ [[{ }]] حوالين الأسامي معناها «هات الحاجات دي بالاسم من الباكدج». والاتنين باكدجات منفصلة، فبتسطّبهم الاتنين: [[npm i @aws-sdk/client-s3 @aws-sdk/s3-request-presigner]].

---

## ٢. الـ client: ٤ إعدادات

~~~js
const r2 = new S3Client({
  region: "auto",
  endpoint: "https://" + process.env.R2_ACCOUNT_ID + ".r2.cloudflarestorage.com",
  credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY },
  requestChecksumCalculation: "WHEN_REQUIRED",
});
~~~

| الإعداد | في S3 | في R2 |
|---|---|---|
| [[region]] | زي [["eu-central-1"]] | [["auto"]]: R2 بيختار المكان |
| [[endpoint]] | مش محتاجه (الـ SDK عارف عناوين AWS) | عنوان حسابك على R2 |
| [[credentials]] | مفاتيح IAM | مفاتيح R2 API token |
| [[requestChecksumCalculation]] | الافتراضي تمام | [["WHEN_REQUIRED"]] (تحت ليه) |

[[process.env.R2_ACCOUNT_ID]] يعني «اقرا متغير البيئة ده». المفاتيح عمرها ما تتكتب في الكود.

### جرّبنا ننسى متغير

شغّلنا الملف من غير [[R2_ACCOUNT_ID]]:

~~~text الناتج
https://myapp-uploads.undefined.r2.cloudflarestorage.com/avatars/42.webp
~~~

[[undefined]] جوه العنوان ومفيش أي error! الـ JavaScript حوّل المتغير الناقص لكلمة [["undefined"]] وهو بيلزق النصوص. فلو شفت [[undefined]] في لوج أو error بتاع DNS، دوّر على متغير بيئة ناقص.

---

## ٣. ليه [[requestChecksumCalculation: "WHEN_REQUIRED"]]؟

عملنا نفس رابط الرفع مرتين، مرة بالإعداد ومرة من غيره، وطبعنا كل حتة في الـ query string:

~~~text بالإعداد WHEN_REQUIRED
X-Amz-Algorithm          AWS4-HMAC-SHA256
X-Amz-Content-Sha256     UNSIGNED-PAYLOAD
X-Amz-Credential         test/20261008/auto/s3/aws4_request
X-Amz-Date               20261008T103951Z
X-Amz-Expires            300
X-Amz-Signature          2b8c8137ed5d...
X-Amz-SignedHeaders      host
x-id                     PutObject
~~~

~~~text من غيره (الافتراضي)
...
X-Amz-SignedHeaders      host
x-amz-checksum-crc32     AAAAAA==
x-amz-sdk-checksum-algorithm CRC32
x-id                     PutObject
~~~

الافتراضي زوّد [[x-amz-checksum-crc32=AAAAAA==]]. CRC32 بصمة صغيرة لمحتوى الملف، و [[AAAAAA==]] هي بصمة ملف **فاضي** (٤ bytes أصفار مكتوبة base64)، لأن وقت عمل الرابط مفيش ملف. فالرابط بيقول «الملف اللي هيترفع لازم يبقى فاضي»، وأي صورة حقيقية تترفض. [[WHEN_REQUIRED]] = «احسب checksum بس لما العملية نفسها تطلبه».

### نقرا باقي الرابط

| الحتة | معناها |
|---|---|
| [[X-Amz-Algorithm]] | طريقة التوقيع: AWS Signature Version 4 بـ HMAC-SHA256 |
| [[X-Amz-Credential]] | المفتاح (الـ Access Key ID) / التاريخ / الـ region / الخدمة. لاحظ [[auto]] و [[s3]] |
| [[X-Amz-Date]] | وقت التوقيع بتوقيت UTC |
| [[X-Amz-Expires]] | الصلاحية بالثواني من وقت التوقيع |
| [[X-Amz-SignedHeaders]] | الـ headers اللي داخلة في التوقيع: [[host]] بس |
| [[X-Amz-Signature]] | التوقيع نفسه، محسوب بالـ Secret Key. الـ secret **مش** في الرابط |
| [[UNSIGNED-PAYLOAD]] | محتوى الملف مش داخل في التوقيع (ما هو لسه مش موجود) |

> [[SignedHeaders=host]] بس معناها إن الـ [[ContentType]] اللي في الأمر مش جزء من التوقيع، فالمتصفح يقدر يرفع بأي نوع. لو عايز تجبره، [[getSignedUrl(r2, put, { expiresIn: 300, signableHeaders: new Set(["content-type"]) })]]، وجرّبناها: الرابط بقى فيه [[content-type;host]].

---

## ٤. الأمرين والرابطين

~~~js
const put = new PutObjectCommand({ Bucket: "myapp-uploads", Key: "avatars/42.webp", ContentType: "image/webp" });
const uploadUrl = await getSignedUrl(r2, put, { expiresIn: 300 });
const get = new GetObjectCommand({ Bucket: "myapp-uploads", Key: "avatars/42.webp" });
const downloadUrl = await getSignedUrl(r2, get, { expiresIn: 3600 });
~~~

| الحتة | معناها |
|---|---|
| [[Bucket]] | اسم الـ bucket |
| [[Key]] | مسار الملف جوه الـ bucket. مفيش فولدرات حقيقية، [[avatars/]] جزء من الاسم |
| [[ContentType]] | نوع الملف اللي هيتخزن معاه، وبيتبعت للي ينزّله بعدين |
| [[await]] | [[getSignedUrl]] بترجّع Promise، فبنستنى النتيجة. والـ [[await]] على أعلى مستوى في الملف شغالة لأنه [[.mjs]] (ES module) |
| [[expiresIn: 300]] | ٣٠٠ ثانية = ٥ دقايق: كفاية للرفع، وقصيرة لو الرابط اتسرّب |
| [[expiresIn: 3600]] | ساعة للتنزيل |

---

## ٥. سطرين الطباعة

~~~js
console.log(uploadUrl.split("?")[0]);
console.log(new URL(downloadUrl).searchParams.get("X-Amz-Expires"));
~~~

- [[split("?")]] بيقسم النص عند [[?]]، و [[[0]]] بياخد اللي قبلها: العنوان من غير التوقيع.
- [[new URL(...)]] بيحلل الرابط، و [[searchParams.get("X-Amz-Expires")]] بيجيب قيمة واحدة من الـ query.

~~~bash
R2_ACCOUNT_ID=0123456789abcdef0123456789abcdef R2_ACCESS_KEY_ID=test R2_SECRET_ACCESS_KEY=test node r2.mjs
~~~

~~~text الناتج
https://myapp-uploads.0123456789abcdef0123456789abcdef.r2.cloudflarestorage.com/avatars/42.webp
3600
~~~

الـ SDK حط اسم الـ bucket في أول الـ host لوحده ([[myapp-uploads.ACCOUNT.r2...]])، ودي اسمها virtual-hosted style. و [[3600]] هي صلاحية رابط التنزيل.

في bash، [[NAME=value node r2.mjs]] بيحط المتغيرات للأمر ده بس. في PowerShell بتتكتب الأول (اتجرّب في pwsh وطلع نفس الناتج بالظبط):

~~~powershell
$env:R2_ACCOUNT_ID="0123456789abcdef0123456789abcdef"; $env:R2_ACCESS_KEY_ID="test"; $env:R2_SECRET_ACCESS_KEY="test"; node r2.mjs
~~~

---

## ٦. الرفع الفعلي (من الـ docs)

~~~bash
curl -X PUT -H "Content-Type: image/webp" --upload-file avatar.webp "UPLOAD_URL_FROM_THE_SCRIPT"
~~~

[[-X PUT]] نوع الطلب، و [[--upload-file]] ابعت محتوى الملف ده كـ body، والرابط بين [["..."]] لأن فيه [[&]] (من غيرها الشل يفتكرها «شغّل في الخلفية»). مع مفاتيح حقيقية بيرجّع 200. ومع مفاتيح [[test]] بيرجّع 403 لأن R2 مش لاقي المفتاح ده ([[InvalidAccessKeyId]]).

---

## الخلاصة

| من S3 لـ R2 | غيّر |
|---|---|
| [[region]] | [["auto"]] |
| [[endpoint]] | [[https://ACCOUNT_ID.r2.cloudflarestorage.com]] |
| المفاتيح | R2 API token على bucket واحد |
| presigned PUT | [[requestChecksumCalculation: "WHEN_REQUIRED"]] |

> الرابط الموقّع بيتعمل على جهازك من غير ما يكلّم R2، فطلوعه مش دليل إن المفاتيح صح. الدليل الحقيقي أول PUT عليه.`,
          lines: [
            "الـ client والأوامر من AWS SDK زي S3 بالظبط.",
            "دالة الروابط الموقّعة.",
            "client جديد لـ R2.",
            "R2 مفيهوش regions، فـ auto.",
            "الـ endpoint بتاع حسابك على R2.",
            "مفاتيح R2 API token من متغيرات البيئة.",
            "من غيرها SDK v3 بيحط [[x-amz-checksum-crc32]] لجسم فاضي في رابط الـ PUT، فالرفع بملف حقيقي يفشل. كده الـ checksum بيتحسب بس لما العملية تطلبه.",
            "قفلة.",
            "أمر رفع لمسار معين بنوع ملف معين.",
            "رابط رفع صالح ٥ دقايق.",
            "أمر تنزيل لنفس الملف.",
            "رابط تنزيل صالح ساعة.",
            "اطبع الرابط من غير التوقيع.",
            "اطبع مدة صلاحية رابط التنزيل من الـ query."
          ],
          sol: R`بالمتغيرات الوهمية الناتج:

[[https://myapp-uploads.0123456789abcdef0123456789abcdef.r2.cloudflarestorage.com/avatars/42.webp]]
[[3600]]

لاحظ إن الـ SDK حط اسم الـ bucket في أول الـ host لوحده (virtual-hosted style)، ومفيش أي طلب اتبعت لـ R2: التوقيع اتحسب على جهازك، فحتى مفاتيح غلط بتطلّع رابط، بس الرفع عليه هيرجّع 403 [[SignatureDoesNotMatch]] أو [[InvalidAccessKeyId]].

مع حساب حقيقي: [[curl -X PUT -H "Content-Type: image/webp" --upload-file a.webp "UPLOAD_URL"]] يرجّع 200، والملف يظهر في الـ bucket. لو رجّع 403 [[SignatureDoesNotMatch]]، غالبًا الـ Secret Access Key غلط، أو الرابط اتنسخ ناقص أو اتعدّل. والـ Content-Type مش داخل في التوقيع افتراضيًا (الرابط فيه [[X-Amz-SignedHeaders=host]] بس في SDK v3 الحالي)، فلو عايز تجبر المتصفح يرفع بنفس النوع ضيف [[signableHeaders: new Set(["content-type"])]] في options بتاعة [[getSignedUrl]]، وساعتها أي نوع مختلف هيترفض.`,
          solCode: R`npm init -y && npm i @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
R2_ACCOUNT_ID=0123456789abcdef0123456789abcdef R2_ACCESS_KEY_ID=test R2_SECRET_ACCESS_KEY=test node r2.mjs
curl -X PUT -H "Content-Type: image/webp" --upload-file avatar.webp "UPLOAD_URL_FROM_THE_SCRIPT"`
        },
        {
          cmd: "Workers",
          title: "Workers: كود صغير بيرد من أقرب مكان لليوزر",
          desc: R`Worker دالة JavaScript بتاخد [[Request]] وترجّع [[Response]] (نفس Web APIs اللي في المتصفح و Node 18+)، وبتشتغل على سيرفرات Cloudflare في كل مكان، من غير cold start تقريبًا لأنها isolates مش containers.

الـ [[env]] فيه المتغيرات والأسرار والـ bindings: bucket R2، أو KV، أو قاعدة D1، أو Durable Objects. والـ binding معناه إن الـ Worker بيكلّم الخدمة من غير مفاتيح ولا SDK.

وقت كتابة الدرس الخطة المجانية فيها حد يومي للطلبات (حوالي ١٠٠ ألف) ووقت CPU قليل لكل طلب، والخطة المدفوعة بتبدأ بـ ٥ دولار في الشهر. راجع الأرقام قبل ما تعتمد عليها.`,
          example: R`export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/api/hello") {
      const country = request.cf?.country ?? "unknown";
      return Response.json({ hello: env.GREETING, country });
    }
    if (url.pathname.startsWith("/files/")) {
      const obj = await env.BUCKET.get(url.pathname.slice(7));
      if (!obj) return new Response("not found", { status: 404 });
      return new Response(obj.body, { headers: { "content-type": obj.httpMetadata?.contentType ?? "application/octet-stream" } });
    }
    return new Response("not found", { status: 404 });
  },
};`,
          try: R`من غير حساب: احفظ الـ Worker في [[worker.mjs]]، واعمل [[test.mjs]] بيعمل import ليه وبينادي [[worker.fetch(new Request(...), env, {})]] بـ env وهمي فيه [[GREETING]] و [[BUCKET]] بدالة [[get]] بترجّع object لمفتاح واحد بس. جرّب ٤ مسارات. وبعدين بحساب: [[npm create cloudflare@latest]]، و [[npx wrangler dev]]، و [[npx wrangler deploy]].`,
          flag: "script",
          deep: {
            why: "حاجات كتير صغيرة مش محتاجة سيرفر: redirect حسب البلد، أو API صغير بيقرا من R2 أو KV، أو webhook receiver، أو حماية endpoint بتوكن قبل ما يوصل سيرفرك. Worker بيعمل ده قريب من اليوزر، وتقريبًا ببلاش لحجم صغير، ومن غير سيرفر تحدّثه.",
            how: R`الـ Worker ES module بيعمل [[export default]] لـ object فيه [[fetch]]. Cloudflare بيناديها مع كل طلب بـ ٣ حاجات: [[request]] (Request عادي ومعاه [[request.cf]] فيه البلد والمدينة وغيرهم)، و [[env]]، و [[ctx]] ([[ctx.waitUntil(promise)]] تكمّل شغل بعد ما الرد يتبعت، زي لوج أو analytics).

الـ runtime مش Node: مفيش [[fs]] ولا process طويل، والكود بيشتغل لكل طلب لوحده وبحد CPU. وفيه [[nodejs_compat]] flag بيدّيك جزء كبير من Node APIs (زي [[Buffer]] و [[crypto]])، بس مش كل المكتبات بتشتغل.

الإعداد في [[wrangler.jsonc]]: [[main]] (ملف الكود)، و [[vars]] (متغيرات عادية)، و [[r2_buckets]] بـ [[binding: "BUCKET"]] و [[bucket_name]]، والأسرار بـ [[wrangler secret put NAME]] مش في الملف.

[[wrangler dev]] بيشغّل الـ Worker على جهازك بـ workerd (نفس الـ runtime) وبـ R2 و KV محليين. و [[wrangler deploy]] بينشره على [[NAME.SUBDOMAIN.workers.dev]] أو على route في دومينك. و [[wrangler tail]] لايف لوجات.

ولأنه Request و Response عاديين، تقدر تختبر الـ handler في Node مباشرة زي التجربة، أو بـ Vitest ومعاه pool خاص بـ Workers.`,
            when: "منطق خفيف قريب من اليوزر، و APIs صغيرة على R2 أو KV أو D1، وتحويلات على الطلب قبل سيرفرك، والـ webhooks. مش مكان شغل تقيل على CPU، ولا مكتبات Node بتعتمد على الديسك أو native modules.",
            mistakes: R`تفتكر إن الـ Worker Node فتعمل [[import fs]] أو تحط connection pool لـ Postgres في متغير global وتتوقع إنه يعيش (للقواعد فيه Hyperdrive). وتحط أسرار في [[vars]] جوه [[wrangler.jsonc]] اللي على GitHub. وتنسى [[await]] لشغل مش مهم بدل [[ctx.waitUntil]] فالرد يستنى. وتقرا [[obj.body]] مرتين (stream بيتقري مرة واحدة).`
          },
          teach: R`## الفكرة: دالة واحدة بتاخد طلب وترجّع رد

الـ Worker كله object فيه دالة [[fetch]]. Cloudflare بيناديها مع كل طلب، وهي بتبص على المسار وتقرر: JSON، أو ملف من R2، أو 404.

جرّبناه بطريقتين (أكتوبر ٢٠٢٦): الأول [[test.mjs]] بتاع الـ solCode بـ Node 24 على ويندوز (env وهمي)، والتاني [[wrangler dev]] (wrangler 4.148.0) جوه [[node:22-slim]] بـ R2 محلي حقيقي فيه ملف. النشر نفسه ([[wrangler deploy]]) محتاج حساب، فده من الـ docs.

---

## ١. [[export default { async fetch(request, env, ctx) {...} }]]

~~~js
export default {
  async fetch(request, env, ctx) {
~~~

| الحتة | معناها |
|---|---|
| [[export default]] | ده الحاجة الأساسية اللي الملف بيطلّعها. Cloudflare بيعمل لها import |
| [[{ ... }]] | object، وجواه دوال باسم الحدث: [[fetch]] للطلبات (وفيه [[scheduled]] للـ cron مثلًا) |
| [[async]] | الدالة فيها [[await]]، وبترجّع Promise |
| [[request]] | الطلب: [[Request]] عادي زي اللي في المتصفح |
| [[env]] | المتغيرات والأسرار والـ bindings ([[GREETING]] و [[BUCKET]]) |
| [[ctx]] | أدوات زي [[ctx.waitUntil()]]. مش مستخدم هنا، بس لازم مكانه عشان الترتيب |

---

## ٢. [[const url = new URL(request.url)]]

[[request.url]] نص كامل زي [["https://myapp.example.workers.dev/files/a.txt"]]. و [[new URL()]] بيحلله لحتت، ومنها [[url.pathname]] = [["/files/a.txt"]] (المسار من غير الدومين والـ query).

---

## ٣. مسار [[/api/hello]]

~~~js
if (url.pathname === "/api/hello") {
  const country = request.cf?.country ?? "unknown";
  return Response.json({ hello: env.GREETING, country });
}
~~~

### [[request.cf?.country ?? "unknown"]]: من جوه لبرة

| الحتة | معناها |
|---|---|
| [[request.cf]] | object بيضيفه Cloudflare للطلب: البلد والمدينة والـ data center وغيرهم. برا Cloudflare مش موجود ([[undefined]]) |
| [[?.]] | optional chaining: لو اللي قبلي [[undefined]]، متكملش وارجع [[undefined]] بدل ما تضرب error |
| [[.country]] | كود البلد بحرفين، زي [[EG]] |
| [[??]] | لو اللي على الشمال [[null]] أو [[undefined]]، خد اللي على اليمين |

### [[Response.json({ hello: env.GREETING, country })]]

بيعمل رد JSON جاهز: الـ body بـ [[JSON.stringify]] و header [[content-type: application/json]]. و [[{ ..., country }]] اختصار لـ [[country: country]].

---

## ٤. مسار [[/files/]]: R2 من غير SDK

~~~js
if (url.pathname.startsWith("/files/")) {
  const obj = await env.BUCKET.get(url.pathname.slice(7));
  if (!obj) return new Response("not found", { status: 404 });
  return new Response(obj.body, { headers: { "content-type": obj.httpMetadata?.contentType ?? "application/octet-stream" } });
}
~~~

| الحتة | معناها |
|---|---|
| [[startsWith("/files/")]] | المسار بيبدأ بكده؟ |
| [[slice(7)]] | شيل أول ٧ حروف. [["/files/"]] طولها ٧ بالظبط، فيفضل [["a.txt"]] |
| [[env.BUCKET]] | الـ binding: الـ bucket اللي في [[wrangler.jsonc]] باسم [[BUCKET]]. مفيش مفاتيح ولا endpoint |
| [[.get(key)]] | هات الملف. بترجّع [[null]] لو مش موجود |
| [[!obj]] | لو مفيش ملف، 404 |
| [[obj.body]] | محتوى الملف كـ stream: بيتبعت للزائر وهو بيتقري، من غير ما يتحمّل كله في الذاكرة |
| [[obj.httpMetadata?.contentType]] | النوع اللي الملف اتخزن بيه |
| [["application/octet-stream"]] | لو مفيش نوع: «bytes وخلاص»، والمتصفح هيعرض تحميل |

---

## ٥. أي حاجة تانية: [[return new Response("not found", { status: 404 })]]

[[new Response(body, options)]] بيعمل رد بإيدك. والنص العادي بياخد [[text/plain;charset=UTF-8]] لوحده.

---

## التجربة الأولى: [[test.mjs]] في Node

Node 18+ فيه [[Request]] و [[Response]] نفسهم، فبنعمل import للـ Worker وننادي [[fetch]] بإيدنا، بـ env وهمي: [[GREETING]] نص، و [[BUCKET]] object فيه [[get]] بيرجّع ملف لـ [["a.txt"]] بس.

~~~text node test.mjs
/api/hello 200 application/json {"hello":"ahlan","country":"unknown"}
/files/a.txt 200 text/plain hi from r2
/files/b.txt 404 text/plain;charset=UTF-8 not found
/x 404 text/plain;charset=UTF-8 not found
~~~

[[unknown]] لأن [[new Request()]] في Node مفيهوش [[cf]]، فالـ [[??]] اشتغلت. وشلنا [[BUCKET]] من الـ env وجرّبنا:

~~~text الناتج
/api/hello 200 application/json {"hello":"ahlan","country":"unknown"}
TypeError: Cannot read properties of undefined (reading 'get')
~~~

ده الخطأ اللي الـ sol بيتكلم عنه: [[env.BUCKET]] مش موجود، فـ [[.get]] على [[undefined]].

---

## التجربة التانية: [[wrangler dev]] بـ R2 محلي

[[wrangler.jsonc]] اللي استخدمناه:

~~~json
{
  "name": "myapp-worker",
  "main": "worker.mjs",
  "compatibility_date": "2026-09-01",
  "vars": { "GREETING": "ahlan" },
  "r2_buckets": [{ "binding": "BUCKET", "bucket_name": "myapp-uploads" }]
}
~~~

[[main]] ملف الكود، و [[vars]] بيبقى [[env.GREETING]]، و [[r2_buckets]] بيربط [[env.BUCKET]] بـ bucket اسمه [[myapp-uploads]]. وبعدين حطينا ملف في الـ bucket المحلي وشغّلنا:

~~~bash
npx wrangler r2 object put myapp-uploads/a.txt --file a.txt --content-type text/plain --local
npx wrangler dev
~~~

~~~text الناتج
Creating object "a.txt" in bucket "myapp-uploads".
Upload complete.

Binding                           Resource                  Mode
env.BUCKET (myapp-uploads)        R2 Bucket                 local
env.GREETING ("ahlan")            Environment Variable      local
~~~

[[--local]] يعني الـ bucket على جهازك (جوه فولدر [[.wrangler/state]])، مش على Cloudflare. وطلبنا الـ ٤ مسارات من [[http://127.0.0.1:8787]]:

~~~text الناتج
/api/hello 200 application/json {"hello":"ahlan","country":"EG"}
/files/a.txt 200 text/plain hi from local r2
/files/b.txt 404 text/plain;charset=UTF-8 not found
/x 404 text/plain;charset=UTF-8 not found
~~~

لاحظ [[country: "EG"]]: [[wrangler dev]] بيملا [[request.cf]] ببيانات حقيقية حسب الـ IP بتاعك، فالمسار بيشتغل محليًا زي الإنتاج.

> على ويندوز، في فولدر مساره طويل جدًا، نفس التجربة رجّعت [[500]] [[internal error]] على مسارات R2 وأمر [[r2 object put]] فشل. نفس الملفات في لينكس اشتغلت. لو حصلك كده، جرّب المشروع في فولدر مساره قصير أو في WSL.

---

## الخلاصة

| المسار | بيعمل إيه | الرد |
|---|---|---|
| [[/api/hello]] | JSON من [[env]] و [[request.cf]] | 200 |
| [[/files/KEY]] موجود | [[env.BUCKET.get(KEY)]] | 200 بنوع الملف |
| [[/files/KEY]] مش موجود | [[get]] رجّع [[null]] | 404 |
| أي حاجة تانية | | 404 |

> الـ Worker هو [[Request]] داخل و [[Response]] خارج. عشان كده بيتجرّب في Node بـ env وهمي، أو بـ [[wrangler dev]] بالـ bindings الحقيقية محليًا.`,
          lines: [
            "الـ Worker بيصدّر object فيه دوال الأحداث.",
            "fetch: بتتنادى مع كل طلب HTTP.",
            "اقرا المسار من الـ URL.",
            "مسار API صغير.",
            "البلد من بيانات Cloudflare (مش موجودة في الاختبار المحلي).",
            "رد JSON فيه متغير من env.",
            "قفلة.",
            "مسار ملفات من R2.",
            "هات الملف من الـ bucket عن طريق الـ binding بالمفتاح اللي بعد /files/.",
            "مش موجود: 404.",
            "رجّع الملف stream بنوعه المتخزن.",
            "قفلة.",
            "أي مسار تاني: 404.",
            "قفلة fetch.",
            "قفلة الـ object."
          ],
          sol: R`بـ env وهمي فيه [[GREETING: "ahlan"]] و bucket بيرجّع ملف لـ [[a.txt]] بس، الناتج:

[[/api/hello 200 application/json {"hello":"ahlan","country":"unknown"}]]
[[/files/a.txt 200 text/plain hi from r2]]
[[/files/b.txt 404 text/plain;charset=UTF-8 not found]]
[[/x 404 text/plain;charset=UTF-8 not found]]

[[country]] بـ [[unknown]] لأن [[request.cf]] مش موجود برا Cloudflare. بعد [[wrangler deploy]] هتلاقي البلد الحقيقية (زي [[EG]]).

الغلطة الشائعة: [[TypeError: Cannot read properties of undefined (reading 'get')]]، وده لأن [[env.BUCKET]] مش موجود: اسم الـ binding في [[wrangler.jsonc]] مختلف عن اللي في الكود، أو نسيت تعدّي env في الاختبار.`,
          solCode: R`// test.mjs
import worker from "./worker.mjs";
const env = {
  GREETING: "ahlan",
  BUCKET: { get: async (k) => (k === "a.txt" ? { body: "hi from r2", httpMetadata: { contentType: "text/plain" } } : null) },
};
for (const p of ["/api/hello", "/files/a.txt", "/files/b.txt", "/x"]) {
  const r = await worker.fetch(new Request("https://myapp.example.workers.dev" + p), env, {});
  console.log(p, r.status, r.headers.get("content-type"), await r.text());
}`
        },
        {
          cmd: "Cloudflare Tunnel",
          title: "السيرفر في الإنتاج من غير ولا بورت مفتوح",
          desc: R`Cloudflare Tunnel بيقلب الاتجاه: بدل ما الناس توصل لسيرفرك على 80 و 443، برنامج [[cloudflared]] على السيرفر بيفتح اتصال طالع لـ Cloudflare، والطلبات بترجع عليه. فالفايروول يقفل كل البورتات الداخلة (إلا SSH، أو حتى SSH كمان)، و IP السيرفر مبيبقاش له لازمة للزائر.

للتجربة على جهازك فيه درس [[cloudflared]] في «تاب Node». هنا نسخة الإنتاج: tunnel بيتدار من الداشبورد بـ token، و [[cloudflared]] شغال كـ service أو container، وكل hostname بيروح لخدمة داخلية.`,
          example: R`# ~/.cloudflared/config.yml (لو بتدير الـ tunnel من ملف مش من الداشبورد)
tunnel: 6ff42ae2-765d-4adf-8112-31c55c1551ef
credentials-file: /etc/cloudflared/6ff42ae2-765d-4adf-8112-31c55c1551ef.json
ingress:
  - hostname: api.example.com
    service: http://localhost:3000
  - hostname: app.example.com
    service: http://localhost:8080
  - service: http_status:404`,
          try: R`على VPS فيه API شغال على [[localhost:3000]]: من الداشبورد (Zero Trust ثم Networks ثم Tunnels) اعمل tunnel، وخد أمر التسطيب بالـ token وشغّله على السيرفر ([[sudo cloudflared service install TOKEN]]). ضيف Public hostname [[api.example.com]] على [[http://localhost:3000]]. بعدين اقفل 80 و 443 في ufw، واتأكد إن الموقع لسه شغال من برا، وإن [[curl http://SERVER_IP]] ما بيردش.`,
          flag: "script",
          deep: {
            why: "كل بورت مفتوح باب بيتفحص طول اليوم. ولما السيرفر ورا Cloudflare proxy عادي، لسه ممكن حد يلاقي الـ IP ويضربه مباشرة ويعدّي WAF و rate limiting (درس [[Cloudflare proxy و SSL]]). مع Tunnel مفيش باب أصلًا. وكمان بيحل مشكلة سيرفر في البيت أو ورا NAT من غير IP ثابت.",
            how: R`[[cloudflared]] بيفتح كذا اتصال طالع (outbound) لأقرب data centers بتوع Cloudflare. الزائر بيطلب [[api.example.com]]، الـ DNS بيشاور على [[TUNNEL_ID.cfargotunnel.com]] (CNAME برتقاني)، و Cloudflare بيبعت الطلب في الـ tunnel، و [[cloudflared]] بيوصّله لـ [[localhost:3000]].

طريقتين للإدارة: remotely-managed (من الداشبورد، والسيرفر عليه token بس، وده الأسهل والمنصوح بيه) أو locally-managed (ملف [[config.yml]] زي المثال، وملف credentials JSON من [[cloudflared tunnel create]]).

الـ [[ingress]] بيتقري من فوق لتحت، وأول قاعدة hostname بتطابق بتكسب، والقاعدة الأخيرة لازم تبقى catch-all من غير hostname (هنا 404)، وإلا [[cloudflared]] يرفض يشتغل. وتقدر تتحقق بـ [[cloudflared tunnel ingress validate]].

التشغيل الدايم: [[cloudflared service install]] بيعمل systemd service. أو في Docker Compose: container [[cloudflare/cloudflared]] بأمر [[tunnel run]] ومتغير [[TUNNEL_TOKEN]]، وعلى نفس الشبكة فالـ service يبقى [[http://api:3000]] (اسم الـ container)، ومتعملش [[ports:]] للـ API خالص.

ومع Cloudflare Access تحط تسجيل دخول (Google أو إيميل OTP) قبل hostname زي [[admin.example.com]] أو لوحة Coolify، فمحدش يوصل للصفحة أصلًا من غير ما يثبت هو مين.`,
            when: "أي سيرفر إنتاج صغير ورا Cloudflare، ولوحات التحكم الداخلية (Grafana و Coolify و pgAdmin)، والسيرفرات اللي ورا NAT. مش مناسب لو الترافيك مش HTTP (زي UDP لألعاب) من غير إعدادات إضافية.",
            mistakes: R`تعمل الـ tunnel وتسيب 80 و 443 مفتوحين، فالفايدة الأمنية راحت. وتنسى الـ catch-all في [[ingress]]. و [[ports: "3000:3000"]] في compose فالـ API مفتوح على الـ IP برضه. وتحط [[localhost]] في الـ service والـ cloudflared جوه container (الـ localhost بتاعه هو الـ container نفسه). وتحط الـ token في ملف على GitHub: الـ token ده يقدر يشغّل الـ tunnel من أي جهاز.`
          },
          teach: R`## الفكرة: ملف بيقول «كل hostname يروح فين»

المثال ملف [[config.yml]] بتاع [[cloudflared]]: رقم الـ tunnel، ومكان مفتاحه، وقايمة قواعد [[ingress]] بتتقري من فوق لتحت. ده شكل الـ tunnel اللي بتديره من ملف (locally-managed). لو بتديره من الداشبورد، نفس القواعد بتتكتب هناك باسم Public hostnames، والسيرفر عليه token بس.

جرّبنا [[cloudflared]] نسخة 2026.10.0 (الـ binary الرسمي لـ Linux) جوه [[ubuntu:24.04]]: التحقق من الملف، و «الطلب ده هيروح لأنهي قاعدة؟»، وملف غلط. الاتنين دول بيشتغلوا على الجهاز من غير حساب. أما تشغيل الـ tunnel نفسه ([[tunnel run]]) محتاج حساب Cloudflare، فده من الـ docs.

---

## ١. السطرين الأولانيين

~~~yaml
tunnel: 6ff42ae2-765d-4adf-8112-31c55c1551ef
credentials-file: /etc/cloudflared/6ff42ae2-765d-4adf-8112-31c55c1551ef.json
~~~

| السطر | معناه |
|---|---|
| [[tunnel:]] | رقم الـ tunnel، UUID (رقم عشوائي فريد بالشكل ده). بيطلع من [[cloudflared tunnel create NAME]] |
| [[credentials-file:]] | ملف JSON فيه سر الـ tunnel، [[tunnel create]] بيعمله. اللي معاه الملف ده يقدر يشغّل الـ tunnel من أي جهاز، فمكانه السيرفر بس |

---

## ٢. [[ingress:]]: القواعد

~~~yaml
ingress:
  - hostname: api.example.com
    service: http://localhost:3000
  - hostname: app.example.com
    service: http://localhost:8080
  - service: http_status:404
~~~

في YAML، [[- ]] في أول السطر معناها «عنصر في قايمة»، والسطر اللي تحته بنفس المسافة جزء من نفس العنصر. فدي ٣ قواعد:

| # | [[hostname]] | [[service]] | المعنى |
|---|---|---|---|
| 0 | [[api.example.com]] | [[http://localhost:3000]] | طلبات الـ API تروح للبرنامج اللي على بورت 3000 في نفس السيرفر |
| 1 | [[app.example.com]] | [[http://localhost:8080]] | الـ frontend على 8080 |
| 2 | (مفيش) | [[http_status:404]] | أي حاجة تانية: رد 404 من غير ما تكلّم أي برنامج |

[[localhost]] هنا من وجهة نظر [[cloudflared]] نفسه. لو [[cloudflared]] على السيرفر مباشرة، يبقى السيرفر. لو هو جوه container، يبقى الـ container نفسه، وعشان كده الـ solCode بيكتب [[http://api:3000]] (اسم الـ service في compose).

---

## ٣. اتأكد من الملف: [[ingress validate]]

~~~bash
cloudflared tunnel --config config.yml ingress validate
~~~

| الحتة | معناها |
|---|---|
| [[tunnel]] | أوامر الـ tunnels |
| [[--config config.yml]] | الملف ده (الافتراضي [[~/.cloudflared/config.yml]]) |
| [[ingress validate]] | اتأكد إن القواعد سليمة، من غير ما تشغّل حاجة |

~~~text الناتج
Validating rules from /tmp/cf/config.yml
OK
~~~

وشلنا القاعدة الأخيرة (الـ catch-all) وجرّبنا تاني:

~~~text الناتج
Validation failed: The last ingress rule must match all URLs (i.e. it should not have a hostname or path filter)
~~~

و exit code [[1]]، فلو حاطه في سكربت deploy هيقف قبل ما يشغّل ملف بايظ. ده اللي الدرس بيقوله: آخر قاعدة لازم من غير hostname.

---

## ٤. الطلب ده رايح فين؟ [[ingress rule URL]]

~~~bash
cloudflared tunnel --config config.yml ingress rule https://api.example.com/healthz
~~~

~~~text الناتج
Using rules from /tmp/cf/config.yml
Matched rule #0
	hostname: api.example.com
	service: http://localhost:3000
~~~

وبنفس الطريقة:

| الـ URL | القاعدة | الخدمة |
|---|---|---|
| [[https://api.example.com/healthz]] | [[#0]] | [[http://localhost:3000]] |
| [[https://app.example.com/]] | [[#1]] | [[http://localhost:8080]] |
| [[https://x.example.com/]] | [[#2]] | [[http_status:404]] |

الترقيم من صفر، وأول قاعدة تطابق تكسب. فلو حطيت الـ catch-all فوق، كل حاجة هتاخد 404 (والـ validate هيرفض ده برضه لأنها مش الأخيرة).

---

## ٥. الـ solCode: الإنتاج بـ Docker Compose

~~~yaml
  tunnel:
    image: cloudflare/cloudflared:latest
    command: tunnel --no-autoupdate run
    environment:
      - TUNNEL_TOKEN=$__{TUNNEL_TOKEN}
    restart: unless-stopped
~~~

| السطر | معناه |
|---|---|
| [[image: cloudflare/cloudflared]] | الـ image الرسمية |
| [[tunnel --no-autoupdate run]] | شغّل الـ tunnel. [[--no-autoupdate]] لأن الـ container بيتحدّث بـ image جديدة، مش بإنه يحدّث نفسه |
| [[TUNNEL_TOKEN=$__{TUNNEL_TOKEN}]] | الـ token من متغير بيئة على السيرفر (ملف [[.env]] جنب الـ compose مش على Git). [[tunnel run --help]] بيقول إن [[--token]] بيتقري من [[$TUNNEL_TOKEN]] |
| [[restart: unless-stopped]] | لو وقع أو السيرفر عمل restart، يقوم تاني |

وخدمة [[api]] مفيهاش [[ports:]] خالص: محدش من برا يوصلها، والوحيد اللي بيكلّمها هو [[cloudflared]] على شبكة compose الداخلية.

---

## الخلاصة

| عايز | الأمر |
|---|---|
| نسخة [[cloudflared]] | [[cloudflared --version]] |
| تتأكد من [[config.yml]] | [[cloudflared tunnel ingress validate]] |
| تعرف طلب رايح لأنهي خدمة | [[cloudflared tunnel ingress rule URL]] |
| تشغّل (محتاج حساب) | [[cloudflared tunnel run]] أو [[cloudflared service install TOKEN]] |

> القواعد من فوق لتحت، أول واحدة تطابق تكسب، والأخيرة من غير hostname. و [[localhost]] معناه المكان اللي [[cloudflared]] نفسه شغال فيه.`,
          lines: [
            "رقم الـ tunnel (من cloudflared tunnel create).",
            "ملف المفاتيح بتاعه.",
            "قواعد التوجيه، بالترتيب.",
            "الطلبات على api.example.com...",
            "...تروح للـ API على البورت ٣٠٠٠ محليًا.",
            "والـ frontend على دومين تاني...",
            "...على ٨٠٨٠.",
            "أي حاجة تانية: 404 (لازم تبقى آخر قاعدة)."
          ],
          sol: R`بعد التسطيب، [[systemctl status cloudflared]] يقول [[active (running)]]، والداشبورد يوري الـ tunnel بحالة [[HEALTHY]]. و [[dig +short api.example.com]] يرجّع IPs بتاعة Cloudflare، و [[curl -sI https://api.example.com/healthz]] يرجّع 200 ومعاه [[cf-ray]].

بعد [[sudo ufw delete allow 80/tcp]] و [[sudo ufw delete allow 443/tcp]]: الموقع لسه شغال من برا (لأن الاتصال طالع من السيرفر)، و [[curl -m 5 http://SERVER_IP]] يعمل timeout.

الغلطات الشائعة: [[502 Bad Gateway]] من Cloudflare، ولوج [[cloudflared]] فيه [[connection refused]]، وده لأن الـ API مش شغال أو بيسمع على بورت تاني أو cloudflared في container وانت كاتب localhost. أو [[1033]] (Argo Tunnel error)، وده معناه إن مفيش [[cloudflared]] متصل بالـ tunnel ده دلوقتي.`,
          solCode: R`# docker-compose.yml: الـ API من غير أي ports، و cloudflared بيوصله بالاسم
services:
  api:
    build: .
    environment:
      - PORT=3000
  tunnel:
    image: cloudflare/cloudflared:latest
    command: tunnel --no-autoupdate run
    environment:
      - TUNNEL_TOKEN=$__{TUNNEL_TOKEN}
    restart: unless-stopped
# وفي الداشبورد: Public hostname api.example.com على http://api:3000`
        }
      ]
    },
    {
      t: "منصات جاهزة للفرق الصغيرة",
      l: 2,
      n: "push والموقع يطلع، وقاعدة بيانات من غير سيرفر، بس افهم الحدود قبل ما تتفاجئ",
      items: [
        {
          cmd: "vercel",
          title: "Next.js على منصة جاهزة: preview و env والحدود",
          desc: R`Vercel بيبني Next.js مع كل push: الـ branch الرئيسي production، وأي branch أو PR تاني preview بـ URL لوحده، والصفحات والـ API routes بتشتغل Functions والملفات الثابتة على الـ CDN.

متغيرات البيئة ليها ٣ بيئات (Production و Preview و Development)، وأي تغيير فيها بيتطبق على الـ deploy الجاي بس. ولازم تعرف الحدود: مدة الدالة (٥ دقايق افتراضي)، وجسم الطلب ٤.٥ ميجا، وخطة Hobby للاستخدام الشخصي غير التجاري بس.`,
          example: R`npm i -g vercel
vercel link
vercel env add DATABASE_URL production
vercel env pull .env.local
vercel
vercel --prod
vercel logs https://myapp-abc123.vercel.app`,
          try: "اربط مشروع Next.js من GitHub، واعمل branch فيه تعديل صغير وافتح PR: هتلاقي تعليق فيه URL الـ preview. غيّر متغير بيئة وافتح الـ preview القديم: لسه بالقيمة القديمة.",
          deep: {
            why: "لـ Next.js، Vercel أسهل طريقة: مفيش Dockerfile ولا Nginx ولا SSL. بس الناس بتتفاجئ: فاتورة Pro، أو رفع ملف ١٠ ميجا بيقع، أو كل query بطيئة، أو متغير جديد مش باين.",
            how: R`كل deploy نسخة ثابتة مستقلة بـ URL خاص، والدومين بيشاور على آخر production. عشان كده الـ rollback لحظي (Instant Rollback)، وعشان كده تغيير متغير بيئة مش بيأثر على deploy قديم: المتغيرات بتتقرا وقت الـ build (خصوصًا [[NEXT_PUBLIC_*]] اللي بتتكتب جوه الـ JS نفسه).

الـ preview بياخد متغيرات Preview، فخلّي فيها قاعدة بيانات تجربة مش الإنتاج. Neon مثلًا بيعمل branch من القاعدة لكل preview.

الـ Functions افتراضي بتشتغل في region واحدة في أمريكا ([[iad1]]). لو القاعدة في فرانكفورت، كل query بتعدّي الأطلنطي. غيّر region الدوال لأقرب واحدة للقاعدة ([[fra1]]) من إعدادات المشروع أو [[vercel.json]].

الحدود المهمة: مدة الدالة ٣٠٠ ثانية افتراضي (Pro يقدر يوصل ٨٠٠). جسم الطلب والرد ٤.٥ ميجا، فرفع الملفات يبقى presigned لـ S3 أو storage. مفيش ديسك دايم: أي ملف تكتبه بيروح. والـ WebSockets الطويلة والشغل الخلفي التقيل مش مكانهم.

Netlify نفس الفكرة تقريبًا: deploy previews، ومتغيرات بيئة لكل context، و [[netlify deploy --prod]].`,
            when: "Next.js أو frontend لفريق صغير عايز يركز على المنتج. وقارن السعر مع VPS لما الترافيك يكبر.",
            mistakes: "مشروع لعميل بيدفع على خطة Hobby. و preview متوصل بقاعدة الإنتاج فأي تجربة بتكتب في الداتا الحقيقية. وتنسى تغيّر region الدوال. وتحط سر في متغير بيبدأ بـ [[NEXT_PUBLIC_]] فيطلع في الـ JS لأي حد يفتح الموقع."
          },
          teach: R`## الفكرة: ٧ أوامر هي دورة حياة مشروع على Vercel

سطّب، اربط الفولدر بمشروع، حط سر، نزّل المتغيرات لجهازك، انشر preview، انشر production، اقرا اللوجات. والعادي إن أغلب الـ deploys بتحصل لوحدها من GitHub، والـ CLI للحاجات اللي بتعملها بإيدك.

اللي اتشغّل هنا: Vercel CLI نسخة 63.1.0 بـ Node 24 على ويندوز ([[--version]] و [[--help]] بتاع الأوامر). كل الأوامر التانية بتكلّم حساب Vercel، فشكل ناتجها من الـ docs.

---

## ١. [[npm i -g vercel]]

[[-g]] (global) يعني سطّبه مرة على الجهاز كله، فأمر [[vercel]] يشتغل من أي فولدر. ولو مش عايز تسطّب global، [[npx vercel]] بيعمل نفس الحاجة.

~~~text npx vercel --version
Vercel CLI 63.1.0
~~~

---

## ٢. [[vercel link]]

بيسألك: أنهي حساب (scope)، وتربط بمشروع موجود ولا تعمل جديد. وبعدها بيعمل فولدر [[.vercel/]] فيه [[project.json]] (رقم المشروع ورقم الحساب). كل الأوامر الجاية بتعرف المشروع منه. والفولدر ده بيتحط في [[.gitignore]] لوحده.

---

## ٣. [[vercel env add DATABASE_URL production]]

| الحتة | معناها |
|---|---|
| [[env add]] | ضيف متغير بيئة |
| [[DATABASE_URL]] | اسمه |
| [[production]] | لأنهي بيئة. التلاتة: [[production]] و [[preview]] و [[development]] |

القيمة مش في الأمر: بيسألك عليها (فمتبقاش في history الترمنال). والـ help بيوري إنك تقدر تديه كذا بيئة مرة واحدة:

~~~text من vercel env --help
  add     name [environment]          Add an Environment Variable
  pull    [filename]                  Pull Environment Variables into a
                                      local file (default: .env.local)
    $ vercel env add API_URL production,preview,development
~~~

> المتغير الجديد مش بيوصل للـ deploy الشغال دلوقتي. بيتقري وقت الـ build، فلازم deploy جديد.

---

## ٤. [[vercel env pull .env.local]]

بينزّل متغيرات بيئة [[development]] في ملف [[.env.local]] على جهازك، و Next.js بيقراه لوحده مع [[npm run dev]]. والـ help بيقول إن [[.env.local]] هو الاسم الافتراضي أصلًا، فـ [[vercel env pull]] لوحده نفس الحاجة. الملف ده فيه أسرار: مكانه [[.gitignore]].

---

## ٥. [[vercel]]

من غير أي حاجة = [[vercel deploy]]: ارفع الفولدر الحالي، و Vercel يبنيه، ويديك URL preview لوحده (شكله [[myapp-abc123-team.vercel.app]]). الـ production مش بيتلمس.

## ٦. [[vercel --prod]]

نفس الرفع، بس الـ deploy ده يبقى production، والدومين بتاعك يشاور عليه.

| | [[vercel]] | [[vercel --prod]] | push على GitHub |
|---|---|---|---|
| البيئة | preview | production | preview لأي branch، و production للـ branch الرئيسي |
| المتغيرات | Preview | Production | حسب البيئة |
| الدومين | URL خاص بيه | الدومين بتاعك + URL خاص | نفس الكلام |

كل deploy نسخة مستقلة ثابتة (immutable) ليها URL لوحدها. عشان كده الـ preview القديم بيفضل بالمتغيرات القديمة.

---

## ٧. [[vercel logs https://myapp-abc123.vercel.app]]

بيعرض لوجات الطلبات لـ deploy معين (بالـ URL أو الـ ID). ومن الـ help:

~~~text من vercel logs --help
  ▲ vercel logs [url|deploymentId] [options]
  Display request logs for a project.
  Use --follow to stream live runtime logs from a deployment.
  Source types: λ = serverless, ε = edge/middleware, ◇ = static/external
~~~

[[--follow]] بيفضل مفتوح ويطبع اللوجات وهي بتحصل. وفيه [[--branch]] و [[--environment]] للفلترة. والرموز اللي في الآخر بتقولك الطلب اتخدم منين: دالة serverless، ولا edge، ولا ملف ثابت.

---

## Netlify: نفس الفكرة

| Vercel | Netlify |
|---|---|
| [[vercel link]] | [[netlify link]] |
| [[vercel env add NAME]] | [[netlify env:set NAME VALUE]] |
| [[vercel]] | [[netlify deploy]] (draft URL) |
| [[vercel --prod]] | [[netlify deploy --prod]] |

(أوامر Netlify من الـ docs.)

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[vercel link]] | يربط الفولدر بمشروع ([[.vercel/]]) |
| [[vercel env add NAME ENV]] | متغير لبيئة، بيسأل عن القيمة |
| [[vercel env pull]] | متغيرات development في [[.env.local]] |
| [[vercel]] | deploy preview |
| [[vercel --prod]] | deploy production |
| [[vercel logs URL]] | لوجات deploy معين |

> أي تغيير في المتغيرات = deploy جديد عشان يبان. والحدود اللي في الـ desc (٥ دقايق للدالة، و ٤.٥ ميجا للطلب) بتحدد إيه اللي ميتعملش على Vercel أصلًا.`,
          lines: [
            "سطّب الـ CLI.",
            "اربط الفولدر ده بمشروع على Vercel.",
            "ضيف متغير لبيئة الـ production (بيسألك عن القيمة).",
            "نزّل متغيرات Development لملف محلي.",
            "deploy كـ preview (URL لوحده).",
            "deploy للـ production.",
            "لوجات deploy معين."
          ],
          sol: R`بعد ربط الريبو وفتح الـ PR، Vercel bot بيكتب تعليق على الـ PR فيه جدول بالـ Status (Building ثم Ready) ولينك Preview زي [[https://myapp-git-feature-x-yourteam.vercel.app]]، وكل push جديد على الـ branch بيعمل preview جديد ويحدّث التعليق. والـ Checks في الـ PR فيها Vercel كـ check.

بعد ما تغيّر متغير بيئة للـ Preview من الداشبورد أو بـ [[vercel env]]، الـ preview القديم هيفضل بالقيمة القديمة. ده مقصود: كل deployment immutable، والمتغيرات بتتقري وقت الـ build (و [[NEXT_PUBLIC_*]] بتتكتب جوه الـ JS نفسه). عشان تاخد القيمة الجديدة لازم deployment جديد: push تاني أو Redeploy من الداشبورد.

الغلطة الشائعة: تغيّر المتغير في Production بس وتستغرب إن الـ preview مش شايفه (كل environment ليه قيم لوحده). أو تنسى تعمل [[vercel env pull]] تاني فالـ [[.env.local]] على جهازك بالقيمة القديمة. وتانية: [[vercel logs]] مبيعرضش لوجات قديمة كتير على الخطة المجانية، فلو مش لاقي خطأ امبارح، ده سبب محتمل.`
        },
        {
          cmd: "Supabase / Neon",
          title: "Postgres مُدار من غير AWS ومن غير سيرفر",
          desc: R`Supabase و Neon بيدّوك Postgres حقيقي بـ connection string وخطة مجانية، و Supabase معاه Auth و Storage و Realtime، و Neon قاعدة بس بتنام لما محدش يستخدمها وبتعمل branch من القاعدة في ثواني.

أهم حاجة تفهمها: فيه connection string مباشر (للـ migrations والسيرفرات الدايمة) وواحد عن طريق pooler (للـ serverless وأي حاجة بتفتح اتصالات كتير).`,
          example: R`DATABASE_URL="postgresql://postgres.abcdefghijklmnop:YOUR_PASSWORD@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
DIRECT_URL="postgresql://postgres:YOUR_PASSWORD@db.abcdefghijklmnop.supabase.co:5432/postgres"
NEON_POOLED_URL="postgresql://app:YOUR_PASSWORD@ep-cool-name-123456-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require"
NEON_DIRECT_URL="postgresql://app:YOUR_PASSWORD@ep-cool-name-123456.eu-central-1.aws.neon.tech/neondb?sslmode=require"`,
          try: "افتح مشروع Supabase أو Neon مجاني في فرانكفورت، وخد الاتنين. شغّل migration بالمباشر، والتطبيق بالـ pooler. وشغّل [[SELECT count(*) FROM pg_stat_activity;]] وانت بتضرب الـ API بـ ٥٠ طلب، وقارن بين الطريقتين.",
          flag: "script",
          deep: {
            why: "لمشروع صغير أو MVP، RDS غالي ومعقد (VPC و security groups وباك أب). Supabase أو Neon بيدّوك قاعدة في دقيقة. بس لو مفهمتش الـ pooling، أول ضغط على دوال serverless هيخلّص الاتصالات والقاعدة تقفل الباب.",
            how: R`كل اتصال Postgres عملية على السيرفر بتاكل رام، والعدد محدود (عشرات في الخطط الصغيرة). سيرفر Node دايم بيفتح pool فيه ١٠ اتصالات ويعيد استخدامهم. لكن ١٠٠ دالة serverless في نفس اللحظة = ١٠٠ اتصال.

الـ pooler (Supavisor في Supabase، و PgBouncer في Neon) بيقف في النص: آلاف الاتصالات من ناحية التطبيق، وعدد قليل حقيقي للقاعدة. في transaction mode (Supabase بورت 6543، و Neon الهوست اللي فيه [[-pooler]]) الاتصال الحقيقي بيرجع للـ pool بعد كل transaction. والتمن: مفيش حاجة بتعيش بين transactions (named prepared statements و [[SET]] و [[LISTEN]])، فلو الـ ORM بيستخدم prepared statements لازم تقفلها.

الـ migrations محتاجة session كاملة، فتروح على المباشر. في Supabase المباشر ([[db.REF.supabase.co:5432]]) على IPv6 بس إلا لو دفعت add-on، ولو شبكتك IPv4 استخدم session mode على الـ pooler بورت 5432. وإعداد الاتنين مع Prisma في تاب «SQL و Prisma».

Neon: الـ compute بينام بعد ٥ دقايق من غير استخدام، وأول طلب بعدها بياخد جزء من الثانية زيادة. والـ branching بيعمل نسخة من القاعدة من غير ما ينسخ الداتا فعلًا (copy-on-write)، فتدّي كل preview قاعدته.

Supabase المجاني: المشروع بيتوقف (pause) لو مفيش نشاط أسبوع، ومفيش باك أب تلقائي تعتمد عليه. للإنتاج خطة مدفوعة أو باك أب بإيدك ([[pg_dump]]).`,
            when: "MVP، ومشاريع صغيرة ومتوسطة، ومع Vercel. انقل لـ RDS لما تحتاج VPC خاصة أو تحكم أكتر أو الحجم يكبر.",
            mistakes: "migrations على الـ pooler في transaction mode فتقع بأخطاء prepared statements أو locks غريبة. ومشروع إنتاج على الخطة المجانية لحد ما يتوقف في أجازة. واستخدام [[service_role]] key بتاع Supabase في كود الـ frontend: ده بيعدّي كل الـ RLS. والقاعدة في region والتطبيق في region تانية."
          },
          teach: R`## الفكرة: ٤ connection strings، والفرق بينهم في الهوست والبورت

المثال مفيهوش أوامر، فيه ٤ متغيرات بيئة: لكل منصة واحد عن طريق الـ pooler (للتطبيق) وواحد مباشر (للـ migrations). لو فهمت تقرا الـ URL، هتعرف تفرّق بينهم من نظرة.

الحسابات والـ REF ([[abcdefghijklmnop]]) والباسورد أمثلة. اللي اتشغّل هنا: فكّينا الـ ٤ URLs بـ [[new URL()]] في Node 24، وسألنا الـ DNS الحقيقي عن هوستات Supabase و Neon من [[ubuntu:24.04]] (أكتوبر ٢٠٢٦). الاتصال الفعلي محتاج مشروع، فاللي عن سلوك الـ pooler من الـ docs.

---

## ١. تشريح connection string

~~~text
postgresql://postgres.abcdefghijklmnop:YOUR_PASSWORD@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
~~~

| الحتة | هنا | معناها |
|---|---|---|
| [[postgresql://]] | | البروتوكول (و [[postgres://]] نفس المعنى) |
| اليوزر | [[postgres.abcdefghijklmnop]] | اسم اليوزر، وفي Supabase pooler بيبقى [[postgres.]] + رقم المشروع، عشان الـ pooler يعرف يوصّلك لأنهي مشروع |
| [[:]] ثم الباسورد | [[YOUR_PASSWORD]] | لو فيه رموز زي [[@]] أو [[#]] لازم تتكتب encoded ([[%40]] و [[%23]]) |
| [[@]] ثم الهوست | [[aws-0-eu-central-1.pooler.supabase.com]] | السيرفر |
| [[:6543]] | | البورت |
| [[/postgres]] | | اسم قاعدة البيانات |
| [[?sslmode=require]] | (في Neon) | إعدادات إضافية: لازم اتصال مشفّر |

---

## ٢. فكّيناهم بالكود

~~~js
const u = new URL(s);
console.log(name, "user=" + u.username, "host=" + u.hostname, "port=" + (u.port || "(default 5432)"), "db=" + u.pathname.slice(1), u.search);
~~~

[[new URL()]] بيفهم أي URL مش بس http. و [[u.port]] بيرجع نص فاضي لو مفيش بورت، فـ [[||]] بتحط الكلام اللي بعدها. و [[pathname.slice(1)]] بيشيل الـ [[/]] من أول اسم القاعدة.

~~~text الناتج
DATABASE_URL     user=postgres.abcdefghijklmnop host=aws-0-eu-central-1.pooler.supabase.com port=6543 db=postgres
DIRECT_URL       user=postgres host=db.abcdefghijklmnop.supabase.co port=5432 db=postgres
NEON_POOLED_URL  user=app host=ep-cool-name-123456-pooler.eu-central-1.aws.neon.tech port=(default 5432) db=neondb ?sslmode=require
NEON_DIRECT_URL  user=app host=ep-cool-name-123456.eu-central-1.aws.neon.tech port=(default 5432) db=neondb ?sslmode=require
~~~

### نقرا الجدول

| المتغير | إزاي تعرف إنه pooler ولا مباشر | يستخدمه مين |
|---|---|---|
| [[DATABASE_URL]] (Supabase) | الهوست فيه [[pooler.supabase.com]] والبورت [[6543]] = transaction mode | التطبيق والدوال |
| [[DIRECT_URL]] (Supabase) | [[db.REF.supabase.co]] وبورت [[5432]] = Postgres نفسه | الـ migrations |
| [[NEON_POOLED_URL]] | الهوست فيه [[-pooler]] | التطبيق والدوال |
| [[NEON_DIRECT_URL]] | نفس الهوست من غير [[-pooler]] | الـ migrations |

لاحظ إن Neon مفيهوش بورت مكتوب، فالـ driver بياخد الافتراضي [[5432]] في الاتنين، والفرق كله في كلمة [[-pooler]]. أما Supabase فالفرق في الهوست **والبورت**: نفس هوست الـ pooler على [[5432]] = session mode، وعلى [[6543]] = transaction mode.

---

## ٣. سألنا الـ DNS: الهوستات دي بتشاور على إيه؟

~~~text dig +short aws-0-eu-central-1.pooler.supabase.com
pool-tcp-eu-central-1-fc90801-b77715c9537e506c.elb.eu-central-1.amazonaws.com.
18.198.30.239
52.59.152.35
~~~

الـ pooler بتاع Supabase في فرانكفورت ([[eu-central-1]]) هو load balancer على AWS ([[elb.eu-central-1.amazonaws.com]])، يعني نقطة دخول واحدة لكل المشاريع في الـ region دي، وعشان كده اسم المشروع جوه اليوزر.

~~~text dig +short ep-cool-name-123456-pooler.eu-central-1.aws.neon.tech
eu-central-1.aws.neon.tech.
52.57.171.9
3.126.212.11
~~~

الاسم ده مخترع ومع ذلك رد! Neon عامل wildcard DNS: أي [[ep-...]] بيشاور على بوابة الـ region كلها. البوابة بتعرف أنهي قاعدة انت عايزها من اسم الهوست اللي بيتبعت جوه الـ TLS (اسمه SNI). عشان كده [[sslmode=require]] مش رفاهية في Neon: من غير TLS مفيش SNI، والبوابة متعرفش توصّلك.

---

## ٤. الـ solCode: عدّ الاتصالات

~~~sql
SELECT usename, application_name, state, count(*)
FROM pg_stat_activity
WHERE backend_type = 'client backend'
GROUP BY 1, 2, 3
ORDER BY 4 DESC;
~~~

| الحتة | معناها |
|---|---|
| [[pg_stat_activity]] | view فيه صف لكل process شغال في Postgres، يعني لكل اتصال |
| [[usename]] | اليوزر (مكتوبة كده من غير r، ده اسمها الحقيقي) |
| [[application_name]] | اسم البرنامج اللي فاتح الاتصال لو بعته |
| [[state]] | [[active]] (بينفّذ دلوقتي) أو [[idle]] (فاتح ومستني) |
| [[WHERE backend_type = 'client backend']] | اتصالات العملاء بس، من غير processes Postgres الداخلية |
| [[GROUP BY 1, 2, 3]] | جمّع بأول ٣ أعمدة (بالترتيب مش بالاسم) |
| [[ORDER BY 4 DESC]] | رتّب بالعمود الرابع ([[count]]) من الكبير للصغير |

والسطر اللي بعده بيضرب ٥٠ طلب مع بعض:

~~~bash
seq 50 | xargs -P 50 -I{} curl -s -o /dev/null https://myapp.example.com/api/items
~~~

[[seq 50]] بيطبع الأرقام من 1 لـ 50، و [[xargs]] بيشغّل أمر لكل سطر، و [[-P 50]] يعني ٥٠ في نفس الوقت، و [[-I{}]] بيحدد علامة لمكان الرقم (مش مستخدمة هنا، بس بتخلي [[xargs]] يشغّل أمر منفصل لكل سطر). و [[-o /dev/null]] بيرمي الرد. فيه درس كامل لـ [[xargs]] في تاب bash.

وانت بتشغّل الـ ٥٠، شغّل الـ SQL كذا مرة: بالمباشر من serverless العدد بيطلع، وبالـ pooler بيفضل صغير.

---

## الخلاصة

| | Supabase | Neon |
|---|---|---|
| للتطبيق (pooler) | [[REGION.pooler.supabase.com:6543]]، اليوزر [[postgres.REF]] | الهوست فيه [[-pooler]] |
| للـ migrations (مباشر) | [[db.REF.supabase.co:5432]] (IPv6 بس من غير add-on) | نفس الهوست من غير [[-pooler]] |
| بديل مباشر على IPv4 | الـ pooler على [[5432]] (session mode) | المباشر شغال على IPv4 |

> transaction mode = الاتصال الحقيقي بيرجع للـ pool بعد كل transaction، فاللي بيعيش أطول من كده (prepared statements و [[SET]] و [[LISTEN]]) مش مضمون.`,
          lines: [
            "Supabase عن طريق الـ pooler (بورت 6543، transaction mode): للتطبيق والدوال.",
            "Supabase مباشر (5432): للـ migrations.",
            "Neon عن طريق الـ pooler: الهوست فيه -pooler.",
            "Neon مباشر: نفس الهوست من غير -pooler، للـ migrations."
          ],
          sol: R`الأرقام بتفرق حسب الإعدادات، بس الشكل المتوقع: [[pg_stat_activity]] فيه أصلًا صفوف كتير من المنصة نفسها (خصوصًا Supabase: خدمات زي Auth و Realtime و PostgREST)، فقارن باتصالات يوزر التطبيق بس بالـ query اللي تحت. وانت بتضرب ٥٠ طلب: بالـ direct URL من تطبيق serverless، الرقم بيطلع مع عدد النسخ اللي اشتغلت (كل نسخة ليها pool لوحدها)، وممكن يوصل للحد وتاخد [[too many connections]] أو [[remaining connection slots are reserved]]. بالـ pooler، عدد اتصالات Postgres الحقيقية بيفضل صغير وثابت تقريبًا، لأن الـ pooler (Supavisor أو PgBouncer في Neon) بيوزّع الطلبات على عدد قليل من الاتصالات.

والـ migration بالمباشر: [[prisma migrate deploy]] المفروض يعدّي على [[DIRECT_URL]] (أو [[NEON_DIRECT_URL]]). لو شغّلته على الـ pooler في transaction mode ممكن يقف أو يفشل، لأن الـ migrations محتاجة session كاملة (locks و prepared statements).

الغلطة الأشهر: التطبيق بـ Prisma على بورت 6543 من غير [[?pgbouncer=true]]، فيطلع [[prepared statement "s0" already exists]] بشكل عشوائي تحت الضغط. وتانية: تحط الـ pooler URL في [[directUrl]] بالغلط فالـ migrate يفشل.`,
          solCode: R`SELECT usename, application_name, state, count(*)
FROM pg_stat_activity
WHERE backend_type = 'client backend'
GROUP BY 1, 2, 3
ORDER BY 4 DESC;
# في ترمنال تاني، ٥٠ طلب مع بعض:
seq 50 | xargs -P 50 -I{} curl -s -o /dev/null https://myapp.example.com/api/items`
        }
      ]
    }
]);
