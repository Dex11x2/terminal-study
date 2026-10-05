// تكملة تاب real: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/real/01.js (شرح حقول الدرس في أوله)
MORE("real", [
    {
      t: "سكربتات الصيانة",
      l: 3,
      n: "migrations بالترتيب، و Makefile، و dry-run قبل أي تعديل في البيانات، وإمتى متمسحش كل حاجة",
      items: [
        {
          cmd: "apply-migrations.sh",
          title: "تطبيق ملفات SQL بالترتيب بملخص نجاح وفشل",
          desc: R`بدل ما تنسخ كل ملف SQL وتلصقه في SQL Editor بإيدك، السكربت بيعدّي على قايمة ملفات بالترتيب، وكل ملف في transaction لوحده. لو ملف فشل بيسألك تكمل ولا توقف، وفي الآخر بيطبع كام نجح وكام فشل.

الأصلي كان بيبعت الـ SQL لـ REST endpoint بمفتاح service_role. النسخة دي بتستخدم psql مباشرة، ودا الصح.`,
          example: R`#!/usr/bin/env bash
set -uo pipefail
set -a; . ./.env.local; set +a
: "$__{DATABASE_URL:?DATABASE_URL missing in .env.local}"
migrations=(
  01_add_courses_instructor_fkey.sql
  02_fix_transactions_foreign_keys.sql
  03_ensure_exams_module_id.sql
)
ok=0; fail=0
for m in "$__{migrations[@]}"; do
  f="database/migrations/$m"
  [ -f "$f" ] || { echo "missing: $f"; fail=$((fail+1)); continue; }
  echo "applying $m ..."
  if psql "$DATABASE_URL" -v ON_ERROR_STOP=1 --single-transaction -f "$f"; then
    ok=$((ok+1))
  else
    fail=$((fail+1))
    read -rp "failed. continue? (y/n): " choice
    [ "$choice" = y ] || break
  fi
done
echo "ok: $ok/$__{#migrations[@]}  failed: $fail"
[ "$fail" -eq 0 ] && docker compose restart app`,
          try: "على Postgres تجريبي اعمل تلات ملفات: الأول create table، والتاني فيه غلطة إملائية في SQL، والتالت insert. شغّل السكربت وجاوب n عند الفشل، وتأكد بـ psql إن الملف التاني مسابش أي أثر (بسبب --single-transaction).",
          flag: "script",
          deep: {
            why: "النسخ واللصق في SQL Editor بيتلخبط فيه الترتيب، وبتنسى ملف، ومفيش سجل باللي اتعمل. سكربت بقايمة ثابتة بيتكرر بنفس الشكل على staging والإنتاج.",
            how: R`[[set -uo pipefail]] من غير [[-e]] عن قصد: عايزين لو psql فشل السكربت يكمّل للـ else ويسألك، مش يقع.

[[migrations=( ... )]] array بالترتيب اللي هيتطبق بيه. و [[$__{migrations[@]}]] بين علامات تنصيص بيطلّع كل عنصر لوحده.

[[-v ON_ERROR_STOP=1]] بيخلي psql يقف عند أول خطأ ويرجع exit code غير صفر، من غيره بيكمّل الملف ويرجع 0. و [[--single-transaction]] بيلف الملف كله في BEGIN و COMMIT: يا يتطبق كله يا ولا حاجة.

[[read -rp]] بيسأل ويستنى. و [[$((ok+1))]] حساب في bash. و [[$__{#migrations[@]}]] عدد العناصر.

وآخر سطر: لو مفيش فشل، أعد تشغيل التطبيق عشان يشوف الـ schema الجديد. ولو فيه فشل، الـ exit code بتاع السكربت كله بيبقى 1.`,
            when: "مشروع عنده ملفات SQL قديمة من غير أداة migrations. لو بتبدأ جديد، استخدم [[supabase db push]] أو Prisma migrate، لأنهم بيسجّلوا اللي اتطبق. psql في تاب PostgreSQL، و arrays في تاب bash.",
            mistakes: R`في مشروع حقيقي كان السكربت بيبعت الـ SQL لـ [[/rest/v1/rpc/exec]]. الدالة دي مش موجودة في Supabase من الأول، ولو حد عملها يبقى فتح تنفيذ أي SQL من REST بمفتاح service_role. ده باب لأي حد معاه المفتاح يمسح القاعدة كلها.

والمفتاح كان ظاهر في arguments بتاعة curl، يعني [[ps]] يوريه. والـ project ref مكتوب في السكربت. ومكانش فيه ON_ERROR_STOP، و [[head -n-1]] بيشتغل على GNU بس (مش ماك).

ومفيش جدول بيسجّل الـ migrations اللي اتطبقت، فممكن ملف يتطبق مرتين. وسكربت تاني كان بيقرا connection string فيه باسورد بـ [[read]] من غير [[-s]]، فالباسورد بيظهر على الشاشة وبيتسجل في أي تسجيل للترمنال.`
          },
          lines: [
            "pipefail ومتغيرات لازم تبقى معرّفة، من غير -e عشان نسأل عند الفشل.",
            "اقرا .env.local واعمل export.",
            "لازم DATABASE_URL.",
            "القايمة بالترتيب:",
            "الملف الأول.",
            "التاني.",
            "التالت.",
            "قفلة القايمة.",
            "عدّادات.",
            "لكل ملف:",
            "المسار الكامل.",
            "مش موجود؟ اعدّه فشل وكمّل.",
            "اطبع اسمه.",
            "طبّقه في transaction واحدة ووقف عند أول خطأ.",
            "نجح: زوّد العدّاد.",
            "فشل:",
            "زوّد عدّاد الفشل.",
            "اسأل.",
            "أي حاجة غير y: وقّف.",
            "قفلة الـ if.",
            "قفلة اللوب.",
            "الملخص.",
            "كله نجح؟ أعد تشغيل التطبيق."
          ],
          sol: R`جربتها على Postgres: الملف الأول [[create table courses]]، التاني فيه [[create table exams]] وبعده [[ALTR TABLE ...]] غلط، والتالت insert. الناتج مع جواب [[n]]:

[[applying 01_... CREATE TABLE]]
[[applying 02_... CREATE TABLE]]
[[ERROR:  syntax error at or near "ALTR"]]
[[ok: 1/3  failed: 1]] والـ exit [[1]]، ومفيش restart للـ app.

و [[\dt]] بعدها وراني [[courses]] بس، مفيش [[exams]]، رغم إن psql طبع [[CREATE TABLE]] ليه. ده [[--single-transaction]]: الملف كله transaction واحدة، فالغلطة رجّعت كل اللي قبلها في نفس الملف. والملف التالت ماتنفّذش لأنك قلت n.

من غير [[--single-transaction]] كان [[exams]] هيفضل موجود والملف نص متطبّق، وتشغيله تاني هيقع على [[already exists]]. ومن غير [[ON_ERROR_STOP=1]]، psql كان هيكمّل بعد الغلطة ويرجّع exit 0.`
        },
        {
          cmd: "Makefile",
          title: "أسامي قصيرة موثّقة لكل أوامر المشروع",
          desc: R`بدل ما تفتكر [[docker compose exec -T postgres psql -v ON_ERROR_STOP=1 -U ...]]، تكتب [[make migrate]]. و [[make help]] بيطبع كل الأوامر ووصف كل واحد، من التعليقات اللي بعد [[##]].

ومع الـ Makefile هتقابل أهم مطبّات make: السطور لازم تبدأ بـ Tab، و [[$$]] بدل [[$]] للـ shell، وكل سطر بيتنفّذ في shell لوحده.`,
          example: R`SHELL := /bin/bash
COMPOSE := docker compose
DBUSER := $(shell grep -E '^POSTGRES_USER=' .env | cut -d= -f2)
PSQL := $(COMPOSE) exec -T postgres psql -v ON_ERROR_STOP=1 -U $(DBUSER) -d appdb
.PHONY: help check up down logs migrate test shell-db
help: ## القايمة دي
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN{FS=":.*?## "}{printf "  %-10s %s\n",$$1,$$2}'
check: ## ملف compose سليم؟
	$(COMPOSE) config -q && echo "compose OK"
up: ## تشغيل
	$(COMPOSE) up -d
down: ## إيقاف (البيانات بتفضل)
	$(COMPOSE) down
logs: ## متابعة لوج التطبيق
	$(COMPOSE) logs -f --tail=100 app
migrate: ## كل الهجرات بالترتيب
	@for f in db/migrations/*.sql; do echo "--> $$f"; $(PSQL) -1 -f /dev/stdin < $$f || exit 1; done
test: ## التيستات
	cd app && python -m pytest tests -q
shell-db: ## psql جوه القاعدة
	$(PSQL)`,
          try: "في مشروع compose عندك اعمل Makefile بـ help و up و down و logs بس، وشغّل [[make help]]. بعدين بدّل الـ Tab في سطر بمسافات وشغّل [[make up]] وشوف رسالة missing separator.",
          flag: "script",
          deep: {
            why: "كل مشروع فيه ١٠ أوامر طويلة بتتكتب كل يوم، ومحفوظة في دماغ شخص واحد أو في README محدش بيقراه. الـ Makefile بيحطهم في الريبو بأسامي قصيرة، والـ help بيوثّقهم لوحده.",
            how: R`المتغيرات فوق: [[:=]] بيتحسب مرة واحدة وقت القراية. و [[$(shell ...)]] بينفّذ أمر ويحط الناتج، فـ DBUSER بيتقري من .env مرة واحدة.

[[.PHONY]] بيقول لـ make إن الأسامي دي أوامر مش ملفات. من غيرها، لو فيه فولدر اسمه test، [[make test]] هيقول «up to date» ومش هيعمل حاجة.

كل target: اسمه وبعده [[:]]، والسطور اللي تحته لازم تبدأ بـ Tab حقيقي. [[@]] في أول السطر بيخفي الأمر نفسه ويطبع الناتج بس.

make بيفك [[$(VAR)]] الأول، فلو عايز [[$]] توصل للـ shell (زي [[$$f]] في اللوب) بتكتبها مرتين.

[[help]] بيعمل grep على الـ Makefile نفسه ([[$(MAKEFILE_LIST)]]) على السطور اللي فيها [[## ]]، و awk بيطبع الاسم والوصف في عمودين.

[[migrate]] بيعدّي على الملفات بترتيب الاسم، و [[-1]] بيطبّق كل ملف في transaction واحدة، و [[|| exit 1]] بيوقف عند أول فشل. وكل سطر بيتنفّذ في shell لوحده، فعشان كده [[cd app && ...]] في سطر واحد.`,
            when: "أي مشروع فيه أوامر بتتكرر، خصوصًا compose وقواعد بيانات. على ويندوز make مش موجود غير في WSL أو Git Bash (بعد تسطيبه). compose في تاب Docker، و psql في تاب PostgreSQL.",
            mistakes: R`في مشروع حقيقي كان [[DBUSER = $$(grep ...)]]. الـ [[$$]] بتوصل للـ shell كـ [[$(grep ...)]] زي ما هي، فالـ grep بيتنفّذ في كل مرة PSQL يتستخدم (جوه لوب الـ migrate يعني مع كل ملف). الصح [[$(shell ...)]] مع [[:=]]، فـ make نفسه يحسبها مرة واحدة.

ولو ملف migration فشل في النص، الهجرات اللي قبله اتطبقت خلاص، ومكانش فيه transaction لكل ملف، فالملف اللي فشل ساب نصه متطبق. [[-1]] بيحل الجزء ده.

و [[make test]] محلي كان محتاج بيئة Python مفعّلة، وإلا بيقول pytest not found. وأشهر غلطة في أي Makefile: المحرر حوّل الـ Tab لمسافات، فـ make يقول [[missing separator]]. في VS Code خلي الملف على Tabs.

وكان فيه كمان targets لربط webhook تيليجرام بـ curl، بتقرا التوكن من .env بـ [[source .env]]. فكرة حلوة تحط فيها أي أمر API بتحتاجه كل كام يوم.`
          },
          lines: [
            "كل الأوامر بـ bash مش sh.",
            "اختصار لـ docker compose.",
            "اليوزر من .env، يتحسب مرة واحدة.",
            "أمر psql كامل جوه الـ container.",
            "الأسامي دي أوامر مش ملفات.",
            "help، والوصف بعد ##.",
            "اطبع كل target ووصفه في عمودين.",
            "check.",
            "ملف compose سليم؟",
            "up.",
            "شغّل في الخلفية.",
            "down.",
            "وقّف (الـ volumes بتفضل).",
            "logs.",
            "تابع آخر ١٠٠ سطر من لوج app.",
            "migrate.",
            "كل ملف بالترتيب في transaction، ووقف عند أول فشل.",
            "test.",
            "ادخل app وشغّل pytest في نفس السطر.",
            "shell-db.",
            "افتح psql تفاعلي."
          ],
          sol: R`جربتها: [[make help]] طبع:

[[  help       القايمة دي]]
[[  up         تشغيل]]
[[  down       إيقاف (البيانات بتفضل)]]
[[  logs       متابعة لوج التطبيق]]

الكلام ده جاي من التعليق بعد [[##]] في كل target. وبعد ما بدّلت الـ Tab قبل [[$(COMPOSE) up -d]] بـ ٤ مسافات، [[make up]] طبع [[Makefile:6: *** missing separator.  Stop.]] وexit 2. رقم السطر بيقولك فين.

Make لازم Tab حقيقي قبل كل أمر، والمحررات كتير بتحوّله لمسافات لوحدها. في VS Code شوف تحت على اليمين ([[Spaces: 2]] أو [[Tab Size]])، أو [[cat -A Makefile]] هيوريك [[^I]] مكان كل Tab. ولو [[make: *** No rule to make target 'up']] يبقى اسم الـ target مكتوب غلط أو فيه مسافة قبل النقطتين.`
        },
        {
          cmd: "n8n_import.sh",
          title: "workflows الـ n8n من git بأسرار من .env",
          desc: R`«الإعدادات ككود»: workflows الـ n8n محفوظة في git كملفات JSON من غير أي أسرار، وفيها placeholders زي [[$__{APP_URL}]]. السكربت بيملاها من .env بـ envsubst، ويعمل ملف credentials مؤقت بصلاحيات خاصة، ويستوردهم جوه container الـ n8n.

وبينضّف الملفات المؤقتة من الجهاز ومن جوه الـ container حتى لو وقع في النص.`,
          example: R`#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
set -a; . ./.env; set +a
: "$__{INTERNAL_TOKEN:?need INTERNAL_TOKEN in .env}"
export APP_URL="$__{APP_URL:-http://app:8080}"
command -v envsubst >/dev/null || { echo "sudo apt install gettext-base"; exit 1; }
TMP="$(mktemp -d)"; chmod 700 "$TMP"
cleanup() { rm -rf "$TMP"; docker compose exec -T n8n rm -rf /tmp/wf /tmp/creds.json || true; }
trap cleanup EXIT
mkdir -p "$TMP/wf"
for f in n8n/workflows/*.json; do
  envsubst '$__{APP_URL} $__{CHAT_ID}' < "$f" > "$TMP/wf/$(basename "$f")"
done
if grep -rqE '\$\{[A-Z_]+\}' "$TMP/wf/"; then echo "unfilled placeholders"; exit 1; fi
( umask 077; jq -n '[{id:"app-internal", name:"app internal", type:"httpHeaderAuth", data:{name:"authorization", value:("Bearer " + env.INTERNAL_TOKEN)}}]' > "$TMP/creds.json" )
docker compose cp "$TMP/creds.json" n8n:/tmp/creds.json
docker compose exec -T n8n n8n import:credentials --input=/tmp/creds.json
docker compose exec -T n8n mkdir -p /tmp/wf
docker compose cp "$TMP/wf/." n8n:/tmp/wf/
docker compose exec -T n8n n8n import:workflow --separate --input=/tmp/wf
echo "imported: activate the workflows from the n8n UI"`,
          try: R`جرّب envsubst لوحده: [[echo '{"url": "$__{APP_URL}", "x": "$__{HOME}"}' | APP_URL=http://app:8080 envsubst '$__{APP_URL}']]. لاحظ إن [[$__{HOME}]] فضل زي ما هو لأنه مش في القايمة. وبعدين شغّل n8n في Docker على جهازك وصدّر workflow واستورده بالسكربت.`,
          flag: "script",
          deep: {
            why: "workflows الـ n8n بتتعمل بالماوس في الواجهة، ولو السيرفر راح أو عايز نسخة تانية بتعيدها من الأول. تصديرها لـ git بيحلها، بس الملفات فيها روابط وتوكنات ومينفعش تترفع زي ما هي.",
            how: R`[[export APP_URL="$__{APP_URL:-http://app:8080}"]] قيمة افتراضية لو مش موجودة في .env.

[[mktemp -d]] مع [[chmod 700]]: فولدر مؤقت محدش غيرك يقرا منه. و [[trap cleanup EXIT]] بتشغّل cleanup في آخر السكربت مهما حصل: بتمسح الفولدر على الجهاز، والملفات اللي اتنسخت جوه الـ container.

[[envsubst '$__{APP_URL} $__{CHAT_ID}']] بالقايمة دي بس بيبدّل المتغيرين دول. من غير قايمة، أي [[$]] في الـ JSON (و n8n بيستخدم [[$json]] كتير في expressions) هيتبدّل بفاضي ويبوّظ الـ workflow.

والـ grep بعدها بيدوّر على أي [[$__{VAR}]] لسه موجود، يعني placeholder نسيته في القايمة، ويوقف.

[[umask 077]] جوه subshell (الأقواس) بيخلي الملف اللي هيتعمل صلاحيته 600. و jq بيبني الـ JSON وبياخد التوكن من [[env.INTERNAL_TOKEN]]، فالتوكن مش بيبان في سطر الأوامر.

[[docker compose cp]] بينسخ ملف جوه الـ container، و [[n8n import:credentials]] و [[import:workflow --separate]] (ملف لكل workflow) بيستوردوا.`,
            when: "أي أداة إعداداتها JSON أو YAML وعايز تحطها في git (n8n، و Grafana dashboards، و nginx templates). trap و mktemp في تاب bash، و compose cp في تاب Docker.",
            mistakes: R`في مشروع حقيقي الـ trap كان بينضّف الجهاز بس. لو السكربت وقع بين [[cp]] و [[rm]]، ملف الـ credentials فيه التوكن كان بيفضل في /tmp جوه container الـ n8n. هنا cleanup بتمسح من الاتنين.

والـ grep بتاع الـ placeholders كان بيطبع بس ومبيوقفش، فـ workflow فيه [[$__{CHAT_ID}]] حرفيًا كان بيتستورد ويفشل بعدين وقت التشغيل.

والـ workflows بتتستورد وهي متوقفة، ولازم تفعّلها من الواجهة. السكربت بيقول كده في الآخر عشان محدش يفتكر إنها شغالة.

والنسخة الأصلية كانت بتبني الـ credentials بـ Python heredoc. jq أقصر، بس لو هتستخدمه متديلوش التوكن كـ [[--arg]] لأنه هيبان في [[ps]].`
          },
          lines: [
            "وقّف عند أي خطأ.",
            "ادخل جذر المشروع.",
            "اقرا .env واعمل export.",
            "لازم التوكن.",
            "رابط التطبيق، بقيمة افتراضية.",
            "envsubst موجود؟",
            "فولدر مؤقت محدش يقراه غيرك.",
            "دالة تنضّف الجهاز والـ container.",
            "شغّلها في الآخر مهما حصل.",
            "فولدر للـ workflows بعد التعبئة.",
            "لكل workflow:",
            "بدّل المتغيرين دول بس.",
            "قفلة اللوب.",
            "فيه placeholder لسه متملاش؟ وقّف.",
            "ملف credentials بصلاحية 600، والتوكن من البيئة.",
            "انسخه جوه الـ container.",
            "استورد الـ credentials.",
            "فولدر جوه الـ container.",
            "انسخ الـ workflows.",
            "استوردهم، ملف لكل workflow.",
            "فكّرني أفعّلهم."
          ],
          sol: R`جربت أمر envsubst:

[[{"url": "http://app:8080", "x": "$__{HOME}"}]]

[[$__{APP_URL}]] اتبدّل لأنه في القايمة، و [[$__{HOME}]] فضل زي ما هو لأنه مش فيها. من غير القايمة، envsubst بيبدّل كل متغير موجود في البيئة، فـ [[$__{HOME}]] كان هيبقى [[/root]]، وأي متغير مش موجود بيبقى نص فاضي من غير أي تحذير.

في السكربت الكامل، [[grep -rqE '\$\{[A-Z_]+\}']] بيمسك أي placeholder فضل مكتوب ([[unfilled placeholders]]) قبل الاستيراد. ولو الاستيراد نجح، n8n بيطبع حاجة زي [[Successfully imported 1 credential.]] و [[Successfully imported 3 workflows.]]، والـ workflows بتظهر في الواجهة Inactive لحد ما تفعّلها بإيدك.

لو طلع [[envsubst: command not found]] سطّب [[gettext-base]]. ولو n8n قال [[Could not find workflows]] يبقى المسار في [[--input]] غلط أو [[docker compose cp]] ماوصلش الملفات. (جربت envsubst بس، مش n8n.)`
        },
        {
          cmd: "normalize-phones.mjs",
          title: "سكربت يعدّل بيانات الإنتاج بأمان",
          desc: R`أي سكربت بيعدّل بيانات حقيقية لازم يوريك اللي هيحصل الأول (dry-run) من غير ما يلمس حاجة، ومينفّذش غير لما تضيف [[--apply]] بنفسك. والحالات الغامضة بيتخطاها ويبلّغ عنها بدل ما يخمّن.

والتعديلات كلها في transaction، فلو وقع في النص مفيش حاجة تتكتب.`,
          example: R`// node --env-file=.env scripts/normalize-phones.mjs          → معاينة
// node --env-file=.env scripts/normalize-phones.mjs --apply  → تنفيذ
import pg from "pg";
const normalize = p => { const d = p.replace(/\D/g, ""); return d.length === 11 && d.startsWith("01") ? "+2" + d : null; };
const APPLY = process.argv.includes("--apply");
const c = new pg.Client({ connectionString: process.env.DATABASE_URL });
await c.connect();
try {
  const { rows } = await c.query(
    "SELECT id, phone FROM users WHERE phone IS NOT NULL AND phone NOT LIKE '+%'");
  console.log(APPLY ? "APPLY" : "DRY-RUN", "candidates:", rows.length);
  let changed = 0, skipped = 0, conflicts = 0;
  await c.query("BEGIN");
  for (const u of rows) {
    const next = normalize(u.phone);
    if (!next) { skipped++; continue; }
    const clash = await c.query(
      "SELECT 1 FROM users WHERE phone=$1 AND id<>$2", [next, u.id]);
    if (clash.rowCount) { conflicts++; continue; }
    console.log(" ", u.phone, "->", next);
    await c.query("UPDATE users SET phone=$1 WHERE id=$2", [next, u.id]);
    changed++;
  }
  await c.query(APPLY ? "COMMIT" : "ROLLBACK");
  console.log({ changed, skipped, conflicts });
  if (!APPLY && changed) console.log("Run again with --apply to write.");
} catch (e) {
  await c.query("ROLLBACK"); throw e;
} finally {
  await c.end();
}`,
          try: "على Postgres تجريبي اعمل جدول users فيه أرقام بأشكال مختلفة (01012345678 و 010-1234-5678 و رقم ناقص، ورقمين هيبقوا نفس الرقم بعد التعديل). شغّل من غير [[--apply]] وراجع الناتج، وبعدين بـ [[--apply]]، وشغّله تالت مرة وتأكد إنه قال candidates: 0 للي اتعدّلوا.",
          flag: "script",
          deep: {
            why: "سكربت «يصلّح» بيانات الإنتاج من غير معاينة هو أسرع طريقة تبوّظ آلاف الصفوف في ثانية. الـ dry-run بيخليك تشوف كل تغيير قبل ما يحصل، و --apply قرار واعي منك.",
            how: R`[[node --env-file=.env]] (Node 20.6 وأحدث) بيقرا .env من غير مكتبة dotenv.

[[process.argv.includes("--apply")]]: الافتراضي معاينة. لازم تكتب --apply بإيدك عشان يكتب.

الاستعلام بيجيب المرشحين بس (أرقام مش بادئة بـ +). و [[normalize]] بترجع null لو الصيغة مش معروفة، فالسكربت يتخطاها ويعدّها في skipped بدل ما يخمّن.

قبل أي تعديل بيشيك: فيه يوزر تاني عنده نفس الرقم بعد التعديل؟ لو أيوه، ده conflict: محتاج قرار بشري، فيتسجل ويتخطى.

[[$1]] و [[$2]] parameters: القيم بتتبعت منفصلة عن الـ SQL، فمفيش SQL injection.

كل حاجة جوه [[BEGIN]]. في الـ dry-run آخرها [[ROLLBACK]]، وفي الـ apply [[COMMIT]]. ولو حصل exception في النص، الـ catch بيعمل ROLLBACK فمفيش صفوف نص متعدّلة. و [[finally]] بيقفل الاتصال في كل الحالات.

وفي الآخر ملخص بالأرقام: كام اتغيّر وكام اتخطى وكام تعارض.`,
            when: "أي تعديل جماعي على بيانات حقيقية: تنظيف أرقام، ودمج حسابات، و seed لبيانات أولية. نفس الشكل (dry-run افتراضي) لأي سكربت بيمسح أو يعدّل. BEGIN و ROLLBACK في تاب PostgreSQL، و node --env-file في تاب Node.",
            mistakes: R`في مشروع حقيقي السكربت الأصلي مكانش بيستخدم transaction، فلو وقع في النص (الاتصال اتقطع مثلًا) يسيب نص الصفوف متعدّلة ونصها لأ. اتضاف BEGIN و COMMIT هنا.

وكان بيقرا .env بـ regex يدوي بدل [[node --env-file]]، ودا بيبوظ مع القيم اللي فيها علامات تنصيص أو [[=]].

والفكرة نفسها ممتازة وكانت متكررة في سكربتات seed-admin و seed-demo في نفس المشروع. خليها قالب لأي سكربت بيعدّل بيانات.`
          },
          lines: [
            "مكتبة Postgres.",
            "حوّل الرقم لصيغة دولية، أو null لو الصيغة مش معروفة.",
            "هل المستخدم كتب --apply؟",
            "اتصال بالقاعدة من DATABASE_URL.",
            "اتصل.",
            "ابدأ try:",
            "هات المرشحين...",
            "...الأرقام اللي مش بادئة بـ +.",
            "اطبع الوضع وعدد المرشحين.",
            "عدّادات.",
            "ابدأ transaction.",
            "لكل يوزر:",
            "الرقم بعد التعديل.",
            "صيغة مش معروفة؟ اتخطاه.",
            "فيه حد تاني عنده نفس الرقم؟...",
            "...بـ parameters مش string.",
            "تعارض؟ متخمّنش، اتخطاه وعدّه.",
            "اطبع التغيير.",
            "اكتب جوه الـ transaction حتى في المعاينة، عشان رقمين بيتحولوا لنفس القيمة يبانوا تعارض من الـ dry-run. ومن غير --apply الـ ROLLBACK بيلغي كل ده.",
            "عدّه.",
            "قفلة اللوب.",
            "apply: احفظ. dry-run: ارجع في كل حاجة.",
            "الملخص.",
            "فكّر المستخدم بـ --apply.",
            "أي خطأ:",
            "ارجع في كل حاجة وارمي الخطأ.",
            "في كل الحالات:",
            "اقفل الاتصال.",
            "قفلة الـ try."
          ],
          sol: R`جربتها على جدول فيه [[01012345678]] و [[010-1234-5678]] (نفس الرقم) و [[0101234]] (ناقص) و [[0111 222 3333]] و [[01122223333]] و [[+201099999999]] (مش مرشّح):

من غير [[--apply]]: [[DRY-RUN candidates: 5]]، و ٣ سطور تغيير، و [[{ changed: 3, skipped: 1, conflicts: 1 }]] و [[Run again with --apply to write.]]، والجدول ماتغيّرش.
بـ [[--apply]]: نفس الأرقام بالظبط، والصفوف اتعدّلت لـ [[+2...]].
التشغيل التالت: [[candidates: 2]] (الرقم الناقص والرقم اللي عليه تعارض بس) و [[changed: 0]]. يعني اللي اتعدّل مابقاش مرشح.

لقيت مشكلة في النسخة الأصلية: كانت بتعمل [[UPDATE]] في الـ apply بس، فالـ dry-run ماكانش شايف إن [[01012345678]] و [[010-1234-5678]] هيبقوا نفس الرقم، وقال [[changed: 4, conflicts: 0]]، وبعدين الـ apply قال [[changed: 3, conflicts: 1]]. اتصلّحت إن الـ UPDATE يحصل دايمًا جوه الـ transaction، والـ ROLLBACK في المعاينة بيلغيه. فدلوقتي المعاينة بتوري نفس اللي هيحصل. التعارض ده محتاج قرار منك، أنهي حساب يفضل بالرقم.`
        },
        {
          cmd: "fix-docker.sh",
          title: "التعديلات مش ظاهرة: متمسحش كل حاجة",
          desc: R`سكربت «الإصلاح» المشهور: وقّف كل حاجة، امسح الـ containers والصور، [[docker system prune -f]]، وابني من غير كاش. بيشتغل أحيانًا، بس بياخد وقت، وبيمسح حاجات مش تبعك، والأسوأ إنه مش بيقولك إيه كانت المشكلة.

الصح إنك تمشي خطوة خطوة: التعديل وصل للـ image؟ وصل للـ container؟ السيرفر بيرجّعه؟ ولو لازم تبدأ من الصفر، امسح صور المشروع ده بس.`,
          example: R`# 1) ابني الخدمة اللي اتغيّرت بس، وشوف هل قامت
docker compose build --pull frontend
docker compose up -d frontend
docker compose ps
docker compose logs --tail=50 frontend
# 2) الملف الجديد جوه الـ container فعلًا؟
docker compose exec frontend ls -la /usr/share/nginx/html
# 3) السيرفر بيرجّع الجديد؟ لو أيوه يبقى كاش المتصفح
curl -sI https://example.com/ | grep -iE 'cache-control|etag|last-modified'
# 4) آخر حل: امسح صور المشروع ده بس وابني من الصفر
docker compose down --rmi local
docker compose build --no-cache
docker compose up -d`,
          try: "في مشروع compose تجريبي غيّر كلمة في الواجهة، وامشي الخطوات من ١ لـ ٣ وقف عند أول خطوة تلاقي فيها المشكلة. وبعدين افتح الموقع بـ Ctrl+Shift+R وشوف الفرق.",
          flag: "danger",
          deep: {
            why: "«امسح وابني من الصفر» بيخبّي السبب الحقيقي، فالمشكلة ترجع تاني الأسبوع الجاي وتعيد نفس الـ ١٠ دقايق. وعلى سيرفر فيه أكتر من مشروع، [[system prune]] بيمسح حاجات مش بتاعتك.",
            how: R`[[build --pull frontend]] بيبني الخدمة دي بس، و [[--pull]] بيجيب آخر نسخة من الـ base image. و [[up -d frontend]] بيعيد إنشاء الـ container لو الـ image اتغيّرت. [[ps]] و [[logs]] بيقولولك هل قام ولا وقع.

[[exec ... ls -la]] بيوريك الملفات جوه الـ container بتاريخها. لو الملف القديم لسه هناك، المشكلة في الـ build (كاش طبقة، أو .dockerignore، أو COPY من فولدر غلط).

[[curl -sI]] بيجيب الـ headers بس من السيرفر. لو الـ ETag أو Last-Modified اتغيّر، السيرفر بيرجّع الجديد والمشكلة في كاش المتصفح أو CDN، ومفيش أي حاجة في Docker محتاجة تتمسح.

ولو فعلًا لازم تبدأ من الصفر: [[down --rmi local]] بيمسح الصور اللي compose بناها للمشروع ده بس (مش الصور اللي اتنزّلت زي postgres)، والـ volumes بتفضل.`,
            when: "كل ما تلاقي نفسك بتقول «التعديل مش ظاهر». الأوامر لوحدها في تاب Docker، و curl -I في تاب التشخيص.",
            mistakes: R`في مشروع حقيقي كان السكربت من غير [[set -e]]، فلو الـ build فشل بيكمّل ويشغّل الصور القديمة (أو ولا حاجة)، ويطبع اللوج كأن كل حاجة تمام.

و [[docker system prune -f]] بيمسح كل container واقف وكل image مش مستخدمة على السيرفر كله، حتى لو تبع مشروع تاني واقف مؤقتًا.

وأسماء الصور في [[docker rmi]] كانت مكتوبة بإيدك ومختلفة عن اللي في deploy.sh (المشروع اتغيّر اسمه)، فالمسح مكانش بيمسح حاجة أصلًا. [[down --rmi local]] بيعرف الأسامي لوحده.

وفي الغالب السبب الحقيقي كان كاش المتصفح أو Nginx، مش Docker خالص. وكان بيستخدم [[docker-compose]] القديم.`
          },
          lines: [
            "ابني الخدمة دي بس بأحدث base image.",
            "شغّلها بالـ image الجديدة.",
            "قامت؟",
            "آخر ٥٠ سطر من لوجها.",
            "الملفات جوه الـ container بتاريخها.",
            "headers الكاش من السيرفر.",
            "وقّف وامسح صور المشروع ده بس (الـ volumes بتفضل).",
            "ابني من غير كاش.",
            "شغّل."
          ],
          sol: R`الإجابة النموذجية إنك تقف عند أول خطوة بتفشل:

خطوة ١: [[docker compose ps]] لازم الـ frontend يبقى [[Up]] بوقت جديد ([[Up 5 seconds]]). لو [[Restarting]] أو [[Exited]] يبقى المشكلة في البناء أو الإقلاع، واللوج هيقولك.
خطوة ٢: [[ls -la /usr/share/nginx/html]] جوه الـ container. لو تاريخ الملفات قديم أو الـ [[index-*.js]] نفس الاسم القديم، يبقى التعديل ماوصلش للـ image: غالبًا [[COPY]] بيجيب من فولدر غلط، أو [[.dockerignore]] بيستبعد حاجة، أو مانسيتش [[--build]] بس بنيت service تانية.
خطوة ٣: [[curl -sI]] لو [[etag]] أو [[last-modified]] اتغيّروا، يبقى السيرفر بيرجّع الجديد والمشكلة كاش المتصفح أو CDN. وهنا Ctrl+Shift+R بيوريك الجديد. ولو [[index.html]] عليه [[max-age]] طويل، ده السبب الحقيقي.

خطوة ٤ نادرًا ما تحتاجها، و [[--rmi local]] بيمسح صور المشروع ده اللي مالهاش tag بس، مش volumes ولا مشاريع تانية زي [[docker system prune]]. (الخطوات دي نفس اللي جربتها في درس Dockerfile (Vite + nginx) لما قارنت الـ Cache-Control.)`
        }
      ]
    }
]);
