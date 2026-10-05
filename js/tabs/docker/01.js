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
    },
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
          lines: [
            "وقّف السكربت عند أول أمر يفشل.",
            "الخطوة القبلية: مزامنة الـ schema.",
            "node ياخد مكان الشيل ويبقى العملية رقم 1."
          ],
          sol: R`من غير [[exec]]: [[docker stop]] بياخد حوالي [[10]] ثواني بالظبط، و [[docker inspect --format '{{.State.ExitCode}}' api]] بيطبع [[137]] (اتقتل بـ SIGKILL). ده لأن [[sh]] هو PID 1 واستلم SIGTERM ومابعتهاش لـ node، فـ Docker استنى المهلة وقتله.

مع [[exec node server.js]]: الـ stop بياخد أقل من ثانية (عندي 0.29 ثانية)، والـ exit code [[0]]، ولو التطبيق بيسمع SIGTERM هتلاقي رسالته في [[docker logs]]. لأن [[exec]] خلّى node ياخد مكان sh ويبقى هو PID 1.

الغلط الشائع: السكربت يفشل بـ [[exec /entrypoint.sh: permission denied]] (نسيت [[chmod +x]]) أو [[no such file or directory]] مع إن الملف موجود: دي نهايات سطور CRLF من ويندوز، فالسطر الأول بقى [[#!/bin/sh\r]].`,
          solCode: R`printf '#!/bin/sh\nset -e\necho migrate\nnode server.js\n' > entrypoint.sh
chmod +x entrypoint.sh
printf 'FROM myapi\nCOPY entrypoint.sh /entrypoint.sh\nENTRYPOINT ["/entrypoint.sh"]\n' > Dockerfile.ep
docker build -f Dockerfile.ep -t myapi:ep .
docker run -d --name api myapi:ep
time docker stop api
docker inspect --format '{{.State.ExitCode}}' api
docker rm api
sed -i 's/^node server.js/exec node server.js/' entrypoint.sh`
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
  ]
});
