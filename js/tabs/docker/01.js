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

TAB("docker", {
  label: "Docker",
  prompt: "$ ",
  lab: R`docker version
docker run --rm hello-world
mkdir -p ~/lab/dock && cd ~/lab/dock`,
  labText: "سطّب Docker Desktop (ويندوز وماك) أو Docker Engine (لينكس). كل الأمثلة بتشتغل على جهازك، والصور بتتنزّل مرة واحدة. لو أمر قالك permission denied على لينكس، ضيف نفسك لجروب docker.",
  levels: {
    "1": ["البداية", "images و containers، وتشغّل وتوقّف وتقرا اللوجات"],
    "2": ["المتوسط", "تكتب Dockerfile صح، وتفهم الطبقات والـ volumes والشبكات"],
    "3": ["المتقدم", "Compose لمشروع كامل، والديبلوي، والمشاكل على السيرفر"]
  },
  categories: [
    {
      t: "الفكرة والأوامر الأساسية",
      l: 1,
      n: "الـ image نسخة جاهزة ثابتة، والـ container نسخة شغالة منها",
      items: [
        {
          cmd: "image و container",
          title: "الفرق اللي كل حاجة مبنية عليه",
          desc: "الـ image ملف كبير فيه نظام تشغيل صغير وتطبيقك وكل اللي محتاجه، زي «قالب». والـ container نسخة شغالة من القالب ده. من image واحدة تقدر تشغّل ١٠ containers. الأوامر دي بتنزّل image، وتعرض اللي عندك، وتشغّل container منها.",
          example: R`docker pull nginx:alpine
docker images
docker run --rm nginx:alpine nginx -v
docker run --rm hello-world`,
          try: "نزّل nginx:alpine واعرض حجمها في [[docker images]]. لاحظ إنها كام ميجا بس.",
          deep: {
            why: "«شغال عندي ومش شغال على السيرفر» أشهر جملة في البرمجة. السبب دايمًا فرق في البيئة: نسخة Node، أو مكتبة نظام، أو إعداد. Docker بيحل ده بإنه يحط التطبيق وبيئته كلها في حاجة واحدة بتشتغل بنفس الشكل في أي مكان.",
            how: R`الـ image ملف ثابت مقروء بس. جواها نظام تشغيل صغير (غالبًا Alpine أو Debian مصغّر)، وتطبيقك، والمكتبات. ومحدش بيعدّل عليها، عشان كده نفس الـ image بتدّي نفس النتيجة على أي جهاز.

الـ container عملية شغالة من الـ image دي، ومعاها طبقة كتابة رقيقة فوقها. أي ملف تكتبه جوه الـ container بيتكتب في الطبقة دي بس، والـ image نفسها متتغيرش. لما تمسح الـ container الطبقة دي بتروح.

والـ container مش virtual machine: مفيش نظام تشغيل كامل بيتحمّل. هو عملية عادية على نظام السيرفر، بس Docker بيعزلها: شايفة ملفاتها بس، وشبكتها بس، ومحددة في المعالج والرام. عشان كده بيقوم في أقل من ثانية.

[[pull]] بينزّل image من Docker Hub. [[run]] بيعمل container منها ويشغّله (وبينزّلها لوحده لو مش موجودة). و [[--rm]] بيمسح الـ container بعد ما يخلص.`,
            when: "أي تطبيق هتشغّله على سيرفر. قاعدة بيانات للتطوير من غير ما تسطّبها على جهازك. تجرّب نسخة Node مختلفة في ثانية.",
            mistakes: "إنك تفتكر إن التعديلات جوه الـ container بتفضل. متفضلش. أي حاجة لازم تعيش، تحطها في volume أو في الـ image نفسها من الـ Dockerfile."
          },
          teach: R`## الفكرة في سطرين

الـ **image** «قالب» ثابت: ملف فيه نظام لينكس صغير وبرنامج جاهز. والـ **container** نسخة **شغالة** من القالب ده. الأوامر الأربعة في المثال بتمشي معاك المشوار كله: تنزّل قالب، تتفرج عليه، تشغّل منه نسخة، وتتأكد إن Docker نفسه شغال.

كل الأوامر هنا اتشغّلت على Docker Desktop 29 على ويندوز 11، ونفس الأوامر بالظبط بتتكتب في PowerShell و bash و الماك، لأن [[docker]] برنامج واحد مش أمر من أوامر الشيل.

---

## ١. [[docker pull nginx:alpine]]: نزّل القالب

### نفك الاسم

~~~text
docker   pull   nginx  :  alpine
  │       │       │         │
  │       │       │         └─ الـ tag: أنهي نسخة من الـ image
  │       │       └─ اسم الـ image (برنامج nginx، سيرفر ويب)
  │       └─ الأمر الفرعي: هات من النت
  └─ البرنامج نفسه
~~~

- [[pull]] يعني «اسحب»: نزّل الـ image من مخزن على النت اسمه **registry**. ولو مكتبتش عنوان مخزن، الافتراضي هو **Docker Hub** ([[docker.io]]).
- [[nginx]] اسم الـ image. و [[alpine]] بعد النقطتين اسمه **tag**، وهنا معناه «النسخة المبنية على Alpine Linux»، وده لينكس صغير جدًا.

### الناتج

~~~text الناتج (مختصر)
alpine: Pulling from library/nginx
64c8194480fe: Pull complete
e76228b47809: Pull complete
...
Digest: sha256:df221db836e1754089190208cee7eeda94f233197056426eda74a43ab1abeac2
Status: Downloaded newer image for nginx:alpine
docker.io/library/nginx:alpine
~~~

| السطر | معناه |
|---|---|
| [[Pulling from library/nginx]] | [[library]] هو المكان اللي فيه الـ images الرسمية على Docker Hub |
| كل سطر برقم غريب + [[Pull complete]] | الـ image مش ملف واحد، هي **طبقات** (layers) فوق بعض، وكل طبقة بتتنزل لوحدها |
| [[Digest: sha256:...]] | بصمة الـ image: رقم بيتحسب من محتواها، لو حرف اتغير البصمة تتغير |
| [[docker.io/library/nginx:alpine]] | الاسم الكامل: المخزن / المكان / الاسم : الـ tag |

ولو عملت [[pull]] تاني لنفس الحاجة، مش هيتنزل حاجة، وهتلاقي [[Image is up to date]].

---

## ٢. [[docker images]]: اللي عندك على الجهاز

~~~bash
docker images nginx:alpine
~~~

~~~text الناتج (Docker 29)
IMAGE          ID             DISK USAGE   CONTENT SIZE   EXTRA
nginx:alpine   df221db836e1       94.4MB         27.2MB
~~~

| العمود | معناه |
|---|---|
| [[IMAGE]] | الاسم والـ tag |
| [[ID]] | أول ١٢ حرف من البصمة، تقدر تستخدمه بدل الاسم |
| [[DISK USAGE]] | واخدة قد إيه على الديسك بعد فك الضغط |
| [[CONTENT SIZE]] | حجم التحميل المضغوط (اللي نزل من النت فعلًا) |
| [[EXTRA]] | لو فيه [[U]] يعني فيه container بيستخدمها (In Use) |

> النسخ الأقدم من Docker بتعرض عمود واحد اسمه [[SIZE]] بدل العمودين، والفكرة نفسها. و ٩٤ ميجا لسيرفر ويب كامل رقم صغير، لأن image [[alpine]] لوحدها ١٣ ميجا على الديسك و ٤ ميجا تحميل.

---

## ٣. [[docker run --rm nginx:alpine nginx -v]]: شغّل نسخة

~~~text
docker run   --rm          nginx:alpine          nginx -v
   │          │                 │                    │
   │          │                 │                    └─ الأمر اللي يتنفّذ جوه
   │          │                 └─ من أنهي قالب
   │          └─ امسح الـ container لما يخلص
   └─ اعمل container جديد وشغّله
~~~

- [[run]] = اعمل container **جديد** من الـ image وشغّله. ولو الـ image مش عندك، بيعمل [[pull]] لوحده الأول.
- [[--rm]] (remove): أول ما الـ container يخلص، امسحه. من غيرها بيفضل «جثة» واقفة في [[docker ps -a]].
- أي حاجة **بعد** اسم الـ image هي الأمر اللي هيتشغّل جوه بدل الأمر الافتراضي. هنا [[nginx -v]] يعني «اطبع نسختك واخرج» بدل ما يشغّل السيرفر.

~~~text الناتج
/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
/docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
...
/docker-entrypoint.sh: Configuration complete; ready for start up
nginx version: nginx/1.31.6
~~~

السطور اللي بتبدأ بـ [[/docker-entrypoint.sh]] ده سكربت تجهيز جوه الـ image بيشتغل قبل أي أمر (هتفهمه في درس «CMD و ENTRYPOINT»). وآخر سطر هو اللي طلبناه. اللي حصل في ثانية واحدة:

1. اتعمل container من القالب.
2. اشتغل جواه [[nginx -v]]، طبع النسخة، وخرج.
3. لما الأمر خرج، الـ container وقف، و [[--rm]] مسحه.

والـ image نفسها لسه موجودة في [[docker images]]، لأن مسح الـ container مبيلمسش القالب.

---

## ٤. [[docker run --rm hello-world]]: هل Docker شغال؟

[[hello-world]] image رسمية صغيرة جدًا، شغلتها الوحيدة إنها تطبع رسالة وتخرج. ومكتبناش tag، فـ Docker بيفترض [[latest]]:

~~~text الناتج (أول مرة)
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
...
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.
~~~

الرسالة نفسها بتشرح الخطوات، وفيها كلمتين مهمين:

| الكلمة | معناها |
|---|---|
| **Docker client** | برنامج [[docker]] اللي بتكتبه في الترمنال. هو مجرد «ريموت»، مش هو اللي بيشغّل |
| **Docker daemon** | البرنامج اللي شغال في الخلفية (اسمه [[dockerd]]) وهو اللي بينزّل ويشغّل فعلًا. على ويندوز والماك شغال جوه ماكينة لينكس صغيرة جوه Docker Desktop |
| [[(amd64)]] | معمارية المعالج اللي اتنزلت النسخة بتاعتها (Intel/AMD 64-bit) |

السطر الأول [[Unable to find image ... locally]] مش error: معناه «مش لاقيها عندي، هنزّلها»، وده بالظبط اللي [[run]] بيعمله لوحده.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[docker pull IMAGE:TAG]] | ينزّل القالب بس |
| [[docker images]] | يعرض القوالب اللي عندك وحجمها |
| [[docker run --rm IMAGE أمر]] | يعمل container جديد، ينفّذ الأمر، ويمسحه لما يخلص |

~~~text
image       القالب الثابت، بيتنزل مرة ويتخزن
container   نسخة شغالة من القالب، ليها طبقة كتابة خاصة بيها
--rm        امسح الـ container لما يخلص (الـ image بتفضل)
tag         اسم النسخة بعد النقطتين، ومن غيره = latest
~~~`,
          lines: [
            "نزّل image nginx بالنسخة الصغيرة alpine من Docker Hub.",
            "الصور اللي على جهازك، بحجمها.",
            "شغّل container منها ينفّذ أمر واحد ويخرج، وامسحه بعدها ([[--rm]]).",
            "أشهر اختبار: image صغيرة بتطبع رسالة وتخلص."
          ],
          sol: R`[[docker pull nginx:alpine]] بيخلص بـ [[Status: Downloaded newer image for nginx:alpine]] أو [[docker.io/library/nginx:alpine]]. و [[docker images]] بيوريها بحجم صغير: في Docker 29 الأعمدة [[IMAGE ID DISK USAGE CONTENT SIZE]] وطلعت عندي [[94.4MB]] على الديسك و [[27.2MB]] حجم التحميل. في النسخ الأقدم هتلاقي عمود [[SIZE]] واحد بنفس الفكرة. قارنها بـ [[node:22]] العادية اللي بتعدّي الـ 1GB.

و [[docker run --rm nginx:alpine nginx -v]] بيطبع سطور [[/docker-entrypoint.sh]] وبعدين [[nginx version: nginx/1.x]] ويخرج. الـ container اتعمل واشتغل ومات واتمسح، والـ image لسه موجودة في [[docker images]].

الغلط الشائع: [[429 Too Many Requests]] من Docker Hub وقت الـ pull: ده حد التحميل للي مش عامل login. استنى شوية أو [[docker login]]. و [[permission denied ... docker.sock]] على لينكس يعني يوزرك مش في جروب docker.`
        },
        {
          cmd: "docker run",
          title: "شغّل container بالإعدادات الصح",
          desc: "[[-d]] في الخلفية، و [[-p]] يربط بورت على جهازك ببورت جوه الـ container، و [[--name]] اسم بدل الرقم، و [[--rm]] يمسحه لما يقف، و [[-it]] ترمنال تفاعلي، و [[-e]] متغير بيئة.",
          example: R`docker run -d --name web -p 8080:80 nginx:alpine
docker run -it --rm alpine sh
docker run -d --name db -e POSTGRES_PASSWORD=secret -p 127.0.0.1:5432:5432 postgres:16`,
          try: "شغّل nginx على 8080 وافتح localhost:8080 في المتصفح. بعدين ادخل alpine بـ [[-it]] واكتب [[ls /]] واخرج بـ exit.",
          deep: {
            why: "[[run]] هو الأمر اللي بيحوّل image لـ container شغال، وكل الإعدادات المهمة بتتحدد فيه: مين يقدر يوصله، واسمه إيه، وإعداداته إيه.",
            how: R`[[-d]] (detach) بيشغّله في الخلفية ويرجّعلك الترمنال. من غيرها الترمنال بيفضل ماسك لوج الـ container.

[[-p 8080:80]] اقراها «من جهازي:جوه الـ container». الزوار بيدخلوا على 8080 على جهازك، و Docker بيوصّلهم لـ 80 جوه الـ container. و [[127.0.0.1:5432:5432]] بيخلي البورت متاح من الجهاز نفسه بس، مش من النت. ودي مهمة على السيرفر لأن Docker بيفتح البورتات في الفايروول لوحده.

[[--name]] بدل ما تتعامل برقم عشوائي. [[-e]] بيبعت متغير بيئة للتطبيق. [[-it]] الاتنين مع بعض: [[-i]] يخلي المدخل مفتوح، و [[-t]] يعمل ترمنال، فتقدر تكتب جوه.

وآخر حاجة في الأمر بعد اسم الـ image هي الأمر اللي هيتشغّل جوه، ولو مكتبتش حاجة بيشتغل الافتراضي بتاع الـ image.`,
            when: "تجربة سريعة لأي برنامج من غير تسطيب. قاعدة بيانات للتطوير. وفي الإنتاج غالبًا compose بدل run.",
            mistakes: "[[-p 5432:5432]] لقاعدة بيانات على سيرفر: بتبقى مفتوحة للنت كله. دايمًا [[127.0.0.1:]] قبلها. وترتيب [[-p]] بالعكس."
          },
          teach: R`## [[docker run]] = اعمل container جديد وشغّله

الأمر نفسه واحد في التلات سطور، والفرق كله في الـ **flags** (الاختيارات اللي بتبدأ بشَرطة). القاعدة اللي لازم تتحفظ:

~~~text
docker run   [flags بتاعة Docker]   IMAGE   [أمر يتشغّل جوه]
~~~

اللي **قبل** اسم الـ image إعدادات لـ Docker، واللي **بعده** أمر بيتنفّذ جوه الـ container. اتشغّل كله على Docker Desktop 29 (ويندوز 11)، وبيتكتب زي ما هو في PowerShell و bash.

---

## ١. سيرفر ويب في الخلفية

~~~bash
docker run -d --name web -p 8080:80 nginx:alpine
~~~

| الجزء | اختصار إيه | بيعمل إيه |
|---|---|---|
| [[-d]] | detach (افصل) | شغّله في الخلفية ورجّعلي الترمنال |
| [[--name web]] | | سمّيه [[web]] بدل اسم عشوائي زي [[quirky_turing]] |
| [[-p 8080:80]] | publish (انشر) | بورت 8080 على جهازي يوصل لبورت 80 جوه الـ container |
| [[nginx:alpine]] | | القالب |

### [[-p 8080:80]] بالتفصيل

اقراها دايمًا **«عندي : جوه»**. nginx جوه الـ container بيسمع على 80، بس الـ container معزول، فمحدش يوصله إلا لو فتحت باب. [[-p]] هي الباب: أي حد يكلّم جهازك على 8080 يتحوّل لـ 80 جوه.

### الناتج

~~~text الناتج
1897ea7af3233e3165f284f7226573ec54b54d85f51d659b6fbeaf00cd3cb4cf
~~~

ده بس الـ **container ID** (رقمه الكامل)، ومعناه إنه اشتغل ورجّعلك الترمنال بسبب [[-d]]. نتأكد:

~~~bash
docker ps --filter name=web
curl -s localhost:8080 | grep title
~~~

~~~text الناتج
CONTAINER ID   IMAGE          COMMAND                  CREATED        STATUS                  PORTS                                     NAMES
1897ea7af323   nginx:alpine   "/docker-entrypoint.…"   1 second ago   Up Less than a second   0.0.0.0:8080->80/tcp, [::]:8080->80/tcp   web
<title>Welcome to nginx!</title>
~~~

عمود [[PORTS]]: [[0.0.0.0:8080->80/tcp]] يعني «كل عناوين الجهاز على 8080 رايحة لـ 80 جوه». [[0.0.0.0]] معناها كل الواجهات (الشبكة المحلية والنت لو السيرفر مكشوف)، و [[::]] نفس الكلام لـ IPv6.

---

## ٢. ترمنال جوه alpine

~~~bash
docker run -it --rm alpine sh
~~~

| الجزء | معناه |
|---|---|
| [[-i]] | interactive: سيب الـ stdin (الكيبورد) مفتوح للـ container |
| [[-t]] | tty: اعمل ترمنال حقيقي، فيظهر prompt وتشتغل الأسهم و Ctrl+C |
| [[-it]] | الاتنين مع بعض، ودايمًا بيتكتبوا كده |
| [[--rm]] | امسحه لما تخرج |
| [[sh]] | الأمر اللي يتشغّل جوه: الشيل. alpine مفيهاش bash |

جوه هتلاقي prompt شكله [[/ #]] (الـ [[/]] مكانك، و [[#]] يعني انت root). ولما تكتب [[ls /]]:

~~~text الناتج (جوه الـ container)
bin    dev    etc    home   lib    media  mnt    opt    proc
root   run    sbin   srv    sys    tmp    usr    var
~~~

ده نظام ملفات لينكس كامل، حتى لو جهازك ويندوز. و [[exit]] بيخرجك، والـ container بيقف ويتمسح بسبب [[--rm]].

> [[-it]] محتاجة ترمنال حقيقي. لو بعت أوامر بـ pipe (زي [[echo ls | docker run -it ...]]) هيطلع [[cannot attach stdin to a TTY-enabled container because stdin is not a terminal]]. في الحالة دي شيل [[-t]] وسيب [[-i]] بس.

---

## ٣. قاعدة بيانات بمتغير بيئة وبورت مقفول

~~~bash
docker run -d --name db -e POSTGRES_PASSWORD=secret -p 127.0.0.1:5432:5432 postgres:16
~~~

### [[-e POSTGRES_PASSWORD=secret]]

[[-e]] (environment) بيحط **متغير بيئة** جوه الـ container. صورة postgres الرسمية بتقرا المتغير ده أول مرة تقوم وتعمل بيه باسورد اليوزر [[postgres]]، ومن غيره بترفض تشتغل. نتأكد إنه وصل:

~~~bash
docker exec db env | grep POSTGRES
~~~

~~~text الناتج
POSTGRES_PASSWORD=secret
~~~

### [[-p 127.0.0.1:5432:5432]]

هنا [[-p]] فيها **تلات** أجزاء: [[عنوان:عندي:جوه]]. الجزء الأول [[127.0.0.1]] معناه «افتح البورت على الجهاز نفسه بس». على جهازنا 5432 كان مستخدم من قاعدة تانية، فجربناها على 5433 بدله ([[-p 127.0.0.1:5433:5432]]):

~~~text الناتج: docker ps
NAMES   STATUS         PORTS
db      Up 3 seconds   127.0.0.1:5433->5432/tcp
~~~

قارن بـ web فوق: هناك [[0.0.0.0]] (مفتوح لأي حد)، وهنا [[127.0.0.1]] (الجهاز ده بس). على سيرفر، Docker بيفتح البورت في الفايروول لوحده، فقاعدة بيانات بـ [[-p 5432:5432]] بتبقى مكشوفة للنت كله.

### آخر حاجة: [[postgres:16]]

مفيش أمر بعد اسم الـ image، فبيشتغل الأمر الافتراضي بتاعها (سيرفر postgres). أول مرة الـ image بتتنزل لوحدها لأنها مش موجودة.

---

## لما حاجة تقع

| الرسالة | السبب | الحل |
|---|---|---|
| [[Conflict. The container name "/web" is already in use]] | فيه container (حتى لو واقف) بنفس الاسم | [[docker rm -f web]] أو اسم تاني |
| [[Bind for 0.0.0.0:8080 failed: port is already allocated]] | حاجة تانية ماسكة 8080 على جهازك | غيّر الرقم **الشمال** بس: [[-p 8081:80]] |

---

## الخلاصة

| flag | معناه |
|---|---|
| [[-d]] | في الخلفية |
| [[--name]] | اسم ثابت تتعامل بيه |
| [[-p عندي:جوه]] | افتح بورت، و [[127.0.0.1:]] في الأول = للجهاز ده بس |
| [[-e KEY=VALUE]] | متغير بيئة |
| [[-it]] | ترمنال تفاعلي |
| [[--rm]] | امسحه لما يقف |

وكل ده **قبل** اسم الـ image. اللي بعده أمر بيتشغّل جوه.`,
          lines: [
            "في الخلفية، اسمه web، بورت 8080 عندك يروح لـ 80 جواه.",
            "ادخل alpine بترمنال تفاعلي، وامسحه لما تخرج.",
            "قاعدة بيانات: باسورد بمتغير بيئة، والبورت على 127.0.0.1 بس (مش مفتوح للنت)."
          ],
          sol: R`بعد [[docker run -d --name web -p 8080:80 nginx:alpine]] بيطبع رقم الـ container الطويل بس، و localhost:8080 بيفتح صفحة [[Welcome to nginx!]]. و [[docker ps]] بيوري [[0.0.0.0:8080->80/tcp]] في عمود PORTS.

[[docker run -it --rm alpine sh]] بيدخلك prompt [[/ #]]، و [[ls /]] بيطبع [[bin dev etc home lib media mnt opt proc root run sbin srv sys tmp usr var]]: نظام ملفات لينكس كامل صغير. و [[exit]] بيخرجك، وبسبب [[--rm]] الـ container بيتمسح ومش هيظهر حتى في [[docker ps -a]].

الغلط الشائع: [[Bind for 0.0.0.0:8080 failed: port is already allocated]]: فيه حاجة تانية على 8080، غيّر الرقم الشمال بس ([[-p 8081:80]]). و [[Conflict. The container name "/web" is already in use]] يعني فيه container قديم بنفس الاسم: [[docker rm -f web]].`
        },
        {
          cmd: "ps / stop / start / rm",
          title: "دورة حياة الـ container",
          desc: "الـ container ليه حالات: شغال، أو واقف، أو ممسوح. [[stop]] بيبعت إشارة إغلاق ويستنى ١٠ ثواني وبعدين يقتل. [[rm]] بيمسح الواقف بس، و [[-f]] يوقف ويمسح.",
          example: R`docker ps
docker ps -a
docker stop web
docker start web
docker rm -f web
docker container prune`,
          try: "وقّف web وشوفه في [[ps -a]] بحالة Exited، وبعدين رجّعه بـ start، ولاحظ إنه رجع بنفس الإعدادات من غير ما تكتبها تاني.",
          deep: {
            why: "محتاج تعرف إيه اللي شغال، وتوقّف وتشغّل من غير ما تعيد الإعدادات كل مرة، وتمسح اللي خلص دوره.",
            how: R`[[ps]] بيعرض الشغال بس، و [[-a]] كله حتى الواقف. العمود STATUS بيقولك Up من إمتى، أو Exited برقم بين قوسين هو الـ exit code.

[[stop]] مش بيقتل على طول. بيبعت إشارة SIGTERM للعملية رقم 1 جوه الـ container، ويستنى ١٠ ثواني تقفل بأدب (تخلص الطلبات، وتقفل اتصالات القاعدة)، ولو مقفلتش بيبعت SIGKILL. عشان كده الـ CMD لازم يبقى بالشكل [["node", "server.js"]] عشان node هو اللي يستلم الإشارة مش shell وسيط.

[[start]] بيرجّع container واقف بنفس إعداداته بالظبط: نفس البورتات والمتغيرات والـ volumes. مش محتاج تكتبهم تاني.

[[rm]] بيمسح الـ container (مش الـ image)، و [[-f]] يوقفه الأول. و [[container prune]] بيمسح كل الواقفين.`,
            when: "كل يوم: [[ps]] تشوف الحالة. [[restart]] بعد تغيير env. [[rm -f]] لتجارب خلصت.",
            mistakes: "إنك تستخدم [[docker kill]] كأنه stop. kill بيقتل فورًا من غير فرصة للإغلاق النضيف، وممكن يبوّظ بيانات. و [[rm]] لقاعدة بيانات من غير volume: البيانات راحت."
          },
          teach: R`## الـ container ليه ٣ حالات

~~~text
           docker stop                 docker rm
  شغال  ─────────────────▶  واقف  ─────────────────▶  ممسوح
 (Up)   ◀─────────────────  (Exited)
           docker start
~~~

الأوامر الستة في المثال بتنقّلك بين الحالات دي. كلها اتشغّلت على Docker Desktop 29 (ويندوز 11) على container nginx اسمه [[web]] من الدرس اللي فات، وبتتكتب زي ما هي في أي شيل.

---

## ١. [[docker ps]] و [[docker ps -a]]: مين موجود؟

[[ps]] اسمها جاي من أمر لينكس القديم process status. من غير حاجة بيعرض **الشغالين بس**، و [[-a]] (all) بيعرض الكل حتى الواقف:

~~~text الناتج: docker ps -a
CONTAINER ID   IMAGE          STATUS          NAMES
1897ea7af323   nginx:alpine   Up 22 minutes   web
~~~

(الجدول الحقيقي فيه كمان [[COMMAND]] و [[CREATED]] و [[PORTS]]، شلناهم هنا عشان يبان.)

| العمود | معناه |
|---|---|
| [[CONTAINER ID]] | أول ١٢ حرف من الرقم الكامل. تقدر تكتب أول ٣ حروف بس ([[docker stop 189]]) لو مفيش غيره بيبدأ بيهم |
| [[STATUS]] | [[Up ...]] شغال من قد إيه، أو [[Exited (رقم) ...]] واقف |
| [[NAMES]] | الاسم اللي اديته بـ [[--name]] |

---

## ٢. [[docker stop web]]: وقّف بأدب

~~~bash
docker stop web
docker ps -a --filter name=web
~~~

~~~text الناتج
web
NAMES   STATUS
web     Exited (0) Less than a second ago
~~~

[[--filter name=web]] بيعرض اللي اسمه فيه [[web]] بس بدل الجدول كله. والرقم بين القوسين هو **exit code**: الرقم اللي البرنامج خرج بيه.

### إيه اللي بيحصل جوه [[stop]]؟

1. Docker بيبعت **إشارة** (signal) للعملية رقم 1 جوه الـ container: «اقفل نفسك». الإشارة الافتراضية اسمها [[SIGTERM]] (terminate). صورة nginx بالذات طالبة [[SIGQUIT]] بدلها، وتقدر تشوف ده بـ [[docker inspect --format '{{.Config.StopSignal}}' nginx:alpine]].
2. بيستنى **١٠ ثواني** البرنامج يخلص اللي في إيده ويقفل.
3. لو لسه عايش، بيبعت [[SIGKILL]]: قتل فوري مبيتردش.

جربناها مرتين:

| الـ container | وقت [[docker stop]] | الحالة بعدها |
|---|---|---|
| nginx (بيسمع الإشارة) | 0.8 ثانية | [[Exited (0)]] |
| [[alpine sleep 600]] ([[sleep]] كـ PID 1 بيتجاهلها) | 10.9 ثانية | [[Exited (137)]] |

> [[137]] = 128 + 9، و 9 رقم [[SIGKILL]]. يعني لما تشوف 137 افهم: «اتقتل بالعافية بعد ما المهلة خلصت». و [[0]] يعني قفل لوحده من غير مشاكل.

---

## ٣. [[docker start web]]: رجّعه زي ما كان

~~~text الناتج: docker start web ثم docker ps
web
NAMES   STATUS                  PORTS
web     Up Less than a second   0.0.0.0:8080->80/tcp, [::]:8080->80/tcp
~~~

لاحظ إن البورت رجع لوحده من غير ما تكتب [[-p]]. الإعدادات كلها (البورتات، والمتغيرات، والـ volumes) محفوظة **في الـ container نفسه**، و [[start]] بيشغّل نفس الـ container مش واحد جديد. عشان كده:

| الأمر | بيعمل إيه |
|---|---|
| [[docker start web]] | يشغّل container **موجود** وواقف |
| [[docker run ... nginx:alpine]] | يعمل container **جديد** من الـ image |

ولو كتبت [[run]] بنفس الاسم تاني هيقولك [[Conflict. The container name "/web" is already in use]].

---

## ٤. [[docker rm -f web]]: امسحه

[[rm]] (remove) بيمسح الـ container، **مش** الـ image. بس مبيمسحش container شغال:

~~~text الناتج: docker rm web وهو شغال
Error response from daemon: cannot remove container "web": container is running: stop the container before removing or force remove
~~~

و [[-f]] (force) بتعمل الخطوتين مرة واحدة: توقفه وتمسحه، وبتطبع اسمه بس. وأي بيانات اتكتبت جوه الـ container ومش في volume بتروح معاه.

---

## ٥. [[docker container prune]]: امسح كل الواقفين

[[prune]] يعني «قلّم»: بيمسح **كل** الـ containers الواقفة على الجهاز مرة واحدة، بتوعك وبتوع أي مشروع تاني، وبيسألك قبلها سؤال تأكيد تجاوب عليه بـ y أو N. وصفه من [[docker container prune --help]]:

~~~text الناتج
Usage:  docker container prune [OPTIONS]

Remove all stopped containers

Options:
      --filter filter   Provide filter values (e.g. "until=<timestamp>")
  -f, --force           Do not prompt for confirmation
~~~

مشغّلناهوش هنا لأنه كان هيمسح containers واقفة لمشاريع تانية على نفس الجهاز. لو عندك container واقف «مهم» (قاعدة بيانات بايتة مثلًا) هيروح. فاقرا [[docker ps -a]] الأول، أو امسح بالاسم.

---

## الخلاصة

| الأمر | من | لـ |
|---|---|---|
| [[docker ps]] / [[ps -a]] | | يعرض الشغالين / الكل |
| [[docker stop]] | شغال | واقف (إشارة، ١٠ ثواني، وبعدين قتل) |
| [[docker start]] | واقف | شغال بنفس الإعدادات |
| [[docker rm]] / [[rm -f]] | واقف / أي حالة | ممسوح |
| [[docker container prune]] | كل الواقفين على الجهاز | ممسوحين |

~~~text
Exited (0)     قفل لوحده تمام
Exited (137)   اتقتل بعد مهلة الـ 10 ثواني (128 + 9)
~~~`,
          lines: [
            "الشغال.",
            "الكل حتى الواقف.",
            "وقّف بأدب (إشارة إغلاق، وبعد ١٠ ثواني قتل).",
            "رجّعه بنفس إعداداته.",
            "وقّفه وامسحه في خطوة.",
            "امسح كل الواقفين."
          ],
          sol: R`بعد [[docker stop web]] (بيطبع [[web]] بس)، [[docker ps]] مش هيوريه، و [[docker ps -a]] بيوريه بحالة [[Exited (0) ... ago]]. الـ 0 معناها إن nginx قفل بهدوء لما استلم الإشارة.

[[docker start web]] بيرجّعه، و [[docker ps]] بيوريه [[Up ...]] وبنفس [[0.0.0.0:8080->80/tcp]] ونفس الاسم، والصفحة بتفتح تاني. ده لأن الإعدادات محفوظة في الـ container نفسه، و start بيشغّل نفس الـ container مش واحد جديد.

الغلط الشائع: تعمل [[docker run]] تاني بدل [[start]]، فيطلعلك [[The container name "/web" is already in use]]. و [[Exited (137)]] بدل 0 معناها إنه اتقتل بالعافية بعد ١٠ ثواني لأنه ماسمعش الإشارة، ودي مشكلة في التطبيق (درس entrypoint.sh و exec).`
        },
        {
          cmd: "docker logs",
          title: "اللي التطبيق بيطبعه",
          desc: R`Docker بيمسك أي حاجة التطبيق بيطبعها على الشاشة (stdout للعادي و stderr للأخطاء) ويحفظها، ودي لوجات الـ container. [[docker logs web]] بيطبع كل اللي اتحفظ للـ container اللي اسمه web من ساعة ما اشتغل. عشان كده التطبيق جوه Docker لازم يطبع على الشاشة مش يكتب في ملف لوج جواه، وإلا الأمر ده مش هيلاقي حاجة.

[[-f]] (follow) بيفضل مفتوح ويطبع أي سطر جديد لايف، و Ctrl+C للخروج. [[--tail 100]] آخر 100 سطر بس بدل التاريخ كله. [[--since 10m]] اللي اتكتب في آخر 10 دقايق (و [[h]] ساعات). وعشان تفلتر بـ grep: الأخطاء طالعة على stderr والـ pipe بياخد stdout بس، فـ [[2>&1]] بتضم الاتنين الأول، و [[grep -i]] بيدوّر من غير فرق بين كابيتال وسمول.

خد بالك: ملف اللوج بيكبر من غير حد لو مضبطتلوش [[max-size]]، وممكن يملى الديسك.`,
          example: R`docker logs web
docker logs -f --tail 100 web
docker logs --since 10m web
docker logs web 2>&1 | grep -i error`,
          try: "افتح localhost:8080 كذا مرة وشوف كل زيارة بتظهر في [[docker logs -f web]].",
          deep: {
            why: "التطبيق جوه container مفيش ترمنال تشوف فيه بيطبع إيه. [[logs]] هو الطريقة الوحيدة تعرف ليه وقع أو بيعمل إيه.",
            how: R`Docker بيمسك كل اللي التطبيق بيكتبه على stdout و stderr ويحفظه في ملف JSON لكل container. [[logs]] بيقرا الملف ده. عشان كده التطبيق جوه Docker لازم يطبع على الشاشة، مش يكتب في ملف لوج جوه الـ container، وإلا مش هتشوف حاجة.

[[-f]] يتابع لايف زي tail -f. [[--tail 100]] آخر ١٠٠ سطر بدل التاريخ كله. [[--since 10m]] أو [[--since 2026-09-25T10:00]] من وقت معين. و [[-t]] يضيف وقت لكل سطر.

الأخطاء بتطلع على stderr، فلو عايز تفلترها بـ grep لازم [[2>&1]] الأول، لأن الـ pipe بياخد stdout بس.

الملف ده بيكبر للأبد لو مضبطش له حد. في daemon.json أو compose تحدد [[max-size]] و [[max-file]].`,
            when: "أول حاجة لما container يقع أو يتصرف غريب. وأثناء التطوير بـ [[-f]].",
            mistakes: "لوجات بتكبر لحد ما تملى الديسك. حط حد في compose: [[logging: driver: json-file, options: max-size: 10m, max-file: 3]]. وتطبيق بيكتب لوجاته في ملف جوه الـ container فمفيش حاجة في [[docker logs]]."
          },
          teach: R`## اللوجات = اللي البرنامج طبعه على الشاشة

أي برنامج بيطبع على قناتين: **stdout** (standard output، الكلام العادي) و **stderr** (standard error، الأخطاء والتحذيرات). Docker بيمسك القناتين ويحفظهم لكل container، و [[docker logs]] بيقراهم. السطور الأربعة في المثال نفس الأمر بفلاتر مختلفة.

جربناها على container nginx اسمه [[web]] (من درس «docker run») على Docker Desktop 29، وقبلها فتحنا الصفحة ٣ مرات وطلبنا صفحة مش موجودة [[/nope]] مرة.

---

## ١. [[docker logs web]]: كل اللوج

~~~text الناتج (آخر ٦ سطور)
172.17.0.1 - - [06/Oct/2026:12:02:23 +0000] "GET / HTTP/1.1" 200 896 "-" "curl/8.22.0" "-"
172.17.0.1 - - [06/Oct/2026:12:02:29 +0000] "GET / HTTP/1.1" 200 896 "-" "curl/8.22.0" "-"
172.17.0.1 - - [06/Oct/2026:12:02:29 +0000] "GET / HTTP/1.1" 200 896 "-" "curl/8.22.0" "-"
172.17.0.1 - - [06/Oct/2026:12:02:29 +0000] "GET / HTTP/1.1" 200 896 "-" "curl/8.22.0" "-"
172.17.0.1 - - [06/Oct/2026:12:02:29 +0000] "GET /nope HTTP/1.1" 404 153 "-" "curl/8.22.0" "-"
2026/10/06 12:02:29 [error] 26#26: *5 open() "/usr/share/nginx/html/nope" failed (2: No such file or directory), client: 172.17.0.1, ...
~~~

### نقرا سطر زيارة

| الحتة | معناها |
|---|---|
| [[172.17.0.1]] | مين اللي طلب. ده عنوان جهازك من ناحية شبكة Docker الداخلية |
| الوقت بين القوسين المربعين | الوقت، و [[+0000]] يعني توقيت UTC مش توقيت مصر |
| [[GET / HTTP/1.1]] | نوع الطلب والصفحة |
| [[200]] | كود الرد: 200 تمام، 404 مش موجود |
| [[896]] | حجم الرد بالـ byte |
| [[curl/8.22.0]] | البرنامج اللي طلب (المتصفح هيكتب [[Mozilla/5.0 ...]]) |

وآخر سطر مختلف: سطر [[error]] اللي بين قوسين من nginx بيقول إنه دوّر على ملف [[nope]] ومالقاهوش. السطر ده طالع على **stderr** مش stdout، وده هيفرق في السطر الرابع.

---

## ٢. [[docker logs -f --tail 100 web]]: تابع لايف

| الجزء | معناه |
|---|---|
| [[-f]] | follow: متقفلش، واطبع أي سطر جديد أول ما يتكتب (زي [[tail -f]] في لينكس) |
| [[--tail 100]] | ابدأ من آخر ١٠٠ سطر بس، مش من أول يوم |

جربناها بـ [[--tail 1]]، وفي نفس الوقت طلبنا [[/live]] من ترمنال تاني:

~~~text الناتج
2026/10/06 12:02:29 [error] 26#26: *5 open() "/usr/share/nginx/html/nope" failed ...
172.17.0.1 - - [06/Oct/2026:12:02:43 +0000] "GET /live HTTP/1.1" 404 153 "-" "curl/8.22.0" "-"
2026/10/06 12:02:43 [error] 27#27: *6 open() "/usr/share/nginx/html/live" failed ...
~~~

أول سطر قديم (ده الـ tail)، والسطرين اللي بعده ظهروا لحظة الطلب. الأمر بيفضل ماسك الترمنال. [[Ctrl+C]] بيقفل **المتابعة** بس، والـ container نفسه لسه شغال.

---

## ٣. [[docker logs --since 10m web]]: آخر ١٠ دقايق

[[--since]] بياخد مدة: [[10m]] دقايق، [[2h]] ساعات، [[30s]] ثواني. أو تاريخ ووقت زي [[2026-10-06T12:00]]. مفيد على سيرفر شغال من شهور واللوج فيه ملايين السطور.

---

## ٤. [[docker logs web 2>&1 | grep -i error]]: دوّر على الأخطاء

ده أطول سطر، فنفكه بالترتيب:

### الخطوة ١: الـ pipe [[|]]

[[|]] بياخد ناتج الأمر اللي على شماله ويديه للي على يمينه. بس بياخد **stdout بس**. و [[docker logs]] بيطلّع سطور الـ container على نفس القناة اللي اتكتبت عليها: العادي على stdout، والأخطاء على stderr.

### الخطوة ٢: من غير [[2>&1]] الـ grep مش شايف الأخطاء

~~~bash
docker logs web 2>/dev/null | grep -ci error
~~~

~~~text الناتج
0
~~~

هنا رمينا stderr ([[2>/dev/null]]) عشان نشوف اللي واصل للـ pipe لوحده: صفر سطر فيه error، مع إن فيه سطر [[error]] اللي بين قوسين في اللوج. (و [[-c]] في grep بتعدّ السطور بدل ما تطبعها.)

### الخطوة ٣: [[2>&1]] تضم القناتين

| الرمز | معناه |
|---|---|
| [[2]] | رقم stderr (و [[1]] رقم stdout) |
| [[>]] | وجّه |
| [[&1]] | لنفس المكان اللي رايح له 1 |

يعني «خلّي الأخطاء تمشي في نفس طريق الكلام العادي»، فالـ pipe ياخدهم الاتنين:

~~~text الناتج: docker logs web 2>&1 | grep -i error
2026/10/06 12:02:29 [error] 26#26: *5 open() "/usr/share/nginx/html/nope" failed (2: No such file or directory), client: 172.17.0.1, server: localhost, request: "GET /nope HTTP/1.1", host: "localhost:8080"
~~~

### الخطوة ٤: [[grep -i error]]

[[grep]] بيطبع السطور اللي فيها الكلمة، و [[-i]] (ignore case) يعني [[error]] و [[ERROR]] و [[Error]] كلهم واحد.

### نفس السطر في PowerShell

[[2>&1]] شغالة زي ما هي، بس [[grep]] مش موجود، وبداله [[Select-String]]:

~~~powershell
docker logs web 2>&1 | Select-String -Pattern error
~~~

جربناها في PowerShell 7 وطلّعت نفس سطر الـ [[error]] اللي بين قوسين. و [[Select-String]] من غير حاجة مش بيفرّق بين كابيتال وسمول أصلًا، فمش محتاج [[-i]].

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[docker logs web]] | كل اللي اتطبع من ساعة ما الـ container اتعمل |
| [[-f]] | تابع الجديد لايف (Ctrl+C يقفل المتابعة بس) |
| [[--tail N]] | آخر N سطر |
| [[--since 10m]] | من وقت معين |
| [[2>&1]] وبعدها grep | ضم الأخطاء للعادي وفلتر |

~~~text
stdout (1)   الكلام العادي، والـ pipe بياخده
stderr (2)   الأخطاء، ومحتاجة 2>&1 عشان توصل للـ pipe
~~~

والتطبيق لازم يطبع على الشاشة: لو بيكتب لوجاته في ملف جوه الـ container، [[docker logs]] هيطلع فاضي.`,
          lines: [
            "كل اللوج.",
            "آخر ١٠٠ سطر وتابع الجديد.",
            "آخر ١٠ دقايق.",
            "دوّر على error. [[2>&1]] لازمة لأن الأخطاء على stderr والـ pipe بياخد stdout."
          ],
          sol: R`كل ما تفتح الصفحة بيظهر سطر جديد لحظيًا في [[docker logs -f web]] بالشكل:

[[172.17.0.1 - - [30/Sep/2026:04:43:46 +0000] "GET / HTTP/1.1" 200 615 "-" "Mozilla/5.0 ..."]]. الـ [[172.17.0.1]] ده عنوان جهازك من ناحية شبكة Docker، والـ 200 كود الرد. ولو طلبت صفحة مش موجودة هتلاقي سطر 404، وقبله سطر [[[error] ... open() "/usr/share/nginx/html/nope" failed]].

[[Ctrl+C]] بيقفل المتابعة بس، والـ container لسه شغال. الغلط الشائع: تشوف اللوج فاضي وانت فاتح [[localhost:8080]] على container تاني أو بورت تاني؛ اتأكد بـ [[docker ps]]. وكمان المتصفح ممكن يجيب الصفحة من الكاش فمايوصلش طلب؛ اعمل Ctrl+F5.`
        },
        {
          cmd: "docker exec",
          title: "ادخل جوه container شغال",
          desc: "بيشغّل أمر جوه container شغال. [[-it]] مع sh أو bash بيديك ترمنال جواه. مفيد تشوف الملفات وتجرّب أوامر، بس افتكر: أي تعديل جواه بيروح لما الـ container يتعمل من جديد.",
          example: R`docker exec -it web sh
docker exec web ls /usr/share/nginx/html
docker exec -it db psql -U postgres
docker exec -u root -it web sh`,
          try: "ادخل web وشوف ملف الإعدادات: [[cat /etc/nginx/nginx.conf]]. اخرج بـ exit، والـ container لسه شغال.",
          deep: {
            why: "محتاج تبص جوه container شغال: الملفات وصلت؟ متغير البيئة صح؟ تشغّل psql على قاعدة البيانات اللي جواه؟",
            how: R`[[exec]] بيشغّل عملية إضافية جوه container شغال بالفعل (غير [[run]] اللي بيعمل container جديد). مع [[-it sh]] بيديك ترمنال جواه، وتخرج بـ exit من غير ما الـ container يقف.

الصور الصغيرة (alpine) مفيهاش bash، فيها sh بس. لو [[bash]] قالك not found، جرّب [[sh]].

افتراضيًا بتدخل باليوزر اللي التطبيق شغال بيه. لو محتاج root عشان تسطّب أداة مؤقتة: [[-u root]].

وأهم قاعدة: أي حاجة تعملها جوه الـ container بـ exec مؤقتة. لو عدّلت ملف إعدادات وشغّل، أول ما الـ container يتعمل من جديد التعديل بيروح. الصح تعدّل في الكود أو الـ Dockerfile وتعيد الـ build.`,
            when: "تشخيص: تشوف الملفات والمتغيرات. تشغّل psql أو redis-cli على القاعدة اللي في container. تشغّل migration مرة واحدة.",
            mistakes: "تصلّح مشكلة بتعديل جوه الـ container وتفتكر إنها اتحلت. بعد أول deploy المشكلة هترجع."
          },
          teach: R`## [[exec]] = شغّل أمر جوه container **شغال بالفعل**

[[docker run]] بيعمل container جديد. [[docker exec]] مبيعملش حاجة جديدة: بيدخل container موجود وشغال، ويشغّل جنب التطبيق برنامج إضافي. الشكل العام:

~~~text
docker exec   [flags]   اسم-الـ-container   الأمر
~~~

جربنا السطور على container nginx اسمه [[web]] و container postgres اسمه [[db]] (من درس «docker run»)، على Docker Desktop 29.

---

## ١. [[docker exec -it web sh]]: ترمنال جوه

| الجزء | معناه |
|---|---|
| [[-i]] | سيب الكيبورد متوصل بالأمر |
| [[-t]] | اعمل ترمنال (prompt وأسهم و Ctrl+C) |
| [[web]] | أنهي container. اسمه أو أول حروف الـ ID |
| [[sh]] | الأمر: الشيل. صور alpine مفيهاش [[bash]] |

بيفتحلك prompt [[/ #]] جوه الـ container، وتقدر تلف براحتك:

~~~text جوه الـ container
/ # cat /etc/nginx/nginx.conf

user  nginx;
worker_processes  auto;
...
/ # exit
~~~

ولما تكتب [[exit]]، اللي بيموت هو [[sh]] بس، و nginx لسه شغال، و [[docker ps]] لسه بيوري [[web]] [[Up]].

لو جربت [[bash]]:

~~~text الناتج
OCI runtime exec failed: exec failed: unable to start container process: exec: "bash": executable file not found in $PATH
~~~

يعني البرنامج ده مش موجود جوه الـ image. استخدم [[sh]].

---

## ٢. [[docker exec web ls /usr/share/nginx/html]]: أمر واحد من بره

من غير [[-it]]: الأمر بيتنفّذ، الناتج بيتطبع عندك، وخلاص. مفيش دخول:

~~~text الناتج
50x.html
index.html
~~~

[[/usr/share/nginx/html]] الفولدر اللي nginx بيقدّم منه الصفحات، و [[index.html]] هي صفحة «Welcome to nginx!».

### فخ في Git Bash على ويندوز

نفس السطر في Git Bash طلّع:

~~~text الناتج في Git Bash
ls: C:/Program Files/Git/usr/share/nginx/html: No such file or directory
~~~

Git Bash بيشوف أي كلمة بتبدأ بـ [[/]] على إنها مسار ويندوز، فبيحوّلها لمسار جوه فولدر Git **قبل** ما يبعتها لـ docker. الحل واحد من دول (الاتنين اتجربوا وطلّعوا [[50x.html]] و [[index.html]]):

~~~bash
MSYS_NO_PATHCONV=1 docker exec web ls /usr/share/nginx/html
docker exec web ls //usr/share/nginx/html
~~~

[[MSYS_NO_PATHCONV=1]] متغير بيقفل التحويل للأمر ده بس، و [[//]] في الأول بتقوله «ده مش مسار ويندوز». أما PowerShell ولينكس والماك فمفيهمش المشكلة دي أصلًا.

---

## ٣. [[docker exec -it db psql -U postgres]]: افتح قاعدة البيانات

| الجزء | معناه |
|---|---|
| [[db]] | container postgres |
| [[psql]] | برنامج سطر الأوامر بتاع PostgreSQL، موجود جوه الـ image أصلًا |
| [[-U postgres]] | ادخل باليوزر [[postgres]] (User) |

بيفتحلك prompt [[postgres=#]] تكتب فيه SQL. جربناه بأمر واحد بدل الدخول التفاعلي:

~~~bash
docker exec db psql -U postgres -c 'select version();'
~~~

~~~text الناتج
                                                       version
----------------------------------------------------------------------------------------------------------------------
 PostgreSQL 16.15 (Debian 16.15-1.pgdg13+2) on x86_64-pc-linux-gnu, compiled by gcc (Debian 14.2.0-19) 14.2.0, 64-bit
~~~

[[-c]] (command) يعني «نفّذ الجملة دي واخرج». والفايدة: مش محتاج تسطّب psql على جهازك خالص.

---

## ٤. [[docker exec -u root -it web sh]]: ادخل كـ root

[[-u]] (user) بيحدد اليوزر اللي الأمر يشتغل بيه. افتراضيًا [[exec]] بيستخدم نفس يوزر الـ container. في nginx:alpine ده أصلًا [[root]]:

~~~bash
docker exec web whoami
docker exec -u root web whoami
~~~

~~~text الناتج
root
root
~~~

بس في image معمولة صح بـ [[USER node]] (درس «USER و HEALTHCHECK») هتدخل كـ [[node]]، وساعتها [[-u root]] هي اللي تخليك تسطّب أداة تشخيص زي [[apk add curl]].

---

## أهم قاعدة

أي تعديل بتعمله بـ exec **مؤقت**: بيعيش في طبقة الكتابة بتاعة الـ container ده بس. أول ما الـ container يتمسح ويتعمل من الـ image تاني (deploy جديد، أو [[docker compose up]] بعد تغيير)، التعديل بيروح. التصليح الحقيقي في الكود أو الـ Dockerfile.

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[docker exec -it NAME sh]] | ترمنال جوه container شغال |
| [[docker exec NAME أمر]] | أمر واحد وترجع |
| [[docker exec -it db psql -U postgres]] | عميل القاعدة اللي جوه الـ image |
| [[-u root]] | اشتغل كـ root |

~~~text
run    container جديد من image
exec   أمر زيادة جوه container شغال (لو واقف: is not running)
~~~`,
          lines: [
            "ترمنال جوه web (sh لأن alpine مفيهاش bash).",
            "نفّذ أمر واحد جواه من غير ما تدخل.",
            "افتح psql جوه container القاعدة.",
            "ادخل كـ root ([[-u]]) لو محتاج تسطّب أداة مؤقتة."
          ],
          sol: R`[[docker exec -it web sh]] بيدخلك [[/ #]] جوه الـ container الشغال. و [[cat /etc/nginx/nginx.conf]] بيبدأ بـ [[user nginx;]] و [[worker_processes auto;]]، وفيه [[include /etc/nginx/conf.d/*.conf;]] اللي بيقرا ملف الموقع [[default.conf]].

بعد [[exit]]، [[docker ps]] لسه بيوري web شغال، لأن exec بيشغّل برنامج إضافي (sh) جنب nginx، ولما تخرج بيموت sh بس.

الغلط الشائع: [[docker exec -it web bash]] يطلع [[exec: "bash": executable file not found]]، لأن صور alpine فيها [[sh]] بس. ولو قال [[is not running]] يبقى الـ container واقف، و exec مايشتغلش غير على container شغال.`
        },
        {
          cmd: "images / tags / rmi",
          title: "النسخ والأسامي",
          desc: "الـ image ليها اسم و tag بعد نقطتين. من غير tag معناه [[latest]]، وده اسم عادي مش «الأحدث» فعلًا. في الإنتاج حدد نسخة بالظبط زي [[node:22-alpine]]، وإلا الـ build بتاعك يتغير من غير ما تعرف.",
          example: R`docker images
docker pull node:22-alpine
docker tag myapp:latest myapp:1.2.0
docker rmi nginx:alpine
docker image prune`,
          try: "اعمل tag تاني لأي image عندك، وشوف في [[docker images]] إن الاتنين ليهم نفس IMAGE ID (نفس الملف باسمين).",
          deep: {
            why: "الـ image اللي بتبني عليها بتتحدّث باستمرار. لو مش محدد نسخة، الـ build بتاعك النهارده مختلف عن بكرة من غير ما تغيّر حرف، وممكن يبوظ.",
            how: R`اسم الـ image بيتكون من: [registry/]المستودع:tag. مثلًا [[ghcr.io/user/myapi:1.2.0]]. من غير registry معناه Docker Hub. من غير tag معناه [[latest]].

[[latest]] مجرد اسم tag زي أي اسم، مش معناه الأحدث فعلًا. لو عملت push بـ tag 1.2.0، الـ latest متغيرتش. عشان كده الاعتماد على latest في الإنتاج غلط: مش عارف بتشغّل إيه بالظبط.

[[node:22-alpine]] بيقول: Node 22 على Alpine (نظام صغير جدًا، حوالي ٥ ميجا). أما [[node:22]] فعلى Debian كامل، أكبر بكتير. الأول أنسب للإنتاج غالبًا.

[[tag]] بيعمل اسم إضافي لنفس الـ image (نفس الملفات، مش نسخة). [[rmi]] بيمسح image، ومش هيقدر لو فيه container بيستخدمها.`,
            when: "قبل أي build للإنتاج: حدد نسخة الـ base image. وقبل push: tag بنسخة واضحة.",
            mistakes: "[[FROM node]] أو [[FROM node:latest]] في Dockerfile. بعد شهور Node 24 يطلع وتطبيقك يبوظ من غير ما تعمل حاجة."
          },
          teach: R`## اسم الـ image له أجزاء

قبل الأوامر، لازم تقرا الاسم صح:

~~~text
ghcr.io  /  user  /  myapi  :  1.2.0
   │         │        │         │
   │         │        │         └─ tag: النسخة (من غيره = latest)
   │         │        └─ اسم الـ image
   │         └─ الحساب أو المنظمة
   └─ الـ registry (من غيره = docker.io يعني Docker Hub)
~~~

فـ [[nginx:alpine]] اسمها الكامل [[docker.io/library/nginx:alpine]]، و [[library]] هو حساب الصور الرسمية. كل اللي تحت اتشغّل على Docker Desktop 29 (ويندوز 11)، ونفس الكتابة في أي شيل.

---

## ١. [[docker images]]: اللي عندك

~~~text الناتج (مختصر)
IMAGE            ID             DISK USAGE   CONTENT SIZE   EXTRA
nginx:alpine     df221db836e1       94.4MB         27.2MB   U
node:22-alpine   0a7108bf6c7b        238MB         61.1MB   U
node:22-slim     c3de60bf2f9d        329MB         82.5MB
~~~

[[U]] في عمود [[EXTRA]] يعني In Use: فيه container (شغال أو واقف) معمول منها.

---

## ٢. [[docker pull node:22-alpine]]: نسخة محددة

الـ tag هنا [[22-alpine]]، ومعناه حاجتين مع بعض: **Node 22** و **مبنية على Alpine**. قارن:

| الـ tag | جواه | الحجم على جهازنا |
|---|---|---|
| [[node:22-alpine]] | Node 22 على Alpine | 238MB |
| [[node:22-slim]] | Node 22 على Debian مصغّرة | 329MB |
| [[node:22]] | Node 22 على Debian كاملة بأدوات البناء | أكبر بكتير، حوالي الجيجا (منزلناهاش، الرقم من صفحتها على Docker Hub) |

~~~text الناتج
22-alpine: Pulling from library/node
...
Status: Image is up to date for node:22-alpine
docker.io/library/node:22-alpine
~~~

[[Image is up to date]] لأنها كانت عندنا. أول مرة هتشوف [[Downloaded newer image]].

### ليه مش [[latest]]؟

[[latest]] **مجرد اسم tag** زي أي اسم، صاحب الـ image بيحطه على النسخة اللي هو عايزها. مش معناه «الأحدث» تلقائي. و [[node]] من غير tag النهارده Node 24 مثلًا، وبعد سنة حاجة تانية، فالـ build بتاعك يتغير لوحده. [[22-alpine]] بيثبّت الرقم الكبير على الأقل.

---

## ٣. [[docker tag myapp:latest myapp:1.2.0]]: اسم تاني

[[tag]] هنا **أمر** مش جزء من اسم: بيدّي image موجودة اسم إضافي. الشكل [[docker tag الاسم-الموجود الاسم-الجديد]].

السطر زي ما هو في المثال على جهاز لسه مبناش [[myapp]] بيطلّع:

~~~text الناتج
Error response from daemon: No such image: myapp:latest
~~~

فجربناه على image موجودة فعلًا:

~~~bash
docker tag nginx:alpine myweb:1.0
docker images
~~~

~~~text الناتج
IMAGE          ID             DISK USAGE   CONTENT SIZE   EXTRA
myweb:1.0      df221db836e1       94.4MB         27.2MB   U
nginx:alpine   df221db836e1       94.4MB         27.2MB   U
~~~

بص على عمود [[ID]]: **نفس الرقم**. يعني مفيش نسخة اتعملت والديسك مازادش ولا byte. هو ملصق تاني على نفس العلبة. وده اللي بتعمله قبل ما ترفع: تبني باسم، وتدّيها اسم فيه رقم النسخة.

---

## ٤. [[docker rmi nginx:alpine]]: امسح image

[[rmi]] = remove image. ولو الاسم ده ملصق من اتنين، بيشيل الملصق بس:

~~~text الناتج: docker rmi myweb:1.0
Untagged: myweb:1.0
~~~

[[Untagged]] من غير [[Deleted]]، لأن [[nginx:alpine]] لسه بيشاور على نفس الطبقات. ولو فيه container معمول منها، بيرفض:

~~~text الناتج: docker rmi nginx:alpine (و web معمول منها)
Error response from daemon: conflict: unable to delete nginx:alpine (must be forced) - container 1897ea7af323 is using its referenced image df221db836e1
~~~

الحل: امسح الـ container الأول ([[docker rm -f web]])، وبعدين الـ image.

---

## ٥. [[docker image prune]]: الصور المعلّقة

صورة **dangling** (معلّقة) هي image من غير اسم، بتظهر [[<none>:<none>]]. بتتولد لما تبني باسم موجود: الاسم بيروح للـ image الجديدة، والقديمة تفضل من غير اسم. [[docker image prune]] بيمسحهم **كلهم على الجهاز**، وبيسألك y/N الأول:

~~~text الناتج: docker image prune --help
Usage:  docker image prune [OPTIONS]

Remove unused images

Options:
  -a, --all             Remove all unused images, not just dangling ones
      --filter filter   Provide filter values (e.g. "until=<timestamp>")
  -f, --force           Do not prompt for confirmation
~~~

مشغّلناهوش هنا لأنه بيمسح لكل المشاريع اللي على الجهاز. و [[-a]] أخطر بكتير: بيمسح **أي** image مفيش container بيستخدمها، يعني هتنزّل كل حاجة تاني.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[docker images]] | الصور اللي عندك |
| [[docker pull name:tag]] | نزّل نسخة محددة |
| [[docker tag قديم جديد]] | اسم إضافي لنفس الـ image (نفس الـ ID) |
| [[docker rmi name:tag]] | شيل الاسم، وامسح الطبقات لو مفيش اسم تاني |
| [[docker image prune]] | امسح الصور المعلّقة على الجهاز كله |

~~~text
latest   اسم tag عادي، مش «الأحدث»
U        فيه container معمول من الـ image، و rmi هيرفض
~~~`,
          lines: [
            "الصور عندك.",
            "نزّل نسخة محددة من Node.",
            "اسم تاني لنفس الصورة (مش نسخة).",
            "امسح صورة.",
            "امسح الصور المعلّقة (من غير tag)."
          ],
          sol: R`بعد [[docker tag nginx:alpine myweb:1.0]] (مش بيطبع حاجة)، [[docker images]] بيوري سطرين: [[nginx:alpine df221db836e1]] و [[myweb:1.0 df221db836e1]]، بنفس الـ ID ونفس الحجم.

ده معناه إن الـ tag مجرد اسم تاني لنفس الـ image، مفيش نسخة اتعملت والديسك مازادش. [[docker rmi myweb:1.0]] بيطبع [[Untagged: myweb:1.0]] بس ومش بيمسح أي طبقات، لأن الاسم التاني لسه بيشاور عليها.

الغلط الشائع: [[docker tag myapp:latest ...]] يطلع [[No such image]] لأنك لسه مبنتش image بالاسم ده؛ استخدم اسم ظاهر في [[docker images]]. و [[docker rmi]] يرفض بـ [[image is being used by running container]]: امسح الـ container الأول.`,
          solCode: R`docker tag nginx:alpine myweb:1.0
docker images
docker rmi myweb:1.0`
        },
        {
          cmd: "inspect / stats",
          title: "معلومات وتفاصيل",
          desc: "[[inspect]] بيطبع كل حاجة عن container أو image كـ JSON: الـ IP، والـ volumes، والمتغيرات، وسبب الوقوف. و [[--format]] بيطلّع حقل معين. و [[stats]] استهلاك المعالج والرام لايف.",
          example: R`docker inspect web
docker inspect --format '{{.State.Status}}' web
docker inspect --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' web
docker stats --no-stream`,
          try: "طلّع IP الـ web بـ inspect، وبعدين [[curl]] عليه من جهازك (على لينكس هيشتغل مباشرة).",
          deep: {
            why: "لما حاجة مش مفهومة: الـ container بيسمع على إيه؟ الـ volume مربوط فين؟ ليه وقع؟ [[inspect]] عنده كل الإجابات، و [[stats]] بيقولك مين بياكل الموارد.",
            how: R`[[inspect]] بيطبع JSON ضخم فيه كل إعدادات الـ container: الحالة (State) وفيها ExitCode وسبب الوقوف، والشبكة (NetworkSettings) وفيها الـ IP، والـ Mounts، والـ Config وفيها المتغيرات والأمر.

[[--format]] بياخد قالب Go بين أقواس معقوفة مزدوجة، وبيطلّع حقل واحد. [[{{.State.Status}}]] الحالة. [[{{json .Config.Env}}]] المتغيرات كـ JSON.

أو [[docker inspect api | jq '.[0].State']] لو jq متسطب، وده أسهل.

[[stats]] زي htop للـ containers: المعالج، والرام مقارنة بالحد، والشبكة، والديسك. [[--no-stream]] لقطة واحدة بدل التحديث المستمر.`,
            when: "container وقع ومش عارف ليه. تعرف IP container. تتأكد إن الـ volume مربوط صح. السيرفر بطيء ومين السبب.",
            mistakes: "تقرا JSON الـ inspect كله. استخدم [[--format]] أو jq على الجزء اللي محتاجه."
          },
          teach: R`## سؤالين: «إنت متظبط إزاي؟» و «بتاكل قد إيه؟»

[[docker inspect]] بيجاوب الأول: كل إعدادات وحالة الـ container في JSON. و [[docker stats]] بيجاوب التاني: المعالج والرام دلوقتي. جربناهم على [[web]] (nginx) و [[db]] (postgres) على Docker Desktop 29، وأوامر [[--format]] اتجربت كمان في PowerShell 7 وطلّعت نفس الناتج.

---

## ١. [[docker inspect web]]: كل حاجة

~~~text الناتج (أول ٢٠ سطر من ٢٣٨)
[
    {
        "Id": "1897ea7af3233e3165f284f7226573ec54b54d85f51d659b6fbeaf00cd3cb4cf",
        "Created": "2026-10-06T11:58:18.787811997Z",
        "Path": "/docker-entrypoint.sh",
        "Args": [
            "nginx",
            "-g",
            "daemon off;"
        ],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 388025,
            "ExitCode": 0,
            "Error": "",
~~~

**JSON** شكل لكتابة البيانات: الأقواس المعقوفة { } مجموعة خانات بأسامي، والمربعة [ ] قايمة. الأقسام اللي هتدور فيها:

| القسم | فيه إيه |
|---|---|
| [[State]] | الحالة، و [[ExitCode]] لو وقف، و [[OOMKilled]] لو اتقتل عشان الرام خلصت |
| [[Config]] | الـ image، والمتغيرات [[Env]]، والأمر [[Cmd]] |
| [[NetworkSettings]] | الشبكات والـ IP والبورتات |
| [[Mounts]] | الـ volumes والفولدرات المربوطة |

٢٣٨ سطر كتير، فمحدش بيقراهم كلهم. هنا ييجي [[--format]].

---

## ٢. [[docker inspect --format '{{.State.Status}}' web]]: خانة واحدة

[[--format]] بياخد **قالب** (template) بلغة Go. اللي بين [[{{ }}]] بيتبدّل بقيمة:

| الحتة | معناها |
|---|---|
| [[{{ }}]] | «هنا حط قيمة» |
| [[.]] | الـ JSON كله |
| [[.State]] | ادخل قسم State |
| [[.State.Status]] | ومنه خانة Status |

~~~text الناتج
running
~~~

يعني بتمشي على نفس الطريق اللي في الـ JSON فوق: [[State]] ثم [[Status]]. والعلامات المفردة [[' ']] حوالين القالب عشان الشيل ميلعبش في الأقواس. وتقدر تطلّع جزء كامل كـ JSON بـ [[json]]:

~~~bash
docker inspect --format '{{json .Config.Env}}' web
~~~

~~~text الناتج
["PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","NGINX_VERSION=1.31.6","PKG_RELEASE=1","DYNPKG_RELEASE=1","NJS_VERSION=1.0.1","NJS_RELEASE=1","ACME_VERSION=0.4.1"]
~~~

---

## ٣. الـ IP: قالب فيه [[range]]

~~~bash
docker inspect --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' web
~~~

نفكه من جوه:

1. [[.NetworkSettings.Networks]]: الشبكات اللي الـ container متوصل بيها. ممكن تبقى أكتر من واحدة، وكل واحدة باسمها ([[bridge]] مثلًا)، فمش تقدر تكتب [[.Networks.IPAddress]] مباشرة.
2. [[{{range ...}}]]: «لف على كل واحدة فيهم». وجوه اللفة النقطة [[.]] بقت معناها الشبكة الحالية.
3. [[{{.IPAddress}}]]: اطبع IP الشبكة الحالية.
4. [[{{end}}]]: آخر اللفة.

~~~text الناتج
172.17.0.3
~~~

### الـ IP ده بيشتغل منين؟

جربنا [[curl]] عليه من ويندوز ومن container تاني:

~~~bash
curl -s -m 3 http://172.17.0.3/
docker run --rm alpine wget -qO- 172.17.0.3
~~~

| من فين | النتيجة |
|---|---|
| ويندوز (Git Bash) | [[curl]] خرج بكود [[28]] (timeout: مفيش رد في ٣ ثواني) |
| container تاني على نفس الشبكة | رجّع الصفحة: [[<title>Welcome to nginx!</title>]] |

ليه؟ على ويندوز والماك، Docker شغال جوه ماكينة لينكس صغيرة، وشبكة [[172.17.x.x]] جواها مش عند جهازك. على لينكس الحقيقي جهازك نفسه على الشبكة دي فالـ curl بيشتغل. ([[-m 3]] في curl يعني max time ٣ ثواني.) وفي الحالتين: من جهازك استخدم [[localhost]] والبورت اللي فتحته بـ [[-p]]، والـ IP ده بيتغير مع كل restart فمتبنيش عليه حاجة.

---

## ٤. [[docker stats --no-stream]]: الاستهلاك

[[stats]] من غير حاجة بيفضل يحدّث كل ثانية زي Task Manager لحد Ctrl+C. و [[--no-stream]] لقطة واحدة ويخرج:

~~~text الناتج (فلترناه على الاتنين بتوعنا)
CONTAINER ID   NAME   CPU %     MEM USAGE / LIMIT     MEM %     NET I/O           BLOCK I/O     PIDS
1897ea7af323   web    0.00%     12.94MiB / 15.33GiB   0.08%     5.51kB / 7.26kB   0B / 4.1kB    17
b8f07d952b0e   db     0.02%     31.31MiB / 15.33GiB   0.20%     3.34kB / 900B     0B / 40.9MB   6
~~~

| العمود | معناه |
|---|---|
| [[CPU %]] | نسبة المعالج. ممكن تعدّي 100% لو بيستخدم أكتر من core |
| [[MEM USAGE / LIMIT]] | الرام المستخدمة / الحد. الحد هنا 15.33GiB لأن مفيش حد متحدد، فهو كل رام الماكينة الافتراضية بتاعة Docker |
| [[MEM %]] | المستخدم من الحد |
| [[NET I/O]] | اللي دخل / اللي خرج على الشبكة |
| [[BLOCK I/O]] | قراية / كتابة على الديسك. postgres كتب 40.9MB وهو بيجهّز القاعدة أول مرة |
| [[PIDS]] | عدد العمليات جوه. nginx فيه 17 لأنه بيشغّل worker لكل core |

و [[MiB]] و [[GiB]] وحدات بـ 1024 (زي اللي ويندوز بيعرضه)، و [[kB]] بـ 1000.

---

## الخلاصة

| الأمر | بيطلّع |
|---|---|
| [[docker inspect NAME]] | كل الإعدادات والحالة (JSON طويل) |
| [[--format '{{.State.Status}}']] | خانة واحدة بمسارها في الـ JSON |
| [[{{range ...}}...{{end}}]] | لف على قايمة (زي الشبكات) |
| [[{{json ...}}]] | جزء كامل كـ JSON |
| [[docker stats --no-stream]] | المعالج والرام والشبكة والديسك، لقطة واحدة |`,
          lines: ["كل تفاصيل الـ container كـ JSON.", "الحالة بس.", "الـ IP بس.", "استهلاك كل container، لقطة واحدة."],
          sol: R`[[docker inspect --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' web]] بيطبع IP زي [[172.17.0.2]]. و [[curl 172.17.0.2]] من جهاز لينكس بيرجّع صفحة nginx ([[<title>Welcome to nginx!</title>]]) من غير ما تعدّي على البورت 8080، لأن جهازك متوصل بشبكة Docker مباشرة. و [[--format '{{.State.Status}}']] بيطبع [[running]].

و [[docker stats --no-stream]] بيطبع جدول فيه [[CPU %]] و [[MEM USAGE / LIMIT]] (nginx فاضي بياخد حوالي ٥ ميجا).

على ويندوز والماك الـ curl على الـ IP ده هيعلّق أو يفشل، لأن Docker شغال جوه VM والشبكة دي جواها. ده مش غلط في الأمر؛ استخدم localhost والبورت المنشور. ومتبنيش أي حاجة على IP الـ container: بيتغير كل restart، واستخدم الاسم على network.`
        },
        {
          cmd: "run --rm كأداة",
          title: "تستخدم برنامج مرة من غير ما تسطّبه",
          desc: R`أي image فيها برنامج تقدر تشغّله مرة واحدة وترميه: تولّد hash لباسورد، أو تجرّب كود على نسخة Node قديمة، أو تعدّ سطور ملف. [[--rm]] بيمسح الـ container أول ما يخلص، فالسيرفر بيفضل نضيف ومفيش حاجة اتسطّبت عليه.

ولو الأداة محتاجة ملفات من عندك، اربط الفولدر الحالي بـ [[-v]]، أو ابعت الملف على الـ stdin بـ [[-i]].`,
          example: R`docker run --rm caddy:2.8 caddy hash-password --plaintext 'secret'
docker run --rm node:20-alpine node -e "console.log(process.versions.node)"
docker run --rm -v "$(pwd)":/work -w /work alpine sh -c "du -sh *"
docker run --rm -i alpine wc -l < notes.txt`,
          try: "ولّد hash لباسورد بـ caddy من غير ما تسطّب Caddy، وبعدين اعمل [[docker ps -a]] واتأكد إن مفيش container فاضل.",
          deep: {
            why: "محتاج أداة لمرة واحدة: hash لباسورد basic auth، أو نسخة Python معينة، أو عميل psql. تسطيبها على السيرفر معناه باكدج هتفضل هناك للأبد ومحدش فاكر ليه اتسطّبت.",
            how: R`الـ image بتنزل أول مرة وتفضل في الكاش، فالمرة الجاية فورية.

أي حاجة بعد اسم الـ image بتحل مكان CMD، فانت بتقول للـ container «نفّذ الأمر ده بدل الافتراضي». لما الأمر يخلص الـ container بيخرج، و [[--rm]] بيمسحه.

[[-v "$(pwd)":/work -w /work]] بيحط الفولدر اللي انت فيه جوه الـ container ويشتغل منه، فالأداة تشوف ملفاتك وتكتب ناتجها عندك.

[[-i]] بيسيب الـ stdin مفتوح، فتقدر تعمل [[< ملف]] أو pipe للأداة. من غير [[-t]] عشان مفيش ترمنال تفاعلي.

واكتب الـ tag دايمًا ([[caddy:2.8]] مش caddy بس)، عشان نفس الأمر يدّي نفس النتيجة بعد سنة.`,
            when: "hashes وباسوردات، وأدوات بنسخة محددة، وعميل قاعدة بيانات، وتجربة سريعة لنسخة لغة.",
            mistakes: "نسيان [[--rm]] فالـ containers الواقفة تتراكم في [[ps -a]]. وباسورد حقيقي في سطر الأمر: بيتحفظ في history وبيبان في [[ps]] لحظة التشغيل، فاكتب الأمر بمسافة في الأول (لو HISTCONTROL=ignorespace) أو خلّي الأداة تسألك عليه."
          },
          teach: R`## الفكرة: الـ image كبرنامج بتستخدمه مرة وترميه

بدل ما تسطّب Caddy أو Node قديمة على جهازك أو السيرفر، شغّل الـ image بتاعتها، خلّيها تعمل الشغلانة، و [[--rm]] يمسح الـ container. الـ image بس هي اللي بتفضل في الكاش.

القاعدة من درس «docker run»: اللي **بعد** اسم الـ image هو الأمر اللي يتنفّذ جوه **بدل** الأمر الافتراضي. السطور الأربعة كلها اتشغّلت على Docker Desktop 29، في Git Bash وفي PowerShell 7، والفروق بينهم تحت.

---

## ١. hash لباسورد بأداة Caddy

~~~bash
docker run --rm caddy:2.8 caddy hash-password --plaintext 'secret'
~~~

| الجزء | معناه |
|---|---|
| [[caddy:2.8]] | image سيرفر Caddy نسخة 2.8 |
| [[caddy hash-password]] | أمر جوه Caddy بيحوّل باسورد لـ hash |
| [[--plaintext 'secret']] | الباسورد نفسه. العلامات المفردة عشان الشيل ميغيرش فيه حاجة |

~~~text الناتج (مرتين ورا بعض)
$2a$14$GGcvLqRDEKSAu55Ao.Unu.MkdJVENtNBZBOss8Af6enjYSOAynkr.
$2a$14$WIwFMN5r7bUUemx.cfQks./OWXcvbgqNoeTYr.Pg.2T/hTbXdoU6O
~~~

### نقرا الـ hash

| الحتة | معناها |
|---|---|
| [[$2a$]] | نوع الخوارزمية: bcrypt |
| [[14$]] | الـ cost: كل رقم زيادة بيضاعف وقت الحساب، عشان التخمين يبقى بطيء |
| أول ٢٢ حرف بعدها | الـ **salt**: كلام عشوائي بيتولد كل مرة |
| الباقي | الـ hash نفسه |

عشان كده نفس الباسورد طلّع نتيجتين مختلفين، وده طبيعي: الـ salt اتغير. وبعدها [[docker ps -a]] مفيهوش أي container من caddy، لأن [[--rm]] مسحه.

---

## ٢. سطر JavaScript على Node 20

~~~bash
docker run --rm node:20-alpine node -e "console.log(process.versions.node)"
~~~

- [[node -e "..."]]: [[-e]] (evaluate) يعني «نفّذ الكود ده» بدل ملف.
- [[process.versions.node]]: نسخة Node اللي شغالة.

~~~text الناتج
20.20.2
~~~

حتى لو جهازك عليه Node 24 أو مفيهوش Node خالص. كده تجرّب كودك على أي نسخة في ثانية.

---

## ٣. اربط الفولدر الحالي: [[-v]] و [[-w]]

~~~bash
docker run --rm -v "$(pwd)":/work -w /work alpine sh -c "du -sh *"
~~~

نفكه:

| الجزء | معناه |
|---|---|
| [[$(pwd)]] | الشيل بيشغّل [[pwd]] (print working directory) ويحط مكانها مسار الفولدر اللي انت فيه |
| [[" "]] حواليها | لو المسار فيه مسافات (زي [[full stack road map]]) يفضل حتة واحدة |
| [[-v مسار-عندي:/work]] | volume: الفولدر بتاعك يظهر جوه الـ container على [[/work]]. نفس الملفات مش نسخة |
| [[-w /work]] | workdir: ابدأ الأمر من جوه [[/work]] |
| [[sh -c "du -sh *"]] | [[sh -c]] بيشغّل سطر شيل، و [[du -sh *]] حجم كل حاجة (disk usage، [[-s]] مجموع، [[-h]] بالكيلو والميجا) |

ليه [[sh -c]] ومش [[du -sh *]] مباشرة؟ لأن النجمة [[*]] لازم **شيل جوه الـ container** هو اللي يفكها لأسامي الملفات اللي هناك. لو كتبتها من غير [[sh -c]]، الشيل بتاعك على جهازك هيفكها قبل ما docker يشتغل.

جربناه في فولدر فيه [[notes.txt]] (٣ سطور) وملف [[big.bin]] (٣٠٠ كيلو) وفولدر [[sub]]:

~~~text الناتج
296.0K	big.bin
0	notes.txt
52.0K	sub
~~~

> [[notes.txt]] طلع 0 لأن الملف ١٤ byte بس والفولدر جاي من ويندوز، فـ [[du]] بيعدّ البلوكات اللي ويندوز بيبلّغ عنها. على لينكس هتشوف [[4.0K]] (أصغر بلوك).

### الفروق بين الشيلات

| الشيل | السطر |
|---|---|
| bash على لينكس وماك | زي ما هو |
| PowerShell | زي ما هو برضه ([[$(pwd)]] شغالة)، أو [[-v "$__{PWD}:/work"]] |
| Git Bash على ويندوز | لازم [[MSYS_NO_PATHCONV=1]] في الأول |

في Git Bash من غيرها طلع:

~~~text الناتج في Git Bash
docker: Error response from daemon: the working directory 'C:/Program Files/Git/work' is invalid, it needs to be an absolute path
~~~

لأن Git Bash حوّل [[/work]] لمسار جوه فولدر Git قبل ما يبعته (نفس الفخ اللي في درس «docker exec»).

---

## ٤. ابعت ملف على الـ stdin: [[-i]] و [[<]]

~~~bash
docker run --rm -i alpine wc -l < notes.txt
~~~

- [[< notes.txt]]: الشيل بتاعك بيفتح الملف ويدخّله على **stdin** (المدخل) بتاع الأمر.
- [[-i]]: خلّي stdin متوصل بالـ container، وإلا الأداة جوه مش هتستلم حاجة.
- [[wc -l]]: word count، و [[-l]] عدد السطور.
- مفيش [[-t]]: مش محتاجين ترمنال تفاعلي، واحنا بنبعت ملف.

~~~text الناتج
3
~~~

الملف مادخلش الـ container كملف، وصل كـ «كلام داخل» بس. كده مش محتاج [[-v]] خالص.

### في PowerShell

[[<]] مش موجودة في PowerShell:

~~~text الناتج في PowerShell
The '<' operator is reserved for future use.
~~~

وبدلها ابعت الملف بـ pipe:

~~~powershell
Get-Content notes.txt | docker run --rm -i alpine wc -l
~~~

~~~text الناتج
3
~~~

---

## الخلاصة

| الهدف | الشكل |
|---|---|
| أداة بأمر واحد | [[docker run --rm IMAGE:TAG أمر args]] |
| الأداة تشوف ملفاتك | [[-v "$(pwd)":/work -w /work]] |
| تبعت ملف واحد | [[-i]] و [[< file]] (أو Get-Content ومعاه pipe في PowerShell) |
| نجمة أو pipe جوه | [[sh -c "..."]] |

~~~text
--rm    مفيش containers ميتة بتتراكم
tag     اكتبه دايمًا (caddy:2.8) عشان النتيجة متتغيرش بعد سنة
~~~`,
          lines: [
            "استخدم Caddy يولّد hash للباسورد، والـ container يتمسح بعدها.",
            "نفّذ سطر JavaScript على Node 20 من غير ما تسطّبها.",
            "الفولدر الحالي جوه الـ container على /work، واعرض حجم كل حاجة فيه.",
            "ابعت ملف من جهازك على الـ stdin لأداة جوه الـ container."
          ],
          sol: R`[[docker run --rm caddy:2.8 caddy hash-password --plaintext 'secret']] (بعد ما ينزل الـ image أول مرة) بيطبع سطر واحد bcrypt hash زي [[$2a$14$/eS4y3qJmjVoo5l.0bjAQ...]]. الرقم بيتغير كل مرة حتى لنفس الباسورد، لأن فيه salt عشوائي، وده طبيعي.

و [[docker ps -a]] بعدها مش هيوري أي container من caddy، لأن [[--rm]] مسحه أول ما خلص. الـ image بس اللي فاضلة في [[docker images]]، وتقدر تمسحها بـ [[docker rmi caddy:2.8]] لو مش محتاجها.

الغلط الشائع: تنسى [[--rm]]، فتلاقي بعد أسبوع عشرات الـ containers الـ Exited في [[docker ps -a]]. نضّفهم بـ [[docker container prune]].`
        }
      ]
    }
  ]
});
