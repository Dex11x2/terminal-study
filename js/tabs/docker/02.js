// تكملة تاب docker: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/docker/01.js (شرح حقول الدرس في أوله)
MORE("docker", [
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
          ],
          sol: R`بعد ما تمسح الـ container وتعمل واحد جديد بنفس [[-v pgdata:/var/lib/postgresql/data]]، [[select * from t]] بيرجّع الصف اللي دخلته ([[1]] و [[(1 row)]]). ولوج Postgres التاني مش هيقول [[initdb]] تاني، هيقول [[Skipping initialization]] لأنه لقى البيانات.

[[docker volume inspect pgdata]] بيوري [[Mountpoint]] زي [[/var/lib/docker/volumes/pgdata/_data]]: البيانات عايشة هناك على الجهاز، مش جوه الـ container.

الغلط الشائع: الجدول اختفى. يبقى الاسم في [[-v]] اتكتب غلط (فاتعمل volume جديد فاضي)، أو المسار جوه الـ container غلط، أو استخدمت [[postgres:18]] اللي المسار المقترح فيها بقى [[/var/lib/postgresql]]. و [[psql: could not connect]] أول ثواني طبيعي: استنى الـ DB تقوم.`,
          solCode: R`docker volume create pgdata
docker run -d --name db -v pgdata:/var/lib/postgresql/data -e POSTGRES_PASSWORD=secret postgres:16-alpine
sleep 5
docker exec db psql -U postgres -c "create table t(x int); insert into t values(1);"
docker rm -f db
docker run -d --name db -v pgdata:/var/lib/postgresql/data -e POSTGRES_PASSWORD=secret postgres:16-alpine
sleep 3
docker exec db psql -U postgres -c "select * from t"`
        },
        {
          cmd: "bind mount",
          title: "فولدر من جهازك جوه الـ container",
          desc: R`الـ bind mount بيربط فولدر حقيقي من جهازك بمسار جوه الـ container، فالاتنين بيشوفوا نفس الملفات لايف: تعدّل على جهازك يظهر جوه فورًا من غير build، وده أساس الـ hot reload في التطوير. الفرق عن الـ volume إن الـ volume Docker هو اللي بيديره وبيخزنه في مكانه، أما هنا انت اللي بتحدد الفولدر.

الشكل [[-v مسار_عندك:مسار_جوه]]. [[$(pwd)]] بيطلّع المسار الكامل للفولدر الحالي، لأن [[-v]] محتاج مسار كامل مش نسبي. في الأول nginx بيعرض فولدر site بتاعك، و [[:ro]] (read only) بتمنع الـ container يكتب فيه. في التاني [[-it]] تفاعلي، و [[--rm]] امسح الـ container لما يخلص، و [[-w /app]] اشتغل من الفولدر ده، فبتشغّل [[npm test]] على كودك من غير ما يكون Node متسطب عندك.

على ويندوز مع WSL خلّي المشروع جوه ملفات لينكس مش [[/mnt/c]]، وإلا هيبقى بطيء جدًا.`,
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
          ],
          sol: R`أول مرة الصفحة بتوري المحتوى القديم، وبعد ما تعدّل [[site/index.html]] من جهازك وتعمل ريفريش بتوري الجديد على طول، من غير build ولا restart. جربتها: [[<h1>v1</h1>]] وبعد التعديل [[<h1>v2</h1>]].

ده لأن الفولدر نفسه متوصل جوه الـ container، مش نسخة منه. و [[:ro]] معناها nginx يقرا بس، ومايقدرش يكتب في فولدرك.

الأغلاط الشائعة: الصفحة 403 أو صفحة nginx الافتراضية: المسار غلط (مثلًا انت مش في الفولدر اللي فيه [[site]])، و Docker بيعمل فولدر فاضي لو المسار مش موجود. وعلى ويندوز في PowerShell [[$(pwd)]] ممكن تبوظ بسبب المسافات؛ حطها بين علامتين أو استخدم [[$__{PWD}]].`
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
          ],
          sol: R`من container على نفس الشبكة: [[ping -c1 db]] بيطبع [[PING db (172.19.0.2)]] و [[64 bytes from 172.19.0.2]]، و [[nc -zv db 5432]] بيطبع [[db (172.19.0.2:5432) open]]. يعني الاسم اتحل لـ IP والبورت مفتوح.

ومن container مش على الشبكة (على الـ bridge الافتراضية) نفس الأمر بيقول [[ping: bad address 'db']]: الأسامي بتشتغل بس جوه شبكة انت عاملها ([[docker network create]]) أو شبكة compose.

الغلط الشائع: تحاول [[localhost:5432]] من container التطبيق فيرد [[Connection refused]]، لأن localhost جوه الـ container هو الـ container نفسه. استخدم اسم الـ service. و [[psql -h db]] ممكن يطلع [[Connection refused]] أول ثواني وقاعدة البيانات لسه بتقوم.`,
          solCode: R`docker network create appnet
docker run -d --name db --network appnet -e POSTGRES_PASSWORD=secret postgres:16-alpine
docker run --rm --network appnet alpine sh -c "ping -c1 db; nc -zv db 5432"
docker run --rm alpine ping -c1 db`
        },
        {
          cmd: "env file",
          title: "المتغيرات من ملف",
          desc: R`بدل ما تكتب [[-e KEY=value]] عشرين مرة، [[--env-file .env]] بيقرا ملف فيه سطر لكل متغير بالشكل [[KEY=value]] ويبعتهم كلهم للـ container. الملف بيفضل على السيرفر ومش بيدخل جوه الـ image، فالأسرار متتحطش في صورة ممكن تترفع لأي registry.

[[-e PORT=4000]] بعد الـ env-file بيغطي على قيمة PORT اللي في الملف، فتغيّر متغير واحد من غير ما تعدّل الملف. و [[docker exec api env]] بيشغّل [[env]] جوه الـ container اللي اسمه api ويطبع كل متغيراته، و [[| sort]] يرتّبهم أبجديًا عشان تلاقي اللي بتدوّر عليه.

خد بالك إن [[docker run]] بياخد القيمة زي ما هي حرفيًا: [[A="hi"]] بتوصل بعلامات التنصيص جواها، عكس مكتبة dotenv. وخلي [[.env]] في [[.dockerignore]] و [[.gitignore]].`,
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
          lines: ["كل المتغيرات من الملف.", "الملف، و -e بتغطي على متغير واحد منه.", "اتأكد إن المتغيرات وصلت."],
          sol: R`[[docker exec api env | sort]] بيوري المتغيرات اللي في الملف بالظبط زي [[API_KEY=abc]] و [[PORT=3000]]، ومعاهم متغيرات الـ image نفسها زي [[NODE_VERSION=22.x]] و [[PATH]] و [[HOSTNAME]].

ولو ضفت [[-e PORT=4000]] مع [[--env-file]]، [[env]] هيوري [[PORT=4000]]: الـ [[-e]] بيكسب.

الأغلاط الشائعة: قيمة ظاهرة بعلامات تنصيص زي [[API_KEY="abc"]]: [[docker run --env-file]] مابيشيلش العلامات (عكس compose)، فاكتب القيم من غير تنصيص. ولو عدّلت [[.env]] والتطبيق لسه شايف القديم، المتغيرات بتتقري وقت إنشاء الـ container بس؛ لازم [[docker rm -f]] وتشغّل من جديد، مش restart.`
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
          ],
          sol: R`قبل أي تعديل رقم الـ inode بره وجوه واحد (عندي [[2214043]] الاتنين). بعد [[sed -i]] الرقم بره اتغير ([[2214050]]) وجوه فضل القديم، و [[grep]] جوه الـ container بيوري المحتوى القديم. ده لأن [[sed -i]] بيكتب ملف جديد ويبدّله بالاسم، والـ container لسه ماسك الملف القديم.

بعد [[docker restart web]] الرقمين بقوا زي بعض تاني. ومن هنا لو كتبت بـ [[cat new.conf > file]] الرقم مابيتغيرش، والتعديل بيبان جوه على طول، و [[nginx -t]] و [[nginx -s reload]] كفاية.

الغلط الشائع: تعمل [[nginx -s reload]] بعد التعديل بمحرر زي VS Code أو [[sed -i]] وتستغرب إن مفيش حاجة اتغيرت. الأسهل: اربط الفولدر كله ([[./nginx:/etc/nginx/conf.d]]) بدل ملف واحد.`,
          solCode: R`docker run -d --name web -v $(pwd)/nginx/default.conf:/etc/nginx/conf.d/default.conf nginx:alpine
stat -c %i nginx/default.conf; docker exec web stat -c %i /etc/nginx/conf.d/default.conf
sed -i 's/localhost;/localhost2;/' nginx/default.conf
stat -c %i nginx/default.conf; docker exec web stat -c %i /etc/nginx/conf.d/default.conf
docker restart web
cat new.conf > nginx/default.conf
stat -c %i nginx/default.conf; docker exec web stat -c %i /etc/nginx/conf.d/default.conf`
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
          ],
          sol: R`[[docker compose down -v]] بيطبع إنه شال الـ containers والـ network، لكن مفيش سطر [[Volume ... Removed]] للـ volume الـ external. و [[docker volume ls]] بعدها لسه بيوري [[pgdata]].

قارنها بـ volume عادي: نفس الأمر بيطبع [[Volume myapp_pgdata Removed]] والبيانات بتروح. الـ external معناه «compose مش صاحبه»، فلا بيعمله ولا بيمسحه.

الغلط الشائع: [[docker compose up]] يقول [[external volume "pgdata" not found]]: لازم [[docker volume create pgdata]] الأول. ولو نسيت [[name: pgdata]]، compose ممكن يدوّر على اسم تاني، فاكتبه صريح.`
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
          ],
          sol: R`[[docker compose exec nginx wget -qO- http://myapp:3000]] بيطبع رد التطبيق (HTML أو JSON). ده معناه إن الاتنين على شبكة [[proxy]] والاسم بيتحل. و [[docker network inspect proxy]] بيوري الـ containers الاتنين تحت [[Containers]].

كل مشروع لسه على شبكته [[default]] كمان، فقاعدة بيانات المشروع مش ظاهرة للمشاريع التانية طالما مش على proxy.

الأغلاط الشائعة: [[network proxy declared as external, but could not be found]]: نسيت [[docker network create proxy]]. و [[wget: bad address 'myapp']]: الخدمة مش على proxy (نسيت [[networks: [default, proxy]]]) أو اسم الخدمة غير اللي بتطلبه. ولو مشروعين فيهم خدمة بنفس الاسم [[app]] على proxy، الاسم هيتحل لأي واحد منهم؛ استخدم أسامي مختلفة أو [[container_name]] أو aliases.`
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
          ],
          sol: R`من غير [[--host]]: [[docker exec web wget -qO- localhost:5173]] بيرجع صفحة Vite (شغال من جوه)، لكن [[curl localhost:5173]] من جهازك بيطلع [[Recv failure: Connection reset by peer]] أو [[Empty reply from server]]، والمتصفح بيقول الصفحة مش متاحة.

بعد [[--host 0.0.0.0]] وإعادة التشغيل: الاتنين بيشتغلوا. جربتها بسيرفر Node: على [[127.0.0.1]] الـ curl من بره فشل بـ exit 56، وعلى [[0.0.0.0]] رد عادي.

الغلط الشائع: تفتكر المشكلة في [[ports]] وتغيّرها. Docker بيوصّل البورت لـ interface الشبكة بتاع الـ container، والتطبيق اللي سامع على 127.0.0.1 مش سامع هناك. ونفس الكلام لـ Next ([[-H 0.0.0.0]]) و FastAPI ([[--host 0.0.0.0]]).`
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
          ],
          sol: R`من غير سطور POLLING (والمشروع على درايف ويندوز زي [[C:]] أو [[/mnt/c]]): بتحفظ الملف ومفيش حاجة بتحصل، ولا [[docker compose logs -f web]] بيطبع [[Compiling]]. ده لأن أحداث تغيير الملفات مش بتعدّي من ويندوز لجوه VM بتاع Docker.

بعد ما تضيفهم و [[docker compose up -d]] (بيعمل recreate للـ container لأن environment اتغير): أي حفظ بيطلّع في اللوج [[○ Compiling /page ...]] أو [[✓ Compiled]] والصفحة بتتحدث في ثانية أو اتنين.

لو المشروع جوه فايلات WSL نفسها ([[~/projects]] مش [[/mnt/c]]) غالبًا هيشتغل من غير polling وأسرع بكتير، ودي الطريقة الأحسن. الغلط الشائع: تعمل [[docker compose restart]] بعد إضافة المتغيرات، و restart مش بيقرا environment جديد؛ لازم [[up -d]].`
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
          ],
          sol: R`[[psql -h localhost -p 5433 -U myapp myapp]] من جهازك بيدخلك Postgres اللي في Docker، و [[select version();]] هيوري نسخة الـ image. و [[docker compose port db 5432]] بيطبع [[127.0.0.1:5433]].

يعني البورت 5432 جوه الـ container (وده اللي الـ containers التانية بتستخدمه بـ [[db:5432]])، و 5433 على جهازك بس. و Postgres بتاع جهازك لسه على 5432 ومحدش اتخانق.

الغلط الشائع: [[psql -p 5433]] من غير [[-h localhost]] على لينكس بيحاول socket محلي ويقول [[No such file or directory]]، لأن من غير host بيروح لـ Postgres الجهاز. ولو [[connection refused]] اتأكد إنك كتبت [[5433:5432]] مش [[5432:5433]]: الشمال جهازك واليمين جوه.`
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
          ],
          sol: R`على أي سيرفر Docker حديث [[docker compose version]] بيطبع [[Docker Compose version v2.x]] أو أحدث (عندي [[v5.1.1]]). و [[docker-compose version]] غالبًا بيطبع [[command not found]]، إلا لو حد مسطّب النسخة القديمة v1 (بتطبع [[docker-compose version 1.29.x]]) أو الـ binary المنفصل.

لو [[docker compose]] قال [[docker: 'compose' is not a docker command]]: سطّب [[sudo apt install docker-compose-plugin]] (من repo بتاع Docker)، وجرّب تاني.

الغلط الشائع: تفضل على v1 القديمة. هي متوقفة من ٢٠٢٣ ومش بتفهم حاجات زي [[depends_on.condition]] الجديدة ولا [[develop.watch]]، وأسماء الـ containers فيها بشرطة سفلية بدل الشرطة، فالسكربتات تتلخبط.`
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
          ],
          sol: R`[[docker compose -p myapp2 ps]] بيوري containers أساميها بتبدأ بـ [[myapp2-]] (زي [[myapp2-web-1]])، و [[docker compose ps]] العادي بيوري بتاعة المشروع الأصلي بس. الاتنين بيفتحوا في المتصفح على البورتين المختلفين، ولكل واحد volumes وشبكة خاصة بيه.

و [[config]] بيوريك الـ ports النهائية بعد الدمج. خلّي بالك: الـ [[ports]] في الملف التاني بتتضاف على اللي في الأول مش بتحل محلها، فلو الأول فيه [[8080:80]] النسخة التانية هتحاول تاخده برضه وتفشل بـ [[port is already allocated]]. الحل تحط البورت في [[.env]] كمتغير، أو تكتب [[ports: !override ["8081:80"]]] في الملف التاني (جربتها وكل نسخة طلعت على بورتها).

الغلط الشائع: تنسى [[-p myapp2]] في [[down]]، فتقفل النسخة الأصلية بدل التانية.`,
          solCode: R`printf 'services:\n  web:\n    ports: !override ["127.0.0.1:8081:80"]\n' > compose.second.yml
docker compose up -d
docker compose -p myapp2 -f compose.yml -f compose.second.yml up -d
docker compose -p myapp2 ps
docker compose -p myapp2 down`
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
          ],
          sol: R`[[docker compose exec web grep -rl "النص الجديد" /usr/share/nginx/html]] (أو المسار اللي فيه الـ build) بيطبع اسم ملف زي [[/usr/share/nginx/html/assets/index-B2x9.js]] لو التعديل وصل. ساعتها المشكلة في المتصفح أو CDN: Ctrl+Shift+R أو افتح incognito.

لو الـ grep مطلّعش حاجة، يبقى الـ image القديمة لسه شغالة. قارن [[docker compose images web]] (الـ ID والوقت) بـ آخر build، وشوف هل الـ container اتعمله recreate فعلًا. [[up -d --force-recreate]] بيحل ده، ولو لسه، [[--no-cache]] مع [[--progress=plain]] يوريك خطوة الـ COPY نسخت إيه.

الغلط الشائع: النص مكتوب في ملف [[.env]] أو متغير [[VITE_]] ومتغيرات Vite بتتحط وقت البناء. أو الـ [[.dockerignore]] مستبعد الفولدر اللي عدّلته.`
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
          ],
          sol: R`[[docker compose up -d]] بيطبع ترتيب زي: [[Container myapp-db-1 Started]] وبعدها [[Container myapp-db-1 Waiting]] وبعدها [[Container myapp-db-1 Healthy]]، وبعد كده بس [[Container myapp-api-1 Starting]] و [[Started]]. ده [[condition: service_healthy]] شغال: api استنى الـ healthcheck.

و [[docker compose ps]] بيوري الاتنين [[Up ... (healthy)]] للـ db و [[Up]] للـ api.

الغلط الشائع: [[dependency failed to start: container myapp-db-1 is unhealthy]]: الـ healthcheck بيفشل (مثلًا [[pg_isready -U postgres]] واليوزر عندك اسمه تاني). شوف [[docker inspect --format '{{json .State.Health}}' myapp-db-1]]. ولو [[env file .env not found]]، اعمل ملف [[.env]] حتى لو فاضي.`
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
          ],
          sol: R`بعد ما تعدّل كود الـ api وتعمل [[docker compose up -d --build]]، الناتج بيوري [[Container myapp-db-1 Running]] (ماتلمسش) و [[Container myapp-api-1 Recreate]] و [[Recreated]] و [[Started]]. عندي بالظبط كده، و curl بعدها رجّع النص الجديد.

ده لأن compose بيقارن إعدادات كل خدمة والـ image بتاعتها: db الـ image والإعدادات زي ما هي، فمفيش سبب يعيده.

الغلط الشائع: [[docker compose restart api]] بعد تعديل الكود ومفيش حاجة تتغير: restart بيعيد تشغيل نفس الـ container بنفس الـ image القديمة. محتاج [[up -d --build]]. وخلّي بالك إن [[down -v]] بيمسح الـ volumes، يعني قاعدة البيانات.`
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
          ],
          sol: R`[[docker compose up]] بيقرا [[compose.yml]] و [[compose.override.yml]] لوحده، فهتلاقي في اللوج [[[nodemon] starting $__btnode server.js$__bt]]. ولما تعدّل ملف وتحفظ: [[[nodemon] restarting due to changes...]] وبعدها [[starting]] تاني، من غير build.

و [[docker compose config]] بيوري الدمج: [[command: npm run dev]] و [[target: build]] والبورتين والـ volumes.

الأغلاط الشائعة: [[nodemon: not found]]: مرحلة الـ build مفيهاش devDependencies (اتسطبت بـ [[--omit=dev]]) أو الـ target غلط. والتعديل مش بيوصل على ويندوز: ضيف polling (درس hot reload). وفي الإنتاج اكتب [[docker compose -f compose.yml up -d]] صريح عشان الـ override مايتقريش.`
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
          ],
          sol: R`[[docker compose watch]] بيبني ويشغّل ويطبع [[Watch enabled]]. لما تعدّل ملف في [[src]]: [[Syncing service "api" after 1 changes were detected]]، و [[docker compose exec api cat /app/src/الملف]] بيوري المحتوى الجديد، من غير build.

لما تعدّل [[package.json]] (زي ما تضيف باكدج): [[Rebuilding service(s) ["api"] after changes were detected...]] وبعدها [[Container ...-api-1 Recreated]] و [[Started]]. جربت الاتنين والنتيجة كانت كده بالظبط.

الغلط الشائع: الـ sync بيوصل بس التطبيق مش بيعيد التحميل، لأن الـ container شغال بـ [[node]] مش nodemon أو [[node --watch]]؛ الـ sync بينقل الملف بس. و [[path]] لازم يبقى نسبي من مكان الـ compose.yml، و [[target]] مسار جوه الـ container.`
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
          ],
          sol: R`[[docker compose up -d]] العادي مش بيشغّل adminer خالص. و [[docker compose --profile tools up -d]] بيطبع [[Container myapp-adminer-1 Created]] و [[Started]] والباقي [[Running]]، و [[docker compose ps]] بيوريه في القايمة.

والخدمة نفسها:
[[adminer: { image: adminer, profiles: [tools], ports: ["127.0.0.1:8081:8080"] }]].

الغلط الشائع: [[docker compose down]] من غير [[--profile tools]] ممكن يسيب adminer شغال أو يشتكي إن الشبكة لسه مستخدمة. استخدم نفس الـ profile في down. و [[--scale]] مع خدمة عندها [[container_name]] أو بورت ثابت زي [[3000:3000]] هيفشل بـ [[port is already allocated]]، فالخدمة اللي بتعملها scale ماتنشرش بورت.`,
          solCode: R`cat >> compose.yml <<'EOF2'
  adminer:
    image: adminer
    profiles: [tools]
    ports: ["127.0.0.1:8081:8080"]
EOF2
docker compose up -d
docker compose --profile tools up -d
docker compose --profile tools ps`
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
          ],
          sol: R`[[docker compose config]] بيطبع ملف واحد متدمج ومتنضف: كل خدمة بـ [[environment]] فيه القيم الحقيقية بعد التعويض من [[.env]] (وحتى [[env_file]] بيتحول لقيم)، والـ [[volumes]] مكتوبة بالشكل الطويل [[type: volume]] و [[source]] و [[target]]، والـ ports بـ [[published]] و [[target]]، واسم الشبكة الافتراضية [[myapp_default]].

لو عندك [[compose.override.yml]]، هتلاقي حاجاته متدمجة فوق الأصلي (مثلًا [[command: npm run dev]]). ده أسرع طريقة تعرف «إيه اللي Compose شايفه فعلًا».

خلّي بالك: الناتج فيه الأسرار بقيمها، فماتلصقوش في issue أو شات. والغلط الشائع إن الأمر يقع برسالة زي [[yaml: line 12: did not find expected key]]: ده غلط مسافات في الملف، والرقم بيقولك فين.`
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
          ],
          sol: R`من غير [[DB_PASSWORD]]: [[docker compose config]] بيقف ويطبع [[required variable DB_PASSWORD is missing a value: DB_PASSWORD missing in .env]] ويخرج بـ 1. وده نفس اللي هيحصل مع [[up]]، فالنشر مش هيكمل بباسورد فاضي.

بعد ما ترجّعه: الناتج فيه [[DB_PASSWORD: s3cret]] و [[REDIS_URL: redis://redis:6379]] (الافتراضي) و [[SENTRY_DSN: ""]] و [[image: ghcr.io/USER/myapi:latest]] و [[published: "3000"]]. جربته بالظبط كده.

الغلط الشائع: تحط المتغير في ملف [[env_file]] تاني غير [[.env]] وتستغرب إنه مش بيتعوض: التعويض [[$__{...}]] جوه compose.yml بيقرا من [[.env]] جنب الملف (أو [[--env-file]]) ومن الـ shell، مش من [[env_file:]] بتاع الخدمة.`
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
          ],
          sol: R`[[docker compose up -d --wait]] بيفضل يطبع [[Waiting]] لحد ما يطبع [[Healthy]] لكل خدمة، وبعدين بيرجّعك للـ prompt بـ exit code 0. لو خدمة وقعت أو فضلت unhealthy بيطبع زي [[container myapp-api-1 is unhealthy]] ويرجع بـ 1، فتقدر تستخدمه في سكربت ديبلوي.

لما تبوّظ [[/health]]: [[docker compose exec api sh -c 'wget -qO- http://localhost:3000/health | grep -q ok || exit 1'; echo $?]] بيطبع [[wget: server returned error: HTTP/1.1 404 Not Found]] و [[1]]. وبعد كام محاولة [[docker compose ps]] بيوري [[(unhealthy)]].

الغلط الشائع: الـ healthcheck بيستخدم [[curl]] والـ image alpine مفيهاش curl، فيفضل unhealthy للأبد. استخدم [[wget]] أو node نفسه. وفي compose لازم [[$$]] بدل [[$]] جوه الـ test.`
        },
        {
          cmd: "exec -T",
          title: "تبعت ملف أو pipe لأمر جوه الـ container",
          desc: R`[[docker compose exec]] بيفتح TTY افتراضيًا، وده بيبوّظ أي input جاي من ملف أو pipe، ولو شغّلته من الترمنال و input جاي من ملف بيفشل خالص ([[the input device is not a TTY]]). [[-T]] بيقفل الـ TTY، فتقدر تعمل [[< file.sql]] أو [[gunzip | ...]] لأمر جوه الـ container. أي exec في سكربت لازم يبقى معاه [[-T]].`,
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
          ],
          sol: R`[[docker compose exec -T db psql -v ON_ERROR_STOP=1 -U app -d appdb < file.sql]] بيطبع ناتج كل أمر ([[CREATE TABLE]] و [[INSERT 0 2]]) ويخرج بـ 0. ولو فيه غلطة في الـ SQL بيقف عندها ويخرج بـ 3 بسبب [[ON_ERROR_STOP]].

من غير [[-T]] وانت شغّال السكربت من ترمنال عادي (والـ input جاي من ملف)، بيقع على طول بـ [[the input device is not a TTY]] و exit 1. جربتها. من cron أو CI (مفيش ترمنال خالص) Compose الحديث ممكن يعدّيها، بس ماتعتمدش على ده: حط [[-T]] في أي سكربت.

الغلط الشائع: تشغّل الملف مرتين، فالمرة التانية تطلع [[ERROR: relation "items" already exists]]. ومن غير [[ON_ERROR_STOP]] بيكمل بعد الغلطة ويخرج بـ 0، فالسكربت يفتكر كله تمام.`
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
          ],
          sol: R`[[docker compose run --rm --no-deps -e DATABASE_URL=postgresql://x@db/app_test app env | grep DATABASE_URL]] بيطبع القيمة الجديدة، و [[docker compose exec app env | grep DATABASE_URL]] بيطبع القيمة الأصلية زي ما هي. جربتها وطلع [[app_test]] في الأول والأصلية في التاني.

ده لأن [[run]] بيعمل container جديد مؤقت اسمه زي [[myapp-app-run-7375a64e3329]]، بإعدادات الخدمة زائد اللي انت غيرته، وبيتمسح بسبب [[--rm]]. والخدمة الشغالة ماتلمستش.

الغلط الشائع: تنسى [[--rm]] فتتراكم containers [[-run-]] في [[docker compose ps -a]]. ومن غير [[--no-deps]] الـ run بيشغّل db و redis لو واقفين. و [[run]] مابينشرش [[ports]] إلا لو ضفت [[--service-ports]].`
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
          ],
          sol: R`[[docker compose config]] بيوري [[web]] و [[worker]] الاتنين فيهم نفس [[image]] و [[env_file]] (متحول لـ environment) و [[restart: unless-stopped]] و [[depends_on]]، وكل واحد بالـ [[command]] بتاعه. و [[web]] بس اللي فيه [[ports]]. وقسم [[x-app-common]] مش ظاهر كخدمة.

جربتها بخدمتين من anchor واحد، والاتنين طلعوا بنفس الإعدادات والـ [[command]] المختلف.

الغلط الشائع: تكتب [[<<: *app-common]] وبعدين [[environment]] في الخدمة، فتلاقي environment بتاع الـ anchor اتمسح. الـ [[<<]] بيدمج أول مستوى بس؛ لو الخدمة فيها نفس المفتاح بيحل محله بالكامل، مش بيدمج جواه. وتعريف الـ anchor لازم يبقى قبل استخدامه في الملف.`
        }
      ]
    }
]);
