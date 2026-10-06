// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   teach    اختياري: «الشرح خطوة بخطوة»: markdown صغير (## و ### و ~~~lang عنوان ... ~~~ و جداول | و - و 1. و > و ---). القواعد في README
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
//   check    اختياري: تمرين بيتصحح لوحده في الصفحة
//            JS:  { lang: "js", starter, tests: R`test("..", () => expect(x).toBe(y))`, solution }
//            SQL: { lang: "sql", setup: R`CREATE TABLE ...; INSERT ...`, starter, expect: [[...صفوف]] أو expectSql: R`استعلام مرجعي`, solution, ordered }
//            solution حل مرجعي مش بيظهر، و npm run check بيتأكد إنه بيعدّي الاختبارات. المتاح في tests: test و expect(x).toBe/toEqual/toThrow/toBeTruthy/toBeFalsy
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("ps", {
  label: "PowerShell",
  prompt: R`PS C:\lab> `,
  lab: R`New-Item -ItemType Directory $HOME\lab -Force
Set-Location $HOME\lab`,
  categories: [
    {
      t: "الأساسيات والمساعدة",
      l: 1,
      n: "افهم منطق PowerShell وانت هتعرف تخمّن أي أمر",
      items: [
        {
          cmd: "pwsh",
          title: "ثبّت PowerShell 7 الأول",
          desc: R`ويندوز جاي فيه نسختين باسم PowerShell. Windows PowerShell 5.1 (الأيقونة الزرقا، وأمرها [[powershell]]) موجودة دايمًا بس اتوقف تطويرها. و PowerShell 7 (أمرها [[pwsh]]) الجديدة: أسرع، وبتكتب الملفات UTF-8 من غير مشاكل الترميز، وفيها أوامر وإضافات كتير مش في 5.1، وبتشتغل على لينكس والماك كمان. كل دروس التاب ده شغالة على 7، واللي بيختلف في 5.1 مكتوب جنبه.

[[winget]] مدير البرامج بتاع ويندوز (زي apt في لينكس)، و [[--id Microsoft.PowerShell]] اسم الباكدج، و [[-e]] يعني الاسم بالظبط ده مش أي حاجة شبهه. بعد التسطيب افتح نافذة جديدة واكتب [[pwsh]]. و [[$PSVersionTable]] متغير جاهز فيه معلومات النسخة، و [[.PSVersion]] بيطلع رقمها، والمفروض 7 أو أكتر.

وبعدها خليه الافتراضي: في Windows Terminal من Settings، Default profile، و في VS Code من إعداد الترمنال الافتراضي. ومتمسحش 5.1، ويندوز وبرامج كتير محتاجينها.`,
          example: R`winget install --id Microsoft.PowerShell -e
pwsh
$PSVersionTable.PSVersion`,
          try: "سطّبه واتأكد إن النسخة 7 أو أكتر.",
          deep: {
            why: "PowerShell مش مجرد terminal بديل لـ CMD. هو بيئة برمجة كاملة على ويندوز، وبيشتغل كمان على الماك ولينكس. لما بتشتغل على ويندوز، ده اللي هتستخدمه للأتمتة وإدارة السيرفرات.",
            how: R`ويندوز 10 فيه اتنين: Windows PowerShell 5.1 (القديمة المبنية على .NET Framework، موجودة دايمًا) وPowerShell 7+ (الجديدة متعددة المنصات، محتاج تسطّبها). الجديدة (pwsh.exe) أسرع وعندها features أكتر، وهي اللي ينصح بيها.

في VS Code ممكن تختار أي terminal تشتغل فيه. في ويندوز Terminal برضه.

الفرق الكبير عن bash: PowerShell بيعامل كل شغل بـ Objects مش نص. يعني لما تعمل [[Get-Process]]، مش بيطبع نص، بيرجع قايمة objects كل واحد فيه properties زي Name وId وCPU. ودي الفكرة اللي كل حاجة بعدها مبنية عليها.`,
            when: "على أي ويندوز. ولما بتكتب سكربتات هتشتغل على ويندوز سيرفرات.",
            mistakes: "تفتح CMD وتتساءل ليه PowerShell commands مش شغالة. CMD وPowerShell مختلفين تمامًا."
          },
          teach: R`## الأول: إحنا بنعمل ٣ حاجات

المثال ٣ سطور: نسطّب PowerShell 7، نفتحه، ونسأله «انت نسخة كام؟». كل سطر منهم هنفكّه لوحده.

---

## ١. التسطيب: [[winget install --id Microsoft.PowerShell -e]]

~~~powershell
winget install --id Microsoft.PowerShell -e
~~~

| الحتة | معناها |
|---|---|
| [[winget]] | مدير البرامج اللي جاي مع ويندوز ١٠ و ١١ (Windows Package Manager). بينزّل البرنامج ويسطّبه من غير ما تفتح موقع |
| [[install]] | الأمر الفرعي: «سطّب». فيه غيره زي [[list]] و [[upgrade]] و [[uninstall]] |
| [[--id]] | «اللي جاي بعدي ده الـ ID بتاع الباكدج»، مش اسم تقريبي |
| [[Microsoft.PowerShell]] | الـ ID نفسه: اسم الشركة نقطة اسم البرنامج |
| [[-e]] | اختصار [[--exact]]: الـ ID ده بالظبط. من غيره ممكن يلاقي كذا باكدج اسمها شبهه (زي نسخة Preview) ويسألك تختار |

الجهاز هنا عليه PowerShell 7 متسطب أصلًا، فبدل ما أسطّب تاني سألت winget عنه بـ [[list]] (نفس الـ [[--id]] و [[-e]]):

~~~powershell
winget list --id Microsoft.PowerShell -e
~~~

~~~text الناتج (PowerShell 7.6 على ويندوز ١١)
Name       Id                   Version Source
-----------------------------------------------
PowerShell Microsoft.PowerShell 7.6.6.0 winget
~~~

و [[Source]] بـ [[winget]] معناها إنه متسطب من المصدر الرسمي بتاع winget.

> بعد التسطيب **افتح نافذة ترمنال جديدة**. النافذة المفتوحة قبل التسطيب لسه شايفة الـ PATH القديم، فـ [[pwsh]] فيها هيقولك «is not recognized».

---

## ٢. التشغيل: [[pwsh]]

[[pwsh]] اسم البرنامج بتاع PowerShell 7 (اختصار PowerShell). لما تكتبه بيفتح PowerShell 7 **جوه** النافذة اللي انت فيها، والـ prompt بيفضل شكله [[PS C:\...>]]. عشان تخرج منه وترجع للي كنت فيه: [[exit]].

النسختين ليهم اسمين مختلفين، وده اللي بيفرّق بينهم:

| | Windows PowerShell 5.1 | PowerShell 7 |
|---|---|---|
| الأمر | [[powershell]] | [[pwsh]] |
| مكانه هنا | [[C:\WINDOWS\System32\WindowsPowerShell\v1.0\powershell.exe]] | جوه [[C:\Program Files\WindowsApps\...]] (لأنه متسطب كـ app) |
| مبني على | .NET Framework (قديم) | .NET الحديث |
| تطويره | واقف، تصليحات أمان بس | شغال، نسخ جديدة باستمرار |
| لينكس والماك | لأ | أيوه |

المسارين دول طلعوا من [[(Get-Command pwsh).Source]] و [[(Get-Command powershell).Source]] على الجهاز ده. لو سطبته بملف MSI من GitHub هتلاقيه في [[C:\Program Files\PowerShell\7\]] بدل كده.

---

## ٣. اتأكد من النسخة: [[$PSVersionTable.PSVersion]]

~~~powershell
$PSVersionTable.PSVersion
~~~

نفكه:

- [[$]] في أول أي اسم في PowerShell معناها «ده متغير».
- [[PSVersionTable]] متغير جاهز PowerShell بيملاه لوحده لما يفتح، فيه معلومات عن نفسه (النسخة، ونظام التشغيل، والـ edition).
- [[.]] النقطة معناها «هات من جوّاه الخانة اللي اسمها...».
- [[PSVersion]] الخانة اللي فيها رقم النسخة.

~~~text الناتج في pwsh (7.6)
Major  Minor  Patch  PreReleaseLabel BuildLabel
-----  -----  -----  --------------- ----------
7      6      6
~~~

~~~text نفس السطر في powershell (5.1)
Major  Minor  Build  Revision
-----  -----  -----  --------
5      1      26100  9549
~~~

### نقرا الأرقام

الرقم مكتوب بالشكل [[Major.Minor.Patch]]، يعني 7.6.6:

| العمود | معناه |
|---|---|
| [[Major]] | النسخة الكبيرة. ده اللي يهمك: لازم 7 |
| [[Minor]] | تحديث فيه حاجات جديدة |
| [[Patch]] | تصليحات أخطاء بس |

ولو لقيت [[Major]] بـ 5 وعمود اسمه [[Build]] بدل [[Patch]]، يبقى انت لسه في 5.1. شكل الجدول نفسه بيقولك انت فين.

---

## الخلاصة

| الخطوة | الأمر | بيعمل إيه |
|---|---|---|
| ١ | [[winget install --id Microsoft.PowerShell -e]] | سطّب PowerShell 7 |
| ٢ | [[pwsh]] | افتحه (في نافذة جديدة بعد التسطيب) |
| ٣ | [[$PSVersionTable.PSVersion]] | اتأكد إن [[Major]] بـ 7 |

- [[powershell]] = 5.1 القديم، و [[pwsh]] = 7 الجديد. الاتنين بيفضلوا موجودين جنب بعض.
- لينكس والماك: PowerShell 7 بيتسطب من مدير الحزم بتاع النظام والأمر برضه [[pwsh]] (من دليل Microsoft، مش متجرب هنا).`,
          lines: [
            "سطّب PowerShell 7 بـ winget (مدير باكدجات ويندوز). [[-e]] يعني الاسم بالظبط.",
            "شغّل النسخة الجديدة (الأمر بتاع 5.1 القديمة اسمه powershell).",
            "اطبع رقم النسخة. المفروض 7 أو أعلى."
          ],
          sol: R`[[winget]] هيقولك في الآخر [[Successfully installed]]. افتح نافذة terminal جديدة (القديمة مش شايفة الـ PATH الجديد) واكتب [[pwsh]]، وبعدين [[$PSVersionTable.PSVersion]]. المفروض تشوف جدول فيه [[Major]] بـ 7 و [[Minor]] بـ 5 أو أكتر (أنا شغّلته على 7.5.3 فطلع [[7  5  3]] تحت [[Major  Minor  Patch]]).

لو الجدول طلع فيه [[Major 5]] و [[Minor 1]] وعمود اسمه [[Build]] بدل [[Patch]]، يبقى انت لسه في Windows PowerShell 5.1 القديم (الأيقونة الزرقا أو أمر [[powershell]]). ولو [[pwsh]] قالك «is not recognized»، اقفل كل نوافذ الترمنال وافتح واحدة جديدة، أو اعمل Restart لـ VS Code لو بتشتغل من جواه.`
        },
        {
          cmd: "Verb-Noun",
          title: "اسم الأمر فعل-اسم",
          desc: R`كل أوامر PowerShell الأصلية (اسمها cmdlets) اسمها جزئين بينهم شرطة: فعل وبعده اسم. [[Get-Process]] هات العمليات، و [[Stop-Process]] وقّفها، و [[New-Item]] اعمل حاجة جديدة، و [[Remove-Item]] امسحها. فلو عرفت الفعل والحاجة، تقدر تخمّن اسم الأمر غالبًا صح. والأسامي مش بتفرّق بين الكابيتال والسمول: [[get-process]] نفس [[Get-Process]].

ولأن الأسامي طويلة، فيه aliases (اختصارات): [[ls]] و [[dir]] بيشاوروا على Get-ChildItem، و [[cat]] و [[type]] على Get-Content، و [[cd]] على Set-Location. فأوامر bash و CMD اللي متعود عليها شغالة، بس الـ parameters بتاعتها بتاعة PowerShell: [[ls -la]] مثلًا مش هتشتغل.

[[Get-Alias ls]] بيقولك الاختصار ده بيشاور على أنهي أمر. و [[-Definition Get-ChildItem]] العكس: كل الاختصارات اللي بتشاور على الأمر ده. في السكربتات اكتب الأسامي الكاملة عشان اللي يقرا بعدك يفهم.`,
          example: R`Get-Alias ls
Get-Alias -Definition Get-ChildItem`,
          try: "اعرف كل aliases بتاعة Get-Content.",
          deep: {
            why: "PowerShell بيستخدم نظام تسمية ثابت: فعل-اسم. [[Get-Process]] تجيب، و[[Stop-Process]] توقّف، و[[New-Item]] تعمل. لما تعرف الفعل، تقدر تخمّن الأمر بشكل معقول.",
            how: R`الأفعال الأشهر: [[Get]] يجيب/يعرض. [[Set]] يغيّر. [[New]] يعمل جديد. [[Remove]] يمسح. [[Start]] يشغّل. [[Stop]] يوقّف. [[Invoke]] ينفّذ. [[Test]] يختبر.

والأسامي: [[Item]] ملف أو فولدر. [[Content]] محتوى ملف. [[Process]] عملية. [[Service]] خدمة. [[Location]] المكان الحالي. [[Command]] أمر. [[Help]] مساعدة.

فـ [[Set-Location]] تغيير فولدر (زي cd). [[Get-ChildItem]] يعرض المحتوى (زي ls). [[Remove-Item]] يمسح (زي rm).

Aliases موجودة لكل ده: [[cd]] = Set-Location، [[ls]] = Get-ChildItem، [[rm]] = Remove-Item. فتقدر تكتب الاتنين.`,
            when: "لما مش فاكر الأمر بالظبط: فكّر في الفعل والاسم. وبعدين Get-Command لتأكيد.",
            mistakes: "تكتب aliases في سكربتات. الأحسن الاسم الكامل في السكربتات عشان واضح ومش هيتغير."
          },
          teach: R`## الفكرة: الاسم نفسه بيشرح الأمر

كل cmdlet (الأوامر الأصلية في PowerShell، بتتنطق «كوماندلت») اسمه حتتين بينهم شرطة: **فعل** وبعده **اسم**.

~~~text شكل الاسم
Get     -  Process
فعل        الحاجة اللي بنتعامل معاها
"هات"      "العمليات"
~~~

فلو حفظت شوية أفعال وشوية أسامي، تقدر تركّب الأمر من دماغك:

| الفعل | معناه | | الاسم | معناه |
|---|---|---|---|---|
| [[Get]] | هات / اعرض | | [[Item]] | ملف أو فولدر |
| [[Set]] | غيّر | | [[Content]] | محتوى ملف |
| [[New]] | اعمل جديد | | [[Process]] | برنامج شغال |
| [[Remove]] | امسح | | [[Location]] | الفولدر اللي انت فيه |
| [[Start]] / [[Stop]] | شغّل / وقّف | | [[Service]] | خدمة ويندوز |

يعني «امسح ملف» = [[Remove-Item]]، و «وقّف خدمة» = [[Stop-Service]].

والكابيتال مش فارق: جربت [[get-process -Id $PID]] بحروف صغيرة واشتغل عادي وطلع [[pwsh]] ([[$PID]] متغير جاهز فيه رقم عملية PowerShell نفسه).

---

## ١. [[Get-Alias ls]]: الاختصار ده بيشاور على إيه؟

alias يعني «اسم تاني» لنفس الأمر. PowerShell جاي بأسامي قصيرة عشان اللي جاي من bash أو CMD يلاقي أوامره.

~~~powershell
Get-Alias ls
~~~

~~~text الناتج (PowerShell 7.6)
CommandType     Name                                               Version    Source
-----------     ----                                               -------    ------
Alias           ls -> Get-ChildItem
~~~

- [[CommandType]] بـ [[Alias]]: ده مش أمر حقيقي، ده اسم تاني.
- [[ls -> Get-ChildItem]]: السهم معناه «لما تكتب ls، اللي بيشتغل فعلًا Get-ChildItem».

---

## ٢. [[Get-Alias -Definition Get-ChildItem]]: العكس

~~~powershell
Get-Alias -Definition Get-ChildItem
~~~

[[-Definition]] اسمه parameter: كلمة بشرطة قبلها بتقول للأمر «القيمة اللي بعدي دي معناها كذا». هنا معناها «دوّر على الـ aliases اللي **تعريفها** Get-ChildItem».

~~~text الناتج (نفس الشكل في 7.6 و 5.1)
CommandType     Name                                               Version    Source
-----------     ----                                               -------    ------
Alias           dir -> Get-ChildItem
Alias           gci -> Get-ChildItem
Alias           ls -> Get-ChildItem
~~~

٣ أسامي لنفس الأمر: [[dir]] من CMD، و [[ls]] من لينكس، و [[gci]] من أول حروف **G**et-**C**hild**I**tem.

> من غير [[-Definition]]، [[Get-Alias Get-ChildItem]] بيدوّر على alias **اسمه** Get-ChildItem، ومفيش، فبيطلع: [[This command cannot find a matching alias because an alias with the name 'Get-ChildItem' does not exist.]] (جربتها بـ Get-Content وطلعت نفس الجملة).

---

## ليه الـ alias مش بيخلي [[ls -la]] تشتغل؟

الـ alias بيغيّر **الاسم** بس. الـ parameters بتفضل بتاعة Get-ChildItem، و [[-la]] مش واحد منهم. المقابل في PowerShell: [[ls -Force]].

---

## الخلاصة

- اسم أي cmdlet = فعل-اسم، والكابيتال مش مهم.
- [[Get-Alias اسم]]: الاختصار ده بيشاور على إيه. [[Get-Alias -Definition أمر]]: الأمر ده ليه اختصارات إيه.
- الاختصار للترمنال، والاسم الكامل للسكربت. وعلى لينكس والماك PowerShell بيشيل aliases زي [[ls]] و [[cat]] عشان ميغطّوش على أوامر النظام الحقيقية (مكتوب في الـ sol).`,
          lines: [
            "[[ls]] اختصار لإيه؟ هيقولك Get-ChildItem.",
            "العكس: إيه الاختصارات اللي بتشاور على Get-ChildItem؟"
          ],
          sol: R`[[Get-Alias -Definition Get-Content]] على ويندوز بيطلع 3 سطور: [[cat -> Get-Content]] و [[gc -> Get-Content]] و [[type -> Get-Content]] (جربتها في PowerShell 7.6 و 5.1 ونفس الناتج). [[type]] جاية من أيام CMD، و [[cat]] عشان اللي جاي من لينكس، و [[gc]] الاختصار الرسمي من أول حروف الفعل والاسم.

جربتها على PowerShell 7 على لينكس فطلع [[gc]] و [[type]] بس، لأن على لينكس والماك PowerShell بيشيل الـ aliases اللي ليها نفس اسم أمر حقيقي في النظام زي [[cat]] و [[ls]]. عشان كده في سكربت هيشتغل على أكتر من نظام اكتب الاسم الكامل [[Get-Content]]. ولو كتبت [[Get-Alias Get-Content]] من غير [[-Definition]] هيطلعلك error، لأنه بيدوّر على alias اسمه Get-Content مش على aliases بتشاور عليه.`
        },
        {
          cmd: "Get-Help",
          title: "اقرا الشرح والأمثلة",
          desc: R`[[Get-Help]] هو الـ [[man]] بتاع PowerShell: بتديله اسم أي أمر فيطبعلك بيعمل إيه والـ parameters بتاعته وشكل كتابته. أهم إضافة ليه [[-Examples]]: بتعرض أمثلة جاهزة مترقمة، كل مثال الأمر وتحته شرحه، من غير باقي الكلام الطويل، ودي أسرع طريقة تتعلم بيها أمر جديد. و [[-Online]] بتفتح صفحة الأمر على موقع Microsoft Learn في المتصفح، ودي دايمًا أحدث وأشمل نسخة.

فيه كمان [[-Full]] للشرح كامل، و [[-Parameter Recurse]] لشرح parameter واحد بس. واختصارات سريعة: [[help Copy-Item]] (بيعرض صفحة صفحة) أو [[Copy-Item -?]].

أول مرة غالبًا هتلاقي الاسم والـ aliases بس، وتحتهم تحت [[REMARKS]] جملة «It is displaying only partial help» (في 7.6 و 5.1)، لأن ملفات المساعدة الكاملة مش بتيجي مع ويندوز. شغّل [[Update-Help]] مرة واحدة (في PowerShell 7 مش محتاج أدمن، في 5.1 محتاج PowerShell كأدمن). ولو مستعجل، [[-Online]] شغالة من غير أي تحميل.`,
          example: R`Get-Help Copy-Item -Examples
Get-Help Get-ChildItem -Online`,
          try: "اقرا أمثلة [[Remove-Item]] قبل ما تستخدمه.",
          deep: {
            why: "أي أمر محتاج تعرف parameters بتاعه أو مثال عليه. Get-Help هو man في PowerShell.",
            how: R`[[Get-Help Get-ChildItem]] بيعرض المساعدة. [[-Examples]] بيوريك أمثلة فقط. [[-Online]] بيفتح الصفحة الرسمية في المتصفح، وده دايمًا الأشمل.

على جهاز جديد ملفات المساعدة مش متحمّلة، فـ [[-Examples]] مش هيطلع أي أمثلة لحد ما تشغّل [[Update-Help]] مرة. في PowerShell 7 بيحمّلها لليوزر الحالي ومش محتاج أدمن، وفي 5.1 محتاج PowerShell كأدمن.

واختصار سريع: اسم الأمر وبعده [[-?]] (شرطة وعلامة استفهام)، زي [[Copy-Item -?]]، بيعرض نفس المساعدة المختصرة.`,
            when: "مش فاكر الـ parameter الصح. أو عايز مثال على استخدام معين.",
            mistakes: "إنك تدوّر في جوجل وتنسى إن المساعدة موجودة جوه PowerShell نفسه."
          },
          teach: R`## الفكرة

[[Get-Help]] بيطبع دليل استخدام أي أمر جوه الترمنال. هنفك السطرين، ونشوف الناتج الحقيقي على جهاز لسه متحمّلش عليه ملفات المساعدة.

---

## ١. [[Get-Help Copy-Item -Examples]]

| الحتة | معناها |
|---|---|
| [[Get-Help]] | الأمر: «هات المساعدة» |
| [[Copy-Item]] | الأمر اللي عايز تعرف عنه |
| [[-Examples]] | parameter: «الأمثلة بس»، من غير باقي الصفحة الطويلة |

~~~powershell
Get-Help Copy-Item -Examples
~~~

~~~text الناتج على PowerShell 7.6 من غير Update-Help
NAME
    Copy-Item

ALIASES
    cpi
    cp
    copy

REMARKS
    Get-Help cannot find the Help files for this cmdlet on this computer. It is displaying only partial help.
        -- To download and install Help files for the module that includes this cmdlet, use Update-Help.
        -- To view the Help topic for this cmdlet online, type: "Get-Help Copy-Item -Online" or
           go to https://go.microsoft.com/fwlink/?LinkID=2096990.
~~~

### نقرا الناتج

- [[NAME]]: اسم الأمر.
- [[ALIASES]]: اختصاراته ([[cpi]] و [[cp]] و [[copy]]).
- [[REMARKS]]: هنا المشكلة. الجملة بتقول «ملفات المساعدة مش موجودة على الجهاز ده، فأنا بعرض جزء بس». يعني **مفيش أمثلة لسه**.

والجملة نفسها بتديك الحلّين:

1. [[Update-Help]]: ينزّل ملفات المساعدة مرة واحدة. في PowerShell 7 بينزّلها لليوزر بتاعك ومش محتاج أدمن، وفي 5.1 محتاج تفتح PowerShell كأدمن. (متشغّلش هنا لأنه بيعدّل ملفات على الجهاز؛ الكلام ده من دليل Microsoft.)
2. [[-Online]]: السطر التاني في المثال.

بعد [[Update-Help]]، [[-Examples]] بيطلع أمثلة مترقمة بالشكل ده (من صفحة Copy-Item على Microsoft Learn): عنوان زي [[Example 1: Copy a file to the specified directory]]، وتحته الأمر، وتحته شرحه.

---

## ٢. [[Get-Help Get-ChildItem -Online]]

[[-Online]] مش بيطبع حاجة في الترمنال: بيفتح المتصفح على صفحة الأمر في Microsoft Learn، ودي أحدث نسخة وفيها كل الأمثلة. شغال من غير أي تحميل. (مفتحتش متصفح هنا، ده من الـ docs.)

---

## الاختصار [[-?]]: شكل الكتابة على طول

~~~powershell
Copy-Item -?
~~~

~~~text أول الناتج (PowerShell 7.6)
NAME
    Copy-Item

SYNTAX
    Copy-Item [-Path] <string[]> [[-Destination] <string>] [-Container] [-Force] [-Filter <string>] [-Include <string[]>]
    [-Exclude <string[]>] [-Recurse] [-PassThru] [-Credential <pscredential>] [-WhatIf] [-Confirm] ...
~~~

حتى من غير ملفات المساعدة، [[SYNTAX]] بيظهر لأنه بيتحسب من الأمر نفسه. ودي طريقة قرايته:

| الشكل | معناه |
|---|---|
| [[-Force]] | parameter من غير قيمة (switch): يا تكتبه يا لأ |
| [[-Filter <string>]] | parameter محتاج قيمة، ونوعها نص |
| [[<string[]>]] | الأقواس [[[]]] بعد النوع: ينفع أكتر من قيمة بفاصلة |
| [[[-Path]]] | الاسم نفسه بين [[[ ]]] يعني اختياري تكتبه: [[Copy-Item a.txt]] زي [[Copy-Item -Path a.txt]] |
| [[[ ]]] حوالين الاسم والقيمة مع بعض | الـ parameter كله اختياري، زي Destination هنا |

---

## الخلاصة

| عايز | اكتب |
|---|---|
| أمثلة | [[Get-Help أمر -Examples]] |
| كل حاجة | [[Get-Help أمر -Full]] |
| parameter واحد | [[Get-Help أمر -Parameter Recurse]] |
| الصفحة الرسمية | [[Get-Help أمر -Online]] |
| شكل الكتابة بسرعة | [[أمر -?]] |

لو شفت «displaying only partial help»، يبقى محتاج [[Update-Help]] مرة، أو استخدم [[-Online]].`,
          lines: [
            "أمثلة استخدام Copy-Item بس، من غير باقي الشرح.",
            "افتح الصفحة الرسمية في المتصفح، ودي دايمًا أحدث وأشمل."
          ],
          sol: R`على جهاز جديد (جربته على PowerShell 7.6 من غير ما أشغّل [[Update-Help]]) [[Get-Help Remove-Item -Examples]] مش بيطلع أي أمثلة. بيطلع الاسم والـ aliases بس ([[ri]] و [[rm]] و [[rmdir]] و [[del]] و [[erase]] و [[rd]])، وتحت [[REMARKS]] الجملة دي: [[Get-Help cannot find the Help files for this cmdlet on this computer. It is displaying only partial help.]]

يبقى الـ help مش متحمّل. عندك حلّين:
1. شغّل [[Update-Help]] مرة واحدة (في PowerShell 7 بيتحمّل لليوزر الحالي ومش محتاج أدمن، وفي 5.1 محتاج PowerShell كأدمن)، وبعدها [[-Examples]] هيطلع أمثلة مترقمة زي [[Example 1: Delete files that have any file name extension]]، وتحت كل مثال الأمر وشرحه، ومنها أمثلة فيها [[-Include]] و [[-Exclude]] و [[-Recurse]] و [[-Force]].
2. أو [[Get-Help Remove-Item -Online]] بيفتحلك نفس الأمثلة على Microsoft Learn من غير تحميل.

ولاحظ إن أي أمثلة مسح تقدر تجربها الأول بـ [[-WhatIf]]: بيقولك هيمسح إيه من غير ما يمسح.`
        },
        {
          cmd: "Get-Command",
          title: "دوّر على أمر",
          desc: R`لما تبقى عارف انت عايز تعمل إيه بس مش فاكر اسم الأمر، [[Get-Command]] بيدوّر في كل حاجة ممكن تتشغّل: cmdlets و functions و aliases والبرامج اللي في الـ PATH. النجمة [[*]] اسمها wildcard ومعناها «أي حروف بأي عدد»، فـ [[*process*]] يعني أي أمر اسمه فيه كلمة process في أي حتة.

وبما إن كل الأوامر بنظام Verb-Noun (الدرس اللي فات)، تقدر تدوّر بالجزئين: [[-Verb Get]] الأوامر اللي فعلها Get بس، و [[-Noun *Item*]] اللي الجزء التاني من اسمها فيه Item. فالسطر التاني بيجيب حاجات زي Get-Item و Get-ChildItem و Get-ItemProperty.

أقرب حاجة في bash هي [[compgen -c]] أو [[apropos]]. ونفس الأمر بيقولك برنامج زي node جاي منين على الجهاز (درس «البرنامج ده فين» في المستوى التاني). بس متشغّلهوش لوحده من غير أي كلمة، هيطبعلك آلاف الأوامر.`,
          example: R`Get-Command *process*
Get-Command -Verb Get -Noun *Item*`,
          try: "لاقي كل الأوامر اللي ليها علاقة بـ service.",
          deep: {
            why: R`بتدوّر على أوامر من غير ما تعرف اسمها بالظبط. زي [[which]] و [[apropos]] في لينكس مع بعض، بس بيفهم نظام Verb-Noun فبيخليك تخمّن صح.`,
            how: R`[[Get-Command]] بدون حاجة يعرض كل الأوامر (كتير). والأحسن مع [[*نص*]] بيدوّر. [[Get-Command Get-*]] يعرض كل الأوامر اللي بتبدأ بـ Get. [[Get-Command -Verb Get]] يعرض كل أوامر الجلب. [[-CommandType Function]] يعرض الـ functions بس.

ولما بتسأل «فين البرنامج ده؟»: [[Get-Command node]] بيقولك المسار الكامل.`,
            when: "مش فاكر الاسم الكامل. أو عايز تعرف كل الأوامر اللي بتتعامل مع خدمة معينة.",
            mistakes: "تكتب [[Get-Command]] بدون parameters وتغرق في آلاف الأوامر."
          },
          teach: R`## الفكرة

[[Get-Command]] بيدوّر على **أسامي أوامر**، مش جوه ملفات. بتديله جزء من الاسم، وهو يرجعلك كل حاجة تتشغّل اسمها بيطابق.

---

## ١. [[Get-Command *process*]]

النجمة [[*]] اسمها wildcard، ومعناها «أي حروف، بأي عدد، حتى صفر». فـ [[*process*]] يعني: أي حاجة قبل، و process، وأي حاجة بعد.

~~~powershell
Get-Command *process*
~~~

~~~text الناتج (PowerShell 7.6 على ويندوز ١١)
CommandType Name                              Version   Source
----------- ----                              -------   ------
Cmdlet      ConvertTo-ProcessMitigationPolicy 1.0.12    ProcessMitigations
Cmdlet      Debug-Process                     7.0.0.0   Microsoft.PowerShell.Management
Cmdlet      Enter-PSHostProcess               7.6.0.500 Microsoft.PowerShell.Core
Cmdlet      Exit-PSHostProcess                7.6.0.500 Microsoft.PowerShell.Core
Cmdlet      Get-Process                       7.0.0.0   Microsoft.PowerShell.Management
Cmdlet      Get-ProcessMitigation             1.0.12    ProcessMitigations
Cmdlet      Get-PSHostProcessInfo             7.6.0.500 Microsoft.PowerShell.Core
Cmdlet      Invoke-LapsPolicyProcessing       1.0.0.0   LAPS
Cmdlet      Set-ProcessMitigation             1.0.12    ProcessMitigations
Cmdlet      Start-Process                     7.0.0.0   Microsoft.PowerShell.Management
Cmdlet      Stop-Process                      7.0.0.0   Microsoft.PowerShell.Management
Cmdlet      Wait-Process                      7.0.0.0   Microsoft.PowerShell.Management
~~~

### نقرا الأعمدة

| العمود | معناه |
|---|---|
| [[CommandType]] | نوع الحاجة: [[Cmdlet]] أمر أصلي، [[Function]] دالة مكتوبة بـ PowerShell، [[Alias]] اسم تاني، [[Application]] برنامج ([[.exe]]) من الـ PATH |
| [[Name]] | الاسم اللي تكتبه |
| [[Version]] | نسخة الـ module اللي جاي منه |
| [[Source]] | الـ module: مجموعة أوامر جاية مع بعض. [[Microsoft.PowerShell.Management]] مثلًا فيه أوامر الملفات والعمليات |

لاحظ إن [[Invoke-LapsPolicyProcessing]] طلع لأن كلمة [[Processing]] فيها [[process]]. الـ wildcard بيطابق الحروف، مش المعنى. والقايمة بتختلف من جهاز لجهاز حسب الـ modules المتسطبة.

---

## ٢. [[Get-Command -Verb Get -Noun *Item*]]

هنا بنستغل نظام Verb-Noun: [[-Verb Get]] الفعل لازم يكون Get بالظبط، و [[-Noun *Item*]] الاسم (اللي بعد الشرطة) فيه Item.

~~~powershell
Get-Command -Verb Get -Noun *Item*
~~~

~~~text الناتج (PowerShell 7.6)
CommandType Name                      Version Source
----------- ----                      ------- ------
Function    Get-DAEntryPointTableItem 1.0.0.0 DirectAccessClientComponents
Function    Get-TestDriveItem         3.4.0   Pester
Cmdlet      Get-ChildItem             7.0.0.0 Microsoft.PowerShell.Management
Cmdlet      Get-Item                  7.0.0.0 Microsoft.PowerShell.Management
Cmdlet      Get-ItemProperty          7.0.0.0 Microsoft.PowerShell.Management
Cmdlet      Get-ItemPropertyValue     7.0.0.0 Microsoft.PowerShell.Management
~~~

ده أدق من [[*Item*]] لوحدها، لأنه بيدوّر في الجزء الصح من الاسم وبس.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| أي أمر فيه كلمة | [[Get-Command *كلمة*]] |
| أوامر فعل معين | [[Get-Command -Verb Get]] |
| أوامر على حاجة معينة | [[Get-Command -Noun Service]] |
| البرنامج ده جاي منين | [[Get-Command node]] (درس «البرنامج ده فين») |

- [[*]] = أي حروف. ومتشغّلش [[Get-Command]] من غير أي كلمة: هيطبع آلاف السطور.
- لو مش عارف الأمر ده بيعمل إيه بعد ما لقيته، الخطوة اللي بعدها [[Get-Help]].`,
          lines: ["أي أمر اسمه فيه process.", "الأوامر اللي فعلها Get واسمها فيه Item."],
          sol: R`[[Get-Command *service*]] على ويندوز هيطلع جدول [[CommandType  Name]] فيه الـ cmdlets: [[Get-Service]] و [[New-Service]] و [[Remove-Service]] و [[Restart-Service]] و [[Resume-Service]] و [[Set-Service]] و [[Start-Service]] و [[Stop-Service]] و [[Suspend-Service]] (ده في PowerShell 7.6؛ في 5.1 مفيش [[Remove-Service]] وبداله [[New-WebServiceProxy]])، ومعاهم functions زي [[Get-NetFirewallServiceFilter]]، وبرامج (Application) من الـ PATH اسمها فيه service زي [[services.msc]].

الأدق [[Get-Command -Noun Service]] لأنه بيجيب الأوامر اللي الاسم بتاعها Service بالظبط من غير البرامج الخارجية. لاحظ إن كل الأسامي بنفس نمط Verb-Noun، فلو عرفت [[Get-Service]] تقدر تخمّن [[Stop-Service]] من غير ما تدوّر. ولو [[*service*]] رجع حاجات غريبة من برامج متسطبة، دي مش cmdlets، بص على عمود CommandType.`
        },
        {
          cmd: "Get-Member",
          title: "اعرف الـ object ده جواه إيه",
          desc: R`أهم فكرة في PowerShell كله: الأوامر مش بترجع نص زي bash، بترجع objects. الـ object حاجة ليها خصائص (properties) زي [[Name]] و [[Length]] و [[LastWriteTime]]، وأفعال (methods) زي [[Kill()]] أو [[ToUpper()]]. [[Get-Member]] (اختصاره [[gm]]) بيوريك كل ده لأي object يوصله.

الخط الرأسي [[|]] اسمه pipe: بياخد ناتج الأمر اللي على الشمال ويدّيه للي على اليمين. فـ [[Get-Process | Get-Member]] معناها «هات العمليات الشغالة، واعرضلي جوّاها إيه». أول سطر في الناتج [[TypeName]] بيقولك نوع الـ object، وتحته جدول فيه Name و MemberType (Property أو Method).

في السطر التاني [[.\notes.txt]] يعني «ملف notes.txt في الفولدر اللي انا فيه» (النقطة هي الفولدر الحالي و [[\]] الفاصل)، و [[-MemberType Property]] بيعرض الخصائص بس من غير الـ methods. القاعدة: كل ما تحتاج تفلتر أو ترتب أو تطبع حاجة ومش عارف اسمها، اسأل Get-Member الأول بدل ما تخمّن.`,
          example: R`Get-Process | Get-Member
Get-Item .\notes.txt | Get-Member -MemberType Property`,
          try: R`اعرف الـ properties بتاعة أي ملف، وبعدين اطبع [[(Get-Item .\notes.txt).LastWriteTime]].`,
          deep: {
            why: "في PowerShell كل حاجة object، وأي object ليه properties وmethods. [[Get-Member]] بيقولك إيه المتاح.",
            how: R`[[Get-Process | Get-Member]] يوريك كل property وmethod لـ Process objects. الـ Properties هي المعلومات (Name، وId، وCPU). الـ Methods هي الأفعال (Kill()، وWaitForExit()).

ودي من أهم أوامر PowerShell: لو مش عارف ايه اللي تعمله بـ object، عمل [[| Get-Member]] وشوف. مثلًا [[Get-Date | Get-Member]] بيوريك كل حاجة تقدر تعملها بالتاريخ.`,
            when: "لما بتتعلم أمر جديد. أو لما مش عارف إزاي توصل لمعلومة معينة من object.",
            mistakes: R`تفضل تخمّن أسامي الخصائص ([[Size]] بدل [[Length]]، أو [[Date]] بدل [[LastWriteTime]])، و PowerShell مش بيطلع error على اسم غلط، بيرجع فاضي. وتنسى إن ناتج نفس الأمر ممكن يبقى أكتر من نوع: [[Get-ChildItem | Get-Member]] بيطلع جدولين، واحد لـ DirectoryInfo وواحد لـ FileInfo.`
          },
          teach: R`## الفكرة: كل ناتج في PowerShell «حاجة» ليها خانات

في bash الأمر بيطلّع **نص**، وانت بتقصّه. في PowerShell الأمر بيطلّع **objects**: كل object زي كارت فيه خانات بأسامي. [[Get-Member]] بيقلب الكارت ويوريك الخانات دي إيه.

| المصطلح | معناه | مثال |
|---|---|---|
| object | حاجة واحدة: عملية، ملف، تاريخ | ملف [[notes.txt]] |
| property | معلومة جوّاه، بتقراها | [[Length]] الحجم |
| method | فعل تقدر تعمله بيه، بيتكتب بأقواس | [[Kill()]] يقفل العملية |
| type | نوع الـ object، وبيحدد عنده خانات إيه | [[System.IO.FileInfo]] |

---

## ١. [[Get-Process | Get-Member]]

### الحتة الأولى: [[Get-Process]]

بيرجّع object لكل برنامج شغال.

### الحتة التانية: [[|]]

الـ pipe: ياخد اللي طلع من الشمال ويسلّمه لليمين. هنا بيسلّم الـ objects، مش نص مطبوع.

### الحتة التالتة: [[Get-Member]]

بيبص على الـ objects اللي وصلتله ويطبع **نوعهم** والخانات اللي فيهم. ولو كلهم من نفس النوع بيطبع الجدول مرة واحدة بس (مش مرة لكل عملية).

~~~powershell
Get-Process | Get-Member
~~~

~~~text أول الناتج (PowerShell 7.6)
   TypeName: System.Diagnostics.Process

Name               MemberType    Definition
----               ----------    ----------
Handles            AliasProperty Handles = Handlecount
Name               AliasProperty Name = ProcessName
NPM                AliasProperty NPM = NonpagedSystemMemorySize64
PM                 AliasProperty PM = PagedMemorySize64
SI                 AliasProperty SI = SessionId
VM                 AliasProperty VM = VirtualMemorySize64
WS                 AliasProperty WS = WorkingSet64
Parent             CodeProperty  System.Object Parent{get=GetParentProcess;}
Disposed           Event         System.EventHandler Disposed(System.Object, System.EventArgs)
...
~~~

القايمة كلها ٩٤ سطر في 7.6 و ٩٢ في 5.1 (عدّيتهم بـ [[(Get-Process | Get-Member).Count]]).

### نقرا الناتج

- [[TypeName: System.Diagnostics.Process]]: نوع الـ object. الاسم بالكامل مكتوب بنقط، وآخر كلمة هي النوع: Process.
- [[Name]]: اسم الخانة.
- [[MemberType]]: نوعها:

| MemberType | يعني |
|---|---|
| [[Property]] | معلومة |
| [[AliasProperty]] | اسم قصير لـ property تانية. [[WS = WorkingSet64]] يعني [[WS]] هي نفسها [[WorkingSet64]] |
| [[Method]] | فعل، بيتنادى بأقواس |
| [[Event]] | حدث بيحصل (زي [[Exited]] لما العملية تقفل). مش هتحتاجه دلوقتي |

- [[Definition]]: نوع القيمة. لو فيها [[{get;}]] يبقى تقراها بس، ولو [[{get;set;}]] تقدر تغيّرها كمان.

---

## ٢. [[Get-Item .\notes.txt | Get-Member -MemberType Property]]

| الحتة | معناها |
|---|---|
| [[Get-Item]] | هات object الملف ده (من غير محتواه) |
| [[.\notes.txt]] | [[.]] الفولدر اللي انت فيه، و [[\]] فاصل، و [[notes.txt]] اسم الملف |
| [[-MemberType Property]] | اعرض الخصائص بس، من غير methods و events |

~~~text الناتج (PowerShell 7.6)
   TypeName: System.IO.FileInfo

Name              MemberType Definition
----              ---------- ----------
Attributes        Property   System.IO.FileAttributes Attributes {get;set;}
CreationTime      Property   datetime CreationTime {get;set;}
CreationTimeUtc   Property   datetime CreationTimeUtc {get;set;}
Directory         Property   System.IO.DirectoryInfo Directory {get;}
DirectoryName     Property   string DirectoryName {get;}
Exists            Property   bool Exists {get;}
Extension         Property   string Extension {get;}
FullName          Property   string FullName {get;}
IsReadOnly        Property   bool IsReadOnly {get;set;}
LastAccessTime    Property   datetime LastAccessTime {get;set;}
LastAccessTimeUtc Property   datetime LastAccessTimeUtc {get;set;}
LastWriteTime     Property   datetime LastWriteTime {get;set;}
LastWriteTimeUtc  Property   datetime LastWriteTimeUtc {get;set;}
Length            Property   long Length {get;}
LinkTarget        Property   string LinkTarget {get;}
Name              Property   string Name {get;}
UnixFileMode      Property   System.IO.UnixFileMode UnixFileMode {get;set;}
~~~

النوع هنا [[FileInfo]] (ملف). أنواع القيم اللي في [[Definition]]:

| النوع | يعني |
|---|---|
| [[string]] | نص |
| [[long]] | رقم صحيح كبير (الحجم بالبايت) |
| [[bool]] | [[True]] أو [[False]] |
| [[datetime]] | تاريخ ووقت |

و [[Utc]] في آخر اسم معناها نفس الوقت بس بتوقيت جرينتش، مش توقيتك المحلي.

---

## ٣. استخدم اللي عرفته

دلوقتي عرفنا إن فيه خانة اسمها [[LastWriteTime]]، فنقراها:

~~~powershell
(Get-Item .\notes.txt).LastWriteTime
~~~

~~~text الناتج
Tuesday, October 6, 2026 9:36:39 AM
~~~

الأقواس [[( )]] معناها «نفّذ الأمر الأول»، والنقطة بعدها «هات الخانة دي من الناتج».

---

## الخلاصة

1. مش عارف اسم الخاصية؟ [[أمر | Get-Member]].
2. اقرا [[TypeName]] عشان تعرف النوع، وبعدين الأسامي تحته.
3. استخدمها بـ [[(أمر).الاسم]].

واسم خاصية غلط ([[.Size]] بدل [[.Length]]) مش بيطلع error، بيرجع فاضي. عشان كده [[Get-Member]] الأول.`,
          lines: ["إيه الـ properties والـ methods اللي في object العملية.", "الـ properties بس لـ object ملف."],
          sol: R`[[Get-Item .\notes.txt | Get-Member -MemberType Property]] بيطلع [[TypeName: System.IO.FileInfo]] وتحته properties زي [[Attributes]] و [[CreationTime]] و [[DirectoryName]] و [[Extension]] و [[FullName]] و [[IsReadOnly]] و [[LastWriteTime]] و [[Length]] و [[Name]]. و [[(Get-Item .\notes.txt).LastWriteTime]] بيطبع تاريخ ووقت زي [[Wednesday, September 30, 2026 5:11:17 AM]] (الشكل بيختلف حسب لغة ويندوز).

الـ TypeName هو المفتاح: FileInfo للملف و DirectoryInfo للفولدر، فالفولدر مفيهوش [[Length]] مثلًا. ولو ظهرلك [[Cannot find path]]، الملف مش موجود في الفولدر اللي انت واقف فيه: اعمله الأول بـ [[New-Item notes.txt]]. ولو كتبت [[Get-Item .\notes.txt.LastWriteTime]] من غير أقواس هيدوّر على ملف بالاسم ده كله، الأقواس هي اللي بتقول «نفّذ الأول وبعدين هات الـ property».`
        },
        {
          cmd: "رموز PowerShell",
          title: "كل رمز في PowerShell معناه إيه",
          desc: R`أغلب اللي بيخوّف في أكواد PowerShell رموز. دي كلها في مكان واحد (والرموز العامة اللي مشتركة مع bash و CMD في تاب «الرموز»):

[[$]] قبل أي اسم يبقى متغير ([[$name]]). [[|]] الـ pipe: ناتج الشمال يروح لليمين كـ objects. [[$_]] (أو [[$PSItem]]) جوه أي [[{ }]] في pipeline معناه «العنصر الحالي». [[{ }]] اسمها script block: كود بيتنفذ بعدين أو لكل عنصر. [[( )]] نفّذ الجوّاني الأول وخد ناتجه، زي [[(Get-Date).Year]]، وكمان حوالين الشرط في [[if]].

[[@( )]] array، و [[@{ }]] hashtable (مفاتيح وقيم). [[[ ]]] ليها معنيين: رقم عنصر [[$list[0]]]، أو اسم نوع [[[int]"41"]] (حوّل لرقم). و [[::]] بعد نوع بتنادي حاجة جاهزة جواه زي [[[math]::Round()]]. و [[..]] بين رقمين range ([[1..5]]).

[[?]] اختصار Where-Object و [[%]] اختصار ForEach-Object، فـ [[? Length -gt 1KB | % Name]] معناها «الملفات اللي أكبر من كيلو، واطبع أساميها». [[;]] بتفصل أمرين على نفس السطر. [[#]] تعليق لآخر السطر، و [[<# ... #>]] تعليق على كذا سطر. و [[.\]] الفولدر الحالي، ولازمة قبل اسم سكربت عشان يشتغل. و [[&]] شغّل اللي بعدي (درس & في المستوى التاني).

وأهمهم الـ backtick (الحرف اللي تحت Esc): ده الـ escape بتاع PowerShell مش [[\]]، وفي آخر السطر معناه «الأمر مكمّل تحت»، ولازم يبقى آخر حرف بالظبط من غير مسافة بعده. والمقارنة بكلمات زي [[-gt]] و [[-eq]] مش [[>]] و [[==]]، لأن [[>]] و [[>>]] للكتابة في ملف زي bash.`,
          example: R`$name = "Ali"
Get-ChildItem | Where-Object { $_.Length -gt 1KB }
Get-ChildItem | ? Length -gt 1KB | % Name
$list = @("web", "api")
$user = @{ name = "Ali"; role = "dev" }
[int]"41" + 1
(Get-Date).Year
"a"; "b"
Get-ChildItem -Path . $__bt
    -Filter *.json`,
          try: R`اكتب [[Get-ChildItem | ? Length -gt 1KB | % Name]] وبعدين نفس الأمر بالأسامي الكاملة من غير أي اختصار. وجرّب [["5" + 1]] و [[[int]"5" + 1]].`,
          flag: "script",
          deep: {
            why: R`هتنسخ أكواد من Stack Overflow ومن الـ docs فيها [[% {$_}]] و [[@{}]] و [[[math]::]] و backtick في آخر السطر. لو مش عارف كل رمز معناه إيه، الكود هيبان سحر، وأي تعديل صغير هيبوّظه.`,
            how: R`الفرق بين الأقواس هو أكتر حاجة بتلخبط:
[[( )]] قوسين عاديين: «نفّذ ده الأول». [[(Get-Item x).Length]] من غير الأقواس هيدوّر على ملف اسمه x.Length.
[[$( )]] نفس الفكرة بس جوه نص بين double quotes: [["Total: $($list.Count)"]] (درس النصوص).
[[@( )]] «خلّي الناتج array دايمًا» حتى لو عنصر واحد أو مفيش.
[[{ }]] كود مش بيتنفذ دلوقتي، بيتنفذ لما الأمر اللي واخده يقرر (لكل عنصر في Where-Object، أو جوه if لو الشرط صح).
[[@{ }]] hashtable: [[@{ key = value; key2 = value2 }]].
[[[ ]]] على متغير: index. لوحدها قبل حاجة: نوع ([[[string]]] و [[[int]]] و [[[datetime]]] و [[[xml]]]).

[[$_]] موجودة بس جوه [[{ }]] في الـ pipeline (ForEach-Object و Where-Object و Sort-Object { } و Rename-Item -NewName { }) وفي catch و switch. بره ده فاضية.

الـ backtick: في آخر سطر بيكمّل الأمر، وجوه نص بين double quotes بيعمل حروف خاصة: [[$__btn]] سطر جديد و [[$__btt]] tab و [[$__bt"]] علامة تنصيص. ومش محتاجه بعد [[|]] في آخر السطر، الـ pipe بيكمّل لوحده.

[[%]] و [[?]] كمان ليهم معنى تاني: [[%]] باقي القسمة ([[10 % 3]] بيطلع 1) لما يبقى بين رقمين، و [[?]] wildcard لحرف واحد جوه مسار ([[file?.txt]]). PowerShell بيعرف من المكان.

وفيه رموز مقارنة ملهاش رمز خالص: كلها كلمات بشرطة ([[-eq]] [[-like]] [[-match]] [[-and]] [[-not]])، ودرس «عوامل المقارنة» في المستوى التالت بيشرحهم.`,
            when: "كل ما تقرا كود حد تاني أو مثال من النت. والاختصارات زي [[%]] و [[?]] كويسة في الترمنال، لكن في السكربتات اكتب الأسامي الكاملة عشان اللي بعدك يفهم.",
            mistakes: R`مسافة بعد الـ backtick في آخر السطر فالأمر يتقطع والسطر اللي تحته يتنفذ لوحده. أو [[\n]] جوه نص زي bash بدل backtick n. أو [[$_]] بره الـ [[{ }]]. أو [[@{}]] مكان [[@()]]. أو [[if ($a > 5)]] اللي بتعمل ملف اسمه 5 (درس if / switch).`
          },
          teach: R`## الفكرة

كل سطر في المثال بيعرض رمز أو اتنين. هنمشي عليهم سطر سطر، ومع كل سطر الناتج الحقيقي (PowerShell 7.6، ونفس الناتج في 5.1). الفولدر اللي اتجرب فيه فيه ملفات صغيرة، و [[app.log]] (1139 بايت) و [[big.bin]] (2000000 بايت).

---

## ١. [[$name = "Ali"]]: الدولار والـ =

~~~powershell
$name = "Ali"
$name
~~~

~~~text الناتج
Ali
~~~

- [[$]] قبل الاسم: «ده متغير». المتغير صندوق ليه اسم بتحط فيه قيمة.
- [[=]] هنا «حط في»، مش «يساوي». المقارنة كلمة تانية ([[-eq]]).
- [["Ali"]] نص بين علامات تنصيص.
- السطر الأول مش بيطبع حاجة. لما تكتب [[$name]] لوحده PowerShell بيطبع قيمته.

---

## ٢. [[Get-ChildItem | Where-Object { $_.Length -gt 1KB }]]: الـ pipe والأقواس المعقوفة و [[$_]]

نفكه بترتيب التنفيذ:

### [[Get-ChildItem]]

بيرجّع object لكل ملف وفولدر في المكان اللي انت فيه.

### [[|]]

بيبعتهم واحد واحد للي بعده.

### [[Where-Object { ... }]]

بيعدّي العنصر لو الشرط اللي جوه [[{ }]] طلع True. الـ [[{ }]] اسمها **script block**: كود مش بيتنفذ دلوقتي، بيتنفذ مرة لكل عنصر.

### [[$_]]

جوه الـ script block، [[$_]] هو العنصر اللي عليه الدور دلوقتي. و [[$_.Length]] حجمه.

### [[-gt 1KB]]

[[-gt]] من greater than: «أكبر من». و [[1KB]] رقم جاهز في PowerShell قيمته 1024.

~~~text الناتج (المسار اتختصر)
    Directory: C:\...\lab

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---           10/6/2026  9:36 AM           1139 app.log
-a---           10/6/2026  9:36 AM        2000000 big.bin
~~~

---

## ٣. [[Get-ChildItem | ? Length -gt 1KB | % Name]]: نفس الكلام مختصر

| الرمز | هو |
|---|---|
| [[?]] | اختصار [[Where-Object]] |
| [[Length -gt 1KB]] | الشكل المختصر للشرط: اسم الخاصية على طول من غير [[{ }]] ولا [[$_]] |
| [[%]] | اختصار [[ForEach-Object]]: اعمل حاجة لكل عنصر |
| [[% Name]] | هات خاصية [[Name]] من كل عنصر |

~~~text الناتج
app.log
big.bin
~~~

نفس الملفين، بس المرة دي أسامي بس (نص) بدل جدول.

---

## ٤. [[$list = @("web", "api")]]: الـ array

[[@( )]] بيعمل **array**: لستة عناصر بالترتيب، مفصولين بفاصلة.

~~~powershell
$list = @("web", "api")
$list[0]
$list.Count
~~~

~~~text الناتج
web
2
~~~

[[[0]]] بعد المتغير رقم العنصر، والعدّ بيبدأ من صفر. و [[.Count]] عدد العناصر.

---

## ٥. [[$user = @{ name = "Ali"; role = "dev" }]]: الـ hashtable

[[@{ }]] بيعمل **hashtable**: أزواج «مفتاح = قيمة»، و [[;]] بتفصل بينهم.

~~~powershell
$user
$user.role
~~~

~~~text الناتج
Name                           Value
----                           -----
name                           Ali
role                           dev

dev
~~~

الفرق في سطر: [[@( )]] لستة بأرقام، [[@{ }]] قاموس بأسامي.

---

## ٦. [[[int]"41" + 1]]: القوسين المربعين كنوع

[[[int]]] قبل قيمة معناها «حوّلها للنوع ده». [[int]] اختصار integer: رقم صحيح.

~~~text الناتج
42
~~~

ومن غير التحويل؟ جربت [["41" + 1]] فطلع [[411]]: الشمال نص، فالـ [[+]] لزق بدل ما يجمع.

---

## ٧. [[(Get-Date).Year]]: القوسين العاديين

[[( )]] «نفّذ اللي جوّا الأول». [[Get-Date]] بيرجّع object للتاريخ والوقت دلوقتي، و [[.Year]] خانة السنة منه.

~~~text الناتج
2026
~~~

---

## ٨. [["a"; "b"]]: الفاصلة المنقوطة

[[;]] بتفصل أمرين على نفس السطر، كأنك كتبتهم في سطرين.

~~~text الناتج
a
b
~~~

---

## ٩. الـ backtick في آخر السطر

~~~powershell
Get-ChildItem -Path . $__bt
    -Filter *.json
~~~

الـ backtick (الحرف اللي تحت Esc) في **آخر** السطر معناه «الأمر لسه مخلصش، كمّل من السطر اللي تحت». فالسطرين أمر واحد: [[Get-ChildItem -Path . -Filter *.json]]. [[-Path .]] يعني الفولدر الحالي، و [[-Filter *.json]] الملفات اللي بتخلص بـ .json بس.

~~~text الناتج (شغّلته كسكربت .ps1)
    Directory: C:\...\lab

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---           10/6/2026  9:36 AM            151 package.json
~~~

> لو فيه **مسافة** بعد الـ backtick، الـ backtick بيعمل escape للمسافة بدل السطر الجديد، فالأمر بيتقطع والسطر التاني يتنفذ لوحده.

---

## الخلاصة: الرموز في جدول واحد

| الرمز | معناه |
|---|---|
| [[$name]] | متغير |
| [[=]] | حط قيمة |
| [[|]] | ابعت الناتج للي بعدي |
| [[{ }]] | كود يتنفذ بعدين أو لكل عنصر |
| [[$_]] | العنصر الحالي جوه [[{ }]] |
| [[?]] / [[%]] | Where-Object / ForEach-Object |
| [[@( )]] | array |
| [[@{ }]] | hashtable |
| [[[int]]] | حوّل للنوع ده |
| [[$list[0]]] | عنصر برقمه |
| [[( )]] | نفّذ الأول |
| [[;]] | أمرين في سطر |
| backtick | كمّل في السطر اللي تحت |
| [[1KB]] [[1MB]] [[1GB]] | أرقام جاهزة: 1024 و 1048576 و 1073741824 |`,
          lines: [
            "[[$]] متغير، و [[=]] بتحط فيه قيمة.",
            "[[|]] pipe، و [[{ }]] كود لكل عنصر، و [[$_]] العنصر الحالي، و [[1KB]] رقم جاهز (1024).",
            "نفس الفكرة بالاختصارات: [[?]] هي Where-Object و [[%]] هي ForEach-Object.",
            "[[@( )]] array.",
            "[[@{ }]] hashtable، و [[;]] بين العناصر.",
            "[[[int]]] حوّل النص لرقم قبل الجمع: 42.",
            "[[( )]] نفّذ الأول وبعدين خد الخاصية Year.",
            "[[;]] أمرين على سطر واحد.",
            "الـ backtick في آخر السطر: الأمر مكمّل تحت...",
            "...وده آخره."
          ],
          sol: R`[[Get-ChildItem | ? Length -gt 1KB | % Name]] طبع أسامي الملفات اللي أكبر من 1024 بايت، كل اسم في سطر (عندي طبع [[big.bin]] بس). والنسخة الكاملة [[Get-ChildItem | Where-Object Length -gt 1KB | ForEach-Object Name]] طبعت نفس الحاجة بالظبط. وفي المثال نفسه [[[int]"41" + 1]] طبع [[42]] و [[(Get-Date).Year]] طبع السنة.

[["5" + 1]] طبع [[51]]: الشمال نص فالـ [[+]] لزق. و [[[int]"5" + 1]] طبع [[6]]. القاعدة دي (نوع الشمال هو اللي بيحدد) مشروحة في «عوامل المقارنة». جربت كل ده على PowerShell 7.6 و 5.1 والناتج واحد.`
        }
      ]
    }
  ]
});
