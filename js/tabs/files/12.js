// تكملة تاب files: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/files/01.js (شرح حقول الدرس في أوله)
MORE("files", [
    {
      t: "Docker والبناء: Dockerfile و compose.yaml و Makefile",
      l: 2,
      n: "ملفات من غير امتداد بس من أهم الملفات في أي مشروع: Dockerfile و .dockerignore و compose.yaml، و Makefile اللي بيجمع أوامر المشروع في مكان واحد",
      items: [
        {
          cmd: "Dockerfile",
          title: "Dockerfile بيتكتب إزاي، وكل سطر فيه (FROM و COPY و RUN و CMD) بيعمل إيه؟",
          desc: R`[[Dockerfile]] (بالظبط كده، D كبيرة ومن غير امتداد) وصفة بتقول لـ Docker يبني image لتطبيقك خطوة خطوة: ابدأ من نظام فيه Node، انسخ الكود، سطّب المكتبات، وشغّل بالأمر ده. التفاصيل في تاب Docker.

الصيغة: كل سطر [[INSTRUCTION arguments]]، والأوامر بالحروف الكبيرة بالعُرف، و [[#]] تعليق. وأهم الأوامر:
• [[FROM node:22-alpine]]: الـ image اللي هتبدأ منه. لازم أول أمر. [[22-alpine]] اسمه tag: Node 22 على Alpine لينكس (صغير).
• [[WORKDIR /app]]: الفولدر اللي هتشتغل فيه جوه الـ image (بيتعمل لو مش موجود).
• [[COPY src dest]]: انسخ من جهازك (من الـ build context) لجوه الـ image.
• [[RUN command]]: نفّذ أمر وقت البناء (تسطيب مكتبات، build).
• [[ENV KEY=value]]: متغير بيئة.
• [[EXPOSE 3000]]: توثيق إن التطبيق بيسمع على 3000 (مش بيفتح البورت فعلًا، ده [[-p]] أو [[ports:]]).
• [[USER node]]: شغّل التطبيق بيوزر عادي مش root (أمان).
• [[CMD ["node", "server.js"]]]: الأمر اللي بيتنفذ لما الـ container يشتغل. الشكل ده (JSON array، اسمه exec form) هو الصح، عشان الإشارات زي Ctrl+C توصل للتطبيق.
• [[ARG]] (متغير وقت البناء بس)، و [[ENTRYPOINT]]، و [[HEALTHCHECK]]، و [[FROM ... AS build]] (multi-stage: مرحلة تبني ومرحلة تشغّل الناتج بس).

الترتيب مهم عشان الـ cache: كل سطر بيعمل طبقة (layer)، و Docker بيعيد استخدام الطبقة لو اللي قبلها ومدخلاتها متغيرتش. عشان كده بننسخ [[package*.json]] ونعمل [[npm ci]] الأول، وبعدين ننسخ باقي الكود: لو غيّرت كود بس، التسطيب ميتعادش.

وأخوات: [[Dockerfile.dev]] أو [[api.Dockerfile]] لو عندك أكتر من واحد ([[docker build -f Dockerfile.dev .]])، و [[Containerfile]] نفس الحاجة في Podman.`,
          example: R`# syntax=docker/dockerfile:1
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
ENV NODE_ENV=production
EXPOSE 3000
USER node
CMD ["node", "server.js"]`,
          flag: "script",
          try: R`في فولدر فيه [[package.json]] (من [[npm init -y]]) و [[server.js]] بيعمل سيرفر بسيط على [[process.env.PORT || 3000]]، نفّذ [[npm install]] عشان يتعمل [[package-lock.json]]، وحط المثال في [[Dockerfile]] واعمل [[.dockerignore]] (الدرس الجاي). بعدين: [[docker build -t gym-api .]] و [[docker run --rm -p 8080:3000 gym-api]] وافتح [[http://localhost:8080]]. وجرّب [[docker run --rm gym-api whoami]] و [[docker run --rm gym-api ls -a /app]]. غيّر سطر في [[server.js]] وابني تاني ولاحظ الخطوات اللي مكتوب جنبها [[CACHED]].`,
          deep: {
            why: R`«شغال على جهازي» مشكلة قديمة: نسخة Node مختلفة، أو مكتبة نظام ناقصة. الـ Dockerfile بيكتب البيئة كلها ككود، فالـ image اللي بيتبني على جهازك هو هو اللي بيشتغل على السيرفر و CI.`,
            how: R`[[docker build .]] بيبعت الفولدر (الـ context، ماعدا اللي في [[.dockerignore]]) للـ Docker engine، اللي بينفذ الأوامر بالترتيب: كل [[RUN]] و [[COPY]] بيعمل طبقة جديدة فوق اللي قبلها. ولكل خطوة بيحسب hash لمدخلاتها، ولو موجودة في الـ cache بيستخدمها ([[CACHED]]). و [[CMD]] بيتسجل في إعدادات الـ image بس، وبيتنفذ مع [[docker run]].`,
            when: R`أي تطبيق هيترفع على سيرفر أو cloud، وأي مشروع عايز الكل يشغّله بأمر واحد.`,
            mistakes: R`[[COPY . .]] قبل [[npm ci]] فأي تعديل يعيد التسطيب كله. من غير [[.dockerignore]] فـ [[node_modules]] بتاعة جهازك و [[.env]] يدخلوا الـ image. [[CMD node server.js]] (shell form) فـ Ctrl+C و [[docker stop]] مبيوصلوش للتطبيق (بيستنى ١٠ ثواني ويقتله). وحتى مع الـ exec form، Node لما يبقى PID 1 بيتجاهل SIGTERM لو مفيش في الكود [[process.on("SIGTERM", ...)]]، فـ [[docker stop]] برضو بياخد ١٠ ثواني: الحل handler في الكود أو [[docker run --init]]. وتسمّي الملف [[dockerfile]] أو [[Dockerfile.txt]] فـ [[docker build .]] ميلاقيهوش.`
          },
          teach: R`## الفكرة

المثال Dockerfile لسيرفر Node صغير: ١٠ سطور، كل سطر تعليمة لـ Docker. هنقراهم بالترتيب اللي Docker بينفّذهم بيه، وبعدين نبني الـ image ونشغّلها. اتجرّب على ويندوز بـ Docker 29.6 (Docker Desktop، يعني الـ engine شغال لينكس)، في فولدر فيه [[package.json]] و [[package-lock.json]] (dayjs بس) و [[server.js]] بيرد [[ok]] على أي طلب، و [[.dockerignore]] (الدرس الجاي). الـ image اتسمّت [[teach-files04-api]] بدل [[gym-api]] واتمسحت بعد التجربة.

---

## ١. [[# syntax=docker/dockerfile:1]]

شكله تعليق، بس ده **parser directive**: لازم يبقى أول سطر، وبيقول لـ BuildKit (اللي بيبني) استخدم أحدث صيغة Dockerfile من النسخة 1. في البناء ظهر كخطوة لوحده:

~~~text
#2 resolve image config for docker-image://docker.io/docker/dockerfile:1
~~~

يعني Docker نزّل «مترجم» الـ Dockerfile نفسه. تقدر تشيل السطر وهيشتغل بالمترجم اللي جوه Docker.

## ٢. [[FROM node:22-alpine]]

- [[FROM]]: ابدأ من image جاهزة. أي Dockerfile بيبدأ بيه.
- [[node]]: اسم الـ image الرسمية على Docker Hub.
- [[:22-alpine]]: الـ **tag** (النسخة): Node 22 مبني على Alpine Linux، توزيعة صغيرة: [[alpine:latest]] لوحدها طلعت 13MB في [[docker images]]، و [[node:22-alpine]] كلها 238MB، و image بتاعتنا 243MB (يعني الكود والمكتبات ٥ ميجا بس).

## ٣. [[WORKDIR /app]]

اعمل فولدر [[/app]] جوه الـ image لو مش موجود، وخلي كل اللي بعده يتنفذ فيه. زي [[cd]] بس دايم: [[CMD]] كمان هيشتغل من [[/app]].

## ٤. [[COPY package*.json ./]]

- [[COPY src dest]]: انسخ من جهازك لجوه الـ image.
- [[package*.json]]: [[*]] أي حروف، فبيطابق [[package.json]] و [[package-lock.json]] الاتنين.
- [[./]]: للفولدر الحالي جوه الـ image، يعني [[/app/]].

بننسخ الملفين دول **لوحدهم الأول** عشان الـ cache (تحت).

## ٥. [[RUN npm ci --omit=dev]]

[[RUN]] نفّذ أمر **وقت البناء**، والنتيجة بتتحفظ في الـ image. [[npm ci]] سطّب من الـ lock بالظبط (درس [[package-lock.json]])، و [[--omit=dev]] من غير [[devDependencies]]:

~~~text الناتج
#10 [4/5] RUN npm ci --omit=dev
#10 7.582 added 1 package, and audited 2 packages in 7s
~~~

## ٦. [[COPY . .]]

انسخ كل الفولدر ([[.]] الأولى = الـ build context على جهازك) لـ [[/app]] ([[.]] التانية). «كل» هنا ماعدا اللي في [[.dockerignore]].

## ٧. [[ENV NODE_ENV=production]]

متغير بيئة بيفضل موجود جوه أي container من الـ image دي. مكتبات كتير (Express مثلًا) بتشتغل أسرع وبتخبي تفاصيل الأخطاء لما تلاقيه [[production]]. اتأكدنا:

~~~bash
docker run --rm teach-files04-api node -e 'console.log(process.env.NODE_ENV)'
~~~

~~~text الناتج
production
~~~

## ٨. [[EXPOSE 3000]]

توثيق بس: «التطبيق ده بيسمع على 3000». مبيفتحش أي بورت. اللي بيفتح فعلًا [[-p]] في [[docker run]].

## ٩. [[USER node]]

كل اللي بعده، والتطبيق نفسه، يشتغل باليوزر [[node]] (موجود جاهز في الـ image الرسمية) مش [[root]]. لو حد اخترق التطبيق، مش هيبقى root جوه الـ container.

~~~text docker run --rm teach-files04-api whoami
node
~~~

## ١٠. [[CMD ["node", "server.js"]]]

الأمر اللي بيشتغل لما الـ container يقوم. ده **exec form**: JSON array، كل كلمة في تنصيص لوحدها. Docker بيشغّل [[node]] مباشرة، فـ [[node]] بيبقى PID 1 (أول process في الـ container) والإشارات بتوصله. أما [[CMD node server.js]] من غير أقواس (shell form) فبيشغّل [[/bin/sh -c "node server.js"]]، و [[sh]] هو اللي بياخد الإشارات.

بس خلي بالك: حتى مع الـ exec form، Node لما يبقى PID 1 ومفيش في الكود [[process.on("SIGTERM", ...)]] بيتجاهل الإشارة. جرّبنا:

~~~text
docker stop  (من غير --init)   real 0m10.500s
docker stop  (مع --init)       real 0m0.578s
~~~

١٠ ثواني لأن Docker بيبعت SIGTERM، ولما محدش يرد بيستنى ١٠ ثواني ويبعت SIGKILL. و [[--init]] بيحط process صغيرة (tini) هي PID 1 وتوصّل الإشارة لـ Node صح.

وتقدر تشوف إن [[CMD]] و [[USER]] و [[WORKDIR]] و [[EXPOSE]] اتسجلوا في إعدادات الـ image (مش اتنفذوا وقت البناء):

~~~bash
docker image inspect teach-files04-api --format '{{.Config.Cmd}} {{.Config.User}} {{.Config.WorkingDir}} {{.Config.ExposedPorts}}'
~~~

~~~text الناتج
[node server.js] node /app map[3000/tcp:{}]
~~~

---

## ١١. البناء: [[docker build -t teach-files04-api .]]

- [[build]]: ابني image.
- [[-t]] (tag): سمّيها كده.
- [[.]]: الـ build context، الفولدر اللي هيتبعت لـ Docker (والـ Dockerfile بيتدوّر عليه فيه).

السطور المهمة من الناتج (مع [[--progress=plain]] عشان يطبع كل حاجة):

~~~text الناتج
#5 [internal] load .dockerignore
#5 transferring context: 80B done
#6 [internal] load build context
#6 transferring context: 1.20kB 0.0s done
#7 [1/5] FROM docker.io/library/node:22-alpine@sha256:0a7108bf...
#8 [2/5] WORKDIR /app
#9 [3/5] COPY package*.json ./
#10 [4/5] RUN npm ci --omit=dev
#11 [5/5] COPY . .
#12 naming to docker.io/library/teach-files04-api:latest
~~~

- [[#5]] و [[#6]]...: رقم كل خطوة.
- [[[1/5]]] لحد [[[5/5]]]: الخطوات اللي بتعمل طبقات (layers). ٥ بس، لأن [[ENV]] و [[EXPOSE]] و [[USER]] و [[CMD]] بيغيّروا الإعدادات من غير طبقة ملفات.
- [[transferring context: 1.20kB]]: حجم الفولدر اللي اتبعت بعد [[.dockerignore]].
- [[@sha256:...]]: بصمة النسخة المضبوطة من [[node:22-alpine]] اللي اتبنى عليها.
- [[:latest]]: لو مكتبتش tag في [[-t]]، Docker بيحط [[latest]].

## ١٢. التشغيل

~~~bash
docker run -d --rm -p 18080:3000 teach-files04-api
curl http://localhost:18080
~~~

- [[-d]] (detach): في الخلفية. و [[--rm]]: امسح الـ container لما يقف.
- [[-p 18080:3000]]: بورت 18080 على جهازك يوصل لـ 3000 جوه الـ container (استخدمنا 18080 عشان 8080 ممكن يبقى مشغول).

~~~text الناتج
ok
~~~

و [[docker logs]] على نفس الـ container طبع [[listening on 3000]].

و [[docker run --rm teach-files04-api ls -a /app]] (من PowerShell أو cmd، لأن Git Bash بيحوّل [[/app]] لمسار ويندوز):

~~~text الناتج
.
..
.dockerignore
node_modules
package-lock.json
package.json
server.js
~~~

[[node_modules]] هنا عمله [[npm ci]] جوه الـ image. ومفيش [[.env]] ولا [[Dockerfile]] بفضل [[.dockerignore]].

## ١٣. الـ cache

ضفنا سطر تعليق في آخر [[server.js]] وبنينا تاني:

~~~text الناتج
#8 [2/5] WORKDIR /app
#8 CACHED
#9 [3/5] COPY package*.json ./
#9 CACHED
#10 [4/5] RUN npm ci --omit=dev
#10 CACHED
#11 [5/5] COPY . .
~~~

Docker لكل خطوة بيقارن مدخلاتها بالمرة اللي فاتت. [[package*.json]] متغيرش، فـ [[npm ci]] (٧ ثواني) اتاخد من الـ cache. بس [[COPY . .]] اتعاد لأن [[server.js]] اتغير. لو كنا كتبنا [[COPY . .]] قبل [[npm ci]]، أي تعديل في الكود كان هيعيد التسطيب كله.

---

## الخلاصة

| التعليمة | وقت إيه | بتعمل إيه |
|---|---|---|
| [[FROM]] | البناء | الـ image اللي بنبدأ منها |
| [[WORKDIR]] | البناء والتشغيل | الفولدر الحالي |
| [[COPY]] | البناء | ملفات من جهازك لجوه |
| [[RUN]] | البناء | ينفّذ أمر ويحفظ نتيجته |
| [[ENV]] | الاتنين | متغير بيئة |
| [[EXPOSE]] | توثيق | البورت اللي التطبيق بيسمع عليه |
| [[USER]] | الاتنين | اليوزر اللي بيشغّل |
| [[CMD]] | التشغيل | الأمر اللي بيقوم مع الـ container |

ورتّب السطور من «نادرًا ما يتغير» لـ «بيتغير كل شوية» عشان الـ cache يشتغل.`,
          lines: [
            R`ابدأ من image فيها Node 22 على Alpine. (السطر اللي فوق تعليق بيقول نسخة صيغة الـ Dockerfile.)`,
            R`كل اللي جاي جوه [[/app]].`,
            R`[[package.json]] و [[package-lock.json]] بس الأول (عشان الـ cache).`,
            R`سطّب من الـ lock بالظبط من غير أدوات التطوير.`,
            R`باقي الكود (ماعدا اللي في [[.dockerignore]]).`,
            R`متغير بيئة جوه الـ container.`,
            R`توثيق للبورت.`,
            R`اليوزر [[node]] موجود جاهز في الـ image الرسمية: متشغّلش كـ root.`,
            R`الأمر اللي بيتشغّل، بالشكل الـ JSON array.`
          ],
          sol: R`[[docker build]] بيطبع الخطوات [[[1/5] FROM ...]] لحد [[[5/5] COPY . .]] وفي الآخر [[naming to docker.io/library/gym-api]]. و [[docker run -p 8080:3000]] بيطبع [[listening on 3000]] والمتصفح بيعرض ok.

[[docker run --rm gym-api whoami]] ← [[node]]
[[docker run --rm gym-api ls -a /app]] ← [[.dockerignore]] و [[node_modules]] (اللي [[npm ci]] عمله جوه الـ image) و [[package-lock.json]] و [[package.json]] و [[server.js]]، ومفيش [[.env]] ولا [[Dockerfile]].

ولما تغيّر [[server.js]] بس وتبني تاني، خطوات [[WORKDIR]] و [[COPY package*.json]] و [[RUN npm ci]] بيبقى جنبها [[CACHED]]، و [[COPY . .]] بس اللي بتتعاد.`
        },
        {
          cmd: ".dockerignore",
          title: "ملف .dockerignore بيمنع إيه، وإيه اللي بيحصل من غيره؟",
          desc: R`[[.dockerignore]] بنفس فكرة [[.gitignore]]: ليستة أنماط للملفات اللي [[docker build]] ميبعتهاش للـ engine (الـ build context). وبالتالي مش هتدخل الـ image مع [[COPY . .]]. بيتحط جنب الـ [[Dockerfile]] (في أول الـ context).

الصيغة: نمط في كل سطر، و [[#]] تعليق، و [[*]] و [[**]] و [[!]] للاستثناء، زي [[.gitignore]] تقريبًا. (فرق صغير: الأنماط هنا من أول الـ context، فـ [[node_modules]] معناها الفولدر اللي في الأول، و [[**/node_modules]] لأي مكان.)

حط فيه دايمًا:
• [[node_modules]]: الـ image بيسطّب مكتباته بنفسه بـ [[npm ci]]. ومكتبات جهازك ممكن تبقى متبنية لويندوز أو ماك ومتشتغلش على لينكس.
• [[.git]]: تاريخ المشروع كله، ممكن يبقى أكبر من الكود نفسه.
• [[.env]] وأي أسرار: لو دخلوا الـ image، أي حد معاه الـ image يقدر يقراهم ([[docker run image cat .env]]).
• [[*.log]] و [[dist]] و [[coverage]] و [[.vscode]].
• [[Dockerfile]] و [[compose.yaml]] نفسهم (مش محتاجهم جوه).

ليه ده مهم:
• السرعة: [[docker build]] بيبعت الـ context كله قبل ما يبدأ. فولدر فيه [[node_modules]] ممكن يبقى مئات الميجا كل build.
• الحجم: الـ image يبقى أصغر.
• الأمان: الأسرار متدخلش الـ image اللي ممكن يترفع على Docker Hub.
• الـ cache: أي تغيير في ملف مش محتاجه (log مثلًا) بيكسر الـ cache بتاع [[COPY . .]].`,
          example: R`node_modules
.git
.env
*.log
Dockerfile`,
          flag: "script",
          try: R`في مشروع الدرس اللي فات اعمل [[.env]] فيه [[SECRET=x]]، وفولدر [[node_modules/big]] فيه ملف كبير ([[head -c 5000000 /dev/urandom > node_modules/big/blob]]). ابني مرة من غير [[.dockerignore]] (غيّر اسمه مؤقتًا) بـ [[docker build --no-cache --progress=plain -t test .]] ودوّر على سطر [[transferring context]]، و [[docker run --rm test ls -a /app]]. ورجّعه وابني تاني وقارن.`,
          deep: {
            why: R`[[COPY . .]] مريح بس خطير: بينسخ «كل حاجة». والـ [[.dockerignore]] هو اللي بيحدد «كل حاجة» دي فيها إيه. وكمان Docker محتاج يبعت الـ context للـ engine (اللي ممكن يبقى على جهاز تاني) قبل ما يبدأ.`,
            how: R`أول ما تكتب [[docker build .]] الـ client بيقرا [[.dockerignore]]، ويجمع كل الملفات اللي مش متجاهلة في الفولدر، ويبعتها للـ engine. أي ملف متجاهل مش موجود بالنسبة للـ build خالص، حتى لو كتبت [[COPY .env .]] صراحة هيقولك مش موجود.`,
            when: R`مع أي Dockerfile فيه [[COPY . .]]، يعني تقريبًا دايمًا.`,
            mistakes: R`تنسى [[.env]] فالسر يدخل الـ image ويترفع على Docker Hub. تكتب [[node_modules/]] وتفتكر إنها هتتجاهل في الفولدرات الفرعية كمان (اكتب [[**/node_modules]]). وتتجاهل ملف التطبيق محتاجه فعلًا (زي [[package-lock.json]]) فـ [[npm ci]] يقع.`
          },
          teach: R`## الفكرة

المثال ٥ أنماط، كل واحد في سطر. معناهم: «لما [[docker build]] يجمع الفولدر عشان يبعته، سيب دول». هنقرا الأنماط، وبعدين نبني نفس مشروع درس [[Dockerfile]] مرة من غير الملف ومرة بيه، ونقارن. اتجرّب على ويندوز بـ Docker 29.6، والـ images اتسمّت [[teach-files04-*]] واتمسحت بعدها.

---

## ١. الأنماط

~~~text .dockerignore
node_modules
.git
.env
*.log
Dockerfile
~~~

| السطر | بيمنع | ليه |
|---|---|---|
| [[node_modules]] | مكتبات جهازك | الـ image بيسطّب مكتباته بـ [[npm ci]]، ومكتبات ويندوز أو الماك ممكن متشتغلش على لينكس |
| [[.git]] | تاريخ Git كله | ممكن يبقى أكبر من الكود، ومش محتاجه في التشغيل |
| [[.env]] | الأسرار | أي حد معاه الـ image يقدر يقراها |
| [[*.log]] | أي log في أول الفولدر | زبالة، وكل تغيير فيها يكسر الـ cache |
| [[Dockerfile]] | الوصفة نفسها | مش محتاجها جوه الـ container |

فرق مهم عن [[.gitignore]]: الأنماط هنا من **أول الـ context** بس. [[node_modules]] يعني الفولدر اللي في الأول، مش [[sub/node_modules]]. جرّبناها في فولدر فيه [[node_modules/b.js]] و [[sub/node_modules/a.js]] و Dockerfile فيه [[RUN find . -type f]]:

~~~text الناتج
./.dockerignore
./Dockerfile
./sub/node_modules/a.js
~~~

[[b.js]] اتمنع، بس [[sub/node_modules/a.js]] دخل. عشان تمنعه في أي مكان اكتب [[**/node_modules]] ([[**]] = أي عدد فولدرات). ونفس الكلام لـ [[*.log]]: بيمنع [[app.log]] اللي في الأول بس.

---

## ٢. التجربة: من غير [[.dockerignore]]

في مشروع الـ Dockerfile حطينا [[.env]] فيه [[SECRET=x]]، و [[app.log]]، وملف 5MB عشوائي في [[node_modules/big/blob]]:

~~~bash
head -c 5000000 /dev/urandom > node_modules/big/blob
~~~

[[head -c 5000000]] (c = bytes): خد أول ٥ مليون byte من [[/dev/urandom]]، وده «ملف» في لينكس (وفي Git Bash) بيطلّع بيانات عشوائية من غير نهاية.

وبعدين غيّرنا اسم [[.dockerignore]] مؤقتًا وبنينا:

~~~bash
docker build --no-cache --progress=plain -t teach-files04-ign .
~~~

- [[--no-cache]]: ابني كل خطوة من الأول، عشان المقارنة تبقى عادلة.
- [[--progress=plain]]: اطبع كل السطور بدل الشكل المختصر اللي بيتمسح.

~~~text الناتج
#5 [internal] load .dockerignore
#5 transferring context: 2B done
#8 transferring context: 5.71MB 2.1s done
~~~

- [[transferring context: 2B]] عند [[.dockerignore]]: مفيش ملف، فاتبعت ولا حاجة تقريبًا.
- [[5.71MB 2.1s]]: الفولدر كله اتبعت للـ engine، والـ blob لوحده ٥ ميجا. في مشروع حقيقي [[node_modules]] بيبقى مئات الميجا كل build.

جوه الـ image:

~~~text docker run --rm teach-files04-ign ls -a /app
.
..
.env
Dockerfile
app.log
di.bak
node_modules
package-lock.json
package.json
server.js
~~~

كل حاجة دخلت، حتى [[di.bak]] (الملف اللي غيّرنا اسمه). و [[COPY . .]] نسخ [[node_modules]] بتاع جهازك **فوق** اللي [[npm ci]] عمله. والأخطر:

~~~text docker run --rm teach-files04-ign cat .env
SECRET=x
~~~

السر بقى جوه الـ image. والحجم: [[256MB]].

---

## ٣. نفس البناء مع [[.dockerignore]]

~~~text الناتج
#5 transferring context: 80B done
#6 transferring context: 178B 0.0s done
~~~

[[80B]] حجم [[.dockerignore]] نفسه، و [[178B]] كل اللي اتبعت من المشروع (بدل 5.71MB).

~~~text docker run --rm teach-files04-ign ls -a /app
.
..
.dockerignore
node_modules
package-lock.json
package.json
server.js
~~~

و [[node_modules]] هنا اللي [[npm ci]] عمله جوه الـ image. والحجم بقى [[243MB]]. و [[cat .env]]:

~~~text الناتج
cat: can't open '.env': No such file or directory
~~~

---

## ٤. ولو طلبته بالاسم؟

Dockerfile فيه [[COPY .env /x]] و [[.env]] في [[.dockerignore]]:

~~~text الناتج
ERROR: failed to build: failed to solve: failed to compute cache key: failed to calculate checksum of ref ...: "/.env": not found
~~~

الملف المتجاهل مش موجود بالنسبة للبناء خالص، حتى لو كتبته صراحة. فلو [[npm ci]] وقع بـ [[package-lock.json not found]]، دوّر في [[.dockerignore]] الأول.

---

## الخلاصة

| | من غير [[.dockerignore]] | معاه |
|---|---|---|
| الـ context اللي اتبعت | 5.71MB | 178B |
| [[.env]] جوه الـ image | أيوه، ومقروء | لأ |
| [[node_modules]] | بتاع جهازك فوق بتاع [[npm ci]] | بتاع [[npm ci]] بس |
| الحجم | 256MB | 243MB |

والأنماط من أول الـ context: [[**/node_modules]] لو عايزه في أي مكان.`,
          lines: [
            R`مكتبات جهازك ميدخلوش: الـ image بيسطّب بنفسه.`,
            R`تاريخ Git.`,
            R`الأسرار.`,
            R`أي log.`,
            R`الـ Dockerfile نفسه مش محتاجه جوه.`
          ],
          sol: R`من غير [[.dockerignore]]:
[[#8 transferring context: 5.71MB 2.1s done]]
و [[ls -a /app]] فيه [[.env]] و [[Dockerfile]] و [[node_modules]]. يعني السر بقى جوه الـ image، و [[docker run --rm test cat .env]] بيطبع [[SECRET=x]].

مع [[.dockerignore]]:
[[#6 transferring context: 178B 0.0s done]]
و [[ls -a /app]] فيه [[.dockerignore]] و [[package.json]] و [[package-lock.json]] و [[server.js]] بس. والـ image أصغر (في التجربة دي على node:22-alpine طلع 243MB بدل 256MB).`
        },
        {
          cmd: "compose.yaml",
          title: "compose.yaml (docker-compose.yml) جواه إيه، وبيشغّل كذا container مع بعض إزاي؟",
          desc: R`[[compose.yaml]] ملف YAML بيوصف تطبيقك كله: كل خدمة (container) وإعداداتها، والشبكة بينهم، والـ volumes. و [[docker compose up]] بيشغّل كله بأمر واحد. الاسم القديم [[docker-compose.yml]] لسه شغال، والجديد المفضل [[compose.yaml]]، وأمر [[docker-compose]] بالشرطة القديم اتبدل بـ [[docker compose]]. التفاصيل في تاب Docker.

الهيكل:
• [[services:]]: كل مفتاح تحته خدمة: [[api]] و [[db]].
  [[build: .]]: ابني من الـ Dockerfile اللي في الفولدر ده. أو [[image: postgres:17]]: استخدم image جاهزة.
  [[ports: ["3000:3000"]]]: [[جهازك:الcontainer]]. متنصص (درس «مشكلة النرويج»).
  [[environment:]] متغيرات، و [[env_file: .env]] من ملف.
  [[volumes:]]: [[pgdata:/var/lib/postgresql/data]] (volume بيحفظ الداتا حتى لو الـ container اتمسح)، أو [[./src:/app/src]] (فولدر من جهازك).
  [[depends_on:]]: ابدأ دي الأول، ومع [[condition: service_healthy]] استنى لحد ما تبقى جاهزة فعلًا.
  [[healthcheck:]]: إزاي Docker يعرف الخدمة جاهزة.
  [[restart: unless-stopped]]: لو وقعت قوّمها تاني.
• [[volumes:]] في الآخر: تعريف الـ volumes بالاسم.

الخدمات بتكلّم بعض باسم الخدمة: الـ api بيوصل لقاعدة البيانات على [[db:5432]] مش [[localhost]]. لأن [[localhost]] جوه الـ container معناها الـ container نفسه.

و Compose بيقرا [[.env]] اللي جنبه لوحده عشان [[$__{VAR}]] جوه الـ YAML، وده غير [[env_file:]] اللي بيبعت المتغيرات لجوه الـ container.

أوامر: [[docker compose up -d]] (شغّل في الخلفية)، و [[docker compose ps]]، و [[docker compose logs -f api]]، و [[docker compose down]] (و [[-v]] تمسح الـ volumes كمان، يعني الداتا)، و [[docker compose config]] (اطبع الملف النهائي بعد المتغيرات: أحسن طريقة تفحص بيها).`,
          example: R`services:
  api:
    build: .
    ports:
      - "3000:3000"
    env_file: .env
    environment:
      DATABASE_URL: postgresql://app:secret@db:5432/gym
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped
  db:
    image: postgres:17
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: gym
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app -d gym"]
      interval: 5s
      retries: 5
volumes:
  pgdata:`,
          flag: "script",
          try: R`في مشروع الـ Dockerfile حط المثال في [[compose.yaml]] (واعمل [[.env]] لو مش موجود). نفّذ [[docker compose config --quiet && echo valid]] وبعدين [[docker compose up -d --build]] و [[docker compose ps]] وافتح [[http://localhost:3000]]. وبعدين [[docker compose logs api]]. لما تخلص [[docker compose down -v]]. وجرّب تبوّظ المسافات في سطر [[image:]] وشغّل [[docker compose config]].`,
          deep: {
            why: R`أي تطبيق حقيقي مش container واحد: API وقاعدة بيانات و Redis وأحيانًا worker. تشغيلهم بأوامر [[docker run]] طويلة كل مرة مستحيل تفتكرها. الـ compose بيكتب ده كله في ملف واحد في الـ repo.`,
            how: R`[[docker compose up]] بيقرا الملف، يعمل network خاصة بالمشروع (اسمها [[<folder>_default]])، ويعمل الـ volumes، ويبني أو ينزّل الـ images، ويشغّل الخدمات بترتيب [[depends_on]]. وكل خدمة بتاخد اسم DNS على الشبكة دي هو اسم الخدمة، فـ [[db]] بيتحول لـ IP الـ container بتاع قاعدة البيانات.`,
            when: R`بيئة التطوير على جهازك (أشهر استخدام)، والسيرفرات الصغيرة (VPS) اللي عليها تطبيق كامل.`,
            mistakes: R`[[localhost]] بدل اسم الخدمة في رابط قاعدة البيانات. البورت مستخدم عندك ([[Bind for 0.0.0.0:3000 failed: port is already allocated]]): غيّر الرقم الشمال [[3001:3000]]. [[docker compose down -v]] وانت مش قاصد فتمسح الداتا. باسوردات حقيقية مكتوبة في الملف وهو في Git (حطها في [[.env]]). وتعمل [[depends_on]] من غير healthcheck فالـ api يبدأ قبل ما قاعدة البيانات تبقى جاهزة.`
          },
          teach: R`## الفكرة

المثال [[compose.yaml]] فيه خدمتين: [[api]] (بتتبني من الـ Dockerfile بتاع الدرس اللي فات) و [[db]] (PostgreSQL جاهز)، و volume واحد للداتا. هنقراه خدمة خدمة، وبعدين نشغّله ونشوف Docker بيعمل إيه بالترتيب. اتجرّب على ويندوز بـ Docker 29.6 في فولدر اسمه [[teach-files04-compose]]، مع تغييرين في نسخة التجربة بس: [[postgres:16-alpine]] بدل [[postgres:17]] (عشان دي اللي موجودة على الجهاز)، والبورت [["13000:3000"]] بدل [["3000:3000"]] (عشان 3000 ممكن يبقى مشغول). وفي الآخر [[docker compose down -v]] مسح كل حاجة.

---

## ١. [[services:]]

~~~text
services:
  api:
    ...
  db:
    ...
~~~

كل مفتاح تحت [[services]] خدمة، يعني container. الاسم ([[api]] و [[db]]) انت اللي بتختاره، وهو نفسه اللي الخدمات بتنادي بيه بعض على الشبكة. والإزاحة بالمسافات هي اللي بتقول مين جوه مين (درس YAML)، ومفيش Tab.

---

## ٢. خدمة [[api]]

~~~text
  api:
    build: .
    ports:
      - "3000:3000"
    env_file: .env
    environment:
      DATABASE_URL: postgresql://app:secret@db:5432/gym
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped
~~~

| السطر | معناه |
|---|---|
| [[build: .]] | ابني image من الـ [[Dockerfile]] اللي في الفولدر ده ([[.]]) |
| [[ports:]] و [[- "3000:3000"]] | [[-]] عنصر في ليستة. [[جهازك:الcontainer]]. والتنصيص عشان YAML ممكن يقرا [[xx:yy]] كرقم بالستيني (درس «مشكلة النرويج») |
| [[env_file: .env]] | اقرا متغيرات من [[.env]] وابعتها لجوه الـ container |
| [[environment:]] | متغيرات مكتوبة هنا مباشرة |
| [[depends_on:]] + [[condition: service_healthy]] | متبدأش [[api]] غير لما [[db]] تبقى healthy (الـ healthcheck بتاعها نجح) |
| [[restart: unless-stopped]] | لو وقعت قوّمها تاني، إلا لو انت اللي وقفتها |

### رابط قاعدة البيانات

~~~text
postgresql://app:secret@db:5432/gym
~~~

| الحتة | معناها |
|---|---|
| [[postgresql://]] | نوع الاتصال |
| [[app:secret]] | اليوزر والباسورد |
| [[@db]] | الـ host: اسم الخدمة، مش [[localhost]] |
| [[:5432]] | بورت PostgreSQL |
| [[/gym]] | اسم القاعدة |

ليه [[db]]؟ لأن [[localhost]] جوه container الـ api معناها الـ container ده نفسه، وPostgreSQL مش فيه. Compose بيدّي كل خدمة اسم على الشبكة. اتأكدنا من جوه الـ api:

~~~bash
docker compose exec api sh -c 'getent hosts db; echo $DATABASE_URL $LOG_LEVEL'
~~~

~~~text الناتج
172.18.0.2        db  db
postgresql://app:secret@db:5432/gym info
~~~

- [[exec api]]: نفّذ أمر جوه container الخدمة [[api]] وهو شغّال.
- [[getent hosts db]]: «الاسم [[db]] بيترجم لأنهي IP؟» ← [[172.18.0.2]]، وده الـ container بتاع قاعدة البيانات.
- [[info]] جاية من [[LOG_LEVEL=info]] اللي في [[.env]] (عن طريق [[env_file]]).

---

## ٣. خدمة [[db]]

~~~text
  db:
    image: postgres:17
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: gym
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app -d gym"]
      interval: 5s
      retries: 5
~~~

- [[image: postgres:17]]: image جاهزة من Docker Hub، مفيش build.
- [[POSTGRES_USER]] و [[POSTGRES_PASSWORD]] و [[POSTGRES_DB]]: متغيرات الـ image دي بتفهمها (مكتوبة في صفحتها على Docker Hub): أول مرة تقوم بتعمل اليوزر والقاعدة دول.
- [[pgdata:/var/lib/postgresql/data]]: [[اسم volume:مسار جوه الcontainer]]. PostgreSQL بيكتب الداتا في المسار ده، والـ volume بيحفظها بره الـ container، فلو الـ container اتمسح الداتا بتفضل. (ملحوظة من docs الـ image: من [[postgres:18]] المسار المقترح للـ volume بقى [[/var/lib/postgresql]].)
- [[healthcheck:]]:
  - [[test: ["CMD-SHELL", "..."]]]: نفّذ الأمر ده في shell جوه الـ container. [[pg_isready]] أداة جاية مع PostgreSQL بترجع 0 لو السيرفر بيقبل اتصالات، و [[-U app -d gym]] اليوزر والقاعدة.
  - [[interval: 5s]]: افحص كل ٥ ثواني.
  - [[retries: 5]]: ٥ مرات فشل ورا بعض = [[unhealthy]].

## ٤. [[volumes:]] في الآخر

~~~text
volumes:
  pgdata:
~~~

بره [[services]] (من غير إزاحة). بيعرّف volume اسمه [[pgdata]]، و [[:]] من غير حاجة بعدها يعني بالإعدادات الافتراضية.

---

## ٥. اتأكد من الملف: [[docker compose config]]

~~~bash
docker compose config --quiet && echo valid
~~~

[[--quiet]]: افحص بس من غير ما تطبع. ولو سليم يخرج بـ 0، فـ [[&&]] يطبع:

~~~text الناتج
valid
~~~

ومن غير [[--quiet]] بيطبع الملف «النهائي» بعد ما Compose يكمّله. جزء منه:

~~~text الناتج
name: teach-files04-compose
services:
  api:
    build:
      context: C:\Users\ali\...\teach-files04-compose
      dockerfile: Dockerfile
    environment:
      DATABASE_URL: postgresql://app:secret@db:5432/gym
      LOG_LEVEL: info
    ports:
      - mode: ingress
        target: 3000
        published: "13000"
        protocol: tcp
~~~

لاحظ: [[name]] = اسم الفولدر (اسم المشروع)، و [[LOG_LEVEL]] من [[.env]] اتدمج مع [[environment]]، و [["13000:3000"]] اتفك لـ [[published]] (جهازك) و [[target]] (الـ container).

ولما بوّظنا المسافات قبل [[image:]]:

~~~text مسافة زيادة
yaml: while parsing a block mapping at line 1, column 3: line 14, column 5: did not find expected key
~~~

~~~text مسافة ناقصة
yaml: line 15, column 16: mapping values are not allowed in this context
~~~

[[line]] و [[column]] السطر والحرف. ومع مسافة ناقصة، السطر اللي بعد [[image:]] بقى أدخل منه، فـ YAML قراه كأنه تكملة لقيمة [[postgres:16-alpine]]، فوقع في السطر ١٥ مش ١٤.

---

## ٦. التشغيل: [[docker compose up -d --build]]

- [[up]]: اعمل وشغّل كل حاجة.
- [[-d]]: في الخلفية.
- [[--build]]: ابني الـ images حتى لو موجودة.

~~~text الناتج (بعد سطور البناء)
 Image teach-files04-compose-api Built
 Network teach-files04-compose_default Created
 Volume teach-files04-compose_pgdata Created
 Container teach-files04-compose-db-1 Created
 Container teach-files04-compose-api-1 Created
 Container teach-files04-compose-db-1 Started
 Container teach-files04-compose-db-1 Waiting
 Container teach-files04-compose-db-1 Healthy
 Container teach-files04-compose-api-1 Starting
 Container teach-files04-compose-api-1 Started
~~~

الترتيب ده هو الملف كله: image الـ api، وشبكة اسمها [[<المشروع>_default]]، والـ volume [[<المشروع>_pgdata]]، والـ db تقوم، و Compose **يستنى** ([[Waiting]]) لحد [[Healthy]]، وبعدين بس الـ api تقوم. والأسامي [[<المشروع>-<الخدمة>-1]]: الـ [[1]] رقم النسخة من الخدمة.

~~~bash
docker compose ps
~~~

~~~text الناتج
NAME                          IMAGE                       SERVICE   STATUS                   PORTS
teach-files04-compose-api-1   teach-files04-compose-api   api       Up Less than a second    0.0.0.0:13000->3000/tcp, [::]:13000->3000/tcp
teach-files04-compose-db-1    postgres:16-alpine          db        Up 6 seconds (healthy)   5432/tcp
~~~

(شلنا عمودي COMMAND و CREATED عشان العرض.) [[(healthy)]] من الـ healthcheck. و [[0.0.0.0:13000->3000/tcp]] يعني البورت مفتوح على جهازك، أما [[5432/tcp]] من غير سهم يعني الـ db متاحة للخدمات التانية بس، مش لجهازك.

و [[curl http://localhost:13000]] رد بـ [[ok]]، و [[docker compose logs api]]:

~~~text الناتج
api-1  | listening on 3000
~~~

## ٧. القفل: [[docker compose down -v]]

~~~text الناتج (مختصر)
 Container teach-files04-compose-api-1 Removed
 Container teach-files04-compose-db-1 Removed
 Volume teach-files04-compose_pgdata Removed
 Network teach-files04-compose_default Removed
~~~

[[down]] وقّف وامسح الـ containers والشبكة. و [[-v]] امسح الـ volumes كمان، يعني **الداتا راحت**. من غير [[-v]] الـ volume بيفضل والداتا تستناك المرة الجاية.

---

## الخلاصة

| المفتاح | بيعمل |
|---|---|
| [[build]] / [[image]] | ابني من Dockerfile / استخدم جاهزة |
| [[ports]] | [["جهازك:الcontainer"]] بين تنصيص |
| [[environment]] / [[env_file]] | متغيرات لجوه الـ container |
| [[depends_on]] + [[service_healthy]] | استنى الخدمة التانية تبقى جاهزة |
| [[volumes]] | الداتا تعيش بعد الـ container |
| [[healthcheck]] | إزاي نعرف إنها جاهزة |

الخدمات بتكلم بعض **باسم الخدمة**، و [[docker compose config]] أول حاجة تعملها لما حاجة متشتغلش.`,
          lines: [
            R`كل الخدمات تحت المفتاح ده.`,
            R`خدمة اسمها [[api]].`,
            R`ابنيها من الـ Dockerfile اللي هنا.`,
            R`ليستة البورتات.`,
            R`[[جهازك:الcontainer]] بين تنصيص.`,
            R`متغيرات من ملف [[.env]].`,
            R`متغيرات مكتوبة هنا.`,
            R`الـ host هو [[db]] (اسم الخدمة) مش localhost.`,
            R`ابدأ بعد...`,
            R`...خدمة [[db]]...`,
            R`...لما الـ healthcheck بتاعها ينجح.`,
            R`لو وقعت قوّمها، إلا لو انت وقفتها.`,
            R`خدمة قاعدة البيانات.`,
            R`image جاهزة من Docker Hub.`,
            R`إعدادات الـ image (موثقة في صفحتها على Docker Hub).`,
            R`اليوزر.`,
            R`الباسورد.`,
            R`اسم القاعدة.`,
            R`الـ volumes بتاعة الخدمة دي.`,
            R`[[اسم:مسار جوه الcontainer]]: الداتا متضيعش لما الـ container يتمسح.`,
            R`إزاي نعرف إنها جاهزة.`,
            R`الأمر اللي بيفحص: [[pg_isready]].`,
            R`كل ٥ ثواني.`,
            R`٥ محاولات قبل ما تتعلّم unhealthy.`,
            R`تعريف الـ volumes بالاسم.`,
            R`volume اسمه [[pgdata]] بالإعدادات الافتراضية.`
          ],
          sol: R`[[docker compose config --quiet && echo valid]] ← [[valid]]
[[docker compose up -d --build]] بيبني الـ api ويستنى: [[Container ...-db-1 Waiting]] ثم [[Healthy]] ثم [[Container ...-api-1 Started]].
[[docker compose ps]] بيعرض [[db]] و [[Up ... (healthy)]]، و [[api]] و [[Up]].
والمتصفح بيعرض ok، و [[docker compose logs api]] فيه [[api-1  | listening on 3000]].

لو البورت 3000 مستخدم عندك: [[Bind for 0.0.0.0:3000 failed: port is already allocated]]، غيّره لـ [["3001:3000"]].
ولو بوّظت المسافات، [[docker compose config]] بيقول حاجة زي [[yaml: line 15, column 16: mapping values are not allowed in this context]] (مسافة ناقصة قبل [[image:]]: السطر اللي بعده بقى أدخل منه فاتقري كأنه تكملة ليه) أو [[yaml: while parsing a block mapping at line 1, column 3: line 14, column 5: did not find expected key]] (مسافة زيادة)، و [[line]] رقم السطر.`
        },
        {
          cmd: "Makefile",
          title: "Makefile بيتكتب إزاي، وليه لازم Tab مش مسافات؟",
          desc: R`[[Makefile]] (من غير امتداد) ملف بيقراه برنامج [[make]]، وفيه «أهداف» (targets) كل واحد ليه أوامر. أصله لبناء برامج C (بيبني بس الملفات اللي اتغيرت)، بس الناس بتستخدمه في أي مشروع كمكان واحد لكل الأوامر: [[make dev]] و [[make test]] و [[make deploy]]، بدل ما كل واحد يفتكر الأوامر الطويلة.

الصيغة:
• [[target: dependencies]]: اسم الهدف و [[:]] وبعدها الأهداف (أو الملفات) اللي لازم تتعمل الأول.
• تحتها سطور الأوامر، ولازم كل سطر يبدأ بـ Tab حقيقي، مش مسافات. ده أشهر غلط في Makefile.
• [[NAME = value]]: متغير، وبيتقري بـ [[$(NAME)]]. وتقدر تغيّره من الأمر: [[make build APP=other]].
• [[.PHONY: dev build]]: الأهداف دي مش أسامي ملفات، عشان لو فيه ملف اسمه [[build]] متتلخبطش.
• [[#]] تعليق.
• أول هدف في الملف هو الافتراضي لما تكتب [[make]] لوحدها.
• [[@]] قبل أمر: متطبعش الأمر نفسه.

[[make]] بييجي مع لينكس والماك (مع Xcode Command Line Tools). على ويندوز مش موجود افتراضيًا (WSL، أو [[choco install make]]).

الفكرة الأصلية: لو الهدف اسم ملف ([[app: main.c]])، [[make]] بيبني بس لو [[main.c]] أحدث من [[app]]. وده سبب «Nothing to be done» لما مفيش حاجة اتغيرت.

[[make -n target]] بيطبع الأوامر من غير ما ينفذها (تجربة آمنة). ووأخوات بنفس الفكرة: [[justfile]] (أداة just) و [[Taskfile.yml]] (Task)، و [[scripts]] في [[package.json]].`,
          example: R`# أوامر المشروع
APP = gym-api
.PHONY: dev build test clean
dev:
	npm run dev
build:
	docker build -t $(APP) .
test: build
	docker run --rm $(APP) npm test
clean:
	rm -rf dist node_modules`,
          flag: "script",
          try: R`اكتب المثال في [[Makefile]] في VS Code (السطور الداخلة لازم Tab: VS Code بيحط Tab لوحده في الملفات اللي اسمها Makefile). نفّذ [[make -n]] و [[make -n test]] و [[make -n build APP=other]]. وبعدين حوّل الـ Tab في سطر لـ ٤ مسافات وشغّل [[make -n]]. (لو مفيش make: [[docker run --rm -v "$PWD":/w -w /w gcc:14 make -n]].)`,
          deep: {
            why: R`كل مشروع فيه أوامر طويلة بتتكرر (بناء الـ image، تشغيل الاختبارات جوه Docker، الـ deploy). Makefile بيدّيها أسامي قصيرة، وبيوثّقها في نفس الوقت، وبيشتغل في أي لغة. و [[make]] نفسه موجود على أي لينكس من السبعينات.`,
            how: R`[[make test]] بيقرا الـ Makefile، يلاقي إن [[test]] بيعتمد على [[build]]، فينفذ أوامر [[build]] الأول، وبعدين أوامر [[test]]. كل سطر أمر بيتنفذ في shell لوحده (فـ [[cd]] في سطر مش بيأثر على السطر اللي بعده). والـ Tab هو الطريقة الوحيدة اللي [[make]] بيعرف بيها إن السطر ده أمر مش تعريف جديد.`,
            when: R`مشاريع فيها أكتر من أداة (Docker و npm و migrations)، ومشاريع C و Go كتير، وأي مشروع عايز «أمر واحد يعمل كل حاجة».`,
            mistakes: R`مسافات بدل Tab ([[*** missing separator.  Stop.]]). تنسى [[.PHONY]] وفيه فولدر اسمه [[test]] فـ [[make test]] يقول [[is up to date]] ومينفذش. تكتب [[cd dir]] في سطر والأمر اللي بعده في سطر تاني (اكتبهم [[cd dir && cmd]]). و [[$]] في أوامر shell لازم تتكتب [[$$]] جوه Makefile.`
          },
          teach: R`## الفكرة

المثال [[Makefile]] فيه متغير واحد و ٤ أهداف (targets): [[dev]] و [[build]] و [[test]] و [[clean]]. هنقراه سطر سطر، وبعدين نشغّله بـ [[make -n]] اللي بيطبع الأوامر من غير ما ينفّذها. [[make]] مش موجود على ويندوز (ولا في Git Bash)، فكل التجارب اتعملت على أوبونتو 24.04 جوه Docker بعد [[apt-get install make]]، والنسخة GNU Make 4.3.

---

## ١. التعليق والمتغير

~~~text
# أوامر المشروع
APP = gym-api
~~~

- [[#]]: تعليق.
- [[APP = gym-api]]: متغير اسمه [[APP]] قيمته [[gym-api]]. بيتقري تحت بـ [[$(APP)]]: الـ [[$]] والأقواس معناهم «حط قيمة المتغير هنا».

## ٢. [[.PHONY: dev build test clean]]

[[make]] أصلًا معمول للملفات: [[build:]] عنده معناها «عشان تعمل **ملف** اسمه build، نفّذ كذا». ولو لقى ملف أو فولدر بنفس الاسم ومفيش حاجة اتغيرت، بيعتبر الشغل خلصان. جرّبنا: شلنا سطر [[.PHONY]] وعملنا فولدر اسمه [[clean]]:

~~~text make clean (من غير .PHONY)
make: 'clean' is up to date.
~~~

ومنفّذش حاجة! ومع [[.PHONY]] رجع ينفّذ [[rm -rf dist node_modules]]. فـ [[.PHONY]] (phony = مزيّف) بيقول: «الأسامي دي أوامر، مش ملفات، نفّذها دايمًا».

## ٣. شكل الهدف

~~~text
dev:
	npm run dev
~~~

- [[dev:]]: اسم الهدف، و [[:]] بعده. اللي بعد [[:]] (فاضي هنا) الأهداف اللي لازم تتعمل الأول.
- السطر اللي تحته هو الأمر (اسمه recipe)، و**لازم** يبدأ بـ Tab حقيقي. [[cat -A Makefile]] بيوريك ده: الـ Tab بيظهر [[^I]] وآخر السطر [[$]]:

~~~text الناتج (السطرين دول)
dev:$
^Inpm run dev$
~~~

ولما حوّلنا الـ Tab في السطر الخامس لـ ٤ مسافات:

~~~text الناتج
M2:5: *** missing separator.  Stop.
~~~

[[M2:5]] اسم الملف ورقم السطر. [[missing separator]] يعني «السطر ده مش تعريف ومش أمر»: [[make]] بيعرف الأمر من الـ Tab بس.

و [[dev]] أول هدف في الملف، فـ [[make]] لوحدها بتشغّله:

~~~text make -n
npm run dev
~~~

[[-n]] (dry run): اطبع اللي هتعمله ومتنفّذوش. أحسن طريقة تجرّب بيها Makefile حد تاني كاتبه.

## ٤. [[build]] والمتغير

~~~text
build:
	docker build -t $(APP) .
~~~

[[$(APP)]] بيتبدّل قبل التنفيذ. وتقدر تغيّر المتغير من سطر الأوامر:

~~~text make -n build APP=other
docker build -t other .
~~~

القيمة اللي في الأمر بتغطي على اللي في الملف.

## ٥. [[test: build]]: هدف بيعتمد على هدف

~~~text
test: build
	docker run --rm $(APP) npm test
~~~

[[build]] بعد [[:]] معناها «اعمل [[build]] الأول». فـ:

~~~text make -n test
docker build -t gym-api .
docker run --rm gym-api npm test
~~~

أوامر [[build]] ثم أوامر [[test]]، ولو [[build]] فشل [[make]] بيقف ومش بيكمّل.

## ٦. [[clean]]

~~~text
clean:
	rm -rf dist node_modules
~~~

[[rm -rf]]: امسح ([[-r]] الفولدرات باللي فيها، و [[-f]] من غير سؤال ومن غير غلط لو مش موجود). شغّلناه بجد على فولدرين فاضيين، و [[make]] طبع الأمر قبل ما ينفّذه:

~~~text make clean
rm -rf dist node_modules
~~~

---

## ٧. حاجتين لازم تعرفهم

### [[@]] بيخبّي الأمر

~~~text
hi:
	@echo hello
hi2:
	echo hello
~~~

~~~text الناتج
hello            ← make hi
echo hello       ← make hi2
hello
~~~

من غير [[@]]، [[make]] بيطبع الأمر وبعدين ناتجه.

### كل سطر في shell لوحده

~~~text
x:
	cd /tmp
	pwd
y:
	cd /tmp && pwd
~~~

~~~text الناتج
cd /tmp
pwd
/w          ← make x: الـ cd مأثرش
cd /tmp && pwd
/tmp        ← make y
~~~

كل سطر recipe بيتنفّذ في shell جديد، فـ [[cd]] بيموت مع السطر بتاعه. لو محتاجهم مع بعض اكتبهم في سطر واحد بـ [[&&]].

### هدف مش موجود

~~~text make nothing
make: *** No rule to make target 'nothing'.  Stop.
~~~

---

## الخلاصة

| الحاجة | الشكل |
|---|---|
| متغير | [[NAME = value]] وبيتقري [[$(NAME)]] |
| هدف | [[name: deps]] وتحته أوامر بـ **Tab** |
| أوامر مش ملفات | [[.PHONY: ...]] |
| الافتراضي | أول هدف في الملف |
| تجربة آمنة | [[make -n target]] |
| تغيير متغير | [[make build APP=other]] |
| خبّي الأمر | [[@]] في أوله |

وعلى ويندوز: WSL أو Docker، لأن [[make]] مش جاي مع ويندوز ولا Git Bash.`,
          lines: [
            R`متغير.`,
            R`الأهداف دي أوامر مش ملفات.`,
            R`هدف [[dev]]، وهو الأول فـ [[make]] لوحدها تشغّله.`,
            R`أمر الهدف: بيبدأ بـ Tab.`,
            R`هدف [[build]].`,
            R`[[$(APP)]] بيتبدّل بـ [[gym-api]].`,
            R`[[test]] بيعتمد على [[build]]: هيتنفذ الأول.`,
            R`بعد الـ build شغّل الاختبارات.`,
            R`هدف التنضيف.`,
            R`يمسح الناتج والمكتبات.`
          ],
          sol: R`الناتج الحقيقي ([[-n]] بيطبع بس):
[[make -n]] ← [[npm run dev]]
[[make -n test]] ←
[[docker build -t gym-api .]]
[[docker run --rm gym-api npm test]]
[[make -n build APP=other]] ← [[docker build -t other .]]

ومع مسافات بدل Tab:
[[Makefile:5: *** missing separator.  Stop.]]
وهدف مش موجود: [[make: *** No rule to make target 'nothing'.  Stop.]]`
        }
      ]
    }
]);
