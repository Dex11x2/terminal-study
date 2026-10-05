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
    },
    {
      t: "تحكّم في جهازك من الترمنال",
      l: 3,
      n: R`مواصفات الجهاز، والحافظة، والتحميل، وتحديث البرامج، والشغل في الخلفية، ومراقبة الفولدرات، والتنبيهات، والقفل والإطفاء في معاد: حاجات بتعملها بالماوس كل يوم وتقدر تعملها بسطر أو تحطها في سكربت`,
      items: [
        {
          cmd: "Get-CimInstance",
          title: "مواصفات جهازك وحالته",
          desc: R`[[Get-CimInstance]] بيسأل ويندوز عن أي معلومة عن الجهاز: نسخة الويندوز، وآخر مرة اشتغل، والبروسيسور، والرام، والبطارية، وكارت الشاشة. ويندوز بيعرض المعلومات دي في «classes» أساميها بتبدأ بـ [[Win32_]]، وكل class بيرجع object بخصائص تختار منها بـ [[Select-Object]].

[[Win32_OperatingSystem]] فيه [[Caption]] اسم الويندوز، و [[Version]]، و [[LastBootUpTime]] آخر تشغيل، و [[TotalVisibleMemorySize]] و [[FreePhysicalMemory]] الرام الكلية والفاضية بالكيلوبايت. الجيجا = 1048576 كيلوبايت، وده نفس رقم [[1MB]] في PowerShell، فالقسمة على [[1MB]] بتطلّعهم جيجا. والطرح [[(Get-Date) - ...]] بين تاريخين بيرجع مدة (TimeSpan)، فده الـ uptime: الجهاز شغال بقاله قد إيه. و [[Win32_Processor]] البروسيسور وعدد الـ cores، و [[Win32_Battery]] نسبة الشحن وحالة البطارية.

[[@{ n = "RAM_GB"; e = { ... } }]] اسمها calculated property: عمود جديد [[n]] اسمه و [[e]] كود بيحسب قيمته، و [[$_]] جواه هو الـ object الحالي. و [[[math]::Round(x, 1)]] تقريب لرقم واحد بعد العلامة. وآخر سطرين: [[powercfg /batteryreport]] بيعمل تقرير HTML عن البطارية (السعة الأصلية والسعة دلوقتي وتاريخ الاستخدام)، و [[/output]] مكان الملف، و [[ii]] بيفتحه في المتصفح.

ده ويندوز بس، وشغال في 5.1 و 7. ولو شفت في شرح قديم [[Get-WmiObject]]، ده الأمر القديم اللي اتشال من PowerShell 7، و [[Get-CimInstance]] بديله في الاتنين.`,
          example: R`Get-CimInstance Win32_OperatingSystem | Select-Object Caption, Version, LastBootUpTime
(Get-Date) - (Get-CimInstance Win32_OperatingSystem).LastBootUpTime
Get-CimInstance Win32_Processor | Select-Object Name, NumberOfCores, NumberOfLogicalProcessors
Get-CimInstance Win32_OperatingSystem | Select-Object @{ n = "RAM_GB"; e = { [math]::Round($_.TotalVisibleMemorySize / 1MB, 1) } }, @{ n = "FreeGB"; e = { [math]::Round($_.FreePhysicalMemory / 1MB, 1) } }
Get-CimInstance Win32_Battery | Select-Object EstimatedChargeRemaining, BatteryStatus
powercfg /batteryreport /output "$env:TEMP\battery.html"
ii "$env:TEMP\battery.html"`,
          try: R`اعرف الجهاز شغال بقاله كام يوم من غير restart، وطلّع تقرير البطارية وقارن DESIGN CAPACITY بـ FULL CHARGE CAPACITY.`,
          deep: {
            why: R`«الجهاز ده فيه رام كام؟ البروسيسور إيه؟ البطارية حالتها إيه؟ آخر restart إمتى؟» أسئلة بتتسأل في الدعم الفني، وقبل ما تسطّب برنامج تقيل، ولما تشتري لابتوب مستعمل. بدل ما تلف في Settings و Task Manager و Device Manager، كله من مكان واحد وتقدر تحفظه في ملف أو تبعته.`,
            how: R`CIM (و WMI قبله) نظام في ويندوز بيعرض كل حاجة عن الجهاز كـ classes. [[Get-CimClass Win32_*]] بيعرض الأسامي (مئات)، وأشهرها: [[Win32_ComputerSystem]] (الشركة والموديل والرام الكلية بالبايت)، و [[Win32_LogicalDisk]] (الديسكات، شوف disk-report.ps1)، و [[Win32_VideoController]] (كارت الشاشة ونسخة الدرايفر)، و [[Win32_BIOS]] (نسخة الـ BIOS والـ serial number).

[[Get-CimInstance Win32_Processor | Select-Object *]] بيعرض كل الخصائص لو مش عارف اسم اللي عايزه. و [[-Filter "DriveType=3"]] بيفلتر عند ويندوز نفسه قبل ما الناتج يوصلك، وده أسرع من [[Where-Object]] بعدها.

الوحدات بتختلف من class للتاني، وده أكتر حاجة بتلخبط: [[Win32_OperatingSystem]] الرام فيه بالكيلوبايت، و [[TotalPhysicalMemory]] في [[Win32_ComputerSystem]] بالبايت (فتقسم على [[1GB]]). والرقمين ممكن يختلفوا شوية، لأن الأول الرام اللي ويندوز شايفها بعد ما كارت الشاشة المدمج ياخد نصيبه.

[[BatteryStatus]] أرقام: [[1]] شغال على البطارية، و [[2]] على الكهربا (مش لازم بيشحن)، و [[6]] بيشحن. و [[Get-ComputerInfo]] بيرجع حاجات كتير مرة واحدة بس بياخد ثواني، فاستخدمه لما تحتاج صورة كاملة.`,
            when: R`لما تحتاج مواصفات الجهاز بسرعة أو تحطها في تقرير، أو قبل ما تشتري لابتوب مستعمل (تقرير البطارية بيقولك فاضل فيها كام في المية من سعتها)، أو في سكربت بيقرر حاجة حسب الرام أو نوع الجهاز.`,
            mistakes: R`تقسم [[TotalVisibleMemorySize]] على [[1GB]] فيطلع رقم صغير جدًا، لأنه أصلًا بالكيلوبايت. أو تستخدم [[Get-WmiObject]] من شرح قديم في PowerShell 7 فيطلع «is not recognized». أو تصدّق [[EstimatedRunTime]] والجهاز على الشاحن (بيطلع رقم ضخم معناه «مش معروف»). أو تبعت ناتج [[Win32_BIOS]] لحد وفيه الـ serial number بتاع جهازك.`
          },
          lines: [
            "اسم الويندوز ونسخته وآخر مرة اشتغل.",
            "الـ uptime: دلوقتي ناقص وقت التشغيل = مدة (TimeSpan).",
            "اسم البروسيسور، وعدد الـ cores الحقيقية، وعدد الـ threads.",
            "الرام الكلية والفاضية بالجيجا في عمودين محسوبين (الأصل بالكيلوبايت).",
            "نسبة شحن البطارية وحالتها (2 = على الكهربا).",
            "اعمل تقرير HTML عن البطارية في فولدر TEMP.",
            "افتح التقرير في المتصفح."
          ],
          sol: R`[[(Get-Date) - (Get-CimInstance Win32_OperatingSystem).LastBootUpTime]] بيطلع TimeSpan: جربتها فطلع [[Days : 1]] و [[Hours : 16]] و [[Minutes : 47]] وتحتهم خصائص Total كتير. ولو عايزه سطر واحد: [[((Get-Date) - $os.LastBootUpTime).ToString("d\.hh\:mm")]] طلع [[1.16:47]] (يوم و 16 ساعة و 47 دقيقة). ولو الرقم أيام كتير والجهاز تقيل، restart ساعات بيحل.

و [[Win32_Battery]] طلع [[EstimatedChargeRemaining : 61]] و [[BatteryStatus : 2]] (على الكهربا)، و [[EstimatedRunTime]] طلع [[71582788]] وده معناه «مش معروف» مش دقايق بجد. على جهاز ديسكتوب مفيش بطارية فمش هيطلع حاجة خالص. وتقرير البطارية اتعمل من غير أدمن وطبع [[Battery life report saved to file path ...battery.html.]]، وجواه [[DESIGN CAPACITY 90,005 mWh]] و [[FULL CHARGE CAPACITY 51,291 mWh]]، يعني البطارية دي بتشيل حوالي 57% من سعتها الأصلية.`,
          solCode: R`$os = Get-CimInstance Win32_OperatingSystem
((Get-Date) - $os.LastBootUpTime).ToString("d\.hh\:mm")
powercfg /batteryreport /output "$env:TEMP\battery.html"
ii "$env:TEMP\battery.html"`
        },
        {
          cmd: "Set-Clipboard / Get-Clipboard",
          title: "انسخ ناتج أي أمر للحافظة",
          desc: R`[[Set-Clipboard]] بيحط أي نص في الحافظة (clipboard) كأنك عملت Ctrl+C، و [[Get-Clipboard]] بيقرا اللي فيها كأنك عملت Ctrl+V، فتنقل ناتج أمر لإيميل أو شات أو ملف من غير ما تحدده بالماوس. زي [[pbcopy]] و [[pbpaste]] في الماك و [[clip]] في CMD، واختصاراتهم في PowerShell 7 [[scb]] و [[gcb]].

[[(Get-Location).Path]] مسار الفولدر الحالي كنص. و [[Get-Content $HOME\.ssh\id_ed25519.pub]] بيقرا الـ SSH public key بتاعك عشان تلزقه في GitHub. ولما تبعت objects (جدول) لازم [[Out-String]] الأول: بيحوّل الجدول لنفس النص اللي بتشوفه على الشاشة، ومن غيره الحافظة هيتحط فيها حاجة زي [[@{Name=chrome; Id=1234}]]. و [[WS]] اختصار [[WorkingSet]] (الرام اللي العملية ماسكاها).

[[Get-Clipboard]] بيرجع كل سطر لوحده (array)، و [[-Raw]] بيرجع النص كله حتة واحدة، وده اللي محتاجه مع [[Measure-Object -Line -Word -Character]] (عدد السطور والكلمات والحروف). وآخر سطر بيقرا اللي في الحافظة، ويرتبه ويشيل المكرر بـ [[Sort-Object -Unique]]، ويرجّعه الحافظة: انسخ لستة إيميلات أو أسامي من أي مكان، شغّل السطر، والصق.

في PowerShell 7 الأوامر دي نص بس، و [[-Append]] بيزوّد سطر على اللي موجود بدل ما يمسحه. و Windows PowerShell 5.1 فيه [[Get-Clipboard -Format Image]] و [[FileDropList]] (صور وملفات منسوخة)، ودول اتشالوا في 7.`,
          example: R`(Get-Location).Path | Set-Clipboard
Get-Content $HOME\.ssh\id_ed25519.pub | Set-Clipboard
Get-Process | Sort-Object WS -Descending | Select-Object -First 5 Name, Id | Out-String | Set-Clipboard
Get-Clipboard
Get-Clipboard -Raw | Measure-Object -Line -Word -Character
Get-Clipboard | Sort-Object -Unique | Set-Clipboard`,
          try: R`انسخ من أي مكان كذا سطر فيهم تكرار (مثلًا banana و apple و banana و cherry و apple كل واحد في سطر)، وشغّل آخر سطر، والصق في Notepad.`,
          deep: {
            why: R`شغل كتير في الترمنال بيخلص بإنك تنقل حاجة لمكان تاني: مسار تبعته لزميل، أو هاش ملف، أو الـ public key لـ GitHub، أو جدول في issue. التحديد بالماوس في الترمنال بيلخبط السطور الطويلة وبيزوّد مسافات، و [[Set-Clipboard]] بينقل النص بالظبط.`,
            how: R`[[Set-Clipboard]] بياخد من الـ pipeline أو من [[-Value]]، ولو جاله كذا عنصر بيحط كل واحد في سطر. وأي object مش نص بيتحوّل بالـ ToString بتاعه، وده سبب [[@{Name=...}]] الغريبة، فـ [[Out-String]] أو [[ConvertTo-Csv]] (لو هتلزقه في Excel) أو [[ConvertTo-Json]] قبله. و [[Out-String]] بيحط سطر فاضي فوق وتحت، فلو مضايقك: [[(... | Out-String).Trim() | Set-Clipboard]].

[[clip.exe]] القديم (من CMD) شغال برضه: [[Get-Content file.txt | clip]]، بس بيزوّد سطر جديد في آخر النص (جربتها)، و [[Set-Clipboard]] لأ.

في PowerShell 7.4 وأحدث فيه [[Set-Clipboard -AsOSC52]]: لو انت داخل على سيرفر بـ SSH، بيبعت النص للترمنال اللي على جهازك (Windows Terminal بيدعمه)، فيتنسخ في حافظة جهازك انت مش حافظة السيرفر.

وحافظة ويندوز بتحفظ تاريخ لو مفعّل (Win+V)، فأي باسورد أو توكن نسخته بـ Set-Clipboard هيفضل في التاريخ ده.`,
            when: R`كل ما تحتاج تنقل ناتج من الترمنال لأي مكان، أو العكس (تنسخ لستة من صفحة وتعالجها في PowerShell وترجعها). وفي السكربتات: سكربت يعمل باسورد عشوائي أو لينك ويحطه في الحافظة على طول.`,
            mistakes: R`تبعت جدول من غير [[Out-String]] فتلزق [[@{Name=...}]]. أو تنسى الفرق بين [[(Get-Clipboard).Count]] (عدد السطور) و [[(Get-Clipboard -Raw).Length]] (عدد الحروف). أو تنسى إن Set-Clipboard بيمسح اللي كان في الحافظة. أو تنسخ توكن وتنسى إنه في تاريخ Win+V.`
          },
          lines: [
            "انسخ مسار الفولدر الحالي.",
            "انسخ الـ SSH public key عشان تلزقه في GitHub.",
            "أكبر ٥ عمليات في الرام كجدول نصي ([[Out-String]] قبل الحافظة).",
            "اقرا اللي في الحافظة، سطر سطر.",
            "عدّ السطور والكلمات والحروف في النص كله ([[-Raw]]).",
            "رتّب اللي في الحافظة واشيل المكرر ورجّعه الحافظة."
          ],
          sol: R`جربتها: حطيت في الحافظة [[banana]] و [[apple]] و [[banana]] و [[cherry]] و [[apple]]، و [[Get-Clipboard -Raw | Measure-Object -Line -Word -Character]] طلع [[Lines 5]] و [[Words 5]] و [[Characters 36]] (الحروف بتعدّ نهاية كل سطر كمان). وبعد آخر سطر، [[Get-Clipboard]] رجّع [[apple]] و [[banana]] و [[cherry]] بس، مترتبين، والـ paste في Notepad طلع نفس التلات سطور.

وجربت الغلطة المشهورة: [[Get-Process | Sort-Object WS -Descending | Select-Object -First 3 Name, Id | Set-Clipboard]] من غير Out-String حط في الحافظة سطور زي [[@{Name=vmmemWSL; Id=18940}]]، ومع [[| Out-String]] اتحط الجدول بالعناوين زي ما بيظهر، بس معاه سطر فاضي فوق وتحت. والعربي اتنقل سليم ([[Set-Clipboard "مرحبا يا عالم"]] ورجع زي ما هو). (رجّعت اللي كان في الحافظة بعد كل تجربة.)`,
          solCode: R`Set-Clipboard -Value "banana", "apple", "banana", "cherry", "apple"
Get-Clipboard -Raw | Measure-Object -Line -Word -Character
Get-Clipboard | Sort-Object -Unique | Set-Clipboard
Get-Clipboard`
        },
        {
          cmd: "Invoke-WebRequest -OutFile",
          title: "نزّل ملف واتأكد إنه سليم",
          desc: R`[[Invoke-WebRequest]] (اختصاره [[iwr]]) بيطلب لينك، و [[-OutFile]] بيحفظ الرد في ملف بدل ما يعرضه، فده المقابل لـ [[wget]] و [[curl -o]]. والمثال بينزّل [[jq]] (أداة JSON صغيرة، حوالي ميجا) من GitHub ويتأكد إن الملف هو هو اللي المشروع نشره.

[[$ProgressPreference = 'SilentlyContinue']] بيقفل شريط التقدم: في Windows PowerShell 5.1 الشريط ده بيبطّأ تحميل الملفات الكبيرة جدًا، فلازم السطر ده هناك، وفي 7 مش بيضر. و [[Join-Path $env:TEMP "jq.exe"]] بيبني المسار في فولدر الـ TEMP.

التحقق: مشاريع كتير بتنشر ملف فيه الـ SHA256 لكل ملف (هنا [[sha256sum.txt]]). [[Invoke-RestMethod]] بيجيبه كنص، و [[-split '\n']] بيقطّعه سطور، و [[Where-Object { $_ -like '*jq-windows-amd64.exe' }]] بيختار سطر الملف بتاعنا، و [[($line -split '\s+')[0]]] أول كلمة فيه (الهاش)، و [[\s+]] يعني «مسافة أو أكتر»، و [[[0]]] أول عنصر. وبعدين [[Get-FileHash]] (درس Get-FileHash) بيحسب هاش الملف اللي نزل، و [[-eq]] بيقارن من غير ما يفرّق بين الكابيتال والسمول. لو [[True]] الملف سليم ومحدش عدّل فيه.

[[-Resume]] (PowerShell 7 بس) بيكمّل تحميل اتقطع من مكان ما وقف بدل ما يبدأ من الأول. و [[curl.exe]] موجود في ويندوز 10 و 11: [[-L]] يمشي ورا الـ redirects (GitHub بيعمل redirect لكل تحميل)، و [[-o]] اسم الملف. اكتب [[curl.exe]] مش [[curl]]، لأن [[curl]] في 5.1 اختصار لـ Invoke-WebRequest.`,
          example: R`$ProgressPreference = 'SilentlyContinue'
$url = "https://github.com/jqlang/jq/releases/download/jq-1.8.2/jq-windows-amd64.exe"
$out = Join-Path $env:TEMP "jq.exe"
Invoke-WebRequest $url -OutFile $out
$sums = Invoke-RestMethod "https://github.com/jqlang/jq/releases/download/jq-1.8.2/sha256sum.txt"
$line = $sums -split '\n' | Where-Object { $_ -like '*jq-windows-amd64.exe' }
(Get-FileHash $out).Hash -eq ($line -split '\s+')[0]
Invoke-WebRequest $url -OutFile $out -Resume
curl.exe -L -o jq.exe $url`,
          try: R`نزّل الملف وقارن الهاش، وبعدين غيّر حرف في الهاش المتوقع وشوف False. وجرّب [[curl.exe -o test.exe $url]] من غير [[-L]] وشوف حجم الملف.`,
          deep: {
            why: R`تسطيب أداة على سيرفر أو جهاز جديد من غير متصفح، أو سكربت setup بينزّل اللي محتاجه، أو تحميل backup من رابط. والتحقق بالهاش مش رفاهية: لو التحميل اتقطع، أو حد عدّل الملف في السكة، أو نزلت من mirror مضروب، الهاش بيكشفه قبل ما تشغّل حاجة.`,
            how: R`[[Invoke-WebRequest]] من غير [[-OutFile]] بيرجع object فيه [[StatusCode]] و [[Headers]] و [[Content]]. ولو عايز حجم الملف قبل ما تنزّله: [[(Invoke-WebRequest $url -Method Head).Headers['Content-Length']]] (طلع [[1035264]] للملف ده). ومع [[-OutFile]] مش بيرجع حاجة إلا لو زوّدت [[-PassThru]]. وبيمشي ورا الـ redirects لوحده، على عكس curl.

[[-Resume]] بيقول للسيرفر «ابعتلي من البايت رقم كذا» (Range request)، فلازم السيرفر يدعمها، و GitHub بيدعمها.

الهاش لازم يبقى من مصدر رسمي (صفحة الـ release نفسها)، لأن لو حد قدر يغيّر الملف ممكن يغيّر ملف الهاش اللي جنبه. ومشاريع كتير بتنشر توقيع (signature) كمان، وده أقوى.

في 5.1 ضيف [[-UseBasicParsing]] لـ Invoke-WebRequest (من غيره ممكن يحاول يستخدم Internet Explorer ويطلع error)، وعلى ويندوز قديم ممكن تحتاج تفعّل TLS 1.2 (شوف check-site.ps1). ولو ملف كبير والنت بيقطع كتير، [[Start-BitsTransfer]] (الدرس الجاي) بيكمّل لوحده.`,
            when: R`أي تحميل من سكربت أو من سيرفر مفيهوش متصفح، وأي ملف تنفيذي (exe أو msi أو zip فيه برامج) نزّلته من النت قبل ما تشغّله.`,
            mistakes: R`تنسى [[$ProgressPreference]] في 5.1 فملف كبير ياخد أضعاف وقته. أو تكتب [[curl -o]] في 5.1 فيطلع error غريب لأنه Invoke-WebRequest مش curl. أو [[curl.exe]] من غير [[-L]] مع GitHub فتلاقي ملف 0 بايت. أو تقارن الهاش بـ [[-ceq]] (بيفرّق بين الكابيتال والسمول) فيطلع False والملف سليم. أو تحفظ في فولدر مش موجود: [[-OutFile]] مش بيعمل الفولدرات، وبيطلع [[Could not find a part of the path]].`
          },
          lines: [
            "اقفل شريط التقدم (في 5.1 بيبطّأ التحميل جدًا).",
            "لينك الملف من صفحة الـ releases.",
            "المكان اللي هيتحفظ فيه، في TEMP.",
            "نزّل واحفظ في الملف (زي wget).",
            "هات ملف الهاشات اللي المشروع نشره، كنص.",
            "قطّعه سطور وخد سطر الملف بتاعنا.",
            "احسب هاش الملف اللي نزل وقارنه بأول كلمة في السطر: True يعني سليم.",
            "كمّل تحميل اتقطع من مكان ما وقف (7 بس).",
            "نفس التحميل بـ curl الحقيقي: [[-L]] يمشي ورا الـ redirect و [[-o]] اسم الملف."
          ],
          sol: R`جربت المثال على PowerShell 7.6: التحميل خد حوالي ثانيتين، و [[jq.exe]] حجمه [[1035264]] بايت، والسطر اللي اتلقط من sha256sum.txt كان [[a6fc67fedaf9128a3309a1e2ebb8b986aeccf70122ee46d2cb4849e423f0c627  jq-windows-amd64.exe]]، و [[Get-FileHash]] طلع نفس الرقم بحروف كابيتال، والمقارنة رجعت [[True]]. و [[& $out --version]] طبع [[jq-1.8.2]]. ولو غيّرت حرف في الهاش المتوقع بترجع [[False]].

[[-Resume]] على ملف كامل مش بيغيّر فيه حاجة، بس بيطبع رد السيرفر: [[StatusCode : 416]] و [[StatusDescription : RequestedRangeNotSatisfiable]]، يعني «مفيش حاجة فاضلة تتنزل». وعلى ملف ناقص (قصّيته لـ 500000 بايت) كمّل الباقي بـ [[206]] (Partial Content) والهاش طلع مطابق. و [[curl.exe -o test.exe $url]] من غير [[-L]] عمل ملف حجمه [[0]] بايت من غير أي error، لأن GitHub رد بـ redirect و curl حفظ الرد ده بس؛ ومع [[-L]] نزل الملف كامل [[1035264]] بايت. الأرقام دي لنسخة 1.8.2، ولو نزّلت نسخة تانية هات لينكها وهاشها من صفحة الـ releases.`,
          solCode: R`(Get-Item $out).Length
& $out --version
curl.exe -o test.exe $url
(Get-Item test.exe).Length`
        },
        {
          cmd: "Start-BitsTransfer",
          title: "تحميل في الخلفية بيكمّل لوحده",
          desc: R`[[Start-BitsTransfer]] بينزّل ملفات عن طريق BITS: خدمة في ويندوز (هي اللي Windows Update بيستخدمها) بتنزّل في الخلفية، وتكمّل لوحدها لو النت قطع أو الجهاز اتعمله restart. شغال في PowerShell 7 على ويندوز كمان (جربته على 7.6)، بس مش موجود على لينكس والماك.

[[-Source]] اللينك و [[-Destination]] مكان الحفظ. من غير حاجة زيادة الأمر بيستنى لحد ما يخلص (وبيعرض شريط تقدم). و [[-Asynchronous]] بيرجعلك على طول ويسيب التحميل شغال، ويرجّع «job» تحفظه في متغير، و [[-DisplayName]] اسم يبان في الليستة.

[[Get-BitsTransfer]] بيعرض تحميلاتك: [[JobState]] الحالة ([[Connecting]] بيتصل و [[Transferring]] بينزّل و [[Transferred]] خلص و [[Error]] فشل و [[TransientError]] مشكلة مؤقتة وهيحاول تاني لوحده)، و [[BytesTransferred]] و [[BytesTotal]]. والمهم: مع [[-Asynchronous]] الملف مش بيظهر في مكانه غير بعد [[Complete-BitsTransfer]]، لحد كده بيبقى ملف مؤقت مخفي. و [[Suspend-BitsTransfer]] و [[Resume-BitsTransfer]] وقّف وكمّل، و [[Remove-BitsTransfer]] إلغاء.

الـ [[while]] في المثال بيستنى طول ما الحالة لسه في التحميل ([[-in]] بيشوف القيمة موجودة في اللستة ولا لأ)، و [[Start-Sleep -Seconds 1]] بين كل فحص والتاني.`,
          example: R`$url = "https://github.com/jqlang/jq/releases/download/jq-1.8.2/jq-windows-amd64.exe"
Start-BitsTransfer -Source $url -Destination "$env:TEMP\jq-bits.exe"
$job = Start-BitsTransfer -Source $url -Destination "$env:TEMP\jq-async.exe" -Asynchronous -DisplayName "jq"
Get-BitsTransfer | Select-Object DisplayName, JobState, BytesTransferred, BytesTotal
while ($job.JobState -in "Queued", "Connecting", "Transferring") { Start-Sleep -Seconds 1 }
Complete-BitsTransfer $job
Get-Item "$env:TEMP\jq-async.exe"`,
          try: R`ابدأ تحميل ملف كبير (installer أو ISO) بـ [[-Asynchronous]]، واقفل PowerShell، وافتح نافذة جديدة واكتب [[Get-BitsTransfer]].`,
          deep: {
            why: R`ملف كبير على نت بيقطع: Invoke-WebRequest لو اتقطع بيفشل (إلا لو انت على 7 واستخدمت [[-Resume]] بنفسك). BITS بيكمّل لوحده من مكان ما وقف، حتى بعد restart، وتقدر تخليه يستخدم النت الفاضي بس عشان ميبطّأش شغلك.`,
            how: R`BITS (Background Intelligent Transfer Service) خدمة في ويندوز، والتحميلات محفوظة فيها مش في PowerShell، وكل يوزر بيشوف تحميلاته بس ([[-AllUsers]] للأدمن). و [[-Priority]] فيه [[Foreground]] (الافتراضي، الأسرع) و [[High]] و [[Normal]] و [[Low]] (بيستخدم النت الفاضي بس).

[[Complete-BitsTransfer]] خطوة لازمة مع [[-Asynchronous]]، لأن BITS بيكتب في ملف مؤقت ويستنى تأكيدك، عشان محدش يستخدم ملف لسه نازل نصه. والـ jobs اللي ملهاش Complete بتفضل في الليستة لحد ما BITS يلغيها لوحده بعد مدة. ولو حصل Error، [[$job.ErrorDescription]] فيها السبب.

BITS محتاج السيرفر يقول حجم الملف ويقبل يبعته حتت (Range requests)، فمش كل لينك هينفع (لينكات بتتولد وقت الطلب ممكن تفشل). و [[Start-BitsTransfer]] بيقبل كذا ملف مرة واحدة: [[-Source]] و [[-Destination]] كل واحد array بنفس الترتيب.

الموديول [[BitsTransfer]] جاي مع ويندوز في فولدر موديولات 5.1، و PowerShell 7 بيحمّله عادي من هناك (جربتها).`,
            when: R`ملفات كبيرة، أو نت ضعيف، أو تحميل عايزه يكمّل وانت قافل الترمنال، أو سكربت على جهاز بيدخل sleep. للملفات الصغيرة والسريعة Invoke-WebRequest أبسط.`,
            mistakes: R`تنسى [[Complete-BitsTransfer]] وتدوّر على الملف ومتلاقيهوش. أو تعمل Complete والحالة [[Error]] فيطلع error، اقرا [[$job.ErrorDescription]] الأول. أو تشغّله من SSH أو جلسة remote فممكن يفشل لأن BITS محتاج يوزر داخل على الجهاز. أو تفتكره شغال على لينكس: الموديول ويندوز بس.`
          },
          lines: [
            "اللينك.",
            "تحميل عادي: الأمر بيستنى لحد ما يخلص.",
            "تحميل في الخلفية: يرجّع job على طول والتحميل يكمّل.",
            "اعرض تحميلاتك وحالة كل واحد.",
            "استنى طول ما الحالة في الطابور أو بيتصل أو بينزّل، وافحص كل ثانية.",
            "أكّد إنه خلص: دلوقتي بس الملف بيظهر في مكانه.",
            "اتأكد إن الملف موجود وشوف حجمه."
          ],
          sol: R`جربت المثال على PowerShell 7.6.6: التحميل العادي خلص والملف [[1035264]] بايت. ومع [[-Asynchronous]]، أول ما رجع كان [[JobState : Connecting]] و [[BytesTotal : 18446744073709551615]] (ده أكبر رقم ممكن، ومعناه «الحجم لسه مش معروف»)، وبعد ثواني [[Get-BitsTransfer]] طلع [[jq  Transferred  1035264  1035264]]. و [[Test-Path]] على الملف قبل [[Complete-BitsTransfer]] رجع [[False]]، وبعده الملف ظهر بحجمه، و [[Get-BitsTransfer]] بقى فاضي.

في تجربتك: التحميل بيفضل في [[Get-BitsTransfer]] حتى بعد ما تقفل النافذة، لأن BITS خدمة في ويندوز مش جزء من PowerShell. امسكه تاني بالـ DisplayName بتاعه: [[$job = Get-BitsTransfer -Name "later"]] (الـ solCode)، ولما يبقى [[Transferred]] اعمل [[Complete-BitsTransfer $job]].`,
          solCode: R`$job = Start-BitsTransfer -Source $url -Destination "$env:TEMP\jq-later.exe" -Asynchronous -DisplayName "later"
# اقفل النافذة وافتح واحدة جديدة
$job = Get-BitsTransfer -Name "later"
$job | Select-Object JobState, BytesTransferred, BytesTotal
Complete-BitsTransfer $job`
        },
        {
          cmd: "winget upgrade / export / import",
          title: "حدّث كل برامجك وانقلها لجهاز جديد",
          desc: R`[[winget]] (مدير البرامج اللي سطّبت بيه PowerShell 7 في أول درس) بيعمل حاجتين بيوفروا ساعات: يحدّث كل البرامج المتسطبة بأمر واحد، ويكتب لستة برامجك في ملف JSON تسطّبها كلها على جهاز جديد بأمر واحد.

[[winget upgrade]] لوحده بيعرض البرامج اللي ليها نسخة أحدث من غير ما يحدّث حاجة: الاسم، و [[Id]] (الاسم الفريد للباكدج)، و [[Version]] اللي عندك، و [[Available]] الجديدة، و [[Source]] جاية منين ([[winget]] أو [[msstore]]). و [[--id Git.Git -e]] برنامج واحد بالـ Id بتاعه بالظبط. و [[--all]] بيحدّثهم كلهم، و [[--silent]] من غير نوافذ تسطيب (لو البرنامج بيدعم)، و [[--accept-package-agreements]] و [[--accept-source-agreements]] يوافقوا على الشروط من غير ما يسألوك.

[[winget pin add]] بيثبّت برنامج على نسخته فـ [[--all]] ميلمسوش (مفيد لبرنامج نسخته الجديدة فيها مشكلة، أو SDK شغلك محتاج نسخة معينة منه). و [[winget export -o]] بيكتب البرامج اللي winget يعرفها في ملف، و [[winget import -i]] على الجهاز الجديد بيسطّبهم كلهم، و [[--ignore-unavailable]] يكمّل لو برنامج مش موجود.

التحديث والتسطيب بيحتاجوا أدمن لبرامج كتير (هيطلع سؤال UAC لكل واحد، أو شغّل الترمنال كأدمن مرة). وبعض البرامج لازم تبقى مقفولة وانت بتحدّثها، وإلا التسطيب يفشل أو يطلب restart.`,
          example: R`winget upgrade
winget upgrade --id Git.Git -e
winget upgrade --all --silent --accept-package-agreements --accept-source-agreements
winget pin add --id Microsoft.DotNet.Runtime.8
winget export -o "$HOME\apps.json"
winget import -i "$HOME\apps.json" --accept-package-agreements --ignore-unavailable`,
          try: R`اعرض البرامج اللي محتاجة تحديث، وطلّع لستة برامجك في ملف وافتحه. (متشغّلش [[--all]] غير وانت فاضي ومقفّل برامجك.)`,
          flag: "danger",
          deep: {
            why: R`كل برنامج بيحدّث نفسه بطريقته (أو مبيحدّثش)، فبتلاقي نسخ قديمة فيها ثغرات. وجهاز جديد أو فورمات معناه يوم كامل تنزّل برامجك واحد واحد وتنسى نصهم. winget بيخلي الاتنين أمر واحد، وملف الـ JSON تحطه في OneDrive أو في repo الـ dotfiles بتاعك.`,
            how: R`winget بيعرف البرامج اللي عندك من «Installed apps» في ويندوز ويطابقها مع مخازنه. اللي متسطب من خارج winget (من موقع البرنامج) بيظهر برضه لو winget لقاه في المخزن، فتقدر تحدّثه من هنا.

[[winget upgrade --all]] بيسطّب النسخ الجديدة واحد ورا التاني، كل برنامج بالـ installer بتاعه، فممكن واحد يطلب restart أو يفتح نافذة رغم [[--silent]]. و [[--include-unknown]] بيضيف البرامج اللي winget مش عارف نسختها.

[[winget pin add --id X]] بيمنع X من [[--all]] بس، ولسه تقدر تحدّثه بإيدك بذكر اسمه ([[--blocking]] بيمنعه خالص). و [[winget pin list]] بيعرض المثبّتين، و [[winget pin remove --id X]] بيشيل.

الـ export بيكتب البرامج اللي ليها مصدر بس، ومن غير [[--include-versions]] مفيهوش أرقام نسخ فالـ import بيسطّب الأحدث. وبرامج msstore محتاجة تبقى داخل بحساب Microsoft. وفيه [[winget list]] كل المتسطب، و [[winget search name]] تدوّر على برنامج، و [[winget show --id X]] تفاصيله.

ولو عايز التحديث يحصل لوحده كل أسبوع: سكربت فيه [[winget upgrade --all ...]] و Register-ScheduledTask (درس لوحده)، بس الأحسن تشوف اللي هيتحدّث الأول.`,
            when: R`مرة كل أسبوع أو اتنين للتحديث، ومرة بعد ما تظبط جهازك للـ export (وكل ما تسطّب حاجة مهمة جديدة). والـ import أول حاجة على أي جهاز جديد.`,
            mistakes: R`تشغّل [[upgrade --all]] وانت في نص شغل فبرنامج مفتوح يتقفل أو يطلب restart. أو تفتكر الـ export بينقل الإعدادات والملفات: هو بينقل أسامي البرامج بس. أو تنسى [[--accept-source-agreements]] في سكربت فيقف مستني «Y». أو تحدّث Node أو Python أو SDK مشروعك محتاج نسخة معينة منه فالمشروع يقع؛ ثبّته بـ [[winget pin add]].`
          },
          lines: [
            "اعرض البرامج اللي ليها تحديث، من غير ما يحدّث حاجة.",
            "حدّث برنامج واحد بالـ Id بتاعه بالظبط.",
            "حدّث كله من غير نوافذ ومن غير أسئلة الموافقة.",
            "ثبّت برنامج على نسخته عشان [[--all]] ميلمسوش.",
            "اكتب لستة برامجك في ملف JSON.",
            "على الجهاز الجديد: سطّب كل اللي في الملف، وكمّل لو حاجة مش موجودة."
          ],
          sol: R`جربت [[winget upgrade]] (winget v1.29) على جهازي فطلع جدول فيه سطور زي [[GitHub CLI  GitHub.cli  2.97.0  2.102.0  winget]] و [[Windows Subsystem for Linux  Microsoft.WSL  2.6.3.0  2.7.13  winget]]، وفي الآخر [[16 upgrades available.]] و [[2 package(s) have version numbers that cannot be determined. Use --include-unknown to see all results.]]

و [[winget export -o apps.json]] طبع سطور كتير زي [[Installed package is not available from any source: ...]] للبرامج اللي مش في أي مخزن (درايفرات وبرامج متسطبة يدوي)، ودي مش هتتنقل. والملف طلع JSON فيه [["Sources"]]، وتحت كل مصدر لستة [["PackageIdentifier"]]: عندي 46 من [[winget]] (زي [[Git.Git]] و [[VideoLAN.VLC]]) و 7 من [[msstore]] بأكواد زي [[XP89DCGQ3K6VLD]]. (مشغّلتش [[upgrade --all]] ولا [[import]] ولا [[pin add]] عشان مغيّرش حاجة على الجهاز.)`,
          solCode: R`winget upgrade
winget export -o "$HOME\apps.json"
Get-Content "$HOME\apps.json" -TotalCount 20`
        },
        {
          cmd: "Measure-Command",
          title: "الأمر ده بياخد قد إيه؟",
          desc: R`[[Measure-Command]] بيشغّل الكود اللي بين [[{ }]] ويرجّع خد وقت قد إيه، زي [[time]] في bash.

الناتج object نوعه TimeSpan، فيه [[TotalSeconds]] و [[TotalMilliseconds]] (الوقت كله بالثواني أو بالملّي)، و [[Seconds]] و [[Milliseconds]] (جزء من الوقت بس: 1.5 ثانية الـ [[Seconds]] بتاعتها 1 والـ [[Milliseconds]] 500). استخدم الـ Total دايمًا.

خلي بالك: Measure-Command بيرمي الـ output بتاع الكود، فمش هتشوف ناتج الأمر اللي بتقيسه، إلا لو حطيت [[| Out-Default]] جواه (بيبعته للشاشة مباشرة). والأقواس [[( ).TotalMilliseconds]] بتشغّل الأمر وتاخد خاصية من الناتج.

السطر التاني بيقيس وقت فتح PowerShell من غير profile، والتالت بالـ profile بتاعك: الفرق هو اللي الإضافات (oh-my-posh و Terminal-Icons ...) بتضيفه على كل نافذة. وآخر 3 سطور بيقارنوا طريقتين بيعملوا نفس الحاجة: array بـ [[+=]] (بتعمل array جديدة وتنسخ اللي فات مع كل عنصر) قصاد إنك تخزّن ناتج الـ [[foreach]] كله مرة واحدة. و [[1..20000]] الأرقام من 1 لـ 20000، و [[-f]] بيحط القيم مكان [[{0}]] و [[{1}]] في النص (درس النصوص)، و [[:N2]] يعني رقم برقمين بعد العلامة.`,
          example: R`Measure-Command { Start-Sleep -Milliseconds 300 }
(Measure-Command { pwsh -NoProfile -c exit }).TotalMilliseconds
(Measure-Command { pwsh -c exit }).TotalMilliseconds
$a = Measure-Command { $arr = @(); foreach ($i in 1..20000) { $arr += $i } }
$b = Measure-Command { $arr = foreach ($i in 1..20000) { $i } }
"+= : {0:N2}s   foreach = : {1:N2}s" -f $a.TotalSeconds, $b.TotalSeconds`,
          try: R`قارن [[1..100000 | ForEach-Object { $_ * 2 }]] بـ [[foreach ($n in 1..100000) { $n * 2 }]] بـ Measure-Command، وشغّل كل واحد مرتين.`,
          deep: {
            why: R`«ده بطيء» إحساس، و Measure-Command بيحوّله رقم. قبل ما تعدّل سكربت عشان تسرّعه، قيس: يمكن البطء في حتة تانية خالص. وبعد التعديل قيس تاني عشان تتأكد إنه اتحسّن فعلًا. ونفس الحكاية للـ profile: كل إضافة شكلها حلو بس بتاخد من وقت فتح كل نافذة.`,
            how: R`[[Measure-Command]] بيشغّل الكود في نفس الـ scope بتاعك، فأي متغير اتعمل جواه ([[$arr]] مثلًا) بيفضل موجود بعدها (جربتها في 5.1 و 7). والـ output بيترمي، لكن [[Write-Host]] بيبان لأنه مش output (درس «Write-Host والـ output»).

القياس مرة واحدة مش دقيق: أول تشغيل بيبقى أبطأ (تحميل موديولات وتجهيز الكود)، والجهاز بيعمل حاجات تانية في نفس الوقت. اعمله كذا مرة وخد المتوسط: [[1..5 | ForEach-Object { (Measure-Command { ... }).TotalMilliseconds } | Measure-Object -Average]].

للأوامر الخارجية نفس الفكرة: [[(Measure-Command { npm run build | Out-Default }).TotalSeconds]] بيوريك ناتج الـ build وبيقيسه. وفي PowerShell 7، [[Get-History]] فيه [[Duration]] لكل أمر شغّلته، فـ [[Get-History | Select-Object -Last 1 CommandLine, Duration]] بيقولك آخر أمر خد قد إيه من غير ما تعيده (في 5.1 الخاصية دي مش موجودة).

ولو عايز تقيس حتت جوه سكربت: [[$sw = [System.Diagnostics.Stopwatch]::StartNew()]] في الأول و [[$sw.Elapsed]] عند أي نقطة (زي check-site.ps1).`,
            when: R`لما سكربت أو build حاسس إنه بطيء، أو بتختار بين طريقتين، أو بعد ما تزوّد حاجة في الـ profile، أو عايز تثبت لحد إن التعديل سرّع فعلًا.`,
            mistakes: R`تقرا [[.Seconds]] أو [[.Milliseconds]] بدل [[.TotalSeconds]]، فـ 2.4 ثانية تطلع «400 ملّي». أو تقيس مرة واحدة وتحكم. أو تستغرب إن الأمر «مطبعش حاجة» (Measure-Command بيرمي الـ output). أو تقارن حاجة نزلت من النت أول مرة بنفس الحاجة وهي جاية من الكاش.`
          },
          lines: [
            "قيس أمر بسيط: الناتج TimeSpan بكل الوحدات.",
            "وقت فتح PowerShell من غير profile بالملّي ثانية.",
            "وقت فتحه بالـ profile بتاعك: الفرق هو تمن إضافاتك.",
            "الطريقة الأولى: array و [[+=]] لعشرين ألف رقم.",
            "الطريقة التانية: خزّن ناتج اللوب كله مرة واحدة.",
            "اطبع الوقتين برقمين بعد العلامة ([[-f]] و [[:N2]])."
          ],
          sol: R`جربتها على PowerShell 7.6.6: [[ForEach-Object]] (الـ pipeline) خد [[0.49]] ثانية، و [[foreach]] (اللوب) خد [[0.10]]، يعني اللوب أسرع حوالي 5 مرات، لأن الـ pipeline بيعدّي كل عنصر على أمر لوحده. وعلى 5.1 كانوا [[0.44]] و [[0.06]]. أرقامك هتختلف حسب الجهاز، المهم النسبة. والمرة التانية غالبًا أسرع شوية من الأولى، فقيس أكتر من مرة.

ومثال الـ array: على PowerShell 7.6 الـ [[+=]] لـ 20000 عنصر خد حوالي ثانية، وتخزين ناتج الـ foreach مرة واحدة خد حوالي [[0.01]] ثانية. وعلى Windows PowerShell 5.1 الـ [[+=]] خد [[11.7]] ثانية (PowerShell 7.5 حسّن [[+=]] كتير، بس لسه أبطأ بفرق كبير). و [[Measure-Command { Start-Sleep -Milliseconds 300 }]] رجّع [[TotalMilliseconds : 325.0354]]: الـ 25 الزيادة وقت تشغيل الأمر نفسه. وفتح PowerShell 7 من غير profile خد حوالي 300 ملّي ثانية.`,
          solCode: R`(Measure-Command { 1..100000 | ForEach-Object { $_ * 2 } }).TotalSeconds
(Measure-Command { foreach ($n in 1..100000) { $n * 2 } }).TotalSeconds`
        },
        {
          cmd: "Start-Job",
          title: "شغّل حاجة في الخلفية وكمّل شغلك",
          desc: R`[[Start-Job]] بيشغّل كود في الخلفية في PowerShell تاني مستقل، والترمنال يرجعلك على طول تكمّل شغلك، وبعدين تجيب الناتج لما يخلص. زي [[&]] في آخر الأمر في bash و [[jobs]] هناك.

كل شغلانة اسمها job ليها رقم واسم وحالة. و [[-Name size]] اسم تنادي بيه الـ job بدل الرقم. والكود بين [[{ }]] بيشتغل في عملية تانية مش شايفة متغيراتك، فـ [[$using:folder]] بتبعتله قيمة المتغير [[$folder]] من عندك. و [[Get-Job]] بيعرض كل الـ jobs: [[State]] ([[Running]] شغالة و [[Completed]] خلصت و [[Failed]] فشلت) و [[HasMoreData]] (فيه ناتج لسه مقريتهوش).

[[Receive-Job]] بيجيب الناتج: [[-Wait]] يستنى لو لسه شغالة، و [[-AutoRemoveJob]] يمسحها من الليستة بعد ما يجيب ناتجها (من غيره بتفضل في [[Get-Job]]). و [[Remove-Job]] بيمسح job (ولو لسه شغالة محتاج [[-Force]]).

في PowerShell 7 فيه اختصار: [[&]] في آخر أي أمر بيعمله job على طول زي bash، فـ [[$j = ping -n 4 github.com &]] بيحط الـ job في [[$j]]. و [[Start-ThreadJob]] (موجود في 7 من غير تسطيب) نفس الفكرة بس في thread جوه نفس العملية، فبيبدأ أسرع بكتير وأخف على الرام.`,
          example: R`$folder = "$HOME\Downloads"
Start-Job -Name size { [math]::Round((Get-ChildItem $using:folder -Recurse -File | Measure-Object Length -Sum).Sum / 1GB, 2) }
Get-Job
Receive-Job -Name size -Wait -AutoRemoveJob
$j = ping -n 4 github.com &
$j | Receive-Job -Wait -AutoRemoveJob
Start-ThreadJob { Invoke-RestMethod https://api.github.com/zen } | Receive-Job -Wait -AutoRemoveJob`,
          try: R`ابدأ job بيحسب حجم فولدر كبير (زي [[C:\Windows]] مع [[-ErrorAction SilentlyContinue]])، وفي نفس الوقت اشتغل عادي في الترمنال، وبعدين هات الناتج.`,
          deep: {
            why: R`حاجات بتاخد وقت ومش محتاج تتفرج عليها: حساب حجم فولدرات، أو ping طويل، أو تحميل، أو build. بدل ما تفتح تاب تاني وتنسى فيه إيه، Start-Job بيشغّلها في الخلفية وتجيب النتيجة لما تحتاجها. وفي سكربت تقدر تشغّل كذا حاجة مع بعض وتستناهم كلهم بـ [[Wait-Job]].`,
            how: R`[[Start-Job]] بيفتح عملية [[pwsh]] جديدة لكل job، وده بياخد وقت ورام، والناتج بيرجعلك نسخة من البيانات (serialized) مش الـ object الأصلي بالـ methods بتاعته. [[Start-ThreadJob]] بيشتغل في thread جوه نفس العملية، فأسرع وأخف، و [[-ThrottleLimit]] بيحدد كام واحد يشتغل مع بعض. ودا نفس اللي [[ForEach-Object -Parallel]] بيستخدمه.

الفولدر اللي الـ job بيبدأ فيه: في PowerShell 7 الفولدر الحالي بتاعك، وفي 5.1 فولدر Documents (جربتها في الاتنين)، فاستخدم مسارات كاملة أو [[$using:PWD]]. و [[&]] في آخر الأمر مش موجود في 5.1 (بيطلع [[The ampersand (&) character is not allowed]]).

الـ jobs عايشة طول ما النافذة مفتوحة: لو قفلت PowerShell كل الـ jobs بتتقفل. لو عايز حاجة تكمّل بعد ما تقفل، ده Start-Process (برنامج منفصل) أو Task Scheduler أو BITS للتحميل.

[[Wait-Job -Timeout 60]] بيستنى لحد 60 ثانية بس، و [[Stop-Job]] بيوقف واحدة شغالة. ولو job فشلت، [[Receive-Job]] بيطبع الـ error بتاعها.`,
            when: R`أي أمر بياخد أكتر من كام ثانية ومش محتاج تتفرج عليه، أو سكربت عايز يعمل كذا حاجة مستقلة مع بعض (يكلّم كذا API أو يفحص كذا سيرفر) بدل واحدة ورا التانية.`,
            mistakes: R`تستخدم متغير من بره جوه الـ job من غير [[$using:]] فيبقى فاضي. أو تعمل [[Start-Job]] لـ 100 حاجة صغيرة فكل واحدة تفتح pwsh جديد وتبقى أبطأ من إنك تعملهم ورا بعض ([[Start-ThreadJob]] أو [[-Parallel]] أحسن). أو تنسى [[Receive-Job]] وتسيب jobs خلصت مالية [[Get-Job]]. أو تشغّل في job حاجة بتسأل سؤال (Read-Host أو تأكيد) فتفضل مستنية للأبد. أو تقفل النافذة وتفتكر الـ job كمّل.`
          },
          lines: [
            "الفولدر اللي هنحسب حجمه.",
            "ابدأ job اسمها size في الخلفية، و [[$using:folder]] بيبعتلها قيمة المتغير.",
            "اعرض الـ jobs وحالتها.",
            "استنى لحد ما تخلص، وهات الناتج، وامسحها من الليستة.",
            "PowerShell 7: [[&]] في آخر أي أمر بيشغّله job.",
            "هات ناتج الـ ping لما يخلص.",
            "thread job (أخف وأسرع) بيكلّم API، وهات الناتج على طول."
          ],
          sol: R`جربت المثال على PowerShell 7.6: [[Start-Job]] طبع سطر الـ job على طول ([[1  size  BackgroundJob  Running]]) والترمنال رجعلي، و [[Get-Job]] طلع نفس السطر و [[HasMoreData True]]، و [[Receive-Job -Wait]] استنى ثواني وطلع [[5.32]] (حجم Downloads عندي بالجيجا). و [[ping ... &]] رجّع job، و [[Receive-Job]] طبع ناتج ping كامل، و [[Start-ThreadJob]] رجّع جملة من GitHub زي [[Accessible for all.]] (بتتغير كل مرة). وفي الآخر [[Get-Job]] بقى فاضي بسبب [[-AutoRemoveJob]].

في تجربتك: الـ job بتاع [[C:\Windows]] بياخد دقيقة أو أكتر وانت شغال عادي، و [[Get-Job win]] هتلاقيه Running، ولما يبقى Completed هات الناتج. ولو نسيت [[$using:]] مع متغير من بره، الـ job هيشوفه فاضي: جربت [[$outer = "hello"]] وجوه الـ job [[$outer]] طلع فاضي و [[$using:outer]] طلع [[hello]].`,
          solCode: R`Start-Job -Name win { (Get-ChildItem C:\Windows -Recurse -File -ErrorAction SilentlyContinue | Measure-Object Length -Sum).Sum / 1GB }
Get-Job win
Receive-Job -Name win -Wait -AutoRemoveJob`
        },
        {
          cmd: "Out-GridView",
          title: "جدول تفاعلي تفلتر وتختار منه",
          desc: R`[[Out-GridView]] (اختصاره [[ogv]]) بيعرض أي ناتج في نافذة جدول: ترتب بالضغط على العمود، وتكتب في خانة Filter اللي فوق تفلتر الصفوف، وتضيف شروط بـ «Add criteria». ومع [[-PassThru]] بيبقى أداة اختيار: تحدد صفوف (Ctrl أو Shift مع الكليك) وتدوس OK فيرجعوا للـ pipeline ويكمّلوا للأمر اللي بعده.

[[-Title]] عنوان النافذة. والسطر التاني بيعرض العمليات بعمود محسوب [[@{ n = "RAM_MB"; e = { ... } }]] (زي درس Get-CimInstance) فيه الرام بالميجا، وبعد ما تختار وتدوس OK بيروحوا لـ [[Stop-Process]] بـ [[-WhatIf]] (يقولك هيقفل إيه من غير ما يقفل). و Stop-Process بيعرف يقرا الـ [[Id]] من أي object جاله. و [[-OutputMode Single]] بيسمح باختيار صف واحد بس، و [[Invoke-Item]] بيفتح الملف المختار. و [[-Wait]] بيخلي الأمر يستنى لحد ما تقفل النافذة، وده لازم لو بتشغّله من سكربت بـ [[pwsh -File]]، وإلا السكربت يخلص والنافذة تتقفل معاه.

ويندوز بس، ومحتاج واجهة رسومية (مش هيشتغل في SSH ولا على Windows Server Core). كان موجود في 5.1، واختفى في PowerShell 6، ورجع في PowerShell 7 على ويندوز.`,
          example: R`Get-Service | Out-GridView
Get-Process | Select-Object Name, Id, @{ n = "RAM_MB"; e = { [math]::Round($_.WorkingSet64 / 1MB) } } | Out-GridView -Title "Pick processes to stop" -PassThru | Stop-Process -WhatIf
Get-ChildItem $HOME\Downloads -File | Sort-Object LastWriteTime -Descending | Out-GridView -Title "Open a file" -OutputMode Single | Invoke-Item
Import-Csv .\disk-report.csv | Out-GridView -Title "Disk report" -Wait`,
          try: R`اعرض العمليات، وفلتر بكلمة [[chrome]] أو [[code]]، ورتّب بـ RAM_MB، واختار اتنين ودوس OK، وشوف سطور What if.`,
          deep: {
            why: R`ساعات عايز تبص على بيانات كتير وتدوّر فيها بإيدك: مئات العمليات أو الخدمات أو صفوف CSV. الجدول في الترمنال بيتقطع وصعب تفلتره، و Excel كتير عليه. و [[-PassThru]] بيحل مشكلة «عايز أختار كام حاجة من لستة وأعمل فيهم حاجة» من غير ما تكتب [[Where-Object]] بشروط.`,
            how: R`[[Out-GridView]] بيعرض الخصائص اللي الـ object بيعرضها افتراضيًا، فاعمل [[Select-Object]] قبله بالأعمدة اللي عايزها بالظبط. والفلتر والترتيب جوه النافذة عرض بس؛ اللي بيرجع مع [[-PassThru]] هو الـ objects اللي اخترتها بكل خصائصها.

[[-OutputMode]] ليه 3 قيم: [[None]] (الافتراضي، عرض بس)، و [[Single]] (صف واحد)، و [[Multiple]] (أكتر من صف، وده نفس [[-PassThru]]).

في PowerShell 7 الأمر جاي في موديول Microsoft.PowerShell.Utility على ويندوز بس. على لينكس والماك أو في SSH فيه بديل جوه الترمنال نفسه: موديول [[Microsoft.PowerShell.ConsoleGuiTools]] وأمره [[Out-ConsoleGridView]] (اختصاره [[ocgv]])، بنفس الفكرة ونفس [[-OutputMode]].

مع [[-PassThru]] أو [[-OutputMode]] أو [[-Wait]] الترمنال بيستنى لحد ما تقفل النافذة، ومن غيرهم بيرجعلك على طول والنافذة فاضلة مفتوحة.`,
            when: R`استكشاف بيانات بسرعة، أو أداة صغيرة لنفسك («اختار الخدمات اللي تتقفل»، «اختار الفولدرات اللي تتضغط»)، أو تعرض نتيجة سكربت لحد مش بيحب الترمنال.`,
            mistakes: R`تشغّله في SSH أو على Server Core فيطلع error لأن مفيش شاشة. أو تحطه في سكربت بيشتغل لوحده (Task Scheduler) فيفضل مستني حد يدوس OK. أو تنسى [[-PassThru]] وتستغرب إن OK مش بيعمل حاجة. أو تبعت الاختيار لأمر خطير (Stop-Process أو Remove-Item) من غير [[-WhatIf]] الأول.`
          },
          lines: [
            "اعرض الخدمات في جدول تفاعلي تفلتر وترتب فيه.",
            "العمليات بعمود رام بالميجا: اختار منهم ودوس OK فيروحوا لـ Stop-Process (بـ [[-WhatIf]] للتجربة).",
            "أحدث ملفات Downloads: اختار ملف واحد ([[-OutputMode Single]]) ويتفتح.",
            "اعرض CSV في جدول، واستنى لحد ما النافذة تتقفل ([[-Wait]])."
          ],
          sol: R`(مشغّلتهوش وأنا بكتب الدرس لأنه بيفتح نافذة بتستنى إيدك؛ اللي تحت من تجربة نفس الأوامر من غير النافذة ومن توثيق Microsoft.) النافذة بتفتح بأعمدة Name و Id و RAM_MB، والكتابة في Filter بتفلتر وانت بتكتب في كل الأعمدة. وبعد OK، [[Stop-Process -WhatIf]] بيطبع سطر لكل اختيار ومش بيقفل حاجة. جربت إن الـ object اللي طالع من [[Select-Object]] بالأعمدة دي بيوصل لـ Stop-Process صح على عملية ping شغّلتها للتجربة: طلع [[What if: Performing the operation "Stop-Process" on target "PING (36240)".]]، ولما شلت [[-WhatIf]] العملية اتقفلت فعلًا.

لو دوست Cancel أو قفلت النافذة، مفيش حاجة بتعدّي للأمر اللي بعده. ولو نسيت [[-PassThru]]، OK مش هيرجع حاجة. وشيل [[-WhatIf]] بس لما تبقى متأكد من اختيارك.`
        },
        {
          cmd: "FileSystemWatcher",
          title: "راقب فولدر واعمل حاجة لما ملف يوصل",
          desc: R`[[System.IO.FileSystemWatcher]] class من .NET بيراقب فولدر ويقولك لما ملف يتعمل أو يتعدّل أو يتمسح أو يتغير اسمه. المثال بيراقب Downloads، وكل ما PDF جديد يوصل يطبع اسمه ويعمل صوت، لحد ما تدوس Ctrl+C.

[[::new($folder, "*.pdf")]] بيعمل watcher على الفولدر ده، والـ filter التاني بيحدد أنهي ملفات ([[*]] أي حروف). و [[[System.IO.WatcherChangeTypes]'Created, Renamed']] الأحداث اللي تهمنا: النص اللي فيه أسامي مفصولة بفاصلة بيتحوّل لقيمة واحدة فيها الاتنين. و Renamed مهمة هنا: المتصفح بينزّل الملف باسم مؤقت زي [[report.pdf.crdownload]] وفي الآخر بيغيّر اسمه، فلو راقبت Created بس مش هتشوفه.

[[while ($true)]] لوب مالوش نهاية. جواه [[WaitForChanged($events, 1000)]] بيستنى حدث لحد ثانية (1000 ملّي)، وبيرجع object فيه [[TimedOut]] (True لو الثانية عدّت من غير حاجة) و [[Name]] اسم الملف و [[ChangeType]] نوع الحدث. لو مفيش حاجة، [[continue]] ترجع لأول اللوب. والثانية دي مهمة: من غيرها الأمر بيستنى للأبد و Ctrl+C مش هيوقفه غير لما ملف يوصل. و [[[console]::Beep(1000, 150)]] صوت 1000 هرتز لمدة 150 ملّي ثانية.`,
          example: R`$folder = Join-Path $HOME "Downloads"
$watcher = [System.IO.FileSystemWatcher]::new($folder, "*.pdf")
$events = [System.IO.WatcherChangeTypes]'Created, Renamed'
Write-Host "Watching $folder for PDFs... Ctrl+C to stop"
while ($true) {
    $c = $watcher.WaitForChanged($events, 1000)
    if ($c.TimedOut) { continue }
    Write-Host "$(Get-Date -Format HH:mm:ss) $($c.ChangeType): $($c.Name)" -ForegroundColor Green
    [console]::Beep(1000, 150)
}`,
          try: R`شغّله، ومن نافذة تانية اعمل [[New-Item "$HOME\Downloads\test.pdf"]]، وبعدين نزّل أي PDF من المتصفح. وبعدين خليه ينقل كل PDF جديد لفولدر [[Documents\PDFs]].`,
          flag: "script",
          deep: {
            why: R`حاجات كتير بتستنى «لما ملف يوصل»: فاتورة نزلت تتنقل لفولدرها، صورة اتحفظت تتصغّر، CSV وصل من نظام تاني يتعالج، أو build يتعمل لما ملف يتغير. بدل ما تفحص الفولدر كل شوية، ويندوز نفسه بيبلّغ الـ watcher أول ما حاجة تحصل.`,
            how: R`فيه طريقتين. [[WaitForChanged]] (المثال) بسيطة: بتستنى حدث واحد وترجع. عيبها إن الأحداث اللي بتحصل وانت بتعالج الحدث اللي فات (بتنقل ملف مثلًا) بتضيع، لأنها مش بتسمع غير وهي مستنية. [[Register-ObjectEvent]] (الـ solCode) بيسجّل الأحداث في طابور: [[-SourceIdentifier]] اسم للتسجيل، و [[$watcher.EnableRaisingEvents = $true]] يبدأ الإرسال، و [[Wait-Event -Timeout 1]] ياخد أقدم حدث في الطابور، و [[Remove-Event]] يشيله منه، و [[$e.SourceEventArgs.Name]] اسم الملف، و [[Unregister-Event]] في الآخر يلغي التسجيل.

الأحداث: [[Created]] و [[Changed]] و [[Deleted]] و [[Renamed]]. و [[Changed]] بيتكرر: كتابة واحدة في ملف ممكن تطلّع أكتر من حدث (جربت كتابة 100 ألف حرف وطلعت حدثين)، فلو بتعالج Changed استنى شوية واتجاهل التكرار. و [[$watcher.IncludeSubdirectories = $true]] يراقب الفولدرات اللي جوه كمان.

الـ Created بيوصلك أول ما الملف يتعمل، مش لما يخلص كتابة. ملف كبير بيتنسخ هيفضل مقفول ثواني، و [[Move-Item]] هيفشل بـ «being used by another process». عشان كده [[Start-Sleep]] قبل النقل و [[try/catch]] حواليه.

الـ watcher عايش طول ما النافذة مفتوحة. عشان يشتغل دايمًا: سكربت + Register-ScheduledTask بـ [[-AtLogOn]] (درس Register-ScheduledTask).`,
            when: R`أتمتة فولدر Downloads أو فولدر «inbox» بيوصلّه ملفات من برنامج تاني، أو تشغيل أمر لما ملف config يتغير، أو تسجيل مين بيعدّل في فولدر مشترك.`,
            mistakes: R`تراقب [[Created]] بس وتستغرب إن تحميلات المتصفح مش بتظهر (هي Renamed). أو [[WaitForChanged]] من غير timeout فـ Ctrl+C ميوقفوش. أو تعالج الملف قبل ما البرنامج اللي بيكتبه يخلص. أو تعمل حاجة بطيئة جوه لوب [[WaitForChanged]] فملفات توصل وانت مشغول وتضيع. أو تنقل الملفات لفولدر جوه نفس الفولدر اللي بتراقبه مع [[IncludeSubdirectories]] فتعمل أحداث جديدة من نفسك.`
          },
          lines: [
            "الفولدر اللي هنراقبه.",
            "watcher على الفولدر ده، لملفات PDF بس.",
            "الأحداث اللي تهمنا: ملف اتعمل، أو اسمه اتغير (زي تحميلات المتصفح).",
            "رسالة إنه بدأ.",
            "لوب مالوش نهاية، بيقف بـ Ctrl+C.",
            "استنى حدث لحد ثانية بالكتير.",
            "لو الثانية عدّت من غير حاجة، ارجع لأول اللوب.",
            "اطبع الوقت ونوع الحدث واسم الملف بالأخضر.",
            "صوت قصير.",
            "قفلة اللوب."
          ],
          sol: R`جربت نفس الـ watcher على فولدر في TEMP مع thread job بيعمل ملفات: [[a.txt]] و [[b.txt]] اتطبعوا [[13:09:38 new file: a.txt (Created)]] و [[13:09:39 new file: b.txt (Created)]]، و [[ignored.log]] متطبعش عشان الـ filter كان [[*.txt]]. وقلّدت المتصفح: [[report.pdf.crdownload]] واتغير اسمه لـ [[report.pdf]]: مع [[Created, Renamed]] طلع [[Renamed: report.pdf (old: report.pdf.crdownload)]]، ومع [[Created]] بس فضل [[TimedOut]] ومشافهوش.

النقل: أول ما جربت [[Move-Item]] جوه نفس لوب [[WaitForChanged]] مع [[Start-Sleep -Seconds 1]]، ملف [[test.pdf]] اتعمل وأنا في الثانية دي فضاع، لأن [[WaitForChanged]] بيشوف الأحداث وهو مستني بس. الحل في الـ solCode: [[Register-ObjectEvent]] بيحط كل حدث في طابور، و [[Wait-Event -Timeout 1]] بياخدهم واحد واحد، فمفيش حاجة بتضيع وانت مشغول. جربته على فولدر في TEMP ونقل الملفين ([[Moved doc...pdf]] و [[Moved test.pdf]]) والفولدر فضي. و [[finally]] بيلغي التسجيل ويقفل الـ watcher حتى لو وقفته بـ Ctrl+C.`,
          solCode: R`$folder = Join-Path $HOME "Downloads"
$dest = Join-Path $HOME "Documents\PDFs"
New-Item -ItemType Directory -Force $dest | Out-Null
$watcher = [System.IO.FileSystemWatcher]::new($folder, "*.pdf")
Register-ObjectEvent $watcher Created -SourceIdentifier PdfNew | Out-Null
Register-ObjectEvent $watcher Renamed -SourceIdentifier PdfRenamed | Out-Null
$watcher.EnableRaisingEvents = $true
try {
    while ($true) {
        $e = Wait-Event -Timeout 1
        if (-not $e) { continue }
        $e | Remove-Event
        Start-Sleep -Seconds 1
        $name = $e.SourceEventArgs.Name
        try {
            Move-Item (Join-Path $folder $name) $dest -ErrorAction Stop
            Write-Host "Moved $name" -ForegroundColor Green
        } catch {
            Write-Warning "Could not move $name - $($_.Exception.Message)"
        }
    }
} finally {
    Unregister-Event PdfNew
    Unregister-Event PdfRenamed
    $watcher.Dispose()
}`
        },
        {
          cmd: "Write-Progress",
          title: "عداد تنازلي وبومودورو بشريط تقدم",
          desc: R`[[Write-Progress]] بيرسم شريط تقدم في الترمنال (زي اللي بيظهر وانت بتنزّل حاجة)، و [[Start-Sleep]] بيوقف السكربت مدة معينة. مع بعض بيعملوا عداد تنازلي: السكربت ده بومودورو (25 دقيقة شغل) بيوريك الوقت الفاضل ويعمل صوت في الآخر.

[[param( )]] بتعرّف الـ parameters (درس «param()»): [[[double]$Minutes = 25]] رقم ممكن يبقى فيه كسور (فـ [[-Minutes 0.1]] تبقى 6 ثواني للتجربة)، و [[$Label]] اسم الجلسة. و [[$end]] وقت النهاية: دلوقتي + عدد الثواني بـ [[.AddSeconds()]]. واللوب بيلف طول ما الساعة لسه موصلتش [[$end]]، وكل لفة بيحسب الفاضل: [[$end - (Get-Date)]] مدة، و [[.TotalSeconds]] بالثواني.

[[-Activity]] العنوان الكبير للشريط، و [[-Status]] السطر اللي تحته، و [[-PercentComplete]] النسبة من 0 لـ 100. و [[[timespan]::FromSeconds($left)]] بيحوّل الثواني لمدة، و [["{0:mm\:ss}" -f ...]] بيكتبها دقايق:ثواني، والـ [[\]] قبل النقطتين لازم لأن النقطتين في تنسيق المدة لازم يتعملهم escape. و [[-Completed]] بيشيل الشريط في الآخر. و [[[console]::Beep(880, 300)]] صوت تردده 880 هرتز لمدة 300 ملّي ثانية.

في PowerShell 7.2 وأحدث الشريط سطر واحد بسيط ([[$PSStyle.Progress.View]] بـ [[Minimal]])، وفي 5.1 أو مع [[Classic]] بيبقى مربع فوق النافذة.`,
          example: R`param(
    [double]$Minutes = 25,
    [string]$Label = "Focus"
)

$total = $Minutes * 60
$end = (Get-Date).AddSeconds($total)
while ((Get-Date) -lt $end) {
    $left = ($end - (Get-Date)).TotalSeconds
    $pct = 100 - [math]::Round($left / $total * 100)
    $status = "{0:mm\:ss} left" -f [timespan]::FromSeconds($left)
    Write-Progress -Activity $Label -Status $status -PercentComplete $pct
    Start-Sleep -Seconds 1
}
Write-Progress -Activity $Label -Completed
[console]::Beep(880, 300)
[console]::Beep(660, 300)
Write-Host "$Label done at $(Get-Date -Format HH:mm)" -ForegroundColor Green`,
          try: R`احفظه [[timer.ps1]] وشغّله بـ [[-Minutes 0.1 -Label Test]]، وبعدين اعمل سكربت جنبه بيشغّل 4 جلسات 25 دقيقة وبينهم راحة 5 دقايق.`,
          flag: "script",
          deep: {
            why: R`عداد في الترمنال اللي انت فاتحه أصلًا: بومودورو، أو «فكّرني بعد 40 دقيقة»، أو تستنى قبل ما تعيد محاولة. ونفس [[Write-Progress]] ده هو اللي بتحطه في أي سكربت طويل (نسخ ملفات كتير، معالجة صور) عشان اللي بيشغّله يعرف فاضل قد إيه بدل ما يفتكر إنه علّق.`,
            how: R`الحساب من وقت النهاية ([[$end]]) مش بعدّ الثواني: لو كتبت لوب بيعمل [[Start-Sleep 1]] 1500 مرة، كل لفة بتاخد ثانية + وقت الكود نفسه، فالـ 25 دقيقة تبقى أكتر. لما تحسب من الساعة كل مرة، الغلط مش بيتجمّع.

في سكربت حقيقي بتعدّ عناصر: [[Write-Progress -Activity "Copying" -Status "$i of $($files.Count)" -PercentComplete ($i / $files.Count * 100)]]. و [[-Id]] و [[-ParentId]] بيعملوا شريط جوه شريط (فولدرات وجواها ملفات). و [[-SecondsRemaining]] بيعرض الوقت الفاضل جاهز.

[[$ProgressPreference = 'SilentlyContinue']] بيخفي كل الشرايط (بتاعة السكربت وبتاعة أوامر زي Invoke-WebRequest). والشريط مش بيبان لو الناتج رايح لملف أو السكربت شغال من Task Scheduler، فمش بيضر.

[[[console]::Beep(freq, ms)]] بيطلع الصوت من كارت الصوت في ويندوز 10 و 11، والتردد لازم بين 37 و 32767 وإلا بيطلع [[The frequency must be between 37 and 32767.]] (جربتها بـ 20). والسكربت بيقف لحد ما الصوت يخلص.`,
            when: R`بومودورو وتنبيهات بسيطة، وأي سكربت بيلف على أكتر من كام عنصر وبياخد أكتر من كام ثانية.`,
            mistakes: R`تحسب الوقت بعدّ لفات [[Start-Sleep]] فيتأخر. أو تنسى [[-Completed]] فالشريط يفضل معلّق. أو [[-PercentComplete]] يعدّي 100 فيطلع [[The 150 argument is greater than the maximum allowed range of 100.]] (جربتها). أو تحدّث الشريط آلاف المرات في لوب سريع فالسكربت يبطأ جدًا؛ حدّثه كل 100 عنصر مثلًا. أو تكتب [[{0:mm:ss}]] من غير [[\]] فيطلع [[Error formatting a string: Input string was not in a correct format.]]`
          },
          lines: [
            "بداية الـ parameters.",
            "عدد الدقايق، والافتراضي 25، وممكن كسور.",
            "اسم الجلسة اللي هيظهر على الشريط.",
            "قفلة.",
            "المدة بالثواني.",
            "وقت النهاية = دلوقتي + المدة.",
            "طول ما الساعة لسه موصلتش للنهاية...",
            "...الثواني الفاضلة (النهاية ناقص دلوقتي)...",
            "...النسبة اللي خلصت من 100...",
            "...الفاضل بالشكل دقايق:ثواني...",
            "...ارسم الشريط بالعنوان والوقت والنسبة...",
            "...واستنى ثانية.",
            "قفلة اللوب.",
            "شيل الشريط.",
            "صوت 880 هرتز لمدة 300 ملّي ثانية...",
            "...وبعده صوت أوطى.",
            "اطبع إن الجلسة خلصت والساعة كام."
          ],
          sol: R`[[.\timer.ps1 -Minutes 0.05 -Label Test]] اشتغل حوالي 4 ثواني (3 ثواني العداد + الصوتين)، وفي الآخر سطر أخضر [[Test done at 13:17]]. وجربت التنسيق لوحده: 1499.6 ثانية طلعت [[24:59 left]]، و 59.2 طلعت [[00:59 left]] (الكسور بتتشال مش بتتقرّب).

الـ 4 جلسات في الـ solCode: احفظه [[pomodoro.ps1]] جنب [[timer.ps1]]. [[1..4]] الأرقام من 1 لـ 4، و [[&]] بيشغّل ملف السكربت (درس «& (call operator)»)، و [[$PSScriptRoot]] فولدر السكربت (درس $PSScriptRoot)، والراحة بتتعمل بعد كل جلسة ماعدا الأخيرة. جربته بمدد صغيرة وطلع [[Focus 1/4 done]] ثم [[Break done]] ... لحد [[Focus 4/4 done]]. ولو المدة ساعة أو أكتر غيّر التنسيق لـ [["{0:hh\:mm\:ss}"]] وإلا الساعات مش هتبان: 3725 ثانية طلعت بيه [[01:02:05]].`,
          solCode: R`foreach ($round in 1..4) {
    & "$PSScriptRoot\timer.ps1" -Minutes 25 -Label "Focus $round/4"
    if ($round -lt 4) { & "$PSScriptRoot\timer.ps1" -Minutes 5 -Label "Break" }
}`
        },
        {
          cmd: "SAPI.SpVoice",
          title: "خلّي الجهاز يتكلم ويعمل صوت",
          desc: R`ويندوز فيه محرك نطق (text-to-speech)، و [[New-Object -ComObject SAPI.SpVoice]] بيوصلك له: [[.Speak("...")]] بيقرا النص بصوت. ومعاه [[[console]::Beep(تردد, مدة)]] صوت تنبيه. الفكرة العملية: تشغّل build أو تست طويل وتروح تعمل حاجة، والجهاز يقولك «Build passed» أو يعمل صوت فشل.

[[-ComObject]] بيعمل object من COM (طريقة قديمة في ويندوز البرامج بتعرض بيها خدماتها، و SAPI يعني Speech API). و [[.Speak()]] بترجع رقم ([[1]]) فبنرميه بـ [[| Out-Null]] عشان ميتطبعش. و [[.GetVoices()]] الأصوات المتسطبة، و [[.GetDescription()]] اسم كل صوت. و [[.Rate]] السرعة من -10 لـ 10 (الافتراضي 0)، و [[.Volume]] من 0 لـ 100.

آخر سطر: [[npm run build]] وبعدين [[;]] (أمر تاني على نفس السطر)، و [[$LASTEXITCODE]] الـ exit code بتاع npm (درس $LASTEXITCODE): صفر يعني نجح فيقول «Build passed»، وغير كده صوت واطي طويل و «Build failed».

العربي: SAPI.SpVoice بيشوف الأصوات القديمة بس (على ويندوز إنجليزي: David و Zira). لو ضفت صوت عربي من Settings ثم Time & language ثم Speech ثم Add voices، هتلاقي صوت زي «Microsoft Hoda» (عربي مصري)، و PowerShell 7 بيقدر يستخدمه عن طريق [[System.Speech]] (الـ solCode). جربتها على PowerShell 7.6 واتكلم عربي، أما 5.1 فمشافش غير David و Zira.`,
          example: R`$voice = New-Object -ComObject SAPI.SpVoice
$voice.Speak("Build finished") | Out-Null
foreach ($v in $voice.GetVoices()) { $v.GetDescription() }
$voice.Rate = 2
[console]::Beep(880, 300)
npm run build; if ($LASTEXITCODE -eq 0) { $voice.Speak("Build passed") | Out-Null } else { [console]::Beep(300, 800); $voice.Speak("Build failed") | Out-Null }`,
          try: R`اعرض الأصوات اللي عندك، وخلّي الجهاز يقول جملة عربي لو عندك صوت عربي.`,
          deep: {
            why: R`build أو تست أو تحميل بياخد 10 دقايق، فبتروح تعمل حاجة وترجع كل شوية تبص، أو تنساه خالص. صوت أو جملة مسموعة بتقولك النتيجة وانت بعيد عن الشاشة. ونفس الفكرة في آخر أي سكربت طويل: «Backup done».`,
            how: R`[[SAPI.SpVoice]] بيستخدم أصوات «SAPI 5» القديمة المسجلة في ويندوز (اللي في اسمها Desktop). ويندوز 10 و 11 فيهم أصوات أحدث (OneCore)، وأي لغة بتضيف صوتها من Settings بتيجي من النوع ده. [[System.Speech.Synthesis.SpeechSynthesizer]] في PowerShell 7 شاف النوعين لما جربت، و [[GetInstalledVoices().VoiceInfo]] بيرجع الاسم واللغة ([[Culture]]) والنوع.

[[.Speak()]] بيستنى لحد ما الكلام يخلص قبل ما السكربت يكمّل. ولو عايز السكربت يكمّل والكلام شغال: في System.Speech [[$tts.SpeakAsync("text")]]، بس لو السكربت خلص قبل الكلام، الكلام بيتقطع.

[[[console]::Beep]] من .NET، والتردد بين 37 و 32767 هرتز. وأصوات ويندوز الجاهزة: [[[System.Media.SystemSounds]::Asterisk.Play()]] (وفيه [[Exclamation]] و [[Hand]] و [[Question]] و [[Beep]]) بتشغّل صوت التنبيه اللي في إعدادات الصوت.

تقدر تعمل فانكشن في الـ [[$PROFILE]]: [[function done { if ($?) { [console]::Beep(880, 200) } else { [console]::Beep(300, 600) } }]] وتكتب [[npm test; done]]. [[$?]] جوه الفانكشن لسه شايلة نتيجة الأمر اللي قبلها (جربتها: بعد [[cmd /c exit 1]] طلعت fail وبعد [[cmd /c exit 0]] طلعت ok).`,
            when: R`أي حاجة بتاخد أكتر من دقيقة وانت مش هتتفرج عليها: build، tests، تحميل، باك أب.`,
            mistakes: R`تنسى [[| Out-Null]] فيتطبع [[1]] في نص الناتج. أو تكتب اسم الصوت ناقص في [[SelectVoice]]. أو تحط الكلام في سكربت بيشتغل من Task Scheduler والجهاز مقفول، فمحدش هيسمع. أو تستغرب إن الكلام العربي طالع بنطق غريب أو مش طالع: الصوت المختار إنجليزي، ولازم صوت لغته [[ar-EG]] أو [[ar-SA]].`
          },
          lines: [
            "اعمل object للنطق من COM.",
            "قول الجملة، وارمي الرقم اللي بيرجع.",
            "اطبع اسم كل صوت متسطب.",
            "سرّع الكلام شوية (من -10 لـ 10).",
            "صوت 880 هرتز لمدة 300 ملّي ثانية.",
            "شغّل الـ build: لو نجح قول كده، ولو فشل صوت واطي طويل وقول إنه فشل."
          ],
          sol: R`[[foreach ($v in $voice.GetVoices()) { $v.GetDescription() }]] على جهازي طلع: [[Microsoft David Desktop - English (United States)]] و [[Microsoft Zira Desktop - English (United States)]]. وفي PowerShell 7.6، [[System.Speech]] (الـ solCode) شاف أكتر: [[Microsoft David Desktop  en-US]] و [[Microsoft Zira Desktop  en-US]] و [[Microsoft David  en-US]] و [[Microsoft Hoda  ar-EG]] و [[Microsoft Mark  en-US]] و [[Microsoft Zira  en-US]]، و [[SelectVoice("Microsoft Hoda")]] اشتغل وقال «البيلد خلص». وفي Windows PowerShell 5.1 نفس الكود شاف David و Zira Desktop بس.

لو [[SelectVoice]] طلع [[Cannot set voice. No matching voice is installed or the voice was disabled.]] يبقى الاسم غلط أو الصوت مش متسطب: انسخ الاسم بالظبط من عمود Name. و [[.Speak()]] بتاعة SAPI لو مرميتش ناتجها هتلاقي [[1]] متطبع بعد الكلام. (جربت الكلام بـ Volume على 0 عشان مزعجش حد، و Beep بصوت عادي.)`,
          solCode: R`Add-Type -AssemblyName System.Speech
$tts = New-Object System.Speech.Synthesis.SpeechSynthesizer
$tts.GetInstalledVoices().VoiceInfo | Select-Object Name, Culture, Gender
$tts.SelectVoice("Microsoft Hoda")
$tts.Speak("البيلد خلص")`
        },
        {
          cmd: "MessageBox / BurntToast",
          title: "رسالة تأكيد أو إشعار ويندوز",
          desc: R`سكربت شغال ومحتاج يسألك «أكمّل؟» أو يقولك «خلصت» حتى لو الترمنال مش قدامك: [[[System.Windows.MessageBox]::Show()]] بيطلع نافذة رسالة بأزرار ويرجّع الزرار اللي دوسته، و [[New-BurntToastNotification]] من موديول BurntToast بيطلع إشعار ويندوز (toast) في ركن الشاشة زي إشعارات البرامج.

[[Add-Type -AssemblyName PresentationFramework]] بيحمّل مكتبة WPF من .NET اللي فيها MessageBox (لازم في 5.1، و PowerShell 7 بيلاقيها لوحده بس السطر مش بيضر). و [[Show]] بتاخد: النص، والعنوان، والأزرار ([[OK]] و [[OKCancel]] و [[YesNo]] و [[YesNoCancel]])، والأيقونة ([[Information]] و [[Question]] و [[Warning]] و [[Error]]). وبترجع اختيارك ([[Yes]] أو [[No]] أو [[OK]] أو [[Cancel]])، فتقارنه بـ [[-eq "Yes"]]. والسكربت بيقف لحد ما تدوس زرار.

[[Install-Module BurntToast -Scope CurrentUser]] بيسطّب الموديول ليك (مرة واحدة)، و [[-Text]] بياخد لحد 3 نصوص: أولهم العنوان والباقي تحته. الإشعار مش بيوقف السكربت، ولو مشفتوش بيفضل في Notification Center.

الاتنين ويندوز بس وشغالين في 5.1 و 7. و BurntToast محتاج ويندوز 10 أو أحدث، وآخر نسخة 1.1.0 (أغسطس 2025)، والـ repo بتاعه على GitHub اتعمله archive في سبتمبر 2026، يعني شغال بس مفيش تحديثات جاية.`,
          example: R`Add-Type -AssemblyName PresentationFramework
$answer = [System.Windows.MessageBox]::Show("Delete logs older than 30 days?", "Cleanup", "YesNo", "Question")
if ($answer -eq "Yes") { Get-ChildItem .\logs -Filter *.log | Where-Object LastWriteTime -lt (Get-Date).AddDays(-30) | Remove-Item -WhatIf }
[System.Windows.MessageBox]::Show("Backup finished", "Backup", "OK", "Information") | Out-Null
Install-Module BurntToast -Scope CurrentUser
New-BurntToastNotification -Text "Build finished", "All tests passed"`,
          try: R`اعمل سؤال YesNo: لو دوست Yes اطبع [[OK]] بالأخضر، ولو No اطبع [[Cancelled]] بالأصفر. وبعدين ابعت إشعار بعد [[Start-Sleep 5]] وانت في برنامج تاني.`,
          deep: {
            why: R`السكربت ساعات بيشتغل والترمنال متصغّر أو ورا برامج تانية، فمحدش بيشوف سؤال [[Read-Host]] ولا رسالة «خلصت». النافذة بتطلع قدام كل حاجة، والإشعار بيوصلك وانت في المتصفح. ومفيد كمان لسكربت بتعمله لحد مش بيستخدم الترمنال (يدبل كليك على shortcut فيطلعله سؤال بسيط).`,
            how: R`[[MessageBox]] نافذة «modal»: الكود اللي بعدها مش بيتنفّذ لحد ما تتقفل، وده المطلوب في سؤال تأكيد. والبديل من WinForms: [[Add-Type -AssemblyName System.Windows.Forms]] وبعدين [[[System.Windows.Forms.MessageBox]::Show(...)]] بنفس الفكرة. و PowerShell بيحوّل النص [["YesNo"]] للنوع المطلوب لوحده، فمش محتاج تكتب [[[System.Windows.MessageBoxButton]::YesNo]].

مع [[YesNo]] مفيش زرار X شغال، لازم تختار؛ مع [[YesNoCancel]] الـ X بترجع [[Cancel]].

BurntToast بيستخدم نظام الإشعارات بتاع ويندوز، فالإشعار بيتبع إعداداتك (Do not disturb و Notification Center). وفيه [[New-BTButton]] زرار في الإشعار يفتح لينك، و [[-AppLogo]] صورة، و [[-Silent]] من غير صوت، و [[-Urgent]] بيعدّي الـ Focus Assist. وفي PowerShell 7.4 وأحدث تقدر تسطّبه كمان بـ [[Install-PSResource BurntToast]].

الاتنين محتاجين يوزر داخل على الجهاز وشايف الشاشة: لو السكربت شغال من Task Scheduler بـ «Run whether user is logged on or not» أو كـ SYSTEM، النافذة مش هتظهر لحد، و MessageBox هيفضل مستني للأبد.`,
            when: R`سؤال تأكيد قبل حاجة مهمة في سكربت بتشغّله بدبل كليك، وإشعار في آخر أي سكربت طويل (باك أب، build، تحميل). وللسكربتات اللي بتشتغل لوحدها من غير حد قدام الجهاز، استخدم لوج أو إيميل بدلهم.`,
            mistakes: R`تحط MessageBox في سكربت مجدول فيعلّق ومحدش يشوفه. أو تنسى [[Add-Type]] في 5.1 فيطلع [[Unable to find type [System.Windows.MessageBox].]] (جربتها). أو تنسى [[| Out-Null]] مع رسالة OK فيتطبع [[OK]] في الناتج. أو تكتب [[Install-Module]] جوه السكربت نفسه فكل تشغيلة تحاول تسطّب. أو تبعت حاجة خطيرة بعد Yes من غير ما تجرّبها بـ [[-WhatIf]] الأول.`
          },
          lines: [
            "حمّل مكتبة WPF اللي فيها MessageBox (لازمة في 5.1).",
            "اسأل سؤال بزرارين Yes و No وأيقونة استفهام، والسكربت يستنى الإجابة.",
            "لو Yes امسح اللوجات الأقدم من 30 يوم (بـ [[-WhatIf]] للتجربة).",
            "رسالة بزرار OK بس، و [[Out-Null]] يرمي النتيجة.",
            "سطّب موديول BurntToast ليك (مرة واحدة).",
            "إشعار ويندوز بعنوان وسطر تحته."
          ],
          sol: R`(مشغّلتش النوافذ دي وأنا بكتب الدرس لأنها بتستنى حد يدوس عليها، ومسطّبتش BurntToast؛ جربت الأجزاء اللي مش بتفتح نوافذ، والباقي من صفحة الموديول.) [[Add-Type -AssemblyName PresentationFramework]] اشتغل في PowerShell 7.6 و 5.1، والأزرار المتاحة فعلًا [[OK, OKCancel, AbortRetryIgnore, YesNoCancel, YesNo, RetryCancel, CancelTryContinue]]، والنتايج الممكنة [[None, OK, Cancel, Abort, Retry, Ignore, Yes, No, TryAgain, Continue]]. والمقارنة [[[System.Windows.MessageBoxResult]::Yes -eq "Yes"]] رجعت [[True]]، فـ [[$answer -eq "Yes"]] شغالة.

لما تشغّل الحل: النافذة بتظهر بعلامة استفهام وزرارين Yes و No، والسكربت واقف لحد ما تدوس، وبعدها يطبع السطر المناسب باللون. والإشعار بيظهر في ركن الشاشة بعنوان «Done» وتحته السطر التاني، ولو Do not disturb شغال مش هيظهر قدامك بس هيتحفظ في Notification Center.`,
          solCode: R`Add-Type -AssemblyName PresentationFramework
$answer = [System.Windows.MessageBox]::Show("Continue?", "Question", "YesNo", "Question")
if ($answer -eq "Yes") { Write-Host "OK" -ForegroundColor Green } else { Write-Host "Cancelled" -ForegroundColor Yellow }
Start-Sleep 5; New-BurntToastNotification -Text "Done", "Your script finished"`
        },
        {
          cmd: "shutdown /s /t",
          title: "اقفل الجهاز أو اعمله restart في ساعة معينة",
          desc: R`[[shutdown]] برنامج في ويندوز بيقفل الجهاز أو يعمله restart بعد عدد ثواني تحدده، و [[shutdown /a]] بيلغي ده طول ما الوقت لسه معدّاش. المثال بيحسب الثواني لحد ساعة معينة (11:30 بالليل)، عشان تسيب تحميل أو build شغال وتنام والجهاز يقفل لوحده.

[[Get-Date "23:30"]] بيعمل تاريخ النهارده الساعة 11:30 بالليل. ولو الساعة دي عدّت النهارده (بتشغّله 11:45 مثلًا)، [[.AddDays(1)]] بيخليها بكرة، وإلا الحساب هيطلع بالسالب. و [[New-TimeSpan -End $target]] المدة من دلوقتي لحد الوقت ده، و [[.TotalSeconds]] بالثواني، و [[[int]]] بيحوّلها لرقم صحيح.

[[/s]] اقفل (shutdown)، و [[/r]] restart، و [[/t]] بعد كام ثانية (من 0 لـ 10 سنين، والافتراضي 30)، و [[/c "..."]] رسالة بتظهر في التنبيه (لحد 512 حرف). و [[/f]] يقفل البرامج غصب من غير ما يسألها تحفظ، وخلي بالك: لو [[/t]] أكبر من صفر، [[/f]] بتتحط لوحدها، يعني أي شغل مش محفوظ وقت المعاد هيضيع.

ومن PowerShell نفسه: [[Stop-Computer]] بيقفل و [[Restart-Computer]] بيعمل restart، على طول من غير مهلة (و [[-Force]] يجبره حتى لو فيه برامج مانعة). مفيهمش معاد، فللمعاد استخدم [[shutdown /t]].`,
          example: R`$target = Get-Date "23:30"
if ($target -lt (Get-Date)) { $target = $target.AddDays(1) }
$seconds = [int](New-TimeSpan -End $target).TotalSeconds
shutdown /s /t $seconds /c "The PC will shut down at 23:30. Save your work."
shutdown /a
shutdown /r /t 600 /c "Restarting in 10 minutes for updates"
shutdown /a`,
          try: R`اعمل shutdown بعد ساعة بـ [[/t 3600]]، وشوف التنبيه اللي بيظهر، وبعدين الغيه بـ [[shutdown /a]] (واتأكد إنك لغيته!).`,
          flag: "danger",
          deep: {
            why: R`تحميل كبير أو build أو render هيخلص بعد ساعتين وانت عايز تنام، أو عايز الجهاز يعمل restart بالليل بعد التحديثات مش وانت شغال، أو بتحدد لنفسك «الجهاز يقفل الساعة 12». وقايمة Start مفيهاش «اقفل الساعة كذا».`,
            how: R`[[shutdown /t]] بيسجّل المعاد في ويندوز نفسه، فمش محتاج الترمنال يفضل مفتوح. وفيه معاد واحد بس في نفس الوقت: لو فيه واحد متجدول، أي [[shutdown /s /t]] تاني بيرفض بـ error رقم 1190 («A system shutdown has already been scheduled.»)، فالغي بـ [[/a]] الأول.

ولو عايز «بعد ساعة ونص» مش ساعة معينة: [[shutdown /s /t (90 * 60)]]، والأقواس بتحسب الرقم قبل ما يتبعت. ولو عايز «لما البرنامج يخلص»: [[Wait-Process -Name ...]] بيستنى البرنامج يقفل، وبعده [[Stop-Computer]].

[[/h]] hibernate (الدرس الجاي)، و [[/l]] تسجيل خروج، و [[/sg]] و [[/g]] زي [[/s]] و [[/r]] بس بيفتحوا البرامج المسجلة تاني بعد الدخول. و [[/r /o]] restart على قايمة Advanced startup (للـ Safe Mode). و [[shutdown /?]] بيعرض كل ده.

[[Stop-Computer]] و [[Restart-Computer]] بيدعموا [[-WhatIf]] (يقولك هيعمل إيه من غير ما يعمله) و [[-ComputerName]] لأجهزة تانية على الشبكة لو عندك صلاحية.`,
            when: R`لما تسيب الجهاز يكمّل شغل وتمشي، أو تجدول restart بعد تحديثات في وقت مش بتشتغل فيه، أو في آخر سكربت بيخلص شغلانة طويلة.`,
            mistakes: R`تجدول shutdown وتنسى، فالجهاز يقفل وانت في نص شغل والبرامج تتقفل غصب ([[/f]] بتتحط لوحدها مع [[/t]]). أو تكتب [[/t]] بالدقايق بدل الثواني. أو تحسب ساعة عدّت النهارده فيطلع رقم سالب. أو تفتكر [[shutdown /a]] بيلغي [[Stop-Computer]]: Stop-Computer بيقفل على طول ومفيش مهلة تلغي فيها.`
          },
          lines: [
            "الساعة 11:30 بالليل النهارده.",
            "لو الساعة دي عدّت، خليها بكرة.",
            "عدد الثواني من دلوقتي لحد الوقت ده، كرقم صحيح.",
            "اقفل الجهاز بعد الثواني دي، برسالة تظهر في التنبيه.",
            "الغي المعاد (طول ما الوقت لسه معدّاش).",
            "restart بعد 10 دقايق (600 ثانية) برسالة.",
            "الغيه برضه."
          ],
          sol: R`(مشغّلتش shutdown ولا restart فعلًا وأنا بكتب الدرس؛ جربت الحساب و [[shutdown /a]] و [[shutdown /?]].) الحساب: شغّلته الساعة 13:13، فـ [["23:30"]] فضلت النهارده بـ [[36988]] ثانية (10 ساعات و 16 دقيقة)، و [["08:00"]] اتنقلت لبكرة بـ [[67588]] ثانية.

[[shutdown /s /t 3600]] مش بيطبع حاجة في الترمنال، وويندوز بيعرض تنبيه إن الجهاز هيتقفل ومعاه رسالة [[/c]] لو كتبتها. و [[shutdown /a]] بيلغيه. ولو شغّلت [[shutdown /a]] ومفيش حاجة متجدولة بيطلع [[Unable to abort the system shutdown because no shutdown was in progress.(1116)]] والـ exit code [[1116]]، وده اللي حصل عندي. فلو عايز تتأكد إنك لغيته، شغّل [[shutdown /a]] تاني: لو طلعت الرسالة دي يبقى مفيش حاجة متجدولة.`
        },
        {
          cmd: "LockWorkStation",
          title: "اقفل الشاشة أو نيّم الجهاز",
          desc: R`[[rundll32.exe user32.dll,LockWorkStation]] بيقفل الشاشة زي Win+L بالظبط: البرامج شغالة وكل حاجة زي ما هي، بس لازم الباسورد أو الـ PIN عشان ترجع. و [[rundll32.exe]] برنامج في ويندوز بيشغّل function من جوه ملف DLL، و [[user32.dll,LockWorkStation]] اسم الملف والـ function وبينهم فاصلة من غير مسافة.

[[shutdown /h]] بيعمل hibernate: بيحفظ كل اللي في الرام على الديسك ويطفي الجهاز خالص، ولما تفتحه ترجع لنفس المكان. لازم الـ hibernate يكون متفعّل ([[powercfg /hibernate on]] من PowerShell أدمن).

[[powercfg /a]] بيقولك جهازك بيدعم أنهي أنواع نوم. والنوم (sleep) أصعب واحد من الترمنال: الأمر المشهور [[rundll32.exe powrprof.dll,SetSuspendState 0,1,0]] بيعمل hibernate مش sleep لو الـ hibernate متفعّل، لأن rundll32 مش بيبعت الأرقام دي للـ function صح. ولو جهازك لابتوب حديث و [[powercfg /a]] بيقول [[Standby (S0 Low Power Idle)]] (اسمها Modern Standby)، الأمر ده مش هيديك sleep خالص. في الحالة دي الأضمن تقفل الشاشة وتسيب الجهاز ينام لوحده حسب إعدادات الـ Power، أو زرار الـ power.

في المثال: [[powercfg /a]] الأول تعرف جهازك، وبعدين القفل، وبعدين [[Start-Sleep -Seconds 300]] يستنى 5 دقايق ويقفل (و [[;]] بتشغّل أمرين ورا بعض على نفس السطر). وأمرين الـ hibernate والـ sleep متعلّق عليهم بـ [[#]] عشان لو نسخت المثال كله ميطفّيش الجهاز؛ شيل الـ [[#]] من قدام اللي عايزه بس.`,
          example: R`powercfg /a
rundll32.exe user32.dll,LockWorkStation
Start-Sleep -Seconds 300; rundll32.exe user32.dll,LockWorkStation
# السطرين دول بيطفّوا الجهاز، شيل الـ # من قدام واحد بس لما تكون عايزه فعلًا:
# shutdown /h
# rundll32.exe powrprof.dll,SetSuspendState 0,1,0`,
          try: R`شغّل [[powercfg /a]] واعرف جهازك بيدعم إيه، وبعدين جرّب القفل بعد 10 ثواني: [[Start-Sleep 10; rundll32.exe user32.dll,LockWorkStation]].`,
          flag: "danger",
          deep: {
            why: R`القفل قبل ما تقوم من على الجهاز عادة أمان أساسية في أي مكتب، والأمر ده بيخليك تقفل من سكربت أو بعد وقت أو من shortcut. والـ hibernate مفيد لو هتشيل اللابتوب ساعات ومش عايز البطارية تخلص في الـ sleep، وترجع لنفس الشغل.`,
            how: R`القفل مش بيوقف أي حاجة: التحميلات والـ builds والسيرفرات المحلية بتكمّل. الـ sleep بيوقف الشغل والجهاز بيفضل بأقل طاقة والرام شغالة، والـ hibernate بيكتب الرام في ملف [[hiberfil.sys]] على الديسك ويطفي خالص.

Modern Standby (S0) معناه إن الجهاز وهو «نايم» بيفضل صاحي جزئيًا زي الموبايل، وده اللي في أغلب اللابتوبات الجديدة بدل S3 القديم. والـ API القديم [[SetSuspendState]] معمول لـ S3، فمش بيعرف ينوّم جهاز S0.

ليه rundll32 مع SetSuspendState بيعمل hibernate؟ rundll32 بيبعت للـ function parameters بشكل معمول لنوع تاني من الـ functions، فالأرقام [[0,1,0]] مش بتوصل زي ما انت فاكر، والـ function بتفهم أول قيمة على إنها «hibernate = نعم». عشان كده لو الـ hibernate متفعّل بيعمل hibernate.

[[powercfg]] فيه حاجات تانية مفيدة: [[powercfg /batteryreport]] (درس Get-CimInstance)، و [[powercfg /requests]] (مين مانع الجهاز ينام، محتاج أدمن)، و [[powercfg /change standby-timeout-ac 30]] (ينام بعد 30 دقيقة على الشاحن).`,
            when: R`القفل: كل ما تقوم، أو في آخر سكربت بتسيبه شغال. الـ hibernate: قبل ما تشيل اللابتوب مدة طويلة. والـ sleep من الترمنال: نادرًا، والأسهل من Start أو زرار الـ power.`,
            mistakes: R`تستخدم [[SetSuspendState]] وتستغرب إن الجهاز عمل hibernate أو معملش حاجة. أو تعمل [[shutdown /h]] والـ hibernate مقفول. أو تفتكر القفل بيوفّر بطارية زي الـ sleep: البرامج لسه شغالة. أو تقفل جلسة Remote Desktop على جهاز تاني وانت محتاجها.`
          },
          lines: [
            "أنواع النوم اللي جهازك بيدعمها.",
            "اقفل الشاشة زي Win+L.",
            "استنى 5 دقايق وبعدين اقفل الشاشة ([[;]] أمرين ورا بعض على نفس السطر)."
          ],
          sol: R`(مقفلتش الجهاز ولا نيّمته وأنا بكتب الدرس؛ شغّلت [[powercfg /a]] بس.) على لابتوب حديث طلع [[The following sleep states are available on this system:]] وتحته [[Standby (S0 Low Power Idle) Network Connected]] و [[Hibernate]] و [[Fast Startup]]، وتحت «not available» لقيت [[Standby (S3)]] وجنبه [[This standby state is disabled when S0 low power idle is supported.]]. يعني الجهاز ده Modern Standby، فـ SetSuspendState مش هيديك sleep.

القفل بعد 10 ثواني: الترمنال هيستنى، وبعدين الشاشة تقفل على شاشة الدخول، ولما تدخل تلاقي كل حاجة زي ما هي والأمر خلص من غير ما يطبع حاجة. ولو [[shutdown /h]] مشتغلش، اتأكد إن [[Hibernate]] موجود في [[powercfg /a]]، ولو مش موجود فعّله من PowerShell أدمن بـ [[powercfg /hibernate on]].`
        }
      ]
    },
    {
      t: "اليوزرز والصلاحيات في ويندوز",
      l: 3,
      n: R`مين بيستخدم الجهاز وبأنهي صلاحيات: تعمل يوزر لحد من العيلة أو للتجارب، وتخلي حد أدمن أو تشيله، وتعرف السكربت شغال أدمن ولا لأ، وتتحكم مين يفتح فولدر. العرض من غير أدمن، والتعديل محتاج Terminal أدمن`,
      items: [
        {
          cmd: "Get-LocalUser / New-LocalUser",
          title: "اعرض اليوزرز واعمل يوزر جديد",
          desc: R`[[Get-LocalUser]] بيعرض حسابات اليوزرز اللي على الجهاز، و [[New-LocalUser]] بيعمل حساب local جديد (موجود على الجهاز ده بس): لحد من العيلة، أو حساب منفصل تجرب عليه برامج، أو يوزر عادي من غير صلاحيات أدمن تستخدمه كل يوم.

أعمدة Get-LocalUser: [[Name]] اسم الدخول، و [[Enabled]] الحساب شغال ولا متقفل، و [[LastLogon]] آخر دخول، و [[PrincipalSource]] نوع الحساب: [[Local]] حساب على الجهاز ده بس، و [[MicrosoftAccount]] حساب داخل بإيميل Microsoft. وهتلاقي حسابات ويندوز نفسه متقفلة زي [[Administrator]] و [[Guest]] و [[DefaultAccount]]، سيبها متقفلة.

[[Read-Host -AsSecureString]] بيسألك على الباسورد، وانت بتكتبه بيظهر نجوم، وبيرجّعه [[SecureString]] (نص متشفّر في الرام) مش نص عادي، وده النوع اللي [[-Password]] عايزه، فالباسورد مبيتكتبش في المثال ولا في الـ History. و [[@{ ... }]] مع [[@params]] هو splatting (درس «splatting»): الـ parameters في hashtable بدل سطر طويل. [[Name]] اسم الدخول (لحد 20 حرف، ومن غير رموز زي [[\ / : * ? @]])، و [[FullName]] الاسم اللي بيظهر في شاشة الدخول، و [[Description]] وصف (لحد 48 حرف)، و [[PasswordNeverExpires]] الباسورد ميخلصش. و [[-NoPassword]] حساب من غير باسورد خالص، ودي تنفع لحساب ألعاب أطفال على جهاز في البيت بس.

[[New-LocalUser]] مش بيحط الحساب في أي جروب (على عكس Settings و [[net user /add]])، فـ [[Add-LocalGroupMember -SID S-1-5-32-545]] بيضيفه لجروب Users عشان يبقى يوزر عادي ويعرف يدخل (الجروبات والـ SID في درس Add-LocalGroupMember).

الإنشاء محتاج Terminal أدمن: Win+X وبعدين Terminal (Admin)، أو [[Start-Process pwsh -Verb RunAs]] (درس Start-Process). الموديول [[Microsoft.PowerShell.LocalAccounts]] جاي مع ويندوز وشغال في 5.1 و 7 (جربته على 7.6)، بس مش في PowerShell 32 بت على ويندوز 64 بت. وفي ويندوز Home أداة [[lusrmgr.msc]] (Local Users and Groups) مش شغالة، فالأوامر دي أو Settings ← Accounts ← Other users هم الطريقة. والمقابل من CMD في درس «net user» في تاب «CMD».`,
          example: R`Get-LocalUser
Get-LocalUser | Select-Object Name, Enabled, LastLogon, PrincipalSource
$password = Read-Host "Password for sara" -AsSecureString
$params = @{ Name = "sara"; FullName = "Sara"; Password = $password; Description = "Family account"; PasswordNeverExpires = $true }
New-LocalUser @params
Add-LocalGroupMember -SID S-1-5-32-545 -Member "sara"
New-LocalUser -Name "kids" -NoPassword -Description "Kids games"
Get-LocalUser "sara" | Select-Object Name, Enabled, PasswordExpires`,
          try: R`اعرض كل الحسابات اللي على جهازك ونوع كل واحد، واعرف الحساب اللي انت شغال بيه Local ولا Microsoft. ولو عايز تجرب الإنشاء من غير ما تعمل حساب فعلًا، زوّد [[-WhatIf]].`,
          flag: "danger",
          deep: {
            why: R`حد من العيلة محتاج يستخدم الجهاز من غير ما يشوف ملفاتك ولا يسطّب حاجات، أو عايز حساب نضيف تجرب عليه برنامج مشكوك فيه أو إعدادات جديدة، أو حساب Standard تشتغل بيه كل يوم وحساب أدمن للتسطيب بس. ومن الأوامر تقدر تعمل كذا حساب في سكربت (معمل كمبيوتر مثلًا) بدل الضغط في Settings.`,
            how: R`حساب Microsoft: بتدخل بإيميل، والإعدادات والباسوردات بتتزامن، والباسورد بيتغير أو يترجع من النت، ومفتاح «Device encryption» بيتحفظ فيه (درس Get-BitLockerVolume). حساب Local: موجود على الجهاز ده بس ومش محتاج نت، ولو نسيت الباسورد مفيش استرجاع من النت (غير أسئلة الأمان لو حطيتها). [[New-LocalUser]] بيعمل local بس، وحساب Microsoft بيتضاف من Settings ← Accounts ← Other users ← Add account.

[[SecureString]]: Read-Host بيرجّع object مش نص، فلو طبعته يظهر [[System.Security.SecureString]] مش الباسورد. ولو حطيت الباسورد نص صريح في سكربت ([[ConvertTo-SecureString "123" -AsPlainText -Force]]) هيفضل مكتوب في الملف وفي الـ History، فده للمعامل والتجارب بس.

[[LastLogon]] ممكن يطلع فاضي حتى للحساب اللي شغال بيه كل يوم: عندي حساب Microsoft بدخل بيه بالـ PIN كل يوم وطلع فاضي، و [[net user]] قال [[Never]]. فمتعتمدش عليه لوحده.

[[New-LocalUser]] بيعمل الحساب بس، وفولدر C:\Users\sara مش بيتعمل غير أول ما الحساب يسجّل دخول.`,
            when: R`حساب لحد تاني على نفس الجهاز، أو حساب للتجارب، أو فصل حسابك اليومي عن حساب الأدمن، أو تجهيز كذا جهاز بنفس الحسابات بسكربت.`,
            mistakes: R`تعمل الحساب وتنسى تضيفه لجروب Users. أو تكتب الباسورد نص صريح في السكربت. أو تستخدم [[-NoPassword]] على لابتوب بيخرج من البيت. أو تحاول تعمل حساب بإيميل Microsoft بـ New-LocalUser (ده local بس). أو تشغّله من غير أدمن فيطلع Access denied. أو تختار اسم أطول من 20 حرف أو فيه [[@]].`
          },
          lines: [
            "كل الحسابات اللي على الجهاز.",
            "الاسم، وشغال ولا متقفل، وآخر دخول، ونوع الحساب.",
            "اسأل على الباسورد وهو بيظهر نجوم، ورجّعه SecureString.",
            "بيانات الحساب في hashtable، و [[$true]] للـ switch.",
            "اعمل الحساب بالبيانات دي (splatting، أدمن).",
            "حطه في جروب Users بالـ SID عشان يعرف يدخل.",
            "حساب من غير باسورد (لجهاز في البيت بس). محتاج برضه يتحط في Users.",
            "اتأكد إنه اتعمل وشغال."
          ],
          sol: R`جربت العرض على ويندوز 11 Home من غير أدمن. [[Get-LocalUser]] طلع 5 حسابات: الحساب اللي شغال بيه [[True]] و [[MicrosoftAccount]]، و [[Administrator]] و [[DefaultAccount]] و [[Guest]] و [[WDAGUtilityAccount]] كلهم [[False]] و [[Local]]. و [[LastLogon]] كان فاضي لكل الحسابات، حتى بتاعي.

وجربت الإنشاء بـ [[-WhatIf]] بس: [[New-LocalUser -Name "sara" -NoPassword -Description "Kids account" -WhatIf]] طبع [[What if: Performing the operation "Create new local user" on target "sara".]] من غير ما يعمل حاجة. ومن غير WhatIf في Terminal أدمن، التوثيق بيقول إنه بيطبع جدول فيه [[Name]] و [[Enabled]] بـ True و [[Description]]. (معملتش حسابات حقيقية على الجهاز وأنا بكتب الدرس.)`
        },
        {
          cmd: "Set-LocalUser / Remove-LocalUser",
          title: "غيّر الباسورد، اقفل الحساب، امسحه صح",
          desc: R`[[Set-LocalUser]] بيغيّر حاجات في حساب local موجود (الباسورد والوصف وانتهاء الباسورد)، و [[Disable-LocalUser]] بيقفل الحساب من غير ما يمسحه، و [[Remove-LocalUser]] بيمسحه خالص. القاعدة: اقفل الأول، وامسح بعدين لما تتأكد إن محدش محتاج حاجة منه.

[[-Password $new]] باسورد جديد من [[Read-Host -AsSecureString]] (الدرس اللي فات). و [[-PasswordNeverExpires $true]] هنا بياخد قيمة True أو False، مش switch زي New-LocalUser. و [[Enable-LocalUser]] بيرجّع الحساب المقفول. و [[Rename-LocalUser -NewName]] بيغيّر اسم الدخول بس: الـ SID (رقم الحساب الحقيقي اللي الصلاحيات مربوطة بيه) بيفضل زي ما هو، وفولدر البروفايل في C:\Users بيفضل بالاسم القديم.

المسح: [[Remove-LocalUser]] بيمسح الحساب بس، وفولدر البروفايل (C:\Users\sara بالـ Desktop والـ Documents وكل حاجة) بيفضل على الديسك. [[Get-CimInstance Win32_UserProfile]] بيعرض البروفايلات الحقيقية: [[LocalPath]] مكان الفولدر، و [[SID]] الحساب، و [[Loaded]] حد داخل بيه دلوقتي، و [[-Filter "Special = false"]] من غير بروفايلات النظام. و [[$sid = (Get-LocalUser "sara.m").SID.Value]] رقم الحساب كنص، و [[Where-Object SID -eq $sid]] البروفايل بتاعه، و [[Remove-CimInstance]] بيمسح البروفايل صح (الفولدر وبياناته في الـ registry) وده لازم قبل مسح الحساب، لأن بعده مش هتعرف الـ SID بسهولة. أو من Settings ← Accounts ← Other users ← الحساب ← Remove، ودي بتمسح الاتنين.

كل أوامر التعديل محتاجة Terminal أدمن، والحساب لازم ميكونش داخل ([[Loaded]] False). وحساب Microsoft باسورده مش بيتغير من هنا: التوثيق بيقول متحطش [[-Password]] لحساب مربوط بحساب Microsoft، باسورده من account.microsoft.com. والمقابل من CMD في درس «net user» في تاب «CMD».`,
          example: R`$new = Read-Host "New password" -AsSecureString
Set-LocalUser -Name "sara" -Password $new -PasswordNeverExpires $true
Disable-LocalUser -Name "sara"
Enable-LocalUser -Name "sara"
Rename-LocalUser -Name "sara" -NewName "sara.m"
Get-CimInstance Win32_UserProfile -Filter "Special = false" | Select-Object LocalPath, SID, Loaded, LastUseTime
$sid = (Get-LocalUser "sara.m").SID.Value
Get-CimInstance Win32_UserProfile | Where-Object SID -eq $sid | Remove-CimInstance
Remove-LocalUser -Name "sara.m"`,
          try: R`اعرض البروفايلات الحقيقية على جهازك، وقارنها بالفولدرات اللي في [[C:\Users]]. فيه فولدرات ملهاش بروفايل؟`,
          flag: "danger",
          deep: {
            why: R`حد نسي الباسورد، أو حد ساب البيت أو الشغل ومحتاج تقفل حسابه بس تحتفظ بملفاته، أو حساب تجارب خلص دوره. والمسح الغلط (تمسح الحساب وتسيب الفولدر، أو تمسح الفولدر بإيدك) بيسيب ملفات تقيلة محدش عارف بتاعة مين، أو بروفايل مكسور في الـ registry.`,
            how: R`ويندوز بيعرف الحساب بالـ SID مش بالاسم، زي [[S-1-5-21-...-1001]]. الصلاحيات على الملفات (درس Get-Acl / Set-Acl) والبروفايل مربوطين بالـ SID، عشان كده Rename ميبوّظش حاجة، ومسح الحساب بيخلي أي صلاحية كانت ليه تظهر كـ SID غريب من غير اسم.

[[Disable-LocalUser]] بيمنع الدخول بس: الملفات والصلاحيات والمهام المجدولة بتاعة الحساب كلها موجودة، وتقدر ترجّعه في ثانية. عشان كده أأمن خطوة أولى.

[[Win32_UserProfile]] هو اللي ويندوز بيستخدمه في System Properties ← User Profiles. [[Remove-CimInstance]] عليه بيمسح فولدر البروفايل ومفتاحه في [[HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList]]. أما [[Remove-Item C:\Users\sara -Recurse]] بيمسح الفولدر بس، ولو الحساب لسه موجود ودخل تاني، ويندوز بيعمله بروفايل مؤقت (TEMP) لأن المفتاح بيشاور على فولدر مش موجود.`,
            when: R`تغيير باسورد حساب local من غير ما تدخل بيه، أو قفل حساب مؤقتًا، أو تنضيف حسابات قديمة والمساحة اللي واخدينها.`,
            mistakes: R`تمسح الحساب الأول وبعدين تدوّر على البروفايل بتاعه. أو تمسح فولدر C:\Users بإيدك. أو تمسح من غير ما تاخد نسخة من ملفاته. أو تحاول تغيّر باسورد حساب Microsoft بـ Set-LocalUser. أو تقفل آخر حساب أدمن على الجهاز (افضل سايب حساب أدمن واحد على الأقل شغال). أو تفتكر [[-WhatIf]] مع Remove-LocalUser بيتأكد إن الحساب موجود: جربت [[Remove-LocalUser -Name "nosuchuser" -WhatIf]] وطبع «What if» عادي لحساب مش موجود.`
          },
          lines: [
            "اسأل على الباسورد الجديد (نجوم).",
            "حطه، وخلي الباسورد ميخلصش (هنا True/False مش switch).",
            "اقفل الحساب من غير ما تمسحه.",
            "رجّعه.",
            "غيّر اسم الدخول بس (الـ SID والفولدر زي ما هم).",
            "البروفايلات الحقيقية: الفولدر والـ SID وحد داخل بيه ولا لأ وآخر استخدام.",
            "رقم الحساب (SID) كنص.",
            "امسح البروفايل بتاعه صح: الفولدر وبياناته (لازم ميكونش داخل).",
            "وبعدين امسح الحساب نفسه."
          ],
          sol: R`جربت العرض بس. [[Get-CimInstance Win32_UserProfile -Filter "Special = false"]] طلع بروفايل واحد: [[C:\Users\me]] (غيّرت الاسم) و [[Loaded True]] و SID بيبدأ بـ [[S-1-5-21-]] وبيخلص بـ [[-1001]]. لكن [[Get-ChildItem C:\Users -Directory]] طلع فولدرات كتير غيره: [[Public]] (مشترك لكل اليوزرز) وفولدرات زي [[TEMP]] و [[UMFD-0]] و [[TEMP.Font Driver Host.000]]، ودي فاضلة من بروفايلات مؤقتة قديمة وملهاش أي بروفايل حقيقي. يعني وجود فولدر في C:\Users مش معناه إن فيه حساب.

وجربت [[Disable-LocalUser -Name Guest -WhatIf]] فطبع [[What if: Performing the operation "Disable local user" on target "Guest".]]. (مغيّرتش ولا مسحت أي حساب وأنا بكتب الدرس.)`,
          solCode: R`Get-CimInstance Win32_UserProfile -Filter "Special = false" | Select-Object LocalPath, Loaded
Get-ChildItem C:\Users -Directory | Select-Object Name`
        },
        {
          cmd: "Add-LocalGroupMember",
          title: "خلي حد أدمن (أو شيله)",
          desc: R`الصلاحيات في ويندوز بتيجي من الجروبات: اللي في جروب [[Administrators]] أدمن، واللي في [[Users]] يوزر عادي. [[Add-LocalGroupMember]] بيضيف حساب لجروب، و [[Remove-LocalGroupMember]] بيشيله، و [[Get-LocalGroupMember]] بيعرض مين في الجروب.

[[-Group "Administrators"]] اسم الجروب، و [[-Member "sara"]] الحساب بالاسم اللي بيظهر في Get-LocalUser. ونتيجة Get-LocalGroupMember فيها [[ObjectClass]] (User أو Group، لأن جروب ممكن يبقى جوه جروب)، و [[Name]] بالشكل [[PC\name]]، و [[PrincipalSource]] نوع الحساب.

أسامي الجروبات بتتترجم: على ويندوز بلغة تانية «Administrators» اسمها حاجة تانية، فسكربت فيه الاسم الإنجليزي هيقول [[Group Administrators was not found]]. الحل [[-SID S-1-5-32-544]] بدل الاسم، والرقم ده ثابت في كل ويندوز، و [[S-1-5-32-545]] هو Users. و [[Get-LocalGroup | Select-Object Name, SID]] بيعرض كل الجروبات بأرقامها.

[[Remote Desktop Users]] الجروب اللي بيسمح لحد يدخل الجهاز بـ Remote Desktop، وده مش موجود في ويندوز Home خالص (جربت، السطر الأخير بيفشل)، لأن Home مينفعش يستقبل Remote Desktop، يقدر بس يتصل بأجهزة تانية (درس «mstsc» في تاب «CMD»). فعلى Home الدخول من بعيد بيبقى بـ SSH (درس OpenSSH Server) أو PowerShell remoting (درس Enter-PSSession).

نصيحة: اشتغل يوميًا بحساب Standard، وخلي حساب أدمن منفصل للتسطيب والإعدادات: لو برنامج خبيث اشتغل وانت Standard، مش هيقدر يغيّر في النظام من غير باسورد الأدمن. والإضافة والشيل محتاجين Terminal أدمن والعرض لأ، والموديول شغال في 5.1 و 7. والمقابل من CMD في درس «net localgroup» في تاب «CMD».`,
          example: R`Get-LocalGroupMember -Group "Administrators"
Get-LocalGroupMember -SID S-1-5-32-544
Get-LocalGroup | Select-Object Name, SID
Add-LocalGroupMember -SID S-1-5-32-544 -Member "sara"
Remove-LocalGroupMember -SID S-1-5-32-544 -Member "sara"
Add-LocalGroupMember -Group "Remote Desktop Users" -Member "sara"`,
          try: R`اعرف مين أدمن على جهازك، وهل الحساب اللي انت شغال بيه منهم. واعرض الجروبات اللي على جهازك ودوّر على Remote Desktop Users.`,
          flag: "danger",
          deep: {
            why: R`عايز تدّي حد صلاحية يسطّب برامج، أو تشيلها من حد ماكانش المفروض ياخدها، أو تراجع مين أدمن على جهاز (أول حاجة تبص عليها لو شاكك إن حد عبث في الجهاز). ومن غير الأوامر دي على Home مفيش أداة رسومية كاملة للجروبات.`,
            how: R`الجروبات اللي أرقامها بتبدأ بـ [[S-1-5-32-]] «built-in» جاية مع ويندوز: 544 Administrators، و 545 Users، و 546 Guests. وجروبات زي [[docker-users]] بتتعمل لما تسطّب برنامج، ورقمها بيبدأ بـ [[S-1-5-21-]] لأنها خاصة بالجهاز ده.

الإضافة لـ Administrators بتبان من أول دخول جديد: لو الحساب داخل دلوقتي، لازم يعمل Sign out ويدخل تاني عشان الصلاحية الجديدة تظهر، لأن ويندوز بيحسب جروبات الحساب لحظة الدخول.

[[Get-LocalGroupMember]] ليه bug معروف: لو الجروب فيه حساب اتمسح (بيظهر كـ SID من غير اسم)، ممكن يطلع error زي [[Failed to compare two elements in the array]]. ساعتها [[net localgroup administrators]] بيعرض عادي، وشيل الـ SID اليتيم ده.`,
            when: R`تدّي أو تشيل صلاحية أدمن، أو تراجع الأدمنز على جهاز، أو تحط حساب في جروب لازم لبرنامج (زي docker-users أو OpenSSH Users)، أو سكربت تجهيز بيشتغل على ويندوز بأي لغة (بالـ SID).`,
            mistakes: R`تشيل نفسك من Administrators وانت آخر أدمن. أو تكتب اسم الجروب بالإنجليزي في سكربت هيشتغل على ويندوز مترجم. أو تستنى الصلاحية تبان من غير Sign out. أو تدوّر على Remote Desktop Users على Home. أو تخلي كل أهل البيت أدمن عشان «ميسألوكش».`
          },
          lines: [
            "مين في جروب الأدمنز (بالاسم الإنجليزي).",
            "نفس الحاجة بالـ SID، وده شغال على ويندوز بأي لغة.",
            "كل الجروبات وأرقامها.",
            "خلي sara أدمن (أدمن). الصلاحية بتبان بعد ما تعمل Sign out وتدخل.",
            "شيلها من الأدمنز.",
            "اسمح لها بـ Remote Desktop. على ويندوز Home بيفشل لأن الجروب مش موجود."
          ],
          sol: R`جربت العرض على ويندوز 11 Home من غير أدمن. [[Get-LocalGroupMember -SID S-1-5-32-544]] طلع اتنين: الحساب اللي شغال بيه ([[User]] و [[MicrosoftAccount]]) و [[Administrator]] المدمج ([[Local]]، وهو متقفل). يعني الحساب اليومي أدمن. وجروب Users ([[S-1-5-32-545]]) طلع فيه حسابي و [[NT AUTHORITY\Authenticated Users]] و [[NT AUTHORITY\INTERACTIVE]] كـ Group.

و [[Get-LocalGroup]] طلع 15 جروب، منهم [[Administrators S-1-5-32-544]] و [[Users S-1-5-32-545]] و [[OpenSSH Users S-1-5-32-585]] و [[docker-users]] برقم بيبدأ بـ [[S-1-5-21-]]، ومفيش Remote Desktop Users، و [[Get-LocalGroup "Remote Desktop Users"]] طلع [[Group Remote Desktop Users was not found.]]. وجربت [[Add-LocalGroupMember -SID S-1-5-32-544 -Member "sara" -WhatIf]] فطلع [[Principal sara was not found.]] لأن الحساب مش موجود، يعني الأمر بيتأكد من الحساب حتى مع WhatIf.`
        },
        {
          cmd: "IsInRole (Admin check)",
          title: "السكربت شغال أدمن؟ ولو لأ، اطلب الصلاحية",
          desc: R`سكربتات كتير (تعديل hosts، فايروول، يوزرز) محتاجة أدمن، ولو اشتغلت من غيره بتفشل في النص وتسيب الشغل نصه معمول. أول سطرين في المثال بيسألوا ويندوز «النافذة دي شغالة أدمن؟»، ولو لأ السكربت بيفتح نفسه تاني كأدمن بـ [[Start-Process -Verb RunAs]] (درس Start-Process) ويقفل النسخة العادية.

[[[Security.Principal.WindowsIdentity]::GetCurrent()]] بيجيب هوية اليوزر اللي شغّل PowerShell، و [[[Security.Principal.WindowsPrincipal]::new($id)]] بيعمل منها object تسأله، و [[.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)]] بيرجع True لو النافذة نفسها مرفوعة كأدمن (elevated). و [[$PSCommandPath]] متغير جاهز فيه المسار الكامل للسكربت اللي شغال (فاضي لو لصقت الكود في الترمنال بدل ما تشغّله من ملف).

الإعادة: [[-Verb RunAs]] بيطلّع سؤال UAC، و [[('"{0}"' -f $PSCommandPath)]] بيحط المسار بين علامات تنصيص، لأن [[-ArgumentList]] بيلزق العناصر بمسافات ومش بيحط علامات تنصيص لوحده (جربتها على 7.6)، فمسار فيه مسافة هيتقطع. و [[exit]] بيقفل النسخة العادية. ولو السكربت بيشتغل بـ 5.1، اكتب [[powershell]] مكان [[pwsh]]. وتشغيل برنامج بحساب تاني (مش أدمن نفس الحساب) ده شغل [[runas]] (درس «runas» في تاب «CMD»).

أبسط من كده: سطر [[#Requires -RunAsAdministrator]] في أول ملف .ps1 بيخلي PowerShell يرفض يشغّل السكربت أصلًا لو مش أدمن، برسالة واضحة، من غير ما يفتحه تاني. السطر ده بيبدأ بـ [[#]] بس PowerShell بيقراه، ولازم يبقى في ملف سكربت.

UAC (User Account Control): حتى لو حسابك في جروب Administrators، البرامج اللي بتفتحها بتشتغل بصلاحيات يوزر عادي، والأدمن بيتفعّل بس للبرنامج اللي توافق له على سؤال UAC. عشان كده IsInRole بيرجع False في نافذة عادية وانت أدمن. و [[whoami /groups]] (درس «whoami /groups /priv» في تاب «CMD») بيوريك ده: Administrators جنبها [[Group used for deny only]]، والمستوى [[Medium Mandatory Level]]، وفي نافذة أدمن [[High Mandatory Level]].`,
          example: R`$id = [Security.Principal.WindowsIdentity]::GetCurrent()
$isAdmin = [Security.Principal.WindowsPrincipal]::new($id).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "Not admin, asking for elevation..." -ForegroundColor Yellow
    Start-Process pwsh -Verb RunAs -ArgumentList @("-NoProfile", "-File", ('"{0}"' -f $PSCommandPath))
    exit
}
Write-Host "Running as admin" -ForegroundColor Green`,
          try: R`احفظ المثال في ملف [[admin-check.ps1]] في فولدر اسمه فيه مسافة، وشغّله من نافذة عادية ووافق على UAC. وبعدين جرب ملف تاني أول سطر فيه [[#Requires -RunAsAdministrator]] بس.`,
          flag: "script",
          deep: {
            why: R`سكربت بيعدّل الفايروول ويعمل يوزر ويغيّر hosts، شغّلته من نافذة عادية: أول خطوة فشلت بـ Access denied، والتانية نجحت لأنها مش محتاجة أدمن، والتالتة فشلت. النتيجة جهاز نص متظبط. الفحص في أول السكربت بيخلي الحكاية كلها تتعمل أو متتعملش.`,
            how: R`لما تدخل بحساب أدمن، ويندوز بيدّيك «token» مزدوج: واحد عادي بيستخدمه لكل البرامج، وواحد كامل بيستخدمه بس لما توافق على UAC. [[IsInRole]] بيبص على الـ token اللي البرنامج شغال بيه دلوقتي، فبيقولك «النافذة دي» أدمن ولا لأ، مش «الحساب» أدمن ولا لأ. ولو عايز تعرف الحساب نفسه في الجروب: [[Get-LocalGroupMember -SID S-1-5-32-544]] (درس Add-LocalGroupMember).

[[Start-Process -Verb RunAs]] بيشغّل نسخة جديدة في نافذة جديدة، والنسخة القديمة مش بتستنى ولا بتشوف ناتجها. فلو السكربت بياخد parameters لازم تبعتها بنفسك في [[-ArgumentList]]، وكل قيمة فيها مسافة تتحط بين علامات تنصيص بنفس الطريقة. ولو اليوزر رفض UAC، [[Start-Process]] بيطلع error إن العملية اتلغت، فممكن تحطه في [[try/catch]].

في Windows Terminal: Win+X وبعدين Terminal (Admin)، أو Ctrl+Shift+Click على البروفايل بيفتحه أدمن. والنافذة الأدمن عنوانها بيبدأ بـ Administrator، ولو عامل prompt (درس «function prompt») بيبان [[[admin]]].

[[#Requires]] ليه أشكال تانية مفيدة: [[#Requires -Version 7]] و [[#Requires -Modules NetSecurity]] و [[#Requires -PSEdition Core]].`,
            when: R`أي سكربت بيعدّل حاجة في النظام: يوزرز، فايروول، خدمات، hosts، registry تحت HKLM، Defender، ديسكات. [[#Requires]] لما تكون انت اللي بتشغّله، والإعادة الأوتوماتيك لما تبعته لحد مش هيعرف يفتح Terminal أدمن.`,
            mistakes: R`تبعت المسار من غير علامات تنصيص فالسكربت مش بيلاقي نفسه لو المسار فيه مسافة (جربت: [[The argument 'C:\...\dir' is not recognized as the name of a script file]]). أو تنسى [[exit]] فالنسخة العادية تكمّل وتفشل. أو تلصق الكود في الترمنال فـ [[$PSCommandPath]] يبقى فاضي. أو تفتكر إنك عشان أدمن يبقى النافذة أدمن. أو تشغّل pwsh من سكربت 5.1 والجهاز معندوش PowerShell 7.`
          },
          lines: [
            "هوية اليوزر اللي شغّل PowerShell.",
            "النافذة دي مرفوعة كأدمن؟ True أو False.",
            "لو لأ...",
            "...اطبع رسالة...",
            "...وشغّل نفس السكربت تاني كأدمن (سؤال UAC)، والمسار بين علامات تنصيص.",
            "...واقفل النسخة العادية.",
            "قفلة الـ if.",
            "هنا السكربت شغال أدمن، كمّل شغلك."
          ],
          sol: R`جربتها من نافذة عادية والحساب أدمن: [[$isAdmin]] طلع [[False]] في 7.6 و 5.1. و [[whoami /groups]] طلع [[BUILTIN\Administrators]] وجنبها [[Group used for deny only]]، و [[Mandatory Label\Medium Mandatory Level]]، ودي بالظبط حكاية UAC: الحساب في الجروب بس النافذة مش مرفوعة. (مفتحتش سؤال UAC وأنا بكتب الدرس.)

وملف أوله [[#Requires -RunAsAdministrator]] (الـ solCode) رفض يشتغل في 7.6 برسالة [[The script 'needadmin.ps1' cannot be run because it contains a "#requires" statement for running as Administrator. The current PowerShell session is not running as Administrator.]]، ونفس الرسالة تقريبًا في 5.1 ومعاها [[ScriptRequiresElevation]]. وجربت ليه علامات التنصيص مهمة: [[Start-Process pwsh -ArgumentList]] لسكربت جوه فولدر اسمه [[dir with space]] من غير علامات تنصيص طلع [[The argument '...\dir' is not recognized as the name of a script file]]، ومعاها اشتغل وطبع ناتج السكربت.`,
          solCode: R`#Requires -RunAsAdministrator
Write-Host "Running as admin" -ForegroundColor Green`
        },
        {
          cmd: "Get-Acl / Set-Acl",
          title: "مين يقدر يفتح الفولدر ده؟",
          desc: R`كل ملف وفولدر على NTFS ليه لستة صلاحيات اسمها ACL: مين يقرا، ومين يكتب، ومين ممنوع. [[Get-Acl]] بيقراها و [[Set-Acl]] بيكتبها، وبينهم بتعدّل الـ object في PowerShell: تضيف rule أو تشيلها. المثال كله على فولدر تجربة في TEMP وبيمسحه في الآخر.

[[(Get-Acl $folder).Access]] لستة الصلاحيات، وكل سطر فيه: [[IdentityReference]] مين (يوزر أو جروب)، و [[FileSystemRights]] إيه: [[FullControl]] كله، و [[Modify]] قراية وكتابة ومسح، و [[ReadAndExecute]] قراية وتشغيل، و [[Read]] قراية بس. و [[AccessControlType]] Allow أو Deny، و [[IsInherited]] True لو الصلاحية جاية وراثة من الفولدر الأب. و [[.Owner]] صاحب الفولدر.

إضافة rule: [[[System.Security.Principal.SecurityIdentifier]::new("S-1-5-32-545")]] جروب Users بالـ SID (عشان يشتغل على ويندوز بأي لغة، زي درس Add-LocalGroupMember)، وينفع تكتب اسم يوزر بداله زي [["PC\sara"]]. و [[[System.Security.AccessControl.FileSystemAccessRule]::new(...)]] بياخد 5 حاجات بالترتيب: مين، والصلاحية، و [["ContainerInherit, ObjectInherit"]] يعني الفولدرات والملفات اللي جوه تورثها، و [["None"]] الوراثة عادية، و [["Allow"]]. و [[$acl.AddAccessRule($rule)]] بيضيفها للـ object بس، و [[Set-Acl -AclObject $acl]] هو اللي بيكتبها على الفولدر فعلًا. و [[RemoveAccessRule]] بيشيلها وبيرجّع True لو لقاها، و [[Out-Null]] يخفي الـ True ده.

[[Where-Object { -not $_.IsInherited }]] الصلاحيات اللي اتحطت على الفولدر ده بس، من غير الموروثة. الأوامر دي في 5.1 و 7 على ويندوز. على فولدر انت صاحبه مش محتاج أدمن، وعلى فولدرات النظام أو فولدرات يوزر تاني محتاج. ولحاجات زي «رجّع الصلاحيات الافتراضية لكل اللي جوه» أو «خد ملكية فولدر»، [[icacls]] و [[takeown]] أسهل (درس «icacls» ودرس «takeown» في تاب «CMD»).`,
          example: R`$folder = Join-Path $env:TEMP "acl-lab"
New-Item -ItemType Directory -Force $folder | Out-Null
(Get-Acl $folder).Access | Format-Table IdentityReference, FileSystemRights, AccessControlType, IsInherited
$acl = Get-Acl $folder
$who = [System.Security.Principal.SecurityIdentifier]::new("S-1-5-32-545")
$rule = [System.Security.AccessControl.FileSystemAccessRule]::new($who, "ReadAndExecute", "ContainerInherit, ObjectInherit", "None", "Allow")
$acl.AddAccessRule($rule)
Set-Acl -Path $folder -AclObject $acl
(Get-Acl $folder).Access | Where-Object { -not $_.IsInherited } | Format-Table IdentityReference, FileSystemRights, InheritanceFlags
$acl = Get-Acl $folder
$acl.RemoveAccessRule($rule) | Out-Null
Set-Acl -Path $folder -AclObject $acl
Remove-Item $folder -Recurse -Force`,
          try: R`شوف صلاحيات فولدر الـ SSH بتاعك ([[(Get-Acl $HOME\.ssh).Access]]): مين غيرك يقدر يقراه؟ وبعدين شغّل المثال كله على فولدر التجربة.`,
          flag: "danger",
          deep: {
            why: R`فولدر مشترك بين يوزرين على نفس الجهاز، أو فولدر فيه أسرار (مفاتيح، ملفات .env) عايز تتأكد إن محدش غيرك يقراه، أو سيرفر شغال بحساب تاني ومحتاج يكتب في فولدر، أو SSH بيرفض المفتاح لأن صلاحيات الملف مفتوحة زيادة (درس ssh / scp).`,
            how: R`الوراثة: معظم الصلاحيات [[IsInherited True]] جاية من الفولدر الأب، و C:\Users\اسمك بيدّي SYSTEM و Administrators وصاحب الحساب FullControl. الـ rule اللي بتضيفها بتبقى «explicit» على الفولدر ده، ومع ContainerInherit و ObjectInherit بتنزل لكل اللي جواه: جربت أعمل ملف جوه الفولدر بعد الإضافة، ولقيت عليه [[BUILTIN\Users  ReadAndExecute, Synchronize  True]]. و [[Synchronize]] بتتزوّد لوحدها مع أي صلاحية، عادي.

[[Deny]] بيكسب على [[Allow]]، فاستخدمه نادرًا: Deny على جروب Users مثلًا بيمنعك انت كمان لأنك فيه.

[[$acl.SetAccessRuleProtection($true, $false)]] بيقطع الوراثة من الأب، والـ false التانية معناها متنسخش الصلاحيات الموروثة. ده اللي بتعمله لفولدر سري، بس لو قطعتها من غير ما تضيف نفسك ممكن تقفل الفولدر على نفسك.

[[Set-Acl -Path $other -AclObject (Get-Acl $folder)]] بينسخ صلاحيات فولدر لفولدر تاني. و [[(Get-Acl $folder).Sddl]] نفس الصلاحيات في نص مضغوط اسمه SDDL.`,
            when: R`تقفل فولدر على يوزر واحد، أو تدّي حساب خدمة صلاحية كتابة، أو تراجع مين يقدر يقرا فولدر فيه بيانات حساسة، أو سكربت تجهيز بيعمل فولدرات بصلاحيات معينة.`,
            mistakes: R`تعدّل الـ object وتنسى [[Set-Acl]]، فمحصلش حاجة. أو تحط Deny لجروب انت فيه. أو تقطع الوراثة من غير ما تسيب لنفسك صلاحية. أو تكتب اسم جروب بالإنجليزي على ويندوز مترجم (استخدم الـ SID). أو تجرب على فولدر مهم بدل فولدر تجربة. أو تكتب صلاحيات فولدر كبير بـ Set-Acl ومش فاهم هتنزل على إيه، وده مكان icacls أوضح.`
          },
          lines: [
            "مسار فولدر التجربة في TEMP.",
            "اعمله، و [[Out-Null]] يخفي الناتج.",
            "الصلاحيات الحالية: مين، وإيه، وسماح ولا منع، وموروثة ولا لأ.",
            "هات الـ ACL كـ object تعدّل فيه.",
            "جروب Users بالـ SID (شغال بأي لغة).",
            "الـ rule: Users يقرا ويشغّل، والفولدرات والملفات اللي جوه تورثها.",
            "ضيفها للـ object (لسه متكتبتش).",
            "اكتب الـ ACL على الفولدر فعلًا.",
            "الصلاحيات اللي اتحطت على الفولدر ده بس.",
            "هات الـ ACL تاني.",
            "شيل الـ rule، و Out-Null يخفي الـ True.",
            "اكتبها.",
            "امسح فولدر التجربة."
          ],
          sol: R`شغّلت المثال كله على 7.6 و 5.1 من غير أدمن. الجدول الأول طلع 3 صلاحيات موروثة: [[NT AUTHORITY\SYSTEM  FullControl  Allow  True]] و [[BUILTIN\Administrators  FullControl  Allow  True]] وحسابي [[FullControl]] (موروثة كلها من فولدر TEMP). وبعد Set-Acl، الجدول التاني طلع سطر واحد: [[BUILTIN\Users  ReadAndExecute, Synchronize  ContainerInherit, ObjectInherit]]. وبعد الشيل، عدد الصلاحيات غير الموروثة بقى [[0]]، والفولدر اتمسح.

وجربت كمان [[icacls]] على نفس الفولدر: طلع [[NT AUTHORITY\SYSTEM:(I)(OI)(CI)(F)]]، و [[(I)]] يعني موروثة، و [[(OI)(CI)]] هي ObjectInherit و ContainerInherit، و [[(F)]] FullControl. نفس المعلومة بشكل أقصر. وفي التجربة: فولدر [[.ssh]] غالبًا هتلاقي عليه نفس التلاتة بس (SYSTEM و Administrators وانت)، وده كويس.`
        }
      ]
    }
]);
