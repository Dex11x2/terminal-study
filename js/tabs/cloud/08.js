// تكملة تاب cloud: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cloud/01.js (شرح حقول الدرس في أوله)
MORE("cloud", [
    {
      t: "منصات جاهزة للباك إند",
      l: 2,
      n: "API و Postgres و worker من GitHub من غير ما تدير سيرفر: Render و Railway و Fly.io، أو PaaS على الـ VPS بتاعك، وإمتى الحساب يقلب",
      items: [
        {
          cmd: "render.yaml",
          title: "Render: API و Postgres و worker في ملف واحد",
          desc: R`Render بيشغّل الباك إند بتاعك من الريبو: web service (API ليه URL)، و background worker (من غير بورت، بيسحب jobs)، و cron job، و Postgres و Key Value (زي Redis) مُدارين، وكل ده ممكن يتوصف في ملف [[render.yaml]] (اسمه عندهم Blueprint) في جذر الريبو.

الملف بيربط الخدمات ببعض: [[fromDatabase]] بيحط connection string القاعدة في متغير البيئة لوحده، و [[preDeployCommand]] بيشغّل الـ migrations قبل ما النسخة الجديدة تستقبل ترافيك. وكل push على الـ branch بيعمل deploy.

الخطة المجانية للتجربة بس (الأرقام وقت كتابة الدرس وممكن تتغير، راجع صفحة الأسعار): الـ web service المجاني بينام بعد حوالي ربع ساعة من غير ترافيك وأول طلب بعدها بياخد ثواني، و Postgres المجاني بيتمسح بعد حوالي ٣٠ يوم. والـ worker و preDeployCommand محتاجين خطة مدفوعة.`,
          example: R`# render.yaml في جذر الريبو
services:
  - type: web
    name: shop-api
    runtime: node
    region: frankfurt
    plan: starter
    buildCommand: npm ci && npm run build
    preDeployCommand: npx prisma migrate deploy
    startCommand: node dist/server.js
    healthCheckPath: /healthz
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: shop-db
          property: connectionString
      - key: JWT_SECRET
        generateValue: true
  - type: worker
    name: shop-worker
    runtime: node
    region: frankfurt
    plan: starter
    buildCommand: npm ci && npm run build
    startCommand: node dist/worker.js
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: shop-db
          property: connectionString
databases:
  - name: shop-db
    region: frankfurt
    plan: basic-256mb`,
          try: R`خد مشروع Express فيه [[/healthz]] وملف worker بسيط (حلقة بتطبع كل ١٠ ثواني وبتقرا من القاعدة). حط [[render.yaml]] زي المثال، وفي الداشبورد اختار New ثم Blueprint ووصّله بالريبو. بعد أول deploy: افتح لوجات الـ worker وشوف إنه وصل للقاعدة، وغيّر حاجة في الكود واعمل push وتابع الـ deploy التاني.`,
          flag: "script",
          deep: {
            why: "أغلب الناس بتعرف تنشر frontend على Vercel، بس أول ما يبقى عندها Express أو FastAPI ومعاه Postgres و worker بيبعت إيميلات، بتتنقل على طول لـ VPS وتقعد أسبوع في Nginx و systemd و SSL. منصة زي Render بتديك الـ ٣ حاجات دول في ملف واحد، و SSL ودومين ولوجات وباك أب للقاعدة جاهزين.",
            how: R`كل خدمة في [[services]] ليها [[type]]: [[web]] بياخد بورت من متغير [[PORT]] اللي Render بيحطه (فلازم تطبيقك يسمع على [[process.env.PORT]] وعلى [[0.0.0.0]])، و [[worker]] نفس الكود بس من غير بورت ولا URL، و [[cron]] بياخد [[schedule]]، و [[keyvalue]] لـ Redis-compatible.

[[runtime: node]] معناها Render هيبني بنفسه ([[buildCommand]]). ولو عندك Dockerfile اكتب [[runtime: docker]] وهو يبني الـ image (تاب Docker)، ودي أحسن عشان نفس الـ image تشتغل في أي حتة لما تنقل.

[[preDeployCommand]] بيشتغل بعد الـ build وقبل التبديل. لو فشل، النسخة القديمة بتفضل شغالة. ده المكان الصح لـ [[prisma migrate deploy]] (تاب «SQL و Prisma»)، مش جوه [[startCommand]]: لو عندك نسختين من الـ API، الاتنين هيحاولوا يعملوا migrate في نفس الوقت.

[[healthCheckPath]]: Render مش هيبعت ترافيك للنسخة الجديدة غير لما المسار ده يرد 200، وده اللي بيدّيك deploy من غير downtime.

[[fromDatabase]] بـ [[connectionString]] بيحط الـ internal URL: الخدمات والقاعدة في نفس الـ region بيتكلموا على شبكة Render الخاصة. عشان كده حط كله في نفس الـ [[region]]. و [[generateValue: true]] بيعمل سر عشوائي مرة واحدة. والأسرار اللي انت عارف قيمتها (مفتاح Stripe) اكتبها [[sync: false]] وحط قيمتها من الداشبورد، متكتبهاش في الملف.

الفلوس (تقريبي ومتغير): فيه اشتراك للـ workspace، وكل خدمة ليها instance بسعر شهري ثابت، والقاعدة بسعر حسب حجمها. يعني API + worker + قاعدة = ٣ بنود، وده اللي بيخلّي الفاتورة تكبر أسرع من VPS لما الخدمات تزيد (درس [[PaaS ولا VPS: الحساب]]).`,
            when: "باك إند Node أو Python لفريق صغير أو فريلانسر، خصوصًا لو محتاج worker و cron، ومحدش عايز يبقى sysadmin. والخطة المجانية للديمو والبورتفوليو بس.",
            mistakes: R`تحط مشروع عميل حقيقي على Postgres المجاني وتتفاجئ إنه اتمسح بعد شهر. والتطبيق يسمع على [[localhost]] أو بورت ثابت ٣٠٠٠ فالـ deploy يفشل في health check. و [[prisma migrate deploy]] جوه [[startCommand]]. والقاعدة في [[oregon]] (الافتراضي) والـ API في فرانكفورت. والملفات اللي اليوزر بيرفعها تتحفظ على ديسك الـ instance: بتتمسح مع كل deploy، فاستخدم S3 أو R2. وفي الانترفيو: «إيه الفرق بين web service و worker؟» الـ worker مفيش حد بيكلّمه من برا، هو اللي بيسحب الشغل من queue.`
          },
          teach: R`## الفكرة: ملف واحد بيوصف ٣ حاجات وبيربطهم ببعض

[[render.yaml]] فيه قسمين: [[services]] (الـ API والـ worker) و [[databases]] (Postgres). والحتة الذكية إن الخدمتين بياخدوا عنوان القاعدة منها بالاسم، من غير ما تنسخه بإيدك.

اتجرّب هنا (ويندوز 11، Node 24): قرينا الملف بمكتبة [[yaml]] عشان نتأكد إنه YAML سليم ونشوف Render هيفهمه إزاي، وشغّلنا [[server.ts]] بتاع الـ solCode (كـ JavaScript) جوه [[node:22-slim]] بـ [[PORT]] زي Render. الـ Blueprint نفسه والـ deploy محتاجين حساب Render، فدول من الـ docs.

---

## ١. شكل YAML في سطرين

- [[key: value]] = خانة وقيمتها.
- المسافات في أول السطر هي اللي بتقول مين جوه مين (مسافتين لكل مستوى، ومينفعش Tab).
- [[- ]] في أول السطر = عنصر جديد في قايمة.

فـ [[services:]] قايمة فيها عنصرين (كل واحد بيبدأ بـ [[- type:]])، و [[databases:]] قايمة فيها عنصر واحد.

قريناه بالكود وطبعنا الملخص:

~~~text الناتج
service web shop-api | envVars: DATABASE_URL<-db:shop-db.connectionString, JWT_SECRET<-generated
service worker shop-worker | envVars: DATABASE_URL<-db:shop-db.connectionString
database shop-db frankfurt basic-256mb
~~~

يعني: خدمتين، والاتنين [[DATABASE_URL]] بتاعهم جاي من [[shop-db]]، و [[JWT_SECRET]] متولّد. لو فيه مسافة غلط في الملف كان الـ parse هيفشل أو الشكل هيطلع مختلف، فده اختبار سريع قبل ما ترفع.

---

## ٢. خدمة [[web]]: سطر سطر

~~~yaml
  - type: web
    name: shop-api
    runtime: node
    region: frankfurt
    plan: starter
~~~

| الخانة | معناها |
|---|---|
| [[type: web]] | خدمة بتستقبل HTTP وليها URL. التانيين: [[worker]] و [[cron]] و [[keyvalue]] |
| [[name: shop-api]] | الاسم، والـ URL بيبقى [[shop-api-xxxx.onrender.com]] |
| [[runtime: node]] | Render يبني بـ Node من غير Dockerfile. أو [[docker]] لو عندك Dockerfile |
| [[region: frankfurt]] | المكان. الافتراضي [[oregon]] في أمريكا |
| [[plan: starter]] | حجم الـ instance وسعرها. [[free]] بتنام بعد ربع ساعة |

~~~yaml
    buildCommand: npm ci && npm run build
    preDeployCommand: npx prisma migrate deploy
    startCommand: node dist/server.js
    healthCheckPath: /healthz
~~~

الترتيب اللي Render بيشغّلهم بيه:

| # | الخانة | بيحصل إيه | لو فشل |
|---|---|---|---|
| ١ | [[buildCommand]] | [[npm ci]] (تسطيب بالظبط من [[package-lock.json]]) ثم البناء | الـ deploy يقف، والقديم شغال |
| ٢ | [[preDeployCommand]] | الـ migrations، مرة واحدة | الـ deploy يقف، والقديم شغال |
| ٣ | [[startCommand]] | تشغيل النسخة الجديدة | |
| ٤ | [[healthCheckPath]] | Render يسأل [[/healthz]] لحد ما يرد 200 | الترافيك يفضل على القديم |

وبعد ٤ بس الترافيك يتنقل للجديد.

### [[PORT]]: جرّبناه

Render بيحط رقم البورت في متغير [[PORT]] (القيمة الافتراضية عندهم [[10000]] حسب الـ docs). الـ solCode بيقراه:

~~~js
app.listen(Number(process.env.PORT ?? 3000), "0.0.0.0");
~~~

[[process.env.PORT]] نص، و [[Number()]] بيحوّله رقم، و [[?? 3000]] لو مش موجود (على جهازك). و [[0.0.0.0]] يعني «اسمع على كل الشبكات»، مش [[localhost]] بس اللي محدش من برا الـ container يوصله. شغّلناه بـ [[PORT=10000]]:

~~~text الناتج
curl -i localhost:10000/healthz  ->  HTTP/1.1 200 OK  /  ok
curl localhost:3000/healthz      ->  000 (مفيش حد بيسمع)
~~~

لو كنت كاتب [[3000]] ثابتة، Render هيفضل يسأل على [[10000]] ومحدش يرد، والـ deploy يفشل بـ timeout. ده أول غلطة في الـ sol.

---

## ٣. [[envVars]]: الربط بالقاعدة

~~~yaml
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: shop-db
          property: connectionString
      - key: JWT_SECRET
        generateValue: true
~~~

| الخانة | معناها |
|---|---|
| [[key]] | اسم متغير البيئة جوه التطبيق |
| [[fromDatabase.name: shop-db]] | من القاعدة اللي اسمها كده في [[databases]] تحت |
| [[property: connectionString]] | هات الـ connection string الداخلي (شبكة Render الخاصة) |
| [[generateValue: true]] | Render يولّد قيمة عشوائية مرة واحدة ويحفظها |

والـ YAML ده لما اتقرا بقى JSON كده:

~~~text
{"key":"DATABASE_URL","fromDatabase":{"name":"shop-db","property":"connectionString"}}
~~~

---

## ٤. خدمة [[worker]]

نفس الخانات تقريبًا، والفرق:

| | [[web]] | [[worker]] |
|---|---|---|
| URL وبورت | أيوه | لأ |
| [[startCommand]] | [[node dist/server.js]] | [[node dist/worker.js]] |
| [[healthCheckPath]] | موجود | مفيش (مفيش HTTP) |
| [[preDeployCommand]] | موجود | مش محتاجه: الـ migrations اتعملت مرة في الـ web |

نفس [[buildCommand]] لأنهم نفس الريبو، وكل خدمة بتبني نسختها.

---

## ٥. [[databases]]

~~~yaml
databases:
  - name: shop-db
    region: frankfurt
    plan: basic-256mb
~~~

[[name]] هو اللي [[fromDatabase]] بيشاور عليه، و [[region]] لازم نفس الخدمات عشان الشبكة الداخلية، و [[basic-256mb]] خطة مدفوعة صغيرة (٢٥٦ ميجا رام) فيها باك أب ومبتتمسحش بعد ٣٠ يوم زي المجانية.

---

## ٦. الـ worker في الـ solCode

~~~js
setInterval(async () => {
  const count = await prisma.order.count();
  console.log(JSON.stringify({ msg: "worker tick", orders: count }));
}, 10_000);
~~~

[[setInterval(fn, 10_000)]] نفّذ الدالة كل ١٠ ثواني ([[10_000]] = 10000، والـ [[_]] بس عشان القراية). و [[prisma.order.count()]] بيعدّ الصفوف في جدول الطلبات. و [[JSON.stringify]] بيطبع اللوج سطر JSON واحد، فأي أداة لوجات تقدر تفلتره.

---

## الخلاصة

| عايز | في [[render.yaml]] |
|---|---|
| API ليه URL | [[type: web]] + [[healthCheckPath]] |
| شغل في الخلفية | [[type: worker]] |
| migrations قبل التبديل | [[preDeployCommand]] |
| عنوان القاعدة من غير نسخ | [[fromDatabase]] + [[connectionString]] |
| سر عشوائي | [[generateValue: true]] |
| سر انت عارفه | [[sync: false]] وتحطه من الداشبورد |

> كله في نفس الـ [[region]]، والتطبيق يسمع على [[process.env.PORT]] و [[0.0.0.0]].`,
          lines: [
            "كل الخدمات اللي مش قواعد بيانات.",
            "خدمة web: ليها URL وبتستقبل HTTP.",
            "اسمها، وبيبقى جزء من الـ URL.",
            "Render هيبني بـ Node من غير Dockerfile.",
            "قريب من مصر وأوروبا (الافتراضي أمريكا).",
            "خطة مدفوعة صغيرة: مبتنامش.",
            "أمر البناء.",
            "الـ migrations قبل ما النسخة الجديدة تاخد ترافيك.",
            "أمر التشغيل.",
            "مسار بيرد 200 لما التطبيق يبقى جاهز.",
            "متغيرات البيئة.",
            "DATABASE_URL.",
            "جاي من القاعدة اللي تحت.",
            "اسمها.",
            "الـ connection string الداخلي.",
            "سر للتوكنات.",
            "Render بيولّده عشوائي مرة واحدة.",
            "خدمة worker: من غير بورت ولا URL.",
            "اسمها.",
            "نفس الـ runtime.",
            "نفس الـ region عشان الشبكة الداخلية.",
            "خطة مدفوعة (الـ worker مش مجاني).",
            "نفس البناء.",
            "بس بيشغّل ملف الـ worker.",
            "متغيراتها.",
            "نفس القاعدة.",
            "من القاعدة.",
            "اسمها.",
            "الـ connection string.",
            "قواعد البيانات المُدارة.",
            "اسم القاعدة اللي الخدمات بتشاور عليه.",
            "نفس الـ region.",
            "أصغر خطة مدفوعة (باك أب ومبتتمسحش)."
          ],
          sol: R`بعد ما الـ Blueprint يخلص هتلاقي ٣ حاجات في المشروع: [[shop-api]] بـ URL على [[onrender.com]]، و [[shop-worker]] من غير URL، و [[shop-db]]. افتح [[https://shop-api-xxxx.onrender.com/healthz]] المفروض يرد 200، ولوجات الـ worker المفروض تطبع سطرها كل ١٠ ثواني ومعاه نتيجة من القاعدة (زي عدد الطلبات).

ولما تعمل push هتلاقي deploy جديد للخدمتين، وفي لوج الـ API سطر [[prisma migrate deploy]] قبل التشغيل. والموقع مش هيقع وانت بتنشر، لأن النسخة القديمة بتفضل شغالة لحد ما [[/healthz]] في الجديدة يرد.

الغلطات الشائعة: الـ deploy يفضل «In progress» وبعدين يفشل بـ timeout، وده غالبًا لأن التطبيق بيسمع على بورت ثابت بدل [[process.env.PORT]]. أو الـ worker يقع بـ [[ECONNREFUSED]]، وده لأنك كاتب DATABASE_URL بإيدك من جهازك بدل [[fromDatabase]]. ولو اخترت [[plan: free]] للـ worker هتلاقي الـ Blueprint بيرفض، لأن الـ workers مش مجانية.`,
          solCode: R`// src/server.ts
import express from "express";
const app = express();
app.get("/healthz", (_req, res) => res.send("ok"));
app.listen(Number(process.env.PORT ?? 3000), "0.0.0.0");

// src/worker.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
setInterval(async () => {
  const count = await prisma.order.count();
  console.log(JSON.stringify({ msg: "worker tick", orders: count }));
}, 10_000);`
        },
        {
          cmd: "railway",
          title: "Railway: خدمات ومتغيرات بتشاور على بعض",
          desc: R`Railway بيشتغل بفكرة مشروع فيه خدمات جنب بعض على canvas: خدمة من ريبو GitHub أو Docker image، وقاعدة Postgres أو Redis بزرار واحد، وكلهم على شبكة خاصة جوه المشروع.

المتغيرات بتشاور على بعض بـ reference variables: [[DATABASE_URL=$__{{Postgres.DATABASE_URL}}]] معناها «خد قيمة DATABASE_URL من خدمة اسمها Postgres»، فلو القاعدة اتغيرت، المتغير يتحدّث لوحده. والـ worker مجرد خدمة تانية من نفس الريبو بـ start command مختلف.

الفلوس بالاستخدام الفعلي (CPU و RAM بالثانية + الديسك + الترافيك الخارج)، مش بسعر ثابت لكل خدمة. وقت كتابة الدرس: فيه trial بكريدت صغير، وخطة Hobby بـ ٥ دولار في الشهر وجواها ٥ دولار استخدام. الأرقام بتتغير، فراجع صفحة الأسعار.`,
          example: R`npm i -g @railway/cli
railway login
railway init --name shop
railway add --database postgres
railway add --service api --variables 'DATABASE_URL=$__{{Postgres.DATABASE_URL}}'
railway add --service worker --variables 'DATABASE_URL=$__{{Postgres.DATABASE_URL}}'
railway up --service api
railway variables --service api
railway logs --service worker
railway run npx prisma migrate dev`,
          try: R`اعمل مشروع على Railway فيه Postgres وخدمتين (api و worker) من نفس الريبو. في إعدادات الـ worker غيّر الـ start command لـ [[node dist/worker.js]]، وفي الـ api حط pre-deploy command بـ [[npx prisma migrate deploy]]. بعدين من إعدادات الـ api اعمل Generate Domain وافتح [[/healthz]]، وشوف في الـ Metrics أد إيه كل خدمة بتاكل RAM.`,
          deep: {
            why: "Railway أسرع طريقة تشغّل بيها كذا خدمة بتكلم بعض (API و worker و Postgres و Redis) من غير YAML كتير. وطريقة الفلوس بالاستخدام بتبقى أرخص لمشروع صغير فاضي معظم الوقت، وأغلى لو خدمة بتاكل RAM على طول.",
            how: R`المشروع فيه environments (زي production و staging)، وكل environment فيه نسخة من كل الخدمات بمتغيراتها. وممكن تفعّل PR environments: نسخة كاملة لكل PR.

الخدمة بتتبني بـ Railpack (البنّاء بتاعهم اللي بيعرف Node و Python وغيرهم لوحده) أو بـ Dockerfile لو موجود في الريبو. وإعداداتها (start command و pre-deploy command و health check) من الداشبورد أو من ملف [[railway.json]] أو [[railway.toml]] في الريبو.

الشبكة الخاصة: كل خدمة ليها اسم داخلي زي [[api.railway.internal]]، والـ worker يقدر يكلّم الـ API عليه من غير ما يطلع على النت. والقاعدة بتدّي متغيرين: [[DATABASE_URL]] (داخلي، ببلاش ترافيك) و [[DATABASE_PUBLIC_URL]] (للوصول من جهازك، وبيتحاسب كترافيك خارج).

الـ CLI: [[railway init]] مشروع جديد، [[railway link]] يربط الفولدر بمشروع موجود، [[railway add]] يضيف قاعدة أو خدمة، [[railway up]] يرفع الفولدر الحالي ويبني (من غير GitHub)، و [[railway run CMD]] بيشغّل أمر على جهازك بمتغيرات الخدمة، مفيد لـ migration أو script سريع.

الخدمة مش بتنام لوحدها. فيه خيار serverless (أو «App Sleeping») بيوقّفها لو مفيش ترافيك، بس مش مناسب لـ worker.`,
            when: "MVP أو مشروع جانبي فيه كذا خدمة، أو فريق صغير عايز staging و PR previews للباك إند من غير شغل. ولو الـ RAM بتاع الخدمات ثابت وعالي على طول، احسبها مقابل VPS.",
            mistakes: R`تكتب connection string القاعدة كنص ثابت بدل reference variable، فلما القاعدة تتغير الخدمة تقع. وتستخدم [[DATABASE_PUBLIC_URL]] من جوه الخدمات فتدفع ترافيك على كل query وتبقى أبطأ. وتفتكر إن الـ ٥ دولار حد أقصى: لو الاستخدام عدّاها بتدفع الزيادة، فحط usage limit من الإعدادات. وتنسى إن [[railway run]] بيشغّل على جهازك بمتغيرات الإنتاج، فـ [[prisma migrate reset]] كده بيمسح قاعدة الإنتاج.`
          },
          teach: R`## الفكرة: مشروع، وجواه قاعدة وخدمتين بيشاوروا عليها

الأوامر بتبني المشروع من الترمنال خطوة خطوة: سجّل دخول، اعمل مشروع، ضيف Postgres، ضيف خدمتين متغيرهم بيشاور على القاعدة، ارفع الكود، وبعدين راجع واقرا اللوجات وشغّل أمر بمتغيرات الإنتاج.

اتجرّب هنا: Railway CLI نسخة 5.64.0 على ويندوز ([[--version]] و [[--help]] لكل أمر)، وتجربة الـ quoting في bash و PowerShell. كل أمر بيكلّم الحساب (من [[login]] لـ [[run]]) من الـ docs: من غير login أي أمر بيرد [[Unauthorized. Please login with $__btrailway login$__bt]].

---

## ١. [[npm i -g @railway/cli]] و [[railway login]]

الباكدج اسمه [[@railway/cli]] والأمر اسمه [[railway]]:

~~~text railway --version
railway 5.64.0
~~~

[[login]] بيفتح المتصفح وبيحفظ token على جهازك. في CI بدل [[login]] بتحط [[RAILWAY_TOKEN]] كـ secret.

---

## ٢. [[railway init --name shop]]

[[init]] مشروع جديد، و [[--name]] (أو [[-n]]) اسمه. وبيربط الفولدر الحالي بيه، فالأوامر الجاية مش محتاجة تقول أنهي مشروع. ولو المشروع موجود من الداشبورد: [[railway link]].

---

## ٣. [[railway add --database postgres]]

من [[railway add --help]]:

~~~text
  -d, --database <DATABASE>
          The name of the database to add
          [possible values: postgres, mysql, redis, mongo]
~~~

بيعمل خدمة قاعدة بيانات مُدارة اسمها [[Postgres]] (بالـ P كابيتال)، وفيها متغيرات جاهزة زي [[DATABASE_URL]] و [[DATABASE_PUBLIC_URL]].

---

## ٤. [[railway add --service api --variables '...']]

~~~bash
railway add --service api --variables 'DATABASE_URL=$__{{Postgres.DATABASE_URL}}'
~~~

| الحتة | معناها |
|---|---|
| [[--service api]] | خدمة جديدة فاضية اسمها [[api]] (الكود هيجي بعدين بـ [[up]] أو من GitHub) |
| [[--variables]] | متغير بالشكل [[KEY=VALUE]]، وينفع تكررها لكذا متغير |
| [[DATABASE_URL=]] | اسم المتغير جوه الخدمة |
| [[$__{{Postgres.DATABASE_URL}}]] | reference variable: «القيمة هي [[DATABASE_URL]] بتاع خدمة اسمها [[Postgres]]» |

### ليه علامات [[' ']] ومش [[" "]]؟

[[$__{...}]] ليها معنى عند الشل نفسه (متغيرات)، فلازم الشل يعدّيها لـ Railway زي ما هي. جرّبنا:

~~~text bash
$ echo 'DATABASE_URL=$__{{Postgres.DATABASE_URL}}'
DATABASE_URL=$__{{Postgres.DATABASE_URL}}

$ echo "DATABASE_URL=$__{{Postgres.DATABASE_URL}}"
bash: DATABASE_URL=$__{{Postgres.DATABASE_URL}}: bad substitution
~~~

~~~text PowerShell 7 (نفس السطرين في ملف .ps1)
DATABASE_URL=$__{{Postgres.DATABASE_URL}}         (بالـ ' ')
ParserError: Use $__bt{ instead of { in variable names.   (بالـ " ")
~~~

العلامة المفردة [[' ']] في bash و PowerShell معناها «نص حرفي، متلمسش أي حاجة جواه». والمزدوجة [[" "]] بتخلي الشل يحاول يفك [[$]]، فيضرب error. وفي الحالتين الغلط ده أحسن من إنه ينجح بقيمة فاضية.

---

## ٥. [[railway add --service worker --variables '...']]

نفس الكلام لخدمة تانية اسمها [[worker]]. الاتنين بيشاوروا على نفس القاعدة، ولو القاعدة اتغيرت (باسورد جديد مثلًا) الاتنين بيتحدّثوا لوحدهم في الـ deploy الجاي.

---

## ٦. [[railway up --service api]]

[[up]] بيرفع الفولدر الحالي (من غير GitHub)، و Railway يبنيه (بـ Railpack، أو بـ Dockerfile لو موجود) وينشره على الخدمة اللي في [[--service]]. وفيه [[-d]] ([[--detach]]): ارفع وارجع على طول من غير ما تفضل تتابع لوج البناء.

---

## ٧. [[railway variables --service api]]

بيعرض متغيرات الخدمة **بعد** فك الـ references، فهتشوف [[DATABASE_URL]] بقيمة حقيقية فيها [[postgres.railway.internal]] (الشبكة الداخلية). لو شفت النص [[$__{{Postgres.DATABASE_URL}}]] زي ما هو، يبقى الـ reference ما اتفكش: اسم الخدمة غلط.

## ٨. [[railway logs --service worker]]

لوجات آخر deploy للخدمة دي. ومن الـ help: [[-d]] لوج الـ deployment (البناء) بدل لوج التشغيل، و [[-n]] عدد السطور.

---

## ٩. [[railway run npx prisma migrate dev]]

من [[railway run --help]]:

~~~text
Run a local command using variables from the active environment
  -s, --service <SERVICE>          Service to pull variables from (defaults to linked service)
  -e, --environment <ENVIRONMENT>  Environment to pull variables from (defaults to linked environment)
~~~

يعني الأمر بيشتغل **على جهازك**، بس بمتغيرات الخدمة والـ environment المربوطين. فـ [[prisma]] هيكلّم قاعدة Railway نفسها. خلي بالك من حاجتين:

- [[DATABASE_URL]] الداخلي ([[.railway.internal]]) مش بيتوصل من جهازك. عشان كده محتاج [[DATABASE_PUBLIC_URL]] للأوامر دي.
- [[migrate dev]] أمر تطوير (ممكن يطلب reset للقاعدة لو فيه اختلاف). على environment الإنتاج الصح [[migrate deploy]]، وأي أمر بيمسح هيمسح الإنتاج.

---

## الـ solCode: [[railway.json]]

| الخانة | معناها |
|---|---|
| [["$schema"]] | رابط وصف الملف، فالـ editor يكمّل لك ويعلّم على الغلط |
| [["startCommand"]] | أمر التشغيل (بدل [[npm start]] الافتراضي) |
| [["preDeployCommand"]] | قايمة أوامر قبل التبديل: الـ migrations |
| [["healthcheckPath"]] | Railway يستنى المسار ده يرد 200 قبل ما ينقل الترافيك |

الملف ده في الريبو، فالإعداد بيتراجع في PR زي الكود، بدل ما يبقى في الداشبورد بس.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[railway init -n NAME]] | مشروع جديد ويربط الفولدر |
| [[railway add -d postgres]] | قاعدة مُدارة |
| [[railway add -s NAME -v 'K=$__{{Svc.VAR}}']] | خدمة بمتغير بيشاور على خدمة تانية |
| [[railway up -s NAME]] | ارفع وابني |
| [[railway variables -s NAME]] | المتغيرات بعد الفك |
| [[railway logs -s NAME]] | اللوجات |
| [[railway run CMD]] | أمر على جهازك بمتغيرات الخدمة |

> الـ reference بين [[' ']] دايمًا، واسم الخدمة جواه حساس للحروف الكبيرة والصغيرة.`,
          lines: [
            "سطّب الـ CLI.",
            "سجّل دخول (بيفتح المتصفح).",
            "مشروع جديد اسمه shop، والفولدر اتربط بيه.",
            "ضيف Postgres مُدار (اسم الخدمة Postgres).",
            "خدمة api، و DATABASE_URL بتشاور على القاعدة (علامات ' عشان الشل ميفسّرش $).",
            "خدمة worker بنفس المتغير.",
            "ارفع الكود وابنيه على خدمة api.",
            "اعرض متغيرات الـ api بقيمها النهائية.",
            "لوجات الـ worker.",
            "شغّل أمر على جهازك بمتغيرات الخدمة المربوطة."
          ],
          sol: R`في الـ canvas هتشوف ٣ مربعات: Postgres و api و worker، وخطوط بين القاعدة والخدمتين (بسبب الـ reference variables). [[railway variables --service api]] المفروض يطلّع [[DATABASE_URL]] بقيمة فيها [[postgres.railway.internal]]، يعني الشبكة الداخلية.

بعد Generate Domain، [[/healthz]] يرد 200. وفي لوجات الـ api تلاقي خطوة pre-deploy فيها [[prisma migrate deploy]] وبعدها [[All migrations have been successfully applied]] أو [[No pending migrations to apply]]. والـ Metrics المفروض توريك استهلاك صغير (عشرات الميجات RAM للـ worker)، وده اللي بتدفعه فعلًا.

الغلطات الشائعة: الـ worker بيشتغل كـ API تاني ويطبع [[listening on 3000]]، لأنك مغيّرتش الـ start command فخد [[npm start]]. أو قيمة المتغير طالعة [[$__{{Postgres.DATABASE_URL}}]] كنص حرفي، لأن اسم خدمة القاعدة مش [[Postgres]] بالظبط (الاسم حساس لحالة الحروف).`,
          solCode: R`// railway.json في جذر الريبو (إعدادات الـ api)
{
  "$schema": "https://railway.com/railway.schema.json",
  "deploy": {
    "startCommand": "node dist/server.js",
    "preDeployCommand": ["npx prisma migrate deploy"],
    "healthcheckPath": "/healthz"
  }
}`
        },
        {
          cmd: "fly launch",
          title: "Fly.io: containers قريبة من اليوزر، و volumes، و regions",
          desc: R`Fly.io بياخد الـ Docker image بتاعتك ويشغّلها كـ Machines (VMs صغيرة بتقوم في ثواني) في أي region تختارها. [[fly launch]] بيقرا المشروع، ويعمل [[fly.toml]] و Dockerfile لو مش موجود، ويعمل الـ app.

الـ Machine ديسكها بيتمسح مع كل deploy. لو محتاج داتا تعيش (SQLite مثلًا) بتعمل volume: ديسك مربوط بـ Machine واحدة في region واحدة. وبتقدر تفصل الـ web عن الـ worker بـ [[processes]] في نفس الـ app.

مفيش free tier للحسابات الجديدة وقت كتابة الدرس: بتدفع بالثانية على الـ Machines الشغالة، وبالجيجا على الـ volumes حتى لو الـ Machine واقفة. الـ Machine الصغيرة جدًا بدولارات قليلة في الشهر، بس راجع صفحة الأسعار.`,
          example: R`# fly.toml (fly launch بيعمله، وده بعد التعديل)
app = "shop-api"
primary_region = "fra"

[build]

[deploy]
  release_command = "npx prisma migrate deploy"

[processes]
  app = "node dist/server.js"
  worker = "node dist/worker.js"

[http_service]
  internal_port = 8080
  force_https = true
  auto_stop_machines = "stop"
  auto_start_machines = true
  min_machines_running = 1
  processes = ["app"]

[[vm]]
  size = "shared-cpu-1x"
  memory = "512mb"`,
          try: R`اعمل [[fly launch]] على مشروع Express، واقبل الـ Dockerfile اللي بيعمله، وخلّي [[primary_region]] أقرب region ليك. ضيف [[processes]] زي المثال، وشغّل [[fly secrets set DATABASE_URL=...]] وبعدين [[fly deploy]]. بعدين: [[fly status]] (كام Machine لكل process)، و [[fly scale count app=2]]، و [[fly logs]]. وجرّب تسيب الموقع ربع ساعة من غير طلبات وشوف [[fly status]].`,
          flag: "script",
          deep: {
            why: "لو المستخدمين في أكتر من قارة، أو محتاج WebSockets أو process شغال على طول، Fly بيشغّل container حقيقي قريب منهم، مش function ليها حد أقصى للوقت. والـ Machines اللي بتقف لما مفيش ترافيك بتخلي مشروع صغير يتكلف قليل.",
            how: R`[[fly launch]] بيسألك عن الاسم والـ region، ويقترح Postgres أو Redis، ويكتب [[fly.toml]]. وبعدها [[fly deploy]] بيبني الـ image (على builder عندهم أو جهازك) ويعمل rolling update.

[[release_command]] بيشتغل مرة واحدة في Machine مؤقتة قبل تحديث الباقي، ولو فشل الـ deploy بيقف. ده مكان الـ migrations.

[[processes]]: كل سطر بيعمل مجموعة Machines بأمر مختلف من نفس الـ image. و [[http_service.processes = ["app"]]] معناها بس مجموعة app بتستقبل HTTP. وتكبّر كل مجموعة لوحدها: [[fly scale count worker=2]].

[[auto_stop_machines = "stop"]]: الـ proxy بتاع Fly بيوقّف الـ Machines لما مفيش طلبات، ويقوّمها مع أول طلب (حوالي ثانية أو أقل). و [[min_machines_running = 1]] بيسيب واحدة صاحية في الـ primary region. ده بيأثر على الـ web بس، والـ worker مبيستقبلش HTTP فمش بيتوقف بالطريقة دي.

الـ volumes: [[fly volumes create data --size 1 --region fra]] وبعدين في [[fly.toml]] قسم [[[mounts]]] فيه [[source = "data"]] و [[destination = "/data"]]. الـ volume في region واحدة ومربوط بـ Machine واحدة، ومفيش مشاركة بين Machines ولا replication تلقائي. عشان كده Machine بـ volume = حاجة واحدة لو وقعت وقعت، و Fly بيعمل snapshots يومية (والتخزين بتاعها بقى بيتحاسب). لو محتاج قاعدة بجد استخدم Postgres مُدار (من Fly أو Neon أو Supabase) بدل ما تدير Postgres على volume بنفسك.

الـ regions: [[fly platform regions]] بيعرضهم. [[fly scale count 2 --region fra,ams]] بيوزّع Machines. الطلب بيروح لأقرب Machine شغالة (Anycast)، بس لو القاعدة في fra والـ Machine في سنغافورة، كل query هتعدّي نص الكرة الأرضية. فابدأ region واحدة جنب القاعدة.`,
            when: "API أو WebSockets أو app محتاج process طويل وقريب من اليوزر، وانت مرتاح مع Docker. ولو كل اللي عندك API بسيط وقاعدة، Render أو Railway أبسط.",
            mistakes: R`تعمل volume وتفتكر إنه باك أب أو إنه بيتشارك بين Machines. وتعمل [[fly scale count 3]] لـ app عليه volume فيتعمل ٣ volumes فاضية مختلفة، وكل Machine بداتا مختلفة. و [[min_machines_running = 0]] لـ API محتاج يرد بسرعة. وتنسى إن الـ volumes والـ IPv4 المخصص بيتحاسبوا حتى لو الـ Machines واقفة. والتطبيق يسمع على بورت غير [[internal_port]] فالـ health check يفشل.`
          },
          teach: R`## الفكرة: [[fly.toml]] بيوصف الـ app، والـ CLI بينفّذ

المثال ملف [[fly.toml]] بعد ما [[fly launch]] عمله وعدّلناه: اسم الـ app ومكانه، والـ migrations، ونوعين من الـ Machines (web و worker) من نفس الـ image، وإعدادات HTTP، ومقاس الـ Machine.

اتجرّب هنا: flyctl نسخة v0.4.114 (Linux) جوه [[ubuntu:24.04]]، و [[--help]] بتاع [[launch]]. أي أمر بيكلّم Fly (حتى [[fly config validate]] و [[fly platform regions]]) بيرد [[Error: no access token available. Please login with 'flyctl auth login']]، فدول من الـ docs. والملف نفسه قريناه بمكتبة TOML في Node عشان نشوف هيتفهم إزاي.

---

## ١. شكل TOML في سطرين

| الشكل | معناه |
|---|---|
| [[key = "value"]] | خانة وقيمتها |
| [[[section]]] (قوس واحد) | قسم: كل الخانات اللي تحته لحد القسم الجاي تبعه |
| قوسين مزدوجين (زي اللي قبل [[vm]] في آخر الملف) | عنصر في **قايمة** أقسام. لو كررته يبقى عنصرين |

قرينا الملف بـ [[smol-toml]] وطبعناه JSON:

~~~text الناتج (مختصر)
{ "app": "shop-api", "primary_region": "fra", "build": {},
  "deploy": { "release_command": "npx prisma migrate deploy" },
  "processes": { "app": "node dist/server.js", "worker": "node dist/worker.js" },
  "http_service": { "internal_port": 8080, "force_https": true, "auto_stop_machines": "stop",
                    "auto_start_machines": true, "min_machines_running": 1, "processes": [ "app" ] },
  "vm": [ { "size": "shared-cpu-1x", "memory": "512mb" } ] }
~~~

لاحظ إن [[vm]] طلع **قايمة** فيها عنصر واحد، و [[build]] طلع [[{}]] فاضي.

---

## ٢. أول سطرين و [[build]]

~~~toml
app = "shop-api"
primary_region = "fra"

[build]
~~~

| السطر | معناه |
|---|---|
| [[app]] | اسم الـ app، فريد على Fly كله، والدومين [[shop-api.fly.dev]] |
| [[primary_region = "fra"]] | فرانكفورت. أكواد الـ regions ٣ حروف (غالبًا كود مطار): [[ams]] أمستردام، [[iad]] فيرجينيا |
| [[[build]]] فاضي | مفيش إعدادات بناء خاصة، فـ Fly يستخدم الـ [[Dockerfile]] اللي في الريبو |

---

## ٣. [[[deploy]]] و [[release_command]]

~~~toml
[deploy]
  release_command = "npx prisma migrate deploy"
~~~

Fly بيقوّم Machine مؤقتة من الـ image الجديدة، يشغّل فيها الأمر ده، ويمسحها. لو الأمر فشل، الـ deploy بيقف والـ Machines القديمة فاضلة زي ما هي. ده نفس دور [[preDeployCommand]] في Render.

---

## ٤. [[[processes]]]: نوعين Machines من image واحدة

~~~toml
[processes]
  app = "node dist/server.js"
  worker = "node dist/worker.js"
~~~

كل سطر = «مجموعة» (process group) باسم وأمر تشغيل. [[fly deploy]] بيعمل Machines للاتنين من نفس الـ image، وكل مجموعة بتتكبّر لوحدها: [[fly scale count app=2]] أو [[fly scale count worker=3]].

---

## ٥. [[[http_service]]]: مين بيستقبل من النت

~~~toml
[http_service]
  internal_port = 8080
  force_https = true
  auto_stop_machines = "stop"
  auto_start_machines = true
  min_machines_running = 1
  processes = ["app"]
~~~

| الخانة | معناها |
|---|---|
| [[internal_port = 8080]] | البورت اللي التطبيق بيسمع عليه **جوه** الـ container. الـ proxy بتاع Fly بيستقبل على 80 و 443 ويبعت هنا |
| [[force_https = true]] | أي طلب HTTP يتحوّل لـ HTTPS |
| [[auto_stop_machines = "stop"]] | لو مفيش طلبات فترة، الـ proxy يوقّف الـ Machine (مبتتحاسبش على CPU والرام وهي واقفة) |
| [[auto_start_machines = true]] | أول طلب يجي، الـ proxy يقوّمها |
| [[min_machines_running = 1]] | سيب واحدة صاحية دايمًا في الـ primary region، فمحدش يستنى قومة |
| [[processes = ["app"]]] | القواعد دي لمجموعة [[app]] بس. الـ worker ملوش HTTP |

[[["app"]]] قايمة TOML فيها عنصر واحد. ولو نسيت السطر ده، القواعد بتتطبق على كل المجموعات، فالـ worker هيتعامل كـ web وهيتوقف لما مفيش طلبات، أو يفشل في الـ health check لأنه مش بيسمع على 8080.

---

## ٦. مقاس الـ Machine

~~~toml
[[vm]]
  size = "shared-cpu-1x"
  memory = "512mb"
~~~

| الخانة | معناها |
|---|---|
| [[shared-cpu-1x]] | CPU واحد مشترك مع Machines تانية على نفس السيرفر: أرخص حاجة، ويكفي API خفيف |
| [[memory = "512mb"]] | نص جيجا. لو التطبيق عدّاها هيتقتل (OOM) ويقوم تاني |

القوسين المزدوجين هنا لأن [[vm]] قايمة: تقدر تدي كل process group مقاس مختلف بعنصر تاني فيه [[processes = ["worker"]]].

---

## ٧. أوامر الـ solCode

| الأمر | بيعمل إيه |
|---|---|
| [[fly launch --no-deploy]] | اعمل الـ app و [[fly.toml]] (ودوكرفايل لو مش موجود) من غير ما تنشر، عشان تعدّل الأول. الـ flag موجودة في [[fly launch --help]] |
| [[fly secrets set DATABASE_URL="..."]] | سر متشفّر عند Fly، بيوصل للـ Machines كمتغير بيئة. بيعمل restart للـ Machines عشان ياخدوه |
| [[fly deploy]] | ابني الـ image، شغّل [[release_command]]، وحدّث الـ Machines واحدة واحدة |
| [[fly status]] | الـ Machines: المجموعة والـ region والحالة ([[started]] أو [[stopped]]) |
| [[fly scale count app=2]] | خلّي مجموعة app اتنين |
| [[fly logs]] | لوجات لايف من كل الـ Machines |

والـ [[DATABASE_URL]] في [[fly secrets]] مش في [[fly.toml]]: الملف ده على Git، والأسرار لأ.

---

## الخلاصة

| عايز | في [[fly.toml]] |
|---|---|
| مكان الـ app | [[primary_region]] |
| migrations قبل التحديث | [[[deploy]]] [[release_command]] |
| web و worker من image واحدة | [[[processes]]] |
| HTTP للـ web بس | [[processes = ["app"]]] جوه [[[http_service]]] |
| توفير وقت الفراغ | [[auto_stop_machines]] + [[min_machines_running]] |
| المقاس | قسم [[vm]] |

> [[internal_port]] لازم يساوي البورت اللي التطبيق بيسمع عليه فعلًا. ده أشهر سبب لفشل أول deploy.`,
          lines: [
            "اسم الـ app (والدومين هيبقى shop-api.fly.dev).",
            "الـ region الأساسية: فرانكفورت.",
            "البناء: فاضي يعني استخدم الـ Dockerfile اللي في الريبو.",
            "إعدادات الـ deploy.",
            "Machine مؤقتة بتشغّل الـ migrations قبل التحديث.",
            "مجموعات processes من نفس الـ image.",
            "مجموعة app: السيرفر.",
            "مجموعة worker: شغل الخلفية.",
            "الـ HTTP من برا.",
            "البورت اللي التطبيق بيسمع عليه جوه الـ container.",
            "حوّل HTTP لـ HTTPS.",
            "وقّف الـ Machines لما مفيش ترافيك.",
            "قوّمها مع أول طلب.",
            "سيب واحدة صاحية دايمًا.",
            "بس مجموعة app بتاخد HTTP.",
            "مقاس الـ Machine.",
            "CPU مشترك واحد.",
            "نص جيجا رام."
          ],
          sol: R`بعد [[fly deploy]] المفروض [[fly status]] يوريك Machines في مجموعتين: [[app]] و [[worker]]، كلهم في [[fra]]. و [[https://shop-api.fly.dev/healthz]] يرد 200. وفي [[fly logs]] هتلاقي سطر الـ release_command ([[prisma migrate deploy]]) قبل ما الـ Machines تتحدّث.

بعد [[fly scale count app=2]] هتلاقي ٢ app و ١ worker. ولو سبت الموقع من غير طلبات ربع ساعة، [[fly status]] هيوريك Machine من الاتنين حالتها [[stopped]] والتانية [[started]] (بسبب [[min_machines_running = 1]])، والـ worker لسه [[started]].

الغلطات الشائعة: الـ deploy يطلع [[instance refused connection]] أو ما يعدّيش الـ health check، لأن التطبيق بيسمع على ٣٠٠٠ والـ [[internal_port]] ٨٠٨٠: خلي التطبيق يقرا [[PORT]] أو غيّر الرقم. أو الـ worker مش ظاهر خالص، لأنك نسيت [[processes = ["app"]]] في [[http_service]] فالاتنين بقوا web.`,
          solCode: R`fly launch --no-deploy
fly secrets set DATABASE_URL="postgresql://app:YOUR_PASSWORD@db.example.com:5432/shop?sslmode=require"
fly deploy
fly status
fly scale count app=2
fly logs`
        },
        {
          cmd: "Coolify / Dokploy",
          title: "PaaS على الـ VPS بتاعك: تجربة Render بسعر سيرفر",
          desc: R`Coolify و Dokploy برامج open source بتسطّبها على VPS بتاعك، فيبقى عندك داشبورد زي Render: تربط ريبو GitHub، وكل push يعمل build و deploy، و SSL تلقائي بـ Let's Encrypt، وقواعد بيانات بزرار، وباك أب للقاعدة على S3 أو R2.

من جوه بيستخدموا Docker (والـ Dockerfile أو Nixpacks أو Docker Compose بتاعك)، و Traefik كـ reverse proxy بياخد الدومين ويعمل الشهادة. يعني نفس اللي بتعمله بإيدك في تاب VPS وتاب Docker وتاب Nginx، بس بداشبورد.

البرنامج نفسه ببلاش، وبتدفع تمن السيرفر بس. وكل واحد ليه نسخة cloud مدفوعة لو مش عايز تدير لوحة التحكم نفسها. الحد الأدنى المكتوب في الدوكس حوالي ٢ جيجا رام و ٣٠ جيجا ديسك، والـ build نفسه بياكل رام، فسيرفر ٤ جيجا أريح.`,
          example: R`ssh root@203.0.113.10
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | sudo bash
curl -sSL https://dokploy.com/install.sh | sh
docker ps --format "table {{.Names}}\t{{.Status}}"
sudo ufw allow 22,80,443/tcp
dig +short api.example.com`,
          try: R`على VPS جديد فاضي (Ubuntu LTS، ٤ جيجا لو تقدر)، سطّب واحد بس من الاتنين. افتح اللوحة (Coolify على بورت 8000، و Dokploy على 3000)، واعمل حساب الأدمن فورًا. اربط GitHub، واعمل Postgres، وانشر API من ريبو فيه Dockerfile على [[api.example.com]] (سجل A بيشاور على السيرفر). وبعدين فعّل الباك أب المجدول للقاعدة على bucket في R2 أو S3.`,
          flag: "danger",
          deep: {
            why: "الـ PaaS المدفوعة بتبقى غالية لما الخدمات تكتر: ٥ خدمات صغيرة = ٥ instances. على VPS بـ ١٥ دولار تقدر تشغّل الـ ٥ ومعاهم Postgres و Redis. Coolify و Dokploy بيدّوك راحة push-to-deploy و SSL والباك أب من غير ما تكتب Nginx config ولا systemd unit، وده طريق شائع جدًا للفريلانسرز والشركات الصغيرة.",
            how: R`سكربت التسطيب بيسطّب Docker ويشغّل اللوحة نفسها كـ containers. بعد كده، أي app بتضيفه بيتبني image ويشتغل container، و Traefik بيقرا الـ labels بتاعته ويوجّه الدومين ليه ويطلب شهادة.

Coolify: أقدم وأكبر، فيه كتالوج خدمات جاهزة كبير (Plausible و n8n و MinIO وغيرهم بزرار)، ويقدر يدير كذا سيرفر من لوحة واحدة عن طريق SSH. Dokploy: أخف وأحدث، ومبني على Docker Swarm فبيقدر يوزّع على كذا سيرفر، وتجربته قريبة من Vercel. الاتنين بيقروا Docker Compose بتاعك كما هو.

الـ build على نفس السيرفر اللي بيخدم اليوزرز. build لـ Next.js ممكن ياخد ١.٥ جيجا رام، فعلى سيرفر ٢ جيجا الموقع يبطأ أو الـ OOM killer يقتل حاجة. الحل: سيرفر أكبر، أو swap، أو تبني الـ image في GitHub Actions وتخلي اللوحة تسحبها من registry (تاب GitHub Actions).

اللي لسه عليك انت: تحديث نظام التشغيل (unattended-upgrades في تاب VPS)، والفايروول، وتحديث اللوحة نفسها، ومراقبة الديسك (الـ images القديمة بتتراكم)، وباك أب برا السيرفر. لو السيرفر الواحد وقع، كل حاجة وقعت.

تحذير أمان: اللوحة فيها صلاحية root على السيرفر عمليًا. اعمل حساب الأدمن أول ما تفتحها (أول واحد يفتح الصفحة بيبقى الأدمن)، وحط لوحة التحكم على دومين بـ HTTPS، ولو تقدر اقفل بورت اللوحة إلا من IP بتاعك أو وراه Cloudflare Access.`,
            when: "عندك كذا مشروع صغير أو عملاء، وعايز push-to-deploy بسعر VPS، وعندك حد يعرف أساسيات Linux لو حاجة باظت. مش أول اختيار لو محدش في الفريق عمره فتح ترمنال.",
            mistakes: R`تسطّب وتسيب صفحة التسجيل مفتوحة على [[http://IP:8000]] فحد تاني يسجّل أدمن قبلك. والقاعدة على نفس السيرفر والباك أب على نفس الديسك. وسيرفر ١ جيجا وكل build يوقّع الموقع. وتنسى إن Docker بيفتح البورتات بعيد عن ufw (تاب Docker)، فقاعدة عملتلها public port تبقى مفتوحة للنت. وتفتكر إن «زي Render» معناها «مُدار»: التحديثات والأمان لسه عليك.`
          },
          teach: R`## الفكرة: ٦ أوامر على VPS جديد، وواحد منهم بيسطّب كل حاجة

ادخل السيرفر، شغّل سكربت تسطيب **واحد** (Coolify أو Dokploy)، اتأكد إن الـ containers قامت، افتح البورتات اللي محتاجها، واتأكد إن الدومين بيشاور على السيرفر.

السكربتين دول بيسطّبوا Docker ويغيّروا السيرفر كله، فمشغّلناهمش هنا (ولا في container). اللي عملناه: نزّلنا السكربتين وقرينا جواهم بـ [[grep]] (أكتوبر ٢٠٢٦) عشان نعرف بيعملوا إيه بالظبط، وجرّبنا [[docker ps --format]] و [[dig]] بجد. و [[ufw]] من الـ docs.

---

## ١. [[ssh root@203.0.113.10]]

[[ssh]] بيفتح ترمنال على السيرفر. [[root]] اليوزر، و [[203.0.113.10]] الـ IP (رينج محجوز للأمثلة، حط IP سيرفرك). السكربتين محتاجين root، والاتنين بيتأكدوا من ده في أولهم:

~~~text من سكربت Coolify
if [ $EUID != 0 ]; then
    echo "Please run this script as root or with sudo"
~~~

~~~text من سكربت Dokploy
    if [ "$(id -u)" != "0" ]; then
        echo "This script must be run as root" >&2
~~~

[[$EUID]] و [[id -u]] رقم اليوزر، و [[0]] دايمًا root.

---

## ٢. [[curl -fsSL https://cdn.coollabs.io/coolify/install.sh | sudo bash]]

### الحتت

| الحتة | معناها |
|---|---|
| [[-f]] | fail: لو السيرفر رد بخطأ (404 مثلًا) متطبعش صفحة الخطأ. من غيرها bash ممكن ينفّذ صفحة HTML |
| [[-s]] | silent |
| [[-S]] | بس اطبع الخطأ لو حصل (مع [[-s]]) |
| [[-L]] | لو فيه redirect، روح وراه |
| [[| sudo bash]] | ابعت السكربت لـ bash ينفّذه كـ root |

### السكربت ده فيه إيه؟

١٢٣٥ سطر. أهم حاجات لقيناها:

~~~text grep على install.sh بتاع Coolify
567:        apt-get install -y curl wget git jq openssl >/dev/null
635:        apt-get install -y openssh-server >/dev/null
686:    curl -fsSL https://get.docker.com | sh 2>&1 || true
1215:    printf '  Public IPv4   %shttp://%s:8000%s\n' ...
~~~

يعني: بيسطّب أدوات، و SSH server (Coolify بيدير السيرفرات عن طريق SSH حتى السيرفر نفسه)، و Docker من سكربت Docker الرسمي، وفي الآخر بيطبع رابط اللوحة على بورت [[8000]]. والـ compose بتاعه ([[docker-compose.yml]] على نفس الـ CDN) فيه ٣ containers:

~~~text container_name في docker-compose.yml
coolify
coolify-db       (postgres:15-alpine)
coolify-redis    (redis:7-alpine)
~~~

و [[coolify-proxy]] (Traefik) بيتعمل بعدين من جوه اللوحة.

> «نزّل سكربت من النت ونفّذه root» معناه إنك بتثق في المصدر ثقة كاملة. العادة الكويسة: نزّله الأول بـ [[curl -fsSL URL -o install.sh]]، بص عليه، وبعدين شغّله.

---

## ٣. [[curl -sSL https://dokploy.com/install.sh | sh]]

نفس الفكرة لـ Dokploy (٤٠٨ سطر). من جواه:

~~~text grep على install.sh بتاع Dokploy
129:    if ss -tulnp | grep ':3000 ' >/dev/null; then
131:        echo "Dokploy requires port 3000 to be available. ..."
142:      curl -sSL https://get.docker.com | sh -s -- --version $DOCKER_VERSION
247:        docker swarm init --advertise-addr $advertise_addr
281:    --name dokploy-postgres \
311:      --name dokploy \
332:        --name dokploy-traefik \
~~~

| السطر | بيعمل إيه |
|---|---|
| ١٢٩ | بيتأكد إن بورت [[3000]] فاضي ([[ss -tulnp]] بيعرض البورتات اللي فيها حد بيسمع)، لأن اللوحة عليه |
| ١٤٢ | Docker بنسخة محددة |
| ٢٤٧ | [[docker swarm init]]: بيحوّل Docker لوضع Swarm (عشان يقدر يوزّع على كذا سيرفر بعدين) |
| ٢٨١ و ٣١١ | [[dokploy-postgres]] و [[dokploy]] كـ Swarm services |
| ٣٣٢ | Traefik كـ container عادي |

العمود ده هو الفرق الحقيقي بينهم: Coolify = Docker Compose عادي، و Dokploy = Docker Swarm.

> واحد بس! الاتنين عايزين بورت 80 و 443 لـ Traefik بتاعهم، فلو سطّبت الاتنين على نفس السيرفر هيتخانقوا.

---

## ٤. [[docker ps --format "table {{.Names}}\t{{.Status}}"]]

[[docker ps]] بيعرض الـ containers الشغالة، و [[--format]] بيختار الأعمدة:

| الحتة | معناها |
|---|---|
| [[table]] | اطبع جدول بعناوين |
| [[{{.Names}}]] | اسم الـ container (الأقواس المزدوجة دي صيغة Go templates) |
| [[\t]] | Tab بين العمودين |
| [[{{.Status}}]] | الحالة: [[Up 26 minutes]] أو [[Restarting]] أو [[Exited]] |

جرّبناه على containers التجربة بتاعتنا (وزوّدنا [[--filter name=teach-cloud02]] عشان يعرض بتوعنا بس):

~~~text الناتج
NAMES               STATUS
teach-cloud02-ls    Up 26 minutes (healthy)
teach-cloud02-net   Up 27 minutes
~~~

[[(healthy)]] معناها إن الـ container ليه health check وبيعدّيه. على سيرفر Coolify هتشوف [[coolify]] و [[coolify-db]] و [[coolify-redis]] بـ [[Up]]. ولو حاجة [[Restarting]]، اقرا لوجها: [[docker logs coolify]].

---

## ٥. [[sudo ufw allow 22,80,443/tcp]]

[[ufw]] (Uncomplicated Firewall) واجهة سهلة لفايروول لينكس. [[allow 22,80,443/tcp]] افتح SSH و HTTP و HTTPS. ولوحة التحكم ([[8000]] أو [[3000]]) مش في القايمة عمدًا: بعد ما تحطها على دومين بـ HTTPS مش محتاج البورت ده مفتوح للعالم.

> Docker بيكتب قواعد الفايروول بتاعته بنفسه، فأي container بـ [[-p 3000:3000]] أو [[ports:]] بيبقى مفتوح للنت حتى لو [[ufw]] مش سامح بيه. تفاصيل في تاب Docker.

---

## ٦. [[dig +short api.example.com]]

لازم يرجّع IP السيرفر **قبل** ما تطلب شهادة، لأن Let's Encrypt بيتأكد إن الدومين بيشاور عليك. جرّبناه على [[api.example.com]] الحقيقي:

~~~text الناتج
(ولا سطر)
~~~

[[+short]] لما مفيش إجابة بيطبع ولا حاجة. ومن غير [[+short]] تشوف السبب:

~~~text dig api.example.com
;; ->>HEADER<<- opcode: QUERY, status: NXDOMAIN, id: 12697
~~~

[[NXDOMAIN]] = «الاسم ده مش موجود». لو ده اللي طلعلك على دومينك، يبقى لسه معملتش سجل A، والشهادة هتفشل ([[TRAEFIK DEFAULT CERT]] في المتصفح).

---

## الخلاصة

| الخطوة | الأمر | السليم |
|---|---|---|
| ادخل | [[ssh root@IP]] | |
| سطّب (واحد بس) | سكربت Coolify أو Dokploy | لوحة على 8000 أو 3000 |
| اتأكد | [[docker ps --format ...]] | كله [[Up]] |
| فايروول | [[ufw allow 22,80,443/tcp]] | (وافتكر إن Docker بيعدّيه) |
| الدومين | [[dig +short api.example.com]] | IP السيرفر، مش فاضي |

> أول حاجة بعد ما تفتح اللوحة: اعمل حساب الأدمن.`,
          lines: [
            "ادخل السيرفر الجديد.",
            "سكربت تسطيب Coolify الرسمي (Docker + اللوحة على بورت 8000).",
            "أو سكربت Dokploy الرسمي (اللوحة على بورت 3000). اختار واحد بس.",
            "اتأكد إن containers اللوحة شغالة.",
            "SSH والويب بس (وافتكر إن Docker بيعدّي ufw في البورتات اللي بيفتحها).",
            "اتأكد إن الدومين بيشاور على السيرفر قبل ما تطلب شهادة."
          ],
          sol: R`بعد التسطيب، [[docker ps]] المفروض يوريك containers اللوحة: في Coolify أسماء زي [[coolify]] و [[coolify-db]] و [[coolify-redis]] و [[coolify-proxy]] (ده Traefik)، وفي Dokploy [[dokploy-traefik]] كـ container عادي، و [[dokploy]] و [[dokploy-postgres]] كـ Docker Swarm services، فأساميهم في [[docker ps]] بتيجي بزيادة زي [[dokploy.1.abc123...]] (سكربت التسطيب الحالي مبقاش فيه Redis).

بعد ما تنشر الـ API، [[curl -I https://api.example.com/healthz]] يرجّع [[HTTP/2 200]]، والشهادة من Let's Encrypt ([[openssl s_client]] زي درس [[Cloudflare proxy و SSL]]). وبعد أول باك أب مجدول هتلاقي ملف dump في الـ bucket.

الغلطات الشائعة: الشهادة مش بتطلع والمتصفح بيقول [[TRAEFIK DEFAULT CERT]]، وده لأن الـ DNS لسه مش بيشاور على السيرفر، أو السجل برتقاني في Cloudflare والـ SSL mode مش Full (strict). أو الـ build بيقف في النص ولوج السيرفر فيه [[Out of memory: Killed process]]، والحل رام أكبر أو swap أو build برا السيرفر.`
        },
        {
          cmd: "PaaS ولا VPS: الحساب",
          title: "الفاتورة كبرت: تفضل على PaaS ولا تنقل؟",
          desc: R`المقارنة الصح مش «٨٠ دولار مقابل ٢٠»، هي فلوس + وقت: الـ PaaS بتاخد فلوس أكتر ووقت أقل، والـ VPS فلوس أقل ووقت أكتر (تحديثات، وباك أب، ومشاكل الساعة ٢ بالليل). والوقت ده ليه سعر حتى لو انت اللي بتعمله.

السكربت ده بيحسب التكلفة الكاملة بسعر ساعتك. الأرقام تقريبية للتوضيح بس: عدّلها بأسعار المنصات النهارده وبالوقت اللي بتصرفه فعلًا.`,
          example: R`const HOURLY = Number(process.argv[2] ?? 15);
const setups = {
  "PaaS (Render/Railway)": { bill: { api: 25, worker: 25, postgres: 20, redis: 10 }, opsHours: 0.5 },
  "VPS + Coolify": { bill: { vps: 16, backups: 3, offsite: 1 }, opsHours: 3 },
  "VPS بإيدك": { bill: { vps: 16, backups: 3, offsite: 1 }, opsHours: 5 },
};
const sum = (o) => Object.values(o).reduce((a, b) => a + b, 0);
for (const [name, s] of Object.entries(setups)) {
  const cash = sum(s.bill);
  const time = s.opsHours * HOURLY;
  console.log(name.padEnd(22), "فلوس", cash, "+ وقت", time, "=", cash + time, "دولار");
}`,
          try: R`احفظه [[cost.mjs]] وشغّله بـ [[node cost.mjs 5]] و [[node cost.mjs 15]] و [[node cost.mjs 40]]. وبعدين حط أرقامك الحقيقية: فاتورة المنصة من آخر شهر، وسعر VPS يكفي نفس الخدمات، وكام ساعة في الشهر فعلًا بتصرفها على السيرفر. عند أنهي سعر ساعة الاختيار بيقلب؟`,
          flag: "script",
          deep: {
            why: "أغلب قرارات النقل بتتاخد غلط في الاتجاهين: حد ينقل من PaaS لـ VPS عشان يوفر ٥٠ دولار ويصرف ١٠ ساعات في الشهر على الصيانة، أو شركة تفضل تدفع آلاف على منصة وكان ممكن سيرفرين يكفوا. الحساب البسيط ده بيخلّي القرار أرقام مش إحساس.",
            how: R`ليه الـ PaaS بتغلى مع الكبر: كل خدمة instance بسعر، وكل قاعدة بسعر، والترافيك الخارج بيتحاسب. ٥ خدمات صغيرة على PaaS ممكن تكلف أضعاف سيرفر واحد يشيلهم. وعلى الناحية التانية، أول ٢-٣ خدمات على PaaS غالبًا أرخص من وقتك.

إمتى الحساب بيقلب لـ VPS (أو VPS + Coolify): فاتورة المنصة بقت أكبر من سيرفرين كويسين + ساعتين شغل، والترافيك ثابت ومتوقع، وفيه حد في الفريق مرتاح مع Linux. وإمتى تفضل على PaaS: الفريق صغير ووقته أغلى من الفرق، أو محتاج previews و autoscaling و Postgres بـ PITR من غير ما تبنيهم.

وفيه حل وسط كتير بيعمله الناس: الـ API والـ workers على VPS بـ Coolify، والقاعدة تفضل مُدارة (Neon أو Supabase أو RDS)، لأن القاعدة هي أصعب حاجة تديرها صح (باك أب واسترجاع مجرّب).

إزاي تبقى جاهز للنقل من أول يوم: Dockerfile لكل خدمة (فتشتغل في أي حتة)، وكل الإعدادات متغيرات بيئة (مفيش حاجة في داشبورد بس)، والملفات في S3 أو R2 مش على ديسك، والـ migrations في الكود، والدومين عندك في Cloudflare مش عند المنصة.

خطوات النقل نفسها: شغّل كل حاجة على الجديد جنب القديم، واعمل [[pg_dump]] من القاعدة القديمة و [[pg_restore]] على الجديدة وجرّب عليها، ونزّل الـ TTL قبلها بيوم (درس [[Route 53]])، وبعدين في وقت هادي: وقّف الكتابة (maintenance mode)، و dump أخير، و restore، وغيّر الـ DNS، وسيب القديم شغال أسبوع لو احتجت ترجع. تفاصيل الـ dump والـ restore في تاب PostgreSQL.`,
            when: "كل ما فاتورة المنصة تزيد بشكل ملحوظ، أو تيجي تضيف خدمة جديدة، أو وقت الصيانة على VPS يبدأ ياكل من وقت المنتج.",
            mistakes: R`تحسب الفلوس بس وتعتبر وقتك ببلاش. وتنقل القاعدة من غير ما تجرّب الـ restore قبلها. وتنقل وانت معتمد على حاجات خاصة بالمنصة (cron من الداشبورد، أو متغيرات مش مكتوبة في أي حتة، أو ملفات على ديسك الـ instance). وفي الانترفيو: «امتى تنقل من Heroku-like PaaS لـ infrastructure بتاعتك؟» الإجابة الكويسة فيها التكلفة الكاملة، ومين هيدير، وخطة نقل من غير downtime وخطة رجوع.`
          },
          teach: R`## الفكرة: فلوس + (ساعات × سعر الساعة)

السكربت بيحسب لكل طريقة تشغيل رقم واحد: الفاتورة الشهرية + تمن الوقت اللي بتصرفه على الصيانة. وسعر ساعتك بييجي من الترمنال، فتقدر تشوف القرار بيتغير إزاي.

اتشغّل بـ Node 24 على ويندوز 11، والـ solCode كمان. الأرقام اللي جوه للتوضيح مش أسعار حقيقية.

---

## ١. [[const HOURLY = Number(process.argv[2] ?? 15)]]

من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[process.argv]] | قايمة بكل كلمة في أمر التشغيل |
| [[[2]]] | التالتة (العد من صفر) |
| [[?? 15]] | لو مش موجودة ([[undefined]])، خد 15 |
| [[Number(...)]] | الـ argv دايمًا نص ([["5"]])، فبنحوّله رقم |

ليه [[[2]]]؟ عملنا ملف [[argv.mjs]] فيه سطر واحد بيطبع [[process.argv]]، وشغّلناه بـ [[node argv.mjs 5]]:

~~~text الناتج
[
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\ali\\...\\argv.mjs',
  '5'
]
~~~

[[[0]]] البرنامج، و [[[1]]] السكربت، و [[[2]]] أول حاجة انت كتبتها، ولاحظ إنها [['5']] بين علامات تنصيص: نص مش رقم. (والـ [[\\]] اللي في المسارات هي طريقة كتابة [[\]] جوه نص JavaScript.)

---

## ٢. [[setups]]: ٣ طرق في object واحد

~~~js
const setups = {
  "PaaS (Render/Railway)": { bill: { api: 25, worker: 25, postgres: 20, redis: 10 }, opsHours: 0.5 },
  "VPS + Coolify": { bill: { vps: 16, backups: 3, offsite: 1 }, opsHours: 3 },
  "VPS بإيدك": { bill: { vps: 16, backups: 3, offsite: 1 }, opsHours: 5 },
};
~~~

كل مفتاح اسم طريقة (بين [[" "]] لأن فيه مسافات)، وقيمته فيها:

| الخانة | معناها |
|---|---|
| [[bill]] | بنود الفاتورة بالدولار في الشهر. في الـ PaaS كل خدمة بند لوحدها |
| [[opsHours]] | ساعات صيانة في الشهر: تحديثات، باك أب، مشاكل |

لاحظ إن الـ VPS بالطريقتين نفس الفلوس بالظبط (٢٠)، والفرق كله في الساعات: Coolify بيوفّر عليك كتابة Nginx و systemd بإيدك.

---

## ٣. [[const sum = (o) => Object.values(o).reduce((a, b) => a + b, 0)]]

| الحتة | معناها |
|---|---|
| [[(o) => ...]] | دالة بتاخد object وترجّع اللي بعد السهم |
| [[Object.values(o)]] | القيم بس: [[{ vps: 16, backups: 3, offsite: 1 }]] تبقى [[[16, 3, 1]]] |
| [[.reduce((a, b) => a + b, 0)]] | ابدأ بـ [[0]]، وكل مرة زوّد العنصر اللي جاي: 0+16، ثم 16+3، ثم 19+1 = 20 |

---

## ٤. الحلقة

~~~js
for (const [name, s] of Object.entries(setups)) {
  const cash = sum(s.bill);
  const time = s.opsHours * HOURLY;
  console.log(name.padEnd(22), "فلوس", cash, "+ وقت", time, "=", cash + time, "دولار");
}
~~~

- [[Object.entries(setups)]] بيرجّع أزواج [[[الاسم, القيمة]]]، و [[const [name, s]]] بيفكّ كل زوج لمتغيرين.
- [[cash]] مجموع الفاتورة، و [[time]] الساعات × سعر الساعة.
- [[padEnd(22)]] بيزوّد مسافات لحد ما الاسم يبقى ٢٢ حرف، فالأعمدة تبقى تحت بعض.

### الناتج بـ ٣ أسعار ساعة

~~~text node cost.mjs 5
PaaS (Render/Railway)  فلوس 80 + وقت 2.5 = 82.5 دولار
VPS + Coolify          فلوس 20 + وقت 15 = 35 دولار
VPS بإيدك              فلوس 20 + وقت 25 = 45 دولار
~~~

~~~text node cost.mjs 15
PaaS (Render/Railway)  فلوس 80 + وقت 7.5 = 87.5 دولار
VPS + Coolify          فلوس 20 + وقت 45 = 65 دولار
VPS بإيدك              فلوس 20 + وقت 75 = 95 دولار
~~~

~~~text node cost.mjs 40
PaaS (Render/Railway)  فلوس 80 + وقت 20 = 100 دولار
VPS + Coolify          فلوس 20 + وقت 120 = 140 دولار
VPS بإيدك              فلوس 20 + وقت 200 = 220 دولار
~~~

| سعر الساعة | الأرخص | ليه |
|---|---|---|
| ٥ | VPS + Coolify (٣٥) | الوقت رخيص، فالفرق في الفاتورة (٦٠ دولار) هو اللي بيحكم |
| ١٥ | VPS + Coolify (٦٥)، بس الـ VPS بإيدك (٩٥) بقى أغلى من الـ PaaS (٨٧.٥) | ٥ ساعات بقت أغلى من الـ ٦٠ دولار فرق |
| ٤٠ | PaaS (١٠٠) | نص ساعة صيانة بس، والوقت غالي |

ومن غير رقم ([[node cost.mjs]]) بياخد ١٥، فالناتج نفس سطر الـ ١٥.

---

## ٥. الـ solCode: نقطة القلب بالمعادلة

~~~js
const [, , hourly = "15", paasBill = "80", vpsBill = "20", vpsHours = "4"] = process.argv;
~~~

ده فكّ (destructuring) للـ argv: الفاصلتين في الأول بيتجاهلوا [[[0]]] و [[[1]]] (node والسكربت)، والباقي ليه قيم افتراضية لو مكتبتهوش. فـ [[node break-even.mjs 30 120 20 3]] = سعر ساعة ٣٠، فاتورة PaaS ١٢٠، VPS ٢٠، و ٣ ساعات.

نقطة القلب هي سعر الساعة اللي التكلفتين بيتساووا عنده:

~~~text
paasBill + 0.5 × h  =  vpsBill + vpsHours × h
paasBill − vpsBill  =  (vpsHours − 0.5) × h
h  =  (paasBill − vpsBill) / (vpsHours − 0.5)
~~~

والكود هو السطر الأخير بالظبط، و [[toFixed(1)]] بيقرّب لرقم عشري واحد (وبيرجّع نص).

~~~text node break-even.mjs
PaaS: 87.5 | VPS: 80 | الـ VPS أرخص
الاختيار بيقلب عند سعر ساعة 17.1 دولار
~~~

بالأرقام الافتراضية: (80 − 20) / (4 − 0.5) = 60 / 3.5 = 17.14. يعني تحت ١٧.١ دولار في الساعة الـ VPS أرخص، وفوقها الـ PaaS.

~~~text node break-even.mjs 30 120 20 3
PaaS: 135 | VPS: 110 | الـ VPS أرخص
الاختيار بيقلب عند سعر ساعة 40.0 دولار
~~~

(120 − 20) / (3 − 0.5) = 100 / 2.5 = 40. ولاحظ إن [[toFixed]] كتب [[40.0]] مش [[40]].

> نقطة القلب مش بتعتمد على سعر ساعتك خالص: [[node break-even.mjs 10]] طلّع برضه [[17.1]]. سعر الساعة بيحدد انت على أنهي ناحية منها بس.

---

## الخلاصة

| لو زوّدت | النتيجة |
|---|---|
| سعر ساعتك | الـ PaaS تكسب |
| عدد الخدمات (بنود PaaS) | الـ VPS يكسب، ونقطة القلب تعلى |
| ساعات صيانة الـ VPS | نقطة القلب تنزل، يعني الـ PaaS تكسب أسرع |

> الأرقام في المثال للتوضيح. حط فاتورتك الحقيقية، والساعات اللي بتصرفها فعلًا (تحديثات وباك أب واسترجاع مجرّب)، مش «صفر لأنه شغال لوحده».`,
          lines: [
            "سعر ساعتك من أول argument (الافتراضي ١٥ دولار).",
            "٣ طرق لتشغيل نفس المشروع.",
            "PaaS: ٤ بنود (API و worker وقاعدة و Redis)، ونص ساعة شغل في الشهر.",
            "VPS + Coolify: سيرفر وباك أب وتخزين برا، و ٣ ساعات صيانة.",
            "VPS بإيدك: نفس الفلوس، ووقت أكتر (Nginx و systemd بإيدك).",
            "قفلة.",
            "دالة بتجمع البنود.",
            "لكل طريقة:",
            "الفلوس اللي بتدفعها.",
            "تمن وقتك.",
            "اطبع الاتنين والمجموع.",
            "قفلة الحلقة."
          ],
          sol: R`الناتج بسعر ساعة ٥ دولار: PaaS حوالي [[82.5]]، و VPS + Coolify [[35]]، و VPS بإيدك [[45]]. يعني السيرفر أرخص بفرق كبير.

بسعر ١٥: PaaS [[87.5]]، و Coolify [[65]]، و VPS بإيدك [[95]]. هنا الـ VPS بإيدك بقى أغلى من الـ PaaS، و Coolify لسه أرخص.

بسعر ٤٠: PaaS [[100]]، و Coolify [[140]]، و VPS بإيدك [[220]]. الـ PaaS بقت الأرخص فعلًا.

والحل (الـ solCode) بياخد أرقامك من الـ argv: [[node break-even.mjs]] بالافتراضي بيطلّع [[PaaS: 87.5 | VPS: 80 | الـ VPS أرخص]] و [[الاختيار بيقلب عند سعر ساعة 17.1 دولار]]. ولو فاتورة الـ PaaS ١٢٠ والـ VPS ٢٠ بـ ٣ ساعات ([[node break-even.mjs 30 120 20 3]]) نقطة القلب بتبقى ٤٠ دولار.

الفكرة: كل ما وقتك يغلى، الـ PaaS تكسب. وكل ما الخدمات تكتر (زوّد بنود في الـ PaaS بس وشوف)، الـ VPS يكسب. ولو لقيت إن الـ PaaS دايمًا أغلى مهما غيّرت سعر الساعة، راجع إنك حاسب ساعات صيانة الـ VPS بأمانة: تحديثات وباك أب واسترجاع مجرّب ومراقبة، مش «ولا حاجة، هو شغال لوحده».`,
          solCode: R`// break-even.mjs: هات الفاتورة والساعات من argv بدل ما تكتبها في الكود
const [, , hourly = "15", paasBill = "80", vpsBill = "20", vpsHours = "4"] = process.argv;
const h = Number(hourly);
const paas = Number(paasBill) + 0.5 * h;
const vps = Number(vpsBill) + Number(vpsHours) * h;
console.log("PaaS:", paas, "| VPS:", vps, "|", paas < vps ? "خليك على PaaS" : "الـ VPS أرخص");
const breakEven = (Number(paasBill) - Number(vpsBill)) / (Number(vpsHours) - 0.5);
console.log("الاختيار بيقلب عند سعر ساعة", breakEven.toFixed(1), "دولار");`
        }
      ]
    }
]);
