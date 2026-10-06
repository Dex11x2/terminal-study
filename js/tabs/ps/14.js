// تكملة تاب ps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ps/01.js (شرح حقول الدرس في أوله)
MORE("ps", [
    {
      t: "ملفات البيانات والجدولة",
      l: 3,
      n: R`CSV و JSON و XML، وإزاي تخلّي السكربت يشتغل لوحده كل يوم`,
      items: [
        {
          cmd: "Import-Csv",
          title: "اقرا ملف CSV واشتغل عليه كجدول",
          desc: R`[[Import-Csv]] بيقرا ملف CSV ويحوّل كل صف لـ object، وأول سطر في الملف (الهيدر) بيبقى أسامي الخصائص. فبعد [[$users = Import-Csv .\users.csv]] تقدر تقول [[$users[0].Email]] أو تفلتر وترتب بـ Where-Object و Sort-Object زي أي ناتج أمر. في bash ده محتاج [[awk -F,]] وتعدّ الأعمدة بإيدك.

أول ٦ سطور في المثال بتعمل الملف للتجربة: here-string ([[@" ... "@]]، درس النصوص) متبعت لـ [[Set-Content]]. بعدها [[.Count]] عدد الصفوف من غير الهيدر، و [[Measure-Object -Property Age -Average]] متوسط عمود.

أهم حاجة: كل القيم اللي جاية من CSV نصوص، حتى الأرقام. عشان كده الفلتر فيه [[[int]$_.Age]]: من غيرها المقارنة بتبقى نص بنص (درس عوامل المقارنة). والسطر اللي بعده بيعمل عمود جديد: [[($_.Email -split '@')[1]]] يقطّع الإيميل عند [[@]] وياخد الجزء التاني (الدومين)، وبيصدّر النتيجة CSV جديد. وخلي بالك: Excel على أجهزة كتير بيحفظ CSV بفاصلة منقوطة [[;]] بدل الفاصلة، ساعتها [[-Delimiter ';']].`,
          example: R`@"
Name,Email,Age
Ali,ali@example.com,31
Sara,sara@example.com,24
Omar,omar@example.com,40
"@ | Set-Content users.csv
$users = Import-Csv .\users.csv
$users.Count
$users[0].Email
$users | Where-Object { [int]$_.Age -gt 30 } | Select-Object -ExpandProperty Name
($users | Measure-Object -Property Age -Average).Average
$users | ForEach-Object {
    [PSCustomObject]@{ Name = $_.Name; Domain = ($_.Email -split '@')[1] }
} | Export-Csv domains.csv -NoTypeInformation
Get-Content domains.csv`,
          try: R`ضيف للـ CSV عمود Active فيه yes أو no، واعمل ملف [[active.csv]] فيه الاسم والإيميل للـ Active بس.`,
          flag: "script",
          deep: {
            why: "CSV هو اللغة المشتركة بين الناس والسكربتات: لستة يوزرز من HR، أو تصدير من Excel أو من قاعدة بيانات، أو تقرير هتبعته لمديرك. سكربت يقرا CSV ويعمل حاجة لكل صف (يبعت إيميل، يعمل فولدر، يتأكد من سيرفر) ده من أكتر أنواع الأتمتة فايدة.",
            how: R`Import-Csv بيستخدم أول سطر أسامي. لو الملف مفيهوش هيدر: [[-Header Name, Email, Age]]. ولو فيه أسامي أعمدة بمسافات زي «First Name»، اقراها بـ [[$_."First Name"]] أو [[$_.'First Name']].

الترميز: لو العربي طالع رموز، الملف غالبًا من Excel. جرّب [[-Encoding utf8]]، ولو كان ANSI عربي في 5.1 [[-Encoding Default]]. وعند التصدير لـ Excel اللي بيفتح العربي صح: [[Export-Csv -Encoding utf8BOM]] في PowerShell 7 (درس Export-Csv).

الفاصل: [[-Delimiter ';']] أو [[-UseCulture]] (ياخد الفاصل من إعدادات لغة ويندوز). لو الفاصل غلط هتلاقي عمود واحد اسمه كل الهيدر لازق في بعضه.

القيم نصوص: [[[int]]] و [[[double]]] و [[[datetime]]] عشان تحسب أو تقارن. و [[Sort-Object { [int]$_.Age }]] للترتيب الرقمي. و [[Measure-Object]] بيحوّل لوحده، عشان كده المتوسط اشتغل.

الملفات الكبيرة: Import-Csv بيقرا صف صف، فـ [[Import-Csv big.csv | Where-Object ... | Export-Csv out.csv]] مش بيحمّل الملف كله في الرام. لكن [[$all = Import-Csv big.csv]] بيحمّله كله.

و [[ConvertFrom-Csv]] نفس الفكرة بس على نص مش ملف، مفيد مع ناتج برامج قديمة زي [[tasklist /fo csv | ConvertFrom-Csv]].`,
            when: "أي «لستة» جاية من بره السكربت: يوزرز، سيرفرات، منتجات، أسعار. وكمان تقارير بتطلع من السكربت لحد بيفتحها في Excel.",
            mistakes: R`تقارن أعمار أو أسعار من CSV من غير [[[int]]] فـ "9" تطلع أكبر من "30". أو تفتح ملف Excel بـ [[;]] من غير [[-Delimiter]] فيطلع عمود واحد. أو تصدّر بـ [[Export-Csv]] من غير [[-NoTypeInformation]] في 5.1 فأول سطر في الملف يبقى [[#TYPE]]. أو تعمل [[Format-Table]] قبل Export-Csv.`
          },
          teach: R`## الفكرة: ملف CSV يبقى جدول objects

CSV ملف نص عادي: أول سطر أسامي الأعمدة، وكل سطر بعده صف، والقيم مفصولة بفاصلة. [[Import-Csv]] بيحوّل كل صف لـ object، فتشتغل عليه بـ [[Where-Object]] و [[Sort-Object]] زي ناتج أي أمر. كل اللي تحت اتشغّل كسكربت في PowerShell 7.6 و Windows PowerShell 5.1 وطلع نفس الناتج.

---

## ١. نعمل ملف للتجربة

~~~powershell
@"
Name,Email,Age
Ali,ali@example.com,31
Sara,sara@example.com,24
Omar,omar@example.com,40
"@ | Set-Content users.csv
~~~

- [[@"]] في آخر سطر لوحده بيفتح **here-string**: نص على كذا سطر، و [["@]] في أول سطر لوحده بيقفله (درس النصوص).
- [[|]] بيبعت النص ده لـ [[Set-Content]]، اللي بيكتبه في ملف [[users.csv]] (ولو موجود بيكتب فوقه).

يعني ٦ سطور الكود دول بيعملوا الملف ده بالظبط: هيدر وتلات صفوف.

---

## ٢. نقرا الملف: [[Import-Csv]]

~~~powershell
$users = Import-Csv .\users.csv
$users.Count
$users[0].Email
~~~

~~~text الناتج
3
ali@example.com
~~~

- [[.\users.csv]]: [[.]] الفولدر الحالي، يعني الملف اللي جنبك.
- [[$users]] بقى array فيها 3 objects، واحد لكل صف. الهيدر **مش** صف، هو أسامي الخصائص.
- [[.Count]] عدد العناصر.
- [[$users[0]]] أول عنصر (العد بيبدأ من صفر)، و [[.Email]] الخاصية اللي اسمها Email، اللي جاية من اسم العمود.

ولو كتبت [[$users[0]]] لوحده هتشوفه جدول صغير:

~~~text الناتج
Name Email           Age
---- -----           ---
Ali  ali@example.com 31
~~~

### القيم كلها نصوص

[[$users[0].Age.GetType().Name]] طلع [[String]]. يعني [[31]] هنا نص مش رقم، لأن الملف نص وبس، و Import-Csv مش بيخمّن الأنواع.

---

## ٣. الفلتر: ليه [[[int]]]؟

~~~powershell
$users | Where-Object { [int]$_.Age -gt 30 } | Select-Object -ExpandProperty Name
~~~

~~~text الناتج
Ali
Omar
~~~

نفكّه بالترتيب:

| الحتة | معناها |
|---|---|
| [[Where-Object { ... }]] | سيب العنصر يعدّي لو الشرط اللي بين [[{ }]] True |
| [[$_]] | العنصر الحالي اللي بيعدّي في الـ pipeline (صف واحد) |
| [[[int]$_.Age]] | حوّل العمر من نص لرقم صحيح (integer) |
| [[-gt 30]] | أكبر من ([[gt]] = greater than) 30 |
| [[Select-Object -ExpandProperty Name]] | هات قيمة Name نفسها كنص، مش object فيه عمود Name |

ليه [[[int]]] مهمة؟ لما الشمال نص، PowerShell بيقارن نص بنص، حرف حرف زي ترتيب القاموس. جربتها:

~~~powershell
"9" -gt 30
~~~

~~~text الناتج
True
~~~

"9" طلعت أكبر من 30، لأن الحرف 9 بعد الحرف 3. في الملف بتاعنا الصدفة خلّت النتيجة صح من غير [[[int]]]، لكن أول عمر من رقم واحد هيبوّظ الفلتر من غير ما يطلع أي error.

---

## ٤. المتوسط: [[Measure-Object]]

~~~powershell
($users | Measure-Object -Property Age -Average).Average
~~~

~~~text الناتج
31.6666666666667
~~~

- [[Measure-Object]] بيحسب إحصائيات على عمود: [[-Property Age]] العمود، و [[-Average]] المتوسط (وفيه [[-Sum]] و [[-Maximum]] و [[-Minimum]]).
- بيرجّع object فيه خانات كتير، فالأقواس [[( )]] تنفّذه الأول و [[.Average]] تاخد الخانة دي بس.
- هنا مش محتاج [[[int]]]: Measure-Object بيحوّل النص لرقم لوحده. (31 + 24 + 40) / 3 = 31.67.

---

## ٥. عمود جديد وملف CSV جديد

~~~powershell
$users | ForEach-Object {
    [PSCustomObject]@{ Name = $_.Name; Domain = ($_.Email -split '@')[1] }
} | Export-Csv domains.csv -NoTypeInformation
~~~

من جوه لبرة:

### [[$_.Email -split '@']]

[[-split]] بيقطّع النص عند الحرف ده، ويرجّع array:

~~~text الناتج لـ 'ali@example.com' -split '@'
ali
example.com
~~~

و [[( )[1]]] بياخد العنصر التاني (رقم 1، لأن العد من صفر)، يعني [[example.com]].

### [[[PSCustomObject]@{ ... }]]

[[@{ }]] hashtable: مفتاح = قيمة، والمفاتيح مفصولة بـ [[;]]. و [[[PSCustomObject]]] قبلها بيحوّلها object عادي بخصائص، فـ Export-Csv يشوفها أعمدة: [[Name]] و [[Domain]].

### [[ForEach-Object { ... }]]

بيشغّل الكود ده مرة لكل صف، فيطلع 3 objects جداد.

### [[Export-Csv domains.csv -NoTypeInformation]]

بيكتب الـ objects دي CSV: الهيدر من أسامي الخصائص، وكل object سطر.

~~~text محتوى domains.csv
"Name","Domain"
"Ali","example.com"
"Sara","example.com"
"Omar","example.com"
~~~

Export-Csv بيحط كل قيمة بين علامات تنصيص، وده عادي و Excel بيفهمه.

### ليه [[-NoTypeInformation]]؟

في Windows PowerShell 5.1 من غيره أول سطر في الملف بيبقى سطر زيادة:

~~~text أول سطرين في 5.1 من غير -NoTypeInformation
#TYPE System.Management.Automation.PSCustomObject
"Name","Email","Age"
~~~

في PowerShell 7 السطر ده مش بيتكتب أصلًا، فالـ parameter مش بيضر هناك. اكتبه دايمًا عشان السكربت يشتغل صح في الاتنين.

---

## ٦. الحل (solCode)

~~~powershell
Import-Csv .\users.csv |
    Where-Object Active -eq "yes" |
    Select-Object Name, Email |
    Export-Csv active.csv -NoTypeInformation
~~~

- الـ [[|]] في آخر السطر بيخلي الأمر يكمّل في السطر اللي بعده، فده pipeline واحد.
- [[Where-Object Active -eq "yes"]] شكل مختصر من غير [[{ }]] و [[$_]]، بينفع لشرط واحد بسيط. وهنا مش محتاج تحويل: المقارنة نص بنص.
- [[Select-Object Name, Email]] خلّي العمودين دول بس.

~~~text محتوى active.csv
"Name","Email"
"Ali","ali@example.com"
"Omar","omar@example.com"
~~~

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تقرا CSV كـ objects | [[Import-Csv file.csv]] |
| تقارن أو ترتب أرقام | [[[int]$_.Age]] الأول، لأن كل القيم نصوص |
| إحصائيات عمود | [[Measure-Object -Property X -Average]] |
| عمود جديد | [[[PSCustomObject]@{ ... }]] جوه [[ForEach-Object]] |
| تكتب CSV | [[Export-Csv out.csv -NoTypeInformation]] |
| الملف بفاصلة منقوطة | [[-Delimiter ';']] |`,
          lines: [
            "here-string بيبدأ: ده محتوى الملف للتجربة...",
            "...الهيدر: أسامي الأعمدة...",
            "...صف...",
            "...صف...",
            "...صف...",
            "...قفلة النص، واكتبه في users.csv.",
            "اقرا الملف: كل صف بقى object.",
            "عدد الصفوف: 3.",
            "إيميل أول واحد.",
            "الأسامي اللي عمرها أكبر من 30. [[[int]]] لأن القيم نصوص.",
            "متوسط الأعمار.",
            "لكل يوزر...",
            "...اعمل صف جديد فيه الاسم والدومين (الجزء اللي بعد @)...",
            "...وصدّر الكل CSV جديد.",
            "اعرض الملف الجديد."
          ],
          sol: R`المثال على PowerShell 7.6 و 5.1 طبع نفس الناتج: [[3]] و [[ali@example.com]] و [[Ali]] و [[Omar]] و [[31.6666666666667]]، وبعدين محتوى domains.csv: [["Name","Domain"]] و [["Ali","example.com"]] وهكذا.

الحل في الـ solCode: ضفت Active للهيدر و yes أو no لكل صف، والفلتر [[$_.Active -eq "yes"]] (من غير تحويل، لأنها نص أصلًا، و [[-eq]] مش بيفرّق كابيتال وسمول فـ Yes تعدّي كمان). الملف طلع [["Name","Email"]] وتحته Ali و Omar بس. لو نسيت تزوّد Active في الهيدر، Import-Csv هيتجاهل القيمة الزيادة في كل صف والفلتر مش هيرجع حاجة.`,
          solCode: R`@"
Name,Email,Age,Active
Ali,ali@example.com,31,yes
Sara,sara@example.com,24,no
Omar,omar@example.com,40,yes
"@ | Set-Content users.csv
Import-Csv .\users.csv |
    Where-Object Active -eq "yes" |
    Select-Object Name, Email |
    Export-Csv active.csv -NoTypeInformation
Get-Content active.csv`
        },
        {
          cmd: "ConvertTo-Json -Depth",
          title: "عدّل ملف JSON واكتبه",
          desc: R`الخطوات التلاتة: اقرا الملف كنص واحد وحوّله object ([[Get-Content -Raw | ConvertFrom-Json]]، درس ConvertFrom-Json)، وعدّل بالنقطة زي أي متغير، وبعدين حوّله نص تاني بـ [[ConvertTo-Json]] واكتبه بـ [[Set-Content]]. ده المقابل لـ [[jq]] في bash، بس بمتغيرات عادية.

التعديلات في المثال: [[$cfg.server.port = 8080]] يغيّر قيمة جوه object جوه object، و [[+=]] يزوّد عنصر على array موجودة. أما مفتاح جديد مكانش في الملف فمينفعش بـ [[=]] على طول: لازم [[Add-Member -NotePropertyName version -NotePropertyValue "1.1.0"]] (يعني ضيف خاصية اسمها كذا وقيمتها كذا).

أهم parameter: [[-Depth]]. ConvertTo-Json افتراضيًا بيكتب مستويين بس، وأي حاجة أعمق بتتحوّل لنص زي [[@{origins=System.Object[]}]] والبيانات تضيع. عشان كده دايمًا [[-Depth 10]] أو أكتر. وآخر سطر بيوريك المشكلة بـ [[-Depth 1]]: PowerShell 7 بيطلع تحذير، لكن Windows PowerShell 5.1 بيقطع من غير ولا كلمة. و [[-Encoding utf8]] في PowerShell 7 من غير BOM، في 5.1 بيحط BOM في الأول وده ممكن يبوّظ ملف بيقراه Node.`,
          example: R`$path = ".\appsettings.json"
$cfg = Get-Content $path -Raw | ConvertFrom-Json
$cfg.server.port = 8080
$cfg.server.cors.origins += "https://shop.example.com"
$cfg.features += "orders"
$cfg | Add-Member -NotePropertyName version -NotePropertyValue "1.1.0"
$cfg | ConvertTo-Json -Depth 10 | Set-Content $path -Encoding utf8
Get-Content $path
$cfg | ConvertTo-Json -Depth 1`,
          try: R`اعمل appsettings.json (المحتوى في الـ solCode)، وشغّل المثال، وبعدين غيّر [[-Depth 10]] لـ [[-Depth 2]] في سطر الكتابة وشغّله على نسخة جديدة من الملف وبص عمل إيه في origins.`,
          flag: "script",
          deep: {
            why: R`سكربت ديبلوي محتاج يغيّر البورت أو رابط الـ API في ملف إعدادات، أو يزوّد version في package.json، أو يحدّث إعدادات VS Code لفريق كامل. تعديل JSON بـ [[-replace]] على النص هش جدًا، والطريقة الصح إنك تفهمه object وتعدّله.`,
            how: R`[[ConvertFrom-Json]] بيرجع PSCustomObject. في PowerShell 7 فيه [[-AsHashtable]] لو عايز hashtable (أسهل في إضافة وحذف مفاتيح، وبيقبل مفاتيح بتفرق بالكابيتال بس). وفيه كمان [[-Depth]] لـ ConvertFrom-Json في 7، افتراضيه 1024 فمش هتحتاجه غالبًا. في 5.1 مفيش الاتنين.

مفتاح جديد: [[Add-Member]] زي المثال. أو مع hashtable: [[$cfg["version"] = "1.1.0"]].

حذف مفتاح: [[$cfg.PSObject.Properties.Remove("debug")]].

ConvertTo-Json الافتراضي [[-Depth 2]]، والحد الأقصى 100. التحذير «Resulting JSON is truncated» ظهر في PowerShell 7.1، قبلها (وفي 5.1) القطع بيحصل بصمت.

الشكل: PowerShell 7 بيكتب بمسافتين مرتبين. 5.1 بيكتب بمسافات غريبة بس JSON سليم. و [[-Compress]] سطر واحد من غير مسافات. وفي 5.1 حروف زي [[<]] و [[']] بتتكتب [[\u003c]] و [[\u0027]]، سليمة بس شكلها وحش.

package.json بالذات: لو هتعدّله من سكربت، [[npm pkg set version=1.2.0]] أضمن لأنه بيحافظ على الترتيب والتنسيق اللي npm متعود عليه.`,
            when: "ملفات إعدادات (appsettings.json، config.json، settings.json بتاع VS Code)، وردود APIs عايز تعدّلها وتبعتها تاني.",
            mistakes: R`تنسى [[-Depth]] فالـ arrays اللي جوه objects تتحول لنص [[System.Object[]]] وتكتب فوق الملف الأصلي، فتضيع الإعدادات. خد نسخة قبل أول تجربة. أو تحاول [[$cfg.newKey = 1]] على مفتاح مش موجود فيطلع [[The property 'newKey' cannot be found on this object]]. أو تكتب بـ [[Set-Content]] في 5.1 من غير [[-Encoding]] فالعربي يضيع.`
          },
          teach: R`## الفكرة: اقرا، عدّل، اكتب

تعديل ملف JSON في PowerShell ٣ خطوات: تحوّل النص لـ object، وتغيّر فيه بالنقطة زي أي متغير، وترجّعه نص وتكتبه. المثال اتشغّل على ملف [[appsettings.json]] اللي في الـ solCode، في PowerShell 7.6 و 5.1.

~~~text appsettings.json قبل التعديل
{
  "name": "shop",
  "server": { "port": 3000, "cors": { "origins": ["http://localhost:5173"] } },
  "features": ["auth", "cart"]
}
~~~

لاحظ إن الملف **متداخل**: [[cors]] جوه [[server]]، و [[origins]] array جوه [[cors]]. ده هيفرق جدًا في آخر الدرس.

---

## ١. القراية

~~~powershell
$path = ".\appsettings.json"
$cfg = Get-Content $path -Raw | ConvertFrom-Json
~~~

- [[Get-Content]] لوحده بيرجّع الملف سطر سطر (array). [[-Raw]] بيرجّعه **نص واحد**، وده اللي ConvertFrom-Json محتاجه عشان يفهم الـ JSON كله مرة واحدة.
- [[ConvertFrom-Json]] بيحوّل النص لـ object من نوع [[PSCustomObject]]. كل مفتاح بقى خاصية، وكل [[{ }]] جوه الملف بقت object جوه object.

~~~text الناتج لو كتبت $cfg
name server              features
---- ------              --------
shop @{port=3000; cors=} {auth, cart}
~~~

[[@{port=3000; cors=}]] ده مجرد شكل عرض مختصر للـ object اللي جوه، البيانات كلها موجودة.

---

## ٢. التعديل

### قيمة جوه object جوه object

~~~powershell
$cfg.server.port = 8080
~~~

كل نقطة بتنزل مستوى: [[$cfg]] ثم [[server]] ثم [[port]]. و [[=]] بيغيّر القيمة.

### عنصر جديد في array موجودة

~~~powershell
$cfg.server.cors.origins += "https://shop.example.com"
$cfg.features += "orders"
~~~

[[+=]] يعني «زوّد على اللي موجود». على array بيرجّع array جديدة فيها القديم + العنصر الجديد.

### مفتاح جديد خالص: [[Add-Member]]

لو جربت [[$cfg.version = "1.1.0"]] على طول (جربتها في 7.6 و 5.1):

~~~text الناتج
Exception setting "version": "The property 'version' cannot be found on this object. Verify that the property exists and can be set."
~~~

الـ PSCustomObject مش بيقبل خاصية مش موجودة بـ [[=]]. فلازم:

~~~powershell
$cfg | Add-Member -NotePropertyName version -NotePropertyValue "1.1.0"
~~~

- [[Add-Member]] بيضيف عضو (خاصية) لـ object.
- [[-NotePropertyName]] اسم الخاصية، و [[-NotePropertyValue]] قيمتها. «Note property» يعني خاصية عادية شايلة قيمة.

---

## ٣. الكتابة: [[ConvertTo-Json -Depth 10]]

~~~powershell
$cfg | ConvertTo-Json -Depth 10 | Set-Content $path -Encoding utf8
Get-Content $path
~~~

- [[ConvertTo-Json]] العكس: object لنص JSON.
- [[-Depth 10]] انزل لحد 10 مستويات جوه بعض (الشرح في الخطوة الجاية).
- [[Set-Content $path]] اكتب النص فوق الملف، و [[-Encoding utf8]] الترميز.

~~~text الناتج في PowerShell 7.6
{
  "name": "shop",
  "server": {
    "port": 8080,
    "cors": {
      "origins": [
        "http://localhost:5173",
        "https://shop.example.com"
      ]
    }
  },
  "features": [
    "auth",
    "cart",
    "orders"
  ],
  "version": "1.1.0"
}
~~~

كل التعديلات الأربعة موجودة. في 5.1 نفس البيانات بس بمسافات غريبة (زي [["name":  "shop"]] بمسافتين وإزاحات كبيرة)، والـ JSON سليم برضه. وفرق تاني: [[-Encoding utf8]] في 5.1 بيحط BOM (3 بايتات مخفية [[EF BB BF]]) في أول الملف، وفي 7 لأ.

---

## ٤. ليه [[-Depth]]؟ آخر سطر

~~~powershell
$cfg | ConvertTo-Json -Depth 1
~~~

عدّ المستويات: [[$cfg]] نفسه، تحته [[server]] (مستوى 1)، تحته [[cors]] (مستوى 2)، تحته [[origins]]. أي حاجة أعمق من الـ Depth بتتحوّل لنص بدل ما تتكتب JSON:

~~~text الناتج في PowerShell 7.6
WARNING: Resulting JSON is truncated as serialization has exceeded the set depth of 1.
{
  "name": "shop",
  "server": {
    "port": 8080,
    "cors": "@{origins=System.Object[]}"
  },
  ...
~~~

[[cors]] بقت النص [["@{origins=System.Object[]}"]]، يعني الروابط ضاعت. 7 طلّع WARNING، و **5.1 طلّع نفس القطع من غير ولا كلمة**.

ولو مكتبتش [[-Depth]] خالص، الافتراضي 2، وجربته:

~~~text الناتج من غير -Depth
    "cors": {
      "origins": "http://localhost:5173 https://shop.example.com"
    }
~~~

الـ array بقت نص واحد فيه الرابطين لازقين بمسافة. ده أخطر شكل، لأن الملف شكله سليم. عشان كده [[-Depth 10]] (أو أكتر) دايمًا.

---

## الخلاصة

| الخطوة | الكود |
|---|---|
| اقرا | [[Get-Content $path -Raw]] وبعده [[ConvertFrom-Json]] |
| غيّر قيمة | [[$cfg.server.port = 8080]] |
| زوّد على array | [[$cfg.features += "orders"]] |
| مفتاح جديد | [[Add-Member -NotePropertyName X -NotePropertyValue Y]] |
| اكتب | [[ConvertTo-Json -Depth 10]] وبعده [[Set-Content $path]] |

ومن غير [[-Depth]] الكافي البيانات العميقة بتتحوّل نص، و 5.1 مش بيحذّرك.`,
          lines: [
            "مسار الملف.",
            "اقراه كنص واحد وحوّله object.",
            "غيّر قيمة جوه object متداخل.",
            "زوّد عنصر على array موجودة.",
            "وعلى array تانية.",
            "مفتاح جديد مكانش في الملف: لازم Add-Member.",
            "حوّله JSON بعمق 10 مستويات واكتبه فوق الملف.",
            "اعرض الملف بعد التعديل.",
            "نفس الـ object بعمق 1 بس: شوف اللي اتقطع."
          ],
          sol: R`جربته على PowerShell 7.6 و 5.1 بالملف اللي في الـ solCode: الملف بقى فيه [["port": 8080]] و origins فيها الرابطين و features فيها auth و cart و orders وفي الآخر [["version": "1.1.0"]]. وآخر سطر في 7 طلع [[WARNING: Resulting JSON is truncated as serialization has exceeded the set depth of 1.]] وجواه [["cors": "@{origins=System.Object[]}"]]: الـ array اتحولت لنص. و 5.1 طلع نفس القطع من غير أي تحذير، وبمسافات كتير بعد كل [[:]]. وأول 3 بايتات في الملف: في 7 [[{]] على طول، وفي 5.1 BOM ([[EF BB BF]]) من [[-Encoding utf8]].

مع [[-Depth 2]] في سطر الكتابة (جربتها): server و cors اتكتبوا عادي، لكن origins اللي جوه cors اتحوّلت من array لنص واحد: [["origins": "http://localhost:5173 https://shop.example.com"]]، الرابطين لازقين بمسافة. الملف لسه JSON سليم، فمفيش أي error (7 طلّع WARNING بس، و 5.1 ولا كلمة)، بس أي برنامج بيقرا origins كلستة هيبوظ. ولو ده حصل على ملف حقيقي اتكتب فوق الأصل، فخد نسخة الأول.`,
          solCode: R`@"
{
  "name": "shop",
  "server": { "port": 3000, "cors": { "origins": ["http://localhost:5173"] } },
  "features": ["auth", "cart"]
}
"@ | Set-Content appsettings.json`
        },
        {
          cmd: "[xml]",
          title: "اقرا وعدّل ملف XML (web.config و .csproj)",
          desc: R`XML لسه موجود في ويندوز كتير: [[web.config]] و [[.csproj]] و [[app.config]] و [[pom.xml]]. في PowerShell بتحوّل النص لمستند XML بكلمة [[[xml]]] قبل المتغير (اسمها type accelerator، اختصار للنوع XmlDocument)، وبعدها تمشي جوه العناصر بالنقطة زي الفولدرات: [[$doc.configuration.appSettings.add]] بيرجع كل عناصر [[<add>]] اللي جوه appSettings، والـ attributes بتتقري بنفس الطريقة ([[.key]] و [[.value]]).

لما يبقى فيه عناصر كتير بنفس الاسم وعايز واحد بعينه، [[.SelectSingleNode()]] بياخد XPath: [[//add[@key='Debug']]] يعني «أي عنصر add في أي مكان، الـ attribute بتاعه key بيساوي Debug». تعدّل قيمته بـ [[=]] عادي، وبعدين [[$doc.Save($path)]] يكتب الملف.

[[Save()]] دي method من .NET مش أمر PowerShell، فلازم تديها مسار كامل: المسار النسبي بيتحسب من الفولدر اللي PowerShell اتفتح فيه مش من مكانك الحالي. عشان كده المسار متبني بـ [[Join-Path $PSScriptRoot]]. وآخر سطر بيتأكد بـ [[Select-String]] إن التعديل اتكتب.`,
          example: R`$path = Join-Path $PSScriptRoot "web.config"
[xml]$doc = Get-Content $path -Raw
$doc.configuration.appSettings.add | Format-Table key, value
$debug = $doc.SelectSingleNode("//add[@key='Debug']")
$debug.value = "false"
$doc.Save($path)
Select-String -Path $path -Pattern 'Debug'`,
          try: R`احفظ web.config اللي في الـ solCode جنب السكربت، وشغّله. وبعدين عدّل السكربت يغيّر ApiUrl لـ [[https://api.example.com]].`,
          flag: "script",
          deep: {
            why: "سكربت ديبلوي على ويندوز سيرفر غالبًا هيلمس web.config: يغيّر connection string أو يقفل Debug قبل الإنتاج. أو سكربت بيقرا نسخة مشروع .NET من الـ .csproj. التعديل بـ [[-replace]] على النص بيبوظ مع أول مسافة أو ترتيب مختلف.",
            how: R`[[[xml]]] بيحوّل النص لـ System.Xml.XmlDocument. لو النص مش XML سليم بيطلع error فيه رقم السطر، وده في حد ذاته فحص مفيد.

التنقل بالنقطة: كل عنصر بقى خاصية. لو فيه أكتر من عنصر بنفس الاسم بترجع array، فـ [[$doc.configuration.appSettings.add[0]]] أول واحد. والـ attributes والعناصر الفرعية الاتنين بيتقروا بالنقطة.

XPath أدق: [[SelectNodes("//add")]] كلهم، و [[SelectSingleNode("//add[@key='X']")]] أول واحد بيطابق. وفيه [[Select-Xml]] أمر PowerShell بيعمل نفس الحكاية على ملف مباشرة.

إضافة عنصر: [[$new = $doc.CreateElement("add")]] و [[$new.SetAttribute("key", "Mode")]] و [[$doc.configuration.appSettings.AppendChild($new)]]. والـ AppendChild بيرجع العنصر فبيتطبع، فحط [[| Out-Null]].

ملفات فيها namespace (زي .csproj القديمة فيها xmlns): XPath العادي مش هيلاقي حاجة، ومحتاج XmlNamespaceManager. التنقل بالنقطة بيشتغل عادي.

الحفظ: [[Save()]] بيكتب بالترميز اللي في أول سطر ([[encoding="utf-8"]])، وفي تجربتي حط BOM في أول الملف. أغلب الأدوات (IIS و .NET و VS) مش فارق معاها، بس خليك عارف. و [[[Environment]::CurrentDirectory]] هو الفولدر اللي .NET بيحسب منه المسارات النسبية، ومش بيتغيّر لما تعمل cd في PowerShell.`,
            when: "web.config و app.config قبل الديبلوي، قراية النسخة من .csproj أو pom.xml، أو أي أداة قديمة إعداداتها XML.",
            mistakes: R`تدّي [[Save()]] مسار نسبي فالملف يتكتب في فولدر تاني خالص (جربتها في 7.6 و 5.1: [[$doc.Save("rel.xml")]] بعد [[Set-Location sub]] كتب الملف في الفولدر اللي PowerShell اتفتح فيه مش في sub). أو تكتب [[$xml = Get-Content file.xml]] من غير [[[xml]]] فتشتغل على نص. أو تنسى إن XPath بيفرّق بين الكابيتال والسمول ([[@Key]] غير [[@key]]).`
          },
          teach: R`## الفكرة: XML يبقى شجرة تمشي فيها بالنقطة

السكربت بيقرا [[web.config]]، ويعرض الإعدادات، ويغيّر [[Debug]] من [[true]] لـ [[false]]، ويحفظ. اتشغّل كملف [[.ps1]] جنب [[web.config]] اللي في الـ solCode، في PowerShell 7.6 و 5.1، ونفس الناتج.

~~~text web.config
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <appSettings>
    <add key="ApiUrl" value="http://localhost:8000" />
    <add key="Debug" value="true" />
  </appSettings>
</configuration>
~~~

كلمتين قبل ما نبدأ: [[<configuration>]] ده **element** (عنصر)، وجواه عناصر تانية. و [[key="Debug"]] ده **attribute**: اسم وقيمة جوه العنصر نفسه.

---

## ١. المسار الكامل

~~~powershell
$path = Join-Path $PSScriptRoot "web.config"
~~~

- [[$PSScriptRoot]] فولدر السكربت اللي شغال (درس $PSScriptRoot).
- [[Join-Path]] بيلزق الفولدر والاسم بـ [[\]] صح.

الناتج مسار كامل زي [[C:\...\xml\web.config]]. ليه مش [[".\web.config"]]؟ هتعرف في خطوة الحفظ.

---

## ٢. [[[xml]]]: النص يبقى مستند

~~~powershell
[xml]$doc = Get-Content $path -Raw
~~~

- [[Get-Content -Raw]] الملف كنص واحد.
- [[[xml]]] قبل المتغير معناها «حوّل اللي هيتحط هنا لـ XML». اسمها **type accelerator**: اختصار لاسم النوع الطويل.

[[$doc.GetType().FullName]] طلع:

~~~text الناتج
System.Xml.XmlDocument
~~~

ومن غير [[[xml]]] المتغير بيفضل [[String]] (جربتها)، يعني نص مش هتعرف تمشي جواه. ولو النص مش XML سليم، السطر ده نفسه بيطلع error.

---

## ٣. المشي بالنقطة

~~~powershell
$doc.configuration.appSettings.add | Format-Table key, value
~~~

كل نقطة بتنزل عنصر: [[configuration]] ثم [[appSettings]] ثم [[add]]. وفيه عنصرين اسمهم [[add]]، فالناتج array فيها الاتنين ([[.Count]] طلعت [[2]]). والـ attributes بتتقري بالنقطة برضه، فـ [[Format-Table key, value]] بيعرضهم أعمدة:

~~~text الناتج
key    value
---    -----
ApiUrl http://localhost:8000
Debug  true
~~~

---

## ٤. عنصر واحد بعينه: XPath

~~~powershell
$debug = $doc.SelectSingleNode("//add[@key='Debug']")
~~~

[[SelectSingleNode]] method بتاخد **XPath**، وهي لغة صغيرة للبحث جوه XML. نفك الـ XPath:

| الحتة | معناها |
|---|---|
| [[//]] | في أي مكان في الملف، مهما كان عمقه |
| [[add]] | عنصر اسمه add |
| [[[ ]]] | بشرط |
| [[@key]] | الـ attribute اللي اسمه key ([[@]] يعني attribute) |
| [[='Debug']] | قيمته Debug |

وبترجّع أول عنصر بيطابق. [[$debug.OuterXml]] (العنصر كنص):

~~~text الناتج
<add key="Debug" value="true" />
~~~

> XPath بيفرّق بين الكابيتال والسمول: [[//add[@Key='Debug']]] بحرف K كابيتال رجّع [[$null]] (ولا حاجة).

---

## ٥. التعديل والحفظ

~~~powershell
$debug.value = "false"
$doc.Save($path)
~~~

- [[.value = "false"]] بيغيّر الـ attribute في الـ object اللي في الرام بس.
- [[$doc.Save($path)]] بيكتب المستند كله على الملف.

[[Save()]] دي **method من .NET** مش أمر PowerShell. و .NET بيحسب المسار النسبي من الفولدر اللي PowerShell **اتفتح** فيه، مش من الفولدر اللي انت واقف فيه دلوقتي بعد [[cd]]. عشان كده خطوة ١ عملت مسار كامل.

---

## ٦. نتأكد

~~~powershell
Select-String -Path $path -Pattern 'Debug'
~~~

[[Select-String]] بيدوّر على كلمة في ملف ويطبع السطر اللي فيه:

~~~text الناتج
web.config:5:    <add key="Debug" value="false" />
~~~

اسم الملف، ورقم السطر (5)، والسطر نفسه، وفيه [[false]]. وأول 3 بايتات في الملف بعد الحفظ طلعت [[EF BB BF]] (BOM)، لأن أول سطر بيقول [[encoding="utf-8"]]. ده عادي و IIS و .NET مش فارق معاهم.

---

## الحل (solCode): ApiUrl

نفس الحكاية بـ XPath تاني، والسطرين دول قبل [[Save]]:

~~~powershell
$api = $doc.SelectSingleNode("//add[@key='ApiUrl']")
$api.value = "https://api.example.com"
~~~

---

## الخلاصة

| الخطوة | الكود |
|---|---|
| مسار كامل | [[Join-Path $PSScriptRoot "web.config"]] |
| اقرا كـ XML | [[[xml]$doc = Get-Content $path -Raw]] |
| امشي في العناصر | [[$doc.configuration.appSettings.add]] |
| عنصر بشرط | [[$doc.SelectSingleNode("//add[@key='Debug']")]] |
| غيّر attribute | [[$node.value = "false"]] |
| احفظ | [[$doc.Save($path)]] بمسار كامل |`,
          lines: [
            "المسار الكامل للملف من فولدر السكربت (Save محتاج مسار كامل).",
            "اقرا النص وحوّله XML بـ [[[xml]]].",
            "امشي جوه العناصر بالنقطة، واعرض key و value لكل add.",
            "هات العنصر اللي key بتاعه Debug بـ XPath.",
            "غيّر الـ attribute.",
            "احفظ الملف.",
            "اتأكد إن التعديل اتكتب."
          ],
          sol: R`جربته على PowerShell 7.6 و 5.1 ونفس الناتج: الجدول طلع [[ApiUrl http://localhost:8000]] و [[Debug  true]]، وبعدين [[web.config:5:    <add key="Debug" value="false" />]] (لو انت واقف في فولدر تاني، Select-String بيكتب المسار قبل اسم الملف). والملف اتحفظ بنفس التنسيق، بس في أوله BOM (3 بايتات مخفية: [[EF BB BF]]) لأن أول سطر فيه encoding="utf-8".

لتغيير ApiUrl: نفس السطرين بـ [[//add[@key='ApiUrl']]] و [[.value = "https://api.example.com"]] قبل [[Save]]. لو SelectSingleNode رجّع فاضي ([[$null]]) يبقى الـ XPath مش لاقي حاجة: راجع الكابيتال في key، وإن الملف مفيهوش xmlns.`,
          solCode: R`@"
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <appSettings>
    <add key="ApiUrl" value="http://localhost:8000" />
    <add key="Debug" value="true" />
  </appSettings>
</configuration>
"@ | Set-Content web.config
# جوه السكربت، قبل سطر Save:
$api = $doc.SelectSingleNode("//add[@key='ApiUrl']")
$api.value = "https://api.example.com"`
        },
        {
          cmd: "Register-ScheduledTask",
          title: "شغّل سكربت لوحده كل يوم (Task Scheduler)",
          desc: R`Task Scheduler هو [[cron]] بتاع ويندوز: بيشغّل برنامج في معاد ثابت أو عند حدث (فتح الجهاز، تسجيل الدخول). من PowerShell بتعمل المهمة من ٣ أجزاء: [[New-ScheduledTaskAction]] «هيشغّل إيه»، و [[New-ScheduledTaskTrigger]] «إمتى»، و [[New-ScheduledTaskSettingsSet]] إعدادات إضافية، وبعدين [[Register-ScheduledTask]] بيسجّلها باسم.

الـ action: [[-Execute]] البرنامج، وهنا pwsh بمساره الكامل من [[(Get-Command pwsh).Source]]، و [[-Argument]] اللي بيتبعتله: [[-NoProfile]] و [[-ExecutionPolicy Bypass]] (للمهمة دي بس) و [[-File]] ومسار السكربت بين علامات تنصيص (اتبنى بالـ [[-f]] من درس النصوص عشان لو المسار فيه مسافات). و [[-WorkingDirectory]] الفولدر اللي هيشتغل منه. والـ trigger: [[-Daily -At 9am]] كل يوم الساعة ٩ الصبح (وفيه [[-Weekly -DaysOfWeek Friday]] و [[-AtLogOn]] و [[-AtStartup]]). و [[-StartWhenAvailable]] يعني لو الجهاز كان مقفول وقت المعاد، شغّلها أول ما يفتح.

بعد التسجيل: [[Start-ScheduledTask]] تجرّبها دلوقتي بدل ما تستنى بكرة، و [[Get-ScheduledTaskInfo]] يوريك آخر مرة اشتغلت ونتيجتها ([[LastTaskResult]] صفر يعني نجحت، وأي رقم تاني هو الـ exit code بتاع السكربت)، و [[Unregister-ScheduledTask]] يمسحها، و [[-Confirm:$false]] من غير سؤال. والأوامر دي ويندوز بس.`,
          example: R`$script = "C:\scripts\backup.ps1"
$pwsh = (Get-Command pwsh).Source
$action = New-ScheduledTaskAction -Execute $pwsh -Argument ('-NoProfile -ExecutionPolicy Bypass -File "{0}"' -f $script) -WorkingDirectory (Split-Path $script)
$trigger = New-ScheduledTaskTrigger -Daily -At 9am
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable
Register-ScheduledTask -TaskName "DailyBackup" -Action $action -Trigger $trigger -Settings $settings -Description "Zip src every morning"
Start-ScheduledTask -TaskName "DailyBackup"
Get-ScheduledTaskInfo -TaskName "DailyBackup" | Select-Object LastRunTime, LastTaskResult, NextRunTime
Unregister-ScheduledTask -TaskName "DailyBackup" -Confirm:$false`,
          try: R`سجّل مهمة بتشغّل backup.ps1 (درس backup.ps1) كل يوم، وشغّلها بـ Start-ScheduledTask، واستنى ثواني واقرا Get-ScheduledTaskInfo، واتأكد إن الـ zip اتعمل. وافتح Task Scheduler من Start وشوفها تحت Task Scheduler Library.`,
          deep: {
            why: "الباك أب اللي بيعتمد إنك «تفتكر تشغّله» مش هيتعمل. نفس الحكاية تنضيف الـ Downloads، وتقرير مساحة الديسك، ورفع الشغل على GitHub. سكربت مكتوب كويس + مهمة مجدولة = حاجة بتحصل لوحدها كل يوم من غير ما تفكر فيها.",
            how: R`المهمة بتشتغل بيئة مختلفة عن الترمنال بتاعك، وده سبب أغلب المشاكل:
الفولدر الحالي مش فولدر السكربت (غالبًا System32)، فالسكربت لازم يعتمد على [[$PSScriptRoot]] أو [[-WorkingDirectory]]، ومفيش مسارات نسبية.
مفيش حد قدام الشاشة، فأي [[Read-Host]] أو parameter إجباري ناقص أو سؤال تأكيد هيعلّق المهمة.
الـ output مش ظاهر لحد، فسجّل بـ Start-Transcript (درس Start-Transcript) واخرج بـ [[exit 1]] لو فشل، فيظهر في [[LastTaskResult]].

[[(Get-Command pwsh).Source]] بيجيب المسار الكامل زي [[C:\Program Files\PowerShell\7\pwsh.exe]]، وده أضمن من الاسم لوحده. لو PowerShell 7 مش متسطب استخدم [[powershell.exe]] (5.1) في [[-Execute]]. ولو متسطب من Microsoft Store المسار هيبقى جوه WindowsApps وفيه رقم النسخة (زي [[Microsoft.PowerShell_7.6.6.0_x64...]])، فاشتغل في تجربتي بس هيتغيّر مع أول تحديث والمهمة تبوظ. ساعتها حط في [[-Execute]] الاختصار الثابت [[$env:LOCALAPPDATA\Microsoft\WindowsApps\pwsh.exe]] (جربته واشتغل)، أو سطّبه بـ winget (أول درس في التاب).

الصلاحيات: من غير [[-User]] المهمة بتتسجّل باسمك وبتشتغل وانت داخل على الجهاز بس، وده غالبًا مش محتاج PowerShell أدمن. لو طلعلك Access is denied، افتح PowerShell كأدمن. ولو عايزها تشتغل حتى وانت مش داخل، أو بصلاحيات أعلى ([[-RunLevel Highest]])، محتاج أدمن ومعلومات اليوزر، وده أسهل من واجهة Task Scheduler نفسها (Run whether user is logged on or not).

أرقام LastTaskResult المشهورة: [[0]] نجح، و [[267011]] لسه ماشتغلتش ولا مرة، و [[267009]] شغالة دلوقتي، وأي رقم صغير زي [[1]] هو exit code السكربت.

تعديل مهمة موجودة: [[Set-ScheduledTask]]، أو امسحها وسجّلها تاني. والبديل من CMD: [[schtasks /create]] (بيتشرح في تاب CMD).`,
            when: "باك أب يومي، تنضيف فولدرات، تقارير، مزامنة، أي سكربت المفروض يشتغل بانتظام من غير ما تفتكره.",
            mistakes: R`سكربت بيشتغل تمام من الترمنال ويفشل من المهمة لأنه بيستخدم مسار نسبي أو متغير من الـ profile بتاعك (والمهمة شغالة [[-NoProfile]]). أو تحط في [[-Argument]] مسار فيه مسافات من غير علامات تنصيص. أو سكربت بيسأل سؤال فالمهمة تفضل Running للأبد. أو تختبر بإنك تستنى لبكرة بدل [[Start-ScheduledTask]]. أو تنسى إن الجهاز بيدخل sleep، فالمعاد يعدّي ([[-StartWhenAvailable]] بيحل جزء من ده).`
          },
          teach: R`## الفكرة: مهمة = إيه + إمتى + إعدادات

Task Scheduler في ويندوز بيشغّل برنامج لوحده في معاد. والمهمة بتتبني من ٣ حتت، كل حتة بأمر، وبعدين أمر رابع بيسجّلها. أول 5 سطور بيعملوا objects في الرام بس (جربتهم في PowerShell 7.6 وطبعتهم)، و [[Register-ScheduledTask]] هو اللي بيكتب المهمة في ويندوز. ونتايج التسجيل والتشغيل تحت من التجربة اللي في الحل (مهمة تجربة اتسجلت واتمسحت).

---

## ١. السكربت والبرنامج اللي هيشغّله

~~~powershell
$script = "C:\scripts\backup.ps1"
$pwsh = (Get-Command pwsh).Source
~~~

- [[Get-Command pwsh]] بيدوّر على [[pwsh]] في الأماكن اللي في الـ PATH، و [[.Source]] المسار الكامل للملف.

~~~text الناتج على جهاز PowerShell 7 فيه من Microsoft Store
C:\Program Files\WindowsApps\Microsoft.PowerShell_7.6.6.0_x64__8wekyb3d8bbwe\pwsh.exe
~~~

لاحظ رقم النسخة جوه المسار: ده هيتغير مع أول تحديث (الـ deep بيشرح الحل). لو متسطب بـ winget أو MSI هيبقى [[C:\Program Files\PowerShell\7\pwsh.exe]] وده ثابت.

---

## ٢. «هيشغّل إيه»: [[New-ScheduledTaskAction]]

~~~powershell
$action = New-ScheduledTaskAction -Execute $pwsh -Argument ('-NoProfile -ExecutionPolicy Bypass -File "{0}"' -f $script) -WorkingDirectory (Split-Path $script)
~~~

سطر طويل، نفكّه حتة حتة:

### [[('...' -f $script)]]

[[-f]] بيحط [[$script]] مكان [[{0}]] في النص (درس النصوص). النص بين [[' ']] فالـ [[" "]] اللي جواه بتفضل زي ما هي:

~~~text الناتج
-NoProfile -ExecutionPolicy Bypass -File "C:\scripts\backup.ps1"
~~~

ودي الـ arguments اللي pwsh هياخدها:

| الـ argument | معناه |
|---|---|
| [[-NoProfile]] | متحمّلش الـ profile بتاعك (أسرع، وميعتمدش على إعداداتك) |
| [[-ExecutionPolicy Bypass]] | اسمح بتشغيل السكربت ده للمرة دي بس |
| [[-File "..."]] | شغّل الملف ده، والمسار بين علامات تنصيص عشان لو فيه مسافة |

### [[(Split-Path $script)]]

[[Split-Path]] بيشيل اسم الملف ويسيب الفولدر: [[C:\scripts]]. والأقواس بتنفّذه الأول وتحط ناتجه في [[-WorkingDirectory]]، يعني المهمة هتشتغل من فولدر السكربت (من غيره بتبدأ غالبًا في System32).

### الـ object اللي اتعمل

~~~text الناتج من $action | Format-List Execute, Arguments, WorkingDirectory
Execute          : C:\Program Files\WindowsApps\...\pwsh.exe
Arguments        : -NoProfile -ExecutionPolicy Bypass -File "C:\scripts\backup.ps1"
WorkingDirectory : C:\scripts
~~~

---

## ٣. «إمتى»: [[New-ScheduledTaskTrigger]]

~~~powershell
$trigger = New-ScheduledTaskTrigger -Daily -At 9am
~~~

[[-Daily]] كل يوم، و [[-At 9am]] الساعة 9 الصبح (PowerShell فاهم [[9am]] كوقت النهارده). وطبعت الـ trigger:

~~~text الناتج
StartBoundary : 2026-10-06T06:00:00Z
DaysInterval  : 1
Enabled       : True
~~~

[[06:00:00Z]] مش غلط: [[Z]] يعني بتوقيت UTC، والجهاز ده توقيته UTC+3، فـ 9 الصبح عندك = 6 UTC. و [[DaysInterval : 1]] كل يوم واحد.

---

## ٤. إعدادات إضافية

~~~powershell
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable
~~~

[[-StartWhenAvailable]]: لو الجهاز كان مقفول أو نايم الساعة 9، شغّل المهمة أول ما يصحى بدل ما تعدّي اليوم.

---

## ٥. التسجيل

~~~powershell
Register-ScheduledTask -TaskName "DailyBackup" -Action $action -Trigger $trigger -Settings $settings -Description "Zip src every morning"
~~~

بيجمع الـ ٣ حتت باسم ([[-TaskName]]) ووصف، ويحفظهم في Task Scheduler. في التجربة طبع سطر فيه [[TaskPath]] بـ [[\]] (المهمة في الفولدر الرئيسي للمكتبة) و [[State]] بـ [[Ready]] (جاهزة ومستنية معادها). من غير [[-User]] بتتسجّل باسمك ومش محتاجة أدمن.

---

## ٦. جرّبها دلوقتي واقرا النتيجة

~~~powershell
Start-ScheduledTask -TaskName "DailyBackup"
Get-ScheduledTaskInfo -TaskName "DailyBackup" | Select-Object LastRunTime, LastTaskResult, NextRunTime
~~~

[[Start-ScheduledTask]] بيشغّلها حالًا بدل ما تستنى بكرة. و [[Get-ScheduledTaskInfo]] بيرجع تاريخ آخر تشغيل ونتيجته والمعاد الجاي. اللي ظهر في التجربة:

| الوقت | [[LastTaskResult]] | معناه |
|---|---|---|
| قبل أي تشغيل | [[267011]] | لسه ماشتغلتش ولا مرة (و LastRunTime بـ 11/30/1999) |
| وهي شغالة | [[267009]] | شغالة دلوقتي |
| بعد ما خلصت | [[0]] | نجحت |

وأي رقم صغير زي [[1]] هو الـ exit code بتاع السكربت نفسه، يعني السكربت فشل. و [[NextRunTime]] طلع بكرة الساعة 9:00 AM.

---

## ٧. المسح

~~~powershell
Unregister-ScheduledTask -TaskName "DailyBackup" -Confirm:$false
~~~

[[-Confirm:$false]] امسح من غير ما تسألني «Are you sure?»، وده لازم في سكربت مفيش حد يرد عليه.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[New-ScheduledTaskAction]] | هيشغّل إيه، بأنهي arguments، ومن أنهي فولدر |
| [[New-ScheduledTaskTrigger]] | إمتى: [[-Daily -At 9am]] أو [[-AtLogOn]] أو [[-AtStartup]] |
| [[New-ScheduledTaskSettingsSet]] | إعدادات زي [[-StartWhenAvailable]] |
| [[Register-ScheduledTask]] | سجّلها باسم |
| [[Start-ScheduledTask]] | شغّلها دلوقتي للتجربة |
| [[Get-ScheduledTaskInfo]] | آخر نتيجة: [[0]] نجاح |
| [[Unregister-ScheduledTask]] | امسحها |

وأهم حاجة: المهمة شغالة من غير شاشة ومن غير الـ profile، فالسكربت لازم مسارات كاملة ومفيهوش أي سؤال.`,
          lines: [
            "مسار السكربت الكامل.",
            "المسار الكامل لـ pwsh.exe.",
            "هيشغّل إيه: pwsh، والـ arguments (المسار بين علامات تنصيص بالـ [[-f]])، ومن أنهي فولدر.",
            "إمتى: كل يوم الساعة 9 الصبح.",
            "لو الجهاز كان مقفول وقتها، شغّلها أول ما يفتح.",
            "سجّل المهمة باسم ووصف.",
            "شغّلها دلوقتي للتجربة.",
            "آخر مرة اشتغلت، ونتيجتها (0 نجح)، والمعاد الجاي.",
            "امسح المهمة من غير سؤال تأكيد."
          ],
          sol: R`جربتها على ويندوز 11 من PowerShell عادي (مش أدمن)، بمهمة تجربة سكربتها في فولدر اسمه فيه مسافة ([[sched dir]])، ومسحتها في الآخر. [[Register-ScheduledTask]] طبع جدول فيه [[TaskPath]] بـ [[\]] و [[TaskName]] باسمها و [[State]] بـ Ready. وقبل التشغيل [[Get-ScheduledTaskInfo]] طلّع [[LastRunTime]] بـ [[11/30/1999]] و [[LastTaskResult]] بـ [[267011]] (لسه ماشتغلتش). وبعد [[Start-ScheduledTask]]: وهي شغالة [[267009]]، ولما خلصت (ثانية أو اتنين) [[0]]، و [[NextRunTime]] بكرة الساعة 9:00 AM، والـ zip اتعمل في backups جنب السكربت، والفولدر الحالي جوه السكربت كان فولدر السكربت (بفضل [[-WorkingDirectory]]). نفس النتيجة لما [[-Execute]] كان pwsh من Microsoft Store أو [[powershell.exe]].

خلي بالك: أول مرة المهمة فضلت [[Queued]] حوالي 10 ثواني قبل ما تبدأ، و [[LastTaskResult]] كان بيقول [[0]] وهي لسه مبدأتش. فبص على [[(Get-ScheduledTask -TaskName "DailyBackup").State]] كمان، واستنى لما تبقى Ready. ولو [[1]] أو أي رقم صغير، السكربت نفسه فشل، فشغّله بنفس السطر من الترمنال ([[pwsh -NoProfile -File "C:\scripts\backup.ps1"]]) عشان تشوف الـ error، أو اقرا اللوج لو عامل transcript. ولو الـ zip اتعمل في System32 بدل backups، يبقى السكربت بيستخدم مسار نسبي من غير [[$PSScriptRoot]] ولا [[-WorkingDirectory]].`
        }
      ]
    }
]);
