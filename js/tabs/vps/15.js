// تكملة تاب vps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/vps/01.js (شرح حقول الدرس في أوله)
MORE("vps", [
  {
    t: "حالات حقيقية على السيرفر: نقل وتعديل من غير ما حاجة تقع",
    l: 3,
    time: R`حوالي ٤ ساعات (المعمل لوحده نص ساعة)`,
    goal: [
      R`تنقل كل المواقع من VPS قديم لجديد بترتيب: جرد، ونسخ، واختبار قبل الـ DNS، وتحويل، وخطة رجوع جاهزة.`,
      R`تعمل dump و restore لـ Postgres و Mongo جوه containers من ssh، وتعدّ قبل وبعد بدل ما تصدّق «exit 0».`,
      R`تكتشف بورت container مفتوح للإنترنت رغم ufw، وتفهم ليه، وتقفله صح.`,
      R`تعدّل موقع شغّال: نسخة احتياطية بالاسم، و build في الخلفية، وتبديل container واحد، ورجوع في ثواني.`,
      R`تشغّل نسخة تجربة جنب الإنتاج مبتبعتش إيميلات ولا بتدفع ولا بتلمس داتا الإنتاج.`,
      R`تجرد سيرفر من غير ما الأسرار تطلع في الناتج، وتشغّل سكربت جوه container من غير اقتباسات متداخلة.`,
    ],
    use: {
      prog: R`كل حالة هنا حصلت فعلًا في شغل حقيقي، واتعادت في معمل بأسامي مخترعة. والطريقة واحدة في كله: متغيّرش حاجة قبل ما تثبت السبب، وجهّز الرجوع قبل ما تبدأ.`,
      cs: R`Docker بيكتب قواعد iptables بنفسه، والـ shell بيفك الاقتباسات مرة على كل مستوى (جهازك، وبعدين السيرفر، وبعدين الـ container). نص المشاكل هنا جاية من الطبقتين دول.`,
      work: R`«انقل الموقع لسيرفر أرخص من غير ما يقع»، و«غيّر السعر ده على الموقع الحي»، و«ليه الداتابيز باينة من بره؟» من أكتر الطلبات اللي بتيجي لأي حد ماسك سيرفر.`,
    },
    lab: R`mkdir -p ~/lab/vpscases && cd ~/lab/vpscases`,
    projects: [
      { lvl: 'صغير', t: R`[[inventory.sh]]: جرد سيرفر في ملف واحد`, what: R`سكربت بيتشغّل على السيرفر قراية بس، ويطلّع ملف [[inventory-<hostname>-<date>.txt]] فيه: النظام والموارد، والـ containers وصورها وبورتاتها، والـ mounts والـ volumes، وكل دومين رايح لأنهي بورت (من [[sites-enabled]] من غير التعليقات)، والشهادات، و [[crontab -l]]، وحجم كل فولدر في [[/opt]]. ومن غير ولا قيمة سر. من درس «نقل السيرفر كله».`, done: R`على [[old-vps]] في المعمل الملف فيه [[shop-web-1]] و [[shop-api-1]] و [[shop_data]] و [[shop.example]]، و [[grep -E "S3cr3t|sk_test|lab-smtp" inventory-*.txt]] مبيطلّعش حاجة، وتشغيله مرتين ميغيّرش حاجة على السيرفر.` },
      { lvl: 'صغير', t: R`[[public-ports.sh]]: مين مفتوح للعالم؟`, what: R`بياخد ناتج [[ss -tlnp]] ويطلّع كل بورت سامع على [[0.0.0.0]] أو كل عناوين IPv6 ([[::]]) ومش في لستة مسموحة (22 و 80 و 443 افتراضيًا)، واسم البرنامج اللي فاتحه. ولو [[--from <host>]] بيجرّب البورتات دي فعلًا من جهاز تاني بـ [[/dev/tcp]]. من درس «بورتات Docker مفتوحة رغم ufw».`, done: R`على [[new-vps]] قبل الإصلاح بيطلّع [[5000]] و [[8080]] جنب [[docker-proxy]]، وبعد [[!override]] مبيطلّعش حاجة، وبيرجع exit code غير صفر لو لقى بورت.` },
      { lvl: 'متوسط', t: R`[[db-move.sh]]: نقل Postgres أو Mongo بعدّ قبل وبعد`, what: R`سكربت بياخد [[--from old --to new --pg <container>]] أو [[--mongo <container> --db shop]]. بيعمل dump من ssh لملف بتاريخ، وبيعدّ الجداول والصفوف (أو الـ collections والـ documents والـ indexes) على الاتنين، وبيرفض يكمّل لو [[pg_restore]] طبع [[errors ignored on restore]] أو [[mongorestore]] طبع [[Failed]]. والباسوردات بتتقري جوه الـ container، عمرها ما تعدّي على سطر الأمر عندك. من درس «dump و restore بين سيرفرين».`, done: R`على معمل الدرس بيطبع [[MATCH 3 tables 180 rows]] لـ Postgres و [[MATCH 3 collections, 180 docs, 4 indexes]] لـ Mongo، ولو مسحت document من الجديد بيطبع [[MISMATCH]] وبيخرج بـ 1.` },
      { lvl: 'متوسط', t: R`[[test-copy.sh]]: نسخة تجربة بأمر واحد`, what: R`بياخد فولدر compose ويعمل [[test.env]] (المفاتيح اللي بتوصل لبره فاضية، و [[DATABASE_URL]] لداتابيز التجربة)، و [[test.yml]] (بورتات تانية على [[127.0.0.1]]، و volume تاني، و [[!reset]] للبورتات اللي مش محتاجها)، ويشغّل [[docker compose -p <name>-test config]] ويرفض يكمّل لو لقى اسم volume الإنتاج أو بورت الإنتاج أو مفتاح مش فاضي. من درس «نسخة تجربة جنب الإنتاج».`, done: R`على المعمل النسخة بتقوم بـ [[shop-test-*]]، و [[docker exec shop-test-api-1 env]] فيه [[SMTP_PASS=]] فاضي، و [[docker ps]] لسه فيه [[shop-web-1]] شغال من قبلها بنفس الـ uptime.` },
      { lvl: 'كبير', t: R`[[safe-deploy.sh]]: تعديل وتبديل ورجوع لأي service`, what: R`أداة كاملة لسيرفر عليه compose: (١) تعمل [[docker tag <img>:latest <img>:pre-<date>-<time>]]. (٢) تاخد نسخة من الملفات اللي هتتغيّر في [[/root/bak-<date>]]. (٣) تعمل build في الخلفية بلوج، وتستنى بـ [[pgrep -f "[c]ompose build"]] أو سطر [[Built]]. (٤) تتأكد إن الـ image الجديدة فيها نص التعديل والقديمة لأ. (٥) تبدّل بـ [[up -d --no-build --no-deps]] وتقيس الطلبات اللي فشلت أثناء التبديل. (٦) تفحص [[/health]] وعدد الـ 5xx في لوج nginx من ساعة التبديل، ولو فيه مشكلة ترجع لوحدها. وكل خطوة في لوج، و [[--dry-run]] بيوري الخطة بس.`, done: R`على معمل الدرس: تعديل نص في [[index.html]] بيوصل للموقع، ورقم الطلبات الفاشلة متسجّل، ولو خليت [[/health]] يرجع 500 الأداة بترجع للـ tag القديم لوحدها و [[curl]] بيرجّع النص القديم، وتشغيلها تاني من غير تعديل بتقول «nothing to deploy».`, ext: R`خليها تبعت رسالة Telegram بالنتيجة (درس «تنبيه Telegram»)، وتحتفظ بآخر ٣ tags بس وتمسح الأقدم، وتشتغل من GitHub Actions بـ ssh.` },
      { lvl: 'كبير', t: R`[[migrate-runbook]]: نقل سيرفر كامل بخطوات بتتعاد`, what: R`مجموعة سكربتات مترقّمة: [[01-inventory]] و [[02-prepare-new]] (ufw بالترتيب الصح، و nginx) و [[03-sync]] (rsync و images و volumes، وتتعاد كذا مرة) و [[04-test]] ([[curl --resolve]] لكل دومين من الجرد) و [[05-cutover]] (stop على القديم، ومزامنة أخيرة، و dump نهائي، و nginx القديم يحوّل للجديد) و [[06-rollback]]. كل سكربت بيكتب لوج وبيقف عند أول خطأ ([[set -euo pipefail]]).`, done: R`على معمل الدرس بتنقل [[shop.example]] من [[old-vps]] لـ [[new-vps]]: [[sha256sum]] لملفات الـ uploads متطابق، وعدد الداتا متطابق، و [[curl]] بـ IP القديم والجديد بيرجّع 200، و [[06-rollback]] بيرجّع القديم شغال في أقل من دقيقة.`, ext: R`ضيف [[--dry-run]] لكل سكربت، وتقرير HTML صغير في الآخر فيه كل رقم اتقاس، وخليه يدعم أكتر من دومين من ملف واحد.` },
      { lvl: 'فكرة', t: R`سجل الحوادث بتاعك (postmortems)`, what: R`كل ما يحصل حاجة على سيرفر (وقع، أو بطء، أو داتا ناقصة)، اكتبها بنفس شكل دروس الوحدة دي: العَرَض بنص الرسالة، والفحوصات بالترتيب وليه، والسبب، والحل والبدايل اللي رفضتها، وإزاي اتأكدت، وإزاي متتكررش. وأعد كل حادثة في معمل Docker بأسامي مخترعة. انت اللي بتختار الشكل.`, done: R`فيه ٣ حوادث على الأقل، وكل واحدة فيها سكربت معمل بيعيدها من الصفر، وزميل قدر يمشي على واحدة لوحده ويوصل لنفس السبب.`, ext: R`حوّل كل حادثة لاختبار في GitHub Actions: المعمل يقوم، والحل يتطبّق، وسطر [[test]] يتأكد إنها اتحلّت.` },
    ],
    n: R`حالات حصلت فعلًا على سيرفرات حقيقية واتعادت في معمل Docker بأسامي مخترعة: نقل كل المواقع لسيرفر جديد، ونقل الداتابيز جوه containers، وبورتات مفتوحة رغم الفايروول، وتعديل موقع حي بأمان، ونسخة تجربة جنب الإنتاج، وأسرار واقتباسات بتبوّظ الأوامر. كل حالة: العَرَض، والفحوصات بالترتيب، والسبب، والحل، والبدايل اللي اترفضت، والتأكيد، والوقاية`,
    items: [
      {
        cmd: "نقل السيرفر كله",
        title: "انقل كل المواقع من VPS قديم لجديد من غير ما حاجة تقع",
        learn: R`تنقل موقع شغّال بـ Docker لسيرفر جديد بالترتيب: جرد، ونسخ، واختبار قبل الـ DNS، وتحويل، ورجوع جاهز.`,
        out: R`[[curl --resolve]] على الجديد بيرجّع 200 قبل ما تلمس الـ DNS، والقديم جاهز يرجع في دقيقة.`,
        desc: R`نقل سيرفر مش «انسخ وشغّل». الترتيب هو اللي بيخلّي الموقع ميقعش: **جرد** القديم قراية بس، وبعدين **نسخ** الملفات والصور والـ volumes للجديد وهو لسه مش واخد زوار، وبعدين **اختبار** الجديد بـ [[curl --resolve]] قبل ما الـ DNS يتحرك، وبعدين **تحويل** (إيقاف القديم، ومزامنة أخيرة، وتغيير الـ DNS)، و**القديم يفضل جاهز** للرجوع أسبوع.

الأدوات: [[docker inspect]] عشان تعرف فين الداتا، و [[rsync -aH]] للملفات (الـ [[-H]] بيحافظ على الـ hard links)، و [[docker save | docker load]] للصور بدل ما تبني من الصفر، و [[tar]] جوه container صغير لمحتوى الـ named volumes.`,
        example: R`# ١) على old-vps: جرد قراية بس (مين شغال، وفين الداتا، وأنهي دومين رايح فين)
docker ps --format "{{.Names}}: {{.Image}} {{.Status}} {{.Ports}}"
docker inspect $(docker ps -q) --format "{{.Name}}: {{range .Mounts}}[{{.Type}} {{.Name}}{{.Source}} -> {{.Destination}}] {{end}}"
grep -hvE "^\s*#" /etc/nginx/sites-enabled/* | grep -E "server_name|proxy_pass|listen"
# ٢) على new-vps: اسحب الملفات والصور والـ volume من القديم
rsync -aHz --info=stats1 --exclude node_modules --exclude .git old:/opt/shop/ /opt/shop/
ssh old "docker save shop-web:latest shop-api:latest" | docker load
docker volume create shop_data
ssh old "docker run --rm -v shop_data:/v:ro alpine:3.21 tar -C /v -cf - ." | docker run --rm -i -v shop_data:/v alpine:3.21 tar -C /v -xf -
rsync -aH old:/etc/letsencrypt/ /etc/letsencrypt/
cd /opt/shop && docker compose up -d --no-build
# ٣) من جهازك: جرّب الجديد قبل ما تلمس الـ DNS
curl -sk --resolve shop.example:443:203.0.113.20 -o /dev/null -w "%{http_code} ip=%{remote_ip}\n" https://shop.example/`,
        lines: [
          R`[[docker ps --format]] بيطبع سطر لكل container شغال بالحقول اللي انت عايزها بس: الاسم، والـ image (عشان تعرف هتنقل أنهي صور)، والحالة، والبورتات (عشان تربطها بـ nginx).`,
          R`[[docker ps -q]] بيطبع IDs بس، و [[$(...)]] بيحطهم مكانه، فـ [[docker inspect]] بيشتغل على كل الـ containers مرة واحدة. و [[{{range .Mounts}}]] بيلف على كل حاجة متركّبة جوه الـ container: [[bind]] (فولدر من السيرفر، اسمه فاضي ومصدره مسار) ولا [[volume]] (اسمه مكتوب). دي الداتا الحقيقية اللي لازم تتنقل.`,
          R`[[grep -hvE "^\s*#"]] بيشيل سطور التعليقات من كل المواقع المفعّلة ([[-h]] من غير اسم الملف)، وبعدين [[grep -E]] بيسيب الدومين ([[server_name]]) والبورت اللي بيروح له ([[proxy_pass]]) والبورتات اللي nginx سامع عليها. كده عندك خريطة: دومين ← بورت ← container.`,
          R`[[rsync]] بيسحب [[/opt/shop/]] من القديم: [[-a]] بيحافظ على الصلاحيات والمالك والوقت والـ symlinks، و [[-H]] بيحافظ على الـ hard links (من غيره الملف المربوط بيتنسخ كذا مرة)، و [[-z]] بيضغط في الطريق، و [[--info=stats1]] بيطبع ملخص في الآخر، و [[--exclude]] بيسيب اللي بيتعمل تاني. والـ [[/]] في آخر المصدر معناها «اللي جوه الفولدر» مش الفولدر نفسه.`,
          R`[[docker save]] على القديم بيطلّع الصورتين بكل طبقاتهم كـ tar على الـ stdout، والـ pipe بيوصّله لـ [[docker load]] على الجديد. النتيجة نفس الـ image ID بالظبط، من غير build ولا تحميل من الإنترنت.`,
          R`الـ compose بتاعنا معرّف [[shop_data]] كـ [[external: true]]، يعني compose مش هيعمله لوحده، فبنعمله بإيدنا.`,
          R`على القديم: container مؤقت ([[--rm]]) راكب عليه الـ volume للقراية بس ([[:ro]]) وبيعمل tar لمحتواه على الـ stdout. وعلى الجديد: container تاني بياخد الـ tar من الـ stdin ([[-i]]) ويفكّه جوه الـ volume الجديد. [[-C /v]] معناها «اشتغل جوه /v».`,
          R`الشهادات: [[/etc/letsencrypt/live]] فيه symlinks بتشاور على [[archive]]، فلازم تنسخ الفولدر كله بـ [[rsync -a]] اللي بيحافظ على الـ links، مش [[live]] بس.`,
          R`[[--no-build]] معناها «شغّل بالصور اللي عندك وماتبنيش»: إحنا لسه جايبينها من القديم ومش عايزين نسخة مختلفة.`,
          R`من جهازك: [[--resolve shop.example:443:203.0.113.20]] بيقول لـ curl «الدومين ده على البورت ده روح بيه للـ IP ده» من غير ما تسأل الـ DNS، و [[-k]] عشان شهادة المعمل self-signed، و [[-w]] بيطبع الكود والـ IP اللي اتكلم معاه فعلًا.`,
        ],
        try: R`ابني المعمل اللي في الشرح، وانقل [[shop.example]] من [[old-vps]] لـ [[new-vps]]. قبل ما تبدأ اكتب الخريطة (دومين ← بورت ← container ← داتا) من الجرد بس. وبعد النقل اثبت بأرقام إن الجديد زي القديم: عدد ملفات الـ uploads وبصمتهم، ومحتوى الـ volume، و [[curl --resolve]] بـ 200.`,
        teach: R`## الحالة

عندك [[old-vps]] (في المعمل [[203.0.113.10]]) عليه [[shop.example]]: nginx على السيرفر نفسه، وقدامه containerين بـ compose: [[shop-web]] (الواجهة) و [[shop-api]]. والمطلوب تنقل كل ده لـ [[new-vps]] ([[203.0.113.20]]) أرخص وأحدث، والزوار ميحسّوش.

أغلب النقلات اللي بتبوظ بتبوظ في واحدة من دول: حاجة اتنسيت (volume، أو cron، أو شهادة)، أو الجديد اشتغل بالداتا قبل ما القديم يقف فبقى فيه نسختين بتكتب، أو الـ DNS اتغيّر قبل ما حد يجرّب الجديد. الترتيب تحت معمول عشان يمنع التلاتة.

---

## المعمل: سيرفرين وجهاز في Docker

اتجرّب على Docker Desktop (Docker 29) من Git Bash. السيرفرين [[ubuntu:24.04]] عليهم Docker و ssh و rsync و nginx و ufw، والـ «لابتوب» تالت، والتلاتة على شبكة واحدة بـ IPs توثيقية:

~~~bash
mkdir -p ~/lab/vpscases/server && cd ~/lab/vpscases/server
cat > Dockerfile <<'EOF'
FROM ubuntu:24.04
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    docker.io docker-compose-v2 openssh-server openssh-client rsync ufw curl iproute2 iptables nginx openssl ca-certificates procps \
    && rm -rf /var/lib/apt/lists/* && mkdir -p /run/sshd
CMD ["/bin/bash","-c","/usr/sbin/sshd; (dockerd >/var/log/dockerd.log 2>&1 &); sleep infinity"]
EOF
docker build -q -t vpscase-server .
docker network create --subnet 203.0.113.0/24 vpscase-net
for n in old:10 new:20; do h=$__{n%%:*}; ip=$__{n##*:}
  docker volume create vpscase-$h-docker
  docker run -d --name vpscase-$h --hostname $h-vps --privileged --network vpscase-net --ip 203.0.113.$ip -v vpscase-$h-docker:/var/lib/docker vpscase-server
done
docker run -d --name vpscase-laptop --hostname laptop --network vpscase-net --ip 203.0.113.50 vpscase-server sleep infinity
~~~

- [[--privileged]] عشان Docker و ufw جوه الـ container يقدروا يكتبوا قواعد iptables. ده للمعمل بس.
- [[-v vpscase-old-docker:/var/lib/docker]]: Docker اللي جوه محتاج فولدر حقيقي يخزّن فيه الصور، مش طبقة overlay فوق overlay.
- [[$__{n%%:*}]] بيقص من أول [[:]] للآخر فيفضل [[old]]، و [[$__{n##*:}]] بيقص لحد آخر [[:]] فيفضل [[10]].

وبعدين مفاتيح ssh من غير باسورد بين التلاتة (لكل جهاز مفتاح، وكل المفاتيح العامة في [[authorized_keys]] على السيرفرين)، و [[~/.ssh/config]] فيه [[Host old]] على [[203.0.113.10]] و [[Host new]] على [[203.0.113.20]]. ودرس «نقل مفتاح SSH» فيه التفاصيل. وعلى [[old-vps]] بنينا الـ stack: Dockerfile صغير لكل service ([[alpine:3.21]] وفيه [[busybox httpd]])، و [[compose.yml]] فيه بورتات [[8080:80]] و [[5000:5000]] على كل العناوين، و volume اسمه [[shop_data]] معرّف [[external: true]]، و [[.env]] فيه أسرار مخترعة، و ٤٠ صورة في [[uploads/]]، ونسختين باك أب للصور معمولين بـ [[cp -al]] (hard links)، و nginx بشهادة self-signed في [[/etc/letsencrypt]].

---

## ١. الجرد: قراية بس

أول قاعدة: الجرد مبيغيّرش حاجة. ومن جهازك بـ [[ssh old '...']] أو وانت جوه:

~~~text docker ps --format "{{.Names}}: {{.Image}} {{.Status}} {{.Ports}}"
shop-web-1: shop-web:latest Up About a minute 0.0.0.0:8080->80/tcp, [::]:8080->80/tcp
shop-api-1: shop-api:latest Up About a minute 0.0.0.0:5000->5000/tcp, [::]:5000->5000/tcp
~~~

~~~text docker compose ls
NAME                STATUS              CONFIG FILES
shop                running(2)          /opt/shop/compose.yml
~~~

[[docker compose ls]] بيقولك كل مشروع compose شغال وملفه فين. ولو عايز تعرف كل container جاي منين: [[docker inspect <c> --format '{{index .Config.Labels "com.docker.compose.project.working_dir"}}']] بيطبع [[/opt/shop]].

### فين الداتا؟

~~~text docker inspect $(docker ps -q) --format "{{.Name}}: {{range .Mounts}}[...] {{end}}"
/shop-web-1: [bind /opt/shop/uploads -> /www/uploads]
/shop-api-1: [volume shop_data/var/lib/docker/volumes/shop_data/_data -> /data]
~~~

ده أهم سطر في النقل كله. الـ [[bind]] فولدر عادي على السيرفر (هيتنقل مع [[rsync]] للـ [[/opt/shop]])، لكن الـ [[volume]] عايش جوه [[/var/lib/docker]] ومحدش هيفتكره لو مشافهوش هنا. و [[docker system df -v]] بيوريك حجم كل volume.

### أنهي دومين رايح فين؟ وفخ [[sites-available]]

أول محاولة كانت [[grep -hE "server_name|proxy_pass|listen" /etc/nginx/sites-available/*]]، وطلع فيها ده:

~~~text الناتج (أوله)
	listen 80 default_server;
	listen [::]:80 default_server;
	# listen 443 ssl default_server;
	server_name _;
#	listen 80;
	server_name example.com;
    listen 80;
    listen 443 ssl;
    server_name shop.example;
~~~

نص السطور دي من ملف [[default]] اللي جاي مع nginx ومش مفعّل أصلًا، ونصها تعليقات. فالأصح [[sites-enabled]] (اللي شغال فعلًا) ومن غير التعليقات:

~~~text grep -hvE "^\s*#" /etc/nginx/sites-enabled/* | grep -E "server_name|proxy_pass|listen"
    listen 80;
    listen 443 ssl;
    server_name shop.example;
    location /api/ { proxy_pass http://127.0.0.1:5000/; }
    location / { proxy_pass http://127.0.0.1:8080; }
~~~

[[-v]] عكس الـ grep (السطور اللي **مفيهاش**)، و [[^\s*#]] سطر أوله مسافات (أو لأ) وبعدين [[#]]. ودلوقتي الخريطة واضحة: [[shop.example]] ← [[/api/]] على 5000 ([[shop-api-1]]) والباقي على 8080 ([[shop-web-1]]).

### والباقي

~~~bash
ls /etc/letsencrypt/live      # الشهادات
crontab -l                    # المهام المجدولة
du -sh /opt/*                 # حجم كل حاجة هتتنقل
~~~

~~~text الناتج
shop.example
15 3 * * * /opt/shop/backup.sh >> /var/log/shop-backup.log 2>&1
12K	/opt/containerd
7.8M	/opt/shop
~~~

الـ cron ده لو نسيته، الباك أب هيقف على الجديد من غير ما حد ياخد باله. واكتب لستة «مش هيتنقل» (أرشيفات قديمة، وكاش build) واسأل صاحب السيرفر قبل ما تقرر.

---

## ٢. جهّز الجديد بالإضافة بس

على [[new-vps]]: سطّب اللي ناقص ([[apt-get install -y nginx rsync ufw]]) واقفل الفايروول **بالترتيب ده**:

~~~bash
ufw allow 22/tcp
ufw allow 80,443/tcp
ufw --force enable
~~~

ليه الترتيب؟ جرّبنا [[ufw --force enable]] على [[old-vps]] من غير [[allow 22]]، والاتصال اللي كان مفتوح فضل شغال (ufw بيسيب الاتصالات القايمة)، لكن أول ssh جديد:

~~~text ssh -o ConnectTimeout=5 old hostname
ssh: connect to host 203.0.113.10 port 22: Connection timed out
~~~

على VPS حقيقي ده معناه إنك محتاج كونسول شركة الاستضافة عشان ترجع.

---

## ٣. انسخ الملفات: [[rsync -aH]]

~~~bash
rsync -aHz --info=stats1 --exclude node_modules --exclude .git old:/opt/shop/ /opt/shop/
~~~

### ليه [[-H]] مهمة هنا؟

فولدر [[backups/]] فيه نسختين من الصور معمولين بـ [[cp -al]]: نفس الملف على الديسك بـ ٣ أسامي (hard links). قارنّا:

~~~text الناتج
rsync -az  (من غير -H)  ->  du -sh = 24M
rsync -aHz              ->  du -sh = 7.8M ,  stat -c %h p1.jpg = 3
~~~

ومن [[--stats]] على أول نسخة:

~~~text الناتج
Number of files: 134 (reg: 124, dir: 10)
Number of regular files transferred: 44
Total file size: 24,000,877 bytes
Total transferred file size: 8,000,877 bytes
~~~

١٢٤ ملف بس ٤٤ اللي اتبعتوا فعلًا، والباقي links. من غير [[-H]] السيرفر الجديد كان هياخد ٣ أضعاف المساحة. وتشغيل نفس الأمر تاني بيبعت الفرق بس ([[sent 29 bytes  received 2,649 bytes]])، فتقدر تعيده كذا مرة قبل التحويل.

### الشرطة المايلة في الآخر

~~~text الناتج
rsync -a old:/opt/shop  /tmp/t1/   ->  ls /tmp/t1 = shop
rsync -a old:/opt/shop/ /tmp/t2/   ->  ls /tmp/t2 = api backups compose.yml ...
~~~

من غير [[/]] الفولدر نفسه بيتحط جوه الهدف، وبيها محتواه بس. والـ [[.env]] بيتنسخ معاه (بالصلاحيات). وده خطر لو شغّلت الجديد بيه قبل وقته (درس «نسخة تجربة جنب الإنتاج»).

---

## ٤. انقل الصور مش الكود: [[docker save | docker load]]

~~~text ssh old "docker save shop-web:latest shop-api:latest" | docker load
Loaded image: shop-web:latest
Loaded image: shop-api:latest
~~~

وقارن الـ IDs على الاتنين: [[shop-web:latest c3a1164034bd]] هنا وهناك. ليه مش [[git clone]] و build؟ لأن الـ build على الجديد بيجيب نسخ تانية من المكتبات والـ base image، فاللي هيشتغل مش هو اللي كان شغال. ولأن الكود الحقيقي ساعات بيبقى على السيرفر بس.

و [[gzip]] في النص؟ قسنا: [[3725824]] bytes من غير ضغط و [[3696389]] بيه، يعني ١٪. Docker 29 بيخزّن الطبقات مضغوطة أصلًا، فالـ gzip مش فارق هنا.

---

## ٥. الـ volume: أول تشغيل هيفشل، وده كويس

~~~text cd /opt/shop && docker compose up -d --no-build
 Network shop_default  Created
external volume "shop_data" not found
~~~

compose رفض يعمل volume معرّف [[external: true]]، ودي حماية: لو كان عمله فاضي، الـ API كانت هتقوم من غير الطلبات القديمة ومحدش هيلاحظ. ننقله بـ [[tar]]:

~~~bash
docker volume create shop_data
ssh old "docker run --rm -v shop_data:/v:ro alpine:3.21 tar -C /v -cf - ." | docker run --rm -i -v shop_data:/v alpine:3.21 tar -C /v -xf -
docker run --rm -v shop_data:/v alpine:3.21 ls /v
~~~

~~~text الناتج
order-1.json
order-2.json
order-3.json
~~~

ده للملفات العادية. **الداتابيز متتنقلش كده** وهي شغالة (الملفات بتتكتب وانت بتنسخ). ليها درس لوحدها: «dump و restore بين سيرفرين».

---

## ٦. الشهادات و nginx

~~~bash
rsync -aH old:/etc/letsencrypt/ /etc/letsencrypt/
rsync -a old:/etc/nginx/sites-available/shop.example /etc/nginx/sites-available/
ln -sf /etc/nginx/sites-available/shop.example /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
~~~

الفخ: [[live/shop.example/fullchain.pem]] مش ملف، ده symlink لـ [[../../archive/shop.example/fullchain1.pem]]. جرّبنا [[scp -r]] لفولدر [[live]] بس:

~~~text ls -l بعد scp -r
-rw-r--r-- 1 root root 1155 Nov  3 08:29 fullchain.pem
-rw------- 1 root root 1700 Nov  3 08:29 privkey.pem
~~~

بقوا ملفات عادية. الموقع هيشتغل النهارده، لكن certbot بيتوقع symlinks وبيرفض يجدد (ده من وثائق certbot، التجديد محتاج دومين حقيقي فمتجرّبش). بـ [[rsync -aH]] للفولدر كله الـ links فضلت links.

---

## ٧. جرّب الجديد قبل الـ DNS: [[curl --resolve]]

من اللابتوب، والـ DNS (في المعمل [[/etc/hosts]]) لسه بيقول القديم:

~~~text الناتج
curl -sk https://shop.example/                                        ->  200 ip=203.0.113.10
curl -sk --resolve shop.example:443:203.0.113.20 https://shop.example/ ->  200 ip=203.0.113.20
curl -s  --resolve shop.example:443:203.0.113.20 https://shop.example/ ->  000 verify=18 (exit 60)
~~~

- [[--resolve host:port:ip]] بيتخطى الـ DNS للطلب ده بس، وبيبعت اسم الدومين الحقيقي في TLS (الـ SNI) وفي [[Host]]، فـ nginx بيختار الموقع والشهادة الصح.
- [[%{remote_ip}]] بيأكّد إنك كلمت الجديد فعلًا.
- من غير [[-k]]: [[000]] و exit 60 و [[ssl_verify_result=18]] (شهادة self-signed). على السيرفر الحقيقي الشهادة صح فمش محتاج [[-k]].
- [[curl https://203.0.113.20/ -H "Host: shop.example"]] مش بديل: الـ SNI بيروح IP، فلو السيرفر عليه أكتر من دومين ممكن ياخد شهادة غلط.

على ويندوز في PowerShell اكتب [[curl.exe]]: في 5.1 [[curl]] اسم تاني لـ [[Invoke-WebRequest]]، وجرّبناها:

~~~text powershell -NoProfile -Command "curl --resolve shop.example:443:203.0.113.20 https://shop.example/"
Invoke-WebRequest : A positional parameter cannot be found that accepts argument 'shop.example:443:203.0.113.20'.
~~~

---

## ٨. التحويل (cutover)

1. **أوقف الـ backends على القديم** بـ [[docker compose stop]] (مش [[down]] ولا [[rm]]: الرجوع = [[start]]). كده مفيش نسختين بيكتبوا في نفس الوقت.
2. **مزامنة أخيرة** لكل حاجة اتكتبت بعد أول نسخة:

~~~text rsync -aH --delete --itemize-changes old:/opt/shop/uploads/ /opt/shop/uploads/
.d..t...... products/
>f+++++++++ products/p41.jpg
~~~

[[>f+++++++++]] ملف جديد اتبعت، و [[--delete]] بيمسح من الجديد اللي اتمسح من القديم. وبعدها الـ volume تاني (بعد ما الـ API وقفت، فالنسخة متسقة)، و dump نهائي للداتابيز.

3. **قارن بأرقام** على الاتنين:

~~~text cd /opt/shop/uploads && find . -type f | wc -l; find . -type f -exec sha256sum {} + | sort -k2 | sha256sum
old: 41 24111cf575bbbb78
new: 41 24111cf575bbbb78
~~~

بصمة واحدة لكل الملفات: [[sha256sum]] لكل ملف، و [[sort -k2]] بالاسم عشان الترتيب يبقى ثابت، و [[sha256sum]] تاني على الناتج كله.

4. **الزوار اللي لسه على الـ DNS القديم**: بعد ما وقفنا الـ backends، القديم بيرجّع [[502]] لأي حد لسه بيوصله. الحل اللي جرّبناه: nginx القديم يحوّل للجديد لحد ما الـ DNS ينتشر:

~~~text location / في nginx القديم
proxy_pass https://203.0.113.20;
proxy_set_header Host $host;
proxy_ssl_server_name on;
proxy_ssl_name $host;
~~~

وفي لوج الجديد هتشوف الطلبات دي جاية من IP القديم:

~~~text tail -n 2 /var/log/nginx/access.log على new-vps
203.0.113.50 - - [03/Nov/2026:08:30:44 +0000] "GET / HTTP/1.1" 200 25 "-" "curl/8.5.0"
203.0.113.10 - - [03/Nov/2026:08:30:44 +0000] "GET /api/health HTTP/1.0" 200 27 "-" "curl/8.5.0"
~~~

لما السطور اللي من [[203.0.113.10]] تقف ([[awk '$1=="203.0.113.10"' access.log | wc -l]] مبيزيدش)، الانتشار خلص.

5. **غيّر الـ DNS** (ده اتعمل من وثائق لوحات الـ DNS، مش في المعمل): نزّل الـ TTL لـ 300 قبلها بيوم، وغيّر [[A @]] للـ IP الجديد، و [[CNAME www]] سيبه، وسجلات الإيميل (MX و TXT و DKIM) متلمسهاش، وأي [[AAAA]] قديم امسحه أو غيّره (وإلا زوار IPv6 يفضلوا رايحين للقديم). وتابع بـ [[nslookup -type=A shop.example 1.1.1.1]] و [[8.8.8.8]] لحد ما يثبتوا.

---

## ٩. الرجوع جاهز

جرّبناه فعلًا: على الجديد [[docker compose stop]]، وعلى القديم رجّعنا ملف nginx الأصلي ([[cp /root/shop.example.before-cutover ...]] و [[nginx -t]] و reload) و [[docker compose start]]، والـ API رجعت [[{"ok":true,"server":"api"}]]. **الترتيب مهم:** الجديد يقف الأول، وإلا يبقى فيه نسختين بيكتبوا. وأي داتا اتكتبت على الجديد لازم تترجع (نفس الأوامر بالعكس).

القديم يفضل شغال أسبوع. وبعدها، قبل ما تسلّمه: امسح [[.env]] والمفاتيح والـ dumps منه.

---

## الطرق اللي اترفضت، وليه

| الطريقة | المشكلة |
|---|---|
| [[git clone]] و build على الجديد | الكود اللي شغال ممكن ميكونش في git، والـ build بيجيب نسخ مكتبات تانية |
| [[scp -r]] بدل [[rsync -aH]] | بيكسر الـ symlinks والـ hard links، ومبيكمّلش لو الاتصال قطع، وبيعيد كل حاجة كل مرة |
| تشغيل الجديد بالـ [[.env]] الأصلي قبل التحويل | الاتنين يبعتوا إيميلات ويشغّلوا cron، والجديد يكتب في الداتا قبل الـ dump النهائي |
| تغيير الـ DNS الأول وبعدين تجرّب | الزوار هم اللي هيكتشفوا المشاكل |
| [[docker compose down]] على القديم | بيمسح الـ containers، فالرجوع أبطأ ومحتاج الملفات كلها سليمة |

---

## الخلاصة

| الخطوة | الأمر | ليه |
|---|---|---|
| جرد | [[docker inspect ... .Mounts]] و [[sites-enabled]] | تعرف فين الداتا وأنهي دومين رايح فين |
| ملفات | [[rsync -aHz]] | links سليمة، وبيتعاد بالفرق بس |
| صور | [[docker save]] مع [[docker load]] | نفس الـ image ID بالظبط |
| volumes | [[tar]] جوه container مؤقت | الـ volume مش فولدر في [[/opt]] |
| اختبار | [[curl --resolve]] | الجديد قبل الـ DNS |
| تحويل | stop ومزامنة أخيرة و DNS | نسخة واحدة بتكتب |
| رجوع | stop للجديد و start للقديم | جاهز أسبوع |`,
        deep: {
          why: R`السيرفر الشغال فيه حاجات محدش كاتبها: volume اتعمل بإيد من سنة، و cron للباك أب، وشهادة بتتجدد لوحدها. النقل من غير جرد بيكتشفهم بعد ما يقعوا. والترتيب (اختبار قبل DNS، و stop قبل المزامنة الأخيرة) هو اللي بيخلّي الموقع شغال طول الوقت وفيه نسخة واحدة بس بتكتب.`,
          how: R`[[rsync]] بيقارن حجم ووقت كل ملف ويبعت الفرق بس، و [[-H]] بيخلّيه يعرف الملفات اللي ليها نفس الـ inode ويعيد ربطها بدل ما ينسخها. [[docker save]] بيطلّع tar فيه الـ manifest وكل طبقة، و [[docker load]] بيحطهم في الـ image store بنفس الـ IDs لأن الـ ID هو بصمة المحتوى. والـ named volume مجرد فولدر تحت [[/var/lib/docker/volumes]]، بس الوصول له من container مؤقت أضمن من المسار. و [[curl --resolve]] بيحط سطر في الـ DNS cache بتاع curl للطلب ده بس، فالـ SNI والـ Host header بيفضلوا اسم الدومين. وأثناء انتشار الـ DNS، كل resolver عنده نسخة لحد ما الـ TTL يخلص، فبعض الزوار بيوصلوا للقديم ساعات، وعشان كده nginx القديم بيحوّل للجديد بدل ما يرجّع 502.`,
          when: R`نقل لسيرفر أرخص أو أقوى، أو من نسخة أوبونتو قديمة، أو لما شركة الاستضافة تقفل الداتا سنتر. ونفس الخطوات (من غير التحويل) لعمل نسخة staging من الإنتاج، أو لاختبار الباك أب بإنك ترجّعه فعلًا على سيرفر تاني.`,
          mistakes: R`تجرد [[sites-available]] وتفتكر المواقع المقفولة شغالة. تنسى الـ volumes لأنها مش في [[/opt]]. [[rsync]] من غير [[-H]] فالمساحة تتضاعف. تنسخ [[live/]] بس من letsencrypt. تفتح ufw قبل [[allow 22]]. تشغّل الجديد بالـ [[.env]] الأصلي وتبعت إيميلات مكررة. تغيّر الـ DNS قبل [[curl --resolve]]. [[docker compose down]] على القديم بدل [[stop]]. وتنسى [[AAAA]] في الـ DNS. وتمسح القديم في نفس اليوم.`,
        },
        sol: R`الخريطة من الجرد: [[shop.example]] ← [[/api/]] على [[127.0.0.1:5000]] ([[shop-api-1]]، وعليه volume [[shop_data]]) والباقي على [[127.0.0.1:8080]] ([[shop-web-1]]، وعليه bind [[/opt/shop/uploads]]).

بعد النقل: [[du -sh /opt/shop]] على الجديد [[7.8M]] زي القديم (مش 24M)، و [[find ... | sha256sum]] نفس البصمة والعدد ([[41]] بعد المزامنة الأخيرة)، و [[docker run --rm -v shop_data:/v alpine:3.21 ls /v]] فيه [[order-1.json]] لحد [[order-4.json]]، و [[curl -sk --resolve shop.example:443:203.0.113.20 ... ]] بيطبع [[200 ip=203.0.113.20]].`,
        practice: [
          { lvl: 'سريع', t: R`من غير ما تشغّل: إيه الفرق بين [[rsync -a old:/opt/shop /srv/]] و [[rsync -a old:/opt/shop/ /srv/]]؟ وفين هيبقى [[compose.yml]] في كل واحدة؟ وبعدين جرّب في المعمل.`, done: R`كتبت إن الأولى بتعمل [[/srv/shop/compose.yml]] والتانية [[/srv/compose.yml]]، و [[ls]] بعد التجربة طابق كلامك.` },
          { lvl: 'تطبيق', t: R`قس أثر [[-H]] بنفسك: في فولدر جديد اعمل ملف ١٠ ميجا وانسخه بـ [[cp -al]] مرتين، وانسخ الفولدر بـ [[rsync -a]] مرة و [[rsync -aH]] مرة لفولدرين تانيين، وقارن [[du -sh]] و [[stat -c %h]].`, done: R`عندك ٣ أرقام: الأصل حوالي 10M، ومن غير [[-H]] حوالي 30M، وبـ [[-H]] حوالي 10M و [[stat -c %h]] بيطبع [[3]].` },
          { lvl: 'تطبيق', t: R`اقرا وتوقّع: لو شغّلت [[docker compose up -d]] على الجديد **قبل** [[docker volume create shop_data]]، هيحصل إيه بالظبط؟ ولو الـ volume مش [[external]]؟ جرّب الاتنين.`, done: R`الأولى طبعت [[external volume "shop_data" not found]] ومقامتش، والتانية قامت بـ volume فاضي اسمه [[shop_shop_data]] و [[ls /data]] جواه فاضي، وتقدر تشرح ليه التانية أخطر.` },
          { lvl: 'تطبيق', t: R`صلّح خطة النقل دي (فيها ٤ غلطات): «(١) [[ufw --force enable]] وبعدين [[ufw allow 22]]. (٢) [[scp -r old:/etc/letsencrypt/live /etc/letsencrypt/]]. (٣) [[docker compose up -d]] على الجديد بالـ [[.env]] الأصلي وبعدين dump. (٤) غيّر الـ DNS وبعدين جرّب بـ [[curl]]».`, done: R`كتبت الخطة الصح بالترتيب (allow 22 قبل enable، و [[rsync -aH]] لـ [[/etc/letsencrypt/]] كله، وstop على القديم قبل الـ dump النهائي، و [[curl --resolve]] قبل الـ DNS) ولكل غلطة سطر بيقول هتبوّظ إيه.` },
          { lvl: 'تحدي', t: R`ابني [[compare-servers.sh old new /opt/shop/uploads]]: بيطبع لكل سيرفر عدد الملفات والحجم وبصمة واحدة لكل المحتوى، وفي الآخر [[SAME]] أو [[DIFF]]، ولو [[DIFF]] يطبع أسامي الملفات المختلفة بس (من غير ما ينقل الملفات نفسها).`, done: R`على المعمل بيطبع [[SAME]]، ولو عدّلت byte في ملف واحد على الجديد بيطبع [[DIFF]] واسم الملف ده بس.` },
          { lvl: 'تحدي', t: R`اشرحها لزميل في ٥ سطور: ليه وقت التحويل بنخلّي nginx القديم يحوّل للجديد بدل ما نسيبه يرجّع 502، وإزاي تعرف من لوج الجديد إن الانتشار خلص؟`, done: R`الشرح فيه: الـ resolvers شايلين الـ IP القديم لحد ما الـ TTL يخلص، فالزوار دول بيوصلوا للقديم، والـ proxy بيوصّلهم للنسخة الوحيدة اللي بتكتب، وفي لوج الجديد طلباتهم جاية من IP القديم، ولما العدد ده يقف الانتشار خلص.` },
        ],
        ci: [
          { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`cat > ps.txt <<'EOF'
shop-web-1: shop-web:latest Up 2 hours 0.0.0.0:8080->80/tcp, [::]:8080->80/tcp
shop-api-1: shop-api:latest Up 2 hours 0.0.0.0:5000->5000/tcp, [::]:5000->5000/tcp
EOF
cat > site.conf <<'EOF'
server {
    # listen 8443 ssl;
    listen 443 ssl;
    server_name shop.example;
    location /api/ { proxy_pass http://127.0.0.1:5000/; }
    location / { proxy_pass http://127.0.0.1:8080; }
    location /old/ { proxy_pass http://127.0.0.1:7000; }
}
EOF
grep -hvE "^ *#" site.conf | grep -E "server_name|proxy_pass|listen" > routes.txt
echo "commented lines kept: $(grep -c 8443 routes.txt)"
for port in $(grep -oE '127\.0\.0\.1:[0-9]+' routes.txt | cut -d: -f2); do
  c=$(grep -E "0\.0\.0\.0:$port->" ps.txt | cut -d: -f1)
  echo "shop.example -> :$port -> $__{c:-MISSING}"
done`, expect: [R`commented lines kept: 0`, R`shop.example -> :5000 -> shop-api-1`, R`shop.example -> :8080 -> shop-web-1`, R`shop.example -> :7000 -> MISSING`] },
          { os: [R`ubuntu`], sh: R`bash`, run: R`mkdir -p src/uploads
head -c 1000000 /dev/urandom > src/uploads/a.jpg
cp -al src/uploads src/backup1 && cp -al src/uploads src/backup2
rsync -a src/ noH/ && rsync -aH src/ withH/
echo "noH=$(du -sk noH | cut -f1)K withH=$(du -sk withH | cut -f1)K links=$(stat -c %h withH/uploads/a.jpg)"
rsync -a src/uploads dest1/ && rsync -a src/uploads/ dest2/
ls dest1 dest2`, expect: [R`links=3`, R`dest1:
uploads`, R`dest2:
a.jpg`] },
        ],
      },
      {
        cmd: "dump و restore بين سيرفرين",
        title: "انقل Postgres و Mongo اللي جوه containers من سيرفر لسيرفر، واعرف إنها وصلت كاملة",
        learn: R`تعمل dump من container على سيرفر و restore في container على سيرفر تاني، وتعدّ قبل وبعد، وتعدّي الفخاخ (الصلاحيات، وقاعدة admin، والاقتباسات).`,
        out: R`نفس عدد الجداول والصفوف (أو الـ collections والـ documents والـ indexes) على الاتنين، ومفيش [[errors ignored]] ولا [[Failed]] في اللوج.`,
        desc: R`الداتابيز متتنقلش بـ [[rsync]] وهي شغالة: الملفات بتتكتب وانت بتنسخ. الصح إنك تطلب منها نسخة متسقة: [[pg_dump]] لـ Postgres و [[mongodump]] لـ Mongo، **جوه الـ container** بـ [[docker exec]]، والناتج يعدّي في ssh لملف على جهازك، وبعدين [[pg_restore]] أو [[mongorestore]] على الجديد.

وأهم حاجة في الدرس: **«الأمر خلص» مش معناها «الداتا وصلت»**. هنشوف [[pg_restore]] بيخرج بـ 1 والداتا موجودة، و [[mongorestore]] بيقول [[180 document(s) restored successfully]] وفي نفس الوقت مسح يوزر من الجديد ووقف قبل الـ indexes. فبنعدّ على الاتنين ونقارن.`,
        example: R`# Postgres: الأدوار الأول، وبعدين الداتا
ssh old "docker exec db pg_dump -U shop -d shop -Fc" > shop.pgdump
ssh old "docker exec db pg_dumpall -U shop --roles-only" > roles.sql
ssh new "docker exec -i db psql -U shop -d postgres -q" < roles.sql
ssh new "docker exec -i db pg_restore -U shop -d shop --clean --if-exists --exit-on-error" < shop.pgdump
# Mongo: السكربت بيتنفّذ على السيرفر، والباسورد بيتقري جوه الـ container
ssh old "bash -s" < dump-mongo.sh > shop-mongo.archive.gz
scp shop-mongo.archive.gz restore-mongo.sh new:/root/
ssh new "bash /root/restore-mongo.sh /root/shop-mongo.archive.gz"
# اعدّ على الاتنين وقارن
ssh old "bash -s mongo" < count-mongo.sh
ssh new "bash -s mongo" < count-mongo.sh`,
        lines: [
          R`[[pg_dump]] بيشتغل جوه container الداتابيز (فنسخته هي نسخة السيرفر بالظبط)، و [[-Fc]] الـ custom format: مضغوط، وبيسمح لـ [[pg_restore]] يختار ويرتّب. الناتج بيطلع على الـ stdout، بيعدّي في ssh، و [[>]] بيكتبه في ملف على جهازك.`,
          R`[[pg_dumpall --roles-only]] بيطلّع الأدوار (users و roles) بس كـ SQL. [[pg_dump]] مبيطلّعهمش لأنهم على مستوى السيرفر مش الداتابيز، والجداول بتاعتنا مملوكة لدور اسمه [[shop_owner]].`,
          R`بنشغّل الـ SQL ده على الجديد. [[-i]] في [[docker exec]] بتوصّل الـ stdin (الملف) لـ [[psql]] جوه الـ container، و [[-d postgres]] لأن الأدوار مش تبع داتابيز معينة، و [[-q]] من غير رسايل [[CREATE ROLE]] لكل سطر.`,
          R`[[pg_restore]] بياخد الملف من الـ stdin (عشان كده [[-i]] تاني)، و [[--clean --if-exists]] بيمسح الجداول الموجودة الأول من غير خطأ لو مش موجودة (فتقدر تعيده)، و [[--exit-on-error]] بيقف عند أول خطأ بدل ما يكمّل ويقولك في الآخر.`,
          R`[[bash -s]] على السيرفر بيقرا السكربت من الـ stdin وينفّذه هناك، فمفيش اقتباسات متداخلة. والسكربت بيطبع الأرشيف على الـ stdout فبيرجع لجهازك في الملف.`,
          R`[[scp]] بينسخ الأرشيف وسكربت الـ restore للسيرفر الجديد. مقدرناش نستخدم [[bash -s]] هنا لأن الـ stdin هيبقى مشغول بالسكربت، والأرشيف محتاجه.`,
          R`السكربت بيعمل [[mongorestore]] جوه container الـ mongo، و [[--nsInclude="shop.*"]] بيرجّع داتابيز [[shop]] بس ويسيب [[admin]] (هنشوف ليه ده مش اختياري).`,
          R`[[bash -s mongo]]: الكلمة اللي بعد [[-s]] بتبقى [[$1]] جوه السكربت، فنفس السكربت بيعدّ في أي container. بيطبع عدد الـ collections والـ documents والـ indexes.`,
          R`نفس العدّ على الجديد. السطرين لازم يبقوا متطابقين حرف بحرف، وإلا فيه حاجة ناقصة.`,
        ],
        try: R`في المعمل اعمل الـ restore بتاع Postgres **من غير** [[roles.sql]] الأول، واقرا كل سطر خطأ، واعرف هل الداتا وصلت ولا لأ وإزاي عرفت. وبعدين اعمل restore لـ Mongo من غير [[--nsInclude]] بيوزر الـ root، وقارن يوزرز [[admin]] على الجديد قبل وبعد.`,
        teach: R`## الحالة

في نقل السيرفر (الدرس اللي فات) فاضل الداتابيز: Postgres فيه جداول الطلبات، و Mongo فيه المنتجات. الاتنين في containers، والباسوردات في متغيرات بيئة جوه الـ containers ([[POSTGRES_PASSWORD]] و [[MONGO_INITDB_ROOT_PASSWORD]]). والمطلوب: نسخة كاملة على الجديد، ودليل بالأرقام إنها كاملة.

---

## المعمل

السيرفرين هنا بيشاركوا Docker بتاع جهازك (عشان مننزّلش صور الداتابيز مرتين)، فالـ containers اسمها [[old-db]] و [[new-db]] و [[old-mongo]] و [[new-mongo]]، والـ hosts في ssh اسمهم [[dbold]] و [[dbnew]]. على سيرفر حقيقي الاسم واحد على الاتنين (غالبًا [[db]] و [[mongo]]) وده اللي في المثال. الصور [[postgres:16-alpine]] و [[mongo:7]]:

~~~bash
docker run -d --name old-db --network vpscase-net -e POSTGRES_USER=shop -e POSTGRES_PASSWORD=lab-pg-pass -e POSTGRES_DB=shop postgres:16-alpine
docker run -d --name new-db --network vpscase-net -e POSTGRES_USER=shop -e POSTGRES_PASSWORD=lab-pg-pass -e POSTGRES_DB=shop postgres:16-alpine
docker run -d --name old-mongo --network vpscase-net -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=lab-mongo-pass mongo:7
docker run -d --name new-mongo --network vpscase-net -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=lab-mongo-pass mongo:7
~~~

وعلى [[old-db]]: دورين [[shop_owner]] و [[reporting]]، و ٣ جداول ([[products]] ٥٠ صف، و [[orders]] ١٢٠، و [[users]] ١٠) مملوكة لـ [[shop_owner]]، و [[GRANT SELECT]] لـ [[reporting]]. وعلى [[old-mongo]]: داتابيز [[shop]] فيها نفس الأعداد، و index فريد على [[users.email]]، ويوزر للتطبيق [[shopapp]].

---

## Postgres

### ١. الـ dump

~~~bash
ssh old "docker exec db pg_dump -U shop -d shop -Fc" > shop.pgdump
ls -l shop.pgdump; head -c 5 shop.pgdump
~~~

~~~text الناتج
-rw-r--r-- 1 root root 8190 Nov  3 08:33 shop.pgdump
PGDMP
~~~

[[PGDMP]] أول ٥ bytes في أي ملف custom format، يعني الملف سليم ومش رسالة خطأ اتكتبت جواه. ومفيش باسورد: [[pg_dump]] جوه الـ container بيتكلم على الـ socket المحلي، والصورة الرسمية بتسمح بده.

### ٢. أول restore: نسينا [[-i]]

~~~text ssh new "docker exec db pg_restore -U shop -d shop" < shop.pgdump
pg_restore: error: input file is too short (read 0, expected 5)
~~~

من غير [[-i]]، [[docker exec]] مبيوصّلش الـ stdin للأمر، فـ [[pg_restore]] قرا صفر bytes. الرسالة بتقول كده بالظبط: كان مستني ٥ (الـ [[PGDMP]]).

### ٣. تاني restore: [[role "shop_owner" does not exist]]

~~~text ssh new "docker exec -i db pg_restore -U shop -d shop --clean --if-exists" < shop.pgdump
pg_restore: error: could not execute query: ERROR:  role "shop_owner" does not exist
Command was: ALTER TABLE public.orders OWNER TO shop_owner;
...
pg_restore: error: could not execute query: ERROR:  role "reporting" does not exist
Command was: GRANT SELECT ON TABLE public.products TO reporting;
pg_restore: warning: errors ignored on restore: 8
~~~

وخرج بـ [[exit=1]]. بس لما عدّينا:

~~~text الناتج
dbold: 3|50|120|10
dbnew: 3|50|120|10
~~~

الداتا كلها وصلت! اللي فشل هو الملكية والصلاحيات بس، فالجداول بقت مملوكة لـ [[shop]]. وده الخطير: لو سكربتك بيبص على الـ exit code بس هيفتكر النقل فشل كله، ولو بيتجاهله هيعدّي إن [[reporting]] مالوش صلاحيات. الاتنين غلط. **اقرا السطر الأخير:** [[errors ignored on restore: 8]].

الأرقام دي جت من استعلام واحد على الاتنين:

~~~bash
psql -U shop -d shop -Atc "select (select count(*) from information_schema.tables where table_schema='public'), (select count(*) from products), (select count(*) from orders), (select count(*) from users)"
~~~

[[-A]] من غير محاذاة، و [[-t]] من غير عناوين، فالناتج [[3|50|120|10]] يتقارن كنص.

### ٤. حلّين، واختار حسب الحالة

**(أ) الأدوار الأول:**

~~~bash
ssh old "docker exec db pg_dumpall -U shop --roles-only" > roles.sql
ssh new "docker exec -i db psql -U shop -d postgres -q" < roles.sql
ssh new "docker exec -i db pg_restore -U shop -d shop --clean --if-exists --exit-on-error" < shop.pgdump
~~~

~~~text الناتج
ERROR:  role "shop" already exists
exit=0
 public | orders   | table | shop_owner
~~~

[[role "shop" already exists]] متوقع (الـ container الجديد عمله من [[POSTGRES_USER]])، والملكية رجعت [[shop_owner]]. وخلي بالك: [[roles.sql]] فيه hash الباسوردات ([[PASSWORD 'SCRAM-SHA-256$...']]) فده ملف سري. ولو عايز تبص عليه: [[grep -E "^CREATE ROLE|^ALTER ROLE" roles.sql | sed -E "s/PASSWORD .*/PASSWORD ***;/"]].

**(ب) من غير ملكية:** [[pg_restore ... --no-owner --no-privileges]] (أو [[-O -x]]). كل حاجة بتبقى ملك اليوزر اللي بيعمل restore، ومفيش GRANTs. خرج بـ [[exit=0]]. ده المناسب لما الجديد تصميمه مختلف (يوزر واحد للتطبيق)، والأولاني لما عايز نسخة طبق الأصل.

> لو الـ dump من Postgres أحدث من اللي بتعمل له restore، [[pg_restore]] بيرفض الملف (من وثائق PostgreSQL: الـ dump بيتعمل بنسخة أدوات زي نسخة السيرفر الجديد أو أقدم). اتأكد بـ [[pg_dump --version]] على الاتنين ([[16.13]] في المعمل).

---

## Mongo

### ١. الـ dump، وفخ الاقتباسات

أول محاولة كانت سطر واحد من جهازك:

~~~text ssh old "docker exec mongo mongodump -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD ..." > m1.gz
error parsing command line options: expected argument for flag $__bt-u, --username', but got option $__bt-p'
~~~

علامات التنصيص المزدوجة خلّت **الـ shell على جهازك** يفك [[$MONGO_INITDB_ROOT_USERNAME]]، وعلى جهازك مفيش متغير بالاسم ده، فبقى فاضي، والأمر وصل [[-u -p ...]]. والأسوأ: [[ls -l m1.gz]] بيقول [[0]] bytes. الملف اتعمل فاضي، ولو مبصّتش عليه هتفتكر إن عندك باك أب.

التانية بعلامات مفردة:

~~~text ssh old 'docker exec mongo mongodump -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" ...'
Failed: can't create session: ... (AuthenticationFailed) Authentication failed.
~~~

دلوقتي المتغير اتفك على **السيرفر**، وبرضه مش موجود هناك. هو موجود جوه الـ container بس. فلازم الفك يحصل جوه: [[docker exec mongo sh -c '...']] بعلامات مفردة. ده تالت مستوى اقتباس جوه سطر ssh، فبدل ما نكتبه سطر، نكتبه في ملف:

~~~bash dump-mongo.sh
# runs on the server: the $VARS expand inside the container (single quotes)
docker exec mongo sh -c 'mongodump -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase admin --archive --gzip'
~~~

~~~text ssh old "bash -s" < dump-mongo.sh > shop-mongo.archive.gz 2> dump.err
done dumping $__bt admin.system.users' (2 documents)
done dumping $__bt admin.system.version' (2 documents)
done dumping $__bt shop.products' (50 documents)
done dumping $__bt shop.users' (10 documents)
done dumping $__bt shop.orders' (120 documents)
~~~

[[2> dump.err]] بيفصل رسايل [[mongodump]] (بتطلع على الـ stderr) عن الأرشيف (على الـ stdout)، وإلا الرسايل تدخل جوه الملف وتبوّظه. و [[--archive]] من غير اسم ملف = اطبع على الـ stdout، و [[--gzip]] اضغط. ولاحظ أول سطرين: **الأرشيف فيه [[admin]]** لأننا دخلنا بالـ root فاخد كل حاجة.

### ٢. أول restore بيوزر التطبيق

~~~text mongorestore -u shopapp ... --authenticationDatabase shop --archive --gzip --drop
Failed: error getting auth version of server: (Unauthorized) not authorized on admin to execute command { getParameter: 1, authSchemaVersion: 1, ... }
0 document(s) restored successfully. 0 document(s) failed to restore.
~~~

[[shopapp]] ليه صلاحية على [[shop]] بس، والأرشيف فيه [[admin]]، فوقف قبل ما يبدأ.

### ٣. بالـ root ومن غير [[--nsInclude]]: أخطر واحدة

عملنا يوزر على الجديد اسمه [[backupbot]] قبلها (زي يوزر باك أب حقيقي). وبعدين restore بالـ root:

~~~text الناتج (السطور المهمة)
finished restoring $__bt shop.orders' (120 documents, 0 failures)
restoring users from $__bt archive on stdin'
restoring indexes for collection $__bt shop.users' from metadata
Failed: shop.users: error creating indexes for shop.users: createIndexes requires authentication
180 document(s) restored successfully. 0 document(s) failed to restore.
~~~

~~~text يوزرز admin على الجديد: قبل، وبعد
admin.backupbot admin.root
admin.root
~~~

حصلت ٣ حاجات: (١) [[--drop]] مع يوزرز [[admin]] اللي في الأرشيف **استبدل يوزرز الجديد** بيوزرز القديم، فـ [[backupbot]] اتمسح. (٢) الـ root اتعمل من جديد في نص الشغل، فالجلسة اللي [[mongorestore]] فاتحها اتقفلت، فـ [[createIndexes requires authentication]]. (٣) الـ index الفريد على [[email]] متعملش. والسطر الأخير بيقول [[180 document(s) restored successfully]]. لو قريت ده بس هتفتكر كله تمام.

### ٤. الحل: [[--nsInclude]]

~~~bash restore-mongo.sh
# runs on the server: $1 = archive file; the $VARS expand inside the container
docker exec -i mongo sh -c 'mongorestore -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase admin --archive --gzip --drop --nsInclude="shop.*"' < "$1"
~~~

~~~text ssh new "bash /root/restore-mongo.sh /root/shop-mongo.archive.gz"
restoring indexes for collection $__bt shop.users' from metadata
180 document(s) restored successfully. 0 document(s) failed to restore.
~~~

[[--nsInclude="shop.*"]] = أي collection في [[shop]]. والتنصيص مهم: من غيره الـ shell ممكن يحاول يفك [[*]] كأسامي ملفات. وبيوزر [[shopapp]] كمان بقى بيشتغل، لأنه مبقاش محتاج يلمس [[admin]].

### ٥. العدّ، وفخ تاني

~~~bash count-mongo.sh
docker exec "$1" sh -c 'mongosh -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase admin --quiet shop --eval "let t=0,i=0; db.getCollectionNames().forEach(c=>{t+=db[c].countDocuments(); i+=db[c].getIndexes().length}); print(db.getCollectionNames().length+\" collections, \"+t+\" docs, \"+i+\" indexes\")"'
~~~

أول نسخة كانت من غير [[--authenticationDatabase admin]] وطلعت [[MongoServerError: Authentication failed.]]: لما تكتب [[shop]] في الآخر، mongosh بيدوّر على اليوزر في [[shop]]، والـ root متسجّل في [[admin]]. وبعد التصليح:

~~~text الناتج
old: 3 collections, 180 docs, 4 indexes
new: 3 collections, 180 docs, 4 indexes
~~~

عدّ الـ indexes مهم: بعد الحالة ٣ كان الرقم هيبقى أقل، والـ documents نفس العدد.

---

## الـ dump النهائي

الـ dump اللي فوق نسخة «تجريبية» عشان تجرّب الجديد. وقت التحويل: أوقف الـ API على القديم ([[docker compose stop api]]) الأول، وبعدين dump تاني و restore تاني، وبعدين عدّ. أي طلب اتكتب بين أول dump والإيقاف هيضيع لو اكتفيت بالأولاني.

ولو الـ container عليه healthcheck، استنى يبقى [[healthy]] قبل الـ restore. ولو مفيش، [[docker inspect -f '{{.State.Health.Status}}' new-db]] بيطلّع [[map has no entry for key "Health"]]، فاستخدم الأداة نفسها: [[docker exec new-db pg_isready -U shop -d shop]] بيقول [[accepting connections]].

---

## الطرق اللي اترفضت

| الطريقة | ليه لأ |
|---|---|
| [[rsync]] لفولدر الداتا وهي شغالة | الملفات بتتكتب أثناء النسخ، والنسخة ممكن متقومش أو تقوم ناقصة |
| سطر ssh واحد فيه [[$VAR]] | بيتفك على جهازك أو على السيرفر، مش جوه الـ container |
| [[-p password]] على سطر الأمر من جهازك | بيتسجّل في الـ history وبيبان في [[ps]] (الدرس الأخير في الوحدة) |
| تصدّق الـ exit code بس | [[pg_restore]] خرج بـ 1 والداتا كاملة، و [[mongorestore]] بيطبع «successfully» وهو ماسح يوزر |
| [[mongorestore]] من غير [[--nsInclude]] | بيلمس [[admin]]: صلاحيات، ويوزرز بتتمسح، والجلسة بتقفل |

---

## الخلاصة

| | Postgres | Mongo |
|---|---|---|
| dump | [[pg_dump -Fc]] جوه الـ container | [[mongodump --archive --gzip]] من سكربت بـ [[bash -s]] |
| قبل الـ restore | [[pg_dumpall --roles-only]] أو [[--no-owner]] | [[--nsInclude="db.*"]] دايمًا |
| restore | [[docker exec -i ... pg_restore]] | [[docker exec -i ... mongorestore]] |
| اقرا | [[errors ignored on restore: N]] | أي سطر [[Failed:]] |
| اعدّ | جداول وصفوف كل جدول | collections و documents و indexes |`,
        deep: {
          why: R`الداتابيز هي الحاجة الوحيدة في النقل اللي لو ضاع منها سطر محدش هيرجّعه. والأدوات بتطبع رسايل مطمّنة («successfully») حتى لما جزء فشل، فالعدّ على الاتنين هو الدليل الوحيد.`,
          how: R`[[pg_dump]] بيفتح transaction بـ snapshot واحد ويقرا كل الجداول منه، فالنسخة متسقة حتى والتطبيق شغال. والـ custom format فيه فهرس بكل حاجة، فـ [[pg_restore]] بيعمل الجداول وبعدين الداتا وبعدين الـ indexes والـ constraints، وكل أمر لوحده (عشان كده خطأ في [[OWNER TO]] مبيوقفش الداتا). والأدوار مش جوه أي داتابيز، فـ [[pg_dump]] مبيشوفهاش. و [[mongodump]] بيقرا كل collection ويكتبها في أرشيف واحد، ولو اليوزر root بياخد [[admin.system.users]] كمان. و [[mongorestore]] بيعامل يوزرز [[admin]] معاملة خاصة: مع [[--drop]] بيمسح اليوزرز اللي مش في الأرشيف. والـ shell بيفك [[$VAR]] جوه علامات مزدوجة قبل ما يبعت الأمر، فكل مستوى (جهازك، والسيرفر، والـ container) ليه فرصة يفك المتغير، والمكان الوحيد اللي فيه القيمة هو الـ container.`,
          when: R`نقل سيرفر، وعمل نسخة staging من الإنتاج، واختبار إن الباك أب بيرجع فعلًا (restore على container مؤقت وعدّ)، وقبل أي migration كبيرة. ودرس «pg_dump» فيه الباك أب اليومي، ودرس «backup_mongodb.sh» في تاب real فيه سكربت Mongo كامل.`,
          mistakes: R`[[docker exec]] من غير [[-i]] فالـ restore بيقرا صفر. [[$VAR]] جوه علامات مزدوجة في سطر ssh. رسايل [[mongodump]] تدخل جوه الأرشيف لأنك مفصلتش [[2>]]. ملف dump حجمه صفر ومحدش بص عليه. نسيان الأدوار في Postgres أو [[--nsInclude]] في Mongo. تصدّق «successfully» أو تخاف من exit 1 من غير ما تقرا. تعدّ الـ documents وتنسى الـ indexes. وتنسى الـ dump النهائي بعد إيقاف التطبيق.`,
        },
        sol: R`من غير [[roles.sql]]: ٨ أخطاء ([[role "shop_owner" does not exist]] و [[role "reporting" does not exist]]) و [[exit=1]]، بس الاستعلام بيطلّع [[3|50|120|10]] على الاتنين: الداتا وصلت، والملكية بقت [[shop]]، و [[reporting]] مالوش صلاحيات.

Mongo بالـ root من غير [[--nsInclude]]: [[Failed: shop.users: error creating indexes for shop.users: createIndexes requires authentication]]، ويوزرز [[admin]] كانت [[admin.backupbot admin.root]] وبقت [[admin.root]] بس. وبـ [[--nsInclude="shop.*"]] العدّ [[3 collections, 180 docs, 4 indexes]] على الاتنين.`,
        practice: [
          { lvl: 'سريع', t: R`من غير ما تشغّل: في [[ssh old "echo $HOME"]] و [[ssh old 'echo $HOME']]، كل واحد هيطبع home مين؟ وفي [[ssh old "docker exec db sh -c 'echo \$POSTGRES_USER'"]] المتغير بيتفك فين؟ وبعدين جرّب.`, done: R`كتبت: الأولى home جهازك، والتانية home السيرفر، والتالتة جوه الـ container ([[shop]])، والتجربة طابقت.` },
          { lvl: 'تطبيق', t: R`اعمل dump لـ Postgres وبعدين امسح ٥ صفوف من [[orders]] على الجديد بعد الـ restore. اكتب سكربت [[compare-pg.sh]] بيشغّل استعلام العدّ على الاتنين ويطبع [[MATCH]] أو [[MISMATCH]] بالرقمين.`, done: R`قبل المسح بيطبع [[MATCH 3|50|120|10]]، وبعده [[MISMATCH old=3|50|120|10 new=3|50|115|10]]، وبيخرج بـ 1.` },
          { lvl: 'تطبيق', t: R`صلّح الأمر البايظ ده عشان يشتغل من جهازك: [[ssh old "docker exec mongo mongodump -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD --archive" > m.archive]]. فيه مشكلتين على الأقل غير الاقتباسات.`, done: R`النسخة بتاعتك في ملف بـ [[bash -s]]، والمتغيرات بتتفك جوه [[sh -c '...']]، وفيها [[--authenticationDatabase admin]]، والرسايل في [[2> dump.err]] مش جوه الأرشيف، و [[ls -l m.archive]] أكبر من صفر.` },
          { lvl: 'تطبيق', t: R`بيانات حقيقية الشكل: اقرا لوج [[pg_restore]] ده وقول الداتا وصلت ولا لأ، وإيه اللي ناقص بالظبط، والحل: سطرين [[role "shop_owner" does not exist]] على [[ALTER TABLE ... OWNER TO]]، وسطر [[role "reporting" does not exist]] على [[GRANT SELECT]]، وفي الآخر [[errors ignored on restore: 8]].`, done: R`كتبت: الداتا وصلت (الأخطاء على الملكية والصلاحيات بس)، والجداول ملك اليوزر اللي عمل restore، و [[reporting]] مالوش [[SELECT]]، والحل [[pg_dumpall --roles-only]] قبلها أو [[--no-owner --no-privileges]] لو مش محتاجهم.` },
          { lvl: 'تحدي', t: R`اعمل restore لـ Mongo من غير [[--nsInclude]] بالـ root على container جديد فيه يوزر زيادة في [[admin]]، واثبت بالأرقام ٣ حاجات: اليوزر اتمسح، وعدد الـ indexes قلّ، والسطر الأخير قال «successfully». وبعدين صلّحها.`, done: R`عندك ٣ أوامر بناتجها: [[getUsers()]] قبل وبعد، و [[count-mongo.sh]] بيقول [[3 indexes]] بدل [[4]]، وسطر [[180 document(s) restored successfully]]؛ وبعد [[--nsInclude]] و [[createUser]] تاني رجع كله.` },
          { lvl: 'تحدي', t: R`دوّر بنفسك: من [[mongodump --help]] و [[pg_dump --help]]، إزاي تعمل dump لـ collection واحدة أو جدول واحد بس؟ وإزاي تستبعد جدول لوجات كبير؟ جرّبهم واعدّ.`, done: R`استخدمت [[--collection]] (أو [[--nsInclude]] في الـ restore) و [[--excludeCollection]] لـ Mongo، و [[-t]] و [[-T]] لـ Postgres، وكل واحدة العدّ بعدها فيه الجدول المطلوب بس أو من غير المستبعد.` },
        ],
        ci: [
          { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`cat > restore.log <<'EOF'
pg_restore: error: could not execute query: ERROR:  role "shop_owner" does not exist
Command was: ALTER TABLE public.orders OWNER TO shop_owner;
pg_restore: error: could not execute query: ERROR:  role "reporting" does not exist
Command was: GRANT SELECT ON TABLE public.products TO reporting;
pg_restore: warning: errors ignored on restore: 8
EOF
if grep -q "errors ignored on restore" restore.log; then
  echo "RESTORE HAD $(grep -oE 'restore: [0-9]+' restore.log | grep -oE '[0-9]+') ERRORS"
  grep -oE 'role "[^"]+" does not exist' restore.log | sort -u
fi
old="3 collections, 180 docs, 4 indexes"; new="3 collections, 180 docs, 3 indexes"
[ "$old" = "$new" ] && echo MATCH || echo "MISMATCH old=($old) new=($new)"
X=from-laptop; ssh_cmd="echo $X"; echo "double quotes expand here: $ssh_cmd"
ssh_cmd='echo $X'; echo "single quotes keep it: $ssh_cmd"`, expect: [R`RESTORE HAD 8 ERRORS`, R`role "reporting" does not exist`, R`role "shop_owner" does not exist`, R`MISMATCH old=(3 collections, 180 docs, 4 indexes) new=(3 collections, 180 docs, 3 indexes)`, R`double quotes expand here: echo from-laptop`, R`single quotes keep it: echo $X`] },
        ],
      },
      {
        cmd: "بورتات Docker مفتوحة رغم ufw",
        title: "ufw قافل كل حاجة، والـ API والداتابيز باينين من الإنترنت: ليه، وإزاي تقفلهم صح",
        learn: R`تكتشف بورت container مفتوح للعالم، وتثبت إن ufw مش بيوقفه، وتقفله بـ [[127.0.0.1:]] في compose.`,
        out: R`من جهاز تاني: 80 و 443 [[open]]، و 5000 و 8080 [[CLOSED]]، والموقع لسه 200 من nginx.`,
        desc: R`[[ports: ["5000:5000"]]] في compose معناها «افتح 5000 على **كل** عناوين السيرفر»، يعني للإنترنت. و [[ufw deny 5000]] مش بيوقفه: Docker بيحوّل الطلب للـ container في جدول [[nat]] قبل ما ufw يشوفه، والطلب بيعدّي في سلسلة [[FORWARD]] من سلاسل Docker، مش في [[INPUT]] اللي ufw بيقفلها.

الحل إنك تقول لـ Docker يفتح البورت على [[127.0.0.1]] بس ([[127.0.0.1:5000:5000]])، و nginx اللي على نفس السيرفر يوصله عادي. ولو مش عايز تعدّل الملف الأصلي: ملف override فيه [[ports: !override [...]]]. والاختبار الوحيد اللي يتصدّق: من **جهاز تاني**.`,
        example: R`# على السيرفر: مين سامع على كل العناوين؟ (العمود الرابع بس)
ss -tlnp | awk '$4 ~ /^(0\.0\.0\.0|\[::\]):/ {print $4, $6}'
iptables -t nat -L DOCKER -n
iptables -L FORWARD -n --line-numbers | head -5
# من جهاز تاني: الاختبار اللي يتصدّق
for p in 22 80 443 5000 8080; do timeout 4 bash -c "echo > /dev/tcp/203.0.113.20/$p" 2>/dev/null && echo "$p open" || echo "$p CLOSED"; done
# الإصلاح: البورتات على 127.0.0.1 بملف override
docker compose -f compose.yml -f ports.yml config | grep -B1 -A3 host_ip
docker compose -f compose.yml -f ports.yml up -d`,
        lines: [
          R`[[ss -tlnp]]: [[-t]] TCP، و [[-l]] اللي سامع (listening) بس، و [[-n]] أرقام بدل أسامي، و [[-p]] اسم البرنامج. و [[awk]] بيبص على العمود الرابع (العنوان المحلي) بس: لو بيبدأ بـ [[0.0.0.0:]] أو [[[::]:]] يبقى مفتوح على كل العناوين، فبيطبع العنوان والبرنامج.`,
          R`[[iptables -t nat -L DOCKER -n]] بيعرض سلسلة [[DOCKER]] في جدول [[nat]]: كل سطر [[DNAT]] معناه «أي طلب على البورت ده حوّله لـ IP الـ container». ده اللي Docker عمله لكل بورت في [[ports:]].`,
          R`[[FORWARD]] هي السلسلة اللي بيعدّي فيها أي طلب رايح لـ container. [[--line-numbers]] بيرقّم القواعد بالترتيب، و [[head -5]] أول ٥: هتلاقي [[DOCKER-USER]] و [[DOCKER-FORWARD]] **قبل** سلاسل [[ufw-]].`,
          R`من جهاز تاني: [[/dev/tcp/IP/PORT]] حاجة في bash بتفتح اتصال TCP لما تكتب فيها، و [[timeout 4]] بيقطع لو محدش رد. [[&& echo open || echo CLOSED]] بيطبع النتيجة. ده أصدق من أي أمر على السيرفر نفسه.`,
          R`[[config]] بيطبع الـ compose بعد دمج الملفين من غير ما يشغّل حاجة، و [[grep -B1 -A3 host_ip]] بيوري كل بورت ومعاه سطر قبله و٣ بعده: لازم تلاقي [[host_ip: 127.0.0.1]] لكل بورت.`,
          R`[[up -d]] بالملفين بيعيد عمل الـ containers اللي البورتات بتاعتها اتغيّرت بس.`,
        ],
        try: R`في المعمل شغّل الـ stack بـ [[5000:5000]]، وفعّل ufw ([[allow 22]] و [[80,443]] بس)، وجرّب البورت من [[vpscase-laptop]]. وبعدين [[ufw deny 5000/tcp]] وجرّب تاني. وبعدين صلّحها بملف override واثبت من اللابتوب إن 5000 [[CLOSED]] والموقع لسه شغال من nginx.`,
        teach: R`## العَرَض

على [[new-vps]] فعّلنا ufw بالترتيب الصح:

~~~text ufw status verbose
Status: active
Default: deny (incoming), allow (outgoing), deny (routed)
To                         Action      From
22/tcp                     ALLOW IN    Anywhere
80,443/tcp                 ALLOW IN    Anywhere
~~~

يعني المفروض مفيش غير 22 و 80 و 443. ومن اللابتوب ([[203.0.113.50]]):

~~~text for p in 22 80 443 5000 8080 9999; do timeout 4 bash -c "echo > /dev/tcp/203.0.113.20/$p" ...
22 open
80 open
443 open
5000 open
8080 open
9999 CLOSED
~~~

و [[curl -s http://203.0.113.20:5000/health]] رجّع [[{"ok":true,"server":"api"}]]. الـ API مكشوفة من غير nginx ومن غير HTTPS. ولو ده كان Postgres على 5432، كان أي حد يقدر يجرّب باسوردات عليه.

---

## التشخيص بالترتيب

### ١. مين سامع، وعلى أنهي عنوان؟

أول محاولة كانت [[ss -tlnp | grep -E "0\.0\.0\.0|\[::\]"]] وطلّعت **كل** السطور، حتى [[127.0.0.1:8080]]. ليه؟ عشان كل سطر في [[ss]] فيه عمود Peer قيمته [[0.0.0.0:*]]. فالـ grep على السطر كله بيكدب. الصح نبص على العمود الرابع بس:

~~~text ss -tlnp | awk '$4 ~ /^(0\.0\.0\.0|\[::\]):/ {print $4, $6}'
0.0.0.0:5000 users:(("docker-proxy",pid=3539,fd=7))
0.0.0.0:8080 users:(("docker-proxy",pid=3563,fd=7))
0.0.0.0:80 users:(("nginx",pid=2655,fd=5),...
0.0.0.0:22 users:(("sshd",pid=8,fd=3))
0.0.0.0:443 users:(("nginx",pid=2655,fd=6),...
[::]:5000 users:(("docker-proxy",pid=3546,fd=7))
[::]:8080 users:(("docker-proxy",pid=3575,fd=7))
~~~

- [[$4 ~ /.../]]: العمود الرابع بيطابق الـ regex. و [[\.]] نقطة حقيقية (النقطة لوحدها = أي حرف)، و [[\[::\]]] الأقواس نفسها.
- [[docker-proxy]] هو البرنامج اللي Docker بيشغّله لكل بورت منشور. شوفته على [[0.0.0.0]] = البورت ده للعالم.
- و [[[::]:5000]] نفس الكلام على IPv6.

### ٢. طب ufw فين؟

جرّبنا الحل اللي أي حد هيعمله:

~~~text ufw deny 5000/tcp
Rule added
Rule added (v6)
~~~

ومن اللابتوب تاني: [[{"ok":true,"server":"api"}]] و [[exit=0]]. القاعدة اتضافت ومعملتش حاجة.

### ٣. ليه؟ بص على iptables

~~~text iptables -t nat -L DOCKER -n
Chain DOCKER (2 references)
target     prot opt source               destination
DNAT       6    --  0.0.0.0/0            0.0.0.0/0            tcp dpt:5000 to:172.18.0.2:5000
DNAT       6    --  0.0.0.0/0            0.0.0.0/0            tcp dpt:8080 to:172.18.0.3:80
~~~

~~~text iptables -L FORWARD -n --line-numbers | head -5
Chain FORWARD (policy DROP)
num  target     prot opt source               destination
1    DOCKER-USER  0    --  0.0.0.0/0            0.0.0.0/0
2    DOCKER-FORWARD  0    --  0.0.0.0/0            0.0.0.0/0
3    ufw-before-logging-forward  0    --  0.0.0.0/0            0.0.0.0/0
~~~

الطلب اللي جاي على 5000 بيمشي كده:

~~~text رحلة الطلب
جاي على 203.0.113.20:5000
  -> PREROUTING (nat) -> سلسلة DOCKER: DNAT لـ 172.18.0.2:5000
  -> بقى رايح لـ IP تاني، فبيروح FORWARD مش INPUT
  -> DOCKER-USER (فاضية) -> DOCKER-FORWARD: ACCEPT
  -> ufw-before-forward ... مبيوصلهاش أصلًا
~~~

[[ufw deny]] و [[ufw allow]] بيكتبوا في سلاسل [[ufw-user-input]] اللي جوه [[INPUT]]: الطلبات اللي رايحة للسيرفر نفسه. والطلب ده بعد الـ DNAT رايح للـ container، فبيعدّي في [[FORWARD]]، و Docker حاطط سلاسله فيها **قبل** ufw. (الأرقام دي من Docker 29 جوه Ubuntu 24.04 في المعمل؛ النسخ الأقدم أسامي السلاسل فيها مختلفة شوية والفكرة هي هي.)

### ٤. وليه [[curl localhost:5000]] على السيرفر مش دليل؟

على السيرفر نفسه [[localhost:5000]] بيشتغل في الحالتين (مفتوح للعالم أو لأ)، فمبيقولكش حاجة عن الإنترنت. ونفس الكلام للـ [[0.0.0.0]] في [[ss]]: بيقولك إنه **ممكن** يتوصل له، لكن فيه فايروول عند شركة الاستضافة ممكن يقفله. الدليل الوحيد: جهاز تاني بره.

ومن ويندوز (PowerShell) بدل [[/dev/tcp]]:

~~~powershell
(Test-NetConnection 203.0.113.20 -Port 5000 -WarningAction SilentlyContinue).TcpTestSucceeded
~~~

بيطبع [[True]] أو [[False]] (اتجرّب على PowerShell 7.6 على بورت مفتوح وبورت مقفول على الجهاز نفسه).

---

## الإصلاح: [[127.0.0.1]] في البورت

### أول محاولة: ملف override عادي

~~~yaml merge-test.yml
services:
  api:
    ports: ["127.0.0.1:5000:5000"]
~~~

~~~text docker compose -f compose.yml -f merge-test.yml up -d api
Error response from daemon: failed to set up container networking: driver failed programming external connectivity on endpoint shop-api-1 (...): failed to bind host port 127.0.0.1:5000/tcp: address already in use
~~~

compose **بيجمع** الـ [[ports]] من الملفين مش بيستبدلها، فالـ container طلب [[5000:5000]] و [[127.0.0.1:5000:5000]] مع بعض، واتخانقوا. ده ظاهر في [[config]]: سطرين للبورت.

### الصح: [[!override]]

~~~yaml ports.yml
services:
  api:
    ports: !override ["127.0.0.1:5000:5000"]
  web:
    ports: !override ["127.0.0.1:8080:80"]
~~~

[[!override]] بتقول لـ compose «القايمة دي مكان القايمة الأصلية بالكامل» (compose 2.24.4 وأحدث؛ في المعمل 2.40 على Ubuntu و 5.3 على Docker Desktop). و [[!reset []]] بتشيل القايمة خالص، ودي لو الـ service مش محتاجة بورت على السيرفر أصلًا.

~~~text docker compose -f compose.yml -f ports.yml config | grep -B1 -A3 host_ip
      - mode: ingress
        host_ip: 127.0.0.1
        target: 5000
        published: "5000"
--
      - mode: ingress
        host_ip: 127.0.0.1
        target: 80
        published: "8080"
~~~

وبعد [[up -d]]:

~~~text الناتج
LISTEN 0      4096       127.0.0.1:5000       0.0.0.0:*
LISTEN 0      4096       127.0.0.1:8080       0.0.0.0:*
shop-api-1: 127.0.0.1:5000->5000/tcp
~~~

ومن اللابتوب:

~~~text الناتج
80 open
443 open
5000 CLOSED
8080 CLOSED
200   <- curl -sk https://shop.example/
~~~

nginx على السيرفر بيكلّم [[127.0.0.1:5000]] زي ما كان، فالموقع شغال، والـ API مش باينة غير من وراه.

### لو تقدر تعدّل [[compose.yml]] نفسه

اكتب [[127.0.0.1:]] فيه على طول، وده أحسن من override لأن أي حد هيشغّله هياخد الصح. والـ services اللي مفيش حاجة على السيرفر بتكلّمها (داتابيز بيكلّمها container تاني على نفس الشبكة) متحطّلهاش [[ports]] خالص: الـ containers بتوصل لبعض بالاسم ([[db:5432]]) من غير ما تفتح حاجة (درس «networks» في تاب docker).

---

## البدايل اللي اترفضت

| البديل | اللي حصل في المعمل أو الوثائق |
|---|---|
| [[ufw deny 5000/tcp]] | اتضافت، والبورت لسه مفتوح ([[exit=0]] من اللابتوب) |
| [[iptables -I DOCKER-USER -i eth0 -p tcp --dport 8080 -j DROP]] | لسه [[200]]: بعد الـ DNAT البورت بقى 80 (بورت الـ container)، فالقاعدة مبتطابقش |
| نفس القاعدة بـ [[-m conntrack --ctorigdstport 8080]] | اشتغلت ([[000]] و timeout)، بس لازم تعرف الحتة دي، ومبتتحفظش بعد restart لوحدها، وكل بورت جديد محتاج قاعدة |
| [[iptables: false]] في [[daemon.json]] | من وثائق Docker: Docker بيبطّل يكتب قواعد، والشبكات بين الـ containers ووصولها للإنترنت بيبوظ لو مكتبتهاش بإيدك |
| [[ip: 127.0.0.1]] في [[daemon.json]] | من وثائق Docker: بيخلّي الافتراضي لأي [[ports]] من غير IP هو [[127.0.0.1]]. كويس كحماية زيادة، بس اكتب [[127.0.0.1:]] صريح برضه عشان الملف يتفهم لوحده |

---

## اتأكد إنها اتحلّت، ومتتكررش

- من جهاز تاني: كل بورت مش 22 و 80 و 443 لازم [[CLOSED]].
- [[ss -tlnp | awk '$4 ~ /^(0\.0\.0\.0|\[::\]):/']] مفيهوش [[docker-proxy]].
- في الـ code review: أي [[ports:]] من غير [[127.0.0.1:]] سؤال. وفي CI: [[grep -nE '"[0-9]+:[0-9]+' compose*.yml]] بيطلّع البورتات اللي من غير IP (على المعمل طلّع [[compose.yml:5:    ports: ["8080:80"]]] و [[compose.yml:11]]، ومطلّعش [[ports.yml]]).

## الخلاصة

| الكتابة | البورت مفتوح لمين |
|---|---|
| [[5000:5000]] | مفتوح للعالم، و ufw مش بيوقفه |
| [[127.0.0.1:5000:5000]] | السيرفر نفسه بس (nginx يوصله) |
| من غير [[ports]] | الـ containers اللي على نفس الشبكة بس |
| [[!override]] | استبدل قايمة البورتات من ملف تاني |
| الاختبار | من جهاز تاني، مش [[localhost]] |`,
        deep: {
          why: R`بورت داتابيز أو API مكشوف بيتلاقي في دقايق: فيه سكانرز بتلف على كل IPs الإنترنت طول الوقت. وأغلب الناس بتفتكر إن ufw حاميهم، فمحدش بيدوّر. والسبب مش باج: Docker معمول إنه ينشر البورت للعالم لأن ده الافتراضي اللي أغلب الناس عايزاه على جهاز التطوير.`,
          how: R`لما تكتب [[ports]]، Docker بيعمل حاجتين: قاعدة [[DNAT]] في جدول [[nat]] بتغيّر وجهة أي طلب على البورت ده لـ IP الـ container، وقاعدة [[ACCEPT]] في سلسلته جوه [[FORWARD]]. والـ kernel بيقرر INPUT ولا FORWARD **بعد** الـ DNAT: الطلب بقى رايح لـ IP مش بتاع السيرفر، فبيروح FORWARD. و ufw بيكتب قواعد المستخدم في INPUT. وكمان Docker بيشغّل [[docker-proxy]] سامع على البورت للحالات اللي الـ DNAT مبيغطيهاش (زي الطلبات من السيرفر نفسه). لما تكتب [[127.0.0.1:5000:5000]]، الـ DNAT بيبقى للطلبات اللي رايحة لـ [[127.0.0.1]] بس، والـ proxy بيسمع على [[127.0.0.1]] بس، فمفيش طريق من بره.`,
          when: R`أي سيرفر عليه Docker و nginx (أو Caddy أو Traefik) على السيرفر نفسه. لو الـ reverse proxy نفسه container، يبقى هو بس اللي ليه [[ports]] (80 و 443) والباقي من غير ports خالص على نفس الشبكة.`,
          mistakes: R`تصدّق [[ufw status]]. تختبر من السيرفر بـ [[localhost]]. [[grep]] على سطر [[ss]] كله فتلاقي [[0.0.0.0]] في عمود Peer. ملف override من غير [[!override]] فالبورتات تتجمع و [[address already in use]]. قاعدة [[DOCKER-USER]] بـ [[--dport]] على البورت المنشور. تنسى IPv6 ([[[::]:5000]]). وتقفل البورت وتنسى إن الـ healthcheck أو أداة مراقبة من بره كانت بتستخدمه.`,
        },
        sol: R`قبل: من اللابتوب [[5000 open]] و [[8080 open]] و [[curl http://203.0.113.20:5000/health]] بيرجّع [[{"ok":true,"server":"api"}]] حتى بعد [[ufw deny 5000/tcp]] ([[Rule added]]).

بعد [[ports.yml]] بـ [[!override]] و [[up -d]]: [[ss -tln]] فيه [[127.0.0.1:5000]] و [[127.0.0.1:8080]]، ومن اللابتوب [[5000 CLOSED]] و [[8080 CLOSED]]، و [[curl -sk https://shop.example/]] لسه [[200]].`,
        solCode: R`cat > ports.yml <<'EOF'
services:
  api:
    ports: !override ["127.0.0.1:5000:5000"]
  web:
    ports: !override ["127.0.0.1:8080:80"]
EOF
docker compose -f compose.yml -f ports.yml up -d`,
        practice: [
          { lvl: 'سريع', t: R`من غير ما تشغّل: لكل سطر قول البورت مفتوح لمين: [[ports: ["5432:5432"]]]، و [[["127.0.0.1:5432:5432"]]]، و [[expose: ["5432"]]]، ومن غير [[ports]] خالص.`, done: R`كتبت: الأول للعالم، والتاني للسيرفر بس، والتالت والرابع للـ containers اللي على نفس الشبكة بس (و [[expose]] مجرد توثيق)، وجرّبت الأول والتاني من اللابتوب.` },
          { lvl: 'تطبيق', t: R`صلّح الكود البايظ: [[ss -tlnp | grep "0.0.0.0" | grep -v ":22 "]] المفروض يطلّع البورتات المفتوحة للعالم غير ssh، بس بيطلّع [[127.0.0.1:8080]] كمان وبينسى IPv6. اكتب نسخة صح.`, done: R`نسختك بتبص على العمود الرابع بـ [[awk]]، وبتشمل [[[::]]]، وبتستبعد 22 و 80 و 443، وعلى [[new-vps]] بعد الإصلاح مبتطلّعش حاجة وعلى [[old-vps]] بتطلّع 5000 و 8080.` },
          { lvl: 'تطبيق', t: R`قارن وقيس: اعمل قاعدة [[DOCKER-USER]] بـ [[--dport 8080]] مرة و [[-m conntrack --ctorigdstport 8080]] مرة، وجرّب من اللابتوب بعد كل واحدة. وامسح القاعدة بعدها بـ [[iptables -D]] بنفس الكلام.`, done: R`عندك سطرين: [[--dport]] لسه [[200]] و [[--ctorigdstport]] [[000]]، وتقدر تشرح ليه في جملة (البورت بعد الـ DNAT)، و [[iptables -L DOCKER-USER -n]] فاضية في الآخر.` },
          { lvl: 'تطبيق', t: R`اكتب ملف override بيخلّي [[api]] من غير أي بورت على السيرفر خالص و [[web]] على [[127.0.0.1:8080]]، وورّي بـ [[config]] الفرق بين [[!reset []]] و [[[]]] عادي.`, done: R`[[config]] بـ [[!reset []]] مفيهوش [[ports]] تحت [[api]]، ومن غير الـ tag فيه [[published: "5000"]] لسه، وبعد [[up -d]] الموقع شغال لأن nginx بيكلّم 8080 بس.` },
          { lvl: 'تحدي', t: R`ابني [[public-ports.sh]] (مشروع الوحدة الصغير): بياخد ناتج [[ss -tlnp]] من الـ stdin ولستة بورتات مسموحة، ويطبع كل بورت مفتوح للعالم مش في اللستة واسم البرنامج، ويخرج بـ 1 لو لقى حاجة. وجرّبه على ناتج السيرفرين.`, done: R`على ناتج [[old-vps]] بيطبع [[0.0.0.0:5000 docker-proxy]] و [[0.0.0.0:8080 docker-proxy]] و [[[::]:5000]] و [[[::]:8080]] وبيخرج بـ 1، وعلى [[new-vps]] بعد الإصلاح مبيطبعش حاجة وبيخرج بـ 0.` },
          { lvl: 'تحدي', t: R`اشرحها لزميل بالرسم: ارسم رحلة طلب جاي على [[203.0.113.20:5000]] من أول ما يوصل لحد الـ container، وحط عليها مكان قواعد ufw ومكان [[DOCKER-USER]]، وفين بالظبط [[127.0.0.1:]] بتقفل الطريق.`, done: R`الرسم فيه PREROUTING و DNAT و FORWARD و INPUT، وقواعد ufw في INPUT، و [[DOCKER-USER]] أول FORWARD، و [[127.0.0.1:]] بتخلّي الـ DNAT ميطابقش طلبات جاية على IP السيرفر الخارجي.` },
        ],
        ci: [
          { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`cat > ss.txt <<'EOF'
State  Recv-Q Send-Q Local Address:Port Peer Address:Port Process
LISTEN 0      511          0.0.0.0:80        0.0.0.0:*    users:(("nginx",pid=822,fd=5))
LISTEN 0      128          0.0.0.0:22        0.0.0.0:*    users:(("sshd",pid=8,fd=3))
LISTEN 0      4096         0.0.0.0:5000      0.0.0.0:*    users:(("docker-proxy",pid=1393,fd=7))
LISTEN 0      4096       127.0.0.1:8080      0.0.0.0:*    users:(("docker-proxy",pid=1422,fd=7))
LISTEN 0      4096            [::]:5000         [::]:*    users:(("docker-proxy",pid=1401,fd=7))
EOF
echo "naive grep also caught 127.0.0.1: $(grep '0\.0\.0\.0' ss.txt | grep -c '127\.0\.0\.1:8080')"
awk '$4 ~ /^(0\.0\.0\.0|\[::\]):/ { n=split($4,a,":"); port=a[n]; if (port !~ /^(22|80|443)$/) { split($6,b,"\""); print "PUBLIC " $4 " " b[2] } }' ss.txt`, expect: [R`naive grep also caught 127.0.0.1: 1`, R`PUBLIC 0.0.0.0:5000 docker-proxy`, R`PUBLIC [::]:5000 docker-proxy`] },
        ],
      },
      {
        cmd: "تعديل موقع شغّال بأمان",
        title: "غيّر حاجة في موقع حي: نسخة احتياطية، و build في الخلفية، وتبديل container واحد، ورجوع في ثواني",
        learn: R`تعدّل موقع شغّال بـ compose من غير ما يقع، وتقيس التوقف، وترجع للنسخة القديمة بأمرين.`,
        out: R`النص الجديد على الموقع، وعدد الطلبات اللي فشلت أثناء التبديل متقاس، و [[shop-web:pre-change-...]] جاهز للرجوع.`,
        desc: R`التعديل على سيرفر عليه زوار ليه ٥ خطوات بالترتيب: **(١)** اعمل نسخة احتياطية بالاسم: [[docker tag app:latest app:pre-change-<date>]] (ببلاش تقريبًا، نفس الطبقات) ونسخة من الملفات اللي هتتغيّر. **(٢)** عدّل بباتش بيرفض لو الافتراض غلط، مش [[sed -i]] أعمى. **(٣)** ابني في الخلفية والموقع القديم شغال. **(٤)** اتأكد إن الـ image الجديدة فيها التعديل فعلًا. **(٥)** بدّل الـ service دي بس بـ [[up -d --no-build --no-deps]]، ولو فيه مشكلة رجّع الـ tag وبدّل تاني.

وفي الطريق ٣ فخاخ اتقابلت فعلًا: [[pgrep -f]] بيلاقي الأمر اللي بيدوّر (فيقول «شغال» للأبد، و [[pkill -f]] بيقتل جلسة الـ ssh نفسها)، و [[cd ... && nohup ... &]] بيخلّي ssh يستنى لحد ما الـ build يخلص، و container مش بيقفل على SIGTERM فالتبديل ياخد ١٠ ثواني.`,
        example: R`# ١) نسخة احتياطية بالاسم: الـ image والملف
docker tag shop-web:latest shop-web:pre-change-20261103
mkdir -p /root/bak-20261103 && cp -a web/site/index.html /root/bak-20261103/
# ٢) عدّل بباتش بيرفض لو النص مش موجود مرة واحدة بالظبط
python3 /root/patch.py web/site/index.html '<p class="banner">Free shipping over 500</p>' '<p class="banner">Free shipping over 400</p>' 1
# ٣) من جهازك: build في الخلفية، وتابعه
ssh new "cd /opt/shop; nohup docker compose build web > /root/build.log 2>&1 < /dev/null &"
ssh new 'pgrep -af "[c]ompose build" && echo RUNNING || echo DONE; tail -n 1 /root/build.log'
# ٤) الـ image الجديدة فيها التعديل؟ والقديمة لأ؟
for t in latest pre-change-20261103; do echo "$t: $(docker run --rm --entrypoint sh shop-web:$t -c 'grep -c "over 400" /www/index.html')"; done
# ٥) بدّل الـ web بس. والرجوع: رجّع الـ tag وبدّل تاني
docker compose -f compose.yml -f ports.yml up -d --no-build --no-deps web
docker tag shop-web:pre-change-20261103 shop-web:latest && docker compose -f compose.yml -f ports.yml up -d --no-build --no-deps web`,
        lines: [
          R`[[docker tag]] بيدّي نفس الـ image اسم تاني. مفيش نسخ: الاتنين بيشاوروا على نفس الـ ID، فالمساحة صفر تقريبًا. والتاريخ في الاسم عشان تعرف كل نسخة من إمتى.`,
          R`[[mkdir -p]] بيعمل الفولدر لو مش موجود ومبيشتكيش لو موجود، و [[cp -a]] بينسخ الملف بصلاحياته ووقته. ده للرجوع في الكود نفسه لو احتجت تبني تاني.`,
          R`[[patch.py]] (مكتوب في الشرح) بياخد الملف والنص القديم والجديد وعدد المرات المتوقع. لو النص موجود عدد مرات مختلف، بيقف ومبيكتبش حاجة. هنا كتبنا السطر كله بالـ [[class]] عشان يبقى فريد.`,
          R`[[nohup]] بيخلّي الـ build يكمّل لو الجلسة قفلت، و [[> /root/build.log 2>&1]] كل الناتج في لوج، و [[< /dev/null]] من غير stdin، و [[&]] في الخلفية. و [[;]] بعد [[cd]] (مش [[&&]]) عشان الـ [[&]] يبقى على الـ build بس، وإلا ssh بيستنى لحد ما يخلص (في الشرح).`,
          R`[[pgrep -af]] بيدوّر في سطر الأمر الكامل لكل process ([[-f]]) ويطبعه ([[-a]]). والقوسين في [[[c]ompose]] regex معناه «حرف c»، فبيطابق [[compose build]] بس مبيطابقش سطر الأمر بتاعه هو (اللي فيه [[[c]ompose]] بالقوسين). و [[tail -n 1]] آخر سطر في اللوج: [[web  Built]] لما يخلص.`,
          R`لكل tag: container مؤقت ([[--rm]]) من الـ image دي، و [[--entrypoint sh]] بيشغّل shell بدل البرنامج الأصلي، و [[grep -c]] بيعدّ السطور اللي فيها النص الجديد. المفروض [[latest: 1]] و [[pre-change-20261103: 0]].`,
          R`[[--no-build]] متبنيش (بنينا خلاص)، و [[--no-deps]] متلمسش الـ services اللي [[web]] معتمد عليها. فـ compose بيقارن الـ image بتاعة [[shop-web-1]] بـ [[shop-web:latest]]، ولقاها اتغيّرت، فبيعمل container جديد مكانه.`,
          R`الرجوع: [[shop-web:latest]] يرجع يشاور على النسخة القديمة، وبعدين نفس أمر التبديل. [[&&]] عشان التبديل ميحصلش لو الـ tag فشل.`,
        ],
        try: R`في المعمل غيّر «500» لـ «400» في الـ banner بس (مش الـ footer). امشي على الخطوات الخمسة، وشغّل حلقة [[curl]] كل ١٠٠ ملي ثانية أثناء التبديل وعدّ الـ 200 والـ 502. وبعدين ارجع للنسخة القديمة وعدّ تاني. وفي الآخر اعرف ليه التبديل خد ١٠ ثواني وصلّحه.`,
        teach: R`## الحالة

صاحب [[shop.example]] عايز «Free shipping over 500» تبقى «400» في الشريط اللي فوق بس، والـ footer (اللي فيه «Egypt only») يفضل زي ما هو. الموقع شغال على [[new-vps]] والزوار عليه. الملف في [[/opt/shop/web/site/index.html]] وبيتنسخ جوه الـ image وقت الـ build ([[COPY site /www]])، يعني تعديل الملف لوحده مش هيبان لحد ما تبني وتبدّل.

---

## ١. النسخة الاحتياطية بالاسم

~~~text docker tag shop-web:latest shop-web:pre-change-20261103 && docker images shop-web
shop-web:latest ed262c0b4587 12.4MB
shop-web:pre-change-20261103 ed262c0b4587 12.4MB
~~~

نفس الـ ID، و [[docker system df]] بيقول [[Images 4  ... 15.28MB]] مش ٤×١٢: الطبقات مشتركة. ونسخة من الملف في [[/root/bak-20261103/]].

---

## ٢. الباتش اللي بيرفض

~~~python /root/patch.py
import sys
path, old, new, expected = sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4])
s = open(path, encoding="utf-8").read()
n = s.count(old)
assert n == expected, f"expected {expected} match(es) of {old!r}, found {n}: nothing changed"
s = s.replace(old, new, 1)
open(path, "w", encoding="utf-8").write(s)
print(f"patched 1 of {n} in {path}")
~~~

- [[sys.argv]] الكلام اللي بعد اسم السكربت: الملف، والقديم، والجديد، والعدد.
- [[s.count(old)]] بيعدّ كام مرة النص موجود، و [[assert]] بيوقف السكربت برسالة لو العدد مش المتوقع، **قبل** ما يكتب حاجة.
- [[replace(old, new, 1)]] بيغيّر أول مرة بس.

أول تشغيل بالنص القصير:

~~~text python3 /root/patch.py web/site/index.html "Free shipping over 500" "Free shipping over 400" 1
AssertionError: expected 1 match(es) of 'Free shipping over 500', found 2: nothing changed
~~~

النص موجود مرتين (الـ banner والـ footer). الباتش وقف ومالمسش الملف. ولو كنا عملنا [[sed -i 's/Free shipping over 500/Free shipping over 400/']] كان غيّر الاتنين: جرّبناه على نسخة و [[grep -c "over 400"]] طلّع [[2]]. فكتبنا السطر كله:

~~~text python3 /root/patch.py web/site/index.html '<p class="banner">Free shipping over 500</p>' '<p class="banner">Free shipping over 400</p>' 1
patched 1 of 1 in web/site/index.html
~~~

~~~text diff /root/bak-20261103/index.html web/site/index.html
2c2
< <p class="banner">Free shipping over 500</p>
---
> <p class="banner">Free shipping over 400</p>
~~~

[[2c2]] = السطر ٢ اتغيّر (change)، و [[<]] القديم و [[>]] الجديد. سطر واحد بالظبط.

---

## ٣. الـ build في الخلفية، وفخين

### فخ ١: ssh استنى ٣٨ ثانية

أول مرة كتبنا [[ssh new "cd /opt/shop && nohup docker compose build web > /root/build.log 2>&1 &"]] والأمر رجع بعد ٣٨ ثانية، يعني بعد ما الـ build خلص. ضفنا [[< /dev/null]] وبرضه ٣٠ ثانية. فعزلنا المشكلة بـ [[sleep 8]] مكان الـ build:

~~~text الناتج
1s  <- nohup sleep 8 > /tmp/s.log 2>&1 &
0s  <- nohup sleep 8 > /tmp/s.log 2>&1 < /dev/null &
8s  <- cd /opt/shop && nohup sleep 8 > /tmp/s.log 2>&1 < /dev/null &
0s  <- cd /opt/shop; nohup sleep 8 > /tmp/s.log 2>&1 &
0s  <- cd /opt/shop && { nohup sleep 8 > /tmp/s.log 2>&1 & }
~~~

السبب في السطر التالت: [[&]] بيتطبّق على **السلسلة كلها** [[cd ... && nohup ...]]، فـ bash بيعمل subshell في الخلفية للاتنين. الـ redirect جوه السلسلة بيتطبّق على [[nohup]] بس، لكن الـ subshell نفسه لسه ماسك الـ stdout بتاع ssh، و ssh مش بيقفل لحد ما كل حد ماسك الـ stdout يسيبه. الحل: [[;]] بعد [[cd]] (فالـ [[&]] على [[nohup]] لوحده) أو قوسين [[{ ... & }]].

### فخ ٢: [[pgrep -f]] بيلاقي نفسه

~~~text بعد ما الـ build خلص (اللوج بيقول Built)
ssh new "pgrep -af \"compose build\" && echo RUNNING || echo DONE"
2737 bash -c pgrep -af "compose build" && echo RUNNING || echo DONE
RUNNING
~~~

ssh بيشغّل الأمر كده: [[bash -c '<الأمر كله>']]، وسطر الـ bash ده فيه الكلمتين [[compose build]]، فـ [[pgrep -f]] لقاه. يعني «RUNNING» للأبد. ولو كان الأمر [[pkill -f]]:

~~~text ssh new "pkill -f \"sleep-marker-xyz\"; echo still here"
(مفيش ناتج)
ssh exit=255
~~~

[[pkill]] قتل الـ bash بتاع الجلسة قبل ما يوصل لـ [[echo]]، و ssh خرج بـ 255 (الاتصال اتقفل). على سيرفر حقيقي ده ممكن يقتل جلسة الـ tmux أو السكربت اللي انت فيه. (ولو الأمر لوحده من غير [[;]] و [[&&]]، bash بيعمل exec لـ [[pgrep]] على طول فمش بيبان، وده اللي بيخلّي الفخ يظهر ويختفي.)

الحل: [[[c]ompose build]]. الـ regex معناه «c وبعدها ompose build» فبيطابق [[compose build]]، لكن السطر بتاع الـ bash فيه [[[c]ompose]] بالقوسين حرفيًا، فمبيطابقش نفسه:

~~~text أثناء الـ build، وبعده
3960 docker compose build --no-cache web
3982 /usr/libexec/docker/cli-plugins/docker-compose compose build --no-cache web
RUNNING
...
DONE
 web  Built
~~~

وأضمن من الاتنين: اقرا آخر سطر في اللوج. [[web  Built]] = خلص، و [[grep -c ERROR /root/build.log]] = [[0]]. أو استنى بحلقة: [[until ssh new '! pgrep -f "[c]ompose build" >/dev/null'; do sleep 5; done]].

> حصل معانا مرة [[failed to solve: failed to prepare extraction snapshot ... parent snapshot ... does not exist]] لما عملنا builds ورا بعض بسرعة. إعادة الـ build نفسه عدّت. اقرا اللوج قبل ما تبدّل دايمًا.

---

## ٤. التعديل جوه الـ image فعلًا؟

~~~text الناتج
latest: 1
pre-change-20261103: 0
running container image: ed262c0b4587
~~~

الـ image الجديدة فيها النص، والقديمة لأ. والسطر التالت ([[docker inspect -f "{{.Image}}" shop-web-1 | cut -c8-19]]) بيقول الـ container الشغال لسه على [[ed262c0b4587]] (القديمة)، و [[curl]] لسه بيرجّع «over 500». الـ build لوحده مش بيغيّر حاجة على الموقع. ([[cut -c8-19]] بيشيل [[sha256:]] ويسيب ١٢ حرف.)

---

## ٥. التبديل، والقياس

حلقة على السيرفر بتطلب الموقع من nginx كل ١٠٠ ملي ثانية وتكتب الكود، وفي نفس الوقت التبديل:

~~~bash
( for i in $(seq 1 150); do echo "$(date +%T.%2N) $(curl -sk -m 2 -o /dev/null -w "%{http_code}" --resolve shop.example:443:127.0.0.1 https://shop.example/)"; sleep 0.1; done > /tmp/probe.txt ) &
time docker compose -f compose.yml -f ports.yml up -d --no-build --no-deps web
wait; awk '{print $2}' /tmp/probe.txt | sort | uniq -c
~~~

~~~text الناتج
 Container shop-web-1  Recreate
 Container shop-web-1  Started
real	0m10.929s
    144 200
      6 502
~~~

- [[( ... ) &]] الحلقة كلها في الخلفية، و [[wait]] يستناها تخلص.
- [[date +%T.%2N]] الوقت بجزء من مية من الثانية.
- [[uniq -c]] بعد [[sort]] بيعدّ كل كود.

٦ طلبات [[502]] (حوالي نص ثانية: من ساعة ما القديم وقف لحد ما الجديد قام). والـ [[shop-api-1]] ملمسناهوش ([[Up 9 minutes]]). بس ليه الأمر خد **١١ ثانية**؟

### الـ container مش بيقفل على SIGTERM

~~~text الناتج
time docker stop shop-web-1            ->  real 0m10.275s ,  ExitCode 137
(بعد init: true)  time docker stop     ->  real 0m0.296s  ,  ExitCode 143
~~~

[[docker stop]] بيبعت SIGTERM ويستنى ١٠ ثواني، وبعدها SIGKILL (كود الخروج [[137]] = 128+9). البرنامج كان PID 1 جوه الـ container، والـ kernel بيتجاهل SIGTERM لـ PID 1 لو البرنامج معملش له handler. [[init: true]] في compose بيحط [[tini]] صغير هو PID 1 بيوصّل الإشارة للبرنامج، فقفل في ٠.٣ ثانية ([[143]] = 128+15 SIGTERM). ده بيفرق في كل deploy. وحطّه في [[compose.yml]] نفسه:

~~~yaml
services:
  web:
    init: true
~~~

---

## ٦. الرجوع

~~~text docker tag shop-web:pre-change-20261103 shop-web:latest && docker compose ... up -d --no-build --no-deps web
 Container shop-web-1  Started
<p class="banner">Free shipping over 500</p>
~~~

رجعت في ثواني، من غير build ومن غير ما تفتكر الملف كان فيه إيه.

### فخ: النسخة الجديدة بقت من غير اسم

بعد الرجوع، [[shop-web:latest]] بقى بيشاور على القديمة، فالجديدة ([[90ee3b3da07d]]) فضلت من غير اسم:

~~~text docker image ls -f dangling=true
90ee3b3da07d 9 minutes ago 12.4MB
~~~

وأول [[docker image prune -f]] مسحها ([[deleted: sha256:90ee3b3da07d...]]). لو عايز ترجع لها بعدين بعد ما تصلّح حاجة صغيرة: اعملها tag قبل الرجوع ([[docker tag shop-web:latest shop-web:candidate-20261103]]).

---

## ٧. الديسك: الـ tags ببلاش، الـ builds لأ

~~~text docker system df (على new-vps في المعمل)
TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          4         2         15.34MB   7.701MB (50%)
Build Cache     27        0         6.328MB   1.736MB
~~~

كل build بيسيب كاش وطبقات قديمة، ومع الوقت دول اللي بيملوا الديسك مش الـ tags. اقيس الأول ([[df -h /]] و [[docker system df]])، وبعدين نضّف بحدود: [[docker builder prune -f --filter until=72h]] (الكاش الأقدم من ٣ أيام) و [[docker image prune -f]] (الصور من غير اسم بس). وبعدها قيس تاني. واحتفظ بآخر ٢–٣ tags بتوع [[pre-change-]] بس. (تفاصيل التنضيف في درس «تنضيف Docker».)

---

## الطرق اللي اترفضت

| الطريقة | ليه لأ |
|---|---|
| [[sed -i]] على النص القصير | غيّر الاتنين (banner و footer) |
| [[docker compose down && docker compose up -d --build]] | الموقع واقف طول الـ build، والـ API بتقع معاه |
| [[docker compose up -d --build web]] على طول | بيبني ويبدّل في خطوة واحدة: مفيش فرصة تتأكد من الـ image قبل ما الزوار يشوفوها |
| تعدّل الملف جوه الـ container بـ [[docker exec]] | بيتمسح مع أول تبديل، ومحدش يعرف إنه اتعمل |
| [[pkill -f "compose build"]] من ssh | بيقتل الجلسة بتاعتك |

---

## الخلاصة

| الخطوة | الأمر |
|---|---|
| نسخة احتياطية | [[docker tag ...:latest ...:pre-change-<date>]] و [[cp -a]] للملفات |
| باتش | [[assert s.count(old) == 1]] قبل الكتابة |
| build | [[cd dir; nohup ... > log 2>&1 < /dev/null &]] |
| متابعة | [[pgrep -f "[c]ompose build"]] أو [[tail -n 1 log]] |
| تأكيد | [[grep]] جوه الـ image الجديدة والقديمة |
| تبديل | [[up -d --no-build --no-deps <service>]] مع [[init: true]] |
| رجوع | [[docker tag ...:pre-change-... ...:latest]] وتبديل |`,
        deep: {
          why: R`الموقع الحي بيتعدّل تحت ضغط («غيّرها دلوقتي»)، والغلط اللي بيحصل ساعتها مش في التعديل نفسه، في إنك مش عارف ترجع: build بيمسح القديم، أو [[sed]] غيّر حاجة زيادة، أو أداة متابعة بتقولك «شغال» وهو خلص. الخطوات دي بتخلّي كل خطوة ليها دليل، والرجوع أمرين.`,
          how: R`compose بيقارن الإعدادات والـ image ID لكل service بالـ container الشغال، ولو فيه فرق بيعمل container جديد ويمسح القديم. [[--no-deps]] بيمنعه يبص على الـ services التانية. والـ tag مجرد اسم في جدول بيشاور على ID، فتغيير الاسم لحظي. و [[pgrep -f]] بيقرا [[/proc/<pid>/cmdline]] لكل process، ومنهم الـ bash اللي ssh عمله لأمرك. و ssh بيفضل فاتح الـ channel لحد ما كل الـ processes اللي ماسكة الـ stdout أو الـ stderr تقفلهم، والـ subshell اللي [[&]] عمله للسلسلة واخد نسخة منهم. و [[docker stop]] بيبعت SIGTERM للـ PID 1 جوه الـ container، والـ kernel مبيطبّقش السلوك الافتراضي (القفل) على PID 1، فلو البرنامج مالوش handler بيتجاهلها لحد الـ SIGKILL.`,
          when: R`أي تعديل صغير على إنتاج من غير CI: نص، أو سعر، أو إعداد. ولو عندك CI/CD، نفس الأفكار جواه: tag لكل نسخة، وفحص قبل التبديل، ورجوع بالـ tag (درس «deploy.sh» في تاب real، و «build / tag / push» في تاب docker).`,
          mistakes: R`build وتبديل في أمر واحد. [[sed -i]] من غير ما تعدّ. تنسى الـ tag قبل الـ build فمفيش رجوع غير build تاني. [[cd && nohup ... &]] في ssh فالأمر يعلّق. [[pgrep -f]] أو [[pkill -f]] بالكلمة اللي في أمرك. تصدّق إن الـ build نجح من غير ما تقرا اللوج. تبدّل كل الـ services بدل واحدة. تنسى [[init: true]] فكل deploy بياخد ١٠ ثواني. ترجع وتنسى تسمّي النسخة الجديدة فالـ prune يمسحها.`,
        },
        sol: R`الباتش الأول وقف بـ [[found 2: nothing changed]]، والتاني ([[<p class="banner">...]]) [[patched 1 of 1]]، و [[diff]] بيقول [[2c2]].

قبل التبديل: [[latest: 1]] و [[pre-change-20261103: 0]] والموقع لسه «500». بعد التبديل الموقع «400». في المعمل الحلقة طلّعت [[144 200]] و [[6 502]] والأمر خد حوالي ١١ ثانية؛ بعد [[init: true]] [[docker stop]] بقى ٠.٣ ثانية بدل ١٠.٣. وبعد الرجوع الـ banner رجع «500».`,
        practice: [
          { lvl: 'سريع', t: R`من غير ما تشغّل: [[docker tag app:latest app:pre-1]] بيستهلك مساحة قد إيه؟ وبعد [[docker tag app:pre-1 app:latest]]، الـ image اللي كانت [[latest]] بيحصل لها إيه؟ اتأكد بـ [[docker images]] و [[docker image ls -f dangling=true]].`, done: R`كتبت إن الـ tag مساحته صفر تقريبًا (نفس الـ ID)، وإن الـ image القديمة بتبقى dangling لو مالهاش اسم تاني، والأوامر طابقت.` },
          { lvl: 'تطبيق', t: R`اقرا وتوقّع: لكل سطر قول ssh هيرجع إمتى (فورًا ولا بعد ٨ ثواني): [[ssh new "sleep 8 &"]]، و [[ssh new "sleep 8 > /dev/null 2>&1 &"]]، و [[ssh new "cd /tmp && sleep 8 > /dev/null 2>&1 &"]]، و [[ssh new "cd /tmp; sleep 8 > /dev/null 2>&1 &"]]. وبعدين قيس بـ [[time]].`, done: R`توقعت الأول والتالت ٨ ثواني والتاني والرابع فورًا، وشرحت التالت (الـ subshell ماسك الـ stdout)، والقياس طابق (أو كتبت الفرق وليه).` },
          { lvl: 'تطبيق', t: R`صلّح السكربت ده اللي بيستنى الـ build: [[while ssh new "pgrep -f 'compose build; echo'"; do sleep 5; done; ssh new "pkill -f 'compose build'"]]. فيه مشكلتين: بيلف للأبد، وآخر سطر بيقتل الجلسة. اكتب نسخة بتستنى صح وبتطبع آخر سطر في اللوج.`, done: R`نسختك فيها [[[c]ompose build]] (أو بتقرا [[tail -n 1 build.log]] لحد [[Built]] أو [[ERROR]])، ومفيهاش [[pkill]]، وبتخلص بعد الـ build بثواني.` },
          { lvl: 'تطبيق', t: R`اكتب اختبار لـ [[patch.py]]: ملف فيه النص مرتين، ومرة، وصفر. شغّل الباتش على كل واحد بـ [[expected=1]] وتأكد إن الملف اتغيّر في حالة واحدة بس، وإن الحالتين التانيين الملف فيهم زي ما هو بالظبط ([[sha256sum]] قبل وبعد).`, done: R`السكربت بيطبع [[REFUSED]] مرتين و [[patched 1 of 1]] مرة، و [[sha256sum]] متغيّر في حالة واحدة بس.` },
          { lvl: 'تحدي', t: R`قارن وقيس: بدّل الـ [[web]] ٣ مرات من غير [[init: true]] و ٣ مرات بيه، وكل مرة حلقة [[curl]] بتعدّ الـ 502 وأمر [[time]] على التبديل. اعمل جدول بالمتوسطات.`, done: R`الجدول فيه وقت التبديل (حوالي ١٠ ثواني مقابل أقل من ثانية) وعدد الـ 502 في كل حالة، وجملة بتشرح ليه عدد الـ 502 مش بالضرورة اتغيّر رغم إن الوقت اتغيّر.` },
          { lvl: 'تحدي', t: R`ابني [[rollback.sh <service>]]: بيلاقي آخر tag [[pre-change-*]] للـ image بتاعة الـ service (من [[docker images --format]] مترتبة)، ويسمّي الحالية [[candidate-<date>]]، ويرجّع، ويتأكد إن الـ container الشغال ID بتاعه هو ID الـ tag القديم.`, done: R`بعد ما بدّلت لنسخة جديدة، [[rollback.sh web]] رجّع [[curl]] للنص القديم، و [[docker images]] فيه [[candidate-...]] للجديدة، ولو مفيش [[pre-change-*]] بيقف برسالة ومبيغيّرش حاجة.` },
        ],
        ci: [
          { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`python`, run: R`import pathlib, hashlib
p = pathlib.Path("index.html")
p.write_text('<p class="banner">Free shipping over 500</p>\n<footer>Free shipping over 500 (Egypt only)</footer>\n', encoding="utf-8")
def patch(path, old, new, expected):
    s = path.read_text(encoding="utf-8")
    n = s.count(old)
    if n != expected:
        print(f"REFUSED: expected {expected} match(es), found {n}: nothing changed")
        return
    path.write_text(s.replace(old, new, 1), encoding="utf-8")
    print(f"patched 1 of {n}")
before = hashlib.sha256(p.read_bytes()).hexdigest()
patch(p, "Free shipping over 500", "Free shipping over 400", 1)
print("unchanged after refuse:", before == hashlib.sha256(p.read_bytes()).hexdigest())
patch(p, '<p class="banner">Free shipping over 500</p>', '<p class="banner">Free shipping over 400</p>', 1)
s = p.read_text(encoding="utf-8")
print("over 400:", s.count("over 400"), "over 500:", s.count("over 500"))`, expect: [R`REFUSED: expected 1 match(es), found 2: nothing changed`, R`unchanged after refuse: True`, R`patched 1 of 1`, R`over 400: 1 over 500: 1`] },
          { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`s=$(date +%s); bash -c 'cd . && sleep 3 > /dev/null 2>&1 < /dev/null &' | cat; a=$(( $(date +%s) - s ))
s=$(date +%s); bash -c 'cd .; sleep 3 > /dev/null 2>&1 < /dev/null &' | cat; b=$(( $(date +%s) - s ))
[ "$a" -ge 2 ] && echo "cd && ... & : waited" || echo "cd && ... & : returned ($a s)"
[ "$b" -le 1 ] && echo "cd ; ... &  : returned" || echo "cd ; ... &  : waited ($b s)"`, expect: [R`cd && ... & : waited`, R`cd ; ... &  : returned`] },
          { os: [R`ubuntu`], sh: R`bash`, run: R`bash -c 'pgrep -af "zz-build-marker" > /dev/null && echo "plain pattern: RUNNING" || echo "plain pattern: DONE"'
bash -c 'pgrep -af "[z]z-build-marker" > /dev/null && echo "bracket pattern: RUNNING" || echo "bracket pattern: DONE"'`, expect: [R`plain pattern: RUNNING`, R`bracket pattern: DONE`] },
        ],
      },
      {
        cmd: "نسخة تجربة جنب الإنتاج",
        title: "شغّل نسخة تجربة على نفس السيرفر مبتبعتش إيميلات ولا بتدفع ولا بتلمس داتا الإنتاج",
        learn: R`تشغّل نسخة تانية من نفس الـ compose باسم مشروع تاني، ومفاتيح فاضية، وبورتات و volumes تانية، وتثبت إنها معزولة قبل ما تقوم.`,
        out: R`[[shop-test-*]] شغالين جنب [[shop-*]]، و [[SMTP_PASS=]] و [[PAYMENT_KEY=]] فاضيين جوه الـ test، والإنتاج ملمسهوش.`,
        desc: R`عايز تجرّب نسخة جديدة أو داتا منقولة على نفس السيرفر قبل ما تبدّل. لو شغّلت نفس الـ compose بنفس الـ [[.env]]، النسخة التانية هتبعت إيميلات حقيقية للعملاء، وتشغّل الـ cron مرتين، وممكن تكتب في داتابيز الإنتاج، أو تعيد عمل containers الإنتاج نفسها.

العزل ليه ٤ حاجات، وكل واحدة ليها فخ: **اسم مشروع تاني** ([[-p shop-test]]) وإلا compose بيعدّل containers الإنتاج، و **[[test.env]]** فيه المفاتيح اللي بتوصل لبره فاضية و [[DATABASE_URL]] لداتابيز التجربة (و [[--env-file]] مش بيعمل ده)، و **بورتات تانية** على [[127.0.0.1]] بـ [[!override]] و [[!reset]]، و **volumes تانية** لأن الـ volume الـ [[external]] اسمه ثابت ومشترك بين المشاريع. وقبل أي [[up]]: [[config]] و [[--dry-run]].`,
        example: R`# ١) إيه اللي في .env؟ الأسامي بس، من غير القيم
grep -vE "^\s*#|^\s*$" .env | cut -d= -f1 | tr "\n" " "
# ٢) فيه مهام مجدولة أو حاجة بتبعت لبره؟
grep -rnE "node-cron|cron\.schedule|setInterval|bull|nodemailer|sendMail|stripe" --include=*.js --exclude-dir=node_modules .
# ٣) test.env: اللي بيوصل لبره فاضي، والداتابيز بتاعة التجربة
sed -E -e "s/^(SMTP_HOST|SMTP_PASS|PAYMENT_KEY)=.*/\1=/" -e "s#^DATABASE_URL=.*#DATABASE_URL=postgres://shop_test:CHANGE_ME@db-test:5432/shop_test#" .env > test.env
# ٤) شوف الناتج المدموج والخطة قبل ما تشغّل
docker compose -p shop-test -f compose.yml -f test.yml config | grep -E "SMTP|PAYMENT|DATABASE|published|source"
docker compose --dry-run -p shop-test -f compose.yml -f test.yml up -d --no-build
docker compose -p shop-test -f compose.yml -f test.yml up -d --no-build`,
        lines: [
          R`[[grep -vE "^\s*#|^\s*$"]] بيشيل التعليقات والسطور الفاضية، و [[cut -d= -f1]] بياخد اللي قبل أول [[=]] (الاسم)، و [[tr "\n" " "]] بيحطهم في سطر واحد. كده تعرف فيه إيه من غير ما سر يظهر على الشاشة أو في الشات.`,
          R`[[grep -rnE]] بيدوّر في كل الملفات ([[-r]]) ويطبع رقم السطر ([[-n]]) على أي حاجة بتشتغل لوحدها (cron و [[setInterval]] و queues زي bull) أو بتبعت لبره (إيميل، ودفع). و [[--include=*.js]] ملفات JS بس، و [[--exclude-dir=node_modules]] من غير المكتبات.`,
          R`[[sed -E]] بتعبيرين ([[-e]] لكل واحد): الأول بيمسح القيمة بعد [[=]] للمفاتيح التلاتة ([[\1]] = اسم المفتاح اللي اتمسك في القوسين)، والتاني بيحط [[DATABASE_URL]] جديد. استخدمنا [[#]] كفاصل بدل [[/]] عشان الـ URL فيه [[/]]. والناتج في ملف جديد، والـ [[.env]] الأصلي مبيتلمسش.`,
          R`[[-p shop-test]] اسم مشروع تاني، فكل container و network و volume بيبدأ بـ [[shop-test]]. و [[config]] بيطبع النتيجة بعد دمج [[compose.yml]] و [[test.yml]]، و [[grep]] بيطلّع المفاتيح والبورتات ومصادر الـ volumes بس عشان تراجعهم.`,
          R`[[--dry-run]] بيقولك compose **هيعمل إيه** (يعمل، ولا يعيد عمل، ولا يسيب) من غير ما يعمل حاجة. لو لقيت اسم container من الإنتاج في الناتج يبقى فيه غلط.`,
          R`التشغيل الحقيقي. [[--no-build]] عشان نجرّب نفس الصور اللي في الإنتاج أو اللي نقلناها.`,
        ],
        try: R`في المعمل على [[new-vps]] اعمل [[test.env]] و [[test.yml]]. قبل التشغيل جرّب ٣ غلطات واقرا ناتجها من غير ما تشغّل: (١) [[--env-file test.env]] بس، (٢) من غير [[-p]] مع [[--dry-run]]، (٣) [[test.yml]] من غير [[!override]] و [[!reset]]. وبعدين شغّل الصح واثبت إن [[shop-web-1]] الـ uptime بتاعه متغيّرش.`,
        teach: R`## الحالة

بعد ما نقلنا الداتا للسيرفر الجديد (أو قبل نسخة جديدة من التطبيق)، عايزين نجرّبها على نفس السيرفر، جنب الإنتاج، من غير ما الزوار يحسّوا ومن غير ما العملاء ياخدوا إيميل «عرض اليوم» مرتين. كل الأوامر هنا على [[new-vps]] في [[/opt/shop]].

---

## ١. اعرف إيه اللي ممكن يوصل لبره

~~~text grep -vE "^\s*#|^\s*$" .env | cut -d= -f1 | tr "\n" " "
DATABASE_URL SMTP_HOST SMTP_PASS PAYMENT_KEY NODE_ENV
~~~

~~~text grep -rnE "node-cron|cron\.schedule|setInterval|bull|nodemailer|sendMail|stripe" --include=*.js --exclude-dir=node_modules .
./api/src/jobs.js:1:const cron = require("node-cron");
./api/src/jobs.js:3:cron.schedule("0 9 * * *", () => mailer.sendDailyOffers());
~~~

يعني: فيه مهمة كل يوم الساعة ٩ بتبعت عروض. لو النسخة التانية قامت بنفس الإعدادات، العملاء هياخدوها مرتين. ومفاتيح بتوصل لبره: [[SMTP_*]] (إيميل) و [[PAYMENT_KEY]] (دفع). و [[DATABASE_URL]] بيقول التطبيق بيكلّم أنهي داتابيز. ولو عايز تشوفه من غير الباسورد:

~~~text docker exec shop-api-1 sh -c 'echo $DATABASE_URL' | sed -E 's#//([^:/@]+):[^@]*@#//\1:***@#'
postgres://shop:***@db:5432/shop
~~~

([[sed]] ده بيمسك اليوزر في [[\1]] ويبدّل الباسورد بـ [[***]]؛ تفاصيله في الدرس الجاي.) ولو طلع إن التطبيق بيكلّم داتابيز سحابي مش اللي على السيرفر، النسخة التجريبية هتكتب فيه هو. اعرف ده قبل أي حاجة.

---

## ٢. [[test.env]]

~~~text cat test.env
DATABASE_URL=postgres://shop_test:CHANGE_ME@db-test:5432/shop_test
SMTP_HOST=
SMTP_PASS=
PAYMENT_KEY=
# comment

NODE_ENV=production
~~~

المفاتيح الفاضية معناها إن التطبيق لو حاول يبعت هيفشل (وده المطلوب). بس اعرف تطبيقك بيعمل إيه لو [[SMTP_HOST]] فاضي: ممكن يقع وهو بيقوم. البديل الأحسن لو هتجرّب الإيميلات نفسها: SMTP وهمي بيستقبل وميبعتش (زي Mailpit، من وثائقه) و [[SMTP_HOST]] يشاور عليه، ومفتاح دفع من نوع test من لوحة شركة الدفع.

---

## ٣. فخ: [[--env-file]] مش هو اللي التطبيق بيقراه

أول فكرة: [[docker compose --env-file test.env up]]. شوفنا بـ [[config]]:

~~~text docker compose -p shop-test --env-file test.env -f compose.yml config | grep -E "SMTP_PASS|PAYMENT_KEY"
      PAYMENT_KEY: <value from .env>
      SMTP_PASS: <value from .env>
~~~

(خبّينا القيم بـ [[sed]]، بس هي القيم الحقيقية من [[.env]].) [[--env-file]] بيغيّر المتغيرات اللي compose بيستخدمها **جوه ملف compose نفسه** (زي [[$__{TAG}]])، لكن [[env_file: .env]] اللي جوه الـ service بيتقري زي ما هو. فلازم نغيّر [[env_file]] نفسه في ملف override.

---

## ٤. [[test.yml]]: ليه [[!override]] و [[!reset]]

~~~yaml test.yml
services:
  web:
    ports: !override ["127.0.0.1:18080:80"]
  api:
    ports: !reset []
    env_file: !override [test.env]
    volumes: !override ["test_data:/data"]
volumes:
  test_data: {}
~~~

جرّبنا نفس الملف **من غير** الـ tags (يعني [[ports: []]] و [[ports: ["127.0.0.1:18080:80"]]] عادي):

~~~text config من غير الـ tags (السطور المهمة)
      SMTP_PASS: ""
        published: "5000"
        source: test_data
        published: "8080"
        host_ip: 127.0.0.1
        published: "18080"
~~~

- [[api]]: [[ports: []]] عادي اتجاهل، ولسه [[5000]]: هيتخانق مع الإنتاج على نفس البورت.
- [[web]]: البورتين اتجمعوا [[8080]] و [[18080]]: برضه خناقة على 8080.
- [[env_file]] و [[volumes]] اشتغلوا من غير tags (الـ env_file بيتجمع والملف التاني بيكسب في نفس المفتاح، والـ volumes بتتدمج بمكان التركيب [[/data]]). بس [[!override]] بيخلّي النية واضحة ومبيسيبش مفاتيح من [[.env]] الأصلي.

فـ [[!reset []]] = شيل القايمة خالص (الـ api مش محتاجة بورت؛ الـ web بيكلّمها جوه الشبكة)، و [[!override [...]]] = دي القايمة كلها.

---

## ٥. فخ الـ volume الـ external

~~~text docker compose -p shop-test -f compose.yml config | sed -n "/^volumes:/,\$p"
volumes:
  shop_data:
    name: shop_data
    external: true
~~~

الـ volumes العادية بتاخد اسم المشروع ([[shop-test_test_data]])، لكن الـ [[external]] اسمه ثابت [[shop_data]] في أي مشروع. يعني من غير الـ override، النسخة التجريبية كانت هتركب **volume الإنتاج نفسه** وتكتب فيه. ونفس الكلام لأي bind mount ([[./uploads]] بيتحول لمسار كامل [[/opt/shop/uploads]]): عندنا هو [[:ro]] فمفيش مشكلة، لو مكانش لازم يتغيّر هو كمان.

---

## ٦. فخ: نسيت [[-p]]

~~~text docker compose --dry-run -f compose.yml -f test.yml up -d --no-build
 DRY-RUN MODE -  Container shop-web-1  Recreated
 DRY-RUN MODE -  Container shop-api-1  Recreated
~~~

من غير [[-p]]، اسم المشروع = اسم الفولدر = [[shop]] = الإنتاج. فـ compose كان هيعيد عمل containers الإنتاج نفسها بإعدادات التجربة: الموقع الحقيقي يشتغل من غير إيميلات ومن غير دفع، وعلى volume فاضي. [[--dry-run]] (compose 2.18 وأحدث) كشفها من غير ضرر.

---

## ٧. شغّل، واتأكد

~~~text docker compose -p shop-test -f compose.yml -f test.yml up -d --no-build
 Container shop-test-api-1  Started
 Container shop-test-web-1  Started
~~~

~~~text docker ps --format "{{.Names}}: {{.Ports}}"
shop-test-api-1:
shop-test-web-1: 127.0.0.1:18080->80/tcp
shop-web-1: 127.0.0.1:8080->80/tcp
shop-api-1: 127.0.0.1:5000->5000/tcp
~~~

~~~text docker exec shop-test-api-1 env | grep -E "^(SMTP|PAYMENT|DATABASE)" | sed -E "s#//([^:/@]+):[^@]*@#//\1:***@#"
DATABASE_URL=postgres://shop_test:***@db-test:5432/shop_test
SMTP_HOST=
SMTP_PASS=
PAYMENT_KEY=
~~~

~~~text الناتج
docker network ls   ->  shop-test_default , shop_default
docker inspect shop-test-api-1 (Mounts)   ->  shop-test_test_data -> /data
curl -s localhost:18080 | grep banner     ->  <p class="banner">Free shipping over 500</p>
~~~

شبكة لوحدها، و volume لوحده، وبورت على [[127.0.0.1]] بس. ولو عايز تشوفها من جهازك: [[ssh -L 18080:127.0.0.1:18080 new]] وافتح [[http://localhost:18080]] (درس الـ tunnels في تاب ssh). ولما تخلص: [[docker compose -p shop-test down -v]] (الـ [[-v]] بيمسح volumes المشروع ده بس، يعني [[shop-test_test_data]]؛ والـ external مبيتمسحش أبدًا).

---

## الطرق اللي اترفضت

| الطريقة | ليه لأ |
|---|---|
| [[docker compose up]] على السيرفر الجديد بنفس [[.env]] | إيميلات و cron مكررة للعملاء، وكتابة في نفس الداتابيز |
| [[--env-file test.env]] بس | بيغيّر متغيرات ملف compose، مش [[env_file]] اللي جوه الـ service |
| نسخة فولدر [[/opt/shop-test]] بـ compose متعدّل | بتنسى تحدّثه، وبتعدّل في نسختين؛ والـ override بيوري الفرق بس |
| override من غير [[!override]] و [[!reset]] | البورتات بتتجمع وتتخانق مع الإنتاج |
| من غير [[-p]] | بيعيد عمل containers الإنتاج |

---

## الخلاصة

| الخطوة | إزاي |
|---|---|
| الأسامي من غير القيم | [[grep -vE]] للتعليقات وبعدين [[cut -d= -f1]] |
| مفاتيح فاضية | [[sed -E]] بيمسح القيمة بعد [[=]] في ملف جديد، والأصلي زي ما هو |
| اسم مشروع | [[-p shop-test]] في كل أمر |
| بورتات | [[!override]] لـ [[127.0.0.1:<port تاني>]]، و [[!reset []]] للي مش محتاج |
| volumes | [[!override]] لـ volume جديد، والـ external اسمه مشترك |
| قبل التشغيل | [[config]] و [[--dry-run]] |`,
        deep: {
          why: R`أغلب مشاكل «نسخة التجربة» مش في التجربة نفسها، في اللي بيوصل لبره منها: إيميل للعميل، أو عملية دفع، أو كتابة في داتا حقيقية، أو container إنتاج اتعاد عمله. وكلها بتحصل بصمت، وبتتكشف من عميل بيشتكي.`,
          how: R`compose بيسمّي كل حاجة بـ [[<project>-<service>-<n>]]، واسم المشروع من [[-p]] أو [[name:]] في الملف أو اسم الفولدر. ولما تشغّل [[up]]، بيدوّر على containers عليها label بنفس اسم المشروع والـ service ويقارن، فنفس الاسم = نفس الـ containers. ولما تدّيه أكتر من [[-f]]، بيدمج بقواعد: القيم المفردة الملف التاني بيكسب، والقوايم زي [[ports]] بتتجمع، و [[volumes]] بتتدمج بمكان التركيب، إلا لو [[!override]] (استبدل) أو [[!reset]] (امسح). و [[--env-file]] بيتقري قبل الدمج عشان يعوّض [[$__{VAR}]] في الملفات، أما [[env_file:]] فبيتقري لما الـ container يتعمل ويتحط في الـ environment بتاعه.`,
          when: R`تجربة داتا منقولة قبل التحويل، أو نسخة جديدة من التطبيق قبل التبديل، أو استنساخ مشكلة بتحصل على الإنتاج بس. ولو التجربة هتطول أو هتتكرر، مكانها سيرفر staging لوحده.`,
          mistakes: R`[[--env-file]] وتفتكر إنه غيّر الـ env. تنسى [[-p]] في أمر واحد (زي [[logs]] أو [[down]]) فيشتغل على الإنتاج. تعمل [[down -v]] من غير [[-p]]. override من غير [[!override]] على البورتات. تنسى إن الـ external volume مشترك. تسيب [[DATABASE_URL]] زي ما هو. تفضّي [[SMTP_PASS]] وتسيب [[SMTP_HOST]] على سيرفر مبيطلبش باسورد. وتطبع [[docker compose config]] كله في شات فيه الأسرار.`,
        },
        sol: R`(١) [[--env-file test.env]] بس: [[config]] لسه فيه [[SMTP_PASS]] و [[PAYMENT_KEY]] بقيمهم من [[.env]]. (٢) من غير [[-p]]: [[--dry-run]] بيقول [[Container shop-web-1  Recreated]] و [[shop-api-1  Recreated]]. (٣) من غير الـ tags: [[published: "5000"]] لسه على الـ api، والـ web فيه [[8080]] و [[18080]].

الصح: [[shop-test-api-1]] من غير بورتات، و [[shop-test-web-1]] على [[127.0.0.1:18080]]، و [[env]] جواه [[SMTP_PASS=]] و [[PAYMENT_KEY=]] فاضيين، والـ volume [[shop-test_test_data]]، و [[docker ps]] لسه فيه [[shop-web-1]] و [[shop-api-1]] بنفس الـ uptime.`,
        practice: [
          { lvl: 'سريع', t: R`من غير ما تشغّل: لو المشروع في فولدر [[/opt/shop]] وشغّلت [[docker compose -f compose.yml -f test.yml down -v]] من غير [[-p]]، هيمسح إيه؟ وهل [[shop_data]] (external) هيتمسح؟`, done: R`كتبت إنه هيوقف ويمسح containers الإنتاج ([[shop-web-1]] و [[shop-api-1]]) والـ volumes العادية بتاعة مشروع [[shop]]، وإن الـ external مبيتمسحش، وعرفت إزاي تتأكد من غير ما تجرّب على الإنتاج (معمل، أو [[--dry-run]]).` },
          { lvl: 'تطبيق', t: R`بيانات حقيقية الشكل: اعمل [[.env]] فيه ١٠ مفاتيح (منها [[STRIPE_SECRET_KEY]] و [[SENDGRID_API_KEY]] و [[TWILIO_AUTH_TOKEN]] و [[REDIS_URL]] و [[S3_BUCKET]]). اكتب أمر [[sed]] واحد بيفضّي كل اللي بيوصل لبره بس، واطبع أسامي المفاتيح اللي اتفضّت.`, done: R`الناتج فيه المفاتيح الخارجية فاضية و [[REDIS_URL]] و [[S3_BUCKET]] متغيّرين لقيم تجربة (أو مكتوب ليه سبتهم)، و [[grep -c '=$' test.env]] بيساوي عدد اللي قصدته، والملف الأصلي متغيّرش ([[sha256sum]]).` },
          { lvl: 'تطبيق', t: R`صلّح ملف override ده: [[services: { web: { ports: ["127.0.0.1:18080:80"] }, api: { env_file: [test.env] } }]] والتشغيل [[docker compose --env-file test.env -f compose.yml -f test.yml up -d]]. فيه ٤ مشاكل.`, done: R`نسختك فيها [[!override]] على بورتات الـ web، و [[!reset []]] على بورتات الـ api، و volume تاني للـ api، و [[-p shop-test]] بدل [[--env-file]]، و [[config]] بيأكد كل واحدة.` },
          { lvl: 'تطبيق', t: R`اكتب اختبار عزل [[check-test-copy.sh]]: بيشغّل [[docker compose -p shop-test ... config]] ويفشل لو لقى أي واحدة من دول: [[name: shop_data]]، أو [[published: "8080"]] أو [["5000"]]، أو مفتاح [[SMTP_PASS]] أو [[PAYMENT_KEY]] قيمته مش فاضية.`, done: R`على [[test.yml]] الصح بيطبع [[OK]] ويخرج بـ 0، ولو شلت أي [[!override]] أو رجّعت قيمة مفتاح بيطبع السبب ويخرج بـ 1.` },
          { lvl: 'تحدي', t: R`دوّر بنفسك: من [[docker compose --help]] ووثائق compose، إيه الفرق بين [[-p]] و [[name:]] في أول الملف و [[COMPOSE_PROJECT_NAME]]؟ وأنهي بيكسب لو الاتنين موجودين؟ جرّب بـ [[docker compose ls]].`, done: R`كتبت الترتيب (الـ [[-p]] بيكسب على المتغير، والمتغير على [[name:]]، والكل على اسم الفولدر) أو اللي لقيته فعلًا، وعندك ناتج [[docker compose ls]] لكل حالة.` },
          { lvl: 'تحدي', t: R`اشرحها لزميل في ٤ سطور: ليه الـ volume اللي اسمه [[test_data]] بقى [[shop-test_test_data]]، و [[shop_data]] فضل [[shop_data]]؟ وده معناه إيه لنسخة التجربة؟`, done: R`الشرح فيه: الـ volumes العادية بتاخد اسم المشروع كبداية، والـ [[external]] (أو اللي ليه [[name:]]) اسمه ثابت، فنسختين بمشروعين مختلفين بيشاركوه، فلازم override.` },
        ],
        ci: [
          { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`printf 'DATABASE_URL=postgres://shop:S3cr3t-lab@db:5432/shop\nSMTP_HOST=smtp.mail.example\nSMTP_PASS=lab-smtp-pass\nPAYMENT_KEY=sk_test_lab123\n# comment\n\nNODE_ENV=production\n' > .env
echo "names: $(grep -vE '^ *#|^ *$' .env | cut -d= -f1 | tr '\n' ' ')"
sed -E -e 's/^(SMTP_HOST|SMTP_PASS|PAYMENT_KEY)=.*/\1=/' -e 's#^DATABASE_URL=.*#DATABASE_URL=postgres://shop_test:CHANGE_ME@db-test:5432/shop_test#' .env > test.env
echo "blank keys: $(grep -c '=$' test.env)"
grep -qE 'S3cr3t|lab-smtp|sk_test' test.env && echo "SECRET LEFT" || echo "no secrets left in test.env"
grep -q 'lab-smtp-pass' .env && echo "original .env untouched"`, expect: [R`names: DATABASE_URL SMTP_HOST SMTP_PASS PAYMENT_KEY NODE_ENV`, R`blank keys: 3`, R`no secrets left in test.env`, R`original .env untouched`] },
        ],
      },
      {
        cmd: "أسرار في الجرد واقتباسات متداخلة",
        title: "اجرد سيرفر من غير ما الأسرار تطلع، وشغّل سكربت جوه container من غير ما الاقتباسات تبوّظه",
        learn: R`تطبع إعدادات السيرفر والـ containers والأسرار متخبّية، وتغيّر داتا جوه container بسكربت متنسخ مش [[node -e]] متداخل.`,
        out: R`ناتج الجرد فيه [[SMTP_PASS: ***]] و [[postgres://shop:***@db]]، والتعديل اتعمل بـ [[before:]] و [[after:]] مطبوعين.`,
        desc: R`حالتين بيحصلوا مع بعض في أي شغل على سيرفر: **(١)** وانت بتجرد ([[docker compose config]] و [[docker inspect]] و [[env]]) الأسرار بتتطبع على الشاشة، والشاشة بتتنسخ في شات أو تذكرة أو لوج. الحل إن الأمر نفسه يطبع الأسامي بس أو يخبّي القيم بـ [[sed]]، مش إنك «تاخد بالك». **(٢)** عايز تغيّر قيمة في الداتا من جوه container، فتكتب [[ssh ... "docker exec ... node -e \"...\""]]، والاقتباسات بتتفك مرة على جهازك ومرة على السيرفر ومرة جوه الـ container، فيطلع [[unexpected EOF]] أو [[bad substitution]]. الحل: اكتب السكربت في ملف، وانسخه بـ [[scp]] و [[docker cp]]، وشغّله.

وفي الطريق: [[require is not defined in ES module scope]] لما المشروع فيه [[type: module]] (الحل [[.cjs]])، و ssh جوه حلقة [[while read]] بياكل باقي السطور (الحل [[ssh -n]])، والباسورد على سطر الأمر بيبان في [[ps]].`,
        example: R`# ١) جرد من غير أسرار: القيم متخبّية، أو الأسامي بس
docker compose config | sed -E "s/((PASS|SECRET|KEY|TOKEN)[A-Z_]*: ).+/\1***/; s#//([^:/@]+):[^@]*@#//\1:***@#" | grep -E "PASS|KEY|DATABASE_URL"
docker inspect shop-api-1 --format "{{range .Config.Env}}{{println .}}{{end}}" | cut -d= -f1 | grep -v "^$" | tr "\n" " "
# ٢) تعديل داتا: السكربت في ملف، يتنسخ للسيرفر وللـ container، ويتشغّل
scp fix-plans.cjs new:/tmp/
ssh -n new 'docker cp /tmp/fix-plans.cjs app-backend:/app/ && docker exec app-backend node fix-plans.cjs'
# ٣) أو من غير ملف على السيرفر: السكربت يعدّي على الـ stdin
ssh new "docker exec -i -w /app app-backend node -" < fix-plans.js`,
        lines: [
          R`[[docker compose config]] بيطبع الـ compose بعد ما يملا المتغيرات، يعني فيه كل الأسرار. و [[sed -E]] فيه تعبيرين مفصولين بـ [[;]]: الأول أي مفتاح فيه [[PASS]] أو [[SECRET]] أو [[KEY]] أو [[TOKEN]] وبعده [[: ]] يبدّل قيمته بـ [[***]] ([[\1]] = الاسم والنقطتين)، والتاني أي URL فيه [[//user:password@]] يسيب اليوزر ويخبّي الباسورد. وفي الآخر [[grep]] يورّيك السطور دي بس عشان تتأكد.`,
          R`[[{{range .Config.Env}}{{println .}}{{end}}]] بيطبع كل متغير بيئة في الـ container في سطر، و [[cut -d= -f1]] بياخد الاسم بس، و [[grep -v "^$"]] بيشيل السطر الفاضي، و [[tr]] بيحطهم في سطر واحد.`,
          R`[[scp]] بينسخ السكربت من جهازك لـ [[/tmp]] على السيرفر. السكربت مكتوب في ملف عادي، فمفيش ولا علامة تنصيص محتاجة هروب.`,
          R`[[-n]] بيقول لـ ssh ميقراش من الـ stdin (مهم في السكربتات والحلقات). و [[docker cp]] بينسخ الملف من السيرفر لجوه الـ container، و [[node fix-plans.cjs]] بيشغّله هناك. والأمر كله بين علامات مفردة فمفيش حاجة بتتفك على جهازك.`,
          R`[[node -]] بيقرا الكود من الـ stdin، و [[-i]] في [[docker exec]] بيوصّله، و [[-w /app]] بيشغّله من فولدر التطبيق عشان المسارات النسبية. والملف على جهازك بيعدّي في ssh على طول، من غير ما يتساب على السيرفر.`,
        ],
        try: R`في المعمل: اجرد [[new-vps]] وطلّع ملف واحد فيه كل الإعدادات، و [[grep -E "S3cr3t|sk_test|lab-smtp"]] عليه لازم يطلع فاضي. وبعدين غيّر سعر خطة [[pro]] لـ 950 واسمها لـ [[{ar: "احترافي", en: "Professional"}]] جوه [[app-backend]] بسكربت، واطبع القيمة قبل وبعد، وجرّب ترجع.`,
        teach: R`## الحالة ١: الجرد بيطبع الأسرار

في نقل السيرفر بنطبع إعدادات كتير، وأوقات بنلصقها في شات مع زميل أو مع AI. أول أمر طبيعي:

~~~text docker compose config | grep -E "PASS|KEY|DATABASE_URL"
      DATABASE_URL: postgres://shop:S3cr3t-lab@db:5432/shop
      PAYMENT_KEY: sk_test_lab123
      SMTP_PASS: lab-smtp-pass
~~~

٣ أسرار على الشاشة (مخترعين هنا). لو اتنسخوا لأي مكان، الصح إنك تغيّرهم كلهم. فالقاعدة: **الأمر نفسه يطبع من غير الأسرار**، مش انت اللي تمسحهم بعدين.

### خبّي القيم

~~~text docker compose config | sed -E "s/((PASS|SECRET|KEY|TOKEN)[A-Z_]*: ).+/\1***/; s#//([^:/@]+):[^@]*@#//\1:***@#" | grep -E "PASS|KEY|DATABASE_URL"
      DATABASE_URL: postgres://shop:***@db:5432/shop
      PAYMENT_KEY: ***
      SMTP_PASS: ***
~~~

نفك الـ [[sed]]:

| الحتة | معناها |
|---|---|
| [[(PASS...TOKEN)]] | أي كلمة من الأربعة: [[PASS]] أو [[SECRET]] أو [[KEY]] أو [[TOKEN]]. الخط الرأسي بينهم جوه القوسين معناه «أو» |
| [[[A-Z_]*]] | وبعدها أي حروف كبيرة أو [[_]]، فـ [[SMTP_PASS]] و [[PAYMENT_KEY]] و [[API_KEY_V2]] كلهم يتمسكوا |
| [[: ]] | النقطتين والمسافة اللي compose بيكتبهم قبل القيمة |
| [[.+]] | القيمة كلها لآخر السطر، وده اللي بيتبدّل |
| [[\1***]] | اللي اتمسك في أول قوسين (الاسم والنقطتين) وبعده نجوم |
| [[s#...#...#]] | نفس [[s/.../.../]] بس الفاصل [[#]] لأن الـ URL فيه [[/]] كتير |
| [[//([^:/@]+):[^@]*@]] | [[//]] وبعدها يوزر (أي حاجة مش [[:]] ولا [[/]] ولا [[@]])، و [[:]]، وباسورد لحد [[@]] |

### أو الأسامي بس

~~~text docker inspect shop-api-1 --format "{{range .Config.Env}}{{println .}}{{end}}" | cut -d= -f1 | grep -v "^$" | tr "\n" " "
DATABASE_URL SMTP_HOST SMTP_PASS PAYMENT_KEY NODE_ENV PATH
~~~

~~~text docker exec shop-api-1 env | sed -E "s/^([A-Z_]*(PASS|SECRET|KEY|TOKEN)[A-Z_]*)=.+/\1=***/; s#//([^:/@]+):[^@]*@#//\1:***@#" | grep -E "PASS|KEY|DATABASE"
DATABASE_URL=postgres://shop:***@db:5432/shop
SMTP_PASS=***
PAYMENT_KEY=***
~~~

ونفس الفكرة لملف [[.env]]: [[grep -vE "^\s*#|^\s*$" .env | cut -d= -f1]] (الدرس اللي فات). وخلي بالك إن الـ regex بيمسك الأسامي اللي تعرفها؛ مفتاح اسمه [[STRIPE_SK]] مش هيتمسك. فلما الشك يبقى كبير، اطبع الأسامي بس.

### الباسورد على سطر الأمر بيبان

ده كان أسلوب الـ dump في درس «dump و restore»: [[mongodump -u "$USER" -p "$PASS"]]. المتغير بيتفك قبل التشغيل، فالقيمة نفسها بتبقى جزء من سطر الأمر. وأثناء dump في المعمل، من بره الـ container:

~~~text docker top old-mongo -eo pid,args
46756               mongodump -u root -p lab-mongo-pass --authenticationDatabase admin --archive=/tmp/x.gz --gzip
~~~

أي حد يقدر يشغّل [[ps]] أو [[docker top]] على السيرفر شايفه. البديل اللي جرّبناه: الباسورد في ملف صلاحياته ليك بس، و [[mongodump]] يقراه:

~~~bash
umask 077; printf "password: %s\n" "$MONGO_INITDB_ROOT_PASSWORD" > /tmp/dump.yaml
mongodump -u "$MONGO_INITDB_ROOT_USERNAME" --config=/tmp/dump.yaml --authenticationDatabase admin --archive=/tmp/x.gz --gzip
rm -f /tmp/dump.yaml
~~~

- [[umask 077]] أي ملف يتعمل بعدها صلاحياته [[rw-------]] (اتأكدنا: [[-rw------- 1 root root 25]]).
- [[--config]] ملف YAML فيه [[password:]] (mongodump 100.17 في المعمل؛ الخيار موجود من 100.3 حسب الوثائق).
- و [[printf]] أمر جوه الـ shell (builtin)، فمش بيظهر كـ process لوحده في [[ps]].

ولـ Postgres جوه الصورة الرسمية مفيش باسورد أصلًا على الـ socket المحلي، ولو محتاجه من بره: ملف [[~/.pgpass]] بصلاحيات [[600]] (من وثائق PostgreSQL).

---

## الحالة ٢: تغيير داتا من جوه container

الـ backend في container اسمه [[app-backend]] (Node 22، و [[package.json]] فيه [[{"type":"module"}]])، والخطط في [[data/plans.json]] (في مشروع حقيقي دي جداول وبتتعدّل بـ Prisma أو ORM تاني، والفكرة هي هي). المطلوب: خطة [[pro]] سعرها يبقى 950، واسمها يبقى [[{ar: "احترافي", en: "Professional"}]]. ومفيش لوحة أدمن.

### المحاولة الأولى: سطر واحد

~~~bash
ssh new "docker exec app-backend node -e \"const p=JSON.parse(require('fs').readFileSync('data/plans.json','utf8')); console.log(p.plans.map(x=>x.id+'='+x.price).join(' '))\""
~~~

~~~text الناتج
basic=500 pro=900
~~~

اشتغلت. بس دي قراية بس، وفيها ٣ مستويات اقتباس: [["]] للسيرفر، و [[\"]] لـ node، و [[']] جوه الـ JS. أول ما نزوّد حاجة:

~~~text مع template literal فيه $
bash: line 1: docker exec app-backend node -e "...console.log(\$__bt$__{x.id}: $__{x.price}\$__bt)": bad substitution
~~~

[[$__{x.id}]] جوه علامات مزدوجة: bash على جهازك حاول يفكه كمتغير، و [[x.id]] مش اسم متغير صالح، فـ [[bad substitution]]، والأمر موصلش للسيرفر أصلًا.

~~~text لما النص نفسه فيه '
ssh -n new "docker exec app-backend node -e 'console.log(\"plan: it's done\")'"
bash: -c: line 1: unexpected EOF while looking for matching $__bt"'
~~~

دي من السيرفر ([[bash: -c]] = الـ bash اللي ssh شغّله هناك): الـ [[']] في [[it's]] قفلت الـ [[']] اللي قبلها، والباقي بقى مش متوازن. ونفس الحاجة بعلامات مفردة:

~~~text ssh -n new "docker exec app-backend sh -c 'echo it's done'"
bash: -c: line 1: unexpected EOF while looking for matching $__bt''
~~~

وعلى جهازك ممكن تطلع قبل ما توصل: [[syntax error near unexpected token $__bt('']]. كل مستوى بيفك علاماته ويبعت الباقي للي بعده، وانت بتحاول تحسب في دماغك كام [[\]] محتاج. الحل إنك متحسبش.

### الحل: ملف، و [[scp]]، و [[docker cp]]

~~~js fix-plans.js
// fix-plans: change one plan, print the old value first so we can undo
const fs = require("fs");
const FILE = "data/plans.json";
const ID = "pro";
const NEW = { title: { ar: "احترافي", en: "Professional" }, price: 950 };

const data = JSON.parse(fs.readFileSync(FILE, "utf8"));
const plan = data.plans.find(p => p.id === ID);
if (!plan) { console.error($__btplan $__{ID} not found, nothing changed$__bt); process.exit(1); }
console.log("before:", JSON.stringify(plan));
fs.writeFileSync(FILE + ".bak", JSON.stringify(data, null, 2));
Object.assign(plan, NEW);
fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
const check = JSON.parse(fs.readFileSync(FILE, "utf8")).plans.find(p => p.id === ID);
console.log("after: ", JSON.stringify(check));
~~~

- بيطبع القيمة القديمة **قبل** ما يغيّر ([[before:]]): لو احتجت ترجع بإيدك، القيمة قدامك.
- لو الخطة مش موجودة بيقف ومبيكتبش حاجة.
- [[title]] بيتحط كله ([[{ar, en}]] مع بعض)، مش حقل واحد، عشان قيمة JSON متتكسرش لنص.
- بيقرا الملف تاني بعد الكتابة ويطبع ([[after:]]): الدليل إن اللي اتكتب هو اللي قصدته.

~~~text scp fix-plans.js new:/tmp/ && ssh -n new 'docker cp /tmp/fix-plans.js app-backend:/app/ && docker exec app-backend node fix-plans.js'
file:///app/fix-plans.js:2
const fs = require("fs");
           ^

ReferenceError: require is not defined in ES module scope, you can use import instead
This file is being treated as an ES module because it has a '.js' file extension and '/app/package.json' contains "type": "module". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.
~~~

الرسالة قالت الحل بنفسها: [[package.json]] فيه [[type: module]]، فأي [[.js]] في الفولدر ده بيتعامل كـ ES module، و [[require]] مش موجود فيه. [[.cjs]] = CommonJS دايمًا مهما كان [[package.json]] (و [[.mjs]] = ES module دايمًا). درس «الامتداد» في تاب files فيه ليه الامتداد بيغيّر المعنى.

~~~text cp fix-plans.js fix-plans.cjs && scp fix-plans.cjs new:/tmp/ && ssh -n new '... node fix-plans.cjs'
before: {"id":"pro","title":{"ar":"برو","en":"Pro"},"price":900}
after:  {"id":"pro","title":{"ar":"احترافي","en":"Professional"},"price":950}
exit=0
~~~

### من غير ملف على السيرفر: [[node -]]

~~~text ssh new "docker exec -i -w /app app-backend node -" < fix-plans.js
before: {"id":"pro","title":{"ar":"احترافي","en":"Professional"},"price":950}
after:  {"id":"pro","title":{"ar":"احترافي","en":"Professional"},"price":950}
~~~

[[node -]] بيقرا الكود من الـ stdin وبيعامله CommonJS فـ [[require]] اشتغل حتى بامتداد [[.js]] على جهازك. ولاحظ: ده **تاني تشغيل**، فـ [[before]] هو القيمة الجديدة. والفخ: الـ [[.bak]] اتكتب تاني بالقيمة الجديدة، فالنسخة الأصلية ([[900]]) ضاعت من السيرفر (فضلت في الناتج اللي طبعناه أول مرة بس). الحل: اسم [[.bak]] فيه الوقت، أو السكربت يرفض يكتب لو [[.bak]] موجود.

### فخ: ssh بياكل الـ stdin

ده ظهر وإحنا بنجرّب: سكربت فيه كذا أمر ssh ورا بعض، اتشغّل بـ [[bash -s < script]]، وأول ssh بس اللي اشتغل والباقي اختفى من غير خطأ. أوضح شكل ليه:

~~~text printf 'dbold\ndbnew\n' > hosts.txt; while read h; do echo "$h: $(ssh $h hostname)"; done < hosts.txt
dbold: old-vps
~~~

~~~text نفس الحلقة بـ ssh -n
dbold: old-vps
dbnew: new-vps
~~~

ssh من غير [[-n]] بيقرا الـ stdin عشان يبعته للأمر اللي على السيرفر، فبلع باقي [[hosts.txt]] (أو باقي السكربت). [[-n]] = الـ stdin من [[/dev/null]]. وفي الأمر اللي فيه [[< fix-plans.js]] متحطّش [[-n]]: هناك إحنا عايزين الـ stdin يوصل.

---

## الطرق اللي اترفضت

| الطريقة | ليه لأ |
|---|---|
| تطبع الإعدادات وتمسح الأسرار بإيدك قبل ما تلصق | بتنسى واحد، والشاشة نفسها اتسجلت في لوج أو history |
| [[node -e]] جوه [[docker exec]] جوه ssh | ٣ مستويات اقتباس، وأي [[$]] أو [[']] في الداتا بيبوّظه |
| heredoc جوه [[ssh "bash -c '...'"]] | نفس المشكلة: الـ heredoc نفسه جوه علامات |
| تعديل [[plans.json]] بـ [[sed]] | JSON مش سطور، و [[{ar,en}]] ممكن يتكسر |
| تعديل [[package.json]] وتشيل [[type: module]] | بيغيّر طريقة تشغيل التطبيق كله عشان سكربت واحد |

---

## اتأكد، ومتتكررش

- قبل ما تلصق أي ناتج: [[grep -E "<أول ٤ حروف من كل سر>"]] عليه، أو اطبع الأسامي بس من الأول.
- أي سكربت بيغيّر داتا: بيطبع قبل وبعد، وبيقف لو الافتراض غلط، وبيتشغّل مرتين من غير ضرر.
- السكربتات اللي بتلف على سيرفرات: [[ssh -n]] جوه أي حلقة.
- ولو سر اتطبع في مكان مش آمن: غيّره (rotate)، المسح من الشات مش كفاية.

## الخلاصة

| المشكلة | الحل |
|---|---|
| أسرار في [[config]] و [[env]] | [[sed -E]] يخبّي القيم، أو [[cut -d= -f1]] للأسامي |
| باسورد في سطر الأمر | ملف [[--config]] بـ [[umask 077]] |
| اقتباسات متداخلة | ملف و [[scp]] و [[docker cp]]، أو [[node -]] على الـ stdin |
| [[require is not defined]] | [[.cjs]] |
| ssh بياكل السطور | [[ssh -n]] |`,
        deep: {
          why: R`الأسرار بتتسرّب غالبًا مش من اختراق، من شاشة اتنسخت: ناتج [[config]] في تذكرة، أو لوج CI، أو شات. ولو الأمر نفسه مبيطبعهاش، المشكلة مبتحصلش. والاقتباسات المتداخلة بتضيّع وقت وبتعمل حاجة أخطر من الخطأ: أوقات الأمر بيشتغل بقيمة غلط من غير خطأ (متغير فاضي)، وده اللي حصل في الـ dump.`,
          how: R`كل shell بيقرا الأمر ويفك حاجتين قبل ما يشغّله: علامات التنصيص، والمتغيرات و [[$(...)]] جوه العلامات المزدوجة. ssh بيبعت الأمر كنص للسيرفر، و sshd بيشغّله بـ [[bash -c]]، فـ bash هناك بيفك تاني. و [[docker exec ... sh -c]] تالت مرة. فالعلامة اللي محتاجة توصل للـ container لازم تعدّي سليمة من مستويين قبله. الملف بيكسر السلسلة دي لأن محتواه مبيعدّيش على أي shell. و [[docker cp]] بيكتب الملف في الـ filesystem بتاع الـ container مباشرة. و Node بيحدد نوع الملف بالامتداد الأول ([[.cjs]] و [[.mjs]])، ولو [[.js]] بيبص على أقرب [[package.json]] وحقل [[type]] فيه. و [[node -]] بيعامل الـ stdin كـ CommonJS إلا لو [[--input-type=module]]. و ssh من غير [[-n]] بيفتح الـ stdin بتاعه كقناة للسيرفر ويقرا منه كل اللي يقدر عليه.`,
          when: R`أي جرد أو تشخيص بتشاركه مع حد، وأي تعديل داتا «مرة واحدة» على الإنتاج (تصليح سعر، أو مستخدم، أو إعداد)، وأي سكربت بيلف على أكتر من سيرفر.`,
          mistakes: R`[[docker compose config]] كامل في شات. [[docker inspect]] من غير [[--format]] (فيه [[Env]] كله). regex بيخبّي [[PASSWORD]] وينسى [[DB_PASS]] أو URL فيه باسورد. [[-p password]] على سطر الأمر. [[node -e]] متداخل. [[require]] في [[.js]] جوه مشروع [[type: module]]. سكربت تعديل مبيطبعش القديم. [[.bak]] بيتكتب فوقه في التشغيل التاني. ssh من غير [[-n]] في [[while read]].`,
        },
        sol: R`الجرد: [[DATABASE_URL: postgres://shop:***@db:5432/shop]] و [[PAYMENT_KEY: ***]] و [[SMTP_PASS: ***]]، و [[grep -E "S3cr3t|sk_test|lab-smtp"]] على الملف مبيطلّعش حاجة.

التعديل: [[node fix-plans.js]] وقع بـ [[ReferenceError: require is not defined in ES module scope]]، و [[fix-plans.cjs]] طبع [[before: {"id":"pro","title":{"ar":"برو","en":"Pro"},"price":900}]] و [[after:  {"id":"pro","title":{"ar":"احترافي","en":"Professional"},"price":950}]]. والرجوع: [[cp data/plans.json.bak data/plans.json]] جوه الـ container، بشرط إن الـ [[.bak]] متكتبش فوقه في تشغيل تاني (اللي حصل فعلًا مع [[node -]]).`,
        solCode: R`scp fix-plans.cjs new:/tmp/
ssh -n new 'docker cp /tmp/fix-plans.cjs app-backend:/app/ && docker exec app-backend node fix-plans.cjs'`,
        practice: [
          { lvl: 'سريع', t: R`اقرا وتوقّع: إيه اللي هيطبعه كل واحد على جهازك لو [[X]] مش متعرّف عندك ومتعرّف على السيرفر بـ [[X=server]]: [[ssh new "echo $X"]]، و [[ssh new 'echo $X']]، و [[ssh new "echo \$X"]]. وبعدين جرّب في المعمل (عرّف [[X]] في [[~/.bashrc]] على السيرفر قبل سطر [[return]] لو موجود).`, done: R`توقعت سطر فاضي للأول و [[server]] للتاني والتالت، والتجربة طابقت (أو لقيت السبب لو الـ bashrc مبيتقراش في الأوامر غير التفاعلية).` },
          { lvl: 'تطبيق', t: R`ابني [[mask.sh]]: بيقرا من الـ stdin ويخبّي: قيم أي مفتاح فيه [[PASS]] أو [[SECRET]] أو [[KEY]] أو [[TOKEN]] (بشكل [[NAME=value]] وبشكل [[NAME: value]])، والباسورد في أي URL. جرّبه على [[docker compose config]] و [[env]] و [[.env]].`, done: R`الـ ٣ مصادر بعد [[mask.sh]] مفيهمش [[S3cr3t-lab]] ولا [[sk_test_lab123]] ولا [[lab-smtp-pass]] ([[grep -c]] = 0)، والأسامي لسه ظاهرة.` },
          { lvl: 'تطبيق', t: R`صلّح الأمر ده من غير ما تحسب علامات: [[ssh new "docker exec app-backend node -e \"require('fs').writeFileSync('data/note.txt', 'it's $(date)')\""]]. المطلوب ملف [[note.txt]] فيه [[it's]] والتاريخ بتاع السيرفر.`, done: R`عملت ملف [[note.cjs]] (أو استخدمت [[node -]] على الـ stdin)، و [[docker exec app-backend cat data/note.txt]] فيه [[it's]] وتاريخ، ومفيش ولا [[\"]] في الأمر.` },
          { lvl: 'تطبيق', t: R`صلّح [[fix-plans.cjs]] عشان يتشغّل مرتين من غير ضرر: الـ [[.bak]] ميتكتبش فوقه (اسم فيه الوقت، أو يرفض لو موجود)، ولو القيمة الحالية هي الجديدة أصلًا يطبع [[already applied]] ومبيكتبش حاجة.`, done: R`أول تشغيل [[before]] و [[after]]، والتاني [[already applied]] ومفيش ملف [[.bak]] جديد، و [[.bak]] الأولاني لسه فيه [[900]].` },
          { lvl: 'تحدي', t: R`قارن: نفس السكربت بـ ٣ طرق: [[scp]] و [[docker cp]] و [[node file.cjs]]، و [[node -]] على الـ stdin، و [[docker exec -i app-backend sh -c 'cat > /tmp/x.cjs && node /tmp/x.cjs']]. لكل طريقة: فين الملف بيتساب؟ ومحتاجة [[-n]] ولا لأ؟ وتنفع لو السكربت بيقرا من الـ stdin هو كمان؟`, done: R`جدول ٣×٣ مليان من تجربة فعلية، وفيه إن الأولى بتسيب الملف على السيرفر وجوه الـ container، والتانية مبتسيبش حاجة، وإن التانية والتالتة مينفعش معاهم [[-n]].` },
          { lvl: 'تحدي', t: R`اكتب اختبار لحلقة بتلف على سيرفرات: [[hosts.txt]] فيه ٣ أسامي، والحلقة بتطبع [[<host>: <hostname>]] لكل واحد. اثبت إنها من غير [[-n]] بتطبع واحد بس، وبعد [[-n]] تلاتة، من غير ما تحتاج سيرفرات حقيقية (بدّل [[ssh]] بـ function بتقرا الـ stdin زيه).`, done: R`عندك function [[fake_ssh() { cat > /dev/null; echo "$1"; }]] أو زيها، والحلقة بيها بتطبع سطر واحد، وبنسخة بتقرا من [[/dev/null]] بتطبع ٣.` },
        ],
        ci: [
          { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`mkdir app && cd app && echo '{"type":"module"}' > package.json
echo 'const fs = require("fs"); console.log("read", fs.readFileSync("package.json","utf8").trim())' > fix.js
node fix.js 2>&1 | grep -o "require is not defined in ES module scope" | head -1
cp fix.js fix.cjs && node fix.cjs
node - < fix.js
cd ..
printf '      DATABASE_URL: postgres://shop:S3cr3t-lab@db:5432/shop\n      PAYMENT_KEY: sk_test_lab123\n      SMTP_PASS: lab-smtp-pass\n      NODE_ENV: production\n' | sed -E 's/((PASS|SECRET|KEY|TOKEN)[A-Z_]*: ).+/\1***/; s#//([^:/@]+):[^@]*@#//\1:***@#'
bash -c "echo it's done" 2>&1 | grep -o "unexpected EOF while looking for matching" | head -1
fake_ssh() { cat > /dev/null; echo "$1"; }
printf 'a\nb\nc\n' > hosts.txt
echo "without -n: $(while read h; do fake_ssh "$h"; done < hosts.txt | wc -l | tr -d ' ')"
echo "with -n: $(while read h; do fake_ssh "$h" < /dev/null; done < hosts.txt | wc -l | tr -d ' ')"`, expect: [R`require is not defined in ES module scope`, R`read {"type":"module"}`, R`DATABASE_URL: postgres://shop:***@db:5432/shop`, R`PAYMENT_KEY: ***`, R`SMTP_PASS: ***`, R`NODE_ENV: production`, R`unexpected EOF while looking for matching`, R`without -n: 1`, R`with -n: 3`] },
        ],
      },
        {
          cmd: "المصدر الحقيقي على السيرفر",
          title: "الريبو عندك قديم والموقع الحي فيه صفحة مش عندك: الكود اتعدّل على السيرفر مباشرة",
          learn: R`تثبت إن الكود الحي اتعدّل على السيرفر ومش في git، وتجيب نسخة منه وتقارنها بالريبو، وتاخد نسخة احتياطية قبل أي تعديل، وترجّع السيرفر نفسه تحت git من غير ما تلمس ملفاته، فأي تعديل يدوي بعد كده يبان في [[git status]].`,
          out: R`[[diff -rq]] بين نسخة السيرفر والريبو فاضي، و [[git status --short]] على السيرفر فاضي، والصفحة الحية لسه شغّالة، و [[git log -1]] على السيرفر = آخر commit عندك.`,
          desc: R`طلبوا منك تعدّل صفحة «White Friday». دوّرت في الريبو على جهازك: [[grep -rliE "white-friday" .]] مطلّعش حاجة، و [[git log]] آخره من شهور، و [[git status]] نضيف. بس الصفحة شغّالة على الموقع الحي! يعني الكود اللي على السيرفر **مش** هو اللي في الريبو: حد عدّل هناك مباشرة (أو رفع ملفات بـ FTP)، والسيرفر مفيهوش [[.git]] أصلًا.

الغلطة اللي بتحصل هنا: تعدّل على نسختك القديمة وترفعها فوق السيرفر، فتمسح الصفحة الجديدة وأي تعديل تاني اتعمل هناك. الترتيب الصح:
1. تثبت: [[ls -a | grep -E "^\.git$" || echo no_git_on_server]] على السيرفر، و [[grep]] و [[find]] هناك.
2. تجيب نسخة من السيرفر ([[tar]] على [[ssh]]) وتقارنها بالريبو بـ [[diff -rq]].
3. نسخة احتياطية بالتاريخ قبل أي تعديل: [[mkdir -p /root/bak-$(date +%F) && cp -a ...]].
4. ترجّع الحقيقة لـ git: commit بنسخة السيرفر في الريبو، وبعدين السيرفر نفسه يبقى checkout ([[git init]] و [[git fetch]] و [[git reset]] من غير [[--hard]]) فملفاته متتلمسش.
5. من هنا التعديل يبقى في الريبو، والنشر بـ [[git pull --ff-only]].`,
          example: R`grep -rliE "white.?friday" . --exclude-dir=.git; echo "exit=$?"
git log --format="%h %ad %s" --date=short -3 && git status --short
ssh deployer@203.0.113.10 'cd ~/domains/shop.example/public_html && { ls -a | grep -E "^\.git$" || echo no_git_on_server; } && grep -rliE "white.?friday" . && find . -type f -newermt "2026-07-03" -printf "%TY-%Tm-%Td %p\n" | sort'
ssh deployer@203.0.113.10 'cd ~/domains/shop.example/public_html && tar czf - --exclude=./uploads --exclude=./config.php .' | tar xzf - -C ~/server-copy
diff -rq --exclude=.git --exclude=.gitignore ~/server-copy .
ssh deployer@203.0.113.10 'B=~/bak-$(date +%F); mkdir -p $B && cp -a ~/domains/shop.example/public_html/{index,prices,white-friday}.php $B/'
git switch -c server-snapshot && rsync -a --exclude=.git --exclude=.gitignore ~/server-copy/ ./ && git add -A && git commit -m "snapshot: live server 2026-11-03"
git switch main && git merge --ff-only server-snapshot && git push origin main
ssh deployer@203.0.113.10 'cd ~/domains/shop.example/public_html && git init -q -b main && git remote add origin git@github.com:acme-co/shop-site.git && git fetch -q origin && git reset -q origin/main && git branch -q -u origin/main && git status --short'`,
          lines: [
            R`على جهازك: الصفحة موجودة في الكود؟ [[-r]] كل الفولدرات، و [[-l]] أسماء الملفات بس، و [[-i]] من غير فرق بين كبير وصغير، و [[-E]] regex، و [[white.?friday]] بتطابق [[white-friday]] و [[White Friday]] و [[whitefriday]]. [[exit=1]] = مفيش ولا ملف.`,
            R`آخر ٣ commits بتواريخها، وهل فيه تعديلات مش متسجّلة. لو آخر commit من شهور والموقع اتغيّر من أسبوع، فيه حاجة اتعملت بره git.`,
            R`على السيرفر بأمر ssh واحد: فيه [[.git]]؟ (لو لأ يطبع [[no_git_on_server]])، والصفحة في أنهي ملفات، وإيه الملفات اللي اتعدّلت بعد آخر commit عندك ([[-newermt]] = أحدث من التاريخ ده، و [[-printf]] بيطبع تاريخ التعديل جنب الاسم).`,
            R`نسخة من كود السيرفر على جهازك من غير ما تلمس السيرفر: [[tar czf -]] بيكتب الأرشيف على الـ stdout، والـ pipe بيوصّله لـ [[tar xzf -]] على جهازك. [[--exclude]] للصور المرفوعة والأسرار.`,
            R`قارن الفولدرين: [[-r]] جوه الفولدرات، و [[-q]] أسماء الملفات اللي مختلفة بس. [[Only in ~/server-copy]] = ملف على السيرفر مش عندك، و [[differ]] = نفس الملف بمحتوى مختلف.`,
            R`قبل أي تعديل على السيرفر: نسخة من الملفات اللي هتتغيّر في فولدر بتاريخ النهارده. [[cp -a]] بيحافظ على التواريخ والصلاحيات، و [[{index,prices,white-friday}.php]] بيتفرد لـ ٣ أسامي.`,
            R`على جهازك: فرع جديد، وحط نسخة السيرفر فوق الريبو ([[rsync -a]] من غير [[--delete]]، فاللي عندك ومش هناك ميتمسحش)، و commit بيقول من فين النسخة دي.`,
            R`ارجع لـ [[main]] وخد الفرع ([[--ff-only]]: يرفض لو محتاج merge commit)، وارفع.`,
            R`على السيرفر: اعمل الفولدر ريبو، واجيب التاريخ من GitHub، و [[git reset]] (من غير [[--hard]]) بيخلّي الـ index = [[origin/main]] **ومبيلمسش الملفات**. [[git status --short]] بعدها بيقول إيه اللي مختلف بين الملفات الحية والريبو.`,
          ],
          try: R`ابني المعمل اللي في الشرح في container ([[php:8.4-cli]] أو [[ubuntu:24.04]] و [[apt-get install -y git rsync]]): ريبو bare، و [[laptop]] فيه commitين قدام، وفولدر [[server/public_html]] منسوخ من غير [[.git]] واتعدّل فيه ([[white-friday.php]] جديد، و [[prices.php]] اتغيّر، و [[config.php]] و [[uploads/]]). امشي بالترتيب: grep، و [[no_git_on_server]]، و [[tar]]، و [[diff -rq]]، والنسخة الاحتياطية، والـ snapshot، و [[git reset]] على السيرفر. وبعدين جرّب [[rsync -an --delete]] من نسخة قديمة عشان تشوف كان هيمسح إيه.`,
          teach: R`## العَرَض

- على جهازك: [[grep -rliE "white-friday" .]] فاضي، و [[git log]] آخره ٢ يوليو، و [[git status]] نضيف.
- على الموقع الحي: [[https://shop.example/white-friday]] بيرجّع 200 وفيه الصفحة.

يعني الكود اللي شغّال مش هو اللي في الريبو. قبل ما تفكر في التعديل المطلوب، لازم تعرف **الحقيقة فين**.

---

## المعمل

container [[php:8.4-cli]] (Debian) و [[apt-get install -y git rsync]]. مكان السيرفر فولدر [[/lab/server/public_html]]، ومكان جهازك [[/lab/laptop]]، و «GitHub» ريبو bare [[/lab/origin.git]]. وأمر [[tar]] على [[ssh]] اتجرّب لوحده بين يوزرين في container [[ubuntu:24.04]] فيه [[sshd]] بمفتاح.

| الملف على السيرفر | الحكاية |
|---|---|
| [[index.php]] | زي الريبو |
| [[prices.php]] | اتعدّل على السيرفر (سعر White Friday) |
| [[white-friday.php]] | اتعمل على السيرفر بس |
| [[config.php]] | باسورد الداتابيز، مش المفروض في git أصلًا |
| [[uploads/]] | صور الزوار |

---

## ١. على جهازك: الحاجة مش موجودة فعلًا؟

~~~bash
grep -rliE "white-friday" . --exclude-dir=.git; echo "exit=$?"
git log --format="%h %ad %s" --date=short -3
git status --short; echo "status lines: $(git status --short | wc -l)"
git fetch -q origin; git status -sb | head -1
~~~

~~~text الناتج
exit=1
6eb911f 2026-07-02 home banner
9dfb751 2026-06-10 first version
status lines: 0
## main...origin/main
~~~

- [[exit=1]] من [[grep]] = ولا سطر طابق (و [[2]] = خطأ زي فولدر مش موجود).
- [[--format="%h %ad %s" --date=short]]: الهاش القصير، والتاريخ، والرسالة.
- [[git status -sb]] بعد [[fetch]]: [[## main...origin/main]] من غير [[behind]] = الريبو على GitHub كمان مفيهوش حاجة أحدث. يعني المشكلة مش «انت مسحبتش»، المشكلة إن التعديل **مش في git خالص**.

---

## ٢. على السيرفر: فيه git؟ والحاجة فين؟

~~~bash
cd ~/domains/shop.example/public_html
ls -a | grep -E "^\.git$" || echo no_git_on_server
grep -rliE "white-friday" .
~~~

~~~text الناتج
no_git_on_server
./prices.php
~~~

| الحتة | معناها |
|---|---|
| [[ls -a]] | كل الملفات حتى اللي أولها نقطة |
| [[grep -E "^\.git$"]] | سطر هو [[.git]] بالظبط ([[^]] أول السطر و [[$]] آخره و [[\.]] نقطة حرفية) |
| [[|| echo no_git_on_server]] | لو [[grep]] ملقاش (كود 1) اطبع الرسالة |

**فخ صغير:** [[grep]] لقى [[prices.php]] بس، مش [[white-friday.php]]! لأن [[grep]] بيدوّر في **المحتوى**، والملف جواه [[White Friday]] بمسافة. والاسم بيتدوّر عليه بـ [[find]]:

~~~bash
grep -rliE "white.?friday" .
find . -iname "*white*friday*"
find . -type f -newermt "2026-07-03" -printf "%TY-%Tm-%Td %p\n" | sort
~~~

~~~text الناتج
./prices.php
./white-friday.php
./white-friday.php
2026-10-20 ./prices.php
2026-10-20 ./white-friday.php
2026-11-03 ./uploads/a.jpg
~~~

- [[white.?friday]]: [[.]] أي حرف و [[?]] مرة أو ولا مرة، فبتطابق الشرطة والمسافة ومن غيرهم.
- [[find -iname]]: بالاسم، من غير فرق بين كبير وصغير.
- [[-newermt "2026-07-03"]]: الملفات اللي اتعدّلت بعد آخر commit عندك (٢ يوليو). ده بيديك لستة «اللي اتعمل هناك» مرة واحدة.
- [[-printf "%TY-%Tm-%Td %p\n"]]: سنة وشهر ويوم التعديل ([[%T]] = وقت التعديل) والمسار. و [[sort]] يرتّبهم.

---

## ٣. هات نسخة وقارن

~~~bash
mkdir -p ~/server-copy
ssh deployer@203.0.113.10 'cd ~/domains/shop.example/public_html && tar czf - --exclude=./uploads --exclude=./config.php .' | tar xzf - -C ~/server-copy
diff -rq --exclude=.git --exclude=.gitignore ~/server-copy .
diff -u prices.php ~/server-copy/prices.php
~~~

~~~text الناتج
Files /lab/server-copy/prices.php and ./prices.php differ
Only in /lab/server-copy: white-friday.php
--- prices.php	2026-11-03 11:24:43.418840400 +0000
+++ /lab/server-copy/prices.php	2026-10-20 12:00:00.000000000 +0000
@@ -1 +1 @@
-<?php $prices = ["monthly" => 150];
+<?php $prices = ["monthly" => 150, "white-friday" => 99];
~~~

| الحتة | معناها |
|---|---|
| [[tar czf - ...]] | [[c]] اعمل أرشيف، و [[z]] اضغطه gzip، و [[f -]] الملف هو الـ stdout |
| [[--exclude=./uploads]] | الصور مالهاش دعوة بالكود، وممكن تبقى جيجات |
| [[--exclude=./config.php]] | الأسرار متنزلش على جهازك ولا تدخل git |
| [[| tar xzf - -C ~/server-copy]] | [[x]] فك من الـ stdin في الفولدر ده |
| [[diff -rq]] | لستة الملفات المختلفة بس |
| [[diff -u]] | الفرق جوه ملف واحد: [[-]] عندك و [[+]] على السيرفر |

ده أهم خطوة: دلوقتي عارف **بالظبط** إيه اللي اتعمل على السيرفر (ملف جديد، وسطر سعر)، مش بتخمّن. (اتجرّب [[ssh ... tar czf - | tar xzf -]] لوحده بمفتاح بين يوزرين في [[ubuntu:24.04]]: [[ls ~/server-copy]] طلّع [[index.php]] و [[white-friday.php]] من غير [[uploads]] و [[config.php]].)

---

## ٤. ليه متعدّلش على نسختك وترفع؟

لو رفعت الريبو القديم بـ [[rsync --delete]] (أو FTP بـ «اكتب فوق»)، ده اللي كان هيحصل. [[-n]] = dry run، بيقول بس:

~~~text rsync -an --delete --exclude=.git --exclude=config.php --exclude=uploads --itemize-changes ./ /lab/server/public_html/
*deleting   white-friday.php
.d..t...... ./
>f..t...... .gitignore
>f.st...... prices.php
~~~

[[*deleting white-friday.php]]: الصفحة الحية كانت هتتمسح. و [[>f.st...... prices.php]]: الملف هيتكتب فوقه ([[s]] الحجم مختلف و [[t]] الوقت)، فسعر White Friday هيروح. ومن غير [[--delete]] الصفحة كانت هتفضل، بس [[prices.php]] برضه هيترجع للقديم.

---

## ٥. نسخة احتياطية قبل أي حاجة

~~~bash
B=/root/bak-$(date +%F); mkdir -p $B && cp -a index.php prices.php white-friday.php $B/ && ls -l --time-style=+%F $B
~~~

~~~text الناتج
-rw-r--r-- 1 root root 29 2026-07-02 index.php
-rw-r--r-- 1 root root 58 2026-10-20 prices.php
-rw-r--r-- 1 root root 36 2026-10-20 white-friday.php
~~~

- [[$(date +%F)]]: تاريخ النهارده [[2026-11-03]]، فالفولدر [[bak-2026-11-03]]. تقدر تعمل كذا واحد في كذا يوم من غير ما تكتب فوق.
- [[cp -a]]: archive، بيحافظ على التاريخ والصلاحيات والمالك (شوف التواريخ في الناتج: مش النهارده).
- على استضافة مشتركة مفيش [[/root]]: [[~/bak-$(date +%F)]].

---

## ٦. رجّع الحقيقة لـ git

### (أ) على جهازك: commit بنسخة السيرفر

~~~bash
git switch -c server-snapshot
rsync -a --exclude=.git --exclude=.gitignore ~/server-copy/ ./
git status --short
git add -A && git commit -m "snapshot: live server 2026-11-03 (white-friday edited directly on server)"
git diff --stat main
git switch main && git merge --ff-only server-snapshot && git push origin main
~~~

~~~text الناتج
 M prices.php
?? white-friday.php
 prices.php       | 2 +-
 white-friday.php | 1 +
 2 files changed, 2 insertions(+), 1 deletion(-)
~~~

فرع منفصل عشان لو حاجة غريبة ظهرت في الـ diff (ملف مش مفهوم، أو سر) توقف قبل [[main]]. و [[rsync -a ~/server-copy/ ./]] بالـ [[/]] في آخر المصدر = محتوى الفولدر مش الفولدر نفسه.

### (ب) على السيرفر: يبقى checkout من غير ما ملف يتلمس

~~~bash
git init -q -b main
git remote add origin git@github.com:acme-co/shop-site.git
git fetch -q origin
git reset -q origin/main
git branch -q -u origin/main
git status --short
~~~

~~~text الناتج
 D .gitignore
?? config.php
?? uploads/
~~~

| الأمر | بيعمل إيه |
|---|---|
| [[git init -b main]] | فولدر [[.git]] فاضي، والفرع [[main]] |
| [[git fetch]] | يجيب التاريخ كله في [[.git]]، والملفات الحية زي ما هي |
| [[git reset origin/main]] | (mixed، الافتراضي) الفرع والـ index = [[origin/main]]، **والملفات متتلمسش**. [[--hard]] كان هيكتب فوقها |
| [[git branch -u origin/main]] | الفرع ده بيتابع [[origin/main]]، فـ [[git pull]] و [[status]] يعرفوه |

الناتج بيقول إن الفرق الوحيد: [[.gitignore]] مش موجود على السيرفر (عمره ما اتنسخ)، فـ [[config.php]] و [[uploads/]] ظاهرين كملفات جديدة. ده مش تعديل في الكود، فرجّعه:

~~~bash
git checkout -- .gitignore
git status --short; echo "dirty lines: $(git status --short | wc -l)"
git status --short --ignored
git pull --ff-only
~~~

~~~text الناتج
dirty lines: 0
!! config.php
!! uploads/
Already up to date.
~~~

[[!!]] = ملفات git شايفها ومتجاهلها بقصد. والسيرفر دلوقتي = الريبو بالظبط.

---

## ٧. اتأكد

~~~text على السيرفر
dirty lines: 0                      ← git status --short | wc -l
0f42e03 snapshot: live server ...   ← git log --oneline -1 (نفس اللي على جهازك)
~~~

وأهم حاجة إن الموقع لسه شغّال: [[curl -s -o /dev/null -w "%{http_code}" https://shop.example/white-friday]] لازم يفضل 200 (مفيش ملف اتغيّر، فمفيش سبب يتغيّر). وأي تعديل يدوي بعد كده بيبان على طول:

~~~text echo "// hotfix" >> index.php; git status --short; git diff --stat
 M index.php
 index.php | 1 +
 1 file changed, 1 insertion(+)
~~~

ودلوقتي ابدأ التعديل المطلوب: في الريبو على جهازك، وبعدين push، وعلى السيرفر [[git pull --ff-only]].

---

## ٨. البدايل اللي اترفضت

| البديل | ليه لأ |
|---|---|
| تعدّل على نسختك القديمة وترفعها | بتمسح [[white-friday.php]] وسعر [[prices.php]] (اتجرّب بـ [[rsync -an --delete]]) |
| تعدّل على السيرفر مباشرة وخلاص | بيكمّل المشكلة: الريبو يفضل قديم، والمرة الجاية نفس الحكاية |
| [[git clone]] جديد مكان [[public_html]] | بيمسح التعديلات الحية، أو بيفشل لأن الفولدر مش فاضي |
| [[git reset --hard origin/main]] على السيرفر | بيكتب فوق الملفات الحية بنسخة الريبو، يعني نفس مسح الصفحة |
| [[git add -A]] على السيرفر و commit من هناك | ممكن، بس بيدخّل [[config.php]] و [[uploads/]] لو [[.gitignore]] مش موجود، وبيعمل commit بهوية السيرفر. الـ snapshot من جهازك بيعدّي على عينك الأول |

---

## ٩. متتكررش

- **مفيش تعديل على السيرفر مباشرة.** لو لازم hotfix عاجل: اعمله، وبعدين على طول [[git diff]] على السيرفر وانقله لـ commit في الريبو (أو [[git commit]] هناك و [[git push]]).
- **سكربت النشر يرفض لو [[git status --short]] على السيرفر مش فاضي** (درس «نسخة قديمة كسرت الإنتاج» في تاب التشخيص بيعمل نفس الحكاية بالعكس).
- **قبل أي شغل على مشروع قديم:** [[ssh ... 'git -C <dir> status --short 2>&1 || echo no_git']] أول أمر، قبل ما تفتح الريبو عندك.
- **[[find -newermt]] شهريًا** على السيرفرات اللي مفيهاش git لسه، لحد ما كلها تبقى checkout.

---

## الخلاصة

| السؤال | الأمر |
|---|---|
| عندي؟ | [[grep -rliE "white.?friday" .]] و [[git log -3]] و [[git status -sb]] بعد [[fetch]] |
| السيرفر فيه git؟ | [[ls -a | grep -E "^\.git$" || echo no_git_on_server]] |
| إيه اللي اتعمل هناك؟ | [[find -newermt]] و [[find -iname]] و [[grep]] |
| بالظبط إيه الفرق؟ | [[ssh ... tar czf - | tar xzf -]] ثم [[diff -rq]] و [[diff -u]] |
| قبل أي تعديل | [[cp -a]] لـ [[bak-$(date +%F)]] |
| رجّع لـ git | snapshot commit، وعلى السيرفر [[git init]] و [[fetch]] و [[reset]] (من غير [[--hard]]) |`,
          deep: {
            why: R`أي مشروع عاش فترة على استضافة بيتعدّل على السيرفر مرة: hotfix بالليل، أو حد غير تقني من لوحة الاستضافة، أو مطوّر تاني بـ FTP. ولما ده يحصل، الريبو بيبطل يبقى المصدر، وأي نشر من الريبو بيمسح الشغل الحي من غير ما حد يحس. الطريقة دي بتحوّل «إحنا مش عارفين الحقيقة فين» لمكان واحد معروف، من غير ما الموقع يقع ولا ملف يتغيّر.`,
            how: R`[[tar czf -]] على السيرفر و [[tar xzf -]] عندك بيعدّوا الملفات في stream واحد على اتصال ssh، بالتواريخ والصلاحيات. و [[diff -rq]] بيقارن الشجرتين ملف ملف. و [[git reset <commit>]] من غير [[--hard]] بيحرّك الفرع ويكتب الـ index من الـ commit ده، ومبيكتبش في working tree، فـ [[git status]] بعدها = الفرق بين الملفات الحية والـ commit. و [[find -newermt]] بيقارن mtime بتاريخ؛ و FTP و [[cp]] من غير [[-a]] ممكن يغيّروا الـ mtime، فده دليل مش إثبات، والإثبات هو [[diff]].`,
            when: R`أول ما تمسك مشروع شغّال من حد تاني، أو الموقع الحي فيه حاجة مش عندك، أو [[git pull]] على السيرفر بيقول [[not a git repository]]، أو حد يقول «عدّلتها على السيرفر على طول». وقبل أي نقل لسيرفر جديد (درس «نقل السيرفر كله»).`,
            mistakes: R`تعدّل على نسختك القديمة وترفع فوق. وتدوّر بـ [[grep]] على اسم ملف (بيدوّر في المحتوى). وتعمل [[git reset --hard]] أو [[git clone]] في [[public_html]]. وتنسى [[--exclude]] للأسرار فتنزل [[config.php]] على جهازك وتدخل git. وتنسى النسخة الاحتياطية. وتعمل [[rsync --delete]] من غير [[-n]] الأول. وتفتكر إن [[git status]] الفاضي على جهازك معناه إن مفيش حاجة جديدة في أي حتة.`
          },
          sol: R`على الجهاز: [[exit=1]] و آخر commit [[2026-07-02 home banner]] و [[status lines: 0]]. على السيرفر: [[no_git_on_server]]، و [[grep "white-friday"]] لقى [[prices.php]] بس، و [[white.?friday]] لقى الاتنين، و [[find -newermt]] طلّع [[prices.php]] و [[white-friday.php]] بتاريخ [[2026-10-20]]. [[diff -rq]]: [[Files ... prices.php ... differ]] و [[Only in ...server-copy: white-friday.php]]. [[rsync -an --delete]] من نسخة قديمة: [[*deleting white-friday.php]]. بعد الـ snapshot و [[git reset]] و [[git checkout -- .gitignore]]: [[dirty lines: 0]] و [[!! config.php]] و [[!! uploads/]] و [[Already up to date.]]، وتعديل تجريبي ظهر [[M index.php]].

اتجرّب في container [[php:8.4-cli]] بـ git و rsync من apt، و [[ssh ... tar | tar]] في [[ubuntu:24.04]] فيه [[sshd]]. العناوين والريبو في المثال مخترعين.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: رتّب ٦ خطوات من «مش لاقي الصفحة في الريبو» لحد «السيرفر بقى checkout نضيف»، وجنب كل خطوة الأمر.`, done: R`الترتيب: grep و git log عندك، و [[no_git_on_server]] و find هناك، و tar على ssh و [[diff -rq]]، و [[cp -a]] للنسخة الاحتياطية، و snapshot commit، و [[git init]] و [[fetch]] و [[reset]] من غير [[--hard]]، وكل أمر صح.` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: سيرفر مفيهوش git، و [[git init && git fetch origin && git reset origin/main]] عليه، والريبو فيه [[a.php]] و [[b.php]]، والسيرفر فيه [[a.php]] (متعدّل) و [[c.php]] (جديد) ومفيهوش [[b.php]]. توقّع [[git status --short]] بالظبط، وبعدين اعمل الحالة ونفّذ.`, done: R`توقعت [[ M a.php]] و [[ D b.php]] و [[?? c.php]]، والناتج طابق، وكتبت إيه اللي يحصل لكل ملف لو كان [[reset --hard]].` },
            { lvl: 'تطبيق', t: R`صلّح الكود البايظ: سكربت النشر ده [[rsync -az --delete ./ deployer@203.0.113.10:~/domains/shop.example/public_html/]] من غير أي فحص. زوّده بفحصين قبل الرفع: السيرفر فيه git ونضيف، و [[rsync -n]] بيقول هيمسح إيه، ويرفض لو هيمسح أي ملف [[.php]].`, done: R`على المعمل اللي فيه [[white-friday.php]] على السيرفر بس، السكربت بيرفض ويطبع [[would delete: white-friday.php]]، وبعد الـ snapshot بيعدّي، وكود الخروج غير صفر في حالة الرفض.` },
            { lvl: 'تطبيق', t: R`ابني [[drift.sh <host> <dir>]]: بيجيب نسخة من السيرفر بـ tar على ssh (من غير [[uploads]] وأي [[*.env]] أو [[config*.php]])، ويقارنها بآخر commit في [[origin/main]] (مش بالـ working tree عندك، استخدم [[git archive origin/main | tar x]] في فولدر مؤقت)، ويطبع جدول: جديد على السيرفر، ومتعدّل، وناقص.`, done: R`على المعمل بيطبع [[new: white-friday.php]] و [[changed: prices.php]]، وبعد الـ snapshot بيطبع [[no drift]] وكود 0، والفولدرات المؤقتة بتتمسح ([[trap]]).` },
            { lvl: 'تحدي', t: R`بيانات حقيقية الشكل: اعمل سيرفر وهمي فيه ٢٠٠ ملف PHP، و ١٥ منهم اتعدّلوا على مدار ٦ شهور بتواريخ مختلفة ([[touch -d]])، و ٣ جداد. من غير ما تعرف مين، طلّع بأوامر [[find]] و [[diff]]: إيه اتعدّل في كل شهر، وأقدم تعديل، وهل فيه ملف اتعدّل بعد آخر commit بس محتواه زي الريبو (اتلمس من غير تغيير).`, done: R`جدول بالشهر وعدد الملفات، وأقدم تاريخ، ولستة الملفات اللي [[-newermt]] بيطلّعها و [[diff]] بيقول إنها زي بعض، وكتبت ليه [[find]] لوحده مش دليل.` },
            { lvl: 'تحدي', t: R`اشرحها: صاحب الشغل بيقول «إحنا بنعدّل على السيرفر من لوحة الاستضافة عادي، ليه git؟». اكتب له ٥ سطور من غير مصطلحات صعبة، فيهم المثال اللي في الدرس.`, done: R`الكلام فيه: مين عدّل إيه وإمتى، وإزاي ترجع لنسخة امبارح في دقيقة، وإن الرفع من نسخة قديمة مسح صفحة White Friday في المثال، ومن غير ولا كلمة زي commit أو merge.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`export GIT_AUTHOR_NAME=dev GIT_AUTHOR_EMAIL=dev@shop.example GIT_COMMITTER_NAME=dev GIT_COMMITTER_EMAIL=dev@shop.example
export GIT_CONFIG_COUNT=1 GIT_CONFIG_KEY_0=core.autocrlf GIT_CONFIG_VALUE_0=false
git init -q --bare -b main origin.git
git clone -q origin.git laptop 2>/dev/null && cd laptop
printf '<?php echo "home";\n' > index.php
printf '<?php $p = 150;\n' > prices.php
printf 'config.php\nuploads/\n' > .gitignore
git add -A && git commit -qm first && git push -q origin main && cd ..
mkdir -p server/uploads && echo img > server/uploads/a.jpg && cp laptop/index.php laptop/prices.php server/
printf '<?php echo "<h1>White Friday</h1>";\n' > server/white-friday.php
printf '<?php $p = ["monthly" => 150, "white-friday" => 99];\n' > server/prices.php
printf '<?php $pw = "lab";\n' > server/config.php
cd laptop
grep -rliE "white-friday" . --exclude-dir=.git; echo "local exit=$?"
cd ../server
ls -a | grep -E "^\.git$" || echo no_git_on_server
grep -rliE "white.?friday" . | sort
cd ..
mkdir copy && (cd server && tar czf - --exclude=./uploads --exclude=./config.php .) | tar xzf - -C copy
diff -rq --exclude=.git --exclude=.gitignore copy laptop | sed 's#copy#server-copy#'
cd laptop && git switch -q -c snap && cp ../copy/*.php . && git add -A && git commit -qm "snapshot" && git switch -q main && git merge -q --ff-only snap && git push -q origin main && cd ..
cd server && git init -q -b main && git remote add origin ../origin.git && git fetch -q origin && git reset -q origin/main
git status --short | sort
git checkout -- .gitignore
echo "dirty: $(git status --short | wc -l | tr -d ' ')"
git status --short --ignored
ls white-friday.php config.php`, expect: [R`local exit=1`, R`no_git_on_server`, R`./prices.php`, R`./white-friday.php`, R`Files server-copy/prices.php and laptop/prices.php differ`, R`Only in server-copy: white-friday.php`, R` D .gitignore`, R`?? config.php`, R`dirty: 0`, R`!! config.php`, R`!! uploads/`] },
          ],
        }
    ],
  }
]);
