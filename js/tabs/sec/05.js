// تكملة تاب sec: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/sec/01.js (شرح حقول الدرس في أوله)
MORE("sec", [
    {
      t: "أسرار وبورتات على السيرفر",
      l: 3,
      n: "اللي بيتسرّب من غير ما تاخد بالك: build args، و .env في Git، وبورتات Docker، والباك أب",
      items: [
        {
          cmd: "أسرار في build args",
          title: "السر اللي اتبعت وقت البناء بيفضل جوه الـ image",
          desc: "أي قيمة بتبعتها بـ [[--build-arg]] وبيستخدمها [[RUN]] بتتسجل في تاريخ الـ image، وأي حد معاه الـ image يقراها بـ [[docker history]]. متغيرات [[NEXT_PUBLIC_]] و [[VITE_]] عادي، لأنها أصلًا بتتحط في ملفات JavaScript اللي بتروح للمتصفح. أسرار السيرفر مكانها وقت التشغيل بس. ولو محتاج سر وقت البناء (توكن npm خاص)، استخدم [[--secret]].",
          example: R`docker history --no-trunc myapp:latest | grep -iE "key|secret|password|token"
docker image inspect myapp:latest --format '{{json .Config.Env}}'
docker build --build-arg NEXT_PUBLIC_API_URL=https://api.example.com -t myapp .
docker build --secret id=npmrc,src=$HOME/.npmrc -t myapp .
# وجوه الـ Dockerfile:
# RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm ci`,
          try: "ابني image تجربة فيها [[ARG TOKEN]] و [[RUN echo done]] بعده، بـ [[--build-arg TOKEN=abc123]]، وبعدين [[docker history --no-trunc]]: هتلاقي abc123.",
          deep: {
            why: "الـ image بتتنقل: على registry، أو لجهاز تاني، أو لزميل. لو فيها مفتاح بوابة الدفع أو باسورد قاعدة البيانات، كل اللي يوصلها وصل للمفاتيح. ومحدش بيفكر يفتح تاريخ الـ image غير اللي بيدوّر على كده.",
            how: R`[[ARG]] قيمة وقت البناء. بس BuildKit بيسجل سطر الـ ARG نفسه بالقيمة في الـ history، وأي [[RUN]] بعده بيتسجل ومعاه قيم الـ ARGs اللي كانت متاحة. و [[ENV]] أسوأ: بتفضل في إعدادات الـ image ([[inspect]] بيطلّعها) وفي كل container.

الفرق المهم في Next.js و Vite: [[NEXT_PUBLIC_*]] و [[VITE_*]] لازم تتبعت وقت البناء لأنها بتتكتب جوه ملفات الـ JS، وأي زائر يقدر يشوفها في DevTools. فهي مش أسرار أصلًا (زي anon key بتاع Supabase). إنما [[SERVICE_ROLE_KEY]] أو [[DATABASE_URL]] أو مفتاح الدفع: [[env_file]] في compose أو [[--env-file]] وقت التشغيل، والتطبيق يقراهم من process.env على السيرفر.

[[--secret id=npmrc,src=...]] مع [[RUN --mount=type=secret]] (BuildKit): الملف بيبقى متاح للأمر ده بس وقت البناء، ومبيتسجلش في أي طبقة ولا في الـ history.

وحتى في multi-stage: السر في مرحلة الـ builder مش هيبان في الـ image النهائية، بس بيفضل في كاش البناء على الجهاز اللي بنى.

لو لقيت سر في image اتنشرت: غيّره (امسح الـ image مش كفاية، ممكن حد نزّلها).`,
            when: "مراجعة أي Dockerfile أو سكربت deploy فيه [[--build-arg]]، وقبل ما ترفع image على registry.",
            mistakes: "في مشروع حقيقي سكربت الـ deploy كان بيبعت أسرار السيرفر (مفاتيح بوابة الدفع و service role) كـ [[--build-arg]]، وكمان بيطبع قيمها في اللوج عشان «يتأكد». وفي مشروع تاني [[DATABASE_URL]] كان build ARG فاتحفظ في الـ image بالباسورد. الصح: اطبع أسامي المتغيرات بس ([[docker exec app env | cut -d= -f1]])."
          },
          teach: R`## الفكرة: الـ image بتفتكر إزاي اتبنت

كل image فيها «تاريخ»: لستة بكل سطر في الـ Dockerfile اتنفّذ، ومعاه القيم اللي اتبعتت. أول سطرين في المثال بيفتشوا في التاريخ ده وفي إعدادات الـ image عن أسرار، وآخر 3 سطور بيوروا الطريقة الصح. كله اتشغّل على Docker 29 (BuildKit) على ويندوز من Git Bash، بـ images تجربة اسمها [[sec02-test-*]] اتمسحت في الآخر.

---

## ١. نجهّز image فيها سر

الـ Dockerfile بتاع الحل:

~~~text Dockerfile
FROM alpine
ARG TOKEN
RUN echo done
~~~

- [[FROM alpine]]: ابدأ من لينكس صغير جدًا.
- [[ARG TOKEN]]: متغير «وقت البناء» اسمه [[TOKEN]]، قيمته جاية من بره.
- [[RUN echo done]]: أي أمر، عشان نشوف إيه اللي بيتسجل.

~~~bash
docker build --build-arg TOKEN=abc123 -t sec02-test-img .
~~~

[[--build-arg TOKEN=abc123]] بيدّي الـ ARG قيمته، و [[-t]] (tag) اسم الـ image، و [[.]] الفولدر اللي فيه الـ Dockerfile.

## ٢. السطر الأول: [[docker history --no-trunc myapp:latest | grep -iE "key|secret|password|token"]]

| الحتة | معناها |
|---|---|
| [[docker history]] | اطبع تاريخ الـ image: سطر لكل خطوة، الأحدث فوق |
| [[--no-trunc]] | متقصّش الأوامر الطويلة. من غيرها العمود بيتقطع بـ [[…]] والسر ممكن يبقى في الجزء المقطوع |
| [[myapp:latest]] | اسم الـ image و tag بتاعها |
| [[grep -iE]] والكلمات | سيب السطور اللي فيها key أو secret أو password أو token، من غير فرق كابيتال وسمول |

العمود اللي يهمنا اسمه CREATED BY:

~~~text الناتج (docker history --no-trunc --format '{{.CreatedBy}}' sec02-test-img)
RUN |1 TOKEN=abc123 /bin/sh -c echo done # buildkit
ARG TOKEN=abc123
CMD ["/bin/sh"]
~~~

السر ظاهر **مرتين**:

- [[RUN |1 TOKEN=abc123 ...]]: الـ [[|1]] معناها «الأمر ده كان شايف ARG واحد»، وبعدها اسمه وقيمته.
- [[ARG TOKEN=abc123]]: BuildKit بيسجل سطر الـ ARG نفسه بالقيمة. جرّبنا Dockerfile فيه [[ARG TOKEN]] من غير أي [[RUN]] بعده، وبرضه طلع [[ARG TOKEN=abc123]]. يعني مفيش «ARG آمن».

و [[--format '{{.CreatedBy}}']] بيطبع العمود ده بس بدل الجدول كله. والسر مش في أي ملف جوه الـ image، هو في الـ metadata بتاعتها، فأي حد يعمل [[docker pull]] يقراه.

## ٣. السطر التاني: [[docker image inspect myapp:latest --format '{{json .Config.Env}}']]

[[inspect]] بيطبع كل إعدادات الـ image كـ JSON، و [[--format]] بيختار حتة منها: [[.Config.Env]] متغيرات البيئة المحفوظة، و [[json]] يطبعها JSON.

~~~text الناتج (sec02-test-img)
["PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"]
~~~

الـ ARG مش هنا (هو بيعيش وقت البناء بس). بس لو حد كتب [[ENV API_KEY=sk_live_123]] في الـ Dockerfile:

~~~text الناتج (sec02-test-env)
["PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","API_KEY=sk_live_123"]
~~~

و [[docker run --rm sec02-test-env sh -c 'echo $API_KEY']] طبع [[sk_live_123]]: الـ ENV بيفضل في كل container بيتعمل من الـ image.

---

## ٤. السطر التالت: متغير عام كـ build-arg عادي

[[docker build --build-arg NEXT_PUBLIC_API_URL=https://api.example.com -t myapp .]]

ده **مش سر**: Next.js بيكتب أي [[NEXT_PUBLIC_*]] جوه ملفات الـ JavaScript اللي بتروح للمتصفح، فأي زائر يشوفه. فوجوده في التاريخ مش مشكلة. القاعدة: لو ينفع يبان في DevTools، ينفع يبقى build-arg.

## ٥. السطر الرابع والخامس: [[--secret]] مع [[RUN --mount=type=secret]]

~~~bash
docker build --secret id=npmrc,src=$HOME/.npmrc -t myapp .
~~~

| الحتة | معناها |
|---|---|
| [[--secret]] | ابعت ملف سري للبناء من غير ما يبقى جزء منه |
| [[id=npmrc]] | اسم السر، والـ Dockerfile بيطلبه بالاسم ده |
| [[src=$HOME/.npmrc]] | الملف على جهازك ([[$HOME]] = فولدر اليوزر) |

وجوه الـ Dockerfile:

~~~text
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm ci
~~~

[[--mount=type=secret,id=npmrc]]: ركّب السر ده كملف، و [[target=/root/.npmrc]] مكانه (المكان اللي npm بيدوّر فيه على التوكن). الملف موجود **أثناء الأمر ده بس**.

جرّبناه بملف فيه توكن مزيف [[npm_SECRET999]]، و [[RUN]] بيعدّ حروف الملف وبعده [[RUN]] بيعمل [[ls]]:

~~~text الناتج (docker build --progress=plain)
#5 [stage-0 2/3] RUN --mount=type=secret,id=npmrc,target=/root/.npmrc wc -c /root/.npmrc
#5 0.421 47 /root/.npmrc
~~~

~~~text الناتج (docker history --no-trunc --format '{{.CreatedBy}}')
RUN /bin/sh -c ls -la /root/ # buildkit
RUN /bin/sh -c wc -c /root/.npmrc # buildkit
CMD ["/bin/sh"]
~~~

الأمر شاف الملف (47 حرف)، والتاريخ مفيهوش لا اسم الملف ولا التوكن، و [[grep -c SECRET999]] على التاريخ طلع [[0]]، و [[ls -la /root]] جوه الـ image طلع الفولدر فاضي. و [[--progress=plain]] بيطبع خطوات البناء كاملة بدل الشريط المتحرك.

---

## ٦. على ويندوز

نفس أوامر [[docker]] بالظبط. في PowerShell بدل [[grep -iE]]:

~~~powershell
docker history --no-trunc sec02-test-img | Select-String -Pattern "key|secret|password|token"
~~~

طلع نفس السطرين ([[RUN |1 TOKEN=abc123 ...]] و [[ARG TOKEN=abc123]]). و [[--format '{{json .Config.Env}}']] بالـ single quotes شغال في PowerShell كمان. وبدل [[$HOME/.npmrc]]: [[$env:USERPROFILE\.npmrc]].

## الخلاصة

| | فين بيبان | آمن للأسرار؟ |
|---|---|---|
| [[ARG]] + [[--build-arg]] | [[docker history]] (الـ ARG والـ RUN) | لأ |
| [[ENV]] | [[inspect]] وكل container | لأ |
| [[--secret]] + [[RUN --mount=type=secret]] | ولا حتة | أيوه، لوقت البناء |
| [[env_file]] / [[--env-file]] وقت التشغيل | جوه الـ container الشغال بس | أيوه، لأسرار السيرفر |

ولو لقيت سر في image اترفعت: غيّر السر نفسه. مسح الـ image مش بيمسحها من عند اللي نزّلها.`,
          lines: [
            "دوّر في تاريخ الـ image كامل على أي حاجة شكلها سر.",
            "متغيرات ENV المحفوظة في الـ image.",
            "متغير عام (بيروح للمتصفح أصلًا): عادي كـ build-arg.",
            "سر وقت البناء: يتركّب كملف مؤقت ومبيتسجلش."
          ],
          sol: R`[[docker history --no-trunc test-img]] هيطلع سطر زي [[RUN |1 TOKEN=abc123 /bin/sh -c echo done]]. يعني قيمة الـ ARG اتسجلت في تاريخ الـ image، وأي حد يعمل pull للـ image يقدر يشوفها، حتى لو ما اتكتبتش في أي ملف. ومع BuildKit (الافتراضي في Docker الحديث) هتلاقي كمان سطر [[ARG TOKEN=abc123]] لوحده، حتى لو مفيش أي RUN بعد الـ ARG.

الحل للأسرار اللي محتاجها وقت البناء (زي توكن npm private): [[RUN --mount=type=secret,id=npm_token]] وتبني بـ [[docker build --secret id=npm_token,env=NPM_TOKEN .]]، فالسر بيبقى متاح للأمر ده بس ومش بيتسجل. والأسرار اللي محتاجها وقت التشغيل مكانها [[environment]] أو [[env_file]] في compose، مش في البناء خالص.`,
          solCode: R`# Dockerfile (تجربة)
FROM alpine
ARG TOKEN
RUN echo done

# بناء وفحص
docker build --build-arg TOKEN=abc123 -t test-img .
docker history --no-trunc test-img | grep abc123`
        },
        {
          cmd: ".env اترفع على Git",
          title: "ملف الأسرار اتعمله commit: تعمل إيه بالترتيب",
          desc: "أول خطوة مش في Git: غيّر كل مفتاح كان في الملف، لأنه خلاص اتسرب. بعدها [[git rm --cached]] يوقف التتبع والملف يفضل عندك، و [[.gitignore]] يمنعه يرجع. والتاريخ القديم لسه فيه الملف، فمسحه من التاريخ خطوة إضافية، مش بديل عن تغيير المفاتيح.",
          example: R`git log --all --oneline -- .env
git show a1b2c3d:.env | cut -d= -f1
git rm --cached .env
echo ".env" >> .gitignore
git add .gitignore && git commit -m "stop tracking .env"
git push`,
          try: "في repo تجربة: اعمل commit لـ .env فيه [[API_KEY=test]]، ونفّذ الخطوات، وبعدين [[git log --all -- .env]]: لسه ظاهر في التاريخ. ده اللي لازم تفهمه.",
          deep: {
            why: "الغلطة الشائعة: تعمل [[git rm --cached]] وتفتكر إن الموضوع اتقفل. الملف لسه في كل commit قديم، ولو الريبو اترفع على GitHub فالبوتات ممكن تكون نسخته في دقايق. المفاتيح هي اللي لازم تتغير.",
            how: R`[[git log --all --oneline -- .env]]: كل commit لمس الملف، في كل الـ branches. أقدم واحد هو إمتى بدأ التسريب.

[[git show a1b2c3d:.env | cut -d= -f1]]: أسامي المتغيرات بس في النسخة دي من غير القيم، دي قايمة المفاتيح اللي لازم تتغير. غيّرها كلها: باسورد قاعدة البيانات، ومفاتيح الـ APIs، و JWT secret (كل اليوزرز هيعملوا login تاني)، ومفاتيح الدفع. وحدّث [[.env]] على السيرفر بالجديد.

[[git rm --cached .env]]: شيله من Git والملف يفضل على جهازك. و [[.gitignore]] عشان [[git add .]] ميرجعوش.

مسح التاريخ (اختياري، وبعد تغيير المفاتيح): [[git filter-repo --path .env --invert-paths]] بيعيد كتابة كل الـ commits من غيره، وبعدين [[git push --force]]. ده بيكسر أي نسخة عند حد تاني، ومش بيوصل للـ forks ولا لنسخ حد نزّلها قبل كده. عشان كده تغيير المفاتيح هو الحل، والمسح نضافة بس.

وبعدين [[gitleaks git .]] (الدرس الأول في التاب) يتأكد إن مفيش حاجة تانية.`,
            when: "أول ما تكتشف إن .env أو أي ملف فيه أسرار اتعمله commit، حتى لو الريبو private.",
            mistakes: "تغيّر مفتاح واحد وتنسى الباقي. و [[.env.example]] فيه القيم الحقيقية لأنه اتنسخ من [[.env]]. وتعمل force push بتاريخ جديد وتسيب المفاتيح القديمة شغالة."
          },
          teach: R`## الفكرة: اعرف اتسرّب إيه، وبطّل تتبعه، واعرف إن التاريخ لسه فاكر

المثال 6 أوامر git: اتنين بيكشفوا حجم المشكلة، و 4 بيوقفوها من هنا ورايح. والدرس الأهم إن ولا واحد فيهم بيمسح السر من اللي فات، فالمفاتيح لازم تتغير عند مقدّم الخدمة قبل أي حاجة.

اتجرّب في container ubuntu:24.04 (git 2.43) على repo تجربة: commit أول فيه [[app.js]] و [[.env]] (فيه [[API_KEY=test]] و [[DB_PASSWORD=s3cret]])، وبعده commit تاني بيعدّل [[app.js]]، وrepo تاني «bare» بيلعب دور GitHub.

---

## ١. [[git log --all --oneline -- .env]]

| الحتة | معناها |
|---|---|
| [[git log]] | اعرض الـ commits |
| [[--all]] | في كل الـ branches، مش الحالي بس. السر ممكن يكون في branch قديم |
| [[--oneline]] | كل commit في سطر: أول 7 حروف من الـ hash والرسالة |
| [[--]] | «اللي بعدي مسارات ملفات مش أسامي branches» |
| [[.env]] | اعرض بس الـ commits اللي لمست الملف ده |

~~~text الناتج
b4c365a first commit
~~~

commit واحد بس، وهو أول commit. يعني الملف متسرّب من أول يوم. الـ [[b4c365a]] ده الـ hash المختصر، هنستخدمه في الخطوة الجاية (في المثال مكتوب [[a1b2c3d]] كمثال).

## ٢. [[git show a1b2c3d:.env | cut -d= -f1]]

- [[git show HASH:PATH]]: اطبع الملف ده زي ما كان في الـ commit ده بالظبط.
- [[cut -d= -f1]]: [[cut]] بيقطع كل سطر، و [[-d=]] (delimiter) يعني القطع عند [[=]]، و [[-f1]] (field 1) هات أول حتة.

~~~text الناتج
API_KEY
DB_PASSWORD
~~~

أسامي المتغيرات بس، من غير القيم. ليه؟ عشان الأمر ده بيتكتب في ترمنال ممكن يتسجّل أو يتشاف على الشاشة، فمش هتطبع السر تاني. اللستة دي هي «المفاتيح اللي هتتغير».

---

## ٣. [[git rm --cached .env]]

[[git rm]] لوحده بيمسح الملف من git ومن الديسك. [[--cached]] بيقول «من git بس»: الملف يفضل على جهازك والتطبيق يفضل شغال.

~~~text الناتج
rm '.env'
~~~

## ٤. [[echo ".env" >> .gitignore]]

[[>>]] بيضيف سطر في آخر الملف (و [[>]] كان هيمسح اللي فيه). و [[.gitignore]] لستة الملفات اللي git يتجاهلها، فـ [[git add .]] بعد كده ميرجعوش. واتأكدنا بـ [[git check-ignore -v .env]]:

~~~text الناتج
.gitignore:1:.env	.env
~~~

يعني «اتجاهل بسبب السطر 1 في .gitignore».

## ٥. [[git add .gitignore && git commit -m "stop tracking .env"]]

[[&&]] = نفّذ التاني لو الأول نجح. الـ commit فيه حاجتين: مسح [[.env]] من التتبع، وإضافة [[.gitignore]]:

~~~text الناتج
[master 1b35507] stop tracking .env
 2 files changed, 1 insertion(+), 2 deletions(-)
 delete mode 100644 .env
 create mode 100644 .gitignore
~~~

[[delete mode]] هنا معناها اتشال من git، والملف لسه موجود (اتأكدنا بـ [[ls -a]]). و [[git ls-files .env]] بقى مطبعش حاجة: git مبقاش بيتابعه.

## ٦. [[git push]]

بيرفع الـ commit الجديد. ودي اللحظة اللي ناس كتير بتفتكر إن المشكلة خلصت.

---

## ٧. ليه مخلصتش؟

بعد الخطوات، على نفس الـ repo:

~~~text الناتج (git log --all --oneline -- .env)
1b35507 stop tracking .env
b4c365a first commit
~~~

~~~text الناتج (git show HEAD~1:.env)
API_KEY=test
DB_PASSWORD=s3cret
~~~

[[HEAD~1]] = الـ commit اللي قبل الأخير. وعملنا [[git clone]] جديد من الـ remote: الملف مش في الفولدر، بس [[git show b4c365a:.env]] جوه الـ clone طبع القيمتين. يعني أي حد عمل clone أو fork أو فتح الـ commit على GitHub عنده السر.

## ٨. مسح التاريخ (بعد تغيير المفاتيح)

~~~bash
git filter-repo --path .env --invert-paths
~~~

[[--path .env]] اختار الملف ده، و [[--invert-paths]] اعكس: سيب كل حاجة **ماعدا** ده. جرّبناه:

~~~text الناتج (git log --oneline بعدها)
9b32531 stop tracking .env
e5ebb7f add feature
63eeec6 first commit
~~~

[[git log --all -- .env]] بقى فاضي، بس **كل الـ hashes اتغيرت**: [[b4c365a]] بقى [[63eeec6]] و [[1b35507]] بقى [[9b32531]]، وحتى [[add feature]] اللي ملهاش علاقة بـ [[.env]] اتغيرت، لأن كل hash محسوب من اللي قبله، و [[git remote -v]] بقى فاضي لأن filter-repo بيشيل الـ remote عشان متعملش push بالغلط. فلازم تضيفه تاني وتعمل [[git push --force]]، وكل زميل لازم يعمل clone من جديد. و [[git-filter-repo]] مش جاي مع git: اتسطّب بـ [[apt install git-filter-repo]].

---

## ٩. على ويندوز

أوامر git نفسها واحدة. الفرق في [[cut]] و [[>>]]:

| | Git Bash | PowerShell 7 | Windows PowerShell 5.1 |
|---|---|---|---|
| أسامي المتغيرات | [[cut -d= -f1]] | [[ForEach-Object { ($_ -split "=")[0] }]] | نفس 7 |
| إضافة سطر | [[echo ".env" >> .gitignore]] | شغال (UTF-8) | **بايظ** |
| البديل الآمن | — | [[Add-Content .gitignore ".env"]] | [[Add-Content .gitignore ".env"]] |

ليه بايظ في 5.1؟ [[>>]] هناك بيكتب UTF-16. جرّبناه: الملف بقى بيبدأ بـ [[377 376]] (الـ BOM) وبين كل حرف [[\0]]، و [[git check-ignore -v .env]] مطبعش حاجة ورجع 1، يعني git مش فاهم الملف و [[.env]] **مش** متجاهل. مع [[Add-Content]] اشتغل.

## الخلاصة

| الترتيب | الخطوة | بتحل إيه |
|---|---|---|
| 1 | غيّر كل مفتاح في اللستة | الحل الحقيقي |
| 2 | [[git rm --cached]] + [[.gitignore]] + commit | ميتسرّبش تاني |
| 3 | [[git filter-repo]] + force push (اختياري) | نضافة التاريخ، مش بيوصل للنسخ اللي اتعملت |
| 4 | [[gitleaks git .]] | يتأكد مفيش سر تاني |`,
          lines: [
            "كل commit لمس .env في كل الـ branches.",
            "أسامي المتغيرات في نسخة قديمة (من غير القيم): دي اللي هتغيّرها.",
            "شيله من Git وسيبه على جهازك.",
            "امنعه يرجع.",
            "احفظ التغيير.",
            "ارفع."
          ],
          sol: R`بعد الخطوات، [[git ls-files .env]] بيطلع فاضي (الملف مبقاش متتبّع) والملف لسه موجود على جهازك. بس [[git log --all --oneline -- .env]] لسه بيطبع الـ commit القديم، و [[git show <hash>:.env]] لسه بيوريك [[API_KEY=test]]. يعني أي حد عنده clone أو شاف الـ repo على GitHub عنده المفتاح.

عشان كده الخطوة الأولى في الحقيقة مش git خالص: غيّر كل مفتاح كان في الملف عند مقدم الخدمة. مسح التاريخ ([[git filter-repo --path .env --invert-paths]] وبعدين force push) خطوة إضافية بعدها، ومش بتلغي النسخ اللي اتعملها clone ولا الـ forks ولا الكاش عند GitHub. الغلطة الشائعة إنك تفتكر إن [[git rm --cached]] حلّ المشكلة.`,
          solCode: R`mkdir leak-test && cd leak-test && git init
echo "API_KEY=test" > .env
git add .env && git commit -m "oops"
git rm --cached .env
echo ".env" >> .gitignore
git add .gitignore && git commit -m "stop tracking .env"
git log --all --oneline -- .env    # لسه ظاهر
git show HEAD~1:.env               # API_KEY=test`
        },
        {
          cmd: "ss -tlnp بعد compose",
          title: "مين من الـ containers مفتوح للنت فعلًا",
          desc: "Docker بيفتح أي بورت في [[ports:]] على كل العناوين وبيعدّي من ufw. فبعد أي [[compose up]]، شوف مين بيسمع على [[0.0.0.0]]: المفروض 80 و 443 (و 22) بس. أي قاعدة بيانات أو API هناك مكشوفة. الحل [[127.0.0.1:5000:5000]] أو تشيل [[ports]] خالص.",
          example: R`docker compose up -d
sudo ss -tlnp | grep -E "0\.0\.0\.0|\[::\]"
docker compose ps --format "table {{.Service}}\t{{.Ports}}"
nmap -Pn -p 22,80,443,3000,5000,5432,6379,27017 203.0.113.10`,
          try: "على سيرفر التجربة شغّل Redis منشور على [[6379:6379]] و ufw مفعّل، واعمل nmap من جهازك: هتلاقيه open. غيّرها لـ 127.0.0.1:6379:6379 وجرّب تاني.",
          deep: {
            why: "ufw بيديك إحساس إن كل حاجة مقفولة غير اللي فتحته، و Docker بيكسر الإحساس ده بصمت. Redis من غير باسورد أو Mongo مكشوف بيتلاقوا ويتخترقوا في ساعات، لأن فيه بوتات بتعمل scan للنت كله على البورتات دي.",
            how: R`[[ss -tlnp]]: كل بورت TCP بيسمع، ومين البرنامج. مع Docker هتلاقي [[docker-proxy]] على البورتات المنشورة. العنوان [[0.0.0.0]] أو [[::]] يعني كل الشبكات، و [[127.0.0.1]] يعني السيرفر نفسه بس.

[[compose ps]] بالـ Ports بيوريك كل service ومنشورة إزاي: [[0.0.0.0:5432->5432/tcp]] مكشوفة، و [[127.0.0.1:5432->5432/tcp]] محلية.

[[nmap]] من جهازك انت (مش من السيرفر) هو الاختبار الحقيقي: ده اللي الناس شايفاه. [[-Pn]] متعملش ping الأول.

الحل: service محتاجة Nginx يوصلها بس؟ متنشرهاش خالص، Nginx يوصلها بالاسم جوه شبكة compose. محتاج توصلها من السيرفر نفسه (أو SSH tunnel)؟ [[127.0.0.1:5432:5432]].`,
            when: "بعد أول compose up على أي سيرفر، وبعد أي تعديل في ports، وكجزء من preflight (تاب VPS).",
            mistakes: "في مشروع حقيقي الباك إند كان ناشر [[5000:5000]] فالـ API متاح مباشرة من غير Nginx، يعني من غير rate limit ولا HTTPS. وفي مشروع تاني ملف الإنتاج كان فاتح Postgres على 5433 و Redis على 6379 للنت، و Redis من غير باسورد، و ufw شغال فالكل فاكر إنهم مقفولين."
          },
          teach: R`## الفكرة: اسأل السيرفر مين بيسمع، واسأل من بره مين بيرد

المثال 4 أوامر: تشغّل الـ stack، وتسأل السيرفر نفسه مين بيسمع على كل العناوين ([[ss]])، وتسأل Docker كل service منشورة إزاي ([[compose ps]])، وبعدين تجرّب من جهاز تاني زي أي حد على النت ([[nmap]]).

عشان نجرّب من غير VPS ومن غير ما نفتح حاجة على شبكة البيت، عملنا «سيرفر» جوه Docker: container [[docker:dind]] (Docker جوه Docker، 29.8.2) شغال فيه compose بـ 3 services، و «جهازك» container ubuntu:24.04 فيه nmap على نفس شبكة Docker. الـ compose الأول (الغلط):

~~~text compose.yaml
services:
  web:
    image: nginx:alpine
    ports: ["80:80"]
  api:
    image: nginx:alpine
    ports: ["5000:80"]
  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]
~~~

[[ports: ["5000:80"]]] معناها «بورت 5000 على السيرفر يوصّل لبورت 80 جوه الـ container». ولما مفيش عنوان قبلهم، Docker بيفتحه على **كل** العناوين.

---

## ١. [[docker compose up -d]]

شغّل كل الـ services، و [[-d]] (detached) يعني في الخلفية وارجعلي الترمنال.

## ٢. [[sudo ss -tlnp | grep -E "0\.0\.0\.0|\[::\]"]]

### [[ss -tlnp]]

[[ss]] = socket statistics، بيعرض الاتصالات والبورتات. والحروف:

| الحرف | معناه |
|---|---|
| [[-t]] | TCP بس |
| [[-l]] | listening: البورتات اللي مستنية اتصال بس |
| [[-n]] | numeric: أرقام البورتات بدل أساميها ([[6379]] مش [[redis]]) |
| [[-p]] | process: مين البرنامج. محتاج [[sudo]] عشان يشوف برامج يوزرز تانيين |

~~~text الناتج
State  Recv-Q Send-Q Local Address:Port  Peer Address:PortProcess
LISTEN 0      4096         0.0.0.0:80         0.0.0.0:*    users:(("docker-proxy",pid=506,fd=8))
LISTEN 0      4096         0.0.0.0:5000       0.0.0.0:*    users:(("docker-proxy",pid=628,fd=8))
LISTEN 0      4096      127.0.0.11:37091      0.0.0.0:*
LISTEN 0      4096         0.0.0.0:6379       0.0.0.0:*    users:(("docker-proxy",pid=747,fd=8))
LISTEN 0      4096            [::]:80            [::]:*    users:(("docker-proxy",pid=512,fd=8))
LISTEN 0      4096               *:2375             *:*    users:(("dockerd",pid=26,fd=4))
LISTEN 0      4096            [::]:5000          [::]:*    users:(("docker-proxy",pid=634,fd=8))
LISTEN 0      4096            [::]:6379          [::]:*    users:(("docker-proxy",pid=753,fd=8))
~~~

العمود المهم **Local Address:Port**:

| العنوان | معناه |
|---|---|
| [[0.0.0.0]] | كل عناوين IPv4 على السيرفر، يعني من النت كمان |
| [[[::]]] | نفس الكلام لـ IPv6 |
| [[*]] | الاتنين |
| [[127.0.0.1]] | السيرفر نفسه بس (localhost) |

و [[docker-proxy]] هو البرنامج اللي Docker بيشغّله لكل بورت منشور. يعني الـ 3 services (80 و 5000 و 6379) مفتوحين للكل. أما [[127.0.0.11:37091]] فده الـ DNS الداخلي بتاع Docker، و [[*:2375]] ده Docker API بتاع الـ lab نفسه (على VPS عادي مش هتلاقيهم).

### [[grep -E "0\.0\.0\.0|\[::\]"]]

صفّي السطور اللي فيها [[0.0.0.0]] أو [[[::]]]. والـ [[\]] قبل [[.]] و [[[]] عشان دول رموز ليها معنى في الـ regex ([[.]] = أي حرف)، فالـ [[\]] بيقول «الحرف نفسه». خد بالك إن [[127.0.0.11:37091]] عدّى من الفلتر، لأن عمود Peer جنبه فيه [[0.0.0.0:*]]. فاقرا عمود Local بعينك.

## ٣. [[docker compose ps --format "table {{.Service}}\t{{.Ports}}"]]

[[--format]] بيختار الأعمدة: [[table]] اطبعها جدول، و [[{{.Service}}]] اسم الـ service، و [[\t]] tab بينهم، و [[{{.Ports}}]] البورتات.

~~~text الناتج
SERVICE   PORTS
api       0.0.0.0:5000->80/tcp, [::]:5000->80/tcp
redis     0.0.0.0:6379->6379/tcp, [::]:6379->6379/tcp
web       0.0.0.0:80->80/tcp, [::]:80->80/tcp
~~~

اقرا [[0.0.0.0:5000->80/tcp]] كده: «أي حد يكلّم البورت 5000 على أي عنوان، يتحوّل لبورت 80 جوه الـ container». ده بيقولك أنهي service في الـ compose هي اللي محتاجة تتصلح.

## ٤. [[nmap -Pn -p 22,80,443,3000,5000,5432,6379,27017 203.0.113.10]]

من «جهازك» (container الأدوات) على IP السيرفر. [[-Pn]]: متعملش ping الأول (سيرفرات كتير بتقفل الـ ping)، و [[-p]] البورتات دي بس: SSH و الويب و بورتات APIs وقواعد بيانات مشهورة.

~~~text الناتج
PORT      STATE  SERVICE
22/tcp    closed ssh
80/tcp    open   http
443/tcp   closed https
3000/tcp  closed ppp
5000/tcp  open   upnp
5432/tcp  closed postgresql
6379/tcp  open   redis
27017/tcp closed mongod
~~~

[[5000]] و [[6379]] **open** للعالم. وعمود SERVICE مجرد تخمين من رقم البورت ([[upnp]] هنا غلط، ده الـ API). وعشان تعرف خطورة Redis مفتوح: بعتناله [[PING]] من «جهازك» من غير أي باسورد ورد [[+PONG]]. يعني أي حد يقدر يقرا ويكتب فيه.

---

## ٥. ليه ufw مبيحميش؟

ufw بيكتب قواعده في سلسلة اسمها [[INPUT]] في iptables (الحاجات اللي داخلة للسيرفر نفسه). Docker بيحوّل البورت المنشور للـ container بـ DNAT، فالـ packet بتعدّي على سلسلة [[FORWARD]] مش [[INPUT]]. جرّبناها جوه «السيرفر»: قاعدة DROP في INPUT لـ 5432 و 6379، زي ما [[ufw deny]] بيعمل:

~~~text الناتج (nmap -p 5432,6379)
5432/tcp filtered postgresql
6379/tcp open     redis
~~~

[[5432]] (مفيش عليه container) بقى [[filtered]]: القاعدة رمت الطلب ومفيش رد. أما [[6379]] بتاع Docker فلسه **open** رغم القاعدة. ده بالظبط اللي بيحصل مع ufw.

## ٦. التصليح

~~~text compose.yaml بعد التصليح
  api:
    image: nginx:alpine
  redis:
    image: redis:7-alpine
    ports: ["127.0.0.1:6379:6379"]
~~~

[[api]] من غير [[ports]] خالص (nginx هيوصله بالاسم جوه شبكة compose)، و [[redis]] على [[127.0.0.1]] بس. بعد [[docker compose up -d]]:

~~~text الناتج (ss -tlnp)
LISTEN 0      4096         0.0.0.0:80         0.0.0.0:*    users:(("docker-proxy",pid=506,fd=8))
LISTEN 0      4096       127.0.0.1:6379       0.0.0.0:*    users:(("docker-proxy",pid=1018,fd=8))
LISTEN 0      4096            [::]:80            [::]:*    users:(("docker-proxy",pid=512,fd=8))
~~~

~~~text الناتج (compose ps)
SERVICE   PORTS
api       80/tcp
redis     127.0.0.1:6379->6379/tcp
web       0.0.0.0:80->80/tcp, [::]:80->80/tcp
~~~

[[api 80/tcp]] من غير سهم يعني البورت جوه الـ container بس، مش منشور. و nmap من بره بقى يطلع [[5000/tcp closed]] و [[6379/tcp filtered]] (filtered هنا بسبب قاعدة الـ DROP اللي حطيناها، من غيرها كانت هتبقى closed). ومن جوه compose لسه شغال: [[wget http://api/]] من الـ web رجّع [[Welcome to nginx!]]، و [[nc -z redis 6379]] نجح.

---

## ٧. على ويندوز (Docker Desktop)

مفيش [[ss]]. البديل في PowerShell:

~~~powershell
Get-NetTCPConnection -State Listen | Where-Object LocalPort -in 18080,18443,15433,5432 | Select-Object LocalAddress, LocalPort, @{n="Process";e={(Get-Process -Id $_.OwningProcess).ProcessName}}
~~~

~~~text الناتج
LocalAddress LocalPort Process
------------ --------- -------
::1               5432 wslrelay
::                5432 com.docker.backend
127.0.0.1        18443 com.docker.backend
127.0.0.1        18080 com.docker.backend
127.0.0.1        15433 com.docker.backend
~~~

بورتات الـ lab كلها [[127.0.0.1]]، أما [[5432]] فده container من مشروع تاني على نفس الجهاز منشور [[5432:5432]]، فطالع على [[::]] (كل العناوين). على Docker Desktop البرنامج اسمه [[com.docker.backend]] بدل [[docker-proxy]]. و [[@{n=...;e={...}}]] عمود محسوب: اسمه Process وقيمته اسم البرنامج من رقمه. وفي cmd: [[netstat -ano | findstr LISTENING]].

## الخلاصة

| الأمر | بيجاوب على |
|---|---|
| [[ss -tlnp]] | مين بيسمع على أنهي عنوان (من جوه) |
| [[compose ps --format ...]] | أنهي service السبب |
| [[nmap]] من جهاز تاني | الناس شايفة إيه فعلًا |

القاعدة: [[ports]] للي لازم يتشاف من النت بس (80 و 443)، و [[127.0.0.1:...]] للي محتاجه من السيرفر نفسه، والباقي من غير [[ports]] خالص.`,
          lines: [
            "شغّل الـ stack.",
            "مين بيسمع على كل العناوين؟",
            "كل service ومنشورة على أنهي عنوان.",
            "من جهازك: البورتات دي مفتوحة للنت فعلًا؟"
          ],
          sol: R`مع [[ports: ["6379:6379"]]]، الـ nmap من جهازك هيطلع [[6379/tcp open redis]] حتى لو [[ufw status]] مش فيه قاعدة لـ 6379. ده لأن Docker بيضيف قواعد iptables خاصة بيه بتتنفذ قبل قواعد ufw. و [[ss -tlnp]] على السيرفر هيوريك [[0.0.0.0:6379]] (docker-proxy).

بعد ما تغيّرها لـ [[127.0.0.1:6379:6379]] و [[docker compose up -d]]، [[ss -tlnp]] يطلع [[127.0.0.1:6379]]، والـ nmap من جهازك يطلع [[closed]] أو [[filtered]]. الأحسن من كده لو الـ API في نفس الـ compose: شيل [[ports]] خالص من Redis وقاعدة البيانات، والـ API يوصلهم باسم الـ service ([[redis:6379]]) على شبكة compose الداخلية. وخلّي في بالك إن Redis من غير باسورد ومفتوح للنت بيتلقط في دقايق.`
        },
        {
          cmd: "openssl enc",
          title: "تشفير الباك أب قبل ما يطلع من السيرفر",
          desc: "الباك أب فيه قاعدة البيانات كلها، فلما يتخزن بره السيرفر (Google Drive، أو S3) لازم يبقى متشفر. [[openssl enc]] بيضغط ويشفّر في pipe واحد، والباسورد جاي من متغير بيئة ([[env:]]) مش من سطر الأوامر. وجرّب الفك قبل ما تحتاجه.",
          example: R`export BACKUP_PASSPHRASE="$(cat /root/.backup-pass)"
tar -czf - app.dump config.tar.gz | openssl enc -aes-256-cbc -pbkdf2 -iter 200000 -salt -pass env:BACKUP_PASSPHRASE -out backup.tar.gz.enc
openssl enc -d -aes-256-cbc -pbkdf2 -iter 200000 -pass env:BACKUP_PASSPHRASE -in backup.tar.gz.enc | tar -tzf -
rclone copy backup.tar.gz.enc remote:backups/ && rclone check backup.tar.gz.enc remote:backups/ --one-way`,
          try: "شفّر أي فولدر، وفكه في فولدر تاني بـ [[tar -xzf -]] بدل [[-tzf]]، وقارن بـ [[diff -r]].",
          deep: {
            why: "باك أب مش متشفر على خدمة تخزين هو نسخة كاملة من بيانات عملائك مستنية أي حد يوصل للحساب ده. والتشفير بيخلي تسريب الملف مش مهم طالما الباسورد في أمان.",
            how: R`[[tar -czf -]]: اضغط الملفات واكتب الناتج على stdout ([[-]]) بدل ملف، فمفيش نسخة مش متشفرة بتتكتب على الديسك.

[[openssl enc -aes-256-cbc]]: تشفير AES بمفتاح ٢٥٦ بت. [[-pbkdf2 -iter 200000]]: المفتاح بيتولّد من الباسورد بعد ٢٠٠ ألف دورة، فتخمين الباسورد بطيء جدًا. من غيرهم openssl بيستخدم طريقة قديمة ضعيفة وبيطلع تحذير. [[-salt]]: ملح عشوائي، فنفس الباسورد بيدّي ناتج مختلف كل مرة.

[[-pass env:BACKUP_PASSPHRASE]]: الباسورد من متغير بيئة. لو كتبته [[-pass pass:xxx]]، أي يوزر على السيرفر يشوفه في [[ps aux]] وقت التشفير. وفيه كمان [[file:/path]].

الفك: نفس الإعدادات بالظبط مع [[-d]]. أي اختلاف في [[-iter]] أو الـ cipher = [[bad decrypt]]. [[tar -tzf -]] بيعرض المحتوى من غير ما يفك، اختبار سريع إن الملف سليم.

[[rclone check --one-way]]: يتأكد إن النسخة اللي اترفعت مطابقة فعلًا.

الباسورد نفسه لازم يتحفظ بره السيرفر (password manager). لو السيرفر مات والباسورد كان عليه بس، الباك أب ملوش لازمة. وبدائل أحدث: [[age]] أو [[gpg -c]]، بيكشفوا لو الملف اتعدّل (CBC لوحده مبيكشفش).`,
            when: "أي باك أب بيطلع من السيرفر. شغّله من cron بعد pg_dump (تاب VPS، باك أب قاعدة البيانات).",
            mistakes: "في مشروع حقيقي السكربت كان بيستخدم [[-pass pass:$PASS]] فالباسورد بيبان في [[ps]]، ومكنش بيتأكد إن الرفع نجح ولا بينبّه لو فشل من cron، ومفيش اختبار فك أبدًا. باك أب عمرك ما جربت ترجّعه مش باك أب."
          },
          teach: R`## الفكرة: اضغط وشفّر في سطر، وجرّب الفك، وارفع

المثال 4 سطور: الباسورد في متغير، وبعدين pipe بيضغط ويشفّر من غير ما يكتب نسخة مكشوفة، وبعدين اختبار فك، وبعدين رفع. اتشغّل في container ubuntu:24.04 (OpenSSL 3.0.13) على ملفات تجربة: [[app.dump]] (نص مزيف) و [[config.tar.gz]]. والرفع ([[rclone]]) محتاج حساب تخزين حقيقي فمتجرّبش، وشرحه من الـ docs.

---

## ١. [[export BACKUP_PASSPHRASE="$(cat /root/.backup-pass)"]]

| الحتة | معناها |
|---|---|
| [[export]] | اعمل متغير بيئة، فالبرامج اللي هتشتغل بعده تشوفه |
| [[$(...)]] | نفّذ الأمر اللي جوه وحط ناتجه هنا |
| [[cat /root/.backup-pass]] | اقرا الباسورد من ملف في فولدر root |

الباسورد نفسه عملناه كده:

~~~bash
umask 077
openssl rand -base64 32 > .backup-pass
ls -l .backup-pass
~~~

~~~text الناتج
-rw------- 1 root root 45 Oct  6 16:33 .backup-pass
~~~

[[openssl rand -base64 32]]: 32 byte عشوائي مكتوبين base64 (44 حرف + سطر جديد = 45). و [[umask 077]] قبلها خلّت الملف [[-rw-------]]: root بس يقراه ويكتبه.

## ٢. السطر الطويل، حتة حتة

~~~bash
tar -czf - app.dump config.tar.gz | openssl enc -aes-256-cbc -pbkdf2 -iter 200000 -salt -pass env:BACKUP_PASSPHRASE -out backup.tar.gz.enc
~~~

### الخطوة ١: [[tar -czf - app.dump config.tar.gz]]

| الحتة | معناها |
|---|---|
| [[tar]] | يجمع ملفات كتير في ملف واحد |
| [[-c]] | create: اعمل أرشيف جديد |
| [[-z]] | اضغطه بـ gzip |
| [[-f -]] | file: اسم الأرشيف، و [[-]] يعني «مش ملف، اكتبه على الـ stdout» |

يعني الأرشيف المضغوط بيطلع في الـ pipe على طول، **مفيش** نسخة مش متشفرة بتتكتب على الديسك.

### الخطوة ٢: [[openssl enc -aes-256-cbc]]

[[enc]] أداة التشفير. [[aes-256-cbc]]: AES بمفتاح 256 bit، بطريقة CBC (Cipher Block Chaining، كل بلوك بيعتمد على اللي قبله).

### الخطوة ٣: [[-pbkdf2 -iter 200000]]

الباسورد مش هو المفتاح. [[pbkdf2]] (Password-Based Key Derivation Function 2) بيحوّل الباسورد لمفتاح 256 bit، و [[-iter 200000]] بيكرر الحساب 200 ألف مرة. ليه؟ عشان كل تخمين لباسورد غلط ياخد نفس الوقت ده، فتجربة ملايين الباسوردات تبقى بطيئة جدًا. من غيرهم OpenSSL بيستخدم طريقة قديمة وبيحذّرك:

~~~text الناتج (من غير -pbkdf2)
*** WARNING : deprecated key derivation used.
Using -iter or -pbkdf2 would be better.
~~~

### الخطوة ٤: [[-salt]]

salt = 8 byte عشوائي بيدخل في حساب المفتاح، وبيتكتب في أول الملف. عشان كده نفس الباسورد ونفس الملف بيطلعوا مختلفين كل مرة. شفّرنا [[hello]] مرتين:

~~~text الناتج (base64)
U2FsdGVkX19mzth+B5Bc8pZuHvAFJnDa22w1n6rp3Ik=
U2FsdGVkX18oM+kvVqXui1DL0RkGTX43fhgb5+Lv95U=
~~~

الاتنين بيبدأوا بـ [[U2FsdGVkX1]]، ودي base64 لكلمة [[Salted__]]. وبصينا على أول 16 byte من ملف الباك أب بـ [[od -c]]: [[S a l t e d _ _]] وبعدها 8 byte الملح.

### الخطوة ٥: [[-pass env:BACKUP_PASSPHRASE]]

خد الباسورد من متغير البيئة ده. ليه مش [[-pass pass:الباسورد]]؟ لأن أي حاجة في سطر الأوامر بتبان لأي يوزر على السيرفر في [[ps]]. شغّلنا الاتنين في نفس الوقت:

~~~text الناتج (ps -eo user,args)
root     openssl enc -aes-256-cbc -pbkdf2 -pass pass:TopSecret123 -in /dev/zero -out /dev/null
root     openssl enc -aes-256-cbc -pbkdf2 -pass env:P2 -in /dev/zero -out /dev/null
~~~

الأول الباسورد مكشوف، والتاني اسم المتغير بس. وفيه كمان [[-pass file:/root/.backup-pass]] يقرا من الملف على طول.

### الخطوة ٦: [[-out backup.tar.gz.enc]]

اسم الملف المتشفّر. و [[.enc]] في الآخر عشان أي حد يعرف إنه محتاج فك.

~~~text الناتج (ls -l)
-rw------- 1 root root 352 Oct  6 16:33 backup.tar.gz.enc
~~~

---

## ٣. اختبار الفك: [[openssl enc -d ... -in backup.tar.gz.enc | tar -tzf -]]

- [[-d]]: decrypt. وباقي الإعدادات **لازم** تبقى نفس اللي اتشفّر بيها.
- [[-in]]: الملف المتشفّر.
- [[tar -tzf -]]: [[-t]] = اعرض المحتوى بس من غير ما تفك، من الـ stdin.

~~~text الناتج
app.dump
config.tar.gz
~~~

الملفين ظاهرين، يعني الفك والـ gzip سليمين. ولو حاجة غلط:

~~~text الناتج (باسورد غلط، أو -iter 100000 بدل 200000)
bad decrypt
...:error:1C800064:Provider routines:ossl_cipher_unpadblock:bad decrypt:...

gzip: stdin: not in gzip format
tar: Child returned status 1
tar: Error is not recoverable: exiting now
~~~

نفس الخطأ في الحالتين، لأن المفتاح بيتحسب من الباسورد **و** الإعدادات مع بعض. فاكتب الإعدادات جنب الباك أب.

## ٤. [[rclone copy ... && rclone check ... --one-way]] (من الـ docs)

[[rclone copy]] بيرفع الملف لـ [[remote:backups/]] ([[remote]] اسم الحساب اللي متظبط في [[rclone config]]، زي Google Drive أو S3). و [[rclone check --one-way]] بيقارن: كل ملف عندك موجود هناك ومطابق؟ ([[--one-way]] = متشتكيش من الملفات القديمة اللي هناك ومش عندك). و [[&&]] عشان الـ check يحصل بس لو الرفع نجح.

---

## ٥. الحل: باك أب ورجوع كامل

الحل بيشفّر فولدر [[data]]، ويفكه في [[restore]] بـ [[tar -xzf - -C restore]] ([[-x]] extract، و [[-C]] فك جوه الفولدر ده)، وبعدين:

~~~text الناتج
backup OK
~~~

[[diff -r data restore/data]] ([[-r]] = كل الفولدرات اللي جوه) مطبعش حاجة ورجع 0، فـ [[&& echo]] اشتغل. ولما زوّدنا سطر في الملف المسترجع عشان نتأكد إن الاختبار بيمسك:

~~~text الناتج
diff -r data/a.txt restore/data/a.txt
1a2
> bye
~~~

ورجع 1، فـ [[backup OK]] مظهرش.

## ٦. على ويندوز

[[openssl]] و [[tar]] الاتنين موجودين في Git Bash (OpenSSL 3.5.8)، فنفس الأوامر. في PowerShell الـ [[$(...)]] و [[export]] مختلفين: [[$env:BACKUP_PASSPHRASE = Get-Content path]]. بس الباك أب ده مكانه السيرفر اللينكس من cron، مش جهازك.

## الخلاصة

| الحتة | ليه |
|---|---|
| [[tar -czf -]] | مفيش نسخة مكشوفة على الديسك |
| [[-aes-256-cbc -pbkdf2 -iter 200000 -salt]] | مفتاح قوي من الباسورد، وناتج مختلف كل مرة |
| [[-pass env:]] أو [[file:]] | الباسورد ميبانش في [[ps]] |
| [[-d]] بنفس الإعدادات + [[tar -tzf -]] | اختبار إن الملف بيرجع |
| [[rclone check]] | النسخة اللي فوق مطابقة |

وباسورد التشفير يتحفظ بره السيرفر (password manager)، وإلا لو السيرفر مات الباك أب مالوش لازمة.`,
          lines: [
            "الباسورد في متغير بيئة من ملف root بس.",
            "اضغط وشفّر في pipe واحد، ومفيش نسخة مكشوفة على الديسك.",
            "اختبار: فك واعرض المحتوى من غير ما تفك فعلًا.",
            "ارفع بره السيرفر واتأكد إن النسخة مطابقة."
          ],
          sol: R`التشفير بيطلع ملف [[backup.tar.gz.enc]] مش مقروء. فك التشفير في فولدر تاني بـ [[tar -xzf -]] بدل [[-tzf]] بيطلّع الملفات فعلًا، و [[diff -r]] بين الفولدر الأصلي والجديد المفروض ميطبعش حاجة ويرجع exit code صفر، ده معناه إن الباك أب رجع زي ما هو بالظبط.

لو الباسورد غلط، [[openssl]] بيطبع [[bad decrypt]] والـ tar يطبع [[gzip: stdin: not in gzip format]]. ولو غيّرت [[-iter]] أو شلت [[-pbkdf2]] وقت الفك هيحصل نفس الخطأ، لأن المفتاح بيتحسب من الباسورد والإعدادات دي مع بعض. ودي الحكمة من التجربة: باك أب ماتجربش إنه بيرجع كأنه مش موجود، وباسورد التشفير لازم يكون محفوظ بره السيرفر وإلا هيضيع معاه.`,
          solCode: R`export BACKUP_PASSPHRASE="test-pass-123"
mkdir -p data && echo hello > data/a.txt
tar -czf - data | openssl enc -aes-256-cbc -pbkdf2 -iter 200000 -salt \
  -pass env:BACKUP_PASSPHRASE -out data.tar.gz.enc
mkdir -p restore
openssl enc -d -aes-256-cbc -pbkdf2 -iter 200000 \
  -pass env:BACKUP_PASSPHRASE -in data.tar.gz.enc | tar -xzf - -C restore
diff -r data restore/data && echo "backup OK"`
        }
      ]
    },
    {
      t: "تشيك ليست قبل ما ترفع",
      l: 3,
      n: "راجعها قبل أي مشروع يروح إنتاج",
      items: [
        {
          cmd: "الأساسيات",
          title: "المصادقة والداتا",
          desc: R`التشيك ليست دي لمصادقة المستخدمين وحماية البيانات، وكل بند مش متعمل ثغرة محتملة. الباسوردات تتخزن hashed بـ bcrypt أو argon2، لأنهم بطيئين عن قصد فتخمينها يبقى صعب، مش MD5 ولا SHA256. الـ JWT secret طويل وعشوائي ([[openssl rand -base64 32]]) وفي [[.env]] مش في الكود، لأن اللي يعرفه يقدر يعمل توكن لأي يوزر.

IDOR معناها إن الـ route بيتأكد إنك عامل login بس، مش إن الحاجة دي بتاعتك، فتغيّر رقم في الرابط وتشوف طلب حد تاني. الاستعلامات parameterized (القيم بتتبعت لوحدها مش ملزوقة في نص الـ SQL) عشان SQL injection. والـ validation لازم يتعمل على السيرفر حتى لو الواجهة بتعمله، لأن أي حد يقدر يبعت طلب مباشرة من غير الواجهة. و rate limiting على login بيمنع حد يجرّب آلاف الباسوردات.`,
          example: R`[ ] كل الباسوردات hashed بـ bcrypt/argon2
[ ] JWT secret طويل وعشوائي وفي .env
[ ] كل route محمي بيتأكد من الصلاحية مش بس الدخول (IDOR)
[ ] كل الاستعلامات parameterized أو ORM
[ ] كل مدخلات المستخدم عليها validation على السيرفر
[ ] rate limiting على login و APIs الحساسة`,
          try: "طبّق التشيك ليست دي على آخر مشروع رفعته.",
          flag: "script",
          deep: {
            why: "قبل ما ترفع أي موقع على الإنتاج، فيه حاجات أساسية لازم تتأكد منها. دي الـ checklist اللي لو عملتها بتحمي من أشهر طرق الاختراق.",
            how: R`الباسوردات: bcrypt أو argon2 فقط، مش MD5 أو SHA256. لو بتعمل migration لقاعدة بيانات قديمة، الـ hashing قبل ما أي حاجة تانية.

JWT secret: طويل (٣٢ بايت على الأقل)، عشوائي، ومش في الكود. [[openssl rand -base64 32]] بيولّد واحد. ولو غيّرت الـ secret (مثلًا بعد تسريب)، كل الـ tokens القديمة بتبقى invalid وكل اليوزرز يعملوا login تاني.

كل route محمي: الفرق بين authenticated (logged in) وauthorized (مسموحلك). لو route بيتأكد بس إن في token بس مش بيتأكد من الصلاحيات، ده IDOR.

كل input بيتعمله validation على السيرفر: حتى لو الـ frontend بيعمل validation كمان.

HTTPS على كل environments إلا localhost.`,
            when: "قبل أي deploy للإنتاج. وبعد أي feature جديدة بتضيف authentication أو routes.",
            mistakes: "تعتمد على الـ frontend validation لأي من دول. والـ JWT secret في الكود أو في GitHub."
          },
          teach: R`## الفكرة: 6 بنود، وكل بند ليه طريقة تتأكد بيها

المثال مش كود، ده checklist: كل سطر بيبدأ بـ [[[ ]]] (مربع فاضي تعلّم عليه). مش هنحفظ البنود، هنفهم كل بند بيحمي من إيه، وإزاي **تثبت** إنه متعمل بأمر مش بإحساس. الأوامر اتشغّلت بـ Node 24 على ويندوز و PostgreSQL 16 في container.

---

## ١. [[كل الباسوردات hashed بـ bcrypt/argon2]]

**hash** دالة باتجاه واحد: من الباسورد تطلع بصمة، ومن البصمة مترجعش للباسورد. وقت الـ login بتعمل hash للي اليوزر كتبه وتقارن.

ليه bcrypt مش MD5 أو SHA256؟ الاتنين الأخرانيين معمولين يبقوا **سريعين**، وده عكس اللي محتاجه. قسنا على نفس الجهاز:

~~~text الناتج
bcrypt12 ms 319
100k sha256 ms 268
~~~

hash واحد بـ bcrypt (cost 12) خد 319ms، و 100 ألف SHA256 خدوا 268ms. يعني لو قاعدة البيانات اتسرّبت، اللي سرقها يجرّب مئات آلاف الباسوردات في الثانية على SHA256، وحوالي 3 بس على bcrypt. وكمان MD5 و SHA256 من غير salt بيدّوا نفس الناتج لنفس الباسورد:

~~~text الناتج (md5 و sha256 لـ hunter2)
2ab96390c7dbe3439de74d0c9b0b1767
f52fbd32b2b3b86ff88ef6c490628285f482af15ddcb29541f94bcf526a3f6c7
~~~

ودول موجودين في جداول جاهزة على النت. أما bcrypt (من مكتبة [[bcryptjs]]):

~~~text الناتج
$2b$12$KKqfqEFY3etcTcVIBJ1D/eRPe3r0bex9XV/jS3knzglh32nJ3mupC 60
true false
~~~

| الحتة | معناها |
|---|---|
| [[$2b$]] | نوع الخوارزمية: bcrypt |
| [[12$]] | الـ cost: 2^12 دورة. كل +1 بيضاعف الوقت |
| الـ 22 حرف بعدها | الـ salt، عشوائي لكل باسورد |
| الباقي | الـ hash نفسه، والكل 60 حرف |

و [[true false]]: المقارنة بـ [[hunter2]] نجحت وبـ [[hunter3]] فشلت.

**إزاي تتأكد:** على الداتابيز. جرّبناه على جدول تجربة فيه 3 صفوف: bcrypt، و MD5، و argon2:

~~~text الناتج (SELECT left(password,7) FROM users LIMIT 5)
  left
---------
 $2b$12$
 2ab9639
 $argon2
~~~

[[left(text, 7)]] أول 7 حروف. أول صف سليم، والتالت argon2 سليم، والتاني MD5: **ده اللي لازم يتصلح**.

## ٢. [[JWT secret طويل وعشوائي وفي .env]]

الـ JWT بيتمضي بالـ secret ده، واللي يعرفه يقدر يعمل توكن لأي يوزر (حتى admin). فلازم ميتخمنش:

~~~bash
openssl rand -base64 32
~~~

~~~text الناتج (مثال)
ISlrc2U4frFgJ0YB7P4Z8NEHB1hge4GT7/r26Rwjlxg=
~~~

32 byte عشوائي = 44 حرف base64. **إزاي تتأكد:** [[echo -n "$JWT_SECRET" | wc -c]]: [[-n]] من غير سطر جديد، و [[wc -c]] عدد الحروف. طلع 44 للعشوائي، و [[6]] لما الـ secret كان [[secret]]. و «في .env» يعني مش مكتوب في الكود، فمش في Git (درس «.env اترفع على Git»).

## ٣. [[كل route محمي بيتأكد من الصلاحية مش بس الدخول (IDOR)]]

**authentication** = انت مين (عامل login). **authorization** = مسموحلك بالحاجة دي. IDOR (Insecure Direct Object Reference) لما الـ route بيعمل الأولى بس:

~~~text
GET /api/orders/42     ← يوزر A
GET /api/orders/43     ← نفس اليوزر غيّر الرقم وشاف طلب يوزر B
~~~

**إزاي تتأكد:** يوزرين، وكل واحد يجرّب IDs التاني في القراية **والتعديل والمسح** (درس «1. Broken Access Control» فيه التجربة كاملة).

## ٤. [[كل الاستعلامات parameterized أو ORM]]

parameterized = النص بتاع الـ SQL ثابت، والقيم بتتبعت لوحدها ([[$1]]). كده input زي [[' OR 1=1 --]] بيفضل قيمة، مش جزء من الأمر. **إزاي تتأكد:** دوّر في الكود على SQL متلزق بـ [[+]] أو template strings جوه query (درس «2. SQL Injection»).

## ٥. [[كل مدخلات المستخدم عليها validation على السيرفر]]

الـ validation في الواجهة للراحة بس. أي حد يقدر يبعت الطلب مباشرة بـ [[curl]] من غير ما يفتح الموقع. فالسيرفر لازم يتأكد بنفسه من النوع والطول والقيم المسموحة (بمكتبة زي zod).

## ٦. [[rate limiting على login و APIs الحساسة]]

من غيره حد يجرّب آلاف الباسوردات على حساب واحد. **إزاي تتأكد:** لوب يبعت 20 login غلط ورا بعض، والمفروض بعد عدد معيّن يرجع [[429 Too Many Requests]] (درس «8. Rate limiting»).

---

## الخلاصة

| البند | بيحمي من | الدليل |
|---|---|---|
| bcrypt/argon2 | تسريب الداتابيز | الـ hashes بتبدأ بـ [[$2b$]] أو [[$argon2]] |
| JWT secret | توكنات مزورة | 32 byte عشوائي أو أكتر، مش في الكود |
| الصلاحية | IDOR | يوزرين يجربوا IDs بعض |
| parameterized | SQL injection | مفيش SQL متلزق |
| validation | داتا غلط أو خبيثة | طلب بـ curl متخطي الواجهة يترفض |
| rate limit | تخمين الباسورد | 429 بعد كام محاولة |`,
          sol: R`الإجابة الكويسة إنك تمشي على كل بند بدليل مش بإحساس: الباسوردات بـ [[SELECT left(password,7) FROM users LIMIT 5]] (لازم تبدأ بـ [[$2b$]] أو [[$argon2id$]])، الـ JWT secret بـ [[echo -n "$JWT_SECRET" | wc -c]] (32 حرف عشوائي أو أكتر، مش "secret")، الـ IDOR بتجربة اليوزرين من درس Broken Access Control، الـ SQL بالـ grep من درس SQL Injection، والـ rate limit باللوب من درسه.

النتيجة المعتادة على أول مشروع: بندين أو تلاتة ناقصين، وأشهرهم validation على السيرفر لبعض الـ routes، و IDOR في التعديل أو المسح مع إن القراءة سليمة، ومفيش rate limit على reset password. اكتب اللي لقيته ورتبه بالخطورة وصلّح الأخطر الأول.`
        },
        {
          cmd: "البنية",
          title: "السيرفر والنقل",
          desc: R`حتى لو كودك سليم، السيرفر والطريق بينه وبين الزائر ممكن يكونوا الثغرة. HTTPS بيشفّر الطريق، و HTTP لازم يحوّل له، و certbot مع Nginx بيعمل الاتنين. الـ security headers (بـ helmet في Express أو من Nginx) بتقول للمتصفح يحمي الزائر، زي إنه ميفتحش الموقع غير بـ HTTPS، وموقع securityheaders.com بيديك درجة.

[[.env]] بره Git، وأي سر اتعمله commit قبل كده اعتبره اتسرّب وغيّره. قاعدة البيانات تسمع على [[127.0.0.1]] بس، والفايروول يفتح 22 و 80 و 443 وبس. رسائل الأخطاء في الإنتاج عامة، لأن الـ stack trace بيوري المهاجم مسارات ونسخ مكتباتك. [[npm audit]] بيكشف المكتبات اللي فيها ثغرات معروفة. والباك أب لازم يكون اتجرّب إنه بيرجع فعلًا.`,
          example: R`[ ] HTTPS مفعّل و HTTP بيحوّل له
[ ] security headers (helmet أو Nginx)، درجة A على securityheaders.com
[ ] .env بره Git، ومفيش أسرار في الكود ولا في تاريخ Git
[ ] قاعدة البيانات على 127.0.0.1 مش مكشوفة للنت
[ ] الفايروول: 22 و 80 و 443 بس
[ ] رسائل الأخطاء عامة في الإنتاج (مفيش stack traces للمستخدم)
[ ] npm audit نضيف، والمكتبات محدّثة
[ ] باك أب شغال ومتجرّب إنه بيرجع`,
          try: "اعمل scan بـ nmap لسيرفرك وتأكد من نقطة البورتات.",
          flag: "script",
          deep: {
            why: "الأساسيات في الكود مش كافية. البنية نفسها (HTTPS، والـ headers، والـ secrets) لازم تبقى مظبوطة من الأول.",
            how: R`HTTPS وHTTP redirect: certbot مع Nginx بيعمل الاتنين. أي طلب HTTP بيتحوّل لـ HTTPS أوتوماتيك.

Security headers بـ helmet أو Nginx: [[Strict-Transport-Security]] و[[Content-Security-Policy]] وغيرهم. درجة A على securityheaders.com الهدف.

[[.env]] بره Git وأكيد مفيش أسرار في الكود أو تاريخه. أي secret في GitHub حتى لو في commit قديم يتعامل معاه كمكشوف.

CORS مضبوط: فقط domains مسموح بيها، مش [[*]] مع credentials.

Rate limiting على login وregistration وأي endpoint بياخد وقت.

Database: يوزر بصلاحيات أقل ما ممكن، ومش root أو superuser.`,
            when: "وانت بتجهّز السيرفر لأول مرة، مش بعد الرفع.",
            mistakes: "CORS بـ [[*]] مع cookies. والـ database user بصلاحيات admin من الأصل."
          },
          teach: R`## الفكرة: الكود سليم، بس السيرفر نفسه ممكن يبقى الباب المفتوح

8 بنود عن السيرفر والطريق بينه وبين الزائر. زي التشيك ليست اللي قبلها، كل بند هنفهمه ونشوف الأمر اللي بيثبته. الأدلة اتشغّلت على lab في Docker: nginx متظبط بـ HTTPS (شهادة self-signed)، و «سيرفر» compose جوه container، و Express 5 على ويندوز.

---

## ١. [[HTTPS مفعّل و HTTP بيحوّل له]]

HTTPS بيشفّر كل حاجة بين المتصفح والسيرفر (الباسورد، والكوكيز). والزائر اللي كتب [[http://]] لازم يتحوّل. الإعداد في nginx:

~~~text
server {
  listen 80;
  return 301 https://$host$request_uri;
}
~~~

[[return 301]] = تحويل دائم، و [[$host]] الدومين اللي اتطلب، و [[$request_uri]] باقي الرابط. **الدليل:**

~~~text الناتج (curl -sI http://sec02-web-hard/some/page)
HTTP/1.1 301 Moved Permanently
Location: https://sec02-web-hard/some/page
~~~

نفس الصفحة بالظبط على https. certbot بيعمل الـ block ده لوحده.

## ٢. [[security headers (helmet أو Nginx)]]

[[curl -sI]] و [[grep]] على الستة (درس «فحص الـ headers»). السيرفر المتظبط طلّع الستة، والافتراضي ولا واحد.

## ٣. [[.env بره Git، ومفيش أسرار في الكود ولا في تاريخ Git]]

[[git ls-files .env]] لازم يطلع فاضي، و [[git log --all --oneline -- .env]] لازم يطلع فاضي كمان، وإلا السر في التاريخ (درس «.env اترفع على Git»). و [[gitleaks git .]] بيدوّر في كل الـ commits على أي حاجة شكلها مفتاح.

## ٤. [[قاعدة البيانات على 127.0.0.1 مش مكشوفة للنت]]

على السيرفر: [[sudo ss -tlnp]]. في الـ lab بعد التصليح:

~~~text الناتج
LISTEN 0      4096         0.0.0.0:80         0.0.0.0:*    users:(("docker-proxy",pid=506,fd=8))
LISTEN 0      4096       127.0.0.1:6379       0.0.0.0:*    users:(("docker-proxy",pid=1018,fd=8))
~~~

الويب على [[0.0.0.0]] (للكل)، و Redis على [[127.0.0.1]] (السيرفر بس). قبل التصليح Redis كان على [[0.0.0.0:6379]] ورد [[+PONG]] على [[PING]] من جهاز تاني من غير باسورد (درس «ss -tlnp بعد compose»).

## ٥. [[الفايروول: 22 و 80 و 443 بس]]

22 = SSH (عشان تدخل السيرفر)، و 80 = HTTP (عشان التحويل)، و 443 = HTTPS. **الدليل** من جهازك: [[nmap -Pn IP]]. وخد بالك إن Docker بيعدّي من ufw: في الـ lab حطينا قاعدة DROP زي ufw، و 5432 (مفيش عليه container) بقى [[filtered]]، بس 6379 المنشور من Docker فضل [[open]]. فالبند ده مع البند ٤، مش بداله.

## ٦. [[رسائل الأخطاء عامة في الإنتاج]]

جرّبنا Express 5 بـ route بيرمي [[new Error("db password wrong for user app_admin")]]:

~~~text الناتج (NODE_ENV=development)
500  Error Error: db password wrong for user app_admin at C:\Users\ali\app\err.cjs:3:32 at Layer ...
~~~

~~~text الناتج (NODE_ENV=production)
500  Error Internal Server Error
~~~

في الأول الزائر شاف الرسالة كاملة (فيها اسم يوزر الداتابيز) ومسار الملف على السيرفر وأسامي المكتبات. ونفس الكود بالظبط مع [[NODE_ENV=production]] طلّع رسالة عامة. يعني متغير واحد ناسيه = تسريب. والتفاصيل مكانها اللوج (من غير PII، درس «PII بره اللوج»).

## ٧. [[npm audit نضيف، والمكتبات محدّثة]]

[[npm audit --omit=dev]] على مكتبات الإنتاج. في مشروع تجربة فيه [[lodash@4.17.20]] طلع [[1 high severity vulnerability]] (درس «السكانرات في CI»).

## ٨. [[باك أب شغال ومتجرّب إنه بيرجع]]

«شغال» مش كفاية. الدليل إنك ترجّعه فعلًا في مكان تاني وتقارن: [[diff -r data restore/data && echo "backup OK"]] (درس «openssl enc»).

---

## الخلاصة

| البند | الأمر اللي يثبته |
|---|---|
| HTTPS + تحويل | [[curl -sI http://...]] يرجّع [[301]] لـ https |
| headers | [[curl -sI]] + [[grep -iE]] على الستة |
| أسرار Git | [[git log --all -- .env]] فاضي، و [[gitleaks]] |
| الداتابيز | [[ss -tlnp]]: على [[127.0.0.1]] |
| الفايروول | [[nmap]] من جهازك: 22 و 80 و 443 بس |
| الأخطاء | [[NODE_ENV=production]] ورسالة عامة |
| المكتبات | [[npm audit --omit=dev]] |
| الباك أب | رجوع فعلي + [[diff -r]] |`,
          sol: R`[[nmap]] من جهازك على IP السيرفر: المتوقع [[22]] و [[80]] و [[443]] بس open، وكل بورت قاعدة بيانات (5432، 3306، 6379، 27017) مش ظاهر أو [[filtered]]. وعلى السيرفر [[sudo ss -tlnp]] يأكد: قواعد البيانات على [[127.0.0.1]] أو جوه شبكة Docker بس، مش [[0.0.0.0]].

لو لقيت بورت الـ API زي [[3000]] open، يبقى التطبيق مكشوف مباشرة ومش لازم يعدّي على Nginx: اربطه على [[127.0.0.1:3000]] وسيب Nginx هو اللي على 80 و 443. ولو لقيت بورت قاعدة بيانات open، اقفله فورًا ودوّر في اللوجات على اتصالات غريبة، لأن الـ bots بتلف على البورتات دي طول الوقت.`
        },
        {
          cmd: "المتابعة",
          title: "بعد ما ترفع",
          desc: R`الأمان مش حاجة بتعملها مرة يوم ما ترفع وتنساها: كل يوم بتتكتشف ثغرات جديدة في مكتبات ونظام انت بتستخدمه، والبوتات مش بتبطّل تجرّب. البنود دي هي الصيانة المستمرة.

fail2ban بيحظر الـ IPs اللي بتجرّب تدخل SSH كتير، و [[sudo fail2ban-client status sshd]] بيأكد إنه شغال. unattended-upgrades بيسطّب تحديثات أمان النظام لوحده. اللوجات لازم حد يبص عليها، ولو مرة في الأسبوع، أو تنبيه يوصلك لما حاجة غريبة تزيد فجأة. Dependabot (من إعدادات GitHub) أو [[npm audit]] في CI بيقولولك أول ما مكتبة عندك يطلع فيها ثغرة. وأهم بند: خطة مكتوبة قبل ما تحتاجها، لو حصل اختراق هتغيّر أنهي مفاتيح وباسوردات بالترتيب، وهترجع باك أب إزاي.`,
          example: R`[ ] fail2ban شغال ضد محاولات SSH
[ ] تحديثات الأمان أوتوماتيك (unattended-upgrades)
[ ] لوجات بتتراقب، وتنبيه لو حصل حاجة غريبة
[ ] Dependabot أو npm audit في CI
[ ] خطة لو حصل اختراق: تغيّر المفاتيح إزاي وترجع باك أب إزاي`,
          try: "فعّل Dependabot على أهم repo عندك من إعدادات GitHub.",
          flag: "script",
          deep: {
            why: "الأمان مش حاجة بتعملها مرة واحدة. التهديدات بتتطور، وثغرات جديدة بتتكتشف، ومحتاج تظل متابع.",
            how: R`fail2ban: يحظر أي IP بيجرّب كتير على SSH أو login. اتأكد إنه شغال: [[sudo fail2ban-client status sshd]].

unattended-upgrades: تحديثات الأمان بتيجي لوحدها. اتأكد إنه مفعّل وبيشتغل. [[cat /var/log/unattended-upgrades/unattended-upgrades.log]].

لوجات: بتتراقب وعندك تنبيه لو حصل حاجة غريبة. حتى لو مش automated، بص على لوجات Nginx وتطبيقك مرة في الأسبوع. كتير من الاختراقات بتتكشف بعد فترة لو حد بص على اللوجات.

npm audit وDependabot: بانتظام وفي CI.

Backups: بيتعملوا ومتحفظين بره السيرفر، ومجرّبة الاستعادة منهم. باك أب مش بيتجرّب مش باك أب فعلي.`,
            when: "ضيف فيهم كل أسبوع أو كل ٢ أسبوع وقت ثابت.",
            mistakes: "إنك تعمل كل ده مرة في الأول وتنسى. الأمان maintenance مستمر مش project له نهاية."
          },
          teach: R`## الفكرة: 5 حاجات بتشتغل لوحدها، وانت بتتأكد إنها لسه شغالة

البنود دي مش بتتعمل مرة. كل واحد منهم أداة أو عادة بتفضل شغالة بعد الرفع، والمطلوب منك تعرف تسأل «انت شغال؟» وتفهم الرد. أول بندين اتجرّبوا في container ubuntu:24.04 (نفس نظام أغلب الـ VPS)، و Dependabot من الـ docs بتاعة GitHub لأنه بيشتغل على GitHub نفسه.

---

## ١. [[fail2ban شغال ضد محاولات SSH]]

fail2ban بيقرا لوج SSH، ولو IP غلط في الباسورد كذا مرة ورا بعض بيحظره فترة. سطّبناه (Fail2Ban v1.0.2) وسألناه:

~~~bash
sudo fail2ban-client status sshd
~~~

[[fail2ban-client]] أداة التحكم، و [[status]] اسأل عن الحالة، و [[sshd]] اسم الـ jail (jail = قاعدة: لوج + فلتر + عقاب).

~~~text الناتج (أول ما اشتغل)
Status for the jail: sshd
|- Filter
|  |- Currently failed:	0
|  |- Total failed:	0
|  $__bt- Journal matches:	_SYSTEMD_UNIT=sshd.service + _COMM=sshd
$__bt- Actions
   |- Currently banned:	0
   |- Total banned:	0
   $__bt- Banned IP list:
~~~

[[Journal matches]] معناها إنه بيقرا من systemd journal (الافتراضي على Ubuntu 24.04). عشان نشوفه بيشتغل، خليناه يقرا ملف ([[backend = polling]] و [[logpath = /var/log/auth.log]] و [[maxretry = 3]] في [[/etc/fail2ban/jail.local]]، و [[banaction = dummy]] عشان الحظر يتسجل من غير ما يلمس فايروول)، وكتبنا 4 سطور [[Failed password for root from 203.0.113.5]]:

~~~text الناتج
Status for the jail: sshd
|- Filter
|  |- Currently failed:	1
|  |- Total failed:	4
|  $__bt- File list:	/var/log/auth.log
$__bt- Actions
   |- Currently banned:	1
   |- Total banned:	1
   $__bt- Banned IP list:	203.0.113.5
~~~

| السطر | معناه |
|---|---|
| [[Total failed: 4]] | كل المحاولات الفاشلة اللي شافها |
| [[Currently failed: 1]] | محاولات لسه بتتعد (بعد الحظر العداد بيبدأ تاني) |
| [[Currently banned: 1]] | IP محظور دلوقتي |
| [[Banned IP list]] | مين |

على سيرفر حقيقي على النت، [[Total failed]] بيبقى بالآلاف في أيام، وده طبيعي: بوتات. لو لقيته صفر على طول، يبقى fail2ban مش بيقرا اللوج الصح. وأحسن من الاتنين: SSH بالمفتاح بس ([[PasswordAuthentication no]]).

## ٢. [[تحديثات الأمان أوتوماتيك (unattended-upgrades)]]

الحزمة دي بتسطّب تحديثات الأمان لوحدها كل يوم. الإعداد في ملف:

~~~text الناتج (cat /etc/apt/apt.conf.d/20auto-upgrades)
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
~~~

الـ [[1]] = كل يوم: حدّث لستة الحزم، وسطّب التحديثات. واللوج:

~~~text الناتج (tail /var/log/unattended-upgrades/unattended-upgrades.log)
INFO Allowed origins are: o=Ubuntu,a=noble, o=Ubuntu,a=noble-security, ...
INFO No packages found that can be upgraded unattended and no pending auto-removals
~~~

[[Allowed origins]]: من أنهي مصادر يسطّب، و [[noble-security]] مصدر تحديثات الأمان ([[noble]] = اسم Ubuntu 24.04). والسطر التاني: مفيش حاجة محتاجة تتحدث. السطور دي اتكتبت من [[unattended-upgrade --dry-run]] ([[--dry-run]] = جرّب من غير ما تسطّب). وخد بالك: تحديثات الـ kernel محتاجة reboot، فبص على [[/var/run/reboot-required]].

## ٣. [[لوجات بتتراقب، وتنبيه لو حصل حاجة غريبة]]

مفيش أمر واحد هنا. الحد الأدنى: مرة في الأسبوع تبص على لوجات nginx (أكتر IPs وأكتر 4xx و 5xx) ولوج التطبيق. والأحسن تنبيه أوتوماتيك لما رقم يزيد فجأة (زي login فاشل، أو 500). الاختراقات كتير بتتكشف من اللوج بعد ما حصلت بفترة، لو حد بص.

## ٤. [[Dependabot أو npm audit في CI]]

[[npm audit]] في CI بيفحص لما انت تعمل push. Dependabot بيفحص كل يوم لوحده، حتى لو محدش لمس الـ repo، وبيفتح PR بالتحديث. ملف الحل:

| السطر | معناه |
|---|---|
| [[version: 2]] | نسخة صيغة الملف (لازم 2) |
| [[updates:]] | لستة، عنصر لكل نوع مكتبات |
| [[package-ecosystem: npm]] | مكتبات npm (فيه كمان [[docker]] و [[github-actions]]) |
| [[directory: /]] | مكان [[package.json]] في الـ repo |
| [[schedule: interval: weekly]] | يدوّر على تحديثات كل أسبوع |
| [[open-pull-requests-limit: 5]] | أقصى 5 PRs مفتوحين، عشان ميغرقكش |

وتنبيهات الثغرات نفسها (Dependabot alerts) بتتفعّل من إعدادات الـ repo، ومش محتاجة الملف ده.

## ٥. [[خطة لو حصل اختراق]]

ورقة مكتوبة **قبل** ما تحتاجها، فيها بالترتيب: مين بيتبلّغ، وأنهي مفاتيح تتغير (باسورد الداتابيز، و JWT secret، ومفاتيح الدفع، ومفاتيح SSH)، وإزاي ترجّع باك أب نضيف، وإزاي تبلّغ الجهة الرقابية خلال 72 ساعة لو فيه بيانات شخصية (درس «القانون المصري و GDPR»).

---

## الخلاصة

| البند | السؤال | الأمر |
|---|---|---|
| fail2ban | بيحظر فعلًا؟ | [[sudo fail2ban-client status sshd]] |
| التحديثات | مفعّلة وبتشتغل؟ | [[cat /etc/apt/apt.conf.d/20auto-upgrades]] واللوج |
| اللوجات | حد بيبص؟ | ميعاد أسبوعي أو تنبيه |
| المكتبات | فيه ثغرة جديدة؟ | Dependabot + [[npm audit]] في CI |
| الخطة | هتعمل إيه الساعة 3 الفجر؟ | ورقة مكتوبة |`,
          sol: R`في GitHub: Settings ← Advanced Security (أو Code security في بعض الحسابات) ← فعّل Dependabot alerts و Dependabot security updates. خلال دقايق هتلاقي تاب Security ← Dependabot فيه تنبيه لكل مكتبة فيها ثغرة، ومع الـ security updates هيفتح PRs لوحده بالتحديث.

عشان كمان تحديثات عادية بشكل منتظم، ضيف ملف [[.github/dependabot.yml]] زي اللي تحت، فيفتح PRs كل أسبوع. الغلطة الشائعة إنك تفعّله وبعدين تتجاهل الـ PRs لحد ما يبقوا عشرين: خليه weekly، والـ CI عندك يشغّل الاختبارات على كل PR، فتعمل merge للي نجح بسرعة.`,
          solCode: R`# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
    open-pull-requests-limit: 5`
        }
      ]
    }
]);
