// تكملة تاب files: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/files/01.js (شرح حقول الدرس في أوله)
MORE("files", [
    {
      t: "CSV و XML",
      l: 1,
      n: "الجداول في ملف نصي (CSV و TSV) ومشاكلها مع Excel والعربي، و XML بالتفصيل: التاجات والـ attributes والـ entities والـ CDATA والـ namespaces",
      items: [
        {
          cmd: ".csv و .tsv",
          title: "ملف CSV بيتكتب إزاي، وإيه اللي بيحصل لو فيه فاصلة جوه القيمة أو عربي في Excel؟",
          desc: R`CSV (Comma-Separated Values) جدول مكتوب كنص: كل سطر صف، والأعمدة مفصولة بـ [[,]]. أول سطر غالبًا أسامي الأعمدة (header). هو الصيغة اللي Excel و Google Sheets وأي قاعدة بيانات بتعمل منها import و export، فهتقابله في أي شغل فيه داتا أو تقارير.

القواعد (المعيار اسمه RFC 4180، والبرامج مش كلها ملتزمة بيه):
• [[,]] بين كل عمود والتاني، والسطر الجديد بين كل صف والتاني.
• لو القيمة فيها [[,]] أو سطر جديد أو [["]]، لازم تتحط بين [["]]: [["Ali, Jr."]].
• و [["]] جوه قيمة متنصصة بتتكتب مرتين: [["قال ""شكرًا"""]] معناها [[قال "شكرًا"]].
• القيمة الفاضية هي مجرد فاصلتين ورا بعض [[,,]].
• مفيش أنواع: كل حاجة نص. [[01012345678]] و [[true]] و [[2026-10-01]] كلهم نصوص، والبرنامج اللي بيقرا هو اللي بيخمّن. ومفيش تعليقات.

TSV ([[.tsv]]): نفس الفكرة بس الفاصل [[Tab]] بدل الفاصلة. أريح لأن الـ Tab نادر يبقى جوه الداتا، فمحتاجش تنصيص غالبًا، و [[cut -f2]] بيشتغل عليه علطول. ولما تنسخ خلايا من Excel وتلزقها في محرر بتطلع TSV.

مشاكل Excel (وهتقابلها أكيد):
• العربي يظهر ملخبط ([[Ø³Ø§Ø±Ø©]]): Excel على ويندوز بيفترض الترميز القديم. الحل: احفظ الملف UTF-8 with BOM (درس UTF-8)، أو من Excel استخدم [[Data]] ثم [[From Text/CSV]] واختار [[65001: Unicode (UTF-8)]].
• الأصفار في الأول بتطير: [[01012345678]] يبقى [[1012345678]]، والأرقام الطويلة تبقى [[1.01E+10]]. الحل: استورد العمود كـ Text.
• التواريخ والأرقام بتتغير على حسب إعدادات اللغة، وفي بلاد كتير Excel بيستخدم [[;]] كفاصل بدل [[,]] لأن الفاصلة هناك للكسور.
• لو فتحت الملف في Excel وحفظته، كل ده بيتحفظ كده. اشتغل على نسخة.

وأمان: لو اليوزر يقدر يكتب قيمة بتتصدّر في CSV، وكتب حاجة بتبدأ بـ [[=]] (زي [[=HYPERLINK(...)]])، Excel هينفذها كـ formula. اسمها CSV injection، والحل تحط [[']] قبل أي قيمة بتبدأ بـ [[=]] أو [[+]] أو [[-]] أو [[@]].`,
          example: R`id,name,city,phone,notes
1,سارة أحمد,القاهرة,01012345678,عميلة جديدة
2,"Ali, Jr.",الجيزة,01198765432,"قال ""شكرًا"""
3,منى,الإسكندرية,,`,
          flag: "script",
          try: R`احفظ المثال في [[customers.csv]] ونفّذ [[cut -d, -f2 customers.csv]] وشوف الصف التاني اتقسم إزاي. بعدين اقراه صح بـ Python: [[python3 -c 'import csv; [print(r["name"], "|", r["notes"]) for r in csv.DictReader(open("customers.csv"))]']]. لو عندك Excel افتح الملف بدبل كليك وشوف العربي ورقم التليفون، وبعدين اعمل نسخة بـ BOM: [[printf '\xef\xbb\xbf' | cat - customers.csv > excel.csv]] وافتحها. وبعدين حل التمرين.`,
          deep: {
            why: R`CSV أقدم من الكمبيوترات الشخصية، وبيعيش لأنه أبسط حاجة ممكنة: أي برنامج يقدر يكتبه بسطر كود، وأي إنسان يقدر يقراه، وبيتفتح في Excel اللي كل الناس عندها. عشان كده لما مدير يقولك «طلّعلي الداتا دي» يقصد CSV أو Excel.`,
            how: R`القراية الصح مش [[split(",")]]: الـ parser بيمشي حرف حرف، ولو لقى [["]] في أول قيمة بيدخل «وضع التنصيص» ويتجاهل أي [[,]] أو سطر جديد لحد ما يلاقي [["]] لوحدها، و [[""]] جوه الوضع ده يعني [["]] واحدة. عشان كده [[cut -d,]] بوّظ [[Ali, Jr.]] و [[csv.DictReader]] قراه صح. و [[DictReader]] بيستخدم أول سطر كأسامي، فكل صف بيبقى dict.`,
            when: R`export و import بين الأنظمة، وتقارير للناس اللي بتستخدم Excel، وداتا جدولية بسيطة (صفوف بنفس الأعمدة). أما لو الداتا فيها مستويات (طلب جواه منتجات) استخدم JSON.`,
            mistakes: R`تقسم السطر بـ [[split(",")]] في الكود فأول اسم فيه فاصلة يبوّظ الأعمدة: استخدم مكتبة ([[csv]] في Python، و [[papaparse]] أو [[csv-parse]] في JS). تبني CSV بلزق النصوص من غير ما تنصّص القيم. تنسى الـ BOM والعميل يفتحه في Excel يلاقي العربي ملخبط. وتعمل import لرقم تليفون أو كود منتج كرقم فيضيع الصفر.`
          },
          teach: R`## الفكرة: جدول مكتوب كنص عادي

المثال مش أمر، ده **محتوى ملف**. احفظه باسم [[customers.csv]] وهنقراه سطر سطر، وبعدين نشوف ٣ برامج بتقراه: [[cut]] (اللي بيقسم غلط)، و Python و PowerShell (اللي بيقروه صح).

CSV اختصار **Comma-Separated Values**، يعني «قيم مفصولة بفاصلة». مفيش فيه أنواع ولا ألوان ولا خلايا مدموجة: نص بس، وكل سطر صف.

---

## ١. سطر الـ header

~~~text السطر الأول
id,name,city,phone,notes
~~~

أول سطر غالبًا مش داتا، ده **أسامي الأعمدة** (header). هنا ٥ أعمدة، فكل صف بعده لازم يبقى فيه ٥ قيم بالظبط، يعني ٤ فواصل. الـ header مش إجباري في الصيغة، بس من غيره البرنامج اللي بيقرا مش هيعرف كل عمود اسمه إيه.

---

## ٢. صف عادي

~~~text السطر التاني
1,سارة أحمد,القاهرة,01012345678,عميلة جديدة
~~~

| العمود | القيمة |
|---|---|
| [[id]] | [[1]] |
| [[name]] | [[سارة أحمد]] (المسافة جوه القيمة عادي، مش فاصل) |
| [[city]] | [[القاهرة]] |
| [[phone]] | [[01012345678]] |
| [[notes]] | [[عميلة جديدة]] |

رقم التليفون في الملف نص سليم بصفره. المشكلة بتحصل في البرنامج اللي بيقرا: Excel بيشوفه رقم فيشيل الصفر ويبقى [[1012345678]].

---

## ٣. الصف الصعب: فاصلة وعلامة تنصيص جوه القيمة

~~~text السطر التالت
2,"Ali, Jr.",الجيزة,01198765432,"قال ""شكرًا"""
~~~

### [["Ali, Jr."]]

الاسم نفسه فيه فاصلة. لو اتكتب من غير تنصيص، البرنامج هيفتكره عمودين ([[Ali]] و [[Jr.]]) والصف يبقى ٦ أعمدة. عشان كده القيمة اتحطت بين [["]]: أي فاصلة جوه التنصيص جزء من النص.

### [["قال ""شكرًا"""]]

دي أصعب حتة. نفكها من برة لجوه:

| الحتة | معناها |
|---|---|
| أول [["]] | بداية قيمة متنصصة |
| [[قال ]] | نص عادي |
| [[""]] | علامة تنصيص واحدة جوه النص (بتتكتب مرتين عشان متتفهمش نهاية القيمة) |
| [[شكرًا]] | نص عادي |
| [[""]] | علامة تنصيص تانية جوه النص |
| آخر [["]] | نهاية القيمة |

فالقيمة الحقيقية: [[قال "شكرًا"]].

---

## ٤. القيم الفاضية

~~~text السطر الرابع
3,منى,الإسكندرية,,
~~~

بعد [[الإسكندرية]] فيه فاصلتين ورا بعض [[,,]]، يعني قيمة فاضية بينهم (التليفون)، والفاصلة الأخيرة وراها مفيش حاجة، يعني الملاحظات فاضية. الصف لسه ٥ قيم.

---

## ٥. نقراه بـ [[cut]]: القسمة الغبية

[[cut]] أداة لينكس بتقطع كل سطر. [[-d,]] يعني الفاصل (delimiter) هو [[,]]، و [[-f2]] يعني هات الـ field (العمود) رقم ٢. اتشغّل في [[docker run --rm ubuntu:24.04]]:

~~~bash
cut -d, -f2 customers.csv
~~~

~~~text الناتج
name
سارة أحمد
"Ali
منى
~~~

الصف التالت باظ: [[cut]] مبيعرفش التنصيص، فقسم عند أول فاصلة جوه [["Ali, Jr."]]. وده نفس اللي بيحصل لو كتبت [[split(",")]] في أي لغة.

### نفس الكلام مع TSV

لو الملف TSV (الفاصل Tab) فـ [[cut]] بيقسم على الـ Tab من غير [[-d]] أصلًا (الـ Tab هو الافتراضي)، والفاصلة جوه الاسم مبتضرّش:

~~~bash
printf 'id\tname\tcity\n1\tسارة\tالقاهرة\n2\tAli, Jr.\tالجيزة\n' > c.tsv
cut -f2 c.tsv
~~~

~~~text الناتج
name
سارة
Ali, Jr.
~~~

[[printf]] بيكتب النص، و [[\t]] جواه بتبقى Tab حقيقي، و [[\n]] سطر جديد.

---

## ٦. نقراه صح بـ Python

~~~python
import csv
for r in csv.DictReader(open("customers.csv", encoding="utf-8")):
    print(r["name"], "|", r["notes"])
~~~

- [[csv]]: مكتبة جاية مع Python، فيها parser بيفهم التنصيص.
- [[DictReader]]: بيقرا أول سطر كأسامي، وكل صف بعده بيرجع **dict** (قاموس): [[r["name"]]] بدل [[r[1]]].
- [[encoding="utf-8"]]: قوله صراحة إن الملف UTF-8. على ويندوز Python ممكن يفترض ترميز تاني (حسب إعدادات الجهاز) فالعربي يطلع ملخبط. على الجهاز اللي اتجرّب عليه ويندوز متظبط على UTF-8، فاشتغل حتى من غيرها، بس متعتمدش على ده.

اتشغّل بـ Python 3.14 على ويندوز:

~~~text الناتج
سارة أحمد | عميلة جديدة
Ali, Jr. | قال "شكرًا"
منى |
~~~

الاسم سليم، و [[""]] اتحولت لـ [["]] واحدة، والملاحظات بتاعة منى نص فاضي.

---

## ٧. نقراه بـ PowerShell: [[Import-Csv]]

~~~powershell
$rows = Import-Csv customers.csv
$rows | Format-Table
$rows[1].name
$rows[1].phone.GetType().Name
~~~

- [[Import-Csv]]: بيقرا الملف ويرجّع object لكل صف، وأسامي الخانات من الـ header.
- [[$rows]]: متغير شايل الصفوف. [[$rows[1]]] الصف التاني (العد من صفر).
- [[Format-Table]]: اعرضهم جدول.
- [[.GetType().Name]]: نوع القيمة.

~~~text الناتج (pwsh 7.6 و Windows PowerShell 5.1 نفس الكلام)
id name      city       phone       notes
-- ----      ----       -----       -----
1  سارة أحمد القاهرة    01012345678 عميلة جديدة
2  Ali, Jr.  الجيزة     01198765432 قال "شكرًا"
3  منى       الإسكندرية

Ali, Jr.
String
~~~

لاحظ [[String]]: [[Import-Csv]] مبيخمّنش، كل قيمة نص، فالصفر اللي في أول التليفون فضل. ولو العربي طلع ملخبط في Windows PowerShell 5.1 (الملف UTF-8 من غير BOM)، زوّد [[-Encoding UTF8]].

---

## ٨. الـ BOM عشان Excel

~~~bash
printf '\xef\xbb\xbf' | cat - customers.csv > excel.csv
file customers.csv excel.csv
~~~

- [[printf '\xef\xbb\xbf']]: بيكتب ٣ بايتات بالـ hex، ودول الـ BOM (Byte Order Mark): علامة في أول الملف بتقول «أنا UTF-8».
- [[|]]: بيدّي الناتج ده للأمر اللي بعده.
- [[cat - customers.csv]]: الـ [[-]] معناها «اللي جاي من الـ pipe»، فـ [[cat]] بيطبع الـ BOM وبعده الملف.
- [[> excel.csv]]: احفظ الكل في ملف جديد.

~~~text الناتج (ubuntu:24.04)
customers.csv:  CSV Unicode text, UTF-8 text
excel.csv: CSV Unicode text, UTF-8 (with BOM) text
~~~

Excel على ويندوز لما يلاقي الـ BOM بيقرا العربي صح. من غيره غالبًا بيفترض الترميز القديم ويطلّع [[Ø³Ø§Ø±Ø©]]. (Excel نفسه مش متجرّب هنا، ده سلوكه المعروف من وثائق Microsoft.)

---

## ٩. التمرين

التمرين بيطلب parser لسطر واحد. الفكرة اللي محتاجها هي اللي في [[csv]] بالظبط: امشي حرف حرف، وافتكر انت «جوه تنصيص» ولا لأ. الفاصلة بتقسم بس وانت **بره** التنصيص، و [[""]] وانت **جوه** معناها حرف [["]] واحد. والقيمة الأخيرة متنساش تضيفها بعد ما السطر يخلص.

---

## الخلاصة

| الحالة | بتتكتب إزاي |
|---|---|
| قيمة عادية | [[سارة]] |
| فيها فاصلة أو سطر جديد | [["Ali, Jr."]] |
| فيها [["]] | جوه تنصيص و [["]] مرتين: [["قال ""شكرًا"""]] |
| فاضية | [[,,]] |
| الفاصل Tab | TSV ([[.tsv]]) |

ومتقسمش CSV بـ [[split]] أو [[cut]] أبدًا: استخدم مكتبة ([[csv]] في Python، و [[Import-Csv]] في PowerShell).`,
          lines: [
            R`الـ header: أسامي الأعمدة الخمسة مفصولة بـ [[,]].`,
            R`صف عادي. رقم التليفون هنا نص سليم، بس Excel هيشيل الصفر.`,
            R`[["Ali, Jr."]] متنصص عشان فيه فاصلة، و [[""]] جوه التنصيص الأخير معناها [["]] واحدة.`,
            R`[[,,]] يعني التليفون فاضي، والـ [[,]] الأخيرة يعني الملاحظات فاضية.`
          ],
          sol: R`[[cut -d, -f2 customers.csv]] بيطبع:
[[name]]
[[سارة أحمد]]
[["Ali]]
[[منى]]
يعني [[cut]] قسم [["Ali, Jr."]] نصين لأنه مبيفهمش التنصيص.

و Python بيقراه صح:
[[سارة أحمد | عميلة جديدة]]
[[Ali, Jr. | قال "شكرًا"]]
[[منى | ]]

و [[file excel.csv]] بيقول [[CSV Unicode text, UTF-8 (with BOM) text]]. في Excel الملف الأصلي العربي فيه بيظهر ملخبط (على أغلب أجهزة ويندوز) ورقم التليفون من غير صفر، والنسخة اللي بالـ BOM العربي فيها سليم (الصفر لسه هيطير إلا لو استوردت العمود Text).`,
          check: {
            lang: "js",
            starter: R`// قسّم سطر CSV واحد لقيم، مع احترام التنصيص:
// "Ali, Jr." قيمة واحدة، و "" جوه التنصيص معناها "
function parseCsvLine(line) {
  return line.split(",");
}`,
            tests: R`test("سطر بسيط", () => expect(parseCsvLine("1,سارة,القاهرة")).toEqual(["1", "سارة", "القاهرة"]));
test("فاصلة جوه تنصيص", () => expect(parseCsvLine('2,"Ali, Jr.",الجيزة')).toEqual(["2", "Ali, Jr.", "الجيزة"]));
test("\"\" جوه التنصيص ← \"", () => expect(parseCsvLine('3,"قال ""شكرًا"""')).toEqual(["3", 'قال "شكرًا"']));
test("قيم فاضية في النص وفي الآخر", () => expect(parseCsvLine("4,,x,")).toEqual(["4", "", "x", ""]));
test("قيمة متنصصة فاضية", () => expect(parseCsvLine('"",a')).toEqual(["", "a"]));`,
            solution: R`function parseCsvLine(line) {
  const out = [];
  let cur = "", inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; }
      else if (ch === '"') inQuotes = false;
      else cur += ch;
    } else if (ch === '"') inQuotes = true;
    else if (ch === ",") { out.push(cur); cur = ""; }
    else cur += ch;
  }
  out.push(cur);
  return out;
}`
          }
        },
        {
          cmd: ".xml",
          title: "ملف XML بيتكتب إزاي: التاجات والـ attributes والإقفال وسطر <?xml ?>؟",
          desc: R`XML (eXtensible Markup Language) صيغة نصية للداتا بالتاجات، شبه HTML بس انت اللي بتخترع أسامي التاجات، وقواعدها أشد بكتير. كانت لغة تبادل الداتا قبل JSON، ولسه موجودة في حاجات كتير هتشتغل عليها: [[AndroidManifest.xml]] وملفات الـ layout والـ strings في Android، و [[pom.xml]] في Java، و [[.csproj]] في .NET، و SVG، وملفات [[.docx]] و [[.xlsx]] من جوه، و RSS، و [[sitemap.xml]] للمواقع، و SOAP وأنظمة البنوك والحكومة القديمة.

الرموز:
• [[<?xml version="1.0" encoding="UTF-8"?>]]: الـ declaration (اسمه كمان prolog). اختياري، بس لو موجود لازم يبقى أول حاجة في الملف خالص، حتى قبل أي مسافة أو سطر فاضي.
• [[<order>]] تاج فتح، و [[</order>]] تاج قفل بنفس الاسم وقبله [[/]]. اللي بينهم اسمه element.
• [[<item ... />]]: element فاضي (self-closing)، يعني [[<item></item>]] في سطر واحد. الـ [[/>]] لازمة، مش زي HTML.
• [[id="1024"]] attribute جوه تاج الفتح: اسم و [[=]] وقيمة بين [["]] أو [[']] (لازم تنصيص، حتى للأرقام).
• النص بين التاجات اسمه text content: [[<name>سارة</name>]].
• [[<!-- تعليق -->]]: تعليق، ومينفعش يكون جواه [[--]].
• [[&amp;]] و [[&lt;]] وأخواتهم: entities للحروف الخاصة (الدرس الجاي).

القواعد اللي لو اتكسرت الملف كله مبيتقريش (اسمه ملف مش well-formed):
• root واحد بس: element واحد بيلف الملف كله.
• كل تاج اتفتح يتقفل، وبالترتيب: [[<a><b></b></a>]] صح، و [[<a><b></a></b>]] غلط.
• الأسامي حساسة للحروف: [[<Name>]] غير [[<name>]].
• الاسم مينفعش يبدأ برقم أو يبقى فيه مسافة.
• [[&]] و [[<]] ممنوعين في النص لوحدهم.

attribute ولا element؟ مفيش قاعدة إجبارية. العُرف: المعلومة الصغيرة اللي بتوصف الحاجة (id، نوع، عملة) attribute، والمحتوى نفسه أو أي حاجة ممكن تتكرر أو يبقى جواها حاجات element.

بتفحصه إزاي: VS Code بإضافة XML (من Red Hat)، أو [[xmllint --noout file.xml]] (من [[sudo apt install libxml2-utils]])، أو Python اللي جاي مع أي جهاز.`,
          example: R`<?xml version="1.0" encoding="UTF-8"?>
<!-- طلب من المتجر -->
<order id="1024" status="paid">
  <customer>
    <name>سارة أحمد</name>
    <email>sara@example.com</email>
  </customer>
  <items>
    <item sku="TSH-01" qty="2" price="250"/>
    <item sku="MUG-07" qty="1" price="120"/>
  </items>
  <note>توصيل بعد الساعة 5 &amp; اتصل قبلها</note>
  <total currency="EGP">620</total>
</order>`,
          flag: "script",
          try: R`احفظ المثال في [[order.xml]]. افحصه: [[python3 -c "import xml.etree.ElementTree as ET; ET.parse('order.xml'); print('OK')"]] (أو [[xmllint --noout order.xml]] لو متسطّب). بعدين بوّظه مرتين وافحص بعد كل مرة: امسح [[</name>]]، وبعدين رجّعها وغيّر [[&amp;]] لـ [[&]] لوحدها. وجرّب تطلّع اسم العميل بـ [[xmllint --xpath 'string(/order/customer/name)' order.xml]].`,
          deep: {
            why: R`XML اتعمل سنة 1998 كصيغة عامة للمستندات والداتا يقدر أي برنامج يقراها ويتأكد إنها سليمة. عنده حاجات JSON معندوش: تعليقات، و attributes، و namespaces تخلط بيها أكتر من «لغة» في نفس الملف، و schemas (XSD) بتحدد الملف لازم يبقى شكله إيه بالظبط. عشان كده الأنظمة الكبيرة والأدوات القديمة لسه عليه.`,
            how: R`الـ parser بيبني شجرة: الـ root فوق وتحته العناصر. في Python [[ET.parse(file).getroot()]] بيرجّع الـ root، و [[.find("customer/name").text]] بيمشي في الشجرة، و [[.get("id")]] بيقرا attribute. وفيه لغة بحث اسمها XPath: [[/order/customer/name]] مسار من الـ root، و [[//item/@sku]] «أي item في أي مكان، والـ attribute بتاعه sku». ولو حتة صغيرة غلط الـ parser بيوقف كله، وده مقصود: XML مبيخمّنش زي المتصفح مع HTML.`,
            when: R`لما الأداة أو النظام اللي بتتعامل معاه بيستخدمه (Android و Maven و .NET و SVG و RSS و sitemap و SOAP). أما لو بتصمم API أو ملف إعدادات جديد، فـ JSON أو YAML أبسط.`,
            mistakes: R`تحط سطر فاضي أو BOM قبل [[<?xml]] فيطلعلك [[XML declaration allowed only at the start of the document]]. تكتب [[<br>]] أو [[<img ...>]] من غير [[/]] زي HTML. تكتب [[&]] لوحدها في نص أو لينك ([[?a=1&b=2]] لازم [[?a=1&amp;b=2]]). تحط أكتر من root. وتستخدم [[&nbsp;]] (دي HTML بس، في XML استخدم [[&#160;]]).`
          },
          teach: R`## الفكرة: شجرة مكتوبة بالتاجات

المثال محتوى ملف اسمه [[order.xml]]: طلب من متجر. هنفكه سطر سطر، وبعدين نقراه بالكود (Python و PowerShell و [[xmllint]]) ونبوّظه عشان نشوف شكل الغلط.

XML اختصار **eXtensible Markup Language**: «extensible» يعني انت اللي بتخترع أسامي التاجات ([[order]] و [[customer]] مش كلمات محجوزة)، و «markup» يعني نص عليه علامات (التاجات).

---

## ١. سطر الـ declaration

~~~text السطر ١
<?xml version="1.0" encoding="UTF-8"?>
~~~

- [[<?]] و [[?>]]: ده مش element، ده «تعليمات للـ parser» (processing instruction).
- [[version="1.0"]]: نسخة XML. عمليًا دايمًا [[1.0]].
- [[encoding="UTF-8"]]: الملف محفوظ بأنهي ترميز. لو كتبت عربي لازم الملف يبقى فعلًا UTF-8.

لو موجود، لازم يبقى أول بايت في الملف. جرّبت أحط سطر فاضي قبله:

~~~text الناتج (xmllint في ubuntu:24.04)
order_blank.xml:2: parser error : XML declaration allowed only at the start of the document
~~~

---

## ٢. التعليق

~~~text السطر ٢
<!-- طلب من المتجر -->
~~~

بيبدأ بـ [[<!--]] وبيخلص بـ [[-->]]، والـ parser بيرميه. مينفعش يبقى جواه [[--]].

---

## ٣. الـ root والـ attributes

~~~text السطر ٣
<order id="1024" status="paid">
~~~

| الحتة | اسمها | معناها |
|---|---|---|
| [[<order>]] | تاج فتح (start tag) | بداية element اسمه [[order]] |
| [[id="1024"]] | attribute | معلومة صغيرة على الـ element: اسم و [[=]] وقيمة |
| [[status="paid"]] | attribute تاني | الترتيب بين الـ attributes ملوش معنى |

القيمة لازم بين [["]] أو [[']] حتى لو رقم. و [[order]] هنا هو الـ **root**: الـ element الوحيد اللي بيلف الملف كله، وآخر سطر [[</order>]] بيقفله.

---

## ٤. elements جوه elements

~~~text السطور ٤ لـ ٧
  <customer>
    <name>سارة أحمد</name>
    <email>sara@example.com</email>
  </customer>
~~~

- [[<customer>]] فاتح، وجواه اتنين: [[name]] و [[email]].
- [[<name>سارة أحمد</name>]]: تاج فتح، وبعده النص (text content)، وبعده تاج قفل بنفس الاسم وقبله [[/]].
- [[</customer>]] بيتقفل بعد ما ولاده اتقفلوا. الترتيب ده إجباري.
- المسافات اللي في أول السطور للقراية بس، الـ parser مش بيحتاجها (عكس YAML).

---

## ٥. الـ list والـ element الفاضي

~~~text السطور ٨ لـ ١١
  <items>
    <item sku="TSH-01" qty="2" price="250"/>
    <item sku="MUG-07" qty="1" price="120"/>
  </items>
~~~

- XML مفيهوش list زي [[[ ]]] في JSON. الليستة هي نفس اسم الـ element متكرر جوه أب واحد.
- [[<item ... />]]: element **فاضي** (self-closing). [[/>]] في الآخر يعني «فتحته وقفلته في نفس التاج»، زي [[<item ...></item>]]. في HTML ممكن تكتب [[<br>]] من غير قفل، في XML لأ.
- كل الداتا هنا في attributes: [[sku]] (كود المنتج، Stock Keeping Unit)، و [[qty]] (الكمية، quantity)، و [[price]].

---

## ٦. الـ entity

~~~text السطر ١٢
  <note>توصيل بعد الساعة 5 &amp; اتصل قبلها</note>
~~~

[[&]] لوحدها ممنوعة في النص لأنها بداية entity. [[&amp;]] هي الطريقة الوحيدة تكتب بيها [[&]]، والـ parser بيرجّعها [[&]] وهو بيقرا (التفاصيل في الدرس الجاي).

---

## ٧. نص و attribute على نفس الـ element

~~~text السطور ١٣ و ١٤
  <total currency="EGP">620</total>
</order>
~~~

[[total]] جواه نص [[620]] وعليه attribute [[currency]]. لاحظ إن [[620]] لسه **نص**: XML مفيهوش أرقام، البرنامج هو اللي بيحوّل. و [[</order>]] بيقفل الـ root، ومينفعش يبقى بعده أي element.

---

## ٨. نقراه بـ Python

~~~python
import xml.etree.ElementTree as ET
r = ET.parse("order.xml").getroot()
print(r.tag, r.attrib, r.get("id"))
print(r.find("customer/name").text)
print([i.get("sku") for i in r.findall("items/item")])
print(sum(int(i.get("qty")) * int(i.get("price")) for i in r.iter("item")))
print(r.find("note").text)
~~~

- [[xml.etree.ElementTree]]: مكتبة XML جاية مع Python، و [[as ET]] اسم مختصر ليها.
- [[ET.parse(...)]]: بيقرا الملف ويبني الشجرة. [[.getroot()]] بيرجّع الـ root.
- [[.tag]] اسم الـ element، و [[.attrib]] كل الـ attributes كـ dict، و [[.get("id")]] attribute واحد.
- [[.find("customer/name")]]: أول element على المسار ده. [[.text]] النص اللي جواه.
- [[.findall(...)]]: كلهم في ليستة. و [[.iter("item")]]: أي [[item]] في أي عمق.
- [[int(...)]]: حوّل النص لرقم عشان نضرب.

~~~text الناتج (Python 3.12 في ubuntu:24.04)
order {'id': '1024', 'status': 'paid'} 1024
سارة أحمد
['TSH-01', 'MUG-07']
620
توصيل بعد الساعة 5 & اتصل قبلها
~~~

[[620]] = ٢×٢٥٠ + ١×١٢٠، يعني نفس الـ [[total]] اللي في الملف. و [[&amp;]] رجعت [[&]].

---

## ٩. نقراه بـ PowerShell: [[[xml]]]

~~~powershell
$x = [xml](Get-Content order.xml -Raw -Encoding UTF8)
$x.order.id
$x.order.customer.name
$x.order.items.item | Format-Table sku, qty, price
$x.order.total.'#text'
$x.SelectSingleNode('/order/customer/name').InnerText
~~~

- [[Get-Content -Raw]]: اقرا الملف كله كنص واحد (من غير [[-Raw]] بيرجّع ليستة سطور). [[-Encoding UTF8]] عشان العربي في Windows PowerShell 5.1.
- [[[xml]]]: حوّل النص لـ XML document. لو الملف مش well-formed هنا بيقع.
- [[$x.order.customer.name]]: PowerShell بيخليك تمشي في الشجرة بالنقطة، والـ attributes كمان بالنقطة ([[.id]]).
- [[.'#text']]: لما الـ element عليه attribute وجواه نص، النص اسمه [[#text]].
- [[SelectSingleNode]]: بحث بـ XPath (تحت).

~~~text الناتج (pwsh 7.6 و Windows PowerShell 5.1)
1024
سارة أحمد

sku    qty price
---    --- -----
TSH-01 2   250
MUG-07 1   120

620
سارة أحمد
~~~

---

## ١٠. [[xmllint]]: فحص و XPath

[[xmllint]] من حزمة [[libxml2-utils]] على أوبونتو. اتشغّل في [[ubuntu:24.04]] (libxml 2.9.14):

~~~bash
xmllint --noout order.xml
xmllint --xpath 'string(/order/customer/name)' order.xml
xmllint --xpath 'count(//item)' order.xml
xmllint --xpath '//item/@sku' order.xml
~~~

- [[--noout]]: متطبعش الملف، افحصه بس. لو سليم مش بيطبع حاجة وكود الخروج [[0]].
- [[--xpath]]: XPath لغة بحث في الشجرة. [[/order/customer/name]] مسار من الـ root. [[string(...)]] هات النص بس. [[//item]] أي [[item]] في أي مكان، و [[count]] عدّهم. [[@sku]] الـ attribute.

~~~text الناتج
سارة أحمد
2
 sku="TSH-01"
 sku="MUG-07"
~~~

---

## ١١. نبوّظه

مسحت [[</name>]]:

~~~text الناتج
Python:     xml.etree.ElementTree.ParseError: mismatched tag: line 7, column 4
xmllint:    order_noname.xml:7: parser error : Opening and ending tag mismatch: name line 5 and customer
PowerShell: The 'name' start tag on line 5 position 6 does not match the end tag of 'customer'. Line 7, position 5.
~~~

الثلاثة بيشاوروا على سطر ٧ ([[</customer>]]): لحد هناك الـ parser فاكر إن [[email]] جوه [[name]]، فلما لقى قفلة [[customer]] و [[name]] لسه مفتوح عرف إن فيه غلط. و [[xmllint]] كمل وطلّع أخطاء تانية بسبب نفس الغلطة، فصلّح أول واحد الأول.

وغيّرت [[&amp;]] لـ [[&]] لوحدها:

~~~text الناتج
Python:     not well-formed (invalid token): line 12, column 28
xmllint:    parser error : xmlParseEntityRef: no name
PowerShell: An error occurred while parsing EntityName. Line 12, position 29.
~~~

---

## الخلاصة

| الشكل | اسمه |
|---|---|
| [[<?xml ... ?>]] | declaration، أول حاجة في الملف |
| [[<a> ... </a>]] | element بتاج فتح وتاج قفل |
| [[<a/>]] | element فاضي |
| [[x="..."]] | attribute، لازم متنصص |
| [[<!-- -->]] | تعليق |
| [[&amp;]] | entity لحرف [[&]] |

والقواعد اللي لو اتكسرت الملف مبيتقريش: root واحد، وكل تاج يتقفل بالترتيب، والأسامي حساسة للحروف، و [[&]] و [[<]] ممنوعين لوحدهم في النص.`,
          lines: [
            R`الـ declaration: نسخة XML والترميز. لازم أول حاجة في الملف.`,
            R`تعليق [[<!-- -->]]: الـ parser بيتجاهله.`,
            R`الـ root: element واحد بيلف كل حاجة، وعليه attributes اتنين بين [["]].`,
            R`element جواه elements (nested).`,
            R`تاج فتح ونص وتاج قفل بنفس الاسم وقبله [[/]].`,
            R`element تاني جوه [[customer]].`,
            R`قفل [[customer]]: لازم يتقفل قبل ما أبوه يتقفل.`,
            R`فتح ليستة العناصر.`,
            R`element فاضي بـ [[/>]]، والداتا كلها في attributes.`,
            R`نفس الاسم بيتكرر عادي: ده الـ list في XML.`,
            R`قفل [[items]].`,
            R`[[&amp;]] هي [[&]]، لأن [[&]] لوحدها ممنوعة في النص.`,
            R`نص جواه رقم، و attribute بيقول العملة.`,
            R`قفل الـ root، ومفيش أي element بعده.`
          ],
          sol: R`الفحص بيطبع [[OK]]، و [[xmllint --noout order.xml]] مبيطبعش حاجة (السكوت معناه سليم).

لما تمسح [[</name>]]:
Python: [[xml.etree.ElementTree.ParseError: mismatched tag: line 7, column 4]]
xmllint: [[order.xml:7: parser error : Opening and ending tag mismatch: name line 5 and customer]] وبعدها أخطاء تانية بسبب نفس الغلط.
لاحظ إنه بيشاور على السطر ٧ ([[</customer>]]) لأنه لقى قفلة مش متوقعة هناك.

لما تكتب [[&]] لوحدها:
Python: [[not well-formed (invalid token): line 12, column 28]]
xmllint: [[xmlParseEntityRef: no name]]

و [[--xpath 'string(/order/customer/name)']] بيطبع [[سارة أحمد]].`
        },
        {
          cmd: "XML entities و CDATA",
          title: "تكتب < و & وعلامات التنصيص جوه XML إزاي (&amp; و &lt; و CDATA)؟",
          desc: R`في XML الحرفين [[<]] و [[&]] ليهم معنى (بداية تاج وبداية entity)، فمينفعش يتكتبوا لوحدهم في النص. بتكتب بدالهم entity: بتبدأ بـ [[&]] وتخلص بـ [[;]].

الخمسة المعروفين في أي XML:
• [[&amp;]] ← [[&]] (amp = ampersand). ودي أهمهم.
• [[&lt;]] ← [[<]] (less than).
• [[&gt;]] ← [[>]] (greater than). مش إجباري في النص بس الناس بتكتبه.
• [[&quot;]] ← [["]]: جوه attribute متنصص بـ [["]].
• [[&apos;]] ← [[']]: جوه attribute متنصص بـ [[']].
وأي حرف تاني بيتكتب برقمه: [[&#1587;]] (بالعشري) أو [[&#x633;]] (بالـ hex) يعني «س». ومفيش [[&nbsp;]] ولا [[&copy;]] في XML، دول بتوع HTML.

CDATA: لو عندك نص كبير مليان [[<]] و [[&]] (كود JavaScript أو SQL أو HTML جوه XML)، بدل ما تهرّب كل حرف حطه في بلوك CDATA: بيبدأ بـ [[<![CDATA[]] وبيخلص بقوسين مربعين قافلين ورا بعض وبعدهم [[>]]. أي حاجة جواه بتتقري زي ما هي حرف بحرف، والـ entities جواه مبتتفكش. والممنوع الوحيد جواه هو علامة النهاية نفسها. (شكل البلوك كامل في الحل تحت.)

التعليقات: [[<!--]] وبعدين [[-->]]، ومينفعش يبقى جواها [[--]]، ومينفعش تبقى جوه تاج.

القاعدة العملية: لو بتبني XML في الكود، متلزقش نصوص بإيدك. استخدم مكتبة بتعمل escape لوحدها، أو لو اضطريت اعمل escape للـ [[&]] الأول وبعدين الباقي (وإلا [[&lt;]] هتبقى [[&amp;lt;]]).`,
          example: R`<?xml version="1.0" encoding="UTF-8"?>
<product>
  <name>Tom &amp; Jerry Mug</name>
  <rule>price &lt; 100 and qty &gt; 0</rule>
  <quote title="He said &quot;hi&quot;">it&apos;s fine</quote>
  <arabic>&#1587;&#1604;&#1575;&#1605;</arabic>
  <empty/>
  <!-- تعليق: مينفعش يكون جواه شرطتين ورا بعض -->
</product>`,
          flag: "script",
          try: R`احفظ المثال في [[product.xml]] واقراه بـ Python وشوف النص بعد ما الـ entities اتفكت: [[python3 -c "import xml.etree.ElementTree as ET; [print(c.tag, repr(c.text), c.attrib) for c in ET.parse('product.xml').getroot()]"]]. بعدين ضيف سطر [[<code>]] فيه [[if (a < b && c > d)]] من غير escape وافحص، وبعدين حطه جوه CDATA (الشكل في الحل). وآخر حاجة حل التمرين.`,
          deep: {
            why: R`الـ parser لازم يعرف من أول حرف هو قدام تاج ولا نص. لو [[<]] ممكن تبقى نص عادي، هيبقى مستحيل يعرف [[a < b]] دي تاج اسمه [[b]] ولا مقارنة. فالحل إن الحروف الحساسة دي دايمًا بتتكتب بشكل تاني جوه النص.`,
            how: R`وهو بيقرا، الـ parser لما يلاقي [[&]] بيقرا لحد [[;]] ويبدّل الكلمة بالحرف بتاعها، فالبرنامج اللي بيستخدم الـ XML بيشوف [[Tom & Jerry Mug]] على طول. ولما يلاقي [[<![CDATA[]] بيبطّل يفسّر أي حاجة لحد علامة النهاية. وفي الآخر النص اللي جوه CDATA واللي متهرّب بالـ entities بيطلعوا نفس الحاجة بالظبط للبرنامج.`,
            when: R`كل ما تكتب نص في XML فيه [[&]] (أكتر حاجة: لينكات فيها [[?a=1&b=2]] في sitemap أو RSS أو Android strings)، أو كود جوه XML (CDATA).`,
            mistakes: R`تهرّب [[&]] في الآخر بدل الأول فتلاقي [[&amp;lt;]]. تكتب [[&nbsp;]] فيطلعلك [[Entity 'nbsp' not defined]]. تحط [[--]] في تعليق فيطلعلك [[Double hyphen within comment]]. وفي Android [[strings.xml]] الـ [[']] لازم تتكتب [[\']] (ده قانون Android مش XML، درس AndroidManifest).`
          },
          teach: R`## الفكرة: الحروف اللي ليها معنى بتتكتب بشكل تاني

في XML الحرف [[<]] معناه «بداية تاج» و [[&]] معناه «بداية entity». فلو عايز تكتبهم كنص عادي، بتكتب بدالهم كلمة قصيرة بين [[&]] و [[;]] اسمها **entity**، والـ parser بيرجّعها للحرف الأصلي وهو بيقرا. المثال ملف [[product.xml]] فيه كل الأشكال دي، هنفكه سطر سطر وبعدين نقراه بالكود.

---

## ١. [[&amp;]]

~~~text السطر ٣
  <name>Tom &amp; Jerry Mug</name>
~~~

[[amp]] اختصار **ampersand** (اسم حرف [[&]]). البرنامج اللي بيقرا هيشوف [[Tom & Jerry Mug]]. دي أهم entity لأن [[&]] بتيجي كتير في الأسامي واللينكات ([[?a=1&b=2]]).

---

## ٢. [[&lt;]] و [[&gt;]]

~~~text السطر ٤
  <rule>price &lt; 100 and qty &gt; 0</rule>
~~~

[[lt]] = **less than** ([[<]])، و [[gt]] = **greater than** ([[>]]). لو كتبت [[<]] على طول، الـ parser هيفتكر [[< 100]] بداية تاج اسمه غلط. أما [[>]] لوحدها في النص مسموحة، بس الناس بتكتبها [[&gt;]] عشان الشكل يبقى متناسق.

---

## ٣. [[&quot;]] و [[&apos;]]

~~~text السطر ٥
  <quote title="He said &quot;hi&quot;">it&apos;s fine</quote>
~~~

- [[quot]] = **quotation mark** ([["]]). قيمة الـ attribute محطوطة بين [["]]، فلو جواها [["]] عادية هتقفل القيمة بدري. [[&quot;]] بتحل ده.
- [[apos]] = **apostrophe** ([[']]). في النص مش لازمة (كان ممكن تكتب [[it's]] على طول)، هي هنا عشان تشوفها بس. بتبقى لازمة جوه attribute متنصص بـ [[']].

---

## ٤. الحرف برقمه

~~~text السطر ٦
  <arabic>&#1587;&#1604;&#1575;&#1605;</arabic>
~~~

[[&#]] وبعدها رقم الحرف في Unicode بالعشري. [[1587]] هو «س»، و [[1604]] «ل»، و [[1575]] «ا»، و [[1605]] «م»، فالنص «سلام». ونفس الكلام بالـ hex: [[&#x633;]] (الـ [[x]] معناها hex، و [[633]] بالـ hex = [[1587]] بالعشري). مفيد لحرف مش موجود على الكيبورد، زي المسافة اللي متتقسمش [[&#160;]] (اللي في HTML اسمها [[&nbsp;]]).

---

## ٥. element فاضي وتعليق

~~~text السطور ٧ لـ ٩
  <empty/>
  <!-- تعليق: مينفعش يكون جواه شرطتين ورا بعض -->
</product>
~~~

[[<empty/>]] ملوش نص خالص، و Python هيرجّع [[.text]] بتاعه [[None]] (لا حاجة). والتعليق الـ parser بيرميه.

---

## ٦. نقراه بـ Python ونشوف الـ entities اتفكت

~~~python
import xml.etree.ElementTree as ET
for c in ET.parse("product.xml").getroot():
    print(c.tag, repr(c.text), c.attrib)
~~~

- [[for c in root]]: اللف على الـ root بيرجّع ولاده واحد واحد. (ElementTree بيرمي التعليقات افتراضيًا، فمش هتظهر.)
- [[repr(...)]]: اطبع القيمة بشكلها في Python (بالتنصيص)، عشان تفرّق بين نص فاضي و [[None]].
- [[c.attrib]]: الـ attributes كـ dict.

~~~text الناتج (Python 3.12 في ubuntu:24.04)
name 'Tom & Jerry Mug' {}
rule 'price < 100 and qty > 0' {}
quote "it's fine" {'title': 'He said "hi"'}
arabic 'سلام' {}
empty None {}
~~~

كل entity رجعت حرفها: البرنامج عمره ما بيشوف [[&amp;]]، بيشوف [[&]].

ونفس الكلام في PowerShell (pwsh 7.6 و 5.1):

~~~powershell
$p = [xml](Get-Content product.xml -Raw -Encoding UTF8)
$p.product.ChildNodes | ForEach-Object { "{0} = [{1}]" -f $_.Name, $_.InnerText }
~~~

~~~text الناتج
name = [Tom & Jerry Mug]
rule = [price < 100 and qty > 0]
quote = [it's fine]
arabic = [سلام]
empty = []
#comment = [ تعليق: مينفعش يكون جواه شرطتين ورا بعض ]
~~~

[[ChildNodes]] بيرجّع كل الولاد ومنهم التعليق (اسمه [[#comment]])، و [[-f]] بيحط القيم مكان [[{0}]] و [[{1}]].

---

## ٧. CDATA: نص بيتقري زي ما هو

لو حطيت كود فيه [[<]] و [[&&]] من غير escape:

~~~text السطر الغلط
  <code>if (a < b && c > d)</code>
~~~

~~~text الناتج
Python:  not well-formed (invalid token): line 8, column 15
xmllint: parser error : StartTag: invalid element name
~~~

الحل إنك تحطه جوه بلوك CDATA (Character DATA): بيبدأ بـ [[<![CDATA[]] وبيخلص بقوسين مربعين قافلين وبعدهم [[>]]. أي حاجة جواه نص حرفي، والـ parser مبيدوّرش فيه على تاجات ولا entities. بعد ما حطيته (السطر في الحل تحت)، Python طبع:

~~~text الناتج
code 'if (a < b && c > d) alert("ok");' {}
~~~

و PowerShell طبع نفس النص، و [[FirstChild.NodeType]] قال [[CDATA]]. يعني للبرنامج النص اللي جوه CDATA والنص المتهرّب بالـ entities نفس الحاجة بالظبط، الفرق في الكتابة بس.

---

## ٨. الأخطاء المشهورة

| الغلطة | xmllint | PowerShell |
|---|---|---|
| [[&nbsp;]] (entity من HTML) | [[Entity 'nbsp' not defined]] | [[Reference to undeclared entity 'nbsp']] |
| [[--]] جوه تعليق | [[Double hyphen within comment]] | [[An XML comment cannot contain '--']] |

XML مبيعرفش غير الخمسة ([[amp]] و [[lt]] و [[gt]] و [[quot]] و [[apos]]) والأرقام. أي اسم تاني لازم يتعرّف في DTD، وده نادر.

---

## ٩. التمرين: الترتيب مهم

التمرين بيطلب دالة بتعمل escape لنص عشان يتحط جوه XML. الفكرة اللي هتفرق: لو هرّبت [[<]] الأول بقت [[&lt;]]، وبعدين لما تهرّب [[&]] الـ [[&]] اللي في [[&lt;]] نفسها هتتهرّب وتبقى [[&amp;lt;]]. فـ [[&]] لازم تتعالج **الأول** قبل أي حرف تاني. وخلّي بالك إن الاستبدال لازم يمسك **كل** مرة الحرف ظهر فيها مش أول مرة بس.

وفي الكود الحقيقي استخدم دالة جاهزة. مثلًا في PowerShell:

~~~powershell
[System.Security.SecurityElement]::Escape('Tom & "Jerry" <b>')
~~~

~~~text الناتج
Tom &amp; &quot;Jerry&quot; &lt;b&gt;
~~~

---

## الخلاصة

| تكتب | عشان تطلع | ليه |
|---|---|---|
| [[&amp;]] | [[&]] | أهمهم، وأول واحد يتهرّب |
| [[&lt;]] | [[<]] | عشان متتفهمش تاج |
| [[&gt;]] | [[>]] | للتناسق |
| [[&quot;]] | [["]] | جوه attribute بـ [["]] |
| [[&apos;]] | [[']] | جوه attribute بـ [[']] |
| [[&#1587;]] أو [[&#x633;]] | أي حرف برقمه | |
| بلوك CDATA | نص كبير زي ما هو | كود جوه XML |`,
          lines: [
            R`الـ declaration.`,
            R`الـ root.`,
            R`[[&amp;]] بتتقري [[&]]، فالاسم [[Tom & Jerry Mug]].`,
            R`[[&lt;]] و [[&gt;]] بيتقروا [[<]] و [[>]].`,
            R`[[&quot;]] جوه attribute متنصص بـ [["]]، و [[&apos;]] في النص.`,
            R`حروف برقمها في Unicode: دي «سلام».`,
            R`element فاضي.`,
            R`تعليق: بيبدأ بـ [[<!--]] وبيخلص بـ [[-->]].`,
            R`قفل الـ root.`
          ],
          sol: R`أمر Python بيطبع (الـ entities اتفكت):
[[name 'Tom & Jerry Mug' {}]]
[[rule 'price < 100 and qty > 0' {}]]
[[quote "it's fine" {'title': 'He said "hi"'}]]
[[arabic 'سلام' {}]]
[[empty None {}]]

[[<code>if (a < b && c > d)</code>]] من غير escape بيوقّع الفحص ([[not well-formed (invalid token)]]). وجوه CDATA بيعدّي، والنص بيرجع زي ما هو بالظبط:
[[code 'if (a < b && c > d) alert("ok");' {}]]
وده شكل السطر (وتعليق فيه [[--]] بيطلّع [[Double hyphen within comment]] في xmllint):`,
          solCode: R`<code><![CDATA[if (a < b && c > d) alert("ok");]]></code>`,
          check: {
            lang: "js",
            starter: R`// escapeXml: حوّل النص بحيث يتحط بأمان جوه XML (في نص أو attribute)
// & ← &amp;  و  < ← &lt;  و  > ← &gt;  و  " ← &quot;  و  ' ← &apos;
function escapeXml(text) {
  return text.replace("<", "&lt;").replace("&", "&amp;");
}`,
            tests: R`test("& لوحدها", () => expect(escapeXml("Tom & Jerry")).toBe("Tom &amp; Jerry"));
test("< و > كل مرة مش أول مرة بس", () => expect(escapeXml("a < b < c > d")).toBe("a &lt; b &lt; c &gt; d"));
test("& بتتهرب الأول (مش &amp;lt;)", () => expect(escapeXml("<b>")).toBe("&lt;b&gt;"));
test("علامات التنصيص", () => expect(escapeXml($__bt"hi" it's$__bt)).toBe("&quot;hi&quot; it&apos;s"));
test("لينك فيه أكتر من &", () => expect(escapeXml("/s?a=1&b=2&c=3")).toBe("/s?a=1&amp;b=2&amp;c=3"));
test("العربي ميتغيرش", () => expect(escapeXml("سلام")).toBe("سلام"));`,
            solution: R`function escapeXml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}`
          }
        },
        {
          cmd: "xmlns",
          title: "يعني إيه xmlns و android:name و media:thumbnail (الـ namespaces في XML)؟",
          desc: R`لو ملفين XML من مصدرين استخدموا نفس اسم التاج ([[<title>]] مثلًا) بمعنيين مختلفين، وحطيتهم في ملف واحد، هيحصل لخبطة. الـ namespace بيحل ده: كل تاج بيبقى ليه «عيلة» معرّفة بـ URI.

الرموز:
• [[xmlns="http://..."]]: الـ namespace الافتراضي. كل التاجات اللي من غير بادئة جوه الـ element ده تبع العيلة دي.
• [[xmlns:media="http://..."]]: بيعرّف بادئة (prefix) اسمها [[media]] للعيلة دي.
• [[<media:thumbnail>]] أو [[android:name="..."]]: تاج أو attribute من العيلة اللي البادئة بتاعتها [[media]] أو [[android]].
• الـ URI مجرد اسم مميز، غالبًا شكله لينك بس مفيش حد بيفتحه، ولازم يتكتب بالظبط حرف بحرف.

هتقابلهم فين:
• Android: [[xmlns:android="http://schemas.android.com/apk/res/android"]] في أول كل layout و manifest، وبعدين [[android:layout_width]] و [[android:name]]. و [[xmlns:app]] و [[xmlns:tools]] كمان.
• SVG: [[<svg xmlns="http://www.w3.org/2000/svg">]]. لو نسيتها والملف لوحده، المتصفح مش هيعرضه كصورة.
• Maven [[pom.xml]]، و RSS و Atom، و SOAP، و [[.docx]] من جوه (مليان [[w:]]).

وانت بتقرا XML فيه namespaces بالكود، الاسم الحقيقي للتاج بيبقى الـ URI + الاسم. عشان كده [[root.find("title")]] في Python بيرجّع [[None]] لما يكون فيه namespace افتراضي، ولازم تقوله الـ namespace.`,
          example: R`<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <title>مدونة المبرمج</title>
  <entry>
    <title>أول مقال</title>
    <media:thumbnail url="https://example.com/1.png"/>
  </entry>
</feed>`,
          flag: "script",
          try: R`احفظ المثال في [[feed.xml]] وجرّب في Python:
[[python3 -c "import xml.etree.ElementTree as ET; r = ET.parse('feed.xml').getroot(); print(r.tag); print(r.find('title'))"]]
وبعدين بالـ namespace:
[[python3 -c "import xml.etree.ElementTree as ET; r = ET.parse('feed.xml').getroot(); ns = {'a': 'http://www.w3.org/2005/Atom', 'media': 'http://search.yahoo.com/mrss/'}; print(r.find('a:title', ns).text, r.find('a:entry/media:thumbnail', ns).get('url'))"]]
وآخر حاجة امسح [[xmlns:media="..."]] من أول سطر وافحص الملف.`,
          deep: {
            why: R`XML اتعمل عشان صيغ كتير تتخلط في نفس المستند: صفحة XHTML جواها رسمة SVG جواها معادلة MathML. من غير namespaces مكنش ينفع تعرف [[<title>]] ده بتاع مين. و Android استخدمه عشان يفصل الـ attributes بتاعة النظام ([[android:]]) عن بتاعة المكتبات ([[app:]]).`,
            how: R`الـ parser بيبدّل كل بادئة بالـ URI بتاعها، فـ [[media:thumbnail]] بيبقى [[{http://search.yahoo.com/mrss/}thumbnail]] (ده بالظبط اللي Python بيطبعه في [[r.tag]]). البادئة نفسها ملهاش معنى، ممكن تسميها أي اسم، المهم الـ URI. والتعريف بيتورث: أي element جوه اللي اتعرّف فيه الـ namespace يقدر يستخدمه.`,
            when: R`كل ما تكتب layout في Android، أو SVG لوحده في ملف، أو تقرا RSS أو docx أو أي XML من نظام كبير.`,
            mistakes: R`تستخدم بادئة من غير ما تعرّفها فيطلعلك [[Namespace prefix media on thumbnail is not defined]]. تغيّر حرف في الـ URI بتاع Android فكل الـ attributes تتجاهل. وتدوّر بالكود على التاج باسمه من غير namespace فترجعلك [[None]] وتفتكر الملف فاضي.`
          },
          teach: R`## الفكرة: كل تاج ليه «اسم عيلة»

المثال جزء من feed بصيغة Atom (زي RSS) فيه تاجات من عيلتين: تاجات Atom نفسها ([[feed]] و [[title]] و [[entry]])، وتاج من صيغة تانية اسمها Media RSS ([[thumbnail]]). الـ namespace هو اللي بيقول كل تاج تبع مين. احفظه في [[feed.xml]].

---

## ١. سطر الـ root: تعريف العيلتين

~~~text السطر ٢
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
~~~

شكلهم attributes، بس ليهم معنى خاص. نفكهم:

### [[xmlns="http://www.w3.org/2005/Atom"]]

[[xmlns]] اختصار **XML NameSpace**. من غير [[:]] بعدها يبقى ده الـ namespace **الافتراضي**: أي تاج من غير بادئة جوه [[feed]] (و [[feed]] نفسه) تبع العيلة دي.

### [[xmlns:media="http://search.yahoo.com/mrss/"]]

بعد [[:]] اسم بادئة (prefix): [[media]]. معناها «أي تاج أو attribute بيبدأ بـ [[media:]] تبع العيلة دي».

### الـ URI ده لينك؟

شكله لينك، بس الـ parser **عمره ما بيفتحه**. هو مجرد اسم فريد، والشكل ده عشان كل جهة تستخدم دومين بتملكه فمحدش ياخد نفس الاسم. لازم يتكتب حرف بحرف: [[https]] بدل [[http]] أو [[/]] زيادة في الآخر يبقى namespace تاني خالص.

---

## ٢. التاجات اللي من غير بادئة

~~~text السطور ٣ لـ ٥
  <title>مدونة المبرمج</title>
  <entry>
    <title>أول مقال</title>
~~~

[[title]] و [[entry]] من غير بادئة، فهما تبع الـ namespace الافتراضي (Atom). الـ [[title]] الأول عنوان الـ feed كله، والتاني عنوان المقال.

---

## ٣. التاج اللي ببادئة

~~~text السطر ٦
    <media:thumbnail url="https://example.com/1.png"/>
~~~

[[media:thumbnail]]: البادئة [[media]] والاسم المحلي (local name) [[thumbnail]]. لو صيغة تالتة عندها [[thumbnail]] بمعنى تاني، مفيش تعارض لأن عيلتها مختلفة. و [[url]] attribute عادي من غير بادئة.

---

## ٤. Python: الاسم الحقيقي للتاج

~~~python
import xml.etree.ElementTree as ET
r = ET.parse("feed.xml").getroot()
print(r.tag)
print(r.find("title"))
for e in r.iter():
    print(e.tag)
~~~

~~~text الناتج (Python 3.12 في ubuntu:24.04)
{http://www.w3.org/2005/Atom}feed
None
{http://www.w3.org/2005/Atom}feed
{http://www.w3.org/2005/Atom}title
{http://www.w3.org/2005/Atom}entry
{http://www.w3.org/2005/Atom}title
{http://search.yahoo.com/mrss/}thumbnail
~~~

الـ parser شال البادئة وحط الـ URI بين [[{ }]] قدام الاسم. ده الاسم الحقيقي. عشان كده [[find("title")]] رجّع [[None]]: هو بيدوّر على [[title]] **من غير** namespace، ومفيش تاج كده في الملف.

### الحل: قاموس namespaces

~~~python
ns = {"a": "http://www.w3.org/2005/Atom", "media": "http://search.yahoo.com/mrss/"}
print(r.find("a:title", ns).text, r.find("a:entry/media:thumbnail", ns).get("url"))
~~~

- [[ns]]: dict بيربط بادئة **انت** اخترتها بالـ URI. سمّيت Atom [[a]] مع إن الملف مفيهوش بادئة ليها: المهم الـ URI، مش الاسم.
- [[find("a:title", ns)]]: Python بيحوّل [[a:title]] لـ [[{http://www.w3.org/2005/Atom}title]] ويدوّر.

~~~text الناتج
مدونة المبرمج https://example.com/1.png
~~~

---

## ٥. PowerShell: نفس الفخ

~~~powershell
$f = [xml](Get-Content feed.xml -Raw -Encoding UTF8)
$f.feed.title
$f.DocumentElement.NamespaceURI
"[" + $f.SelectSingleNode('/feed/title') + "]"
$ns = New-Object System.Xml.XmlNamespaceManager($f.NameTable)
$ns.AddNamespace('a', 'http://www.w3.org/2005/Atom')
$ns.AddNamespace('media', 'http://search.yahoo.com/mrss/')
$f.SelectSingleNode('/a:feed/a:title', $ns).InnerText
$f.SelectSingleNode('//media:thumbnail', $ns).url
~~~

- المشي بالنقطة ([[$f.feed.title]]) بيتجاهل الـ namespace، فبيشتغل.
- [[NamespaceURI]]: الـ URI بتاع الـ root.
- XPath من غير namespace ([[/feed/title]]) رجّع لا حاجة، فالسطر طبع [[[]]] فاضي.
- [[XmlNamespaceManager]]: نفس فكرة قاموس [[ns]] في Python، و [[AddNamespace]] بيضيف بادئة.

~~~text الناتج (pwsh 7.6 و Windows PowerShell 5.1)
مدونة المبرمج
http://www.w3.org/2005/Atom
[]
مدونة المبرمج
https://example.com/1.png
~~~

---

## ٦. لو نسيت تعرّف البادئة

مسحت [[xmlns:media="..."]] من السطر التاني:

~~~text الناتج
xmllint:    namespace error : Namespace prefix media on thumbnail is not defined
Python:     xml.etree.ElementTree.ParseError: unbound prefix: line 6, column 4
PowerShell: 'media' is an undeclared prefix. Line 6, position 6.
~~~

لاحظ إن [[xmllint --noout]] طبع الغلط بس كود الخروج كان [[0]]: الملف لسه XML سليم كـ «تاجات»، والغلط في طبقة الـ namespaces بس. Python و PowerShell رفضوه خالص.

---

## الخلاصة

| الشكل | معناه |
|---|---|
| [[xmlns="URI"]] | العيلة الافتراضية لكل تاج من غير بادئة |
| [[xmlns:p="URI"]] | بيعرّف البادئة [[p]] |
| [[<p:tag>]] أو [[p:attr="..."]] | تاج أو attribute من عيلة [[p]] |
| [[{URI}tag]] | الاسم الحقيقي اللي الكود بيشوفه |

البادئة ملهاش معنى في نفسها، الـ URI هو المهم. وفي الكود لازم تدّي الـ parser الـ namespaces وانت بتدوّر.`,
          lines: [
            R`الـ declaration.`,
            R`[[xmlns]] الافتراضي لكل التاجات من غير بادئة، و [[xmlns:media]] بيعرّف البادئة [[media]].`,
            R`[[title]] هنا تبع عيلة Atom (الافتراضية).`,
            R`[[entry]] تبع Atom كمان.`,
            R`[[title]] تاني، برضه Atom.`,
            R`[[media:thumbnail]] تبع عيلة media، فمفيش تعارض مع أي [[thumbnail]] تاني.`,
            R`قفل [[entry]].`,
            R`قفل الـ root.`
          ],
          sol: R`أول أمر بيطبع:
[[{http://www.w3.org/2005/Atom}feed]]
[[None]]
يعني الاسم الحقيقي للـ root فيه الـ URI، و [[find('title')]] ملقاش حاجة لأنه بيدوّر على [[title]] من غير namespace.

التاني بيطبع:
[[مدونة المبرمج https://example.com/1.png]]

ولما تمسح تعريف [[xmlns:media]]، [[xmllint]] بيقول [[namespace error : Namespace prefix media on thumbnail is not defined]]، و Python بيقول [[unbound prefix]].`
        }
      ]
    },
    {
      t: "YAML بالتفصيل",
      l: 1,
      n: "الصيغة اللي هتكتب بيها Docker Compose و GitHub Actions و Kubernetes وإعدادات كتير: المسافات و - و : والنصوص الطويلة بـ | و >، وفخ الأنواع (مشكلة النرويج)، و & و * عشان متكررش نفسك",
      items: [
        {
          cmd: ".yaml و .yml",
          title: "ملف YAML بيتكتب إزاي، والمسافات و - و : معناها إيه؟",
          desc: R`YAML (بتتنطق «يامل») صيغة نصية للإعدادات، معمولة عشان الإنسان يقراها ويكتبها بسهولة: مفيش أقواس ولا تنصيص في الغالب، والمسافات اللي في أول السطر هي اللي بتحدد مين جوه مين. الامتدادين [[.yaml]] و [[.yml]] نفس الحاجة بالظبط ([[.yaml]] هو المفضل رسميًا). هتكتبه في: [[compose.yaml]] (Docker)، و [[.github/workflows/*.yml]] (GitHub Actions)، و Kubernetes، و [[pubspec.yaml]] (Flutter)، و [[application.yml]] (Spring)، و [[pnpm-lock.yaml]]، والـ front matter في Markdown.

الرموز:
• [[key: value]]: مفتاح وبعده [[:]] و «مسافة» وبعدين القيمة. المسافة بعد [[:]] إجبارية.
• المسافات في أول السطر (indentation): أي سطر داخل بمسافات أكتر من اللي فوقه يبقى جواه. [[app:]] وتحته [[  name: x]] يعني name جوه app. العُرف مسافتين.
• Tab ممنوع خالص في الـ indentation. مسافات بس.
• [[-]] ومسافة في أول السطر: عنصر في list.
• [[- name: web-1]] وتحته [[  ip: ...]] بنفس مستوى [[name]]: list عناصرها objects.
• [[[a, b]]] list في سطر واحد، و [[{a: 1, b: 2}]] object في سطر واحد (اسمها flow style، وده نفس شكل JSON تقريبًا).
• [[#]] بعده مسافة: تعليق لحد آخر السطر.
• [[---]] لوحده في سطر: بداية مستند جديد (ملف واحد ممكن يبقى فيه كذا مستند، شائع في Kubernetes).
• النصوص مش محتاجة تنصيص غالبًا، بس [["..."]] و [['...']] موجودين للحالات الخاصة (الدرسين الجايين).

الأنواع: نفس أنواع JSON: نص، ورقم ([[3000]])، و boolean ([[true]] و [[false]])، و null ([[null]] أو [[~]] أو قيمة فاضية)، و list، و object (اسمه في YAML mapping). وفعلًا أي JSON سليم هو YAML سليم.

بتفحصه إزاي: VS Code بإضافة YAML (من Red Hat) بيعلّم على الغلط، وكمان بيعرف schema الملفات المشهورة (compose و GitHub Actions) فيكمّلك المفاتيح. ومن الترمنال [[yamllint file.yaml]] (من [[pip install yamllint]])، أو Python: [[python3 -c 'import yaml, sys; yaml.safe_load(open(sys.argv[1]))' file.yaml]].`,
          example: R`# إعدادات التطبيق
app:
  name: gym-portal
  port: 3000
  debug: false
  version: "1.10"
database:
  host: localhost
  password: null
  pool: 10
admins:
  - sara@example.com
  - ali@example.com
features: [login, booking]
limits: {daily: 5, monthly: 100}
servers:
  - name: web-1
    ip: 10.0.0.5
  - name: web-2
    ip: 10.0.0.6`,
          flag: "script",
          try: R`احفظ المثال في [[app.yaml]] (اكتبه بإيدك عشان تحس بالمسافات) وحوّله لـ JSON عشان تشوف الهيكل: [[python3 -c 'import yaml, json; print(json.dumps(yaml.safe_load(open("app.yaml")), indent=2, ensure_ascii=False))']] (لو [[yaml]] مش موجود: [[pip install pyyaml]]). بعدين بوّظه: حط Tab قبل [[name]]، وبعدين رجّعه وزوّد مسافة واحدة قبل [[port]] بس، وبعدين شيل المسافة اللي بعد [[:]] في [[pool:]]. وشوف كل مرة إيه اللي حصل.`,
          deep: {
            why: R`JSON بقى في كل حتة، بس كتابته بإيدك متعبة: تنصيص في كل مكان، وأقواس، ومفيش تعليقات، والـ trailing comma بتوقعك. YAML اتعمل عشان ملفات الإعدادات اللي الناس بتكتبها: أقل رموز، وتعليقات، والهيكل باين من المسافات زي Python.`,
            how: R`الـ parser بيعد المسافات في أول كل سطر: لو أكتر من اللي قبله يبقى جواه، ولو نفسه يبقى أخوه، ولو أقل يبقى رجعنا لفوق. عشان كده مسافة واحدة زيادة بتغيّر المعنى أو بتوقّع الملف. والنتيجة نفس اللي JSON بيطلّعه: objects و lists ونصوص وأرقام، والبرنامج مش بيعرف الإعدادات جت من YAML ولا JSON.`,
            when: R`ملفات إعدادات بيكتبها ويقراها بشر: Docker Compose و CI و Kubernetes و Ansible وإعدادات Spring و Flutter. أما تبادل داتا بين برامج (API) فـ JSON أأمن وأسرع.`,
            mistakes: R`Tab بدل مسافات ([[found character '\t' that cannot start any token]]): خلّي VS Code يحوّل الـ Tab لمسافات (ده الافتراضي في ملفات YAML). مسافة زيادة أو ناقصة ([[mapping values are not allowed here]]). تنسى المسافة بعد [[:]] أو بعد [[-]]. ونص فيه [[: ]] من غير تنصيص زي [[msg: Error: not found]]. والأخطر: قيم بتتقري بنوع غير اللي انت قاصده (درس «مشكلة النرويج»).`
          },
          teach: R`## الفكرة: المسافات هي الأقواس

المثال ملف إعدادات [[app.yaml]]. في JSON كنت هتكتب [[{ }]] و [[[ ]]] عشان تقول مين جوه مين، في YAML المسافات اللي في أول السطر هي اللي بتقول. هنفكه حتة حتة، وبعدين نحوّله JSON عشان نشوف الهيكل الحقيقي، ونبوّظه ٤ مرات.

---

## ١. التعليق ومفتاح قيمته object

~~~yaml
# إعدادات التطبيق
app:
  name: gym-portal
  port: 3000
  debug: false
  version: "1.10"
~~~

- [[#]] لحد آخر السطر تعليق، الـ parser بيرميه.
- [[app:]] ومفيش حاجة بعد [[:]]: يعني القيمة جاية في السطور اللي تحت.
- السطور اللي داخلة بمسافتين كلها **جوه** [[app]]. كل واحد منهم [[key: value]]: مفتاح، و [[:]]، و **مسافة**، والقيمة.

وكل قيمة YAML بيخمّن نوعها من شكلها:

| السطر | النوع اللي اتقرا |
|---|---|
| [[name: gym-portal]] | نص (string) |
| [[port: 3000]] | رقم صحيح (int) |
| [[debug: false]] | boolean |
| [[version: "1.10"]] | نص، عشان التنصيص. من غيره كان هيبقى الرقم [[1.1]] |

---

## ٢. مفتاح جديد في المستوى الأول، و null

~~~yaml
database:
  host: localhost
  password: null
  pool: 10
~~~

[[database]] راجع لأول السطر (صفر مسافات)، فهو أخو [[app]] مش جواه. و [[null]] معناها «مفيش قيمة» (في Python بتبقى [[None]]).

---

## ٣. list بـ [[-]]

~~~yaml
admins:
  - sara@example.com
  - ali@example.com
~~~

[[-]] ومسافة في أول السطر = عنصر في list. فـ [[admins]] قيمته ليستة فيها نصين. والمسافة بعد [[-]] إجبارية زي اللي بعد [[:]]: جرّبت [[-sara]] من غير مسافة، PyYAML قرا [[admins]] كله نص واحد [['-sara - ali']] من غير ما يقول غلط.

---

## ٤. نفس الحاجة في سطر واحد (flow style)

~~~yaml
features: [login, booking]
limits: {daily: 5, monthly: 100}
~~~

[[[ ]]] ليستة، و [[{ }]] object، والعناصر بينها [[,]]. ده شكل JSON تقريبًا بس من غير تنصيص إجباري. وفعلًا أي JSON سليم ينفع يتقري كـ YAML.

---

## ٥. list عناصرها objects

~~~yaml
servers:
  - name: web-1
    ip: 10.0.0.5
  - name: web-2
    ip: 10.0.0.6
~~~

دي أكتر حتة بتلخبط. كل [[-]] بيبدأ عنصر جديد، وأول مفتاح في العنصر بييجي على نفس سطر الـ [[-]]. السطر اللي بعده [[ip:]] داخل ٤ مسافات، يعني تحت حرف [[n]] بتاع [[name]] بالظبط، فهو في **نفس** الـ object. والنتيجة ليستة فيها object-ين.

---

## ٦. نحوّله JSON عشان نشوف الهيكل

~~~python
import yaml, json
data = yaml.safe_load(open("app.yaml", encoding="utf-8"))
print(json.dumps(data, ensure_ascii=False))
~~~

- [[yaml]]: مكتبة PyYAML (بتتسطّب بـ [[pip install pyyaml]]).
- [[safe_load]]: اقرا YAML لـ dict و list عادية. «safe» يعني مش هيعمل objects من أنواع Python عشوائية لو الملف طلبها، فاستخدمه دايمًا بدل [[load]].
- [[json.dumps]]: حوّل النتيجة لنص JSON. و [[ensure_ascii=False]] عشان أي عربي يفضل عربي مش [[س]].

اتشغّل بـ PyYAML 6.0.3 على ويندوز (Python 3.14):

~~~text الناتج
{"app": {"name": "gym-portal", "port": 3000, "debug": false, "version": "1.10"}, "database": {"host": "localhost", "password": null, "pool": 10}, "admins": ["sara@example.com", "ali@example.com"], "features": ["login", "booking"], "limits": {"daily": 5, "monthly": 100}, "servers": [{"name": "web-1", "ip": "10.0.0.5"}, {"name": "web-2", "ip": "10.0.0.6"}]}
~~~

لاحظ إن [[10.0.0.5]] فضل نص (فيه أكتر من نقطة فمش رقم). و PowerShell مفيهوش أمر YAML جاهز ([[ConvertFrom-Yaml]] من module خارجي اسمه powershell-yaml)، فالأسهل على ويندوز Python أو Node.

---

## ٧. نبوّظه ٤ مرات

| الغلطة | PyYAML 6.0.3 | js-yaml 5.4.3 (Node) |
|---|---|---|
| Tab قبل [[name]] | [[found character '\t' that cannot start any token]] (line 3) | [[tab characters must not be used in indentation (3:1)]] |
| مسافة زيادة قبل [[port]] (٣ بدل ٢) | [[mapping values are not allowed here]] (line 4, column 8) | [[bad indentation of a mapping entry (4:8)]] |
| [[pool:10]] من غير مسافة | [[could not find expected ':']] (line 11) | [[expected ':' after a mapping key (10:10)]] |
| [[-sara]] من غير مسافة | مفيش غلط! القيمة بقت نص | نفس الكلام |

### ليه المسافة الزيادة بتعمل [[mapping values are not allowed here]]؟

[[port]] بقى داخل أكتر من [[name]] اللي فوقه، فالـ parser فهمه **تكملة** لقيمة [[name]]، يعني القيمة بقت [[gym-portal port]]. وبعدها لقى [[: ]] جوه قيمة نصية من غير تنصيص، وده ممنوع.

### ليه [[pool:10]] غلط؟

الـ [[:]] بتبقى فاصل بين مفتاح وقيمة **بس** لو بعدها مسافة. [[pool:10]] من غير مسافة نص واحد، والـ parser جوه object مستني [[مفتاح: قيمة]]، فلما السطر خلص من غير [[: ]] اشتكى. ولو [[pool:10]] كان لوحده في ملف، الملف كله كان هيتقري النص [['pool:10']] من غير أي غلط.

---

## ٨. [[yamllint]]

~~~bash
yamllint app.yaml
~~~

~~~text الناتج (yamllint من pip، على ويندوز)
app.yaml
  2:1       warning  missing document start "---"  (document-start)
~~~

[[2:1]] يعني سطر ٢ عمود ١، و [[warning]] تنبيه مش غلط: yamllint بيحب الملف يبدأ بـ [[---]] (علامة بداية مستند). ده ذوق، والملف سليم.

---

## الخلاصة

| الشكل | معناه |
|---|---|
| [[key: value]] | مفتاح وقيمة، والمسافة بعد [[:]] إجبارية |
| مسافتين أكتر من اللي فوق | جوه اللي فوق |
| [[- x]] | عنصر في list |
| [[[a, b]]] و [[{a: 1}]] | list و object في سطر واحد |
| [[#]] | تعليق |
| [[null]] أو [[~]] | مفيش قيمة |

Tab ممنوع، والمسافات لازم تبقى متساوية بالظبط لكل اللي في نفس المستوى.`,
          lines: [
            R`مفتاح [[app]] قيمته object، فمفيش حاجة بعد [[:]] والسطور اللي تحته داخلة بمسافتين.`,
            R`مسافتين يعني جوه [[app]]. نص من غير تنصيص.`,
            R`رقم.`,
            R`boolean: [[false]].`,
            R`[["1.10"]] متنصص عشان يفضل نص، من غير تنصيص كان هيبقى الرقم [[1.1]].`,
            R`رجعنا لأول السطر: مفتاح جديد في المستوى الأول.`,
            R`جوه [[database]].`,
            R`[[null]]: مفيش قيمة.`,
            R`رقم.`,
            R`مفتاح قيمته list، وعناصرها تحته.`,
            R`[[-]] ومسافة: أول عنصر في الـ list.`,
            R`العنصر التاني.`,
            R`list في سطر واحد بين [[[ ]]] (flow style)، زي JSON بس من غير تنصيص.`,
            R`object في سطر واحد بين [[{ }]].`,
            R`list عناصرها objects.`,
            R`[[-]] بيبدأ عنصر جديد، وأول مفتاح فيه على نفس السطر.`,
            R`[[ip]] بنفس مستوى [[name]] بالظبط (تحت الـ [[n]])، فهما في نفس الـ object.`,
            R`[[-]] تاني: object تاني في نفس الـ list.`,
            R`مفتاحه التاني.`
          ],
          sol: R`الـ JSON الناتج (مختصر):
[[{"app": {"name": "gym-portal", "port": 3000, "debug": false, "version": "1.10"}, "database": {"host": "localhost", "password": null, "pool": 10}, "admins": ["sara@example.com", "ali@example.com"], "features": ["login", "booking"], "limits": {"daily": 5, "monthly": 100}, "servers": [{"name": "web-1", "ip": "10.0.0.5"}, {"name": "web-2", "ip": "10.0.0.6"}]}]]

الأخطاء (رسايل PyYAML):
• Tab: [[found character '\t' that cannot start any token]] ومعاها رقم السطر.
• مسافة زيادة قبل [[port]]: [[mapping values are not allowed here]] على نفس السطر، لأن [[port]] بقى شكله تكملة لقيمة [[name]].
• [[pool:10]] من غير مسافة: [[could not find expected ':']] على السطر اللي بعده. من غير المسافة [[pool:10]] بقى نص واحد مش مفتاح، والـ parser لسه مستني [[:]] ومسافة. ولو السطر ده لوحده في ملف مش هيبقى غلط خالص: الملف كله هيتقري النص [['pool:10']] ساكت، وده أخطر.

و [[yamllint app.yaml]] بيقول تنبيه بس: [[2:1 warning missing document start "---" (document-start)]] (yamllint عايز [[---]] في الأول، وده ذوق مش غلط).`
        },
        {
          cmd: "YAML النصوص",
          title: "تكتب نص في YAML إزاي: من غير تنصيص و ' و \" والنص الطويل بـ | و >؟",
          desc: R`أغلب النصوص في YAML بتتكتب من غير تنصيص. بس فيه حالات لازم تنصّص فيها، وفيه طريقتين للنص اللي على كذا سطر.

التلات أشكال للنص في سطر واحد:
• من غير تنصيص (plain): [[name: سارة]]. ممنوع يبقى فيه [[: ]] (نقطتين ومسافة) أو [[ #]] (مسافة وشباك)، ومينفعش يبدأ برموز زي [[- ? : , [ ] { } # & * ! | > ' " % @]] والـ backtick.
• [['...']] تنصيص مفرد: كل حاجة جواه حرفية، مفيش escape خالص. و [[']] جواه بتتكتب مرتين: [['Ali''s gym']].
• [["..."]] تنصيص مزدوج: الوحيد اللي فيه escape زي JSON: [[\n]] سطر جديد، و [[\t]]، و [[\"]]، و [[\\]]. ولو عندك مسار ويندوز فيه [[\]] متحطوش في [["]] (أو اكتب [[\\]]).

قاعدة سريعة: لو مش متأكد، حطه في [[']]. ولو محتاج [[\n]]، في [["]].

النص على كذا سطر (block scalars):
• [[|]] (literal): السطور بتفضل زي ما هي بالظبط، كل سطر جديد بيفضل سطر جديد. استخدمه للسكربتات والشهادات والرسايل: [[run: |]] في GitHub Actions وتحته كذا أمر.
• [[>]] (folded): السطور بتتلزق في سطر واحد بمسافات. استخدمه لجملة طويلة عايز تقسمها في الملف بس.
• بعد [[|]] أو [[>]] ممكن تكتب [[-]] ([[|-]]): شيل السطر الجديد اللي في آخر النص. أو [[+]]: سيب كل السطور الفاضية اللي في الآخر.
• محتوى البلوك لازم يبقى داخل بمسافات أكتر من المفتاح.

التعليقات: [[#]] بيبدأ تعليق لو قبله مسافة أو في أول السطر. فـ [[note: نص # كلام]] القيمة [[نص]] بس، أما [[color: #ff0000]] فالقيمة فاضية والباقي تعليق! لازم [[color: "#ff0000"]].`,
          example: R`plain: أهلًا بيك
single: 'Ali''s gym: #1'
double: "سطر أول\nسطر تاني"
path: C:\Users\ali
literal: |
  السطر الأول
  السطر التاني
folded: >
  جملة طويلة
  بتتكمل هنا
strip: |-
  من غير سطر جديد في الآخر
comment: نص # ده تعليق
hash: نص#مش تعليق`,
          flag: "script",
          try: R`احفظ المثال في [[text.yaml]] واطبع كل قيمة بشكلها الحقيقي: [[python3 -c 'import yaml; [print(k, "=>", repr(v)) for k, v in yaml.safe_load(open("text.yaml")).items()]']]. قارن [[literal]] و [[folded]] و [[strip]]. بعدين ضيف سطر [[color: #ff0000]] وشوف قيمته، وصلّحه. وجرّب [[msg: Error: not found]].`,
          deep: {
            why: R`YAML عايز يبقى مريح، فسمح بالنص من غير تنصيص. بس ده معناه إن بعض الرموز لما تيجي في النص الـ parser بيفهمها كجزء من الصيغة. التنصيص هو الطريقة اللي بتقول بيها «ده نص وبس». والـ [[|]] اتعمل عشان الحاجات اللي السطور فيها مهمة (سكربت، شهادة SSL، مفتاح) تتكتب زي ما هي من غير [[\n]].`,
            how: R`في [[|]] الـ parser بياخد كل السطور اللي داخلة أكتر من المفتاح، ويشيل المسافات اللي في أولها بقدر مسافة أول سطر، ويحط [[\n]] بين كل سطر والتاني وواحدة في الآخر. في [[>]] بيحط مسافة بدل كل [[\n]] (إلا السطور الفاضية بتفضل سطور جديدة). و [[-]] بيشيل الـ [[\n]] الأخيرة.`,
            when: R`[[|]] لأوامر [[run:]] في GitHub Actions، و [[command:]] الطويلة، والشهادات والمفاتيح في Kubernetes Secrets، ورسايل متعددة السطور. والتنصيص لأي قيمة فيها رموز أو ممكن تتفهم رقم أو boolean.`,
            mistakes: R`لون hex أو قناة Slack من غير تنصيص ([[#general]]) فتبقى تعليق والقيمة null. رسالة فيها [[: ]] من غير تنصيص فيطلعلك [[mapping values are not allowed here]]. مسار ويندوز في [["]] فـ [[\U]] يتفهم escape ويوقّع الملف. وتنسى إن [[|]] بيحط [[\n]] في الآخر فـ token أو باسورد يبقى في آخره سطر جديد ومش بيتطابق، استخدم [[|-]].`
          },
          teach: R`## الفكرة: ٣ أشكال للنص في سطر، و ٣ للنص الطويل

المثال ملف [[text.yaml]] فيه كل طرق كتابة النص. هنفك كل سطر، وبعدين نطبع القيمة الحقيقية اللي البرنامج بيشوفها بـ [[repr]] عشان السطور الجديدة والمسافات تبان.

---

## ١. نص من غير تنصيص (plain)

~~~yaml
plain: أهلًا بيك
~~~

أسهل شكل. المسافة جوه النص عادي. الممنوع: [[: ]] (نقطتين بعدهم مسافة) أو [[ #]] (مسافة بعدها شباك) جوه النص، أو إن النص يبدأ برمز ليه معنى في YAML زي [[-]] و [[[]] و [[{]] و [[#]] و [[&]] و [[*]].

---

## ٢. تنصيص مفرد: كل حاجة حرفية

~~~yaml
single: 'Ali''s gym: #1'
~~~

- جوه [[']] الـ [[: ]] و [[#]] مالهمش أي معنى، نص عادي.
- مفيش escape خالص: [[\n]] جوه [[']] بتفضل شرطة مايلة وحرف n.
- الحرف الوحيد المشكلة هو [[']] نفسه، فبيتكتب مرتين: [[Ali''s]] تبقى [[Ali's]].

---

## ٣. تنصيص مزدوج: فيه escape

~~~yaml
double: "سطر أول\nسطر تاني"
~~~

جوه [["]] الشرطة المايلة [[\]] بتبدأ escape زي JSON: [[\n]] سطر جديد حقيقي، و [[\t]] Tab، و [[\"]] علامة تنصيص، و [[\\]] شرطة واحدة.

---

## ٤. مسار ويندوز

~~~yaml
path: C:\Users\ali
~~~

من غير تنصيص الـ [[\]] حرف عادي، فالمسار سليم. لكن لو حطيته في [["]]:

~~~yaml
path: "C:\Users\ali"
~~~

~~~text الناتج
PyYAML:  expected escape sequence of 8 hexadecimal numbers, but found 's'
js-yaml: expected hexadecimal character (1:12)
~~~

[[\U]] جوه [["]] معناها «حرف Unicode برقمه، وبعدي ٨ أرقام hex»، ولقى [[sers]] فوقع. الحل: من غير تنصيص، أو [[']]، أو [["C:\\Users\\ali"]].

---

## ٥. [[|]]: النص بسطوره (literal)

~~~yaml
literal: |
  السطر الأول
  السطر التاني
~~~

[[|]] بعد المفتاح معناها «اللي تحت نص، وخد السطور زي ما هي». الـ parser بيشيل المسافات اللي في أول السطور (بقد مسافة أول سطر)، ويحط سطر جديد [[\n]] بين كل سطر والتاني، **وواحد كمان في الآخر**.

---

## ٦. [[>]]: السطور تتلزق (folded)

~~~yaml
folded: >
  جملة طويلة
  بتتكمل هنا
~~~

[[>]] معناها «الجملة دي طويلة، أنا قسمتها في الملف عشان القراية بس». كل سطر جديد بيتحوّل مسافة، وبرضه [[\n]] واحدة في الآخر. ولو سبت سطر فاضي جوه البلوك بيفضل سطر جديد حقيقي: جرّبت [[a]] و [[b]] وسطر فاضي و [[c]] وطلع [['a b\nc\n']].

---

## ٧. [[|-]]: من غير السطر الجديد اللي في الآخر

~~~yaml
strip: |-
  من غير سطر جديد في الآخر
~~~

العلامة بعد [[|]] أو [[>]] اسمها chomping indicator (بتقول تعمل إيه في آخر النص):

| العلامة | آخر النص |
|---|---|
| [[|]] أو [[>]] | [[\n]] واحدة بس |
| [[|-]] أو [[>-]] | ولا [[\n]] (strip = شيل) |
| [[|+]] أو [[>+]] | كل السطور الفاضية اللي في الآخر (keep = سيب) |

جرّبت [[|+]] وتحته [[a]] وسطرين فاضيين، وطلعت القيمة [['a\n\n\n']].

---

## ٨. [[#]]: تعليق ولا جزء من النص؟

~~~yaml
comment: نص # ده تعليق
hash: نص#مش تعليق
~~~

[[#]] بتبدأ تعليق **بس** لو قبلها مسافة (أو في أول السطر). في السطر الأول قبلها مسافة، فالقيمة [[نص]] بس. في التاني ملزوقة في الكلمة، فهي جزء من النص.

---

## ٩. نطبع القيم الحقيقية

~~~python
import yaml
for k, v in yaml.safe_load(open("text.yaml", encoding="utf-8")).items():
    print(k, "=>", repr(v))
~~~

- [[.items()]]: كل مفتاح وقيمته. و [[for k, v]] بيفك الاتنين في متغيرين.
- [[repr(v)]]: اطبع النص بتنصيصه وبالـ [[\n]] ظاهرة، عشان تشوف السطور الجديدة اللي مش باينة.

~~~text الناتج (PyYAML 6.0.3، و js-yaml 5.4.3 و yaml 2.9 في Node طلّعوا نفس القيم)
plain => 'أهلًا بيك'
single => "Ali's gym: #1"
double => 'سطر أول\nسطر تاني'
path => 'C:\\Users\\ali'
literal => 'السطر الأول\nالسطر التاني\n'
folded => 'جملة طويلة بتتكمل هنا\n'
strip => 'من غير سطر جديد في الآخر'
comment => 'نص'
hash => 'نص#مش تعليق'
~~~

- [[single]] اتطبع بين [["]] لأن جواه [[']]، Python بيختار التنصيص اللي ميحتاجش escape.
- [[path]] ظاهر بـ [[\\]] لأن [[repr]] بيهرّب الشرطة. القيمة الحقيقية فيها شرطة واحدة.
- قارن [[literal]] (فيه [[\n]] في النص) و [[folded]] (مسافة بدلها) و [[strip]] (مفيش [[\n]] في الآخر).

---

## ١٠. الفخين اللي في التجربة

~~~yaml
color: #ff0000
msg: Error: not found
~~~

~~~text الناتج (PyYAML، كل سطر في ملف لوحده)
{'color': None}

mapping values are not allowed here
  in "msg.yaml", line 1, column 11
~~~

- [[color]]: [[ #ff0000]] قبلها مسافة، فبقت تعليق، والقيمة فاضية يعني [[None]]. ومفيش أي غلط يحذرك!
- [[msg]]: [[Error: not found]] فيها [[: ]] تانية، فالـ parser فاكرها مفتاح جديد جوه قيمة، وده ممنوع.

والحل للاتنين تنصيص: [[color: "#ff0000"]] و [[msg: "Error: not found"]].

---

## الخلاصة

| الشكل | امتى |
|---|---|
| من غير تنصيص | نص عادي مفيهوش [[: ]] ولا [[ #]] ومش بيبدأ برمز |
| [['...']] | فيه رموز، وعايزه حرفي (مسارات ويندوز كمان) |
| [["..."]] | محتاج [[\n]] أو escape |
| [[|]] | سكربت، شهادة، أي نص السطور فيه مهمة |
| [[>]] | جملة طويلة متقسمة في الملف بس |
| [[|-]] | زي [[|]] من غير [[\n]] في الآخر (tokens وباسوردات) |`,
          lines: [
            R`نص عادي من غير تنصيص.`,
            R`تنصيص مفرد: [[: ]] و [[#]] جواه آمنين، و [['']] معناها [[']] واحدة.`,
            R`تنصيص مزدوج: [[\n]] بتبقى سطر جديد حقيقي.`,
            R`من غير تنصيص الـ [[\]] بتفضل زي ما هي، فالمسار سليم.`,
            R`[[|]]: النص اللي تحت هيتاخد بسطوره.`,
            R`أول سطر في النص (داخل بمسافتين).`,
            R`تاني سطر.`,
            R`[[>]]: السطور اللي تحت هتتلزق في سطر واحد.`,
            R`أول حتة من الجملة.`,
            R`هتتلزق في اللي فوقها بمسافة.`,
            R`[[|-]]: زي [[|]] بس من غير [[\n]] في الآخر.`,
            R`النص.`,
            R`[[ #]] بمسافة قبلها بتبدأ تعليق، فالقيمة [[نص]] بس.`,
            R`[[#]] من غير مسافة قبلها جزء من النص.`
          ],
          sol: R`الناتج الحقيقي:
[[plain => 'أهلًا بيك']]
[[single => "Ali's gym: #1"]]
[[double => 'سطر أول\nسطر تاني']] (فيها سطر جديد حقيقي)
[[path => 'C:\\Users\\ali']] (Python بيعرض الـ [[\]] مرتين، بس هي واحدة)
[[literal => 'السطر الأول\nالسطر التاني\n']]
[[folded => 'جملة طويلة بتتكمل هنا\n']]
[[strip => 'من غير سطر جديد في الآخر']]
[[comment => 'نص']]
[[hash => 'نص#مش تعليق']]

[[color: #ff0000]] قيمتها [[None]]. والتصليح: [[color: "#ff0000"]].
و [[msg: Error: not found]] بيطلّع [[mapping values are not allowed here]]، والتصليح [[msg: "Error: not found"]].`
        },
        {
          cmd: "مشكلة النرويج",
          title: "ليه NO في YAML ممكن تبقى false، و 1.10 تبقى 1.1، و 22:22 تبقى رقم؟",
          desc: R`لأن YAML بيخمّن نوع أي قيمة من غير تنصيص، والتخمين ده ساعات بيطلع غلط وانت مش واخد بالك. أشهر مثال اسمه «مشكلة النرويج» (The Norway Problem): ليستة كودات بلاد [[[EG, SA, NO]]]، والـ [[NO]] (كود النرويج) اتقرت [[false]].

ليه؟ YAML 1.1 (النسخة القديمة، واللي مكتبات كتير لسه ماشية عليها زي PyYAML) بيعتبر الكلمات دي كلها boolean: [[yes]] و [[no]] و [[on]] و [[off]] و [[true]] و [[false]]، بأي حالة حروف ([[Yes]] و [[NO]]...). وفيه فخاخ تانية:
• [[version: 1.10]] ← الرقم [[1.1]]. ورقم النسخة [[3.0]] يبقى [[3]] في بعض اللغات.
• [[zip: 01234]] ← رقم بالـ octal ([[668]]) في YAML 1.1، أو [[1234]] من غير الصفر في 1.2.
• [[ports: 22:22]] ← الرقم [[1342]] في YAML 1.1 (بيتقري ستيني زي الساعات: 22×60+22). وده سبب إن Docker Compose بيقولك اكتب البورتات بين تنصيص.
• [[time: 12:30]] ← [[750]].
• [[date: 2026-10-01]] ← تاريخ مش نص في PyYAML.
• [[~]] و [[null]] وقيمة فاضية ← null.
• [[.inf]] (ما لا نهاية) و [[0x1F]] (hex يعني 31) ← أرقام. و [[1e3]] ← [[1000]] في YAML 1.2، بس PyYAML بيسيبه نص لأن YAML 1.1 عايز نقطة وإشارة ([[1.0e+3]]).

YAML 1.2 (من 2009، وماشي عليه js-yaml 4 و go-yaml v3 اللي Docker Compose و Kubernetes بيستخدموه) صلّح أغلب ده: [[true]] و [[false]] بس هما الـ boolean، ومفيش ستيني. بس انت مش دايمًا عارف الأداة بتقرا بأنهي نسخة.

الحل الوحيد الأكيد: أي قيمة عايزها نص وشكلها ممكن يتفهم حاجة تانية، حطها بين تنصيص: [["NO"]] و [["1.10"]] و [["22:22"]] و [["01234"]] و [["on"]].`,
          example: R`countries: [EG, SA, NO]
answer: yes
switch: on
version: 1.10
ports: 22:22
zip: 01234
time: 12:30
empty:
tilde: ~
date: 2026-10-01
safe: "NO"`,
          flag: "script",
          try: R`احفظ المثال في [[norway.yaml]] واقراه بـ PyYAML (YAML 1.1): [[python3 -c 'import yaml; [print(k, "=>", repr(v)) for k, v in yaml.safe_load(open("norway.yaml")).items()]']]. وبعدين بـ js-yaml (YAML 1.2): [[npx -y js-yaml norway.yaml]]. قارن الاتنين سطر سطر. وبعدين حل التمرين تحت.`,
          deep: {
            why: R`YAML اتصمم إن الإنسان يكتب [[enabled: yes]] زي ما بيتكلم، فحاولوا يخمنوا النوع من شكل الكلمة. ده بيبقى لطيف في الإعدادات البسيطة، بس كارثي لما الداتا نفسها فيها كلمات أو أرقام بالشكل ده (كودات بلاد، أرقام نسخ، أكواد بريد، بورتات).`,
            how: R`الـ parser عنده ليستة patterns (اسمها schema): لو القيمة من غير تنصيص وماشية على pattern الـ boolean تبقى boolean، أو pattern الرقم تبقى رقم، وإلا تبقى نص. YAML 1.1 الـ patterns بتاعته واسعة جدًا، و 1.2 ضيّقها. التنصيص بيوقّف التخمين خالص: أي حاجة بين [["]] أو [[']] نص.`,
            when: R`كل ما تكتب في YAML: كودات (بلاد، منتجات، بريد)، أرقام نسخ، بورتات، أوقات، أو أي حاجة شكلها رقم بس هي مش للحساب. وخصوصًا في [[compose.yaml]] (البورتات والـ [[restart: "no"]]) و GitHub Actions (أرقام النسخ في [[node-version: "20"]]).`,
            mistakes: R`[[restart: no]] في compose من غير تنصيص (Docker بيطلب [["no"]] عشان متبقاش false). [[python-version: 3.10]] في GitHub Actions بيبقى [[3.1]] وتلاقي الـ CI بينزّل Python 3.1! اكتب [["3.10"]]. وتفتكر إن «اشتغل عندي» يكفي: نفس الملف ممكن يتقري صح بأداة وغلط بأداة تانية.`
          },
          teach: R`## الفكرة: YAML بيخمّن النوع من شكل الكلمة

أي قيمة من غير تنصيص الـ parser بيقارنها بليستة أشكال: لو شبه boolean تبقى boolean، لو شبه رقم تبقى رقم، وإلا نص. المشكلة إن الليستة دي مختلفة بين نسختين من YAML:

| | YAML 1.1 (سنة 2005) | YAML 1.2 (سنة 2009) |
|---|---|---|
| boolean | [[yes]] و [[no]] و [[on]] و [[off]] و [[true]] و [[false]] بأي حروف | [[true]] و [[false]] بس |
| أرقام بـ [[:]] | ستيني زي الساعة | مفيش، نص |
| صفر في الأول | octal (أساس ٨) | رقم عادي |
| مين ماشي عليها | PyYAML | js-yaml و go-yaml v3 (Docker Compose و Kubernetes) |

هنقرا ملف [[norway.yaml]] اللي في المثال بالنسختين ونقارن سطر سطر.

---

## ١. نقراه بـ PyYAML (YAML 1.1)

~~~python
import yaml
for k, v in yaml.safe_load(open("norway.yaml")).items():
    print(k, "=>", repr(v))
~~~

~~~text الناتج (PyYAML 6.0.3 على ويندوز، و PyYAML 6.0.1 في ubuntu:24.04 نفس الكلام)
countries => ['EG', 'SA', False]
answer => True
switch => True
version => 1.1
ports => 1342
zip => 668
time => 750
empty => None
tilde => None
date => datetime.date(2026, 10, 1)
safe => 'NO'
~~~

## ٢. ونقراه بـ js-yaml (YAML 1.2)

~~~bash
npx -y js-yaml norway.yaml
~~~

[[npx]] بيشغّل أداة من npm من غير ما تتسطّب على الجهاز، و [[-y]] يعني «وافق على التنزيل من غير ما تسألني». أداة [[js-yaml]] بتطبع الملف JSON:

~~~text الناتج (js-yaml 5.4.3 على Node 24)
{
  "countries": [
    "EG",
    "SA",
    "NO"
  ],
  "answer": "yes",
  "switch": "on",
  "version": 1.1,
  "ports": "22:22",
  "zip": 1234,
  "time": "12:30",
  "empty": null,
  "tilde": null,
  "date": "2026-10-01",
  "safe": "NO"
}
~~~

و [[yq]] (مبني على go-yaml v3، اتشغّل جوه [[ubuntu:24.04]]) طلّع نفس أنواع js-yaml.

---

## ٣. نفسّر كل سطر

### [[countries: [EG, SA, NO]]]

[[NO]] شكلها boolean في 1.1، فبقت [[False]]. كود النرويج اختفى من الليستة ومفيش أي غلط. ده سبب اسم المشكلة.

### [[answer: yes]] و [[switch: on]]

في 1.1 الاتنين [[True]]. في 1.2 الاتنين نص.

### [[version: 1.10]]

الاتنين قروه **رقم عشري**، والرقم [[1.10]] هو نفسه [[1.1]]. فالصفر ضاع في النسختين. ده مش خطأ في الـ parser، ده رقم فعلًا، وانت كنت قاصد نص.

### [[ports: 22:22]]

YAML 1.1 بيعتبر الأرقام اللي بينها [[:]] أرقام بالأساس ستين (sexagesimal)، زي الساعات والدقايق:

~~~text الحساب
22:22  =  22 × 60 + 22  =  1342
12:30  =  12 × 60 + 30  =  750
~~~

وبيشترط إن كل جزء بعد الأول من [[0]] لـ [[59]] (زي الدقايق). فـ [[8080:80]] فضلت نص في PyYAML لأن [[80]] أكبر من [[59]]، لكن [[59:59]] بقت [[3599]]. يعني بورت شغال وبورت بايظ في نفس الملف! في 1.2 الاتنين نصوص.

### [[zip: 01234]]

في 1.1 الصفر في الأول معناه **octal** (أساس ٨):

~~~text الحساب
01234 (octal)  =  1×512 + 2×64 + 3×8 + 4  =  668
~~~

في 1.2 بقى [[1234]] رقم عادي، والصفر برضه ضاع.

### [[empty:]] و [[tilde: ~]]

قيمة فاضية و [[~]] الاتنين null في النسختين ([[None]] في Python).

### [[date: 2026-10-01]]

PyYAML قراه **تاريخ** ([[datetime.date]]) مش نص. js-yaml 5 سابه نص.

### [[safe: "NO"]]

متنصص، فنص في الكل. ده الحل.

---

## ٤. فخاخ تانية جرّبتها

~~~yaml
on:
  push:
mode: 0755
python: 3.10
restart: no
~~~

| السطر | PyYAML (1.1) | js-yaml (1.2) |
|---|---|---|
| [[on:]] كمفتاح | المفتاح نفسه بقى [[True]] | [["on"]] |
| [[mode: 0755]] | [[493]] (octal) | [[755]] |
| [[python: 3.10]] | [[3.1]] | [[3.1]] |
| [[restart: no]] | [[False]] | [["no"]] |
| [[1e3]] | النص [['1e3']] | [[1000]] |

- [[on:]] ده أول سطر في أي GitHub Actions workflow. لو قريت الملف بـ PyYAML في سكربت هتلاقي المفتاح [[True]] مش [["on"]]. GitHub نفسه بيقراه صح (ده من سلوكه المعروف، مش متجرّب هنا).
- [[0755]] صلاحيات ملفات لينكس مكتوبة octal. في PyYAML بقت [[493]] (وده فعلًا نفس الرقم بالعشري)، وفي 1.2 بقت [[755]] بالعشري، ولو اتستخدمت كصلاحيات هتبقى رقم غلط تمامًا. اكتبها [["0755"]] أو [[0o755]] (شكل 1.2، اللي PyYAML بيقراه نص).

---

## ٥. التمرين

التمرين بيطلب دالة بتقول هل قيمة محتاجة تنصيص. فكّر فيها كـ ٤ أسئلة ورا بعض، أي واحد إجابته «آه» يبقى محتاجة:

1. هل شكلها boolean أو null في **أي** نسخة؟ (الكلمات اللي في جدول أول الدرس بأي حروف، و [[~]]، والنص الفاضي)
2. هل شكلها رقم؟ (بإشارة أو من غير، بكسور، بـ [[e]]، بصفر في الأول)
3. هل شكلها أرقام بينها [[:]]؟
4. هل فيها [[: ]] أو [[ #]]، أو بتبدأ برمز من رموز YAML؟

خلي بالك إن السؤال «لازم تنصيص؟» مش «هيتقري إيه؟»: [[1e3]] PyYAML بيسيبه نص، بس js-yaml بيخليه رقم، فهو محتاج تنصيص.

---

## الخلاصة

| القيمة | من غير تنصيص ممكن تبقى | اكتبها |
|---|---|---|
| [[NO]] و [[yes]] و [[on]] و [[off]] | boolean | [["NO"]] |
| [[1.10]] و [[3.10]] | [[1.1]] و [[3.1]] | [["1.10"]] |
| [[22:22]] و [[12:30]] | [[1342]] و [[750]] | [["22:22"]] |
| [[01234]] و [[0755]] | [[668]] و [[493]] أو الصفر يضيع | [["01234"]] |
| [[2026-10-01]] | تاريخ | [["2026-10-01"]] |

القاعدة: أي قيمة عايزها نص وشكلها ممكن يتفهم حاجة تانية، نصّصها. التنصيص شغال في كل النسخ وكل الأدوات.`,
          lines: [
            R`[[NO]] من غير تنصيص: في YAML 1.1 بتبقى [[false]].`,
            R`[[yes]] ← [[true]] في YAML 1.1.`,
            R`[[on]] ← [[true]] كمان.`,
            R`رقم عشري: الصفر اللي في الآخر بيضيع ← [[1.1]].`,
            R`رقمين بينهم [[:]] ← رقم ستيني [[1342]] في YAML 1.1.`,
            R`صفر في الأول ← octal أو بيضيع.`,
            R`نفس فكرة البورتات ← [[750]].`,
            R`قيمة فاضية ← null.`,
            R`[[~]] ← null.`,
            R`تاريخ حقيقي في PyYAML، ونص في أدوات تانية.`,
            R`متنصص: نص [["NO"]] في كل الأدوات. ده الحل.`
          ],
          sol: R`PyYAML (YAML 1.1) بيطبع:
[[countries => ['EG', 'SA', False]]]
[[answer => True]]
[[switch => True]]
[[version => 1.1]]
[[ports => 1342]]
[[zip => 668]]
[[time => 750]]
[[empty => None]]
[[tilde => None]]
[[date => datetime.date(2026, 10, 1)]]
[[safe => 'NO']]

و js-yaml (YAML 1.2) بيطبع JSON فيه: [["NO"]] و [["yes"]] و [["on"]] نصوص، و [[1.1]] (برضه ضاع الصفر)، و [["22:22"]] و [["12:30"]] نصوص، و [[1234]] (الصفر ضاع برضه)، و [[null]] للاتنين، و [["NO"]].

يعني حتى YAML 1.2 بوّظ [[version]] و [[zip]]. التنصيص هو الحل الوحيد اللي شغال في الاتنين.`,
          check: {
            lang: "js",
            starter: R`// needsQuotes: هل القيمة دي لازم تتحط بين تنصيص في YAML عشان تفضل نص؟
// true لو: شكلها boolean أو null (yes/no/on/off/true/false/null/~ بأي حروف، أو فاضية)
//          أو شكلها رقم (1.10 و 01234 و 22:22 و -5 و 1e3)
//          أو فيها ": " أو " #"، أو بتبدأ برمز خاص من دول: - ? : , [ ] { } # & * ! | > ' " % @
function needsQuotes(value) {
  return false;
}`,
            tests: R`test("كودات البلاد: NO و no و Yes و ON و off", () => expect(["NO", "no", "Yes", "ON", "off"].every(needsQuotes)).toBe(true));
test("true و FALSE و null و ~ والفاضي", () => expect(["true", "FALSE", "null", "~", ""].every(needsQuotes)).toBe(true));
test("شكلها أرقام: 1.10 و 01234 و 22:22 و -5 و 1e3 و 3000", () => expect(["1.10", "01234", "22:22", "-5", "1e3", "3000"].every(needsQuotes)).toBe(true));
test("فيها ': ' أو ' #'", () => expect([needsQuotes("Error: not found"), needsQuotes("a #b")]).toEqual([true, true]));
test("بتبدأ برمز: #ff0000 و *star و - item و @user و {x}", () => expect(["#ff0000", "*star", "- item", "@user", "{x}"].every(needsQuotes)).toBe(true));
test("نصوص عادية مش محتاجة: gym-portal و localhost و سارة و EG و nodejs 20 و a#b", () => expect(["gym-portal", "localhost", "سارة", "EG", "nodejs 20", "a#b"].some(needsQuotes)).toBe(false));`,
            solution: R`function needsQuotes(value) {
  const s = String(value);
  if (s.trim() === "") return true;
  if (/^(yes|no|on|off|true|false|null|y|n)$/i.test(s) || s === "~") return true;
  if (/^[-+]?(\d[\d_]*(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/.test(s)) return true;
  if (/^[-+]?\d+(:\d+)+(\.\d*)?$/.test(s)) return true;
  if (s.includes(": ") || s.includes(" #")) return true;
  return /^[-?:,\[\]{}#&*!|>'"%@$__bt]/.test(s);
}`
          }
        },
        {
          cmd: "YAML anchors",
          title: "تكرر نفس الإعدادات في YAML من غير نسخ ولزق إزاي (& و * و <<)؟",
          desc: R`لو عندك ٣ خدمات في [[compose.yaml]] كلهم ليهم نفس [[restart]] ونفس الـ [[logging]]، بدل ما تنسخهم ٣ مرات، YAML بيخليك تسمّي حتة وتستخدمها تاني:

• [[&name]] (anchor): بيتحط بعد المفتاح، بيدّي اسم للقيمة دي. [[x-common: &common]].
• [[*name]] (alias): بيستخدم القيمة اللي اسمها كده زي ما هي. [[notify: *admins]].
• [[<<: *name]] (merge key): جوه object، بينسخ كل مفاتيح الـ object اللي اسمه كده جواه. ولو كتبت نفس المفتاح تاني تحتها، قيمتك انت هي اللي بتكسب (override).

و [[x-]] في أول اسم المفتاح ده عُرف Docker Compose (وغيره): «المفتاح ده extension، تجاهله». فبتحط فيه الحتة المشتركة من غير ما Compose يشتكي إنها مش خدمة.

حاجات لازم تعرفها:
• الـ anchor لازم يتعرّف قبل ما تستخدمه (فوق في الملف).
• شغال جوه نفس الملف بس.
• [[<<]] جزء من YAML 1.1، ومش كل الأدوات بتدعمه: Compose و GitLab CI بيدعموه. GitHub Actions دعم الـ anchors و [[*]] متأخر، فاتأكد من الوثائق قبل ما تعتمد عليه.
• بعد ما الملف يتقري مفيش أثر للـ anchors: النتيجة كأنك نسخت بإيدك.`,
          example: R`x-common: &common
  restart: unless-stopped
  env_file: .env
  logging:
    driver: json-file
    options:
      max-size: "10m"
services:
  api:
    <<: *common
    image: gym-api:1.4
    ports: ["3000:3000"]
  worker:
    <<: *common
    image: gym-worker:1.4
    restart: "no"`,
          flag: "script",
          try: R`احفظ المثال في فولدر لوحده باسم [[compose.yaml]] واعمل جنبه [[.env]] فاضي ([[touch .env]])، ونفّذ [[docker compose config]]: ده بيطبع الملف بعد ما كل الـ anchors اتفكت. شوف [[worker]] أخد [[restart]] إيه. ولو مفيش Docker: [[python3 -c 'import yaml, json; print(json.dumps(yaml.safe_load(open("compose.yaml"))["services"], indent=2))']].`,
          deep: {
            why: R`ملفات الإعدادات الكبيرة فيها تكرار كتير، والتكرار معناه إنك هتعدّل في مكان وتنسى التاني. الـ anchors بتخلي الحتة المشتركة في مكان واحد من غير ما تحتاج أداة templates.`,
            how: R`وهو بيقرا، الـ parser بيحفظ أي قيمة عليها [[&]] باسمها. ولما يلاقي [[*name]] بيحط نفس القيمة. و [[<<]] مفتاح خاص: بياخد مفاتيح الـ object ويحطها في الـ object الحالي لو المفتاح مش موجود فيه أصلًا، عشان كده [[restart: "no"]] اللي في [[worker]] كسبت.`,
            when: R`Docker Compose فيه خدمات بنفس الإعدادات، و GitLab CI فيه jobs بنفس الـ setup، وأي YAML كبير فيه تكرار.`,
            mistakes: R`تستخدم [[*name]] قبل ما تعرّف [[&name]] فيطلعلك [[found undefined alias]]. تحط الحتة المشتركة في مفتاح عادي (مش [[x-]]) فـ Compose يشتكي [[additional properties ... not allowed]]. وتكتب [[<<: *common]] بعد المفاتيح وتفتكر إنه هيغطي عليها: المفاتيح اللي كتبتها بإيدك بتكسب دايمًا مهما كان ترتيبها.`
          },
          teach: R`## الفكرة: سمّي الحتة مرة، واستخدمها كذا مرة

المثال [[compose.yaml]] فيه خدمتين ([[api]] و [[worker]]) بنفس إعدادات الـ restart والـ logging. بدل ما تتكتب مرتين، اتكتبت مرة واحدة واتسمّت، وكل خدمة بتنسخها. هنفك الرموز التلاتة، وبعدين نشوف الملف بعد الفك بـ Docker Compose و Python.

---

## ١. [[&]]: الـ anchor (بيسمّي)

~~~yaml
x-common: &common
  restart: unless-stopped
  env_file: .env
  logging:
    driver: json-file
    options:
      max-size: "10m"
~~~

- [[x-common:]]: مفتاح عادي في YAML. الـ [[x-]] في أوله عُرف Docker Compose معناه «extension»، يعني Compose يتجاهله ومايعتبروش خدمة ولا إعداد غلط.
- [[&common]] بعد المفتاح: **anchor** (مرساة) اسمه [[common]]. معناه «القيمة اللي جاية (الـ object كله اللي تحت) اسمها common».
- اللي تحت عادي: [[restart]] (امتى الحاوية تقوم تاني، و [[unless-stopped]] يعني دايمًا إلا لو انت وقفتها)، و [[env_file]] (ملف المتغيرات)، و [[logging]] (اللوجات تتكتب [[json-file]] وأقصى حجم للملف [[10m]] يعني ١٠ ميجا).
- [["10m"]] متنصص عشان يفضل نص.

---

## ٢. [[<<: *common]]: انسخ المفاتيح هنا

~~~yaml
services:
  api:
    <<: *common
    image: gym-api:1.4
    ports: ["3000:3000"]
~~~

نفكها من جوه لبرة:

- [[*common]]: **alias** (اسم مستعار)، يعني «حط هنا القيمة اللي اسمها common»، يعني الـ object كله.
- [[<<:]]: **merge key**. مفتاح خاص معناه «متحطش الـ object ده كقيمة، افرد مفاتيحه جوه الـ object اللي أنا فيه».

فـ [[api]] كأنه مكتوب فيه [[restart]] و [[env_file]] و [[logging]]، وفوقهم [[image]] و [[ports]] بتوعه. و [["3000:3000"]] متنصص عشان ميبقاش رقم ستيني (درس «مشكلة النرويج»).

---

## ٣. الـ override

~~~yaml
  worker:
    <<: *common
    image: gym-worker:1.4
    restart: "no"
~~~

[[worker]] أخد نفس الحتة، بس كتب [[restart]] بنفسه. القاعدة: [[<<]] بيضيف بس المفاتيح **اللي مش موجودة** في الـ object، فاللي انت كاتبه بإيدك بيكسب دايمًا، حتى لو كتبته قبل [[<<]]. جرّبت ده:

~~~yaml
base: &b {restart: always, tty: true}
svc:
  restart: "no"
  <<: *b
~~~

~~~text الناتج (PyYAML)
'svc': {'restart': 'no', 'tty': True}
~~~

و [["no"]] متنصصة عشان متبقاش [[false]].

---

## ٤. Docker Compose بيفك الملف: [[docker compose config]]

~~~bash
touch .env
docker compose config
~~~

- [[touch .env]]: اعمل ملف [[.env]] فاضي، عشان [[env_file: .env]] بيقع لو الملف مش موجود.
- [[docker compose config]]: اقرا [[compose.yaml]] وفكّ كل حاجة (anchors ومتغيرات) واطبع النتيجة النهائية. مبيشغّلش أي حاجة.

~~~text الناتج (Docker Compose v5.3.0 على ويندوز، والجزء المهم بس)
services:
  api:
    image: gym-api:1.4
    logging:
      driver: json-file
      options:
        max-size: 10m
    ports:
      - mode: ingress
        target: 3000
        published: "3000"
        protocol: tcp
    restart: unless-stopped
  worker:
    image: gym-worker:1.4
    logging:
      driver: json-file
      options:
        max-size: 10m
    restart: "no"
x-common:
  ...
~~~

- الخدمتين فيهم [[logging]] كامل، يعني الـ merge اشتغل.
- [[api]] أخد [[restart: unless-stopped]] من الحتة المشتركة، و [[worker]] احتفظ بـ [["no"]] بتاعته.
- [[ports]] اتكتب بالشكل الطويل: [[target]] بورت الحاوية و [[published]] بورت جهازك.
- [[env_file]] مش ظاهر لأن Compose قرا الملف وحط اللي فيه تحت [[environment]]. لما حطيت [[TZ=Africa/Cairo]] في [[.env]] ظهر [[environment: TZ: Africa/Cairo]] في الخدمتين.
- Compose كمان بيضيف [[name]] للمشروع (اسم الفولدر) و [[networks]] افتراضية، وبيطبع [[x-common]] في الآخر زي ما هو.

---

## ٥. Python بيشوف نفس الحاجة

~~~python
import yaml, json
data = yaml.safe_load(open("compose.yaml"))
print(json.dumps(data["services"], indent=2))
~~~

الناتج (PyYAML 6.0.3): [[api]] و [[worker]] كل واحد فيهم [[restart]] و [[env_file]] و [[logging]] كامل و [[image]]، و [[worker]] فيه [[restart: "no"]]. يعني بعد القراية مفيش أي أثر للـ anchors، كأنك نسخت بإيدك.

### بس مش كل parser بيدعم [[<<]]

[[<<]] جزء من YAML 1.1، ومش جزء من YAML 1.2 الأساسي. جرّبت نفس الملف الصغير بتاع الـ override:

| الأداة | النتيجة |
|---|---|
| PyYAML 6.0.3 | دمج المفاتيح |
| js-yaml 5.4.3 (Node) | ساب مفتاح اسمه [["<<"]] قيمته الـ object، من غير دمج |
| مكتبة [[yaml]] 2.9 (Node) | زي js-yaml، إلا لو اديتها الخيار [[merge: true]] |
| Docker Compose | دمج |

أما [[&]] و [[*]] لوحدهم (من غير [[<<]]) فشغالين في الكل: [[list: &l [1, 2]]] وبعدها [[copy: *l]] بيدّي [[[1, 2]]] في التلاتة.

---

## ٦. الأخطاء

alias قبل الـ anchor بتاعه ([[a: *x]] وبعدها [[b: &x 1]]):

~~~text الناتج
PyYAML:    found undefined alias 'x'
js-yaml:   unidentified alias "x" (1:5)
yaml 2.9:  Unresolved alias (the anchor must be set before the alias): x
~~~

ولما غيّرت [[x-common]] لـ [[common]] من غير [[x-]]:

~~~text الناتج
validating ...\compose.yaml:  additional properties 'common' not allowed
~~~

---

## الخلاصة

| الرمز | اسمه | بيعمل إيه |
|---|---|---|
| [[&name]] | anchor | بيسمّي القيمة اللي بعده |
| [[*name]] | alias | بيحط نفس القيمة هنا |
| [[<<: *name]] | merge key | بيفرد مفاتيح الـ object هنا، والمفاتيح المكتوبة بإيدك بتكسب |
| [[x-...]] | extension (عُرف Compose) | مفتاح Compose بيتجاهله |

الـ anchor لازم يتعرّف فوق، وشغال في نفس الملف بس، و [[<<]] اتأكد إن الأداة بتدعمه.`,
          lines: [
            R`مفتاح [[x-]] (Compose بيتجاهله)، و [[&common]] بيسمّي الـ object اللي تحته [[common]].`,
            R`إعداد مشترك.`,
            R`إعداد مشترك تاني.`,
            R`object جوه الحتة المشتركة.`,
            R`جوه [[logging]].`,
            R`object أعمق.`,
            R`متنصص عشان يفضل نص.`,
            R`المفتاح الحقيقي اللي Compose بيقراه.`,
            R`خدمة اسمها [[api]].`,
            R`[[<<: *common]]: انسخ كل مفاتيح [[common]] هنا.`,
            R`مفتاح خاص بالخدمة دي.`,
            R`list في سطر، والبورت متنصص (درس «مشكلة النرويج»).`,
            R`خدمة تانية.`,
            R`نفس الحتة المشتركة.`,
            R`صورة مختلفة.`,
            R`بيغطي على [[restart]] اللي جاي من [[common]]، و [["no"]] متنصصة عشان متبقاش false.`
          ],
          sol: R`[[docker compose config]] بيطبع الخدمتين وكل واحدة فيها [[logging]] كامل ([[driver: json-file]] و [[max-size: 10m]])، و [[api]] فيها [[restart: unless-stopped]]، و [[worker]] فيها [[restart: "no"]] (Compose v5.3.0). و [[env_file]] مش هيظهر: Compose بيقرا الملف ويحط اللي فيه تحت [[environment]]، والملف فاضي. وكمان [[x-common]] بيظهر في الآخر زي ما هو. و Python بيطبع نفس الكلام JSON: كل خدمة فيها [[restart]] و [[env_file]] و [[logging]] و [[image]].

ولو شلت [[x-]] وسميته [[common]] بس، [[docker compose config]] هيقول: [[additional properties 'common' not allowed]].`
        }
      ]
    },
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
