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
          teach: R`## الأول: السكربت بيعمل إيه

عنده قايمة ملفات SQL مكتوبة بالترتيب. بيلف عليهم واحد واحد، ويبعت كل ملف لـ [[psql]] (برنامج Postgres اللي بيكلّم القاعدة من الترمنال) في transaction لوحده. ولو ملف فشل بيسألك تكمّل ولا توقف، وفي الآخر بيطبع ملخص، ولو كله نجح بيعمل restart للتطبيق.

جربته جوه container من [[postgres:16]] (فيه bash و psql وقاعدة شغالة)، بالـ ٣ ملفات اللي في الـ try: الأول [[create table courses]]، والتاني [[create table exams]] وبعده سطر غلط [[ALTR TABLE ...]]، والتالت [[insert]]. و [[docker]] جوه الـ container كان سكربت وهمي بيطبع الأمر بس، عشان نشوف هل السطر الأخير اتنفّذ.

---

## ١. [[#!/usr/bin/env bash]]

أول سطر اسمه shebang: لما تشغّل الملف كبرنامج ([[./apply-migrations.sh]])، النظام بيقرا السطر ده عشان يعرف يشغّله بإيه. و [[/usr/bin/env bash]] معناها «دوّر على bash في الـ PATH وشغّل بيه»، أضمن من كتابة [[/bin/bash]] لأن مكانه بيختلف بين الأنظمة.

---

## ٢. [[set -uo pipefail]]

[[set]] بيغيّر إعدادات bash للسكربت ده:

| الجزء | معناه |
|---|---|
| [[-u]] | أي متغير مش معرّف = خطأ والسكربت يقف، بدل ما يبقى نص فاضي في صمت |
| [[-o pipefail]] | الـ pipe (أوامر متوصلة ببعض بعلامة الـ pipe) يعتبر فاشل لو أي أمر فيه فشل، مش الأخير بس |

والمهم هنا اللي **مش** موجود: [[-e]] (اقف عند أول أمر يفشل). لو كانت موجودة، أول ما psql يفشل السكربت كان هيموت قبل ما يوصل للـ [[else]] اللي بيسألك. يعني شيلها عن قصد.

---

## ٣. [[set -a; . ./.env.local; set +a]]

٣ أوامر في سطر واحد، و [[;]] بتفصل بينهم:

- [[set -a]]: من هنا ورايح، أي متغير يتعرّف يبقى export تلقائي (a = all export)، يعني البرامج اللي السكربت هيشغّلها تشوفه.
- [[. ./.env.local]]: النقطة لوحدها هي الأمر [[source]]: «نفّذ الملف ده جوه الـ shell الحالي». وملف [[.env.local]] فيه سطور زي [[DATABASE_URL=postgres://...]]، فبتتحوّل متغيرات.
- [[set +a]]: رجّع الإعداد زي ما كان (الـ [[+]] بتطفي، والـ [[-]] بتشغّل، بالعكس من المتوقع).

ليه [[-a]] مهمة؟ جربت الفرق: من غيرها المتغير بيتعرّف في السكربت بس، والبرامج اللي بتتشغّل منه مش بتشوفه:

~~~text من غير set -a ثم بيها
child sees: []
child sees: postgres://postgres:pw@localhost:5432/appdb
~~~

---

## ٤. [[: "$__{DATABASE_URL:?DATABASE_URL missing in .env.local}"]]

من جوه لبرة:

- [[$__{DATABASE_URL:?رسالة}]]: لو المتغير مش موجود أو فاضي، اطبع الرسالة واقف السكربت بخطأ. ولو موجود، رجّع قيمته.
- [[:]] لوحدها أمر مبيعملش أي حاجة (no-op). موجودة عشان bash يفك الـ [[$__{...}]] وبس، من غير ما يحاول يشغّل القيمة كأمر.

جربت [[.env.local]] من غير المتغير:

~~~text الناتج
apply-migrations.sh: line 4: DATABASE_URL: DATABASE_URL missing in .env.local
exit=1
~~~

---

## ٥. القايمة: [[migrations=( ... )]]

~~~bash
migrations=(
  01_add_courses_instructor_fkey.sql
  02_fix_transactions_foreign_keys.sql
  03_ensure_exams_module_id.sql
)
~~~

[[( )]] بعد [[=]] بتعمل array (قايمة). كل اسم عنصر، والترتيب هنا هو ترتيب التطبيق. الأرقام [[01_]] و [[02_]] في أول الأسامي عشان الترتيب يبان ومحدش يحط ملف في غير مكانه.

### [[ok=0; fail=0]]

عدّادين: كام نجح وكام فشل.

---

## ٦. اللوب: [[for m in "$__{migrations[@]}"; do]]

- [[$__{migrations[@]}]]: كل عناصر القايمة. والعلامات [[" "]] حواليها بتخلي كل عنصر كلمة واحدة حتى لو فيه مسافة.
- كل لفة، [[m]] بياخد اسم ملف.

### [[f="database/migrations/$m"]]

المسار الكامل للملف.

### [[[ -f "$f" ] || { echo "missing: $f"; fail=$((fail+1)); continue; }]]

- [[[ -f "$f" ]]]: هل ده ملف موجود؟
- [[||]]: لو لأ، نفّذ اللي بعدها.
- [[{ ...; }]]: مجموعة أوامر تتنفّذ مع بعض (لازم مسافة بعد [[{]] و [[;]] قبل [[}]]).
- [[$((fail+1))]]: حساب أرقام في bash، يعني fail يزيد واحد.
- [[continue]]: سيب باقي اللفة دي وروح للملف اللي بعده.

جربت شلت الملف التالت:

~~~text الناتج
applying 01_add_courses_instructor_fkey.sql ...
CREATE TABLE
applying 02_fix_transactions_foreign_keys.sql ...
CREATE TABLE
ALTER TABLE
missing: database/migrations/03_ensure_exams_module_id.sql
ok: 2/3  failed: 1
~~~

---

## ٧. قلب السكربت: [[psql ...]]

~~~bash
if psql "$DATABASE_URL" -v ON_ERROR_STOP=1 --single-transaction -f "$f"; then
~~~

| الجزء | معناه |
|---|---|
| [[psql "$DATABASE_URL"]] | اتصل بالقاعدة اللي في الرابط ده ([[postgres://user:pass@host:port/db]]) |
| [[-v ON_ERROR_STOP=1]] | [[-v]] بيعرّف متغير لـ psql. ده بيقوله: أول خطأ، اقف وارجع exit code غير صفر |
| [[--single-transaction]] | لف الملف كله في [[BEGIN]] و [[COMMIT]]: يا يتطبق كله يا ولا حاجة |
| [[-f "$f"]] | نفّذ الأوامر اللي في الملف ده |

و [[if أمر; then]] في bash معناها «لو الأمر رجع exit code صفر (نجح)».

### ليه [[ON_ERROR_STOP]] مهم؟

جربت ملف فيه [[select 1/0;]] وبعده [[select 2;]]:

~~~text من غيره ثم بيه
psql:/tmp/e.sql:1: ERROR:  division by zero
2
no stop exit=0
psql:/tmp/e.sql:1: ERROR:  division by zero
stop exit=3
~~~

من غيره psql كمّل للسطر اللي بعد الغلطة ورجع **0**، يعني السكربت كان هيقول «نجح». وبيه وقف ورجع [[3]] (الرقم اللي psql بيرجعه لما سكربت يقف على خطأ).

### ليه [[--single-transaction]]؟

ده أهم سطر في التجربة. شوف الملف التاني:

~~~text الناتج (جاوبت n)
applying 01_add_courses_instructor_fkey.sql ...
CREATE TABLE
applying 02_fix_transactions_foreign_keys.sql ...
CREATE TABLE
psql:database/migrations/02_fix_transactions_foreign_keys.sql:2: ERROR:  syntax error at or near "ALTR"
LINE 1: ALTR TABLE exams ADD COLUMN module_id int;
        ^
ok: 1/3  failed: 1
exit=1
~~~

psql طبع [[CREATE TABLE]] للـ exams، بس [[\dt]] (أمر psql بيعرض الجداول) بعدها:

~~~text \dt
 Schema |  Name   | Type  |  Owner
--------+---------+-------+----------
 public | courses | table | postgres
~~~

مفيش [[exams]]. لأن الملف كله كان transaction واحدة، والغلطة عملت rollback لكل اللي قبلها في نفس الملف. فالملف مسابش نص متطبّق، وتقدر تصلّحه وتشغّله تاني.

---

## ٨. لو نجح: [[ok=$((ok+1))]]

زوّد عدّاد النجاح.

## ٩. لو فشل: الـ [[else]]

~~~bash
fail=$((fail+1))
read -rp "failed. continue? (y/n): " choice
[ "$choice" = y ] || break
~~~

- [[read]] بيستنى سطر من الكيبورد ويحطه في المتغير [[choice]].
  - [[-r]]: متعاملش مع [[\]] كحرف خاص (اقرا اللي اتكتب زي ما هو).
  - [[-p "..."]]: اطبع السؤال ده الأول. (bash بيطبعه بس لو الإدخال جاي من ترمنال، عشان كده مش ظاهر في الناتج فوق لأني بعت الإجابة بـ [[echo n |]].)
- [[[ "$choice" = y ] || break]]: لو الإجابة مش [[y]] بالظبط، [[break]] اخرج من اللوب كله.

ولما جاوبت [[y]] كمّل للملف التالت:

~~~text آخر الناتج مع y
applying 03_ensure_exams_module_id.sql ...
INSERT 0 1
ok: 2/3  failed: 1
exit=1
~~~

[[INSERT 0 1]] معناها: صف واحد اتضاف (الـ 0 رقم قديم ملوش لازمة دلوقتي).

---

## ١٠. الملخص: [[echo "ok: $ok/$__{#migrations[@]}  failed: $fail"]]

[[$__{#migrations[@]}]]: الـ [[#]] قبل الاسم معناها «عدد العناصر» = 3.

## ١١. السطر الأخير: [[[ "$fail" -eq 0 ] && docker compose restart app]]

- [[-eq]] مساواة أرقام (equal).
- [[&&]] نفّذ الـ restart بس لو مفيش فشل، عشان التطبيق يقرا الـ schema الجديد.

بعد ما صلّحت [[ALTR]] لـ [[ALTER]] على قاعدة نضيفة:

~~~text الناتج
applying 01_add_courses_instructor_fkey.sql ...
CREATE TABLE
applying 02_fix_transactions_foreign_keys.sql ...
CREATE TABLE
ALTER TABLE
applying 03_ensure_exams_module_id.sql ...
INSERT 0 1
ok: 3/3  failed: 0
(fake docker) docker compose restart app
exit=0
~~~

وليه الـ exit كان [[1]] في حالة الفشل؟ لأن آخر أمر في السكربت هو [[[ "$fail" -eq 0 ]]]، ولما يبقى غلط بيرجّع 1، وده بيبقى exit code السكربت كله. فتقدر تكتب [[./apply-migrations.sh && echo done]].

---

## ١٢. التشغيل تاني: نقطة الضعف

شغّلته مرة تانية على نفس القاعدة:

~~~text الناتج
applying 01_add_courses_instructor_fkey.sql ...
psql:database/migrations/01_add_courses_instructor_fkey.sql:1: ERROR:  relation "courses" already exists
ok: 0/3  failed: 1
~~~

السكربت مش فاكر إيه اتطبق قبل كده. الحل يا إما الملفات تبقى بـ [[if not exists]]، يا إما أداة migrations بتسجّل اللي اتعمل في جدول (Prisma و supabase).

| السطر | بيعمل إيه |
|---|---|
| [[set -uo pipefail]] | صارم في المتغيرات، ومن غير [[-e]] عشان يسأل |
| [[set -a; . ./.env.local; set +a]] | اقرا الإعدادات واعملها export |
| [[: "$__{X:?msg}"]] | اقف لو المتغير ناقص |
| [[for m in "$__{arr[@]}"]] | لف على القايمة بالترتيب |
| [[psql -v ON_ERROR_STOP=1 --single-transaction -f]] | كل ملف كله أو ولا حاجة، وexit غير صفر لو فشل |
| [[read -rp ... ; break]] | اسأل، ووقف لو مش y |
| [[[ "$fail" -eq 0 ] && restart]] | restart بس لو كله نجح |

## الخلاصة

- [[ON_ERROR_STOP=1]] من غيره psql بيرجّع 0 حتى لو فيه أخطاء.
- [[--single-transaction]] بيمنع الملف النص متطبّق.
- [[set -e]] متشالة عن قصد عشان الـ [[else]] تشتغل.
- السكربت مبيسجّلش اللي اتطبق، فتشغيله مرتين بيفشل على أول ملف.`,
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
	$(COMPOSE) exec postgres psql -U $(DBUSER) -d appdb`,
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
          teach: R`## الأول: Makefile يعني إيه

