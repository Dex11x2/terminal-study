// تكملة تاب files: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/files/01.js (شرح حقول الدرس في أوله)
MORE("files", [
    {
      t: "التحويل بين الصيغ والتحقق منها",
      l: 3,
      n: "تحوّل JSON لـ YAML والعكس، و CSV لـ JSON، وتقرا XML من الكود، وتتأكد إن الملف مش بس سليم في الكتابة، لأ كمان شكله صح (JSON Schema و XSD و yamllint)، وفي الآخر: تختار صيغة إيه لمشروعك",
      items: [
        {
          cmd: "JSON و YAML",
          title: "تحوّل JSON لـ YAML والعكس إزاي (python و yq)، وإيه اللي بيضيع في التحويل؟",
          desc: R`JSON و YAML بيوصفوا نفس الحاجة (objects و lists ونصوص وأرقام و booleans و null)، فالتحويل بينهم سهل. هتحتاجه لما تلاقي مثال في الوثائق بصيغة وانت محتاج التانية، أو تحوّل [[compose.yaml]] أو Kubernetes manifest لـ JSON عشان تعالجه بكود.

الأدوات:
• Python (موجود في كل حتة، ومحتاج [[pyyaml]]):
  JSON لـ YAML: [[yaml.safe_dump(json.load(f), allow_unicode=True, sort_keys=False)]]
  YAML لـ JSON: [[json.dumps(yaml.safe_load(f), ensure_ascii=False, indent=2)]]
  ([[allow_unicode]] و [[ensure_ascii=False]] عشان العربي ميتحولش لـ [[س]]، و [[sort_keys=False]] عشان الترتيب ميتغيرش.)
• [[yq]] (نسخة mikefarah، ملف واحد: [[brew install yq]] أو [[snap install yq]] أو [[docker run mikefarah/yq]]): زي [[jq]] بالظبط بس بيفهم YAML و JSON و TOML و XML.
  [[yq -o=json app.yaml]]: YAML لـ JSON.
  [[yq -o=yaml user.json]]: JSON لـ YAML.
  [[yq '.app.port' app.yaml]]: تطلّع قيمة.
  [[yq -i '.app.port = 8080' app.yaml]]: تعدّل الملف نفسه (مفيد في CI و deploy scripts).
• أونلاين: مواقع تحويل كتير، بس متلزقش فيها ملفات فيها أسرار.

إيه اللي بيضيع أو بيتغير:
• التعليقات: JSON مفيهوش، فتعليقات YAML بتضيع. و [[yaml.safe_dump]] كمان مبيحفظش التعليقات لما تقرا وتكتب YAML (استخدم [[ruamel.yaml]] أو [[yq]] اللي بيحاول يحافظ عليها).
• الـ anchors ([[&]] و [[*]]): بتتفك وتبقى نسخ مكررة.
• الأنواع اللي YAML خمّنها غلط (درس «مشكلة النرويج»): [[1.10]] بقت [[1.1]] قبل ما توصل JSON أصلًا.
• التواريخ: PyYAML بيقرا [[2026-10-01]] تاريخ، و [[json.dumps]] بيقع ([[Object of type date is not JSON serializable]]) إلا لو [[default=str]].
• في الاتجاه التاني الأمور أسلم: JSON سليم = YAML سليم، والقيم اللي ممكن تتلخبط (زي [["11511"]]) بيتحطلها تنصيص لوحدها.`,
          example: R`python3 -c 'import json, yaml; print(yaml.safe_dump(json.load(open("user.json")), allow_unicode=True, sort_keys=False), end="")' > user.yaml
head -4 user.yaml
python3 -c 'import json, yaml; print(json.dumps(yaml.safe_load(open("app.yaml")), ensure_ascii=False, indent=2))'
yq -o=json '.app' app.yaml
yq '.app.port' app.yaml
yq -o=yaml '.address' user.json`,
          try: R`على [[user.json]] (درس [[.json]]) و [[app.yaml]] (درس [[.yaml]]) نفّذ المثال (لو [[yq]] مش متسطّب: [[docker run --rm -v "$PWD":/w -w /w mikefarah/yq -o=json '.app' app.yaml]]). بص على [[zip]] في [[user.yaml]]: اتكتب إزاي؟ وبعدين حوّل [[norway.yaml]] (درس «مشكلة النرويج») لـ JSON بـ Python وشوف [[NO]] وصلت إيه.`,
          deep: {
            why: R`كل أداة اختارت صيغة: Kubernetes و Compose و GitHub Actions بـ YAML، والـ APIs و package.json بـ JSON. والكود بتاعك غالبًا بيفهم JSON أسهل. فالتحويل مهارة يومية، والمهم تعرف إيه اللي ممكن يتغير وانت مش واخد بالك.`,
            how: R`أي تحويل بيمر بنفس الخطوتين: parse للصيغة الأولى لقيم في الذاكرة (dict و list و str و int)، وبعدين dump للقيم دي بالصيغة التانية. عشان كده أي حاجة مش «قيمة» (تعليق، anchor، تنسيق، ترتيب أحيانًا) مبتعديش، وأي تخمين حصل في الـ parse بيفضل.`,
            when: R`تحوّل مثال من الوثائق، أو تعدّل قيمة في YAML من سكربت deploy ([[yq -i]])، أو تقرا إعدادات YAML في كود Node أو Python.`,
            mistakes: R`تحوّل ملف YAML عليه تعليقات مهمة وترجّعه فتضيع كلها. تنسى [[allow_unicode]] فالعربي يبقى [["سا..."]] في YAML. تستخدم [[yaml.load]] بدل [[yaml.safe_load]] على ملف جاي من بره (ممكن ينفذ كود). وتخلط بين [[yq]] بتاع mikefarah و [[yq]] بتاع Python (اسمهم واحد والأوامر مختلفة).`
          },
          teach: R`## الفكرة في سطرين

المثال بياخد [[user.json]] (درس [[.json]]) ويحوّله YAML، وبياخد [[app.yaml]] (درس [[.yaml]]) ويحوّله JSON، مرة بـ Python ومرة بأداة اسمها [[yq]]. كل تحويل بيمر بخطوتين ثابتتين: **parse** (اقرا الصيغة الأولى لقيم في الذاكرة) و **dump** (اكتب القيم دي بالصيغة التانية).

الأوامر اتشغّلت على ويندوز في PowerShell 7 بـ Python 3.14 (مكتبة PyYAML 6.0.3) و [[yq]] نسخة mikefarah v4.54.1 (نزّلناها ملف واحد في فولدر التجربة). نفس الكود بيشتغل على لينكس والماك بالظبط.

---

## ١. JSON لـ YAML بـ Python

~~~bash
python3 -c 'import json, yaml; print(yaml.safe_dump(json.load(open("user.json")), allow_unicode=True, sort_keys=False), end="")' > user.yaml
~~~

- [[-c]]: نفّذ الكود ده على طول.
- [[import json, yaml]]: المكتبتين. [[json]] جاي مع Python، و [[yaml]] (PyYAML) محتاج [[pip install pyyaml]].
- [[json.load(open("user.json"))]]: **parse**. [[open(...)]] بيفتح الملف، و [[json.load]] بيقراه لقيم Python: [[dict]] و [[list]] و [[str]] و [[int]] و [[bool]] و [[None]].
- [[yaml.safe_dump(...)]]: **dump**. بياخد القيم ويكتبها YAML. [[safe]] يعني يكتب الأنواع العادية بس (مش أي object غريب).
- [[allow_unicode=True]]: اكتب العربي زي ما هو، من غير كده بيطلع [[سا...]].
- [[sort_keys=False]]: سيب ترتيب المفاتيح زي الأصل (الافتراضي بيرتّبهم أبجدي).
- [[end=""]]: [[print]] بيزوّد سطر فاضي في الآخر، ده بيلغيه.
- [[> user.yaml]]: احفظ الناتج في الملف ده بدل ما يتطبع.

> لو نسيت [[allow_unicode=True]]، العربي بيطلع escapes: [[name: "سارة أحمد"]]. شغّال، بس مش مقروء.

---

## ٢. نبص على الناتج: [[head -4 user.yaml]]

[[head -4]] أول ٤ سطور. الملف كله طلع كده:

~~~yaml user.yaml
id: 42
name: سارة أحمد
email: sara@example.com
active: true
balance: 1250.5
manager: null
roles:
- admin
- editor
address:
  city: القاهرة
  zip: '11511'
orders:
- id: 1
  total: 300
- id: 2
  total: 950.75
~~~

لاحظ تلات حاجات:
- الترتيب زي JSON بالظبط (بفضل [[sort_keys=False]]).
- العربي سليم (بفضل [[allow_unicode]]).
- [[zip: '11511']] **اتحطلها تنصيص لوحدها**: PyYAML عرف إنها لو كتبها من غير quotes هتتقري رقم (11511)، وهي أصلًا نص في الـ JSON، فحماها بالـ quotes. ده YAML بيحميك من «مشكلة النرويج» في الاتجاه ده.

على ويندوز في PowerShell [[head]] مش موجود، استخدم [[Get-Content user.yaml -TotalCount 4]] أو [[Get-Content user.yaml]] للكل.

---

## ٣. YAML لـ JSON بـ Python

~~~bash
python3 -c 'import json, yaml; print(json.dumps(yaml.safe_load(open("app.yaml")), ensure_ascii=False, indent=2))'
~~~

نفس الخطوتين بالعكس:
- [[yaml.safe_load(...)]]: parse للـ YAML. [[safe]] مهمة هنا: [[yaml.load]] العادي ممكن ينفّذ كود لو الملف جاي من مصدر مش موثوق.
- [[json.dumps(...)]]: dump لـ JSON نص. [[dumps]] بـ s يعني «to string» (مش ملف).
- [[ensure_ascii=False]]: نفس فكرة [[allow_unicode]]، خلّي العربي عربي.
- [[indent=2]]: نسّق بـ مسافتين لكل مستوى.

~~~text أول الناتج
{
  "app": {
    "name": "gym-portal",
    "port": 3000,
    "debug": false,
    "version": "1.10"
  },
  ...
~~~

[[app.port]] طلع رقم [[3000]] و [[app.debug]] طلع [[false]]، لأن YAML عرف أنواعهم. و [[version]] فضل نص [["1.10"]] لأنه كان متنصص في الـ YAML الأصلي (من غير التنصيص كان YAML هيقراه [[1.1]]).

---

## ٤، ٥، ٦. نفس الحاجة بـ [[yq]]

[[yq]] (نسخة mikefarah) أداة ملف واحد زي [[jq]] بالظبط، بس بتفهم YAML و JSON و TOML و XML. الفكرة: بتديه الملف وتعبير بيختار جزء منه.

### [[yq -o=json '.app' app.yaml]]

- [[-o=json]]: output format = JSON (الافتراضي YAML).
- [['.app']]: التعبير: «هات المفتاح [[app]]». النقطة في الأول معناها «من جذر الملف».

~~~text الناتج
{
  "name": "gym-portal",
  "port": 3000,
  "debug": false,
  "version": "1.10"
}
~~~

### [[yq '.app.port' app.yaml]]

[[.app.port]] يعني ادخل [[app]] وبعدها [[port]]. من غير [[-o]] بيطبع القيمة زي ما هي:

~~~text الناتج
3000
~~~

### [[yq -o=yaml '.address' user.json]]

هنا الدخل JSON (من الامتداد عرف)، والخرج YAML:

~~~text الناتج
city: القاهرة
zip: "11511"
~~~

برضه [[yq]] حطّ تنصيص على [[zip]] لوحده عشان يحميها من التحويل لرقم. ولو عايز تعدّل الملف نفسه (مش بس تقرا) فيه [[yq -i '.app.port = 8080' app.yaml]]: [[-i]] = in place، مفيد في سكربتات الـ deploy.

> على ويندوز نزّلنا [[yq.exe]]. على لينكس والماك: [[brew install yq]] أو [[snap install yq]]. وفيه [[yq]] تاني بتاع Python بأوامر مختلفة خالص، فخلي بالك مين اللي متسطّب.

---

## اللي بيضيع في التحويل: «مشكلة النرويج»

التحويل مش دايمًا بريء. جرّب تقرا [[norway.yaml]] (درس «مشكلة النرويج») بـ PyYAML اللي بيمشي على YAML 1.1:

~~~bash
python3 -c 'import json, yaml; d=yaml.safe_load(open("norway.yaml")); print(json.dumps(d, default=str, ensure_ascii=False))'
~~~

~~~text الناتج
{"countries": ["EG", "SA", false], "answer": true, "switch": true, "version": 1.1, "ports": 1342, "zip": 668, "time": 750, "empty": null, "tilde": null, "date": "2026-10-01", "safe": "NO"}
~~~

شوف اللي اتخرب **قبل** ما يوصل JSON أصلًا:

| في الـ YAML | وصل إيه | ليه |
|---|---|---|
| [[NO]] (كود النرويج) | [[false]] | YAML 1.1 بيعتبر [[no]] قيمة boolean |
| [[yes]] | [[true]] | نفس الكلام |
| [[on]] | [[true]] | نفس الكلام |
| [[version: 1.10]] | [[1.1]] | اتقري رقم عشري، فالصفر ضاع |
| [[22:22]] | [[1342]] | اتقري وقت بالستين (sexagesimal): 22×60+22 |
| [[01234]] | [[668]] | اتقري رقم ثماني (octal) |
| [["NO"]] | [["NO"]] | ده فضل سليم لأنه كان متنصص |

و [[default=str]] في [[json.dumps]] ضرورية هنا: من غيرها PyYAML بيقرا [[2026-10-01]] كـ **تاريخ** (object [[date]])، و [[json.dumps]] بيقع:

~~~text من غير default=str
TypeError: Object of type date is not JSON serializable
~~~

[[default=str]] معناها «أي حاجة متعرفش تكتبها، حوّلها نص».

---

## ليه ده بيحصل

أي تحويل بيمر بالـ parse والـ dump، فأي حاجة **مش قيمة** مبتعديش:

- **التعليقات**: JSON مفيهوش تعليقات أصلًا، فتعليقات الـ YAML بتضيع. (و [[yq]] بيحاول يحافظ عليها، و [[ruamel.yaml]] في Python كمان.)
- **الـ anchors** ([[&]] و [[*]] في YAML): بتتفك وتبقى نسخ مكررة.
- **أي تخمين غلط حصل في الـ parse** (زي النرويج) بيفضل غلط في الناتج.

---

## الخلاصة

| التحويل | الأمر |
|---|---|
| JSON ← YAML | [[yaml.safe_dump(json.load(f), allow_unicode=True, sort_keys=False)]] أو [[yq -o=yaml f.json]] |
| YAML ← JSON | [[json.dumps(yaml.safe_load(f), ensure_ascii=False, indent=2)]] أو [[yq -o=json f.yaml]] |

~~~text خلي بالك من
allow_unicode / ensure_ascii   عشان العربي
sort_keys=False                عشان الترتيب
safe_load مش load              للملفات اللي من بره
التعليقات والـ anchors          بتضيع
مشكلة النرويج                   بتحصل في الـ parse قبل التحويل
~~~`,
          lines: [
            R`JSON لـ YAML بـ Python، والعربي سليم والترتيب زي ما هو.`,
            R`أول سطور الـ YAML الناتج.`,
            R`YAML لـ JSON منسق.`,
            R`[[yq]]: جزء من الملف كـ JSON.`,
            R`قيمة واحدة.`,
            R`جزء من JSON كـ YAML.`
          ],
          sol: R`الناتج الحقيقي:
[[id: 42]]
[[name: سارة أحمد]]
[[email: sara@example.com]]
[[active: true]]
وفي [[user.yaml]] الرقم البريدي اتكتب [[zip: '11511']] بتنصيص لوحده، عشان ميتقريش رقم.
والـ YAML لـ JSON بيطلّع [["app": {"name": "gym-portal", "port": 3000, "debug": false, "version": "1.10"}]] (منسق).
[[yq -o=json '.app']] ← نفس الـ object بتاع [[app]].
[[yq '.app.port']] ← [[3000]]
[[yq -o=yaml '.address']] ← [[city: القاهرة]] و [[zip: "11511"]]

و [[norway.yaml]]: [[NO]] بتوصل JSON [[false]]، و [[22:22]] بتوصل [[1342]]، والتاريخ بيوقّع [[json.dumps]] إلا مع [[default=str]].`
        },
        {
          cmd: "CSV إلى JSON",
          title: "تحوّل CSV لـ JSON والعكس إزاي، ومن غير ما الـ BOM والتنصيص يبوّظوا الداتا؟",
          desc: R`CSV جدول مسطح (صفوف بنفس الأعمدة) و JSON بيقبل أي شكل. التحويل الطبيعي: كل صف يبقى object، والمفاتيح من الـ header: [[[{"id": "1", "name": "سارة"}, ...]]]. ده اللي هتحتاجه لما عميل يبعتلك Excel وانت عايز تعمله import في قاعدة البيانات أو API.

الأدوات:
• Python: [[csv.DictReader]] بيعمل كل صف dict بالمفاتيح من أول سطر، وبيفهم التنصيص و [[""]] صح (درس [[.csv]]). وبعدين [[json.dumps]].
• [[jq]] للعكس (JSON لـ CSV): [[jq -r '.[] | [.id, .name] | @csv' file.json]]. الـ [[@csv]] بيعمل التنصيص صح لوحده.
• Miller ([[mlr --icsv --ojson cat file.csv]]): أداة مخصوص للتحويل بين CSV و TSV و JSON.
• في JS: [[papaparse]] أو [[csv-parse]] (متكتبش parser بنفسك في production).
• Excel نفسه أو Google Sheets: File ثم Download ثم CSV.

مشاكل لازم تاخد بالك منها:
• الـ BOM: ملف Excel محفوظ «CSV UTF-8» بيبدأ بـ BOM، فأول مفتاح بيبقى [["﻿id"]] مش [["id"]] وكل [[row["id"]]] يرجع فاضي. الحل في Python: [[encoding="utf-8-sig"]].
• الأنواع: CSV مفيهوش أنواع، فكل القيم بتطلع نصوص ([["1"]] مش [[1]]). حوّل الأعمدة اللي محتاجها بنفسك، ومتحوّلش التليفونات والأكواد لأرقام (الصفر هيضيع).
• القيم الفاضية: [[""]] ولا [[null]]؟ قرر وكون ثابت.
• الفاصل: ملفات Excel من بلاد بتستخدم الفاصلة في الكسور بتطلع بـ [[;]]. و [[csv.Sniffer]] في Python بيخمّن.
• الترميز: ملف قديم Windows-1256 لازم يتحوّل الأول ([[iconv]]، درس UTF-8).
• الحجم: ملف بملايين الصفوف متحمّلوش كله في الذاكرة: اقراه صف صف (DictReader بيعمل كده) واكتب JSON Lines (درس [[.jsonl]]).`,
          example: R`python3 -c 'import csv, json; print(json.dumps(list(csv.DictReader(open("excel.csv", encoding="utf-8-sig"))), ensure_ascii=False, indent=2))' > customers.json
head -8 customers.json
python3 -c 'import csv; print(list(csv.DictReader(open("excel.csv", encoding="utf-8")))[0].keys())'
jq 'map(select(.city == "الجيزة")) | length' customers.json
jq -r '.[] | [.id, .name, .city] | @csv' customers.json`,
          try: R`استخدم [[customers.csv]] و [[excel.csv]] (النسخة اللي بالـ BOM) من درس [[.csv]] ونفّذ المثال. قارن السطر التالت بـ [[utf-8]] و [[utf-8-sig]]. بعدين عدّل الكود يحوّل [[id]] لرقم ويسيب [[phone]] نص. وآخر حاجة حل التمرين: parser كامل يحوّل نص CSV لـ array من objects.`,
          deep: {
            why: R`الداتا في الشركات عايشة في Excel، والبرامج عايزة JSON. التحويل ده بيحصل كل يوم، وأغلب الـ bugs فيه مش في الكود نفسه، في التفاصيل: BOM، وتنصيص، وأصفار بتضيع، وفواصل مختلفة.`,
            how: R`[[DictReader]] بيقرا أول صف كأسامي، وبعدين لكل صف بيعمل [[zip]] بين الأسامي والقيم. لو الصف فيه قيم أكتر أو أقل بيحط [[None]] أو مفتاح [[None]]. و [[@csv]] في jq بيحط كل قيمة نصية بين [["]] ويضاعف أي [["]] جواها، والأرقام من غير تنصيص.`,
            when: R`import من Excel أو Google Sheets لقاعدة البيانات، و export لتقارير، و seed داتا للتجربة.`,
            mistakes: R`تنسى [[utf-8-sig]] فأول عمود يختفي من غير أي error. تحوّل كل الأعمدة لأرقام فـ [["01012345678"]] تبقى [[1012345678]]. تقسم بـ [[split(",")]]. وتفتح الـ CSV الناتج في Excel من غير BOM فالعربي يبوظ (درس [[.csv]]).`
          },
          teach: R`## الفكرة في سطرين

المثال بياخد [[excel.csv]] (نسخة فيها BOM من درس [[.csv]]) ويحوّله JSON: كل صف بيبقى object، والمفاتيح من أول سطر (الـ header). وبعدين يوريك إزاي الـ BOM بيخرب أول عمود لو متعاملتش معاه، ويرجّع من JSON لـ CSV بـ [[jq]].

الأوامر اتشغّلت على أوبونتو 24.04 (جوه Docker، Python 3.12 و jq 1.7)، وجزء منها على ويندوز بـ Python 3.14 و PowerShell. اشتغل في فولدر فيه [[excel.csv]].

---

## ١. CSV لـ JSON: السطر الأساسي

~~~bash
python3 -c 'import csv, json; print(json.dumps(list(csv.DictReader(open("excel.csv", encoding="utf-8-sig"))), ensure_ascii=False, indent=2))' > customers.json
~~~

نفكّه من جوه لبرة:

### [[open("excel.csv", encoding="utf-8-sig")]]

يفتح الملف. [[encoding="utf-8-sig"]] هي السر: يعني «UTF-8 ومعاها signature»، فلو الملف بادئ بـ BOM بيشيله. (BOM = Byte Order Mark، تلات bytes [[EF BB BF]] بيحطها Excel في أول الملف. درس UTF-8.)

### [[csv.DictReader(...)]]

[[DictReader]] بيقرا CSV ويعمل كل صف [[dict]] (object) بالمفاتيح من أول سطر. وبيفهم التنصيص والفواصل جوه الـ quotes صح (مش بيقسم بـ [[split(",")]]). Dict = dictionary = الـ object في Python.

### [[list(...)]]

[[DictReader]] بيطلّع صف ورا صف. [[list]] بيجمعهم كلهم في قايمة.

### [[json.dumps(..., ensure_ascii=False, indent=2)]]

يحوّلهم JSON نص: [[ensure_ascii=False]] للعربي، و [[indent=2]] للتنسيق. و [[> customers.json]] يحفظ.

~~~text head -8 customers.json
[
  {
    "id": "1",
    "name": "سارة أحمد",
    "city": "القاهرة",
    "phone": "01012345678",
    "notes": "عميلة جديدة"
  },
~~~

لاحظ: كل القيم **نصوص** (بين quotes)، حتى [[id]] و [[phone]]. ليه؟ لأن CSV مفيهوش أنواع أصلًا، كل حاجة فيه نص. لو عايز [[id]] رقم، حوّله بنفسك بـ [[int(row["id"])]]. ومتحوّلش [[phone]] لرقم أبدًا: [["01012345678"]] هتبقى [[1012345678]] والصفر الأول يضيع.

---

## ٢. ليه [[utf-8-sig]] مهمة: نشوف الفرق

~~~bash
python3 -c 'import csv; print(list(csv.DictReader(open("excel.csv", encoding="utf-8")))[0].keys())'
~~~

هنا قرينا بـ [[utf-8]] العادية (من غير [[-sig]]):

~~~text الناتج
dict_keys(['﻿id', 'name', 'city', 'phone', 'notes'])
~~~

اسم أول مفتاح بقى [['﻿id']] مش [['id']]: الـ BOM ([[﻿]]) اتعجن في أول المفتاح! يعني [[row["id"]]] هيرجع [[None]] لأن المفتاح الحقيقي اسمه [[﻿id]]، والعمود كأنه اختفى من غير أي error. بـ [[utf-8-sig]] المفتاح بيطلع [['id']] نضيف.

على ويندوز PowerShell فيه [[Import-Csv]] جاهز بيعمل نفس الحاجة ويتعامل مع الـ BOM لوحده:

~~~powershell
Import-Csv excel.csv | ConvertTo-Json
~~~

جرّبناه في PowerShell 7 و 5.1، وطلّع نفس الصفوف صح، والعربي سليم، وأول مفتاح [[id]] نضيف.

---

## ٣. فلترة على الـ JSON بـ [[jq]]

~~~bash
jq 'map(select(.city == "الجيزة")) | length' customers.json
~~~

- [[jq]]: أداة معالجة JSON من الترمنال.
- [[map(...)]]: اعمل العملية دي على كل عنصر في الـ array.
- [[select(.city == "الجيزة")]]: سيب الصفوف اللي مدينتها الجيزة بس.
- [[| length]]: وبعدين عدّهم.

~~~text الناتج
1
~~~

يعني عميل واحد في الجيزة (Ali, Jr.).

---

## ٤. العكس: JSON لـ CSV بـ [[jq]]

~~~bash
jq -r '.[] | [.id, .name, .city] | @csv' customers.json
~~~

- [[-r]]: raw، اطبع النص من غير quotes حوالين السطر كله.
- [[.[]]]: فك الـ array لعناصر، واحد ورا التاني.
- [[[.id, .name, .city]]]: من كل عنصر اعمل array صغير بالتلات قيم دول.
- [[@csv]]: حوّل الـ array لسطر CSV، والتنصيص بيتعمل لوحده صح.

~~~text الناتج
"1","سارة أحمد","القاهرة"
"2","Ali, Jr.","الجيزة"
"3","منى","الإسكندرية"
~~~

شوف [[Ali, Jr.]]: فيه فاصلة جواه، و [[@csv]] حطّه بين quotes لوحده فالفاصلة دي مبقتش فاصل أعمدة. ده اللي بيفرّق أداة صح عن [[split(",")]] اليدوي.

---

## عن التمرين

التمرين بيطلب منك تكتب الـ parser بنفسك (في JS). ده أصعب مما يبدو، فكّر في:
- **الفاصلة جوه التنصيص**: [["Ali, Jr."]] قيمة واحدة مش اتنين.
- **التنصيص المضاعف** [[""]] جوه الـ quotes معناه علامة تنصيص واحدة في القيمة.
- **الـ BOM** في أول أول الملف لازم يتشال من اسم أول مفتاح.
- **نهايات سطور ويندوز** [[\r\n]].
- **السطر الفاضي في الآخر** يتجاهل.

في الشغل الحقيقي استخدم مكتبة جاهزة ([[papaparse]] أو [[csv-parse]])، بس التمرين ده عشان تفهم إيه اللي بيحصل جواها.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[csv.DictReader(open(f, encoding="utf-8-sig"))]] | كل صف object، والـ BOM يتشال |
| [[json.dumps(list(...), ensure_ascii=False)]] | يطلّعهم JSON |
| [[Import-Csv]] | نفس الحاجة على ويندوز |
| [[jq 'map(select(...))']] | فلترة على الـ JSON |
| [[jq -r '.[] | [...] | @csv']] | يرجّع CSV بتنصيص صح |

~~~text خلي بالك من
utf-8-sig       عشان الـ BOM ميخربش أول عمود
كله نص           CSV مفيهوش أنواع، حوّل اللي محتاجه بنفسك
التليفونات        سيبها نص، الصفر بيضيع لو بقت رقم
@csv / مكتبة      متقسمش بـ split(",")
~~~`,
          lines: [
            R`CSV لـ JSON: كل صف object، و [[utf-8-sig]] بيشيل الـ BOM.`,
            R`أول object.`,
            R`من غير [[-sig]]: اسم أول عمود فيه BOM.`,
            R`فلترة على الـ JSON بـ jq: كام عميل في الجيزة.`,
            R`العكس: JSON لـ CSV، و [[@csv]] بيعمل التنصيص صح.`
          ],
          sol: R`الناتج الحقيقي:
[[[]]
[[  {]]
[[    "id": "1",]]
[[    "name": "سارة أحمد",]]
[[    "city": "القاهرة",]]
[[    "phone": "01012345678",]]
[[    "notes": "عميلة جديدة"]]
[[dict_keys(['﻿id', 'name', 'city', 'phone', 'notes'])]] (شايف الـ [[﻿]]؟)
[[1]]
[["1","سارة أحمد","القاهرة"]]
[["2","Ali, Jr.","الجيزة"]]
[["3","منى","الإسكندرية"]]
لاحظ إن [[Ali, Jr.]] اتنصّصت صح، وإن [[id]] نص لأن CSV مفيهوش أرقام.`,
          check: {
            lang: "js",
            starter: R`// csvToObjects: حوّل نص CSV كامل لـ array من objects (المفاتيح من أول سطر)
// لازم: التنصيص و "" ، والـ BOM في أول الملف، ونهايات سطور \r\n، وتجاهل السطر الفاضي في الآخر
// كل القيم تفضل نصوص
function csvToObjects(text) {
  const [header, ...rows] = text.split("\n");
  const keys = header.split(",");
  return rows.map((row) => Object.fromEntries(row.split(",").map((v, i) => [keys[i], v])));
}`,
            tests: R`test("ملف بسيط", () => expect(csvToObjects("id,name\n1,سارة\n2,علي")).toEqual([{ id: "1", name: "سارة" }, { id: "2", name: "علي" }]));
test("السطر الفاضي في الآخر يتجاهل", () => expect(csvToObjects("id,name\n1,سارة\n").length).toBe(1));
test("فاصلة و \"\" جوه التنصيص", () => expect(csvToObjects('id,name,notes\n2,"Ali, Jr.","قال ""شكرًا"""')).toEqual([{ id: "2", name: "Ali, Jr.", notes: 'قال "شكرًا"' }]));
test("BOM في أول الملف ميدخلش في اسم أول مفتاح", () => expect(Object.keys(csvToObjects("﻿id,name\n1,x")[0])).toEqual(["id", "name"]));
test("نهايات سطور ويندوز", () => expect(csvToObjects("id,city\r\n1,القاهرة\r\n")).toEqual([{ id: "1", city: "القاهرة" }]));
test("قيم فاضية تفضل \"\"", () => expect(csvToObjects("a,b,c\n1,,\n")).toEqual([{ a: "1", b: "", c: "" }]));`,
            solution: R`function csvToObjects(text) {
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  const parseLine = (line) => {
    const out = [];
    let cur = "", q = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (q) {
        if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; }
        else if (ch === '"') q = false;
        else cur += ch;
      } else if (ch === '"') q = true;
      else if (ch === ",") { out.push(cur); cur = ""; }
      else cur += ch;
    }
    out.push(cur);
    return out;
  };
  const lines = text.split(/\r?\n/).filter((l) => l !== "");
  const keys = parseLine(lines[0]);
  return lines.slice(1).map((l) => {
    const vals = parseLine(l);
    return Object.fromEntries(keys.map((k, i) => [k, vals[i] ?? ""]));
  });
}`
          }
        },
        {
          cmd: "قراءة XML",
          title: "تقرا XML وتطلّع منه داتا من الكود إزاي (Python و PowerShell و XPath و JS)؟",
          desc: R`لما تستلم XML (فاتورة من نظام قديم، RSS، sitemap، [[pom.xml]]، رد SOAP) وعايز تطلّع منه داتا، متستخدمش regex ولا [[split]]. استخدم parser بيبني الشجرة.

Python ([[xml.etree.ElementTree]]، جاي مع Python):
• [[root = ET.parse("order.xml").getroot()]]: الـ root.
• [[root.get("id")]]: attribute (بيرجع نص دايمًا، حوّله بـ [[int()]]).
• [[root.findtext("customer/name")]]: نص element بمسار.
• [[root.find("x")]] أول واحد، و [[root.findall("items/item")]] الكل، و [[root.iter("item")]] في أي عمق.
• مع namespaces: [[root.find("a:title", {"a": "http://..."})]] (درس xmlns).
• للملفات اللي جاية من بره (يوزرز، النت): [[defusedxml]] بدل ET، عشان هجمات زي XXE و «billion laughs».

PowerShell (ويندوز، وكمان pwsh على لينكس والماك): [[[xml]]] بيحوّل النص لـ object وتمشي فيه بالنقط:
• [[[xml]$o = Get-Content order.xml -Raw -Encoding utf8]]
• [[$o.order.customer.name]] و [[$o.order.id]] (الـ attribute والـ element بنفس الطريقة).
• [[$o.order.items.item]] ليستة لو متكرر.
• [[$o.order.total.InnerText]] لو العنصر عليه attributes ونص مع بعض.

XPath من الترمنال: [[xmllint --xpath 'string(/order/customer/name)' order.xml]]، و [[//item/@sku]] كل الـ sku، و [[sum(//item/@price)]] و [[count(//item)]].

JavaScript:
• المتصفح: [[new DOMParser().parseFromString(text, "application/xml")]] وبعدين [[querySelector]] زي HTML.
• Node: مفيش parser جاهز، استخدم [[fast-xml-parser]] (بيحوّله object على طول) أو [[xml2js]].

وفي الآخر غالبًا بتحوّل اللي طلّعته لـ JSON عشان باقي الكود.`,
          example: R`python3 -c 'import xml.etree.ElementTree as ET; r = ET.parse("order.xml").getroot(); print(r.get("id"), r.findtext("customer/name"), [i.get("sku") for i in r.iter("item")])'
pwsh -c '[xml]$o = Get-Content order.xml -Raw -Encoding utf8; $o.order.customer.name; $o.order.total.currency'
xmllint --xpath 'count(//item)' order.xml
xmllint --xpath 'sum(//item/@price)' order.xml`,
          try: R`على [[order.xml]] من درس [[.xml]] نفّذ المثال (PowerShell على ويندوز اكتب [[powershell]] أو [[pwsh]]). بعدين اكتب سكربت Python بيحوّل الطلب كله لـ JSON: [[{"id": 1024, "customer": "...", "items": [{"sku": ..., "qty": ..., "price": ...}], "total": 620}]] (الأرقام أرقام مش نصوص). وفي المتصفح جرّب [[new DOMParser().parseFromString("<a><b>hi</b></a>", "application/xml").querySelector("b").textContent]] في الـ Console.`,
          deep: {
            why: R`XML ليه قواعد كتير (entities و CDATA و namespaces و comments)، و regex مبيفهمش أي حاجة فيهم فبيكسر أول ما الملف يتغير شوية. الـ parser بيتعامل مع كل ده ويديك شجرة نضيفة.`,
            how: R`ET بيقرا الملف كله ويبني شجرة من objects ([[Element]])، كل واحد فيه [[tag]] و [[attrib]] و [[text]] و children. و [[find]] بيقبل مسارات بسيطة (subset من XPath). و PowerShell بيستخدم [[System.Xml.XmlDocument]] بتاع .NET ويعرض العناصر كخصائص، عشان كده [[$o.order.customer.name]] شغالة.`,
            when: R`استيراد داتا من أنظمة قديمة، وقراية RSS و sitemaps، وتعديل [[pom.xml]] أو [[.csproj]] أو [[AndroidManifest.xml]] من سكربت (رفع رقم النسخة في CI مثلًا).`,
            mistakes: R`regex على XML. تنسى إن [[get()]] و [[findtext()]] بيرجعوا نص فتجمع [["2" + "1"]]. تنسى الـ namespace فكل [[find]] يرجع [[None]]. وتقرا XML من يوزرز بـ ET العادي (XXE).`
          },
          teach: R`## الفكرة في سطرين

المثال بياخد [[order.xml]] (درس [[.xml]]) ويطلّع منه داتا بأربع طرق: Python ([[ElementTree]])، و PowerShell ([[[xml]]])، و XPath من الترمنال ([[xmllint]]). الفكرة الواحدة في كلهم: الـ parser بيبني **شجرة** من الملف، وانت بتمشي في الشجرة بمسار بدل ما تدوّر في النص بـ regex.

الـ XML ده:

~~~xml order.xml
<order id="1024" status="paid">
  <customer>
    <name>سارة أحمد</name>
    <email>sara@example.com</email>
  </customer>
  <items>
    <item sku="TSH-01" qty="2" price="250"/>
    <item sku="MUG-07" qty="1" price="120"/>
  </items>
  <total currency="EGP">620</total>
</order>
~~~

فيه نوعين معلومات: **element** (تاج زي [[<name>سارة أحمد</name>]])، و **attribute** (جوه فتحة التاج زي [[id="1024"]] و [[sku="TSH-01"]]). الفرق ده مهم عشان كل أداة بتوصلهم بطريقة مختلفة.

الأوامر اتشغّلت على ويندوز بـ Python 3.14 و PowerShell 7. جزء الـ XPath اتأكدنا منه بمحرك libxml2 (نفس محرك [[xmllint]]) على نفس الملف.

---

## ١. Python: [[ElementTree]]

~~~bash
python3 -c 'import xml.etree.ElementTree as ET; r = ET.parse("order.xml").getroot(); print(r.get("id"), r.findtext("customer/name"), [i.get("sku") for i in r.iter("item")])'
~~~

- [[import xml.etree.ElementTree as ET]]: المكتبة (جاية مع Python)، وسمّيناها [[ET]] اختصار.
- [[ET.parse("order.xml")]]: اقرا الملف وابني الشجرة.
- [[.getroot()]]: هات العنصر الجذر ([[<order>]]). سمّيناه [[r]].
- [[r.get("id")]]: هات **attribute** اسمه [[id]] من [[<order>]]. بيرجع نص دايمًا.
- [[r.findtext("customer/name")]]: هات **نص element** بمسار: ادخل [[customer]] وبعدها [[name]]، وهات النص اللي جواها.
- [[[i.get("sku") for i in r.iter("item")]]]: [[r.iter("item")]] بيلف على **كل** عنصر [[<item>]] في أي عمق، وبنجمع الـ [[sku]] بتاع كل واحد في list.

~~~text الناتج
1024 سارة أحمد ['TSH-01', 'MUG-07']
~~~

> [[get]] للـ attributes و [[findtext]] للنصوص، والاتنين بيرجعوا **نص**. فلو جمعت [[r.get("qty")]] مع رقم، لازم [[int(...)]] الأول، وإلا [["2" + "1"]] تبقى [["21"]].

فيه كمان [[r.find("x")]] (أول عنصر بالاسم ده) و [[r.findall("items/item")]] (كل العناصر في المسار ده).

---

## ٢. PowerShell: [[[xml]]]

~~~powershell
[xml]$o = Get-Content order.xml -Raw -Encoding utf8
$o.order.customer.name
$o.order.total.currency
~~~

- [[Get-Content order.xml -Raw -Encoding utf8]]: اقرا الملف كله نص واحد ([[-Raw]]) بترميز UTF-8.
- [[[xml]$o = ...]]: [[[xml]]] بتقول لـ PowerShell «حوّل النص ده لشجرة XML». بعدها [[$o]] بقى object تمشي فيه بالنقط.
- [[$o.order.customer.name]]: ادخل [[order]] ثم [[customer]] ثم [[name]]. لاحظ إن الـ element والـ attribute بنفس الطريقة بالنقطة.
- [[$o.order.total.currency]]: [[currency]] هنا **attribute** على [[<total>]]، وبرضه بالنقطة.

~~~text الناتج
سارة أحمد
EGP
~~~

ولو العنصر متكرر (زي [[item]])، بترجع ليستة تلف عليها:

~~~powershell
$o.order.items.item | ForEach-Object { "{0} x{1} = {2}" -f $_.sku, $_.qty, ([int]$_.qty * [int]$_.price) }
~~~

- [[$o.order.items.item]]: ليستة الـ [[<item>]].
- [[ForEach-Object { ... }]]: نفّذ ده لكل عنصر، و [[$_]] هو العنصر الحالي.
- [["{0} x{1} = {2}" -f ...]]: [[-f]] بيحط القيم مكان [[{0}]] و [[{1}]] و [[{2}]].
- [[[int]$_.qty * [int]$_.price]]: حوّل النص لرقم الأول (زي [[int()]] في Python) وبعدين اضرب.

~~~text الناتج
TSH-01 x2 = 500
MUG-07 x1 = 120
~~~

> لو العنصر عليه attributes **ونص مع بعض**، [[$o.order.total]] هترجع الـ object مش النص؛ استخدم [[$o.order.total.InnerText]] عشان النص (هنا [[620]]).

---

## ٣. XPath من الترمنال: [[xmllint]]

XPath لغة اختيار من XML، زي المسارات بس أقوى.

~~~bash
xmllint --xpath 'count(//item)' order.xml
~~~

- [[--xpath 'تعبير']]: نفّذ تعبير XPath.
- [[//item]]: كل عنصر [[<item>]] في أي مكان في الملف ([[//]] يعني «في أي عمق»).
- [[count(...)]]: عدّهم.

~~~text الناتج
2
~~~

~~~bash
xmllint --xpath 'sum(//item/@price)' order.xml
~~~

- [[//item/@price]]: الـ attribute [[price]] بتاع كل [[<item>]] ([[@]] معناها attribute).
- [[sum(...)]]: اجمعهم.

~~~text الناتج
370
~~~

انتبه: [[370]] هي مجموع **سعر الوحدة** (250 + 120)، مش إجمالي الفاتورة (620 اللي في [[<total>]]). XPath جمع الـ attributes زي ما طلبنا بالظبط. وفيه كمان [[//item/@sku]] (كل الـ sku) و [[string(/order/customer/name)]] (نص بمسار من الجذر).

> [[xmllint]] بييجي مع الماك، وعلى أوبونتو من حزمة [[libxml2-utils]]، وعلى ويندوز مش موجود جاهز (استخدم Python أو PowerShell، أو Git Bash لو فيه). اللي في الدرس ده اتأكدنا منه بنفس محرك libxml2.

---

## ٤. وفي الآخر: حوّله JSON

غالبًا بتطلّع من XML عشان تكمّل بالـ JSON. سكربت Python:

~~~bash
python3 -c 'import xml.etree.ElementTree as ET, json; r=ET.parse("order.xml").getroot(); o={"id":int(r.get("id")),"customer":r.findtext("customer/name"),"items":[{"sku":i.get("sku"),"qty":int(i.get("qty")),"price":int(i.get("price"))} for i in r.iter("item")],"total":float(r.findtext("total"))}; print(json.dumps(o, ensure_ascii=False))'
~~~

لاحظ [[int(...)]] و [[float(...)]] عشان الأرقام تبقى أرقام مش نصوص:

~~~text الناتج
{"id": 1024, "customer": "سارة أحمد", "items": [{"sku": "TSH-01", "qty": 2, "price": 250}, {"sku": "MUG-07", "qty": 1, "price": 120}], "total": 620.0}
~~~

---

## ليه parser مش regex

XML فيه قواعد كتير: [[&amp;]] بدل [[&]] (entities)، و CDATA لنص فيه رموز، و namespaces، وتعليقات. الـ regex مبيفهمش أي حاجة فيهم، فبيكسر أول ما الملف يتغير شوية. الـ parser بيفهمهم كلهم ويديك شجرة نضيفة.

ولو الـ XML جاي من **بره** (يوزر، النت): استخدم [[defusedxml]] في Python بدل [[ET]]، عشان هجمات زي XXE و «billion laughs» اللي بتستغل الـ entities.

---

## الخلاصة

| عايز | Python | PowerShell | XPath |
|---|---|---|---|
| attribute | [[r.get("id")]] | [[$o.order.id]] | [[//order/@id]] |
| نص element | [[r.findtext("a/b")]] | [[$o.a.b]] | [[string(/a/b)]] |
| كل العناصر | [[r.iter("item")]] | [[$o...item]] (ليستة) | [[//item]] |
| عدّهم | [[len(r.findall(...))]] | [[.Count]] | [[count(//item)]] |

~~~text خلي بالك من
get/findtext بيرجعوا نص   حوّل بـ int()/float() قبل الحساب
XXE                       للملفات من بره: defusedxml
مفيش regex على XML
~~~`,
          lines: [
            R`Python: attribute ونص بمسار وكل الـ sku.`,
            R`PowerShell: [[[xml]]] بيحوّل الملف object وتمشي فيه بالنقط.`,
            R`XPath: عدد العناصر.`,
            R`XPath: مجموع attribute في كل العناصر (سعر الوحدة مش الإجمالي).`
          ],
          sol: R`الناتج الحقيقي:
[[1024 سارة أحمد ['TSH-01', 'MUG-07']]]
[[سارة أحمد]]
[[EGP]]
[[2]]
[[370]]

وسكربت التحويل لـ JSON بيطلّع:
[[{"id": 1024, "customer": "سارة أحمد", "items": [{"sku": "TSH-01", "qty": 2, "price": 250}, {"sku": "MUG-07", "qty": 1, "price": 120}], "total": 620.0}]]
وفي PowerShell كمان: [[$o.order.items.item | ForEach-Object { "{0} x{1} = {2}" -f $_.sku, $_.qty, ([int]$_.qty * [int]$_.price) }]] بيطبع [[TSH-01 x2 = 500]] و [[MUG-07 x1 = 120]].`
        },
        {
          cmd: "JSON Schema",
          title: "تتأكد إن JSON مش بس سليم، لأ كمان شكله صح (المفاتيح والأنواع) إزاي؟",
          desc: R`[[jq empty]] بيقولك الـ JSON مكتوب صح (syntax). بس مش بيقولك إن [["id"]] رقم، ولا إن [["email"]] موجود، ولا إن [["roles"]] قيمها من ليستة معيّنة. ده شغل JSON Schema: ملف JSON بيوصف شكل JSON تاني، وأداة بتقارن.

أهم الكلمات في الـ schema:
• [["$schema"]]: نسخة المعيار (2020-12 هي الأحدث).
• [["type"]]: [["object"]] و [["array"]] و [["string"]] و [["number"]] و [["integer"]] و [["boolean"]] و [["null"]].
• [["properties"]]: لكل مفتاح الـ schema بتاعه.
• [["required"]]: المفاتيح الإجبارية.
• [["additionalProperties": false]]: ممنوع مفاتيح مش مذكورة (بيمسك الأخطاء الإملائية في أسامي المفاتيح).
• قيود: [["minimum"]] و [["maximum"]] للأرقام، و [["minLength"]] و [["pattern"]] (regex) و [["format": "email"]] للنصوص، و [["enum"]] ليستة قيم مسموحة، و [["items"]] شكل كل عنصر في array.

فين بتستخدمه:
• VS Code: لو أول مفتاح في الـ JSON [["$schema": "..."]]، أو الملف اسمه معروف ([[package.json]] و [[tsconfig.json]] و [[compose.yaml]] و GitHub workflows)، المحرر بيجيب الـ schema من SchemaStore ويكمّلك المفاتيح ويعلّم على الغلط. ده اللي بيخليك تشوف خط أحمر لو كتبت [["scripts": 5]] في package.json.
• الـ APIs: تتأكد من الـ body اللي جايلك ([[ajv]] في Node، و Fastify بيستخدمه جوه). و OpenAPI بيوصف الـ API كله بـ JSON Schema.
• ملفات إعدادات أداتك.
• في TypeScript: [[zod]] بيعمل نفس الفكرة بكود، وممكن يطلّع JSON Schema.

الأدوات: [[ajv-cli]] ([[npx ajv-cli validate]]) و [[check-jsonschema]] (Python) و [[jsonschema]] (مكتبة Python).`,
          example: R`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "User",
  "type": "object",
  "required": ["id", "name", "email"],
  "properties": {
    "id": { "type": "integer", "minimum": 1 },
    "name": { "type": "string", "minLength": 2 },
    "email": { "type": "string", "format": "email" },
    "active": { "type": "boolean" },
    "roles": { "type": "array", "items": { "enum": ["admin", "editor", "member"] } }
  },
  "additionalProperties": true
}`,
          flag: "script",
          try: R`احفظ المثال في [[user.schema.json]]، واعمل [[bad-user.json]] فيه [[{"id": "42", "name": "S", "roles": ["owner"]}]]. اتحقق من الاتنين ([[user.json]] من درس [[.json]] والبايظ):
[[npx -p ajv-cli@5 -p ajv-formats@3 ajv validate --spec=draft2020 -c ajv-formats -s user.schema.json -d user.json]]
وللبايظ ضيف [[--all-errors --errors=text]]. وبعدين في VS Code ضيف [["$schema": "./user.schema.json"]] كأول مفتاح في [[bad-user.json]] وشوف الخطوط الحمرا.`,
          deep: {
            why: R`أغلب الأخطاء الحقيقية مش syntax: مفتاح ناقص، أو رقم جه string، أو قيمة مش مسموحة. من غير schema بتكتشفها لما البرنامج يقع في production. الـ schema بيحوّل «الشكل المتوقع» لملف يتفحص أوتوماتيك ويتوثق.`,
            how: R`الـ validator بيمشي على الداتا والـ schema مع بعض: لكل قيمة بيشيك على الـ [[type]] والقيود، ويدخل جوه الـ [[properties]] والـ [[items]]، ويجمع كل مخالفة بمسارها ([[data/roles/0]]). و [[format]] (زي email) مش بيتشيك افتراضيًا في ajv غير لو ضفت [[ajv-formats]].`,
            when: R`تتأكد من body الـ API، وملفات إعدادات معقدة، وداتا جاية من مصدر خارجي، وكمان عشان المحرر يكمّلك وانت بتكتب.`,
            mistakes: R`تفتكر إن [[jq empty]] كفاية. تنسى [["required"]] فالـ schema يعدّي object فاضي. تحط [["additionalProperties": false]] على API عام فأي حقل جديد من العميل يتعمله reject (قرر حسب الحالة). وتكتب [[format]] وتفتكر إنه بيتفحص من غير ajv-formats.`
          },
          teach: R`## الفكرة في سطرين

[[jq empty]] بيقولك الـ JSON **مكتوب** صح (أقواس وفواصل مظبوطة). بس مش بيقولك إن [[id]] رقم ولا إن [[email]] موجود. الـ schema ده ملف JSON بيوصف **شكل** JSON تاني (المفاتيح وأنواعها والإجباري منها)، وأداة بتقارن الاتنين وتقولك المخالفات.

المثال نفسه هو ملف الـ schema. هنفكّه مفتاح مفتاح، وبعدين نشغّله على [[user.json]] السليم وعلى ملف بايظ.

التشغيل اتعمل على ويندوز بـ Node، بأداة [[ajv]] عن طريق [[npx]] (مفيش تسطيب دايم).

---

## الـ schema سطر سطر

~~~json user.schema.json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "User",
  "type": "object",
  "required": ["id", "name", "email"],
  "properties": {
    "id": { "type": "integer", "minimum": 1 },
    "name": { "type": "string", "minLength": 2 },
    "email": { "type": "string", "format": "email" },
    "active": { "type": "boolean" },
    "roles": { "type": "array", "items": { "enum": ["admin", "editor", "member"] } }
  },
  "additionalProperties": true
}
~~~

| المفتاح | معناه |
|---|---|
| [["$schema"]] | نسخة معيار JSON Schema اللي بنكتب بيها. [[2020-12]] هي الأحدث |
| [["title"]] | اسم للتوثيق بس، مبيأثرش على الفحص |
| [["type": "object"]] | الداتا لازم تبقى object (مش array ولا رقم) |
| [["required"]] | المفاتيح اللي **لازم** تكون موجودة: [[id]] و [[name]] و [[email]] |
| [["properties"]] | لكل مفتاح، الوصف بتاعه (تحت) |
| [["additionalProperties": true]] | مسموح مفاتيح زيادة مش مذكورة (زي [[address]] و [[orders]] في [[user.json]]). لو حطيتها [[false]] أي مفتاح زيادة بيبقى غلط |

وجوه [[properties]]:

| المفتاح | القيد |
|---|---|
| [["id": { "type": "integer", "minimum": 1 }]] | رقم صحيح وأكبر من أو يساوي 1. [["42"]] كنص **مش** هيعدّي |
| [["name": { "type": "string", "minLength": 2 }]] | نص حرفين على الأقل |
| [["email": { "type": "string", "format": "email" }]] | نص بصيغة إيميل. [[format]] محتاج إضافة ([[ajv-formats]]) عشان يتفحص فعلًا |
| [["active": { "type": "boolean" }]] | [[true]] أو [[false]] |
| [["roles": { "type": "array", "items": { "enum": [...] } }]] | array، وكل عنصر فيها لازم يكون واحد من التلاتة دول بس ([[enum]] = قايمة قيم مسموحة) |

---

## نفحص الملف السليم

~~~bash
npx -p ajv-cli@5 -p ajv-formats@3 ajv validate --spec=draft2020 -c ajv-formats -s user.schema.json -d user.json
~~~

نفك الأمر:

| الحتة | معناها |
|---|---|
| [[npx]] | يشغّل أداة من npm من غير تسطيب دايم |
| [[-p ajv-cli@5 -p ajv-formats@3]] | نزّل الحزمتين دول مؤقتًا: الأداة، وإضافة الـ [[format]] |
| [[ajv validate]] | الأمر: افحص |
| [[--spec=draft2020]] | استخدم معيار 2020-12 (زي ما في [[$schema]]) |
| [[-c ajv-formats]] | فعّل إضافة الـ formats (عشان [[email]] يتفحص) |
| [[-s user.schema.json]] | ملف الـ schema |
| [[-d user.json]] | ملف الداتا اللي هنفحصه |

~~~text الناتج
user.json valid
~~~

[[user.json]] فيه مفاتيح زيادة ([[balance]] و [[address]] و [[orders]])، بس عدّى لأن [[additionalProperties: true]].

> أول مرة [[npx]] بيطبع تحذيرات [[npm warn deprecated]] من مكتبات قديمة جوه [[ajv-cli]]، عادي ومش بيأثر.

---

## نفحص ملف بايظ

~~~bash
echo '{"id": "42", "name": "S", "roles": ["owner"]}' > bad-user.json
npx -p ajv-cli@5 -p ajv-formats@3 ajv validate --spec=draft2020 -c ajv-formats -s user.schema.json -d bad-user.json --all-errors --errors=text
~~~

- [[--all-errors]]: اطبع **كل** المخالفات مش أول واحدة بس.
- [[--errors=text]]: اطبعهم نص عادي مقروء.

الملف ده فيه ٤ أغلاط: [[id]] نص مش رقم، [[name]] حرف واحد، [[email]] ناقص خالص، و [[roles]] فيها قيمة مش في الـ enum.

~~~text الناتج
bad-user.json invalid
data must have required property 'email', data/id must be integer, data/name must NOT have fewer than 2 characters, data/roles/0 must be equal to one of the allowed values
~~~

كل غلط ومعاه مساره: [[data/id]] يعني المفتاح [[id]]، و [[data/roles/0]] يعني أول عنصر في [[roles]]. و [[jq empty bad-user.json]] كان هيقول إن الملف **سليم** تمامًا، لأنه مكتوب صح نحويًا. ده الفرق بين «مكتوب صح» و «شكله صح».

---

## فين بتلاقيه شغّال لوحده

- **VS Code**: لو أول مفتاح في الملف [["$schema": "./user.schema.json"]]، أو الملف اسمه معروف ([[package.json]] و [[tsconfig.json]] و GitHub workflows)، المحرر بيجيب الـ schema ويكمّلك المفاتيح ويحط خط أحمر تحت الغلط وانت بتكتب.
- **الـ APIs**: تفحص الـ body الجاي ([[ajv]] في Node، و Fastify بيستخدمه جوه)، و OpenAPI بيوصف الـ API كله بـ JSON Schema.
- **TypeScript**: [[zod]] بيعمل نفس الفكرة بكود وممكن يطلّع JSON Schema.

---

## الخلاصة

~~~text
jq empty          مكتوب صح (نحو) بس
JSON Schema       شكله صح: المفاتيح وأنواعها والإجباري والقيود
required          المفاتيح اللي لازم تكون موجودة
type/minimum/...  القيود على كل قيمة
enum              قيم مسموحة معدودة
format (email)    محتاج ajv-formats عشان يتفحص فعلًا
additionalProperties  false يمنع المفاتيح الزيادة
~~~

ومتخلّيش [[jq empty]] يخدعك: الفحص الحقيقي بيمسك المفتاح الناقص والرقم اللي جه نص **قبل** ما البرنامج يقع في production.`,
          lines: [
            R`[[{]]`,
            R`نسخة المعيار.`,
            R`اسم للتوثيق.`,
            R`الـ JSON لازم يبقى object.`,
            R`المفاتيح الإجبارية.`,
            R`وصف كل مفتاح.`,
            R`[[integer]] وأكبر من صفر: [["42"]] كنص مش هيعدّي.`,
            R`نص حرفين على الأقل.`,
            R`نص بصيغة إيميل (محتاج ajv-formats).`,
            R`boolean.`,
            R`array كل عنصر فيها من التلاتة دول بس.`,
            R`قفل [[properties]].`,
            R`مسموح مفاتيح زيادة (زي [[address]] و [[orders]]).`,
            R`قفل.`
          ],
          sol: R`الناتج الحقيقي:
[[user.json valid]]
[[bad-user.json invalid]]
[[data must have required property 'email', data/id must be integer, data/name must NOT have fewer than 2 characters, data/roles/0 must be equal to one of the allowed values]]
يعني ٤ أخطاء مرة واحدة، و [[jq empty bad-user.json]] كان هيقول إن الملف سليم!

(أول مرة [[npx]] بيطبع تحذيرات [[npm warn deprecated]] من مكتبات قديمة جوه ajv-cli، عادي.)`
        },
        {
          cmd: "xmllint و yamllint",
          title: "تفحص ملفات XML و YAML قبل ما توقّع بيها حاجة (xmllint و XSD و yamllint)؟",
          desc: R`زي [[jq empty]] للـ JSON، فيه أدوات للصيغ التانية، ومستويين فحص: «مكتوب صح» و «شكله صح».

XML ([[xmllint]] من [[libxml2-utils]] على أوبونتو، وجاي مع الماك):
• [[xmllint --noout file.xml]]: well-formed؟ (التاجات مقفولة، root واحد، entities صح). بيسكت لو تمام.
• [[xmllint --format file.xml]]: يرتّب الملف بمسافات (pretty print).
• [[xmllint --noout --schema order.xsd order.xml]]: valid حسب XSD؟ الـ XSD (XML Schema) هو JSON Schema بتاع XML: بيحدد العناصر وترتيبها والـ attributes وأنواعها ([[xs:positiveInteger]] و [[xs:decimal]]). وأنظمة كتير (البنوك، الفواتير الإلكترونية، SOAP) بتديك XSD وتطلب ملفك يعدّي عليه.
• [[xmllint --xpath]]: تطلّع قيم (الدرس اللي فات).

YAML ([[yamllint]]، من [[pip install yamllint]] أو [[sudo apt install yamllint]]):
• [[yamllint file.yaml]]: بيمسك أخطاء الـ syntax، وكمان حاجات الـ parser بيعدّيها ساكت:
  مفاتيح متكررة ([[key-duplicates]]): PyYAML و [[JSON.parse]] بياخدوا آخر قيمة من غير ما يقولوا!
  [[truthy]]: [[yes]] و [[no]] و [[on]] (مشكلة النرويج).
  مسافات في آخر السطر، و indentation مش ثابت، وسطور طويلة.
• الإعدادات في ملف [[.yamllint]] (YAML برضه): [[extends: default]] وبعدين تعدّل أو تقفل قواعد.
• [[-f parsable]]: شكل ناتج سطر واحد لكل مشكلة (للـ CI والمحررات).

وأدوات خاصة لكل نوع ملف بتفهم معناه مش شكله بس: [[docker compose config]] (Compose)، و [[actionlint]] (GitHub Actions)، و [[kubeconform]] (Kubernetes)، و [[nginx -t]]، و [[systemd-analyze verify]]، و [[tsc --showConfig]].

وأحسن مكان لكل ده: خطوة في CI أو pre-commit hook، عشان محدش يعمل merge لملف بايظ.`,
          example: R`xmllint --noout order.xml
xmllint --noout --schema order.xsd order.xml
xmllint --noout --schema order.xsd order-bad.xml
xmllint --format tiny.xml
yamllint compose.yaml
docker compose -f compose.yaml config`,
          try: R`الأدوات في Docker لو مش متسطّبة: [[docker run --rm -v "$PWD":/w -w /w alpine sh -c "apk add libxml2-utils yamllint && xmllint --noout order.xml && yamllint compose.yaml"]]. اعمل [[order-bad.xml]] من [[order.xml]] وغيّر [[qty="2"]] لـ [[qty="two"]]، واعمل [[compose.yaml]] فيه [[restart: no]] ومفتاح [[DEBUG]] مكرر تحت [[environment]] وسطر في آخره مسافات، ونفّذ المثال. (الـ [[order.xsd]] الكامل في الحل.)`,
          deep: {
            why: R`الـ parsers متساهلة في حاجات وصارمة في حاجات: XML بيقع من أول غلط بس مش بيتأكد من المعنى، و YAML بيعدّي مفاتيح مكررة وقيم متخمنة غلط من غير أي كلمة. الـ linters والـ schemas بيمسكوا النوعين قبل ما الملف يوصل لسيرفر.`,
            how: R`[[xmllint]] بيستخدم libxml2: أول خطوة parse (well-formed)، ولو فيه [[--schema]] بيمشي على الشجرة ويقارن كل element و attribute بالتعريف في الـ XSD. و [[yamllint]] بيقرا الملف token token (مش بس الناتج النهائي)، عشان كده يقدر يشوف مفتاح مكرر أو مسافة زيادة رغم إن الـ parser كان هيتجاهلهم.`,
            when: R`في CI لأي repo فيه YAML كتير (Compose و Actions و Kubernetes)، وقبل ما تبعت XML لنظام بيطلب XSD، ولما ملف «شكله سليم» بس البرنامج بيتصرف غريب.`,
            mistakes: R`تفتكر إن «الـ parser قراه» معناها «الملف صح» (المفتاح المكرر بيضيع ساكت). تعمل [[xmllint --format file.xml > file.xml]] فتفضّي الملف (اكتب في ملف تاني). وتشغّل yamllint بالإعدادات الافتراضية على مشروع قديم فيطلعلك مئات التحذيرات وتقفله: ابدأ بـ [[.yamllint]] معقول.`
          },
          teach: R`## الفكرة في سطرين

زي [[jq empty]] للـ JSON، فيه أدوات لـ XML و YAML، ومستويين فحص: «مكتوب صح» (well-formed) و «شكله صح» (valid حسب schema). المثال بيفحص [[order.xml]] على الاتنين بـ [[xmllint]]، وبيفحص [[compose.yaml]] بايظ بـ [[yamllint]]، وبيوريك إن الـ parser العادي بيعدّي أغلاط الـ linters بتمسكها.

التشغيل: [[xmllint]] (libxml2 2.9.14) و [[yamllint]] 1.33 على أوبونتو 24.04 (جوه Docker)، و [[docker compose config]] من Docker على ويندوز، و PyYAML.

---

## المستويين

| المستوى | يعني | الأداة |
|---|---|---|
| well-formed | التاجات مقفولة، root واحد، الرموز صح | [[xmllint --noout]] |
| valid | شكله مطابق لـ schema (العناصر وأنواعها) | [[xmllint --schema]] + XSD |

---

## ١. well-formed؟ [[xmllint --noout order.xml]]

- [[--noout]]: متطبعش الملف، بس قوللي لو فيه غلط.

مبيطبعش حاجة لو الملف تمام. السكوت ده معناه «مظبوط». لو كان فيه تاج مش مقفول، كان هيقولك في أنهي سطر.

---

## ٢. valid حسب XSD؟ [[xmllint --noout --schema order.xsd order.xml]]

الـ **XSD** (XML Schema Definition) هو JSON Schema بتاع XML: ملف بيحدد العناصر وترتيبها، والـ attributes، وأنواعها. وأنظمة كتير (البنوك، الفواتير الإلكترونية، SOAP) بتديك XSD وتطلب ملفك يعدّي عليه.

- [[--schema order.xsd]]: افحص الملف حسب الـ XSD ده.

~~~text الناتج
order.xml validates
~~~

الـ XSD اللي استخدمناه (الكامل في الحل) بيقول مثلًا إن [[qty]] لازم [[xs:positiveInteger]] (رقم صحيح موجب)، و [[price]] لازم [[xs:decimal]].

### ملف بايظ

عملنا [[order-bad.xml]] من [[order.xml]] وغيّرنا [[qty="2"]] لـ [[qty="two"]]:

~~~bash
xmllint --noout --schema order.xsd order-bad.xml
~~~

~~~text الناتج
order-bad.xml:9: element item: Schemas validity error : Element 'item', attribute 'qty': 'two' is not a valid value of the atomic type 'xs:positiveInteger'.
order-bad.xml fails to validate
~~~

قال بالظبط: في السطر 9، الـ attribute [[qty]] قيمته [[two]]، ودي مش رقم صحيح موجب. ده فحص المعنى، مش الشكل بس.

---

## ٣. ترتيب الملف: [[xmllint --format tiny.xml]]

[[--format]] بيرتّب XML مكتوب وحش (pretty print). [[tiny.xml]] محتواه سطر واحد [[<a><b>1</b><c/></a>]]:

~~~text الناتج
<?xml version="1.0"?>
<a>
  <b>1</b>
  <c/>
</a>
~~~

> متعملش [[xmllint --format file.xml > file.xml]] عشان تظبط نفس الملف: الـ [[>]] بيفضّي الملف **قبل** ما [[xmllint]] يقراه، فتخسره. اكتب في ملف تاني.

---

## ٤. فحص YAML: [[yamllint compose.yaml]]

عملنا [[compose.yaml]] فيه ٣ أغلاط مقصودة: [[restart: no]] (قيمة متلخبطة)، ومفتاح [[DEBUG]] مكرر تحت [[environment]]، وسطر في آخره مسافات زيادة.

~~~bash
yamllint compose.yaml
~~~

~~~text الناتج (مع .yamllint بيقفل document-start)
compose.yaml
  6:14      warning  truthy value should be one of [false, true]  (truthy)
  8:17      error    trailing spaces  (trailing-spaces)
  9:7       error    duplication of key "DEBUG" in mapping  (key-duplicates)
~~~

نقرا كل سطر: المكان (سطر:عمود)، النوع (warning/error)، الشرح، واسم القاعدة بين قوسين:

| الغلط | معناه |
|---|---|
| [[truthy]] (6:14) | [[no]] قيمة بتتلخبط (مشكلة النرويج). yamllint عايزها [[false]] أو [[true]] صريحة |
| [[trailing-spaces]] (8:17) | مسافات في آخر السطر، بتعمل مشاكل في git diff وأحيانًا في الـ parse |
| [[key-duplicates]] (9:7) | المفتاح [[DEBUG]] اتكرر. ودي أخطر وحدة (تحت) |

الإعدادات في ملف [[.yamllint]] (YAML برضه): [[extends: default]] وبعدين تعدّل أو تقفل قواعد (قفلنا [[document-start]] عشان ميشتكيش من غياب [[---]] في أول الملف).

---

## ٥. ليه الـ linter مهم: المفتاح المكرر

~~~bash
python3 -c 'import yaml; print(yaml.safe_load(open("compose.yaml"))["services"]["web"]["environment"])'
~~~

~~~text الناتج
{'DEBUG': False}
~~~

PyYAML قرا الملف **عادي من غير أي شكوى**، وأخد آخر قيمة لـ [[DEBUG]] ([[false]]) ورمى الأولى في صمت! نفس الكلام في [[JSON.parse]]. يعني لو كتبت مفتاح مرتين بالغلط، البرنامج هيشتغل بقيمة مش اللي انت شايفها فوق. [[yamllint]] هو اللي مسك ده، مش الـ parser.

و [[docker compose]] نفسه كمان صارم: [[docker compose -f compose.yaml config]] على نفس الملف بيرفض ويقول [[mapping key "DEBUG" already defined at line 8]]. يعني كل أداة ليها صرامتها.

---

## أدوات تانية بتفهم المعنى

كل نوع ملف ليه أداة بتفهم **معناه** مش شكله بس:

~~~text
docker compose config     Compose
actionlint                GitHub Actions
kubeconform               Kubernetes
nginx -t                  إعدادات Nginx
tsc --showConfig          tsconfig.json
~~~

وأحسن مكان لكل ده: خطوة في CI أو pre-commit hook، عشان محدش يعمل merge لملف بايظ.

---

## الخلاصة

| الأمر | بيفحص إيه |
|---|---|
| [[xmllint --noout]] | XML مكتوب صح (well-formed) |
| [[xmllint --noout --schema x.xsd]] | XML شكله صح حسب XSD |
| [[xmllint --format]] | يرتّب XML |
| [[yamllint]] | YAML: truthy، مسافات، **مفاتيح مكررة** |

~~~text الفكرة
الـ parser قراه ≠ الملف صح
المفتاح المكرر بيضيع في صمت
الـ linter بيمسك اللي الـ parser بيعدّيه
حطّه في CI
~~~`,
          lines: [
            R`well-formed؟ مبيطبعش حاجة لو تمام.`,
            R`valid حسب الـ XSD.`,
            R`ملف فيه [[qty="two"]]: بيقول فين وليه.`,
            R`يرتّب XML مكتوب في سطر واحد.`,
            R`يفحص YAML بقواعد [[.yamllint]] لو موجود.`,
            R`Compose نفسه بيرفض المفتاح المكرر.`
          ],
          sol: R`الناتج الحقيقي:
(السطر الأول مبيطبعش حاجة)
[[order.xml validates]]
[[order-bad.xml:9: element item: Schemas validity error : Element 'item', attribute 'qty': 'two' is not a valid value of the atomic type 'xs:positiveInteger'.]]
[[order-bad.xml fails to validate]]
و [[tiny.xml]] ([[<a><b>1</b><c/></a>]]) بقى:
[[<?xml version="1.0"?>]] ثم [[<a>]] ثم [[  <b>1</b>]] ثم [[  <c/>]] ثم [[</a>]]
و yamllint (مع [[.yamllint]] بيقفل document-start):
[[6:14 warning truthy value should be one of [false, true] (truthy)]]
[[8:17 error trailing spaces (trailing-spaces)]]
[[9:7 error duplication of key "DEBUG" in mapping (key-duplicates)]]
و Compose: [[mapping key "DEBUG" already defined at line 8]]. أما PyYAML فقرا الملف عادي وطلّع [[{'DEBUG': False}]] بس!

والـ [[order.xsd]] اللي استخدمناه:`,
          solCode: R`<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="order">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="customer">
          <xs:complexType>
            <xs:sequence>
              <xs:element name="name" type="xs:string"/>
              <xs:element name="email" type="xs:string"/>
            </xs:sequence>
          </xs:complexType>
        </xs:element>
        <xs:element name="items">
          <xs:complexType>
            <xs:sequence>
              <xs:element name="item" maxOccurs="unbounded">
                <xs:complexType>
                  <xs:attribute name="sku" type="xs:string" use="required"/>
                  <xs:attribute name="qty" type="xs:positiveInteger" use="required"/>
                  <xs:attribute name="price" type="xs:decimal" use="required"/>
                </xs:complexType>
              </xs:element>
            </xs:sequence>
          </xs:complexType>
        </xs:element>
        <xs:element name="note" type="xs:string" minOccurs="0"/>
        <xs:element name="total">
          <xs:complexType>
            <xs:simpleContent>
              <xs:extension base="xs:decimal">
                <xs:attribute name="currency" type="xs:string"/>
              </xs:extension>
            </xs:simpleContent>
          </xs:complexType>
        </xs:element>
      </xs:sequence>
      <xs:attribute name="id" type="xs:positiveInteger" use="required"/>
      <xs:attribute name="status" type="xs:string"/>
    </xs:complexType>
  </xs:element>
</xs:schema>`
        },
        {
          cmd: "JSON ولا YAML ولا TOML",
          title: "JSON ولا YAML ولا TOML ولا XML ولا INI: تختار صيغة إيه لملفك؟",
          desc: R`نفس الداتا ممكن تتكتب بأي صيغة من دول (المثال تحت: نفس الإعدادات بالخمسة، والسطور اللي بتبدأ بـ [[#]] في المثال عناوين بس عشان تفرّق بينهم). الفرق في مين هيقرا ومين هيكتب:

• JSON: لما برنامج بيكلّم برنامج (APIs، تخزين، رسايل). كل لغة بتقراه، وقواعده صارمة وبسيطة فمفيش مفاجآت. عيوبه للإنسان: مفيش تعليقات، والتنصيص والـ trailing comma بيوقعوك. (و JSONC لملفات الإعدادات اللي أداتها بتقبله.)
• YAML: ملفات إعدادات كبيرة ومتداخلة الإنسان بيكتبها: CI و Compose و Kubernetes. مقروء جدًا وفيه تعليقات و anchors و نصوص طويلة. عيوبه: المسافات حساسة، ومشكلة النرويج، ومواصفات ضخمة. لو اختارته: نصّص أي قيمة مش واضحة، واستخدم yamllint.
• TOML: ملف إعدادات لمشروع أو أداة، مش متداخل أوي: [[pyproject.toml]] و [[Cargo.toml]]. واضح، وأنواعه صريحة، ومفيش تخمين ولا مسافات حساسة. عيبه: التداخل العميق بيبقى مزعج ([[[a.b.c]]]).
• XML: لما النظام أو المعيار بيطلبه (Android و Maven و .NET و SVG و Office و SOAP والفواتير الإلكترونية). قوي (namespaces و XSD و attributes) بس طويل. متختاروش لحاجة جديدة غير لو مضطر.
• INI و [[.env]]: أبسط إعدادات: مفاتيح وقيم (و INI أقسام). مفيش أنواع ولا lists ولا تداخل. ممتاز لأسرار البيئة ([[.env]]) والإعدادات الصغيرة.
• CSV: جداول بس.

أسئلة تحسم بيها:
• برنامج هيقراه بس؟ JSON.
• إنسان هيعدّله بإيده كتير ومحتاج تعليقات؟ YAML (لو متداخل) أو TOML (لو مسطح شوية).
• الأداة أو اللغة ليها عُرف؟ امشي على العُرف (Python ← pyproject.toml، و Node ← package.json، و Compose ← YAML) حتى لو مش عاجبك.
• أسرار ومتغيرات بيئة؟ [[.env]].
• جداول هتتفتح في Excel؟ CSV.

ومتخترعش صيغة جديدة لمشروعك: أي واحدة من دول ليها parsers و linters و دعم في المحررات.`,
          example: R`# JSON
{"name": "gym-api", "port": 3000, "tags": ["web", "api"], "db": {"host": "localhost"}}
# XML
<app name="gym-api" port="3000"><tag>web</tag><tag>api</tag><db host="localhost"/></app>
# YAML
name: gym-api
port: 3000
tags: [web, api]
db:
  host: localhost
# TOML
name = "gym-api"
port = 3000
tags = ["web", "api"]
[db]
host = "localhost"
# INI (من غير أنواع ولا lists)
[app]
name = gym-api
port = 3000
[db]
host = localhost`,
          flag: "script",
          try: R`حط كل جزء في ملف لوحده ([[config.json]] و [[config.xml]] و [[config.yaml]] و [[config.toml]] و [[config.ini]]) واقرا كل واحد بـ Python وحوّله لـ JSON ([[json.load]] و [[yaml.safe_load]] و [[tomllib.load]] و [[configparser]] و [[ET.parse]])، وقارن النواتج: مين طلّع [[port]] رقم ومين نص؟ ومين معرفش يعمل [[tags]] كـ list؟ وبعدين اختار صيغة لملف إعدادات أداة صغيرة عندك واكتب ليه.`,
          deep: {
            why: R`مفيش صيغة «أحسن» في المطلق. كل واحدة اتعملت لمشكلة: XML للمستندات والمعايير، و JSON لتبادل الداتا، و YAML للإعدادات المقروءة، و TOML للإعدادات الواضحة، و INI لأبسط حالة. اختيار الصيغة الغلط بيعمل مشاكل بتفضل معاك طول عمر المشروع.`,
            how: R`كل الصيغ دي في الآخر بتتقري لنفس الحاجات: objects و lists وقيم. الفرق في: هل الأنواع صريحة (JSON و TOML) ولا متخمنة (YAML) ولا مش موجودة (INI و CSV و XML من غير schema)؟ وهل فيه تعليقات؟ وهل الهيكل بالأقواس ولا بالمسافات ولا بالأقسام؟`,
            when: R`كل ما تعمل ملف إعدادات جديد، أو تصمم API، أو تختار هتصدّر الداتا بإيه.`,
            mistakes: R`YAML لداتا بين برامج (بطيء ومفاجآته كتير). JSON لإعدادات الناس بتعدّلها ومحتاجة تشرح كل قيمة. صيغة مختلفة عن عُرف الأداة («أنا عملت compose بـ JSON»: شغال بس محدش هيفهمه). وتحوّل بين صيغ من غير ما تفكر إيه اللي هيضيع (درس «JSON و YAML»).`
          },
          teach: R`## الفكرة في سطرين

المثال بيكتب **نفس الإعدادات** بخمس صيغ مختلفة، عشان تشوف الفرق بعينك. مفيش صيغة «أحسن»: كل واحدة اتعملت لحالة. والسؤال الحقيقي مش «أنهي أقوى»، لأ «مين هيقرا الملف ومين هيكتبه؟».

السطور اللي بتبدأ بـ [[#]] في المثال **عناوين** عشان تفرّق بين الأجزاء، مش جزء من الملفات. في الآخر لما نقرا كل صيغة بـ Python ونحوّلها لنفس الشكل، هنكتشف فرق مهم: مين بيطلّع الأرقام أرقام ومين نصوص.

التشغيل على أوبونتو 24.04 (جوه Docker، Python 3.12). كل الصيغ اتقرت بمكتبات جاية مع Python ([[json]] و [[yaml]] و [[tomllib]] و [[configparser]] و [[xml]]).

---

## نفس الداتا بالخمسة

الإعدادات: اسم [[gym-api]]، بورت رقم [[3000]]، قايمة [[tags]] فيها [[web]] و [[api]]، و [[db]] جواها [[host]].

### JSON

~~~json
{"name": "gym-api", "port": 3000, "tags": ["web", "api"], "db": {"host": "localhost"}}
~~~

سطر واحد، كل نص بين [["]]، والأنواع واضحة ([[3000]] من غير quotes = رقم). ده شكل **برنامج بيكلّم برنامج**.

### XML

~~~xml
<app name="gym-api" port="3000"><tag>web</tag><tag>api</tag><db host="localhost"/></app>
~~~

attributes ([[name="gym-api"]]) و elements ([[<tag>web</tag>]])، والـ list بتكرار التاج ([[<tag>]] مرتين). وكل القيم **نصوص** (حتى [[port="3000"]])، فمعناها محتاج XSD يحدده.

### YAML

~~~yaml
name: gym-api
port: 3000
tags: [web, api]
db:
  host: localhost
~~~

من غير تنصيص، والهيكل بالمسافات، و [[port: 3000]] اتخمّن رقم. مقروء للإنسان.

### TOML

~~~toml
name = "gym-api"
port = 3000
tags = ["web", "api"]
[db]
host = "localhost"
~~~

النص لازم متنصص، والرقم صريح، و [[[db]]] قسم (table) بدل المسافات. واضح ومفيش تخمين.

### INI

~~~ini
[app]
name = gym-api
port = 3000
[db]
host = localhost
~~~

أبسط حاجة: أقسام ومفاتيح وقيم. مفيش أنواع ولا lists ولا تداخل عميق. (و [[.env]] زيه من غير الأقسام.)

---

## نقرا الخمسة بـ Python ونقارن

~~~bash
python3 -c 'import json; print(json.dumps(json.load(open("config.json"))))'
python3 -c 'import json, yaml; print(json.dumps(yaml.safe_load(open("config.yaml"))))'
python3 -c 'import json, tomllib; print(json.dumps(tomllib.load(open("config.toml", "rb"))))'
~~~

التلاتة دول طلّعوا **نفس الحاجة بالظبط**:

~~~text الناتج (JSON و YAML و TOML)
{"name": "gym-api", "port": 3000, "tags": ["web", "api"], "db": {"host": "localhost"}}
~~~

- [[json.load]] و [[yaml.safe_load]] و [[tomllib.load]] كلهم بيقروا لنفس الـ dict.
- [[tomllib]] (جاي مع Python من نسخة 3.11) بيفتح الملف [["rb"]] (read binary)، ده شرط عنده.
- التلاتة فهموا [[port]] رقم و [[tags]] list و [[db]] object متداخل.

### INI مختلف

~~~bash
python3 -c 'import configparser; c = configparser.ConfigParser(); c.read("config.ini"); print({s: dict(c[s]) for s in c.sections()})'
~~~

~~~text الناتج
{'app': {'name': 'gym-api', 'port': '3000'}, 'db': {'host': 'localhost'}}
~~~

شوف الفرق: [[port]] طلع [['3000']] **نص** مش رقم (INI مفيهوش أنواع)، ومفيش [[tags]] خالص (INI مفيهوش lists). لو عايز رقم لازم [[int(c["app"]["port"])]] بنفسك.

### XML كمان مختلف

~~~bash
python3 -c 'import xml.etree.ElementTree as ET; r = ET.parse("config.xml").getroot(); print("port attr=", repr(r.get("port")), "tags=", [t.text for t in r.findall("tag")], "host=", r.find("db").get("host"))'
~~~

~~~text الناتج
port attr= '3000' tags= ['web', 'api'] host= localhost
~~~

[[port]] نص [['3000']] برضه، والـ [[tags]] محتاجة [[findall("tag")]] عشان متكررة، و [[host]] attribute على [[db]]. يعني XML كمان أنواعه نصوص لحد ما schema يقول غير كده.

---

## مقارنة سريعة

| الصيغة | الأنواع | تعليقات؟ | امتى تختارها |
|---|---|---|---|
| JSON | صريحة | لأ | برنامج بيكلّم برنامج: APIs، تخزين |
| YAML | متخمنة | أيوة | إعدادات كبيرة متداخلة الإنسان بيكتبها: CI، Compose، Kubernetes |
| TOML | صريحة | أيوة | إعداد مشروع مش عميق أوي: pyproject.toml، Cargo.toml |
| XML | نصوص (محتاج XSD) | أيوة | لما المعيار بيطلبه: Android، Maven، SOAP، فواتير |
| INI / .env | مفيش | أحيانًا | أبسط إعداد، وأسرار البيئة |

---

## أسئلة تحسم بيها

- برنامج هيقراه بس؟ **JSON**.
- إنسان هيعدّله بإيده كتير ومحتاج تعليقات؟ **YAML** (لو متداخل) أو **TOML** (لو مسطح شوية).
- الأداة أو اللغة ليها عُرف؟ امشي عليه (Python ← [[pyproject.toml]]، Node ← [[package.json]]، Compose ← YAML) حتى لو مش عاجبك.
- أسرار ومتغيرات بيئة؟ **.env**.
- جداول هتتفتح في Excel؟ **CSV**.

ومتخترعش صيغة جديدة لمشروعك: أي واحدة من دول ليها parsers و linters و دعم في المحررات.

---

## الخلاصة

~~~text
JSON        أنواع صريحة، مفيش تعليقات: بين البرامج
YAML        مقروء وفيه تعليقات، بس مسافات ومفاجآت: إعدادات الناس
TOML        واضح وصريح: إعداد مشروع مسطح
XML         قوي بس طويل: لما المعيار يطلبه
INI/.env    أبسط حاجة: مفاتيح وقيم
~~~

والقاعدة: لو هتقراه بكود ومحتاج أنواع، خُد JSON أو TOML أو YAML. INI و XML بتطلّع نصوص، فلازم تحوّل الأنواع بنفسك.`,
          lines: [
            R`JSON: سطر واحد، كل نص متنصص، والأنواع واضحة.`,
            R`XML: attributes و elements، وكل القيم نصوص (ومعناها محتاج schema)، والـ list بتكرار التاج.`,
            R`YAML: من غير تنصيص.`,
            R`رقم (اتخمّن).`,
            R`list بين [[[ ]]].`,
            R`object متداخل بالمسافات.`,
            R`جوه [[db]].`,
            R`TOML: النص لازم متنصص.`,
            R`رقم صريح.`,
            R`array.`,
            R`table بدل المسافات.`,
            R`جوه [[db]].`,
            R`INI: قسم، لأن مفيش مفاتيح بره الأقسام في أغلب البرامج.`,
            R`كل حاجة نص.`,
            R`حتى ده نص [["3000"]].`,
            R`قسم تاني (ومفيش طريقة رسمية للـ tags).`,
            R`جوه [[db]].`
          ],
          sol: R`النواتج بـ Python:
JSON و YAML و TOML: [[{"name": "gym-api", "port": 3000, "tags": ["web", "api"], "db": {"host": "localhost"}}]] (التلاتة متطابقين بالظبط).
INI: [[{'app': {'name': 'gym-api', 'port': '3000'}, 'db': {'host': 'localhost'}}]]: [[port]] نص، ومفيش [[tags]].
XML: كل حاجة نصوص ([[port]] = [['3000']])، والـ tags محتاجة [[findall("tag")]]، و [[host]] attribute على [[db]].

يعني لو هتقرا الملف بكود ومحتاج أنواع: JSON أو TOML أو YAML (مع التنصيص). ولو INI أو XML: لازم تحوّل الأنواع بنفسك.`
        }
      ]
    }
]);
