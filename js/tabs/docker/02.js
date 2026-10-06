// تكملة تاب docker: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/docker/01.js (شرح حقول الدرس في أوله)
MORE("docker", [
    {
      t: "Dockerfile: اعمل image لتطبيقك",
      l: 2,
      n: "كل سطر في Dockerfile بيعمل طبقة، والترتيب بيفرق في السرعة",
      items: [
        {
          cmd: "Dockerfile",
          title: "أول Dockerfile لتطبيق Node",
          desc: R`الـ Dockerfile ملف نصي فيه وصفة بناء الـ image: كل سطر تعليمة، و Docker بينفّذهم بالترتيب ويطلّع image تقدر تشغّلها في أي حتة. [[FROM node:22-alpine]] لازم أول سطر: بتبدأ من image جاهزة فيها Node على Alpine (لينكس صغير). [[WORKDIR /app]] بيعمل فولدر app ويدخله، فكل اللي بعده بيحصل جواه.

[[COPY package*.json ./]] بينسخ package.json و package-lock.json بس الأول (النجمة يعني أي حاجة)، عشان خطوة التسطيب تتحفظ في الكاش ومتتعادش كل ما تعدّل الكود. [[RUN]] بينفّذ أمر وقت البناء: [[npm ci]] بيسطّب بالظبط اللي في package-lock، و [[--omit=dev]] من غير devDependencies. [[COPY . .]] بينسخ باقي المشروع. [[EXPOSE 3000]] توثيق بس إن التطبيق بيسمع على 3000، والفتح الحقيقي بـ [[-p]] وقت التشغيل.

[[CMD ["node", "server.js"]]] الأمر اللي بيشتغل لما الـ container يقوم، والأقواس المربعة مهمة عشان node يستلم إشارة الإيقاف ويقفل بهدوء.`,
          example: R`FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]`,
          try: "احفظه في مشروع Node بسيط، وابني بـ [[docker build -t myapi .]]، وشغّل بـ [[docker run -p 3000:3000 myapi]].",
          flag: "script",
          deep: {
            why: "الـ image الجاهزة (nginx، postgres) بتيجي من Docker Hub. أما تطبيقك انت فمحتاج تعمله image بنفسك، والـ Dockerfile هو الوصفة.",
            how: R`[[FROM]] لازم أول سطر: بتبدأ من image جاهزة فيها Node، مش من الصفر.

[[WORKDIR /app]] بيعمل الفولدر ويدخله، وكل الأوامر بعده بتتنفذ فيه.

[[COPY package*.json ./]] بينسخ package.json و package-lock.json بس. ليه دول لوحدهم؟ عشان الطبقة اللي بعدها (npm ci) تتخزن في الكاش ومتتعادش كل ما تغيّر الكود. الشرح الكامل في «الطبقات والكاش».

[[RUN]] بينفّذ أمر وقت الـ build. [[npm ci]] بيسطّب بالظبط اللي في package-lock (أسرع وأثبت من npm install)، و [[--omit=dev]] من غير devDependencies.

[[COPY . .]] ينسخ باقي الكود. [[EXPOSE 3000]] توثيق بس إن التطبيق بيسمع على 3000، مش بيفتح البورت، الفتح بـ [[-p]].

[[CMD]] الأمر اللي يتشغّل لما الـ container يقوم. بالأقواس المربعة (exec form) عشان node يبقى العملية رقم 1 ويستلم إشارات الإغلاق.`,
            when: "كل تطبيق هتشغّله بـ Docker محتاج Dockerfile في أول المشروع.",
            mistakes: R`[[CMD npm start]] بدل [[CMD ["node", "server.js"]]]: npm بيبقى العملية 1 وبيبلع إشارة الإغلاق، فـ [[docker stop]] بيستنى ١٠ ثواني ويقتل. و [[COPY . .]] قبل npm ci، فكل تعديل في الكود يعيد التسطيب.`
          },
          teach: R`## الـ Dockerfile = وصفة

ملف نصي اسمه بالظبط [[Dockerfile]] (من غير امتداد)، كل سطر فيه **تعليمة** (instruction) بالكابيتال وبعدها اللي تعمله. [[docker build]] بيقراه من فوق لتحت ويطلّع image. السبع سطور دول أشهر شكل لتطبيق Node.

جربناه على مشروع صغير فيه ٣ ملفات، اتعملوا بالأوامر اللي في الـ solCode:

~~~text المشروع
server.js           سيرفر HTTP بيرد بـ hello على بورت 3000
package.json        {"name":"api","version":"1.0.0"}
package-lock.json   اتولد بـ npm install --package-lock-only
~~~

والبناء والتشغيل على Docker Desktop 29 (ويندوز 11). الـ Dockerfile نفسه مش بيتغير من نظام لنظام، لأنه بيتنفّذ جوه لينكس دايمًا.

---

## السطر بسطر

### [[FROM node:22-alpine]]

نقطة البداية: «ابدأ من image جاهزة فيها لينكس Alpine و Node 22». لازم يبقى أول تعليمة. كل اللي بعده طبقات فوقها.

### [[WORKDIR /app]]

اعمل فولدر [[/app]] لو مش موجود، وادخله. أي [[COPY]] أو [[RUN]] أو [[CMD]] بعده بيحصل جوه [[/app]]. زي [[mkdir -p /app && cd /app]] بس بيفضل ساري لآخر الملف.

### [[COPY package*.json ./]]

[[COPY من-عندي لـ-جوه]]: انسخ من فولدر المشروع لجوه الـ image.

- [[package*.json]]: النجمة يعني «أي حاجة»، فبتمسك [[package.json]] و [[package-lock.json]] الاتنين.
- [[./]]: الفولدر الحالي جوه الـ image، اللي هو [[/app]] بسبب WORKDIR.

ليه الملفين دول **لوحدهم** الأول؟ عشان الكاش، وده درس «الطبقات والكاش» الجاي.

### [[RUN npm ci --omit=dev]]

[[RUN]] = نفّذ الأمر ده **وقت البناء**، واحفظ اللي غيّره كطبقة.

- [[npm ci]] (clean install): بيسطّب بالظبط النسخ اللي في [[package-lock.json]]، ويفشل لو الـ lock مش موجود أو مش متطابق مع package.json. أثبت من [[npm install]] اللي ممكن يحدّث نسخ.
- [[--omit=dev]]: من غير الـ [[devDependencies]] (أدوات التطوير زي nodemon و eslint).

### [[COPY . .]]

النقطة الأولى = كل فولدر المشروع عندك، والتانية = [[/app]] جوه. يعني باقي الكود.

### [[EXPOSE 3000]]

**توثيق بس**: «التطبيق ده بيسمع على 3000». مش بيفتح أي بورت. الفتح الحقيقي بـ [[-p 3000:3000]] وقت [[docker run]].

### [[CMD ["node", "server.js"]]]

الأمر اللي يشتغل لما container يقوم من الـ image. الشكل ده بالأقواس المربعة اسمه **exec form**: كل كلمة بين علامتين [[" "]] ومفصولين بفاصلة. Docker بيشغّل [[node]] مباشرة من غير شيل في النص، فيبقى node هو العملية رقم 1 (PID 1) ويستلم إشارة الإيقاف بنفسه. (الشكل التاني [[CMD node server.js]] شرحه في «CMD و ENTRYPOINT».)

---

## البناء: [[docker build -t myapi .]]

| الجزء | معناه |
|---|---|
| [[build]] | ابني image |
| [[-t myapi]] | tag: سمّيها [[myapi]] (و [[:latest]] لوحدها) |
| [[.]] | الـ **build context**: الفولدر اللي هيتبعت لـ Docker، ومنه بيتقرا الـ Dockerfile والملفات اللي في COPY |

~~~text الناتج (مختصر)
#4 [internal] load build context
#4 transferring context: 601B done
#5 [1/5] FROM docker.io/library/node:22-alpine@sha256:0a7108bf...
#6 [2/5] WORKDIR /app
#7 [3/5] COPY package*.json ./
#8 [4/5] RUN npm ci --omit=dev
#8 1.282 up to date, audited 1 package in 702ms
#8 1.284 found 0 vulnerabilities
#9 [5/5] COPY . .
#10 naming to docker.io/library/myapi:latest done
~~~

| اللي في الناتج | معناه |
|---|---|
| [[transferring context: 601B]] | حجم الفولدر اللي اتبعت (٣ ملفات صغيرة) |
| [[[1/5]]] لحد [[[5/5]]] | الخطوات اللي بتعمل طبقات: FROM و WORKDIR و COPY و RUN و COPY |
| [[#8 1.282]] | سطر طبعه npm بعد 1.282 ثانية من بداية الخطوة |
| [[naming to ...myapi:latest]] | الـ image اتسمّت |

[[EXPOSE]] و [[CMD]] مش ظاهرين كخطوات لأنهم مش بيغيّروا ملفات، بيتسجلوا كإعدادات بس.

---

## التشغيل

~~~bash
docker run -d --rm --name api -p 3000:3000 myapi
curl -s localhost:3000
docker logs api
~~~

~~~text الناتج
hello
listening on 3000
~~~

### ملحوظة جربناها: [[docker stop]] أخد ١٠ ثواني

~~~text الناتج: time docker stop api
real	0m10.572s
~~~

مع إن CMD بالشكل الصح! السبب: node بقى PID 1 فعلًا، بس لينكس بيعامل PID 1 معاملة خاصة: الإشارات اللي ملهاش handler بتتجاهل. و [[server.js]] بتاعنا مفيهوش [[process.on("SIGTERM", ...)]]، فـ Docker استنى المهلة وقتله ([[Exited (137)]]). نفس الـ image مع [[docker run --init]] وقفت في نص ثانية (0.53)، لأن [[--init]] بيحط عملية صغيرة كـ PID 1 بتوصّل الإشارة. يعني الأقواس المربعة شرط لازم، بس لوحدها مش كفاية: يا handler في الكود، يا [[--init]].

---

## الخلاصة

| التعليمة | وقتها | بتعمل إيه |
|---|---|---|
| [[FROM]] | build | الـ image اللي بتبدأ منها |
| [[WORKDIR]] | build | فولدر الشغل |
| [[COPY]] | build | ملفات من عندك لجوه |
| [[RUN]] | build | أمر وقت البناء، ونتيجته طبقة |
| [[EXPOSE]] | توثيق | البورت اللي التطبيق بيسمع عليه |
| [[CMD]] | run | الأمر اللي يشتغل لما الـ container يقوم |

~~~text
RUN   وقت docker build، مرة واحدة
CMD   وقت docker run، كل مرة container يقوم
~~~`,
          lines: [
            "ابدأ من صورة Node 22 على Alpine.",
            "اعمل فولدر /app وادخله.",
            "انسخ package.json و package-lock بس (عشان الكاش).",
            "سطّب بالظبط اللي في lock، من غير devDependencies.",
            "دلوقتي انسخ باقي الكود.",
            "توثيق إن التطبيق على 3000.",
            "الأمر اللي يتشغّل، بالشكل اللي يخلي node العملية رقم 1."
          ],
          sol: R`[[docker build -t myapi .]] بيطبع خطوات [[[1/5] FROM]] لحد [[[5/5] COPY . .]] وفي الآخر [[naming to docker.io/library/myapi:latest]]. و [[docker run -p 3000:3000 myapi]] بيطبع اللي التطبيق بيطبعه (زي [[listening on 3000]])، و [[curl localhost:3000]] بيرد.

الأمر ماسك الترمنال لأنه من غير [[-d]]. [[Ctrl+C]] ممكن مايقفلوش لو التطبيق مش بيسمع SIGINT؛ ساعتها [[docker stop]] من ترمنال تاني.

الأغلاط الشائعة: [[npm ci]] يفشل بـ [[The npm ci command can only install with an existing package-lock.json]]: اعمل [[npm install]] مرة على جهازك عشان يتولد الـ lock. و [[Cannot find module '/app/server.js']] يعني اسم الملف في CMD غلط أو الـ [[.dockerignore]] استبعده. و [[curl]] يرجع [[Connection reset]] يعني السيرفر بيسمع على 127.0.0.1 بس جوه الـ container (درس 0.0.0.0).`,
          solCode: R`cat > server.js <<'EOF2'
require("http").createServer((q, r) => r.end("hello\n")).listen(3000, () => console.log("listening on 3000"));
EOF2
echo '{"name":"api","version":"1.0.0"}' > package.json
npm install --package-lock-only
docker build -t myapi .
docker run --rm -p 3000:3000 myapi`
        },
        {
          cmd: "الطبقات والكاش",
          title: "ليه package.json بيتنسخ الأول",
          desc: "كل تعليمة بتعمل «طبقة» متخزنة. لما تعيد الـ build، Docker بيعيد استخدام الطبقات اللي مدخلاتها متغيرتش، ولحظة ما طبقة تتغير، كل اللي بعدها بيتعاد. عشان كده بننسخ package.json ونسطّب قبل ما ننسخ الكود: تعديل في الكود ميعيدش npm ci.",
          example: R`docker build -t myapi .
docker build -t myapi .
docker history myapi
docker build --no-cache -t myapi .`,
          try: "ابني مرتين ورا بعض ولاحظ المرة التانية «CACHED» في كل خطوة وبتخلص في ثانية. غيّر سطر في الكود وابني تاني: هتلاقي npm ci لسه CACHED.",
          deep: {
            why: "الـ build الأول بياخد دقايق. من غير فهم الكاش، كل build بعده هياخد نفس الوقت. بالترتيب الصح، تعديل في الكود بيتبني في ثواني.",
            how: R`كل تعليمة في الـ Dockerfile بتعمل طبقة (layer)، وكل طبقة بتتحفظ في الكاش على جهازك مع «بصمة» مدخلاتها.

لما تعيد الـ build، Docker بيمشي على التعليمات بالترتيب، ولكل واحدة بيسأل: نفس التعليمة ونفس المدخلات؟ لو أيوه، ياخد الطبقة من الكاش (CACHED). أول ما يلاقي تعليمة اتغيرت، بيعيدها هي وكل اللي بعدها، حتى لو مش متغيرة.

بالنسبة لـ COPY، «المدخلات» هي محتوى الملفات. عشان كده الترتيب: انسخ package.json (بيتغير نادرًا)، سطّب (طبقة تقيلة، بتفضل في الكاش)، وبعدين انسخ الكود (بيتغير كل مرة). تعديل في الكود بيعيد بس آخر طبقتين الخفاف.

[[docker history]] بيوريك الطبقات وحجم كل واحدة، فتعرف إيه اللي مكبّر الـ image.

و [[--no-cache]] بيتجاهل الكاش كله، مفيد لو عايز تجيب آخر تحديثات أمان من apt أو npm.`,
            when: "وانت بتكتب أي Dockerfile: رتّب التعليمات من الأقل تغيرًا للأكتر.",
            mistakes: "[[RUN apt-get update]] في طبقة و [[RUN apt-get install]] في طبقة تانية: الأولى بتتخزن في الكاش، فبعد شهور التانية بتسطّب من كتالوج قديم. حطهم في RUN واحد بـ [[&&]]."
          },
          teach: R`## الفكرة: كل خطوة بتتحفظ، والتغيير بيكسر اللي بعده بس

كل تعليمة في الـ Dockerfile بتعمل **طبقة** (layer). Docker بيحفظ كل طبقة ومعاها «بصمة» للي دخل فيها. في الـ build الجاي، لكل خطوة بيسأل: نفس التعليمة ونفس الملفات؟ لو أيوه ياخدها جاهزة ([[CACHED]]). أول خطوة تختلف بتتعاد، **وكل اللي بعدها** بيتعاد حتى لو متغيرش.

جربنا الأربع سطور على مشروع «Dockerfile» اللي فات (نفس الـ Dockerfile ونفس الملفات) على Docker Desktop 29. أسماء الأوامر واحدة في أي شيل.

---

## ١ و ٢. ابني مرتين ورا بعض

~~~bash
docker build -t myapi .
docker build -t myapi .
~~~

المرة الأولى عملت كل حاجة (في الدرس اللي فات). المرة التانية:

~~~text الناتج (التاني)
#6 [2/5] WORKDIR /app
#6 CACHED
#7 [3/5] COPY package*.json ./
#7 CACHED
#8 [4/5] RUN npm ci --omit=dev
#8 CACHED
#9 [5/5] COPY . .
#9 CACHED
#10 DONE 0.2s
~~~

كل خطوة [[CACHED]]: مفيش ولا أمر اتنفّذ، والبناء خلص في ٠.٢ ثانية.

### نغيّر سطر في الكود

ضفنا تعليق لآخر [[server.js]] وبنينا تاني:

~~~text الناتج
#6 [2/5] WORKDIR /app
#6 CACHED
#7 [3/5] COPY package*.json ./
#7 CACHED
#8 [4/5] RUN npm ci --omit=dev
#8 CACHED
#9 [5/5] COPY . .
~~~

| الخطوة | ليه اتعادت أو لأ |
|---|---|
| [[3/5] COPY package*.json]] | package.json و الـ lock متغيروش، فالبصمة زي ما هي |
| [[4/5] RUN npm ci]] | اللي قبلها من الكاش ونفس الأمر، فهي كمان من الكاش |
| [[5/5] COPY . .]] | server.js اتغير، فاتعادت (ومن غير CACHED) |

وده بالظبط ليه بننسخ package.json **الأول**: تعديل في الكود بيعيد النسخ الخفيف بس، و [[npm ci]] (اللي ممكن ياخد دقايق في مشروع حقيقي) يفضل من الكاش.

### لو الترتيب غلط

لو [[COPY . .]] جه **قبل** [[RUN npm ci]]، أي تعديل في أي ملف هيكسر الـ COPY، وكل اللي بعده يتعاد، ومنه [[npm ci]]. يعني كل build يسطّب من الأول.

---

## ٣. [[docker history myapi]]: الطبقات وحجمها

~~~text الناتج (أول ١١ سطر)
IMAGE          CREATED          CREATED BY                                      SIZE      COMMENT
142f1fdffb68   52 seconds ago   CMD ["node" "server.js"]                        0B        buildkit.dockerfile.v0
<missing>      52 seconds ago   EXPOSE [3000/tcp]                               0B        buildkit.dockerfile.v0
<missing>      52 seconds ago   COPY . . # buildkit                             16.4kB    buildkit.dockerfile.v0
<missing>      52 seconds ago   RUN /bin/sh -c npm ci --omit=dev # buildkit     2.7MB     buildkit.dockerfile.v0
<missing>      53 seconds ago   COPY package*.json ./ # buildkit                16.4kB    buildkit.dockerfile.v0
<missing>      6 minutes ago    WORKDIR /app                                    8.19kB    buildkit.dockerfile.v0
<missing>      12 days ago      CMD ["node"]                                    0B        buildkit.dockerfile.v0
<missing>      12 days ago      ENTRYPOINT ["docker-entrypoint.sh"]             0B        buildkit.dockerfile.v0
<missing>      12 days ago      COPY docker-entrypoint.sh /usr/local/bin/ # …   20.5kB    buildkit.dockerfile.v0
<missing>      12 days ago      RUN /bin/sh -c apk add --no-cache --virtual …   5.48MB    buildkit.dockerfile.v0
<missing>      12 days ago      ENV YARN_VERSION=1.22.22                        0B        buildkit.dockerfile.v0
~~~

بيتقرا **من تحت لفوق**: الأقدم تحت، وآخر تعليمة فوق.

| العمود | معناه |
|---|---|
| [[CREATED BY]] | التعليمة اللي عملت الطبقة. [[RUN]] بيظهر [[/bin/sh -c ...]] لأن الأمر اتشغل جوه شيل |
| [[SIZE]] | الحجم اللي الطبقة دي زودته. [[CMD]] و [[EXPOSE]] صفر لأنهم إعدادات مش ملفات |
| [[<missing>]] | مش error: معناه إن الطبقة دي ملهاش ID لوحدها على جهازك، هي جزء من الـ image اللي فوق |
| [[12 days ago]] | الطبقات دي جاية من [[node:22-alpine]] نفسها، اتعملت لما اتبنت عند Docker Hub |

كده لو image كبيرة، تعرف مين اللي مكبّرها: دوّر على أكبر رقم في [[SIZE]]. هنا [[npm ci]] زوّد 2.7MB بس لأن المشروع ملوش dependencies، وفي مشروع حقيقي دي أتقل طبقة.

---

## ٤. [[docker build --no-cache -t myapi .]]: من غير كاش

~~~text الناتج
#6 [2/5] WORKDIR /app
#6 CACHED
#7 [3/5] COPY package*.json ./
#7 DONE 0.1s
#8 [4/5] RUN npm ci --omit=dev
#8 DONE 0.9s
#9 [5/5] COPY . .
#9 DONE 0.1s
~~~

[[--no-cache]] بيتجاهل الكاش، فالـ COPY و الـ RUN اتنفّذوا فعلًا ([[DONE]] بوقت بدل [[CACHED]]). و [[WORKDIR]] لسه مكتوب CACHED لأنه مجرد عمل فولدر فاضي، و BuildKit بيعتبره نفس النتيجة. البناء كله أخد ٢.٩ ثانية هنا، وفي مشروع حقيقي بـ مئات الباكدجات ممكن دقايق.

إمتى تستخدمه؟ لما عايز تجيب آخر تحديثات أمان لـ [[apt-get install]] أو [[apk add]]: الأوامر دي نصها مبيتغيرش، فالكاش هيفضل يدّيك النسخة القديمة للأبد.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[docker build -t NAME .]] | يبني، ويستخدم الكاش لأي خطوة مدخلاتها متغيرتش |
| [[docker history NAME]] | الطبقات من تحت لفوق وحجم كل واحدة |
| [[docker build --no-cache ...]] | يعيد كل الخطوات |

~~~text
الترتيب الصح: اللي بيتغير نادرًا فوق، واللي بيتغير كل يوم تحت
FROM → WORKDIR → COPY package*.json → RUN npm ci → COPY . .
~~~`,
          lines: [
            "ابني (المرة الأولى بتاخد وقت).",
            "ابني تاني: كل خطوة CACHED.",
            "الطبقات وحجم كل واحدة.",
            "ابني من غير كاش خالص."
          ],
          sol: R`البناء التاني على طول بيطبع [[CACHED]] تحت [[[2/5] WORKDIR]] و [[[3/5] COPY package*.json]] و [[[4/5] RUN npm ci]] و [[[5/5] COPY . .]]، ويخلص في أقل من ثانية.

بعد ما تغيّر سطر في [[server.js]]: [[2/5]] و [[3/5]] و [[4/5]] لسه [[CACHED]]، و [[5/5] COPY . .]] بس اللي اتنفذ من جديد. ده لأن [[package.json]] مااتغيرش، فطبقة [[npm ci]] زي ما هي. و [[docker history myapi]] بيوري كل طبقة وحجمها، وطبقة [[RUN npm ci]] هي التقيلة.

الغلط الشائع: [[npm ci]] بيتنفذ كل مرة. ده معناه إن [[COPY . .]] جاي قبله في الـ Dockerfile، فأي تعديل في أي ملف بيكسر الكاش لكل اللي بعده. أو إن [[package-lock.json]] بيتغير كل مرة لأنك بتعمل [[npm install]] بدل [[npm ci]].`
        },
        {
          cmd: ".dockerignore",
          title: "متنسخش node_modules",
          desc: "زي .gitignore بس للـ build. [[COPY . .]] بينسخ كل حاجة في الفولدر، بما فيها node_modules و .git و .env. ده بيبطّئ الـ build جدًا وممكن يحط أسرار جوه الـ image.",
          example: R`node_modules
.git
.env
*.log
dist
.next
Dockerfile
*compose*.y*ml`,
          try: "ابني مرة من غير الملف ومرة بيه، وقارن الوقت وحجم الـ image في [[docker images]].",
          flag: "script",
          deep: {
            why: "[[COPY . .]] بينسخ كل اللي في الفولدر. node_modules لوحده ممكن يبقى مئات الميجا وآلاف الملفات، وهيتسطب جوه الـ image تاني أصلًا. و .env فيه أسرار مينفعش تدخل image ممكن تترفع على registry.",
            how: R`قبل ما الـ build يبدأ، Docker بيبعت الفولدر كله (اسمه build context) للـ daemon. لو الفولدر فيه node_modules و .git، ده ممكن يبقى جيجابايت بيتنقل قبل أول تعليمة حتى.

[[.dockerignore]] بيقول إيه اللي ميتبعتش. صيغته شبه .gitignore، بس مش زيه بالظبط (الفرق تحت في الأخطاء).

node_modules لازم يتستثنى لسببين: الحجم، وإن اللي على جهازك متبني لنظامك (ويندوز أو ماك)، ومكتبات فيها كود native مش هتشتغل على لينكس جوه الـ container. الصح إن npm ci جوه الـ container يسطّبها للينكس.

.git بيكبّر الـ context من غير فايدة. .env أسرار. و dist أو .next ناتج build قديم ممكن يلخبط.`,
            when: "في كل مشروع فيه Dockerfile، من أول يوم.",
            mistakes: R`نسيانه، وبعدين تستغرب إن الـ build بطيء أو إن مكتبة native زي bcrypt بتطلع error جوه الـ container.

وخد بالك إن الصيغة مش زي .gitignore بالظبط: في .dockerignore، [[*.png]] بتمسك الصور اللي في جذر المشروع بس، ومش بتدخل الفولدرات. عشان تمسك كل مكان لازم [[**/*.png]]. في مشروع حقيقي الملف كان فيه [[*.png]] عشان يشيل screenshots مرمية في الجذر، ودي صح. لكن لو حد «صلّحها» لـ [[**/*.png]] هتشيل صور [[public/]] واللوجو، ومحليًا كله يشتغل وجوه الـ container الصور تطلع 404. ونفس الفكرة: [[node_modules]] لوحدها بتمسك اللي في الجذر بس، وفي monorepo محتاج [[**/node_modules]]. ولو شاكك، ابني واعمل [[docker run --rm myapi ls public]] وشوف الملفات وصلت ولا لأ.`
          },
          teach: R`## الملف ده بيقول لـ Docker: «متبعتش دول»

لما تكتب [[docker build ... .]]، أول حاجة بتحصل إن Docker بيبعت الفولدر [[.]] **كله** (الـ build context) للـ daemon اللي بيبني. [[.dockerignore]] ملف في نفس الفولدر، كل سطر فيه اسم أو نمط، واللي يطابقه مبيتبعتش أصلًا، فمستحيل [[COPY . .]] يوصله.

جربناه على مشروع «Dockerfile» بعد ما زودنا فيه حاجات بتحصل في أي مشروع حقيقي:

~~~text اللي زودناه
node_modules/fake/blob.bin   20 ميجا (بدل node_modules حقيقي)
.env                         SECRET=abc
logo.png                     صورة مرمية في أول المشروع
public/logo.png              صورة الموقع الحقيقية
~~~

---

## من غير الملف

~~~text الناتج: docker build -t myapi:noignore .
#5 transferring context: 20.01MB 1.1s done
~~~

اتبعت ٢٠ ميجا قبل أول تعليمة حتى. وجوه الـ image:

~~~text الناتج: docker run --rm myapi:noignore ls -a /app
.
..
.env
Dockerfile
logo.png
node_modules
package-lock.json
package.json
public
server.js
~~~

[[.env]] بالسر جوه الـ image، و [[node_modules]] بتاع جهازك. ([[ls -a]]: [[-a]] بتعرض الملفات اللي بتبدأ بنقطة، المخفية في لينكس.)

## مع الملف

~~~text الناتج: docker build -t myapi:ignore .
#4 transferring context: 268B 0.0s done
~~~

~~~text الناتج: docker images
IMAGE                 ID             DISK USAGE   CONTENT SIZE
myapi:ignore          efc4b37a5485        241MB         61.2MB
myapi:noignore        072321fc9303        281MB         81.2MB
~~~

من ٢٠ ميجا لـ ٢٦٨ byte، و [[CONTENT SIZE]] أصغر بـ ٢٠ ميجا بالظبط (حجم node_modules الوهمي). و [[DISK USAGE]] الفرق فيه ٤٠ لأن Docker هنا بيحتفظ بنسخة مضغوطة ونسخة مفكوكة من كل طبقة.

---

## السطور واحد واحد

| السطر | بيمسك | ليه |
|---|---|---|
| [[node_modules]] | فولدر المكتبات | تقيل، و [[npm ci]] جوه هيسطّبه للينكس. واللي على ويندوز أو ماك ممكن فيه كود native مبني لنظامك ميشتغلش جوه |
| [[.git]] | تاريخ Git كله | ممكن يبقى أكبر من المشروع، ومالوش لازمة في الإنتاج |
| [[.env]] | الأسرار | الـ image بتترفع وتتنقل، والسر يروح معاها |
| [[*.log]] | ملفات اللوج | [[*]] = أي اسم، فـ [[error.log]] و [[npm-debug.log]] |
| [[dist]] | ناتج build قديم من جهازك | الـ build الحقيقي يحصل جوه |
| [[.next]] | ناتج build بتاع Next.js | نفس السبب |
| [[Dockerfile]] | الـ Dockerfile نفسه | Docker بيقراه حتى لو مستبعد، بس مش هيتنسخ جوه الـ image |
| [[*compose*.y*ml]] | [[compose.yml]] و [[docker-compose.yaml]] وأخواتهم | [[*]] تمسك أي حروف، فـ [[y*ml]] تمسك yml و yaml |

---

## الفخ: النمط بيمسك أول المشروع بس

في [[.dockerignore]] النمط من غير [[**/]] بيتطابق من **أول** الـ context بس. جربنا سطر [[*.png]]:

~~~text الناتج: ls -a /app/public (مع *.png)
.
..
logo.png
~~~

[[logo.png]] اللي في أول المشروع اتشال، واللي في [[public/]] وصل. وغيّرناها لـ [[**/*.png]]:

~~~text الناتج: ls -a /app/public (مع **/*.png)
.
..
~~~

[[**]] معناها «أي عدد من الفولدرات»، فشالت صورة الموقع كمان. يعني الاتنين صح حسب اللي عايزه، بس لازم تعرف الفرق. وده بيفرق عن [[.gitignore]]، اللي فيه [[*.png]] بتمسك في أي فولدر. وبنفس المنطق [[node_modules]] لوحدها مش هتمسك [[apps/web/node_modules]] في monorepo، ومحتاج [[**/node_modules]].

---

## الخلاصة

~~~text
build context   الفولدر اللي بيتبعت لـ Docker (النقطة في آخر docker build)
.dockerignore   اللي مش هيتبعت، وبالتالي مستحيل يتنسخ
*.png           أول المشروع بس
**/*.png        أي فولدر
~~~

وعشان تتأكد: بص على سطر [[transferring context]] في أول الـ build، و [[docker run --rm IMAGE ls -a /app]] يوريك اللي وصل فعلًا.`,
          lines: [
            "المكتبات: هتتسطب جوه الصورة.",
            "تاريخ Git: مالوش لازمة.",
            "الأسرار: متدخلش الصورة أبدًا.",
            "اللوجات.",
            "ناتج build قديم.",
            "ناتج build بتاع Next.",
            "الـ Dockerfile نفسه مش محتاج يتنسخ.",
            "ولا ملفات compose."
          ],
          sol: R`أول سطر في الـ build بيقولك حجم اللي اتبعت لـ Docker: [[transferring context: 62.93MB]] من غير الملف (لو node_modules عندك كبير هتلاقيه مئات الميجا)، و [[transferring context: 177B]] بيه. والفرق باين في الوقت، وفي [[docker images]] الـ image اللي من غير الملف أكبر لأن [[COPY . .]] نسخ node_modules بتاع جهازك فوق اللي [[npm ci]] سطّبه.

وأخطر من الحجم: node_modules بتاعة ويندوز أو ماك جوه image لينكس بتبوّظ أي باكدج native، و [[.env]] بيدخل جوه الـ image.

الغلط الشائع: الملف يتسمى [[dockerignore]] من غير نقطة، أو يتحط في فولدر غير الـ context (الفولدر اللي في آخر [[docker build ... .]])، فمايتقريش خالص والـ context يفضل كبير.`
        },
        {
          cmd: "multi-stage",
          title: "image صغيرة للإنتاج",
          desc: "مرحلة أولى فيها كل أدوات الـ build (TypeScript، و devDependencies)، ومرحلة تانية نضيفة بتاخد الناتج بس. الـ image النهائية مفيهاش أدوات الـ build، فأصغر بكتير وأأمن.",
          example: R`FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/server.js"]`,
          try: "ابني مشروع TypeScript بالطريقتين وقارن الحجم. الفرق ممكن يبقى مئات الميجا.",
          flag: "script",
          deep: {
            why: "مشروع TypeScript أو Next.js محتاج أدوات كتير عشان يتبني، بس بعد الـ build مش محتاجها. لو سبتها في الـ image، بتبقى ضعف أو تلات أضعاف الحجم، وكل أداة زيادة ثغرة محتملة.",
            how: R`الـ Dockerfile فيه أكتر من [[FROM]]، وكل واحدة مرحلة (stage) لوحدها. [[AS build]] بيدّي المرحلة اسم.

المرحلة الأولى: بتسطّب كل الـ dependencies بما فيها devDependencies (TypeScript، والـ bundler)، وبتعمل [[npm run build]]، فبيطلع فولدر dist.

المرحلة التانية بتبدأ من image نضيفة، وبتسطّب dependencies الإنتاج بس، وبعدين [[COPY --from=build /app/dist ./dist]]: بتاخد الناتج بس من المرحلة الأولى. كل الأدوات والكود المصدري في المرحلة الأولى بتترمي.

الـ image النهائية هي آخر مرحلة بس. المرحلة الأولى بتفضل في الكاش على جهازك لكن مش بتتشحن.

[[ENV NODE_ENV=production]] بيخلي مكتبات كتير (Express مثلًا) تشتغل في وضع الإنتاج الأسرع. و [[USER node]] عشان التطبيق ميشتغلش كـ root.`,
            when: "أي مشروع فيه خطوة build: TypeScript، و Next.js، و Vite، و NestJS.",
            mistakes: "تنسخ node_modules من مرحلة الـ build بدل ما تعمل npm ci --omit=dev تاني، فتاخد devDependencies معاك. و Next.js ليه إعداد خاص (output: standalone) بيصغّر الناتج أكتر."
          },
          teach: R`## مرحلتين في ملف واحد

الـ Dockerfile ده فيه **اتنين** [[FROM]]. كل [[FROM]] بيبدأ **مرحلة** (stage) جديدة من الصفر. الأولى «ورشة» فيها TypeScript وكل أدوات البناء، والتانية «علبة» نضيفة بتاخد الناتج من الورشة بس. والـ image النهائية = **آخر مرحلة** بس.

جربناه على مشروع TypeScript صغير على Docker Desktop 29:

~~~text المشروع
src/server.ts       سيرفر HTTP
tsconfig.json       rootDir: src و outDir: dist
package.json        scripts.build = "tsc"، و devDependencies: typescript و @types/node
.dockerignore       node_modules و dist
~~~

---

## المرحلة الأولى: الورشة

### [[FROM node:22-alpine AS build]]

[[AS build]] بيدّي المرحلة اسم، عشان نشاور عليها بعدين.

### [[WORKDIR /app]] و [[COPY package*.json ./]]

زي أي Dockerfile: فولدر شغل، وملفات الباكدجات الأول عشان الكاش.

### [[RUN npm ci]]

من غير [[--omit=dev]] المرة دي، لأننا **محتاجين** الـ devDependencies: [[typescript]] هو اللي هيحوّل [[.ts]] لـ [[.js]].

### [[COPY . .]] و [[RUN npm run build]]

الكود، وبعدين [[npm run build]] اللي بيشغّل [[tsc]] (TypeScript compiler). [[tsc]] بيقرا [[tsconfig.json]]، وياخد [[src/server.ts]] ويطلّع [[dist/server.js]].

---

## المرحلة التانية: العلبة

### [[FROM node:22-alpine]]

بداية جديدة نضيفة. ولا ملف من المرحلة الأولى موجود هنا.

### [[ENV NODE_ENV=production]]

متغير بيئة بيفضل في الـ image. مكتبات كتير (Express مثلًا) بتقراه وتشتغل في وضع أسرع ومن غير رسايل debug.

### [[RUN npm ci --omit=dev]]

مكتبات الإنتاج بس. مشروعنا ملوش dependencies للإنتاج، فـ node_modules هنا تقريبًا فاضي.

### [[COPY --from=build /app/dist ./dist]]

ده قلب الدرس. [[--from=build]] يعني «انسخ مش من جهازي، من المرحلة اللي اسمها build». فبناخد فولدر [[dist]] الجاهز بس، وكل حاجة تانية في الورشة (TypeScript، والـ source، والـ devDependencies) بتترمي.

### [[USER node]] و [[EXPOSE 3000]] و [[CMD ["node", "dist/server.js"]]]

اشتغل كيوزر عادي مش root، ووثّق البورت، وشغّل الملف المبني.

---

## البناء

~~~text الناتج (أسماء الخطوات بس)
#4 [build 1/6] FROM docker.io/library/node:22-alpine@sha256:0a7108bf...
#6 [build 2/6] WORKDIR /app
#7 [build 3/6] COPY package*.json ./
#8 [stage-1 4/5] RUN npm ci --omit=dev
#9 [build 4/6] RUN npm ci
#10 [build 5/6] COPY . .
#11 [build 6/6] RUN npm run build
#12 [stage-1 5/5] COPY --from=build /app/dist ./dist
#13 naming to docker.io/library/tsapi:multi done
~~~

| اللي في الناتج | معناه |
|---|---|
| [[[build 2/6]]] | خطوة ٢ من ٦ في المرحلة اللي اسمها build |
| [[[stage-1 4/5]]] | المرحلة التانية، ومالهاش اسم فـ Docker سماها [[stage-1]] (العدّ من صفر) |
| ترتيب الأرقام [[#8]] قبل [[#9]] | BuildKit بيشغّل الخطوات اللي مش معتمدة على بعض **في نفس الوقت**: [[npm ci --omit=dev]] في المرحلة التانية مش محتاج الأولى، فاشتغل بالتوازي |
| خطوات [[stage-1]] 1 و 2 و 3 مش ظاهرة | نفس [[FROM]] و [[WORKDIR]] و [[COPY]] بتوع المرحلة الأولى، فاتاخدوا من الكاش |

---

## النتيجة: قارنّاها بـ Dockerfile من مرحلة واحدة

بنينا نفس المشروع بـ Dockerfile فيه مرحلة واحدة (npm ci كامل، و build، و CMD):

~~~text الناتج: docker images
IMAGE          ID             DISK USAGE   CONTENT SIZE
tsapi:multi    3307a0160c92        241MB         61.2MB
tsapi:single   19d18f207e4f        280MB         70.5MB
~~~

~~~text الناتج: ls /app في كل واحدة
multi:   dist  node_modules  package-lock.json  package.json
single:  Dockerfile  Dockerfile.single  dist  node_modules  package-lock.json  package.json  src  tsconfig.json
~~~

الفرق هنا ٤٠ ميجا بس لأن المشروع فيه devDependency واحدة تقيلة (TypeScript). في مشروع فيه Jest و ESLint و Prisma CLI و bundler الفرق بيبقى مئات الميجا. والـ multi مفيهاش [[src]] ولا [[tsconfig.json]]: الكود الأصلي مابيوصلش السيرفر خالص.

~~~text الناتج
$ docker run --rm tsapi:multi whoami
node
$ docker run --rm tsapi:multi sh -c 'echo $NODE_ENV'
production
~~~

---

## الخلاصة

| الجزء | معناه |
|---|---|
| [[FROM ... AS build]] | مرحلة ليها اسم |
| تاني [[FROM]] | مرحلة جديدة فاضية |
| [[COPY --from=build مسار مسار]] | انسخ من مرحلة تانية مش من جهازك |
| آخر مرحلة | هي الـ image اللي بتتشحن |

~~~text
المرحلة الأولى   npm ci كامل + build     (بتترمي)
المرحلة التانية  npm ci --omit=dev + dist (هي اللي بتتشحن)
~~~`,
          lines: [
            "المرحلة الأولى، اسمها build.",
            "فولدر الشغل.",
            "ملفات الباكدجات.",
            "سطّب كل حاجة بما فيها devDependencies (محتاجين TypeScript).",
            "الكود.",
            "ابني: يطلع dist.",
            "المرحلة التانية من صورة نضيفة.",
            "فولدر الشغل.",
            "وضع الإنتاج.",
            "ملفات الباكدجات.",
            "سطّب dependencies الإنتاج بس.",
            "خد الناتج بس من المرحلة الأولى.",
            "اشتغل كيوزر node مش root.",
            "توثيق البورت.",
            "شغّل الناتج المبني."
          ],
          sol: R`الـ image المتقسمة هتطلع أصغر بوضوح، لأن المرحلة الأخيرة فيها [[dist]] والـ dependencies بتاعة الإنتاج بس، من غير TypeScript والـ devDependencies والـ source. في مشروع Express عادي الفرق ممكن يبقى من حوالي 400-600MB لحوالي 150-250MB في عمود الحجم في [[docker images]]، والرقم بيعتمد على الـ devDependencies عندك (لو فيها Jest و ESLint و Prisma CLI الفرق هيبقى كبير).

اتأكد إنها شغالة: [[docker run --rm myapi ls /app]] المفروض يوري [[dist]] و [[node_modules]] و [[package.json]] بس، من غير [[src]]. و [[docker run --rm myapi whoami]] يطبع [[node]].

الغلط الشائع: [[Cannot find module '/app/dist/server.js']]: اسم الفولدر اللي [[tsc]] بيطلّع فيه مش [[dist]]، أو ملف [[server.ts]] في فولدر [[src]] فبيطلع [[dist/src/server.js]]. شوف [[outDir]] و [[rootDir]] في tsconfig.`
        },
        {
          cmd: "ENV و ARG",
          title: "إعدادات وقت الـ build ووقت التشغيل",
          desc: "[[ARG]] قيمة بتتستخدم وقت الـ build بس ومبتفضلش في الـ image. [[ENV]] بتفضل في الـ image وبتوصل للتطبيق وقت التشغيل. الأسرار متتحطش في أي منهم: بتتبعت وقت التشغيل بـ [[-e]] أو env file.",
          example: R`ARG NODE_VERSION=22
FROM node:$__{NODE_VERSION}-alpine
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000`,
          try: "ابني بـ [[docker build --build-arg NODE_VERSION=20 -t myapi .]] وشوف النسخة اتغيرت بـ [[docker run --rm myapi node -v]].",
          flag: "script",
          deep: {
            why: "محتاج تغيّر حاجات وقت الـ build (نسخة Node) وحاجات وقت التشغيل (البورت، والوضع)، ومحتاج تعرف إيه اللي بيفضل جوه الـ image وإيه اللي لأ.",
            how: R`[[ARG]] متغير وقت الـ build بس. بتديه قيمة بـ [[--build-arg]]، وبعد ما الـ build يخلص بيختفي. مفيد لنسخة الـ base image أو لـ flags.

وممكن تستخدمه في [[FROM]] لو عرّفته قبلها، زي المثال، وده الاستخدام الوحيد اللي ينفع فيه ARG قبل FROM.

[[ENV]] بيتخزن في الـ image وبيبقى موجود في أي container منها، والتطبيق بيقراه من process.env. بتستخدمه للقيم الافتراضية اللي مش سرية.

أي حاجة في ENV أو ARG بتبان في [[docker history]] وفي [[inspect]]. عشان كده الأسرار عمرها ما تتحط فيهم. الأسرار بتيجي وقت التشغيل من [[--env-file]] أو من secrets manager.`,
            when: "ARG لنسخ الأدوات. ENV للقيم الافتراضية زي NODE_ENV و PORT.",
            mistakes: "[[ENV DATABASE_URL=postgres://user:pass@...]] في Dockerfile. الباسورد بقى جزء من الـ image لأي حد ينزّلها."
          },
          teach: R`## نوعين متغيرات، كل واحد ليه وقت

| | [[ARG]] | [[ENV]] |
|---|---|---|
| موجود إمتى | وقت [[docker build]] بس | وقت البناء **و** في كل container بعدين |
| بتغيّره إزاي | [[--build-arg NAME=value]] | [[-e NAME=value]] وقت [[docker run]] |
| التطبيق يشوفه؟ | لأ | أيوه ([[process.env.PORT]] في Node) |

جربنا الخمس سطور على Docker Desktop 29، في ملف لوحده من غير كود (الدرس عن المتغيرات بس).

---

## السطر بسطر

### [[ARG NODE_VERSION=22]]

بيعرّف متغير build اسمه [[NODE_VERSION]] وقيمته الافتراضية [[22]]. الافتراضية بتتستخدم لو محدش بعت قيمة.

### [[FROM node:$__{NODE_VERSION}-alpine]]

[[$__{NODE_VERSION}]] معناها «حط قيمة المتغير هنا». [[$]] و [[{ }]] نفس طريقة الشيل. فلو القيمة 22 السطر يبقى [[FROM node:22-alpine]].

وده الاستخدام **الوحيد** لـ ARG قبل [[FROM]]: يتعرّف بره أي مرحلة ويتستخدم في سطر FROM بس.

### [[ENV NODE_ENV=production]] و [[ENV PORT=3000]]

متغيرات بيئة بتتحفظ جوه الـ image، وأي container منها بيلاقيها. قيم افتراضية مش سرية: وضع الإنتاج والبورت.

### [[EXPOSE 3000]]

توثيق البورت (من درس «Dockerfile»).

---

## نجرّب: نسختين من نفس الملف

~~~bash
docker build -t myapi .
docker run --rm myapi node -v
docker build --build-arg NODE_VERSION=20 -t myapi:20 .
docker run --rm myapi:20 node -v
~~~

~~~text الناتج
v22.23.3
v20.20.2
~~~

[[--build-arg NODE_VERSION=20]] غيّرت قيمة الـ ARG للبناء ده بس، فسطر FROM بقى [[node:20-alpine]]، والـ image كلها اتبنت على Node تاني. نفس الـ Dockerfile بالظبط.

---

## إيه اللي فضل جوه الـ image؟

~~~bash
docker run --rm myapi env | grep -E "NODE_ENV|PORT|NODE_VERSION"
~~~

- [[env]] بيطبع كل متغيرات البيئة جوه الـ container.
- [[grep -E "A|B|C"]]: [[-E]] (extended) بتخلي [[|]] معناها «أو»، فبيطبع أي سطر فيه واحدة من التلاتة.

~~~text الناتج
NODE_VERSION=22.23.3
PORT=3000
NODE_ENV=production
~~~

| المتغير | جه منين |
|---|---|
| [[PORT]] و [[NODE_ENV]] | الـ ENV بتوعنا، فضلوا في الـ image |
| [[NODE_VERSION=22.23.3]] | ده **مش** الـ ARG بتاعنا (اللي قيمته كانت [[22]]). ده ENV معمول جوه صورة [[node]] الرسمية نفسها بالاسم ده بالصدفة |

والـ ARG بتاعنا اختفى بعد البناء. وكل الـ ENV ظاهرين لأي حد معاه الـ image من غير ما يشغّلها:

~~~bash
docker inspect --format '{{json .Config.Env}}' myapi
~~~

~~~text الناتج
["PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","NODE_VERSION=22.23.3","YARN_VERSION=1.22.22","NODE_ENV=production","PORT=3000"]
~~~

وده سبب إن أي سر في ENV ملكش فيه: مكتوب في الـ image نفسها.

---

## الغلطة المشهورة: ARG بعد FROM

لو حطيت [[ARG NODE_VERSION]] **بعد** أول FROM وحاولت تستخدمه في FROM تاني، جربناها:

~~~text الناتج
WARN: InvalidDefaultArgInFrom: Default value for ARG node:$__{NODE_VERSION}-alpine results in empty or invalid base image name (line 3)
WARN: UndefinedArgInFrom: FROM argument 'NODE_VERSION' is not declared (line 3)
ERROR: failed to build: failed to solve: failed to parse stage name "node:-alpine": invalid reference format
~~~

المتغير اتقرا فاضي، فالاسم بقى [[node:-alpine]]، ودي مش image. الـ ARG اللي FROM بيستخدمه لازم يبقى فوق خالص.

---

## الخلاصة

~~~text
ARG   وقت البناء بس، بيتغير بـ --build-arg، ومبيوصلش للتطبيق
ENV   محفوظ في الـ image، والتطبيق بيقراه، ويتغير وقت التشغيل بـ -e
السر  ولا ده ولا ده: وقت التشغيل من --env-file
~~~`,
          lines: [
            "متغير build بقيمة افتراضية.",
            "استخدمه في اسم الصورة (الاستخدام الوحيد لـ ARG قبل FROM).",
            "متغير بيئة بيفضل في الصورة ووقت التشغيل.",
            "البورت الافتراضي.",
            "توثيق."
          ],
          sol: R`[[docker run --rm myapi node -v]] بعد البناء بـ [[--build-arg NODE_VERSION=20]] بيطبع [[v20.x.x]]، ومن غيره بيطبع [[v22.x.x]] (عندي [[v22.23.3]]). ده لأن الـ ARG اتحط في سطر FROM، فاختار base image مختلفة.

و [[docker run --rm myapi env | grep -E "NODE_ENV|PORT"]] بيوري [[NODE_ENV=production]] و [[PORT=3000]]: الـ ENV بيفضل في الـ image، لكن [[NODE_VERSION]] الـ ARG مش هيظهر كمتغير بتاعك (اللي هتلاقيه [[NODE_VERSION]] تاني بتاع صورة node نفسها).

الغلط الشائع: تحط [[ARG NODE_VERSION]] بعد [[FROM]] وتستخدمه في FROM، فيطلع [[base name (node:-alpine) should not be blank]] أو [[invalid reference format]]. الـ ARG اللي FROM بيستخدمه لازم يبقى قبله.`
        },
        {
          cmd: "USER و HEALTHCHECK",
          title: "متشغّلش كـ root",
          desc: "افتراضيًا التطبيق جوه الـ container بيشتغل كـ root. لو اتخترق، المهاجم root جوه الـ container. صور Node فيها يوزر جاهز اسمه node. و [[HEALTHCHECK]] بيخلي Docker يعرف التطبيق «شغال فعلًا» مش بس «العملية موجودة».",
          example: R`FROM node:22-alpine
WORKDIR /app
COPY --chown=node:node package*.json ./
RUN npm ci --omit=dev
COPY --chown=node:node . .
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
  CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["node", "server.js"]`,
          try: "شغّل الـ container وبعد نص دقيقة شوف [[docker ps]]: عمود STATUS هيقول healthy أو unhealthy.",
          flag: "script",
          deep: {
            why: "لو التطبيق اتخترق وهو شغال كـ root، المهاجم root جوه الـ container، وفيه ثغرات بتخليه يخرج منه للسيرفر. و HEALTHCHECK بيحل مشكلة تانية: عملية Node ممكن تبقى شغالة بس التطبيق معلّق ومش بيرد.",
            how: R`صور Node الرسمية فيها يوزر جاهز اسمه [[node]] برقم 1000. [[USER node]] بيخلي كل اللي بعده (وأهمهم CMD) يشتغل بيه. بس لازم الملفات تبقى مقروءة له، عشان كده [[COPY --chown=node:node]].

الترتيب مهم: أي [[RUN]] محتاج صلاحيات (زي تسطيب باكدجات نظام) يبقى قبل [[USER]].

[[HEALTHCHECK]] بيخلي Docker يشغّل أمر كل فترة جوه الـ container. لو رجع 0 الـ container healthy، لو رجع 1 unhealthy. [[--interval]] كل قد إيه، [[--timeout]] يستنى قد إيه، و [[--start-period]] مهلة في الأول التطبيق يقوم فيها من غير ما تتحسب.

الحالة بتظهر في [[docker ps]]، و compose بيستخدمها في [[depends_on]] عشان ميشغّلش التطبيق غير لما القاعدة تبقى جاهزة فعلًا. بس Docker لوحده مش بيعيد تشغيل الـ unhealthy، ده محتاج أداة زي autoheal أو orchestrator.`,
            when: "كل image للإنتاج: USER دايمًا. HEALTHCHECK لأي خدمة فيها endpoint للصحة.",
            mistakes: "USER قبل RUN اللي محتاج root فيطلع permission denied. و HEALTHCHECK بـ curl في image alpine مفيهاش curl، استخدم wget."
          },
          teach: R`## حاجتين في Dockerfile واحد

1. **[[USER]]**: التطبيق يشتغل بيوزر عادي مش root.
2. **[[HEALTHCHECK]]**: Docker يسأل التطبيق كل شوية «انت كويس؟» ويكتب الإجابة جنب الـ container.

جربناه على سيرفر Node صغير بيرد بـ [[ok]] على [[/health]] و [[hello]] على [[/]] و 404 على أي حاجة تانية، على Docker Desktop 29.

---

## السطور الجديدة بس

([[FROM]] و [[WORKDIR]] و [[RUN npm ci]] و [[EXPOSE]] و [[CMD]] زي درس «Dockerfile».)

### [[COPY --chown=node:node package*.json ./]]

[[--chown]] (change owner): الملفات المنسوخة تبقى ملك يوزر [[node]] وجروب [[node]] بدل root. الشكل [[يوزر:جروب]]. صورة node الرسمية فيها اليوزر ده جاهز:

~~~text الناتج: docker exec api id
uid=1000(node) gid=1000(node) groups=1000(node)
~~~

[[uid]] رقم اليوزر (root دايمًا 0)، و [[gid]] رقم الجروب.

### [[USER node]]

من السطر ده لتحت، كل [[RUN]] و الـ [[CMD]] نفسه بيشتغلوا كـ [[node]]:

~~~text الناتج
$ docker exec api whoami
node
$ docker exec api ls -l /app    (مختصر)
-rwxr-xr-x    1 node     node           169 Oct  6 12:07 package-lock.json
-rwxr-xr-x    1 node     node            33 Oct  6 12:07 package.json
-rwxr-xr-x    1 node     node           161 Oct  6 12:07 server.js
~~~

العمودين التالت والرابع (صاحب الملف وجروبه) [[node]] بسبب [[--chown]].

### ليه [[--chown]] مهمة؟ جربناها من غيرها

~~~text Dockerfile تجربة
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
USER node
RUN touch /app/cache.txt
~~~

~~~text الناتج
#8 [4/4] RUN touch /app/cache.txt
#8 0.287 touch: /app/cache.txt: Permission denied
~~~

[[WORKDIR]] عمل [[/app]] كـ root، والـ COPY من غير chown نسخ كـ root، فيوزر node مش قادر يكتب. نفس اللي بيحصل لما [[npm ci]] أو التطبيق يحاول يكتب كاش أو uploads. ولنفس السبب: أي [[RUN]] محتاج root (زي [[apk add]]) لازم ييجي **قبل** [[USER]].

---

## [[HEALTHCHECK]]

~~~text
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
  CMD wget -qO- http://localhost:3000/health || exit 1
~~~

### الخيارات

| الخيار | معناه |
|---|---|
| [[--interval=30s]] | افحص كل ٣٠ ثانية |
| [[--timeout=3s]] | لو الفحص أخد أكتر من ٣ ثواني، اعتبره فشل |
| [[--start-period=10s]] | أول ١٠ ثواني مهلة للتطبيق يقوم، والفشل فيها مش بيتحسب |
| [[\]] في آخر السطر | التعليمة مكملة في السطر اللي تحته |

### الفحص نفسه

- [[CMD]] هنا تبع HEALTHCHECK، مش الـ CMD بتاع التطبيق.
- [[wget -qO- URL]]: هات الصفحة. [[-q]] (quiet) من غير رسايل تقدم، و [[-O-]] اطبع المحتوى على الشاشة بدل ما تحفظه ملف. و [[wget]] مش [[curl]] لأن alpine فيها wget بس.
- [[|| exit 1]]: [[||]] يعني «لو اللي قبلي فشل، نفّذ اللي بعدي». فلو wget فشل نخرج بـ 1 صريح.

Docker بيبص على **exit code** الفحص: 0 = سليم، 1 = مش سليم.

### الحالات في [[docker ps]]

~~~text الناتج: docker ps بعد ثانيتين
Up 2 seconds (health: starting)
~~~

بعدها بخمس ثواني كان [[(healthy)]]. ليه ٥ مش ٣٠؟ لأن جوه الـ start-period Docker (من نسخة 25) بيفحص كل ٥ ثواني افتراضيًا (اسمها [[--start-interval]])، وبعدها بيمشي على الـ interval. ده بيبان في سجل الفحوصات:

~~~bash
docker inspect --format '{{json .State.Health.Log}}' api
~~~

~~~text الناتج
[{"Start":"2026-10-06T12:07:58.309715551Z",...,"ExitCode":0,"Output":"ok"},{"Start":"2026-10-06T12:08:28.372236561Z",...,"ExitCode":0,"Output":"ok"}]
~~~

الـ container قام 12:07:53، أول فحص 12:07:58، والتاني بعده بـ ٣٠ ثانية بالظبط.

### ولو المسار غلط؟

غيّرنا [[/health]] لـ [[/nope]] (السيرفر بيرد عليها 404):

~~~text الناتج: سجل الفحص
"ExitCode":1,"Output":"wget: server returned error: HTTP/1.1 404 Not Found\n"
~~~

~~~text الناتج: docker ps بعد دقيقة
Up About a minute (unhealthy)
~~~

[[unhealthy]] بعد **٣** فحوصات فاشلة ورا بعض (الافتراضي [[--retries=3]]): [[docker inspect]] كان فيه [[FailingStreak]] = 3. ولاحظ إن الـ container لسه [[Up]]: Docker لوحده مش بيعيد تشغيل الـ unhealthy، بيكتب الحالة بس، و compose بيستخدمها في [[depends_on: condition: service_healthy]].

---

## الخلاصة

| السطر | ليه |
|---|---|
| [[COPY --chown=node:node]] | الملفات ملك اليوزر اللي هيشغّلها |
| [[USER node]] | كل اللي بعده مش root، فييجي بعد أي RUN محتاج root |
| [[HEALTHCHECK ... CMD أمر]] | exit 0 سليم، غيره مش سليم |

~~~text
health: starting   جوه الـ start-period
healthy            آخر فحص نجح
unhealthy          3 فحوصات فشلت ورا بعض (والـ container لسه شغال)
~~~`,
          lines: [
            "الصورة.",
            "فولدر الشغل.",
            "ملفات الباكدجات الأول (عشان الكاش) ويوزر node صاحبها.",
            "سطّب.",
            "باقي الكود.",
            "من هنا كل حاجة تشتغل كـ node مش root.",
            "توثيق.",
            "فحص كل ٣٠ ثانية، مهلة ٣ ثواني، وأول ١٠ ثواني متتحسبش. الشرطة المايلة: مكمّل في السطر الجاي.",
            "الفحص نفسه: اطلب /health، ولو فشل ارجع 1 (unhealthy). wget لأن alpine مفيهاش curl.",
            "شغّل التطبيق."
          ],
          sol: R`أول ما تشغّل، [[docker ps]] بيوري [[Up 2 seconds (health: starting)]]. وبعد الـ start-period وأول فحص ناجح: [[Up 35 seconds (healthy)]]. و [[docker exec api whoami]] بيطبع [[node]] مش [[root]].

لو عايز تشوف تفاصيل الفحص: [[docker inspect --format '{{.State.Health.Status}}' api]] بيطبع [[healthy]]، و [[.State.Health.Log]] فيه آخر نتايج بالـ exit code والناتج.

لو طلع [[unhealthy]]: غالبًا مسار [[/health]] مش موجود فـ [[wget]] بيطبع [[server returned error: HTTP/1.1 404 Not Found]] ويخرج بـ 1، أو التطبيق على بورت تاني. والغلط التاني الشائع: [[npm ci]] أو الكتابة في فولدر يفشل بـ [[EACCES]] بعد [[USER node]]، لأن الملفات اتنسخت ملك root من غير [[--chown=node:node]].`
        },
        {
          cmd: "build / tag / push",
          title: "ارفع الـ image على registry",
          desc: "الـ registry مخزن للـ images (Docker Hub، أو GitHub Container Registry ghcr.io). بتبني على جهازك أو في CI، وترفع، والسيرفر ينزّل. الاسم لازم يبقى فيه اسم الـ registry والحساب.",
          example: R`docker build -t ghcr.io/user/myapi:1.2.0 .
docker login ghcr.io
docker push ghcr.io/user/myapi:1.2.0
docker pull ghcr.io/user/myapi:1.2.0`,
          try: "اعمل token من GitHub بصلاحية write:packages، واعمل login بيه، وارفع image تجربة.",
          deep: {
            why: "عشان السيرفر يشغّل image بتاعتك، لازم توصله. إما يبنيها هو، أو تبنيها انت وترفعها على registry وهو ينزّلها.",
            how: R`الـ registry سيرفر بيخزّن images. Docker Hub الأشهر، و GitHub Container Registry (ghcr.io) مجاني مع الـ repos بتاعتك، ومريح لأن نفس حساب GitHub.

الاسم لازم يبدأ باسم الـ registry والحساب: [[ghcr.io/user/myapi:1.2.0]]. من غير ده Docker هيحاول يرفع على Docker Hub.

[[login]] مرة واحدة. مع ghcr بتستخدم Personal Access Token فيه صلاحية write:packages، مش باسورد GitHub.

[[push]] بيرفع الطبقات اللي مش موجودة على الـ registry بس، فبعد أول مرة الرفع بيبقى سريع. وعلى السيرفر [[pull]] بنفس الاسم.

والأصح إن الـ build والـ push يحصلوا في GitHub Actions مع كل tag جديد، والسيرفر يعمل pull بس. كده السيرفر مش محتاج الكود ولا موارد الـ build.`,
            when: "لما يبقى عندك أكتر من سيرفر، أو الـ build تقيل على السيرفر، أو عايز rollback سريع لنسخة قديمة.",
            mistakes: "push بـ latest بس. لو النسخة الجديدة بايظة مش هتعرف ترجع للقديمة. دايمًا tag برقم نسخة أو hash الـ commit."
          },
          teach: R`## المشوار: جهازك ← registry ← السيرفر

~~~text
جهازك (أو CI)            registry                 السيرفر
docker build   ──push──▶  ghcr.io/user/myapi  ──pull──▶  docker run
~~~

الـ **registry** مخزن images على النت، زي GitHub بس للـ images. Docker Hub واحد، و GitHub Container Registry ([[ghcr.io]]) واحد تاني.

### إزاي جربناها

الرفع على ghcr.io محتاج حساب GitHub و token، فجربنا نفس الأوامر بالظبط على **registry محلي** بنشغّله كـ container (الـ image الرسمية [[registry:2]])، والفرق الوحيد إن اسم الـ registry بقى [[localhost:5001]] بدل [[ghcr.io]]:

~~~bash
docker run -d --name registry -p 127.0.0.1:5001:5000 registry:2
~~~

وده كمان طريقة كويسة تجرّب بيها push و pull من غير ما ترفع حاجة على النت. وخطوة [[docker login ghcr.io]] ونواتجها من توثيق GitHub.

---

## ١. [[docker build -t ghcr.io/user/myapi:1.2.0 .]]

نفس [[build]] اللي تعرفه، بس الاسم كامل:

| الحتة | معناها |
|---|---|
| [[ghcr.io]] | أنهي registry. Docker بيعرف إنه عنوان registry لأن فيه نقطة (أو [[:بورت]] زي [[localhost:5001]]) |
| [[user]] | حسابك على GitHub، **بحروف صغيرة** |
| [[myapi]] | اسم الـ image |
| [[1.2.0]] | رقم النسخة |

لو مكتبتش registry في الاسم، [[push]] هيروح Docker Hub. فالاسم نفسه هو اللي بيحدد رايح فين.

وعندك image متبنية خلاص؟ مش لازم تبني تاني، ادّيها الاسم ده بـ [[docker tag]]:

~~~bash
docker tag myapi localhost:5001/user/myapi:1.2.0
~~~

---

## ٢. [[docker login ghcr.io]]

بيسألك:

| السؤال | تكتب |
|---|---|
| [[Username:]] | اسمك على GitHub |
| [[Password:]] | **Personal Access Token** فيه صلاحية [[write:packages]]، مش باسورد حسابك |

وبيطبع [[Login Succeeded]]، وبيحفظ الدخول (على ويندوز والماك في مدير الأسرار بتاع النظام)، فمش هتعمله تاني. الـ registry المحلي بتاعنا مش طالب login.

---

## ٣. [[docker push ...]]: ارفع

~~~text الناتج: docker push localhost:5001/user/myapi:1.2.0 (أول مرة، مختصر)
The push refers to repository [localhost:5001/user/myapi]
f2447b6d1493: Waiting
...
d39db1cf9caa: Pushed
6bf50d0564e1: Pushed
f2447b6d1493: Pushed
...
1.2.0: digest: sha256:115462bd2e413a74e2ac60a70df58f4ffc38333a525138ccdf2ffd07cc161308 size: 856
~~~

| السطر | معناه |
|---|---|
| [[The push refers to repository]] | رايح فين |
| كل رقم + [[Pushed]] | طبقة اترفعت (نفس الطبقات اللي في [[docker history]]) |
| [[digest: sha256:...]] | بصمة الـ image على الـ registry. ثابتة للأبد، حتى لو حد نقل الـ tag لنسخة تانية |

ورفعناها تاني من غير أي تغيير:

~~~text الناتج (التاني)
d3f1729fbf5e: Layer already exists
f7f2d304681a: Layer already exists
6bf50d0564e1: Layer already exists
1.2.0: digest: sha256:115462bd2e41... size: 856
~~~

[[Layer already exists]]: [[push]] بيرفع بس الطبقات اللي مش موجودة هناك. فلو غيّرت سطر كود، اللي بيترفع هو طبقة [[COPY . .]] الصغيرة بس. وعلى ghcr ممكن تشوف [[Mounted from]]: الطبقة موجودة في image تانية عندك، فبتتربط من غير رفع.

---

## ٤. [[docker pull ...]]: على السيرفر

مسحنا النسخة اللي عندنا ([[docker rmi]]) ونزّلناها من الـ registry، زي ما السيرفر هيعمل:

~~~text الناتج
1.2.0: Pulling from user/myapi
Digest: sha256:115462bd2e413a74e2ac60a70df58f4ffc38333a525138ccdf2ffd07cc161308
Status: Downloaded newer image for localhost:5001/user/myapi:1.2.0
~~~

نفس الـ digest اللي طلع وقت الـ push: يعني نفس الـ image بالظبط byte بـ byte.

---

## لما يقع (من توثيق GitHub)

| الرسالة | السبب |
|---|---|
| [[denied: permission_denied: The token provided does not match expected scopes]] | الـ token ناقصه [[write:packages]] |
| [[repository name must be lowercase]] | حروف كابيتال في الاسم: [[ghcr.io/Ahmed/api]] |
| [[unauthorized]] | مش عامل login، أو الـ token انتهى |

---

## الخلاصة

| الخطوة | الأمر | فين |
|---|---|---|
| ١ | [[docker build -t REGISTRY/USER/NAME:VERSION .]] | جهازك أو CI |
| ٢ | [[docker login REGISTRY]] | مرة واحدة |
| ٣ | [[docker push REGISTRY/USER/NAME:VERSION]] | جهازك أو CI |
| ٤ | [[docker pull REGISTRY/USER/NAME:VERSION]] | السيرفر |

~~~text
الاسم بيحدد المكان: من غير registry = Docker Hub
tag برقم نسخة دايمًا، عشان ترجع لنسخة قديمة لو الجديدة باظت
digest = البصمة الثابتة، والـ tag مجرد اسم ممكن يتنقل
~~~`,
          lines: [
            "ابني باسم كامل: registry، وحساب، واسم، ونسخة.",
            "ادخل على GitHub registry (بـ token فيه write:packages).",
            "ارفع.",
            "على السيرفر: نزّل."
          ],
          sol: R`[[docker login ghcr.io]] بيسألك Username (اسمك على GitHub) و Password (الـ token مش باسورد حسابك)، ويطبع [[Login Succeeded]].

[[docker push ghcr.io/USER/myapi:1.2.0]] بيطبع سطر لكل طبقة بـ [[Pushed]] (أو [[Mounted from]] لو موجودة)، وفي الآخر [[1.2.0: digest: sha256:... size: ...]]. والـ package بيظهر في صفحة حسابك تحت Packages، Private افتراضيًا.

الأغلاط الشائعة: [[denied: permission_denied: The token provided does not match expected scopes]] يعني الـ token ناقصه [[write:packages]]. و [[denied: installation not allowed to Write organization package]] لو الـ USER اسم org مش حسابك. والاسم لازم يبقى lowercase: [[ghcr.io/Ahmed/api]] بيترفض بـ [[repository name must be lowercase]].`
        },
        {
          cmd: "buildx و --platform",
          title: "ماك M1 والسيرفر amd64",
          desc: "لو جهازك Mac بمعالج Apple (arm64) والسيرفر Intel/AMD (amd64)، الـ image اللي بتبنيها عندك مش هتشتغل على السيرفر (exec format error). [[--platform]] بيحدد المعمارية، و [[buildx]] يقدر يبني الاتنين في image واحدة.",
          example: R`docker buildx ls
docker buildx create --name multi --use
docker buildx build --platform linux/amd64,linux/arm64 -t ghcr.io/USER/myapi:1.2.0 --push .
docker buildx imagetools inspect ghcr.io/USER/myapi:1.2.0
docker build --platform linux/amd64 -t myapi:amd64 --load .`,
          try: "ابني image لـ amd64 على جهازك، وشوف المعمارية بـ [[docker image inspect --format '{{.Architecture}}' myapi:amd64]].",
          deep: {
            why: "أشهر مفاجأة للي على ماك: الـ image اشتغلت عندك وعلى السيرفر بتقع فورًا بـ exec format error.",
            how: R`[[docker build]] نفسه بقى buildx (BuildKit) افتراضيًا. [[--platform linux/amd64]] بيبني لمعمارية السيرفر حتى لو جهازك arm64، عن طريق محاكاة (أبطأ).

لأكتر من معمارية مع بعض محتاج builder بيدعمها ([[buildx create]])، والناتج «manifest list» فيه نسخة لكل معمارية، والسيرفر بينزّل اللي تناسبه لوحده. الـ image المتعددة مش بتتحط في docker images عندك، فبتترفع مباشرة بـ [[--push]]. و [[--load]] لمعمارية واحدة تحطها عندك. و [[imagetools inspect]] بيوريك المعماريات اللي جوه.`,
            when: "بتبني على Mac أو Raspberry Pi وبتشغّل على VPS عادي، أو العكس. وفي GitHub Actions مع setup-qemu و setup-buildx.",
            mistakes: "تبني على الماك من غير --platform وترفع. والمحاكاة بطيئة جدًا مع npm ci الكبير، فالأحسن تبني في CI على amd64."
          },
          teach: R`## المشكلة: المعالج نوعين

| الاسم في Docker | المعالج | فين |
|---|---|---|
| [[linux/amd64]] | Intel و AMD (64-bit)، ويتسمّى x86_64 | أغلب الـ VPS، وأغلب أجهزة ويندوز |
| [[linux/arm64]] | ARM (64-bit)، ويتسمّى aarch64 | ماك M1 وما بعده، و Raspberry Pi، وسيرفرات Graviton |

البرنامج المبني لنوع مبيشتغلش على التاني، ولو حاولت هتشوف [[exec format error]]. [[--platform]] بيقول لـ Docker «ابني للنوع ده»، و [[buildx]] (أداة البناء الحديثة جوه Docker، اسمها BuildKit) تقدر تبني الاتنين في image واحدة.

جربنا كل السطور على Docker Desktop 29 على ويندوز (معالج amd64)، والرفع كان على registry محلي ([[localhost:5001]]، زي درس «build / tag / push») بدل ghcr. الـ Dockerfile تجربة صغيرة بتسجل نوع المعالج:

~~~text Dockerfile
FROM alpine:3.20
RUN uname -m > /arch.txt
CMD ["cat", "/arch.txt"]
~~~

[[uname -m]] بيطبع نوع المعالج (machine).

---

## ١. [[docker buildx ls]]: مين بيبني؟

~~~text الناتج
NAME/NODE           DRIVER/ENDPOINT     STATUS    BUILDKIT   PLATFORMS
default             docker
 \_ default          \_ default         running   v0.31.1    linux/amd64 (+3), linux/arm64, linux/arm (+2), linux/ppc64le, (2 more)
desktop-linux*      docker
 \_ desktop-linux    \_ desktop-linux   running   v0.31.1    linux/amd64 (+3), linux/arm64, linux/arm (+2), linux/ppc64le, (2 more)
~~~

| العمود | معناه |
|---|---|
| [[NAME/NODE]] | اسم الـ builder. النجمة [[*]] = المستخدم دلوقتي |
| [[DRIVER]] | [[docker]] يعني بيبني جوه Docker نفسه |
| [[PLATFORMS]] | الأنواع اللي يقدر يبنيها. [[arm64]] موجودة على جهاز amd64 لأن Docker Desktop فيه **محاكاة** (QEMU) |

---

## ٢. [[docker buildx create --name multi --use]]

بيعمل builder جديد (driver اسمه [[docker-container]]: BuildKit شغال جوه container لوحده)، و [[--use]] بيخليه الافتراضي لكل builds الجهاز بعد كده. جربناه **من غير** [[--use]] عشان منغيّرش إعداد الجهاز، ومسحناه بعدها:

~~~text الناتج
$ docker buildx create --name multi
multi
$ docker buildx ls
multi               docker-container
 \_ multi0           \_ desktop-linux   inactive
$ docker buildx rm multi
multi removed
~~~

[[inactive]] لأنه مش بيقوم غير مع أول build. ومحتاجه إمتى؟ لما الـ builder الافتراضي مش بيدعم أكتر من platform في build واحد (Docker Engine على لينكس بإعداداته القديمة). على Docker Desktop الجديد (اللي بيستخدم containerd image store) الـ builder الافتراضي عملها لوحده، وده اللي استخدمناه تحت.

---

## ٣. ابني النوعين وارفع

~~~bash
docker buildx build --platform linux/amd64,linux/arm64 -t localhost:5001/user/plat:1.0 --push .
~~~

| الجزء | معناه |
|---|---|
| [[--platform linux/amd64,linux/arm64]] | ابني مرتين، مرة لكل نوع، مفصولين بفاصلة من غير مسافة |
| [[-t ...]] | الاسم |
| [[--push]] | ارفع على طول بعد البناء |

~~~text الناتج (مختصر)
#5 [linux/amd64 1/2] FROM docker.io/library/alpine:3.20@sha256:d9e853e8...
#6 [linux/arm64 1/2] FROM docker.io/library/alpine:3.20@sha256:d9e853e8...
#7 [linux/arm64 2/2] RUN uname -m > /arch.txt
#8 [linux/amd64 2/2] RUN uname -m > /arch.txt
#9 pushing manifest for localhost:5001/user/plat:1.0@sha256:ab7cc9eca67c...
~~~

كل خطوة بقت مرتين، كل واحدة عليها اسم النوع. خطوة [[arm64]] اتنفذت بالمحاكاة، وفي مشروع فيه [[npm ci]] كبير المحاكاة دي بطيئة جدًا.

---

## ٤. [[docker buildx imagetools inspect ...]]: إيه اللي اترفع؟

~~~text الناتج (مختصر)
Name:      localhost:5001/user/plat:1.0
MediaType: application/vnd.oci.image.index.v1+json
Digest:    sha256:ab7cc9eca67cc4867ef902f381b2fe6b170277bf81710073a58ef928ffd52fc4

Manifests:
  Name:        localhost:5001/user/plat:1.0@sha256:27c8ba7b...
  Platform:    linux/amd64

  Name:        localhost:5001/user/plat:1.0@sha256:38275508...
  Platform:    linux/arm64

  Name:        localhost:5001/user/plat:1.0@sha256:7d9e4d55...
  Platform:    unknown/unknown
  Annotations:
    vnd.docker.reference.type:   attestation-manifest
~~~

| الحتة | معناها |
|---|---|
| [[image.index]] | الاسم ده مش image واحدة، ده **فهرس** (manifest list) بيشاور على كذا image |
| [[Platform: linux/amd64]] و [[linux/arm64]] | النسختين اللي بنيناهم، كل واحدة ليها digest |
| [[unknown/unknown]] + [[attestation-manifest]] | مش image تتشغل: بيانات عن طريقة البناء (provenance) بيضيفها BuildKit لوحده |

ولما سيرفر يعمل [[pull]] للاسم ده، Docker بيختار النسخة اللي تناسب معالجه لوحده. جربنا نجبر كل نوع:

~~~text الناتج
$ docker run --rm --platform linux/arm64 localhost:5001/user/plat:1.0
aarch64
$ docker run --rm --platform linux/amd64 localhost:5001/user/plat:1.0
x86_64
~~~

---

## ٥. [[docker build --platform linux/amd64 -t myapi:amd64 --load .]]

نوع واحد بس، و [[--load]] يعني «حطها في [[docker images]] عندي» بدل ما ترفعها. ده اللي يهمك لو على ماك وعايز تجرّب نسخة السيرفر:

~~~text الناتج
$ docker image inspect --format '{{.Architecture}}' myapi:amd64
amd64
$ docker image inspect --format '{{.Architecture}}' myapi:arm64
arm64
~~~

(التانية بنيناها بـ [[--platform linux/arm64]] على نفس الجهاز amd64.)

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[docker buildx ls]] | الـ builders والأنواع اللي يقدروا يبنوها |
| [[docker buildx create --name X --use]] | builder جديد، و [[--use]] تخليه الافتراضي |
| [[--platform a,b ... --push]] | نوعين في اسم واحد، ولازم يترفعوا |
| [[--platform a ... --load]] | نوع واحد في [[docker images]] |
| [[docker buildx imagetools inspect]] | الأنواع اللي جوه اسم على registry |

~~~text
amd64 = x86_64   (أغلب السيرفرات)
arm64 = aarch64  (ماك M، Raspberry Pi)
exec format error = النوع غلط
~~~`,
          lines: [
            "الـ builders الموجودة والمعماريات اللي بيدعموها.",
            "اعمل builder جديد يدعم أكتر من معمارية واستخدمه.",
            "ابني لـ amd64 و arm64 في image واحدة وارفعها.",
            "اتأكد المعماريات اللي اترفعت.",
            "معمارية السيرفر بس، والناتج عندك في docker images."
          ],
          sol: R`[[docker image inspect --format '{{.Architecture}}' myapi:amd64]] بيطبع [[amd64]]. وده اللي السيرفر محتاجه حتى لو انت على ماك M1 (اللي هيطلع عليه [[arm64]] من غير [[--platform]]).

على ماك الـ build لـ amd64 هياخد وقت أطول بكتير، لأنه بيشغّل كل خطوة RUN من خلال emulation (QEMU/Rosetta). و [[docker buildx ls]] بيوري الـ builders والـ platforms اللي كل واحد يقدر يبنيها.

الغلط الشائع: على جهاز مفيهوش emulation متسطّب، البناء لمعمارية تانية بيقع في أول RUN بـ [[exec /bin/sh: exec format error]]. ونفس الرسالة بتظهر على السيرفر لو شغّلت image arm64 على سيرفر amd64، وده أشهر سبب للـ container اللي بيموت أول ما يقوم.`
        },
        {
          cmd: "CMD و ENTRYPOINT",
          title: "إيه اللي بيتشغّل",
          desc: "[[CMD]] الأمر الافتراضي، وتقدر تستبدله من [[docker run]]. [[ENTRYPOINT]] ثابت، واللي تكتبه في run بيتضاف عليه. الشكل بالأقواس المربعة (exec form) هو الصح: التطبيق بيبقى العملية رقم 1 وبيستلم إشارة الإغلاق.",
          example: R`docker run --rm myapi
docker run --rm myapi node -v
docker run --rm --entrypoint sh myapi -c "ls /app"`,
          try: "شغّل image بتاعتك بأمر مختلف عن CMD ولاحظ إنه اتنفذ بدل التطبيق.",
          deep: {
            why: "لازم تفهم إيه اللي بيتشغّل لما الـ container يقوم، وإزاي تغيّره من غير ما تعدّل الـ image، وليه شكل الكتابة بيفرق في الإغلاق.",
            how: R`[[CMD]] الأمر الافتراضي. أي حاجة تكتبها في [[docker run image ...]] بعد اسم الـ image بتحل مكانه تمامًا. عشان كده [[docker run myapi node -v]] بيطبع النسخة بدل ما يشغّل السيرفر.

[[ENTRYPOINT]] ثابت ومبيتغيرش من run. اللي تكتبه في run بيتضاف كـ arguments ليه. مفيد لو الـ image أداة (زي image بتشغّل psql): ENTRYPOINT هو الأداة، وانت بتديه arguments. و [[--entrypoint]] بيغيّره لو محتاج تدخل sh وتشخّص.

الشكلين: exec form [[["node", "server.js"]]] بيشغّل node مباشرة كعملية 1. shell form [[node server.js]] بيشغّل [[/bin/sh -c "node server.js"]]، فـ sh هو العملية 1 و node ابنه. لما [[docker stop]] يبعت SIGTERM للعملية 1، sh مش بيوصّلها لـ node، فالتطبيق ميعرفش إنه بيتقفل، ويتقتل بعد ١٠ ثواني في نص أي حاجة.`,
            when: "CMD لتطبيقك. ENTRYPOINT للأدوات. وعشان تشخّص image: [[--entrypoint sh]].",
            mistakes: "shell form في CMD. و [[CMD npm start]]: npm نفسه بيبقى وسيط بيبلع الإشارة. شغّل node مباشرة."
          },
          teach: R`## الأمر اللي بيشتغل = ENTRYPOINT + CMD

لما container يقوم، Docker بيركّب الأمر من حتتين في الـ image:

~~~text
ENTRYPOINT          +   CMD                   =  اللي بيتنفّذ
(ثابت)                  (افتراضي، يتغير)
~~~

نشوف القيم دي في [[myapi]] (الـ image من درس «Dockerfile»):

~~~bash
docker inspect --format 'Entrypoint={{json .Config.Entrypoint}} Cmd={{json .Config.Cmd}}' myapi
~~~

~~~text الناتج
Entrypoint=["docker-entrypoint.sh"] Cmd=["node","server.js"]
~~~

احنا مكتبناش ENTRYPOINT، بس صورة [[node]] الرسمية فيها واحد جاهز ([[docker-entrypoint.sh]])، والـ image بتاعتنا ورثته. كل اللي تحت اتجرب على Docker Desktop 29.

---

## ١. [[docker run --rm myapi]]: الافتراضي

مفيش حاجة بعد اسم الـ image، فبيتنفّذ [[docker-entrypoint.sh node server.js]]:

~~~text الناتج
listening on 3000
~~~

السيرفر قام وماسك الترمنال.

---

## ٢. [[docker run --rm myapi node -v]]: غيّر CMD

اللي بعد اسم الـ image **بيحل مكان CMD بالكامل**. ENTRYPOINT زي ما هو:

~~~text
docker-entrypoint.sh  +  node -v   (بدل node server.js)
~~~

~~~text الناتج
v22.23.3
~~~

طبع النسخة وخرج، والسيرفر مااشتغلش خالص.

### السكربت ده بيعمل إيه؟

~~~bash
docker run --rm --entrypoint cat myapi /usr/local/bin/docker-entrypoint.sh
~~~

~~~text الناتج
#!/bin/sh
set -e

# Run command with node if the first argument contains a "-" or is not a system command. The last
# part inside the "{}" is a workaround for the following bug in ash/dash:
# https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=874264
if [ "$__{1#-}" != "$__{1}" ] || [ -z "$(command -v "$__{1}")" ] || { [ -f "$__{1}" ] && ! [ -x "$__{1}" ]; }; then
  set -- node "$@"
fi

exec "$@"
~~~

بيقول: لو أول كلمة بتبدأ بـ [[-]] أو مش أمر معروف، حط [[node]] قدامها. وفي الآخر [[exec "$@"]] = شغّل الكلام اللي جالك (ده موضوع الدرس الجاي). عشان كده [[docker run --rm myapi -v]] لوحدها طلّعت [[v22.23.3]] برضه: السكربت حوّلها لـ [[node -v]].

---

## ٣. [[docker run --rm --entrypoint sh myapi -c "ls /app"]]: غيّر ENTRYPOINT

[[--entrypoint sh]] بيبدّل الحتة الثابتة نفسها، واللي بعد اسم الـ image بقى arguments ليها:

~~~text
sh  +  -c "ls /app"
~~~

~~~text الناتج
Dockerfile
package-lock.json
package.json
server.js
~~~

ليه [[--entrypoint]] **قبل** اسم الـ image و [[-c "ls /app"]] **بعده**؟ نفس قاعدة [[docker run]]: اللي قبل الاسم إعدادات Docker، واللي بعده الأمر. ده أنفع سطر لما image بتقع أول ما تقوم وعايز تدخلها تبص.

---

## الفخ: ENTRYPOINT بتاعك

لو Dockerfile فيه [[ENTRYPOINT ["node"]]] و [[CMD ["server.js"]]]، جربنا:

~~~text الناتج: docker run --rm IMAGE node -v
Error: Cannot find module '/app/node'
~~~

لأن الأمر بقى [[node node -v]]: node حاول يشغّل ملف اسمه [[node]]. الصح:

~~~text الناتج: docker run --rm IMAGE -v
v22.23.3
~~~

---

## exec form ولا shell form؟

| الشكل | مثال | بيتنفّذ إزاي |
|---|---|---|
| exec form | [[CMD ["node", "server.js"]]] | node مباشرة = PID 1 |
| shell form | [[CMD node server.js]] | Docker بيلفّه: [[["/bin/sh","-c","node server.js"]]] |

الفرق بيبان في [[docker stop]]: بيبعت SIGTERM للـ PID 1 بس. جربنا shell form ([[CMD echo start && node server.js]]) على نوعين images، و server.js فيه handler بيقفل لما يستلم SIGTERM:

| الـ image | PID 1 | وقت [[docker stop]] | exit code |
|---|---|---|---|
| [[node:22-slim]] (Debian، شيل dash) | [[/bin/sh -c echo start && node server.js]] | 10.4 ثانية | 137 |
| [[node:22-alpine]] (شيل busybox) | [[node server.js]] | 0.4 ثانية | 0 |

على Debian، sh فضل PID 1 واستلم الإشارة ومابعتهاش لـ node، فاتقتل بعد ١٠ ثواني. شيل busybox في alpine بيعمل [[exec]] لآخر أمر لوحده فـ node بقى PID 1. يعني shell form ممكن «تمشي» بالصدفة، بس متعتمدش على ده: exec form بتشتغل صح في أي image.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تشغّل الافتراضي | [[docker run IMAGE]] |
| أمر بدل CMD | [[docker run IMAGE أمر args]] |
| تبدّل ENTRYPOINT | [[docker run --entrypoint برنامج IMAGE args]] |
| تشوف الاتنين | [[docker inspect --format '{{json .Config.Entrypoint}} {{json .Config.Cmd}}' IMAGE]] |

~~~text
CMD          الافتراضي، أي حاجة بعد اسم الـ image بتحل مكانه
ENTRYPOINT   ثابت، اللي بعد اسم الـ image بيتضاف عليه
exec form    ["node", "server.js"]: البرنامج نفسه PID 1
~~~`,
          lines: ["الأمر الافتراضي (CMD).", "استبدل CMD بأمر تاني.", "استبدل ENTRYPOINT نفسه بـ sh ونفّذ أمر."],
          sol: R`[[docker run --rm myapi node -v]] بيطبع [[v22.x.x]] ويخرج، والسيرفر مااشتغلش خالص. أي حاجة بعد اسم الـ image بتحل محل [[CMD]] بالكامل.

و [[docker run --rm --entrypoint sh myapi -c "ls /app"]] بيطبع محتوى [[/app]]: [[package.json]] و [[server.js]]... وده لأن [[--entrypoint]] غيّر البرنامج و [[-c "ls /app"]] بقت الـ arguments.

الغلط الشائع: لو الـ Dockerfile فيه [[ENTRYPOINT ["node"]]]، فـ [[docker run myapi node -v]] هيشغّل [[node node -v]] ويطلع [[Cannot find module '/app/node']]. مع ENTRYPOINT اللي بعد اسم الـ image بيتضاف كـ arguments، فالصح [[docker run myapi -v]].`
        },
        {
          cmd: "entrypoint.sh و exec",
          title: "خطوة قبل التطبيق من غير ما تبوّظ الإغلاق",
          desc: R`لو محتاج تعمل حاجة قبل ما السيرفر يقوم (migration، أو تجهيز ملف)، اعمل سكربت صغير يعملها، وآخر سطر فيه [[exec node server.js]]. الـ [[exec]] بتخلي node ياخد مكان الشيل نفسه، فيبقى هو العملية رقم 1 ويستلم SIGTERM، و [[docker stop]] يقفله نضيف بدل ما يستنى ١٠ ثواني ويقتله.`,
          example: R`#!/bin/sh
set -e
node /app/scripts/migrate.mjs
exec node server.js`,
          try: "اعمل السكربت ده بسطر [[node server.js]] من غير exec، وقيس [[time docker stop api]]: هياخد ١٠ ثواني. ضيف exec وقيس تاني.",
          flag: "script",
          deep: {
            why: "الـ CMD بالأقواس المربعة بيحل مشكلة الإشارات، بس أول ما تحتاج خطوتين (migrate وبعدين start) بتكتب سكربت، والسكربت بيرجّع المشكلة: الشيل بقى هو العملية 1.",
            how: R`من غير exec: sh هو العملية رقم 1، و node ابنه. [[docker stop]] بيبعت SIGTERM للعملية 1 بس، والشيل مش بيوصّلها لـ node. بعد ١٠ ثواني Docker بيبعت SIGKILL، فالطلبات اللي شغالة بتتقطع واتصالات القاعدة مبتتقفلش نضيف.

[[exec]] بتستبدل عملية الشيل بـ node في نفس المكان وبنفس رقم العملية. مفيش شيل تاني، و node هو اللي بيستلم الإشارة.

[[set -e]] مهم هنا: لو الـ migration فشل، السكربت يقف والـ container يخرج بـ error، بدل ما التطبيق يقوم على schema قديمة.

وفي الـ Dockerfile: [[COPY --chmod=755 docker-entrypoint.sh /usr/local/bin/]] وبعدين [[ENTRYPOINT ["docker-entrypoint.sh"] ]]. ولو عايز السكربت يشغّل أي CMD، آخر سطر يبقى [[exec "$@"]].

وبديل لو مش عايز تفكّر في ده: [[init: true]] في compose (أو [[--init]] في run) بيحط عملية صغيرة (tini) كـ PID 1 بتوصّل الإشارات وتلم العمليات الميتة.`,
            when: "أي خطوة لازم تحصل قبل التطبيق وجوه الـ container: migrate، أو توليد config من متغيرات، أو انتظار خدمة.",
            mistakes: R`في مشروع حقيقي الـ migration كان بيتشغّل أوتوماتيك مع كل تشغيل container على الإنتاج، وبتوكن إدارة كامل، وبعده [[|| echo "skipped"]] بيبلع أي فشل، فالتطبيق يقوم عادي على schema ناقصة. وكان فيه ملفين entrypoint مختلفين، واحد بيشاور على .js والتاني على .mjs.

وغلطتين كلاسيك: السكربت من غير صلاحية تنفيذ فيطلع permission denied، أو اتكتب على ويندوز بنهايات سطور CRLF فيطلع «no such file or directory» مع إن الملف موجود (الـ \r لازقة في سطر الـ shebang).`
          },
          teach: R`## السكربت ده بيعمل خطوة، وبعدين «يسلّم» مكانه للتطبيق

أحيانًا لازم حاجة تحصل قبل السيرفر كل مرة الـ container يقوم (migration مثلًا). فبتعمل سكربت شيل صغير هو اللي يشتغل الأول. المشكلة إن السكربت نفسه بيبقى PID 1، و [[exec]] في آخر سطر هي اللي بتحلها.

جربنا كل ده على Docker Desktop 29 بالأوامر اللي في الـ solCode (مع [[echo migrate]] بدل سكربت migration حقيقي).

---

## السطر بسطر

### [[#!/bin/sh]]

اسمه **shebang**: أول سطر في أي سكربت، بيقول للنظام «شغّل الملف ده بـ [[/bin/sh]]». [[#!]] لازم يبقوا أول حرفين في الملف.

### [[set -e]]

[[-e]] (exit on error): لو أي أمر فشل (خرج بكود غير 0)، السكربت يقف فورًا. من غيرها لو الـ migration فشل، السكربت يكمّل والتطبيق يقوم على قاعدة بيانات ناقصة.

### [[node /app/scripts/migrate.mjs]]

الخطوة القبلية. أمر عادي: الشيل بيشغّله، يستنى يخلص، ويكمّل.

### [[exec node server.js]]

[[exec]] أمر في الشيل معناه: «**بدّل** نفسك بالبرنامج ده». مش «شغّله كابن ليك»، لأ: عملية الشيل نفسها بتتحول لـ node، بنفس الرقم (PID). فلو الشيل كان PID 1، node بقى PID 1.

---

## نشوفها: من غير exec ومع exec

السكربت اتحط في image كـ ENTRYPOINT:

~~~text Dockerfile.ep
FROM myapi
COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
~~~

وبصينا على العمليات جوه بـ [[docker exec api ps -o pid,args]] ([[-o pid,args]] اعرض عمودين بس: الرقم والأمر):

### من غير exec (آخر سطر [[node server.js]])

~~~text الناتج
PID   COMMAND
    1 {entrypoint.sh} /bin/sh /entrypoint.sh
    7 node server.js
~~~

sh هو 1، و node ابنه رقم 7. و [[docker stop]] بيبعت SIGTERM لـ 1 بس:

~~~text الناتج
$ time docker stop api
real	0m10.543s
$ docker inspect --format '{{.State.ExitCode}}' api
137
~~~

[[time]] قدام أي أمر بيطبع أخد قد إيه. sh استلم الإشارة ومعملش بيها حاجة، Docker استنى ١٠ ثواني وقتل الكل (137 = اتقتل بـ SIGKILL).

### مع exec (آخر سطر [[exec node server.js]])

~~~text الناتج
PID   COMMAND
    1 node server.js
~~~

node بقى 1، ومفيش sh خالص. بس:

~~~text الناتج
real	0m10.548s
137
~~~

**لسه ١٠ ثواني!** لأن [[server.js]] في التجربة ملوش handler لـ SIGTERM، ولينكس بيتجاهل أي إشارة ملهاش handler لما تتبعت لـ PID 1. يعني exec وصّلت الإشارة لـ node صح، بس node معملش بيها حاجة.

### مع exec + handler

ضفنا السطر ده لـ [[server.js]]:

~~~text server.js
process.on("SIGTERM", () => { console.log("got SIGTERM, closing"); process.exit(0); });
~~~

[[process.on("SIGTERM", ...)]] = «لما توصلك الإشارة دي، نفّذ الدالة». وفي الحقيقي هنا بتقفل السيرفر واتصال القاعدة قبل [[process.exit(0)]].

~~~text الناتج
real	0m0.484s
0
$ docker logs api
migrate
listening on 3000
got SIGTERM, closing
~~~

نص ثانية، وخرج بـ 0، وطبع رسالته.

| السكربت | PID 1 | handler | وقت stop | exit |
|---|---|---|---|---|
| [[node server.js]] | sh | موجود أو لأ | ١٠.٥ ثانية | 137 |
| [[exec node server.js]] | node | مفيش | ١٠.٥ ثانية | 137 |
| [[exec node server.js]] | node | موجود | ٠.٥ ثانية | 0 |

يعني محتاج الاتنين: [[exec]] عشان الإشارة توصل لـ node، و handler عشان node يتصرف. وبديل الاتنين: [[docker run --init]] (أو [[init: true]] في compose)، وده جربناه في درس «Dockerfile» ووقف في ٠.٥٣ ثانية.

---

## غلطتين هتقابلهم (جربناهم)

~~~text الناتج: السكربت مكتوب على ويندوز بنهايات سطور CRLF
exec /entrypoint.sh: no such file or directory
~~~

الملف موجود! بس ويندوز بيختم كل سطر بـ [[\r\n]] بدل [[\n]]، فالـ shebang بقى [[/bin/sh\r]]، ومفيش برنامج بالاسم ده. الحل: احفظه LF (في VS Code تحت على اليمين اضغط CRLF وغيّرها LF)، أو اكتب [[*.sh text eol=lf]] في [[.gitattributes]].

~~~text الناتج: الملف من غير صلاحية تنفيذ
exec: "/entrypoint.sh": permission denied
~~~

الحل: [[chmod +x entrypoint.sh]] قبل الـ build، أو [[COPY --chmod=755]] في الـ Dockerfile.

---

## الخلاصة

~~~text
#!/bin/sh                 شغّل بالشيل
set -e                    أي فشل يوقف كل حاجة
خطوات قبلية               migrate وغيره
exec node server.js       node ياخد مكان الشيل ويبقى PID 1
process.on("SIGTERM")     عشان node يقفل لما الإشارة توصله
~~~`,
          lines: [
            "وقّف السكربت عند أول أمر يفشل.",
            "الخطوة القبلية: مزامنة الـ schema.",
            "node ياخد مكان الشيل ويبقى العملية رقم 1."
          ],
          sol: R`من غير [[exec]]: [[docker stop]] بياخد حوالي [[10]] ثواني بالظبط، و [[docker inspect --format '{{.State.ExitCode}}' api]] بيطبع [[137]] (اتقتل بـ SIGKILL). ده لأن [[sh]] هو PID 1 واستلم SIGTERM ومابعتهاش لـ node، فـ Docker استنى المهلة وقتله.

مع [[exec node server.js]]: node بقى PID 1 مكان sh، بس لو [[server.js]] مفيهوش handler لـ SIGTERM الـ stop لسه بياخد ١٠ ثواني والـ exit code [[137]]، لأن لينكس بيتجاهل أي إشارة ملهاش handler لما تتبعت لـ PID 1. بعد ما تضيف [[process.on("SIGTERM", () => process.exit(0))]] وتبني تاني، الـ stop بياخد نص ثانية (عندي 0.48) والـ exit code [[0]]. يعني محتاج الاتنين: [[exec]] عشان الإشارة توصل لـ node، و handler عشان node يقفل.

الغلط الشائع: السكربت يفشل بـ [[exec /entrypoint.sh: permission denied]] (نسيت [[chmod +x]]) أو [[no such file or directory]] مع إن الملف موجود: دي نهايات سطور CRLF من ويندوز، فالسطر الأول بقى [[#!/bin/sh\r]].`,
          solCode: R`printf '#!/bin/sh\nset -e\necho migrate\nnode server.js\n' > entrypoint.sh
chmod +x entrypoint.sh
printf 'FROM myapi\nCOPY entrypoint.sh /entrypoint.sh\nENTRYPOINT ["/entrypoint.sh"]\n' > Dockerfile.ep
docker build -f Dockerfile.ep -t myapi:ep .
docker run -d --name api myapi:ep
time docker stop api
docker inspect --format '{{.State.ExitCode}}' api
docker rm api
sed -i 's/^node server.js/exec node server.js/' entrypoint.sh
echo 'process.on("SIGTERM", () => process.exit(0));' >> server.js
docker build -t myapi .
docker build -f Dockerfile.ep -t myapi:ep .
docker run -d --name api myapi:ep
time docker stop api
docker inspect --format '{{.State.ExitCode}}' api
docker rm api`
        },
        {
          cmd: "alpine ولا slim",
          title: "مكتبات native بتفشل في الـ build",
          desc: R`Alpine صغيرة جدًا، بس بتستخدم musl بدل glibc ومفيهاش أدوات compile. مكتبات زي bcrypt محتاجة تتبني، فإما تسطّب أدوات البناء بـ [[apk add python3 make g++]]، أو تستخدم [[node:22-bookworm-slim]] اللي فيها glibc، والـ binaries الجاهزة (زي SWC بتاع Next و sharp) بتشتغل عليها على طول.

القاعدة: ابدأ بـ alpine، ولو لقيت نفسك بتحارب مكتبات native روح لـ slim. وأدوات البناء تفضل في مرحلة الـ build بس.`,
          example: R`FROM node:22-alpine AS deps
RUN apk add --no-cache python3 make g++
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:22-alpine
RUN apk add --no-cache vips
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
USER node
CMD ["node", "server.js"]`,
          try: "في مشروع فيه bcrypt، ابني على alpine من غير سطر apk add واقرا الـ error، وبعدين ضيفه، وبعدين جرّب bookworm-slim من غيره وقارن الحجم في [[docker images]].",
          flag: "script",
          deep: {
            why: R`أشهر error أول ما تنقل مشروع لـ alpine: [[gyp ERR! find Python]] أو [[Error loading shared library]]. المكتبة مش لاقية binary جاهز لـ musl، فبتحاول تتبني من الكود ومش لاقية أدوات.`,
            how: R`مكتبات native (فيها C أو C++) بتنزل binary جاهز لو فيه واحد مناسب لنظامك. أغلب الـ binaries الجاهزة معمولة لـ glibc (Debian و Ubuntu). على alpine ممكن متلاقيش، فـ node-gyp يحاول يبني، ومحتاج [[python3 make g++]].

[[--no-cache]] في apk معناها متحفظش فهرس الباكدجات جوه الـ image، فالطبقة تفضل صغيرة.

الـ multi-stage هنا بيحل مشكلة الحجم: أدوات البناء (مئات الميجا) في مرحلة deps بس، والمرحلة النهائية بتاخد node_modules المبنية جاهزة. لو مكتبة محتاجة حاجة من النظام وقت التشغيل (زي vips لـ sharp لو متبنية عليه)، سطّب نسخة التشغيل بس، من غير [[-dev]].

[[bookworm-slim]] أكبر بحوالي ٥٠ لـ ٨٠ ميجا، بس بتوفّر عليك كل ده. ولازم المرحلتين من نفس العيلة: node_modules المبنية على alpine مش هتشتغل على slim والعكس.`,
            when: "bcrypt و sharp و canvas و sqlite3 وأي مكتبة فيها كود native. و Next.js لو شفت مشاكل SWC على alpine.",
            mistakes: R`في مشروع حقيقي [[vips-dev]] (بأدوات التطوير والـ headers) كانت متسطّبة في مرحلة التشغيل، فكبّرت الـ image من غير لازمة. ومرحلة build على alpine ومرحلة تشغيل على slim، فالمكتبات تقع بـ error غريب وقت التشغيل. ونسخ node_modules من جهاز ويندوز بدل npm ci جوه الـ container.`
          },
          teach: R`## الموضوع: مكتبات فيها كود C

أغلب باكدجات npm مكتوبة JavaScript وبتشتغل في أي حتة. بس فيه باكدجات **native** (فيها كود C أو C++) زي [[bcrypt]] و [[sharp]] و [[sqlite3]]. دي محتاجة ملف مبني (binary) لنظامك بالظبط. npm بيدوّر الأول على binary جاهز (اسمه **prebuilt**)، ولو مالقاش بيحاول يبنيه من الكود، وده محتاج أدوات: [[python3]] و [[make]] و [[g++]].

و Alpine بتستخدم مكتبة C اسمها **musl**، وأغلب لينكس (Debian و Ubuntu) بيستخدم **glibc**. binary مبني لواحدة مبيشتغلش على التانية، وكتير من الباكدجات معندهاش prebuilt لـ musl.

جربنا بمشروع فيه [[bcrypt@5.1.1]] بس، و [[server.js]] بيعمل hash ويطبع أوله، على Docker Desktop 29.

---

## الأول: المشكلة

Dockerfile عادي على alpine، وأجبرنا npm يبني من الكود بـ [[--build-from-source]] (زي ما بيحصل لما مفيش prebuilt):

~~~text الناتج
npm error gyp ERR! find Python
npm error gyp ERR! find Python Python is not set from command line or npm configuration
npm error gyp ERR! find Python Python is not set from environment variable PYTHON
npm error gyp ERR! find Python checking if "python3" can be used
npm error gyp ERR! find Python - executable path is ""
~~~

[[gyp]] (node-gyp) هي الأداة اللي بتبني الكود الـ native، وأول حاجة دوّرت عليها Python ومالقيتهاش. (ومن غير [[--build-from-source]] الـ build نجح، لأن bcrypt 5.1.1 عندها prebuilt لـ musl. مكتبات تانية أو نسخ أقدم معندهاش.)

---

## الحل الأول: أدوات البناء في مرحلة لوحدها

### المرحلة [[deps]]

| السطر | ليه |
|---|---|
| [[FROM node:22-alpine AS deps]] | ورشة على alpine |
| [[RUN apk add --no-cache python3 make g++]] | [[apk]] مدير باكدجات Alpine (زي [[apt]] في Ubuntu). [[--no-cache]] متحفظش فهرس الباكدجات جوه الـ image |
| [[WORKDIR]] و [[COPY package*.json]] | زي العادة |
| [[RUN npm ci --omit=dev]] | يسطّب، ودلوقتي يقدر يبني bcrypt لو احتاج. في التجربة ضفنا [[--build-from-source]] هنا كمان عشان نتأكد إن البناء نفسه نجح بالأدوات |

### المرحلة النهائية

| السطر | ليه |
|---|---|
| [[FROM node:22-alpine]] | بداية نضيفة، من غير أدوات البناء |
| [[RUN apk add --no-cache vips]] | مكتبة **تشغيل** بس (لـ sharp لو بتستخدمه)، مش [[vips-dev]] اللي فيها ملفات التطوير |
| [[COPY --from=deps /app/node_modules ./node_modules]] | خد المكتبات **المبنية** جاهزة من الورشة |
| [[COPY . .]] و [[USER node]] و [[CMD]] | زي أي Dockerfile |

~~~text الناتج: docker run --rm nat:alpine
$2b$04$
~~~

[[$2b$04$]] أول الـ hash: bcrypt اشتغل.

---

## الحل التاني: [[bookworm-slim]]

[[node:22-bookworm-slim]] = Node 22 على Debian 12 (اسمها الكودي bookworm) نسخة مصغّرة. فيها glibc، فالـ prebuilt بينزل على طول من غير أي أدوات. Dockerfile عادي من مرحلة واحدة من غير [[apk add]] نجح وطبع [[$2b$04$]].

---

## نقارن الأحجام

بنينا كمان نسخة غلط: alpine وأدوات البناء في المرحلة الوحيدة:

~~~text الناتج: docker images
IMAGE         DISK USAGE   CONTENT SIZE
nat:bare2         249MB         62.7MB    alpine من غير أي حاجة (الـ prebuilt اشتغل)
nat:alpine        325MB         84.2MB    مثال الدرس (مرحلتين + vips)
nat:slim          338MB         81.8MB    bookworm-slim مرحلة واحدة
nat:fat           753MB          185MB    alpine + python3 make g++ في الـ image النهائية
~~~

(العمود الأخير تعليقنا مش جزء من الناتج.)

- **fat** أكبر من الضعف: أدوات البناء لوحدها مئات الميجا، وعشان كده مكانها مرحلة deps بس.
- **alpine** في مثال الدرس أكبر من bare2 بـ ٧٦ ميجا. [[docker history]] قال إن طبقة [[apk add --no-cache vips]] لوحدها [[59.1MB]]. يعني متسطّبش vips غير لو بتستخدم sharp فعلًا.
- **slim** قريبة من alpine بـ vips، ومن غير أي وجع دماغ.

---

## الخلاصة

~~~text
musl (alpine)    أصغر، بس binaries كتير مش جاهزة لها
glibc (slim)     أكبر شوية، والـ prebuilt شغال على طول
python3 make g++ في مرحلة البناء بس، أبدًا في النهائية
vips مش vips-dev  نسخة التشغيل بس
~~~

والمرحلتين لازم من نفس العيلة: node_modules المبنية على alpine متتنسخش لـ slim والعكس.`,
          lines: [
            "مرحلة deps على alpine.",
            "أدوات البناء (للمكتبات native) في المرحلة دي بس، ومن غير كاش apk.",
            "فولدر الشغل.",
            "ملفات الباكدجات.",
            "سطّب وابني المكتبات.",
            "المرحلة النهائية نضيفة.",
            "مكتبة تشغيل بس لو محتاجها (مش النسخة -dev).",
            "فولدر الشغل.",
            "خد node_modules المبنية جاهزة.",
            "الكود.",
            "يوزر عادي.",
            "شغّل."
          ],
          sol: R`على alpine من غير [[apk add]] الـ build بيقع في [[npm ci]] بـ error طويل من [[node-gyp]]، أهم سطر فيه حاجة زي [[gyp ERR! find Python]] أو [[make: not found]] / [[g++: not found]]، وده لما npm مايلاقيش prebuilt binary لـ musl فيحاول يبني من الـ source. (مع نسخ bcrypt الجديدة ممكن الـ prebuilt يتلاقي وماتشوفش error، فجرّبه كمان مع [[npm ci --build-from-source]] عشان تشوف المشكلة.)

بعد سطر [[apk add --no-cache python3 make g++]] الـ build بينجح. ومع [[node:22-bookworm-slim]] غالبًا بينجح من غير أي سطر زيادة لأن الباكدجات عندها prebuilt لـ glibc. وفي [[docker images]] الـ slim هتطلع أكبر من الـ alpine بشوية (عشرات الميجا)، والـ alpine اللي فيها أدوات البناء في المرحلة الأخيرة هتطلع الأكبر، وده ليه بنحطها في مرحلة deps بس.

الغلط الشائع: تسطّب [[python3 make g++]] في المرحلة الأخيرة، فالـ image تكبر مئات الميجا من غير لازمة.`
        },
        {
          cmd: "أسرار وقت الـ build",
          title: "سر اتبعت وقت البناء وفضل جوه الـ image",
          desc: R`أي قيمة بتبعتها بـ [[--build-arg]] وتستخدمها في ENV أو RUN بتفضل في الـ image، وأي حد معاه الـ image يقدر يقراها بـ [[docker history]] أو [[inspect]]. لو الـ build محتاج سر فعلًا (توكن npm لباكدج خاص مثلًا)، استخدم [[RUN --mount=type=secret]]: السر بيتركّب كملف في الخطوة دي بس ومبيتكتبش في أي طبقة.

والأسرار اللي التطبيق محتاجها وهو شغال مكانها وقت التشغيل ([[env_file]])، مش وقت البناء أصلًا.`,
          example: R`# syntax=docker/dockerfile:1.7
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm ci
COPY . .
ARG NEXT_PUBLIC_API_URL
RUN npm run build`,
          try: "ابني بـ [[docker build --secret id=npmrc,src=.npmrc -t myapp .]]، وبعدين [[docker history --no-trunc myapp]] ودوّر على التوكن: مش موجود. جرّب نفس التوكن كـ ARG واتفرّج عليه ظاهر.",
          flag: "script",
          deep: {
            why: R`في Next.js و Vite متغيرات [[NEXT_PUBLIC_]] و [[VITE_]] لازم تكون موجودة وقت الـ build، فالناس بتتعود تبعت كل حاجة كـ build arg، ومعاها مفاتيح السيرفر. والـ image بتترفع على registry أو تتنقل، والمفاتيح معاها.`,
            how: R`كل RUN بيستخدم ARG بيتسجّل في تاريخ الـ image بالقيمة. و [[ENV X=$X]] بيحفظ القيمة في إعدادات الـ image نفسها. الاتنين بيبانوا لأي حد يعمل pull.

[[--mount=type=secret,id=npmrc,target=/root/.npmrc]] بيحط الملف في المسار ده وقت الأمر ده بس، وبعده بيختفي، ومش جزء من أي طبقة ولا بيأثر على الكاش. بتبعته من بره بـ [[docker build --secret id=npmrc,src=.npmrc]]، وفي compose تحت [[build: secrets:]].

سطر [[# syntax=docker/dockerfile:1.7]] في أول الملف بيقول لـ BuildKit يستخدم نسخة parser محددة، فمميزات زي secret و cache mounts تشتغل حتى لو Docker على السيرفر قديم شوية.

و [[NEXT_PUBLIC_API_URL]] مش سر أصلًا: قيمته بتتحط في JavaScript اللي بيروح للمتصفح. عشان كده عادي يبقى ARG. أي حاجة من غير NEXT_PUBLIC (مفتاح service role، أو HMAC بتاع الدفع، أو DATABASE_URL) مكانها env_file وقت التشغيل.`,
            when: "توكن npm أو pip لباكدجات خاصة، أو SSH key لـ git clone خاص وقت البناء.",
            mistakes: R`في مشروع حقيقي مفتاح service role بتاع قاعدة البيانات و HMAC secret بتاع بوابة الدفع كانوا بيتبعتوا كـ ARG و ENV في مرحلة الـ build، فبقوا محفوظين في طبقات الـ image وفي docker history. وفي مشروع تاني DATABASE_URL بالباسورد اتمرّر build arg. الحل: NEXT_PUBLIC بس وقت البناء، والباقي env_file. ولو سر اتسرّب في image اترفعت: غيّر السر نفسه، مسح الـ image مش كفاية.`
          },
          teach: R`## السؤال: السر بيعدّي على البناء، هل بيفضل جوه؟

مع [[ARG]] أو [[ENV]]: **أيوه**، وأي حد معاه الـ image يقراه. مع [[RUN --mount=type=secret]]: **لأ**، الملف بيظهر للخطوة دي بس ويختفي. جربنا الاتنين بنفس التوكن الوهمي [[TOKEN123]] على Docker Desktop 29.

المشروع: [[package.json]] فيه [[build]] بيطبع قيمة [[NEXT_PUBLIC_API_URL]] بس، وملف [[.npmrc]] فيه التوكن:

~~~bash
echo "//registry.npmjs.org/:_authToken=TOKEN123" > .npmrc
~~~

[[.npmrc]] ملف إعدادات npm، والسطر ده معناه «لما تكلّم registry npm، ابعت التوكن ده» (ده اللي بيخليك تنزّل باكدجات خاصة).

> في Windows PowerShell 5.1، [[>]] بيكتب الملف UTF-16 (جربناها: أول الملف [[FF FE]] وبين كل حرف صفر)، و npm مش هيفهمه. PowerShell 7 بيكتب UTF-8 عادي. وحط [[.npmrc]] في [[.dockerignore]] عشان [[COPY . .]] ميوصلوش.

---

## الـ Dockerfile سطر بسطر

### [[# syntax=docker/dockerfile:1.7]]

شكله تعليق، بس لازم يبقى **أول سطر**: بيقول لـ BuildKit «اقرا الملف ده بنسخة 1.7 من الـ parser». BuildKit بينزّلها كـ image صغيرة ([[docker/dockerfile:1.7]]) أول مرة:

~~~text الناتج
#2 resolve image config for docker-image://docker.io/docker/dockerfile:1.7
~~~

كده مميزات زي [[--mount=type=secret]] تشتغل حتى لو Docker اللي بيبني قديم شوية.

### [[FROM]] و [[WORKDIR]] و [[COPY package*.json ./]]

زي العادة.

### [[RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm ci]]

| الحتة | معناها |
|---|---|
| [[--mount=]] | ركّب حاجة للخطوة دي بس |
| [[type=secret]] | النوع: سر (مبيتكتبش في أي طبقة، ومبيأثرش على الكاش) |
| [[id=npmrc]] | اسمه، وبيتربط بالـ [[--secret id=npmrc,...]] في أمر الـ build |
| [[target=/root/.npmrc]] | يظهر جوه على المسار ده، اللي npm بيدوّر فيه |
| [[npm ci]] | الأمر نفسه، بيلاقي التوكن ويستخدمه |

### [[ARG NEXT_PUBLIC_API_URL]] و [[RUN npm run build]]

متغير build لرابط الـ API. ده **مش سر**: Next.js بيحط قيمته في JavaScript اللي بيروح لأي متصفح. فعادي يبقى ARG.

---

## البناء

~~~bash
docker build --secret id=npmrc,src=.npmrc --build-arg NEXT_PUBLIC_API_URL=https://api.example.com -t myapp .
~~~

[[--secret id=npmrc,src=.npmrc]]: السر اللي اسمه [[npmrc]] مصدره ([[src]]) الملف ده عندك. وفي PowerShell نفس السطر بالظبط.

~~~text الناتج (مختصر)
#12 0.428 built with API=https://api.example.com
~~~

---

## الامتحان: فين التوكن؟

~~~bash
docker history --no-trunc myapp
~~~

[[--no-trunc]] (no truncate): متقصّش الأوامر الطويلة بـ [[…]].

~~~text الناتج (عمود CREATED BY، أول ٥)
RUN |1 NEXT_PUBLIC_API_URL=https://api.example.com /bin/sh -c npm run build # buildkit
ARG NEXT_PUBLIC_API_URL
COPY . . # buildkit
RUN /bin/sh -c npm ci # buildkit
COPY package*.json ./ # buildkit
~~~

- سطر [[npm ci]] مفيهوش أي أثر للـ mount ولا للتوكن، و [[grep -c TOKEN123]] على الـ history طلّع [[0]].
- بس بص على أول سطر: [[RUN |1 NEXT_PUBLIC_API_URL=https://api.example.com]]. أي ARG بيتستخدم في RUN بيتسجّل **بقيمته**. ([[|1]] يعني «فيه ARG واحد متاح للخطوة دي».) عادي هنا لأنه رابط عام.

~~~text الناتج: docker run --rm myapp ls /root/.npmrc
ls: /root/.npmrc: No such file or directory
~~~

وعشان نتأكد إن الملف كان موجود فعلًا وقت الخطوة، عملنا Dockerfile تجربة فيه [[RUN --mount=type=secret,id=npmrc,target=/root/.npmrc ls -l /root/.npmrc]]:

~~~text الناتج
-r--------    1 root     root            42 Oct  6 12:41 /root/.npmrc
~~~

موجود، وصلاحياته [[-r--------]] (قراية لـ root بس)، وبعد الخطوة اختفى.

---

## نفس التوكن كـ ARG (الطريقة الغلط)

~~~text Dockerfile.arg
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
ARG TOKEN
RUN echo "//registry.npmjs.org/:_authToken=$TOKEN" > /root/.npmrc && npm ci && rm /root/.npmrc
~~~

بنيناه بـ [[--build-arg TOKEN=TOKEN123]]. [[rm]] في الآخر مسح الملف، و [[ls /root/.npmrc]] قال [[No such file or directory]]. بس:

~~~text الناتج: docker history --no-trunc | grep TOKEN
RUN |1 TOKEN=TOKEN123 /bin/sh -c echo "//registry.npmjs.org/:_authToken=$TOKEN" > /root/.npmrc && npm ci && rm /root/.npmrc # buildkit
ARG TOKEN=TOKEN123
~~~

التوكن مكتوب **مرتين** في تاريخ الـ image. مسح الملف مايفرقش: القيمة اتسجلت في الـ metadata.

---

## الخلاصة

| الطريقة | السر في الـ image؟ |
|---|---|
| [[ARG]] و [[--build-arg]] | أيوه، في [[docker history]] |
| [[ENV]] | أيوه، في [[docker inspect]] وفي كل container |
| [[RUN --mount=type=secret]] و [[--secret]] | لأ |
| [[env_file]] وقت التشغيل | لأ، ده مكان أسرار التطبيق |

~~~text
NEXT_PUBLIC_* / VITE_*   مش أسرار، عادي ARG
توكن npm وقت البناء      --mount=type=secret
مفاتيح السيرفر            env_file وقت التشغيل، مش وقت البناء أصلًا
~~~`,
          lines: [
            "ابدأ من Node.",
            "فولدر الشغل.",
            "ملفات الباكدجات.",
            "سطّب، وملف .npmrc (فيه التوكن) متركّب للخطوة دي بس ومش هيتحفظ.",
            "الكود.",
            "متغير عام مش سر، عادي يبقى ARG لأنه رايح للمتصفح أصلًا.",
            "ابني."
          ],
          sol: R`مع [[--secret]]: [[docker history --no-trunc myapp | grep TOKEN]] مش بيطلّع حاجة، وسطر الـ RUN في الـ history شكله [[RUN /bin/sh -c npm ci # buildkit]] من غير أي أثر للملف. و [[docker run --rm myapp ls /root/.npmrc]] بيقول [[No such file or directory]]: الملف كان موجود وقت الخطوة دي بس.

مع نفس التوكن كـ [[ARG]]: الـ history بيوريه صريح في سطرين: [[ARG TOKEN=TOKEN123]] و [[RUN |1 TOKEN=TOKEN123 /bin/sh -c ...]]. يعني أي حد معاه الـ image يقدر يقراه، حتى لو مسحت الملف في خطوة بعدها.

الغلط الشائع: [[Dockerfile parse error ... unknown flag: mount]]: الـ builder القديم شغال. شغّل BuildKit ([[DOCKER_BUILDKIT=1]] أو Docker حديث) وحط سطر [[# syntax=docker/dockerfile:1.7]] أول الملف.`,
          solCode: R`echo "//registry.npmjs.org/:_authToken=TOKEN123" > .npmrc
docker build --secret id=npmrc,src=.npmrc -t myapp .
docker history --no-trunc myapp | grep TOKEN123
docker run --rm myapp ls /root/.npmrc`
        },
        {
          cmd: "Next.js standalone",
          title: "image صغيرة لتطبيق Next.js",
          desc: R`[[output: "standalone"]] في next.config بيخلي [[next build]] يطلّع فولدر فيه [[server.js]] ومعاه بس المكتبات اللي التطبيق بيستخدمها فعلًا، بدل node_modules كله. في آخر مرحلة بتنسخ standalone و static و public، وتشغّل [[node server.js]].

ولازم [[HOSTNAME=0.0.0.0]]، وإلا السيرفر ممكن يسمع على عنوان مش هو اللي البورت متوجّه له، ومحدش يوصله.`,
          example: R`# next.config.ts:  output: "standalone"
FROM node:22-bookworm-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build && test -d .next/standalone

FROM node:22-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
USER node
EXPOSE 3000
CMD ["node", "server.js"]`,
          try: "ابني مشروع Next بالطريقة دي ومرة بـ node_modules كامل و next start، وقارن الحجم في [[docker images]].",
          flag: "script",
          deep: {
            why: "مشروع Next عادي node_modules بتاعه ممكن يبقى نص جيجا. في الإنتاج التطبيق بيستخدم جزء صغير منه بس. standalone بيحسب الجزء ده وياخده لوحده.",
            how: R`[[output: "standalone"]] بيخلي Next يتتبّع كل ملف التطبيق بيعمله import، وينسخ المكتبات دي بس في [[.next/standalone]]، ومعاها [[server.js]] صغير بيشغّل التطبيق من غير [[next start]].

standalone مش بينسخ [[public]] ولا [[.next/static]] (Next بيفترض إن ممكن يروحوا CDN)، فبتنسخهم انت. نسيانهم معناه موقع من غير CSS ولا صور.

server.js بيقرا [[PORT]] و [[HOSTNAME]]. Docker نفسه بيحط متغير HOSTNAME = id الـ container، فلو سبته، Next بيسمع على العنوان ده. [[HOSTNAME=0.0.0.0]] بيخليه يسمع على كل الواجهات.

[[test -d .next/standalone]] بيوقّف الـ build بـ error واضح لو حد شال الإعداد من next.config، بدل ما الـ image تتبني ناقصة وتقع وقت التشغيل.

[[NEXT_TELEMETRY_DISABLED=1]] بيقفل إرسال بيانات الاستخدام لـ Vercel وقت البناء. ولو الموقع شغال تحت مسار فرعي، [[basePath: "/myapp"]] في نفس الملف، ولازم يبقى موجود وقت الـ build.

وأي متغير [[NEXT_PUBLIC_]] لازم يبقى موجود وقت الـ build (ARG)، لأنه بيتحط في JavaScript وقتها. env_file وقت التشغيل مش هيغيّره.`,
            when: "أي تطبيق Next.js رايح Docker. standalone هو الطريقة الرسمية لكده.",
            mistakes: R`في مشروع حقيقي سكربت الديبلوي كان بيعدّل next.config بـ sed على السيرفر عشان يضيف standalone، يعني الإعداد مش في git وأول clone جديد يبوّظه. ومتغيرات NEXT_PUBLIC في env_file وقت التشغيل، وتستغرب إنها undefined في المتصفح. ونسيان نسخ public أو static.`
          },
          teach: R`## الفكرة: Next بيحسب المكتبات اللي محتاجها فعلًا

[[output: "standalone"]] بيخلي [[next build]] يتتبّع كل [[import]] في التطبيق، ويطلّع فولدر [[.next/standalone]] فيه [[server.js]] صغير ومعاه **بس** المكتبات اللي اتستخدمت. الـ image النهائية بتاخد الفولدر ده بدل node_modules كله.

جربناه بمشروع Next 15.5.4 صغير (صفحة فيها عنوان وصورة من [[public]])، و [[next.config.mjs]] بدل [[.ts]] عشان منحتاجش TypeScript، والمحتوى واحد:

~~~text next.config.mjs
export default { output: "standalone" };
~~~

والبناء على Docker Desktop 29.

---

## المرحلة الأولى: [[builder]]

| السطر | ليه |
|---|---|
| [[# next.config.ts:  output: "standalone"]] | تذكير بس: الإعداد ده لازم يبقى في next.config، مش في الـ Dockerfile |
| [[FROM node:22-bookworm-slim AS builder]] | Debian slim: SWC (الكومبايلر بتاع Next) و sharp بيشتغلوا من غير مشاكل musl (درس «alpine ولا slim») |
| [[RUN npm ci]] | كامل بالـ devDependencies، البناء محتاجها |
| [[ENV NEXT_TELEMETRY_DISABLED=1]] | Next بيبعت بيانات استخدام مجهولة لـ Vercel وقت البناء، وده بيقفلها |
| [[RUN npm run build && test -d .next/standalone]] | ابني، وبعدين اتأكد |

### [[test -d .next/standalone]]

[[test -d مسار]] بيرجع 0 لو المسار فولدر موجود، و 1 لو لأ. و [[&&]] يعني «لو اللي قبلي نجح». فلو حد شال [[output: "standalone"]]، البناء يقع **هنا** برسالة واضحة، بدل ما يكمّل ويقع في الـ COPY اللي بعده أو وقت التشغيل.

~~~text الناتج (من البناء)
 ✓ Compiled successfully in 3.3s
Route (app)                                 Size  First Load JS
┌ ○ /                                      127 B         102 kB
└ ○ /_not-found                            991 B         103 kB
○  (Static)  prerendered as static content
~~~

---

## المرحلة التانية

### [[ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0]]

تلات متغيرات في سطر. [[server.js]] بتاع standalone بيقرا [[PORT]] (البورت) و [[HOSTNAME]] (يسمع على أنهي عنوان). [[0.0.0.0]] = كل الواجهات.

### التلات COPY

| السطر | بيجيب إيه | لو نسيته |
|---|---|---|
| [[COPY --from=builder ... /app/public ./public]] | الصور والملفات العامة | الصور 404 |
| [[COPY --from=builder ... /app/.next/standalone ./]] | [[server.js]] و [[node_modules]] المتقلّمة و [[package.json]] | مفيش تطبيق |
| [[COPY --from=builder ... /app/.next/static ./.next/static]] | ملفات JS و CSS المبنية | صفحة من غير ستايل ولا تفاعل |

standalone مش بينسخ [[public]] ولا [[static]] لوحده (Next بيفترض إنهم ممكن يروحوا CDN)، فالسطرين دول لازمين. و [[--chown=node:node]] عشان يوزر node يملكهم.

### [[USER node]] و [[EXPOSE 3000]] و [[CMD ["node", "server.js"]]]

node مباشرة، مش [[next start]] ولا [[npm start]].

---

## النتيجة

~~~text الناتج: ls -A /app (في سطر واحد)
.next  node_modules  package.json  public  server.js
~~~

~~~text الناتج: ls /app/node_modules
@img  @next  @swc  caniuse-lite  client-only  detect-libc  nanoid  next  picocolors
postcss  react  react-dom  semver  sharp  source-map-js  styled-jsx
~~~

~~~text الناتج: docker logs
   ▲ Next.js 15.5.4
   - Local:        http://localhost:3000
   - Network:      http://0.0.0.0:3000

 ✓ Starting...
 ✓ Ready in 100ms
~~~

وعلى [[-p 3300:3000]]: الصفحة رجعت [[<h1>hello next</h1>]]، و [[/logo.svg]] رجعت 200، وملف من [[/_next/static/chunks/]] رجع 200.

### نقارن بالطريقة الكاملة

بنينا نفس المشروع بمرحلة واحدة (npm ci كامل + build + [[npx next start]]):

~~~text الناتج: docker images
IMAGE       DISK USAGE   CONTENT SIZE
nx:full         1.08GB          279MB
nx:latest        395MB         94.2MB
~~~

| | node_modules | الـ image |
|---|---|---|
| كاملة | 322MB | 1.08GB |
| standalone | 51MB | 395MB |

والفرق بيكبر كل ما المشروع يزود مكتبات.

---

## تجربة [[HOSTNAME]]

Docker بيحط في كل container متغير [[HOSTNAME]] = اسم الـ container (أول ١٢ حرف من الـ ID)، و server.js بيسمع عليه لو مغيّرتهوش. جربنا قيمتين بـ [[-e]]:

| [[HOSTNAME]] | Next كتب | [[curl localhost:PORT]] من بره |
|---|---|---|
| [[0.0.0.0]] (اللي في المثال) | [[http://0.0.0.0:3000]] | 200 |
| اسم الـ container | [[http://dk01h:3000]] | 200 (بيسمع على IP الشبكة الوحيدة) |
| [[localhost]] | [[http://localhost:3000]] | فشل: curl خرج بكود 52 (رد فاضي) |

[[localhost]] جوه الـ container معناها الـ container نفسه بس، فالبورت اللي Docker موجّهه مش واصل. واسم الـ container اشتغل هنا، بس بيسمع على عنوان شبكة واحدة، فلو الـ container على أكتر من شبكة أو فحص صحة بيكلّم [[localhost]] هيفشل. [[0.0.0.0]] بتشيل الاحتمالات دي كلها.

---

## الخلاصة

~~~text
output: "standalone"        في next.config، ولازم وقت الـ build
test -d .next/standalone    يوقّف البناء لو الإعداد اتشال
3 COPY                      standalone + public + .next/static
HOSTNAME=0.0.0.0            اسمع على كل الواجهات
CMD ["node", "server.js"]   مش next start
~~~`,
          lines: [
            "مرحلة البناء. slim عشان SWC و sharp يشتغلوا من غير مشاكل musl.",
            "فولدر الشغل.",
            "ملفات الباكدجات.",
            "سطّب كل حاجة (البناء محتاج devDependencies).",
            "الكود.",
            "اقفل telemetry بتاعة Next.",
            "ابني، ووقّف بـ error لو فولدر standalone مطلعش.",
            "المرحلة النهائية نضيفة.",
            "فولدر الشغل.",
            "وضع الإنتاج، والبورت، واسمع على كل الواجهات.",
            "الملفات العامة (standalone مش بينسخها).",
            "السيرفر والمكتبات اللي بيستخدمها بس.",
            "ملفات CSS و JS الثابتة (برضه مش بتتنسخ لوحدها).",
            "يوزر node مش root.",
            "توثيق البورت.",
            "شغّل server.js مباشرة."
          ],
          sol: R`الـ standalone المفروض يطلع أصغر بشكل واضح: الفولدر [[.next/standalone]] فيه بس الـ node_modules اللي السيرفر بيستخدمها فعلًا (اتحسبت بـ tracing)، مش كل الباكدجات. في مشروع Next صغير الفرق في [[docker images]] بيبقى في حدود مئات الميجا (مثلًا حوالي ٢٠٠-٣٠٠ ميجا قدام ٦٠٠ ميجا لـ 1GB للطريقة الكاملة)، والرقم بيعتمد على الـ dependencies بتاعتك.

وتتأكد إنها شغالة: [[docker run -p 3000:3000 myapp]] بيطبع [[▲ Next.js]] و [[Ready in ...]]، والصفحات والصور تفتح.

الأغلاط الشائعة: الصفحة تفتح من غير CSS و JS (404 على [[/_next/static/...]]) لأنك نسيت تنسخ [[.next/static]]. والصور من [[public]] مش ظاهرة لأنك نسيت [[public]]. و [[test -d .next/standalone]] بيفشل البناء لو [[output: "standalone"]] مش في next.config، وده مقصود.`
        },
        {
          cmd: "SPA جوه nginx",
          title: "موقع Vite أو React في image فيها nginx بس",
          desc: R`مرحلة Node بتعمل [[npm run build]]، ومرحلة [[nginx:alpine]] بتاخد فولدر dist بس ومعاه ملف الإعدادات. الـ image النهائية فيها nginx وملفات ثابتة، من غير Node خالص.

و [[daemon off;]] عشان nginx يفضل في الـ foreground. أي برنامج بيروح الخلفية لوحده، الـ container بيقفل أول ما يقوم، لأن العملية رقم 1 خرجت.`,
          example: R`FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV VITE_API_BASE_URL=""
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`,
          try: "ابني الـ image وشغّلها بـ [[-p 8080:80]]، وافتح صفحة فرعية مباشرة (مش من الرئيسية) واتأكد إنها مش 404: ده شغل try_files في nginx.conf.",
          flag: "script",
          deep: {
            why: "موقع SPA بعد الـ build مجرد HTML و JS و CSS. مش محتاج Node عشان يتقدّم، و nginx أسرع وأخف بكتير. وكمان nginx نفسه يقدر يوجّه /api للباك إند، فالفرونت والـ API على نفس الدومين ومفيش CORS.",
            how: R`المرحلة الأولى بتبني وتطلّع dist. المرحلة التانية بتبدأ من nginx:alpine (حوالي ٢٠ ميجا) وبتاخد dist بس.

[[VITE_API_BASE_URL=""]]: متغيرات VITE بتتحط في الكود وقت البناء. فاضية يعني الطلبات تروح [[/api/...]] على نفس الدومين، و nginx.conf فيه [[location /api/]] بيعمل proxy_pass لـ [[http://backend:3000]] على شبكة compose.

nginx.conf لازم فيه [[try_files $uri $uri/ /index.html]] عشان روابط الـ SPA تشتغل لما حد يفتحها مباشرة، و index.html من غير كاش، و /assets بكاش طويل. التفاصيل في تاب Nginx درس SPA.

[[daemon off;]]: صورة nginx الرسمية فيها السطر ده أصلًا في CMD، فكتابته توضيح. بس الفكرة مهمة: الـ container عايش طول ما العملية رقم 1 عايشة. لو شغّلت nginx أو أي خدمة بالطريقة اللي بتفصل نفسها وتروح الخلفية، العملية الأصلية بتخرج فورًا والـ container يقفل بـ exit 0.`,
            when: "أي فرونت SPA (Vite، و React، و Vue) رايح الإنتاج.",
            mistakes: R`في مشروع حقيقي إعدادات nginx كانت مكتوبة بـ [[RUN echo '...']] جوه الـ Dockerfile (هروب علامات صعب ومش مقروء)، وفي نفس الوقت compose بيركّب nginx.conf من ملف، والاتنين بيسمعوا على بورتات مختلفة (8000 و 80)، فنسخة staging كانت شغالة بإعدادات غير الإنتاج. خلّي ملف واحد في git وانسخه بـ COPY. وغلطة تانية: تشغيل [[npm run dev]] في image الإنتاج.`
          },
          teach: R`## الفكرة: Node للبناء بس، و nginx للتقديم

موقع React أو Vite بعد [[npm run build]] بيبقى ملفات ثابتة: [[index.html]] و JS و CSS. مش محتاج Node عشان يتقدّم، فالمرحلة الأولى بتبني، والتانية [[nginx:alpine]] بتاخد فولدر [[dist]] بس.

جربناه على Docker Desktop 29 بمشروع وهمي: [[build]] في package.json سكربت شيل بيعمل [[dist/index.html]] و [[dist/assets/app.js]] بدل Vite الحقيقي (الدرس عن الـ Dockerfile، مش عن Vite). و [[nginx.conf]] هو اللي في الـ solCode.

---

## المرحلة الأولى: [[build]]

| السطر | ليه |
|---|---|
| [[FROM node:22-alpine AS build]] | ورشة فيها Node |
| [[WORKDIR]] و [[COPY package*.json]] و [[RUN npm ci]] | كامل بالـ devDependencies (Vite نفسه devDependency) |
| [[COPY . .]] | الكود |
| [[ENV VITE_API_BASE_URL=""]] | متغير فاضي، وده مقصود (تحت) |
| [[RUN npm run build]] | يطلّع [[dist]] |

### ليه [[VITE_API_BASE_URL=""]]؟

Vite بيحط قيم متغيرات [[VITE_]] **جوه الـ JavaScript وقت البناء**، مش وقت التشغيل. فاضي يعني الكود هيطلب [[/api/users]] على نفس الدومين اللي الصفحة جاية منه، و nginx هو اللي يوجّه [[/api/]] للباك إند. في التجربة الصفحة اتبنت وفيها [[API=]] وبعدها قوسين فاضيين: القيمة اتحطت فاضية فعلًا.

---

## المرحلة التانية: nginx

### [[FROM nginx:alpine]]

بداية جديدة: nginx على Alpine، ومفيهاش Node خالص.

### [[COPY --from=build /app/dist /usr/share/nginx/html]]

[[/usr/share/nginx/html]] الفولدر اللي nginx بيقدّم منه افتراضيًا (شفناه في درس «docker exec»). فبنحط الموقع المبني مكان صفحة Welcome.

### [[COPY nginx.conf /etc/nginx/conf.d/default.conf]]

بنستبدل إعدادات الموقع الافتراضية بإعداداتنا:

~~~text nginx.conf
server {
  listen 80;
  root /usr/share/nginx/html;
  location / { try_files $uri $uri/ /index.html; }
}
~~~

| السطر | معناه |
|---|---|
| [[listen 80]] | اسمع على 80 |
| [[root ...]] | الملفات من هنا |
| [[location / { ... }]] | لأي طلب |
| [[try_files $uri $uri/ /index.html]] | جرّب ملف بنفس المسار ([[$uri]])، ولو مفيش جرّب فولدر، ولو مفيش رجّع [[index.html]] |

السطر الأخير هو المهم: [[/products/5]] مش ملف، دي صفحة بيعملها React Router في المتصفح. من غير [[try_files]] nginx هيدوّر على ملف اسمه [[products/5]] ويقول 404.

### [[EXPOSE 80]] و [[CMD ["nginx", "-g", "daemon off;"]]]

[[-g]] بيدّي nginx إعداد من سطر الأوامر، و [[daemon off;]] يعني «متروحش الخلفية، فضل في الـ foreground».

---

## التجربة: مع [[try_files]] ومن غيره

بنينا نسختين: الأولى بالـ nginx.conf، والتانية من غير سطر [[COPY nginx.conf]] (يعني إعدادات nginx الأصلية):

~~~bash
curl -s -o /dev/null -w "%{http_code}\n" localhost:8080/products/5
~~~

(في التجربة النسختين كانوا على 8081 و 8082 بدل 8080.) [[-o /dev/null]] ارمي الصفحة، و [[-w "%{http_code}\n"]] اطبع كود الرد بس.

| الطلب | بالـ nginx.conf | من غيره |
|---|---|---|
| [[/products/5]] | 200 (ومحتواه [[index.html]]) | 404 |
| [[/assets/app.js]] | 200، [[application/javascript]] | 200 |

الملفات الحقيقية شغالة في الحالتين، بس روابط الـ SPA محتاجة [[try_files]].

~~~text الناتج: docker images
IMAGE        DISK USAGE   CONTENT SIZE
spa:latest       93.6MB         26.3MB
~~~

نفس حجم [[nginx:alpine]] تقريبًا: Node والـ node_modules فضلوا في المرحلة الأولى. والتأكد إن الإعدادات وصلت:

~~~text الناتج: docker run --rm spa cat /etc/nginx/conf.d/default.conf
server {
  listen 80;
  root /usr/share/nginx/html;
  location / { try_files $uri $uri/ /index.html; }
}
~~~

---

## ليه [[daemon off;]]؟ جربنا من غيره

nginx من غير الإعداد ده بيعمل نسخة من نفسه في الخلفية ويخرج. شغّلنا [[docker run -d IMAGE nginx]] (يعني CMD من غير [[-g "daemon off;"]]):

~~~text الناتج: docker ps -a بعد ثانيتين
Exited (0) 2 seconds ago
~~~

الـ container **عايش طول ما PID 1 عايش**. nginx الأصلي (PID 1) خرج بعد ما سلّم للنسخة اللي في الخلفية، فالـ container قفل. ومع [[daemon off;]]:

~~~text الناتج: docker exec spa ps -o pid,args
PID   COMMAND
    1 nginx: master process nginx -g daemon off;
   29 nginx: worker process
~~~

nginx هو PID 1 وفاضل شغال. وصورة nginx الرسمية أصلًا الـ CMD بتاعها [[["nginx","-g","daemon off;"]]] (شفناها بـ [[docker inspect]])، فالسطر في المثال بيوضّح الافتراضي.

---

## الخلاصة

~~~text
مرحلة Node      npm ci + npm run build → dist
مرحلة nginx     dist في /usr/share/nginx/html + nginx.conf
try_files       روابط الـ SPA ترجع index.html بدل 404
VITE_*          بتتحط وقت البناء، فاضية = نفس الدومين
daemon off;     nginx يفضل PID 1 والـ container يفضل عايش
~~~`,
          lines: [
            "مرحلة البناء على Node.",
            "فولدر الشغل.",
            "ملفات الباكدجات.",
            "سطّب.",
            "الكود.",
            "رابط الـ API فاضي: الطلبات تروح /api على نفس الدومين.",
            "ابني: يطلع dist.",
            "المرحلة النهائية: nginx بس.",
            "الملفات المبنية في فولدر nginx.",
            "إعدادات الموقع (SPA و proxy لـ /api).",
            "توثيق البورت.",
            "nginx في الـ foreground عشان الـ container يفضل عايش."
          ],
          sol: R`[[curl -i localhost:8080/products/5]] (أو فتحها مباشرة من المتصفح) بيرجع [[200]] ومحتوى [[index.html]]، والـ React Router هو اللي بيعرض الصفحة الصح.

من غير [[try_files $uri $uri/ /index.html;]] (يعني بـ default.conf الأصلي بتاع nginx) نفس الرابط بيرجع [[404 Not Found]]، لأن nginx بيدوّر على ملف اسمه [[products/5]] في الفولدر ومش لاقيه. جربتها الاتنين: من غيره 404، ومعاه 200.

الغلط الشائع: nginx.conf الخاص بيك مش واصل للـ image (غلط في مسار الـ COPY)، وتقدر تتأكد بـ [[docker run --rm IMAGE cat /etc/nginx/conf.d/default.conf]]. ولو الـ assets بترجع HTML بدل JS يبقى [[base]] في Vite غلط والمتصفح بيطلب [[/products/assets/...]].`,
          solCode: R`cat > nginx.conf <<'EOF2'
server {
  listen 80;
  root /usr/share/nginx/html;
  location / { try_files $uri $uri/ /index.html; }
}
EOF2
docker build -t myspa .
docker run -d --name spa -p 8080:80 myspa
curl -s -o /dev/null -w "%{http_code}\n" localhost:8080/products/5`
        }
      ]
    }
]);
