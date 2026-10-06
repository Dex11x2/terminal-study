// تكملة تاب docker: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/docker/01.js (شرح حقول الدرس في أوله)
MORE("docker", [
    {
      t: "Docker Compose",
      l: 3,
      n: "مشروع كامل (تطبيق وقاعدة بيانات) في ملف واحد وأمر واحد",
      items: [
        {
          cmd: "compose.yml",
          title: "التطبيق وقاعدة البيانات مع بعض",
          desc: "ملف بيوصف كل الخدمات: من إيه تتبني، وبورتاتها، ومتغيراتها، وvolumes، وإيه بيعتمد على إيه. Compose بيعمل شبكة لوحده، فالتطبيق بيوصل للقاعدة باسمها [[db]].",
          example: R`services:
  api:
    build: .
    ports:
      - "127.0.0.1:3000:3000"
    env_file: .env
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: app
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      retries: 10
    restart: unless-stopped

volumes:
  pgdata:`,
          try: "احفظه كـ compose.yml وشغّل [[docker compose up -d]]. لاحظ إن api مبدأش غير بعد ما db بقت healthy.",
          flag: "script",
          deep: {
            why: "تشغيل التطبيق وقاعدة البيانات بأوامر run منفصلة كل مرة، بالبورتات والـ volumes والشبكة، مش عملي ومليان أخطاء. Compose بيحط كل ده في ملف واحد، وبيشغّله بأمر واحد.",
            how: R`الملف YAML، والمسافات فيه مهمة (مسافتين لكل مستوى، مش tab).

[[services]] الخدمات، كل واحدة container. [[api]] بتتبني من الفولدر الحالي ([[build: .]] يعني فيه Dockerfile هنا). [[db]] من image جاهزة.

[[ports]] نفس فكرة [[-p]]، وبين علامات تنصيص عشان YAML ميفهمش النقطتين غلط. و [[127.0.0.1:]] عشان البورت ميبقاش مفتوح للنت.

[[depends_on]] مع [[condition: service_healthy]] بيخلي api ميبدأش غير لما healthcheck بتاع db ينجح. من غير الـ condition، Compose بيشغّل db الأول بس مش بيستنى تبقى جاهزة، فالتطبيق يحاول يتصل ويفشل.

[[healthcheck]] بيشغّل [[pg_isready]] كل ٥ ثواني لحد ما ينجح. و [[restart: unless-stopped]] يرجّع الخدمة لو وقعت أو السيرفر عمل ريستارت.

[[volumes]] في آخر الملف بتعرّف الـ volume، وفي الخدمة بتربطه. و Compose بيعمل شبكة لوحده فـ api بيوصل للقاعدة على [[db:5432]].`,
            when: "كل مشروع فيه أكتر من خدمة. وحتى الخدمة الواحدة، الملف أوضح من أمر run طويل.",
            mistakes: "tab بدل مسافات فيطلع YAML error غامض. وكلمة [[version:]] في أول الملف: قديمة ومش محتاجة، وبتطلع تحذير."
          },
          teach: R`## الملف ده بيقول إيه؟

compose.yml وصف للمشروع كله: «عندي خدمتين، دي بتتبني من الكود، ودي من صورة جاهزة، ودي مستنية دي». وأمر واحد ([[docker compose up -d]]) بيحوّل الوصف لـ containers وشبكة و volume.

الملف YAML: كل مستوى مسافتين (مش Tab)، و [[مفتاح: قيمة]]، والقايمة سطورها بتبدأ بـ [[- ]]. جربته زي ما هو على Docker Desktop (البورت بس غيرته لـ 3097، والمشروع اسمه [[dk02-c]])، وتطبيق Node صغير بيرد [[hello v1]].

---

## خدمة api

| السطر | معناه |
|---|---|
| [[services:]] | بداية الخدمات. كل خدمة = container |
| [[api:]] | اسم الخدمة، وهو كمان اسمها على الشبكة |
| [[build: .]] | ابنيها من Dockerfile اللي في الفولدر ده |
| [[ports:]] + [[- "127.0.0.1:3000:3000"]] | زي [[-p]]: جهازك بس، 3000 لـ 3000. بين علامتين عشان YAML ممكن يفهم الأرقام بالنقطتين غلط |
| [[env_file: .env]] | زي [[--env-file]]: المتغيرات من الملف |
| [[depends_on:]] | بتعتمد على... |
| [[db:]] + [[condition: service_healthy]] | ...db، ومتبدأش غير لما الـ healthcheck بتاعها ينجح |
| [[restart: unless-stopped]] | لو وقعت أو الجهاز عمل restart، رجّعها، إلا لو انت اللي وقفتها |

## خدمة db

| السطر | معناه |
|---|---|
| [[image: postgres:16-alpine]] | من صورة جاهزة، بنسخة محددة |
| [[environment:]] | المتغيرات بشكل map |
| [[POSTGRES_PASSWORD: secret]] | الباسورد (في الحقيقة يتحط في .env) |
| [[POSTGRES_DB: app]] | اسم قاعدة تتعمل أول مرة |
| [[volumes:]] + [[- pgdata:/var/lib/postgresql/data]] | الـ volume على مسار البيانات |
| [[healthcheck:]] | فحص صحة |
| [[test: ["CMD-SHELL", "pg_isready -U postgres"] ]] | الأمر: [[pg_isready]] بيخرج بـ 0 لما القاعدة تقبل اتصالات |
| [[interval: 5s]] | كل ٥ ثواني |
| [[retries: 10]] | بعد ١٠ فشل ورا بعض تبقى unhealthy |

## آخر الملف

[[volumes:]] + [[pgdata:]] فاضية: تعريف الـ volume. compose هيعمله لو مش موجود.

---

## اللي حصل لما شغّلته

~~~text الناتج (من غير سطور الـ build)
 Image dk02-c-api Built
 Network dk02-c_default Created
 Volume dk02-c_pgdata Created
 Container dk02-c-db-1 Created
 Container dk02-c-api-1 Created
 Container dk02-c-db-1 Started
 Container dk02-c-db-1 Waiting
 Container dk02-c-db-1 Healthy
 Container dk02-c-api-1 Starting
 Container dk02-c-api-1 Started
~~~

اقراها بالترتيب: بنى صورة api، وعمل شبكة [[dk02-c_default]] و volume [[dk02-c_pgdata]] (اسم المشروع قدام كل حاجة)، وشغّل db، و **استنى** ([[Waiting]]) لحد [[Healthy]]، وبعدها بس شغّل api.

~~~text docker compose ps
NAME           IMAGE                SERVICE   STATUS                   PORTS
dk02-c-api-1   dk02-c-api           api       Up Less than a second    127.0.0.1:3097->3000/tcp
dk02-c-db-1    postgres:16-alpine   db        Up 6 seconds (healthy)   5432/tcp
~~~

[[5432/tcp]] من غير سهم: البورت جوه بس، مش مفتوح على جهازك.

اسم الـ container: [[المشروع-الخدمة-رقم]]. الرقم بيزيد لو عملت scale.

---

## الخلاصة

~~~text
services       كل خدمة container
build / image  من الكود أو من صورة جاهزة
ports          127.0.0.1:جهازك:جوه
depends_on + service_healthy   استنى لحد ما تبقى جاهزة فعلًا
volumes (آخر الملف)            تعريف الـ volumes
~~~`,
          lines: [
            "بداية الخدمات.",
            "خدمة التطبيق.",
            "ابنيها من Dockerfile في الفولدر ده.",
            "البورتات.",
            "3000 على السيرفر بس (127.0.0.1) يروح لـ 3000 جوه.",
            "المتغيرات من .env.",
            "بتعتمد على...",
            "...القاعدة...",
            "...ومش بتبدأ غير لما تبقى healthy.",
            "ترجع لو وقعت.",
            "خدمة القاعدة.",
            "من صورة جاهزة بنسخة محددة.",
            "متغيراتها.",
            "الباسورد (في الحقيقة من .env).",
            "اسم القاعدة اللي تتعمل أول مرة.",
            "الـ volumes بتاعتها.",
            "pgdata على مسار بيانات Postgres.",
            "فحص الصحة.",
            "الأمر: pg_isready بيرجع 0 لما القاعدة تقبل اتصالات.",
            "كل ٥ ثواني.",
            "أقصى ١٠ محاولات.",
            "ترجع لو وقعت.",
            "تعريف الـ volumes.",
            "pgdata (Docker يعمله لو مش موجود)."
          ],
          sol: R`[[docker compose up -d]] بيطبع ترتيب زي: [[Container myapp-db-1 Started]] وبعدها [[Container myapp-db-1 Waiting]] وبعدها [[Container myapp-db-1 Healthy]]، وبعد كده بس [[Container myapp-api-1 Starting]] و [[Started]]. ده [[condition: service_healthy]] شغال: api استنى الـ healthcheck.

و [[docker compose ps]] بيوري الاتنين [[Up ... (healthy)]] للـ db و [[Up]] للـ api.

الغلط الشائع: [[dependency failed to start: container myapp-db-1 is unhealthy]]: الـ healthcheck بيفشل (مثلًا [[pg_isready -U postgres]] واليوزر عندك اسمه تاني). شوف [[docker inspect --format '{{json .State.Health}}' myapp-db-1]]. ولو [[env file .env not found]]، اعمل ملف [[.env]] حتى لو فاضي.`
        },
        {
          cmd: "compose up / down",
          title: "أوامر التشغيل اليومية",
          desc: "[[up]] بيبني ويشغّل كل حاجة، وذكي: بيعيد بس اللي اتغير. [[down]] بيقفل ويمسح الـ containers والشبكة، بس الـ volumes بتفضل. الأوامر بتتشغّل من الفولدر اللي فيه الملف.",
          example: R`docker compose up -d --build
docker compose ps
docker compose logs -f api
docker compose exec api sh
docker compose restart api
docker compose down`,
          try: "عدّل سطر في الكود وشغّل [[up -d --build]]: هيعيد بناء api بس، و db هتفضل شغالة.",
          deep: {
            why: "دي الأوامر اللي هتكتبها كل يوم. وفهم [[up]] الذكي و [[down]] اللي بيمسح بيوفر عليك وقت وكوارث.",
            how: R`[[up]] بيقرا الملف ويوصّل الحالة الفعلية للمطلوبة: اللي مش موجود يعمله، واللي اتغير إعداده يعيده، واللي زي ما هو يسيبه. [[-d]] في الخلفية. [[--build]] يعيد بناء الصور من الكود الأول، ولازمها بعد أي تعديل في الكود، وإلا بيشغّل الصورة القديمة.

[[ps]] حالة خدمات المشروع ده بس. [[logs -f api]] لوج خدمة. [[exec api sh]] ادخل جوه (مش محتاج -it، Compose بيحطها).

[[restart]] بيعيد تشغيل الـ container بنفس الصورة والإعدادات. مش بيقرا تغييرات في compose.yml ولا في الكود، لده [[up -d]].

[[down]] بيوقف ويمسح الـ containers والشبكة. الـ volumes والـ images بتفضل. و [[down -v]] بيمسح الـ volumes كمان، ودي بتمسح قاعدة البيانات.

الأوامر بتشتغل من الفولدر اللي فيه compose.yml، أو [[-f مسار]] لملف تاني.`,
            when: "up -d --build بعد كل pull. logs -f أثناء التشخيص. down لما تخلص تجربة.",
            mistakes: "[[restart]] بعد تعديل الكود وتستغرب إن التعديل مظهرش. و [[down -v]] على الإنتاج."
          },
          teach: R`## ٦ أوامر بتكتبهم كل يوم

جربتهم على مشروع compose.yml اللي فات ([[dk02-c]]). كلهم بيتنفّذوا من الفولدر اللي فيه compose.yml.

---

## ١. [[docker compose up -d --build]]

| الجزء | معناه |
|---|---|
| [[up]] | خلّي الحاجات الشغالة مطابقة للملف |
| [[-d]] | في الخلفية |
| [[--build]] | ابني الصور من الكود الأول |

غيّرت النص في الكود لـ [[hello v2]] وشغّلته:

~~~text الناتج
 Image dk02-c-api Built
 Container dk02-c-db-1 Running
 Container dk02-c-api-1 Recreate
 Container dk02-c-api-1 Recreated
 Container dk02-c-api-1 Started
~~~

[[db]] قال [[Running]]: ماتلمسش. [[api]] بس اتعمله [[Recreate]] لأن صورته اتغيرت. ده «الذكاء» بتاع up.

## ٢. [[docker compose ps]]

حالة خدمات المشروع ده بس، مش كل containers الجهاز.

## ٣. [[docker compose logs -f api]]

لوج خدمة api. [[-f]] (follow) يفضل يتابع لحد ما تدوس Ctrl+C. كل سطر قدامه اسم الخدمة:

~~~text الناتج
api-1  | api on 3000
~~~

## ٤. [[docker compose exec api sh]]

ادخل shell جوه api. compose بيعمل [[-it]] لوحده. جربت أوامر جواه:

~~~text الناتج
root
/app
Dockerfile
server.js
~~~

[[whoami]] قال root، و [[pwd]] قال [[/app]] (الـ WORKDIR)، و [[ls]] الملفات.

## ٥. [[docker compose restart api]]

قبل ما أعمل [[--build]]، جربت restart بعد تعديل الكود:

~~~text الناتج
 Container dk02-c-api-1 Restarting
 Container dk02-c-api-1 Started
hello v1
~~~

النص لسه القديم: restart = نفس الـ container ونفس الصورة.

## ٦. [[docker compose down]]

بيوقف ويمسح الـ containers والشبكة. الـ volumes والصور بيفضلوا، فقاعدة البيانات سليمة. [[down -v]] بيمسح الـ volumes كمان (درس «أوامر مفيدة» فيه الناتج).

---

## الخلاصة

| عايز | الأمر |
|---|---|
| شغّل أو طبّق تعديل كود | [[up -d --build]] |
| طبّق تعديل compose.yml بس | [[up -d]] |
| شوف الحالة | [[ps]] |
| تابع لوج | [[logs -f اسم]] |
| ادخل جوه | [[exec اسم sh]] |
| أعد التشغيل بنفس كل حاجة | [[restart اسم]] |
| اقفل (البيانات تفضل) | [[down]] |`,
          lines: [
            "ابني الصور من الكود وشغّل كل حاجة في الخلفية.",
            "حالة خدمات المشروع.",
            "تابع لوج api.",
            "ادخل api.",
            "أعد تشغيل api بنفس الصورة (مش بيقرا تعديلات).",
            "اقفل وامسح الـ containers والشبكة (الـ volumes تفضل)."
          ],
          sol: R`بعد ما تعدّل كود الـ api وتعمل [[docker compose up -d --build]]، الناتج بيوري [[Container myapp-db-1 Running]] (ماتلمسش) و [[Container myapp-api-1 Recreate]] و [[Recreated]] و [[Started]]. عندي بالظبط كده، و curl بعدها رجّع النص الجديد.

ده لأن compose بيقارن إعدادات كل خدمة والـ image بتاعتها: db الـ image والإعدادات زي ما هي، فمفيش سبب يعيده.

الغلط الشائع: [[docker compose restart api]] بعد تعديل الكود ومفيش حاجة تتغير: restart بيعيد تشغيل نفس الـ container بنفس الـ image القديمة. محتاج [[up -d --build]]. وخلّي بالك إن [[down -v]] بيمسح الـ volumes، يعني قاعدة البيانات.`
        },
        {
          cmd: "dev و prod",
          title: "ملفين: تطوير وإنتاج",
          desc: "في التطوير عايز hot reload وبورتات مفتوحة، وفي الإنتاج image مبنية وبورتات مقفولة. compose بيدمج ملفين: الأساسي زائد override للتطوير. الـ node_modules volume الفاضي بيمنع node_modules بتاع جهازك إنه يغطي على اللي جوه الـ container.",
          example: R`services:
  api:
    build:
      target: build
    command: npm run dev
    ports:
      - "3000:3000"
      - "9229:9229"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      NODE_ENV: development`,
          try: "احفظه كـ compose.override.yml وشغّل [[docker compose up]]: عدّل الكود وشوف nodemon بيعيد التشغيل جوه الـ container.",
          flag: "script",
          deep: {
            why: "نفس المشروع محتاج يشتغل بطريقتين: في التطوير بالكود من جهازك مع hot reload وبورتات مفتوحة للـ debugger، وفي الإنتاج بـ image مبنية ومقفولة.",
            how: R`Compose بيقرا compose.yml وبعده compose.override.yml لوحده لو موجود، وبيدمج التاني فوق الأول. فالأساسي فيه إعدادات الإنتاج، والـ override فيه تغييرات التطوير بس، وعلى السيرفر متحطش الـ override.

[[target: build]] بيبني لحد مرحلة الـ build بس من الـ multi-stage، ودي فيها devDependencies و nodemon.

[[command: npm run dev]] بيغطي على CMD بتاع الـ image.

[[volumes]] فيه السطر الأهم: [[.:/app]] بيربط الكود من جهازك. بس ده هيغطي على node_modules اللي اتسطّب جوه الـ image بـ node_modules بتاع جهازك (ممكن يبقى لويندوز أو فاضي). السطر [[/app/node_modules]] بيعمل volume مجهول على المسار ده بس، فبيحمي node_modules اللي جوه الـ container من التغطية. وده trick لازم تعرفه.

و [[9229]] بورت الـ debugger بتاع Node، عشان VS Code يتصل بيه.`,
            when: "كل مشروع بتطوّره بـ Docker. وفي CI بتستخدم [[-f compose.yml]] بس من غير override.",
            mistakes: "نسيان سطر [[/app/node_modules]] فالتطبيق يقع بـ module not found أو بـ errors في مكتبات native."
          },
          teach: R`## فكرة الملفين

compose بيقرا [[compose.yml]]، ولو لقى جنبه [[compose.override.yml]] بيقراه **لوحده** ويدمجه فوقه. فالأساسي فيه الإنتاج، والـ override فيه فروق التطوير بس، وعلى السيرفر الـ override مش موجود.

جربته: compose.yml فيه [[build: .]] والبورت بس، والـ override هو المثال ده (بورتات مختلفة عشان مايتخانقش مع حاجة على الجهاز)، و Dockerfile فيه مرحلتين: [[build]] (فيها npm install) والأخيرة (للإنتاج).

---

## المثال سطر سطر

| السطر | معناه |
|---|---|
| [[services:]] / [[api:]] | بنعدّل خدمة api الموجودة في الأساسي |
| [[build:]] + [[target: build]] | ابني لحد المرحلة اللي اسمها build في الـ Dockerfile بس ([[FROM ... AS build]]) |
| [[command: npm run dev]] | شغّل سكربت dev بدل CMD بتاع الصورة |
| [[- "3000:3000"]] | التطبيق، مفتوح على كل الكروت (تطوير) |
| [[- "9229:9229"]] | بورت الـ debugger بتاع Node |
| [[- .:/app]] | الكود من جهازك لايف |
| [[- /app/node_modules]] | volume مجهول يحمي node_modules بتاعة الصورة |
| [[NODE_ENV: development]] | وضع التطوير |

---

## [[docker compose config]] بيوري الدمج

~~~text الناتج (جزء)
  api:
    build:
      context: D:\...\dev
      dockerfile: Dockerfile
      target: build
    command:
      - npm
      - run
      - dev
    environment:
      NODE_ENV: development
    volumes:
      - type: bind
        source: D:\...\dev
        target: /app
      - type: volume
        target: /app/node_modules
~~~

compose حوّل [[.]] لمسار كامل، وكتب الـ volume المجهول [[type: volume]] من غير [[source]] (من غير اسم). والـ [[ports]] طلعت فيها بورت الأساسي وبورتات الـ override **مع بعض**: القوايم بتتجمع في الدمج (درس [[-f و -p]]).

## واللوج

~~~text الناتج
> dev
> nodemon server.js
[nodemon] starting $__btnode server.js$__bt
listening, NODE_ENV=development
~~~

الـ command اتغير، والمتغير وصل. وعلى ويندوز التعديل محتاج polling عشان nodemon يحس (درس «hot reload على ويندوز»، وفيه التجربة).

### وفي الإنتاج

~~~bash
docker compose -f compose.yml up -d
~~~

[[-f]] صريح يعني اقرا الملف ده بس، والـ override مايتقريش حتى لو موجود بالغلط.

---

## الخلاصة

~~~text
compose.yml             الإنتاج
compose.override.yml    فروق التطوير، بيتقري لوحده
target                  مرحلة من multi-stage
.:/app + /app/node_modules   الكود لايف من غير ما يبوّظ المكتبات
-f compose.yml          على السيرفر: الأساسي بس
~~~`,
          lines: [
            "تعديلات على الخدمات.",
            "خدمة api.",
            "إعدادات الـ build.",
            "ابني لحد مرحلة build بس (فيها devDependencies).",
            "شغّل nodemon بدل node.",
            "البورتات.",
            "3000 مفتوح على كل الكروت (تطوير).",
            "بورت debugger بتاع Node.",
            "الـ volumes.",
            "الكود من جهازك لايف.",
            "volume فاضي فوق node_modules عشان يحمي اللي جوه الصورة من التغطية.",
            "المتغيرات.",
            "وضع التطوير."
          ],
          sol: R`[[docker compose up]] بيقرا [[compose.yml]] و [[compose.override.yml]] لوحده، فهتلاقي في اللوج [[[nodemon] starting $__btnode server.js$__bt]]. ولما تعدّل ملف وتحفظ: [[[nodemon] restarting due to changes...]] وبعدها [[starting]] تاني، من غير build.

و [[docker compose config]] بيوري الدمج: [[command: npm run dev]] و [[target: build]] والبورتين والـ volumes.

الأغلاط الشائعة: [[nodemon: not found]]: مرحلة الـ build مفيهاش devDependencies (اتسطبت بـ [[--omit=dev]]) أو الـ target غلط. والتعديل مش بيوصل على ويندوز: ضيف polling (درس hot reload). وفي الإنتاج اكتب [[docker compose -f compose.yml up -d]] صريح عشان الـ override مايتقريش.`
        },
        {
          cmd: "compose watch",
          title: "hot reload من غير bind mount",
          desc: "[[docker compose watch]] بيراقب ملفاتك: تعديل في الكود يتنسخ جوه الـ container فورًا ([[sync]])، وتعديل في package.json يعيد بناء الـ image لوحده ([[rebuild]]). أنضف من bind mount ومفيش مشكلة node_modules. ولو بتبدأ مشروع من الصفر، [[docker init]] بيولّد Dockerfile و compose.yaml و .dockerignore جاهزين تعدّل عليهم.",
          example: R`services:
  api:
    build: .
    ports:
      - "127.0.0.1:3000:3000"
    develop:
      watch:
        - action: sync
          path: ./src
          target: /app/src
        - action: rebuild
          path: package.json`,
          try: "احفظه وشغّل [[docker compose watch]] (أو [[docker compose up --watch]])، وعدّل ملف في src وشوف التغيير وصل من غير build، وبعدين ضيف باكدج وشوف الـ rebuild.",
          flag: "script",
          deep: {
            why: "الـ bind mount في التطوير بيجيب مشاكل: node_modules بتاع جهازك، وبطء على ويندوز وماك. watch بيحل ده بإنه ينسخ اللي اتغير بس.",
            how: R`تحت [[develop.watch]] قايمة قواعد. [[sync]] بينسخ الملفات اللي اتغيرت من [[path]] لـ [[target]] جوه الـ container (ومعاه nodemon أو vite بيعيد التشغيل). [[rebuild]] بيعيد بناء الـ image ويبدّل الـ container. [[sync+restart]] بينسخ ويعمل restart، مفيد لملفات الإعدادات. الملفات اللي في .dockerignore مش بتتراقب.

و [[docker init]] بيسألك نوع المشروع (Node، Python، Go) ويكتبلك الملفات التلاتة بإعدادات معقولة.`,
            when: "التطوير اليومي بـ Docker، بدل الـ override بالـ bind mount.",
            mistakes: "تستخدم watch على السيرفر. ده للتطوير بس. وتنسى إن sync مش بيعيد التسطيب: باكدج جديد محتاج قاعدة rebuild."
          },
          teach: R`## بديل الـ bind mount

بدل ما الفولدر كله يبقى مربوط، [[watch]] بيراقب ملفاتك على جهازك، ولما حاجة تتغير **ينسخها** جوه الـ container، أو يعيد البناء لو التغيير محتاج كده.

---

## المثال سطر سطر

| السطر | معناه |
|---|---|
| [[build: .]] | الصورة من الكود |
| [[ports:]] + [[- "127.0.0.1:3000:3000"]] | جهازك بس |
| [[develop:]] | إعدادات وقت التطوير بس، [[up]] العادي بيتجاهلها |
| [[watch:]] | قايمة قواعد المراقبة |
| [[- action: sync]] | القاعدة الأولى: انسخ الملفات اللي اتغيرت |
| [[path: ./src]] | راقب الفولدر ده (نسبي من مكان compose.yml) |
| [[target: /app/src]] | وانسخ على المسار ده جوه |
| [[- action: rebuild]] | القاعدة التانية: ابني الصورة من جديد واعمل container جديد |
| [[path: package.json]] | لو الملف ده اتغير |

---

## جربته

نفس الملف (بورت 3100)، والتطبيق شغال بـ [[node --watch]] عشان يعيد التشغيل لما ملف يتغير جواه.

~~~bash
docker compose watch
~~~

الأمر بيفضل شغال قدامك:

~~~text الناتج
 Container dk02-w-api-1 Started
Watch enabled
~~~

عدّلت [[src/index.js]] من [[watch v1]] لـ [[watch v2]]:

~~~text الناتج
Syncing service "api" after 2 changes were detected
~~~

(تغييرين لأن [[sed -i]] بيكتب ملف مؤقت ويبدّله.) والـ curl رجّع [[watch v2]] من غير build. ده على درايف ويندوز ومن غير polling: watch بيتفرج على الملفات من ناحية جهازك، فمشكلة الإشعارات مش موجودة.

وبعدين عدّلت [[package.json]]:

~~~text الناتج
Rebuilding service(s) ["api"] after changes were detected...
 Image dk02-w-api Built
service(s) ["api"] successfully built
 Container dk02-w-api-1 Recreated
 Container dk02-w-api-1 Started
~~~

### و [[docker init]]؟

أمر تفاعلي بيسألك عن نوع المشروع ويكتب Dockerfile و compose.yaml و .dockerignore. مجربتهوش هنا لأنه بيستنى إجابات؛ الوصف من توثيق Docker.

---

## الخلاصة

| الـ action | بيعمل إيه | مناسب لـ |
|---|---|---|
| [[sync]] | ينسخ الملف | الكود |
| [[sync+restart]] | ينسخ ويعمل restart | ملفات الإعدادات |
| [[rebuild]] | يبني ويعمل container جديد | package.json والمكتبات |`,
          lines: [
            "الخدمات.",
            "خدمة api.",
            "ابنيها من الفولدر ده.",
            "البورتات.",
            "3000 على الجهاز بس.",
            "إعدادات التطوير.",
            "قواعد المراقبة.",
            "القاعدة الأولى: انسخ اللي اتغير...",
            "...من src عندك...",
            "...لـ /app/src جوه الـ container.",
            "القاعدة التانية: أعد البناء...",
            "...لو package.json اتغير."
          ],
          sol: R`[[docker compose watch]] بيبني ويشغّل ويطبع [[Watch enabled]]. لما تعدّل ملف في [[src]]: [[Syncing service "api" after 1 changes were detected]]، و [[docker compose exec api cat /app/src/الملف]] بيوري المحتوى الجديد، من غير build.

لما تعدّل [[package.json]] (زي ما تضيف باكدج): [[Rebuilding service(s) ["api"] after changes were detected...]] وبعدها [[Container ...-api-1 Recreated]] و [[Started]]. جربت الاتنين والنتيجة كانت كده بالظبط.

الغلط الشائع: الـ sync بيوصل بس التطبيق مش بيعيد التحميل، لأن الـ container شغال بـ [[node]] مش nodemon أو [[node --watch]]؛ الـ sync بينقل الملف بس. و [[path]] لازم يبقى نسبي من مكان الـ compose.yml، و [[target]] مسار جوه الـ container.`
        },
        {
          cmd: "profiles و scale",
          title: "خدمات اختيارية وأكتر من نسخة",
          desc: "[[profiles]] بتخلي خدمة متشتغلش غير لما تطلبها (زي أداة إدارة قاعدة البيانات). و [[--scale]] بيشغّل كذا نسخة من خدمة، و DNS بتاع Docker بيوزّع عليهم بالاسم (مش load balancer حقيقي).",
          example: R`docker compose --profile tools up -d
docker compose up -d --scale worker=3
docker compose config
docker compose pull && docker compose up -d`,
          try: "ضيف خدمة adminer بـ profile اسمه tools، وشغّلها بس لما تحتاجها.",
          deep: {
            why: "فيه خدمات مش عايزها تشتغل كل مرة، زي أداة لإدارة قاعدة البيانات. وأحيانًا عايز أكتر من نسخة من worker.",
            how: R`في الملف، خدمة عليها [[profiles: [tools]]] مش بتشتغل مع [[up]] العادي. بتشتغل بس لما تكتب [[--profile tools]]. مفيد لـ adminer و mailhog وأدوات التطوير.

[[--scale worker=3]] بيشغّل ٣ containers من خدمة worker. بس متحددش [[container_name]] ولا [[ports]] ثابتة للخدمة دي، وإلا هيتعارضوا. ولو خدمة ويب، محتاج load balancer قدامها (Nginx بيقدر يعمل ده بالأسامي).

[[config]] بيطبع الملف النهائي بعد الدمج وتبديل المتغيرات، وده أول حاجة تعملها لو حاجة مش مفهومة.

[[pull && up -d]] هو deploy الإنتاج لو الصور جاية من registry: نزّل الجديد وطبّقه.`,
            when: "profiles لأدوات التطوير. scale لـ workers بتعالج queue.",
            mistakes: "scale لخدمة ليها بورت ثابت أو container_name."
          },
          teach: R`## حاجتين في درس واحد

- **profiles**: خدمة عليها [[profiles: [tools] ]] نايمة لحد ما تطلبها بالاسم.
- **scale**: كذا container من نفس الخدمة.

جربت على مشروع [[dk02-c]] بعد ما ضفت خدمتين:

~~~text compose.yml (الإضافة)
  worker:
    image: node:22-alpine
    command: ["node", "-e", "setInterval(()=>{}, 1000)"]
  adminer:
    image: adminer
    profiles: [tools]
    ports: ["127.0.0.1:8098:8080"]
~~~

worker هنا بيعمل loop فاضي ويفضل شغال، بدل worker حقيقي.

---

## ١. [[docker compose --profile tools up -d]]

[[up -d]] العادي الأول شغّل worker ومشغّلش adminer خالص. ومع [[--profile tools]]:

~~~text الناتج
 Container dk02-c-worker-1 Running
 Container dk02-c-adminer-1 Created
 Container dk02-c-adminer-1 Started
~~~

## ٢. [[docker compose up -d --scale worker=3]]

~~~text الناتج
 Container dk02-c-worker-1 Running
 Container dk02-c-worker-3 Created
 Container dk02-c-worker-2 Created
 Container dk02-c-worker-3 Started
 Container dk02-c-worker-2 Started
~~~

الرقم في آخر الاسم هو رقم النسخة. واسم الخدمة على الشبكة بيرجع الـ IPs التلاتة:

~~~text الناتج: nslookup worker من container تاني
Address: 172.25.0.4
Address: 172.25.0.5
Address: 172.25.0.3
~~~

وده التوزيع اللي بيعمله DNS بتاع Docker: مش load balancer، كل اللي بيسأل بياخد القايمة ويختار.

وجربت scale لخدمة ليها بورت ثابت ([[api=2]] و api عليها [[127.0.0.1:3097:3000]]):

~~~text الناتج
Bind for 127.0.0.1:3097 failed: port is already allocated
~~~

النسخة التانية عايزة نفس البورت على جهازك.

## ٣. [[docker compose config]]

اطبع الملف النهائي (فيه شرح كامل في «أوامر مفيدة»). مفيد هنا تتأكد إن [[profiles]] متكتبة صح.

## ٤. [[docker compose pull && docker compose up -d]]

[[pull]] نزّل أحدث نسخة من كل صورة جاية من registry (الخدمات اللي فيها [[build]] بس بتتساب). [[&&]] لو نجح، [[up -d]] يعمل recreate للخدمات اللي صورتها اتغيرت بس. جربت [[pull]] وبدأ ينزّل طبقات ([[Downloading]]) ووقفته، عشان مايحدّثش صور مشتركة على الجهاز.

---

## الخلاصة

~~~text
profiles: [tools]         خدمة اختيارية
--profile tools           شغّلها معاهم
--scale worker=3          ٣ نسخ؛ من غير ports ثابتة ولا container_name
pull && up -d             deploy من registry
~~~`,
          lines: [
            "شغّل الخدمات اللي عليها profile اسمه tools كمان.",
            "٣ نسخ من worker.",
            "اطبع الملف النهائي بعد الدمج والمتغيرات.",
            "deploy لو الصور من registry: نزّل الجديد وطبّق."
          ],
          sol: R`[[docker compose up -d]] العادي مش بيشغّل adminer خالص. و [[docker compose --profile tools up -d]] بيطبع [[Container myapp-adminer-1 Created]] و [[Started]] والباقي [[Running]]، و [[docker compose ps]] بيوريه في القايمة.

والخدمة نفسها:
[[adminer: { image: adminer, profiles: [tools], ports: ["127.0.0.1:8081:8080"] }]].

و [[docker compose down]] العادي (من غير [[--profile]]) قفل adminer كمان على Compose v5.3: بيقفل كل containers المشروع. النسخ القديمة من Compose كانت ممكن تسيبه، فلو نسختك قديمة اكتب نفس الـ profile في down. والغلط الشائع: و [[--scale]] مع خدمة عندها [[container_name]] أو بورت ثابت زي [[3000:3000]] هيفشل بـ [[port is already allocated]]، فالخدمة اللي بتعملها scale ماتنشرش بورت.`,
          solCode: R`cat >> compose.yml <<'EOF2'
  adminer:
    image: adminer
    profiles: [tools]
    ports: ["127.0.0.1:8081:8080"]
EOF2
docker compose up -d
docker compose --profile tools up -d
docker compose --profile tools ps`
        },
        {
          cmd: "أوامر مفيدة",
          title: "اللي هتحتاجه وانت بتشخّص",
          desc: "[[config]] بيطبع الملف النهائي بعد الدمج والمتغيرات، فتشوف Compose فاهم إيه بالظبط. [[top]] العمليات جوه كل خدمة. و [[down -v]] في الآخر بيمسح الـ volumes يعني قاعدة البيانات: للتطوير بس، عمره ما يتشغّل على الإنتاج.",
          example: R`docker compose config
docker compose top
docker compose logs --since 5m
docker compose down -v --remove-orphans`,
          try: "شغّل [[docker compose config]] وشوف الـ environment والـ volumes بعد ما اتدمجوا من الملفين.",
          flag: "danger",
          deep: {
            why: "لما Compose يتصرف غير المتوقع، محتاج تشوف هو فاهم إيه، وإيه اللي شغال جواه، وإيه اللي حصل.",
            how: R`[[config]] بيدمج كل الملفات (الأساسي والـ override)، ويبدّل المتغيرات من .env، ويطبع النتيجة النهائية. لو متغير ظهر فاضي هنا، يبقى المشكلة في .env مش في Docker.

[[top]] العمليات جوه كل خدمة بأرقامها على السيرفر. [[logs --since 5m]] لوجات كل الخدمات في آخر ٥ دقايق، مفيد تشوف تسلسل الأحداث بين الخدمات.

[[down -v --remove-orphans]]: بيمسح كل حاجة بما فيها volumes و containers من خدمات كانت في الملف واتشالت (orphans). ده للبدء من الصفر في التطوير بس.`,
            when: "config أول ما حاجة تبقى غريبة. logs --since لما خدمتين مش بيكلموا بعض.",
            mistakes: "down -v على الإنتاج، تاني وتالت مرة نقولها."
          },
          teach: R`## ٤ أوامر للتشخيص (والأخير خطر)

جربتهم على مشروع [[dk02-c]] (api و db).

---

## ١. [[docker compose config]]

بيقرا كل الملفات، ويدمجها، ويبدّل المتغيرات، ويطبع النتيجة **زي ما compose فاهمها**:

~~~text الناتج (جزء)
name: dk02-c
services:
  api:
    build:
      context: D:\...\c
      dockerfile: Dockerfile
    depends_on:
      db:
        condition: service_healthy
        required: true
    environment:
      API_KEY: abc
    ports:
      - mode: ingress
        host_ip: 127.0.0.1
        target: 3000
        published: "3097"
        protocol: tcp
~~~

لاحظ: [[env_file: .env]] اختفى، واتحط مكانه [[environment]] فيه القيمة الحقيقية ([[API_KEY: abc]]). يعني الناتج فيه أسرارك، متلصقوش في أي حتة. والبورت اتكتب بالشكل الطويل:

| الخانة | معناها |
|---|---|
| [[host_ip]] | مين يوصل |
| [[published]] | بورت جهازك |
| [[target]] | بورت جوه |

## ٢. [[docker compose top]]

العمليات جوه كل خدمة:

~~~text الناتج (جزء)
SERVICE  #   UID   PID     PPID    C   STIME  TTY  TIME      CMD
api      1   root  395006  394982  4   12:05  ?    00:00:00  node server.js
db       1   70    393119  393083  0   12:04  ?    00:00:00  postgres
db       1   70    393333  393119  0   12:04  ?    00:00:00  postgres: checkpointer
~~~

| العمود | معناه |
|---|---|
| [[#]] | رقم النسخة (لو فيه scale) |
| [[UID]] | اليوزر. 70 هو يوزر postgres في صورة alpine |
| [[PID]] / [[PPID]] | رقم العملية ورقم أبوها، زي ما الماكينة اللي عليها Docker شايفاهم |
| [[CMD]] | الأمر |

## ٣. [[docker compose logs --since 5m]]

لوج **كل** الخدمات في آخر ٥ دقايق، كل سطر باسم خدمته ([[api-1  |]] و [[db-1   |]]). تقدر تكتب [[30s]] أو [[2h]] أو تاريخ.

## ٤. [[docker compose down -v --remove-orphans]]

| الجزء | معناه |
|---|---|
| [[down]] | وقّف وامسح containers والشبكة |
| [[-v]] | وامسح الـ volumes (يعني قاعدة البيانات) |
| [[--remove-orphans]] | وامسح containers من خدمات كانت في الملف واتشالت |

شيلت worker من الملف (كان عنده ٣ نسخ شغالة)، فـ [[up]] حذّر:

~~~text الناتج
Found orphan containers (dk02-c-worker-1, dk02-c-worker-3, dk02-c-worker-2) for this project.
~~~

وبعدها [[down -v --remove-orphans]]:

~~~text الناتج (جزء)
 Container dk02-c-worker-2 Removed
 Container dk02-c-api-1 Removed
 Container dk02-c-db-1 Removed
 Volume dk02-c_pgdata Removing
 Volume dk02-c_pgdata Removed
 Network dk02-c_default Removed
~~~

سطر [[Volume ... Removed]] ده معناه إن قاعدة البيانات راحت. على مشروع تجربة ده المطلوب، وعلى الإنتاج كارثة.

---

## الخلاصة

~~~text
config                    compose فاهم إيه (وفيه أسرار)
top                       مين شغال جوه كل خدمة
logs --since 5m           كل الخدمات بالترتيب الزمني
down -v --remove-orphans  ابدأ من الصفر: تطوير بس
~~~`,
          lines: [
            "الملف النهائي كما Compose فاهمه.",
            "العمليات جوه كل خدمة.",
            "لوجات كل الخدمات في آخر ٥ دقايق.",
            "امسح كل حاجة بما فيها volumes وخدمات اتشالت من الملف. للتطوير بس."
          ],
          sol: R`[[docker compose config]] بيطبع ملف واحد متدمج ومتنضف: كل خدمة بـ [[environment]] فيه القيم الحقيقية بعد التعويض من [[.env]] (وحتى [[env_file]] بيتحول لقيم)، والـ [[volumes]] مكتوبة بالشكل الطويل [[type: volume]] و [[source]] و [[target]]، والـ ports بـ [[published]] و [[target]]، واسم الشبكة الافتراضية [[myapp_default]].

لو عندك [[compose.override.yml]]، هتلاقي حاجاته متدمجة فوق الأصلي (مثلًا [[command: npm run dev]]). ده أسرع طريقة تعرف «إيه اللي Compose شايفه فعلًا».

خلّي بالك: الناتج فيه الأسرار بقيمها، فماتلصقوش في issue أو شات. والغلط الشائع إن الأمر يقع برسالة زي [[yaml: line 12: did not find expected key]]: ده غلط مسافات في الملف، والرقم بيقولك فين.`
        },
        {
          cmd: "متغيرات في compose.yml",
          title: "قيمة من .env أو قيمة افتراضية",
          desc: R`[[$__{PORT:-3000}]] جوه compose.yml معناها: خد PORT من الشيل أو من ملف .env اللي جنب compose.yml، ولو مش موجود استخدم 3000. و [[$__{VAR:?رسالة}]] بتوقّف compose بالرسالة دي لو المتغير ناقص، ودي الأنسب للأسرار.

ده غير [[env_file:]]. الأول بيملى الملف نفسه قبل ما compose يقراه. التاني بيبعت المتغيرات جوه الـ container.`,
          example: R`services:
  api:
    image: ghcr.io/USER/myapi:$__{IMAGE_TAG:-latest}
    ports:
      - "127.0.0.1:$__{PORT:-3000}:3000"
    environment:
      REDIS_URL: $__{REDIS_URL:-redis://redis:6379}
      SENTRY_DSN: $__{SENTRY_DSN:-}
      DB_PASSWORD: $__{DB_PASSWORD:?DB_PASSWORD missing in .env}`,
          try: "امسح DB_PASSWORD من .env واعمل [[docker compose config]]: هيوقف برسالتك. رجّعه وشوف القيم النهائية في نفس الأمر.",
          flag: "script",
          deep: {
            why: "نفس compose.yml بيشتغل على جهازك وعلى السيرفر وفي CI، والقيم مختلفة. محتاج الملف يقرا القيم من بره، ويبقى ليه افتراضيات معقولة، ويرفض يشتغل لو حاجة مهمة ناقصة.",
            how: R`compose بيدوّر على قيمة المتغير في الشيل الأول، وبعدين في ملف [[.env]] اللي في فولدر المشروع (أو اللي بتحدده بـ [[--env-file]]).

[[$__{X:-def}]]: لو X مش موجود أو فاضي، استخدم def. و [[$__{X-def}]] (من غير النقطتين): لو مش موجود بس، أما الفاضي فبيتاخد فاضي. [[$__{X:-}]] معناها «عادي لو مش موجود، خليه فاضي» ومن غير تحذير.

[[$__{X:?msg}]]: لو ناقص، compose يقف ويطبع msg. أحسن بكتير من إن التطبيق يقوم من غير المفتاح ويفشل بعد ساعة في نص طلب.

[[$$]] معناها علامة دولار عادية مش متغير compose. بتحتاجها لما تكتب أمر شيل جوه الملف وعايز الشيل جوه الـ container هو اللي يقرا المتغير ([[$$HOME]]).

و [[docker compose config]] بيطبع الملف بعد التبديل، فتشوف كل قيمة وصلت كام.`,
            when: "tag الـ image، والبورتات، والدومينات، وأي حاجة بتختلف بين البيئات. والأسرار دايمًا بـ :? عشان متقومش من غيرها.",
            mistakes: R`في مشروع حقيقي بلوك environment ضخم كان متكرر بين ملف التطوير وملف الإنتاج، وكل الأسرار بـ [[:-]] فاضية، فالتطبيق يقوم من غير مفتاح ويفشل في النص. وفي مشروع تاني [[$__{JWT_EXPIRE:-3650d}]]: القيمة الافتراضية بتخلي التوكن عايش ١٠ سنين لو حد نسي يحطها. الافتراضي لازم يبقى آمن. وكمان: .env نفسه كان متمرر بـ env_file، ومربوط bind mount جوه /app، ومتكرر في environment. مكان واحد يكفي.`
          },
          teach: R`## مين بيبدّل [[$__{...}]]؟

compose نفسه، **قبل** ما يقرا الملف. بيدوّر على قيمة كل متغير في الشيل الأول، وبعدين في ملف [[.env]] اللي جنب compose.yml. وبعد ما يبدّل، الملف بيكمل عادي.

---

## المثال سطر سطر

| السطر | معناه |
|---|---|
| [[image: ghcr.io/USER/myapi:$__{IMAGE_TAG:-latest}]] | الـ tag من [[IMAGE_TAG]]، ولو مش موجود أو فاضي [[latest]] |
| [[- "127.0.0.1:$__{PORT:-3000}:3000"]] | بورت جهازك من [[PORT]]، وافتراضيًا 3000. اليمين ثابت |
| [[REDIS_URL: $__{REDIS_URL:-redis://redis:6379}]] | الافتراضي خدمة redis في نفس المشروع |
| [[SENTRY_DSN: $__{SENTRY_DSN:-}]] | اختياري: لو مش موجود يبقى فاضي، ومن غير تحذير |
| [[DB_PASSWORD: $__{DB_PASSWORD:?DB_PASSWORD missing in .env}]] | إجباري: لو ناقص، compose يقف بالرسالة دي |

### الأشكال

| الشكل | المتغير مش موجود | موجود بس فاضي |
|---|---|---|
| [[$__{X}]] | فاضي + تحذير | فاضي |
| [[$__{X:-def}]] | def | def |
| [[$__{X-def}]] | def | فاضي |
| [[$__{X:?msg}]] | يقف بـ msg | يقف بـ msg |

---

## جربته

ضفت للمثال ٤ سطور تجربة عشان نشوف الأشكال كلها، وملف [[.env]] فيه [[EMPTY=]] (موجود وفاضي):

~~~text سطور زيادة
      ONLY_UNSET: $__{EMPTY-def}
      UNSET_OR_EMPTY: $__{EMPTY:-def}
      NO_DEFAULT: $__{NOT_THERE}
      SHELL_HOME: $$HOME
~~~

من غير [[DB_PASSWORD]]:

~~~text الناتج
The "NOT_THERE" variable is not set. Defaulting to a blank string.
error while interpolating services.api.environment.DB_PASSWORD: required variable DB_PASSWORD is missing a value: DB_PASSWORD missing in .env
~~~

وخرج بـ 1. وبعد ما ضفت [[DB_PASSWORD=s3cret]] لـ .env:

~~~text الناتج
    environment:
      DB_PASSWORD: s3cret
      NO_DEFAULT: ""
      ONLY_UNSET: ""
      REDIS_URL: redis://redis:6379
      SENTRY_DSN: ""
      SHELL_HOME: $$HOME
      UNSET_OR_EMPTY: def
    image: ghcr.io/USER/myapi:latest
        published: "3000"
~~~

اقرا كل سطر بالجدول اللي فوق. و [[$$HOME]] فضل زي ما هو: [[$$]] معناها «دولار عادي»، وقيمة HOME هيقراها الشيل جوه الـ container.

والمتغيرات من الشيل بتكسب:

~~~bash
PORT=4000 IMAGE_TAG=1.4.0 docker compose config
~~~

~~~text الناتج
    image: ghcr.io/USER/myapi:1.4.0
        published: "4000"
~~~

[[PORT=4000]] قبل الأمر في bash معناها «المتغير ده للأمر ده بس». وفي PowerShell: [[$env:PORT=4000]] في سطر لوحده الأول.

---

## الخلاصة

~~~text
$__{X:-def}     افتراضي
$__{X:-}        اختياري من غير تحذير
$__{X:?msg}     إجباري (للأسرار)
$$            دولار حرفي للشيل جوه الـ container
الترتيب       الشيل، بعدين .env جنب الملف
~~~`,
          lines: [
            "الخدمات.",
            "خدمة api.",
            "نسخة الـ image من IMAGE_TAG، ولو مش موجود latest.",
            "البورتات.",
            "بورت السيرفر من PORT، وافتراضيًا 3000.",
            "متغيرات الـ container.",
            "رابط Redis، وافتراضيًا الخدمة اللي في نفس المشروع.",
            "اختياري: لو مش موجود يتبعت فاضي من غير تحذير.",
            "إجباري: لو ناقص، compose يوقف بالرسالة دي."
          ],
          sol: R`من غير [[DB_PASSWORD]]: [[docker compose config]] بيقف ويطبع [[required variable DB_PASSWORD is missing a value: DB_PASSWORD missing in .env]] ويخرج بـ 1. وده نفس اللي هيحصل مع [[up]]، فالنشر مش هيكمل بباسورد فاضي.

بعد ما ترجّعه: الناتج فيه [[DB_PASSWORD: s3cret]] و [[REDIS_URL: redis://redis:6379]] (الافتراضي) و [[SENTRY_DSN: ""]] و [[image: ghcr.io/USER/myapi:latest]] و [[published: "3000"]]. جربته بالظبط كده.

الغلط الشائع: تحط المتغير في ملف [[env_file]] تاني غير [[.env]] وتستغرب إنه مش بيتعوض: التعويض [[$__{...}]] جوه compose.yml بيقرا من [[.env]] جنب الملف (أو [[--env-file]]) ومن الـ shell، مش من [[env_file:]] بتاع الخدمة.`
        },
        {
          cmd: "healthchecks جاهزة",
          title: "فحوصات صحة لـ Postgres و Redis والـ API",
          desc: R`كل خدمة ليها أمر بيقول «أنا جاهزة فعلًا»: [[pg_isready]] لـ Postgres، و [[redis-cli ping]] لـ Redis، ولـ API بتاعتك طلب على /health. مع [[condition: service_healthy]] الـ API مش بيبدأ غير لما القاعدة جاهزة. و [[docker compose up -d --wait]] بيستنى لحد ما كله يبقى healthy بدل [[sleep]] بالتخمين.`,
          example: R`services:
  db:
    image: postgres:16-alpine
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $$POSTGRES_USER -d $$POSTGRES_DB"]
      interval: 5s
      retries: 10
  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes --maxmemory 256mb --maxmemory-policy noeviction
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
  api:
    build: .
    depends_on:
      db: { condition: service_healthy }
      redis: { condition: service_healthy }
    healthcheck:
      test: ["CMD-SHELL", "wget -qO- http://127.0.0.1:3000/health | grep -q ok || exit 1"]
      start_period: 30s`,
          try: "شغّل [[docker compose up -d --wait]] وشوف إنه مرجعش غير لما كله healthy. بعدين بوّظ رابط /health وشوفه بيفشل بـ exit code مش صفر.",
          flag: "script",
          deep: {
            why: "«الـ container قام» مش معناه «الخدمة جاهزة». Postgres بياخد ثواني يقبل اتصالات، والتطبيق لو قام قبله يقع. وسكربتات الديبلوي بتعمل sleep 5 وتقول نجح، والتطبيق لسه بيقع.",
            how: R`[[CMD]] بينفّذ البرنامج مباشرة من غير شيل: مفيش pipes ولا [[||]]. [[CMD-SHELL]] بيشغّله جوه [[sh -c]]، فتقدر تستخدم pipe ومتغيرات.

[[$$POSTGRES_USER]]: الدولارين عشان compose ميبدّلش، والشيل جوه الـ container هو اللي يقرا المتغير.

الـ API: صور alpine مفيهاش curl، فـ [[wget -qO-]]. و [[grep -q ok]] بيتأكد إن الرد نفسه سليم، مش بس إن السيرفر رد. [[start_period]] مهلة في الأول الفشل فيها مش بيتحسب.

[[depends_on]] مع [[service_healthy]] بيأثر على ترتيب التشغيل بس. بعد ما الكل قام، لو القاعدة وقعت، الـ API مش هيتوقف ولا هيتعاد.

[[up -d --wait]] بيرجع لما كل الخدمات تبقى running و healthy، ولو واحدة فشلت بيرجع بـ error. ومعاه [[--wait-timeout 120]]. مثالي في سكربت الديبلوي.

Redis: [[--appendonly yes]] بيحفظ كل عملية على الديسك فالبيانات تعيش بعد restart. [[--maxmemory 256mb]] حد للرام. و [[noeviction]] معناها لما الرام يخلص Redis يرفض الكتابة بـ error، بدل ما يمسح مفاتيح قديمة في صمت. ده مهم لو Redis شايل queue شغل (زي BullMQ): المسح في صمت معناه شغل بيضيع.`,
            when: "كل خدمة في compose الإنتاج. و --wait في كل سكربت ديبلوي أو CI بيشغّل stack.",
            mistakes: R`في مشروع حقيقي healthcheck الـ Mongo كان فيه [[$__{MONGO_ROOT_PASSWORD}]] بدولار واحد، فـ compose بيحط الباسورد نصًا في إعدادات الفحص، وبيبان في [[docker inspect]] وفي أي أداة بتعرض الإعدادات. وفي سكربتات ديبلوي كتير [[sleep 5]] بعد up بدل --wait. و healthcheck بـ curl في image alpine: الفحص بيفشل دايمًا والـ container unhealthy على طول.`
          },
          teach: R`## «قام» مش معناها «جاهز»

الـ container ممكن يبقى [[Up]] والبرنامج جواه لسه بيحمّل. الـ healthcheck أمر Docker بيشغّله جوه الـ container كل شوية: خرج بـ 0 يبقى صاحي، غير كده يبقى فشل. وبعد عدد فشل معين الحالة تبقى [[unhealthy]].

جربت الملف على Docker Desktop (مشروع [[dk02-hc]])، و api سيرفر Node صغير بيرد [[ok]] على [[/health]].

---

## db

| السطر | معناه |
|---|---|
| [[test: ["CMD-SHELL", ...] ]] | شغّل الأمر جوه [[sh -c]] |
| [[pg_isready -U $$POSTGRES_USER -d $$POSTGRES_DB]] | جاهز يقبل اتصالات لليوزر ده والقاعدة دي؟ الـ [[$$]] عشان compose مايبدّلش، والشيل جوه يقرا المتغيرات |
| [[interval: 5s]] | كل ٥ ثواني (الافتراضي 30 ثانية) |
| [[retries: 10]] | بعد ١٠ فشل ورا بعض: unhealthy |

~~~text الناتج: pg_isready من جوه
/var/run/postgresql:5432 - accepting connections
exit=0
~~~

## redis

| السطر | معناه |
|---|---|
| [[command: redis-server ...]] | شغّل Redis بإعدادات |
| [[--appendonly yes]] | اكتب كل عملية على الديسك |
| [[--maxmemory 256mb]] | حد الرام |
| [[--maxmemory-policy noeviction]] | لما الرام يخلص ارفض الكتابة بدل ما تمسح مفاتيح |
| [[test: ["CMD", "redis-cli", "ping"] ]] | [[CMD]] من غير شيل: البرنامج والـ arguments كل واحد لوحده |

~~~text الناتج
PONG
~~~

## api

| السطر | معناه |
|---|---|
| [[depends_on:]] + [[{ condition: service_healthy }]] | استنى db و redis يبقوا healthy |
| [[wget -qO- http://127.0.0.1:3000/health]] | اطلب الصفحة (alpine مفيهاش curl) |
| [[start_period: 30s]] | أول ٣٠ ثانية الفشل مش بيتحسب |

وبعد الـ wget في نفس السطر:

- [[| grep -q ok]]: ابعت الرد لـ grep: فيه ok؟ [[-q]] من غير طباعة، بس exit code.
- [[|| exit 1]]: لو لأ، اخرج بـ 1.

---

## غلطة لقيتها وانا بجرّب: [[localhost]]

المثال كان مكتوب فيه [[http://localhost:3000/health]]. سيرفري سامع على [[0.0.0.0]] (زي ما درس «0.0.0.0 جوه الـ container» بيقول)، و [[up -d --wait]] فضل مستني دقيقتين وبعدين:

~~~text الناتج
container dk02-hc-api-1 is unhealthy
~~~

وفي [[docker inspect]]:

~~~text الناتج
"Output":"wget: can't connect to remote host: Connection refused\n"
~~~

السبب: في صور alpine كلمة [[localhost]] بتتحل لـ [[::1]] (IPv6)، والسيرفر سامع على IPv4 بس. بـ [[127.0.0.1]] اشتغل على طول، وعشان كده المثال اتعدّل.

---

## [[docker compose up -d --wait]]

بعد التعديل:

~~~text الناتج
 Container dk02-hc-redis-1 Healthy
 Container dk02-hc-db-1 Healthy
 Container dk02-hc-api-1 Starting
 Container dk02-hc-api-1 Started
 Container dk02-hc-api-1 Waiting
 Container dk02-hc-api-1 Healthy
exit=0
~~~

مارجعش غير لما الكل بقى healthy، و exit 0. ولما فشل (المرة الأولى) رجع بـ 1، فسكربت الديبلوي يعرف.

وجربت مسار غلط:

~~~bash
docker compose exec -T api sh -c 'wget -qO- http://127.0.0.1:3000/nothere | grep -q ok || exit 1'
~~~

~~~text الناتج
exit=1
~~~

السيرفر رد، بس الرد مفيهوش ok، فالفحص فشل. ده فايدة [[grep -q ok]].

---

## الخلاصة

| الخدمة | الفحص |
|---|---|
| Postgres | [[pg_isready -U $$POSTGRES_USER -d $$POSTGRES_DB]] |
| Redis | [[redis-cli ping]] |
| API | [[wget -qO- http://127.0.0.1:PORT/health]] + [[grep -q ok]] |

~~~text
CMD          من غير شيل
CMD-SHELL    بشيل: pipes و || و متغيرات
$$           المتغير يتقري جوه الـ container
--wait       بدل sleep في سكربت الديبلوي
~~~`,
          lines: [
            "الخدمات.",
            "خدمة القاعدة.",
            "Postgres 16 على alpine.",
            "فحص الصحة:",
            "pg_isready بيرجع 0 لما القاعدة تقبل اتصالات. الـ $$ عشان الشيل جوه هو اللي يقرا المتغيرات.",
            "كل ٥ ثواني.",
            "لحد ١٠ محاولات.",
            "خدمة Redis.",
            "Redis 7 على alpine.",
            "احفظ على الديسك، وحد رام ٢٥٦ ميجا، ولما يخلص ارفض الكتابة بدل ما تمسح مفاتيح.",
            "فحص الصحة:",
            "redis-cli ping لازم يرد PONG. من غير شيل.",
            "خدمة الـ API.",
            "بتتبني من الفولدر ده.",
            "بتستنى...",
            "...القاعدة تبقى healthy...",
            "...و Redis كمان.",
            "وليها فحص صحة هي كمان:",
            "اطلب /health بـ wget (مفيش curl في alpine) على 127.0.0.1 مش localhost (localhost في alpine بيروح لـ IPv6 أولًا)، واتأكد إن الرد فيه ok.",
            "أول ٣٠ ثانية الفشل مش بيتحسب."
          ],
          sol: R`[[docker compose up -d --wait]] بيفضل يطبع [[Waiting]] لحد ما يطبع [[Healthy]] لكل خدمة، وبعدين بيرجّعك للـ prompt بـ exit code 0. لو خدمة وقعت أو فضلت unhealthy بيطبع زي [[container myapp-api-1 is unhealthy]] ويرجع بـ 1، فتقدر تستخدمه في سكربت ديبلوي.

لما تبوّظ [[/health]]: [[docker compose exec api sh -c 'wget -qO- http://127.0.0.1:3000/health | grep -q ok || exit 1'; echo $?]] بيطبع [[wget: server returned error: HTTP/1.1 404 Not Found]] و [[1]]. وبعد كام محاولة [[docker compose ps]] بيوري [[(unhealthy)]].

الغلط الشائع: الـ healthcheck بيستخدم [[curl]] والـ image alpine مفيهاش curl، فيفضل unhealthy للأبد. استخدم [[wget]] أو node نفسه. وجوه alpine اكتب [[127.0.0.1]] مش [[localhost]]: localhost بيتحل لـ [[::1]] (IPv6) الأول، وسيرفر سامع على [[0.0.0.0]] بس هيرد [[Connection refused]] والخدمة تفضل unhealthy (حصلت معايا). وفي compose لازم [[$$]] بدل [[$]] جوه الـ test.`
        },
        {
          cmd: "exec -T",
          title: "تبعت ملف أو pipe لأمر جوه الـ container",
          desc: R`[[docker compose exec]] بيفتح TTY افتراضيًا، وده بيبوّظ أي input جاي من ملف أو pipe، ولو شغّلته من الترمنال و input جاي من ملف بيفشل خالص ([[the input device is not a TTY]]). [[-T]] بيقفل الـ TTY، فتقدر تعمل [[< file.sql]] أو [[gunzip | ...]] لأمر جوه الـ container. أي exec في سكربت لازم يبقى معاه [[-T]].`,
          example: R`docker compose exec -T db psql -v ON_ERROR_STOP=1 -U app -d appdb < db/migrations/10-schema.sql
gunzip -c backups/appdb-2026-09-01.sql.gz | docker compose exec -T db psql -U app -d appdb
docker compose exec -T db pg_dump -U app -Fc appdb > appdb.dump
docker compose cp ./creds.json n8n:/tmp/creds.json
docker compose exec -T n8n n8n import:credentials --input=/tmp/creds.json
docker compose exec -T n8n rm -f /tmp/creds.json`,
          try: "على قاعدة تجربة، طبّق ملف SQL صغير بـ exec -T و [[<]]. بعدين جرّب نفس الأمر من غير -T من جوه سكربت واقرا الـ error.",
          deep: {
            why: "السكربتات بتحتاج تبعت ملفات لأوامر جوه الـ containers: migrations، واسترجاع باك أب، واستيراد إعدادات. exec العادي معمول لإنسان قدام ترمنال، مش لسكربت.",
            how: R`الـ TTY ترمنال وهمي بيعدّل البيانات اللي معدّية: بيحوّل نهايات السطور، وبيفترض إن فيه كيبورد. ده كويس لـ psql تفاعلي، ومصيبة لـ dump ثنائي أو ملف SQL جاي من [[<]].

[[-T]] بيلغي الـ TTY، و compose exec بيسيب الـ stdin مفتوح لوحده، فالملف أو الـ pipe بيعدّي زي ما هو. (في [[docker exec]] العادي بتكتب [[-i]] بس من غير [[-t]].)

[[-v ON_ERROR_STOP=1]]: من غيرها psql بيكمل بعد أي error ويخرج بـ 0، فالسكربت يفتكر كله تمام. ضيف [[--single-transaction]] (أو [[-1]]) لو عايز الملف يتطبق كله أو ولا حاجة.

[[pg_dump -Fc]] بيطلّع ملف ثنائي مضغوط. مع TTY كان هيتبوّظ من غير ما تاخد بالك، ومش هتعرف غير يوم الاسترجاع.

[[compose cp]] بينقل ملف لخدمة باسمها في compose. لو الملف فيه أسرار، امسحه أول ما تخلص.`,
            when: "migrations من سكربت أو Makefile، واسترجاع باك أب، و pg_dump في cron، واستيراد ملفات لخدمة.",
            mistakes: R`في مشروع حقيقي سكربت كان بيحقن ملف credentials جوه container بـ compose cp ويمسحه بعد الـ import. بس لو السكربت وقع بين الـ cp والـ rm، الملف بالتوكن بيفضل في /tmp جوه الـ container، لأن الـ trap كان بينضّف الجهاز بس. حط الـ rm جوه الـ trap كمان. وفي نفس المشروع migrations بتتطبق في loop من غير transaction، فلو ملف فشل في النص، الملفات اللي قبله اتطبقت والقاعدة في حالة بين بين.`
          },
          teach: R`## يعني إيه TTY؟

TTY ترمنال (اسمه جاي من teletypewriter). [[docker compose exec]] افتراضيًا بيعمل ترمنال وهمي، عشان لما تكتب [[psql]] تحس إنك قدام برنامج عادي. بس الترمنال ده بيعدّل البيانات اللي معدّية (نهايات السطور مثلًا)، وده بيبوّظ ملف جاي بـ [[<]] أو ناتج رايح لملف بـ [[>]]. [[-T]] بيلغي الترمنال.

جربت على مشروع [[dk02-c]]، بيوزر [[postgres]] وقاعدة [[app]] بدل [[app]] و [[appdb]] اللي في المثال.

---

## ١. ملف SQL للقاعدة

~~~bash
docker compose exec -T db psql -v ON_ERROR_STOP=1 -U app -d appdb < db/migrations/10-schema.sql
~~~

| الجزء | معناه |
|---|---|
| [[exec -T db]] | نفّذ في خدمة db، من غير ترمنال |
| [[psql]] | عميل Postgres |
| [[-v ON_ERROR_STOP=1]] | [[-v]] هنا متغير لـ psql: اقف عند أول error |
| [[-U app -d appdb]] | اليوزر والقاعدة |
| [[< file.sql]] | الشيل على جهازك بيفتح الملف ويبعته كـ input للأمر |

الملف فيه [[create table items]] و insert لصفين:

~~~text الناتج: أول مرة
CREATE TABLE
INSERT 0 2
exit=0
~~~

[[INSERT 0 2]]: الصفر حاجة قديمة ملهاش لازمة، و 2 عدد الصفوف. وتاني مرة (الجدول موجود):

~~~text الناتج
ERROR:  relation "items" already exists
exit=3
~~~

وقف عند أول غلطة وخرج بـ 3. ومن غير [[ON_ERROR_STOP]]:

~~~text الناتج
ERROR:  relation "items" already exists
ERROR:  duplicate key value violates unique constraint "items_pkey"
exit=0
~~~

كمّل بعد الغلطة وخرج بـ **0**. سكربت هيفتكر كله تمام.

## ٢. استرجاع باك أب مضغوط

~~~bash
gunzip -c backups/appdb-2026-09-01.sql.gz | docker compose exec -T db psql -U app -d appdb
~~~

[[gunzip -c]] فك الضغط واطبع على الشاشة (c = stdout)، و [[|]] يبعته لـ psql جوه. جربته على قاعدة جديدة فاضية: [[CREATE TABLE]] و [[INSERT 0 2]].

## ٣. dump ثنائي

~~~bash
docker compose exec -T db pg_dump -U app -Fc appdb > appdb.dump
~~~

[[pg_dump]] بيصدّر القاعدة، و [[-Fc]] (format custom) ملف ثنائي مضغوط. و [[>]] بيكتبه على **جهازك**. أول ٥ بايت في الملف كانوا [[PGDMP]]: علامة إن الملف سليم.

## ٤-٦. ملف لخدمة باسمها

~~~bash
docker compose cp ./creds.json n8n:/tmp/creds.json
docker compose exec -T n8n n8n import:credentials --input=/tmp/creds.json
docker compose exec -T n8n rm -f /tmp/creds.json
~~~

[[compose cp]] زي [[docker cp]] بس بتكتب اسم الخدمة. بعدها الاستيراد، وبعدها مسح الملف لأن فيه أسرار. جربت الـ cp والـ rm على خدمة db (مفيش n8n هنا):

~~~text الناتج
 dk02-c-db-1 Copied ./creds.json to dk02-c-db-1:/tmp/creds.json
ls: /tmp/creds.json: No such file or directory
~~~

التاني بعد الـ rm: الملف راح.

### ومن غير [[-T]]؟

في تجربتي (أوامر شغالة من سكربت، مفيش ترمنال حقيقي) compose الحديث لاحظ إن مفيش ترمنال وعدّاها. لكن من ترمنال حقيقي والـ input جاي من ملف، Docker بيرفض بـ [[the input device is not a TTY]] (ده من الحل ومن توثيق Docker، مقدرتش أعمل ترمنال حقيقي هنا). عشان كده [[-T]] في أي سكربت.

---

## الخلاصة

~~~text
exec -T              أي input أو output من ملف أو pipe
-v ON_ERROR_STOP=1   اقف عند أول غلطة وارجع بـ 3
< file / | psql      ابعت لجوه
> file               اكتب من جوه لجهازك
compose cp + rm      انقل ملف وامسحه بعد ما تخلص
~~~`,
          lines: [
            "طبّق ملف SQL من جهازك على القاعدة، ووقّف عند أول error.",
            "فك ضغط باك أب وابعته على طول لـ psql جوه الـ container.",
            "اعمل dump ثنائي واكتبه على جهازك (من غير TTY عشان ميتبوّظش).",
            "انقل ملف لخدمة n8n باسمها.",
            "استورده من جوه.",
            "وامسحه على طول لأن فيه أسرار."
          ],
          sol: R`[[docker compose exec -T db psql -v ON_ERROR_STOP=1 -U app -d appdb < file.sql]] بيطبع ناتج كل أمر ([[CREATE TABLE]] و [[INSERT 0 2]]) ويخرج بـ 0. ولو فيه غلطة في الـ SQL بيقف عندها ويخرج بـ 3 بسبب [[ON_ERROR_STOP]].

من غير [[-T]] وانت شغّال السكربت من ترمنال عادي (والـ input جاي من ملف)، بيقع على طول بـ [[the input device is not a TTY]] و exit 1. جربتها. من cron أو CI (مفيش ترمنال خالص) Compose الحديث ممكن يعدّيها، بس ماتعتمدش على ده: حط [[-T]] في أي سكربت.

الغلط الشائع: تشغّل الملف مرتين، فالمرة التانية تطلع [[ERROR: relation "items" already exists]]. ومن غير [[ON_ERROR_STOP]] بيكمل بعد الغلطة ويخرج بـ 0، فالسكربت يفتكر كله تمام.`
        },
        {
          cmd: "compose run",
          title: "container مؤقت من خدمة للتيستات أو أمر لمرة",
          desc: R`[[docker compose run]] بيعمل container جديد بنفس إعدادات الخدمة (الـ image والشبكة والمتغيرات)، ينفّذ أمر ويخرج، والخدمة الشغالة متتلمسش. [[--rm]] يمسحه بعدها، و [[--no-deps]] ميشغّلش الخدمات اللي بتعتمد عليها، و [[-e]] و [[-v]] بيغيّروا إعدادات المرة دي بس، زي إنك توجّهه لقاعدة تيست.`,
          example: R`docker compose run --rm --no-deps \
  -v ./app/tests:/app/tests:ro \
  -e DATABASE_URL="postgresql://app:secret@db:5432/app_test" \
  -e REDIS_URL=redis://redis:6379/15 \
  app sh -c 'python -m pytest -q -p no:cacheprovider'
docker compose run --rm app npx prisma migrate deploy`,
          try: "شغّل أمر [[env]] بـ compose run ومعاه [[-e]] مختلف، وقارن بـ [[docker compose exec app env]]: الخدمة الشغالة متأثرتش.",
          deep: {
            why: "عايز تشغّل التيستات بنفس بيئة التطبيق بالظبط، بس على قاعدة تانية، ومن غير ما توقف أو تلمس الخدمة الشغالة.",
            how: R`[[exec]] بيدخل container شغال. [[run]] بيعمل واحد جديد من نفس تعريف الخدمة، باسم زي [[myapp-app-run-a1b2]].

[[run]] مش بيفتح [[ports]] بتاعة الخدمة (عشان ميتخانقش مع الشغالة)، إلا لو كتبت [[--service-ports]].

[[--no-deps]]: من غيره، compose يشغّل db و redis لو مش شغالين. هنا هما شغالين أصلًا، فمش محتاجين.

[[-v ./app/tests:/app/tests:ro]] بيحط التيستات من جهازك من غير build جديد. و [[:ro]] عشان كده [[-p no:cacheprovider]]: pytest ميحاولش يكتب فولدر الكاش في مكان للقراءة بس.

[[redis:6379/15]]: قاعدة رقم ١٥ في Redis، فمفاتيح التيست متتخلطش ببيانات التطبيق على قاعدة 0.

والسطر الأخير استخدام تاني شائع: migration لمرة قبل ما تشغّل النسخة الجديدة.`,
            when: "التيستات في CI أو على السيرفر، و migrations، وسكربتات الصيانة لمرة (seed، أو تنضيف بيانات).",
            mistakes: R`نسيان [[--rm]] فتتراكم containers باسم run في [[ps -a]]. والأخطر: تنسى تغيّر DATABASE_URL، فالتيست يشتغل على قاعدة الإنتاج، وتيستات كتير بتمسح الجداول في الأول.`
          },
          teach: R`## [[exec]] ولا [[run]]؟

| | [[exec]] | [[run]] |
|---|---|---|
| بيشتغل في | container شغال | container **جديد** من تعريف الخدمة |
| بيأثر على الشغال | أيوه (نفس الـ container) | لأ |
| [[ports]] | | مش بيفتحها إلا بـ [[--service-ports]] |

جربت على مشروع [[dk02-c]] (خدمة [[api]] بدل [[app]]).

---

## السطر الأول (متقسّم على ٥ سطور)

الـ [[\]] في آخر السطر معناها «الأمر لسه مكمّل في السطر اللي بعده». في PowerShell بتبقى الـ backtick بدلها، أو اكتبه في سطر واحد.

| الجزء | معناه |
|---|---|
| [[docker compose run]] | container جديد من خدمة |
| [[--rm]] | امسحه لما يخلص |
| [[--no-deps]] | متشغّلش الخدمات اللي في depends_on |
| [[-v ./app/tests:/app/tests:ro]] | التيستات من جهازك، قراءة بس |
| [[-e DATABASE_URL="...app_test"]] | قاعدة تيست، للمرة دي بس |
| [[-e REDIS_URL=redis://redis:6379/15]] | Redis قاعدة رقم 15 (فيه 16 قاعدة من 0 لـ 15) |
| [[app]] | اسم الخدمة |
| [[sh -c 'python -m pytest -q -p no:cacheprovider']] | الأمر: pytest بهدوء ([[-q]])، ومن غير plugin الكاش عشان الفولدر read only |

### جربت إن الإعدادات للمرة دي بس

~~~bash
docker compose run --rm --no-deps -e DATABASE_URL="postgresql://app:secret@db:5432/app_test" -e REDIS_URL=redis://redis:6379/15 api sh -c 'env | grep -E "DATABASE|REDIS"; hostname'
docker compose exec api sh -c 'env | grep -E "DATABASE|REDIS"'
~~~

~~~text الناتج
 Container dk02-c-api-run-9cb0777f2396 Created
DATABASE_URL=postgresql://app:secret@db:5432/app_test
REDIS_URL=redis://redis:6379/15
cf13332f8506
DATABASE_URL=postgresql://app:secret@db:5432/app
~~~

الـ run أخد اسم [[api-run-...]] وشاف [[app_test]]. والخدمة الشغالة لسه على [[app]].

### و [[:ro]]

~~~text الناتج
tests folder: [ 't.js' ]
touch: /app/tests/x: Read-only file system
~~~

التيستات وصلت، ومحدش يقدر يكتب في الفولدر. عشان كده pytest محتاج [[-p no:cacheprovider]].

### من غير [[--rm]]

~~~text الناتج
dk02-c-api-run-5227bc654bbd Exited (0) Less than a second ago
Found orphan containers (dk02-c-api-run-5227bc654bbd) for this project.
~~~

الـ container فضل موجود واقف، و compose بقى يحذّر منه في كل أمر بعدها.

## السطر التاني

~~~bash
docker compose run --rm app npx prisma migrate deploy
~~~

نفس الفكرة: container لمرة يطبّق الـ migrations ويتمسح. [[npx]] بيشغّل أداة من node_modules. (مفيش مشروع Prisma هنا، فالسطر ده من توثيق Prisma.)

---

## الخلاصة

~~~text
run                 container جديد من تعريف الخدمة
--rm                امسحه بعدها (وإلا يفضل orphan)
--no-deps           متشغّلش اللي بتعتمد عليه
-e / -v             للمرة دي بس
--service-ports     لو محتاج البورتات
~~~`,
          lines: [
            "container مؤقت من خدمة app، يتمسح بعدها، ومن غير ما يشغّل حاجة معاه...",
            "...التيستات من جهازك للقراءة بس...",
            "...وقاعدة تيست بدل قاعدة التطبيق...",
            "...و Redis على قاعدة ١٥ منفصلة...",
            "...وشغّل pytest من غير ما يكتب ملفات كاش.",
            "استخدام تاني: migration لمرة في container بيتمسح."
          ],
          sol: R`[[docker compose run --rm --no-deps -e DATABASE_URL=postgresql://x@db/app_test app env | grep DATABASE_URL]] بيطبع القيمة الجديدة، و [[docker compose exec app env | grep DATABASE_URL]] بيطبع القيمة الأصلية زي ما هي. جربتها وطلع [[app_test]] في الأول والأصلية في التاني.

ده لأن [[run]] بيعمل container جديد مؤقت اسمه زي [[myapp-app-run-7375a64e3329]]، بإعدادات الخدمة زائد اللي انت غيرته، وبيتمسح بسبب [[--rm]]. والخدمة الشغالة ماتلمستش.

الغلط الشائع: تنسى [[--rm]] فتتراكم containers [[-run-]] في [[docker compose ps -a]]. ومن غير [[--no-deps]] الـ run بيشغّل db و redis لو واقفين. و [[run]] مابينشرش [[ports]] إلا لو ضفت [[--service-ports]].`
        },
        {
          cmd: "x- و anchors",
          title: "إعدادات مشتركة بين كذا خدمة من غير تكرار",
          desc: R`لو عندك خدمتين من نفس الـ image بنفس المتغيرات (السيرفر والـ worker مثلًا)، اكتب الإعدادات المشتركة مرة واحدة في مفتاح بيبدأ بـ [[x-]]، وعلّم عليها بـ [[&اسم]]، وفي كل خدمة [[<<: *اسم]] تدمجها. compose بيتجاهل أي مفتاح بيبدأ بـ [[x-]]، فده مكانها الطبيعي.`,
          example: R`x-app-common: &app-common
  image: ghcr.io/USER/myapp:1.4.0
  env_file: .env
  restart: unless-stopped
  depends_on:
    redis: { condition: service_healthy }
services:
  web:
    <<: *app-common
    command: node server.js
    ports: ["127.0.0.1:3000:3000"]
  worker:
    <<: *app-common
    command: node worker.js`,
          try: "اكتب خدمتين بـ anchor مشترك، واعمل [[docker compose config]]، وشوف الإعدادات اتنسخت في الاتنين.",
          flag: "script",
          deep: {
            why: "الـ web والـ worker نفس الكود ونفس المتغيرات، والفرق في الأمر بس. نسخ ١٥ سطر في الاتنين معناه إنك يوم تعدّل واحد وتنسى التاني.",
            how: R`دي مميزات في YAML نفسه، مش في compose. [[&app-common]] بيحط اسم على البلوك. [[*app-common]] بيشاور عليه. و [[<<:]] (merge key) بيدمج مفاتيحه في المكان ده.

[[x-]] في أول المفتاح بيقول لـ compose «ده امتداد، متعتبروش خدمة ولا تديني error عليه».

الدمج سطحي: أي مفتاح تكتبه في الخدمة بيستبدل المفتاح اللي في الـ anchor بالكامل، مش بيندمج جواه. لو الـ anchor فيه environment وكتبت environment في الخدمة، environment بتاع الـ anchor كله بيختفي. لو محتاج تزوّد متغيرات، اعمل anchor للـ environment لوحده كـ map، وفي الخدمة [[environment: { <<: *common-env, EXTRA: "1" }]]. ده بيشتغل مع الـ map بس، مش مع القايمة اللي بالشرطة.

و [[docker compose config]] بيوريك النتيجة بعد الدمج، فتتأكد قبل ما تشغّل.`,
            when: "web و worker و scheduler من نفس الكود، أو أي خدمات بتتشارك متغيرات و restart و logging.",
            mistakes: R`تكتب environment في خدمة فتمسح environment بتاع الـ anchor كله من غير ما تاخد بالك، والـ worker يقوم ناقصه إعدادات Redis. وتنسى إن [[x-]] لازم في أول المفتاح، فـ compose يرفضه كمفتاح مش معروف ويطلّع error.`
          },
          teach: R`## ٣ رموز من YAML نفسه

| الرمز | اسمه | معناه |
|---|---|---|
| [[&app-common]] | anchor | «سمّي البلوك ده app-common» |
| [[*app-common]] | alias | «البلوك اللي اسمه app-common» |
| [[<<:]] | merge key | «حط مفاتيحه هنا» |

ودي من YAML مش من compose. اللي من compose هو [[x-]]: أي مفتاح في أول مستوى بيبدأ بـ [[x-]] compose بيتجاهله، فده مكان مناسب تعرّف فيه البلوك.

---

## المثال سطر سطر

| السطر | معناه |
|---|---|
| [[x-app-common: &app-common]] | بلوك compose بيتجاهله، واسمه app-common |
| [[image: ...]] / [[env_file: .env]] / [[restart: ...]] | الإعدادات المشتركة |
| [[depends_on:]] + [[redis: { condition: service_healthy }]] | الاعتماد المشترك |
| [[web:]] + [[<<: *app-common]] | خد كل اللي في البلوك |
| [[command: node server.js]] | وزوّد أمرها |
| [[ports: ["127.0.0.1:3000:3000"] ]] | وبورتها |
| [[worker:]] + [[<<: *app-common]] + [[command: node worker.js]] | نفس الإعدادات بأمر تاني |

---

## [[docker compose config]] بيوري النتيجة

جربت المثال (مع خدمة redis عشان depends_on يبقى ليه معنى)، وفي worker زوّدت [[env_file: other.env]] عشان نشوف الدمج السطحي:

~~~text الناتج (جزء)
  web:
    command:
      - node
      - server.js
    depends_on:
      redis:
        condition: service_healthy
    environment:
      NODE_ENV: production
    image: ghcr.io/USER/myapp:1.4.0
    restart: unless-stopped
  worker:
    environment:
      X: "1"
    image: ghcr.io/USER/myapp:1.4.0
    restart: unless-stopped
x-app-common:
  ...
~~~

- web أخد كل حاجة من البلوك، وزوّد command و ports.
- worker كتب [[env_file]] بتاعه، فاتشال [[env_file]] بتاع البلوك **كله**: [[NODE_ENV]] راح و [[X]] بس اللي فضل. ده الدمج السطحي: المفتاح اللي تكتبه بيحل محل اللي في البلوك بالكامل.
- [[x-app-common]] ظاهر في الآخر كقسم امتداد، مش في [[services]].

وشيلت [[x-]] من أول الاسم:

~~~text الناتج
validating ...compose.yml: additional properties 'app-common' not allowed
~~~

compose رفض المفتاح لأنه مش معروف.

---

## الخلاصة

~~~text
x-NAME: &NAME        بلوك مشترك compose بيتجاهله
<<: *NAME            ادمجه هنا
مفتاح في الخدمة      بيستبدل نفس المفتاح في البلوك بالكامل
config               اتأكد من النتيجة
~~~`,
          lines: [
            "بلوك مشترك compose بيتجاهله، واسمه app-common.",
            "نفس الـ image لكل الخدمات.",
            "نفس المتغيرات.",
            "نفس سياسة الإعادة.",
            "نفس الاعتماد...",
            "...على Redis healthy.",
            "الخدمات.",
            "خدمة الويب:",
            "خد كل اللي في app-common.",
            "وأمرها الخاص.",
            "وبورتها.",
            "خدمة الـ worker:",
            "نفس الإعدادات...",
            "...بأمر مختلف."
          ],
          sol: R`[[docker compose config]] بيوري [[web]] و [[worker]] الاتنين فيهم نفس [[image]] و [[env_file]] (متحول لـ environment) و [[restart: unless-stopped]] و [[depends_on]]، وكل واحد بالـ [[command]] بتاعه. و [[web]] بس اللي فيه [[ports]]. وقسم [[x-app-common]] مش ظاهر كخدمة.

جربتها بخدمتين من anchor واحد، والاتنين طلعوا بنفس الإعدادات والـ [[command]] المختلف.

الغلط الشائع: تكتب [[<<: *app-common]] وبعدين [[environment]] في الخدمة، فتلاقي environment بتاع الـ anchor اتمسح. الـ [[<<]] بيدمج أول مستوى بس؛ لو الخدمة فيها نفس المفتاح بيحل محله بالكامل، مش بيدمج جواه. وتعريف الـ anchor لازم يبقى قبل استخدامه في الملف.`
        }
      ]
    }
]);
