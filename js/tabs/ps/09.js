// تكملة تاب ps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ps/01.js (شرح حقول الدرس في أوله)
MORE("ps", [
    {
      t: "البيئة والإعدادات",
      l: 2,
      n: "",
      items: [
        {
          cmd: "$env:",
          title: "متغيرات البيئة",
          desc: R`متغيرات البيئة (environment variables) قيم بيشوفها أي برنامج بتشغّله، زي [[PATH]] (الفولدرات اللي ويندوز بيدوّر فيها على البرامج) و [[TEMP]] و [[USERPROFILE]]. في PowerShell بتقراها وتكتبها بـ [[$env:NAME]]، المقابل لـ [[$NAME]] في bash و [[%NAME%]] في CMD.

[[$env:PATH -split ';']] بيقسم الـ PATH عند كل [[;]] فيطبع كل فولدر في سطر (على ويندوز الفاصل [[;]] مش [[:]] زي لينكس). و [[$env:API_URL = "..."]] بيعمل متغير للنافذة دي وأي برنامج تشغّله منها، زي [[export]]، وبيروح لما تقفلها.

للحفظ الدائم السطر التالت: [[[Environment]::SetEnvironmentVariable(الاسم, القيمة, "User")]] بيكتبه لليوزر بتاعك (و [["Machine"]] لكل اليوزرز ومحتاج أدمن). الأقواس المربعة [[[Environment]]] اسم class من .NET، و [[::]] بتنادي method جواه. التغيير الدائم مش بيظهر في النافذة المفتوحة، افتح واحدة جديدة. و [[Get-ChildItem env:]] بيعرض كل المتغيرات، لأن [[env:]] في PowerShell درايف زي [[C:]].`,
          example: R`$env:PATH -split ';'
$env:API_URL = "http://localhost:3000"
[Environment]::SetEnvironmentVariable("API_URL", "http://localhost:3000", "User")
Get-ChildItem env:`,
          try: "اطبع PATH سطر سطر بأول أمر.",
          deep: {
            why: R`البرامج بتاخد إعدادات كتير من متغيرات البيئة: [[PATH]] اللي بيقرر أنهي node بيشتغل، و [[NODE_ENV]]، و [[JAVA_HOME]]. ولما برنامج «مش موجود» وهو متسطب، غالبًا المشكلة في الـ PATH.`,
            how: R`[[Env:]] في PowerShell زي drive كامل. [[$env:PATH]] بيقرا. [[ls Env:]] بيعرض كل المتغيرات. [[$env:MY_VAR = "value"]] بيضبط للجلسة الحالية بس.

الفرق المهم عن bash: التغيير بيأثر على نفس العملية وأي عملية بتشغّلها منها، بس مش على العمليات الشغالة بالفعل.

للتغيير الدائم: [[[System.Environment]::SetEnvironmentVariable("NAME", "value", "User")]] أو من System Properties.

وكمان: ملفات .env مش بتتقري لوحدها: التطبيق بيقراها (مكتبة dotenv أو [[node --env-file=.env]])، والشيل نفسه مش بيشوفها.`,
            when: "قراية NODE_ENV. ضبط متغيرات للجلسة. تمرير config لـ npm scripts.",
            mistakes: "الخلط بين Machine وUser وProcess scope في SetEnvironmentVariable. User بيتحفظ بين الجلسات للمستخدم ده بس."
          },
          teach: R`## الأول: متغير البيئة غير المتغير العادي

المتغير العادي في PowerShell ([[$x]]) بيعيش جوه PowerShell بس. **متغير البيئة** بيشوفه كل برنامج بتشغّله من النافذة دي: node و git و npm. المثال ٤ سطور: اقرا الـ PATH، اعمل متغير مؤقت، اعمل متغير دايم، اعرض الكل. اتشغّل على ويندوز 11 في PowerShell 7.6.

---

## ١. [[$env:PATH -split ';']]

### [[$env:PATH]]

[[$env:]] معناها «من متغيرات البيئة»، و [[PATH]] اسم المتغير: الفولدرات اللي ويندوز بيدوّر فيها لما تكتب اسم برنامج زي [[node]]. قيمته نص واحد طويل، والفولدرات بينهم [[;]].

### [[-split ';']]

[[-split]] بيقسم النص عند كل [[;]] ويطلّع لستة، كل عنصر في سطر:

~~~text الناتج (أول 6 من 23)
C:\Program Files\WindowsApps\Microsoft.PowerShell_7.6.6.0_x64__8wekyb3d8bbwe
C:\WINDOWS\system32
C:\WINDOWS
C:\WINDOWS\System32\Wbem
C:\WINDOWS\System32\WindowsPowerShell\v1.0\
C:\WINDOWS\System32\OpenSSH\
~~~

الترتيب مهم: لو برنامجين بنفس الاسم في فولدرين، اللي فوق بيكسب. وآخر عنصر طلع نص فاضي، لأن الـ PATH بيخلص بـ [[;]].

ولو كتبت [[-split ':']] زي لينكس:

~~~text الناتج
C
\Program Files\WindowsApps\Microsoft.PowerShell_7.6.6.0_x64__8wekyb3d8bbwe;C
\WINDOWS\system32;C
~~~

اتقسم عند الـ [[:]] اللي في [[C:]]. عشان كده ويندوز بيستخدم [[;]].

---

## ٢. [[$env:API_URL = "http://localhost:3000"]]

بيعمل متغير بيئة اسمه [[API_URL]] **للنافذة دي** وأي برنامج تشغّله منها:

~~~powershell
$env:API_URL
pwsh -NoProfile -c '$env:API_URL'
cmd /c "echo %API_URL%"
~~~

~~~text الناتج
http://localhost:3000
http://localhost:3000
http://localhost:3000
~~~

النافذة نفسها شافته، و pwsh جديد اتشغّل منها شافه، و cmd شافه كمان (بشكله [[%API_URL%]]). ولما تقفل النافذة بيروح.

---

## ٣. [[[Environment]::SetEnvironmentVariable("API_URL", "http://localhost:3000", "User")]]

نفكّه:

| الحتة | معناها |
|---|---|
| [[[Environment]]] | class من .NET (المكتبة اللي PowerShell مبني عليها). الأقواس المربعة = اسم نوع |
| [[::]] | نادي method تبع الـ class نفسه |
| [[SetEnvironmentVariable]] | اسم الـ method: احفظ متغير بيئة |
| [["API_URL"]] | الاسم |
| [["http://localhost:3000"]] | القيمة |
| [["User"]] | يتحفظ فين (تحت) |

| التالت | معناه |
|---|---|
| [["Process"]] | النافذة دي بس، زي السطر ٢ |
| [["User"]] | دايم لليوزر بتاعك، بيتحفظ في الـ registry |
| [["Machine"]] | دايم لكل اليوزرز، محتاج أدمن |

مشغّلتش السطر ده على الجهاز (بيكتب في إعدادات اليوزر). والمعروف من توثيق .NET: القيمة بتتحفظ، والنوافذ اللي هتتفتح **بعد كده** هي اللي هتشوفها، مش النافذة المفتوحة. ولقراية القيمة المحفوظة من غير ما تفتح نافذة جديدة: [[[Environment]::GetEnvironmentVariable("API_URL", "User")]] (جربته قبل الحفظ فرجع فاضي).

---

## ٤. [[Get-ChildItem env:]]

PowerShell بيعامل متغيرات البيئة كأنها **درايف** اسمه [[env:]]، زي [[C:]]. فـ [[Get-ChildItem]] اللي بيعرض الملفات يعرض المتغيرات:

~~~text الناتج (أول سطور من 89)
Name                           Value
----                           -----
ACSetupSvcPort                 23210
ALLUSERSPROFILE               C:\ProgramData
API_URL                        http://localhost:3000
APPDATA                        C:\Users\ali\AppData\Roaming
~~~

و [[API_URL]] اللي عملناه في سطر ٢ ظاهر وسطهم.

---

## نفس الحاجة في كل شيل

| | PowerShell | CMD | bash (لينكس والماك) |
|---|---|---|---|
| اقرا | [[$env:PATH]] | [[%PATH%]] | [[$PATH]] |
| مؤقت | [[$env:X = "v"]] | [[set X=v]] | [[export X=v]] |
| الفاصل في PATH | [[;]] | [[;]] | [[:]] |
| الكل | [[Get-ChildItem env:]] | [[set]] | [[env]] |

وعلى أوبونتو 24.04، [[echo "$PATH" | tr ":" "\n"]] طلع [[/usr/local/sbin]] و [[/usr/local/bin]] و [[/usr/sbin]] ... سطر سطر.

## الخلاصة

~~~text
$env:X = "..."                        النافذة دي وأي برنامج منها، ويروح لما تقفل
SetEnvironmentVariable(..., "User")   دايم، يبان في النوافذ الجديدة بس
PATH                                   مفصول بـ ; على ويندوز، والأول بيكسب
~~~`,
          lines: [
            "اعرض الـ PATH سطر لكل فولدر. على ويندوز الفاصل [[;]] مش [[:]].",
            "متغير للجلسة دي بس (زي export).",
            "متغير دائم لليوزر ده، يفضل بعد ما تقفل (User ممكن تبقى Machine للكل).",
            "كل متغيرات البيئة (زي env)."
          ],
          sol: R`[[$env:PATH -split ';']] بيطبع كل مسار في سطر، زي [[C:\Program Files\nodejs\]] و [[C:\Program Files\Git\cmd]] و [[C:\Users\ali\AppData\Roaming\npm]]. أول سطور هي اللي ليها الأولوية لما نفس البرنامج يبقى موجود في أكتر من مكان.

لو آخر سطر طالع فاضي ده عادي، معناه إن الـ PATH بيخلص بـ [[;]]. ولو طلعلك كله في سطر واحد طويل، يبقى كتبت [[-split ':']] زي لينكس: في ويندوز الفاصل [[;]] لأن [[:]] جزء من [[C:\]]. (جربتها على لينكس بـ [[:]] وطلع [[/tmp/...]] و [[/root/.local/bin]] ... سطر سطر).`
        },
        {
          cmd: "المتغيرات",
          title: "خزّن أي حاجة",
          desc: R`المتغير اسم بيبدأ بـ [[$]] بتحط فيه أي حاجة بـ [[=]] وتستخدمها بعدين. ومش محتاج تقول نوعه. الفرق الكبير عن bash: المتغير بيشيل objects كاملة مش نص، فـ [[$files = Get-ChildItem]] بيخزن الملفات نفسها بكل خصائصها، و [[$files.Count]] عددهم، و [[$files[0].Name]] اسم أول واحد.

[[@( )]] بيعمل array (لستة) بعناصر مفصولة بفواصل: [[@("web", "api")]]. و [[@{ }]] بيعمل hashtable: مفاتيح وقيم، كل مفتاح [[=]] قيمته، وبينهم [[;]] لو على نفس السطر. وتقرا القيمة بالنقطة [[$user.name]] أو بالأقواس [[$user["name"]]].

أسامي المتغيرات مش بتفرّق بين الكابيتال والسمول ([[$Name]] هي [[$name]]). وفيه أسامي محجوزة متستخدمهاش: [[$_]] و [[$args]] و [[$input]] و [[$home]]. وشرح الأنواع والتحويل بينها في درس «المتغيرات والأنواع» في المستوى التالت.`,
          example: R`$files = Get-ChildItem
$files.Count
$user = @{ name = "Ali"; role = "dev" }
$user.name`,
          try: "خزّن Get-Process في متغير واعرف عدد العمليات.",
          deep: {
            why: "المتغيرات في PowerShell مش زي bash: بيها أنواع، وبتتعامل مع objects مش نص بس.",
            how: R`المتغيرات بتبدأ بـ [[$]]. مش محتاج declare. PowerShell بيحدد النوع لوحده من القيمة.

[[$num = 5]] رقم. [[$str = "text"]] نص. [[$arr = @(1, 2, 3)]] array. [[$hash = @{key="value"}]] hashtable (dictionary).

[[$arr[0]]] أول عنصر. [[$hash["key"]]] أو [[$hash.key]] وصول لقيمة.

وتقدر تحدد النوع صراحة: [[[int]$var = "5"]] بيحوّل النص لرقم.

أرقام مع وحدات: [[2GB]]، [[1MB]]، [[500KB]] بتعمل الحسبة تلقائيًا.`,
            when: R`أي حاجة هتستخدمها أكتر من مرة: ناتج أمر بطيء متشغّلهوش مرتين، أو مسار طويل، أو لستة سيرفرات. وفي الترمنال كمان مش بس في السكربتات.`,
            mistakes: "الخلط بين hashtable [[$h.key]] وobject property. الاتنين بنفس الكتابة في بعض الأحيان بس مختلفين."
          },
          teach: R`## الأول: المتغير صندوق باسم

بتحط فيه حاجة بـ [[=]]، وترجعلها باسمه. المثال جزئين: متغير شايل ناتج أمر، ومتغير شايل hashtable. اتشغّل على ويندوز 11 في PowerShell 7.6، في فولدر تجربة فيه فولدر [[src]] و ٣ ملفات.

---

## ١. [[$files = Get-ChildItem]]

| الحتة | معناها |
|---|---|
| [[$]] | أي متغير بيبدأ بيها |
| [[files]] | الاسم، انت بتختاره |
| [[=]] | حط اللي على اليمين في اللي على الشمال |
| [[Get-ChildItem]] | الأمر اللي ناتجه هيتخزن (درس Get-ChildItem) |

الأمر بيتنفّذ مرة واحدة ومبيطبعش حاجة: الناتج راح للمتغير. والمهم: اللي اتخزن **objects** مش نص. بص:

~~~powershell
$files[0].Name
$files[0].GetType().Name
$files[1].GetType().Name
$files.GetType().Name
~~~

~~~text الناتج
src
DirectoryInfo
FileInfo
Object[]
~~~

- [[$files[0]]]: أول عنصر. العد بيبدأ من **0** مش 1.
- [[.Name]]: خانة الاسم بتاعته.
- [[.GetType().Name]]: نوعه. أول واحد [[DirectoryInfo]] (فولدر)، والتاني [[FileInfo]] (ملف)، والمتغير كله [[Object[]]] يعني array (لستة) من objects.

يعني كل عنصر فيه كل حاجة عن الملف (الحجم، التاريخ، الامتداد) تقدر تقراها من غير ما تشغّل الأمر تاني.

## ٢. [[$files.Count]]

~~~text الناتج
4
~~~

[[.Count]] عدد العناصر: فولدر و ٣ ملفات.

---

## ٣. [[$user = @{ name = "Ali"; role = "dev" }]]

### [[@{ }]]: hashtable

لستة **مفاتيح وقيم**. كل مفتاح [[=]] قيمته، و [[;]] بين كل زوج والتاني لأنهم على نفس السطر (لو كل واحد في سطر مش محتاج [[;]]).

~~~text مفتاح   =  قيمة
name    =  "Ali"
role    =  "dev"
~~~

و [[$user]] لوحده بيعرضه كده:

~~~text الناتج
Name                           Value
----                           -----
name                           Ali
role                           dev
~~~

## ٤. [[$user.name]]

بتقرا القيمة بالنقطة واسم المفتاح:

~~~text الناتج
Ali
~~~

وفيه طريقة تانية بالأقواس المربعة: [[$user["role"]]] رجعت [[dev]]. والأقواس مفيدة لو اسم المفتاح جوه متغير أو فيه مسافة.

---

## array و hashtable

| | array | hashtable |
|---|---|---|
| تعمله | [[@("web", "api")]] | [[@{ name = "Ali" }]] |
| تقرا | بالرقم: [[$a[0]]] | بالمفتاح: [[$h.name]] |
| نوعه | [[Object[]]] | [[Hashtable]] |

## حاجتين تانيين

- الأسامي مش بتفرّق بين كابيتال وسمول: عملت [[$Name = "x"]] و [[$name]] رجّع [[x]].
- المتغير **صورة ثابتة**: [[$p = Get-Process]] وبعدين [[$p.Count]] رجّع [[509]]، والرقم ده مش هيتغير لو فتحت برامج، لحد ما تشغّل Get-Process تاني.

---

## مقارنة بـ bash

| | PowerShell | bash |
|---|---|---|
| تعريف | [[$x = 5]] (مسافات عادي) | [[x=5]] (من غير مسافات ومن غير $) |
| قراية | [[$x]] | [[$x]] |
| ناتج أمر | [[$f = Get-ChildItem]] = objects | [[f=$(ls)]] = نص |

## الخلاصة

~~~text
$name = ...     خزّن (ناتج أمر بيتخزن objects كاملة)
$arr[0]         أول عنصر، والعد من 0
@{ k = v }      hashtable، وتقرا بـ $h.k
.Count          العدد
~~~`,
          lines: [
            "احفظ ناتج أمر (array من objects) في متغير.",
            "كام عنصر فيه.",
            "hashtable: مفاتيح وقيم.",
            "اقرا قيمة بالنقطة."
          ],
          sol: R`[[$p = Get-Process]] وبعدين [[$p.Count]] بيرجع رقم زي [[250]] (عندي على ويندوز 11 طلع [[489]] في 7.6 و 5.1، والرقم بيختلف حسب البرامج المفتوحة). و [[$p.GetType().Name]] بيرجع Object[] (array)، يعني المتغير شايل array من objects كاملة، مش نص.

الرقم بيتغير كل شوية لأن العمليات بتفتح وتقفل، و [[$p]] صورة ثابتة من لحظة ما خزنته. لو عايز أحدث رقم لازم تشغّل Get-Process تاني. ولو عملت [[$p.Count]] على حاجة رجعت object واحد بس، PowerShell 7 برضه هيرجع 1، مش فاضي.`
        },
        {
          cmd: "$PROFILE",
          title: "اختصاراتك الشخصية",
          desc: "زي .bashrc. أول سطر بيعمله لو مش موجود بس (من غير الشرط، [[-Force]] كانت هتمسح اللي فيه). حط فيه functions و aliases، و [[. $PROFILE]] يفعّله. اختار أسامي مش مستخدمة: [[gc]] و [[gl]] و [[gp]] مثلًا aliases جاهزة لـ Get-Content و Get-Location و Get-ItemProperty، فمتنفعش لـ git commit و git log و git push.",
          example: R`if (-not (Test-Path $PROFILE)) { New-Item $PROFILE -Force }
notepad $PROFILE
function gst { git status }
Set-Alias ll Get-ChildItem
. $PROFILE`,
          try: "اعمل function اسمها dev بتعمل [[npm run dev]] وحطها في البروفايل. اعرف الأول لو الاسم مستخدم بـ [[Get-Command dev]].",
          deep: {
            why: "ملف بيتشغّل أوتوماتيك كل ما تفتح PowerShell. حطّ فيه aliases وفانكشنز وإعدادات.",
            how: R`[[$PROFILE]] متغير فيه مسار الملف. لو مش موجود: [[New-Item $PROFILE -Force]]. وافتحه في VS Code: [[code $PROFILE]].

فيه ٤ مستويات profile (للـ user الحالي، ولكل user). الأشهر هو [[CurrentUserCurrentHost]].

مثل [[.bashrc]] في bash: بتحط فيه aliases ([[Set-Alias ll Get-ChildItem]]، ولو محتاج parameters اعمل function: [[function ll { Get-ChildItem -Force @args }]]) وPATH إضافات ومتغيرات ثابتة.

بعد التعديل: [[. $PROFILE]] (نقطة ومسافة) يطبّق التغييرات في الجلسة الحالية. مش المفروض تعيد تشغيل PowerShell.`,
            when: "إعداد البيئة بتاعتك: aliases وأوامر مخصوصة ومتغيرات ثابتة.",
            mistakes: "تعدّل الـ profile وتنسى تطبّقه بـ [[. $PROFILE]]. وبعض الـ execution policies بتمنع تشغيله."
          },
          teach: R`## الأول: ملف بيشتغل أول ما تفتح PowerShell

[[$PROFILE]] متغير جاهز فيه **مسار** ملف سكربت. PowerShell بيشغّل الملف ده لوحده مع كل نافذة جديدة، فأي function أو alias تحطه فيه يبقى موجود دايمًا. المثال ٥ سطور: اعمل الملف، افتحه، اكتب فيه، فعّله.

مكتبتش في الـ profile الحقيقي على الجهاز؛ جربت نفس السطور على ملف بنفس الاسم في فولدر تجربة. PowerShell 7.6 على ويندوز 11.

---

## الملف فين؟

~~~powershell
$PROFILE
~~~

~~~text الناتج
C:\Users\ali\OneDrive\Documents\PowerShell\Microsoft.PowerShell_profile.ps1
~~~

جوه OneDrive لأن OneDrive بيعمل backup لـ Documents على الجهاز ده. ومن غير OneDrive بيبقى [[C:\Users\ali\Documents\PowerShell\...]]. و Windows PowerShell 5.1 ليه ملف **تاني**:

~~~text الناتج من powershell (5.1)
C:\Users\ali\OneDrive\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1
~~~

[[PowerShell]] لـ 7 و [[WindowsPowerShell]] لـ 5.1، فاللي بتحطه في واحد مش بيظهر في التاني.

---

## ١. [[if (-not (Test-Path $PROFILE)) { New-Item $PROFILE -Force }]]

من جوه لبرة:

1. [[Test-Path $PROFILE]]: الملف موجود؟ عندي رجع [[False]].
2. [[-not]]: اقلبها، يعني «مش موجود؟».
3. [[if (...) { ... }]]: لو الشرط صح نفّذ اللي بين [[{ }]].
4. [[New-Item $PROFILE -Force]]: اعمل الملف، و [[-Force]] يعمل الفولدرات اللي في السكة لو مش موجودة (زي [[PowerShell]] جوه Documents).

أول مرة:

~~~text الناتج
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---           10/6/2026  9:44 AM              0 Microsoft.PowerShell_profile.ps1
~~~

ملف فاضي ([[Length 0]]). وتاني مرة مطبعش حاجة، لأن [[Test-Path]] رجع True فالـ if مدخلتش.

> ليه الشرط؟ [[New-Item -Force]] على ملف موجود **بيفضّيه**. فالشرط بيحمي اللي انت كاتبه قبل كده.

## ٢. [[notepad $PROFILE]]

يفتح الملف في Notepad. أو [[code $PROFILE]] في VS Code.

## ٣. [[function gst { git status }]]

ده سطر بتكتبه **جوه الملف**:

- [[function]]: بتعرّف أمر جديد.
- [[gst]]: اسمه.
- [[{ git status }]]: اللي بينفّذه.

## ٤. [[Set-Alias ll Get-ChildItem]]

اسم تاني لأمر موجود: [[ll]] = [[Get-ChildItem]]. الـ alias مينفعش ياخد parameters ثابتة معاه (يعني مينفعش [[Set-Alias gs "git status"]])، وعشان كده [[gst]] function مش alias.

قبل ما تختار اسم اتأكد إنه فاضي. جربت:

~~~text الناتج
Name Definition
---- ----------
gc   Get-Content
gl   Get-Location
gp   Get-ItemProperty
~~~

يعني [[gc]] و [[gl]] و [[gp]] متاخدين. و [[Get-Command gst]] طلع [[The term 'gst' is not recognized]]، يعني فاضي.

## ٥. [[. $PROFILE]]

النقطة وبعدها **مسافة** اسمها dot-sourcing: شغّل الملف **جوه النافذة دي**، فالـ functions اللي فيه تفضل موجودة. بعد ما كتبت السطور في ملف التجربة وعملته:

~~~text الناتج
CommandType Name Definition
----------- ---- ----------
   Function gst   git status
      Alias ll   Get-ChildItem
   Function dev   npm run dev
~~~

ولو شغّلته من غير النقطة ([[& $PROFILE]] أو المسار لوحده)، بيشتغل في نطاق لوحده ويختفي كل اللي عرّفه: جربت فـ [[gst]] مكانش موجود بعدها.

---

## الحل (solCode)

| السطر | ليه |
|---|---|
| [[Get-Command dev]] | الاسم فاضي؟ (error = أيوه) |
| [[if (-not (Test-Path $PROFILE)) { ... }]] | اعمل الملف لو مش موجود |
| [[Add-Content $PROFILE 'function dev { npm run dev }']] | زوّد السطر في آخر الملف من غير ما تفتحه. علامات التنصيص الفردية عشان مفيش حاجة جواها تتحسب |
| [[. $PROFILE]] | فعّله |
| [[Get-Command dev]] | دلوقتي المفروض يطلع [[Function dev]] |

## على الأنظمة التانية

| | PowerShell | bash | zsh (الماك) |
|---|---|---|---|
| الملف | [[$PROFILE]] | [[~/.bashrc]] | [[~/.zshrc]] |
| فعّله | [[. $PROFILE]] | [[source ~/.bashrc]] | [[source ~/.zshrc]] |

## الخلاصة

~~~text
$PROFILE         مسار الملف، وكل نسخة PowerShell ليها ملف
if Test-Path     متعملوش فوق القديم
function / alias الـ alias اسم بس، والـ function أوامر
. $PROFILE       نقطة ومسافة: فعّل في النافذة دي
~~~`,
          lines: [
            "لو ملف الـ profile مش موجود، اعمله.",
            "افتحه في Notepad (أو [[code $PROFILE]]).",
            "فانكشن تحطها جوه الملف: [[gst]] تشغّل git status.",
            "اختصار: [[ll]] بدل Get-ChildItem.",
            "طبّق الملف في الجلسة دي (النقطة والمسافة زي source)."
          ],
          sol: R`أول [[Get-Command dev]] المفروض يطلع error [[The term 'dev' is not recognized]]، ودي أخبار حلوة: الاسم فاضي. بعدين [[notepad $PROFILE]] وضيف [[function dev { npm run dev }]] واحفظ، وبعدين [[. $PROFILE]]. دلوقتي [[dev]] في فولدر مشروع بيشغّل [[npm run dev]].

[[$PROFILE]] مسار زي [[C:\Users\ali\Documents\PowerShell\Microsoft.PowerShell_profile.ps1]] في PowerShell 7 (ولو OneDrive بيعمل backup لـ Documents هيبقى جوه OneDrive). ولو [[. $PROFILE]] طلع [[running scripts is disabled on this system]] يبقى محتاج تظبط الـ ExecutionPolicy (درس ExecutionPolicy). ولو نسيت [[. $PROFILE]] الـ function مش هتشتغل إلا في نافذة جديدة.`,
          solCode: R`Get-Command dev
if (-not (Test-Path $PROFILE)) { New-Item $PROFILE -Force }
Add-Content $PROFILE 'function dev { npm run dev }'
. $PROFILE
Get-Command dev`
        },
        {
          cmd: "History والاختصارات",
          title: "ارجع لأوامر كتبتها قبل كده",
          desc: R`PowerShell بيحفظ الأوامر اللي كتبتها، وفيه اختصارات توفّر عليك كتابة كتير (من موديول اسمه PSReadLine شغال افتراضيًا). سهم فوق وتحت يلف على الأوامر القديمة، و Ctrl+R يدوّر فيها بكلمة زي bash، و Tab يكمّل اسم الأمر أو الملف أو الـ parameter ولو دوست تاني يجيب الاختيار اللي بعده، و Ctrl+Space يعرض كل الاختيارات مرة واحدة. و [[cls]] (أو Ctrl+L) يمسح الشاشة.

[[Get-History]] (اختصاره [[h]]) بيعرض أوامر الجلسة دي بأرقام، و [[Invoke-History 5]] (اختصاره [[r 5]]) بيشغّل الأمر رقم ٥ تاني. مفيش [[!!]] زي bash.

خلي بالك: Get-History بيعرض الجلسة الحالية بس، لكن PSReadLine بيحفظ كل أوامرك في ملف عشان سهم فوق و Ctrl+R يلاقوها حتى بعد ما تقفل. مكانه بيطلع بـ [[(Get-PSReadLineOption).HistorySavePath]]. ولو كتبت باسورد في أمر، هتلاقيه هناك.`,
          example: R`Get-History
Invoke-History 5`,
          try: "اضغط Ctrl+Space بعد [[Get-Child]] وشوف الاختيارات.",
          deep: {
            why: R`نص وقتك في الترمنال بتكتب أوامر كتبتها قبل كده. البحث في التاريخ والإكمال بالـ Tab بيوفروا كتابة كتير، وبيقللوا الغلط في أسامي الأوامر والـ parameters الطويلة.`,
            how: R`[[Get-History]] بيعرض أوامر الجلسة دي بأرقام. [[Invoke-History 42]] (أو [[r 42]]) بيشغّل الأمر رقم 42. و [[!!]] مش موجودة.

PSReadLine (موجود افتراضيًا في ويندوز 10 و 11 وفي PowerShell 7) هو اللي عامل الاختصارات: Ctrl+R و Ctrl+S للبحث لورا وقدام، و F8 بيدوّر على أمر قديم بيبدأ باللي انت كاتبه، و Ctrl+Space يعرض الـ completions. وفي PowerShell 7.2 وأحدث بيقترحلك أمر قديم بلون باهت وانت بتكتب، والسهم يمين يقبله.

Tab completion قوية: بتكمّل أسامي الـ parameters والقيم المسموحة ليها، مش بس الملفات.

ملف التاريخ الدائم: [[(Get-PSReadLineOption).HistorySavePath]]. تقدر تفتحه بـ [[notepad (Get-PSReadLineOption).HistorySavePath]] وتمسح منه أي سطر فيه بيانات سرية.`,
            when: "أمر طويل كتبته امبارح. التنقل في الـ history.",
            mistakes: "إنك تفتكر [[!!]] شغالة. هي مش موجودة في PowerShell، استخدم [[r]]."
          },
          teach: R`## الأول: مكانين بيتحفظ فيهم تاريخك

PowerShell بيفتكر أوامرك في مكانين: **تاريخ الجلسة** (بيروح لما تقفل النافذة) ودي اللي [[Get-History]] بيعرضها، و**ملف** PSReadLine (بيفضل) ودي اللي سهم فوق و Ctrl+R بيدوّروا فيه. المثال سطرين على النوع الأول.

---

## ١. [[Get-History]]

جربت في PowerShell 7.6: كتبت ٣ أوامر وبعدين [[Get-History]]:

~~~powershell
Get-Date -Format yyyy
"hello"
2 + 3
Get-History
~~~

~~~text الناتج
  Id     Duration CommandLine
  --     -------- -----------
   1        0.043 Get-Date -Format yyyy
   2        0.009 "hello"
   3        0.013 2 + 3
~~~

| العمود | معناه |
|---|---|
| [[Id]] | رقم الأمر في الجلسة دي |
| [[Duration]] | خد قد إيه بالثواني |
| [[CommandLine]] | الأمر زي ما كتبته |

اختصاره [[h]] (وكمان [[ghy]]).

## ٢. [[Invoke-History 5]]

بيشغّل الأمر رقم كذا تاني. في التجربة دي كان عندي ٤ أوامر، فجربت [[Invoke-History 2]]:

~~~text الناتج
"hello"
hello
~~~

أول سطر هو الأمر نفسه (بيطبعه عشان تعرف شغّل إيه)، والتاني ناتجه. وفي التاريخ اتسجّل [["hello"]] تاني مش [[Invoke-History 2]]. اختصاره [[r]]، فـ [[r 2]] نفس الحكاية. ومفيش [[!!]] زي bash.

---

## الاختصارات (PSReadLine)

| الزرار | بيعمل إيه |
|---|---|
| سهم فوق / تحت | الأمر اللي قبله / بعده |
| Ctrl+R | دوّر في التاريخ بكلمة (اكتب جزء من الأمر) |
| Tab | كمّل اسم الأمر أو الملف أو الـ parameter، وتاني Tab الاختيار اللي بعده |
| Ctrl+Space | اعرض كل الاختيارات مرة واحدة |
| Ctrl+L أو [[cls]] | امسح الشاشة ([[cls]] اختصار [[Clear-Host]]) |

### الملف الدايم

~~~powershell
(Get-PSReadLineOption).HistorySavePath
~~~

~~~text الناتج
C:\Users\ali\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt
~~~

ملف نص عادي، كل أمر في سطر، من أول ما بدأت تستخدم PowerShell. ولو كتبت باسورد في أمر، هو هناك.

---

## مقارنة بـ bash

| | PowerShell | bash |
|---|---|---|
| اعرض | [[Get-History]] / [[h]] | [[history]] |
| نفّذ رقم | [[r 5]] | [[!5]] |
| آخر أمر | سهم فوق و Enter | [[!!]] |
| دوّر | Ctrl+R | Ctrl+R |

## الخلاصة

~~~text
Get-History    الجلسة دي بس، بأرقام
r 5            نفّذ رقم 5 تاني
Ctrl+R         دوّر في كل تاريخك (الملف الدايم)
~~~`,
          lines: ["الأوامر اللي كتبتها، بأرقام.", "نفّذ الأمر رقم ٥ تاني."],
          sol: R`[[Get-Child]] وبعدين Ctrl+Space هيكمّلها على طول لـ [[Get-ChildItem]]، لأنه الأمر الوحيد اللي بيبدأ كده. عشان تشوف القايمة، جرب [[Get-Net]] وبعدين Ctrl+Space: هتظهرلك قايمة كبيرة (Get-NetAdapter و Get-NetIPAddress و Get-NetTCPConnection ...) وتتحرك فيها بالأسهم.

نفس الحكاية على الـ parameters: [[Get-ChildItem -]] وبعدين Ctrl+Space يعرض كل الـ parameters. ولو Ctrl+Space مش بيعمل حاجة جوه VS Code، غالبًا VS Code نفسه واخد الاختصار، جربها في Windows Terminal.`
        },
        {
          cmd: "ExecutionPolicy",
          title: "ليه السكربت مش راضي يشتغل",
          desc: R`الـ ExecutionPolicy إعداد في ويندوز بيقرر ملفات [[.ps1]] تتشغّل ولا لأ. في Windows PowerShell 5.1 على جهاز عادي الافتراضي [[Restricted]]: مفيش ولا سكربت يشتغل، فتلاقي رسالة «running scripts is disabled on this system» حتى مع npm (لأن npm على ويندوز ملف npm.ps1). و PowerShell 7 على ويندوز افتراضيه [[RemoteSigned]].

[[Get-ExecutionPolicy]] بيقولك الحالي. و [[Set-ExecutionPolicy -Scope CurrentUser RemoteSigned]] بيغيّره لليوزر بتاعك بس ([[-Scope CurrentUser]])، فمش محتاج أدمن ومش بيأثر على باقي اليوزرز. و [[RemoteSigned]] معناها: السكربتات اللي اتعملت على جهازك تشتغل، واللي نزلت من النت لازم تبقى موقّعة أو تعملها [[Unblock-File]].

متختارش [[Unrestricted]] أو [[Bypass]] للجهاز كله: RemoteSigned كفاية. ولو محتاج تعدّي الـ policy لتشغيلة واحدة بس: [[pwsh -ExecutionPolicy Bypass -File script.ps1]]. والخطوات كاملة لأول سكربت في درس «أول سكربت .ps1» في المستوى التالت.`,
          example: R`Get-ExecutionPolicy
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`,
          try: "اعرف الـ policy الحالية عندك قبل ما تغيّر حاجة.",
          deep: {
            why: "ويندوز بيمنع تشغيل سكربتات PowerShell افتراضيًا. دي الخطوة اللي بتشغّلها مرة واحدة.",
            how: R`[[Get-ExecutionPolicy]] بيعرض الحالي. الافتراضي [[Restricted]] (ممنوع تشغيل سكربتات). [[RemoteSigned]] (الأنصح): السكربتات المحلية بتشتغل، اللي جايين من النت محتاجين توقيع. [[Unrestricted]]: كل حاجة بتشتغل (مش آمن).

[[-Scope CurrentUser]] بيغيّر للـ user بس من غير Admin. [[-Scope LocalMachine]] كل الـ Users ومحتاج Admin.

طريقة تانية تجاوز في حالات خاصة: [[powershell.exe -ExecutionPolicy Bypass -File script.ps1]].`,
            when: "أول مرة بتشتغل على جهاز ويندوز جديد وعايز تشغّل سكربتات.",
            mistakes: "تضبط Unrestricted عشان «يشتغل». RemoteSigned أأمن وكافي."
          },
          teach: R`## الأول: إعداد واحد بيقرر الـ .ps1 تشتغل ولا لأ

الـ ExecutionPolicy مش صلاحيات ولا antivirus. ده إعداد بيقول لـ PowerShell «تشغّل ملفات [[.ps1]] ولا لأ، وبأنهي شرط». المثال سطرين: اعرف القيمة، وغيّرها لليوزر بتاعك.

---

## ١. [[Get-ExecutionPolicy]]

جربته في نافذة عادية على ويندوز 11:

~~~text الناتج (PowerShell 7.6)
RemoteSigned
~~~

وده القيمة **الفعّالة**. بس فيه ٥ أماكن ممكن تتحط فيها، و [[-List]] بيعرضهم:

~~~powershell
Get-ExecutionPolicy -List
~~~

~~~text الناتج (PowerShell 7.6)
        Scope ExecutionPolicy
        ----- ---------------
MachinePolicy       Undefined
   UserPolicy       Undefined
      Process       Undefined
  CurrentUser       Undefined
 LocalMachine    RemoteSigned
~~~

| الـ Scope | مين حاطه |
|---|---|
| [[MachinePolicy]] / [[UserPolicy]] | Group Policy (الشركة). لو فيهم قيمة بتكسب على الكل |
| [[Process]] | النافذة دي بس |
| [[CurrentUser]] | انت بس |
| [[LocalMachine]] | كل اليوزرز على الجهاز |

ويندوز بيقرا من فوق لتحت، **وأول واحد مش Undefined بيكسب**. هنا [[LocalMachine]] هو اللي حدد [[RemoteSigned]].

وفي Windows PowerShell 5.1 على نفس الجهاز:

~~~text الناتج (powershell 5.1)
        Scope ExecutionPolicy
        ----- ---------------
MachinePolicy       Undefined
   UserPolicy       Undefined
      Process       Undefined
  CurrentUser    RemoteSigned
 LocalMachine       Undefined
~~~

مختلف! لأن 5.1 و 7 كل واحد ليه إعداداته. هنا 5.1 كان حد عامله [[CurrentUser RemoteSigned]] قبل كده، ولو مكانش، كان الكل Undefined والافتراضي في ويندوز 10/11 لـ 5.1 هو [[Restricted]].

### شكل المنع

جربت أشغّل سكربت صغير بـ policy [[Restricted]] للتشغيلة دي بس:

~~~powershell
pwsh -NoProfile -ExecutionPolicy Restricted -File .\hello.ps1
~~~

~~~text الناتج
File C:\...\hello.ps1 cannot be loaded because running scripts is disabled on this system. For more information, see about_Execution_Policies at https://go.microsoft.com/fwlink/?LinkID=135170.
~~~

ونفس السكربت من غير [[Restricted]] طبع [[hello from script]]. و npm على ويندوز ملف [[npm.ps1]] ([[Get-Command npm]] طلع [[C:\Program Files\nodejs\npm.ps1]])، فـ [[Restricted]] بيوقف npm كمان.

---

## ٢. [[Set-ExecutionPolicy -Scope CurrentUser RemoteSigned]]

| الحتة | معناها |
|---|---|
| [[Set-ExecutionPolicy]] | غيّر |
| [[-Scope CurrentUser]] | ليك انت بس، فمش محتاج أدمن |
| [[RemoteSigned]] | القيمة الجديدة |

بـ [[-WhatIf]]:

~~~text الناتج
What if: Performing the operation "Set-ExecutionPolicy" on target "RemoteSigned".
~~~

### القيم

| القيمة | بتسمح بإيه |
|---|---|
| [[Restricted]] | ولا سكربت |
| [[RemoteSigned]] | سكربتاتك تشتغل، واللي نزل من النت لازم يبقى موقّع أو تعمله [[Unblock-File]] |
| [[AllSigned]] | الموقّع بس، حتى بتاعك |
| [[Unrestricted]] | كله، مع تحذير للي نازل من النت |
| [[Bypass]] | كله من غير أي سؤال |

ويندوز بيعرف إن الملف «نازل من النت» من علامة بيحطها المتصفح على الملف وانت بتنزّله، و [[Unblock-File]] بيشيلها.

---

## على لينكس والماك

الـ ExecutionPolicy ميزة ويندوز بس. على لينكس والماك [[Get-ExecutionPolicy]] بيرجع [[Unrestricted]] ومبيتغيرش، والتحكم هناك بصلاحية التنفيذ على الملف ([[chmod +x]]).

## الخلاصة

~~~text
Get-ExecutionPolicy -List    مين حاطط إيه، وأول واحد مش Undefined بيكسب
5.1 و 7                      كل واحد ليه إعداده
RemoteSigned + CurrentUser   كفاية، ومن غير أدمن
~~~`,
          lines: [
            "السياسة الحالية (غالبًا Restricted على ويندوز).",
            "اسمح بالسكربتات المحلية لليوزر ده، من غير ما تحتاج مدير."
          ],
          sol: R`[[Get-ExecutionPolicy]] في Windows PowerShell 5.1 على جهاز عادي غالبًا هيرجع [[Restricted]]، وفي PowerShell 7 على ويندوز [[RemoteSigned]]. و [[Get-ExecutionPolicy -List]] بيوريك كل scope لوحده (MachinePolicy و UserPolicy و Process و CurrentUser و LocalMachine) واللي مش متظبط بيبان [[Undefined]].

لو MachinePolicy أو UserPolicy عليهم قيمة، ده Group Policy من الشركة، و [[Set-ExecutionPolicy]] مش هيغيّر حاجة. وعلى لينكس والماك هتلاقيها [[Unrestricted]] (جربتها وكل الـ scopes طلعت كده) ومبتتغيرش، لأن الـ ExecutionPolicy ميزة ويندوز بس.`
        }
      ]
    }
]);
