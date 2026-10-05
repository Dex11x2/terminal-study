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
          lines: [
            "ترمنال جوه التطبيق.",
            "التطبيق بيرد من جواه؟",
            "متغيرات القاعدة وصلت صح؟",
            "القاعدة بترد على البورت من جوه التطبيق؟",
            "container تشخيص مؤقت على شبكة المشروع."
          ],
          sol: R`الحالة السليمة: [[docker exec api wget -qO- http://localhost:3000/health]] بيطبع [[ok]] أو JSON، و [[docker exec api nc -zv db 5432]] بيطبع [[db (172.x.x.x:5432) open]].

لو الأولى طلعت [[wget: can't connect to remote host (127.0.0.1): Connection refused]]: التطبيق مش سامع أصلًا (وقع أو على بورت تاني)، اقرا [[docker logs api]]. ولو [[wget: server returned error: HTTP/1.1 500]]: التطبيق شغال بس فيه غلطة.

لو التانية طلعت [[nc: bad address 'db']]: الاتنين مش على نفس الشبكة أو اسم الخدمة غلط. ولو [[Connection refused]]: الاسم اتحل بس Postgres واقف أو لسه بيقوم. والغلط الشائع: [[nc: not found]] في بعض الصور؛ استخدم [[docker run --rm -it --network myapp_default alpine sh]] وجرّب من هناك.`
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
          ],
          sol: R`[[trivy image myapi:latest]] (بعد ما ينزل قاعدة الثغرات أول مرة) بيطبع جدول لكل مصدر: سطر للنظام زي [[myapi:latest (alpine 3.x)]] وسطر لـ [[Node.js]] (الباكدجات في package-lock). وتحت كل واحد [[Total: N (UNKNOWN: 0, LOW: .., MEDIUM: .., HIGH: .., CRITICAL: ..)]] وجدول فيه [[Library]] و [[Vulnerability]] (رقم CVE) و [[Installed Version]] و [[Fixed Version]].

ركّز على HIGH و CRITICAL اللي ليها [[Fixed Version]]. في النظام الحل غالبًا [[docker pull node:22-alpine]] وتبني تاني، وفي Node تحدّث الباكدج. جرّب [[--severity HIGH,CRITICAL --ignore-unfixed]] عشان القايمة تبقى مفيدة.

ماجربتش trivy هنا، فالأرقام عندك هتختلف حسب تاريخ الـ image. الغلط الشائع: تحاول تصفّر القايمة كلها؛ ثغرات LOW من غير fix أو في باكدج مابتستخدمهاش مش أولوية.`
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
          ],
          sol: R`بعد ما تشغّل nginx-proxy و acme-companion والمشروع، [[docker logs nginx-proxy]] بيوري إنه ولّد config للدومين، و [[docker logs acme-companion]] بيطبع حاجة زي [[Creating/renewal example.com certificates...]] وبعدين [[Cert success]] (الصياغة بتختلف حسب النسخة).

بعد دقيقة تقريبًا [[curl -I https://example.com]] بيرد [[HTTP/2 200]] بشهادة Let's Encrypt، و [[http://]] بيعمل redirect لـ https.

ماجربتهاش هنا (محتاجة دومين حقيقي وسيرفر). الأغلاط الشائعة: [[503 Service Temporarily Unavailable]] من nginx-proxy معناها إنه مش لاقي container بالـ VIRTUAL_HOST ده على شبكته (نسيت [[networks]] أو الشبكة غلط). والشهادة مش بتطلع لأن DNS مش بيشاور على السيرفر لسه، أو البورت 80 مقفول في الـ firewall، أو خبطت rate limit بتاع Let's Encrypt من كتر المحاولات.`
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
