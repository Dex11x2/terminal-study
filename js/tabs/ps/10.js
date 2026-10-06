// تكملة تاب ps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ps/01.js (شرح حقول الدرس في أوله)
MORE("ps", [
    {
      t: "شكّل PowerShell بتاعك",
      l: 2,
      n: R`ألوان، و prompt بيوريك الفولدر والـ branch، واقتراحات من أوامرك القديمة، وأيقونات للملفات: الترمنال اللي قاعد قدامه كل يوم يبقى مريح ويديك المعلومة من غير ما تسأل عليها`,
      items: [
        {
          cmd: "$PSStyle",
          title: "لوّن الكلام والملفات",
          desc: R`[[$PSStyle]] متغير جاهز في PowerShell 7.2 وأحدث، فيه أكواد الألوان والتنسيق بأسامي مفهومة، فتلوّن أي نص بتطبعه، وتغيّر ألوان رسايل الـ error وأسامي الفولدرات والملفات في [[ls]].

الترمنال بيفهم الألوان من «أكواد ANSI»: حروف بتبدأ بحرف خاص اسمه ESC (رقمه 27) وبعده كود زي [[[32m]] (أخضر) أو [[[0m]] (رجّع كل حاجة عادي). [[$PSStyle.Foreground.Green]] هو الكود ده جاهز، و [[$PSStyle.Reset]] بيقفل التلوين، ولو نسيته كل اللي بعده هيفضل ملوّن. و [[$( )]] جوه نص بين double quotes بتحط قيمة جوه النص (درس النصوص). و [[$PSStyle.Foreground.FromRgb(0xFF8800)]] أي لون بالـ hex ([[0x]] قبل الرقم معناها إنه hex)، و [[$PSStyle.Bold]] خط عريض.

[[$PSStyle.Formatting.Error]] لون رسايل الـ error (وجنبه [[Warning]] و [[Verbose]] و [[TableHeader]] لعناوين الجداول). و [[$PSStyle.FileInfo.Directory]] لون الفولدرات في [[Get-ChildItem]]، و [[+]] بين كودين بيجمعهم (لون + bold). و [[$PSStyle.FileInfo.Extension[".md"]]] لون امتداد معين، والقوسين المربعين هنا بيختاروا المفتاح من لستة الامتدادات. و [[$PSStyle.OutputRendering]] بيقرر الألوان تطلع إمتى: [[Host]] (الافتراضي) ملوّن على الشاشة، و [[PlainText]] من غير ألوان خالص، و [[Ansi]] الأكواد دايمًا حتى لو الناتج رايح لملف.

التغيير ده للنافذة دي بس؛ عشان يفضل حطه في [[$PROFILE]] (درس «$PROFILE»). وفي Windows PowerShell 5.1 مفيش [[$PSStyle]] أصلًا، فبتكتب الكود بإيدك: [[$e = [char]27]] وبعدين [["$e[32mOK$e[0m"]]. والألوان شغالة في Windows Terminal و VS Code؛ في الكونسول القديم (conhost) مع 5.1 ممكن تشوف حروف زي [[←[32m]] بدل اللون.`,
          example: R`"$($PSStyle.Foreground.Green)OK$($PSStyle.Reset) build passed"
"$($PSStyle.Bold)$($PSStyle.Foreground.FromRgb(0xFF8800))3 warnings$($PSStyle.Reset)"
$PSStyle.Formatting.Error = $PSStyle.Foreground.BrightRed
$PSStyle.FileInfo.Directory = $PSStyle.Foreground.BrightBlue + $PSStyle.Bold
$PSStyle.FileInfo.Extension[".md"] = $PSStyle.Foreground.Magenta
Get-ChildItem
$PSStyle.OutputRendering`,
          try: R`خلّي ملفات [[.json]] تظهر أصفر في [[ls]]، واطبع [[$PSStyle.FileInfo.Extension.Keys]] عشان تشوف الامتدادات اللي ليها لون من الأول.`,
          deep: {
            why: R`الألوان مش زينة وبس: سطر [[OK]] أخضر وسطر [[FAIL]] أحمر بتلاحظهم من غير ما تقرا، والفولدرات بلون مختلف بتفرّقها عن الملفات بنظرة. وقبل 7.2 كنت لازم تحفظ أكواد زي [[[32m]] أو تستخدم [[Write-Host -ForegroundColor]] اللي مش بيدخل الـ pipeline.`,
            how: R`كل قيمة في [[$PSStyle]] نص عادي فيه كود ANSI، فتقدر تطبعه أو تلزقه في أي نص أو ترجعه من فانكشن. جرّب [[$PSStyle.Foreground.Red -replace [char]27, 'ESC']] هتشوف [[ESC[31m]]: الـ [[-replace]] بدّل حرف ESC (اللي مش بيتطبع) بكلمة عشان تشوفه.

الفرق عن [[Write-Host -ForegroundColor Green]]: Write-Host بيكتب على الشاشة بس (درس «Write-Host والـ output»)، لكن النص الملوّن بـ $PSStyle قيمة عادية تتخزن في متغير أو تبقى جزء من الـ prompt (الدرس الجاي). وكمان [[FromRgb]] بيديك أي لون من 16 مليون، و Write-Host مفيهوش غير الـ 16 لون بتوع الكونسول.

[[$PSStyle.Foreground]] فيه 16 لون: [[Black]] و [[Red]] و [[Green]] و [[Yellow]] و [[Blue]] و [[Magenta]] و [[Cyan]] و [[White]]، ولكل واحد نسخة [[Bright]] (و [[BrightBlack]] هو الرمادي). و [[$PSStyle.Background]] نفس الأسامي للخلفية. وفيه كمان [[Italic]] و [[Underline]] و [[Strikethrough]]، و [[Dim]] من 7.4. و [[$PSStyle.Progress.View]] شكل شريط التقدم: [[Minimal]] (الافتراضي، سطر واحد) أو [[Classic]] (المربع القديم فوق).

[[OutputRendering]] بـ [[Host]] بيشيل الأكواد من ناتج الـ formatting (الجداول و [[ls]] والـ errors) لما يروح لملف، فاللوج ميتملاش حروف غريبة. لكن النص اللي انت لازق فيه الأكواد بإيدك بيتكتب زي ما هو: جربت [[Get-ChildItem > ls.txt]] فالملف طلع من غير ESC، و [["$($PSStyle.Foreground.Green)hi" > s.txt]] الملف طلع فيه ESC. ولو متغير البيئة [[NO_COLOR]] موجود، PowerShell بيخلي OutputRendering بـ [[PlainText]] لوحده.`,
            when: R`في سكربتاتك عشان تلوّن النتايج المهمة (نجح، فشل، تحذير)، وفي الـ [[$PROFILE]] عشان تظبط ألوان الـ errors والملفات على ذوقك أو على خلفية الترمنال (الألوان الافتراضية معمولة لخلفية غامقة، فعلى خلفية فاتحة ممكن تحتاج تغيّرها).`,
            mistakes: R`تنسى [[$PSStyle.Reset]] في آخر النص فالسطر اللي بعده والـ prompt يتلوّنوا. أو تستخدم [[$PSStyle]] في سكربت هيشتغل على 5.1 فالألوان تبقى فاضية من غير أي error (المتغير مش موجود فقيمته [[$null]]). أو تحط ألوان في نص هيتكتب في ملف CSV أو JSON فتلاقي الأكواد جوه الداتا. أو تحط [[$PSStyle.OutputRendering = "PlainText"]] وتنسى، وبعدين تستغرب الألوان راحت فين.`
          },
          teach: R`## الأول: الترمنال بيلوّن إزاي؟

الترمنال مش بيشوف «أخضر». بيشوف حروف مخفية قبل الكلام، اسمها **أكواد ANSI**، أولها حرف اسمه **ESC** (رقمه 27) مبيتطبعش. [[$PSStyle]] متغير جاهز في PowerShell 7.2 وأحدث، شايل الأكواد دي بأسامي مفهومة. المثال: نلوّن نص، ونغيّر ألوان الـ errors والملفات، ونعرف الألوان بتطلع إمتى.

اتشغّل على PowerShell 7.6. وعشان الأكواد تتشاف في الصفحة، بدّلت حرف ESC بكلمة [[ESC]] بالأمر [[-replace [char]27, 'ESC']].

---

## ١. [[$( )]] جوه النص

~~~powershell
"$($PSStyle.Foreground.Green)OK$($PSStyle.Reset) build passed"
~~~

### [[$( )]]

جوه نص بين double quotes، [[$( )]] معناها «نفّذ اللي جوايا وحط النتيجة هنا». فالنص بيتكوّن من ٤ حتت:

~~~text الحتت
$($PSStyle.Foreground.Green)   كود الأخضر
OK                             الكلام
$($PSStyle.Reset)              كود «رجّع كل حاجة عادي»
 build passed                  باقي الكلام بلونه العادي
~~~

### النص الحقيقي

~~~text الناتج بعد ما ESC اتكتبت كلمة
ESC[32mOKESC[0m build passed
~~~

[[ESC[32m]] = ابدأ أخضر، و [[ESC[0m]] = Reset. والنص طوله 24 حرف مع إن اللي بيبان 15، لأن الأكواد حروف برضه بس مبتبانش.

> لو نسيت [[$PSStyle.Reset]]، كل اللي بعده (حتى الـ prompt) هيفضل أخضر.

---

## ٢. لون بالـ hex و bold

~~~powershell
"$($PSStyle.Bold)$($PSStyle.Foreground.FromRgb(0xFF8800))3 warnings$($PSStyle.Reset)"
~~~

- [[$PSStyle.Bold]]: خط عريض، كوده [[ESC[1m]].
- [[FromRgb(0xFF8800)]]: أي لون من 16 مليون. [[0x]] قبل الرقم معناها إنه **hex** (أساس 16)، زي ألوان المواقع [[#FF8800]]: [[FF]] أحمر و [[88]] أخضر و [[00]] أزرق.

~~~text الناتج
ESC[1mESC[38;2;255;136;0m3 warningsESC[0m
~~~

[[38;2;255;136;0]] = «لون الكلام (38)، بالـ RGB (2)، أحمر 255 وأخضر 136 وأزرق 0». و 0x88 بالعشري 136.

---

## ٣. ألوان PowerShell نفسه

### [[$PSStyle.Formatting.Error = $PSStyle.Foreground.BrightRed]]

لون رسايل الـ error. الافتراضي كان [[ESC[31;1m]] (أحمر عريض)، والجديد [[ESC[91m]] (أحمر فاتح). و [[Bright]] قبل اسم أي لون = النسخة الفاتحة.

### [[$PSStyle.FileInfo.Directory = $PSStyle.Foreground.BrightBlue + $PSStyle.Bold]]

لون الفولدرات في [[ls]]. الافتراضي [[ESC[44;1m]] (44 = **خلفية** زرقا). و [[+]] بين نصين بيلزقهم، فبقى [[ESC[94mESC[1m]]: أزرق فاتح + عريض.

### [[$PSStyle.FileInfo.Extension[".md"] = $PSStyle.Foreground.Magenta]]

[[Extension]] لستة امتداد ← لون، والأقواس المربعة بتختار المفتاح [[".md"]]. لو مش موجود بيتضاف.

## ٤. [[Get-ChildItem]]

على فولدر التجربة، والأكواد ظاهرة:

~~~text الناتج
d----   10/6/2026  9:44 AM        ESC[94mESC[1msrcESC[0m
-a---   10/6/2026  9:44 AM      3 ESC[32;1mapp.jsESC[0m
-a---   10/6/2026  9:45 AM      3 ESC[33;1mbuild.ps1ESC[0m
-a---   10/6/2026  9:44 AM      4 package.json
-a---   10/6/2026  9:44 AM      6 ESC[35mREADME.mdESC[0m
~~~

| الملف | لونه | ليه |
|---|---|---|
| [[src]] | أزرق فاتح عريض | الـ Directory اللي غيّرناه |
| [[README.md]] | Magenta ([[35]]) | الامتداد اللي زوّدناه |
| [[build.ps1]] | أصفر عريض | [[.ps1]] ليه لون من الأول |
| [[app.js]] | أخضر عريض | [[.js]] في متغير [[PATHEXT]] بتاع ويندوز، فبيتعامل كملف تنفيذي |
| [[package.json]] | من غير لون | [[.json]] ملوش لون |

---

## ٥. [[$PSStyle.OutputRendering]]

~~~text الناتج
Host
~~~

| القيمة | الألوان بتطلع إمتى |
|---|---|
| [[Host]] | على الشاشة بس. لو الناتج رايح لملف بيتشال |
| [[PlainText]] | أبدًا |
| [[Ansi]] | دايمًا، حتى في الملف (ده اللي استخدمته عشان أطلّع الأكواد فوق) |

---

## جدول الأكواد اللي شفناها

| الكود | معناه |
|---|---|
| [[ESC[0m]] | Reset |
| [[ESC[1m]] | Bold |
| [[ESC[31m]] لـ [[ESC[37m]] | لون الكلام (أحمر، أخضر، أصفر، أزرق، Magenta، Cyan، أبيض) |
| [[ESC[90m]] لـ [[ESC[97m]] | نفس الألوان فاتحة (Bright) |
| [[ESC[44m]] | خلفية زرقا (40 لـ 47 خلفيات) |
| [[ESC[38;2;R;G;Bm]] | أي لون بالـ RGB |

## في Windows PowerShell 5.1

[[$PSStyle]] مش موجود (جربت: [[$null -eq $PSStyle]] رجع True)، فبتكتب الكود بإيدك:

~~~powershell
$e = [char]27
"$e[32mOK$e[0m"
~~~

[[[char]27]] بيحوّل الرقم 27 للحرف ESC. وفي bash نفس الكود: [[printf '\e[32mOK\e[0m\n']].

## الخلاصة

~~~text
$PSStyle.Foreground.X    كود اللون، و Reset في الآخر دايمًا
$( ) جوه " "             حط قيمة جوه النص
Formatting / FileInfo    ألوان الـ errors و ls
التغيير للنافذة دي بس     حطه في $PROFILE عشان يفضل
~~~`,
          lines: [
            "نص فيه كلمة OK بالأخضر، و Reset بعدها عشان الباقي يرجع عادي.",
            "خط عريض ولون برتقالي بالـ hex ([[0xFF8800]]).",
            "رسايل الـ error تبقى أحمر فاتح.",
            "الفولدرات في ls أزرق فاتح وعريض (لونين مجموعين بـ [[+]]).",
            "ملفات .md بلون Magenta.",
            "اعرض الفولدر وشوف الألوان الجديدة.",
            "الألوان بتطلع إمتى؟ الافتراضي Host."
          ],
          sol: R`[[$PSStyle.FileInfo.Extension[".json"] = $PSStyle.Foreground.Yellow]] وبعدين [[Get-ChildItem]]: أسامي ملفات .json هتطلع صفرا والفولدرات بلونها. جربت المثال على PowerShell 7.6 وطلّعت الناتج بالأكواد بدل الألوان: الفولدر [[src]] طلع قبله [[ESC[94mESC[1m]] (أزرق فاتح + bold) وبعده [[ESC[0m]]، و [[notes.md]] قبله [[ESC[35m]] (Magenta)، و [[build.ps1]] قبله [[ESC[33;1m]] (لون جاهز لملفات PowerShell).

[[$PSStyle.FileInfo.Extension.Keys]] طلّع الامتدادات كل واحد في سطر: أول 11 جاهزين من الأول ([[.zip]] و [[.tgz]] و [[.gz]] و [[.tar]] و [[.nupkg]] و [[.cab]] و [[.7z]] و [[.ps1]] و [[.psd1]] و [[.psm1]] و [[.ps1xml]]، يعني ملفات الضغط وملفات PowerShell)، وبعدهم اللي انت زوّدته ([[.md]] و [[.json]]). وملحوظة: [[app.js]] طلع أخضر عريض من غير ما أحدد له لون، لأن [[.js]] موجود في متغير [[PATHEXT]] بتاع ويندوز فـ PowerShell بيعتبره ملف تنفيذي ويلوّنه بـ [[$PSStyle.FileInfo.Executable]]. ولو الألوان مش ظاهرة خالص، اطبع [[$PSStyle.OutputRendering]]: لو [[PlainText]] يبقى حد غيّره أو متغير [[NO_COLOR]] موجود (لقيته موجود في البيئة اللي جربت فيها، وأول ما شلته رجعت [[Host]]).`,
          solCode: R`$PSStyle.FileInfo.Extension[".json"] = $PSStyle.Foreground.Yellow
Get-ChildItem
$PSStyle.FileInfo.Extension.Keys`
        },
        {
          cmd: "function prompt",
          title: "اعمل الـ prompt بتاعك",
          desc: R`الـ prompt (الكلام اللي قبل المكان اللي بتكتب فيه، زي [[PS C:\Users\ali\projects\shop>]]) هو ناتج فانكشن اسمها [[prompt]]، و PowerShell بينادي عليها قبل كل أمر. لو عرّفت فانكشن بنفس الاسم، الـ prompt بتاعك هو اللي هيظهر: هنا الوقت، واسم الفولدر الحالي بس بدل المسار كله، والـ git branch، و [[[admin]]] لو النافذة أدمن، وسهم أخضر أو أحمر حسب آخر أمر نجح ولا لأ، وكمان اسم الفولدر في عنوان النافذة.

القاعدة الأساسية: الفانكشن لازم ترجع نص، والنص ده هو الـ prompt (عشان كده آخر سطر نص لوحده من غير [[Write-Host]]). لو مرجعتش حاجة أو حصل فيها error، PowerShell بيعرض [[PS>]] وخلاص.

السطرين اللي بره الفانكشن بيتحسبوا مرة واحدة بس: [[$IsAdmin]] بيسأل ويندوز «اليوزر الحالي ليه دور Administrator؟» ([[[Security.Principal.WindowsPrincipal]]] نوع من .NET، و [[::GetCurrent()]] بيجيب اليوزر الحالي)، و [[$HasGit]] هل git متسطب (و [[[bool]]] بيحوّل النتيجة لـ True أو False).

جوه الفانكشن: [[$ok = $?]] لازم أول سطر، لأن [[$?]] فيها True لو آخر أمر نجح، وأي سطر قبلها هيغيّرها. و [[$code = $LASTEXITCODE]] بيحفظ exit code آخر برنامج، لأن [[git]] جوه الـ prompt هيكتب فوقه، وفي الآخر [[$global:LASTEXITCODE = $code]] بيرجّعه ([[$global:]] يعني المتغير اللي بره الفانكشن، مش نسخة جواها). و [[Split-Path -Leaf $PWD.Path]] آخر جزء من المسار، و [[$PWD]] متغير جاهز فيه الفولدر الحالي. و [[git branch --show-current]] اسم الـ branch، و [[2>$null]] بيرمي رسالة الـ error لو انت مش جوه repo. و [[$Host.UI.RawUI.WindowTitle]] عنوان النافذة أو التاب. و [[+=]] بتزوّد على النص اللي في المتغير، والألوان من [[$PSStyle]] (الدرس اللي فات).

الكود ده بيفضل للنافذة دي بس. عشان يبقى دايم، الصقه في [[$PROFILE]] (افتحه بـ [[code $PROFILE]] أو [[notepad $PROFILE]]، والخطوات في درس «$PROFILE» في «البيئة والإعدادات») وبعدين [[. $PROFILE]].`,
          example: R`$IsAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
$HasGit = [bool](Get-Command git -ErrorAction SilentlyContinue)

function prompt {
    $ok = $?
    $code = $LASTEXITCODE
    $folder = Split-Path -Leaf $PWD.Path
    $branch = if ($HasGit) { git branch --show-current 2>$null }
    $Host.UI.RawUI.WindowTitle = "$folder - PowerShell"
    $p = "$($PSStyle.Foreground.BrightBlack)$(Get-Date -Format HH:mm) $($PSStyle.Foreground.Cyan)$folder"
    if ($branch) { $p += " $($PSStyle.Foreground.Green)($branch)" }
    if ($IsAdmin) { $p += " $($PSStyle.Foreground.Red)[admin]" }
    $arrow = if ($ok) { $PSStyle.Foreground.Green } else { $PSStyle.Foreground.Red }
    $global:LASTEXITCODE = $code
    "$p$arrow > $($PSStyle.Reset)"
}`,
          try: R`الصق الكود في النافذة، وادخل فولدر فيه git repo وفولدر مفيهوش، واكتب [[Get-Item nosuchfile]] وشوف السهم بقى أحمر. وبعدين احفظه في [[$PROFILE]].`,
          flag: "script",
          deep: {
            why: R`الـ prompt الافتراضي بيكتب المسار كله، فلما تبقى في [[C:\Users\ali\Documents\projects\shop\frontend\src]] نص الشاشة بيروح عليه. وأهم معلومة وانت شغال بـ git (انت على أنهي branch) مش ظاهرة، فتعمل commit على main بالغلط. prompt بيوريك اللي محتاجه بس بيوفّر عليك [[git status]] و [[pwd]] كل شوية.`,
            how: R`PowerShell بينادي [[prompt]] بعد كل أمر ويطبع اللي رجع. ولو PSReadLine شغال (وهو شغال افتراضيًا)، بيلوّن آخر [[> ]] في الـ prompt بالأحمر لو السطر اللي بتكتبه فيه غلطة syntax، ولو الحتة دي اتلخبطت مع الـ prompt بتاعك فيه [[Set-PSReadLineOption -PromptText "> "]].

الفانكشن بتتنفذ قبل كل أمر، فلازم تبقى سريعة: [[git branch --show-current]] بياخد ملّي ثواني، لكن [[git status]] على repo كبير ممكن ياخد ثانية كل مرة. وعشان كده [[$IsAdmin]] و [[$HasGit]] بره الفانكشن: بيتحسبوا مرة لما الـ profile يتحمّل، مش مع كل أمر.

[[(Get-Command prompt).ScriptBlock]] بيوريك كود الـ prompt الحالي. والافتراضي بتاع PowerShell هو [["PS $($ExecutionContext.SessionState.Path.CurrentLocation)$('>' * ($NestedPromptLevel + 1)) "]]. ولو عايز ترجع له، افتح نافذة جديدة (أو امسح الكود من الـ profile).

[[git branch --show-current]] محتاج git 2.22 أو أحدث، وفي حالة detached HEAD بيرجع فاضي فالـ branch مش هيظهر، وده مقصود. ولو git مش متسطب، [[2>$null]] لوحدها مش بتخفي error «is not recognized»، وعشان كده [[$HasGit]].

في 5.1 لو عايز ألوان، بدّل [[$PSStyle.Foreground.Green]] بـ [["$([char]27)[32m"]] و [[$PSStyle.Reset]] بـ [["$([char]27)[0m"]]. ولو عايز prompt جاهز بأيقونات من غير ما تكتب كود، ده oh-my-posh (آخر درس في الجزء ده)، بس هو بيعرّف [[prompt]] بتاعته، فاللي يتحمّل الأخير في الـ profile هو اللي بيكسب.`,
            when: R`أول ما تبدأ تشتغل في الترمنال يوميًا، وخصوصًا مع git ومع نوافذ أدمن ([[[admin]]] الأحمر بينبّهك قبل ما تمسح حاجة وانت بصلاحيات عالية). وعنوان النافذة مفيد لما يبقى عندك تابات كتير في Windows Terminal.`,
            mistakes: R`[[$ok = $?]] مش أول سطر، فبتقرا نتيجة سطر جوه الفانكشن مش آخر أمر انت كتبته، والسهم يفضل أخضر دايمًا. أو تطبع الـ prompt بـ [[Write-Host]] من غير ما ترجع نص، فيظهر جنبه [[PS>]]. أو تنسى ترجّع [[$LASTEXITCODE]] فسكربتاتك تقرا 128 بتاعة git. أو تحط أمر بطيء (زي [[git status]] أو طلب من النت) فكل Enter تستنى. أو تحط الكود في profile بتاع 5.1 وانت شغال على 7 (كل نسخة ليها [[$PROFILE]] منفصل).`
          },
          teach: R`## الأول: الـ prompt فانكشن

السطر [[PS C:\Users\ali>]] اللي قبل ما تكتب ده ناتج فانكشن اسمها [[prompt]]، و PowerShell بينادي عليها قبل كل أمر ويطبع النص اللي رجعته. فلو عرّفت فانكشن بنفس الاسم، الـ prompt يبقى بتاعك. والافتراضية دي:

~~~powershell
(Get-Command prompt).ScriptBlock
~~~

~~~text الناتج
"PS $($executionContext.SessionState.Path.CurrentLocation)$('>' * ($nestedPromptLevel + 1)) ";
~~~

يعني [[PS]] والمسار و [[>]]. هنفك المثال سطر سطر. اتشغّل على PowerShell 7.6 (وشلت أكواد الألوان من الناتج أو كتبتها [[ESC]]).

---

## السطرين اللي بره الفانكشن

بيتحسبوا **مرة واحدة** لما الكود يتشغّل، مش مع كل prompt.

### [[$IsAdmin = ...]]

من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[[Security.Principal.WindowsIdentity]::GetCurrent()]] | اليوزر اللي شغّال النافذة دي. [[::]] بتنادي method تبع النوع نفسه |
| [[[Security.Principal.WindowsPrincipal]...]] | حوّله لنوع يقدر يجاوب على «ليك دور كذا؟» |
| [[.IsInRole(...)]] | السؤال نفسه |
| [[[Security.Principal.WindowsBuiltInRole]::Administrator]] | الدور: Administrator |

النتيجة True أو False. في نافذة عادية طلع [[IsAdmin=False]].

### [[$HasGit = [bool](Get-Command git -ErrorAction SilentlyContinue)]]

- [[Get-Command git]]: لو git متسطب بيرجع الأمر، لو لأ error.
- [[-ErrorAction SilentlyContinue]]: من غير error، يرجع فاضي.
- [[[bool]]]: حاجة موجودة = True، فاضي = False.

جربت: [[[bool](Get-Command git ...)]] طلع True، و [[[bool](Get-Command nosuchcmd ...)]] طلع False.

---

## جوه الفانكشن، سطر سطر

### [[$ok = $?]]

[[$?]] متغير جاهز: True لو **آخر أمر** نجح. لازم يبقى أول سطر، لأن أي سطر قبله هيبقى هو «آخر أمر».

### [[$code = $LASTEXITCODE]]

[[$LASTEXITCODE]] رقم الخروج (exit code) بتاع آخر **برنامج** خارجي (زي git أو node)، و 0 يعني نجح. بنحفظه لأن [[git]] اللي تحت هيكتب فوقه.

### [[$folder = Split-Path -Leaf $PWD.Path]]

[[$PWD]] الفولدر الحالي، و [[.Path]] كنص. و [[Split-Path -Leaf]] آخر جزء بس: [[Split-Path -Leaf "C:\Users\ali\projects\shop"]] رجع [[shop]].

### [[$branch = if ($HasGit) { git branch --show-current 2>$null }]]

- [[if]] هنا بترجع قيمة تتحط في المتغير.
- [[git branch --show-current]]: اسم الـ branch.
- [[2>$null]]: [[2]] رقم مجرى الـ errors، و [[>]] وجّهه، و [[$null]] مكان بيرمي أي حاجة. فبره أي repo الـ error بيختفي والـ branch بيبقى فاضي.

### [[$Host.UI.RawUI.WindowTitle = "$folder - PowerShell"]]

[[$Host]] النافذة نفسها، و [[WindowTitle]] عنوانها (أو اسم التاب في Windows Terminal).

### [[$p = "..."]]

أول النص: الوقت باللون الرمادي ([[BrightBlack]])، و [[Get-Date -Format HH:mm]] الساعة بالـ 24 ساعة، وبعدين اسم الفولدر بالـ Cyan.

### [[if ($branch) { $p += " ...($branch)" }]]

لو فيه branch، [[+=]] تزوّد على آخر النص.

### [[if ($IsAdmin) { $p += " ...[admin]" }]]

نفس الفكرة لـ [[[admin]]] بالأحمر.

### [[$arrow = if ($ok) { ...Green } else { ...Red }]]

لون السهم حسب [[$ok]].

### [[$global:LASTEXITCODE = $code]]

رجّع الرقم اللي حفظناه. [[$global:]] معناها «المتغير اللي بره الفانكشن»، لأن من غيرها هتعمل نسخة جوه الفانكشن تموت معاها.

### [["$p$arrow > $($PSStyle.Reset)"]]

نص لوحده من غير [[Write-Host]] = ده اللي الفانكشن بترجعه = ده الـ prompt. و Reset في الآخر عشان اللي هتكتبه ميتلوّنش.

---

## جربته

~~~text الناتج في فولدر المشروع (فيه git)
ESC[90m09:46 ESC[36mfull stack road map ESC[32m(main)ESC[32m > ESC[0m
~~~

~~~text بعد Get-Item nosuchfile (فشل)
ESC[90m09:46 ESC[36mfull stack road map ESC[32m(main)ESC[31m > ESC[0m
~~~

السهم بقى [[ESC[31m]] أحمر لأن [[$?]] بقت False.

~~~text في $HOME (مفيش git repo)
ESC[90m09:46 ESC[36maliESC[32m > ESC[0m
~~~

مفيش [[(main)]] لأن الـ branch فاضي. وبعدها [[git branch --show-current]] بره repo خلّى [[$LASTEXITCODE]] = [[128]]، وده بالظبط الرقم اللي [[$global:LASTEXITCODE = $code]] بيمنعه يوصل لسكربتاتك.

---

## ملخص

| السطر | ليه |
|---|---|
| [[$ok = $?]] | لون السهم، ولازم أول سطر |
| [[$code = $LASTEXITCODE]] ... [[$global:LASTEXITCODE = $code]] | git ميبوّظش الـ exit code |
| [[Split-Path -Leaf]] | اسم الفولدر بس |
| [[git branch --show-current 2>$null]] | الـ branch، ومن غير error بره repo |
| [[WindowTitle]] | عنوان التاب |
| آخر سطر نص | ده الـ prompt |

## على bash

في bash الـ prompt متغير اسمه [[PS1]] مش فانكشن، زي [[PS1='\w \$ ']]، وفيه [[PROMPT_COMMAND]] لو عايز تشغّل كود قبل كل prompt.

## الخلاصة

~~~text
function prompt   بترجع نص، والنص ده هو الـ prompt
$? أول سطر        وإلا هتقرا نتيجة سطر جوه الفانكشن
$global:          عشان تغيّر المتغير اللي بره
احفظه في $PROFILE  وإلا يروح مع النافذة
~~~`,
          lines: [
            "مرة واحدة: اليوزر الحالي ليه دور Administrator؟ (يعني النافذة أدمن).",
            "مرة واحدة: git متسطب؟ [[[bool]]] بيحوّل الناتج لـ True أو False.",
            "فانكشن اسمها prompt بالظبط، فـ PowerShell يستخدمها بدل الافتراضية.",
            "أول سطر لازم: آخر أمر نجح؟ أي سطر قبله هيغيّر [[$?]].",
            "احفظ exit code آخر برنامج قبل ما git يكتب فوقه.",
            "اسم الفولدر الحالي بس، مش المسار كله.",
            "اسم الـ branch لو git موجود، و [[2>$null]] يخفي الـ error بره أي repo.",
            "اكتب اسم الفولدر في عنوان النافذة أو التاب.",
            "ابدأ النص: الوقت رمادي، واسم الفولدر cyan.",
            "لو فيه branch زوّدها بالأخضر بين قوسين.",
            "لو أدمن زوّد [[[admin]]] بالأحمر.",
            "لون السهم: أخضر لو آخر أمر نجح، أحمر لو فشل.",
            "رجّع الـ exit code زي ما كان للمتغير العام.",
            "النص اللي بيرجع هو الـ prompt، وفي آخره Reset عشان كلامك ميتلوّنش.",
            "قفلة الفانكشن."
          ],
          sol: R`جربته على PowerShell 7.6 (وشلت أكواد الألوان من الناتج عشان يتقري): في فولدر مشروع فيه git طلع [[13:20 full stack road map (main) > ]]، وفي [[$HOME]] طلع [[13:20 ali > ]] من غير branch، وعنوان النافذة بقى [[ali - PowerShell]]. وبعد [[Get-Item nosuchfile]] السهم بقى أحمر ([[ESC[31m]]) لأن [[$?]] بقت False، وأول أمر ناجح بعدها رجّعه أخضر.

وجربت ليه [[$global:LASTEXITCODE = $code]] مهم: من غيره، بعد [[cmd /c exit 3]] والـ prompt، [[$LASTEXITCODE]] بقى [[128]] (الـ exit code بتاع git لما يقول «not a git repository») بدل [[3]]، فأي سكربت بيفحصه بعدها هيتلخبط. ومعاه فضل [[3]].

وعلى Windows PowerShell 5.1 نفس الكود اشتغل وطلع نفس الكلام بس من غير ألوان، لأن [[$PSStyle]] مش موجود فكل الألوان بقت نص فاضي. ولما عملت [[$HasGit]] بـ False، الـ branch اختفى ومفيش error. ولو شلت الشرط ده وgit مش متسطب، [[2>$null]] مش بتخفي [[The term 'git' is not recognized]]، فكان هيطلع قبل كل prompt.`,
          solCode: R`if (-not (Test-Path $PROFILE)) { New-Item $PROFILE -Force }
code $PROFILE
. $PROFILE`
        },
        {
          cmd: "Set-PSReadLineOption -Colors",
          title: "ألوان الكلام وانت بتكتبه",
          desc: R`وانت بتكتب أمر، PSReadLine (الموديول اللي بيدير سطر الكتابة) بيلوّن كل حتة حسب نوعها: اسم الأمر لون، والـ parameters لون، والنصوص لون. [[Set-PSReadLineOption -Colors]] بيغيّر الألوان دي، و [[Get-PSReadLineOption]] بيعرض الإعدادات الحالية كلها ومنها الألوان.

[[-Colors]] بياخد hashtable ([[@{ }]]): كل مفتاح اسم حاجة، وقيمته اللون، وبينهم [[;]]. أهم المفاتيح: [[Command]] اسم الأمر، و [[Parameter]] اللي بيبدأ بشرطة زي [[-Recurse]]، و [[String]] النصوص بين علامات تنصيص، و [[Variable]] المتغيرات، و [[Comment]] التعليقات بعد [[#]]، و [[Number]] الأرقام، و [[Operator]] زي [[-eq]] و [[|]]، و [[Keyword]] زي [[if]] و [[foreach]]، و [[Error]] لون الغلطة (زي الـ [[>]] اللي بيحمر لما السطر فيه غلطة syntax)، و [[InlinePrediction]] لون الاقتراح الباهت (الدرس الجاي).

اللون ممكن يبقى بـ 3 طرق: اسم من ألوان الكونسول الـ 16 زي [["DarkGray"]] و [["Cyan"]]، أو hex زي المواقع [["#FFD700"]]، أو كود ANSI جاهز زي [[$PSStyle.Foreground.BrightRed]] أو [["$([char]27)[38;5;244m"]] (اللون رقم 244 من 256 لون). و [[(Get-PSReadLineOption).CommandColor]] بيرجع الكود الحالي، و [[-replace [char]27, 'ESC']] بيبدّل حرف ESC المخفي بكلمة عشان تشوفه.

الإعداد للنافذة دي بس؛ عشان يفضل حطه في [[$PROFILE]]. وده شغال في 5.1 كمان (PSReadLine 2.0 اللي جاي معاها بيقبل hex)، ماعدا [[InlinePrediction]] لأن الاقتراحات مش موجودة هناك.`,
          example: R`Get-PSReadLineOption
Set-PSReadLineOption -Colors @{ Command = "#FFD700"; Parameter = "DarkGray"; String = "#CE9178"; Variable = "Cyan"; Comment = "#6A9955" }
Set-PSReadLineOption -Colors @{ Error = $PSStyle.Foreground.BrightRed; InlinePrediction = "$([char]27)[38;5;244m" }
(Get-PSReadLineOption).CommandColor -replace [char]27, 'ESC'`,
          try: R`لوّن الأوامر بلون VS Code ([["#DCDCAA"]]) والـ parameters رمادي، واكتب [[Get-ChildItem -Path . -Filter "*.json" # test]] من غير Enter وشوف كل حتة بلونها.`,
          deep: {
            why: R`الألوان الافتراضية معمولة لخلفية سودا، فعلى ثيم فاتح ممكن الـ parameters الرمادي متتقريش. ولما ألوان الترمنال تبقى زي ألوان الـ editor بتاعك، عينك بتتعود على نفس المعنى في المكانين. والتلوين نفسه بيكشف الغلط بدري: لو النص فضل بلون الـ String لآخر السطر، يبقى نسيت تقفل علامة التنصيص.`,
            how: R`PSReadLine بيعمل parse للسطر مع كل حرف بتكتبه، ويلوّن كل token حسب نوعه. فالتلوين «فاهم» الكود: [[ls]] لوحدها بلون Command، لكن [["ls"]] بين علامات تنصيص بلون String.

[[Get-PSReadLineOption]] بيعرض كل لون باسم المفتاح + [[Color]] ([[CommandColor]] و [[StringColor]] ...)، والقيمة نفسها كود ANSI فبتظهر ملوّنة مش مقروءة، وعشان كده [[-replace]]. وفيه كمان [[Selection]] لون الكلام اللي محدده، و [[Emphasis]] لون الكلمة اللي بتدوّر عليها في Ctrl+R، و [[ContinuationPrompt]] لون [[>>]] في الأوامر اللي على كذا سطر، و [[ListPrediction]] و [[ListPredictionSelected]] ألوان قايمة الاقتراحات.

الألوان بالاسم (الـ 16) بتتغير حسب ثيم الترمنال: «Cyan» في ثيم Campbell غير «Cyan» في ثيم One Half Dark، أما hex بيطلع نفس اللون في أي ثيم. فلو عايز تغيّر شكل الترمنال كله، غيّر ثيم Windows Terminal نفسه (شوف درس الثيمات في تاب «اختصارات النظام») والـ 16 لون هيتغيروا مع بعض، واستخدم hex للحاجات اللي عايزها ثابتة.

ملحوظة على الأسامي: [["Cyan"]] بيطلع [[ESC[96m]] (الـ cyan الفاتح)، و [["DarkCyan"]] هو العادي [[ESC[36m]]. يعني أسامي الكونسول من غير Dark هي النسخ الفاتحة.`,
            when: R`مرة واحدة لما تظبط الترمنال بتاعك، أو لما تغيّر ثيم الترمنال لفاتح أو غامق وتلاقي حاجة مش مقروءة.`,
            mistakes: R`تكتب المفتاح زي اسم الخاصية في Get-PSReadLineOption ([[CommandColor]] بدل [[Command]]) أو تزوّد حرف ([[Commands]]) فيطلع «is not a valid color property». أو تغيّر الألوان وتستغرب إنها راحت لما فتحت نافذة جديدة (لازم [[$PROFILE]]). أو تختار لون للـ Parameter قريب من الخلفية فمتشوفوش. أو تحط [[InlinePrediction]] في profile بتاع 5.1: PSReadLine 2.0 مفيهوش المفتاح ده فبيطلع [['InlinePrediction' is not a valid color property]].`
          },
          teach: R`## الأول: ألوان السطر اللي لسه بتكتبه

PSReadLine هو الموديول اللي بيدير سطر الكتابة في PowerShell، وبيلوّن الكلام **وانت بتكتبه** حسب نوعه. المثال: اعرض الإعدادات، غيّر ألوان، واقرا اللون الحالي. اتشغّل على PowerShell 7.6 (PSReadLine 2.4.5) وعلى 5.1 (PSReadLine 2.0.0).

---

## ١. [[Get-PSReadLineOption]]

بيعرض كل إعدادات PSReadLine، ومنها خانة لكل لون باسم + [[Color]]: [[CommandColor]] و [[ParameterColor]] و [[StringColor]]... وقيمها أكواد ANSI (درس $PSStyle)، فالترمنال بيعرضها ملوّنة مش مقروءة.

---

## ٢. [[Set-PSReadLineOption -Colors @{ ... }]]

[[-Colors]] بياخد hashtable ([[@{ }]]): مفتاح = نوع الكلام، والقيمة = اللون، و [[;]] بينهم.

| المفتاح | بيلوّن | مثال |
|---|---|---|
| [[Command]] | اسم الأمر | [[Get-ChildItem]] |
| [[Parameter]] | اللي بيبدأ بشرطة | [[-Recurse]] |
| [[String]] | النصوص | [["hello"]] |
| [[Variable]] | المتغيرات | [[$x]] |
| [[Comment]] | التعليقات | [[# test]] |

### اللون يتكتب ٣ طرق

| الطريقة | مثال | بيبقى الكود |
|---|---|---|
| hex زي المواقع | [["#FFD700"]] | [[ESC[38;2;255;215;0m]] |
| اسم من الـ 16 لون | [["DarkGray"]] | [[ESC[90m]] |
| كود ANSI جاهز | [[$PSStyle.Foreground.BrightRed]] | [[ESC[91m]] |

جربت المثال وقريت كل لون:

~~~text الناتج
Command:  ESC[38;2;255;215;0m
Param:    ESC[90m
String:   ESC[38;2;206;145;120m
Var:      ESC[96m
Comment:  ESC[38;2;106;153;85m
Error:    ESC[91m
Inline:   ESC[38;5;244m
~~~

[["#CE9178"]] بقى [[206;145;120]] لأن CE بالعشري 206، و 91 = 145، و 78 = 120. وده لون النصوص في VS Code.

> [["Cyan"]] طلع [[ESC[96m]]، يعني Cyan **الفاتح**. في أسامي الكونسول، اللي من غير [[Dark]] هو الفاتح.

---

## ٣. السطر التالت

~~~powershell
Set-PSReadLineOption -Colors @{ Error = $PSStyle.Foreground.BrightRed; InlinePrediction = "$([char]27)[38;5;244m" }
~~~

- [[Error]]: لون الحتة اللي بتحمر لما السطر فيه غلطة syntax.
- [[InlinePrediction]]: لون الاقتراح الباهت (الدرس الجاي).
- [["$([char]27)[38;5;244m"]]: كود بإيدك. [[[char]27]] هو ESC، و [[38;5;244]] يعني «لون الكلام من جدول الـ 256 لون، رقم 244» (رمادي).

---

## ٤. [[(Get-PSReadLineOption).CommandColor -replace [char]27, 'ESC']]

1. [[(Get-PSReadLineOption)]]: الإعدادات.
2. [[.CommandColor]]: لون الأوامر.
3. [[-replace [char]27, 'ESC']]: بدّل حرف ESC المخفي بكلمة تتقري.

~~~text الناتج
ESC[38;2;255;215;0m
~~~

---

## الغلطات بتطلع إيه

~~~text مفتاح غلط (Commands بدل Command)
'Commands' is not a valid color property
~~~

~~~text لون غلط
'Reddish' is not a valid color value.  It must be a ConsoleColor, ANSI escape sequence, or RGB value with optional leading '#'.
~~~

وعلى 5.1 (PSReadLine 2.0.0): الافتراضي لـ CommandColor طلع [[ESC[93m]] (أصفر فاتح)، والـ hex اشتغل عادي، لكن [[InlinePrediction]] طلع [['InlinePrediction' is not a valid color property]] لأن الاقتراحات مش موجودة في 2.0.

## على bash

مفيش تلوين للسطر وانت بتكتبه في bash العادي؛ ده محتاج إضافات زي [[ble.sh]]، وفي zsh إضافة [[zsh-syntax-highlighting]]. (من الـ docs.)

## الخلاصة

~~~text
-Colors @{ Key = Color }   المفتاح من غير كلمة Color في الآخر
"#RRGGBB"                  ثابت في أي ثيم
"Cyan" من الـ 16            بيتغير مع ثيم الترمنال
InlinePrediction           PowerShell 7 بس
~~~`,
          lines: [
            "اعرض الإعدادات الحالية كلها، ومنها لون كل نوع.",
            "غيّر ٥ ألوان مرة واحدة: hex زي المواقع، أو اسم لون من الـ 16.",
            "لون الغلطة من [[$PSStyle]]، ولون الاقتراح بكود ANSI (اللون 244 من 256).",
            "اقرا لون الأوامر الحالي، و [[-replace]] يبدّل حرف ESC المخفي بكلمة تتقري."
          ],
          sol: R`[[Set-PSReadLineOption -Colors @{ Command = "#DCDCAA"; Parameter = "DarkGray" }]] وبعدين اكتب السطر: [[Get-ChildItem]] هيبان أصفر فاتح، و [[-Path]] و [[-Filter]] رمادي، و [["*.json"]] بلون الـ String، و [[# test]] بلون الـ Comment. التغيير بيبان على طول على اللي بتكتبه، مش محتاج Enter.

جربت المثال على PSReadLine 2.4.5 (اللي جاي مع PowerShell 7.6) وطلّعت الأكواد: [["#FFD700"]] بقت [[ESC[38;2;255;215;0m]] (لون 24-bit: أحمر 255 وأخضر 215 وأزرق 0)، و [["DarkGray"]] بقت [[ESC[90m]]، و [["Cyan"]] بقت [[ESC[96m]]، و [[InlinePrediction]] بقت [[ESC[38;5;244m]]. ولو كتبت مفتاح غلط زي [[Commands]] بيطلع [['Commands' is not a valid color property]]، ولو لون غلط زي [["Reddish"]] بيطلع [['Reddish' is not a valid color value. It must be a ConsoleColor, ANSI escape sequence, or RGB value with optional leading '#'.]]`,
          solCode: R`Set-PSReadLineOption -Colors @{ Command = "#DCDCAA"; Parameter = "DarkGray" }
(Get-PSReadLineOption).CommandColor -replace [char]27, 'ESC'`
        },
        {
          cmd: "PredictionViewStyle",
          title: "اقتراحات من أوامرك القديمة و Tab بقايمة",
          desc: R`PSReadLine في PowerShell 7 بيقترح عليك أمر كامل من اللي كتبته قبل كده وانت لسه بتكتب أول حروفه (اسمها Predictive IntelliSense): الاقتراح بيظهر باهت بعد المؤشر، والسهم يمين يقبله. ومعاه شوية اختصارات بتخلي Tab والأسهم أذكى.

[[-PredictionSource]] الاقتراحات جاية منين: [[History]] من تاريخ أوامرك بس، و [[HistoryAndPlugin]] التاريخ + أي plugin متسطب (محتاج PowerShell 7.2 أو أحدث)، و [[None]] تقفلها. و [[-PredictionViewStyle]] شكلها: [[InlineView]] سطر باهت بعد المؤشر (الافتراضي)، و [[ListView]] قايمة تحت السطر تختار منها بالأسهم وجنب كل اقتراح مصدره زي [[[History]]]. و F2 بيبدّل بين الشكلين وانت بتكتب.

[[Set-PSReadLineKeyHandler]] بيربط زرار بوظيفة: [[-Key Tab -Function MenuComplete]] يخلي Tab يعرض قايمة بكل الاختيارات تتحرك فيها بالأسهم، بدل ما يلف عليهم واحد واحد (نفس Ctrl+Space). و [[HistorySearchBackward]] على السهم فوق: لو كتبت [[git]] وضغطت فوق، يجيبلك آخر أوامر كانت بتبدأ بـ git بس، ولو السطر فاضي بيشتغل عادي. و [[HistorySearchForward]] نفس الحكاية للسهم تحت. و [[(Get-Module PSReadLine).Version]] بيقولك نسخة PSReadLine.

النسخ مهمة هنا: الاقتراحات ظهرت في PSReadLine 2.1، و [[ListView]] و [[HistoryAndPlugin]] في 2.2، وبقت شغالة لوحدها من 2.2.6. و PowerShell 7.6.6 كان معاه 2.4.5، لكن Windows PowerShell 5.1 جاي بـ 2.0.0 اللي مفيهوش اقتراحات خالص و [[-PredictionSource]] بيطلع فيه error. وكل ده للنافذة دي بس، فحطه في [[$PROFILE]].`,
          example: R`Get-PSReadLineOption | Select-Object PredictionSource, PredictionViewStyle
Set-PSReadLineOption -PredictionSource HistoryAndPlugin
Set-PSReadLineOption -PredictionViewStyle ListView
Set-PSReadLineKeyHandler -Key Tab -Function MenuComplete
Set-PSReadLineKeyHandler -Key UpArrow -Function HistorySearchBackward
Set-PSReadLineKeyHandler -Key DownArrow -Function HistorySearchForward
(Get-Module PSReadLine).Version`,
          try: R`شغّل السطور، واكتب [[git]] بس وشوف القايمة واتحرك فيها بالأسهم. وبعدين اضغط F2 وارجع للشكل الـ Inline واقبل الاقتراح بالسهم يمين. وبعدين جرّب Tab بعد [[Get-Net]].`,
          deep: {
            why: R`أغلب اللي بتكتبه في الترمنال كتبته قبل كده: [[npm run dev]] و [[git push origin main]] و [[docker compose up -d]]. الاقتراحات بتكمّلهولك من أول حرفين، والـ ListView بيوريك كذا أمر قديم مرة واحدة بدل ما تفضل تضغط فوق عشرين مرة. و Tab بالقايمة بيوريك كل الاختيارات بدل ما تخمّن.`,
            how: R`اقتراحات History جاية من ملف التاريخ الدائم بتاع PSReadLine (مكانه في [[(Get-PSReadLineOption).HistorySavePath]]، درس «History والاختصارات»)، مش من [[Get-History]] بتاع الجلسة، فبتلاقي أوامر من أيام فاتت.

الـ plugins موديولات بتضيف مصادر اقتراحات، زي [[CompletionPredictor]] اللي بيقترح من الحاجات اللي Tab بيكمّلها، و [[Az.Tools.Predictor]] لأوامر Azure. بتشتغل مع [[HistoryAndPlugin]] أو [[Plugin]] وفي 7.2 وأحدث بس.

السهم يمين بيقبل الاقتراح كله (الوظيفة [[ForwardChar]] بتقبله لما المؤشر يبقى في آخر السطر). ولو عايز كلمة كلمة، توثيق Microsoft بيقترح تربط زرار بـ [[ForwardWord]]: [[Set-PSReadLineKeyHandler -Chord "Ctrl+f" -Function ForwardWord]].

[[Get-PSReadLineKeyHandler]] بيعرض كل الاختصارات المربوطة، و Ctrl+Alt+? بيعرضها وانت بتكتب. و [[Set-PSReadLineOption -EditMode Emacs]] بيخلي الاختصارات زي bash (Ctrl+A أول السطر و Ctrl+E آخره)، بس بيمسح أي ربط عملته قبله، فحطه الأول في الـ profile.

في 5.1 تقدر تحدّث PSReadLine بـ [[Install-Module PSReadLine -Scope CurrentUser -Force]] (ولو طلع error حدّث PowerShellGet الأول)، فتاخد اقتراحات History بس، من غير plugins. والأسهل تستخدم PowerShell 7.`,
            when: R`أول ما تسطّب PowerShell 7 وتبدأ تستخدمه يوميًا. والـ ListView مفيد في أول أسابيع لما بتنسى الأوامر، وبعد ما تحفظها ممكن ترجع للـ Inline لأنه أهدى.`,
            mistakes: R`تحط [[-PredictionSource]] في profile بيتشغّل كمان لما برنامج يشغّل pwsh والناتج رايح لملف، فيطلع error «console output doesn't support virtual terminal processing» كل مرة، و [[-ErrorAction SilentlyContinue]] مش بيخفيه؛ حطه جوه [[try { } catch { }]] (الـ solCode). أو تنقل نفس الـ profile لـ 5.1 فيطلع «A parameter cannot be found». أو تستغرب إن الاقتراحات مش بتظهر في PowerShell ISE (مفيهوش PSReadLine). أو تنسى إن الاقتراحات من تاريخك، فلو كتبت باسورد في أمر قبل كده ممكن يظهر مقترح قدام حد؛ امسحه من ملف التاريخ.`
          },
          teach: R`## الأول: نوعين إعدادات

المثال ٧ سطور: [[Set-PSReadLineOption]] بيغيّر **إعداد** (الاقتراحات جاية منين وشكلها)، و [[Set-PSReadLineKeyHandler]] بيربط **زرار** بوظيفة. والأول والأخير عرض بس.

اتشغّل على PowerShell 7.6.6 (PSReadLine 2.4.5). وخلي بالك: الاقتراحات بتشتغل في نافذة ترمنال حقيقية بس، فلما شغّلت السطور من سكربت ناتجه رايح لملف، سطر الـ PredictionSource طلع error (تحت).

---

## ١. [[Get-PSReadLineOption | Select-Object PredictionSource, PredictionViewStyle]]

~~~text الناتج (من سكربت ناتجه رايح لملف)
PredictionSource PredictionViewStyle
---------------- -------------------
            None          InlineView
~~~

[[None]] هنا لأن الناتج مش رايح لشاشة. في نافذة عادية على 7.6 المفروض تلاقيه شغال: ملف [[Changes.txt]] اللي جاي مع PSReadLine مكتوب فيه تحت 2.2.6 «Enable Predictive Intellisense by default»، والتوثيق بيقول المصدر الافتراضي [[HistoryAndPlugin]] على PowerShell 7.2 وأحدث.

## ٢. [[Set-PSReadLineOption -PredictionSource HistoryAndPlugin]]

| القيمة | الاقتراحات من |
|---|---|
| [[None]] | مفيش اقتراحات |
| [[History]] | الأوامر اللي كتبتها قبل كده |
| [[Plugin]] | موديولات بتقترح (محتاج 7.2+) |
| [[HistoryAndPlugin]] | الاتنين |

وده الـ error اللي طلع في السكربت:

~~~text الناتج
The predictive suggestion feature cannot be enabled because the console output doesn't support virtual terminal processing or it's redirected.
~~~

يعني «الناتج مش رايح لترمنال بيفهم الألوان». في نافذة عادية مفيش المشكلة دي. وعشان كده الـ solCode حاطه جوه [[try { } catch { }]]: لو فشل، يكمّل باقي الـ profile.

## ٣. [[Set-PSReadLineOption -PredictionViewStyle ListView]]

| القيمة | الشكل |
|---|---|
| [[InlineView]] | اقتراح واحد باهت بعد المؤشر، والسهم يمين يقبله |
| [[ListView]] | قايمة تحت السطر، تتحرك فيها بالأسهم |

و F2 بيبدّل بين الاتنين وانت بتكتب.

---

## ٤ لـ ٦. [[Set-PSReadLineKeyHandler -Key ... -Function ...]]

| الحتة | معناها |
|---|---|
| [[-Key Tab]] | الزرار |
| [[-Function MenuComplete]] | الوظيفة اللي هيعملها |

بعد التلات سطور، [[Get-PSReadLineKeyHandler -Bound]] (الأزرار المربوطة) طلع:

~~~text الناتج
Key        Function              Description
---        --------              -----------
RightArrow ForwardChar           Move the cursor forward one character
UpArrow    HistorySearchBackward Search for the previous item in the history that starts with the current input - like PreviousHistory if the input is empty
DownArrow  HistorySearchForward  Search for the next item in the history that starts with the current input - like NextHistory if the input is empty
Tab        MenuComplete          Complete the input if there is a single completion, otherwise complete the input by selecting from a menu of possible completions.
F2         SwitchPredictionView  Switch between the inline and list prediction views.
~~~

الـ [[Description]] نفسه بيشرح:

- [[MenuComplete]]: لو فيه اختيار واحد يكمّله، لو أكتر يعرض **قايمة**.
- [[HistorySearchBackward]]: دوّر لورا على أمر **بيبدأ باللي كتبته**، ولو السطر فاضي يشتغل زي السهم العادي.
- [[HistorySearchForward]]: نفس الكلام لقدام.
- [[ForwardChar]] على السهم يمين: ده اللي بيقبل الاقتراح لما تبقى في آخر السطر.
- [[SwitchPredictionView]] على F2: التبديل بين الشكلين.

## ٧. [[(Get-Module PSReadLine).Version]]

~~~text الناتج
Major  Minor  Build  Revision
-----  -----  -----  --------
2      4      5      -1
~~~

يعني 2.4.5. و [[Revision -1]] معناها «مش متحدد».

---

## النسخ مهمة

| PSReadLine | فيه |
|---|---|
| 2.0.0 (جاي مع Windows PowerShell 5.1) | مفيش اقتراحات خالص |
| 2.1 | اقتراحات Inline من التاريخ |
| 2.2 | ListView و Plugin |
| 2.2.6 | الاقتراحات شغالة لوحدها |

وعلى 5.1 [[Set-PSReadLineOption -PredictionSource History]] طلع [[A parameter cannot be found that matches parameter name 'PredictionSource'.]]

## على bash و zsh

bash مفيهوش اقتراحات زي دي، و zsh فيه إضافة [[zsh-autosuggestions]] بنفس الفكرة (اقتراح باهت والسهم يمين يقبله). والسهم فوق اللي بيدوّر باللي كتبته موجود في bash بربط [[history-search-backward]] في [[~/.inputrc]]. (من الـ docs.)

## الخلاصة

~~~text
-PredictionSource      الاقتراحات منين (History أو HistoryAndPlugin)
-PredictionViewStyle   InlineView أو ListView، و F2 يبدّل
Set-PSReadLineKeyHandler -Key X -Function Y   اربط زرار بوظيفة
PowerShell 7 بس، وحطه في try في الـ profile
~~~`,
          lines: [
            "الإعداد الحالي: مصدر الاقتراحات وشكلها.",
            "اقترح من تاريخ أوامرك ومن أي plugin متسطب (7.2 وأحدث).",
            "اعرض الاقتراحات قايمة تحت السطر بدل سطر باهت (F2 بيبدّل).",
            "Tab يعرض قايمة بكل الاختيارات بدل ما يلف عليهم واحد واحد.",
            "السهم فوق يدوّر في التاريخ على الأوامر اللي بتبدأ باللي كتبته.",
            "السهم تحت نفس الحكاية للأحدث.",
            "نسخة PSReadLine: الاقتراحات محتاجة 2.1 والقايمة 2.2."
          ],
          sol: R`بعد [[ListView]]، كتابة [[git]] بتطلّع تحت السطر قايمة بأوامر git اللي كتبتها قبل كده وجنب كل واحد [[[History]]]، والأسهم بتتحرك فيها، و Enter بينفّذ المختار. و F2 بيرجّعها سطر واحد باهت، والسهم يمين يحط الاقتراح كله في السطر تعدّله أو تنفّذه. و Tab بعد [[Get-Net]] بقى يعرض كل الأوامر (Get-NetAdapter و Get-NetIPAddress ...) تختار منها بالأسهم.

جربت السطور على PowerShell 7.6.6 فـ [[Get-PSReadLineKeyHandler -Bound]] أكد [[Tab MenuComplete]] و [[UpArrow HistorySearchBackward]] و [[DownArrow HistorySearchForward]] و [[F2 SwitchPredictionView]]، و [[(Get-Module PSReadLine).Version]] طلع [[2.4.5]]. ولما شغّلت نفس الأوامر من سكربت الناتج بتاعه رايح لملف، [[-PredictionSource]] طلع [[The predictive suggestion feature cannot be enabled because the console output doesn't support virtual terminal processing or it's redirected.]] (في نافذة عادية مفيش المشكلة دي)، و [[try/catch]] مسكه. وعلى 5.1 بـ PSReadLine 2.0.0 طلع [[A parameter cannot be found that matches parameter name 'PredictionSource'.]]`,
          solCode: R`try { Set-PSReadLineOption -PredictionSource HistoryAndPlugin -PredictionViewStyle ListView } catch { }
Set-PSReadLineKeyHandler -Key Tab -Function MenuComplete
Set-PSReadLineKeyHandler -Key UpArrow -Function HistorySearchBackward
Set-PSReadLineKeyHandler -Key DownArrow -Function HistorySearchForward`
        },
        {
          cmd: "Terminal-Icons",
          title: "أيقونات وألوان للملفات في ls",
          desc: R`[[Terminal-Icons]] موديول بيحط أيقونة جنب كل ملف وفولدر في [[Get-ChildItem]] (فولدر، JavaScript، صورة، zip...) ويلوّنهم حسب النوع، زي اللي بتشوفه في VS Code. الأيقونات دي حروف من خطوط Nerd Font، فلازم الترمنال يبقى شغال بخط منهم وإلا هتشوف مربعات أو علامات استفهام (شوف درس «Nerd Font» في تاب «اختصارات النظام»).

[[Install-Module]] بينزّل موديول من PowerShell Gallery (المخزن الرسمي للموديولات)، و [[-Repository PSGallery]] اسم المخزن، و [[-Scope CurrentUser]] يسطّبه ليك بس فمش محتاج أدمن. أول مرة هيسألك «Untrusted repository ... Are you sure?» فاكتب [[Y]]. و [[Import-Module]] بيحمّله في النافذة دي، وبعدها [[Get-ChildItem]] (أو [[ls]]) هيطلع بالأيقونات.

التحميل بياخد وقت مع كل نافذة جديدة، فالسطر الرابع بيقيسه: [[Measure-Command]] بيرجع الوقت اللي الكود اللي بين [[{ }]] خده (درس Measure-Command في المستوى التالت)، و [[-Force]] يحمّل الموديول من جديد حتى لو متحمّل. وبعدين [[Add-Content $PROFILE]] بيزوّد سطر الـ Import في آخر الـ profile عشان يتحمّل مع كل نافذة (لو الملف مش موجود اعمله الأول، درس «$PROFILE»). و [[Show-TerminalIconsTheme]] بيعرضلك الأيقونات والألوان اللي في الثيم الحالي.

الموديول شغال على 5.1 و 7، وآخر نسخة منه على PowerShell Gallery هي [[0.11.0]] من يوليو 2023، فاعتبره «شغال وثابت» مش «بيتطور».`,
          example: R`Install-Module Terminal-Icons -Repository PSGallery -Scope CurrentUser
Import-Module Terminal-Icons
Get-ChildItem
Measure-Command { Import-Module Terminal-Icons -Force }
Add-Content $PROFILE "Import-Module Terminal-Icons"
Show-TerminalIconsTheme`,
          try: R`سطّبه، واعرض فولدر مشروع فيه ملفات js و json و md، وقيس وقت التحميل. لو أكتر من نص ثانية فكّر يستاهل ولا لأ.`,
          deep: {
            why: R`في فولدر فيه 40 ملف، الأيقونة واللون بيخلوك تلاقي الـ [[.env]] أو الـ [[Dockerfile]] أو الصور بنظرة من غير ما تقرا كل اسم. نفس فكرة الأيقونات في VS Code، وفي [[lsd]] و [[eza]] على لينكس.`,
            how: R`PowerShell بيعرض أي object حسب «format view» مكتوب له. Terminal-Icons بيضيف view جديد للملفات والفولدرات (الأنواع اللي Get-ChildItem بيرجعها) بيحط في عمود Name الأيقونة والاسم بلون. والأيقونة بتتختار من اسم الملف أو امتداده، فـ [[package.json]] ليه أيقونة غير أي [[.json]] تاني.

ده عرض بس: الـ objects نفسها متغيرتش، فـ [[Get-ChildItem | Select-Object Name]] و [[Where-Object]] و [[Export-Csv]] شغالين عادي من غير أيقونات. وعشان الموديول بيعرض عمود الاسم بطريقته، ألوانه بتيجي من ثيم Terminal-Icons، فلو لقيت ألوان [[$PSStyle.FileInfo]] (أول درس هنا) اختفت من الأسامي بعد ما حمّلته، ده السبب. [[Get-TerminalIconsColorTheme]] و [[Get-TerminalIconsIconTheme]] بيعرضوا الثيمات، و [[Set-TerminalIconsTheme]] بيغيّر.

لو التحميل بطيء: في issue «Slow import» على GitHub الناس قاسوا من حوالي نص ثانية لـ ٢ ثانية حسب الجهاز والنسخة. فيه طريقة منتشرة (مجرّبتهاش هنا) إنك تأجّل التحميل لحد ما الترمنال يفضى: [[Register-EngineEvent PowerShell.OnIdle -MaxTriggerCount 1 -Action { Import-Module Terminal-Icons -Global }]] في الـ profile بدل Import-Module العادي، فالنافذة تفتح على طول والأيقونات تظهر بعدها بشوية. أو ببساطة متحطوش في الـ profile واكتب Import-Module لما تحتاجه.`,
            when: R`على جهازك الشخصي لو بتقضي وقت كتير في الترمنال بتتنقل بين فولدرات. مش على سيرفر، ومش في سكربتات (مالهاش لازمة هناك).`,
            mistakes: R`تسطّبه وتنسى الـ Nerd Font فتلاقي مربعات وتفتكر الموديول بايظ. أو تسطّبه بـ [[-Scope AllUsers]] من نافذة مش أدمن فيطلع error. أو تحط الـ Import في profile بتاع 5.1 وانت شغال على 7 (كل واحد ليه [[$PROFILE]]). أو تكتب [[Install-Module]] في الـ profile نفسه بدل [[Import-Module]]، فكل نافذة تحاول تسطّبه من النت.`
          },
          teach: R`## الأول: الموديول ده بيغيّر «العرض» بس

[[Terminal-Icons]] موديول من PowerShell Gallery بيخلّي [[Get-ChildItem]] يحط أيقونة ولون جنب كل اسم. المثال ٦ سطور: سطّب، حمّل، اعرض، قيس الوقت، حطه في الـ profile، اعرض الثيم.

مسطّبتش الموديول على الجهاز. اللي عملته: نزّلته بـ [[Save-Module]] في فولدر تجربة (من غير تسطيب)، وحمّلته من هناك في نافذة PowerShell 7.6 منفصلة. فالناتج تحت حقيقي، ما عدا سؤال التسطيب.

---

## ١. [[Install-Module Terminal-Icons -Repository PSGallery -Scope CurrentUser]]

| الحتة | معناها |
|---|---|
| [[Install-Module]] | نزّل موديول وسطّبه |
| [[Terminal-Icons]] | اسمه |
| [[-Repository PSGallery]] | من PowerShell Gallery، المخزن الرسمي |
| [[-Scope CurrentUser]] | ليك بس، فمش محتاج أدمن |

قبل ما تسطّب، تقدر تسأل عنه:

~~~powershell
Find-Module Terminal-Icons -Repository PSGallery
~~~

~~~text الناتج (الخانات المهمة)
Name          : Terminal-Icons
Version       : 0.11.0
PublishedDate : 7/6/2023 4:55:30 AM
Author        : Brandon Olin
~~~

وأول تسطيب هيسألك «Untrusted repository» لأن PSGallery متعلّم كده افتراضيًا:

~~~text Get-PSRepository
Name      InstallationPolicy
----      ------------------
PSGallery Untrusted
~~~

[[Untrusted]] مش معناها إنه خطر، معناها «اسأل قبل ما تسطّب». اكتب [[Y]].

## ٢. [[Import-Module Terminal-Icons]]

بيحمّل الموديول في النافذة دي بس.

## ٣. [[Get-ChildItem]]

~~~text الناتج (على فولدر تجربة)
Mode                LastWriteTime         Length Name
----                -------------         ------ ----
d----         10/6/2026   9:44 AM                  src
-a---         10/6/2026   9:44 AM              3   app.js
-a---         10/6/2026   9:44 AM              4   package.json
-a---         10/6/2026   9:44 AM              6 󰪷  README.md
~~~

الأيقونات حروف من خطوط **Nerd Font**. في الصفحة هنا (أو في ترمنال من غير Nerd Font) بتبان مربعات أو فراغ. جربت أطلّع أرقامها: [[src]] قبله الحرف [[U+F489]]، و [[app.js]] قبله [[U+E74E]] (شعار JavaScript)، و [[package.json]] قبله [[U+E718]] (شعار npm، مش أيقونة json العادية، لأن الموديول بيختار من الاسم الكامل الأول).

## ٤. [[Measure-Command { Import-Module Terminal-Icons -Force }]]

- [[Measure-Command { }]]: نفّذ اللي بين القوسين وقولّي خد قد إيه.
- [[-Force]]: حمّله من جديد حتى لو متحمّل، وإلا القياس هيطلع صفر تقريبًا.

جربته ٣ مرات (بالملّي ثانية):

~~~text الناتج
283
243
258
~~~

ربع ثانية تقريبًا بتتضاف على **كل** نافذة جديدة لو حطيته في الـ profile.

## ٥. [[Add-Content $PROFILE "Import-Module Terminal-Icons"]]

بيزوّد السطر في آخر ملف الـ profile (درس $PROFILE)، فكل نافذة جديدة تحمّله. و [[Import-Module]] مش [[Install-Module]]: التسطيب مرة واحدة، والتحميل كل مرة.

## ٦. [[Show-TerminalIconsTheme]]

بيعرض كل الأيقونات والألوان في الثيم الحالي. وأوامر الموديول كلها (من [[Get-Command -Module Terminal-Icons]]):

~~~text الناتج
Add-TerminalIconsColorTheme, Add-TerminalIconsIconTheme, Format-TerminalIcons, Get-TerminalIconsColorTheme, Get-TerminalIconsGlyphs, Get-TerminalIconsIconTheme, Get-TerminalIconsTheme, Invoke-TerminalIconsThemeMigration, Remove-TerminalIconsTheme, Set-TerminalIconsIcon, Set-TerminalIconsTheme, Show-TerminalIconsTheme
~~~

---

## ملحوظة: الموديول بيكتب ملفات

وأنا بقرا كوده قبل ما أجرّبه، لقيته بيحفظ إعداداته وثيماته في فولدر جوه [[$env:APPDATA]] أول ما يتحمّل. عادي ومش ضار، بس اعرف إنه موجود لو حبيت تشيله بعدين.

## ملخص

| الخطوة | الأمر | كام مرة |
|---|---|---|
| تسطيب | [[Install-Module ... -Scope CurrentUser]] | مرة |
| تحميل | [[Import-Module Terminal-Icons]] | كل نافذة (من الـ profile) |
| الخط | Nerd Font في إعدادات الترمنال | مرة |

## على لينكس والماك

الموديول بيشتغل في PowerShell 7 هناك برضه، والمقابل في bash و zsh برامج زي [[eza --icons]] و [[lsd]]. (من الـ docs.)

## الخلاصة

~~~text
Install-Module   مرة، -Scope CurrentUser من غير أدمن
Import-Module    في الـ profile، وبياخد حوالي ربع ثانية هنا
الأيقونات        محتاجة Nerd Font
عرض بس           الـ objects نفسها متغيرتش
~~~`,
          lines: [
            "نزّل الموديول من PowerShell Gallery ليك بس (من غير أدمن).",
            "حمّله في النافذة دي.",
            "اعرض الفولدر: كل اسم جنبه أيقونة ولون.",
            "قيس وقت التحميل ([[-Force]] يحمّله من جديد).",
            "زوّد سطر التحميل في آخر الـ profile عشان يشتغل مع كل نافذة.",
            "اعرض أيقونات وألوان الثيم الحالي."
          ],
          sol: R`(مسطّبتش الموديول على الجهاز اللي كتبت عليه الدرس عشان مسطّبش حاجة عليه، فده من صفحة الموديول على GitHub و PowerShell Gallery؛ اتأكدت من هناك إن آخر نسخة 0.11.0 وإن أوامره فيها Show-TerminalIconsTheme و Set-TerminalIconsTheme.) بعد [[Import-Module]]، [[Get-ChildItem]] بيطلع نفس الجدول بس جنب كل اسم أيقونة: فولدر لـ [[src]]، وشعار JavaScript لـ [[app.js]]، وأقواس لـ [[package.json]]، وكل نوع بلون. لو شايف مربعات فاضية أو [[?]] بدل الأيقونات، الخط مش Nerd Font: غيّره من إعدادات الترمنال (Windows Terminal: Settings ثم الـ Profile ثم Appearance ثم Font face، و VS Code من [[terminal.integrated.fontFamily]]).

[[Measure-Command]] هيرجع TimeSpan، بص على [[TotalMilliseconds]]. الرقم ده بيتضاف على كل نافذة تفتحها. لو كبير ومضايقك، شيل السطر من الـ profile واكتب [[Import-Module Terminal-Icons]] بس لما تحتاجه، أو قارن وقت فتح الترمنال كله قبل وبعد (درس Measure-Command).`
        },
        {
          cmd: "oh-my-posh",
          title: "prompt جاهز بثيمات",
          desc: R`[[oh-my-posh]] برنامج بيرسم الـ prompt بثيمات جاهزة: الفولدر، والـ git branch وحالته، ونسخة node أو python في المشروع، ووقت تنفيذ آخر أمر، بأيقونات وألوان. بيشتغل مع PowerShell و bash و zsh، فلو بتشتغل على أكتر من شيل يبقى نفس الشكل في الكل.

محتاج خط Nerd Font زي Terminal-Icons (الثيمات اللي في اسمها [[minimal]] بس مش محتاجاه). السطر الأول بيسطّبه بـ winget، و [[--source winget]] يعني من مخزن winget مش Microsoft Store، وبعدها افتح نافذة جديدة عشان الـ PATH يتحدّث. والتاني [[oh-my-posh font install meslo]] بينزّل خط Meslo Nerd Font ويسطّبه (من غير أدمن بيتسطب لليوزر بتاعك بس)، وبعدها اختار [[MesloLGM Nerd Font]] في إعدادات خط الترمنال.

[[oh-my-posh init pwsh]] بيطبع كود PowerShell بيعرّف فانكشن [[prompt]] جديدة، و [[| Invoke-Expression]] بينفّذ النص ده كأنه كود. و [[--config]] الثيم: اسم ثيم جاهز زي [['atomic']] أو [['jandedobbeleer']] (بيتنزّل من النت أول مرة ويتخزن)، أو مسار ملف عندك، أو لينك. تشغيل السطر ده في النافذة بيغيّر شكلها هي بس، فدي طريقتك تجرّب كذا ثيم من غير ما تلمس الـ profile. وكل الثيمات بصورها في صفحة [[ohmyposh.dev/docs/themes]].

لما تختار: [[oh-my-posh config export]] بينسخ الثيم لملف عندك ([[--output]] مكانه)، فالترمنال يفتح من غير نت وتقدر تعدّل فيه. وسطر [[Add-Content]] بيحط الـ init بمسار الملف ده في آخر الـ [[$PROFILE]]: علامات التنصيص الفردية بره بتخلي [[$HOME]] يتكتب في الملف زي ما هو ويتحسب لما الـ profile يشتغل. وآخر سطر بيحدّث البرنامج.

لو لقيت شرح قديم بيقول [[Install-Module oh-my-posh]] أو [[Set-PoshPrompt]] أو مسار جوه [[$env:POSH_THEMES_PATH]]: ده كان زمان. الموديول القديم اتوقف، والدوكيومنتيشن الحالي بيستخدم اسم الثيم على طول. ونفس الطريقة شغالة في 5.1 كمان، بس ليها [[$PROFILE]] منفصل.`,
          example: R`winget install JanDeDobbeleer.OhMyPosh --source winget
oh-my-posh font install meslo
oh-my-posh init pwsh --config 'atomic' | Invoke-Expression
oh-my-posh init pwsh --config 'jandedobbeleer' | Invoke-Expression
oh-my-posh config export --config 'jandedobbeleer' --output "$HOME\.mytheme.omp.json"
Add-Content $PROFILE 'oh-my-posh init pwsh --config "$HOME\.mytheme.omp.json" | Invoke-Expression'
winget upgrade JanDeDobbeleer.OhMyPosh --source winget`,
          try: R`جرّب 3 ثيمات في نفس النافذة بالسطر التالت (غيّر الاسم بس)، واختار واحد واحفظه، وقيس وقت فتح الترمنال قبل وبعد بـ [[Measure-Command { pwsh -c exit }]].`,
          deep: {
            why: R`كتابة prompt بإيدك (درس «function prompt») بتعلّمك الفكرة، لكن oh-my-posh بيديك من غير مجهود حاجات صعب تعملها بنفسك: حالة الـ git كاملة (ملفات متعدلة، commits مستنية push)، ونسخة اللغة حسب المشروع، ووقت تنفيذ آخر أمر، والـ exit code، وبنفس الشكل في PowerShell و bash على WSL.`,
            how: R`[[oh-my-posh]] برنامج exe عادي مش موديول PowerShell. سطر الـ init بيعرّف [[prompt]] بتنادي البرنامج ده قبل كل أمر، والبرنامج يقرا ملف الثيم (JSON أو YAML أو TOML) ويرجّع الـ prompt بالأكواد والألوان. فأي فانكشن [[prompt]] كتبتها بنفسك هتتلغي لو سطر oh-my-posh جه بعدها في الـ profile: اللي في الآخر هو اللي بيكسب.

[[Invoke-Expression]] بينفّذ أي نص كأنه كود، فمتستخدمهوش مع نص جاي من مصدر مش واثق فيه؛ هنا النص جاي من البرنامج اللي انت مسطّبه. ولو الـ ExecutionPolicy مانعة حاجة، الدوكيومنتيشن بيقترح [[oh-my-posh init pwsh --eval | Invoke-Expression]] وبيقول إنها أبطأ.

ملف الثيم مقسوم «segments»: كل segment حاجة بتتعرض (path و git و node و time ...)، وتقدر تشيل أو تزوّد وتغيّر ألوانها بتعديل الملف اللي عملته بـ [[config export]]. و [[oh-my-posh print preview]] بيطبع شكل الـ prompt من غير ما تغيّر حاجة.

الوقت: كل نافذة بتشغّل oh-my-posh للـ init، وكل prompt بيشغّله تاني. الثيم بالاسم أو اللينك بيتنزل من النت أول مرة وبيتخزن، والملف المحلي أسرع وبيشتغل من غير نت. وكل ده شغال مع Terminal-Icons و PSReadLine في نفس الـ profile، لأن كل واحد بيشتغل في حتة مختلفة (الـ prompt، والكتابة، وعرض الملفات).`,
            when: R`لو عايز prompt غني من غير ما تكتب كود، أو بتشتغل على PowerShell و bash في WSL وعايز نفس الشكل. ولو الترمنال بقى بطيء في الفتح على جهاز ضعيف، الـ prompt المكتوب بإيدك أخف.`,
            mistakes: R`تسطّبه وتنسى الـ Nerd Font. أو تحط الـ init قبل function prompt بتاعتك في الـ profile وتستغرب إن الشكل مش بتاعه (أو العكس). أو تمشي على شرح قديم بـ [[Install-Module oh-my-posh]] و [[Set-PoshPrompt]] أو مسار جوه [[$env:POSH_THEMES_PATH]] مش موجود عندك. أو تستخدم ثيم بالاسم والجهاز من غير نت أول مرة. أو تجرّب في نافذة كانت مفتوحة قبل التسطيب فتلاقي «oh-my-posh is not recognized».`
          },
          teach: R`## الأول: oh-my-posh برنامج، مش موديول

[[oh-my-posh]] ملف exe بيتسطب زي أي برنامج. وفكرته: سطر في الـ profile بيعرّف فانكشن [[prompt]] (درس function prompt) بتنادي البرنامج ده قبل كل أمر، والبرنامج يرجّع الـ prompt بالألوان والأيقونات حسب ملف ثيم.

مسطّبتش oh-my-posh على الجهاز، فكل اللي تحت من الدوكيومنتيشن الرسمي على ohmyposh.dev، ما عدا رقم النسخة اللي جبته بـ [[winget show]] (بيقرا بس، مبيسطّبش).

---

## ١. [[winget install JanDeDobbeleer.OhMyPosh --source winget]]

| الحتة | معناها |
|---|---|
| [[winget]] | مدير البرامج اللي جاي مع ويندوز (درس winget) |
| [[install]] | سطّب |
| [[JanDeDobbeleer.OhMyPosh]] | الـ ID: اسم صاحبه، نقطة، اسم البرنامج |
| [[--source winget]] | من مخزن winget مش Microsoft Store |

~~~powershell
winget show JanDeDobbeleer.OhMyPosh --source winget
~~~

~~~text الناتج (السطور المهمة)
Found Oh My Posh [JanDeDobbeleer.OhMyPosh]
Version: 31.4.1
Publisher: Jan De Dobbeleer
Homepage: https://ohmyposh.dev/
  Installer Type: msix
~~~

بعد التسطيب **افتح نافذة جديدة**: الـ PATH بيتقري لما النافذة تفتح، فالقديمة مش هتلاقي [[oh-my-posh]].

## ٢. [[oh-my-posh font install meslo]]

[[font install]] أمر جوه البرنامج بينزّل خط ويسطّبه، و [[meslo]] اسم الخط (Meslo Nerd Font). بعده اختار [[MesloLGM Nerd Font]] من إعدادات خط الترمنال. من غيره الأيقونات تبان مربعات (زي Terminal-Icons).

## ٣ و ٤. [[oh-my-posh init pwsh --config 'atomic' | Invoke-Expression]]

ده أهم سطر، نفكه من الشمال لليمين زي ما بيتنفّذ:

### [[oh-my-posh init pwsh]]

[[init]] = جهّز، و [[pwsh]] = للشيل ده. البرنامج **مبيغيّرش حاجة**، بيطبع نص: كود PowerShell فيه فانكشن [[prompt]] جديدة.

### [[--config 'atomic']]

الثيم: اسم ثيم جاهز (بيتنزّل أول مرة)، أو مسار ملف عندك، أو لينك.

### [[| Invoke-Expression]]

الـ pipe بيدّي النص ده لـ [[Invoke-Expression]]، اللي بينفّذ أي نص كأنه كود. فالفانكشن تتعرّف، والـ prompt يتغير على طول.

السطر الرابع نفس الحكاية بثيم [['jandedobbeleer']]. ده بيغيّر النافذة دي بس، فتجرّب ثيمات براحتك.

## ٥. [[oh-my-posh config export --config 'jandedobbeleer' --output "$HOME\.mytheme.omp.json"]]

[[config export]]: اكتب الثيم في ملف عندك، و [[--output]] مكانه. و [[$HOME]] فولدر اليوزر بتاعك. كده الترمنال يفتح من غير نت وتعدّل في الملف.

## ٦. [[Add-Content $PROFILE 'oh-my-posh init pwsh ...']]

بيزوّد سطر الـ init في آخر الـ profile. **علامات التنصيص الفردية** بره مهمة: جوه [[' ']] PowerShell مبيحسبش [[$HOME]]، فبيتكتب في الملف زي ما هو:

~~~text اللي بيتكتب في الـ profile
oh-my-posh init pwsh --config "$HOME\.mytheme.omp.json" | Invoke-Expression
~~~

وبعدين لما الـ profile يشتغل، [[$HOME]] بيتحسب جوه الـ double quotes. (ولو كنت كتبت السطر كله بين double quotes، [[$HOME]] كان هيتحسب وانت بتكتبه، والمسار كان هيتكتب ثابت، وده كمان شغال بس أقل مرونة.)

## ٧. [[winget upgrade JanDeDobbeleer.OhMyPosh --source winget]]

[[upgrade]]: حدّث لآخر نسخة.

---

## ملخص

| السطر | بيعمل إيه | كام مرة |
|---|---|---|
| ١ | سطّب البرنامج | مرة |
| ٢ | سطّب الخط | مرة |
| ٣ و ٤ | جرّب ثيم في النافذة دي | براحتك |
| ٥ | انسخ الثيم اللي اخترته لملف | مرة |
| ٦ | حطه في الـ profile | مرة |
| ٧ | حدّث | كل فترة |

## على bash و zsh

نفس البرنامج، والسطر بس بيتغير (من الدوكيومنتيشن): [[eval "$(oh-my-posh init bash --config ~/.mytheme.omp.json)"]] في [[~/.bashrc]]، و [[zsh]] مكان [[bash]] في [[~/.zshrc]]. فنفس ملف الثيم يدّيك نفس الشكل في كل الشيلات.

## الخلاصة

~~~text
init pwsh            بيطبع كود prompt، و Invoke-Expression ينفّذه
--config             ثيم بالاسم أو ملف أو لينك
config export        الثيم في ملف عندك، من غير نت
' ' في Add-Content   عشان $HOME يتحسب وقت الـ profile
~~~`,
          lines: [
            "سطّب oh-my-posh من مخزن winget، وافتح نافذة جديدة بعدها.",
            "نزّل خط Meslo Nerd Font وسطّبه لليوزر بتاعك.",
            "جرّب ثيم atomic في النافذة دي بس ([[Invoke-Expression]] بينفّذ الكود اللي init طبعه).",
            "جرّب ثيم تاني في نفس النافذة.",
            "انسخ الثيم اللي اخترته لملف عندك.",
            "زوّد سطر الـ init بالملف ده في آخر الـ profile.",
            "حدّث oh-my-posh لآخر نسخة."
          ],
          sol: R`(مسطّبتش oh-my-posh على الجهاز اللي كتبت عليه الدرس؛ الأوامر من الدوكيومنتيشن الرسمي على ohmyposh.dev وقت كتابة الدرس، صفحات Windows و Prompt و Customize و Fonts.) بعد سطر الـ init، الـ prompt بيتغيّر على طول في نفس النافذة: [[atomic]] مثلًا بيطلع سطر بخلفيات ملونة فيه اسم اليوزر والفولدر والـ branch، وبعدها سطر جديد بتكتب فيه. ولو شايف مربعات أو [[?]]، الخط مش Nerd Font: اختار [[MesloLGM Nerd Font]] في إعدادات الترمنال (Windows Terminal: Settings ثم Defaults ثم Appearance ثم Font face، أو في settings.json تحت [[profiles.defaults.font.face]]).

لو [[oh-my-posh]] نفسه طلع [[is not recognized]] بعد التسطيب، اقفل الترمنال كله وافتحه تاني (وفي VS Code اعمل Restart). ولو الـ profile طلع [[running scripts is disabled]]، ده الـ ExecutionPolicy (درس ExecutionPolicy). وللقياس: [[(Measure-Command { pwsh -c exit }).TotalMilliseconds]] قبل وبعد، وقارنه بـ [[pwsh -NoProfile -c exit]]؛ عندي من غير profile الاتنين كانوا حوالي 300 ملّي ثانية، والفرق بعد أي إضافة هو اللي الـ profile بيضيفه على كل نافذة.`
        }
      ]
    }
]);
