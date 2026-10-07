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
    },
    {
      t: "الواجهة والتطبيقات",
      l: 1,
      n: "screenshots بكل المقاسات، و Electron على ويندوز، و APK من موقع React",
      items: [
        {
          cmd: "PWA محلي + screenshots",
          title: "تجرّب PWA على جهازك وتصوّرها بكل المقاسات",
          desc: R`الـ service worker مبيشتغلش من [[file://]]، فالـ PWA لازم تتفتح من سيرفر حتى وانت بتجرّب. [[python -m http.server]] كفاية.

وبدل ما تغيّر حجم المتصفح بإيدك، Playwright بيصوّر الصفحة بأي مقاس في أمر واحد، فتقارن الموبايل والتابلت والديسكتوب جنب بعض.`,
          example: R`# 1) سيرفر static (الـ service worker مبيشتغلش من file://)
cd site
python -m http.server 8791
# 2) من ترمنال تاني
npx playwright install chromium
npx playwright screenshot --viewport-size "1440,900" http://localhost:8791 shot-desktop.png
npx playwright screenshot --viewport-size "800,1000" http://localhost:8791 shot-tablet.png
npx playwright screenshot --viewport-size "390,844" --full-page http://localhost:8791 shot-mobile.png
echo "shot-*.png" >> .gitignore
# 3) لو الصفحة لسه قديمة بعد التعديل، من Console في المتصفح:
# navigator.serviceWorker.getRegistrations().then(rs => rs.forEach(r => r.unregister()))`,
          try: "اعمل فولدر فيه index.html بسيط وشغّل السيرفر، وصوّره بالتلات مقاسات وافتح الصور جنب بعض. بعدين غيّر الـ viewport لـ 360,640 (موبايل صغير) وشوف إيه اللي اتكسر.",
          deep: {
            why: "الـ PWA (manifest و sw.js) بتخلي الموقع يتسطّب زي تطبيق ويشتغل من غير نت. بس المتصفح مش بيسجّل service worker غير على https أو localhost، فلازم سيرفر. والتأكد إن التصميم سليم على كل مقاس بإيدك ممل وبيتنسي.",
            how: R`[[python -m http.server 8791]] سيرفر static من الفولدر الحالي، مفيش تسطيب. بعدها DevTools ← Application بيوريك الـ Manifest والـ Service Workers وهل اتسجلوا.

[[npx playwright install chromium]] بينزّل متصفح Chromium خاص بـ Playwright مرة واحدة.

[[playwright screenshot]] بيفتح الصفحة في متصفح من غير شاشة بالمقاس اللي في [[--viewport-size]] ويحفظ صورة. و [[--full-page]] بيصوّر الصفحة كلها بالطول مش اللي باين بس.

والـ service worker بيفضل ماسك النسخة القديمة من الملفات. الكود اللي في آخر المثال بيلغي تسجيله من Console، والحل الدائم إنك تغيّر اسم الكاش في sw.js مع كل نسخة.`,
            when: "أي موقع قبل ما ترفعه، وأي PWA وانت بتطوّرها. أوامر Python لوحدها في تاب Python، والـ DevTools في تاب المتصفح.",
            mistakes: R`في مشروع حقيقي كان sw.js بيستخدم cache-first لكل حاجة، فأي تعديل في index.html مش بيوصل للزوار إلا لو اسم الكاش اتغيّر ([[const CACHE = 'myapp-v2']]). اعمل HTML بـ network-first.

والأيقونات icon-192 و icon-512 اللي في الـ manifest مكانتش موجودة، والـ Console كان بيطلع 404 عليها وعلى favicon، فالموقع مش بيتسطّب. ووسم [[apple-mobile-web-app-capable]] قديم.

والفولدر كان مليان عشرات الـ screenshots جنب الكود. حطهم في فولدر لوحدهم أو في .gitignore.`
          },
          teach: R`## الأول: ٣ خطوات في ترمنالين

1. سيرفر صغير يخدم فولدر الموقع (ترمنال لوحده، لأنه بيفضل شغال).
2. من ترمنال تاني: Playwright يصوّر الصفحة بـ ٣ مقاسات.
3. لو المتصفح ماسك نسخة قديمة: سطر JavaScript في الـ Console يشيل الـ service worker.

جربت ده على ويندوز: موقع صغير فيه [[index.html]] و [[manifest.json]] و [[sw.js]]، و Python 3.14، و Playwright 1.63.

---

## ١. السيرفر

### [[cd site]]

ادخل الفولدر اللي فيه [[index.html]]. السيرفر هيخدم الفولدر اللي انت واقف فيه.

### [[python -m http.server 8791]]

- [[python -m]] شغّل module من مكتبة Python الجاهزة كأنه برنامج (m = module).
- [[http.server]] سيرفر ملفات static جاي مع Python، مفيش تسطيب.
- [[8791]] البورت. أي رقم فاضي، بعيد عن 3000 و 8000 المشهورين.

~~~text الناتج
Serving HTTP on :: port 8791 (http://[::]:8791/) ...
::1 - - [07/Oct/2026 16:47:25] "GET / HTTP/1.1" 200 -
~~~

- [[::]] يعني سامع على كل الواجهات (IPv6 و IPv4).
- كل طلب بيظهر سطر: مين طلب ([[::1]] = localhost بـ IPv6)، والوقت، والطلب، والـ status ([[200]] = تمام).

السيرفر بيفضل شغال لحد ما تدوس Ctrl+C، عشان كده الخطوات الجاية في ترمنال تاني.

### ليه مش تفتح الملف بدبل كليك؟

دبل كليك بيفتحه بـ [[file:///C:/...]]، والمتصفح مبيسجّلش service worker غير على [[https]] أو [[localhost]]. جربت أسجّله من [[file://]]:

~~~text الناتج
Failed to register a ServiceWorker: The URL protocol of the current origin ('null') is not supported.
~~~

ومن [[http://localhost:8791]] الـ Console طبع:

~~~text الناتج
SW registered http://localhost:8791/
~~~

---

## ٢. الصور

### [[npx playwright install chromium]]

[[npx playwright]] بيشغّل أداة Playwright (وبينزّلها لو مش موجودة). [[install chromium]] بينزّل نسخة Chromium خاصة بيه، مش Chrome اللي عندك:

~~~text الناتج (مختصر)
Downloading Chrome Headless Shell 153.0.8010.12 (playwright chromium-headless-shell v1243)
Chrome Headless Shell ... downloaded to ...\ms-playwright\chromium_headless_shell-1243
~~~

ده بيحصل **مرة واحدة**، والنسخة بتتحفظ في [[%LOCALAPPDATA%\ms-playwright]] (على لينكس [[~/.cache/ms-playwright]]). وخد بالك إنها كبيرة: الفولدر عندي بقى حوالي 700MB بعد التنزيل. (أنا حطيته في فولدر مؤقت بمتغير [[PLAYWRIGHT_BROWSERS_PATH]] ومسحته بعد التجربة.)

### [[npx playwright screenshot --viewport-size "1440,900" http://localhost:8791 shot-desktop.png]]

| الحتة | معناها |
|---|---|
| [[screenshot]] | افتح الصفحة في متصفح من غير شاشة (headless) وصوّرها |
| [[--viewport-size "1440,900"]] | مقاس الشاشة: عرض 1440 وطول 900 بكسل. بين علامتين تنصيص عشان الفاصلة متتفهمش غلط |
| [[http://localhost:8791]] | الصفحة |
| [[shot-desktop.png]] | اسم الصورة |

~~~text الناتج
Navigating to http://localhost:8791
Capturing screenshot into shot-desktop.png
~~~

### التلات مقاسات

قريت عرض وطول كل صورة من ملف الـ PNG نفسه:

~~~text مقاسات الصور
shot-desktop.png  1440 × 900
shot-tablet.png    800 × 1000
shot-mobile.png    390 × 1482
~~~

- 1440 عرض لابتوب شائع، و 800 تابلت، و 390 عرض iPhone 12 و 13 و 14 بالـ CSS pixels.
- الموبايل طوله 1482 مش 844، ليه؟ بسبب [[--full-page]]: صوّر الصفحة **كلها** بالطول، مش اللي باين في الشاشة بس. الكروت اللي كانت جنب بعض على الديسكتوب نزلت تحت بعض على 390، فالصفحة طولت.

### [[echo "shot-*.png" >> .gitignore]]

- [[echo "..."]] اطبع النص ده.
- [[>>]] ضيفه في **آخر** الملف (لو [[>]] واحدة كان هيمسح الملف ويكتب السطر لوحده).
- [[shot-*.png]] النجمة يعني أي حاجة، فكل الصور اللي بتبدأ بـ [[shot-]] git هيتجاهلها.

---

## ٣. الـ service worker الماسك في القديم

~~~text الكود (في Console المتصفح)
navigator.serviceWorker.getRegistrations().then(rs => rs.forEach(r => r.unregister()))
~~~

فكّه من الشمال:

- [[navigator.serviceWorker]] واجهة المتصفح للـ service workers.
- [[.getRegistrations()]] هات كل الـ service workers المتسجلة للموقع ده. بترجع Promise (نتيجة هتيجي بعدين).
- [[.then(rs => ...)]] لما النتيجة تيجي، حطها في [[rs]] (قايمة).
- [[rs.forEach(r => r.unregister())]] لكل واحد، الغي تسجيله.

جربته بـ Playwright على نفس الصفحة:

~~~text الناتج
regs: 1
unregister: [ true ]
regs after: 0
~~~

كان فيه واحد متسجّل، اتلغى ([[true]])، وبقى صفر. بعدها اعمل refresh والصفحة تيجي من السيرفر. ده حل وقتي لجهازك، لكن الزوار محتاجين اسم كاش جديد في [[sw.js]].

---

## الخلاصة

| الخطوة | الأمر |
|---|---|
| سيرفر للفولدر | [[python -m http.server 8791]] |
| المتصفح (مرة واحدة) | [[npx playwright install chromium]] |
| صورة بمقاس | [[npx playwright screenshot --viewport-size "W,H" URL file.png]] |
| الصفحة كلها بالطول | [[--full-page]] |
| شيل الـ SW القديم | [[getRegistrations()]] ثم [[unregister()]] |

والـ PWA لازم تتجرّب من [[localhost]] أو [[https]]، عمرها ما هتشتغل من [[file://]].`,
          lines: [
            "ادخل فولدر الموقع.",
            "سيرفر static على 8791.",
            "نزّل المتصفح بتاع Playwright (مرة واحدة).",
            "صورة بمقاس ديسكتوب.",
            "صورة بمقاس تابلت.",
            "صورة موبايل بطول الصفحة كلها.",
            "متدخّلش الصور في git."
          ],
          sol: R`جربت الـ [[npx playwright screenshot]] على سيرفر محلي وطبع [[Navigating to http://localhost:8791]] و [[Capturing screenshot into shot-mobile.png]]. هتلاقي ٣ صور: [[shot-desktop.png]] بـ 1440×900، و [[shot-tablet.png]] بـ 800×1000، و [[shot-mobile.png]] بعرض 390 وطول الصفحة كلها (بسبب [[--full-page]]).

على 360×640 اللي بيتكسر عادةً: عنصر بعرض ثابت بيعمل سكرول أفقي، عنوان طويل بيخرج بره الشاشة، أزرار جنب بعض بتتزنق، أو صورة من غير [[max-width: 100%]]. ولو الصفحة كلها طالعة صغيرة جدًا، يبقى ناقص [[<meta name="viewport" content="width=device-width, initial-scale=1">]].

لو طلع [[Executable doesn't exist]] يبقى نسيت [[npx playwright install chromium]]. و [[echo "shot-*.png" >> .gitignore]] عشان الصور ماتترفعش. ولو عدّلت الصفحة وفضلت شايف القديم في المتصفح، ده الـ service worker، والسطر اللي في آخر المثال بيشيله.`
        },
        {
          cmd: "shots.ps1",
          title: "صوّر صفحات موقعك بـ Chrome من غير أي مكتبة",
          desc: R`Chrome نفسه يقدر يصوّر صفحة من غير ما يفتح شباك: [[--headless=new]] و [[--screenshot]]. السكربت ده بيعدّي على قايمة صفحات، كل واحدة بطول مختلف، ويقولك أنهي صورة نجحت.

مفيش npm install ولا Playwright، و Chrome موجود أصلًا. ومعاه تتعلم hashtables و foreach و [[Start-Process -Wait]] في شغل حقيقي.`,
          example: R`$outDir = Join-Path $env:TEMP "shots"
New-Item -ItemType Directory -Force $outDir | Out-Null
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chrome)) { $chrome = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" }
$targets = @(
  @{ file = "01_home.png";     url = "http://localhost:3000/";         h = 950 },
  @{ file = "02_checkout.png"; url = "http://localhost:3000/checkout"; h = 900 },
  @{ file = "03_contact.png";  url = "http://localhost:3000/contact";  h = 1000 }
)
foreach ($t in $targets) {
  $out = Join-Path $outDir $t.file
  Remove-Item $out -ErrorAction SilentlyContinue
  $chromeArgs = @("--headless=new", "--disable-gpu", "--no-first-run",
                  "--user-data-dir=$env:TEMP\shot-profile",
                  "--window-size=1440,$($t.h)", "--virtual-time-budget=4000",
                  "--screenshot=$out", $t.url)
  Start-Process $chrome -ArgumentList $chromeArgs -Wait
  if (Test-Path $out) { Write-Host "OK   $($t.file)" } else { Write-Host "FAIL $($t.file)" }
}
Invoke-Item $outDir`,
          try: "شغّل أي موقع على localhost:3000 وعدّل الـ targets لصفحاتك، وشغّل السكربت. بعدين غيّر 1440 لـ 390 وشوف نسخة الموبايل.",
          flag: "script",
          deep: {
            why: "محتاج صور لصفحاتك قبل الرفع، أو للـ README، أو تبعتها لعميل. تسطيب Playwright أو Puppeteer لحاجة زي دي تقيل، و Chrome على جهازك يقدر يعملها لوحده.",
            how: R`[[@( @{...}, @{...} )]] مصفوفة من hashtables: كل صفحة ليها اسم ملف ورابط وطول. و [[$t.file]] بيقرا القيمة من الـ hashtable.

[[--headless=new]] وضع headless الجديد (نفس محرك Chrome العادي). [[--user-data-dir]] بروفايل منفصل، فمش هيتخانق مع Chrome المفتوح عندك ولا يستخدم الـ extensions بتاعتك. [[--virtual-time-budget=4000]] بيدّي الصفحة ٤ ثواني «افتراضية» تحمّل الخطوط والصور والـ JavaScript قبل التصوير.

[[$($t.h)]] جوه string معناها «احسب التعبير ده وحطه هنا». من غير [[$( )]] PowerShell هيكتب [[$t]] وبعدين [[.h]] كنص.

[[Start-Process -Wait]] بيستنى Chrome يخلص قبل ما يكمّل، فـ [[Test-Path]] بعدها بيشوف الصورة فعلًا. و [[Invoke-Item]] بيفتح الفولدر في Explorer.`,
            when: "صور سريعة من غير تسطيب أي حاجة. لو محتاج تضغط زراير أو تسجّل دخول قبل الصورة، ده شغل Playwright. أساسيات PowerShell في تاب PowerShell.",
            mistakes: R`في مشروع حقيقي كانت المسارات كاملة فيها اسم اليوزر ([[C:\Users\you\...]])، فالسكربت ميشتغلش على جهاز تاني. [[$env:TEMP]] بدلها.

وكان [[--no-sandbox]] موجود، ومش محتاجه على ويندوز (ده بيقفل حماية).

ومكانش بيمسح الصورة القديمة قبل ما يصوّر، فلو التصوير فشل [[Test-Path]] بيلاقي الصورة القديمة ويقول OK. عشان كده [[Remove-Item]] الأول.

ونسخة تانية كانت بتشغّل Chrome بـ [[&]] من غير [[-Wait]] وبتعتمد على [[Start-Sleep]]. واسم المتغير كان [[$args]]، ودا متغير محجوز في PowerShell فيه arguments السكربت نفسه.`
          },
          teach: R`## الأول: الفكرة في سطر

Chrome نفسه عنده وضع من غير شباك (headless) يقدر يفتح رابط ويحفظ صورة ويقفل. السكربت ده بيعمل كده لكل صفحة في قايمة، وبيتأكد إن الصورة اتعملت فعلًا.

جربته في PowerShell 7.6 و Windows PowerShell 5.1 مع Chrome 154، على سيرفر محلي على 3000 فيه ٣ صفحات ([[/]] و [[/checkout]] و [[/contact]]). الاتنين طلّعوا نفس النتيجة، والسكربت كله خلص في حوالي ٣ ثواني.

---

## ١. فولدر الصور

~~~powershell
$outDir = Join-Path $env:TEMP "shots"
New-Item -ItemType Directory -Force $outDir | Out-Null
~~~

- [[$outDir]] متغير. في PowerShell أي متغير بيبدأ بـ [[$]].
- [[$env:TEMP]] متغير البيئة [[TEMP]]: فولدر الملفات المؤقتة بتاع اليوزر ([[C:\Users\ali\AppData\Local\Temp]]). موجود على أي ويندوز، فالسكربت يشتغل على أي جهاز من غير ما تكتب اسمك.
- [[Join-Path]] بيلزق جزئين مسار بالـ [[\]] الصح. أحسن من [[$env:TEMP + "\shots"]] لأنه مبيغلطش في الشرط.
- [[New-Item -ItemType Directory]] اعمل فولدر. و [[-Force]]: لو موجود متعملش خطأ.
- [[| Out-Null]] [[New-Item]] بيطبع معلومات الفولدر اللي عمله، و [[Out-Null]] بيرميها.

---

## ٢. مكان Chrome

~~~powershell
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chrome)) { $chrome = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" }
~~~

- [[Test-Path]] بيرجع [[True]] لو المسار موجود و [[False]] لو لأ.
- [[-not (...)]] اعكس النتيجة. يعني «لو Chrome **مش** في المكان الأول».
- [[Program Files (x86)]] المكان اللي كانت بتتسطب فيه نسخة الـ 32 بت في الأجهزة القديمة.

---

## ٣. قايمة الصفحات: array من hashtables

~~~powershell
$targets = @(
  @{ file = "01_home.png";     url = "http://localhost:3000/";         h = 950 },
  @{ file = "02_checkout.png"; url = "http://localhost:3000/checkout"; h = 900 },
  @{ file = "03_contact.png";  url = "http://localhost:3000/contact";  h = 1000 }
)
~~~

- [[@( ... )]] array: قايمة عناصر مفصولة بفواصل.
- [[@{ ... }]] hashtable: مجموعة «مفتاح = قيمة» مفصولة بـ [[;]]. هنا كل صفحة ليها ٣ مفاتيح:

| المفتاح | معناه |
|---|---|
| [[file]] | اسم الصورة. الأرقام [[01_]] في الأول عشان تترتّب في الفولدر |
| [[url]] | الصفحة |
| [[h]] | طول النافذة بالبكسل |

ولما تكتب [[$t.file]] بتجيب القيمة بتاعة المفتاح [[file]] من الـ hashtable اللي في [[$t]].

---

## ٤. اللوب: [[foreach ($t in $targets) { ... }]]

لكل عنصر في [[$targets]]، حطه في [[$t]] ونفّذ اللي بين القوسين.

### [[$out = Join-Path $outDir $t.file]]

المسار الكامل للصورة، مثلًا [[C:\Users\ali\AppData\Local\Temp\shots\01_home.png]].

### [[Remove-Item $out -ErrorAction SilentlyContinue]]

امسح الصورة لو موجودة من مرة قبل كده. و [[-ErrorAction SilentlyContinue]] عشان أول مرة الملف مش موجود، و [[Remove-Item]] هيشتكي.

ليه؟ لأن الفحص في الآخر بيسأل «الملف موجود؟». لو الصورة القديمة لسه هناك والتصوير فشل، الفحص هيقول OK وهو كداب.

### الـ arguments بتاعة Chrome

~~~powershell
$chromeArgs = @("--headless=new", "--disable-gpu", "--no-first-run",
                "--user-data-dir=$env:TEMP\shot-profile",
                "--window-size=1440,$($t.h)", "--virtual-time-budget=4000",
                "--screenshot=$out", $t.url)
~~~

array فيه كل كلمة هتتبعت لـ Chrome. السطر ممكن يتكسر على أكتر من سطر لأن القوس لسه مفتوح.

| الـ flag | معناه |
|---|---|
| [[--headless=new]] | من غير شباك، بوضع headless الجديد (نفس Chrome العادي من جوه) |
| [[--disable-gpu]] | متستخدمش كارت الشاشة، أضمن في الوضع ده |
| [[--no-first-run]] | متعرضش شاشات «أول مرة» (welcome وغيره) |
| [[--user-data-dir=...\shot-profile]] | بروفايل منفصل في Temp، فمش بيلمس Chrome المفتوح عندك ولا الـ extensions بتاعتك. (عندي بقى حوالي 12MB) |
| [[--window-size=1440,950]] | مقاس النافذة = مقاس الصورة |
| [[--virtual-time-budget=4000]] | ادّي الصفحة ٤٠٠٠ ملي ثانية «افتراضية» تحمّل وتشغّل JavaScript قبل التصوير |
| [[--screenshot=$out]] | صوّر واحفظ هنا |
| [[$t.url]] | الصفحة (آخر حاجة) |

### [[$($t.h)]]: ليه الـ [[$( )]]؟

جوه string بعلامتين تنصيص، PowerShell بيبدّل المتغيرات البسيطة لوحده: [[$out]] تمام. لكنه بيقف عند النقطة. فلو كتبت [[1440,$t.h]] هيبدّل [[$t]] بس ويسيب [[.h]] زي ما هي. جربتها:

~~~text الناتج
--window-size=1440,System.Collections.Hashtable.h
--window-size=1440,950
~~~

الأول من غير [[$( )]] والتاني بيها. [[$( ... )]] معناها «احسب التعبير ده كله وحط النتيجة هنا»، فتطلع [[1440,950]].

### [[Start-Process $chrome -ArgumentList $chromeArgs -Wait]]

- [[Start-Process]] شغّل برنامج.
- [[-ArgumentList]] الـ arguments بتاعته (الـ array اللي عملناه).
- [[-Wait]] **استنى** لحد ما البرنامج يقفل قبل ما تكمّل. من غيرها السطر اللي بعده هيدوّر على الصورة قبل ما Chrome يلحق يحفظها.

### الفحص

~~~powershell
if (Test-Path $out) { Write-Host "OK   $($t.file)" } else { Write-Host "FAIL $($t.file)" }
~~~

الصورة موجودة؟ اطبع OK، وإلا FAIL. والمسافات بعد [[OK]] عشان الأسامي تيجي تحت بعض.

~~~text الناتج
OK   01_home.png
OK   02_checkout.png
OK   03_contact.png
~~~

قريت مقاسات الصور من ملفات الـ PNG:

~~~text مقاسات الصور
01_home.png      1440 × 950
02_checkout.png  1440 × 900
03_contact.png   1440 × 1000
~~~

كل صورة طولها الـ [[h]] بتاعها بالظبط. ولما قفلت السيرفر وشغّلت السكربت تاني:

~~~text الناتج
FAIL 01_home.png
FAIL 02_checkout.png
FAIL 03_contact.png
~~~

Chrome مبيحفظش صورة لصفحة مفيش سيرفر يرد عليها، والـ [[Remove-Item]] اللي فوق خلّى الفحص صادق.

---

## ٥. [[Invoke-Item $outDir]]

[[Invoke-Item]] «افتح الحاجة دي بالبرنامج الافتراضي بتاعها». لفولدر يعني Explorer، ولصورة يعني عارض الصور.

---

## الخلاصة

| الخطوة | الأداة |
|---|---|
| فولدر من غير اسمك | [[Join-Path $env:TEMP]] + [[New-Item -Force]] |
| Chrome فين | [[Test-Path]] على المكانين |
| الصفحات | array من hashtables، و [[$t.file]] |
| فحص صادق | [[Remove-Item]] قبل، و [[Test-Path]] بعد |
| حساب جوه string | [[$($t.h)]] |
| استنى Chrome | [[Start-Process -Wait]] |

ولو عايز موبايل غيّر [[1440]] لـ [[390]]، بس ده بيغيّر حجم النافذة بس، مش device emulation كامل (مفيش touch ولا user agent موبايل).`,
          lines: [
            "فولدر الصور في Temp، مش مسار فيه اسمك.",
            "اعمله لو مش موجود، واسكت.",
            "مكان Chrome العادي.",
            "ولو مش هناك، جرّب نسخة الـ 32 بت.",
            "قايمة الصفحات:",
            "الرئيسية بطول 950.",
            "صفحة الدفع.",
            "صفحة التواصل.",
            "قفلة القايمة.",
            "لف على كل صفحة.",
            "مسار الصورة.",
            "امسح القديمة عشان الفحص يبقى صادق.",
            "arguments بتاعة Chrome: من غير شباك.",
            "بروفايل منفصل.",
            "المقاس، ووقت للتحميل.",
            "فين يحفظ، وأي رابط.",
            "شغّل Chrome واستنى يخلص.",
            "الصورة اتعملت؟",
            "قفلة الـ foreach.",
            "افتح الفولدر."
          ],
          sol: R`السكربت بيطبع سطر لكل صفحة: [[OK   01_home.png]] لو الصورة اتعملت، و [[FAIL ...]] لو لأ، وفي الآخر بيفتح فولدر [[%TEMP%\shots]]. كل صورة عرضها 1440 وطولها الـ [[h]] اللي في الـ target.

لما تغيّر [[1440]] لـ [[390]] هتاخد نسخة الموبايل، بس خد بالك إن [[--window-size]] بيغيّر حجم النافذة بس، مش بيعمل device emulation كامل (مفيش touch ولا user agent موبايل). فالنتيجة قريبة من Device Toolbar على Responsive، مش iPhone حقيقي.

لو كل الصفحات طلعت FAIL، غالبًا الموقع مش شغال على 3000 (جربت كده: Chrome مبيحفظش صورة لصفحة مفيهاش سيرفر، فالتلاتة طلعوا FAIL)، أو مسار Chrome غلط (غيّر [[$chrome]]). ولو الصورة بيضا أو ناقصة، زوّد [[--virtual-time-budget]] عشان JavaScript يلحق يرسم. (جربته في PowerShell 7.6 و Windows PowerShell 5.1 مع Chrome 154، والتلات صور طلعوا بالمقاسات 1440×950 و 1440×900 و 1440×1000.)`
        },
        {
          cmd: "launch.sh / launch.bat",
          title: "زرار تشغيل لتطبيق Electron على لينكس وويندوز",
          desc: R`نفس المنطق بلغتين: اتأكد إن Node موجود و .env موجود، سطّب المكتبات أول مرة، ابني الواجهة لو الكود أحدث من آخر build، وشغّل Electron.

مقارنة مباشرة بين bash و batch: [[test -f .env]] قصاد [[if not exist .env]]، و [[||]] في الاتنين معناها «لو فشل».`,
          example: R`#!/usr/bin/env bash
# launch.sh (لينكس)
set -euo pipefail
cd "$(dirname "$0")"
command -v node >/dev/null || { echo "install Node first"; exit 1; }
[ -f .env ] || { echo ".env missing: cp .env.example .env"; exit 1; }
[ -d node_modules ] || npm install
SB=node_modules/electron/dist/chrome-sandbox
[ -e "$SB" ] || node node_modules/electron/install.js
if [ "$(stat -c '%u %a' "$SB")" != "0 4755" ]; then
  sudo chown root:root "$SB" && sudo chmod 4755 "$SB"
fi
if [ ! -f dist/index.html ] || [ -n "$(find src -newer dist/index.html -print -quit)" ]; then
  npx vite build
fi
exec npx electron .
REM launch.bat (ويندوز): نفس الخطوات
@echo off
cd /d "%~dp0"
where node >nul 2>&1 || ( echo install Node first & pause & exit /b 1 )
if not exist .env ( echo .env missing & pause & exit /b 1 )
if not exist node_modules ( call npm install || (pause & exit /b 1) )
call npx vite build || (pause & exit /b 1)
npx electron .`,
          try: "في مشروع Electron + Vite تجريبي حط الملفين، وشغّل launch.bat بدبل كليك. امسح .env وشغّله تاني وشوف الرسالة. على لينكس عدّل ملف في src ولاحظ إنه بيعيد البناء، وشغّله تاني من غير تعديل ولاحظ إنه مبيبنيش.",
          flag: "script",
          deep: {
            why: "تطبيق Electron محتاج كذا خطوة قبل ما يقوم (مكتبات، build للواجهة، .env). لو اعتمدت إنك فاكرها، هتنسى واحدة وتضيّع وقت على «شاشة بيضا». الـ launcher بيعملها بالترتيب ويقف برسالة واضحة.",
            how: R`[[cd "$(dirname "$0")"]] و [[cd /d "%~dp0"]] نفس الفكرة: ادخل فولدر السكربت نفسه، فالدبل كليك أو التشغيل من أي مكان يشتغل.

[[command -v node]] و [[where node]] بيدوّروا على البرنامج في PATH.

chrome-sandbox على لينكس لازم يبقى ملك root وعليه setuid ([[4755]])، وإلا Electron يرفض يقوم. [[stat -c '%u %a']] بيطبع رقم المالك والصلاحيات، فنصلّحهم مرة واحدة بس. وفي نسخ Electron الجديدة (جربت 44) الـ [[npm install]] مبينزّلش البرنامج نفسه (بيتنزّل أول ما تشغّله)، فـ chrome-sandbox مبيبقاش موجود وقت الفحص؛ عشان كده [[node node_modules/electron/install.js]] الأول لو الملف مش موجود.

[[find src -newer dist/index.html -print -quit]] بيطبع أول ملف في src اتعدّل بعد آخر build ويقف. لو الناتج مش فاضي ([[-n]]) يبقى محتاج build.

[[exec]] بيستبدل الـ shell بـ Electron، فإشارة الإغلاق توصله هو مباشرة. وفي batch لازم [[call]] قبل npm و npx (دول ملفات .cmd) وإلا السكربت يخلص بعدهم ومايكملش.`,
            when: "أي تطبيق Electron أو أداة داخلية بتشغّلها كل يوم أو بتديها لحد مش مبرمج. أساسيات bash و CMD في تاباتهم، و Electron نفسه في تاب Desktop و Mobile.",
            mistakes: R`في مشروع حقيقي كانت نسخة bash من غير [[set -e]]، ولو node_modules مش موجودة مكانتش بتعمل [[npm install]]، فأول تشغيل على جهاز جديد يقع.

وفحص «الكود أحدث من الـ build» كان [[-nt]] على ملفين بس، فتعديل أي ملف تاني في src ميعملش rebuild والتطبيق يفضل قديم. [[find -newer]] بيشوف الفولدر كله.

والنسخة الـ bat كانت بتبني أول مرة بس، وبعد كده عمرها ما بتعيد البناء. هنا بتبني كل مرة (Vite سريع). ومكانش فيه فحص إن Node متسطب أصلًا.`
          },
          teach: R`## الأول: نفس الـ ٦ خطوات بلغتين

| الخطوة | bash (لينكس) | batch (ويندوز) |
|---|---|---|
| ادخل فولدر السكربت | [[cd "$(dirname "$0")"]] | [[cd /d "%~dp0"]] |
| Node موجود؟ | [[command -v node]] | [[where node]] |
| .env موجود؟ | [[[ -f .env ]]] | [[if not exist .env]] |
| المكتبات أول مرة | [[[ -d node_modules ] || npm install]] | [[if not exist node_modules (call npm install)]] |
| build للواجهة | لو src أحدث من dist بس | كل مرة |
| شغّل | [[exec npx electron .]] | [[npx electron .]] |

ولينكس ليه خطوة زيادة: صلاحيات [[chrome-sandbox]].

جربت نسخة bash في container لينكس ([[node:22-slim]]، Debian) بيوزر عادي معاه sudo، على مشروع Vite 8 + Electron 44 صغير. والـ container مفيهوش شاشة ولا مكتبات الواجهة، فـ Electron نفسه مش هيفتح؛ الخطوات اللي قبله كلها اشتغلت بجد. ونسخة batch اتجرّبت في CMD على ويندوز بنفس المشروع، مع تغيير آخر سطر لـ [[echo]] عشان مايفتحش شباك.

ومن التجربة طلع bug: Electron 44 مبينزّلش البرنامج نفسه مع [[npm install]]، فـ [[chrome-sandbox]] مكانش موجود وقت الفحص. عشان كده اتضاف سطر [[node node_modules/electron/install.js]] (تحت).

---

## نسخة bash سطر سطر

### [[#!/usr/bin/env bash]]

الـ shebang: أول سطر بيقول للنظام «شغّل الملف ده بـ bash». و [[/usr/bin/env bash]] بيدوّر على bash في PATH بدل ما يفترض مكانه.

### [[set -euo pipefail]]

| الحرف | معناه |
|---|---|
| [[-e]] | أي أمر يفشل يوقف السكربت |
| [[-u]] | متغير مش معرّف = خطأ (بدل ما يبقى فاضي في صمت) |
| [[-o pipefail]] | في [[a | b]]، لو [[a]] فشل الـ pipe كله يعتبر فشل |

### [[cd "$(dirname "$0")"]]

اقراه من جوه لبرة:

1. [[$0]] = مسار السكربت زي ما اتشغّل، مثلًا [[/home/dev/app/launch.sh]].
2. [[dirname]] بيشيل اسم الملف ويسيب الفولدر: [[/home/dev/app]].
3. [[$( ... )]] حط ناتج الأمر هنا.
4. [[cd]] ادخله.

جربت أشغّله وانا واقف في [[/tmp]] واشتغل عادي، لأنه دخل فولدره الأول. والتنصيص [[" "]] عشان لو المسار فيه مسافات.

### [[command -v node >/dev/null || { echo "install Node first"; exit 1; }]]

- [[command -v node]] بيطبع مسار [[node]] لو موجود في PATH، ويفشل لو لأ.
- [[>/dev/null]] ارمي المسار، مش محتاجينه.
- [[||]] «لو اللي قبلي فشل، نفّذ اللي بعدي».
- [[{ ...; ...; }]] مجموعة أوامر تتنفذ مع بعض (لازم مسافة بعد [[{]] و [[;]] قبل [[}]]).

### [[[ -f .env ] || { echo ".env missing: cp .env.example .env"; exit 1; }]]

[[[ -f .env ]]] اختبار: «فيه ملف عادي اسمه [[.env]]؟». لو لأ، اطبع إزاي تعمله واخرج. أول تشغيل عندي من غير [[.env]]:

~~~text الناتج
.env missing: cp .env.example .env
exit=1
~~~

### [[[ -d node_modules ] || npm install]]

[[-d]] = فيه **فولدر** بالاسم ده؟ لو مفيش، سطّب. فأول مرة بس:

~~~text الناتج
+ npm install
added 28 packages, and audited 29 packages in 21s
~~~

(السطور اللي بتبدأ بـ [[+]] ده [[bash -x]]: بيطبع كل أمر قبل ما ينفّذه. شغّلته كده عشان نشوف أنهي فرع اتنفّذ.)

### [[SB=node_modules/electron/dist/chrome-sandbox]]

متغير فيه المسار، عشان منكتبوش ٣ مرات. ومن غير مسافات حوالين [[=]]، وإلا bash يفهمها أمر اسمه [[SB]].

### [[[ -e "$SB" ] || node node_modules/electron/install.js]]

[[-e]] = موجود (أي نوع). لو البرنامج لسه متنزّلش، شغّل سكربت التنزيل اللي جاي مع مكتبة electron. السطر ده اتضاف بعد التجربة: من غيره أول تشغيل طلع:

~~~text الناتج (من غير السطر ده)
stat: cannot statx 'node_modules/electron/dist/chrome-sandbox': No such file or directory
chown: cannot access 'node_modules/electron/dist/chrome-sandbox': No such file or directory
...
+ exec npx electron .
Downloading Electron binary...
~~~

يعني الفحص اشتغل على ملف مش موجود، والبرنامج اتنزّل **بعده** لما [[npx electron]] اشتغل، فالصلاحيات متصلحتش أول مرة.

### الـ if بتاع الـ sandbox

~~~bash
if [ "$(stat -c '%u %a' "$SB")" != "0 4755" ]; then
  sudo chown root:root "$SB" && sudo chmod 4755 "$SB"
fi
~~~

- [[stat -c '%u %a']] بيطبع حاجتين: [[%u]] رقم المالك (UID)، و [[%a]] الصلاحيات بالأرقام.
- [[!= "0 4755"]] لو مش «root (رقمه 0) وصلاحيات 4755».
- [[chown root:root]] خلي المالك root والجروب root.
- [[chmod 4755]]: الـ [[4]] في الأول هي **setuid**: البرنامج يشتغل بصلاحيات مالكه (root) مهما مين شغّله. Electron محتاجها عشان يعمل الـ sandbox بتاعه على لينكس، وإلا بيرفض يقوم. و [[755]] الصلاحيات العادية (المالك يقرا ويكتب وينفّذ، والباقي يقرا وينفّذ).

~~~text الناتج أول مرة
++ stat -c '%u %a' node_modules/electron/dist/chrome-sandbox
+ '[' '1001 755' '!=' '0 4755' ']'
+ sudo chown root:root node_modules/electron/dist/chrome-sandbox
+ sudo chmod 4755 node_modules/electron/dist/chrome-sandbox
~~~

~~~text ls -l بعدها
-rwsr-xr-x 1 root root 15232 Jan  1  1980 .../chrome-sandbox
~~~

[[1001]] رقم اليوزر بتاعي (مش root)، وبعد التصليح الـ [[s]] مكان [[x]] في [[rws]] هي الـ setuid. وتاني مرة الشرط بقى [['0 4755' != '0 4755']] = غلط، فمفيش sudo.

### الـ if بتاع الـ build

~~~bash
if [ ! -f dist/index.html ] || [ -n "$(find src -newer dist/index.html -print -quit)" ]; then
  npx vite build
fi
~~~

شرطين بينهم [[||]]، وأي واحد فيهم كفاية:

1. [[[ ! -f dist/index.html ]]] = مفيش build خالص ([[!]] = عكس).
2. [[find src -newer dist/index.html -print -quit]]: دوّر في [[src]] على أي ملف **أحدث** من [[dist/index.html]] ([[-newer]])، اطبعه ([[-print]])، واقف عند أول واحد ([[-quit]]، مش محتاجين الباقي). و [[[ -n "..." ]]] = النص ده مش فاضي. يعني «فيه ملف اتعدّل بعد آخر build».

و [[npx vite build]] بيبني الواجهة في [[dist/]]:

~~~text الناتج
vite v8.3.3 building client environment for production...
✓ 4 modules transformed.
dist/index.html                0.13 kB │ gzip: 0.12 kB
dist/assets/index-_1mdX_qN.js  0.72 kB │ gzip: 0.42 kB
✓ built in 53ms
~~~

تاني تشغيل من غير تعديل: [[find]] رجّع فاضي فمفيش build:

~~~text الناتج
++ find src -newer dist/index.html -print -quit
+ '[' -n '' ']'
+ exec npx electron .
~~~

وبعد ما عملت [[touch src/main.js]] (غيّر وقت تعديل الملف) الـ build رجع اشتغل.

### [[exec npx electron .]]

- [[npx electron .]] شغّل Electron على الفولدر الحالي ([[.]])، فيقرا [[main]] من [[package.json]].
- [[exec]] بدّل الـ bash بـ Electron بدل ما يشغّله كابن. فمفيش bash مستني في الخلفية، و Ctrl+C أو إشارة القفل بتوصل لـ Electron على طول.

في الـ container طلع:

~~~text الناتج
error while loading shared libraries: libglib-2.0.so.0: cannot open shared object file
~~~

ده متوقع: مفيش واجهة رسومية في الـ container. على لينكس desktop المكتبات دي موجودة.

---

## نسخة batch سطر سطر

### [[@echo off]]

batch بيطبع كل أمر قبل ما ينفّذه. [[echo off]] يوقف ده، و [[@]] تخفي السطر ده نفسه.

### [[cd /d "%~dp0"]]

- [[%0]] مسار السكربت (زي [[$0]]).
- [[%~dp0]]: [[~]] شيل التنصيص، و [[d]] الدرايف، و [[p]] المسار. يعني «درايف وفولدر السكربت»، وبيخلص بـ [[\]].
- [[/d]] غيّر الدرايف كمان. من غيرها [[cd]] لو السكربت على [[D:]] وانت على [[C:]] مش هيروح.

جربته وانا واقف في [[C:\]] والسكربت في فولدر تاني، واشتغل.

### [[where node >nul 2>&1 || ( echo install Node first & pause & exit /b 1 )]]

- [[where node]] زي [[command -v]]: فين [[node]]؟
- [[>nul 2>&1]] ارمي المخرجات والأخطاء ([[nul]] هو [[/dev/null]] بتاع ويندوز).
- [[||]] لو فشل.
- [[( ... & ... & ... )]] كذا أمر ورا بعض. [[&]] في CMD = نفّذ اللي بعدي (زي [[;]] في bash).
- [[pause]] اطبع [[Press any key to continue]] واستنى. مهمة للدبل كليك: من غيرها الشباك يقفل قبل ما تقرا الرسالة.
- [[exit /b 1]] اخرج من السكربت ده ([[/b]] = batch بس، مش CMD كله) برقم 1.

### [[if not exist .env ( echo .env missing & pause & exit /b 1 )]]

[[if not exist]] = لو الملف مش موجود. أول تشغيل:

~~~text الناتج
.env missing
Press any key to continue . . .
exit=1
~~~

### [[if not exist node_modules ( call npm install || (pause & exit /b 1) )]]

### ليه [[call]]؟

[[npm]] و [[npx]] على ويندوز ملفات [[.cmd]] (batch برضه). ولما batch يشغّل batch تاني **من غير** [[call]]، التحكم بيروح له ومبيرجعش. جربت سكربتين، واحد فيه [[npx vite --version]] من غير call والتاني بـ call، وبعدها [[echo after npx]]:

~~~text من غير call
vite/8.3.3 win32-x64 node-v24.19.0
~~~

~~~text مع call
vite/8.3.3 win32-x64 node-v24.19.0
after npx
~~~

من غير [[call]] السطر اللي بعده **عمره ما اتنفّذ**.

### [[call npx vite build || (pause & exit /b 1)]]

ابني كل مرة (مفيش [[find -newer]] سهل في CMD، و Vite سريع). ولو فشل، استنى واخرج.

~~~text الناتج (مع .env)
added 28 packages, and audited 29 packages in 16s
vite v8.3.3 building client environment for production...
✓ 4 modules transformed.
dist/index.html                0.13 kB │ gzip: 0.12 kB
✓ built in 97ms
~~~

### [[npx electron .]]

آخر سطر، فمش محتاج [[call]]: مفيش حاجة بعده ترجعلها.

---

## الخلاصة

| | bash | batch |
|---|---|---|
| فولدر السكربت | [[$(dirname "$0")]] | [[%~dp0]] |
| «لو فشل» | [[||]] | [[||]] |
| كذا أمر | [[{ a; b; }]] | [[( a & b )]] |
| ملف موجود؟ | [[[ -f x ]]] | [[if exist x]] |
| تشغيل npm من سكربت | عادي | [[call npm]] |
| الشباك ميقفلش | — | [[pause]] |

وعلى لينكس: [[chrome-sandbox]] لازم [[root]] و [[4755]]، واتأكد إن Electron اتنزّل قبل ما تفحصه.`,
          lines: [
            "وقّف عند أي خطأ أو متغير مش معرّف.",
            "ادخل فولدر السكربت.",
            "Node موجود؟",
            ".env موجود؟",
            "سطّب المكتبات لو مش موجودة.",
            "مسار chrome-sandbox.",
            "لو برنامج Electron لسه متنزّلش (في نسخ Electron الجديدة، زي 44، بيتنزّل أول تشغيل مش مع npm install)، نزّله دلوقتي عشان الفحص اللي بعده يلاقي الملف.",
            "لو مش ملك root بصلاحية 4755:",
            "صلّحه (sudo مرة واحدة).",
            "قفلة الـ if.",
            "مفيش build، أو فيه ملف في src أحدث منه:",
            "ابني الواجهة.",
            "قفلة الـ if.",
            "شغّل Electron مكان الـ shell.",
            "اخفي الأوامر نفسها من الشاشة.",
            "ادخل فولدر السكربت (حتى لو على درايف تاني).",
            "Node موجود؟",
            ".env موجود؟",
            "سطّب أول مرة.",
            "ابني الواجهة.",
            "شغّل Electron."
          ],
          sol: R`من غير [[.env]]، [[launch.bat]] بيطبع [[.env missing]] ويستنى ([[pause]]) عشان تلحق تقرا، و [[launch.sh]] بيطبع [[.env missing: cp .env.example .env]] ويخرج بـ 1. جربت نفس الفحص في سكربت شبهه ده بالظبط اللي حصل.

على لينكس، أول تشغيل ممكن يطلب باسورد sudo مرة واحدة عشان صلاحيات [[chrome-sandbox]] (لازم [[0 4755]]). جربت الشرط ده وغيّر الصلاحية من [[0 755]] لـ [[0 4755]]. وبعد كده:
لو عدّلت ملف في [[src/]]، [[find src -newer dist/index.html]] بيلاقيه، فبتشوف [[vite build]] شغال قبل ما النافذة تفتح. ولو ماعدّلتش حاجة، بيفتح على طول من غير build.

[[launch.bat]] بيعمل [[vite build]] كل مرة، لأن مفيش [[find -newer]] سهل في CMD. ولو الدبل كليك على [[launch.sh]] فتحه في محرر نصوص، اعمل [[chmod +x launch.sh]] وفعّل «Run as program» أو شغّله من الترمنال.`
        },
        {
          cmd: "Capacitor: موقع لـ APK",
          title: "تطبيق أندرويد من موقع React على جهازك",
          desc: R`Capacitor بياخد الموقع بعد الـ build (فولدر dist) ويحطه جوه تطبيق أندرويد أو آيفون. الخطوات: build، و sync، وتبني APK من الترمنال بـ gradlew، وتولّد الأيقونات من صورة واحدة.

والـ APK ده debug: ينفع للتجربة على موبايلك، مش للتوزيع.`,
          example: R`npm install
npm run build
npx cap sync android
npx @capacitor/assets generate --android --iconBackgroundColor '#0f172a' --splashBackgroundColor '#0f172a'
npx cap open android
cd android && ./gradlew assembleDebug && cd ..
# الناتج: android/app/build/outputs/apk/debug/app-debug.apk
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
# iOS: على Mac عليه Xcode بس
npm install @capacitor/ios
npx cap add ios
npx cap sync ios
npx cap open ios`,
          try: "في مشروع Vite + React تجريبي اعمل [[npm i @capacitor/core @capacitor/cli @capacitor/android]] و [[npx cap init]] و [[npx cap add android]]، وبعدين الخطوات دي، ونزّل الـ APK على موبايلك بـ adb (فعّل USB debugging الأول).",
          deep: {
            why: "عندك موقع شغال وعايز تطبيق على الموبايل من غير ما تكتب كود أندرويد. Capacitor بيلف الموقع في WebView ويديك وصول للكاميرا والإشعارات وغيرهم.",
            how: R`[[npm run build]] بيعمل dist. [[cap sync android]] بينسخ dist جوه مشروع الأندرويد (فولدر android/) وبيحدّث الـ plugins. أي تعديل في الموقع محتاج build و sync تاني، وإلا التطبيق يفضل على النسخة القديمة.

[[cap open android]] بيفتح Android Studio لو عايز تشتغل من هناك. بس مش لازم: [[./gradlew assembleDebug]] بيبني APK من الترمنال (على PowerShell [[.\gradlew.bat assembleDebug]]).

[[@capacitor/assets generate]] بياخد [[assets/icon.png]] (1024×1024) ويعمل كل مقاسات الأيقونة وشاشة البداية.

[[adb install -r]] بيسطّب على موبايل موصّل بـ USB، و [[-r]] يعني حدّث فوق النسخة الموجودة.

وفي مشروع حقيقي كان الـ APK بيترفع على السيرفر في فولدر downloads يتخدم من Nginx عشان الموظفين ينزّلوه: [[scp myapp.apk deploy@203.0.113.10:/opt/myapp/downloads/]].`,
            when: "تطبيق داخلي لموظفين، أو أول نسخة موبايل من موقع موجود. بناء الـ APK الموقّع أوتوماتيك في درس «android.yml» في المستوى التالت، والأوامر لوحدها في تاب Desktop و Mobile.",
            mistakes: R`في مشروع حقيقي كانت نسخة الـ debug بتتوزّع على الموظفين. دي مش موقّعة بمفتاح ثابت، فمينفعش تتحدّث فوقها نسخة release موقّعة بعدين: لازم يمسحوا التطبيق الأول.

ولما فولدر downloads اتضاف لـ compose بعد ما الـ container كان شغال، مكانش بيتركّب لحد [[docker compose up -d --force-recreate frontend]].

والتوزيع من برّه Play Store محتاج «تثبيت من مصادر غير معروفة» على كل موبايل، فجهّز ده للموظفين.`
          },
          teach: R`## الأول: الفكرة

Capacitor مش بيحوّل الـ React لكود أندرويد. هو بيعمل مشروع أندرويد صغير فيه **WebView** (متصفح من غير شريط عنوان) بيفتح ملفات موقعك اللي في [[dist]]. فالشغل كله: ابني الموقع، وانسخه جوه مشروع الأندرويد، وابني الـ APK.

~~~text
src/  →  npm run build  →  dist/  →  npx cap sync  →  android/app/src/main/assets/public/  →  gradlew  →  app-debug.apk
~~~

جربت جزء Capacitor على ويندوز بمشروع Vite صغير و Capacitor 8.5.2 ([[@capacitor/cli]]). أما [[gradlew]] و [[adb]] محتاجين Java و Android SDK ومش متسطّبين هنا، فكلامهم من توثيق Capacitor و Android، ومكتوب كده تحت.

قبل المثال المشروع لازم يبقى فيه Capacitor ومنصة أندرويد (ده في الـ try):

~~~bash
npm i @capacitor/core @capacitor/cli @capacitor/android
npx cap init MyApp com.example.myapp --web-dir dist
npx cap add android
~~~

- [[cap init]] بياخد اسم التطبيق، والـ app id (اسم فريد بالشكل المقلوب للدومين، وده اللي بيعرّف التطبيق على الموبايل وفي Play Store)، و [[--web-dir]] فولدر الـ build. وبيعمل:

~~~text capacitor.config.json
{
  "appId": "com.example.myapp",
  "appName": "MyApp",
  "webDir": "dist"
}
~~~

- [[cap add android]] بيعمل فولدر [[android/]] (مشروع Android Studio كامل):

~~~text الناتج
√ Adding native android project in android in 116.42ms
√ Copying web assets from dist to android\app\src\main\assets\public in 4.69ms
[success] android platform added!
~~~

---

## ١. [[npm install]]

سطّب المكتبات من [[package.json]]، ومنها [[@capacitor/cli]] اللي [[npx cap]] بيشغّله.

~~~bash
npx cap --version
~~~

~~~text الناتج
8.5.2
~~~

## ٢. [[npm run build]]

بيشغّل سكربت [[build]] (هنا [[vite build]]) ويطلّع الموقع جاهز في [[dist/]]. ده اللي هيدخل التطبيق، مش [[src/]].

~~~text الناتج
✓ built in 62ms
~~~

## ٣. [[npx cap sync android]]

[[sync]] = [[copy]] + [[update]]:

~~~text الناتج
√ Copying web assets from dist to android\app\src\main\assets\public in 7.07ms
√ Creating capacitor.config.json in android\app\src\main\assets in 806.60μs
√ copy android in 16.65ms
√ Updating Android plugins in 805.00μs
√ update android in 29.43ms
[info] Sync finished in 0.057s
~~~

- **copy**: انسخ [[dist]] لـ [[android/app/src/main/assets/public]]، والإعدادات جنبها.
- **update**: حدّث الـ plugins الأصلية (كاميرا، إشعارات...) في مشروع الأندرويد.

غيّرت النص في [[src/main.js]] لـ «hello android» وعملت build و sync، ولقيته جوه مشروع الأندرويد:

~~~text grep
android/app/src/main/assets/public/assets/index-....js: hello android
~~~

يعني أي تعديل في الموقع لازم **build ثم sync**، وإلا التطبيق يفضل على القديم.

## ٤. الأيقونات وشاشة البداية

~~~bash
npx @capacitor/assets generate --android --iconBackgroundColor '#0f172a' --splashBackgroundColor '#0f172a'
~~~

| الحتة | معناها |
|---|---|
| [[@capacitor/assets]] | أداة بتاخد صورة واحدة وتعمل منها كل المقاسات |
| [[generate]] | ولّد |
| [[--android]] | للأندرويد بس (من غيرها iOS و PWA كمان) |
| [[--iconBackgroundColor]] | لون خلفية الأيقونة |
| [[--splashBackgroundColor]] | لون خلفية شاشة البداية |
| [[#0f172a]] | لون بالـ hex (أحمر أخضر أزرق)، هنا كحلي غامق. بين [[' ']] عشان [[#]] في bash أول كلمة تعليق |

بتقرا [[assets/icon.png]] (مربعة، 1024×1024 أو أكبر). عملت صورة كده وشغّلت الأمر:

~~~text الناتج (مختصر)
CREATE android icon ...\res\mipmap-xxxhdpi\ic_launcher.png (1.69 KB)
CREATE android icon ...\res\mipmap-xxxhdpi\ic_launcher_round.png (3.74 KB)
CREATE android adaptive-icon ...\res\mipmap-xxxhdpi\ic_launcher_foreground.png (4.37 KB)
CREATE android splash ...\res\drawable-port-xxxhdpi\splash.png (52.37 KB)
CREATE android splash-dark ...\res\drawable-night\splash.png (2.41 KB)
Totals:
android: 74 generated, 544.43 KB total
~~~

ليه ٧٤ صورة؟ أندرويد عنده مقاسات شاشات (كثافات): [[ldpi]] و [[mdpi]] و [[hdpi]] و [[xhdpi]] و [[xxhdpi]] و [[xxxhdpi]]، وكل واحدة محتاجة الأيقونة بمقاسها. وفيه أيقونة عادية ومدوّرة ([[round]])، و adaptive icon (طبقة قدام [[foreground]] وطبقة ورا [[background]] عشان الموبايل يقصّها بالشكل اللي عايزه)، وشاشة بداية للطول ([[port]]) والعرض ([[land]]) والوضع الليلي ([[night]]).

ولازم الخطوة دي **قبل** gradlew، عشان الصور تدخل الـ APK.

> شغّلتها من [[npm i -D @capacitor/assets]] الأول. من [[npx]] مباشرة على ويندوز طلّعت تحذيرات [[EPERM]] كتير وقت تنضيف الكاش.

## ٥. [[npx cap open android]]

بيفتح فولدر [[android/]] في Android Studio. ولو مش متسطّب:

~~~text الناتج
[error] Unable to launch Android Studio. Is it installed?
        You can configure this with the CAPACITOR_ANDROID_STUDIO_PATH environment variable.
~~~

اختياري: تقدر تبني من غيره بالخطوة الجاية.

## ٦. [[cd android && ./gradlew assembleDebug && cd ..]]

| الحتة | معناها |
|---|---|
| [[cd android]] | ادخل مشروع الأندرويد |
| [[./gradlew]] | Gradle Wrapper: سكربت جاي مع المشروع (اتعمل مع [[cap add]]) بينزّل نسخة Gradle الصح ويشغّلها. [[./]] = من الفولدر الحالي |
| [[assembleDebug]] | ابني نسخة debug |
| [[cd ..]] | ارجع لفولدر المشروع |

والـ [[&&]] بينهم: لو البناء فشل، متكمّلش. على PowerShell أو CMD اكتب [[.\gradlew.bat assembleDebug]]. (الملفين [[gradlew]] و [[gradlew.bat]] موجودين فعلًا في [[android/]] بعد [[cap add]].)

محتاج JDK و Android SDK (بييجوا مع Android Studio). حسب التوثيق، في الآخر بيطبع [[BUILD SUCCESSFUL]] والـ APK بيبقى في:

~~~text المسار
android/app/build/outputs/apk/debug/app-debug.apk
~~~

نسخة **debug** متوقّعة بمفتاح debug أوتوماتيك، تنفع للتجربة على موبايلك، مش للتوزيع.

## ٧. [[adb install -r android/app/build/outputs/apk/debug/app-debug.apk]]

- [[adb]] (Android Debug Bridge) أداة بتكلّم الموبايل الموصّل بـ USB (لازم USB debugging مفعّل من Developer options).
- [[install]] سطّب الـ APK ده.
- [[-r]] (replace) لو التطبيق متسطّب، حدّثه وسيب بياناته.

حسب التوثيق بيطبع [[Success]]. و [[adb devices]] بيوريك الموبايلات الموصّلة.

---

## ٨. iOS (على Mac بس)

| السطر | بيعمل إيه |
|---|---|
| [[npm install @capacitor/ios]] | مكتبة منصة iOS |
| [[npx cap add ios]] | فولدر [[ios/]] فيه مشروع Xcode |
| [[npx cap sync ios]] | نفس sync: انسخ [[dist]] وحدّث الـ plugins |
| [[npx cap open ios]] | افتح Xcode، ومنه تبني وتشغّل |

بناء iOS محتاج Xcode، و Xcode على macOS بس. (من توثيق Capacitor، مفيش Mac هنا.)

---

## الخلاصة

| الخطوة | الأمر | امتى |
|---|---|---|
| ابني الموقع | [[npm run build]] | بعد أي تعديل |
| انسخه للأندرويد | [[npx cap sync android]] | بعد أي build |
| الأيقونات | [[npx @capacitor/assets generate --android]] | لما الأيقونة تتغير |
| APK | [[./gradlew assembleDebug]] | لما عايز تجرّب على موبايل |
| سطّب | [[adb install -r ...apk]] | |

والغلطة الأشهر: شاشة بيضا لأن [[webDir]] مش [[dist]]، أو نسيت build قبل sync.`,
          lines: [
            "سطّب المكتبات.",
            "ابني الموقع لـ dist.",
            "انسخ dist جوه مشروع الأندرويد.",
            "ولّد الأيقونات وشاشة البداية من صورة واحدة (قبل البناء، عشان تدخل في الـ APK).",
            "افتح Android Studio (اختياري).",
            "ابني APK debug من الترمنال.",
            "سطّب على الموبايل الموصّل، فوق القديم.",
            "ضيف منصة iOS.",
            "اعمل مشروع Xcode.",
            "انسخ الموقع جواه.",
            "افتح Xcode."
          ],
          sol: R`جربت جزء Capacitor: [[npx cap add android]] طبع [[[success] android platform added!]] وعمل فولدر [[android/]]. [[npx cap sync android]] نقل الـ build لـ [[android/app/src/main/assets/public]] (غيّرت كلمة وتأكدت إنها وصلت هناك). وخد بالك إن [[cap init]] بيعمل [[capacitor.config.json]] لو المشروع مفيهوش TypeScript، و [[capacitor.config.ts]] لو فيه.

[[./gradlew assembleDebug]] في الآخر بيقول [[BUILD SUCCESSFUL]] والـ APK في [[android/app/build/outputs/apk/debug/app-debug.apk]]. [[adb install -r]] بيطبع [[Success]] والتطبيق بيظهر على الموبايل. لو [[adb devices]] مش شايف الموبايل أو بيقول [[unauthorized]]، وافق على رسالة USB debugging على الموبايل.

الغلط الأشهر: التطبيق بيفتح شاشة بيضا، لأن [[webDir]] مش [[dist]] أو نسيت [[npm run build]] قبل [[cap sync]]. ولو الـ API مش بيرد من الموبايل، [[localhost]] على الموبايل هو الموبايل نفسه، استخدم IP الكمبيوتر أو [[adb reverse]]. (ما قدرتش أبني الـ APK هنا، [[gradlew]] محتاج Android SDK ونت.)`
        }
      ]
    },
    {
      t: "تجهيز السيرفر",
      l: 2,
      n: "من سيرفر فاضي لسيرفر جاهز، وفحص قبل أول نشر، وخريطة لسيرفر قديم",
      items: [
        {
          cmd: "setup-vps.sh",
          title: "تجهيز VPS جديد لـ Docker من الصفر",
          desc: R`سكربت بتشغّله مرة على سيرفر Ubuntu لسه واخده: يحدّث النظام، ويسطّب Docker و compose و git و ufw و fail2ban، ويعمل يوزر للتطبيق بمفاتيح SSH بتاعتك، ويقفل الفايروول على 22 و 80 و 443.

وممكن تشغّله تاني من غير ما يبوّظ حاجة: كل خطوة بتتأكد الأول هي اتعملت ولا لأ.`,
          example: R`#!/usr/bin/env bash
# sudo bash setup-vps.sh deploy
set -euo pipefail
[ "$EUID" -eq 0 ] || { echo "run it with sudo" >&2; exit 1; }
APP_USER="$__{1:-deploy}"
KEYS="$(getent passwd "$__{SUDO_USER:-root}" | cut -d: -f6)/.ssh/authorized_keys"

apt-get update && apt-get upgrade -y
apt-get install -y ca-certificates curl git ufw fail2ban

if ! command -v docker >/dev/null; then
  curl -fsSL https://get.docker.com -o /tmp/get-docker.sh
  sh /tmp/get-docker.sh
  rm /tmp/get-docker.sh
fi
docker --version; docker compose version

if ! id "$APP_USER" >/dev/null 2>&1; then
  adduser --disabled-password --gecos "" "$APP_USER"
  install -d -m 700 -o "$APP_USER" -g "$APP_USER" "/home/$APP_USER/.ssh"
  install -m 600 -o "$APP_USER" -g "$APP_USER" "$KEYS" "/home/$APP_USER/.ssh/authorized_keys"
fi
usermod -aG docker "$APP_USER"

ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo "now, from a NEW terminal: ssh $APP_USER@203.0.113.10 docker ps"`,
          try: "على سيرفر تجربة جديد (أو VM بـ multipass) شغّله مرتين ورا بعض: التانية لازم تعدّي من غير أخطاء ومن غير ما تعمل حاجة جديدة. وبعدين من ترمنال تاني ادخل بـ [[ssh deploy@203.0.113.10]] وجرّب [[docker ps]] من غير sudo.",
          flag: "script",
          deep: {
            why: "كل سيرفر جديد محتاج نفس الـ ١٠ خطوات. لو عملتها بإيدك كل مرة هتنسى واحدة (غالبًا الفايروول)، ولو في سكربت هتبقى نفس الحاجة على كل سيرفر.",
            how: R`[[set -euo pipefail]] في الأول بيخلي أي أمر يفشل يوقف السكربت، بدل ما يكمل على سيرفر نص متجهّز.

كل خطوة «idempotent»، يعني تشغيلها مرتين زي مرة: Docker بيتسطب بس لو [[command -v docker]] ملقاهوش، واليوزر بيتعمل بس لو [[id]] ملقاهوش، و [[usermod -aG]] و [[ufw allow]] مش بيضرّوا لو اتكرروا.

سكربت get.docker.com بيتنزّل في ملف الأول بدل [[curl | sh]]، عشان لو عايز تقراه قبل ما تشغّله تقدر، ولو التنزيل وقف في النص ميتنفذش نص سكربت.

اليوزر الجديد بيتعمل من غير باسورد ([[--disabled-password]])، والدخول بالمفاتيح اللي انت داخل بيها دلوقتي: [[SUDO_USER]] هو اسم اليوزر اللي كتب sudo، و [[getent passwd]] بيجيب فولدر الـ home بتاعه. و [[install]] بيعمل الفولدر والملف بالمالك والصلاحيات الصح في خطوة واحدة (700 للفولدر و 600 للملف، وإلا SSH هيرفض المفاتيح).

خد بالك: جروب docker معناه صلاحيات root فعليًا (أي حد فيه يقدر يركّب / جوه container). فاليوزر ده للتطبيق بس، ومش محتاج sudo.

وخد بالك كمان: Docker بيكتب قواعد iptables بتاعته، فأي بورت بتنشره بـ [[-p 5432:5432]] بيبقى مفتوح للعالم حتى لو ufw قافله. عشان كده في الـ compose اربط على [[127.0.0.1]].`,
            when: "أول ما تاخد VPS جديد، قبل أي clone أو deploy. وبعد ما يخلص، اقفل الدخول بالباسورد من sshd_config بعد ما تتأكد إن الدخول بالمفتاح شغال.",
            mistakes: R`في مشروع حقيقي كان السكربت بيشتغل كله بـ root ومفيهوش يوزر للتطبيق خالص، و [[usermod -aG docker "$USER"]] وهو root كانت بتضيف root نفسه للجروب (ملهاش أي لازمة). وكان بيسطّب apt-transport-https و docker-compose-plugin على الفاضي (get.docker.com بيسطّب compose أصلًا). وكان الـ IP والدومين مكتوبين جوه السكربت، فمينفعش يتستخدم على سيرفر تاني.

وغلطة شائعة: تقفل الدخول بالباسورد وتقفل الترمنال قبل ما تجرّب الدخول بالمفتاح من ترمنال جديد، فتقفل الباب على نفسك.`
          },
          teach: R`## الأول: السكربت ده ٥ أجزاء

1. **حراسة**: لازم root، وجهّز المتغيرات.
2. **الباكدجات**: تحديث وأدوات أساسية.
3. **Docker**: لو مش متسطّب.
4. **يوزر التطبيق**: بمفاتيح SSH بتاعتك.
5. **الفايروول**: 22 و 80 و 443 بس.

جربته مرتين ورا بعض في container [[ubuntu:24.04]] جديد (بـ [[--cap-add NET_ADMIN]] عشان ufw يقدر يكتب قواعد جوه شبكة الـ container بس، مش الجهاز)، وحطيت مفتاح وهمي في [[/root/.ssh/authorized_keys]] زي سيرفر لسه واخده. وسطّبت [[openssh-server]] الأول لأن أي VPS بييجي بيه (هتعرف ليه تحت). الحاجة الوحيدة اللي مش هتشتغل في container هي تشغيل خدمة Docker نفسها (مفيش systemd)، فاللي عنها تحت من التوثيق.

---

## ١. الحراسة والمتغيرات

### [[#!/usr/bin/env bash]] و [[# sudo bash setup-vps.sh deploy]]

السطر الأول: شغّل بـ bash. التاني تعليق بيقولك إزاي تشغّله: بـ sudo، وأول argument اسم اليوزر.

### [[set -euo pipefail]]

أي أمر يفشل يوقف السكربت ([[-e]])، والمتغير غير المعرّف خطأ ([[-u]])، وفشل أي جزء في pipe يتحسب ([[pipefail]]). على سيرفر، ده الفرق بين «وقف عند الغلطة» و «كمّل وساب سيرفر نص متجهّز».

### [[[ "$EUID" -eq 0 ] || { echo "run it with sudo" >&2; exit 1; }]]

- [[$EUID]] (Effective User ID) رقم اليوزر اللي الصلاحيات بتتحسب بيه دلوقتي. root رقمه [[0]]، وتحت sudo بيبقى [[0]] برضه.
- [[-eq]] = يساوي (للأرقام).
- [[>&2]] اطبع الرسالة على stderr (مكان الأخطاء) مش stdout.

جربته بيوزر عادي من غير sudo:

~~~text الناتج
run it with sudo
exit=1
~~~

### [[APP_USER="$__{1:-deploy}"]]

- [[$1]] أول argument بعد اسم السكربت.
- [[$__{1:-deploy}]] «قيمة [[$1]]، ولو فاضي أو مش موجود استخدم [[deploy]]». ومن غير الشكل ده، [[set -u]] كان هيوقف السكربت لو مكتبتش argument.

### [[KEYS="$(getent passwd "$__{SUDO_USER:-root}" | cut -d: -f6)/.ssh/authorized_keys"]]

من جوه لبرة:

1. [[$SUDO_USER]]: لما تكتب [[sudo]]، النظام بيحط فيه اسمك الحقيقي (اللي كتب sudo). و [[:-root]] لو انت داخل root مباشرة.
2. [[getent passwd ali]] بيجيب سطر اليوزر من قاعدة اليوزرات:

~~~text الناتج
ali:x:1001:1001::/home/ali:/bin/sh
~~~

الخانات مفصولة بـ [[:]]: الاسم، الباسورد ([[x]] = في ملف تاني)، UID، GID، وصف، **الـ home**، الـ shell.

3. [[cut -d: -f6]] قطّع بالـ [[:]] ([[-d]] = delimiter) وهات الخانة السادسة ([[-f6]] = field):

~~~text الناتج
/home/ali
~~~

4. وبعدها [[/.ssh/authorized_keys]]. النتيجة: ملف المفاتيح اللي انت داخل بيها دلوقتي، وده اللي هننسخه لليوزر الجديد.

ليه مش [[~]]؟ لأن تحت sudo الـ [[~]] ممكن تبقى [[/root]].

---

## ٢. الباكدجات

### [[apt-get update && apt-get upgrade -y]]

- [[apt-get update]]: حدّث **قايمة** الباكدجات المتاحة (مش بيسطّب حاجة).
- [[apt-get upgrade -y]]: سطّب التحديثات، و [[-y]] = وافق على كل الأسئلة.

~~~text الناتج (أول مرة)
2 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
~~~

### [[apt-get install -y ca-certificates curl git ufw fail2ban]]

| الباكدج | ليه |
|---|---|
| [[ca-certificates]] | شهادات عشان curl يثق في مواقع https |
| [[curl]] | ينزّل سكربت Docker |
| [[git]] | يعمل clone للمشروع |
| [[ufw]] | Uncomplicated Firewall: واجهة سهلة لقواعد الفايروول |
| [[fail2ban]] | يقرا لوجات SSH ويحظر الـ IP اللي بيجرّب باسوردات غلط كتير |

~~~text الناتج (أول مرة)
0 upgraded, 40 newly installed, 0 to remove and 0 not upgraded.
After this operation, 91.3 MB of additional disk space will be used.
~~~

وتاني مرة:

~~~text الناتج
ufw is already the newest version (0.36.2-6).
fail2ban is already the newest version (1.0.2-3ubuntu0.1).
0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
~~~

---

## ٣. Docker

### [[if ! command -v docker >/dev/null; then ... fi]]

[[command -v docker]] بينجح لو docker موجود، و [[!]] بتعكس. يعني «لو Docker **مش** موجود». التشغيل التاني بيلاقيه فبيعدّي الجزء ده كله.

### التلات سطور جوه

~~~bash
curl -fsSL https://get.docker.com -o /tmp/get-docker.sh
sh /tmp/get-docker.sh
rm /tmp/get-docker.sh
~~~

- [[curl -fsSL]]: [[-f]] افشل لو السيرفر رجّع خطأ (بدل ما يحفظ صفحة الخطأ)، [[-s]] من غير progress، [[-S]] بس اطبع الأخطاء، [[-L]] امشي ورا الـ redirect.
- [[-o /tmp/get-docker.sh]] احفظ في ملف. ممكن تفتحه وتقراه قبل ما تشغّله.
- [[sh /tmp/get-docker.sh]] شغّله: بيضيف مستودع Docker الرسمي ويسطّب:

~~~text الناتج (مختصر)
# Executing docker install script, commit: 2b32480025b...
+ sh -c curl -fsSL "https://download.docker.com/linux/ubuntu/gpg" -o /etc/apt/keyrings/docker.asc
+ sh -c echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu noble stable" > /etc/apt/sources.list.d/docker.list
+ sh -c apt-get -y -qq install docker-ce docker-ce-cli containerd.io docker-compose-plugin docker-ce-rootless-extras docker-buildx-plugin docker-model-plugin
Using systemd to manage Docker service
+ sh -c systemctl enable --now docker.service
~~~

لاحظ إنه بيسطّب [[docker-compose-plugin]] لوحده، فمش محتاج تسطّبه انت. و [[noble]] اسم Ubuntu 24.04. وفي الـ container ظهر [[WARNING: unable to enable the docker service]] لأن مفيش systemd، وظهر [[WSL DETECTED]] مع انتظار ٢٠ ثانية لأن Docker Desktop شغال على WSL. على VPS حقيقي الاتنين مش هيظهروا والخدمة بتقوم (من التوثيق).

- [[rm]] امسح السكربت بعد ما خلص.

### [[docker --version; docker compose version]]

~~~text الناتج
Docker version 29.8.2, build 7fc2dff
Docker Compose version v5.6.0
~~~

مفصولين بـ [[;]] مش [[&&]] عشان [[set -e]] يشتغل على الاتنين: لو أي واحد فشل السكربت يقف.

---

## ٤. يوزر التطبيق

### [[if ! id "$APP_USER" >/dev/null 2>&1; then]]

[[id deploy]] بيطبع أرقام اليوزر لو موجود ويفشل لو لأ. [[2>&1]] ابعت الأخطاء لنفس مكان المخرجات (اللي هو [[/dev/null]]).

### [[adduser --disabled-password --gecos "" "$APP_USER"]]

- [[--disabled-password]]: من غير باسورد. محدش يدخل بيه بباسورد، بالمفاتيح بس.
- [[--gecos ""]]: خانة الوصف (الاسم الكامل والتليفون...) فاضية، فمش هيسألك أسئلة.

~~~text الناتج
info: Adding user $__btdeploy' ...
info: Adding new group $__btdeploy' (1001) ...
info: Adding new user $__btdeploy' (1001) with group $__btdeploy (1001)' ...
info: Creating home directory $__bt/home/deploy' ...
info: Adding user $__btdeploy' to group $__btusers' ...
~~~

### [[install -d -m 700 -o "$APP_USER" -g "$APP_USER" "/home/$APP_USER/.ssh"]]

[[install]] بينسخ ملفات أو يعمل فولدرات **وبيحط المالك والصلاحيات في نفس الخطوة**:

| الحتة | معناها |
|---|---|
| [[-d]] | اعمل فولدر |
| [[-m 700]] | الصلاحيات: المالك بس يقرا ويكتب ويدخل |
| [[-o]] / [[-g]] | المالك (owner) والجروب |

### [[install -m 600 -o "$APP_USER" -g "$APP_USER" "$KEYS" "/home/$APP_USER/.ssh/authorized_keys"]]

انسخ ملف المفاتيح بصلاحية [[600]] (المالك بس يقرا ويكتب). SSH بيرفض المفاتيح لو الملف أو الفولدر مفتوح لحد تاني. النتيجة:

~~~text stat
700 deploy:deploy /home/deploy/.ssh
600 deploy:deploy /home/deploy/.ssh/authorized_keys
~~~

### [[usermod -aG docker "$APP_USER"]]

[[-G docker]] الجروب، و [[-a]] (append) **ضيف** عليه من غير ما تشيله من جروباته التانية. من غير [[-a]] كان هيشيله من كل الجروبات التانية.

~~~text id deploy
uid=1001(deploy) gid=1001(deploy) groups=1001(deploy),100(users),995(docker)
~~~

> جروب docker = صلاحيات root فعليًا، فاليوزر ده للتطبيق بس.

---

## ٥. الفايروول

### [[ufw allow OpenSSH]]

[[OpenSSH]] هنا اسم **profile** جاي مع باكدج [[openssh-server]]:

~~~text /etc/ufw/applications.d/openssh-server
[OpenSSH]
title=Secure shell server, an rshd replacement
ports=22/tcp
~~~

في أول تجربة في container مفيهوش openssh-server، السكربت وقف هنا:

~~~text الناتج
ERROR: Could not find a profile matching 'OpenSSH'
~~~

على أي VPS الباكدج موجود (انت داخل بـ SSH أصلًا). والسطر ده **قبل** [[enable]]، وإلا هتقفل الباب على نفسك.

### [[ufw allow 80/tcp]] و [[ufw allow 443/tcp]]

HTTP و HTTPS. [[/tcp]] بروتوكول TCP بس.

~~~text الناتج أول مرة
Rules updated
Rules updated (v6)
~~~

كل قاعدة بتتعمل لـ IPv4 و IPv6 ([[v6]]).

### [[ufw --force enable]]

فعّل. [[--force]] من غير سؤال «ممكن يقطع SSH، متأكد؟».

~~~text الناتج
Firewall is active and enabled on system startup
~~~

~~~text ufw status verbose
Status: active
Default: deny (incoming), allow (outgoing), deny (routed)

To                         Action      From
22/tcp (OpenSSH)           ALLOW IN    Anywhere
80/tcp                     ALLOW IN    Anywhere
443/tcp                    ALLOW IN    Anywhere
~~~

[[deny (incoming)]]: أي حاجة داخلة مرفوضة إلا الـ ٣ دول.

### [[echo "now, from a NEW terminal: ssh $APP_USER@203.0.113.10 docker ps"]]

تفكير: جرّب الدخول من ترمنال **جديد** قبل ما تقفل الحالي. ([[203.0.113.10]] IP للأمثلة بس، حط IP سيرفرك.)

---

## ٦. التشغيل التاني: idempotent

~~~text الناتج
0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
Docker version 29.8.2, build 7fc2dff
Docker Compose version v5.6.0
Skipping adding existing rule
Skipping adding existing rule (v6)
...
Firewall is active and enabled on system startup
now, from a NEW terminal: ssh deploy@203.0.113.10 docker ps
exit=0
~~~

مفيش تسطيب Docker تاني، ولا [[adduser]]، و ufw قال [[Skipping]]. والأول خد حوالي دقيقة ونص.

---

## الخلاصة

| الجزء | الأمر | التكرار آمن عشان |
|---|---|---|
| root؟ | [[[ "$EUID" -eq 0 ]]] | — |
| الباكدجات | [[apt-get install -y]] | apt بيقول already newest |
| Docker | [[get.docker.com]] | [[if ! command -v docker]] |
| اليوزر | [[adduser]] + [[install]] | [[if ! id]] |
| الجروب | [[usermod -aG docker]] | إضافة لجروب موجود فيه = ولا حاجة |
| الفايروول | [[ufw allow]] ثم [[enable]] | ufw بيعدّي القاعدة الموجودة |

وبعده: جرّب SSH باليوزر الجديد من ترمنال تاني، وبعدين بس اقفل الدخول بالباسورد.`,
          lines: [
            "أي أمر يفشل يوقف السكربت، وأي متغير مش متعرّف يبقى غلطة، وفشل أي جزء في pipe يتحسب.",
            "لو مش root (الـ [[EUID]] مش 0) اطبع رسالة واخرج.",
            "اسم يوزر التطبيق من أول argument، ولو مفيش يبقى deploy.",
            "مكان مفاتيح SSH بتاعة اليوزر اللي كتب sudo (أو root)، عشان ننسخها لليوزر الجديد.",
            "حدّث لستة الباكدجات وسطّب التحديثات.",
            "الأدوات الأساسية: شهادات و curl و git والفايروول و fail2ban.",
            "لو Docker مش متسطب...",
            "...نزّل سكربت التسطيب الرسمي في ملف.",
            "...شغّله.",
            "...وامسحه.",
            "نهاية الـ if.",
            "اتأكد إن Docker و compose شغالين (لو لأ، [[set -e]] هيوقف هنا). مفصولين بـ [[;]] مش [[&&]]، لأن فشل أول أمر في [[&&]] مش بيوقف [[set -e]].",
            "لو اليوزر مش موجود...",
            R`...اعمله من غير باسورد ومن غير أسئلة ([[--gecos ""]]).`,
            "...اعمل فولدر .ssh بتاعه بصلاحيات 700 وملكه.",
            "...وانسخ المفاتيح بصلاحيات 600.",
            "نهاية الـ if.",
            "ضيفه لجروب docker عشان يشغّل docker من غير sudo.",
            "اسمح بـ SSH قبل ما تفعّل الفايروول (وإلا هتقفل على نفسك).",
            "اسمح بـ HTTP.",
            "اسمح بـ HTTPS.",
            "فعّل الفايروول من غير ما يسألك.",
            "افكرك تجرّب الدخول باليوزر الجديد من ترمنال تاني."
          ],
          sol: R`أول تشغيل بياخد دقايق (apt upgrade و Docker) وفي الآخر بيطبع نسخة Docker و [[Docker Compose version v2...]] و [[Firewall is active and enabled on system startup]] و [[now, from a NEW terminal: ssh deploy@... docker ps]].

التشغيل التاني لازم يعدّي من غير أخطاء: [[command -v docker]] بيلاقي Docker فمش بيسطّبه تاني، و [[id deploy]] بيلاقي اليوزر فمش بيعمله، و [[ufw allow]] بيقول [[Skipping adding existing rule]]. ده معنى idempotent: تشغّله مرة ولا عشرة والنتيجة واحدة. لو [[adduser]] فشل في التانية يبقى نسيت الشرط.

من ترمنال جديد، [[ssh deploy@IP]] ثم [[docker ps]] لازم يرجّع جدول فاضي ([[CONTAINER ID   IMAGE ...]]) من غير sudo. لو طلع [[permission denied while trying to connect to the Docker daemon socket]] يبقى انت لسه في session قديمة قبل [[usermod -aG docker]]، اخرج وادخل تاني. ومتقفلش ترمنال الـ root قبل ما تتأكد إن SSH بيوزر deploy شغال. (جربته مرتين في container [[ubuntu:24.04]] فيه openssh-server: التسطيب والـ ufw والتشغيل التاني طلعوا زي الكلام ده بالظبط، Docker 29.8.2 و Compose v5.6.0. تشغيل خدمة Docker نفسها والدخول بـ SSH من ترمنال تاني من التوثيق، لأن الـ container مفيهوش systemd.)`
        },
        {
          cmd: "preflight.sh",
          title: "فحص السيرفر قبل أول نشر، ويصلّح لو طلبت",
          desc: R`سكربت بيقرا بس ومش بيغيّر حاجة: يشوف الأنوية والمساحة والـ swap و Docker، والبورتات اللي مفروض تبقى مقفولة، والدخول بالباسورد، وإن الدومين بيشاور على السيرفر ده. وفي الآخر يطبع ملخص ويرجع exit code.

ولو شغّلته بـ [[--fix]] بيصلّح اللي ينفع يتصلّح لوحده (هنا الـ swap).`,
          example: R`#!/usr/bin/env bash
# ./preflight.sh              فحص بس، مش بيغيّر حاجة
# sudo ./preflight.sh --fix   فحص + تصليح اللي ينفع يتصلّح
set -uo pipefail
FIX=0; [ "$__{1:-}" = "--fix" ] && FIX=1
PASS=0; WARN=0; FAIL=0
ok()   { echo "  ok    $*"; PASS=$((PASS+1)); }
warn() { echo "  warn  $*"; WARN=$((WARN+1)); }
bad()  { echo "  FAIL  $*"; FAIL=$((FAIL+1)); }

CORES=$(nproc)
DISK_GB=$(df -BG --output=avail / | tail -1 | tr -dc '0-9')
[ "$CORES" -ge 2 ] && ok "$CORES cores" || bad "$CORES cores (need 2)"
[ "$DISK_GB" -ge 20 ] && ok "$DISK_GB GB free" || bad "$DISK_GB GB free (need 20)"

SWAP_MB=$(free -m | awk '/^Swap:/{print $2}')
if [ "$SWAP_MB" -ge 2048 ]; then ok "swap $SWAP_MB MB"
elif [ "$FIX" -eq 1 ]; then
  if fallocate -l 4G /swapfile && chmod 600 /swapfile && mkswap -q /swapfile && swapon /swapfile; then
    grep -q '^/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
    ok "swap 4G created"
  else bad "swap not created (see the error above)"; fi
else warn "no swap (run again with --fix)"; fi

command -v docker >/dev/null && ok "docker installed" || bad "docker missing"
for p in 5432 6379 27017; do
  ss -ltnH "sport = :$p" | awk '{print $4}' | grep -qE '^(0\.0\.0\.0|\[::\]|\*):' && bad "port $p open to the world" || ok "port $p private"
done
sshd -T 2>/dev/null | grep -qx 'passwordauthentication no' && ok "SSH keys only" || warn "SSH password login is on"

IP=$(curl -4 -s --max-time 5 https://api.ipify.org || true)
HOST=$(grep -E '^APP_HOST=' .env 2>/dev/null | cut -d= -f2 || true)
DNS=$(getent ahostsv4 "$HOST" | awk '{print $1; exit}')
[ -n "$IP" ] && [ "$DNS" = "$IP" ] && ok "$HOST -> $DNS" || bad "APP_HOST '$HOST' -> $__{DNS:-nothing}, server is $__{IP:-unknown}"

echo "pass $PASS · warn $WARN · fail $FAIL"
[ "$FAIL" -eq 0 ]`,
          try: "شغّله من غير [[--fix]] على سيرفر التجربة واقرا النتيجة. وبعدين شغّل [[docker run -d -p 6379:6379 redis]] وأعد الفحص: لازم يطلع FAIL على 6379. امسح الـ container وأعد تاني.",
          flag: "script",
          deep: {
            why: "أغلب مشاكل أول نشر مش في الكود: سيرفر رام قليلة من غير swap فالـ build يموت، أو الدومين لسه مش بيشاور على السيرفر فـ certbot يفشل، أو قاعدة البيانات مفتوحة للإنترنت. الفحص ده بيمسكهم في ثانيتين قبل ما تضيّع ساعة.",
            how: R`السكربت مفيهوش [[set -e]] عن قصد: الفحص المفروض يكمل للآخر ويوريك كل المشاكل مرة واحدة، مش يقف عند أول واحدة. وفيه [[set -u]] عشان متغير مكتوب غلط يبان.

الـ ٣ دوال [[ok]] و [[warn]] و [[bad]] بيطبعوا ويعدّوا. والشكل [[شرط && ok || bad]] معناه «لو الشرط نجح قول ok، وإلا قول FAIL». وده آمن هنا لأن ok نفسها عمرها ما بتفشل.

البورتات: [[ss -ltnH]] بيعرض اللي بيسمع على TCP من غير عناوين أعمدة، والفلتر [[sport = :5432]] بيجيب البورت ده بس. لو العنوان [[0.0.0.0]] أو [[[::]]] يبقى مفتوح على كل الواجهات، ولو [[127.0.0.1]] يبقى جوه السيرفر بس. والـ grep لازم يبص على عمود العنوان المحلي بس ([[awk '{print $4}']])، لأن عمود الـ peer بتاع أي socket سامع بيبقى [[0.0.0.0:*]].

SSH: [[sshd -T]] بيطبع الإعدادات «النهائية» اللي sshd شغال بيها فعلًا، بعد ما يقرا sshd_config وكل الملفات في sshd_config.d. ده أهم من grep على الملف، لأن صور Ubuntu على السحابة غالبًا فيها ملف في sshd_config.d بيرجّع الباسورد تاني. ومحتاج root، فمن غير sudo هيطلع warn.

DNS: [[getent ahostsv4]] بيجيب IPv4 بس، فالمقارنة مع IP السيرفر من ipify (اللي برضه IPv4 بـ [[-4]]) بتبقى عادلة.

وآخر سطر [[[ "$FAIL" -eq 0 ]]] هو الـ exit code بتاع السكربت كله، فتقدر تكتب [[./preflight.sh && ./deploy.sh deploy]].`,
            when: "قبل أول نشر على سيرفر جديد، وبعد أي تغيير كبير (نقل دومين، أو إضافة خدمة). وممكن يبقى أول خطوة في deploy.sh.",
            mistakes: "في مشروع حقيقي كان الفحص بيقارن ناتج [[getent hosts]] (اللي ممكن يرجع IPv6) بـ IPv4 من ipify، فيطلع «الدومين مش بيشاور هنا» وهو بيشاور. ولو ipify كان واقع، الـ IP بيبقى فاضي وكل الدومينات تفشل برسالة ملهاش معنى، فهنا بيطبع «server is unknown». وكان بيعمل grep على sshd_config بس، فيقول «keys only» والسيرفر فعليًا قابل باسورد من ملف في sshd_config.d. وكمان بيفترض Ubuntu و root من غير ما يقول. ولما جربت نسخة الدرس نفسها لقيت غلطتين اتصلحوا: الـ grep على سطر [[ss]] كله كان بيلاقي [[0.0.0.0]] في عمود الـ peer ([[0.0.0.0:*]])، فأي بورت سامع حتى على 127.0.0.1 كان بيطلع FAIL؛ و [[--fix]] كان بيطبع [[ok swap 4G created]] ويكتب في fstab حتى لو [[swapon]] فشل، لأن السكربت من غير [[set -e]] والسطور اللي بعد الـ && كانت بتتنفذ عادي."
          },
          teach: R`## الأول: شكل السكربت

٣ دوال صغيرة بتطبع وتعدّ ([[ok]] و [[warn]] و [[bad]])، وبعدهم فحوصات ورا بعض، كل فحص سطر أو اتنين، وفي الآخر ملخص و exit code. ومفيش [[set -e]] **عن قصد**: الفحص لازم يكمل للآخر ويوريك كل المشاكل.

جربته في container [[ubuntu:24.04]] (بعد ما سطّبت [[iproute2]] و [[procps]] و [[curl]] و [[openssh-server]])، وفتحت بورتات بـ [[nc]] عشان أشوف الفحص بيمسكها. والتجربة طلّعت غلطتين في نسخة الدرس واتصلحوا (تحت في البورتات والـ swap). والـ container شايف موارد الـ VM بتاعة Docker Desktop، فالأرقام كبيرة.

~~~text الناتج (أول تشغيل، الـ IP العام متغطي)
  ok    16 cores
  ok    926 GB free
  ok    swap 4096 MB
  FAIL  docker missing
  ok    port 5432 private
  ok    port 6379 private
  ok    port 27017 private
  warn  SSH password login is on
  FAIL  APP_HOST 'example.com' -> 172.66.147.243, server is 198.51.100.23
pass 6 · warn 1 · fail 2
exit=1
~~~

---

## ١. البداية

### [[set -uo pipefail]]

[[-u]] متغير مش معرّف = خطأ، و [[pipefail]]. **من غير [[-e]]**: لو فحص فشل، كمّل.

### [[FIX=0; [ "$__{1:-}" = "--fix" ] && FIX=1]]

- [[$__{1:-}]] أول argument، ولو مش موجود نص فاضي (من غيرها [[set -u]] كان هيوقف السكربت لو شغّلته من غير arguments).
- [[=]] جوه [[[ ]]] مقارنة نصوص.
- [[&& FIX=1]] لو الشرط صح، خلي FIX واحد.

### [[PASS=0; WARN=0; FAIL=0]]

٣ عدّادات. [[;]] بتفصل أوامر في نفس السطر.

### الـ ٣ دوال

~~~bash
ok()   { echo "  ok    $*"; PASS=$((PASS+1)); }
warn() { echo "  warn  $*"; WARN=$((WARN+1)); }
bad()  { echo "  FAIL  $*"; FAIL=$((FAIL+1)); }
~~~

- [[ok() { ...; }]] تعريف دالة اسمها [[ok]].
- [[$*]] كل الـ arguments اللي اتبعتت للدالة كنص واحد. فـ [[ok "16 cores"]] بتطبع [[ok    16 cores]] (بمسافتين قبلها).
- [[$((PASS+1))]] حساب أرقام في bash. [[$(( ))]] للحساب، و [[$( )]] لتشغيل أمر، متتلخبطش.

---

## ٢. الأنوية والمساحة

### [[CORES=$(nproc)]]

[[nproc]] عدد المعالجات المنطقية: [[16]].

### [[DISK_GB=$(df -BG --output=avail / | tail -1 | tr -dc '0-9')]]

من الشمال لليمين في الـ pipe:

~~~text df -BG --output=avail /
Avail
 926G
~~~

- [[-BG]] الوحدة جيجا (Block size = G)، و [[--output=avail]] عمود الفاضي بس، و [[/]] الديسك اللي عليه النظام.
- [[tail -1]] آخر سطر: [[ 926G]].
- [[tr -dc '0-9']]: [[tr]] بيبدّل حروف، [[-d]] امسح، [[-c]] عكس المجموعة. يعني «امسح أي حاجة **مش** رقم». النتيجة [[926]].

### [[[ "$CORES" -ge 2 ] && ok "..." || bad "..."]]

[[-ge]] أكبر من أو يساوي. والشكل [[شرط && ok || bad]]: لو الشرط صح [[ok]]، وإلا [[bad]]. آمن هنا لأن [[ok]] نفسها عمرها ما بتفشل (لو فشلت كانت [[bad]] هتتنفذ كمان).

نفس الكلام للديسك: أقل من 20 جيجا فاضية = FAIL.

---

## ٣. الـ swap

### [[SWAP_MB=$(free -m | awk '/^Swap:/{print $2}')]]

~~~text free -m
               total        used        free      shared  buff/cache   available
Mem:           15698         947       13112          18        1897       14750
Swap:           4096           0        4096
~~~

[[-m]] بالميجا. و [[awk '/^Swap:/{print $2}']]: في السطر اللي بيبدأ بـ [[Swap:]] اطبع العمود التاني (الإجمالي) = [[4096]].

### الـ if

~~~bash
if [ "$SWAP_MB" -ge 2048 ]; then ok "swap $SWAP_MB MB"
elif [ "$FIX" -eq 1 ]; then
  if fallocate -l 4G /swapfile && chmod 600 /swapfile && mkswap -q /swapfile && swapon /swapfile; then
    grep -q '^/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
    ok "swap 4G created"
  else bad "swap not created (see the error above)"; fi
else warn "no swap (run again with --fix)"; fi
~~~

| الأمر | بيعمل إيه |
|---|---|
| [[fallocate -l 4G /swapfile]] | احجز ملف 4 جيجا على الديسك |
| [[chmod 600 /swapfile]] | root بس يقرا ويكتب (فيه محتوى الـ RAM) |
| [[mkswap -q /swapfile]] | جهّزه كـ swap، و [[-q]] من غير كلام |
| [[swapon /swapfile]] | شغّله دلوقتي |
| [[grep -q '^/swapfile' /etc/fstab ||]] | لو مش مكتوب في fstab... |
| [[echo '/swapfile none swap sw 0 0' >> /etc/fstab]] | ...ضيفه، عشان يشتغل بعد الـ reboot |

[[/etc/fstab]] ملف بيقول للنظام يركّب إيه وقت الإقلاع. والسطر معناه: الملف ده، ملوش مكان تركيب ([[none]])، نوعه swap، بالإعدادات العادية ([[sw]])، ومن غير backup ولا فحص ([[0 0]]).

**الغلطة اللي اتصلحت:** النسخة القديمة كانت سلسلة [[&&]] لوحدها وبعدها [[ok]]. ولأن السكربت من غير [[set -e]]، لو [[swapon]] فشل السلسلة بتقف، بس السطرين اللي بعدها بيتنفذوا عادي. جربتها في الـ container (اللي مينفعش يعمل swapon) بعد ما خليت [[free]] يقول إن مفيش swap، وبملف 16M بدل 4G عشان مملاش الديسك:

~~~text النسخة القديمة
swapon: /swapfile: swapon failed: Operation not permitted
  ok    swap 4G created
/swapfile none swap sw 0 0          ← اتكتب في fstab كمان
~~~

~~~text النسخة المصلّحة
swapon: /swapfile: swapon failed: Operation not permitted
  FAIL  swap not created (see the error above)
fstab untouched
~~~

دلوقتي السلسلة كلها جوه [[if]]: fstab و [[ok]] بس لو كله نجح. وعلى VPS حقيقي بـ sudo الـ swapon بينجح (من التوثيق).

---

## ٤. Docker

[[command -v docker >/dev/null && ok "docker installed" || bad "docker missing"]]: في الـ container مفيش Docker، فطلع [[FAIL  docker missing]].

---

## ٥. البورتات المكشوفة

~~~bash
for p in 5432 6379 27017; do
  ss -ltnH "sport = :$p" | awk '{print $4}' | grep -qE '^(0\.0\.0\.0|\[::\]|\*):' && bad "port $p open to the world" || ok "port $p private"
done
~~~

### [[for p in 5432 6379 27017; do ... done]]

لف على بورتات Postgres و Redis و Mongo، وكل مرة الرقم في [[$p]].

### [[ss -ltnH "sport = :$p"]]

[[ss]] (socket statistics): [[-l]] السامعين بس، [[-t]] TCP، [[-n]] أرقام مش أسامي، [[-H]] من غير سطر العناوين. و [[sport = :6379]] فلتر: البورت المحلي (source port) ده بس.

فتحت [[nc -lk 0.0.0.0 6379]] و [[nc -lk 127.0.0.1 5432]]:

~~~text الناتج
LISTEN 0      1      0.0.0.0:6379 0.0.0.0:*
LISTEN 0      1      127.0.0.1:5432 0.0.0.0:*
~~~

الأعمدة: الحالة، الطابور، الحد، **العنوان المحلي**، والطرف التاني (peer).

### الغلطة اللي اتصلحت

النسخة القديمة كانت بتعمل grep على السطر كله. بص على آخر عمود: [[0.0.0.0:*]] موجود في **أي** socket سامع، فـ 5432 اللي على 127.0.0.1 طلع:

~~~text النسخة القديمة
  FAIL  port 5432 open to the world
  FAIL  port 6379 open to the world
~~~

عشان كده [[awk '{print $4}']] بياخد العمود الرابع (العنوان المحلي) بس، و [[grep -qE '^(0\.0\.0\.0|\[::\]|\*):']]: [[-q]] من غير طباعة، [[-E]] regex موسّع، [[^]] من أول النص، و [[\.]] نقطة حقيقية، والتلات بدايات «كل الواجهات» في IPv4 و IPv6 و [[*]].

~~~text النسخة المصلّحة
  ok    port 5432 private
  FAIL  port 6379 open to the world
  ok    port 27017 private
~~~

---

## ٦. SSH: [[sshd -T 2>/dev/null | grep -qx 'passwordauthentication no']]

- [[sshd -T]] (test mode) بيطبع الإعدادات **النهائية** بعد ما يقرا [[sshd_config]] وكل ملفات [[sshd_config.d]]. محتاج root ومفاتيح السيرفر.
- [[grep -qx]]: [[-x]] السطر كله لازم يطابق بالظبط.

~~~text sshd -T | grep passwordauthentication
passwordauthentication yes
~~~

فطلع [[warn  SSH password login is on]]. وبعد ما حطيت [[PasswordAuthentication no]] في ملف في [[/etc/ssh/sshd_config.d/]]:

~~~text الناتج
  ok    SSH keys only
~~~

---

## ٧. الدومين بيشاور على السيرفر ده؟

### [[IP=$(curl -4 -s --max-time 5 https://api.ipify.org || true)]]

- [[api.ipify.org]] موقع بيرد بالـ IP العام اللي الطلب جاي منه.
- [[-4]] IPv4 بس، [[-s]] من غير progress، [[--max-time 5]] متستناش أكتر من ٥ ثواني.
- [[|| true]] لو فشل، متعتبرهوش فشل (يبقى [[IP]] فاضي).

### [[HOST=$(grep -E '^APP_HOST=' .env 2>/dev/null | cut -d= -f2 || true)]]

السطر اللي بيبدأ بـ [[APP_HOST=]] من [[.env]]، وبعدين [[cut -d= -f2]] اللي بعد الـ [[=]]: [[example.com]].

### [[DNS=$(getent ahostsv4 "$HOST" | awk '{print $1; exit}')]]

~~~text getent ahostsv4 example.com
172.66.147.243  STREAM example.com
172.66.147.243  DGRAM
172.66.147.243  RAW
~~~

[[ahostsv4]] عناوين IPv4 بس (عشان نقارن بـ IPv4 من ipify). و [[awk '{print $1; exit}']] أول عمود من أول سطر واخرج.

### المقارنة

[[[ -n "$IP" ] && [ "$DNS" = "$IP" ] && ok ... || bad ...]]: لو IP مش فاضي والاتنين متساويين، تمام. وإلا FAIL برسالة فيها القيمتين، و [[$__{DNS:-nothing}]] تطبع [[nothing]] لو فاضي. هنا [[example.com]] مش بيشاور على الـ container ده، فـ FAIL، وده المطلوب.

---

## ٨. الآخر

### [[echo "pass $PASS · warn $WARN · fail $FAIL"]]

الملخص: [[pass 6 · warn 1 · fail 2]].

### [[[ "$FAIL" -eq 0 ]]]

آخر أمر في السكربت هو الـ exit code بتاعه. فيه FAIL = [[exit=1]]، فتقدر تكتب [[./preflight.sh && ./deploy.sh]] والنشر ميحصلش لو الفحص فشل.

---

## الخلاصة

| الفحص | الأداة | النتيجة |
|---|---|---|
| أنوية / مساحة | [[nproc]] و [[df -BG --output=avail]] | FAIL لو أقل من 2 / 20 |
| swap | [[free -m]] + [[--fix]] | warn، أو يعمله ويطلع FAIL لو فشل |
| بورتات القواعد | [[ss -ltnH]] + عمود العنوان المحلي | FAIL لو [[0.0.0.0]] أو [[[::]]] |
| SSH | [[sshd -T]] | warn لو الباسورد شغال |
| DNS | [[ipify]] و [[getent ahostsv4]] | FAIL لو مش متطابقين |
| النتيجة | [[[ "$FAIL" -eq 0 ]]] | exit code |`,
          lines: [
            "من غير [[-e]] عن قصد (الفحص يكمل للآخر)، بس المتغيرات غير المعرّفة غلطة.",
            "لو أول argument هو [[--fix]] فعّل وضع التصليح.",
            "عدّادات النتايج.",
            "دالة للنجاح: تطبع وتزوّد العدّاد.",
            "دالة للتحذير.",
            "دالة للفشل.",
            "عدد الأنوية.",
            "المساحة الفاضية على / بالجيجا، رقم بس ([[tr -dc]] يشيل أي حاجة مش رقم).",
            "أقل من نواتين يبقى فشل.",
            "أقل من 20 جيجا فاضية يبقى فشل.",
            "حجم الـ swap بالميجا من سطر Swap في [[free]].",
            "لو 2 جيجا أو أكتر: تمام.",
            "وإلا لو وضع التصليح شغال...",
            "...اعمل ملف swap بـ 4 جيجا، واقفل صلاحياته، وجهّزه، وشغّله.",
            "...وضيفه لـ fstab عشان يفضل بعد الـ reboot (لو مش موجود أصلًا).",
            "...وقول إنه اتعمل.",
            "...ولو أي خطوة فشلت (زي swapon من غير صلاحية)، FAIL ومتلمسش fstab.",
            "وإلا نبّه بس.",
            "Docker متسطب؟",
            "لف على بورتات Postgres و Redis و Mongo...",
            "...خد عمود العنوان المحلي بس ([[awk '{print $4}']])، ولو بيبدأ بـ 0.0.0.0 أو [::] أو * يبقى مكشوف للعالم، وإلا تمام.",
            "نهاية اللوب.",
            "الإعدادات الفعلية لـ sshd: هل الدخول بالباسورد مقفول؟",
            "IP السيرفر العام (IPv4)، ولو فشل يبقى فاضي من غير ما يوقع.",
            "الدومين من .env.",
            "الدومين بيشاور على أنهي IPv4.",
            "لو الاتنين متطابقين تمام، وإلا فشل برسالة فيها القيمتين.",
            "الملخص.",
            "الـ exit code: 0 لو مفيش ولا فشل."
          ],
          sol: R`شغّلته على بيئة التجربة هنا وطلع شكل الناتج ده (الأرقام هتختلف عندك):

[[ok    4 cores]]
[[FAIL  12 GB free (need 20)]]
[[warn  no swap (run again with --fix)]]
[[ok    port 6379 private]]
[[warn  SSH password login is on]]
[[pass 4 · warn 2 · fail 3]] والـ exit code [[1]].

بعد [[docker run -d -p 6379:6379 redis]] (جربتها بـ container تاني على نفس البورت) الفحص طلع [[FAIL  port 6379 open to the world]]، لأن Docker نشر البورت على [[0.0.0.0]]. بعد ما تمسح الـ container يرجع [[ok]]. والدرس هنا إن [[ufw]] مش بيحميك من ده، Docker بيتخطاه.

سطر [[APP_HOST]] بيقع لو [[.env]] مش جنب السكربت أو الدومين لسه مش بيشاور على السيرفر، وده مقصود: متنشرش قبل ما DNS يبقى صح. و [[--fix]] محتاج sudo لأنه بيعمل swap في [[/etc/fstab]].`
        },
        {
          cmd: "server-map.sh",
          title: "خريطة لسيرفر مش فاكر عليه إيه",
          desc: "سيرفر ورثته أو مدخلتهوش من سنة، وعايز تعرف: الكود فين؟ إيه اللي شغال؟ مين بيسمع على أنهي بورت؟ و Nginx موجّه لفين؟ السكربت ده بيجاوب في شاشة واحدة، ومش بيغيّر أي حاجة.",
          example: R`#!/usr/bin/env bash
# sudo bash server-map.sh 2>/dev/null | less
echo "== ports =="
ss -tlnp
echo "== docker =="
docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}'
docker compose ls
echo "== processes =="
pgrep -af 'node|python|php-fpm'
pm2 list || echo "no pm2 for this user"
systemctl list-units --type=service --state=running --no-pager
echo "== nginx =="
ls -l /etc/nginx/sites-enabled/ /etc/nginx/conf.d/
nginx -T | grep -E '^\s*(server_name|root|proxy_pass)' | sort -u
echo "== code =="
find /opt /var/www /srv /home -maxdepth 4 -not -path '*/node_modules/*' \( -name package.json -o -name 'docker-compose*.yml' -o -name compose.yml -o -name .git \)
echo "== cron =="
ls /etc/cron.d/ /var/spool/cron/crontabs/
echo "== disk =="
df -h /
du -sh /var/lib/docker /var/log`,
          try: "شغّله على سيرفر التجربة وحاول من الناتج بس ترسم: الدومين ده بيروح لـ Nginx، اللي بيعمل proxy لأنهي بورت، اللي تبع أنهي container أو بروسيس، اللي الكود بتاعه في أنهي فولدر.",
          flag: "script",
          deep: {
            why: "قبل ما تلمس سيرفر مش فاكره لازم تعرف الصورة كاملة، وإلا هتعمل deploy في فولدر غلط أو توقف خدمة حد تاني بيستخدمها.",
            how: R`ابدأ من البورتات: [[ss -tlnp]] بيقولك مين بيسمع على إيه واسم البروسيس (محتاج root عشان يطلع الاسم). ده أصدق مصدر، لأن أي حاجة شغالة فعلًا لازم تسمع على بورت.

[[docker compose ls]] بيطلع كل مشاريع compose الشغالة ومكان ملف الـ compose بتاع كل واحد. ده غالبًا أسرع طريق لـ «الكود فين».

[[pgrep -af]] بيدوّر على البروسيسات بالاسم ويطبع الأمر كامل، بدل [[ps aux | grep node | grep -v grep]]. و pm2 كل يوزر ليه قايمة لوحده، فلو شغّلت السكربت بـ sudo هتشوف قايمة root بس؛ جرّب [[sudo -u deploy pm2 list]].

[[nginx -T]] بيطبع الإعدادات كلها مجمّعة (كل الملفات المتضمَّنة)، والـ grep بيطلّع أسماء الدومينات والفولدرات والـ proxy_pass، فتعرف كل دومين رايح فين.

و [[find]] بـ [[-maxdepth 4]] وبيستبعد node_modules، ويدوّر على package.json وملفات compose وفولدرات .git في الأماكن المعتادة.

والآخر: الـ cron (مهام مجدولة ممكن تكون ناسيها) والمساحة، لأن سيرفر قديم غالبًا مليان لوجات أو images قديمة.`,
            when: "أول مرة تدخل سيرفر عميل، أو سيرفر بتاعك من زمان، أو قبل ما تنقل المشروع لسيرفر جديد.",
            mistakes: "في مشروع حقيقي كان السكربت بيدوّر على package.json من غير ما يستبعد node_modules، فبيطلع آلاف النتايج لولا [[head]]، وكان بيستخدم [[grep node | grep -v grep]]. والأهم إنه كان بيبص على pm2 و node بس، ومش بيبص على docker ولا البورتات ولا إعدادات nginx، فالصورة كانت ناقصة لأن المشروع فعليًا كان شغال في Docker."
          },
          teach: R`## الأول: ٧ أسئلة، كل واحد تحت عنوان

السكربت كله أوامر قراية بس، مفيش ولا أمر بيغيّر حاجة. كل جزء بيبدأ بـ [[echo "== ... =="]] عشان الناتج الطويل يبقى متقسّم: البورتات، و Docker، والبروسيسات، و Nginx، والكود، والـ cron، والمساحة.

جربته في container [[ubuntu:24.04]] عملت فيه «سيرفر قديم» صغير: Nginx فيه موقعين (واحد proxy لـ 3000 وواحد static)، وبرنامج Python سامع على [[127.0.0.1:3000]]، ومشروع في [[/opt/myapp]] فيه [[compose.yml]] و [[.git]] و [[node_modules]]، ومهمة cron. Docker و pm2 و systemd مش موجودين في الـ container، فهتشوف شكل الناتج لما أداة مش موجودة.

### إزاي بيتشغّل: [[sudo bash server-map.sh 2>/dev/null | less]]

- [[sudo]] عشان [[ss -p]] و [[nginx -T]] وقراية [[/var/spool/cron]] محتاجين root.
- [[2>/dev/null]] ارمي رسايل الأخطاء (زي [[docker: command not found]] لو مش متسطّب) عشان الناتج يبقى نضيف.
- [[| less]] اعرضه صفحة صفحة (مسافة = الصفحة الجاية، [[q]] = خروج، [[/]] = بحث).

---

## ١. [[ss -tlnp]]: مين سامع على إيه

[[-t]] TCP، [[-l]] السامعين بس، [[-n]] أرقام، [[-p]] (process) اسم البرنامج ورقمه.

~~~text الناتج
State  Recv-Q Send-Q Local Address:Port Peer Address:Port Process
LISTEN 0      5          127.0.0.1:3000      0.0.0.0:*    users:(("python3",pid=3120,fd=3))
LISTEN 0      511          0.0.0.0:80        0.0.0.0:*    users:(("nginx",pid=3112,fd=5))
LISTEN 0      511             [::]:80           [::]:*    users:(("nginx",pid=3112,fd=6))
~~~

اقرا [[Local Address:Port]] و [[Process]]:

- [[127.0.0.1:3000]] برنامج [[python3]]: جوه السيرفر بس، محدش من بره يوصله مباشرة.
- [[0.0.0.0:80]] و [[[::]:80]] Nginx على كل الواجهات (IPv4 و IPv6): ده الباب للإنترنت.
- [[pid=3120]] رقم البروسيس، هتلاقيه تاني في [[pgrep]].

ده أصدق مصدر في السكربت: أي حاجة شغالة فعلًا وبتخدم لازم تسمع على بورت. ولو البرنامج [[docker-proxy]] يبقى بورت container.

---

## ٢. Docker

### [[docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}']]

[[--format]] بيختار الأعمدة: [[table]] اعرضها جدول بعناوين، و [[{{.Names}}]] إلخ أسماء الخانات (Go template)، و [[\t]] tab بينهم. أهم عمود هنا [[Ports]] زي [[0.0.0.0:3000->3000/tcp]]، عشان تربطه بـ [[ss]].

### [[docker compose ls]]

كل مشاريع compose الشغالة، وعمود [[CONFIG FILES]] فيه مسار ملف الـ compose. يعني «الكود فين» في سطر واحد (شفنا شكله في درس «compose: نسخة تانية»).

في الـ container مفيش Docker:

~~~text الناتج (من غير 2>/dev/null)
/s/server-map.sh: line 6: docker: command not found
/s/server-map.sh: line 7: docker: command not found
~~~

والسكربت **كمّل** عادي لأنه مفيهوش [[set -e]]، وده المطلوب في سكربت استكشاف.

---

## ٣. البروسيسات

### [[pgrep -af 'node|python|php-fpm']]

[[pgrep]] بيدوّر على البروسيسات بالاسم. [[-f]] دوّر في الأمر الكامل مش الاسم بس، و [[-a]] اطبع الأمر الكامل. والنمط regex: [[|]] = «أو».

~~~text الناتج
3120 python3 -m http.server 3000 --bind 127.0.0.1
~~~

نفس الـ [[pid=3120]] اللي في [[ss]]. وبديل نضيف لـ [[ps aux | grep node | grep -v grep]].

### [[pm2 list || echo "no pm2 for this user"]]

قايمة pm2 (مدير بروسيسات Node). ولو مش موجود أو فشل، اطبع رسالة:

~~~text الناتج
pm2: command not found
no pm2 for this user
~~~

خد بالك: كل يوزر ليه pm2 بتاعه. تحت sudo بتشوف قايمة root بس؛ جرّب [[sudo -u deploy pm2 list]].

### [[systemctl list-units --type=service --state=running --no-pager]]

كل الخدمات الشغالة في systemd. [[--no-pager]] اطبع على طول من غير ما تفتح less جوه less. في الـ container مفيش systemd:

~~~text الناتج
System has not been booted with systemd as init system (PID 1). Can't operate.
~~~

على سيرفر حقيقي هتلاقي [[nginx.service]] و [[docker.service]] و [[ssh.service]] وأي خدمة اتعملت بإيد (من التوثيق).

---

## ٤. Nginx

### [[ls -l /etc/nginx/sites-enabled/ /etc/nginx/conf.d/]]

الفولدرين اللي Nginx بيقرا منهم إعدادات المواقع:

~~~text الناتج
/etc/nginx/conf.d/:
total 0

/etc/nginx/sites-enabled/:
lrwxrwxrwx 1 root root 34 ... default -> /etc/nginx/sites-available/default
lrwxrwxrwx 1 root root 32 ... myapp -> /etc/nginx/sites-available/myapp
~~~

الـ [[l]] في أول [[lrwxrwxrwx]] و [[->]] يعني symlink: الملف الحقيقي في [[sites-available]]، والـ link في [[sites-enabled]] هو اللي «بيفعّله».

### [[nginx -T | grep -E '^\s*(server_name|root|proxy_pass)' | sort -u]]

1. [[nginx -T]] بيفحص الإعدادات ويطبعها **كلها مجمّعة** (كل الملفات اللي [[include]] بيجيبها).
2. [[grep -E '^\s*(server_name|root|proxy_pass)']]: السطور اللي بعد المسافات اللي في أولها ([[^\s*]]) بتبدأ بواحدة من التلات كلمات.
3. [[sort -u]] رتّب وشيل المكرر.

~~~text الناتج
	root /var/www/html;
	server_name _;
        proxy_pass http://127.0.0.1:3000;
    root /var/www/docs;
    server_name docs.example.com;
    server_name example.com www.example.com;
~~~

- [[server_name example.com]] + [[proxy_pass http://127.0.0.1:3000]]: الدومين ده بيتحوّل للبرنامج اللي على 3000 (الـ python اللي شفناه).
- [[server_name docs.example.com]] + [[root /var/www/docs]]: موقع static من الفولدر ده.
- [[server_name _]] و [[/var/www/html]]: الموقع الافتراضي بتاع Nginx.

حاجتين خد بالك منهم: [[sort -u]] بيفك الربط بين كل [[server_name]] والـ [[proxy_pass]] بتاعه (عشان كده لو محتاج تتأكد افتح [[nginx -T | less]] ودوّر)، و [[^\s*]] معناها إن [[proxy_pass]] لازم يبقى أول السطر. أول مرة كتبت الإعداد [[location / { proxy_pass ...; }]] في سطر واحد والـ proxy_pass مظهرش خالص.

ورسالة [[nginx: configuration file ... test is successful]] بتطلع على stderr، فـ [[2>/dev/null]] بيخفيها.

---

## ٥. الكود فين

~~~bash
find /opt /var/www /srv /home -maxdepth 4 -not -path '*/node_modules/*' \( -name package.json -o -name 'docker-compose*.yml' -o -name compose.yml -o -name .git \)
~~~

| الحتة | معناها |
|---|---|
| [[/opt /var/www /srv /home]] | الأماكن المعتادة للمشاريع |
| [[-maxdepth 4]] | متنزلش أكتر من ٤ فولدرات جوه (أسرع، ومش هيلف الديسك كله) |
| [[-not -path '*/node_modules/*']] | تجاهل أي حاجة جوه node_modules |
| [[\( ... \)]] | قوسين للتجميع، و [[\]] عشان الـ shell ميفهمهمش هو |
| [[-name package.json -o ...]] | الاسم ده **أو** ([[-o]] = or) ده... |

~~~text الناتج
/opt/myapp/compose.yml
/opt/myapp/package.json
/opt/myapp/.git
~~~

كان فيه [[/opt/myapp/node_modules/x/package.json]] كمان، ومظهرش بسبب [[-not -path]]. على مشروع حقيقي ده الفرق بين ٣ سطور و ٣٠٠٠.

---

## ٦. الـ cron: [[ls /etc/cron.d/ /var/spool/cron/crontabs/]]

- [[/etc/cron.d/]] مهام النظام، كل ملف فيه مهمة أو أكتر.
- [[/var/spool/cron/crontabs/]] ملف لكل يوزر عمل [[crontab -e]] (محتاج root عشان تشوفه).

~~~text الناتج
/etc/cron.d/:
e2scrub_all
myapp-backup

/var/spool/cron/crontabs/:
~~~

[[myapp-backup]] المهمة اللي حطيتها: [[0 3 * * * root /opt/myapp/backup.sh]] (كل يوم الساعة ٣ الفجر). و [[e2scrub_all]] جاية مع النظام.

---

## ٧. المساحة

### [[df -h /]]

~~~text الناتج
Filesystem      Size  Used Avail Use% Mounted on
overlay        1007G   29G  928G   3% /
~~~

(الـ container بيشوف ديسك الـ VM بتاعة Docker Desktop.)

### [[du -sh /var/lib/docker /var/log]]

[[du]] (disk usage) حجم الفولدرات. [[-s]] رقم واحد للفولدر كله، و [[-h]] بالـ K و M و G.

~~~text الناتج
du: cannot access '/var/lib/docker': No such file or directory
368K	/var/log
~~~

على سيرفر قديم [[/var/lib/docker]] (images و volumes قديمة) و [[/var/log]] غالبًا أكبر حاجتين.

---

## الخلاصة: إزاي تجمّع الخريطة

| السؤال | من فين |
|---|---|
| الدومين رايح فين؟ | [[nginx -T]]: [[server_name]] ثم [[proxy_pass]] أو [[root]] |
| البورت ده مين؟ | [[ss -tlnp]]: [[docker-proxy]] = container، غير كده بروسيس |
| أنهي container؟ | [[docker ps]] بنفس البورت |
| الكود فين؟ | [[docker compose ls]] أو [[pgrep -af]] أو [[find]] |
| إيه اللي بيشتغل لوحده؟ | [[systemctl]] و الـ cron |
| المساحة | [[df]] و [[du]] |

في التجربة دي الخريطة طلعت: [[example.com → nginx → 127.0.0.1:3000 → python3 (pid 3120) → /opt/myapp]]، و [[docs.example.com → /var/www/docs]].`,
          lines: [
            "عنوان.",
            "كل البورتات اللي بيسمع عليها حاجة، واسم البروسيس.",
            "عنوان.",
            "الـ containers الشغالة في جدول: الاسم والـ image والبورتات والحالة.",
            "مشاريع compose الشغالة ومكان ملف كل واحد.",
            "عنوان.",
            "بروسيسات node و python و php بالأمر الكامل.",
            "قايمة pm2 (لليوزر الحالي بس).",
            "كل الخدمات الشغالة في systemd.",
            "عنوان.",
            "ملفات المواقع المفعّلة.",
            "الإعدادات المجمّعة، ومنها أسماء الدومينات والفولدرات والـ proxy_pass بس، من غير تكرار.",
            "عنوان.",
            "فين package.json وملفات compose وفولدرات git، من غير node_modules.",
            "عنوان.",
            "المهام المجدولة للنظام ولكل يوزر.",
            "عنوان.",
            "المساحة على /.",
            "حجم Docker واللوجات، أكبر اتنين بياكلوا المساحة عادة."
          ],
          sol: R`الإجابة النموذجية سطر لكل موقع، بالشكل ده:

[[example.com → nginx (server_name example.com) → proxy_pass http://127.0.0.1:3000 → container myapp-web-1 (0.0.0.0:3000->3000) → كوده في /opt/myapp (فيه compose.yml و .git)]]

بتجمّعها كده: من [[nginx -T]] خد الـ [[server_name]] و [[proxy_pass]] اللي تحته. البورت ده دوّر عليه في [[ss -tlnp]]: لو البرنامج [[docker-proxy]] يبقى container، وهتلاقيه في [[docker ps]] بنفس البورت. ولو [[node]] أو [[python]] يبقى process عادي، و [[pgrep -af]] بيوريك الأمر الكامل ومساره. ولو فيه [[root]] بدل [[proxy_pass]] يبقى موقع static من الفولدر ده. وبعدين [[find]] بيوريك فين الكود و compose.

لو بورت ظاهر في [[ss]] ومش لاقي ليه دومين في Nginx، يا إما حاجة قديمة منسية يا إما خدمة مكشوفة للنت من غير قصد (خصوصًا لو [[0.0.0.0]]). دوّنها في الخريطة. واقرا [[cron]] عشان متتفاجئش بباك أب أو سكربت بيشتغل بالليل.`
        }
      ]
    }
  ]
});
