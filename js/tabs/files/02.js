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
• [[pool:10]] من غير مسافة: مش غلط! بيتقري مفتاح اسمه [[pool:10]] قيمته null، أو نص. وده أخطر من الغلط لأنه بيعدّي ساكت.

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
• [[1e3]] و [[.inf]] و [[0x1F]] ← أرقام.

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
          sol: R`[[docker compose config]] بيطبع الخدمتين وكل واحدة فيها [[logging]] كامل ([[driver: json-file]] و [[max-size: 10m]])، و [[api]] فيها [[restart: unless-stopped]]، و [[worker]] فيها [[restart: 'no']]. وكمان [[x-common]] بيظهر في الآخر زي ما هو. و Python بيطبع نفس الكلام JSON: كل خدمة فيها [[restart]] و [[env_file]] و [[logging]] و [[image]].

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
