// تكملة تاب bash: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/bash/01.js (شرح حقول الدرس في أوله)
MORE("bash", [
    {
      t: "Makefile: أوامر المشروع في مكان واحد",
      l: 3,
      n: "ملف واحد فيه كل أوامر المشروع، وأي حد يكتب make help يعرفها",
      items: [
        {
          cmd: "make",
          title: "أوامر المشروع كلها في أسامي قصيرة",
          desc: R`[[Makefile]] في فولدر المشروع بيعرّف targets: اسم، ونقطتين، وتحته الأوامر. فبدل ما تفتكر [[docker compose logs -f --tail=100 app]] تكتب [[make logs]]. وأهم قاعدة: سطور الأوامر لازم تبدأ بـ Tab حقيقي مش مسافات، وإلا هيطلع «missing separator».`,
          example: R`COMPOSE := docker compose

.PHONY: up down logs build

up:
	$(COMPOSE) up -d

down:
	$(COMPOSE) down

logs:
	$(COMPOSE) logs -f --tail=100 app

build:
	$(COMPOSE) build app
# من الترمنال:  make build && make up && make logs`,
          try: "اعمل Makefile فيه target اسمه hello بيعمل [[date]]، وشغّله بـ [[make hello]]، وبعدين حط مسافات بدل الـ Tab وشوف الـ error.",
          flag: "script",
          mac: ["both", "make بييجي مع [[xcode-select --install]]، بس نسخته قديمة (3.81)، وده بيفرق في حاجات قليلة زي [[.ONESHELL]]. وعلى ويندوز استخدمه من WSL."],
          deep: {
            why: "كل مشروع فيه أوامر طويلة بتتكرر: تشغيل الـ stack، واللوجات، والـ migrations، والتيستات. كل واحد في الفريق بيحفظها بطريقته أو بيدوّر عليها في README. [[make]] بيحوّلها لأسامي قصيرة ثابتة في ملف جوه الريبو، فأي حد يعمل [[make up]] من غير ما يعرف التفاصيل.",
            how: R`[[make]] أصلًا أداة build قديمة: كل target اسمه اسم ملف، و make بيشغّل أوامره عشان يعمل الملف ده. بس الناس بتستخدمه كتير كـ «قايمة أوامر» للمشروع، وده شغال كويس.

شكل الـ target: الاسم وبعده [[:]]، وتحته الأوامر (اسمها recipe)، كل سطر بيبدأ بـ Tab. والـ Tab ده جزء من اللغة نفسها مش تنسيق: make بيعرف إن السطر أمر من الـ Tab.

[[COMPOSE := docker compose]] متغير، وبتستخدمه بـ [[$(COMPOSE)]] (بقوسين عاديين). لو احتجت تغيّره تغيّره في سطر واحد.

[[.PHONY]] بتقول لـ make «الأسامي دي مش ملفات». من غيرها، لو فيه فولدر اسمه [[build]] في المشروع، [[make build]] هيقول «build is up to date» ومش هيعمل حاجة، لأنه شايف إن «الملف» موجود.

ولو كتبت [[make]] لوحدها، بيشغّل أول target في الملف. وكل أمر بيطبع نفسه قبل ما يتنفذ، وأي أمر يفشل make بيقف ومش بيكمّل الباقي، فـ [[make build && make up]] آمنة.

والميزة الأصلية لـ make لسه موجودة: لو الـ target اسم ملف حقيقي وليه dependencies ([[dist/index.html: src/App.jsx]])، make بيعيد البناء بس لو المصدر أحدث من الناتج. ده نفس اللي بتعمله بإيدك في bash بـ [[test src/App.jsx -nt dist/index.html]].`,
            when: "أي مشروع فيه أكتر من ٣ أوامر بتتكرر، خصوصًا مشاريع Docker Compose. وخلي README يقول «اكتب make help» بدل ما يكتب الأوامر كلها.",
            mistakes: R`مسافات بدل Tab، ودي أشهر غلطة، وبتحصل لما المحرر بيحوّل الـ Tab لمسافات لوحده. في VS Code بص تحت على اليمين على «Spaces/Tab Size»، والأحسن تحط في [[.editorconfig]] قاعدة إن Makefile يبقى Tabs. ونسيان [[.PHONY]] مع target اسمه زي فولدر في المشروع ([[test]] و [[build]] و [[docs]] أشهرهم).`
          },
          teach: R`## الفكرة

[[Makefile]] ملف اسمه كده بالظبط، في فولدر المشروع، فيه «أسامي» وتحت كل اسم الأوامر بتاعته. تكتب [[make الاسم]] فـ make ينفّذ الأوامر دي. اتجرّب كله بـ [[GNU Make 4.3]] في container أوبونتو 24.04 كيوزر عادي (اتنزّل بـ [[apt-get install make]]). ومفيش Docker جوه الـ container، فعملنا ملف [[docker]] وهمي في الـ PATH بيطبع [[[docker stub]]] واللي وصله، عشان نشوف make بيبعت إيه بالظبط.

---

## ١. المتغير: [[COMPOSE := docker compose]]

- [[COMPOSE]] اسم المتغير (عادةً بحروف كبيرة).
- [[:=]] يعني «احسب القيمة دلوقتي مرة واحدة». فيه كمان [[=]] اللي بيحسبها كل مرة تتستخدم، والفرق بيبان لو القيمة معتمدة على متغير لسه متعرّفش:

~~~text الناتج: A = $(B) و C := $(B) وبعدهم B = later
A=[later] C=[]
~~~

[[C]] اتحسبت قبل ما [[B]] يتعرّف فطلعت فاضية. للقيم الثابتة زي هنا الاتنين زي بعض، و [[:=]] أوضح.

- واستخدامه [[$(COMPOSE)]]: دولار وقوسين عاديين. make بيبدّلها بـ [[docker compose]] قبل ما يشغّل السطر.

---

## ٢. [[.PHONY: up down logs build]]

make أصلًا معمول عشان يبني **ملفات**: كل target اسم ملف، ولو الملف موجود ومفيش حاجة اتغيرت، مش بيعمل حاجة. [[.PHONY]] (phony = مزيّف) بتقوله «الأسامي دي مش ملفات، نفّذها دايمًا». جربنا من غيرها ومعانا فولدر اسمه [[build]]:

~~~text الناتج: من غير .PHONY ثم معاها
make: 'build' is up to date.
docker compose build app
[docker stub] compose build app
~~~

من غيرها make شاف «الملف» [[build]] موجود وقال خلاص. معاها اشتغل.

---

## ٣. الـ target: [[up:]] وتحته الـ recipe

~~~text Makefile
up:
	$(COMPOSE) up -d
~~~

- [[up]] اسم الـ target، وبعده [[:]].
- السطر اللي تحته اسمه recipe (الوصفة)، ولازم يبدأ بحرف **Tab** حقيقي. [[cat -A]] بيوريه [[^I]]:

~~~text الناتج: cat -A Makefile (أول السطور)
COMPOSE := docker compose$
$
.PHONY: up down logs build$
$
up:$
^I$(COMPOSE) up -d$
~~~

([[$]] في آخر كل سطر هي علامة نهاية السطر عند [[cat -A]]، مش جزء من الملف.)

ولو حطيت مسافات بدل الـ Tab:

~~~text الناتج: 8 مسافات ثم 4 مسافات
M5:2: *** missing separator (did you mean TAB instead of 8 spaces?).  Stop.
M6:2: *** missing separator.  Stop.
~~~

[[M5:2]] يعني الملف M5 السطر 2. ومع ٨ مسافات بالظبط GNU make بيخمّن غلطتك.

---

## ٤. التشغيل

~~~bash
make up
~~~

~~~text الناتج
docker compose up -d
[docker stub] compose up -d
~~~

السطر الأول make بيطبعه **قبل** ما ينفّذه (عشان تعرف بيعمل إيه)، والتاني ناتج الأمر نفسه. ولو كتبت [[make]] لوحدها، بيشغّل أول target في الملف (هنا [[up]]):

~~~text الناتج: make
docker compose up -d
[docker stub] compose up -d
~~~

و [[up -d]]: [[-d]] (detached) يشغّل الـ containers في الخلفية. و [[logs -f --tail=100 app]]: [[-f]] (follow) تابع اللوجات الجديدة، و [[--tail=100]] ابدأ بآخر ١٠٠ سطر، و [[app]] اسم الخدمة في compose.

---

## ٥. أكتر من target ورا بعض

~~~bash
make build && make up
~~~

~~~text الناتج
docker compose build app
[docker stub] compose build app
docker compose up -d
[docker stub] compose up -d
~~~

وأي أمر يفشل، make بيقف ويطلع بفشل:

~~~text الناتج: target فيه false وبعده echo after
false
make: *** [M3:2: all] Error 1
~~~

[[echo after]] متنفذش، و exit code بتاع make كان 2. فـ [[&&]] بعده آمنة. وأمر مش موجود:

~~~text الناتج: make deploy
make: *** No rule to make target 'deploy'.  Stop.
~~~

ونصيحة: [[make -n logs]] ([[-n]] = dry run) بيطبع الأوامر من غير ما ينفّذها:

~~~text الناتج
docker compose logs -f --tail=100 app
~~~

---

## ٦. التمرين: [[hello:]] و [[date]]

~~~text الناتج: make hello
date
Tue Oct  6 09:13:51 UTC 2026
~~~

وبـ [[@date]] بدل [[date]] السطر الأول بيختفي ويفضل التاريخ بس.

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [[NAME := value]] | متغير، وبتستخدمه [[$(NAME)]] |
| [[.PHONY: a b]] | دول أوامر مش ملفات |
| [[target:]] | اسم تكتبه بعد make |
| سطر بيبدأ بـ Tab | أمر من الـ recipe |
| [[make]] لوحدها | أول target في الملف |
| [[make -n target]] | وريني هتعمل إيه من غير تنفيذ |

> على الماك [[make]] بييجي مع Command Line Tools ([[xcode-select --install]])، ونسخته 3.81 قديمة بس الأساسيات دي كلها شغالة فيها (من ملاحظة الماك في الدرس). وعلى ويندوز شغّله من WSL.`,
          lines: [
            "متغير فيه الأمر اللي بيتكرر. [[:=]] يعني القيمة تتحسب مرة واحدة.",
            "الأسامي دي أوامر مش ملفات، فشغّلها دايمًا حتى لو فيه ملف أو فولدر بنفس الاسم.",
            "target اسمه up.",
            "أمره، ولازم يبدأ بـ Tab. [[$(COMPOSE)]] بتتبدّل بـ docker compose.",
            "target للإيقاف.",
            "أمره.",
            "target للوجات.",
            "تابع آخر ١٠٠ سطر من خدمة app.",
            "target للبناء.",
            "ابني صورة app."
          ],
          sol: R`[[make hello]] بيطبع الأمر نفسه الأول [[date]] وبعده الناتج، زي [[Wed Sep 30 14:05:01 EEST 2026]]. make بيطبع كل سطر قبل ما ينفّذه، ولو مش عايز ده حط [[@]] قبله ([[@date]]).

بالمسافات بدل الـ Tab: [[Makefile:2: *** missing separator.  Stop.]]، ولو المسافات 8 بالظبط، GNU make بيقولك صراحة [[missing separator (did you mean TAB instead of 8 spaces?)]]. لو الـ editor بيحوّل الـ Tab لمسافات لوحده، شغّل [[cat -A Makefile]]: الـ Tab بيظهر [[^I]].`,
          solCode: R`hello:
	date`
        },
        {
          cmd: "make VAR=value",
          title: "مرّر قيم لـ target من سطر الأوامر",
          desc: R`[[make import FOLDER=A1]]: أي [[NAME=value]] بعد اسم الـ target بيوصل جوه الـ recipe كـ [[$(NAME)]]. و [[?=]] بيدّي قيمة افتراضية لو محدش بعتها، و [[$(if $(FOLDER),...)]] بيضيف الفلاج بس لو المتغير اتبعت.`,
          example: R`ENV ?= dev
ARGS ?=

logs:
	docker compose -f compose.$(ENV).yml logs -f --tail=100

import:
	docker compose exec -T app python -m app.importer $(if $(FOLDER),--folder "$(FOLDER)") $(ARGS)

# make logs                  -> compose.dev.yml
# make logs ENV=prod         -> compose.prod.yml
# make import FOLDER=A1 ARGS=--dry-run`,
          try: "ضيف target اسمه greet بيعمل [[echo Hello $(NAME)]] وفوقه [[NAME ?= world]]، وشغّله بـ [[make greet]] و [[make greet NAME=Ali]].",
          flag: "script",
          mac: ["both", "زي ما هو."],
          deep: {
            why: "بدل ما تعمل [[logs-dev]] و [[logs-prod]] و [[import-a1]] و [[import-all]]، target واحد بياخد قيم. نفس فكرة الـ arguments في سكربت bash.",
            how: R`أي [[NAME=value]] تكتبها بعد [[make]] بتبقى متغير make، وبتغلب أي قيمة متكتبة في الملف. فـ [[ENV ?= dev]] معناها «لو محدش بعت ENV، خليه dev»، و [[make logs ENV=prod]] بتغيّره.

و [[?=]] كمان بتاخد القيمة من متغيرات البيئة لو موجودة، فـ [[ENV=prod make logs]] بتشتغل برضه.

[[$(if $(FOLDER),النص)]] دالة جوه make: لو FOLDER مش فاضي حط النص، وإلا ولا حاجة. فنفس الـ target يشتغل على فولدر واحد أو على الكل، من غير ما يبعت [[--folder ""]] فاضي للبرنامج.

و [[ARGS]] حيلة مفيدة: بتسيب باب لأي فلاجات زيادة من غير ما تعدّل الـ Makefile. والقيمة اللي فيها مسافات تتحط بين علامات تنصيص في الترمنال: [[make import ARGS="--dry-run --verbose"]].

واكتب طريقة الاستخدام جنب اسم الـ target ([[## make import FOLDER=A1]])، وهتشوف في درس help إزاي دي بتبقى documentation لوحدها.`,
            when: "target محتاج بيئة (dev أو prod)، أو اسم ملف، أو فلتر. أو عايز تسيب مكان لفلاجات تجريبية زي [[--dry-run]].",
            mistakes: R`مسافات حوالين [[=]] في الترمنال: [[make logs ENV = prod]] بتقع بـ [[empty variable name]]. و [[=]] بدل [[?=]] في الملف بتتجاهل متغيرات البيئة (سطر الأوامر بيكسب في الحالتين). ولو القيمة جاية من يوزر وبتتحط في أمر شيل، حطها بين علامات تنصيص في الـ recipe ([["$(FOLDER)"]]) عشان المسافات.`
          },
          teach: R`## الفكرة

زي arguments السكربت: تكتب [[NAME=value]] بعد اسم الـ target، فالقيمة توصل جوه الـ recipe مكان [[$(NAME)]]. اتجرّب بـ GNU Make 4.3 على أوبونتو 24.04 كيوزر عادي، و [[docker]] في الـ PATH كان ملف وهمي بيطبع [[[docker stub]]] واللي وصله.

---

## ١. [[ENV ?= dev]] و [[ARGS ?=]]

[[?=]] معناها «حط القيمة دي **لو** المتغير مش متعرّف». فـ [[ENV]] بيبقى [[dev]] لو محدش قال غير كده. و [[ARGS ?=]] من غير قيمة يعني فاضي، بس متعرّف عشان تعرف إنه موجود.

---

## ٢. [[logs:]] و [[compose.$(ENV).yml]]

~~~text Makefile
logs:
	docker compose -f compose.$(ENV).yml logs -f --tail=100
~~~

[[-f]] هنا بتاعة [[docker compose]] (file): أنهي ملف compose تستخدم. و [[$(ENV)]] بتتبدّل جوه الاسم:

~~~text الناتج: make logs
docker compose -f compose.dev.yml logs -f --tail=100
~~~

~~~text الناتج: make logs ENV=prod
docker compose -f compose.prod.yml logs -f --tail=100
~~~

القيمة اللي في سطر الأوامر بتكسب. ومتغير البيئة كمان بيكسب [[?=]]، لأن [[?=]] شايفاه «متعرّف»:

~~~text الناتج: ENV=staging make logs
docker compose -f compose.staging.yml logs -f --tail=100
~~~

ومع [[ENV = dev]] (من غير علامة الاستفهام) في الملف: [[ENV=prod make]] طبع [[ENV=dev]] (الملف كسب البيئة)، و [[make ENV=prod]] طبع [[ENV=prod]] (سطر الأوامر كسب الملف).

---

## ٣. [[import:]] والدالة [[$(if ...)]]

~~~text Makefile
import:
	docker compose exec -T app python -m app.importer $(if $(FOLDER),--folder "$(FOLDER)") $(ARGS)
~~~

### الحتت العادية

- [[docker compose exec app ...]] شغّل أمر جوه container خدمة [[app]].
- [[-T]] من غير terminal: مهم في السكربتات و CI، لأن مفيش ترمنال حقيقي.
- [[python -m app.importer]] شغّل الموديول [[app.importer]] كبرنامج ([[-m]] = module).

### [[$(if $(FOLDER),--folder "$(FOLDER)")]]

دالة من دوال make، شكلها [[$(if شرط,النص)]]: لو الشرط مش فاضي، حط النص، وإلا ولا حاجة. و [[FOLDER]] مش متعرّف خالص في الملف، فهو فاضي إلا لو بعته.

~~~text الناتج: make import
docker compose exec -T app python -m app.importer
~~~

مفيش [[--folder]] خالص (والمسافتين في الآخر مكان الحاجات الفاضية، والشيل بيتجاهلهم).

~~~text الناتج: make import FOLDER=A1 ARGS=--dry-run
docker compose exec -T app python -m app.importer --folder "A1" --dry-run
~~~

### قيم فيها مسافات

حطها بين علامات تنصيص في الترمنال، والشيل بيشيلها ويوصّل الكلام كقيمة واحدة لـ make:

~~~text الناتج: make import FOLDER="My Folder" ARGS="--dry-run --verbose"
docker compose exec -T app python -m app.importer --folder "My Folder" --dry-run --verbose
~~~

[[My Folder]] وصلت كلمة واحدة بفضل [["$(FOLDER)"]] في الـ recipe، و [[ARGS]] اتفردت كلمتين، وده اللي عايزه.

---

## ٤. غلطات جربناها

| اللي كتبته | اللي حصل |
|---|---|
| [[make logs ENV = prod]] | [[make: *** empty variable name.  Stop.]]: الـ [[=]] لوحدها اتفهمت تعريف متغير من غير اسم |
| [[echo Hello $NAME]] في الـ recipe | [[Hello AME]]: make قرا [[$N]] (متغير اسمه N، فاضي) وساب [[AME]] |
| متغير بيئة بنفس الاسم | [[NAME=env make greet]] طبع [[Hello env]] بسبب [[?=]] |

---

## ٥. التمرين

~~~text Makefile
NAME ?= world

greet:
	echo Hello $(NAME)
~~~

~~~text الناتج: make greet ثم make greet NAME=Ali
echo Hello world
Hello world
echo Hello Ali
Hello Ali
~~~

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [[make target NAME=value]] | ابعت قيمة (من غير مسافات حوالين [[=]]) |
| [[NAME ?= default]] | قيمة افتراضية، والبيئة وسطر الأوامر يغلبوها |
| [[NAME = value]] | سطر الأوامر بس اللي يغلبها |
| [[$(NAME)]] | استخدام المتغير، بقوسين |
| [[$(if $(X),text)]] | ضيف النص بس لو X مش فاضي |
| [[ARGS ?=]] | باب لأي فلاجات زيادة |

> نفس الكلام على الماك (make 3.81 فيها [[?=]] و [[$(if)]]، حسب الـ GNU make manual).`,
          lines: [
            "ENV قيمته dev لو محدش بعت غيرها.",
            "ARGS فاضي افتراضيًا، مكان لأي فلاجات زيادة.",
            "target للوجات.",
            "اسم ملف compose بيتبني من ENV.",
            "target للاستيراد.",
            "[[--folder]] بيتضاف بس لو FOLDER اتبعت، وبعده أي ARGS."
          ],
          sol: R`[[make greet]] بيطبع [[echo Hello world]] وتحته [[Hello world]]، و [[make greet NAME=Ali]] بيطبع [[Hello Ali]]. [[?=]] معناها «حط world لو محدش إدّى قيمة»، والقيمة اللي في سطر الأوامر بتكسب أي حاجة في الملف.

ومتغير البيئة كمان بيكسب [[?=]]: [[NAME=env make greet]] بيطبع [[Hello env]]، وده ممكن يفاجئك لو عندك متغير بنفس الاسم في الشيل. ولو القيمة فيها مسافة حطها بين علامات تنصيص: [[make greet NAME="Ali Hassan"]]. ولو طلعلك [[Hello AME]]، يبقى كتبت [[$NAME]] بدل [[$(NAME)]]، و make فهمها [[$N]] (فاضي) وبعدها كلمة [[AME]].`,
          solCode: R`NAME ?= world

greet:
	echo Hello $(NAME)`
        },
        {
          cmd: "$$ في Makefile",
          title: "مطبّات الـ recipe: الدولار، وكل سطر في شيل لوحده",
          desc: R`كل سطر في الـ recipe بيتنفذ في شيل جديد، فـ [[cd app]] أو [[source .env]] في سطر مش بيأثروا على اللي بعده، لازم يبقوا في نفس السطر بـ [[&&]]. و [[$]] لوحدها بتاعة make، فأي متغير أو [[$(...)]] للشيل يتكتب [[$$]]. و [[@]] في أول السطر بيمنع make يطبع الأمر (مهم لو فيه توكن).`,
          example: R`SHELL := /bin/bash
PSQL := docker compose exec -T postgres psql -v ON_ERROR_STOP=1 -U app -d appdb

test:
	cd app && python -m pytest -q

migrate:
	@for f in db/migrations/*.sql; do echo "--> $$f"; $(PSQL) -f /dev/stdin < $$f || exit 1; done

ping-api:
	@source .env && curl -sS -H "Authorization: Bearer $$API_TOKEN" http://localhost:8080/health`,
          try: "اعمل target فيه سطر [[cd /tmp]] وتحته سطر [[pwd]]، وشوف إنه طبع فولدر المشروع مش /tmp، وبعدين حطهم في سطر واحد بـ [[&&]].",
          flag: "script",
          mac: ["diff", "على أوبونتو [[/bin/sh]] هو dash ومبيعرفش [[source]]، على الماك بيعرفها. عشان كده [[SHELL := /bin/bash]]، أو استخدم [[.]] بدل source."],
          deep: {
            why: "أول ما الـ Makefile يكبر، هتكتب [[cd app]] في سطر و [[npm test]] في اللي بعده وتستغرب إنه اتنفذ في المكان الغلط، أو [[$f]] في لوب وتلاقيه فاضي. الاتنين من قواعد make مش bash.",
            how: R`make بيشغّل كل سطر من الـ recipe في شيل منفصل، زي ما تكون فتحت ترمنال جديد لكل سطر. فـ [[cd]] و [[export]] و [[source]] بيموتوا مع السطر بتاعهم. الحل تربطهم بـ [[&&]] في نفس السطر (ولو السطر طويل، [[\]] في آخره بتكمّله في اللي تحته وتفضل نفس الشيل).

make بيفك أي [[$]] الأول قبل ما يبعت السطر للشيل: [[$(PSQL)]] متغير make، و [[$f]] بالنسبة لـ make متغير اسمه f (فاضي). عشان توصّل [[$]] حقيقية للشيل تكتبها [[$$]]، فـ [[$$f]] توصل [[$f]]، و [[$$(grep ...)]] توصل [[$(grep ...)]].

[[SHELL := /bin/bash]] بيخلي الـ recipes تشتغل بـ bash بدل [[/bin/sh]]، وده محتاجه عشان [[source]] وأي حاجة bash بس.

[[@]] قبل الأمر بيخلي make ميطبعش السطر قبل ما ينفّذه. من غيرها لو السطر فيه توكن، هيطبعه في الترمنال أو في لوج الـ CI. و [[-]] قبل الأمر معناها «لو فشل كمّل».

واللوب في [[migrate]] بيعمل [[|| exit 1]] بإيده، لأن الـ for كلها سطر واحد، وفشل أمر في النص مش بيوقف اللوب لوحده.`,
            when: "أي recipe فيه أكتر من خطوة مربوطة ببعض، أو لوب، أو متغيرات من .env.",
            mistakes: R`في مشروع حقيقي، لوب الـ migrations كان بيقف عند أول ملف يفشل، بس اللي قبله اتطبق خلاص ومفيش transaction بتجمعهم، فلازم كل ملف يبقى idempotent ([[IF NOT EXISTS]]) عشان تقدر تعيده. وكان اسم يوزر قاعدة البيانات بيتجاب بـ [[$$(grep ... .env | cut ...)]] جوه متغير make، فبيتحسب من الأول في كل مرة يتستخدم. والغلطة الأشهر: [[cd app]] في سطر و [[npm test]] في اللي بعده، فالتيست يشتغل في فولدر المشروع الرئيسي.`
          },
          teach: R`## الفكرة

قاعدتين بيلخبطوا أي حد جاي من bash: كل سطر في الـ recipe بيشتغل في شيل جديد، و [[$]] بتاعة make الأول، فاللي عايزه يوصل للشيل تكتبه [[$$]]. اتجرّب بـ GNU Make 4.3 على أوبونتو 24.04 كيوزر عادي. و [[docker]] كان ملف وهمي بيطبع اللي وصله، والـ SQL اللي داخله بعلامة [[sql>]]، و [[localhost:8080/health]] سيرفر Python صغير بيرد [[{"status":"ok"}]] لو التوكن صح.

---

## ١. [[SHELL := /bin/bash]]

make بيشغّل الـ recipes بـ [[/bin/sh]]. وعلى أوبونتو [[/bin/sh]] مش bash:

~~~text الناتج: ls -l /bin/sh
lrwxrwxrwx 1 root root 4 Mar 31  2024 /bin/sh -> dash
~~~

[[dash]] شيل أصغر ومبيعرفش [[source]]:

~~~text الناتج: recipe فيه source .env من غير SHELL
/bin/sh: 1: source: not found
make: *** [M2:2: x] Error 127
~~~

127 يعني «الأمر مش موجود». [[SHELL := /bin/bash]] بيخلي كل الـ recipes تشتغل بـ bash. أو استخدم [[. ./.env]] (النقطة هي نفس source وموجودة في أي شيل)، وجربناها مع dash وطبعت التوكن عادي.

---

## ٢. [[PSQL := docker compose exec -T postgres psql -v ON_ERROR_STOP=1 -U app -d appdb]]

متغير make فيه أمر طويل بنستخدمه بعدين بـ [[$(PSQL)]]:

| الحتة | معناها |
|---|---|
| [[exec -T postgres]] | شغّل جوه خدمة postgres من غير terminal |
| [[psql]] | برنامج الأوامر بتاع PostgreSQL |
| [[-v ON_ERROR_STOP=1]] | لو أي جملة SQL فشلت، اقف واطلع بفشل (من غيرها psql بيكمّل ويطلع بنجاح) |
| [[-U app]] | اليوزر |
| [[-d appdb]] | قاعدة البيانات |

---

## ٣. كل سطر في شيل لوحده: [[test:]]

~~~text Makefile
test:
	cd app && python -m pytest -q
~~~

[[cd]] والأمر في **نفس السطر** بـ [[&&]]. جربنا الفرق بالتمرين:

~~~text Makefile
where:
	cd /tmp
	pwd

where2:
	cd /tmp && pwd
~~~

~~~text الناتج: make where ثم make where2
cd /tmp
pwd
/home/ubuntu/proj
cd /tmp && pwd
/tmp
~~~

في [[where]] الـ [[cd]] اشتغلت في شيل، وقفل، و [[pwd]] اشتغل في شيل جديد بادئ من فولدر المشروع. و [[pytest -q]] ([[-q]] quiet) شغّل التيستات بخرج مختصر.

---

## ٤. [[$$]]: [[migrate:]]

~~~text Makefile
migrate:
	@for f in db/migrations/*.sql; do echo "--> $$f"; $(PSQL) -f /dev/stdin < $$f || exit 1; done
~~~

### make بيقرا السطر الأول

قبل ما يبعت السطر للشيل، make بيبدّل كل [[$]]:
- [[$(PSQL)]] متغير make، يتبدّل بالأمر الطويل.
- [[$$f]] تبقى [[$f]] (دولار واحد) وتوصل للشيل.

ولو كتبت [[$f]] بدولار واحد، make بيفهمها متغير make اسمه [[f]]، وهو فاضي:

~~~text الناتج: نفس اللوب بـ $f
-->
-->
~~~

### الشيل بيشغّل اللوب

- [[db/migrations/*.sql]]: الشيل بيبدّل [[*]] بكل الملفات اللي آخرها [[.sql]]، مترتبة بالاسم (عشان كده بنسميها [[001_]] و [[002_]]).
- [[-f /dev/stdin]]: قول لـ psql «اقرا الـ SQL من الـ stdin»، و [[< $$f]] بيحط الملف في الـ stdin. ليه مش [[-f $$f]] على طول؟ لأن psql شغال **جوه** الـ container، والملف على جهازك.
- [[|| exit 1]]: لو الملف ده فشل، اقف. اللوب كله سطر واحد، والشيل مش بيقف لوحده لو أمر في النص فشل.

~~~text الناتج: make migrate
--> db/migrations/001_init.sql
[docker stub] compose exec -T postgres psql -v ON_ERROR_STOP=1 -U app -d appdb -f /dev/stdin
    sql> select 1;
--> db/migrations/002_users.sql
[docker stub] compose exec -T postgres psql -v ON_ERROR_STOP=1 -U app -d appdb -f /dev/stdin
    sql> select 2;
~~~

ولما خلينا الملف التاني يفشل (من ٣)، مع [[|| exit 1]] وقف عنده: [[make: *** [M2:2: migrate] Error 1]]. ومن غيره اللوب كمّل للتالت و make طلع بنجاح، كأن مفيش حاجة.

### [[@]] في الأول

make بيطبع كل سطر قبل ما ينفّذه، و [[@]] بتمنع ده. فاللي ظهر فوق ناتج اللوب بس، مش سطر الـ for الطويل.

---

## ٥. [[ping-api:]] والتوكن

~~~text Makefile
ping-api:
	@source .env && curl -sS -H "Authorization: Bearer $$API_TOKEN" http://localhost:8080/health
~~~

- [[source .env]] نفّذ ملف [[.env]] في نفس الشيل، فالمتغيرات اللي فيه ([[API_TOKEN=s3cr3t]] في التجربة) تبقى موجودة **في السطر ده بس**.
- [[-H]] (header) ضيف هيدر للطلب، و [[Authorization: Bearer ...]] الطريقة المعروفة لبعت توكن.
- [[$$API_TOKEN]] توصل [[$API_TOKEN]] للشيل، فالشيل يحط القيمة.

~~~text الناتج: make ping-api
{"status":"ok"}
~~~

### طب الـ [[@]] بتحمي التوكن هنا؟

جربنا من غير [[@]]:

~~~text الناتج
source .env && curl -sS -H "Authorization: Bearer $API_TOKEN" http://localhost:8080/health
{"status":"ok"}
~~~

make طبع السطر **قبل** ما الشيل يبدّل المتغير، فاللي ظهر اسم المتغير مش قيمته. الخطر الحقيقي لما التوكن يبقى متغير make (مثلًا [[include .env]] وبعدين [[$(API_TOKEN)]]) أو مكتوب في السطر نفسه:

~~~text الناتج: include .env ثم echo "Bearer $(API_TOKEN)"
echo "Bearer s3cr3t"
Bearer s3cr3t
~~~

هنا التوكن اتطبع في السطر الأول. فـ [[@]] عادة كويسة لأي سطر فيه أسرار، بس خلي بالك إن [[make -n]] بيطبع السطور حتى اللي عليها [[@]].

---

## الخلاصة

| اللي عايزه | اكتبه كده | ليه |
|---|---|---|
| متغير make | [[$(NAME)]] | make بيبدّله |
| متغير شيل أو [[$( )]] للشيل | [[$$f]] ، [[$$(date)]] | [[$$]] توصل [[$]] واحدة |
| [[cd]] أو [[source]] يأثر على أمر | [[cd app && cmd]] في نفس السطر | كل سطر شيل جديد |
| bash بدل sh | [[SHELL := /bin/bash]] | [[source]] وحاجات bash |
| متطبعش السطر | [[@cmd]] | لوجات أنضف، وأسرار مستخبية |
| لوب يقف عند أول فشل | [[cmd || exit 1]] | الشيل مش بيقف لوحده |

> على الماك [[/bin/sh]] بيعرف [[source]] (ملاحظة الماك في الدرس)، بس [[SHELL := /bin/bash]] يخلي الملف يشتغل نفس الشغل في الاتنين.`,
          lines: [
            "شغّل الـ recipes بـ bash مش sh.",
            "متغير make فيه أمر psql كامل. [[ON_ERROR_STOP]] يخلي psql يفشل لو أي SQL فشل.",
            "target التيستات.",
            "[[cd]] والأمر في نفس السطر بـ [[&&]]، وإلا الـ cd تضيع.",
            "target الـ migrations.",
            "[[@]] متطبعش السطر. لوب على ملفات SQL بالترتيب، و [[$$f]] عشان توصل [[$f]] للشيل، وأول فشل يوقف.",
            "target يكلّم الـ API.",
            "حمّل .env وابعت التوكن في نفس السطر. و [[@]] عشان السطر ميتطبعش (هنا كان هيطبع [[$API_TOKEN]] كاسم، إنما لو التوكن متغير make أو مكتوب في السطر كان هيطبع قيمته)."
          ],
          sol: R`[[make where]] بيطبع [[cd /tmp]] ثم [[pwd]] ثم فولدر المشروع مش [[/tmp]]، لأن كل سطر في الـ recipe بيشتغل في شيل جديد، فالـ cd اتنسى مع نهاية سطره. في سطر واحد [[cd /tmp && pwd]] بيطبع [[/tmp]].

لو السطور طويلة، تقدر تكمّل بـ [[\]] في آخر السطر عشان تبقى سطر واحد منطقيًا، أو تحط [[.ONESHELL:]] في الملف (GNU make 3.82 وأحدث، مش نسخة الماك 3.81)، وساعتها الـ recipe كلها بتشتغل في شيل واحد. ولو محتاج متغير شيل زي [[$PWD]] جوه الـ recipe اكتبه [[$$PWD]].`,
          solCode: R`where:
	cd /tmp
	pwd

where2:
	cd /tmp && pwd`
        },
        {
          cmd: "make help",
          title: "Makefile بيشرح نفسه",
          desc: R`حط [[## الشرح]] جنب اسم أي target، و target اسمه help بيدوّر على السطور دي بـ grep ويطبعها بـ awk كقايمة. فـ [[make help]] (أو [[make]] لوحدها) بتعرض كل أوامر المشروع وشرحها، ومحدش محتاج يفتح README.`,
          example: R`.DEFAULT_GOAL := help
.PHONY: help up logs migrate

help: ## القايمة دي
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'

up: ## شغّل الـ stack
	docker compose up -d

logs: ## تابع لوجات التطبيق
	docker compose logs -f --tail=100 app

migrate: ## طبّق الـ migrations بالترتيب
	@./scripts/migrate.sh`,
          try: "ضيف الـ help ده لأي Makefile عندك، وحط [[##]] جنب ٣ targets، واكتب [[make]] لوحدها.",
          flag: "script",
          mac: ["both", "شغال زي ما هو."],
          deep: {
            why: "بعد شهرين الـ Makefile فيه ٢٠ target، وانت نفسك مش فاكر [[webhook-set]] بتعمل إيه. الـ README بيتنسي يتحدّث، إنما الشرح اللي جنب الـ target بيتعدّل معاه في نفس المكان.",
            how: R`[[$(MAKEFILE_LIST)]] متغير make فيه اسم الـ Makefile نفسه (وأي ملف متضمّن)، فالـ help بيقرا الملف اللي هو فيه.

[[grep -E]] بيطلّع السطور اللي شكلها: اسم target، ونقطتين، وأي حاجة، وبعدين [[## ]] وشرح. والـ [[$$]] في آخر الـ regex هي [[$]] (آخر السطر) متكتبة بطريقة make.

[[awk]] بيقسم كل سطر عند «النقطتين لحد الـ ##»، فالعمود الأول ([[$$1]]) اسم الـ target والتاني ([[$$2]]) الشرح. و [[%-12s]] في printf بيخلي الاسم ياخد ١٢ خانة دايمًا، فالشروحات تيجي تحت بعض في عمود. و [[\033[36m]] لون سماوي للاسم.

[[.DEFAULT_GOAL := help]] بيخلي [[make]] لوحدها تشغّل help حتى لو مش أول target.

والـ targets اللي من غير [[##]] (أوامر داخلية) مش بتظهر في القايمة، وده مقصود: تخبّي اللي مش محتاج حد يشغّله بإيده.`,
            when: "أي Makefile فيه أكتر من ٥ targets، أو مشروع هيستلمه حد تاني.",
            mistakes: R`[[$]] بدل [[$$]] في الـ regex أو في [[$$1]] بتاع awk، فـ make يفكها قبل ما توصل والأمر يقع بـ syntax error: [[Unterminated quoted string]] من الشيل لو الغلطة في الـ regex، و [[awk: line 1: syntax error]] لو في [[$$1]]. وأسامي targets بالعربي: printf بيعد بايتات مش حروف فالعمود يتلخبط، فخلي الأسامي إنجليزي والشرح عربي. و targets كتير من غير [[##]]، فمحدش يعرف إنها موجودة.`
          },
          teach: R`## الفكرة

الـ Makefile بيقرا نفسه: target اسمه [[help]] بيدوّر بـ [[grep]] على السطور اللي فيها [[## شرح]] جنب اسم target، و [[awk]] يطبعهم جدول. اتجرّب بـ GNU Make 4.3 على أوبونتو 24.04 كيوزر عادي ([[awk]] هناك هو [[mawk 1.3.4]]).

---

## ١. [[.DEFAULT_GOAL := help]]

[[make]] لوحدها بتشغّل أول target في الملف. [[.DEFAULT_GOAL]] متغير خاص بيغيّر ده: «لو محدش قال target، شغّل help». فمش لازم help يبقى أول واحد.

## ٢. [[.PHONY: help up logs migrate]]

زي أي درس make: الأسامي دي أوامر مش ملفات.

## ٣. [[help: ## القايمة دي]]

بالنسبة لـ make، أي حاجة بعد [[#]] تعليق، فـ [[## القايمة دي]] مش بتأثر على الـ target. احنا بنستغلها كـ «شرح» هيتقري بـ grep.

---

## ٤. السطر الطويل، من الأول للآخر

~~~text Makefile
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'
~~~

### الخطوة ١: make بيفك الدولارات

- [[$(MAKEFILE_LIST)]] متغير make فيه أسامي ملفات الـ Makefile اللي اتقرت. جربناه في ملف اسمه M2 فطبع [[[M2]]]. فالـ help بيقرا الملف اللي هو فيه.
- كل [[$$]] تبقى [[$]] قبل ما السطر يروح للشيل.
- [[@]] متطبعش السطر نفسه.

### الخطوة ٢: [[grep -E '^[a-zA-Z_-]+:.*?## .*$']]

[[-E]] (extended regex). والنمط:

| الحتة | معناها |
|---|---|
| [[^]] | أول السطر |
| [[[a-zA-Z_-]+]] | حرف إنجليزي أو [[_]] أو [[-]]، مرة أو أكتر (ده اسم الـ target) |
| [[:]] | النقطتين |
| [[.*?]] | أي حاجة (في grep بتشتغل زي [[.*]]) |
| [[## ]] | علامة الشرح ومسافة |
| [[.*$]] | باقي السطر لحد الآخر |

grep لوحده على الملف:

~~~text الناتج
help: ## القايمة دي
up: ## شغّل الـ stack
logs: ## تابع لوجات التطبيق
migrate: ## طبّق الـ migrations بالترتيب
~~~

[[internal:]] (target من غير [[##]]) مظهرش، ولا السطور اللي تحت الـ targets.

### الخطوة ٣: [[awk 'BEGIN {FS = ":.*?## "}; ...']]

[[awk]] بيقرا سطر سطر ويقسم كل سطر لأعمدة. [[BEGIN { }]] بيتنفذ مرة واحدة قبل أول سطر، و [[FS]] (field separator) هو الفاصل بين الأعمدة، وهنا regex: «النقطتين وأي حاجة لحد [[## ]]». فالسطر [[up: ## شغّل الـ stack]] بيتقسم:

~~~text الأعمدة
$1  =  up
$2  =  شغّل الـ stack
~~~

### الخطوة ٤: [[printf "  \033[36m%-12s\033[0m %s\n", $1, $2]]

| الحتة | معناها |
|---|---|
| [[\033[36m]] | كود لون: [[\033]] حرف ESC، و [[36]] سماوي |
| [[%-12s]] | النص الأول ([[$1]]) في ١٢ خانة، و [[-]] يعني لزّقه شمال وكمّل مسافات |
| [[\033[0m]] | رجّع اللون العادي |
| [[%s]] | النص التاني ([[$2]]) زي ما هو |
| [[\n]] | سطر جديد |

~~~text الناتج: make
  help         القايمة دي
  up           شغّل الـ stack
  logs         تابع لوجات التطبيق
  migrate      طبّق الـ migrations بالترتيب
~~~

(اتنقل هنا من غير الألوان. و [[cat -v]] بيوري حرف ESC كـ [[^[]] قبل [[36m]] و [[0m]].)

الأسامي ملوّنة وكلها واخدة ١٢ خانة، فالشروحات جت تحت بعض.

---

## ٥. باقي الـ targets

[[up]] و [[logs]] زي درس make. و [[@./scripts/migrate.sh]] بيشغّل سكربت من فولدر المشروع ([[./]] يعني من هنا)، و [[@]] متطبعش السطر.

---

## ٦. لما حاجة متظهرش (جربناها)

| المشكلة | اللي حصل |
|---|---|
| [[$]] واحدة في آخر الـ regex ([[.*$']]) | [[/bin/sh: 1: Syntax error: Unterminated quoted string]]: make قرا [[$']] كمتغير اسمه [[']] (فاضي)، فعلامة التنصيص اللي بتقفل الـ regex اختفت |
| [[$1]] بدل [[$$1]] في awk | [[awk: line 1: syntax error at or near ,]]: make شال [[$1]] و [[$2]] (فاضيين) |
| اسم فيه رقم ([[build2]]) أو نقطة ([[db.reset]]) | مش بيظهر، لأن النمط حروف و [[_]] و [[-]] بس |
| [[##]] من غير مسافة بعدها | مش بيظهر |
| اسم عربي | [[printf]] بيعد بايتات: [[printf '%-6s|' شغل]] طلع [[شغل|]] من غير مسافات، لأن الكلمة ٦ بايت |

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[target: ## شرح]] | الشرح جنب الـ target، وهو تعليق بالنسبة لـ make |
| [[$(MAKEFILE_LIST)]] | الملف نفسه |
| [[grep -E '^[a-zA-Z_-]+:.*?## .*$$']] | السطور اللي فيها شرح |
| [[BEGIN {FS = ":.*?## "}]] في awk | الاسم في [[$$1]] والشرح في [[$$2]] |
| [[%-12s]] | عمود عرضه ١٢ |
| [[.DEFAULT_GOAL := help]] | [[make]] لوحدها = help |

> على الماك [[grep -E]] و [[awk]] نسخ BSD، وملاحظة الماك في الدرس بتقول السطر ده شغال عليهم زي ما هو (متجرّبش هنا).`,
          lines: [
            "[[make]] من غير target يشغّل help.",
            "كلهم أوامر مش ملفات.",
            "target الـ help، وشرحه بعد [[##]].",
            "اقرا الـ Makefile نفسه، وطلّع السطور اللي فيها [[##]]، واطبع الاسم ملوّن في عمود والشرح جنبه. [[$$]] عشان [[$]] توصل للشيل.",
            "target بشرح.",
            "أمره.",
            "target تاني بشرح.",
            "أمره.",
            "target تالت.",
            "بيشغّل سكربت، و [[@]] عشان ميتطبعش."
          ],
          sol: R`[[make]] لوحدها بتطبع قايمة بالـ targets اللي جنبها [[##]] بس، كل واحد في سطر: [[help]] وجنبه [[القايمة دي]]، و [[up]] وجنبه [[شغّل الـ stack]]... والأسامي ملوّنة ومحاذية في عمود. أي target من غير [[##]] مش هيظهر، ودي طريقة تخبّي بيها الـ targets الداخلية.

لو [[make]] لوحدها شغّلت target تاني بدل help، يبقى [[.DEFAULT_GOAL := help]] ناقص أو مكتوب غلط. ولو target معين مش ظاهر، غالبًا اسمه فيه رقم أو نقطة (النمط بيقبل حروف و [[_]] و [[-]] بس)، أو مفيش مسافة بعد [[##]]. ولو [[make]] طلّع [[Syntax error: Unterminated quoted string]] أو [[awk: line 1: syntax error at or near ,]]، يبقى كتبت [[$]] واحدة بدل [[$$]] في الـ grep أو الـ awk.`
        }
      ]
    }
]);