[[make]] برنامج قديم أصله لبناء برامج C، بس الناس بتستخدمه كـ «قايمة أوامر» للمشروع. بتكتب ملف اسمه [[Makefile]] في جذر المشروع، فيه أسامي قصيرة (اسمها **targets**) وتحت كل اسم الأوامر بتاعته. ولما تكتب [[make migrate]]، make بيدوّر على [[migrate:]] في الملف وينفّذ اللي تحتها.

جربته جوه container من [[postgres:16]] بعد [[apt-get install make]] (طلع [[GNU Make 4.4.1]])، بقاعدة اسمها [[appdb]] ويوزر [[appuser]]، وملفين migrations. و [[docker]] هناك كان سكربت صغير: أمر [[docker compose exec -T postgres psql ...]] بيحوّله لـ psql حقيقي على القاعدة اللي في نفس الـ container، وأي أمر تاني بيطبعه بس ([[(fake docker) ...]]). و [[docker compose config -q]] جربته بجد على ويندوز.

---

## ١. المتغيرات فوق

### [[SHELL := /bin/bash]]

make بيشغّل الأوامر بـ [[/bin/sh]] افتراضيًا. السطر ده بيقوله استخدم bash.

### [[:=]] ولا [[=]]؟

في make فيه نوعين تعريف:

| الشكل | امتى بيتحسب |
|---|---|
| [[X := ...]] | مرة واحدة، وقت قراية الملف |
| [[X = ...]] | كل مرة [[$(X)]] يتستخدم |

[[:=]] هنا أحسن، خصوصًا للسطر اللي بيشغّل أمر.

### [[COMPOSE := docker compose]]

اختصار. و [[$(COMPOSE)]] بعد كده بتتبدّل بـ [[docker compose]]. في make المتغير بيتقري بـ [[$( )]] (مش [[$X]] زي bash).

### [[DBUSER := $(shell grep -E '^POSTGRES_USER=' .env | cut -d= -f2)]]

من جوه لبرة:

- [[grep -E '^POSTGRES_USER=' .env]]: هات السطر اللي بيبدأ ([[^]]) بـ [[POSTGRES_USER=]] من ملف [[.env]]: [[POSTGRES_USER=appuser]].
- [[cut -d= -f2]]: قطّع السطر عند [[=]] ([[-d]] = delimiter) وخد الحتة التانية ([[-f2]] = field 2): [[appuser]].
- [[$(shell ...)]]: دالة في make نفسه، بتشغّل الأمر وتحط الناتج مكانها.

### [[PSQL := $(COMPOSE) exec -T postgres psql -v ON_ERROR_STOP=1 -U $(DBUSER) -d appdb]]

أمر psql كامل جوه container اسمه [[postgres]]:

| الجزء | معناه |
|---|---|
| [[exec]] | شغّل أمر جوه container شغال |
| [[-T]] | من غير terminal وهمي (TTY)، لازم لما الإدخال جاي من ملف أو pipe |
| [[-v ON_ERROR_STOP=1]] | اقف عند أول خطأ وارجع exit غير صفر |
| [[-U $(DBUSER) -d appdb]] | اليوزر والقاعدة |

و [[make -n]] (dry run: اطبع الأوامر من غير ما تنفّذها) بيوريك الشكل بعد التبديل:

