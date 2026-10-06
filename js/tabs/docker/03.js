// تكملة تاب docker: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/docker/01.js (شرح حقول الدرس في أوله)
MORE("docker", [
    {
      t: "Volumes و Networks",
      l: 2,
      n: "البيانات لازم تعيش بره الـ container، والـ containers بتكلّم بعض بالاسم",
      items: [
        {
          cmd: "volumes",
          title: "البيانات اللي متتمسحش",
          desc: "أي ملف بيتكتب جوه الـ container بيروح لما يتمسح. الـ volume مساحة Docker بيديرها بتفضل موجودة. قاعدة البيانات لازم volume، وإلا أول [[docker rm]] يمسح كل البيانات.",
          example: R`docker volume create pgdata
docker run -d --name db -v pgdata:/var/lib/postgresql/data -e POSTGRES_PASSWORD=secret postgres:16
docker volume ls
docker volume inspect pgdata
docker rm -f db && docker run -d --name db -v pgdata:/var/lib/postgresql/data -e POSTGRES_PASSWORD=secret postgres:16`,
          try: "اعمل جدول في db، امسح الـ container وشغّله تاني بنفس الـ volume، وشوف الجدول لسه موجود.",
          deep: {
            why: "أول ما تعمل [[docker rm]] لـ container قاعدة البيانات، كل البيانات بتروح، لأنها كانت في طبقة الكتابة بتاعته. الـ volume بيخلي البيانات تعيش بره الـ container.",
            how: R`الـ volume فولدر Docker بيديره على السيرفر (تحت [[/var/lib/docker/volumes]])، وبتربطه بمسار جوه الـ container بـ [[-v اسم:مسار]]. أي حاجة التطبيق يكتبها في المسار ده بتتكتب في الـ volume.

الـ container يتمسح، الـ volume يفضل. تعمل container جديد بنفس الـ volume، يلاقي البيانات.

كل image قاعدة بيانات ليها مسار معروف: Postgres [[/var/lib/postgresql/data]] (لحد نسخة 17؛ من [[postgres:18]] اربط على [[/var/lib/postgresql]] والبيانات بتتحط في فولدر باسم النسخة، والترقية مش بتنقل البيانات لوحدها)، و MySQL [[/var/lib/mysql]]، و Redis [[/data]]. بتلاقيه في صفحة الـ image على Docker Hub.

ولو نسيت الـ volume، Postgres image بتعمل volume مجهول لوحدها (anonymous)، بس ده بيتمسح مع [[docker rm -v]] وصعب تلاقيه بعدين. الـ volume المسمى أوضح.

الـ volumes مش بتتمسح مع [[docker system prune]] العادي، ولا مع [[compose down]]. بس بتتمسح مع [[--volumes]] و [[down -v]]، فخد بالك من الحرف ده.`,
            when: "أي بيانات لازم تعيش: قاعدة بيانات، وملفات مرفوعة، وشهادات SSL.",
            mistakes: "[[docker compose down -v]] في الإنتاج. الـ v بتمسح قاعدة البيانات كلها. ومسار غلط للـ volume فالقاعدة بتكتب بره الـ volume وتضيع."
          },
          teach: R`## الفكرة في سطرين

الـ container ليه «طبقة كتابة» خاصة بيه، وأي ملف بيتكتب فيها بيتمسح مع [[docker rm]]. الـ **volume** مساحة تخزين Docker هو اللي بيعملها ويديرها بره أي container، وانت بتوصّلها بمسار جوه الـ container. الـ container يروح، الـ volume يفضل.

المثال فيه ٥ سطور، وهنمشي عليهم واحد واحد. جربتهم كلهم على Docker Desktop (ويندوز 11)، بأسامي تبدأ بـ [[dk02-]] عشان مايتخانقوش مع حاجة تانية على الجهاز، وبصورة [[postgres:16-alpine]] (نفس Postgres 16 بس أصغر). عندك اكتبهم زي ما هم في المثال.

---

## ١. [[docker volume create pgdata]]

| الجزء | معناه |
|---|---|
| [[docker volume]] | مجموعة أوامر الـ volumes |
| [[create]] | اعمل واحد جديد |
| [[pgdata]] | اسمه. انت اللي بتختاره (pg من Postgres و data بيانات) |

~~~text الناتج
pgdata
~~~

بيطبع الاسم بس، يعني اتعمل. لسه فاضي ومحدش بيستخدمه.

---

## ٢. [[docker run ... -v pgdata:/var/lib/postgresql/data ...]]

ده أطول سطر، نفكّه حتة حتة:

| الجزء | معناه |
|---|---|
| [[docker run]] | اعمل container جديد وشغّله |
| [[-d]] | detached: في الخلفية، ورجّعلي الترمنال |
| [[--name db]] | سمّيه db بدل اسم عشوائي، عشان نكلّمه بعدين بالاسم |
| [[-v pgdata:/var/lib/postgresql/data]] | الربط: الـ volume اللي اسمه [[pgdata]] يظهر جوه الـ container على المسار ده |
| [[-e POSTGRES_PASSWORD=secret]] | متغير بيئة. صورة Postgres مش بتقوم من غير باسورد |
| [[postgres:16]] | الصورة: Postgres نسخة 16 |

### ليه المسار ده بالذات؟

[[-v]] شكله [[اسم_الـvolume:مسار_جوه]]. النقطتين بتفصل بين الاتنين. والمسار اللي على اليمين مش اختيارك: ده المكان اللي Postgres بيكتب فيه بياناته جوه الصورة. لو ربطت مسار تاني، Postgres هيكتب في طبقة الـ container العادية والبيانات تضيع مع أول [[rm]]. كل صورة قاعدة بيانات بتكتب مسارها في صفحتها على Docker Hub.

بيطبع ID طويل للـ container. ولو بصيت في اللوج (بـ [[docker logs db]]) أول مرة هتلاقي سطور [[initdb]]: Postgres لقى الفولدر فاضي فعمل قاعدة جديدة.

---

## ٣. [[docker volume ls]]

[[ls]] اختصار list:

~~~text الناتج
DRIVER    VOLUME NAME
local     dk02-pgdata
~~~

| العمود | معناه |
|---|---|
| [[DRIVER]] | مين بيخزّنه. [[local]] يعني على ديسك الجهاز اللي عليه Docker |
| [[VOLUME NAME]] | اسمه |

---

## ٤. [[docker volume inspect pgdata]]

[[inspect]] بيطبع كل تفاصيل الـ volume بصيغة JSON:

~~~text الناتج
[
    {
        "CreatedAt": "2026-10-06T11:58:16Z",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/dk02-pgdata/_data",
        "Name": "dk02-pgdata",
        "Options": null,
        "Scope": "local"
    }
]
~~~

أهم سطر [[Mountpoint]]: ده المكان الحقيقي للبيانات على الماكينة اللي شغال عليها Docker. على سيرفر لينكس ده فولدر عادي تقدر تشوفه بـ [[sudo ls]]. على Docker Desktop (ويندوز أو ماك) المسار ده جوه الـ VM بتاعة Docker، مش على درايف C.

---

## ٥. امسح وابدأ من جديد

~~~bash
docker rm -f db && docker run -d --name db -v pgdata:/var/lib/postgresql/data -e POSTGRES_PASSWORD=secret postgres:16
~~~

- [[docker rm -f db]]: امسح الـ container. [[-f]] (force) يوقفه الأول لو شغال.
- [[&&]]: نفّذ اللي بعدي بس لو اللي قبلي نجح.
- وبعدها نفس أمر التشغيل بالظبط، بنفس [[-v pgdata:...]].

عشان نتأكد إن البيانات عاشت فعلًا، قبل المسح عملت جدول وحطيت فيه صف (الأوامر دي في الحل):

~~~bash
docker exec db psql -U postgres -c "create table t(x int); insert into t values(1);"
~~~

~~~text الناتج
CREATE TABLE
INSERT 0 1
~~~

وبعد المسح والتشغيل من جديد:

~~~bash
docker exec db psql -U postgres -c "select * from t"
~~~

~~~text الناتج
 x
---
 1
(1 row)
~~~

الجدول لسه موجود. ولوج الـ container الجديد بيقول السطر ده بدل [[initdb]]:

~~~text الناتج
PostgreSQL Database directory appears to contain a database; Skipping initialization
~~~

يعني Postgres لقى البيانات القديمة في الـ volume وكمّل عليها.

---

## الخلاصة

~~~text
docker volume create NAME       اعمل volume
-v NAME:/path/inside            اربطه بمسار البيانات جوه الـ container
docker volume ls / inspect      شوف الموجود وفين على الديسك
docker rm                       بيمسح الـ container بس، الـ volume بيفضل
~~~`,
          lines: [
            "اعمل volume اسمه pgdata.",
            "شغّل Postgres واربط الـ volume على مسار البيانات بتاعه.",
            "الـ volumes عندك.",
            "فين على الديسك.",
            "امسح الـ container وشغّل واحد جديد بنفس الـ volume: البيانات موجودة."
          ],
          sol: R`بعد ما تمسح الـ container وتعمل واحد جديد بنفس [[-v pgdata:/var/lib/postgresql/data]]، [[select * from t]] بيرجّع الصف اللي دخلته ([[1]] و [[(1 row)]]). ولوج Postgres التاني مش هيقول [[initdb]] تاني، هيقول [[Skipping initialization]] لأنه لقى البيانات.

[[docker volume inspect pgdata]] بيوري [[Mountpoint]] زي [[/var/lib/docker/volumes/pgdata/_data]]: البيانات عايشة هناك على الجهاز، مش جوه الـ container.

الغلط الشائع: الجدول اختفى. يبقى الاسم في [[-v]] اتكتب غلط (فاتعمل volume جديد فاضي)، أو المسار جوه الـ container غلط، أو استخدمت [[postgres:18]] اللي المسار المقترح فيها بقى [[/var/lib/postgresql]]. و [[psql: could not connect]] أول ثواني طبيعي: استنى الـ DB تقوم.`,
          solCode: R`docker volume create pgdata
docker run -d --name db -v pgdata:/var/lib/postgresql/data -e POSTGRES_PASSWORD=secret postgres:16-alpine
sleep 5
docker exec db psql -U postgres -c "create table t(x int); insert into t values(1);"
docker rm -f db
docker run -d --name db -v pgdata:/var/lib/postgresql/data -e POSTGRES_PASSWORD=secret postgres:16-alpine
sleep 3
docker exec db psql -U postgres -c "select * from t"`
        },
        {
          cmd: "bind mount",
          title: "فولدر من جهازك جوه الـ container",
          desc: R`الـ bind mount بيربط فولدر حقيقي من جهازك بمسار جوه الـ container، فالاتنين بيشوفوا نفس الملفات لايف: تعدّل على جهازك يظهر جوه فورًا من غير build، وده أساس الـ hot reload في التطوير. الفرق عن الـ volume إن الـ volume Docker هو اللي بيديره وبيخزنه في مكانه، أما هنا انت اللي بتحدد الفولدر.

الشكل [[-v مسار_عندك:مسار_جوه]]. [[$(pwd)]] بيطلّع المسار الكامل للفولدر الحالي، لأن [[-v]] محتاج مسار كامل مش نسبي. في الأول nginx بيعرض فولدر site بتاعك، و [[:ro]] (read only) بتمنع الـ container يكتب فيه. في التاني [[-it]] تفاعلي، و [[--rm]] امسح الـ container لما يخلص، و [[-w /app]] اشتغل من الفولدر ده، فبتشغّل [[npm test]] على كودك من غير ما يكون Node متسطب عندك.

على ويندوز مع WSL خلّي المشروع جوه ملفات لينكس مش [[/mnt/c]]، وإلا هيبقى بطيء جدًا.`,
          example: R`docker run -d -p 8080:80 -v $(pwd)/site:/usr/share/nginx/html:ro nginx:alpine
docker run -it --rm -v $(pwd):/app -w /app node:22-alpine npm test`,
          try: "اربط فولدر فيه index.html بـ nginx، وعدّل الملف من جهازك، واعمل ريفريش: التغيير ظهر من غير build.",
          deep: {
            why: "في التطوير مش هتعمل build بعد كل سطر بتعدّله. الـ bind mount بيخلي فولدر الكود على جهازك هو نفسه اللي جوه الـ container، فأي تعديل بيظهر فورًا.",
            how: R`الفرق عن الـ volume: الـ volume Docker بيديره ومش بتشوفه، أما الـ bind mount فولدر عادي على جهازك بتحدده بمساره الكامل. [[$(pwd)/site]] بيطلّع المسار الكامل للفولدر الحالي.

الـ container بيشوف الملفات لايف: تعدّل على جهازك، يشوف التعديل. وبالعكس: يكتب جوه، يظهر عندك. و [[:ro]] بيمنع الكتابة من جوه.

المثال التاني بيشغّل npm test من image node على كودك من غير ما تسطّب Node على جهازك أصلًا: [[-v $(pwd):/app]] الكود، و [[-w /app]] اشتغل من الفولدر ده.

على ويندوز مع WSL: الأداء بيبقى بطيء جدًا لو المشروع على [[/mnt/c]]. خلّي المشروع جوه نظام ملفات لينكس.`,
            when: "التطوير بس. في الإنتاج الكود جوه الـ image، مش من فولدر على السيرفر.",
            mistakes: "تربط المشروع كله وفيه node_modules متبني لويندوز، فالتطبيق جوه لينكس يقع. الحل في «dev و prod»: volume فاضي فوق node_modules."
          },
          teach: R`## الفرق في جملة

الـ volume مكان Docker بيختاره ويديره. الـ **bind mount** فولدر انت اللي بتحدده من جهازك، والـ container بيشوفه هو نفسه، مش نسخة منه. تعدّل ملف عندك، يتعدّل جوه في نفس اللحظة.

---

## السطر الأول: nginx بيعرض فولدر من جهازك

~~~bash
docker run -d -p 8080:80 -v $(pwd)/site:/usr/share/nginx/html:ro nginx:alpine
~~~

| الجزء | معناه |
|---|---|
| [[-d]] | في الخلفية |
| [[-p 8080:80]] | بورت 8080 على جهازك يروح لبورت 80 جوه (اللي nginx سامع عليه) |
| [[$(pwd)]] | اطبع الفولدر الحالي (pwd = print working directory) وحط الناتج هنا |
| [[/site]] | فولدر site جوه الفولدر الحالي |
| [[:/usr/share/nginx/html]] | المكان اللي nginx بيقرا منه الصفحات |
| [[:ro]] | read only: الـ container يقرا بس، مايكتبش |
| [[nginx:alpine]] | صورة nginx الصغيرة |

### ليه [[$(pwd)]] ومش [[./site]] بس؟

[[-v]] بيفرّق بين الاتنين بأول حرف: لو بدأ بـ [[/]] (أو حرف درايف على ويندوز) يبقى مسار، ولو بدأ بحرف عادي يبقى اسم volume. فـ [[site:/usr/...]] هيعمل volume اسمه site مش هيربط فولدرك. [[$(pwd)]] بيحوّل الكلام لمسار كامل.

### جربته

عملت [[site/index.html]] فيه [[<h1>v1</h1>]] وشغّلت الأمر (على بورت تاني)، وبعدين عدّلت الملف من غير أي build:

~~~text الناتج: curl قبل التعديل وبعده
<h1>v1</h1>
<h1>v2</h1>
~~~

وحاولت أكتب من جوه الـ container:

~~~text الناتج
sh: can't create /usr/share/nginx/html/a.txt: Read-only file system
~~~

ده شغل [[:ro]].

### فخين على ويندوز (اتقابلوا فعلًا وانا بجرّب)

**١. المسافات في المسار.** الفولدر عندي اسمه فيه مسافات ([[programming projects]]). من غير علامات تنصيص الشيل قسم المسار لكذا كلمة، و Docker فهم واحدة منهم كاسم صورة:

~~~text الناتج
Unable to find image 'projects/full:latest' locally
docker: Error response from daemon: pull access denied for projects/full, repository does not exist
~~~

الحل: [[-v "$(pwd)/site:/usr/share/nginx/html:ro"]] بين علامتين.

**٢. Git Bash بيغيّر المسارات.** Git Bash بيحوّل أي حاجة شكلها [[/usr/...]] لمسار ويندوز، فالربط راح على [[C:\Program Files\Git\usr\share\nginx\html]] من غير أي error، و nginx فضل يعرض صفحته الافتراضية. الحل إنك تكتب قبل الأمر:

~~~bash
export MSYS_NO_PATHCONV=1
~~~

وفي PowerShell المتغير اسمه [[$__{PWD}]]:

~~~powershell
docker run -d -p 8080:80 -v "$__{PWD}/site:/usr/share/nginx/html:ro" nginx:alpine
~~~

ده اشتغل من أول مرة.

---

## السطر التاني: تشغّل التيستات من غير ما تسطّب Node

~~~bash
docker run -it --rm -v $(pwd):/app -w /app node:22-alpine npm test
~~~

| الجزء | معناه |
|---|---|
| [[-it]] | [[-i]] خلي الإدخال مفتوح، و [[-t]] اعمل ترمنال: عشان تشوف الألوان وتقدر تدوس Ctrl+C |
| [[--rm]] | امسح الـ container أول ما يخلص |
| [[-v $(pwd):/app]] | المشروع كله يظهر جوه على [[/app]] |
| [[-w /app]] | working directory: الأمر يشتغل من [[/app]] |
| [[node:22-alpine]] | صورة فيها Node 22 |
| [[npm test]] | الأمر اللي يتنفّذ بدل الأمر الافتراضي للصورة |

جربته من PowerShell على مشروع صغير فيه تيست واحد:

~~~text الناتج
> test
> node --test

ok 1 - 1 + 1 = 2
# tests 1
# pass 1
# fail 0
~~~

Node مش متسطّب على الجهاز ده خالص، الـ container جاب Node واشتغل على ملفاتي، وأول ما خلص اتمسح.

---

## الخلاصة

| | volume | bind mount |
|---|---|---|
| مين بيحدد المكان | Docker | انت (مسار كامل) |
| الشكل في [[-v]] | [[اسم:/مسار]] | [[/مسار/كامل:/مسار]] |
| بتشوف الملفات بسهولة | لأ | أيوه، فولدر عادي |
| استخدامه | بيانات قواعد البيانات | الكود وقت التطوير |`,
          lines: [
            "اربط فولدر site من جهازك على مسار ملفات nginx، للقراءة بس.",
            "شغّل الاختبارات من صورة node على كودك: الفولدر الحالي على /app، واشتغل من هناك."
          ],
          sol: R`أول مرة الصفحة بتوري المحتوى القديم، وبعد ما تعدّل [[site/index.html]] من جهازك وتعمل ريفريش بتوري الجديد على طول، من غير build ولا restart. جربتها: [[<h1>v1</h1>]] وبعد التعديل [[<h1>v2</h1>]].

ده لأن الفولدر نفسه متوصل جوه الـ container، مش نسخة منه. و [[:ro]] معناها nginx يقرا بس، ومايقدرش يكتب في فولدرك.

الأغلاط الشائعة: الصفحة 403 أو صفحة nginx الافتراضية: المسار غلط (مثلًا انت مش في الفولدر اللي فيه [[site]])، و Docker بيعمل فولدر فاضي لو المسار مش موجود. وعلى ويندوز في PowerShell [[$(pwd)]] ممكن تبوظ بسبب المسافات؛ حطها بين علامتين أو استخدم [[$__{PWD}]].`
        },
        {
          cmd: "networks",
          title: "الـ containers بتكلّم بعض بالاسم",
          desc: "Docker بيعمل شبكة داخلية، وكل container عليها بيوصل للتاني باسمه كأنه دومين. التطبيق بيتصل بـ [[db:5432]] مش IP. الشبكة الافتراضية مش بتدعم الأسامي، فبتعمل شبكة بإيدك (compose بيعملها لوحده).",
          example: R`docker network create appnet
docker run -d --name db --network appnet -e POSTGRES_PASSWORD=secret postgres:16
docker run -it --rm --network appnet postgres:16 psql -h db -U postgres
docker network inspect appnet`,
          try: "من container تاني على نفس الشبكة، جرّب [[ping db]] أو [[nc -zv db 5432]].",
          deep: {
            why: "التطبيق محتاج يوصل لقاعدة البيانات. الاتنين containers، وكل واحد ليه IP بيتغير مع كل تشغيل. محتاج طريقة ثابتة يلاقوا بيها بعض.",
            how: R`لما تعمل شبكة بـ [[network create]] وتحط containers عليها، Docker بيشغّل DNS داخلي: اسم الـ container بيبقى دومين. التطبيق بيتصل بـ [[postgres://db:5432]] و Docker بيحوّل db للـ IP الحالي.

الشبكة الافتراضية (bridge) اللي الـ containers بتبقى عليها لو محددتش، مش فيها الـ DNS ده. عشان كده بتعمل شبكة بإيدك. Compose بيعمل شبكة للمشروع لوحده باسم [[اسم_الفولدر_default]].

الـ containers على شبكة واحدة بتوصل لبعض على كل البورتات من غير [[-p]]. الـ [[-p]] بس للوصول من بره Docker (من جهازك أو من النت). عشان كده قاعدة البيانات في compose مش محتاجة ports خالص لو التطبيق بس اللي بيكلّمها.

و [[network inspect]] بيوريك مين على الشبكة وبأي IP.`,
            when: "أي مشروع فيه أكتر من container. ولما تحتاج تدخل على شبكة مشروع compose من container تشخيص.",
            mistakes: "تحط في DATABASE_URL [[localhost]] وانت جوه container: localhost هو الـ container نفسه مش السيرفر ولا القاعدة. استخدم اسم الخدمة."
          },
          teach: R`## المشكلة اللي بتحلها

كل container بياخد IP بيتغير كل ما يتعمل من جديد. محتاجين الـ containers يلاقوا بعض بـ **اسم ثابت**. الحل: شبكة تعملها بإيدك، و Docker بيشغّل عليها DNS صغير بيحوّل اسم الـ container لـ IP بتاعه.

جربت الأوامر على Docker Desktop بأسامي [[dk02-appnet]] و [[dk02-db]]، والمعنى واحد.

---

## ١. [[docker network create appnet]]

اعمل شبكة اسمها [[appnet]]. نوعها الافتراضي [[bridge]]: شبكة داخلية على نفس الجهاز. بيطبع ID الشبكة.

---

## ٢. القاعدة على الشبكة

~~~bash
docker run -d --name db --network appnet -e POSTGRES_PASSWORD=secret postgres:16
~~~

الجديد هنا [[--network appnet]]: حط الـ container على الشبكة دي. وخد بالك إن مفيش [[-p]] خالص: مش محتاجين نفتح بورت على جهازك، لأن اللي هيكلّم القاعدة container تاني على نفس الشبكة.

والاسم في [[--name db]] هو اللي هيبقى «الدومين» بتاع القاعدة.

---

## ٣. container تاني يتصل بالاسم

~~~bash
docker run -it --rm --network appnet postgres:16 psql -h db -U postgres
~~~

| الجزء | معناه |
|---|---|
| [[-it --rm]] | تفاعلي، ويتمسح لما تخرج |
| [[--network appnet]] | على نفس الشبكة، وإلا الاسم مش هيتحل |
| [[postgres:16]] | استخدمنا نفس الصورة عشان فيها برنامج [[psql]] جاهز |
| [[psql]] | عميل Postgres بتاع الترمنال |
| [[-h db]] | host: اتصل بالجهاز اللي اسمه db |
| [[-U postgres]] | باليوزر postgres |

هيسألك [[Password for user postgres:]]: اكتب [[secret]]. جربته من غير ما يسأل (بمتغير [[PGPASSWORD]]) وطبّقت [[select 1]]:

~~~text الناتج
 ok
----
  1
(1 row)
~~~

### نختبر الاسم بأدوات أبسط

~~~bash
docker run --rm --network appnet alpine sh -c "ping -c1 db; nc -zv db 5432"
~~~

[[ping -c1]] يبعت رسالة واحدة (count 1)، و [[nc -zv]] (netcat) يجرّب البورت: [[-z]] جرّب الاتصال بس من غير بيانات، و [[-v]] اطبع النتيجة.

~~~text الناتج
PING dk02-db (172.19.0.2): 56 data bytes
64 bytes from 172.19.0.2: seq=0 ttl=64 time=0.227 ms
dk02-db (172.19.0.2:5432) open
~~~

الاسم اتحوّل لـ [[172.19.0.2]] والبورت مفتوح. ونفس الأمر من container **مش** على الشبكة:

~~~text الناتج
ping: bad address 'dk02-db'
~~~

---

## ٤. [[docker network inspect appnet]]

بيطبع JSON طويل. أهم حاجتين:

~~~text جزء من الناتج
"Subnet": "172.19.0.0/16",
"Gateway": "172.19.0.1"
~~~

و تحت [[Containers]] كل container على الشبكة بالـ IP بتاعه. لو عايز السطر المهم بس:

~~~bash
docker network inspect appnet --format '{{range .Containers}}{{.Name}} {{.IPv4Address}}{{"\n"}}{{end}}'
~~~

~~~text الناتج
dk02-db 172.19.0.2/16
~~~

[[/16]] معناها إن الشبكة فيها حوالي ٦٥ ألف عنوان من [[172.19.0.0]] لـ [[172.19.255.255]].

---

## الخلاصة

~~~text
docker network create NAME     شبكة بـ DNS داخلي
--network NAME                 حط الـ container عليها
اسم الـ container              = اسم الدومين جوه الشبكة
-p                             للي جاي من بره Docker بس
~~~`,
          lines: [
            "اعمل شبكة.",
            "القاعدة على الشبكة، من غير -p خالص.",
            "container مؤقت على نفس الشبكة يتصل بالقاعدة باسمها db.",
            "مين على الشبكة وبأي IP."
          ],
          sol: R`من container على نفس الشبكة: [[ping -c1 db]] بيطبع [[PING db (172.19.0.2)]] و [[64 bytes from 172.19.0.2]]، و [[nc -zv db 5432]] بيطبع [[db (172.19.0.2:5432) open]]. يعني الاسم اتحل لـ IP والبورت مفتوح.

ومن container مش على الشبكة (على الـ bridge الافتراضية) نفس الأمر بيقول [[ping: bad address 'db']]: الأسامي بتشتغل بس جوه شبكة انت عاملها ([[docker network create]]) أو شبكة compose.

الغلط الشائع: تحاول [[localhost:5432]] من container التطبيق فيرد [[Connection refused]]، لأن localhost جوه الـ container هو الـ container نفسه. استخدم اسم الـ service. و [[psql -h db]] ممكن يطلع [[Connection refused]] أول ثواني وقاعدة البيانات لسه بتقوم.`,
          solCode: R`docker network create appnet
docker run -d --name db --network appnet -e POSTGRES_PASSWORD=secret postgres:16-alpine
docker run --rm --network appnet alpine sh -c "ping -c1 db; nc -zv db 5432"
docker run --rm alpine ping -c1 db`
        },
        {
          cmd: "env file",
          title: "المتغيرات من ملف",
          desc: R`بدل ما تكتب [[-e KEY=value]] عشرين مرة، [[--env-file .env]] بيقرا ملف فيه سطر لكل متغير بالشكل [[KEY=value]] ويبعتهم كلهم للـ container. الملف بيفضل على السيرفر ومش بيدخل جوه الـ image، فالأسرار متتحطش في صورة ممكن تترفع لأي registry.

[[-e PORT=4000]] بعد الـ env-file بيغطي على قيمة PORT اللي في الملف، فتغيّر متغير واحد من غير ما تعدّل الملف. و [[docker exec api env]] بيشغّل [[env]] جوه الـ container اللي اسمه api ويطبع كل متغيراته، و [[| sort]] يرتّبهم أبجديًا عشان تلاقي اللي بتدوّر عليه.

خد بالك إن [[docker run]] بياخد القيمة زي ما هي حرفيًا: [[A="hi"]] بتوصل بعلامات التنصيص جواها، عكس مكتبة dotenv. وخلي [[.env]] في [[.dockerignore]] و [[.gitignore]].`,
          example: R`docker run -d --name api --env-file .env -p 3000:3000 myapi
docker run -d --env-file .env -e PORT=4000 myapi
docker exec api env | sort`,
          try: "شغّل بـ env-file وبعدين [[docker exec api env]] واتأكد إن المتغيرات وصلت.",
          deep: {
            why: "التطبيق محتاج ١٠ أو ٢٠ متغير. تكتبهم كلهم بـ [[-e]] في الأمر متعب وبيتسجّل في الـ history بالأسرار.",
            how: R`[[--env-file .env]] بيقرا ملف فيه سطر لكل متغير بالشكل [[KEY=value]]، ويبعتهم كلهم للـ container. الملف بيفضل على السيرفر، مش جوه الـ image.

فيه فرق عن ملفات .env اللي مكتبة dotenv بتقراها: Docker مش بيفهم علامات التنصيص بنفس الطريقة (القيمة بتتاخد حرفيًا بالعلامات)، ومش بيدعم المتغيرات اللي بتشاور على متغيرات. خلّي الملف بسيط: مفتاح يساوي قيمة.

[[-e]] بعد [[--env-file]] بيغطي على القيمة اللي في الملف، فتقدر تغيّر متغير واحد من غير ما تعدّل الملف.

وفي compose نفس الفكرة بـ [[env_file:]]، وده الأشهر.`,
            when: "كل container إنتاج. الملف على السيرفر بصلاحيات 600.",
            mistakes: ".env جوه الـ image (نسيان .dockerignore)، أو ملف .env على السيرفر مقروء لكل اليوزرز."
          },
          teach: R`## الفكرة

بدل [[-e]] لكل متغير، تكتب المتغيرات في ملف، سطر لكل واحد، وتقول لـ Docker «اقرا الملف ده». جربت على Docker Desktop بملف [[.env]] ده:

~~~text .env
API_KEY=abc
PORT=3000
# comment line
GREETING="hi"
~~~

السطر اللي بيبدأ بـ [[#]] تعليق وبيتجاهل.

---

## ١. [[docker run -d --name api --env-file .env -p 3000:3000 myapi]]

| الجزء | معناه |
|---|---|
| [[--env-file .env]] | اقرا الملف ده وابعت كل سطر كمتغير للـ container |
| [[-p 3000:3000]] | البورت |
| [[myapi]] | اسم صورة تطبيقك (اللي بنيتها قبل كده) |

الملف بيتقري **وقت إنشاء الـ container** بس، ومش بيتحط جوه الصورة.

---

## ٢. [[-e]] بيغطي على الملف

~~~bash
docker run -d --env-file .env -e PORT=4000 myapi
~~~

لو نفس المتغير موجود في الملف وفي [[-e]]، الـ [[-e]] بيكسب. جربتها بصورة node:

~~~text الناتج
PORT=4000
GREETING="hi"
~~~

لاحظ [[GREETING]]: العلامتين وصلوا جوه القيمة. [[docker run]] مش بيشيل علامات التنصيص زي مكتبة dotenv.

---

## ٣. [[docker exec api env | sort]]

- [[docker exec api]]: نفّذ أمر جوه الـ container الشغال اللي اسمه api.
- [[env]]: أمر لينكس بيطبع كل متغيرات البيئة.
- [[| sort]]: الـ pipe بيبعت الناتج لـ [[sort]] يرتّبه أبجديًا. الـ [[sort]] ده بيشتغل على جهازك انت مش جوه.

~~~text الناتج
API_KEY=abc
GREETING="hi"
HOME=/root
HOSTNAME=ce12b6021b2f
NODE_VERSION=22.23.3
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
PORT=3000
YARN_VERSION=1.22.22
~~~

| جاي منين | المتغيرات |
|---|---|
| ملف [[.env]] | [[API_KEY]] و [[PORT]] و [[GREETING]] |
| الصورة نفسها | [[NODE_VERSION]] و [[YARN_VERSION]] و [[PATH]] |
| Docker | [[HOSTNAME]] (أول ١٢ حرف من ID الـ container) و [[HOME]] |

---

## الخلاصة

~~~text
--env-file FILE     كل سطر KEY=value يبقى متغير
-e KEY=value        يغطي على اللي في الملف
القيم حرفية         من غير علامات تنصيص
التعديل على الملف   محتاج container جديد (rm وrun)، مش restart
~~~`,
          lines: ["كل المتغيرات من الملف.", "الملف، و -e بتغطي على متغير واحد منه.", "اتأكد إن المتغيرات وصلت."],
          sol: R`[[docker exec api env | sort]] بيوري المتغيرات اللي في الملف بالظبط زي [[API_KEY=abc]] و [[PORT=3000]]، ومعاهم متغيرات الـ image نفسها زي [[NODE_VERSION=22.x]] و [[PATH]] و [[HOSTNAME]].

ولو ضفت [[-e PORT=4000]] مع [[--env-file]]، [[env]] هيوري [[PORT=4000]]: الـ [[-e]] بيكسب.

الأغلاط الشائعة: قيمة ظاهرة بعلامات تنصيص زي [[API_KEY="abc"]]: [[docker run --env-file]] مابيشيلش العلامات (عكس compose)، فاكتب القيم من غير تنصيص. ولو عدّلت [[.env]] والتطبيق لسه شايف القديم، المتغيرات بتتقري وقت إنشاء الـ container بس؛ لازم [[docker rm -f]] وتشغّل من جديد، مش restart.`
        },
        {
          cmd: "bind mount لملف واحد",
          title: "عدّلت الملف والـ container لسه شايف القديم",
          desc: R`لما تربط ملف واحد (مش فولدر) جوه container، الربط بيمسك الملف نفسه (الـ inode بتاعه) مش اسمه. [[sed -i]] و [[mv]] ومحررات كتير بيكتبوا ملف جديد ويحطوه مكان القديم، فالاسم بقى بيشاور على inode تاني والـ container لسه شايف القديم. [[cat new > file]] بيكتب جوه نفس الملف، فالتعديل يوصل.

أو اربط الفولدر كله بدل الملف، والمشكلة دي مش هتحصل أصلًا.`,
          example: R`cat new.conf > ./nginx/nginx.conf
stat -c %i ./nginx/nginx.conf
docker exec web stat -c %i /etc/nginx/nginx.conf
docker exec web nginx -t && docker exec web nginx -s reload
# لو الرقمين مختلفين: docker restart web`,
          try: "اربط ملف واحد في container، وعدّله بـ [[sed -i]]، وقارن رقم الـ inode بره وجوه. بعدين اكتب بـ [[cat >]] وقارن تاني.",
          deep: {
            why: "بتعدّل nginx.conf على السيرفر، وتعمل reload، ومفيش أي error، والإعدادات القديمة لسه شغالة. من أغرب المشاكل لأن كل حاجة شكلها صح.",
            how: R`كل ملف على لينكس ليه رقم اسمه inode، والاسم مجرد مؤشر عليه. الـ bind mount لملف بيمسك الـ inode وقت ما الـ container قام.

[[sed -i]] بيكتب النتيجة في ملف مؤقت ويعمله rename مكان الأصلي. الاسم دلوقتي بيشاور على inode جديد، بس الـ container لسه ماسك القديم، وده فضل موجود لأن فيه حد ماسكه. [[mv]] نفس الحكاية، و vim وأغلب المحررات كمان.

[[cat new.conf > file]] بيفضّي الملف الموجود ويكتب فيه، فنفس الـ inode ونفس الملف اللي الـ container شايفه.

[[stat -c %i]] بيطبع رقم الـ inode. لو الرقم بره هو هو جوه، التعديل واصل. لو مختلف، [[docker restart]] بيعيد الربط.

وقبل ما تكتب على ملف مستخدم، اختبره في container مؤقت: [[docker run --rm -v "$PWD/new.conf:/etc/nginx/nginx.conf:ro" nginx:alpine nginx -t]]. كده لو فيه غلطة الملف الأصلي متلمسش.

ولو تقدر، اربط الفولدر ([[./nginx:/etc/nginx/conf.d]]) بدل الملف: الـ container بيشوف محتويات الفولدر لايف، فأي rename بيبان.`,
            when: "أي ملف إعدادات مربوط لوحده: nginx.conf، و prometheus.yml، وملفات config لخدمات مشتركة.",
            mistakes: R`في مشروع حقيقي سكربت كان بيعدّل nginx.conf المشترك بـ [[sed -i]] ويعمل reload، و nginx يفضل شغّال بالإعدادات القديمة من غير أي error. الحل كان [[cat >]] ومقارنة الـ inode بره وجوه، ولو مختلفين restart. والغلطة التانية: تكتب بـ cat على الملف الحقيقي قبل ما تختبره، فأول restart بعدها nginx ميقومش.`
          },
          teach: R`## الحكاية باختصار

لما تربط **ملف واحد** (مش فولدر)، Linux بيمسك الملف نفسه، مش اسمه. والمحررات و [[sed -i]] مش بيعدّلوا الملف: بيكتبوا ملف جديد ويحطوه مكان القديم بنفس الاسم. فالاسم بقى بيشاور على ملف تاني، والـ container لسه ماسك القديم.

### يعني إيه inode؟

كل ملف على لينكس ليه رقم اسمه **inode** (index node)، وده «الملف الحقيقي» على الديسك. الاسم مجرد لافتة متعلّقة على الرقم ده. اسمين ممكن يشاوروا على نفس الـ inode، واسم ممكن يتنقل لـ inode تاني.

---

## المثال سطر سطر

### ١. [[cat new.conf > ./nginx/nginx.conf]]

[[cat]] بيطبع محتوى [[new.conf]]، و [[>]] بيوجّه الناتج للملف: بيفضّيه ويكتب فيه. نفس الـ inode، محتوى جديد.

### ٢. [[stat -c %i ./nginx/nginx.conf]]

[[stat]] بيعرض معلومات الملف، و [[-c]] (custom format) بيطبع اللي تطلبه بس، و [[%i]] رقم الـ inode.

### ٣. [[docker exec web stat -c %i /etc/nginx/nginx.conf]]

نفس السؤال، بس جوه الـ container [[web]]. لو الرقمين واحد، الاتنين شايفين نفس الملف.

### ٤. [[docker exec web nginx -t && docker exec web nginx -s reload]]

- [[nginx -t]]: test، يفحص الإعدادات من غير ما يطبقها.
- [[&&]]: لو الفحص نجح بس...
- [[nginx -s reload]]: ابعت signal لـ nginx يعيد قراءة الإعدادات من غير ما يقع.

~~~text الناتج
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
2026/10/06 12:00:32 [notice] 61#61: signal process started
~~~

### ٥. [[# لو الرقمين مختلفين: docker restart web]]

تعليق: الـ restart بيعيد الربط من الأول على الملف اللي الاسم بيشاور عليه دلوقتي.

---

## شفناها بعنينا على لينكس

عشان أشوف السلوك ده على Linux حقيقي، عملت نفس النوع من الربط (bind mount لملف) جوه container أوبونتو 24.04 بـ [[mount --bind]]، وده نفس اللي Docker بيعمله:

~~~text الناتج
== before
364555
364555
== after sed -i
364558
364555
server_name localhost2;
server_name localhost;
== after re-mount (restart)
364558
364558
== after cat >
364558
364558
server_name localhost3;
~~~

| المرحلة | بره | جوه | المعنى |
|---|---|---|---|
| قبل | 364555 | 364555 | نفس الملف |
| بعد [[sed -i]] | 364558 | 364555 | بره ملف جديد، جوه لسه القديم بالمحتوى القديم |
| بعد إعادة الربط | 364558 | 364558 | رجعوا زي بعض |
| بعد [[cat >]] | 364558 | 364558 | الرقم ماتغيرش والمحتوى الجديد وصل |

### وعلى Docker Desktop ويندوز؟

جربت نفس الحكاية بملف على درايف D مربوط في nginx، وعدّلته بـ [[sed -i]] من Git Bash: الرقم بره اتغير، بس الـ container شاف المحتوى الجديد عادي. مشاركة الملفات في Docker Desktop بتمشي بالاسم مش بالـ inode، فالمشكلة دي بتظهر على **سيرفر لينكس** أساسًا، وده المكان اللي هتعدّل فيه nginx.conf في الحقيقة.

### ومفاجأة من صورة nginx نفسها

لما ربطت [[default.conf]] لوحده **من غير** [[:ro]] (ومحتواه زي الأصلي)، الـ container وقع أول ما قام، واللوج قال:

~~~text الناتج
10-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.conf
sed: can't move '/etc/nginx/conf.d/default.confbMIhEA' to '/etc/nginx/conf.d/default.conf': Resource busy
~~~

سكربت البداية في صورة nginx بيعمل [[sed -i]] على الملف، و [[sed -i]] محتاج يبدّل الاسم، والاسم ده مربوط فمينفعش. نفس المشكلة بالظبط من الناحية التانية. ومع [[:ro]] السكربت قال [[can not modify ... (read-only file system?)]] وكمّل عادي.

---

## الخلاصة

~~~text
sed -i / mv / أغلب المحررات   ملف جديد = inode جديد = الـ container مش شايف
cat new > file                 نفس الـ inode = التعديل يوصل
stat -c %i                     قارن الرقم بره وجوه
الحل الأضمن                    اربط الفولدر مش الملف
~~~`,
          lines: [
            "اكتب المحتوى الجديد جوه نفس الملف (نفس الـ inode).",
            "رقم الـ inode على السيرفر.",
            "رقمه جوه الـ container: لازم يبقى هو هو.",
            "اختبر الإعدادات، ولو سليمة اعمل reload."
          ],
          sol: R`قبل أي تعديل رقم الـ inode بره وجوه واحد (عندي [[2214043]] الاتنين). بعد [[sed -i]] الرقم بره اتغير ([[2214050]]) وجوه فضل القديم، و [[grep]] جوه الـ container بيوري المحتوى القديم. ده لأن [[sed -i]] بيكتب ملف جديد ويبدّله بالاسم، والـ container لسه ماسك الملف القديم.

بعد [[docker restart web]] الرقمين بقوا زي بعض تاني. ومن هنا لو كتبت بـ [[cat new.conf > file]] الرقم مابيتغيرش، والتعديل بيبان جوه على طول، و [[nginx -t]] و [[nginx -s reload]] كفاية.

الغلط الشائع: تعمل [[nginx -s reload]] بعد التعديل بمحرر زي VS Code أو [[sed -i]] وتستغرب إن مفيش حاجة اتغيرت. الأسهل: اربط الفولدر كله ([[./nginx:/etc/nginx/conf.d]]) بدل ملف واحد.`,
          solCode: R`docker run -d --name web -v $(pwd)/nginx/default.conf:/etc/nginx/conf.d/default.conf nginx:alpine
stat -c %i nginx/default.conf; docker exec web stat -c %i /etc/nginx/conf.d/default.conf
sed -i 's/localhost;/localhost2;/' nginx/default.conf
stat -c %i nginx/default.conf; docker exec web stat -c %i /etc/nginx/conf.d/default.conf
docker restart web
cat new.conf > nginx/default.conf
stat -c %i nginx/default.conf; docker exec web stat -c %i /etc/nginx/conf.d/default.conf`
        },
        {
          cmd: "volume external",
          title: "volume قاعدة البيانات محمي من الحذف بالغلط",
          desc: R`الـ volume العادي في compose اسمه بيبقى [[اسم_المشروع_pgdata]]، وبيتمسح مع [[down -v]]. ولو غيّرت اسم الفولدر، compose بيعمل volume جديد فاضي ويبان إن الداتا راحت. [[external: true]] معناها إنك انت اللي عامل الـ volume بإيدك، و compose بيستخدمه بس: مش بيعمله ومش بيمسحه.`,
          example: R`docker volume create pgdata
# وفي compose.yml:
volumes:
  pgdata:
    name: pgdata
    external: true`,
          try: "في مشروع تجربة، خلّي الـ volume external، واعمل [[docker compose down -v]]، وبعدين [[docker volume ls]]: هتلاقيه لسه موجود.",
          flag: "script",
          deep: {
            why: "بيانات الإنتاج في volume، و compose شايفه بتاعه: بيعمله وممكن يمسحه. حرف v زيادة في down، أو نقل المشروع لفولدر باسم تاني، وفجأة القاعدة فاضية.",
            how: R`compose بيسمّي كل حاجة باسم المشروع، واسم المشروع افتراضيًا اسم الفولدر. [[/opt/myapp]] يطلّع [[myapp_pgdata]]. لو نقلت المشروع لـ [[/opt/myapp-v2]] بقى [[myapp-v2_pgdata]]، volume جديد فاضي، والقديم لسه موجود بس محدش بيستخدمه.

[[external: true]] بيقول لـ compose: الـ volume ده موجود بره، استخدمه بالاسم ده بالظبط. لو مش موجود، compose يرفض يقوم بـ error واضح، وده أحسن من إنه يعمل واحد فاضي في صمت. و [[down -v]] مش بيقرّب منه.

[[name:]] بيثبّت الاسم الحقيقي من غير بادئة المشروع. وينفع تستخدمه لوحده من غير external، فالاسم يثبت بس compose يفضل يديره.`,
            when: "volumes الإنتاج اللي فيها قاعدة بيانات أو ملفات مرفوعة، أو volume مشترك بين مشروعين.",
            mistakes: R`تنسى [[docker volume create]] على سيرفر جديد، فـ compose يرفض يقوم (وده المقصود). وتفتكر إن external يعني باك أب: [[docker volume rm pgdata]] لسه بيمسحه عادي. في مشروع حقيقي volume الـ Mongo كان external بالظبط عشان كده، بس الباك أب اليومي كان على نفس السيرفر، فلو السيرفر راح، الاتنين راحوا.`
          },
          teach: R`## الفكرة

compose بيعتبر الـ volumes اللي في الملف «بتاعته»: بيعملها لوحده، وبيمسحها مع [[down -v]]. [[external: true]] بتقول: «الـ volume ده مش بتاعك، أنا عامله بإيدي، استخدمه بس».

---

## ١. [[docker volume create pgdata]]

مرة واحدة على السيرفر. ده الـ volume اللي هيعيش أطول من أي مشروع.

---

## ٢. الجزء اللي في compose.yml

~~~text compose.yml
volumes:
  pgdata:
    name: pgdata
    external: true
~~~

| السطر | معناه |
|---|---|
| [[volumes:]] | قسم تعريف الـ volumes في آخر الملف (مش جوه خدمة) |
| [[pgdata:]] | الاسم اللي الخدمات بتكتبه في [[- pgdata:/var/lib/postgresql/data]] |
| [[name: pgdata]] | الاسم الحقيقي في Docker، من غير ما compose يحط اسم المشروع قدامه |
| [[external: true]] | موجود بره: متعملهوش ومتمسحهوش |

### ليه [[name:]] مهم؟

من غيره compose بيسمّي الـ volume [[اسم_المشروع_pgdata]]. شوفناها في درس compose.yml: مشروع اسمه [[dk02-c]] عمل volume اسمه [[dk02-c_pgdata]].

---

## جربته

استخدمت الـ volume [[dk02-pgdata]] (من درس volumes، وفيه الجدول [[t]]) external، وجنبه volume عادي اسمه scratch عشان نقارن:

~~~bash
docker compose -p dk02-ext up -d
docker compose -p dk02-ext exec -T db psql -U postgres -c "select * from t"
docker compose -p dk02-ext down -v
~~~

~~~text الناتج: الجدول القديم موجود
 x
---
 1
(1 row)
~~~

~~~text الناتج: down -v
 Container dk02-ext-db-1 Removed
 Volume dk02-ext_scratch Removing
 Volume dk02-ext_scratch Removed
 Network dk02-ext_default Removed
~~~

الـ volume العادي اتمسح، والـ external مفيش عنه ولا سطر. و [[docker volume ls]] بعدها لسه بيوري [[dk02-pgdata]].

وغيّرت الاسم لواحد مش موجود:

~~~text الناتج
external volume "dk02-missing" not found
~~~

compose رفض يقوم (exit 1)، بدل ما يعمل volume فاضي ويشغّل القاعدة عليه في صمت.

---

## الخلاصة

| | volume عادي | [[external: true]] |
|---|---|---|
| مين بيعمله | compose | انت بـ [[docker volume create]] |
| اسمه | [[المشروع_الاسم]] | اللي في [[name:]] |
| [[down -v]] | بيمسحه | مش بيقرّب منه |
| لو مش موجود | بيعمله فاضي | error ويرفض يقوم |`,
          lines: [
            "اعمل الـ volume بإيدك مرة واحدة.",
            "تعريف الـ volumes في آخر الملف.",
            "المفتاح اللي الخدمات بتستخدمه.",
            "الاسم الحقيقي من غير بادئة المشروع.",
            "موجود بره: compose ميعملوش وميمسحوش."
          ],
          sol: R`[[docker compose down -v]] بيطبع إنه شال الـ containers والـ network، لكن مفيش سطر [[Volume ... Removed]] للـ volume الـ external. و [[docker volume ls]] بعدها لسه بيوري [[pgdata]].

قارنها بـ volume عادي: نفس الأمر بيطبع [[Volume myapp_pgdata Removed]] والبيانات بتروح. الـ external معناه «compose مش صاحبه»، فلا بيعمله ولا بيمسحه.

الغلط الشائع: [[docker compose up]] يقول [[external volume "pgdata" not found]]: لازم [[docker volume create pgdata]] الأول. ولو نسيت [[name: pgdata]]، compose ممكن يدوّر على اسم تاني، فاكتبه صريح.`
        },
        {
          cmd: "شبكة مشتركة",
          title: "كذا مشروع على سيرفر واحد ورا نفس Nginx",
          desc: R`كل مشروع compose ليه شبكته لوحده. لو عندك Nginx واحد (في مشروع لوحده) قدام كذا تطبيق، اعمل شبكة مرة بإيدك، وكل مشروع ينضم لها بـ [[external: true]]. كده Nginx يوصل للتطبيق باسمه ([[proxy_pass http://myapp:3000]]) من غير ما تفتح أي بورت على السيرفر.

وعلى الشبكة المشتركة اسم الخدمة بيبقى اسم DNS، فلازم يبقى فريد بين كل المشاريع.`,
          example: R`docker network create proxy
# compose.yml بتاع التطبيق:
services:
  myapp:
    build: .
    networks: [default, proxy]
networks:
  proxy:
    external: true`,
          try: "اعمل شبكة proxy، وشغّل مشروعين عليها، ومن container الـ nginx جرّب [[wget -qO- http://myapp:3000]].",
          flag: "script",
          deep: {
            why: "سيرفر واحد عليه ٣ مواقع، وبورت 80 و 443 لواحد بس. الحل Nginx واحد قدامهم، بس هو في مشروع والتطبيقات في مشاريع تانية، وكل مشروع شبكته معزولة.",
            how: R`[[docker network create proxy]] مرة واحدة على السيرفر. في كل مشروع [[external: true]] معناها «الشبكة موجودة، انضم لها بس». ولو اسمها الحقيقي مختلف (اتعملت من مشروع compose تاني فبقت [[shared_proxy-network]] مثلًا) اكتب [[name:]] تحتها.

[[networks: [default, proxy] ]] بيخلي التطبيق على الشبكتين: default عشان يكلّم القاعدة بتاعته، و proxy عشان Nginx يوصله. القاعدة على default بس، فـ Nginx ولا أي مشروع تاني يقدر يوصلها.

الـ DNS الداخلي بيسجّل اسم الخدمة واسم الـ container على كل شبكة الخدمة عليها. لو مشروعين عندهم خدمة اسمها [[app]] على نفس شبكة proxy، الاسم [[app]] بيرجع IPين، و Docker بيوزّع بينهم round-robin.

ونقطة تانية: Nginx بيحوّل الاسم لـ IP مرة وقت ما بيقوم. لو التطبيق اتعمله recreate وأخد IP جديد، Nginx يفضل يبعت للقديم ويطلّع 502 لحد ما تعمل reload. اعمل [[nginx -s reload]] في آخر الديبلوي، أو استخدم [[resolver 127.0.0.11 valid=10s;]] مع متغير في proxy_pass عشان يسأل DNS بتاع Docker كل شوية.`,
            when: "أكتر من مشروع على نفس السيرفر ورا reverse proxy واحد (Nginx، أو Caddy، أو nginx-proxy).",
            mistakes: R`في مشروع حقيقي خدمتين من مشروعين مختلفين كان اسمهم [[app]] على نفس الشبكة المشتركة، فـ nginx كان بيوزّع الطلبات بينهم، ونص الزوار بيروحوا للموقع التاني. الحل اسم خدمة فريد ([[myapp]]) أو proxy_pass على container_name فريد. وغلطة تانية: تحط القاعدة على شبكة proxy من غير لازمة.`
          },
          teach: R`## الصورة

كل مشروع compose عنده شبكة [[default]] لوحده، والمشاريع مش شايفة بعض. عشان Nginx (في مشروع) يوصل لتطبيق (في مشروع تاني)، بنعمل شبكة واحدة بره الاتنين، وكل واحد ينضم لها.

~~~text
مشروع proxy:   nginx ──┐
                       ├── شبكة proxy (معمولة بإيدك)
مشروع myapp:   myapp ──┘
               myapp ──── شبكة myapp_default ──── db
~~~

---

## ١. [[docker network create proxy]]

مرة واحدة على السيرفر.

## ٢. compose.yml بتاع التطبيق

| السطر | معناه |
|---|---|
| [[services:]] | الخدمات |
| [[myapp:]] | اسم الخدمة، وهو نفسه اسم الـ DNS على الشبكة، فلازم يبقى فريد على السيرفر كله |
| [[build: .]] | ابنيها من Dockerfile اللي هنا |
| [[networks: [default, proxy] ]] | على شبكتين: default بتاعة المشروع، و proxy المشتركة |
| [[networks:]] (آخر الملف) | تعريف الشبكات |
| [[proxy:]] + [[external: true]] | الشبكة موجودة بره، انضم لها بس |

لو كتبت [[networks:]] في الخدمة لازم تكتب [[default]] بنفسك. من غيرها الخدمة هتبقى على proxy بس، ومش هتشوف القاعدة بتاعتها.

---

## جربته بمشروعين

مشروع التطبيق فيه خدمة [[dk02-myapp]] (سيرفر Node صغير) على [[default]] و [[proxy]]، وخدمة [[cache]] (Redis) على default بس. ومشروع تاني فيه nginx على proxy بس. والاتنين فيهم [[name: dk02-proxy]] تحت الشبكة.

أول مرة شغّلت قبل ما أعمل الشبكة:

~~~text الناتج
network dk02-proxy declared as external, but could not be found
~~~

بعد [[docker network create dk02-proxy]] وتشغيل المشروعين، من جوه nginx:

~~~bash
docker compose -p dk02-px exec nginx wget -qO- http://dk02-myapp:3000
~~~

~~~text الناتج
hello from myapp
~~~

[[wget -qO-]]: [[-q]] من غير كلام زيادة، و [[-O-]] اطبع الصفحة على الشاشة بدل ما تحفظها في ملف.

ونفس الحكاية مع Redis اللي مش على proxy:

~~~text الناتج
nc: bad address 'cache'
~~~

nginx مش شايفه أصلًا، وده المطلوب. و [[network inspect]]:

~~~text الناتج
dk02-px-nginx-1 172.20.0.2/16
dk02-app-dk02-myapp-1 172.20.0.3/16
~~~

---

## الخلاصة

~~~text
docker network create proxy        مرة على السيرفر
networks: [default, proxy]         الخدمة اللي nginx محتاجها
external: true                     انضم، متعملش
اسم الخدمة على proxy               لازم يبقى فريد بين كل المشاريع
القاعدة                            على default بس
~~~`,
          lines: [
            "اعمل الشبكة المشتركة مرة واحدة على السيرفر.",
            "الخدمات.",
            "خدمة باسم فريد على مستوى السيرفر كله.",
            "بتتبني من الفولدر ده.",
            "على شبكة المشروع وعلى الشبكة المشتركة.",
            "تعريف الشبكات.",
            "الشبكة المشتركة...",
            "...موجودة بره: انضم لها بس."
          ],
          sol: R`[[docker compose exec nginx wget -qO- http://myapp:3000]] بيطبع رد التطبيق (HTML أو JSON). ده معناه إن الاتنين على شبكة [[proxy]] والاسم بيتحل. و [[docker network inspect proxy]] بيوري الـ containers الاتنين تحت [[Containers]].

كل مشروع لسه على شبكته [[default]] كمان، فقاعدة بيانات المشروع مش ظاهرة للمشاريع التانية طالما مش على proxy.

الأغلاط الشائعة: [[network proxy declared as external, but could not be found]]: نسيت [[docker network create proxy]]. و [[wget: bad address 'myapp']]: الخدمة مش على proxy (نسيت [[networks: [default, proxy]]]) أو اسم الخدمة غير اللي بتطلبه. ولو مشروعين فيهم خدمة بنفس الاسم [[app]] على proxy، الاسم هيتحل لأي واحد منهم؛ استخدم أسامي مختلفة أو [[container_name]] أو aliases.`
        },
        {
          cmd: "0.0.0.0 جوه الـ container",
          title: "البورت مفتوح بس الصفحة مش بتفتح",
          desc: R`سيرفرات التطوير (Vite، و next dev، وغيرهم) بتسمع على localhost افتراضيًا. وجوه الـ container، localhost ده الـ container نفسه، فطلبك الجاي من [[-p]] مش بيوصله. الحل إن السيرفر يسمع على [[0.0.0.0]]: [[--host 0.0.0.0]] في Vite، و [[-H 0.0.0.0]] في next dev، و [[HOSTNAME=0.0.0.0]] في Next standalone.

والعكس: من جوه الـ container عشان توصل لحاجة شغالة على جهازك، استخدم [[host.docker.internal]] مش localhost.`,
          example: R`services:
  web:
    build: .
    command: npm run dev -- --host 0.0.0.0
    ports: ["5173:5173"]
    extra_hosts:
      - "host.docker.internal:host-gateway"`,
          try: "شغّل Vite جوه container من غير [[--host]] وجرّب [[docker exec web wget -qO- localhost:5173]]: هيشتغل من جوه ومن جهازك لأ. ضيف --host وجرّب تاني.",
          flag: "script",
          deep: {
            why: R`أشهر «الـ container شغال والصفحة مش بتفتح»: اللوج بيقول [[Local: http://localhost:5173]] كأن كل حاجة تمام، والمتصفح بيقول connection reset.`,
            how: R`كل container ليه شبكته، وفيها localhost خاص بيه. [[-p 5173:5173]] بيوجّه الطلبات من جهازك لكارت الشبكة بتاع الـ container (eth0)، مش لـ localhost بتاعه. سيرفر سامع على 127.0.0.1 بس مش هيشوفها.

[[0.0.0.0]] معناها «اسمع على كل الواجهات»، فبيستقبل من eth0. ده مش خطر جوه الـ container: مين يوصل من بره بيتحدد بـ [[ports]] (و 127.0.0.1 على الشمال لو عايز جهازك بس).

تشخيص سريع: [[docker exec web netstat -tln]] لو ظاهر [[127.0.0.1:5173]] يبقى هي دي المشكلة، لو [[0.0.0.0:5173]] أو [[:::5173]] يبقى تمام.

[[host.docker.internal]] اسم بيشاور على جهازك من جوه الـ container. Docker Desktop بيعمله لوحده. على لينكس (Docker Engine) لازم السطر [[host.docker.internal:host-gateway]] في extra_hosts.

و [[extra_hosts]] عمومًا بيضيف سطر في [[/etc/hosts]] جوه الـ container، فممكن يثبّت أي اسم على IP. و [[dns:]] بيحدد سيرفر DNS للـ container.`,
            when: "أي سيرفر تطوير جوه Docker، و Next standalone، والـ container محتاج يكلّم قاعدة أو API شغالة على جهازك.",
            mistakes: R`في مشروع حقيقي الفرونت كان شغال عادي بره Docker، وجوه Docker الصفحة مش بتفتح خالص، والسبب vite من غير [[--host]]. وفي مشروع تاني [[extra_hosts]] اتستخدم يثبّت IP لهوست قاعدة البيانات لما DNS كان بيفشل جوه الـ container. شغال لحد ما المزوّد يغيّر الـ IP، وبعدها يقع من غير سبب واضح. دوّر على سبب فشل DNS بدل ما تثبّت IP.`
          },
          teach: R`## ليه الصفحة مش بتفتح؟

كل container ليه كروت شبكة خاصة بيه: [[lo]] (يعني localhost، [[127.0.0.1]]) وده جوه الـ container بس، و [[eth0]] وده اللي Docker بيوصّل عليه البورت اللي فتحته بـ [[-p]] أو [[ports]]. سيرفر سامع على [[127.0.0.1]] بس مش هيشوف أي حاجة جاية من بره.

[[0.0.0.0]] معناها «اسمع على كل الكروت».

---

## جربت الفرق

شغّلت نفس سيرفر Node مرتين: مرة سامع على [[127.0.0.1]] ومرة على [[0.0.0.0]]، وفتحت لكل واحد بورت:

~~~text الناتج من جهازي
curl localhost:5191  →  curl: (52) Empty reply from server
curl localhost:5192  →  ok
~~~

و [[netstat -tln]] جوه كل واحد ([[-t]] TCP، [[-l]] السامعين بس، [[-n]] أرقام من غير أسامي):

~~~text الناتج
tcp   0   0 127.0.0.1:5173   0.0.0.0:*   LISTEN     ← ده اللي مش شغال من بره
tcp   0   0 0.0.0.0:5173     0.0.0.0:*   LISTEN     ← ده اللي شغال
~~~

> ملاحظة اتعلمتها وانا بجرّب: في صور alpine كلمة [[localhost]] بتتحل لـ [[::1]] (IPv6) الأول، فـ [[wget localhost:5173]] من جوه فشل حتى على السيرفر اللي سامع على 127.0.0.1. اكتب [[127.0.0.1]] صريح وانت بتختبر من جوه.

---

## المثال سطر سطر

~~~text compose.yml
services:
  web:
    build: .
    command: npm run dev -- --host 0.0.0.0
    ports: ["5173:5173"]
    extra_hosts:
      - "host.docker.internal:host-gateway"
~~~

| السطر | معناه |
|---|---|
| [[web:]] | خدمة الفرونت |
| [[build: .]] | من Dockerfile اللي هنا |
| [[command: npm run dev -- --host 0.0.0.0]] | شغّل سكربت dev. الـ [[--]] بتقول لـ npm «اللي بعدي مش ليك، عدّيه للسكربت»، فـ Vite ياخد [[--host 0.0.0.0]] |
| [[ports: ["5173:5173"] ]] | بورت Vite من جهازك للـ container |
| [[extra_hosts:]] | أسامي زيادة تتكتب في [[/etc/hosts]] جوه الـ container |
| [[host.docker.internal:host-gateway]] | الاسم ده يشاور على الجهاز اللي شغّال عليه Docker |

### [[host.docker.internal]] بيشاور على إيه؟

جوه container على Docker Desktop:

~~~text الناتج
192.168.65.254    host.docker.internal
~~~

Docker Desktop بيعرّفه لوحده. وعلى Docker Engine على لينكس مش موجود، فالسطر [[host-gateway]] بيضيفه. وده اللي بيحصل في [[/etc/hosts]] لما تكتبه:

~~~text الناتج
192.168.65.254	host.docker.internal
~~~

---

## الخلاصة

| السيرفر سامع على | من جوه الـ container | من جهازك عبر [[-p]] |
|---|---|---|
| [[127.0.0.1]] | شغال | مش شغال |
| [[0.0.0.0]] | شغال | شغال |

~~~text
Vite        --host 0.0.0.0
next dev    -H 0.0.0.0
Next standalone   HOSTNAME=0.0.0.0
من جوه لجهازك     host.docker.internal
~~~`,
          lines: [
            "الخدمات.",
            "خدمة الفرونت.",
            "ابنيها من الفولدر ده.",
            "شغّل Vite وخليه يسمع على كل الواجهات (الـ -- بتعدّي الـ flag لـ vite).",
            "البورت من جهازك للـ container.",
            "أسماء إضافية في /etc/hosts جوه الـ container:",
            "host.docker.internal يشاور على جهازك (لازم على لينكس، Docker Desktop بيعملها لوحده)."
          ],
          sol: R`من غير [[--host]]: [[docker exec web wget -qO- localhost:5173]] بيرجع صفحة Vite (شغال من جوه)، لكن [[curl localhost:5173]] من جهازك بيطلع [[Recv failure: Connection reset by peer]] أو [[Empty reply from server]]، والمتصفح بيقول الصفحة مش متاحة.

بعد [[--host 0.0.0.0]] وإعادة التشغيل: الاتنين بيشتغلوا. جربتها بسيرفر Node: على [[127.0.0.1]] الـ curl من بره فشل بـ exit 56، وعلى [[0.0.0.0]] رد عادي.

الغلط الشائع: تفتكر المشكلة في [[ports]] وتغيّرها. Docker بيوصّل البورت لـ interface الشبكة بتاع الـ container، والتطبيق اللي سامع على 127.0.0.1 مش سامع هناك. ونفس الكلام لـ Next ([[-H 0.0.0.0]]) و FastAPI ([[--host 0.0.0.0]]).`
        }
      ]
    }
]);
