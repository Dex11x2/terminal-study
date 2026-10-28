// تكملة تاب docker: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/docker/01.js (شرح حقول الدرس في أوله)
MORE("docker", [
    {
      t: "مشروع: صورة محترمة لتطبيقك",
      l: 3,
      time: R`حوالي ساعتين`,
      goal: [
        R`تعمل Dockerfile شغّال، وتفهم ليه أول نسخة منه غلط.`,
        R`ترتّب الطبقات فالكاش يشتغل، وإعادة البناء تاخد ثواني بدل دقايق.`,
        R`تصغّر سياق البناء من **68 ميجا لـ 90 بايت** بسطر واحد.`,
        R`تشغّل التطبيق بمستخدم مش root، ومعاه فحص صحة.`,
        R`تعرّف الخدمة في [[compose]] وتجرّبها بـ [[--dry-run]].`,
      ],
      use: {
        prog: R`ترتيب الطبقات هو نفس فكرة الكاش في أي بناء: اللي بيتغيّر نادرًا فوق، واللي بيتغيّر كتير تحت. ونفس المبدأ في [[Makefile]] وفي طبقات الـ CI.`,
        net: R`الصورة اللي بتشتغل بـ root معناها إن أي ثغرة في تطبيقك بتبقى root جوه الكونتينر. و [[USER]] سطر واحد بيقفل الباب ده.`,
        cs: R`الصورة سلسلة طبقات، كل واحدة فرق عن اللي قبلها. ودي نفس بنية git بالظبط — ومنها جات فكرة الكاش.`,
        work: R`إعادة بناء بتاخد دقيقتين كل مرة بتعدّل سطر هي اللي بتخليك تبطّل تستخدم docker في التطوير.`,
      },
      lab: R`mkdir -p ~/lab/dlab && cd ~/lab/dlab`,
      projects: [
        { t: R`قيس بنفسك`, what: R`خد مشروع حقيقي عندك، وابنيه بالـ Dockerfile الغلط وبالمظبوط، وقيس الفرق بـ [[time docker build]] بعد تعديل سطر في الكود. الرقم اللي هيطلع عندك أقنع من أي كلام. من درس ٢.` },
        { t: R`صغّر الصورة`, what: R`جرّب [[node:22-alpine]] بدل [[slim]]، و [[distroless]] بدلهم. وقيس بـ [[docker image ls]]. وشوف إيه اللي بيقع في كل واحدة — alpine بتستخدم musl مش glibc، وده بيكسر حزم فيها كود native. من درس ٣.` },
        { t: R`ضيف قاعدة بيانات`, what: R`زوّد خدمة [[postgres]] في [[compose.yaml]]، مع [[volume]] للبيانات و [[depends_on]] بـ [[condition: service_healthy]]. وجرّب [[--dry-run]] الأول. من درس ٤.` },
        { t: R`افحص صورتك`, what: R`[[docker scout quickview <الصورة>]] بتوريك الثغرات المعروفة. جرّبها على صورتك وعلى [[node:22-slim]] وقارن.` },
      ],
      n: R`هنبني صورة لتطبيق Node بسيط، على أربع خطوات. كل خطوة بتصلّح حاجة في اللي قبلها، **وكل خطوة بتتقاس بالأرقام** — حجم السياق، والكاش، والحجم، وحالة الصحة`,
      items: [
        {
          cmd: "مشروع — أول Dockerfile، والفخ اللي فيه",
          title: "بيشتغل، وبيعيد تسطيب الحزم كل مرة",
          learn: R`تكتب Dockerfile شغّال، وتكتشف إن ترتيبه بيلغي الكاش مع أي تعديل.`,
          out: R`صورة شغالة، وفهم للمشكلة اللي الدرس الجاي بيحلها.`,
          use: {
            prog: R`الطبقات بتتكاش بالترتيب: أول طبقة بتتغيّر بتلغي كل اللي بعدها. فترتيبك بيحدد كام مرة هتعيد الشغل الغالي.`,
            work: R`أول Dockerfile بيكتبه أي حد بيبقى بالشكل ده بالظبط. وهو شغّال — وده اللي بيخلي المشكلة تفضل سنين.`,
          },
          desc: R`هنبني صورة لتطبيق Node صغير: سيرفر HTTP فيه مسارين، [[/]] و [[/health]].

وأول Dockerfile بيكتبه أي حد بيبقى كده:

[[FROM]] الصورة الأساس.
[[WORKDIR]] المجلد جوه الصورة.
[[COPY . .]] انسخ المشروع كله.
[[RUN npm install]] سطّب الحزم.
[[CMD]] الأمر اللي بيشتغل.

وده **شغّال**. الصورة بتتبني، والتطبيق بيرد. وعشان كده المشكلة بتعيش سنين: مفيش حاجة بتزعق.

والمشكلة في سطرين بالترتيب الغلط. docker بيكاش كل خطوة، وبيستخدم الكاش طول ما **المدخلات** متغيّرتش. ومدخلات [[COPY . .]] هي **كل ملفات مشروعك**. يعني أول ما تعدّل سطر في أي ملف، الطبقة دي بتتغيّر، وكل اللي بعدها بيتلغى كاشه — ومنهم [[RUN npm install]].

النتيجة: كل تعديل في سطر كود = إعادة تسطيب كل الحزم.

في المثال ده التطبيق مفيهوش dependencies، فالفرق بيبان في **الكلمة** مش في الوقت: [[CACHED]] مقابل تشغيل حقيقي. وفي مشروع حقيقي، دي الفرق بين ٣ ثواني ودقيقتين.`,
          example: R`# Dockerfile — النسخة الأولى (شغالة، وفيها فخ)
FROM node:22-slim
WORKDIR /app
COPY . .
RUN npm install --omit=dev
EXPOSE 3000
CMD ["node", "src/server.js"]`,
          lines: [
            R`الصورة الأساس. [[slim]] أصغر من العادية بكتير وفيها نفس Node.`,
            R`المجلد اللي كل الأوامر اللي بعده هتشتغل فيه. و docker بيعمله لو مش موجود.`,
            R`**هنا الفخ**: بينسخ كل حاجة، فأي تعديل في أي ملف بيلغي كاش اللي بعده.`,
            R`[[--omit=dev]] بتتخطى حزم التطوير. (الاسم القديم [[--production]].)`,
            R`توثيق بس: بتقول للي بيقرا إن التطبيق بيسمع على ٣٠٠٠. **مش بتفتح البورت** — ده [[-p]].`,
            R`الأمر اللي بيشتغل. **الشكل ده (مصفوفة) أحسن** من النص — الدرس التالت.`,
          ],
          try: R`اعمل الملفات وابني بـ [[docker build -t notes:v1 .]]. وبعدين عدّل سطر في [[src/server.js]] وابني تاني، وشوف [[RUN npm install]] اتكاشت ولا اشتغلت.`,
          flag: "script",
          mac: ["both", R`نفس الحاجة على الماك ولينكس. بس على الماك بمعالج Apple، [[node:22-slim]] بتنزّل نسخة arm64 — لو هتدفع الصورة لسيرفر amd64 محتاج [[--platform linux/amd64]].`],
          deep: {
            why: R`الصورة اللي بتتبني في دقيقتين كل مرة بتخلي docker عبء في التطوير بدل ما يكون أداة. والفرق كله في سطرين بالترتيب.`,
            how: R`كل تعليمة في الـ Dockerfile بتعمل **طبقة**: فرق عن اللي قبلها. و docker بيحسب لكل طبقة مفتاح كاش من: التعليمة نفسها، والطبقة اللي قبلها، و**محتوى الملفات** لو التعليمة [[COPY]] أو [[ADD]].

ولما مفتاح طبقة يتغيّر، كل اللي بعدها بيتلغى — حتى لو مدخلاتهم هي هي. لأن الطبقة بتتبني **فوق** اللي قبلها.

[[FROM node:22-slim]]: [[slim]] نسخة Debian من غير الأدوات الزيادة. والأحجام التقريبية: [[node:22]] حوالي ١.١ جيجا، و [[node:22-slim]] حوالي ٣٣٠ ميجا، و [[node:22-alpine]] حوالي ١٥٠ ميجا. و [[alpine]] بتستخدم [[musl]] بدل [[glibc]]، وده بيكسر حزم فيها كود native أحيانًا.

[[EXPOSE]] **مش بتفتح حاجة**. دي توثيق في metadata الصورة، وبتخلي [[-P]] (كبيرة) تختار بورت عشوائي ليها. فتح البورت بيتعمل بـ [[-p 3000:3000]] وقت التشغيل.

[[CMD]] ليها شكلين:

[[CMD ["node", "src/server.js"]]] — exec form. البرنامج بيبقى PID 1 وبياخد الإشارات.
[[CMD node src/server.js]] — shell form. بيتشغّل جوه [[/bin/sh -c]]، والـ shell بيبقى PID 1 **والإشارات متوصلش لبرنامجك**.

والتانية بتخلي [[docker stop]] تستنى ١٠ ثواني وبعدين تقتل بالعافية. استخدم الأولى دايمًا.

و [[npm install]] مقابل [[npm ci]]: [[ci]] بتسطّب من [[package-lock.json]] بالظبط وبتمسح [[node_modules]] الأول — أسرع وأدق في الـ builds. بس بتحتاج الـ lockfile موجود.`,
            when: R`أي تطبيق هتحطه في صورة. والترتيب ده تصلّحه في الدرس الجاي قبل ما تكمّل.`,
            mistakes: R`[[COPY . .]] قبل تسطيب الحزم. أو [[CMD]] بشكل نص فالإشارات متوصلش. أو تفتكر إن [[EXPOSE]] بتفتح البورت. أو تستخدم [[node:22]] الكاملة وحجم الصورة يبقى جيجا.`
          },
          teach: R`## التطبيق اللي هنحطه في صورة

~~~js src/server.js
import http from 'node:http';
const PORT = process.env.PORT || 3000;
const notes = [];
const server = http.createServer((req, res) => {
  if (req.url === '/health') { res.writeHead(200); return res.end('ok'); }
  res.writeHead(200, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ app: 'notes-api', notes: notes.length }));
});
server.listen(PORT, () => console.log('listening on ' + PORT));
~~~

مساران: [[/]] بيرد JSON، و [[/health]] بيرد [[ok]]. والتاني ده هنستخدمه في فحص الصحة (درس ٣).

---

## ١. أول Dockerfile

~~~docker Dockerfile
FROM node:22-slim
WORKDIR /app
COPY . .
RUN npm install --omit=dev
EXPOSE 3000
CMD ["node", "src/server.js"]
~~~

~~~text البناء (اتشغّل فعلًا · Docker 29.6)
sha256:8b367c1edfb24f6b4b564e2185586093090e1cb54d62f7989081a455c5b10ae0
real	0m3.712s
~~~

**وبيشتغل.** وده بالظبط سبب إن المشكلة بتعيش سنين: مفيش حاجة بتزعق.

---

## ٢. الفخ: عدّل سطر واحد

~~~bash
echo "// تعديل بسيط" >> src/server.js
docker build -t notes:v1 .
~~~

~~~text الناتج (اتشغّل فعلًا)
#6 CACHED
#7 DONE 0.1s
#8 [4/4] RUN npm install --omit=dev
#8 DONE 0.7s
~~~

**[[RUN npm install]] اشتغل تاني.** مع إن [[package.json]] متغيّرش.

---

## ٣. ليه؟

~~~text الكاش بيمشي بالترتيب
FROM node:22-slim        ──> متغيّرتش  ──> CACHED
WORKDIR /app             ──> متغيّرتش  ──> CACHED
COPY . .                 ──> الملفات اتغيّرت  ──> اتبنت من جديد
RUN npm install          ──> اللي قبلها اتغيّرت  ──> اتبنت من جديد ❌
~~~

docker بيحسب لكل طبقة مفتاح من: التعليمة، والطبقة اللي قبلها، و**محتوى الملفات** لو [[COPY]].

ولما مفتاح يتغيّر، **كل اللي بعده بيتلغى** — حتى لو مدخلاته هي هي. لأن الطبقة بتتبني فوق اللي قبلها.

و [[COPY . .]] مدخلاتها **كل ملفات مشروعك**.

> في المثال ده مفيش dependencies، فالفرق بيبان في الكلمة مش في الوقت. في مشروع حقيقي: ٣ ثواني مقابل دقيقتين.

---

## ٤. حاجتين في الملف تستاهلوا وقفة

### [[EXPOSE]] مش بتفتح البورت

دي **توثيق** في metadata الصورة. الفتح بيحصل وقت التشغيل:

~~~bash
docker run -p 3000:3000 notes:v1
~~~

### [[CMD]] ليها شكلين، وواحد منهم غلط

~~~docker صح — exec form
CMD ["node", "src/server.js"]
~~~

~~~docker غلط — shell form
CMD node src/server.js
~~~

| | PID 1 | الإشارات |
|---|---|---|
| exec form | **برنامجك** | بتوصله |
| shell form | [[/bin/sh]] | **متوصلهوش** |

ومع الشكل التاني، [[docker stop]] بتستنى ١٠ ثواني وبعدين تقتل بالعافية — لأن تطبيقك مشافش [[SIGTERM]] أصلًا.

---

## ٥. وأي صورة أساس؟

| الصورة | الحجم تقريبًا | ملاحظة |
|---|---|---|
| [[node:22]] | ~1.1 GB | فيها أدوات بناء كتير |
| [[node:22-slim]] | **~330 MB** | Debian من غير الزيادة |
| [[node:22-alpine]] | ~150 MB | [[musl]] مش [[glibc]] — بتكسر حزم native |

[[slim]] هي البداية المعقولة.

---

## الخلاصة

- أول Dockerfile بيشتغل — وده اللي بيخلي مشكلته تعيش.
- [[COPY . .]] قبل تسطيب الحزم بتلغي الكاش مع أي تعديل.
- الكاش بيمشي بالترتيب: طبقة بتتغيّر = كل اللي بعدها بيتلغى.
- [[EXPOSE]] توثيق، مش فتح بورت.
- [[CMD]] بالمصفوفة دايمًا، عشان الإشارات.`,
          sol: R`الدليل على الفخ: تعديل سطر في الكود، و [[npm install]] اشتغلت تاني.`,
          solCode: R`echo "// تعديل بسيط في الكود" >> src/server.js
docker build -t notes:v1 .

# الناتج (اتشغّل فعلًا على Docker 29.6.1):
# #6 CACHED
# #7 DONE 0.1s
# #8 [4/4] RUN npm install --omit=dev
# #8 DONE 0.7s
#
# RUN npm install اشتغلت من جديد، مع إن package.json متغيّرش.
# السبب: COPY . . قبلها، ومدخلاتها كل ملفات المشروع.`
        },

        {
          cmd: "مشروع — الطبقات و .dockerignore",
          title: "68 ميجا لـ 90 بايت، و npm install بقت CACHED",
          learn: R`ترتّب الطبقات فالكاش يشتغل، وتمنع الملفات اللي ملهاش لزمة من الوصول لـ docker أصلًا.`,
          out: R`إعادة البناء بعد تعديل كود مبتعيدش تسطيب الحزم، وسياق البناء بقى ٩٠ بايت.`,
          use: {
            prog: R`اللي بيتغيّر نادرًا فوق، واللي بيتغيّر كتير تحت. نفس القاعدة في أي نظام كاش.`,
            net: R`سياق البناء بيتبعت للـ daemon عبر الشبكة لو بتبني على سيرفر بعيد. و ٦٨ ميجا كل مرة فرق حقيقي.`,
            work: R`الـ [[.dockerignore]] بيمنع كمان إن [[.env]] يدخل الصورة بالغلط — ودي مشكلة أمنية مش بطء.`,
          },
          desc: R`الإصلاح سطرين، وبيحلوا مشكلتين مختلفتين.

**الأولى: رتّب الطبقات.** انسخ [[package*.json]] بس، سطّب، وبعدين انسخ باقي الكود:

[[COPY package*.json ./]]
[[RUN npm install --omit=dev]]
[[COPY . .]]

دلوقتي، تعديل في الكود بيلغي كاش [[COPY . .]] بس — اللي تحتها مفيش حاجة غالية. و [[npm install]] بتفضل [[CACHED]] طول ما [[package.json]] متغيّرش.

**التانية: [[.dockerignore]].** قبل ما docker يبدأ البناء، بيبعت **سياق البناء** كله للـ daemon — يعني كل الفولدر. ولو فيه [[node_modules]] و [[.git]]، ده بيبقى عشرات الميجات كل مرة.

و [[.dockerignore]] بيشتغل زي [[.gitignore]] بالظبط: بيقول «الملفات دي متتبعتش خالص».

والفرق اللي قسته: الفولدر فيه ٦٦ ميجا ([[node_modules]] و [[.git]] كبار). من غير [[.dockerignore]] السياق كان **68.17MB** وخد ٤ ثواني. وبعده بقى **90B**.

وفيه سبب تاني أهم من السرعة: [[.env]]. لو مش في [[.dockerignore]]، [[COPY . .]] بتحطه **جوه الصورة** — وأي حد عنده الصورة يقدر يقراه.`,
          example: R`# Dockerfile — الترتيب المظبوط
FROM node:22-slim
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
EXPOSE 3000
CMD ["node", "src/server.js"]`,
          lines: [
            R`الصورة الأساس.`,
            R`المجلد.`,
            R`**الأول**: ملفات الحزم بس. دي بتتغيّر نادرًا.`,
            R`التسطيب. بيفضل [[CACHED]] طول ما الملف اللي فوق متغيّرش.`,
            R`**وبعدين** الكود. تعديله بيلغي الطبقة دي بس.`,
            R`توثيق البورت.`,
            R`الأمر.`,
          ],
          try: R`غيّر الترتيب، ابني، عدّل سطر في الكود، وابني تاني — وشوف [[RUN npm install]] بقت [[CACHED]]. وبعدين اعمل [[.dockerignore]] وقارن سطر [[transferring context]] قبل وبعد.`,
          flag: "script",
          mac: ["both", R`نفس الحاجة. و [[.dockerignore]] نفس الصيغة.`],
          deep: {
            why: R`الوقت اللي بيضيع في إعادة تسطيب الحزم بيتكرر عشرات المرات في اليوم. والملف اللي بيدخل الصورة بالغلط ممكن يبقى سر.`,
            how: R`**سياق البناء** هو المجلد اللي بتديه لـ [[docker build]] (النقطة في [[docker build .]]). و docker CLI بيضغطه ويبعته للـ daemon **قبل** ما البناء يبدأ. وده بيحصل حتى لو الـ Dockerfile مش بينسخ حاجة.

[[.dockerignore]] بيتقري قبل الإرسال، فالملفات المستبعدة **مش بتتبعت أصلًا**.

وصيغته زي [[.gitignore]] تقريبًا، مع فروق: [[!]] للاستثناء شغالة، و [[**]] شغالة، والمسارات نسبية لجذر السياق.

~~~text .dockerignore معقول
node_modules
.git
*.log
.env
.env.*
Dockerfile
.dockerignore
coverage
dist
~~~

> و [[Dockerfile]] نفسه في القايمة: مش محتاج يبقى جوه الصورة.

**وعن [[COPY package*.json ./]]**: النجمة بتاخد [[package.json]] و [[package-lock.json]] سوا. ولو كتبت الاتنين صريح وواحد مش موجود، [[COPY]] بتفشل.

**وعن [[npm ci]]**: لو عندك [[package-lock.json]]، [[npm ci]] أحسن من [[install]] في الصور: بتمسح [[node_modules]] الأول، وبتسطّب النسخ المكتوبة بالظبط، وأسرع. بس بتفشل لو الـ lockfile مش متطابق مع [[package.json]] — وده في الحقيقة **ميزة**.

**وفيه مستوى تاني من الكاش**: [[RUN --mount=type=cache,target=/root/.npm npm ci]] بتخلي كاش npm نفسه يفضل بين الـ builds. ودي محتاجة BuildKit (الافتراضي من Docker 23).`,
            when: R`في كل Dockerfile. والـ [[.dockerignore]] من أول يوم.`,
            mistakes: R`تنسى [[.dockerignore]] فتبعت [[node_modules]] كل مرة. أو تنساه فـ [[.env]] يدخل الصورة. أو تحط [[COPY . .]] قبل التسطيب. أو تنسخ [[package.json]] بس من غير الـ lockfile فـ [[npm ci]] تفشل.`
          },
          teach: R`## سطرين، ومشكلتين مختلفتين

---

## ١. رتّب الطبقات

~~~docker قبل
COPY . .
RUN npm install --omit=dev
~~~

~~~docker بعد
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
~~~

~~~text وبعد تعديل سطر في الكود (اتشغّل فعلًا · Docker 29.6)
#6 [2/5] WORKDIR /app
#6 CACHED
#7 [3/5] COPY package*.json ./
#7 CACHED
#8 [4/5] RUN npm install --omit=dev
#8 CACHED                             <-- اتكاشت
#9 [5/5] COPY . .
~~~

**[[RUN npm install]] بقت [[CACHED]].**

القاعدة: **اللي بيتغيّر نادرًا فوق، واللي بيتغيّر كتير تحت.**

> النجمة في [[package*.json]] بتاخد [[package.json]] و [[package-lock.json]] سوا. ولو كتبتهم صريح وواحد مش موجود، [[COPY]] بتفشل.

---

## ٢. سياق البناء: الرقم اللي هيفاجئك

النقطة في [[docker build .]] هي **سياق البناء**. و docker بيضغط المجلد كله ويبعته للـ daemon **قبل** ما البناء يبدأ — حتى لو الـ Dockerfile مش بينسخ منه حاجة.

حطيت [[node_modules]] و [[.git]] بحجم ٦٦ ميجا وقست:

~~~text من غير .dockerignore (اتشغّل فعلًا)
#4 transferring context: 68.17MB 4.1s done
~~~

~~~text مع .dockerignore (اتشغّل فعلًا)
#4 transferring context: 90B done
~~~

**68.17 ميجا → 90 بايت.** وأربع ثواني → صفر.

---

## ٣. [[.dockerignore]]

~~~text .dockerignore
node_modules
.git
*.log
.env
.env.*
Dockerfile
.dockerignore
coverage
dist
~~~

الصيغة زي [[.gitignore]]: [[!]] للاستثناء، و [[**]] شغالة، والمسارات من جذر السياق.

> و [[Dockerfile]] نفسه في القايمة — مش محتاج يبقى جوه الصورة.

---

## ٤. والسبب الأهم من السرعة

~~~text من غير .dockerignore
COPY . .   ──>  .env دخل الصورة
~~~

وأي حد عنده الصورة يقدر يقراه:

~~~bash
docker run --rm صورتك cat .env
~~~

ده **مش بطء، ده تسريب**. و [[.dockerignore]] بيقفله.

---

## ٥. و [[npm ci]] بدل [[npm install]]

| | بتعمل إيه |
|---|---|
| [[npm install]] | تسطّب وتحدّث الـ lockfile لو احتاجت |
| [[npm ci]] | **تمسح [[node_modules]]** وتسطّب من الـ lockfile بالظبط |

[[ci]] أسرع وأدق في الصور. وبتفشل لو الـ lockfile مش متطابق مع [[package.json]] — وده **ميزة** مش عيب: بيكشف إنك نسيت تعمل commit للـ lockfile.

---

## ٦. ومستوى كاش تاني

~~~docker BuildKit
RUN --mount=type=cache,target=/root/.npm npm ci --omit=dev
~~~

دي بتخلي **كاش npm نفسه** يفضل بين الـ builds. فحتى لما [[package.json]] يتغيّر، التحميل بيبقى أسرع.

BuildKit هو الافتراضي من Docker 23، فدي شغالة عندك على الأغلب.

---

## الخلاصة

- اللي بيتغيّر نادرًا فوق.
- [[COPY package*.json]] ثم [[RUN]] ثم [[COPY . .]].
- [[.dockerignore]] من أول يوم: ٦٨ ميجا → ٩٠ بايت.
- وبيمنع [[.env]] من دخول الصورة — ودي الأهم.
- [[npm ci]] لو عندك lockfile.`,
          sol: R`الرقمين اللي بيلخّصوا الدرس: الكاش بعد الترتيب، والسياق قبل وبعد [[.dockerignore]].`,
          solCode: R`# بعد ترتيب الطبقات، وتعديل سطر في الكود:
# #8 [4/5] RUN npm install --omit=dev
# #8 CACHED                             <-- كانت بتشتغل كل مرة

# وسياق البناء (الفولدر فيه 66 ميجا):
# من غير .dockerignore:  transferring context: 68.17MB 4.1s done
# مع .dockerignore:      transferring context: 90B done

# (اتقاسوا فعلًا على Docker 29.6.1)`
        },

        {
          cmd: "مشروع — multi-stage و USER و HEALTHCHECK",
          title: "مرحلتين، ومستخدم مش root، وصورة بتقول عن نفسها",
          learn: R`تفصل مرحلة البناء عن مرحلة التشغيل، وتشغّل بمستخدم عادي، وتضيف فحص صحة.`,
          out: R`صورة فيها اللي بيشتغل بس، وبتقول [[healthy]] لوحدها.`,
          use: {
            prog: R`[[multi-stage]] بيخليك تستخدم أدوات بناء تقيلة (مترجمات، bundlers) من غير ما تدخل الصورة النهائية.`,
            net: R`الكونتينر اللي بيشتغل root معناه إن أي ثغرة في تطبيقك بتبقى root جوه الكونتينر — وده أول خطوة في أي هروب منه.`,
            cs: R`الـ [[HEALTHCHECK]] بيحوّل «العملية شغالة» لـ «التطبيق بيرد». والفرق بينهم هو الفرق بين مراقبة بتنفع وبتاعة بتكدب.`,
          },
          desc: R`تلات إضافات، كل واحدة بتحل مشكلة مختلفة.

**[[multi-stage]]: مرحلتين في ملف واحد.** بتكتب [[FROM ... AS build]] تعمل فيها كل الشغل التقيل (تسطيب كل الحزم، ترجمة TypeScript، bundling)، وبعدين [[FROM ... AS runtime]] تانية بتنسخ منها **الناتج بس** بـ [[COPY --from=build]].

الفايدة إن أدوات البناء مش بتدخل الصورة النهائية.

**وبصراحة:** في المشروع ده التطبيق مفيهوش dependencies ولا خطوة بناء، فالحجم طلع **٣٢٩ ميجا في الحالتين** — نفس حجم الصورة الأساس. الفايدة بتبان لما يبقى عندك [[typescript]] و [[esbuild]] و [[node_modules]] كاملة في مرحلة البناء.

**[[USER node]]: متشتغلش root.** صور Node الرسمية فيها مستخدم اسمه [[node]] جاهز. سطر واحد، وأي ثغرة في تطبيقك بتبقى بصلاحيات مستخدم عادي.

**[[HEALTHCHECK]]: الصورة بتقول عن نفسها.** docker بينفّذ الأمر ده كل فترة، ولو نجح الكونتينر بيبقى [[healthy]]. وده بيفرّق بين «العملية شغالة» و«التطبيق بيرد» — وبيخلي [[depends_on]] في compose تستنى الخدمة تبقى جاهزة فعلًا.`,
          example: R`# ---------- مرحلة البناء ----------
FROM node:22-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# ---------- مرحلة التشغيل ----------
FROM node:22-slim AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force
COPY --from=build /app/src ./src
USER node
EXPOSE 3000
HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 CMD node -e "fetch('http://127.0.0.1:3000/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "src/server.js"]`,
          lines: [
            R`مرحلة اسمها [[build]]. الاسم ده هنشاور عليه تحت.`,
            R`المجلد.`,
            R`ملفات الحزم.`,
            R`**كل** الحزم هنا، بما فيها أدوات التطوير — دي مرحلة البناء.`,
            R`الكود. وهنا كانت هتتعمل الترجمة لو فيه.`,
            R`مرحلة تانية، وهي اللي هتطلع كصورة في الآخر.`,
            R`[[NODE_ENV]] بتأثر على سلوك مكتبات كتير.`,
            R`المجلد.`,
            R`ملفات الحزم تاني — المرحلة دي مستقلة تمامًا.`,
            R`الحزم اللي بتشتغل بس، وتنضيف الكاش في **نفس الطبقة** (في طبقة تانية مش هيفرق في الحجم).`,
            R`**دي الحتة**: خد من مرحلة البناء الناتج بس.`,
            R`المستخدم اللي الصورة بتشتغل بيه. موجود جاهز في صور Node الرسمية.`,
            R`توثيق البورت.`,
            R`فحص الصحة. و [[--start-period]] بتدي التطبيق مهلة يقوم فيها من غير ما الفشل يتحسب.`,
            R`الأمر.`,
          ],
          try: R`ابني الصورة وشغّلها، وبعدين [[docker run --rm <الصورة> id]] للتأكد إنها مش root. وبعدين استنى ١٥ ثانية و [[docker ps]] وشوف [[(healthy)]]. وبعدين خلي [[/health]] يرجّع ٥٠٠ وشوف الحالة بتبقى إيه.`,
          flag: "script",
          mac: ["both", R`نفس الحاجة. والمستخدم [[node]] موجود في صور Node الرسمية على كل المعماريات.`],
          deep: {
            why: R`أدوات البناء في الصورة النهائية = حجم زيادة وسطح هجوم زيادة. و root جوه الكونتينر = أي ثغرة بتبقى أخطر. والصورة اللي مش بتقول عن نفسها بتخلي المراقبة تكدب.`,
            how: R`**multi-stage**: كل [[FROM]] بتبدأ مرحلة جديدة من الصفر. و [[COPY --from=<اسم>]] بتنسخ من مرحلة سابقة. والصورة النهائية هي **آخر مرحلة** بس — الباقي بيتمسح.

وتقدر تبني مرحلة بعينها: [[docker build --target build -t app:dev .]]. مفيدة لصورة تطوير فيها الأدوات.

**[[USER]]**: بتأثر على كل [[RUN]] و [[CMD]] بعدها. فحطها **بعد** التسطيب، وإلا [[npm install]] هتفشل في الكتابة.

ولو محتاج تعمل مستخدم بنفسك:

~~~text
RUN useradd -m -u 1001 app
USER app
~~~

والرقم مهم لو بتستخدم volumes: ملفات الـ volume بتبقى مملوكة لـ UID معيّن على المضيف.

**[[HEALTHCHECK]]** وخياراته:

| الخيار | معناه |
|---|---|
| [[--interval]] | كل قد إيه |
| [[--timeout]] | أقصى وقت للفحص |
| [[--start-period]] | مهلة البداية — الفشل فيها **مبيتحسبش** |
| [[--retries]] | كام فشل ورا بعض قبل [[unhealthy]] |

والحالات تلاتة: [[starting]] و [[healthy]] و [[unhealthy]].

ومهم: **docker مش بيعمل حاجة لما الكونتينر يبقى [[unhealthy]]**. مش بيعيد تشغيله ولا بيوقّفه. اللي بيستفيد من الحالة دي هو compose (في [[depends_on]]) أو Swarm أو أداة المراقبة بتاعتك.

والفحص بـ [[node -e "fetch(...)"]] شغال لأن [[fetch]] موجودة في Node 18+. والبديل الشائع [[curl]] أو [[wget]] — بس [[slim]] مفيهاش [[curl]]، فهتحتاج تسطّبه (وتزوّد الحجم).

وفي compose تقدر تكتب الـ healthcheck في الملف بدل الصورة — وده أمرن لما نفس الصورة بتشتغل بإعدادات مختلفة.`,
            when: R`أي صورة رايحة لسيرفر. و [[USER]] في كل صورة، من غير استثناء.`,
            mistakes: R`تحط [[USER]] قبل [[RUN npm install]] فالتسطيب يفشل. أو تنسى [[--start-period]] فالتطبيق البطيء في القيام يبان [[unhealthy]]. أو تتوقّع إن docker هيعيد تشغيل الكونتينر لما يبقى [[unhealthy]] — مش بيعمل كده. أو تنسخ [[node_modules]] من مرحلة البناء وفيها حزم التطوير.`
          },
          teach: R`## تلات إضافات، تلات مشاكل

---

## ١. multi-stage: مرحلتين في ملف واحد

~~~docker
FROM node:22-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install              # كل الحزم، بما فيها أدوات التطوير
COPY . .
# هنا كانت هتتعمل: tsc، أو esbuild، أو أي بناء

FROM node:22-slim AS runtime
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev   # اللي بيشتغل بس
COPY --from=build /app/src ./src
~~~

كل [[FROM]] بتبدأ مرحلة من الصفر. و [[COPY --from=build]] بتنسخ من مرحلة سابقة. والصورة النهائية هي **آخر مرحلة بس**.

### وبصراحة: الحجم هنا متغيّرش

~~~text اتقاس فعلًا (اتشغّل فعلًا)
notes:v3      329MB
notes:v2      329MB
notes:v1      329MB
node:22-slim  329MB
~~~

التطبيق ده **مفيهوش dependencies ولا خطوة بناء**، فمفيش حاجة تتشال.

الفايدة بتبان لما يبقى عندك [[typescript]] و [[esbuild]] و [[node_modules]] كاملة في مرحلة البناء — ساعتها الفرق بيبقى مئات الميجات.

> وتقدر تبني مرحلة بعينها: [[docker build --target build -t app:dev .]] — مفيدة لصورة تطوير فيها الأدوات.

---

## ٢. [[USER node]]: سطر واحد

~~~docker
USER node
~~~

~~~text اتشغّل فعلًا
$ docker run --rm notes:v3 id
uid=1000(node) gid=1000(node) groups=1000(node)
~~~

صور Node الرسمية فيها مستخدم [[node]] جاهز. ولو محتاج تعمل واحد:

~~~docker
RUN useradd -m -u 1001 app
USER app
~~~

> **حطها بعد التسطيب.** لو قبله، [[npm install]] هتفشل في الكتابة.

---

## ٣. [[HEALTHCHECK]]: الصورة بتقول عن نفسها

~~~docker
HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
~~~

~~~text اتشغّل فعلًا
$ docker ps --filter name=notes-test --format '{{.Names}}  {{.Status}}'
notes-test  Up 24 seconds (healthy)

$ docker inspect notes-test --format '{{.State.Health.Status}} | فحوصات: {{len .State.Health.Log}}'
healthy | فحوصات: 2
~~~

| الخيار | معناه |
|---|---|
| [[--interval]] | كل قد إيه |
| [[--timeout]] | أقصى وقت للفحص |
| [[--start-period]] | مهلة البداية — **الفشل فيها مبيتحسبش** |
| [[--retries]] | كام فشل ورا بعض قبل [[unhealthy]] |

والحالات تلاتة: [[starting]] ← [[healthy]] أو [[unhealthy]].

### وحاجة مهمة

**docker مش بيعمل حاجة لما الكونتينر يبقى [[unhealthy]].** مش بيعيد تشغيله ولا بيوقّفه.

اللي بيستفيد من الحالة دي: compose (في [[depends_on: condition: service_healthy]])، أو Swarm، أو أداة المراقبة بتاعتك.

> استخدمت [[node -e "fetch(...)"]] لأن [[fetch]] موجودة في Node 18+. البديل الشائع [[curl]] — بس [[slim]] مفيهاش [[curl]]، فهتسطّبه وتزوّد الحجم.

---

## ٤. والتطبيق شغّال

~~~text اتشغّل فعلًا
$ curl -s http://127.0.0.1:3099/
{"app":"notes-api","notes":0}

$ curl -s http://127.0.0.1:3099/health
ok
~~~

---

## الخلاصة

- [[COPY --from=<مرحلة>]] بتاخد الناتج بس.
- والفايدة بتبان لما يبقى فيه أدوات بناء فعلًا — في المشروع ده الحجم متغيّرش.
- [[USER]] **بعد** التسطيب، وفي كل صورة.
- [[--start-period]] عشان البداية البطيئة متتحسبش فشل.
- docker **مش** بيتصرّف مع [[unhealthy]] — ده لـ compose والمراقبة.`,
          sol: R`الأرقام والنتايج الحقيقية: الحجم متغيّرش (وليه)، والمستخدم بقى [[node]]، والحالة [[healthy]].`,
          solCode: R`docker image ls --format '{{.Repository}}:{{.Tag}}  {{.Size}}'
# notes:v3  329MB
# notes:v2  329MB
# notes:v1  329MB
# node:22-slim  329MB
# (التطبيق مفيهوش dependencies ولا بناء، فمفيش حاجة تتشال)

docker run --rm notes:v3 id
# uid=1000(node) gid=1000(node) groups=1000(node)

docker ps --format '{{.Names}}  {{.Status}}'
# notes-test  Up 24 seconds (healthy)

curl -s http://127.0.0.1:3099/
# {"app":"notes-api","notes":0}

# (اتشغّلوا فعلًا على Docker 29.6.1)`
        },

        {
          cmd: "مشروع — compose والمعاينة",
          title: "الملف، و config، و --dry-run، وبعدين up",
          learn: R`تعرّف الخدمة في [[compose.yaml]]، وتشوف الملف بعد المعالجة، وتجرّب من غير تشغيل.`,
          out: R`أمر واحد ([[docker compose up -d]]) بيشغّل كل حاجة، ومعاينة قبله.`,
          use: {
            prog: R`compose بيحوّل سطر [[docker run]] الطويل لملف متقري ومتحفوظ في git. وده الفرق بين «أمر في تاريخ الشيل» و «إعداد في المشروع».`,
            net: R`[[depends_on]] بـ [[condition: service_healthy]] هي اللي بتخلي التطبيق يستنى قاعدة البيانات تبقى جاهزة فعلًا، مش بس شغالة.`,
            work: R`الزميل الجديد بيعمل [[git clone]] و [[docker compose up]] وخلاص. من غير ما يسطّب Node ولا Postgres ولا يفهم حاجة.`,
          },
          desc: R`الصورة جاهزة. ناقص نشغّلها بشكل متحفوظ.

[[docker run]] بياخد الخيارات كلها في سطر: [[-p]] و [[-e]] و [[--restart]] و [[--name]]. والسطر ده بيعيش في تاريخ الشيل بتاعك، ولو نسيته بتعمله تاني غلط.

[[compose.yaml]] هو نفس المعلومات، بس في ملف في المشروع، في git، وأي حد يقدر يقراه.

والملف بسيط: [[services]] وتحتها كل خدمة باسمها، وجوه كل واحدة:

[[build]] أو [[image]] — من فين تيجي.
[[ports]] — [[«بره:جوه»]].
[[environment]] — المتغيرات.
[[restart]] — يعمل إيه لو وقع.
[[healthcheck]] — تقدر تكتبه هنا بدل الصورة، وده أمرن.

وقبل [[up]]، أمرين:

[[docker compose config]] بيطبع الملف **بعد المعالجة**: المتغيرات مفكوكة والقيم الافتراضية متحطة. ودي اللي بتكشف أخطاء الإعدادات.

[[docker compose --dry-run up -d]] بيطبع الخطوات من غير ما ينفّذ.

وبعدهم [[docker compose up -d]]، و [[docker compose down]] للتنضيف.`,
          example: R`services:
  api:
    build: .
    image: notes:v3
    ports:
      - "3099:3000"
    environment:
      PORT: 3000
      NODE_ENV: production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "node", "-e", "fetch('http://127.0.0.1:3000/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"]
      interval: 10s
      timeout: 3s
      retries: 3`,
          lines: [
            R`كل الخدمات تحت المفتاح ده.`,
            R`اسم الخدمة. وهو كمان اسم المضيف اللي الخدمات التانية بتوصله بيه.`,
            R`ابني من الـ Dockerfile في المجلد ده. (البديل [[image:]] لو جاهزة.)`,
            R`الاسم اللي الصورة المبنية هتاخده.`,
            R`البورتات.`,
            R`[[«بره:جوه»]]. و **حطها بين علامات تنصيص** — من غيرها YAML بيفسّر [[22:22]] كوقت.`,
            R`المتغيرات.`,
            R`البورت اللي التطبيق هيسمع عليه.`,
            R`بيأثر على سلوك مكتبات كتير.`,
            R`يرجع لو وقع، **إلا** لو انت اللي وقّفته.`,
            R`فحص الصحة — هنا بدل الصورة، وده أمرن.`,
            R`[[["CMD", ...]]] بتشغّل الأمر مباشرة. و [[CMD-SHELL]] بتشغّله في shell.`,
            R`كل قد إيه.`,
            R`أقصى وقت للفحص.`,
            R`كام محاولة قبل [[unhealthy]].`,
          ],
          try: R`اعمل الملف، وشغّل [[docker compose config]] واقرا القيم. وبعدين [[--dry-run up -d]] وبعدها [[docker compose ps -a]] للتأكد إن مفيش حاجة اتعملت. وبعدين [[up -d]] بجد و [[down]].`,
          flag: "script",
          mac: ["both", R`نفس الحاجة. و [[docker compose]] جاية مع Docker Desktop على الماك وويندوز، وعلى لينكس بتتسطّب كـ plugin.`],
          deep: {
            why: R`الأمر الطويل بينسى وبيتكتب غلط. والملف بيتقرا وبيتراجع في PR وبيتحفظ مع المشروع.`,
            how: R`اسم الملف: [[compose.yaml]] هو الاسم الحديث المفضّل. و [[docker-compose.yml]] لسه شغال. وبيدوّر عليهم بالترتيب ده.

**المفتاح [[version:]] اتشال.** لو شفته في أمثلة قديمة، متكتبهوش — compose الحديث بيطلّع تحذير.

**اسم الخدمة = اسم المضيف.** لو عندك خدمة اسمها [[db]]، التطبيق بيوصلها على [[db:5432]]. compose بيعمل شبكة للمشروع وبيحط الأسماء فيها.

**[[ports]] بين علامات تنصيص**: من غيرها، YAML بيقرا [[22:22]] كـ sexagesimal (وقت) ويحوّلها لـ [[1342]]. الفخ ده حقيقي وبيحصل مع البورتات اللي أقل من ٦٠.

**[[depends_on]]** ليها شكلين:

~~~text الشكل القديم: بيستنى الكونتينر يقوم بس
depends_on:
  - db

الشكل اللي بينفع: بيستنى الصحة
depends_on:
  db:
    condition: service_healthy
~~~

والتاني محتاج [[healthcheck]] على [[db]] — وهنا بتبان فايدة الدرس اللي فات.

**[[restart]]** ليها أربع قيم: [[no]] و [[always]] و [[on-failure]] و [[unless-stopped]]. والأخيرة أحسنها عادة: بترجّع بعد إعادة تشغيل الجهاز، بس مبترجّعش لو انت وقّفته بإيدك.

**و [[.env]]**: compose بيقراه تلقائيًا من مجلد المشروع، والمتغيرات بتبقى متاحة في الملف بـ [[$__{VAR}]]. **وده غير** [[env_file:]] اللي بتحط المتغيرات **جوه الكونتينر**. الفرق ده بيلخبط الناس كتير.

والأوامر اللي هتستخدمها: [[up -d]] و [[down]] و [[logs -f]] و [[ps]] و [[exec <خدمة> sh]] و [[restart <خدمة>]].

و [[down -v]] بتمسح الفوليومات كمان — **خد بالك**، دي بتمسح بيانات قاعدة البيانات.`,
            when: R`أي مشروع فيه أكتر من كونتينر، أو كونتينر واحد بخيارات أكتر من سطرين.`,
            mistakes: R`تنسى علامات التنصيص حوالين البورتات. أو تستخدم [[depends_on]] البسيطة وتتوقّع إنها تستنى الخدمة تجهز. أو تخلط بين [[.env]] و [[env_file]]. أو تعمل [[down -v]] على بيئة فيها بيانات.`
          },
          teach: R`## من سطر طويل لملف

~~~bash الأمر
docker run -d --name api -p 3099:3000 -e PORT=3000 -e NODE_ENV=production --restart unless-stopped notes:v3
~~~

~~~yaml الملف
services:
  api:
    image: notes:v3
    ports: ["3099:3000"]
    environment:
      PORT: 3000
      NODE_ENV: production
    restart: unless-stopped
~~~

نفس المعلومات. بس التاني في git، وأي حد يقدر يقراه.

---

## ١. تلات فخاخ في الملف نفسه

### البورتات بين علامات تنصيص

~~~yaml خطر
ports:
  - 22:22
~~~

YAML بيقرا [[22:22]] كـ **وقت** ويحوّلها لرقم تاني. حطها [["22:22"]] دايمًا.

### [[version:]] اتشال

لو شفته في أمثلة قديمة متكتبهوش — compose الحديث بيطلّع تحذير.

### [[.env]] غير [[env_file]]

| | بيعمل إيه |
|---|---|
| [[.env]] في المجلد | متغيرات **للملف نفسه** ([[$__{VAR}]]) |
| [[env_file:]] | متغيرات **جوه الكونتينر** |

الفرق ده بيلخبط الناس كتير.

---

## ٢. [[compose config]]: شوف الملف بعد المعالجة

~~~text الناتج (اتشغّل فعلًا · Compose v5.3)
name: dlab
services:
  api:
    build:
      context: C:\Users\...\dlab
      dockerfile: Dockerfile
    environment:
      NODE_ENV: production
      PORT: "3000"
    healthcheck:
      test:
        - CMD
        - node
        - -e
        - fetch('http://127.0.0.1:3000/health')...
      timeout: 3s
      interval: 10s
      retries: 3
~~~

**[[PORT: "3000"]]** — اتحوّلت لنص. و [[name: dlab]] جه من اسم المجلد. ودي حاجات مش شايفها لما تقرا الملف بعينك.

---

## ٣. [[--dry-run]] قبل [[up]]

~~~text اتشغّل فعلًا
$ docker compose --dry-run up -d
 Network dlab_default Creating
 Network dlab_default Created
 Container dlab-api-1 Creating
 Container dlab-api-1 Created
 Container dlab-api-1 Starting
 Container dlab-api-1 Started

$ docker compose ps -a
NAME      IMAGE     COMMAND   SERVICE   CREATED   STATUS    PORTS
(فاضي)

$ docker network ls --filter name=dlab | wc -l
0
~~~

---

## ٤. وبعدين بجد

~~~text اتشغّل فعلًا
$ docker compose up -d
 Container dlab-api-1 Started

$ docker compose ps --format '{{.Service}}  {{.Status}}'
api  Up 12 seconds (healthy)

$ curl -s http://127.0.0.1:3099/
{"app":"notes-api","notes":0}

$ docker compose down -v
 Network dlab_default Removing
 Network dlab_default Removed
~~~

> **[[down -v]] بتمسح الفوليومات كمان.** هنا مفيش بيانات، بس على بيئة فيها قاعدة بيانات دي بتمسحها.

---

## ٥. اسم الخدمة = اسم المضيف

~~~yaml
services:
  api:
    environment:
      DB_HOST: db          # <-- اسم الخدمة
  db:
    image: postgres:16
~~~

compose بيعمل شبكة للمشروع وبيحط أسماء الخدمات فيها. فالتطبيق بيوصل قاعدة البيانات على [[db:5432]].

---

## ٦. [[depends_on]]: شكلين، وواحد منهم مش بيعمل اللي تتوقعه

~~~yaml بيستنى الكونتينر يقوم بس
depends_on:
  - db
~~~

~~~yaml بيستنى الخدمة تبقى جاهزة
depends_on:
  db:
    condition: service_healthy
~~~

الأول بيشغّل [[db]] الأول وخلاص — والتطبيق ممكن يحاول يتصل وقاعدة البيانات لسه بتقوم.

والتاني محتاج [[healthcheck]] على [[db]]. **وهنا بتبان فايدة الدرس اللي فات.**

---

## الخلاصة

- الملف بدل السطر الطويل، وفي git.
- البورتات بين علامات تنصيص.
- [[config]] قبل أي تعديل، و [[--dry-run]] قبل أي [[up]].
- اسم الخدمة = اسم المضيف.
- [[depends_on]] بـ [[service_healthy]]، مش القايمة البسيطة.
- [[down -v]] بتمسح البيانات.`,
          sol: R`الدورة كاملة: المعاينة، والدليل إنها مغيّرتش حاجة، والتشغيل الحقيقي، والتنضيف.`,
          solCode: R`docker compose --dry-run up -d
#  Network dlab_default Created
#  Container dlab-api-1 Started

docker compose ps -a
# (فاضي — مفيش حاجة اتعملت)

docker compose up -d
docker compose ps --format '{{.Service}}  {{.Status}}'
# api  Up 12 seconds (healthy)

curl -s http://127.0.0.1:3099/
# {"app":"notes-api","notes":0}

docker compose down -v
#  Network dlab_default Removed

# (اتشغّلوا فعلًا على Docker Compose v5.3.0)`
        }
      ]
    }
]);
