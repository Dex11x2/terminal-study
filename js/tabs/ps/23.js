// تكملة تاب ps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ps/01.js (شرح حقول الدرس في أوله)
MORE("ps", [
    {
      t: "مشروع ٢: أداة بتخزّن بيانات",
      l: 3,
      n: R`أداة [[task.ps1]] لمهامك من الترمنال: [[add]] و [[list]] و [[done]] و [[rm]] و [[stats]]، وبتخزّن في JSON. ٦ خطوات، وفيها فخّين حقيقيين وقعنا فيهم واتصلحوا قدامك، وفي الآخر اختبارات بتتشغّل`,
      items: [
        {
          cmd: "مشروع ٢ — التصميم والتخزين",
          title: "أوامر فرعية، وكتابة ملف مش بتبوّظه لو وقعت في النص",
          desc: R`الأداة دي فيها حاجة جديدة عن المشروع اللي فات: **بيانات بتفضل**. فأول قرارين: الأوامر الفرعية، وإزاي نكتب الملف من غير ما نخسر البيانات.

**الواجهة:**
[[.\task.ps1 add "اكتب التقرير" -Tag work -Due 2026-11-05]]
[[.\task.ps1 list -Tag work -Open]]
[[.\task.ps1 done -Id 3]]
[[.\task.ps1 rm -Id 3]]
[[.\task.ps1 stats]]

**القراية:** [[Read-Store]] بترجّع قايمة فاضية لو الملف مش موجود (أول تشغيل مش خطأ)، وبترمي رسالة واضحة لو الملف تالف.

**الكتابة الآمنة:** مينفعش تكتب فوق الملف على طول. لو الجهاز وقع في النص، تبقى خسرت كل حاجة. الطريقة الصح: اكتب في ملف مؤقت، وبعد ما يخلص بنجاح، **انقله** فوق الأصلي. النقل على نفس القرص عملية شبه لحظية.

[[, $Tasks | ConvertTo-Json]] — الفاصلة في الأول مش غلطة مطبعية: من غيرها، لو القايمة فيها عنصر واحد، [[ConvertTo-Json]] بيكتبه object مش array، ولما تقراه تاني يبقى شكله مختلف. الفاصلة بتلفّه في array ضمانًا.

و [[-Depth 5]] لأن الافتراضي ٢ مستويات بس، وأي حاجة أعمق بتتحوّل لنص.

**و [[-StorePath]] كـ parameter مش ثابت:** ده مش تفصيلة، ده اللي هيخليك تقدر تكتب اختبارات في الخطوة الأخيرة من غير ما تلمس بياناتك الحقيقية.`,
          example: R`function Read-Store {
    if (-not (Test-Path $StorePath)) { return @() }
    try {
        $raw = Get-Content $StorePath -Raw -Encoding utf8
        if ([string]::IsNullOrWhiteSpace($raw)) { return @() }
        return @($raw | ConvertFrom-Json)
    } catch {
        throw "ملف المهام تالف: $StorePath"
    }
}

function Write-Store {
    param([array]$Tasks)
    $dir = Split-Path -Parent $StorePath
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force -WhatIf:$false | Out-Null }
    $tmp = "$StorePath.tmp"
    , $Tasks | ConvertTo-Json -Depth 5 | Set-Content -Path $tmp -Encoding utf8 -WhatIf:$false
    Move-Item -Path $tmp -Destination $StorePath -Force -WhatIf:$false
}`,
          flag: "script",
          try: R`جرّب [[ConvertTo-Json]] على قايمة فيها عنصر واحد مرة بفاصلة في الأول ومرة من غيرها، وقارن الناتج: [[@(1) | ConvertTo-Json]] و [[, @(1) | ConvertTo-Json]].`,
          sol: R`~~~text الناتج (PowerShell 7.6)
PS> @(1) | ConvertTo-Json
1

PS> , @(1) | ConvertTo-Json
[
  1
]
~~~

**من غير الفاصلة** الـ pipeline بيفرد القايمة لعنصر واحد، و [[ConvertTo-Json]] بيشوف رقم فبيكتب [[1]].

**بالفاصلة** الفاصلة بتعمل array جواها القايمة، فالـ pipeline بيفرد الطبقة البرّانية بس ويوصّل القايمة كما هي، فالناتج [[[1]]].

**ليه ده مهم في أداتنا؟** لو عندك مهمة واحدة والملف اتكتب [[{ "id": 1, ... }]] بدل [[[ { "id": 1, ... } ]]]، لما تقراه تاني هتلاقي object مش قايمة، و [[.Count]] هتدّي حاجة غريبة. الفاصلة بتخلي الملف شكله ثابت دايمًا.`,
          deep: {
            why: R`الأداة دي معاها بيانات اليوزر. أداة بتفقد بياناتك مرة واحدة مش هيستخدمها تاني. الكتابة الذرية سطرين زيادة بيمنعوا ده.`,
            how: R`**الكتابة الذرية (atomic write):**

~~~text
الطريقة الخطر                     الطريقة الصح
───────────────                   ─────────────
افتح الملف الأصلي                 اكتب في file.tmp
امسح محتواه       ← لو وقعت هنا   خلّص الكتابة
اكتب الجديد          البيانات راحت  انقل file.tmp فوق الأصلي  ← لحظي
~~~

[[Move-Item -Force]] على نفس القرص بيعدّل جدول الملفات بس، فاحتمال إنك تقع في نصه شبه معدوم. ولو وقعت قبل النقل، الملف الأصلي لسه سليم والمؤقت هو اللي ضاع.

**[[Read-Store]] وحالاته التلاتة:**

| الحالة | الرد |
|---|---|
| الملف مش موجود | [[@()]] — أول تشغيل، مش خطأ |
| الملف فاضي | [[@()]] — بيحصل لو اتقطعت كتابة قديمة |
| الملف بايظ | [[throw]] برسالة فيها المسار |

[[[string]::IsNullOrWhiteSpace($raw)]] بتمسك الفاضي والمسافات مع بعض.

**ليه [[throw]] مش [[return @()]]** للملف البايظ؟ لأن إرجاع قايمة فاضية معناها «مفيش مهام»، وأول [[add]] هتكتب فوق البيانات البايظة وتضيّعها خالص. الأحسن توقف وتقول لليوزر.

**[[ConvertTo-Json -Depth]]:** الافتراضي ٢. أي object جوه object جوه object بيتحوّل لنص [[System.Object[]]] بدل محتواه. حط [[-Depth 5]] أو أكتر وانت مرتاح.

**[[-Encoding utf8]]:** في PowerShell 7 الافتراضي UTF-8 من غير BOM، وفي 5.1 الافتراضي UTF-16. فاكتبها صراحة عشان الملف يتقرا صح في النسختين.

**[[-StorePath]] كـ parameter:** دي فكرة اسمها dependency injection. الأداة مش بتعرف مكان الملف من ثابت، بتاخده من بره مع قيمة افتراضية معقولة. النتيجة: الاختبارات بتدّيها ملف مؤقت.`,
            when: "أي أداة بتكتب ملف بيانات لليوزر.",
            mistakes: R`تكتب فوق الملف الأصلي على طول.

وتنسى الفاصلة قبل [[$Tasks]] فالملف يبقى شكله مختلف لما يكون فيه عنصر واحد.

وتسيب [[-Depth]] الافتراضي فتلاقي [[System.Object[]]] مكتوبة في الـ JSON.

وتحط مسار الملف ثابت جوه الكود، فتبقى مش قادر تختبر من غير ما تلعب في بياناتك.`
          },
          teach: R`## الفكرة

أول أداة بتخزّن بيانات. الجزء الصعب مش الكتابة، الجزء الصعب إنك **متخسرش** البيانات.

الناتج اللي تحت من تشغيل حقيقي على ويندوز 11 / PowerShell 7.6.

---

## ١. الواجهة

~~~text شكل الاستخدام
.\task.ps1 add "اكتب التقرير" -Tag work -Due 2026-11-05
.\task.ps1 list -Tag work -Open
.\task.ps1 done -Id 3
.\task.ps1 rm -Id 3
.\task.ps1 stats
~~~

نفس فكرة المشروع الأول: فعل في الأول، وبعده التفاصيل. و [[add]] بياخد النص في الموقع التاني عشان [[add "كلام"]] تشتغل من غير [[-Text]].

**والملف:** [[$env:LOCALAPPDATA\task-tool\tasks.json]]، وهو **parameter** مش ثابت:

~~~powershell
[string]$StorePath = "$env:LOCALAPPDATA\task-tool\tasks.json"
~~~

ده هيبقى مهم جدًا في خطوة الاختبارات.

---

## ٢. [[Read-Store]]: تلات حالات

~~~powershell
function Read-Store {
    if (-not (Test-Path $StorePath)) { return @() }
    try {
        $raw = Get-Content $StorePath -Raw -Encoding utf8
        if ([string]::IsNullOrWhiteSpace($raw)) { return @() }
        return @($raw | ConvertFrom-Json)
    } catch {
        throw "ملف المهام تالف: $StorePath"
    }
}
~~~

| السطر | الحالة | الرد | ليه |
|---|---|---|---|
| [[Test-Path]] | الملف مش موجود | [[@()]] | أول تشغيل، ده طبيعي |
| [[IsNullOrWhiteSpace]] | الملف فاضي | [[@()]] | ممكن تكون كتابة قديمة اتقطعت |
| [[catch]] | الـ JSON بايظ | [[throw]] | **مينفعش** نكمّل |

### ليه [[throw]] في الحالة التالتة؟

لو رجّعنا [[@()]] (قايمة فاضية) لملف بايظ، الأداة هتفتكر إن مفيش مهام، وأول [[add]] هتكتب فوق الملف و **تضيّع كل حاجة كانت فيه**.

الوقوف بصوت عالي أحسن. اليوزر يقدر يفتح الملف ويصلحه.

### [[@( )]] حوالين [[ConvertFrom-Json]]

~~~powershell
return @($raw | ConvertFrom-Json)
~~~

عشان لو الملف فيه مهمة واحدة، الناتج يفضل **قايمة** مش object واحد.

> وبرضه فيه فخ تاني هنا اكتشفناه بالتجربة، وهنشوفه في الخطوة الجاية.

---

## ٣. [[Write-Store]]: اكتب من غير ما تخسر

~~~powershell
function Write-Store {
    param([array]$Tasks)
    $dir = Split-Path -Parent $StorePath
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force -WhatIf:$false | Out-Null }
    $tmp = "$StorePath.tmp"
    , $Tasks | ConvertTo-Json -Depth 5 | Set-Content -Path $tmp -Encoding utf8 -WhatIf:$false
    Move-Item -Path $tmp -Destination $StorePath -Force -WhatIf:$false
}
~~~

### الكتابة الذرية

~~~text
الطريقة الخطر                          الطريقة الصح
──────────────────                     ──────────────────
١. افتح tasks.json                     ١. اكتب في tasks.json.tmp
٢. امسح محتواه     ← الكهربا تقطع هنا  ٢. خلّص الكتابة
٣. اكتب الجديد        = كل حاجة راحت   ٣. انقل .tmp فوق الأصلي  ← لحظي
~~~

[[Move-Item -Force]] على نفس القرص بيغيّر مدخل الملف في جدول النظام بس. فإما الملف القديم كامل، أو الجديد كامل. مفيش حالة نُص.

### الفاصلة اللي قبل [[$Tasks]]

~~~powershell
, $Tasks | ConvertTo-Json -Depth 5
~~~

**دي مش غلطة مطبعية.** نجرّب الفرق:

~~~powershell
@(1) | ConvertTo-Json
~~~

~~~text الناتج
1
~~~

~~~powershell
, @(1) | ConvertTo-Json
~~~

~~~text الناتج
[
  1
]
~~~

### ليه؟

الـ pipeline في PowerShell **بيفرد القوايم**. لما تبعت [[@(1)]] في الـ pipe، اللي بيوصل للي بعده هو الرقم [[1]] مش القايمة.

[[,]] قبل أي حاجة بتعمل **array جواها الحاجة دي**. فاللي بيدخل الـ pipe بقى [[@( @(1) )]]، والـ pipeline بيفرد الطبقة البرّانية بس، فالقايمة بتوصل كاملة.

### وده بيفرق فعلًا

| عدد المهام | من غير الفاصلة | بالفاصلة |
|---|---|---|
| ٠ | [[null]] | [[[]]] |
| ١ | [[{...}]] object | [[[{...}]]] قايمة |
| ٣ | [[[...]]] قايمة | [[[...]]] قايمة |

من غير الفاصلة، شكل الملف **بيتغيّر** حسب عدد المهام. وده بيكسر القراية.

### [[-Depth 5]]

[[ConvertTo-Json]] افتراضيًا بينزل **مستويين** بس. أي حاجة أعمق بتتكتب كنص زي [[System.Object[]]].

مهامنا بسيطة، بس [[-Depth 5]] تأمين رخيص.

### [[-Encoding utf8]]

| النسخة | الافتراضي |
|---|---|
| PowerShell 7 | UTF-8 من غير BOM |
| PowerShell 5.1 | UTF-16 (Unicode) |

لو سبتها، الملف اللي اتكتب في 7 مش هيتقرا صح في 5.1 والعكس. اكتبها صراحة في الاتنين.

### و [[-WhatIf:$false]] تاني

نفس درس المشروع الأول: [[New-Item]] و [[Set-Content]] و [[Move-Item]] بيرثوا [[-WhatIf]] من السكربت. إحنا عايزين [[-WhatIf]] يمنع **إضافة مهمة**، مش يمنع إنشاء الفولدر.

> بس خد بالك: [[Write-Store]] نفسها مش بتتنادى أصلًا لما [[ShouldProcess]] ترجّع [[False]]، فالـ [[-WhatIf:$false]] هنا احتياط لو ناديتها من مكان تاني.

---

## ٤. ليه [[-StorePath]] parameter؟

~~~powershell
[string]$StorePath = "$env:LOCALAPPDATA\task-tool\tasks.json"
~~~

الطريقة السهلة كانت:

~~~powershell
$StorePath = "$env:LOCALAPPDATA\task-tool\tasks.json"   # ثابت جوه الكود
~~~

الفرق بيبان في الخطوة الأخيرة:

~~~powershell
.\task.ps1 add 'test' -StorePath "$env:TEMP\test-123.json"
~~~

كده الاختبارات بتشتغل على ملف مؤقت، **ومهامك الحقيقية مش بتتلمس**. ومن غير الـ parameter، كل اختبار كان هيلعب في بياناتك.

القاعدة: **أي مسار أو إعداد خارجي، خليه parameter بقيمة افتراضية معقولة.**

---

## الخلاصة

- الأداة اللي بتخزّن بيانات لازم تفكّر في «الجهاز وقع في النص».
- الكتابة الذرية: ملف [[.tmp]] وبعدين [[Move-Item -Force]].
- [[Read-Store]] ليها تلات حالات، والملف البايظ لازم **يوقف** مش يرجّع فاضي.
- [[,]] قبل القايمة في الـ pipeline بتمنع فردها، فشكل الـ JSON يفضل ثابت.
- [[-Depth]] الافتراضي ٢ وبيضيّع البيانات العميقة.
- [[-Encoding utf8]] صراحة، لأن 5.1 افتراضيه UTF-16.
- مسار التخزين **parameter** مش ثابت — ده اللي بيخلي الاختبار ممكن.`,
          lines: [
            R`دالة القراية`,
            R`الملف مش موجود: أول تشغيل، رجّع قايمة فاضية مش خطأ`,
            R`جرّب تقرا`,
            R`اقرا الملف كله كنص واحد`,
            R`الملف فاضي: برضه قايمة فاضية`,
            R`فك الـ JSON، و @( ) عشان الناتج يفضل قايمة لو فيه عنصر واحد`,
            R`لو الـ JSON بايظ`,
            R`وقّف وقول لليوزر: لو رجّعنا فاضي، أول add هتكتب فوق بياناته`,
            R`قفل الـ try/catch`,
            R`قفل الدالة`,
            R`دالة الكتابة`,
            R`بتاخد قايمة المهام`,
            R`هات فولدر الملف`,
            R`اعمله لو مش موجود، من غير ما يتأثر بـ -WhatIf`,
            R`اسم ملف مؤقت جنب الأصلي (نفس القرص عشان النقل يبقى لحظي)`,
            R`اكتب فيه، والفاصلة بتمنع الـ pipeline من فرد القايمة`,
            R`وبعد ما الكتابة تنجح، انقله فوق الأصلي: دي اللحظة الذرية`,
            R`قفل الدالة`
          ]
        },

        {
          cmd: "مشروع ٢ — add وفخ المصفوفة",
          title: "تضيف عنصر لقايمة، والقايمة بتختفي",
          desc: R`الخطوة دي بتضيف مهمة. والكود الأول اللي كتبناه **وقع فعلًا**، والخطأ اللي طلع من النوع اللي بيضيّع وقت لو مش عارفه:

[[Method invocation failed because [System.Management.Automation.PSObject] does not contain a method named 'op_Addition']]

السبب: **الدالة في PowerShell بتفرد القايمة اللي فيها عنصر واحد وهي بترجّعها.** [[Read-Store]] كتبنا فيها [[return @(...)]]، ومع ده لما كان فيه مهمة واحدة الراجع كان **object** مش قايمة. و [[$object + $task]] ملهاش معنى.

الحل: [[@($tasks) + $task]] — لفّ القايمة في [[@( )]] **عند الاستخدام**، مش عند الإرجاع بس.

وباقي الخطوة:
[[[pscustomobject]@{ ... }]] بتعمل object بخصائص انت محددها، وده أحسن من hashtable لأن ترتيب الأعمدة بيتحفظ والعرض بيبقى جدول.
[[Measure-Object -Property id -Maximum]] بتجيب أكبر id عشان الجديد يبقى بعده.
[[(Get-Date).ToString('o')]] لوقت الإنشاء بصيغة ثابتة.`,
          example: R`function New-Id {
    param([array]$Tasks)
    if ($Tasks.Count -eq 0) { return 1 }
    return ([int]($Tasks | Measure-Object -Property id -Maximum).Maximum) + 1
}

function Add-Task {
    if ([string]::IsNullOrWhiteSpace($Text)) { throw 'محتاج نص المهمة: .\task.ps1 add "اعمل كذا"' }
    $tasks = Read-Store
    $task = [pscustomobject]@{
        id      = New-Id -Tasks $tasks
        text    = $Text
        tag     = if ($Tag) { $Tag } else { 'general' }
        due     = if ($DueSet) { $Due.ToString('yyyy-MM-dd') } else { $null }
        done    = $false
        created = (Get-Date).ToString('o')
    }
    if (-not $PSCmdlet.ShouldProcess("#$($task.id) $($task.text)", 'add')) { return }
    Write-Store -Tasks (@($tasks) + $task)
    $task
}`,
          flag: "script",
          try: R`جرّب الفخ بنفسك: اعمل دالة بترجّع [[@( 'a' )]] (قايمة فيها عنصر واحد)، وخزّن ناتجها في متغير، واطبع [[.GetType().Name]] بتاعه. هيطلع [[Object[]]] ولا [[String]]؟`,
          sol: R`~~~powershell
function Get-One { return @('a') }
$r = Get-One
$r.GetType().Name
$r.Count
~~~

~~~text الناتج (PowerShell 7.6)
String
1
~~~

**طلع [[String]] مش [[Object[]]]**، برغم إن الدالة كاتبة [[return @('a')]] صراحة.

**ليه؟** لأن PowerShell بيكتب ناتج الدالة في الـ pipeline، والـ pipeline **بيفرد القوايم**. فالعنصر الواحد بيطلع لوحده.

و [[.Count]] طلعت ١ لأن PowerShell 7 بيدّي [[.Count]] لأي حاجة حتى لو مش قايمة — وده بيخفي المشكلة لحد ما تحاول تعمل [[+]].

**وبقايمة فيها اتنين:**

~~~powershell
function Get-Two { return @('a', 'b') }
(Get-Two).GetType().Name
~~~

~~~text الناتج
Object[]
~~~

**الحل في مكان الاستخدام:**

~~~powershell
$r = @(Get-One)
$r.GetType().Name
~~~

~~~text الناتج
Object[]
~~~`,
          deep: {
            why: R`الفخ ده بيضرب في كل سكربت بيجمّع نتايج. بيشتغل تمام وانت بتجرّب بعنصرين، وبيقع أول ما حد يستخدمه وعنده عنصر واحد. وده بيحصل غالبًا في أول تشغيل عند اليوزر.`,
            how: R`**القاعدة:** الـ pipeline في PowerShell بيفرد القوايم (enumeration). وناتج الدالة بيعدّي في الـ pipeline. يعني:

| ترجّع | بيوصل |
|---|---|
| [[@()]] (فاضية) | [[$null]] |
| [[@('a')]] | [['a']] نص |
| [[@('a','b')]] | [[Object[]]] قايمة |

**تلات حلول:**

1. **[[@( )]] عند الاستخدام** (اللي استخدمناه):
~~~powershell
$tasks = Read-Store
Write-Store -Tasks (@($tasks) + $task)
~~~

2. **[[,]] عند الإرجاع:**
~~~powershell
return , @($raw | ConvertFrom-Json)
~~~
بتمنع الفرد، بس بتلخبط اللي بيقرا الكود.

3. **اكتب النوع على المتغير:**
~~~powershell
[object[]]$tasks = Read-Store
~~~

**الأول هو الأوضح:** أي حتة بتعتمد على إن ده قايمة، لفّها [[@( )]].

**[[[pscustomobject]@{ }]] مقابل [[@{ }]]:**

| | hashtable [[@{ }]] | [[[pscustomobject]@{ }]] |
|---|---|---|
| الترتيب | مش مضمون | زي ما كتبته |
| العرض | Name/Value | جدول بأعمدة |
| الـ pipeline | عنصر واحد | عنصر واحد بخصائص |
| [[Export-Csv]] | بيطلع وحش | أعمدة صح |

للأدوات اللي بترجّع بيانات، **دايمًا** [[[pscustomobject]]].

**[[New-Id]]:**

~~~powershell
([int]($Tasks | Measure-Object -Property id -Maximum).Maximum) + 1
~~~

أكبر id موجود + ١. مش [[$Tasks.Count + 1]]، لأن بعد ما تمسح مهمة، العدّ بيرجع لورا والـ id يتكرر.

و [[[int]]] عشان [[Measure-Object]] بيرجّع [[double]] أحيانًا.

**[[if ($Tag) { $Tag } else { 'general' }]]:** في PowerShell النص الفاضي قيمته [[False]]، فـ [[if ($Tag)]] معناها «لو اليوزر كتب تاج».`,
            when: "أي مرة بتجمّع نتايج من دالة أو أمر وتزوّد عليها.",
            mistakes: R`تجرّب بعنصرين وتفتكر الكود سليم. جرّب بصفر وبواحد كمان.

وتستخدم [[$list.Count + 1]] كـ id، فالأرقام تتكرر بعد الحذف.

وتستخدم hashtable عادية بدل [[[pscustomobject]]]، فالأعمدة تطلع بترتيب عشوائي.`
          },
          teach: R`## الفكرة

نضيف مهمة. والكود الأول وقع، والخطأ اللي طلع بيستاهل درس لوحده.

كل الناتج من تشغيل حقيقي على ويندوز 11 / PowerShell 7.6.

---

## ١. الخطأ اللي حصل بجد

الكود الأول كان كده:

~~~powershell
Write-Store -Tasks ($tasks + $task)
~~~

وأول مهمة اشتغلت تمام. والتانية:

~~~text الناتج
task.ps1:
Line |
   5 |  & $t add "اشتري لبن" -Tag home
     |  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     | Method invocation failed because [System.Management.Automation.PSObject] does not
       contain a method named 'op_Addition'.
~~~

### نقرا الرسالة

| الحتة | معناها |
|---|---|
| [[Method invocation failed]] | محاولة نداء ميثود فشلت |
| [[[System.Management.Automation.PSObject]]] | النوع اللي حاولنا عليه: **object واحد** |
| [[does not contain a method named 'op_Addition']] | مفيش عملية [[+]] معرّفة للنوع ده |

[[op_Addition]] هو الاسم الداخلي لعملية [[+]]. يعني الرسالة بتقول: **«مش عارف أجمع على object»**.

**طب احنا كنا فاكرينه قايمة!**

---

## ٢. ليه القايمة بقت object؟

[[Read-Store]] آخر سطر فيها:

~~~powershell
return @($raw | ConvertFrom-Json)
~~~

كاتبين [[@( )]] صراحة. ومع ذلك لما كان فيه مهمة واحدة، الراجع كان object.

### نثبتها بتجربة صغيرة

~~~powershell
function Get-One { return @('a') }
$r = Get-One
$r.GetType().Name
~~~

~~~text الناتج
String
~~~

**[[String]] مش [[Object[]]].**

~~~powershell
function Get-Two { return @('a', 'b') }
(Get-Two).GetType().Name
~~~

~~~text الناتج
Object[]
~~~

باتنين بقت قايمة.

### السبب

ناتج أي دالة في PowerShell بيعدّي في الـ **pipeline**. والـ pipeline **بيفرد القوايم** (بيبعت العناصر واحد واحد).

~~~text
داخل الدالة          في الـ pipeline        اللي بيوصل
──────────           ───────────────        ───────────
@()                   (مفيش عناصر)          $null
@('a')                'a'                   'a'  ← نص، مش قايمة
@('a','b')            'a' ثم 'b'            Object[]
~~~

فالـ [[@( )]] اللي كتبتها جوه الدالة **اتفكّت** وهي خارجة.

### والحاجة اللي بتخفي المشكلة

~~~powershell
$r = Get-One
$r.Count
~~~

~~~text الناتج
1
~~~

[[.Count]] بتشتغل! لأن PowerShell 7 بيدّي [[.Count]] لأي حاجة. فانت بتفتكر إنها قايمة لحد ما تحاول [[+]].

---

## ٣. الحل

~~~powershell
Write-Store -Tasks (@($tasks) + $task)
~~~

[[@( )]] **عند الاستخدام**، مش عند الإرجاع بس.

~~~powershell
$r = @(Get-One)
$r.GetType().Name
~~~

~~~text الناتج
Object[]
~~~

### تلات حلول ممكنة

| الحل | الشكل | الرأي |
|---|---|---|
| [[@( )]] عند الاستخدام | [[@($tasks) + $task]] | **الأوضح** |
| [[,]] عند الإرجاع | [[return , @(...)]] | شغال بس بيلخبط القارئ |
| نوع صريح على المتغير | اكتب [[[array]]] قبل اسم المتغير | كويس كمان |

**القاعدة:** أي حتة في الكود بتعتمد على إن ده قايمة، لفّها [[@( )]] هناك.

---

## ٤. [[New-Id]]: رقم مش بيتكرر

~~~powershell
function New-Id {
    param([array]$Tasks)
    if ($Tasks.Count -eq 0) { return 1 }
    return ([int]($Tasks | Measure-Object -Property id -Maximum).Maximum) + 1
}
~~~

| الحتة | معناها |
|---|---|
| [[Measure-Object -Property id]] | اشتغل على عمود [[id]] |
| [[-Maximum]] | هات أكبر قيمة |
| [[.Maximum]] | الخاصية اللي فيها الناتج |
| [[[int]]] | حوّل لرقم صحيح (بيرجّع [[double]] أحيانًا) |
| [[+ 1]] | الجديد بعد الأكبر |

### ليه مش [[$Tasks.Count + 1]]؟

~~~text
المهام: 1, 2, 3
تمسح رقم 3        →  المهام: 1, 2   →  Count = 2
تضيف مهمة جديدة   →  Count + 1 = 3  →  تمام
تمسح رقم 2        →  المهام: 1, 3   →  Count = 2
تضيف مهمة جديدة   →  Count + 1 = 3  →  ✘ الرقم 3 موجود!
~~~

أكبر + ١ مبيعملش كده.

---

## ٥. [[[pscustomobject]]]: ليه مش hashtable عادية

~~~powershell
$task = [pscustomobject]@{
    id      = New-Id -Tasks $tasks
    text    = $Text
    tag     = if ($Tag) { $Tag } else { 'general' }
    due     = if ($DueSet) { $Due.ToString('yyyy-MM-dd') } else { $null }
    done    = $false
    created = (Get-Date).ToString('o')
}
~~~

| | [[@{ }]] hashtable | [[[pscustomobject]@{ }]] |
|---|---|---|
| ترتيب الخصائص | مش مضمون | زي ما كتبته |
| العرض | عمودين Name/Value | جدول بأعمدة |
| [[Export-Csv]] | بيطلع وحش | أعمدة صح |
| [[Where-Object tag -eq]] | مش شغالة | شغالة |

للأدوات اللي بترجّع بيانات: **دايمًا [[[pscustomobject]]]**.

### [[if ($Tag) { $Tag } else { 'general' }]]

في PowerShell، النص الفاضي قيمته [[False]] في الشرط. فالسطر معناه «لو اليوزر كتب تاج استخدمه، وإلا [[general]]».

---

## ٦. نشغّلها

~~~powershell
.\task.ps1 add "اكتب التقرير" -Tag work -Due 2026-11-05
~~~

~~~text الناتج
id      : 1
text    : اكتب التقرير
tag     : work
due     : 2026-11-05
done    : False
created : 2026-10-28T04:29:55.7809261+03:00
~~~

والتانية والتالتة:

~~~powershell
.\task.ps1 add "اشتري لبن" -Tag home
.\task.ps1 add "راجع الـ PR" -Tag work
~~~

اشتغلوا من غير أي خطأ بعد إصلاح [[@( )]].

### وفي الآخر السطر ده

~~~powershell
$task
~~~

الدالة **بترجّع المهمة اللي اتعملت**. مش [[Write-Host]]، الـ object نفسه. وده اللي بيخلي ده شغال:

~~~powershell
$t = .\task.ps1 add "حاجة"
$t.id
~~~

ودي فكرة الخطوة اللي بعد الجاية.

---

## الخلاصة

- **الدالة بتفرد القايمة اللي فيها عنصر واحد.** [[return @('a')]] بترجّع نص.
- [[.Count]] بتشتغل على أي حاجة في PowerShell 7، فهي بتخفي المشكلة.
- الحل: [[@( )]] **عند الاستخدام**، زي [[@($tasks) + $task]].
- جرّب كودك بصفر عناصر وبعنصر واحد، مش باتنين بس.
- الـ id = أكبر موجود + ١، مش [[Count + 1]] اللي بيتكرر بعد الحذف.
- [[[pscustomobject]]] مش hashtable: الترتيب بيتحفظ والعرض بيبقى جدول و [[Where-Object]] بتشتغل.
- الدالة بترجّع الـ object، مش بتطبعه.`,
          lines: [
            R`دالة توليد رقم جديد`,
            R`بتاخد المهام الموجودة`,
            R`مفيش مهام: ابدأ من ١`,
            R`أكبر id موجود + ١، عشان الأرقام متتكررش بعد الحذف`,
            R`قفل الدالة`,
            R`دالة الإضافة`,
            R`من غير نص مفيش مهمة: وقّف برسالة بتقول الاستخدام`,
            R`اقرا الموجود`,
            R`اعمل object بخصائص محددة ومرتبة`,
            R`رقم المهمة`,
            R`نصها`,
            R`التاج، والافتراضي general لو اليوزر مكتبش`,
            R`تاريخ التسليم لو اتكتب، وإلا فاضي`,
            R`جديدة يعني لسه مخلصتش`,
            R`وقت الإنشاء بصيغة ثابتة`,
            R`قفل الـ object`,
            R`بوابة -WhatIf قبل أي كتابة`,
            R`احفظ، و @( ) هنا هي اللي بتمنع فخ العنصر الواحد`,
            R`ورجّع المهمة نفسها كـ object مش نص`,
            R`قفل الدالة`
          ]
        },

        {
          cmd: "مشروع ٢ — فخ النطاق",
          title: "بعتّ -Due والقيمة ضاعت: $PSBoundParameters جوه الدالة",
          desc: R`تاني فخ وقعنا فيه، وده أخبث من الأول لأنه **مبيرميش error**: بتكتب [[-Due 2026-11-05]] والمهمة بتتحفظ من غير تاريخ، وخلاص.

الكود كان:

[[due = if ($PSBoundParameters.ContainsKey('Due')) { $Due.ToString('yyyy-MM-dd') } else { $null }]]

ويبان منطقي: «لو اليوزر بعت [[-Due]]، استخدمه». بس ده كان **جوه دالة** [[Add-Task]].

و [[$PSBoundParameters]] متغير **لكل دالة لوحدها**: جوه [[Add-Task]] هو بتاع [[Add-Task]] نفسها، واللي مليهاش parameters أصلًا، فهو فاضي دايمًا والشرط دايمًا [[False]].

الحل: احسبها في **مستوى السكربت** (قبل الدوال) وخزّنها في متغير:

[[$DueSet = $PSBoundParameters.ContainsKey('Due')]]

وده بيفتح موضوع أكبر: **المتغيرات في PowerShell**. الدالة **بتشوف** متغيرات اللي ناداها (عشان كده [[$Text]] و [[$Tag]] شغالين جواها من غير ما نمرّرهم)، بس **لما تكتب فيها** بتعمل نسخة محلية جديدة والأصل مبيتغيرش. ولو عايز تغيّر الأصل: [[$script:الاسم]].

و [[$PSBoundParameters]] مش بيشوف القيم الافتراضية: هو بيحتوي اللي **اليوزر كتبه** بس. وده بالظبط اللي كنا عايزينه.`,
          example: R`param([string]$Name, [int]$Age)

function Show-Inner {
    "داخل الدالة: " + ($PSBoundParameters.Keys -join ',') + " (عدد=" + $PSBoundParameters.Count + ")"
}

"مستوى السكربت: " + ($PSBoundParameters.Keys -join ',') + " (عدد=" + $PSBoundParameters.Count + ")"
Show-Inner`,
          flag: "script",
          try: R`احفظ المثال باسم [[scope-demo.ps1]] وشغّله بـ [[.\scope-demo.ps1 -Name Ali -Age 30]]. السطرين هيطلعوا إيه؟ وبعدين ضيف [[param($x)]] جوه الدالة وناديها بـ [[Show-Inner -x 1]] وشوف الفرق.`,
          sol: R`~~~text الناتج (PowerShell 7.6)
PS> .\scope-demo.ps1 -Name Ali -Age 30
مستوى السكربت: Name,Age (عدد=2)
داخل الدالة:  (عدد=0)
~~~

**مستوى السكربت شايف الاتنين، والدالة شايفة صفر.**

[[$PSBoundParameters]] مش متغير عام؛ كل نطاق (سكربت أو دالة) عنده نسخته الخاصة اللي فيها **الـ parameters بتاعته هو**. ودالة ملهاش parameters = قاموس فاضي.

ولو ضفت [[param($x)]] للدالة وناديتها بـ [[Show-Inner -x 1]]:

~~~text
داخل الدالة: x (عدد=1)
~~~

شافت بتاعتها هي بس، مش بتاعة السكربت.

**والنتيجة في أداتنا:** الشرط كان [[False]] دايمًا، والتاريخ مكانش بيتحفظ أبدًا، **من غير أي رسالة خطأ**.`,
          deep: {
            why: R`الأخطاء اللي بترمي رسالة بتتصلح بسرعة. الأخطاء اللي بتشتغل وتدّي نتيجة غلط في صمت هي اللي بتاكل ساعات. والفخ ده من النوع التاني.`,
            how: R`**قواعد النطاق (scope) في PowerShell:**

| العملية | النتيجة |
|---|---|
| الدالة **تقرا** متغير من اللي ناداها | شغّالة |
| الدالة **تكتب** في متغير من بره | بتعمل **نسخة محلية**، والأصل زي ما هو |
| [[$script:x = 5]] | بتغيّر متغير السكربت |
| [[$global:x = 5]] | بتغيّر متغير الجلسة كلها |

~~~powershell
$n = 1
function Bump { $n = $n + 1; "جوه: $n" }
Bump
"بره: $n"
~~~

بيطبع [[جوه: 2]] و [[بره: 1]].

**المتغيرات اللي بتبان مختلفة في كل نطاق:**

| المتغير | في الدالة معناه |
|---|---|
| [[$PSBoundParameters]] | parameters **الدالة** |
| [[$PSCmdlet]] | الدالة لو عليها [[CmdletBinding]]، وإلا بتاع السكربت |
| [[$MyInvocation]] | نداء **الدالة** |
| [[$args]] | الزيادة اللي اتبعتت **للدالة** |
| [[$_]] | العنصر الحالي في الـ pipeline الحالي |

**تلات حلول للمشكلة:**

1. احسب في مستوى السكربت وخزّن (اللي عملناه):
~~~powershell
$DueSet = $PSBoundParameters.ContainsKey('Due')
~~~

2. مرّر الـ parameter للدالة صراحة:
~~~powershell
function Add-Task { param([datetime]$Due, [bool]$DueSet) ... }
~~~
أنضف وأسهل في الاختبار، بس أطول.

3. اقرا متغير السكربت صراحة:
~~~powershell
$script:PSBoundParameters   # مش بتشتغل: PSBoundParameters مش متغير سكربت عادي
~~~
دي **مش** حل، ذكرناها عشان متجربهاش.

**بديل من غير [[$PSBoundParameters]] خالص:** خلي القيمة الافتراضية مميزة.

~~~powershell
param([datetime]$Due = [datetime]::MinValue)
...
if ($Due -ne [datetime]::MinValue) { ... }
~~~

شغالة، بس [[$PSBoundParameters]] أوضح في النية.`,
            when: "أي مرة تحتاج تعرف «اليوزر كتب الـ parameter ده ولا دي القيمة الافتراضية؟».",
            mistakes: R`تستخدم [[$PSBoundParameters]] جوه دالة وتتوقعها تشوف parameters السكربت.

وتعدّل متغير جوه دالة وتتوقع التغيير يبان بره.

وتستخدم [[if ($Due)]] بدل [[ContainsKey]]: التاريخ الفاضي بيبقى [[01/01/0001]] وده قيمته [[True]] في الشرط، فالشرط هيعدّي دايمًا.`
          },
          teach: R`## الفكرة

فخ تاني من التجربة الحقيقية، ومبيرميش error — بيدّيك نتيجة غلط في صمت.

الناتج من تشغيل حقيقي على ويندوز 11 / PowerShell 7.6.

---

## ١. الأعراض

~~~powershell
.\task.ps1 add "اكتب التقرير" -Tag work -Due 2026-11-05
~~~

~~~text الناتج (قبل الإصلاح)
id      : 1
text    : اكتب التقرير
tag     : work
due     :
done    : False
created : 2026-10-28T04:29:55.7809261+03:00
~~~

[[tag]] اتحفظ. [[due]] **فاضي**، برغم إننا بعتنا [[-Due 2026-11-05]].

ومفيش ولا رسالة خطأ.

---

## ٢. الكود المتّهم

~~~powershell
function Add-Task {
    ...
    due = if ($PSBoundParameters.ContainsKey('Due')) { $Due.ToString('yyyy-MM-dd') } else { $null }
    ...
}
~~~

[[$PSBoundParameters]] قاموس فيه الـ parameters **اللي اليوزر كتبها فعلًا** (مش اللي أخدت قيمتها الافتراضية). و [[.ContainsKey('Due')]] بتسأل «اليوزر كتب [[-Due]]؟».

المنطق سليم. المشكلة في **فين** الكود مكتوب.

---

## ٣. نثبت المشكلة بأصغر مثال

~~~powershell
param([string]$Name, [int]$Age)

function Show-Inner {
    "داخل الدالة: " + ($PSBoundParameters.Keys -join ',') + " (عدد=" + $PSBoundParameters.Count + ")"
}

"مستوى السكربت: " + ($PSBoundParameters.Keys -join ',') + " (عدد=" + $PSBoundParameters.Count + ")"
Show-Inner
~~~

| الحتة | معناها |
|---|---|
| [[.Keys]] | أسامي الـ parameters اللي اتبعتت |
| [[-join ',']] | حوّل القايمة لنص بفواصل |
| [[.Count]] | عددهم |

~~~powershell
.\scope-demo.ps1 -Name Ali -Age 30
~~~

~~~text الناتج
مستوى السكربت: Name,Age (عدد=2)
داخل الدالة:  (عدد=0)
~~~

### النتيجة

| المكان | [[$PSBoundParameters]] |
|---|---|
| مستوى السكربت | [[Name, Age]] — اتنين |
| جوه [[Show-Inner]] | **فاضي** — صفر |

**[[$PSBoundParameters]] مش متغير عام.** كل نطاق عنده نسخته، وفيها الـ parameters بتاعته **هو**. ودالة ملهاش [[param()]] = قاموس فاضي = [[ContainsKey]] دايمًا [[False]].

---

## ٤. الحل

نحسبها **مرة واحدة في مستوى السكربت**، قبل أي دالة:

~~~powershell
$ErrorActionPreference = 'Stop'
$DueSet = $PSBoundParameters.ContainsKey('Due')
~~~

وجوه الدالة:

~~~powershell
due = if ($DueSet) { $Due.ToString('yyyy-MM-dd') } else { $null }
~~~

### نجرّب تاني

~~~text الناتج بعد الإصلاح
id text         tag  due        done
-- ----         ---  ---        ----
 1 اكتب التقرير work 2026-11-05 False
 2 اشتري لبن    home            False
 3 راجع الـ PR  work            False
~~~

[[due]] اتحفظ للمهمة الأولى، وفاضي للتانية والتالتة اللي مبعتناش ليهم تاريخ. تمام.

---

## ٥. طب ليه [[$Text]] و [[$Tag]] شغالين جوه الدالة؟

~~~powershell
function Add-Task {
    ...
    text = $Text          # ← دي شغالة!
    tag  = if ($Tag) { $Tag } else { 'general' }
    ...
}
~~~

مش متناقض مع اللي فات؟ لأ. **الدالة بتشوف متغيرات اللي ناداها.** [[$Text]] متغير عادي في نطاق السكربت، والدالة بتقراه.

[[$PSBoundParameters]] مختلف لأنه **متغير تلقائي** بيتعمل من جديد في كل نطاق، فنسخة الدالة بتغطّي نسخة السكربت.

### القراية شغالة، الكتابة لأ

~~~powershell
$n = 1
function Bump { $n = $n + 1; "جوه: $n" }
Bump
"بره: $n"
~~~

~~~text الناتج
جوه: 2
بره: 1
~~~

| العملية | النتيجة |
|---|---|
| الدالة **تقرا** [[$n]] | شافت 1 ✔ |
| الدالة **تكتب** [[$n]] | عملت نسخة محلية؛ الأصل فضل 1 |

ولو عايز تغيّر الأصل فعلًا:

~~~powershell
function Bump { $script:n = $n + 1 }
~~~

---

## ٦. متغيرات تانية بتتغير حسب النطاق

| المتغير | جوه الدالة معناه |
|---|---|
| [[$PSBoundParameters]] | parameters **الدالة** |
| [[$MyInvocation]] | نداء **الدالة** |
| [[$args]] | الزيادة اللي راحت **للدالة** |
| [[$PSCmdlet]] | بتاع الدالة لو عليها [[CmdletBinding]] |
| [[$_]] | العنصر الحالي في الـ pipeline **الحالي** |

لو محتاج أي واحد منهم من مستوى أعلى، خزّنه في متغير عادي الأول.

---

## ٧. بديل من غير [[$PSBoundParameters]]

~~~powershell
param([datetime]$Due = [datetime]::MinValue)
...
if ($Due -ne [datetime]::MinValue) { ... }
~~~

قيمة افتراضية **مميزة** تعرف منها إن اليوزر مكتبش حاجة. شغالة، بس [[$PSBoundParameters]] أوضح.

### واللي **مينفعش**

~~~powershell
if ($Due) { ... }
~~~

التاريخ الفاضي في PowerShell هو [[01/01/0001 00:00:00]]، ودي **مش** [[$null]]، فقيمتها [[True]] في الشرط. يعني الشرط هيعدّي دايمًا والعكس هيحصل: كل المهام هتتحفظ بتاريخ [[0001-01-01]].

---

## الخلاصة

- [[$PSBoundParameters]] **لكل نطاق لوحده**. جوه دالة ملهاش parameters هو فاضي.
- الحل: احسبه في مستوى السكربت وخزّنه ([[$DueSet = ...]]).
- الدالة **بتقرا** متغيرات اللي ناداها، بس لما **تكتب** بتعمل نسخة محلية. [[$script:x]] بتغيّر الأصل.
- نفس القاعدة على [[$MyInvocation]] و [[$args]] و [[$PSCmdlet]].
- [[if ($Due)]] مش بديل: التاريخ الفاضي قيمته [[True]].
- الأخطاء الصامتة أغلى من اللي بترمي رسالة. لما حاجة متتحفظش، شك في النطاق.`,
          lines: [
            R`السكربت بياخد parameter نصي ورقم`,
            R`دالة بتطبع الـ parameters اللي هي شايفاها`,
            R`الأسامي والعدد من نسخة الدالة`,
            R`قفل الدالة`,
            R`ونفس الطباعة من مستوى السكربت`,
            R`نادي الدالة عشان نقارن السطرين`
          ]
        },

        {
          cmd: "مشروع ٢ — رجّع objects مش نصوص",
          title: "الفرق اللي بيخلي أداتك تتركّب على أي حاجة",
          desc: R`دي أهم فكرة في PowerShell كله، وهي اللي بتفرق أداة بتتستخدم مرة وأداة بتتركّب على غيرها.

**الأداة بتاعتك لازم ترجّع objects، مش نصوص مطبوعة.**

لو كتبت [[Write-Host "#$($t.id) $($t.text)"]]، اللي بيشوفه اليوزر نص ملوّن، وخلاص. مش هيقدر يفلتره ولا يصدّره ولا يعدّه.

لو رجّعت الـ object نفسه، كل أدوات PowerShell بتشتغل عليه مجانًا:
[[.\task.ps1 list | Where-Object tag -eq work]]
[[.\task.ps1 list | Group-Object tag]]
[[.\task.ps1 list | Export-Csv tasks.csv]]
[[.\task.ps1 list | Format-Table id, text]]

**الفرق في الكود سطر واحد:** [[$tasks]] بدل [[Write-Host $tasks]].

و [[Get-Task]] بتبني الفلترة بالتدريج:
[[if ($Tag) { $tasks = @($tasks | Where-Object tag -eq $Tag) }]]
[[if ($Open) { $tasks = @($tasks | Where-Object { -not $_.done }) }]]

كل فلتر بيتطبق لو اليوزر طلبه. و [[@( )]] حوالين كل واحد (لنفس فخ العنصر الواحد).

وفي الآخر [[Sort-Object done, id]]: بيرتب بعمودين — اللي لسه مخلصش الأول، وبعدين بالرقم.

**والعرض؟** سيبه لليوزر. [[Format-Table]] و [[Format-List]] شغلهم كده، وأداتك مش لازم تعرف حاجة عنه.`,
          example: R`function Get-Task {
    $tasks = Read-Store
    if ($Tag)  { $tasks = @($tasks | Where-Object tag -eq $Tag) }
    if ($Open) { $tasks = @($tasks | Where-Object { -not $_.done }) }
    $tasks | Sort-Object done, id
}`,
          flag: "script",
          try: R`بعد ما تضيف كام مهمة، جرّب التلاتة دول: [[.\task.ps1 list | Where-Object tag -eq work]]، و [[.\task.ps1 list | Group-Object tag]]، و [[.\task.ps1 list | Export-Csv t.csv -NoTypeInformation]]. التلاتة شغالين من غير ما تكتب حرف زيادة في الأداة.`,
          sol: R`~~~text الناتج (PowerShell 7.6، تلات مهام)
PS> .\task.ps1 list | Where-Object tag -eq work | Select-Object -ExpandProperty text
اكتب التقرير
راجع الـ PR

PS> .\task.ps1 list | Group-Object tag | Select-Object Name, Count

Name Count
---- -----
home     1
work     2

PS> .\task.ps1 list | Export-Csv t.csv -NoTypeInformation -Encoding utf8
PS> Get-Content t.csv
"id","text","tag","due","done","created"
"1","اكتب التقرير","work","2026-11-05","False","10/28/2026 4:30:24 AM"
"3","راجع الـ PR","work",,"False","10/28/2026 4:30:24 AM"
"2","اشتري لبن","home",,"True","10/28/2026 4:30:24 AM"
~~~

**التلاتة اشتغلوا، وإحنا مكتبناش ولا سطر عن الفلترة ولا التجميع ولا الـ CSV.** دي كلها جت مجانًا لأن الأداة بترجّع objects.

ولاحظ [[created]] في الـ CSV: طلع [[10/28/2026 4:30:24 AM]] مش الصيغة اللي خزّناها. السبب إن [[ConvertFrom-Json]] شاف النص بصيغة ISO فحوّله لـ [[datetime]] حقيقي، و [[Export-Csv]] بيعرضه بصيغة الجهاز. لو عايزه يفضل نص، خزّنه بصيغة مش ISO أو حوّله بإيدك عند العرض.`,
          deep: {
            why: R`ده الفرق بين PowerShell و bash. في bash كل حاجة نص، فأي أداة محتاجة [[awk]] و [[cut]] عشان حد تاني يستخدمها. في PowerShell الأدوات بتتكلم objects، فأي أداة بترجّع objects بتتركّب مع الـ ٦١ cmdlet اللي في الموديول الأساسي من غير شغل زيادة.`,
            how: R`**الفرق في الكود:**

~~~powershell
# نصوص: بتموت عند الشاشة
foreach ($t in $tasks) { Write-Host "#$($t.id) $($t.text)" }

# objects: بتكمّل
$tasks
~~~

**الحاجات اللي بتيجي مجانًا لما ترجّع objects:**

| تكتب | بتاخد |
|---|---|
| [[\| Where-Object tag -eq work]] | فلترة |
| [[\| Sort-Object due]] | ترتيب |
| [[\| Group-Object tag]] | تجميع وعدّ |
| [[\| Measure-Object]] | إحصاء |
| [[\| Select-Object -First 5]] | أول ٥ |
| [[\| Export-Csv]] / [[ConvertTo-Json]] | تصدير |
| [[\| Format-Table id, text]] | عرض زي ما تحب |
| [[\| Out-GridView]] | جدول تفاعلي |

**ثلات قواعد:**

1. **[[Write-Host]] للرسايل بس** (تم، فشل، تحذير). مش للبيانات.
2. **[[Write-Output]] أو المتغير لوحده** للبيانات.
3. **متنسّقش جوه الأداة.** [[Format-Table]] بيحوّل الـ objects لحاجة مش قابلة للمعالجة، فلو حطيتها جوه الأداة بتقفل الباب على اللي بعدك.

~~~powershell
# غلط: الأداة بتنسّق
function Get-Task { ... ; $tasks | Format-Table }

# صح: اليوزر بينسّق
.\task.ps1 list | Format-Table id, text
~~~

**[[Where-Object]] بشكلين:**

~~~powershell
Where-Object tag -eq $Tag              # الشكل المختصر: خاصية، عامل، قيمة
Where-Object { -not $_.done }          # الشكل الكامل: script block
~~~

المختصر أوضح للمقارنة البسيطة، والكامل لازم لما الشرط فيه عملية (زي [[-not]]).

**[[Sort-Object done, id]]:** بيرتب بعمودين بالترتيب. [[$false]] قبل [[$true]]، فاللي لسه مخلصش بيطلع الأول.

**فخ التواريخ مع [[ConvertFrom-Json]]:** بيحوّل أي نص شكله ISO 8601 لـ [[datetime]] تلقائيًا. ده كويس للمقارنة ([[$t.created -gt (Get-Date).AddDays(-7)]]) ومزعج لو كنت عايزه نص.`,
            when: "كل أداة تكتبها. القاعدة دي ملهاش استثناء تقريبًا.",
            mistakes: R`[[Write-Host]] للبيانات. الناتج بيموت على الشاشة؛ حتى [[$x = .\tool.ps1]] مش هتمسكه.

و [[Format-Table]] جوه الأداة: بعدها الـ pipeline بيشوف كائنات تنسيق مش بياناتك.

وترجّع نص منسّق زي [["#1 اكتب التقرير"]] وتفتكر إنك سهّلت. انت صعّبت: اللي بعدك هيحتاج regex.`
          },
          teach: R`## الفكرة

**أهم قاعدة في PowerShell:** أداتك بترجّع **objects** مش نصوص. سطر واحد في الكود، وبيفتح عشر حاجات مجانية.

الناتج من تشغيل حقيقي على ويندوز 11 / PowerShell 7.6 بتلات مهام.

---

## ١. [[Get-Task]]

~~~powershell
function Get-Task {
    $tasks = Read-Store
    if ($Tag)  { $tasks = @($tasks | Where-Object tag -eq $Tag) }
    if ($Open) { $tasks = @($tasks | Where-Object { -not $_.done }) }
    $tasks | Sort-Object done, id
}
~~~

### سطر سطر

**[[$tasks = Read-Store]]** — هات الكل.

**[[if ($Tag) { ... }]]** — فلتر بالتاج **لو** اليوزر طلب. النص الفاضي قيمته [[False]]، فالشرط معناه «لو اتكتب تاج».

**[[Where-Object tag -eq $Tag]]** — الشكل المختصر: خاصية، عامل، قيمة. من غير [[{ }]] ولا [[$_]].

**[[if ($Open) { ... }]]** — فلتر تاني فوق الأول. الفلاتر بتتراكم.

**[[Where-Object { -not $_.done }]]** — هنا الشكل **الكامل** لازم، لأن فيه عملية ([[-not]]) مش مجرد مقارنة.

**[[@( )]] حوالين كل فلتر** — نفس فخ العنصر الواحد من الخطوة ٢.

**[[$tasks | Sort-Object done, id]]** — رتّب بعمودين: [[done]] الأول ([[$false]] قبل [[$true]]، يعني اللي لسه مخلصش فوق)، وبعدين [[id]].

### والسطر الأهم هو اللي **مش** موجود

مفيش [[Write-Host]]. مفيش [[Format-Table]]. الدالة بترمي الـ objects في الـ pipeline وخلاص.

---

## ٢. العرض الافتراضي

~~~powershell
.\task.ps1 list | Format-Table -AutoSize id, text, tag, due, done
~~~

~~~text الناتج
id text         tag  due        done
-- ----         ---  ---        ----
 1 اكتب التقرير work 2026-11-05 False
 2 اشتري لبن    home            False
 3 راجع الـ PR  work            False
~~~

لاحظ إن **اليوزر** هو اللي اختار [[Format-Table]] والأعمدة. الأداة مش عارفة حاجة عن ده.

---

## ٣. المكسب: تلات حاجات مجانية

### فلترة

~~~powershell
.\task.ps1 list | Where-Object tag -eq work | Select-Object -ExpandProperty text
~~~

~~~text الناتج
اكتب التقرير
راجع الـ PR
~~~

### تجميع وعدّ

~~~powershell
.\task.ps1 list | Group-Object tag | Select-Object Name, Count
~~~

~~~text الناتج
Name Count
---- -----
home     1
work     2
~~~

### تصدير

~~~powershell
.\task.ps1 list | Export-Csv t.csv -NoTypeInformation -Encoding utf8
Get-Content t.csv
~~~

~~~text الناتج
"id","text","tag","due","done","created"
"1","اكتب التقرير","work","2026-11-05","False","10/28/2026 4:30:24 AM"
"3","راجع الـ PR","work",,"False","10/28/2026 4:30:24 AM"
"2","اشتري لبن","home",,"True","10/28/2026 4:30:24 AM"
~~~

**مكتبناش حرف واحد عن الفلترة ولا التجميع ولا الـ CSV.** الأعمدة طلعت صح لأن الأداة بترجّع [[[pscustomobject]]].

---

## ٤. لو كنا كتبنا نصوص

~~~powershell
# النسخة الوحشة
foreach ($t in $tasks) { Write-Host "#$($t.id) $($t.text) [$($t.tag)]" }
~~~

~~~text الناتج
#1 اكتب التقرير [work]
#2 اشتري لبن [home]
#3 راجع الـ PR [work]
~~~

يبان أحلى في الشاشة. وبعدين؟

~~~powershell
.\task.ps1 list | Where-Object tag -eq work
~~~

~~~text الناتج
~~~

**فاضي.** [[Write-Host]] بيكتب على الشاشة مباشرة ومش بيحط حاجة في الـ pipeline. وحتى ده مش هيشتغل:

~~~powershell
$x = .\task.ps1 list
$x.Count
~~~

~~~text الناتج
0
~~~

ولو كنا استخدمنا [[Write-Output]] للنصوص، كان هيوصل نص، واللي عايز يفلتر هيحتاج regex على [[[work]]].

---

## ٥. القواعد التلاتة

| | استخدم | لإيه |
|---|---|---|
| **بيانات** | [[$obj]] أو [[Write-Output]] | اللي الأداة بترجّعه |
| **رسايل** | [[Write-Host]] | «تم» و «اتلغى» |
| **تحذير** | [[Write-Warning]] | مشكلة مش موقفة |
| **خطأ** | [[Write-Error]] / [[throw]] | مشكلة موقفة |
| **تفاصيل** | [[Write-Verbose]] | تظهر بـ [[-Verbose]] بس |

**والقاعدة الذهبية: متنسّقش جوه الأداة.**

~~~powershell
# غلط
function Get-Task { ...; $tasks | Format-Table }

# صح
function Get-Task { ...; $tasks }
~~~

[[Format-Table]] بيحوّل الـ objects لكائنات تنسيق داخلية. أي [[Where-Object]] بعدها مش هيلاقي خصائصك.

---

## ٦. فخ صغير: التواريخ

في الـ CSV، [[created]] طلع [[10/28/2026 4:30:24 AM]] مش [[2026-10-28T04:30:24...]] اللي خزّناها.

**ليه؟** [[ConvertFrom-Json]] بيشوف نص شكله ISO 8601 فبيحوّله لـ [[datetime]] حقيقي تلقائيًا، و [[Export-Csv]] بيعرض الـ datetime بصيغة الجهاز.

| | حلو ولا وحش |
|---|---|
| تقدر تكتب [[$t.created -gt (Get-Date).AddDays(-7)]] | حلو جدًا |
| العرض بيتغيّر بلغة الجهاز | مزعج لو عايزه ثابت |

لو عايزه ثابت في التصدير:

~~~powershell
.\task.ps1 list | Select-Object id, text, @{n='created'; e={ $_.created.ToString('o') }} | Export-Csv t.csv
~~~

[[@{n=...; e={...}}]] عمود محسوب: [[n]] الاسم و [[e]] التعبير.

---

## الخلاصة

- **رجّع objects، متطبعش نصوص.** الفرق سطر واحد والمكسب كل أدوات PowerShell.
- [[Write-Host]] للرسايل بس؛ البيانات بتضيع لو عدّت منه.
- متحطش [[Format-Table]] جوه الأداة — ده قرار اليوزر.
- [[Where-Object]] ليها شكل مختصر (خاصية عامل قيمة) وشكل كامل بـ [[{ $_ }]] للشروط المركّبة.
- [[Sort-Object a, b]] بترتب بعمودين، و [[$false]] قبل [[$true]].
- لفّ كل فلتر بـ [[@( )]] عشان فخ العنصر الواحد.
- [[ConvertFrom-Json]] بيحوّل تواريخ ISO لـ [[datetime]] لوحده.`,
          lines: [
            R`دالة العرض`,
            R`هات كل المهام من الملف`,
            R`فلتر بالتاج لو اليوزر كتبه، والشكل المختصر لـ Where-Object`,
            R`فلتر المفتوحة بس، وهنا الشكل الكامل لازم لأن فيه -not`,
            R`رتّب بعمودين وارمي الـ objects في الـ pipeline من غير طباعة ولا تنسيق`,
            R`قفل الدالة`
          ]
        },

        {
          cmd: "مشروع ٢ — done و rm والأخطاء",
          title: "تعدّل وتمسح، وترمي رسالة مفيدة لما الرقم مش موجود",
          desc: R`فاضل التعديل والحذف. والجديد هنا هو **التعامل مع المدخل الغلط**: اليوزر هيكتب [[done -Id 99]] ومفيش مهمة بالرقم ده.

القاعدة: **دوّر الأول، وتأكد، وبعدين عدّل.**

[[$hit = $tasks | Where-Object id -eq $Id]] بتدوّر.
[[if (-not $hit) { throw "مفيش مهمة رقمها $Id" }]] بتوقف برسالة **فيها الرقم** اللي اليوزر كتبه. الرسالة اللي بتقول «غلط» من غير تفاصيل ملهاش قيمة.
[[if ($hit.done) { Write-Warning "..."; return }]] الحالة اللي مش خطأ بس مش عايزين نكررها: [[Write-Warning]] مش [[throw]].

وبعد كده [[$hit.done = $true]] — **وبتشتغل على الأصل**، لأن [[$hit]] إشارة لنفس الـ object اللي في [[$tasks]] مش نسخة منه. فـ [[Write-Store -Tasks $tasks]] بتحفظ التعديل.

والحذف بيشتغل بالعكس: [[@($tasks | Where-Object id -ne $Id)]] — خد كل حاجة **ما عدا** دي.

والاتنين وراهم [[ShouldProcess]]، فـ [[-WhatIf]] بتشتغل عليهم.

وفي الآخر بيرجّعوا [[$hit]]: المهمة اللي اتعدّلت أو اتمسحت، كـ object زي أي حاجة في الأداة.`,
          example: R`function Complete-Task {
    $tasks = Read-Store
    $hit = $tasks | Where-Object id -eq $Id
    if (-not $hit) { throw "مفيش مهمة رقمها $Id" }
    if ($hit.done) { Write-Warning "#$Id خلصانة أصلًا"; return }
    if (-not $PSCmdlet.ShouldProcess("#$Id $($hit.text)", 'done')) { return }
    $hit.done = $true
    Write-Store -Tasks $tasks
    $hit
}

function Remove-Task {
    $tasks = Read-Store
    $hit = $tasks | Where-Object id -eq $Id
    if (-not $hit) { throw "مفيش مهمة رقمها $Id" }
    if (-not $PSCmdlet.ShouldProcess("#$Id $($hit.text)", 'remove')) { return }
    Write-Store -Tasks @($tasks | Where-Object id -ne $Id)
    $hit
}`,
          flag: "script",
          try: R`جرّب [[.\task.ps1 done -Id 99]] على ملف فيه تلات مهام بس. وبعدين [[.\task.ps1 rm -Id 1 -WhatIf]] وبعدها [[.\task.ps1 list]] واتأكد إن المهمة لسه موجودة.`,
          sol: R`~~~text الناتج (PowerShell 7.6، اتشغّل فعلًا)
PS> .\task.ps1 done -Id 99
Exception: ...\task.ps1:84
Line |
  84 |      if (-not $hit) { throw "مفيش مهمة رقمها $Id" }
     |                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~
     | مفيش مهمة رقمها 99

PS> .\task.ps1 rm -Id 1 -WhatIf
What if: Performing the operation "remove" on target "#1 اكتب التقرير".

PS> (.\task.ps1 list).Count
3
~~~

**الرسالة فيها الرقم [[99]]**، فاليوزر عارف على طول إنه كتب رقم مش موجود (مش إن الأداة بايظة).

و [[-WhatIf]] طبعت العملية والهدف، والعدد فضل **٣**: محصلش حذف.

ولاحظ إن الـ [[What if]] بتعرض نص المهمة كمان ([[#1 اكتب التقرير]])، فانت متأكد إنك بتمسح اللي قاصده مش رقم غلط.`,
          deep: {
            why: R`أغلب الوقت اللي بيضيع في أدوات الترمنال سببه رسالة خطأ ملهاش معنى. «حصل خطأ» مش رسالة. «مفيش مهمة رقمها 99» رسالة.`,
            how: R`**[[throw]] مقابل [[Write-Warning]] مقابل [[Write-Error]]:**

| | امتى | بيوقف؟ |
|---|---|---|
| [[throw]] | العملية مستحيلة | أيوه |
| [[Write-Error]] | العملية فشلت بس ممكن نكمّل على غيرها | حسب [[$ErrorActionPreference]] |
| [[Write-Warning]] | حاجة مش مثالية بس مش فشل | لأ |

عشان كده [[-Id 99]] بترمي، و «خلصانة أصلًا» بتحذّر.

**[[$hit]] إشارة مش نسخة:**

~~~powershell
$hit = $tasks | Where-Object id -eq $Id
$hit.done = $true
Write-Store -Tasks $tasks     # التعديل موجود في $tasks
~~~

[[Where-Object]] **مبينسخش** الـ objects، بيرجّع إشارات لنفسها. فتعديل [[$hit]] بيعدّل العنصر اللي جوه [[$tasks]].

ده مريح هنا، بس خد بالك منه: لو كنت عايز نسخة مستقلة، لازم تعملها بنفسك.

**الحذف بالعكس:**

~~~powershell
@($tasks | Where-Object id -ne $Id)
~~~

[[-ne]] بدل [[-eq]]: «كل حاجة ما عدا دي». أنضف من إنك تلف وتبني قايمة جديدة.

**ليه [[$hit]] في الآخر؟**

عشان الأداة تفضل متسقة: كل أمر بيرجّع object.

~~~powershell
$done = .\task.ps1 done -Id 1
"خلّصت: $($done.text)"
~~~

**[[-Id]] من غير قيمة افتراضية:** لو اليوزر كتب [[done]] من غير [[-Id]]، [[$Id]] هتبقى [[0]]، ومفيش مهمة بالرقم ده، فالرسالة هتطلع «مفيش مهمة رقمها 0». مقبول. والأنضف إنك تستخدم parameter sets تخلي [[-Id]] إجباري مع [[done]] و [[rm]] بس.`,
            when: "أي أمر بياخد معرّف من اليوزر: id، أو اسم، أو مسار.",
            mistakes: R`[[throw "خطأ"]] من غير تفاصيل. حط القيمة اللي سببت المشكلة في الرسالة.

وتعدّل وتحفظ من غير ما تتأكد إن العنصر موجود، فتكتب ملف ناقص.

وتفتكر إن [[Where-Object]] بينسخ. هو بيرجّع إشارات.

وتستخدم [[throw]] لحاجة مش خطأ (زي «خلصانة أصلًا»)، فالسكربت يقف من غير داعي.`
          },
          teach: R`## الفكرة

التعديل والحذف سهلين. الجزء اللي بيفرق هو **إيه اللي بيحصل لما اليوزر يكتب رقم مش موجود**.

الناتج من تشغيل حقيقي على ويندوز 11 / PowerShell 7.6.

---

## ١. [[Complete-Task]]: الترتيب هو الدرس

~~~powershell
function Complete-Task {
    $tasks = Read-Store
    $hit = $tasks | Where-Object id -eq $Id
    if (-not $hit) { throw "مفيش مهمة رقمها $Id" }
    if ($hit.done) { Write-Warning "#$Id خلصانة أصلًا"; return }
    if (-not $PSCmdlet.ShouldProcess("#$Id $($hit.text)", 'done')) { return }
    $hit.done = $true
    Write-Store -Tasks $tasks
    $hit
}
~~~

~~~text الترتيب
١. اقرا
٢. دوّر
٣. موجود؟     لأ  →  throw
٤. خلصانة؟    أيوه →  warn وارجع
٥. -WhatIf؟   أيوه →  ارجع
٦. عدّل
٧. احفظ
٨. رجّع
~~~

**التحقق قبل التعديل دايمًا.** غير كده ممكن تحفظ ملف وانت مش عارف عملت إيه.

---

## ٢. الرسالة اللي فيها معلومة

~~~powershell
.\task.ps1 done -Id 99
~~~

~~~text الناتج
Exception: ...\task.ps1:84
Line |
  84 |      if (-not $hit) { throw "مفيش مهمة رقمها $Id" }
     |                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~
     | مفيش مهمة رقمها 99
~~~

### قارن

| الرسالة | اليوزر يفهم إيه |
|---|---|
| [[حصل خطأ]] | ولا حاجة |
| [[Task not found]] | أنهي واحدة؟ |
| [[مفيش مهمة رقمها 99]] | كتب رقم غلط، يشوف [[list]] |

**حط القيمة اللي سببت المشكلة في الرسالة.** تكلفتها [[$Id]] في النص.

> PowerShell كمان بيوريك **السطر** اللي رمى، ودي من [[throw]] مجانًا.

---

## ٣. [[throw]] ولا [[Write-Warning]]؟

~~~powershell
if (-not $hit)  { throw "مفيش مهمة رقمها $Id" }
if ($hit.done)  { Write-Warning "#$Id خلصانة أصلًا"; return }
~~~

| الحالة | التصرف | ليه |
|---|---|---|
| المهمة مش موجودة | [[throw]] | العملية **مستحيلة** |
| المهمة خلصانة أصلًا | [[Write-Warning]] + [[return]] | العملية **مش محتاجة** |

التانية مش فشل. اليوزر طلب حاجة هي أصلًا متحققة. تنبهه وتمشي.

| الأمر | الشكل | بيوقف؟ |
|---|---|---|
| [[throw]] | أحمر | أيوه |
| [[Write-Error]] | أحمر | حسب [[$ErrorActionPreference]] |
| [[Write-Warning]] | أصفر | لأ |

---

## ٤. الحتة الذكية: [[$hit]] إشارة مش نسخة

~~~powershell
$hit = $tasks | Where-Object id -eq $Id
$hit.done = $true
Write-Store -Tasks $tasks
~~~

لاحظ إننا عدّلنا [[$hit]]، وحفظنا [[$tasks]].

**ليه ده شغال؟** لأن [[Where-Object]] **مبينسخش**. بيرجّع إشارة لنفس الـ object اللي جوه [[$tasks]].

~~~text
$tasks  ──→  [ {id:1} , {id:2} , {id:3} ]
                           ↑
$hit    ───────────────────┘        نفس الـ object، مش نسخة
~~~

فـ [[$hit.done = $true]] بتغيّر العنصر اللي في القايمة.

> خد بالك من دي في الاتجاه التاني: لو كنت عايز تعدّل من غير ما تأثر على الأصل، لازم تنسخ بنفسك.

---

## ٥. [[Remove-Task]]: الفلتر بالعكس

~~~powershell
Write-Store -Tasks @($tasks | Where-Object id -ne $Id)
~~~

| | |
|---|---|
| للتعديل | [[Where-Object id -eq $Id]] — هات دي |
| للحذف | [[Where-Object id -ne $Id]] — هات **كل حاجة ما عدا** دي |

سطر واحد. مفيش لوب ولا [[RemoveAt]] ولا فهارس.

و [[@( )]] حواليها لنفس فخ العنصر الواحد: لو فضلت مهمة واحدة بعد الحذف، من غيرها الملف هيتكتب object مش array.

---

## ٦. [[-WhatIf]] شغالة على الاتنين

~~~powershell
.\task.ps1 rm -Id 1 -WhatIf
~~~

~~~text الناتج
What if: Performing the operation "remove" on target "#1 اكتب التقرير".
~~~

~~~powershell
(.\task.ps1 list).Count
~~~

~~~text الناتج
3
~~~

**العدد فضل ٣.** محصلش حذف.

ولاحظ إن الهدف فيه **نص المهمة** مش الرقم بس:

~~~powershell
$PSCmdlet.ShouldProcess("#$Id $($hit.text)", 'remove')
~~~

وده مقصود: [[#1]] لوحدها مبتقولكش إنت بتمسح إيه. [[#1 اكتب التقرير]] بتقولك.

---

## ٧. وبيرجّعوا object برضه

آخر سطر في الاتنين [[$hit]]:

~~~powershell
$done = .\task.ps1 done -Id 1
"خلّصت: $($done.text)"
~~~

كل أمر في الأداة بيرجّع object. الاتساق ده بيخلي اللي بيستخدمها ميتفاجأش.

---

## الخلاصة

- الترتيب: اقرا ← دوّر ← تحقق ← [[ShouldProcess]] ← عدّل ← احفظ ← رجّع.
- حط القيمة اللي سببت المشكلة في رسالة الخطأ: [[مفيش مهمة رقمها 99]].
- [[throw]] للمستحيل، [[Write-Warning]] للمش-محتاج.
- [[Where-Object]] بيرجّع **إشارات** مش نسخ، فتعديل الناتج بيعدّل الأصل.
- الحذف = [[Where-Object -ne]] وإعادة الحفظ.
- خلي [[ShouldProcess]] يعرض حاجة يعرفها اليوزر (النص) مش الرقم بس.`,
          lines: [
            R`دالة التخليص`,
            R`اقرا الموجود`,
            R`دوّر على المهمة بالرقم`,
            R`مش موجودة: وقّف برسالة فيها الرقم نفسه`,
            R`خلصانة أصلًا: ده مش خطأ، تحذير وارجع`,
            R`بوابة -WhatIf قبل أي تعديل`,
            R`عدّل: و $hit إشارة لنفس العنصر اللي في $tasks`,
            R`احفظ القايمة كلها`,
            R`ورجّع المهمة اللي اتعدّلت`,
            R`قفل الدالة`,
            R`دالة الحذف`,
            R`اقرا الموجود`,
            R`دوّر عليها`,
            R`مش موجودة: نفس الرسالة الواضحة`,
            R`بوابة -WhatIf، والهدف فيه نص المهمة مش الرقم بس`,
            R`احفظ كل حاجة ما عدا دي: -ne بدل -eq`,
            R`ورجّع اللي اتمسحت`,
            R`قفل الدالة`
          ]
        },

        {
          cmd: "مشروع ٢ — اختبر أداتك",
          title: "سكربت بيشغّل أداتك ويقولك نجحت ولا لأ",
          desc: R`آخر خطوة، وهي اللي بتخليك تعدّل في الأداة وانت مرتاح: **سكربت اختبارات**. بيشغّل الأداة بكل حالاتها على ملف مؤقت، ويقارن النتيجة باللي متوقع، ويطبع ملخص.

وهنا بيظهر مكسب قرار أخدناه في الخطوة الأولى: **[[-StorePath]] كـ parameter**. من غيره كل اختبار كان هيكتب في مهامك الحقيقية.

[[$store = Join-Path ([System.IO.Path]::GetTempPath()) "task-test-$(New-Guid).json"]] ملف مؤقت باسم فريد لكل تشغيل، فالاختبارات متأثرش على بعض.

ودالتين صغيرتين بس:
[[Check]] بتاخد اسم و script block، بتشغّله، وبتعد النجاح والفشل.
[[Should-Be]] بتقارن وبترمي رسالة فيها المتوقع والفعلي.

وفي الآخر [[exit]] بكود، عشان الاختبارات تنفع في CI أو في [[&&]].

**وده مش بديل عن Pester** (مكتبة الاختبارات الرسمية، وبتتسطب بـ [[Install-Module Pester]]). بس هو بيعلّمك الفكرة من غير أي تسطيب، والأهم: **بيخليك تكتب اختبارات النهارده** بدل ما تأجلها.`,
          example: R`$tool  = Join-Path $PSScriptRoot 'task.ps1'
$store = Join-Path ([System.IO.Path]::GetTempPath()) "task-test-$(New-Guid).json"
$pass = 0; $fail = 0

function Check {
    param([string]$Name, [scriptblock]$Body)
    try {
        & $Body
        $script:pass++
        Write-Host "  ok   $Name" -ForegroundColor Green
    } catch {
        $script:fail++
        Write-Host "  FAIL $Name -> $($_.Exception.Message)" -ForegroundColor Red
    }
}

function Should-Be {
    param($Actual, $Expected, [string]$What = 'value')
    if ($Actual -ne $Expected) { throw "$What : expected '$Expected' got '$Actual'" }
}

Check 'add بيرجّع المهمة بـ id = 1' {
    $t = & $tool add 'first' -Tag work -StorePath $store
    Should-Be $t.id 1 'id'
}

Check 'WhatIf مبيمسحش' {
    & $tool rm -Id 2 -StorePath $store -WhatIf | Out-Null
    Should-Be @(& $tool list -StorePath $store).Count 2 'count'
}

Remove-Item $store -Force -ErrorAction SilentlyContinue
Write-Host "$pass نجحوا، $fail فشلوا"
exit ($fail -gt 0 ? 1 : 0)`,
          flag: "script",
          try: R`شغّل سكربت الاختبارات، وبعدين **كسّر الأداة عن قصد**: غيّر [[return 1]] في [[New-Id]] لـ [[return 5]]، وشغّل الاختبارات تاني. أنهي اختبار هيقع؟`,
          sol: R`~~~text الناتج الكامل (PowerShell 7.6، اتشغّل فعلًا)
store: C:\Users\7ossa\AppData\Local\Temp\task-test-8130378b-676d-4e92-b384-76851974d919.json
  ok   الليستة فاضية في الأول
  ok   add بيرجّع المهمة بـ id = 1
  ok   الـ id بيزيد
  ok   التاج الافتراضي general
  ok   الفلترة بالتاج
  ok   done بيعلّم المهمة
  ok   -Open بيخفي الخلصانة
What if: Performing the operation "remove" on target "#2 second".
  ok   WhatIf مبيمسحش
  ok   rm بيمسح
  ok   id مش موجود بيرمي خطأ
  ok   stats بيعدّ صح

11 نجحوا، 0 فشلوا
exit=0
~~~

ولو غيّرت [[return 1]] لـ [[return 5]] في [[New-Id]]، الاختبار التاني هيقع:

~~~text
  FAIL add بيرجّع المهمة بـ id = 1 -> id : expected '1' got '5'
~~~

**ولاحظ إن اللي بعده («الـ id بيزيد») هيعدّي برضه**، لأنه بيتأكد إن الرقم زاد مش إنه بالظبط ٢... ودي حاجة تستاهل تتصلح في الاختبار نفسه.

ولاحظ كمان سطر [[What if]] اللي ظهر في النص: ده من الأداة وهي شغالة جوه الاختبار، ومفيد لأنه بيأكد إن [[-WhatIf]] فعلًا اتنفّذت.`,
          deep: {
            why: R`من غير اختبارات، كل تعديل في الأداة بيبقى مقامرة. ومع اختبارات، بتعدّل وتشغّل سطر واحد وتعرف.

والأهم: اختبار بيقع هو اللي بيعلّمك. لما تكسر الأداة عن قصد وتشوف أنهي اختبار مسك، بتعرف اختباراتك بتغطي إيه فعلًا.`,
            how: R`**ليه [[-StorePath]] كان لازم parameter:**

~~~powershell
& $tool add 'first' -StorePath $store
~~~

الأداة بتكتب في ملف مؤقت. بياناتك الحقيقية مش بتتلمس. ده اسمه dependency injection: الاعتماد الخارجي (مكان الملف) بييجي من بره.

**[[Join-Path]] مش [[+]]:**

~~~powershell
Join-Path $PSScriptRoot 'task.ps1'
~~~

بيحط الفاصل الصح ([[\]] على ويندوز و [[/]] على لينكس)، وبيتعامل مع الفواصل المكررة.

و [[$PSScriptRoot]] فولدر السكربت نفسه، فالاختبارات بتشتغل من أي مكان.

**[[New-Guid]]** بيدّي معرّف فريد، فلو شغّلت الاختبارات مرتين في نفس اللحظة ميتعارضوش.

**[[$script:pass++]] مش [[$pass++]]:**

جوه الدالة، [[$pass++]] بتعمل نسخة محلية (درس «فخ النطاق»). [[$script:]] بتغيّر متغير السكربت الحقيقي.

**[[& $Body]]:** [[$Body]] هو [[scriptblock]]، و [[&]] بتشغّله.

**نمط [[try/catch]] كـ assertion:** أي [[throw]] جوه الـ block = الاختبار وقع. فـ [[Should-Be]] مش محتاجة ترجّع حاجة، بترمي وبس.

**[[exit ($fail -gt 0 ? 1 : 0)]]:** العامل التلاتي ([[? :]]) من PowerShell 7. في 5.1 اكتبها [[if ($fail -gt 0) { exit 1 } else { exit 0 }]].

والـ exit code ده بيخلي ده شغال:

~~~powershell
.\test-task.ps1 && git commit -m "..."
~~~

**وبعدين Pester:**

~~~powershell
Install-Module Pester -Scope CurrentUser -Force
~~~

ويبقى الاختبار:

~~~powershell
Describe 'task' {
    It 'adds with id 1' {
        $t = & $tool add 'first' -StorePath $store
        $t.id | Should -Be 1
    }
}
~~~

نفس الفكرة بالظبط، بس بتجميع وتقارير وmocking. ابدأ بالبسيط، وانقل لـ Pester لما تحتاج.

> ويندوز بييجي معاه Pester 3 القديم (بصيغة [[Should Be]] من غير شرطة). النسخة الحالية 5، ومحتاجة [[Install-Module]].`,
            when: "من أول ما الأداة يبقى فيها أكتر من أمرين. وقبل أي تعديل كبير.",
            mistakes: R`تختبر على بياناتك الحقيقية. أول اختبار [[rm]] هيمسح حاجة مهمة.

وتنسى [[$script:]] فالعدّادات تفضل صفر.

وتكتب اختبار للحالة السعيدة بس. الحالات اللي بتكسر هي اللي بتستاهل: id مش موجود، ملف فاضي، صفر عناصر.

ومتنساش تمسح الملف المؤقت في الآخر.`
          },
          teach: R`## الفكرة

سكربت بيشغّل أداتك في كل حالاتها ويقولك نجحت ولا لأ. من غير أي مكتبة.

الناتج اللي تحت من تشغيل حقيقي على ويندوز 11 / PowerShell 7.6.

---

## ١. التجهيز: ملف مؤقت لكل تشغيل

~~~powershell
$tool  = Join-Path $PSScriptRoot 'task.ps1'
$store = Join-Path ([System.IO.Path]::GetTempPath()) "task-test-$(New-Guid).json"
$pass = 0; $fail = 0
~~~

| الحتة | معناها |
|---|---|
| [[$PSScriptRoot]] | فولدر سكربت الاختبار نفسه |
| [[Join-Path]] | يركّب المسار بالفاصل الصح |
| [[[System.IO.Path]::GetTempPath()]] | فولدر الملفات المؤقتة في النظام |
| [[New-Guid]] | معرّف فريد، فكل تشغيل له ملف خاص |

~~~text المسار اللي طلع
C:\Users\7ossa\AppData\Local\Temp\task-test-8130378b-676d-4e92-b384-76851974d919.json
~~~

**وهنا بيظهر قرار الخطوة الأولى:** [[-StorePath]] كان parameter، فالاختبار بيقول للأداة «اشتغلي على الملف ده». بياناتك الحقيقية مش بتتلمس.

لو كان المسار ثابت جوه الكود، أول اختبار لـ [[rm]] كان هيمسح من مهامك الحقيقية.

---

## ٢. [[Check]]: الاختبار الواحد

~~~powershell
function Check {
    param([string]$Name, [scriptblock]$Body)
    try {
        & $Body
        $script:pass++
        Write-Host "  ok   $Name" -ForegroundColor Green
    } catch {
        $script:fail++
        Write-Host "  FAIL $Name -> $($_.Exception.Message)" -ForegroundColor Red
    }
}
~~~

### الفكرة في سطر

**لو الـ block خلص من غير [[throw]] يبقى نجح، ولو رمى يبقى وقع.**

| الحتة | معناها |
|---|---|
| [[[scriptblock]$Body]] | النوع: كتلة كود |
| [[& $Body]] | شغّلها |
| [[$script:pass++]] | زوّد عدّاد **السكربت** |
| [[catch]] | أي [[throw]] بيقع هنا |
| [[$_.Exception.Message]] | رسالة الخطأ |

### ليه [[$script:pass++]] مش [[$pass++]]؟

درس «فخ النطاق»: الكتابة جوه دالة بتعمل **نسخة محلية**. [[$script:]] بتقول «العدّاد بتاع السكربت».

من غيرها، الملخص هيقول «0 نجحوا، 0 فشلوا» دايمًا.

---

## ٣. [[Should-Be]]: المقارنة

~~~powershell
function Should-Be {
    param($Actual, $Expected, [string]$What = 'value')
    if ($Actual -ne $Expected) { throw "$What : expected '$Expected' got '$Actual'" }
}
~~~

بترمي لو مش متساويين. والرسالة فيها **التلاتة**: اسم الحاجة، والمتوقع، والفعلي.

~~~text مثال رسالة
id : expected '1' got '5'
~~~

الاختبار اللي بيقول «فشل» بس مش مفيد. اللي بيقول «توقعت ١ وجالي ٥» بيحل نفسه.

---

## ٤. الاختبارات

~~~powershell
Check 'add بيرجّع المهمة بـ id = 1' {
    $t = & $tool add 'first' -Tag work -StorePath $store
    Should-Be $t.id 1 'id'
}
~~~

كل اختبار: **نادي الأداة، وقارن**. ولاحظ إننا بنقرا [[$t.id]] من الـ object اللي رجع — وده ممكن بس لأن الأداة بترجّع objects (الخطوة اللي فاتت).

~~~powershell
Check 'WhatIf مبيمسحش' {
    & $tool rm -Id 2 -StorePath $store -WhatIf | Out-Null
    Should-Be @(& $tool list -StorePath $store).Count 2 'count'
}
~~~

**اختبار إن حاجة مبتحصلش** مهم زي اختبار إنها بتحصل. ده بيأكد إن [[-WhatIf]] مش مجرد زينة.

---

## ٥. نشغّل

~~~text الناتج
store: C:\Users\7ossa\AppData\Local\Temp\task-test-8130378b-676d-4e92-b384-76851974d919.json
  ok   الليستة فاضية في الأول
  ok   add بيرجّع المهمة بـ id = 1
  ok   الـ id بيزيد
  ok   التاج الافتراضي general
  ok   الفلترة بالتاج
  ok   done بيعلّم المهمة
  ok   -Open بيخفي الخلصانة
What if: Performing the operation "remove" on target "#2 second".
  ok   rm بيمسح
  ok   id مش موجود بيرمي خطأ
  ok   stats بيعدّ صح

11 نجحوا، 0 فشلوا
~~~

### الحاجات اللي الاختبارات دي بتغطيها

| الاختبار | بيحمي من إيه |
|---|---|
| الليستة فاضية في الأول | أول تشغيل يقع |
| id = 1 ثم بيزيد | الأرقام تتكرر |
| التاج الافتراضي | القيمة الافتراضية تضيع |
| الفلترة | [[-Tag]] متشتغلش |
| [[done]] و [[-Open]] | التعديل ميتحفظش |
| [[WhatIf مبيمسحش]] | المعاينة تمسح بجد |
| [[id مش موجود]] | الأداة تسكت على مدخل غلط |
| [[stats]] | العدّ يغلط |

**لاحظ إن نصهم عن الحالات الوحشة.** وده المفروض.

---

## ٦. اكسر الأداة عن قصد

ودي أحسن طريقة تتأكد إن اختباراتك شغالة. غيّر في [[New-Id]]:

~~~powershell
if ($Tasks.Count -eq 0) { return 5 }    # كانت return 1
~~~

~~~text الناتج
  FAIL add بيرجّع المهمة بـ id = 1 -> id : expected '1' got '5'
~~~

مسك. والرسالة بتقول بالظبط إيه اللي اتغيّر.

> وهتلاحظ إن الاختبار اللي بعده («الـ id بيزيد») **عدّى**، لأنه بيتأكد إن الرقم بقى ٢... وده في الحقيقة اختبار ضعيف. التمرين ده بيكشف الضعف ده.

---

## ٧. الـ exit code

~~~powershell
exit ($fail -gt 0 ? 1 : 0)
~~~

[[? :]] العامل التلاتي (PowerShell 7). في 5.1:

~~~powershell
if ($fail -gt 0) { exit 1 } else { exit 0 }
~~~

وده بيخلي ده ممكن:

~~~powershell
.\test-task.ps1 && git commit -m "..."
~~~

الـ commit مش هيحصل لو اختبار وقع.

---

## ٨. وبعدين Pester

اللي كتبناه هو Pester مصغّر. المكتبة الحقيقية:

~~~powershell
Install-Module Pester -Scope CurrentUser -Force
~~~

~~~powershell
Describe 'task' {
    It 'adds with id 1' {
        $t = & $tool add 'first' -StorePath $store
        $t.id | Should -Be 1
    }
}
~~~

نفس الفكرة، وبتزوّد: تجميع الاختبارات، وتقارير، و mocking، وتغطية الكود.

> ويندوز بييجي معاه **Pester 3** القديم (بصيغة [[Should Be]] من غير شرطة). النسخة الحالية **5** وصيغتها [[Should -Be]]، ومحتاجة [[Install-Module]]. (مسطبناهاش هنا؛ الكلام ده من دليل Pester.)

---

## المشروع خلص: اللي اتعلمناه

| الخطوة | المهارة |
|---|---|
| ١ | الكتابة الذرية، و [[,]] في الـ pipeline، و [[-StorePath]] كـ parameter |
| ٢ | فخ العنصر الواحد، و [[[pscustomobject]]]، و id مش بيتكرر |
| ٣ | [[$PSBoundParameters]] لكل نطاق، والقراية مقابل الكتابة |
| ٤ | **رجّع objects مش نصوص** |
| ٥ | رسايل خطأ فيها معلومة، و [[throw]] مقابل [[Write-Warning]] |
| ٦ | اختبارات على ملف مؤقت، و exit code |

---

## الخلاصة

- الاختبار = شغّل الأداة، قارن، عُدّ. [[try/catch]] كافية.
- **ملف مؤقت لكل تشغيل**، وده ممكن بس لأن المسار parameter.
- [[$script:]] للعدّادات جوه الدوال.
- رسالة الفشل تقول المتوقع والفعلي.
- اختبر الحالات الوحشة: صفر عناصر، id غلط، [[-WhatIf]].
- **اكسر أداتك عن قصد** عشان تتأكد إن الاختبارات بتمسك.
- [[exit]] بكود، عشان [[&&]] والـ CI يشتغلوا.`,
          lines: [
            R`مسار الأداة، جنب سكربت الاختبار`,
            R`ملف مؤقت باسم فريد: بياناتك الحقيقية مش هتتلمس`,
            R`عدّادات النجاح والفشل`,
            R`دالة الاختبار الواحد`,
            R`بتاخد اسم وكتلة كود`,
            R`جرّب تشغّلها`,
            R`شغّل الكتلة`,
            R`عدّت من غير throw يبقى نجحت، و $script: عشان العدّاد الحقيقي`,
            R`اطبع نجاح بالأخضر`,
            R`أي throw بيقع هنا`,
            R`زوّد عدّاد الفشل`,
            R`واطبع السبب بالأحمر`,
            R`قفل الـ try/catch`,
            R`قفل الدالة`,
            R`دالة المقارنة`,
            R`المتوقع والفعلي واسم الحاجة`,
            R`مش متساويين؟ ارمي رسالة فيها التلاتة`,
            R`قفل الدالة`,
            R`اختبار: الإضافة بترجّع رقم ١`,
            R`نادي الأداة على الملف المؤقت`,
            R`وقارن الرقم`,
            R`قفل الاختبار`,
            R`اختبار: المعاينة مبتمسحش`,
            R`شغّل rm بـ -WhatIf`,
            R`والعدد لازم يفضل زي ما هو`,
            R`قفل الاختبار`,
            R`نضّف الملف المؤقت`,
            R`اطبع الملخص`,
            R`واخرج بكود: ١ لو فيه فشل، عشان && والـ CI يشتغلوا`
          ]
        }
      ]
    }
]);
