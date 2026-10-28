// تكملة تاب ps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ps/01.js (شرح حقول الدرس في أوله)
MORE("ps", [
    {
      t: "مشروع ١: تتحكم في جهازك",
      l: 3,
      n: R`أداة [[pc.ps1]] بتقفل الجهاز أو تعمله restart بعد مهلة، وتلغي المعاد، وتقولك فيه معاد ولا لأ. هنبنيها على ٦ خطوات، كل خطوة بتضيف حاجة واحدة وبنشغّلها قبل ما نكمّل`,
      items: [
        {
          cmd: "مشروع ١ — الواجهة الأول",
          title: "اكتب شكل الاستخدام قبل أي كود",
          desc: R`أول خطوة في أي أداة مش الكود، دي **شكل الاستخدام**. تكتب الأوامر اللي نفسك تكتبها، وبعدين تبني اللي يخليها تشتغل. ده بيمنعك تبني حاجة طلعت وحشة في الاستعمال.

الأداة اللي هنبنيها اسمها [[pc.ps1]]، واللي عايزينه منها:

[[.\pc.ps1 off -In 30]] اقفل بعد ٣٠ دقيقة.
[[.\pc.ps1 restart -In 5]] اعمل restart بعد ٥ دقايق.
[[.\pc.ps1 cancel]] الغي المعاد.
[[.\pc.ps1 status]] فيه معاد متجدول؟

لاحظ القرارات اللي اتاخدت في السطور دي قبل أي كود: الفعل جاي **الأول من غير شرطة** (أسهل في الكتابة)، والوقت **بالدقايق مش الثواني** (أقرب لطريقة تفكيرك)، وفيه [[status]] عشان تعرف الحالة من غير ما تخمّن.

والخطوة الأولى في الكود هي **هيكل فاضي بيطبع اللي استقبله بس**. ده بيأكد إن PowerShell فهم الـ arguments زي ما انت قاصد، قبل ما تكتب أي منطق.

[[param( )]] لازم تبقى أول حاجة في الملف (غير التعليقات)، وهي اللي بتعرّف المدخلات. و [[= 'status']] قيمة افتراضية لو اليوزر مكتبش حاجة.`,
          example: R`param(
    [string]$Action = 'status',
    [int]$In = 0
)

Write-Host "Action = $Action"
Write-Host "In     = $In"`,
          flag: "script",
          try: R`احفظه باسم [[pc.ps1]] في [[$HOME\lab]]، وشغّله تلات مرات: [[.\pc.ps1]] لوحده، وبعدين [[.\pc.ps1 -Action off -In 30]]، وبعدين [[.\pc.ps1 off -In 30]] من غير [[-Action]]. التالتة هتشتغل؟`,
          sol: R`التلاتة بيشتغلوا:

~~~text الناتج (PowerShell 7.6)
PS> .\pc.ps1
Action = status
In     = 0

PS> .\pc.ps1 -Action off -In 30
Action = off
In     = 30

PS> .\pc.ps1 off -In 30
Action = off
In     = 30
~~~

**التالتة اشتغلت من غير [[-Action]]** لأن PowerShell بيدّي كل parameter رقم موقع حسب ترتيب كتابته في [[param()]]. [[$Action]] أول واحد، فأي قيمة من غير اسم بتروح له.

ده شغال **بالصدفة** دلوقتي. في الخطوة الجاية هنكتبه صراحة بـ [[[Parameter(Position = 0)]]] عشان لو عدّلنا ترتيب الـ parameters بعدين، الأداة متبوظش.`,
          deep: {
            why: R`أغلب السكربتات الوحشة اتكتبت من الآخر للأول: الكود الأول، والاستعمال طلع لوحده. فبتلاقي نفسك بتكتب [[.\script.ps1 -Mode 2 -Seconds 1800 -DoIt $true]] وانت مش فاكر يعني إيه.

لما تكتب شكل الاستخدام الأول، بتكتشف إن [[-In 30]] أحلى من [[-Seconds 1800]] وانت لسه مكتبتش سطر كود.`,
            how: R`**الهيكل الفاضي بيأكد ٣ حاجات قبل ما تكمّل:**

1. الملف بيشتغل أصلًا (مفيش مشكلة [[ExecutionPolicy]]).
2. PowerShell فهم الـ arguments صح.
3. القيم الافتراضية شغالة.

**قواعد [[param()]]:**

- لازم تبقى **أول كود** في الملف. التعليقات فوقها عادي، بس أي أمر قبلها بيخلي PowerShell يرفضها.
- كل parameter: نوعه بين [[[ ]]]، وبعده [[$الاسم]]، وبعده [[=]] والقيمة الافتراضية لو عايز.
- الفاصلة بين كل واحد والتاني، ومفيش فاصلة بعد الأخير.
- النوع مش إجباري، بس اكتبه: [[[int]$In]] بيرفض [[-In abc]] لوحده، و [[$In]] من غير نوع هيقبلها كنص.

**القيمة الافتراضية بتتحسب وقت التشغيل**، فتقدر تحط فيها أمر:

~~~powershell
param(
    [string]$LogPath = "$env:LOCALAPPDATA\pc-tool\pc.log"
)
~~~

**وعشان تشغّل سكربت في المكان اللي انت فيه لازم [[.\]]:** PowerShell مبيدوّرش على البرامج في الفولدر الحالي (عكس CMD)، وده أمان: عشان ملف اسمه [[git.ps1]] في فولدر نزّلته مياخدش مكان [[git]] الحقيقي.`,
            when: "أول خطوة في أي سكربت هتكتبه. حتى لو ١٠ سطور.",
            mistakes: R`تحط أي كود قبل [[param()]]، فتاخد error [[The term 'param' is not recognized]] أو ما شابه.

وتنسى [[.\]] قدام اسم السكربت فتاخد [[not recognized as a name of a cmdlet]].

وتبدأ بالكود وتسيب الواجهة تطلع لوحدها. اكتب الاستخدام الأول حتى لو في تعليق.`
          },
          teach: R`## الفكرة

قبل أي كود: **إيه الشكل اللي نفسي أكتبه في الترمنال؟** نكتبه، وبعدين نبني اللي يخليه يشتغل.

---

## ١. الواجهة اللي اتفقنا عليها

~~~text شكل الاستخدام
.\pc.ps1 off -In 30        ← اقفل بعد ٣٠ دقيقة
.\pc.ps1 restart -In 5     ← restart بعد ٥ دقايق
.\pc.ps1 cancel            ← الغي المعاد
.\pc.ps1 status            ← فيه معاد؟
~~~

### القرارات اللي جوه السطور دي

| القرار | البديل اللي رفضناه | ليه |
|---|---|---|
| الفعل أول حاجة من غير شرطة | [[-Action off]] | أقصر، وشبه [[git commit]] و [[docker run]] |
| [[-In]] بالدقايق | [[-Seconds 1800]] | دماغك بتفكّر بالدقايق |
| فيه [[status]] | تخمّن | تعرف الحالة من غير ما تجرّب |
| فيه [[cancel]] | تفتكر [[shutdown /a]] | الأداة تعرف تلغي نفسها |

**كل ده اتقرر وإحنا لسه مكتبناش سطر كود.** لو بدأنا بالكود، كنا هنلاقي نفسنا بنكتب [[-Mode 2]] وخلاص.

---

## ٢. الهيكل الفاضي

~~~powershell
param(
    [string]$Action = 'status',
    [int]$In = 0
)

Write-Host "Action = $Action"
Write-Host "In     = $In"
~~~

### نفكه سطر سطر

**[[param(]]**

بتفتح قايمة المدخلات. **لازم تبقى أول كود في الملف** (التعليقات فوقها عادي).

**[[[string]$Action = 'status',]]**

| الحتة | معناها |
|---|---|
| [[[string]]] | النوع: نص. لو اليوزر بعت رقم، PowerShell هيحوّله لنص |
| [[$Action]] | الاسم. واليوزر بيكتبه [[-Action]] |
| [[= 'status']] | القيمة لو اليوزر مكتبش حاجة |
| [[,]] | فيه parameter تاني بعده |

**[[[int]$In = 0]]**

[[[int]]] رقم صحيح. لو اليوزر كتب [[-In abc]]، PowerShell هيرفض لوحده من غير ما نكتب أي تحقق.

مفيش فاصلة بعده لأنه الأخير.

**[[)]]**

بتقفل الـ param.

**[[Write-Host "Action = $Action"]]**

بيطبع على الشاشة. و [[$Action]] جوه النص بيتفسّر لقيمته.

> [[Write-Host]] بيطبع على الشاشة بس. لو عايز الناتج يعدّي في pipeline، استخدم [[Write-Output]] (درس «Write-Host والـ output»).

---

## ٣. نشغّله

~~~powershell
.\pc.ps1
~~~

~~~text الناتج
Action = status
In     = 0
~~~

القيم الافتراضية اشتغلت.

~~~powershell
.\pc.ps1 -Action off -In 30
~~~

~~~text الناتج
Action = off
In     = 30
~~~

استقبل الاتنين صح.

~~~powershell
.\pc.ps1 off -In 30
~~~

~~~text الناتج
Action = off
In     = 30
~~~

**من غير [[-Action]] وبرضه اشتغل.** ليه؟

---

## ٤. ليه [[off]] لوحدها اشتغلت؟

PowerShell بيدّي كل parameter **رقم موقع** حسب ترتيبه في [[param()]]:

~~~text
param(
    [string]$Action = 'status',   ← موقع 0
    [int]$In = 0                  ← موقع 1
)
~~~

فأي قيمة مكتوبة من غير اسم بتروح للموقع اللي فاضي بالترتيب.

**بس ده شغال بالصدفة.** لو جيت بكرة وضفت parameter جديد في الأول، [[off]] هتروح له بدل [[$Action]] والأداة هتبوّظ من غير error.

الحل في الخطوة الجاية: نكتب الموقع **صراحة**.

---

## ٥. ليه [[.\]] قدام الاسم؟

~~~powershell
pc.ps1
~~~

~~~text الناتج
pc.ps1: The term 'pc.ps1' is not recognized as a name of a cmdlet, function, script file,
or executable program.
~~~

PowerShell **مبيدوّرش** على البرامج في الفولدر اللي انت فيه (عكس CMD). ده أمان مقصود: لو نزّلت فولدر فيه ملف اسمه [[git.ps1]]، مش عايزينه ياخد مكان [[git]] الحقيقي.

[[.\]] معناها «الملف ده، في الفولدر ده»، وبكتابتها انت بتقول صراحة إنك قاصده.

---

## ٦. لو السكربت مرفض يشتغل خالص

~~~text رسالة محتملة
.\pc.ps1 : File ...\pc.ps1 cannot be loaded because running scripts is disabled on this system.
~~~

دي [[ExecutionPolicy]]. الحل لليوزر بتاعك بس:

~~~powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
~~~

(درس «ExecutionPolicy» فيه التفاصيل وليه [[RemoteSigned]] اختيار معقول.)

---

## الخلاصة

- ابدأ بـ **شكل الاستخدام** مش بالكود. القرارات المهمة بتتاخد هناك.
- [[param()]] أول كود في الملف، وكل parameter: نوع + اسم + قيمة افتراضية.
- النوع ([[[int]]]) بيرفض المدخلات الغلط لوحده.
- شغّل الهيكل الفاضي **قبل** ما تكتب أي منطق، عشان تتأكد إن المدخلات بتوصل صح.
- الموقع (positional) شغال لوحده بالترتيب، بس خليه صريح — الخطوة الجاية.
- [[.\]] لازمة قدام اسم السكربت.`,
          lines: [
            R`بداية قايمة المدخلات، ولازم تبقى أول كود في الملف`,
            R`الفعل: نص، والافتراضي status لو اليوزر مكتبش حاجة`,
            R`المهلة بالدقايق: رقم صحيح، والافتراضي صفر (حالًا)`,
            R`قفل الـ param`,
            R`اطبع اللي وصلنا عشان نتأكد إن PowerShell فهم صح`,
            R`ونفس الحاجة للرقم: الهيكل ده مش بيعمل حاجة غير التأكيد`
          ]
        },

        {
          cmd: "مشروع ١ — التحقق من المدخلات",
          title: "خلي الأداة ترفض الغلط قبل ما تشتغل",
          desc: R`دلوقتي الأداة بتقبل أي حاجة: [[.\pc.ps1 sleep]] هتعدّي، و [[-In 99999]] كمان. الخطوة دي بتخلي PowerShell يرفض الغلط لوحده، من غير ما نكتب [[if]] واحدة.

[[[ValidateSet('off','restart','cancel','status')]]] فوق الـ parameter: القيم المسموحة دي بس، وأي حاجة تانية بترفض برسالة بتعدّد المسموح.

[[[ValidateRange(0, 10080)]]] للأرقام: من صفر لـ ١٠٠٨٠ دقيقة (أسبوع). الرقم بره المدى بيترفض.

[[[Parameter(Position = 0)]]] بتكتب الموقع صراحة بدل ما تعتمد على الترتيب.

والمكسب التاني اللي مش باين: الـ [[ValidateSet]] بتخلي **زرار Tab يكمّل القيم**. اكتب [[.\pc.ps1 ]] ودوس Tab، هيلف على [[off]] و [[restart]] و [[cancel]] و [[status]].

وفيه إخوات تانيين: [[[ValidateNotNullOrEmpty()]]] و [[[ValidatePattern('^\d{4}$')]]] (regex) و [[[ValidateScript({ Test-Path $_ })]]] (شرط انت كاتبه).

والقاعدة: **التحقق في الـ param، مش في جسم السكربت.** كده الرسالة بتطلع واضحة، و Tab بيساعد، والكود بيفضل نضيف.`,
          example: R`param(
    [Parameter(Position = 0)]
    [ValidateSet('off', 'restart', 'cancel', 'status')]
    [string]$Action = 'status',

    [ValidateRange(0, 10080)]
    [int]$In = 0
)

switch ($Action) {
    'off'     { Write-Host "هقفل بعد $In دقيقة" }
    'restart' { Write-Host "هعمل restart بعد $In دقيقة" }
    'cancel'  { Write-Host 'هلغي المعاد' }
    'status'  { Write-Host 'هقولك فيه معاد ولا لأ' }
}`,
          flag: "script",
          try: R`جرّب [[.\pc.ps1 sleep]] و [[.\pc.ps1 off -In 99999]] وشوف الرسالتين. وبعدين اكتب [[.\pc.ps1 ]] ودوس Tab كذا مرة.`,
          sol: R`~~~text الناتج (PowerShell 7.6)
PS> .\pc.ps1 sleep
pc.ps1: Cannot validate argument on parameter 'Action'. The argument "sleep" does not belong
to the set "off,restart,cancel,status" specified by the ValidateSet attribute. Supply an
argument that is in the set and then try the command again.

PS> .\pc.ps1 off -In 99999
pc.ps1: Cannot validate argument on parameter 'In'. The 99999 argument is greater than the
maximum allowed range of 10080. Supply an argument that is less than or equal to 10080 and
then try the command again.
~~~

**لاحظ الرسالتين:** الأولى **بتعدّد المسموح**، والتانية **بتقول الحد**. ودي رسايل PowerShell الجاهزة، مكتبناش حرف فيها.

و [[.\pc.ps1 ]] + Tab بيلف على [[off]] ثم [[restart]] ثم [[cancel]] ثم [[status]]. الـ [[ValidateSet]] هي اللي علّمت الإكمال.

**والأوامر الأربعة بقت شغالة:**

~~~text
PS> .\pc.ps1 off -In 30
هقفل بعد 30 دقيقة

PS> .\pc.ps1 cancel
هلغي المعاد

PS> .\pc.ps1
هقولك فيه معاد ولا لأ
~~~`,
          deep: {
            why: R`لو سبت الفحص لجسم السكربت، هتكتب [[if]] لكل مدخل، والرسايل هتبقى بتاعتك (وغالبًا أقل وضوحًا)، و Tab مش هيعرف يساعد، والغلط هيتكشف بعد ما السكربت يكون بدأ شغل.

في الـ [[param]]، الغلط بيترفض **قبل** ما أول سطر يتنفذ.`,
            how: R`**الـ attributes اللي هتستخدمها كتير:**

| الـ attribute | بيعمل إيه |
|---|---|
| [[[Parameter(Mandatory)]]] | لازم يتكتب، ولو منساش PowerShell بيسأل عنه |
| [[[Parameter(Position = 0)]]] | الموقع، عشان الكتابة من غير الاسم |
| [[[ValidateSet('a','b')]]] | القيم دي بس + إكمال Tab |
| [[[ValidateRange(0, 100)]]] | مدى للأرقام |
| [[[ValidateNotNullOrEmpty()]]] | مش فاضي |
| [[[ValidatePattern('^\d{4}$')]]] | يطابق regex |
| [[[ValidateScript({ Test-Path $_ })]]] | شرط انت كاتبه، [[$_]] هي القيمة |
| [[[ValidateLength(1, 50)]]] | طول النص |
| [[[Alias('t')]]] | اسم تاني مختصر للـ parameter |

**ترتيب السطور:** الـ attributes كلها فوق الـ parameter، كل واحدة في سطر، وآخر سطر هو النوع والاسم:

~~~powershell
[Parameter(Position = 0)]
[ValidateSet('off', 'restart')]
[string]$Action = 'status'
~~~

**[[switch]] مقابل [[if/elseif]]:**

[[switch]] بتقارن القيمة بكل حالة. أنضف من سلسلة [[elseif]] لما يبقى فيه أكتر من ٣ احتمالات. و [[default]] بتمسك اللي مش مطابق (مش محتاجينها هنا لأن [[ValidateSet]] ضامنة).

**الفخ:** القيمة الافتراضية **مبتتفحصش** في بعض الحالات لو الـ parameter مكتبش أصلًا. فخلي الافتراضي من ضمن الـ set دايمًا (هنا [[status]] موجودة في الـ set، فتمام).`,
            when: "على كل parameter. التحقق أرخص حاجة تكتبها، وأغلى حاجة تنساها.",
            mistakes: R`تحط الـ attribute تحت الـ parameter بدل فوقه.

وتكتب [[[ValidateSet]]] بقيم فيها حروف كبيرة وتتوقع إنها حساسة لحالة الحروف. هي **مش** حساسة افتراضيًا: [[.\pc.ps1 OFF]] هتعدّي.

وتحط قيمة افتراضية مش موجودة في الـ [[ValidateSet]].`
          },
          teach: R`## الفكرة

بدل ما تكتب [[if]] لكل مدخل، بتعلّق **شروط** فوق الـ parameter، و PowerShell بيرفض الغلط قبل ما أول سطر يشتغل.

---

## ١. المشكلة في الخطوة اللي فاتت

~~~powershell
.\pc.ps1 sleep -In 99999
~~~

~~~text الناتج (قبل التحقق)
Action = sleep
In     = 99999
~~~

قَبِل كل حاجة. [[sleep]] مش فعل عندنا، و ٩٩٩٩٩ دقيقة = ٦٩ يوم.

---

## ٢. [[[ValidateSet]]]: القيم دي بس

~~~powershell
[Parameter(Position = 0)]
[ValidateSet('off', 'restart', 'cancel', 'status')]
[string]$Action = 'status',
~~~

### الترتيب مهم

~~~text
[Parameter(Position = 0)]                  ← attribute
[ValidateSet('off','restart','cancel','status')]  ← attribute
[string]$Action = 'status',                ← النوع والاسم والقيمة الافتراضية
~~~

كل الـ attributes **فوق**، وآخر سطر هو الـ parameter نفسه.

### نجرّب

~~~powershell
.\pc.ps1 sleep
~~~

~~~text الناتج
pc.ps1: Cannot validate argument on parameter 'Action'. The argument "sleep" does not belong
to the set "off,restart,cancel,status" specified by the ValidateSet attribute. Supply an
argument that is in the set and then try the command again.
~~~

### نقرا الرسالة

| الحتة | معناها |
|---|---|
| [[Cannot validate argument on parameter 'Action']] | المشكلة في [[-Action]] |
| [[does not belong to the set "off,restart,cancel,status"]] | **وبيعدّدلك المسموح** |
| [[Supply an argument that is in the set]] | اعمل إيه |

**مكتبناش الرسالة دي.** PowerShell بناها من الـ [[ValidateSet]].

### والمكسب المخفي: Tab

~~~powershell
.\pc.ps1 <Tab>
~~~

بيلف على [[off]] ثم [[restart]] ثم [[cancel]] ثم [[status]]. الإكمال بيقرا الـ [[ValidateSet]].

> ولو كتبتها [[if]] جوه السكربت، Tab مكنش هيعرف حاجة.

---

## ٣. [[[ValidateRange]]]: حدود للأرقام

~~~powershell
[ValidateRange(0, 10080)]
[int]$In = 0
~~~

[[10080]] = ٧ أيام × ٢٤ ساعة × ٦٠ دقيقة. حد منطقي لأداة زي دي.

~~~powershell
.\pc.ps1 off -In 99999
~~~

~~~text الناتج
pc.ps1: Cannot validate argument on parameter 'In'. The 99999 argument is greater than the
maximum allowed range of 10080. Supply an argument that is less than or equal to 10080 and
then try the command again.
~~~

**وطبقتين حماية هنا:**

1. [[[int]]] بترفض [[-In abc]] (نوع غلط).
2. [[[ValidateRange]]] بترفض [[-In 99999]] (رقم بره المدى).

---

## ٤. [[[Parameter(Position = 0)]]]: خلي الموقع صريح

في الخطوة اللي فاتت [[off]] لوحدها اشتغلت بالصدفة (الترتيب). دلوقتي بقت **مكتوبة**:

~~~powershell
[Parameter(Position = 0)]
~~~

يعني: «الـ parameter ده هو الأول، مهما اتغيّر ترتيب السطور».

ولو ضفت parameter جديد فوقه بكرة، [[off]] هتفضل رايحة لـ [[$Action]].

---

## ٥. [[switch]]: نوجّه كل فعل لمكانه

~~~powershell
switch ($Action) {
    'off'     { Write-Host "هقفل بعد $In دقيقة" }
    'restart' { Write-Host "هعمل restart بعد $In دقيقة" }
    'cancel'  { Write-Host 'هلغي المعاد' }
    'status'  { Write-Host 'هقولك فيه معاد ولا لأ' }
}
~~~

| الحتة | معناها |
|---|---|
| [[switch ($Action)]] | قارن قيمة [[$Action]] باللي تحت |
| [['off' { ... }]] | لو ساوت [[off]]، نفّذ اللي في الأقواس |
| [[{ }]] | script block: الكود اللي هيتنفّذ |

**ليه [[switch]] مش [[if/elseif]]؟** مع أربع احتمالات أو أكتر بتبقى أوضح، وإضافة فعل جديد بتبقى سطر واحد.

> مفيش [[default]] هنا لأن [[ValidateSet]] ضامنة إن القيمة من الأربعة. لو مفيش [[ValidateSet]]، حط [[default]] دايمًا.

---

## ٦. نشغّلها

~~~powershell
.\pc.ps1 off -In 30
.\pc.ps1 cancel
.\pc.ps1
~~~

~~~text الناتج
هقفل بعد 30 دقيقة
هلغي المعاد
هقولك فيه معاد ولا لأ
~~~

الأربعة بيوصلوا لمكانهم الصح. **لسه مفيش وظيفة حقيقية** — دي الخطوة الجاية.

---

## ٧. باقي أدوات التحقق

| الـ attribute | مثال | بيرفض إيه |
|---|---|---|
| [[[Parameter(Mandatory)]]] | — | إنك تنساه (بيسألك عنه) |
| [[[ValidateNotNullOrEmpty()]]] | — | النص الفاضي |
| [[[ValidatePattern()]]] | [[[ValidatePattern('^\d{4}$')]]] | اللي مش ٤ أرقام |
| [[[ValidateScript()]]] | [[[ValidateScript({ Test-Path $_ })]]] | المسار اللي مش موجود |
| [[[ValidateLength()]]] | [[[ValidateLength(1, 50)]]] | النص الطويل أوي |
| [[[Alias()]]] | [[[Alias('m')]]] | — (بيضيف اسم مختصر) |

في [[ValidateScript]]، [[$_]] هي القيمة اللي اليوزر بعتها.

---

## الخلاصة

- التحقق مكانه **فوق الـ parameter**، مش جوه السكربت.
- [[ValidateSet]] بتدّيك تلاتة في واحد: رفض الغلط + رسالة بتعدّد المسموح + إكمال Tab.
- [[ValidateRange]] للأرقام، و [[[int]]] نفسه طبقة حماية أولى.
- [[Position = 0]] بيخلي الكتابة من غير اسم مضمونة مش بالصدفة.
- [[switch]] أنضف من [[elseif]] لما الاحتمالات تعدّي تلاتة.
- [[ValidateSet]] **مش** حساسة لحالة الحروف: [[OFF]] هتعدّي.`,
          lines: [
            R`بداية المدخلات`,
            R`الفعل هو الـ parameter رقم صفر: يتكتب من غير اسم`,
            R`القيم المسموحة بس، ودي كمان بتعلّم زرار Tab`,
            R`النوع والاسم والقيمة الافتراضية، ولازم تبقى من ضمن الـ set`,
            R`حد أقصى أسبوع بالدقايق: ٧ × ٢٤ × ٦٠`,
            R`الرقم نفسه، و [int] بترفض الحروف قبل ما المدى يتفحص`,
            R`قفل الـ param`,
            R`وجّه كل فعل لمكانه: أنضف من سلسلة elseif`,
            R`فرع القفل`,
            R`فرع الريستارت`,
            R`فرع الإلغاء`,
            R`فرع الحالة`,
            R`قفل الـ switch`
          ]
        },

        {
          cmd: "مشروع ١ — cancel و status",
          title: "ابدأ بالوظايف الآمنة، واقرا الـ exit code",
          desc: R`دلوقتي نكتب وظيفة حقيقية. وهنبدأ بالوظايف **الآمنة** ([[cancel]] و [[status]]) قبل القفل نفسه، عشان نتعلم ونجرّب من غير أي خطر. القفل هييجي في الخطوة الجاية بعد ما تبقى شبكة الأمان جاهزة.

[[shutdown.exe /a]] بيلغي أي معاد قفل متجدول. ولو مفيش معاد، بيطبع [[Unable to abort the system shutdown because no shutdown was in progress.(1116)]] ويخرج بالكود [[1116]].

ودي الحتة المهمة: [[shutdown.exe]] **برنامج خارجي** مش cmdlet، فمش بيرمي error بشكل PowerShell، بيرجّع **رقم** في [[$LASTEXITCODE]]. والسكربت المحترم بيقرا الرقم ده ويترجمه لرسالة مفهومة بدل ما يسيب اليوزر مع «(1116)».

و [[status]] محتاج يعرف فيه معاد ولا لأ، وويندوز مش بيدّي طريقة مباشرة تسأله. الحل: **الأداة تفتكر بنفسها** — تكتب ملف JSON صغير فيه نوع المعاد ووقته، وتقراه بعدين.

[[ConvertTo-Json]] بيحوّل object لنص، و [[ConvertFrom-Json]] بيعمل العكس. والتاريخ بيتخزّن بصيغة [[o]] (ISO 8601) عشان يترجع زي ما هو مهما كانت إعدادات اللغة.

و [[$ErrorActionPreference$ErrorActionPreference = 'Stop']] فوق خالص: خلي أي error يوقّف السكربت بدل ما يكمّل وهو بايظ.`,
          example: R`$ErrorActionPreference = 'Stop'
$StatePath = "$env:LOCALAPPDATA\pc-tool\state.json"

function Invoke-Cancel {
    shutdown.exe /a 2>&1 | Out-Null
    $code = $LASTEXITCODE
    if (Test-Path $StatePath) { Remove-Item $StatePath -Force }
    if ($code -eq 0)    { Write-Host 'OK: المعاد اتلغى' -ForegroundColor Green; return }
    if ($code -eq 1116) { Write-Host 'مفيش معاد متجدول أصلًا' -ForegroundColor Yellow; return }
    Write-Error "shutdown /a رجّع $code"
}

function Show-Status {
    if (-not (Test-Path $StatePath)) {
        Write-Host 'مفيش معاد متجدول' -ForegroundColor Yellow
        return
    }
    $s  = Get-Content $StatePath -Raw -Encoding utf8 | ConvertFrom-Json
    $at = [datetime]::Parse($s.at)
    if ($at -lt (Get-Date)) {
        Write-Host 'المعاد القديم عدّى' -ForegroundColor Yellow
        return
    }
    $left = [int]($at - (Get-Date)).TotalMinutes
    Write-Host "$($s.kind) الساعة $($at.ToString('HH:mm:ss')) (فاضل $left دقيقة)" -ForegroundColor Cyan
}`,
          flag: "script",
          try: R`شغّل [[.\pc.ps1 cancel]] وانت متأكد إن مفيش معاد متجدول. إيه الرسالة؟ وبعدين اعمل ملف حالة بإيدك وشوف [[status]] بيقول إيه.`,
          sol: R`~~~text الناتج (PowerShell 7.6 على ويندوز 11، اتشغّل فعلًا)
PS> .\pc.ps1 status
مفيش معاد متجدول

PS> .\pc.ps1 cancel
مفيش معاد متجدول أصلًا
~~~

[[cancel]] اشتغل فعلًا ونادى [[shutdown /a]]، ولأن مفيش معاد، الكود رجع [[1116]] والسكربت ترجمه لجملة مفهومة. **ومحصلش أي تغيير في الجهاز.**

وعشان نشوف [[status]] بيشتغل، نعمل ملف حالة بإيدنا:

~~~powershell
New-Item -ItemType Directory "$env:LOCALAPPDATA\pc-tool" -Force | Out-Null
[pscustomobject]@{ kind = 'off'; at = (Get-Date).AddMinutes(42).ToString('o') } |
    ConvertTo-Json | Set-Content "$env:LOCALAPPDATA\pc-tool\state.json" -Encoding utf8
.\pc.ps1 status
~~~

~~~text الناتج
off الساعة 04:51:05 (فاضل 42 دقيقة)
~~~

والملف نفسه:

~~~text state.json
{
  "kind": "off",
  "at": "2026-10-28T04:51:05.2488457+03:00"
}
~~~

لاحظ شكل التاريخ: [[2026-10-28T04:51:05.2488457+03:00]]. دي صيغة [[o]]، وفيها فرق التوقيت ([[+03:00]])، فبترجع صح مهما كانت لغة الجهاز.`,
          deep: {
            why: R`أي أداة بتنادي برنامج خارجي لازم تقرا الـ exit code بتاعه. من غير كده، السكربت هيكمّل وهو فاكر إنه نجح.

و «الأداة تفتكر حالتها» فكرة بتتكرر في كل أداة تقريبًا: ملف صغير في مكان معروف، بتكتب فيه وتقرا منه.`,
            how: R`**ليه [[2>&1 | Out-Null]] على [[shutdown.exe /a]]؟**

[[shutdown.exe]] بيكتب رسالته على **stderr** مش stdout. و PowerShell 7 بيحوّل أي stderr من برنامج خارجي لـ error record، فكان هيطلّع أحمر قبل ما نقدر نتصرف.

- [[2>&1]] حوّل stderr لـ stdout.
- [[| Out-Null]] ارميه، لأن إحنا هنكتب رسالتنا.

والـ exit code بيفضل في [[$LASTEXITCODE]] عادي.

**ليه [[$code = $LASTEXITCODE]] على طول؟**

لأن [[$LASTEXITCODE]] بيتغير مع أي برنامج خارجي تاني. والسطر اللي بعده فيه [[Test-Path]] و [[Remove-Item]] — دول cmdlets مش بيغيّروه، بس العادة دي بتنقذك لما تضيف سطر بعدين.

**أكواد [[shutdown.exe]] اللي تهمك:**

| الكود | معناه |
|---|---|
| [[0]] | تمام |
| [[1116]] | مفيش shutdown شغال عشان تلغيه |
| [[1190]] | فيه معاد متجدول بالفعل (الغيه الأول) |
| [[5]] | Access denied (محتاج صلاحيات) |

**ليه ملف JSON مش متغير بيئة أو registry؟**

- المتغير بيروح لما الترمنال يقفل.
- الـ registry محتاج صلاحيات وأصعب في التنظيف.
- ملف JSON في [[$env:LOCALAPPDATA]] مكان ويندوز نفسه بيوصّي بيه لبيانات التطبيقات، مش محتاج أدمن، وتقدر تفتحه بعينك وتقراه.

**ليه [[-Raw]] في [[Get-Content]]؟**

من غيرها [[Get-Content]] بيرجّع **قايمة سطور**، و [[ConvertFrom-Json]] عايز **نص واحد**. [[-Raw]] بتجيب الملف كله كنص.

**ليه [[[datetime]::Parse()]] مش [[[datetime]$s.at]]؟**

الاتنين بيشتغلوا هنا، بس [[::Parse]] أوضح في النية وبيرمي error مفهوم لو النص بايظ.

**و [[$at -lt (Get-Date)]]:** لو الوقت عدّى، الملف بقى قديم. بنعتبره «مفيش معاد» بدل ما نقول لليوزر إن فيه قفل بعد سالب ٥ دقايق.`,
            when: "أي وظيفة بتنادي [[.exe]]، وأي أداة محتاجة تفتكر حاجة بين التشغيلتين.",
            mistakes: R`تنسى [[2>&1]] فتاخد أحمر في الشاشة من برنامج نجح.

وتقرا [[$LASTEXITCODE]] بعد سطرين، وتكون أي حاجة تانية غيّرته.

وتنسى [[-Raw]] فـ [[ConvertFrom-Json]] يرمي error غريب.

وتخزّن التاريخ بـ [[.ToString()]] العادي، فيتكتب بصيغة لغة الجهاز ويفشل في القراية على جهاز بلغة تانية. استخدم [[('o')]].`
          },
          teach: R`## الفكرة

أول وظيفة حقيقية. وهنبدأ بالآمن: [[cancel]] و [[status]]. القفل نفسه في الخطوة الجاية، بعد ما نبني شبكة الأمان.

**كل اللي تحت اتشغّل فعلًا على ويندوز 11 / PowerShell 7.6، ومحصلش أي تغيير في الجهاز.**

---

## ١. [[$ErrorActionPreference = 'Stop']]

~~~powershell
$ErrorActionPreference = 'Stop'
~~~

افتراضيًا، لما cmdlet يطلّع error، PowerShell **بيكمّل السطر اللي بعده**. في سكربت بيقفل جهاز، ده آخر حاجة تحتاجها.

السطر ده بيقول: أي error = وقّف.

| القيمة | السلوك |
|---|---|
| [[Continue]] (الافتراضي) | اطبع الخطأ وكمّل |
| [[Stop]] | وقّف |
| [[SilentlyContinue]] | اخفي وكمّل |

---

## ٢. [[$StatePath]]: فين الأداة هتفتكر

~~~powershell
$StatePath = "$env:LOCALAPPDATA\pc-tool\state.json"
~~~

| الحتة | معناها |
|---|---|
| [[$env:LOCALAPPDATA]] | فولدر بيانات البرامج لليوزر ده |
| [[\pc-tool\]] | فولدر خاص بأداتنا |
| [[state.json]] | الملف |

على جهازي ده بيطلع [[C:\Users\7ossa\AppData\Local\pc-tool\state.json]].

**ليه المكان ده؟** مش محتاج أدمن، وبيتمسح مع ملف تعريف اليوزر، وده المكان اللي ويندوز نفسه بيوصّي بيه.

---

## ٣. [[Invoke-Cancel]]: نلغي، ونترجم الكود

~~~powershell
shutdown.exe /a 2>&1 | Out-Null
$code = $LASTEXITCODE
~~~

### ليه [[2>&1 | Out-Null]]؟

لو كتبنا [[shutdown.exe /a]] لوحده وشغّلناه ومفيش معاد:

~~~text الناتج
Unable to abort the system shutdown because no shutdown was in progress.(1116)
~~~

والرسالة دي بتطلع على **stderr**، و PowerShell 7 بيحوّلها لـ error أحمر. إحنا مش عايزين اليوزر يشوف «(1116)»، عايزينه يشوف جملة مفهومة.

| الحتة | معناها |
|---|---|
| [[2>&1]] | حوّل stderr (رقم 2) لـ stdout (رقم 1) |
| [[\| Out-Null]] | ارمي الناتج |

والـ exit code بيفضل في [[$LASTEXITCODE]] عادي.

### ليه نخزّنه على طول؟

~~~powershell
$code = $LASTEXITCODE
~~~

[[$LASTEXITCODE]] بيتغير مع أي برنامج خارجي تاني. خزّنه قبل ما تعمل أي حاجة.

### نترجم الأكواد

~~~powershell
if ($code -eq 0)    { Write-Host 'OK: المعاد اتلغى' -ForegroundColor Green; return }
if ($code -eq 1116) { Write-Host 'مفيش معاد متجدول أصلًا' -ForegroundColor Yellow; return }
Write-Error "shutdown /a رجّع $code"
~~~

| الكود | معناه | رسالتنا |
|---|---|---|
| [[0]] | اتلغى فعلًا | أخضر |
| [[1116]] | مكانش فيه معاد | أصفر (مش خطأ، مجرد معلومة) |
| أي حاجة تانية | مشكلة معرفهاش | [[Write-Error]] |

[[return]] بتخرج من الدالة، فالسطور اللي تحت مبتتنفذش.

### نشغّله

~~~powershell
.\pc.ps1 cancel
~~~

~~~text الناتج
مفيش معاد متجدول أصلًا
~~~

**ده اتشغّل بجد.** [[shutdown /a]] اتنادى، رجّع 1116، والسكربت ترجمه. والجهاز متغيّرش.

---

## ٤. [[Show-Status]]: الأداة بتقرا اللي افتكرته

### الملف مش موجود

~~~powershell
if (-not (Test-Path $StatePath)) {
    Write-Host 'مفيش معاد متجدول' -ForegroundColor Yellow
    return
}
~~~

أول مرة تشغّل الأداة، مفيش ملف. مش خطأ، ده الوضع الطبيعي.

### نقرا ونفك الـ JSON

~~~powershell
$s  = Get-Content $StatePath -Raw -Encoding utf8 | ConvertFrom-Json
$at = [datetime]::Parse($s.at)
~~~

| الحتة | معناها |
|---|---|
| [[Get-Content]] | اقرا الملف |
| [[-Raw]] | **كنص واحد**، مش قايمة سطور |
| [[-Encoding utf8]] | الترميز، عشان العربي ميبوظش |
| [[ConvertFrom-Json]] | حوّل النص لـ object |
| [[$s.at]] | خاصية [[at]] من الـ object |
| [[[datetime]::Parse()]] | حوّل النص لتاريخ |

**[[-Raw]] مش اختيارية:** من غيرها [[Get-Content]] بيرجّع قايمة، و [[ConvertFrom-Json]] عايز نص واحد.

### الملف القديم

~~~powershell
if ($at -lt (Get-Date)) {
    Write-Host 'المعاد القديم عدّى' -ForegroundColor Yellow
    return
}
~~~

لو الوقت فات، الملف بايت. أحسن من إننا نقول «فاضل -٥ دقيقة».

### الحساب والعرض

~~~powershell
$left = [int]($at - (Get-Date)).TotalMinutes
Write-Host "$($s.kind) الساعة $($at.ToString('HH:mm:ss')) (فاضل $left دقيقة)" -ForegroundColor Cyan
~~~

| الحتة | معناها |
|---|---|
| [[$at - (Get-Date)]] | الفرق بين تاريخين = [[TimeSpan]] |
| [[.TotalMinutes]] | الفرق بالدقايق (بكسور) |
| [[[int]]] | قرّبه لرقم صحيح |
| [[$($s.kind)]] | [[$( )]] عشان النقطة تشتغل جوه النص |
| [[$at.ToString('HH:mm:ss')]] | الوقت بس من غير التاريخ |

---

## ٥. نجرّب [[status]] بملف حالة

عشان نشوفه شغال، نعمل الملف بإيدنا:

~~~powershell
New-Item -ItemType Directory "$env:LOCALAPPDATA\pc-tool" -Force | Out-Null
[pscustomobject]@{ kind = 'off'; at = (Get-Date).AddMinutes(42).ToString('o') } |
    ConvertTo-Json | Set-Content "$env:LOCALAPPDATA\pc-tool\state.json" -Encoding utf8
.\pc.ps1 status
~~~

~~~text الناتج
off الساعة 04:51:05 (فاضل 42 دقيقة)
~~~

### الملف نفسه

~~~text state.json
{
  "kind": "off",
  "at": "2026-10-28T04:51:05.2488457+03:00"
}
~~~

### ليه صيغة [[('o')]]؟

| الصيغة | الشكل | المشكلة |
|---|---|---|
| [[.ToString()]] | [[10/28/2026 4:51:05 AM]] | بتتغير بلغة الجهاز، والقراية بتفشل |
| [[.ToString('o')]] | [[2026-10-28T04:51:05.2488457+03:00]] | ثابتة، وفيها فرق التوقيت |

[[o]] من [[round-trip]]: اكتب واقرا وهترجع نفس القيمة بالظبط. **استخدمها في أي ملف.**

---

## الخلاصة

- ابدأ بالوظايف الآمنة. هتتعلم وتجرّب براحتك قبل ما تلمس الخطر.
- البرنامج الخارجي بيرجّع **رقم** في [[$LASTEXITCODE]]، مش error. اقراه وترجمه.
- خزّن [[$LASTEXITCODE]] في متغير على طول.
- [[2>&1 | Out-Null]] بتسكّت رسالة البرنامج عشان تكتب رسالتك.
- [[1116]] من [[shutdown /a]] = مفيش معاد. مش خطأ.
- الأداة بتفتكر حالتها في JSON في [[$env:LOCALAPPDATA]].
- [[-Raw]] لازمة قبل [[ConvertFrom-Json]]، و [[('o')]] لازمة للتواريخ.
- [[$ErrorActionPreference = 'Stop']] فوق، عشان السكربت ميكملش وهو بايظ.`,
          lines: [
            R`أي error يوقّف السكربت بدل ما يكمّل وهو بايظ`,
            R`مكان ملف الحالة: فولدر بيانات اليوزر، مش محتاج أدمن`,
            R`دالة الإلغاء`,
            R`نادي البرنامج، وحوّل رسالته من stderr وارميها عشان نكتب رسالتنا`,
            R`خزّن الكود على طول قبل ما أي برنامج تاني يغيّره`,
            R`امسح ملف الحالة لأن مفيش معاد بعد الإلغاء`,
            R`كود صفر: اتلغى فعلًا`,
            R`كود 1116: مكانش فيه معاد أصلًا، ودي معلومة مش خطأ`,
            R`أي كود تاني معرفهوش: بلّغ كخطأ`,
            R`قفل الدالة`,
            R`دالة الحالة`,
            R`الملف مش موجود يعني مفيش معاد، ودي الحالة الطبيعية أول مرة`,
            R`اطبع ده`,
            R`واخرج من الدالة`,
            R`قفل الشرط`,
            R`اقرا الملف كنص واحد (-Raw) وحوّله لـ object`,
            R`حوّل نص التاريخ لتاريخ حقيقي`,
            R`لو الوقت عدّى، الملف بقى قديم`,
            R`اطبع ده`,
            R`واخرج`,
            R`قفل الشرط`,
            R`الفرق بين التاريخين بالدقايق، مقرّب لرقم صحيح`,
            R`اعرض النوع والوقت والباقي`,
            R`قفل الدالة`
          ]
        },

        {
          cmd: "مشروع ١ — off و restart بـ WhatIf",
          title: "الوظيفة الخطرة، ومعاها شبكة الأمان من أول سطر",
          desc: R`دلوقتي بس نكتب القفل. و **مش هنكتبه لوحده**: هنكتبه هو و [[-WhatIf]] في نفس الخطوة، عشان تقدر تختبر الأداة كلها من غير ما جهازك يقفل ولا مرة.

[[[CmdletBinding(SupportsShouldProcess)]]] فوق [[param()]] بتدّي سكربتك [[-WhatIf]] و [[-Confirm]] و [[-Verbose]] مجانًا، زي أي cmdlet أصلي.

وبعدها بتسأل بنفسك قبل أي حاجة خطرة:

[[if (-not $PSCmdlet.ShouldProcess($target, 'schedule')) { return }]]

الدالة دي بترجّع [[True]] يعني «كمّل»، و [[False]] يعني «اليوزر طلب معاينة أو رفض». لو [[False]] بتخرج من غير ما تعمل حاجة، و PowerShell بيطبع سطر [[What if]] لوحده.

[[$target]] هو **على مين** العملية، و [['schedule']] هي **العملية**. الاتنين بيظهروا في السطر: [[What if: Performing the operation "schedule" on target "off at 04:39:35"]].

وفيه تفصيلة مهمة: أي cmdlet جوه سكربتك بيدعم [[-WhatIf]] **بيرث** الـ [[-WhatIf]] بتاعك. فلو عندك [[New-Item]] أو [[Set-Content]] لحاجة مش خطرة (زي ملف الحالة)، حطلها [[-WhatIf:$false]] عشان متظهرش في المعاينة.

و [[shutdown.exe /s /t <ثواني>]] هو اللي بيجدول، و [[/r]] للريستارت، و [[/c "رسالة"]] بتظهر في تنبيه ويندوز.`,
          example: R`[CmdletBinding(SupportsShouldProcess)]
param(
    [Parameter(Position = 0)]
    [ValidateSet('off', 'restart', 'cancel', 'status')]
    [string]$Action = 'status',

    [ValidateRange(0, 10080)]
    [int]$In = 0,

    [string]$Message = 'الجهاز هيقفل. احفظ شغلك.'
)

function Invoke-Schedule {
    param([ValidateSet('off', 'restart')][string]$Kind)

    $seconds = $In * 60
    $at      = (Get-Date).AddSeconds($seconds)
    $flag    = if ($Kind -eq 'off') { '/s' } else { '/r' }
    $target  = '{0} at {1:HH:mm:ss}' -f $Kind, $at

    if (-not $PSCmdlet.ShouldProcess($target, 'schedule')) { return }

    shutdown.exe $flag /t $seconds /c $Message
    Save-State -Kind $Kind -At $at
    Write-Host "OK: $Kind الساعة $($at.ToString('HH:mm:ss'))" -ForegroundColor Green
}`,
          flag: "script danger",
          try: R`شغّل [[.\pc.ps1 off -In 30 -WhatIf]] وشوف السطر اللي بيطلع. وبعدين [[.\pc.ps1 restart -WhatIf]] من غير [[-In]]. وقارن الوقت اللي في السطرين. **متشغلهاش من غير [[-WhatIf]]** غير لما تكون متأكد.`,
          sol: R`~~~text الناتج (PowerShell 7.6 على ويندوز 11، اتشغّل فعلًا)
PS> .\pc.ps1 off -In 30 -WhatIf
What if: Performing the operation "schedule" on target "off at 04:39:35".

PS> .\pc.ps1 restart -WhatIf
What if: Performing the operation "schedule" on target "restart at 04:09:35".
~~~

الساعة وقت التجربة كانت [[04:09:35]]:

| الأمر | [[$In]] | الوقت المحسوب |
|---|---|---|
| [[off -In 30]] | 30 | [[04:39:35]] (+٣٠ دقيقة) |
| [[restart]] | 0 (الافتراضي) | [[04:09:35]] (حالًا) |

**الحساب مظبوط، والجهاز معملش حاجة.**

ونتأكد إن ملف الحالة متكتبش:

~~~powershell
Test-Path "$env:LOCALAPPDATA\pc-tool\state.json"
~~~

~~~text الناتج
False
~~~

لأن [[Save-State]] بعد الـ [[ShouldProcess]]، فمتنفّذش أصلًا.`,
          deep: {
            why: R`سكربت بيقفل الجهاز مينفعش تختبره بتشغيله. [[-WhatIf]] هو الفرق بين أداة تقدر تطوّرها وأداة بتخاف تلمسها.

والأهم إنك بتحط الأمان **مع** الميزة مش بعدها. «هضيف -WhatIf بعدين» معناها إنك هتختبر على جهازك الحقيقي النهاردة.`,
            how: R`**[[SupportsShouldProcess]] بتدّيك ٣ حاجات:**

| الـ parameter | بيعمل إيه |
|---|---|
| [[-WhatIf]] | [[ShouldProcess]] بترجّع [[False]] وبتطبع سطر |
| [[-Confirm]] | بتسأل اليوزر |
| [[-Verbose]] | [[Write-Verbose]] تبقى ظاهرة |

**[[$PSCmdlet]]** متغير جاهز بيظهر بمجرد ما تكتب [[CmdletBinding]]. منه بتوصل لـ [[.ShouldProcess()]] و [[.ShouldContinue()]] و [[.WriteVerbose()]].

**شكل النداء:**

~~~powershell
$PSCmdlet.ShouldProcess($target, $operation)
~~~

- [[$target]]: الحاجة اللي هتتعمل عليها العملية.
- [[$operation]]: اسم العملية.
- بترجّع [[True]] = كمّل، [[False]] = متعملش.

وفيه شكل بـ argument واحد ([[ShouldProcess($target)]])، بس التنين أوضح في الناتج.

**[[-f]] (format operator):**

~~~powershell
$target = '{0} at {1:HH:mm:ss}' -f $Kind, $at
~~~

| الحتة | معناها |
|---|---|
| [[{0}]] | حط الحاجة رقم ٠ (أول حاجة بعد [[-f]]) |
| [[{1:HH:mm:ss}]] | الحاجة رقم ١، بصيغة ساعة:دقيقة:ثانية |
| [[-f]] | العامل اللي بيركّب |

أنضف من [["$Kind at $($at.ToString('HH:mm:ss'))"]] لما التنسيق يطول.

**[[if]] كـ قيمة:**

~~~powershell
$flag = if ($Kind -eq 'off') { '/s' } else { '/r' }
~~~

في PowerShell [[if]] بترجّع قيمة، فتقدر تحطها في متغير على طول. مفيش [[? :]] زي لغات تانية (فيه [[? :]] في PowerShell 7 بس [[if]] أوضح).

**وراثة [[-WhatIf]]:** أي cmdlet جوه سكربتك بيدعم [[ShouldProcess]] بياخد الـ [[-WhatIf]] بتاعك تلقائيًا. ده كويس للحاجات الخطرة، ووحش للحاجات الداخلية زي كتابة ملف حالة. الحل [[-WhatIf:$false]] عليها.`,
            when: "قبل أي سطر بيغيّر حاجة بره السكربت: ملف، خدمة، registry، جهاز.",
            mistakes: R`تحط [[ShouldProcess]] **بعد** الحاجة الخطرة. ترتيبها قبلها.

وتنسى [[-WhatIf:$false]] على الحاجات الداخلية، فالمعاينة تطلع مليانة سطور مالهاش لازمة.

وتكتب [[SupportsShouldProcess]] من غير ما تنادي [[ShouldProcess]]. ساعتها [[-WhatIf]] هتتقبل كـ parameter **ومش هتعمل حاجة** — وده أخطر من إنها مش موجودة، لأن اليوزر هيثق فيها.`
          },
          teach: R`## الفكرة

الوظيفة الخطرة والأمان بتوعها في نفس الخطوة. بعد الدرس ده هتقدر تختبر الأداة كلها وجهازك مفتوح.

**كل الناتج اتشغّل فعلًا على ويندوز 11 / PowerShell 7.6، والجهاز معملش shutdown ولا restart.**

---

## ١. [[[CmdletBinding(SupportsShouldProcess)]]]

~~~powershell
[CmdletBinding(SupportsShouldProcess)]
param(
    ...
)
~~~

السطر ده فوق [[param()]] بيحوّل السكربت من «ملف فيه أوامر» لحاجة بتتصرف زي cmdlet أصلي:

| اللي بتاخده مجانًا | بيعمل إيه |
|---|---|
| [[-WhatIf]] | معاينة |
| [[-Confirm]] | يسأل |
| [[-Verbose]] | يظهر رسايل [[Write-Verbose]] |
| [[-ErrorAction]] | تتحكم في التعامل مع الأخطاء |
| [[$PSCmdlet]] | متغير بتوصل منه للدوال دي |

> [[CmdletBinding()]] لوحدها (من غير [[SupportsShouldProcess]]) بتدّي [[-Verbose]] من غير [[-WhatIf]].

---

## ٢. نحسب الوقت والعَلَم

~~~powershell
$seconds = $In * 60
$at      = (Get-Date).AddSeconds($seconds)
$flag    = if ($Kind -eq 'off') { '/s' } else { '/r' }
$target  = '{0} at {1:HH:mm:ss}' -f $Kind, $at
~~~

### [[$seconds = $In * 60]]

اليوزر بيكتب دقايق، و [[shutdown]] عايز ثواني. التحويل في مكان واحد.

### [[$at = (Get-Date).AddSeconds($seconds)]]

إمتى الحدث هيحصل. الأقواس لازمة عشان [[.AddSeconds]] تشتغل على ناتج [[Get-Date]].

### [[$flag = if (...) { '/s' } else { '/r' }]]

**في PowerShell، [[if]] بترجّع قيمة.** فتقدر تحطها في متغير على طول من غير سطرين.

| [[$Kind]] | [[$flag]] | معناه |
|---|---|---|
| [[off]] | [[/s]] | shutdown |
| [[restart]] | [[/r]] | reboot |

### [[$target = '{0} at {1:HH:mm:ss}' -f $Kind, $at]]

| الحتة | معناها |
|---|---|
| [[{0}]] | أول قيمة بعد [[-f]]، يعني [[$Kind]] |
| [[{1:HH:mm:ss}]] | تاني قيمة، معروضة كـ ساعة:دقيقة:ثانية |
| [[-f]] | عامل التنسيق |

النتيجة نص زي [[off at 04:39:35]]. ده اللي هيظهر لليوزر في المعاينة.

---

## ٣. البوابة: [[ShouldProcess]]

~~~powershell
if (-not $PSCmdlet.ShouldProcess($target, 'schedule')) { return }
~~~

### اللي بيحصل جواها

~~~text
المستخدم كتب -WhatIf؟
   ├── أيوه  →  اطبع "What if: ..."  →  رجّع False  →  return (مفيش قفل)
   └── لأ    →  رجّع True            →  كمّل للسطر اللي تحت
~~~

| الحتة | معناها |
|---|---|
| [[$PSCmdlet]] | المتغير اللي جه مع [[CmdletBinding]] |
| [[.ShouldProcess($target, 'schedule')]] | «أعمل العملية دي على ده؟» |
| [[-not]] | اعكس |
| [[return]] | اخرج من الدالة من غير ما تعمل حاجة |

**مكان السطر ده هو كل الحكاية:** قبل [[shutdown.exe]] بالظبط.

---

## ٤. التنفيذ

~~~powershell
shutdown.exe $flag /t $seconds /c $Message
Save-State -Kind $Kind -At $at
Write-Host "OK: $Kind الساعة $($at.ToString('HH:mm:ss'))" -ForegroundColor Green
~~~

| الحتة | معناها |
|---|---|
| [[$flag]] | [[/s]] أو [[/r]] |
| [[/t $seconds]] | بعد كام ثانية |
| [[/c $Message]] | رسالة تظهر في تنبيه ويندوز (لحد ٥١٢ حرف) |

التلات سطور دول **مبيوصلهمش التنفيذ** لما تكتب [[-WhatIf]].

---

## ٥. نشغّلها بالمعاينة

~~~powershell
.\pc.ps1 off -In 30 -WhatIf
~~~

~~~text الناتج
What if: Performing the operation "schedule" on target "off at 04:39:35".
~~~

~~~powershell
.\pc.ps1 restart -WhatIf
~~~

~~~text الناتج
What if: Performing the operation "schedule" on target "restart at 04:09:35".
~~~

### نقرا السطرين

الساعة وقت التجربة كانت **04:09:35**.

| الأمر | [[$In]] | الوقت | صح؟ |
|---|---|---|---|
| [[off -In 30]] | 30 | [[04:39:35]] | +٣٠ دقيقة ✔ |
| [[restart]] | 0 | [[04:09:35]] | حالًا ✔ |

ولاحظ إن [[schedule]] و [[off at ...]] اللي في السطر هما بالظبط [[$operation]] و [[$target]] اللي بعتناهم.

### ونتأكد إن مفيش أثر

~~~powershell
Test-Path "$env:LOCALAPPDATA\pc-tool\state.json"
~~~

~~~text الناتج
False
~~~

ملف الحالة متكتبش، لأن [[Save-State]] بعد البوابة.

---

## ٦. الفخ: الـ cmdlets الداخلية بترث [[-WhatIf]]

[[Save-State]] جواها:

~~~powershell
New-Item -ItemType Directory -Path $dir -Force -WhatIf:$false | Out-Null
... | Set-Content -Path $StatePath -Encoding utf8 -WhatIf:$false
~~~

### ليه [[-WhatIf:$false]]؟

لأن [[New-Item]] و [[Set-Content]] بيدعموا [[ShouldProcess]]، فلما تكتب [[-WhatIf]] على السكربت، **هما كمان بياخدوها**.

ونشوف الفرق بالظبط. نسخة **من غير** [[-WhatIf:$false]] (مع اللوج اللي هنضيفه في الخطوة الجاية):

~~~text الناتج
What if: Performing the operation "schedule" on target "off at 04:40:16".
What if: Performing the operation "Create Directory" on target "Destination: C:\Users\...\pc-tool".
What if: Performing the operation "Add Content" on target "Path: C:\Users\...\pc-tool\pc.log".
~~~

ونسخة **بـ** [[-WhatIf:$false]]:

~~~text الناتج
What if: Performing the operation "schedule" on target "off at 04:40:16".
~~~

**سطر واحد نضيف.**

### القاعدة

| نوع العملية | تعمل إيه |
|---|---|
| بتغيّر حاجة لليوزر (قفل، مسح، نقل) | سيبها ترث [[-WhatIf]] |
| داخلية للأداة (لوج، ملف حالة، فولدر مؤقت) | [[-WhatIf:$false]] |

واللوج بالذات مهم يفضل شغال في المعاينة، عشان تلاقي في اللوج إنك جرّبت.

---

## الخلاصة

- [[[CmdletBinding(SupportsShouldProcess)]]] بتدّي سكربتك [[-WhatIf]] و [[-Confirm]] و [[-Verbose]].
- [[if (-not $PSCmdlet.ShouldProcess($target, $op)) { return }]] قبل أي حاجة خطرة بالظبط.
- [[$target]] و [[$op]] هما اللي بيظهروا في سطر [[What if]]، فخليهم مفهومين.
- في PowerShell [[if]] بترجّع قيمة، فـ [[$flag = if (...) {...} else {...}]] شغالة.
- [[-f]] بتركّب النصوص بتنسيق، و [[{1:HH:mm:ss}]] بتعرض الوقت بس.
- الـ cmdlets الداخلية **بترث** [[-WhatIf]]. حطلها [[-WhatIf:$false]] عشان المعاينة تفضل نضيفة.
- [[SupportsShouldProcess]] من غير نداء [[ShouldProcess]] = [[-WhatIf]] كدّابة. دي أخطر من إنها مش موجودة.`,
          lines: [
            R`بتدّي السكربت -WhatIf و -Confirm و -Verbose زي أي cmdlet`,
            R`بداية المدخلات`,
            R`الفعل في الموقع الأول`,
            R`القيم المسموحة`,
            R`النوع والافتراضي`,
            R`حد أقصى أسبوع`,
            R`المهلة بالدقايق`,
            R`الرسالة اللي هتظهر في تنبيه ويندوز`,
            R`قفل الـ param`,
            R`دالة الجدولة`,
            R`بتاخد نوع العملية، ومتحقّق منه برضه`,
            R`دقايق لثواني في مكان واحد`,
            R`إمتى الحدث هيحصل`,
            R`/s للقفل و /r للريستارت، و if بترجّع قيمة`,
            R`النص اللي هيظهر لليوزر في المعاينة`,
            R`البوابة: لو -WhatIf مكتوبة، اطبع واخرج من غير ما تعمل حاجة`,
            R`التنفيذ الحقيقي: جدوِل القفل مع رسالة`,
            R`افتكر المعاد في ملف الحالة`,
            R`وأكّد لليوزر بالأخضر`,
            R`قفل الدالة`
          ]
        },

        {
          cmd: "مشروع ١ — التأكيد واللوج",
          title: "اسأل قبل الخطر، وسجّل كل حاجة، وارجع بكود معبّر",
          desc: R`الأداة شغالة. فاضل التلاتة اللي بيفرّقوا بين سكربت وأداة: **تأكيد** قبل الخطر، و **لوج** تعرف منه حصل إيه، و **exit code** يخلي غيرك يبني فوقك.

**التأكيد:** [[$PSCmdlet.ShouldContinue($query, $caption)]] بتسأل اليوزر سؤال [[نعم/لا]] وبترجّع رده. وهي غير [[ShouldProcess]]: دي بتتحكم فيها [[-WhatIf]]، و [[ShouldContinue]] سؤال انت كاتبه. ومعاها [[switch]] اسمها [[-Force]] عشان اللي عايز يعدّي من غير سؤال (مهم للجدولة الأوتوماتيكية).

**اللوج:** دالة [[Write-Log]] بتضيف سطر فيه الوقت والمستوى والرسالة في ملف نصي. و [[Write-Verbose]] جواها بتخلي نفس السطر يظهر على الشاشة لو شغّلت بـ [[-Verbose]]. **ولازم [[-WhatIf:$false]] على كتابة اللوج** عشان يتسجّل حتى في المعاينة.

**الـ exit code:** كل دالة بترجّع رقم، والسطر الأخير [[exit (Invoke-Schedule ...)]]. و [[0]] نجاح، و [[1]] «اليوزر رفض»، و [[2]] «فشل حقيقي». الفرق ده بيخلي سكربت تاني يقدر يفرّق.

وخلي بالك من فخ: الدالة في PowerShell بترجّع **كل** حاجة مكتوبة من غير ما تتاخد. فلو كتبت [[New-Item ...]] جوه دالة من غير [[| Out-Null]]، الـ object بتاعه هيتلزق في الناتج مع الرقم بتاعك.`,
          example: R`function Write-Log {
    param([string]$Text, [string]$Level = 'INFO')
    $dir = Split-Path -Parent $LogPath
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force -WhatIf:$false | Out-Null }
    $line = '{0} [{1}] {2}' -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'), $Level, $Text
    Add-Content -Path $LogPath -Value $line -Encoding utf8 -WhatIf:$false
    Write-Verbose $line
}

if (-not $PSCmdlet.ShouldProcess($target, 'schedule')) {
    Write-Log "WhatIf: $target"
    return 0
}
if (-not $Force -and -not $PSCmdlet.ShouldContinue("هيتعمل $target. أكمل؟", 'تأكيد')) {
    Write-Log 'اليوزر رفض' 'WARN'
    Write-Host 'اتلغى' -ForegroundColor Yellow
    return 1
}

shutdown.exe $flag /t $seconds /c $Message
$code = $LASTEXITCODE
if ($code -ne 0) {
    Write-Log "shutdown فشل بالكود $code" 'ERROR'
    Write-Error "shutdown.exe رجّع $code"
    return 2
}`,
          flag: "script danger",
          try: R`شغّل [[.\pc.ps1 off -In 30 -WhatIf -Verbose]]، وبعدين افتح ملف اللوج [[$env:LOCALAPPDATA\pc-tool\pc.log]]. هتلاقي السطر متسجّل برغم إن مفيش قفل حصل. ليه ده مفيد؟`,
          sol: R`~~~text الناتج (PowerShell 7.6، اتشغّل فعلًا)
PS> .\pc.ps1 restart -In 10 -WhatIf -Verbose
What if: Performing the operation "schedule" on target "restart at 04:17:10".
VERBOSE: 2026-10-28 04:07:10 [INFO] WhatIf: restart at 04:17:10

PS> Get-Content "$env:LOCALAPPDATA\pc-tool\pc.log"
2026-10-28 04:07:10 [INFO] WhatIf: off at 05:37:10
2026-10-28 04:07:10 [INFO] WhatIf: restart at 04:17:10
2026-10-28 04:07:10 [WARN] مفيش معاد متجدول
~~~

**ليه مفيد إن المعاينة نفسها تتسجّل؟** لأن اللوج بيبقى سجل **لكل حاجة الأداة عملتها أو كانت هتعملها**. لما تيجي بعد أسبوع تسأل «أنا جرّبت ده قبل كده؟» الرد في الملف.

ولاحظ إن [[-Verbose]] طبّعت نفس السطر على الشاشة. ده [[Write-Verbose]] جوه [[Write-Log]]: سطر واحد بيروح لمكانين.

والسطر التالت ([[WARN]]) من [[cancel]] اللي شغّلناه قبل كده. المستوى بيخليك تفلتر:

~~~powershell
Get-Content "$env:LOCALAPPDATA\pc-tool\pc.log" | Select-String 'ERROR|WARN'
~~~`,
          deep: {
            why: R`**اللوج:** الأداة دي هتشتغل وانت مش قدام الشاشة (مجدولة بالليل مثلًا). من غير لوج، لما حاجة تغلط مش هتعرف حصل إيه.

**التأكيد:** [[-WhatIf]] للمطوّر، والتأكيد لليوزر. حد ممكن يكتب [[.\pc.ps1 off]] وهو قاصد [[status]].

**الـ exit code:** عشان [[.\pc.ps1 off -Force && Write-Host "اتجدول"]] تشتغل صح، ولتعرف من Task Scheduler نجح ولا لأ.`,
            how: R`**[[ShouldProcess]] مقابل [[ShouldContinue]]:**

| | [[ShouldProcess]] | [[ShouldContinue]] |
|---|---|---|
| بيتحكم فيها | [[-WhatIf]] و [[-Confirm]] و [[$ConfirmPreference]] | انت بس |
| بتطبع | [[What if: ...]] | سؤالك انت |
| بتتجاوزها بـ | [[-Confirm:$false]] | [[-Force]] (انت بتكتبها) |
| المعتاد | قبل أي تغيير | للخطر الزيادة بس |

وترتيبهم: [[ShouldProcess]] الأول (عشان [[-WhatIf]] تمنع حتى السؤال)، وبعدها [[ShouldContinue]].

**[[-Force]] بتتكتب كده:**

~~~powershell
param(
    [switch]$Force
)
...
if (-not $Force -and -not $PSCmdlet.ShouldContinue($q, $c)) { return 1 }
~~~

[[-and]] بتعمل short-circuit: لو [[$Force]] موجودة، [[ShouldContinue]] **متتنفذش أصلًا**. وده مهم لأنها بترمي error في جلسة غير تفاعلية (زي Task Scheduler).

**[[-f]] في بناء سطر اللوج:**

~~~powershell
$line = '{0} [{1}] {2}' -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'), $Level, $Text
~~~

بيطلّع: [[2026-10-28 04:07:10 [INFO] WhatIf: off at 05:37:10]]. التاريخ بالصيغة دي بيترتب صح بالترتيب الأبجدي، وده بيخلي [[Sort-Object]] على اللوج شغال.

**مستويات اللوج:** [[INFO]] و [[WARN]] و [[ERROR]] اتفاق شائع. الفايدة إنك تفلتر: [[Select-String 'ERROR']].

**[[Add-Content]] مقابل [[Set-Content]]:** [[Add]] بتضيف في الآخر، و [[Set]] بتمسح وتكتب من الأول. للوج دايمًا [[Add-Content]].

**الـ exit codes المتفق عليها:**

| الكود | معناه |
|---|---|
| [[0]] | نجح |
| [[1]] | فشل عام / اليوزر رفض |
| [[2]] | فشل في عملية خارجية |

ومهم: [[exit]] في سكربت PowerShell بتقفل **الجلسة كلها** لو شغّلته بـ [[.]] (dot-sourcing)، فاستخدم [[.\script.ps1]] عادي.

**الفخ: الدالة بترجّع كل حاجة.**

~~~powershell
function Test-Me {
    New-Item -ItemType Directory "x"
    return 0
}
~~~

دي بترجّع **اتنين**: الـ object بتاع الفولدر، والصفر. الحل [[| Out-Null]] أو [[$null = ...]].`,
            when: "اللوج في أي أداة هتشتغل لوحدها. التأكيد في أي حاجة مش قابلة للرجوع. الـ exit code في أي سكربت حد تاني هيناديه.",
            mistakes: R`تكتب اللوج من غير [[-WhatIf:$false]]، فلا بيتسجّل في المعاينة ولا الشاشة تفضل نضيفة.

وتنسى [[-Force]]، فالأداة تعلّق في Task Scheduler مستنية رد مش جاي.

وتستخدم [[Set-Content]] للوج، فكل تشغيل يمسح اللي قبله.

وتسيب [[New-Item]] من غير [[Out-Null]] جوه دالة بترجّع رقم، فالرقم يرجع ومعاه زبالة.`
          },
          teach: R`## الفكرة

تلات إضافات بتحوّل السكربت لأداة: **لوج** و **تأكيد** و **exit code**.

كل الناتج اتشغّل فعلًا على ويندوز 11 / PowerShell 7.6، والجهاز معملش قفل ولا ريستارت.

---

## ١. [[Write-Log]]: دالة سطر واحد بتروح لمكانين

~~~powershell
function Write-Log {
    param([string]$Text, [string]$Level = 'INFO')
    $dir = Split-Path -Parent $LogPath
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force -WhatIf:$false | Out-Null }
    $line = '{0} [{1}] {2}' -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'), $Level, $Text
    Add-Content -Path $LogPath -Value $line -Encoding utf8 -WhatIf:$false
    Write-Verbose $line
}
~~~

### سطر سطر

**[[param([string]$Text, [string]$Level = 'INFO')]]**

الدوال بتاخد [[param]] زي السكربت. [[$Level]] افتراضيها [[INFO]]، فأغلب النداءات بتبقى [[Write-Log "حصل كذا"]].

**[[$dir = Split-Path -Parent $LogPath]]**

[[Split-Path -Parent]] بتاخد الفولدر من مسار ملف:

~~~text
C:\Users\7ossa\AppData\Local\pc-tool\pc.log
└──────────── -Parent ──────────────┘
~~~

**[[if (-not (Test-Path $dir)) { New-Item ... }]]**

اعمل الفولدر لو مش موجود. [[-Force]] عشان ميزعقش لو موجود، و [[| Out-Null]] عشان ميطبعش الـ object.

**[[-WhatIf:$false]]** عشان اللوج يشتغل حتى في المعاينة (التفصيلة دي في الخطوة اللي فاتت).

**[[$line = '{0} [{1}] {2}' -f ...]]**

~~~text شكل السطر
2026-10-28 04:07:10 [INFO] WhatIf: off at 05:37:10
└── {0} التاريخ ──┘ └{1}┘ └──── {2} الرسالة ────┘
~~~

التاريخ بصيغة [[yyyy-MM-dd HH:mm:ss]]: بيترتب صح أبجديًا، فـ [[Sort-Object]] على اللوج شغال.

**[[Add-Content]] مش [[Set-Content]]**

| | بتعمل إيه |
|---|---|
| [[Add-Content]] | تضيف في الآخر |
| [[Set-Content]] | تمسح الملف وتكتب من الأول |

للوج دايمًا [[Add-Content]].

**[[Write-Verbose $line]]**

نفس السطر بيظهر على الشاشة **بس لو** شغّلت بـ [[-Verbose]]. سطر واحد، مكانين.

---

## ٢. التأكيد: [[ShouldContinue]]

~~~powershell
if (-not $PSCmdlet.ShouldProcess($target, 'schedule')) {
    Write-Log "WhatIf: $target"
    return 0
}
if (-not $Force -and -not $PSCmdlet.ShouldContinue("هيتعمل $target. أكمل؟", 'تأكيد')) {
    Write-Log 'اليوزر رفض' 'WARN'
    Write-Host 'اتلغى' -ForegroundColor Yellow
    return 1
}
~~~

### بوابتين بالترتيب

~~~text
١. ShouldProcess   →  فيه -WhatIf؟  →  سجّل واخرج بـ 0
٢. ShouldContinue  →  اليوزر وافق؟  →  لأ: سجّل واخرج بـ 1
٣. نفّذ
~~~

**ليه [[ShouldProcess]] الأول؟** عشان [[-WhatIf]] تمنع حتى **السؤال**. المعاينة مينفعش تسأل.

### الفرق بينهم

| | [[ShouldProcess]] | [[ShouldContinue]] |
|---|---|---|
| مين بيتحكم فيها | [[-WhatIf]] و [[-Confirm]] | انت |
| النص | PowerShell بيبنيه | انت بتكتبه |
| تتجاوزها بـ | [[-Confirm:$false]] | [[-Force]] |

### ليه [[-not $Force -and ...]]؟

[[-and]] بتعمل **short-circuit**: لو [[$Force]] موجودة، [[-not $Force]] تبقى [[False]]، والطرف التاني **مبيتنفذش أصلًا**.

ودي مش تحسين، دي ضرورة: [[ShouldContinue]] بترمي error في جلسة غير تفاعلية. جرّبناها:

~~~text الناتج في جلسة مش تفاعلية من غير -Force
Exception calling "ShouldContinue" with "2" argument(s): "PowerShell is in NonInteractive
mode. Read and Prompt functionality is not available."
~~~

فلما تجدول الأداة في Task Scheduler، **لازم** [[-Force]].

---

## ٣. الـ exit codes

~~~powershell
shutdown.exe $flag /t $seconds /c $Message
$code = $LASTEXITCODE
if ($code -ne 0) {
    Write-Log "shutdown فشل بالكود $code" 'ERROR'
    Write-Error "shutdown.exe رجّع $code"
    return 2
}
~~~

### الاتفاق اللي مشينا عليه

| الكود | معناه | مين بيرجّعه |
|---|---|---|
| [[0]] | تمام (أو معاينة) | النجاح، و [[-WhatIf]] |
| [[1]] | اليوزر رفض | [[ShouldContinue]] رجعت [[False]] |
| [[2]] | عملية خارجية فشلت | [[shutdown.exe]] رجّع حاجة غير صفر |

### وفي آخر الملف

~~~powershell
switch ($Action) {
    'off'     { exit (Invoke-Schedule -Kind 'off') }
    'restart' { exit (Invoke-Schedule -Kind 'restart') }
    'cancel'  { exit (Invoke-Cancel) }
    'status'  { exit (Show-Status) }
}
~~~

[[exit]] بتخرج من السكربت بالرقم ده، والرقم بيوصل لـ [[$LASTEXITCODE]] بتاع اللي ناداه.

### الفايدة

~~~powershell
.\pc.ps1 off -In 30 -Force && Write-Host "اتجدول"
~~~

[[&&]] بتشتغل بس لو الكود صفر. من غير exit codes، مفيش طريقة تعرف.

---

## ٤. الفخ: الدالة بترجّع كل حاجة

في PowerShell، **أي حاجة الدالة بتطبعها بتبقى جزء من اللي بترجّعه**، مش بس اللي بعد [[return]].

~~~powershell
function Test-Me {
    New-Item -ItemType Directory "x"
    return 0
}
$r = Test-Me
$r.Count
~~~

~~~text الناتج
2
~~~

رجعت **اتنين**: الـ object بتاع الفولدر، وبعده الصفر.

### الحل

~~~powershell
New-Item -ItemType Directory "x" | Out-Null
# أو
$null = New-Item -ItemType Directory "x"
~~~

عشان كده في [[Write-Log]] و [[Save-State]] كل [[New-Item]] عليها [[| Out-Null]].

> [[Write-Host]] **استثناء**: بتكتب على الشاشة مباشرة ومبتدخلش في الناتج. عشان كده استخدمناها للرسايل.

---

## ٥. نشغّل الكل

~~~powershell
.\pc.ps1 restart -In 10 -WhatIf -Verbose
~~~

~~~text الناتج
What if: Performing the operation "schedule" on target "restart at 04:17:10".
VERBOSE: 2026-10-28 04:07:10 [INFO] WhatIf: restart at 04:17:10
~~~

سطرين: المعاينة من [[ShouldProcess]]، واللوج من [[Write-Verbose]].

### واللوج نفسه

~~~powershell
Get-Content "$env:LOCALAPPDATA\pc-tool\pc.log"
~~~

~~~text الناتج
2026-10-28 04:07:10 [INFO] WhatIf: off at 05:37:10
2026-10-28 04:07:10 [INFO] WhatIf: restart at 04:17:10
2026-10-28 04:07:10 [WARN] مفيش معاد متجدول
~~~

**تلات أسطر من تلات تشغيلات.** وكل سطر فيه الوقت والمستوى والتفصيلة.

### تفلتر فيه

~~~powershell
Get-Content "$env:LOCALAPPDATA\pc-tool\pc.log" | Select-String 'ERROR|WARN'
~~~

~~~text الناتج
2026-10-28 04:07:10 [WARN] مفيش معاد متجدول
~~~

دي فايدة المستويات: تقدر تجيب المشاكل بس.

---

## الخلاصة

- [[Write-Log]] بتكتب في ملف و [[Write-Verbose]] جواها بتوديها الشاشة كمان لو [[-Verbose]].
- [[Add-Content]] للوج، مش [[Set-Content]].
- التاريخ [[yyyy-MM-dd HH:mm:ss]] بيترتب صح أبجديًا.
- [[ShouldProcess]] الأول (للمعاينة)، وبعدها [[ShouldContinue]] (للتأكيد).
- [[-Force]] **ضرورية** مش رفاهية: [[ShouldContinue]] بترمي error في الجلسات غير التفاعلية.
- [[-and]] بتعمل short-circuit، وده اللي بيخلي [[-not $Force -and ...]] آمنة.
- exit codes: [[0]] نجاح، [[1]] رفض، [[2]] فشل خارجي. وبتخلي [[&&]] تشتغل.
- أي حاجة الدالة تطبعها بترجع معاها. [[| Out-Null]] على اللي مش عايزه.`,
          lines: [
            R`دالة اللوج`,
            R`الدوال بتاخد param زي السكربت، والمستوى الافتراضي INFO`,
            R`هات الفولدر من مسار الملف`,
            R`اعمله لو مش موجود، و -WhatIf:$false عشان اللوج يشتغل في المعاينة`,
            R`ركّب السطر: وقت ومستوى ورسالة، بصيغة بتترتب صح`,
            R`ضيف في آخر الملف (مش Set-Content اللي بتمسح)`,
            R`ونفس السطر على الشاشة لو شغّلت بـ -Verbose`,
            R`قفل الدالة`,
            R`البوابة الأولى: المعاينة`,
            R`سجّل إنها كانت معاينة`,
            R`واخرج بصفر: المعاينة مش فشل`,
            R`قفل الشرط`,
            R`البوابة التانية: التأكيد، و -Force بتتخطاها بفضل short-circuit`,
            R`سجّل الرفض كتحذير`,
            R`وقول لليوزر`,
            R`واخرج بواحد: رفض مش فشل تقني`,
            R`قفل الشرط`,
            R`التنفيذ الحقيقي`,
            R`خزّن كود الخروج على طول`,
            R`أي حاجة غير صفر يعني مشكلة`,
            R`سجّلها كخطأ`,
            R`وبلّغ اليوزر`,
            R`واخرج باتنين: فشل في عملية خارجية`,
            R`قفل الشرط`
          ]
        },

        {
          cmd: "مشروع ١ — ناديه من أي مكان",
          title: "خلي الأداة أمر بتكتبه، مش ملف بتدوّر عليه",
          desc: R`الأداة خلصت، بس لسه محتاج تكون واقف في فولدرها وتكتب [[.\pc.ps1]]. الخطوة دي بتخليها **كلمة** تكتبها من أي مكان، زي [[git]].

**الطريقة الأسهل: دالة في [[$PROFILE]].** الـ profile ملف بيتنفّذ أول ما تفتح PowerShell. تحط فيه:

[[function pc { & "$HOME\tools\pc.ps1" @args }]]

و [[@args]] بتمرّر **كل** اللي كتبته بعد [[pc]] للسكربت زي ما هو، فـ [[pc off -In 30 -WhatIf]] بتشتغل.

**الطريقة التانية: حط الفولدر في [[PATH]].** ساعتها تكتب [[pc.ps1]] (بالامتداد) من أي مكان. أنضف لو عندك كذا أداة.

**والتالتة: جدوله.** [[Register-ScheduledTask]] بيخلي ويندوز يشغّله لوحده. وهنا [[-Force]] بتبقى **ضرورية** لأن مفيش حد قدام الشاشة يرد على التأكيد.

وملاحظة مهمة في النداء: [[& "المسار"]] بالـ ampersand. من غيرها، PowerShell بيعتبر النص اللي فيه مسافات **نص** مش أمر.

ومكان [[$PROFILE]] بيختلف: اطبعه بنفسك. عندي طلع في فولدر [[OneDrive\Documents\PowerShell\]] لأن ويندوز بيزامن Documents.`,
          example: R`$PROFILE
Test-Path $PROFILE
New-Item -ItemType File -Path $PROFILE -Force
Add-Content $PROFILE 'function pc { & "$HOME\tools\pc.ps1" @args }'
. $PROFILE`,
          flag: "script",
          try: R`اطبع [[$PROFILE]] و [[$PROFILE.CurrentUserAllHosts]] وشوف الفرق. وبعدين عرّف الدالة في الجلسة الحالية بس (من غير ما تعدّل أي ملف) وجرّبها من فولدر تاني.`,
          sol: R`~~~text الناتج (PowerShell 7.6 على ويندوز 11)
PS> $PROFILE
C:\Users\7ossa\OneDrive\Documents\PowerShell\Microsoft.PowerShell_profile.ps1

PS> Test-Path $PROFILE
False

PS> $PROFILE.CurrentUserAllHosts
C:\Users\7ossa\OneDrive\Documents\PowerShell\profile.ps1
~~~

| المتغير | بيتنفّذ فين |
|---|---|
| [[$PROFILE]] | في الترمنال العادي بس |
| [[$PROFILE.CurrentUserAllHosts]] | في الترمنال **و** في VS Code و ISE |

[[Test-Path]] طلعت [[False]] يعني الملف لسه مش موجود، وده طبيعي على جهاز جديد. [[New-Item -Force]] بتعمله مع الفولدرات اللي ناقصة.

**والتجربة في الجلسة الحالية من غير ما تلمس أي ملف:**

~~~powershell
function pc { & "C:\path\to\pc.ps1" @args }
Set-Location C:\
pc status
pc off -In 15 -WhatIf
~~~

~~~text الناتج
مفيش معاد متجدول
What if: Performing the operation "schedule" on target "off at 04:25:28".
~~~

**اشتغلت من [[C:\]]**، يعني مش محتاج تبقى في فولدر السكربت.`,
          deep: {
            why: R`أداة بتكتب مسارها كل مرة = أداة مش هتستخدمها. الفرق بين [[pc off -In 30]] و [[& "C:\Users\me\tools\pc.ps1" off -In 30]] هو الفرق بين حاجة بتدخل في عادتك وحاجة بتنساها.`,
            how: R`**[[$PROFILE]] أربع ملفات مش واحد:**

| المتغير | لمين |
|---|---|
| [[$PROFILE]] | اليوزر ده، الترمنال ده |
| [[$PROFILE.CurrentUserAllHosts]] | اليوزر ده، كل الواجهات (VS Code كمان) |
| [[$PROFILE.AllUsersCurrentHost]] | كل اليوزرز (محتاج أدمن) |
| [[$PROFILE.AllUsersAllHosts]] | كل اليوزرز وكل الواجهات (أدمن) |

و PowerShell 7 و 5.1 ليهم ملفات **مختلفة** ([[Documents\PowerShell\]] مقابل [[Documents\WindowsPowerShell\]]).

**[[@args]]:**

~~~powershell
function pc { & "$HOME\tools\pc.ps1" @args }
~~~

[[$args]] قايمة بكل اللي اتكتب بعد اسم الدالة. و [[@]] قدامها (اسمها splatting) بتفردها كـ arguments منفصلة بدل ما تبعتها كقايمة واحدة.

| تكتب | بيوصل للسكربت |
|---|---|
| [[& $p $args]] | قيمة واحدة (قايمة) |
| [[& $p @args]] | arguments منفصلة |

**[[&]] (call operator):** لما يبقى الأمر في متغير أو نص فيه مسافات، لازم [[&]] قبله. من غيرها PowerShell بيطبع النص.

**[[. $PROFILE]] (نقطة ومسافة):** بتنفّذ الملف **في الجلسة الحالية** بدل جلسة جديدة، فالدوال اللي جواه تفضل موجودة. من غير النقطة، الدالة هتتعرّف وتموت على طول.

**طريقة الـ PATH:**

~~~powershell
$tools = "$HOME\tools"
[Environment]::SetEnvironmentVariable(
    'Path',
    [Environment]::GetEnvironmentVariable('Path', 'User') + ";$tools",
    'User'
)
~~~

بتعدّل PATH بتاع اليوزر بشكل دائم. محتاج ترمنال جديد بعدها. (متشغلهاش من غير ما تبص على [[$env:Path]] الأول.)

**الجدولة:**

~~~powershell
$action  = New-ScheduledTaskAction -Execute 'pwsh.exe' -Argument '-NoProfile -File "C:\tools\pc.ps1" off -In 0 -Force'
$trigger = New-ScheduledTaskTrigger -Daily -At 2am
Register-ScheduledTask -TaskName 'NightShutdown' -Action $action -Trigger $trigger
~~~

| الحتة | ليه |
|---|---|
| [[-NoProfile]] | أسرع، وميتأثرش بتعديلاتك في الـ profile |
| [[-File]] | شغّل ملف (مش [[-Command]]) |
| [[-Force]] | **ضرورية**: مفيش حد يرد على التأكيد |
| [[-In 0]] | حالًا، لأن الـ trigger هو اللي بيحدد الوقت |

(درس «Register-ScheduledTask» فيه التفاصيل.)`,
            when: "أي أداة هتستخدمها أكتر من مرة في الأسبوع.",
            mistakes: R`تحط [[$args]] بدل [[@args]]، فكل اللي كتبته يوصل كقيمة واحدة.

وتعدّل [[$PROFILE]] بتاع PowerShell 7 وتتوقعه يشتغل في 5.1. ملفين مختلفين.

وتنسى [[-Force]] في المهمة المجدولة، فالمهمة تعلّق مستنية رد.

وتكتب [["$HOME\tools\pc.ps1"]] من غير [[&]] قدامها، فالنص يتطبع ومحصلش حاجة.`
          },
          teach: R`## الفكرة

الأداة شغالة بس لسه بتكتب مسارها. هنخليها كلمة واحدة من أي مكان.

كل الناتج من ويندوز 11 / PowerShell 7.6.

---

## ١. فين الـ profile بتاعي؟

~~~powershell
$PROFILE
~~~

~~~text الناتج
C:\Users\7ossa\OneDrive\Documents\PowerShell\Microsoft.PowerShell_profile.ps1
~~~

### نقرا المسار

| الحتة | معناها |
|---|---|
| [[C:\Users\7ossa]] | فولدر اليوزر |
| [[OneDrive\Documents]] | Documents متزامن مع OneDrive على الجهاز ده |
| [[PowerShell]] | يعني PowerShell 7 (الـ 5.1 بيستخدم [[WindowsPowerShell]]) |
| [[Microsoft.PowerShell_profile.ps1]] | ملف الترمنال العادي |

**المسار عندك هيبقى مختلف.** اطبعه، متنسخش بتاعي.

~~~powershell
Test-Path $PROFILE
~~~

~~~text الناتج
False
~~~

لسه مش موجود، وده الوضع الطبيعي على جهاز جديد.

---

## ٢. [[$PROFILE]] فعلًا أربع ملفات

~~~powershell
$PROFILE.CurrentUserAllHosts
~~~

~~~text الناتج
C:\Users\7ossa\OneDrive\Documents\PowerShell\profile.ps1
~~~

| المتغير | بيتنفّذ فين |
|---|---|
| [[$PROFILE]] | الترمنال العادي بس |
| [[$PROFILE.CurrentUserAllHosts]] | الترمنال **و** VS Code **و** ISE |
| [[$PROFILE.AllUsersCurrentHost]] | كل اليوزرز (أدمن) |
| [[$PROFILE.AllUsersAllHosts]] | كل اليوزرز وكل الواجهات (أدمن) |

لأدواتك الشخصية، [[CurrentUserAllHosts]] أحسن: هتلاقي [[pc]] شغالة في ترمنال VS Code كمان.

---

## ٣. نعمل الملف ونضيف الدالة

~~~powershell
New-Item -ItemType File -Path $PROFILE -Force
~~~

[[-Force]] هنا بتعمل **الفولدرات الناقصة** في الطريق كمان، مش بس الملف.

~~~powershell
Add-Content $PROFILE 'function pc { & "$HOME\tools\pc.ps1" @args }'
~~~

> التنصيص **المفرد** مقصود: عايزين [[$HOME]] و [[@args]] يتكتبوا في الملف **زي ما هم**، ويتفسّروا لما الدالة تتنادى. لو استخدمنا [[" "]]، [[$HOME]] كانت هتتحوّل لمسارك دلوقتي.

### نفك الدالة

~~~powershell
function pc { & "$HOME\tools\pc.ps1" @args }
~~~

| الحتة | معناها |
|---|---|
| [[function pc]] | عرّف أمر اسمه [[pc]] |
| [[{ }]] | جسم الدالة |
| [[&]] | call operator: «شغّل ده كأمر» |
| [["$HOME\tools\pc.ps1"]] | مسار السكربت |
| [[@args]] | مرّر كل اللي اتكتب بعد [[pc]] |

### ليه [[&]] لازمة؟

من غيرها:

~~~powershell
"$HOME\tools\pc.ps1" off
~~~

PowerShell بيشوف نص، فبيطبعه. [[&]] بتقول «ده أمر، شغّله».

### ليه [[@args]] مش [[$args]]؟

| تكتب | [[pc off -In 30]] بيوصل إزاي |
|---|---|
| [[$args]] | قيمة **واحدة** = قايمة [[@('off','-In','30')]] |
| [[@args]] | تلات arguments منفصلة: [[off]] و [[-In]] و [[30]] |

[[@]] اسمها **splatting**: بتفرد القايمة لعناصر منفصلة. من غيرها السكربت هياخد كل حاجة في [[$Action]] ويزعق.

---

## ٤. نحمّل الـ profile من غير ما نقفل الترمنال

~~~powershell
. $PROFILE
~~~

**نقطة ومسافة وبعدين المسار.** دي اسمها [[dot-sourcing]]: نفّذ الملف **في الجلسة الحالية**.

| تكتب | بيحصل إيه |
|---|---|
| [[& $PROFILE]] | يتنفّذ في نطاق منفصل، والدوال تموت بعده |
| [[. $PROFILE]] | يتنفّذ هنا، والدوال تفضل موجودة |

---

## ٥. نجرّب من فولدر تاني

من غير ما نلمس أي ملف، نعرّف الدالة في الجلسة ونجرّب:

~~~powershell
function pc { & "C:\...\pc.ps1" @args }
Set-Location C:\
pc status
pc off -In 15 -WhatIf
~~~

~~~text الناتج
مفيش معاد متجدول
What if: Performing the operation "schedule" on target "off at 04:25:28".
~~~

**إحنا في [[C:\]] مش في فولدر السكربت، والأداة اشتغلت.** و [[-WhatIf]] عدّت كمان، يعني [[@args]] مرّرت كل حاجة صح.

---

## ٦. الطريقة التانية: الـ PATH

لو عندك كذا أداة، أنضف تحط الفولدر كله في [[PATH]]:

~~~powershell
$tools = "$HOME\tools"
[Environment]::SetEnvironmentVariable(
    'Path',
    [Environment]::GetEnvironmentVariable('Path', 'User') + ";$tools",
    'User'
)
~~~

| الحتة | معناها |
|---|---|
| [[[Environment]::GetEnvironmentVariable('Path','User')]] | PATH بتاع اليوزر الحالي |
| [[+ ";$tools"]] | ضيف فولدرك بفاصلة منقوطة |
| [[SetEnvironmentVariable(..., 'User')]] | احفظه بشكل دائم لليوزر |

> الأمر ده بيعدّل إعدادات جهازك بشكل دائم، فمشغلتوش هنا. اطبع [[$env:Path]] وشوفه الأول، وافتح ترمنال جديد بعده.

وبعدها تكتب [[pc.ps1]] (بالامتداد) من أي مكان.

| الطريقة | تكتب | أحسن لـ |
|---|---|---|
| دالة في [[$PROFILE]] | [[pc]] | أداة أو اتنين |
| فولدر في [[PATH]] | [[pc.ps1]] | مجموعة أدوات |

---

## ٧. التالتة: خليه يشتغل لوحده

~~~powershell
$action  = New-ScheduledTaskAction -Execute 'pwsh.exe' -Argument '-NoProfile -File "C:\tools\pc.ps1" off -In 0 -Force'
$trigger = New-ScheduledTaskTrigger -Daily -At 2am
Register-ScheduledTask -TaskName 'NightShutdown' -Action $action -Trigger $trigger
~~~

| الحتة | ليه |
|---|---|
| [[-NoProfile]] | أسرع، وميتأثرش بأي تعديل في الـ profile |
| [[-File]] | شغّل ملف، مش [[-Command]] |
| [[-In 0]] | حالًا، لأن الـ trigger هو اللي بيحدد الوقت |
| [[-Force]] | **ضرورية جدًا** |

### ليه [[-Force]] ضرورية هنا بالذات؟

جرّبنا الأداة في جلسة غير تفاعلية من غيرها:

~~~text الناتج
Exception calling "ShouldContinue" with "2" argument(s): "PowerShell is in NonInteractive
mode. Read and Prompt functionality is not available."
~~~

مفيش حد قدام الشاشة يرد على التأكيد، فالمهمة بتفشل. [[-Force]] بتتخطى السؤال.

> [[Register-ScheduledTask]] بيسجّل مهمة في ويندوز، فمشغلتوش هنا. التفاصيل في درس «Register-ScheduledTask».

---

## المشروع خلص: اللي اتعلمناه

| الخطوة | المهارة |
|---|---|
| ١ | صمّم الواجهة قبل الكود، و [[param()]] والقيم الافتراضية |
| ٢ | [[ValidateSet]] و [[ValidateRange]] و [[Position]] و [[switch]] |
| ٣ | قراية exit code من [[.exe]]، وحفظ الحالة في JSON |
| ٤ | [[SupportsShouldProcess]] و [[ShouldProcess]] و [[-WhatIf:$false]] |
| ٥ | اللوج، و [[ShouldContinue]] و [[-Force]]، و exit codes |
| ٦ | [[$PROFILE]] و [[@args]] و [[&]] و dot-sourcing والجدولة |

والأهم من كل ده: **الترتيب**. الواجهة، فالتحقق، فالآمن، فالخطر ومعاه الأمان، فالتسجيل، فالتوزيع. نفس الترتيب هيشتغل في أي أداة تبنيها.

---

## الخلاصة

- [[$PROFILE]] ملف بيتنفّذ أول ما تفتح PowerShell، و [[CurrentUserAllHosts]] بيشتغل في VS Code كمان.
- [[function pc { & "المسار" @args }]] بتحوّل السكربت لكلمة.
- [[&]] لازمة قدام أي مسار فيه مسافات، و [[@args]] (مش [[$args]]) عشان الـ arguments تتمرّر منفصلة.
- [[. $PROFILE]] بنقطة بتحمّل الملف في الجلسة الحالية.
- PowerShell 7 و 5.1 ليهم profiles مختلفة.
- للجدولة: [[-NoProfile]] و [[-File]] و [[-Force]]، والأخيرة ضرورية مش رفاهية.`,
          lines: [
            R`فين ملف الـ profile بتاعي: اطبعه، المسار بيختلف من جهاز لجهاز`,
            R`موجود ولا لأ: على جهاز جديد الرد False وده طبيعي`,
            R`اعمله، و -Force بتعمل الفولدرات الناقصة كمان`,
            R`ضيف الدالة، وبتنصيص مفرد عشان $HOME و @args ميتفسروش دلوقتي`,
            R`حمّل الملف في الجلسة الحالية بنقطة، من غير ما تقفل الترمنال`
          ]
        }
      ]
    }
]);
