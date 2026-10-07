// تكملة تاب next: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/next/01.js (شرح حقول الدرس في أوله)
MORE("next", [
    {
      t: "النشر",
      l: 3,
      n: "تختار تنشر فين، ومتغيرات البيئة وقت الـ build ووقت التشغيل، و Next على أكتر من نسخة، والترقية",
      items: [
        {
          cmd: "فين تنشر",
          title: "تنشر Next فين: Vercel ولا VPS ولا Docker ولا static؟",
          desc: R`٤ طرق: Vercel (أسهل حاجة، وكل ميزة شغالة من غير إعداد، والتفاصيل والحدود في تاب «Cloud و DevOps»). أو VPS بـ [[next build]] و [[next start]] ورا Nginx و PM2 (تاب «VPS» وتاب «Nginx»). أو Docker بـ [[output: "standalone"]] (تاب «Docker»). أو [[output: "export"]]: ملفات HTML static بتترفع على أي hosting، بس من غير سيرفر.

الـ static export بيمنع كل حاجة محتاجة سيرفر: Server Actions، و proxy، و Route Handlers غير الـ GET الثابتة، والصفحات الـ dynamic، و ISR، و image optimization الافتراضي.`,
          example: R`npm run build
npm start -- -p 3000
pm2 start npm --name shop -- start
npx vercel --prod
# Docker: output "standalone" في next.config (تاب Docker)
# static: output "export" والناتج في فولدر out
npx serve out`,
          try: R`اعمل build و start لمشروع الـ lab على جهازك. وبعدين جرّب [[output: "export"]] في next.config واعمل build: لو فيه Server Action أو صفحة بتقرا cookies هتلاقي خطأ بيقولك إيه اللي مش مدعوم. وافتح فولدر [[out]] وبص على الملفات.`,
          deep: {
            why: "Next مش ملفات static بس: فيه سيرفر Node بيرسم الصفحات وينفّذ الـ actions ويحوّل الصور ويخزّن الكاش. فالمكان اللي هتنشر فيه بيحدد إيه اللي هيشتغل وبكام، والاختيار الغلط بيبان بعد الإطلاق.",
            how: R`Vercel: الشركة اللي بتعمل Next، فكل ميزة جديدة شغالة يوم نزولها: CDN، و functions، و ISR موزّع، و preview لكل PR. العيب: السعر مع الترافيك العالي، وحدود الـ functions (المدة وحجم الطلب)، ومش مناسب لشغل طويل أو WebSockets.

VPS (أو أي سيرفر Node): [[next start]] سيرفر كامل، كل الميزات شغالة. انت مسؤول عن HTTPS و Nginx والـ restart والـ logs والـ scaling، ومناسب جدًا لمشروع متوسط بتكلفة ثابتة. و Next 16 محتاج Node 20.9 على الأقل.

Docker: نفس الـ VPS بس في image، و [[standalone]] بيصغّرها جدًا. ومناسب لـ Kubernetes و ECS و Fly و Railway.

وبين Vercel والـ VPS العريان فيه منصات بتشغّل Next كسيرفر Node كامل (كل الميزات شغالة) من غير ما تدير السيرفر بإيدك، وكلها في تاب «Cloud و DevOps»: Render بملف [[render.yaml]] (درس [[render.yaml]])، و Railway (درس [[railway]])، و Fly.io بالـ Dockerfile و [[fly.toml]] (درس [[fly launch]])، ولو عندك VPS وعايز تجربة زي Render عليه: Coolify أو Dokploy (درس [[Coolify / Dokploy]]).

Static export: [[next build]] بيطلّع [[out/]] فيه HTML لكل صفحة، بيترفع على S3 أو GitHub Pages أو أي CDN (تاب «Cloud و DevOps»). مناسب لمواقع محتوى أو docs أو landing من غير login. و [[next/image]] محتاج [[unoptimized: true]] أو loader خارجي.

وفيه adapters لمنصات تانية (Netlify و Cloudflare عن طريق OpenNext)، وفي Next 16 بدأ Build Adapters API (تجريبي) عشان المنصات تدعم Next رسميًا. بس دايمًا اختبر الميزات اللي بتستخدمها (ISR والـ proxy والصور) على المنصة دي بالذات.`,
            when: "Vercel لفريق صغير عايز يركز على المنتج أو MVP. VPS أو Docker لما التكلفة تفرق أو محتاج تحكم (نفس السيرفر فيه API وداتابيز). و static export لموقع ملوش أي حاجة dynamic.",
            mistakes: R`[[next dev]] على السيرفر «عشان الأخطاء تبان». و static export وبعدين تكتشف إن الفورم محتاج Server Action. و Next مكشوف على بورت 3000 للإنترنت من غير Nginx و HTTPS. و build على VPS فيه ١ جيجا رام فيقع (ابني في CI، أو زوّد swap، تاب «Node و npm»).`
          },
          teach: R`## الفكرة: نفس الـ build، وطرق مختلفة تشغّله بيها

المثال أوامر الطرق الأربعة. اتشغّل منها على ويندوز (PowerShell و Git Bash) في مشروع Next 16.4: [[npm run build]] و [[npm start]] و [[output: "export"]] و [[serve]]. أما [[pm2]] (بيعمل daemon شغال على الجهاز) و [[vercel]] (محتاج حساب) فمن الـ docs وتاب «VPS» وتاب «Cloud و DevOps».

---

## ١. [[npm run build]]

[[npm run]] بيشغّل script من [[package.json]]. و create-next-app كاتب فيه:

~~~text package.json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint"
}
~~~

فـ [[npm run build]] = [[next build]]: بيعمل فولدر [[.next]] فيه كل حاجة جاهزة للإنتاج، ويطبع جدول الصفحات ([[○]] و [[●]] و [[ƒ]]). نفس الأمر في كل الطرق الأربعة.

---

## ٢. [[npm start -- -p 3000]]

- [[npm start]]: اختصار [[npm run start]] (من الأسامي القليلة اللي npm بيقبلها من غير [[run]]).
- [[--]]: «اللي بعدي مش لـ npm، ابعته للأمر نفسه».
- [[-p 3000]]: [[next start]] يسمع على بورت 3000.

جربناه ببورت 5836:

~~~text الناتج
> app@0.1.0 start
> next start -p 5836

▲ Next.js 16.4.0
- Local:         http://localhost:5836
- Network:       http://172.29.160.1:5836
✓ Ready in 176ms
~~~

السطر التاني بيوريك الأمر الحقيقي اللي اتنفذ: الـ [[-p 5836]] وصل لـ [[next start]]. و [[Network]] عنوان الجهاز على الشبكة المحلية. ده سيرفر Node كامل: بيرسم الصفحات الـ dynamic، وينفّذ الـ actions، ويصغّر الصور.

---

## ٣. [[pm2 start npm --name shop -- start]]

[[pm2]] بيخلي العملية شغالة بعد ما تقفل الـ SSH، ويقومها تاني لو وقعت (تاب «VPS»). الأمر بيتقري كده:

| الحتة | معناها |
|---|---|
| [[pm2 start npm]] | شغّل برنامج [[npm]] |
| [[--name shop]] | اسمه في [[pm2 list]] و [[pm2 logs shop]] |
| [[-- start]] | اللي بعد [[--]] يتبعت لـ npm، يعني [[npm start]] |

---

## ٤. [[npx vercel --prod]]

[[npx]] بيشغّل باكدج من غير ما تسطبه global. [[vercel]] الـ CLI بتاع Vercel: أول مرة بيطلب login ويربط الفولدر بمشروع، و [[--prod]] معناها «انشر على الدومين الأساسي مش preview». (من الـ docs، محتاج حساب).

---

## ٥. الـ static export و [[npx serve out]]

في [[next.config.ts]]:

~~~text next.config.ts
const nextConfig: NextConfig = { output: "export" };
~~~

[[next build]] بقى بيطلّع فولدر اسمه [[out]] فيه HTML جاهز، من غير سيرفر Node خالص. جرّبنا الحاجات اللي محتاجة سيرفر:

### صفحة بتقرا [[cookies()]]

~~~text الناتج (next build)
Error: Route /me with $__btdynamic = "error"$__bt couldn't be rendered statically because it used $__btcookies()$__bt.
Export encountered an error on /me/page: /me, exiting the build.
~~~

الـ export بيعامل كل صفحة كأنها [[dynamic = "error"]]: أي حاجة بتخلي الصفحة dynamic بتوقع الـ build.

### فورم بـ Server Action

~~~text الناتج (next build)
> Server Actions are not supported with static export.
~~~

### من غير الاتنين

~~~text الناتج (ls out)
404.html  _next  _not-found.html  about  about.html  about.txt
favicon.ico  index.html  index.txt  next.svg  ...
~~~

- [[index.html]] و [[about.html]]: صفحة HTML لكل route.
- [[.txt]]: الـ RSC payload لكل صفحة، اللي [[<Link>]] بيجيبه وقت التنقل بدل الـ HTML.
- [[_next/static]]: الـ JS والـ CSS.
- [[404.html]]: صفحة الـ 404.

### [[npx serve out]]

[[serve]] سيرفر ملفات static بسيط، و [[out]] الفولدر اللي يقدّمه. شغّلناه بـ [[-l 5838]] (البورت):

~~~text الناتج (curl)
/                                         200
/about                                    200
/nope                                     404
/photo.jpg                                200
/_next/image?url=%2Fphoto.jpg&w=828&q=75  404
~~~

السطر الأخير هو المشكلة اللي في الـ sol: صفحة About فيها [[<Image src="/photo.jpg">]]، والـ build عدّى عادي، بس الـ HTML بيطلب [[/_next/image?...]] ودي محتاجة سيرفر Next يصغّر الصورة. على static server الصورة 404. الحل [[images: { unoptimized: true }]] أو loader خارجي. (صور SVG زي [[next.svg]] مش بتعدّي على الـ optimizer أصلًا، فاشتغلت.)

### و [[next start]] مع الـ export؟

~~~text الناتج
Error: "next start" does not work with "output: export" configuration. Use "npx serve@latest out" instead.
~~~

---

## الخلاصة

| الطريقة | الأمر | كل الميزات؟ |
|---|---|---|
| VPS | [[npm run build]] و [[npm start]] ورا Nginx و PM2 | أيوة، وانت مسؤول عن السيرفر |
| Docker | [[output: "standalone"]] | أيوة |
| Vercel | [[npx vercel --prod]] أو ربط الـ repo | أيوة، والسعر مع الترافيك |
| Static export | [[output: "export"]] وفولدر [[out]] | لأ: مفيش actions ولا cookies ولا proxy ولا image optimization |`,
          lines: [
            R`ابني. نفس الأمر في كل الطرق (تفاصيل الجدول في تاب «Node و npm»).`,
            "شغّل على بورت 3000. على VPS بيبقى ورا Nginx مش مكشوف مباشرة.",
            R`خليه شغال بعد ما تقفل الـ SSH ويقوم لوحده لو وقع (PM2 في تاب «VPS»).`,
            "أو ارفع على Vercel من الترمنال (أو اربط الـ repo وكل push بيعمل deploy).",
            R`لو [[output: "export"]]: جرّب فولدر [[out]] محليًا بأي static server.`
          ],
          sol: R`[[npm run build]] وبعده [[npm start]] بيشغّلوا نسخة الإنتاج على [[localhost:3000]]: أسرع من dev بكتير، ومفيش overlay.

مع [[output: "export"]] الـ build بيقع على أول حاجة محتاجة سيرفر: صفحة بتقرا cookies بتطلّع [[Route /me with dynamic = "error" couldn't be rendered statically because it used cookies()]]، و Server Action بتطلّع [[Server Actions are not supported with static export.]] ولو مفيش حاجة من دول، هتلاقي فولدر [[out]] فيه [[index.html]] و HTML لكل صفحة، وملف [[.txt]] لكل صفحة (الـ RSC payload للتنقل)، و [[_next/static]]، و [[404.html]].

وخد بالك من [[next/image]]: الـ build عدّى عندي عادي، بس الـ HTML فيه [[/_next/image?url=...]] ودي مش موجودة على أي static server، فالصور بترجع 404. الحل [[images: { unoptimized: true }]] أو loader خارجي.`
        },
        {
          cmd: "env في Next",
          title: "متغيرات البيئة: وقت الـ build ولا وقت التشغيل؟",
          desc: R`Next بيقرا [[.env]] و [[.env.local]] و [[.env.production]] و [[.env.development]] لوحده من غير dotenv. [[.env.local]] للأسرار على جهازك ومبيترفعش على git، و [[.env]] للقيم الافتراضية اللي مش سرية.

المهم: [[NEXT_PUBLIC_*]] بتتكتب جوه الـ JS وقت الـ build، فتغييرها محتاج build جديد. والمتغيرات التانية بتتقري على السيرفر وقت التشغيل، بس لو صفحة static اتبنت وقت الـ build بتستخدم متغير، القيمة اللي كانت وقت الـ build هي اللي في الـ HTML.`,
          example: R`# .env.local (مبيترفعش)
DATABASE_URL="postgresql://app:secret@localhost:5432/shop"
SESSION_SECRET="change-me-32-random-bytes-base64"
# .env (بيترفع، قيم عامة)
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
// lib/env.ts
import "server-only";
import * as z from "zod";
export const env = z.object({ DATABASE_URL: z.url(), SESSION_SECRET: z.string().min(32) }).parse(process.env);
// أي client component
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const { NEXT_PUBLIC_SITE_URL: bad } = process.env;`,
          try: R`حط [[NEXT_PUBLIC_SITE_URL]] واعمل build، وبعدين غيّرها في [[.env]] واعمل [[npm start]] من غير build: القيمة القديمة لسه في المتصفح. وبعدين اعمل صفحة static بتعرض [[process.env.GREETING]]، واعمل build، وغيّر GREETING وشغّل start: الصفحة لسه بالقديم لأنها اتبنت. خليها dynamic (بـ [[await connection()]] من [[next/server]] في أولها) وجرّب تاني.`,
          flag: "script",
          deep: {
            why: "«غيّرت المتغير على السيرفر وعملت restart والموقع لسه بالقيمة القديمة» من أشهر المشاكل في Next. السبب إن فيه وقتين مختلفين: الـ build والتشغيل، وكل متغير بيتقري في وقت منهم حسب هو فين وإزاي بيتستخدم.",
            how: R`ترتيب القراية (الأعلى بيكسب): [[process.env]] الحقيقي من النظام، وبعدين [[.env.$(NODE_ENV).local]]، وبعدين [[.env.local]] (مش بيتقري في test)، وبعدين [[.env.$(NODE_ENV)]]، وبعدين [[.env]]. و [[next dev]] بيبقى development، و [[next build]] و [[next start]] production.

[[NEXT_PUBLIC_]]: وقت الـ build بيتبدل نصيًا في كود المتصفح وكود السيرفر. فالـ Docker image اللي اتبنت بـ [[NEXT_PUBLIC_API_URL]] بتاع staging هتفضل staging في الإنتاج. لو محتاج نفس الـ image لكذا بيئة، اقرا القيمة على السيرفر وعدّيها للـ client (prop أو context)، أو اعمل route بيرجّع config.

المتغيرات العادية: بتتقري من [[process.env]] على السيرفر وقت تنفيذ الكود. في صفحة dynamic ده مع كل طلب. في صفحة static الكود اتنفذ وقت الـ build وخلاص.

والأسرار في Docker: وقت التشغيل من env_file أو secrets، مش [[ARG]] في الـ build (بتتحفظ في طبقات الـ image، تاب «Docker»). وفحص المتغيرات بـ Zod (أو t3-env اللي بيفصل server و client) في تاب «TypeScript».`,
            when: R`كل مشروع. واعمل [[.env.example]] فيه أسماء المتغيرات من غير قيم وارفعه، عشان اللي يعمل clone يعرف محتاج إيه.`,
            mistakes: R`ترفع [[.env.local]] على git. وتحط سر في [[NEXT_PUBLIC_]]. وتغيّر [[NEXT_PUBLIC_]] على السيرفر من غير build. وتعمل [[const { API_KEY } = process.env]] في client component وتستغرب إنه undefined. وتبعت كل المتغيرات كـ build args في Docker.`
          },
          teach: R`## الفكرة: كل متغير بيتقري في وقت من اتنين: الـ build أو التشغيل

المثال ٤ حتت: ملف أسرار، وملف قيم عامة، وملف بيفحص الأسرار بـ Zod، وسطرين في client component. اتشغّل في Next 16.4 و Zod 4 بـ [[next build]] و [[next start]]، والقيم في المتصفح من Chrome headless.

---

## ١. الملفين

~~~text .env.local
DATABASE_URL="postgresql://app:secret@localhost:5432/shop"
SESSION_SECRET="change-me-32-random-bytes-base64"
~~~

~~~text .env
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
~~~

- كل سطر [[اسم="قيمة"]]، و [[#]] في أول السطر تعليق.
- [[DATABASE_URL]]: عنوان الداتابيز بالشكل [[postgresql://يوزر:باسورد@السيرفر:البورت/اسم_الداتابيز]].
- [[SESSION_SECRET]]: مفتاح تشفير الـ sessions. القيمة هنا ٣٢ حرف بالظبط (عديناها)، وفي الحقيقة بتبقى عشوائية.
- [[.env.local]] متحط في [[.gitignore]] بتاع create-next-app، فمبيترفعش. و [[.env]] بيترفع، فمفيهوش أسرار.

أول سطر في [[next build]] بيقولك قرا إيه:

~~~text الناتج
▲ Next.js 16.4.0 (Turbopack)
- Environments: .env.local, .env
~~~

---

## ٢. [[lib/env.ts]]: افحص الأسرار مرة واحدة

~~~text src/lib/env.ts
import "server-only";
import * as z from "zod";
export const env = z.object({ DATABASE_URL: z.url(), SESSION_SECRET: z.string().min(32) }).parse(process.env);
~~~

### [[import "server-only";]]

import من غير أسماء: مش عايز منه حاجة، عايز أثره بس. لو أي client component استورد الملف ده (حتى من غير قصد)، الـ build يقع. جربنا:

~~~text الناتج (next build)
Error: 'server-only' cannot be imported from a Client Component module
It should only be used from a Server Component.
~~~

يعني مستحيل الأسرار توصل للمتصفح بالغلط. (واشتغل من غير [[npm i server-only]]: Next 16.4 فاهمه لوحده.)

### [[z.object({...}).parse(process.env)]]

من جوه لبرة:

1. [[process.env]]: object فيه كل متغيرات البيئة (من النظام ومن ملفات [[.env]]).
2. [[z.object({...})]]: الشكل المطلوب: [[DATABASE_URL]] لازم URL صالح ([[z.url()]])، و [[SESSION_SECRET]] نص طوله ٣٢ على الأقل ([[z.string().min(32)]]).
3. [[.parse(...)]]: افحص. لو تمام يرجّع object فيه الخانتين دول بس، بالأنواع الصح. لو لأ يرمي error.

والسطر ده في أول الملف، فبيتنفذ أول ما حد يستورده. مسحنا [[SESSION_SECRET]] من [[.env.local]] وعملنا build:

~~~text الناتج (next build)
Error: Failed to collect configuration for /
  [cause]: Error [ZodError]: [
    {
      "expected": "string",
      "code": "invalid_type",
      "path": [ "SESSION_SECRET" ],
      "message": "Invalid input: expected string, received undefined"
    }
  ]
      at module evaluation (src\lib\env.ts:3:92)
~~~

[[path]] بيقولك مين الناقص، و [[received undefined]] يعني مش موجود خالص. أحسن بكتير من error غامض بعد ساعة لما أول طلب يحاول يعمل session.

وفي الصفحة استخدمناه كده: [[new URL(env.DATABASE_URL).host]] طلع [[localhost:5432]].

---

## ٣. الـ client component

### [[const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;]]

المتصفح مفيهوش [[process.env]] أصلًا. اللي بيحصل إن Next وقت الـ build بيدوّر على النص [[process.env.NEXT_PUBLIC_...]] في كود المتصفح ويبدّله بالقيمة. فتحنا ملف الـ JS اللي اتعمل:

~~~text الناتج (من /_next/static/chunks/...js)
("p",{id:"u",children:["siteUrl=",String("http://localhost:3000")
~~~

القيمة بقت نص ثابت جوه الملف. وأي حد يقدر يفتح الملف ده، عشان كده [[NEXT_PUBLIC_]] للحاجات العامة بس.

### [[const { NEXT_PUBLIC_SITE_URL: bad } = process.env;]]

destructuring: «هات [[NEXT_PUBLIC_SITE_URL]] من [[process.env]] وسمّيه [[bad]]». مش هيشتغل، لأن النص [[process.env.NEXT_PUBLIC_SITE_URL]] مش مكتوب بالشكل ده، فمحدش بدّله. جربنا ٥ طرق في المتصفح:

~~~text الناتج (Chrome)
process.env.NEXT_PUBLIC_SITE_URL                 → http://localhost:3000
process.env["NEXT_PUBLIC_" + "SITE_URL"]          → http://localhost:3000
const { NEXT_PUBLIC_SITE_URL: x } = process.env   → undefined
دالة بتاخد الاسم: process.env["NEXT_PUBLIC_" + name] → undefined
الاسم من prop                                    → undefined
~~~

التانية اشتغلت لأن الـ bundler بيجمع النصين الثابتين لنص واحد قبل التبديل. لكن أول ما جزء من الاسم ييجي من متغير، مفيش طريقة يعرفه وقت الـ build. القاعدة: اكتبها بالنص كاملة.

---

## ٤. التجربة: غيّرنا القيم من غير build

بعد الـ build، غيّرنا [[.env]] لـ [[NEXT_PUBLIC_SITE_URL="https://shop.example.com"]] و [[GREETING="أهلًا (بعد التغيير)"]]، وشغّلنا [[npm start]] تاني من غير build. وفيه صفحتين بيعرضوا [[process.env.GREETING]]: واحدة عادية، وواحدة أولها [[await connection()]]:

~~~text الجدول من الـ build
├ ○ /greet
└ ƒ /greet-dyn
~~~

[[connection()]] من [[next/server]] معناها «الصفحة دي لازم تستنى طلب حقيقي»، فبقت [[ƒ]].

~~~text الناتج
/           siteUrl=http://localhost:3000      (القديمة)
/greet      أهلًا (من build)                   (القديمة)
/greet-dyn  أهلًا (بعد التغيير)                 (الجديدة)
~~~

| المتغير | اتقري إمتى | يتغير من غير build؟ |
|---|---|---|
| [[NEXT_PUBLIC_*]] في كود المتصفح | وقت الـ build، واتكتب في الـ JS | لأ |
| عادي في صفحة [[○]] | وقت الـ build، واتكتب في الـ HTML | لأ |
| عادي في صفحة [[ƒ]] | مع كل طلب | أيوة، بعد restart |

---

## ٥. مين بيكسب لو المتغير في أكتر من مكان؟

حطينا [[GREETING]] في [[.env]] وفي [[.env.local]]، وبعدين كمان في متغيرات النظام قبل [[next start]]:

~~~text الناتج (/greet-dyn)
.env و .env.local      → من .env.local
وكمان متغير نظام       → من النظام
~~~

والترتيب الكامل من الأقوى (من الـ docs، واللي جربناه منه ماشي عليه): متغيرات النظام، وبعدين [[.env.production.local]] (أو development)، وبعدين [[.env.local]]، وبعدين [[.env.production]]، وبعدين [[.env]]. فلو غيّرت [[.env]] والقيمة مش بتتغير، دوّر في اللي فوقه.

---

## الخلاصة

| الحاجة | القاعدة |
|---|---|
| الأسرار | [[.env.local]] (مبيترفعش) أو متغيرات السيرفر، وملف عليه [[import "server-only"]] |
| فحص المتغيرات | Zod مرة واحدة أول ما الملف يتحمّل، والـ build يقع لو حاجة ناقصة |
| [[NEXT_PUBLIC_]] | عام، بيتكتب في الـ JS وقت الـ build، وتغييره محتاج build |
| في المتصفح | [[process.env.NEXT_PUBLIC_X]] مكتوبة بالنص كاملة، مش destructuring |
| صفحة static | بتاخد القيمة اللي كانت وقت الـ build |`,
          lines: [
            "رابط الداتابيز: سر، على جهازك بس.",
            "سر الـ sessions.",
            "عام: بيتحط في الـ JS وقت الـ build، وأي حد يقدر يشوفه.",
            "الأسرار في ملف سيرفر بس.",
            "Zod.",
            "افحص المتغيرات مرة واحدة أول ما السيرفر يقوم: لو حاجة ناقصة يقع برسالة واضحة، مش بعد ساعة في نص طلب.",
            "في المتصفح: Next بدّل السطر ده بالقيمة الحرفية وقت الـ build.",
            R`مش هيشتغل: Next بيبدّل [[process.env.NEXT_PUBLIC_X]] لما تبقى مكتوبة كده بالنص بس، فالـ destructuring (أو اسم جاي من متغير) بيطلع undefined في المتصفح.`
          ],
          sol: R`بعد تغيير [[NEXT_PUBLIC_SITE_URL]] في [[.env]] وتشغيل [[npm start]] من غير build: المتصفح لسه بيعرض القيمة القديمة، لأنها اتكتبت جوه الـ JS وقت الـ build.

والصفحة الـ static اللي بتعرض [[process.env.GREETING]]: لسه بالقيمة القديمة بعد التغيير والـ restart، لأن الـ HTML اتبنى وقت الـ build وخلاص. وبعد [[await connection()]] الجدول بيقول [[ƒ]]، والصفحة بقت تعرض القيمة الجديدة من غير build، لأن الكود بيتنفذ مع كل طلب ويقرا [[process.env]] ساعتها. لو القيمة الجديدة مش ظاهرة حتى في الـ dynamic: نفس المتغير موجود في [[.env.local]] (وده بيكسب على [[.env]])، أو في متغيرات النظام.`
        },
        {
          cmd: "أكتر من نسخة",
          title: "Next على أكتر من سيرفر: الكاش ومفتاح الـ actions والـ streaming",
          desc: R`على Vercel ده محلول. لما تنشر بنفسك أكتر من نسخة ورا load balancer (أو حتى نسخة واحدة ورا Nginx)، فيه ٣ حاجات لازم تظبطها. الكاش (ISR و [[use cache]]): كل نسخة ليها واحد في الذاكرة والديسك، فمحتاج cache handler مشترك (Redis). ومفتاح تشفير الـ Server Actions لازم يبقى واحد في كل النسخ والـ builds ([[NEXT_SERVER_ACTIONS_ENCRYPTION_KEY]]). و [[deploymentId]] عشان المتصفح اللي فاتح نسخة قديمة وقت الـ deploy يعرف إن فيه جديدة.

ولو Nginx قدام Next، الـ buffering بيبوّظ الـ streaming: header [[X-Accel-Buffering: no]] من Next بيحلها.`,
          example: R`// next.config.ts
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "standalone",
  deploymentId: process.env.GIT_SHA,
  async headers() {
    return [{ source: "/:path*{/}?", headers: [{ key: "X-Accel-Buffering", value: "no" }] }];
  },
};
export default nextConfig;
# في CI: المفتاح بيتعمل مرة واحدة ويتحفظ secret، وكل build بيستخدمه
openssl rand -base64 32
NEXT_SERVER_ACTIONS_ENCRYPTION_KEY="$ACTIONS_KEY" GIT_SHA=$(git rev-parse --short HEAD) npm run build`,
          try: R`شغّل نسختين من نفس المشروع على بورتين ([[PORT=3001 node server.js]] و [[PORT=3002]]) واعمل صفحة ISR فيها وقت الرسم. اعمل [[revalidatePath]] من نسخة وافتح التانية: لسه قديمة، لأن كل نسخة ليها كاش. وبعدين جرّب صفحة فيها Suspense بطيء من ورا Nginx من غير الـ header وشوف الصفحة كلها بتستنى.`,
          flag: "script",
          deep: {
            why: "كل حاجة شغالة على نسخة واحدة على جهازك، وبعد ما تكبّر لنسختين: الأدمن يعدّل منتج والزوار يشوفوا القديم نص الوقت، ومستخدمين يلاقوا «Failed to find Server Action» بعد كل deploy، وصفحات الـ streaming بتستنى كلها مرة واحدة ورا Nginx.",
            how: R`الكاش: Next بيحفظ ISR والـ fetch cache في الذاكرة و [[.next/cache]]. في النموذج القديم [[cacheHandler]] (مفرد) في next.config بيشاور على ملف بيخزّن في Redis أو غيره، و [[cacheMaxMemorySize: 0]] بيقفل كاش الذاكرة المحلي. ومع Cache Components فيه [[cacheHandlers]] (جمع) لـ [[use cache]]. وفيه مكتبات جاهزة لـ Redis. والبديل الأبسط: نسخة واحدة أكبر، أو كاش أقل وداتابيز سريعة.

الـ Server Actions: الـ closures والـ arguments المشفرة بتتشفر بمفتاح بيتعمل عشوائي مع كل build. لو النسخ من builds مختلفة، أو بنيت كل نسخة لوحدها، نسخة مش هتفك تشفير التانية. المفتاح الثابت بيحل ده.

الـ version skew: بعد deploy، المستخدم اللي الصفحة مفتوحة عنده معاه JS قديم بيطلب chunks أو actions مبقتش موجودة. [[deploymentId]] بيخلي Next يكتشف ده ويعمل reload كامل. واحتفظ بملفات [[.next/static]] القديمة شوية على الـ CDN لو تقدر.

والـ streaming: Nginx بيعمل buffer للـ response قبل ما يبعته. [[X-Accel-Buffering: no]] بيقفله للردود دي بس. وإعدادات Nginx نفسها في تاب «Nginx» (ومعاها WebSocket لو محتاج HMR ورا Nginx في التطوير).`,
            when: "أول ما تشغّل أكتر من نسخة (PM2 cluster، أو ٢ containers، أو Kubernetes)، أو أول ما تحط Nginx أو CDN قدام Next.",
            mistakes: R`تشغّل [[pm2 start -i max]] وتفتكر إن الكاش مشترك. وتبني image لكل سيرفر لوحده بمفاتيح مختلفة. وتنسى الـ buffering فتفتكر إن Suspense مش شغال. ومن غير [[deploymentId]] تلاقي أخطاء JS غريبة في Sentry بعد كل deploy.`
          },
          teach: R`## الفكرة: ٣ إعدادات عشان النسخ تفهم بعض

المثال [[next.config.ts]] فيه ٣ إعدادات، وأمرين للـ CI: واحد بيعمل مفتاح، وواحد بيبني بيه. اتشغّل كله في Next 16.4: build بـ [[output: "standalone"]]، ونسختين [[node server.js]] على بورتين، ونسخة Nginx حقيقية ([[nginx:alpine]] في Docker) قدامهم، والطلبات بـ [[curl]] و Node.

---

## ١. [[output: "standalone"]]

[[next build]] بيعمل فولدر [[.next/standalone]] فيه سيرفر لوحده:

~~~text الناتج (ls .next/standalone)
node_modules  package.json  server.js
~~~

[[server.js]] ده سيرفر Next كامل، و [[node_modules]] فيه الباكدجات اللي محتاجها فعلًا بس (مش كل اللي في المشروع). عشان كده الـ Docker image بتصغر جدًا (تاب «Docker»). بس مبينسخش [[public]] و [[.next/static]]، وده سبب أول سطر في الـ solCode:

~~~bash
cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/
~~~

[[cp -r]] نسخ فولدر بكل اللي جواه، و [[&&]] «لو اللي قبلي نجح، نفّذ اللي بعدي».

---

## ٢. [[deploymentId: process.env.GIT_SHA]]

رقم بيميّز الـ deploy ده. بنيناه بـ [[GIT_SHA=$(git rev-parse --short HEAD)]]:

- [[git rev-parse --short HEAD]]: الـ hash المختصر لآخر commit. طلع [[9822879]].
- [[$(...)]]: نفّذ الأمر وحط ناتجه مكانه.

واللي اتغير في الـ HTML:

~~~text الناتج (curl /isr)
/_next/static/media/797e433ab948586e-s.p.0r6juujl39pe6.woff2?dpl=9822879
data-dpl-id="9822879"
~~~

كل ملف static بقى في آخره [[?dpl=9822879]]، والصفحة شايلة الـ id بتاعها. فلما المتصفح اللي معاه نسخة قديمة يكلّم سيرفر عليه deploy جديد، Next يعرف إن فيه اختلاف ويعمل reload كامل بدل ما يطلب ملفات مبقتش موجودة.

---

## ٣. [[headers()]]: [[X-Accel-Buffering: no]]

~~~text next.config.ts
async headers() {
  return [{ source: "/:path*{/}?", headers: [{ key: "X-Accel-Buffering", value: "no" }] }];
},
~~~

- [[headers()]] دالة في الـ config بترجّع قايمة: لكل [[source]] (مسار) الـ headers اللي تتضاف للرد.
- [[/:path*]]: [[:path]] اسم لجزء متغير، و [[*]] «صفر أجزاء أو أكتر»، فده أي مسار. و [[{/}?]] معناها «وممكن / في الآخر».
- [[X-Accel-Buffering: no]]: header بيفهمه Nginx بس: «متعملش buffer للرد ده». Nginx بيشيله قبل ما يبعت للمتصفح.

~~~text الناتج (curl -D - على Next مباشرة)
X-Accel-Buffering: no
~~~

### جربناه ورا Nginx

صفحة فيها shell وجزء جوه [[<Suspense>]] بياخد ٣ ثواني. وقدامها Nginx بإعداداته الافتراضية ([[proxy_buffering]] شغال) على بورتين: واحد عادي، وواحد فيه [[proxy_ignore_headers X-Accel-Buffering;]] عشان يتصرف كأن Next مبعتش الـ header. وسجّلنا كل دفعة bytes وصلت وإمتى:

~~~text الناتج
Next direct            before 2.5s: 6740 of 7790 bytes | chunks 81ms:6740B 3081ms:116B 3081ms:934B
Nginx + header         before 2.5s: 6740 of 7790 bytes | chunks 21ms:6740B 3023ms:116B 3023ms:934B
Nginx, header ignored  before 2.5s: 3438 of 7790 bytes | chunks 17ms:3438B 3025ms:3418B 3025ms:934B
~~~

- مع الـ header: Nginx عدّى الـ shell كله (6740 byte) على طول، والجزء البطيء بعد ٣ ثواني. زي Next من غير Nginx بالظبط.
- من غيره: وصل أول 3438 byte بس، والباقي من الـ shell (فيه scripts الصفحة) **استنى** لحد ما الجزء البطيء خلص. Nginx بيبعت لما الـ buffer بتاعه يتملي (حوالي ٤ كيلو)، فآخر حتة ناقصة بتقعد. في صفحتنا الصغيرة العنوان لحق يوصل، بس الصفحة مبقتش تفاعلية غير بعد ٣ ثواني.

---

## ٤. مفتاح الـ Server Actions

~~~bash
openssl rand -base64 32
~~~

- [[openssl rand 32]]: ٣٢ byte عشوائية، يعني مفتاح ٢٥٦ bit.
- [[-base64]]: اكتبها بـ base64 عشان تتحط في متغير.

~~~text الناتج (Git Bash)
cZtYgTVtnhTg/awpQnUP/Ff89lfGIbpe49/bDYPMiH8=
~~~

### المفتاح ده بيتستخدم في إيه؟

لو Server Action جوه كومبوننت بتستخدم متغير من برّاها، Next بيحط قيمته **مشفرة** في الصفحة. جربنا action بتستخدم [[const secret = "bound-value"]]، ودي الفورم اللي طلعت:

~~~text الناتج (مختصر)
<input type="hidden" name="$ACTION_1:0" value="{"id":"40c013d18b2b338f4a813eb8be2102fde35f5e80ea","bound":"$@1"}"/>
<input type="hidden" name="$ACTION_1:2" value=""1PfpoJJyasyixmdTvXkkTvIX9IgwUiqLMCn+YTOiv5TU+..."/>
~~~

[[id]] اسم الـ action، والقيمة الطويلة هي [["bound-value"]] بعد التشفير. السيرفر اللي يستلم الفورم لازم يفك التشفير بنفس المفتاح.

### التجربة: فورم من نسخة، اتبعتت لنسخة تانية

| النسختين | النتيجة |
|---|---|
| نفس الـ build | [[HTTP 200]] و [[ACTION RAN with bound-value]] |
| build تاني في نفس الفولدر | [[HTTP 200]] برضه |
| build نضيف (اتمسح [[.next]]) | [[HTTP 409]] |
| buildين نضاف بنفس [[NEXT_SERVER_ACTIONS_ENCRYPTION_KEY]] | [[HTTP 200]] |

التانية اشتغلت ليه؟ Next 16.4 بيحفظ المفتاح العشوائي في [[.next/cache/.rscinfo]] ويستخدمه تاني:

~~~text الناتج (cat .next/cache/.rscinfo)
{"encryption.key":"tkCC5PtZlaw1wLCHDyxdEGO3mO+DEew4XkPHRsYGTHw=","encryption.expire_at":1792568726979}
~~~

يعني على جهازك كل حاجة شغالة، والمشكلة بتظهر بس لما كل build يبدأ من الصفر، وده بالظبط اللي بيحصل في CI أو Docker. والـ 409 جه بالرسالة دي:

~~~text الناتج (log النسخة التانية)
Error: Failed to find Server Action "40c013d18b2b338f4a813eb8be2102fde35f5e80ea". This request might be from an older or newer deployment.
~~~

حتى الـ id نفسه بيتغير مع المفتاح. وبنفس المفتاح في الـ buildين، رجع 200.

### سطر البناء

~~~bash
NEXT_SERVER_ACTIONS_ENCRYPTION_KEY="$ACTIONS_KEY" GIT_SHA=$(git rev-parse --short HEAD) npm run build
~~~

في bash لما تكتب [[اسم=قيمة]] قبل الأمر في نفس السطر، المتغير بيتحط للأمر ده بس. و [[$ACTIONS_KEY]] متغير جاي من secrets الـ CI (المفتاح اللي عملته مرة واحدة).

---

## ٥. الكاش: الـ solCode

~~~bash
PORT=3001 node server.js &
PORT=3002 node server.js &
curl -s -X POST localhost:3001/api/revalidate
curl -s localhost:3001/isr | grep -o '<p id="t">[^<]*'
~~~

- [[PORT=3001 node server.js]]: [[server.js]] بيقرا البورت من [[PORT]]. و [[&]] في الآخر: شغّله في الخلفية وكمّل.
- [[curl -s -X POST]]: [[-X]] بيحدد الـ method.
- [[grep -o '<p id="t">[^<]*']]: [[-o]] اطبع الحتة اللي طابقت بس. و [[[^<]*]] «أي حروف لحد أول [[<]]»، يعني النص اللي جوه الـ [[<p>]].

الصفحة [[/isr]] فيها [[revalidate = 3600]] وبتعرض وقت رسمها، والجدول قال:

~~~text الناتج (next build)
Route (app)          Revalidate  Expire
├ ○ /isr                     1h      1y
~~~

شغّلناهم على 5838 و 5839 من **نفس الفولدر**:

~~~text الناتج
5838: <p id="t">2026-10-07T07:59:57.902Z
5839: <p id="t">2026-10-07T07:59:57.902Z
POST 5838: {"revalidated":true}
5838: <p id="t">2026-10-07T08:00:46.887Z
5839: <p id="t">2026-10-07T07:59:57.902Z
~~~

الاتنين بدأوا بوقت الـ build. بعد [[revalidatePath]] على الأولى، الأولى بقت جديدة والتانية لسه قديمة، لأن كل نسخة معاها كاش في الذاكرة. ورا load balancer، الزائر هيشوف القديم والجديد حسب الطلب وقع على مين. والحل cache handler مشترك (Redis مثلًا).

---

## الخلاصة

| المشكلة | الإعداد |
|---|---|
| image كبيرة | [[output: "standalone"]] وانسخ [[public]] و [[.next/static]] |
| متصفح معاه نسخة قديمة بعد deploy | [[deploymentId]] (بيظهر [[?dpl=]] على الملفات) |
| Nginx بيأخر الـ streaming | [[X-Accel-Buffering: no]] |
| [[Failed to find Server Action]] بين builds | [[NEXT_SERVER_ACTIONS_ENCRYPTION_KEY]] واحد في كل build |
| كل نسخة ليها كاش | cache handler مشترك، أو نسخة واحدة |`,
          lines: [
            "النوع.",
            "الإعدادات.",
            R`image صغيرة لـ Docker (تاب «Docker»).`,
            "id لكل deploy (هنا الـ git commit). المتصفح اللي معاه نسخة قديمة بيعمل reload كامل بدل ما يطلب ملفات مبقتش موجودة.",
            "headers لكل الردود.",
            R`قول لـ Nginx ميعملش buffer، فالـ streaming و Suspense يوصلوا على دفعات.`,
            "قفلة.",
            "قفلة.",
            "تصدير.",
            "اعمل مفتاح مرة واحدة واحفظه في secrets الـ CI. متعملش واحد جديد مع كل build.",
            "البناء بنفس المفتاح في كل مرة، فكل النسخ وكل الـ builds يفهموا الـ actions بتاعة بعض."
          ],
          sol: R`شغّلت نسختين [[standalone]] على 3001 و 3002، وصفحة فيها [[revalidate = 3600]] ووقت الرسم. الاتنين في الأول نفس الوقت (وقت الـ build). بعد [[revalidatePath("/isr")]] من route على 3001: الـ 3001 بقت بوقت جديد، والـ 3002 لسه بالقديم، مع إن الاتنين شغالين من نفس الفولدر، لأن كل نسخة معاها كاش في الذاكرة. وده اللي الزوار هيشوفوه ورا load balancer: جزء من الطلبات قديم.

وتجربة Nginx (و [[proxy_buffering]] على الافتراضي on) مع صفحة فيها Suspense بياخد ٣ ثواني: مع [[X-Accel-Buffering: no]] الـ shell كله (6740 byte) وصل في 21ms. ومن غيره وصل أول 3438 byte بس، وباقي الـ shell (فيه scripts الصفحة) استنى مع الجزء البطيء لحد الثانية التالتة، فالصفحة مبقتش تفاعلية غير بعدها. لو النسختين بيعرضوا نفس الوقت الجديد: غالبًا بتضرب نفس البورت مرتين.`,
          solCode: R`npm run build
cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/
cd .next/standalone
# api/revalidate: route.ts بـ POST بينادي revalidatePath("/isr")
PORT=3001 node server.js &
PORT=3002 node server.js &
curl -s -X POST localhost:3001/api/revalidate
curl -s localhost:3001/isr | grep -o '<p id="t">[^<]*'
curl -s localhost:3002/isr | grep -o '<p id="t">[^<]*'`
        },
        {
          cmd: "next upgrade",
          title: "ترقّي Next من غير ما تكسر المشروع، وليه التحديث الأمني مش اختياري",
          desc: R`[[npx @next/codemod@canary upgrade latest]] بيرقّي Next و React ويشغّل الـ codemods اللي بتعدّل الكود لوحدها (async params لو جاي من 14، و middleware لـ proxy، وغيرهم). بعدها [[npm run build]] واقرا كل تحذير، واختبر الصفحات المهمة.

وخليك على آخر patch من النسخة اللي انت عليها. في مارس ٢٠٢٥ ثغرة في الـ middleware (CVE-2025-29927) خلّت الحماية اللي فيه تتخطى بـ header، وفي ديسمبر ٢٠٢٥ ثغرة React2Shell (CVE-2025-55182) في Server Components سمحت بتنفيذ كود على السيرفر من غير login، وأثرت على Next 15 و 16. والحل في الاتنين كان تحديث.`,
          example: R`npx next info
npm outdated next react react-dom
npx @next/codemod@canary upgrade latest
npx @next/codemod@canary middleware-to-proxy .
npx next typegen
npm run build
npm audit --omit=dev`,
          try: R`على branch جديد، رقّي مشروع قديم (Next 14 أو 15) بالأمر التالت، واقرا الـ diff اللي الـ codemods عملته قبل ما تعمل commit. دوّر على [[@next-codemod-error]]: ده معناه إن الـ codemod ملقاش طريقة يحوّل الكود ومحتاج تعدّله بإيدك.`,
          deep: {
            why: R`كل major في Next بيغيّر حاجات أساسية: 15 خلّى params و cookies async وقفل الكاش الافتراضي، و 16 غيّر اسم الـ middleware وشال [[next lint]] و AMP والوصول الـ sync للـ params. لو فضلت متأخر نسختين، الترقية بتبقى مشروع لوحدها. والأسوأ: الثغرات بتتصلح في النسخ المدعومة بس.`,
            how: R`[[@next/codemod]] بيقرا الكود ويعدّله بالـ AST: يحط [[await]] قبل [[params]] و [[cookies()]]، ويغيّر imports اتنقلت، ويغيّر أسماء config. واللي مش قادر يحوّله أوتوماتيك بيعلّم عليه بتعليق [[@next-codemod-error]] أو نوع [[UnsafeUnwrapped...]] عشان تعدّله بإيدك.

أهم تغييرات Next 16: Turbopack افتراضي، و [[proxy.ts]]، و Cache Components (اختياري)، و [[revalidateTag]] بـ profile، و [[default.tsx]] إجباري للـ parallel routes، و [[next lint]] اتشال، وتغييرات في defaults الصور، و Node 20.9 على الأقل، و React 19.2.

الترتيب الآمن: branch، وترقية، وقراية الـ diff، و build، واختبار الـ flows المهمة (login، ودفع، وفورم)، ولو فيه E2E tests (Playwright) شغّلها، وبعدين staging، وبعدين الإنتاج.

والأمان: تابع الـ security advisories على GitHub بتاع Next و React، وفعّل Dependabot. ثغرة React2Shell كانت خطيرة لدرجة إن أي تطبيق App Router كان معرّض حتى لو مش كاتب Server Actions، والحل كان التحديث لآخر patch فورًا.`,
            when: "الـ patches (زي 16.2.x) فورًا وخصوصًا الأمنية. الـ minor (16.x) كل شهر أو اتنين. والـ major بعد ما يطلع بشهر أو اتنين والمكتبات اللي بتستخدمها (next-intl والـ auth) تدعمه.",
            mistakes: R`[[npm i next@latest]] بس من غير codemods ومن غير ما تقرا دليل الترقية. وتفضل على Next 13 سنتين «عشان شغال». وتعمل ترقية major يوم خميس قبل إطلاق. وتتجاهل التحذيرات في الـ build لحد ما تبقى أخطاء في النسخة الجاية.`
          },
          teach: R`## الفكرة: اعرف انت فين، رقّي، وبعدين خلي الـ build والـ audit يقولولك إيه اتكسر

المثال ٧ أوامر بالترتيب: ٢ بيوروك الحالة، و ٣ بيغيّروا، و ٢ بيتأكدوا. اتشغّلوا كلهم في Git Bash على ويندوز: على مشروع Next 16.4، وعلى مشروع Next 15.5 عملناه بـ [[create-next-app@15]] وحطينا فيه [[middleware.ts]] وصفحة بتقرا [[params]] من غير await و helper اسمه [[getTheme()]] بينادي [[cookies()]] من غير await (زي ما كان مسموح زمان).

---

## ١. [[npx next info]]: انت فين؟

~~~text الناتج (مشروع 16.4)
Operating System:
  Platform: win32
  Arch: x64
  Version: Windows 11 Home Single Language
Binaries:
  Node: 24.19.0
  npm: 11.17.0
Relevant Packages:
  next: 16.4.0 // Latest available version is detected (16.4.0).
  react: 19.3.0
  react-dom: 19.3.0
  typescript: 5.9.3
Next.js Config:
  output: N/A
~~~

- [[npx]]: شغّل أمر من باكدج موجود في المشروع (أو نزّله مؤقتًا).
- النسخ كلها في مكان واحد، وجنب [[next]] بيقولك لو فيه أحدث. ده اللي بتلزقه في أي issue على GitHub.

---

## ٢. [[npm outdated next react react-dom]]: فيه إيه أحدث؟

على مشروع 15.5 (مختصر):

~~~text الناتج
Package    Current   Wanted  Latest  Location                Depended by
next       15.5.27  15.5.27  16.4.0  node_modules/next       old15
react       19.1.0   19.1.0  19.3.0  node_modules/react      old15
react-dom   19.1.0   19.1.0  19.3.0  node_modules/react-dom  old15
~~~

| العمود | معناه |
|---|---|
| Current | المتسطب دلوقتي |
| Wanted | أحدث نسخة مسموح بيها حسب [[package.json]]. create-next-app كاتب النسخة بالظبط ([["next": "15.5.27"]])، فـ Wanted = Current |
| Latest | أحدث نسخة منشورة |

وعلى مشروع 16.4 الأمر مطبعش حاجة: كله على الأحدث.

---

## ٣. [[npx @next/codemod@canary upgrade latest]]: الترقية

- [[@next/codemod]]: باكدج من Next بيعدّل الكود بنفسه. **codemod** = code modification: برنامج بيقرا الكود كشجرة (AST) ويغيّره، مش بحث واستبدال.
- [[@canary]]: آخر نسخة من الباكدج، عشان يعرف آخر تغييرات.
- [[upgrade latest]]: رقّي لأحدث نسخة. (ممكن [[patch]] أو [[minor]] أو [[major]] أو رقم بعينه.)

في ترمنال عادي بيسألك قبل كل codemod. ولو مفيش ترمنال تفاعلي (CI أو agent) بيوافق على الافتراضي لوحده، وده اللي حصل عندنا:

~~~text الناتج (مختصر)
Running in non-interactive mode. Every prompt will accept its default.
Detected installed versions:
- React: v19.1.0
- Next.js: v15.5.27
Applying all codemods recommended for your upgrade:
  - middleware-to-proxy
  - remove-unstable-prefix
  - remove-experimental-ppr
  - cache-components-instant-false
  - remove-partial-prefetch
Upgrading your project to Next.js 16.4.0...
✔ Codemods have been applied successfully.
~~~

### الـ diff

- [[package.json]]: [[next]] بقى [[16.4.0]] و [[react]] و [[react-dom]] بقوا [[19.3.0]].
- [[middleware.ts]] اتمسح وطلع مكانه [[proxy.ts]]، والدالة اسمها [[proxy]] بدل [[middleware]].
- وفوق كل صفحة و layout اتحط ده:

~~~text app/page.tsx (بعد الـ codemod)
// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
export const instant = false;
~~~

وعملنا build:

~~~text الناتج
Error: Route segment config "instant" requires $__btnextConfig.cacheComponents$__bt to be enabled.
~~~

الـ codemods اللي اسمها adoption بتجهّز المشروع لميزة اختيارية (Cache Components)، بس الميزة نفسها مش متفعلة، فالـ build وقع. أعدنا التجربة من الأول بـ [[--skip-adoption]] (بيشيل الـ codemods الاختيارية)، فاتعمل أول ٣ بس والـ build عدّى المرحلة دي. وده بالظبط ليه بتعمل الترقية على branch وتقرا الـ diff قبل الـ commit.

### اللي متغيرش: الـ sync APIs

[[params]] و [[cookies()]] من غير await فضلوا زي ما هم، والـ build وقع على الأنواع:

~~~text الناتج
lib/theme.ts(3,20): error TS2339: Property 'get' does not exist on type 'Promise<ReadonlyRequestCookies>'.
~~~

اقرا الرسالة: [[cookies()]] بترجّع Promise، والـ Promise ملوش [[.get]]. الـ codemod اللي بيصلح ده اسمه [[next-async-request-api]]، وده جزء من الترقية من 14 لـ 15. فلو جاي من 15 والكود لسه فيه sync APIs (كانت شغالة بتحذير)، شغّله لوحده:

~~~bash
npx @next/codemod@canary next-async-request-api .
~~~

[[.]] يعني الفولدر الحالي. والـ diff:

~~~text app/products/[id]/page.tsx
- export default function Page({ params }: { params: { id: string } }) {
+ export default async function Page(props: { params: Promise<{ id: string }> }) {
+   const params = await props.params;
~~~

الصفحة بقت [[async]]، و [[params]] بقى Promise بيتعمله [[await]] في أول سطر.

و [[getTheme()]] دالة عادية مش كومبوننت، فالـ codemod مقدرش يخليها async (لأن كل اللي بيناديها لازم يتغير كمان):

~~~text lib/theme.ts
return (/* @next-codemod-error Await this API and update its callers; remove the temporary UnsafeUnwrappedCookies cast after repairing the migration. */
cookies() as unknown as UnsafeUnwrappedCookies).get("theme")?.value ?? "light";
~~~

[[as unknown as X]] معناها «يا TypeScript، اعتبر القيمة دي من نوع X وخلاص». وفي Next 16 النوع ده نفسه اتشال:

~~~text الناتج (next build)
lib/theme.ts(1,24): error TS2305: Module '"next/headers"' has no exported member 'UnsafeUnwrappedCookies'.
~~~

يعني لازم تصلحها بإيدك: [[getTheme]] تبقى async و [[return (await cookies()).get(...)]]، وكل اللي بيناديها يعمل [[await]]. والـ solCode بيلاقي كل الأماكن دي:

~~~bash
grep -rn "@next-codemod-error\|UnsafeUnwrapped" src app lib --include=*.ts --include=*.tsx
~~~

[[-r]] جوه الفولدرات، و [[-n]] رقم السطر، و [[--include]] أنواع الملفات بس. والمشروع ده مفيهوش [[src]] فطلع [[grep: src: No such file or directory]] وكمّل الباقي عادي:

~~~text الناتج (مختصر)
app/settings-page-helper.tsx:3:  const theme = (/* @next-codemod-error Await this API ...
lib/theme.ts:1:import { cookies, type UnsafeUnwrappedCookies } from "next/headers";
lib/theme.ts:3:  return (/* @next-codemod-error Await this API ...
~~~

---

## ٤. [[npx @next/codemod@canary middleware-to-proxy .]]

نفس اللي [[upgrade]] عمله فوق، لوحده: [[middleware.ts]] لـ [[proxy.ts]]، و [[export function middleware]] لـ [[export function proxy]]. مفيد لو رقّيت الباكدجات بإيدك.

---

## ٥. [[npx next typegen]]

~~~text الناتج
Generating route types...
✓ Types generated successfully
~~~

بيولّد أنواع [[PageProps]] و [[LayoutProps]] و [[RouteContext]] من شكل الفولدرات، من غير ما تشغّل dev أو build. مفيد في CI قبل [[tsc]].

---

## ٦. [[npm run build]]

هنا كل اللي فات بيبان: أخطاء الأنواع، والـ config اللي اتشالت، والتحذيرات. اقراها كلها حتى اللي بتعدّي، لأن تحذير النهارده error في النسخة الجاية.

---

## ٧. [[npm audit --omit=dev]]

[[--omit=dev]]: افحص باكدجات الإنتاج بس، من غير devDependencies. على مشروع 15.5.27 قبل الترقية:

~~~text الناتج (مختصر)
postcss  <=8.5.22
Severity: high
PostCSS has XSS via Unescaped </style> in its CSS Stringify Output - https://github.com/advisories/GHSA-qx2v-qp2m-jg93
fix available via $__btnpm audit fix --force$__bt
Will install next@16.4.0, which is a breaking change
node_modules/postcss
  next  9.3.4-canary.0 - 16.3.0-preview.10
  Depends on vulnerable versions of postcss

2 vulnerabilities (1 moderate, 1 high)
~~~

الثغرة في [[postcss]] اللي جوه [[next]]، والحل الوحيد اللي npm لقاه ترقية major. وبعد الترقية لـ 16.4:

~~~text الناتج
found 0 vulnerabilities
~~~

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[npx next info]] | النسخ الحالية والنظام |
| [[npm outdated ...]] | الحالي والمسموح والأحدث |
| [[npx @next/codemod@canary upgrade latest]] | يرقّي ويشغّل الـ codemods. اقرا الـ diff، و [[--skip-adoption]] لو مش عايز الميزات الاختيارية |
| [[next-async-request-api]] | يحوّل [[params]] و [[cookies()]] لـ await (ترقية 15) |
| [[@next-codemod-error]] | مكان الـ codemod سابه ليك. دوّر عليه بـ grep |
| [[npx next typegen]] | أنواع الـ routes |
| [[npm run build]] و [[npm audit --omit=dev]] | يتأكدوا إن كله تمام ومفيش ثغرات معروفة |`,
          lines: [
            "نسخ Next و React و Node الحالية.",
            "النسخة الحالية، والأحدث المسموح بيها، والأحدث خالص.",
            "الترقية: بيحدّث الباكدجات ويسألك على الـ codemods اللي تشغّلها.",
            R`لو جاي من Next 15: [[middleware.ts]] لـ [[proxy.ts]] والدالة لـ [[proxy]].`,
            R`ولّد أنواع [[PageProps]] و [[LayoutProps]] و [[RouteContext]] من غير ما تشغّل dev.`,
            R`ابني. أخطاء TS في [[params]] أو [[cookies()]] من غير await هتطلع هنا.`,
            R`دوّر على ثغرات معروفة في باكدجات الإنتاج (تفاصيل npm audit في تاب «Node و npm»).`
          ],
          sol: R`جربناها على مشروع Next 15.5 فيه [[middleware.ts]]، وصفحة بتقرا [[params]] من غير await، و [[getTheme()]] helper بينادي [[cookies()]] من غير await. الـ diff بعد [[upgrade latest]]: [[package.json]] فيه [[next 16.4.0]] و [[react 19.3.0]]، و [[middleware.ts]] بقى [[proxy.ts]] والدالة اسمها [[proxy]]. وكمان حط [[export const instant = false;]] في كل صفحة و layout (codemods «adoption» لـ Cache Components)، والـ build وقع بـ [[Route segment config "instant" requires $__btnextConfig.cacheComponents$__bt to be enabled.]] لأن cacheComponents مش متفعل. بـ [[--skip-adoption]] الحتة دي مبتحصلش. عشان كده اقرا الـ diff.

الـ [[params]] و [[cookies()]] الـ sync: الترقية من 15 مبتلمسهمش (ده codemod الترقية من 14 لـ 15، اسمه [[next-async-request-api]])، والـ build بيقع بـ [[Property 'get' does not exist on type 'Promise<ReadonlyRequestCookies>']]. لما شغّلناه لوحده: [[function Page({ params }: { params: { id: string } })]] بقت [[async function Page(props: { params: Promise<{ id: string }> })]] وتحتها [[const params = await props.params]].

و [[@next-codemod-error]] بيظهر في الأماكن اللي الـ codemod مقدرش يخليها async لوحده، زي [[getTheme()]]: لف النداء بـ [[cookies() as unknown as UnsafeUnwrappedCookies]] وحط تعليق [[@next-codemod-error Await this API and update its callers; remove the temporary UnsafeUnwrappedCookies cast after repairing the migration.]] وفي Next 16 النوع ده مبقاش موجود، فالـ build بيقع: [[Module '"next/headers"' has no exported member 'UnsafeUnwrappedCookies'.]] الحل بإيدك: خلي [[getTheme]] async واعمل await في كل مكان بيناديها، وامسح الـ cast. والأمر اللي تحت بيلاقيهم كلهم قبل الـ merge.`,
          solCode: R`grep -rn "@next-codemod-error\|UnsafeUnwrapped" src app lib --include=*.ts --include=*.tsx`
        }
      ]
    }
]);
