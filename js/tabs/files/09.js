// تكملة تاب files: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/files/01.js (شرح حقول الدرس في أوله)
MORE("files", [
    {
      t: "ملفات السكربتات: .sh و .ps1 و .bat",
      l: 2,
      n: "ملفات فيها أوامر ترمنال ورا بعض: مين بيشغّلها، والـ shebang و chmod +x، و Execution Policy في ويندوز، وإيه اللي بيحصل لما تدوس عليها دبل كليك",
      items: [
        {
          cmd: ".sh و .bash و .zsh",
          title: "ملف .sh بيتشغّل إزاي، وإيه #! و chmod +x؟",
          desc: R`[[.sh]] ملف نصي فيه أوامر shell ورا بعض، بالظبط زي ما بتكتبها في الترمنال. بيستخدم لأتمتة أي حاجة بتكررها: deploy و backup وتجهيز سيرفر. التفاصيل في تاب bash.

الامتدادات: [[.sh]] الأشهر (معناها «سكربت shell» عمومًا)، و [[.bash]] أو [[.zsh]] لو السكربت بيستخدم حاجات خاصة بالشيل ده. بس الحقيقة إن الامتداد مش هو اللي بيحدد مين يشغّله، اللي بيحدد هو أول سطر.

أول سطر (shebang): [[#!/usr/bin/env bash]]
• [[#!]] لازم يبقوا أول حرفين في الملف خالص (ولا مسافة ولا BOM قبلهم).
• بعدهم مسار البرنامج اللي هيشغّل الملف. [[/usr/bin/env bash]] معناها «دوّر على bash في الـ PATH»، وده أأمن من [[#!/bin/bash]] لأن bash مش في نفس المكان على كل الأنظمة (الماك مثلًا).
• [[#!/bin/sh]] معناها shell بسيط (على أوبونتو ده dash مش bash)، فحاجات bash زي [[[[ ]]]] والـ arrays مش هتشتغل.
• نفس الفكرة لأي لغة: [[#!/usr/bin/env python3]] و [[#!/usr/bin/env node]].

صلاحية التشغيل: الملف الجديد مبيتشغّلش بـ [[./deploy.sh]] غير لما تديله [[x]]: [[chmod +x deploy.sh]]. ومن غير صلاحية تقدر تشغّله بـ [[bash deploy.sh]] (هنا انت اللي اخترت البرنامج، فالـ shebang بيتجاهل).

ليه [[./]]؟ لأن الفولدر الحالي مش في الـ PATH لأسباب أمان، فلازم تقول المسار صراحة.

على ويندوز: [[.sh]] مبيشتغلش في PowerShell ولا CMD. شغّله في Git Bash أو WSL. والدبل كليك عليه بيفتحه في المحرر أو Git Bash على حسب الإعدادات. وأخطر حاجة: لو اتكتب على ويندوز ممكن يتحفظ CRLF فيقع على لينكس (درس LF و CRLF)، و Git ممكن يضيّع صلاحية [[x]] (الحل: [[git update-index --chmod=+x deploy.sh]]).`,
          example: R`#!/usr/bin/env bash
# بيعمل نسخة احتياطية من فولدر
set -euo pipefail
SRC="$__{1:-.}"
DEST="backup-$(date +%F).tar.gz"
echo "بعمل backup لـ $SRC"
tar -czf "$DEST" "$SRC"
echo "تم: $DEST ($(du -h "$DEST" | cut -f1))"`,
          flag: "script",
          try: R`احفظ المثال في [[deploy.sh]] في [[lab/files]] واعمل فولدر [[data]] فيه أي ملف. جرّب بالترتيب: [[./deploy.sh data]] (هيرفض)، و [[bash deploy.sh data]]، و [[chmod +x deploy.sh]] وبعدين [[./deploy.sh data]]، و [[ls -l deploy.sh]]. وبعدين جرّب [[./deploy.sh مش-موجود]] وشوف [[set -e]] عمل إيه.`,
          deep: {
            why: R`أي حاجة بتكتبها في الترمنال أكتر من مرتين تستاهل تبقى سكربت: بتتنفذ كل مرة بنفس الطريقة، ومتنساش خطوة، وتقدر تديها لحد تاني أو للـ CI. والـ shebang بيخلي السكربت يتشغّل زي أي برنامج من غير ما اليوزر يعرف مكتوب بإيه.`,
            how: R`لما تكتب [[./deploy.sh]]، الـ kernel بيقرا أول bytes في الملف: لو [[#!]] بياخد باقي السطر كبرنامج ويشغّله ويديله اسم الملف، يعني بينفذ فعليًا [[/usr/bin/env bash ./deploy.sh data]]. وقبلها بيشيك على صلاحية [[x]]، ومن غيرها [[Permission denied]]. و [[set -euo pipefail]]: [[-e]] وقّف عند أول أمر يفشل، و [[-u]] متغير مش معرّف يبقى غلط، و [[pipefail]] لو أي أمر في pipe فشل الكل فشل.`,
            when: R`أتمتة على لينكس والماك والسيرفرات: deploy و backup و setup، والسكربتات في [[package.json]] لما تكبر، وخطوات الـ CI، و [[entrypoint.sh]] في Docker.`,
            mistakes: R`سكربت بـ CRLF ([[cannot execute: required file not found]] أو [[bad interpreter]]). تنسى [[chmod +x]] ([[Permission denied]]). تكتب [[#!/bin/sh]] وتستخدم حاجات bash. متحطش التنصيص حوالين المتغيرات ([[tar -czf $DEST $SRC]]) فأول اسم فيه مسافة يبوّظ كل حاجة. وتحط باسوردات جوه السكربت وتعمله commit.`
          },
          teach: R`## الفكرة

السكربت بياخد اسم فولدر ويعمله أرشيف مضغوط باسم فيه تاريخ النهارده. هنقراه سطر سطر، وبعدين نشغّله بالطرق اللي في الـ «جرّب» ونشوف الـ shebang و [[chmod +x]] بيعملوا إيه، ونجرّب أشهر غلطتين: CRLF و [[#!/bin/sh]]. كله اتشغّل على أوبونتو 24.04 في Docker (bash 5.2).

---

## ١. السكربت سطر سطر

### [[#!/usr/bin/env bash]]

الـ **shebang** (من hash [[#]] و bang [[!]]). لـ bash هو تعليق عادي، بس لينكس بيقراه لما تشغّل الملف مباشرة ([[./deploy.sh]]): بياخد باقي السطر ويشغّله ويدّيله اسم الملف. يعني فعليًا بيتنفذ:

~~~bash
/usr/bin/env bash ./deploy.sh data
~~~

و [[env]] برنامج بيدوّر على [[bash]] في الـ PATH. لو كتبت [[#!/bin/bash]] على طول هتشتغل على أغلب لينكس، بس على أنظمة bash فيها في مكان تاني (أو نسخة أحدث متسطّبة في مكان تاني زي Homebrew على الماك) [[env]] أضمن.

### [[# بيعمل نسخة احتياطية من فولدر]]

تعليق. [[#]] في أي مكان غير أول سطر = تعليق عادي.

### [[set -euo pipefail]]

[[set]] بيغيّر سلوك bash نفسه. الـ ٣ مع بعض اسمهم «strict mode»:

| الخيار | معناه | جرّبناه |
|---|---|---|
| [[-e]] | أول أمر يفشل، السكربت يقف | تحت في خطوة ٤ |
| [[-u]] | استخدام متغير مش متعرّف = غلط | [[echo "$NAME"]] طلّع [[NAME: unbound variable]] و exit 1 |
| [[-o pipefail]] | في pipe ([[a]] بيبعت لـ [[b]])، لو [[a]] فشل الـ pipe كله يعتبر فاشل (من غيره بيتحسب نجاح [[b]] بس) | |

### [[SRC="$__{1:-.}"]]

- [[$1]]: أول argument بعد اسم السكربت ([[data]] في [[./deploy.sh data]]).
- [[$__{1:-.}]]: نفس الكلام، بس لو مفيش argument خد [[.]] (الفولدر الحالي). [[:-]] = «لو فاضي أو مش موجود، استخدم ده».
- مفيش مسافات حوالين [[=]]: [[SRC = x]] في bash معناها «شغّل أمر اسمه SRC».

### [[DEST="backup-$(date +%F).tar.gz"]]

- [[$(...)]]: command substitution: شغّل الأمر اللي جوه وحط ناتجه هنا.
- [[date +%F]]: التاريخ بالشكل [[%F]] = سنة-شهر-يوم. اتشغّل وطبع [[2026-10-07]].
- فالنتيجة [[backup-2026-10-07.tar.gz]].

### [[echo "بعمل backup لـ $SRC"]]

جوه [["..."]] الـ [[$SRC]] بتتبدّل بقيمتها. (جوه [['...']] مكانتش هتتبدّل.)

### [[tar -czf "$DEST" "$SRC"]]

[[tar]] بيعمل أرشيف: [[c]] create، و [[z]] اضغط بـ gzip، و [[f]] اسم الملف اللي جاي بعدها. والتنصيص حوالين المتغيرات عشان لو الاسم فيه مسافة يفضل argument واحد.

### [[echo "تم: $DEST ($(du -h "$DEST" | cut -f1))"]]

من جوه لبرة:

~~~text
du -h backup-2026-10-07.tar.gz            →  4.0K	backup-2026-10-07.tar.gz
du -h backup-2026-10-07.tar.gz | cut -f1  →  4.0K
~~~

- [[du]] (disk usage) و [[-h]] أرقام مقروءة. [[4.0K]] مش حجم الملف بالظبط: [[du]] بيعدّ المساحة اللي واخدها على الديسك، والديسك بيدّي مساحة بالبلوكات (4K غالبًا)، فأي ملف صغير بياخد بلوك.
- [[|]] بيبعت الناتج للأمر اللي بعده، و [[cut -f1]] بياخد أول عمود (العواميد مفصولة بـ Tab).

---

## ٢. التشغيل بالترتيب

### [[./deploy.sh data]] قبل [[chmod]]

~~~text الناتج
-rw-r--r-- 1 root root 245 Oct  7 11:53 deploy.sh
bash: line 13: ./deploy.sh: Permission denied
~~~

[[rw-r--r--]] مفيهاش [[x]]، فلينكس رفض يشغّله كبرنامج (exit code [[126]]).

### [[bash deploy.sh data]]

~~~text الناتج
بعمل backup لـ data
تم: backup-2026-10-07.tar.gz (4.0K)
~~~

اشتغل من غير [[x]]: انت شغّلت [[bash]] (اللي هو برنامج عنده [[x]])، و [[bash]] قرا الملف كنص. والـ shebang هنا مجرد تعليق.

### [[chmod +x deploy.sh]] ثم [[./deploy.sh data]]

~~~text الناتج
-rwxr-xr-x 1 root root 245 Oct  7 11:53 deploy.sh
بعمل backup لـ data
تم: backup-2026-10-07.tar.gz (4.0K)
~~~

[[+x]] ضاف [[x]] للكل، ودلوقتي الـ shebang هو اللي اختار [[bash]].

| الطريقة | محتاج [[x]]؟ | مين بيختار البرنامج |
|---|---|---|
| [[./deploy.sh]] | آه | الـ shebang |
| [[bash deploy.sh]] | لأ | انت |

### [[./deploy.sh مش-موجود]]: [[set -e]] شغّال

~~~text الناتج
بعمل backup لـ مش-موجود
tar: \331\205\330\264-\331\205\331\210\330\254\331\210\330\257: Cannot stat: No such file or directory
tar: Exiting with failure status due to previous errors
~~~

- [[tar]] فشل (exit code [[2]])، فـ [[set -e]] وقّف السكربت، وسطر «تم» **مطبعش**. من غير [[-e]] كان هيقول «تم» عن أرشيف ناقص.
- الأرقام [[\331\205...]]: [[tar]] بيطبع الحروف غير الإنجليزي كأكواد bytes بالـ octal في رسايل الأخطاء. دي «مش-موجود» بـ UTF-8.

---

## ٣. CRLF: السكربت اتحفظ على ويندوز

حوّلنا نهاية كل سطر لـ [[\r\n]] (CRLF، درس LF و CRLF):

~~~text ./crlf.sh data
/usr/bin/env: 'bash\r': No such file or directory
/usr/bin/env: use -[v]S to pass options in shebang lines
~~~

الـ [[\r]] بقت جزء من اسم البرنامج، فـ [[env]] دوّر على برنامج اسمه [[bash\r]]. ومع [[#!/bin/bash]] على طول:

~~~text الناتج
bash: line 15: ./c2.sh: cannot execute: required file not found
~~~

bash 5.2 بيقول [[required file not found]]، والنسخ الأقدم كانت بتقول [[/bin/bash^M: bad interpreter]] ([[^M]] = [[\r]]). وحتى [[bash crlf.sh]] فشل بـ [[set: pipefail: invalid option name]] لأن الكلمة بقت [[pipefail\r]]. الحل: [[sed -i 's/\r$//' deploy.sh]] أو احفظه LF في VS Code.

## ٤. [[#!/bin/sh]] مش bash

~~~text الناتج
lrwxrwxrwx 1 root root 4 Mar 31  2024 /bin/sh -> dash
./s.sh: 2: [[: not found
~~~

على أوبونتو [[/bin/sh]] هو [[dash]]، shell أصغر مفيهوش [[[[ ]]]]. والأخطر إن السكربت **كمّل** وخرج بـ 0: الغلط بيعدّي من غير ما تاخد بالك.

---

## ٥. على ويندوز والماك

| | لينكس | الماك | ويندوز |
|---|---|---|---|
| التشغيل | [[./x.sh]] بعد [[chmod +x]] | نفسه (الـ shell الافتراضي zsh، بس الـ shebang بيختار) | Git Bash أو WSL، مش PowerShell ولا CMD |
| [[x]] في Git | بيتسجّل | بيتسجّل | ممكن يضيع: [[git update-index --chmod=+x x.sh]] |

## الخلاصة

- أول سطر [[#!/usr/bin/env bash]]، وتاني سطر [[set -euo pipefail]].
- [[./x.sh]] محتاج [[chmod +x]]، و [[bash x.sh]] لأ.
- [[required file not found]] أو [[bad interpreter]] أو [[$'\r': command not found]] = الملف CRLF.
- حط المتغيرات بين [["..."]] دايمًا.`,
          lines: [
            R`[[set -euo pipefail]]: وقّف عند أول غلط، ومتسامحش في متغير مش معرّف.`,
            R`[[$1]] أول argument، و [[:-.]] قيمة افتراضية [[.]] لو مفيش.`,
            R`[[$(...)]] بينفذ أمر ويحط ناتجه: [[date +%F]] بيطلّع [[2026-10-01]].`,
            R`[[echo]] يطبع، والمتغير جوه [["..."]] بيتبدّل.`,
            R`[[tar]] بيعمل أرشيف مضغوط (المستوى ٣).`,
            R`[[du -h]] حجم الملف، و [[cut -f1]] بياخد الرقم بس.`
          ],
          sol: R`الناتج الحقيقي:
[[./deploy.sh data]] ← [[bash: ./deploy.sh: Permission denied]]
[[bash deploy.sh data]] ← بيشتغل:
[[بعمل backup لـ data]]
[[تم: backup-2026-10-01.tar.gz (4.0K)]]
بعد [[chmod +x]]: [[./deploy.sh data]] بيشتغل بنفس الناتج، و [[ls -l]] بيعرض [[-rwxrwxr-x]] (الـ [[x]] ظهرت).

و [[./deploy.sh مش-موجود]]: [[tar]] بيقول [[Cannot stat: No such file or directory]] و [[set -e]] بيوقف السكربت فمبيطبعش «تم». من غير [[set -e]] كان هيكمّل ويقولك «تم» على أرشيف بايظ.

([[file deploy.sh]] بيقول [[Bourne-Again shell script, Unicode text, UTF-8 text executable]]: عرفه bash من الـ shebang.)`
        },
        {
          cmd: ".ps1 و .psm1",
          title: "ملف .ps1 بيتشغّل إزاي، وليه ويندوز بيقول running scripts is disabled؟",
          desc: R`[[.ps1]] سكربت PowerShell: الأوامر اللي بتكتبها في PowerShell في ملف. ده الـ [[.sh]] بتاع ويندوز (و PowerShell 7 شغال على لينكس والماك كمان). التفاصيل في تاب PowerShell.

الملفات:
• [[.ps1]]: سكربت عادي.
• [[.psm1]]: module، فيه دوال بتعملها [[Import-Module]] وتستخدمها من سكربتات تانية.
• [[.psd1]]: ملف بيوصف الـ module (اسمه ونسخته). شكله hashtable: [[@{ ... }]].
• [[$PROFILE]]: ملف [[.ps1]] بيتشغّل كل ما تفتح PowerShell (زي [[~/.bashrc]]).

الرموز في السكربت:
• [[#]] تعليق، و [[<# ... #>]] تعليق على كذا سطر.
• [[$]] قبل المتغيرات: [[$dest]].
• [[param(...)]] أول السكربت: الـ arguments بأسامي، وبتتبعت كده: [[.\backup.ps1 -Source data]].
• الأوامر شكلها [[Verb-Noun]]: [[Get-Item]] و [[Compress-Archive]] و [[Write-Host]].

بيتشغّل إزاي:
• من PowerShell: [[.\backup.ps1]] (لازم [[.\]] زي [[./]] في bash).
• من CMD أو اختصار: [[powershell -ExecutionPolicy Bypass -File backup.ps1]]، أو [[pwsh -File backup.ps1]] لـ PowerShell 7.
• الدبل كليك على [[.ps1]] مبيشغّلوش! بيفتحه في Notepad. ده مقصود من مايكروسوفت عشان محدش يشغّل سكربت بالغلط. (كليك يمين ثم [[Run with PowerShell]] بيشغّله.)

Execution Policy: ويندوز (على أجهزة الـ client) افتراضيًا بيمنع تشغيل أي [[.ps1]]، فأول مرة هيطلعلك:
[[running scripts is disabled on this system]]
الحل المعتاد ليوزر عادي: [[Set-ExecutionPolicy -Scope CurrentUser RemoteSigned]]. معناها: السكربتات اللي انت كاتبها تشتغل، واللي نازلة من النت لازم تبقى موقعة (أو تفكلها الحظر بـ [[Unblock-File]] بعد ما تقراها). والـ policy دي مش حماية حقيقية، هي «حزام أمان» عشان متشغّلش حاجة بالغلط.`,
          example: R`# بيعمل نسخة احتياطية من فولدر
param(
    [string]$Source = "."
)
$dest = "backup-$(Get-Date -Format yyyy-MM-dd).zip"
Write-Host "بعمل backup لـ $Source"
Compress-Archive -Path $Source -DestinationPath $dest -Force
Get-Item $dest | Select-Object Name, Length`,
          flag: "script",
          try: R`على ويندوز: احفظ المثال في [[backup.ps1]] واعمل فولدر [[data]] فيه ملف. في PowerShell شوف الـ policy: [[Get-ExecutionPolicy]]. جرّب [[.\backup.ps1 -Source data]]، ولو اترفض نفّذ [[Set-ExecutionPolicy -Scope CurrentUser RemoteSigned]] وجرّب تاني. وجرّب الدبل كليك على الملف. على لينكس أو الماك: نزّل PowerShell 7 وشغّله بـ [[pwsh -File backup.ps1 -Source data]].`,
          deep: {
            why: R`ويندوز محتاج لغة سكربتات قوية بدل CMD القديم، فعمل PowerShell سنة 2006: بدل ما الأوامر بتتبادل نص زي bash، بتتبادل objects ليها خصائص ([[Name]] و [[Length]])، فبتعمل [[Select-Object]] و [[Where-Object]] على الخصائص مباشرة من غير [[grep]] و [[cut]].`,
            how: R`لما تشغّل [[.ps1]]، PowerShell بيشيك على الـ Execution Policy الأول. الملف اللي نزل من النت بيبقى عليه علامة مخفية (Zone.Identifier، اسمها Mark of the Web)، و [[RemoteSigned]] بيرفض الملفات اللي عليها العلامة دي لو مش موقعة. و [[param()]] بيعرّف الـ arguments فـ PowerShell بيعمل [[-Source]] لوحده ويكمّلها بـ Tab.`,
            when: R`أتمتة على ويندوز: تجهيز جهاز تطوير، و backup، وإدارة Active Directory و Azure، وسكربتات CI على runners ويندوز.`,
            mistakes: R`تحل مشكلة الـ policy بـ [[Set-ExecutionPolicy Unrestricted]] على الجهاز كله: [[RemoteSigned]] لـ [[CurrentUser]] كفاية. تشغّل سكربت من النت من غير ما تقراه. تكتب [[backup.ps1]] من غير [[.\]] فيقولك [[is not recognized]]. وتحفظ السكربت بعربي من غير BOM في Windows PowerShell 5.1 فالعربي يظهر ملخبط (PowerShell 7 مفيهوش المشكلة دي).`
          },
          teach: R`## الفكرة

نفس سكربت الـ backup بتاع درس [[.sh]] بس PowerShell: بياخد اسم فولدر ويعمله zip باسم فيه التاريخ ويعرض اسم الملف وحجمه. هنقراه سطر سطر، وبعدين نشوف الـ Execution Policy بتسمح بإيه وبترفض إيه. اتشغّل على ويندوز 11 في PowerShell 7.6 و Windows PowerShell 5.1، في فولدر فيه [[data\a.txt]]، ومن غير ما نغيّر الـ policy بتاعة الجهاز.

---

## ١. السكربت سطر سطر

### [[# بيعمل نسخة احتياطية من فولدر]]

تعليق. وفيه تعليق على كذا سطر: [[<# ... #>]].

### [[param( [string]$Source = "." )]]

~~~text
param(
    [string]$Source = "."
)
~~~

- [[param()]]: لازم يبقى أول كود في السكربت. بيعرّف الـ arguments **بأسامي**.
- [[[string]]]: النوع. لو حد بعت رقم يتحوّل نص.
- [[$Source]]: اسم الـ argument. بيتبعت [[-Source data]]، و PowerShell بيكمّله بـ Tab، وبيقبل اختصاره ([[-S data]]).
- [[= "."]]: القيمة الافتراضية (الفولدر الحالي) لو محدش بعته. زي [[$__{1:-.}]] في bash، بس بالاسم مش بالترتيب.

### [[$dest = "backup-$(Get-Date -Format yyyy-MM-dd).zip"]]

- [[$dest]] متغير، ومفيش مشكلة في المسافات حوالين [[=]] (عكس bash).
- [[$(...)]] جوه [["..."]] = نفّذ ده وحط ناتجه. نفس فكرة bash.
- [[Get-Date -Format yyyy-MM-dd]]: التاريخ بالشكل ده. [[MM]] كبيرة = الشهر، و [[mm]] صغيرة = الدقايق (غلطة مشهورة).

### [[Write-Host "بعمل backup لـ $Source"]]

بيطبع على الشاشة. الفرق بينه وبين إنك تكتب النص لوحده: [[Write-Host]] بيكتب للشاشة بس، مش بيطلّع object ممكن يتبعت في pipe.

### [[Compress-Archive -Path $Source -DestinationPath $dest -Force]]

الأوامر في PowerShell اسمها cmdlets وشكلها **Verb-Noun** (فعل-اسم). [[Compress-Archive]] = اضغط أرشيف:

| الـ parameter | معناه |
|---|---|
| [[-Path]] | اللي هيتضغط |
| [[-DestinationPath]] | اسم الـ zip |
| [[-Force]] | لو الملف موجود اكتب فوقه بدل ما تطلّع غلط |

### [[Get-Item $dest | Select-Object Name, Length]]

- [[Get-Item]] بيرجّع **object** بيمثّل الملف، فيه خصائص كتير (الاسم والحجم والتاريخ...).
- [[|]] بيبعت الـ object نفسه (مش نص زي bash).
- [[Select-Object Name, Length]] بياخد خاصيتين بس. [[Length]] = الحجم بالـ byte.

---

## ٢. التشغيل: [[.\backup.ps1 -Source data]]

~~~text الناتج (نفسه في 7.6 و 5.1)
بعمل backup لـ data

Name                  Length
----                  ------
backup-2026-10-07.zip    123
~~~

[[123]] byte: حجم الـ zip الحقيقي (هنا [[Get-Item]] بيقول الحجم بالظبط، مش بالبلوكات زي [[du]]).

و [[.\]] لازمة. من غيرها:

~~~text pwsh -c 'backup.ps1'
backup.ps1: The term 'backup.ps1' is not recognized as a name of a cmdlet, function, script file, or executable program.
~~~

PowerShell مبيدوّرش في الفولدر الحالي لوحده، لنفس سبب الأمان اللي في لينكس.

---

## ٣. الـ Execution Policy

### [[Get-ExecutionPolicy -List]]

الـ policy ليها كذا مستوى (scope)، و PowerShell بياخد أول واحد مش [[Undefined]] من فوق لتحت. ده اللي على الجهاز ده:

~~~text pwsh 7.6
        Scope ExecutionPolicy
        ----- ---------------
MachinePolicy       Undefined
   UserPolicy       Undefined
      Process       Undefined
  CurrentUser       Undefined
 LocalMachine    RemoteSigned
~~~

~~~text powershell 5.1 (نفس الجهاز)
MachinePolicy       Undefined
   UserPolicy       Undefined
      Process       Undefined
  CurrentUser    RemoteSigned
 LocalMachine       Undefined
~~~

| الـ Scope | مين بيحدده |
|---|---|
| [[MachinePolicy]] و [[UserPolicy]] | Group Policy بتاعة الشركة. بتكسب أي حاجة |
| [[Process]] | الشباك ده بس، وبيروح لما تقفله ([[-ExecutionPolicy]] في سطر التشغيل) |
| [[CurrentUser]] | انت بس |
| [[LocalMachine]] | كل اليوزرز |

لاحظ إن النسختين كل واحدة ليها إعداداتها، و [[Get-ExecutionPolicy]] من غير [[-List]] طبع [[RemoteSigned]] في الاتنين (اللي كسب).

### شكل الرفض

على جهاز ويندوز جديد كل المستويات [[Undefined]]، فالنتيجة [[Restricted]]: مفيش ولا سكربت يشتغل. جرّبنا ده من غير ما نلمس إعدادات الجهاز، بـ policy للـ process ده بس:

~~~cmd
powershell -NoProfile -ExecutionPolicy Restricted -File backup.ps1 -Source data
~~~

~~~text الناتج
File C:\Users\ali\lab\ps\backup.ps1 cannot be loaded because running scripts is disabled on this system. For
more information, see about_Execution_Policies at https:/go.microsoft.com/fwlink/?LinkID=135170.
    + CategoryInfo          : SecurityError: (:) [], ParentContainsErrorRecordException
    + FullyQualifiedErrorId : UnauthorizedAccess
~~~

- [[-ExecutionPolicy Restricted]] (أو [[Bypass]]) في سطر التشغيل = scope [[Process]] بس.
- [[-File]]: شغّل الملف ده، واللي بعده arguments ليه.

### [[RemoteSigned]] بيرفض إيه؟

الملف اللي بيتنزّل من النت بيتعلّم عليه بـ stream مخفي اسمه [[Zone.Identifier]] (الـ Mark of the Web). عملنا نسخة [[dl.ps1]] وحطينا عليها العلامة دي بإيدنا:

~~~powershell
Set-Content dl.ps1 -Stream Zone.Identifier -Value "[ZoneTransfer]$__btr$__btnZoneId=3"
.\dl.ps1 -Source data
~~~

[[ZoneId=3]] = Internet. والنتيجة:

~~~text الناتج
.\dl.ps1: File C:\Users\ali\lab\ps\dl.ps1 cannot be loaded. The file C:\Users\ali\lab\ps\dl.ps1 is not digitally signed. You cannot run this script on the current system.
~~~

وبعد [[Unblock-File dl.ps1]] (بيمسح العلامة) اشتغل عادي. يعني [[RemoteSigned]]: سكربتاتك شغالة، واللي نازل من النت محتاج توقيع أو إنك تقراه وتعمله [[Unblock-File]].

| الـ policy | معناها |
|---|---|
| [[Restricted]] | مفيش سكربتات خالص (الافتراضي على ويندوز client) |
| [[RemoteSigned]] | المحلي يشتغل، والنازل من النت لازم يبقى موقّع |
| [[AllSigned]] | كله لازم يبقى موقّع |
| [[Bypass]] | مفيش أي فحص |

والحل المعتاد مرة واحدة ليوزر عادي (مش جربناه هنا عشان بيغيّر إعدادات الجهاز): [[Set-ExecutionPolicy -Scope CurrentUser RemoteSigned]].

---

## ٤. العربي و BOM في 5.1

Windows PowerShell 5.1 بيقرا الملف اللي من غير BOM بالـ code page بتاع ويندوز (ANSI)، مش UTF-8. على الجهاز ده العربي طلع سليم، لأن ويندوز هنا متظبط على UTF-8 للنظام كله ([[[System.Text.Encoding]::Default]] طلّع [[utf-8]]، وده إعداد اختياري اسمه «Beta: Use Unicode UTF-8»). على أغلب الأجهزة الإعداد ده مقفول، والعربي هيطلع ملخبط في 5.1. احفظ السكربت **UTF-8 with BOM** لو هيشتغل على 5.1. PowerShell 7 بيقرا UTF-8 افتراضيًا.

## الخلاصة

| | bash | PowerShell |
|---|---|---|
| الـ arguments | [[$1]] و [[$__{1:-.}]] | [[param([string]$Source = ".")]] |
| تشغيل من الفولدر | [[./x.sh]] | [[.\x.ps1]] |
| الإذن | [[chmod +x]] | Execution Policy |
| الـ pipe | نص | objects |

- [[running scripts is disabled]] = الـ policy [[Restricted]]. الحل [[RemoteSigned]] لـ [[CurrentUser]]، مش [[Unrestricted]] للجهاز كله.
- الدبل كليك على [[.ps1]] بيفتحه في محرر، ده مقصود.`,
          lines: [
            R`[[param(]] بيبدأ تعريف الـ arguments.`,
            R`argument اسمه [[Source]] نوعه string وقيمته الافتراضية [[.]].`,
            R`قفل [[param]].`,
            R`[[$(...)]] جوه النص بينفذ أمر: التاريخ بالشكل ده.`,
            R`[[Write-Host]] يطبع على الشاشة.`,
            R`بيعمل zip، و [[-Force]] يكتب فوق القديم لو موجود.`,
            R`[[|]] بيبعت الـ object، و [[Select-Object]] بياخد خاصيتين منه.`
          ],
          sol: R`على ويندوز أول مرة غالبًا:
[[.\backup.ps1 : File C:\lab\backup.ps1 cannot be loaded because running scripts is disabled on this system.]]
[[Get-ExecutionPolicy]] بيقول [[Restricted]]. وبعد [[Set-ExecutionPolicy -Scope CurrentUser RemoteSigned]] السكربت يشتغل:
[[بعمل backup لـ data]]
وجدول فيه [[Name]] = [[backup-2026-10-01.zip]] و [[Length]] = حجمه بالـ bytes.

الدبل كليك بيفتح الملف في Notepad مش بيشغّله. وعلى لينكس [[pwsh]] بيشغّله علطول لأن [[Get-ExecutionPolicy]] هناك [[Unrestricted]] (الـ policy بتاعة ويندوز بس).`
        },
        {
          cmd: ".bat و .cmd",
          title: "ملف .bat بيعمل إيه، وليه لسه موجود جنب PowerShell؟",
          desc: R`[[.bat]] (batch) و [[.cmd]]: سكربتات CMD، أقدم طريقة أتمتة على ويندوز (من أيام DOS). نفس الأوامر اللي بتكتبها في CMD (تاب CMD). الفرق بين الامتدادين بسيط جدًا ([[.cmd]] أحدث شوية في التعامل مع [[ERRORLEVEL]])، وعمليًا نفس الحاجة.

ليه لسه موجود؟ لأنه بيشتغل على أي ويندوز من غير Execution Policy ولا أي حاجة، والدبل كليك عليه بيشغّله فورًا. عشان كده هتقابله في: [[gradlew.bat]] و [[mvnw.cmd]] (نسخة ويندوز من سكربتات البناء)، و [[npm.cmd]] و [[npx.cmd]] (لما تكتب [[npm]] في CMD انت فعليًا بتشغّل ملف [[.cmd]])، و [[start.bat]] في برامج وألعاب كتير.

الرموز:
• [[@echo off]] أول سطر: متطبعش كل أمر قبل ما تنفذه (و [[@]] بتخفي السطر ده نفسه).
• [[REM]] أو [[::]] تعليق.
• [[set NAME=value]]: متغير (من غير مسافات حوالين [[=]]، وإلا المسافة تبقى جزء من الاسم أو القيمة).
• [[%NAME%]]: قراية متغير. و [[%1]] و [[%2]]: الـ arguments. و [[%~dp0]]: فولدر السكربت نفسه.
• [[setlocal]]: المتغيرات متطلعش بره السكربت.
• [[if not exist "x" mkdir "x"]] و [[goto label]] و [[:label]].
• [[pause]] في الآخر: «Press any key to continue» عشان الشباك ميتقفلش قبل ما تقرا (لما تشغّله بدبل كليك).
• [[%ERRORLEVEL%]]: نتيجة آخر أمر (0 يعني نجح).

خد بالك:
• الدبل كليك بيشغّل علطول، فمتدوسش على [[.bat]] أو [[.cmd]] جايلك من حد مش عارفه: ده برنامج كامل يقدر يمسح ويعمل أي حاجة.
• العربي في CMD بيظهر ملخبط إلا لو كتبت [[chcp 65001]] الأول (بيغيّر الـ code page لـ UTF-8).
• خلّي نهايات السطور CRLF في الملفات دي ([[*.bat text eol=crlf]] في [[.gitattributes]]).
• للحاجات الجديدة استخدم PowerShell: أقوى ومقروء أكتر.`,
          example: R`@echo off
REM copies the text files into a backup folder
setlocal
set NAME=backup
if not exist "%NAME%" mkdir "%NAME%"
copy /Y data\*.txt "%NAME%\" >nul
echo Done: %NAME%
echo Arg 1 is: %1
pause`,
          try: R`على ويندوز: احفظ المثال في [[backup.bat]] جنب فولدر [[data]] فيه ملف [[a.txt]]. شغّله بدبل كليك، وبعدين من CMD: [[backup.bat hello]]. شيل [[@echo off]] وشغّله تاني وشوف الفرق. وجرّب تضيف [[echo أهلًا]] وشغّله، وبعدين ضيف [[chcp 65001 >nul]] تحت [[@echo off]] (واحفظ الملف UTF-8) وشغّله تاني. وبص في فولدر npm عندك: [[where npm]] هيوريك [[npm.cmd]].`,
          deep: {
            why: R`ويندوز محافظ جدًا على التوافق مع القديم، فأي سكربت batch من التسعينات لسه شغال. والأدوات اللي لازم تشتغل على أي جهاز ويندوز من غير إعدادات (زي gradlew و npm) بتستخدمه عشان مضمون.`,
            how: R`CMD بيقرا الملف سطر سطر وينفذه، وبيبدّل [[%NAME%]] بقيمته قبل ما ينفذ السطر. الدبل كليك بيفتح شباك CMD يشغّل الملف ويقفل أول ما يخلص، عشان كده [[pause]] مهمة. و [[>nul]] بيرمي الناتج (زي [[/dev/null]] في لينكس).`,
            when: R`سكربت بسيط لازم يشتغل بدبل كليك على أي ويندوز، أو لما تعدّل سكربتات موجودة. لأي حاجة جديدة فيها منطق، PowerShell.`,
            mistakes: R`[[set NAME = backup]] بمسافات فالمتغير اسمه [[NAME ]] بمسافة. تنسى التنصيص حوالين مسار فيه مسافات ([[C:\Program Files]]). تكتب العربي من غير [[chcp 65001]] فيظهر [[?????]]. وتشغّل [[.bat]] أو [[.cmd]] جايلك في إيميل.`
          },
          teach: R`## الفكرة

سكربت batch بيعمل فولدر [[backup]] وينسخ فيه ملفات [[.txt]] اللي في [[data]]، ويطبع الـ argument الأول، ويستنى زرار. اتشغّل على ويندوز 11 في [[cmd /c]]، في فولدر فيه [[data\a.txt]] (المسار اتختصر لـ [[C:\lab]])، والملف محفوظ بنهايات سطور CRLF.

---

## ١. السكربت سطر سطر

### [[@echo off]]

CMD افتراضيًا بيطبع كل سطر قبل ما ينفذه (اسمها echo). [[echo off]] بيقفل ده لباقي الملف. و [[@]] قدام أي سطر = متطبعش السطر ده بالذات، فبيخفي [[echo off]] نفسها.

### [[REM copies the text files into a backup folder]]

[[REM]] (remark) = تعليق. وفيه [[::]] كمان، بس [[REM]] أضمن جوه البلوكات اللي بين [[( )]].

### [[setlocal]]

أي متغير يتعمل بعد السطر ده بيختفي لما السكربت يخلص. من غيره، لو شغّلت السكربت من شباك CMD مفتوح، [[NAME]] يفضل موجود في الشباك ده بعدها.

### [[set NAME=backup]]

متغير اسمه [[NAME]] قيمته [[backup]]. **من غير مسافات** حوالين [[=]]: CMD بياخد كل حرف حرفيًا. جرّبنا [[set NAME = backup]] في ملف لوحده:

~~~text الناتج
[]
[ backup]
~~~

السطر الأول [[echo [%NAME%]]] طلع فاضي: مفيش متغير اسمه [[NAME]]. والتاني [[echo [%NAME %]]] طلع [[ backup]]: المتغير اسمه [[NAME ]] بمسافة، وقيمته [[ backup]] بمسافة.

### [[if not exist "%NAME%" mkdir "%NAME%"]]

- [[%NAME%]]: قراية المتغير. CMD بيبدّلها بـ [[backup]] **قبل** ما ينفذ السطر.
- [[if not exist "x"]]: لو مفيش ملف أو فولدر بالاسم ده...
- [[mkdir "x"]]: ...اعمله. التنصيص عشان لو الاسم فيه مسافة.

### [[copy /Y data\*.txt "%NAME%\" >nul]]

| الحتة | معناها |
|---|---|
| [[copy]] | انسخ |
| [[/Y]] | لو الملف موجود اكتب فوقه من غير ما تسأل [[Overwrite? (Yes/No/All)]] |
| [[data\*.txt]] | كل ملف آخره [[.txt]] في [[data]]. [[\]] فاصل المسارات في ويندوز، و [[*]] أي اسم |
| [[>nul]] | ارمي الناتج ([[1 file(s) copied.]]). [[nul]] زي [[/dev/null]] |

### [[echo Done: %NAME%]] و [[echo Arg 1 is: %1]]

[[echo]] يطبع. [[%1]] أول argument بعد اسم السكربت (لحد [[%9]])، و [[%0]] اسم السكربت نفسه، و [[%*]] كلهم.

### [[pause]]

بيطبع [[Press any key to continue . . .]] ويستنى زرار. مهمة للدبل كليك: الشباك بيتقفل أول ما السكربت يخلص، فمن غيرها مش هتلحق تقرا.

---

## ٢. التشغيل: [[backup.bat hello]]

(في التجربة ادّيناه [[< nul]] عشان [[pause]] متستناش زرار.)

~~~text الناتج
Done: backup
Arg 1 is: hello
Press any key to continue . . .
~~~

والـ exit code كان 0، وفولدر [[backup]] اتعمل وفيه [[a.txt]]. ولو بالدبل كليك، [[Arg 1 is:]] بتبقى فاضية لأن مفيش arguments.

> CMD عادةً بيدوّر على [[backup.bat]] في الفولدر الحالي الأول. لو الـ environment variable اللي اسمه [[NoDefaultCurrentDirectoryInExePath]] متظبط (زي ما كان في جلسة التجربة دي) لازم تكتب [[.\backup.bat]]، وإلا هيقول [['backup.bat' is not recognized as an internal or external command]].

## ٣. من غير [[@echo off]]

~~~text الناتج
C:\lab>REM copies the text files into a backup folder

C:\lab>setlocal

C:\lab>set NAME=backup

C:\lab>if not exist "backup" mkdir "backup"

C:\lab>copy /Y data\*.txt "backup\"  1>nul

C:\lab>echo Done: backup
Done: backup

C:\lab>echo Arg 1 is: hello
Arg 1 is: hello

C:\lab>pause
Press any key to continue . . .
~~~

كل سطر بيتطبع بعد التبديل: [[%NAME%]] بقت [[backup]] و [[%1]] بقت [[hello]]. وده مفيد للـ debugging: بتشوف CMD فهم السطر إزاي. ولاحظ [[>nul]] اتكتبت [[1>nul]]: [[1]] رقم الـ stdout (و [[2]] الـ stderr).

## ٤. [[where npm]]

~~~text الناتج
C:\Program Files\nodejs\npm
C:\Program Files\nodejs\npm.cmd
~~~

[[where]] زي [[which]] في لينكس. [[npm]] من غير امتداد ده سكربت لـ Git Bash، و [[npm.cmd]] هو اللي CMD و PowerShell بيشغّلوه لما تكتب [[npm]]: يعني [[.cmd]] حواليك كل يوم.

## ٥. العربي و [[chcp]]

CMD بيقرا الملف ويطبعه بالـ code page بتاع الشباك. على أغلب الأجهزة ده 720 أو 437 مش UTF-8، فالعربي في ملف UTF-8 بيطلع رموز غريبة. [[chcp 65001]] بيحوّل الشباك لـ UTF-8 (65001 رقم UTF-8 عند ويندوز)، و [[>nul]] بعدها بيخفي رسالة [[Active code page: 65001]]. على جهاز التجربة [[chcp]] كان أصلًا [[Active code page: 65001]] (ويندوز متظبط UTF-8 للنظام كله)، فمقدرناش نوري الشكل الملخبط هنا.

## الخلاصة

| الرمز | معناه |
|---|---|
| [[@echo off]] | متطبعش الأوامر |
| [[REM]] / [[::]] | تعليق |
| [[set X=y]] | متغير، من غير مسافات |
| [[%X%]] / [[%1]] / [[%~dp0]] | قيمة متغير / أول argument / فولدر السكربت |
| [[>nul]] | ارمي الناتج |
| [[pause]] | استنى زرار |

- الدبل كليك بيشغّل علطول من غير أي سؤال: متفتحش [[.bat]] أو [[.cmd]] جايلك من حد متعرفوش.
- الملف يتحفظ CRLF، وللحاجات الجديدة PowerShell أحسن.`,
          lines: [
            R`متطبعش الأوامر نفسها، بس ناتجها.`,
            R`المتغيرات تفضل جوه السكربت.`,
            R`متغير. من غير مسافات حوالين [[=]].`,
            R`لو الفولدر مش موجود اعمله. [[%NAME%]] بتتبدّل بـ [[backup]].`,
            R`انسخ كل [[.txt]]، و [[/Y]] من غير ما تسأل، و [[>nul]] اخفي الرسالة.`,
            R`يطبع.`,
            R`[[%1]] أول argument.`,
            R`يستنى زرار قبل ما الشباك يتقفل.`
          ],
          sol: R`الناتج:
[[Done: backup]]
[[Arg 1 is: hello]]
[[Press any key to continue . . .]]
وفولدر [[backup]] فيه [[a.txt]]. بالدبل كليك [[Arg 1 is:]] فاضية لأن مفيش arguments.

من غير [[@echo off]] كل أمر بيتطبع قبل ناتجه، زي [[C:\lab>set NAME=backup]]. والعربي من غير [[chcp 65001]] بيظهر رموز غريبة، ومعاها بيظهر سليم (في Windows Terminal بالذات). و [[where npm]] بيطبع حاجة زي [[C:\Program Files\nodejs\npm]] و [[C:\Program Files\nodejs\npm.cmd]].`
        }
      ]
    }
]);
