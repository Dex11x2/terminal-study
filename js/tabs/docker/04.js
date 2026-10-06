// تكملة تاب docker: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/docker/01.js (شرح حقول الدرس في أوله)
MORE("docker", [
    {
      t: "Docker على ويندوز والتطوير",
      l: 2,
      n: "hot reload، وبورتات متاخدة، ونسختين من نفس المشروع، ولما التعديل ميظهرش",
      items: [
        {
          cmd: "hot reload على ويندوز",
          title: "بتعدّل الكود والـ container مش حاسس",
          desc: R`على Docker Desktop ويندوز، لو المشروع على درايف ويندوز ومربوط bind mount، إشعارات تغيير الملفات مش بتعدّي لينكس جوه الـ container، فـ Next و Vite مش بيعيدوا التحميل. الحل polling: [[WATCHPACK_POLLING=true]] لـ Next، و [[CHOKIDAR_USEPOLLING=true]] لأدوات تانية. و volume مجهول على [[/app/node_modules]] عشان node_modules بتاعة لينكس متتغطاش بتاعة ويندوز.

وبعد ما تضيف مكتبة: [[docker compose up -d --build -V]].`,
          example: R`services:
  web:
    build: { context: ., dockerfile: Dockerfile.dev }
    ports: ["3002:3000"]
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    environment:
      - WATCHPACK_POLLING=true
      - CHOKIDAR_USEPOLLING=true`,
          try: "شغّل مشروع Next بالملف ده من غير سطور POLLING وعدّل صفحة: مش هيحصل حاجة. ضيفهم واعمل [[docker compose up -d]] وعدّل تاني.",
          flag: "script",
          deep: {
            why: "التطوير جوه Docker على ويندوز بيقابل ٣ مشاكل مع بعض: الـ hot reload مش شغال، و node_modules بتاعة ويندوز بتبوّظ الـ container، والمكتبة الجديدة مش باينة بعد الـ build.",
            how: R`لينكس بيعرف إن ملف اتغير عن طريق inotify. الملفات اللي جاية من درايف ويندوز عبر Docker Desktop مش بتبعت الإشعارات دي. polling معناها الأداة تبص على الملفات بنفسها كل شوية. بيشتغل، بس بياكل معالج على المشروع الكبير. [[WATCHPACK_POLLING]] بيقرأه Next (webpack)، و [[CHOKIDAR_USEPOLLING]] بيقرأه أدوات مبنية على chokidar. Vite الأضمن فيه [[server.watch.usePolling: true]] في vite.config.

الحل الأحسن من polling: حط المشروع جوه نظام ملفات WSL مش على C:، فالإشعارات تشتغل والسرعة أعلى بكتير (تاب WSL، درس «فين تحط المشروع»).

[[.:/app]] بيغطّي /app كله بفولدرك. [[/app/node_modules]] volume مجهول على المسار ده بس، فبيفضل فيه node_modules اللي اتسطّبت للينكس في الـ image. نفس الفكرة لـ [[/app/.next]] عشان كاش ويندوز ولينكس ميتلخبطوش.

الفخ: compose بيعيد استخدام الـ volumes المجهولة من الـ container القديم. تضيف مكتبة وتعمل build، الـ image فيها المكتبة، بس الـ volume لسه بـ node_modules القديمة. [[-V]] (اختصار [[--renew-anon-volumes]]) بيعمل volumes مجهولة جديدة، فتتملي من الـ image الجديدة.`,
            when: "Next أو Vite أو nodemon جوه Docker Desktop على ويندوز، والمشروع على درايف ويندوز.",
            mistakes: R`في مشروع حقيقي ضفنا مكتبة وعملنا [[up --build]]، والتطبيق فضل يقول Module not found، لأن الـ volume المجهول كان شايل node_modules القديمة. [[-V]] حلّها. وكمان [[COPY . .]] في Dockerfile.dev ملوش لازمة مع الـ bind mount لأنه بيتغطّى عليه. و [[container_name]] ثابت في compose التطوير بيمنعك تشغّل نسختين.`
          },
          teach: R`## ٣ مشاكل في ملف واحد

1. بتحفظ الملف ومفيش reload: إشعارات «الملف اتغير» مش بتعدّي من درايف ويندوز لجوه الـ container.
2. فولدر [[node_modules]] بتاع جهازك بيغطّي على اللي اتسطّب للينكس جوه الصورة.
3. بتضيف مكتبة وتبني، والـ container لسه مش شايفها.

الملف فيه حل التلاتة. جربت كل حاجة على Docker Desktop ويندوز 11، بمشروع Node صغير على درايف D.

---

## المثال سطر سطر

| السطر | معناه |
|---|---|
| [[services:]] / [[web:]] | الخدمات، وخدمة اسمها web |
| [[build: { context: ., dockerfile: Dockerfile.dev }]] | ابني من الفولدر ده، بس بملف اسمه [[Dockerfile.dev]] بدل [[Dockerfile]] |
| [[ports: ["3002:3000"] ]] | 3002 على جهازك لـ 3000 جوه |
| [[- .:/app]] | bind mount: الفولدر الحالي على [[/app]] |
| [[- /app/node_modules]] | volume **مجهول** (من غير اسم) على المسار ده بس |
| [[- /app/.next]] | ونفس الحكاية لكاش Next |
| [[WATCHPACK_POLLING=true]] | Next (webpack) يعمل polling |
| [[CHOKIDAR_USEPOLLING=true]] | الأدوات المبنية على مكتبة chokidar (زي nodemon) تعمل polling |

### يعني إيه polling؟

عادةً البرنامج بيقول للينكس «صحّيني لما ملف يتغير» (اسمها inotify). الـ polling إن البرنامج بنفسه يبص على الملفات كل شوية ويقارن. أبطأ وبياكل CPU، بس بيشتغل لما الإشعارات مش جاية.

### ليه [[/app/node_modules]] لوحده بيحمي؟

[[.:/app]] بيغطّي [[/app]] كله بفولدرك. لما تضيف ربط تاني على مسار **أعمق** ([[/app/node_modules]])، الأعمق بيكسب في المكان ده. فجوه الـ container: [[/app]] من جهازك، إلا [[node_modules]] من الـ volume المجهول، واللي اتملى من الصورة أول مرة.

---

## جربت المشكلة الأولى

مشروع بـ nodemon، مربوط [[.:/app]] من درايف D، من غير polling. عدّلت [[server.js]]:

~~~bash
sed -i 's/dev v2/dev v3/' server.js
~~~

الملف اتغير جوه الـ container (شفته بـ [[grep]])، بس nodemon ماتحركش واللوج فضل ساكت. ضفت [[CHOKIDAR_USEPOLLING: "true"]] وعملت **restart** الأول:

~~~text الناتج
CHOKIDAR=
~~~

المتغير مش موجود: [[restart]] بيشغّل نفس الـ container بنفس إعداداته القديمة. بعد [[docker compose up -d]] (اللي عمل [[Recreate]]) وتعديل تاني:

~~~text الناتج
CHOKIDAR=true
[nodemon] restarting due to changes...
[nodemon] starting $__btnode server.js$__bt
~~~

---

## جربت المشكلة التالتة ([[-V]])

ضفت مكتبة [[dayjs]] لـ package.json وعملت [[up -d --build]]:

~~~text الناتج
Error: Cannot find module 'dayjs'
~~~

الصورة الجديدة فيها المكتبة، بس compose رجّع نفس الـ volume المجهول القديم على [[node_modules]]، واللي فيه النسخة القديمة. وبعد:

~~~bash
docker compose up -d --build -V
~~~

~~~text الناتج
dayjs found
~~~

[[-V]] اختصار [[--renew-anon-volumes]]: اعمل volumes مجهولة جديدة، فتتملي من الصورة الجديدة.

---

## الخلاصة

| المشكلة | الحل |
|---|---|
| مفيش reload | [[WATCHPACK_POLLING]] أو [[CHOKIDAR_USEPOLLING]]، أو المشروع جوه WSL |
| node_modules ويندوز بتغطي | [[- /app/node_modules]] |
| مكتبة جديدة مش ظاهرة | [[up -d --build -V]] |
| المتغيرات الجديدة مش واصلة | [[up -d]] مش [[restart]] |`,
          lines: [
            "الخدمات.",
            "خدمة الويب.",
            "ابنيها من Dockerfile التطوير.",
            "بورت 3002 على جهازك لـ 3000 جوه.",
            "الـ volumes.",
            "الكود من جهازك لايف.",
            "volume مجهول يحمي node_modules بتاعة لينكس من التغطية.",
            "ونفس الحكاية لكاش Next.",
            "المتغيرات.",
            "Next يعمل polling بدل ما يستنى إشعارات مش جاية.",
            "ونفس الحكاية للأدوات المبنية على chokidar."
          ],
          sol: R`من غير سطور POLLING (والمشروع على درايف ويندوز زي [[C:]] أو [[/mnt/c]]): بتحفظ الملف ومفيش حاجة بتحصل، ولا [[docker compose logs -f web]] بيطبع [[Compiling]]. ده لأن أحداث تغيير الملفات مش بتعدّي من ويندوز لجوه VM بتاع Docker.

بعد ما تضيفهم و [[docker compose up -d]] (بيعمل recreate للـ container لأن environment اتغير): أي حفظ بيطلّع في اللوج [[○ Compiling /page ...]] أو [[✓ Compiled]] والصفحة بتتحدث في ثانية أو اتنين.

لو المشروع جوه فايلات WSL نفسها ([[~/projects]] مش [[/mnt/c]]) غالبًا هيشتغل من غير polling وأسرع بكتير، ودي الطريقة الأحسن. الغلط الشائع: تعمل [[docker compose restart]] بعد إضافة المتغيرات، و restart مش بيقرا environment جديد؛ لازم [[up -d]].`
        },
        {
          cmd: "البورت متاخد",
          title: "Postgres في Docker و Postgres على جهازك مع بعض",
          desc: R`[[ports]] شكلها [[IP:بورت_الجهاز:بورت_الـcontainer]]. اللي على اليمين ثابت (اللي البرنامج بيسمع عليه جوه)، واللي على الشمال انت تختاره. لو 5432 متاخد على جهازك، خليها [[5433:5432]] واتصل على [[localhost:5433]]. والـ IP في الأول بيحدد مين يوصل: [[127.0.0.1]] يعني جهازك أو السيرفر نفسه بس.`,
          example: R`ports:
  - "127.0.0.1:5433:5432"
  - "127.0.0.1:3010:3000"
# من جهازك:          postgresql://myapp:secret@localhost:5433/myapp
# من container تاني:  postgresql://myapp:secret@db:5432/myapp`,
          try: "شغّل Postgres في compose على 5433، واتصل من جهازك بـ psql على 5433، وبعدين اعمل [[docker compose port db 5432]] وشوف هو فين.",
          flag: "script",
          deep: {
            why: R`[[bind: address already in use]] (برنامج على الجهاز ماسك البورت، غالبًا Postgres متسطّب) أو [[Bind for 0.0.0.0:5432 failed: port is already allocated]] (container تاني ماسكه، زي نسخة تانية من المشروع) على لينكس، أو [[ports are not available]] على ويندوز: في الحالتين فيه حاجة ماسكة البورت.`,
            how: R`البورت اللي على الشمال بتاع جهازك، وده اللي بيتخانق. غيّره بس، والـ container جوه ميعرفش حاجة.

والـ containers التانية على نفس الشبكة بتكلّم القاعدة على [[db:5432]]: بورت الـ container، مش بورت جهازك. البورت اللي على الشمال للي جاي من بره Docker بس.

[[127.0.0.1:]] في الأول: من غيرها البورت بيتفتح على كل كروت الشبكة. على لابتوبك ده معناه أي حد على نفس الواي فاي. وعلى السيرفر معناه النت كله، و Docker بيعدّي من ufw. [[127.0.0.1:3010:3000]] هو الشكل الصح لتطبيق ورا Nginx على نفس السيرفر.

مين ماسك البورت: [[docker ps --format "{{.Names}} {{.Ports}}"]] للـ containers، و [[ss -ltnp]] على لينكس. وعلى ويندوز فيه نطاقات بورتات بيحجزها Hyper-V لنفسه: [[netsh interface ipv4 show excludedportrange protocol=tcp]] بيوريك لو بورتك جوه واحد منهم.`,
            when: "قاعدة بيانات للتطوير جنب واحدة متسطّبة، ونسختين من نفس المشروع، وأي تطبيق ورا Nginx على السيرفر.",
            mistakes: R`في مشروع حقيقي Postgres كان [[5432:5432]] فبيتخانق مع Postgres متسطّب على ويندوز، وأحيانًا التطبيق يتصل بالقاعدة الغلط من غير ما يقول. وفي مشروع تاني على السيرفر، الباك إند كان [[5000:5000]]، و Postgres و Redis مفتوحين على 5433 و 6379، و Docker بيعدّي من ufw، فكانوا مكشوفين للنت و Redis من غير باسورد. وغلطة شائعة: [[localhost:5433]] في DATABASE_URL بتاع container، والصح [[db:5432]].`
          },
          teach: R`## شكل [[ports]] بالكامل

~~~text
"127.0.0.1:5433:5432"
 ─────────  ────  ────
 مين يوصل   بورت  بورت
            جهازك  جوه الـ container
~~~

- **اليمين** ثابت: البورت اللي البرنامج سامع عليه جوه (Postgres دايمًا 5432).
- **النص** انت بتختاره: ده اللي بيتخانق مع أي حاجة تانية على جهازك.
- **الشمال** اختياري: [[127.0.0.1]] يعني جهازك نفسه بس. من غيره البورت بيتفتح على كل كروت الشبكة.

---

## المثال سطر سطر

| السطر | معناه |
|---|---|
| [[ports:]] | البورتات |
| [[- "127.0.0.1:5433:5432"]] | Postgres: 5433 على جهازك بس، لـ 5432 جوه |
| [[- "127.0.0.1:3010:3000"]] | التطبيق: 3010 على السيرفر بس (Nginx على نفس السيرفر يوصله) |
| أول تعليق | من جهازك: رابط القاعدة على [[localhost:5433]] |
| تاني تعليق | من container تاني: [[db:5432]]، اسم الخدمة وبورت **جوه** |

### الرابط نفسه

[[postgresql://myapp:secret@localhost:5433/myapp]] بيتقري كده:

| الجزء | معناه |
|---|---|
| [[postgresql://]] | نوع الاتصال |
| [[myapp:secret]] | اليوزر والباسورد |
| [[@localhost:5433]] | الجهاز والبورت |
| [[/myapp]] | اسم القاعدة |

---

## الخناقة حصلت فعلًا وانا بجرّب

كان فيه container تاني على الجهاز ماسك 5433. أول ما شغّلت:

~~~text الناتج
Bind for 127.0.0.1:5433 failed: port is already allocated
~~~

مين ماسكه؟

~~~bash
docker ps --format "{{.Names}} {{.Ports}}"
~~~

~~~text الناتج (جزء)
dk01-db 127.0.0.1:5433->5432/tcp
~~~

[[--format]] بيطبع الأعمدة اللي تطلبها بس، و [[{{.Names}}]] و [[{{.Ports}}]] أسماء الخانات. غيّرت الشمال لـ 5439 بس:

~~~text الناتج
docker compose port db 5432   →   127.0.0.1:5439
dk02-ports-db-1 127.0.0.1:5439->5432/tcp
~~~

[[docker compose port db 5432]] معناها «بورت 5432 بتاع خدمة db متوصّل بإيه على جهازي؟».

### على ويندوز: مين ماسك البورت؟

~~~powershell
Get-NetTCPConnection -LocalPort 5432,5439 -State Listen | Select-Object LocalAddress,LocalPort,OwningProcess
~~~

~~~text الناتج
LocalAddress LocalPort OwningProcess Name
------------ --------- ------------- ----
::1               5432         38420 wslrelay
::                5432          6424 com.docker.backend
127.0.0.1         5439          6424 com.docker.backend
~~~

[[com.docker.backend]] معناها Docker Desktop هو اللي فاتح البورت لـ container. لو لقيت [[postgres]] يبقى Postgres متسطّب على الجهاز.

و Hyper-V على ويندوز بيحجز نطاقات بورتات لنفسه:

~~~powershell
netsh interface ipv4 show excludedportrange protocol=tcp
~~~

~~~text الناتج (جزء)
Start Port    End Port
----------    --------
     50000       50059     *
     54226       54325
~~~

لو بورتك جوه نطاق منهم، Docker هيقول [[ports are not available]] حتى لو محدش شايفه.

---

## الخلاصة

~~~text
"IP:HOST:CONTAINER"     غيّر HOST بس لو فيه خناقة
127.0.0.1:              محدش من بره يوصل
من جهازك                localhost:HOST
من container تاني       اسم_الخدمة:CONTAINER
~~~`,
          lines: [
            "البورتات.",
            "Postgres: 5433 على جهازك بس، لـ 5432 جوه.",
            "التطبيق: 3010 على السيرفر بس (Nginx يوصله)، لـ 3000 جوه."
          ],
          sol: R`[[psql -h localhost -p 5433 -U myapp myapp]] من جهازك بيدخلك Postgres اللي في Docker، و [[select version();]] هيوري نسخة الـ image. و [[docker compose port db 5432]] بيطبع [[127.0.0.1:5433]].

يعني البورت 5432 جوه الـ container (وده اللي الـ containers التانية بتستخدمه بـ [[db:5432]])، و 5433 على جهازك بس. و Postgres بتاع جهازك لسه على 5432 ومحدش اتخانق.

الغلط الشائع: [[psql -p 5433]] من غير [[-h localhost]] على لينكس بيحاول socket محلي ويقول [[No such file or directory]]، لأن من غير host بيروح لـ Postgres الجهاز. ولو [[connection refused]] اتأكد إنك كتبت [[5433:5432]] مش [[5432:5433]]: الشمال جهازك واليمين جوه.`
        },
        {
          cmd: "docker compose ولا docker-compose",
          title: "الأمر بالشرطة ولا بالمسافة",
          desc: R`[[docker-compose]] بالشرطة النسخة القديمة (v1) واتوقفت. [[docker compose]] بمسافة هي الجديدة (v2): plugin جوه docker نفسه، بتيجي مع Docker Desktop ومع سكربت التسطيب الرسمي، وفيها حاجات مش في القديمة زي [[--wait]] و [[watch]]. استخدم المسافة دايمًا. ولو سكربت لازم يشتغل على سيرفرات قديمة، خليه يكتشف الموجود.`,
          example: R`docker compose version
if docker compose version >/dev/null 2>&1; then DC="docker compose"
elif command -v docker-compose >/dev/null; then DC="docker-compose"
else echo "Compose مش متسطّب"; exit 1; fi
$DC up -d --build`,
          try: "على السيرفر اكتب الأمرين [[docker-compose version]] و [[docker compose version]] وشوف أنهي موجود. لو القديم بس، سطّب [[docker-compose-plugin]].",
          flag: "script",
          deep: {
            why: "شروحات ومشاريع قديمة كتير لسه بالشرطة. على سيرفر جديد مش هتلاقيها، وعلى سيرفر قديم ممكن تلاقي الاتنين بسلوك مختلف.",
            how: R`v1 كان برنامج منفصل مكتوب بـ Python. v2 اتكتب من جديد بـ Go وبقى جزء من أمر docker. الملف نفسه (compose.yml) بيشتغل مع الاتنين في الغالب.

فرق بيكسر سكربتات: أسماء الـ containers. v1 بيعمل [[myapp_web_1]] و v2 بيعمل [[myapp-web-1]]. أي سكربت فيه اسم container مكتوب بإيده هيتكسر لما تنقل.

السكربت بيجرّب الجديد الأول، ولو مش موجود يدوّر على القديم، ويحط الأمر في متغير [[DC]]، وباقي السكربت يستخدم [[$DC]]. من غير علامات تنصيص عشان الشيل يقسمه لكلمتين.

التسطيب: [[docker-compose-plugin]] من repo بتاع Docker (بيجي مع سكربت get.docker.com)، أو [[docker-compose-v2]] من repo أوبونتو.`,
            when: "أي سكربت ديبلوي أو README. واكتب [[docker compose]] في كل حاجة جديدة.",
            mistakes: R`في مشروع حقيقي سكربت الديبلوي كان بيستخدم docker-compose القديم، وسكربت تاني بيعمل [[docker rmi]] لأسماء صور مكتوبة بإيدك مش مطابقة للأسماء اللي compose بيعملها، فالمسح عمره ما حصل فعلًا والسكربت بيقول تمام. وسكربت PowerShell على ويندوز كان بيستخدم الشرطة وبيفشل على جهاز جديد.`
          },
          teach: R`## نسختين من نفس الأداة

| | [[docker-compose]] | [[docker compose]] |
|---|---|---|
| النسخة | v1 | v2 وما بعدها |
| مكتوبة بـ | Python | Go |
| شكلها | برنامج لوحده | plugin جوه أمر docker |
| أسماء الـ containers | [[myapp_web_1]] | [[myapp-web-1]] |
| الحالة | متوقفة | الحالية |

---

## السطر الأول: [[docker compose version]]

~~~text الناتج على Docker Desktop
Docker Compose version v5.3.0
~~~

> ملاحظة من التجربة: Docker Desktop على ويندوز بيحط برضه برنامج اسمه [[docker-compose]]، بس ده نفس النسخة الجديدة متغلّفة عشان السكربتات القديمة: [[docker-compose version]] طبع نفس [[v5.3.0]]. على سيرفر لينكس جديد غالبًا الشكل بالشرطة مش موجود خالص.

---

## السكربت: يكتشف الموجود

~~~bash
if docker compose version >/dev/null 2>&1; then DC="docker compose"
elif command -v docker-compose >/dev/null; then DC="docker-compose"
else echo "Compose مش متسطّب"; exit 1; fi
$DC up -d --build
~~~

### [[if docker compose version >/dev/null 2>&1; then]]

- [[if أمر; then]]: الشيل بيشغّل الأمر، ولو خرج بـ 0 (نجح) ينفّذ اللي بعد [[then]].
- [[>/dev/null]]: ارمي الناتج العادي. [[/dev/null]] «سلة زبالة» بتبلع أي حاجة.
- [[2>&1]]: والأخطاء (رقم 2) ابعتها لنفس مكان الناتج العادي (رقم 1)، يعني برضه الزبالة.

جربت الـ exit code:

~~~text الناتج
docker compose version   →  status=0
docker composee version  →  status=1   (أمر غلط)
~~~

### [[DC="docker compose"]]

خزّن الأمر في متغير اسمه [[DC]].

### [[elif command -v docker-compose >/dev/null; then]]

[[elif]] = else if. و [[command -v]] بيدوّر على البرنامج في الـ PATH: لو لقاه يطبع مكانه ويخرج بـ 0. عندي طبع [[/c/Program Files/Docker/Docker/resources/bin/docker-compose]].

### [[else echo "..."; exit 1; fi]]

لو ولا واحد: اطبع رسالة واخرج بـ 1 (فشل). و [[fi]] هي [[if]] بالمقلوب، يعني نهاية الـ if.

### [[$DC up -d --build]]

من **غير** علامات تنصيص عشان الشيل يقسم [[docker compose]] لكلمتين. جربت بالعلامات:

~~~text الناتج
"$DC" version   →   docker compose: command not found
~~~

الشيل دوّر على برنامج اسمه بالحرف «docker compose» بالمسافة، ومفيش.

وجوه أوبونتو 24.04 خام (مفيهاش Docker) الاتنين قالوا [[command not found]] بـ exit 127، فالسكربت كان هيطبع الرسالة ويقف.

---

## الخلاصة

~~~text
docker compose        اكتبها كده في أي حاجة جديدة
docker-compose        قديمة؛ اكتشفها بس في سكربتات لازم تشتغل على سيرفرات قديمة
$DC من غير ""         عشان الأمر يتقسم لكلمتين
~~~`,
          lines: [
            "النسخة الجديدة موجودة؟",
            "لو الجديدة شغالة استخدمها...",
            "...ولو لأ، دوّر على القديمة...",
            "...ولو ولا واحدة، وقّف برسالة.",
            "باقي السكربت يستخدم المتغير."
          ],
          sol: R`على أي سيرفر Docker حديث [[docker compose version]] بيطبع [[Docker Compose version v2.x]] أو أحدث (عندي [[v5.3.0]]). و [[docker-compose version]] على سيرفر لينكس جديد غالبًا بيطبع [[command not found]]، إلا لو حد مسطّب النسخة القديمة v1 (بتطبع [[docker-compose version 1.29.x]]) أو الـ binary المنفصل. وعلى Docker Desktop ويندوز [[docker-compose]] موجود بس هو نفس النسخة الجديدة (طبع [[v5.3.0]] عندي).

لو [[docker compose]] قال [[docker: 'compose' is not a docker command]]: سطّب [[sudo apt install docker-compose-plugin]] (من repo بتاع Docker)، وجرّب تاني.

الغلط الشائع: تفضل على v1 القديمة. هي متوقفة من ٢٠٢٣ ومش بتفهم حاجات زي [[depends_on.condition]] الجديدة ولا [[develop.watch]]، وأسماء الـ containers فيها بشرطة سفلية بدل الشرطة، فالسكربتات تتلخبط.`
        },
        {
          cmd: "-f و -p",
          title: "نسختين من نفس المشروع على جهاز واحد",
          desc: R`[[-p]] بيدّي المشروع اسم تاني، فالـ containers والشبكة والـ volumes كلها تتعمل باسم جديد ومتلمسش النسخة الأولى. و [[-f]] أكتر من مرة بيدمج الملفات بالترتيب: الأساسي، وفوقه ملف صغير فيه الاختلافات بس (البورتات مثلًا). كده مش محتاج تنسخ الـ compose كله.`,
          example: R`docker compose -p myapp2 -f compose.yml -f compose.second.yml up -d
docker compose -p myapp2 ps
docker compose -p myapp2 -f compose.yml -f compose.second.yml config
docker compose -p myapp2 down`,
          try: "شغّل مشروعك مرتين، مرة عادي ومرة بـ [[-p myapp2]] وملف بورتات مختلفة، وافتح الاتنين في المتصفح.",
          deep: {
            why: "عايز تشغّل نسخة تانية (فرع تاني، أو عميل تاني) من غير ما توقف الأولى. من غير -p، compose يفتكرها نفس المشروع ويبدّل الـ containers.",
            how: R`اسم المشروع بيتحط قدام كل حاجة: [[myapp2-web-1]]، و [[myapp2_default]]، و [[myapp2_pgdata]]. فالنسختين معزولين حتى في البيانات.

[[compose.second.yml]] فيه البورتات الجديدة بس، مثلًا [[3001:3000]] و [[5174:5173]]. خد بالك: في الدمج، الـ ports بتتضاف مش بتتستبدل، فلو الأساسي فيه [[3000:3000]] هتلاقي الاتنين والنسخة التانية تتخانق. الحل تكتب [[ports: !override]] في الملف التاني (compose 2.24 وأحدث)، أو تشيل البورتات من الأساسي خالص.

[[config]] بعد الدمج بيوريك النتيجة الحقيقية قبل ما تشغّل.

وعشان متكتبش ده كل مرة: [[COMPOSE_PROJECT_NAME=myapp2]] و [[COMPOSE_FILE=compose.yml:compose.second.yml]] في .env جنب الملف (الفاصل ; على ويندوز).

[[container_name]] ثابت في الملف بيبوّظ ده كله: الاسم مش بياخد بادئة المشروع، فالنسخة التانية تتخانق مع الأولى.`,
            when: "نسختين لعميلين، أو staging جنب production على نفس السيرفر، أو تجربة فرع من غير ما توقف الشغال.",
            mistakes: R`في مشروع حقيقي النسخة التانية كانت ملف compose كامل منسوخ، بأسماء containers وبورتات وشبكة مختلفة، ومع الوقت الملفين بعدوا عن بعض. وكان فيه [[image: myapp2-frontend:dev]] من غير build، فعلى جهاز جديد بيفشل لحد ما حد يبني الصورة بإيده. والأسوأ: تنسى [[-p]] في أمر down فتقفل النسخة الأولى.`
          },
          teach: R`## حاجتين بيعملوا نسخة تانية

- [[-p]] (project name): اسم المشروع. كل حاجة compose بيعملها بتاخده بادئة: containers وشبكة و volumes. اسم تاني = مشروع تاني خالص.
- [[-f]] (file): الملف. لو كتبته أكتر من مرة، compose بيدمج الملفات بالترتيب، اللي بعد فوق اللي قبل.

---

## السطر الأول

~~~bash
docker compose -p myapp2 -f compose.yml -f compose.second.yml up -d
~~~

اقرا [[compose.yml]]، وادمج فوقه [[compose.second.yml]]، وشغّل الناتج كمشروع اسمه [[myapp2]].

جربته بملف أساسي فيه nginx على [[127.0.0.1:8094:80]]، والنسخة الأولى شغالة باسم [[dk02-fp1]]، وملف تاني فيه [[127.0.0.1:8095:80]] بس. النسخة التانية وقعت:

~~~text الناتج
Bind for 127.0.0.1:8094 failed: port is already allocated
~~~

ليه؟ السطر التالت هيوضح.

---

## السطر التالت: [[config]]

~~~bash
docker compose -p myapp2 -f compose.yml -f compose.second.yml config
~~~

[[config]] بيطبع الملف النهائي بعد الدمج من غير ما يشغّل حاجة:

~~~text الناتج (جزء ports)
    ports:
      - host_ip: 127.0.0.1
        target: 80
        published: "8094"
      - host_ip: 127.0.0.1
        target: 80
        published: "8095"
~~~

الـ ports **اتضافت** مش اتبدلت. فالنسخة التانية بتحاول تاخد 8094 كمان. الحل [[!override]] في الملف التاني:

~~~text compose.second.yml
services:
  web:
    ports: !override ["127.0.0.1:8095:80"]
~~~

[[!override]] بتقول لـ compose «استبدل القايمة دي بالكامل». بعدها [[config]] طلع فيه 8095 بس، والنسخة قامت:

~~~text الناتج
dk02-fp2-web-1 127.0.0.1:8095->80/tcp
dk02-fp1-web-1 127.0.0.1:8094->80/tcp
~~~

---

## السطر التاني: [[docker compose -p myapp2 ps]]

[[ps]] مع [[-p]] بيوري containers المشروع ده بس. مش محتاج [[-f]] هنا، لأن compose بيلاقي containers المشروع من الـ labels اللي حطها عليها.

---

## السطر الرابع: [[docker compose -p myapp2 down]]

~~~text الناتج
 Container dk02-fp2-web-1 Removed
 Network dk02-fp2_default Removed
~~~

وبعدها النسخة الأولى لسه [[Up]]. لو نسيت [[-p]]، compose كان هيستخدم اسم الفولدر ويقفل النسخة الأصلية.

---

## الخلاصة

| | من غير [[-p]] | بـ [[-p myapp2]] |
|---|---|---|
| container | [[myapp-web-1]] | [[myapp2-web-1]] |
| شبكة | [[myapp_default]] | [[myapp2_default]] |
| volume | [[myapp_pgdata]] | [[myapp2_pgdata]] |

~~~text
-f a.yml -f b.yml     b فوق a، والقوايم (ports) بتتجمع
!override             استبدل بدل ما تجمع
config                شوف الناتج قبل ما تشغّل
-p في down            عشان متقفلش النسخة الغلط
~~~`,
          lines: [
            "شغّل نسخة باسم myapp2، من الملف الأساسي ودمج ملف الاختلافات فوقه.",
            "حالة النسخة التانية بس.",
            "شوف الملف النهائي بعد الدمج.",
            "اقفل النسخة التانية بس (الـ -p مهمة هنا)."
          ],
          sol: R`[[docker compose -p myapp2 ps]] بيوري containers أساميها بتبدأ بـ [[myapp2-]] (زي [[myapp2-web-1]])، و [[docker compose ps]] العادي بيوري بتاعة المشروع الأصلي بس. الاتنين بيفتحوا في المتصفح على البورتين المختلفين، ولكل واحد volumes وشبكة خاصة بيه.

و [[config]] بيوريك الـ ports النهائية بعد الدمج. خلّي بالك: الـ [[ports]] في الملف التاني بتتضاف على اللي في الأول مش بتحل محلها، فلو الأول فيه [[8080:80]] النسخة التانية هتحاول تاخده برضه وتفشل بـ [[port is already allocated]]. الحل تحط البورت في [[.env]] كمتغير، أو تكتب [[ports: !override ["8081:80"]]] في الملف التاني (جربتها وكل نسخة طلعت على بورتها).

الغلط الشائع: تنسى [[-p myapp2]] في [[down]]، فتقفل النسخة الأصلية بدل التانية.`,
          solCode: R`printf 'services:\n  web:\n    ports: !override ["127.0.0.1:8081:80"]\n' > compose.second.yml
docker compose up -d
docker compose -p myapp2 -f compose.yml -f compose.second.yml up -d
docker compose -p myapp2 ps
docker compose -p myapp2 down`
        },
        {
          cmd: "التعديل مش ظاهر",
          title: "قبل ما تمسح كل حاجة وتبني من الصفر",
          desc: R`لما التعديل مش ظاهر، الإغراء إنك توقف كل حاجة وتمسح الصور وتعمل [[system prune]] وتبني [[--no-cache]]. ده بطيء وخطر، ونادرًا ما يكون هو الحل. اسأل الأول: الـ container اتعمل من image جديدة؟ التعديل موجود جواه؟ ولا المتصفح أو Nginx شايل نسخة قديمة؟

[[restart]] مش بيقرا أي تعديل. [[up -d]] بيقرا تعديلات compose.yml. [[up -d --build]] بيبني من الكود الجديد.`,
          example: R`docker compose up -d --build web
docker compose images web
docker compose exec web ls -la /usr/share/nginx/html/assets
docker compose up -d --force-recreate web
docker compose --progress=plain build --no-cache web`,
          try: "غيّر نص في صفحة، وابني، وقبل ما تفتح المتصفح ادخل الـ container ودوّر على النص بـ [[grep -r]]. لو موجود والمتصفح مش شايفه، المشكلة كاش.",
          deep: {
            why: "«امسح وابني من الصفر» بياخد ربع ساعة، وبيوقع الموقع طول الوقت ده، وممكن يمسح حاجات مش تبع المشروع، وفي الآخر غالبًا المشكلة كانت كاش المتصفح.",
            how: R`اقسم المشكلة نصين:

هل التعديل وصل للـ container؟ [[images]] بيوريك الـ image اتعملت إمتى. و [[exec]] تدخل وتدوّر على التعديل في الملفات. لو موجود، Docker عمل شغله، والمشكلة بعده: كاش المتصفح ([[Ctrl+F5]])، أو index.html بيتكيّش في Nginx، أو CDN، أو service worker قديم.

لو مش موجود: الـ build مخدش التعديل. [[--progress=plain]] بيطبع كل خطوة بكل الـ output، ومكتوب قدام كل واحدة CACHED ولا لأ، فتعرف أنهي خطوة المفروض تتعاد ومتعادتش. أسباب شائعة: الفولدر متشال في .dockerignore، أو COPY لمسار غلط، أو الكود بيتجاب بـ git clone جوه RUN فالكاش مش شايف إنه اتغير.

[[--force-recreate]] بيعيد إنشاء الـ container حتى لو الإعدادات متغيرتش، مفيد لو فولدر مربوط اتعمل بعد ما الـ container قام، أو env file اتعدّل.

و [[--no-cache]] آخر حل، ولخدمة واحدة بس.`,
            when: "«عملت deploy ومفيش حاجة اتغيرت». قبل أي سكربت «إصلاح» بيمسح.",
            mistakes: R`في مشروع حقيقي كان فيه سكربت «إصلاح» بيعمل down، ويمسح صور بأسماء مكتوبة بإيدك (اتغيرت مع الوقت فبقى مش بيمسح حاجة)، و [[docker system prune -f]] (بيمسح أي container واقف على السيرفر حتى لو مش تبع المشروع)، و [[build --no-cache]] من غير [[set -e]]، فلو البناء فشل بيكمل ويشغّل اللي موجود. والسبب الحقيقي غالبًا كان كاش المتصفح أو Nginx. البديل الأنضف لو محتاج فعلًا تمسح صور المشروع: [[docker compose down --rmi local]].`
          },
          teach: R`## اسأل ٣ أسئلة بالترتيب

1. الـ container اتعمل من **صورة جديدة**؟
2. التعديل **موجود جوه** الـ container؟
3. لو موجود: مين شايل نسخة قديمة بعد Docker (متصفح، Nginx، CDN)؟

جربت كل سطر على مشروع صغير: صورة nginx بتنسخ فولدر [[dist]] جواها، والصفحة فيها [[old text]] وغيّرتها لـ [[new text]].

---

## الأول: ليه [[restart]] مش كفاية

~~~bash
docker compose restart web
curl -s localhost:8096
~~~

~~~text الناتج
<h1>old text</h1>
~~~

[[restart]] بيوقف ويشغّل **نفس** الـ container من **نفس** الصورة. الملف الجديد على جهازك والصورة لسه القديمة.

---

## ١. [[docker compose up -d --build web]]

[[--build]] ابني الصورة الأول، و [[web]] في الآخر يعني الخدمة دي بس.

~~~text الناتج
 Image dk02-stale-web Built
 Container dk02-stale-web-1 Recreate
 Container dk02-stale-web-1 Recreated
 Container dk02-stale-web-1 Started
~~~

[[Recreate]] هي الكلمة اللي تدوّر عليها: container جديد من الصورة الجديدة. والـ curl بعدها طبع [[new text]].

## ٢. [[docker compose images web]]

~~~text الناتج
CONTAINER           REPOSITORY          TAG       IMAGE ID       SIZE      CREATED
dk02-stale-web-1    dk02-stale-web      latest    0b118f94a184   26.3MB    3 seconds ago
~~~

[[CREATED]] بيجاوب السؤال الأول: الصورة اللي شغالة اتعملت إمتى؟ لو من ساعة وانت لسه بانيها، يبقى الـ container مااتعملهوش recreate.

## ٣. [[docker compose exec web ls -la /usr/share/nginx/html/assets]]

ادخل وشوف الملفات بعينك. [[-l]] تفاصيل (الحجم والتاريخ)، و [[-a]] حتى المخفي.

~~~text الناتج
-rwxr-xr-x    1 root     root            18 Oct  6 12:03 app.js
~~~

وأحسن منها تدوّر على النص نفسه:

~~~bash
docker compose exec web grep -rl "new text" /usr/share/nginx/html
~~~

~~~text الناتج
/usr/share/nginx/html/index.html
~~~

[[grep -r]] دوّر في الفولدر وكل اللي جواه، و [[-l]] اطبع أسامي الملفات بس. لو طلع اسم ملف، التعديل وصل والمشكلة بعد Docker.

> من Git Bash على ويندوز السطر ده فشل الأول بـ [[ls: C:/Program Files/Git/usr/share/...]]: Git Bash حوّل المسار. [[export MSYS_NO_PATHCONV=1]] قبلها حلّتها.

## ٤. [[docker compose up -d --force-recreate web]]

اعمل container جديد حتى لو compose شايف إن مفيش حاجة اتغيرت. من غيرها [[up -d]] قال [[Running]] وسابه:

~~~text الناتج
 Container dk02-stale-web-1 Recreated
 Container dk02-stale-web-1 Started
~~~

## ٥. [[docker compose --progress=plain build --no-cache web]]

| الجزء | معناه |
|---|---|
| [[--progress=plain]] | اطبع كل خطوة بكل الناتج، بدل الشاشة المختصرة |
| [[build]] | ابني بس من غير تشغيل |
| [[--no-cache]] | متستخدمش أي خطوة محفوظة |

ده build عادي (بكاش) بعد ما مفيش حاجة اتغيرت:

~~~text الناتج
#7 [2/2] COPY dist/ /usr/share/nginx/html/
#7 CACHED
~~~

ونفس الخطوة مع [[--no-cache]]:

~~~text الناتج
#7 [2/2] COPY dist/ /usr/share/nginx/html/
#7 DONE 0.1s
~~~

[[CACHED]] معناها Docker استخدم النتيجة القديمة. لو خطوة الـ COPY بتقول CACHED وانت متأكد إنك عدّلت، يبقى الملف اللي عدّلته مش داخل الـ build أصلًا (غالبًا [[.dockerignore]]).

---

## الخلاصة

| الأمر | بيقرا تعديل compose.yml | بيقرا تعديل الكود |
|---|---|---|
| [[restart]] | لأ | لأ |
| [[up -d]] | أيوه | لأ |
| [[up -d --build]] | أيوه | أيوه |
| [[--force-recreate]] | container جديد غصب | لأ (إلا مع --build) |
| [[build --no-cache]] | آخر حل | كل الخطوات من الأول |`,
          lines: [
            "ابني من الكود الجديد وشغّل.",
            "الـ image اللي شغالة اتعملت إمتى.",
            "التعديل موجود جوه الـ container فعلًا؟",
            "أعد إنشاء الـ container حتى لو مفيش تغيير في الإعدادات.",
            "آخر حل: ابني من غير كاش، والـ output كامل عشان تشوف أنهي خطوة."
          ],
          sol: R`[[docker compose exec web grep -rl "النص الجديد" /usr/share/nginx/html]] (أو المسار اللي فيه الـ build) بيطبع اسم ملف زي [[/usr/share/nginx/html/assets/index-B2x9.js]] لو التعديل وصل. ساعتها المشكلة في المتصفح أو CDN: Ctrl+Shift+R أو افتح incognito.

لو الـ grep مطلّعش حاجة، يبقى الـ image القديمة لسه شغالة. قارن [[docker compose images web]] (الـ ID والوقت) بـ آخر build، وشوف هل الـ container اتعمله recreate فعلًا. [[up -d --force-recreate]] بيحل ده، ولو لسه، [[--no-cache]] مع [[--progress=plain]] يوريك خطوة الـ COPY نسخت إيه.

الغلط الشائع: النص مكتوب في ملف [[.env]] أو متغير [[VITE_]] ومتغيرات Vite بتتحط وقت البناء. أو الـ [[.dockerignore]] مستبعد الفولدر اللي عدّلته.`
        }
      ]
    }
]);
