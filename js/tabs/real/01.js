// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   teach    اختياري: «الشرح خطوة بخطوة»: markdown صغير (## و ### و ~~~lang عنوان ... ~~~ و جداول | و - و 1. و > و ---). القواعد في README
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
//   check    اختياري: تمرين بيتصحح لوحده في الصفحة
//            JS:  { lang: "js", starter, tests: R`test("..", () => expect(x).toBe(y))`, solution }
//            SQL: { lang: "sql", setup: R`CREATE TABLE ...; INSERT ...`, starter, expect: [[...صفوف]] أو expectSql: R`استعلام مرجعي`, solution, ordered }
//            solution حل مرجعي مش بيظهر، و npm run check بيتأكد إنه بيعدّي الاختبارات. المتاح في tests: test و expect(x).toBe/toEqual/toThrow/toBeTruthy/toBeFalsy
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("real", {
  label: "من مشاريعي",
  prompt: "deploy@vps:~$ ",
  lab: R`mkdir -p ~/lab/real && cd ~/lab/real
nano deploy.sh
bash -n deploy.sh && shellcheck deploy.sh`,
  labText: "السكربتات هنا جاية من مشاريع حقيقية، والعناوين والمفاتيح فيها وهمية. قبل ما تشغّل أي واحد: اقراه، وافحصه بـ bash -n و shellcheck، وجرّبه على سيرفر التجربة.",
  levels: {
    "1": ["على جهازك", "تشغيل المشاريع وتجهيز بيئة التطوير"],
    "2": ["النشر", "تجهيز السيرفر، والنشر، و SSL، و Nginx"],
    "3": ["التشغيل والصيانة", "باك أب، و migrations، و CI، وسكربتات الإصلاح"]
  },
  categories: [
    {
      t: "تشغيل المشروع على جهازك",
      l: 1,
      n: "من أول git init لحد ما المشروع كله شغال في Docker على ويندوز",
      items: [
        {
          cmd: "SETUP: أول يوم",
          title: "بداية أي مشروع جديد: ريبو وقاعدة بيانات",
          desc: R`السلسلة اللي بتعملها أول يوم في أي مشروع ويب فيه قاعدة بيانات: Git، وريبو private على GitHub، وربط المشروع بـ Supabase، وتطبيق الـ schema بـ migrations بدل النسخ واللصق في SQL Editor.

الفكرة إن كل خطوة تتكرر على أي جهاز أو أي بيئة بنفس الأوامر، فزميلك (أو انت بعد شهرين) يقوم المشروع من غير ما يسألك.`,
          example: R`cd myapp
git init
git add .
git commit -m "Initial project setup"
git branch -M main
git remote add origin https://github.com/you/myapp.git
git push -u origin main
# Supabase CLI من npx، مش npm install -g
npx supabase login
npx supabase init
npx supabase link --project-ref PROJECT_REF
npx supabase migration new create_courses
npx supabase db push
# آخر اليوم
git add . && git commit -m "add courses table" && git push
git tag v0.1 && git push --tags`,
          try: "في فولدر تجربة اعمل ريبو private فاضي على GitHub واربطه بالخطوات دي، وبعدين اعمل migration فيها [[create table notes (id serial primary key, body text);]] وادفعها على مشروع Supabase تجريبي مش مشروع شغل.",
          flag: "script",
          deep: {
            why: "أول يوم بيحدد شكل المشروع كله. لو الـ schema اتعمل بإيدك في SQL Editor، مفيش حد يقدر يعيده على قاعدة تانية (staging أو جهاز زميلك)، ومحدش عارف إيه اللي اتطبق وإيه لأ. الـ migrations في git بتخلي قاعدة البيانات «كود» زي باقي المشروع.",
            how: R`الجزء الأول Git عادي: [[init]] و [[add]] و [[commit]]، و [[branch -M main]] بيسمّي الفرع main، و [[push -u]] بيربط الفرع المحلي بالريموت عشان [[git push]] بعد كده يبقى من غير أسامي.

[[npx supabase]] بيشغّل الـ CLI من غير تسطيب global. [[init]] بيعمل فولدر supabase/ فيه config، و [[link]] بيربطه بمشروعك على السحابة (بيسأل على باسورد القاعدة).

[[migration new create_courses]] بيعمل ملف فاضي اسمه بيبدأ بـ timestamp زي [[supabase/migrations/20260503120000_create_courses.sql]]. تكتب فيه الـ SQL، و [[db push]] بيطبق الملفات اللي لسه متطبقتش بالترتيب، وبيسجلها في جدول جوه القاعدة عشان ميطبقهاش تاني.

ولو مش عايز الـ CLI، psql يقدر يطبّق ملف رئيسي بيستدعي الباقي: [[psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f 00_run_all.sql]] وجواه سطور [[\ir 01_extensions.sql]]. بس ده مش بيسجّل إيه اتطبق.

و [[git tag]] بيحط علامة على نقطة مهمة (نسخة خلصت) ترجعلها بعدين.`,
            when: "أي مشروع جديد فيه قاعدة بيانات. الأوامر لوحدها في تاب Git وتاب PostgreSQL (درس «Supabase CLI»).",
            mistakes: R`في مشروع حقيقي كان دليل الإعداد بيقول [[npm install -g supabase]]، ودي طريقة مش مدعومة (استخدم npx أو scoop أو brew).

وكانت ملفات الـ SQL في [[database/migrations]] بأسماء 01 و 02، و [[supabase db push]] مش بيشوفها أصلًا: لازم تبقى في [[supabase/migrations]] وأساميها timestamp.

وكان فيه ملف [[00_run_all.sql]] مكتوب إنه «للـ SQL Editor» وهو مليان [[\i]]، ودي أوامر psql بس، فبيفشل هناك. وأمر [[cat 0*.sql]] اللي بيجمّع الملفات كان بيدخّل 00_run_all نفسه في الناتج.

والـ project ref كان مكتوب في README. مش سر، بس بيكشف مشروعك لأي حد يشوف الريبو، فخليه في .env.`
          },
          teach: R`## الأول: السكربت ده ٣ مراحل

المثال مش أمر واحد، ده يوم شغل كامل متقسّم ٣ حتت:

1. **Git**: تحوّل الفولدر لريبو وترفعه على GitHub.
2. **Supabase**: تربط المشروع بقاعدة بيانات على السحابة، وتكتب الجداول في ملفات migration.
3. **تقفيلة اليوم**: commit ورفع، وعلامة (tag) على النسخة.

هنمشي سطر سطر بنفس الترتيب. جربت جزء Git في Git Bash على ويندوز، بس بدل GitHub استخدمت ريبو «bare» على نفس الجهاز ([[git init --bare remote.git]]) عشان الـ push يبقى حقيقي من غير حساب. وجزء Supabase اتجرّب بـ Supabase CLI نسخة 2.120.0 من npx.

---

## المرحلة ١: Git

### [[cd myapp]]

[[cd]] اختصار change directory: ادخل فولدر المشروع. كل الأوامر اللي بعده بتشتغل على الفولدر ده.

### [[git init]]

بيحوّل الفولدر لريبو Git، يعني بيعمل جواه فولدر مخفي اسمه [[.git]] فيه كل التاريخ بعد كده.

~~~text الناتج
Initialized empty Git repository in C:/Users/ali/.../myapp/.git/
~~~

### [[git add .]]

[[add]] بيحط الملفات في «منطقة التجهيز» (staging) اللي هتدخل الـ commit الجاي. والنقطة [[.]] معناها «الفولدر الحالي بكل اللي فيه». الملفات اللي مكتوبة في [[.gitignore]] (زي [[node_modules]] و [[.env]]) مش بتدخل.

### [[git commit -m "Initial project setup"]]

[[commit]] بياخد صورة من الملفات المتجهزة ويحفظها في التاريخ. و [[-m]] اختصار message: الرسالة اللي بتوصف الصورة دي.

~~~text الناتج
[master (root-commit) 0193b19] Initial project setup
 2 files changed, 2 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 README.md
~~~

- [[master]]: اسم الفرع. Git على الجهاز ده لسه بيسمّي أول فرع master (ده إعداد [[init.defaultBranch]]).
- [[root-commit]]: أول commit في الريبو، ملوش أب.
- [[0193b19]]: أول ٧ حروف من الـ hash، ده «رقم» الـ commit.

### [[git branch -M main]]

[[branch]] أوامر الفروع، و [[-M]] معناها «غيّر اسم الفرع الحالي لـ main حتى لو فيه فرع بالاسم ده» (الـ M الكبيرة = move بالقوة). ليه؟ عشان GitHub بيستخدم main، والفرعين لازم نفس الاسم. لو جهازك أصلًا بيعمل main، السطر ده مش بيضر.

### [[git remote add origin https://github.com/you/myapp.git]]

[[remote]] يعني نسخة من الريبو في مكان تاني. [[add origin]] بيدّي الرابط ده اسم مختصر هو [[origin]] (اسم متعارف عليه مش كلمة سحرية). الريبو لازم يتعمل على GitHub الأول من الموقع، **فاضي** ومن غير README، و Private.

### [[git push -u origin main]]

[[push]] بيرفع الـ commits لـ origin على فرع main. و [[-u]] اختصار [[--set-upstream]]: «افتكر إن main هنا مربوط بـ main هناك»، فبعد كده [[git push]] و [[git pull]] من غير أسامي.

~~~text الناتج (الريموت هنا ريبو bare محلي)
To ../remote.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
~~~

آخر سطر ده شغل [[-u]] بالظبط.

---

## المرحلة ٢: Supabase CLI

### ليه [[npx supabase]] مش [[supabase]]؟

[[npx]] بيجيب الـ package من npm ويشغّله من غير ما يتسطّب global على جهازك. أول مرة بياخد وقت لأنه بينزّل الـ CLI، وبعد كده من الكاش. وتسطيبه بـ [[npm install -g supabase]] مش مدعوم، فده الطريق السهل.

~~~bash
npx supabase --version
~~~

~~~text الناتج
2.120.0
~~~

### [[npx supabase login]]

بيفتح المتصفح تسجّل دخول بحسابك، ويحفظ access token على جهازك. من غيره أي أمر بيكلّم السحابة بيفشل. جربت [[link]] من غير login وطلع:

~~~text الناتج
Access token not provided. Supply an access token by running $__btsupabase login$__bt or setting the SUPABASE_ACCESS_TOKEN environment variable.
~~~

(في CI بدل login بتحط التوكن في متغير البيئة [[SUPABASE_ACCESS_TOKEN]].)

### [[npx supabase init]]

بيعمل فولدر [[supabase/]] جوه المشروع:

~~~text الناتج
Finished supabase init.
~~~

~~~text اللي اتعمل
supabase/
  config.toml     إعدادات المشروع (البورتات، والـ auth، ...)
  .gitignore      بيستبعد .temp و .branches و ملفات .env المحلية
~~~

وأول سطر مهم في [[config.toml]]:

~~~text supabase/config.toml
project_id = "myapp"
~~~

اسمه من اسم الفولدر. الفولدر ده كله يدخل git.

### [[npx supabase link --project-ref PROJECT_REF]]

[[link]] بيربط الفولدر ده بمشروع معيّن على supabase.com. و [[--project-ref]] الكود اللي في رابط الداشبورد ([[supabase.com/dashboard/project/<الكود ده>]]). بيسأل على باسورد القاعدة (من Settings ثم Database، مش باسورد حسابك)، وبيحفظ الربط في [[supabase/.temp]] (اللي متجاهل في git، فكل جهاز بيعمل link بنفسه).

### [[npx supabase migration new create_courses]]

بيعمل ملف SQL فاضي اسمه تاريخ ووقت دلوقتي + الاسم اللي كتبته:

~~~text الناتج
supabase/migrations/20261007132413_create_courses.sql
~~~

اقرا الاسم: [[2026 10 07 13 24 13]] يعني سنة شهر يوم ساعة دقيقة ثانية (بتوقيت UTC). الـ timestamp ده هو اللي بيرتّب الـ migrations: الأقدم يتطبّق الأول. وانت تفتح الملف وتكتب فيه الـ SQL، مثلًا:

~~~text create_courses.sql
create table notes (id serial primary key, body text);
~~~

### [[npx supabase db push]]

بيطبّق على القاعدة اللي عملتلها link كل ملف في [[supabase/migrations]] لسه متطبّقش، بالترتيب. لو نسيت link:

~~~text الناتج
Cannot find project ref. Have you run supabase link?
~~~

وعشان أشوف الـ push حقيقي من غير حساب، طبّقته على Postgres 16 محلي في Docker بـ [[--db-url]] بدل link (نفس الأمر بالظبط، بس القاعدة مكتوب رابطها):

~~~bash
npx supabase db push --db-url "postgresql://postgres:pw@127.0.0.1:55433/postgres?sslmode=disable"
~~~

~~~text الناتج أول مرة
Connecting to remote database...
Applying migration 20261007132413_create_courses.sql...
Finished supabase db push.
~~~

~~~text الناتج تاني مرة
Connecting to remote database...
Remote database is up to date.
~~~

إزاي عرف إنه طبّقه قبل كده؟ بيسجّل كل migration في جدول جوه القاعدة نفسها:

~~~text supabase_migrations.schema_migrations
    version     |      name
----------------+----------------
 20261007132413 | create_courses
~~~

فاللي اسمه موجود هنا مش بيتطبّق تاني. وده الفرق الكبير عن إنك تلصق SQL في SQL Editor: هنا القاعدة نفسها عارفة هي واقفة فين.

> [[?sslmode=disable]] كان لازم بس عشان Postgres المحلي مفيهوش SSL. مع Supabase الحقيقي مش محتاجه.

---

## المرحلة ٣: تقفيلة اليوم

### [[git add . && git commit -m "add courses table" && git push]]

٣ أوامر في سطر. [[&&]] معناها «لو اللي قبلي نجح، نفّذني». فلو الـ commit فشل (مثلًا مفيش تغييرات) الـ push مش هيتنفّذ.

~~~text الناتج
[main c44e165] add courses table
 3 files changed, 424 insertions(+)
 create mode 100644 supabase/.gitignore
 create mode 100644 supabase/config.toml
 create mode 100644 supabase/migrations/20261007132413_create_courses.sql
To ../remote.git
   0193b19..c44e165  main -> main
~~~

[[0193b19..c44e165]] يعني الفرع على الريموت اتحرك من الـ commit القديم للجديد. ولاحظ إن [[git push]] اشتغل من غير [[origin main]] بفضل [[-u]] بتاع الصبح.

### [[git tag v0.1 && git push --tags]]

[[tag]] اسم ثابت بيتلزق على الـ commit الحالي، عشان ترجعله بعدين ([[git checkout v0.1]]). والـ tags مش بتترفع مع [[git push]] العادي، عشان كده [[--tags]]:

~~~text الناتج
To ../remote.git
 * [new tag]         v0.1 -> v0.1
~~~

~~~bash
git log --oneline --decorate
~~~

~~~text الناتج
c44e165 (HEAD -> main, tag: v0.1, origin/main) add courses table
0193b19 Initial project setup
~~~

---

## ملخص السكربت

| السطر | بيعمل إيه |
|---|---|
| [[git init]] → [[git push -u origin main]] | الريبو على GitHub ومربوط |
| [[npx supabase login]] | توكن حسابك على الجهاز |
| [[npx supabase init]] | فولدر [[supabase/]] و [[config.toml]] |
| [[npx supabase link]] | الفولدر مربوط بمشروع سحابة |
| [[migration new]] | ملف SQL فاضي باسم timestamp |
| [[db push]] | يطبّق اللي لسه متطبّقش ويسجّله |
| [[git tag]] + [[push --tags]] | علامة على النسخة |

## الخلاصة

- الـ schema بقى ملفات في git، مش كليكات في الداشبورد: أي قاعدة جديدة تقوم بـ [[db push]].
- [[db push]] بيعدّل القاعدة الحقيقية، فاتأكد إن الـ link على مشروع التجربة.
- الـ migrations مكانها [[supabase/migrations]] وأساميها timestamp، غير كده الـ CLI مش شايفها.`,
          lines: [
            "ادخل فولدر المشروع.",
            "ابدأ ريبو Git جديد.",
            "جهّز كل الملفات للـ commit.",
            "أول commit.",
            "سمّي الفرع main.",
            "اربط الريبو بريموت على GitHub (اعمله private الأول من الموقع).",
            "ارفع، و [[-u]] يفتكر الربط.",
            "سجّل دخول Supabase من المتصفح.",
            "اعمل فولدر supabase/ بالإعدادات.",
            "اربط الفولدر بمشروعك على السحابة.",
            "ملف migration جديد باسم بيبدأ بـ timestamp.",
            "طبّق كل الـ migrations اللي لسه متطبقتش.",
            "تقفيلة اليوم: commit ورفع في سطر.",
            "علامة على نسخة، وارفع العلامات."
          ],
          sol: R`الجزء بتاع Git: بعد [[git push -u origin main]] هتلاقي [[branch 'main' set up to track 'origin/main']] والملفات ظاهرة في الريبو على GitHub. لو ظهر [[rejected ... (fetch first)]] يبقى الريبو على GitHub مش فاضي (عملته بـ README)، اعمله فاضي خالص أو اعمل [[git pull --rebase origin main]] الأول.

جزء Supabase: [[npx supabase init]] بيعمل فولدر [[supabase/]] فيه [[config.toml]]. [[npx supabase migration new create_courses]] بيعمل ملف فاضي اسمه زي [[supabase/migrations/20260930081500_create_courses.sql]]، اكتب فيه [[create table notes (id serial primary key, body text);]]. [[npx supabase db push]] بيوريك الملفات اللي هتتطبّق ويسألك تأكيد، وبعدها الجدول بيظهر في Table Editor في الداشبورد.

لو [[db push]] قال [[Cannot find project ref]] يبقى نسيت [[link]]. ولو طلب باسورد، ده باسورد قاعدة المشروع (من Settings ثم Database) مش باسورد حسابك. واتأكد إنك عامل [[link]] على مشروع التجربة مش مشروع الشغل، لأن [[db push]] بيعدّل القاعدة الحقيقية. (جربت [[init]] و [[migration new]] و [[db push]] بـ Supabase CLI 2.120 على Postgres محلي بـ [[--db-url]]، و [[Cannot find project ref]] طلعت فعلًا من غير link. أما [[login]] و [[link]] على مشروع حقيقي محتاجين حساب، فمن التوثيق.)`
        },
        {
          cmd: "compose: Postgres محلي",
          title: "قاعدة بيانات للتطوير نفسها عند كل الفريق",
          desc: R`ملف compose فيه Postgres بس، وخمس أوامر لأول تشغيل بعد الـ clone. محدش محتاج يسطّب Postgres على جهازه، والكل عنده نفس النسخة، والبيانات محفوظة في volume.

البورت 5433 على [[127.0.0.1]] بس، عشان ميتخانقش مع أي Postgres متسطّب على الجهاز، ومحدش على الشبكة يوصله.`,
          example: R`# docker-compose.yml
services:
  db:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_USER: myapp
      POSTGRES_PASSWORD: change-me-dev-only
      POSTGRES_DB: myapp
    ports:
      - "127.0.0.1:5433:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U myapp -d myapp"]
      interval: 5s
      retries: 10
volumes:
  pgdata:
# أول مرة بعد الـ clone:
docker compose up -d --wait
cd web
pnpm install
cp .env.example .env
pnpm prisma migrate dev
pnpm dev`,
          try: "احفظ الملف في فولدر تجربة وشغّل [[docker compose up -d --wait]]، وبعدين ادخل بـ [[psql postgresql://myapp:change-me-dev-only@localhost:5433/myapp]] واعمل جدول. اعمل [[docker compose down]] و up تاني وتأكد إن الجدول لسه موجود.",
          flag: "script",
          deep: {
            why: "«سطّب Postgres 16 واعمل يوزر وقاعدة» خطوات بتاخد ساعة وكل واحد بيعملها بشكل مختلف. هنا الإعداد كله في ملف في الريبو، وأي حد يعمل clone يبقى عنده نفس القاعدة في دقيقة.",
            how: R`[[image: postgres:16-alpine]] نسخة ثابتة، مش latest، عشان الكل على نفس الإصدار. متغيرات [[POSTGRES_*]] بتعمل اليوزر والقاعدة أول مرة بس (لما الـ volume فاضي).

[[127.0.0.1:5433:5432]]: على جهازك 5433، جوه الـ container 5432. فالـ DATABASE_URL في .env بيبقى [[postgresql://myapp:...@localhost:5433/myapp]].

الـ volume [[pgdata]] هو اللي بيحفظ البيانات، فـ [[down]] و [[up]] مبيمسحوش حاجة (إلا لو [[down -v]]).

الـ healthcheck بيشغّل [[pg_isready]] كل ٥ ثواني، و [[up --wait]] بيستنى لحد ما يقول healthy. من غيره [[prisma migrate dev]] ممكن يشتغل والقاعدة لسه بتقوم ويفشل بـ connection refused.

وبعدين: [[pnpm install]]، ونسخة .env من المثال، و [[prisma migrate dev]] بيطبّق الـ migrations على القاعدة الفاضية، و [[pnpm dev]] يشغّل الموقع.`,
            when: "أي مشروع بيستخدم Postgres. نفس الفكرة لـ Redis أو Mongo. الأوامر لوحدها في تاب Docker وتاب PostgreSQL.",
            mistakes: R`في مشروع حقيقي كان البورت [[5432:5432]] على كل الواجهات، فبيتخانق مع Postgres متسطّب على ويندوز (compose يفشل بـ port is already allocated)، وكمان القاعدة بتبقى مفتوحة لأي حد على نفس الواي فاي.

وكان فيه package.json في جذر الريبو فيه dependency تايهة (نسخة من اللي في web/)، فـ [[pnpm install]] من الجذر بيعمل node_modules في المكان الغلط. شغّل الأوامر من web/.

وأكتر من ١٠٠ screenshot في جذر الريبو. متجاهلة في git بس زحمة، حطها في فولدر لوحدها.`
          },
          teach: R`## الأول: حتتين

المثال فيه حاجتين: **ملف** [[docker-compose.yml]] (وصف قاعدة البيانات)، و**٦ أوامر** بتتكتب مرة واحدة بعد الـ clone. هنقرا الملف سطر سطر الأول، وبعدين نشغّل الأوامر.

جربت الملف ده بالظبط على ويندوز (Docker Desktop) في فولدر اسمه [[teach-real01-pg]]، فكل الأسامي في الناتج بتبدأ بيه. وجزء Prisma اتجرّب بـ pnpm 10 و Prisma 6 على مشروع صغير فيه جدول واحد.

---

## ١. الملف: سطر سطر

### [[services:]] و [[db:]]

[[services]] قايمة الخدمات (كل خدمة = container). هنا خدمة واحدة اسمها [[db]]، والاسم ده هو اللي بتستخدمه في الأوامر ([[docker compose logs db]]) وهو اسمها جوه شبكة المشروع.

المسافات في YAML معناها «مين تبع مين»: [[db]] مزوّقة مسافتين يبقى تبع [[services]]، و [[image]] أربعة يبقى تبع [[db]].

### [[image: postgres:16-alpine]]

[[postgres]] اسم الـ image، و [[16-alpine]] الـ tag: Postgres 16 مبني على Alpine Linux (نسخة صغيرة). على الجهاز ده [[postgres:16-alpine]] حجمها 395MB و [[postgres:16]] العادية 642MB. الرقم ثابت عشان الفريق كله على نفس الإصدار، ومحدش يتفاجئ لما [[latest]] تبقى 17.

### [[restart: unless-stopped]]

لو الـ container وقع، أو Docker Desktop اتقفل واتفتح، يقوم لوحده. «إلا لو انت وقفته بإيدك» بـ [[docker compose stop]].

### [[environment:]] والتلات متغيرات

| المتغير | معناه |
|---|---|
| [[POSTGRES_USER: myapp]] | اسم اليوزر اللي هيتعمل |
| [[POSTGRES_PASSWORD: change-me-dev-only]] | الباسورد بتاعه (للتطوير بس) |
| [[POSTGRES_DB: myapp]] | اسم القاعدة اللي هتتعمل |

الـ image بتقرا التلاتة دول **أول مرة بس**، لما فولدر البيانات فاضي. لو غيّرت الباسورد بعد كده مش هيتغيّر، لأن القاعدة اتعملت خلاص.

### [[ports: - "127.0.0.1:5433:5432"]]

اقراه من اليمين:

~~~text
127.0.0.1  :  5433  :  5432
   │           │       └── البورت جوه الـ container (Postgres دايمًا 5432)
   │           └────────── البورت على جهازك
   └────────────────────── على أنهي واجهة في جهازك
~~~

- **5433 مش 5432** عشان لو عندك Postgres متسطّب على ويندوز (أو container تاني) واخد 5432، ميتخانقوش. على الجهاز ده فعلًا فيه container تاني واخد 5432.
- **127.0.0.1** يعني localhost بس: انت توصل، وأي حد على نفس الواي فاي لأ.

بعد التشغيل [[docker port]] أكّدها:

~~~text الناتج
5432/tcp -> 127.0.0.1:5433
~~~

### [[volumes: - pgdata:/var/lib/postgresql/data]]

[[/var/lib/postgresql/data]] الفولدر اللي Postgres بيكتب فيه البيانات جوه الـ container. و [[pgdata]] قبل النقطتين اسم **volume**: مساحة تخزين Docker بيديرها وبتعيش بره الـ container. فلو الـ container اتمسح، البيانات فاضلة في الـ volume.

### [[healthcheck:]]

| السطر | معناه |
|---|---|
| [[test: ["CMD-SHELL", "pg_isready -U myapp -d myapp"]]] | الأمر اللي بيتشغّل جوه الـ container. [[CMD-SHELL]] يعني شغّله بـ shell. [[pg_isready]] أداة مع Postgres بترجع 0 لو القاعدة بتقبل اتصالات. [[-U]] اليوزر و [[-d]] القاعدة |
| [[interval: 5s]] | كل ٥ ثواني |
| [[retries: 10]] | ١٠ فشل ورا بعض يبقى unhealthy |

ده اللي Docker سجّله فعلًا:

~~~text آخر فحص
ExitCode: 0
Output: /var/run/postgresql:5432 - accepting connections
~~~

ليه مهم؟ لأن الـ container بيبقى «شغال» قبل ما Postgres يبقى جاهز بثواني. الفحص ده بيفرّق بين «شغال» و «جاهز».

### [[volumes: pgdata:]] في الآخر

ده **تعريف** الـ volume على مستوى الملف (فاضي = الإعدادات الافتراضية). أي volume بالاسم في خدمة لازم يتعرّف هنا.

---

## ٢. الأوامر

### [[docker compose up -d --wait]]

- [[up]]: اعمل كل حاجة في الملف وشغّلها.
- [[-d]] اختصار detached: في الخلفية، والترمنال يرجعلك.
- [[--wait]]: استنى لحد ما كل خدمة فيها healthcheck تبقى healthy قبل ما ترجع.

~~~text الناتج
 Network teach-real01-pg_default Created
 Volume teach-real01-pg_pgdata Created
 Container teach-real01-pg-db-1 Created
 Container teach-real01-pg-db-1 Started
 Container teach-real01-pg-db-1 Waiting
 Container teach-real01-pg-db-1 Healthy
~~~

اقرا الأسامي: كل حاجة بتبدأ باسم الفولدر ([[teach-real01-pg]])، وده «اسم المشروع». الـ volume اسمه الحقيقي [[teach-real01-pg_pgdata]]، والـ container [[teach-real01-pg-db-1]] (المشروع، الخدمة، رقم النسخة). و [[Waiting]] ثم [[Healthy]] ده شغل [[--wait]] مع الـ healthcheck.

~~~text docker compose ps
NAME                   IMAGE                STATUS                   PORTS
teach-real01-pg-db-1   postgres:16-alpine   Up 6 seconds (healthy)   127.0.0.1:5433->5432/tcp
~~~

### [[cd web]] و [[pnpm install]]

التطبيق في فولدر [[web/]]، فالأوامر الجاية من هناك. [[pnpm install]] بيقرا [[package.json]] ويسطّب المكتبات في [[node_modules]]. pnpm 10 بيمنع سكربتات التسطيب افتراضيًا لحد ما توافق عليها:

~~~text الناتج
Ignored build scripts: @prisma/engines@6.19.3, prisma@6.19.3.
Run "pnpm approve-builds" to pick which dependencies should be allowed to run scripts.
~~~

ده تحذير مش خطأ، و Prisma اشتغل عادي بعده (بينزّل الـ engine أول ما يحتاجه). ولو مكتبة تانية محتاجة سكربتها، [[pnpm approve-builds]].

### [[cp .env.example .env]]

[[cp]] اختصار copy. [[.env.example]] في git ومفيهوش أسرار حقيقية، و [[.env]] نسختك الشخصية ومتجاهلة في git. السطر المهم فيه:

~~~text .env
DATABASE_URL="postgresql://myapp:change-me-dev-only@localhost:5433/myapp"
~~~

اقراه: [[postgresql://]] النوع، [[myapp:change-me-dev-only]] اليوزر والباسورد، [[@localhost:5433]] فين (البورت اللي على جهازك مش 5432)، [[/myapp]] اسم القاعدة. نفس القيم اللي في الـ compose.

(في PowerShell [[cp]] شغال برضه، لأنه اسم مختصر لـ [[Copy-Item]].)

### [[pnpm prisma migrate dev]]

[[pnpm prisma]] بيشغّل Prisma CLI اللي في [[node_modules]] بتاع المشروع. و [[migrate dev]] بيقارن ملف [[schema.prisma]] بالقاعدة، ويطبّق كل الـ migrations اللي في [[prisma/migrations]]، ولو فيه تغيير جديد في الـ schema بيعمله migration جديد (ويسألك على اسم، أو تديهوله بـ [[--name]]). على مشروع جديد بـ [[--name init]] طلع:

~~~text الناتج
Environment variables loaded from .env
Datasource "db": PostgreSQL database "myapp", schema "public" at "localhost:5433"

Applying migration $__bt20261007132845_init$__bt

The following migration(s) have been created and applied from new schema changes:

prisma\migrations/
  └─ 20261007132845_init/
    └─ migration.sql

Your database is now in sync with your schema.
~~~

- أول سطر: قرا [[DATABASE_URL]] من [[.env]] (لو مش موجود هيقولك المتغير ناقص).
- تالت سطر: وصل للقاعدة على 5433 فعلًا.
- [[migration.sql]] فيه [[CREATE TABLE "Note" ...]]، وده اللي اتطبّق.

وجوه القاعدة بقى فيه جدولين: [[Note]] بتاعك، و [[_prisma_migrations]] اللي Prisma بيسجّل فيه إيه اتطبّق. بعد الـ clone الـ migrations بتبقى موجودة في الريبو أصلًا، فالأمر بيطبّقها على قاعدتك الفاضية.

### [[pnpm dev]]

بيشغّل سكربت [[dev]] اللي في [[package.json]] (في Next.js مثلًا [[next dev]]). والتطبيق بيكلّم القاعدة على 5433 من [[.env]].

---

## ٣. هل البيانات بتعيش فعلًا؟

دخّلت صف، وقفلت كل حاجة، وفتحت تاني:

~~~bash
docker compose exec -T db psql -U myapp -d myapp -c "insert into \"Note\"(body) values ('hello')"
docker compose down
docker compose up -d --wait
docker compose exec -T db psql -U myapp -d myapp -c 'table "Note"'
~~~

~~~text الناتج
INSERT 0 1
 Container teach-real01-pg-db-1 Removed
 Network teach-real01-pg_default Removed
 Container teach-real01-pg-db-1 Healthy
 id | body
----+-------
  1 | hello
~~~

[[down]] مسح الـ container والشبكة، **بس مش الـ volume**، فالصف رجع. ([[exec db psql]] بيشغّل psql اللي جوه الـ container نفسه، فمش محتاج psql على جهازك. و [[-T]] من غير terminal تفاعلي.)

أما [[docker compose down -v]] فبيمسح الـ volume كمان:

~~~text الناتج
 Volume teach-real01-pg_pgdata Removed
~~~

وده الأمر اللي تستخدمه لما عايز قاعدة نضيفة من الأول (أو لما غيّرت [[POSTGRES_PASSWORD]] وعايزه يتطبّق).

---

## الخلاصة

| الحاجة | فين |
|---|---|
| نسخة Postgres | [[image: postgres:16-alpine]] |
| اليوزر والباسورد والقاعدة | [[environment]]، أول مرة بس |
| البورت على جهازك | 5433 على 127.0.0.1 بس |
| البيانات | volume [[pgdata]]، بيعيش بعد [[down]] ويتمسح بـ [[down -v]] |
| «جاهز» مش «شغال» | healthcheck + [[up --wait]] |
| الجداول | [[prisma migrate dev]] من ملفات في git |`,
          lines: [
            "الخدمات اللي في الملف.",
            "خدمة اسمها db.",
            "Postgres 16 بالنسخة الصغيرة.",
            "يقوم لوحده بعد restart الجهاز إلا لو وقفته بإيدك.",
            "متغيرات بتتقري أول مرة بس.",
            "اسم اليوزر.",
            "باسورد للتطوير بس، مش للإنتاج.",
            "اسم القاعدة.",
            "البورتات.",
            "5433 على جهازك بس، يروح لـ 5432 جواه.",
            "الـ volumes.",
            "البيانات تعيش في volume اسمه pgdata.",
            "فحص الصحة.",
            "الأمر اللي بيقول القاعدة جاهزة ولا لأ.",
            "كل ٥ ثواني.",
            "ولحد ١٠ محاولات قبل ما يعتبرها unhealthy.",
            "تعريف الـ volumes المسمّاة.",
            "volume البيانات.",
            "شغّل واستنى لحد ما يبقى healthy.",
            "ادخل فولدر التطبيق.",
            "سطّب المكتبات.",
            "اعمل .env من المثال (وعدّل الـ URL على 5433).",
            "طبّق الـ migrations على القاعدة الفاضية.",
            "شغّل الموقع."
          ],
          sol: R`جربته بالظبط. [[docker compose up -d --wait]] استنى لحد ما ظهر [[Container pg-db-1 Healthy]] (ده شغل الـ healthcheck مع [[--wait]]). بعدها:

[[psql postgresql://myapp:change-me-dev-only@localhost:5433/myapp -c "create table notes(...); insert ..."]] رجّع [[CREATE TABLE]] و [[INSERT 0 1]]. بعد [[docker compose down]] و [[up -d --wait]] تاني، [[table notes]] رجّع نفس الصف. البيانات فضلت لأنها في الـ volume [[pgdata]] مش جوه الـ container.

لو الجدول اختفى، غالبًا عملت [[docker compose down -v]]: الـ [[-v]] بيمسح الـ volumes. ولو psql قال [[Connection refused]] بص على البورت: [[5433]] على جهازك بيروح لـ [[5432]] جوه الـ container. ولو [[password authentication failed]] والباسورد صح، يبقى الـ volume متعمل قبل كده بباسورد تاني. [[POSTGRES_PASSWORD]] بيتقري أول مرة بس، فلازم [[down -v]] (وده بيمسح الداتا).`
        },
        {
          cmd: "compose: نسخة تانية",
          title: "نسختين من نفس المشروع شغالين جنب بعض",
          desc: R`محتاج تشغّل نسخة تانية من المشروع (عميل تاني أو فرع تاني) من غير ما توقف الأولى. اللي لازم يختلف: بورتات جهازك، واسم المشروع (عشان الـ containers والشبكة والـ volumes متتلخبطش). البورتات جوه الـ containers تفضل زي ما هي.

[[name:]] في أول الملف بتعمل ده كله: الـ containers بتتسمّى [[myapp2-backend-1]]، والشبكة [[myapp2_default]] لوحدها.`,
          example: R`# docker-compose.second.yml
#   docker compose -f docker-compose.second.yml up -d --build
#   docker compose -f docker-compose.second.yml logs -f backend
#   docker compose -f docker-compose.second.yml down
name: myapp2
services:
  redis:
    image: redis:7-alpine
    healthcheck: { test: ["CMD", "redis-cli", "ping"], interval: 10s, retries: 5 }
  backend:
    build: { context: ./backend, dockerfile: Dockerfile.dev }
    ports: ["3001:3000"]
    env_file: [./backend/.env]
    depends_on: { redis: { condition: service_healthy } }
    volumes: ["./backend/src:/app/src"]
  frontend:
    build: { context: ./frontend, dockerfile: Dockerfile.dev }
    ports: ["5174:5173"]
    environment:
      - VITE_API_BASE_URL=http://localhost:3001`,
          try: "شغّل مشروع compose عندك، وبعدين اعمل [[docker compose -p myapp2 up -d]] من نفس الفولدر بعد ما تغيّر البورتات في ملف override. اعمل [[docker ps]] وشوف المجموعتين شغالين.",
          flag: "script",
          deep: {
            why: "compose بيسمّي كل حاجة باسم الفولدر. لو شغّلت نفس الملف مرتين من نفس الفولدر، المرة التانية هتعدّل على الأولى بدل ما تعمل نسخة. ولو غيّرت الفولدر بس، البورتات هتتخانق.",
            how: R`اسم المشروع (project name) هو البادئة لكل حاجة compose بيعملها. [[name: myapp2]] في الملف، أو [[-p myapp2]] في الأمر، بيخلي النسختين منفصلين تمامًا: containers وشبكة و volumes.

redis من غير [[ports:]] خالص، يعني مش مكشوف على جهازك، والـ backend بيوصله بالاسم [[redis]] جوه شبكة المشروع.

البورتات: [[3001:3000]] يعني جهازك 3001 والتطبيق جواه لسه على 3000. والـ frontend لازم يعرف إن الـ API بقى على 3001، عشان كده [[VITE_API_BASE_URL]].

[[depends_on]] مع [[service_healthy]] بيخلي الـ backend يستنى لحد ما redis يرد على ping.

وبديل أقصر من نسخ الملف كله: ملف override فيه البورتات بس، وتشغّل [[docker compose -p myapp2 -f docker-compose.yml -f ports.second.yml up -d]].`,
            when: "تجربة فرع جنب الشغال، أو نسختين لعميلين على نفس الجهاز. الأوامر لوحدها في تاب Docker.",
            mistakes: R`في مشروع حقيقي كان الملف فيه [[image: myapp2-frontend:dev]] من غير [[build:]]، فعلى أي جهاز جديد بيفشل لحد ما حد يبني الـ image بإيده. استخدم build.

وكان فيه [[container_name]] ثابت لكل خدمة. ده بيمنع تشغيل نسخة تالتة، ولو نسيت تغيّره في النسخة التانية compose يرفض يقوم لأن الاسم محجوز. سيبه يتسمّى لوحده من اسم المشروع.`
          },
          teach: R`## الأول: إيه اللي بيتغيّر بين النسختين؟

الملف ده نسخة من [[docker-compose.yml]] الأصلي، بس فيه ٣ تغييرات بالظبط: سطر [[name:]] في الأول، وبورتات جهازك ([[3001]] و [[5174]] بدل [[3000]] و [[5173]])، ورابط الـ API في الـ frontend. كل حاجة تانية زي ما هي.

جربته على ويندوز (Docker Desktop) في فولدر [[teach-real01-app]]: الملف الأصلي على 3000 و 5173، وجنبه الملف ده. الـ backend والـ frontend عندي سيرفرات Node صغيرة (الـ backend بيبعت PING لـ redis ويرجّع الرد)، وغيّرت [[name: myapp2]] لـ [[teach-real01-myapp2]] عشان أسامي اللي بعمله تبقى مميزة. الفكرة واحدة.

---

## ١. التعليقات في الأول: إزاي تشغّله

~~~bash
docker compose -f docker-compose.second.yml up -d --build
docker compose -f docker-compose.second.yml logs -f backend
docker compose -f docker-compose.second.yml down
~~~

- [[-f]] اختصار file: استخدم الملف ده بدل [[docker-compose.yml]] الافتراضي. ولازم يتكتب مع **كل** أمر للنسخة دي.
- [[--build]]: ابني الـ images من جديد قبل التشغيل.
- [[logs -f backend]]: لوج خدمة backend بس، و [[-f]] هنا معناها follow (فضل اعرض الجديد زي [[tail -f]]). نفس الحرف بمعنى مختلف حسب مكانه: قبل الأمر الفرعي ملف، بعد [[logs]] follow.

---

## ٢. [[name: myapp2]]

ده أهم سطر. compose بيدّي كل حاجة بيعملها **اسم مشروع** كبادئة، ولو مفيش [[name:]] بياخده من اسم الفولدر. شوف الفرق لما شغّلت النسختين من **نفس الفولدر**:

~~~text docker compose ls
NAME                  STATUS
teach-real01-app      running(3)      ← الملف الأصلي، الاسم من الفولدر
teach-real01-myapp2   running(3)      ← الملف ده، الاسم من name:
~~~

~~~text docker network ls
teach-real01-app_default      bridge
teach-real01-myapp2_default   bridge
~~~

كل نسخة ليها containers وشبكة (و volumes لو فيه) منفصلين. ولو مكانش فيه [[name:]]، الملف التاني كان هياخد نفس اسم المشروع ويعدّل على containers الأولى بدل ما يعمل جديدة.

[[-p myapp2]] في الأمر بيعمل نفس الحاجة، وبيكسب على [[name:]] لو الاتنين موجودين.

---

## ٣. خدمة [[redis]]

~~~text
redis:
  image: redis:7-alpine
  healthcheck: { test: ["CMD", "redis-cli", "ping"], interval: 10s, retries: 5 }
~~~

- [[redis:7-alpine]]: Redis 7 على Alpine.
- [[{ ... }]]: ده YAML مكتوب في سطر واحد (flow style). نفس معنى إنك تكتب كل مفتاح في سطر لوحده.
- [[test: ["CMD", "redis-cli", "ping"]]]: [[CMD]] يعني شغّل البرنامج ده مباشرة من غير shell. [[redis-cli ping]] بيرد [[PONG]] لو Redis جاهز.
- **مفيش [[ports:]] خالص.** يعني Redis مش متاح من جهازك، بس الـ containers اللي في نفس الشبكة توصله بالاسم [[redis]]:

~~~bash
docker compose -f docker-compose.second.yml exec backend getent hosts redis
~~~

~~~text الناتج
172.19.0.2        redis  redis
~~~

الاسم [[redis]] جوه شبكة المشروع بيترجم لـ IP الـ container ده. وكل نسخة ليها redis بتاعها في شبكتها، فمفيش تخانق.

~~~text docker ps
teach-real01-myapp2-redis-1     6379/tcp    Up 31 seconds (healthy)
teach-real01-app-redis-1        6379/tcp    Up 50 seconds (healthy)
~~~

[[6379/tcp]] من غير سهم يعني البورت جوه الـ container بس، مش منشور على جهازك.

---

## ٤. خدمة [[backend]]

### [[build: { context: ./backend, dockerfile: Dockerfile.dev }]]

ابني الـ image من فولدر [[./backend]] (الـ context: الملفات اللي Docker يقدر يشوفها وقت البناء)، باستخدام [[Dockerfile.dev]] بدل [[Dockerfile]]. والـ image اللي بيتبني اسمه من المشروع: [[teach-real01-myapp2-backend]].

### [[ports: ["3001:3000"]]]

[[جهازك:جوه]]. الـ backend جوه لسه بيسمع على 3000 (اللوج قال [[backend listening on 3000]])، بس على جهازك 3001 لأن 3000 واخدها النسخة الأولى.

~~~text docker ps
teach-real01-myapp2-backend-1   0.0.0.0:3001->3000/tcp
teach-real01-app-backend-1      0.0.0.0:3000->3000/tcp
~~~

### [[env_file: [./backend/.env]]]

اقرا متغيرات البيئة من الملف ده وحطها في الـ container. لو النسختين محتاجين قيم مختلفة (قاعدة تانية مثلًا)، اعمل ملف [[.env]] تاني واكتب اسمه هنا.

### [[depends_on: { redis: { condition: service_healthy } }]]

متشغّلش الـ backend غير لما redis يبقى **healthy**، مش بس «اتشغّل». شوف الترتيب في الناتج:

~~~text الناتج
 Container teach-real01-myapp2-redis-1 Started
 Container teach-real01-myapp2-frontend-1 Started
 Container teach-real01-myapp2-redis-1 Healthy
 Container teach-real01-myapp2-backend-1 Started
~~~

الـ frontend مش مستني حاجة فقام على طول، والـ backend استنى [[Healthy]].

### [[volumes: ["./backend/src:/app/src"]]]

bind mount: فولدر [[src]] من جهازك يبان جوه الـ container في [[/app/src]]، فتعديلك يوصل من غير build. بس خد بالك: على ويندوز التعديل بيوصل للملف، **والإشعار مبيوصلش**. جربت أعدّل الملف وأداة المراقبة ([[node --watch]]) محستش، والـ container كان شايف الملف الجديد ([[cat]] جواه طلّع التعديل). بعد [[restart backend]] الرد اتغيّر. الحل: polling (درس «Next.js dev في Docker») أو المشروع جوه WSL.

---

## ٥. خدمة [[frontend]]

نفس الـ build، و [[5174:5173]] (Vite بيسمع على 5173 جوه). والسطر المهم:

~~~text
environment:
  - VITE_API_BASE_URL=http://localhost:3001
~~~

ليه [[localhost:3001]] مش [[backend:3000]]؟ لأن الكود ده بيشتغل في **المتصفح** على جهازك، مش جوه Docker. المتصفح مش شايف شبكة compose، شايف بورتات جهازك بس. ([[VITE_]] في أول الاسم شرط في Vite عشان المتغير يوصل لكود الواجهة.)

~~~text curl من جهازك
curl localhost:3001   →  backend ok, redis says +PONG, NAME=second
curl localhost:5173   →  frontend, API at http://localhost:3000
curl localhost:5174   →  frontend, API at http://localhost:3001
~~~

كل frontend بيشاور على الـ backend بتاعه.

---

## ٦. لو نسيت تغيّر البورتات

شغّلت الملف الأصلي باسم مشروع تالت ([[-p teach-real01-dup]]) من غير ما أغيّر البورتات:

~~~text الناتج
Bind for 0.0.0.0:5173 failed: port is already allocated
~~~

اسم المشروع بيفصل الـ containers، بس بورت جهازك واحد ومينفعش اتنين ياخدوه.

---

## ٧. القفل: خلي بالك من [[-f]]

~~~bash
docker compose down
~~~

من نفس الفولدر من غير [[-f]] قفل **النسخة الأولى**:

~~~text الناتج
 Network teach-real01-app_default Removed
~~~

~~~text docker compose ls بعدها
teach-real01-myapp2   running(3)
~~~

والتانية لسه شغالة. عشان تقفلها لازم [[docker compose -f docker-compose.second.yml down]].

---

## الخلاصة

| اللي اتغيّر | ليه |
|---|---|
| [[name: myapp2]] | containers وشبكة و volumes منفصلين |
| [[3001:3000]] و [[5174:5173]] | بورت جهازك ميتخانقش، والجوه زي ما هو |
| [[VITE_API_BASE_URL=http://localhost:3001]] | المتصفح يكلّم الـ backend الصح |
| redis من غير [[ports]] | كل نسخة ليها redis جوه شبكتها |

وأي أمر للنسخة التانية لازم معاه [[-f docker-compose.second.yml]] (أو [[-p myapp2]]).`,
          lines: [
            "اسم المشروع: البادئة لكل الـ containers والشبكة.",
            "الخدمات.",
            "redis.",
            "صورة redis الصغيرة.",
            "فحص صحة بـ ping، ومن غير ports يعني مش مكشوف.",
            "الـ backend.",
            "يتبني من Dockerfile.dev في فولدره.",
            "جهازك 3001 بدل 3000 عشان النسخة الأولى.",
            "متغيرات البيئة من ملف.",
            "يستنى لحد ما redis يبقى healthy.",
            "الكود من جهازك جوه الـ container للـ hot reload.",
            "الـ frontend.",
            "يتبني بنفس الطريقة.",
            "جهازك 5174 بدل 5173.",
            "متغيرات البيئة.",
            "الـ API بتاع النسخة دي على 3001."
          ],
          sol: R`اسم المشروع هو اللي بيفرق بين المجموعتين. جربتها بـ service واحد: [[docker compose up -d]] من فولدر [[two]] عمل [[two-web-1]]، و [[docker compose -p myapp2 up -d]] من نفس الفولدر بعد تغيير البورت عمل [[myapp2-web-1]]. [[docker ps]] وراهم الاتنين شغالين:

[[myapp2-web-1   127.0.0.1:8102->80/tcp]]
[[two-web-1      127.0.0.1:8101->80/tcp]]

كل مشروع ليه containers و network و volumes منفصلين، فالداتا مش بتتخلط. لما جربت [[-p myapp2]] من غير ما أغيّر البورت، فشل بـ [[Bind for 127.0.0.1:8101 failed: port is already allocated]]، وده السبب إن الملف التاني في الدرس فيه بورتات مختلفة ([[3001]] و [[5174]]) و [[name: myapp2]].

خد بالك إن كل أمر بعد كده لازم يبقى معاه نفس [[-p]] أو [[-f]]. [[docker compose down]] من غيره بيقفل النسخة الأولى مش التانية. و [[docker compose ls]] بيوريك كل المشاريع الشغالة.`
        },
        {
          cmd: "Next.js dev في Docker",
          title: "بيئة تطوير Next.js جوه container على ويندوز",
          desc: R`تلات مشاكل مشهورة لما تشغّل Next.js dev جوه Docker على ويندوز: node_modules بتاعة ويندوز بتبوّظ الـ container، والـ hot reload مبيحسش بالتعديلات، والسيرفر بيسمع على localhost جوه الـ container فمحدش يوصله.

الملفات دي بتحلهم التلاتة، ومعاهم ملف للإنتاج البورت فيه على [[127.0.0.1]] بس عشان Nginx اللي على السيرفر هو اللي يوصله.`,
          example: R`# Dockerfile.dev
FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]
# docker-compose.yml (للتطوير)
services:
  web:
    build: { context: ., dockerfile: Dockerfile.dev }
    ports: ["3002:3000"]
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    environment:
      - WATCHPACK_POLLING=true
      - CHOKIDAR_USEPOLLING=true
    restart: unless-stopped
# next.config.js (Next 16 بيشغّل Turbopack، ودا مبيقراش WATCHPACK_POLLING)
module.exports = { watchOptions: { pollIntervalMs: 1000 } };
# docker-compose.prod.yml (على السيرفر)
services:
  web:
    build: .
    ports: ["127.0.0.1:3010:3000"]
    env_file: [.env]
    restart: unless-stopped
# بعد ما تضيف مكتبة جديدة:
docker compose up -d --build -V`,
          try: "في مشروع Next.js تجريبي اعمل Dockerfile.dev و docker-compose.yml و next.config.js وشغّل [[docker compose up -d --build]]، وافتح localhost:3002، وعدّل كلمة في الصفحة واحفظ. لو اتغيرت من غير refresh يدوي، الـ polling شغال.",
          flag: "script",
          deep: {
            why: "الـ bind mount بيحط فولدر المشروع كله جوه الـ container، بما فيه node_modules اللي اتسطبت على ويندوز. مكتبات زي sharp و esbuild فيها ملفات مبنية لويندوز ومش هتشتغل على لينكس. وملفات ويندوز لما تتغير مبتبعتش إشعار للـ container، فـ Next مش بيعيد البناء.",
            how: R`[[- .:/app]] بيحط الكود بتاعك جوه [[/app]]، فأي تعديل يبان فورًا.

[[- /app/node_modules]] volume مجهول: بيغطي على node_modules اللي جت من جهازك، فالـ container يشوف اللي [[npm ci]] سطّبه جوه الـ image (نسخة لينكس). ونفس الفكرة لـ [[.next]] عشان الكاش بتاع ويندوز ولينكس ميتخلطوش.

[[WATCHPACK_POLLING]] (مراقب webpack) و [[CHOKIDAR_USEPOLLING]] (أدوات تانية) بيخلوا المراقب يفحص الملفات كل شوية بدل ما يستنى إشعار مش هييجي. بس Next 16 بيشغّل [[next dev]] بـ Turbopack، ودا مبيقراش المتغيرات دي: جربتها لوحدها والتعديل مظهرش. عشان كده [[watchOptions.pollIntervalMs]] في [[next.config.js]] (أو [[next dev --webpack]] فيرجع webpack والمتغير يشتغل).

[[-H 0.0.0.0]] بيقول لسيرفر Next صراحةً يسمع على كل الواجهات جوه الـ container، عشان الـ port mapping يوصله. Next 16 بيعمل كده لوحده أصلًا (جربته من غير [[-H]] واشتغل)، بس سيرفرات dev تانية زي Vite بتسمع على localhost بس لو مقلتلهاش.

في الإنتاج مفيش mount: [[build: .]] من الـ Dockerfile العادي (standalone)، والبورت [[127.0.0.1:3010]] بيخلي Nginx على نفس السيرفر بس يوصله.

و [[-V]] (renew anon volumes) بيعمل الـ volumes المجهولة من جديد، عشان node_modules الجديدة من الـ image تظهر.`,
            when: "لما عايز الفريق كله على نفس نسخة Node، أو المشروع محتاج خدمات تانية في compose. لو لوحدك ومعاك Node، [[npm run dev]] مباشرة أسرع. تفاصيل Docker على ويندوز في تاب Docker وتاب WSL.",
            mistakes: R`في مشروع حقيقي بعد [[npm install]] لمكتبة جديدة الموقع فضل يقول Module not found: الـ volume المجهول لسه فيه node_modules القديمة. الحل [[up -d --build -V]].

وكان فيه [[container_name]] ثابت، فمينفعش تشغّل نسختين. و [[COPY . .]] في Dockerfile.dev ملوش لازمة مع الـ bind mount (بيبطّأ الـ build بس)، فاتشال هنا.

ولو الـ hot reload بطيء جدًا على ويندوز: حط المشروع جوه WSL (مش على C:) والـ polling مش هيبقى محتاج أصلًا.`
          },
          teach: R`## الأول: ٤ ملفات وأمر

المثال فيه [[Dockerfile.dev]] (إزاي تتبني الـ image)، و [[docker-compose.yml]] للتطوير (إزاي تشتغل على جهازك)، و [[next.config.js]] (الـ polling)، و [[docker-compose.prod.yml]] للسيرفر، وفي الآخر الأمر اللي تشغّله بعد ما تضيف مكتبة.

جربت كل ده على ويندوز (Docker Desktop) بمشروع Next.js 16.4 صغير (صفحة واحدة) في فولدر [[teach-real01-next]]، بالظبط زي الملفات دي. وطلعت منه حاجتين اتصلّحوا في الدرس: Node 20 خلص دعمه في أبريل 2026 فبقى 22، و Next 16 بيستخدم Turbopack اللي مبيقراش [[WATCHPACK_POLLING]] فاتضاف [[next.config.js]].

---

## ١. [[Dockerfile.dev]] سطر سطر

### [[FROM node:22-alpine]]

[[FROM]] أول سطر في أي Dockerfile: ابدأ من image جاهزة. هنا Node 22 على Alpine Linux (صغيرة). جوه الـ container:

~~~text الناتج
v22.23.3
NAME="Alpine Linux"
~~~

### [[WORKDIR /app]]

اعمل فولدر [[/app]] وخليه الفولدر الحالي لكل اللي بعده (زي [[cd]] بس بيعمل الفولدر لو مش موجود).

### [[COPY package.json package-lock.json ./]]

انسخ ملفين بس من جهازك لـ [[./]] (يعني [[/app]]). ليه مش المشروع كله؟ عشان Docker بيحفظ كل خطوة (layer) ويعيد استخدامها: طول ما الملفين دول متغيّروش، خطوة [[npm ci]] اللي بعدها بتيجي من الكاش في ثانية بدل دقايق.

### [[RUN npm ci]]

[[RUN]] شغّل أمر **وقت البناء**. و [[npm ci]] (clean install) بيسطّب بالظبط النسخ اللي في [[package-lock.json]]، ويفشل لو الملفين مش متطابقين. وده مهم: المكتبات بتتسطب **جوه لينكس**، فـ Next بياخد نسخة الـ compiler بتاعة لينكس:

~~~text جوه الـ container
node_modules/@next/swc-linux-x64-musl
~~~

[[linux-x64-musl]] = لينكس 64 بت بمكتبة C بتاعة Alpine (musl). على ويندوز كانت هتبقى [[swc-win32-x64-msvc]]، ودي مش هتشتغل هنا.

~~~text ناتج البناء
#9 [4/4] RUN npm ci
#9 110.3 added 24 packages, and audited 25 packages in 2m
~~~

### [[CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]]]

[[CMD]] الأمر اللي بيشتغل **لما الـ container يقوم** (مش وقت البناء). مكتوب كـ array (exec form) فمفيش shell في النص. واقراه:

| الحتة | معناها |
|---|---|
| [[npm run dev]] | شغّل سكربت [[dev]] من [[package.json]] (هنا [[next dev]]) |
| [[--]] | اللي بعدي مش لـ npm، ابعته للسكربت زي ما هو |
| [[-H 0.0.0.0]] | اسمع على كل الواجهات جوه الـ container |

يعني الأمر الحقيقي اللي اشتغل: [[next dev -H 0.0.0.0]]. واللوج:

~~~text الناتج
▲ Next.js 16.4.0 (Turbopack)
- Local:         http://localhost:3000
- Network:       http://0.0.0.0:3000
✓ Ready in 555ms
~~~

ليه [[0.0.0.0]]؟ الطلب اللي جاي من جهازك بيوصل الـ container على واجهة الشبكة بتاعته، مش على localhost بتاعه. السيرفر اللي سامع على localhost بس مش هيرد. Next 16 بيسمع على كل الواجهات لوحده (جربته من غير [[-H]] ولقيته سامع على [[:::3000]] والصفحة ردت 200)، فالـ [[-H]] هنا للتأكيد ولنسخ Next القديمة. لكن سيرفرات تانية زي Vite لازم تقولها [[--host]].

---

## ٢. [[docker-compose.yml]] للتطوير

### [[build: { context: ., dockerfile: Dockerfile.dev }]]

ابني من الفولدر الحالي ([[.]]) بالملف [[Dockerfile.dev]].

### [[ports: ["3002:3000"]]]

جهازك 3002، جوه 3000. فالموقع على [[http://localhost:3002]].

### الـ volumes: ٣ سطور، وده قلب الدرس

~~~text
- .:/app               ← bind mount: فولدر مشروعك = /app جوه
- /app/node_modules    ← volume مجهول فوق node_modules
- /app/.next           ← volume مجهول فوق .next
~~~

**السطر الأول** [[.:/app]]: شكله [[جهازك:جوه]]، فالكود بتاعك كله يبان في [[/app]]. أي تعديل في المحرر يوصل على طول. بس كده غطّى على [[/app/node_modules]] اللي [[npm ci]] سطّبها في الـ image، وحط مكانها [[node_modules]] بتاعة ويندوز (أو مفيش خالص).

**السطر التاني** [[/app/node_modules]]: مسار من غير [[:]] قبله يعني **volume مجهول** (anonymous) بيتركّب على المسار ده. والـ volume المجهول أول مرة بيتملي من محتوى الـ image في نفس المكان. فالنتيجة: [[/app]] من جهازك، **إلا** [[node_modules]] من الـ image (نسخة لينكس). الأكتر تحديدًا بيكسب.

**السطر التالت** [[/app/.next]]: نفس الفكرة لفولدر الكاش والبناء بتاع Next، عشان ميتكتبش على ديسك ويندوز (بطيء) ومايتلخبطش مع [[.next]] لو شغّلت [[npm run dev]] على ويندوز.

جربت أشوف الـ mounts بتاعة الـ container:

~~~text docker inspect (Mounts)
volume 897c7362...  /app/node_modules
volume 8d3f9d37...  /app/.next
bind                /app
~~~

اسم الـ volume المجهول رقم عشوائي، مش اسم.

### [[environment:]] والـ polling

- [[WATCHPACK_POLLING=true]]: Watchpack هو مراقب الملفات بتاع webpack. المتغير ده بيخليه يفحص الملفات كل شوية بدل ما يستنى إشعار.
- [[CHOKIDAR_USEPOLLING=true]]: نفس الفكرة لأي أداة بتستخدم مكتبة chokidar.

ليه محتاجين ده؟ على لينكس العادي، لما ملف يتغيّر الـ kernel بيبعت إشعار (inotify) والمراقب يعيد البناء. لكن الملفات هنا على ويندوز وداخلة الـ VM بتاعة Docker Desktop عبر bind mount، والإشعار ده **مبيعدّيش**. فالمراقب لازم يسأل بنفسه.

### [[restart: unless-stopped]]

يقوم لوحده لما Docker Desktop يفتح، إلا لو وقفته بإيدك.

---

## ٣. [[next.config.js]]: الـ polling بتاع Turbopack

~~~text next.config.js
module.exports = { watchOptions: { pollIntervalMs: 1000 } };
~~~

Next 16 بيشغّل [[next dev]] بـ **Turbopack** (اللوج قال [[(Turbopack)]])، وده مش webpack، فمش بيقرا [[WATCHPACK_POLLING]]. جربت من غير الملف ده: عدّلت العنوان في [[app/page.js]] واستنيت، والصفحة فضلت القديمة. بعد ما ضفته:

~~~text اتنين curl قبل وبعد التعديل
<h1>edited once</h1>
<h1>edited twice</h1>
~~~

~~~text اللوج
✓ Compiled in 12ms
~~~

- [[module.exports]] الطريقة اللي ملف Node بيصدّر بيها قيمة (هنا إعدادات Next).
- [[watchOptions.pollIntervalMs: 1000]] افحص الملفات كل ١٠٠٠ ملي ثانية = ثانية.

ولما شغّلت [[next dev --webpack]] بدل Turbopack ومن غير الملف، [[WATCHPACK_POLLING]] لوحده اشتغل. وتوثيق Next بيقول الـ polling آخر حل لأنه بياكل CPU، والأحسن تشتغل من غير Docker أو تحط المشروع جوه WSL.

---

## ٤. [[docker-compose.prod.yml]] على السيرفر

| السطر | معناه |
|---|---|
| [[build: .]] | ابني من [[Dockerfile]] العادي (production، مش dev) |
| [[ports: ["127.0.0.1:3010:3000"]]] | 3010 على السيرفر، ومن localhost بس |
| [[env_file: [.env]]] | الأسرار من ملف على السيرفر، مش في git |
| [[restart: unless-stopped]] | يقوم بعد ريستارت السيرفر |

مفيش volumes ولا polling: الكود جوه الـ image نفسها. و [[127.0.0.1]] معناها إن الإنترنت ميوصلش للبورت ده مباشرة، Nginx اللي على نفس السيرفر بس هو اللي يعمله proxy (وده مهم لأن Docker بيعدّي ufw لو البورت مفتوح على كل الواجهات).

---

## ٥. [[docker compose up -d --build -V]] بعد مكتبة جديدة

جربت المشكلة بنفسي: ضفت مكتبة [[ms]] لـ [[package.json]]، واستخدمتها في الصفحة، وشغّلت من غير [[-V]]:

~~~bash
docker compose up -d --build
~~~

~~~text الناتج
#9 106.3 added 25 packages, and audited 26 packages in 2m
 Container teach-real01-next-web-1 Recreated
~~~

~~~text اللوج
Error: Module not found: Can't resolve 'ms'
~~~

الـ image الجديدة فيها [[ms]] فعلًا (25 package بدل 24)، بس الـ volume المجهول على [[/app/node_modules]] **مبيتمليش تاني**: بيفضل بالمحتوى القديم من أول مرة. وبعدين:

~~~bash
docker compose up -d --build -V
~~~

~~~text الصفحة
<h1>two days = 172800000 ms</h1>
~~~

[[-V]] اختصار [[--renew-anon-volumes]]: اعمل الـ volumes المجهولة من جديد بدل ما تاخدها من الـ container القديم، فتتملي من الـ image الجديدة. (الـ volumes القديمة بتفضل على الديسك من غير container. شوفها بـ [[docker volume ls --filter dangling=true]] قبل ما تمسح حاجة.)

---

## الخلاصة

| المشكلة | الحل في الملفات |
|---|---|
| node_modules بتاعة ويندوز جوه لينكس | [[npm ci]] في الـ image + volume مجهول على [[/app/node_modules]] |
| التعديل مش بيظهر | polling: [[pollIntervalMs]] مع Turbopack، أو [[WATCHPACK_POLLING]] مع webpack |
| محدش واصل للسيرفر | [[-H 0.0.0.0]] |
| مكتبة جديدة = Module not found | [[up -d --build -V]] |
| الإنتاج | من غير mounts، وعلى [[127.0.0.1]] ورا Nginx |`,
          lines: [
            "صورة Node 22 الصغيرة (Node 20 خلص دعمه في أبريل 2026).",
            "فولدر الشغل.",
            "ملفات المكتبات بس.",
            "سطّب نسخة لينكس من المكتبات جوه الـ image.",
            "شغّل dev وخليه يسمع على كل الواجهات.",
            "الخدمات.",
            "خدمة web.",
            "ابني من Dockerfile.dev.",
            "جهازك 3002 للموقع.",
            "الـ volumes.",
            "الكود من جهازك.",
            "node_modules بتاعة لينكس تغطي على بتاعة ويندوز.",
            "كاش .next منفصل.",
            "متغيرات البيئة.",
            "Next يفحص الملفات بنفسه.",
            "وأي أداة بتستخدم chokidar.",
            "يقوم لوحده بعد restart.",
            "Turbopack (الافتراضي في Next 16) يفحص الملفات كل ثانية، لأنه مبيقراش متغيرات الـ polling.",
            "ملف الإنتاج: الخدمات.",
            "خدمة web.",
            "ابني من الـ Dockerfile العادي.",
            "على 127.0.0.1 بس: Nginx يوصله، النت لأ.",
            "الأسرار من .env على السيرفر.",
            "يقوم لوحده.",
            "ابني تاني وجدّد الـ volumes المجهولة."
          ],
          sol: R`بعد [[docker compose up -d --build]] افتح [[http://localhost:3002]] هتلاقي صفحة Next.js. اللوج ([[docker compose logs -f web]]) لازم يقول [[Ready]] و [[Local: http://0.0.0.0:3000]]. الـ [[-H 0.0.0.0]] بيضمن إن Next يسمع على كل الواجهات جوه الـ container. Next 16 بيعمل كده لوحده، لكن أي سيرفر dev بيسمع على localhost بس (زي Vite من غير [[--host]]) المتصفح هيقولك معاه [[ERR_EMPTY_RESPONSE]].

عدّل كلمة في [[app/page.tsx]] واحفظ: خلال ثانية أو اتنين الصفحة بتتحدّث لوحدها، وفي اللوج [[Compiled]]. ده بسبب [[pollIntervalMs]] في [[next.config.js]]، لأن الملفات جاية من ويندوز عبر bind mount و inotify مش بيوصل، فـ Next لازم يسأل على الملفات بنفسه كل شوية. ([[WATCHPACK_POLLING]] لوحده كفاية بس لو شغّال webpack.)

لو التعديل ماظهرش غير بعد restart، الـ polling مش شغال: اتأكد إن [[next.config.js]] فيه [[watchOptions]]، ولو بتستخدم [[--webpack]] اتأكد من المتغيرات في [[docker compose exec web env]]. ولو ضفت مكتبة وطلع [[Module not found]]، ده عشان [[/app/node_modules]] volume قديم: [[docker compose up -d --build -V]] بيعمله من جديد. (جربته بـ Next.js 16.4 على Docker Desktop على ويندوز: الـ polling والـ Module not found و [[-V]].)`
        },
        {
          cmd: "verify-docker.ps1",
          title: "فحص قبل ما تشغّل المشروع على ويندوز",
          desc: R`سكربت PowerShell تشغّله أول ما تقعد: يتأكد إن Docker Desktop شغال، والبورتات فاضية، وبعدين يبني ويشغّل ويستنى لحد ما الخدمات تبقى healthy فعلًا، ولو فشل يطبع الحالة وآخر اللوجات.

ده النسخة المصلّحة. الأصلي كان فيه ست غلطات، مكتوبة تحت.`,
          example: R`# verify-docker.ps1
Set-Location $PSScriptRoot
docker info *> $null
if ($LASTEXITCODE -ne 0) { Write-Host "Docker Desktop is not running." -ForegroundColor Red; exit 1 }
$ErrorActionPreference = "Stop"
foreach ($port in 3000, 8000, 5433, 6379) {
    if (Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue) {
        Write-Warning "Port $port is already in use."
    }
}
Write-Host "Starting stack..." -ForegroundColor Cyan
docker compose up -d --build --wait --wait-timeout 120
if ($LASTEXITCODE -ne 0) {
    docker compose ps
    docker compose logs --tail 50
    throw "Stack failed to become healthy."
}
docker compose ps
Write-Host "Done! http://localhost:8000" -ForegroundColor Green`,
          try: "حط السكربت جنب docker-compose.yml في أي مشروع، وقفّل Docker Desktop وشغّله: لازم يقولك إن Docker مش شغال. شغّل Docker، وافتح حاجة على بورت 3000، وشغّله تاني وشوف التحذير.",
          flag: "script",
          deep: {
            why: "أغلب أخطاء «المشروع مش بيقوم» الصبح سببها واحد من تلاتة: Docker Desktop لسه مقامش، أو بورت محجوز من برنامج تاني، أو خدمة قامت ووقعت. السكربت بيكشفهم بالترتيب ويقولك السبب بدل رسالة compose الطويلة.",
            how: R`[[$PSScriptRoot]] هو فولدر السكربت نفسه، فيشتغل من أي مكان تشغّله منه.

[[docker info *> $null]] بيرمي كل المخرجات، والمهم [[$LASTEXITCODE]]: رقم خروج آخر برنامج خارجي. أي حاجة غير 0 يبقى Docker مش بيرد.

[[$ErrorActionPreference = "Stop"]] بعد فحص docker info مش قبله: في Windows PowerShell 5.1، أي برنامج خارجي بيكتب على stderr مع redirect و Stop بيتحوّل لخطأ يوقف السكربت، حتى لو كان مجرد تحذير.

[[Get-NetTCPConnection -State Listen]] بيجيب البورتات اللي فيه برنامج سامع عليها فعلًا.

[[up --wait --wait-timeout 120]] بيستنى لحد ما كل خدمة فيها healthcheck تبقى healthy (أو ١٢٠ ثانية)، ولو فشل الـ exit code مش صفر، فنطبع [[ps]] وآخر ٥٠ سطر لوج ونوقف بـ [[throw]].`,
            when: "أي مشروع compose على ويندوز بتشغّله كل يوم. الأوامر لوحدها في تاب PowerShell وتاب Docker.",
            mistakes: R`في مشروع حقيقي كان السكربت متنسخ بين مشروعين وفيه مسار مطلق لمشروع تالت، فكان بيبني المشروع الغلط. [[$PSScriptRoot]] بدل أي مسار ثابت.

وكان فيه سطر فيه مسار الفولدر لوحده من غير [[Set-Location]]، فـ PowerShell بيحاول ينفّذه كأمر ويقع، ومع Stop السكربت كله يقف.

وكان بيدوّر على فولدر dist مع إن الـ Dockerfile multi-stage بيبنيه بنفسه، وبيستخدم [[docker-compose]] القديم (v1)، و [[Start-Sleep 10]] بدل [[--wait]] (يا إما بيستنى زيادة يا إما أقل من اللازم).

و [[Get-NetTCPConnection]] من غير [[-State Listen]] كان بيطلع إنذارات كاذبة من اتصالات TIME_WAIT قديمة. والإيموجي في Write-Host بتطلع رموز غريبة في 5.1 لو الملف مش محفوظ UTF-8 with BOM.`
          },
          teach: R`## الأول: السكربت بيسأل ٣ أسئلة بالترتيب

1. Docker شغال أصلًا؟ لو لأ، اقف برسالة واضحة.
2. البورتات اللي المشروع محتاجها فاضية؟ لو لأ، حذّر وكمّل.
3. الخدمات قامت **وبقت healthy**؟ لو لأ، اطبع الحالة واللوجات واقف.

جربته في PowerShell 7.6 ([[pwsh]]) و Windows PowerShell 5.1 ([[powershell]]) على ويندوز، في فولدر [[teach-real01-verify]] جنب ملف compose فيه خدمة واحدة: nginx على [[127.0.0.1:8000]] بـ healthcheck. وجربت كل حالة: كله تمام، بورت محجوز، خدمة unhealthy، و Docker مش بيرد.

---

## ١. [[Set-Location $PSScriptRoot]]

- [[Set-Location]] هو [[cd]] بتاع PowerShell.
- [[$PSScriptRoot]] متغير جاهز فيه **فولدر السكربت نفسه**، مش الفولدر اللي انت واقف فيه.

ليه؟ [[docker compose]] بيدوّر على [[docker-compose.yml]] في الفولدر الحالي. لو شغّلت السكربت من [[C:\]] من غير السطر ده، compose مش هيلاقي الملف. شغّلته فعلًا من [[C:\]] واشتغل عادي بسبب السطر ده.

---

## ٢. [[docker info *> $null]]

- [[docker info]] بيسأل الـ Docker daemon عن حالته. لو Docker Desktop مقفول، بيفشل.
- [[*>]] حوّل **كل** المخرجات (العادية والأخطاء والتحذيرات) لـ...
- [[$null]]: سلة الزبالة. مش عايزين نشوف الكلام، عايزين نعرف نجح ولا لأ بس.

## ٣. [[if ($LASTEXITCODE -ne 0) { ...; exit 1 }]]

- [[$LASTEXITCODE]] رقم الخروج بتاع آخر برنامج خارجي (exe). [[0]] = نجح، أي رقم تاني = فشل.
- [[-ne]] اختصار not equal (مش بيساوي). PowerShell مبيستخدمش [[!=]].
- [[Write-Host ... -ForegroundColor Red]] اطبع بالأحمر.
- [[exit 1]] اخرج من السكربت كله برقم 1، عشان أي حد بيشغّل السكربت (أو سكربت تاني) يعرف إنه فشل.

مقدرش أقفل Docker Desktop على الجهاز ده، فعملت نفس الحالة بإني أخلي [[DOCKER_HOST]] (المتغير اللي بيقول لـ docker يكلّم الـ daemon فين) يشاور على pipe مش موجود:

~~~text docker info لوحده
failed to connect to the docker API at npipe:////./pipe/teach_real01_nothing; check if the path is correct and if the daemon is running
docker info exit=1
~~~

~~~text السكربت (في pwsh و powershell)
Docker Desktop is not running.
exit=1
~~~

---

## ٤. [[$ErrorActionPreference = "Stop"]]: ليه هنا بالظبط؟

[[$ErrorActionPreference]] بيحدد PowerShell يعمل إيه لما cmdlet يطلع خطأ. الافتراضي [[Continue]] (اطبع الخطأ وكمّل)، و [[Stop]] معناها «أي خطأ يوقف السكربت»، زي [[set -e]] في bash.

ليه بعد [[docker info]] مش قبله؟ جربت الفرق: [[Stop]] الأول وبعدين [[docker info *> $null]] و Docker مش بيرد:

~~~text Windows PowerShell 5.1
THREW: failed to connect to the docker API at npipe:////./pipe/teac
~~~

~~~text PowerShell 7
continued, exit=1
~~~

في 5.1، أي كلام على stderr من برنامج خارجي مع redirect بيتحوّل لخطأ PowerShell، و [[Stop]] بيوقف السكربت قبل ما نوصل للـ [[if]] ونطبع رسالتنا. في 7 لأ. فالترتيب ده بيخلي السكربت يشتغل صح على الاتنين.

---

## ٥. فحص البورتات

~~~powershell
foreach ($port in 3000, 8000, 5433, 6379) {
    if (Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue) {
        Write-Warning "Port $port is already in use."
    }
}
~~~

| الحتة | معناها |
|---|---|
| [[foreach ($port in 3000, 8000, 5433, 6379)]] | لف على الأرقام دي، وكل مرة حط الرقم في [[$port]] |
| [[Get-NetTCPConnection]] | هات اتصالات TCP على الجهاز |
| [[-LocalPort $port]] | اللي على البورت ده بس |
| [[-State Listen]] | اللي فيها برنامج **سامع** (مستني اتصالات)، مش اتصالات قديمة |
| [[-ErrorAction SilentlyContinue]] | لو مفيش ولا واحد، الأمر بيرمي خطأ [[No matching MSFT_NetTCPConnection objects found]]، فاسكت عليه (وده مهم لأن [[Stop]] شغال دلوقتي) |
| [[if (...)]] | لو رجع أي حاجة = البورت محجوز |
| [[Write-Warning]] | اطبع بالأصفر وقبلها [[WARNING:]]، وكمّل |

الأرقام دي بورتات المشروع: 3000 (الواجهة)، 8000 (الـ API)، 5433 (Postgres)، 6379 (Redis). عدّلها لمشروعك.

جربت حالتين. الأولى: شغّلت السكربت مرتين، فالمرة التانية لقت المشروع نفسه شغال على 8000:

~~~text الناتج
WARNING: Port 8000 is already in use.
Starting stack...
 Container teach-real01-verify-web-1 Running
 Container teach-real01-verify-web-1 Healthy
~~~

ده تحذير عادي، و compose لقى الـ container شغال فسابه. ولذلك هو تحذير مش خطأ.

التانية: برنامج تاني (سيرفر Python) واخد [[127.0.0.1:8000]]، فـ compose مقدرش يحجزه:

~~~text الناتج
WARNING: Port 8000 is already in use.
Starting stack...
Error response from daemon: ports are not available: exposing port TCP 127.0.0.1:8000 -> 127.0.0.1:0: listen tcp4 127.0.0.1:8000: bind: Only one usage of each socket address (protocol/network address/port) is normally permitted.
~~~

والتحذير اللي فوق قالك السبب قبل الرسالة الطويلة دي.

---

## ٦. [[docker compose up -d --build --wait --wait-timeout 120]]

| الحتة | معناها |
|---|---|
| [[up -d]] | شغّل كل الخدمات في الخلفية |
| [[--build]] | ابني الـ images اللي ليها [[build:]] من جديد |
| [[--wait]] | استنى لحد ما كل خدمة تبقى running، واللي ليها healthcheck تبقى **healthy** |
| [[--wait-timeout 120]] | ومتستناش أكتر من ١٢٠ ثانية |

لو خدمة بقت unhealthy أو الوقت خلص، compose بيخرج برقم غير صفر. وده أحسن من [[Start-Sleep 10]] اللي كان في النسخة القديمة: مش بيستنى أكتر من اللازم ولا أقل.

## ٧. لو فشل: [[if ($LASTEXITCODE -ne 0) { ... }]]

~~~powershell
docker compose ps
docker compose logs --tail 50
throw "Stack failed to become healthy."
~~~

- [[docker compose ps]]: حالة كل خدمة.
- [[docker compose logs --tail 50]]: آخر ٥٠ سطر من لوج كل خدمة، وغالبًا السبب فيهم.
- [[throw]]: ارمي خطأ يوقف السكربت برسالة، ورقم الخروج بيبقى 1.

جربت healthcheck بيفحص بورت غلط عشان الخدمة تبقى unhealthy:

~~~text الناتج (pwsh)
 Container teach-real01-verify-web-1 Waiting
container teach-real01-verify-web-1 is unhealthy
NAME                        IMAGE          STATUS                     PORTS
teach-real01-verify-web-1   nginx:alpine   Up 7 seconds (unhealthy)   127.0.0.1:8000->80/tcp
web-1  | ... (لوج nginx)
Exception: ...\verify-docker.ps1:16
Line |
  16 |      throw "Stack failed to become healthy."
     | Stack failed to become healthy.
exit=1
~~~

ولاحظ: الـ container **شغال** ([[Up 7 seconds]]) بس unhealthy. من غير [[--wait]] كنت هتفتكر كله تمام. وفي 5.1 نفس الرسالة بشكل أقدم ([[At ...verify-docker.ps1:16 char:5]] و [[CategoryInfo]]).

---

## ٨. النهاية لما كله تمام

~~~text الناتج
Starting stack...
 Network teach-real01-verify_default Created
 Container teach-real01-verify-web-1 Started
 Container teach-real01-verify-web-1 Waiting
 Container teach-real01-verify-web-1 Healthy
NAME                        IMAGE          STATUS                   PORTS
teach-real01-verify-web-1   nginx:alpine   Up 2 seconds (healthy)   127.0.0.1:8000->80/tcp
Done! http://localhost:8000
exit=0
~~~

[[docker compose ps]] الأخيرة بتوريك إن كل حاجة [[(healthy)]]، وبعدها الرابط بالأخضر.

---

## الخلاصة

| الخطوة | الأمر | لو فشل |
|---|---|---|
| مكان الشغل | [[Set-Location $PSScriptRoot]] | — |
| Docker شغال؟ | [[docker info]] + [[$LASTEXITCODE]] | رسالة حمرا و [[exit 1]] |
| من هنا أي خطأ يوقف | [[$ErrorActionPreference = "Stop"]] | (بعد docker info عشان 5.1) |
| البورتات | [[Get-NetTCPConnection -State Listen]] | تحذير وكمّل |
| التشغيل والانتظار | [[up --wait --wait-timeout 120]] | ps + logs + [[throw]] |

ولو PowerShell رفض يشغّل الملف بـ [[running scripts is disabled]]: [[powershell -ExecutionPolicy Bypass -File .\verify-docker.ps1]].`,
          lines: [
            "اشتغل من فولدر السكربت، مش من مكان ثابت.",
            "اسأل Docker، وارمي المخرجات.",
            "لو مردّش: رسالة واضحة واخرج.",
            "من هنا أي خطأ يوقف السكربت.",
            "لف على البورتات اللي المشروع محتاجها.",
            "فيه برنامج سامع على البورت ده؟",
            "حذّر (ممكن يبقى نسخة قديمة من نفس المشروع).",
            "قفلة الـ if.",
            "قفلة الـ foreach.",
            "رسالة بداية.",
            "ابني وشغّل واستنى الـ healthchecks لحد دقيقتين.",
            "لو فشل:",
            "اعرض حالة كل خدمة.",
            "وآخر ٥٠ سطر لوج.",
            "ووقّف برسالة.",
            "قفلة الـ if.",
            "الحالة النهائية.",
            "الرابط."
          ],
          sol: R`وDocker Desktop مقفول، السكربت بيوقف عند أول سطر ويطبع بالأحمر [[Docker Desktop is not running.]] والـ exit code [[1]]. لاحظ إن [[docker info]] بيتنفّذ قبل [[$ErrorActionPreference = "Stop"]] عشان فشله مايرميش exception، وبنقرا [[$LASTEXITCODE]] بنفسنا.

لو في حاجة تانية فاتحة 3000 (زي [[npx serve -l 3000]])، هيطلع تحذير أصفر [[WARNING: Port 3000 is already in use.]] ويكمّل. بعدها [[docker compose up --wait]] هيفشل غالبًا بـ [[port is already allocated]]، فالسكربت هيطبع [[docker compose ps]] وآخر ٥٠ سطر لوج ويرمي [[Stack failed to become healthy.]]. ولو كله تمام، هتلاقي [[Done! http://localhost:8000]] بالأخضر.

لو PowerShell رفض يشغّله بـ [[running scripts is disabled]] شغّله بـ [[powershell -ExecutionPolicy Bypass -File .\verify-docker.ps1]]. (جربته في PowerShell 7.6 و Windows PowerShell 5.1 مع Docker Desktop: حالة Docker مش بيرد اتعملت بـ [[DOCKER_HOST]] بيشاور على pipe مش موجود، والبورت المحجوز ببرنامج Python سامع على 8000. ورسالة Docker لما البورت محجوز على ويندوز بتبقى [[ports are not available ... bind: Only one usage of each socket address]].)`
        }
      ]
    }
  ]
});
