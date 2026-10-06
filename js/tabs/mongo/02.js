// تكملة تاب mongo: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/mongo/01.js (شرح حقول الدرس في أوله)
MORE("mongo", [
    {
      t: "Docker ويوزرز وسرعة",
      l: 2,
      n: "Mongo بباسورد في compose، ويوزر لكل تطبيق، و indexes، وبورت مقفول",
      items: [
        {
          cmd: "MONGO_INITDB_ROOT_USERNAME",
          title: "Mongo بتسجيل دخول إجباري في compose",
          desc: R`صورة mongo الرسمية لو اديتها [[MONGO_INITDB_ROOT_USERNAME]] و [[MONGO_INITDB_ROOT_PASSWORD]]، بتعمل يوزر root أول مرة وبتشغّل Mongo بـ auth. من غيرهم أي حد يوصل للبورت يقرا ويمسح من غير باسورد.

والبيانات في volume على [[/data/db]]، والبورت على [[127.0.0.1]] بس.`,
          example: R`services:
  mongo:
    image: mongo:8
    restart: unless-stopped
    environment:
      MONGO_INITDB_ROOT_USERNAME: $__{MONGO_ROOT_USER}
      MONGO_INITDB_ROOT_PASSWORD: $__{MONGO_ROOT_PASSWORD}
    volumes:
      - mongo_data:/data/db
    ports:
      - "127.0.0.1:27017:27017"
volumes:
  mongo_data:`,
          try: R`شغّله بـ [[docker compose up -d]]، وجرّب [[mongosh --eval "db.getMongo().getDBNames()"]] من غير يوزر: هيطلع error إنه محتاج authentication.`,
          flag: "script",
          deep: {
            why: "Mongo من غير باسورد على بورت مفتوح من أشهر طرق ضياع البيانات: بوتات بتلف على الإنترنت، تلاقيه، تمسح كل حاجة، وتسيب رسالة فدية.",
            how: R`الـ entrypoint بتاع الصورة بيبص: لو [[/data/db]] فاضي والمتغيرين موجودين، بيشغّل Mongo مؤقت، يعمل اليوزر في قاعدة admin بدور root، ويعيد التشغيل بـ [[--auth]]. عشان كده مش محتاج تكتب [[command: mongod --auth]] بنفسك.

ده بيحصل أول مرة بس. لو الـ volume فيه بيانات، المتغيرات بتتجاهل. وأي ملفات [[.js]] أو [[.sh]] في [[/docker-entrypoint-initdb.d]] بتتنفّذ برضه أول مرة بس (مفيدة لعمل يوزر التطبيق).

[[$__{MONGO_ROOT_PASSWORD}]] compose بياخدها من ملف .env جنبه، فالباسورد مش مكتوب في الـ YAML اللي على git.

[[127.0.0.1:27017:27017]]: تقدر توصل من السيرفر نفسه أو بـ SSH tunnel، والإنترنت لأ. ولو التطبيق في نفس الـ compose، مش محتاج [[ports]] خالص: بيوصل على [[mongo:27017]] جوه الشبكة.`,
            when: "أي Mongo على سيرفر، حتى لو «للتجربة».",
            mistakes: R`تغيّر [[MONGO_INITDB_ROOT_PASSWORD]] في .env وتستنى الباسورد يتغير: مش هيتغير، لازم [[db.changeUserPassword]]. و [[docker compose down -v]] بيمسح الـ volume بالبيانات؛ في مشروع حقيقي الـ volume اتعمل [[external: true]] (بـ [[docker volume create]] الأول) عشان أمر زي ده ميقدرش يمسحه.`
          },
          teach: R`## ملف compose فيه Mongo بباسورد

ده ملف YAML (اسمه عادة [[compose.yml]]) بيوصف container لـ Mongo: الصورة، والباسورد، ومكان البيانات، والبورت. YAML بيعتمد على **المسافات في أول السطر**: اللي تحت حاجة ومزاح لجوه يبقى جزء منها. شغّلته فعلًا بـ Docker Compose على Docker Desktop (غيّرت البورت بس لـ 27118 عشان ميتعارضش مع الـ lab)، والأوامر نفسها واحدة في PowerShell و bash.

---

## سطر سطر

~~~text
services:
  mongo:
    image: mongo:8
    restart: unless-stopped
~~~

- [[services:]]: قايمة الـ containers اللي في الملف.
- [[mongo:]]: اسم الخدمة. ده كمان الاسم اللي الخدمات التانية هتوصل بيه ([[mongo:27017]]).
- [[image: mongo:8]]: الصورة الرسمية، النسخة 8. التاج [[8]] بيجيب آخر 8.x (طلعت 8.3.11 وقت التجربة).
- [[restart: unless-stopped]]: لو الـ container وقع أو الجهاز عمل restart يقوم تاني، إلا لو انت وقفته بإيدك.

~~~text
    environment:
      MONGO_INITDB_ROOT_USERNAME: $__{MONGO_ROOT_USER}
      MONGO_INITDB_ROOT_PASSWORD: $__{MONGO_ROOT_PASSWORD}
~~~

- [[environment:]]: متغيرات بيئة بتتحط جوه الـ container.
- [[MONGO_INITDB_ROOT_USERNAME]]: اسمها بيتقري كده: MONGO + INITDB (initialize database، يعني تجهيز القاعدة أول مرة) + ROOT USERNAME. الصورة الرسمية بتدوّر عليها.
- [[$__{MONGO_ROOT_USER}]]: compose بيستبدلها بقيمة المتغير ده من ملف [[.env]] اللي جنب [[compose.yml]]. كده الباسورد مش مكتوب في الملف اللي بيترفع على git.

الـ [[.env]] اللي استخدمته:

~~~text .env
MONGO_ROOT_USER=admin
MONGO_ROOT_PASSWORD=s3cret
~~~

~~~text
    volumes:
      - mongo_data:/data/db
    ports:
      - "127.0.0.1:27118:27017"
volumes:
  mongo_data:
~~~

- [[mongo_data:/data/db]]: volume اسمه mongo_data متركّب على [[/data/db]]، وده الفولدر اللي Mongo بيكتب فيه البيانات. من غيره البيانات بتتمسح مع الـ container.
- [[ports]]: الشكل [[IP:بورت_عندك:بورت_جوه]]. الـ [[127.0.0.1]] في الأول معناها «من الجهاز ده بس»، فمحدش من الشبكة أو الإنترنت يوصل.
- [[volumes:]] اللي في الآخر (من غير مسافات) بيعرّف الـ volume نفسه. Docker بيسمّيه باسم المشروع قدامه: عندي طلع [[mongo-lab-c1_mongo_data]].

---

## اللي حصل لما شغّلته

~~~bash
docker compose up -d
~~~

~~~text الناتج
 Network mongo-lab-c1_default Created
 Volume mongo-lab-c1_mongo_data Created
 Container mongo-lab-c1-mongo-1 Started
~~~

### من غير يوزر

~~~bash
docker compose exec mongo mongosh --quiet --eval "db.getMongo().getDBNames()"
~~~

[[docker compose exec mongo]] = شغّل أمر جوه خدمة mongo. و [[db.getMongo().getDBNames()]] = هات أسماء القواعد.

~~~text الناتج
MongoServerError: Command listDatabases requires authentication
~~~

وخرج بـ exit code 1. ده المطلوب: السيرفر رد، بس رفض يقول أي حاجة من غير login.

### باليوزر

~~~bash
docker compose exec mongo mongosh -u admin -p s3cret --quiet --eval "db.getMongo().getDBNames()"
~~~

~~~text الناتج
[ 'admin', 'config', 'local' ]
~~~

---

## إيه اللي بيحصل جوه أول مرة؟

الـ entrypoint (السكربت اللي بيشتغل أول ما الـ container يقوم) بيعمل كده:

1. يبص على [[/data/db]]: فاضي؟
2. لو فاضي والمتغيرين موجودين: يشغّل Mongo مؤقت جوه الـ container بس، ويعمل اليوزر في قاعدة [[admin]] بدور [[root]].
3. يقفل المؤقت، ويشغّل Mongo الحقيقي بـ [[--auth]] (يعني login إجباري).

ولو [[/data/db]] فيه بيانات من قبل كده، الخطوة ٢ بتتلغي. جرّبت أغيّر الباسورد في [[.env]] لـ [[changed]] وعملت [[up -d --force-recreate]]:

~~~text الباسورد الجديد
MongoServerError: Authentication failed.
~~~

والقديم [[s3cret]] لسه شغال. الـ volume فيه اليوزر القديم، والمتغيرات اتجاهلت. تغيير الباسورد بيبقى بـ [[db.changeUserPassword]].

### لو نسيت ملف [[.env]]

شيلته وشغّلت [[docker compose config]] (بيطبع الملف بعد التعويض):

~~~text الناتج
level=warning msg="The \"MONGO_ROOT_USER\" variable is not set. Defaulting to a blank string."
level=warning msg="The \"MONGO_ROOT_PASSWORD\" variable is not set. Defaulting to a blank string."
~~~

متغيرات فاضية = مفيش يوزر = Mongo من غير auth. اقرا التحذيرات دي.

## الخلاصة

| السطر | ليه |
|---|---|
| [[MONGO_INITDB_ROOT_*]] | يوزر root و auth إجباري، أول مرة بس |
| [[$__{...}]] من [[.env]] | الباسورد برّه الملف اللي على git |
| [[mongo_data:/data/db]] | البيانات تعيش بعد الـ container |
| [[127.0.0.1:...]] | البورت للجهاز ده بس |

و [[docker compose down -v]] بيمسح الـ volume بالبيانات، فاستخدمه على التجربة بس.`,
          lines: [
            "الخدمات.",
            "خدمة Mongo.",
            "نسخة محددة من الصورة الرسمية.",
            "يقوم تاني لو وقع أو السيرفر عمل restart.",
            "المتغيرات:",
            "اسم يوزر root (من .env).",
            "باسورده (من .env)، ومعاهم Mongo بيشتغل بـ auth.",
            "التخزين:",
            "البيانات في volume عشان متضيعش مع الـ container.",
            "البورتات:",
            "على السيرفر نفسه بس، مش على الإنترنت.",
            "تعريف الـ volumes.",
            "volume البيانات."
          ],
          sol: R`[[docker compose exec mongo mongosh --quiet --eval "db.getMongo().getDBNames()"]] بيطبع:

[[MongoServerError: Command listDatabases requires authentication]] وبيخرج بـ exit code 1. يعني الاتصال نفسه نجح، بس السيرفر رافض أي أمر من غير login. ودا اللي عايزه.

ونفس الأمر مع [[-u "$MONGO_ROOT_USER" -p "$MONGO_ROOT_PASSWORD"]] بيرجّع [[[ 'admin', 'config', 'local' ]]].

لو الأمر من غير يوزر رجّع القواعد عادي: غالبًا الـ volume كان فيه داتا قديمة من قبل ما تضيف المتغيرات. [[MONGO_INITDB_*]] بيشتغلوا بس لما [[/data/db]] يكون فاضي، فالـ root ما اتعملش والـ auth مش متفعلة. على التجربة: [[docker compose down -v]] وارفع تاني. ولو المتغيرات فاضية لأن [[.env]] مش جنب compose.yml، هتلاقي تحذير [[The "MONGO_ROOT_USER" variable is not set]] وقت [[up]].`
        },
        {
          cmd: "healthcheck بـ ping",
          title: "الباك إند يستنى لحد ما Mongo يصحى",
          desc: R`الـ container ممكن يبقى شغال و Mongo لسه بيقوم. [[healthcheck]] بيسأل Mongo كل شوية بـ [[db.adminCommand('ping')]]، و [[condition: service_healthy]] بيخلي الباك إند ميقومش غير لما الرد ييجي.

و ping مش محتاج باسورد، فمتحطش الباسورد في الـ healthcheck.`,
          example: R`services:
  mongo:
    image: mongo:8
    healthcheck:
      test: ["CMD", "mongosh", "--quiet", "--eval", "db.adminCommand('ping').ok"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s
  backend:
    depends_on:
      mongo:
        condition: service_healthy`,
          try: R`بعد [[docker compose up -d]] شوف الحالة بـ [[docker compose ps mongo]]: عمود STATUS هيقول health: starting وبعدين healthy.`,
          flag: "script",
          deep: {
            why: "من غير healthcheck الباك إند بيقوم قبل Mongo، أول اتصال يفشل، والتطبيق يقع أو يفضل شغال من غير قاعدة لحد ما حد يعمله restart.",
            how: R`Docker بيشغّل الأمر اللي في [[test]] جوه الـ container كل [[interval]]. لو خرج بـ 0 يبقى healthy. mongosh بيخرج بـ error لو مقدرش يتصل، فده كفاية كاختبار.

[[ping]] من الأوامر اللي Mongo بيسمح بيها من غير تسجيل دخول، فالفحص شغال مع [[--auth]] من غير باسورد.

[[start_period]]: أول ٣٠ ثانية الفشل مش بيتحسب (Mongo بياخد وقت أول مرة وهو بيعمل اليوزر). و [[retries: 5]] يعني ٥ مرات فشل ورا بعض قبل ما يبقى unhealthy.

[[condition: service_healthy]] في [[depends_on]]: compose بيستنى الحالة healthy مش بس إن الـ container اشتغل.`,
            when: "أي compose فيه قاعدة وتطبيق بيعتمد عليها.",
            mistakes: R`في مشروع حقيقي الـ healthcheck كان فيه [[-u]] و [[-p]] بالباسورد، فأي حد يعمل [[docker inspect]] يشوفه. ping مش محتاج login أصلًا. و [[depends_on]] من غير condition بيستنى الـ container يبدأ بس، مش Mongo يبقى جاهز.`
          },
          teach: R`## «الـ container شغال» مش معناها «Mongo جاهز»

Docker بيعتبر الـ container شغال أول ما البرنامج اللي جواه يبدأ، بس Mongo بياخد ثواني يجهّز (وأكتر أول مرة وهو بيعمل اليوزر). الـ [[healthcheck]] أمر Docker بيشغّله جوه الـ container كل شوية يسأل «انت جاهز؟»، و [[depends_on]] بشرط بيخلي الباك إند يستنى الإجابة. شغّلته على Docker Desktop بخدمة mongo من [[mongo:8]] وخدمة backend بسيطة ([[ubuntu:24.04]] بتعمل [[sleep]]) مكان الباك إند.

---

## ١. الفحص نفسه

~~~text
    healthcheck:
      test: ["CMD", "mongosh", "--quiet", "--eval", "db.adminCommand('ping').ok"]
~~~

[[test]] هو الأمر. مكتوب كـ array (قايمة بين [[[ ]]]):

| العنصر | معناه |
|---|---|
| [["CMD"]] | شغّل اللي بعدي كبرنامج مباشرة (من غير shell) |
| [["mongosh"]] | البرنامج |
| [["--quiet"]] | من غير ترحيب |
| [["--eval"]] و [["db.adminCommand('ping').ok"]] | ابعت ping وهات خانة [[ok]] من الرد |

جرّبت الأمر بإيدي جوه الـ container:

~~~text الناتج
1
~~~

وخرج بـ exit code 0. Docker بيبص على الـ exit code بس: [[0]] = healthy، غيره = فشل. ولو mongosh مقدرش يتصل بيخرج بـ 1 لوحده.

وليه مفيش [[-u]] و [[-p]]؟ لأن [[ping]] من الأوامر القليلة اللي Mongo بيرد عليها من غير login. والباسورد لو اتكتب هنا يبان لأي حد يعمل [[docker inspect]].

---

## ٢. التوقيتات

~~~text
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s
~~~

| الإعداد | معناه |
|---|---|
| [[interval: 10s]] | افحص كل ١٠ ثواني (s = seconds) |
| [[timeout: 5s]] | لو الفحص أخد أكتر من ٥ ثواني يتحسب فشل |
| [[retries: 5]] | ٥ مرات فشل ورا بعض = [[unhealthy]] |
| [[start_period: 30s]] | أول ٣٠ ثانية الفشل مش بيتعد (وقت سماح للبداية) |

---

## ٣. الباك إند يستنى

~~~text
  backend:
    depends_on:
      mongo:
        condition: service_healthy
~~~

[[depends_on]] لوحده بيقول «شغّل mongo قبلي» بس. [[condition: service_healthy]] بتزوّد «واستنى لحد ما حالته تبقى healthy».

---

## اللي حصل فعلًا

~~~bash
docker compose up -d
~~~

~~~text الناتج
 Container mongo-lab-c2-mongo-1 Started
 Container mongo-lab-c2-mongo-1 Waiting
 Container mongo-lab-c2-mongo-1 Healthy
 Container mongo-lab-c2-backend-1 Starting
 Container mongo-lab-c2-backend-1 Started
~~~

[[Waiting]] ثم [[Healthy]] للـ mongo، وبعدها بس الـ backend بدأ. و [[docker compose ps]] في النص:

~~~text بعد ثانيتين
backend Created
mongo Up 1 second (health: starting)
~~~

~~~text بعد ما خلص
backend Up Less than a second
mongo Up 6 seconds (healthy)
~~~

الـ backend كان [[Created]] (اتعمل ومش شغال) لحد ما mongo بقى healthy. ووصل healthy في ٦ ثواني مش ١٠، لأن Docker في فترة [[start_period]] بيفحص أسرع (كل ٥ ثواني افتراضيًا، إعداد اسمه [[start_interval]]).

### تفاصيل الفحوصات

~~~bash
docker inspect --format '{{json .State.Health}}' mongo-lab-c2-mongo-1
~~~

~~~text الناتج
{"Status":"healthy","FailingStreak":0,"Log":[{"Start":"2026-10-06T13:44:31.807289908Z","End":"2026-10-06T13:44:32.426798935Z","ExitCode":0,"Output":"1\n"}]}
~~~

[[FailingStreak]] عدد مرات الفشل ورا بعض دلوقتي، و [[Log]] آخر الفحوصات بالـ exit code والناتج. ده أول مكان تبص فيه لو الحالة [[unhealthy]].

> ملحوظة لاحظتها وأنا بجرّب: أول تشغيل، ping بيرد وMongo المؤقت لسه بيعمل اليوزر، فلو دخلت باليوزر في نفس اللحظة ممكن يطلع [[Authentication failed.]] مرة أو اتنين. الباك إند لازم يعيد المحاولة في الاتصال، والـ drivers بتعمل ده لوحدها.

## الخلاصة

- [[healthcheck]] = أمر بيرجع 0 لما الخدمة جاهزة، و [[ping]] من غير باسورد.
- [[condition: service_healthy]] هي اللي بتخلي الاستنى حقيقي.
- [[docker compose ps]] للحالة، و [[docker inspect ... .State.Health]] للتفاصيل.`,
          lines: [
            "الخدمات.",
            "خدمة Mongo.",
            "الصورة.",
            "فحص الصحة:",
            "اسأل Mongo ping، ومحتاجش باسورد.",
            "كل ١٠ ثواني.",
            "لو مردّش في ٥ ثواني يبقى فشل.",
            "٥ مرات فشل ورا بعض يبقى unhealthy.",
            "أول ٣٠ ثانية الفشل مش بيتحسب.",
            "الباك إند.",
            "بيعتمد على:",
            "Mongo...",
            "...لما يبقى healthy مش بس شغال."
          ],
          sol: R`أول ما تعمل [[up -d]]، [[docker compose ps mongo]] بيطلّع في STATUS حاجة زي [[Up Less than a second (health: starting)]]، وبعد أول فحص ناجح (في تجربتي بعد ~١٠ ثواني) بيبقى [[Up 12 seconds (healthy)]].

والـ backend اللي عليه [[condition: service_healthy]] مش هيبدأ غير بعد الـ healthy. في لوج [[docker compose up]] هتشوف [[Waiting]] ثم [[Healthy]] للـ mongo قبل ما الـ backend يبدأ.

لو فضل [[health: starting]] وبعدين بقى [[unhealthy]]: شوف السبب بـ [[docker inspect --format '{{json .State.Health}}' CONTAINER]]، هتلاقي ناتج آخر فحوصات. الأسباب الشائعة: image قديمة مفيهاش [[mongosh]] (قبل Mongo 6 كان اسمه [[mongo]])، أو كتبت الـ test كـ string واحد مع [[CMD]] بدل [[CMD-SHELL]]. والـ ping نفسه مش محتاج auth، فمش هيفشل بسبب الباسورد.`
        },
        {
          cmd: "createUser",
          title: "يوزر للتطبيق بأقل صلاحيات",
          desc: R`root للإدارة بس. التطبيق ياخد يوزر ليه دور [[readWrite]] على قاعدته وبس، والباك أب ياخد يوزر بدور [[backup]]. لو الكود اتخترق، الضرر بيقف عند قاعدة واحدة.

[[passwordPrompt()]] بيسألك الباسورد بدل ما تكتبه في الأمر.`,
          example: R`use myapp
db.createUser({ user: "myapp_user", pwd: passwordPrompt(), roles: [{ role: "readWrite", db: "myapp" }] })
db.getUsers()
db.grantRolesToUser("myapp_user", [{ role: "read", db: "reports" }])
db.changeUserPassword("myapp_user", passwordPrompt())
use admin
db.createUser({ user: "backup", pwd: passwordPrompt(), roles: ["backup", "restore"] })`,
          try: R`اعمل myapp_user في الـ lab، واتصل بيه: [[mongosh "mongodb://myapp_user:PASS@localhost:27017/myapp"]]، وجرّب تكتب في myapp (هينفع) وفي قاعدة تانية (هيطلع unauthorized).`,
          flag: "script",
          deep: {
            why: "لو التطبيق متصل بـ root، أي ثغرة في الكود (injection أو سر اتسرّب) بتدي المهاجم كل القواعد وإدارة السيرفر. يوزر محدود بيقلّل الخسارة.",
            how: R`اليوزر بيتخزن في القاعدة اللي انت فيها وقت [[createUser]]. هنا في myapp، فالرابط [[mongodb://myapp_user:...@mongo:27017/myapp]] مش محتاج authSource.

الأدوار الجاهزة: [[read]] قراية بس، [[readWrite]] قراية وكتابة وعمل indexes، [[dbAdmin]] إدارة القاعدة، [[root]] كل حاجة. و [[backup]] و [[restore]] في admin، لـ mongodump و mongorestore.

[[grantRolesToUser]] بيضيف دور من غير ما يلمس الموجود، و [[revokeRolesFromUser]] العكس. و [[getUsers()]] بيعرض اليوزرز وأدوارهم في القاعدة الحالية.

[[passwordPrompt()]] دالة في mongosh بتسأل الباسورد وتخفيه، فمش بيتسجّل في history الـ shell.`,
            when: "أول ما تشغّل Mongo لتطبيق. ويوزر لكل تطبيق لو كذا تطبيق على نفس السيرفر.",
            mistakes: R`في مشروع حقيقي التطبيق والباك أب الاتنين كانوا بيتصلوا بنفس يوزر admin. واحد لكل وظيفة أأمن وأسهل في تغيير الباسورد. وتعمل اليوزر وانت في admin وتنسى، فالتطبيق يفشل لأن الرابط مفيهوش [[authSource=admin]].`
          },
          teach: R`## يوزر لكل وظيفة، وكل يوزر على قده

الـ root اللي اتعمل من [[MONGO_INITDB_ROOT_USERNAME]] بيقدر يعمل أي حاجة في أي قاعدة. المثال بيعمل يوزرين أصغر: واحد للتطبيق، وواحد للباك أب. الأوامر جوه mongosh وانت داخل بالـ root. جرّبتها على [[mongo:8]]، بس بباسورد مكتوب بدل [[passwordPrompt()]]، لأن الأخيرة بتستنى حد يكتب على الكيبورد (هتشوفها تحت).

---

## ١. [[use myapp]]

مهم جدًا هنا: اليوزر **بيتخزن في القاعدة اللي انت واقف فيها**. القاعدة دي اسمها الـ authentication database بتاعته، وهي اللي بتتكتب في [[authSource]].

---

## ٢. [[db.createUser(...)]]

~~~javascript
db.createUser({ user: "myapp_user", pwd: passwordPrompt(), roles: [{ role: "readWrite", db: "myapp" }] })
~~~

الـ object اللي جوه فيه ٣ حقول:

| الحقل | القيمة | معناها |
|---|---|---|
| [[user]] | [["myapp_user"]] | اسم اليوزر |
| [[pwd]] | [[passwordPrompt()]] | الباسورد، بيتسأل وقتها |
| [[roles]] | array | الصلاحيات، كل واحدة [[{ role, db }]] |

[[{ role: "readWrite", db: "myapp" }]] = «يقرا ويكتب في myapp». مفيش أي صلاحية على حاجة تانية.

[[passwordPrompt()]] دالة في mongosh بتطبع [[Enter password:]] وتستنى تكتب، والحروف مش بتظهر، والباسورد مش بيتسجّل في history الـ shell. (من الـ docs، ومش بتشتغل في [[--eval]] أو سكربت من غير ترمنال.)

~~~text الناتج
{ ok: 1 }
~~~

---

## ٣. [[db.getUsers()]]

~~~text الناتج
{
  users: [
    {
      _id: 'myapp.myapp_user',
      userId: UUID('43a633c6-79c4-4a9a-981f-1e8ed26b41e8'),
      user: 'myapp_user',
      db: 'myapp',
      roles: [ { role: 'readWrite', db: 'myapp' } ],
      mechanisms: [ 'SCRAM-SHA-1', 'SCRAM-SHA-256' ]
    }
  ],
  ok: 1
}
~~~

- [[_id: 'myapp.myapp_user']]: القاعدة + اسم اليوزر. يعني ممكن يبقى فيه [[myapp_user]] تاني في قاعدة تانية وده يوزر مختلف.
- [[db: 'myapp']]: اتخزن هنا عشان كنا واقفين على myapp.
- [[mechanisms]]: طرق التحقق من الباسورد. SCRAM (Salted Challenge Response Authentication Mechanism) يعني الباسورد مش بيتخزن ولا بيتبعت زي ما هو؛ بيتخزن hash، والدخول بيتم بتبادل رسايل محسوبة منه.

---

## ٤. [[grantRolesToUser]]

~~~javascript
db.grantRolesToUser("myapp_user", [{ role: "read", db: "reports" }])
~~~

بيضيف دور من غير ما يلمس الموجود. بعدها [[db.getUser("myapp_user").roles]]:

~~~text الناتج
[ { role: 'read', db: 'reports' }, { role: 'readWrite', db: 'myapp' } ]
~~~

الدورين موجودين (الترتيب في الناتج مش مهم). والعكس [[revokeRolesFromUser]] بنفس الشكل.

---

## ٥. [[changeUserPassword]]

~~~javascript
db.changeUserPassword("myapp_user", passwordPrompt())
~~~

بيغيّر الباسورد ([[{ ok: 1 }]]). جرّبت الدخول بالقديم بعدها: [[Authentication failed.]]. دي الطريقة الوحيدة تغيّر باسورد، مش تغيير متغير في [[.env]].

---

## ٦. و ٧. يوزر الباك أب في admin

~~~javascript
use admin
db.createUser({ user: "backup", pwd: passwordPrompt(), roles: ["backup", "restore"] })
~~~

هنا [[roles]] نصوص بس من غير [[db]]، فالدور بيتاخد من القاعدة الحالية (admin). و [[db.getUser("backup")]] بيأكد:

~~~text الناتج
roles: [ { role: 'backup', db: 'admin' }, { role: 'restore', db: 'admin' } ],
~~~

[[backup]] و [[restore]] أدوار جاهزة بتدّي اللي mongodump و mongorestore محتاجينه على كل القواعد، من غير صلاحيات إدارة.

---

## نجرّب اليوزر

~~~bash
mongosh "mongodb://myapp_user:AppPass2@localhost:27017/myapp" --quiet --eval 'db.notes.insertOne({ text: "ok" })'
~~~

~~~text الناتج
{
  acknowledged: true,
  insertedId: ObjectId('6ac4fb95b8d3c32b043ee6ff')
}
~~~

الرابط فيه [[/myapp]] ومفيش [[authSource]]: اليوزر في myapp أصلًا. ودلوقتي قاعدة تانية:

~~~text db.getSiblingDB("other").notes.insertOne({ text: "no" })
Uncaught MongoServerError[Unauthorized]: not authorized on other to execute command { insert: "notes", ...
~~~

[[getSiblingDB("other")]] = «هات قاعدة اسمها other من نفس السيرفر». والرفض ده المطلوب. والقراية من reports عدّت ورجّعت [[[]]] (فاضية بس مسموح).

ولو شلت [[/myapp]] من الرابط:

~~~text mongodb://myapp_user:AppPass2@localhost:27017/
MongoServerError: Authentication failed.
~~~

من غير قاعدة في الرابط، mongosh بيدوّر على اليوزر في [[admin]]، وهو مش هناك.

## الأدوار الجاهزة

| الدور | بيعمل إيه |
|---|---|
| [[read]] | قراية بس |
| [[readWrite]] | قراية وكتابة وعمل indexes |
| [[dbAdmin]] | إدارة القاعدة (indexes، stats) من غير قراية الداتا |
| [[backup]] / [[restore]] | لأدوات الباك أب (في admin) |
| [[root]] | كل حاجة |

## الخلاصة

- [[use]] القاعدة الصح **قبل** [[createUser]]، لأنها هتبقى الـ authSource.
- التطبيق: [[readWrite]] على قاعدته بس. الباك أب: [[backup]] و [[restore]] في admin.
- [[passwordPrompt()]] بدل الباسورد مكتوب، و [[changeUserPassword]] للتغيير.`,
          lines: [
            "ادخل قاعدة التطبيق (اليوزر هيتخزن هنا).",
            "يوزر يقرا ويكتب في myapp بس، والباسورد بيتسأل.",
            "اليوزرز وأدوارهم.",
            "ضيفله قراية بس على قاعدة تانية.",
            "غيّر باسورده.",
            "ادخل admin.",
            "يوزر للباك أب والترجيع بس."
          ],
          sol: R`[[db.createUser(...)]] بيرجّع [[{ ok: 1 }]]، و [[db.getUsers()]] بيعرض اليوزر بـ [[roles: [ { role: 'readWrite', db: 'myapp' } ]]].

بعدين بالرابط [[mongodb://myapp_user:PASS@localhost:27017/myapp]]: [[db.notes.insertOne({ text: "ok" })]] بيرجّع [[acknowledged: true]]. و [[db.getSiblingDB("other").notes.insertOne({ text: "no" })]] بيرجّع [[MongoServerError[Unauthorized]: not authorized on other to execute command { insert: "notes", ... }]].

الأخطاء الشائعة: تعمل الـ createUser وانت واقف على [[admin]] بدل [[myapp]]، فاليوزر يتسجّل في admin والرابط من غير [[authSource=admin]] يقول [[Authentication failed.]]. ونفس الـ error لو شلت [[/myapp]] من الرابط، لأن الـ authSource الافتراضي ساعتها admin. وخلي بالك إن [[mongodump --db myapp]] مش بياخد اليوزرز، لأنهم متخزنين في [[admin.system.users]]؛ في النقل لسيرفر جديد لازم تعملهم تاني.`,
          solCode: R`use myapp
db.createUser({ user: "myapp_user", pwd: passwordPrompt(), roles: [{ role: "readWrite", db: "myapp" }] })
exit

mongosh "mongodb://myapp_user:PASS@localhost:27017/myapp"
db.notes.insertOne({ text: "ok" })
db.getSiblingDB("other").notes.insertOne({ text: "no" })`
        },
        {
          cmd: "createIndex و explain",
          title: "خلي البحث سريع",
          desc: R`من غير index، [[find]] بيقرا كل مستند في الـ collection (اسمها COLLSCAN). [[createIndex]] على الحقل اللي بتدوّر بيه بيخليه يروح للمستندات على طول (IXSCAN).

[[explain("executionStats")]] بيوريك Mongo عمل إيه فعلًا وقرا كام مستند.`,
          example: R`db.users.createIndex({ email: 1 }, { unique: true })
db.orders.createIndex({ userId: 1, createdAt: -1 })
db.orders.getIndexes()
db.orders.find({ userId: 42 }).sort({ createdAt: -1 }).explain("executionStats")
db.orders.dropIndex("userId_1_createdAt_-1")`,
          try: R`في lab ضيف ١٠٠ ألف مستند بلوب ([[for (let i = 0; i < 100000; i++) db.t.insertOne({ n: i })]])، وشغّل explain على [[find({ n: 99999 })]] قبل وبعد [[createIndex({ n: 1 })]]، وقارن [[totalDocsExamined]].`,
          flag: "script",
          deep: {
            why: "التطبيق سريع أول شهر، وبعد ما البيانات تكبر كل صفحة بتاخد ثواني. السبب غالبًا استعلام بيقرا الـ collection كلها كل مرة.",
            how: R`الـ index ترتيب جاهز للحقل. [[{ email: 1 }]] تصاعدي، و [[unique: true]] بيمنع إيميلين زي بعض (وده حماية بيانات مش سرعة بس).

index على أكتر من حقل: الترتيب مهم. القاعدة: حقول المساواة الأول ([[userId]])، وبعدين الـ sort ([[createdAt]])، وبعدين المدى ([[$gt]]). الـ index ده بيخدم كمان أي بحث بـ userId لوحده.

في ناتج explain بص على: [[stage]] (IXSCAN كويس، COLLSCAN وحش في collection كبيرة)، و [[totalDocsExamined]] مقابل [[nReturned]]: لو قرا ١٠٠ ألف عشان يرجّع ١٠، ناقصك index.

كل index بيبطّأ الكتابة شوية وبياخد رام، فمتعملش index لكل حقل. و [[getIndexes()]] بيوريك الموجود وأساميه عشان [[dropIndex]].`,
            when: "أي حقل بتدوّر بيه أو بترتّب بيه كتير. وكل ما صفحة تبطأ: explain الأول.",
            mistakes: R`تسيب Mongoose يعمل الـ indexes لوحده ([[autoIndex]]) على الإنتاج: بيتبنوا وقت تشغيل التطبيق على collections كبيرة. وتعمل [[unique]] على حقل فيه تكرار أصلًا فيفشل؛ نضّف التكرار الأول.`
          },
          teach: R`## الـ index = فهرس الكتاب

من غير فهرس، عشان تلاقي كلمة في كتاب لازم تقلّب كل الصفحات. ده اللي Mongo بيعمله من غير index: بيقرا كل مستند، واسمها **COLLSCAN** (collection scan). الـ index نسخة مترتبة من حقل (أو أكتر) ومعاها مكان كل مستند، فـ Mongo بيروح للي محتاجه على طول، واسمها **IXSCAN** (index scan). جرّبت المثال في mongosh على [[mongo:8]] بـ 1000 أوردر لـ 50 يوزر (كل يوزر عنده 20).

---

## ١. index فريد على الإيميل

~~~javascript
db.users.createIndex({ email: 1 }, { unique: true })
~~~

- [[{ email: 1 }]]: index على email، و [[1]] ترتيب تصاعدي ([[-1]] تنازلي). لحقل واحد الاتجاه مش فارق، لأن Mongo بيقدر يمشي في الـ index من الناحيتين.
- [[{ unique: true }]]: ممنوع قيمتين زي بعض.

~~~text الناتج
email_1
~~~

ده **اسم** الـ index: اسم الحقل + الاتجاه. وجرّبت أضيف إيميل موجود:

~~~text الناتج
Uncaught MongoServerError: E11000 duplicate key error collection: lab.users index: email_1 dup key: { email: "sara@example.com" }
~~~

[[E11000]] كود الـ duplicate key. يعني الـ unique هنا حماية بيانات، مش سرعة بس.

---

## ٢. index مركّب

~~~javascript
db.orders.createIndex({ userId: 1, createdAt: -1 })
~~~

index على حقلين: مترتب بـ [[userId]]، وجوه كل يوزر بـ [[createdAt]] من الأحدث. ده بالظبط شكل صفحة «طلباتي»: أوردرات يوزر واحد بالأحدث. اسمه بيطلع [[userId_1_createdAt_-1]].

---

## ٣. [[getIndexes()]]

~~~text الناتج
[
  { v: 2, key: { _id: 1 }, name: '_id_' },
  {
    v: 2,
    key: { userId: 1, createdAt: -1 },
    name: 'userId_1_createdAt_-1'
  }
]
~~~

[[_id_]] موجود دايمًا لوحده في كل collection. [[key]] الحقول، و [[name]] الاسم اللي هتحتاجه في [[dropIndex]]، و [[v: 2]] نسخة صيغة الـ index (متشغلش بالك بيها).

---

## ٤. [[explain("executionStats")]]

~~~javascript
db.orders.find({ userId: 42 }).sort({ createdAt: -1 }).explain("executionStats")
~~~

[[explain]] بدل ما يرجّع النتايج، بيرجّع **إزاي** Mongo جابها. و [["executionStats"]] معناها «نفّذ فعلًا وقولي الأرقام». الناتج طويل، فهنبص على حتتين: [[queryPlanner.winningPlan]] (الخطة اللي اتنفذت) و [[executionStats]] (الأرقام).

### قبل الـ index

~~~text winningPlan
{
  stage: 'SORT',
  sortPattern: { createdAt: -1 },
  memLimit: 104857600,
  inputStage: {
    stage: 'COLLSCAN',
    filter: { userId: { '$eq': 42 } },
    ...
  }
}
~~~

اتقرا من تحت لفوق (من [[inputStage]] لبرّه): **COLLSCAN** قرا كل المستندات وفلتر [[userId = 42]]، وبعدين **SORT** رتّبهم في الرام. [[memLimit: 104857600]] = 100 ميجا بالبايت، أقصى رام مسموح للترتيب ده.

| الرقم | القيمة | معناه |
|---|---|---|
| [[nReturned]] | 20 | رجّع كام |
| [[totalKeysExamined]] | 0 | قرا كام مفتاح من index (مفيش index) |
| [[totalDocsExamined]] | 1000 | قرا كام مستند |

قرا 1000 عشان يرجّع 20.

### بعد الـ index

~~~text winningPlan
{
  stage: 'FETCH',
  inputStage: {
    stage: 'IXSCAN',
    keyPattern: { userId: 1, createdAt: -1 },
    indexName: 'userId_1_createdAt_-1',
    ...
    indexBounds: { userId: [ '[42, 42]' ], createdAt: [ '[MaxKey, MinKey]' ] }
  }
}
~~~

**IXSCAN** مشي في الـ index على المفاتيح اللي [[userId]] بتاعها من 42 لـ 42 ([[indexBounds]])، وهي أصلًا مترتبة بالتاريخ، فمفيش SORT خالص. **FETCH** جاب المستندات نفسها. والأرقام: [[nReturned: 20]] و [[totalKeysExamined: 20]] و [[totalDocsExamined: 20]].

> القاعدة: قارن [[totalDocsExamined]] بـ [[nReturned]]. قريبين من بعض = الـ index شغال. واحد بالآلاف والتاني بالعشرات = ناقصك index.

وفي التجربة بتاعة الـ [[try]] على 100 ألف مستند: [[totalDocsExamined]] كان [[100000]] قبل [[createIndex({ n: 1 })]] و [[1]] بعده.

---

## ٥. [[dropIndex]]

~~~javascript
db.orders.dropIndex("userId_1_createdAt_-1")
~~~

~~~text الناتج
{ nIndexesWas: 2, ok: 1 }
~~~

[[nIndexesWas: 2]] = كان فيه اتنين قبل المسح ([[_id_]] والمركّب). بعدها [[getIndexes()]] فيه [[_id_]] بس.

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[createIndex({ f: 1 })]] | index، واسمه [[f_1]] |
| [[{ unique: true }]] | يمنع التكرار (E11000) |
| [[getIndexes()]] | الموجود وأساميه |
| [[explain("executionStats")]] | COLLSCAN ولا IXSCAN، وقرا كام |
| [[dropIndex("name")]] | يشيله |

كل index بيبطّأ الكتابة شوية وبياخد مساحة، فاعمله للحقول اللي بتدوّر أو بترتّب بيها فعلًا.`,
          lines: [
            "index على الإيميل، ومفيش إيميلين زي بعض.",
            "index مركّب: طلبات يوزر مرتبة بالأحدث.",
            "الـ indexes الموجودة وأساميها.",
            "Mongo عمل إيه فعلًا في الاستعلام ده.",
            "شيل index باسمه."
          ],
          sol: R`خلي بالك إن اللوب ده بطيء: ١٠٠ ألف [[insertOne]] كل واحد رحلة للسيرفر، وأخد عندي حوالي دقيقة ونص. نفس الداتا بـ [[insertMany]] خلصت في أقل من ثانية.

قبل الـ index: [[winningPlan.stage]] بيبقى [[COLLSCAN]]، و [[totalDocsExamined: 100000]] و [[totalKeysExamined: 0]]. قرا كل المستندات عشان يلاقي واحد.

بعد [[createIndex({ n: 1 })]] (بيرجّع اسمه [['n_1']]): الخطة بقت [[FETCH]] وتحتها [[IXSCAN]] على [[n_1]]، و [[totalDocsExamined: 1]] و [[totalKeysExamined: 1]]. الوقت نزل من حوالي 20ms لـ 1ms.

المقياس المهم هو نسبة [[totalDocsExamined]] لـ [[nReturned]]: قريبة من 1 يبقى الـ index شغال. ولو بعد الـ index لسه [[COLLSCAN]]، اتأكد إن اسم الحقل في الـ find هو نفسه في الـ index، وإنك على نفس الـ collection. و [[explain()]] من غير [["executionStats"]] مش هيطلّع الأرقام دي.`,
          solCode: R`use lab
db.t.insertMany(Array.from({ length: 100000 }, (_, i) => ({ n: i })))
db.t.find({ n: 99999 }).explain("executionStats").executionStats.totalDocsExamined
db.t.createIndex({ n: 1 })
db.t.find({ n: 99999 }).explain("executionStats").executionStats.totalDocsExamined`
        },
        {
          cmd: "بورت 27017",
          title: "متفتحش بورت القاعدة للإنترنت",
          desc: R`Mongo لازم يسمع على [[127.0.0.1]] أو جوه شبكة Docker بس. و Docker بيفتح البورتات من غير ما يعدّي على ufw، فـ [[-p 27017:27017]] معناها مفتوح للعالم حتى لو ufw قافل.

ولو محتاج تدخل من جهازك (Compass مثلًا): SSH tunnel.`,
          example: R`docker ps --format '{{.Names}}\t{{.Ports}}'
sudo ss -ltnp | grep 27017
nc -zv -w 3 203.0.113.10 27017
ssh -N -L 27017:127.0.0.1:27017 deploy@203.0.113.10`,
          try: R`على سيرفر التجربة: شغّل التالت من جهازك (مش من السيرفر)، والمفروض يفشل. لو اتصل، بورت القاعدة مفتوح للعالم.`,
          deep: {
            why: "فيه بوتات بتلف على الإنترنت كله على بورت 27017. لو لقت Mongo مفتوح، بتمسح القواعد وتسيب collection فيها رسالة فدية. ولو فيه باسورد، بتجرّب باسوردات.",
            how: R`[[docker ps]] بيوريك البورتات المنشورة: [[0.0.0.0:27017->27017/tcp]] يعني مفتوح على كل الواجهات، و [[127.0.0.1:27017->27017/tcp]] يعني السيرفر نفسه بس. ولو مفيش بورت خالص يبقى أحسن: التطبيق بيوصل جوه شبكة compose.

[[ss -ltnp]] نفس الفكرة من ناحية السيستم: مين بيسمع على البورت وعلى أنهي عنوان.

Docker بيكتب قواعد iptables بتاعته قبل قواعد ufw، فـ [[ufw deny 27017]] مش بيقفل بورت نشره Docker. الحل إنك متنشرهوش على 0.0.0.0 من الأول.

[[ssh -N -L]]: البورت 27017 على جهازك بيتنقل عبر SSH لـ 127.0.0.1:27017 على السيرفر. بعدها Compass على جهازك يتصل بـ [[mongodb://...@localhost:27017]] كأن القاعدة عندك. [[-N]] من غير shell، بس النفق.`,
            when: "بعد أي تشغيل لـ Mongo على سيرفر، وبعد أي تعديل في compose.",
            mistakes: R`في مشروع حقيقي الباك إند كان ناشر [[5000:5000]] على كل الواجهات، فالـ API كان مكشوف مباشرة من غير Nginx؛ نفس الغلطة بتحصل مع 27017. اكتب [[127.0.0.1:]] قبل أي بورت مش المفروض يبقى عام. و [[--bind_ip_all]] جوه Docker عادي، الحماية بتبقى في ports.`
          },
          teach: R`## ٤ أسئلة: مين فاتح البورت؟ وعلى أنهي عنوان؟ واصل من برّه؟ وإزاي أدخل بأمان؟

كل سطر في المثال بيجاوب سؤال. الأول والتاني بيتشغّلوا **على السيرفر**، والتالت **من جهازك**، والرابع من جهازك برضه. [[203.0.113.10]] IP مثال (المدى [[203.0.113.x]] محجوز للتوثيق ومش بتاع حد)، حط مكانه IP سيرفرك. جرّبت التلاتة الأولانيين على Docker Desktop وجوه container من [[ubuntu:24.04]]، والرابع (SSH tunnel) محتاج سيرفر حقيقي فشرحه من الـ docs بتاعة OpenSSH.

---

## ١. Docker ناشر إيه؟

~~~bash
docker ps --format '{{.Names}}\t{{.Ports}}'
~~~

- [[docker ps]]: الـ containers الشغالة.
- [[--format '...']]: بدل الجدول الكامل، اطبع اللي أنا عايزه بس. [[{{.Names}}]] الاسم، و [[{{.Ports}}]] البورتات، و [[\t]] tab بينهم.
- العلامات المفردة عشان bash ميلمسش [[{{ }}]] (في PowerShell نفس الأمر شغال زي ما هو).

شغّلت container تجربة منشور غلط جنب الـ lab:

~~~text الناتج
mongo-lab-pub	0.0.0.0:27119->27017/tcp, [::]:27119->27017/tcp
mongo-lab-a	127.0.0.1:27117->27017/tcp
~~~

اقرا كل واحد كده: **عنوان:بورت عندك ← بورت جوه**.

| اللي قبل البورت | معناه |
|---|---|
| [[0.0.0.0]] | كل كروت الشبكة: الجهاز، والشبكة المحلية، والإنترنت لو السيرفر مكشوف. **خطر** |
| [[[::]]] | نفس الكلام بس IPv6 |
| [[127.0.0.1]] | الجهاز ده بس (loopback). **ده الصح** |
| مفيش بورتات خالص | محدش من برّه Docker يوصل، والتطبيق في نفس compose بيوصل باسم الخدمة |

السطر الأول جه من [[-p 27119:27017]] من غير IP، والتاني من [[-p 127.0.0.1:27117:27017]].

---

## ٢. مين بيسمع على السيستم؟

~~~bash
sudo ss -ltnp | grep 27017
~~~

[[ss]] (socket statistics) بيعرض الـ sockets. الـ flags متلزقة في بعض:

| flag | معناه |
|---|---|
| [[-l]] | listening: اللي مستني اتصالات بس |
| [[-t]] | TCP بس |
| [[-n]] | أرقام: [[27017]] مش اسم خدمة |
| [[-p]] | process: اسم البرنامج (محتاج [[sudo]] عشان يشوف بتاع كل اليوزرز) |

و [[| grep 27017]] بيسيب السطور اللي فيها 27017 بس. جرّبته جوه شبكة الـ container بتاع Mongo نفسه:

~~~text الناتج
LISTEN 0      4096         0.0.0.0:27017      0.0.0.0:*
~~~

عمود [[Local Address:Port]] هو المهم. جوه الـ container [[0.0.0.0]] طبيعي (Mongo في صورة Docker بيسمع على كل حاجة جوه، عشان الـ containers التانية توصله)، والحماية الحقيقية في الـ [[ports]] بتاعة Docker. على السيرفر نفسه (برّه Docker) المفروض تشوف [[127.0.0.1:27017]]، ولو شفت [[0.0.0.0:27017]] أو [[*:27017]] يبقى مفتوح.

---

## ٣. واصل من برّه؟

~~~bash
nc -zv -w 3 203.0.113.10 27017
~~~

[[nc]] (netcat) أداة بتفتح اتصال TCP:

| flag | معناه |
|---|---|
| [[-z]] | zero I/O: جرّب تتصل بس، متبعتش حاجة |
| [[-v]] | verbose: قولي النتيجة |
| [[-w 3]] | wait: استنى ٣ ثواني بالكتير |

جرّبت التلات حالات:

~~~text بورت مفتوح (Mongo على 127.0.0.1 من جوه)
Connection to 127.0.0.1 27017 port [tcp/*] succeeded!
~~~

~~~text مفيش حد بيسمع
nc: connect to 127.0.0.1 port 27019 (tcp) failed: Connection refused
~~~

~~~text الـ IP المثال
nc: connect to 203.0.113.10 port 27017 (tcp) timed out: Operation now in progress
~~~

من جهازك على سيرفرك: [[succeeded]] = **مشكلة**، القاعدة مكشوفة. [[refused]] (حد رد وقال لأ) أو [[timed out]] (محدش رد خالص، غالبًا فايروول) = تمام. و exit code بيبقى 1 في الحالتين دول، فتقدر تحطه في سكربت.

### ليه ufw مش كفاية؟

Docker بيضيف قواعد iptables بتاعته في مكان بيتقري **قبل** قواعد ufw، فبورت منشور على [[0.0.0.0]] بيبقى مفتوح حتى لو [[ufw status]] مش فاتحه. الحل مش في الفايروول، الحل [[127.0.0.1:]] في الـ ports.

---

## ٤. ادخل بأمان: SSH tunnel

~~~bash
ssh -N -L 27017:127.0.0.1:27017 deploy@203.0.113.10
~~~

| الجزء | معناه |
|---|---|
| [[deploy@203.0.113.10]] | ادخل السيرفر باليوزر deploy |
| [[-L 27017:127.0.0.1:27017]] | Local forward: البورت 27017 **على جهازك** يتنقل عبر SSH لـ [[127.0.0.1:27017]] **من ناحية السيرفر** |
| [[-N]] | No command: متفتحش shell، النفق بس |

اقراها: **بورت عندي : عنوان من عند السيرفر : بورته**. الأمر بيفضل شغال (من غير ما يطبع حاجة)، وطول ما هو شغال Compass أو mongosh على جهازك يتصل بـ [[mongodb://...@localhost:27017/...]] كأن القاعدة عندك، والاتصال كله مشفّر جوه SSH. [[Ctrl+C]] بيقفل النفق. ولو 27017 مستخدم عندك، غيّر الأول: [[-L 27018:127.0.0.1:27017]] واتصل على 27018. والأمر ده نفسه شغال من PowerShell على ويندوز ١٠/١١ (OpenSSH جاي مع ويندوز).

## الخلاصة

| السؤال | الأمر | الإجابة الصح |
|---|---|---|
| Docker ناشر إيه؟ | [[docker ps --format ...]] | [[127.0.0.1:27017->27017/tcp]] أو مفيش |
| السيستم بيسمع فين؟ | [[sudo ss -ltnp]] | [[127.0.0.1:27017]] |
| واصل من برّه؟ | [[nc -zv]] من جهازك | refused أو timed out |
| أدخل إزاي؟ | [[ssh -N -L]] | نفق، مش بورت مفتوح |`,
          lines: [
            "كل container والبورتات اللي نشرها (دوّر على 0.0.0.0).",
            "مين بيسمع على 27017 وعلى أنهي عنوان.",
            "من جهازك: البورت ده مفتوح من بره؟ (المفروض يفشل).",
            "نفق: 27017 على جهازك يوصل للقاعدة على السيرفر."
          ],
          sol: R`النتيجة الصح من جهازك: [[nc]] يفشل، يا بـ [[Connection timed out]] (الفايروول بيرمي الباكتات) يا [[Connection refused]]. وعلى السيرفر [[docker ps]] لازم يطلّع البورت كده [[127.0.0.1:27017->27017/tcp]]، و [[ss -ltnp]] يطلّع [[127.0.0.1:27017]].

لو طلع [[Connection to 203.0.113.10 27017 port [tcp/*] succeeded!]] يبقى القاعدة مفتوحة للإنترنت. غالبًا compose فيه [["27017:27017"]] من غير [[127.0.0.1]]، و [[docker ps]] بيوريك [[0.0.0.0:27017->27017/tcp]]. والمفاجأة إن ufw مش بيحميك هنا: Docker بيكتب قواعد iptables بتاعته قبل ufw، فحتى لو [[ufw status]] مش فاتح 27017 البورت مفتوح. الحل تغيّر السطر لـ [["127.0.0.1:27017:27017"]] وتعمل [[docker compose up -d]]، أو تشيل [[ports]] خالص لو التطبيق في نفس الـ compose.

وبعدها تستخدم الـ tunnel (السطر الرابع) لما تحتاج توصل من جهازك.`
        }
      ]
    }
]);
