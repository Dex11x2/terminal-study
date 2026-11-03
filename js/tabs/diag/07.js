// تكملة تاب diag: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/diag/01.js (شرح حقول الدرس في أوله)
MORE("diag", [
    {
      t: "قضايا كاملة من الإنتاج",
      l: 3,
      time: R`حوالي ٥ ساعات (كل قضية ساعة تقريبًا بالمعمل)`,
      goal: [
        R`تمشي في أي عطل على سيرفر شغّال بنفس الترتيب: العَرَض، وفحوصات من الأسرع للأعمق وليه بالترتيب ده، والسبب بدليل، والحل، والبدايل اللي رفضتها وليه، وإزاي تتأكد، وإزاي متتكررش.`,
        R`تعرف ليه [[certbot renew]] ممكن يوقّع nginx، وتحوّل الشهادات لـ webroot بـ [[certbot reconfigure]] و deploy hook من غير ثانية توقف.`,
        R`تسرّع موقع شغّال (HTTP/2 و gzip و brotli) وانت بتقيس قبل وبعد بالأرقام، ومن غير ما تقع لو غلطت في سطر.`,
        R`تنقل دومين لسيرفر جديد وانت فاهم مين بيشوف إيه وإمتى (الـ authoritative والـ resolvers والكاش المحلي)، ومن غير ما تبوّظ الإيميل.`,
        R`تثبت المشكلة عند مين (السيرفر ولا جهازك ولا شبكتك) قبل ما تلمس أي حاجة على السيرفر.`,
        R`تكتشف إن ملف اتنسخ من نسخة قديمة كسر الإنتاج، وترجّع الإنتاج الأول، وبعدين تصلّح بـ git صح.`,
        R`تفرّق بين «البروسس عايش» و «التطبيق شغّال»: health check مش دليل، و endpoint حقيقي هو الدليل.`,
      ],
      use: {
        net: R`DNS و TLS و SSH و HTTP/2 بيتقابلوا كلهم في القضايا دي، وكل واحدة بتوريك طبقة من «السلّم» (درس «السلّم» في أول التاب) وهي واقعة فعلًا.`,
        work: R`دي حاجات حصلت فعلًا على سيرفرات حقيقية واتعادت في معمل بأسامي مخترعة. لما تحصلك (وهتحصل)، هتكون عارف أول ٣ أوامر تكتبهم وأول حاجة متعملهاش.`,
        prog: R`قضيتين منهم مشاكل كود ونشر: ملف قديم اتنسخ فوق الجديد، و health check بيكدب. الحل فيهم في الكود وطريقة النشر مش في السيرفر.`,
      },
      lab: R`docker network create --subnet 198.51.100.0/24 caselab
mkdir -p ~/lab/diagcases && cd ~/lab/diagcases`,
      projects: [
        { lvl: 'صغير', t: R`[[audit-certbot.sh]]: ملفات التجديد فيها قنبلة؟`, what: R`سكربت بيقرا كل [[/etc/letsencrypt/renewal/*.conf]] (أو فولدر تديهوله) ويطبع لكل شهادة: الـ authenticator، والـ hooks، ومسار الـ webroot. ويعلّم [[DANGER]] لو فيه [[standalone]] مع [[pre_hook]] بيوقف nginx، و [[WARN]] لو مسار الـ webroot مش موجود على الديسك. من درس «nginx وقف وقت certbot».`, done: R`على ٣ ملفات تجربة (standalone بـ hooks، و webroot مساره صح، و webroot مساره مش موجود) بيطبع [[DANGER]] و [[OK]] و [[WARN]] بالترتيب، وكود الخروج 2 لو فيه DANGER و 0 لو كله OK، ومبيغيّرش ولا ملف.` },
        { lvl: 'صغير', t: R`[[dns-watch.sh]]: الدومين اتنقل عند مين؟`, what: R`بياخد دومين و IP متوقع ولستة resolvers ([[1.1.1.1]] و [[8.8.8.8]] و الـ authoritative)، ويسأل كل واحد كل ٢٠ ثانية، ويطبع سطر بالوقت بس لما إجابة resolver تتغيّر، ويخلص لما الكل يرجّع الـ IP المتوقع. من درس «نقل الدومين لسيرفر جديد».`, done: R`على معمل CoreDNS في الدرس بيطبع سطر للـ authoritative أول ما تغيّر الـ zone، وسطر للـ resolver بعدها بثواني (قد الـ TTL)، ويخلص بـ [[all resolvers agree]]. وتشغيله والإجابات متغيّرتش مبيطبعش سطور مكررة.` },
        { lvl: 'متوسط', t: R`[[measure-site.sh]]: قبل وبعد بالأرقام`, what: R`بياخد لستة URLs، ولكل واحد بيقيس الحجم المنزّل من غير ضغط وبـ gzip وبـ br، والـ HTTP version، والـ [[content-encoding]]، ويحفظ الناتج CSV بتاريخ. ولو اديته ملفين CSV بيطبع جدول فيه نسبة التوفير لكل ملف. من درس «سرّع nginx على سيرفر شغّال».`, done: R`على معمل الدرس الجدول بيوري [[app.js]] نازل من 89037 لحوالي 30 ألف بـ br (نسبة حوالي ٦٦٪)، و HTTP من 1.1 لـ 2، والمقارنة بين ملفين بتطلع نفس الأرقام لو شغّلتها مرتين.` },
        { lvl: 'متوسط', t: R`[[where-is-the-time.sh]]: الوقت راح فين؟`, what: R`بيعمل نفس الطلب من جهازك ومن السيرفر نفسه (عن طريق ssh واحد مفتوح بـ [[ControlMaster]] أو أمر واحد)، ويطبع جدول المراحل جنب بعض (dns و connect و tls و ttfb و total) وحكم في سطر: «السيرفر بطيء» أو «الطريق من عندك بطيء» أو «الاتنين سريعين». من درس «السيرفر ولا جهازي؟».`, done: R`مع [[tc qdisc add dev eth0 root netem delay 1500ms]] على كونتينر العميل بيطلع حكم «الطريق من عندك» والسيرفر أقل من ١٠ مللي، ومن غير الـ delay بيطلع «الاتنين سريعين»، ومبيفتحش أكتر من اتصال ssh واحد.` },
        { lvl: 'كبير', t: R`[[safe-deploy.sh]]: نشر بيرفض يكسر الإنتاج`, what: R`أداة نشر حقيقية: (١) [[git fetch]] وترفض لو جهازك ورا [[origin/main]] أو فيه تعديلات مش متسجّلة. (٢) تشغّل الاختبارات محلي. (٣) على السيرفر بأمر ssh واحد: ترفض لو [[git status --short]] مش فاضي هناك (حد عدّل بإيده)، وتحفظ الـ commit الحالي، و [[git pull --ff-only]]، و [[docker compose up -d --build]]. (٤) تستنى [[/ready]] لحد ٦٠ ثانية، وتجرّب endpoint حقيقي (دخول بحساب تجربة). (٥) لو أي خطوة فشلت: ترجع للـ commit اللي اتحفظ وتعيد البناء، وتطبع السبب. وكل خطوة بوقتها في لوج. من دروس «نسخة قديمة كسرت الإنتاج» و «/health بيقول 200 والدخول بايظ».`, done: R`على معمل الدرس: النشر السليم بيخلص بـ [[deployed <hash>]]، ونشر من جهاز ورا بـ commit بيترفض قبل ما يلمس السيرفر، ونشر بيكسر [[/ready]] بيرجع لوحده و [[docker compose ps]] بعدها [[Up]] والـ commit هو القديم، وتشغيلها مرتين ورا بعض مبيعملش حاجة تانية.`, ext: R`زوّد [[--dry-run]] يطبع الخطة بس، ونسخة PowerShell للجهاز، وإشعار في قناة الفريق بالنتيجة، وتسجيل مين نشر إيه وإمتى في ملف على السيرفر.` },
        { lvl: 'كبير', t: R`[[smoke.sh]] + runbook للحوادث`, what: R`سكربت فحص بعد أي تغيير على السيرفر: الموقع من بره (كود ووقت)، و [[/ready]]، ودخول حقيقي بحساب تجربة، وكام يوم فاضل على الشهادة ([[openssl s_client]] و [[-enddate]])، وفحص ملفات التجديد (مشروع [[audit-certbot.sh]])، و DNS من resolverين. بيطبع جدول وكمان JSON، وكود خروج مختلف لكل نوع فشل. وجنبه ملف runbook: لكل فحص فاشل، أول ٣ أوامر تكتبهم وأول حاجة متعملهاش (من القضايا الست).`, done: R`في المعمل: السليم كله [[OK]] وكود 0. ولو وقفت nginx: فحص الموقع [[FAIL]] وكود 3 والـ runbook بيقولك [[systemctl is-active nginx]] و [[journalctl -u nginx]] الأول. ولو [[NODE_ENV]] غلط: [[/health]] OK و [[/ready]] FAIL، وده بالظبط اللي المراقبة العادية كانت هتفوّته. وبيشتغل من cron أو systemd timer كل ٥ دقايق من غير ما يطبع حاجة لو كله سليم.`, ext: R`ابعت التنبيه لما فحص يفشل مرتين ورا بعض بس (عشان متتزعجش من غلطة شبكة لحظية)، واعرض آخر ٢٤ ساعة في صفحة HTML صغيرة، أو حوّل الفحوصات لـ metrics لـ Prometheus (وحدة «قبل ما يقع» في نفس التاب).` },
        { lvl: 'فكرة', t: R`مكتبة الـ postmortems بتاعتك`, what: R`كل عطل يحصلك (أو حصل لحد قدامك) اكتبه postmortem من غير لوم: الخط الزمني بالدقيقة من اللوجات، والعَرَض، والفحوصات بالترتيب، والسبب، والحل، واللي اترفض وليه، والتأكيد، وخطوات المنع. وجنب كل واحد سكربت معمل بأسامي مخترعة بيعيد المشكلة. انت اللي بتقرر الشكل.`, done: R`فيه ٣ postmortems على الأقل، وكل واحد الخط الزمني فيه من سطور لوج حقيقية من المعمل (مش من الذاكرة)، وزميل قدر يعيد واحد منهم من السكربت لوحده ويوصل لنفس السبب.`, ext: R`اعمل منهم «تمرين حريق»: سكربت بيكسر حاجة عشوائي في المعمل، وانت تشخّص بالـ runbook بتاعك وتقيس خدت قد إيه، وتحسّن الـ runbook كل مرة.` },
      ],
      n: R`حوادث حصلت فعلًا واتعادت في معمل بأسامي مخترعة: certbot وقّع nginx، وتسريع nginx شغّال، ونقل دومين، و «السيرفر ولا جهازي؟»، ونسخة قديمة كسرت الإنتاج، و health check بيكدب. كل قضية: العَرَض، والفحوصات بالترتيب وليه، والسبب، والحل، والبدايل اللي اترفضت، والتأكيد، والوقاية`,
      items: [
        {
          cmd: "nginx وقف وقت certbot",
          title: "اتقتل certbot renew في النص، فـ nginx فضل واقف ١٢ دقيقة",
          learn: R`تشخّص «nginx واقف» في دقيقة، وتعرف إن [[pre_hook]] و [[post_hook]] مش عملية واحدة، وتحوّل التجديد لـ webroot من غير توقف.`,
          out: R`[[certbot renew --dry-run]] بينجح والموقع بيرد 200 طول ما هو شغّال.`,
          desc: R`بعد نقل موقع لسيرفر جديد، اتشغّل [[certbot renew --dry-run]] للتأكد، وبان إنه معلّق فاتقتل بـ [[pkill -f]]. الموقع فضل واقع ١٢ دقيقة. السبب: ملف التجديد كان فيه [[pre_hook = systemctl stop nginx]] (من أيام [[--standalone]])، والـ pre_hook اشتغل، والقتل جه قبل الـ [[post_hook]] اللي بيشغّل nginx تاني. وكمان [[pkill -f]] قتل الـ shell بتاع الأمر نفسه.

القضية كاملة: إزاي تعرف في دقيقة إن nginx «اتوقف» مش «وقع»، ومين وقّفه وإمتى من اللوجات، وتشغّله، وبعدين تحوّل التجديد لـ webroot (Nginx فاضل شغّال وcertbot بيحط ملف التحدي في فولدر) و deploy hook بيعمل reload. ومعاها ٣ فخاخ ظهرت في الطريق: مسار webroot قديم (404)، وredirect على كل حاجة، و [[grep -r]] مش بيدخل الـ symlinks.`,
          example: R`systemctl is-active nginx
journalctl -u nginx -n 5 --no-pager
ss -tlnp | grep -E ':(80|443) ' || echo "no listener on 80/443"
pgrep -ax certbot || echo "no certbot running"
sudo grep -nE "hook|authenticator|webroot" /etc/letsencrypt/renewal/*.conf
sudo grep -E "hook|signal" /var/log/letsencrypt/letsencrypt.log | tail -5
sudo nginx -t && sudo systemctl start nginx
sudo certbot reconfigure --cert-name shop.example --webroot -w /var/www/html --pre-hook "" --post-hook ""
sudo certbot renew --dry-run --no-random-sleep-on-renew`,
          lines: [
            R`أسرع سؤال: nginx نفسه شغّال؟ بيطبع كلمة واحدة: [[active]] أو [[inactive]] أو [[failed]]. لو [[inactive]] يبقى مش محتاج تدوّر في DNS ولا الفايروول لسه.`,
            R`آخر ٥ سطور من لوج nginx في systemd. الفرق المهم: [[Stopped nginx.service]] يعني حد طلب إيقافه بنظام، و [[failed]] أو [[Main process exited]] يعني وقع لوحده. والسطر فيه الوقت بالثانية، وده اللي هنطابقه بعدين.`,
            R`مين ماسك بورت 80 و 443؟ [[-t]] TCP و [[-l]] اللي بيسمعوا بس و [[-n]] أرقام و [[-p]] اسم البرنامج. ولو مفيش سطر، [[||]] بتطبع الجملة عشان تعرف إن الفاضي ده نتيجة مش غلطة.`,
            R`فيه certbot لسه شغّال؟ [[-x]] يطابق اسم البروسس بالظبط (مش أي سطر أمر فيه الكلمة)، و [[-a]] يطبع الأمر كامل. ده مهم قبل ما تشغّل nginx: لو certbot لسه في النص ممكن يكون ماسك بورت 80.`,
            R`ملف التجديد بتاع كل شهادة بيقول certbot هيجدد إزاي: هنا لقينا [[pre_hook = systemctl stop nginx]] و [[post_hook = systemctl start nginx]] و [[authenticator = standalone]]. [[-n]] رقم السطر، و [[-E]] عشان [[|]] تبقى «أو».`,
            R`لوج certbot نفسه: إمتى اشتغل الـ pre-hook، وإيه اللي حصل بعده. لقينا [[Running pre-hook command]] وبعدها [[Encountered signals: [15]]] ومفيش [[post-hook]] خالص. [[tail -5]] آخر ٥ سطور بس.`,
            R`رجّع الموقع: [[nginx -t]] يتأكد إن الإعدادات سليمة الأول، و [[&&]] معناها «لو نجح بس». لو الإعداد بايظ، [[start]] كان هيفشل برضه بس انت مش هتعرف ليه.`,
            R`الحل الدائم في أمر واحد: [[reconfigure]] بيغيّر طريقة التجديد لشهادة موجودة، و [[--webroot -w /var/www/html]] يحط ملف التحدي في الفولدر ده و nginx يقدّمه، و [[--pre-hook ""]] و [[--post-hook ""]] بيفضّوا الـ hooks القديمة. وقبل ما يحفظ بيعمل تجربة، ولو فشلت مبيحفظش.`,
            R`التأكيد: بروفة تجديد كاملة. [[--no-random-sleep-on-renew]] يلغي الانتظار العشوائي (لحد ٨ دقايق) اللي certbot بيعمله لما يتشغّل من غير ترمنال، فمتفتكرهوش «معلّق».`,
          ],
          try: R`ابني المعمل اللي في الشرح (Pebble و سيرفر Ubuntu بـ systemd و nginx و certbot)، واعمل الشهادة بـ [[--standalone]] و hooks الإيقاف والتشغيل. شغّل لوب curl من كونتينر تاني، وأعد الحادثة: [[renew --dry-run]] في الخلفية، و [[docker pause]] لـ Pebble بعد سطر الـ pre-hook، و [[pkill -f]]. عدّ كام [[000]]. وبعدين حوّل لـ webroot وكرّر نفس القتل، وعدّ تاني.`,
          teach: R`## العَرَض

بعد ما الدومين اتنقل لسيرفر جديد، اتشغّل [[certbot renew --dry-run]] «عشان نطمن إن التجديد هيشتغل هنا». الأمر بان إنه واقف، فاتقتل. وبعد دقايق: الموقع مش بيفتح خالص. من أي جهاز بره:

~~~text curl من بره (لوب كل ثانية)
08:29:47 200
08:29:48 000
08:29:49 000
08:29:50 000
...
~~~

~~~text curl -sS https://shop.example/
curl: (7) Failed to connect to shop.example port 443 after 0 ms: Couldn't connect to server
~~~

[[000]] معناها curl ماخدش أي رد HTTP. و [[after 0 ms]] و [[Couldn't connect]] معناها السيرفر رد فورًا بـ «مفيش حد هنا» (connection refused). ده مهم: الفايروول اللي بيقفل غالبًا **بيرمي** الطلب فتستنى لحد الـ timeout، لكن الرفض الفوري معناه إن الجهاز موجود ومفيش برنامج ماسك البورت. فالشك الأول: nginx نفسه.

---

## المعمل: نعيد الحادثة بأسامي مخترعة

مفيش دومين حقيقي، فاستخدمنا **Pebble**: سيرفر ACME صغير بتاع Let's Encrypt نفسها معمول للاختبار (بيدّي شهادات تجربة وبيعمل نفس التحدي اللي Let's Encrypt بيعمله). كله على شبكة Docker اسمها [[caselab]] (عناوين [[198.51.100.0/24]]، دي من النطاقات المحجوزة للتوثيق):

- [[pebble]] على [[198.51.100.100]]: سيرفر الشهادات. غيّرنا في إعداده [[httpPort]] من 5002 لـ 80 عشان يتحقق على بورت 80 زي Let's Encrypt.
- [[web1]] على [[198.51.100.9]]: Ubuntu 24.04 شغّال بـ systemd (عشان [[systemctl]] يشتغل بجد)، فيه nginx 1.24.0 و certbot 2.9.0. والدومينين [[shop.example]] و [[shop-api.example]] أسامي على نفس الكونتينر (network alias)، فـ Pebble لما يسأل عنهم بيوصل لـ web1.
- [[client]]: كونتينر تالت بيعمل لوب curl كل ثانية، ده «الزوار».

~~~bash
docker run -d --name web1 --network caselab --ip 198.51.100.9 \
  --network-alias shop.example --network-alias shop-api.example \
  --privileged --cgroupns=host -v /sys/fs/cgroup:/sys/fs/cgroup:rw \
  --tmpfs /run --tmpfs /run/lock web1-image
~~~

[[--privileged]] و [[--cgroupns=host]] و [[-v /sys/fs/cgroup...]] و [[--tmpfs /run]] هما اللي محتاجهم systemd عشان يشتغل جوه كونتينر (الـ image فيها [[CMD ["/sbin/init"]]]). ده للمعمل بس.

وحاجتين **للمعمل بس، ومتعملهمش على سيرفر حقيقي**:

- [[REQUESTS_CA_BUNDLE=/root/pebble-ca.pem]]: بيقول لمكتبة [[requests]] اللي جوه certbot «صدّق الشهادة دي»، لأن Pebble بشهادة مش من جهة معروفة. على سيرفر حقيقي مش محتاجه، ولو حطيته غلط هيكسر اتصال certbot بـ Let's Encrypt الحقيقي.
- [[--server https://pebble:14000/dir]] على **كل** أمر. اكتشفنا ده بالطريقة الصعبة: ملف التجديد كان مكتوب فيه [[server = https://pebble:14000/dir]]، ومع ذلك [[--dry-run]] راح لسيرفر الاختبار الحقيقي بتاع Let's Encrypt:

~~~text certbot renew --dry-run (من غير --server)
Failed to renew certificate shop.example with error: HTTPSConnectionPool(host='acme-staging-v02.api.letsencrypt.org', port=443): Max retries exceeded with url: /directory (Caused by SSLError(...CERTIFICATE_VERIFY_FAILED...))
~~~

يعني [[--dry-run]] بيبدّل السيرفر لـ staging لوحده، إلا لو اديته [[--server]] صريح. (الـ help بتاعه بيقول كده: [[The test server may be overridden with --server]].)

والحالة الأولانية زي السيرفر الحقيقي بالظبط: الشهادتين معمولين بـ [[--standalone]] و hooks:

~~~bash
sudo certbot certonly --standalone -d shop.example \
  --pre-hook "systemctl stop nginx" --post-hook "systemctl start nginx"
~~~

---

## ١. الحادثة نفسها، في المعمل

~~~bash
# على web1، في الخلفية زي ما اتعمل في الحقيقة
sudo certbot renew --dry-run --no-random-sleep-on-renew > /root/renew.out 2>&1 &
# أول ما سطر الـ pre-hook يظهر في اللوج: نجمّد Pebble عشان certbot «يعلّق»
docker pause pebble
~~~

[[docker pause]] بيجمّد كل البروسسات جوه الكونتينر من غير ما يقفلها، فـ certbot بيبعت طلب ومحدش بيرد. ده بيمثّل اللي حصل فعلًا: certbot فضل مستني على الدومين التاني دقايق.

~~~text ps -o pid,etime,stat,cmd -C certbot  (بعد ٧ ثواني)
    PID     ELAPSED STAT CMD
    378       00:07 Sl   /usr/bin/python3 /usr/bin/certbot renew --dry-run --no-random-sleep-on-renew --server https://pebble:14000/dir
~~~

[[-C certbot]] بروسس اسمه certbot، و [[etime]] شغّال من قد إيه (هنا ٧ ثواني)، و [[stat]] حالته ([[S]] نايم مستني حاجة، و [[l]] فيه أكتر من thread). ودي اللحظة اللي nginx كان واقف فيها فعلًا:

~~~text systemctl is-active nginx
inactive
~~~

وبعدين جه القتل، من جلسة تانية (في الحقيقة كانت [[ssh web1 '...']]، وفي المعمل [[docker exec web1 bash -c '...']]: نفس الشكل، أمر جوه [[bash -c]]):

~~~bash
bash -c 'pkill -f "certbot renew"; echo "pkill done, exit=$?"'
echo "exit: $?"
~~~

~~~text الناتج
exit: 143
~~~

سطر [[pkill done]] **مااتطبعش**. [[143]] = 128 + 15، يعني الـ shell نفسه اتقتل بالإشارة رقم 15 ([[SIGTERM]]). ده أول فخ، وراجعله في الجزء ٣.

---

## ٢. التشخيص بالترتيب، وليه الترتيب ده

القاعدة: ابدأ بالأسرع والأرخص اللي بيقفل احتمال كبير، وماتلمسش حاجة لسه.

### الخطوة ١: [[systemctl is-active nginx]]

~~~text الناتج
inactive
~~~

ثانية واحدة، وقفلت ٣ احتمالات: مش DNS، ومش شهادة، ومش التطبيق ورا nginx. nginx نفسه مش شغّال.

### الخطوة ٢: وقع ولا اتوقف؟ [[systemctl status]] و [[journalctl]]

~~~text systemctl status nginx --no-pager | head -4
○ nginx.service - A high performance web server and a reverse proxy server
     Loaded: loaded (/usr/lib/systemd/system/nginx.service; enabled; preset: enabled)
     Active: inactive (dead) since Tue 2026-11-03 08:29:48 UTC; 25s ago
   Duration: 1min 10.227s
~~~

~~~text journalctl -u nginx -n 5 --no-pager
Nov 03 08:28:52 web1 systemd[1]: Reloaded nginx.service - A high performance web server and a reverse proxy server.
Nov 03 08:29:48 web1 systemd[1]: Stopping nginx.service - A high performance web server and a reverse proxy server...
Nov 03 08:29:48 web1 systemd[1]: nginx.service: Deactivated successfully.
Nov 03 08:29:48 web1 systemd[1]: Stopped nginx.service - A high performance web server and a reverse proxy server.
~~~

اقرا الكلمات: [[inactive (dead)]] مش [[failed]]، و [[Stopping]] ثم [[Deactivated successfully]] ثم [[Stopped]]. ده شكل «حد قال [[systemctl stop]]». لو nginx كان وقع لوحده كنت هتشوف [[failed]] و [[Main process exited, code=...]]. والأهم: الوقت **08:29:48** بالثانية. مين عمل stop في الثانية دي؟

### الخطوة ٣: [[ss -tlnp]]

~~~text الناتج
no listener on 80/443
~~~

بتأكد الصورة: مفيش ولا برنامج ماسك 80 ولا 443. وده كمان بيخرّج الفايروول من الشك: الفايروول مبيخليش البورت «مش متمسوك»، هو بيقفل الطريق ليه بس.

### الخطوة ٤: [[pgrep -ax certbot]]

~~~text الناتج (في الحادثة، بعد القتل)
no certbot running
~~~

ليه نسأل قبل ما نشغّل nginx؟ لو certbot لسه شغّال بـ [[standalone]] ممكن يكون ماسك بورت 80 بسيرفره الصغير، فـ nginx مش هيعرف يقوم، أو تقوّمه وcertbot يفشل في النص. لازم تعرف مين في الملعب الأول.

### الخطوة ٥: مين اللي بيوقّف nginx؟ ملفات التجديد

~~~text sudo grep -nE "hook|authenticator|webroot" /etc/letsencrypt/renewal/*.conf
/etc/letsencrypt/renewal/shop-api.example.conf:12:pre_hook = systemctl stop nginx
/etc/letsencrypt/renewal/shop-api.example.conf:13:post_hook = systemctl start nginx
/etc/letsencrypt/renewal/shop-api.example.conf:15:authenticator = standalone
/etc/letsencrypt/renewal/shop.example.conf:12:pre_hook = systemctl stop nginx
/etc/letsencrypt/renewal/shop.example.conf:13:post_hook = systemctl start nginx
/etc/letsencrypt/renewal/shop.example.conf:15:authenticator = standalone
~~~

### الخطوة ٦: الخط الزمني من لوج certbot

~~~text sudo grep -E "hook|signal" /var/log/letsencrypt/letsencrypt.log
2026-11-03 08:29:48,665:INFO:certbot.compat.misc:Running pre-hook command: systemctl stop nginx
2026-11-03 08:30:01,483:DEBUG:certbot._internal.error_handler:Encountered signals: [15]
2026-11-03 08:30:01,766:DEBUG:certbot._internal.error_handler:Calling signal 15
~~~

الـ pre-hook اشتغل في **08:29:48**، نفس ثانية [[Stopped nginx.service]] في الـ journal. وبعدها بـ ١٣ ثانية جاله [[SIGTERM]] (إشارة 15)، و **مفيش ولا سطر [[post-hook]]**. الدليل كامل: مين وقّف nginx (الـ pre-hook)، وإمتى (08:29:48)، وليه ماقامش (الـ post-hook ما اتنفّذش).

### اللي استبعدناه وليه

| الاحتمال | ليه مش هو |
|---|---|
| الفايروول | الرفض فوري ([[after 0 ms]])، والفايروول بيخلّي الطلب يستنى لحد الـ timeout. وكمان [[ss]] بيقول مفيش listener أصلًا |
| DNS | [[dig +short shop.example]] بيرجّع IP السيرفر الجديد، والرسالة [[Couldn't connect]] مش [[Could not resolve host]] |
| الشهادة | شهادة منتهية بتطلّع خطأ TLS بعد ما الاتصال يتفتح، مش رفض للاتصال نفسه |
| nginx وقع لوحده | الـ journal فيه [[Stopped]] مش [[failed]] |

---

## ٣. السبب: حاجتين مع بعض

### (أ) الـ pre_hook والـ post_hook مش عملية واحدة

certbot بيشغّل الـ pre-hook، ويعمل التحدي، وفي **الآخر** يشغّل الـ post-hook. لو البروسس اتقتل في النص، مفيش حد هيشغّل الـ post-hook. certbot بيمسك [[SIGTERM]] فعلًا ([[Encountered signals: [15]]])، بس كل اللي بيعمله إنه ينضّف التحدي ويطلع، والـ post-hook مش جزء من التنضيف ده. ونفس الكلام لو السيرفر عمل reboot، أو [[timeout]] قتله، أو [[Ctrl+C]] من ترمنال.

يعني أي سيرفر شغّال بـ [[standalone]] و hooks الإيقاف والتشغيل، الموقع فيه «معلّق» على إن certbot يكمّل لآخره كل مرة.

### (ب) [[pkill -f]] قتل الـ shell بتاعه هو

[[-f]] معناها «دوّر في سطر الأمر كله مش اسم البرنامج بس». وسطر أمر الـ shell اللي بيشغّل كلامك هو نفسه فيه الجملة:

~~~text pgrep -af "certbot renew"  (جوه bash -c)
372 bash -c certbot renew --dry-run --no-random-sleep-on-renew --server https://pebble:14000/dir > /root/renew.out 2>&1
378 /usr/bin/python3 /usr/bin/certbot renew --dry-run --no-random-sleep-on-renew --server https://pebble:14000/dir
405 bash -c pgrep -af "certbot renew"; echo ---; pgrep -af "[c]ertbot renew"
~~~

السطر [[405]] ده الـ shell بتاعي أنا. [[pgrep]] و [[pkill]] بيستثنوا نفسهم بس، مش الـ shell اللي شغّلهم. فـ [[pkill -f "certbot renew"]] بعت SIGTERM لـ certbot **ولـ الـ shell بتاعي**. وعلى ssh، الـ shell ده هو جلستك على السيرفر، فالاتصال بيقفل في وشّك وتفتكر السيرفر هو اللي فيه مشكلة.

> ملحوظة: لو الأمر جوه [[bash -c]] أمر واحد بسيط، bash ساعات بيستبدل نفسه بيه (exec) فمفيش shell يتقتل. الفخ بيظهر لما يكون فيه أكتر من أمر ([[;]] أو [[&&]] أو [[|]])، وده الطبيعي في أي سطر ssh.

---

## ٤. الإصلاح الفوري: رجّع الموقع

~~~bash
sudo nginx -t && sudo systemctl start nginx
systemctl is-active nginx
curl -sk -o /dev/null -w "%{http_code}\n" https://shop.example/
~~~

~~~text الناتج
nginx: configuration file /etc/nginx/nginx.conf test is successful
active
200
~~~

ده بيرجّع الموقع بس. لو وقفت هنا، التجديد الأوتوماتيك بعد شهرين هيعمل نفس الحكاية (بس هيكمّل لآخره غالبًا، فالموقع هيقف ثواني كل مرة)، وأي قتل تاني هيوقّعه تاني.

---

## ٥. الإصلاح الدائم: webroot و deploy hook

الفكرة: مع [[webroot]] nginx فاضل شغّال طول الوقت. certbot بيكتب ملف التحدي في فولدر ([[/var/www/html/.well-known/acme-challenge/]])، و nginx بيقدّمه على بورت 80. مفيش stop، فمفيش حاجة تتساب واقفة.

### الخطوة ١: nginx يقدّم الفولدر على بورت 80 لكل دومين

~~~text /etc/nginx/sites-available/shop-api.example (بلوك بورت 80)
server {
    listen 80;
    server_name shop-api.example;
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }
    location / {
        return 301 https://$host$request_uri;
    }
}
~~~

[[root /var/www/html]] جوه الـ location معناها: طلب [[/.well-known/acme-challenge/abc]] يتقري من [[/var/www/html/.well-known/acme-challenge/abc]]. وأي حاجة تانية تتحوّل لـ https عادي.

### الخطوة ٢ (والفخ الأول): الـ hooks القديمة لازم تتشال

أول محاولة كانت [[certbot reconfigure --cert-name shop.example --webroot -w ...]] من غير ما نلمس الـ hooks:

~~~text الناتج
  Domain: shop.example
  Type:   connection
  Detail: Get "http://shop.example:80/.well-known/acme-challenge/JBH0ye...": dial tcp 198.51.100.9:80: connect: connection refused
~~~

[[connection refused]] وإحنا عاملين webroot؟ اللوج قال السبب: [[Running pre-hook command: systemctl stop nginx]]. الـ pre-hook القديم لسه في الملف، فوقّف nginx قبل التحدي، والتحدي بقى محتاج nginx! عشان كده [[--pre-hook ""]] و [[--post-hook ""]] لازم يبقوا في نفس الأمر.

### الفخ التاني: مسار webroot قديم بيرجّع 404

على السيرفر المنقول، ملف التجديد كان فيه مسار من أيام سيرفر قديم:

~~~text /etc/letsencrypt/renewal/shop.example.conf (جزء)
authenticator = webroot
webroot_path = /var/www/old_app,
[[webroot_map]]
shop.example = /var/www/old_app
~~~

[[webroot_map]] ده جدول «لكل دومين، اكتب ملف التحدي فين». و nginx بيقرا من [[/var/www/html]]. فـ certbot كتب الملف في مكان، و nginx بيدوّر في مكان تاني:

~~~text certbot renew --dry-run
  Domain: shop.example
  Type:   unauthorized
  Detail: Non-200 status code from HTTP: http://shop.example:80/.well-known/acme-challenge/Donqo6...: returned 404
~~~

(دي صياغة Pebble. Let's Encrypt الحقيقي بيكتبها بكلام تاني، بس الرقم 404 والمعنى واحد.)

### الفخ التالت: redirect على كل حاجة

[[shop-api.example]] كان بلوك بورت 80 بتاعه سطر واحد [[return 301 https://...]] من غير [[location]] للتحدي. السيرفر بتاع الشهادات **بيتبع** الـ redirect لـ https، فبيوصل للتطبيق نفسه ويقرا رده:

~~~text الناتج
  Domain: shop-api.example
  Type:   unauthorized
  Detail: The key authorization file from the server did not match this challenge "byONzJk...zPkW1B1b..." != "api ok"
~~~

[[!= "api ok"]]: ده رد التطبيق على أي مسار. يعني التحدي وصل للتطبيق مش للملف.

### إزاي تشخّص الفخين دول من غير certbot: ملف تجربة

~~~bash
sudo mkdir -p /var/www/html/.well-known/acme-challenge
echo ok | sudo tee /var/www/html/.well-known/acme-challenge/t.txt
curl -si --resolve shop.example:80:127.0.0.1 http://shop.example/.well-known/acme-challenge/t.txt | head -1
curl -si --resolve shop-api.example:80:127.0.0.1 http://shop-api.example/.well-known/acme-challenge/t.txt | grep -iE "^HTTP|^location"
~~~

~~~text الناتج
HTTP/1.1 200 OK
HTTP/1.1 301 Moved Permanently
Location: https://shop-api.example/.well-known/acme-challenge/t.txt
~~~

- [[tee]] بيكتب في ملف محتاج صلاحيات root (الـ [[>]] العادي بيتنفّذ بصلاحياتك انت قبل sudo).
- [[--resolve shop.example:80:127.0.0.1]]: اطلب الدومين ده من الجهاز نفسه، من غير DNS. فبتختبر إعداد nginx هنا بالظبط، حتى قبل ما الـ DNS يتنقل.
- الأول 200 (nginx بيقدّم الفولدر صح، فالمشكلة في مسار certbot)، والتاني 301 (nginx نفسه محتاج [[location]]).

وبعدين قارن مكان الكتابة بمكان القراية:

~~~text sudo grep -A1 "webroot_map" /etc/letsencrypt/renewal/*.conf
/etc/letsencrypt/renewal/shop.example.conf:[[webroot_map]]
/etc/letsencrypt/renewal/shop.example.conf-shop.example = /var/www/old_app
~~~

~~~text sudo grep -rn "acme-challenge" /etc/nginx/sites-enabled/ ; echo "exit=$?"
exit=1
~~~

فاضي؟! ده فخ رابع: الملفات في [[sites-enabled]] **symlinks**، و [[grep -r]] مبيدخلش الـ symlinks اللي جوه الفولدر (بيتبعها بس لو انت كاتبها بنفسك في الأمر). الصح [[grep -R]] (حرف كبير)، أو [[nginx -T]] اللي بيطبع الإعداد كله زي ما nginx شايفه:

~~~text sudo grep -Rn -A2 "acme-challenge" /etc/nginx/sites-enabled/
/etc/nginx/sites-enabled/shop.example:4:    location /.well-known/acme-challenge/ {
/etc/nginx/sites-enabled/shop.example-5-        root /var/www/html;
~~~

### الخطوة ٣: [[certbot reconfigure]] لكل شهادة

~~~bash
sudo certbot reconfigure --cert-name shop.example --webroot -w /var/www/html --pre-hook "" --post-hook ""
~~~

~~~text الناتج
Simulating renewal of an existing certificate for shop.example
Successfully updated configuration.
Changes will apply when the certificate renews.
~~~

~~~text grep -nE "hook|authenticator|webroot" /etc/letsencrypt/renewal/shop.example.conf
13:pre_hook = ""
14:post_hook = ""
15:authenticator = webroot
17:webroot_path = /var/www/html,
18:[[webroot_map]]
~~~

[[reconfigure]] (موجود من certbot 2.3) أحسن من إنك تعدّل الملف بإيدك: بيعمل بروفة الأول، **ولو فشلت مبيحفظش** (جرّبناه بمسار غلط والملف فضل زي ما هو). و [[pre_hook = ""]] معناها «مفيش hook»: البروفة اللي بعدها مافيهاش ولا سطر [[Running pre-hook]].

### الخطوة ٤: deploy hook بيعمل reload

الشهادة الجديدة لازم nginx يقراها. [[deploy hook]] بيتنفّذ **بس لما شهادة تتجدد فعلًا**، وأي ملف تنفيذي في [[/etc/letsencrypt/renewal-hooks/deploy/]] بيتنفّذ لكل الشهادات:

~~~bash
printf '#!/bin/sh\nnginx -t -q && systemctl reload nginx\n' | sudo tee /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh
sudo chmod +x /etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh
~~~

- [[reload]] مش [[restart]]: nginx بيقرا الشهادة الجديدة من غير ما يقطع ولا طلب.
- [[nginx -t -q]]: لو حد بوّظ الإعداد، الـ reload مايحصلش. و [[-q]] عشان من غيرها [[nginx -t]] بيكتب سطرين على stderr، و certbot بيعتبر أي حاجة على stderr تحذير. جرّبناها من غير [[-q]]:

~~~text الناتج
Hook 'deploy-hook' ran with error output:
 nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
 nginx: configuration file /etc/nginx/nginx.conf test is successful
~~~

### الانتظار العشوائي: ليه certbot «بيعلّق» أصلًا؟

لما شغّلنا [[certbot renew --dry-run]] من غير ترمنال (في الخلفية أو من سكربت) لقينا في اللوج:

~~~text الناتج
Certificate not due for renewal, but simulating renewal for dry run
Non-interactive renewal: random delay of 464.0920496465903 seconds
~~~

يعني هيستنى ٧ دقايق ونص قبل ما يعمل أي حاجة، عشان ملايين السيرفرات متضربش Let's Encrypt في نفس الثانية. اللي مايعرفش ده بيفتكره معلّق ويقتله. وانت بتجرّب بإيدك: [[--no-random-sleep-on-renew]]. والتجديد الأوتوماتيك في أوبونتو مظبوط لوحده: الـ timer فيه [[RandomizedDelaySec=43200]] (توزيع على ١٢ ساعة)، والخدمة بتشغّل [[certbot -q renew --no-random-sleep-on-renew]] (من [[systemctl cat certbot.service certbot.timer]]).

---

## ٦. اتأكد إنها اتحلّت

لوب الـ curl شغّال من الكونتينر التاني، وفي نفس الوقت:

~~~bash
sudo certbot renew --dry-run --no-random-sleep-on-renew --run-deploy-hooks
~~~

~~~text الناتج
Congratulations, all simulated renewals succeeded:
  /etc/letsencrypt/live/shop-api.example/fullchain.pem (success)
  /etc/letsencrypt/live/shop.example/fullchain.pem (success)
~~~

~~~text awk '{print $2}' watch.log | sort | uniq -c
      8 200
~~~

كل الطلبات 200. و [[--run-deploy-hooks]] بيخلّي البروفة تشغّل الـ deploy hook (من غيره اللوج بيقول [[Dry run: skipping deploy hook command]])، و [[journalctl -u nginx -n 3]] بعدها فيه [[Reloaded nginx.service]].

ونفس اختبار القتل اللي وقّع الموقع: certbot معلّق و [[kill]] برقمه:

~~~text الناتج
PID=755
certbot gone
active
      7 200
~~~

nginx فاضل [[active]]، والزوار مأخدوش ولا [[000]].

---

## ٧. إزاي تقتل بروسس صح لما تحتاج

| الطريقة | اللي حصل في المعمل | الحكم |
|---|---|---|
| [[pkill -f "certbot renew"]] | قتل الـ shell بتاعي معاه (exit 143) | ❌ |
| [[pgrep -f "[c]ertbot renew"]] | الـ regex [[[c]ertbot]] بيطابق «certbot» بس النص نفسه [[[c]ertbot]] مبيطابقش نفسه. اشتغل، **إلا** لما سطر الأمر بتاعي كان فيه [[/usr/bin/certbot]] في حتة تانية فطابقني برضه | ⚠️ هش |
| [[pgrep -ax certbot]] ثم [[kill <PID>]] | [[-x]] بيطابق اسم البروسس بالظبط (certbot)، مش سطر الأمر، فمستحيل يطابق الـ shell | ✅ |

وقبل أي [[kill]] اسأل: هو فعلًا معلّق؟ [[ps -o pid,etime,stat,cmd -p <PID>]] بيقولك شغّال من قد إيه، و [[tail -n 8 /var/log/letsencrypt/letsencrypt.log]] بيقولك واقف على إيه (لو آخر سطر [[random delay]] يبقى مش معلّق، ده مستني).

---

## ٨. متتكررش

- **مفيش [[standalone]] على سيرفر عليه nginx.** يا [[webroot]] يا [[--nginx]]. وابحث عن الخطر قبل ما يحصل: [[sudo grep -l "authenticator = standalone" /etc/letsencrypt/renewal/*.conf]].
- **بعد نقل سيرفر:** جرّب مسار التحدي بملف تجربة و [[curl --resolve]] **قبل** ما الـ DNS يتنقل، و [[certbot renew --dry-run]] بعده على طول وانت قاعد.
- **الأوامر الطويلة على السيرفر جوه [[tmux]]**، عشان قفل الـ ssh مايبقاش «قتل».
- **[[timeout]] مش حل مع standalone:** [[timeout 300 certbot renew]] بيبعت نفس الـ SIGTERM وبيسيب nginx واقف بالظبط زي [[pkill]].
- **مراقبة من بره:** فحص كل دقيقة على [[https://shop.example/]] كان هيقولك في دقيقة بدل ١٢ (وحدة «لوحات وتنبيهات» في نفس التاب).

---

## الخلاصة

| الخطوة | الأمر | قفل إيه |
|---|---|---|
| ١ | [[systemctl is-active nginx]] | nginx نفسه واقف |
| ٢ | [[journalctl -u nginx -n 5]] | [[Stopped]] مش [[failed]]: حد وقّفه، والوقت بالثانية |
| ٣ | [[ss -tlnp]] | مفيش listener، فمش فايروول |
| ٤ | [[pgrep -ax certbot]] | مين لسه في الملعب |
| ٥ | [[grep hook renewal/*.conf]] | الـ pre_hook هو اللي بيوقّف |
| ٦ | [[grep hook letsencrypt.log]] | pre-hook في نفس الثانية، و post-hook مفيش |
| فوري | [[nginx -t && systemctl start nginx]] | الموقع رجع |
| دائم | [[certbot reconfigure --webroot ... --pre-hook "" --post-hook ""]] + deploy hook | مفيش stop تاني |
| تأكيد | [[renew --dry-run]] ولوب curl | كله 200 |

> الـ pre_hook والـ post_hook مش «عملية واحدة»: أي حاجة تقتل certbot بينهم بتسيب اللي الـ pre_hook عمله زي ما هو.`,
          deep: {
            why: R`الحادثة دي بتعلّمك حاجتين أكبر من certbot: (١) أي «اعمل حاجة، وبعدين ارجعها» (وقّف ثم شغّل، اقفل ثم افتح، غيّر ثم رجّع) هشة لو اللي بيرجّعها ممكن ميتنفّذش. التصميم الأحسن هو اللي مش محتاج يرجّع حاجة أصلًا (webroot). (٢) الترتيب في التشخيص بيوفّر وقت: [[is-active]] و [[journalctl]] قالوا «حد وقّفه الساعة 08:29:48» في أقل من دقيقة، ولوج certbot قال مين.`,
            how: R`certbot لكل شهادة عنده ملف في [[/etc/letsencrypt/renewal/]] فيه الطريقة ([[authenticator]]) والـ hooks اللي اتعملت بيها الشهادة أول مرة، و [[renew]] بيقراه. مع [[standalone]] certbot بيشغّل سيرفر HTTP صغير بتاعه على بورت 80، فلازم nginx يفضّي البورت: الـ [[pre_hook]] بيتنفّذ مرة قبل أول شهادة محتاجة تجديد، والـ [[post_hook]] مرة في آخر الـ run كله. لو البروسس اتقتل بينهم (SIGTERM أو SIGKILL أو reboot)، الـ post_hook مش بيتنفّذ. مع [[webroot]] certbot بيكتب ملف اسمه token في [[<webroot>/.well-known/acme-challenge/]] وسيرفر الشهادات بيطلبه بـ HTTP على بورت 80 ويتأكد من محتواه، و nginx هو اللي بيقدّمه، فمفيش إيقاف. والـ [[deploy hook]] بيتنفّذ بعد ما شهادة تتجدد فعلًا بس، فده المكان الصح لـ [[systemctl reload nginx]]. و [[reconfigure]] بيعمل بروفة ([[Simulating renewal]]) ومبيحفظش لو فشلت.`,
            when: R`أي سيرفر عليه شهادات Let's Encrypt: افحص ملفات التجديد مرة بعد التسطيب، وبعد أي نقل سيرفر، وقبل ما تجرّب [[renew --dry-run]] على سيرفر عليه زوار. ونفس التشخيص (is-active ثم journal ثم ss ثم «مين لمسه») لأي خدمة لقيتها واقفة من غير ما حد يقولك.`,
            mistakes: R`تشغّل [[renew --dry-run]] في الخلفية وتقتله لما يبان «معلّق» وهو في الـ random delay. و [[pkill -f]] بكلمة موجودة في سطر أمرك انت. وتغيّر لـ webroot وتنسى تشيل [[pre_hook = systemctl stop nginx]] فالبروفة تفشل بـ [[connection refused]]. و [[webroot_map]] على مسار سيرفر قديم فـ 404. و [[return 301]] على كل بورت 80 من غير [[location /.well-known/acme-challenge/]]. و [[grep -r]] على [[sites-enabled]] فتفتكر مفيش إعداد وهو موجود. و deploy hook من غير [[chmod +x]] (certbot بيتجاهله). وتعدّل ملف التجديد بإيدك من غير نسخة احتياطية بدل [[reconfigure]].`
          },
          sol: R`في الحادثة: [[systemctl is-active nginx]] بيطبع [[inactive]]، والـ journal فيه [[Stopped nginx.service]] في نفس ثانية [[Running pre-hook command: systemctl stop nginx]] في لوج certbot، وبعدها [[Encountered signals: [15]]] ومفيش post-hook. ولوب الـ curl بيطبع [[000]] من ساعتها لحد [[systemctl start nginx]]. و [[bash -c 'pkill -f "certbot renew"; echo ...']] بيخرج بـ 143 من غير ما يطبع السطر التاني.

بعد الـ webroot: [[reconfigure]] بيطبع [[Successfully updated configuration.]]، والملف فيه [[authenticator = webroot]] و [[pre_hook = ""]]. و [[renew --dry-run]] بيخلص بـ [[Congratulations, all simulated renewals succeeded]] واللوب كله 200 (عندنا 8 من 8). وقتل certbot في النص بعدها بيسيب nginx [[active]] (عندنا 7 من 7 طلبات 200).

كله اتجرّب على Ubuntu 24.04 بـ systemd في Docker (nginx 1.24.0، certbot 2.9.0) قدام Pebble. الأرقام والأوقات عندك هتختلف.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: اكتب الـ ٦ خطوات تشخيص بالترتيب لما تلاقي موقع «مش بيفتح» و nginx هو السبب، وجنب كل خطوة الاحتمال اللي بتقفله. وبعدين قارن بجدول الخلاصة.`, done: R`الترتيب عندك: [[is-active]] ثم [[journalctl -u nginx]] ثم [[ss -tlnp]] ثم «مين لسه شغّال» ثم ملفات الإعداد ثم اللوج بتاع اللي لمسه، وجنب [[journalctl]] مكتوب الفرق بين [[Stopped]] و [[failed]]، وجنب [[ss]] ليه ده بيستبعد الفايروول.` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: شغّل [[bash -c 'exec -a "certbot renew --dry-run" sleep 60' &]] (بروسس اسمه في سطر الأمر «certbot renew»). قبل ما تنفّذ كل سطر من دول، اكتب هيطبع إيه وكود الخروج: [[bash -c 'pgrep -f "certbot renew" | wc -l']]، و [[bash -c 'pgrep -f "[c]ertbot renew" | wc -l']]، و [[bash -c 'pkill -f "certbot renew"; echo still here']].`, done: R`توقعت [[2]] ثم [[1]] (الأول بيطابق الـ bash بتاعه)، والتالت مبيطبعش [[still here]] و [[echo $?]] بعده [[143]]، والنتيجة طابقت. وتقدر تقول ليه [[pgrep -x]] كان هيتجنب ده كله.` },
            { lvl: 'تطبيق', t: R`صلّح الملف: ده ملف تجديد على سيرفر nginx بيقدّم التحدي من [[/var/www/html]]: [[authenticator = standalone]] و [[pre_hook = systemctl stop nginx]] و [[post_hook = systemctl start nginx]]. اكتب الأمر الواحد اللي يحوّله لـ webroot صح، واكتب الملف هيبقى شكله إيه بعده. وبعدين نفّذ على المعمل.`, done: R`الأمر فيه [[reconfigure --cert-name]] و [[--webroot -w /var/www/html]] و [[--pre-hook ""]] و [[--post-hook ""]] مع بعض، وطبع [[Successfully updated configuration.]]، و [[grep]] على الملف فيه [[authenticator = webroot]] و [[pre_hook = ""]]، ومحاولة من غير الـ hooks الفاضية فشلت بـ [[connection refused]] زي الدرس.` },
            { lvl: 'تطبيق', t: R`قارن وقيس: في المعمل، لوب curl كل نص ثانية من كونتينر العميل، وشغّل [[certbot renew --dry-run --no-random-sleep-on-renew]] مرة بطريقة standalone بالـ hooks ومرة بعد التحويل لـ webroot (من غير ما تقتل حاجة). عدّ الـ [[000]] في كل مرة بـ [[awk '{print $2}' watch.log | sort | uniq -c]].`, done: R`عندك رقمين حقيقيين: مع standalone فيه [[000]] (عدد قد ثواني الـ pre-hook لحد الـ post-hook، زي ٤ أو ٥)، ومع webroot صفر [[000]]، والفرق مكتوب في سطر.` },
            { lvl: 'تحدي', t: R`ابني [[find-standalone.sh]]: بيلف على ملفات [[*.conf]] في فولدر تديهوله، ويطبع لكل ملف اسم الشهادة والـ authenticator، ويطبع [[DANGER]] لو [[standalone]] ومعاه [[pre_hook]] فيه [[stop]]، ويطلع بكود 2 لو فيه أي DANGER. جرّبه على ٣ ملفات تعملهم بإيدك.`, done: R`على ملف standalone بـ hooks بيطبع [[DANGER]] وكود 2، وعلى ملف webroot بيطبع [[OK]] وكود 0، وعلى فولدر فاضي بيطبع [[no renewal configs]] وكود 0 ومبيقعش، ومفيش أي تعديل على الملفات.` },
            { lvl: 'تحدي', t: R`اشرحها: اكتب postmortem من غير لوم في ١٥ سطر للحادثة اللي عملتها في المعمل: الخط الزمني بالثواني من [[journalctl -u nginx]] و [[letsencrypt.log]] ولوب الـ curl (أول [[000]] وآخر [[000]])، والسبب في جملتين، و ٣ خطوات منع.`, done: R`كل وقت في الخط الزمني منسوخ من سطر لوج حقيقي، ومدة التوقف محسوبة من أول [[000]] لآخر واحد، والسبب فيه «الـ pre_hook اشتغل والـ post_hook لأ» و «pkill -f طابق الـ shell»، وخطوات المنع فيها webroot وطريقة قتل بالـ PID.` },
          ],
          ci: [
            { os: [R`ubuntu`], sh: R`bash`, run: R`bash -c 'exec -a "certbot renew --dry-run" sleep 30' &
sleep 0.5
echo "self-match: $(bash -c 'pgrep -f "certbot renew" | wc -l' | tr -d ' ')"
echo "bracket: $(bash -c 'pgrep -f "[c]ertbot renew" | wc -l' | tr -d ' ')"
bash -c 'pkill -f "certbot renew"; echo "this line never prints"'
echo "exit=$?"
sleep 0.3
pgrep -f "[c]ertbot renew" >/dev/null && echo "still running" || echo "fake certbot gone"`, expect: [R`self-match: 2`, R`bracket: 1`, R`exit=143`, R`fake certbot gone`] },
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`mkdir -p renewal
printf 'authenticator = standalone\npre_hook = systemctl stop nginx\npost_hook = systemctl start nginx\n' > renewal/shop.example.conf
printf 'authenticator = webroot\npre_hook = ""\nwebroot_path = /var/www/html,\n' > renewal/shop-api.example.conf
bad=0
for f in renewal/*.conf; do
  name=$(basename "$f" .conf)
  auth=$(grep -E '^authenticator' "$f" | cut -d= -f2 | tr -d ' ')
  if [ "$auth" = standalone ] && grep -qE '^pre_hook.*stop' "$f"; then echo "DANGER $name: $auth + stop hook"; bad=1; else echo "OK $name: $auth"; fi
done
echo "bad=$bad"`, expect: [R`DANGER shop.example: standalone + stop hook`, R`OK shop-api.example: webroot`, R`bad=1`] },
          ],
        },
        {
          cmd: "سرّع nginx على سيرفر شغّال",
          title: "HTTP/2 و gzip و brotli على موقع عليه زوار: قيس، غيّر، nginx -t، قيس تاني",
          learn: R`تسرّع موقع شغّال من غير ما تقع: تقيس الحجم والبروتوكول قبل، وتغيّر حاجة واحدة، وتختبرها بـ [[nginx -t]]، وتقيس بعد.`,
          out: R`جدول قبل/بعد: [[app.js]] من 89037 byte على HTTP/1.1 لـ 30362 على HTTP/2 بـ brotli.`,
          desc: R`«الموقع تقيل» على سيرفر عليه زوار: الحل المعروف HTTP/2 وضغط gzip و brotli، بس التعديل نفسه هو الخطر. سطر واحد غلط مع [[restart]] بيوقّع الموقع. الطريقة: قيس من بره بـ [[curl -w '%{size_download} %{http_version}']] قبل أي حاجة، وخد نسخة من الملف، وغيّر حاجة واحدة، و [[nginx -t]] قبل [[reload]] دايمًا، وقيس تاني بنفس الأمر.

في المعمل (Ubuntu 24.04 و nginx 1.24): الإعداد الافتراضي فيه [[gzip on]] بس الـ JS مكانش بيتضغط خالص، و [[http2 on;]] طلع [[unknown directive]] على النسخة دي، و [[restart]] بالإعداد الغلط وقّع الموقع، و [[gzip on]] متكرر رفضه [[nginx -t]]، وطلب جاي من CDN (فيه [[Via]]) مكانش بيتضغط. وفي الآخر [[app.js]] نزل من 89037 لـ 30362 byte (٦٦٪ أقل).`,
          example: R`curl -sk -o /dev/null -H 'Accept-Encoding: br' -w '%{size_download} %{http_version}\n' https://shop.example/assets/app.js
sudo cp /etc/nginx/sites-available/shop.example /root/shop.example.bak
sudo sed -i 's/listen 443 ssl;/listen 443 ssl http2;/' /etc/nginx/sites-available/shop.example
sudo cp perf.conf /etc/nginx/conf.d/perf.conf
sudo nginx -t && sudo systemctl reload nginx
curl -sk -o /dev/null -H 'Accept-Encoding: br' -w '%{size_download} %{http_version}\n' https://shop.example/assets/app.js
curl -skI -H 'Accept-Encoding: gzip, br' https://shop.example/assets/app.js | grep -iE '^HTTP|content-encoding|vary'`,
          lines: [
            R`القياس قبل أي تعديل، من جهاز بره السيرفر: [[-o /dev/null]] ارمي المحتوى، و [[-H 'Accept-Encoding: br']] قول للسيرفر إنك بتفهم brotli، و [[-w]] اطبع عدد الـ bytes اللي نزلت فعلًا ونسخة HTTP. [[-k]] في المعمل بس عشان الشهادة تجربة.`,
            R`نسخة احتياطية من ملف الموقع قبل ما تلمسه، عشان الرجوع يبقى أمر [[cp]] واحد مش «كان مكتوب إيه؟».`,
            R`HTTP/2 على nginx 1.24 (أوبونتو 24.04): بالصيغة القديمة [[listen 443 ssl http2;]]. على 1.25.1 وأحدث الصيغة [[http2 on;]] في سطر لوحده. [[sed -i]] بيعدّل الملف مكانه.`,
            R`ملف الضغط (gzip و brotli) في [[conf.d]]: أي [[.conf]] هناك بيتقري جوه [[http { }]] فبيشتغل على كل المواقع. محتواه في الشرح.`,
            R`اختبر الإعداد كله الأول، ولو سليم بس اعمل reload. [[reload]] بيشغّل workers جداد بالإعداد الجديد من غير ما يقطع ولا طلب.`,
            R`نفس أمر القياس بالظبط بعد التعديل، عشان المقارنة تبقى عادلة: الحجم المفروض يقل والـ version تبقى [[2]].`,
            R`[[-I]] الـ headers بس: [[HTTP/2 200]] و [[content-encoding: br]] و [[vary: Accept-Encoding]]. [[grep -iE]] من غير ما يفرق بين الحروف الكبيرة والصغيرة (HTTP/2 بيبعتها صغيرة).`,
          ],
          try: R`في المعمل (Ubuntu 24.04 فيه nginx وموقع بشهادة تجربة)، حط في [[assets]] ملف JS حقيقي ([[apt install libjs-jquery]] بيديك [[/usr/share/javascript/jquery/jquery.min.js]]). اعمل [[measure.sh]] اللي في الشرح، وسجّل الجدول قبل، وبعدين طبّق الخطوات واحدة واحدة وقيس بعد كل واحدة.`,
          teach: R`## العَرَض والقاعدة

صاحب الموقع بيقول «الصفحة بتاخد وقت على الموبايل». السيرفر شغّال وعليه زوار، فأي غلطة هتتشاف. القاعدة في القضية دي كلها:

1. **قيس قبل** من بره، بأمر ثابت تقدر تعيده.
2. **نسخة احتياطية** من كل ملف هتلمسه.
3. **غيّر حاجة واحدة**، و [[nginx -t]]، و [[reload]] (مش [[restart]]).
4. **قيس بعد** بنفس الأمر، وقارن بالأرقام.

---

## المعمل

Ubuntu 24.04 بـ systemd في Docker، nginx 1.24.0، وموقع [[shop.example]] على 443 بشهادة تجربة (نفس معمل درس «nginx وقف وقت certbot»). الملفات:

- [[/assets/app.js]]: [[jquery.min.js]] الحقيقي من باكدج [[libjs-jquery]] (89037 byte، JS متصغّر).
- [[/assets/vendor.js]]: [[jquery.js]] من غير تصغير (289782 byte).
- [[/]]: صفحة HTML فيها ٢٠٠ منتج (18564 byte).

والقياس من كونتينر تاني (العميل) بسكربت صغير:

~~~bash measure.sh
for f in / /assets/app.js /assets/vendor.js; do
  for enc in identity gzip br; do
    printf '%-18s %-9s ' "$f" "$enc"
    curl -sk -o /dev/null -H "Accept-Encoding: $enc" -w '%{size_download} %{http_version}\n' "https://shop.example$f"
  done
done
~~~

- [[identity]] معناها «من غير ضغط»، و [[gzip]] و [[br]] (brotli) الاتنين اللي المتصفحات بتطلبهم.
- [[%{size_download}]]: عدد الـ bytes اللي نزلت فعلًا على السلك (بعد الضغط). ده الرقم اللي بيفرق مع الموبايل.
- [[%{http_version}]]: [[1.1]] أو [[2]] أو [[3]].
- [[printf '%-18s']]: اطبع النص في خانة عرضها ١٨ حرف ومحاذاة شمال، عشان الجدول يطلع مترتب.

---

## ١. قبل: الإعداد الافتراضي

~~~text الناتج (قبل)
/                  identity  18564 1.1
/                  gzip      1937 1.1
/                  br        18564 1.1
/assets/app.js     identity  89037 1.1
/assets/app.js     gzip      89037 1.1
/assets/app.js     br        89037 1.1
/assets/vendor.js  identity  289782 1.1
/assets/vendor.js  gzip      289782 1.1
/assets/vendor.js  br        289782 1.1
~~~

اقرا الجدول: الـ HTML بس اللي اتضغط بـ gzip (18564 ← 1937)، والـ JS **مااتضغطش خالص** حتى لما طلبنا gzip. ليه؟

~~~text grep -n "gzip" /etc/nginx/nginx.conf
46:	gzip on;
48:	# gzip_vary on;
49:	# gzip_proxied any;
50:	# gzip_comp_level 6;
53:	# gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
~~~

[[gzip on]] موجود، بس [[gzip_types]] متعلّق عليه (#)، و [[gzip on]] لوحده بيضغط [[text/html]] بس. ده الفخ اللي بيخلّي الناس يقولوا «الضغط شغّال عندي» وهو شغّال على الصفحة بس. وكله على [[1.1]].

---

## ٢. HTTP/2: والفخ اللي بيوقّع الموقع

درس «HTTP/2 و HTTP/3» في تاب nginx بيقول إن [[http2 on;]] محتاج nginx 1.25.1 أو أحدث. جرّبناه على 1.24 عشان نشوف اللي بيحصل لو حد نسي:

~~~text sudo nginx -t
2026/11/03 08:33:20 [emerg] 1063#1063: unknown directive "http2" in /etc/nginx/sites-enabled/shop.example:13
nginx: configuration file /etc/nginx/nginx.conf test failed
~~~

ولو حد عمل reload من غير [[-t]]؟

~~~text sudo systemctl reload nginx
Job for nginx.service failed.
See "systemctl status nginx.service" and "journalctl -xeu nginx.service" for details.
~~~

~~~text systemctl is-active nginx ; curl ... https://shop.example/
active
200
~~~

الـ reload فشل، و nginx **فضل شغّال بالإعداد القديم**. الموقع سليم، بس التعديل ماتطبّقش (ولو مخدتش بالك من الرسالة هتفتكر إنه اتطبّق). أما [[restart]] بنفس الإعداد:

~~~text sudo systemctl restart nginx
Job for nginx.service failed because the control process exited with error code.
~~~

~~~text systemctl is-active nginx ; curl ... https://shop.example/
failed
000
~~~

الموقع **وقع**. [[restart]] = [[stop]] ثم [[start]]، والـ stop بينجح والـ start بيفشل. عشان كده القاعدة: [[nginx -t && systemctl reload nginx]] دايمًا، و [[restart]] بس لما تكون محتاجه فعلًا (زي تحميل module جديد في بعض الحالات).

الصح على 1.24:

~~~text /etc/nginx/sites-available/shop.example (بلوك 443)
server {
    listen 443 ssl http2;
    server_name shop.example www.shop.example;
    ...
}
~~~

و [[nginx -t]] عدّى و [[measure.sh]] بقى يطبع [[2]].

> ليه HTTP/2 بيفرق؟ HTTP/1.1 بيبعت طلب واحد في نفس الوقت على كل اتصال، فالمتصفح بيفتح ٦ اتصالات تقريبًا ويستنى. HTTP/2 بيبعت كل الطلبات على اتصال واحد مع بعض، وبيضغط الـ headers. الفرق بيبان في صفحة فيها ملفات كتير، مش في ملف واحد.

---

## ٣. الضغط: ملف [[conf.d/perf.conf]]

### brotli محتاج module

nginx بتاع أوبونتو مفيهوش brotli مبني جواه. في أوبونتو 24.04 (repo [[universe]]) فيه باكدجين بيضيفوه كـ dynamic module:

~~~bash
sudo apt install libnginx-mod-http-brotli-filter libnginx-mod-http-brotli-static
ls /etc/nginx/modules-enabled/
~~~

~~~text الناتج
50-mod-http-brotli-filter.conf
50-mod-http-brotli-static.conf
~~~

الملفات دي فيها [[load_module modules/ngx_http_brotli_filter_module.so;]] وأخوه، و [[nginx.conf]] بيقرا الفولدر ده في أوله. [[filter]] بيضغط وهو بيبعت، و [[static]] بيقدّم ملفات [[.br]] متضغطة مسبقًا لو موجودة.

### الملف

~~~text /etc/nginx/conf.d/perf.conf
gzip_vary on;
gzip_proxied any;
gzip_comp_level 5;
gzip_min_length 1024;
gzip_types text/plain text/css text/javascript application/javascript application/json application/xml image/svg+xml;

brotli on;
brotli_comp_level 5;
brotli_min_length 1024;
brotli_types text/plain text/css text/javascript application/javascript application/json application/xml image/svg+xml;
~~~

كل سطر gzip مشروح في درس «gzip» في تاب nginx. الجديد هنا:

- **مفيش [[gzip on]] في الملف.** جرّبنا نحطه:

~~~text sudo nginx -t
2026/11/03 08:33:38 [emerg] 1147#1147: "gzip" directive is duplicate in /etc/nginx/conf.d/perf.conf:1
nginx: configuration file /etc/nginx/nginx.conf test failed
~~~

لأنه مكتوب أصلًا في [[nginx.conf]] في نفس الـ [[http]] block. (والـ [[gzip_*]] التانية متعلّق عليها هناك، فمفيش تكرار.) ده بالظبط نوع الغلطة اللي [[nginx -t]] موجود عشانها.

- [[brotli on]] و [[brotli_comp_level]] و [[brotli_types]]: نفس فكرة gzip بالظبط. والـ [[text/html]] متضاف لوحده في الاتنين.

---

## ٤. بعد

~~~text الناتج (بعد HTTP/2 والضغط)
/                  identity  18564 2
/                  gzip      1894 2
/                  br        965 2
/assets/app.js     identity  89037 2
/assets/app.js     gzip      31218 2
/assets/app.js     br        30362 2
/assets/vendor.js  identity  289782 2
/assets/vendor.js  gzip      86815 2
/assets/vendor.js  br        80815 2
~~~

| الملف | قبل (اللي المتصفح كان بياخده) | بعد بـ br | التوفير |
|---|---|---|---|
| [[/]] | 1937 (gzip) | 965 | النص تقريبًا تاني |
| [[app.js]] | 89037 | 30362 | ٦٦٪ |
| [[vendor.js]] | 289782 | 80815 | ٧٢٪ |

والحساب: (89037 − 30362) ÷ 89037 = ٠.٦٦. والـ brotli أحسن من gzip بنسب صغيرة في الـ JS المتصغّر (31218 مقابل 30362، حوالي ٣٪)، وأكبر في الـ HTML (1894 مقابل 965). وده كله على بروتوكول [[2]].

~~~text curl -skI -H 'Accept-Encoding: gzip, br' https://shop.example/assets/app.js
HTTP/2 200
vary: Accept-Encoding
content-encoding: br
~~~

لما المتصفح بيقول إنه بيفهم الاتنين، nginx اختار [[br]].

---

## ٥. فخ: الطلبات اللي جاية من CDN مكانتش بتتضغط

[[gzip_proxied]] بيحدد: لو الطلب جه عن طريق proxy (nginx بيعرف ده من header اسمه [[Via]] في الطلب)، يضغط ولا لأ؟ والافتراضي [[off]]: «لأ». جرّبنا بسطر [[gzip_proxied]] متعلّق عليه:

~~~text الناتج
no Via         31218
Via: 1.1 cdn   89037
br + Via       30362
Via + proxied  31218
~~~

- طلب عادي: اتضغط (31218).
- نفس الطلب ومعاه [[Via: 1.1 cdn]] (زي ما CDN أو proxy بيبعت): **مااتضغطش** (89037).
- brotli مالوش الإعداد ده، فضغط عادي.
- بعد ما رجّعنا [[gzip_proxied any;]]: اتضغط.

يعني لو قدام موقعك CDN بيبعت [[Via]]، كل الزوار اللي جايين منه كانوا هياخدوا الملفات من غير ضغط gzip.

> وملحوظة قياس: أول مرة جرّبنا ده عملنا curl في نفس الثانية بعد [[reload]] وطلع الرقم القديم. الـ reload بيخلّي الـ workers القدام يكمّلوا اللي في إيدهم، فاستنى ثانية قبل ما تقيس.

---

## ٦. القياس من ويندوز

نفس الأمر بـ [[curl.exe]] (في PowerShell 5.1 كلمة [[curl]] لوحدها اسم تاني لـ [[Invoke-WebRequest]]، فاكتب [[curl.exe]]):

~~~powershell
foreach ($e in 'identity','gzip','br') { $s = curl.exe -s -o NUL -H "Accept-Encoding: $e" -w "%{size_download} %{http_version}" https://www.example.org/; "{0,-9} {1}" -f $e, $s }
~~~

~~~text الناتج (موقع عام للتجربة)
identity  577 1.1
gzip      400 1.1
br        334 1.1
~~~

ليه [[1.1]] والموقع بيدعم HTTP/2؟ الـ curl اللي في ويندوز نفسه مبني من غير HTTP/2:

~~~text C:\Windows\System32\curl.exe --http2 ...
curl: option --http2: the installed libcurl version does not support this
~~~

فلو الـ version مهمة، اسأل [[curl -V]] (سطر [[Features]] لازم يبقى فيه [[HTTP2]])، أو بص على عمود Protocol في DevTools في المتصفح (Network، كليك يمين على العناوين وفعّل Protocol)، هيكتب [[h2]].

---

## ٧. الرجوع لو حاجة باظت

~~~bash
sudo cp /root/shop.example.bak /etc/nginx/sites-available/shop.example
sudo rm /etc/nginx/conf.d/perf.conf
sudo nginx -t && sudo systemctl reload nginx
~~~

وده سبب النسخة الاحتياطية: الرجوع ٣ أوامر مضمونة بدل ما تفتكر كان مكتوب إيه.

---

## البدايل اللي اترفضت

| البديل | ليه لأ هنا |
|---|---|
| [[gzip_comp_level 9]] | درس «gzip» قاس إن المكسب من 5 لـ 9 أقل من ١٪ والمعالج بيشتغل أكتر. ده موقع شغّال، المعالج بتاعه أهم |
| تسطيب nginx من repo nginx.org عشان [[http2 on]] | ترقية الويب سيرفر على سيرفر إنتاج عشان صيغة سطر؟ [[listen ... http2]] بيعمل نفس الشغل على 1.24 |
| تحط [[gzip on]] و [[gzip_types]] في ملف كل موقع | بيتكرر في كل موقع وسهل تنسى واحد. [[conf.d]] مرة واحدة لكل المواقع |
| تضغط الصور ([[image/png]] في [[gzip_types]]) | مضغوطة أصلًا، والمعالج بيضيع على ولا حاجة |
| [[restart]] «عشان نتأكد» | شفناه بيوقّع الموقع بإعداد فيه غلطة |

---

## الخلاصة

| الخطوة | الأمر |
|---|---|
| قيس قبل | [[curl -so /dev/null -H 'Accept-Encoding: br' -w '%{size_download} %{http_version}']] |
| نسخة | [[cp ... /root/....bak]] |
| HTTP/2 | [[listen 443 ssl http2;]] على 1.24، و [[http2 on;]] على 1.25.1+ |
| brotli | [[apt install libnginx-mod-http-brotli-filter]] و [[brotli on;]] |
| gzip للـ JS | [[gzip_types ...]] (و [[gzip on]] مرة واحدة بس) |
| CDN | [[gzip_proxied any;]] |
| طبّق | [[nginx -t && systemctl reload nginx]] |
| قيس بعد | نفس الأمر، وثانية بعد الـ reload |

> [[reload]] بإعداد غلط = التعديل ماتطبّقش والموقع سليم. [[restart]] بإعداد غلط = الموقع واقع.`,
          deep: {
            why: R`التسريع على سيرفر شغّال فيه خطرين: إنك توقّع الموقع وانت بتعدّل، وإنك تفتكر إنك سرّعت وانت مسرّعتش (زي [[gzip on]] اللي كان شغّال على الـ HTML بس). القياس قبل وبعد بنفس الأمر بيحل التاني، و [[nginx -t]] و [[reload]] والنسخة الاحتياطية بيحلوا الأول.`,
            how: R`المتصفح بيبعت [[Accept-Encoding: gzip, deflate, br, zstd]]، و nginx بيختار من اللي هو مفعّله: [[brotli]] لو الـ module موجود و [[brotli on]] والنوع في [[brotli_types]]، وإلا [[gzip]] بنفس الشروط، وإلا من غير ضغط. وبيضيف [[Content-Encoding]] للرد و [[Vary: Accept-Encoding]] عشان أي كاش في النص يحفظ نسخة لكل نوع. [[gzip_proxied]] بيشوف header [[Via]] في الطلب: لو موجود والإعداد [[off]] (الافتراضي)، gzip مبيشتغلش. و HTTP/2 بيتفق عليه المتصفح و nginx وقت مصافحة TLS (ALPN)، فمحتاج [[ssl]] على نفس الـ listen. و [[reload]] بيبعت إشارة للـ master process: يقرا الإعداد ويختبره، ولو سليم يشغّل workers جداد والقدام يكمّلوا طلباتهم ويقفلوا، ولو بايظ يكتب الخطأ في الـ journal ويفضل على القديم.`,
            when: R`أي موقع static أو SPA أو API بيرجّع JSON كبير، خصوصًا لو الزوار على موبايل. ولو قدامك Cloudflare أو CDN، الضغط بيحصل هناك للزوار، بس [[gzip_proxied any]] لسه مهم للطريق بين الـ CDN وسيرفرك. وقيس برضه بعد أي ترقية nginx أو تغيير في الـ build (ملفات أكبر، أنواع جديدة).`,
            mistakes: R`[[gzip on]] لوحده وتفتكر الـ JS بيتضغط. و [[gzip on]] تاني في [[conf.d]] فـ [[duplicate]]. و [[http2 on;]] على nginx 1.24. و [[restart]] بدل [[reload]]. وتقيس من نفس السيرفر بـ [[127.0.0.1]] وتنسى إن الزوار جايين من CDN فيه [[Via]]. وتقيس بـ [[curl]] من غير [[Accept-Encoding]] فيطلعلك الحجم الأصلي وتفتكر الضغط مش شغّال. وتقيس في نفس الثانية بعد [[reload]]. و [[curl.exe]] بتاع ويندوز يقولك [[1.1]] فتفتكر HTTP/2 مش شغّال.`
          },
          sol: R`قبل: [[app.js]] بـ [[89037 1.1]] في الحالات التلاتة (الـ JS مش بيتضغط، و HTML بس [[1937]] بـ gzip). بعد: [[app.js]] [[31218 2]] بـ gzip و [[30362 2]] بـ br، و [[vendor.js]] من 289782 لـ [[80815]]، والـ HTML [[965]] بـ br. و [[curl -skI]] بيطبع [[HTTP/2 200]] و [[content-encoding: br]] و [[vary: Accept-Encoding]].

وفي الطريق: [[http2 on;]] على 1.24 بيطلع [[unknown directive "http2"]]، و [[restart]] بيه بيخلّي [[is-active]] يقول [[failed]] والموقع [[000]]، و [[gzip on]] في [[perf.conf]] بيطلع [[directive is duplicate]]، وطلب فيه [[Via]] من غير [[gzip_proxied any]] بيرجع 89037.

اتجرّب على Ubuntu 24.04 بـ systemd في Docker (nginx 1.24.0 و [[libnginx-mod-http-brotli-filter]] 1.0.0~rc-5build1)، والقياس بـ curl 8.5 من كونتينر تاني. أرقامك هتختلف حسب الملفات، بس النسب قريبة في JS و HTML.`,
          practice: [
            { lvl: 'سريع', t: R`من الدرس من غير ما تبص: إيه اللي بيحصل للموقع لو عملت [[reload]] بإعداد فيه سطر غلط؟ ولو عملت [[restart]]؟ وإيه رسالة systemd في كل حالة؟`, done: R`كتبت إن reload بيفشل بـ [[Job for nginx.service failed.]] والموقع يفضل 200 بالإعداد القديم، و restart بيوقّع nginx ([[is-active]] بيقول [[failed]]) والموقع [[000]]، وإن الحل في الحالتين [[nginx -t]] الأول.` },
            { lvl: 'تطبيق', t: R`قارن وقيس: على المعمل، شغّل [[measure.sh]] قبل وبعد، واعمل جدول فيه لكل ملف: الحجم اللي المتصفح كان بياخده قبل، وبعد بـ br، والتوفير بالنسبة. احسب النسبة بـ [[awk]] أو [[bc]] مش بالعين.`, done: R`الجدول فيه ٣ ملفات، والنسب محسوبة بأمر (زي [[awk 'BEGIN{print (89037-30362)/89037}']] بيطبع [[0.659...]])، و [[app.js]] حوالي ٦٦٪ و [[vendor.js]] حوالي ٧٢٪ لو استخدمت نفس ملفات jQuery.` },
            { lvl: 'تطبيق', t: R`صلّح الإعداد: حد كتب في [[conf.d/perf.conf]] على nginx 1.24 السطور دي: [[gzip on;]] و [[gzip_types application/javascript;]] و [[brotli on;]] (من غير ما يسطّب الـ module)، وفي ملف الموقع [[http2 on;]]. شغّل [[nginx -t]] بعد كل تصليح، واكتب كل رسالة خطأ ظهرت ومعناها.`, done: R`ظهرت ٣ رسايل وصلّحتهم واحدة واحدة: [[directive is duplicate]] (شلت [[gzip on]])، و [[unknown directive "brotli"]] (سطّبت الـ module)، و [[unknown directive "http2"]] (حوّلت لـ [[listen 443 ssl http2]])، وفي الآخر [[test is successful]] و [[measure.sh]] بيطبع [[br]] أصغر و [[2]].` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: [[gzip_proxied]] مش مكتوب خالص (الافتراضي)، و brotli شغّال. توقّع الحجم في الـ ٤ طلبات دي لـ [[app.js]]: gzip من غير [[Via]]، و gzip مع [[Via: 1.1 cdn]]، و br مع [[Via]]، ومن غير [[Accept-Encoding]] خالص. وبعدين قيس.`, done: R`توقعت: مضغوط، ومش مضغوط (الحجم الأصلي)، ومضغوط بـ br (brotli مالوش proxied)، والحجم الأصلي، والقياس طابق (عندنا 31218 و 89037 و 30362 و 89037).` },
            { lvl: 'تحدي', t: R`ابني [[measure.sh]] نسخة أقوى: بياخد ملف فيه URLs، ويطبع CSV فيه الحجم بـ identity و gzip و br والـ HTTP version والـ [[content-encoding]] الفعلي (من [[%{header_json}]] أو من [[-D -]])، ويحفظه باسم فيه التاريخ والساعة. ولو اديته ملفين CSV بيطبع التوفير لكل URL.`, done: R`السكربت بيشتغل على ٣ URLs في المعمل وبيكتب ملفين (قبل وبعد)، والمقارنة بتطلع نفس النسب اللي حسبتها بإيدك، وعمود [[content-encoding]] فيه [[br]] بعد و فاضي قبل للـ JS.` },
            { lvl: 'تحدي', t: R`قارن وقيس التمن: جرّب [[brotli_comp_level]] بـ 1 و 5 و 11 على [[vendor.js]]. لكل مستوى: الحجم، والوقت لـ ٢٠٠ طلب ورا بعض ([[time]] على لوب curl من العميل)، و [[top]] على السيرفر وقتها. واختار مستوى واكتب ليه.`, done: R`عندك جدول ٣ صفوف فيه الحجم والوقت الكلي، وواضح إن 11 أصغر شوية وأبطأ بوضوح، واخترت مستوى (غالبًا 4 لـ 6) بسبب مكتوب بالأرقام.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`import zlib from "node:zlib";
const rows = Array.from({ length: 400 }, (_, i) => "function item" + i + "(a,b){return a.price*b+" + (i % 7) + "}");
const js = Buffer.from(rows.join(";"));
const gz = zlib.gzipSync(js, { level: 5 }).length;
const br = zlib.brotliCompressSync(js, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 5 } }).length;
console.log("identity", js.length);
console.log("gzip", gz, Math.round((1 - gz / js.length) * 100) + "% smaller");
console.log("br", br, Math.round((1 - br / js.length) * 100) + "% smaller");
console.log(br < js.length / 2 && gz < js.length / 2 ? "both under half: yes" : "both under half: no");`, expect: [R`identity`, R`% smaller`, R`both under half: yes`] },
          ],
        },
        {
          cmd: "نقل الدومين لسيرفر جديد",
          title: "DNS cutover: إيه اللي يتغيّر وإيه اللي يتساب، والـ TTL قبلها بيوم، ومين بيشوف الجديد إمتى",
          learn: R`تعمل خطة نقل دومين: جرد كل السجلات، وتخفيض TTL في الوقت الصح، واختبار الجديد بـ [[curl --resolve]]، وتغيير A ومسح AAAA، ومتابعة كذا resolver لحد ما يتفقوا.`,
          out: R`الـ authoritative والـ resolvers كلهم بيرجّعوا IP الجديد، و AAAA القديم مش موجود، والإيميل شغّال زي ما هو.`,
          desc: R`نقل موقع لسيرفر جديد بيخلص بتغيير سجل في الـ DNS، وده أخطر خطوة لأنك مش بتتحكم في الكاش اللي في الدنيا. الخطة: جرد كل السجلات (إيه يتغيّر وإيه **ميتلمسش**: الإيميل والـ subdomains اللي على سيرفرات تانية)، وتخفيض الـ TTL قبلها بوقت أطول من الـ TTL القديم، واختبار السيرفر الجديد بـ [[curl --resolve]] قبل ما تلمس DNS، وتغيير [[A]] ومسح أي [[AAAA]] قديم، ومتابعة الـ authoritative و [[1.1.1.1]] و [[8.8.8.8]] لحد ما يتفقوا.

في المعمل (CoreDNS كـ authoritative و CoreDNS تاني كـ resolver بيعمل كاش) شفنا بالأرقام إن تخفيض الـ TTL مبيوصلش للـ resolver إلا بعد ما الـ TTL القديم يخلص، وإن الـ authoritative بيتغيّر في ثانية والـ resolver بيفضل على القديم لحد آخر ثانية في الكاش، وإن [[AAAA]] متخزّن لوحده وفضل بعد ما [[A]] اتغيّر.`,
          example: R`dig NS shop.example +short
dig @ns1.shop.example shop.example A +noall +answer
for ns in 1.1.1.1 8.8.8.8; do dig @$ns shop.example A +noall +answer; done
dig @1.1.1.1 shop.example AAAA +short
curl -s --resolve shop.example:443:198.51.100.10 -o /dev/null -w '%{http_code} ip=%{remote_ip}\n' https://shop.example/
until [ "$(dig @1.1.1.1 +short shop.example A)" = 198.51.100.10 ]; do sleep 20; done; echo "1.1.1.1 moved"`,
          lines: [
            R`مين الـ authoritative للدومين؟ السيرفرات دي هي «المصدر»: أي تغيير في لوحة الـ DNS بيظهر عندهم الأول. [[+short]] الإجابة بس من غير تفاصيل.`,
            R`اسأل المصدر نفسه ([[@]] بعدها اسم أو IP سيرفر DNS). [[+noall +answer]] اطبع سطر الإجابة بس، وفيه الـ TTL الكامل اللي انت كاتبه في اللوحة.`,
            R`اسأل اتنين من الـ resolvers العامة اللي الناس بتستخدمها. الرقم التاني في السطر هنا هو الـ TTL **الباقي** في الكاش عندهم (بيعد تنازلي)، مش اللي انت كاتبه.`,
            R`فيه سجل IPv6؟ لو فيه وبيشاور على السيرفر القديم، الزوار اللي عندهم IPv6 هيفضلوا رايحين القديم حتى بعد ما تغيّر [[A]].`,
            R`جرّب السيرفر الجديد باسم الدومين الحقيقي قبل ما DNS يتغيّر: [[--resolve اسم:بورت:IP]] بيقول لـ curl «متسألش DNS، روح للـ IP ده». و [[%{remote_ip}]] بيأكد إنك وصلت للـ IP الصح.`,
            R`بعد التغيير: لف لحد ما [[1.1.1.1]] يرجّع الـ IP الجديد. [[until]] بيكرر لحد ما الشرط يبقى صح، و [[$(...)]] بيحط ناتج [[dig]] في المقارنة، و [[sleep 20]] عشان متضربش السيرفر بأسئلة.`,
          ],
          try: R`ابني معمل الـ DNS اللي في الشرح (CoreDNS authoritative و CoreDNS resolver وسيرفرين nginx قديم وجديد على شبكة [[caselab]]). اعمل جدول الجرد، وخفّض الـ TTL، وراقب الـ resolver بيعد لحد ما ياخد الـ TTL الجديد، وبعدين اعمل الـ cutover وسجّل بالثانية إمتى كل واحد شاف الجديد.`,
          teach: R`## الموقف

الموقع [[shop.example]] شغّال على سيرفر قديم ([[198.51.100.5]])، والسيرفر الجديد ([[198.51.100.10]]) جاهز ومتجرّب. فاضل خطوة واحدة: الـ DNS. وفي اللوحة سجلات كتير، ومش كلها بتاعة الموقع.

قبل أي حاجة، درسين في أول التاب بيشرحوا الأساس: «بيفتح عند ناس ومش عند ناس» (الكاش والـ TTL) و «الدومين بيشاور على مين» ([[dig]] و [[AAAA]] و [[--resolve]]). هنا هنحطهم في خطة نقل كاملة.

---

## المعمل

كله على شبكة Docker [[caselab]] (عناوين [[198.51.100.0/24]] المحجوزة للتوثيق):

| الكونتينر | IP | دوره |
|---|---|---|
| [[ns]] (CoreDNS 1.11.3) | [[198.51.100.53]] | الـ authoritative: بيقرا ملف zone لـ [[shop.example]] |
| [[resolver]] (CoreDNS 1.11.3) | [[198.51.100.54]] | زي [[1.1.1.1]]: بيسأل الـ authoritative ويخزّن الإجابة قد الـ TTL |
| [[old]] (nginx) | [[198.51.100.5]] | السيرفر القديم، بيرد [[old server]] |
| [[new]] (nginx) | [[198.51.100.10]] | الجديد، بيرد [[new server]] |
| [[client]] | [[198.51.100.50]] | منه بنسأل ونجرّب |

~~~text Corefile بتاع ns
shop.example {
    file /etc/coredns/db.shop.example {
        reload 2s
    }
    log
}
~~~

~~~text Corefile بتاع resolver
. {
    forward . 198.51.100.53
    cache 3600
    log
}
~~~

- [[file]]: اقرا الـ zone من الملف ده، و [[reload 2s]]: افحص الملف كل ثانيتين، ولو رقم الـ serial في سطر SOA زاد اقراه تاني. ده زي لما تدوس «حفظ» في لوحة الـ DNS.
- [[forward . 198.51.100.53]]: أي سؤال ابعته للـ authoritative، و [[cache 3600]]: خزّن الإجابات (بحد أقصى ساعة، وبيحترم الـ TTL اللي جاي مع الإجابة).

~~~text db.shop.example (الأول)
$TTL 3600
@       IN SOA ns1.shop.example. admin.shop.example. ( 2026110301 3600 600 86400 300 )
@       IN NS  ns1.shop.example.
ns1     IN A   198.51.100.53
@       IN A   198.51.100.5
@       IN AAAA 2001:db8::5
www     IN CNAME shop.example.
bot     IN A   198.51.100.77
@       IN MX 10 mail.mailhost.example.
@       IN TXT "v=spf1 include:mailhost.example ~all"
_dmarc  IN TXT "v=DMARC1; p=none"
~~~

[[@]] معناها الدومين نفسه ([[shop.example]])، و [[$TTL 3600]] الـ TTL الافتراضي لكل السجلات (ساعة)، و [[2026110301]] الـ serial (تاريخ + رقم، بيزيد مع كل تعديل).

---

## ١. الجرد: إيه اللي في اللوحة، وإيه اللي يتلمس

~~~bash
NS=198.51.100.53
for n in shop.example www.shop.example bot.shop.example _dmarc.shop.example; do
  for t in A AAAA CNAME MX TXT; do dig @$NS +noall +answer $n $t; done
done | sort -u
~~~

~~~text الناتج
_dmarc.shop.example.	3600	IN	TXT	"v=DMARC1; p=none"
bot.shop.example.	3600	IN	A	198.51.100.77
shop.example.		3600	IN	A	198.51.100.5
shop.example.		3600	IN	AAAA	2001:db8::5
shop.example.		3600	IN	MX	10 mail.mailhost.example.
shop.example.		3600	IN	TXT	"v=spf1 include:mailhost.example ~all"
www.shop.example.	3600	IN	CNAME	shop.example.
~~~

لفّة جوه لفّة: لكل اسم، لكل نوع سجل، اسأل. و [[sort -u]] يرتّب ويشيل المتكرر. (في لوحة حقيقية خد الجرد من اللوحة نفسها أو صدّر الـ zone، لأن مفيش طريقة تسأل بيها DNS عن «كل الأسامي اللي عندك».)

| السجل | القرار | ليه |
|---|---|---|
| [[@ A 198.51.100.5]] | **يتغيّر** لـ [[198.51.100.10]] | ده الموقع |
| [[@ AAAA 2001:db8::5]] | **يتمسح** (أو يتغيّر لـ IPv6 الجديد لو عنده) | لو اتساب، أي زائر عنده IPv6 هيروح القديم |
| [[www CNAME @]] | **يتساب** | بيتبع [[@]] لوحده |
| [[bot A 198.51.100.77]] | **يتساب** | سيرفر تالت، مش جزء من النقل |
| [[MX]] و SPF و [[_dmarc]] | **ميتلمسوش** | الإيميل على مزوّد تاني. لمسهم بيوقّف الإيميل أو يوديه spam |
| مفيش [[api]] | **متضيفش** | لو مكانش موجود قبل كده، إضافته مش جزء من النقل |

---

## ٢. تخفيض الـ TTL: إمتى بالظبط، وليه «قبلها بيوم»

الـ TTL الحالي ساعة. يعني أي resolver سأل دلوقتي هيفضل شايل الإجابة ساعة. لو غيّرت الـ IP دلوقتي، ناس هتفضل على القديم لحد ساعة. الحل: خفّض الـ TTL لـ 300 (٥ دقايق) **الأول**، وبعدين غيّر الـ IP.

بس فيه فخ في الترتيب. جرّبناه بأرقام صغيرة عشان نشوفه في دقيقتين (الـ TTL كان 60 وخفّضناه لـ 10):

~~~text auth = الـ authoritative، resolver = اللي بيعمل كاش
08:34:59 auth: 60 198.51.100.5
         resolver: 60 198.51.100.5
== lower TTL to 10 on auth
08:35:03 auth: 10 198.51.100.5
         resolver: 56 198.51.100.5
08:35:33 auth: 10 198.51.100.5
         resolver: 26 198.51.100.5
08:36:03 auth: 10 198.51.100.5
         resolver: 10 198.51.100.5
~~~

الـ authoritative قال 10 فورًا، والـ resolver **فضل يعد من 60** (56 ثم 26) لحد ما الإجابة القديمة خلصت، وبعدين سأل تاني وخد 10. يعني الـ TTL الجديد بيوصل للناس بعد **الـ TTL القديم** كله. لو الـ TTL القديم ٢٤ ساعة (شائع في اللوحات)، لازم تخفّضه قبلها بيوم على الأقل. ولو خفّضته قبل النقل بخمس دقايق، مكأنك ماعملتش حاجة.

---

## ٣. اختبار الجديد قبل ما DNS يتحرك

~~~bash
curl -s --resolve shop.example:80:198.51.100.10 -w "%{http_code} ip=%{remote_ip}\n" http://shop.example/
~~~

~~~text الناتج
new server
200 ip=198.51.100.10
~~~

الطلب راح بالاسم [[shop.example]] (فـ nginx على الجديد اختار الـ [[server_name]] الصح)، بس للـ IP اللي اخترناه. ولـ HTTPS نفس الشكل بـ [[:443:]]، والشهادة بتتختبر كمان. لو مش 200 هنا، متكملش.

---

## ٤. الـ cutover، وبالثانية مين شاف إيه

غيّرنا [[A]] لـ [[198.51.100.10]]، ومسحنا [[AAAA]]، وزوّدنا الـ serial. وكل ٣ ثواني سألنا:

~~~text الناتج
cutover at 08:36:10
08:36:10 auth=198.51.100.5 resolver=198.51.100.5 (ttl 4) AAAA@resolver=2001:db8::5
08:36:14 auth=198.51.100.10 resolver=198.51.100.10 (ttl 10) AAAA@resolver=2001:db8::5
08:36:17 auth=198.51.100.10 resolver=198.51.100.10 (ttl 7) AAAA@resolver=2001:db8::5
08:36:20 auth=198.51.100.10 resolver=198.51.100.10 (ttl 4) AAAA@resolver=2001:db8::5
08:36:23 auth=198.51.100.10 resolver=198.51.100.10 (ttl 1) AAAA@resolver=
08:36:27 auth=198.51.100.10 resolver=198.51.100.10 (ttl 10) AAAA@resolver=
~~~

اقرا السطور:

- أول سطر: الـ authoritative لسه ماقراش الملف (الـ reload كل ثانيتين). بعدها بأربع ثواني بقى الجديد.
- الـ resolver كان فاضله [[4]] ثواني في الكاش، فخلص وسأل وجاب الجديد في نفس الدورة.
- **الـ [[AAAA]] فضل في الكاش ١٣ ثانية زيادة** بعد ما [[A]] اتغيّر. كل نوع سجل متخزّن لوحده بوقته. في الحقيقة بـ TTL ساعة، ده ساعة زوار IPv6 رايحين القديم.

وفي الدنيا الحقيقية مش resolver واحد: Google عنده آلاف السيرفرات، كل واحد بكاشه، فـ [[8.8.8.8]] ممكن يرد بالقديم مرة والجديد مرة لحد ما الكل يخلص. استنى لحد ما الإجابة تثبت كذا مرة ورا بعض.

### بنفس الطريقة على أي دومين حقيقي (للقراية بس)

~~~bash
for ns in 1.1.1.1 8.8.8.8; do printf "%-8s " $ns; dig @$ns example.com A +noall +answer | awk '{print $2, $5}' | tr '\n' ' '; echo; done
dig NS example.com +short
dig @hera.ns.cloudflare.com example.com A +noall +answer +norec
~~~

~~~text الناتج (وقت ما جرّبنا)
1.1.1.1  123 172.66.147.243 123 104.20.23.154
8.8.8.8  300 172.66.147.243 300 104.20.23.154
hera.ns.cloudflare.com.
elliott.ns.cloudflare.com.
example.com.		300	IN	A	172.66.147.243
example.com.		300	IN	A	104.20.23.154
~~~

- [[awk '{print $2, $5}']] يطبع العمود التاني (الـ TTL) والخامس (الـ IP)، و [[tr '\n' ' ']] يحط السطور جنب بعض.
- الـ authoritative قال 300 (الرقم اللي في اللوحة)، و [[1.1.1.1]] قال 123 (فاضله ١٢٣ ثانية في الكاش)، و [[8.8.8.8]] قال 300 (لسه سائل حالًا). نفس الإجابة، بس كل واحد في نقطة مختلفة من العد.
- [[+norec]] معناها «متسألش حد تاني، رد من عندك»: الـ authoritative بيرد من الـ zone نفسها.

وعلى ويندوز:

~~~powershell
Resolve-DnsName example.com -Type A -Server 1.1.1.1 | Select-Object Name,Type,TTL,IPAddress
Resolve-DnsName example.com -Type NS -Server 8.8.8.8 | Select-Object NameHost
Resolve-DnsName example.com -Type A -Server elliott.ns.cloudflare.com -DnsOnly | Select-Object Name,TTL,IPAddress
~~~

~~~text الناتج
Name        Type TTL IPAddress
----        ---- --- ---------
example.com    A 166 104.20.23.154
example.com    A 166 172.66.147.243

NameHost
--------
elliott.ns.cloudflare.com
hera.ns.cloudflare.com

Name        TTL IPAddress
----        --- ---------
example.com 300 172.66.147.243
example.com 300 104.20.23.154
~~~

---

## ٥. «عندي لسه بيفتح القديم!»: الكاش المحلي

جهازك نفسه (والمتصفح) عنده كاش DNS. فممكن [[dig @1.1.1.1]] يقول الجديد والمتصفح عندك لسه على القديم. قبل ما تقول «النقل ما اشتغلش»:

- اختبر بـ [[curl --resolve]] (بيتخطى أي كاش)، وبص على [[%{remote_ip}]] في طلب عادي: رحت فين فعلًا؟
- على ويندوز: [[ipconfig /displaydns]] أو [[Get-DnsClientCache]] بيوروك الكاش، و [[ipconfig /flushdns]] أو [[Clear-DnsClientCache]] بيفضّوه (من وثائق مايكروسوفت، ماشغّلناهمش هنا لأنهم بيغيّروا حالة الجهاز. وعلى جهاز المعمل كان الكاش فاضي أصلًا).
- على لينكس اللي فيه [[systemd-resolved]]: [[resolvectl flush-caches]] (من الوثائق).
- المتصفح ليه كاش لوحده: Chrome فيه [[chrome://net-internals/#dns]] وزرار Clear host cache.

---

## ٦. اتأكد إن الزوار وصلوا فعلًا

DNS بيقول الجديد، بس هل الناس بتوصل؟ على السيرفر الجديد:

~~~bash
grep -v "127.0.0.1" /var/log/nginx/access.log | awk '{print $9}' | sort | uniq -c | sort -rn
~~~

[[grep -v]] شيل طلباتك انت من على السيرفر، و [[awk '{print $9}']] العمود التاسع في لوج nginx الافتراضي هو كود الرد، و [[uniq -c]] يعد. المفروض أغلبه [[200]] و [[304]]، وأي [[5xx]] يتشاف فورًا. وعلى القديم: [[tail -f /var/log/nginx/access.log]] لازم يقل لحد ما يقف (ممكن ياخد أطول من الـ TTL شوية بسبب كاش البرامج والمتصفحات).

---

## ٧. الرجوع، وبعد الأسبوع

- **الرجوع** = رجّع [[A]] للقديم. وعشان الـ TTL لسه 300، الرجوع ياخد ٥ دقايق مش يوم. عشان كده **القديم يفضل شغّال** أسبوع.
- لو فيه داتا بتتكتب (طلبات، يوزرز)، الرجوع بعد ما الجديد اتكتب فيه بيعمل انقسام في الداتا: دروس «نقل السيرفر كله» و «dump و restore بين سيرفرين» في تاب vps بيشرحوا الإيقاف والـ dump النهائي قبل الـ cutover.
- **بعد ما يثبت:** رجّع الـ TTL لـ 3600 (أسئلة أقل، وأسرع للزوار).

---

## الخطة على ورقة

| إمتى | إيه |
|---|---|
| قبلها بيومين | جرد كل السجلات وجدول «يتغيّر/يتساب/يتمسح» |
| قبلها بـ TTL القديم + هامش (يوم لو ٢٤ ساعة) | خفّض TTL [[@]] و [[www]] لـ 300 |
| قبلها بساعة | [[curl --resolve]] على الجديد لكل دومين: 200 والشهادة سليمة |
| الـ cutover | [[A]] للجديد، امسح [[AAAA]] القديم، متلمسش MX و TXT |
| بعدها | [[dig]] على الـ authoritative ثم [[1.1.1.1]] و [[8.8.8.8]] لحد ما يثبتوا، ولوج الجديد |
| بعد أسبوع | TTL لـ 3600، وأطفي القديم وامسح أسراره |`,
          deep: {
            why: R`الـ DNS مش «تحفظ وخلاص»: الإجابة القديمة متخزّنة في آلاف الأماكن، كل واحد بعدّاده. الخطة بتخلّي المدة اللي فيها ناس على القديم ناس على الجديد قصيرة ومعروفة، وبتمنع أشهر ٣ مصايب في النقل: AAAA منسي بيودّي زوار IPv6 للقديم، وسجلات إيميل اتلمست فالإيميل وقف، وتخفيض TTL متأخر مالوش أي أثر.`,
            how: R`لما حد يكتب [[shop.example]]، جهازه بيسأل resolver (مزوّد النت أو [[1.1.1.1]] أو [[8.8.8.8]]). الـ resolver لو عنده الإجابة في الكاش ولسه الـ TTL مخلصش بيرد منها، وإلا بيسأل سلسلة لحد الـ authoritative ([[dig NS]] بيقولك هو مين) ويخزّن الإجابة بالـ TTL اللي جاي معاها ويعد تنازلي. عشان كده الـ TTL اللي بيطلع من الـ resolver «الباقي» مش الأصلي. وكل اسم وكل نوع ([[A]] و [[AAAA]] و [[MX]]) متخزّن لوحده. تخفيض الـ TTL بيأثر على الإجابات اللي هتتاخد **بعده**، فالإجابة القديمة بتفضل بـ TTL القديم لحد ما تخلص. و [[curl --resolve]] بيحط IP في كاش curl نفسه للطلب ده بس، فبيتخطى كل ده.`,
            when: R`نقل موقع لسيرفر جديد، أو لمزوّد استضافة تاني، أو تحويل لـ CDN أو load balancer، أو تغيير IP بعد إعادة تسطيب. ونفس الخطة لو هتغيّر مزوّد الـ DNS نفسه (سجلات [[NS]] عند مسجّل الدومين)، بس هناك الـ TTL بتاع الـ NS عند الـ TLD غالبًا يومين ومش في إيدك.`,
            mistakes: R`تخفّض الـ TTL قبل النقل بدقايق. وتنسى [[AAAA]]. وتغيّر [[MX]] أو تمسح TXT «مالوش لازمة» فالإيميل يقع أو يروح spam. وتضيف سجلات ماكانتش موجودة «على الماشي». وتختبر من المتصفح بتاعك وهو شايل كاش فتقول «لسه القديم». وتطفي القديم في نفس اليوم فاللي لسه عنده الكاش القديم يلاقي الموقع واقع. وتنسى ترجّع الـ TTL بعدها. وتصدّق [[8.8.8.8]] من أول مرة وهو ممكن يرد بالقديم من سيرفر تاني.`
          },
          sol: R`في المعمل: الجرد طلّع ٧ سجلات، والقرار: [[A]] يتغيّر، و [[AAAA]] يتمسح، والباقي يتساب. بعد تخفيض الـ TTL الـ resolver فضل يعد من الرقم القديم (56 ثم 26) وبعدين خد الجديد (10). و [[curl --resolve shop.example:80:198.51.100.10]] رجّع [[new server]] و [[200 ip=198.51.100.10]] قبل أي تغيير. وبعد الـ cutover الـ authoritative اتغيّر في حوالي ٤ ثواني والـ resolver في نفس الدورة، و AAAA فضل في الكاش لحد ما الـ TTL بتاعه خلص.

و [[until [ "$(dig @198.51.100.54 +short shop.example A)" = 198.51.100.10 ]; do sleep 2; done]] خلص على طول لما الإجابة كانت اتغيّرت.

اتجرّب بـ CoreDNS 1.11.3 (authoritative و resolver) و [[dig]] 9.18 من كونتينر Ubuntu 24.04، والأوامر على [[1.1.1.1]] و [[8.8.8.8]] و [[example.com]] قراية بس، و [[Resolve-DnsName]] على PowerShell 7 في ويندوز 11.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: الـ TTL الحالي ٨٦٤٠٠ (يوم)، والنقل بكرة الساعة ١٠ الصبح. إمتى بالظبط لازم تخفّض الـ TTL لـ 300؟ وبعد الـ cutover، أقصى وقت ممكن حد يفضل على القديم بسبب الكاش؟`, done: R`كتبت: قبل ١٠ الصبح بيوم كامل على الأقل (يعني النهارده قبل ١٠ الصبح، والأحسن بهامش)، وبعد الـ cutover أقصى وقت حوالي ٥ دقايق (300 ثانية) من كاش الـ DNS، مع ملاحظة إن كاش البرامج والمتصفحات ممكن يزوّد شوية.` },
            { lvl: 'تطبيق', t: R`بيانات حقيقية الشكل: خد الـ zone اللي في الدرس وزوّد عليها [[api CNAME shop.example.]] و [[mail A 198.51.100.25]] و [[@ CAA 0 issue "letsencrypt.org"]] و [[*.shop.example A 198.51.100.5]]. اعمل جدول «يتغيّر/يتساب/يتمسح» لكل سطر مع السبب.`, done: R`الجدول فيه كل السطور، و [[*.shop.example]] اتعلّم «يتغيّر» (wildcard بيشاور على القديم)، و [[mail]] و [[MX]] و TXT «ميتلمسوش»، و [[CAA]] «يتساب» مع ملحوظة إنه لازم يسمح بالجهة اللي هتعمل شهادة الجديد، و [[api CNAME]] «يتساب» لأنه بيتبع [[@]].` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: في المعمل، الـ resolver فيه إجابة [[A]] بـ TTL باقي 50، و [[AAAA]] بـ TTL باقي 20، والـ authoritative دلوقتي بيقول A جديد و مفيش AAAA. اكتب جدول بإجابة الـ resolver للنوعين بعد ١٠ و ٣٠ و ٦٠ ثانية. وبعدين اعملها في المعمل وقارن.`, done: R`توقعت: بعد ١٠ ثواني الاتنين قدام، وبعد ٣٠ A لسه القديم و AAAA فاضي، وبعد ٦٠ A الجديد، والمعمل طابق (أو اختلف بثواني الـ reload بتاع الـ zone وانت عارف ليه).` },
            { lvl: 'تطبيق', t: R`صلّح الخطة: زميل كتب: «الساعة ٩:٥٥ نخفّض الـ TTL، الساعة ١٠ نغيّر A ونمسح كل سجلات TXT القديمة عشان ننضّف، ونطفي القديم الساعة ١٠:١٥ بعد ما [[dig]] من جهازي يقول الجديد». طلّع كل الغلطات واكتب الخطة الصح.`, done: R`طلعت ٤ غلطات على الأقل: الـ TTL متأخر، ومسح TXT بيكسر SPF و DMARC، وتطفية القديم قبل الكاش ما يخلص، و [[dig]] من جهاز واحد مش دليل (لازم authoritative و resolverين)، والخطة الصح فيها مواعيد بالساعة وأوامر التأكيد.` },
            { lvl: 'تحدي', t: R`ابني [[dns-watch.sh]]: بياخد دومين و IP متوقع ولستة resolvers، ويسأل كل واحد كل ١٠ ثواني، ويطبع سطر بالوقت **بس** لما إجابة resolver تتغيّر، ويخلص بـ [[all resolvers agree]] لما الكل يرجّع المتوقع ٣ مرات ورا بعض. جرّبه في المعمل وقت الـ cutover.`, done: R`في المعمل بيطبع سطر للـ authoritative وسطر للـ resolver بأوقاتهم، ومبيطبعش حاجة في اللفّات اللي مفيهاش تغيير، وبيخلص بالسطر الأخير، ولو ديته IP غلط بيفضل شغّال لحد ما توقفه بـ [[Ctrl+C]].` },
            { lvl: 'تحدي', t: R`اشرحها لعميل مش تقني في ٥ سطور: «غيّرنا السيرفر من ساعة، ليه أخويا لسه شايف الموقع القديم وأنا شايف الجديد؟». ومعاها أمر واحد يبعته لأخوه يشغّله يثبت إيه اللي عنده.`, done: R`الشرح فيه فكرة «كل جهاز ومزوّد نت شايل العنوان القديم شوية» من غير كلمة TTL من غير شرح، ومدة متوقعة بالدقايق، والأمر ([[nslookup shop.example]] أو [[Resolve-DnsName shop.example]]) والـ IP اللي المفروض يطلع.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`cat > zone.txt <<'EOF'
@       3600 IN A     198.51.100.5
@       3600 IN AAAA  2001:db8::5
www     3600 IN CNAME shop.example.
bot     3600 IN A     198.51.100.77
@       3600 IN MX    10 mail.mailhost.example.
@       3600 IN TXT   "v=spf1 include:mailhost.example ~all"
_dmarc  3600 IN TXT   "v=DMARC1; p=none"
EOF
OLD=198.51.100.5
awk -v old="$OLD" '{
  action = "keep"
  if ($4 == "A" && $5 == old) action = "CHANGE"
  else if ($4 == "AAAA" && $1 == "@") action = "DELETE"
  else if ($4 == "MX" || $4 == "TXT") action = "DO-NOT-TOUCH"
  printf "%-13s %-7s %-6s %s\n", action, $1, $4, $5
}' zone.txt`, expect: [R`CHANGE        @       A      198.51.100.5`, R`DELETE        @       AAAA`, R`keep          bot     A      198.51.100.77`, R`DO-NOT-TOUCH  @       MX`] },
          ],
        },
        {
          cmd: "السيرفر ولا جهازي؟",
          title: "SSH بيتقفل قبل الـ banner والموقع شغّال، و «Failed to fetch» بعد ٢٦ ثانية: اثبت العطل فين قبل ما تلمس السيرفر",
          learn: R`تفصل «الدخول للسيرفر» عن «الخدمة نفسها»، وتقسم وقت الطلب لمراحل، وتعرف العطل عند السيرفر ولا الطريق ولا جهازك قبل ما تغيّر أي حاجة.`,
          out: R`حكم مكتوب بدليل: «السيرفر بيرد في 0.003 ثانية، والوقت كله في connect و tls من عندي»، أو «sshd رفض لأن MaxStartups اتملى».`,
          desc: R`حالتين بنفس الدرس: (١) [[ssh]] بيقفل في وشّك قبل حتى ما يسألك عن مفتاح ([[kex_exchange_identification: Connection closed by remote host]])، والموقع على نفس السيرفر شغّال عادي. (٢) المتصفح بيقول «Failed to fetch» بعد ٢٦ ثانية، والـ health check سليم. في الحالتين أول رد فعل «السيرفر بايظ، يلا نعمل restart» غلط لحد ما تثبت.

الطريقة: افصل الخدمات عن بعض (الموقع شغّال؟ البورتات بترد؟ ssh بيقول إيه بـ [[-v]]؟)، وقسّم وقت الطلب لمراحل بـ [[curl -w]] (DNS ثم الاتصال ثم TLS ثم أول byte)، وقارن نفس الطلب **من السيرفر نفسه**. في المعمل: [[MaxStartups]] اتملى باتصالات مفتوحة ماكملتش، والحل كان اتصال SSH واحد بيتعاد استخدامه ([[ControlMaster]]). وعميل شبكته بطيئة طلبه خد ٧.٥ ثانية والسيرفر بيرد نفس الطلب في 0.003.`,
          example: R`curl -s -o /dev/null -w '%{http_code} %{time_total}s\n' https://shop.example/
for p in 22 80 443; do timeout 3 bash -c "echo > /dev/tcp/198.51.100.20/$p" 2>/dev/null && echo "$p open" || echo "$p CLOSED"; done
ssh -v -o BatchMode=yes deployer@198.51.100.20 true 2>&1 | grep -iE 'kex|banner|closed'
curl -sk -o /dev/null -w 'dns=%{time_namelookup} connect=%{time_connect} tls=%{time_appconnect} ttfb=%{time_starttransfer} total=%{time_total}\n' https://shop.example/
ssh web2 "curl -sk -o /dev/null --resolve shop.example:443:127.0.0.1 -w 'total=%{time_total}\n' https://shop.example/"`,
          lines: [
            R`السؤال الأول: الخدمة نفسها شغّالة؟ كود الرد والوقت الكلي. لو 200 في أقل من ثانية، يبقى السيرفر عايش والويب سليم، والمشكلة في حاجة تانية (الدخول، أو الطريق).`,
            R`البورتات من غير أي برنامج: [[/dev/tcp/IP/PORT]] حاجة في bash بتفتح اتصال TCP لما تكتب فيها. [[timeout 3]] عشان مايستناش للأبد، و [[open]] معناها حد ماسك البورت وقبل الاتصال. خد بالك: فتح بورت 22 بالطريقة دي نفسه بيتحسب اتصال لسه ماسجّلش دخول عند sshd.`,
            R`ssh بالتفاصيل: [[-v]] بيطبع كل خطوة، و [[BatchMode=yes]] متسألش عن باسورد (لو المفتاح مش شغّال يفشل على طول بدل ما يعلّق)، و [[true]] أمر مبيعملش حاجة. و [[grep]] بيطلّع السطور المهمة: هل وصل للـ banner ولا اتقفل قبله؟`,
            R`قسّم وقت الطلب: [[time_namelookup]] لحد ما DNS رد، و [[time_connect]] لحد ما TCP اتفتح، و [[time_appconnect]] لحد ما TLS خلص، و [[time_starttransfer]] لحد أول byte من الرد، و [[time_total]] الكل. كل رقم تراكمي من بداية الطلب.`,
            R`نفس الطلب **من السيرفر نفسه**، لنفسه: [[--resolve shop.example:443:127.0.0.1]] باسم الدومين بس على الجهاز ده. لو هنا سريع وعندك بطيء، يبقى الوقت في الطريق مش في السيرفر. الـ single quotes جوه الـ double quotes عشان [[%{...}]] يوصل لـ curl على السيرفر زي ما هو.`,
          ],
          try: R`ابني معمل SSH اللي في الشرح (sshd بـ [[MaxStartups 3:100:3]] و nginx على نفس الكونتينر)، وافتح ٣ اتصالات معلّقة بـ [[nc]]، وشوف [[ssh -v]] بيقول إيه والموقع بيقول إيه في نفس اللحظة. وبعدين ظبّط [[ControlMaster]] وكرّر. وبعدها على كونتينر عميل بـ [[--cap-add NET_ADMIN]] ضيف [[tc qdisc add dev eth0 root netem delay 1500ms]] وقارن أرقام [[curl -w]] من عنده ومن السيرفر.`,
          teach: R`## القاعدة قبل أي حاجة

متغيّرش حاجة على السيرفر قبل ما تثبت إنه هو السبب. [[restart]] لخدمة سليمة بيقطع على ناس شغّالين عادي، وبيضيّع الدليل (اللوجات والحالة)، ولو المشكلة عندك هترجع تاني والسيرفر «اتصلّح» من غير سبب.

السؤال اللي بنفصل بيه: **«مين غيري شايف المشكلة؟»** وبالأوامر: نفس الحاجة من جهازك، ومن السيرفر لنفسه، ومن جهاز تالت.

---

## الحالة الأولى: SSH بيتقفل قبل الـ banner، والموقع شغّال

### العَرَض

~~~text ssh deployer@198.51.100.20
Connection closed by 198.51.100.20 port 22
~~~

ولا سأل عن مفتاح، ولا باسورد. وفي نفس اللحظة الموقع على نفس السيرفر بيفتح عادي.

### المعمل

كونتينر [[web2]] على [[198.51.100.20]] فيه [[sshd]] (OpenSSH 9.6 على Ubuntu 24.04) و nginx، ويوزر [[deployer]] بمفتاح. وفي إعداد sshd سطر واحد زيادة عشان نشوف الحالة بسرعة:

~~~text /etc/ssh/sshd_config.d/lab.conf
MaxStartups 3:100:3
LoginGraceTime 120
~~~

- [[MaxStartups]]: كام اتصال **لسه ماسجّلش دخول** مسموح في نفس الوقت. الشكل [[start:rate:full]]: بعد [[start]] اتصال يبدأ يرفض الجديد بنسبة [[rate]]٪، ولما يوصل [[full]] يرفض الكل. الافتراضي [[10:30:100]] (من [[man sshd_config]]). إحنا خليناه ٣ ونسبة ١٠٠٪ عشان يبان من أول اتصال زيادة.
- [[LoginGraceTime 120]]: الاتصال اللي ماسجّلش دخول بيتساب لحد دقيقتين قبل ما يتقفل (ده الافتراضي برضه).

والـ «زحمة»: ٣ اتصالات مفتوحة على بورت 22 مابعتتش ولا حاجة، زي أداة بتفتح اتصال جديد لكل أمر ومبتقفلهوش كويس، أو بوت بيجرّب:

~~~bash
for i in 1 2 3; do (sleep 100 | nc 198.51.100.20 22 >/dev/null &); done
~~~

[[nc]] (netcat) بيفتح اتصال TCP، و [[sleep 100 |]] بيخلّيه مفتوح ١٠٠ ثانية من غير ما يبعت حاجة، و [[( ... &)]] يشغّله في الخلفية.

### التشخيص بالترتيب

**١. الخدمة نفسها شغّالة؟** (لو الموقع كمان واقع، المشكلة في السيرفر كله أو الشبكة، ودي قضية تانية: درس «الموقع مش بيفتح خالص»)

~~~text curl -s -o /dev/null -w "%{http_code} %{time_total}s\n" http://198.51.100.20/
200 0.000506s
~~~

**٢. البورتات بترد؟**

~~~text الناتج
22 open
80 open
443 CLOSED
~~~

22 مفتوح، يعني sshd شغّال ومفيش فايروول قافل. ([[443 CLOSED]] هنا طبيعي: المعمل ده مفيهوش HTTPS.)

**٣. ssh بيقول إيه بالظبط؟**

~~~text ssh -v -o BatchMode=yes deployer@198.51.100.20 hostname
OpenSSH_9.6p1 Ubuntu-3ubuntu13.20, OpenSSL 3.0.13 30 Jan 2024
debug1: Connecting to 198.51.100.20 [198.51.100.20] port 22.
debug1: Connection established.
debug1: kex_exchange_identification: banner line 0: Exceeded MaxStartups
kex_exchange_identification: Connection closed by remote host
Connection closed by 198.51.100.20 port 22
~~~

اقراها سطر سطر:

- [[Connection established]]: TCP اتفتح. الشبكة سليمة والسيرفر رد.
- [[kex_exchange_identification]]: أول خطوة في SSH، الطرفين بيبعتوا لبعض سطر تعريف (الـ banner، زي [[SSH-2.0-OpenSSH_9.6p1]]) قبل أي تشفير. هنا السيرفر بدل الـ banner بعت [[Exceeded MaxStartups]] وقفل. (في المعمل OpenSSH 9.6 بعت السطر ده. لو سيرفرك مابيبعتهوش، هتشوف [[Connection closed by remote host]] بس، والتشخيص بعدها من لوج sshd.)
- يعني المشكلة **مش** مفتاحك ولا اليوزر ولا الباسورد. السيرفر رفض قبل ما يعرف انت مين.

**٤. لوج sshd** (من console الاستضافة لو مش عارف تدخل، أو بعد ما تدخل):

~~~text الناتج
beginning MaxStartups throttling
drop connection #3 from [198.51.100.50]:55652 on [198.51.100.20]:22 past MaxStartups
~~~

على سيرفر عادي ده في [[journalctl -u ssh]] (اسم الخدمة على أوبونتو [[ssh]]). والسطر فيه IP اللي بيعمل الزحمة: هنا هو جهازي أنا ([[198.51.100.50]]).

### السبب

اتصالات كتير بتتفتح ومبتكملش تسجيل دخول، فـ sshd بيحمي نفسه ويرفض الجديد. في الحالة الحقيقية كانت أداة بتفتح اتصال SSH جديد **لكل أمر** (عشرات في دقايق)، وده كمان ممكن يخلّي [[fail2ban]] يحظر الـ IP بتاعك (ساعتها بتشوف [[Connection refused]] أو timeout، و [[sudo fail2ban-client status sshd]] على السيرفر بيقول IP مين محظور؛ من وثائق fail2ban، ماتجرّبش هنا). وفي الحالة الحقيقية السبب ده كان الأرجح بس ما اتأكدش بلوج؛ في المعمل اتأكد.

### الحل: اتصال واحد بيتعاد استخدامه

~~~text ~/.ssh/config
Host web2
    HostName 198.51.100.20
    User deployer
    ControlMaster auto
    ControlPath ~/.ssh/cm-%r@%h:%p
    ControlPersist 10m
~~~

- [[ControlMaster auto]]: أول [[ssh web2]] يفتح اتصال «رئيسي»، وأي [[ssh web2]] بعده يمشي جواه من غير اتصال TCP جديد ولا مصافحة جديدة.
- [[ControlPath]]: مكان ملف الـ socket اللي بيوصل بيهم. [[%r]] اليوزر و [[%h]] الهوست و [[%p]] البورت، عشان كل سيرفر ليه ملفه.
- [[ControlPersist 10m]]: سيب الاتصال الرئيسي مفتوح ١٠ دقايق بعد آخر استخدام.

والتجربة، **والـ ٣ اتصالات المعلّقة لسه موجودة**:

~~~text الناتج
Master running (pid=3156)
## new plain connection:
Connection closed by 198.51.100.20 port 22
## through the master:
web2
web2
web2
web2
web2
srw------- 1 root root   0 Nov  3 08:39 cm-deployer@198.51.100.20:22
~~~

- [[ssh -O check web2]] بيقول [[Master running]].
- اتصال جديد عادي ([[-o ControlPath=none]]) لسه بيترفض، بس ٥ أوامر جوه الـ master اشتغلوا كلهم، لأنهم مش اتصالات جديدة أصلًا.
- [[s]] في أول [[srw-------]] معناها الملف ده socket.
- [[ssh -O exit web2]] بيقفل الـ master لما تخلص.

### فخ ظهر في الطريق: ssh في سكربت بياكل الـ input

أول مرة جرّبنا ده في سكربت مبعوت بـ heredoc، السكربت **وقف بعد أول [[ssh]]** من غير خطأ. السبب: ssh بيقرا الـ stdin (عشان يبعته للأمر اللي على السيرفر)، فقرا باقي السكربت كله. الحل [[ssh -n]] (stdin فاضي) أو [[< /dev/null]] لأي ssh جوه سكربت أو لوب.

### على ويندوز: الـ multiplexing مش شغّال

جرّبناه على ويندوز 11 على كونتينر SSH منشور على بورت محلي:

~~~text OpenSSH for Windows 9.5 (ssh.exe بتاع ويندوز)
getsockname failed: Not a socket
Read from remote host 127.0.0.1: Unknown error
~~~

~~~text ssh بتاع Git Bash (OpenSSH 10.6)
mux_client_request_session: read from master failed: Connection reset by peer
Failed to connect to new control master
~~~

يعني على ويندوز: شغّل أدواتك من WSL أو من سيرفر لينكس، أو اجمع الأوامر في اتصال واحد ([[ssh web2 'cmd1; cmd2; cmd3']] أو سكربت واحد)، أو افتح جلسة واحدة جوه [[tmux]] على السيرفر واشتغل منها.

### البدايل اللي اترفضت

| البديل | ليه لأ |
|---|---|
| تكبّر [[MaxStartups]] على السيرفر | بتعالج العَرَض، وبتشيل حماية حقيقية من البوتات اللي بتجرّب باسوردات |
| تعمل restart لـ sshd | الاتصالات المعلّقة بتخلص لوحدها بعد [[LoginGraceTime]]، والـ restart مش هيمنع أداتك تعمل نفس الزحمة تاني. ولو غلطت في إعداده ممكن تقفل الباب على نفسك |
| تقفل fail2ban | نفس الكلام: حماية بتشيلها عشان أداة عندك مش متظبطة |

### اتأكد

[[ssh -O check web2]] بيقول [[Master running]]، و [[journalctl -u ssh --since "10 min ago" | grep -c "Accepted publickey"]] (عدد مرات الدخول) بقى رقم صغير بدل العشرات، ومفيش [[past MaxStartups]] في اللوج بعدها.

---

## الحالة التانية: «Failed to fetch» بعد ٢٦ ثانية

### العَرَض

صفحة بتطلب API، والمتصفح بيقول [[TypeError: Failed to fetch]] بعد حوالي ٢٦ ثانية، أو بيلف. والـ health check على السيرفر أخضر، و [[docker logs]] مفيهاش ولا خطأ. «Failed to fetch» رسالة عامة جدًا: معناها «الطلب ماخدش رد»، ومبتقولش ليه.

### قسّم الوقت

درس «الموقع بطيء مش واقع» في نفس التاب فيه [[curl -w]]. هنا بنستخدمه للمقارنة بين مكانين. المعمل: كونتينر عميل اسمه [[slow]] ضفنا على كارت الشبكة بتاعه تأخير ١.٥ ثانية:

~~~bash
tc qdisc add dev eth0 root netem delay 1500ms
~~~

[[tc]] (traffic control) بيتحكم في الطابور بتاع كارت الشبكة، و [[netem]] بيضيف تأخير أو فقد للـ packets. ده بيمثّل شبكة عميل سيئة (واي فاي ضعيف، VPN بعيد، مزوّد نت زحمة). محتاج [[--cap-add NET_ADMIN]] على الكونتينر، وللمعمل بس.

~~~text نفس الطلب من ٣ أماكن
slow client:   dns=0.000733 connect=3.000945 tls=4.504050 ttfb=6.004478 total=7.504781 code=200
server itself: dns=0.000010 connect=0.000175 tls=0.002691 ttfb=0.002995 total=0.003023 code=200
other client:  dns=0.000616 connect=0.000750 tls=0.003232 ttfb=0.003585 total=0.003612 code=200
~~~

اقرا الأرقام (كلها بالثانية، وكل رقم من بداية الطلب):

| المرحلة | العميل البطيء | السيرفر لنفسه | معناها |
|---|---|---|---|
| dns | 0.0007 | 0.00001 | السؤال عن العنوان: سريع في الاتنين |
| connect | **3.0** | 0.0002 | فتح TCP: رايح جاي على الشبكة. هنا راح الوقت |
| tls | **4.5** | 0.0027 | المصافحة: رحلات كمان على نفس الشبكة البطيئة |
| ttfb | **6.0** | 0.0030 | من بعد الطلب لأول byte: السيرفر نفسه بيرد في 0.0003 (الفرق بين tls و ttfb عنده) |
| total | **7.5** | 0.0030 | |

الحكم: السيرفر بيخلّص الطلب كله في ٣ مللي ثانية. والعميل التاني على نفس السيرفر سريع. يعني الوقت كله في الطريق بين العميل البطيء والسيرفر، مش في السيرفر. لو كان السيرفر هو البطيء كنت هتلاقي [[connect]] و [[tls]] صغيرين عند الكل و [[ttfb]] كبير عند الكل، **ومن السيرفر لنفسه كمان**.

### ولما يعدّي الحد

~~~text curl -sSk -o /dev/null -m 4 https://shop.example/  (من العميل البطيء)
curl: (28) Operation timed out after 4002 milliseconds with 0 bytes received
~~~

[[-m 4]] حد أقصى ٤ ثواني للطلب كله، و [[(28)]] كود curl للـ timeout. وده بالظبط اللي المتصفح بيعمله: الـ fetch ليه حد (أو الـ proxy أو الـ VPN في النص)، ولما يعدّي بيقول «Failed to fetch».

### دليل تاني من السيرفر: الطلب وصل أصلًا؟

~~~text tail -3 /var/log/nginx/access.log
198.51.100.50 - - [03/Nov/2026:08:40:08 +0000] "GET / HTTP/2.0" 200 18564 "-" "curl/8.5.0"
198.51.100.50 - - [03/Nov/2026:08:40:09 +0000] "GET / HTTP/2.0" 200 18564 "-" "curl/8.5.0"
198.51.100.60 - - [03/Nov/2026:08:40:09 +0000] "GET / HTTP/2.0" 200 18564 "-" "curl/8.5.0"
~~~

الطلب اللي عمل timeout ([[198.51.100.60]] الساعة 08:40:05 تقريبًا) **مش موجود** في اللوج. السطر الوحيد من الـ IP ده هو اللي بعد ما شلنا التأخير. يعني الطلب عمره ما وصل لمرحلة HTTP على السيرفر. والـ health check أخضر لأنه بيتعمل من مكان شبكته سليمة. لو المشكلة في السيرفر، كنت هتلاقي الطلب في اللوج ووقته كبير، أو [[499]] (العميل قفل قبل الرد) أو [[504]].

### على ويندوز

~~~powershell
curl.exe -s -o NUL -w "dns=%{time_namelookup} connect=%{time_connect} tls=%{time_appconnect} ttfb=%{time_starttransfer} total=%{time_total} code=%{http_code}$__btn" https://example.com/
Test-NetConnection example.com -Port 443 -InformationLevel Quiet
~~~

~~~text الناتج (من جهاز المعمل لموقع عام)
dns=0.116732 connect=0.186462 tls=0.260901 ttfb=0.356971 total=0.357032 code=200
True
~~~

- [[$__btn]] في PowerShell هي السطر الجديد (زي [[\n]])، و [[NUL]] زي [[/dev/null]].
- [[Test-NetConnection -Port]] بيجرّب يفتح TCP على البورت، و [[-InformationLevel Quiet]] يرجّع [[True]] أو [[False]] بس. وده بديل [[/dev/tcp]] في PowerShell:

~~~powershell
foreach ($p in 22, 80, 443) { $r = Test-NetConnection 198.51.100.20 -Port $p -WarningAction SilentlyContinue; "{0} {1}" -f $p, $(if ($r.TcpTestSucceeded) {'open'} else {'CLOSED'}) }
~~~

وفي المتصفح: DevTools ← Network ← اضغط الطلب ← Timing: نفس المراحل بالظبط (DNS Lookup و Initial connection و SSL و Waiting for server response).

### العطل عند مين؟ جدول القرار

| اللي شفته | المكان الأرجح |
|---|---|
| [[dns]] كبير | الـ resolver عندك (جرّب [[--dns-servers]] أو resolver تاني، أو [[Resolve-DnsName -Server 1.1.1.1]]) |
| [[connect]] كبير عندك بس، وصغير من جهاز تاني | الطريق من عندك: الشبكة، الـ VPN، الواي فاي |
| [[connect]] كبير عند الكل | السيرفر زحمة على مستوى الشبكة، أو الفايروول بيأخّر، أو [[backlog]] مليان |
| [[tls]] كبير و [[connect]] صغير | المعالج على السيرفر مشغول، أو شبكة بتفقد packets في المصافحة |
| [[ttfb]] كبير عند الكل، **حتى من السيرفر لنفسه** | التطبيق بطيء (وحدة «جوه البروسس» في نفس التاب) |
| timeout والطلب مش في access.log | الطلب ماوصلش: الطريق أو فايروول أو جهاز العميل |
| timeout والطلب في access.log بـ [[499]] أو [[504]] | وصل والسيرفر اتأخر |

### أعد بعد دقايق، ومن مكان تاني

مشاكل الطريق بتيجي وتروح. نفس القياس بعد ٥ دقايق، ومن موبايل على باقة بدل الواي فاي، بيقولك كتير. وفي المعمل: [[tc qdisc del dev eth0 root]] (شيل التأخير) والطلب رجع [[0.003649]] ثانية.

---

## الخلاصة

| الخطوة | الأمر | بيجاوب على |
|---|---|---|
| ١ | [[curl -w '%{http_code} %{time_total}']] | الخدمة نفسها عايشة؟ |
| ٢ | [[/dev/tcp]] أو [[Test-NetConnection -Port]] | البورتات بترد؟ |
| ٣ | [[ssh -v]] | اتقفل قبل الـ banner ولا بعده؟ |
| ٤ | لوج sshd | [[past MaxStartups]]؟ مين بيزحم؟ |
| ٥ | [[curl -w]] بالمراحل | الوقت راح في أنهي مرحلة؟ |
| ٦ | نفس الطلب من السيرفر لنفسه | السيرفر ولا الطريق؟ |
| ٧ | access.log | الطلب وصل أصلًا؟ |

> لو السيرفر بيرد على نفسه وعلى الناس التانية في مللي ثواني، **ماتغيّرش فيه حاجة**: العطل في المكان اللي الأرقام قالت عليه.`,
          deep: {
            why: R`أغلب الوقت الضايع في الأعطال بيروح في إصلاح الحاجة الغلط: restart لسيرفر سليم، أو تكبير حدود حماية، أو تغيير كود. فصل الخدمات (ويب، SSH) عن بعض، وتقسيم الطلب لمراحل، والمقارنة بين مكانين، بيحوّلوا «حاسس إن السيرفر بطيء» لجملة فيها رقم ومكان.`,
            how: R`SSH بيبدأ بـ TCP، وبعدين كل طرف بيبعت سطر تعريف (الـ banner)، وبعدين تبادل مفاتيح (kex)، وبعدين تسجيل الدخول. sshd بيعد الاتصالات اللي في المرحلة قبل تسجيل الدخول، ولما تعدّي [[MaxStartups]] بيقفل الجديد في مرحلة الـ banner. و [[ControlMaster]] بيخلّي كل [[ssh]] بعد الأول يبعت طلبه على socket محلي للبروسس الرئيسي، والرئيسي بيفتح «قناة» جديدة جوه نفس اتصال SSH، فمفيش TCP جديد ولا مصافحة. وفي HTTP: [[curl -w]] بيقيس كل مرحلة من لحظة البداية: DNS، ثم SYN و SYN-ACK (connect)، ثم مصافحة TLS (رحلتين أو أكتر)، ثم الطلب والانتظار لأول byte، ثم باقي الرد. كل مرحلة فيها رحلة شبكة بتتضرب في التأخير، عشان كده شبكة بطيئة بتكبّر connect و tls و ttfb كلهم، والسيرفر البطيء بيكبّر ttfb بس.`,
            when: R`أي «مش شغّال عندي»: ssh بيقفل، أو طلب بيعلّق، أو صفحة بطيئة عند ناس بس. وقبل أي restart أو تغيير إعداد بسبب شكوى عميل. وكمان لو بتكتب أداة أو سكربت بيكلّم سيرفر كتير: اتصال واحد مفتوح أحسن من اتصال لكل أمر.`,
            mistakes: R`تعمل restart لـ sshd أو للتطبيق «عشان نجرّب». وتكبّر [[MaxStartups]] أو تقفل fail2ban بدل ما تصلّح أداتك. وتختبر البورت 22 كتير ورا بعض بـ [[nc]] أو [[/dev/tcp]] وانت ناسي إن كل اختبار نفسه اتصال بيتحسب. و [[ssh]] جوه لوب أو سكربت من غير [[-n]] فبياكل باقي الـ input. وتقيس من السيرفر بس وتقول «سريع» والعميل لسه بيشتكي. وتصدّق «Failed to fetch» إنها خطأ في الكود من غير ما تشوف الطلب وصل للـ access.log ولا لأ. وعلى ويندوز تتوقع [[ControlMaster]] يشتغل.`
          },
          sol: R`الحالة الأولى في المعمل: الموقع [[200 0.000506s]]، و [[22 open]] و [[80 open]]، و [[ssh -v]] فيه [[Connection established]] ثم [[banner line 0: Exceeded MaxStartups]] ثم [[Connection closed by remote host]]، ولوج sshd فيه [[drop connection #3 ... past MaxStartups]]. بعد [[ControlMaster]]: [[Master running]] و ٥ مرات [[web2]] والاتصالات المعلّقة لسه موجودة.

الحالة التانية: العميل البطيء [[connect=3.000945 tls=4.504050 ttfb=6.004478 total=7.504781]]، والسيرفر لنفسه [[total=0.003023]]، وعميل تاني [[total=0.003612]]. و [[-m 4]] من العميل البطيء [[curl: (28) Operation timed out after 4002 milliseconds with 0 bytes received]]، والطلب ده مش موجود في [[access.log]].

اتجرّب على كونتينرات Ubuntu 24.04 (OpenSSH 9.6 و nginx و curl 8.5 و [[tc]] من iproute2)، وأوامر ويندوز ([[Test-NetConnection]] و [[curl.exe -w]]) على PowerShell 7 في ويندوز 11، و [[ControlMaster]] على ويندوز اتجرّب وفشل بالرسايل اللي في الشرح.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: رتّب ٥ أوامر تشخيص لـ «ssh بيتقفل والموقع شغّال» من الأسرع للأعمق، وجنب كل واحد سؤال بيجاوبه.`, done: R`الترتيب: الموقع بـ curl، والبورتات، و [[ssh -v]]، ولوج sshd، وبعدين «مين بيزحم» من الـ IP في اللوج، وكل سؤال مكتوب في سطر، وفيه ملحوظة إن اختبار البورت 22 نفسه بيتحسب اتصال.` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: سطر [[curl -w]] ده جاي من عميل: [[dns=0.002 connect=0.031 tls=0.065 ttfb=9.420 total=9.431]]، ومن السيرفر لنفسه: [[ttfb=9.380 total=9.385]]. العطل فين؟ واكتب أول ٣ أوامر هتشغّلهم على السيرفر.`, done: R`الحكم: التطبيق نفسه بطيء (ttfb كبير حتى من السيرفر لنفسه والطريق سريع)، والأوامر من وحدة «جوه البروسس» أو درس «الموقع بطيء مش واقع»: لوج التطبيق وقت الطلب، و [[top]] أو [[docker stats]]، وطلب واحد بـ [[curl -w]] على endpoint أبسط زي [[/health]] للمقارنة.` },
            { lvl: 'تطبيق', t: R`ابني المعمل: sshd بـ [[MaxStartups 3:100:3]]، وافتح ٣ اتصالات بـ [[nc]]، وسجّل نص رسالة [[ssh -v]] بالظبط وسطر لوج sshd. وبعدين ظبّط [[ControlMaster]] واعمل ٢٠ أمر جوه الـ master والاتصالات المعلّقة موجودة.`, done: R`عندك الرسالتين منسوخين من الترمنال، و ٢٠ سطر ناتج من الأوامر، و [[ssh -O check]] بيقول [[Master running]]، و [[grep -c "Accepted publickey"]] في لوج sshd زاد ١ بس مش ٢٠.` },
            { lvl: 'تطبيق', t: R`قارن وقيس: على كونتينر عميل بـ [[--cap-add NET_ADMIN]]، قيس نفس الطلب ٣ مرات بتأخير 0 و 200ms و 1500ms ([[tc qdisc replace dev eth0 root netem delay 200ms]]). اعمل جدول بالمراحل الخمسة، واكتب قاعدة: التأخير بيتضرب في كام في كل مرحلة؟`, done: R`الجدول فيه ٣ صفوف، وواضح إن [[dns]] تقريبًا ثابت (لو الـ DNS على نفس الشبكة الداخلية) و [[connect]] و [[tls]] و [[ttfb]] بيزيدوا بمضاعفات التأخير، والقاعدة مكتوبة بالأرقام، و [[tc qdisc del dev eth0 root]] رجّع كله لمللي ثواني.` },
            { lvl: 'تحدي', t: R`ابني [[where-is-the-time.sh <url>]]: بيعمل الطلب من جهازك، وبعدين نفس الطلب من السيرفر لنفسه بـ [[ssh -n]] واحد و [[--resolve]]، ويطبع جدول المرحلتين جنب بعض وسطر حكم من ٣: «السيرفر بطيء» أو «الطريق من عندك» أو «الاتنين سريعين». العتبات بتاعتك انت تحددها وتكتبها.`, done: R`في المعمل بالتأخير بيطبع «الطريق من عندك»، ومن غيره «الاتنين سريعين»، ولو حطيت [[sleep 2]] في التطبيق (أو endpoint بطيء) بيطبع «السيرفر بطيء». وبيفتح اتصال ssh واحد بس في كل تشغيل.` },
            { lvl: 'تحدي', t: R`اشرحها: اكتب رد على عميل بعت «الموقع بتاعكم بيقول Failed to fetch كل شوية، صلّحوا السيرفر». ٦ سطور فيها: إيه اللي اتقاس، والأرقام، والحكم، وطلبين منه (أمر يشغّله أو حاجة يجرّبها)، من غير لهجة «العيب عندك».`, done: R`الرد فيه رقمين حقيقيين على الأقل (وقت السيرفر لنفسه، ووقت من مكان تاني)، وإن الطلب بتاعه مش في اللوج، وطلب إنه يجرّب من شبكة تانية ويبعت ناتج [[curl.exe -w ...]] أو لقطة من Timing في DevTools.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`verdict() {
  echo "$1" | awk '{
    for (i = 1; i <= NF; i++) { split($i, kv, "="); v[kv[1]] = kv[2] }
    d["dns"] = v["dns"]; d["connect"] = v["connect"] - v["dns"]; d["tls"] = v["tls"] - v["connect"]
    d["server"] = v["ttfb"] - v["tls"]; d["download"] = v["total"] - v["ttfb"]
    best = "dns"; for (k in d) if (d[k] > d[best]) best = k
    printf "slowest=%s (%.3fs of %.3fs)\n", best, d[best], v["total"]
  }'
}
verdict "dns=0.000733 connect=3.000945 tls=4.504050 ttfb=6.004478 total=7.504781"
verdict "dns=0.002 connect=0.031 tls=0.065 ttfb=9.420 total=9.431"
verdict "dns=4.900 connect=4.930 tls=4.990 ttfb=5.010 total=5.020"`, expect: [R`slowest=connect (3.000s of 7.505s)`, R`slowest=server (9.355s of 9.431s)`, R`slowest=dns (4.900s of 5.020s)`] },
          ],
        },
        {
          cmd: "نسخة قديمة كسرت الإنتاج",
          title: "ملف اتنسخ بـ scp من جهاز ورا الريبو بـ ٢٠ commit: الاختبارات وقعت، والإنتاج وقع مع أول rebuild",
          learn: R`تعرف من الأخطاء نفسها إن ملف أقدم من الباقي، وترجّع الإنتاج الأول، وتصلّح شغلك فوق آخر نسخة بـ git، وتفهم إن الملف اللي على الديسك مش هو الكود الشغّال لحد ما تبني.`,
          out: R`[[git status --short]] على السيرفر فاضي، والـ container [[Up]] وفيه الرمزين، والاختبارات كلها [[passed]].`,
          desc: R`عدّلت ملف على جهازك ونسخته للسيرفر بـ [[scp]]، وبعد [[docker compose up -d --build]] الاختبارات على السيرفر وقعت كلها بنفس الخطأ: [[AttributeError: module 'app.tools' has no attribute 'HANDOFFS']]. السبب: جهازك كان ورا الريبو بـ ٢٠ commit، فالملف اللي نسخته **مسح** كود زميلك اللي ملف تاني بيعتمد عليه.

القضية بالترتيب: [[grep "^E " | sort | uniq -c]] بيقول إن ٤ فشل = سبب واحد، و [[git status]] و [[git diff]] على السيرفر بيوروك اللي اتمسح، و [[git log HEAD..origin/main]] على جهازك بيوري الـ ٢٠ commit. وأهم نقطة: قبل الـ rebuild الـ container كان لسه شغّال بالكود السليم (الملف على الديسك اتغيّر بس)، فالإنتاج وقع **مع** الـ rebuild. الحل: رجّع ملف السيرفر بـ [[git checkout]] وابني (الإنتاج رجع)، وبعدين على جهازك [[git diff > patch]] و [[merge --ff-only]] و [[git apply --3way]]، وانشر بـ git مش بـ scp.`,
          example: R`python3 -m pytest -q 2>&1 | grep -E "^E  " | sort | uniq -c | sort -rn
git status --short && git diff app/tools.py
git checkout -- app/tools.py && docker compose up -d --build --force-recreate app
git fetch origin && git log --oneline HEAD..origin/main -- app/
git diff > ~/my.patch && git checkout -- app/tools.py && git merge --ff-only origin/main
git apply --3way ~/my.patch && python3 -m pytest -q
git commit -m "tools: format_price" && git push origin main
ssh web1 'cd /srv/shop && git pull --ff-only && docker compose up -d --build app'`,
          lines: [
            R`على السيرفر: كام سبب ورا الفشل؟ pytest بيكتب سطر الخطأ في كل اختبار فاشل وأوله [[E]]، فـ [[grep -E "^E  "]] يطلّعهم، و [[sort | uniq -c]] يعد المتكرر، و [[sort -rn]] الأكتر الأول. سطر واحد برقم كبير = سبب واحد.`,
            R`على السيرفر (فولدر المشروع ريبو git): [[git status --short]] بيقول [[M app/tools.py]]: الملف ده مختلف عن آخر commit هنا. و [[git diff]] بيوري بالظبط إيه اللي اتشال (سطور [[-]]) وإيه اللي اتضاف ([[+]]).`,
            R`أوقف النزيف الأول: [[git checkout --]] يرجّع الملف لنسخة الـ commit (السليمة)، و [[--build --force-recreate]] يبني image جديدة ويعمل container جديد منها حتى لو compose شايف إن مفيش حاجة اتغيّرت.`,
            R`على جهازك: [[git fetch]] يجيب تاريخ الريبو من غير ما يلمس ملفاتك، و [[HEAD..origin/main]] «الـ commits اللي في الريبو ومش عندي»، و [[-- app/]] اللي لمست الفولدر ده بس.`,
            R`احفظ شغلك كـ patch، ورجّع الملف لنسخة الـ commit، وقدّم الفرع لآخر نسخة. [[--ff-only]] يرفض لو محتاج merge commit بدل ما يخلط حاجة من وراك.`,
            R`حط شغلك فوق الجديد: [[--3way]] لو الـ patch مش راكب بالظبط (السطور اتحركت)، git بيعمل merge بالنسخة الأصلية اللي الـ patch اتعمل منها. وبعدين الاختبارات محلي قبل أي نشر.`,
            R`سجّل وارفع. من هنا الريبو هو المصدر الوحيد للكود.`,
            R`انشر من الريبو: على السيرفر [[git pull --ff-only]] (يرفض لو حد عدّل على السيرفر بإيده)، وابني. ده بدل [[scp]] للملف.`,
          ],
          try: R`ابني المعمل اللي في الشرح (ريبو bare، و [[team]] و [[laptop]] و [[server]] منه، و [[laptop]] ورا بـ ٢٠ commit)، وانسخ [[laptop/app/tools.py]] فوق [[server/app/tools.py]] بـ [[cp]] (مكان [[scp]]). قبل الـ rebuild، قارن [[grep -c HANDOFFS]] على الديسك وجوه الـ container. وبعدين ابني وشوف [[docker compose ps]]، وصلّح بالترتيب اللي في الدرس.`,
          teach: R`## العَرَض

عدّلت [[app/tools.py]] على جهازك (ضفت دالة [[format_price]])، ونسخته للسيرفر:

~~~bash
scp app/tools.py deployer@web1:/srv/shop/app/tools.py
ssh web1 'cd /srv/shop && docker compose up -d --build --force-recreate app'
~~~

وبعدها الاختبارات على السيرفر:

~~~text python3 -m pytest -q (على السيرفر)
FAILED tests/test_pipeline.py::test_run[cart] - AttributeError: module 'app.t...
FAILED tests/test_pipeline.py::test_run[pay] - AttributeError: module 'app.to...
FAILED tests/test_pipeline.py::test_run[ship] - AttributeError: module 'app.t...
FAILED tests/test_pipeline.py::test_run[mail] - AttributeError: module 'app.t...
4 failed in 0.14s
~~~

والـ container نفسه:

~~~text docker compose ps --format '{{.Name}} {{.Status}}'
shop-app-1 Restarting (1) 2 seconds ago
~~~

(في الحالة الحقيقية كانوا ٢٢ اختبار فاشل من ٦٢٩. في المعمل مشروع صغير فيه ٤.)

---

## المعمل

كله اتعمل في كونتينر [[ubuntu:24.04]] (git 2.43 و pytest 7.4) والـ Docker من الجهاز نفسه:

- [[origin.git]]: ريبو bare، ده «GitHub».
- [[team]]: زميلك. عمل أول commit (فيه [[app/tools.py]] و [[app/pipeline.py]] و [[tests/]] و [[Dockerfile]] و [[compose.yml]])، وبعدين ١٨ commit توثيق، وبعدين commit مهم: ضاف [[HANDOFFS]] في [[tools.py]] وخلّى [[pipeline.py]] يستخدمه، وبعدين commit كمان.
- [[laptop]]: انت. عملت clone بعد أول commit بس، يعني ورا بـ ٢٠.
- [[server]]: clone من آخر نسخة، وفيه [[docker compose up -d --build]] شغّال.

~~~text app/pipeline.py (على السيرفر، من commit الزميل)
from app import tools

def run(step):
    out = tools.lookup(step)
    out["handoff"] = tools.HANDOFFS.get(step, "none")
    return out
~~~

~~~text Dockerfile
FROM python:3.12-slim
WORKDIR /srv
COPY app ./app
CMD ["python", "-m", "app.main"]
~~~

[[COPY app ./app]] دي أهم سطر في القضية: الكود بيتنسخ **جوه الـ image وقت البناء**. اللي على الديسك بعد كده مالوش دعوة بالـ container الشغّال.

---

## ١. سبب واحد ولا ٢٢ سبب؟

~~~bash
python3 -m pytest -q -p no:cacheprovider 2>&1 | grep -E "^E  " | sort | uniq -c | sort -rn
~~~

~~~text الناتج
      4 E       AttributeError: module 'app.tools' has no attribute 'HANDOFFS'
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[2>&1]] | pytest بيكتب على الاتنين (stdout و stderr)، فبنجمعهم عشان [[grep]] يشوف الكل |
| [[-p no:cacheprovider]] | متكتبش فولدر [[.pytest_cache]] على السيرفر (مش لازم، بس بيخلّي [[git status]] نضيف) |
| [[grep -E "^E  "]] | السطور اللي أولها [[E]] ومسافتين: ده سطر الخطأ الفعلي في تقرير pytest |
| [[sort]] | يرتّب عشان المتشابه يبقى جنب بعض ([[uniq]] بيقارن الجيران بس) |
| [[uniq -c]] | سطر واحد لكل نص مختلف، وقبله عدد مرات ظهوره |
| [[sort -rn]] | رتّب بالأرقام ([[-n]]) من الكبير للصغير ([[-r]]) |

سطر واحد بـ [[4]] (و ٢٢ في الحالة الحقيقية) = **سبب واحد**. مش هتصلّح ٢٢ حاجة، هتصلّح حاجة واحدة.

وفي PowerShell نفس الفكرة بـ [[Group-Object]]:

~~~powershell
python -m pytest -q -p no:cacheprovider 2>&1 | Select-String '^E\s' | Group-Object Line | Sort-Object Count -Descending | Select-Object Count, Name
~~~

~~~text الناتج (اتجرّب على ويندوز 11 بـ Python 3.14 و pytest 9.1)
Count Name
----- ----
    4 E       AttributeError: module 'app.tools' has no attribute 'HANDOFFS'
~~~

---

## ٢. الخطأ بيقول إيه بالظبط؟

~~~bash
python3 -m pytest -q -p no:cacheprovider 2>&1 | grep -E "^app/.*Error" | sort | uniq -c
~~~

~~~text الناتج
      4 app/pipeline.py:5: AttributeError
~~~

الخطأ في [[pipeline.py]] السطر ٥، وبيدوّر على [[HANDOFFS]] في [[tools]]. وانت **ماعدّلتش** [[pipeline.py]]. يعني ملف مش بتاعك بيستخدم حاجة مش موجودة في ملفك. التفسير الوحيد المعقول: ملفك أقدم من الملف اللي بيستخدمه.

---

## ٣. على السيرفر: إيه اللي اتغيّر عن الريبو؟

~~~text git status --short
 M app/tools.py
~~~

~~~text git diff app/tools.py
@@ -1,4 +1,5 @@
-HANDOFFS = {"pay": "billing", "ship": "warehouse"}
-
 def lookup(name):
     return {"name": name}
+
+def format_price(cents):
+    return f"{cents / 100:.2f} EGP"
~~~

اقرا الـ diff: [[+]] اللي انت ضفته (دالتك)، و [[-]] **اللي اتمسح**: سطر [[HANDOFFS]] بتاع زميلك. انت ماكتبتش «امسح»، بس نسختك من الملف ماكانش فيها السطر ده أصلًا، فلما نسختها فوق الجديدة اتمسح.

> لو السيرفر مفيهوش git (الكود اتنقل بإيد)، المقارنة بتبقى بالملف: [[ssh web1 cat /srv/shop/app/tools.py | diff - app/tools.py]]. الـ [[-]] معناها «اقرا من الـ stdin»، يعني الملف اللي جاي من السيرفر.

---

## ٤. ليه الإنتاج كان سليم لحد الـ rebuild؟

جرّبنا ده في المعمل **قبل** الـ rebuild، بعد [[cp]] (مكان [[scp]]) على طول:

~~~text الناتج
## on disk:
0
## inside the running container:
1
~~~

~~~bash
grep -c HANDOFFS app/tools.py
docker compose exec -T app grep -c HANDOFFS app/tools.py
docker compose exec -T app cat app/tools.py | diff - app/tools.py
~~~

- [[grep -c]] يعد السطور اللي فيها الكلمة: على الديسك 0، وجوه الـ container 1.
- [[exec -T]] شغّل أمر جوه الـ container من غير ترمنال (عشان الناتج يتعمله pipe).
- الـ [[diff]] طلع نفس الفرق اللي في الـ [[git diff]]: الـ container شغّال بالنسخة القديمة السليمة.

**الملف اللي على الديسك مش هو الكود الشغّال.** الـ container عنده نسخة اتعملت وقت الـ build. فالنسخ نفسه ماكسرش حاجة، والـ [[--build]] هو اللي حط النسخة البايظة في الإنتاج:

~~~text docker compose logs app --no-log-prefix (بعد الـ rebuild)
    print("ready:", pipeline.run("pay"), flush=True)
                    ^^^^^^^^^^^^^^^^^^^
  File "/srv/app/pipeline.py", line 5, in run
    out["handoff"] = tools.HANDOFFS.get(step, "none")
                     ^^^^^^^^^^^^^^
AttributeError: module 'app.tools' has no attribute 'HANDOFFS'
~~~

و [[restart: unless-stopped]] في الـ compose خلّاه يقوم ويقع كل شوية ([[Restarting (1)]]). والعكس كمان صحيح: لو صلّحت ملف على السيرفر ونسيت تبني، الإصلاح مش شغّال.

---

## ٥. الحل، بالترتيب: الإنتاج الأول

### (أ) رجّع الإنتاج (على السيرفر)

~~~bash
git checkout -- app/tools.py
git status --short
docker compose up -d --build --force-recreate app
~~~

~~~text الناتج
 Container shop-app-1 Started
shop-app-1 Up 4 seconds
ready: {'name': 'pay', 'handoff': 'billing'}
~~~

[[git checkout -- <file>]] بيرجّع الملف لنسخة آخر commit على السيرفر (السليمة)، و [[git status --short]] بعدها فاضي. وده دقيقة، مش «نصلّح الكود وننشر». دالتك اتشالت من السيرفر مؤقتًا، بس هي لسه على جهازك.

### (ب) صلّح على جهازك فوق آخر نسخة

~~~text git fetch origin && git status -sb
## main...origin/main [behind 20]
 M app/tools.py
~~~

~~~text git log --oneline HEAD..origin/main -- app/
a09df07 pipeline: hand off steps to teams
~~~

[[behind 20]]: الريبو قدامك بـ ٢٠ commit. ومنهم commit واحد بس لمس [[app/]]، وده اللي ضاف [[HANDOFFS]]. ([[git rev-list --count HEAD..origin/main]] بيطبع الرقم لوحده: [[20]].)

~~~bash
git diff > ~/my.patch
git checkout -- app/tools.py
git merge --ff-only origin/main
git apply --check ~/my.patch
~~~

~~~text الناتج
Updating 717ac1c..1d71e96
Fast-forward
error: patch failed: app/tools.py:1
error: app/tools.py: patch does not apply
~~~

الـ patch مش راكب! ليه؟ اتعمل على الملف القديم، والـ hunk بيبدأ من السطر ١ (أول سطر في الملف كان [[def lookup]])، والملف الجديد أول سطر فيه [[HANDOFFS]]. [[git apply]] لما الـ hunk يبدأ من أول الملف بيصر إنه يطابق من أول الملف. [[--check]] جرّب من غير ما يغيّر حاجة، فمفيش ضرر.

~~~text git apply --3way ~/my.patch
Applied patch to 'app/tools.py' cleanly.
~~~

[[--3way]]: الـ patch فيه هاش النسخة الأصلية من الملف ([[index 6dd2002..9a484b5]] في أول الـ diff)، والنسخة دي موجودة في تاريخ الريبو، فـ git بيعمل merge حقيقي بين التلاتة (الأصل، ونسختك، والجديد) بدل ما يدوّر على سطور بالظبط. والنتيجة بتتحط في الـ index (staged)، فـ [[git diff]] هيطلع فاضي و [[git diff --cached]] هو اللي فيه تعديلك.

> طريق تاني بيعمل نفس الحكاية: [[git stash]] ثم [[git merge --ff-only origin/main]] ثم [[git stash pop]] (اتجرّب: [[Auto-merging app/tools.py]]). الـ patch مفيد لما عايز نسخة من شغلك في ملف بره الريبو قبل أي حاجة.

~~~text python3 -m pytest -q
4 passed in 0.08s
~~~

### (ج) انشر بـ git

~~~bash
git commit -qm "tools: format_price" && git push -q origin main
ssh web1 'cd /srv/shop && git pull --ff-only && docker compose up -d --build --force-recreate app'
~~~

---

## ٦. اتأكد

~~~text على السيرفر بعد النشر
Updating 1d71e96..4cc3d8b
2                       ← grep -cE "HANDOFFS|format_price" app/tools.py
4 passed in 0.08s
0                       ← git status --short | wc -l
Up 4 seconds            ← docker compose ps app --format '{{.Status}}'
1                       ← docker compose exec -T app grep -c format_price app/tools.py
ready: {'name': 'pay', 'handoff': 'billing'}
~~~

الملف فيه الحاجتين، والاختبارات سليمة، والسيرفر مفيهوش تعديل بره git، **و الـ container نفسه** فيه دالتك (مش الديسك بس).

---

## ٧. البدايل اللي اترفضت

| البديل | ليه لأ |
|---|---|
| تضيف [[HANDOFFS = {...}]] بإيدك على السيرفر | بتخمّن كود زميلك وقيمه. ولو فيه حاجة تانية اتمسحت ومفيش اختبار ليها، مش هتعرف |
| [[scp]] تاني بعد ما تصلّح | نفس الطريقة اللي عملت المشكلة. والسيرفر يفضل مش عارف هو على أنهي commit |
| [[git pull]] على جهازك والملف متعدّل | لو الملف اتغيّر في الريبو، git بيرفض: [[Your local changes ... would be overwritten]]، ولو مارفضش بيعمل merge commit مالوش لازمة |
| [[git reset --hard origin/main]] على جهازك | بيمسح شغلك (دالتك) من غير سؤال |
| تصلّح الكود والإنتاج واقع | الإنتاج يرجع الأول بـ [[git checkout]] (دقيقة)، والإصلاح بعدين على راحتك |

---

## ٨. متتكررش

- **النشر عن طريق git بس:** push من جهازك، و [[git pull --ff-only]] على السيرفر. و [[--ff-only]] هنا بيرفض لو حد عدّل على السيرفر بإيده.
- **قبل أي نسخ يدوي** (لو مضطر): [[git fetch && git status -sb]] لازم مايكونش فيه [[behind]]، و [[ssh web1 cat <path> | diff - <file>]] تشوف الفرق قبل ما تكتب فوقه.
- **[[git status --short]] على السيرفر فاضي دايمًا.** لو مش فاضي، حد عدّل بإيده: اعرف إيه قبل أي نشر.
- **الاختبارات تتشغّل قبل الـ push** (أو في CI على كل push)، مش بعد ما توصل الإنتاج.
- **افتكر:** الملف على الديسك ≠ الكود الشغّال. بعد أي نسخ أو pull: [[--build]]، وبعده اتأكد من جوه الـ container ([[docker compose exec -T app grep ...]]).

---

## الخلاصة

| السؤال | الأمر | الجواب في المعمل |
|---|---|---|
| كام سبب؟ | [[grep "^E  "]] ثم [[sort]] و [[uniq -c]] | سطر واحد ×4 |
| فين؟ | [[grep "^app/.*Error"]] | [[pipeline.py:5]]، ملف مش بتاعي |
| إيه اتمسح؟ | [[git diff]] على السيرفر | [[-HANDOFFS = ...]] |
| أنا ورا بكام؟ | [[git log HEAD..origin/main]] | ٢٠ commit |
| الشغّال إيه؟ | [[docker compose exec -T app grep -c]] | قبل الـ build: القديم السليم |
| رجّع الإنتاج | [[git checkout -- file]] و [[--build]] | [[ready]] |
| صلّح | [[diff > patch]] و [[ff-only]] و [[apply --3way]] | [[4 passed]] |`,
          deep: {
            why: R`[[scp]] بينسخ ملف، مش «تعديل». الملف فيه كل حاجة انت شايفها **وكمان** الحاجات اللي مش موجودة عندك، فأي سطر اتضاف في الريبو بعد آخر مرة سحبت بيتمسح. والـ container بيخبّي ده لحد الـ build، فبتفتكر إن النسخ عدّى بسلام. والترتيب (الإنتاج الأول، وبعدين الإصلاح) بيقلل وقت الوقوع من «لحد ما نصلّح» لدقيقة.`,
            how: R`[[git diff]] بيكتب كل تغيير كـ hunk: سطر [[@@ -1,4 +1,5 @@]] (من السطر ١، ٤ سطور قبل و ٥ بعد)، وسطور سياق حواليه. [[git apply]] بيدوّر على سطور السياق في الملف الحالي، ولو الـ hunk بيبدأ من أول الملف بيطلب يطابق من أوله. و [[--3way]] بيستخدم سطر [[index abc..def]] في الـ patch: لو الـ blob الأصلي موجود في الريبو، بيعمل merge بين الأصل ونسختك والنسخة الحالية زي أي merge. وفي Docker: [[COPY]] في الـ Dockerfile بينسخ الملفات جوه layer في الـ image وقت [[build]]، والـ container بيشتغل من الـ image، فتغيير الملف على الديسك مبيوصلش للـ container إلا لو فيه volume مربوط على الفولدر (bind mount) أو عملت build جديد. و [[--force-recreate]] بيعمل container جديد حتى لو compose شايف إن الإعداد ماتغيّرش.`,
            when: R`أي مرة حد بيقول «نسخت الملف للسيرفر وكله باظ»، أو اختبارات كتير وقعت مرة واحدة بعد تعديل صغير، أو [[AttributeError]] أو [[ImportError]] أو [[is not a function]] على حاجة انت مالمستهاش. ونفس السؤال «الشغّال هو اللي على الديسك؟» في أي deploy فيه build: Docker، و Next.js ([[.next]])، و Java ([[jar]])، و Go (binary).`,
            mistakes: R`تصلّح ٢٢ اختبار واحد واحد بدل ما تعد الأسباب. وتضيف الرمز الناقص بإيدك على السيرفر. وتعمل [[scp]] من غير [[git fetch]] قبلها. وتفتكر إن النسخ «عدّى» لأن الموقع لسه شغّال (الـ container لسه القديم). وتعدّل ملف على السيرفر وتنسى الـ build فتقول «الإصلاح مااشتغلش». و [[git apply]] يفشل فتعدّل بإيدك بدل [[--3way]] أو [[stash]]. وتنسى إن [[apply --3way]] بيحط التعديل staged فتفتكر [[git diff]] الفاضي معناه إن مفيش حاجة اتعملت.`
          },
          sol: R`قبل النسخ: [[4 passed]]. بعد [[cp]] و قبل الـ build: على الديسك [[grep -c HANDOFFS]] = 0 وجوه الـ container = 1. بعد الـ build: [[Restarting (1)]] واللوج آخره [[AttributeError: module 'app.tools' has no attribute 'HANDOFFS']]، و pytest على السيرفر [[4 failed]] و [[uniq -c]] سطر واحد [[4 E       AttributeError...]]. و [[git diff]] على السيرفر فيه [[-HANDOFFS = {"pay": "billing", "ship": "warehouse"}]].

بعد [[git checkout -- app/tools.py]] و rebuild: [[ready: {'name': 'pay', 'handoff': 'billing'}]]. وعلى الجهاز: [[behind 20]]، و [[git apply --check]] فشل بـ [[patch does not apply]]، و [[--3way]] طبع [[Applied patch to 'app/tools.py' cleanly.]]، و pytest [[4 passed]]. وبعد النشر بـ [[git pull --ff-only]]: الملف فيه الاتنين، و [[git status --short | wc -l]] = 0، والـ container فيه [[format_price]].

اتجرّب في Ubuntu 24.04 (git 2.43 و pytest 7.4) و [[python:3.12-slim]] للـ container بـ Docker Compose، وسطر PowerShell بتاع [[Group-Object]] على ويندوز 11.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: اكتب ٤ أسئلة بالترتيب تسألها لما ٢٢ اختبار يقعوا مرة واحدة بعد ما نسخت ملف للسيرفر، وجنب كل سؤال الأمر اللي بيجاوبه.`, done: R`الأسئلة: كام سبب ([[uniq -c]])، والخطأ في أنهي ملف وهل هو بتاعي، وإيه اللي اتغيّر عن الريبو على السيرفر ([[git diff]])، وأنا ورا بكام ([[git log HEAD..origin/main]])، وكل أمر مكتوب صح.` },
            { lvl: 'تطبيق', t: R`بيانات حقيقية الشكل: اعمل ملف [[test.log]] فيه ٣٠ سطر خطأ من ٣ أنواع (مثلًا ٢٠ [[AttributeError ... 'HANDOFFS']] و ٨ [[KeyError: 'price']] و ٢ [[TimeoutError]]) متلخبطين ومعاهم سطور تانية. طلّع جدول الأسباب بالعدد بأمر واحد في bash وأمر واحد في PowerShell.`, done: R`الأمرين بيطبعوا ٣ سطور بالترتيب ٢٠ ثم ٨ ثم ٢، وأي سطر مش خطأ مش ظاهر، والأمرين بيطلعوا نفس الأرقام.` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: في المعمل بعد [[cp]] للملف القديم على السيرفر وقبل أي build، توقّع ناتج الـ ٣ أوامر دول: [[grep -c HANDOFFS app/tools.py]] و [[docker compose exec -T app grep -c HANDOFFS app/tools.py]] و [[docker compose ps --format '{{.Status}}']]. وبعدين نفّذ، واعمل build، وكرّر نفس الـ ٣.`, done: R`توقعت قبل الـ build: 0 و 1 و [[Up]]، وبعده: 0 و (الأمر بيفشل أو 0 لأن الـ container بيقوم ويقع) و [[Restarting]]، والنتيجة طابقت، وكتبت جملة: «الديسك اتغيّر، والإنتاج اتغيّر مع الـ build».` },
            { lvl: 'تطبيق', t: R`صلّح السكربت ده اللي بيتشغّل من الجهاز للنشر: [[scp app/*.py web1:/srv/shop/app/ && ssh web1 'cd /srv/shop && docker compose up -d']]. فيه ٣ مشاكل على الأقل. اكتب نسخة آمنة.`, done: R`لقيت: مفيش [[git fetch]] ولا فحص [[behind]]، و [[scp]] بيكتب فوق شغل غيرك، و [[up -d]] من غير [[--build]] مش هيشغّل الكود الجديد أصلًا. والنسخة بتاعتك بتعمل push وعلى السيرفر [[git pull --ff-only]] و [[--build]]، وبترفض لو [[git status --short]] على السيرفر مش فاضي.` },
            { lvl: 'تحدي', t: R`ابني [[guard-scp.sh <local-file> <host> <remote-path>]]: قبل ما ينسخ: [[git fetch]] ويرفض لو [[git rev-list --count HEAD..origin/main]] مش صفر، ويجيب الملف من السيرفر ويطبع [[diff]]، ولو فيه سطور [[-]] (هتتمسح من السيرفر) يسألك «متأكد؟» ويرفض لو مفيش ترمنال. جرّبه على المعمل بـ [[cp]] بدل [[scp]] لو مفيش سيرفر.`, done: R`على [[laptop]] اللي ورا بـ ٢٠ بيرفض ويطبع [[behind origin/main by 20]]، وبعد [[merge --ff-only]] بيوريك الـ diff وفيه سطورك بس كـ [[+]]، ولو بنفسك شلت سطر بيظهر [[-]] وبيسألك، و [[echo y | ./guard-scp.sh ...]] بيرفض لأن مفيش ترمنال.` },
            { lvl: 'تحدي', t: R`اكتب اختبار: ضيف لمشروع المعمل اختبار [[tests/test_contract.py]] بيتأكد إن كل اسم [[pipeline.py]] بيستخدمه من [[tools]] موجود فعلًا (اقرا [[pipeline.py]] بـ [[ast]] وطلّع كل [[tools.X]]). وبعدين انسخ الملف القديم تاني وشوف الاختبار ده بيقول إيه.`, done: R`الاختبار بيعدّي على الكود السليم، ومع [[tools.py]] القديم بيفشل برسالة فيها [[HANDOFFS]] بالاسم (مش [[AttributeError]] من جوه الكود)، وبيتشغّل في أقل من ثانية.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`bash`, run: R`export GIT_AUTHOR_NAME=team GIT_AUTHOR_EMAIL=team@shop.example GIT_COMMITTER_NAME=team GIT_COMMITTER_EMAIL=team@shop.example
export GIT_CONFIG_COUNT=1 GIT_CONFIG_KEY_0=core.autocrlf GIT_CONFIG_VALUE_0=false
git init -q --bare -b main origin.git
git clone -q origin.git team 2>/dev/null && cd team
printf 'def lookup(n):\n    return n\n' > tools.py
git add . && git commit -qm "first" && git push -q origin main && cd ..
git clone -q origin.git laptop
cd team
for i in 1 2 3; do echo "note $i" >> README; git add README; git commit -qm "docs $i"; done
printf 'HANDOFFS = {"pay": "billing"}\n\ndef lookup(n):\n    return n\n' > tools.py && git commit -qam "add HANDOFFS"
git push -q origin main && cd ..
git clone -q origin.git server
printf '\ndef format_price(c):\n    return c / 100\n' >> laptop/tools.py
cp laptop/tools.py server/tools.py
echo "server: $(git -C server status --porcelain | awk '{print $1, $2}')"
git -C server diff tools.py | grep -E '^-HANDOFFS'
git -C server checkout -- tools.py
echo "server clean: $(git -C server status --short | wc -l | tr -d ' ')"
cd laptop && git fetch -q origin
echo "behind: $(git rev-list --count HEAD..origin/main)"
git log --oneline HEAD..origin/main -- tools.py | cut -d' ' -f2-
git diff > ../my.patch && git checkout -- tools.py && git merge -q --ff-only origin/main
git apply --check ../my.patch 2>/dev/null && echo "plain apply ok" || echo "plain apply refused"
git apply --3way ../my.patch 2>&1 | head -1
grep -cE "HANDOFFS|format_price" tools.py`, expect: [R`server: M tools.py`, R`-HANDOFFS = {"pay": "billing"}`, R`server clean: 0`, R`behind: 4`, R`add HANDOFFS`, R`plain apply refused`, R`Applied patch to 'tools.py' cleanly.`] },
          ],
        },
        {
          cmd: "/health بيقول 200 والدخول بايظ",
          title: "المراقبة خضرا والناس مش عارفة تدخل: الـ health check مش دليل إن التطبيق شغّال",
          learn: R`تجرّب endpoint حقيقي زي اليوزر بدل ما تصدّق [[/health]]، وتلاقي السبب في لوج نفس اللحظة، وتقرا الـ environment الحقيقي للبروسس الشغّال، وتعمل [[/ready]] بيكشف المشكلة دي.`,
          out: R`[[/ready]] بيرجّع 503 لما الداتابيز مش جاهزة فعلًا، والدخول 200 بعد التصليح.`,
          desc: R`السيرفر رجع بعد مشكلة، و [[curl /health]] بيرجّع [[200 {"status":"ok","db":true}]]، والمراقبة خضرا. بس اليوزرز بيشتكوا إن الدخول مش شغّال: [[POST /login]] بيرجّع 500، واللوج فيه [[EntityMetadataNotFoundError: No metadata for "User" was found.]].

السبب: التطبيق بيختار ملفات الـ entities حسب [[NODE_ENV === "production"]]، والقيمة على السيرفر كانت [[production1]] (حرف زيادة)، فدوّر على ملفات [[.ts]] مش موجودة، واشتغل من غير ولا جدول. و [[/health]] مبيلمسش الجداول خالص، فقال «تمام». الدرس: الـ health check بيقول «البروسس عايش» بس. الدليل الحقيقي إنك تجرّب اللي اليوزر بيعمله، وإن [[/ready]] يعمل query حقيقي.`,
          example: R`curl -s -w '  HTTP %{http_code}\n' http://127.0.0.1:3000/health
curl -s -X POST http://127.0.0.1:3000/login -H 'Content-Type: application/json' -d '{"email":"demo@shop.example","password":"demo123"}' -w '  HTTP %{http_code}\n'
docker logs api --since 10m 2>&1 | grep -iE "error|entities" | tail -5
grep -n "NODE_ENV" dist/index.js
docker exec api sh -c 'tr "\0" "\n" < /proc/1/environ | grep NODE_ENV'
curl -s -w '  HTTP %{http_code}\n' http://127.0.0.1:3000/ready`,
          lines: [
            R`اللي المراقبة بتسأله: [[/health]]. [[-w]] بيطبع كود الرد بعد الـ body. لو 200، يبقى البروسس عايش وبيرد. لسه مانعرفش حاجة عن الدخول.`,
            R`اللي اليوزر بيعمله فعلًا: [[-X POST]] على [[/login]] ببيانات حساب تجربة بـ [[-d]]، و [[-H 'Content-Type: application/json']] عشان التطبيق يفهم الـ body كـ JSON. هنا ظهر الـ 500.`,
            R`اللوج في نفس الدقايق: [[--since 10m]] آخر ١٠ دقايق بس، و [[2>&1]] عشان Node بيكتب الأخطاء على stderr، و [[grep -iE "error|entities"]] الأخطاء وسطر الـ entities اللي التطبيق بيطبعه وهو بيقوم.`,
            R`مين بيقرر أنهي entities تتحمّل؟ [[grep -n]] على الكود المبني بيوري السطر اللي فيه الشرط ورقمه.`,
            R`القيمة **الحقيقية** في البروسس الشغّال (مش في الـ shell بتاعك): [[/proc/1/environ]] فيه متغيرات البيئة بتاعة البروسس رقم 1 في الـ container، ومفصولة بحرف [[\0]]، فـ [[tr]] بيحوّلها سطور.`,
            R`بعد التصليح (أو كفحص دائم): [[/ready]] بيعمل query حقيقي على الجدول، فيرجّع 503 لو الداتابيز أو الـ entities مش جاهزين، و 200 لو كله تمام.`,
          ],
          try: R`ابني المعمل اللي في الشرح (Node 22 و TypeORM 0.3 و sql.js في كونتينر [[node:22-slim]])، وشغّله مرة بـ [[NODE_ENV=production1]] ومرة بـ [[production]]. في كل مرة اسأل [[/health]] و [[/ready]] و [[/login]] واكتب الأكواد التلاتة في جدول.`,
          teach: R`## العَرَض

السيرفر رجع بعد مشكلة (في الحالة الحقيقية: reboot وخدمة اتشغّلت تاني بطريقة غير الأولانية). المراقبة بتسأل [[/health]] كل دقيقة، وكله أخضر:

~~~text curl -s -w "  HTTP %{http_code}\n" http://127.0.0.1:3000/health
{"status":"ok","db":true}  HTTP 200
~~~

بس الناس بتقول «مش عارفين ندخل».

---

## المعمل

API صغير بـ Node 22 و TypeORM 0.3.31، وقاعدة [[sql.js]] (SQLite جوه الذاكرة، عشان المعمل مايحتاجش سيرفر داتابيز). الكود «مبني» في [[dist/]] زي أي مشروع TypeScript بعد [[tsc]]:

~~~text dist/entity/User.js
const { EntitySchema } = require("typeorm");
module.exports = new EntitySchema({
  name: "User",
  columns: {
    id: { type: Number, primary: true, generated: true },
    email: { type: String, unique: true },
    password: { type: String },
  },
});
~~~

~~~text dist/index.js (الأجزاء المهمة)
const isProd = process.env.NODE_ENV === "production";
const db = new DataSource({
  type: "sqljs",
  synchronize: true,
  entities: [isProd ? __dirname + "/entity/*.js" : "src/entity/*.ts"],
});

// /health: البروسس عايش؟
res.end(JSON.stringify({ status: "ok", db: db.isInitialized }));

// /login: اللي اليوزر بيعمله
const user = await db.getRepository("User").findOneBy({ email });
~~~

- [[entities]]: TypeORM بيدوّر على الملفات دي ويقرا منها الجداول. في التطوير ([[ts-node]]) الملفات [[.ts]] في [[src/]]، وفي الإنتاج [[.js]] في [[dist/]]. الشرط ده شائع جدًا في مشاريع TypeORM.
- [[db.isInitialized]]: «الاتصال بالداتابيز اتفتح». مبيقولش حاجة عن الجداول.
- (الباسورد هنا نص عادي عشان المعمل يبقى قصير. في تطبيق حقيقي بيتخزّن hash بـ bcrypt أو argon2.)

والتشغيل بالقيمة اللي كانت على السيرفر:

~~~bash
docker run -d --name api -e NODE_ENV=production1 -v "$PWD:/app" -w /app node:22-slim node dist/index.js
~~~

---

## ١. جرّب اللي اليوزر بيعمله

~~~text الناتج
{"error":"internal"}  HTTP 500
~~~

ده أول دليل حقيقي: الدخول نفسه بايظ، مش المتصفح ولا الفورم. وبالترتيب ده عشان ٥٠٠ معناه «التطبيق نفسه فشل» (لو كان 502 يبقى nginx مش لاقي التطبيق، ودي قضية «502 Bad Gateway» في نفس التاب. ولو 401 يبقى البيانات غلط).

---

## ٢. اللوج في نفس اللحظة

~~~text docker logs api 2>&1 | tail -3
api listening on 3000, NODE_ENV=production1
db ready, entities: (none)
2026-11-03T08:48:48.868Z POST /login EntityMetadataNotFoundError: No metadata for "User" was found.
~~~

- [[No metadata for "User" was found.]]: TypeORM مش عارف أي جدول اسمه User. مش «اليوزر مش موجود»، ده «**الجدول نفسه** مش معرّف».
- والدليل كان موجود من أول ما التطبيق قام: [[entities: (none)]]. التطبيق قام واشتغل وفتح الداتابيز، ومحمّلش ولا entity. وكل [[/health]] بعدها قال تمام.
- و [[NODE_ENV=production1]] مطبوعة في أول سطر! أي سطر بيطبعه التطبيق وهو بيقوم يستاهل تقراه.

---

## ٣. مين بيقرر أنهي entities؟

~~~text grep -n "NODE_ENV" dist/index.js
5:const isProd = process.env.NODE_ENV === "production";
~~~

[[===]] مقارنة بالظبط: [[production1]] مش [[production]]، فـ [[isProd]] بقت [[false]] والتطبيق دوّر على [[src/entity/*.ts]]:

~~~text ls dist/entity src
ls: cannot access 'src': No such file or directory
dist/entity:
User.js
~~~

[[src]] مش موجود على السيرفر أصلًا (اللي اتنشر [[dist]] بس). TypeORM مالقاش ملفات، **ومطلّعش خطأ**: «مفيش entities» بالنسباله حالة عادية.

---

## ٤. القيمة الحقيقية في البروسس الشغّال

ليه منكتبش [[echo $NODE_ENV]]؟ لأن ده الـ shell **بتاعك**، مش البروسس اللي شغّال. البروسس ممكن يكون واخد القيمة من ملف [[.env]] أو من الـ systemd unit أو من pm2 أو من compose، وكل واحد ممكن يختلف:

~~~text docker exec api sh -c 'tr "\0" "\n" < /proc/1/environ | grep NODE_ENV'
NODE_ENV=production1
~~~

[[/proc/<PID>/environ]] فيه المتغيرات زي ما البروسس استلمها وهو بيبدأ. ولو التطبيق شغّال كخدمة systemd، نفس الفكرة:

~~~bash
systemctl show api -p Environment
sudo tr '\0' '\n' < /proc/$(systemctl show api -p MainPID --value)/environ | grep NODE_ENV
~~~

~~~text الناتج (اتجرّب بخدمة تجربة في المعمل)
Environment=NODE_ENV=production1
NODE_ENV=production1
~~~

- [[systemctl show -p Environment]]: اللي مكتوب في الـ unit.
- [[-p MainPID --value]]: رقم البروسس الرئيسي بس، من غير [[MainPID=]].
- ولو pm2: [[pm2 env <id>]] بيطبع المتغيرات بتاعة البروسس ده (من وثائق pm2).

---

## ٥. الحل، والتأكد

صلّح القيمة في المكان اللي البروسس بياخدها منه (هنا [[-e NODE_ENV=production]] في الـ compose أو أمر التشغيل، أو [[Environment=]] في الـ unit، أو [[.env]])، وأعد التشغيل:

~~~text NODE_ENV=production
db ready, entities: User
health  200
ready   200
ready
login   {"token":"demo-token"}  HTTP 200
~~~

[[entities: User]] في اللوج، والدخول 200.

---

## ٦. خلّي الفحص يشوف المشكلة دي المرة الجاية: [[/ready]]

[[/health]] وحده كان بيكدب. ضفنا endpoint تاني بيعمل اللي التطبيق بيعمله فعلًا، query صغير:

~~~text dist/index.js
if (req.url === "/ready") {
  try {
    await db.getRepository("User").count();
    res.writeHead(200); return res.end("ready\n");
  } catch (err) {
    res.writeHead(503); return res.end("not ready: " + err.message + "\n");
  }
}
~~~

ونفس التطبيق بالقيمتين:

| [[NODE_ENV]] | [[/health]] | [[/ready]] | [[/login]] |
|---|---|---|---|
| [[production1]] | 200 | **503** [[not ready: No metadata for "User" was found.]] | 500 |
| [[production]] | 200 | 200 | 200 |

[[/ready]] كان هيمسك المشكلة من أول دقيقة. الفرق بين الاتنين:

- **liveness** ([[/health]]): «البروسس عايش ومش متعلّق؟». رخيص جدًا، ومبيلمسش أي حاجة بره. لو فشل، الحل restart.
- **readiness** ([[/ready]]): «التطبيق يقدر يخدم طلب حقيقي؟». بيلمس الداتابيز أو الكاش أو اللي التطبيق محتاجه. لو فشل، **متبعتلوش زوار**، والـ restart مش هيحل غالبًا (زي هنا).

وفي Docker: [[healthcheck]] في الـ compose ممكن يسأل [[/ready]]، و [[docker compose ps]] يكتب [[unhealthy]]. وفي Kubernetes الاتنين ليهم اسمين منفصلين ([[livenessProbe]] و [[readinessProbe]]).

> وحاجة تالتة أقوى: **smoke test** بعد كل نشر أو reboot بيعمل دخول حقيقي بحساب تجربة (درس «smoke test» في نفس التاب). ده اللي اليوزر بيعمله بالظبط.

---

## البدايل اللي اترفضت

| البديل | ليه لأ |
|---|---|
| restart تاني وتالت | نفس القيمة الغلط، نفس النتيجة. المشكلة مش «حالة» تتمسح بالـ restart |
| تغيّر الشرط لـ [[NODE_ENV.startsWith("prod")]] | بيخبّي الغلطة الإملائية بدل ما يصلّحها، وأي قيمة غريبة تانية هتعدّي |
| تشغّل [[src/*.ts]] بـ [[ts-node]] على السيرفر عشان «يلاقي الملفات» | بقيت بتشغّل الإنتاج بطريقة مختلفة عن اللي كان شغّال بيها (أبطأ في القيام، ومحتاج [[tsconfig.json]] والـ dev dependencies على السيرفر). صلّح القيمة وارجع للطريقة الأصلية |
| تخلّي [[/health]] نفسه تقيل ويلمس الداتابيز | لو الداتابيز وقعت ثانية، المنسّق هيعمل restart للتطبيق على الفاضي. افصل الاتنين |

---

## متتكررش

- **أي مراقبة تسأل [[/ready]] أو endpoint حقيقي**، مش [[/health]] بس.
- **التطبيق يرفض يقوم بقيمة غلط:** في أول الكود [[if (!["production", "development", "test"].includes(process.env.NODE_ENV)) throw ...]]، أو يرفض لو [[entities]] فاضية. وقوع واضح وقت القيام أحسن من شغل ناقص بالساعات.
- **اقرا سطور القيام في اللوج** بعد أي restart أو reboot: [[entities: (none)]] كانت مكتوبة.
- **بعد أي reboot أو نقل:** smoke test فيه دخول حقيقي.

---

## الخلاصة

| الخطوة | الأمر | لقينا |
|---|---|---|
| ١ | [[curl /health]] | 200: البروسس عايش (مش كفاية) |
| ٢ | [[curl -X POST /login]] | 500: الحاجة الحقيقية بايظة |
| ٣ | [[docker logs --since]] | [[No metadata for "User"]] و [[entities: (none)]] |
| ٤ | [[grep -n NODE_ENV]] | الشرط [[=== "production"]] |
| ٥ | [[/proc/1/environ]] | [[production1]] |
| حل | القيمة الصح وإعادة تشغيل | الدخول 200 |
| منع | [[/ready]] بـ query حقيقي | 503 لما الجداول مش موجودة |`,
          deep: {
            why: R`أي health check بيجاوب على السؤال اللي اتكتب عشانه بس. [[/health]] اللي بيرجّع [[ok]] ثابت بيقول «البروسس بيرد على HTTP»، ومبيقولش «اليوزر يقدر يدخل». فالمراقبة تفضل خضرا والتطبيق بايظ ساعات، وأول من يعرف هو العميل. الحل مش إنك متصدّقش أي فحص، الحل إن الفحص يعمل اللي اليوزر بيعمله (أو أقرب حاجة ليه).`,
            how: R`TypeORM (زي أغلب الـ ORMs) بيقرا تعريفات الجداول وقت [[initialize()]] من الملفات اللي في [[entities]]. لو الـ glob مالقاش ملفات، بيبدأ عادي بـ صفر entities ومبيطلّعش خطأ، والخطأ بيطلع بعدين أول ما كود يطلب [[getRepository("User")]]: [[EntityMetadataNotFoundError]]. و [[process.env.NODE_ENV]] بيتقري مرة وقت ما البروسس يبدأ من البيئة اللي اتسلّمتله (systemd أو pm2 أو docker أو [[.env]] عن طريق dotenv)، ومتغيرات الـ shell بتاعك مالهاش دعوة. و Linux بيحفظ نسخة منها في [[/proc/<PID>/environ]] مفصولة بـ NUL. وفي Docker و Kubernetes، الـ readiness probe بيقرر الطلبات تروح للـ container ولا لأ، والـ liveness بيقرر يعمل restart ولا لأ، فالخلط بينهم بيعمل restarts على الفاضي أو زوار على تطبيق مش جاهز.`,
            when: R`بعد أي reboot أو نقل أو تغيير طريقة تشغيل (systemd لـ pm2 لـ docker)، وأي وقت المراقبة خضرا والشكاوي جاية. وكمان وانت بتصمّم الفحوصات لتطبيق جديد: [[/health]] رخيص للـ liveness، و [[/ready]] فيه query حقيقي، و smoke test بعد كل نشر.`,
            mistakes: R`تصدّق المراقبة وتقول للعميل «عندنا شغّال». و [[echo $NODE_ENV]] في الـ shell بتاعك وتفتكره هو اللي في البروسس. وتعمل restart كذا مرة. وتصلّح بشرط أوسع ([[startsWith]]) يخبّي الغلطة. وتشغّل الإنتاج بطريقة مختلفة (ts-node بدل dist) عشان «يشتغل وخلاص». وتخلّي [[/health]] يلمس كل حاجة فيعمل restarts مع أي مشكلة لحظية في الداتابيز. وتتجاهل سطر [[entities: (none)]] في لوج القيام.`
          },
          sol: R`بـ [[NODE_ENV=production1]]: [[/health]] بيرجّع [[{"status":"ok","db":true}  HTTP 200]]، و [[/login]] بيرجّع [[{"error":"internal"}  HTTP 500]]، واللوج فيه [[db ready, entities: (none)]] و [[EntityMetadataNotFoundError: No metadata for "User" was found.]]، و [[/proc/1/environ]] فيه [[NODE_ENV=production1]]، و [[/ready]] بيرجّع 503 و [[not ready: No metadata for "User" was found.]].

بـ [[NODE_ENV=production]]: [[db ready, entities: User]]، و [[/health]] و [[/ready]] 200، و [[/login]] [[{"token":"demo-token"}  HTTP 200]].

اتجرّب في [[node:22-slim]] (Node 22) مع [[typeorm@0.3.31]] و [[sql.js@1.15.2]]، والطلبات بـ curl 8.5 من كونتينر تاني على نفس الشبكة. و [[systemctl show -p Environment]] اتجرّب بخدمة [[systemd-run]] تجربة على Ubuntu 24.04. و [[pm2 env]] من وثائق pm2.`,
          practice: [
            { lvl: 'سريع', t: R`من غير ما تبص: إيه الفرق بين [[/health]] و [[/ready]]؟ ولما كل واحد فيهم يفشل، المفروض يحصل إيه (restart ولا وقف الزوار)؟ اكتب مثال لحاجة تخلّي [[/ready]] يفشل و [[/health]] لأ.`, done: R`كتبت: liveness بيقول البروسس عايش وفشله = restart، و readiness بيقول يقدر يخدم وفشله = متبعتلوش زوار، ومثال زي «الداتابيز واقعة» أو «entities مش متحمّلة» أو «migration لسه شغّالة».` },
            { lvl: 'تطبيق', t: R`ابني المعمل وشغّله بالقيمتين، واملا الجدول ده لكل واحدة: [[/health]] و [[/ready]] و [[/login]] بحساب صح و [[/login]] بباسورد غلط. وبعدين جرّب قيمة تالتة: من غير [[NODE_ENV]] خالص.`, done: R`الجدول فيه ٣ صفوف × ٤ أكواد، وبـ [[production]]: 200 و 200 و 200 و 401، وبالقيمتين التانيين: 200 و 503 و 500 و 500، وكتبت ليه الـ 401 مابيظهرش غير لما الجداول موجودة.` },
            { lvl: 'تطبيق', t: R`اقرا وتوقّع: فيه خدمة systemd مكتوب فيها [[Environment=NODE_ENV=production]]، وفي فولدر التطبيق ملف [[.env]] فيه [[NODE_ENV=production1]]، والتطبيق بيعمل [[require("dotenv").config()]] في أوله. القيمة الحقيقية جوه البروسس هتبقى إيه؟ وبعدين اعملها في المعمل واتأكد من [[/proc/<PID>/environ]] ومن [[process.env]] جوه التطبيق.`, done: R`توقعت إن dotenv **مبيكتبش فوق** متغير موجود أصلًا، فالقيمة [[production]]، وإن [[/proc/<PID>/environ]] بيوري اللي systemd بعته بس (مش اللي dotenv قراه)، والتجربة أكدت الاتنين، وكتبت ليه [[/proc]] ممكن يختلف عن [[process.env]] لما dotenv يضيف متغيرات.` },
            { lvl: 'تطبيق', t: R`صلّح الكود: اكتب أول ١٠ سطور في [[dist/index.js]] تخلّي التطبيق **يرفض يقوم** لو [[NODE_ENV]] مش واحدة من [[production]] و [[development]] و [[test]]، أو لو بعد [[initialize()]] عدد [[db.entityMetadatas]] صفر. الرسالة لازم تقول القيمة الغلط.`, done: R`بـ [[production1]] التطبيق بيخرج بكود غير صفر ورسالة فيها [[production1]] قبل ما يفتح البورت، و [[docker ps -a]] بيقول [[Exited (1)]]، وبـ [[production]] بيقوم عادي، وكتبت ليه وقوع واضح أحسن من شغل ناقص.` },
            { lvl: 'تحدي', t: R`ابني [[smoke.sh <base-url>]]: بيسأل [[/health]] و [[/ready]] ويعمل دخول حقيقي بحساب تجربة من متغيرات بيئة ([[SMOKE_EMAIL]] و [[SMOKE_PASSWORD]]، مش مكتوبين في السكربت)، ويطبع جدول ويخرج بكود مختلف لكل فشل (2 للـ health، و 3 للـ ready، و 4 للدخول). وجرّبه على المعمل بالقيمتين.`, done: R`بـ [[production]] كله [[OK]] وكود 0، وبـ [[production1]] [[health OK]] و [[ready FAIL]] و [[login FAIL]] وكود 3، ومن غير المتغيرات بيطبع إنهم ناقصين وكود غير صفر من غير ما يبعت طلب دخول فاضي، والباسورد مش ظاهر في أي ناتج.` },
            { lvl: 'تحدي', t: R`اكتب اختبار: اختبار (Node [[node:test]] أو أي إطار) بيشغّل التطبيق بـ [[NODE_ENV=production1]] على بورت عشوائي، ويتأكد إن [[/ready]] بيرجّع 503، وبـ [[production]] إنه 200 وإن الدخول 200. يتشغّل في CI.`, done: R`[[node --test]] بيطبع ٢ pass، والاختبار بيقفل السيرفر في الآخر (مفيش بروسس معلّق بعده)، ولو شلت الـ [[try/catch]] من [[/ready]] الاختبار بيفشل.` },
          ],
          ci: [
            { os: [R`ubuntu`, R`macos`, R`windows`], sh: R`node`, run: R`import http from "node:http";
function start(env) {
  const tables = env === "production" ? ["User"] : [];
  const srv = http.createServer((req, res) => {
    if (req.url === "/health") { res.writeHead(200); return res.end("ok"); }
    const has = tables.includes("User");
    if (req.url === "/ready") { res.writeHead(has ? 200 : 503); return res.end(has ? "ready" : 'not ready: No metadata for "User" was found.'); }
    if (req.url === "/login") { res.writeHead(has ? 200 : 500); return res.end(has ? "token" : "internal"); }
    res.writeHead(404); res.end();
  });
  return new Promise((ok) => srv.listen(0, "127.0.0.1", () => ok(srv)));
}
for (const env of ["production1", "production"]) {
  const srv = await start(env);
  const base = "http://127.0.0.1:" + srv.address().port;
  const codes = [];
  for (const p of ["/health", "/ready", "/login"]) codes.push(p + "=" + (await fetch(base + p, { method: p === "/login" ? "POST" : "GET" })).status);
  console.log(env.padEnd(12), codes.join(" "));
  srv.close();
}`, expect: [R`production1  /health=200 /ready=503 /login=500`, R`production   /health=200 /ready=200 /login=200`] },
          ],
        },
      ],
    }
]);
