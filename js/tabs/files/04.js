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
    }
]);
