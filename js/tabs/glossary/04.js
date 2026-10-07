// تكملة تاب glossary: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/glossary/01.js (شرح حقول الدرس في أوله)
MORE("glossary", [
    {
      t: "Docker والنشر",
      l: 1,
      items: [
        {
          cmd: "bind mount",
          title: "فولدر من جهازك جوه الـ container",
          desc: "بدل volume يديره Docker، بتربط فولدر أو ملف حقيقي من جهازك بمسار جوه الـ container. أي تعديل من ناحية بيظهر في التانية فورًا، وده أساس الـ hot reload في التطوير. [[:ro]] بيخليه قراية بس.",
          teach: R`## الفكرة

بتقول لـ Docker: الفولدر ده من جهازي يظهر جوه الـ container على المسار ده. مش نسخة، ده نفس الفولدر: تعدّل ملف في VS Code والـ container يشوفه في نفس اللحظة.

## المثال

~~~bash
docker run --rm -v $(pwd):/app -w /app node:22-alpine ls
~~~

| الحتة | معناها |
|---|---|
| [[--rm]] | امسح الـ container لما يخلص |
| [[-v $(pwd):/app]] | [[$(pwd)]] الفولدر الحالي على جهازك، يتركّب على [[/app]] جوه |
| [[-w /app]] | (workdir) ابدأ في [[/app]] |
| [[node:22-alpine]] | الـ image |
| [[ls]] | الأمر اللي يتنفذ جوه |

جرّبناه من فولدر فيه ملفين (Docker على ويندوز):

~~~text الناتج
index.js
package.json
~~~

دي ملفات جهازك، والـ container شايفها. و [[-v $(pwd):/app:ro]] بيخليها قراية بس جوه. وفي PowerShell اكتب [[$__{PWD}]] بدل [[$(pwd)]].

> الخلاصة: bind mount للكود وقت التطوير، و volume للبيانات اللي Docker يديرها.`,
          example: "docker run --rm -v $(pwd):/app -w /app node:22-alpine ls",
          try: "Docker المستوى ٢: [[bind mount]]"
        },
        {
          cmd: "healthcheck",
          title: "هل التطبيق بيرد فعلًا",
          desc: "أمر Docker بيشغّله كل شوية جوه الـ container (curl على [[/health]] أو [[pg_isready]]). العملية ممكن تبقى موجودة والتطبيق مش بيرد، والـ healthcheck بيفرّق. وفي compose، [[condition: service_healthy]] بيخلي الباك إند يستنى القاعدة لحد ما تصحى.",
          teach: R`## الفكرة

[[docker ps]] بيقول [[Up]] طالما العملية موجودة، حتى لو التطبيق معلّق أو القاعدة لسه بتجهز. الـ healthcheck أمر Docker بيشغّله كل فترة جوه الـ container، ولو نجح الحالة [[healthy]]، ولو فشل كذا مرة ورا بعض [[unhealthy]].

~~~text في compose
healthcheck:
  test: ["CMD", "pg_isready", "-U", "postgres"]
  interval: 5s
~~~

## المثال

~~~bash
docker inspect --format '{{.State.Health.Status}}' myapp
~~~

- [[docker inspect]] كل تفاصيل الـ container كـ JSON.
- [[--format '{{.State.Health.Status}}']] هات منها خانة واحدة: حالة الصحة.

جرّبناه على Postgres بـ healthcheck [[pg_isready]] كل ثانيتين:

~~~text أول ما اشتغل
starting
~~~

~~~text بعد ٨ ثواني
healthy
~~~

[[starting]] يعني لسه في فترة البداية. ولو الـ container مفيهوش healthcheck أصلًا، الأمر بيفشل بـ [[map has no entry for key "Health"]].

> الخلاصة: [[depends_on]] مع [[condition: service_healthy]] بيخلي التطبيق يستنى القاعدة لحد ما تبقى [[healthy]] فعلًا.`,
          example: R`docker inspect --format '{{.State.Health.Status}}' myapp`,
          try: "Docker المستوى ٢: [[USER و HEALTHCHECK]]"
        },
        {
          cmd: "build arg / build secret",
          title: "قيم وقت البناء",
          desc: "[[--build-arg]] قيمة بتوصل للـ Dockerfile وقت الـ build، ومش سر: بتفضل مكتوبة في الـ image وتتقري بـ [[docker history]]. الـ build secret ([[RUN --mount=type=secret]]) بيتركّب كملف في خطوة واحدة ومبيتحفظش في أي طبقة. وأسرار التطبيق وهو شغال مكانها وقت التشغيل أصلًا.",
          teach: R`## الفرق

| | [[--build-arg]] | build secret |
|---|---|---|
| بيوصل للـ Dockerfile بـ | [[ARG NAME]] | [[RUN --mount=type=secret,id=NAME]] |
| بيتحفظ في الـ image؟ | أيوه، في التاريخ | لأ، ملف مؤقت في خطوة واحدة |
| ينفع لـ | نسخة Node، اسم بيئة | توكن npm خاص، مفتاح |

## المثال

~~~bash
docker history --no-trunc myapp | grep -i token
~~~

- [[docker history]] كل طبقة في الـ image والأمر اللي عملها، و [[--no-trunc]] من غير قص.
- [[grep -i token]] أي سطر فيه token.

بنينا image بـ [[ARG NPM_TOKEN]] و [[--build-arg NPM_TOKEN=abc123]]، والـ RUN بيمسح الملف اللي فيه التوكن في نفس الخطوة:

~~~text الناتج (مقصوص)
<id>   1 second ago   RUN |1 NPM_TOKEN=abc123 /bin/sh -c echo "token=$NPM_TOKEN" > /tmp/npmrc && rm /tmp/npmrc # buildkit
<missing>             ARG NPM_TOKEN=abc123
~~~

التوكن ظاهر بقيمته، مع إن الملف اتمسح. أي حد معاه الـ image يقراه.

> الخلاصة: الأسرار وقت البناء بـ [[--secret]]، ووقت التشغيل متغيرات بيئة، و [[--build-arg]] لحاجات مش سرية بس.`,
          example: "docker history --no-trunc myapp | grep -i token",
          try: "Docker المستوى ٢: [[أسرار وقت الـ build]]"
        },
        {
          cmd: "multi-stage build",
          title: "بناء على مرحلتين",
          desc: "Dockerfile فيه أكتر من [[FROM]]: مرحلة فيها أدوات البناء كلها (TypeScript و devDependencies)، ومرحلة أخيرة نضيفة بتنسخ الناتج بس بـ [[COPY --from=build]]. الـ image النهائية أصغر بكتير ومفيهاش أدوات ملهاش لازمة.",
          teach: R`## الفكرة

البناء محتاج حاجات كتير (TypeScript، devDependencies، compiler) التطبيق مش محتاجها وهو شغال. فبتقسم الـ Dockerfile مرحلتين:

~~~text
FROM node:22 AS build          ← مرحلة ١: فيها كل أدوات البناء
RUN npm ci && npm run build

FROM node:22-alpine            ← مرحلة ٢: نضيفة
COPY --from=build /app/dist ./dist   ← خد الناتج بس
~~~

الـ image النهائية هي آخر [[FROM]] بس، والمرحلة الأولى بتترمي.

## المثال: [[grep -n '^FROM' Dockerfile]]

- [[-n]] اطبع رقم السطر.
- [[^FROM]] السطور اللي **بتبدأ** بـ FROM.

جرّبناه على Dockerfile من مرحلتين:

~~~text الناتج
1:FROM alpine:latest AS build
5:FROM alpine:latest
~~~

سطرين = مرحلتين. و [[AS build]] الاسم اللي [[COPY --from=build]] بيشاور عليه.

> الخلاصة: لو فيه [[FROM]] واحد بس وفيه devDependencies، الـ image أكبر من اللازم.`,
          example: "grep -n '^FROM' Dockerfile",
          try: "Docker المستوى ٢: [[multi-stage]]"
        },
        {
          cmd: "smoke test",
          title: "فحص سريع بعد الرفع",
          desc: "مش اختبار كامل: لوب curl على أهم الصفحات بعد كل deploy يتأكد إنها بترد بالكود الصح. في ثواني تعرف لو حاجة بقت 500. وصفحة مش موجودة لازم ترجع 404 مش 200.",
          teach: R`## الفكرة

بعد الـ deploy على طول، تتأكد إن أهم الصفحات بترد بالرقم الصح. مش بيختبر المنطق، بس بيمسك «الموقع كله بقى 500» في ثواني.

## المثال

~~~bash
curl -s -o /dev/null -w "%{http_code}\n" https://example.com/api/health
~~~

- [[-o /dev/null]] ارمي الـ body، و [[-s]] من غير شريط.
- [[-w "%{http_code}\n"]] اطبع رقم الحالة بس.

~~~text الناتج (Git Bash على ويندوز)
404
~~~

[[example.com]] مفيهوش [[/api/health]]، فرجّع 404، وده بالظبط اللي الـ smoke test معمول يمسكه: لو كان المفروض 200 يبقى الـ deploy فيه مشكلة.

وفي سكربت بتلف على لستة:

~~~text
/            ← لازم 200
/api/health  ← لازم 200
/nope        ← لازم 404 (لو 200 يبقى كل المسارات بترجع الصفحة الرئيسية)
~~~

> الخلاصة: smoke test = curl على كام URL بعد كل deploy، وأي رقم غير المتوقع يوقف أو يرجّع.`,
          example: R`curl -s -o /dev/null -w "%{http_code}\n" https://example.com/api/health`,
          try: "التشخيص: [[smoke test]]"
        },
        {
          cmd: "ACME / webroot challenge",
          title: "إثبات إن الدومين بتاعك",
          desc: "قبل ما Let's Encrypt تديك شهادة، بتتأكد إنك متحكم في الدومين. بطريقة webroot، certbot بيحط ملف في [[/.well-known/acme-challenge/]] وهي بتطلبه على بورت 80. لو Nginx حوّل المسار ده لـ https أو رجّع 404، الشهادة أو التجديد بيفشل.",
          teach: R`## إزاي Let's Encrypt بتتأكد

ACME هو البروتوكول اللي certbot بيكلّم بيه Let's Encrypt. بطريقة webroot:

1. certbot بيكتب ملف فيه كود عشوائي في [[<webroot>/.well-known/acme-challenge/<اسم>]].
2. Let's Encrypt بتطلب [[http://دومينك/.well-known/acme-challenge/<اسم>]] على بورت 80.
3. لو لقت نفس الكود، يبقى انت فعلًا متحكم في السيرفر اللي الدومين بيشاور عليه، وتديك الشهادة.

## المثال

~~~bash
curl -sI http://example.com/.well-known/acme-challenge/test | head -1
~~~

بتعمل نفس طلب Let's Encrypt بنفسك على ملف اسمه [[test]]:

~~~text الناتج (Git Bash على ويندوز)
HTTP/1.1 404 Not Found
~~~

404 هنا طبيعي لأن مفيش ملف [[test]] فعلًا. على سيرفرك: حط ملف تجربة في الفولدر ده وجرّب، ولازم يطلع 200. لو طلع [[301]] لـ https أو 404 على ملف موجود، يبقى Nginx مش بيخدم المسار ده صح والتجديد هيفشل.

> الخلاصة: [[/.well-known/acme-challenge/]] لازم يتخدم على HTTP من فولدر الـ webroot من غير تحويل.`,
          example: "curl -sI http://example.com/.well-known/acme-challenge/test | head -1",
          try: "Nginx المستوى ٣: [[acme-challenge]]"
        },
        {
          cmd: "shared hosting / .htaccess",
          title: "استضافة مشتركة",
          desc: "سيرفر عليه مواقع كتير لناس كتير، وانت ليك فولدر بس: مفيش sudo ولا Docker، وغالبًا Apache و PHP. [[.htaccess]] ملف في فولدرك هو المكان الوحيد اللي تتحكم منه في السيرفر: تحويلات، ومنع ملفات، وحماية فولدرات.",
          teach: R`## الفكرة

| | shared hosting | VPS |
|---|---|---|
| السيرفر | مشترك مع مواقع تانية | ليك لوحدك (افتراضي) |
| صلاحياتك | فولدرك بس | root |
| تقدر تسطّب | اللي الشركة مسطّباه (غالبًا Apache و PHP و MySQL) | أي حاجة |

ومفيش [[sudo]] ولا وصول لإعدادات Apache، فالمكان الوحيد اللي تتحكم منه ملف [[.htaccess]] في فولدرك، و Apache بيقراه مع كل طلب:

~~~text .htaccess
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
~~~

السطور دي بتحوّل أي طلب HTTP لـ HTTPS: [[RewriteCond]] الشرط (HTTPS مقفول)، و [[RewriteRule]] التحويل، و [[R=301]] تحويل دايم، و [[L]] آخر قاعدة.

## المثال: [[ssh shared 'head public_html/.htaccess']]

[[ssh shared]] بيدخل على السيرفر (اسمه في [[~/.ssh/config]])، والأمر اللي بين [[' ']] بيتنفذ هناك: أول ١٠ سطور من الملف. محتاج حساب استضافة، فمش متجرّب هنا. والمثال اللي فوق من docs بتاعة Apache.

> الخلاصة: في الاستضافة المشتركة [[.htaccess]] هو بديل إعدادات السيرفر كلها.`,
          example: "ssh shared 'head public_html/.htaccess'",
          try: "VPS المستوى ٣: [[.htaccess]]"
        }
      ]
    },
    {
      t: "الأدوات والمحرر",
      l: 1,
      items: [
        {
          cmd: "lint / linter",
          title: "مدوّر الغلط",
          desc: "أداة بتقرا الكود من غير ما تشغّله وتطلّع مشاكل: متغير مش مستخدم، أو [[await]] ناقصة، أو مقارنة غلط. ESLint لـ JS و TS، و ruff لـ Python. [[--fix]] بيصلّح اللي يتصلّح لوحده.",
          teach: R`## الفكرة

الـ linter بيقرا الكود (من غير ما يشغّله) ويطابقه على قواعد: متغير اتعمل ومحدش استخدمه، [[==]] بدل [[===]]، [[await]] ناقصة. كل قاعدة ليها مستوى: [[error]] أو [[warn]].

## المثال: [[npx eslint . --max-warnings=0]]

- [[npx eslint]] شغّل ESLint من المشروع.
- [[.]] كل الملفات في الفولدر.
- [[--max-warnings=0]] اعتبر أي warning فشل.

جرّبناه على ملف فيه متغير مش مستخدم، والقاعدة دي [[warn]] (ESLint 10 على ويندوز):

~~~text الناتج
C:\Users\ali\proj\src\app.js
  1:7  warning  'unused' is assigned a value but never used  no-unused-vars

✖ 1 problem (0 errors, 1 warning)

ESLint found too many warnings (maximum: 0).
~~~

- [[1:7]] السطر 1، العمود 7، و [[no-unused-vars]] اسم القاعدة.
- من غير [[--max-warnings=0]] نفس الـ warning طلع بس الـ exit code كان [[0]]. معاه بقى [[1]]، فـ CI يفشل.

> الخلاصة: في CI استخدم [[--max-warnings=0]]، وإلا الـ warnings بتتراكم ومحدش بيقراها.`,
          example: "npx eslint . --max-warnings=0",
          try: "فحص الكود المستوى ١: [[eslint]]"
        },
        {
          cmd: "formatter",
          title: "منسّق الشكل",
          desc: "أداة بتعيد كتابة الكود بشكل واحد: مسافات، وعلامات تنصيص، وطول السطر. مبتدوّرش على bugs زي الـ linter، بتوحّد الشكل بس، فمحدش يتناقش عليه والـ diff يفضل نضيف. Prettier أشهرها.",
          teach: R`## الفرق عن الـ linter

| | linter | formatter |
|---|---|---|
| بيدوّر على | غلطات محتملة | شكل بس |
| مثال | متغير مش مستخدم | [[;]] ناقصة، [[']] بدل [["]] |
| بيغيّر معنى الكود؟ | ممكن بـ [[--fix]] | لأ أبدًا |

## المثال: [[npx prettier --check .]]

- [[--check]] متغيّرش حاجة، قولي بس مين مش متنسّق (و [[--write]] يصلّح).
- [[.]] كل الملفات.

جرّبناه على ملف ناقصه [[;]] ومكتوب بـ [[' ']] (Prettier 3 على ويندوز):

~~~text الناتج
Checking formatting...
[warn] src/app.js
[warn] Code style issues found in the above file. Run Prettier with --write to fix.
~~~

والـ exit code [[1]]، فـ CI يقف. وده اللي Prettier كان هيكتبه:

~~~text npx prettier src/app.js
const unused = 5;
let total = 0;
if (total == "0") console.log("zero");
~~~

ضاف [[;]] وبدّل [[']] بـ [["]]، ومقربش من [[==]]: دي شغلة الـ linter.

> الخلاصة: formatter عند الحفظ، و [[--check]] في CI، ومحدش يتناقش في الشكل تاني.`,
          example: "npx prettier --check .",
          try: "فحص الكود المستوى ١: [[prettier]]"
        },
        {
          cmd: "typecheck",
          title: "فحص الأنواع",
          desc: "TypeScript بيتأكد إن كل قيمة رايحة للمكان الصح بالنوع الصح، من غير ما يشغّل حاجة. Vite و tsx بيشيلوا الأنواع ويشغّلوا على طول، فالمشروع ممكن يشتغل وهو مليان أخطاء. [[tsc --noEmit]] هو الفحص الحقيقي.",
          teach: R`## الفكرة

TypeScript بيقرا الأنواع اللي كتبتها ويتأكد إنها ماشية مع بعض. بس أدوات زي Vite و tsx بتشيل الأنواع وتشغّل على طول من غير ما تفحص، فالمشروع بيشتغل وفيه أخطاء أنواع.

## المثال: [[npx tsc --noEmit]]

- [[tsc]] الـ TypeScript compiler، بيقرا [[tsconfig.json]].
- [[--noEmit]] افحص بس، متكتبش ملفات JavaScript.

جرّبناه على الملف ده:

~~~text src/math.ts
function add(a: number, b: number): number {
  return a + b;
}
add(1, "2");
~~~

~~~text الناتج (TypeScript 7.0.2 على ويندوز)
src/math.ts(4,8): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
~~~

- [[(4,8)]] السطر 4، العمود 8: مكان [["2"]].
- [[TS2345]] رقم الخطأ، ينفع تدوّر بيه.
- والـ exit code [[1]]. لو مفيش أخطاء الأمر مبيطبعش حاجة خالص.

> الخلاصة: «شغال» مش معناه «سليم»: [[tsc --noEmit]] في CI هو اللي بيمسك أخطاء الأنواع.`,
          example: "npx tsc --noEmit",
          try: "فحص الكود المستوى ١: [[tsc --noEmit]]"
        },
        {
          cmd: "Git hook / pre-commit",
          title: "فحص قبل الـ commit",
          desc: "سكربت Git بيشغّله لوحده عند حدث معين: [[pre-commit]] قبل الـ commit، و [[commit-msg]] على الرسالة، و [[pre-push]] قبل الرفع. لو السكربت فشل، العملية بتترفض. husky بيخلي الـ hooks دي تتسطّب مع المشروع لكل الفريق.",
          teach: R`## الفكرة

سكربتات في [[.git/hooks/]] Git بيشغّلها لوحده عند أحداث معينة. لو السكربت خرج برقم غير 0، Git بيلغي العملية.

| الـ hook | امتى |
|---|---|
| [[pre-commit]] | قبل الـ commit (lint و format) |
| [[commit-msg]] | بعد كتابة الرسالة (commitlint) |
| [[pre-push]] | قبل الـ push (الاختبارات) |

مشكلة [[.git/hooks]] إنه مش بيتعمله commit، فـ husky بيحط الـ hooks في [[.husky/]] جوه المشروع ويخلي Git يقرا منه.

## المثال: [[cat .husky/pre-commit]]

بيطبع اللي هيتشغّل قبل كل commit. في مشروع تجربة:

~~~text الناتج
npm run lint
~~~

وجرّبنا hook بيفشل ([[exit 1]]) في ريبو تجربة:

~~~text git commit -m "feat: add a"
pre-commit: checking...
~~~

والـ commit متعملش: [[git log]] قال [[does not have any commits yet]].

> الخلاصة: hook فشل = العملية اتلغت. و [[--no-verify]] بيتخطاه، فالفحص الحقيقي لازم يتكرر في CI.`,
          example: "cat .husky/pre-commit",
          try: "فحص الكود المستوى ٢: [[.husky/pre-commit و commit-msg]]"
        },
        {
          cmd: "Conventional Commits",
          title: "صيغة رسالة الـ commit",
          desc: "اتفاق على شكل الرسالة: [[type(scope): subject]]، زي [[fix(api): handle empty cart]]. الـ type من لستة ثابتة ([[feat]] و [[fix]] و [[chore]] و [[docs]])، فالتاريخ يتقري بسهولة. commitlint بيرفض أي رسالة بره الصيغة.",
          teach: R`## الصيغة

~~~text
fix(api): handle empty cart
│   │     └── subject: إيه اللي اتعمل، قصير
│   └──────── scope (اختياري): أنهي جزء
└──────────── type: نوع التغيير
~~~

| type | امتى |
|---|---|
| [[feat]] | ميزة جديدة |
| [[fix]] | إصلاح غلطة |
| [[docs]] | توثيق بس |
| [[chore]] | صيانة: مكتبات، إعدادات |
| [[refactor]] / [[test]] / [[ci]] | إعادة كتابة / اختبارات / CI |

وأدوات بتطلّع منها رقم النسخة لوحدها: [[fix]] = patch، و [[feat]] = minor، و [[!]] بعد الـ type = major.

## المثال: [[git log --oneline -5]]

آخر ٥ commits سطر سطر. في ريبو تجربة:

~~~text الناتج
560ae02 updated stuff
1aba475 chore: bump deps
cee9caf docs: explain setup
84a5887 fix(api): handle empty cart
6c27b0b feat(api): add a.txt
~~~

الأربعة اللي تحت ماشيين على الصيغة، و [[updated stuff]] لأ، وده اللي commitlint كان هيرفضه في [[commit-msg]].

> الخلاصة: [[type(scope): subject]]، والتاريخ يتقري بنظرة.`,
          example: "git log --oneline -5",
          try: "فحص الكود المستوى ٢: [[commitlint]]"
        },
        {
          cmd: "Command Palette",
          title: "كل أوامر المحرر في خانة",
          desc: "في VS Code، Ctrl+Shift+P (أو F1) بيفتح خانة تكتب فيها جزء من اسم أي أمر وتختاره، حتى اللي ملوش زرار. وجنب كل أمر اختصاره لو ليه. لما شرح يقولك «شغّل Reload Window»، يقصد من هنا.",
          teach: R`## الفكرة

كل حاجة VS Code يقدر يعملها ليها أمر باسم، حتى اللي ملهاش زرار ولا قايمة. الـ Command Palette خانة بتدوّر فيهم بالاسم.

| الاختصار | بيفتح |
|---|---|
| Ctrl+Shift+P أو F1 | الأوامر (بيبدأ بـ [[>]]) |
| Ctrl+P | الملفات بالاسم (من غير [[>]]) |

وعلى الماك Cmd+Shift+P.

## المثال: [[Ctrl+Shift+P → Developer: Reload Window]]

1. Ctrl+Shift+P.
2. اكتب [[reload]]: البحث بيلقط أي جزء من الاسم.
3. اختار **Developer: Reload Window** و Enter.

ده بيقفل النافذة ويفتحها تاني بنفس الملفات، وبيحل حاجات كتير بعد تسطيب extension أو لما الـ TypeScript server يعلّق. والجزء اللي قبل [[:]] (Developer) هو المجموعة اللي الأمر تبعها. ده اختصار كيبورد مش أمر ترمنال، فالكلام ده من docs بتاعة VS Code.

> الخلاصة: مش لاقي إعداد أو أمر؟ Ctrl+Shift+P واكتب جزء من اسمه.`,
          example: "Ctrl+Shift+P → Developer: Reload Window",
          try: "VS Code المستوى ١: [[Ctrl+Shift+P]]"
        },
        {
          cmd: "Run (Win+R) / .msc / .cpl",
          title: "أدوات ويندوز بالاسم",
          desc: "Win+R بيفتح خانة Run: تكتب اسم أداة وتدوس Enter. الـ [[.msc]] أدوات الإدارة ([[services.msc]] للخدمات، و [[eventvwr.msc]] للوجات)، والـ [[.cpl]] صفحات لوحة التحكم القديمة ([[sysdm.cpl]] فيها متغيرات البيئة). Ctrl+Shift+Enter بدل Enter بيفتحها كأدمن.",
          teach: R`## الفكرة

Win+R بيفتح خانة **Run**: تكتب اسم برنامج أو أداة و Enter، من غير ما تدوّر في القوايم.

| تكتب | بيفتح |
|---|---|
| [[services.msc]] | الخدمات: مين شغال ومين بيبدأ مع الويندوز |
| [[eventvwr.msc]] | Event Viewer: لوجات النظام |
| [[devmgmt.msc]] | Device Manager |
| [[sysdm.cpl]] | System Properties، ومنه Advanced ثم Environment Variables |
| [[appwiz.cpl]] | البرامج المتسطّبة (Programs and Features) |

- [[.msc]] = Microsoft Management Console: أدوات الإدارة.
- [[.cpl]] = Control Panel: صفحات لوحة التحكم القديمة.

## المثال: [[Win+R → services.msc]]

Win+R، اكتب [[services.msc]]، Enter. وبدل Enter، Ctrl+Shift+Enter بيفتحها كـ Administrator (هيطلع سؤال UAC). نفس الأسامي بتشتغل لو كتبتها في PowerShell. دي اختصارات واجهة، فالجدول ده من docs بتاعة ويندوز ومش متشغّل هنا عشان مبنفتحش نوافذ على الجهاز.

> الخلاصة: اسم الأداة + Win+R أسرع من أي قايمة.`,
          example: "Win+R → services.msc",
          try: "اختصارات النظام المستوى ٢: [[Win+R]]"
        }
      ]
    },
    {
      t: "الديسكتوب والموبايل",
      l: 1,
      items: [
        {
          cmd: "main / renderer",
          title: "نصّين تطبيق Electron",
          desc: "الـ main process ملف Node واحد بيفتح النوافذ ويكلّم النظام والملفات. الـ renderer كل نافذة، وهي صفحة ويب عادية ملهاش وصول لـ Node عشان الأمان. و [[preload.js]] الجسر بينهم: بيدّي الصفحة دوال معينة بس.",
          teach: R`## الفكرة

تطبيق Electron نوعين عمليات:

| | main | renderer |
|---|---|---|
| كام واحد | واحد بس | واحد لكل نافذة |
| هو إيه | Node كامل | صفحة Chromium عادية |
| يقدر يوصل للملفات والنظام؟ | أيوه | لأ (افتراضيًا) |

و [[preload.js]] بيشتغل قبل الصفحة وبيدّيها دوال معيّنة بس بـ [[contextBridge]]، زي [[window.api.saveFile()]]، بدل ما يدّيها Node كله.

## المثال: [[npm pkg get main]]

- [[npm pkg get]] بيقرا حقل من [[package.json]].
- [[main]] الحقل اللي Electron بيبدأ منه: ملف الـ main process.

جرّبناه في مشروع تجربة:

~~~text الناتج
"main.js"
~~~

يعني [[npx electron .]] هيشغّل [[main.js]]، وهو اللي يعمل [[new BrowserWindow()]] ويحمّل الصفحة.

> الخلاصة: main = Node والنظام، و renderer = صفحة ويب، والكلام بينهم من [[preload.js]] بس.`,
          example: "npm pkg get main",
          try: "Desktop و Mobile المستوى ١: [[npx electron .]]"
        },
        {
          cmd: "keystore",
          title: "مفتاح توقيع التطبيق",
          desc: "ملف فيه المفتاح اللي بيتوقّع بيه كل إصدار من تطبيق أندرويد. أندرويد مش بيقبل تحديث إلا بنفس المفتاح، فلو ضاع مش هتقدر تحدّث التطبيق تاني، ولو اتسرب أي حد يعمل تحديث باسمك. مكانه secret، وعمره ما يتعمله commit.",
          teach: R`## الفكرة

أي APK أو AAB لازم يتوقّع بمفتاح خاص. أندرويد بيقبل تحديث للتطبيق بس لو موقّع بنفس المفتاح اللي اتوقّع بيه أول مرة. والـ keystore ملف ([[.jks]] أو [[.p12]]) بيحفظ المفتاح ده بباسورد.

| لو | النتيجة |
|---|---|
| ضاع | مش هتقدر تنزّل تحديث بنفس التطبيق (إلا لو مفعّل Play App Signing: ساعتها جوجل ماسكة مفتاح التوقيع، وتقدر تطلب منهم تغيير مفتاح الرفع) |
| اتسرّب | أي حد يقدر يعمل تحديث شكله منك |

## المثال: [[keytool -list -v -keystore release.p12]]

- [[keytool]] أداة جاية مع Java (JDK).
- [[-list]] اعرض اللي في الملف، و [[-v]] (verbose) بالتفاصيل.
- [[-keystore release.p12]] الملف.

هيسألك باسورد الـ keystore، ويطبع لكل مفتاح [[Alias name]] وتاريخ الانتهاء والبصمات ([[SHA1]] و [[SHA256]]). البصمة دي اللي بتحطها في Firebase و Google Sign-In. مفيش JDK هنا، فالكلام ده من docs بتاعة Android و Oracle.

> الخلاصة: keystore في باك أب آمن وباسورده في secret، وعمره ما يدخل Git.`,
          example: "keytool -list -v -keystore release.p12",
          try: "Desktop و Mobile المستوى ٣: [[keytool]]"
        },
        {
          cmd: "APK / AAB",
          title: "ملف تطبيق أندرويد",
          desc: "الـ APK الملف اللي بيتسطّب على الموبايل مباشرة: تبعته لحد أو تسطّبه بـ adb. الـ AAB بترفعه على Play Store بس، وهي بتطلّع منه APK مناسب لكل جهاز. الاتنين لازم يبقوا موقّعين عشان يتقبلوا.",
          teach: R`## الفرق

| | APK | AAB |
|---|---|---|
| الاسم | Android Package | Android App Bundle |
| بيتسطّب على الموبايل مباشرة؟ | أيوه | لأ |
| بترفعه فين | أي مكان، [[adb install]] | Play Store بس |
| الحجم عند المستخدم | فيه كل حاجة لكل الأجهزة | Play بيطلّع APK فيه اللي جهازه محتاجه بس |

## المثال

~~~bash
ls android/app/build/outputs/apk/debug/
~~~

ده المكان اللي [[./gradlew assembleDebug]] بيحط فيه الـ APK في مشروع أندرويد (React Native أو Capacitor):

- [[build/outputs/apk]] نواتج الـ APK، و [[debug]] النسخة الـ debug (و [[release]] جنبها).
- هتلاقي فيه [[app-debug.apk]]، و [[./gradlew bundleRelease]] بيطلّع [[.aab]] في [[outputs/bundle/release/]].

محتاج مشروع أندرويد و Android SDK، فالمسارات دي من docs بتاعة Android ومش متجرّبة هنا. والـ debug APK متوقّع بمفتاح debug أوتوماتيك، فينفع تسطّبه تجربة بس مينفعش يترفع.

> الخلاصة: APK للتجربة والتوزيع المباشر، و AAB للرفع على Play، والاتنين لازم يبقوا موقّعين.`,
          example: "ls android/app/build/outputs/apk/debug/",
          try: "Desktop و Mobile المستوى ٢: [[./gradlew assembleDebug]]"
        }
      ]
    }
]);
