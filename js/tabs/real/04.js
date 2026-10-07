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
    }
]);
