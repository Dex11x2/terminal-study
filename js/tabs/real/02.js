// تكملة تاب real: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/real/01.js (شرح حقول الدرس في أوله)
MORE("real", [
    {
      t: "سكربتات النشر",
      l: 2,
      n: "سكربت بأوامر فرعية، وتحديث بيرجع لوحده لو باظ، ونشر بـ docker run و rsync و Actions واستضافة مشتركة",
      items: [
        {
          cmd: "deploy.sh",
          title: "سكربت واحد لكل أوامر السيرفر",
          desc: R`بدل ما تحفظ أوامر compose و git، سكربت واحد بأوامر فرعية: [[./deploy.sh deploy]] و [[update]] و [[ssl]] و [[logs]] و [[status]] و [[restart]] و [[stop]]. كل أمر فرعي دالة صغيرة، والاختيار بـ [[case]].

الـ deploy هنا بيبني الأول والموقع القديم لسه شغال، وبعدين يبدّل ويستنى الـ healthcheck.`,
          example: R`#!/usr/bin/env bash
# ./deploy.sh deploy | update | ssl | logs [service] | status | restart | stop
set -euo pipefail
cd "$(dirname "$0")"

require_env() {
  [ -f .env ] || { echo ".env missing: cp .env.example .env && nano .env" >&2; exit 1; }
}
deploy() {
  require_env
  docker compose build
  docker compose up -d --wait --wait-timeout 120
  docker image prune -f >/dev/null
  docker compose ps
}
update() {
  [ -z "$(git status --porcelain)" ] || { echo "local changes on server:" >&2; git status --short; exit 1; }
  git pull --ff-only origin main
  deploy
}

case "$__{1:-}" in
  deploy)  deploy ;;
  update)  update ;;
  ssl)     ./scripts/init-ssl.sh ;;
  logs)    docker compose logs -f --tail=200 $__{2:-} ;;
  status)  docker compose ps ;;
  restart) docker compose restart ;;
  stop)    docker compose down ;;
  *)       sed -n '2p' "$0" >&2; exit 1 ;;
esac`,
          try: "حطه في مشروع compose صغير على سيرفر التجربة (أي app فيها healthcheck). جرّب [[./deploy.sh]] من غير argument، وبعدين [[deploy]]، وبعدين عدّل ملف على السيرفر وجرّب [[update]]: لازم يرفض.",
          flag: "script",
          deep: {
            why: "على السيرفر إنت بتعمل نفس ٦ أو ٧ حاجات كل مرة. لو في سكربت، أي حد في الفريق يعمل deploy صح من غير ما يفتكر ترتيب الأوامر، ومتنساش خطوة وانت مستعجل.",
            how: R`[[cd "$(dirname "$0")"]] بيخلي السكربت يشتغل من فولدره هو، فمش مهم انت واقف فين لما تشغّله.

[[build]] الأول وبعدين [[up -d]]: البناء بياخد دقايق، والموقع القديم فاضل شغال طول الوقت ده. [[up]] بعد كده بيبدّل الـ containers اللي الـ image بتاعتها اتغيرت بس، في ثواني.

[[--wait]] بيخلي compose يستنى لحد ما كل الخدمات تبقى running، واللي ليها healthcheck تبقى healthy، ولو عدّى [[--wait-timeout]] يفشل. ده بدل [[sleep 5]] اللي مش بيضمن حاجة.

update: [[git status --porcelain]] بيطبع أي ملف متغيّر، ولو طبع حاجة يبقى فيه تعديل يدوي على السيرفر، فالسكربت يقف بدل ما يمسحه أو يتلخبط. و [[--ff-only]] بيرفض أي merge، فلو السيرفر عليه commit مش على GitHub هتعرف.

[[$__{2:-}]] من غير علامات تنصيص عن قصد: لو مفيش اسم خدمة بيختفي خالص، فـ [[logs]] تعرض الكل و [[logs app]] تعرض app بس.

و [[sed -n '2p' "$0"]] بيطبع السطر التاني من السكربت نفسه، اللي هو تعليق الاستخدام، فمش محتاج تكتب رسالة الاستخدام مرتين.

ومش محتاج تعمل [[export $(cat .env | xargs)]]: compose بيقرا .env اللي جنبه لوحده.`,
            when: "أي مشروع compose على VPS. ولما تضيف أمر جديد (backup مثلًا)، ضيفه هنا كدالة واسطر في الـ case.",
            mistakes: R`في مشروع حقيقي كان [[export $(cat .env | xargs)]] بيبوظ أول ما قيمة فيها مسافة أو علامة تنصيص، وكان بيعمل [[down]] وبعدين [[build --no-cache]]، فالموقع يقع طول مدة البناء كلها، وبعدين [[sleep]] ثابت بدل healthcheck. ودالة ssl كانت بتبدّل nginx.conf ولو certbot فشل [[set -e]] بيوقف السكربت والملف يفضل متبدّل، لأن مكانش فيه trap يرجّعه. و update كان بيعمل pull من غير ما يتأكد إن مفيش تعديلات. والإيميل والدومين مكتوبين جوه السكربت.

وفي مشروع تاني كان update بيعمل [[git reset --hard origin/main]]، فأي تعديل يدوي على السيرفر (إصلاح سريع مثلًا) بيتمسح من غير كلمة. وكان بيعدّل next.config.ts بـ sed على السيرفر نفسه، ومكانش فيه healthcheck بعد up.`
          },
          teach: R`## الفكرة: ملف واحد، وأول كلمة بعده بتختار الشغلانة

السكربت ده زي «قايمة أوامر» للسيرفر: [[./deploy.sh deploy]] ينشر، و [[./deploy.sh logs app]] يعرض لوجات خدمة، وهكذا. جواه حاجتين بس: **دوال** (كل دالة شغلانة)، و **[[case]]** في الآخر بيبص على أول كلمة كتبتها ويشغّل الدالة المناسبة. هنمشي عليه بنفس ترتيب ما bash بيقراه.

كل الناتج تحت متجرّب على أوبونتو 24.04 جوه Docker: container فيه Docker تاني (Docker in Docker) عامل نفسه سيرفر، ومشروع compose صغير اسمه [[myapp]] فيه خدمة [[app]] (nginx بيسمع على 3000) ليها healthcheck، وريبو git محلي عامل نفسه GitHub.

---

## ١. أول ٤ سطور: الإعداد

~~~bash
#!/usr/bin/env bash
# ./deploy.sh deploy | update | ssl | logs [service] | status | restart | stop
set -euo pipefail
cd "$(dirname "$0")"
~~~

### [[#!/usr/bin/env bash]]

اسمه **shebang**. لما تكتب [[./deploy.sh]]، النظام بيقرا أول سطر عشان يعرف يشغّل الملف بإيه. [[env]] بيدوّر على [[bash]] في الـ PATH بدل ما نكتب مكانه بالظبط ([[/bin/bash]] أو [[/usr/local/bin/bash]]).

### السطر التاني: تعليق، بس ليه شغلانة

أي سطر بيبدأ بـ [[#]] تعليق bash مش بينفّذه. بس التعليق ده بالذات هو «طريقة الاستخدام»، وهنشوف في الآخر إن السكربت بيطبعه هو نفسه لو كتبت أمر غلط.

### [[set -euo pipefail]]

٣ مفاتيح أمان مع بعض:

| المفتاح | معناه |
|---|---|
| [[-e]] | أي أمر يفشل (exit code مش 0) يوقف السكربت كله |
| [[-u]] | استخدام متغير مش متعرّف يبقى خطأ بدل ما يبقى نص فاضي |
| [[-o pipefail]] | في [[a | b]] لو [[a]] فشل، الـ pipe كله يعتبر فاشل (من غيره بيتحسب بـ [[b]] بس) |

من غير [[-e]] لو [[docker compose build]] فشل، السكربت هيكمّل ويعمل [[up]] على الـ image القديمة ويقولك كله تمام.

### [[cd "$(dirname "$0")"]]

من جوه لبرة:

- [[$0]]: اسم السكربت زي ما اتكتب، مثلًا [[/opt/myapp/deploy.sh]].
- [[dirname]]: بيشيل آخر حتة من المسار ويسيب الفولدر: [[/opt/myapp]].
- [[$(...)]]: **command substitution**، نفّذ اللي جوه وحط ناتجه مكانه.
- علامات التنصيص: عشان لو المسار فيه مسافة ميتقسمش.

النتيجة: السكربت بيدخل فولدر المشروع، فتقدر تشغّله من أي مكان ([[/opt/myapp/deploy.sh status]] من الـ home مثلًا) و [[docker compose]] هيلاقي [[compose.yml]] و [[.env]].

---

## ٢. دالة [[require_env]]

~~~bash
require_env() {
  [ -f .env ] || { echo ".env missing: cp .env.example .env && nano .env" >&2; exit 1; }
}
~~~

- [[name() { ... }]]: كده بتعرّف **دالة** في bash. مش بتتنفّذ دلوقتي، بتتنفّذ لما حد يكتب اسمها.
- [[[ -f .env ]]]: اختبار: هل فيه **ملف** (f = file) اسمه [[.env]]؟ نجاح لو آه.
- [[||]]: «لو اللي قبلي فشل، نفّذ اللي بعدي».
- [[{ ...; ...; }]]: مجموعة أوامر تتنفّذ مع بعض (لازم مسافة بعد [[{]] و [[;]] قبل [[}]]).
- [[>&2]]: ابعت الرسالة على **stderr** (قناة الأخطاء، رقم 2) مش stdout، عشان لو حد بيوجّه الناتج لملف، الخطأ يفضل ظاهر.
- [[exit 1]]: اخرج بكود 1، يعني «فشل».

ليه موجودة؟ لأن [[.env]] مش في git (فيه باسوردات)، فأول نشر على سيرفر جديد هيبقى من غيره. بدل ما compose يطلّع خطأ غامض، السكربت بيقولك تعمل إيه. جربته من غير [[.env]]:

~~~text الناتج
.env missing: cp .env.example .env && nano .env
~~~

والـ exit code كان [[1]].

---

## ٣. دالة [[deploy]]: قلب السكربت

~~~bash
deploy() {
  require_env
  docker compose build
  docker compose up -d --wait --wait-timeout 120
  docker image prune -f >/dev/null
  docker compose ps
}
~~~

### [[docker compose build]]

بيبني الـ images الجديدة من الـ Dockerfile. **الموقع القديم لسه شغال** طول البناء، لأن البناء مش بيلمس الـ containers الشغالة.

### [[docker compose up -d --wait --wait-timeout 120]]

| الجزء | معناه |
|---|---|
| [[up]] | شغّل الخدمات، وأي container الـ image بتاعته اتغيرت يتعمل من جديد (Recreate) |
| [[-d]] | detached: اشتغل في الخلفية ورجّعلي الترمنال |
| [[--wait]] | متخرجش غير لما الخدمات تبقى running، واللي ليها healthcheck تبقى **healthy** |
| [[--wait-timeout 120]] | لو عدّت ١٢٠ ثانية ولسه مش healthy، افشل |

وده ناتج النشر الناجح (آخر سطور):

~~~text الناتج
 Container myapp-app-1  Recreate
 Container myapp-app-1  Recreated
 Container myapp-app-1  Starting
 Container myapp-app-1  Started
 Container myapp-app-1  Waiting
 Container myapp-app-1  Healthy
~~~

[[Waiting]] ثم [[Healthy]]: ده [[--wait]] شغال. وفي تجربة تانية الـ container كان بيقع أول ما يقوم، فـ [[--wait]] طلّع:

~~~text الناتج
container myapp-app-1 exited (127)
~~~

وخرج بـ 1، و [[set -e]] وقّف السكربت. من غير [[--wait]] كان هيقول «Started» ويخرج بنجاح والموقع واقع.

### [[docker image prune -f >/dev/null]]

كل build جديد بيسيب الـ image القديمة من غير اسم (اسمها [[<none>]]، ودي اسمها **dangling**). [[prune]] بيمسحهم، و [[-f]] (force) من غير ما يسألك y/N، و [[>/dev/null]] بيرمي الناتج (رقم المساحة اللي اتفضت). وخد بالك إنه بيمسح الـ dangling images بتاعة **كل** المشاريع على السيرفر، مش المشروع ده بس، ودي حاجة عادية على سيرفر إنتاج بس متعملهاش على جهازك.

### [[docker compose ps]]

بيعرض حالة الخدمات في الآخر:

~~~text الناتج
NAME          IMAGE       COMMAND                  SERVICE   CREATED         STATUS                   PORTS
myapp-app-1   myapp-app   "/docker-entrypoint.…"   app       5 seconds ago   Up 3 seconds (healthy)   80/tcp, 127.0.0.1:3000->3000/tcp
~~~

| العمود | معناه |
|---|---|
| [[NAME]] | اسم الـ container: المشروع - الخدمة - رقم |
| [[STATUS]] | [[Up 3 seconds (healthy)]]: شغال من ٣ ثواني والـ healthcheck بيعدّي |
| [[PORTS]] | [[127.0.0.1:3000->3000/tcp]]: بورت 3000 على السيرفر نفسه بس، رايح لـ 3000 في الـ container |

النشر كله خد حوالي ٨ ثواني لأن المشروع صغير. في مشروع حقيقي البناء بياخد دقايق، والموقع شغال على القديم طولها.

---

## ٤. دالة [[update]]

~~~bash
update() {
  [ -z "$(git status --porcelain)" ] || { echo "local changes on server:" >&2; git status --short; exit 1; }
  git pull --ff-only origin main
  deploy
}
~~~

### السطر الأول: السيرفر نضيف؟

- [[git status --porcelain]]: بيطبع سطر لكل ملف متغيّر، بشكل ثابت مخصوص للسكربتات (porcelain). لو مفيش تغيير بيطبع ولا حاجة.
- [[[ -z "..." ]]]: [[-z]] يعني zero length، نجاح لو النص فاضي.
- لو مش فاضي: اطبع رسالة، واعرض الملفات بـ [[git status --short]]، واخرج.

جربت أعدّل ملف وأعمل ملف جديد، [[git status --porcelain]] طبع:

~~~text الناتج
 M compose.yml
?? newfile
~~~

[[M]] = Modified (متعدّل)، و [[??]] = untracked (ملف جديد git مش عارفه). وتشغيل [[./deploy.sh update]] ساعتها:

~~~text الناتج
local changes on server:
 M compose.yml
~~~

وخرج بـ 1 من غير ما يلمس حاجة.

### [[git pull --ff-only origin main]]

[[pull]] = هات الجديد من [[origin]] (الريبو على GitHub) فرع [[main]] ودمجه. و [[--ff-only]] (fast-forward only): اقبل بس لو الفرع المحلي ورا الـ origin بخطوات، فيتحرك لقدام من غير merge commit. الناتج لما نجح:

~~~text الناتج
Updating 3b6f64b..220fa21
Fast-forward
 1 file changed, 1 insertion(+), 1 deletion(-)
~~~

وجربت أعمل commit على السيرفر نفسه (زي «hotfix» بإيدك) والـ origin فيه commit تاني، فـ git رفض:

~~~text الناتج
fatal: Not possible to fast-forward, aborting.
~~~

بـ exit [[128]]، و [[set -e]] وقّف السكربت قبل [[deploy]]. يعني السيرفر مش هيعمل merge لوحده ويخلط حاجات.

### [[deploy]]

نداء للدالة اللي فوق. يعني update = تأكد + pull + نفس خطوات النشر.

---

## ٥. الـ [[case]]: مين يتشغّل

~~~bash
case "$__{1:-}" in
  deploy)  deploy ;;
  update)  update ;;
  ssl)     ./scripts/init-ssl.sh ;;
  logs)    docker compose logs -f --tail=200 $__{2:-} ;;
  status)  docker compose ps ;;
  restart) docker compose restart ;;
  stop)    docker compose down ;;
  *)       sed -n '2p' "$0" >&2; exit 1 ;;
esac
~~~

### [[$__{1:-}]]

[[$1]] أول كلمة بعد اسم السكربت. بس مع [[set -u]]، لو شغّلته من غير ولا كلمة، [[$1]] لوحدها تبقى خطأ «unbound variable». [[:-]] معناها «لو مش موجود أو فاضي، استخدم القيمة اللي بعدي»، وهنا مفيش حاجة بعدها، فالقيمة نص فاضي من غير خطأ.

### شكل الـ [[case]]

[[case X in]] بيقارن X بكل نمط بالترتيب: [[deploy)]] نمط، وبعده الأوامر، و [[;;]] نهاية الفرع. أول نمط يطابق بيتنفّذ والباقي لأ. و [[esac]] هي [[case]] بالمقلوب، يعني نهايتها.

### [[logs)]] و [[$__{2:-}]] من غير علامات تنصيص

- [[-f]] (follow): فضّل تابع اللوجات الجديدة لحد ما تدوس Ctrl+C.
- [[--tail=200]]: ابدأ بآخر ٢٠٠ سطر بس، مش اللوج كله من أول يوم.
- [[$__{2:-}]]: الكلمة التانية (اسم الخدمة) لو موجودة. ومن غير علامات تنصيص **عن قصد**: لو مكتوبة [["$__{2:-}"]] وانت مكتبتش اسم خدمة، compose هياخد نص فاضي كاسم خدمة. جربتها كده وطلّع [[no such service: ]] وخرج بـ 1. من غير العلامات النص الفاضي بيختفي خالص.

[[./deploy.sh logs app]] طلّع (آخر سطور):

~~~text الناتج
app-1  | 127.0.0.1 - - [07/Oct/2026:14:06:49 +0000] "GET /health HTTP/1.1" 200 3 "-" "Wget" "-"
~~~

كل سطر قدامه اسم الخدمة [[app-1]]، وده طلب الـ healthcheck كل ثانيتين.

### الباقي

| الأمر الفرعي | بيشغّل | معناه |
|---|---|---|
| [[ssl]] | [[./scripts/init-ssl.sh]] | سكربت أول شهادة (درس init-ssl.sh) |
| [[status]] | [[docker compose ps]] | الحالة من غير ما تغيّر حاجة |
| [[restart]] | [[docker compose restart]] | إعادة تشغيل نفس الـ containers (مش بيبني ولا بيقرا تعديلات compose.yml) |
| [[stop]] | [[docker compose down]] | يوقف ويمسح الـ containers والـ network (الـ volumes والداتا بتفضل) |

### [[*)]]: أي حاجة تانية

[[*]] بيطابق أي نص، فده الفرع الافتراضي. [[sed -n '2p' "$0"]]: [[sed]] محرر نصوص، و [[-n]] متطبعش حاجة لوحدك، و [[2p]] اطبع السطر رقم ٢ (p = print)، و [[$0]] السكربت نفسه. يعني «اطبع تعليق الاستخدام». من غير argument:

~~~text الناتج
# ./deploy.sh deploy | update | ssl | logs [service] | status | restart | stop
~~~

وexit [[1]].

---

## ملخص الأوامر الفرعية

| الأمر | الخطوات |
|---|---|
| [[deploy]] | [[.env]] موجود؟ ← build والقديم شغال ← up واستنى healthy ← امسح القديم ← اعرض الحالة |
| [[update]] | السيرفر نضيف؟ ← pull بـ fast-forward بس ← deploy |
| [[logs [service]]] | آخر ٢٠٠ سطر وتابع |
| من غير حاجة أو غلط | اطبع سطر الاستخدام واخرج بـ 1 |

## الخلاصة

- **build قبل up**: الموقع ميقعش وقت البناء، و [[--wait]] بيضمن إن الجديد healthy مش بس «Started».
- [[set -euo pipefail]] + [[--ff-only]] + فحص [[git status]] = السكربت يقف ويقولك بدل ما يكمّل غلط.
- [[$__{1:-}]] عشان [[set -u]] ميزعّقش لما متكتبش حاجة، و [[$__{2:-}]] من غير تنصيص عشان يختفي لو فاضي.`,
          lines: [
            "أي فشل يوقف السكربت.",
            "اشتغل من فولدر السكربت نفسه.",
            "دالة بتتأكد إن .env موجود...",
            "...وإلا تقول تعمله إزاي وتخرج.",
            "نهاية الدالة.",
            "دالة النشر:",
            "اتأكد من .env.",
            "ابني الـ images الجديدة، والموقع القديم لسه شغال.",
            "بدّل واستنى لحد ما الخدمات تبقى healthy (أقصى حاجة دقيقتين).",
            "امسح الـ images القديمة اللي ملهاش اسم.",
            "اعرض الحالة.",
            "نهاية الدالة.",
            "دالة التحديث:",
            "لو فيه تعديلات يدوية على السيرفر، اعرضها واقف.",
            "اسحب الجديد، ولو محتاج merge ارفض.",
            "وانشر.",
            "نهاية الدالة.",
            "اختار حسب أول argument.",
            "نشر.",
            "تحديث من git ونشر.",
            "أول شهادة SSL (سكربت منفصل).",
            "اللوجات، لخدمة معينة لو اتكتبت.",
            "الحالة.",
            "restart لكل الخدمات.",
            "اقفل المشروع.",
            "أي حاجة تانية: اطبع سطر الاستخدام من السكربت نفسه واخرج بفشل.",
            "نهاية الـ case."
          ],
          sol: R`جربته على مشروع compose صغير فيه healthcheck:

[[./deploy.sh]] من غير argument طبع سطر الاستخدام (السطر التاني في الملف) [[# ./deploy.sh deploy | update | ssl | logs [service] | status | restart | stop]] وخرج بـ 1.
[[./deploy.sh deploy]] بنى وشغّل واستنى الـ healthcheck، وفي الآخر [[docker compose ps]] وحالته [[Up 5 seconds (healthy)]].
بعد ما عدّلت [[compose.yml]] على «السيرفر»، [[./deploy.sh update]] رفض وطبع [[local changes on server:]] و [[ M compose.yml]] وخرج بـ 1 من غير ما يعمل pull.

الرفض ده مقصود: أي تعديل بإيدك على السيرفر هيضيع أو يعمل conflict مع [[git pull]]. الصح إنك ترجّعه ([[git checkout -- file]]) أو تنقله للريبو. ولو [[deploy]] قال [[.env missing]] يبقى ده أول نشر، و [[--wait]] لو فشل يبقى الـ healthcheck مش بيعدّي، فشوف [[./deploy.sh logs app]].`
        },
        {
          cmd: "update.sh",
          title: "تحديث بيبني الأول، ولو الجديد باظ يرجع لوحده",
          desc: "الترتيب الصح لتحديث مشروع compose: تتأكد إن السيرفر نضيف، تسحب الجديد، تبني والقديم شغال، تبدّل وتستنى الـ healthcheck. ولو الجديد مقامش، السكربت يرجع للـ commit القديم ويبنيه ويشغّله، وبيكتب كل خطوة بالوقت.",
          example: R`#!/usr/bin/env bash
# ./update.sh   على السيرفر، من فولدر المشروع
set -euo pipefail
cd "$(dirname "$0")"
log() { echo "[$(date '+%F %T')] $*"; }

[ -z "$(git status --porcelain)" ] || { log "local changes on the server, stopping"; git status --short; exit 1; }
OLD=$(git rev-parse --short HEAD)
git fetch -q origin main
[ "$(git rev-parse HEAD)" != "$(git rev-parse origin/main)" ] || { log "already on latest ($OLD)"; exit 0; }
git merge -q --ff-only origin/main
NEW=$(git rev-parse --short HEAD)

log "building $NEW, the site is still up on $OLD"
docker compose build

if docker compose up -d --wait --wait-timeout 120; then
  log "live on $NEW"
  docker image prune -f >/dev/null
else
  log "$NEW is unhealthy, rolling back to $OLD"
  docker compose logs --tail=50
  git reset -q --hard "$OLD"
  docker compose build && docker compose up -d --wait
  exit 1
fi`,
          try: "على مشروع تجربة: اعمل commit بيخلّي الـ healthcheck يفشل (مثلًا غيّر مسار /health) وادفعه، وشغّل [[./update.sh >> ~/update.log 2>&1]] (اللوج برّه فولدر المشروع، لأن ملف جديد جوه الريبو بيخلّي [[git status --porcelain]] يوقف السكربت). لازم تلاقي في اللوج إنه رجع للـ commit القديم والموقع لسه شغال.",
          flag: "script",
          deep: {
            why: "أسوأ لحظة في النشر: الجديد مش شغال والقديم اتمسح. السكربت ده بيضمن إن فيه دايمًا نسخة شغالة: القديم فاضل شغال طول البناء، ولو الجديد فشل بيرجع لوحده.",
            how: R`[[git fetch]] وبعدين مقارنة [[HEAD]] بـ [[origin/main]] بيخلي السكربت يعرف لو مفيش جديد فيخرج بهدوء، ودا مهم لو شغّلته من cron أو Actions.

[[git merge --ff-only]] بيمشي لقدام بس. لو السيرفر عليه commit مش موجود على GitHub، هيرفض بدل ما يعمل merge commit على السيرفر.

[[docker compose build]] بيبني الـ images الجديدة والـ containers القديمة لسه شغالة. وبعدين [[up -d --wait]] بيبدّل ويستنى الـ healthcheck. لو نجح يبقى تمام، ولو فشل (أو عدّت دقيقتين) ندخل في الـ else.

الرجوع: [[git reset --hard "$OLD"]] هنا آمن لأننا اتأكدنا في الأول إن مفيش تعديلات يدوية. وإعادة البناء للقديم بتبقى سريعة لأن طبقاته لسه في الكاش.

وفي الآخر [[exit 1]] حتى بعد الرجوع الناجح، عشان اللي شغّل السكربت (انت أو Actions) يعرف إن التحديث فشل.

و [[log]] بيحط التاريخ والوقت قبل كل رسالة، فلو وجّهت الناتج لملف تعرف كل حاجة حصلت إمتى.

وخد بالك: لو التحديث فيه migration غيّرت قاعدة البيانات، الرجوع للكود القديم مش بيرجّع الداتا. خلي الـ migrations متوافقة مع النسخة اللي قبلها.`,
            when: "أي تحديث لمشروع compose على السيرفر، بإيدك أو من Actions. ولازم الخدمات يبقى ليها healthcheck، وإلا [[--wait]] هيستنى running بس.",
            mistakes: R`في مشروع حقيقي كان السكربت لو [[git pull]] فشل يطبع warning ويكمّل، فينشر الكود القديم ويقول «تم». وكان بيعمل [[docker-compose down]] قبل البناء فالموقع يقع طول الـ build، وبيمسح images بأسامي مكتوبة بإيده مش مطابقة لأسامي compose فالمسح عمليًا مكانش بيحصل، وبيبني بـ [[--no-cache --pull]] كل مرة (بطيء على الفاضي)، وبعدين [[sleep 5]] بدل healthcheck. وكان بيستخدم [[docker-compose]] القديم (v1).

ونسخة PowerShell من نفس السكربت كانت بتحط docker و git جوه [[try/catch]]، وده مش بيمسك فشل البرامج الخارجية في PowerShell 5.1؛ لازم تبص على [[$LASTEXITCODE]] بعد كل أمر.`
          },
          teach: R`## الفكرة: دايمًا فيه نسخة شغالة

السكربت بيعمل التحديث على ٤ مراحل: يتأكد إن السيرفر نضيف، يعرف فيه جديد ولا لأ، يبني والقديم شغال، يبدّل ويستنى الـ healthcheck. ولو الجديد مقامش، يرجع للـ commit اللي كان شغال قبله. وكل خطوة بتتكتب في اللوج بالوقت.

الناتج تحت كله حقيقي: اتجرّب على أوبونتو 24.04 جوه Docker (container فيه Docker تاني عامل نفسه السيرفر)، بمشروع compose فيه خدمة [[app]] ليها healthcheck بيطلب [[/health]] كل ثانيتين، وريبو git محلي عامل نفسه GitHub.

---

## ١. الإعداد ودالة [[log]]

~~~bash
#!/usr/bin/env bash
# ./update.sh   على السيرفر، من فولدر المشروع
set -euo pipefail
cd "$(dirname "$0")"
log() { echo "[$(date '+%F %T')] $*"; }
~~~

أول ٣ أوامر نفس درس deploy.sh: الـ shebang، و [[set -euo pipefail]] (أي فشل يوقف، ومتغير مش متعرّف خطأ، والـ pipe يفشل لو أي حتة فيه فشلت)، و [[cd]] لفولدر السكربت.

### دالة [[log]] من جوه لبرة

- [[date '+%F %T']]: [[%F]] التاريخ بشكل [[2026-10-07]]، و [[%T]] الوقت [[14:09:03]].
- [[$(...)]]: حط ناتج [[date]] مكانه.
- [[$*]]: كل الكلام اللي اتبعت للدالة كنص واحد.

فـ [[log "hello"]] بتطبع [[[2026-10-07 14:09:03] hello]]. وده مهم لأن السكربت ده غالبًا بيتوجّه لملف لوج، ومن غير الوقت مش هتعرف التحديث حصل إمتى.

---

## ٢. السيرفر نضيف؟

~~~bash
[ -z "$(git status --porcelain)" ] || { log "local changes on the server, stopping"; git status --short; exit 1; }
~~~

[[git status --porcelain]] بيطبع سطر لكل ملف متعدّل أو جديد، و [[-z]] نجاح لو النص فاضي. لو فيه حاجة: سجّل، اعرض الملفات، واخرج بـ 1.

ليه ده مهم هنا بالذات؟ لأن الـ rollback تحت بيعمل [[git reset --hard]]، وده بيمسح أي تعديل مش متعمله commit. الفحص ده بيضمن إن مفيش حاجة تتمسح غير اللي احنا جايبينه.

> فخ: لو وجّهت اللوج لملف **جوه** فولدر المشروع ([[./update.sh >> update.log]])، الملف ده نفسه هيبان في [[--porcelain]] كـ [[?? update.log]] والسكربت هيوقف على طول. عشان كده اللوج برّه: [[>> ~/update.log]].

---

## ٣. فيه جديد؟

~~~bash
OLD=$(git rev-parse --short HEAD)
git fetch -q origin main
[ "$(git rev-parse HEAD)" != "$(git rev-parse origin/main)" ] || { log "already on latest ($OLD)"; exit 0; }
~~~

### [[OLD=$(git rev-parse --short HEAD)]]

[[HEAD]] هو الـ commit اللي السيرفر واقف عليه دلوقتي. [[rev-parse]] بيحوّل اسم زي [[HEAD]] لرقم الـ commit (الـ hash)، و [[--short]] أول ٧ حروف بس ([[d45043a]]). بنحفظه في [[OLD]] لأنه «النسخة السليمة» اللي هنرجعلها لو حاجة باظت.

### [[git fetch -q origin main]]

[[fetch]] بيجيب الجديد من GitHub ويحطه في [[origin/main]] **من غير ما يغيّر ملفاتك**. عكس [[pull]] اللي بيجيب ويدمج. و [[-q]] (quiet) من غير كلام.

### المقارنة

[[!=]] يعني «مش زي». لو [[HEAD]] زي [[origin/main]] يبقى مفيش جديد، فالسكربت يخرج بـ [[exit 0]] (نجاح، مش فشل) من غير ما يبني حاجة. جربته وفيش جديد:

~~~text الناتج
[2026-10-07 14:09:03] already on latest (d45043a)
~~~

ده بيخلي تشغيله من cron كل ٥ دقايق آمن: معظم المرات هيخرج في ثانية.

---

## ٤. اتحرّك للجديد

~~~bash
git merge -q --ff-only origin/main
NEW=$(git rev-parse --short HEAD)
~~~

[[merge --ff-only origin/main]]: حرّك الفرع المحلي لـ [[origin/main]] بس لو ده مجرد «مشي لقدام» (fast-forward). لو السيرفر عليه commit مش موجود على GitHub، الأمر يفشل بـ [[fatal: Not possible to fast-forward, aborting.]] و [[set -e]] يوقف كل حاجة. ([[fetch]] + [[merge --ff-only]] هما نفس [[pull --ff-only]] متقسمين اتنين، عشان نقارن في النص.)

وبعدها [[NEW]] رقم الـ commit الجديد.

---

## ٥. ابني والقديم شغال

~~~bash
log "building $NEW, the site is still up on $OLD"
docker compose build
~~~

البناء بيعمل image جديدة بس، والـ container القديم شغال وبيرد على الناس طول الوقت ده.

---

## ٦. بدّل واستنى: [[if ... then ... else]]

~~~bash
if docker compose up -d --wait --wait-timeout 120; then
  log "live on $NEW"
  docker image prune -f >/dev/null
else
  ...
fi
~~~

[[if]] في bash بيشغّل الأمر ويبص على الـ exit code: 0 يبقى [[then]]، غير كده يبقى [[else]]. ومهم: الأمر اللي جوه شرط [[if]] لو فشل، [[set -e]] **مش** بيوقف السكربت، وده اللي يخلّينا نوصل للـ else ونرجع.

[[up -d --wait --wait-timeout 120]]: بدّل الـ containers اللي اتغيرت، واستنى لحد ما تبقى healthy، وأقصى حاجة ١٢٠ ثانية.

### النجاح

بعد push لـ commit سليم، اللوج:

~~~text الناتج
[2026-10-07 14:09:03] building 94609c5, the site is still up on d45043a
[2026-10-07 14:09:09] live on 94609c5
~~~

٦ ثواني بين السطرين (مشروع صغير). وبعدها [[docker image prune -f]] بيمسح الـ image القديمة اللي بقت من غير اسم.

---

## ٧. الفشل: الرجوع

~~~bash
else
  log "$NEW is unhealthy, rolling back to $OLD"
  docker compose logs --tail=50
  git reset -q --hard "$OLD"
  docker compose build && docker compose up -d --wait
  exit 1
fi
~~~

| السطر | ليه |
|---|---|
| [[log ... rolling back]] | يكتب في اللوج إنه فشل وراجع لأنهي نسخة |
| [[docker compose logs --tail=50]] | آخر ٥٠ سطر من لوجات الخدمات، **قبل** ما الـ container البايظ يتمسح، عشان تعرف السبب |
| [[git reset -q --hard "$OLD"]] | رجّع الفرع والملفات للـ commit القديم بالظبط ([[--hard]] = الملفات كمان، مش التاريخ بس) |
| [[build && up -d --wait]] | ابني القديم (سريع لأن طبقاته في الكاش) وشغّله. [[&&]] = نفّذ التاني بس لو الأول نجح |
| [[exit 1]] | حتى لو الرجوع نجح، التحديث نفسه فشل، فاللي شغّل السكربت لازم يعرف |

### التجربة الحقيقية

عملت commit بيغيّر مسار الـ healthcheck لـ [[/nope]] (مش موجود، فبيرجع 404). اللوج:

~~~text الناتج
[2026-10-07 14:09:14] building 4607707, the site is still up on 94609c5
container myapp-app-1 is unhealthy
[2026-10-07 14:09:24] 4607707 is unhealthy, rolling back to 94609c5
~~~

وفي النص آخر اللوجات بتاعة الـ app، وفيها السبب بوضوح:

~~~text الناتج
app-1  | 127.0.0.1 - - [07/Oct/2026:14:09:20 +0000] "GET /nope HTTP/1.1" 404 153 "-" "Wget" "-"
~~~

وفي الآخر [[Container myapp-app-1  Healthy]] (القديم رجع)، والسكربت خرج بـ [[1]]. بعدها:

~~~text الناتج
$ git log --oneline -1
94609c5 v4
$ docker compose ps --format "{{.Name}} {{.Status}}"
myapp-app-1 Up 2 seconds (healthy)
~~~

### ليه خد ١٠ ثواني مش ١٢٠؟

[[--wait-timeout]] حد أقصى. الـ healthcheck في التجربة: كل ثانيتين ([[interval: 2s]]) ويعتبر الـ container **unhealthy** بعد ٣ فشلات ورا بعض ([[retries: 3]]). أول ما الحالة بقت unhealthy، [[--wait]] فشل على طول من غير ما يستنى باقي الدقيقتين.

---

## ملخص الخطوات

| # | الخطوة | لو فشلت |
|---|---|---|
| ١ | السيرفر نضيف؟ | يقف بـ 1 |
| ٢ | [[fetch]] وفيه جديد؟ | مفيش جديد: يخرج بـ 0 |
| ٣ | [[merge --ff-only]] | السيرفر عليه commit محلي: يقف |
| ٤ | [[build]] والقديم شغال | يقف، والقديم لسه شغال |
| ٥ | [[up --wait]] | يرجع لـ [[$OLD]] ويبنيه ويخرج بـ 1 |

## الخلاصة

- **[[OLD]] اتحفظ قبل أي تغيير**، وده اللي بيخلّي الرجوع ممكن.
- الأمر جوه [[if]] بيفشل من غير ما [[set -e]] يوقف السكربت، فالـ else بيشتغل.
- الرجوع بيرجّع **الكود** بس. لو الجديد فيه migration غيّرت قاعدة البيانات، الداتا مش بترجع.
- الـ origin لسه عليه الـ commit البايظ، فالتشغيل الجاي هيجرّبه تاني لحد ما تصلّحه وتعمل push.`,
          lines: [
            "أي فشل يوقف السكربت.",
            "اشتغل من فولدر المشروع.",
            "دالة بتطبع الرسالة ومعاها التاريخ والوقت.",
            "لو فيه تعديلات يدوية على السيرفر، اقف.",
            "احفظ الـ commit الحالي عشان نرجعله لو احتجنا.",
            "هات آخر حاجة من GitHub من غير ما تغيّر الملفات.",
            "لو احنا أصلًا على آخر نسخة، اخرج بهدوء.",
            "امشي لقدام للجديد (ومن غير merge).",
            "احفظ الـ commit الجديد.",
            "رسالة.",
            "ابني، والقديم لسه شغال.",
            "بدّل واستنى الـ healthcheck. لو نجح...",
            "...قول إنه شغال...",
            "...ونضّف الـ images القديمة.",
            "لو فشل...",
            "...قول هيرجع لأنهي نسخة.",
            "...اطبع آخر اللوجات عشان تعرف السبب.",
            "...ارجع للكود القديم.",
            "...ابنيه وشغّله.",
            "...واخرج بفشل عشان اللي شغّله يعرف.",
            "نهاية الـ if."
          ],
          sol: R`جربتها: ريبو origin محلي، وcommit بيغيّر مسار الـ healthcheck لملف مش موجود. [[./update.sh >> ../update.log 2>&1]] رجّع exit [[1]]، واللوج فيه:

[[[2026-09-30 07:58:15] building b8fec57, the site is still up on a2f374e]]
[[container upd-app-1 is unhealthy]]
[[[2026-09-30 07:58:35] b8fec57 is unhealthy, rolling back to a2f374e]]

وبعدها [[git log -1]] رجع [[a2f374e]] و [[docker compose ps]] بيقول [[(healthy)]]. يعني الموقع رجع للنسخة السليمة لوحده.

لقيت فخ في التجربة نفسها: لو اللوج جوه فولدر المشروع ([[>> update.log]])، [[git status --porcelain]] بيشوف [[update.log]] كملف جديد فالسكربت بيقف على طول بـ [[local changes on the server, stopping]]. عشان كده الـ try بقى يكتب اللوج برّه المشروع ([[~/update.log]])، أو ضيف [[update.log]] لـ [[.gitignore]]. وخد بالك إن بعد الـ rollback الـ origin لسه عليه الـ commit البايظ، فالتشغيل الجاي هيجرّبه تاني لحد ما تصلّحه وتعمل push.`
        },
        {
          cmd: "deploy-run.sh",
          title: "نشر container واحد من غير compose",
          desc: "لما المشروع container واحد، ممكن تنشره بـ [[docker build]] و [[docker run]] مباشرة. السكربت ده بيوريك اللي compose بيعمله من ورا الستارة: يحتفظ بالـ image القديمة باسم previous، يبني والموقع شغال، يبدّل، يستنى الـ health، ولو فشل يرجع للقديمة.",
          example: R`#!/usr/bin/env bash
set -euo pipefail
NAME=myapp
[ -f .env ] || { echo ".env missing" >&2; exit 1; }
set -a; . ./.env; set +a
run() { docker run -d --name "$NAME" -p 127.0.0.1:3000:3000 --env-file .env --restart unless-stopped "$1"; }
healthy() { for i in $(seq 1 30); do curl -fsS -o /dev/null http://127.0.0.1:3000/api/health && return 0; sleep 2; done; return 1; }

docker image inspect "$NAME:latest" >/dev/null 2>&1 && docker tag "$NAME:latest" "$NAME:previous"
docker build --build-arg NEXT_PUBLIC_API_URL="$NEXT_PUBLIC_API_URL" -t "$NAME:latest" .

docker rm -f "$NAME" 2>/dev/null || true
run "$NAME:latest"

if healthy; then
  echo "live"; docker logs --tail 20 "$NAME"
else
  echo "new image is unhealthy, back to previous" >&2
  docker logs --tail 50 "$NAME"
  docker rm -f "$NAME"; run "$NAME:previous"
  exit 1
fi`,
          try: "شغّله مرتين على سيرفر التجربة، وبعدين [[docker images myapp]]: لازم تلاقي latest و previous. بعدها بوّظ مسار /api/health في الكود وشغّله تالت: لازم يرجع للـ previous لوحده.",
          flag: "script",
          deep: {
            why: "مش كل مشروع محتاج compose. ولو فهمت الخطوات دي بإيدك، هتفهم compose بيعمل إيه، وهتعرف تصلّح لما حاجة تقف في النص.",
            how: R`[[set -a]] بيخلي أي متغير يتعرّف بعده يبقى export تلقائي، و [[. ./.env]] بيقرا الملف كأنه سكربت، و [[set +a]] بيقفل الوضع ده. كده متغيرات .env بقت متاحة للسكربت (محتاجينها للـ build-arg). وده أسلم من [[export $(cat .env | xargs)]] بس القيم اللي فيها مسافات لازم تبقى جوه علامات تنصيص في .env.

وخد بالك من فرق مهم: [[docker run --env-file]] بياخد القيم حرفيًا بعلامات التنصيص لو موجودة، عكس compose اللي بيشيلها. فلو .env فيه [[KEY="abc"]] التطبيق هيشوف القيمة بالعلامات.

[[docker tag latest previous]] قبل البناء بيحفظ النسخة الشغالة باسم تاني، فالبناء الجديد ميمسحهاش. وده الـ rollback بتاعك.

[[-p 127.0.0.1:3000:3000]] بيفتح البورت على السيرفر نفسه بس، و Nginx اللي على السيرفر هو اللي يوصله. من غير [[127.0.0.1]] البورت بيبقى مفتوح للعالم حتى لو ufw قافله.

[[healthy]] بيحاول ٣٠ مرة كل ثانيتين. [[curl -f]] بيفشل لو الرد مش 2xx.

وفيه ثواني downtime بين [[rm -f]] و [[run]]، لأن اتنين containers مينفعش ياخدوا نفس البورت. لو محتاج صفر downtime، شغّل الجديد على بورت تاني وبدّل في Nginx (درس blue-green في تاب Nginx).`,
            when: "مشروع container واحد وراه Nginx على السيرفر. ولو عندك قاعدة بيانات أو أكتر من خدمة، compose أسهل.",
            mistakes: "في مشروع حقيقي كان السكربت بيمسح الـ image القديمة قبل البناء، فلو البناء فشل مفيش حاجة ترجعلها. وكان بيوقف الـ container قبل البناء، فالموقع يقع طول مدة الـ build. وكان بيطبع قيم متغيرات قاعدة البيانات ومفاتيح الدفع على الشاشة (وبالتالي في لوجات الـ CI) عشان «يتأكد إنها موجودة»؛ اطبع الأسماء بس. وكان بيبعت أسرار السيرفر كـ [[--build-arg]]، فبتتحفظ جوه الـ image وتبان في [[docker history]]. والصح إن [[NEXT_PUBLIC_*]] بس هي اللي تتبعت وقت البناء، والباقي وقت التشغيل بـ [[--env-file]]. و [[sleep 5]] مكان health check."
          },
          teach: R`## الفكرة: نفس شغل compose، بس بإيدك

السكربت بينشر container واحد بأوامر Docker العادية: يحفظ الـ image الشغالة باسم [[previous]]، يبني الجديدة باسم [[latest]]، يبدّل الـ container، ويسأل [[/api/health]] لحد ما يرد. ولو مردش، يرجّع [[previous]].

جربته على أوبونتو 24.04 جوه Docker (container فيه Docker تاني عامل نفسه السيرفر)، بـ image صغيرة مبنية على [[nginx:alpine]] بتسمع على 3000 وفيها ملف [[api/health]].

---

## ١. الإعداد وقراية [[.env]]

~~~bash
#!/usr/bin/env bash
set -euo pipefail
NAME=myapp
[ -f .env ] || { echo ".env missing" >&2; exit 1; }
set -a; . ./.env; set +a
~~~

- [[set -euo pipefail]]: أي فشل يوقف، والمتغير المش متعرّف خطأ، والـ pipe بيفشل لو أي جزء فيه فشل.
- [[NAME=myapp]]: اسم واحد هنستخدمه للـ container وللـ image. في bash مفيش مسافات حوالين [[=]].
- [[[ -f .env ] || {...}]]: لو الملف مش موجود اطبع على stderr ([[>&2]]) واخرج بـ 1.

### [[set -a; . ./.env; set +a]]

٣ أوامر على سطر واحد، و [[;]] بتفصل بينهم:

| الأمر | معناه |
|---|---|
| [[set -a]] | a = allexport: أي متغير يتعرّف من دلوقتي يبقى [[export]] لوحده |
| [[. ./.env]] | النقطة = [[source]]: نفّذ الملف ده جوه الـ shell الحالي، فكل سطر [[KEY=value]] فيه بيتعرّف كمتغير |
| [[set +a]] | اقفل الوضع ده (الـ [[+]] بيقفل، والـ [[-]] بيفتح) |

ليه؟ لأن السكربت محتاج [[$NEXT_PUBLIC_API_URL]] تحت في [[docker build]]. ملف [[.env]] في التجربة:

~~~text .env
NEXT_PUBLIC_API_URL=https://api.example.com
DB_PASSWORD="s3cret"
~~~

---

## ٢. دالتين مساعدتين

### [[run]]: شغّل container

~~~bash
run() { docker run -d --name "$NAME" -p 127.0.0.1:3000:3000 --env-file .env --restart unless-stopped "$1"; }
~~~

| الجزء | معناه |
|---|---|
| [[docker run -d]] | شغّل container في الخلفية (detached) |
| [[--name "$NAME"]] | سمّيه [[myapp]]، فنقدر نشيله بالاسم بعدين |
| [[-p 127.0.0.1:3000:3000]] | بورت السيرفر:بورت الـ container. و [[127.0.0.1]] = السيرفر نفسه بس، فـ Nginx يوصله والإنترنت لأ |
| [[--env-file .env]] | كل سطر في [[.env]] يبقى متغير بيئة جوه الـ container |
| [[--restart unless-stopped]] | لو وقع أو السيرفر عمل reboot يقوم لوحده، إلا لو انت وقفته بإيدك |
| [[$1]] | أول حاجة اتبعتت للدالة: اسم الـ image ([[myapp:latest]] أو [[myapp:previous]]) |

وفيه فرق مهم اتأكدت منه: [[--env-file]] بياخد القيمة **بعلامات التنصيص**. بعد التشغيل:

~~~text الناتج
$ docker exec myapp printenv DB_PASSWORD
"s3cret"
~~~

العلامات بقت جزء من الباسورد! فالـ [[.env]] اللي هيتقري بـ [[--env-file]] يتكتب من غير علامات (compose بيشيلها، [[docker run]] لأ). بس [[. ./.env]] فوق محتاج علامات لو القيمة فيها مسافة، فخلّي القيم من غير مسافات.

### [[healthy]]: استنى لحد ما يرد

~~~bash
healthy() { for i in $(seq 1 30); do curl -fsS -o /dev/null http://127.0.0.1:3000/api/health && return 0; sleep 2; done; return 1; }
~~~

- [[seq 1 30]]: بيطبع الأرقام من ١ لـ ٣٠، فاللوب بيلف ٣٠ مرة.
- [[curl -fsS -o /dev/null URL]]: [[-f]] افشل لو الرد 400 أو أكتر، [[-s]] من غير progress، [[-S]] بس اطبع الخطأ لو حصل، [[-o /dev/null]] ارمي محتوى الرد.
- [[&& return 0]]: لو curl نجح اخرج من الدالة بنجاح على طول.
- [[sleep 2]]: وإلا استنى ثانيتين وجرّب تاني.
- [[return 1]]: لو الـ ٣٠ محاولة خلصوا، فشل.

يعني أقصى انتظار حوالي دقيقة (٣٠ × ٢ ثانية). وأول محاولة غالبًا بتفشل لأن الـ container لسه بيقوم:

~~~text الناتج
curl: (56) Recv failure: Connection reset by peer
~~~

ده عادي، المحاولة اللي بعدها نجحت.

---

## ٣. احفظ القديمة وابني الجديدة

~~~bash
docker image inspect "$NAME:latest" >/dev/null 2>&1 && docker tag "$NAME:latest" "$NAME:previous"
docker build --build-arg NEXT_PUBLIC_API_URL="$NEXT_PUBLIC_API_URL" -t "$NAME:latest" .
~~~

### السطر الأول

- [[docker image inspect myapp:latest]]: بيطبع معلومات الـ image لو موجودة، ويفشل لو مش موجودة. هنا بنستخدمه كسؤال «موجودة؟» بس، فبنرمي الناتج والأخطاء: [[>/dev/null]] (stdout) و [[2>&1]] (ابعت stderr لنفس المكان).
- [[&& docker tag latest previous]]: لو موجودة، اديها اسم تاني [[previous]]. الـ tag مش نسخة، ده اسم زيادة لنفس الـ image.

في أول نشر خالص مفيش [[latest]]، فـ [[inspect]] بيفشل والـ tag مش بيحصل. وفشل أول أمر في [[a && b]] مش بيوقف السكربت مع [[set -e]] (bash بيعتبره شرط).

### [[docker build]]

- [[--build-arg NAME=value]]: قيمة بتتبعت للـ Dockerfile وقت البناء (الـ Dockerfile لازم فيه [[ARG NEXT_PUBLIC_API_URL]]). متغيرات [[NEXT_PUBLIC_*]] في Next.js بتتحط جوه كود المتصفح وقت البناء، فلازم تتبعت هنا. الأسرار لأ: الـ build-arg بيبان في [[docker history]].
- [[-t myapp:latest]]: سمّي الناتج. الاسم [[latest]] بيتنقل للـ image الجديدة، والقديمة لسه ماسكة اسم [[previous]].
- [[.]]: الـ build context، يعني الفولدر الحالي.

بعد تشغيلين:

~~~text الناتج
$ docker images myapp --format "{{.Repository}}:{{.Tag}} {{.ID}}"
myapp:latest 5a98954ff113
myapp:previous 95b1f1527ad5
~~~

ID مختلف لكل واحدة: دول فعلًا two images.

---

## ٤. بدّل الـ container

~~~bash
docker rm -f "$NAME" 2>/dev/null || true
run "$NAME:latest"
~~~

- [[docker rm -f]]: [[-f]] = وقّف وامسح حتى لو شغال. بيطبع اسم الـ container ([[myapp]]) لما ينجح.
- [[2>/dev/null || true]]: في أول نشر مفيش container، فـ [[rm]] بيفشل. بنرمي رسالة الخطأ، و [[|| true]] بيخلي السطر ينجح عشان [[set -e]] ميوقفش.
- [[run "$NAME:latest"]]: شغّل الجديد. [[docker run -d]] بيطبع الـ ID الطويل بتاع الـ container الجديد.

بين السطرين دول الموقع واقف ثواني (مفيش حد بيسمع على 3000). مينفعش تشغّل الجديد الأول لأن اتنين containers مش هياخدوا نفس البورت.

---

## ٥. اتأكد، وإلا ارجع

~~~bash
if healthy; then
  echo "live"; docker logs --tail 20 "$NAME"
else
  echo "new image is unhealthy, back to previous" >&2
  docker logs --tail 50 "$NAME"
  docker rm -f "$NAME"; run "$NAME:previous"
  exit 1
fi
~~~

### النجاح

[[live]] وبعدها آخر ٢٠ سطر من لوج الـ container ([[docker logs --tail 20]])، وآخرهم كان طلب الـ health:

~~~text الناتج
live
...
172.17.0.1 - - [07/Oct/2026:14:10:49 +0000] "GET /api/health HTTP/1.1" 200 3 "-" "curl/8.5.0" "-"
~~~

[[172.17.0.1]] هو السيرفر نفسه من وجهة نظر الـ container (بوابة شبكة Docker الافتراضية).

### الفشل

مسحت [[api/health]] من الـ image وشغّلت تالت مرة. الـ ٣٠ محاولة كلهم طلّعوا:

~~~text الناتج
curl: (22) The requested URL returned error: 404
~~~

و [[(22)]] ده كود خطأ curl لما [[-f]] يلاقي رد 400 أو أكتر. بعدها:

~~~text الناتج
new image is unhealthy, back to previous
~~~

والسكربت خد ٦٦ ثانية وخرج بـ [[1]]. والحالة بعدها:

~~~text الناتج
$ docker ps --format "{{.Names}} {{.Image}} {{.Status}}"
myapp myapp:previous Up Less than a second
$ curl -s -o /dev/null -w "%{http_code}\n" 127.0.0.1:3000/api/health
200
~~~

الموقع رجع على [[previous]].

---

## ملخص الخطوات

| # | الخطوة | الأمر |
|---|---|---|
| ١ | اقرا [[.env]] | [[set -a; . ./.env; set +a]] |
| ٢ | احفظ الشغالة | [[docker tag latest previous]] |
| ٣ | ابني | [[docker build -t latest]] |
| ٤ | بدّل | [[docker rm -f]] ثم [[docker run]] |
| ٥ | استنى الـ health | ٣٠ × [[curl -f]] كل ثانيتين |
| ٦ | فشل؟ | [[docker run previous]] و [[exit 1]] |

## الخلاصة

- الـ rollback هنا مجرد **اسم تاني** ([[previous]]) لنفس الـ image القديمة.
- بعد rollback، [[latest]] هي البايظة. لو شغّلت السكربت تاني من غير ما تصلّح، هيعمل tag للبايظة كـ [[previous]].
- [[--env-file]] بياخد علامات التنصيص حرفيًا، و [[--build-arg]] للقيم العامة بس.`,
          lines: [
            "أي فشل يوقف السكربت.",
            "اسم الـ container والـ image.",
            "لو .env مش موجود اقف.",
            "اقرا .env وخلي كل متغيراته export، وبعدين اقفل الوضع ده.",
            "دالة بتشغّل الـ container بالـ image اللي تديهالها: على localhost بس، بمتغيرات .env، ويقوم لوحده بعد reboot.",
            "دالة بتحاول ٣٠ مرة كل ثانيتين لحد ما [[/api/health]] يرد بنجاح.",
            "لو فيه latest، احفظها باسم previous.",
            "ابني الجديدة، والمتغيرات العامة بس كـ build-arg.",
            "شيل الـ container القديم (ومن غير خطأ لو مش موجود).",
            "شغّل الجديد.",
            "لو قام...",
            "...قول واعرض آخر اللوجات.",
            "لو مقامش...",
            "...قول هيرجع.",
            "...اعرض اللوجات عشان تعرف ليه.",
            "...شيل الجديد وشغّل previous.",
            "...واخرج بفشل.",
            "نهاية الـ if."
          ],
          sol: R`جربتها بـ image صغيرة بترد على [[/api/health]]. أول تشغيلين طبعوا [[live]]، و [[docker images myapp]] فيها [[latest]] و [[previous]] (IDs مختلفة). بعد ما مسحت الـ health من الكود، التشغيل التالت استنى حوالي دقيقة (٣٠ محاولة كل ثانيتين) وطبع [[new image is unhealthy, back to previous]] وخرج بـ 1، و [[docker ps]] بيوريك [[myapp:previous]] شغال، و [[curl /api/health]] رجّع [[200]].

فيه نقطة ضعف لازم تعرفها: بعد النشر الفاشل، [[myapp:latest]] بقى هو الـ image البايظة. لو شغّلت السكربت تاني من غير ما تصلّح، أول سطر هيعمل tag للبايظة كـ [[previous]] ويضيع السليمة. فبعد أي rollback صلّح الكود الأول، أو اعمل [[docker tag myapp:previous myapp:good]] كنسخة احتياطية.

ولو [[docker run]] نفسه فشل (بورت مشغول أو أمر غلط في الـ image)، [[set -e]] بيوقف السكربت قبل الـ rollback والموقع يفضل واقف. ساعتها شغّل [[previous]] بإيدك.`
        },
        {
          cmd: "deploy-static.sh",
          title: "نشر موقع Vite ثابت على السيرفر من جهازك",
          desc: "أبسط نشر لفرونت React أو Vite: تبني على جهازك، ترفع dist لفولدر جديد على السيرفر، وتحوّل رابط [[current]] عليه. Nginx بيقدّم من [[current]]، فالتبديل لحظي، والنسخ القديمة موجودة لو احتجت ترجع.",
          example: R`#!/usr/bin/env bash
# من جهازك، جوه فولدر الفرونت
set -euo pipefail
SERVER=deploy@203.0.113.10
SITE=/var/www/example.com
REL=$(date +%Y%m%d-%H%M%S)

npm ci
npm run build
test -f dist/index.html

ssh "$SERVER" "mkdir -p $SITE/releases/$REL"
rsync -az --chmod=D755,F644 dist/ "$SERVER:$SITE/releases/$REL/"
ssh "$SERVER" "ln -sfn $SITE/releases/$REL $SITE/current"
ssh "$SERVER" "ls -1dt $SITE/releases/*/ | tail -n +6 | xargs -r rm -rf"
curl -fsS -o /dev/null -w '%{http_code} https://example.com/\n' https://example.com/`,
          try: "على سيرفر التجربة: [[sudo install -d -o deploy /var/www/example.com]]، وخلي [[root]] في Nginx يشاور على [[/var/www/example.com/current]]. انشر مرتين، وبعدين ارجع للنسخة الأولانية بـ [[ln -sfn]] على فولدرها واعمل refresh.",
          flag: "script",
          deep: {
            why: "موقع static مش محتاج Docker ولا build على السيرفر. بس النسخ اليدوي بيسيب ملفات قديمة، ومفيهوش رجوع. الطريقة دي بتحل الاتنين.",
            how: R`كل نشر في فولدر جديد باسم الوقت جوه [[releases]]، و [[current]] مجرد symlink بيشاور على واحد منهم. [[ln -sfn]]: [[-s]] رابط، و [[-f]] استبدل الموجود، و [[-n]] اعتبر الرابط القديم ملف ومتدخلش جواه. والرجوع = نفس الأمر على فولدر أقدم.

[[rsync -az]] بيرفع بالضغط وبيحافظ على الملفات، و [[--chmod=D755,F644]] بيظبط الصلاحيات: الفولدرات 755 والملفات 644. Nginx (يوزر www-data) محتاج يقرا بس، فمش محتاج [[chown www-data]] طالما الملفات مقروءة للكل.

[[test -f dist/index.html]] بيتأكد إن البناء طلّع حاجة فعلًا قبل ما ترفع فولدر فاضي.

التنضيف: [[ls -1dt]] بيرتّب الفولدرات من الأحدث، و [[tail -n +6]] بياخد من السادس وانت نازل، يعني بيسيب آخر ٥ نسخ.

ومش محتاج reload لـ Nginx: الملفات بتتقري من الديسك مع كل طلب، والـ reload لازم بس لو غيّرت إعدادات Nginx نفسها. اللي محتاج تظبطه في Nginx مرة واحدة: [[index.html]] بـ [[Cache-Control: no-cache]] والـ assets اللي في اسمها hash بكاش سنة (درس «كاش الملفات الثابتة» في تاب Nginx)، وده اللي بيخلي الناس تشوف الجديد من غير Ctrl+F5.

على ويندوز rsync مش موجود في Git Bash، شغّل السكربت من WSL.`,
            when: "مواقع Vite أو React أو أي static site على VPS فيه Nginx. ولو عايزها أوتوماتيك، نفس الخطوات تتحط في GitHub Actions.",
            mistakes: "في مشروع حقيقي كان النشر [[scp -r dist/* root@...]]: الدخول بـ root، و [[*]] مش بتنقل الملفات المخفية، ومفيش مسح للقديم، فالفولدر بيكبر للأبد بملفات assets قديمة. وكان فيه خطوة [[chmod -R 755]] على كل حاجة، فكل الملفات بقت executable، والصح 644 للملفات و 755 للفولدرات. وكان بيمسح [[/var/cache/nginx/*]] عشان «يحل مشكلة الكاش»، وده ملوش لازمة من غير proxy_cache؛ المشكلة الحقيقية كانت في هيدرز index.html. ومكانش فيه أي نسخة ترجعلها لو البناء الجديد بايظ."
          },
          teach: R`## الفكرة: كل نشر في فولدر لوحده، و [[current]] بيشاور على واحد

على السيرفر الشكل بيبقى كده:

~~~text
/var/www/example.com/
  releases/
    20261007-141455/     نسخة قديمة
    20261007-141505/     آخر نسخة
  current -> releases/20261007-141505
~~~

Nginx بيقدّم من [[current]]، و [[current]] مجرد **symlink** (اختصار بيشاور على فولدر تاني). النشر = ارفع فولدر جديد وحوّل السهم. الرجوع = حوّل السهم لفولدر أقدم.

جربت السكربت كامل: «جهازك» container من [[node:22-slim]]، و «السيرفر» container أوبونتو 24.04 فيه [[sshd]] و [[nginx]] ويوزر [[deploy]]، الاتنين على شبكة Docker خاصة. غيّرت بس [[SERVER=deploy@srv]] و الـ curl الأخير لـ [[http://srv/]] لأن مفيش دومين حقيقي ولا https في التجربة.

---

## ١. المتغيرات

~~~bash
set -euo pipefail
SERVER=deploy@203.0.113.10
SITE=/var/www/example.com
REL=$(date +%Y%m%d-%H%M%S)
~~~

- [[set -euo pipefail]]: أي أمر يفشل يوقف السكربت (مهم جدًا هنا: منرفعش build بايظ).
- [[SERVER]]: بشكل [[user@host]]، اليوزر [[deploy]] على السيرفر. ([[203.0.113.10]] عنوان مخصوص للأمثلة في الـ docs، مش سيرفر حقيقي.)
- [[SITE]]: فولدر الموقع على السيرفر.
- [[REL]]: اسم النسخة. [[%Y%m%d]] سنة وشهر ويوم، و [[%H%M%S]] ساعة ودقيقة وثانية، فيطلع زي [[20261007-141455]]. والأسامي دي بتترتّب أبجديًا بنفس ترتيب الوقت.

---

## ٢. ابني على جهازك

~~~bash
npm ci
npm run build
test -f dist/index.html
~~~

- [[npm ci]]: ci = clean install. بيمسح [[node_modules]] ويسطّب **بالظبط** النسخ اللي في [[package-lock.json]]، ويفشل لو الـ lockfile مش متوافق مع [[package.json]]. ده الصح للبناء، عكس [[npm install]] اللي ممكن يحدّث الـ lockfile.
- [[npm run build]]: بيشغّل سكربت [[build]] من [[package.json]] (في Vite: [[vite build]])، والناتج في [[dist/]].
- [[test -f dist/index.html]]: نفس [[[ -f ... ]]]، بيسأل «الملف موجود؟». لو البناء طلّع فولدر فاضي، [[test]] بيرجع 1 و [[set -e]] بيوقف قبل ما نرفع حاجة. جربت build بيعمل [[dist]] فاضي، و [[test]] رجّع [[1]].

---

## ٣. ارفع لفولدر جديد

~~~bash
ssh "$SERVER" "mkdir -p $SITE/releases/$REL"
rsync -az --chmod=D755,F644 dist/ "$SERVER:$SITE/releases/$REL/"
~~~

### [[ssh SERVER "command"]]

[[ssh]] بيدخل السيرفر، ولو كتبت بعده أمر بين علامات تنصيص، بينفّذه هناك ويرجع. والمتغيرات [[$SITE]] و [[$REL]] بتتفك **على جهازك** قبل ما الأمر يتبعت (علامات تنصيص مزدوجة)، فالسيرفر بيستلم [[mkdir -p /var/www/example.com/releases/20261007-141455]]. و [[mkdir -p]] بيعمل الفولدرات اللي في النص لو مش موجودة، ومبيزعّقش لو موجودة.

### [[rsync]]

بينسخ ملفات من جهاز لجهاز فوق ssh:

| الجزء | معناه |
|---|---|
| [[-a]] | archive: لف على الفولدرات كلها، وحافظ على الـ symlinks والتواريخ |
| [[-z]] | اضغط البيانات وهي رايحة (أسرع على نت بطيء) |
| [[--chmod=D755,F644]] | D = الفولدرات [[755]]، و F = الملفات [[644]] |
| [[dist/]] | الـ [[/]] في الآخر مهمة: انسخ **محتوى** dist، مش فولدر اسمه dist |
| [[SERVER:PATH]] | النقطتين معناها «المسار ده على الجهاز التاني» |

الأرقام [[755]] و [[644]]: كل رقم لصنف (صاحب الملف، الجروب، الباقي)، و ٤ = قراية، ٢ = كتابة، ١ = تنفيذ (وللفولدر يعني تدخله). يعني الفولدرات: صاحبها كله والباقي يقرا ويدخل. والملفات: صاحبها يقرا ويكتب والباقي يقرا. Nginx من «الباقي» فبيقرا عادي. على السيرفر بعد الرفع:

~~~text الناتج
drwxr-xr-x 3 deploy deploy 4096 Oct  7 14:14 .
-rw-r--r-- 1 deploy deploy    1 Oct  7 14:14 .well-known
drwxr-xr-x 2 deploy deploy 4096 Oct  7 14:14 assets
-rw-r--r-- 1 deploy deploy   40 Oct  7 14:14 index.html
~~~

[[drwxr-xr-x]] = 755 و [[-rw-r--r--]] = 644. ولاحظ إن الملف المخفي [[.well-known]] اتنقل كمان (عكس [[scp dist/*]]).

---

## ٤. حوّل السهم

~~~bash
ssh "$SERVER" "ln -sfn $SITE/releases/$REL $SITE/current"
~~~

[[ln]] بيعمل link، و [[ln -s TARGET NAME]] بيعمل symlink اسمه NAME بيشاور على TARGET:

| الحرف | معناه |
|---|---|
| [[-s]] | symbolic link (مش hard link) |
| [[-f]] | force: لو فيه حاجة بنفس الاسم، استبدلها |
| [[-n]] | لو [[current]] نفسه symlink لفولدر، اتعامل معاه كملف ومتدخلش جواه |

[[-n]] مش رفاهية. جربت من غيرها ([[ln -sf]] بس): [[current]] فضل بيشاور على النسخة القديمة، واتعمل link جديد **جوه** الفولدر القديم اسمه [[20261007-141505]]. يعني النشر «نجح» والموقع متغيّرش.

بعد النشر:

~~~text الناتج
$ ls -l /var/www/example.com
lrwxrwxrwx 1 deploy deploy   45 Oct  7 14:15 current -> /var/www/example.com/releases/20261007-141505
drwxrwxr-x 7 deploy deploy 4096 Oct  7 14:15 releases
~~~

أول حرف [[l]] يعني link، والسهم بيقول بيشاور على إيه. والتبديل ده لحظي: الطلب اللي جاي بعده على طول بيقرا من الفولدر الجديد، و Nginx مش محتاج reload لأنه بيفتح الملفات مع كل طلب.

---

## ٥. امسح النسخ القديمة

~~~bash
ssh "$SERVER" "ls -1dt $SITE/releases/*/ | tail -n +6 | xargs -r rm -rf"
~~~

من الشمال لليمين (ده كله بيتنفّذ على السيرفر):

1. [[ls -1dt releases/*/]]: [[-1]] اسم في كل سطر، و [[-d]] اعرض الفولدر نفسه مش اللي جواه، و [[-t]] رتّب بالوقت، الأحدث الأول. و [[*/]] الفولدرات بس.
2. [[tail -n +6]]: اطبع من السطر **السادس** لحد الآخر. يعني كل حاجة ما عدا أول ٥ (الأحدث).
3. [[xargs -r rm -rf]]: [[xargs]] بياخد السطور اللي جاياله ويحطها arguments لـ [[rm -rf]]. و [[-r]] لو مفيش سطور متشغّلش [[rm]] خالص.

نشرت ٧ مرات ورا بعض، وفضل ٥:

~~~text الناتج
$ ls -1 /var/www/example.com/releases
20261007-141455
20261007-141457
20261007-141500
20261007-141503
20261007-141505
~~~

---

## ٦. اتأكد إن الموقع بيرد

~~~bash
curl -fsS -o /dev/null -w '%{http_code} https://example.com/\n' https://example.com/
~~~

- [[-f]]: افشل لو الرد 400 أو أكتر، فـ [[set -e]] يخلّي السكربت كله يفشل.
- [[-sS]]: من غير progress، بس اطبع الأخطاء.
- [[-o /dev/null]]: ارمي الصفحة.
- [[-w '...']]: write-out: اطبع بعد ما تخلص. [[%{http_code}]] كود الرد، والباقي نص عادي.

في التجربة طلّع:

~~~text الناتج
200 http://srv/
~~~

---

## الرجوع لنسخة قديمة

نفس أمر الخطوة ٤ على فولدر أقدم:

~~~bash
ssh deploy@203.0.113.10 "ln -sfn /var/www/example.com/releases/20261007-141455 /var/www/example.com/current"
~~~

جربته، والصفحة رجعت للنسخة القديمة على طول:

~~~text الناتج
<h1>build 2026-10-07T14:14:55.775Z</h1>
~~~

---

## ملخص

| # | الخطوة | فين |
|---|---|---|
| ١ | [[npm ci]] و [[npm run build]] و [[test -f]] | جهازك |
| ٢ | [[mkdir -p releases/REL]] | السيرفر |
| ٣ | [[rsync]] الملفات بصلاحيات 755 و 644 | من جهازك للسيرفر |
| ٤ | [[ln -sfn]] يحوّل [[current]] | السيرفر |
| ٥ | امسح كل حاجة بعد آخر ٥ | السيرفر |
| ٦ | [[curl -f]] | جهازك |

على ويندوز: [[rsync]] مش موجود في Git Bash، فشغّل السكربت من WSL.

## الخلاصة

- النشر = فولدر جديد + تحويل symlink، فمفيش لحظة الموقع فيها نص قديم ونص جديد.
- [[-n]] في [[ln -sfn]] هي اللي بتخلّي التحويل يحصل فعلًا.
- [[dist/]] بالـ [[/]] في الآخر = المحتوى، والملفات المخفية بتتنقل.`,
          lines: [
            "أي فشل يوقف السكربت.",
            "السيرفر.",
            "فولدر الموقع.",
            "اسم النسخة: التاريخ والوقت.",
            "سطّب المكتبات بالظبط زي الـ lockfile.",
            "ابني.",
            "اتأكد إن البناء طلّع index.html.",
            "اعمل فولدر النسخة الجديدة على السيرفر.",
            "ارفع dist جواه بصلاحيات مظبوطة.",
            "حوّل current على النسخة الجديدة.",
            "امسح كل النسخ ما عدا آخر ٥.",
            "اتأكد إن الموقع بيرد، واطبع الكود."
          ],
          sol: R`بعد نشرين هتلاقي على السيرفر [[/var/www/example.com/releases/20260930-101500]] و [[.../20260930-103000]]، و [[ls -l /var/www/example.com]] بيوريك [[current -> /var/www/example.com/releases/20260930-103000]]. الـ curl في آخر السكربت بيطبع [[200 https://example.com/]].

الرجوع: [[ln -sfn /var/www/example.com/releases/20260930-101500 /var/www/example.com/current]] وبعدين refresh، الموقع القديم بيظهر على طول من غير reload لـ Nginx. جربت تبديل الـ symlink ده محليًا: [[cat current/index.html]] طلّع [[v2]] وبعد [[ln -sfn]] على الأولانية طلّع [[v1]]. الـ [[-n]] مهم، من غيره [[ln]] بيعمل لينك جوه الفولدر القديم بدل ما يبدّله.

لو Nginx رجّع [[404]] أو [[403]]، اتأكد إن [[root]] بيشاور على [[.../current]] (مش [[releases]])، وإن اليوزر بتاع Nginx يقدر يقرا ([[--chmod=D755,F644]]). والسكربت بيسيب آخر ٥ نسخ بس، فالرجوع لنسخة أقدم من كده مش هيبقى متاح.`
        },
        {
          cmd: "deploy.yml (SSH)",
          title: "كل push يدخل السيرفر ويحدّث لوحده",
          desc: "أبسط CD: كل push على main، GitHub Actions يدخل السيرفر بـ SSH ويعمل pull وبناء وتشغيل، ويتأكد من الـ health. هنا البناء على السيرفر نفسه، عكس درس «deploy عبر SSH» في تاب GitHub Actions اللي بيبني image في Actions ويعمل لها pull.",
          example: R`name: deploy
on:
  push:
    branches: [main]
concurrency:
  group: production
  cancel-in-progress: false
jobs:
  deploy:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: appleboy/ssh-action@v1.0.3
        with:
          host: $__{{ secrets.DEPLOY_HOST }}
          username: deploy
          key: $__{{ secrets.DEPLOY_SSH_KEY }}
          fingerprint: $__{{ secrets.DEPLOY_HOST_FINGERPRINT }}
          script: |
            set -e
            cd /opt/myapp
            git pull --ff-only origin main
            docker compose build
            docker compose up -d --wait --wait-timeout 120
            docker image prune -f
            curl -fsS http://127.0.0.1:3000/api/health`,
          try: R`على ريبو تجربة وسيرفر تجربة: اعمل مفتاح جديد [[ssh-keygen -t ed25519 -f deploy_key -N ""]]، العام في authorized_keys بتاع deploy، والخاص في secret. هات البصمة بـ [[ssh-keyscan -t ed25519 203.0.113.10 | ssh-keygen -lf -]] وحط الجزء اللي بيبدأ بـ SHA256 في secret تاني. وبعدين ادفع commit وتابع الـ run.`,
          flag: "script",
          deep: {
            why: "بدل ما تدخل السيرفر بإيدك بعد كل push، الـ workflow بيعمل نفس الأوامر. وأي فشل بيبان أحمر في GitHub بدل ما تكتشفه من عميل.",
            how: R`[[concurrency: group: production]] بيخلي نشر واحد بس يشتغل في نفس الوقت. لو عملت push مرتين ورا بعض، التاني بيستنى الأول يخلص بدل ما الاتنين يعملوا pull وbuild على نفس الفولدر. و [[cancel-in-progress: false]] عشان متقطعش نشر في النص.

[[appleboy/ssh-action]] بيدخل السيرفر بالمفتاح اللي في secret، وينفّذ الـ script هناك. و [[fingerprint]] هو بصمة مفتاح السيرفر: من غيرها الـ action بيصدّق أي سيرفر يرد على الـ IP ده (ممكن حد يتنصّت ويعمل نفسه سيرفرك).

[[set -e]] أول سطر في الـ script عشان أي أمر يفشل يوقف ويخلّي الـ job أحمر. و [[--ff-only]] عشان لو السيرفر عليه commit محلي يرفض. و [[--wait]] بيستنى الـ healthcheck، والـ curl في الآخر تأكيد من برّه compose.

[[timeout-minutes]] عشان لو حاجة علّقت (build واقف مثلًا) الـ job يقف بعد ربع ساعة بدل ٦ ساعات.

والسيرفر محتاج يقدر يعمل pull من الريبو: deploy key (مفتاح قراية بس) مضاف في إعدادات الريبو، مش مفتاحك الشخصي.

وخد بالك: البناء على سيرفر الإنتاج بياكل CPU ورام من الموقع وقت البناء. لو السيرفر صغير، الأحسن تبني الـ image في Actions وتعمل push لـ registry والسيرفر يعمل pull بس.`,
            when: "مشروع صغير أو متوسط على VPS واحد، وعايز النشر يبقى تلقائي من غير registry.",
            mistakes: "في مشروع حقيقي كان الـ workflow مربوط بفرع جانبي مش main، فكانوا بيعملوا merge ومحدش فاهم ليه مفيش نشر. ومكانش فيه concurrency فـ pushين ورا بعض بيعملوا build في نفس الوقت على نفس الفولدر، ومفيش fingerprint، ومفيش أي healthcheck بعد [[up -d]]: الـ job بيبقى أخضر حتى لو التطبيق بيقع بعد ثانيتين."
          },
          teach: R`## الفكرة: GitHub بيعمل اللي كنت بتعمله بإيدك

الملف ده workflow في GitHub Actions (بيتحط في [[.github/workflows/deploy.yml]]). كل ما تعمل push على [[main]]، GitHub بيشغّل ماكينة Ubuntu، والماكينة دي بتدخل سيرفرك بـ SSH وتنفّذ ٧ أوامر: pull، build، up، تنضيف، وفحص.

اللي اتجرّب: الملف عدّى [[actionlint]] (أداة بتفحص workflows) من غير أخطاء. والـ script نفسه اتشغّل فعلًا فوق SSH: container أوبونتو 24.04 عامل نفسه الـ runner، دخل بمفتاح ed25519 على container تاني عامل نفسه السيرفر (فيه Docker و compose ومشروع [[/opt/myapp]])، على شبكة Docker خاصة. الـ workflow الحقيقي على GitHub ما اتشغّلش هنا، فشكل صفحة الـ run من الـ docs.

---

## ١. الاسم والـ trigger

~~~yaml
name: deploy
on:
  push:
    branches: [main]
~~~

- [[name]]: الاسم اللي بيظهر في تاب Actions.
- [[on]]: إمتى يشتغل. [[push]] على فرع من [[branches]] بس، و [[[main]]] قايمة YAML فيها عنصر واحد. push على أي فرع تاني مش هيعمل نشر.

YAML بيعتمد على المسافات: كل مستوى جوه اللي قبله بمسافتين، ومينفعش Tab.

---

## ٢. [[concurrency]]: نشر واحد في المرة

~~~yaml
concurrency:
  group: production
  cancel-in-progress: false
~~~

- [[group: production]]: أي run في نفس المجموعة بيستنى اللي قبله. لو عملت pushين ورا بعض، التاني بيبقى Pending لحد ما الأول يخلص.
- [[cancel-in-progress: false]]: متلغيش اللي شغال. لو [[true]] كان هيوقف النشر الأول في النص (ممكن وهو بيعمل [[up]]).

وخد بالك: GitHub بيحتفظ بـ run واحد بس مستني في المجموعة. لو عملت ٣ pushات، التالت بيلغي التاني اللي كان مستني، وده تمام لأن التالت فيه كل الجديد.

---

## ٣. الـ job

~~~yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
~~~

| السطر | معناه |
|---|---|
| [[jobs:]] | الشغلانات. هنا واحدة اسمها [[deploy]] |
| [[runs-on: ubuntu-latest]] | ماكينة Ubuntu جديدة من GitHub لكل run، وبتتمسح بعده |
| [[timeout-minutes: 15]] | لو عدّت ربع ساعة يوقف. الافتراضي ٣٦٠ دقيقة (٦ ساعات) |
| [[steps:]] | الخطوات بالترتيب |

---

## ٤. الخطوة: [[appleboy/ssh-action]]

~~~yaml
      - uses: appleboy/ssh-action@v1.0.3
        with:
          host: $__{{ secrets.DEPLOY_HOST }}
          username: deploy
          key: $__{{ secrets.DEPLOY_SSH_KEY }}
          fingerprint: $__{{ secrets.DEPLOY_HOST_FINGERPRINT }}
~~~

- [[- uses:]]: الـ [[-]] بيبدأ عنصر في قايمة الخطوات، و [[uses]] معناها «استخدم action جاهز». [[appleboy/ssh-action]] ريبو على GitHub، و [[@v1.0.3]] نسخة ثابتة منه عشان تحديث فيه ميكسرش نشرك فجأة.
- [[with:]]: المدخلات بتاعة الـ action.
- [[$__{{ secrets.X }}]]: قيمة من Settings ← Secrets في الريبو. مش بتظهر في الكود، و GitHub بيخبّيها بـ [[***]] لو اتطبعت في اللوج.

| المدخل | فيه إيه |
|---|---|
| [[host]] | IP السيرفر أو الدومين |
| [[username]] | اليوزر اللي هيدخل بيه ([[deploy]] مش root) |
| [[key]] | المفتاح الخاص (private key) كله |
| [[fingerprint]] | بصمة مفتاح **السيرفر**، عشان الـ action يتأكد إنه بيكلّم سيرفرك انت |

### المفتاح والبصمة

مفتاح جديد مخصوص للنشر:

~~~bash
ssh-keygen -t ed25519 -f deploy_key -N ""
~~~

[[-t ed25519]] نوع المفتاح، و [[-f deploy_key]] اسم الملف، و [[-N ""]] من غير passphrase (الـ action مش هيعرف يكتبها). بيعمل ملفين:

~~~text الناتج
Your identification has been saved in deploy_key
Your public key has been saved in deploy_key.pub
The key fingerprint is:
SHA256:78aFgHfgPGJGEb36fJMHMTrwHd4otnfPRZQ2IT7qrd4 root@38467fd0c129
~~~

[[deploy_key]] (الخاص، أول سطر فيه [[-----BEGIN OPENSSH PRIVATE KEY-----]]) يروح كله في secret [[DEPLOY_SSH_KEY]]. و [[deploy_key.pub]] سطر واحد بيبدأ بـ [[ssh-ed25519 AAAA...]] يتضاف في [[/home/deploy/.ssh/authorized_keys]] على السيرفر.

وبصمة السيرفر:

~~~bash
ssh-keyscan -t ed25519 203.0.113.10 | ssh-keygen -lf -
~~~

[[ssh-keyscan]] بيسأل السيرفر عن مفتاحه العام، و [[ssh-keygen -lf -]] بيحسب بصمته ([[-l]] = list fingerprint، و [[-f -]] اقرا من الـ pipe). على سيرفر التجربة:

~~~text الناتج
256 SHA256:N/8cvwxFJ0gwoTQEM+K1tJLf1njLA/Fk3SFCp1TqFHs teach-real02-lab (ED25519)
~~~

[[256]] حجم المفتاح بالـ bit، والجزء من [[SHA256:]] لحد قبل المسافة هو اللي يروح في [[DEPLOY_HOST_FINGERPRINT]]. شغّل الأمر ده وانت متأكد إنك بتكلّم سيرفرك (من جوه السيرفر نفسه أحسن).

ليه البصمة؟ جربت ملف known_hosts فيه مفتاح غلط للسيرفر، و ssh رفض يكمّل:

~~~text الناتج
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
~~~

ده بالظبط اللي [[fingerprint]] بيعمله في الـ action: لو حد واقف في النص بيعمل نفسه سيرفرك، المفتاح مش هيطابق والـ job يقف قبل ما يبعت أي حاجة.

---

## ٥. الـ script اللي بيتنفّذ على السيرفر

~~~yaml
          script: |
            set -e
            cd /opt/myapp
            git pull --ff-only origin main
            docker compose build
            docker compose up -d --wait --wait-timeout 120
            docker image prune -f
            curl -fsS http://127.0.0.1:3000/api/health
~~~

[[script: |]]: الـ [[|]] في YAML معناها «النص اللي تحت متعدد السطور، وسيب السطور زي ما هي». الـ action بيبعته للسيرفر ويشغّله.

| السطر | ليه |
|---|---|
| [[set -e]] | أول أمر يفشل يوقف الباقي، والـ job يبقى أحمر |
| [[cd /opt/myapp]] | فولدر المشروع على السيرفر |
| [[git pull --ff-only origin main]] | هات الجديد، وارفض لو السيرفر عليه commit محلي |
| [[docker compose build]] | ابني والموقع القديم شغال |
| [[up -d --wait --wait-timeout 120]] | بدّل واستنى الـ healthcheck لحد دقيقتين |
| [[docker image prune -f]] | امسح الـ images القديمة اللي من غير اسم |
| [[curl -fsS .../api/health]] | تأكيد أخير من برّه compose. [[-f]] يفشل لو الرد 400 أو أكتر |

### التشغيل الحقيقي فوق SSH

نفس الـ script اتبعت بـ [[ssh -i deploy_key deploy@SERVER bash -s < body.sh]] (اللي الـ action بيعمله تقريبًا). النجاح:

~~~text الناتج
Updating ed13e02..d7a2a20
Fast-forward
 compose.yml | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
 app  Built
 Container myapp-app-1  Recreate
 Container myapp-app-1  Started
 Container myapp-app-1  Waiting
 Container myapp-app-1  Healthy
Deleted Images:
deleted: sha256:95b1f1527ad5...
Total reclaimed space: 6B
ok
~~~

[[ok]] في الآخر هو رد [[/api/health]]، والـ exit [[0]] (الـ job أخضر).

ومرة قبلها الـ origin كان عليه commit بايظ (الـ healthcheck بيطلب مسار مش موجود):

~~~text الناتج
 Container myapp-app-1  Waiting
container myapp-app-1 is unhealthy
~~~

exit [[1]]، و [[set -e]] منع [[prune]] و [[curl]] يتنفّذوا. على GitHub ده job أحمر. وخد بالك: هنا مفيش rollback، الـ container البايظ فاضل. لو عايز رجوع أوتوماتيك، خلّي الـ script يشغّل [[./update.sh]] (الدرس اللي قبل) بدل الأوامر دي.

---

## ملخص

| الجزء | بيعمل إيه |
|---|---|
| [[on: push: branches: [main]]] | يشتغل مع كل push على main |
| [[concurrency]] | نشر واحد في المرة، ومن غير ما يقطع اللي شغال |
| [[timeout-minutes]] | ميعلّقش ٦ ساعات |
| [[ssh-action]] + [[fingerprint]] | يدخل السيرفر الصح بس، بمفتاح من secret |
| [[script]] | pull ← build ← up --wait ← prune ← curl |

## الخلاصة

- المفتاح الخاص في secret بس، والعام في [[authorized_keys]]، والبصمة بتحميك من سيرفر مزيّف.
- [[set -e]] أول سطر في الـ script، وإلا أول أمر فاشل مش هيخلّي الـ job أحمر.
- البناء على السيرفر سهل بس بياكل من CPU و RAM الموقع. لو السيرفر صغير، ابني في Actions وادفع لـ registry.`,
          lines: [
            "اسم الـ workflow.",
            "بيشتغل على...",
            "...push...",
            "...على main بس.",
            "نشر واحد بس في نفس الوقت:",
            "اسم المجموعة.",
            "متلغيش نشر شغال؛ الجديد يستنى.",
            "الـ jobs.",
            "job النشر.",
            "ماكينة Ubuntu من GitHub.",
            "لو عدّى ربع ساعة يقف.",
            "الخطوات.",
            "action بيدخل السيرفر بـ SSH وينفّذ أوامر.",
            "إعداداته:",
            "عنوان السيرفر من secret.",
            "اليوزر.",
            "المفتاح الخاص من secret.",
            "بصمة السيرفر عشان يتأكد إنه بيكلّم السيرفر الصح.",
            "الأوامر اللي هتتنفّذ على السيرفر:",
            "أي فشل يوقف.",
            "فولدر المشروع.",
            "اسحب الجديد، ولو محتاج merge ارفض.",
            "ابني.",
            "بدّل واستنى الـ healthcheck.",
            "نضّف الـ images القديمة.",
            "تأكيد أخير إن التطبيق بيرد."
          ],
          sol: R`[[ssh-keygen -t ed25519 -f deploy_key -N ""]] بيعمل ملفين: [[deploy_key]] (الخاص، بيبدأ بـ [[-----BEGIN OPENSSH PRIVATE KEY-----]]، كله بيروح في secret [[DEPLOY_SSH_KEY]]) و [[deploy_key.pub]] (سطر واحد بيتضاف لـ [[/home/deploy/.ssh/authorized_keys]]). [[ssh-keygen -lf]] بيطبع حاجة زي [[256 SHA256:2lvtGXRU... (ED25519)]]. الجزء اللي بيبدأ بـ [[SHA256:]] هو اللي في [[DEPLOY_HOST_FINGERPRINT]].

بعد الـ push، في تاب Actions الـ run بيطلّع لوج السيرفر: [[git pull]] ثم بناء compose ثم [[curl]] بيرجّع رد الـ health. لو كله عدّى علامة خضرا. وجرّب push تاني بسرعة: [[concurrency]] بيخلّي التاني يستنى الأول بدل ما يشتغلوا مع بعض.

الأعطال الشائعة: [[ssh: handshake failed: ssh: unable to authenticate]] (المفتاح العام مش في authorized_keys، أو الخاص اتنسخ ناقص سطر)، و [[ssh: host key fingerprint mismatch]] (البصمة غلط، وده بالظبط اللي بتحميك منه). ومتحطش المفتاح الخاص في الريبو أبدًا. (ما شغّلتش workflow حقيقي، بس جربت ssh-keygen والبصمة.)`
        },
        {
          cmd: "deploy-shared.sh",
          title: "نشر على استضافة مشتركة بـ git pull وفحص سريع",
          desc: "على الاستضافة المشتركة مفيش Docker ولا CI، بس غالبًا فيه SSH و git. فالنشر: السيرفر عليه clone للريبو وبيعمل pull، وبعدين [[php -l]] يتأكد إن مفيش syntax error، و curl يتأكد إن كل صفحة مهمة بترجع الكود الصح، بما فيها إن صفحة مش موجودة بترجع 404 فعلًا.",
          example: R`#!/usr/bin/env bash
# ~/.ssh/config فيه Host shared بالـ HostName و Port و User و IdentityFile
set -euo pipefail
SITE=https://example.com
DIR=domains/example.com/public_html

ssh shared "cd $DIR && git pull -q --ff-only origin main && git log --oneline -1"
ssh shared "cd $DIR && for f in index.php login.php contact.php; do php -l \$f || exit 1; done"

fail=0
for u in / /login /contact /no-such-page; do
  code=$(curl -s -o /dev/null --max-time 10 -w '%{http_code}' "$SITE$u" || true)
  want=200; [ "$u" = /no-such-page ] && want=404
  echo "$u -> $code (want $want)"
  [ "$code" = "$want" ] || fail=1
done
exit $fail`,
          try: "لو معاك استضافة فيها SSH: اعمل clone للريبو مكان public_html (بعد باك أب)، وظبط [[Host shared]] في [[~/.ssh/config]]، وشغّل السكربت. بعدين غيّر صفحة موجودة بحيث ترجع 500 وشوف السكربت يفشل.",
          flag: "script",
          deep: {
            why: "على استضافة مشتركة الناس غالبًا بترفع بـ FTP وبتنسى ملفات. git pull بيضمن إن السيرفر نسخة من الريبو بالظبط، والفحص بيقولك في ثواني لو حاجة باظت قبل ما عميل يقولك.",
            how: R`[[ssh shared]] بيستخدم الإعدادات اللي في [[~/.ssh/config]]: العنوان والبورت (الاستضافات المشتركة غالبًا على بورت غير 22) واليوزر والمفتاح، فالسكربت ميبقاش فيه أي بيانات دخول.

الأوامر بين علامات التنصيص المزدوجة بتتفك على جهازك الأول: [[$DIR]] بتتحط قيمتها قبل ما تتبعت. أما [[\$f]] فالـ backslash بيمنع جهازك يفكها، فتوصل للسيرفر [[$f]] ويفكها هو جوه اللوب.

[[php -l]] بيفحص syntax الملف من غير ما يشغّله. و [[|| exit 1]] بيخلي أول ملف فيه غلطة يوقف الـ ssh بفشل، و [[set -e]] عندك يوقف السكربت.

[[curl -w '%{http_code}']] بيطبع كود الرد بس، و [[-o /dev/null]] بيرمي الصفحة نفسها، و [[--max-time 10]] عشان سيرفر بطيء ميعلّقش السكربت. ولو curl فشل خالص بيطبع 000، و [[|| true]] بيمنع [[set -e]] يوقف قبل ما نطبع النتيجة.

وفحص صفحة مش موجودة مهم: مواقع كتير بترجع 200 لكل حاجة (soft 404)، وده بيضر في جوجل.`,
            when: "مواقع PHP أو static على استضافة مشتركة فيها SSH و git.",
            mistakes: "في مشروع حقيقي كان الاتصال بالسيرفر عن طريق سكربت Python وسيط بالباسورد بدل ssh مباشر بمفتاح. والملفات اللي مش في git (ملف الإعدادات، والفيديوهات، وصور العملاء المرفوعة) كانت محتاجة تتظبط على السيرفر بإيدك، وقاعدة البيانات ليها باك أب منفصل من لوحة الاستضافة، فـ git pull لوحده مش «نسخة كاملة». و curl كان من غير timeout، فمرة علّق على سيرفر بطيء."
          },
          teach: R`## الفكرة: نشر بأمرين ssh، وبعدين اختبار من برّه

السكربت ده بيشتغل على جهازك، وبيعمل ٣ حاجات: يقول للسيرفر يعمل [[git pull]]، يقوله يفحص ملفات PHP، وبعدين يطلب كل صفحة مهمة بـ [[curl]] ويقارن كود الرد بالمتوقع. لو أي حاجة مش زي المتوقع يخرج بـ 1.

جربته كامل: «الاستضافة» container أوبونتو 24.04 فيه [[sshd]] على بورت 2222 ويوزر [[u123]] (زي الاستضافات المشتركة)، والموقع ٣ ملفات PHP شغالين بـ [[php -S]]، و «جهازك» container تاني على نفس شبكة Docker الخاصة. غيّرت [[SITE]] بس لـ [[http://srv:8080]].

---

## ١. [[~/.ssh/config]]: بيانات الدخول برّه السكربت

أول سطر في السكربت تعليق بيقول إن [[ssh shared]] معتمد على الملف ده:

~~~text ~/.ssh/config
Host shared
  HostName srv
  Port 2222
  User u123
  IdentityFile ~/.ssh/shared_key
~~~

| السطر | معناه |
|---|---|
| [[Host shared]] | اسم مختصر انت اخترته. [[ssh shared]] هيستخدم الإعدادات اللي تحته |
| [[HostName]] | العنوان الحقيقي (دومين أو IP) |
| [[Port]] | البورت. الاستضافات المشتركة غالبًا مش على 22 |
| [[User]] | اسم اليوزر بتاعك عند الاستضافة |
| [[IdentityFile]] | المفتاح الخاص اللي هتدخل بيه |

كده [[ssh shared]] = [[ssh -p 2222 -i ~/.ssh/shared_key u123@srv]]، والسكربت نفسه مفيهوش أي بيانات دخول، فتقدر تحطه في git.

---

## ٢. المتغيرات

~~~bash
set -euo pipefail
SITE=https://example.com
DIR=domains/example.com/public_html
~~~

- [[set -euo pipefail]]: أي أمر يفشل يوقف، ومتغير مش متعرّف خطأ.
- [[SITE]]: الرابط اللي هنختبره.
- [[DIR]]: فولدر الموقع على السيرفر. من غير [[/]] في الأول، يعني نسبة للـ home بتاعك هناك، لأن ssh بيبدأ في الـ home.

---

## ٣. [[git pull]] على السيرفر

~~~bash
ssh shared "cd $DIR && git pull -q --ff-only origin main && git log --oneline -1"
~~~

[[ssh HOST "commands"]] بينفّذ الأوامر على السيرفر ويرجّع الناتج والـ exit code. و [[&&]] بين الأوامر: كل واحد بيتنفّذ بس لو اللي قبله نجح.

- [[git pull -q --ff-only origin main]]: هات الجديد بهدوء ([[-q]])، وارفض لو محتاج merge.
- [[git log --oneline -1]]: اطبع آخر commit في سطر واحد، عشان تشوف بعينك السيرفر بقى على أنهي نسخة:

~~~text الناتج
74617db break contact
~~~

---

## ٤. فحص الـ syntax على السيرفر

~~~bash
ssh shared "cd $DIR && for f in index.php login.php contact.php; do php -l \$f || exit 1; done"
~~~

### مين بيفك المتغيرات؟

الكلام جوه [[" "]] بيعدّي على bash بتاع **جهازك** الأول:

- [[$DIR]]: جهازك بيحط قيمتها، فالسيرفر بيستلم [[cd domains/example.com/public_html]].
- [[\$f]]: الـ [[\]] بتقول لجهازك «متفكّهاش»، فالسيرفر بيستلم [[$f]] زي ما هي، وده متغير اللوب اللي هيتعرّف هناك. من غير الـ [[\]] جهازك كان هيحاول يفكها هو، ومع [[set -u]] بيقف بـ [[f: unbound variable]] (جربتها) لأن [[f]] مش متعرّف عندك.

### اللوب

[[for f in a b c; do ...; done]]: كرر الأوامر مرة لكل اسم، و [[f]] بياخد الاسم كل مرة.

[[php -l FILE]]: l = lint. بيفحص الـ syntax من غير ما يشغّل الكود. و [[|| exit 1]]: لو ملف فيه غلطة، اخرج من الـ shell على السيرفر بـ 1، فـ [[ssh]] يرجع 1، و [[set -e]] على جهازك يوقف السكربت.

كله تمام:

~~~text الناتج
No syntax errors detected in index.php
No syntax errors detected in login.php
No syntax errors detected in contact.php
~~~

وعملت commit فيه سطر ناقصه [[;]] في [[login.php]]:

~~~text الناتج
No syntax errors detected in index.php
PHP Parse error:  syntax error, unexpected variable "$y" in login.php on line 3
Errors parsing login.php
~~~

السكربت وقف هنا بـ exit [[1]]، و [[contact.php]] ماتفحصش أصلًا. ولاحظ إن الغلطة في السطر ٢ (ناقص [[;]]) بس PHP بيقول السطر ٣، لأنه ماعرفش إن الجملة خلصت غير لما لقى [[$y]].

---

## ٥. اختبار الصفحات من برّه

~~~bash
fail=0
for u in / /login /contact /no-such-page; do
  code=$(curl -s -o /dev/null --max-time 10 -w '%{http_code}' "$SITE$u" || true)
  want=200; [ "$u" = /no-such-page ] && want=404
  echo "$u -> $code (want $want)"
  [ "$code" = "$want" ] || fail=1
done
exit $fail
~~~

### [[fail=0]]

عدّاد: صفر يعني لسه مفيش مشكلة. مش بنعمل [[exit]] أول ما صفحة تفشل، عشان نشوف حالة **كل** الصفحات.

### سطر الـ curl، من جوه لبرة

| الجزء | معناه |
|---|---|
| [["$SITE$u"]] | الرابط كامل: [[https://example.com/login]] |
| [[-s]] | من غير progress |
| [[-o /dev/null]] | ارمي محتوى الصفحة |
| [[--max-time 10]] | لو مخلصش في ١٠ ثواني اقطع |
| [[-w '%{http_code}']] | اطبع كود الرد بس (200 أو 404 أو 500) |
| [[|| true]] | لو curl نفسه فشل (السيرفر مش بيرد)، متخلّيش [[set -e]] يوقف |
| [[code=$(...)]] | خزّن الناتج في [[code]] |

لو السيرفر مش بيرد خالص، [[%{http_code}]] بيطبع [[000]].

### المتوقع

[[want=200]] لكل الصفحات، و [[[ "$u" = /no-such-page ] && want=404]]: لو دي الصفحة المش موجودة، المتوقع 404. ([[=]] جوه [[[ ]]] مقارنة نصوص.)

### المقارنة

[[[ "$code" = "$want" ] || fail=1]]: لو مختلفين، علّم إن فيه فشل. وفي الآخر [[exit $fail]]: 0 لو كله تمام، 1 لو فيه حاجة.

كله تمام:

~~~text الناتج
/ -> 200 (want 200)
/login -> 200 (want 200)
/contact -> 200 (want 200)
/no-such-page -> 404 (want 404)
~~~

exit [[0]]. وبعد commit بيخلّي [[contact.php]] يرجّع 500:

~~~text الناتج
/ -> 200 (want 200)
/login -> 200 (want 200)
/contact -> 500 (want 200)
/no-such-page -> 404 (want 404)
~~~

exit [[1]]. الـ syntax سليم ([[php -l]] عدّاه) بس الصفحة بايظة وقت التشغيل، وده اللي بيمسكه الـ curl.

### ليه نختبر صفحة مش موجودة؟

مواقع كتير بترجّع الصفحة الرئيسية بـ 200 لأي رابط غلط (soft 404)، وجوجل بيعتبرها صفحات مكررة. السطر ده بيتأكد إن الغلط بيرجع 404 فعلًا. (مثال: [[php -S]] من غير router بيعمل كده، أي مسار مش موجود بيرجع [[index.php]].)

---

## الرجوع لو الفحص فشل

الـ pull حصل قبل الفحص، فالموقع البايظ live دلوقتي. ارجع commit:

~~~bash
ssh shared "cd domains/example.com/public_html && git reset --hard HEAD~1"
~~~

[[HEAD~1]] = الـ commit اللي قبل الحالي (و [[HEAD~2]] اللي قبله بإتنين). في التجربة كان فيه ٢ commits بايظين فرجعت بـ [[HEAD~2]]:

~~~text الناتج
HEAD is now at 1a704f7 init
~~~

---

## ملخص

| # | الخطوة | فين | لو فشلت |
|---|---|---|---|
| ١ | [[git pull --ff-only]] | السيرفر | يقف |
| ٢ | [[php -l]] لكل ملف | السيرفر | يقف عند أول ملف بايظ |
| ٣ | [[curl]] لكل صفحة | جهازك | يكمّل ويطبع الكل، وفي الآخر exit 1 |

## الخلاصة

- [[~/.ssh/config]] بيشيل بيانات الدخول من السكربت.
- جوه [["..."]] اللي رايح لـ ssh: [[$X]] بتتفك عندك، و [[\$X]] بتتفك على السيرفر.
- [[php -l]] بيمسك أخطاء الكتابة، و curl بيمسك أخطاء التشغيل. محتاج الاتنين.`,
          lines: [
            "أي فشل يوقف السكربت.",
            "رابط الموقع.",
            "فولدر الموقع على السيرفر (نسبة للـ home).",
            "على السيرفر: اسحب الجديد واطبع آخر commit.",
            "على السيرفر: افحص syntax كل ملف مهم، وأول غلطة توقف.",
            "عدّاد الفشل.",
            "لف على الصفحات المهمة وصفحة مش موجودة.",
            "كود الرد بس، بحد أقصى ١٠ ثواني.",
            "المتوقع 200، إلا الصفحة المش موجودة متوقع 404.",
            "اطبع النتيجة.",
            "لو مش زي المتوقع علّم إنه فشل.",
            "نهاية اللوب.",
            "اخرج بـ 0 لو كله تمام، و 1 لو فيه حاجة غلط."
          ],
          sol: R`لو كله تمام، السكربت بيطبع آخر commit ([[a1b2c3d fix contact form]])، وبعده [[No syntax errors detected in index.php]] لكل ملف، وبعدين:

[[/ -> 200 (want 200)]]
[[/login -> 200 (want 200)]]
[[/contact -> 200 (want 200)]]
[[/no-such-page -> 404 (want 404)]] و exit [[0]].

لو بوّظت صفحة بحيث ترجّع 500، السطر بتاعها هيبقى [[/contact -> 500 (want 200)]] والـ exit [[1]]. ولو الغلطة syntax، [[php -l]] بيمسكها قبل الـ curl، جربته على ملف ناقصه [[;]] وطلّع [[PHP Parse error: syntax error, unexpected variable "$x"]] و [[Errors parsing bad.php]] بـ exit 255، فالسكربت بيقف هنا.

خد بالك إن [[git pull]] بيحصل الأول، فلو الفحص فشل الموقع بايظ فعلًا دلوقتي، ارجع بـ [[ssh shared "cd DIR && git reset --hard HEAD~1"]]. ولو [[/no-such-page]] رجّع 200، الاستضافة بتحوّل أي حاجة للصفحة الرئيسية، وده بيضر الـ SEO.`
        }
      ]
    },
    {
      t: "SSL و Nginx",
      l: 2,
      n: "أول شهادة وتجديدها صح، و nginx.conf للإنتاج، وتعديل config مشترك بأمان، وباسورد لكل موظف",
      items: [
        {
          cmd: "init-ssl.sh",
          title: "أول شهادة SSL لـ Nginx جوه Docker",
          desc: R`مشكلة البيضة والفرخة: Nginx مش هيقوم بإعدادات بتشاور على شهادة لسه مش موجودة، و certbot محتاج Nginx شغال عشان Let's Encrypt تتأكد إن الدومين بتاعك.

الحل بمرحلتين: تتأكد إن DNS بيشاور على السيرفر، تشغّل Nginx بإعداد HTTP بس فيه مسار التحدي، تاخد الشهادة بـ webroot، وبعدين ترجّع الإعداد الكامل.`,
          example: R`#!/usr/bin/env bash
# أول مرة جرّب:  DRY=1 ./scripts/init-ssl.sh    ولو عدّى شغّله من غير DRY
set -euo pipefail
cd "$(dirname "$0")/.."
DOMAIN=example.com
EMAIL=you@example.com

IP=$(curl -4 -s --max-time 10 https://api.ipify.org) || { echo "can't get server IP" >&2; exit 1; }
for d in "$DOMAIN" "www.$DOMAIN"; do
  got=$(getent ahostsv4 "$d" | awk '{print $1; exit}' || true)
  [ "$got" = "$IP" ] || { echo "$d -> $__{got:-nothing}, server is $IP: fix DNS first" >&2; exit 1; }
done

mkdir -p certbot/www certbot/conf
cp nginx/nginx.conf nginx/nginx.conf.full
trap 'cp nginx/nginx.conf.full nginx/nginx.conf' EXIT
cp nginx/nginx-http-only.conf nginx/nginx.conf
docker compose up -d nginx && docker compose restart nginx

docker compose run --rm --entrypoint certbot certbot certonly $__{DRY:+--dry-run} \
  --webroot -w /var/www/certbot --email "$EMAIL" --agree-tos --no-eff-email \
  --keep-until-expiring -d "$DOMAIN" -d "www.$DOMAIN"

docker compose run --rm --entrypoint test certbot -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" \
  || { echo "no certificate yet (dry run?), nginx stays on HTTP" >&2; exit 1; }
cp nginx/nginx.conf.full nginx/nginx.conf
docker compose restart nginx
curl -fsSI "https://$DOMAIN" | head -1`,
          try: "على سيرفر تجربة ودومين تجربة (أو subdomain): شغّله بـ [[DRY=1]] الأول. لو عدّى، شغّله من غير DRY وافتح الموقع بـ https. وجرّب كمان تشغّله على دومين مش بيشاور على السيرفر: لازم يقف عند فحص DNS من غير ما يكلّم Let's Encrypt.",
          flag: "script",
          deep: {
            why: "أول شهادة هي أكتر خطوة الناس بتقف فيها في نشر Docker. ولو جرّبت غلط كذا مرة، Let's Encrypt بتوقفك (حد ٥ محاولات فاشلة في الساعة، و ٥ شهادات مكررة في الأسبوع). الترتيب ده بيخلي أول محاولة حقيقية تنجح.",
            how: R`فحص DNS الأول: [[getent ahostsv4]] بيجيب IPv4 اللي الدومين بيشاور عليه، ولو مش IP السيرفر نقف فورًا بدل ما نصرف محاولة على Let's Encrypt.

[[nginx-http-only.conf]] ملف صغير فيه server على بورت 80 بس، جواه [[location /.well-known/acme-challenge/ { root /var/www/certbot; }]] وأي حاجة تانية ترجع رسالة بسيطة. مفيهوش أي ssl_certificate، فـ Nginx يقوم.

webroot: certbot بيكتب ملف تحدي في [[certbot/www]]، و Nginx بيقدّمه من نفس الفولدر (متركّب في الاتنين)، و Let's Encrypt بتطلبه من برّه. لو وصلها يبقى الدومين بتاعك. ومحتاجش توقّف Nginx، عكس [[--standalone]].

[[--entrypoint certbot]] مهمة: لو خدمة certbot في compose ليها entrypoint بلوب التجديد (زي درس compose)، [[run]] من غيرها هيشغّل اللوب مش certonly.

[[$__{DRY:+--dry-run}]] معناها: لو المتغير DRY موجود حط [[--dry-run]]، وإلا ولا حاجة. الـ dry-run بيكلّم سيرفر التجربة بتاع Let's Encrypt (حدوده أوسع بكتير) ومش بيحفظ شهادة.

[[--keep-until-expiring]] لو الشهادة موجودة وصالحة ميطلبش جديدة، فتشغيل السكربت مرتين مش بيصرف من الحد.

الـ [[trap]] بيرجّع nginx.conf الكامل لما السكربت يخلص بأي شكل، عشان الملف اللي في git ميفضلش متغيّر. و [[cp]] مش [[mv]] عشان الملف يفضل نفس الـ inode، والـ bind mount جوه الـ container يشوف التغيير.

فحص الشهادة بيتعمل جوه container (بـ [[test -f]]) لأن فولدر live بتاع certbot ملك root، ويوزر deploy مش هيقدر يشوفه من برّه.`,
            when: "مرة واحدة لكل دومين جديد، بعد ما DNS يتظبط. بعد كده التجديد بيبقى لوحده (الدرس اللي بعده).",
            mistakes: R`في مشروع حقيقي كان السكربت من غير [[set -e]]، وبيشغّل Nginx بالإعداد الكامل اللي بيشاور على شهادة لسه مش موجودة فـ Nginx يقع، وبيوقف الخدمة بـ [[docker compose down nginx]] (والصح stop)، والمتغيرات من غير علامات تنصيص، ومن غير أي تجربة staging أو dry-run الأول.

وفي مشروع تاني كان بيستخدم [[--register-unsafely-without-email]]. الإيميل مهم لحسابك عند Let's Encrypt، بس خد بالك إنهم بطّلوا يبعتوا إيميلات «شهادتك قربت تخلص» من 2025، فالمراقبة لازم تبقى عندك.

وفي مشروع تالت كانت الشهادة بتطلع بـ [[--standalone]] (certbot يسمع على بورت 80 بنفسه)، فلازم توقف Nginx وقتها، والتجديد بعدين بيورث نفس الطريقة، وده اللي وقّع التجديد (الدرس اللي بعده).`
          },
          teach: R`## الفكرة: ٤ مراحل، وكل مرحلة بتمنع غلطة

1. اتأكد إن الدومين بيشاور على السيرفر ده (من غيره Let's Encrypt هترفض وتحسبها محاولة فاشلة).
2. شغّل Nginx بإعداد HTTP بس، مفيهوش شهادة، فيقوم.
3. خلي certbot ياخد الشهادة بطريقة webroot و Nginx شغال.
4. رجّع الإعداد الكامل بالـ SSL.

اللي اتجرّب: فحص DNS والـ IP في أوبونتو 24.04 جوه Docker، وإعداد HTTP-only ومسار التحدي في [[nginx:alpine]]، وأوامر certbot ([[--help]] و [[test -f]]) في image [[certbot/certbot]] (نسخة 5.8.0)، والـ [[trap]] والـ inode في bash. إصدار شهادة حقيقية محتاج دومين عام بيشاور على سيرفر عام، فده (ورسايل certbot وقتها) من docs بتاعة certbot و Let's Encrypt.

---

## ١. الإعداد

~~~bash
#!/usr/bin/env bash
# أول مرة جرّب:  DRY=1 ./scripts/init-ssl.sh    ولو عدّى شغّله من غير DRY
set -euo pipefail
cd "$(dirname "$0")/.."
DOMAIN=example.com
EMAIL=you@example.com
~~~

- [[set -euo pipefail]]: أي فشل يوقف، ومتغير مش متعرّف خطأ، والـ pipe يفشل لو أي حتة فيه فشلت.
- [[cd "$(dirname "$0")/.."]]: السكربت في [[scripts/]]، فـ [[dirname "$0"]] = [[scripts]]، و [[/..]] = الفولدر اللي فوقه، يعني فولدر المشروع اللي فيه [[compose.yml]].
- [[EMAIL]]: إيميل حسابك عند Let's Encrypt.

---

## ٢. IP السيرفر

~~~bash
IP=$(curl -4 -s --max-time 10 https://api.ipify.org) || { echo "can't get server IP" >&2; exit 1; }
~~~

[[api.ipify.org]] موقع بيرد بالـ IP اللي الطلب جاي منه، يعني IP السيرفر العام زي ما الإنترنت شايفه. [[-4]] اسأل بـ IPv4 بس، و [[-s]] من غير progress، و [[--max-time 10]] متستناش أكتر من ١٠ ثواني. ولو فشل: رسالة واضحة على stderr ([[>&2]]) وخروج.

جربته من container وطلّع IP من ١٢ حرف (مش هكتبه هنا، ده IP بيتي العام). على السيرفر الحقيقي هيطلع زي [[203.0.113.10]].

---

## ٣. الدومين بيشاور فين؟

~~~bash
for d in "$DOMAIN" "www.$DOMAIN"; do
  got=$(getent ahostsv4 "$d" | awk '{print $1; exit}' || true)
  [ "$got" = "$IP" ] || { echo "$d -> $__{got:-nothing}, server is $IP: fix DNS first" >&2; exit 1; }
done
~~~

### [[getent ahostsv4]]

[[getent]] بيسأل النظام نفس الطريقة اللي البرامج بتسأل بيها (DNS و [[/etc/hosts]])، و [[ahostsv4]] = عناوين IPv4. على [[example.com]] الحقيقي:

~~~text الناتج
172.66.147.243  STREAM example.com
172.66.147.243  DGRAM  
172.66.147.243  RAW    
104.20.23.154   STREAM 
~~~

كل IP بيتكرر ٣ مرات (لكل نوع socket)، ودومين ممكن يبقى ليه أكتر من IP.

### [[awk '{print $1; exit}']]

[[awk]] بيقسم كل سطر لأعمدة: [[$1]] أول عمود. [[print $1; exit]] = اطبع أول عمود من **أول سطر** واقف. الناتج: [[172.66.147.243]].

### [[|| true]]: ليه لازم

دومين مش موجود: [[getent]] بيرجع [[2]]. ومع [[pipefail]] الـ pipe كله فاشل، ومع [[set -e]] السكربت بيقف **ساكت**. جربتها من غير [[|| true]]: خرج بـ 2 ومن غير أي رسالة. ومعاها، [[got]] بيبقى فاضي والسطر اللي بعده يطبع رسالة مفهومة.

### المقارنة

[[$__{got:-nothing}]]: لو [[got]] فاضي اكتب [[nothing]]. جربت بدومين مش موجود و [[IP=203.0.113.10]]:

~~~text الناتج
nothing.invalid -> nothing, server is 203.0.113.10: fix DNS first
~~~

اللوب بيعدّي على [[example.com]] و [[www.example.com]]، لأن الشهادة هتبقى للاتنين، والاتنين لازم يشاوروا على السيرفر.

---

## ٤. Nginx بإعداد HTTP بس

~~~bash
mkdir -p certbot/www certbot/conf
cp nginx/nginx.conf nginx/nginx.conf.full
trap 'cp nginx/nginx.conf.full nginx/nginx.conf' EXIT
cp nginx/nginx-http-only.conf nginx/nginx.conf
docker compose up -d nginx && docker compose restart nginx
~~~

### الفولدرين

[[certbot/www]] = الـ webroot (ملفات التحدي)، و [[certbot/conf]] = [[/etc/letsencrypt]] (الحساب والشهادات). الاتنين متركّبين في compose: [[www]] في Nginx و certbot، و [[conf]] في الاتنين برضه.

### ليه Nginx مش هيقوم بالإعداد الكامل؟

جربت [[nginx -t]] على إعداد فيه [[ssl_certificate]] لملف مش موجود:

~~~text الناتج
nginx: [emerg] cannot load certificate "/etc/letsencrypt/live/example.com/fullchain.pem": BIO_new_file() failed (SSL: error:80000002:system library::No such file or directory...)
~~~

ده «البيضة والفرخة»: Nginx محتاج الشهادة عشان يقوم، و certbot محتاج Nginx عشان ياخدها.

### [[trap '...' EXIT]]

[[trap]] بيسجّل أمر يتنفّذ لما الـ shell يخرج **بأي شكل**: نجاح، أو [[exit 1]]، أو [[set -e]] وقّفه. فبعد ما نحفظ نسخة [[.full]]، أيًا كان اللي يحصل الملف الكامل هيرجع. جربت: حطيت [[http]] في الملف، وفشل أمر، والـ trap رجّع [[full]].

### [[cp]] مش [[mv]]

جربت على ملف وبصيت على رقم الـ inode (رقم الملف على الديسك) بـ [[ls -i]]:

~~~text الناتج
159430 a.conf      الأصلي
159430 a.conf      بعد cp ملف تاني فوقه: نفس الرقم
460239 a.conf      بعد mv ملف تاني مكانه: رقم جديد
~~~

compose بيركّب [[nginx.conf]] كملف واحد (bind mount)، والـ container ماسك الـ inode. [[cp]] بيكتب جوه نفس الملف فالـ container يشوف الجديد، و [[mv]] بيحط ملف تاني والـ container يفضل شايف القديم.

### [[nginx-http-only.conf]]

الملف ده مش في المثال، شكله تقريبًا:

~~~text nginx-http-only.conf (جوه http {})
server {
  listen 80;
  server_name example.com www.example.com;
  location /.well-known/acme-challenge/ { root /var/www/certbot; }
  location / { return 200 "ssl setup in progress\n"; }
}
~~~

جربته في [[nginx:alpine]]: [[nginx -t]] قال [[test is successful]]، وملف تحدي حطيته في [[/var/www/certbot/.well-known/acme-challenge/abc]] اتقدّم:

~~~text الناتج
$ curl -s -H "Host: example.com" localhost/.well-known/acme-challenge/abc
token-abc
$ curl -s localhost/
ssl setup in progress
~~~

[[root /var/www/certbot]] معناها: المسار المطلوب بيتلزق بعد الفولدر ده، فـ [[/.well-known/acme-challenge/abc]] = [[/var/www/certbot/.well-known/acme-challenge/abc]].

### [[up -d nginx && restart nginx]]

[[up -d]] بيشغّل Nginx لو مش شغال. ولو كان شغال من قبل، مش هيقرا الإعداد الجديد، فـ [[restart]] بيضمن إنه قراه.

---

## ٥. اطلب الشهادة

~~~bash
docker compose run --rm --entrypoint certbot certbot certonly $__{DRY:+--dry-run} \
  --webroot -w /var/www/certbot --email "$EMAIL" --agree-tos --no-eff-email \
  --keep-until-expiring -d "$DOMAIN" -d "www.$DOMAIN"
~~~

الـ [[\]] في آخر السطر معناها «الأمر مكمّل في السطر اللي بعده».

### [[docker compose run --rm --entrypoint certbot certbot]]

| الجزء | معناه |
|---|---|
| [[run]] | شغّل container واحد مؤقت من خدمة في compose، بنفس الـ volumes |
| [[--rm]] | امسحه لما يخلص |
| [[--entrypoint certbot]] | البرنامج اللي يتشغّل. مهمة لو الخدمة ليها entrypoint تاني (لوب تجديد مثلًا) |
| [[certbot]] (التانية) | اسم الخدمة في compose |
| [[certonly]] | هات شهادة بس، متعدّلش إعدادات Nginx |

### [[$__{DRY:+--dry-run}]]

عكس [[:-]]: [[:+]] معناها «لو المتغير موجود ومش فاضي، حط الكلام ده، وإلا ولا حاجة». جربت:

~~~text الناتج
DRY=1    →  certonly --dry-run --webroot
من غيره  →  certonly --webroot
~~~

ومن غير علامات تنصيص عن قصد، عشان لما تبقى فاضية تختفي خالص. و [[set -u]] مش بيزعّق هنا حتى لو [[DRY]] مش متعرّف، لأن [[:+]] بتتعامل مع ده.

### باقي الـ flags (من [[certbot --help]])

| الـ flag | معناه |
|---|---|
| [[--dry-run]] | تجربة على سيرفر الـ staging بتاع Let's Encrypt، من غير ما تحفظ شهادة |
| [[--webroot -w /var/www/certbot]] | حط ملف التحدي في الفولدر ده (اللي Nginx بيقدّم منه) |
| [[--email]] | إيميل الحساب |
| [[--agree-tos]] | وافق على الشروط من غير ما تسأل (السكربت مفيهوش حد يرد) |
| [[--no-eff-email]] | متشاركش الإيميل مع EFF (من غيرها بيسأل) |
| [[--keep-until-expiring]] | لو فيه شهادة صالحة لنفس الدومينات، متطلبش جديدة |
| [[-d]] | دومين. مرتين = شهادة واحدة للاتنين |

### اللي بيحصل في webroot (من الـ docs)

certbot بيطلب من Let's Encrypt، فهي بتدّيله كلمة عشوائية. هو بيكتبها في ملف جوه [[/var/www/certbot/.well-known/acme-challenge/]]. Let's Encrypt بتطلب [[http://example.com/.well-known/acme-challenge/<الاسم>]] من برّه، و Nginx بيقدّمه (زي [[token-abc]] فوق). لو وصلها صح، يبقى انت ماسك الدومين، فتدّيله الشهادة. والرسالة لما تنجح [[Successfully received certificate.]]، وفي الـ dry run [[The dry run was successful.]].

---

## ٦. اتأكد إن الشهادة اتحفظت

~~~bash
docker compose run --rm --entrypoint test certbot -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" \
  || { echo "no certificate yet (dry run?), nginx stays on HTTP" >&2; exit 1; }
~~~

نفس فكرة [[run]]، بس البرنامج [[test]] مش certbot: [[test -f FILE]] نجاح لو الملف موجود. ليه جوه container؟ لأن [[certbot/conf]] اللي على السيرفر ملفاته ملك root، ويوزر [[deploy]] مش هيشوفها. جربت على image certbot من غير شهادة:

~~~text الناتج
$ docker run --rm --entrypoint test certbot/certbot -f /etc/letsencrypt/live/example.com/fullchain.pem
$ echo $?
1
~~~

فـ [[||]] بيطبع الرسالة ويخرج. وده اللي بيحصل في [[DRY=1]] دايمًا (الـ dry run مش بيحفظ شهادة)، والـ [[trap]] بيرجّع الإعداد الكامل للملف، بس Nginx فاضل شغال بالـ HTTP-only لحد التشغيل الجاي.

---

## ٧. الإعداد الكامل

~~~bash
cp nginx/nginx.conf.full nginx/nginx.conf
docker compose restart nginx
curl -fsSI "https://$DOMAIN" | head -1
~~~

رجّع الملف (برضه [[cp]] عشان الـ inode)، و [[restart]] عشان Nginx يقراه بالشهادة. وفي الآخر [[curl -I]] (HEAD: الهيدرز بس) على https، و [[head -1]] أول سطر، المفروض [[HTTP/2 200]]. لو الشهادة غلط، [[-f]] و curl نفسه هيفشلوا.

---

## ملخص

| # | الخطوة | بتمنع إيه |
|---|---|---|
| ١ | IP السيرفر + [[getent]] للدومينين | محاولة فاشلة على Let's Encrypt بسبب DNS |
| ٢ | [[trap]] + إعداد HTTP-only | Nginx ميقومش من غير شهادة، والملف يفضل متغيّر |
| ٣ | [[certonly --webroot]] (و [[DRY]]) | توقيف Nginx، أو صرف الحد في تجارب |
| ٤ | [[test -f]] جوه container | تحويل Nginx لـ SSL من غير شهادة |
| ٥ | الإعداد الكامل + [[curl]] | تقول «تمام» من غير ما https يرد فعلًا |

## الخلاصة

- جرّب بـ [[DRY=1]] الأول دايمًا: الـ staging حدوده أوسع.
- [[|| true]] بعد [[getent]] عشان الفشل يطلع برسالة مش سكوت.
- [[cp]] فوق ملف متركّب، مش [[mv]].`,
          lines: [
            "أي فشل يوقف السكربت.",
            "اشتغل من فولدر المشروع.",
            "الدومين.",
            "الإيميل لحساب Let's Encrypt.",
            "IP السيرفر العام، ولو فشل اقف برسالة.",
            "لف على الدومين و www...",
            "...هات الـ IPv4 اللي بيشاور عليه ([[|| true]]: لو الدومين مش متسجّل getent بيفشل، ومع pipefail و [[set -e]] السكربت كان هيقع ساكت من غير رسالة).",
            "...لو مش IP السيرفر اقف قبل ما تكلّم Let's Encrypt.",
            "نهاية اللوب.",
            "الفولدرات اللي هتتركّب في Nginx و certbot.",
            "احفظ نسخة من الإعداد الكامل.",
            "أيًا كان اللي يحصل، رجّع الإعداد الكامل في الآخر.",
            "حط إعداد HTTP بس (نفس الـ inode).",
            "شغّل Nginx، واعمله restart عشان يقرا الإعداد الجديد.",
            "اطلب الشهادة بـ certbot (أو dry-run لو DRY موجود)...",
            "...بطريقة webroot، والإيميل، والموافقة على الشروط...",
            "...ومتطلبش جديدة لو فيه صالحة، للدومين و www.",
            "اتأكد إن الشهادة اتحفظت (من جوه container لأن الفولدر ملك root)...",
            "...ولو مش موجودة اقف.",
            "رجّع الإعداد الكامل بالـ SSL.",
            "restart لـ Nginx عشان يقراه.",
            "اتأكد إن https بيرد."
          ],
          sol: R`بـ [[DRY=1]] والـ DNS صح، certbot بيقول [[The dry run was successful.]]، وبعدين فحص [[fullchain.pem]] بيفشل (لأن dry run مابيحفظش شهادة)، فالسكربت بيطبع [[no certificate yet (dry run?), nginx stays on HTTP]] ويخرج بـ 1، و [[trap]] بيرجّع [[nginx.conf]] الكامل. ده متوقع. من غير DRY بتشوف [[Successfully received certificate.]] وفي الآخر [[HTTP/2 200]] من الـ curl.

على دومين مش بيشاور على السيرفر، بيقف قبل أي حاجة: [[test.example.com -> 198.51.100.4, server is 203.0.113.10: fix DNS first]] أو [[-> nothing]] لو مفيش record أصلًا. جربت منطق الفحص ده وطلّع نفس الرسالة. الفايدة إنك متكلّمش Let's Encrypt وانت عارف إنه هيفشل، لأنه بيحظرك مؤقتًا بعد محاولات فاشلة كتير (rate limit).

لو certbot قال [[Timeout during connect]] أو [[Invalid response ... 404]]، يبقى بورت 80 مقفول أو [[/.well-known/acme-challenge/]] مش بيروح لـ [[/var/www/certbot]]. (ده محتاج سيرفر ودومين حقيقي، فجربت جزء فحص DNS بس.)`
        },
        {
          cmd: "renew-ssl.sh",
          title: "تجديد الشهادة اللي مبيفشلش في صمت",
          desc: "Let's Encrypt بتدّي شهادة ٩٠ يوم، والتجديد لازم يبقى أوتوماتيك. السكربت ده بيشتغل من cron كل يوم: يجدد لو لازم، ولو اتجددت فعلًا يعمل reload لـ Nginx، وبعدين يسأل الموقع نفسه «الشهادة اللي بتقدّمها فاضلها كام يوم؟» ويصرّخ لو أقل من ١٤.",
          example: R`#!/usr/bin/env bash
# /etc/cron.d/myapp-ssl  (كل يوم الساعة 3:17):
# 17 3 * * * deploy /opt/myapp/scripts/renew-ssl.sh >> /home/deploy/ssl-renew.log 2>&1
set -euo pipefail
cd "$(dirname "$0")/.."
DOMAIN=example.com
echo "== $(date '+%F %T')"

docker compose run --rm --entrypoint certbot certbot renew \
  --deploy-hook 'touch /etc/letsencrypt/.renewed'

if docker compose run --rm --entrypoint sh certbot -c 'test -f /etc/letsencrypt/.renewed && rm /etc/letsencrypt/.renewed'; then
  docker compose exec -T nginx nginx -t
  docker compose exec -T nginx nginx -s reload
  echo "renewed, nginx reloaded"
fi

END=$(echo | openssl s_client -connect "$DOMAIN:443" -servername "$DOMAIN" 2>/dev/null | openssl x509 -noout -enddate | cut -d= -f2) || true
[ -n "$END" ] || { echo "ALERT: $DOMAIN unreachable or no certificate served" >&2; exit 1; }
DAYS=$(( ( $(date -d "$END" +%s) - $(date +%s) ) / 86400 ))
echo "served certificate: $DAYS days left"
[ "$DAYS" -ge 14 ] || { echo "ALERT: $DOMAIN expires in $DAYS days" >&2; exit 1; }`,
          try: "على سيرفر التجربة جرّب [[docker compose run --rm --entrypoint certbot certbot renew --dry-run]] الأول: لازم يقول Congratulations. بعدين شغّل السكربت بإيدك واقرا عدد الأيام، وحطه في cron واتأكد بعد يوم إن اللوج فيه سطر جديد.",
          flag: "script",
          deep: {
            why: "الشهادة بتخلص بعد ٩٠ يوم. لو التجديد بيفشل ومحدش شايف، هتعرف لما الموقع يطلع «Not Secure» للعملاء. وحتى لو التجديد نجح، Nginx لازم يعمل reload وإلا هيفضل يقدّم الشهادة القديمة من الذاكرة لحد ما تخلص.",
            how: R`[[certbot renew]] بيعدّي على كل شهادة، وبيجدد بس اللي فاضلها أقل من ٣٠ يوم. وبيستخدم نفس الطريقة اللي الشهادة طلعت بيها أول مرة (محفوظة في [[/etc/letsencrypt/renewal/example.com.conf]]): لو طلعت بـ webroot يجدد بـ webroot، ولو بـ standalone يحاول يسمع على 80 بنفسه.

[[--deploy-hook]] أمر بيتنفذ بس لما شهادة تتجدد فعلًا. بس هو بيتنفذ جوه container بتاع certbot، ومن هناك مش هيقدر يكلّم Nginx. فبنخليه يعمل ملف علامة [[.renewed]]، وبرّه نشوف: لو الملف موجود، امسحه واعمل reload.

[[nginx -t]] قبل الـ reload: لو الإعدادات فيها غلطة، [[set -e]] يوقف قبل ما نلمس Nginx الشغال. و [[-T]] في [[exec]] عشان cron مفيهوش terminal.

الفحص الأخير أهم سطر: [[openssl s_client]] بيتصل بالموقع زي أي متصفح، ويجيب الشهادة اللي Nginx «بيقدّمها فعلًا»، مش اللي على الديسك. فلو التجديد حصل والـ reload محصلش، أو التجديد نفسه فاشل من شهور، الرقم هيقل وهيطلع ALERT. و [[exit 1]] بيخلي cron (أو أي مراقبة) يعرف.

ولو certbot متسطب على السيرفر نفسه و Nginx في container، والشهادة طلعت standalone، التجديد لازم يوقف Nginx ويشغّله: [[certbot renew --pre-hook "docker compose -f /opt/myapp/compose.yml stop nginx" --post-hook "docker compose -f /opt/myapp/compose.yml start nginx"]]. بس الأحسن تحوّلها لـ webroot.

اختار طريقة واحدة: يا السكربت ده في cron، يا لوب التجديد جوه compose (الدرس الجاي). الـ cron أحسن لأن ليه لوج وتنبيه.`,
            when: "مع أي شهادة Let's Encrypt على Docker. حطه في cron مرة أو مرتين في اليوم؛ certbot مش هيعمل حاجة لو مفيش تجديد مطلوب.",
            mistakes: R`في مشروع حقيقي الشهادة طلعت بـ [[certbot certonly --standalone]]، والـ cron كان [[certbot renew --quiet]] كل يوم. الـ renew بيحاول يسمع على بورت 80 و Nginx ماسكه، فبيفشل. و [[--quiet]] بيخبّي الفشل، والـ cron مش متوجّه لأي لوج، فمحدش عرف لحد ما الشهادة خلصت فعلًا بعد ٩٠ يوم. والنسخ لفولدر ssl والـ restart كانوا بيحصلوا كل يوم حتى من غير تجديد، ومكانهم الصح [[--deploy-hook]].

وفي مشروع تاني كان certbot بيجدد كل ١٢ ساعة جوه compose وده شغال، بس Nginx عمره ما عمل reload، فكان بيقدّم الشهادة القديمة لحد ما حد يعمل restart بالصدفة.`
          },
          teach: R`## الفكرة: جدد، اعمل reload لو لزم، واسأل الموقع نفسه

السكربت ٣ أجزاء: [[certbot renew]] بيجدد لو الشهادة قربت تخلص، ولو جددها فعلًا Nginx يعمل reload، وفي الآخر بنتصل بالموقع زي أي متصفح ونقرا تاريخ انتهاء الشهادة **اللي بيقدّمها** دلوقتي. لو فاضلها أقل من ١٤ يوم، السكربت يفشل.

اللي اتجرّب: [[certbot renew]] ومنطق ملف العلامة في image [[certbot/certbot]] (نسخة 5.8.0، من غير شهادات حقيقية)، والجزء الأخير كامل في أوبونتو 24.04 جوه Docker ضد [[nginx:alpine]] اسمه على الشبكة [[example.com]] وبيقدّم شهادة self-signed عملتها بـ openssl. التجديد الحقيقي محتاج شهادة Let's Encrypt حقيقية، فرسايله من docs بتاعة certbot.

---

## ١. سطر الـ cron (تعليق في أول الملف)

~~~text /etc/cron.d/myapp-ssl
17 3 * * * deploy /opt/myapp/scripts/renew-ssl.sh >> /home/deploy/ssl-renew.log 2>&1
~~~

| الجزء | معناه |
|---|---|
| [[17 3 * * *]] | الدقيقة ١٧، الساعة ٣، كل يوم في الشهر، كل شهر، كل يوم في الأسبوع. يعني ٣:١٧ الفجر كل يوم |
| [[deploy]] | اليوزر اللي هيشغّله. الخانة دي موجودة في ملفات [[/etc/cron.d]] بس، مش في [[crontab -e]] |
| [[>> file]] | ضيف الناتج لآخر ملف اللوج |
| [[2>&1]] | والأخطاء (stderr) كمان في نفس الملف |

ليه ٣:١٧ مش ٣:٠٠؟ ناس كتير بتحط الساعة بالظبط، فاختيار دقيقة عشوائية بيبعد عن الزحمة على سيرفرات Let's Encrypt.

---

## ٢. الإعداد

~~~bash
set -euo pipefail
cd "$(dirname "$0")/.."
DOMAIN=example.com
echo "== $(date '+%F %T')"
~~~

- [[set -euo pipefail]]: أي فشل يوقف، ومتغير مش متعرّف خطأ، والـ pipe يفشل لو أي حتة فيه فشلت.
- [[cd "$(dirname "$0")/.."]]: السكربت في [[scripts/]]، فبنطلع فولدر واحد لفولدر المشروع اللي فيه [[compose.yml]]. ومهم مع cron بالذات لأنه بيبدأ في الـ home.
- [[echo "== ..."]]: سطر فاصل بالتاريخ والوقت في اللوج، فكل يوم يبان لوحده: [[== 2026-10-07 03:17:00]].

---

## ٣. التجديد

~~~bash
docker compose run --rm --entrypoint certbot certbot renew \
  --deploy-hook 'touch /etc/letsencrypt/.renewed'
~~~

- [[docker compose run --rm --entrypoint certbot certbot]]: container مؤقت من خدمة [[certbot]] بنفس الـ volumes، والبرنامج certbot نفسه (مش أي entrypoint تاني الخدمة ليها)، ويتمسح لما يخلص.
- [[renew]]: لف على كل الشهادات في [[/etc/letsencrypt/renewal/]] وجدد اللي فاضلها أقل من ٣٠ يوم، بنفس الطريقة اللي طلعت بيها (webroot مثلًا).
- [[--deploy-hook CMD]]: أمر بيتنفّذ مرة لكل شهادة **اتجددت فعلًا**. لو مفيش تجديد، مش بيتنفّذ.

من غير شهادات خالص، [[certbot renew]] طلّع:

~~~text الناتج
No renewals were attempted.
No hooks were run.
~~~

وخرج بـ 0. وعلى شهادة لسه جديدة، certbot بيقول [[Certificate not yet due for renewal]] (من الـ docs).

### ليه ملف علامة ومش reload مباشرة؟

الـ hook بيتنفّذ **جوه container الـ certbot**، ومن هناك مفيش Docker ولا Nginx. فبنخليه يعمل حاجة واحدة يقدر عليها: ملف فاضي [[.renewed]] في [[/etc/letsencrypt]] (فولدر متركّب على الديسك، فبيفضل بعد ما الـ container يتمسح). وبرّه نشوفه.

> [[--dry-run]] مع [[renew]] مش بيشغّل الـ deploy hooks، إلا لو ضفت [[--run-deploy-hooks]] (مكتوب في [[certbot --help renew]]).

---

## ٤. لو اتجددت: reload

~~~bash
if docker compose run --rm --entrypoint sh certbot -c 'test -f /etc/letsencrypt/.renewed && rm /etc/letsencrypt/.renewed'; then
  docker compose exec -T nginx nginx -t
  docker compose exec -T nginx nginx -s reload
  echo "renewed, nginx reloaded"
fi
~~~

### الشرط

container مؤقت تاني، بس البرنامج [[sh -c '...']] (shell بينفّذ النص ده):

- [[test -f .renewed]]: الملف موجود؟
- [[&& rm .renewed]]: لو آه امسحه، عشان بكرة ميعملش reload تاني من غير سبب.

نجاح الاتنين = [[if]] ينفّذ [[then]]. لو مفيش ملف، [[test]] بيفشل والـ [[if]] بيعدّي (وفشل جوه شرط [[if]] مش بيوقف السكربت مع [[set -e]]). جربت المنطق ده في image certbot:

~~~text الناتج
no marker -> no reload           من غير الملف
marker found -> reload           بعد touch .renewed
~~~

### [[nginx -t]] ثم [[nginx -s reload]]

- [[docker compose exec -T nginx CMD]]: نفّذ أمر جوه container الـ nginx الشغال. [[-T]] من غير terminal، لازم في cron لأن مفيش terminal.
- [[nginx -t]]: اختبر الإعدادات. لو فيها غلطة، [[set -e]] يوقف قبل الـ reload.
- [[nginx -s reload]]: [[-s]] = signal. قول لـ Nginx يقرا الإعدادات والشهادات من جديد، من غير ما يقطع الاتصالات الشغالة.

### ليه الـ reload لازم؟ جربتها

Nginx بيقرا الشهادة من الديسك **مرة واحدة** لما يقوم أو يعمل reload. بدّلت ملف الشهادة على الديسك بشهادة ٩٠ يوم، والموقع كان بيقدّم شهادة ١٠ أيام:

~~~text الناتج
== قبل الـ reload
served certificate: 9 days left
ALERT: example.com expires in 9 days
== بعد nginx -s reload
served certificate: 89 days left
~~~

يعني الملف الجديد على الديسك ومش بيتقدّم لحد الـ reload.

---

## ٥. الشهادة اللي بتتقدّم فعلًا

~~~bash
END=$(echo | openssl s_client -connect "$DOMAIN:443" -servername "$DOMAIN" 2>/dev/null | openssl x509 -noout -enddate | cut -d= -f2) || true
~~~

من الشمال لليمين:

| الحتة | بتعمل إيه |
|---|---|
| [[echo |]] | ابعت سطر فاضي، فـ s_client يخلص ويقفل بدل ما يستنى كلام منك |
| [[openssl s_client -connect example.com:443]] | اتصل بالموقع على 443 واعمل TLS handshake زي أي متصفح، واطبع الشهادة |
| [[-servername example.com]] | SNI: قول للسيرفر انت عايز أنهي دومين (سيرفر واحد ممكن يبقى عليه كذا شهادة) |
| [[2>/dev/null]] | ارمي رسايل الاتصال |
| [[openssl x509 -noout -enddate]] | اقرا الشهادة من الـ pipe، ومتطبعهاش ([[-noout]])، اطبع تاريخ انتهائها بس |
| [[cut -d= -f2]] | قسّم على [[=]] وخد الجزء التاني |
| [[|| true]] | لو أي حاجة فشلت، متخلّيش [[set -e]] يوقف ساكت |

خطوة بخطوة على السيرفر التجريبي:

~~~text الناتج
$ ... | openssl x509 -noout -enddate
notAfter=Oct 17 15:42:20 2026 GMT
~~~

وبعد [[cut]]: [[Oct 17 15:42:20 2026 GMT]].

### الموقع مش بيرد

~~~bash
[ -n "$END" ] || { echo "ALERT: $DOMAIN unreachable or no certificate served" >&2; exit 1; }
~~~

[[-n]] = النص مش فاضي. جربت على سيرفر مفيهوش 443:

~~~text الناتج
Could not read certificate from <stdin>
Unable to load certificate
ALERT: srv unreachable or no certificate served
~~~

السطرين الأولانيين من [[openssl x509]] لما ملقاش شهادة، والتالت رسالتنا، و exit [[1]].

---

## ٦. كام يوم فاضل

~~~bash
DAYS=$(( ( $(date -d "$END" +%s) - $(date +%s) ) / 86400 ))
echo "served certificate: $DAYS days left"
[ "$DAYS" -ge 14 ] || { echo "ALERT: $DOMAIN expires in $DAYS days" >&2; exit 1; }
~~~

- [[date -d "Oct 17 15:42:20 2026 GMT" +%s]]: حوّل التاريخ ده لعدد الثواني من ١ يناير ١٩٧٠ (Unix time). و [[date +%s]] نفس الكلام للحظة دي.
- [[$(( ... ))]]: حساب أرقام صحيحة في bash. الفرق بالثواني، و [[/ 86400]] (ثواني اليوم = ٢٤ × ٦٠ × ٦٠) بيحوّله أيام.
- [[-ge 14]]: greater or equal، أكبر من أو يساوي ١٤.

الشهادة التجريبية اتعملت بـ [[-days 10]] قبلها بدقيقة، والناتج:

~~~text الناتج
served certificate: 9 days left
ALERT: example.com expires in 9 days
~~~

ليه ٩ مش ١٠؟ لأن القسمة في bash بتشيل الكسر: فاضل ٩ أيام و ٢٣ ساعة وشوية، فيطلع ٩. و ١٤ يوم حد مريح: certbot بيبدأ يجدد عند ٣٠، فلو وصلنا ١٤ يبقى التجديد بيفشل من أكتر من أسبوعين.

> [[date -d]] بتاع لينكس (GNU). على الماك [[date]] مختلف ومفيهوش [[-d]]، بس السكربت ده معمول للسيرفر.

---

## ملخص

| # | الخطوة | لو حصل |
|---|---|---|
| ١ | [[certbot renew --deploy-hook]] | اتجددت: ملف [[.renewed]] |
| ٢ | فيه [[.renewed]]؟ | [[nginx -t]] ثم [[reload]] |
| ٣ | [[s_client]] + [[x509 -enddate]] | مفيش رد: ALERT و exit 1 |
| ٤ | الأيام أقل من ١٤ | ALERT و exit 1 |

## الخلاصة

- التجديد على الديسك ≠ الشهادة اللي بتتقدّم: من غير reload، Nginx بيفضل على القديمة.
- الفحص الأخير بيسأل الموقع نفسه، فبيمسك أي سبب: تجديد فاشل، reload محصلش، أو Nginx واقع.
- [[exit 1]] + اللوج = حد يقدر يعرف. [[--quiet]] من غير لوج = محدش هيعرف.`,
          lines: [
            "أي فشل يوقف السكربت.",
            "اشتغل من فولدر المشروع.",
            "الدومين اللي هنفحصه.",
            "سطر بالتاريخ في اللوج.",
            "جدد أي شهادة فاضلها أقل من ٣٠ يوم...",
            "...ولو اتجددت فعلًا اعمل ملف علامة.",
            "لو ملف العلامة موجود (امسحه)...",
            "...افحص إعدادات Nginx.",
            "...واعمل reload عشان يقرا الشهادة الجديدة.",
            "...وقول.",
            "نهاية الـ if.",
            "تاريخ انتهاء الشهادة اللي الموقع بيقدّمها فعلًا. و || true عشان لو الموقع مش بيرد، set -e ميقفلش السكربت ساكت.",
            "لو مفيش تاريخ (الموقع واقع أو مفيش شهادة)، ده في حد ذاته تنبيه: اطبعه واخرج بفشل.",
            "كام يوم فاضل.",
            "اطبعه في اللوج.",
            "لو أقل من ١٤ يوم، اطبع تنبيه واخرج بفشل."
          ],
          sol: R`[[certbot renew --dry-run]] لازم يخلص بـ [[Congratulations, all simulated renewals succeeded]]. لو قال [[failed]] المشكلة غالبًا بورت 80 أو مسار الـ webroot.

تشغيل السكربت بإيدك والشهادة لسه جديدة بيطبع [[== 2026-09-30 03:17:00]]، وبعدها certbot بيقول [[Certificate not yet due for renewal]] (فمفيش reload)، وفي الآخر [[served certificate: 85 days left]]. جربت حساب الأيام على شهادة سيرفر عام وطلع [[21]] يوم، والحساب بيقرا الشهادة اللي بتتقدّم فعلًا، مش الملف اللي على الديسك. وده بيمسك حالة إن certbot جدّد بس Nginx ماعملش reload.

بعد يوم في cron، [[tail /home/deploy/ssl-renew.log]] لازم يكون فيه سطر [[==]] بتاريخ النهارده. لو فاضي، cron ماشتغلش (راجع [[/etc/cron.d]]: لازم فيه اسم اليوزر، والملف ينتهي بسطر فاضي). ولو فيه [[ALERT: ... unreachable]] يبقى السيرفر مش بيرد على 443 من جوه نفسه.`
        },
        {
          cmd: "nginx.conf (Next.js)",
          title: "إعدادات Nginx للإنتاج قدام Next.js في Docker",
          desc: "ملف nginx.conf كامل لموقع Next.js في compose: يرفض أي دومين غريب، يحوّل HTTP و www لدومين واحد بـ https، TLS و HSTS، و gzip، و rate limit، و buffers كبيرة للكوكيز، وكاش سنة لملفات [[/_next/static]].",
          example: R`events { worker_connections 1024; }
http {
  include /etc/nginx/mime.types; client_max_body_size 20M;
  gzip on; gzip_proxied any; gzip_types text/css application/javascript application/json image/svg+xml;
  limit_req_zone $binary_remote_addr zone=perip:10m rate=10r/s;
  ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

  server { listen 80 default_server; return 444; }
  server { listen 443 ssl default_server; ssl_reject_handshake on; }
  server {
    listen 80; server_name example.com www.example.com;
    location /.well-known/acme-challenge/ { root /var/www/certbot; }
    location / { return 301 https://example.com$request_uri; }
  }
  server { listen 443 ssl; http2 on; server_name www.example.com; return 301 https://example.com$request_uri; }
  server {
    listen 443 ssl; http2 on; server_name example.com;
    add_header Strict-Transport-Security "max-age=63072000" always;
    add_header X-Content-Type-Options "nosniff" always;
    location / {
      proxy_pass http://app:3000;
      proxy_set_header Host $host;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
      proxy_buffer_size 128k; proxy_buffers 4 256k; proxy_busy_buffers_size 256k;
      limit_req zone=perip burst=20 nodelay;
    }
    location /_next/static/ { proxy_pass http://app:3000; add_header Cache-Control "public, max-age=31536000, immutable"; }
  }
}`,
          try: R`بعد ما تحطه: [[docker compose exec nginx nginx -t]]، وبعدين [[curl -I http://example.com]] (لازم 301)، و [[curl -I https://www.example.com]] (لازم 301 لـ example.com)، و [[curl -I -H "Host: other.test" http://203.0.113.10]] (لازم الاتصال يتقفل من غير رد).`,
          flag: "script",
          deep: {
            why: "Next.js لوحده مش مفروض يواجه الإنترنت: Nginx قدامه بيعمل TLS، ويضغط، ويحدد عدد الطلبات، ويرفض الدومينات الغريبة، وبيقدّم الملفات الثابتة بكاش طويل.",
            how: R`الـ default servers: أي طلب بـ Host مش واحد من دوميناتك (أو بالـ IP مباشرة) بيقع في الـ server اللي عليه [[default_server]]. على 80 بيرجع [[444]] (Nginx يقفل الاتصال من غير رد). وعلى 443 [[ssl_reject_handshake on]] بيرفض الـ TLS من الأول، فمش هيدّي شهادتك لدومين غريب. ده بيحميك لو حد وجّه دومينه على الـ IP بتاعك عشان يعمل نسخة من موقعك.

الشهادة متعرّفة مرة واحدة في [[http]]، وكل server على 443 بيورثها.

التحويلات: HTTP كله لـ https، و www على https لـ الدومين من غير www، فيبقى فيه عنوان واحد (canonical) وده أحسن لجوجل. ومسار [[acme-challenge]] على 80 مستثنى عشان تجديد الشهادة يشتغل.

[[http2 on;]] هي الطريقة الجديدة (من nginx 1.25.1) بدل [[listen 443 ssl http2]]. و [[ssl_protocols]] مش مكتوبة لأن الافتراضي في النسخ الجديدة TLSv1.2 و TLSv1.3.

[[X-Forwarded-Proto]] بيقول لـ Next.js إن الطلب الأصلي كان https، وإلا الـ redirects والكوكيز الـ secure ممكن تتلخبط. والـ buffers الكبيرة عشان مكتبات الـ auth بتحط كوكيز كبيرة، ومن غيرها بيطلع [[502 upstream sent too big header]].

[[limit_req_zone]] بيعمل عدّاد لكل IP بـ ١٠ طلبات في الثانية، و [[burst=20 nodelay]] بيسمح بدفعة ٢٠ فوقهم من غير تأخير (صفحة واحدة بتطلب ملفات كتير).

فخ مشهور: [[add_header]] بيتورث من الـ server للـ location بس لو الـ location مفيهوش ولا add_header. في [[/_next/static/]] فيه Cache-Control، فالـ HSTS مش هيتبعت على الملفات دي. مش مشكلة هنا، بس افتكرها لو ضيفت هيدرز أمان مهمة.

و [[proxy_pass http://app:3000]]: [[app]] اسم الخدمة في compose. Nginx بيحوّل الاسم لـ IP وقت ما يقوم، فلو app مش موجود ساعتها Nginx هيقع بـ host not found.`,
            when: "أي تطبيق Node (Next.js أو Express) في compose وراه Nginx container ماسك 80 و 443.",
            mistakes: "في مشروع حقيقي كان مفيش default_server، فالدومين اللي عمل نسخة من الموقع اتقفل بالاسم بس (server مخصوص ليه)، ومتحط عليه شهادة الموقع الأصلي، فالمتصفح بيطلع تحذير بدل ما الاتصال يترفض. وكان فيه [[X-XSS-Protection]] وده قديم والمتصفحات بطّلت تستخدمه، ومفيش Content-Security-Policy. وكان مكتوب [[listen 443 ssl http2]] اللي بيطلع warning في النسخ الجديدة."
          },
          teach: R`## الفكرة: ٥ servers، كل واحد ليه شغلانة

ملف Nginx بيتقري كـ «بلوكات» جوه بعض: [[events {}]] و [[http {}]]، وجوه [[http]] كذا [[server {}]]، وجوه الـ server [[location {}]]. كل سطر جوه بلوك اسمه **directive**: اسم وقيمة وفي الآخر [[;]]. لما طلب يوصل، Nginx بيختار server حسب **البورت** والـ **Host** (اسم الدومين اللي في الطلب)، وجوه الـ server بيختار location حسب المسار.

| الـ server | البورت | الدومين | بيعمل إيه |
|---|---|---|---|
| ١ | 80 | أي دومين غريب | يقفل الاتصال |
| ٢ | 443 | أي دومين غريب | يرفض الـ TLS |
| ٣ | 80 | الدومين و www | تحدي certbot، والباقي يتحوّل https |
| ٤ | 443 | www | يتحوّل للدومين من غير www |
| ٥ | 443 | الدومين | الموقع نفسه، رايح لـ Next.js |

اتجرّب كامل: الملف ده بالظبط في [[nginx:alpine]] (nginx 1.31.6) بشهادة self-signed للدومينين، و «app» container تاني اسمه على الشبكة [[app]] بيسمع على 3000، و [[curl]] من container أوبونتو 24.04 على نفس شبكة Docker الخاصة. [[--resolve]] بيخلّي curl يودّي [[example.com]] على IP الـ container، و [[-k]] بيقبل الشهادة الـ self-signed.

---

## ١. [[events]] والإعدادات العامة

~~~nginx
events { worker_connections 1024; }
http {
  include /etc/nginx/mime.types; client_max_body_size 20M;
~~~

- [[events]]: إعدادات الاتصالات. [[worker_connections 1024]]: كل worker process يمسك لحد ١٠٢٤ اتصال في نفس الوقت. البلوك ده لازم يبقى موجود حتى لو فاضي.
- [[http {]]: كل حاجة تخص HTTP جوه هنا.
- [[include /etc/nginx/mime.types]]: حط محتوى الملف ده هنا. فيه جدول الامتدادات وأنواعها ([[.css]] = [[text/css]])، عشان Nginx يبعت [[Content-Type]] صح.
- [[client_max_body_size 20M]]: أقصى حجم لجسم الطلب (رفع صورة مثلًا). الافتراضي 1M، وأكبر منه بيرجع [[413 Request Entity Too Large]].

---

## ٢. الضغط و rate limit

~~~nginx
  gzip on; gzip_proxied any; gzip_types text/css application/javascript application/json image/svg+xml;
  limit_req_zone $binary_remote_addr zone=perip:10m rate=10r/s;
~~~

### gzip

- [[gzip on]]: اضغط الردود لو المتصفح قال إنه بيفهم gzip (هيدر [[Accept-Encoding: gzip]]).
- [[gzip_proxied any]]: اضغط حتى الطلبات اللي جاية عن طريق proxy (CDN مثلًا). الافتراضي [[off]].
- [[gzip_types]]: الأنواع اللي تتضغط. [[text/html]] بيتضغط دايمًا من غير ما تكتبه. الصور (png و jpg) مضغوطة أصلًا فمش موجودة.

جربت طلب بـ [[Accept-Encoding: gzip]] والرد فيه:

~~~text الناتج
content-type: text/html
content-encoding: gzip
~~~

وملف JS حجمه ٣ bytes ماتضغطش، لأن [[gzip_min_length]] الافتراضي ٢٠ byte (ضغط ملف صغير بيكبّره).

### [[limit_req_zone]]

- [[$binary_remote_addr]]: الـ IP بتاع الزائر بشكل مضغوط (٤ bytes لـ IPv4)، ده المفتاح: عدّاد لكل IP.
- [[zone=perip:10m]]: اسم المساحة [[perip]] وحجمها ١٠ ميجا في الـ RAM. الـ docs بتقول الميجا بتشيل حوالي ١٦ ألف IP.
- [[rate=10r/s]]: ١٠ طلبات في الثانية لكل IP.

السطر ده بيعرّف العدّاد بس. التطبيق تحت في [[limit_req]].

---

## ٣. الشهادة مرة واحدة

~~~nginx
  ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
~~~

- [[fullchain.pem]]: شهادتك + الشهادات الوسيطة (اللي بتربطها بجهة موثوقة). لازم fullchain مش [[cert.pem]] لوحدها، وإلا موبايلات كتير هتقول الشهادة مش موثوقة.
- [[privkey.pem]]: المفتاح الخاص.

متحطوطة في [[http]] فكل server على 443 بيورثها، فمش محتاج تكررها ٣ مرات.

---

## ٤. الـ default servers: الدومينات الغريبة

~~~nginx
  server { listen 80 default_server; return 444; }
  server { listen 443 ssl default_server; ssl_reject_handshake on; }
~~~

لما طلب يوصل على بورت، Nginx بيدوّر على server الـ [[server_name]] بتاعه زي الـ Host. لو مفيش، بيروح للـ server اللي عليه [[default_server]]. وده بيحصل لما حد يطلب السيرفر بالـ IP، أو يوجّه دومين تاني على الـ IP بتاعك.

- [[return 444]]: كود خاص بـ Nginx (مش HTTP حقيقي): اقفل الاتصال من غير ما ترد بحاجة.
- [[listen 443 ssl]]: [[ssl]] = البورت ده TLS.
- [[ssl_reject_handshake on]]: ارفض الـ TLS handshake نفسه، فالزائر الغريب مش هيشوف شهادتك ولا اسم دومينك.

جربت:

~~~text الناتج
$ curl -sSI -H 'Host: other.test' http://172.18.0.5/
curl: (52) Empty reply from server
$ curl -sSI https://other.test/
curl: (35) OpenSSL/3.0.13: error:0A000458:SSL routines::tlsv1 unrecognized name
~~~

[[(52)]] = الاتصال اتقفل من غير رد (ده [[444]])، و [[(35)]] = الـ TLS فشل، و [[unrecognized name]] يعني السيرفر قال «مش عارف الاسم ده». ونفس [[(35)]] لما طلبت بالـ IP مباشرة على https.

---

## ٥. server الـ HTTP

~~~nginx
  server {
    listen 80; server_name example.com www.example.com;
    location /.well-known/acme-challenge/ { root /var/www/certbot; }
    location / { return 301 https://example.com$request_uri; }
  }
~~~

- [[server_name example.com www.example.com]]: الـ server ده للاسمين دول بس.
- [[location /.well-known/acme-challenge/]]: أي مسار بيبدأ بكده، قدّمه من [[/var/www/certbot]] (فولدر certbot). ده لازم يفضل HTTP عشان التجديد. جربت: الملف رجع [[tok]].
- [[location /]]: كل حاجة تانية. لما مسارين يطابقوا، Nginx بياخد **الأطول** ([[/.well-known/...]] أطول من [[/]]).
- [[return 301 URL]]: تحويل دايم. [[$request_uri]] متغير فيه المسار والـ query كما هم، فـ [[/x?a=1]] بيتحوّل [[https://example.com/x?a=1]].

~~~text الناتج
$ curl -sI http://example.com/x
HTTP/1.1 301 Moved Permanently
Location: https://example.com/x
~~~

---

## ٦. www على https

~~~nginx
  server { listen 443 ssl; http2 on; server_name www.example.com; return 301 https://example.com$request_uri; }
~~~

- [[http2 on;]]: شغّل HTTP/2 على الـ server ده (الطريقة الجديدة من nginx 1.25.1، بدل [[listen 443 ssl http2]]).
- الباقي: حوّل لنفس المسار على الدومين من غير www.

~~~text الناتج
$ curl -sI https://www.example.com/
HTTP/2 301 
location: https://example.com/
~~~

[[HTTP/2]] في أول سطر = [[http2 on]] شغال. والهيدرز في HTTP/2 بتتكتب small دايمًا.

---

## ٧. الـ server الأساسي

~~~nginx
  server {
    listen 443 ssl; http2 on; server_name example.com;
    add_header Strict-Transport-Security "max-age=63072000" always;
    add_header X-Content-Type-Options "nosniff" always;
~~~

- [[add_header NAME VALUE]]: ضيف هيدر للرد. و [[always]]: حتى في ردود الأخطاء (404 و 500)، من غيرها بيتضاف للردود الناجحة بس.
- [[Strict-Transport-Security]] (HSTS): «يا متصفح، الموقع ده https بس لمدة [[63072000]] ثانية» (= ٧٣٠ يوم = سنتين). بعد أول زيارة، المتصفح بيحوّل لـ https لوحده من غير ما يكلّم HTTP خالص.
- [[X-Content-Type-Options: nosniff]]: متخمّنش نوع الملف، صدّق الـ [[Content-Type]]. بيمنع ملف نصي يتنفّذ كـ JavaScript.

~~~text الناتج
$ curl -sI https://example.com/
HTTP/2 200 
server: nginx/1.31.6
strict-transport-security: max-age=63072000
x-content-type-options: nosniff
~~~

### [[location /]]: الـ proxy

~~~nginx
    location / {
      proxy_pass http://app:3000;
      proxy_set_header Host $host;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
      proxy_buffer_size 128k; proxy_buffers 4 256k; proxy_busy_buffers_size 256k;
      limit_req zone=perip burst=20 nodelay;
    }
~~~

| الـ directive | معناه |
|---|---|
| [[proxy_pass http://app:3000]] | ابعت الطلب لـ Next.js. [[app]] اسم الخدمة في compose، و Docker بيحوّله IP |
| [[Host $host]] | ابعت الدومين الأصلي ([[example.com]]) بدل [[app:3000]] |
| [[X-Forwarded-For]] | IP الزائر الحقيقي. [[$proxy_add_x_forwarded_for]] = القيمة اللي جت + IP الزائر |
| [[X-Forwarded-Proto $scheme]] | [[$scheme]] = [[https]]، فـ Next.js يعرف إن الطلب الأصلي كان آمن |
| [[proxy_buffer_size 128k]] | مساحة لهيدرز رد التطبيق. الكوكيز الكبيرة (مكتبات auth) بتعدّي الافتراضي 4k أو 8k فيطلع [[502]] |
| [[proxy_buffers 4 256k]] | ٤ مساحات × ٢٥٦k لجسم الرد |
| [[proxy_busy_buffers_size 256k]] | الجزء اللي ممكن يتبعت للزائر وباقي الرد لسه جاي. لازم يبقى ≥ [[proxy_buffer_size]] |
| [[limit_req zone=perip burst=20 nodelay]] | طبّق العدّاد: ١٠ في الثانية + دفعة ٢٠ زيادة تتخدم على طول، وأكتر من كده [[503]] |

### الـ rate limit في الحقيقة

بعت ٤٠ طلب ورا بعض بأسرع ما يمكن من نفس الـ IP:

~~~text الناتج
     27 200
     13 503
~~~

أول طلب + ٢٠ (الـ burst) + حوالي ٦ اتفتحلهم مكان لأن العدّاد بيفضى بمعدّل ١٠ في الثانية والطلبات خدت جزء من ثانية. الباقي [[503 Service Unavailable]] (الكود الافتراضي لـ [[limit_req]]).

### [[location /_next/static/]]: كاش سنة

~~~nginx
    location /_next/static/ { proxy_pass http://app:3000; add_header Cache-Control "public, max-age=31536000, immutable"; }
~~~

ملفات Next.js في المسار ده أساميها فيها hash بيتغير مع كل build، فالملف بنفس الاسم مش هيتغير أبدًا. [[max-age=31536000]] = سنة بالثواني، و [[immutable]] = متسألش السيرفر تاني حتى لو المستخدم عمل refresh، و [[public]] = أي كاش في النص (CDN) يقدر يحفظه.

~~~text الناتج
$ curl -sI https://example.com/_next/static/a1b2.js
HTTP/2 200 
cache-control: public, max-age=31536000, immutable
~~~

ولاحظ: مفيش [[strict-transport-security]] هنا. ده فخ [[add_header]]: الـ location اللي فيه أي [[add_header]] مش بيورث ولا واحد من بتوع الـ server. لو عايزهم، كررهم جوه الـ location.

---

## ملخص الطلبات

| الطلب | النتيجة |
|---|---|
| [[http://example.com/x]] | [[301]] لـ [[https://example.com/x]] |
| [[http://example.com/.well-known/acme-challenge/t1]] | الملف من فولدر certbot |
| [[https://www.example.com/]] | [[301]] لـ [[https://example.com/]] |
| [[https://example.com/]] | [[200]] من Next.js + HSTS + nosniff + gzip |
| [[/_next/static/...]] | [[200]] + كاش سنة (من غير HSTS) |
| Host غريب على 80 | الاتصال يتقفل ([[curl: (52)]]) |
| Host غريب أو IP على 443 | الـ TLS يترفض ([[curl: (35)]]) |
| أكتر من ١٠ في الثانية + ٢٠ | [[503]] |

## الخلاصة

- [[default_server]] بيمسك أي حاجة مش دوميناتك، فمحدش يعرض موقعك على دومينه.
- [[nginx -t]] قبل أي reload. جربته على الملف ده وطلّع [[syntax is ok]] و [[test is successful]].
- [[add_header]] في location بيلغي وراثة كل الـ add_header اللي فوقه.`,
          lines: [
            "عدد الاتصالات لكل worker.",
            "بداية إعدادات HTTP.",
            "أنواع الملفات، وأقصى حجم رفع ٢٠ ميجا.",
            "gzip للنصوص و JSON و SVG، حتى للطلبات اللي جاية من proxy.",
            "عدّاد طلبات لكل IP: ١٠ في الثانية.",
            "الشهادة، لكل server على 443.",
            "المفتاح الخاص.",
            "أي دومين غريب على 80: اقفل الاتصال من غير رد.",
            "أي دومين غريب على 443: ارفض الـ TLS من الأول.",
            "server لـ HTTP:",
            "على 80 للدومين و www.",
            "ملفات تحدي Let's Encrypt من فولدر certbot.",
            "أي حاجة تانية: حوّل لـ https على الدومين الأساسي.",
            "نهاية الـ server.",
            "www على https: حوّل للدومين من غير www.",
            "الـ server الأساسي:",
            "على 443 بـ HTTP/2 للدومين الأساسي.",
            "HSTS: المتصفح يستخدم https بس لمدة سنتين.",
            "متخمّنش نوع الملف.",
            "كل الطلبات:",
            "ابعتها لـ Next.js (اسم الخدمة في compose).",
            "ابعت الدومين الأصلي.",
            "و IP الزائر.",
            "و إن الطلب كان https.",
            "buffers كبيرة للهيدرز والكوكيز الكبيرة.",
            "طبّق الـ rate limit مع دفعة ٢٠.",
            "نهاية الـ location.",
            "ملفات Next.js الثابتة (أساميها فيها hash): كاش سنة.",
            "نهاية الـ server.",
            "نهاية http."
          ],
          sol: R`جربت الملف ده في nginx:alpine بشهادة self-signed و app بيسمع على 3000:

[[nginx -t]] طلّع [[syntax is ok]] و [[test is successful]].
[[curl -I -H "Host: example.com" http://.../x]] طلّع [[HTTP/1.1 301 Moved Permanently]] و [[Location: https://example.com/x]].
[[https://www.example.com]] طلّع [[HTTP/2 301]] و [[location: https://example.com/]].
[[-H "Host: other.test"]] على http طلّع [[curl: (52) Empty reply from server]]، ده الـ [[return 444]]: Nginx بيقفل الاتصال من غير رد. وعلى https [[ssl_reject_handshake]] بيرفض قبل الشهادة ([[tlsv1 unrecognized name]]).
و [[https://example.com]] طلّع [[HTTP/2 200]] ومعاه [[strict-transport-security]] و [[x-content-type-options: nosniff]].

لو [[nginx -t]] قال [[cannot load certificate]] يبقى لسه مفيش شهادة (شوف init-ssl.sh). ولو قال [[host not found in upstream "app"]] يبقى الـ service مش اسمه [[app]] أو مش على نفس الـ network.`
        },
        {
          cmd: "nginx-apply.sh",
          title: "تركيب بلوك في config مشترك من غير ما توقّع Nginx",
          desc: "لما كذا مشروع على سيرفر واحد بيشاركوا Nginx container واحد وملف nginx.conf واحد، كل مشروع يحط البلوك بتاعه بين علامتين. السكربت ده: باك أب، يشيل البلوك القديم ويحط الجديد في نسخة مؤقتة، يختبرها في container مؤقت بنفس الـ image والشبكة، ولو نجح بس يكتبها في الملف الحقيقي ويعمل reload.",
          example: R`#!/usr/bin/env bash
# deploy/nginx-apply.sh deploy/nginx/myapp-ssl.conf
set -euo pipefail
SNIPPET="$__{1:?usage: nginx-apply.sh <snippet.conf>}"
CONF=/home/deploy/shared/nginx/nginx.conf
CTR=shared-nginx
NET=shared_proxy
BEGIN="# >>> myapp (managed)"; END="# <<< myapp"

b=$(grep -cF "$BEGIN" "$CONF" || true); e=$(grep -cF "$END" "$CONF" || true)
[ "$b" = "$e" ] && [ "$b" -le 1 ] || { echo "markers broken in $CONF, fix by hand" >&2; exit 1; }
cp "$CONF" "$CONF.bak.$(date +%Y%m%d%H%M%S)"
ls -1t "$CONF".bak.* | tail -n +6 | xargs -r rm --
TMP=$(mktemp); trap 'rm -f "$TMP" "$TMP.new"' EXIT
sed "/$BEGIN/,/$END/d" "$CONF" > "$TMP"
last=$(grep -n '^}' "$TMP" | tail -1 | cut -d: -f1)
{ head -n $((last - 1)) "$TMP"; echo "    $BEGIN"; cat "$SNIPPET"; echo "    $END"; tail -n +"$last" "$TMP"; } > "$TMP.new"

IMAGE=$(docker inspect -f '{{.Config.Image}}' "$CTR")
docker run --rm --network "$NET" -v "$TMP.new:/etc/nginx/nginx.conf:ro" \
  -v /home/deploy/certbot/conf:/etc/letsencrypt:ro "$IMAGE" nginx -t \
  || { echo "nginx -t failed, $CONF not touched" >&2; exit 1; }

cat "$TMP.new" > "$CONF"
if [ "$(stat -c %i "$CONF")" = "$(docker exec "$CTR" stat -c %i /etc/nginx/nginx.conf)" ]; then
  docker exec "$CTR" nginx -s reload
else
  docker restart "$CTR" >/dev/null
fi`,
          try: "على سيرفر التجربة: شغّل nginx container بملف متركّب، وجرّب السكربت ببلوك سليم، وبعدين ببلوك فيه غلطة (امسح ; من سطر): لازم يقول failed والملف الحقيقي ميتغيّرش والموقع يفضل شغال. وبعدين افتح الملف بـ vim واحفظه، وشغّل السكربت تاني وشوف إنه عمل restart بدل reload.",
          flag: "script",
          deep: {
            why: "لو عدّلت nginx.conf مشترك بإيدك وغلطت، كل المواقع اللي على السيرفر بتقع مع أول restart. السكربت ده بيضمن إن الملف الحقيقي ميتغيّرش إلا بإعدادات اتختبرت، وإن التطبيق بتاعك يلمس البلوك بتاعه بس.",
            how: R`العلامتين [[# >>> myapp]] و [[# <<< myapp]] بيحددوا البلوك بتاعك. [[sed "/BEGIN/,/END/d"]] بيمسح كل السطور من العلامة الأولى للتانية، فالتشغيل مرتين مش بيكرر البلوك. وقبلها بنعد العلامات: لو واحدة موجودة والتانية لأ (حد مسحها بإيده)، الـ sed هيمسح لآخر الملف، فبنقف.

البلوك الجديد بيتحط قبل آخر [[}]] في الملف (قفلة [[http {}]]): [[head]] لحد قبلها، وبعدين البلوك بالعلامات، وبعدين [[tail -n +"$last"]] من القفلة للآخر.

الاختبار: [[docker run --rm]] بنفس الـ image بتاعة Nginx الشغال (نفس النسخة ونفس الـ modules)، والملف الجديد متركّب مكان nginx.conf، والشهادات متركّبة، وعلى نفس الشبكة. الشبكة مهمة لأن [[nginx -t]] بيحاول يحوّل أسامي الـ upstream زي [[app:3000]] لـ IP، ومن غير الشبكة هيفشل بـ host not found حتى لو الإعدادات سليمة.

الكتابة بـ [[cat new > CONF]] مش [[mv]] ولا [[cp]] لملف جديد: [[>]] بيكتب جوه نفس الملف (نفس الـ inode). الـ bind mount في Docker مربوط بالـ inode مش بالاسم، فلو الملف اتبدّل بملف جديد، الـ container هيفضل شايف القديم. عشان كده بنقارن رقم الـ inode برّه وجوه: لو زي بعض [[reload]] (من غير downtime)، ولو مختلفين (حد فتح الملف بـ vim أو [[sed -i]] قبل كده وبدّله) لازم [[restart]] عشان الـ container يتركّب من جديد.

والـ [[.bak]] بيتعمل كل مرة، و [[tail -n +6]] بيسيب آخر ٥ بس.`,
            when: "Nginx واحد مشترك بين كذا مشروع، وكل مشروع محتاج يضيف أو يغيّر البلوك بتاعه من سكربت النشر.",
            mistakes: R`في مشروع حقيقي كان السكربت بيفترض إن آخر [[}]] في الملف هو قفلة http، فلو فيه [[stream {}]] بعده البلوك كان هيتحط غلط (هنا [[nginx -t]] هيمسكها ويرفض). ولو حد مسح علامة النهاية بإيده، كان بيضيف بلوك مكرر، ودلوقتي بيقف. والـ [[.bak]] كانت بتتراكم من غير تنضيف.

والأحسن على المدى الطويل: Nginx المشترك يعمل [[include /etc/nginx/conf.d/*.conf;]] وكل مشروع يحط ملف لوحده، بدل ما كل مشروع يعدّل ملف مشروع تاني.`
          },
          teach: R`## الفكرة: عدّل نسخة، اختبرها، وبعدين بس الملف الحقيقي

السكربت بياخد ملف فيه البلوك بتاع مشروعك (server واحد أو أكتر)، ويحطه في [[nginx.conf]] المشترك بين علامتين. بس مش بيلمس الملف الحقيقي إلا بعد ما النسخة الجديدة تعدّي [[nginx -t]] في container منفصل. وفي الآخر بيختار بين [[reload]] و [[restart]] حسب رقم الـ inode.

جربته كامل على أوبونتو 24.04 جوه Docker (container فيه Docker تاني عامل نفسه السيرفر): شبكة [[shared_proxy]]، و container اسمه [[shared-nginx]] من [[nginx:alpine]] ومتركّب فيه [[/home/deploy/shared/nginx/nginx.conf]]، فيه موقع تاني [[other.test]]، و container [[myapp]] على نفس الشبكة.

---

## ١. المدخلات والثوابت

~~~bash
#!/usr/bin/env bash
# deploy/nginx-apply.sh deploy/nginx/myapp-ssl.conf
set -euo pipefail
SNIPPET="$__{1:?usage: nginx-apply.sh <snippet.conf>}"
CONF=/home/deploy/shared/nginx/nginx.conf
CTR=shared-nginx
NET=shared_proxy
BEGIN="# >>> myapp (managed)"; END="# <<< myapp"
~~~

### [[$__{1:?message}]]

[[$1]] أول argument. و [[:?]] معناها: «لو مش موجود أو فاضي، اطبع الرسالة دي على stderr واخرج بفشل». من غير argument:

~~~text الناتج
./deploy/nginx-apply.sh: line 4: 1: usage: nginx-apply.sh <snippet.conf>
~~~

exit [[1]]. bash بيكتب اسم السكربت ورقم السطر واسم المتغير ([[1]]) قبل رسالتك.

### الباقي

| المتغير | معناه |
|---|---|
| [[CONF]] | ملف Nginx المشترك على السيرفر (متركّب في الـ container) |
| [[CTR]] | اسم container الـ Nginx |
| [[NET]] | شبكة Docker اللي Nginx والتطبيقات عليها |
| [[BEGIN]] و [[END]] | العلامتين اللي بيحددوا البلوك بتاعنا. تعليقات Nginx بتبدأ بـ [[#]]، فـ Nginx بيتجاهلهم |

---

## ٢. العلامات سليمة؟

~~~bash
b=$(grep -cF "$BEGIN" "$CONF" || true); e=$(grep -cF "$END" "$CONF" || true)
[ "$b" = "$e" ] && [ "$b" -le 1 ] || { echo "markers broken in $CONF, fix by hand" >&2; exit 1; }
~~~

- [[grep -c]]: اطبع **عدد** السطور المطابقة بدل السطور نفسها. و [[-F]] (fixed): دوّر على النص حرفيًا، مش كـ regex ([[(]] و [[>]] ملهمش معنى خاص).
- [[|| true]]: [[grep]] بيرجع 1 لو ملقاش حاجة (والعدد [[0]])، وده مش خطأ هنا، فـ [[|| true]] بيمنع [[set -e]] يوقف. العدد بيتطبع برضه.
- الشرط: العددين زي بعض، وأقل من أو يساوي ١ ([[-le]] = less or equal). يعني يا البلوك مش موجود خالص (0 و 0)، يا موجود مرة كاملة (1 و 1).

ليه؟ لو حد مسح سطر النهاية بإيده، الـ [[sed]] تحت هيمسح من علامة البداية **لآخر الملف**. جربت أمسح [[# <<< myapp]]:

~~~text الناتج
markers broken in /home/deploy/shared/nginx/nginx.conf, fix by hand
~~~

exit [[1]] والملف ماتلمسش.

---

## ٣. باك أب، وسيب آخر ٥

~~~bash
cp "$CONF" "$CONF.bak.$(date +%Y%m%d%H%M%S)"
ls -1t "$CONF".bak.* | tail -n +6 | xargs -r rm --
~~~

- نسخة باسم فيه التاريخ والوقت: [[nginx.conf.bak.20261007154719]].
- [[ls -1t]]: سطر لكل ملف، الأحدث الأول. [[tail -n +6]]: من السادس للآخر. [[xargs -r rm --]]: امسحهم، و [[-r]] متشغّلش [[rm]] لو مفيش، و [[--]] معناها «اللي بعدي أسامي ملفات مش options» (احتياط لو اسم بدأ بـ [[-]]).

بعد ٨ تشغيلات، الفولدر فيه ٦ ملفات: [[nginx.conf]] + آخر ٥ باك أب.

---

## ٤. ابني النسخة الجديدة في ملف مؤقت

~~~bash
TMP=$(mktemp); trap 'rm -f "$TMP" "$TMP.new"' EXIT
sed "/$BEGIN/,/$END/d" "$CONF" > "$TMP"
last=$(grep -n '^}' "$TMP" | tail -1 | cut -d: -f1)
{ head -n $((last - 1)) "$TMP"; echo "    $BEGIN"; cat "$SNIPPET"; echo "    $END"; tail -n +"$last" "$TMP"; } > "$TMP.new"
~~~

### [[mktemp]] و [[trap]]

[[mktemp]] بيعمل ملف فاضي باسم عشوائي في [[/tmp]] ويطبع اسمه. و [[trap '...' EXIT]]: امسح الملفين المؤقتين لما السكربت يخرج بأي شكل.

### [[sed "/BEGIN/,/END/d"]]

[[/A/,/B/]] في sed = **مدى**: من أول سطر فيه A لحد أول سطر بعده فيه B. و [[d]] = امسح. يعني: انسخ الملف من غير البلوك القديم (لو موجود). ده اللي بيخلّي التشغيل مرتين ميكررش البلوك.

### آخر [[}]]

- [[grep -n '^}']]: السطور اللي **بتبدأ** بـ [[}]] ([[^]] = أول السطر)، و [[-n]] بيحط رقم السطر قدامها: [[5:}]].
- [[tail -1]]: آخر واحد. و [[cut -d: -f1]]: قسّم على [[:]] وخد الرقم.

ده رقم سطر قفلة [[http {]] (لو مفيش بلوك تاني زي [[stream {}]] بعدها).

### التجميع

[[{ ...; ...; } > file]]: كل ناتج الأوامر اللي جوه يروح لملف واحد، بالترتيب:

1. [[head -n $((last - 1))]]: كل السطور قبل القفلة. [[$((...))]] = حساب.
2. علامة البداية بـ ٤ مسافات.
3. [[cat "$SNIPPET"]]: البلوك بتاعك.
4. علامة النهاية.
5. [[tail -n +"$last"]]: من سطر القفلة لآخر الملف.

ملف التجربة بعد التطبيق:

~~~text nginx.conf
events {}
http {
    server { listen 80 default_server; return 444; }
    server { listen 80; server_name other.test; return 200 "other site\n"; }
    # >>> myapp (managed)
    server {
        listen 80;
        server_name myapp.test;
        location / { proxy_pass http://myapp:80; }
    }
    # <<< myapp
}
~~~

---

## ٥. اختبر في container منفصل

~~~bash
IMAGE=$(docker inspect -f '{{.Config.Image}}' "$CTR")
docker run --rm --network "$NET" -v "$TMP.new:/etc/nginx/nginx.conf:ro" \
  -v /home/deploy/certbot/conf:/etc/letsencrypt:ro "$IMAGE" nginx -t \
  || { echo "nginx -t failed, $CONF not touched" >&2; exit 1; }
~~~

- [[docker inspect -f '{{.Config.Image}}']]: اسم الـ image اللي الـ Nginx الشغال معمول منها ([[nginx:alpine]])، عشان نختبر بنفس النسخة بالظبط. [[-f]] قالب Go بيطلّع خانة واحدة.
- [[docker run --rm]]: container مؤقت يتمسح بعد ما يخلص.
- [[--network "$NET"]]: على نفس الشبكة، عشان [[nginx -t]] بيحوّل أسامي الـ upstream ([[myapp]]) لـ IP.
- [[-v "$TMP.new:/etc/nginx/nginx.conf:ro"]]: ركّب الملف الجديد مكان الإعدادات، [[ro]] = read only.
- [[-v .../certbot/conf:/etc/letsencrypt:ro]]: الشهادات، لأن [[nginx -t]] بيفتح ملفات [[ssl_certificate]].
- [[nginx -t]]: اختبر بس متشغّلش.

جربت من غير [[--network]]، والإعدادات سليمة:

~~~text الناتج
nginx: [emerg] host not found in upstream "myapp" in /etc/nginx/nginx.conf:9
nginx: configuration file /etc/nginx/nginx.conf test failed
~~~

ومع الشبكة وبلوك سليم: [[syntax is ok]] و [[test is successful]] (وقبلهم رسايل [[/docker-entrypoint.sh]] العادية بتاعة الـ image).

وببلوك ناقصه [[;]]:

~~~text الناتج
nginx: [emerg] unexpected "}" in /etc/nginx/nginx.conf:9
nginx: configuration file /etc/nginx/nginx.conf test failed
nginx -t failed, /home/deploy/shared/nginx/nginx.conf not touched
~~~

الـ [[md5sum]] بتاع الملف الحقيقي فضل زي ما هو، والموقع فضل بيرد [[200]].

---

## ٦. اكتب، و reload أو restart

~~~bash
cat "$TMP.new" > "$CONF"
if [ "$(stat -c %i "$CONF")" = "$(docker exec "$CTR" stat -c %i /etc/nginx/nginx.conf)" ]; then
  docker exec "$CTR" nginx -s reload
else
  docker restart "$CTR" >/dev/null
fi
~~~

### [[cat new > CONF]]

[[>]] بيفضّي الملف الموجود ويكتب جواه، فالملف يفضل **نفس الملف** (نفس رقم الـ inode). [[mv]] أو [[cp]] لملف جديد كانوا هيعملوا ملف تاني برقم تاني.

### المقارنة

[[stat -c %i]]: اطبع رقم الـ inode بس ([[%i]]). مرة على السيرفر، ومرة جوه الـ container ([[docker exec]]). الـ bind mount لملف واحد مربوط بالـ inode اللي كان موجود وقت تشغيل الـ container.

| الحالة | السيرفر | الـ container | السكربت عمل |
|---|---|---|---|
| عادي | [[460640]] | [[460640]] | [[nginx -s reload]] |
| بعد [[mv]] ملف مكانه (زي ما vim ساعات بيعمل) | [[517459]] | [[460640]] | [[docker restart]] |

في الحالة التانية الـ container كان لسه شايف الملف القديم، فـ reload كان هيقرا النسخة القديمة من غير ما يقول. [[docker restart]] بيركّب الملف من جديد، و [[StartedAt]] اتغيّر:

~~~text الناتج
2026-10-07T15:47:11.371087091Z -> 2026-10-07T15:47:38.23432744Z
~~~

وبعدها الرقمين بقوا [[517459]] الاتنين.

### النتيجة

بعد التطبيق، [[curl -H "Host: myapp.test" localhost:8080]] رجّع صفحة [[myapp]]، والموقع التاني [[other.test]] فضل شغال. والتشغيل التاني بنفس البلوك ما غيّرش الـ [[md5sum]] (البلوك اتشال واتحط تاني زي ما هو)، والعلامة موجودة مرة واحدة.

---

## ملخص الخطوات

| # | الخطوة | لو فشلت |
|---|---|---|
| ١ | [[$__{1:?}]]: فيه ملف بلوك؟ | رسالة استخدام |
| ٢ | عدّ العلامات | [[markers broken]]، والملف زي ما هو |
| ٣ | باك أب + سيب ٥ | |
| ٤ | [[sed]] يشيل القديم، و [[head]]/[[cat]]/[[tail]] يحطوا الجديد في ملف مؤقت | |
| ٥ | [[nginx -t]] في container مؤقت على نفس الشبكة | [[not touched]] |
| ٦ | [[cat > CONF]] ثم reload أو restart حسب الـ inode | |

## الخلاصة

- الملف الحقيقي بيتغيّر بس بعد ما النسخة الجديدة تعدّي [[nginx -t]].
- [[>]] بيحافظ على الـ inode، و [[mv]] بيغيّره، والـ bind mount بيفضل على القديم.
- العلامات + [[sed '/A/,/B/d']] = تشغيل مرتين يدّي نفس النتيجة.`,
          lines: [
            "أي فشل يوقف السكربت.",
            "ملف البلوك من أول argument، ولو مش موجود اطبع طريقة الاستخدام واقف.",
            "ملف Nginx المشترك على السيرفر.",
            "اسم الـ container بتاع Nginx.",
            "الشبكة اللي Nginx والتطبيقات عليها.",
            "علامة البداية والنهاية للبلوك بتاعنا.",
            "عدّ كل علامة موجودة كام مرة.",
            "لو العدد مش متساوي أو أكتر من واحد، اقف.",
            "باك أب بالتاريخ.",
            "سيب آخر ٥ باك أب بس.",
            "ملف مؤقت، ويتمسح في الآخر مهما حصل.",
            "انسخ الملف من غير البلوك القديم.",
            "رقم سطر آخر [[}]] في الملف.",
            "اللي قبلها، والبلوك الجديد بين العلامات، وبعدين القفلة وما بعدها، في ملف جديد.",
            "اسم الـ image بتاعة Nginx الشغال.",
            "اختبر الملف الجديد في container مؤقت على نفس الشبكة...",
            "...ومعاه الشهادات...",
            "...ولو فشل اقف والملف الحقيقي زي ما هو.",
            "اكتب الجديد جوه نفس الملف (نفس الـ inode).",
            "لو الـ container شايف نفس الملف...",
            "...reload من غير downtime.",
            "وإلا...",
            "...restart عشان يتركّب الملف من جديد.",
            "نهاية الـ if."
          ],
          sol: R`جربته على nginx container بملف متركّب:

ببلوك سليم: [[nginx -t]] عدّى، والملف الحقيقي بقى فيه البلوك بين [[# >>> myapp (managed)]] و [[# <<< myapp]] قبل آخر [[}]]، واتعمل [[nginx -s reload]]، والـ server الجديد رد. وتشغيله تاني مابيكرّرش البلوك، بيستبدله.
ببلوك ناقصه [[;]]: طلّع [[nginx: configuration file /etc/nginx/nginx.conf test failed]] و [[nginx -t failed, ... not touched]]، والـ md5 بتاع الملف ماتغيّرش والموقع فضل شغال. ده لأن الفحص بيحصل على نسخة مؤقتة في container منفصل.
بعد ما الملف اتحفظ بطريقة بتغيّر الـ inode (زي vim أو [[cp x; mv x nginx.conf]])، رقم الـ inode على الجهاز بقى مختلف عن اللي جوه الـ container، فالسكربت عمل [[docker restart]] بدل reload ([[StartedAt]] اتغيّر).

السبب: bind mount لملف واحد بيمسك الـ inode القديم، فـ reload كان هيقرا النسخة القديمة من غير ما يقولك. ولو [[markers broken]] ظهر، يبقى حد مسح سطر من العلامتين بإيده.`
        },
        {
          cmd: "dashboard_users.sh",
          title: "يوزر وباسورد لكل موظف على لوحة ورا Nginx",
          desc: "لوحة داخلية ورا Nginx basic auth، بس بدل باسورد واحد للكل، كل موظف ليه يوزر (الكود بتاعه) وباسورد عشوائي. السكربت بيجيب الموظفين النشطين من Postgres، يولّد باسوردات، يضيفهم لملف htpasswd، ويطبع جدول مرة واحدة تديه للموظفين.",
          example: R`#!/usr/bin/env bash
# sudo bash deploy/nginx/dashboard_users.sh           كل الموظفين النشطين
# sudo bash deploy/nginx/dashboard_users.sh ali sara  باسورد جديد لناس معينين
set -euo pipefail
AUTH=/etc/nginx/.htpasswd-dashboard
cd "$(dirname "$0")/../.."
q() { docker compose exec -T postgres psql -U app -d appdb -tAc "$1"; }
[ -f "$AUTH" ] || { echo "first time: htpasswd -cB $AUTH admin" >&2; exit 1; }

if [ $# -gt 0 ]; then CODES="$*"
else CODES=$(q "SELECT lower(code) FROM staff WHERE is_active AND code IS NOT NULL ORDER BY code"); fi

printf '%-8s %-20s %s\n' code name password
for code in $CODES; do
  [[ "$code" =~ ^[a-z0-9]+$ ]] || { echo "skip bad code: $code" >&2; continue; }
  name=$(q "SELECT display_name FROM staff WHERE lower(code) = '$code' AND is_active")
  [ -n "$name" ] || { echo "$code not active, skipped" >&2; continue; }
  pass=$(openssl rand -base64 12 | tr -d '/+=' | cut -c1-10)
  printf '%s\n' "$pass" | htpasswd -iB "$AUTH" "$code" 2>/dev/null
  printf '%-8s %-20s %s\n' "$code" "$name" "$pass"
done
nginx -t -q && systemctl reload nginx || echo "nginx -t failed, not reloaded" >&2`,
          try: "على سيرفر التجربة: [[sudo apt install apache2-utils]]، واعمل الملف بـ [[htpasswd -cB]]، وجرّب السكربت بكودين مكتوبين بإيدك. بعدين جرّب كود فيه علامة تنصيص (زي [[a'b]]): لازم يتعدّى بـ skip. وافتح اللوحة بيوزر منهم.",
          flag: "script",
          deep: {
            why: "باسورد واحد متشارك معناه إنك مش هتعرف مين عمل إيه، ولو موظف ساب لازم تغيّر الباسورد للكل. يوزر لكل واحد بيحل الاتنين، و Nginx بيبعت اسم اليوزر للتطبيق.",
            how: R`[[q]] دالة صغيرة بتشغّل SQL جوه container بتاع Postgres: [[-t]] من غير عناوين أعمدة، و [[-A]] من غير محاذاة، فالناتج قيم خام تنفع في لوب. و [[-T]] في [[exec]] عشان السكربت مش terminal.

[[$#]] عدد الـ arguments: لو كتبت أكواد، بيجدد ليهم بس، وإلا بيجيب كل النشطين.

الـ regex [[^[a-z0-9]+$]] بيقبل حروف صغيرة وأرقام بس، وده اللي بيخلي حط [[$code]] جوه SQL آمن: أي علامة تنصيص أو مسافة بتترفض قبل ما توصل للاستعلام.

[[openssl rand -base64 12]] بيطلع ١٦ حرف عشوائي، و [[tr -d '/+=']] بيشيل الرموز اللي بتلخبط لما حد ينقلها، و [[cut -c1-10]] بياخد ١٠.

[[htpasswd -iB]]: [[-i]] ياخد الباسورد من stdin بدل سطر الأوامر، و [[-B]] يشفّره بـ bcrypt. الباسورد في سطر الأوامر ([[-b]]) بيبان لأي يوزر على السيرفر في [[ps]] طول ما الأمر شغال.

[[printf '%-8s']] بيطبع النص في عمود عرضه ٨ على الشمال، فالجدول يطلع مترتب.

وفي Nginx: [[auth_basic "Dashboard"; auth_basic_user_file /etc/nginx/.htpasswd-dashboard;]] جوه location اللوحة، و [[proxy_set_header X-Remote-User $remote_user;]] عشان التطبيق يعرف مين. ولما موظف يمشي: [[htpasswd -D /etc/nginx/.htpasswd-dashboard ali]].`,
            when: "لوحة داخلية أو أداة admin لفريق صغير، ومش عايز تبني نظام تسجيل دخول كامل.",
            mistakes: "في مشروع حقيقي كان السكربت بيحط [[$code]] جوه SQL مباشرة من غير أي فحص، فلو اتبعت كـ argument وفيه علامة تنصيص يبقى SQL injection. وكان بيستخدم [[htpasswd -bB]] فالباسورد بيبان في [[ps]]. ولو [[nginx -t]] فشل مكانش بيطبع أي حاجة، فتفتكر إن كله تمام. وخد بالك إن الباسوردات بتتطبع على الشاشة وبتفضل في الـ scrollback، فبعد ما توزّعها اعمل [[clear]]."
          },
          teach: R`## الفكرة: من قاعدة البيانات لملف htpasswd

Nginx عنده حماية بسيطة اسمها **basic auth**: المتصفح بيطلب يوزر وباسورد، و Nginx بيقارنهم بملف [[htpasswd]] (سطر لكل يوزر: الاسم والباسورد متشفّر). السكربت بيملا الملف ده: يجيب أكواد الموظفين النشطين من Postgres، يعمل لكل واحد باسورد عشوائي، يحطه في الملف، ويطبع جدول تديه للموظفين.

جربته على أوبونتو 24.04 جوه Docker (container فيه Docker تاني): مشروع compose فيه خدمة [[postgres]] ([[postgres:16-alpine]]) وجدول [[staff]] فيه ٥ صفوف، و Nginx متسطب على «السيرفر» نفسه. الفرق الوحيد: مفيش systemd جوه container، فآخر سطر اتشغّل بـ [[nginx -s reload]] بدل [[systemctl reload nginx]] (نفس النتيجة).

---

## ١. الإعداد

~~~bash
set -euo pipefail
AUTH=/etc/nginx/.htpasswd-dashboard
cd "$(dirname "$0")/../.."
~~~

- [[set -euo pipefail]]: أي فشل يوقف، ومتغير مش متعرّف خطأ، والـ pipe يفشل لو أي حتة فيه فشلت.
- [[AUTH]]: ملف اليوزرز. بيبدأ بنقطة فمخفي، وفي [[/etc/nginx]] فمش جوه أي فولدر بيتقدّم للناس.
- [[cd "$(dirname "$0")/../.."]]: السكربت في [[deploy/nginx/]]، فـ [[../..]] بيطلع فولدرين لفولدر المشروع اللي فيه [[compose.yml]]، عشان [[docker compose]] يلاقي الخدمة.

والتعليقات في أول الملف بتقول يتشغّل بـ [[sudo]]: لأن الكتابة في [[/etc/nginx]] وعمل reload محتاجين root.

---

## ٢. دالة [[q]]: SQL في سطر

~~~bash
q() { docker compose exec -T postgres psql -U app -d appdb -tAc "$1"; }
~~~

| الجزء | معناه |
|---|---|
| [[docker compose exec -T postgres]] | نفّذ أمر جوه container خدمة [[postgres]]. [[-T]] من غير terminal (السكربت مش تفاعلي) |
| [[psql -U app -d appdb]] | عميل Postgres، باليوزر [[app]] وقاعدة [[appdb]] |
| [[-t]] | tuples only: من غير عناوين الأعمدة ولا سطر [[(2 rows)]] |
| [[-A]] | unaligned: من غير مسافات المحاذاة و [[|]] |
| [[-c "$1"]] | نفّذ الاستعلام ده واخرج |

الفرق في الناتج، نفس الجدول:

~~~text من غير -tA
 code | display_name 
------+--------------
 ALI  | Ali Hassan
 sara | Sara Adel
(2 rows)
~~~

~~~text مع -tA (قيمة في كل سطر)
ali
a1
sara
~~~

الشكل التاني ينفع على طول في [[for]].

---

## ٣. الملف موجود؟

~~~bash
[ -f "$AUTH" ] || { echo "first time: htpasswd -cB $AUTH admin" >&2; exit 1; }
~~~

لو الملف مش موجود، السكربت مش بيعمله لوحده، بيقولك تعمله بإيدك:

~~~text الناتج
first time: htpasswd -cB /etc/nginx/.htpasswd-dashboard admin
~~~

exit [[1]]. و [[htpasswd -cB]]: [[-c]] = create (اعمل الملف، **وامسحه لو موجود**)، و [[-B]] = bcrypt. عشان كده [[-c]] مش في السكربت: تشغيله غلط مرة كان هيمسح كل اليوزرز. أول مرة:

~~~text الناتج
Adding password for user admin
~~~

---

## ٤. مين نعمله باسورد؟

~~~bash
if [ $# -gt 0 ]; then CODES="$*"
else CODES=$(q "SELECT lower(code) FROM staff WHERE is_active AND code IS NOT NULL ORDER BY code"); fi
~~~

- [[$#]]: عدد الـ arguments. [[-gt 0]] = greater than 0.
- لو كتبت أكواد ([[sudo bash ... ali sara]]): [[$*]] كلهم في نص واحد بمسافات.
- لو لأ: كل الموظفين النشطين ([[is_active]] صح) اللي ليهم كود، بحروف صغيرة ([[lower]]).

---

## ٥. اللوب

~~~bash
printf '%-8s %-20s %s\n' code name password
for code in $CODES; do
~~~

[[printf FORMAT values]]: اطبع القيم حسب الشكل. [[%s]] = نص، و [[%-8s]] = نص في عمود عرضه ٨، و [[-]] = على الشمال (والباقي مسافات). [[\n]] = سطر جديد. فالعناوين والصفوف بتطلع تحت بعض بالظبط.

[[for code in $CODES]] من غير علامات تنصيص عن قصد: الأكواد بتتقسم على المسافات والسطور الجديدة، فكل كود لفّة.

### الفحص الأمني

~~~bash
  [[ "$code" =~ ^[a-z0-9]+$ ]] || { echo "skip bad code: $code" >&2; continue; }
~~~

- [[[[ ... ]]]]: الاختبار المتطور في bash، وفيه [[=~]] = طابق regex.
- [[^[a-z0-9]+$]]: من أول النص ([[^]]) لآخره ([[$]])، حرف أو أكتر ([[+]]) من a لـ z أو 0 لـ 9.
- [[continue]]: سيب الكود ده وروح للي بعده.

ليه مهم؟ لأن [[$code]] هيتحط **جوه** نص الـ SQL تحت. كود فيه [[']] كان هيقفل النص ويكمّل SQL من عنده (SQL injection). بالـ regex ده مفيش غير حروف وأرقام توصل للاستعلام.

### الاسم، والموظف نشط؟

~~~bash
  name=$(q "SELECT display_name FROM staff WHERE lower(code) = '$code' AND is_active")
  [ -n "$name" ] || { echo "$code not active, skipped" >&2; continue; }
~~~

لو الموظف مش نشط أو الكود مش موجود، الاستعلام بيرجع ولا حاجة، و [[-n]] (النص مش فاضي) بيفشل، فنعدّيه.

### باسورد عشوائي

~~~bash
  pass=$(openssl rand -base64 12 | tr -d '/+=' | cut -c1-10)
~~~

- [[openssl rand 12]]: ١٢ byte عشوائي. و [[-base64]]: اكتبهم حروف، فكل ٣ bytes = ٤ حروف، يعني ١٦ حرف: [[ls+XTZnLvEEkuYO+]].
- [[tr -d '/+=']]: امسح الـ [[/]] و [[+]] و [[=]]، دول بيتلخبطوا لما حد يكتبهم أو ينقلهم.
- [[cut -c1-10]]: خد أول ١٠ حروف: [[pnGNA2TaBp]].

### احفظه

~~~bash
  printf '%s\n' "$pass" | htpasswd -iB "$AUTH" "$code" 2>/dev/null
  printf '%-8s %-20s %s\n' "$code" "$name" "$pass"
done
~~~

- [[htpasswd -i]]: اقرا الباسورد من stdin (من الـ pipe). البديل [[-b]] بياخده في سطر الأوامر، وده بيبان لأي يوزر على السيرفر في [[ps]] طول ما الأمر شغال.
- [[-B]]: bcrypt. ومن غير [[-c]]: لو اليوزر موجود يتحدّث، ولو لأ يتضاف.
- [[2>/dev/null]]: ارمي رسالة [[Adding password for user...]] عشان الجدول يفضل نضيف.
- آخر سطر: صف في الجدول.

---

## ٦. reload

~~~bash
nginx -t -q && systemctl reload nginx || echo "nginx -t failed, not reloaded" >&2
~~~

[[nginx -t -q]]: اختبر الإعدادات، و [[-q]] = quiet (من غير رسايل لو سليمة). لو نجح، reload. لو فشل، اطبع. وشكل [[a && b || c]] مش بيوقف السكربت مع [[set -e]].

جربت ملف إعدادات بايظ جنب الإعدادات:

~~~text الناتج
nginx: [emerg] unknown directive "broken" in /etc/nginx/sites-enabled/bad:1
nginx: configuration file /etc/nginx/nginx.conf test failed
nginx -t failed, not reloaded
~~~

وخد بالك: Nginx بيقرا ملف الـ htpasswd مع كل طلب، فالباسوردات الجديدة بتشتغل حتى من غير reload. الـ reload هنا احتياط، والأهم إن [[nginx -t]] بيقولك لو فيه حاجة بايظة.

---

## التشغيل

كل النشطين (الجدول فيه [[ALI]] نشط، و [[sara]] و [[a1]] نشطين، و [[omar]] مش نشط، وواحد من غير كود):

~~~text الناتج
code     name                 password
ali      Ali Hassan           y43sNlLHwJ
a1       Mona Ali             qwFLGAhKhU
sara     Sara Adel            0EpCDkgSaX
~~~

[[ALI]] اتكتب [[ali]] بسبب [[lower]]. والترتيب بالكود الأصلي ([[ORDER BY code]])، والحروف الكبيرة بتيجي الأول.

بأكواد بإيدك فيها أكواد غلط:

~~~bash
sudo bash deploy/nginx/dashboard_users.sh sara "a'b" omar Ali "x;rm"
~~~

~~~text الناتج
code     name                 password
skip bad code: a'b
sara     Sara Adel            S5ExDjNWf2
omar not active, skipped
skip bad code: Ali
skip bad code: x;rm
~~~

الأكواد بالإيد مش بتتحوّل small، فـ [[Ali]] اترفض. والملف بقى فيه سطور زي:

~~~text .htpasswd-dashboard (أول ٣٠ حرف)
admin:$2y$05$P/Mtq7E7VoX3dVQkz
sara:$2y$05$IOZxUK6oMJNRK4QRAi
~~~

[[$2y$]] = bcrypt، و [[05]] = الـ cost (عدد جولات التشفير، كل زيادة ١ بتضاعف الوقت). والتحقق:

~~~text الناتج
$ htpasswd -vb /etc/nginx/.htpasswd-dashboard sara <الباسورد>
Password for user sara correct.
$ htpasswd -vb /etc/nginx/.htpasswd-dashboard sara wrong
password verification failed
~~~

---

## في Nginx

~~~nginx
location / {
  auth_basic "Dashboard";
  auth_basic_user_file /etc/nginx/.htpasswd-dashboard;
}
~~~

[[auth_basic "Dashboard"]] بيشغّل الحماية، والنص هو الـ realm اللي بيظهر في الهيدر. جربت:

~~~text الناتج
من غير يوزر:        401   WWW-Authenticate: Basic realm="Dashboard"
sara بالباسورد:     200
sara بباسورد غلط:   401
بعد htpasswd -D:    401
~~~

[[htpasswd -D FILE user]] (D = delete) بيمسح اليوزر، والدخول اترفض على طول من غير reload.

> فخ لقيته في التجربة: لو الـ location فيه [[return 200 ...]]، الحماية مش بتشتغل وأي حد بياخد 200. [[return]] بيتنفّذ في مرحلة قبل مرحلة [[auth_basic]]. خليها على ملفات أو [[proxy_pass]].

---

## ملخص

| # | الخطوة | الأمر |
|---|---|---|
| ١ | الملف موجود؟ | [[[ -f "$AUTH" ]]] |
| ٢ | مين؟ | arguments أو [[SELECT ... is_active]] |
| ٣ | الكود سليم؟ | regex [[^[a-z0-9]+$]] |
| ٤ | نشط؟ | [[SELECT display_name]] |
| ٥ | باسورد | [[openssl rand]] ← [[tr]] ← [[cut]] |
| ٦ | احفظ | [[htpasswd -iB]] من stdin |
| ٧ | reload | [[nginx -t -q && reload]] |

## الخلاصة

- أي قيمة هتدخل جوه SQL كنص لازم تتفحص الأول، والـ regex الضيق أبسط فحص.
- الباسورد يدخل [[htpasswd]] من stdin ([[-i]])، مش سطر الأوامر ([[-b]]).
- [[-c]] بيمسح الملف، فبيتعمل مرة واحدة بإيدك.`,
          lines: [
            "أي فشل يوقف السكربت (مع استثناءات [[||]] المقصودة).",
            "ملف اليوزرز والباسوردات بتاع Nginx.",
            "روح لفولدر المشروع (فين ما كان السكربت).",
            "دالة بتشغّل SQL في Postgres وترجع النتيجة خام.",
            "لو الملف مش موجود، قول تعمله إزاي واقف.",
            "لو كتبت أكواد، استخدمها...",
            "...وإلا هات أكواد كل الموظفين النشطين.",
            "عنوان الجدول.",
            "لف على الأكواد:",
            "لو الكود فيه أي حاجة غير حروف صغيرة وأرقام، عدّيه.",
            "هات اسم الموظف لو نشط.",
            "لو مش نشط، عدّيه.",
            "باسورد عشوائي ١٠ حروف من غير رموز.",
            "ضيفه أو حدّثه في الملف، والباسورد من stdin مش من سطر الأوامر.",
            "اطبع صف في الجدول.",
            "نهاية اللوب.",
            "لو إعدادات Nginx سليمة اعمل reload، وإلا قول."
          ],
          sol: R`بكودين بإيدك ([[ali sara]]) الناتج جدول:

[[code     name                 password]]
[[ali      Ali Hassan           OJWX0aIkY5]]

الباسورد ١٠ حروف من غير [[/+=]]. وجوه [[.htpasswd-dashboard]] بيتضاف سطر زي [[ali:$2y$05$...]] (bcrypt). جربت [[htpasswd -iB]] والتحقق بـ [[htpasswd -vb]] قال [[Password for user ali correct.]]. الجدول ده بيظهر مرة واحدة بس، ابعته لكل موظف من طريق آمن.

كود زي [[a'b]] بيتطبع على stderr [[skip bad code: a'b]] ومايتبعتش لـ psql خالص، لأن الـ regex [[^[a-z0-9]+$]] بيقفل الـ SQL injection في الاستعلام اللي فيه [[$code]]. جربت الـ regex: [[a'b]] و [[x;rm]] اتعدّوا، وكمان [[Ali]] بحرف كبير اتعدّى، فاكتب الأكواد small. ولو الكود مش موجود أو مش active: [[ali not active, skipped]].

وافتح اللوحة: المتصفح بيطلب يوزر وباسورد، ولو غلط [[401]]. (جربت السكربت كله على Postgres 16 في compose و Nginx على السيرفر، بس بـ [[nginx -s reload]] بدل [[systemctl reload nginx]] لأن التجربة كانت جوه container من غير systemd.)`
        }
      ]
    }
]);