~~~text make -n migrate
for f in db/migrations/*.sql; do echo "--> $f"; docker compose exec -T postgres psql -v ON_ERROR_STOP=1 -U appuser -d appdb -1 -f /dev/stdin < $f || exit 1; done
~~~

---

## ٢. [[.PHONY: help check up down logs migrate test shell-db]]

make أصلًا بيفكّر في **ملفات**: [[make test]] معناها «اعمل الملف اللي اسمه test». فلو فيه فولدر أو ملف اسمه [[test]] جنب الـ Makefile، make بيقول خلاص موجود. جربت شلت سطر [[.PHONY]] وعملت فولدر [[test]]:

~~~text الناتج
make: 'test' is up to date.
~~~

ومنفّذش حاجة. [[.PHONY]] بتقوله «الأسامي دي أوامر، مش ملفات، نفّذها دايمًا».

---

## ٣. شكل الـ target

~~~text شكل الـ target
help: ## القايمة دي
<Tab>@grep ...
~~~

- الاسم وبعده [[:]].
- [[## الوصف]]: لـ make ده مجرد تعليق ([[#]])، بس [[help]] بيستخدمه.
- السطر اللي تحته **لازم يبدأ بـ Tab حقيقي**، مش مسافات. جربت بدّلت الـ Tab قبل [[$(COMPOSE) up -d]] بـ ٤ مسافات:

~~~text الناتج
M3:11: *** missing separator.  Stop.
exit=2
~~~

[[M3]] اسم الملف و [[11]] رقم السطر. و [[cat -A]] بيوري الفرق: الـ Tab بيظهر [[^I]] والمسافات بتفضل مسافات:

~~~text cat -A
^I@grep -E '^[a-zA-Z_-]+:.*?## .*$$' ...
    $(COMPOSE) up -d$
~~~

([[$]] في آخر كل سطر من [[cat -A]] معناها نهاية السطر.)

---

## ٤. [[help]]: الـ Makefile بيقرا نفسه

~~~bash
@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN{FS=":.*?## "}{printf "  %-10s %s\n",$$1,$$2}'
~~~

### [[@]] في أول السطر

make عادةً بيطبع الأمر قبل ما ينفّذه. [[@]] بتخفيه. من غيرها:

~~~text من غير @
grep -E '^[a-zA-Z_-]+:.*?## .*$' M4 | awk 'BEGIN{FS=":.*?## "}{printf "  %-10s %s\n",$1,$2}'
  help       القايمة دي
~~~

### [[$$]]

make بيفك أي [[$]] الأول. فعشان [[$]] توصل للـ shell زي ما هي، بتتكتب [[$$]]. وشوف السطر اللي فوق: [[$$1]] بقت [[$1]] و [[.*$$]] بقت [[.*$]].

### [[$(MAKEFILE_LIST)]]

متغير جاهز في make فيه اسم الـ Makefile اللي بيتقري. يعني الـ grep بيدوّر في الملف نفسه.

### الـ regex: [[^[a-zA-Z_-]+:.*?## .*$]]

- [[^[a-zA-Z_-]+]]: من أول السطر، حروف أو [[_]] أو [[-]] مرة أو أكتر (اسم target).
- [[:]] النقطتين.
- [[.*?## ]] أي حاجة لحد [[## ]].
- [[.*$]] أي حاجة لآخر السطر.

السطور اللي من غير [[## ]] (زي [[SHELL := ...]]) مش هتطابق. الـ grep لوحده:

~~~text grep
help: ## القايمة دي
check: ## ملف compose سليم؟
up: ## تشغيل
~~~

### الـ awk

- [[BEGIN{FS=":.*?## "}]]: قبل ما تقرا أي سطر، خلي الفاصل بين الأعمدة (FS = Field Separator) هو النقطتين لحد [[## ]]. فـ [[help: ## القايمة دي]] بيتقسم لـ [[help]] و [[القايمة دي]].
- [[printf "  %-10s %s\n",$1,$2]]: اطبع مسافتين، والاسم في خانة عرضها ١٠ ([[%-10s]]، والـ [[-]] معناها شمال)، والوصف، وسطر جديد ([[\n]]).

~~~text make help
  help       القايمة دي
  check      ملف compose سليم؟
  up         تشغيل
  down       إيقاف (البيانات بتفضل)
  logs       متابعة لوج التطبيق
  migrate    كل الهجرات بالترتيب
  test       التيستات
  shell-db   psql جوه القاعدة
~~~

ولما تكتب [[make]] لوحدها بينفّذ **أول** target في الملف، وهو [[help]]، فطلع نفس الناتج. عشان كده [[help]] أول واحد.

---

## ٥. [[check]] و [[up]] و [[down]] و [[logs]]

### [[$(COMPOSE) config -q && echo "compose OK"]]

[[docker compose config]] بيقرا ملف compose ويطبعه بعد ما يفهمه، و [[-q]] (quiet) من غير طباعة: بس exit code. جربته على ويندوز بملف سليم وبعدين بـ [[ports: 5432]] (لازم تبقى list):

~~~text الناتج
compose OK
validating C:\Users\ali\...\compose.yml: services.postgres.ports must be a array
exit=1
~~~

وبما إن make بيطبع الأمر قبل ما ينفّذه (مفيش [[@]]):

~~~text make check
docker compose config -q && echo "compose OK"
compose OK
~~~

### الباقي

| target | الأمر | معناه |
|---|---|---|
| [[up]] | [[docker compose up -d]] | شغّل كل الخدمات في الخلفية ([[-d]] = detached) |
| [[down]] | [[docker compose down]] | وقّف وامسح الـ containers، والـ volumes (البيانات) بتفضل |
| [[logs]] | [[docker compose logs -f --tail=100 app]] | آخر ١٠٠ سطر من لوج [[app]]، و [[-f]] (follow) كمّل تابع الجديد |

---

## ٦. [[migrate]]: لوب shell جوه make

~~~bash
@for f in db/migrations/*.sql; do echo "--> $$f"; $(PSQL) -1 -f /dev/stdin < $$f || exit 1; done
~~~

- [[for f in db/migrations/*.sql]]: الـ [[*]] بيطلّع كل ملفات [[.sql]] **مترتبة بالاسم**، عشان كده الأسامي بتبدأ بـ [[001_]] و [[002_]].
- [[$$f]]: متغير shell، فبـ [[$$]].
- [[-1]]: اختصار [[--single-transaction]] في psql: الملف كله أو ولا حاجة.
- [[-f /dev/stdin < $$f]]: الملف موجود على جهازك مش جوه الـ container، فبنبعته على الـ stdin ([[<]])، و psql بيقرا من [[/dev/stdin]] (الملف الخاص اللي هو الإدخال). وده سبب الـ [[-T]] في PSQL.
- [[|| exit 1]]: لو ملف فشل، اقف ومتكمّلش الباقي.
- كل ده في **سطر واحد** لأن make بيشغّل كل سطر في shell لوحده، فاللوب لازم يبقى في سطر.

~~~text make migrate
--> db/migrations/001_notes.sql
CREATE TABLE
--> db/migrations/002_created.sql
ALTER TABLE
exit=0
~~~

وتاني مرة:

~~~text make migrate (مرة تانية)
--> db/migrations/001_notes.sql
psql:/dev/stdin:1: ERROR:  relation "notes" already exists
make: *** [Makefile:17: migrate] Error 1
exit=2
~~~

وقف عند أول ملف بسبب [[exit 1]]، و make نفسه بيرجع [[2]] لما target يفشل. ولاحظ إن مفيش تسجيل للي اتطبق، فالملفات لازم تبقى بتتحمّل التكرار ([[if not exists]]) أو تشغّلها مرة بس.

---

## ٧. [[test]]: [[cd app && python -m pytest tests -q]]

- [[cd app &&]]: لازم في نفس السطر. لو كتبت [[cd app]] في سطر و [[pytest]] في سطر، التاني هيشتغل في shell جديد من فولدر الـ Makefile.
- [[python -m pytest]]: شغّل pytest من بايثون اللي في الـ PATH، و [[-q]] ناتج مختصر.

في الـ container مفيش فولدر [[app]]، فطلع:

~~~text الناتج
cd app && python -m pytest tests -q
/bin/bash: line 1: cd: app: No such file or directory
make: *** [Makefile:19: test] Error 1
~~~

[[/bin/bash]] في الرسالة هو الـ [[SHELL]] اللي حددناه فوق.

---

## ٨. [[shell-db]]: psql تفاعلي

~~~bash
$(COMPOSE) exec postgres psql -U $(DBUSER) -d appdb
~~~

هنا **من غير** [[-T]]، عكس [[PSQL]]. الـ [[-T]] بيلغي الـ terminal، و psql من غير terminal مبيطبعش الـ prompt ([[appdb=#]]) ولا بيسيبك تستخدم الأسهم والتاريخ. لما بعتله [[\d notes]] بـ pipe (من غير terminal) طلّع الجدول بس من غير prompt:

~~~text الناتج
                          Table "public.notes"
   Column   |           Type           | Collation | Nullable | Default
------------+--------------------------+-----------+----------+---------
 id         | integer                  |           | not null |
 body       | text                     |           |          |
 created_at | timestamp with time zone |           |          | now()
~~~

والنسخة القديمة من الدرس كانت [[shell-db]] فيها [[$(PSQL)]] اللي فيه [[-T]]، فالـ psql «التفاعلي» كان من غير prompt. اتصلّحت. ([[docker compose exec]] بيعمل TTY افتراضيًا، ده من الـ docs؛ الترمنال اللي جربت منه مكانش فيه TTY أجرّبه.)

---

| الحاجة | معناها |
|---|---|
| [[target: ## وصف]] | اسم أمر، والوصف لـ help |
| Tab قبل كل أمر | غير كده [[missing separator]] |
| [[@]] | متطبعش الأمر نفسه |
| [[$(VAR)]] | متغير make |
| [[$$]] | [[$]] توصل للـ shell |
| [[:=]] | احسب مرة واحدة |
| [[.PHONY]] | دي أوامر مش ملفات |
| كل سطر shell لوحده | [[cd x && ...]] في نفس السطر |

## الخلاصة

- [[make]] من غير اسم بينفّذ أول target، فخلي [[help]] الأول.
- Tab مش مسافات، و [[$$]] لأي [[$]] للـ shell.
- [[-T]] للأوامر اللي بتاخد إدخال من ملف، ومن غيره للـ shell التفاعلي.
- على ويندوز make مش موجود غير في WSL أو بعد تسطيبه.`,
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
            "افتح psql تفاعلي (من غير -T عشان يبقى فيه terminal)."
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
docker compose exec -T n8n sh -c 'umask 077; cat > /tmp/creds.json' < "$TMP/creds.json"
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

ملف الـ credentials بيتبعت على الـ stdin لـ [[sh -c 'umask 077; cat > /tmp/creds.json']] جوه الـ container، فبيتكتب بيوزر الـ container نفسه وبصلاحية 600. و [[docker compose cp]] بينسخ فولدر الـ workflows، و [[n8n import:credentials]] و [[import:workflow --separate]] (ملف لكل workflow) بيستوردوا.`,
            when: "أي أداة إعداداتها JSON أو YAML وعايز تحطها في git (n8n، و Grafana dashboards، و nginx templates). trap و mktemp في تاب bash، و compose cp في تاب Docker.",
            mistakes: R`في مشروع حقيقي الـ trap كان بينضّف الجهاز بس. لو السكربت وقع بين [[cp]] و [[rm]]، ملف الـ credentials فيه التوكن كان بيفضل في /tmp جوه container الـ n8n. هنا cleanup بتمسح من الاتنين.

ونسخة الدرس الأولى كانت بتنسخ ملف الـ credentials بـ [[docker compose cp]]. الـ cp بيعمل الملف جوه الـ container ملك root وبنفس الصلاحية 600، و n8n شغال بيوزر [[node]]: جربتها في container بيوزر node، فطلع [[Permission denied]] على القراية، والـ cleanup ماقدرش يمسحه ([[Operation not permitted]])، يعني التوكن كان هيفضل جوه. اتصلّحت بإن الملف يتكتب من جوه بـ [[cat]].

والـ grep بتاع الـ placeholders كان بيطبع بس ومبيوقفش، فـ workflow فيه [[$__{CHAT_ID}]] حرفيًا كان بيتستورد ويفشل بعدين وقت التشغيل.

والـ workflows بتتستورد وهي متوقفة، ولازم تفعّلها من الواجهة. السكربت بيقول كده في الآخر عشان محدش يفتكر إنها شغالة.

والنسخة الأصلية كانت بتبني الـ credentials بـ Python heredoc. jq أقصر، بس لو هتستخدمه متديلوش التوكن كـ [[--arg]] لأنه هيبان في [[ps]].`
          },
          teach: R`## الأول: الفكرة

ملفات الـ workflows في git فيها [[$__{APP_URL}]] و [[$__{CHAT_ID}]] مكان القيم الحقيقية. السكربت بيعمل نسخة مؤقتة منهم بالقيم من [[.env]]، ويبني ملف credentials فيه التوكن، ويدخّلهم container الـ n8n ويستوردهم، وبعدين يمسح كل الملفات المؤقتة.

جربته في container [[ubuntu:24.04]] بعد ما سطّبت [[gettext-base]] (فيه envsubst) و [[jq]]. ومكانش عندي image الـ n8n، فـ [[docker]] كان سكربت وهمي: [[compose cp]] و [[exec]] بيشتغلوا على فولدر بيمثّل الـ container، و [[n8n import:...]] بيطبع الملف اللي وصله بس. والـ workflow للتجربة:

~~~text n8n/workflows/notify.json
{"name":"notify","nodes":[{"type":"n8n-nodes-base.httpRequest","parameters":{"url":"$__{APP_URL}/api/notify","body":"={{ $json.message }}"}},{"type":"n8n-nodes-base.telegram","parameters":{"chatId":"$__{CHAT_ID}"}}]}
~~~

لاحظ [[$json.message]]: دي expression بتاعة n8n نفسه، ولازم توصل زي ما هي.

---

## ١. البداية

### [[set -euo pipefail]]

[[-e]] اقف عند أي أمر يفشل، [[-u]] متغير مش معرّف = خطأ، [[pipefail]] الـ pipe يفشل لو أي جزء فيه فشل. هنا [[-e]] موجودة لأن مفيش حاجة نسأل عنها: أي غلطة = وقّف.

### [[cd "$(dirname "$0")/.."]]

- [[$0]] مسار السكربت نفسه زي ما اتشغّل، مثلًا [[scripts/n8n_import.sh]].
- [[dirname]] بيشيل اسم الملف ويسيب الفولدر: [[scripts]].
- [[/..]] الفولدر اللي فوقه، يعني جذر المشروع.

فالسكربت يشتغل صح من أي مكان تشغّله منه. جربته من [[/tmp]] واشتغل عادي.

### [[set -a; . ./.env; set +a]]

اقرا [[.env]] وكل متغير فيه يبقى export ([[set -a]])، عشان [[envsubst]] و [[jq]] (برامج منفصلة) يشوفوه.

### [[: "$__{INTERNAL_TOKEN:?need INTERNAL_TOKEN in .env}"]]

لو التوكن ناقص اقف برسالة. و [[:]] أمر فاضي عشان bash يفك الـ [[$__{}]] بس:

~~~text الناتج (.env من غير التوكن)
scripts/n8n_import.sh: line 5: INTERNAL_TOKEN: need INTERNAL_TOKEN in .env
exit=1
~~~

### [[export APP_URL="$__{APP_URL:-http://app:8080}"]]

[[:-]] (مش [[:?]]): لو [[APP_URL]] مش موجود خد القيمة الافتراضية. و [[app]] هنا اسم الخدمة في compose، فـ n8n يوصل للتطبيق من جوه شبكة Docker. و [[export]] عشان envsubst يشوفه.

### [[command -v envsubst >/dev/null || { echo "sudo apt install gettext-base"; exit 1; }]]

- [[command -v envsubst]] بيطبع مكان البرنامج لو موجود، ويفشل لو مش موجود.
- [[>/dev/null]] ارمي الطباعة، احنا عايزين النجاح أو الفشل بس.
- لو مش موجود: قول تسطّبه منين واقف.

~~~text الناتج (من غير envsubst)
sudo apt install gettext-base
exit=1
~~~

---

## ٢. الفولدر المؤقت والتنضيف

### [[TMP="$(mktemp -d)"; chmod 700 "$TMP"]]

- [[mktemp -d]] بيعمل فولدر جديد باسم عشوائي ويطبع مساره: [[/tmp/tmp.HfcgTpwPTy]].
- [[chmod 700]]: صاحبه بس يقرا ويكتب ويدخل، عشان التوكن هيتكتب جوه.

~~~text ls -ld
drwx------ 2 root root 4096 Oct  7 15:59 /tmp/tmp.5T7W64L1QV
~~~

[[drwx------]]: [[d]] فولدر، و [[rwx]] للصاحب، وبعدها [[------]] مفيش أي صلاحية للباقيين.

### [[cleanup() { ... }]]

~~~bash
cleanup() { rm -rf "$TMP"; docker compose exec -T n8n rm -rf /tmp/wf /tmp/creds.json || true; }
~~~

دالة بتمسح الفولدر المؤقت على جهازك، والملفات اللي هتتحط جوه الـ container. و [[|| true]] عشان لو الـ container واقف، الفشل ميبوّظش التنضيف.

### [[trap cleanup EXIT]]

[[trap]] بيقول لـ bash «لما يحصل كذا، شغّل الأمر ده». و [[EXIT]] = السكربت بيخلص بأي طريقة: نجح، أو وقف بسبب [[set -e]]، أو [[exit 1]]. جربت خليت استيراد الـ workflows يفشل:

~~~text الناتج
(fake n8n) n8n import:workflow --separate --input=/tmp/wf
Error: import failed
(fake docker) exec n8n rm -rf /tmp/wf /tmp/creds.json
exit=1
~~~

الـ cleanup اشتغل رغم الفشل، و [[ls -d /tmp/tmp.*]] بعدها قال مفيش، والـ container نضيف.

---

## ٣. ملء الـ placeholders

~~~bash
mkdir -p "$TMP/wf"
for f in n8n/workflows/*.json; do
  envsubst '$__{APP_URL} $__{CHAT_ID}' < "$f" > "$TMP/wf/$(basename "$f")"
done
~~~

- [[mkdir -p]] اعمل الفولدر (و [[-p]] من غير خطأ لو موجود).
- اللوب على كل ملف [[.json]] في فولدر الـ workflows.
- [[envsubst]] بيقرا نص من الـ stdin ([[< "$f"]])، ويبدّل المتغيرات بقيمها، ويطبع على الـ stdout ([[> ...]]).
- [[basename "$f"]] اسم الملف من غير الفولدر، فالنسخة المتعبية تتحط بنفس الاسم في [[$TMP/wf]].

### ليه القايمة [[ '$__{APP_URL} $__{CHAT_ID}' ]] مهمة؟

العلامات المفردة [[' ']] عشان bash نفسه ميفكّش المتغيرات، ويبعتها لـ envsubst كنص: «بدّل دول بس». جربت أمر الـ try بالقايمة ومن غيرها (ضفت [[$json.msg]] زي اللي n8n بيستخدمه):

~~~text بالقايمة ثم من غيرها
{"url": "http://app:8080", "x": "$__{HOME}"}
{"url": "http://app:8080", "x": "/root", "j": ".msg"}
~~~

من غير قايمة، [[$__{HOME}]] اتبدّل بـ [[/root]]، و [[$json]] اتبدّل **بفاضي** لأن مفيش متغير اسمه json، ففضل [[.msg]] بس. ده كان هيبوّظ كل expression في الـ workflow من غير أي رسالة.

والناتج في السكربت: [[$__{APP_URL}]] بقى [[http://app:8080]] و [[$__{CHAT_ID}]] بقى [[-100555]]، و [[$json.message]] فضل زي ما هو.

---

## ٤. [[if grep -rqE '\$\{[A-Z_]+\}' "$TMP/wf/"; then echo "unfilled placeholders"; exit 1; fi]]

- [[grep -r]] دوّر في كل ملفات الفولدر، [[-q]] من غير طباعة (exit code بس)، [[-E]] regex موسّع.
- الـ regex: [[\$]] علامة [[$]] حقيقية، [[\{]] قوس حقيقي، [[[A-Z_]+]] حروف كبيرة أو [[_]]، [[\}]] قفلة. يعني أي [[$__{SOMETHING}]] فضل في الملفات.
- لو لقى: placeholder نسيته في قايمة envsubst، فاقف قبل ما تستورد workflow بايظ.

جربت غيّرت [[$__{CHAT_ID}]] في الملف لـ [[$__{CHAT_IDD}]]:

~~~text الناتج
unfilled placeholders
(fake docker) exec n8n rm -rf /tmp/wf /tmp/creds.json
exit=1
~~~

و [[$json]] مش هيتمسك، لأنه حروف صغيرة ومن غير أقواس.

---

## ٥. ملف الـ credentials

~~~bash
( umask 077; jq -n '[{id:"app-internal", ...value:("Bearer " + env.INTERNAL_TOKEN)}}]' > "$TMP/creds.json" )
~~~

### [[( ... )]] و [[umask 077]]

- [[umask]] بيحدد الصلاحيات اللي **متتديش** للملفات الجديدة. [[077]]: الصاحب بس، فالملف يطلع [[600]] ([[rw-------]]).
- الأقواس [[( )]] بتشغّل ده في subshell (نسخة منفصلة من الـ shell)، فالـ umask يتغيّر جوه بس ومياثرش على باقي السكربت.

~~~text ls -l (ملف جوه الأقواس وملف عادي)
-rw------- 1 root root 2 Oct  7 15:59 creds.json
-rw-r--r-- 1 root root 2 Oct  7 15:59 normal
~~~

### [[jq -n '...']]

- [[jq]] أداة JSON، و [[-n]] (null input) معناها «متقراش أي إدخال، ابني JSON من الصفر».
- جوه: array فيها object واحد بالشكل اللي n8n مستنيه: [[id]] و [[name]] و [[type: httpHeaderAuth]] (توكن في header) و [[data]].
- [[env.INTERNAL_TOKEN]]: jq بيقرا المتغير من البيئة مباشرة، فالتوكن مش مكتوب في سطر الأوامر ومش هيبان في [[ps]].
- [[+]] بين نصين في jq بيلزقهم: [[Bearer tok_abc123]].

~~~text creds.json
[
  {
    "id": "app-internal",
    "name": "app internal",
    "type": "httpHeaderAuth",
    "data": {
      "name": "authorization",
      "value": "Bearer tok_abc123"
    }
  }
]
~~~

---

## ٦. الإدخال لـ n8n

### [[docker compose exec -T n8n sh -c 'umask 077; cat > /tmp/creds.json' < "$TMP/creds.json"]]

- [[< "$TMP/creds.json"]]: ابعت الملف على الـ stdin بتاع الأمر.
- [[exec -T n8n]]: شغّل أمر جوه خدمة [[n8n]]، و [[-T]] من غير terminal عشان الإدخال جاي من ملف.
- [[sh -c '...']]: جوه الـ container، [[cat]] بيقرا الـ stdin ويكتبه في [[/tmp/creds.json]] بـ umask 077.

ليه مش [[docker compose cp]] زي باقي الملفات؟ لأن [[cp]] بيعمل الملف جوه ملك [[root]] بنفس صلاحية [[600]]، و n8n شغال بيوزر اسمه [[node]] (من توثيق الـ image). جربت ده في container [[node:22-alpine]] شغال بـ [[-u node]]:

~~~text بعد docker cp
uid=1000(node) gid=1000(node) groups=1000(node)
-rw-------    1 root     root             7 Oct  7 15:59 /tmp/creds.json
cat: can't open '/tmp/creds.json': Permission denied
rm: can't remove '/tmp/creds.json': Operation not permitted
~~~

يعني n8n مكانش هيقدر يقراه، والـ cleanup مكانش هيقدر يمسحه، والتوكن يفضل جوه. وبالطريقة دي:

~~~text بعد sh -c 'umask 077; cat > ...'
-rw-------    1 node     node             7 Oct  7 16:00 /tmp/creds2.json
secret
rm exit=0
~~~

الملف ملك [[node]] و [[600]]، بيتقري وبيتمسح. ده كان غلط في نسخة الدرس واتصلّح.

### [[n8n import:credentials --input=/tmp/creds.json]]

أمر الـ CLI بتاع n8n بيستورد الـ credentials من الملف.

### [[mkdir -p /tmp/wf]] ثم [[docker compose cp "$TMP/wf/." n8n:/tmp/wf/]]

- الفولدر بيتعمل بيوزر الـ container، فيقدر يمسحه بعدين.
- [[docker compose cp]] بينسخ من جهازك للـ container ([[n8n:]] قبل المسار معناها جوه خدمة n8n).
- [[wf/.]] (بالنقطة): انسخ **محتوى** الفولدر، مش الفولدر نفسه، فالملفات تنزل في [[/tmp/wf/]] على طول. ملفات الـ workflows مش سرية وصلاحيتها عادية، فيوزر node يقدر يقراها.

### [[n8n import:workflow --separate --input=/tmp/wf]]

[[--separate]]: الـ input فولدر فيه ملف لكل workflow، مش ملف واحد فيه array.

~~~text الناتج كله (n8n وهمي)
(fake docker) exec n8n sh -c umask 077; cat > /tmp/creds.json
(fake n8n) n8n import:credentials --input=/tmp/creds.json
(fake docker) exec n8n mkdir -p /tmp/wf
(fake docker) compose cp /tmp/tmp.HfcgTpwPTy/wf/. n8n:/tmp/wf/
(fake n8n) n8n import:workflow --separate --input=/tmp/wf
imported: activate the workflows from the n8n UI
(fake docker) exec n8n rm -rf /tmp/wf /tmp/creds.json
exit=0
~~~

آخر سطر هو الـ trap. ومع n8n حقيقي، الاستيراد بيطبع حاجة زي [[Successfully imported 3 workflows.]] (من الـ docs).

### [[echo "imported: activate the workflows from the n8n UI"]]

الـ workflows بتتستورد متوقفة، فلازم تفعّلها بإيدك.

---

| الخطوة | الأمر |
|---|---|
| إعدادات | [[set -a; . ./.env]] و [[:?]] و [[:-]] |
| أدوات | [[command -v envsubst]] |
| مكان آمن | [[mktemp -d]] و [[chmod 700]] |
| تنضيف مضمون | [[trap cleanup EXIT]] |
| ملء القيم | [[envsubst 'قايمة']] |
| فحص | [[grep -rqE '\$\{[A-Z_]+\}']] |
| أسرار | [[umask 077]] و [[jq -n ... env.X]] |
| إدخال | [[exec -T ... cat >]] للسر، و [[compose cp]] للباقي |
| استيراد | [[n8n import:credentials]] و [[import:workflow --separate]] |

## الخلاصة

- envsubst من غير قايمة بيبدّل كل [[$كلمة]]، حتى expressions الـ n8n.
- [[trap ... EXIT]] بيضمن التنضيف حتى لو السكربت وقع.
- [[docker cp]] بيعمل الملفات ملك root جوه الـ container؛ لو التطبيق بيوزر تاني، اكتب السر من جوه.
- الـ workflows بتتستورد متوقفة.`,
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
            "ابعته جوه الـ container على الـ stdin، فيتكتب بيوزر n8n وبصلاحية 600.",
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

لو طلع [[envsubst: command not found]] سطّب [[gettext-base]]. ولو n8n قال [[Could not find workflows]] يبقى المسار في [[--input]] غلط أو [[docker compose cp]] ماوصلش الملفات. (جربت السكربت كله في container أوبونتو بـ docker وهمي بيمثّل container الـ n8n، فكل خطوة اتنفّذت ماعدا n8n نفسه؛ رسايل n8n دي من الـ docs.)`
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
    "SELECT id, phone FROM users WHERE phone IS NOT NULL AND phone NOT LIKE '+%' ORDER BY id");
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
          teach: R`## الأول: الفكرة

السكربت بيحوّل أرقام الموبايل المصرية المكتوبة بأي شكل ([[010-1234-5678]] و [[0111 222 3333]]) لصيغة دولية واحدة ([[+201012345678]]). والمهم مش التحويل، المهم **الأمان**: الافتراضي معاينة، وكل حاجة في transaction، والحالات الغريبة بتتخطى.

جربته بـ [[node:22-slim]] (Node 22.23.3 ومكتبة [[pg]] 8.23.1) على [[postgres:16]] في شبكة Docker، على جدول ده (عمود [[phone]] عليه [[unique]]):

~~~text select id, phone from users
1|01012345678
2|010-1234-5678
3|0101234
4|0111 222 3333
5|01122223333
6|+201099999999
7|
~~~

الصف ١ و ٢ نفس الرقم مكتوب بشكلين، و ٣ ناقص، و ٦ متعدّل أصلًا، و ٧ فاضي (NULL).

---

## ١. التعليقين فوق: إزاي يتشغّل

~~~bash
node --env-file=.env scripts/normalize-phones.mjs          # معاينة
node --env-file=.env scripts/normalize-phones.mjs --apply  # تنفيذ
~~~

- [[--env-file=.env]]: Node (من 20.6) بيقرا ملف [[.env]] ويحط اللي فيه في [[process.env]]، من غير مكتبة [[dotenv]].
- [[.mjs]]: امتداد معناه ES module، فينفع [[import]] و [[await]] في أول الملف.

من غير [[--env-file]] مفيش [[DATABASE_URL]]، فـ pg بيحاول الافتراضي (localhost):

~~~text الناتج
Error: connect ECONNREFUSED 127.0.0.1:5432
~~~

---

## ٢. [[import pg from "pg";]]

مكتبة Postgres لـ Node ([[npm i pg]]).

## ٣. دالة [[normalize]]

~~~js
const normalize = p => { const d = p.replace(/\D/g, ""); return d.length === 11 && d.startsWith("01") ? "+2" + d : null; };
~~~

- [[p => { ... }]]: دالة بتاخد [[p]] (الرقم زي ما هو).
- [[p.replace(/\D/g, "")]]: [[/\D/]] regex معناه «أي حرف **مش** رقم» ([[\d]] رقم، و [[\D]] الكبيرة عكسها)، و [[g]] (global) كل مرة مش أول واحدة بس. يعني امسح الشرط والمسافات والأقواس.
- [[d.length === 11 && d.startsWith("01")]]: رقم موبايل مصري = ١١ رقم بيبدأ بـ [[01]].
- [[? "+2" + d : null]]: لو الشرط صح رجّع [[+2]] قبل الرقم ([[+20]] كود مصر، والـ [[0]] موجودة أصلًا في أول الرقم). لو لأ رجّع [[null]] = «مش عارف».

~~~text الناتج (الرقم ← بعد المسح ← النتيجة)
"010-1234-5678" -> "01012345678" -> +201012345678
"0111 222 3333" -> "01112223333" -> +201112223333
"0101234" -> "0101234" -> null
"(010) 1234 5678" -> "01012345678" -> +201012345678
~~~

[[null]] مهمة: الدالة مبتخمّنش. الرقم الناقص مش هيتحوّل لحاجة غلط.

## ٤. [[const APPLY = process.argv.includes("--apply");]]

[[process.argv]] قايمة بكل اللي اتكتب في سطر الأوامر. جربت [[node argv.mjs --apply]] وطبعت من التاني ورايح:

~~~text الناتج
[ '/app/argv.mjs', '--apply' ]
~~~

و [[.includes("--apply")]] بترجع [[true]] لو موجودة. فالافتراضي ([[false]]) معاينة، ولازم تكتبها بإيدك عشان يكتب.

## ٥. الاتصال

~~~js
const c = new pg.Client({ connectionString: process.env.DATABASE_URL });
await c.connect();
~~~

[[pg.Client]] اتصال واحد بالقاعدة (مش pool)، وده المطلوب: الـ transaction لازم تبقى على **نفس** الاتصال. و [[await]] استنى لحد ما الاتصال يخلص.

---

## ٦. [[try { ... } catch { ... } finally { ... }]]

- [[try]]: الشغل كله.
- [[catch (e)]]: لو أي سطر رمى خطأ.
- [[finally]]: يتنفّذ في كل الحالات، نجح أو فشل.

### المرشحين

~~~js
const { rows } = await c.query(
  "SELECT id, phone FROM users WHERE phone IS NOT NULL AND phone NOT LIKE '+%' ORDER BY id");
~~~

- [[phone IS NOT NULL]]: سيب الفاضي (صف ٧).
- [[NOT LIKE '+%']]: [[%]] في SQL أي حاجة، يعني «مش بادئ بـ +» (سيب صف ٦، متعدّل أصلًا).
- [[ORDER BY id]]: ترتيب ثابت. من غيره Postgres مش ملزم بأي ترتيب، فلو رقمين هيبقوا نفس القيمة، مين يتعدّل ومين يبقى تعارض كان ممكن يختلف بين المعاينة والتنفيذ. **اتضاف في الدرس ده.**
- [[const { rows } = ...]]: [[c.query]] بترجع object فيه [[rows]] (الصفوف) وحاجات تانية، والأقواس [[{ }]] بتطلّع [[rows]] بس.

### [[console.log(APPLY ? "APPLY" : "DRY-RUN", "candidates:", rows.length);]]

اطبع الوضع وعدد المرشحين: [[DRY-RUN candidates: 5]].

### [[let changed = 0, skipped = 0, conflicts = 0;]] و [[await c.query("BEGIN");]]

٣ عدّادات، وبعدين [[BEGIN]]: من هنا كل تعديل مؤقت لحد [[COMMIT]] أو [[ROLLBACK]].

---

## ٧. اللوب

~~~js
for (const u of rows) {
  const next = normalize(u.phone);
  if (!next) { skipped++; continue; }
~~~

لكل صف [[u]] ([[u.id]] و [[u.phone]])، احسب الرقم الجديد. لو [[null]] ([[!next]] = مش موجود)، عدّه skipped وروح للي بعده.

### التعارض

~~~js
const clash = await c.query(
  "SELECT 1 FROM users WHERE phone=$1 AND id<>$2", [next, u.id]);
if (clash.rowCount) { conflicts++; continue; }
~~~

- السؤال: فيه يوزر **تاني** ([[id<>$2]]، و [[<>]] = لا يساوي) رقمه بالفعل هو الرقم الجديد؟
- [[$1]] و [[$2]]: parameters. القيم بتتبعت لوحدها في array ([[[next, u.id]]])، مش بتتلزق في نص الـ SQL، فمفيش SQL injection.
- [[SELECT 1]]: مش محتاجين بيانات، بس هل فيه صف. و [[rowCount]] عدد الصفوف، و [[0]] في JS = false.
- لو فيه: ده قرار بشري (أنهي حساب ياخد الرقم؟)، فعدّه conflict واتخطاه.

### التعديل

~~~js
console.log(" ", u.phone, "->", next);
await c.query("UPDATE users SET phone=$1 WHERE id=$2", [next, u.id]);
changed++;
~~~

الـ UPDATE بيحصل **حتى في المعاينة**، جوه الـ transaction. ليه؟ عشان الصف ٢ لما ييجي دوره، الـ SELECT بتاع التعارض يشوف إن صف ١ بقى [[+201012345678]] خلاص (الـ transaction بتشوف تعديلاتها). ولولا كده المعاينة كانت هتقول إن الاتنين هيتعدّلوا، والتنفيذ يطلع غير كده.

## ٨. [[await c.query(APPLY ? "COMMIT" : "ROLLBACK");]]

- apply: [[COMMIT]] احفظ كل حاجة.
- معاينة: [[ROLLBACK]] ارجع في كل حاجة، كأن مفيش حاجة حصلت.

ثم الملخص، والتذكير لو في معاينة:

~~~js
console.log({ changed, skipped, conflicts });
if (!APPLY && changed) console.log("Run again with --apply to write.");
~~~

[[{ changed, skipped, conflicts }]] اختصار لـ [[{ changed: changed, ... }]].

---

## ٩. التشغيل

### معاينة

~~~text node --env-file=.env scripts/normalize-phones.mjs
DRY-RUN candidates: 5
  01012345678 -> +201012345678
  0111 222 3333 -> +201112223333
  01122223333 -> +201122223333
{ changed: 3, skipped: 1, conflicts: 1 }
Run again with --apply to write.
exit=0
~~~

٥ مرشحين: ٣ هيتعدّلوا، و [[0101234]] اتخطى، و [[010-1234-5678]] تعارض مع صف ١. والجدول بعدها زي ما هو بالظبط.

### [[--apply]]

~~~text node --env-file=.env scripts/normalize-phones.mjs --apply
APPLY candidates: 5
  01012345678 -> +201012345678
  0111 222 3333 -> +201112223333
  01122223333 -> +201122223333
{ changed: 3, skipped: 1, conflicts: 1 }
~~~

نفس أرقام المعاينة بالظبط. والجدول:

~~~text بعد apply
1|+201012345678
2|010-1234-5678
3|0101234
4|+201112223333
5|+201122223333
6|+201099999999
~~~

### تالت مرة

~~~text الناتج
DRY-RUN candidates: 2
{ changed: 0, skipped: 1, conflicts: 1 }
~~~

اللي اتعدّل مبقاش مرشح، وفضل اللي محتاج قرار منك. يعني السكربت آمن تشغّله أكتر من مرة (idempotent).

---

## ١٠. [[catch]]: لو حصل خطأ في النص

~~~js
} catch (e) {
  await c.query("ROLLBACK"); throw e;
} finally {
  await c.end();
}
~~~

- [[ROLLBACK]]: الغي أي تعديل حصل قبل الخطأ.
- [[throw e]]: ارمي الخطأ تاني عشان يظهر والسكربت يخرج بـ exit code غير صفر.
- [[c.end()]]: اقفل الاتصال، وإلا Node يفضل مستني.

جربت حطيت constraint بيرفض [[+201122223333]] (آخر رقم) وشغّلت بـ [[--apply]]:

~~~text الناتج
APPLY candidates: 5
  01012345678 -> +201012345678
  0111 222 3333 -> +201112223333
  01122223333 -> +201122223333
error: new row for relation "users" violates check constraint "teach_boom"
~~~

أول تعديلين نجحوا، والتالت وقع. والجدول بعدها: **ولا صف اتغيّر**، حتى الأولين. ده الـ ROLLBACK.

---

| الحتة | ليه |
|---|---|
| [[--apply]] لازم تكتبها | الافتراضي معاينة |
| [[normalize]] بترجع [[null]] | متخمّنش |
| [[ORDER BY id]] | المعاينة والتنفيذ نفس الترتيب |
| SELECT التعارض قبل UPDATE | رقمين لنفس القيمة = قرار بشري |
| [[$1]] و [[$2]] | مفيش SQL injection |
| UPDATE حتى في المعاينة + [[ROLLBACK]] | المعاينة تشوف نفس اللي هيحصل |
| [[catch]] فيه [[ROLLBACK]] | مفيش نص تعديل |
| [[finally]] فيه [[c.end()]] | الاتصال يتقفل دايمًا |

## الخلاصة

- أي سكربت بيعدّل بيانات حقيقية: معاينة افتراضي، و [[--apply]] بإيدك.
- كله في transaction واحدة، والمعاينة بتعمل نفس الشغل وترجع فيه بـ ROLLBACK.
- الحالات الغريبة بتتعدّ وتتخطى، مش بتتخمّن.`,
          lines: [
            "مكتبة Postgres.",
            "حوّل الرقم لصيغة دولية، أو null لو الصيغة مش معروفة.",
            "هل المستخدم كتب --apply؟",
            "اتصال بالقاعدة من DATABASE_URL.",
            "اتصل.",
            "ابدأ try:",
            "هات المرشحين...",
            "...الأرقام اللي مش بادئة بـ +، بترتيب ثابت عشان المعاينة والتنفيذ يمشوا بنفس الترتيب.",
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
          teach: R`## الأول: الفكرة

التعديل بيعدّي على ٤ محطات: الكود ← الـ image ← الـ container ← المتصفح. السكربت ده مش «إصلاح»، ده **فحص** المحطات بالترتيب. أول محطة تلاقي فيها القديم، هي مكان المشكلة.

جربته على ويندوز (Docker Desktop) في مشروع compose صغير اسمه [[teach-real04-fd]]: خدمة [[frontend]] مبنية من Dockerfile سطرين ([[FROM nginx:alpine]] و [[COPY site/ /usr/share/nginx/html/]]) وصفحة [[index.html]] فيها [[Hello v1]]، وخدمة [[db]] من [[redis:8-alpine]] عشان نشوف إن المسح مبيلمسهاش. والموقع على [[http://127.0.0.1:18089/]] بدل [[https://example.com/]]. وبعدين غيّرت الصفحة لـ [[Hello v2 changed]].

الأسطر اللي بتبدأ بـ [[#]] تعليقات، بتقسّم الخطوات.

---

## خطوة ٠: الغلطة الأشهر

قبل أي حاجة، جربت [[docker compose up -d frontend]] من غير build بعد التعديل:

~~~text الناتج
 Container teach-real04-fd-frontend-1 Running
<h1>Hello v1</h1>
~~~

[[Running]]: compose شاف إن مفيش حاجة اتغيّرت في الـ image، فساب الـ container زي ما هو. الكود اتغيّر على جهازك بس، والـ image لسه القديمة.

---

## ١. البناء والتشغيل

### [[docker compose build --pull frontend]]

- [[build]]: ابني الـ image من الـ Dockerfile.
- [[frontend]]: الخدمة دي بس، مش كل المشروع (أسرع، ومبيلمسش الباقي).
- [[--pull]]: قبل البناء، هات أحدث نسخة من الـ base image ([[nginx:alpine]]) من الإنترنت. ده كويس على السيرفر عشان التحديثات الأمنية. **أنا شغّلته من غير [[--pull]]** عشان مايحدّثش نسخة [[nginx:alpine]] اللي على الجهاز؛ سلوكه من الـ docs.

~~~text الناتج (المهم منه)
#6 CACHED
#7 [2/2] COPY site/ /usr/share/nginx/html/
 Image teach-real04-fd-frontend Built
~~~

[[#6 CACHED]]: خطوة [[FROM]] متاخدة من الكاش (مفيش تغيير). [[#7]] الـ COPY اتنفّذت من جديد لأن الملفات اتغيّرت. لو كانت [[CACHED]] هي كمان، يبقى Docker مش شايف تعديلك (مثلًا [[.dockerignore]] مستبعده، أو الـ COPY من فولدر غلط).

### [[docker compose up -d frontend]]

[[-d]] في الخلفية. ولما الـ image تتغيّر، compose بيعمل container جديد:

~~~text الناتج
 Container teach-real04-fd-frontend-1 Recreated
 Container teach-real04-fd-frontend-1 Starting
 Container teach-real04-fd-frontend-1 Started
~~~

[[Recreated]] هي الكلمة اللي بتدوّر عليها.

### [[docker compose ps]]

~~~text الناتج
NAME                         IMAGE                      ...   SERVICE    CREATED          STATUS                  PORTS
teach-real04-fd-db-1         redis:8-alpine             ...   db         17 seconds ago   Up 16 seconds           6379/tcp
teach-real04-fd-frontend-1   teach-real04-fd-frontend   ...   frontend   2 seconds ago    Up Less than a second   127.0.0.1:18089->80/tcp
~~~

| العمود | بتبص فيه على إيه |
|---|---|
| [[IMAGE]] | [[teach-real04-fd-frontend]]: الاسم اللي compose بيديه للـ image = اسم المشروع + اسم الخدمة |
| [[CREATED]] | [[2 seconds ago]]: الـ container جديد فعلًا |
| [[STATUS]] | [[Up]] شغال. لو [[Restarting]] أو [[Exited]] يبقى بيقع وهو بيقوم |
| [[PORTS]] | [[127.0.0.1:18089->80/tcp]]: بورت جهازك ← بورت جوه الـ container |

### [[docker compose logs --tail=50 frontend]]

آخر ٥٠ سطر من لوج الخدمة. هنا nginx قام عادي:

~~~text الناتج (آخر سطرين)
frontend-1  | 2026/10/07 16:04:45 [notice] 1#1: start worker process 44
frontend-1  | 2026/10/07 16:04:45 [notice] 1#1: start worker process 45
~~~

لو قايم بيقع، سبب الوقعة هيبقى هنا.

---

## ٢. [[docker compose exec frontend ls -la /usr/share/nginx/html]]

- [[exec frontend]]: شغّل أمر جوه الـ container الشغال.
- [[ls -la]]: كل الملفات ([[-a]]) بالتفاصيل ([[-l]]): الصلاحيات والحجم والتاريخ.
- [[/usr/share/nginx/html]]: الفولدر اللي nginx بيقدّم منه.

~~~text الناتج
total 16
drwxr-xr-x    1 root     root          4096 Oct  7 16:04 .
drwxr-xr-x    1 root     root          4096 Sep 22 21:19 ..
-rw-r--r--    1 root     root           497 Sep 15 14:18 50x.html
-rwxr-xr-x    1 root     root            26 Oct  7 16:04 index.html
~~~

[[index.html]] تاريخه دلوقتي وحجمه [[26]] (طول [[<h1>Hello v2 changed</h1>]] + سطر جديد). و [[50x.html]] تاريخه قديم لأنه جاي من [[nginx:alpine]] نفسها. لو [[index.html]] كان لسه بتاريخ قديم، المشكلة في خطوة ١ ومتكمّلش.

---

## ٣. [[curl -sI https://example.com/ | grep -iE 'cache-control|etag|last-modified']]

### [[curl -sI]]

- [[-s]] (silent) من غير شريط التحميل.
- [[-I]] اطلب الـ headers بس (طلب HEAD)، مش الصفحة.

### [[grep -iE '...']]

- [[-i]] مش فارق كابيتال وسمول.
- [[-E]] regex موسّع، و [[|]] جوه معناها «أو»: هات أي سطر فيه واحدة من التلاتة.

قبل التعديل وبعده:

~~~text قبل
Last-Modified: Wed, 07 Oct 2026 16:04:25 GMT
ETag: "6ac66d89-12"
~~~

~~~text بعد
Last-Modified: Wed, 07 Oct 2026 16:04:41 GMT
ETag: "6ac66d99-1a"
~~~

| الـ header | معناه |
|---|---|
| [[Last-Modified]] | آخر تعديل للملف على السيرفر |
| [[ETag]] | بصمة للنسخة. في nginx هي وقت التعديل والحجم بالـ hex: [[12]] = 18 بايت ([[Hello v1]])، و [[1a]] = 26 بايت |
| [[Cache-Control]] | المتصفح يحتفظ بالنسخة قد إيه. nginx الافتراضي مبيبعتهوش، عشان كده مطلعش |

الـ ETag اتغيّر = السيرفر بيرجّع الجديد. فلو المتصفح لسه بيوريك القديم، المشكلة في كاش المتصفح أو CDN، و Ctrl+Shift+R (تحميل من غير كاش) بيوريك الجديد. ومفيش أي حاجة في Docker محتاجة تتمسح. ولو لقيت [[Cache-Control: max-age=31536000]] على [[index.html]] نفسه، ده السبب: المتصفح هيحتفظ بيه سنة.

---

## ٤. آخر حل: من الصفر، بس للمشروع ده

### [[docker compose down --rmi local]]

- [[down]]: وقّف وامسح الـ containers والشبكة بتاعة المشروع.
- [[--rmi local]]: وامسح كمان الصور اللي compose **بناها** (اللي ملهاش [[image:]] في ملف compose). الصور اللي اتنزّلت زي [[redis:8-alpine]] بتفضل.
- من غير [[-v]]، الـ volumes (البيانات) بتفضل.

~~~text الناتج
 Container teach-real04-fd-db-1 Removed
 Container teach-real04-fd-frontend-1 Removed
 Image teach-real04-fd-frontend:latest Removing
 Network teach-real04-fd_default Removing
 Image teach-real04-fd-frontend:latest Removed
 Network teach-real04-fd_default Removed
~~~

و [[docker images]] قبل وبعد:

~~~text قبل ثم بعد
teach-real04-fd-frontend:latest
redis:8-alpine

redis:8-alpine
~~~

صورة المشروع اتمسحت و [[redis:8-alpine]] فضلت. قارن بـ [[docker system prune]] اللي بيمسح كل container واقف وكل image مش مستخدمة على الجهاز كله، تبع أي مشروع.

### [[docker compose build --no-cache]]

[[--no-cache]]: متستخدمش أي طبقة من الكاش، نفّذ كل خطوة من الأول. لاحظ إن الناتج مفيهوش [[CACHED]] غير على [[FROM]] (الـ base image نفسها موجودة على الجهاز):

~~~text الناتج (المهم منه)
#6 [1/2] FROM docker.io/library/nginx:alpine@sha256:df221db8...
#6 CACHED
#7 [2/2] COPY site/ /usr/share/nginx/html/
 Image teach-real04-fd-frontend Built
~~~

### [[docker compose up -d]]

شغّل الكل تاني:

~~~text الناتج
 Container teach-real04-fd-db-1 Started
 Container teach-real04-fd-frontend-1 Started
<h1>Hello v2 changed</h1>
~~~

---

| المحطة | الأمر | لو لقيت القديم |
|---|---|---|
| الـ image | [[build frontend]] (شوف [[CACHED]] على الـ COPY) | [[.dockerignore]] أو COPY غلط |
| الـ container | [[up -d]] و [[ps]] (شوف [[Recreated]] و [[CREATED]]) | ماعملتش build، أو بيقع (شوف [[logs]]) |
| الملفات جوه | [[exec ... ls -la]] | الـ build مجابش الملف |
| السيرفر | [[curl -sI]] (الـ ETag) | nginx أو proxy قدامه |
| المتصفح | Ctrl+Shift+R | كاش، شوف [[Cache-Control]] |

## الخلاصة

- [[up -d]] من غير build مبيغيّرش حاجة لو الكود بس اللي اتغيّر.
- اقف عند أول محطة فيها القديم، ده السبب.
- لو الـ ETag اتغيّر، Docker سليم والمشكلة كاش.
- [[down --rmi local]] بيمسح صور المشروع ده بس، مش زي [[system prune]].`,
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

خطوة ٤ نادرًا ما تحتاجها، و [[--rmi local]] بيمسح الصور اللي compose بناها للمشروع ده (اللي ملهاش اسم محدد بـ [[image:]]) بس، مش volumes ولا مشاريع تانية زي [[docker system prune]]. (الخطوات دي نفس اللي جربتها في درس Dockerfile (Vite + nginx) لما قارنت الـ Cache-Control.)`
        }
      ]
    }
]);
