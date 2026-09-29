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
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
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
            how: R`اسم الـ image بيتكون من: [registry/]المستودع:tag. مثلًا [[ghcr.io/user/myapi:1.2.0]]. من غير registry معناه Docker Hub. من غير tag معناه [[latest]].

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
          lines: [
            "استخدم Caddy يولّد hash للباسورد، والـ container يتمسح بعدها.",
            "نفّذ سطر JavaScript على Node 20 من غير ما تسطّبها.",
            "الفولدر الحالي جوه الـ container على /work، واعرض حجم كل حاجة فيه.",
            "ابعت ملف من جهازك على الـ stdin لأداة جوه الـ container."
          ]
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

[[.dockerignore]] بيقول إيه اللي ميتبعتش. صيغته شبه .gitignore، بس مش زيه بالظبط (الفرق تحت في الأخطاء).

node_modules لازم يتستثنى لسببين: الحجم، وإن اللي على جهازك متبني لنظامك (ويندوز أو ماك)، ومكتبات فيها كود native مش هتشتغل على لينكس جوه الـ container. الصح إن npm ci جوه الـ container يسطّبها للينكس.

.git بيكبّر الـ context من غير فايدة. .env أسرار. و dist أو .next ناتج build قديم ممكن يلخبط.`,
            when: "في كل مشروع فيه Dockerfile، من أول يوم.",
            mistakes: R`نسيانه، وبعدين تستغرب إن الـ build بطيء أو إن مكتبة native زي bcrypt بتطلع error جوه الـ container.

وخد بالك إن الصيغة مش زي .gitignore بالظبط: في .dockerignore، [[*.png]] بتمسك الصور اللي في جذر المشروع بس، ومش بتدخل الفولدرات. عشان تمسك كل مكان لازم [[**/*.png]]. في مشروع حقيقي الملف كان فيه [[*.png]] عشان يشيل screenshots مرمية في الجذر، ودي صح. لكن لو حد «صلّحها» لـ [[**/*.png]] هتشيل صور [[public/]] واللوجو، ومحليًا كله يشتغل وجوه الـ container الصور تطلع 404. ونفس الفكرة: [[node_modules]] لوحدها بتمسك اللي في الجذر بس، وفي monorepo محتاج [[**/node_modules]]. ولو شاكك، ابني واعمل [[docker run --rm myapi ls public]] وشوف الملفات وصلت ولا لأ.`
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
          lines: [
            "وقّف السكربت عند أول أمر يفشل.",
            "الخطوة القبلية: مزامنة الـ schema.",
            "node ياخد مكان الشيل ويبقى العملية رقم 1."
          ]
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
          ]
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
          lines: [
            "ابدأ من Node.",
            "فولدر الشغل.",
            "ملفات الباكدجات.",
            "سطّب، وملف .npmrc (فيه التوكن) متركّب للخطوة دي بس ومش هيتحفظ.",
            "الكود.",
            "متغير عام مش سر، عادي يبقى ARG لأنه رايح للمتصفح أصلًا.",
            "ابني."
          ]
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
          ]
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
          ]
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
          lines: [
            "اكتب المحتوى الجديد جوه نفس الملف (نفس الـ inode).",
            "رقم الـ inode على السيرفر.",
            "رقمه جوه الـ container: لازم يبقى هو هو.",
            "اختبر الإعدادات، ولو سليمة اعمل reload."
          ]
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
          lines: [
            "اعمل الـ volume بإيدك مرة واحدة.",
            "تعريف الـ volumes في آخر الملف.",
            "المفتاح اللي الخدمات بتستخدمه.",
            "الاسم الحقيقي من غير بادئة المشروع.",
            "موجود بره: compose ميعملوش وميمسحوش."
          ]
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
          lines: [
            "اعمل الشبكة المشتركة مرة واحدة على السيرفر.",
            "الخدمات.",
            "خدمة باسم فريد على مستوى السيرفر كله.",
            "بتتبني من الفولدر ده.",
            "على شبكة المشروع وعلى الشبكة المشتركة.",
            "تعريف الشبكات.",
            "الشبكة المشتركة...",
            "...موجودة بره: انضم لها بس."
          ]
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
          lines: [
            "الخدمات.",
            "خدمة الفرونت.",
            "ابنيها من الفولدر ده.",
            "شغّل Vite وخليه يسمع على كل الواجهات (الـ -- بتعدّي الـ flag لـ vite).",
            "البورت من جهازك للـ container.",
            "أسماء إضافية في /etc/hosts جوه الـ container:",
            "host.docker.internal يشاور على جهازك (لازم على لينكس، Docker Desktop بيعملها لوحده)."
          ]
        }
      ]
    },
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
          ]
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
          lines: [
            "البورتات.",
            "Postgres: 5433 على جهازك بس، لـ 5432 جوه.",
            "التطبيق: 3010 على السيرفر بس (Nginx يوصله)، لـ 3000 جوه."
          ]
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
          lines: [
            "النسخة الجديدة موجودة؟",
            "لو الجديدة شغالة استخدمها...",
            "...ولو لأ، دوّر على القديمة...",
            "...ولو ولا واحدة، وقّف برسالة.",
            "باقي السكربت يستخدم المتغير."
          ]
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
          lines: [
            "شغّل نسخة باسم myapp2، من الملف الأساسي ودمج ملف الاختلافات فوقه.",
            "حالة النسخة التانية بس.",
            "شوف الملف النهائي بعد الدمج.",
            "اقفل النسخة التانية بس (الـ -p مهمة هنا)."
          ]
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
          lines: [
            "ابني من الكود الجديد وشغّل.",
            "الـ image اللي شغالة اتعملت إمتى.",
            "التعديل موجود جوه الـ container فعلًا؟",
            "أعد إنشاء الـ container حتى لو مفيش تغيير في الإعدادات.",
            "آخر حل: ابني من غير كاش، والـ output كامل عشان تشوف أنهي خطوة."
          ]
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
        },
        {
          cmd: "متغيرات في compose.yml",
          title: "قيمة من .env أو قيمة افتراضية",
          desc: R`[[$__{PORT:-3000}]] جوه compose.yml معناها: خد PORT من الشيل أو من ملف .env اللي جنب compose.yml، ولو مش موجود استخدم 3000. و [[$__{VAR:?رسالة}]] بتوقّف compose بالرسالة دي لو المتغير ناقص، ودي الأنسب للأسرار.

ده غير [[env_file:]]. الأول بيملى الملف نفسه قبل ما compose يقراه. التاني بيبعت المتغيرات جوه الـ container.`,
          example: R`services:
  api:
    image: ghcr.io/USER/myapi:$__{IMAGE_TAG:-latest}
    ports:
      - "127.0.0.1:$__{PORT:-3000}:3000"
    environment:
      REDIS_URL: $__{REDIS_URL:-redis://redis:6379}
      SENTRY_DSN: $__{SENTRY_DSN:-}
      DB_PASSWORD: $__{DB_PASSWORD:?DB_PASSWORD missing in .env}`,
          try: "امسح DB_PASSWORD من .env واعمل [[docker compose config]]: هيوقف برسالتك. رجّعه وشوف القيم النهائية في نفس الأمر.",
          flag: "script",
          deep: {
            why: "نفس compose.yml بيشتغل على جهازك وعلى السيرفر وفي CI، والقيم مختلفة. محتاج الملف يقرا القيم من بره، ويبقى ليه افتراضيات معقولة، ويرفض يشتغل لو حاجة مهمة ناقصة.",
            how: R`compose بيدوّر على قيمة المتغير في الشيل الأول، وبعدين في ملف [[.env]] اللي في فولدر المشروع (أو اللي بتحدده بـ [[--env-file]]).

[[$__{X:-def}]]: لو X مش موجود أو فاضي، استخدم def. و [[$__{X-def}]] (من غير النقطتين): لو مش موجود بس، أما الفاضي فبيتاخد فاضي. [[$__{X:-}]] معناها «عادي لو مش موجود، خليه فاضي» ومن غير تحذير.

[[$__{X:?msg}]]: لو ناقص، compose يقف ويطبع msg. أحسن بكتير من إن التطبيق يقوم من غير المفتاح ويفشل بعد ساعة في نص طلب.

[[$$]] معناها علامة دولار عادية مش متغير compose. بتحتاجها لما تكتب أمر شيل جوه الملف وعايز الشيل جوه الـ container هو اللي يقرا المتغير ([[$$HOME]]).

و [[docker compose config]] بيطبع الملف بعد التبديل، فتشوف كل قيمة وصلت كام.`,
            when: "tag الـ image، والبورتات، والدومينات، وأي حاجة بتختلف بين البيئات. والأسرار دايمًا بـ :? عشان متقومش من غيرها.",
            mistakes: R`في مشروع حقيقي بلوك environment ضخم كان متكرر بين ملف التطوير وملف الإنتاج، وكل الأسرار بـ [[:-]] فاضية، فالتطبيق يقوم من غير مفتاح ويفشل في النص. وفي مشروع تاني [[$__{JWT_EXPIRE:-3650d}]]: القيمة الافتراضية بتخلي التوكن عايش ١٠ سنين لو حد نسي يحطها. الافتراضي لازم يبقى آمن. وكمان: .env نفسه كان متمرر بـ env_file، ومربوط bind mount جوه /app، ومتكرر في environment. مكان واحد يكفي.`
          },
          lines: [
            "الخدمات.",
            "خدمة api.",
            "نسخة الـ image من IMAGE_TAG، ولو مش موجود latest.",
            "البورتات.",
            "بورت السيرفر من PORT، وافتراضيًا 3000.",
            "متغيرات الـ container.",
            "رابط Redis، وافتراضيًا الخدمة اللي في نفس المشروع.",
            "اختياري: لو مش موجود يتبعت فاضي من غير تحذير.",
            "إجباري: لو ناقص، compose يوقف بالرسالة دي."
          ]
        },
        {
          cmd: "healthchecks جاهزة",
          title: "فحوصات صحة لـ Postgres و Redis والـ API",
          desc: R`كل خدمة ليها أمر بيقول «أنا جاهزة فعلًا»: [[pg_isready]] لـ Postgres، و [[redis-cli ping]] لـ Redis، ولـ API بتاعتك طلب على /health. مع [[condition: service_healthy]] الـ API مش بيبدأ غير لما القاعدة جاهزة. و [[docker compose up -d --wait]] بيستنى لحد ما كله يبقى healthy بدل [[sleep]] بالتخمين.`,
          example: R`services:
  db:
    image: postgres:16-alpine
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $$POSTGRES_USER -d $$POSTGRES_DB"]
      interval: 5s
      retries: 10
  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes --maxmemory 256mb --maxmemory-policy noeviction
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
  api:
    build: .
    depends_on:
      db: { condition: service_healthy }
      redis: { condition: service_healthy }
    healthcheck:
      test: ["CMD-SHELL", "wget -qO- http://localhost:3000/health | grep -q ok || exit 1"]
      start_period: 30s`,
          try: "شغّل [[docker compose up -d --wait]] وشوف إنه مرجعش غير لما كله healthy. بعدين بوّظ رابط /health وشوفه بيفشل بـ exit code مش صفر.",
          flag: "script",
          deep: {
            why: "«الـ container قام» مش معناه «الخدمة جاهزة». Postgres بياخد ثواني يقبل اتصالات، والتطبيق لو قام قبله يقع. وسكربتات الديبلوي بتعمل sleep 5 وتقول نجح، والتطبيق لسه بيقع.",
            how: R`[[CMD]] بينفّذ البرنامج مباشرة من غير شيل: مفيش pipes ولا [[||]]. [[CMD-SHELL]] بيشغّله جوه [[sh -c]]، فتقدر تستخدم pipe ومتغيرات.

[[$$POSTGRES_USER]]: الدولارين عشان compose ميبدّلش، والشيل جوه الـ container هو اللي يقرا المتغير.

الـ API: صور alpine مفيهاش curl، فـ [[wget -qO-]]. و [[grep -q ok]] بيتأكد إن الرد نفسه سليم، مش بس إن السيرفر رد. [[start_period]] مهلة في الأول الفشل فيها مش بيتحسب.

[[depends_on]] مع [[service_healthy]] بيأثر على ترتيب التشغيل بس. بعد ما الكل قام، لو القاعدة وقعت، الـ API مش هيتوقف ولا هيتعاد.

[[up -d --wait]] بيرجع لما كل الخدمات تبقى running و healthy، ولو واحدة فشلت بيرجع بـ error. ومعاه [[--wait-timeout 120]]. مثالي في سكربت الديبلوي.

Redis: [[--appendonly yes]] بيحفظ كل عملية على الديسك فالبيانات تعيش بعد restart. [[--maxmemory 256mb]] حد للرام. و [[noeviction]] معناها لما الرام يخلص Redis يرفض الكتابة بـ error، بدل ما يمسح مفاتيح قديمة في صمت. ده مهم لو Redis شايل queue شغل (زي BullMQ): المسح في صمت معناه شغل بيضيع.`,
            when: "كل خدمة في compose الإنتاج. و --wait في كل سكربت ديبلوي أو CI بيشغّل stack.",
            mistakes: R`في مشروع حقيقي healthcheck الـ Mongo كان فيه [[$__{MONGO_ROOT_PASSWORD}]] بدولار واحد، فـ compose بيحط الباسورد نصًا في إعدادات الفحص، وبيبان في [[docker inspect]] وفي أي أداة بتعرض الإعدادات. وفي سكربتات ديبلوي كتير [[sleep 5]] بعد up بدل --wait. و healthcheck بـ curl في image alpine: الفحص بيفشل دايمًا والـ container unhealthy على طول.`
          },
          lines: [
            "الخدمات.",
            "خدمة القاعدة.",
            "Postgres 16 على alpine.",
            "فحص الصحة:",
            "pg_isready بيرجع 0 لما القاعدة تقبل اتصالات. الـ $$ عشان الشيل جوه هو اللي يقرا المتغيرات.",
            "كل ٥ ثواني.",
            "لحد ١٠ محاولات.",
            "خدمة Redis.",
            "Redis 7 على alpine.",
            "احفظ على الديسك، وحد رام ٢٥٦ ميجا، ولما يخلص ارفض الكتابة بدل ما تمسح مفاتيح.",
            "فحص الصحة:",
            "redis-cli ping لازم يرد PONG. من غير شيل.",
            "خدمة الـ API.",
            "بتتبني من الفولدر ده.",
            "بتستنى...",
            "...القاعدة تبقى healthy...",
            "...و Redis كمان.",
            "وليها فحص صحة هي كمان:",
            "اطلب /health بـ wget (مفيش curl في alpine) واتأكد إن الرد فيه ok.",
            "أول ٣٠ ثانية الفشل مش بيتحسب."
          ]
        },
        {
          cmd: "exec -T",
          title: "تبعت ملف أو pipe لأمر جوه الـ container",
          desc: R`[[docker compose exec]] بيفتح TTY افتراضيًا، وده بيبوّظ أي input جاي من ملف أو pipe، وبيفشل خالص في cron ([[the input device is not a TTY]]). [[-T]] بيقفل الـ TTY، فتقدر تعمل [[< file.sql]] أو [[gunzip | ...]] لأمر جوه الـ container. أي exec في سكربت لازم يبقى معاه [[-T]].`,
          example: R`docker compose exec -T db psql -v ON_ERROR_STOP=1 -U app -d appdb < db/migrations/10-schema.sql
gunzip -c backups/appdb-2026-09-01.sql.gz | docker compose exec -T db psql -U app -d appdb
docker compose exec -T db pg_dump -U app -Fc appdb > appdb.dump
docker compose cp ./creds.json n8n:/tmp/creds.json
docker compose exec -T n8n n8n import:credentials --input=/tmp/creds.json
docker compose exec -T n8n rm -f /tmp/creds.json`,
          try: "على قاعدة تجربة، طبّق ملف SQL صغير بـ exec -T و [[<]]. بعدين جرّب نفس الأمر من غير -T من جوه سكربت واقرا الـ error.",
          deep: {
            why: "السكربتات بتحتاج تبعت ملفات لأوامر جوه الـ containers: migrations، واسترجاع باك أب، واستيراد إعدادات. exec العادي معمول لإنسان قدام ترمنال، مش لسكربت.",
            how: R`الـ TTY ترمنال وهمي بيعدّل البيانات اللي معدّية: بيحوّل نهايات السطور، وبيفترض إن فيه كيبورد. ده كويس لـ psql تفاعلي، ومصيبة لـ dump ثنائي أو ملف SQL جاي من [[<]].

[[-T]] بيلغي الـ TTY، و compose exec بيسيب الـ stdin مفتوح لوحده، فالملف أو الـ pipe بيعدّي زي ما هو. (في [[docker exec]] العادي بتكتب [[-i]] بس من غير [[-t]].)

[[-v ON_ERROR_STOP=1]]: من غيرها psql بيكمل بعد أي error ويخرج بـ 0، فالسكربت يفتكر كله تمام. ضيف [[--single-transaction]] (أو [[-1]]) لو عايز الملف يتطبق كله أو ولا حاجة.

[[pg_dump -Fc]] بيطلّع ملف ثنائي مضغوط. مع TTY كان هيتبوّظ من غير ما تاخد بالك، ومش هتعرف غير يوم الاسترجاع.

[[compose cp]] بينقل ملف لخدمة باسمها في compose. لو الملف فيه أسرار، امسحه أول ما تخلص.`,
            when: "migrations من سكربت أو Makefile، واسترجاع باك أب، و pg_dump في cron، واستيراد ملفات لخدمة.",
            mistakes: R`في مشروع حقيقي سكربت كان بيحقن ملف credentials جوه container بـ compose cp ويمسحه بعد الـ import. بس لو السكربت وقع بين الـ cp والـ rm، الملف بالتوكن بيفضل في /tmp جوه الـ container، لأن الـ trap كان بينضّف الجهاز بس. حط الـ rm جوه الـ trap كمان. وفي نفس المشروع migrations بتتطبق في loop من غير transaction، فلو ملف فشل في النص، الملفات اللي قبله اتطبقت والقاعدة في حالة بين بين.`
          },
          lines: [
            "طبّق ملف SQL من جهازك على القاعدة، ووقّف عند أول error.",
            "فك ضغط باك أب وابعته على طول لـ psql جوه الـ container.",
            "اعمل dump ثنائي واكتبه على جهازك (من غير TTY عشان ميتبوّظش).",
            "انقل ملف لخدمة n8n باسمها.",
            "استورده من جوه.",
            "وامسحه على طول لأن فيه أسرار."
          ]
        },
        {
          cmd: "compose run",
          title: "container مؤقت من خدمة للتيستات أو أمر لمرة",
          desc: R`[[docker compose run]] بيعمل container جديد بنفس إعدادات الخدمة (الـ image والشبكة والمتغيرات)، ينفّذ أمر ويخرج، والخدمة الشغالة متتلمسش. [[--rm]] يمسحه بعدها، و [[--no-deps]] ميشغّلش الخدمات اللي بتعتمد عليها، و [[-e]] و [[-v]] بيغيّروا إعدادات المرة دي بس، زي إنك توجّهه لقاعدة تيست.`,
          example: R`docker compose run --rm --no-deps \
  -v ./app/tests:/app/tests:ro \
  -e DATABASE_URL="postgresql://app:secret@db:5432/app_test" \
  -e REDIS_URL=redis://redis:6379/15 \
  app sh -c 'python -m pytest -q -p no:cacheprovider'
docker compose run --rm app npx prisma migrate deploy`,
          try: "شغّل أمر [[env]] بـ compose run ومعاه [[-e]] مختلف، وقارن بـ [[docker compose exec app env]]: الخدمة الشغالة متأثرتش.",
          deep: {
            why: "عايز تشغّل التيستات بنفس بيئة التطبيق بالظبط، بس على قاعدة تانية، ومن غير ما توقف أو تلمس الخدمة الشغالة.",
            how: R`[[exec]] بيدخل container شغال. [[run]] بيعمل واحد جديد من نفس تعريف الخدمة، باسم زي [[myapp-app-run-a1b2]].

[[run]] مش بيفتح [[ports]] بتاعة الخدمة (عشان ميتخانقش مع الشغالة)، إلا لو كتبت [[--service-ports]].

[[--no-deps]]: من غيره، compose يشغّل db و redis لو مش شغالين. هنا هما شغالين أصلًا، فمش محتاجين.

[[-v ./app/tests:/app/tests:ro]] بيحط التيستات من جهازك من غير build جديد. و [[:ro]] عشان كده [[-p no:cacheprovider]]: pytest ميحاولش يكتب فولدر الكاش في مكان للقراءة بس.

[[redis:6379/15]]: قاعدة رقم ١٥ في Redis، فمفاتيح التيست متتخلطش ببيانات التطبيق على قاعدة 0.

والسطر الأخير استخدام تاني شائع: migration لمرة قبل ما تشغّل النسخة الجديدة.`,
            when: "التيستات في CI أو على السيرفر، و migrations، وسكربتات الصيانة لمرة (seed، أو تنضيف بيانات).",
            mistakes: R`نسيان [[--rm]] فتتراكم containers باسم run في [[ps -a]]. والأخطر: تنسى تغيّر DATABASE_URL، فالتيست يشتغل على قاعدة الإنتاج، وتيستات كتير بتمسح الجداول في الأول.`
          },
          lines: [
            "container مؤقت من خدمة app، يتمسح بعدها، ومن غير ما يشغّل حاجة معاه...",
            "...التيستات من جهازك للقراءة بس...",
            "...وقاعدة تيست بدل قاعدة التطبيق...",
            "...و Redis على قاعدة ١٥ منفصلة...",
            "...وشغّل pytest من غير ما يكتب ملفات كاش.",
            "استخدام تاني: migration لمرة في container بيتمسح."
          ]
        },
        {
          cmd: "x- و anchors",
          title: "إعدادات مشتركة بين كذا خدمة من غير تكرار",
          desc: R`لو عندك خدمتين من نفس الـ image بنفس المتغيرات (السيرفر والـ worker مثلًا)، اكتب الإعدادات المشتركة مرة واحدة في مفتاح بيبدأ بـ [[x-]]، وعلّم عليها بـ [[&اسم]]، وفي كل خدمة [[<<: *اسم]] تدمجها. compose بيتجاهل أي مفتاح بيبدأ بـ [[x-]]، فده مكانها الطبيعي.`,
          example: R`x-app-common: &app-common
  image: ghcr.io/USER/myapp:1.4.0
  env_file: .env
  restart: unless-stopped
  depends_on:
    redis: { condition: service_healthy }
services:
  web:
    <<: *app-common
    command: node server.js
    ports: ["127.0.0.1:3000:3000"]
  worker:
    <<: *app-common
    command: node worker.js`,
          try: "اكتب خدمتين بـ anchor مشترك، واعمل [[docker compose config]]، وشوف الإعدادات اتنسخت في الاتنين.",
          flag: "script",
          deep: {
            why: "الـ web والـ worker نفس الكود ونفس المتغيرات، والفرق في الأمر بس. نسخ ١٥ سطر في الاتنين معناه إنك يوم تعدّل واحد وتنسى التاني.",
            how: R`دي مميزات في YAML نفسه، مش في compose. [[&app-common]] بيحط اسم على البلوك. [[*app-common]] بيشاور عليه. و [[<<:]] (merge key) بيدمج مفاتيحه في المكان ده.

[[x-]] في أول المفتاح بيقول لـ compose «ده امتداد، متعتبروش خدمة ولا تديني error عليه».

الدمج سطحي: أي مفتاح تكتبه في الخدمة بيستبدل المفتاح اللي في الـ anchor بالكامل، مش بيندمج جواه. لو الـ anchor فيه environment وكتبت environment في الخدمة، environment بتاع الـ anchor كله بيختفي. لو محتاج تزوّد متغيرات، اعمل anchor للـ environment لوحده كـ map، وفي الخدمة [[environment: { <<: *common-env, EXTRA: "1" }]]. ده بيشتغل مع الـ map بس، مش مع القايمة اللي بالشرطة.

و [[docker compose config]] بيوريك النتيجة بعد الدمج، فتتأكد قبل ما تشغّل.`,
            when: "web و worker و scheduler من نفس الكود، أو أي خدمات بتتشارك متغيرات و restart و logging.",
            mistakes: R`تكتب environment في خدمة فتمسح environment بتاع الـ anchor كله من غير ما تاخد بالك، والـ worker يقوم ناقصه إعدادات Redis. وتنسى إن [[x-]] لازم في أول المفتاح، فـ compose يرفضه كمفتاح مش معروف ويطلّع error.`
          },
          lines: [
            "بلوك مشترك compose بيتجاهله، واسمه app-common.",
            "نفس الـ image لكل الخدمات.",
            "نفس المتغيرات.",
            "نفس سياسة الإعادة.",
            "نفس الاعتماد...",
            "...على Redis healthy.",
            "الخدمات.",
            "خدمة الويب:",
            "خد كل اللي في app-common.",
            "وأمرها الخاص.",
            "وبورتها.",
            "خدمة الـ worker:",
            "نفس الإعدادات...",
            "...بأمر مختلف."
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
            mistakes: R`deploy من غير ما تعمل باك أب للقاعدة الأول لو فيه migration. وتنسى prune فالديسك يتملى.

في مشروع حقيقي سكربت الديبلوي كان بيعمل [[down]] قبل [[build]]، فالموقع واقع طول مدة البناء. الصح تبني الأول ([[docker compose build]]) والموقع شغال، وبعدين [[up -d]] يبدّل في ثواني. ولو [[git pull]] فشل، السكربت كان بيكمل وينشر الكود القديم ويقول تمام، و [[sleep 5]] مكان ما يستنى الـ healthcheck بـ [[up -d --wait]].`
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
            mistakes: R`الدومين لسه مش بيشاور على السيرفر وانت حاطط LETSENCRYPT_HOST: الطلب بيفشل، ولو كررته كتير تخبط في حد Let's Encrypt. ونسيان الشبكة، فـ nginx-proxy يرجّع 503. وفي مشروع حقيقي على نفس الإعداد ده، الإنتاج كان كمان فاتح Postgres على 5433 و Redis على 6379 للهوست، و Docker بيعدّي من ufw، فكانوا مكشوفين للنت. مع nginx-proxy مفيش خدمة محتاجة [[ports]] غيره.`
          },
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
          ]
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
          lines: [
            "خدمة certbot.",
            "الصورة الرسمية.",
            "فولدرات مشتركة مع Nginx:",
            "ملفات التحدي (Nginx بيقدّمها على port 80).",
            "الشهادات نفسها.",
            "loop: جرّب renew، ونام ١٢ ساعة بطريقة تتقطع بالإشارة، و trap عشان يقفل على طول مع down.",
            "خدمة nginx (باقي إعداداتها زي ما هي):",
            "loop في الخلفية يعمل reload كل ٦ ساعات عشان يقرا أي شهادة اتجددت، و nginx نفسه في المقدمة."
          ]
        }
      ]
    }
  ]
});
