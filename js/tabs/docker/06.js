// تكملة تاب docker: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/docker/01.js (شرح حقول الدرس في أوله)
MORE("docker", [
    {
      t: "على السيرفر: تشغيل وصيانة ومشاكل",
      l: 3,
      n: "الديبلوي، والـ restart policies، وليه الـ container بيقع، والتنضيف",
      items: [
        {
          cmd: "الديبلوي",
          title: "build على السيرفر ولا image جاهزة",
          desc: "طريقتين: تعمل pull للكود على السيرفر وتبني هناك (بسيط، بس الـ build بياكل موارد السيرفر)، أو تبني في CI وترفع image والسيرفر يعمل pull بس (أنضف، والسيرفر ميحتاجش الكود). أول سطرين كل واحد فيهم deploy كامل في سطر، واحد لكل طريقة.",
          example: R`git pull && docker compose up -d --build
docker compose pull && docker compose up -d
docker compose up -d --build --force-recreate api
docker image prune -f`,
          try: "اعمل deploy بالطريقة الأولى على سيرفر التجربة، وقيس الوقت. لو الـ build بيعلّق السيرفر، دي إشارة تنقل الـ build لـ CI.",
          deep: {
            why: "محتاج طريقة ثابتة توصّل نسخة جديدة للسيرفر من غير ما توقع الموقع، وتقدر ترجع لو حصلت مشكلة.",
            how: R`الطريقة الأولى (build على السيرفر): [[git pull]] يجيب الكود، و [[up -d --build]] يبني ويشغّل. بسيطة ومناسبة لمشروع واحد على سيرفر مش صغير. عيبها إن الـ build بياكل معالج ورام السيرفر وقت ما الموقع شغال، وأي مشكلة في الـ build بتحصل على الإنتاج.

الطريقة التانية (image جاهزة): GitHub Actions بيبني مع كل push ويرفع على ghcr.io. على السيرفر [[pull && up -d]]. السيرفر ميحتاجش git ولا الكود ولا موارد الـ build، والـ rollback إنك تغيّر رقم النسخة في compose وتعمل up.

[[--force-recreate]] بيعيد الـ container حتى لو الإعدادات متغيرتش، مفيد لو عدّلت env file.

[[image prune -f]] بعد كل deploy، وإلا الصور القديمة تملى الديسك في أسابيع.

والـ downtime: [[up]] بيوقف القديم ويشغّل الجديد، فيه ثواني الموقع واقع. لو ده مشكلة، الحل blue-green: نسختين ورا Nginx وتبدّل بينهم.`,
            when: "ابدأ بالطريقة الأولى. انقل للتانية لما الـ build يبقى تقيل أو يبقى عندك أكتر من سيرفر.",
            mistakes: R`deploy من غير ما تعمل باك أب للقاعدة الأول لو فيه migration. وتنسى prune فالديسك يتملى.

في مشروع حقيقي سكربت الديبلوي كان بيعمل [[down]] قبل [[build]]، فالموقع واقع طول مدة البناء. الصح تبني الأول ([[docker compose build]]) والموقع شغال، وبعدين [[up -d]] يبدّل في ثواني. ولو [[git pull]] فشل، السكربت كان بيكمل وينشر الكود القديم ويقول تمام، و [[sleep 5]] مكان ما يستنى الـ healthcheck بـ [[up -d --wait]].`
          },
          teach: R`## الفكرة: نسخة جديدة توصل للسيرفر في سطر واحد

الـ deploy معناه إن الكود الجديد يبقى هو اللي شغال على السيرفر. المثال فيه ٤ سطور: أول سطرين كل واحد فيهم deploy كامل بطريقة مختلفة، والتالت للحالة اللي الإعدادات اتغيرت فيها من غير الكود، والرابع تنضيف بعد الـ deploy.

جربت كل ده على Docker Desktop 29.6.1 (Compose v5.3.0) على ويندوز من Git Bash، بمشروع تجربة اسمه [[dk03-deploy]] فيه خدمتين: [[api]] بتتبني من Dockerfile، و [[cache]] صورة جاهزة ([[redis:7-alpine]]). على السيرفر اللينكس الأوامر هي هي.

---

## ١. [[git pull && docker compose up -d --build]]

السطر ده ٣ حتت.

### [[git pull]]

بيجيب آخر commits من GitHub (أو أي remote) ويدمجها في الفولدر اللي على السيرفر. بعد ما عملت commit جديد اسمه v2:

~~~text الناتج
Updating 0b97dbe..e14bd8b
Fast-forward
 server.js | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
~~~

ولو مفيش جديد بيطبع [[Already up to date.]].

### [[&&]]

معناها «نفّذ اللي بعدي **بس لو** اللي قبلي نجح». لو [[git pull]] فشل (مثلًا فيه تعديل يدوي على السيرفر بيتعارض)، الـ build مش هيحصل، وده اللي انت عايزه: متبنيش الكود القديم وتفتكر إنه الجديد.

### [[docker compose up -d --build]]

- [[up]]: شغّل الخدمات اللي في [[compose.yml]]، واللي اتغير منها اعمله من جديد.
- [[-d]] (detached): اشتغل في الخلفية ورجّعلي الترمنال.
- [[--build]]: ابني الصور اللي ليها [[build:]] قبل التشغيل، حتى لو فيه صورة قديمة بنفس الاسم.

~~~text الناتج (من غير سطور البناء)
 Image dk03-deploy-api Built
 Container dk03-deploy-cache-1 Running
 Container dk03-deploy-api-1 Recreate
 Container dk03-deploy-api-1 Recreated
 Container dk03-deploy-api-1 Starting
 Container dk03-deploy-api-1 Started
~~~

اقرا الأفعال: [[cache]] مكتوب جنبه [[Running]] يعني متلمسش لأن مفيش حاجة اتغيرت فيه. و [[api]] اتعمله [[Recreate]]: الـ container القديم اتشال واتعمل واحد جديد من الصورة الجديدة. والمسافة بين الشيل والتشغيل هي الثواني اللي الموقع بيبقى فيها واقع. قبلها [[curl]] كان بيرد [[v1]]، وبعدها [[v2]].

---

## ٢. [[docker compose pull && docker compose up -d]]

الطريقة التانية: السيرفر مبيبنيش حاجة. CI بيبني ويرفع الصورة على registry، والسيرفر:

- [[pull]]: نزّل أحدث نسخة من كل صورة مكتوبة في [[image:]].
- [[up -d]]: أي خدمة صورتها اتغيرت، اعملها Recreate.

~~~text ناتج pull في مشروع التجربة
 api Skipped No image to be pulled
 Image redis:7-alpine Pulling
 ...
 Image redis:7-alpine Pulled
~~~

لاحظ [[api Skipped]]: الخدمة دي ليها [[build:]] بس من غير [[image:]] على registry، فـ pull ملوش حاجة ينزّلها. في الطريقة التانية بجد، [[api]] هتبقى [[image: ghcr.io/you/api:1.4.0]] من غير build. وبعد الـ pull، [[up -d]] طبع [[Container dk03-deploy-cache-1 Recreate]] لأن صورة redis اتحدّثت.

---

## ٣. [[docker compose up -d --build --force-recreate api]]

- [[--force-recreate]]: اعمل الـ container من جديد حتى لو Compose شايف إن مفيش حاجة اتغيرت.
- [[api]] في الآخر: الأمر ده على الخدمة دي بس، الباقي ميتلمسش.

ليه تحتاجه؟ Compose بيقارن الإعدادات اللي في [[compose.yml]] والصورة. لو انت عدّلت ملف بيتقري وقت التشغيل بس (env file برّه، أو ملف مربوط bind mount)، ممكن ميشوفش فرق ويقول [[Running]]. مع [[--force-recreate]]:

~~~text الناتج
 Container dk03-deploy-api-1 Recreate
 Container dk03-deploy-api-1 Recreated
 Container dk03-deploy-api-1 Started
~~~

---

## ٤. [[docker image prune -f]]

كل build جديد بيسيب الصورة القديمة من غير اسم (dangling). [[image prune]] بيمسح الصور المعلّقة دي، و [[-f]] (force) من غير ما يسألك [[y/N]].

> على جهازي مجربتهوش كده، لأن الأمر ده بيمسح الصور المعلّقة بتاعة **كل** المشاريع على الجهاز. جربته محدود على صوري بس: [[docker image prune -f --filter label=dk03=1]] وطبع [[Total reclaimed space: 0B]]. على سيرفر بتاعك لوحدك، السطر زي ما هو في المثال تمام.

---

## الطريقتين جنب بعض

| | build على السيرفر | image جاهزة |
|---|---|---|
| السطر | [[git pull && docker compose up -d --build]] | [[docker compose pull && docker compose up -d]] |
| السيرفر محتاج | الكود و git وموارد للبناء | Docker بس |
| البناء بياكل من | رام ومعالج السيرفر وقت ما الموقع شغال | CI |
| الرجوع لنسخة قديمة | [[git checkout]] وتبني تاني | تغيّر رقم الـ tag وتعمل [[up -d]] |

## الخلاصة

~~~text
&&                 كمّل بس لو اللي قبله نجح
up -d --build      ابني وشغّل، واعمل Recreate للي اتغير بس
pull               نزّل الصور، وخدمات build بس بتتعمل Skipped
--force-recreate   اعمل الـ container من جديد حتى لو مفيش تغيير ظاهر
image prune -f     امسح الصور المعلّقة من غير سؤال
~~~`,
          lines: [
            "الطريقة الأولى: هات الكود وابني وشغّل.",
            "الطريقة التانية: نزّل الصور الجاهزة وشغّل.",
            "أعد إنشاء api حتى لو الإعدادات متغيرتش (بعد تعديل env file).",
            "امسح الصور القديمة بعد كل deploy."
          ],
          sol: R`[[time (git pull && docker compose up -d --build)]] بيطبع خطوات البناء وفي الآخر [[real 1m30s]] مثلًا. الرقم بيعتمد على السيرفر: على سيرفر 1GB RAM بناء Next أو TypeScript ممكن ياخد دقايق.

والإشارة إن الـ build لازم يتنقل لـ CI: [[npm ci]] أو [[npm run build]] بيقع بـ [[Killed]] أو [[JavaScript heap out of memory]]، أو SSH يعلّق وقت البناء، أو الموقع نفسه يبطأ للزوار وقت الـ deploy. شوف [[free -h]] و [[docker stats]] أثناء البناء.

وافتكر إن الموقع بيقف ثواني وقت الـ recreate، ده طبيعي في الطريقة دي. والغلط الشائع: [[git pull]] يفشل بسبب تعديل يدوي على السيرفر، فالسكربت بيكمل ويبني الكود القديم. خلّي [[set -e]] أول السكربت.`
        },
        {
          cmd: "restart policies",
          title: "يرجع لوحده لو وقع",
          desc: "من غير سياسة، الـ container لو وقع بيفضل واقف. [[unless-stopped]] الأنسب: يرجع لو وقع أو السيرفر عمل ريستارت، إلا لو انت وقّفته بإيدك. [[on-failure:5]] يحاول ٥ مرات بس.",
          example: R`docker run -d --restart unless-stopped --name api myapi
docker update --restart unless-stopped api
docker inspect --format '{{.HostConfig.RestartPolicy.Name}}' api`,
          try: "شغّل container بـ unless-stopped، واعمل [[sudo reboot]] للسيرفر، وشوفه رجع لوحده.",
          deep: {
            why: "التطبيق وقع الساعة ٣ الفجر، أو السيرفر عمل ريستارت للتحديثات. من غير سياسة إعادة تشغيل، الموقع بيفضل واقع لحد ما تصحى.",
            how: R`[[no]] الافتراضي: لو وقع يفضل واقف. [[always]]: يرجع دايمًا، حتى لو انت وقّفته بإيدك وبعدين Docker اتعمله ريستارت. [[unless-stopped]]: يرجع لو وقع أو السيرفر قام، إلا لو انت عملتله stop بإيدك. [[on-failure:5]]: يرجع بس لو exit code مش صفر، وأقصى ٥ محاولات.

[[unless-stopped]] الأنسب للإنتاج: بيحترم قرارك لما توقفه.

لما الـ container بيقع وبيرجع باستمرار (crash loop)، Docker بيزوّد الوقت بين المحاولات تدريجيًا. هتشوفه في [[ps]] بحالة Restarting. ساعتها [[logs]] هتقولك السبب.

[[update]] بيغيّر السياسة لـ container شغال من غير ما تعيده.

خدمة Docker نفسها لازم تبقى enabled في systemd عشان تقوم مع السيرفر، وده افتراضي بعد التسطيب.`,
            when: "كل container إنتاج. في compose: [[restart: unless-stopped]] تحت كل خدمة.",
            mistakes: "[[always]] لتطبيق فيه bug بيوقعه فورًا: بيفضل يقع ويقوم للأبد ويحرق المعالج. و on-failure من غير رقم."
          },
          teach: R`## الفكرة: Docker يرجّع الـ container لوحده

الـ restart policy قاعدة بتقولها لـ Docker: «لو الـ container ده وقف، تعمل إيه؟». المثال بيحط القاعدة وقت التشغيل، ويغيّرها لـ container شغال، ويتأكد منها. جربت كل السطور على Docker Desktop 29.6.1 بـ containers اسمها [[dk03-...]] من صورة [[alpine]] بتعمل [[sleep]] (بدل [[myapi]]).

---

## ١. [[docker run -d --restart unless-stopped --name api myapi]]

- [[run]]: اعمل container من الصورة وشغّله.
- [[-d]]: في الخلفية.
- [[--restart unless-stopped]]: القاعدة نفسها (تحت شرح كل القيم).
- [[--name api]]: اسم تنادي بيه الـ container بدل الـ ID الطويل.
- [[myapi]]: اسم الصورة.

### القيم الأربعة

| القيمة | لو التطبيق وقع | لو Docker أو السيرفر عمل restart |
|---|---|---|
| [[no]] (الافتراضي) | يفضل واقف | يفضل واقف |
| [[on-failure:5]] | يرجع لو الـ exit code مش صفر، لحد ٥ مرات | مش معمولة للحالة دي، فمتعتمدش عليها |
| [[always]] | يرجع | يرجع، حتى لو انت كنت موقّفه بإيدك |
| [[unless-stopped]] | يرجع | يرجع، **إلا** لو انت موقّفه بإيدك |

### شفت إعادة التشغيل بعيني

container بيطبع الوقت ويخرج بـ 1 على طول، بـ [[unless-stopped]]، وسبته ١٢ ثانية:

~~~bash
docker run -d --restart unless-stopped --name dk03-loop alpine sh -c "date +%T; exit 1"
docker logs dk03-loop
~~~

~~~text الناتج
12:01:08
12:01:09
12:01:09
12:01:10
12:01:11
12:01:13
12:01:17
~~~

بص على الفرق بين الأوقات: صفر، ثانية، ثانية، ثانيتين، ٤. ده الـ backoff: كل ما يقع تاني Docker بيستنى ضعف المدة قبل ما يرجّعه، عشان crash loop ميحرقش المعالج. و [[docker ps -a]] وقتها كان كاتب [[Restarting (1) 4 seconds ago]]، والرقم بين القوسين هو الـ exit code.

ونفس الفكرة بـ [[on-failure:3]]: الـ container اشتغل ٤ مرات (الأولى + ٣ محاولات) ووقف نهائي:

~~~text الناتج
Exited (1) 1 second ago   RestartCount=3
~~~

---

## ٢. [[docker update --restart unless-stopped api]]

[[update]] بيغيّر إعدادات container موجود من غير ما تمسحه وتعمله من جديد. عملت container من غير [[--restart]] وبصيت على قاعدته، وبعدين غيّرتها:

~~~text الناتج
[no]
dk03-api2
unless-stopped
~~~

السطر الأول القاعدة الافتراضية [[no]]. و [[update]] بيطبع اسم الـ container لو نجح. والتالت بعد التغيير.

---

## ٣. [[docker inspect --format '{{.HostConfig.RestartPolicy.Name}}' api]]

[[inspect]] بيطلّع كل تفاصيل الـ container كـ JSON طويل جدًا. [[--format]] بياخد قالب (Go template) يطلّع منه خانة واحدة:

- [[{{ }}]]: الأقواس دي معناها «حط هنا قيمة».
- [[.HostConfig]]: قسم الإعدادات اللي اتحطت وقت التشغيل.
- [[.RestartPolicy.Name]]: اسم القاعدة جوه القسم ده.

~~~text الناتج
unless-stopped
~~~

ولـ [[on-failure:3]] فيه خانة تانية للعدد: [[{{.HostConfig.RestartPolicy.Name}} {{.HostConfig.RestartPolicy.MaximumRetryCount}}]] طبعت [[on-failure 3]].

---

## «بإيدك» يعني إيه بالظبط؟

[[docker stop]] و [[docker kill]] الاتنين بيتحسبوا إيقاف بإيدك. جربت [[docker kill]] على container بـ [[unless-stopped]]، وبعد ثواني لسه [[Exited (137)]] ومرجعش. اللي بيرجع هو الوقوع اللي من التطبيق نفسه (الـ process خرجت لوحدها).

والـ reboot نفسه مجربتوش هنا (ده Docker Desktop مش سيرفر)، والكلام عنه من الـ docs: بعد ما خدمة docker تقوم مع السيرفر، بتشغّل كل container قاعدته [[always]] أو [[unless-stopped]] ومكانش موقوف بإيدك.

## الخلاصة

~~~text
--restart unless-stopped   القاعدة المناسبة للإنتاج
docker update --restart    تغيّر القاعدة من غير ما تعيد الـ container
inspect --format           تقرا القاعدة: .HostConfig.RestartPolicy.Name
Restarting (1)             crash loop: الرقم هو الـ exit code، واقرا logs
stop و kill                بيتحسبوا إيقاف بإيدك، فـ unless-stopped ميرجّعوش
~~~`,
          lines: [
            "شغّل بسياسة: ارجع إلا لو انا وقّفتك.",
            "غيّر السياسة لـ container شغال.",
            "اتأكد من السياسة الحالية."
          ],
          sol: R`بعد [[sudo reboot]] ورجوع SSH، [[docker ps]] بيوري الـ container [[Up X seconds]] (أو دقايق) من غير ما تعمل حاجة. و [[docker inspect --format '{{.HostConfig.RestartPolicy.Name}}' api]] بيطبع [[unless-stopped]].

ده بيشتغل لأن خدمة Docker نفسها بتقوم مع الجهاز ([[systemctl is-enabled docker]] بيقول [[enabled]]) وبتشغّل الـ containers اللي الـ policy بتاعتها بتقول كده.

الغلط الشائع: لو عملت [[docker stop api]] قبل الـ reboot، مش هيرجع، وده معنى unless-stopped بالظبط. ولو خدمة docker نفسها مش enabled مفيش حاجة هترجع: [[sudo systemctl enable docker]].`
        },
        {
          cmd: "ليه الـ container وقع",
          title: "اقرا سبب الوقوع",
          desc: "[[ps -a]] بيوريك Exited ورقم بين قوسين: 0 خلص طبيعي، و 1 error في التطبيق، و 137 اتقتل بـ SIGKILL (غالبًا رام أكتر من المسموح، واتأكد من OOMKilled في inspect)، و 143 استلم إشارة إغلاق. [[logs]] هتقولك الـ error، و [[inspect]] الوقت والسبب.",
          example: R`docker ps -a --filter status=exited
docker logs --tail 50 api
docker inspect --format '{{.State.ExitCode}} {{.State.Error}} {{.State.FinishedAt}}' api
docker events --since 1h --filter container=api`,
          try: "شغّل container بأمر غلط عمدًا زي [[docker run --name bad node:22-alpine node nothing.js]] واقرا الـ exit code واللوج.",
          deep: {
            why: "«الـ container واقف» مش معلومة كفاية. لازم تعرف وقع إزاي، لأن كل سبب ليه حل مختلف.",
            how: R`الـ exit code هو المفتاح. [[0]]: العملية خلصت طبيعي، غالبًا CMD بيخلص ويخرج (زي سكربت مش سيرفر). [[1]]: error في التطبيق، اللوج فيه الـ stack trace. [[137]]: 128+9، يعني اتقتل بـ SIGKILL، وغالبًا السبب out of memory (الـ container عدّى حد الرام أو السيرفر نفسه خلص رام). [[143]]: 128+15، استلم SIGTERM وقفل عادي، يعني حد عمله stop. (ولو التطبيق متجاهل SIGTERM، [[stop]] بيستنى ١٠ ثواني ويقتله بـ SIGKILL، فتطلع 137 مش 143.) [[126]] أو [[127]]: الأمر في CMD مش موجود أو مش قابل للتشغيل.

[[inspect]] بـ State بيوريك الـ ExitCode و OOMKilled (true لو اتقتل بسبب الرام) و FinishedAt.

[[events]] بيسجّل كل حاجة حصلت: start و die و oom و restart، بالوقت. مفيد لما الـ container بيقع كل فترة وعايز تعرف إمتى.

وغلطة شائعة في التطبيقات: بتقوم قبل ما قاعدة البيانات تبقى جاهزة، فتفشل في الاتصال وتقع. الحل depends_on مع healthcheck، أو retry في كود الاتصال.`,
            when: "أي Exited أو Restarting في [[ps]].",
            mistakes: "تعيد التشغيل من غير ما تقرا الـ exit code واللوج، فيقع تاني بعد دقيقة."
          },
          teach: R`## الفكرة: ٣ أسئلة لأي container واقف

لما container يقف، بتسأل: خرج بأنهي رقم؟ قال إيه قبل ما يقع؟ وإمتى حصل ده؟ كل سطر في المثال بيجاوب سؤال. جربتهم كلهم على Docker Desktop 29.6.1 بـ containers اسمها [[dk03-...]]، كل واحد وقّعته بطريقة مختلفة عشان نشوف كل الأرقام.

---

## ١. [[docker ps -a --filter status=exited]]

- [[ps]]: اعرض الـ containers. لوحده بيعرض الشغالين بس.
- [[-a]] (all): كمان الواقفين.
- [[--filter status=exited]]: الواقفين بس.

~~~text الناتج
IMAGE            COMMAND                  STATUS                         NAMES
node:22-alpine   "docker-entrypoint.s…"   Exited (137) Less than a sec   dk03-oom
alpine           "sleep 300"              Exited (137) 2 seconds ago     dk03-killed
alpine           "sleep 300"              Exited (137) 3 seconds ago     dk03-term
alpine           "echo hi"                Exited (0) 15 seconds ago      dk03-ok
node:22-alpine   "docker-entrypoint.s…"   Exited (1) 22 seconds ago      dk03-bad
~~~

(شلت عمود الـ ID والوقت عشان يتقري.) الرقم بين القوسين في [[STATUS]] هو الـ **exit code**: الرقم اللي البرنامج خرج بيه. ده أول خيط.

### الأرقام دي جت منين؟

| الـ container | عملت فيه إيه | الرقم |
|---|---|---|
| [[dk03-ok]] | [[echo hi]] وخلص | [[0]] |
| [[dk03-bad]] | [[node nothing.js]] والملف مش موجود | [[1]] |
| [[dk03-killed]] | [[docker kill]] | [[137]] |
| [[dk03-oom]] | [[--memory 64m]] وكود بياكل رام | [[137]] |
| [[dk03-term]] | [[docker stop]] لـ [[sleep]] | [[137]] |
| [[dk03-term2]] | [[docker stop]] لـ [[sleep]] مع [[--init]] | [[143]] |
| [[dk03-nocmd]] | أمر مش موجود [[nosuchcmd]] | [[127]] |

**ليه 137 و 143؟** لما process تموت بإشارة (signal)، الرقم بيبقى 128 + رقم الإشارة. [[SIGKILL]] رقمها 9، فـ 128+9 = 137. و [[SIGTERM]] رقمها 15، فـ 128+15 = 143.

**وليه [[docker stop]] طلّع 137 مرة و 143 مرة؟** [[stop]] بيبعت SIGTERM الأول ويستنى ١٠ ثواني، ولو البرنامج مقفلش بيبعت SIGKILL. البرنامج اللي شغال كـ PID 1 جوه الـ container مبيقفلش بـ SIGTERM إلا لو كاتب كود يتعامل معاها، و [[sleep]] مش كاتب، فاستنى ١٠ ثواني واتقتل (137). مع [[--init]] فيه process صغيرة اسمها tini بقت هي PID 1 وبتوصّل الإشارة لـ sleep، فقفل على طول (143) في نص ثانية.

---

## ٢. [[docker logs --tail 50 api]]

- [[logs]]: كل اللي البرنامج طبعه على الشاشة (stdout و stderr)، حتى بعد ما وقف.
- [[--tail 50]]: آخر ٥٠ سطر بس، لأن الـ error دايمًا في الآخر.

~~~text docker logs dk03-bad (آخره)
Error: Cannot find module '/nothing.js'
    at Function._resolveFilename (node:internal/modules/cjs/loader:1430:15)
    ...
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

Node.js v22.23.3
~~~

هنا السبب الحقيقي: الملف مش موجود. و [[/nothing.js]] في الـ root لأن الـ WORKDIR في صورة node هو [[/]].

---

## ٣. [[docker inspect --format '{{.State.ExitCode}} {{.State.Error}} {{.State.FinishedAt}}' api]]

[[.State]] قسم في الـ inspect فيه حالة الـ container:

- [[.State.ExitCode]]: نفس الرقم اللي في ps.
- [[.State.Error]]: غلطة من Docker نفسه (مش من البرنامج).
- [[.State.FinishedAt]]: وقف إمتى (بتوقيت UTC، عشان كده الـ [[Z]] في الآخر).
- [[.State.OOMKilled]] (زوّدتها): [[true]] لو الكيرنل قتله عشان عدّى حد الرام.

~~~text الناتج لكل واحد
dk03-bad:    1   2026-10-06T12:01:42.483132068Z OOMKilled=false
dk03-killed: 137  2026-10-06T12:02:01.945512952Z OOMKilled=false
dk03-oom:    137  2026-10-06T12:02:04.14154128Z OOMKilled=true
dk03-nocmd:  127 failed to create task for container: ... exec: "nosuchcmd": executable file not found in $PATH 0001-01-01T00:00:00Z
~~~

بص على حاجتين:

- [[dk03-killed]] و [[dk03-oom]] الاتنين 137، و [[OOMKilled]] هو اللي بيفرّق: قتل بإيد ولا رام خلصت.
- [[.State.Error]] فاضي في كل الحالات إلا [[dk03-nocmd]]، لأن دي الحالة الوحيدة اللي Docker نفسه فشل فيها يشغّل البرنامج. ولما البرنامج يقع لوحده، Docker عمل شغله صح فمفيش Error. ووقت [[0001-01-01]] معناه إنه عمره ما اشتغل أصلًا.

---

## ٤. [[docker events --since 1h --filter container=api]]

[[events]] سجل Docker لكل اللي حصل: create و start و kill و die و oom. لوحده بيفضل مستني أحداث جديدة، فزوّدت [[--until 0s]] عشان يطبع اللي فات ويخرج.

- [[--since 1h]]: من ساعة لحد دلوقتي.
- [[--filter container=api]]: الـ container ده بس.

~~~text docker events --since 5m --until 0s --filter container=dk03-term (مختصر)
15:01:50.13 container create ... name=dk03-term
15:01:50.47 container start ...
15:01:50.75 container kill ... signal=15
15:02:00.79 container kill ... signal=9
15:02:01.12 container die ... exitCode=137
15:02:01.12 container stop ...
~~~

ده [[docker stop]] بالتفصيل: [[signal=15]] (SIGTERM)، وبعد ١٠ ثواني بالظبط [[signal=9]] (SIGKILL)، وبعدها [[die]] بـ 137. ولـ [[dk03-oom]] الأحداث كانت [[start]] وبعدها [[oom]] وبعدها [[die]].

> الفلتر بيطابق جزء من الاسم: [[container=dk03-term]] جاب كمان أحداث [[dk03-term2]]. لو الأسماء متشابهة استخدم الـ ID.

---

## الحل (solCode) سطر سطر

| السطر | بيعمل إيه |
|---|---|
| [[docker run --name bad node:22-alpine node nothing.js]] | container يقع عمدًا بـ 1 |
| [[docker ps -a --filter name=bad]] | تشوف [[Exited (1)]] |
| [[docker inspect --format '...' bad]] | الرقم والوقت، والـ Error فاضي |
| [[docker logs bad]] | السبب: [[Cannot find module]] |
| [[docker rm bad]] | امسحه، لأنه واقف بس لسه موجود |

## الخلاصة

~~~text
0      خلص طبيعي (السكربت انتهى)
1      التطبيق وقع: اقرا logs
126    الأمر موجود بس مش قابل للتشغيل
127    الأمر مش موجود، و .State.Error فيه السبب
137    SIGKILL: شوف OOMKilled، أو stop لبرنامج متجاهل SIGTERM، أو kill
143    SIGTERM: اتقفل بـ stop عادي
~~~`,
          lines: [
            "الواقفين بس.",
            "آخر ٥٠ سطر: الـ error هنا.",
            "رقم الخروج، ورسالة الخطأ، ووقت الوقوع.",
            "كل الأحداث لـ api في آخر ساعة."
          ],
          sol: R`[[docker ps -a]] بيوري [[bad]] بحالة [[Exited (1)]]. و [[docker inspect --format '{{.State.ExitCode}} {{.State.Error}} {{.State.FinishedAt}}' bad]] بيطبع [[1]] وبعدها وقت الوقوع (الـ Error فاضي لأن Docker نفسه ماغلطش، البرنامج هو اللي خرج).

و [[docker logs bad]] بيوري السبب الحقيقي: [[Error: Cannot find module '/nothing.js']] و [[code: 'MODULE_NOT_FOUND']]. لاحظ إن المسار [[/nothing.js]] لأن الـ WORKDIR في صورة node هو [[/]].

قاعدة الأرقام: 1 = التطبيق نفسه وقع (اقرا اللوج)، 137 = اتقتل (OOM أو stop بعد مهلة، شوف [[.State.OOMKilled]])، 139 = segfault، 127 = الأمر مش موجود. والغلط الشائع إنك تدوّر في [[.State.Error]] بس وتلاقيه فاضي فتفتكر مفيش مشكلة.`,
          solCode: R`docker run --name bad node:22-alpine node nothing.js
docker ps -a --filter name=bad
docker inspect --format '{{.State.ExitCode}} {{.State.Error}} {{.State.FinishedAt}}' bad
docker logs bad
docker rm bad`
        },
        {
          cmd: "حدود الموارد",
          title: "container واحد ميوقعش السيرفر",
          desc: "من غير حدود، تطبيق فيه memory leak ياكل رام السيرفر كله ويوقع كل حاجة. الحدود بتخلي Docker يقتل الـ container ده بس. في compose بتتحط تحت [[deploy.resources]].",
          example: R`docker run -d --memory 512m --cpus 1 --name api myapi
docker update --memory 1g api
docker stats --no-stream`,
          try: "حط حد 64m على تطبيق Node وشغّله: هيتقتل بـ 137. ارفع الحد وشوف الفرق.",
          deep: {
            why: "السيرفر عليه تطبيقك وقاعدة بيانات و Nginx. لو التطبيق فيه memory leak، هياكل الرام كله، ولينكس هيبدأ يقتل عمليات عشوائية، وممكن يقتل قاعدة البيانات. الحد بيخلي التطبيق هو اللي يتقتل بس.",
            how: R`[[--memory 512m]] حد الرام. لو الـ container عدّاه، الكيرنل بيقتله (exit 137) و Docker يرجّعه لو فيه restart policy. [[--cpus 1]] يقدر يستخدم معالج واحد بالكامل، أو [[0.5]] نصه.

[[stats]] بيوريك الاستخدام الحالي مقارنة بالحد، فتعرف تحط حدود واقعية: شغّل التطبيق أسبوع، شوف أقصى استهلاك، وحط الحد ضعفه.

Node لوحده مش بيعرف بالحد وممكن يحاول ياخد أكتر. [[NODE_OPTIONS=--max-old-space-size=400]] بيقول لـ Node متعدّيش 400 ميجا، وده لازم يبقى أقل من حد الـ container.

في compose تحت الخدمة: [[deploy: resources: limits: memory: 512M]]، وبتشتغل مع compose العادي.`,
            when: "كل container على سيرفر مشترك. خصوصًا لو السيرفر رامه صغير.",
            mistakes: "حد أقل من اللي التطبيق محتاجه فعلًا، فيفضل يتقتل ويرجع (137 باستمرار). وقاعدة بيانات بحد رام صغير فتبقى بطيئة جدًا."
          },
          teach: R`## الفكرة: سقف لكل container

من غير حدود، أي container يقدر ياخد رام ومعالج السيرفر كله. المثال بيحط سقف وقت التشغيل، ويعلّيه لـ container شغال، ويقارن الاستهلاك بالسقف. جربت كله على Docker Desktop 29.6.1 بـ container اسمه [[dk03-api]] من [[node:22-alpine]] (بدل [[myapi]]).

---

## ١. [[docker run -d --memory 512m --cpus 1 --name api myapi]]

### [[--memory 512m]]

أقصى رام. [[m]] ميجا و [[g]] جيجا. Docker بيحوّلها بايت:

~~~text docker inspect --format 'Memory={{.HostConfig.Memory}} MemorySwap={{.HostConfig.MemorySwap}}' dk03-api
Memory=536870912 MemorySwap=1073741824
~~~

536870912 = 512 × 1024 × 1024. و [[MemorySwap]] ضعفها: لو محطتش [[--memory-swap]]، Docker بيسمح بـ swap قد الرام كمان (الرقم ده رام + swap مع بعض).

### [[--cpus 1]]

أقصى معالج واحد كامل. ممكن كسور: [[0.5]] نص معالج. جربت container بيلف في loop فاضي وبياكل كل اللي يقدر عليه، مرة بـ [[--cpus 1]] ومرة بـ [[0.5]]:

~~~text docker stats --no-stream
NAME        CPU %     MEM USAGE / LIMIT
dk03-cpu    100.04%   372KiB / 15.33GiB
dk03-cpu2   50.03%    376KiB / 15.33GiB
~~~

الـ CPU وقف عند السقف بالظبط. ولاحظ [[15.33GiB]] في عمود الحد: الـ containers دي من غير [[--memory]]، فالحد هو رام الماكينة كلها (هنا الماكينة الافتراضية بتاعة Docker Desktop).

### الحد بيتطبّق فين؟

الكيرنل بتاع لينكس هو اللي بيطبّقه، عن طريق cgroups (control groups). تقدر تقراه من جوه الـ container:

~~~bash
docker run --rm --cpus 0.5 --memory 512m alpine cat /sys/fs/cgroup/cpu.max /sys/fs/cgroup/memory.max
~~~

~~~text الناتج
50000 100000
536870912
~~~

[[50000 100000]] معناها: كل ١٠٠ ألف ميكروثانية (عُشر ثانية) مسموحلك بـ ٥٠ ألف منهم، يعني نص معالج.

---

## ٢. [[docker update --memory 1g api]]

[[update]] بيغيّر الحد لـ container شغال من غير restart:

~~~text الناتج
dk03-api
Memory=1073741824 MemorySwap=1073741824
~~~

لاحظ إن [[MemorySwap]] بقى قد [[Memory]] بالظبط، يعني swap صفر. لو عايز swap كمان: [[docker update --memory 1g --memory-swap 2g dk03-api]].

---

## ٣. [[docker stats --no-stream]]

[[stats]] بيعرض استهلاك كل container شغال لايف، و [[--no-stream]] يطبع مرة واحدة ويخرج (من غيره بيفضل يحدّث لحد Ctrl+C).

~~~text docker stats --no-stream dk03-api (بعد الـ update)
NAME       CPU %     MEM USAGE / LIMIT   MEM %     NET I/O       BLOCK I/O   PIDS
dk03-api   0.05%     8.094MiB / 1GiB     0.79%     742B / 126B   0B / 0B     7
~~~

| العمود | معناه |
|---|---|
| [[CPU %]] | 100% = معالج واحد كامل، فممكن يعدّي 100 لو مسموحله بأكتر من واحد |
| [[MEM USAGE / LIMIT]] | المستخدم / السقف (بقى [[1GiB]] بعد الـ update) |
| [[MEM %]] | المستخدم ÷ السقف |
| [[NET I/O]] | داخل / خارج على الشبكة |
| [[BLOCK I/O]] | قراية / كتابة على الديسك |
| [[PIDS]] | عدد الـ processes والـ threads جواه |

---

## ٤. الحل: نشوف الـ OOM بعينينا

~~~bash
docker run --name oom --memory 64m node:22-alpine node -e "const a=[];while(true)a.push(Buffer.alloc(1e6,1))"
~~~

- [[node -e "..."]]: نفّذ الكود ده على طول من غير ملف.
- [[Buffer.alloc(1e6,1)]]: احجز ميجا (1e6 = مليون بايت) واملاها بـ 1، عشان الرام تتحجز بجد.
- [[a.push(...)]] في [[while(true)]]: ضيفهم في array وماتسيبهمش، للأبد.

الأمر خرج لوحده بـ [[137]] (الـ [[run]] نفسه رجّع 137). وبعدها:

~~~text docker inspect --format '{{.State.ExitCode}} OOMKilled={{.State.OOMKilled}}' oom
137 OOMKilled=true
~~~

OOM = Out Of Memory. الكيرنل قتل الـ container ده بس، والجهاز وباقي الـ containers ماحسّوش بحاجة. وده الهدف كله. و [[docker rm oom]] في الآخر عشان تمسحه.

---

## نفس الحدود في compose

~~~text compose.yml
services:
  api:
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: "1"
~~~

جربته بـ [[docker compose up -d]] العادي، و inspect طلّع [[Memory=536870912 NanoCpus=1000000000]]: نفس [[--memory 512m --cpus 1]] بالظبط. ([[NanoCpus]] = عدد المعالجات × مليار.)

## الخلاصة

~~~text
--memory 512m        سقف رام، ولو عدّاه: 137 و OOMKilled=true
--cpus 1             سقف معالج، 0.5 = نص معالج
docker update        يغيّر السقف لـ container شغال
stats --no-stream    الاستهلاك مقارنة بالسقف، مرة واحدة
deploy.resources     نفس الكلام في compose
~~~`,
          lines: ["أقصى 512 ميجا رام ومعالج واحد.", "زوّد الحد لـ container شغال.", "الاستهلاك مقارنة بالحد."],
          sol: R`مع [[--memory 64m]] وتطبيق بياكل ذاكرة، الـ container بيقف و [[docker inspect --format '{{.State.ExitCode}} {{.State.OOMKilled}}' api]] بيطبع [[137 true]]. جربتها بسكربت بيحجز 1MB ورا التاني، واتقتل بـ 137 و OOMKilled=true.

مع حد أكبر (مثلًا 512m) نفس السكربت لحد 100MB خلص عادي بـ 0. و [[docker stats --no-stream]] بيوري الحد في [[MEM USAGE / LIMIT]] زي [[45MiB / 512MiB]].

الغلط الشائع: Node التطبيق نفسه يقع بـ [[JavaScript heap out of memory]] (exit 134) قبل ما يوصل للحد، أو يتقتل فجأة من غير رسالة. خلّي [[--max-old-space-size]] أقل من حد الـ container بحوالي ٢٥٪، وماتحطش الحد أقل من اللي التطبيق بياخده فعلًا في [[docker stats]].`,
          solCode: R`docker run --name oom --memory 64m node:22-alpine node -e "const a=[];while(true)a.push(Buffer.alloc(1e6,1))"
docker inspect --format '{{.State.ExitCode}} OOMKilled={{.State.OOMKilled}}' oom
docker rm oom`
        },
        {
          cmd: "نسخ وباك أب",
          title: "ملفات ومقاعد بيانات",
          desc: "[[docker cp]] ينقل ملفات بين جهازك والـ container. وباك أب volume بيتعمل بـ container مؤقت يربط الـ volume ويضغطه. وقاعدة البيانات الأصح [[pg_dump]] من جوه container القاعدة.",
          example: R`docker cp api:/app/logs ./logs
docker cp ./config.json api:/app/config.json
docker run --rm -v pgdata:/data -v $(pwd):/backup alpine tar czf /backup/pgdata.tar.gz -C /data .
docker exec db pg_dump -U postgres app | gzip > db-$(date +%F).sql.gz`,
          try: "اعمل باك أب للـ volume، امسحه، وارجّعه من الأرشيف بنفس الفكرة مع [[tar xzf]].",
          deep: {
            why: "محتاج تطلّع لوجات أو ملفات من container، وتدخّل ملف إعدادات، وأهم حاجة: باك أب للبيانات اللي في الـ volumes.",
            how: R`[[cp]] بينقل بين جهازك والـ container في الاتجاهين، والصيغة [[container:مسار]]. بيشتغل حتى لو الـ container واقف.

الـ volumes مش ملفات عادية تنسخها. الحيلة: تشغّل container مؤقت (alpine صغير) بيربط الـ volume على [[/data]] وفولدر من جهازك على [[/backup]]، ويعمل tar من الأول للتاني. [[--rm]] يمسح الـ container بعد ما يخلص. والرجوع بنفس الفكرة مع [[tar xzf]].

بس لقاعدة البيانات، نسخ ملفات الـ volume وهي شغالة ممكن يدّي نسخة متكسرة (الملفات بتتغير أثناء النسخ). الأصح [[pg_dump]] من جوه container القاعدة: بيطلّع نسخة متماسكة والقاعدة شغالة. والناتج بيخرج من الـ container بالـ pipe لجهازك ويتضغط.`,
            when: "pg_dump يومي في cron. باك أب volumes قبل أي تحديث كبير أو نقل سيرفر.",
            mistakes: "باك أب للـ volume بتاع القاعدة وهي شغالة بدل pg_dump. وباك أب على نفس السيرفر بس."
          },
          teach: R`## الفكرة: ملفات بتدخل وتخرج من الـ container

المثال فيه ٣ أنواع نقل: ملف أو فولدر عادي ([[docker cp]])، و volume كامل (container مؤقت بيعمل tar)، وقاعدة بيانات ([[pg_dump]]). جربت كله على Docker Desktop 29.6.1 من Git Bash، بـ container اسمه [[dk03-api]]، وقاعدة [[dk03-db]] من [[postgres:16-alpine]] على volume اسمه [[dk03-pgdata]]، فيها جدول [[users]] بصفين.

---

## ١. [[docker cp api:/app/logs ./logs]]

- [[cp]] (copy): انسخ.
- [[api:/app/logs]]: المصدر. اسم الـ container، وبعده [[:]]، وبعده المسار **جوه** الـ container.
- [[./logs]]: الهدف على جهازك. [[.]] الفولدر اللي انت فيه.

~~~text ls logs
access.log
error.log
~~~

الفولدر اتنسخ بكل اللي فيه. ولو المسار غلط:

~~~text الناتج
Error response from daemon: Could not find the file /nope in container dk03-api
~~~

و [[cp]] بيشتغل حتى لو الـ container واقف: وقّفته ونسخت منه ملف عادي. ده مفيد لما تطلّع لوجات من container وقع.

---

## ٢. [[docker cp ./config.json api:/app/config.json]]

نفس الأمر بالعكس: من جهازك للـ container. الجهة اللي فيها [[اسم:]] هي الـ container دايمًا.

~~~text docker exec dk03-api ls -l /app
-rwxr-xr-x    1 root     root            16 Oct  6 12:03 config.json
drwxr-xr-x    2 root     root          4096 Oct  6 12:03 logs
~~~

> الملف اللي بتدخّله بـ cp بيضيع لما الـ container يتعمل من جديد (Recreate). للإعدادات الدايمة استخدم bind mount أو volume.

---

## ٣. باك أب الـ volume

~~~bash
docker run --rm -v pgdata:/data -v $(pwd):/backup alpine tar czf /backup/pgdata.tar.gz -C /data .
~~~

الـ volume مش فولدر عادي على جهازك تقدر تفتحه. الحيلة: container صغير يشوف الاتنين (الـ volume وفولدرك) وينسخ من ده لده. نفكّه حتة حتة:

| الحتة | معناها |
|---|---|
| [[docker run --rm]] | شغّل container، و [[--rm]] امسحه أول ما يخلص |
| [[-v pgdata:/data]] | اربط الـ volume اللي اسمه pgdata على [[/data]] جوه |
| [[-v $(pwd):/backup]] | اربط فولدرك الحالي على [[/backup]] جوه. [[$(pwd)]] بيتبدّل بمسار الفولدر اللي انت فيه |
| [[alpine]] | صورة لينكس صغيرة فيها tar |
| [[tar czf /backup/pgdata.tar.gz]] | اعمل أرشيف: [[c]] create، [[z]] اضغط gzip، [[f]] الاسم اللي بعدي |
| [[-C /data .]] | ادخل [[/data]] الأول وخد كل اللي فيه ([[.]])، عشان المسارات جوه الأرشيف تبدأ من غير [[/data]] |

الأرشيف بيتكتب في [[/backup]]، اللي هو فولدرك، فبيفضل بعد ما الـ container يتمسح.

### قبلها وقّف القاعدة

[[docker stop dk03-db]] الأول، عشان Postgres ميبقاش بيكتب في الملفات وانت بتنسخها. الأرشيف طلع حوالي 6.6MB لقاعدة شبه فاضية.

### الاسترجاع (الحل)

~~~text محاولة مسح الـ volume والـ container لسه موجود
Error response from daemon: remove dk03-pgdata: volume is in use - [80ababf8c692...]
~~~

حتى container **واقف** بيمسك الـ volume. فمسحت [[dk03-db]] الأول، وبعدين [[docker volume rm]] و [[docker volume create]]، وبعدين نفس الحيلة بالعكس:

~~~bash
docker run --rm -v pgdata:/data -v $(pwd):/backup alpine sh -c "tar xzf /backup/pgdata.tar.gz -C /data && ls /data"
~~~

[[x]] بدل [[c]] يعني extract (فك). و [[sh -c "..."]] عشان نشغّل أمرين ورا بعض جوه نفس الـ container.

~~~text الناتج (أوله)
PG_VERSION
base
global
pg_commit_ts
...
~~~

وبعد ما شغّلت Postgres على الـ volume المسترجع:

~~~text docker exec dk03-db psql -U postgres -d app -c "SELECT * FROM users"
 id | name
----+------
  1 | Sara
  2 | Omar
(2 rows)
~~~

> على ويندوز: في Git Bash [[$(pwd)]] بيطلع [[/d/...]] وده بيلخبط Docker، فاستخدمت [[$(pwd -W)]] (بيطلع [[D:/...]]). وفي PowerShell اكتب [[-v "$__{PWD}:/backup"]]، والعلامات مهمة لو المسار فيه مسافات. على السيرفر اللينكس [[$(pwd)]] عادي.

---

## ٤. [[docker exec db pg_dump -U postgres app | gzip > db-$(date +%F).sql.gz]]

من جوه لبره:

1. [[docker exec db]]: شغّل أمر جوه container القاعدة.
2. [[pg_dump -U postgres app]]: اطبع قاعدة [[app]] كلها كأوامر SQL. [[-U postgres]] اليوزر.
3. [[|]]: الناتج اللي اتطبع يخرج من الـ container ويدخل الأمر اللي بعده **على جهازك**.
4. [[gzip]]: اضغطه.
5. [[> db-$(date +%F).sql.gz]]: اكتبه في ملف. [[date +%F]] بيطبع التاريخ بالشكل [[2026-10-06]]، فالاسم بقى [[db-2026-10-06.sql.gz]].

الملف طلع 554 بايت. ولو فكّيته ([[zcat]]) هتلاقي جوه أوامر SQL عادية:

~~~text أهم سطور الملف
CREATE TABLE public.users (
    id integer,
    name text
);
COPY public.users (id, name) FROM stdin;
1	Sara
2	Omar
\.
~~~

ده أأمن من tar للقاعدة: pg_dump بيطلّع نسخة متماسكة والقاعدة شغالة، ومش مربوطة بنسخة Postgres (tar بيحتاج نفس النسخة: [[PG_VERSION]] كان [[16]]).

## الخلاصة

| عايز | الأمر |
|---|---|
| ملف من/لـ container | [[docker cp]]، والجهة اللي فيها [[اسم:]] هي الـ container |
| volume كامل | container مؤقت: [[-v vol:/data -v $(pwd):/backup alpine tar czf]] |
| قاعدة Postgres | [[docker exec db pg_dump]] وبعده pipe لـ [[gzip]] |
| ترجّع volume | volume فاضي جديد و [[tar xzf]] |`,
          lines: [
            "انسخ فولدر من الـ container لجهازك.",
            "انسخ ملف من جهازك للـ container.",
            "container مؤقت: الـ volume على /data، وفولدرك على /backup، واعمل tar من الأول للتاني (وقّف القاعدة الأول بـ docker stop db، وإلا النسخة ممكن تتكسر).",
            "الأصح للقاعدة: pg_dump من جوه container القاعدة، واضغط، والاسم بالتاريخ."
          ],
          sol: R`[[tar czf]] بيعمل [[pgdata.tar.gz]] في فولدرك (عندي حوالي 4.5MB لقاعدة فاضية فيها جدول واحد). بعد [[docker volume rm pgdata]] و [[docker volume create pgdata]] والاسترجاع بـ [[tar xzf /backup/pgdata.tar.gz -C /data]]، [[ls]] جوه الـ volume بيوري [[PG_VERSION]] و [[base]] و [[global]]، و Postgres بيقوم والجدول بصفوفه موجود.

الترتيب مهم: وقّف الـ container قبل الـ tar، عشان الملفات ماتبقاش بتتكتب وانت بتنسخها. عشان كده [[pg_dump]] أأمن لقواعد البيانات وهي شغالة.

الغلط الشائع: [[docker volume rm]] يرفض بـ [[volume is in use]]: فيه container (حتى لو واقف) لسه مربوط بيه، امسحه الأول. ولو الاسترجاع حصل في volume فيه بيانات قديمة، الملفات هتتخلط؛ ابدأ دايمًا بـ volume فاضي.`,
          solCode: R`docker stop db
docker run --rm -v pgdata:/data -v $(pwd):/backup alpine tar czf /backup/pgdata.tar.gz -C /data .
docker rm db && docker volume rm pgdata
docker volume create pgdata
docker run --rm -v pgdata:/data -v $(pwd):/backup alpine sh -c "tar xzf /backup/pgdata.tar.gz -C /data && ls /data"
docker run -d --name db -v pgdata:/var/lib/postgresql/data -e POSTGRES_PASSWORD=secret postgres:16-alpine`
        },
        {
          cmd: "التشخيص من جوه",
          title: "لما التطبيق مش بيرد",
          desc: "ادخل الـ container وجرّب من جواه: التطبيق بيسمع على البورت؟ بيوصل للقاعدة؟ متغيرات البيئة وصلت؟ الصور الصغيرة مفيهاش curl، فـ wget أو تسطّب أدوات مؤقتًا.",
          example: R`docker exec -it api sh
docker exec api wget -qO- http://localhost:3000/health
docker exec api env | grep DATABASE
docker exec api nc -zv db 5432
docker run --rm -it --network myapp_default alpine sh`,
          try: "من جوه api: اطلب health، وبعدين اتأكد إن db بيرد على 5432. لو الأولى فشلت المشكلة في التطبيق، لو التانية في الشبكة أو القاعدة.",
          deep: {
            why: "التطبيق شغال في [[ps]] بس الموقع بيطلع 502. المشكلة ممكن تكون في ٣ أماكن: التطبيق نفسه، أو الشبكة بين الـ containers، أو Nginx. التشخيص من جوه الـ container بيقسم المشكلة.",
            how: R`الترتيب: [[wget -qO- http://localhost:3000/health]] من جوه container التطبيق. لو رد، التطبيق شغال والمشكلة بره (Nginx أو البورت). لو مردّش، المشكلة في التطبيق: [[logs]] و [[env]].

[[env | grep DATABASE]] تتأكد إن المتغيرات وصلت بالقيم الصح. غلطة شائعة: DATABASE_URL فيه localhost بدل اسم الخدمة.

[[nc -zv db 5432]] من جوه التطبيق: القاعدة بترد؟ لو لأ، إما القاعدة واقعة أو مش على نفس الشبكة.

الصور الصغيرة مفيهاش أدوات. الحل الأنضف: container مؤقت من alpine على نفس شبكة المشروع (اسمها [[اسم_الفولدر_default]])، وتسطّب فيه اللي محتاجه: [[apk add curl bind-tools]]، وتشخّص منه من غير ما تلمس container الإنتاج.`,
            when: "502 و 504. التطبيق مش قادر يوصل للقاعدة. خدمتين مش بيكلموا بعض.",
            mistakes: "تسطّب أدوات جوه container الإنتاج بـ exec. مؤقتًا ماشي، بس الأنضف container تشخيص منفصل."
          },
          teach: R`## الفكرة: نقسم المشكلة لنصين

الموقع مش بيرد. يا إما التطبيق نفسه بايظ، يا إما مش قادر يوصل للقاعدة، يا إما المشكلة برّه خالص (Nginx أو البورت). كل سطر في المثال بيستبعد احتمال. جربتهم على Docker Desktop 29.6.1 بمشروع compose اسمه [[dk03-diag]]: خدمة [[api]] (container اسمه [[dk03-diag-api]] من [[node:22-alpine]]، سيرفر صغير بيرد [[ok]] على [[/health]])، وخدمة [[db]] من [[postgres:16-alpine]].

---

## ١. [[docker exec -it api sh]]

- [[exec]]: شغّل أمر جوه container **شغال**.
- [[-i]] (interactive): خلّي الإدخال مفتوح عشان تكتب.
- [[-t]] (tty): اعمل ترمنال حقيقي (البرومبت والألوان).
- [[sh]]: الشيل. الصور الصغيرة (alpine) مفيهاش [[bash]]، فـ [[sh]] هو اللي موجود دايمًا.

بعدها انت جوه الـ container، و [[exit]] يرجّعك. باقي السطور بتعمل نفس الحاجة بس أمر واحد ويخرج (من غير [[-it]] لأنها مش محتاجة تكتب فيها).

---

## ٢. [[docker exec api wget -qO- http://localhost:3000/health]]

- [[wget]]: يجيب صفحة. موجود في alpine (جزء من busybox)، أما [[curl]] لأ: [[which curl]] جوه [[node:22-alpine]] مطلّعش حاجة.
- [[-q]] (quiet): من غير سطور التحميل.
- [[-O-]]: اكتب الصفحة على الشاشة ([[-]]) بدل ما تحفظها في ملف.
- [[localhost]] هنا معناها **الـ container نفسه**، مش جهازك.

~~~text الناتج
ok
~~~

التطبيق شغال ويرد من جواه. يعني لو الموقع واقع، المشكلة برّه التطبيق. والحالتين الوحشين اللي جربتهم:

~~~text على بورت مفيش حد سامع عليه
wget: can't connect to remote host: Connection refused
~~~

~~~text على سيرفر بيرد 500
wget: server returned error: HTTP/1.1 500 Internal Server Error
~~~

الأولى معناها التطبيق مش سامع أصلًا (وقع أو على بورت تاني). التانية معناها شغال بس فيه bug، واللوج فيه التفاصيل.

---

## ٣. [[docker exec api env | grep DATABASE]]

- [[env]]: اطبع كل متغيرات البيئة اللي التطبيق شايفها.
- [[|]]: الناتج يتبعت للأمر اللي بعده. خد بالك: الـ pipe هنا بيحصل **على جهازك** مش جوه الـ container، و [[grep]] اللي بيشتغل هو بتاع جهازك.
- [[grep DATABASE]]: السطور اللي فيها الكلمة دي بس.

~~~text الناتج
DATABASE_URL=postgres://postgres:secret@db:5432/app
DATABASE_POOL=5
~~~

هنا بتتأكد إن المتغير وصل، وإن العنوان فيه [[db]] (اسم الخدمة) مش [[localhost]]. لأن [[localhost]] جوه container التطبيق هو التطبيق نفسه، مش القاعدة.

---

## ٤. [[docker exec api nc -zv db 5432]]

- [[nc]] (netcat): أداة بتفتح اتصال على بورت.
- [[-z]]: افتح الاتصال واقفله على طول من غير ما تبعت حاجة، يعني «البورت مفتوح؟» بس.
- [[-v]] (verbose): اطبع النتيجة.
- [[db 5432]]: اسم الخدمة والبورت.

~~~text الناتج
db (172.26.0.2:5432) open
~~~

الاسم [[db]] اتحوّل لـ IP على شبكة المشروع، والبورت مفتوح. والحالات التانية:

| اللي حصل | الناتج | معناه |
|---|---|---|
| اسم غلط ([[dbx]]) | [[nc: bad address 'dbx']] | الاسم مش معروف على الشبكة دي |
| [[docker compose stop db]] | [[nc: bad address 'db']] | container واقف بيختفي اسمه من الشبكة |
| بورت مقفول ([[5433]]) | ولا حرف، والـ exit code [[1]] | الاسم تمام، بس مفيش حد سامع |

خد بالك من الأخيرة: [[nc]] بتاع busybox مبيطبعش حاجة لما البورت مقفول، فلو مشفتش [[open]] اعتبره فشل.

---

## ٥. [[docker run --rm -it --network myapp_default alpine sh]]

- [[--network myapp_default]]: اربطه بشبكة المشروع. compose بيسمّيها [[اسم_المشروع_default]]، فعندي كانت [[dk03-diag_default]] ([[docker network ls]] يوريك الاسم).
- [[--rm]]: يتمسح لما تخرج.

container نضيف شايف نفس الأسامي اللي التطبيق شايفها، وتقدر تسطّب فيه أي أداة من غير ما تلمس container الإنتاج:

~~~bash
apk add curl bind-tools
curl -s http://api:3000/health
dig +short db
~~~

~~~text الناتج
OK: 20.1 MiB in 39 packages
ok
172.26.0.2
~~~

[[apk]] مدير الباكدجات في alpine. [[bind-tools]] فيها [[dig]] و [[nslookup]] لأسئلة الـ DNS، و [[dig +short db]] طبع نفس الـ IP اللي [[nc]] شافه.

## الخلاصة: الترتيب

| الخطوة | لو نجحت | لو فشلت |
|---|---|---|
| [[wget localhost:3000/health]] من جوه | التطبيق تمام، دوّر برّه | [[logs]] و [[env]] |
| [[env]] مع [[grep DATABASE]] | المتغيرات وصلت | راجع env file و compose |
| [[nc -zv db 5432]] | القاعدة بترد | [[bad address]] = شبكة أو اسم، سكوت = القاعدة مش سامعة |
| container alpine على الشبكة | أي أداة تحتاجها | [[docker network ls]] لاسم الشبكة |`,
          lines: [
            "ترمنال جوه التطبيق.",
            "التطبيق بيرد من جواه؟",
            "متغيرات القاعدة وصلت صح؟",
            "القاعدة بترد على البورت من جوه التطبيق؟",
            "container تشخيص مؤقت على شبكة المشروع."
          ],
          sol: R`الحالة السليمة: [[docker exec api wget -qO- http://localhost:3000/health]] بيطبع [[ok]] أو JSON، و [[docker exec api nc -zv db 5432]] بيطبع [[db (172.x.x.x:5432) open]].

لو الأولى طلعت [[wget: can't connect to remote host: Connection refused]]: التطبيق مش سامع أصلًا (وقع أو على بورت تاني)، اقرا [[docker logs api]]. ولو [[wget: server returned error: HTTP/1.1 500]]: التطبيق شغال بس فيه غلطة.

لو التانية طلعت [[nc: bad address 'db']]: الاتنين مش على نفس الشبكة، أو اسم الخدمة غلط، أو container القاعدة واقف (الواقف اسمه بيختفي من الشبكة). ولو مطبعش حاجة خالص وخرج بـ 1: الاسم اتحل بس مفيش حد سامع على البورت (Postgres لسه بيقوم أو على بورت تاني)، لأن [[nc]] بتاع busybox مبيطبعش رسالة في الحالة دي. والغلط الشائع: [[nc: not found]] في بعض الصور؛ استخدم [[docker run --rm -it --network myapp_default alpine sh]] وجرّب من هناك.`
        },
        {
          cmd: "الأمان",
          title: "٥ حاجات قبل الإنتاج",
          desc: "البورتات على 127.0.0.1 بس (Docker بيعدّي من الفايروول). التطبيق مش root. الصورة بنسخة محددة. الأسرار في env file مش في الـ image. وفحص الصورة بـ trivy قبل الرفع.",
          example: R`docker run -d -p 127.0.0.1:3000:3000 myapi
docker run --rm --read-only --tmpfs /tmp myapi
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image myapi:latest
docker history --no-trunc myapi | grep -i secret`,
          try: "افحص image بتاعتك بـ trivy واقرا النتايج. غالبًا هتلاقي ثغرات في نظام الـ image نفسه، وتحديث الـ base image بيحلها.",
          deep: {
            why: "Docker بيسهّل الأمان (عزل) وبيسهّل الأخطاء الأمنية (بورتات مفتوحة، و root، وأسرار في الصور). الخمس حاجات دي بتقفل أشهر المشاكل.",
            how: R`الأولى: البورتات. [[-p 3000:3000]] على سيرفر بيفتح 3000 للنت كله، و Docker بيعدّل iptables مباشرة فـ ufw مش بيحميك. [[127.0.0.1:3000:3000]] يخليه للسيرفر بس، و Nginx هو اللي بيطلع للنت.

التانية: [[USER]] في الـ Dockerfile عشان التطبيق ميبقاش root.

التالتة: [[--read-only]] بيخلي نظام ملفات الـ container للقراءة بس، فلو حد اخترق التطبيق مش هيقدر يكتب ملفات خبيثة. و [[--tmpfs /tmp]] لأن تطبيقات كتير محتاجة تكتب في /tmp.

الرابعة: الأسرار. [[docker history]] بيوريك كل تعليمة في الـ image، فلو حطيت سر في ENV أو RUN هيبان. الأسرار وقت التشغيل بس.

الخامسة: [[trivy]] بيفحص الـ image كلها (نظام التشغيل ومكتبات Node) ضد قاعدة الثغرات المعروفة. أغلب اللي هيلاقيه في الـ base image، وتحديثها ([[node:22-alpine]] لآخر نسخة) بيحله. وفي CI بيفشّل الـ build لو فيه critical.`,
            when: "قبل أول deploy، وبعدين trivy مع كل build في CI.",
            mistakes: "تعتمد على ufw وتفتكر بورتات Docker مقفولة. اختبر من بره بـ nmap."
          },
          teach: R`## الفكرة: ٤ سطور، كل سطر بيقفل باب

كل سطر في المثال بيعالج غلطة أمنية مشهورة: بورت مفتوح للنت كله، ونظام ملفات يتكتب فيه، وثغرات معروفة في الصورة، وسر متساب جوه الصورة. جربتهم على Docker Desktop 29.6.1 بصورة تجربة اسمها [[dk03-sec]] (بدل [[myapi]]): سيرفر Node صغير، و [[USER node]] في الـ Dockerfile، وفيها عمدًا سر في [[ENV]] عشان نشوف إزاي بيبان.

---

## ١. [[docker run -d -p 127.0.0.1:3000:3000 myapi]]

[[-p]] (publish) بياخد ٣ حتت مفصولة بـ [[:]]:

~~~text
127.0.0.1  :  3000          :  3000
IP الجهاز     البورت على الجهاز   البورت جوه الـ container
~~~

قارنت الشكلين بـ [[docker port]] (بيوريك البورتات المفتوحة لـ container):

~~~text -p 127.0.0.1:3902:3000
3000/tcp -> 127.0.0.1:3902
~~~

~~~text -p 3903:3000
3000/tcp -> 0.0.0.0:3903
3000/tcp -> [::]:3903
~~~

[[0.0.0.0]] معناها «كل كروت الشبكة»، يعني أي حد على النت يقدر يوصل لو السيرفر عليه IP عام، و [[::]] (مكتوبة بين أقواس مربعة) نفس الكلام لـ IPv6. أما [[127.0.0.1]] (localhost) فمحدش يوصله غير البرامج اللي على نفس الجهاز، زي Nginx. وعلى سيرفر لينكس Docker بيكتب قواعد iptables بنفسه قبل ufw، فـ ufw مش هيقفل البورت ده (الكلام ده من docs بتاعة Docker، لأن الجهاز هنا ويندوز).

---

## ٢. [[docker run --rm --read-only --tmpfs /tmp myapi]]

- [[--read-only]]: نظام ملفات الـ container كله للقراية بس.
- [[--tmpfs /tmp]]: استثناء: [[/tmp]] فولدر في الرام يتكتب فيه، وبيضيع لما الـ container يقف.

~~~bash
docker run --rm --read-only --tmpfs /tmp dk03-sec sh -c 'touch /app/x; touch /tmp/y && echo "tmp ok"; mount | grep " /tmp "'
~~~

~~~text الناتج
touch: /app/x: Read-only file system
tmp ok
tmpfs on /tmp type tmpfs (rw,nosuid,nodev,noexec,relatime)
~~~

[[touch]] بيعمل ملف فاضي. في [[/app]] رفض، وفي [[/tmp]] نجح. والسطر الأخير بيوري إن [[/tmp]] متركّب [[rw]] (يتكتب) بس [[noexec]]: حتى لو حد كتب فيه برنامج، ميقدرش يشغّله.

و [[docker exec dk03-sec1 whoami]] طبع [[node]] مش [[root]]، بسبب سطر [[USER node]] في الـ Dockerfile.

---

## ٣. [[docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image myapi:latest]]

trivy برنامج بيفحص الصورة ويقارن كل باكدج فيها بقاعدة الثغرات المعروفة (CVE). بنشغّله هو نفسه كـ container:

- [[aquasec/trivy]]: صورة trivy الرسمية.
- [[-v /var/run/docker.sock:/var/run/docker.sock]]: بنديله الـ socket اللي Docker بيتكلم منه، عشان يقدر يقرا الصورة اللي على جهازك. (ده صلاحية كبيرة، فمتديهاش غير لصور رسمية.)
- [[image myapi:latest]]: افحص الصورة دي.

أول مرة نزّل قاعدة الثغرات (حوالي 119MB، أخدت دقيقتين). زوّدت [[-v dk03-trivy-cache:/root/.cache]] عشان القاعدة تتحفظ في volume بدل ما تنزل كل مرة. الملخص (trivy 0.75.0):

~~~text الناتج (مختصر)
Detected OS  family="alpine" version="3.24.2"

Report Summary
│ dk03-sec:latest (alpine 3.24.2)   │ alpine   │ 0 │
│ opt/yarn-v1.22.22/package.json    │ node-pkg │ 0 │
│ .../pacote/package.json           │ node-pkg │ 1 │
...
Node.js (node-pkg)
Total: 21 (UNKNOWN: 0, LOW: 1, MEDIUM: 9, HIGH: 11, CRITICAL: 0)
~~~

وتحت جدول لكل ثغرة:

| العمود | معناه |
|---|---|
| [[Library]] | الباكدج، زي [[brace-expansion]] |
| [[Vulnerability]] | رقم الثغرة [[CVE-...]] |
| [[Severity]] | الخطورة: LOW / MEDIUM / HIGH / CRITICAL |
| [[Status]] | [[fixed]] فيه نسخة بتصلّحها، [[affected]] لسه مفيش |
| [[Installed Version]] | النسخة اللي عندك |
| [[Fixed Version]] | أول نسخة فيها الحل |

لاحظ: النظام نفسه (alpine) صفر ثغرات، والـ ٢١ كلهم في باكدجات جوه npm اللي جاي مع صورة [[node:22-alpine]]، مش في كود التطبيق. عشان كده الحل الأول دايمًا تحديث الـ base image. ولو عايز القايمة اللي تستاهل تتصلّح بس:

~~~text --severity HIGH,CRITICAL --ignore-unfixed
Node.js (node-pkg)
Total: 10 (HIGH: 10, CRITICAL: 0)
~~~

[[--ignore-unfixed]] شال اللي ملهاش [[Fixed Version]] لسه. والأرقام دي بتتغير كل يوم مع الـ base image وقاعدة الثغرات.

---

## ٤. [[docker history --no-trunc myapi | grep -i secret]]

[[history]] بيعرض كل تعليمة اتبنت بيها الصورة، طبقة طبقة. [[--no-trunc]] من غير ما يقص السطور الطويلة. و [[grep -i]] يدوّر من غير فرق بين capital و small.

~~~text docker history dk03-sec --format '{{.CreatedBy}}'
CMD ["node" "server.js"]
USER node
COPY server.js . # buildkit
RUN /bin/sh -c echo "token=abc" > /app/.npmr…
WORKDIR /app
ENV API_SECRET=sk_live_123
LABEL dk03=1
~~~

السر اللي في [[ENV]] ظاهر لأي حد عنده الصورة. والأسوأ سطر الـ [[RUN]]: الملف [[.npmrc]] اتمسح في نفس السطر، بس الأمر نفسه بالـ token متسجّل في التاريخ. و [[grep -i secret]] لقى سطر الـ ENV بس، ومشافش [[token]]؛ دوّر كمان على [[token]] و [[password]] و [[key]]. ولاحظ إن trivy مطلّعش السر ده (عمود Secrets كان [[-]]): الفحص الأوتوماتيك مش بديل إنك متحطش أسرار في الصورة أصلًا.

## الخلاصة

| الباب | السطر | اتأكد بـ |
|---|---|---|
| بورت مفتوح للنت | [[-p 127.0.0.1:3000:3000]] | [[docker port]] يقول [[127.0.0.1]] |
| تطبيق root | [[USER]] في الـ Dockerfile | [[docker exec ... whoami]] |
| كتابة ملفات خبيثة | [[--read-only --tmpfs /tmp]] | [[Read-only file system]] |
| ثغرات معروفة | [[trivy image]] | HIGH و CRITICAL اللي ليها Fixed Version |
| سر في الصورة | الأسرار وقت التشغيل بس | [[docker history --no-trunc]] |`,
          lines: [
            "البورت للسيرفر بس.",
            "نظام ملفات للقراءة بس، مع /tmp قابل للكتابة في الرام.",
            "افحص الصورة ضد الثغرات المعروفة.",
            "دوّر في تاريخ الصورة على أي سر اتحط بالغلط."
          ],
          sol: R`[[trivy image myapi:latest]] (بعد ما ينزل قاعدة الثغرات أول مرة) بيطبع جدول لكل مصدر: سطر للنظام زي [[myapi:latest (alpine 3.x)]] وسطر لـ [[Node.js]] (الباكدجات في package-lock). وتحت كل واحد [[Total: N (UNKNOWN: 0, LOW: .., MEDIUM: .., HIGH: .., CRITICAL: ..)]] وجدول فيه [[Library]] و [[Vulnerability]] (رقم CVE) و [[Installed Version]] و [[Fixed Version]].

ركّز على HIGH و CRITICAL اللي ليها [[Fixed Version]]. في النظام الحل غالبًا [[docker pull node:22-alpine]] وتبني تاني، وفي Node تحدّث الباكدج. جرّب [[--severity HIGH,CRITICAL --ignore-unfixed]] عشان القايمة تبقى مفيدة.

جربته على صورة مبنية على [[node:22-alpine]] (trivy 0.75.0): النظام (alpine 3.24.2) صفر، و [[Node.js]] طلع [[Total: 21 (UNKNOWN: 0, LOW: 1, MEDIUM: 9, HIGH: 11, CRITICAL: 0)]]، كلهم في باكدجات npm اللي جاية مع الصورة، ومع [[--severity HIGH,CRITICAL --ignore-unfixed]] بقوا 10. الأرقام عندك هتختلف حسب تاريخ الـ image وقاعدة الثغرات. الغلط الشائع: تحاول تصفّر القايمة كلها؛ ثغرات LOW من غير fix أو في باكدج مابتستخدمهاش مش أولوية.`
        },
        {
          cmd: "تنضيف",
          title: "الديسك بيتملى بسرعة",
          desc: "كل build بيسيب طبقات قديمة، وكل [[down]] من غير [[-v]] بيسيب volumes. [[system df]] يوريك مين واكل المساحة، و [[prune]] ينضّف. الـ volumes مش بتتمسح غير بـ [[--volumes]] عن قصد، لأن فيها بياناتك.",
          example: R`docker system df
docker system prune -f
docker image prune -a -f
docker volume ls -f dangling=true
docker builder prune -f`,
          try: "شوف [[system df]] قبل وبعد التنضيف. وحط [[docker image prune -f]] و [[docker builder prune -f]] في cron أسبوعي على السيرفر ([[system prune]] بيمسح كمان أي container انت موقّفه عن قصد).",
          flag: "danger",
          deep: {
            why: "Docker بيحتفظ بكل حاجة: كل طبقة من كل build، وكل container واقف، وكل volume من تجربة. سيرفر بيعمل deploy يومي بيتملى في شهر.",
            how: R`[[system df]] بيوريك ٤ أنواع: Images و Containers و Local Volumes و Build Cache، وقد إيه من كل نوع ممكن يتمسح (RECLAIMABLE).

[[system prune]] بيمسح: الـ containers الواقفة، والشبكات المش مستخدمة، والصور المعلّقة (اللي ملهاش tag)، والـ build cache. مش بيلمس الـ volumes ولا الصور اللي ليها tag. [[-f]] من غير سؤال.

[[image prune -a]] أقوى: بيمسح أي صورة مش مستخدمة في container شغال، حتى لو ليها tag. بعده أول deploy هيعيد تنزيل الـ base images.

[[volume ls -f dangling=true]] الـ volumes اللي مفيش container بيستخدمها. راجعها بإيدك قبل ما تمسحها، ممكن تبقى قاعدة بيانات مشروع قديم.

[[builder prune]] الـ build cache بس، وده اللي بيكبر أسرع حاجة على سيرفر بيبني.`,
            when: "cron أسبوعي: [[docker image prune -f]] و [[docker builder prune -f]] (مش [[system prune]]، لأنه بيمسح كمان أي container انت موقّفه عن قصد). ولما [[df -h]] يقرّب من ٨٠٪.",
            mistakes: "[[system prune --volumes]] أو [[volume prune]] من غير مراجعة. و prune أثناء deploy فيمسح صورة لسه هتتستخدم. وإنك تفتكر إن [[--filter label=...]] بيحصر [[system prune]] على حاجاتك: الفلتر بيتطبّق على الـ containers والشبكات والصور، لكن الـ build cache المش مستخدم كله بيتمسح برضه."
          },
          teach: R`## الفكرة: الأول تعرف مين واكل المساحة، وبعدين تمسح

المثال ٥ سطور: سطر بيقيس، و ٤ بيمسحوا كل واحد نوع. على جهاز التطوير ده عليه مشاريع تانية، فمشغّلتش أوامر المسح على كل الجهاز. شغّلت السطر الأول عادي (بيقرا بس)، وأوامر المسح شغّلتها وجاوبت السؤال بـ [[N]] عشان نشوف هي هتمسح إيه، أو محدودة على حاجات عملتها أنا اسمها [[dk03-...]] وعليها label [[dk03=1]]. Docker Desktop 29.6.1.

---

## ١. [[docker system df]]

[[df]] نفس اسم أمر لينكس (disk free)، بس هنا لمساحة Docker:

~~~text الناتج
TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          51        16        10.99GB   7.008GB (63%)
Containers      30        28        657.1MB   12.29kB (0%)
Local Volumes   24        13        2.444GB   1.664GB (68%)
Build Cache     160       10        6.896GB   1.106GB
~~~

| العمود | معناه |
|---|---|
| [[TOTAL]] | العدد كله |
| [[ACTIVE]] | المستخدم دلوقتي (صورة عليها container، volume مربوط بـ container) |
| [[SIZE]] | المساحة كلها |
| [[RECLAIMABLE]] | اللي ممكن يتمسح من غير ما يأثر على حاجة مستخدمة |

اقرا سطر Images: ٥١ صورة، ١٦ بس عليهم containers، و 7GB ممكن يرجعوا. ده المكان اللي هتبدأ منه. و [[docker system df -v]] بيفصّل كل صورة وكل volume لوحده.

---

## ٢. [[docker system prune -f]]

[[prune]] يعني «قلّم»: امسح اللي مش مستخدم. من غير [[-f]] بيسألك الأول، ودي الرسالة (جاوبت [[N]] فمحصلش حاجة):

~~~text الناتج
WARNING! This will remove:
  - all stopped containers
  - all networks not used by at least one container
  - all dangling images
  - unused build cache

Are you sure you want to continue? [y/N]
~~~

الـ ٤ أنواع اللي بيمسحها:

- **stopped containers**: أي container واقف، حتى لو انت موقّفه عن قصد وناوي تشغّله تاني.
- **networks** مفيش container عليها.
- **dangling images**: صور ملهاش اسم (tag)، غالبًا النسخة القديمة بعد build جديد بنفس الاسم.
- **unused build cache**: كاش البناء اللي مش مربوط بحاجة.

و [[-f]] (force) معناها متسألش. الـ volumes مش في القايمة: محتاج [[--volumes]] صريحة، وحتى معاها في Docker الحديث بتمسح الـ volumes من غير اسم (anonymous) بس (ده مكتوب في [[docker system prune --help]]: [[Prune anonymous volumes]]).

### جربته محدود على حاجاتي

عملت container واقف وشبكة عليهم label [[dk03=1]]، وشغّلت [[docker system prune -f --filter label=dk03=1]]:

~~~text الناتج (مختصر)
Deleted Containers:
fd35eadfb147...

Deleted Networks:
dk03-net

Deleted build cache objects:
7aodriwi292uwiysamgrxv1tl
...

Total reclaimed space: 1.106GB
~~~

الـ container والشبكة بتوعي بس اللي اتمسحوا، تمام. لكن بص على [[Deleted build cache objects]]: الـ 1.106GB دي هي الـ RECLAIMABLE بتاع Build Cache كله في جدول [[system df]] فوق. يعني **الـ label filter مبيتطبّقش على الـ build cache**، والأمر مسح كاش البناء المش مستخدم بتاع كل المشاريع. ده كاش بس (البناء الجاي هيبقى أبطأ مرة) مش بيانات، بس الدرس: متعتمدش على [[--filter]] عشان تحمي حاجة من [[system prune]].

---

## ٣. [[docker image prune -a -f]]

[[image prune]] لوحده بيمسح الـ dangling بس. [[-a]] (all) بيمسح **أي** صورة مفيش container عليها، حتى لو ليها اسم:

~~~text رسالة التأكيد (جاوبت N)
WARNING! This will remove all images without at least one container associated to them.
Are you sure you want to continue? [y/N]
~~~

جربته محدود: [[docker image prune -a -f --filter label=dk03=1]]، وهنا الفلتر اشتغل صح ومسح صورتي بس:

~~~text الناتج
Deleted Images:
untagged: dk03-sec:latest
deleted: sha256:be173fa24900...
Total reclaimed space: 28.94kB
~~~

[[untagged]] معناها الاسم اتشال، و [[deleted]] الطبقات نفسها اتمسحت. بعد [[-a]] على سيرفر، أول deploy هيعيد تنزيل الـ base images (زي [[node:22-alpine]]).

---

## ٤. [[docker volume ls -f dangling=true]]

ده مش بيمسح، ده بيعرض بس. [[-f]] هنا اختصار [[--filter]] (مش force!). و [[dangling=true]] يعني volumes مفيش container مربوط بيها، حتى لو واقف. زوّدت فلتر الاسم عشان أشوف بتوعي بس:

~~~text docker volume ls -f dangling=true -f name=dk03
DRIVER    VOLUME NAME
local     dk03-orphan
local     dk03-pgdata
local     dk03-trivy-cache
~~~

[[dk03-pgdata]] فيه قاعدة بيانات الدرس اللي فات، والـ container بتاعها كان اتمسح. dangling مش معناها «زبالة»، معناها «محدش ماسكه دلوقتي». عشان كده بتراجعها بإيدك وتمسح بالاسم: [[docker volume rm dk03-orphan]].

---

## ٥. [[docker builder prune -f]]

[[builder]] هو BuildKit، اللي بيبني الصور. [[prune]] بيمسح كاش البناء:

~~~text رسالة التأكيد (جاوبت N)
WARNING! This will remove all dangling build cache. Are you sure you want to continue? [y/N]
~~~

على سيرفر بيبني كل deploy، ده أسرع حاجة بتكبر: على جهازي Build Cache كان ١٦٠ عنصر و 6.9GB.

---

## مين بيمسح إيه

| الأمر | containers واقفة | صور من غير اسم | صور ليها اسم مش مستخدمة | build cache | volumes |
|---|---|---|---|---|---|
| [[system prune]] | آه | آه | لأ | آه | لأ |
| [[system prune -a]] | آه | آه | آه | آه | لأ |
| [[image prune]] | لأ | آه | لأ | لأ | لأ |
| [[image prune -a]] | لأ | آه | آه | لأ | لأ |
| [[builder prune]] | لأ | لأ | لأ | آه | لأ |
| [[volume ls -f dangling=true]] | بيعرض بس | | | | |

## الخلاصة

~~~text
system df              قيس الأول: RECLAIMABLE هو اللي يرجع
-f في prune            force: من غير سؤال
-f في volume ls        filter: مش force
--filter label=...     مبيحميش الـ build cache في system prune
الـ volumes            بإيدك وبالاسم، ومتحطش --volumes في cron
~~~`,
          lines: [
            "مين واكل المساحة وقد إيه يتمسح.",
            "نضّف الواقف والمعلّق والكاش (الـ volumes آمنة).",
            "امسح كل صورة مش مستخدمة.",
            "الـ volumes اللي محدش بيستخدمها (راجعها بإيدك).",
            "امسح build cache بس."
          ],
          sol: R`[[docker system df]] بيطبع جدول بـ [[TYPE TOTAL ACTIVE SIZE RECLAIMABLE]] لأربع حاجات: Images و Containers و Local Volumes و Build Cache. مثلًا عندي: [[Build Cache 74 0 2.827GB 1.59GB]]. و RECLAIMABLE هو اللي ممكن يتمسح من غير ما يأثر على الشغال.

بعد [[docker image prune -f]] و [[docker builder prune -f]] كل أمر بيطبع [[Total reclaimed space: ...]]، و [[system df]] بيوري الأرقام قلّت. وسطر الـ cron الأسبوعي: [[0 4 * * 0 docker image prune -f && docker builder prune -f]] في [[crontab -e]] بتاع يوزر في جروب docker.

الغلط الشائع: [[docker system prune -a --volumes]] على السيرفر عشان توفر مساحة، فتمسح volume فيه قاعدة بيانات container واقف. ماتحطش [[--volumes]] في أي حاجة أوتوماتيك.`
        },
        {
          cmd: "nginx-proxy",
          title: "دومين و SSL لكل مشروع من غير ما تكتب إعدادات Nginx",
          desc: R`[[nginx-proxy]] container بيراقب Docker، وأي container عليه [[VIRTUAL_HOST]] بيعمله reverse proxy لوحده. ومعاه [[acme-companion]] بيقرا [[LETSENCRYPT_HOST]] ويطلّع شهادة Let's Encrypt ويجددها. بتشغّلهم مرة على السيرفر، وبعدها كل مشروع جديد مجرد ٣ متغيرات وشبكة.`,
          example: R`docker network create nginx-proxy-network
# compose.yml بتاع المشروع:
services:
  frontend:
    build: ./frontend
    environment:
      VIRTUAL_HOST: example.com,www.example.com
      VIRTUAL_PORT: "80"
      LETSENCRYPT_HOST: example.com,www.example.com
    networks: [default, nginx-proxy-network]
networks:
  nginx-proxy-network: { external: true }`,
          try: "على سيرفر التجربة شغّل nginx-proxy و acme-companion على الشبكة، وبعدين شغّل [[nginx:alpine]] بـ VIRTUAL_HOST على دومين تجربة بيشاور على السيرفر، وافتحه.",
          flag: "script",
          deep: {
            why: "سيرفر واحد وعليه ٤ مشاريع صغيرة، وكل واحد عايز 80 و 443 ودومين وشهادة. كتابة server block وشهادة لكل واحد بإيدك شغل متكرر وسهل تغلط فيه.",
            how: R`الإعداد مرة واحدة على السيرفر: compose لوحده فيه خدمتين. [[nginxproxy/nginx-proxy]] ماسك [[80:80]] و [[443:443]] وراكب [[/var/run/docker.sock:/tmp/docker.sock:ro]] عشان يشوف الـ containers. و [[nginxproxy/acme-companion]] بيشاركه فولدرات الشهادات، ومعاه [[DEFAULT_EMAIL]] عشان تحذيرات الانتهاء توصلك. الاتنين على شبكة [[nginx-proxy-network]].

nginx-proxy بيقرا متغيرات كل container شغال، ويولّد إعدادات Nginx منها، ويعمل reload لوحده لما container يقوم أو يقع.

[[VIRTUAL_HOST]] الدومينات مفصولة بفاصلة. [[VIRTUAL_PORT]] البورت جوه الـ container لو بيفتح أكتر من بورت. [[LETSENCRYPT_HOST]] الدومينات اللي عايز لها شهادة، وacme-companion بيطلّعها ويجددها لوحده.

المشروع على شبكتين: default عشان يكلّم الباك إند والقاعدة بتاعته، و nginx-proxy-network عشان البروكسي يوصله. الباك إند مش محتاج VIRTUAL_HOST لو الفرونت هو اللي بيوجّه /api جواه.

والتمن: ربط docker.sock معناه إن الـ container ده يقدر يتحكم في Docker كله، يعني root على السيرفر عمليًا. استخدم الصور الرسمية بنسخة محددة، و [[:ro]].`,
            when: "مشاريع كتير صغيرة على VPS واحد، وإعداداتها العادية بتكفي. لو محتاج إعدادات Nginx خاصة كتير، Nginx عادي بملفات بإيدك أوضح.",
            mistakes: R`الدومين لسه مش بيشاور على السيرفر وانت حاطط LETSENCRYPT_HOST: الطلب بيفشل، ولو كررته كتير تخبط في حد Let's Encrypt. ونسيان الشبكة، فـ nginx-proxy يلاقي الـ container بس ميوصلوش ويرجّع 502 Bad Gateway. وفي مشروع حقيقي على نفس الإعداد ده، الإنتاج كان كمان فاتح Postgres على 5433 و Redis على 6379 للهوست، و Docker بيعدّي من ufw، فكانوا مكشوفين للنت. مع nginx-proxy مفيش خدمة محتاجة [[ports]] غيره.`
          },
          teach: R`## الفكرة: بروكسي واحد بيقرا متغيرات الـ containers

nginx-proxy هو Nginx ومعاه برنامج صغير اسمه docker-gen. docker-gen بيراقب Docker، وكل ما container يقوم أو يقع بيدوّر على اللي عليهم [[VIRTUAL_HOST]]، ويكتب منهم إعدادات Nginx، ويعمل [[nginx -s reload]]. يعني انت مبتكتبش server block خالص.

المثال جزئين: أمر بيتكتب مرة واحدة على السيرفر، وملف [[compose.yml]] للمشروع.

> جربت التوجيه (من غير SSL) على Docker Desktop 29.6.1: [[nginxproxy/nginx-proxy:1.7]] على [[127.0.0.1:8081]]، وخدمة [[nginx:alpine]] بـ [[VIRTUAL_HOST: example.com,www.example.com]]، والشبكة اسمها [[dk03-nginx-proxy-network]]، و curl بـ [[-H "Host: ..."]] بدل دومين حقيقي. الشهادات (acme-companion) محتاجة دومين بيشاور على سيرفر، فالكلام عنها من الـ docs.

---

## ١. [[docker network create nginx-proxy-network]]

بيعمل شبكة Docker بالاسم ده. البروكسي والمشاريع كلها هتتقابل عليها: البروكسي بيكلّم أي container على نفس الشبكة بالـ IP بتاعه جواها. بتتعمل مرة واحدة على السيرفر، عشان كده المشاريع بتقول عليها [[external]] (تحت).

---

## ٢. ملف compose.yml سطر سطر

~~~text compose.yml
services:
  frontend:
    build: ./frontend
    environment:
      VIRTUAL_HOST: example.com,www.example.com
      VIRTUAL_PORT: "80"
      LETSENCRYPT_HOST: example.com,www.example.com
    networks: [default, nginx-proxy-network]
networks:
  nginx-proxy-network: { external: true }
~~~

| السطر | معناه |
|---|---|
| [[services:]] | الخدمات بتاعة المشروع |
| [[frontend:]] | اسم الخدمة |
| [[build: ./frontend]] | ابني الصورة من الفولدر ده |
| [[environment:]] | متغيرات البيئة. nginx-proxy مش بيقرا ملفات، بيقرا المتغيرات دي من بره الـ container |
| [[VIRTUAL_HOST]] | الدومينات اللي توصل للخدمة دي، مفصولة بـ [[,]] من غير مسافات |
| [[VIRTUAL_PORT: "80"]] | البورت **جوه** الـ container. بين علامات تنصيص عشان YAML يقراه نص |
| [[LETSENCRYPT_HOST]] | acme-companion يطلّع شهادة للدومينات دي |
| [[networks]] وجنبها [[default, nginx-proxy-network]] بين أقواس مربعة | الخدمة على شبكتين: شبكة المشروع وشبكة البروكسي |
| [[nginx-proxy-network: { external: true }]] | الشبكة دي موجودة قبل المشروع، متعملهاش ومتمسحهاش مع [[down]] |

[[{ external: true }]] نفس الكتابة على سطرين ([[external: true]] تحت الاسم)، بس في سطر واحد.

---

## ٣. اللي حصل لما شغّلته

docker-gen ولّد الإعدادات أول ما الـ containers قامت:

~~~text docker logs dk03-nginx-proxy (مختصر)
dockergen.1 | Generated '/etc/nginx/conf.d/default.conf' from 29 containers
dockergen.1 | Running 'nginx -s reload'
dockergen.1 | Watching docker events
~~~

وجوه الملف اللي اتولّد، لكل container بيكتب تعليق بالشبكات اللي يقدر يوصله عليها:

~~~text grep -A4 'upstream example.com' /etc/nginx/conf.d/default.conf
upstream example.com {
    # Container: dk03-np-frontend-1
    #     networks:
    #         dk03-nginx-proxy-network (reachable)
    #         dk03-np_default (unreachable)
~~~

[[reachable]] على شبكة البروكسي، و [[unreachable]] على شبكة المشروع لأن البروكسي مش عليها. وده طبيعي: شبكة واحدة مشتركة كفاية.

وبعدها كل دومين اتجرّب:

| الطلب | الرد |
|---|---|
| [[-H "Host: example.com"]] | [[200]] |
| [[-H "Host: www.example.com"]] | [[200]] وصفحة [[Welcome to nginx!]] |
| [[-H "Host: other.example.com"]] | [[503 Service Temporarily Unavailable]] |

[[-H "Host: ..."]] بيبعت اسم الدومين في الطلب، وده اللي Nginx بيختار بيه. فده بيجرّب التوجيه من غير DNS.

### لو نسيت الشبكة

شلت [[nginx-proxy-network]] من [[networks]] الخدمة وشغّلت تاني:

~~~text الناتج
<title>502 Bad Gateway</title>
~~~

و الملف بقى فيه [[IPv4 address: (none usable)]]. الفرق المهم: **503** = مفيش container بالدومين ده خالص، **502** = فيه بس البروكسي مش واصله.

---

## ٤. الإعداد اللي بيتعمل مرة على السيرفر (من الـ docs)

compose لوحده فيه خدمتين على نفس الشبكة:

- [[nginxproxy/nginx-proxy]]: ماسك [[80:80]] و [[443:443]]، وراكب [[/var/run/docker.sock:/tmp/docker.sock:ro]] عشان docker-gen يشوف الـ containers. [[:ro]] قراية بس.
- [[nginxproxy/acme-companion]]: بيقرا [[LETSENCRYPT_HOST]]، ويطلب الشهادة من Let's Encrypt، ويحطها في فولدر مشترك مع nginx-proxy، ويجددها لوحده. ومعاه [[DEFAULT_EMAIL]] عشان تحذيرات الانتهاء.

## الخلاصة

~~~text
VIRTUAL_HOST       الدومينات، مفصولة بفاصلة
VIRTUAL_PORT       البورت جوه الـ container
LETSENCRYPT_HOST   الدومينات اللي ليها شهادة
external: true     الشبكة موجودة بره المشروع
503                مفيش container بالدومين ده
502                لقاه بس مش على شبكة البروكسي
~~~`,
          lines: [
            "اعمل شبكة البروكسي مرة واحدة على السيرفر.",
            "الخدمات.",
            "خدمة الفرونت.",
            "بتتبني من فولدر frontend.",
            "المتغيرات اللي nginx-proxy بيقراها:",
            "الدومينات اللي توصل للخدمة دي.",
            "البورت جوه الـ container.",
            "الدومينات اللي acme-companion يطلّع لها شهادة.",
            "على شبكة المشروع وشبكة البروكسي.",
            "تعريف الشبكات:",
            "شبكة البروكسي موجودة بره."
          ],
          sol: R`بعد ما تشغّل nginx-proxy و acme-companion والمشروع، [[docker logs nginx-proxy]] بيوري إنه ولّد config للدومين، و [[docker logs acme-companion]] بيطبع حاجة زي [[Creating/renewal example.com certificates...]] وبعدين [[Cert success]] (الصياغة بتختلف حسب النسخة).

بعد دقيقة تقريبًا [[curl -I https://example.com]] بيرد [[HTTP/2 200]] بشهادة Let's Encrypt، و [[http://]] بيعمل redirect لـ https.

الشهادة ماجربتهاش هنا (محتاجة دومين حقيقي وسيرفر)، والكلام عنها من docs بتاعة acme-companion. التوجيه نفسه جربته على Docker Desktop من غير SSL (التفاصيل في «الشرح خطوة بخطوة»). الأغلاط الشائعة: [[503 Service Temporarily Unavailable]] من nginx-proxy معناها إن مفيش container شغال بالـ VIRTUAL_HOST ده أصلًا (الدومين مكتوب غلط أو الـ container واقف). و [[502 Bad Gateway]] معناها لقاه بس مش على شبكته (نسيت [[networks]] أو الشبكة غلط). والشهادة مش بتطلع لأن DNS مش بيشاور على السيرفر لسه، أو البورت 80 مقفول في الـ firewall، أو خبطت rate limit بتاع Let's Encrypt من كتر المحاولات.`
        },
        {
          cmd: "certbot في compose",
          title: "شهادة SSL بتتجدد لوحدها جنب Nginx",
          desc: R`خدمة certbot في compose بتفضل صاحية وتجرّب [[certbot renew]] كل ١٢ ساعة، وبتشارك فولدرين مع Nginx: واحد لملفات التحدي ([[/var/www/certbot]]) وواحد للشهادات. بس التجديد لوحده مش كفاية: Nginx لازم يعمل reload عشان يقرا الشهادة الجديدة، وإلا يفضل شغال بالقديمة لحد ما تنتهي.`,
          example: R`  certbot:
    image: certbot/certbot
    volumes:
      - ./certbot/www:/var/www/certbot
      - ./certbot/conf:/etc/letsencrypt
    entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $$__{!}; done;'"
  nginx:
    command: "/bin/sh -c 'while :; do sleep 6h & wait $$__{!}; nginx -s reload; done & nginx -g \"daemon off;\"'"`,
          try: "بعد ما تركّبه، اعمل [[docker compose exec certbot certbot renew --dry-run]] واتأكد إن التجديد التجريبي نجح.",
          flag: "script",
          deep: {
            why: "شهادات Let's Encrypt بتعيش ٩٠ يوم. لو Nginx جوه container، [[certbot --nginx]] على السيرفر مش هيعرف يعدّل إعداداته، فمحتاج certbot يشتغل جنبه ويتشاركوا الملفات.",
            how: R`الفولدرين المشتركين: Nginx بيقدّم [[/.well-known/acme-challenge/]] من [[/var/www/certbot]]، و certbot بيحط ملف التحدي هناك. والشهادات في [[./certbot/conf]]، certbot بيكتب و Nginx بيقرا ([[:ro]] عنده).

[[certbot renew]] مش بيجدد غير الشهادات اللي فاضلها أقل من ٣٠ يوم، فتشغيله مرتين في اليوم مش بيكلّف حاجة.

[[trap exit TERM]]: الشيل كعملية رقم 1 مش بيستجيب لـ SIGTERM لوحده، فـ [[compose down]] كان هيستنى ١٠ ثواني. [[sleep 12h & wait]]: الـ sleep في الخلفية والشيل مستنيه بـ wait، لأن wait بتتقطع بالإشارة على طول، أما sleep في المقدمة فمش بتتقطع.

[[$$__{!}]]: الدولارين عشان compose ميعتبرهاش متغير بتاعه. الشيل بيشوف [[$__{!}]]، يعني رقم آخر عملية في الخلفية.

سطر nginx بيشغّل loop في الخلفية يعمل reload كل ٦ ساعات، و nginx نفسه في المقدمة. بديل: cron على السيرفر [[docker compose exec -T nginx nginx -s reload]].

أول شهادة مشكلة بيضة وفرخة: nginx مش هيقوم بإعدادات بتشاور على شهادة مش موجودة. شغّله الأول بإعداد HTTP بس فيه مسار التحدي، وخد الشهادة بـ [[docker compose run --rm certbot certonly --webroot -w /var/www/certbot -d example.com --staging]]، ولما تنجح شيل [[--staging]] وخد الحقيقية، وبعدين رجّع إعداد HTTPS. واتأكد قبلها إن الدومين بيشاور على السيرفر.`,
            when: "Nginx جوه Docker، ومش عايز nginx-proxy. أي موقع بدومين واحد أو اتنين على compose.",
            mistakes: R`في مشروع حقيقي certbot كان بيجدد كويس، بس Nginx عمره ما عمل reload، فكان هيفضل شغال بالشهادة القديمة لحد ما تنتهي فعلًا، والشهادة الجديدة موجودة على الديسك. وفي مشروع تاني التجديد كان [[certbot renew]] (standalone) من cron، و container الـ Nginx ماسك بورت 80، فالتجديد بيفشل في صمت بسبب [[--quiet]]. الحل webroot، أو [[--pre-hook]] و [[--post-hook]] يوقفوا ويشغّلوا الـ container. وفي تالت certbot اتشغّل بـ [[--register-unsafely-without-email]]، فمفيش تحذير يوصل لو التجديد فشل. و [[--force-renewal]] في سكربت بيتكرر بيخبط في حد Let's Encrypt.`
          },
          teach: R`## الفكرة: خدمتين بيتشاركوا فولدرات

certbot بيطلب الشهادة ويجددها، و Nginx بيستخدمها. الاتنين في containers منفصلة، فبيتقابلوا في فولدرات مشتركة على السيرفر. والمثال جزء من [[compose.yml]] فيه الخدمتين. أصعب حاجة فيه سطر [[entrypoint]] وسطر [[command]]، فهنفكّهم حتة حتة.

> جربت الـ loops نفسها على Docker Desktop 29.6.1 في مشروع اسمه [[dk03-cb]] (صورة [[certbot/certbot]] طلعت [[certbot 5.8.0]]، و [[nginx:alpine]])، من غير دومين. فالـ loop اشتغل و [[certbot renew]] قال إن مفيش شهادات. طلب شهادة حقيقية محتاج دومين بيشاور على سيرفر، فده من docs بتاعة certbot.

---

## ١. خدمة certbot

~~~text
  certbot:
    image: certbot/certbot
    volumes:
      - ./certbot/www:/var/www/certbot
      - ./certbot/conf:/etc/letsencrypt
~~~

- [[image: certbot/certbot]]: الصورة الرسمية.
- [[./certbot/www:/var/www/certbot]]: فولدر على السيرفر (يسار [[:]]) مربوط بفولدر جوه الـ container (يمين). هنا certbot بيحط ملف التحدي (challenge)، و Nginx بيعرضه على [[http://example.com/.well-known/acme-challenge/...]] عشان Let's Encrypt يتأكد إن الدومين بتاعك.
- [[./certbot/conf:/etc/letsencrypt]]: الشهادات نفسها والمفاتيح وإعدادات التجديد. Nginx بيربط نفس الفولدر عنده بـ [[:ro]] (قراية بس).

---

## ٢. سطر الـ entrypoint من جوه لبره

~~~text
entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $$__{!}; done;'"
~~~

[[entrypoint]] بيستبدل الأمر اللي الصورة بتبدأ بيه. هنا بنشغّل شيل ([[/bin/sh -c '...']]) ينفّذ سكربت صغير في سطر واحد. نفكّ السكربت:

### [[while :; do ... done]]

loop للأبد. [[:]] أمر في الشيل مبيعملش حاجة غير إنه ينجح، فالشرط دايمًا صح.

### [[certbot renew]]

جدد أي شهادة فاضلها أقل من ٣٠ يوم، والباقي سيبه. عشان كده تشغيله كتير مش بيضر. من غير شهادات:

~~~text docker compose logs certbot
No renewals were attempted.
~~~

### [[sleep 12h & wait $$__{!}]]

- [[sleep 12h]]: نام ١٢ ساعة.
- [[&]]: شغّله في الخلفية، والشيل يكمّل.
- [[$__{!}]]: رقم (PID) آخر process اتشغّلت في الخلفية، يعني الـ sleep.
- [[wait $__{!}]]: استنى الـ process دي لحد ما تخلص.

ليه اللفة دي بدل [[sleep 12h]] على طول؟ لأن الشيل وهو مستني [[wait]] بيستجيب للإشارة فورًا، أما وهو مستني أمر في المقدمة فبيستنى الأمر يخلص الأول.

### [[$$]]: الدولارين

compose نفسه بيقرا [[$__{...}]] كمتغير بتاعه ويبدّله قبل ما Docker يشوف حاجة. [[$$]] معناها «دولار حقيقي، متلمسوش». اتأكدت من اللي وصل للـ container فعلًا:

~~~text docker inspect --format '{{json .Config.Entrypoint}}' dk03-cb-certbot-1
["/bin/sh","-c","trap exit TERM; while :; do certbot renew; sleep 12h & wait $__{!}; done;"]
~~~

الدولار التاني اتشال، والشيل شاف [[$__{!}]] زي ما احنا عايزين. (و [[docker compose config]] بيعرضها [[$$]] لأنه بيطبعها بصيغة compose.)

### [[trap exit TERM]]

[[trap]] بيقول للشيل: لما توصلك إشارة [[TERM]] (اللي [[docker stop]] و [[compose down]] بيبعتوها)، نفّذ [[exit]]. الشيل لما يبقى PID 1 جوه container بيتجاهل TERM لو مفيش trap. قست الفرق بـ [[time docker stop]] على ٣ containers من alpine:

| السكربت | وقت الـ stop | الـ exit code |
|---|---|---|
| [[while :; do sleep 12h & wait $!; done]] من غير trap | 10.5 ثانية | 137 (اتقتل) |
| [[trap exit TERM; while :; do sleep 12h & wait $!; done]] | 0.45 ثانية | 143 (قفل عادي) |
| [[trap exit TERM; while :; do sleep 12h; done]] من غير [[& wait]] | 10.5 ثانية | 137 |

السطر التالت بيوري إن الـ trap لوحده مش كفاية: لازم الاتنين مع بعض. (في الجدول [[$!]] هي نفس [[$__{!}]] من غير أقواس.)

---

## ٣. سطر nginx

~~~text
command: "/bin/sh -c 'while :; do sleep 6h & wait $$__{!}; nginx -s reload; done & nginx -g \"daemon off;\"'"
~~~

السكربت ده فيه حاجتين بيشتغلوا مع بعض:

1. [[while :; do sleep 6h & wait $__{!}; nginx -s reload; done &]]: loop كل ٦ ساعات يعمل [[nginx -s reload]] (اقرا الإعدادات والشهادات من جديد من غير ما تقطع الزوار). و [[&]] في آخر الـ loop كله يحطه في الخلفية.
2. [[nginx -g "daemon off;"]]: شغّل nginx في المقدمة. [[-g]] بيضيف إعداد، و [[daemon off;]] معناه متنفصلش في الخلفية، لأن الـ container بيقفل لو الـ process الأساسية خرجت.
3. [[\"]]: علامة تنصيص جوه نص بين علامات تنصيص، فبتتكتب بـ backslash قبلها.

[[ps]] جوه الـ container بيوري الترتيب ده:

~~~text docker compose exec nginx ps -o pid,args (مختصر)
PID   COMMAND
    1 nginx: master process nginx -g daemon off;
    7 /bin/sh -c while :; do sleep 6h & wait $__{!}; nginx -s reload; done & nginx -g "daemon off;"
    8 sleep 6h
    9 nginx: worker process
~~~

nginx بقى PID 1 (الشيل استبدل نفسه بيه لأنه آخر أمر)، والـ loop process لوحده (7) نايم في [[sleep 6h]] (8). وعشان nginx هو PID 1 وبيفهم SIGTERM، [[docker compose stop nginx]] خد 0.7 ثانية.

---

## ٤. التجربة: [[certbot renew --dry-run]]

[[--dry-run]] بيجرّب التجديد على سيرفر الاختبار بتاع Let's Encrypt من غير ما يغيّر الشهادة الحقيقية. من غير شهادات طبع:

~~~text الناتج
No simulated renewals were attempted.
~~~

ومع شهادة حقيقية بيطبع [[Congratulations, all simulated renewals succeeded]] (من الـ docs، شوف الحل).

## الخلاصة

~~~text
فولدر www        ملفات التحدي: certbot بيكتب و Nginx بيعرض
فولدر conf       الشهادات: certbot بيكتب و Nginx بيقرا (:ro)
$$               دولار حقيقي في compose
sleep & wait     نوم يتقطع بالإشارة
trap exit TERM   اقفل على طول مع stop و down
nginx -s reload  Nginx يقرا الشهادة الجديدة
~~~`,
          lines: [
            "خدمة certbot.",
            "الصورة الرسمية.",
            "فولدرات مشتركة مع Nginx:",
            "ملفات التحدي (Nginx بيقدّمها على port 80).",
            "الشهادات نفسها.",
            "loop: جرّب renew، ونام ١٢ ساعة بطريقة تتقطع بالإشارة، و trap عشان يقفل على طول مع down.",
            "خدمة nginx (باقي إعداداتها زي ما هي):",
            "loop في الخلفية يعمل reload كل ٦ ساعات عشان يقرا أي شهادة اتجددت، و nginx نفسه في المقدمة."
          ],
          sol: R`[[docker compose exec certbot certbot renew --dry-run]] المفروض يطبع [[Processing /etc/letsencrypt/renewal/example.com.conf]] و [[Simulating renewal of an existing certificate for example.com]]، وفي الآخر [[Congratulations, all simulated renewals succeeded:]] وتحتها مسار الشهادة و [[(success)]].

ده معناه إن nginx بيخدم [[/.well-known/acme-challenge/]] من [[/var/www/certbot]] صح، واليوم اللي الشهادة تقرب تخلص فيه الـ loop هيجددها و nginx هيعمل reload لوحده خلال ٦ ساعات.

ماجربتهاش هنا (محتاجة دومين وسيرفر). الغلط الشائع: [[Challenge failed ... 404]]: مسار الـ volume في nginx مش نفس اللي في certbot، أو [[location /.well-known/acme-challenge/]] مش في server بتاع البورت 80. و [[Connection refused]] يعني بورت 80 مقفول.`
        },
        {
          cmd: "Traefik labels",
          title: "دومين و SSL لكل container بـ labels",
          desc: R`Traefik بروكسي بيقرا Docker زي nginx-proxy، بس الإعداد بيتكتب كـ [[labels]] على كل container: الدومين (router)، والبورت (service)، والشهادة ([[certresolver]]). وهو نفسه بيطلّع شهادات Let's Encrypt ويجددها من غير certbot.

هتقابله جاهز في Coolify و Dokploy وستاكات compose كتير. الأمثلة هنا على Traefik v3 (النسخة الحالية v3.7). شروحات v2 القديمة أغلبها لسه بتشتغل، بس فيه حاجات اتغيرت زي صيغة بعض القواعد.`,
          example: R`docker network create proxy
# compose.yml بتاع المشروع (Traefik نفسه شغال في compose لوحده على نفس الشبكة):
services:
  web:
    build: .
    labels:
      - traefik.enable=true
      - traefik.http.routers.shop.rule=Host($__btshop.example.com$__bt) || Host($__btwww.shop.example.com$__bt)
      - traefik.http.routers.shop.entrypoints=websecure
      - traefik.http.routers.shop.tls.certresolver=le
      - traefik.http.services.shop.loadbalancer.server.port=3000
    networks: [default, proxy]
networks:
  proxy: { external: true }`,
          try: R`شغّل Traefik بالإعداد اللي في الحل، ومعاه [[traefik/whoami]] بـ labels على [[app.example.com]]. من غير دومين حقيقي جرّب بـ [[curl --resolve]]: HTTP لازم يحوّلك لـ HTTPS، و HTTPS يرجّع رد whoami، ودومين تاني يرجّع 404.`,
          flag: "script",
          deep: {
            why: "نفس مشكلة nginx-proxy: سيرفر واحد عليه كذا مشروع، وكل واحد عايز دومين وشهادة. Traefik بيحل ده والإعداد كله جنب الخدمة في compose بتاعها، وكمان هو اللي جوه أدوات زي Coolify و Dokploy، فلو ورثت سيرفر شغال بيهم أو ستاك compose فيه labels غريبة، لازم تفهمه عشان تصلّح أي حاجة.",
            how: R`الإعداد نوعين. static: بيتكتب مرة في أمر تشغيل Traefik (flags في [[command]] أو ملف [[traefik.yml]])، وفيه الـ entrypoints والـ providers والـ certresolvers. و dynamic: الـ routers والـ services، وبييجي من labels الـ containers وبيتحدّث لايف.

في الـ static: [[entrypoints.web]] على 80 و [[entrypoints.websecure]] على 443، وسطر redirection يحوّل أي HTTP لـ HTTPS بـ 301. و [[providers.docker.exposedbydefault=false]] يعني مفيش container بيتنشر غير لو عليه [[traefik.enable=true]]، ودي أهم سطر عشان قاعدة البيانات ما تتنشرش بالغلط. و [[providers.docker.network=proxy]] يقوله يوصل للـ containers عن طريق الشبكة دي. و resolver اسمه [[le]] بـ [[acme.httpchallenge.entrypoint=web]] وإيميل وملف [[acme.json]] على volume عشان الشهادات متضيعش مع كل restart.

في الـ labels: الـ router اسمه [[shop]] (أي اسم، بس فريد على السيرفر). [[rule=Host(...)]] الدومين، والدومين بين backticks جوه القاعدة. [[entrypoints=websecure]] يسمع على 443. [[tls.certresolver=le]] اطلب شهادة للدومينات اللي في الـ rule. و [[loadbalancer.server.port]] البورت جوه الـ container، ومن غيره Traefik بياخد البورت اللي في [[EXPOSE]]، ولو أكتر من واحد بياخد أصغرهم، ولو مفيش هيفشل.

Traefik بيراقب Docker عن طريق [[docker.sock]]، فأول ما الـ container يقوم بيلاقيه ويطلب الشهادة، ولما يقع بيشيله. ومفيش ولا خدمة غيره محتاجة [[ports]].`,
            when: "كذا مشروع على VPS واحد وعايز الإعداد جنب كل مشروع. أو ورثت Coolify أو Dokploy أو ستاك فيه Traefik. لو مشروع واحد وعايز أبسط حاجة، Caddy (في «تاب Nginx بعمق») أو nginx-proxy أقل تفاصيل.",
            mistakes: R`تنسى [[exposedbydefault=false]]، فكل container بيتنشر على دومين بالاسم بتاعه، حتى الـ admin و Postgres. والـ container على شبكتين ومفيش [[providers.docker.network]]، فـ Traefik يختار IP الشبكة الغلط والموقع يرجّع 504 Gateway Timeout. و [[acme.json]] مش على volume، فمع كل restart بيطلب شهادات جديدة لحد ما يخبط في حدود Let's Encrypt. والدومين بين علامات تنصيص مفردة [[Host('shop.example.com')]] بدل backticks، فالـ router ميشتغلش واللوج يقول [[illegal rune literal]] (الـ double quotes مقبولة، بس backticks هي المعتادة). واسم router متكرر في مشروعين، فواحد منهم بيغطي على التاني. و [[api.insecure=true]] على سيرفر حقيقي بيفتح لوحة Traefik على 8080 من غير باسورد. وزي nginx-proxy: [[docker.sock]] معناه root على السيرفر، فالصورة الرسمية بنسخة محددة و [[:ro]].`
          },
          teach: R`## الفكرة: الإعداد مكتوب على الـ container نفسه

Traefik بيراقب Docker زي nginx-proxy، بس بدل متغيرات بيقرا **labels**: علامات (key=value) بتتلزق على الـ container. كل label بيقول لـ Traefik حتة: الدومين إيه، وعلى أنهي بورت، وعايز شهادة ولا لأ.

> جربت الحل (solCode) على Docker Desktop 29.6.1 في مشروع [[dk03-tr]] بـ [[traefik:v3.7]] و [[traefik/whoami]]، بس على بورتات [[127.0.0.1:8082]] (بدل 80) و [[127.0.0.1:8443]] (بدل 443)، والشبكة اسمها [[dk03-proxy]]. الشهادة الحقيقية محتاجة دومين، فدي من docs بتاعة Traefik.

---

## ١. [[docker network create proxy]]

شبكة مشتركة بين Traefik وكل المشاريع، بتتعمل مرة على السيرفر. نفس فكرة nginx-proxy.

---

## ٢. الـ labels سطر سطر

كل label اسمه نقط ورا بعض، بيتقري من الشمال لليمين زي مسار:

~~~text
traefik . http . routers . shop . rule
البرنامج   النوع    القسم      الاسم   الخاصية
~~~

### [[traefik.enable=true]]

انشر الـ container ده. Traefik في الحل متشغّل بـ [[exposedbydefault=false]]، فأي container من غير السطر ده مستخبي. عشان أتأكد عملت خدمة [[hidden]] من غير labels: مفيش دومين بيوصلها.

### [[traefik.http.routers.shop.rule=Host($__btshop.example.com$__bt) || Host($__btwww.shop.example.com$__bt)]]

- **router**: قاعدة بتقول «الطلبات اللي شكلها كذا تروح فين». [[shop]] اسمه، أي اسم بس ميتكررش على السيرفر.
- [[Host(...)]]: الطلب اللي الدومين بتاعه كذا.
- [[||]]: أو. يعني الدومينين الاتنين.
- الدومين بين **backticks**. جربت علامات تنصيص مفردة [[Host('hid.example.com')]] واللوج طلّع:

~~~text docker compose logs traefik
ERR error="error while parsing rule Host('hid.example.com'): parsing rule Host('hid.example.com'): 1:6: illegal rune literal" routerName=hid@docker
~~~

والـ router ده مشتغلش خالص (الدومين رجّع 404).

### [[traefik.http.routers.shop.entrypoints=websecure]]

**entrypoint** = بورت Traefik بيسمع عليه. [[websecure]] اسم اتعرّف في إعداد Traefik نفسه على [[:443]]. فالـ router ده على HTTPS بس.

### [[traefik.http.routers.shop.tls.certresolver=le]]

[[tls]] = HTTPS. و [[certresolver=le]] اطلب الشهادة من الـ resolver اللي اسمه [[le]] (Let's Encrypt)، المعرّف في إعداد Traefik، للدومينات اللي في الـ rule.

### [[traefik.http.services.shop.loadbalancer.server.port=3000]]

**service** = فين الطلب يروح في الآخر. [[server.port=3000]] البورت **جوه** الـ container. اسم الـ service [[shop]] زي الـ router، و Traefik بيربطهم لوحده لو الـ container عليه service واحد.

### [[networks]] و [[proxy: { external: true }]]

الخدمة على شبكة مشروعها وشبكة البروكسي، والشبكة دي موجودة بره المشروع.

---

## ٣. إعداد Traefik نفسه (الحل)

ده الإعداد الـ static: flags في [[command]]، بتتقري مرة لما Traefik يقوم.

| الـ flag | معناه |
|---|---|
| [[--providers.docker=true]] | اقرا الإعداد من Docker (الـ labels) |
| [[--providers.docker.exposedbydefault=false]] | متنشرش غير اللي عليه [[traefik.enable=true]] |
| [[--providers.docker.network=proxy]] | كلّم الـ containers على الشبكة دي |
| [[--entrypoints.web.address=:80]] | entrypoint اسمه web على 80 |
| [[...web.http.redirections.entrypoint.to=websecure]] | أي حاجة على web حوّلها لـ websecure |
| [[...redirections.entrypoint.scheme=https]] | والتحويل يبقى لـ https |
| [[--entrypoints.websecure.address=:443]] | entrypoint اسمه websecure على 443 |
| [[--certificatesresolvers.le.acme.email=...]] | resolver اسمه le، وإيميلك لـ Let's Encrypt |
| [[...le.acme.storage=/letsencrypt/acme.json]] | الشهادات تتحفظ في الملف ده (على volume) |
| [[...le.acme.httpchallenge.entrypoint=web]] | التحدي بيعدّي على بورت 80 |

و [[/var/run/docker.sock:/var/run/docker.sock:ro]] عشان يشوف الـ containers، و [[letsencrypt:/letsencrypt]] volume عشان [[acme.json]] ميضيعش مع الـ restart.

---

## ٤. النتايج

### HTTP بيتحوّل

~~~bash
curl -si -H "Host: app.example.com" http://127.0.0.1:8082/
~~~

~~~text الناتج
HTTP/1.1 301 Moved Permanently
Location: https://app.example.com/
~~~

ولـ POST طلع [[308]] بدل 301 (وكمان [[curl -I]] اللي بيبعت HEAD): 308 بتقول للمتصفح «ابعت نفس الطلب بنفس الـ method»، عشان POST ميتحوّلش لـ GET ويضيع الـ body.

### HTTPS بيوصل للـ container

~~~bash
curl -sk --resolve app.example.com:8443:127.0.0.1 https://app.example.com:8443/
~~~

- [[--resolve app.example.com:8443:127.0.0.1]]: اعتبر الدومين ده على البورت ده هو 127.0.0.1، من غير DNS. لازم مع HTTPS عشان الدومين يتبعت في الـ TLS نفسه مش بس في الـ Host header.
- [[-k]]: اقبل شهادة مش موثوقة (هنشوف ليه تحت).

~~~text الناتج (مختصر)
Hostname: 3663ed7c9d11
Host: app.example.com:8443
X-Forwarded-For: 172.27.0.1
X-Forwarded-Host: app.example.com:8443
X-Forwarded-Proto: https
~~~

whoami بيطبع الطلب اللي وصله. [[X-Forwarded-Proto: https]] يعني Traefik فك الـ HTTPS وبعت للتطبيق HTTP عادي على الشبكة الداخلية، وقاله إن الأصل كان https.

### دومين مش معرّف

[[other.example.com]] رجّع [[404]] من Traefik نفسه: مفيش router بيطابقه.

### الشهادة

~~~text openssl s_client ... | openssl x509 -noout -subject -issuer
subject=CN=TRAEFIK DEFAULT CERT
issuer=CN=TRAEFIK DEFAULT CERT
~~~

Traefik معرفش يجيب شهادة حقيقية، فاستخدم شهادته الافتراضية (عشان كده [[-k]]). واللوج قال السبب:

~~~text docker compose logs traefik (مختصر)
ERR Unable to obtain ACME certificate for domains ... contact email has forbidden domain "example.com"
~~~

Let's Encrypt رفض الإيميل [[you@example.com]] نفسه قبل حتى ما يحاول يوصل للدومين. على سيرفر حقيقي حط إيميلك، والدومين لازم يشاور على السيرفر.

## الخلاصة

~~~text
traefik.enable=true          انشر الـ container (مع exposedbydefault=false)
routers.X.rule=Host(...)     الدومين، بين backticks
routers.X.entrypoints        البورت اللي بيسمع عليه (websecure = 443)
routers.X.tls.certresolver   اطلب شهادة من resolver باسمه
services.X...server.port     البورت جوه الـ container
404 من Traefik               مفيش router للدومين ده
TRAEFIK DEFAULT CERT         الشهادة الحقيقية لسه مطلعتش، اقرا اللوج
~~~`,
          lines: [
            "اعمل شبكة البروكسي مرة واحدة على السيرفر.",
            "الخدمات.",
            "خدمة الموقع.",
            "بتتبني من الفولدر ده.",
            "الإعداد اللي Traefik بيقراه:",
            "انشر الـ container ده (لأن exposedbydefault=false).",
            "الـ router اسمه shop، وبيستقبل الدومينين دول (بين backticks).",
            "بيسمع على 443 بس (HTTP بيتحوّل لوحده).",
            "اطلب شهادة Let's Encrypt من الـ resolver اللي اسمه le.",
            "ابعت الطلبات لبورت 3000 جوه الـ container.",
            "على شبكة المشروع وشبكة البروكسي.",
            "تعريف الشبكات:",
            "شبكة البروكسي موجودة بره."
          ],
          sol: R`HTTP: [[curl -s -o /dev/null -w "%{http_code} %{redirect_url}" -H "Host: app.example.com" http://127.0.0.1/]] بيطبع [[301 https://app.example.com/]].

HTTPS: [[curl -sk --resolve app.example.com:443:127.0.0.1 https://app.example.com/]] بيرجّع رد whoami: [[Hostname]] و [[X-Forwarded-Host: app.example.com]] و [[X-Forwarded-Proto: https]]. ودومين مش معرّف (other.example.com) بيرجّع 404 من Traefik نفسه.

على جهازك من غير دومين حقيقي، اللوج هيطلّع [[Unable to obtain ACME certificate for domains]] والشهادة هتبقى [[CN=TRAEFIK DEFAULT CERT]]، وده طبيعي: Let's Encrypt مش هيقدر يوصل لجهازك. على سيرفر حقيقي والدومين بيشاور عليه، [[curl -vI https://app.example.com]] بيوري issuer من Let's Encrypt.

لو كله 404 حتى app: غالبًا ناسي [[traefik.enable=true]]. ولو 504 أو Bad Gateway: الـ container مش على شبكة proxy، أو البورت في الـ label غلط.`,
          solCode: R`services:
  traefik:
    image: traefik:v3.7
    command:
      - --providers.docker=true
      - --providers.docker.exposedbydefault=false
      - --providers.docker.network=proxy
      - --entrypoints.web.address=:80
      - --entrypoints.web.http.redirections.entrypoint.to=websecure
      - --entrypoints.web.http.redirections.entrypoint.scheme=https
      - --entrypoints.websecure.address=:443
      - --certificatesresolvers.le.acme.email=you@example.com
      - --certificatesresolvers.le.acme.storage=/letsencrypt/acme.json
      - --certificatesresolvers.le.acme.httpchallenge.entrypoint=web
    ports: ["80:80", "443:443"]
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - letsencrypt:/letsencrypt
    networks: [proxy]
    restart: unless-stopped
  app:
    image: traefik/whoami
    labels:
      - traefik.enable=true
      - traefik.http.routers.app.rule=Host($__btapp.example.com$__bt)
      - traefik.http.routers.app.entrypoints=websecure
      - traefik.http.routers.app.tls.certresolver=le
      - traefik.http.services.app.loadbalancer.server.port=80
    networks: [proxy]
volumes:
  letsencrypt:
networks:
  proxy:
    name: proxy`
        }
      ]
    }
]);
