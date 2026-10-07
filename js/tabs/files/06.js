// تكملة تاب files: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/files/01.js (شرح حقول الدرس في أوله)
MORE("files", [
    {
      t: "ملفات الإعدادات: .toml و .ini و .env",
      l: 1,
      n: "TOML اللي في Rust و Python الحديثة، و INI أقدم صيغة إعدادات ولسه في كل حتة، و .env اللي فيه أسرار المشروع وإزاي متسرّبوش",
      items: [
        {
          cmd: ".toml",
          title: "ملف TOML بيتكتب إزاي: key = value و [section] و [[array]]؟",
          desc: R`TOML (Tom's Obvious Minimal Language) صيغة إعدادات شكلها زي INI بس ليها قواعد واضحة وأنواع زي JSON. معمولة عشان تبقى «واضحة ومفيهاش تخمين» عكس YAML. هتقابلها في: [[pyproject.toml]] (أي مشروع Python حديث)، و [[Cargo.toml]] (Rust)، و [[netlify.toml]]، و [[wrangler.toml]] (Cloudflare)، و [[config.toml]] في Hugo، و [[.streamlit/config.toml]].

الرموز:
• [[key = value]]: مفتاح و [[=]] وقيمة. المسافات حوالين [[=]] عادي.
• [[#]]: تعليق لحد آخر السطر.
• [[[database]]]: بداية table (زي object). كل [[key = value]] تحته لحد الـ table اللي بعده بيبقى جواه. والـ indentation ملوش أي معنى.
• [[[database.replica]]]: table جوه table، بالنقطة.
• [[[[admins]]]]: قوسين مزدوجين يعني «عنصر جديد في list اسمها admins» (اسمها array of tables). كل مرة تكتبها بيتعمل object جديد في الليستة.
• [[{ name = "Sara", id = 1 }]]: inline table في سطر واحد.
• [[["web", "api"]]]: array.

الأنواع (ومفيش تخمين، كل نوع ليه شكل):
• نص لازم يبقى متنصص: [["..."]] (فيه escape زي [[\n]])، أو [['...']] (حرفي، مثالي لمسارات ويندوز)، أو [["""..."""]] على كذا سطر.
• رقم: [[3000]] و [[0.75]] و [[1_000_000]] (الـ [[_]] للقراية بس).
• boolean: [[true]] و [[false]] بس، بحروف صغيرة. مفيش yes و no.
• تاريخ ووقت: [[2026-10-01T09:00:00Z]] من غير تنصيص، نوع حقيقي.
• مفيش null: لو مفيش قيمة، متكتبش المفتاح.

قواعد بتوقّع الملف: نفس المفتاح مرتين، أو نص من غير تنصيص ([[name = Sara]])، أو [[True]] بحرف كبير، أو مفتاح بعد [[[[admins]]]] وانت فاكره في الأول (أي حاجة بعد [[[section]]] بتروح جواه، فالمفاتيح العامة لازم تبقى فوق قبل أي table).

بتفحصه إزاي: Python 3.11+ فيه [[tomllib]] جاهز. وفي VS Code إضافة Even Better TOML.`,
          example: R`# إعدادات التطبيق
title = "Gym Portal"
version = "1.10.0"
debug = false
port = 3000
ratio = 0.75
started = 2026-10-01T09:00:00Z
tags = ["web", "api"]
owner = { name = "Sara", id = 1 }
path = 'C:\Users\ali'
[database]
host = "localhost"
pool = 10
[database.replica]
host = "10.0.0.6"
[[admins]]
name = "سارة"
email = "sara@example.com"
[[admins]]
name = "علي"
email = "ali@example.com"`,
          flag: "script",
          try: R`احفظ المثال في [[config.toml]] وحوّله JSON: [[python3 -c 'import tomllib, json; print(json.dumps(tomllib.load(open("config.toml", "rb")), ensure_ascii=False, indent=2, default=str))']]. بعدين جرّب ٣ أخطاء واحد واحد: [[name = Sara]] من غير تنصيص، و [[debug = True]]، ونفس المفتاح مرتين. وآخر حاجة انقل سطر [[port = 3000]] لآخر الملف وشوف راح فين في الـ JSON.`,
          deep: {
            why: R`JSON مفيهوش تعليقات ومتعب في الكتابة، و YAML بيخمّن الأنواع وحساس للمسافات. TOML اتعمل سنة 2013 كحل وسط: سهل يتكتب زي INI، وكل قيمة نوعها واضح من شكلها من غير أي تخمين، فمفيش «مشكلة نرويج». عشان كده Python و Rust اختاروه لملفات المشاريع.`,
            how: R`الـ parser بيقرا سطر سطر: [[[x]]] بيغيّر «أنا دلوقتي جوه table x»، و [[[[x]]]] بيضيف object جديد لليستة x ويدخل جواه، و [[k = v]] بيتحط في الـ table الحالي. عشان كده الترتيب مهم والمسافات لأ. والنتيجة نفس الهيكل اللي JSON بيعمله: objects و arrays.`,
            when: R`[[pyproject.toml]] و [[Cargo.toml]] لما تشتغل بالأدوات دي. ولو بتصمم ملف إعدادات لأداتك، TOML اختيار ممتاز لو الإعدادات مش متداخلة أوي.`,
            mistakes: R`تكتب مفتاح عام بعد ما فتحت [[[database]]] فيتحط جوه الـ database. تنسى التنصيص على النصوص (مش زي INI و YAML). تكتب مسار ويندوز في [["]] فـ [[\U]] يتفهم escape ويقع، استخدم [[']]. وتكرر نفس الـ table [[[database]]] مرتين فيطلعلك غلط (لكن [[[[x]]]] بيتكرر عادي، ده معناه).`
          },
          teach: R`## الفكرة: كل قيمة نوعها باين من شكلها

المثال [[config.toml]]. TOML بيقرا سطر سطر: [[key = value]] بيتحط في «الـ table الحالي»، و [[[x]]] بيغيّر الـ table الحالي. ومفيش تخمين: النص لازم متنصص، والـ boolean حروف صغيرة بس. هنفك الملف حتة حتة، وبعدين نحوّله JSON بـ [[tomllib]] اللي جاي مع Python 3.11 وأحدث.

---

## ١. المفاتيح العامة والأنواع

~~~toml
# إعدادات التطبيق
title = "Gym Portal"
version = "1.10.0"
debug = false
port = 3000
ratio = 0.75
started = 2026-10-01T09:00:00Z
~~~

| السطر | النوع | ليه |
|---|---|---|
| [[title = "Gym Portal"]] | نص | بين [["]]، والتنصيص إجباري |
| [[version = "1.10.0"]] | نص | رقم نسخة، لازم نص. ([[v = 1.10]] من غير تنصيص بيبقى الرقم [[1.1]] زي YAML) |
| [[debug = false]] | boolean | [[true]] و [[false]] بحروف صغيرة بس |
| [[port = 3000]] | رقم صحيح | |
| [[ratio = 0.75]] | رقم عشري | |
| [[started = 2026-...Z]] | تاريخ ووقت | شكل ISO 8601: [[T]] بين التاريخ والوقت، و [[Z]] يعني UTC (توقيت جرينتش) |

المسافات حوالين [[=]] اختيارية، و [[#]] تعليق.

---

## ٢. array و inline table ونص حرفي

~~~toml
tags = ["web", "api"]
owner = { name = "Sara", id = 1 }
path = 'C:\Users\ali'
~~~

- [[[ ]]]: array (ليستة)، العناصر بينها [[,]].
- [[{ }]]: **inline table**، يعني object في سطر واحد. جواه [[=]] مش [[:]] زي YAML و JSON.
- [['...']]: نص **حرفي** (literal string): الـ [[\]] حرف عادي. لو كتبته في [["]] هيقع، جرّبت [[path = "C:\Users\ali"]] وطلع [[Invalid hex value (at line 1, column 13)]]، لأن [[\U]] جوه [["]] بداية رقم Unicode.

---

## ٣. [[[database]]]: table

~~~toml
[database]
host = "localhost"
pool = 10
~~~

[[[database]]] بين قوسين مربعين = **table** (زي object). كل السطور اللي بعده لحد الـ table اللي بعده بتروح جواه. الـ indentation ملوش أي معنى في TOML، فمفيش داعي تزق السطور.

---

## ٤. [[[database.replica]]]: table جوه table

~~~toml
[database.replica]
host = "10.0.0.6"
~~~

النقطة معناها «جوه»: ده [[replica]] جوه [[database]]. و [[host]] هنا مختلف عن [[host]] اللي فوق، لأن كل واحد في table مختلف.

---

## ٥. [[[[admins]]]]: array of tables

~~~toml
[[admins]]
name = "سارة"
email = "sara@example.com"
[[admins]]
name = "علي"
email = "ali@example.com"
~~~

قوسين مزدوجين = «ضيف **object جديد** في ليستة اسمها admins وادخل جواه». كل مرة تكتبها بيتعمل عنصر جديد. ده الفرق: [[[x]]] مينفعش يتكرر، [[[[x]]]] معمول عشان يتكرر.

---

## ٦. نحوّله JSON

~~~python
import tomllib, json
data = tomllib.load(open("config.toml", "rb"))
print(json.dumps(data, ensure_ascii=False, indent=2, default=str))
~~~

- [[tomllib]]: parser لـ TOML جاي مع Python 3.11+ (قراية بس، مفيش كتابة).
- [[open(..., "rb")]]: [[r]] قراية و [[b]] binary. [[tomllib]] بيطلب الملف binary عشان هو اللي يقرا الـ UTF-8 بنفسه (TOML لازم يبقى UTF-8).
- [[default=str]]: JSON مبيعرفش التاريخ، فأي قيمة مش عارف يحوّلها يعدّيها على [[str]] الأول.

~~~text الناتج (Python 3.14 على ويندوز)
{
  "title": "Gym Portal",
  "version": "1.10.0",
  "debug": false,
  "port": 3000,
  "ratio": 0.75,
  "started": "2026-10-01 09:00:00+00:00",
  "tags": [
    "web",
    "api"
  ],
  "owner": {
    "name": "Sara",
    "id": 1
  },
  "path": "C:\\Users\\ali",
  "database": {
    "host": "localhost",
    "pool": 10,
    "replica": {
      "host": "10.0.0.6"
    }
  },
  "admins": [
    {
      "name": "سارة",
      "email": "sara@example.com"
    },
    {
      "name": "علي",
      "email": "ali@example.com"
    }
  ]
}
~~~

و [[repr(data["started"])]] طلع [[datetime.datetime(2026, 10, 1, 9, 0, tzinfo=datetime.timezone.utc)]]: تاريخ حقيقي بـ timezone، مش نص. و [[path]] ظاهر بـ [[\\]] لأن JSON بيهرّب الشرطة.

---

## ٧. الأخطاء ([[tomllib]])

| اللي كتبته | الغلط |
|---|---|
| [[name = Sara]] | [[Invalid value (at line 1, column 8)]] (نص من غير تنصيص) |
| [[debug = True]] | [[Invalid value (at line 1, column 9)]] (حرف كبير) |
| نفس المفتاح مرتين | [[Cannot overwrite a value (at line 2, column 6)]] |
| [[[db]]] مرتين | [[Cannot declare ('db',) twice (at line 3, column 4)]] |
| [[z = 01234]] | [[Expected newline or end of document after a statement]] (الصفر في الأول ممنوع) |

لاحظ إن TOML بيرفض بدل ما يخمّن: [[01234]] في YAML كان بيبقى [[668]] ساكت، هنا غلط صريح.

### الفخ: مفتاح بعد table

لما نقلت [[port = 3000]] لآخر الملف:

~~~text الناتج
False {'name': 'علي', 'email': 'ali@example.com', 'port': 3000}
~~~

[[False]] يعني [[port]] مبقاش في المستوى الأول، وراح جوه آخر admin، لأن آخر حاجة اتفتحت كانت [[[[admins]]]]. المفاتيح العامة لازم تبقى فوق قبل أي table.

---

## الخلاصة

| الشكل | معناه |
|---|---|
| [[key = "text"]] | نص، والتنصيص إجباري |
| [[key = 'C:\x']] | نص حرفي من غير escape |
| [[true]] و [[false]] | boolean بحروف صغيرة بس |
| [[2026-10-01T09:00:00Z]] | تاريخ ووقت حقيقي |
| [[[name]]] | table، مرة واحدة بس |
| [[[a.b]]] | table جوه table |
| [[[[name]]]] | عنصر جديد في ليستة objects |
| [[{ k = v }]] | table في سطر واحد |

ومفيش null: لو مفيش قيمة متكتبش المفتاح.`,
          lines: [
            R`نص، ولازم متنصص في TOML.`,
            R`رقم نسخة كنص، فمفيش خوف يبقى [[1.1]] زي YAML.`,
            R`boolean بحروف صغيرة.`,
            R`رقم صحيح.`,
            R`رقم عشري.`,
            R`تاريخ ووقت من غير تنصيص، والـ parser بيقراه تاريخ حقيقي.`,
            R`array.`,
            R`inline table: object في سطر واحد بين [[{ }]].`,
            R`[[']] نص حرفي: الـ [[\]] زي ما هي.`,
            R`بداية table اسمه [[database]]، واللي تحته جواه.`,
            R`مفتاح جوه [[database]].`,
            R`مفتاح تاني جواه.`,
            R`table جوه [[database]] اسمه [[replica]].`,
            R`[[host]] ده جوه [[database.replica]]، مش نفس [[host]] اللي فوق.`,
            R`[[[[admins]]]]: object جديد في list اسمها [[admins]].`,
            R`مفتاح في أول admin.`,
            R`مفتاح تاني في نفس الـ admin.`,
            R`[[[[admins]]]] تاني: object تاني في نفس الـ list.`,
            R`مفتاح في تاني admin.`,
            R`آخر مفتاح.`
          ],
          sol: R`الـ JSON (مختصر):
[[{"title": "Gym Portal", "version": "1.10.0", "debug": false, "port": 3000, "ratio": 0.75, "started": "2026-10-01 09:00:00+00:00", "tags": ["web", "api"], "owner": {"name": "Sara", "id": 1}, "path": "C:\\Users\\ali", "database": {"host": "localhost", "pool": 10, "replica": {"host": "10.0.0.6"}}, "admins": [{"name": "سارة", "email": "sara@example.com"}, {"name": "علي", "email": "ali@example.com"}]}]]
([[started]] اتقرا [[datetime]] حقيقي، و [[default=str]] هو اللي حوّله نص عشان JSON.)

الأخطاء ([[tomllib]]):
[[name = Sara]] ← [[Invalid value (at line 1, column 8)]]
[[debug = True]] ← [[Invalid value (at line 1, column 9)]]
مفتاح مكرر ← [[Cannot overwrite a value (at line 2, column 6)]]

ولما تنقل [[port = 3000]] لآخر الملف، بيبقى جوه آخر admin: [[{"name": "علي", "email": "ali@example.com", "port": 3000}]] ومبيبقاش في الأول خالص.`
        },
        {
          cmd: ".ini و .cfg و .conf",
          title: "ملف INI شكله إيه ([section] و key=value و ;)، وليه .conf مش دايمًا INI؟",
          desc: R`INI أقدم صيغة إعدادات لسه مستخدمة (من أيام Windows 3.1): أقسام بين [[[ ]]] وتحت كل قسم [[key=value]]. بسيطة جدًا، بس مفيش ليها معيار رسمي، فكل برنامج بيقراها بطريقته.

الرموز:
• [[[database]]]: بداية قسم (section).
• [[key = value]] أو [[key=value]]: إعداد. (بعض البرامج بتقبل [[:]] كمان.)
• [[;]] في أول السطر: تعليق. وأغلب البرامج بتقبل [[#]] كمان.
• مفيش أنواع: كل القيم نصوص، والبرنامج هو اللي بيحوّل [[3306]] لرقم و [[true]] لـ boolean.
• مفيش nesting (أقسام جوه أقسام) رسمي، ومفيش lists.

نقط بتختلف من برنامج للتاني: هل التنصيص بيتشال ولا بيفضل جزء من القيمة؟ هل [[#]] بعد القيمة تعليق؟ هل المفاتيح حساسة للحروف؟ هل ينفع مفتاح بره أي قسم؟ عشان كده لازم تعرف البرنامج اللي هيقرا.

هتقابل الشكل ده فين (بامتدادات مختلفة):
• [[.ini]]: [[php.ini]]، و [[desktop.ini]] في ويندوز، و [[pytest.ini]] و [[tox.ini]].
• [[.cfg]]: [[setup.cfg]] في Python القديمة.
• [[.conf]] و [[.cnf]]: [[my.cnf]] (MySQL)، و [[/etc/samba/smb.conf]].
• من غير امتداد: [[~/.gitconfig]] و [[.git/config]] (بيتعدّلوا بـ [[git config]])، و [[.editorconfig]]، و systemd [[.service]]، و [[.desktop]] على لينكس.

لكن خد بالك: [[.conf]] مجرد «ملف إعدادات»، مش صيغة. [[nginx.conf]] صيغة تانية خالص بأقواس [[{ }]] و [[;]] في آخر كل سطر (المستوى ٢)، و [[/etc/ssh/sshd_config]] سطور [[key value]] بمسافة. دايمًا افتح الملف واعرف صيغته من شكله ومن وثائق البرنامج.`,
          example: R`; إعدادات قاعدة البيانات
[database]
host = localhost
port = 3306
user = app
[server]
listen=8080
debug = true
# تعليق بالطريقة التانية
name = "Gym Portal"`,
          flag: "script",
          try: R`احفظ المثال في [[app.ini]] واقراه بـ Python:
[[python3 -c 'import configparser; c = configparser.ConfigParser(); c.read("app.ini"); print(c.sections(), c["database"]["port"], c.getint("database", "port") + 1, repr(c["server"]["name"]))']]
لاحظ نوع [[port]] وشكل [[name]]. وبعدين بص على ملف INI حقيقي عندك: [[cat ~/.gitconfig]] وجرّب [[git config --get user.name]].`,
          deep: {
            why: R`في التمانينات والتسعينات كل برنامج كان محتاج يحفظ إعدادات بسيطة، و INI كان أبسط حاجة ممكنة: أقسام ومفاتيح. ولسه عايش لأن معظم الإعدادات فعلًا بسيطة كده، ولأن برامج قديمة كتير (PHP و MySQL و Git) بنت عليه.`,
            how: R`كل لغة فيها parser: [[configparser]] في Python، و [[parse_ini_file]] في PHP. لاحظ الفرق: [[configparser]] بيسيب التنصيص جزء من القيمة ([['"Gym Portal"']])، و PHP بيشيله ([[Gym Portal]]) وكمان بيحوّل [[true]] لـ [["1"]]. نفس الملف، قراءتين.`,
            when: R`لما تعدّل [[php.ini]] (حجم الرفع [[upload_max_filesize]] مثلًا) أو [[my.cnf]] أو [[.gitconfig]]. أما لو بتعمل ملف إعدادات جديد لمشروعك، TOML أوضح وليه معيار.`,
            mistakes: R`تفتكر إن [[port]] رقم فتجمع عليه في Python فيطلعلك [['3306' + 1]] error: استخدم [[getint]]. تحط تنصيص حوالين القيمة فيفضل جزء منها في برنامج ومش في التاني. وتفتكر إن كل [[.conf]] صيغة INI فتكتب [[[server]]] في [[nginx.conf]].`
          },
          teach: R`## الفكرة: أقسام ومفاتيح، وكل حاجة نص

المثال [[app.ini]] فيه قسمين. INI (من initialization، يعني إعدادات بداية التشغيل) أبسط صيغة إعدادات: مفيش أنواع، ومفيش حاجة جوه حاجة، ومفيش معيار رسمي. عشان كده هنقرا نفس الملف ببرنامجين (Python و PHP) ونشوف إزاي كل واحد فهمه بطريقته.

---

## ١. التعليق والقسم الأول

~~~text السطور ١ لـ ٥
; إعدادات قاعدة البيانات
[database]
host = localhost
port = 3306
user = app
~~~

- [[;]] في أول السطر: تعليق، وده الشكل الأصلي في INI.
- [[[database]]]: بداية **قسم** (section). كل [[key = value]] بعده تبعه لحد القسم اللي بعده.
- [[host = localhost]]: مفتاح و [[=]] وقيمة. النص من غير تنصيص عادي.
- [[port = 3306]]: شكله رقم، بس الصيغة مبتعرفش أرقام. هيوصل للبرنامج النص [[3306]]. (3306 البورت الافتراضي لـ MySQL.)

---

## ٢. القسم التاني والاختلافات

~~~text السطور ٦ لـ ١٠
[server]
listen=8080
debug = true
# تعليق بالطريقة التانية
name = "Gym Portal"
~~~

- [[listen=8080]] من غير مسافات حوالين [[=]]: نفس المعنى، الـ parser بيشيل المسافات.
- [[debug = true]]: برضه نص [[true]]، والبرنامج يقرر يعتبره boolean.
- [[#]]: تعليق في أغلب البرامج (Python بيقبل [[;]] و [[#]] الاتنين افتراضيًا).
- [[name = "Gym Portal"]]: هنا الخلاف الكبير. هل التنصيص جزء من القيمة؟ كل برنامج وردّه.

---

## ٣. نقراه بـ Python: [[configparser]]

~~~python
import configparser
c = configparser.ConfigParser()
c.read("app.ini", encoding="utf-8")
print(c.sections(), c["database"]["port"], c.getint("database", "port") + 1, repr(c["server"]["name"]))
~~~

- [[configparser]]: مكتبة INI جاية مع Python. و [[ConfigParser()]] بيعمل object فاضي.
- [[c.read(...)]]: اقرا الملف. [[encoding="utf-8"]] عشان التعليق العربي.
- [[c.sections()]]: أسامي الأقسام.
- [[c["database"]["port"]]]: القيمة كنص.
- [[c.getint(...)]]: هات القيمة وحوّلها رقم صحيح. وفيه [[getboolean]] و [[getfloat]].

~~~text الناتج (Python 3.14 على ويندوز)
['database', 'server'] 3306 3307 '"Gym Portal"'
~~~

- [[3306]] اتطبعت من غير تنصيص بس هي نص، و [[getint]] حوّلها فـ [[+ 1]] طلّع [[3307]].
- [[name]] قيمته فيها علامات التنصيص نفسها: [['"Gym Portal"']]. [[configparser]] مبيشيلش التنصيص.

ولو جمعت على النص من غير [[getint]]:

~~~text الناتج
TypeError: can only concatenate str (not "int") to str
~~~

وحاجات تانية جرّبتها: [[c.getboolean("server", "debug")]] رجّع [[True]] (بيفهم [[true]] و [[yes]] و [[on]] و [[1]])، و [[c.has_option("server", "DEBUG")]] رجّع [[True]] لأن [[configparser]] بيحوّل أسامي المفاتيح لحروف صغيرة.

---

## ٤. نفس الملف في PHP

~~~bash
php -r 'var_dump(parse_ini_file("app.ini", true));'
~~~

- [[php -r]]: شغّل كود PHP من سطر الأوامر.
- [[parse_ini_file(..., true)]]: اقرا INI، و [[true]] معناها «رجّع الأقسام كمستويات»، من غيرها كل المفاتيح بتتحط في مستوى واحد.
- [[var_dump]]: اطبع القيمة بنوعها وطولها.

~~~text الناتج (PHP 8.3.6 في ubuntu:24.04، الجزء بتاع server)
  ["server"]=>
  array(3) {
    ["listen"]=>
    string(4) "8080"
    ["debug"]=>
    string(1) "1"
    ["name"]=>
    string(10) "Gym Portal"
  }
~~~

- [[string(10) "Gym Portal"]]: PHP **شال** التنصيص (١٠ حروف من غير [["]]).
- [[debug]] بقت [["1"]]: PHP بيحوّل [[true]] و [[on]] و [[yes]] لـ [["1"]].
- [[port]] (في قسم database) طلع [[string(4) "3306"]]: نص برضه.

| المفتاح | Python [[configparser]] | PHP [[parse_ini_file]] |
|---|---|---|
| [[port]] | [['3306']] | [["3306"]] |
| [[debug]] | [['true']] | [["1"]] |
| [[name]] | [['"Gym Portal"']] بالتنصيص | [["Gym Portal"]] من غير |

نفس الملف، قراءتين. عشان كده متحطش تنصيص في INI إلا لو عارف البرنامج هيعمل فيه إيه.

> PowerShell مفيهوش أمر INI جاهز، فلو احتجت تقرا INI على ويندوز استخدم Python.

---

## ٥. INI حقيقي عندك: [[.gitconfig]]

~~~bash
cat ~/.gitconfig
git config --get user.name
~~~

- [[~]]: فولدر اليوزر بتاعك. [[.gitconfig]] إعدادات Git العامة.
- [[git config --get user.name]]: هات قيمة [[name]] من قسم [[[user]]]. النقطة في [[user.name]] معناها «قسم user، مفتاح name».

الناتج اسمك اللي سجّلته في Git (على الجهاز ده [[ali]]). و [[.gitconfig]] شكله INI بس بتاب قبل كل مفتاح، وده عادي لأن المسافات في الأول ملهاش معنى.

---

## الخلاصة

| الشكل | معناه |
|---|---|
| [[[section]]] | بداية قسم |
| [[key = value]] | إعداد، والقيمة نص دايمًا |
| [[;]] أو [[#]] | تعليق |
| [[.ini]] و [[.cfg]] و [[.cnf]] و [[.gitconfig]] | غالبًا INI |
| [[.conf]] | أي ملف إعدادات، **مش** دايمًا INI ([[nginx.conf]] لأ) |

التحويل للأرقام والـ boolean والتنصيص كله على البرنامج اللي بيقرا، فاعرفه الأول.`,
          lines: [
            R`[[;]] تعليق، وده الشكل الأصلي في INI.`,
            R`بداية قسم [[database]].`,
            R`مفتاح وقيمة. [[localhost]] نص من غير تنصيص.`,
            R`شكله رقم، بس هيتقري نص والبرنامج يحوّله.`,
            R`آخر مفتاح في القسم.`,
            R`قسم جديد: اللي تحته تبع [[server]].`,
            R`من غير مسافات حوالين [[=]]: نفس المعنى.`,
            R`نص [["true"]] والبرنامج يقرر يعتبره boolean.`,
            R`التنصيص هنا: Python بيسيبه جزء من القيمة و PHP بيشيله.`
          ],
          sol: R`أمر Python بيطبع:
[[['database', 'server'] 3306 3307 '"Gym Portal"']]
يعني [[c["database"]["port"]]] نص [['3306']] (اتطبع من غير تنصيص)، و [[getint]] حوّله رقم، و [[name]] قيمته فيها علامات التنصيص نفسها.

وفي PHP، [[parse_ini_file("app.ini", true)]] بيرجّع [[port]] كـ [[string(4) "3306"]]، و [[debug]] كـ [[string(1) "1"]]، و [[name]] كـ [[string(10) "Gym Portal"]] من غير تنصيص.

[[git config --get user.name]] بيطبع اسمك اللي متسجل في قسم [[[user]]] في [[~/.gitconfig]].`
        },
        {
          cmd: ".env",
          title: "ملف .env بيتكتب إزاي، وليه لازم يفضل بره Git، و .env.example ده إيه؟",
          desc: R`[[.env]] ملف فيه متغيرات البيئة (environment variables) بتاعة المشروع: الحاجات اللي بتختلف من جهاز للتاني أو سرية، زي رابط قاعدة البيانات والباسوردات و API keys والبورت. الكود بيقرا منه بدل ما القيم دي تتكتب جوه الكود.

الصيغة:
• [[KEY=value]]: سطر لكل متغير. من غير مسافات حوالين [[=]] (أدوات كتير بتقبلها، بس bash لأ).
• الأسماء بالحروف الكبيرة و [[_]] بالعُرف: [[DATABASE_URL]].
• [[#]] في أول السطر: تعليق.
• القيمة اللي فيها مسافات أو [[#]] حطها بين [["..."]] أو [['...']].
• [[KEY=]] قيمة فاضية.
• [[export KEY=value]]: بعض الأدوات بتقبلها عشان الملف يشتغل مع [[source]] في bash.
• مفيش أنواع: كل حاجة نص. [[PORT=3000]] بيوصل للكود [["3000"]].
• مفيش أقسام ولا nesting، ومفيش معيار رسمي (كل مكتبة ليها قواعد بسيطة مختلفة).

مين بيقراه؟ مش النظام لوحده. لازم أداة:
• Node 20.6+: [[node --env-file=.env app.js]]، أو مكتبة [[dotenv]]: [[require("dotenv").config()]]، وبعدين [[process.env.PORT]].
• Next.js و Vite بيقروه لوحدهم (و Vite بيعرض للمتصفح المتغيرات اللي بتبدأ بـ [[VITE_]] بس).
• Python: [[python-dotenv]] ثم [[os.environ["PORT"]]].
• Docker Compose: [[env_file: .env]]، وكمان بيقرا [[.env]] اللي جنب [[compose.yaml]] لوحده عشان [[$__{VAR}]] في الملف.
• bash: [[set -a; source .env; set +a]].

أهم قاعدة: [[.env]] عمره ما يتعمله commit. حطه في [[.gitignore]] من أول دقيقة. وبدل منه اعمل commit لملف [[.env.example]] فيه نفس المفاتيح بقيم وهمية أو فاضية، عشان أي حد ياخد المشروع يعرف محتاج إيه: [[cp .env.example .env]] ويملاه.

وفيه أخوات: [[.env.local]] (لجهازك، و Next.js بيقدّمه على [[.env]])، و [[.env.production]] و [[.env.development]] و [[.env.test]].`,
          example: R`# إعدادات السيرفر
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://app:s3cret@localhost:5432/gym
JWT_SECRET="a long random string # not a comment"
APP_NAME='Gym Portal'
EMPTY=
export STRIPE_KEY=sk_test_123`,
          flag: "script",
          try: R`احفظ المثال في [[.env]] في فولدر تجربة، ونفّذ:
[[node --env-file=.env -e 'console.log(process.env.PORT, typeof process.env.PORT, process.env.JWT_SECRET)']]
وبعدين اعمل [[.env.example]] بنفس المفاتيح من غير القيم، وحط [[.env]] في [[.gitignore]] ([[echo .env >> .gitignore]])، ولو الفولدر repo اتأكد بـ [[git status]] إن [[.env]] مش ظاهر. وآخر حاجة حل التمرين.`,
          deep: {
            why: R`فكرة اسمها «The Twelve-Factor App»: الإعدادات اللي بتتغير بين البيئات (جهازك، والسيرفر التجريبي، والـ production) تيجي من متغيرات البيئة مش من الكود، فنفس الكود يشتغل في كل مكان، والأسرار متبقاش في الـ repo. و [[.env]] مجرد طريقة مريحة تحط المتغيرات دي في ملف وانت بتطوّر.`,
            how: R`الأداة (dotenv أو Node أو Compose) بتقرا الملف سطر سطر، وتقسم كل سطر عند أول [[=]]، وتشيل التنصيص لو موجود، وتحط النتيجة في [[process.env]] (أو بيئة الحاوية). ومعظم الأدوات مبتغطيش على متغير موجود أصلًا في البيئة، فالقيمة اللي السيرفر حاططها بتكسب على اللي في الملف.`,
            when: R`أي مشروع فيه باسورد أو key أو رابط قاعدة بيانات. وعلى السيرفر الحقيقي غالبًا مبتستخدمش [[.env]]: المنصة (Vercel و Railway و GitHub Actions secrets) بتحط المتغيرات مباشرة.`,
            mistakes: R`تعمل commit لـ [[.env]]: حتى لو مسحته بعدين، هو لسه في تاريخ Git وأي حد معاه الـ repo يقدر يجيبه، فلازم تغيّر كل الأسرار اللي فيه (rotate)، مش بس تمسحه. وتحط سر في متغير بيوصل للمتصفح ([[NEXT_PUBLIC_]] أو [[VITE_]]) فيبقى ظاهر لأي حد. وتكتب [[PORT = 3000]] بمسافات فـ [[source]] في bash يقول [[PORT: command not found]]. وتنسى إن القيمة نص: [[if (process.env.DEBUG)]] بتبقى true حتى لو القيمة [[false]] لأن [["false"]] نص مش فاضي.`
          },
          teach: R`## الفكرة: متغيرات بيئة في ملف

البرنامج بيقرا إعداداته من **متغيرات البيئة** (environment variables): أسامي وقيم النظام بيديها لأي برنامج وهو بيشتغل. [[.env]] مجرد ملف بتكتب فيه المتغيرات دي، وأداة (Node أو dotenv أو Compose) بتقراه وتحطها في البيئة قبل ما الكود يشتغل. هنفك المثال سطر سطر، وبعدين نقراه بـ ٤ أدوات.

---

## ١. سطر سطر

~~~bash
# إعدادات السيرفر
NODE_ENV=production
PORT=3000
~~~

- [[#]] في أول السطر: تعليق.
- [[NODE_ENV=production]]: اسم و [[=]] وقيمة، **من غير مسافات**. الأسامي حروف كبيرة و [[_]] بالعُرف. [[NODE_ENV]] متغير مشهور: مكتبات كتير بتشتغل أسرع وبتطبع أخطاء أقل لما يبقى [[production]].
- [[PORT=3000]]: شكله رقم، بس هيوصل للكود نص [["3000"]]. البيئة مفيهاش أنواع.

~~~bash
DATABASE_URL=postgresql://app:s3cret@localhost:5432/gym
~~~

رابط قاعدة بيانات. نفكه:

| الحتة | معناها |
|---|---|
| [[postgresql://]] | نوع القاعدة (البروتوكول) |
| [[app]] | اسم اليوزر |
| [[:s3cret]] | الباسورد |
| [[@localhost]] | السيرفر |
| [[:5432]] | البورت (الافتراضي لـ PostgreSQL) |
| [[/gym]] | اسم القاعدة |

الباسورد جوه الرابط، وده بالظبط ليه الملف ده سري. ولاحظ إن فيه [[:]] و [[@]] و [[=]] ممكن، والأداة بتقسم عند **أول** [[=]] بس.

~~~bash
JWT_SECRET="a long random string # not a comment"
APP_NAME='Gym Portal'
EMPTY=
export STRIPE_KEY=sk_test_123
~~~

- [["..."]]: القيمة فيها مسافات و [[#]]. جوه التنصيص الـ [[#]] جزء من القيمة مش تعليق. والتنصيص نفسه بيتشال.
- [['...']]: نفس الفكرة بتنصيص مفرد.
- [[EMPTY=]]: متغير موجود قيمته نص فاضي [[""]].
- [[export ...]]: كلمة bash معناها «ابعت المتغير ده للبرامج اللي هتشتغل من هنا». بعض الأدوات بتقبلها وتشيلها، عشان نفس الملف يشتغل مع [[source]] في bash.

---

## ٢. Node من غير مكتبات: [[--env-file]]

~~~bash
node --env-file=.env -e 'console.log(process.env.PORT, typeof process.env.PORT, process.env.JWT_SECRET)'
~~~

- [[--env-file=.env]]: (Node 20.6 وأحدث) اقرا الملف ده وحطه في البيئة قبل ما الكود يشتغل.
- [[-e '...']]: شغّل الكود ده على طول بدل ملف.
- [[process.env]]: object فيه كل متغيرات البيئة. و [[typeof]] بيقول النوع.

~~~text الناتج (Node 24 على ويندوز)
3000 string a long random string # not a comment
~~~

[[string]]: الـ [[3000]] نص، لو عايزه رقم [[Number(process.env.PORT)]]. والـ [[#]] اللي جوه التنصيص فضلت. وطبعت كل المتغيرات:

~~~text الناتج
NODE_ENV "production"
PORT "3000"
DATABASE_URL "postgresql://app:s3cret@localhost:5432/gym"
JWT_SECRET "a long random string # not a comment"
APP_NAME "Gym Portal"
EMPTY ""
STRIPE_KEY "sk_test_123"
~~~

التنصيص المفرد اتشال، و [[export]] اتشالت.

### مين بيكسب: الملف ولا البيئة؟

~~~bash
PORT=9999 node --env-file=.env -e 'console.log(process.env.PORT)'
~~~

[[PORT=9999]] قبل الأمر في bash معناها «شغّل الأمر ده والمتغير ده في بيئته». الناتج [[9999]]: المتغير اللي موجود فعلًا في البيئة بيكسب على اللي في الملف. ده اللي بيخلي السيرفر يقدر يغيّر أي قيمة من غير ما يلمس الملف.

---

## ٣. مكتبة [[dotenv]] و [[python-dotenv]]

~~~javascript
const r = require("dotenv").config();
console.log(r.parsed);
~~~

[[config()]] بيقرا [[.env]] من الفولدر الحالي ويحطه في [[process.env]]، و [[r.parsed]] فيه اللي قراه. dotenv 18.0.6 طلّع نفس القيم السبعة بالظبط، وقبلها طبع سطر لوحده [[◇ injected env (7) from .env]] (تقدر تسكّته بـ [[config({ quiet: true })]]).

~~~python
from dotenv import load_dotenv
import os
load_dotenv()
print(repr(os.environ["PORT"]), repr(os.environ["JWT_SECRET"]), repr(os.environ["APP_NAME"]))
~~~

~~~text الناتج (python-dotenv على Python 3.14)
'3000' 'a long random string # not a comment' 'Gym Portal'
~~~

[[os.environ]] هو [[process.env]] بتاع Python. وبرضه كله نص.

---

## ٤. bash: [[set -a; source .env; set +a]]

~~~bash
set -a; source .env; set +a
echo "$PORT|$JWT_SECRET|$APP_NAME|$EMPTY|$STRIPE_KEY"
bash -c 'echo child sees: $DATABASE_URL'
~~~

- [[source .env]]: نفّذ الملف كأنه أوامر bash في نفس الـ shell. كل سطر [[KEY=value]] بيبقى متغير.
- [[set -a]]: (a = allexport) أي متغير يتعمل من دلوقتي يتعمله export تلقائي، عشان البرامج اللي هتشغلها تشوفه. و [[set +a]] بيقفل الوضع ده.
- [[bash -c]]: شغّل bash جديد (برنامج ابن) عشان نتأكد إنه شايف المتغير.

~~~text الناتج (ubuntu:24.04)
3000|a long random string # not a comment|Gym Portal||sk_test_123
child sees: postgresql://app:s3cret@localhost:5432/gym
~~~

[[||]] في النص هي [[EMPTY]] الفاضية بين الفاصلين. ولو كتبت [[PORT = 3000]] بمسافات:

~~~text الناتج
bad.env: line 1: PORT: command not found
~~~

لأن bash فهم [[PORT]] اسم أمر، و [[=]] و [[3000]] arguments ليه.

---

## ٥. الفخ: [["false"]] نص مش فاضي

~~~bash
DEBUG=false node -e 'console.log(process.env.DEBUG ? "true!" : "false")'
~~~

~~~text الناتج
true!
~~~

[[? :]] بيختار أول قيمة لو الشرط truthy. وأي نص مش فاضي truthy في JavaScript، حتى [["false"]]. قارن بالنص: [[process.env.DEBUG === "true"]].

---

## ٦. بره Git

~~~bash
echo .env >> .gitignore
git status --short
~~~

- [[>>]]: ضيف في آخر الملف (مش [[>]] اللي بتمسح وتكتب).
- [[git status --short]]: اعرض الملفات المتغيرة سطر لكل واحد. [[??]] يعني ملف جديد Git مش متابعه.

~~~text الناتج قبل (repo تجربة فيه .env و .env.example)
?? .env
?? .env.example
~~~

~~~text الناتج بعد
?? .env.example
?? .gitignore
~~~

[[.env]] اختفى: Git بقى بيتجاهله. و [[.env.example]] (نفس المفاتيح بقيم وهمية أو فاضية) هو اللي بيتعمله commit.

---

## ٧. التمرين

التمرين بيطلب parser لنص [[.env]]. القواعد كلها اللي شفناها فوق، فاكتبهم كخطوات لكل سطر: نضّف السطر (ومتنساش [[\r]] اللي في ملفات ويندوز)، اتجاهل الفاضي والتعليق، شيل [[export ]] لو في الأول، اقسم عند **أول** [[=]] بس (عشان الـ [[=]] اللي جوه الروابط)، وشيل التنصيص لو القيمة بتبدأ وتخلص بنفس العلامة.

---

## الخلاصة

| الأداة | بتقراه إزاي |
|---|---|
| Node 20.6+ | [[node --env-file=.env app.js]] |
| Node (مكتبة) | [[require("dotenv").config()]] |
| Python | [[load_dotenv()]] من [[python-dotenv]] |
| bash | [[set -a; source .env; set +a]] |
| Docker Compose | [[env_file: .env]]، و [[.env]] اللي جنب الملف لوحده |

كل القيم نصوص، والبيئة الموجودة بتكسب على الملف، و [[.env]] في [[.gitignore]] من أول دقيقة.`,
          lines: [
            R`متغير عادي: اسم و [[=]] وقيمة، من غير مسافات.`,
            R`شكله رقم بس هيوصل للكود نص [["3000"]].`,
            R`رابط قاعدة بيانات فيه اليوزر والباسورد: ده بالظبط ليه الملف سري.`,
            R`بين [["]]: المسافات و [[#]] جوه القيمة مش تعليق.`,
            R`تنصيص مفرد: نفس الفكرة.`,
            R`قيمة فاضية [[""]].`,
            R`[[export]] في الأول: بعض الأدوات بتقبلها عشان الملف يتعمله [[source]] في bash.`
          ],
          sol: R`أمر node بيطبع:
[[3000 string a long random string # not a comment]]
يعني [[PORT]] نص مش رقم (حوّله بـ [[Number(process.env.PORT)]])، والـ [[#]] اللي جوه التنصيص فضلت جزء من القيمة.

وكل القيم اللي Node قراها: [["production"]] و [["3000"]] و [["postgresql://app:s3cret@localhost:5432/gym"]] و [["Gym Portal"]] (من غير التنصيص المفرد) و [[""]] و [["sk_test_123"]] (الـ [[export]] اتشالت).

[[.env.example]] شكله:
[[NODE_ENV=development]]
[[PORT=3000]]
[[DATABASE_URL=]]
[[JWT_SECRET=]]
وبعد ما تضيف [[.env]] لـ [[.gitignore]]، [[git status]] مبيعرضوش. ولو كان اتعمله commit قبل كده، [[git rm --cached .env]] بيشيله من Git ويسيبه على جهازك (وغيّر الأسرار اللي فيه).`,
          check: {
            lang: "js",
            starter: R`// parseEnv: حوّل نص ملف .env لـ object
// اتجاهل السطور الفاضية والتعليقات (#)، وشيل export من الأول،
// وقسّم عند أول = بس، وشيل التنصيص " أو ' لو القيمة متنصصة
function parseEnv(text) {
  const out = {};
  for (const line of text.split("\n")) {
    const [key, value] = line.split("=");
    out[key] = value;
  }
  return out;
}`,
            tests: R`test("سطور عادية، والقيم كلها نصوص", () => expect(parseEnv("NODE_ENV=production\nPORT=3000")).toEqual({ NODE_ENV: "production", PORT: "3000" }));
test("التعليقات والسطور الفاضية بتتجاهل", () => expect(parseEnv("# comment\n\nA=1\n")).toEqual({ A: "1" }));
test("= جوه القيمة (أول = بس هو الفاصل)", () => expect(parseEnv("DATABASE_URL=postgres://u:p@h/db?ssl=true")).toEqual({ DATABASE_URL: "postgres://u:p@h/db?ssl=true" }));
test("التنصيص بيتشال و # جواه تفضل", () => expect(parseEnv('SECRET="a b # c"\nNAME=\'Gym Portal\'')).toEqual({ SECRET: "a b # c", NAME: "Gym Portal" }));
test("export في الأول وقيمة فاضية", () => expect(parseEnv("export KEY=sk_1\nEMPTY=")).toEqual({ KEY: "sk_1", EMPTY: "" }));
test("نهايات سطور ويندوز", () => expect(parseEnv("A=1\r\nB=2\r\n")).toEqual({ A: "1", B: "2" }));`,
            solution: R`function parseEnv(text) {
  const out = {};
  for (let line of text.split(/\r?\n/)) {
    line = line.trim();
    if (!line || line.startsWith("#")) continue;
    if (line.startsWith("export ")) line = line.slice(7);
    const i = line.indexOf("=");
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    let value = line.slice(i + 1).trim();
    if (value.length >= 2 && (value[0] === '"' || value[0] === "'") && value[value.length - 1] === value[0]) value = value.slice(1, -1);
    out[key] = value;
  }
  return out;
}`
          }
        }
      ]
    }
]);
