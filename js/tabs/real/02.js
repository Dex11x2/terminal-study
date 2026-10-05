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

وافتح اللوحة: المتصفح بيطلب يوزر وباسورد، ولو غلط [[401]]. (جربت htpasswd والـ regex، مش Nginx و Postgres الحقيقيين.)`
        }
      ]
    }
]);
