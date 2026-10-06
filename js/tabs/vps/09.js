// تكملة تاب vps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/vps/01.js (شرح حقول الدرس في أوله)
MORE("vps", [
    {
      t: "المراقبة والتنبيهات",
      l: 3,
      n: "تعرف إن الديسك قرّب يتملى قبل ما الموقع يقع، من سكربت Telegram صغير لحد Grafana",
      items: [
        {
          cmd: "تنبيه Telegram",
          title: "سكربت يبعتلك لما الديسك أو الرام يعدّوا حد",
          desc: R`أبسط مراقبة تنفع لـ VPS واحد: سكربت كل ٥ دقايق من cron، بيقرا نسبة الديسك والرام، ولو عدّوا الحد يبعت رسالة على Telegram. وبيبعت مرة واحدة لما المشكلة تبدأ، ومرة لما ترجع طبيعية، مش كل ٥ دقايق.

تعمل bot من [[@BotFather]] في Telegram وتاخد الـ token، وتبعتله أي رسالة، وبعدين [[curl https://api.telegram.org/botTOKEN/getUpdates]] يوريك [[chat.id]] بتاعك. الاتنين في ملف [[/etc/server-alert.env]] بصلاحية 600.`,
          example: R`#!/usr/bin/env bash
set -euo pipefail
source /etc/server-alert.env
HOST=$(hostname)
DISK=$(df --output=pcent / | tail -1 | tr -dc '0-9')
RAM=$(free | awk '/^Mem:/ {printf "%d", ($2 - $7) * 100 / $2}')
send() {
  curl -fsS -m 10 "https://api.telegram.org/bot$TG_TOKEN/sendMessage" \
    -d chat_id="$TG_CHAT" --data-urlencode text="$1" > /dev/null
}
check() {
  local name=$1 value=$2 limit=$3 state=/var/tmp/alert-$1
  if (( value >= limit )); then
    [[ -f $state ]] || { send "ALERT $HOST: $name $value% (limit $limit%)"; touch "$state"; }
  elif [[ -f $state ]]; then
    send "OK $HOST: $name back to $value%"; rm -f "$state"
  fi
}
check disk "$DISK" 85
check ram "$RAM" 90`,
          try: R`احفظ السكربت في [[/usr/local/bin/server-alert.sh]] واعمله [[chmod +x]]، وحط الـ token والـ chat id في الملف. شغّله مرة بحد ديسك أقل من النسبة الحالية (مثلًا 10) وتأكد إن الرسالة وصلت، وشغّله تاني وتأكد إنها موصلتش تاني. وبعدين رجّع الحد 85 وحطه في crontab كل ٥ دقايق.`,
          flag: "script",
          deep: {
            why: R`أشهر سببين لوقوع موقع على VPS: الديسك اتملى (لوجات، أو صور Docker، أو باك أب بيتراكم)، والرام خلصت والـ OOM killer قتل التطبيق. تاب التشخيص بيعلّمك تصلّحهم بعد ما يحصلوا («الديسك اتملى» و «الرام خلصت»). التنبيه على ٨٥٪ بيحوّلهم لصيانة عادية تعملها وانت مرتاح بدل ما العميل يكلّمك.`,
            how: R`[[df --output=pcent /]] بيطبع نسبة استخدام الـ root بس، و [[tr -dc '0-9']] بيشيل أي حاجة مش رقم (المسافات وعلامة ٪) فيفضل رقم تقارنه.

الرام: [[free]] سطر [[Mem:]] فيه total في العمود التاني و available في السابع. المهم available مش free: لينكس بيستخدم الرام الفاضية كـ cache، فـ free دايمًا قليل وده طبيعي. المستخدم فعلًا = total ناقص available.

[[send]] بتكلّم Bot API بـ [[sendMessage]]. و [[--data-urlencode]] عشان الرسالة فيها مسافات و [[%]]. و [[-m 10]] حد أقصى ١٠ ثواني عشان السكربت ميعلقش لو Telegram مش بيرد. و [[-f]] مع [[set -e]] معناها لو الإرسال فشل، السكربت يقف قبل ما يعمل ملف الحالة، فيحاول تاني بعد ٥ دقايق.

ملف الحالة في [[/var/tmp]] هو اللي بيمنع الإزعاج: أول مرة الرقم يعدّي الحد بيبعت ويعمل الملف. طول ما الملف موجود مش بيبعت تاني. ولما الرقم ينزل، يبعت OK ويمسح الملف. ده أهم جزء، من غيره هتوصلك رسالة كل ٥ دقايق لحد ما تعمل mute للبوت، وساعتها التنبيه مالوش لازمة.

وفي crontab: [[*/5 * * * * /usr/local/bin/server-alert.sh >> /var/log/server-alert.log 2>&1]]، أو timer (في قسم cron).`,
            when: "أول يوم على أي VPS فيه موقع حقيقي، حتى قبل أي حاجة أكبر. ولما السيرفرات تبقى أكتر من اتنين أو محتاج تاريخ ورسومات، انقل لـ Grafana أو Beszel.",
            mistakes: R`تحسب الرام من عمود free فتلاقيها ٩٥٪ طول الوقت وتفتكر فيه مشكلة. وتبعت كل ٥ دقايق من غير ملف حالة، فتتجاهل البوت بعد يوم. والـ token جوه السكربت نفسه، والسكربت في repo على GitHub. وسكربت المراقبة محتاج السيرفر يبقى شغال عشان يبعت، فلو السيرفر وقع خالص مش هتعرف منه: ده محتاج فحص من بره (الدرس الأخير في القسم).`
          },
          teach: R`## الأول: سكربت بيسأل سؤالين ويبعت رسالة

السكربت كل ما يشتغل بيقيس نسبة الديسك والرام، ولو واحدة عدّت الحد بيبعت رسالة على Telegram مرة واحدة، ولما ترجع طبيعية بيبعت إنها رجعت. اتجرّب على أوبونتو 24.04 جوه Docker بالسكربت ده بالظبط. ومفيش bot حقيقي هنا، فبدل [[curl]] حطيت برنامج صغير بنفس الاسم بيسجّل هو اتنادى بإيه، فتشوف بالظبط الطلب اللي كان هيروح لـ Telegram. وجربت كمان [[curl]] الحقيقي على Telegram بتوكن غلط عشان تشوف الخطأ.

---

## ١. أول ٣ سطور: إعداد

~~~bash
#!/usr/bin/env bash
set -euo pipefail
source /etc/server-alert.env
~~~

| الحتة | معناها |
|---|---|
| [[#!/usr/bin/env bash]] | الـ shebang: شغّل الملف ده بـ bash (اللي [[env]] يلاقيه في الـ PATH) |
| [[set -e]] | لو أي أمر فشل، اقف |
| [[set -u]] | لو استخدمت متغير مش متعرّف، اقف (بدل ما يبقى فاضي بسكوت) |
| [[set -o pipefail]] | لو أمر في نص pipe فشل، الـ pipe كله يعتبر فاشل |
| [[source /etc/server-alert.env]] | اقرا الملف ده ونفّذه هنا، فالمتغيرات اللي فيه تبقى متاحة |

والملف [[/etc/server-alert.env]] فيه سطرين بس، [[TG_TOKEN=...]] و [[TG_CHAT=...]]، وصلاحيته 600 (root بس يقراه). كده التوكن مش جوه السكربت، فلو السكربت اتنسخ أو اترفع على GitHub التوكن مش معاه.

جربت أكتب الاسم غلط في الملف ([[TG_TOKN]]):

~~~text الناتج
/usr/local/bin/server-alert.sh: line 8: TG_TOKEN: unbound variable
~~~

ده [[set -u]]: وقف وقالك اسم المتغير ورقم السطر بدل ما يبعت لرابط ناقص.

---

## ٢. [[HOST=$(hostname)]]

[[hostname]] بيطبع اسم السيرفر، و [[$( )]] بتحط ناتج الأمر في المتغير. في التجربة [[vps1]]. ده عشان لو عندك كذا سيرفر تعرف الرسالة جاية منين.

---

## ٣. نسبة الديسك

~~~bash
DISK=$(df --output=pcent / | tail -1 | tr -dc '0-9')
~~~

من الشمال لليمين، زي ما الـ pipe بيمشي:

~~~text df --output=pcent /
Use%
  2%
~~~

[[--output=pcent]] اطبع عمود النسبة (percent) بس، للـ [[/]] بس. [[tail -1]] شيل سطر العنوان، فيفضل [[  2%]]. و [[tr -dc '0-9']]: [[tr]] بيبدّل أو يمسح حروف، [[-d]] امسح، و [[-c]] (complement) «كل حاجة ما عدا» الأرقام. فالمسافات و [[%]] بيتمسحوا ويفضل [[2]]: رقم صافي ينفع تقارنه.

---

## ٤. نسبة الرام

~~~bash
RAM=$(free | awk '/^Mem:/ {printf "%d", ($2 - $7) * 100 / $2}')
~~~

[[free]] من غير [[-h]] بيطبع بالـ KB، عشان نحسب:

~~~text free (أول سطرين)
               total        used        free      shared  buff/cache   available
Mem:        16074944     1368356    12520500       77964     2511172    14706588
~~~

و [[awk]] برنامج بيقرا سطر سطر ويقسّم كل سطر لخانات: [[$1]] أول خانة ([[Mem:]])، و [[$2]] التانية (total)، و [[$7]] السابعة (available).

| الحتة | معناها |
|---|---|
| [[/^Mem:/]] | اشتغل بس على السطر اللي أوله [[Mem:]] |
| [[$2 - $7]] | total ناقص available = المستخدم فعلًا |
| [[* 100 / $2]] | حوّله نسبة من الإجمالي |
| [[printf "%d"]] | اطبعه رقم صحيح من غير كسور |

(16074944 − 14706588) × 100 ÷ 16074944 = 8.5، فـ [[RAM]] طلع [[8]]. ولاحظ إن الـ [[$2]] هنا جوه علامات تنصيص مفردة، فده بتاع awk مش متغير bash.

---

## ٥. فانكشن الإرسال

~~~bash
send() {
  curl -fsS -m 10 "https://api.telegram.org/bot$TG_TOKEN/sendMessage" \
    -d chat_id="$TG_CHAT" --data-urlencode text="$1" > /dev/null
}
~~~

[[send() { ... }]] بتعرّف فانكشن اسمها send، و [[$1]] جواها أول حاجة اتبعتت لها (نص الرسالة). و [[\]] في آخر السطر معناها «الأمر مكمّل في السطر اللي بعده».

| الحتة | معناها |
|---|---|
| [[-f]] | لو Telegram رد بخطأ (4xx أو 5xx) اعتبره فشل |
| [[-sS]] | من غير شريط تقدم، بس اطبع الخطأ لو حصل |
| [[-m 10]] | max-time: ١٠ ثواني بالكتير، عشان السكربت ميعلقش |
| [[bot$TG_TOKEN/sendMessage]] | رابط Bot API: كلمة bot ملزوقة في التوكن، وبعدها اسم العملية |
| [[-d chat_id=...]] | ابعت ده في body الطلب (و [[-d]] بيخلي الطلب POST) |
| [[--data-urlencode text=...]] | نفس الكلام، بس شفّر النص للرابط (المسافات و [[%]] و [[:]]) |
| [[> /dev/null]] | ارمي رد Telegram (JSON طويل مش محتاجينه) |

ده الطلب اللي اتسجّل في التجربة:

~~~text الطلب
-fsS -m 10 https://api.telegram.org/bot123456789:AA-test/sendMessage -d chat_id=123456789 --data-urlencode text=ALERT vps1: disk 2% (limit 1%)
~~~

وبـ [[curl]] الحقيقي والتوكن الوهمي ده:

~~~text الناتج
curl: (22) The requested URL returned error: 401
~~~

[[22]] كود curl لـ «الرد كان خطأ» (بسبب [[-f]])، و [[401]] من Telegram = Unauthorized، يعني التوكن غلط. ومن غير [[-f]] الرد كان [[{"ok":false,"error_code":401,"description":"Unauthorized"}]].

---

## ٦. فانكشن الفحص

~~~bash
check() {
  local name=$1 value=$2 limit=$3 state=/var/tmp/alert-$1
  if (( value >= limit )); then
    [[ -f $state ]] || { send "ALERT $HOST: $name $value% (limit $limit%)"; touch "$state"; }
  elif [[ -f $state ]]; then
    send "OK $HOST: $name back to $value%"; rm -f "$state"
  fi
}
~~~

### السطر الأول: [[local ...]]

[[local]] متغيرات تعيش جوه الفانكشن بس. [[$1]] و [[$2]] و [[$3]] أول ٣ حاجات اتبعتت (الاسم والقيمة والحد). و [[state]] اسم «ملف الحالة»: [[/var/tmp/alert-disk]] للديسك و [[/var/tmp/alert-ram]] للرام. ([[/var/tmp]] مش بيتمسح مع الـ reboot زي [[/tmp]].)

### [[(( value >= limit ))]]

الأقواس المزدوجة المدوّرة في bash للحساب والمقارنة بالأرقام. لو القيمة وصلت الحد أو عدّته:

### السطر الأهم

الأقواس المربعة المزدوجة مع [[-f]] = «الملف ده موجود؟». و [[||]] = «لو لأ، نفّذ اللي بعدي». واللي بعده بين [[{ ... ; }]] أمرين: ابعت تنبيه، واعمل ملف الحالة بـ [[touch]]. يعني: **ابعت بس لو مكنتش باعت قبل كده.**

### [[elif]]: القيمة تحت الحد

لو ملف الحالة موجود (يعني كنا باعتين تنبيه)، ابعت إنها رجعت وامسح الملف. ولو مش موجود، متعملش حاجة.

---

## ٧. آخر سطرين

~~~bash
check disk "$DISK" 85
check ram "$RAM" 90
~~~

نادي الفانكشن مرتين: الديسك على ٨٥٪، والرام على ٩٠٪.

---

## ٨. التجربة كاملة (الـ try)

غيّرت حد الديسك لـ 1 (والديسك ٢٪) وشغّلت السكربت ٣ مرات:

| التشغيل | الحد | اللي حصل |
|---|---|---|
| الأول | 1 | اتبعت [[ALERT vps1: disk 2% (limit 1%)]] واتعمل [[/var/tmp/alert-disk]] |
| التاني | 1 | ولا رسالة (ملف الحالة موجود). عدد الطلبات فضل 1 |
| التالت | 85 | اتبعت [[OK vps1: disk back to 2%]] والملف اتمسح |

والتلاتة خرجوا بـ 0. وجربت حالة إن الإرسال يفشل (curl خرج بـ 22): السكربت وقف بـ exit 22 **قبل** [[touch]] بسبب [[set -e]]، وملف الحالة متعملش، فالتشغيل الجاي هيحاول يبعت تاني. ده بالظبط اللي عايزه: تنبيه فشل في الإرسال مش هيضيع.

بعدها [[sed -i]] في الـ solCode بيرجّع الحد 85، والسطر في crontab بيشغّله كل ٥ دقايق.

---

## الخلاصة

| الجزء | الفكرة |
|---|---|
| [[set -euo pipefail]] | أي غلطة توقف السكربت بدل ما يكمّل غلط |
| ملف [[.env]] بصلاحية 600 | التوكن بره السكربت |
| [[df --output=pcent]] و [[tr -dc]] | نسبة الديسك كرقم |
| [[free]] و [[awk]] | الرام من available مش free |
| [[curl -fsS -m 10]] | يفشل صح، وميعلقش |
| ملف الحالة في [[/var/tmp]] | رسالة لما المشكلة تبدأ، ورسالة لما تخلص، ولا حاجة في النص |`,
          lines: [
            "اقف عند أي خطأ، أو متغير مش متعرّف، أو فشل في pipe.",
            "اقرا TG_TOKEN و TG_CHAT من ملف بره السكربت.",
            "اسم السيرفر عشان تعرف الرسالة جاية منين.",
            "نسبة استخدام الـ root كرقم بس.",
            "نسبة الرام المستخدمة فعلًا: (total - available) / total.",
            "فانكشن الإرسال:",
            "اطلب sendMessage من Telegram، بحد ١٠ ثواني.",
            "ابعت الـ chat id والرسالة (متشفّرة للـ URL)، واسكت عن الرد.",
            "آخر الفانكشن.",
            "فانكشن الفحص: الاسم والقيمة والحد.",
            "متغيرات محلية، وملف حالة لكل مقياس.",
            "لو القيمة وصلت الحد أو عدّته:",
            "لو مبعتناش قبل كده: ابعت واعمل ملف الحالة.",
            "ولو نزلت تحت الحد وكنا باعتين تنبيه:",
            "ابعت إنها رجعت، وامسح ملف الحالة.",
            "آخر الـ if.",
            "آخر الفانكشن.",
            "افحص الديسك على ٨٥٪.",
            "وافحص الرام على ٩٠٪."
          ],
          sol: R`بحد 10 للديسك: الرسالة بتوصل على Telegram زي [[ALERT vps1: disk 61% (limit 10%)]]، والملف [[/var/tmp/alert-disk]] اتعمل. التشغيل التاني مبيبعتش حاجة.

لما ترجّع الحد 85 وتشغّله: بتوصلك [[OK vps1: disk back to 61%]] والملف بيتمسح. ده معناه إن التنبيه ورجوعه شغالين.

لو [[curl: (22) The requested URL returned error: 400]]: [[chat_id]] غلط، و Telegram بيرد «chat not found» (لازم تكون بعت للبوت رسالة الأول). لو [[error: 401]]: الـ token غلط. ولو مفيش رسالة ومفيش خطأ: ملف الحالة [[/var/tmp/alert-disk]] موجود من تشغيل قبل كده، امسحه وجرّب تاني. ولو [[TG_TOKEN: unbound variable]]: الملف مش بيتقري أو الاسم فيه غلطة.

وفي crontab بعد كده، [[grep CRON /var/log/syslog]] بيأكد إنه بيشتغل كل ٥ دقايق، و [[/var/log/server-alert.log]] المفروض يفضل فاضي طول ما مفيش أخطاء.`,
          solCode: R`sudo tee /etc/server-alert.env > /dev/null <<'EOF'
TG_TOKEN=123456789:AA...your-bot-token
TG_CHAT=123456789
EOF
sudo chmod 600 /etc/server-alert.env
sudo nano /usr/local/bin/server-alert.sh
sudo chmod +x /usr/local/bin/server-alert.sh
sudo sed -i 's/check disk "$DISK" 85/check disk "$DISK" 10/' /usr/local/bin/server-alert.sh
sudo /usr/local/bin/server-alert.sh
sudo /usr/local/bin/server-alert.sh
sudo sed -i 's/check disk "$DISK" 10/check disk "$DISK" 85/' /usr/local/bin/server-alert.sh
sudo /usr/local/bin/server-alert.sh
sudo crontab -e
# */5 * * * * /usr/local/bin/server-alert.sh >> /var/log/server-alert.log 2>&1`
        },
        {
          cmd: "node_exporter و Grafana",
          title: "رسومات لكل حاجة على السيرفر",
          desc: R`الستاك المعروف: [[node_exporter]] بيطلّع أرقام السيرفر (CPU ورام وديسك وشبكة)، و [[cAdvisor]] أرقام كل container، و [[Prometheus]] بيجمعهم كل ٣٠ ثانية ويخزّنهم، و [[Grafana]] بيرسمهم ويبعت التنبيهات.

كلهم في compose واحد. و Grafana على [[127.0.0.1]] بس، وتفتحه من جهازك بنفق SSH: [[ssh -L 3000:localhost:3000 deploy@vps]] وبعدين [[http://localhost:3000]].`,
          example: R`services:
  prometheus:
    image: prom/prometheus:v3.13.4
    command: [--config.file=/etc/prometheus/prometheus.yml, --storage.tsdb.retention.time=15d]
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - prom-data:/prometheus
    restart: unless-stopped
  node-exporter:
    image: prom/node-exporter:v1.12.1
    command: [--path.rootfs=/host]
    pid: host
    volumes: ["/:/host:ro,rslave"]
    restart: unless-stopped
  cadvisor:
    image: ghcr.io/google/cadvisor:v0.60.6
    privileged: true
    devices: [/dev/kmsg]
    volumes: ["/:/rootfs:ro", "/var/run:/var/run:ro", "/sys:/sys:ro", "/var/lib/docker:/var/lib/docker:ro"]
    restart: unless-stopped
  grafana:
    image: grafana/grafana:13.2
    ports: ["127.0.0.1:3000:3000"]
    volumes: [grafana-data:/var/lib/grafana]
    restart: unless-stopped
volumes:
  prom-data:
  grafana-data:`,
          try: R`شغّل الستاك على سيرفر التجربة ومعاه [[prometheus.yml]] اللي في الحل. افتح Grafana بالنفق، وضيف data source نوعه Prometheus على [[http://prometheus:9090]]، واعمل Import لـ dashboard رقم 1860 (Node Exporter Full).`,
          flag: "script",
          deep: {
            why: R`السكربت بيقولك «الديسك ٨٦٪ دلوقتي». بس مش بيقولك الديسك بيزيد قد إيه في اليوم، ولا الرام بدأت تعلى من أنهي deploy، ولا أنهي container هو اللي واكلها. الرسومات والتاريخ بيجاوبوا على «من إمتى؟» و «مين؟»، ودول أول سؤالين في أي مشكلة.`,
            how: R`Prometheus بيشتغل بالـ pull: كل ٣٠ ثانية بيروح لكل target في [[prometheus.yml]] ويطلب [[/metrics]]، ويخزن الأرقام بتاريخها. [[retention.time=15d]] يمسح الأقدم من ١٥ يوم عشان ميملاش الديسك اللي بيراقبه.

node_exporter جوه container بيشوف ديسك الـ container مش السيرفر، عشان كده بنركّب [[/]] بتاع السيرفر على [[/host]] للقراية بس، و [[--path.rootfs=/host]] بيقوله اقرا من هناك. و [[pid: host]] عشان يشوف عمليات السيرفر. أرقام الشبكة هتبقى بتاعة الـ container، ولو محتاجها بجد: [[network_mode: host]] وتغيّر الـ target.

cAdvisor بيقرا Docker و cgroups، فمحتاج الفولدرات دي و [[privileged]]. وهو اللي بيقولك الرام والـ CPU لكل container بالاسم.

ولا خدمة فيهم فاتحة بورت للنت غير Grafana، وعلى localhost بس. Prometheus بيوصل للاتنين التانيين بالاسم على شبكة compose.

الـ dashboard 1860 جاهز ومعروف لـ node_exporter، وفيه dashboards جاهزة لـ cAdvisor برضه. متبدأش ترسم من الصفر.`,
            when: R`أكتر من سيرفر، أو عايز تاريخ وتقارن قبل وبعد deploy، أو شغال في فريق. ولو ده كتير على VPS صغير: Netdata سكربت تسطيب واحد وبيطلّع رسومات وتنبيهات جاهزة، و Beszel أخف بكتير (hub صغير و agent على كل سيرفر) وفيه تنبيهات ديسك ورام و containers. الستاك ده بياكل حوالي نص جيجا رام، فعلى VPS بجيجا واحد يبقى تقيل.`,
            mistakes: R`تفتح Grafana على [[3000:3000]] من غير 127.0.0.1، و Docker بيعدّي من ufw (شوف تاب Docker)، فلوحة فيها كل تفاصيل السيرفر بقت على النت بباسورد admin/admin الافتراضي. وتسيب Prometheus من غير retention فيملا الديسك. وتعمل node_exporter من غير [[--path.rootfs]]، فتراقب ديسك الـ container وتلاقيه دايمًا فاضي. وتحط الستاك على نفس السيرفر وتعتمد عليه لوحده: لو السيرفر وقع، المراقبة وقعت معاه.`
          },
          teach: R`## الأول: ٤ برامج، كل واحد ليه شغلانة

| البرنامج | شغلانته | بورت جوه الشبكة |
|---|---|---|
| node_exporter | بيقرا أرقام السيرفر (CPU ورام وديسك وشبكة) ويعرضها كصفحة نص [[/metrics]] | 9100 |
| cAdvisor | نفس الكلام لكل container | 8080 |
| Prometheus | كل ٣٠ ثانية يروح للاتنين دول ياخد الأرقام ويخزنها بتاريخها | 9090 |
| Grafana | بيسأل Prometheus ويرسم، وبيبعت التنبيهات | 3000 |

المثال ملف [[compose.yml]] واحد بيشغّلهم الأربعة. اتجرّب كده: [[docker compose config]] قبل الملف من غير أخطاء (ده بيفحص الصيغة من غير ما يشغّل حاجة)، والصور الأربعة بالنسخ دي موجودة فعلًا على Docker Hub و ghcr. وشغّلت Prometheus و node_exporter بس على Docker Desktop (وشلتهم بعدها)، و cAdvisor و Grafana شكلهم تحت من الـ docs بتاعتهم.

---

## ١. [[services:]] و [[prometheus]]

~~~bash
services:
  prometheus:
    image: prom/prometheus:v3.13.4
    command: [--config.file=/etc/prometheus/prometheus.yml, --storage.tsdb.retention.time=15d]
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - prom-data:/prometheus
    restart: unless-stopped
~~~

| السطر | معناه |
|---|---|
| [[services:]] | كل خدمة (container) تحتها باسمها. المسافات في أول السطر هي اللي بتقول مين تبع مين |
| [[image: prom/prometheus:v3.13.4]] | الصورة بنسخة محددة، عشان متتغيرش لوحدها مع أي pull |
| [[command: [...]]] | الـ arguments اللي البرنامج بيبدأ بيها، كقايمة |
| [[--config.file=...]] | ملف الإعداد فين جوه الـ container |
| [[--storage.tsdb.retention.time=15d]] | احتفظ بآخر ١٥ يوم بس ([[tsdb]] = time series database) |
| [[./prometheus.yml:/etc/...:ro]] | ركّب الملف اللي جنب compose.yml جوه الـ container، و [[ro]] قراية بس |
| [[prom-data:/prometheus]] | volume للبيانات، عشان متضيعش لو الـ container اتشال |
| [[restart: unless-stopped]] | يقوم لوحده مع Docker إلا لو انت وقفته |

### ملف [[prometheus.yml]] (الـ solCode)

~~~bash
global:
  scrape_interval: 30s
scrape_configs:
  - job_name: node
    static_configs:
      - targets: ["node-exporter:9100"]
  - job_name: cadvisor
    static_configs:
      - targets: ["cadvisor:8080"]
~~~

[[scrape]] = يروح ياخد الأرقام، و [[scrape_interval: 30s]] كل ٣٠ ثانية. و [[targets]] عناوين بيروحلها: [[node-exporter:9100]] اسم الخدمة في compose والبورت. ده شغال لأن compose بيعمل شبكة واحدة للخدمات، وكل خدمة بتتنادى باسمها.

لما شغّلت Prometheus و node_exporter بس (من غير cAdvisor)، صفحة الـ targets قالت:

~~~text /api/v1/targets (مختصر)
"job":"node"      "health":"up"    "lastError":""
"job":"cadvisor"  "health":"down"  "lastError":"Get \"http://cadvisor:8080/metrics\": dial tcp: lookup cadvisor on 127.0.0.11:53: no such host"
~~~

[[no such host]] لأن مفيش خدمة اسمها cadvisor شغالة. وده نفس اللي هتشوفه لو كتبت اسم الخدمة غلط في prometheus.yml.

---

## ٢. [[node-exporter]]

~~~bash
  node-exporter:
    image: prom/node-exporter:v1.12.1
    command: [--path.rootfs=/host]
    pid: host
    volumes: ["/:/host:ro,rslave"]
    restart: unless-stopped
~~~

المشكلة: أي برنامج جوه container شايف ديسك الـ container مش السيرفر. الحل:

| السطر | معناه |
|---|---|
| [[/:/host:ro,rslave]] | ركّب [[/]] بتاع السيرفر كله جوه الـ container على [[/host]]، قراية بس |
| [[rslave]] | لو اتركّب ديسك جديد على السيرفر بعد كده، يظهر جوه كمان |
| [[--path.rootfs=/host]] | قول لـ node_exporter إن «جذر السيرفر» هناك |
| [[pid: host]] | شوف عمليات السيرفر مش عمليات الـ container بس |

وعلى Docker Desktop (ويندوز) [[rslave]] بالذات رفض:

~~~text الناتج
Error response from daemon: path / is mounted on / but it is not a shared or slave mount
~~~

فشلتها في ملف تجربة وشغّلته بـ [[/:/host:ro]]. على VPS لينكس عادي السطر شغال زي ما هو.

---

## ٣. [[cadvisor]]

~~~bash
  cadvisor:
    image: ghcr.io/google/cadvisor:v0.60.6
    privileged: true
    devices: [/dev/kmsg]
    volumes: ["/:/rootfs:ro", "/var/run:/var/run:ro", "/sys:/sys:ro", "/var/lib/docker:/var/lib/docker:ro"]
    restart: unless-stopped
~~~

| السطر | معناه |
|---|---|
| [[ghcr.io/...]] | الصورة من GitHub Container Registry مش Docker Hub |
| [[privileged: true]] | صلاحيات واسعة على السيرفر، عشان يقرا cgroups (اللي Docker بيقيس بيها كل container) |
| [[devices: [/dev/kmsg]]] | رسايل الكيرنل (منها مثلًا لما الـ OOM killer يقتل حاجة) |
| [[/var/run]] | فيه socket بتاع Docker، منه بيعرف أسامي الـ containers |
| [[/sys]] و [[/var/lib/docker]] | أرقام الـ cgroups وبيانات الـ containers |

كله [[ro]]: بيقرا بس.

---

## ٤. [[grafana]] و [[volumes:]]

~~~bash
  grafana:
    image: grafana/grafana:13.2
    ports: ["127.0.0.1:3000:3000"]
    volumes: [grafana-data:/var/lib/grafana]
    restart: unless-stopped
volumes:
  prom-data:
  grafana-data:
~~~

[[ports: ["127.0.0.1:3000:3000"]]] = [[IP:بورت-السيرفر:بورت-الـcontainer]]. الـ [[127.0.0.1]] في الأول هي الأهم في الملف كله: البورت مفتوح على السيرفر نفسه بس، مش على النت. [[docker compose config]] أكّدها كـ [[host_ip: 127.0.0.1]]. ولاحظ إن مفيش خدمة تانية ليها [[ports]] خالص: Prometheus بيوصل للباقيين جوه شبكة compose.

و [[volumes:]] في آخر الملف (من غير مسافة قبلها) بتعرّف الـ volumes اللي استخدمناها فوق، عشان Docker يعملها.

### تفتحه إزاي من جهازك؟

~~~bash
ssh -L 3000:localhost:3000 deploy@vps
~~~

[[-L]] نفق: [[3000]] على جهازك ← [[localhost:3000]] من ناحية السيرفر. فـ [[http://localhost:3000]] في متصفحك بيفتح Grafana كأنك على السيرفر، والبورت عمره ما اتفتح للنت.

---

## ٥. اشتغلوا؟

[[docker compose ps]] في التجربة:

~~~text الناتج
SERVICE         STATUS
node-exporter   Up 40 seconds
prometheus      Up 48 seconds
~~~

وسؤال لـ Prometheus عن [[up]] (1 = وصلّه، 0 = لأ):

~~~text الناتج (مختصر)
{"instance":"cadvisor:8080","job":"cadvisor"}  "0"
{"instance":"node-exporter:9100","job":"node"}  "1"
~~~

وبعد ما تضيف Grafana: الـ data source رابطه [[http://prometheus:9090]] (اسم الخدمة تاني، لأن Grafana جوه نفس الشبكة)، و Import لـ dashboard رقم 1860 بيطلّعلك كل الرسومات جاهزة (دي خطوات الـ docs، Grafana مشغّلتوش هنا).

---

## الخلاصة

| حاجة | ليه |
|---|---|
| نسخ محددة للصور | ميتغيرش حاجة لوحده |
| [[retention.time=15d]] | المراقبة متملاش الديسك اللي بتراقبه |
| [[--path.rootfs=/host]] و [[/:/host:ro]] | node_exporter يشوف السيرفر مش الـ container |
| [[127.0.0.1:3000:3000]] | Grafana مش على النت، وتفتحه بنفق SSH |
| أسامي الخدمات في prometheus.yml | لازم زي compose بالظبط، وإلا [[no such host]] |`,
          lines: [
            "الخدمات.",
            "Prometheus: بيجمع الأرقام ويخزنها.",
            "نسخة محددة.",
            "ملف الإعداد، واحفظ آخر ١٥ يوم بس.",
            "الفولدرات:",
            "ملف الإعداد من السيرفر، قراية بس.",
            "البيانات نفسها على volume.",
            "يقوم لوحده مع السيرفر.",
            "node_exporter: أرقام السيرفر نفسه.",
            "نسخة محددة.",
            "اقرا الديسك والـ proc من السيرفر المركّب على /host.",
            "شوف عمليات السيرفر مش الـ container بس.",
            "ركّب / بتاع السيرفر قراية بس.",
            "يقوم لوحده.",
            "cAdvisor: أرقام كل container.",
            "الصورة من ghcr.",
            "محتاج صلاحيات عشان يقرا cgroups.",
            "ولوج الكيرنل.",
            "الفولدرات اللي بيقرا منها Docker والـ containers.",
            "يقوم لوحده.",
            "Grafana: الرسومات والتنبيهات.",
            "نسخة 13.2.",
            "البورت على localhost بس، وتفتحه بنفق SSH.",
            "الإعدادات والـ dashboards على volume.",
            "يقوم لوحده.",
            "الـ volumes:",
            "بيانات Prometheus.",
            "بيانات Grafana."
          ],
          sol: R`[[docker compose ps]] بيوري الأربع خدمات Up. وفي Prometheus، [[docker compose exec prometheus wget -qO- localhost:9090/api/v1/targets]] (أو صفحة Status ثم Targets) بيوري الـ targets الاتنين [[up]].

في Grafana: أول دخول admin و admin، وبيطلب باسورد جديدة. بعد ما تضيف الـ data source، زرار «Save & test» بيقول إنه اتصل. وبعد Import لـ 1860 واختيار الـ data source: رسومات CPU و RAM و Disk بأرقام قريبة من [[free -h]] و [[df -h]] على السيرفر.

لو target واقف: [[context deadline exceeded]] أو [[no such host]] يعني اسم الخدمة في prometheus.yml مش زي compose. ولو الديسك في Grafana صغير ومش زي df: node_exporter من غير [[--path.rootfs]].`,
          solCode: R`# prometheus.yml جنب compose.yml
global:
  scrape_interval: 30s
scrape_configs:
  - job_name: node
    static_configs:
      - targets: ["node-exporter:9100"]
  - job_name: cadvisor
    static_configs:
      - targets: ["cadvisor:8080"]`
        },
        {
          cmd: "Grafana alert rules",
          title: "قاعدة تنبيه: query وحد ومدة",
          desc: R`قاعدة التنبيه في Grafana: query بـ PromQL، وحد (Threshold)، ومدة (Pending period) لازم الحالة تفضل فيها قبل ما يبعت. وبتروح لـ contact point نوعه Telegram (نفس الـ bot token والـ chat id).

المدة هي اللي بتفرق التنبيه المفيد من الإزعاج: CPU ١٠٠٪ لمدة ٣٠ ثانية طبيعي، ولمدة ١٠ دقايق مشكلة.`,
          example: R`# الديسك: Threshold IS ABOVE 85، و Pending period 10m
100 * (1 - node_filesystem_avail_bytes{mountpoint="/"} / node_filesystem_size_bytes{mountpoint="/"})
# الديسك هيخلص خلال ٢٤ ساعة بالمعدل ده: IS BELOW 0، و 30m
predict_linear(node_filesystem_avail_bytes{mountpoint="/"}[6h], 24 * 3600)
# الرام: IS ABOVE 90، و 10m
100 * (1 - node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)
# container اتعمله restart في آخر ١٥ دقيقة: IS ABOVE 0
changes(container_start_time_seconds{name!=""}[15m])
# Prometheus مش قادر يوصل لـ target: IS BELOW 1، و 5m
up`,
          try: R`في Grafana اعمل contact point نوعه Telegram واضغط Test. وبعدين اعمل قاعدة الديسك بحد أقل من النسبة الحالية ومدة 1m، واستنى الرسالة، ورجّع الحد 85 واستنى رسالة resolved.`,
          deep: {
            why: "Grafana فيه كل الأرقام، بس محدش بيقعد يبص على dashboard طول اليوم. القاعدة هي اللي بتحوّل الرقم لرسالة، والصعب مش إنك تعملها، الصعب إنك تختار الحد والمدة صح فالرسالة تيجي لما يبقى فيه حاجة تتعمل بس.",
            how: R`من Alerting ثم Alert rules ثم New alert rule: بتكتب الـ query وتختار Prometheus، وبعدها Reduce (آخر قيمة) و Threshold (أكبر من 85 مثلًا). وبعدين folder و evaluation group بـ interval (كل قد إيه يتحسب، دقيقة كفاية)، و Pending period. وفي الآخر contact point أو notification policy.

الديسك: [[avail / size]] نسبة الفاضي، و [[1 -]] يقلبها للمستخدم. و [[mountpoint="/"]] عشان متحسبش tmpfs والـ overlay بتاعة Docker.

[[predict_linear]] أذكى من أي نسبة: بياخد آخر ٦ ساعات، ويرسم خط، ويقولك الفاضي هيبقى كام بعد ٢٤ ساعة. لو أقل من صفر يبقى الديسك هيتملى بكرة، حتى لو هو ٦٠٪ دلوقتي (لوج بيكبر بسرعة مثلًا). وسيرفر ثابت على ٨٨٪ من شهور مش هيصحّيك.

الرام: available زي السكربت، مش free.

[[changes(container_start_time_seconds)]] من cAdvisor: وقت بداية الـ container اتغير يعني اتعمله restart، والـ restart policy بتخبّي إن التطبيق بيقع كل شوية.

[[up]] رقم Prometheus بيحطه لكل target: 1 لو رد و 0 لو لأ. [[up == 0]] يعني المراقبة نفسها عمياء.

وفي notification policy: [[Group wait]] و [[Repeat interval]] (مثلًا ٤ ساعات) بيحددوا بيكرر التنبيه كل قد إيه لو لسه مصلحتوش، بدل كل دقيقة.`,
            when: "بعد ما الستاك يشتغل على طول. ابدأ بالخمسة دول بس، وزوّد لما تحصل مشكلة معرفتهاش من التنبيهات.",
            mistakes: R`Pending period صفر، فكل spike ثانيتين يبقى رسالة. و Repeat interval قصير، فنفس التنبيه كل ٥ دقايق طول الليل. وحد ٧٠٪ للديسك على سيرفر عادي بيبقى ٧٥٪، فيفضل firing طول الوقت ومحدش بيبص عليه. ونسيان [[mountpoint]]، فالقاعدة تعمل alert لكل tmpfs. وتنسى تختبر الـ contact point بـ Test، فأول مرة تعرف إنه مش شغال هي وقت المشكلة الحقيقية.`
          },
          teach: R`## الأول: القاعدة = سؤال + حد + مدة

كل قاعدة تنبيه في Grafana ٣ حاجات: **query** بلغة PromQL (لغة الأسئلة بتاعة Prometheus) بترجع رقم، و**Threshold** (الحد) زي «أكبر من 85»، و**Pending period** (المدة) اللي لازم الرقم يفضل فيها فوق الحد قبل ما يبعت. المثال ٥ queries، وفوق كل واحدة تعليق فيه الحد والمدة المقترحين.

الـ queries اتجرّبت على Prometheus 3.13 حقيقي بيقرا من node_exporter (على Docker Desktop)، وقاعدة cAdvisor مجربتهاش لأن cAdvisor مكانش شغال. وخطوات Grafana نفسها من الـ docs.

---

## ١. الديسك: [[IS ABOVE 85]] لمدة 10m

~~~bash
100 * (1 - node_filesystem_avail_bytes{mountpoint="/"} / node_filesystem_size_bytes{mountpoint="/"})
~~~

نفكّها من جوه:

| الخطوة | الحتة | معناها |
|---|---|---|
| ١ | [[node_filesystem_avail_bytes]] | اسم metric من node_exporter: المساحة الفاضية بالـ byte |
| ٢ | [[{mountpoint="/"}]] | فلتر (label): الديسك المتركّب على [[/]] بس |
| ٣ | [[node_filesystem_size_bytes{...}]] | حجم نفس الديسك |
| ٤ | [[avail / size]] | نسبة الفاضي، رقم من 0 لـ 1 |
| ٥ | [[1 - ...]] | اقلبها: نسبة المستخدم |
| ٦ | [[100 * ...]] | خليها نسبة مئوية |

### ليه الفلتر؟

node_exporter بيطلّع سطر لكل حاجة متركّبة. في التجربة عدّيتهم حسب النوع:

~~~text count(node_filesystem_size_bytes) by (fstype)
ext4   16
9p     11
tmpfs  25
~~~

من غير [[mountpoint="/"]] القاعدة هتشتغل على ٥٠ ديسك منهم tmpfs (ديسكات في الرام) والـ overlay بتاع Docker، وكل واحد ممكن يعمل تنبيه.

وحاجة حصلت فعلًا: على Docker Desktop مفيش ديسك متركّب على [[/]] بالمعنى ده، فالـ query رجّعت **ولا نتيجة**، والقاعدة كانت هتفضل ساكتة للأبد. لما بصيت على [[node_filesystem_size_bytes]] لوحدها لقيت الديسك الحقيقي على [[/var/lib]]، وبيه رجّعت:

~~~text الناتج
{device="/dev/sdd", fstype="ext4", mountpoint="/var/lib"}  6.830298562839776
~~~

يعني ٦.٨٪ مستخدم. على VPS عادي [[mountpoint="/"]] موجود، بس اتأكد في Explore قبل ما تحفظ القاعدة.

---

## ٢. الديسك هيخلص بكرة: [[IS BELOW 0]] لمدة 30m

~~~bash
predict_linear(node_filesystem_avail_bytes{mountpoint="/"}[6h], 24 * 3600)
~~~

| الحتة | معناها |
|---|---|
| [[[6h]]] | مش آخر قيمة بس: كل القيم في آخر ٦ ساعات (اسمها range vector) |
| [[predict_linear(..., ثواني)]] | ارسم خط مستقيم من القيم دي، وقولي هيوصل لكام بعد عدد الثواني ده |
| [[24 * 3600]] | ٢٤ ساعة بالثواني = 86400 |

النتيجة بالـ byte: الفاضي المتوقع بكرة. لو أقل من صفر، يبقى الديسك هيتملى قبل بكرة بالمعدل ده. في التجربة (على [[/var/lib]]):

~~~text الناتج
الفاضي دلوقتي          1007258738688   (حوالي 938 جيجا)
المتوقع بعد ٢٤ ساعة     981773622412    (حوالي 914 جيجا)
~~~

يعني الديسك بيتملى بس ببطء، وبعيد جدًا عن الصفر. (ودي توقعات من دقايق بس من البيانات، فبتتأثر بأي ملف كبير اتكتب. مع ٦ ساعات بيانات حقيقية الخط بيبقى أهدى.)

---

## ٣. الرام: [[IS ABOVE 90]] لمدة 10m

~~~bash
100 * (1 - node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)
~~~

نفس فكرة الديسك: available على total، مقلوبة، في 100. وهنا مفيش فلتر لأن السيرفر ليه رام واحدة. في التجربة:

~~~text الناتج
{instance="node-exporter:9100", job="node"}  9.753141286215373
~~~

٩.٧٥٪، قريب من حساب [[free]] في سكربت Telegram ([[8]]) على نفس الماكينة في وقت تاني. والاتنين بيستخدموا available مش free.

---

## ٤. container بيعمل restart: [[IS ABOVE 0]]

~~~bash
changes(container_start_time_seconds{name!=""}[15m])
~~~

| الحتة | معناها |
|---|---|
| [[container_start_time_seconds]] | من cAdvisor: الـ container ده بدأ إمتى (بالثواني من 1970) |
| [[{name!=""}]] | [[!=]] = «مش بيساوي». الـ containers اللي ليها اسم بس، من غير الـ cgroups بتاعة السيستم |
| [[[15m]]] | آخر ١٥ دقيقة |
| [[changes(...)]] | الرقم اتغير كام مرة في الفترة دي |

وقت البداية بيتغير = اتعمله restart. فأي رقم أكبر من 0 يعني فيه container وقع وقام. (cAdvisor مكانش شغال في التجربة، فدي من الـ docs.)

---

## ٥. المراقبة نفسها: [[IS BELOW 1]] لمدة 5m

~~~bash
up
~~~

[[up]] Prometheus بيعمله لوحده لكل target: 1 لو رد، 0 لو لأ. في التجربة (cAdvisor مش شغال):

~~~text الناتج
{instance="cadvisor:8080", job="cadvisor"}  0
{instance="node-exporter:9100", job="node"}  1
~~~

القاعدة دي كانت هتبعت عن cadvisor. ومن غيرها، لو node_exporter وقع، كل القواعد التانية هترجّع «مفيش بيانات» وتسكت، وانت فاكر كله تمام.

---

## ٦. في Grafana نفسه (من الـ docs)

| الخطوة | فين | تحط إيه |
|---|---|---|
| ١ | Alerting ← Contact points | نوع Telegram: الـ bot token والـ chat id، وبعدين Test |
| ٢ | Alerting ← Alert rules ← New alert rule | الـ query، والـ data source = Prometheus |
| ٣ | Expressions | Reduce = Last (آخر قيمة)، و Threshold = IS ABOVE 85 |
| ٤ | Folder و Evaluation group | كل قد إيه تتحسب (دقيقة كفاية) |
| ٥ | Pending period | المدة اللي في التعليق (10m مثلًا) |
| ٦ | Notifications | الـ contact point |

وحالة القاعدة بتمشي كده: **Normal** ← الرقم عدّى الحد ← **Pending** (بيعدّ المدة) ← لو فضل فوقه المدة كلها ← **Firing** وبتتبعت رسالة ← لما ينزل ← **Normal** ورسالة [[RESOLVED]].

---

## الخلاصة

| القاعدة | الـ query | الحد | المدة |
|---|---|---|---|
| ديسك مليان | [[100 * (1 - avail / size)]] | فوق 85 | 10m |
| ديسك هيتملى | [[predict_linear(avail[6h], 86400)]] | تحت 0 | 30m |
| رام | [[100 * (1 - MemAvailable / MemTotal)]] | فوق 90 | 10m |
| restarts | [[changes(container_start_time_seconds[15m])]] | فوق 0 | |
| المراقبة واقعة | [[up]] | تحت 1 | 5m |

وجرّب أي query في Explore الأول: لو رجّعت فاضي، القاعدة هتسكت للأبد.`,
          lines: [
            "نسبة الديسك المستخدمة على / (١ ناقص نسبة الفاضي).",
            "الفاضي هيبقى كام بعد ٢٤ ساعة، حسب آخر ٦ ساعات.",
            "نسبة الرام المستخدمة فعلًا (available مش free).",
            "عدد مرات الـ restart لكل container ليه اسم في آخر ١٥ دقيقة.",
            "كل target: 1 لو Prometheus وصله، 0 لو لأ."
          ],
          sol: R`Test في الـ contact point بيبعت رسالة تجربة على Telegram على طول. لو موصلتش: الـ chat id أو الـ token غلط، و Grafana بيطلّع الخطأ تحت الزرار.

بعد ما تعمل القاعدة بحد واطي: حالتها في صفحة Alert rules بتبقى Normal، وبعدين Pending لمدة الـ pending period، وبعدين Firing، والرسالة بتوصل وفيها اسم القاعدة والقيمة.

ولما ترجّع الحد 85: بعد التقييم الجاي بترجع Normal، وبتوصلك رسالة فيها [[RESOLVED]].

لو فضلت Normal ومش بتتحرك: جرّب الـ query في Explore الأول، لو مفيش نتيجة يبقى الـ mountpoint عندك مختلف (شوف [[node_filesystem_size_bytes]] لوحده في Explore).`
        },
        {
          cmd: "أعراض مش أسباب",
          title: "نبّه على اللي اليوزر حاسس بيه",
          desc: R`العَرَض: «الموقع مش بيفتح» أو «بطيء» أو «الباك أب مشتغلش امبارح». السبب: «CPU عالي» أو «container عمل restart». التنبيه اللي يصحّيك لازم يبقى على عَرَض، والأسباب تبص عليها في الرسومات لما تحقق.

وأهم عَرَضين لـ VPS واحد محتاجين حد من بره السيرفر: فحص للموقع كل دقيقة، وإشارة «أنا خلصت» من كل مهمة مجدولة (dead man's switch)، لو موصلتش في ميعادها يجيلك تنبيه.`,
          example: R`# فحص من بره: Uptime Kuma على سيرفر تاني، أو خدمة زي UptimeRobot أو Better Stack
curl -fsS -m 10 -o /dev/null -w "%{http_code} %{time_total}s\n" https://example.com/health
# الباك أب يبعت ping بس لو نجح، والخدمة تنبّهك لو معداش في ميعاده:
0 3 * * * /home/deploy/backup.sh && curl -fsS -m 10 --retry 3 https://hc-ping.com/YOUR-UUID > /dev/null
# أو بدل السطر اللي فوق (مش معاه، وإلا الباك أب يشتغل مرتين): ابعت exit code السكربت، 0 نجاح وأي رقم تاني fail:
0 3 * * * /home/deploy/backup.sh; curl -fsS -m 10 --retry 3 https://hc-ping.com/YOUR-UUID/$? > /dev/null`,
          try: R`راجع كل تنبيه عندك واسأل: «لو الرسالة دي جت الساعة ٣ الفجر، هقوم أعمل حاجة؟» اللي إجابته لأ شيله أو حوّله لـ dashboard. وبعدين ضيف فحص من بره لـ [[/health]]، و ping بعد الباك أب على healthchecks.io (فيه خطة مجانية).`,
          deep: {
            why: R`الغلطة المعروفة: تعمل تنبيه لكل رقم، CPU و load و swap و كل container. أول أسبوع بتوصلك ٥٠ رسالة، ٤٨ منهم مالهمش لازمة، فتعمل mute. والأسبوع اللي بعده الموقع يقع فعلًا، والرسالة الصح موجودة وسط الـ ٥٠ ومحدش شافها. ده اسمه alert fatigue، وهو أخطر من إن مفيش تنبيهات، لأنك فاكر نفسك متغطي.`,
            how: R`قاعدة Google SRE المشهورة: نبّه على الأعراض اللي اليوزر حاسس بيها، مش على الأسباب. CPU ٩٥٪ والموقع بيرد في ٢٠٠ms؟ مفيش مشكلة، السيرفر بيشتغل. CPU ٣٠٪ والموقع بيرجّع 502؟ دي مشكلة، ومفيش قاعدة CPU كانت هتمسكها.

الاستثناء: أسباب هتبقى عَرَض قريب ومؤكد، زي الديسك هيتملى خلال ٢٤ ساعة. دي تستاهل تنبيه لأن فيه حاجة واضحة تتعمل قبل ما اليوزر يحس.

الفحص من بره: لو السيرفر نفسه وقع، أي حاجة شغالة عليه (سكربت أو Grafana) وقعت معاه ومش هتبعت. فحص من مكان تاني بيمسك الحالة دي، وبيقيس اللي اليوزر شايفه فعلًا: DNS وشهادة و Nginx والتطبيق مع بعض. [[/health]] الكويس بيلمس قاعدة البيانات، مش بيرجّع 200 وخلاص.

الـ dead man's switch: خدمة زي healthchecks.io بتديك رابط، ومهمتك بتطلبه لما تخلص بنجاح. انت بتقولها «المفروض يوصلك ping كل ٢٤ ساعة»، ولو موصلش (السكربت فشل، أو cron واقف، أو السيرفر مقفول) هي اللي تبعتلك. ده بيمسك كل أسباب «الباك أب مشتغلش» مرة واحدة، حتى اللي عمرك ما فكرت فيها. و [[&&]] معناها الـ ping مش هيتبعت لو السكربت رجع خطأ.

وكل تنبيه لازم يبقى: حاجة بتأثر على اليوزر أو هتأثر قريب، وليها خطوة واضحة تعملها، ومش بتتكرر من غير سبب. واللي مش كده مكانه dashboard.`,
            when: "أول ما تحط أي تنبيهات، وكل ما تلاقي نفسك بتتجاهل رسالة. وفي الانترفيو سؤال «إزاي بتراقب السيستم؟» الإجابة القوية بتبدأ من الأعراض (الـ uptime و الأخطاء و الوقت) مش من CPU.",
            mistakes: R`كل المراقبة على نفس السيرفر اللي بتراقبه. وتنبيه على CPU و load اللي بيطلعوا ويرجعوا لوحدهم. وفحص [[/health]] بيرجّع 200 حتى والقاعدة واقعة. و ping الباك أب في الأول بدل الآخر، أو بـ [[;]] بدل [[&&]] على الرابط العادي (من غير [[/$?]])، فبيتبعت نجاح حتى لو الباك أب فشل. وكل التنبيهات بنفس الأهمية: خلي الموقع واقع على قناة بصوت، والديسك ٨٥٪ على قناة تشوفها الصبح.`
          },
          teach: R`## الأول: الدرس فكرة، والمثال بيطبّقها

الفكرة: التنبيه اللي يصحّيك يبقى على حاجة اليوزر حاسس بيها (الموقع واقع، الباك أب مشتغلش)، مش على رقم جوه السيرفر (CPU عالي). والمثال ٣ سطور بتطبّق ده من بره السيرفر: فحص للموقع، و ping بعد الباك أب بطريقتين. السطور اتجرّبت من أوبونتو 24.04 جوه Docker على [[example.com]] و [[hc-ping.com]] الحقيقيين، بسكربت باك أب وهمي.

---

## ١. عَرَض ولا سبب؟

| عَرَض (يصحّيك) | سبب (تبص عليه وانت بتحقق) |
|---|---|
| الموقع مش بيرد أو بيرجّع 5xx | CPU عالي |
| الموقع بطيء (الرد أكتر من ثانيتين) | load عالي |
| الباك أب مبعتش «خلصت» في ميعاده | container عمل restart |
| الديسك هيتملى خلال ٢٤ ساعة | swap مستخدم |

ليه؟ CPU ٩٥٪ والموقع بيرد في ٢٠٠ms = السيرفر شغال وخلاص، والرسالة دي هتصحّيك على الفاضي. و CPU ٣٠٪ والموقع بيرجّع 502 = مشكلة حقيقية، ومفيش قاعدة CPU كانت هتمسكها. والاستثناء الوحيد في الجدول («الديسك هيتملى») سبب، بس عَرَضه أكيد وقريب.

---

## ٢. السطر الأول: فحص من بره

~~~bash
curl -fsS -m 10 -o /dev/null -w "%{http_code} %{time_total}s\n" https://example.com/health
~~~

| الحتة | معناها |
|---|---|
| [[-f]] | رد 4xx أو 5xx = فشل (exit غير صفر) |
| [[-sS]] | من غير شريط تقدم، بس اطبع الخطأ |
| [[-m 10]] | لو مردش في ١٠ ثواني اعتبره واقع |
| [[-o /dev/null]] | ارمي الصفحة |
| [[-w "..."]] | اطبع الـ status والوقت |
| [[/health]] | صفحة في تطبيقك بتتأكد إن كل حاجة شغالة (والكويسة بتلمس قاعدة البيانات) |

[[example.com]] مفيهوش [[/health]]، فده شكل الفشل:

~~~text الناتج
curl: (22) The requested URL returned error: 404
404 0.807408s
exit=22
~~~

سطر الخطأ من [[-S]]، وبعده سطر [[-w]] (بيتطبع حتى مع الفشل)، و exit 22. وعلى الصفحة الرئيسية اللي موجودة:

~~~text الناتج
200 0.410728s
exit=0
~~~

الأداة اللي بتعمل الفحص ده (Uptime Kuma على سيرفر تاني، أو UptimeRobot أو Better Stack) بتعمل نفس الطلب كل دقيقة، وتعتمد على نفس الحاجتين: الـ status والوقت. والمهم إنها **بره** السيرفر: لو السيرفر وقع خالص، أي سكربت عليه وقع معاه ومش هيبعت حاجة.

---

## ٣. السطر التاني: «أنا خلصت» بعد الباك أب

~~~bash
0 3 * * * /home/deploy/backup.sh && curl -fsS -m 10 --retry 3 https://hc-ping.com/YOUR-UUID > /dev/null
~~~

ده سطر crontab: [[0 3 * * *]] كل يوم ٣ الفجر (درس صيغة cron). والأمر:

| الحتة | معناها |
|---|---|
| [[backup.sh]] | الباك أب نفسه |
| [[&&]] | كمّل **بس** لو الباك أب خرج بـ 0 (نجح) |
| [[curl ... hc-ping.com/YOUR-UUID]] | ابعت ping لـ healthchecks.io (الرابط بتاخده من حسابك هناك) |
| [[--retry 3]] | لو الشبكة وقعت لحظة، حاول ٣ مرات كمان |

الفكرة اسمها **dead man's switch**: انت بتقول للخدمة «المفروض يوصلك ping كل ٢٤ ساعة». ولو موصلش، هي اللي بتبعتلك. ده بيمسك كل الأسباب مرة واحدة: السكربت فشل، أو cron واقف، أو السيرفر مقفول، حتى اللي عمرك ما فكرت فيها.

جربت [[&&]] بسكربت بيخرج بـ 3 (فشل):

~~~text الناتج
after &&
~~~

يعني اللي بعد [[&&]] متنفذش خالص، فمفيش ping، والخدمة هتنبّهك بعد الميعاد. و [[YOUR-UUID]] لازم يتغير بالرابط بتاعك: الرابط كما هو بيرد [[invalid url format]].

---

## ٤. السطر التالت: ابعت النتيجة نفسها

~~~bash
0 3 * * * /home/deploy/backup.sh; curl -fsS -m 10 --retry 3 https://hc-ping.com/YOUR-UUID/$? > /dev/null
~~~

الفرق في حتتين:

| الحتة | معناها |
|---|---|
| [[;]] | نفّذ اللي بعدي في كل الأحوال (مش زي [[&&]]) |
| [[/$?]] | [[$?]] = exit code آخر أمر خلص، يعني الباك أب. بيتحط في آخر الرابط |

نفس السكربت اللي بيخرج بـ 3:

~~~text الناتج
would ping .../3
~~~

يعني الرابط بيبقى [[.../YOUR-UUID/3]]. healthchecks.io بيفهم إن 0 = نجاح وأي رقم تاني = فشل، فالتنبيه بييجي **على طول** الساعة ٣ بدل ما يستنى لحد ما الميعاد يعدّي. والسطرين بدائل: واحد منهم بس في الجدول، وإلا الباك أب هيشتغل مرتين.

> [[;]] من غير [[/$?]] غلط خطير: الـ ping هيتبعت عادي حتى لو الباك أب فشل، والخدمة هتفتكر كله تمام.

---

## الخلاصة

| التنبيه | بيقيس | منين |
|---|---|---|
| الموقع | status ووقت [[/health]] كل دقيقة | سيرفر أو خدمة بره |
| الباك أب | ping بعد ما يخلص بنجاح ([[&&]]) أو بالنتيجة ([[/$?]]) | healthchecks.io |
| الديسك | هيتملى خلال ٢٤ ساعة | Grafana ([[predict_linear]]) |

وكل تنبيه اسأل عليه: «لو جه الساعة ٣ الفجر، هقوم أعمل حاجة؟» لو لأ، مكانه dashboard.`,
          lines: [
            "قيس الموقع زي اليوزر: الـ status والوقت، وافشل لو مردش في ١٠ ثواني.",
            "كل يوم ٣ الفجر: الباك أب، ولو نجح بس ابعت ping (بـ [[&&]]).",
            "أو بداله: ابعت exit code السكربت، فلو فشل يبقى fail صريح والتنبيه ييجي على طول من غير ما يستنى الميعاد."
          ],
          sol: R`مثال لقايمة بعد المراجعة على VPS فيه موقع واحد:

يصحّيك: الموقع مش بيرد أو بيرجّع 5xx لمدة دقيقتين (فحص من بره). الباك أب مبعتش ping في ميعاده. الديسك هيتملى خلال ٢٤ ساعة.

تشوفه الصبح: الديسك فوق ٨٥٪. الرام فوق ٩٠٪ لمدة ١٠ دقايق. container بيعمل restart. الشهادة فاضلها أقل من ١٤ يوم.

مكانه dashboard بس: CPU، و load، و swap، والشبكة.

على healthchecks.io: الـ check بيبقى «new» لحد أول ping، وبعد ما السكربت يخلص بـ exit 0 بيبقى «up» وجنبه وقت آخر ping. ولو شغّلت [[false && curl ...]] مفيش ping بيتبعت، وبعد الـ period والـ grace بيبقى «down» ويبعتلك. ولو قلت «كل حاجة تصحّيني»، ارجع للسؤال: هقوم أعمل إيه الساعة ٣ الفجر عشان CPU ٩٠٪؟`
        }
      ]
    }
]);
