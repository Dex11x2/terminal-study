// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
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
          lines: [
            "نزّل image nginx بالنسخة الصغيرة alpine من Docker Hub.",
            "الصور اللي على جهازك، بحجمها.",
            "شغّل container منها ينفّذ أمر واحد ويخرج، وامسحه بعدها ([[--rm]]).",
            "أشهر اختبار: image صغيرة بتطبع رسالة وتخلص."
          ]
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
          lines: [
            "في الخلفية، اسمه web، بورت 8080 عندك يروح لـ 80 جواه.",
            "ادخل alpine بترمنال تفاعلي، وامسحه لما تخرج.",
            "قاعدة بيانات: باسورد بمتغير بيئة، والبورت على 127.0.0.1 بس (مش مفتوح للنت)."
          ]
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
          lines: [
            "الشغال.",
            "الكل حتى الواقف.",
            "وقّف بأدب (إشارة إغلاق، وبعد ١٠ ثواني قتل).",
            "رجّعه بنفس إعداداته.",
            "وقّفه وامسحه في خطوة.",
            "امسح كل الواقفين."
          ]
        },
        {
          cmd: "docker logs",
          title: "اللي التطبيق بيطبعه",
          desc: "أي حاجة التطبيق بيكتبها على stdout و stderr، Docker بيحفظها. ده لوج الـ container. [[-f]] يتابع، و [[--tail]] آخر كام سطر، و [[--since]] من وقت معين.",
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
          lines: [
            "كل اللوج.",
            "آخر ١٠٠ سطر وتابع الجديد.",
            "آخر ١٠ دقايق.",
            "دوّر على error. [[2>&1]] لازمة لأن الأخطاء على stderr والـ pipe بياخد stdout."
          ]
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
          lines: [
            "ترمنال جوه web (sh لأن alpine مفيهاش bash).",
            "نفّذ أمر واحد جواه من غير ما تدخل.",
            "افتح psql جوه container القاعدة.",
            "ادخل كـ root ([[-u]]) لو محتاج تسطّب أداة مؤقتة."
          ]
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
            how: R`اسم الـ image بيتكون من: [registry/]المستودع:tag. مثلًا [[ghcr.io/dex11x2/myapi:1.2.0]]. من غير registry معناه Docker Hub. من غير tag معناه [[latest]].

[[latest]] مجرد اسم tag زي أي اسم، مش معناه الأحدث فعلًا. لو عملت push بـ tag 1.2.0، الـ latest متغيرتش. عشان كده الاعتماد على latest في الإنتاج غلط: مش عارف بتشغّل إيه بالظبط.

[[node:22-alpine]] بيقول: Node 22 على Alpine (نظام صغير جدًا، حوالي ٥ ميجا). أما [[node:22]] فعلى Debian كامل، أكبر بكتير. الأول أنسب للإنتاج غالبًا.

[[tag]] بيعمل اسم إضافي لنفس الـ image (نفس الملفات، مش نسخة). [[rmi]] بيمسح image، ومش هيقدر لو فيه container بيستخدمها.`,
            when: "قبل أي build للإنتاج: حدد نسخة الـ base image. وقبل push: tag بنسخة واضحة.",
            mistakes: "[[FROM node]] أو [[FROM node:latest]] في Dockerfile. بعد شهور Node 24 يطلع وتطبيقك يبوظ من غير ما تعمل حاجة."
          },
          lines: [
            "الصور عندك.",
            "نزّل نسخة محددة من Node.",
            "اسم تاني لنفس الصورة (مش نسخة).",
            "امسح صورة.",
            "امسح الصور المعلّقة (من غير tag)."
          ]
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
          lines: ["كل تفاصيل الـ container كـ JSON.", "الحالة بس.", "الـ IP بس.", "استهلاك كل container، لقطة واحدة."]
        }
      ]
    },
    {
      t: "Dockerfile: اعمل image لتطبيقك",
      l: 2,
      n: "كل سطر في Dockerfile بيعمل طبقة، والترتيب بيفرق في السرعة",
      items: [
        {
          cmd: "Dockerfile",
          title: "أول Dockerfile لتطبيق Node",
          desc: "الملف اللي Docker بيبني منه الـ image. كل تعليمة سطر: تبدأ من image جاهزة، تحدد فولدر الشغل، تنسخ الملفات، تسطّب، وتقول إيه اللي يتشغّل.",
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
          lines: [
            "ابدأ من صورة Node 22 على Alpine.",
            "اعمل فولدر /app وادخله.",
            "انسخ package.json و package-lock بس (عشان الكاش).",
            "سطّب بالظبط اللي في lock، من غير devDependencies.",
            "دلوقتي انسخ باقي الكود.",
            "توثيق إن التطبيق على 3000.",
            "الأمر اللي يتشغّل، بالشكل اللي يخلي node العملية رقم 1."
          ]
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
          lines: [
            "ابني (المرة الأولى بتاخد وقت).",
            "ابني تاني: كل خطوة CACHED.",
            "الطبقات وحجم كل واحدة.",
            "ابني من غير كاش خالص."
          ]
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

[[.dockerignore]] بيقول إيه اللي ميتبعتش. نفس صيغة .gitignore.

node_modules لازم يتستثنى لسببين: الحجم، وإن اللي على جهازك متبني لنظامك (ويندوز أو ماك)، ومكتبات فيها كود native مش هتشتغل على لينكس جوه الـ container. الصح إن npm ci جوه الـ container يسطّبها للينكس.

.git بيكبّر الـ context من غير فايدة. .env أسرار. و dist أو .next ناتج build قديم ممكن يلخبط.`,
            when: "في كل مشروع فيه Dockerfile، من أول يوم.",
            mistakes: "نسيانه، وبعدين تستغرب إن الـ build بطيء أو إن مكتبة native زي bcrypt بتطلع error جوه الـ container."
          },
          lines: [
            "المكتبات: هتتسطب جوه الصورة.",
            "تاريخ Git: مالوش لازمة.",
            "الأسرار: متدخلش الصورة أبدًا.",
            "اللوجات.",
            "ناتج build قديم.",
            "ناتج build بتاع Next.",
            "الـ Dockerfile نفسه مش محتاج يتنسخ.",
            "ولا ملفات compose."
          ]
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
          ]
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
          lines: [
            "متغير build بقيمة افتراضية.",
            "استخدمه في اسم الصورة (الاستخدام الوحيد لـ ARG قبل FROM).",
            "متغير بيئة بيفضل في الصورة ووقت التشغيل.",
            "البورت الافتراضي.",
            "توثيق."
          ]
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
          ]
        },
        {
          cmd: "build / tag / push",
          title: "ارفع الـ image على registry",
          desc: "الـ registry مخزن للـ images (Docker Hub، أو GitHub Container Registry ghcr.io). بتبني على جهازك أو في CI، وترفع، والسيرفر ينزّل. الاسم لازم يبقى فيه اسم الـ registry والحساب.",
          example: R`docker build -t ghcr.io/dex11x2/myapi:1.2.0 .
docker login ghcr.io
docker push ghcr.io/dex11x2/myapi:1.2.0
docker pull ghcr.io/dex11x2/myapi:1.2.0`,
          try: "اعمل token من GitHub بصلاحية write:packages، واعمل login بيه، وارفع image تجربة.",
          deep: {
            why: "عشان السيرفر يشغّل image بتاعتك، لازم توصله. إما يبنيها هو، أو تبنيها انت وترفعها على registry وهو ينزّلها.",
            how: R`الـ registry سيرفر بيخزّن images. Docker Hub الأشهر، و GitHub Container Registry (ghcr.io) مجاني مع الـ repos بتاعتك، ومريح لأن نفس حساب GitHub.

الاسم لازم يبدأ باسم الـ registry والحساب: [[ghcr.io/dex11x2/myapi:1.2.0]]. من غير ده Docker هيحاول يرفع على Docker Hub.

[[login]] مرة واحدة. مع ghcr بتستخدم Personal Access Token فيه صلاحية write:packages، مش باسورد GitHub.

[[push]] بيرفع الطبقات اللي مش موجودة على الـ registry بس، فبعد أول مرة الرفع بيبقى سريع. وعلى السيرفر [[pull]] بنفس الاسم.

والأصح إن الـ build والـ push يحصلوا في GitHub Actions مع كل tag جديد، والسيرفر يعمل pull بس. كده السيرفر مش محتاج الكود ولا موارد الـ build.`,
            when: "لما يبقى عندك أكتر من سيرفر، أو الـ build تقيل على السيرفر، أو عايز rollback سريع لنسخة قديمة.",
            mistakes: "push بـ latest بس. لو النسخة الجديدة بايظة مش هتعرف ترجع للقديمة. دايمًا tag برقم نسخة أو hash الـ commit."
          },
          lines: [
            "ابني باسم كامل: registry، وحساب، واسم، ونسخة.",
            "ادخل على GitHub registry (بـ token فيه write:packages).",
            "ارفع.",
            "على السيرفر: نزّل."
          ]
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
          lines: [
            "الـ builders الموجودة والمعماريات اللي بيدعموها.",
            "اعمل builder جديد يدعم أكتر من معمارية واستخدمه.",
            "ابني لـ amd64 و arm64 في image واحدة وارفعها.",
            "اتأكد المعماريات اللي اترفعت.",
            "معمارية السيرفر بس، والناتج عندك في docker images."
          ]
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
          lines: ["الأمر الافتراضي (CMD).", "استبدل CMD بأمر تاني.", "استبدل ENTRYPOINT نفسه بـ sh ونفّذ أمر."]
        }
      ]
    },
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
          lines: [
            "اعمل volume اسمه pgdata.",
            "شغّل Postgres واربط الـ volume على مسار البيانات بتاعه.",
            "الـ volumes عندك.",
            "فين على الديسك.",
            "امسح الـ container وشغّل واحد جديد بنفس الـ volume: البيانات موجودة."
          ]
        },
        {
          cmd: "bind mount",
          title: "فولدر من جهازك جوه الـ container",
          desc: "بدل volume، بتربط فولدر حقيقي من جهازك. أي تعديل في الكود بيظهر جوه الـ container فورًا، وده أساس الـ hot reload في التطوير. الـ [[:ro]] للقراءة بس.",
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
          lines: [
            "اربط فولدر site من جهازك على مسار ملفات nginx، للقراءة بس.",
            "شغّل الاختبارات من صورة node على كودك: الفولدر الحالي على /app، واشتغل من هناك."
          ]
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
          lines: [
            "اعمل شبكة.",
            "القاعدة على الشبكة، من غير -p خالص.",
            "container مؤقت على نفس الشبكة يتصل بالقاعدة باسمها db.",
            "مين على الشبكة وبأي IP."
          ]
        },
        {
          cmd: "env file",
          title: "المتغيرات من ملف",
          desc: "بدل ٢٠ [[-e]]، حط المتغيرات في ملف ومرّره. الملف ده مش جزء من الـ image، فالأسرار متتحطش جوه الصورة. و [[-e]] بيغطي على قيمة من الملف.",
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
          lines: ["كل المتغيرات من الملف.", "الملف، و -e بتغطي على متغير واحد منه.", "اتأكد إن المتغيرات وصلت."]
        }
      ]
    },
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
          ]
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
          lines: [
            "ابني الصور من الكود وشغّل كل حاجة في الخلفية.",
            "حالة خدمات المشروع.",
            "تابع لوج api.",
            "ادخل api.",
            "أعد تشغيل api بنفس الصورة (مش بيقرا تعديلات).",
            "اقفل وامسح الـ containers والشبكة (الـ volumes تفضل)."
          ]
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
          ]
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
          ]
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
          lines: [
            "شغّل الخدمات اللي عليها profile اسمه tools كمان.",
            "٣ نسخ من worker.",
            "اطبع الملف النهائي بعد الدمج والمتغيرات.",
            "deploy لو الصور من registry: نزّل الجديد وطبّق."
          ]
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
          lines: [
            "الملف النهائي كما Compose فاهمه.",
            "العمليات جوه كل خدمة.",
            "لوجات كل الخدمات في آخر ٥ دقايق.",
            "امسح كل حاجة بما فيها volumes وخدمات اتشالت من الملف. للتطوير بس."
          ]
        }
      ]
    },
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
            mistakes: "deploy من غير ما تعمل باك أب للقاعدة الأول لو فيه migration. وتنسى prune فالديسك يتملى."
          },
          lines: [
            "الطريقة الأولى: هات الكود وابني وشغّل.",
            "الطريقة التانية: نزّل الصور الجاهزة وشغّل.",
            "أعد إنشاء api حتى لو الإعدادات متغيرتش (بعد تعديل env file).",
            "امسح الصور القديمة بعد كل deploy."
          ]
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
          lines: [
            "شغّل بسياسة: ارجع إلا لو انا وقّفتك.",
            "غيّر السياسة لـ container شغال.",
            "اتأكد من السياسة الحالية."
          ]
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
            how: R`الـ exit code هو المفتاح. [[0]]: العملية خلصت طبيعي، غالبًا CMD بيخلص ويخرج (زي سكربت مش سيرفر). [[1]]: error في التطبيق، اللوج فيه الـ stack trace. [[137]]: 128+9، يعني اتقتل بـ SIGKILL، وغالبًا السبب out of memory (الـ container عدّى حد الرام أو السيرفر نفسه خلص رام). [[143]]: 128+15، استلم SIGTERM وقفل عادي، يعني حد عمله stop. [[126]] أو [[127]]: الأمر في CMD مش موجود أو مش قابل للتشغيل.

[[inspect]] بـ State بيوريك الـ ExitCode و OOMKilled (true لو اتقتل بسبب الرام) و FinishedAt.

[[events]] بيسجّل كل حاجة حصلت: start و die و oom و restart، بالوقت. مفيد لما الـ container بيقع كل فترة وعايز تعرف إمتى.

وغلطة شائعة في التطبيقات: بتقوم قبل ما قاعدة البيانات تبقى جاهزة، فتفشل في الاتصال وتقع. الحل depends_on مع healthcheck، أو retry في كود الاتصال.`,
            when: "أي Exited أو Restarting في [[ps]].",
            mistakes: "تعيد التشغيل من غير ما تقرا الـ exit code واللوج، فيقع تاني بعد دقيقة."
          },
          lines: [
            "الواقفين بس.",
            "آخر ٥٠ سطر: الـ error هنا.",
            "رقم الخروج، ورسالة الخطأ، ووقت الوقوع.",
            "كل الأحداث لـ api في آخر ساعة."
          ]
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
          lines: ["أقصى 512 ميجا رام ومعالج واحد.", "زوّد الحد لـ container شغال.", "الاستهلاك مقارنة بالحد."]
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
          lines: [
            "انسخ فولدر من الـ container لجهازك.",
            "انسخ ملف من جهازك للـ container.",
            "container مؤقت: الـ volume على /data، وفولدرك على /backup، واعمل tar من الأول للتاني (وقّف القاعدة الأول بـ docker stop db، وإلا النسخة ممكن تتكسر).",
            "الأصح للقاعدة: pg_dump من جوه container القاعدة، واضغط، والاسم بالتاريخ."
          ]
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
          lines: [
            "ترمنال جوه التطبيق.",
            "التطبيق بيرد من جواه؟",
            "متغيرات القاعدة وصلت صح؟",
            "القاعدة بترد على البورت من جوه التطبيق؟",
            "container تشخيص مؤقت على شبكة المشروع."
          ]
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
          lines: [
            "البورت للسيرفر بس.",
            "نظام ملفات للقراءة بس، مع /tmp قابل للكتابة في الرام.",
            "افحص الصورة ضد الثغرات المعروفة.",
            "دوّر في تاريخ الصورة على أي سر اتحط بالغلط."
          ]
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
            when: "cron أسبوعي: [[docker system prune -f]]. ولما [[df -h]] يقرّب من ٨٠٪.",
            mistakes: "[[system prune --volumes]] أو [[volume prune]] من غير مراجعة. و prune أثناء deploy فيمسح صورة لسه هتتستخدم."
          },
          lines: [
            "مين واكل المساحة وقد إيه يتمسح.",
            "نضّف الواقف والمعلّق والكاش (الـ volumes آمنة).",
            "امسح كل صورة مش مستخدمة.",
            "الـ volumes اللي محدش بيستخدمها (راجعها بإيدك).",
            "امسح build cache بس."
          ]
        }
      ]
    }
  ]
});
