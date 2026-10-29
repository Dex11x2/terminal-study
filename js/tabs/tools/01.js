// كل درس هنا في مكان واحد:
//   cmd      اسم الدرس (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. السطور اللي بتبدأ بـ # تعليق، وسطر زي «# Windows (PowerShell):» بيفتح صندوق لنظام لوحده
//   lines    شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   teach    الشرح خطوة بخطوة (markdown صغير)
//   deep / sol / solCode / learn / out / use  زي باقي التابات
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{، والباكتيك اكتبها $__bt.

TAB("tools", {
  label: "عدّة الترمنال",
  prompt: "$ ",
  lab: R`# Windows (PowerShell):
Get-CimInstance Win32_OperatingSystem | Select-Object Caption, LastBootUpTime
# Linux:
cat /etc/os-release | head -2`,
  labText: "الأوامر هنا للحياة اليومية: شكل الترمنال، وصحة الجهاز، والفلاشات، والشبكة. كل درس فيه ويندوز ولينكس (والماك لما يختلف). اللي بيغيّر حاجة في الجهاز مكتوب عليه، واتجرّب على ديسك وهمي مش على جهاز حقيقي.",
  levels: {
    "1": ["شكله ومعلوماته", "الألوان والـ prompt، ومعلومات الجهاز، والديسك، والبطارية، ومين واكل الرام"],
    "2": ["افحص وصلّح", "فحص الفيروسات، وملفات النظام، والتنضيف الآمن، والفلاشات، ومين على شبكتك"],
    "3": ["مشروع", "سكربت واحد بيطلّع تقرير صحة جهازك كله"]
  },
  categories: [
    {
      t: "شكّل الترمنال بتاعك",
      l: 1,
      time: R`حوالي ٤٠ دقيقة`,
      goal: [
        R`تلوّن الكلام في الترمنال في PowerShell و bash و CMD.`,
        R`تعمل prompt بيوريك اللي يهمك: الوقت، أو الفولدر، أو اسم السيرفر.`,
        R`تخلي التغيير يفضل مع كل فتحة، وتعرف الملف الصح لكل شيل.`,
      ],
      use: {
        work: R`نافذة لونها مختلف وعنوانها «PROD» قبل ما تشغّل أمر على السيرفر الحقيقي بتمنع غلطات بتكلّف كتير.`,
        prog: R`السكربتات اللي بتلوّن «نجح» بالأخضر و«فشل» بالأحمر بتتقري في ثانية بدل ما تدوّر في نص طويل.`,
      },
      lab: R`# Windows (PowerShell):
pwsh -NoProfile
# Linux:
docker run -it --rm ubuntu:24.04 bash`,
      projects: [
        { t: R`prompt الشغل`, what: R`prompt بيطبع الوقت، واسم الفولدر بس (مش المسار كله)، وبيتلوّن أحمر لو آخر أمر فشل ([[$?]] في PowerShell و bash). وحطه في ملف الـ profile.` },
        { t: R`نافذة الإنتاج`, what: R`سكربت بيفتح ترمنال لونه مختلف وعنوانه «PROD». في Windows Terminal: profile جديد بـ [[colorScheme]] و [[tabTitle]] (درس «شكّل Windows Terminal من ملف الإعدادات» في تاب «اختصارات النظام»).` },
      ],
      n: R`كل أمر هنا اتشغّل: PowerShell 7.6 و Windows PowerShell 5.1 و CMD على ويندوز 11، و bash على أوبونتو 24.04 جوه Docker`,
      items: [
        {
          cmd: "ألوان في الترمنال",
          title: "نص أخضر ونص أحمر، في كل شيل",
          learn: R`تلوّن الكلام في الترمنال، وتعرف ليه كلهم بيستخدموا نفس الحرف السري.`,
          out: R`رسايل «نجح» و«فشل» بتتقري من بعيد.`,
          use: {
            prog: R`أي أداة سطر أوامر بتلوّن ناتجها بنفس الطريقة دي. ولما تعرفها، تقدر تلوّن سكربتاتك.`,
            cs: R`الألوان مش جزء من النص — دي أوامر للترمنال بتبدأ بحرف [[ESC]] (رقمه ٢٧). اسمها ANSI escape codes، وهي أقدم من ويندوز نفسه.`,
          },
          desc: R`كل الترمنالات بتلوّن بنفس الطريقة: حرف مخفي اسمه **ESC** (رقمه [[27]])، وبعده كود زي [[[32m]] (أخضر) أو [[[0m]] (رجّع العادي).

| الشيل | الطريقة |
|---|---|
| PowerShell 7 | [[$PSStyle.Foreground.Green]] — جاهز |
| PowerShell 7 و 5.1 | [[Write-Host "..." -ForegroundColor Red]] |
| Windows PowerShell 5.1 | [[$PSStyle]] **مش موجود** — اكتب الحرف بإيدك: [[[char]27]] |
| bash | [[printf "\e[32m...\e[0m"]] |
| CMD | [[color 0A]] (الشاشة كلها)، أو [[$E]] جوه [[prompt]] |

**اتجرّب:** [[$PSStyle.Foreground.Green]] في PowerShell 7 بيبدأ بحرف رقمه **[[27]]**. وفي 5.1، [[$null -eq $PSStyle]] بترجّع **[[True]]** — المتغير مش موجود خالص.

**وفي bash** الكود اتبعت حرف حرف ([[od -c]] بيوريك البايتات):

[[033 [ 3 2 m ... 033 [ 0 m]]

[[033]] ده الـ ESC بالـ octal. يعني نفس الحرف بالظبط.

**وأهم حاجة: [[\e[0m]] في الآخر.** من غيره، كل اللي بعده هيفضل أخضر — حتى الـ prompt.`,
          example: R`# Windows (PowerShell):
$PSStyle.Foreground.Green + "نجح" + $PSStyle.Reset
Write-Host "فشل" -ForegroundColor Red
$e = [char]27; "$e[32mنجح$e[0m"
# Linux:
printf "\e[32mنجح\e[0m  \e[1;31mفشل\e[0m\n"
# Windows (CMD):
color 0A`,
          lines: [
            R`PowerShell 7 بس: [[$PSStyle]] فيه الألوان جاهزة. و [[.Reset]] بيرجّع العادي.`,
            R`شغال في 7 و 5.1. بيكتب على الشاشة بس — مش هيروح لملف ولا لـ pipe.`,
            R`للـ 5.1: [[[char]27]] هو حرف ESC بإيدك. وبعده [[[32m]] أخضر، و [[[0m]] رجّع.`,
            R`bash: [[\e]] = ESC. و [[1;31]] = عريض + أحمر.`,
            R`CMD: [[0]] خلفية سودا و [[A]] كلام أخضر — للشاشة كلها. ([[color]] لوحده يرجّع الافتراضي.)`,
          ],
          try: R`في PowerShell 7 اكتب [[$PSStyle]] لوحده — هيطبع كل الألوان المتاحة. وفي bash جرّب الأرقام من [[30]] لـ [[37]] (الألوان) ومن [[40]] لـ [[47]] (الخلفية): [[for i in {30..37}; do printf "\e[$__{i}m$i \e[0m"; done; echo]].`,
          deep: {
            why: R`الترمنال جهاز قديم كان بيستقبل حروف بس. فعشان يتغيّر اللون، اتفقوا على حرف مالوش شكل (ESC) بيقول «اللي بعدي أمر، مش كلام».`,
            how: R`**الأكواد الأساسية:**

| الكود | معناه |
|---|---|
| [[0]] | رجّع كل حاجة |
| [[1]] | عريض |
| [[4]] | تحته خط |
| [[30]]–[[37]] | لون الكلام (أسود، أحمر، أخضر، أصفر، أزرق، بنفسجي، سماوي، أبيض) |
| [[40]]–[[47]] | لون الخلفية |
| [[90]]–[[97]] | ألوان فاتحة |
| [[38;5;N]] | لون من ٢٥٦ (و [[tput colors]] قالت [[256]] على أوبونتو) |

**[[Write-Host]] مقابل [[$PSStyle]]:** [[Write-Host]] بيكتب على الشاشة مباشرة، فمبيتحفظش لو حوّلت لملف. و [[$PSStyle]] بيحط الحروف جوه النص نفسه — فلو حوّلته لملف، الحروف المخفية هتروح معاه. وعشان كده في PowerShell 7 فيه [[$PSStyle.OutputRendering]]: لو [[Host]]، الألوان بتتشال تلقائي لما الناتج يروح لملف.

**وفي CMD:** [[color]] بيغيّر الشاشة كلها، مش كلمة. ولو عايز تلوّن جزء، الطريقة الوحيدة السهلة هي الـ prompt بـ [[$E]] (الدرس الجاي). ولو عايز تلوّن ناتج سكربت batch، اندهلُه PowerShell (درس «إمتى تسيب batch» في تاب CMD).

**وعلى ويندوز القديم:** الكونسول القديم (conhost قبل ويندوز 10) مكانش بيفهم ESC. ويندوز 10 و 11 بيفهموه، و Windows Terminal بيفهمه كامل.`,
            when: R`سكربت بيطبع نتايج: نجح بالأخضر، وتحذير بالأصفر، وفشل بالأحمر. ومتلوّنش كل حاجة — اللون اللي في كل حتة مبيلفتش النظر.`,
            mistakes: R`تنسى [[\e[0m]] فالترمنال كله يفضل ملوّن. أو [[$PSStyle]] في 5.1. أو تحوّل ناتج ملوّن لملف وتلاقي حروف غريبة ([[\x1b[32m]]) جواه.`
          },
          teach: R`## كلهم بنفس الحرف السري

حرف مخفي اسمه **ESC** (رقمه [[27]])، وبعده كود:

~~~text
ESC [32m   ->  اللي بعده أخضر
ESC [0m    ->  رجّع العادي
~~~

---

## ١. PowerShell 7

~~~powershell
$PSStyle.Foreground.Green + "نجح" + $PSStyle.Reset
[int][char]$PSStyle.Foreground.Green[0]
~~~

~~~text اتشغّل فعلًا · PowerShell 7.6
نجح            (بالأخضر)
27             <-- أول حرف هو ESC
~~~

---

## ٢. Windows PowerShell 5.1

~~~powershell
$null -eq $PSStyle
~~~

~~~text اتشغّل فعلًا · 5.1
True           <-- $PSStyle مش موجود
~~~

~~~powershell فاكتب الحرف بإيدك
$e = [char]27; "$e[32mنجح$e[0m"
~~~

و [[Write-Host "فشل" -ForegroundColor Red]] شغال في الاتنين.

---

## ٣. bash

~~~bash
printf "\e[32mنجح\e[0m\n" | od -An -c | head -1
~~~

~~~text اتشغّل فعلًا · أوبونتو 24.04
 033   [   3   2   m 330 247 ...  033   [   0
~~~

[[033]] = ESC بالـ octal. **نفس الحرف.**

---

## ٤. CMD

~~~bat
color 0A
~~~

الشاشة كلها: خلفية سودا وكلام أخضر. ولتلوين جزء، الـ prompt بـ [[$E]] — الدرس الجاي.

---

## ٥. الأكواد

| | |
|---|---|
| [[0]] | رجّع |
| [[1]] | عريض |
| [[31]] / [[32]] / [[33]] | أحمر / أخضر / أصفر |
| [[41]] … | خلفية |
| [[38;5;N]] | ٢٥٦ لون |

---

## الخلاصة

- كله ESC + كود.
- PowerShell 7: [[$PSStyle]]. و 5.1: [[[char]27]].
- [[Write-Host -ForegroundColor]] في الاتنين.
- **[[\e[0m]] في الآخر دايمًا.**`,
          sol: R`الألوان اتجرّبت في PowerShell 7.6 و 5.1 و bash (أوبونتو 24.04) و CMD على ويندوز 11.`,
          solCode: R`# PowerShell 7:  [int][char]$PSStyle.Foreground.Green[0]   ->  27
# PowerShell 5.1: $null -eq $PSStyle                       ->  True
# bash: printf "\e[32mنجح\e[0m\n" | od -An -c
#   033   [   3   2   m ...   033   [   0   m
# tput colors (TERM=xterm-256color)  ->  256`
        },

        {
          cmd: "الـ prompt بتاعك",
          title: "السطر اللي قبل ما تكتب: خليه يقولك اللي يهمك",
          learn: R`تغيّر الـ prompt في PowerShell و bash و CMD.`,
          out: R`prompt قصير بيوريك الوقت والفولدر.`,
          use: {
            work: R`prompt فيه اسم السيرفر بلون واضح بيمنعك تشغّل أمر على الجهاز الغلط.`,
            prog: R`لما المسار طويل، الـ prompt الافتراضي بياكل نص السطر. اسم الفولدر بس كفاية.`,
          },
          desc: R`الـ prompt هو اللي بيظهر قبل ما تكتب. وكل شيل بيعمله بطريقة:

| الشيل | بيتعمل إزاي |
|---|---|
| PowerShell | **دالة** اسمها [[prompt]] — اللي بترجّعه بيتطبع |
| bash | متغير [[PS1]] فيه رموز زي [[\t]] (الوقت) و [[\W]] (الفولدر) |
| CMD | أمر [[prompt]] برموز زي [[$P]] (المسار) و [[$G]] (علامة [[>]]) و [[$E]] (ESC) |

**اتجرّب في PowerShell:**

[[function prompt { "[$(Get-Date -Format HH:mm)] $(Split-Path -Leaf $PWD)> " }]]

← **[[[12:30] full stack road map>]]**

**وفي bash مفاجأة:** حطيت [[PS1]] وبعدين فتحت [[bash -i]] — والـ prompt طلع **الافتراضي** ([[root@92cd8c9c5b1b:/#]]). لأن [[~/.bashrc]] بيتقري مع كل bash تفاعلي، وفيه سطر بيكتب [[PS1]] من جديد. فالتغيير لازم يتكتب **في آخر** [[.bashrc]] — وبعدها طلع [[[09:31:24] /$]].

**وفي CMD:** [[prompt $E[32m$P$G$E[0m]] بيلوّن المسار بالأخضر، و [[set PROMPT]] بيوريك القيمة: [[PROMPT=$E[32m$P$G$E[0m]].`,
          example: R`# Windows (PowerShell):
function prompt { "[$(Get-Date -Format HH:mm)] $(Split-Path -Leaf $PWD)> " }
# Linux:
PS1="[\t] \W\$ "
# Windows (CMD):
prompt $E[32m$P$G$E[0m`,
          lines: [
            R`دالة [[prompt]]: النص اللي بترجّعه هو الـ prompt. [[$(...)]] بيتحسب كل مرة.`,
            R`[[\t]] الوقت، و [[\W]] اسم الفولدر بس (و [[\w]] المسار كله)، و [[\$]] بتبقى [[#]] لو انت root.`,
            R`[[$E]] = ESC، و [[$P]] المسار، و [[$G]] علامة [[>]].`,
          ],
          try: R`في PowerShell خلي الـ prompt أحمر لو آخر أمر فشل: [[function prompt { $c = if ($?) { 'Green' } else { 'Red' }; Write-Host "$(Split-Path -Leaf $PWD)>" -NoNewline -ForegroundColor $c; ' ' }]]. وجرّب أمر غلط بعدها.`,
          deep: {
            why: R`انت بتبص على الـ prompt آلاف المرات في اليوم. لو بيقولك حاجة مفيدة (انت فين، وعلى أنهي جهاز، وآخر أمر نجح ولا لأ)، ده وقت بيتوفّر.`,
            how: R`**رموز bash المفيدة:**

| | |
|---|---|
| [[\u]] | اسم اليوزر |
| [[\h]] | اسم الجهاز |
| [[\w]] / [[\W]] | المسار كله / الفولدر بس |
| [[\t]] | الوقت [[HH:MM:SS]] |
| [[\$]] | [[$]] أو [[#]] لو root |
| [[\[ ... \]]] | **حوالين الألوان** — عشان bash يحسب طول السطر صح |

النقطة الأخيرة مهمة: لو حطيت ألوان من غير [[\[ \]]]، السطر الطويل بيتلخبط لما تكتب، لأن bash بيعد حروف الـ ESC كأنها ظاهرة:

~~~bash
PS1="\[\e[36m\]\u@\h\[\e[0m\]:\w\$ "     # صح
~~~

**ورموز CMD:**

| | |
|---|---|
| [[$P]] | المسار |
| [[$G]] | [[>]] |
| [[$T]] | الوقت |
| [[$_]] | سطر جديد |
| [[$E]] | ESC |

**وأدوات جاهزة لو مش عايز تكتبه بإيدك:** oh-my-posh (درس في تاب PowerShell)، و starship (درس في تاب bash). بيشتغلوا على كل الشيلات، وبيحتاجوا Nerd Font للأيقونات (درس في تاب «اختصارات النظام»).

**والتغيير ده بيروح لما تقفل.** الدرس الجاي بيخليه يفضل.`,
            when: R`أول يوم على أي جهاز بتشتغل عليه كتير.`,
            mistakes: R`[[PS1]] في الترمنال وتستغرب إنه راح. أو ألوان من غير [[\[ \]]] في bash. أو prompt طويل بياكل السطر.`
          },
          teach: R`## كل شيل بطريقة

| | |
|---|---|
| PowerShell | **دالة** [[prompt]] |
| bash | متغير [[PS1]] |
| CMD | أمر [[prompt]] |

---

## ١. PowerShell

~~~powershell
function prompt { "[$(Get-Date -Format HH:mm)] $(Split-Path -Leaf $PWD)> " }
~~~

~~~text اتشغّل فعلًا · PowerShell 7.6
[12:30] full stack road map>
~~~

---

## ٢. bash — والمفاجأة

~~~bash
PS1="[\t] \W\$ "
~~~

~~~text اتشغّل فعلًا — bash -i بعدها
root@92cd8c9c5b1b:/#            <-- الافتراضي! التغيير راح
~~~

**[[~/.bashrc]] بيكتب [[PS1]] من جديد** مع كل bash تفاعلي:

~~~text grep -n "PS1=" ~/.bashrc
53:    PS1='$__{debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:...'
~~~

~~~bash الحل: في آخر .bashrc
echo 'PS1="[\t] \W\$ "' >> ~/.bashrc
~~~

~~~text اتشغّل فعلًا
[09:31:24] /$
~~~

---

## ٣. CMD

~~~bat
prompt $E[32m$P$G$E[0m
set PROMPT
~~~

~~~text اتشغّل فعلًا
PROMPT=$E[32m$P$G$E[0m
~~~

---

## ٤. الألوان في bash: [[\[ \]]]

~~~bash
PS1="\[\e[36m\]\u@\h\[\e[0m\]:\w\$ "
~~~

من غير [[\[ \]]]، bash بيعد حروف الـ ESC كأنها ظاهرة، والسطر الطويل بيتلخبط.

---

## الخلاصة

- PowerShell: دالة. bash: [[PS1]]. CMD: [[prompt]].
- في bash، [[.bashrc]] بيمسح تغييرك — اكتبه في آخره.
- الألوان في bash بين [[\[ \]]].
- التغيير بيروح لما تقفل — الدرس الجاي.`,
          sol: R`الـ prompt اتجرّب في PowerShell 7.6 و bash (أوبونتو 24.04، قبل وبعد [[.bashrc]]) و CMD.`,
          solCode: R`# PowerShell:  [12:30] full stack road map>
# bash قبل:     root@92cd8c9c5b1b:/#        (.bashrc رجّع الافتراضي)
# bash بعد ما اتكتب في آخر .bashrc:   [09:31:24] /$
# CMD:  set PROMPT  ->  PROMPT=$E[32m$P$G$E[0m`
        },

        {
          cmd: "خلّي التغيير يفضل",
          title: "ملف بيتقري مع كل فتحة: لكل شيل واحد",
          learn: R`تعرف ملف الإعدادات بتاع كل شيل، وتحط فيه الألوان والـ prompt والاختصارات.`,
          out: R`ترمنالك بشكله كل ما تفتحه.`,
          use: {
            work: R`على جهاز جديد، ملف واحد بتنسخه بيرجّع كل إعداداتك.`,
            prog: R`نفس الملف ده هو اللي فيه الـ aliases والدوال الصغيرة اللي بتستخدمها كل يوم.`,
          },
          desc: R`كل شيل بيقرا ملف وهو بيفتح:

| الشيل | الملف |
|---|---|
| PowerShell 7 | [[$PROFILE]] — جوه [[Documents\PowerShell\]] |
| Windows PowerShell 5.1 | [[$PROFILE]] — جوه [[Documents\WindowsPowerShell\]] — **ملف تاني** |
| bash | [[~/.bashrc]] |
| zsh (الماك) | [[~/.zshrc]] |
| CMD | مفيش ملف — بيتعمل بـ [[AutoRun]] في الـ registry (درس في تاب CMD) |

**تلات حاجات اتعلمتها وأنا بجرّب:**

**١. النسختين ليهم ملفين.** [[$PROFILE]] في 7 و 5.1 طلعوا مسارين مختلفين. فلو كتبت الـ prompt في واحد، التاني مش هيشوفه.

**٢. الملف ممكن يكون جوه OneDrive.** على جهاز التجربة طلع:

[[C:\Users\you\OneDrive\Documents\PowerShell\Microsoft.PowerShell_profile.ps1]]

لأن OneDrive ماسك فولدر Documents. يعني الملف بيتزامن على أجهزتك — ميزة لو قاصدها، ومفاجأة لو مش قاصدها.

**٣. الملف مش موجود من الأول.** [[Test-Path $PROFILE]] رجّعت [[False]]. فأول مرة لازم تعمله:

[[New-Item -ItemType File -Path $PROFILE -Force]]

([[-Force]] بيعمل الفولدرات اللي في السكة كمان.)

**وجرّبت الفكرة من غير ما ألمس الـ profile الحقيقي:** ملف فيه دالة [[prompt]]، و [[. 'file.ps1']] (dot-source) بيقراه في نفس الجلسة — وطلع [[PS full stack road map>]]. ده بالظبط اللي PowerShell بيعمله مع [[$PROFILE]] وهو بيفتح.`,
          example: R`# Windows (PowerShell):
$PROFILE
Test-Path $PROFILE
New-Item -ItemType File -Path $PROFILE -Force
notepad $PROFILE
# Linux:
echo 'PS1="[\t] \W\$ "' >> ~/.bashrc
source ~/.bashrc`,
          lines: [
            R`مسار الملف. وفي 7 و 5.1 مختلف.`,
            R`موجود؟ أول مرة غالبًا [[False]].`,
            R`اعمله، و [[-Force]] بيعمل الفولدرات اللي ناقصة. **لو موجود، [[-Force]] بيفضّيه** — فشغّله بس لو [[Test-Path]] قالت [[False]].`,
            R`افتحه واكتب فيه دالة [[prompt]] أو أي حاجة. هتشتغل في كل نافذة جديدة.`,
            R`[[>>]] بيضيف في الآخر (مش [[>]] اللي بيمسح الملف). وفي الآخر عشان يكسب على اللي قبله.`,
            R`[[source]] بيقرا الملف في النافذة دي من غير ما تقفل وتفتح.`,
          ],
          try: R`افتح [[$PROFILE]] وحط فيه الـ prompt من الدرس اللي فات، واقفل الترمنال وافتحه. وبعدين افتح النسخة التانية من PowerShell (5.1 لو كنت في 7، أو العكس) وشوف إن الـ prompt مش هناك.`,
          deep: {
            why: R`أي حاجة بتكتبها في الترمنال بتعيش في الجلسة دي بس. والملف ده هو الطريقة الوحيدة إن الشيل «يفتكر».`,
            how: R`**الأربع profiles في PowerShell:** [[$PROFILE]] له أربع خصائص:

~~~text اتشغّل فعلًا
AllUsersAllHosts
AllUsersCurrentHost
CurrentUserAllHosts
CurrentUserCurrentHost      <-- ده اللي $PROFILE لوحده بيرجّعه
~~~

[[CurrentUserAllHosts]] بيتقري في PowerShell العادي وفي VS Code وفي أي برنامج بيشغّل PowerShell. فلو عايز حاجة تبقى في كل حتة، حطها هناك ([[$PROFILE.CurrentUserAllHosts]]).

**ولو الـ profile مبيشتغلش:** ممكن الـ execution policy مانعة السكربتات. [[Get-ExecutionPolicy]] لو [[Restricted]]، الـ profile مش هيتقري. والحل [[Set-ExecutionPolicy -Scope CurrentUser RemoteSigned]] (ده بيغيّر إعداد في جهازك — للمستخدم بتاعك بس).

**و [[-NoProfile]]:** كل أوامر الموقع ده بتتشغّل بـ [[pwsh -NoProfile]] عشان الـ profile بتاعك ميأثرش على النتيجة. ولو حاجة غريبة بتحصل في PowerShell، جرّب [[pwsh -NoProfile]] — لو اختفت، السبب في الـ profile.

**في bash: [[.bashrc]] مقابل [[.bash_profile]]:** [[.bashrc]] للنوافذ التفاعلية. و [[.bash_profile]] (أو [[.profile]]) للـ login shell — زي SSH. وكتير من التوزيعات بتخلي [[.bash_profile]] يقرا [[.bashrc]]. فـ [[.bashrc]] هو المكان الآمن لأغلب الحاجات.

**وعلى الماك:** zsh هو الافتراضي من macOS Catalina، والملف [[~/.zshrc]]. (من وثائق Apple، مااتجرّبش هنا.)`,
            when: R`أي حاجة عملتها في الترمنال وعايزها تفضل: prompt، ألوان، aliases، دوال، متغيرات.`,
            mistakes: R`[[New-Item -Force]] على profile موجود (بيفضّيه). أو [[>]] بدل [[>>]] على [[.bashrc]]. أو تعدّل profile نسخة وتفتح التانية. أو execution policy مانعة ومحدش واخد باله.`
          },
          teach: R`## كل شيل بيقرا ملف وهو بيفتح

| الشيل | الملف |
|---|---|
| PowerShell 7 | [[$PROFILE]] في [[Documents\PowerShell\]] |
| PowerShell 5.1 | [[$PROFILE]] في [[Documents\WindowsPowerShell\]] |
| bash | [[~/.bashrc]] |
| zsh | [[~/.zshrc]] |
| CMD | [[AutoRun]] في الـ registry |

---

## ١. PowerShell: النسختين ليهم ملفين

~~~text اتشغّل فعلًا
7:    C:\Users\you\OneDrive\Documents\PowerShell\Microsoft.PowerShell_profile.ps1
5.1:  C:\Users\you\OneDrive\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1
~~~

> ولاحظ **OneDrive**: لو ماسك فولدر Documents، الملف بيتزامن على أجهزتك.

---

## ٢. ومش موجود من الأول

~~~powershell
Test-Path $PROFILE
~~~

~~~text اتشغّل فعلًا
False
~~~

~~~powershell
New-Item -ItemType File -Path $PROFILE -Force    # لو False بس
notepad $PROFILE
~~~

> **لو الملف موجود، [[-Force]] بيفضّيه.**

---

## ٣. جرّبت الفكرة من غير ما ألمس الـ profile

~~~powershell
'function prompt { "PS " + (Split-Path -Leaf $PWD) + "> " }' | Set-Content test.ps1
. .\test.ps1
prompt
~~~

~~~text اتشغّل فعلًا
PS full stack road map>
~~~

[[.]] (dot-source) بيقرا الملف في نفس الجلسة — وده اللي بيحصل مع [[$PROFILE]] وانت بتفتح.

---

## ٤. bash

~~~bash
echo 'PS1="[\t] \W\$ "' >> ~/.bashrc
source ~/.bashrc
~~~

[[>>]] بيضيف. **[[>]] بيمسح الملف كله.**

---

## ٥. لو الـ profile مبيشتغلش

| | |
|---|---|
| [[Get-ExecutionPolicy]] = [[Restricted]] | السكربتات ممنوعة، والـ profile منهم |
| حاجة غريبة بتحصل | [[pwsh -NoProfile]] — لو اختفت، السبب في الـ profile |

---

## الخلاصة

- كل شيل ليه ملف بيتقري وهو بيفتح.
- PowerShell 7 و 5.1 = ملفين.
- [[Test-Path]] قبل [[New-Item -Force]].
- [[>>]] مش [[>]].
- [[-NoProfile]] للتشخيص.`,
          sol: R`مسارات [[$PROFILE]] و [[Test-Path]] والـ dot-source اتجرّبوا في PowerShell 7.6 و 5.1 (من غير ما يتعدّل الـ profile الحقيقي). و [[.bashrc]] على أوبونتو 24.04. وملف zsh على الماك من وثائق Apple.`,
          solCode: R`$PROFILE                 # 7:   ...\Documents\PowerShell\Microsoft.PowerShell_profile.ps1
                         # 5.1: ...\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1
Test-Path $PROFILE       # False
$PROFILE | Get-Member -MemberType NoteProperty
#   AllUsersAllHosts, AllUsersCurrentHost, CurrentUserAllHosts, CurrentUserCurrentHost`
        }
      ]
    },

    {
      t: "توصل للأمر بنفسك",
      l: 1,
      time: R`حوالي ٢٠ دقيقة`,
      goal: [
        R`تلاقي الأمر اللي محتاجه من كلمة واحدة (Disk، Battery، Volume) من غير جوجل.`,
        R`تعرف تشغّل الأمر من غير ما تحفظه: الـ help، والأمثلة، والصفحة الرسمية.`,
      ],
      use: {
        work: R`الأوامر في التاب ده كتير، ومحدش بيحفظها. اللي بيفرق إنك تعرف توصل للأمر في دقيقة.`,
        prog: R`PowerShell متنظّم: كل أمر [[فعل-اسم]] ([[Get-Volume]]، [[Format-Volume]]). فلو عارف الاسم، الأفعال بتيجي لوحدها.`,
      },
      lab: R`# Windows (PowerShell):
pwsh -NoProfile`,
      projects: [
        { t: R`اكتشف ٣ أوامر جديدة`, what: R`اختار ٣ كلمات ([[Printer]] و [[Wifi]] و [[Bluetooth]]) ولكل واحدة: [[Get-Command -Noun *كلمة*]]، واختار أمر [[Get-]] منهم وشغّله.` },
      ],
      n: R`اتجرّب على ويندوز 11 (PowerShell 7.6) وأوبونتو 24.04 جوه Docker`,
      items: [
        {
          cmd: "لاقي الأمر من كلمة",
          title: "عارف الحاجة، مش عارف الأمر",
          learn: R`تدوّر على الأوامر بالاسم ([[-Noun]]) أو بالموديول، وتلاقي CIM classes، وتطلب الـ help والأمثلة.`,
          out: R`أي حاجة في الجهاز (ديسك، بطارية، شبكة، طابعة) تلاقي أمرها في دقيقة.`,
          use: {
            prog: R`نفس الطريقة لأي موديول PowerShell جديد بتسطّبه: [[Get-Command -Module اسمه]].`,
            work: R`سيرفر من غير نت، أو جهاز حد مش عارف فيه حاجة — الأدوات دي جوه الجهاز نفسه.`,
          },
          desc: R`**في PowerShell كل أمر اسمه [[فعل-اسم]].** فلو عايز حاجة عن الديسك، دوّر بالاسم:

[[Get-Command -Noun *Disk*]] ← [[Get-PhysicalDisk]] و [[Clear-Disk]] و [[Add-PhysicalDisk]] و ...

ولو عايز «هات» بس (مش «غيّر»):

[[Get-Command -Verb Get -Noun *Volume*]] ← [[Get-Volume]] و [[Get-BitLockerVolume]] و [[Get-VolumeCorruptionCount]] و ...

ولو عارف الموديول: [[Get-Command -Module Defender]] ← **١٥ أمر**، منهم [[Start-MpScan]] و [[Get-MpComputerStatus]].

**ولو الحاجة مش ليها أمر جاهز:** CIM. [[Get-CimClass -ClassName *Battery*]] ← [[CIM_Battery]] و **[[Win32_Battery]]** و [[Win32_PortableBattery]].

**وبعد ما تلاقيه:** [[Get-Help Format-Volume -Examples]]. **ومفاجأة على جهاز التجربة:** مطلّعش ولا مثال، وقال:

[[Get-Help cannot find the Help files for this cmdlet on this computer. It is displaying only partial help.]]

لأن ملفات الـ help **مش متنزّلة افتراضيًا** في ويندوز. فيه حلين:

| | |
|---|---|
| [[Update-Help -Scope CurrentUser]] | ينزّل الـ help لكل الموديولات (محتاج نت، ودقايق) |
| [[Get-Help Format-Volume -Online]] | يفتح الصفحة الرسمية في المتصفح على طول |

**وعلى لينكس:** [[compgen -c | grep -i disk]] بيطلّع الأوامر الموجودة اللي اسمها فيه الكلمة ([[blkid]] و [[fsck.ext4]] و [[e2fsck]]...). و [[lsblk --help]] شغّال. بس [[man -k disk]] جوه صورة أوبونتو بتاعة Docker قال:

[[This system has been minimized by removing packages and content that are not required on a system that users do not log into.]]

يعني مفيش صفحات man في الصور المصغّرة. على أوبونتو عادي، [[man -k]] شغّال.`,
          example: R`# Windows (PowerShell):
Get-Command -Noun *Disk*
Get-Command -Verb Get -Noun *Volume*
Get-Command -Module Defender
Get-CimClass -ClassName *Battery*
Get-Help Format-Volume -Examples
Get-Help Format-Volume -Online
# Linux:
compgen -c | grep -i disk
lsblk --help`,
          lines: [
            R`كل أمر اسمه فيه «Disk». و [[*]] = أي حاجة قبل أو بعد.`,
            R`[[Get]] بس — اللي بيقرا من غير ما يغيّر. أأمن بداية.`,
            R`كل أوامر موديول معين. [[Get-Module -ListAvailable]] بيوريك الموديولات.`,
            R`الحاجات اللي مالهاش أمر جاهز: اسم الـ class اللي تسأله بـ [[Get-CimInstance]].`,
            R`أمثلة جاهزة — **لو** الـ help متنزّل. لو لأ، هتشوف help ناقص.`,
            R`الصفحة الرسمية في المتصفح. شغّال دايمًا.`,
            R`لينكس: كل الأوامر المتاحة اللي اسمها فيه الكلمة.`,
            R`الـ help بتاع الأمر نفسه. أغلب أوامر لينكس بتدعم [[--help]].`,
          ],
          try: R`عايز تعرف حاجة عن الطابعات؟ [[Get-Command -Noun *Printer*]]، واختار أمر [[Get-]] وشغّله. وعايز حاجة عن الواي فاي؟ مفيش أمر PowerShell مباشر — جرّب [[netsh wlan show interfaces]] (من تاب CMD).`,
          deep: {
            why: R`الأوامر بالآلاف، والحفظ مش هيوصلك. والطريقة الثابتة في التدوير بتوصلك لأي أمر، حتى اللي عمرك ما سمعت عنه.`,
            how: R`**الأفعال المعتمدة في PowerShell** ([[Get-Verb]]):

| الفعل | معناه | آمن؟ |
|---|---|---|
| [[Get]] | هات | **أيوه** — قراية بس |
| [[Test]] | اختبر | أيوه غالبًا |
| [[Set]] | غيّر | لأ |
| [[New]] / [[Add]] | اعمل / ضيف | لأ |
| [[Remove]] / [[Clear]] | امسح | **لأ — [[-WhatIf]]** |
| [[Start]] / [[Stop]] | شغّل / وقّف | حسب |

فلو بتجرّب أمر جديد، ابدأ بـ [[Get-]]. ولو لازم [[Set-]] أو [[Remove-]]، [[-WhatIf]] الأول.

**ولما الأمر مش موجود:** ممكن يكون في موديول مش متسطّب. [[Find-Module *Disk*]] بيدوّر في PowerShell Gallery (محتاج نت). (من وثائق PowerShellGet — مااتشغّلش هنا.)

**[[Get-Help]] بأشكاله:**

| | |
|---|---|
| [[Get-Help X]] | الملخص |
| [[Get-Help X -Examples]] | أمثلة بس |
| [[Get-Help X -Parameter FileSystem]] | باراميتر واحد |
| [[Get-Help X -Online]] | الصفحة الرسمية |
| [[(Get-Command X).Parameters.Keys]] | أسماء الباراميترز — **من غير help خالص** |

السطر الأخير مفيد لما الـ help مش متنزّل: الباراميترز جوه الأمر نفسه. وكمان الـ [[ValidateSet]] (القيم المسموحة) — زي ما اتعمل مع [[Format-Volume]] في درس الفرمتة وطلّع [[FAT, FAT32, exFAT, NTFS, ReFS]].

**وفي CMD:** [[help]] لوحده بيطلّع قايمة الأوامر، و [[أمر /?]] للتفاصيل (قسم «توصل للأمر بنفسك» في تاب CMD).`,
            when: R`أي وقت عايز تعمل حاجة ومش عارف الأمر — قبل ما تفتح المتصفح.`,
            mistakes: R`تجرّب أمر [[Remove-]] أو [[Clear-]] عشان «تشوف بيعمل إيه». أو تستسلم لما [[Get-Help]] يطلع ناقص (الـ help مش متنزّل، مش الأمر). أو [[man -k]] جوه كونتينر وتفتكر الأمر مش موجود.`
          },
          teach: R`## عارف الحاجة، مش عارف الأمر

**في PowerShell كل أمر اسمه [[فعل-اسم]].** دوّر بالاسم.

---

## ١. بالاسم

~~~powershell
Get-Command -Noun *Disk* | Select-Object -ExpandProperty Name -Unique | Select-Object -First 8
~~~

~~~text اتشغّل فعلًا · PowerShell 7.6
Disable-PhysicalDiskIndication, Enable-PhysicalDiskIndication, Get-DiskSNV, Get-PhysicalDiskSNV,
Add-PhysicalDisk, Add-VirtualDiskToMaskingSet, Add-VMDirectVirtualDisk, Clear-Disk
~~~

### و [[Get]] بس — الآمن

~~~powershell
Get-Command -Verb Get -Noun *Volume*
~~~

~~~text اتشغّل فعلًا
Get-AppPackageDefaultVolume, Get-AppPackageVolume, ..., Get-BitLockerVolume, Get-Volume,
Get-VolumeCorruptionCount, Get-VolumeScrubPolicy, ...
~~~

---

## ٢. بالموديول

~~~powershell
(Get-Command -Module Defender).Count
~~~

~~~text اتشغّل فعلًا
15
~~~

---

## ٣. مفيش أمر؟ CIM

~~~powershell
Get-CimClass -ClassName *Battery*
~~~

~~~text اتشغّل فعلًا
CIM_Battery, Win32_Battery, Win32_PortableBattery, CIM_AssociatedBattery
~~~

---

## ٤. الـ help — ومفاجأة

~~~powershell
Get-Help Format-Volume -Examples
~~~

~~~text اتشغّل فعلًا
NAME
    Format-Volume
ALIASES
    Initialize-Volume
REMARKS
    Get-Help cannot find the Help files for this cmdlet on this computer. It is displaying only partial help.
~~~

**ملفات الـ help مش متنزّلة افتراضيًا.**

| | |
|---|---|
| [[Update-Help -Scope CurrentUser]] | نزّلها (نت + دقايق) |
| [[Get-Help X -Online]] | الصفحة الرسمية على طول |
| [[(Get-Command X).Parameters.Keys]] | الباراميترز من غير help |

---

## ٥. الأفعال: ابدأ بـ [[Get]]

| | | آمن؟ |
|---|---|---|
| [[Get]] / [[Test]] | قراية | أيوه |
| [[Set]] / [[New]] / [[Add]] | تغيير | لأ |
| [[Remove]] / [[Clear]] | مسح | **[[-WhatIf]]** |

---

## ٦. لينكس

~~~bash
compgen -c | grep -i -E "disk|blk|fs" | sort -u | head
~~~

~~~text اتشغّل فعلًا · أوبونتو 24.04 جوه Docker
blkdiscard blkid blkzone debugfs dumpe2fs e2fsck findfs fsck fsck.cramfs fsck.ext2 fsck.ext3 fsck.ext4
~~~

~~~text man -k disk — اتشغّل فعلًا
This system has been minimized by removing packages and content that are
not required on a system that users do not log into.
~~~

> صور Docker المصغّرة مفيهاش man. على أوبونتو عادي شغّال.

---

## الخلاصة

- [[Get-Command -Noun *كلمة*]].
- [[-Verb Get]] = الآمن.
- [[Get-CimClass]] لما مفيش أمر.
- الـ help مش متنزّل؟ [[-Online]] أو [[Update-Help]].
- لينكس: [[compgen -c | grep]] و [[--help]].`,
          sol: R`[[Get-Command]] و [[Get-CimClass]] و [[Get-Help]] (من غير help متنزّل) اتشغّلوا في PowerShell 7.6 على ويندوز 11. و [[compgen]] و [[--help]] و [[man -k]] على أوبونتو 24.04 جوه Docker. [[Find-Module]] و [[Update-Help]] و [[-Online]] من الوثائق — مااتشغّلوش (التاني بينزّل ملفات، والتالت بيفتح المتصفح).`,
          solCode: R`Get-Command -Noun *Disk*                 # Get-PhysicalDisk, Clear-Disk, Add-PhysicalDisk ...
(Get-Command -Module Defender).Count     # 15
Get-CimClass -ClassName *Battery*        # CIM_Battery, Win32_Battery, Win32_PortableBattery, CIM_AssociatedBattery
Get-Help Format-Volume -Examples         # ... It is displaying only partial help.
# لينكس:  compgen -c | grep -i disk  ->  blkid fsck.ext4 e2fsck ...`
        }
      ]
    },

    {
      t: "اعرف جهازك",
      l: 1,
      time: R`حوالي ساعة`,
      goal: [
        R`تعرف معلومات جهازك (النظام، والرام، والمعالج، وبقاله قد إيه شغّال) في ثانية.`,
        R`تعرف المساحة الفاضية وصحة كل ديسك.`,
        R`تعرف البطارية فاضل منها كام في المية من سعتها الأصلية.`,
        R`تعرف مين واكل الرام والمعالج فعلًا، ومين بيفتح مع الجهاز.`,
      ],
      use: {
        work: R`«الجهاز تقيل» — في دقيقة تعرف هو الرام ولا الديسك ولا برنامج معين، بدل ما تخمّن.`,
        prog: R`الأوامر دي بترجّع objects في PowerShell. فتقدر تحطها في سكربت يطلّع تقرير — ده المشروع في آخر التاب.`,
        cs: R`CIM/WMI هي الطريقة اللي ويندوز بيوري بيها كل حاجة عن الجهاز. وكل أداة إدارة بتسأله.`,
      },
      lab: R`# Windows (PowerShell):
pwsh -NoProfile
# Linux:
docker run -it --rm ubuntu:24.04 bash`,
      projects: [
        { t: R`كارت الجهاز`, what: R`سكربت بيطبع في ٥ سطور: النظام، والرام الفاضية، وأقل ديسك فيه مساحة، والبطارية، وبقاله قد إيه شغّال. وقيس وقته بـ [[Measure-Command]] — لو أكتر من ثانية، شيل [[Get-ComputerInfo]].` },
        { t: R`مين واكل الرام`, what: R`أمر واحد بيطلّع أكتر ٥ برامج واكلة رام **متجمّعة بالاسم**. وقارن بالـ ٥ عمليات الأكبر من غير تجميع — وشوف الفرق مع المتصفح.` },
      ],
      n: R`الأرقام هنا من جهاز التجربة (ويندوز 11)، والأسماء الشخصية اتشالت`,
      items: [
        {
          cmd: "معلومات الجهاز في ثانية",
          title: "النظام والرام والمعالج، والأمر السريع مقابل البطيء",
          learn: R`تجيب معلومات الجهاز بـ [[Get-CimInstance]] و [[Get-ComputerInfo]]، وتعرف الفرق.`,
          out: R`سطر واحد بيقولك كل حاجة أساسية عن أي جهاز.`,
          use: {
            work: R`حد بيقولك «جهازي فيه مشكلة» — أول حاجة: إيه النظام، والرام، وبقاله قد إيه من غير restart.`,
            prog: R`نفس الأوامر بتشتغل على أجهزة تانية عن بعد ([[-ComputerName]] / [[-CimSession]]).`,
          },
          desc: R`أسهل أمر: [[Get-ComputerInfo]]. بيجيب كل حاجة — **بس أخد ٢.٣ ثانية** على جهاز التجربة، لأنه بيجمع مئات الخصائص.

والأسرع: تسأل CIM عن الحاجة اللي محتاجها بس:

[[Get-CimInstance Win32_OperatingSystem]]

← [[Microsoft Windows 11 Home | free RAM 8.4 GB of 31.4 GB | up since 10/28/2026 2:33:37 AM]]

**[[LastBootUpTime]] مهم أكتر مما تتخيل:** «إعادة تشغيل» بتحل مشاكل كتير، وناس كتير بتفتكر إنها عملت restart وهي عملت shutdown — وده في ويندوز ١٠ و ١١ مش بيعمل restart حقيقي لو Fast Startup شغّال. فـ [[LastBootUpTime]] بيقولك الحقيقة.

**وعلى لينكس** (جوه Docker على نفس الجهاز):

[[Ubuntu 24.04.5 LTS]] و [[CPU(s): 16]] و [[Mem: 15Gi]]

**ولاحظ:** الجهاز فيه ٣١ جيجا رام، و Docker شايف **١٥ جيجا** بس. لأن الكونتينر شايف الجهاز الوهمي بتاع Docker، مش جهازك. نفس الأوامر، إجابة مختلفة حسب انت فين.`,
          example: R`# Windows (PowerShell):
Get-ComputerInfo -Property OsName, OsVersion, CsNumberOfLogicalProcessors, CsTotalPhysicalMemory
$os = Get-CimInstance Win32_OperatingSystem
"{0} | free RAM {1:N1} GB of {2:N1} GB | up since {3}" -f $os.Caption, ($os.FreePhysicalMemory/1MB), ($os.TotalVisibleMemorySize/1MB), $os.LastBootUpTime
# Windows (CMD):
systeminfo | findstr /c:"OS Name" /c:"Total Physical Memory" /c:"System Boot Time"
# Linux:
grep PRETTY /etc/os-release; lscpu | grep -E "^CPU\(s\)|Model name"; free -h
# Mac:
sw_vers; system_profiler SPHardwareDataType | grep -E "Chip|Memory"`,
          lines: [
            R`كل حاجة، بس **بطيء** (٢.٣ ثانية). و [[-Property]] بيقلل اللي بيتعرض بس، مش اللي بيتجمع.`,
            R`السريع: سؤال واحد لـ CIM.`,
            R`[[-f]] بيحط القيم في النص. [[FreePhysicalMemory]] بالكيلوبايت، فـ [[/1MB]] بيحوّله جيجا.`,
            R`CMD: [[systeminfo]] بيطلّع صفحة كاملة، و [[findstr /c:]] بيختار سطور معينة (درس «findstr مش regex كامل» في تاب CMD).`,
            R`لينكس: النسخة، والمعالج، والرام.`,
            R`الماك: النسخة، والمعالج، والرام. (من وثائق Apple — مااتجرّبش هنا.)`,
          ],
          try: R`قيس الفرق بنفسك: [[Measure-Command { Get-ComputerInfo } | Select-Object TotalSeconds]] مقابل [[Measure-Command { Get-CimInstance Win32_OperatingSystem } | Select-Object TotalSeconds]]. واعرف بقالك قد إيه من غير restart: [[(Get-Date) - (Get-CimInstance Win32_OperatingSystem).LastBootUpTime]].`,
          deep: {
            why: R`تشخيص أي مشكلة بيبدأ بالأرقام دي. ومن غيرها، «الجهاز تقيل» ممكن يبقى أي حاجة.`,
            how: R`**CIM classes مفيدة:**

| الـ class | فيه |
|---|---|
| [[Win32_OperatingSystem]] | النظام، والرام، وآخر boot |
| [[Win32_Processor]] | المعالج وعدد الأنوية |
| [[Win32_ComputerSystem]] | الشركة والموديل والرام الكلية |
| [[Win32_BIOS]] | نسخة الـ BIOS والسيريال |
| [[Win32_Battery]] | البطارية (لو موجودة) |
| [[Win32_StartupCommand]] | البرامج اللي بتفتح مع الجهاز |

ولما متعرفش اسم الـ class: [[Get-CimClass -ClassName *Battery*]].

**Fast Startup:** في ويندوز ١٠ و ١١، «Shut down» مع Fast Startup بيحفظ الكيرنل في ملف ويرجّعه — فمش restart كامل. و «Restart» دايمًا كامل. وعشان كده [[LastBootUpTime]] ممكن يقول «من أسبوع» مع إنك بتقفل كل يوم. (سلوك Fast Startup من وثائق Microsoft.)

**[[Get-ComputerInfo]] و [[-Property]]:** الأمر بيجمع كل حاجة الأول، وبعدين [[-Property]] بتختار للعرض. فالوقت هو هو. لو محتاج سرعة، CIM مباشرة.

**وعلى لينكس:** [[hostnamectl]] بيجمع حاجات كتير في أمر واحد، بس محتاج systemd — ومش موجود جوه كونتينر. و [[uname -a]] و [[/etc/os-release]] و [[lscpu]] و [[free -h]] شغالين في أي حتة.`,
            when: R`أول أمر في أي «الجهاز فيه مشكلة»، وأي سكربت بيجمع معلومات عن أجهزة كتير.`,
            mistakes: R`[[Get-ComputerInfo]] في سكربت بيتكرر كتير. أو تصدّق إنك عملت restart من غير ما تبص على [[LastBootUpTime]]. أو تقيس جوه كونتينر وتفتكره جهازك.`
          },
          teach: R`## الأمر السهل، والأمر السريع

~~~powershell
Measure-Command { Get-ComputerInfo | Out-Null }
~~~

~~~text اتشغّل فعلًا
TotalSeconds : 2.33
~~~

**٢.٣ ثانية**، لأنه بيجمع مئات الخصائص.

~~~powershell السريع: CIM مباشرة
$os = Get-CimInstance Win32_OperatingSystem
"{0} | free RAM {1:N1} GB of {2:N1} GB | up since {3}" -f $os.Caption, ($os.FreePhysicalMemory/1MB), ($os.TotalVisibleMemorySize/1MB), $os.LastBootUpTime
~~~

~~~text اتشغّل فعلًا
Microsoft Windows 11 Home Single Language | free RAM 8.4 GB of 31.4 GB | up since 10/28/2026 2:33:37 AM
~~~

---

## ١. [[LastBootUpTime]] بيقول الحقيقة

ناس كتير بتفتكر إنها عملت restart. و «Shut down» مع Fast Startup **مش** restart كامل.

~~~powershell بقالك قد إيه
(Get-Date) - (Get-CimInstance Win32_OperatingSystem).LastBootUpTime
~~~

---

## ٢. لينكس

~~~bash
grep PRETTY /etc/os-release; lscpu | grep -E "^CPU\(s\)|Model name"; free -h
~~~

~~~text اتشغّل فعلًا · أوبونتو جوه Docker على نفس الجهاز
PRETTY_NAME="Ubuntu 24.04.5 LTS"
CPU(s):        16
Mem:           15Gi       1.0Gi        13Gi
~~~

> **الجهاز فيه ٣١ جيجا، والكونتينر شايف ١٥.** لأنه شايف الجهاز الوهمي بتاع Docker، مش جهازك.

---

## ٣. CIM classes

| | |
|---|---|
| [[Win32_OperatingSystem]] | النظام والرام وآخر boot |
| [[Win32_Processor]] | المعالج |
| [[Win32_ComputerSystem]] | الموديل |
| [[Win32_Battery]] | البطارية |
| [[Win32_StartupCommand]] | اللي بيفتح مع الجهاز |

متعرفش الاسم؟ [[Get-CimClass -ClassName *Battery*]].

---

## الخلاصة

- [[Get-ComputerInfo]] سهل وبطيء.
- [[Get-CimInstance]] سريع ومحدد.
- [[LastBootUpTime]] قبل ما تقول «عملت restart».
- الكونتينر شايف جهاز Docker، مش جهازك.`,
          sol: R`[[Get-ComputerInfo]] و CIM اتجرّبوا في PowerShell 7.6 على ويندوز 11، و [[systeminfo]] في CMD، وأوامر لينكس على أوبونتو 24.04 جوه Docker. أوامر الماك وسلوك Fast Startup من الوثائق.`,
          solCode: R`Measure-Command { Get-ComputerInfo | Out-Null }    # TotalSeconds : 2.33
# CIM:  Microsoft Windows 11 Home Single Language | free RAM 8.4 GB of 31.4 GB | up since ...
# لينكس جوه Docker:  Ubuntu 24.04.5 LTS | CPU(s): 16 | Mem: 15Gi   (الجهاز نفسه 31 جيجا)`
        },

        {
          cmd: "الديسك: مساحة وصحة",
          title: "فاضي كام، والديسك نفسه سليم ولا لأ",
          learn: R`تعرف المساحة الفاضية في كل partition، وصحة كل ديسك، وإيه اللي محتاج Admin.`,
          out: R`تعرف قبل ما الديسك يتملى أو يقع.`,
          use: {
            work: R`أغرب مشاكل الجهاز (تحديثات بتفشل، برامج بتقع، بطء) سببها ديسك فاضل فيه أقل من ١٠٪.`,
            prog: R`[[npm install]] و Docker والـ builds بياكلوا مساحة بسرعة. وفولدر [[node_modules]] واحد ممكن يبقى جيجا.`,
          },
          desc: R`سؤالين مختلفين:

**١. فاضل كام؟** — [[Get-Volume]] (لكل حرف: [[C:]] و [[D:]]...)

**٢. الديسك نفسه سليم؟** — [[Get-PhysicalDisk]] (لكل ديسك حقيقي)

**على جهاز التجربة:**

| الحرف | فاضي | من |
|---|---|---|
| C | 36.8 جيجا | 301 |
| D | 55.4 | 629 |
| E | 46.8 | 954 |

و [[Get-PhysicalDisk]]:

| الديسك | النوع | الحالة |
|---|---|---|
| SSD-1 | SSD، NVMe | [[Healthy]] |
| SSD-2 | SSD، NVMe | [[Healthy]] |

**والأعمق: الحرارة والتآكل وعدد الأخطاء** — [[Get-StorageReliabilityCounter]]. **ده محتاج Admin**:

[[Access to a CIM resource was not available to the client.]]

ودي مش رسالة واضحة — بس معناها «شغّلني كـ Admin».

**ولاحظ الحرف مقابل الديسك:** الـ D: والـ E: ممكن يكونوا على نفس الديسك أو على ديسكين. [[Get-Volume]] بيتكلم عن الحروف، و [[Get-PhysicalDisk]] عن الأجهزة. والربط بينهم [[Get-Partition]].`,
          example: R`# Windows (PowerShell):
Get-Volume | Where-Object DriveLetter | Select-Object DriveLetter, FileSystemType, HealthStatus, @{n='FreeGB';e={[math]::Round($_.SizeRemaining/1GB,1)}}, @{n='SizeGB';e={[math]::Round($_.Size/1GB,1)}}
Get-PhysicalDisk | Select-Object FriendlyName, MediaType, BusType, HealthStatus
Get-PhysicalDisk | Get-StorageReliabilityCounter | Select-Object Temperature, Wear, ReadErrorsTotal
# Linux:
df -h /
lsblk -o NAME,SIZE,TYPE,MOUNTPOINTS`,
          lines: [
            R`كل حرف: نظام الملفات، والحالة، والفاضي، والحجم. و [[@{n=..;e={..}}]] عمود محسوب.`,
            R`كل ديسك حقيقي: SSD ولا HDD، و NVMe ولا SATA ولا USB، و [[Healthy]] ولا لأ.`,
            R`الحرارة والتآكل والأخطاء — **محتاج PowerShell كـ Admin**.`,
            R`لينكس: المساحة على [[/]]. و [[-h]] = أرقام مفهومة (جيجا مش بايتات).`,
            R`كل الديسكات والـ partitions وفين متركّبة.`,
          ],
          try: R`شغّل [[Get-Volume]] واعرف كل حرف فاضي فيه كام في المية. ولو عندك PowerShell كـ Admin، جرّب [[Get-StorageReliabilityCounter]] وشوف الـ [[Wear]] (للـ SSD: كام في المية من عمره اتاكل).`,
          deep: {
            why: R`الديسك المليان بيكسر حاجات بشكل مش واضح، والديسك اللي بيقع بيضيّع كل حاجة. والاتنين ليهم علامات قبلها بفترة.`,
            how: R`**المساحة:** ويندوز محتاج مساحة فاضية للتحديثات والـ pagefile والملفات المؤقتة. وتحت ١٠٪ المشاكل بتبدأ. والمشروع في آخر التاب بيحذّر لما حرف ينزل تحت ١٠٪.

**الصحة:**

| [[HealthStatus]] | |
|---|---|
| [[Healthy]] | تمام |
| [[Warning]] | **اعمل نسخة احتياطية النهارده** |
| [[Unhealthy]] | الديسك بيقع |

**[[Get-StorageReliabilityCounter]] (Admin):**

| | |
|---|---|
| [[Temperature]] | الحرارة. الـ NVMe ممكن يوصل ٧٠ تحت الضغط |
| [[Wear]] | للـ SSD: كام في المية اتاكل من عمره المتوقع |
| [[ReadErrorsTotal]] | أخطاء القراية — لو بتزيد، خطر |
| [[PowerOnHours]] | اشتغل كام ساعة |

**وعلى لينكس:** [[smartctl -a /dev/sda]] (من حزمة [[smartmontools]]) بيقرا نفس البيانات (SMART) — ومحتاج [[sudo]]. وجوه كونتينر مش هيشوف الديسك الحقيقي. (من وثائق smartmontools.)

**والمساحة راحت فين؟** الدرس «نضّف من غير ما تمسح غلط» في القسم الجاي.`,
            when: R`مرة في الشهر، وأي وقت الجهاز يبقى غريب، وقبل أي تحديث كبير.`,
            mistakes: R`تبص على الحروف وتفتكرهم ديسكات. أو تتجاهل [[Warning]]. أو تفتكر رسالة «Access to a CIM resource» مشكلة في الديسك (هي صلاحيات).`
          },
          teach: R`## سؤالين مختلفين

| | الأمر |
|---|---|
| فاضل كام؟ | [[Get-Volume]] — لكل حرف |
| الديسك سليم؟ | [[Get-PhysicalDisk]] — لكل جهاز |

---

## ١. المساحة

~~~powershell
Get-Volume | Where-Object DriveLetter |
  Select-Object DriveLetter, FileSystemType, HealthStatus,
    @{n='FreeGB';e={[math]::Round($_.SizeRemaining/1GB,1)}},
    @{n='SizeGB';e={[math]::Round($_.Size/1GB,1)}}
~~~

~~~text اتشغّل فعلًا
DriveLetter FileSystemType HealthStatus FreeGB SizeGB
----------- -------------- ------------ ------ ------
          D NTFS           Healthy       55.40 629.20
          E NTFS           Healthy       46.80 953.60
          C NTFS           Healthy       36.80 301.30
~~~

> **E: فيه ٥٪ بس فاضي.** تحت ١٠٪ المشاكل بتبدأ.

---

## ٢. الصحة

~~~powershell
Get-PhysicalDisk | Select-Object FriendlyName, MediaType, BusType, HealthStatus
~~~

~~~text اتشغّل فعلًا (الأسماء اتغيّرت)
FriendlyName MediaType BusType HealthStatus
------------ --------- ------- ------------
SSD-1        SSD       NVMe    Healthy
SSD-2        SSD       NVMe    Healthy
~~~

| | |
|---|---|
| [[Healthy]] | تمام |
| [[Warning]] | **نسخة احتياطية النهارده** |
| [[Unhealthy]] | بيقع |

---

## ٣. الأعمق — محتاج Admin

~~~powershell
Get-PhysicalDisk | Get-StorageReliabilityCounter | Select-Object Temperature, Wear, ReadErrorsTotal
~~~

~~~text اتشغّل فعلًا — من غير Admin
Access to a CIM resource was not available to the client.
~~~

**معناها: شغّلني كـ Admin.** مش مشكلة في الديسك.

---

## ٤. لينكس

~~~bash
df -h /
lsblk -o NAME,SIZE,TYPE,MOUNTPOINTS
~~~

و [[sudo smartctl -a /dev/sda]] للصحة (من وثائق smartmontools).

---

## الخلاصة

- [[Get-Volume]] = الحروف. [[Get-PhysicalDisk]] = الأجهزة.
- تحت ١٠٪ فاضي = مشاكل.
- [[Warning]] = نسخة احتياطية فورًا.
- التفاصيل محتاجة Admin.`,
          sol: R`[[Get-Volume]] و [[Get-PhysicalDisk]] والرسالة من غير Admin اتشغّلوا في PowerShell 7.6 (أسماء الديسكات اتغيّرت). [[smartctl]] من الوثائق.`,
          solCode: R`Get-Volume | Where-Object DriveLetter        # C 36.8/301  D 55.4/629  E 46.8/954 جيجا فاضي
Get-PhysicalDisk                              # SSD-1, SSD-2: SSD NVMe Healthy
Get-PhysicalDisk | Get-StorageReliabilityCounter
#   Access to a CIM resource was not available to the client.     <-- محتاج Admin`
        },

        {
          cmd: "البطارية فاضل منها كام",
          title: "السعة الأصلية مقابل السعة دلوقتي",
          learn: R`تطلّع تقرير البطارية وتحسب فاضل منها كام في المية.`,
          out: R`رقم واحد بيقولك البطارية محتاجة تتغيّر ولا لأ.`,
          use: {
            work: R`«اللابتوب بيفصل بسرعة» — الرقم ده بيفرّق بين بطارية قديمة وبرنامج واكل الطاقة.`,
          },
          desc: R`[[powercfg /batteryreport]] بيعمل صفحة HTML فيها كل تاريخ البطارية. وأهم سطرين فيها:

| | جهاز التجربة |
|---|---|
| **DESIGN CAPACITY** (السعة من المصنع) | **90,005 mWh** |
| **FULL CHARGE CAPACITY** (أقصى شحن دلوقتي) | **50,640 mWh** |

**50,640 ÷ 90,005 = ٥٦٪.** البطارية فاضل فيها حوالي نص سعتها الأصلية — فبتخلص في حوالي نص الوقت.

ده طبيعي لبطارية عدّى عليها سنين واستخدام كتير. والشركات غالبًا بتعتبر البطارية «محتاجة تتغيّر» تحت ٨٠٪ أو ٦٠٪ حسب السياسة (الأرقام دي بتختلف من شركة لشركة).

**والأمر مبيغيّرش حاجة:** بيكتب ملف HTML بس، ومش محتاج Admin.

**ولو مفيش بطارية** (جهاز مكتبي)، [[Get-CimInstance Win32_Battery]] بترجّع ولا حاجة — والسكربت لازم يتعامل مع ده (زي المشروع في آخر التاب).`,
          example: R`# Windows (PowerShell):
powercfg /batteryreport /output "$env:TEMP\battery.html"
start "$env:TEMP\battery.html"
# Windows (CMD):
powercfg /batteryreport /output "%TEMP%\battery.html"
# Linux:
upower -i $(upower -e | grep -m1 BAT) | grep -E "energy-full|capacity"
# Mac:
system_profiler SPPowerDataType | grep -E "Cycle Count|Condition|Maximum Capacity"`,
          lines: [
            R`بيكتب التقرير في TEMP. ومش محتاج Admin.`,
            R`[[start]] بيفتحه في المتصفح. دوّر على «Installed batteries».`,
            R`نفس الأمر من CMD — [[%TEMP%]] بدل [[$env:TEMP]].`,
            R`لينكس: [[upower]] بيطلّع [[energy-full-design]] و [[energy-full]] و [[capacity]]. (من وثائق upower — مااتجرّبش هنا.)`,
            R`الماك: عدد دورات الشحن والحالة. (من وثائق Apple — مااتجرّبش هنا.)`,
          ],
          try: R`طلّع التقرير وافتحه، ودوّر على جدول «Battery capacity history» — هيوريك السعة نزلت إزاي على مدار الشهور. وبعدين احسب النسبة بنفسك.`,
          deep: {
            why: R`البطارية بتتآكل مع كل دورة شحن ومع الحرارة. ومفيش طريقة تعرف ده من الأيقونة اللي تحت — بتقولك ١٠٠٪ حتى لو الـ ١٠٠٪ دي نص السعة الأصلية.`,
            how: R`**تقرأ الرقم ده إزاي في سكربت:** التقرير HTML، فبتطلّع الرقمين بـ regex:

~~~powershell
$h = Get-Content "$env:TEMP\battery.html" -Raw
[regex]::Matches($h, '(DESIGN CAPACITY|FULL CHARGE CAPACITY)</span></td><td>([\d,]+) mWh') |
  ForEach-Object { $_.Groups[1].Value + " = " + $_.Groups[2].Value }
~~~

~~~text اتشغّل فعلًا
DESIGN CAPACITY = 90,005
FULL CHARGE CAPACITY = 50,640
~~~

(شكل الـ HTML ده ممكن يتغيّر مع تحديثات ويندوز، فالسكربت لازم يتعامل مع إنه ميلاقيش حاجة.)

**وإيه اللي بيطوّل عمر البطارية؟** الحرارة العالية، والشحن لـ ١٠٠٪ والفضل عليه طول الوقت، والتفريغ لصفر — كلهم بيسرّعوا التآكل. وأجهزة كتير فيها إعداد «اشحن لحد ٨٠٪ بس» في برنامج الشركة. (معلومات عامة عن بطاريات الليثيوم.)

**[[powercfg]] فيه تقارير تانية:**

| | |
|---|---|
| [[powercfg /energy]] | مشاكل الطاقة (محتاج Admin) |
| [[powercfg /sleepstudy]] | الجهاز صحي وهو نايم ولا لأ |
| [[powercfg /a]] | أنواع النوم المتاحة |

(الأوامر دي من وثائق [[powercfg]]، و [[/batteryreport]] بس اللي اتجرّب.)`,
            when: R`اللابتوب بيفصل أسرع من الأول، أو قبل ما تشتري لابتوب مستعمل.`,
            mistakes: R`تصدّق أيقونة الـ ١٠٠٪. أو تفتح التقرير على جهاز مكتبي وتستغرب إنه فاضي.`
          },
          teach: R`## التقرير

~~~powershell
powercfg /batteryreport /output "$env:TEMP\battery.html"
~~~

~~~text اتشغّل فعلًا
Battery life report saved to file path C:\Users\you\AppData\Local\Temp\battery.html.
~~~

مبيغيّرش حاجة، ومش محتاج Admin.

---

## ١. أهم سطرين

~~~text اتشغّل فعلًا — من جوه التقرير
DESIGN CAPACITY = 90,005 mWh
FULL CHARGE CAPACITY = 50,640 mWh
~~~

~~~text
50,640 ÷ 90,005 = ٥٦٪
~~~

**البطارية بتخلص في حوالي نص الوقت اللي كانت بتقعده وهي جديدة.** والأيقونة بتقول ١٠٠٪ برضه.

---

## ٢. في سكربت

~~~powershell
$h = Get-Content "$env:TEMP\battery.html" -Raw
[regex]::Matches($h, '(DESIGN CAPACITY|FULL CHARGE CAPACITY)</span></td><td>([\d,]+) mWh') |
  ForEach-Object { $_.Groups[1].Value + " = " + $_.Groups[2].Value }
~~~

> شكل الـ HTML ممكن يتغيّر مع التحديثات. السكربت يتعامل مع إنه ميلاقيش.

---

## ٣. ومفيش بطارية؟

~~~powershell
Get-CimInstance Win32_Battery     # جهاز مكتبي: ولا حاجة
~~~

---

## ٤. لينكس والماك

~~~bash
# Linux:
upower -i $(upower -e | grep -m1 BAT) | grep -E "energy-full|capacity"
# Mac:
system_profiler SPPowerDataType | grep -E "Cycle Count|Condition|Maximum Capacity"
~~~

(من الوثائق — مااتجرّبوش هنا.)

---

## الخلاصة

- [[powercfg /batteryreport]] — ملف HTML، من غير Admin.
- السعة دلوقتي ÷ السعة الأصلية = صحة البطارية.
- الأيقونة مش بتقول الحقيقة دي.`,
          sol: R`التقرير والرقمين اتطلّعوا على جهاز التجربة (ويندوز 11). أوامر لينكس والماك، وأوامر [[powercfg]] التانية، من الوثائق.`,
          solCode: R`powercfg /batteryreport /output "$env:TEMP\battery.html"
# DESIGN CAPACITY = 90,005 mWh
# FULL CHARGE CAPACITY = 50,640 mWh
# 50,640 / 90,005 = 56%`
        },

        {
          cmd: "مين واكل الجهاز",
          title: "أكبر عملية ٧٣٧ ميجا… والبرنامج كله ١٠ جيجا",
          learn: R`تعرف البرامج الأكتر استهلاكًا للرام والمعالج — متجمّعة بالاسم — والبرامج اللي بتفتح مع الجهاز.`,
          out: R`تعرف السبب الحقيقي لتقل الجهاز في دقيقة.`,
          use: {
            work: R`«الجهاز تقيل» — ٩٠٪ من المرات برنامج واحد. والسؤال إنه إيه.`,
            cs: R`البرامج الحديثة (المتصفحات، VS Code، Discord) بتقسّم نفسها لعمليات كتير. فلو بصيت على العمليات واحدة واحدة، هتلاقي كل واحدة صغيرة — والمجموع ضخم.`,
          },
          desc: R`**أكبر ٣ عمليات رام** على جهاز التجربة:

| العملية | الرام |
|---|---|
| [[vmmemWSL]] | 2,627 ميجا |
| [[Memory Compression]] | 1,155 |
| [[chrome]] | **737** |

Chrome تالت بـ ٧٣٧ ميجا. مش كتير، صح؟

**بس جمّعهم بالاسم:**

| البرنامج | عدد العمليات | الرام |
|---|---|---|
| **chrome** | **59** | **10,569 ميجا** |
| Code | 19 | 2,760 |
| vmmemWSL | 1 | 2,716 |

**Chrome = ٥٩ عملية = ١٠.٥ جيجا.** كل تاب وكل إضافة عملية لوحدها. فـ [[Get-Process | Sort-Object]] لوحده بيخبّي الحقيقة.

**و [[vmmemWSL]]** ده الجهاز الوهمي بتاع WSL و Docker. لو مش مستخدمهم، [[wsl --shutdown]] بيرجّع الرام دي.

**والبرامج اللي بتفتح مع الجهاز:** [[Get-CimInstance Win32_StartupCommand]] طلّع **١١ برنامج** على جهاز التجربة — منهم Docker Desktop، وبرامج تانية كتير ممكن متكونش محتاجها تفتح مع كل boot.`,
          example: R`# Windows (PowerShell):
Get-Process | Sort-Object WorkingSet64 -Descending | Select-Object -First 3 Name, @{n='RAM(MB)';e={[math]::Round($_.WorkingSet64/1MB)}}
Get-Process | Group-Object Name | ForEach-Object { [pscustomobject]@{ Name=$_.Name; Count=$_.Count; 'RAM(MB)'=[math]::Round(($_.Group | Measure-Object WorkingSet64 -Sum).Sum/1MB) } } | Sort-Object 'RAM(MB)' -Descending | Select-Object -First 3
Get-CimInstance Win32_StartupCommand | Select-Object Name, Location
# Linux:
ps -eo pid,comm,%mem,%cpu --sort=-%mem | head -5`,
          lines: [
            R`أكبر ٣ **عمليات** — كل واحدة لوحدها.`,
            R`**متجمّعة بالاسم**: [[Group-Object Name]]، وبعدين مجموع الرام لكل مجموعة. ده الرقم الحقيقي.`,
            R`البرامج اللي بتفتح مع الجهاز، ومنين بتتفتح (فولدر Startup ولا الـ registry).`,
            R`لينكس: أكتر ٥ عمليات رام، ومعاهم المعالج.`,
          ],
          try: R`شغّل الأمر الأول والتاني ورا بعض وقارن. وبعدين اقفل نص تابات المتصفح وشغّل التاني تاني. ولو عندك WSL أو Docker مش محتاجهم دلوقتي: [[wsl --shutdown]] وشوف [[vmmemWSL]] اختفى.`,
          deep: {
            why: R`Task Manager بيجمّع لوحده، بس من الترمنال تقدر تحطه في سكربت، أو تراقبه، أو تعمله على جهاز تاني.`,
            how: R`**WorkingSet مقابل غيره:** [[WorkingSet64]] = الرام اللي العملية ماسكاها دلوقتي (ومنها حاجات مشتركة مع عمليات تانية). فمجموع كل العمليات ممكن يطلع أكبر من الرام الفعلية شوية. للمقارنة بين البرامج كفاية. ولو عايز أدق: [[PrivateMemorySize64]].

**المعالج:** [[CPU]] في [[Get-Process]] = **ثواني** استخدمتها العملية من ساعة ما فتحت — مش النسبة دلوقتي. عشان كده عملية مفتوحة من يومين ممكن تبان «تقيلة» وهي هادية. للاستهلاك اللحظي:

~~~powershell
Get-Counter '\Process(*)\% Processor Time' -SampleInterval 1 -MaxSamples 1 |
  Select-Object -ExpandProperty CounterSamples | Sort-Object CookedValue -Descending | Select-Object -First 5 InstanceName, CookedValue
~~~

(ده من وثائق [[Get-Counter]] — أسماء العدّادات بالإنجليزي بس على ويندوز إنجليزي.)

**البرامج اللي بتفتح مع الجهاز:** [[Win32_StartupCommand]] بيقرا فولدر Startup ومفاتيح [[Run]] في الـ registry. **مبيشوفش** المهام المجدولة ([[Get-ScheduledTask]]) ولا الخدمات ([[Get-Service | Where StartType -eq Automatic]]). وللقفل: Task Manager ← Startup apps، أو إعدادات البرنامج نفسه — أأمن من إنك تمسح من الـ registry.

**[[vmmemWSL]]:** WSL بياخد رام ومبيرجّعهاش بسرعة. [[wsl --shutdown]] بيقفل كل توزيعات WSL (ومعاهم Docker Desktop لو شغّال عليه). وفيه إعداد [[memory=]] في [[.wslconfig]] بيحدد أقصى رام. (من وثائق WSL.)`,
            when: R`الجهاز تقيل، أو المروحة شغالة على الآخر، أو قبل ما تقرر تزوّد رام.`,
            mistakes: R`تبص على العمليات من غير تجميع. أو تقرا [[CPU]] كنسبة. أو تمسح من الـ registry بدل إعدادات البرنامج. أو [[wsl --shutdown]] وانت ناسي إن Docker شغّال عليه.`
          },
          teach: R`## أكبر ٣ عمليات

~~~powershell
Get-Process | Sort-Object WorkingSet64 -Descending | Select-Object -First 3 Name,
  @{n='RAM(MB)';e={[math]::Round($_.WorkingSet64/1MB)}}
~~~

~~~text اتشغّل فعلًا
Name               RAM(MB)
----               -------
vmmemWSL              2627
Memory Compression    1155
chrome                 737
~~~

Chrome ٧٣٧ ميجا. مش كتير؟

---

## ١. جمّعهم بالاسم

~~~powershell
Get-Process | Group-Object Name | ForEach-Object {
  [pscustomobject]@{ Name=$_.Name; Count=$_.Count;
    'RAM(MB)'=[math]::Round(($_.Group | Measure-Object WorkingSet64 -Sum).Sum/1MB) }
} | Sort-Object 'RAM(MB)' -Descending | Select-Object -First 3
~~~

~~~text اتشغّل فعلًا
Name     Count  RAM(MB)
----     -----  -------
chrome      59    10569
Code        19     2760
vmmemWSL     1     2716
~~~

**Chrome = ٥٩ عملية = ١٠.٥ جيجا.** كل تاب وكل إضافة عملية.

---

## ٢. [[vmmemWSL]]

الجهاز الوهمي بتاع WSL و Docker.

~~~powershell
wsl --shutdown        # بيرجّع الرام — ويقفل Docker Desktop لو شغّال عليه
~~~

---

## ٣. اللي بيفتح مع الجهاز

~~~powershell
Get-CimInstance Win32_StartupCommand | Select-Object Name, Location
~~~

~~~text اتشغّل فعلًا
١١ برنامج — من فولدر Startup ومن مفاتيح Run في الـ registry
~~~

> **مبيشوفش** المهام المجدولة ولا الخدمات. وللقفل: Task Manager ← Startup apps، مش الـ registry.

---

## ٤. [[CPU]] مش نسبة

[[CPU]] في [[Get-Process]] = **ثواني** من ساعة ما العملية فتحت. فالمفتوح من يومين يبان تقيل وهو هادي.

---

## الخلاصة

- العمليات لوحدها بتخبّي البرامج الكبيرة.
- [[Group-Object Name]] = الرقم الحقيقي.
- [[vmmemWSL]] = WSL و Docker.
- [[CPU]] ثواني، مش في المية.`,
          sol: R`العمليات والتجميع والبرامج اللي بتفتح مع الجهاز اتشغّلوا في PowerShell 7.6 على جهاز التجربة. [[Get-Counter]] و [[.wslconfig]] من الوثائق، وأمر لينكس على أوبونتو جوه Docker.`,
          solCode: R`# أكبر 3 عمليات:  vmmemWSL 2627 | Memory Compression 1155 | chrome 737
# متجمّعين:       chrome 59 عملية 10569 ميجا | Code 19 عملية 2760 | vmmemWSL 2716
# Win32_StartupCommand: 11 برنامج`
        }
      ]
    },

    {
      t: "افحص وصلّح",
      l: 2,
      time: R`حوالي ساعة`,
      goal: [
        R`تعمل فحص فيروسات من الترمنال، لفولدر أو للجهاز كله، وتعرف آخر مرة اتعمل.`,
        R`تعرف إمتى تشغّل [[sfc]] و [[DISM]] و [[chkdsk]]، وليه محتاجين Admin.`,
        R`تلاقي المساحة راحت فين، وتنضّف من غير ما تمسح حاجة مهمة.`,
      ],
      use: {
        work: R`جهاز حد في البيت أو الشغل بقى غريب — الخطوات دي بالترتيب بتلاقي السبب أو بتصلّحه.`,
        prog: R`فولدرات زي [[node_modules]] و [[.venv]] و كاش Docker بتاكل عشرات الجيجات من غير ما تحس.`,
      },
      lab: R`# Windows (PowerShell):
pwsh -NoProfile`,
      projects: [
        { t: R`فحص أسبوعي`, what: R`سكربت بيعمل [[Start-MpScan -ScanType QuickScan]] وبعدين [[Get-MpThreatDetection]] ويكتب النتيجة في ملف. وبعدين جدوله (درس [[schtasks]] في تاب CMD، أو [[Register-ScheduledTask]] في تاب PowerShell).` },
        { t: R`لاقي الفولدرات الكبيرة`, what: R`أمر بيطلّع أكبر ١٠ فولدرات في [[$HOME]] بحجمهم — من غير ما يمسح حاجة. وجرّبه على فولدر فيه مشاريع Node وشوف [[node_modules]] بياخد كام.` },
      ],
      n: R`الفحص اتعمل على فولدر تجربة بس، ومفيش حاجة اتمسحت. والأوامر اللي محتاجة Admin اتجرّبت من غير Admin عشان تشوف رسالتها`,
      items: [
        {
          cmd: "فحص فيروسات من الترمنال",
          title: "Defender من غير ما تفتح الإعدادات",
          learn: R`تعرف حالة Defender، وتفحص فولدر أو الجهاز كله، وتشوف اللي اتلقى قبل كده.`,
          out: R`تعرف الجهاز محمي ولا لأ، وآخر full scan كان إمتى.`,
          use: {
            work: R`فلاشة جاية من بره، أو ملف نزل من مكان مش مضمون — فحص الفولدر ده بس بياخد ثانيتين.`,
            prog: R`سكربتات بتنزّل ملفات أو بتفكّ ضغط حاجات ممكن تفحصها قبل ما تشغّلها.`,
          },
          desc: R`**الحالة أولًا:** [[Get-MpComputerStatus]]

| الخاصية | جهاز التجربة |
|---|---|
| [[AntivirusEnabled]] | [[True]] |
| [[RealTimeProtectionEnabled]] | [[True]] |
| [[AntivirusSignatureLastUpdated]] | امبارح |
| [[QuickScanAge]] | [[0]] — النهارده |
| [[FullScanAge]] | **[[4294967295]]** |

**[[4294967295]]** ده أكبر رقم يتخزن في المتغير ده — ومعناه «**عمره ما اتعمل**». يعني الجهاز بيعمل quick scan كل يوم، بس عمره ما اتفحص كله.

**فحص فولدر:** [[Start-MpScan -ScanType CustomScan -ScanPath <فولدر>]] — **من غير Admin**، وخلص في **١.٨ ثانية** لفولدر صغير.

**أو بـ [[MpCmdRun.exe]]** (الأداة القديمة، وبتطلّع نص أوضح):

[[Scan starting... Scan finished. Scanning C:\...\cmdlab found no threats.]]

**ومفاجأة اتعلمتها وأنا بجرّب:** حطيت [[Start-MpScan]] جوه [[Measure-Command]] عشان أقيس الوقت — فـ [[Measure-Command]] **كتم الناتج كله**، ومعرفتش نجح ولا لأ. ولما عدته من غيره، طلع [[scan done in 1.8s]]. فلو بتقيس وقت أمر، متعتمدش على إنك تشوف ناتجه.

**واللي اتلقى قبل كده:** [[Get-MpThreatDetection]] بيرجّع كل حاجة Defender مسكها. على جهاز التجربة طلع فيه ١٢ — والتفاصيل ([[ThreatID]] والمسار والإجراء) في كل واحدة.`,
          example: R`# Windows (PowerShell):
Get-MpComputerStatus | Select-Object AntivirusEnabled, RealTimeProtectionEnabled, AntivirusSignatureLastUpdated, QuickScanAge, FullScanAge
Start-MpScan -ScanType CustomScan -ScanPath "$HOME\Downloads"
Start-MpScan -ScanType QuickScan
Get-MpThreatDetection | Select-Object InitialDetectionTime, ThreatID, ActionSuccess
Update-MpSignature
# Windows (CMD):
"%ProgramFiles%\Windows Defender\MpCmdRun.exe" -Scan -ScanType 3 -File "%USERPROFILE%\Downloads"`,
          lines: [
            R`الحالة. و [[FullScanAge = 4294967295]] = عمره ما اتعمل.`,
            R`فولدر واحد — ثواني لفولدر صغير، ومن غير Admin.`,
            R`فحص سريع للأماكن المهمة (الذاكرة، والـ startup، وفولدرات النظام) — دقايق.`,
            R`كل اللي اتلقى قبل كده.`,
            R`حدّث التعريفات قبل أي فحص مهم.`,
            R`نفس الفحص من CMD. [[-ScanType 3]] = فولدر معين. وبتطلّع «found no threats» أو اسم اللي لقاه.`,
          ],
          try: R`شغّل [[Get-MpComputerStatus]] واعرف آخر full scan. ولو [[4294967295]]، اعمل [[Start-MpScan -ScanType FullScan]] في وقت مش محتاج فيه الجهاز — **ممكن ياخد ساعة أو أكتر** حسب حجم الملفات.`,
          deep: {
            why: R`الحماية اللحظية بتفحص الملفات وانت بتفتحها. بس الملفات اللي موجودة من زمان وعمرك ما فتحتها، محدش فحصها — وده دور الـ full scan.`,
            how: R`**أنواع الفحص:**

| | بيفحص | الوقت |
|---|---|---|
| [[QuickScan]] | الأماكن اللي البرامج الخبيثة بتستخبى فيها عادة | دقايق |
| [[FullScan]] | كل الملفات على كل الديسكات | ساعة أو أكتر |
| [[CustomScan]] | فولدر أو ملف انت بتحدده | حسب الحجم |
| [[-ScanType OfflineScan]] (لـ [[Start-MpWDOScan]]) | بيعمل restart ويفحص قبل ويندوز ما يفتح | — |

(أوقات QuickScan و FullScan من وثائق Microsoft — الـ CustomScan بس اللي اتقاس هنا.)

**ليه [[4294967295]]؟** ده [[2³² − 1]] — أكبر قيمة لرقم [[uint32]]. البرنامج بيستخدمه كعلامة «مفيش قيمة». وده نمط هتشوفه كتير: أرقام زي [[-1]] و [[65535]] و [[4294967295]] غالبًا معناها «مش موجود»، مش رقم حقيقي.

**[[Get-Command -Module Defender]]** طلّع **١٥ أمر** — منهم [[Set-MpPreference]] (إعدادات، محتاج Admin) و [[Add-MpPreference -ExclusionPath]] (استثناء فولدر — **خد بالك**، أي حاجة في الاستثناء مش هتتفحص).

**و [[Measure-Command]]:** بيشغّل الكود وبيرمي ناتجه، وبيرجّع الوقت بس. فلو عايز الاتنين:

~~~powershell
$s = Get-Date; Start-MpScan -ScanType CustomScan -ScanPath $p; "خلص في {0:N1} ثانية" -f ((Get-Date) - $s).TotalSeconds
~~~

**وعلى لينكس:** ClamAV ([[clamscan -r ~/Downloads]]) — بيحتاج يحمّل قاعدة بيانات التعريفات الأول ([[freshclam]]). (من وثائق ClamAV — مااتجرّبش هنا.)`,
            when: R`أي ملف أو فلاشة من بره، وكل شوية full scan، وأي وقت الجهاز يتصرف بشكل غريب.`,
            mistakes: R`تفتكر الـ quick scan اليومي كفاية. أو تضيف فولدر للاستثناءات «مؤقتًا» وتنساه. أو [[Measure-Command]] على أمر محتاج تشوف ناتجه. أو تقرا [[4294967295]] كعدد أيام.`
          },
          teach: R`## الحالة

~~~powershell
Get-MpComputerStatus | Select-Object AntivirusEnabled, RealTimeProtectionEnabled,
  AntivirusSignatureLastUpdated, QuickScanAge, FullScanAge
~~~

~~~text اتشغّل فعلًا
AntivirusEnabled              : True
RealTimeProtectionEnabled     : True
AntivirusSignatureLastUpdated : 10/28/2026 11:03:00 PM
QuickScanAge                  : 0
FullScanAge                   : 4294967295
~~~

**[[4294967295]] = عمره ما اتعمل.** ده أكبر رقم [[uint32]]، والبرنامج بيستخدمه علامة «مفيش قيمة».

---

## ١. فحص فولدر

~~~powershell
$s = Get-Date
Start-MpScan -ScanType CustomScan -ScanPath $p
"scan done in {0:N1}s" -f ((Get-Date) - $s).TotalSeconds
~~~

~~~text اتشغّل فعلًا — من غير Admin
scan done in 1.8s
~~~

~~~bat أو من CMD
"%ProgramFiles%\Windows Defender\MpCmdRun.exe" -Scan -ScanType 3 -File "%USERPROFILE%\Downloads"
~~~

~~~text اتشغّل فعلًا (على فولدر تجربة)
Scan starting...
Scan finished.
Scanning C:\...\cmdlab found no threats.
~~~

---

## ٢. مصيدة: [[Measure-Command]] بيكتم الناتج

~~~powershell
Measure-Command { Start-MpScan -ScanType CustomScan -ScanPath $p; "scan done" }
~~~

~~~text اتشغّل فعلًا
TotalSeconds : 0.1          <-- و "scan done" ماتطبعتش
~~~

**[[Measure-Command]] بيرمي الناتج.** فاستخدم [[Get-Date]] قبل وبعد لو محتاج الاتنين.

---

## ٣. أنواع الفحص

| | | الوقت |
|---|---|---|
| [[QuickScan]] | الأماكن المعتادة | دقايق |
| [[FullScan]] | **كل حاجة** | ساعة أو أكتر |
| [[CustomScan]] | فولدر | حسب الحجم |

---

## ٤. اللي اتلقى قبل كده

~~~powershell
Get-MpThreatDetection | Select-Object InitialDetectionTime, ThreatID, ActionSuccess
~~~

---

## الخلاصة

- [[Get-MpComputerStatus]] — والـ [[FullScanAge]].
- [[Start-MpScan -ScanType CustomScan]] — من غير Admin.
- [[4294967295]] = مفيش، مش رقم.
- [[Measure-Command]] بيكتم الناتج.
- الاستثناءات = أماكن مش بتتفحص.`,
          sol: R`الحالة، والفحص بـ [[Start-MpScan]] و [[MpCmdRun]] على فولدر تجربة، و [[Get-MpThreatDetection]]، اتشغّلوا من غير Admin على ويندوز 11. أوقات QuickScan و FullScan و ClamAV من الوثائق.`,
          solCode: R`Get-MpComputerStatus     # FullScanAge : 4294967295   (= عمره ما اتعمل)
Start-MpScan -ScanType CustomScan -ScanPath $p      # scan done in 1.8s
MpCmdRun.exe -Scan -ScanType 3 -File $p             # ... found no threats.   exit=0
(Get-Command -Module Defender).Count                # 15`
        },

        {
          cmd: "ملفات النظام والديسك",
          title: "sfc و DISM و chkdsk: بالترتيب، وكـ Admin",
          learn: R`تعرف إمتى تشغّل كل أداة من التلاتة، وبأنهي ترتيب، وليه محتاجين Admin.`,
          out: R`تصلّح ويندوز بايظ من غير ما تعيد تسطيبه.`,
          use: {
            work: R`ويندوز بيطلّع أخطاء غريبة، أو برامج النظام بتقع، أو التحديثات بتفشل — التلاتة دول قبل ما تفكّر في إعادة تسطيب.`,
          },
          desc: R`تلات أدوات، وكل واحدة ليها شغلة:

| الأداة | بتفحص | بتصلّح من |
|---|---|---|
| [[sfc /scannow]] | ملفات ويندوز نفسها | نسخة محفوظة على الجهاز |
| [[DISM /Online /Cleanup-Image /RestoreHealth]] | **النسخة المحفوظة دي** | Windows Update |
| [[chkdsk C: /scan]] | نظام الملفات على الديسك | — |

**والترتيب مهم:** لو [[sfc]] قال إنه لقى ملفات بايظة ومقدرش يصلّحها، يبقى النسخة المحفوظة نفسها بايظة. فـ [[DISM]] الأول يصلّحها من النت، وبعدين [[sfc]] تاني.

**والتلاتة محتاجين Admin.** جرّبتهم من غير:

[[sfc]]: [[You must be an administrator running a console session in order to use the sfc utility.]]

[[chkdsk C:]]: [[Access Denied as you do not have sufficient privileges ... You have to invoke this utility running in elevated mode]]

وفي الاتنين [[exit=1]].

**التفاصيل الكاملة** لكل أداة في تاب CMD (قسم «تحكّم في الجهاز وصيانته»: درس «sfc و DISM» ودرس «chkdsk»).`,
          example: R`# Windows (PowerShell كـ Admin):
sfc /scannow
DISM /Online /Cleanup-Image /RestoreHealth
sfc /scannow
chkdsk C: /scan
Get-Content "$env:windir\Logs\CBS\CBS.log" -Tail 50 | Select-String "corrupt|repaired"`,
          lines: [
            R`افحص ملفات ويندوز وصلّحها من النسخة المحفوظة. ١٠ لـ ٣٠ دقيقة.`,
            R`صلّح النسخة المحفوظة نفسها من Windows Update. محتاج نت.`,
            R`[[sfc]] تاني — دلوقتي عنده نسخة سليمة يصلّح منها.`,
            R`افحص نظام الملفات وهو شغّال ([[/scan]] من غير إعادة تشغيل). و [[/f]] بيصلّح بس محتاج restart لـ [[C:]].`,
            R`لوج [[sfc]]: اللي اتلقى واللي اتصلّح.`,
          ],
          try: R`افتح PowerShell كـ Admin (Win+X ← Terminal (Admin))، وشغّل [[sfc /scannow]] بس، واستنى. لو قال «did not find any integrity violations»، خلاص. ولو قال إنه صلّح، اعمل restart. ولو قال «unable to fix some»، كمّل بـ [[DISM]].`,
          deep: {
            why: R`ملفات النظام بتبوظ من انقطاع كهربا وقت تحديث، أو ديسك فيه مشكلة، أو برنامج غيّر حاجة مش بتاعته. والأدوات دي بتقارنها بنسخة معروفة إنها سليمة.`,
            how: R`**نتايج [[sfc]]:**

| الرسالة | معناها |
|---|---|
| did not find any integrity violations | سليم |
| found corrupt files and successfully repaired them | اتصلّح — اعمل restart |
| found corrupt files but was unable to fix some | **[[DISM]]** وبعدين [[sfc]] تاني |
| could not perform the requested operation | جرّب من Safe Mode |

(الرسايل دي من وثائق Microsoft — مااتشغّلتش كـ Admin هنا.)

**[[chkdsk]]:**

| | |
|---|---|
| [[chkdsk C:]] | قراية بس |
| [[chkdsk C: /scan]] | فحص وهو شغّال (NTFS) |
| [[chkdsk C: /f]] | يصلّح — لـ [[C:]] بيتجدول للـ restart الجاي |
| [[chkdsk C: /r]] | يدوّر على sectors بايظة — **ساعات** على ديسك كبير |

**وليه Admin؟** الأدوات دي بتكتب في ملفات النظام نفسه وبتقرا الديسك مباشرة. وده مينفعش يتعمل بصلاحيات يوزر عادي — حتى لو انت الـ Admin بتاع الجهاز، لازم تفتح الترمنال «كـ Admin» (UAC).

**فرق مهم:** [[sfc]] بيصلّح ويندوز، مش برامجك. لو برنامج معين بيقع، الحل في البرنامج نفسه (إصلاح أو إعادة تسطيب)، مش [[sfc]].`,
            when: R`ويندوز بيتصرف غلط بعد تحديث أو انقطاع كهربا، أو بعد إزالة فيروس.`,
            mistakes: R`تشغّلهم من غير Admin وتفتكر الأداة بايظة. أو [[sfc]] مرة وخلاص وهو قال «unable to fix». أو [[chkdsk /r]] على ديسك كبير وانت محتاج الجهاز.`
          },
          teach: R`## تلات أدوات، تلات شغلات

| | بتفحص | بتصلّح من |
|---|---|---|
| [[sfc /scannow]] | ملفات ويندوز | نسخة على الجهاز |
| [[DISM ... /RestoreHealth]] | **النسخة دي** | Windows Update |
| [[chkdsk C: /scan]] | نظام الملفات | — |

---

## ١. الترتيب

~~~text
sfc /scannow
   │
   ├─ سليم أو اتصلّح         ->  خلاص (restart لو صلّح)
   └─ unable to fix some     ->  DISM /Online /Cleanup-Image /RestoreHealth
                                  ثم  sfc /scannow  تاني
~~~

---

## ٢. والتلاتة محتاجين Admin

~~~text اتشغّل فعلًا — من غير Admin
sfc /verifyonly
  You must be an administrator running a console session in order to use the sfc utility.
  exit=1

chkdsk C:
  Access Denied as you do not have sufficient privileges or
  the disk may be locked by another process.
  You have to invoke this utility running in elevated mode
  exit=1
~~~

**Win+X ← Terminal (Admin).**

---

## ٣. [[chkdsk]]

| | |
|---|---|
| [[chkdsk C:]] | قراية |
| [[/scan]] | فحص وهو شغّال |
| [[/f]] | يصلّح — مع restart لـ [[C:]] |
| [[/r]] | sectors بايظة — **ساعات** |

---

## ٤. اللوج

~~~powershell
Get-Content "$env:windir\Logs\CBS\CBS.log" -Tail 50 | Select-String "corrupt|repaired"
~~~

---

## الخلاصة

- [[sfc]] ← لو فشل ← [[DISM]] ← [[sfc]] تاني.
- [[chkdsk /scan]] من غير restart.
- كلهم Admin.
- [[sfc]] بيصلّح ويندوز، مش برامجك.
- التفاصيل في تاب CMD.`,
          sol: R`رسايل [[sfc]] و [[chkdsk]] من غير Admin اتشغّلت على ويندوز 11. الأدوات نفسها كـ Admin ورسايل نتايجها من وثائق Microsoft — مااتشغّلتش لأنها بتصلّح ملفات النظام.`,
          solCode: R`sfc /verifyonly     # You must be an administrator running a console session ...   exit=1
chkdsk C:           # Access Denied ... You have to invoke this utility running in elevated mode   exit=1`
        },

        {
          cmd: "نضّف من غير ما تمسح غلط",
          title: "اعرف المساحة راحت فين، وشوف قبل ما تمسح",
          learn: R`تلاقي أكبر الفولدرات والملفات، وتمسح بـ [[-WhatIf]] الأول.`,
          out: R`جيجات بترجع من غير ما تخسر ملف مهم.`,
          use: {
            prog: R`[[node_modules]] و [[.venv]] و [[target]] و [[bin/obj]] وكاش Docker — كل مشروع قديم بياخد مساحة من غير ما تستخدمه.`,
            work: R`الديسك فاضل فيه ٥٪ — بدل ما تمسح عشوائي، اعرف الأول إيه الكبير.`,
          },
          desc: R`**قبل ما تمسح: اعرف إيه الكبير.**

فولدر الـ TEMP على جهاز التجربة:

[[17,885 files, 3.02 GB]]

**تلات جيجا** ملفات مؤقتة. وده بس مكان واحد.

**والقاعدة: [[-WhatIf]] الأول، دايمًا.** [[Remove-Item ... -WhatIf]] بيطبع اللي **كان** هيتمسح، ومبيمسحش:

[[What if: Performing the operation "Remove File" on target "C:\...\report.htm".]]

ولما تتأكد إن القايمة صح، شيل [[-WhatIf]].

**أماكن تبص فيها:**

| | |
|---|---|
| [[$env:TEMP]] | ملفات مؤقتة — آمنة تتمسح غالبًا (اللي مفتوح هيرفض) |
| [[$HOME\Downloads]] | اللي نزّلته من سنين |
| [[node_modules]] في مشاريع قديمة | بيرجع بـ [[npm install]] |
| كاش Docker | [[docker system df]] بيقولك حجمه — **والمسح لكل مشروع لوحده** (درس «الشبكة ملك مين؟» في تاب docker بيشرح ليه [[prune]] العام خطر) |

**ولاحظ:** Defender بيستخدم TEMP، والبرامج المفتوحة ماسكة ملفات فيه. فالمسح هيطلّع أخطاء «in use» لبعض الملفات — وده طبيعي، سيبهم.`,
          example: R`# Windows (PowerShell):
Get-ChildItem $env:TEMP -Recurse -File -Force -ErrorAction SilentlyContinue | Measure-Object Length -Sum
Get-ChildItem $HOME -Directory | ForEach-Object { [pscustomobject]@{ Folder=$_.Name; GB=[math]::Round((Get-ChildItem $_.FullName -Recurse -File -Force -ErrorAction SilentlyContinue | Measure-Object Length -Sum).Sum/1GB,2) } } | Sort-Object GB -Descending | Select-Object -First 10
Get-ChildItem $env:TEMP -Recurse -File -ErrorAction SilentlyContinue | Where-Object LastWriteTime -lt (Get-Date).AddDays(-7) | Remove-Item -WhatIf
docker system df
# Linux:
du -sh ~/* 2>/dev/null | sort -rh | head -10`,
          lines: [
            R`حجم TEMP. و [[-Force]] بيشمل الملفات المخفية، و [[SilentlyContinue]] بيتجاهل اللي مش مسموح تقراه.`,
            R`أكبر ١٠ فولدرات في البيت بتاعك. **بياخد وقت** لو فيه ملفات كتير.`,
            R`**[[-WhatIf]]**: اللي أقدم من أسبوع في TEMP — بيطبع، مبيمسحش.`,
            R`حجم صور وكونتينرات Docker. قراية بس.`,
            R`لينكس: أكبر ١٠ حاجات في البيت. و [[sort -rh]] بيرتب «2.1G» قبل «900M» صح.`,
          ],
          try: R`شغّل الأمر التاني على [[$HOME]]، وبعدين ادخل في أكبر فولدر وشغّله تاني جواه. هتوصل لأكبر حاجة في ٣ خطوات. ومتمسحش حاجة غير لما تعرفها.`,
          deep: {
            why: R`المسح العشوائي بيضيّع حاجات. والمسح من غير ما تعرف الكبير بيضيّع وقت. والطريقة الصح: قيس، ادخل، قيس، امسح بـ [[-WhatIf]] الأول.`,
            how: R`**[[-WhatIf]] في كل حاجة:** أغلب أوامر PowerShell اللي بتغيّر حاجة بتدعمه ([[Remove-Item]] و [[Move-Item]] و [[Stop-Process]] و [[Format-Volume]]...). و [[-Confirm]] بيسألك عن كل واحدة.

**ليه [[Get-ChildItem -Recurse]] بطيء؟** بيقرا كل ملف. على [[$HOME]] فيه مئات الآلاف من الملفات، ممكن ياخد دقايق. وأداة زي WizTree أو WinDirStat (برامج بواجهة) بتقرا الـ MFT مباشرة وأسرع بكتير. (معلومات عامة — البرامج دي مااتجرّبتش هنا.)

**أدوات ويندوز المدمجة:**

| | |
|---|---|
| Settings ← Storage ← Storage Sense | تنضيف تلقائي لـ TEMP والـ Recycle Bin |
| [[cleanmgr]] | Disk Cleanup القديم — و «Clean up system files» بيمسح ملفات التحديثات القديمة |

**ومشاريع البرمجة:**

~~~powershell أكبر node_modules
Get-ChildItem $HOME -Recurse -Directory -Filter node_modules -ErrorAction SilentlyContinue |
  Where-Object { $_.FullName -notmatch 'node_modules.+node_modules' }
~~~

([[-notmatch]] بيشيل [[node_modules]] اللي جوه [[node_modules]] — الخارجي بس هو اللي يهمك.)

**و Docker:** [[docker system df]] بيقرا بس. والمسح: [[docker compose down --rmi local]] لكل مشروع، أو [[docker image rm]] لصورة معينة. [[docker system prune]] بيمسح حاجات **كل** المشاريع (درس في تاب docker).`,
            when: R`الديسك تحت ١٠٪، أو قبل ما تشتري ديسك أكبر.`,
            mistakes: R`[[Remove-Item -Recurse]] من غير [[-WhatIf]]. أو تمسح من [[C:\Windows]] «عشان كبير». أو [[docker system prune]] على جهاز عليه مشاريع مهمة. أو تقرا ديسك مليان بـ [[Get-ChildItem]] وتقفله بعد دقيقة فتفتكره علّق.`
          },
          teach: R`## قيس قبل ما تمسح

~~~powershell
Get-ChildItem $env:TEMP -Recurse -File -Force -ErrorAction SilentlyContinue | Measure-Object Length -Sum
~~~

~~~text اتشغّل فعلًا
17,885 files, 3.02 GB
~~~

**تلات جيجا** ملفات مؤقتة.

---

## ١. أكبر الفولدرات

~~~powershell
Get-ChildItem $HOME -Directory | ForEach-Object {
  [pscustomobject]@{ Folder=$_.Name; GB=[math]::Round((Get-ChildItem $_.FullName -Recurse -File -Force -ErrorAction SilentlyContinue | Measure-Object Length -Sum).Sum/1GB,2) }
} | Sort-Object GB -Descending | Select-Object -First 10
~~~

**ادخل في الأكبر وشغّله تاني.** تلات خطوات وتوصل.

---

## ٢. [[-WhatIf]] الأول، دايمًا

~~~powershell
Get-ChildItem -LiteralPath $folder -File | Where-Object Extension -eq '.htm' | Remove-Item -WhatIf
~~~

~~~text اتشغّل فعلًا — مفيش حاجة اتمسحت
What if: Performing the operation "Remove File" on target "C:\...\report.htm".
~~~

القايمة صح؟ شيل [[-WhatIf]].

---

## ٣. فين تبص

| | |
|---|---|
| [[$env:TEMP]] | آمن غالبًا (المفتوح هيرفض — سيبه) |
| [[Downloads]] | من سنين |
| [[node_modules]] قديمة | ترجع بـ [[npm install]] |
| Docker | [[docker system df]] — والمسح لكل مشروع |

---

## ٤. لينكس

~~~bash
du -sh ~/* 2>/dev/null | sort -rh | head -10
~~~

---

## الخلاصة

- قيس، ادخل، قيس.
- [[-WhatIf]] قبل أي مسح.
- TEMP و Downloads و [[node_modules]] القديمة الأول.
- [[docker system prune]] بيلمس كل المشاريع.`,
          sol: R`حجم TEMP و [[-WhatIf]] اتشغّلوا على جهاز التجربة (مفيش حاجة اتمسحت). Storage Sense و [[cleanmgr]] والبرامج التانية من الوثائق.`,
          solCode: R`Get-ChildItem $env:TEMP -Recurse -File -Force -ErrorAction SilentlyContinue | Measure-Object Length -Sum
#   17,885 files, 3.02 GB
Get-ChildItem -LiteralPath $folder -File | Where-Object Extension -eq '.htm' | Remove-Item -WhatIf
#   What if: Performing the operation "Remove File" on target "...\report.htm".`
        }
      ]
    },

    {
      t: "الفلاشات والديسكات",
      l: 2,
      time: R`حوالي ٤٠ دقيقة`,
      goal: [
        R`تعرف الفلاشة من بين الديسكات قبل أي حاجة، عشان متفرمتش الديسك الغلط.`,
        R`تفرمت فلاشة بالنظام الصح: FAT32 أو exFAT أو NTFS أو ext4.`,
      ],
      use: {
        work: R`فلاشة لشاشة أو عربية أو تلفزيون، أو فلاشة bootable، أو فلاشة بتتنقل بين ويندوز والماك.`,
        cs: R`نظام الملفات هو الطريقة اللي الملفات بتتنظّم بيها على الديسك. وكل نظام ليه حدود (حجم الملف، والأجهزة اللي بتقراه).`,
      },
      lab: R`# Linux (ديسك وهمي، من غير ما تلمس أي جهاز):
docker run -it --rm ubuntu:24.04 bash
apt-get update && apt-get install -y dosfstools exfatprogs ntfs-3g mtools
truncate -s 256M usb.img`,
      projects: [
        { t: R`جرّب الأربعة على ديسك وهمي`, what: R`في Docker: اعمل ٤ ملفات [[.img]]، وفرمت كل واحد بنظام، واقرا النتيجة بـ [[blkid]]. وبعدين اكتب ملف جوه الـ FAT32 بـ [[mcopy]] من غير ما تركّبه.` },
      ],
      n: R`الفرمتة اتجرّبت على ديسكات وهمية (ملفات [[.img]] جوه Docker) — مفيش ديسك حقيقي اتلمس. وأوامر ويندوز اتجرّبت قراية بس، أو بـ [[-WhatIf]] على حرف مش موجود`,
      items: [
        {
          cmd: "اعرف الفلاشة صح",
          title: "قبل ما تفرمت: اتأكد إن ده الديسك اللي في إيدك",
          learn: R`تفرّق الفلاشة عن ديسكات الجهاز بالنوع ([[BusType]]) والحجم، قبل أي أمر بيمسح.`,
          out: R`عمرك ما تفرمت الديسك الغلط.`,
          use: {
            work: R`غلطة رقم واحد في الفرمتة من الترمنال: رقم ديسك غلط. وده بيمسح الويندوز أو ملفاتك.`,
          },
          desc: R`على جهاز التجربة، [[Get-Disk]]:

| Number | النوع ([[BusType]]) | الحجم | [[IsBoot]] | [[IsSystem]] |
|---|---|---|---|---|
| 0 | NVMe | 932 جيجا | **True** | False |
| 1 | NVMe | 954 جيجا | False | **True** |

**مفيش فلاشة متوصلة** — [[Get-Disk | Where-Object BusType -eq 'USB']] رجّع ولا حاجة.

**لما توصّل فلاشة**، هتظهر سطر جديد [[BusType = USB]] بحجمها (١٦ أو ٣٢ أو ٦٤ جيجا عادة). وده اللي بتشتغل عليه.

**تلات علامات إن ده مش الديسك الصح:**

- [[IsBoot = True]] أو [[IsSystem = True]] — ده ديسك الويندوز.
- [[BusType]] مش [[USB]].
- الحجم أكبر بكتير من الفلاشة.

**وعلى لينكس:** [[lsblk -o NAME,SIZE,TYPE,TRAN,RM,MODEL,MOUNTPOINTS]]. العمود [[TRAN]] = [[usb]]، و [[RM]] = [[1]] (removable). وجوه Docker الأعمدة بتظهر فاضية لأنه مش شايف أجهزة حقيقية.`,
          example: R`# Windows (PowerShell):
Get-Disk | Select-Object Number, FriendlyName, BusType, @{n='SizeGB';e={[math]::Round($_.Size/1GB)}}, IsBoot, IsSystem
Get-Disk | Where-Object BusType -eq 'USB'
Get-Volume | Where-Object DriveType -eq 'Removable'
# Linux:
lsblk -o NAME,SIZE,TYPE,TRAN,RM,MODEL,MOUNTPOINTS
# Mac:
diskutil list external`,
          lines: [
            R`كل الديسكات: الرقم، والنوع، والحجم، وهل ده ديسك الويندوز.`,
            R`الفلاشات بس. لو فاضي، مفيش فلاشة متوصلة.`,
            R`أو بالحرف: الـ volumes اللي «Removable».`,
            R`لينكس: [[TRAN]] = usb، و [[RM]] = 1.`,
            R`الماك: الديسكات الخارجية بس. (من وثائق Apple — مااتجرّبش هنا.)`,
          ],
          try: R`شغّل [[Get-Disk]] من غير فلاشة، وبعدين وصّل فلاشة وشغّله تاني. السطر الجديد هو الفلاشة. واكتب رقمه، وقارن الحجم باللي مكتوب عليها.`,
          deep: {
            why: R`أوامر الفرمتة مبتسألش «متأكد إن ده الديسك اللي في إيدك؟». بتنفّذ. فالتأكد بيحصل قبلها، بالعين.`,
            how: R`**[[Number]] ممكن يتغيّر:** رقم الديسك بيتحدد لما الجهاز يفتح أو الفلاشة تتوصل. فلو شلت فلاشة ووصّلت تانية، أو وصّلت اتنين، الأرقام ممكن تتبادل. **اعرف الرقم قبل الأمر على طول**، مش من ساعة.

**الأمان في السكربت:** لو بتكتب سكربت بيفرمت، فلتر بالنوع والحجم، ووقّف لو لقى أكتر من واحد:

~~~powershell
$usb = @(Get-Disk | Where-Object { $_.BusType -eq 'USB' -and -not $_.IsBoot -and -not $_.IsSystem })
if ($usb.Count -ne 1) { throw "لازم فلاشة واحدة بالظبط، لقيت $($usb.Count)" }
~~~

**الديسكات الخارجية (USB HDD/SSD)** برضه [[BusType = USB]]. فلو عندك ديسك خارجي متوصل فيه ملفاتك، **افصله** قبل ما تفرمت أي فلاشة.

**وفي [[diskpart]]** (تاب CMD): [[list disk]] بيطلّع نفس القايمة، و [[select disk N]] ثم [[clean]] بيمسح الديسك كله فورًا. نفس الخطر، ومن غير [[-WhatIf]].`,
            when: R`قبل أي فرمتة، أو [[diskpart]]، أو كتابة ISO على فلاشة.`,
            mistakes: R`تعتمد على رقم شفته من شوية. أو تسيب ديسك خارجي متوصل. أو تفرمت بالحرف من غير ما تتأكد إن الحرف ده الفلاشة.`
          },
          teach: R`## الديسكات اللي على الجهاز

~~~powershell
Get-Disk | Select-Object Number, FriendlyName, BusType,
  @{n='SizeGB';e={[math]::Round($_.Size/1GB)}}, IsBoot, IsSystem
~~~

~~~text اتشغّل فعلًا (الأسماء اتغيّرت)
Number FriendlyName BusType SizeGB IsBoot IsSystem
------ ------------ ------- ------ ------ --------
     0 SSD-2        NVMe       932   True    False
     1 SSD-1        NVMe       954  False     True
~~~

~~~powershell
Get-Disk | Where-Object BusType -eq 'USB'
~~~

~~~text اتشغّل فعلًا
(ولا حاجة — مفيش فلاشة متوصلة)
~~~

---

## ١. علامات إنه **مش** الديسك الصح

| | |
|---|---|
| [[IsBoot]] أو [[IsSystem]] = [[True]] | ديسك الويندوز |
| [[BusType]] مش [[USB]] | ديسك داخلي |
| الحجم أكبر بكتير | مش الفلاشة |

---

## ٢. في سكربت

~~~powershell
$usb = @(Get-Disk | Where-Object { $_.BusType -eq 'USB' -and -not $_.IsBoot -and -not $_.IsSystem })
if ($usb.Count -ne 1) { throw "لازم فلاشة واحدة بالظبط، لقيت $($usb.Count)" }
~~~

> **الديسكات الخارجية برضه [[USB]].** افصلها قبل ما تفرمت.

---

## ٣. لينكس والماك

~~~bash
# Linux:
lsblk -o NAME,SIZE,TYPE,TRAN,RM,MODEL,MOUNTPOINTS
# Mac:
diskutil list external
~~~

---

## الخلاصة

- [[BusType = USB]] + الحجم + مش [[IsBoot]].
- الرقم ممكن يتغيّر — اعرفه قبل الأمر على طول.
- افصل أي ديسك خارجي تاني.`,
          sol: R`[[Get-Disk]] والفلتر اتشغّلوا على ويندوز 11 (قراية بس، والأسماء اتغيّرت). [[diskutil]] من وثائق Apple.`,
          solCode: R`Get-Disk     # 0: NVMe 932 IsBoot=True  |  1: NVMe 954 IsSystem=True
Get-Disk | Where-Object BusType -eq 'USB'     # (ولا حاجة)`
        },

        {
          cmd: "فرمت فلاشة",
          title: "FAT32 ولا exFAT ولا NTFS: حسب هتوصّلها بإيه",
          learn: R`تختار نظام الملفات حسب الأجهزة اللي هتقرا الفلاشة، وتفرمتها من الترمنال.`,
          out: R`فلاشة بتشتغل على الجهاز اللي محتاجه.`,
          use: {
            work: R`فلاشة للتلفزيون (FAT32 غالبًا)، أو بتتنقل بين ويندوز والماك (exFAT)، أو لويندوز بس بملفات كبيرة (NTFS).`,
            cs: R`FAT32 من التسعينات، وحد أقصى للملف الواحد ٤ جيجا. exFAT اتعمل عشان يشيل الحد ده ويفضل بسيط.`,
          },
          desc: R`**اختار النظام الأول:**

| النظام | ويندوز | ماك | لينكس | تلفزيونات وعربيات | ملف أكبر من ٤ جيجا |
|---|---|---|---|---|---|
| **FAT32** | ✓ | ✓ | ✓ | ✓ غالبًا | **✗** |
| **exFAT** | ✓ | ✓ | ✓ | بعضها | ✓ |
| **NTFS** | ✓ | قراية بس | ✓ | نادرًا | ✓ |
| **ext4** | ✗ | ✗ | ✓ | ✗ | ✓ |

(التوافق ده من الوثائق والتجربة العامة — والحد الـ ٤ جيجا في FAT32 من مواصفات النظام نفسه.)

**القاعدة البسيطة:** exFAT لو مش متأكد. FAT32 لو جهاز قديم مش بيقرا exFAT.

**اتجرّب على ديسكات وهمية:** ٤ ملفات [[.img]] بـ ٢٥٦ ميجا جوه Docker، وكل واحد اتفرمت بنظام، و [[blkid]] قرا كل واحد:

[[usb-vfat.img: LABEL="MYUSB" UUID="2E45-4E16" TYPE="vfat"]]

[[usb-exfat.img: LABEL="MYUSB" UUID="EBF7-92E4" TYPE="exfat"]]

[[usb-ext4.img: LABEL="MYUSB" UUID="b50d962e-..." TYPE="ext4"]]

[[usb-ntfs.img: LABEL="MYUSB" UUID="03C55F29036BEED9" TYPE="ntfs"]]

**وكتبت ملف جوه الـ FAT32 من غير ما أركّبه** بـ [[mtools]] ([[mcopy]] و [[mdir]]) — وطلع [[a txt 6]]. يعني الفرمتة اشتغلت فعلًا، مش بس الأمر خلص.

**وعلى ويندوز:** [[Format-Volume]] بيقبل [[FAT]] و [[FAT32]] و [[exFAT]] و [[NTFS]] و [[ReFS]] (ده من الـ [[ValidateSet]] بتاعه). وجرّبته بـ [[-WhatIf]] على حرف مش موجود:

[[No MSFT_Volume objects found with property 'DriveLetter' equal to 'Q'.]]

**ولاحظ:** [[Format-Volume]] في ويندوز مش هيفرمت FAT32 لو الفلاشة أكبر من ٣٢ جيجا (حد في أداة ويندوز، مش في النظام نفسه — من وثائق Microsoft).`,
          example: R`# Windows (PowerShell كـ Admin):
Format-Volume -DriveLetter E -FileSystem exFAT -NewFileSystemLabel MYUSB -WhatIf
Format-Volume -DriveLetter E -FileSystem exFAT -NewFileSystemLabel MYUSB
# Linux (الفلاشة /dev/sdX — اتأكد بـ lsblk الأول):
sudo umount /dev/sdX1
sudo mkfs.exfat -L MYUSB /dev/sdX1
# Linux (ديسك وهمي للتجربة):
truncate -s 256M usb.img && mkfs.vfat -F 32 -n MYUSB usb.img && blkid usb.img`,
          lines: [
            R`**[[-WhatIf]] الأول**: بيقول هيعمل إيه من غير ما يعمله. و [[E]] = حرف الفلاشة (من الدرس اللي فات).`,
            R`الفرمتة الحقيقية. **كل اللي على الفلاشة بيتمسح.**`,
            R`لازم تفصل الـ partition قبل الفرمتة. و [[sdX1]] = الفلاشة (مش [[sda]] اللي غالبًا ديسكك).`,
            R`الفرمتة. ([[mkfs.vfat -F 32]] لـ FAT32، و [[mkfs.ext4]] لـ ext4، و [[mkntfs -Q]] لـ NTFS.)`,
            R`**للتجربة**: ملف ٢٥٦ ميجا، وفرمتة FAT32، وقراية النتيجة. ومفيش أي ديسك حقيقي اتلمس.`,
          ],
          try: R`في Docker: [[docker run -it --rm ubuntu:24.04 bash]]، وبعدين [[apt-get update && apt-get install -y dosfstools exfatprogs mtools]]، واعمل [[usb.img]] وفرمته بالاتنين وقارن [[blkid]]. ده كله على ملف — جهازك مش هيتأثر.`,
          flag: "danger",
          deep: {
            why: R`الفرمتة بتمسح كل حاجة على الديسك، ومفيش [[undo]]. والفرق بين ديسك وهمي وديسك حقيقي في الأمر هو حرف واحد. فالتجربة على الوهمي، والحقيقي بعد ما تتأكد ٣ مرات.`,
            how: R`**الـ ٤ جيجا في FAT32:** حجم الملف بيتخزن في ٣٢ bit، فأقصى حجم [[2³² − 1]] بايت = ٤ جيجا ناقص بايت. فيلم ٥ جيجا مش هيتنسخ — وويندوز هيقول «The file is too large for the destination file system». (ده من مواصفات FAT32 — مااتجرّبش بملف كبير هنا.)

**Quick مقابل Full:** [[Format-Volume]] بيعمل quick افتراضيًا (بيكتب نظام ملفات جديد بس). و [[-Full]] بيكتب على كل الفلاشة — أبطأ بكتير، بس بيلاقي الأجزاء البايظة، وبيصعّب استرجاع الملفات القديمة.

**[[diskpart]] لما [[Format-Volume]] مايكفيش:** لو الفلاشة متلخبطة (partitions غريبة من ISO قديم، أو مش بتظهر بحرف)، [[diskpart]] بـ [[clean]] ثم [[create partition primary]] ثم [[format fs=exfat quick]] بيرجّعها جديدة. ده في تاب CMD (درس [[diskpart]]) — و [[clean]] بيمسح الديسك اللي اخترته فورًا.

**و [[mtools]] للتجربة:** [[mcopy -i usb.img file ::/]] بيكتب جوه صورة FAT من غير [[mount]] (اللي محتاج صلاحيات جوه Docker). وده اتجرّب:

~~~text
mdir -i usb-vfat.img ::/
a        txt         6 2026-10-29   9:33
                        264 288 256 bytes free
~~~

**و [[fsck.vfat -n]]** بيفحص من غير ما يصلّح ([[-n]] = no changes):

~~~text
usb-vfat.img: 1 files, 1/516190 clusters
~~~`,
            when: R`فلاشة جديدة لجهاز معين، أو فلاشة بتطلّع أخطاء، أو قبل ما تديها لحد.`,
            mistakes: R`تفرمت من غير [[-WhatIf]] أو من غير ما تتأكد من الحرف. أو FAT32 لفيلم أكبر من ٤ جيجا. أو NTFS لفلاشة هتتقري على ماك. أو [[mkfs]] على [[/dev/sda]] بدل [[/dev/sdb1]].`
          },
          teach: R`## اختار النظام الأول

| | ويندوز | ماك | لينكس | تلفزيون | ملف > ٤ جيجا |
|---|---|---|---|---|---|
| **FAT32** | ✓ | ✓ | ✓ | ✓ | **✗** |
| **exFAT** | ✓ | ✓ | ✓ | بعضها | ✓ |
| **NTFS** | ✓ | قراية | ✓ | نادرًا | ✓ |
| **ext4** | ✗ | ✗ | ✓ | ✗ | ✓ |

**مش متأكد؟ exFAT.**

---

## ١. التجربة: ٤ ديسكات وهمية

~~~bash
for fs in vfat exfat ext4 ntfs; do truncate -s 256M usb-$fs.img; done
mkfs.vfat -F 32 -n MYUSB usb-vfat.img
mkfs.exfat -L MYUSB usb-exfat.img
mkfs.ext4 -q -L MYUSB usb-ext4.img
mkntfs -F -Q -L MYUSB usb-ntfs.img
for fs in vfat exfat ext4 ntfs; do blkid usb-$fs.img; done
~~~

~~~text اتشغّل فعلًا · أوبونتو 24.04 جوه Docker
usb-vfat.img:  LABEL="MYUSB" UUID="2E45-4E16" BLOCK_SIZE="512" TYPE="vfat"
usb-exfat.img: LABEL="MYUSB" UUID="EBF7-92E4" BLOCK_SIZE="512" TYPE="exfat"
usb-ext4.img:  LABEL="MYUSB" UUID="b50d962e-1edf-44d8-9693-9954a1424757" BLOCK_SIZE="4096" TYPE="ext4"
usb-ntfs.img:  LABEL="MYUSB" BLOCK_SIZE="512" UUID="03C55F29036BEED9" TYPE="ntfs"
~~~

**مفيش ديسك حقيقي اتلمس.**

### واتأكد إنها اشتغلت فعلًا

~~~bash
echo "hello" > a.txt; mcopy -i usb-vfat.img a.txt ::/; mdir -i usb-vfat.img ::/
~~~

~~~text اتشغّل فعلًا
a        txt         6 2026-10-29   9:33
                        264 288 256 bytes free
~~~

---

## ٢. ويندوز

~~~powershell
Format-Volume -DriveLetter E -FileSystem exFAT -NewFileSystemLabel MYUSB -WhatIf
~~~

~~~text اتشغّل فعلًا — على حرف مش موجود
No MSFT_Volume objects found with property 'DriveLetter' equal to 'Q'.
~~~

الأنظمة المتاحة (من الـ [[ValidateSet]] بتاعه):

~~~text اتشغّل فعلًا
FAT, FAT32, exFAT, NTFS, ReFS
~~~

> و [[Format-Volume]] مش هيعمل FAT32 لفلاشة أكبر من ٣٢ جيجا (حد في أداة ويندوز — من الوثائق).

---

## ٣. لينكس — على فلاشة حقيقية

~~~bash
lsblk                                  # اتأكد من الاسم
sudo umount /dev/sdX1
sudo mkfs.exfat -L MYUSB /dev/sdX1
~~~

> [[sdX1]] = الفلاشة. **مش [[sda]]** — ده غالبًا ديسكك.

---

## الخلاصة

- اختار النظام حسب هتوصّلها بإيه.
- جرّب على [[.img]] الأول.
- [[-WhatIf]] و [[lsblk]] قبل الحقيقي.
- FAT32 = ملفات أصغر من ٤ جيجا بس.`,
          sol: R`الفرمتة بالأنظمة الأربعة و [[blkid]] و [[mcopy]] و [[fsck.vfat -n]] اتشغّلوا على ملفات [[.img]] جوه Docker (أوبونتو 24.04). [[Format-Volume]] اتجرّب بـ [[-WhatIf]] على حرف مش موجود. حد الـ ٤ جيجا، وحد الـ ٣٢ جيجا في ويندوز، وجدول التوافق، من الوثائق.`,
          solCode: R`mkfs.vfat -F 32 -n MYUSB usb-vfat.img    # mkfs.fat 4.2 (2021-01-31)
mkfs.exfat -L MYUSB usb-exfat.img        # exFAT format complete!
mkntfs -F -Q -L MYUSB usb-ntfs.img       # mkntfs completed successfully. Have a nice day.
blkid usb-vfat.img                       # LABEL="MYUSB" UUID="2E45-4E16" TYPE="vfat"
fsck.vfat -n usb-vfat.img                # usb-vfat.img: 1 files, 1/516190 clusters
# Windows:
Format-Volume -DriveLetter Q -FileSystem exFAT -WhatIf
#   No MSFT_Volume objects found with property 'DriveLetter' equal to 'Q'.`
        }
      ]
    },

    {
      t: "مين على شبكتك",
      l: 2,
      time: R`حوالي ٤٠ دقيقة`,
      goal: [
        R`تعرف الأجهزة اللي على شبكتك من غير ما تفحص (من الجدول اللي جهازك عارفه).`,
        R`تعمل scan لشبكة بتاعتك بـ [[nmap]]، وتعرف مين فاتح أنهي بورت.`,
        R`تعرف البورتات المفتوحة على جهازك انت، ومين البرنامج اللي فاتحها.`,
      ],
      use: {
        net: R`«النت بطيء» — ممكن يكون جهاز غريب على الواي فاي. والسؤال الأول: مين متوصل؟`,
        work: R`قبل ما تحط جهاز جديد على شبكة الشغل، أو بعد ما تشك إن حد تاني بيستخدم الواي فاي.`,
      },
      lab: R`# Linux (شبكة تجربة في Docker):
docker network create --subnet 10.20.0.0/24 homelab`,
      projects: [
        { t: R`جرد شبكة البيت`, what: R`جدول بكل جهاز على شبكتك: الـ IP، والـ MAC، وإيه الجهاز ده (موبايل، تلفزيون، راوتر). ابدأ بـ [[Get-NetNeighbor]]، وشوف اسم الشركة من أول ٦ حروف في الـ MAC.` },
        { t: R`جهازك فاتح إيه؟`, what: R`قايمة بكل بورت مفتوح على [[0.0.0.0]] (يعني على الشبكة) واسم البرنامج. ولكل واحد اسأل: محتاج يكون مفتوح على الشبكة ولا على الجهاز بس؟` },
      ],
      n: R`الفحص الفعلي ([[nmap]]) اتعمل على شبكة Docker صغيرة بس — مش على شبكة حقيقية. وعلى جهاز التجربة اتعملت قراية بس، والعناوين الحقيقية اتشالت. **متعملش scan لشبكة مش بتاعتك** — في أماكن كتير ده ممنوع`,
      items: [
        {
          cmd: "الأجهزة اللي على شبكتك",
          title: "من الجدول اللي جهازك عارفه، وبعدين scan حقيقي",
          learn: R`تعرف الأجهزة اللي جهازك شافها ([[Get-NetNeighbor]] / [[arp -a]])، وتعمل [[nmap -sn]] على شبكة بتاعتك.`,
          out: R`قايمة بالأجهزة اللي على الشبكة.`,
          use: {
            net: R`جدول الـ ARP بيقولك الأجهزة اللي جهازك كلّمها مؤخرًا — من غير ما تبعت حاجة. والـ scan بيلاقي الباقي.`,
            work: R`جهاز غريب على الواي فاي، أو عايز تعرف IP الطابعة.`,
          },
          desc: R`**الطريقة الهادية: اسأل جهازك هو عارف مين.**

[[Get-NetNeighbor]] (أو [[arp -a]]) بيطلّع الأجهزة اللي جهازك كلّمها مؤخرًا على نفس الشبكة — من غير ما يبعت أي حاجة:

على جهاز التجربة: **٣ أجهزة** ([[Reachable=1]] و [[Stale=2]]) — منهم الراوتر.

| [[State]] | معناه |
|---|---|
| [[Reachable]] | اتكلّم معاه من ثواني |
| [[Stale]] | اتكلّم معاه من فترة — ممكن يكون لسه موجود |

**والطريقة الكاملة: scan.** [[nmap -sn]] بيبعت لكل عنوان في الشبكة ويشوف مين بيرد. عملته على شبكة Docker صغيرة فيها «طابعة» و«NAS» و«موبايل»:

[[Nmap scan report for 10.20.0.1]] (الراوتر)

[[Nmap scan report for 10.20.0.30]] (الطابعة)

[[Nmap scan report for 10.20.0.40]] (الـ NAS)

[[Nmap scan report for 10.20.0.50]] (الموبايل)

[[Nmap scan report for 10.20.0.2]] (الجهاز اللي بيعمل الـ scan نفسه)

[[Nmap done: 256 IP addresses (5 hosts up) scanned in 1.88 seconds]]

**ومصيدة على جهاز التجربة:** في درس «ping نجح ومفيش جهاز» (تاب CMD)، جهاز التجربة كان بيرد على ping لعناوين مش موجودة. على جهاز زي ده، فحص بالـ ping لوحده هيقول إن الشبكة كلها مليانة أجهزة. و [[nmap]] على نفس الشبكة بيستخدم ARP (مش ping) فبيبقى أدق — بس لو حاجة على جهازك بتتدخل، اختبر النتيجة.`,
          example: R`# Windows (PowerShell):
Get-NetNeighbor -AddressFamily IPv4 | Where-Object State -in 'Reachable','Stale' | Select-Object IPAddress, LinkLayerAddress, State
# Windows (CMD):
arp -a
# Linux:
ip neigh
nmap -sn -n 10.20.0.0/24`,
          lines: [
            R`الأجهزة اللي جهازك عارفها: الـ IP، والـ MAC ([[LinkLayerAddress]])، والحالة. **مبيبعتش حاجة.**`,
            R`نفس الحاجة بالأمر القديم.`,
            R`لينكس: جدول الجيران — نفس [[Get-NetNeighbor]]، الأجهزة اللي جهازك كلّمها مؤخرًا، ومن غير ما يبعت حاجة.`,
            R`**scan**: [[-sn]] = مين موجود بس (من غير بورتات)، و [[-n]] = متدوّرش على أسماء DNS (أسرع). **على شبكتك بس.**`,
          ],
          try: R`شغّل [[Get-NetNeighbor]] وبعدين افتح صفحة الراوتر (غالبًا [[192.168.1.1]]) وقارن بقايمة الأجهزة المتوصلة فيها. ولو عندك [[nmap]] (فيه نسخة ويندوز من nmap.org)، اعمل [[nmap -sn]] على شبكة بيتك وقارن.`,
          deep: {
            why: R`الراوتر عارف كل اللي متوصل بيه، بس مش دايمًا سهل توصل لصفحته. والترمنال بيديك نفس المعلومة في ثانية.`,
            how: R`**ARP:** على نفس الشبكة، الأجهزة بتتكلم بالـ MAC مش بالـ IP. فجهازك بيسأل «مين عنده [[192.168.1.1]]؟» والراوتر يرد بالـ MAC بتاعه، وجهازك يحفظ الرد في جدول. الجدول ده هو اللي [[arp -a]] بيوريه (درس ARP في تاب الشبكات).

**الـ MAC بيقولك الشركة:** أول ٣ أجزاء (٦ حروف) هي كود الشركة المصنّعة (OUI). فـ [[dc-51-93-...]] تقدر تدوّر عليه في أي «MAC vendor lookup» وتعرف ده Samsung ولا TP-Link. (الموبايلات الحديثة بتستخدم MAC عشوائي لكل شبكة للخصوصية، فممكن ميطلعش اسم شركة.)

**ليه [[nmap]] أدق من ping sweep؟** على نفس الشبكة، [[nmap -sn]] بيبعت ARP requests. وأي جهاز على الشبكة **لازم** يرد على ARP عشان يشتغل أصلًا — حتى لو الـ firewall بتاعه مانع ping. فـ ARP بيلاقي أجهزة الـ ping مبيلاقيهاش. (سلوك [[nmap]] من وثائقه.)

**ومن ويندوز من غير nmap:** ping sweep بـ PowerShell 7:

~~~powershell
1..254 | ForEach-Object -Parallel { if (Test-Connection "192.168.1.$_" -Count 1 -TimeoutSeconds 1 -Quiet) { "192.168.1.$_" } } -ThrottleLimit 64
~~~

ده بيبعت ping لكل عنوان — فبيفوّت الأجهزة اللي مانعة ping، وبيتأثر بأي حاجة على جهازك بترد مكانهم. ([[-Parallel]] في PowerShell 7 بس. والأمر ده مااتشغّلش على شبكة حقيقية هنا.)

**والقانون:** فحص شبكتك أو شبكة عندك إذن تفحصها. شبكة الشغل أو السكن أو أي حد تاني من غير إذن — ممنوع في أماكن كتير، وممكن الـ IT يعتبره هجوم.`,
            when: R`جهاز جديد على الشبكة ومش عارف عنوانه، أو شك في جهاز غريب، أو جرد لشبكة بيتك.`,
            mistakes: R`تعتمد على ping sweep لوحده. أو تفحص شبكة مش بتاعتك. أو تفتكر [[Stale]] يعني الجهاز مش موجود.`
          },
          teach: R`## الطريقة الهادية: جهازك عارف مين

~~~powershell
Get-NetNeighbor -AddressFamily IPv4 | Where-Object State -in 'Reachable','Stale' |
  Select-Object IPAddress, LinkLayerAddress, State
~~~

~~~text اتشغّل فعلًا (العناوين اتشالت)
٣ أجهزة:  Reachable=1  Stale=2  — منهم الراوتر
~~~

**مبيبعتش أي حاجة.** ده الجدول اللي جهازك عارفه.

| | |
|---|---|
| [[Reachable]] | من ثواني |
| [[Stale]] | من فترة — ممكن لسه موجود |

---

## ١. الطريقة الكاملة: [[nmap -sn]]

على شبكة Docker فيها «طابعة» و«NAS» و«موبايل»:

~~~bash
nmap -sn -n 10.20.0.0/24
~~~

~~~text اتشغّل فعلًا
Nmap scan report for 10.20.0.1       <-- الراوتر
Nmap scan report for 10.20.0.30      <-- الطابعة
Nmap scan report for 10.20.0.40      <-- الـ NAS
Nmap scan report for 10.20.0.50      <-- الموبايل
Nmap scan report for 10.20.0.2       <-- الجهاز اللي بيعمل الـ scan
Nmap done: 256 IP addresses (5 hosts up) scanned in 1.88 seconds
~~~

---

## ٢. ليه [[nmap]] أدق من ping؟

على نفس الشبكة بيستخدم **ARP**. وأي جهاز لازم يرد على ARP عشان يشتغل — حتى لو مانع ping.

> وجهاز التجربة كان بيرد على ping لعناوين مش موجودة (درس في تاب CMD). على جهاز زي ده، ping sweep هيقول الشبكة كلها مليانة.

---

## ٣. الـ MAC بيقولك الشركة

أول ٦ حروف = الشركة المصنّعة. دوّر عليهم في «MAC vendor lookup».

> الموبايلات الحديثة بتستخدم MAC عشوائي — فممكن ميطلعش اسم.

---

## ٤. **على شبكتك بس**

شبكة الشغل أو السكن من غير إذن = ممنوع في أماكن كتير.

---

## الخلاصة

- [[Get-NetNeighbor]] / [[arp -a]] = مين جهازك عارفه، من غير إرسال.
- [[nmap -sn]] = scan كامل بـ ARP.
- ping sweep بيفوّت وممكن يتخدع.
- شبكتك بس.`,
          sol: R`[[Get-NetNeighbor]] و [[arp -a]] اتشغّلوا قراية بس على جهاز التجربة (العناوين اتشالت). [[nmap -sn]] اتشغّل على شبكة Docker ([[10.20.0.0/24]]) فيها ٣ كونتينرات. والـ ping sweep بـ PowerShell وسلوك ARP في nmap من الوثائق.`,
          solCode: R`Get-NetNeighbor -AddressFamily IPv4 -InterfaceAlias 'Wi-Fi' | Where-Object State -in 'Reachable','Stale','Delay'
#   count: 3   Stale=2 Reachable=1
nmap -sn -n 10.20.0.0/24
#   10.20.0.1 / .30 / .40 / .50 / .2
#   Nmap done: 256 IP addresses (5 hosts up) scanned in 1.88 seconds`
        },

        {
          cmd: "البورتات المفتوحة على جهازك",
          title: "مين فاتح إيه، ومفتوح للشبكة ولا لجهازك بس",
          learn: R`تطلّع البورتات المفتوحة على جهازك واسم البرنامج اللي فاتحها، وتفرّق بين المفتوح للشبكة والمفتوح لجهازك بس.`,
          out: R`تعرف جهازك ظاهر للشبكة بإيه.`,
          use: {
            net: R`كل بورت مفتوح على [[0.0.0.0]] = باب على الشبكة. على واي فاي عام، أي حد في الكافيه يقدر يخبّط عليه.`,
            prog: R`«Port 3000 is already in use» — نفس الأمر بيقولك مين.`,
          },
          desc: R`[[Get-NetTCPConnection -State Listen]] بيطلّع كل بورت جهازك مستني عليه اتصال. ومعاه اسم البرنامج ([[OwningProcess]]).

**على جهاز التجربة (أول ٨):**

| العنوان | البورت | البرنامج |
|---|---|---|
| [[0.0.0.0]] | 135 | svchost |
| (IP الجهاز) | 139 | System |
| [[::]] | 445 | System |
| [[127.0.0.1]] | 1001 | System |
| [[0.0.0.0]] | 5040 | svchost |
| [[::]] | 5746 | Code |
| [[127.0.0.1]] | 5939 | (برنامج تحكم عن بعد) |

**والعدد كله:**

[[0.0.0.0/:: = 20 | loopback = 25]]

**٢٠ بورت مفتوح على الشبكة، و ٢٥ على الجهاز بس.**

| العنوان | مين يوصل |
|---|---|
| [[0.0.0.0]] أو [[::]] | **أي حد على الشبكة** (لو الفايروول سامح) |
| [[127.0.0.1]] أو [[::1]] | جهازك بس |
| IP معين | اللي على الشبكة دي بس |

ودي نفس الفكرة اللي في درس «البورت المفتوح للدنيا» في تاب docker.

**ومن بره:** عملت [[nmap]] على أجهزة شبكة Docker:

[[10.20.0.30: 80/tcp open http]] — و [[10.20.0.40: 445/tcp open microsoft-ds]]

يعني [[nmap]] بيوريك اللي جهاز تاني شايفه — وده اللي يهم.`,
          example: R`# Windows (PowerShell):
Get-NetTCPConnection -State Listen | Sort-Object LocalPort -Unique | Select-Object LocalAddress, LocalPort, @{n='Process';e={(Get-Process -Id $_.OwningProcess -ErrorAction SilentlyContinue).ProcessName}}
Get-NetTCPConnection -State Listen | Where-Object LocalAddress -in '0.0.0.0','::' | Measure-Object
# Windows (CMD):
netstat -ano | findstr LISTENING
# Linux:
ss -tlnp
nmap -n -Pn --top-ports 100 10.20.0.30`,
          lines: [
            R`كل بورت مستني اتصال، والعنوان، واسم البرنامج من [[OwningProcess]].`,
            R`كام واحد مفتوح على كل الواجهات (يعني على الشبكة).`,
            R`CMD: نفس القايمة، و [[-o]] بيطلّع رقم البرنامج (PID) — واسمه بـ [[tasklist /fi "PID eq N"]].`,
            R`لينكس: [[-t]] TCP، و [[-l]] اللي مستني، و [[-n]] أرقام، و [[-p]] البرنامج (محتاج [[sudo]] لبرامج يوزرز تانيين).`,
            R`**من بره**: اللي جهاز تاني شايفه. أكتر ١٠٠ بورت شائعة.`,
          ],
          try: R`شغّل الأمر الأول، ولكل بورت على [[0.0.0.0]] اسأل: البرنامج ده محتاج حد من الشبكة يوصله؟ ولو عندك سيرفر تطوير شغّال (Node أو Python)، شوف هو على [[0.0.0.0]] ولا [[127.0.0.1]].`,
          deep: {
            why: R`كل بورت مفتوح للشبكة ممكن يكون فيه ثغرة. والبورت اللي مش محتاجه مقفول أأمن من بورت مفتوح ومحمي.`,
            how: R`**البورتات اللي هتلاقيها على أي ويندوز:**

| البورت | إيه |
|---|---|
| 135 | RPC — خدمات ويندوز |
| 139 / 445 | مشاركة الملفات (SMB) |
| 5040 | خدمة ويندوز (CDP) |
| 3389 | Remote Desktop — لو مفتوح، **اتأكد إنك قاصده** |

(أدوار البورتات دي من وثائق Microsoft وقوايم IANA.)

**الفايروول:** بورت على [[0.0.0.0]] مش معناه إنه مفتوح من بره فعلًا — Windows Firewall ممكن يكون مانعه. والاختبار الحقيقي هو [[nmap]] من جهاز تاني على نفس الشبكة (أو [[Test-NetConnection IP -Port N]] من جهاز تاني). والفايروول مش بديل إن البرنامج نفسه يسمع على [[127.0.0.1]] لما مش محتاج الشبكة.

**سيرفرات التطوير:** Vite و Next.js و Python [[http.server]] بيختلفوا:

| | الافتراضي |
|---|---|
| [[vite]] | [[localhost]] — وبـ [[--host]] بيبقى على الشبكة |
| [[python -m http.server]] | [[0.0.0.0]] — **على الشبكة** |
| [[next dev]] | على كل الواجهات |

(الافتراضيات دي من وثائق كل أداة، وممكن تتغيّر بين النسخ — [[http.server]] على [[0.0.0.0]] اتشاف في معمل تاب الشبكات.)

فـ [[python -m http.server]] على واي فاي عام = أي حد في المكان يقدر يشوف ملفات الفولدر اللي انت فيه. استخدم [[--bind 127.0.0.1]].

**و [[nmap]] على جهاز:** [[-Pn]] = متتأكدش إنه موجود الأول (افترض إنه موجود)، و [[--top-ports 100]] = أكتر ١٠٠ بورت شائعة. والنتيجة [[open]] أو [[closed]] أو [[filtered]] (فايروول بيرمي — نفس الـ timeout في درس «اقرا الفشل» في تاب الشبكات).`,
            when: R`قبل ما تقعد على واي فاي عام، وبعد ما تسطّب برنامج جديد، وأي وقت بورت «in use».`,
            mistakes: R`تفتكر [[0.0.0.0]] = مفتوح من بره (الفايروول ممكن يمنع). أو العكس: تعتمد على الفايروول وتسيب كل حاجة على [[0.0.0.0]]. أو [[python -m http.server]] على شبكة عامة.`
          },
          teach: R`## مين مستني اتصال

~~~powershell
Get-NetTCPConnection -State Listen | Sort-Object LocalPort -Unique |
  Select-Object LocalAddress, LocalPort,
    @{n='Process';e={(Get-Process -Id $_.OwningProcess -ErrorAction SilentlyContinue).ProcessName}}
~~~

~~~text اتشغّل فعلًا (أول ٨، والعناوين الحقيقية اتشالت)
LocalAddress LocalPort Process
------------ --------- -------
0.0.0.0            135 svchost
(IP الجهاز)        139 System
::                 445 System
127.0.0.1         1001 System
0.0.0.0           5040 svchost
::                5746 Code
127.0.0.1         5939 (برنامج تحكم عن بعد)
~~~

---

## ١. للشبكة ولا لجهازك؟

~~~text اتشغّل فعلًا
0.0.0.0/:: = 20 | loopback = 25
~~~

| | مين يوصل |
|---|---|
| [[0.0.0.0]] / [[::]] | **أي حد على الشبكة** (لو الفايروول سامح) |
| [[127.0.0.1]] / [[::1]] | جهازك بس |

---

## ٢. ومن بره

~~~bash
nmap -n -Pn --top-ports 100 10.20.0.30 10.20.0.40
~~~

~~~text اتشغّل فعلًا · شبكة Docker
Nmap scan report for 10.20.0.30
80/tcp open  http
Nmap scan report for 10.20.0.40
445/tcp open  microsoft-ds
~~~

**[[nmap]] من جهاز تاني = اللي فعلًا ظاهر.** ده الاختبار الحقيقي.

---

## ٣. سيرفرات التطوير

| | الافتراضي |
|---|---|
| [[python -m http.server]] | **[[0.0.0.0]]** |
| [[vite]] | [[localhost]] |

على واي فاي عام: [[python -m http.server --bind 127.0.0.1]].

---

## الخلاصة

- [[Get-NetTCPConnection -State Listen]] + اسم البرنامج.
- [[0.0.0.0]] = باب على الشبكة.
- الفايروول ممكن يمنع — و [[nmap]] من بره بيقول الحقيقة.
- البرنامج اللي مش محتاج الشبكة: [[127.0.0.1]].`,
          sol: R`[[Get-NetTCPConnection]] والعدد اتشغّلوا على جهاز التجربة (العناوين وأسماء بعض البرامج اتشالت). [[nmap --top-ports]] على شبكة Docker. أدوار البورتات وافتراضيات سيرفرات التطوير من الوثائق.`,
          solCode: R`Get-NetTCPConnection -State Listen | ... Process
#   0.0.0.0:135 svchost | :::445 System | 127.0.0.1:1001 System | :::5746 Code ...
# 0.0.0.0/:: = 20 | loopback = 25
nmap -n -Pn --top-ports 100 10.20.0.30 10.20.0.40
#   10.20.0.30  80/tcp open http   |   10.20.0.40  445/tcp open microsoft-ds`
        }
      ]
    },

    {
      t: "اعمل سكربت وشغّله",
      l: 2,
      time: R`حوالي ساعة ونص`,
      goal: [
        R`تعمل سكربت بكل نوع ([[.bat]] و [[.ps1]] و [[.sh]] و [[.py]] و [[.js]]) وتشغّله، وتبعت له arguments فيها مسافات.`,
        R`تعرف ليه السكربت «مش موجود» وهو قدامك، وتخليه يشتغل باسمه من أي فولدر.`,
        R`تعرف كل نوع بيعمل إيه لما تدوس عليه دبل كليك، وتعمل اختصار بيشغّل [[.ps1]] صح.`,
        R`تحل «PowerShell رافض يشغّل السكربت» من غير ما تقفل الحماية.`,
        R`تكتب سكربت bash على ويندوز وتشغّله على لينكس من غير مشاكل.`,
      ],
      use: {
        work: R`أي حاجة بتعملها كل يوم بإيدك (باك أب، تجهيز مشروع، تنضيف) سكربت واحد بيعملها في ثانية. والدروس دي هي اللي بتخلي السكربت يشتغل فعلًا عند أي حد.`,
        prog: R`[[npm run]] و [[package.json]] و CI كلهم بيشغّلوا سكربتات. ولما سكربت يشتغل عندك ويقع على السيرفر، السبب غالبًا حاجة من اللي هنا (CRLF، أو [[chmod]]، أو الـ PATH).`,
        cs: R`الشيل بيدوّر على الأوامر في أماكن معينة بترتيب معين. ولما تفهم الترتيب ده، «command not found» بتبقى معلومة مش لغز.`,
      },
      lab: R`# Windows (PowerShell):
New-Item -ItemType Directory $HOME\scripts -Force; Set-Location $HOME\scripts
# Linux:
mkdir -p ~/scripts && cd ~/scripts`,
      projects: [
        { t: R`فولدر سكربتاتك`, what: R`فولدر [[~/bin]] (أو [[$HOME\bin]] على ويندوز) فيه ٣ سكربتات بتستخدمها كل يوم، وحطه في الـ PATH بشكل دايم. وجرّب كل واحد باسمه من فولدر تاني.` },
        { t: R`اختصار على سطح المكتب`, what: R`[[health.ps1]] من مشروع التاب ده: اعمله ملف [[.bat]] صغير جنبه (درس «الدبل كليك»)، واعمل اختصار للـ [[.bat]] على سطح المكتب. دوس عليه ولازم التقرير يطلع ويفضل مفتوح.` },
        { t: R`شغّله لوحده`, what: R`جدول سكربت يشتغل كل يوم: [[schtasks]] في تاب CMD، أو [[Register-ScheduledTask]] في تاب PowerShell، أو [[crontab -e]] في تاب bash. والدروس دي بتشرح إزاي تتأكد إنه اشتغل فعلًا.` },
      ],
      n: R`كل سكربت هنا اتعمل واتشغّل: PowerShell 7.6 و CMD على ويندوز 11، و bash على أوبونتو 24.04 جوه Docker، و Python 3.14 و Node 24. والسكربتات الحقيقية في فولدر تجربة، ومفيش إعداد في الجهاز اتغيّر`,
      items: [
        {
          cmd: "سكربت واحد بكل لغة",
          title: "خمس ملفات، خمس طرق تشغيل، ونفس الـ arguments",
          learn: R`تعمل سكربت بخمس أنواع، وتشغّل كل واحد، وتبعت له arguments فيها مسافة.`,
          out: R`تعرف تشغّل أي سكربت يجيلك، وتقرا الـ arguments في أي لغة.`,
          use: {
            prog: R`كل لغة بتقرا الـ arguments بطريقة: [[%1]] و [[$args]]/[[param]] و [[$1]] و [[sys.argv]] و [[process.argv]]. والفكرة واحدة.`,
            work: R`سكربت من غير arguments بيعمل حاجة واحدة. ومعاها بيعمل نفس الحاجة على أي فولدر أو أي اسم.`,
          },
          desc: R`كل سكربت هو **ملف نص** فيه أوامر. الفرق بين الأنواع هو **مين بيقراه**:

| الامتداد | مين بيشغّله | تشغّله إزاي |
|---|---|---|
| [[.bat]] / [[.cmd]] | CMD | [[hello.bat]] من CMD، أو [[.\hello.bat]] من PowerShell |
| [[.ps1]] | PowerShell | [[.\hello.ps1]] أو [[pwsh -File hello.ps1]] |
| [[.sh]] | bash | [[./hello.sh]] (بعد [[chmod +x]]) أو [[bash hello.sh]] |
| [[.py]] | Python | [[python hello.py]] |
| [[.js]] | Node | [[node hello.js]] |

**عملت نفس السكربت بالخمسة،** وبعت لكل واحد اسم فيه مسافة ([["Ahmed Ali"]]) وكلمة تانية:

| السكربت | الناتج |
|---|---|
| [[.bat]] | [[hello from bat: [x] [y]]] |
| [[.ps1]] | [[hello from ps1: Ahmed Ali]] (مرتين بـ [[-Times 2]]) |
| [[.sh]] | [[hello from sh: [Ahmed Ali] [b] (count=2)]] |
| [[.py]] | [[hello from py: ['Ahmed Ali', 'second']]] |
| [[.js]] | [[hello from js: [ 'Ahmed Ali', 'second' ]]] |

**علامات التنصيص حوالين [["Ahmed Ali"]] هي اللي خلّته argument واحد.** من غيرها، [[Ahmed]] و [[Ali]] بيبقوا اتنين، والسكربت بيشوف أول واحد بس.

**ولاحظ PowerShell:** بدل [[%1]] و [[$1]] (رقم المكان)، [[param()]] بيدّيك **أسماء**: [[-Name "Ahmed Ali" -Times 2]]. وده أوضح لما الـ arguments تبقى كتير.`,
          example: R`# Windows (CMD):
hello.bat "Ahmed Ali" second
# Windows (PowerShell):
.\hello.bat x y
pwsh -NoProfile -File .\hello.ps1 -Name "Ahmed Ali" -Times 2
# Linux:
chmod +x hello.sh && ./hello.sh "Ahmed Ali" b
python hello.py "Ahmed Ali" second
node hello.js "Ahmed Ali" second`,
          lines: [
            R`من CMD: اسم الملف لوحده بيشغّله لو انت في نفس الفولدر. وجواه [[%~1]] هو أول argument من غير علامات التنصيص، و [[%~2]] التاني.`,
            R`من PowerShell **لازم** [[.\]] قبل الاسم — من غيرها PowerShell بيقول «not recognized» حتى لو الملف قدامك (الدرس الجاي بيشرح ليه).`,
            R`[[-File]] بيشغّل السكربت، و [[-NoProfile]] بيمنع ملف الـ profile بتاعك يأثر عليه. والـ arguments بالاسم لأن السكربت معرّفهم في [[param()]].`,
            R`[[chmod +x]] بيدّي الملف صلاحية التشغيل (من غيرها [[Permission denied]])، و [[./]] بيقول «من الفولدر ده». وجوه السكربت [[$1]] و [[$2]] و [[$#]] (العدد).`,
            R`Python: [[sys.argv]] فيه كل الـ arguments، وأول واحد ([[sys.argv[0] ]]) هو اسم السكربت نفسه — عشان كده بناخد [[sys.argv[1:] ]].`,
            R`Node: [[process.argv]] فيه مسار Node ومسار السكربت الأول، فالـ arguments الحقيقية بتبدأ من [[slice(2)]].`,
          ],
          try: R`اعمل [[hello.ps1]] فيه [[param([string]$Name = "world")]] وشغّله مرة من غير [[-Name]] (هيطبع [[world]])، ومرة بـ [[-Name "اسمك"]]. وبعدين جرّب [[./hello.sh Ahmed Ali]] من غير علامات تنصيص وشوف [[count]] بقت كام.`,
          deep: {
            why: R`كل لغة بتدّيك نفس الحاجة بأسماء مختلفة. ولو فهمت الفكرة مرة (السكربت بياخد كلام بعد اسمه، والمسافة بتفصل، وعلامات التنصيص بتجمّع)، كل اللغات بتبقى سهلة.`,
            how: R`**السكربتات اللي اتجرّبت (حرفيًا):**

~~~bat hello.bat
@echo off
echo hello from bat: [%~1] [%~2]
~~~

~~~powershell hello.ps1
param([string]$Name = "world", [int]$Times = 1)
1..$Times | ForEach-Object { "hello from ps1: $Name" }
~~~

~~~bash hello.sh
#!/usr/bin/env bash
echo "hello from sh: [$1] [$2] (count=$#)"
~~~

~~~python hello.py
import sys
print("hello from py:", sys.argv[1:])
~~~

~~~js hello.js
console.log("hello from js:", process.argv.slice(2));
~~~

**[[%1]] مقابل [[%~1]] في batch:** [[%1]] بيسيب علامات التنصيص زي ما هي ([["Ahmed Ali"]])، و [[%~1]] بيشيلها ([[Ahmed Ali]]). وده مهم لما تحط الـ argument جوه مسار: [["%~1\file.txt"]] صح، و [["%1\file.txt"]] بيبقى فيه علامات تنصيص مكررة.

**[[%*]] و [[$@]] و [[@args]]:** «كل الـ arguments زي ما هي» — مفيدة لما سكربت بينادي سكربت تاني ويعدّي له كل حاجة (زي الـ launcher في درس «الدبل كليك»).

**[[param()]] في PowerShell بيدّيك أكتر من الأسماء:** الأنواع ([[[int]]] بيرفض «abc»)، والقيم الافتراضية، و [[[Parameter(Mandatory)]]] لو لازم. وكل ده في تاب PowerShell بتفصيل.

**وفي Python و Node لسكربت حقيقي:** [[argparse]] (Python) و [[parseArgs]] من [[node:util]] (Node) بيعملوا اللي [[param()]] بيعمله: أسماء، وأنواع، و [[--help]]. (دروس في تابات Python و Node.)`,
            when: R`أي حاجة بتعملها بإيدك أكتر من مرتين.`,
            mistakes: R`تنسى علامات التنصيص حوالين مسار أو اسم فيه مسافة. أو [[%1]] جوه مسار فيبقى فيه [[""]]. أو [[sys.argv[0] ]] وانت فاكره أول argument. أو [[hello.ps1]] من غير [[.\]].`
          },
          teach: R`## السكربت = ملف نص فيه أوامر

الفرق بين الأنواع: **مين بيقراه**.

| | مين | تشغّله |
|---|---|---|
| [[.bat]] | CMD | [[hello.bat]] |
| [[.ps1]] | PowerShell | [[.\hello.ps1]] |
| [[.sh]] | bash | [[./hello.sh]] |
| [[.py]] | Python | [[python hello.py]] |
| [[.js]] | Node | [[node hello.js]] |

---

## ١. السكربتات الخمسة

~~~bat hello.bat
@echo off
echo hello from bat: [%~1] [%~2]
~~~

~~~powershell hello.ps1
param([string]$Name = "world", [int]$Times = 1)
1..$Times | ForEach-Object { "hello from ps1: $Name" }
~~~

~~~bash hello.sh
#!/usr/bin/env bash
echo "hello from sh: [$1] [$2] (count=$#)"
~~~

~~~python hello.py
import sys
print("hello from py:", sys.argv[1:])
~~~

~~~js hello.js
console.log("hello from js:", process.argv.slice(2));
~~~

---

## ٢. شغّلهم

~~~text اتشغّل فعلًا
.\hello.bat x y                                  ->  hello from bat: [x] [y]
pwsh -File .\hello.ps1 -Name "Ahmed Ali" -Times 2 ->  hello from ps1: Ahmed Ali   (مرتين)
./hello.sh "Ahmed Ali" b                          ->  hello from sh: [Ahmed Ali] [b] (count=2)
python hello.py "Ahmed Ali" second                ->  hello from py: ['Ahmed Ali', 'second']
node hello.js "Ahmed Ali" second                  ->  hello from js: [ 'Ahmed Ali', 'second' ]
~~~

> **علامات التنصيص هي اللي خلّت [[Ahmed Ali]] argument واحد.** من غيرها، اتنين.

---

## ٣. كل لغة بتقرا الـ arguments إزاي

| | أول argument | الكل | العدد |
|---|---|---|---|
| batch | [[%~1]] | [[%*]] | — |
| PowerShell | [[param($Name)]] بالاسم | [[$args]] | [[$args.Count]] |
| bash | [[$1]] | [[$@]] | [[$#]] |
| Python | [[sys.argv[1] ]] | [[sys.argv[1:] ]] | [[len(sys.argv) - 1]] |
| Node | [[process.argv[2] ]] | [[process.argv.slice(2)]] | [[process.argv.length - 2]] |

> Python و Node: أول عناصر هي اسم البرنامج والسكربت نفسه، مش الـ arguments.

---

## الخلاصة

- السكربت ملف نص، والامتداد بيحدد مين يقراه.
- علامات التنصيص حوالين أي حاجة فيها مسافة.
- [[%~1]] في batch بيشيل علامات التنصيص.
- PowerShell بالأسماء ([[param()]]) — الأوضح.`,
          sol: R`السكربتات الخمسة اتعملت واتشغّلت: batch و PowerShell 7.6 على ويندوز 11، و bash على أوبونتو 24.04 جوه Docker، و Python 3.14.3، و Node 24.22.1.`,
          solCode: R`.\hello.bat x y                                     # hello from bat: [x] [y]
pwsh -NoProfile -File .\hello.ps1 -Name "Ahmed Ali" -Times 2
#   hello from ps1: Ahmed Ali
#   hello from ps1: Ahmed Ali
./hello.sh "Ahmed Ali" b                             # hello from sh: [Ahmed Ali] [b] (count=2)
python hello.py "Ahmed Ali" second                   # hello from py: ['Ahmed Ali', 'second']
node hello.js "Ahmed Ali" second                     # hello from js: [ 'Ahmed Ali', 'second' ]`
        },

        {
          cmd: "ليه مش لاقي السكربت وهو قدامه",
          title: ".\\ و ./ و PATH: الشيل بيدوّر فين",
          learn: R`تعرف الأماكن اللي الشيل بيدوّر فيها على الأوامر، وتخلي سكربتك يشتغل باسمه من أي فولدر.`,
          out: R`«not recognized» و «command not found» بتعرف سببهم في ثانية.`,
          use: {
            work: R`سكربت عملته في فولدر، وعايز تشغّله وانت في فولدر تاني من غير ما تكتب المسار كله.`,
            cs: R`الشيل مش بيدوّر في «كل الجهاز» — بيدوّر في فولدرات الـ PATH بالترتيب. وده اللي بيخلي [[node]] يشتغل من أي مكان.`,
          },
          desc: R`**الملف قدامك، والشيل بيقول مش موجود:**

| الشيل | الأمر | النتيجة |
|---|---|---|
| PowerShell | [[hello.bat x]] | **[[The term 'hello.bat' is not recognized]]** |
| PowerShell | [[.\hello.bat x]] | [[hello from bat: [x] []]] |
| bash | [[hello.sh x]] | **[[hello.sh: command not found]]** ([[exit=127]]) |
| bash | [[./hello.sh x]] | يشتغل |

**ليه؟** PowerShell و bash **مبيدوّروش في الفولدر الحالي** لما تكتب اسم من غير مسار. ده مقصود للأمان: لو حد حط ملف اسمه [[ls]] أو [[git]] في فولدر انت فاتحه، مش هيشتغل بدل الأمر الحقيقي. ف [[.\]] و [[./]] بتقول «أنا قاصد الملف اللي هنا».

**وCMD بيدوّر في الفولدر الحالي** (عشان كده [[hello.bat]] لوحدها بتشتغل فيه).

**عشان تشغّله من أي مكان: حط الفولدر في الـ PATH.** جرّبت:

[[$env:PATH = "<فولدر السكربتات>;" + $env:PATH]] وبعدين [[cd $HOME]] و [[hello.bat x y]] ← [[hello from bat: [x] [y]]]

**ومفاجأتين في نفس التجربة:**

**١. [[hello]] من غير امتداد في PowerShell شغّل [[hello.ps1]] مش [[hello.bat]].** والفولدر كان فيه الاتنين. و [[Get-Command hello]] قال [[hello.ps1]].

**٢. [[hello]] في CMD شغّل [[hello.bat]]**، و [[where hello]] طلّع [[hello.bat]] **و [[hello.js]]** — لأن [[.JS]] في [[PATHEXT]]. يعني لو مكانش فيه [[.bat]]، CMD كان هيشغّل الـ [[.js]] بـ Windows Script Host (الدرس الجاي).`,
          example: R`# Windows (PowerShell):
.\hello.bat x y
$env:PATH = "$HOME\scripts;" + $env:PATH
Get-Command hello
$env:PATHEXT
# Linux:
./hello.sh x
mkdir -p ~/bin && cp hello.sh ~/bin/hello && export PATH="$HOME/bin:$PATH"
hello "من أي مكان"`,
          lines: [
            R`[[.\]] = «من الفولدر ده». من غيرها PowerShell مبيدوّرش هنا، وبيقول «not recognized».`,
            R`بيضيف فولدر السكربتات **في أول** الـ PATH للجلسة دي بس (لما تقفل الترمنال بيروح). و [[;]] بتفصل الفولدرات على ويندوز.`,
            R`بيقولك الاسم ده هيشغّل أنهي ملف بالظبط — مفيد لما يبقى فيه أكتر من حاجة بنفس الاسم.`,
            R`الامتدادات اللي CMD بيعتبرها «قابلة للتشغيل» من غير ما تكتبها، بالترتيب. و [[.ps1]] **مش** فيها.`,
            R`[[./]] = «من الفولدر ده». من غيرها bash بيقول [[command not found]] ([[exit=127]]).`,
            R`فولدر [[~/bin]] للسكربتات، ونسخة من غير امتداد اسمها [[hello]]، والفولدر في أول الـ PATH للجلسة دي. و [[:]] بتفصل الفولدرات على لينكس.`,
            R`دلوقتي باسمه من أي فولدر — وطلع [[hello from sh: [من أي مكان]]].`,
          ],
          try: R`اعمل فولدر [[$HOME\scripts]] وحط فيه [[hello.bat]]، وضيفه للـ PATH بالسطر اللي فوق، وروح لأي فولدر تاني وشغّله باسمه. وبعدين اقفل الترمنال وافتحه وجرّب تاني — هيقولك «not recognized» لأن الإضافة كانت للجلسة بس.`,
          deep: {
            why: R`الشيل محتاج يعرف أي اسم بيقصد أنهي برنامج، من غير ما يدوّر في كل الديسك. فالـ PATH قايمة قصيرة بالأماكن اللي يدوّر فيها، بالترتيب، وأول واحد يلاقيه يكسب.`,
            how: R`**الترتيب في PowerShell** (من الوثائق [[about_Command_Precedence]]): alias، ثم function، ثم cmdlet، ثم الملفات في الـ PATH. وجوه الـ PATH، لو فيه [[hello.ps1]] و [[hello.bat]] في نفس الفولدر، اتشاف هنا إن [[hello.ps1]] كسب.

**والترتيب في CMD:** الفولدر الحالي الأول، وبعدين الـ PATH. ولكل فولدر، الامتدادات بترتيب [[PATHEXT]]:

~~~text اتشغّل فعلًا
.COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC;.CPL
~~~

[[.BAT]] قبل [[.JS]]، فـ [[hello.bat]] كسب.

**تخليها دايمة:**

| | |
|---|---|
| ويندوز | Settings ← «Edit environment variables for your account» ← Path ← New. (أو [[setx]] — بس [[setx]] بيقطع عند ١٠٢٤ حرف، وده خطر على PATH طويل — درس [[set / setx]] في تاب CMD) |
| bash | سطر [[export PATH="$HOME/bin:$PATH"]] في آخر [[~/.bashrc]] (درس «خلّي التغيير يفضل») |
| أوبونتو | [[~/.profile]] الافتراضي بيضيف [[~/bin]] لوحده لو الفولدر موجود وانت عملت login من جديد |

(سطر أوبونتو من [[~/.profile]] الافتراضي — مااتجرّبش بـ login جديد هنا.)

**مصيدة من التجربة:** [[Set-Location]] في PowerShell بيغيّر مكان PowerShell بس، **مش** فولدر العملية نفسها. فلما شغّلت [[cmd /c hello.bat]] من PowerShell بعد [[Set-Location]]، CMD بدأ في الفولدر القديم وقال «not recognized»:

~~~text اتشغّل فعلًا
PS location: scripts
process dir: full stack road map
~~~

الحل: المسار الكامل للسكربت، أو [[Start-Process -WorkingDirectory]].

**وفي ويندوز بعد ما تغيّر الـ PATH الدايم:** النوافذ المفتوحة مش هتشوف التغيير. افتح نافذة جديدة.`,
            when: R`أول ما تعمل سكربت هتستخدمه كتير، أو تسطّب برنامج ويقولك «not recognized».`,
            mistakes: R`تحط السكربت في [[C:\Windows]] «عشان يشتغل من أي حتة». أو [[setx PATH]] على PATH طويل فيتقطع. أو تنسى إن النوافذ المفتوحة مش بتشوف PATH الجديد. أو سكربتين بنفس الاسم وتستغرب أنهي اشتغل.`
          },
          teach: R`## الملف قدامك، والشيل بيقول مش موجود

~~~text اتشغّل فعلًا
PowerShell:  hello.bat x     ->  The term 'hello.bat' is not recognized ...
PowerShell:  .\hello.bat x   ->  hello from bat: [x] []
bash:        hello.sh x      ->  hello.sh: command not found     (exit=127)
bash:        ./hello.sh x    ->  يشتغل
~~~

---

## ١. ليه؟

PowerShell و bash **مبيدوّروش في الفولدر الحالي** لأسم من غير مسار.

> **للأمان:** لو حد حط ملف اسمه [[git]] في فولدر انت فاتحه، مش هيشتغل بدل [[git]] الحقيقي.

[[.\]] و [[./]] = «أنا قاصد الملف اللي هنا».

و CMD بيدوّر في الفولدر الحالي — فـ [[hello.bat]] لوحدها بتشتغل فيه.

---

## ٢. من أي مكان: الـ PATH

~~~powershell
$env:PATH = "$HOME\scripts;" + $env:PATH      # للجلسة دي بس
Set-Location $HOME
hello.bat x y
~~~

~~~text اتشغّل فعلًا
hello from bat: [x] [y]
~~~

~~~bash لينكس
mkdir -p ~/bin && cp hello.sh ~/bin/hello && export PATH="$HOME/bin:$PATH"
cd / && hello "من أي مكان"
~~~

~~~text اتشغّل فعلًا
hello from sh: [من أي مكان]
~~~

---

## ٣. سكربتين بنفس الاسم: مين يكسب؟

~~~text اتشغّل فعلًا — الفولدر فيه hello.bat و hello.ps1 و hello.js
PowerShell:  hello              ->  hello from ps1: x
             Get-Command hello  ->  hello.ps1
CMD:         hello              ->  hello from bat: [x] []
             where hello        ->  ...\hello.bat
                                    ...\hello.js
~~~

| | بيختار |
|---|---|
| PowerShell | [[.ps1]] |
| CMD | بترتيب [[PATHEXT]] — [[.BAT]] قبل [[.JS]] |

> **و [[.JS]] في [[PATHEXT]].** لو مفيش [[.bat]]، CMD هيشغّل الـ [[.js]] بـ Windows Script Host. الدرس الجاي.

---

## ٤. مصيدة: [[Set-Location]] مش بيغيّر فولدر العملية

~~~text اتشغّل فعلًا
PS location: scripts
process dir: full stack road map
~~~

فـ [[cmd /c hello.bat]] من PowerShell بدأ في الفولدر **القديم**. الحل: المسار الكامل.

---

## ٥. خليها دايمة

| | |
|---|---|
| ويندوز | Settings ← «Edit environment variables for your account» ← Path |
| bash | [[export PATH=...]] في آخر [[~/.bashrc]] |

> النوافذ المفتوحة مش بتشوف الـ PATH الجديد. **نافذة جديدة.**

---

## الخلاصة

- [[.\]] و [[./]] للفولدر الحالي.
- الـ PATH = الأماكن اللي الشيل بيدوّر فيها.
- PowerShell بيفضّل [[.ps1]]، و CMD بيمشي بـ [[PATHEXT]].
- [[Set-Location]] مش بيغيّر فولدر العملية.`,
          sol: R`كل الحالات اتشغّلت: PowerShell 7.6 و CMD على ويندوز 11 (والـ PATH اتغيّر للجلسة بس)، و bash على أوبونتو 24.04 جوه Docker. ترتيب الأوامر في PowerShell من [[about_Command_Precedence]]، وسطر أوبونتو في [[~/.profile]] وحد [[setx]] من الوثائق.`,
          solCode: R`# PowerShell:  hello.bat x    ->  The term 'hello.bat' is not recognized ...
#              .\hello.bat x  ->  hello from bat: [x] []
# bash:        hello.sh x     ->  hello.sh: command not found   (exit=127)
# بعد PATH:    hello.bat x y (من $HOME)  ->  hello from bat: [x] [y]
# نفس الاسم:   PowerShell -> hello.ps1   |   CMD -> hello.bat (و where بيطلّع hello.js كمان)
# $env:PATHEXT  ->  .COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC;.CPL`
        },

        {
          cmd: "الدبل كليك: كل نوع بيعمل إيه",
          title: ".bat بيقفل على طول، و .ps1 بيتفتح للتعديل، و .js بيقع",
          learn: R`تعرف ويندوز بيعمل إيه مع كل نوع لما تدوس عليه، وتعمل ملف بيشغّل [[.ps1]] بدبل كليك صح.`,
          out: R`سكربت تديه لحد مش مبرمج، يدوس عليه، ويشتغل.`,
          use: {
            work: R`حد في البيت أو الشغل مش هيفتح ترمنال. محتاج حاجة يدوس عليها.`,
          },
          desc: R`ويندوز بيقرر يعمل إيه مع كل امتداد من **الـ file association**. و [[ftype]] بيوريك الأمر:

| الامتداد | [[ftype]] على جهاز التجربة | يعني |
|---|---|---|
| [[.bat]] | [[batfile="%1" %*]] | بيتشغّل على طول |
| [[.sh]] | [[sh_auto_file="C:\Program Files\Git\git-bash.exe" --no-cd "%L" %*]] | بيفتح Git Bash (لأنه متسطّب) |
| [[.js]] | [[JSFile=C:\Windows\System32\WScript.exe "%1" %*]] | **Windows Script Host، مش Node** |
| [[.ps1]] | مربوط بتطبيق (على جهاز التجربة AppX) | **بيتفتح للتعديل، مش للتشغيل** |

**تلات مشاكل بتيجي من الجدول ده:**

**١. [[.js]] بيقع.** شغّلت [[hello.js]] بـ Windows Script Host:

[[hello.js(1, 1) JavaScript runtime error: 'console' is undefined]]

لأن ده JScript قديم من التسعينات، مش Node. فلو حد دوس دبل كليك على سكربت Node، هيشوف رسالة الخطأ دي.

**٢. [[.ps1]] بيتفتح في محرر.** ده مقصود من Microsoft للأمان: عشان محدش يشغّل سكربت بالغلط بدوسة.

**٣. [[.bat]] بيشتغل وبيقفل على طول.** النافذة بتختفي قبل ما تقرا الناتج. والحل [[pause]] في الآخر.

**والحل للتلاتة: ملف [[.bat]] صغير جنب السكربت بيشغّله صح:**

[[@pwsh -NoProfile -ExecutionPolicy Bypass -File "%~dp0hello.ps1" %*]]

[[@pause]]

جرّبته وعدّيت له arguments: [[hello from ps1: viaBat]] ثم [[Press any key to continue . . .]].`,
          example: R`# Windows (CMD):
ftype batfile
ftype JSFile
assoc .ps1
# run-hello.bat — ملف صغير بيشغّل hello.ps1 بدبل كليك:
@pwsh -NoProfile -ExecutionPolicy Bypass -File "%~dp0hello.ps1" %*
@pause`,
          lines: [
            R`ويندوز بيعمل إيه مع [[.bat]]: [[batfile="%1" %*]] = شغّله زي ما هو.`,
            R`ومع [[.js]]: [[WScript.exe]] — Windows Script Host، **مش Node**. فسكربت Node بدبل كليك بيقع بـ [['console' is undefined]].`,
            R`[[.ps1]] مربوط بإيه. على جهاز التجربة طلّع «File association not found» من [[assoc]] لأنه مربوط بتطبيق في مكان تاني من الـ registry — والنتيجة إنه بيتفتح للتعديل.`,
            R`**الـ launcher:** [[@]] بتمنع السطر يتطبع. و [[-ExecutionPolicy Bypass]] للتشغيل ده بس (مش بيغيّر إعداد الجهاز). و [[%~dp0]] = فولدر الـ [[.bat]] نفسه، فبيلاقي [[hello.ps1]] جنبه من أي مكان اتداس منه. و [[%*]] بيعدّي كل الـ arguments.`,
            R`[[pause]] بيوقّف النافذة عشان تقرا الناتج قبل ما تقفل.`,
          ],
          try: R`اعمل [[run-hello.bat]] بالسطرين دول جنب [[hello.ps1]]، ودوس عليه دبل كليك من File Explorer. لازم تشوف [[hello from ps1: world]] والنافذة مستنياك. وبعدين اعمل له اختصار على سطح المكتب (Right click ← Send to ← Desktop).`,
          flag: "script",
          deep: {
            why: R`الدبل كليك هو الطريقة اللي أغلب الناس بتشغّل بيها حاجة. وكل نوع ويندوز بيتعامل معاه بطريقة، واتنين منهم (الـ [[.js]] والـ [[.ps1]]) مش بيعملوا اللي انت متوقعه.`,
            how: R`**ليه [[.ps1]] مش بيشتغل بدبل كليك؟** Microsoft قررت كده عشان السكربتات اللي بتيجي في إيميل أو من النت متشتغلش بدوسة واحدة. وده من أسباب إن الـ execution policy موجودة (الدرس الجاي). (من وثائق Microsoft [[about_Execution_Policies]].)

**في File Explorer فيه «Run with PowerShell»** لما تدوس كليك يمين على [[.ps1]]. بس بيقفل النافذة على طول بعد ما يخلص — زي [[.bat]] من غير [[pause]]. فالـ launcher أحسن.

**[[%~dp0]] بالتفصيل:** [[%0]] = مسار السكربت نفسه. و [[~d]] = حرف الدرايف، و [[~p]] = المسار. فـ [[%~dp0]] = «الفولدر اللي الـ [[.bat]] ده فيه»، وبينتهي بـ [[\]]. وده اللي بيخلي الـ launcher يلاقي الـ [[.ps1]] حتى لو اتداس عليه من اختصار على سطح المكتب (لأن الاختصار بيشغّله وهو في فولدر تاني). (درس [[%~dp0 و %~nx1]] في تاب CMD.)

**[[pwsh]] ولا [[powershell]]؟** [[pwsh]] = PowerShell 7 (لازم يكون متسطّب). [[powershell]] = Windows PowerShell 5.1 (موجود في كل ويندوز). لو هتدّي السكربت لحد مش متأكد عنده 7، اكتب [[powershell]] في الـ launcher — وخد بالك من الترميز (درس «العربي في سكربتات PowerShell 5.1»).

**[[.js]]:** متغيّرش الـ association بتاع [[.js]] على جهاز حد تاني. لو عايز سكربت Node بدبل كليك، نفس الفكرة: [[@node "%~dp0hello.js" %*]] في [[.bat]].

**ولو عايز السكربت يشتغل كـ Admin:** اختصار ← Properties ← Advanced ← Run as administrator. أو من PowerShell: [[Start-Process pwsh -Verb RunAs -ArgumentList '-File','C:\path\x.ps1']] — وده بيطلّع رسالة UAC. (من الوثائق — مااتجرّبش هنا لأنه محتاج موافقة UAC.)`,
            when: R`أي سكربت هتديه لحد يشغّله من غير ترمنال، أو هتعمله اختصار.`,
            mistakes: R`تبعت [[.ps1]] لحد وتقوله «دوس عليه». أو [[.js]] بدبل كليك. أو [[.bat]] من غير [[pause]] فالنافذة تختفي. أو الـ launcher من غير [[%~dp0]] فيشتغل من اختصار ومايلاقيش السكربت.`
          },
          teach: R`## ويندوز بيقرر من الـ file association

~~~bat
ftype batfile & ftype sh_auto_file & ftype JSFile
~~~

~~~text اتشغّل فعلًا
batfile="%1" %*
sh_auto_file="C:\Program Files\Git\git-bash.exe" --no-cd "%L" %*
JSFile=C:\Windows\System32\WScript.exe "%1" %*
~~~

| | الدبل كليك |
|---|---|
| [[.bat]] | بيشتغل — **وبيقفل على طول** |
| [[.sh]] | Git Bash (لو متسطّب) |
| [[.js]] | **WScript — مش Node** |
| [[.ps1]] | **بيتفتح للتعديل** |

---

## ١. [[.js]] بيقع

~~~bat
cscript //nologo hello.js
~~~

~~~text اتشغّل فعلًا
hello.js(1, 1) JavaScript runtime error: 'console' is undefined
~~~

ده JScript من التسعينات، مش Node.

---

## ٢. [[.ps1]] بيتفتح في محرر

مقصود: عشان محدش يشغّل سكربت بدوسة بالغلط.

---

## ٣. الحل: launcher

~~~bat run-hello.bat
@pwsh -NoProfile -ExecutionPolicy Bypass -File "%~dp0hello.ps1" %*
@pause
~~~

| | |
|---|---|
| [[@]] | متطبعش السطر |
| [[-ExecutionPolicy Bypass]] | للتشغيل ده بس |
| [[%~dp0]] | فولدر الـ [[.bat]] نفسه |
| [[%*]] | كل الـ arguments |
| [[pause]] | استنى قبل ما تقفل |

~~~text اتشغّل فعلًا: run-hello.bat -Name viaBat -Times 1
hello from ps1: viaBat
Press any key to continue . . .
~~~

> ونفس الفكرة لـ Node: [[@node "%~dp0hello.js" %*]].

---

## ٤. [[pwsh]] ولا [[powershell]]؟

| | |
|---|---|
| [[pwsh]] | PowerShell 7 — لازم يكون متسطّب |
| [[powershell]] | 5.1 — موجود في كل ويندوز |

---

## الخلاصة

- [[ftype]] بيقولك الدبل كليك بيعمل إيه.
- [[.js]] = WScript. [[.ps1]] = محرر.
- [[.bat]] صغير بـ [[%~dp0]] و [[pause]] = الحل.`,
          sol: R`[[ftype]] و [[assoc]] و WScript على [[.js]] والـ launcher اتشغّلوا على ويندوز 11 (والـ [[pause]] اتقفل بـ [[echo.|]] في الاختبار). أسباب [[.ps1]] و [[-Verb RunAs]] من الوثائق.`,
          solCode: R`ftype batfile        # batfile="%1" %*
ftype JSFile         # JSFile=C:\Windows\System32\WScript.exe "%1" %*
cscript //nologo hello.js
#   hello.js(1, 1) JavaScript runtime error: 'console' is undefined
run-hello.bat -Name viaBat -Times 1
#   hello from ps1: viaBat
#   Press any key to continue . . .`
        },

        {
          cmd: "PowerShell رافض يشغّل السكربت",
          title: "Execution Policy و «نزل من النت»: افهمهم بدل ما تقفلهم",
          learn: R`تقرا الـ execution policy، وتعرف علامة «نزل من النت»، وتشغّل سكربت انت واثق فيه من غير ما تقفل الحماية للجهاز كله.`,
          out: R`«running scripts is disabled» و «not digitally signed» تحلهم صح.`,
          use: {
            work: R`أول سكربت PowerShell على جهاز جديد بيطلّع واحدة من الرسالتين دول تقريبًا دايمًا.`,
            cs: R`ويندوز بيحط علامة مخفية على أي ملف نزل من النت (Mark of the Web). وأي برنامج يقدر يقراها ويتصرف على أساسها — مش PowerShell بس.`,
          },
          desc: R`**الرسالتين اللي هتقابلهم:**

**١. [[running scripts is disabled on this system]]** — الـ policy = [[Restricted]]. مفيش سكربتات خالص. وده الافتراضي على Windows client (من الوثائق).

**٢. [[... is not digitally signed. You cannot run this script on the current system.]]** — الـ policy = [[RemoteSigned]]، والملف **نزل من النت**.

**جرّبت التانية بالظبط:** على جهاز التجربة الـ policy [[RemoteSigned]]. وعملت سكربت وشغّلته — [[hello from downloaded script]]. وبعدين حطيت عليه علامة «نزل من النت» (Zone.Identifier بـ [[ZoneId=3]])، وشغّلته تاني:

[[SecurityError: File ...\downloaded.ps1 cannot be loaded. The file ... is not digitally signed.]]

**نفس الملف، نفس المحتوى.** الفرق الوحيد العلامة المخفية.

**والحل للملف اللي انت واثق فيه:** [[Unblock-File]] — بيشيل العلامة، وبعدها اشتغل عادي.

**ليه مش «اقفل الحماية»؟** [[Set-ExecutionPolicy Unrestricted]] أو [[Bypass]] للجهاز كله بيخلي **أي** سكربت يشتغل، حتى اللي جاي في إيميل. والأحسن:

| الموقف | الحل |
|---|---|
| ملف واحد انت واثق فيه نزل من النت | [[Unblock-File .\x.ps1]] |
| تشغيل واحد بس | [[pwsh -ExecutionPolicy Bypass -File x.ps1]] — للعملية دي بس |
| أول مرة على جهاز (Restricted) | [[Set-ExecutionPolicy -Scope CurrentUser RemoteSigned]] — سكربتاتك تشتغل، واللي من النت لأ |`,
          example: R`# Windows (PowerShell):
Get-ExecutionPolicy -List
Get-Content .\downloaded.ps1 -Stream Zone.Identifier
Unblock-File .\downloaded.ps1
pwsh -NoProfile -ExecutionPolicy Bypass -File .\downloaded.ps1
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`,
          lines: [
            R`الـ policy على كل مستوى. اللي بيكسب هو أول واحد مش [[Undefined]] من فوق لتحت. على جهاز التجربة: [[Process = Bypass]] و [[LocalMachine = RemoteSigned]].`,
            R`العلامة المخفية اللي ويندوز بيحطها على الملفات المتنزّلة. [[ZoneId=3]] = من النت. لو مفيش علامة، الأمر بيطلّع error إن الـ stream مش موجود.`,
            R`بيشيل العلامة. **بس لملف انت عارف مصدره** — ده بالظبط اللي الحماية بتسألك عليه.`,
            R`تشغيل واحد بـ [[Bypass]] — الإعداد ده للعملية دي بس، ولما تخلص الجهاز يرجع زي ما كان.`,
            R`**بيغيّر إعداد على جهازك** (لليوزر بتاعك بس، من غير Admin): سكربتاتك تشتغل، واللي نازل من النت محتاج توقيع أو [[Unblock-File]]. ده الإعداد المعقول لأي حد بيكتب سكربتات.`,
          ],
          try: R`[[Get-ExecutionPolicy -List]] على جهازك. وبعدين نزّل أي سكربت [[.ps1]] من GitHub وشوف [[Get-Item .\x.ps1 -Stream *]] — هتلاقي [[Zone.Identifier]]. اقراه، واقرا السكربت نفسه، وبعدين قرر [[Unblock-File]].`,
          deep: {
            why: R`الـ execution policy مش «أمان» حقيقي ضد حد عارف بيعمل إيه (أي حد يقدر يكتب [[-ExecutionPolicy Bypass]]). هي حماية من **الغلط**: إنك تشغّل سكربت جه في إيميل أو نزل من موقع من غير ما تقصد. (وده كلام Microsoft نفسها في [[about_Execution_Policies]].)`,
            how: R`**الـ policies:**

| | بيسمح بإيه |
|---|---|
| [[Restricted]] | مفيش سكربتات — الافتراضي على ويندوز العادي |
| [[AllSigned]] | الموقّع بس |
| [[RemoteSigned]] | سكربتاتك تشتغل، واللي من النت لازم موقّع — الافتراضي على Windows Server |
| [[Unrestricted]] | كله، مع تحذير للي من النت |
| [[Bypass]] | كله، من غير أي تحذير |

(الافتراضيات من وثائق Microsoft.)

**الـ Scopes:** [[MachinePolicy]] و [[UserPolicy]] (Group Policy — من الـ IT) بيكسبوا على كل حاجة. وبعدين [[Process]] (العملية دي بس)، و [[CurrentUser]]، و [[LocalMachine]]. فلو الشركة حاطة [[MachinePolicy]]، مفيش حاجة هتغيّرها.

**العلامة نفسها:** ملف مخفي جوه الملف (Alternate Data Stream) اسمه [[Zone.Identifier]]:

~~~text اتشغّل فعلًا
[ZoneTransfer]
ZoneId=3
~~~

| [[ZoneId]] | |
|---|---|
| 0 | الجهاز نفسه |
| 1 | الشبكة الداخلية |
| 2 | مواقع موثوقة |
| 3 | **الإنترنت** |
| 4 | مواقع محظورة |

والمتصفحات و Outlook وبرامج فك الضغط بتحطها. **وخد بالك:** لو فكّيت [[.zip]] نازل من النت بـ File Explorer، الملفات اللي جواه بتاخد العلامة كمان. فـ [[Unblock-File]] على الـ [[.zip]] **قبل** ما تفكه بيوفر عليك تعمله لكل ملف.

**[[Get-Item -Stream *]] بعد [[Unblock-File]]:** طلّع [[:$DATA]] بس — يعني الملف رجع ملف عادي من غير علامة.

**و Office و الماكروز:** نفس العلامة هي اللي بتخلي Word يفتح الملف في «Protected View». فاهمها مرة، بتفهمها في كل حتة.`,
            when: R`أول سكربت على جهاز جديد، أو سكربت نزل من النت، أو سكربت شغّال عندك ومرفوض عند حد تاني.`,
            mistakes: R`[[Set-ExecutionPolicy Unrestricted]] للجهاز كله «عشان يخلص». أو [[Unblock-File]] على كل حاجة من غير ما تقرا. أو تفتكر الـ policy بتحمي من هجوم (هي بتحمي من الغلط). أو تغيّر [[LocalMachine]] وهو محتاج Admin وانت تقدر تغيّر [[CurrentUser]].`
          },
          teach: R`## الرسالتين

~~~text 1 — Restricted · اتشغّل فعلًا
SecurityError: File ...\hello.ps1 cannot be loaded because running scripts is disabled on this system.
~~~

~~~text 2 — RemoteSigned + نزل من النت · اتشغّل فعلًا
SecurityError: File ...\downloaded.ps1 cannot be loaded. The file ...\downloaded.ps1 is not digitally signed.
You cannot run this script on the current system.
~~~

---

## ١. التجربة: نفس الملف، مرتين

~~~powershell
'"hello from downloaded script"' | Set-Content downloaded.ps1
pwsh -NoProfile -ExecutionPolicy RemoteSigned -File .\downloaded.ps1
~~~

~~~text اتشغّل فعلًا
hello from downloaded script
~~~

### حطيت علامة «نزل من النت»

~~~powershell
Set-Content -Path .\downloaded.ps1 -Stream Zone.Identifier -Value "[ZoneTransfer]$__btr$__btnZoneId=3"
Get-Content .\downloaded.ps1 -Stream Zone.Identifier
~~~

~~~text اتشغّل فعلًا
[ZoneTransfer]
ZoneId=3
~~~

~~~text نفس الأمر · اتشغّل فعلًا
SecurityError: ... is not digitally signed. You cannot run this script on the current system.
exit=1
~~~

**نفس المحتوى. الفرق العلامة المخفية بس.**

---

## ٢. الحل لملف انت واثق فيه

~~~powershell
Unblock-File .\downloaded.ps1
(Get-Item .\downloaded.ps1 -Stream *).Stream
pwsh -NoProfile -ExecutionPolicy RemoteSigned -File .\downloaded.ps1
~~~

~~~text اتشغّل فعلًا
:$DATA                              <-- العلامة راحت
hello from downloaded script
~~~

---

## ٣. متقفلش الحماية للجهاز كله

| الموقف | الحل |
|---|---|
| ملف واحد واثق فيه | [[Unblock-File]] |
| تشغيل واحد | [[pwsh -ExecutionPolicy Bypass -File x.ps1]] |
| أول مرة على جهاز | [[Set-ExecutionPolicy -Scope CurrentUser RemoteSigned]] |

> **فكّيت [[.zip]] من النت؟** الملفات جواه بتاخد العلامة. [[Unblock-File]] على الـ [[.zip]] **قبل** ما تفكه.

---

## ٤. الـ policies

| | |
|---|---|
| [[Restricted]] | مفيش سكربتات (ويندوز العادي) |
| [[RemoteSigned]] | سكربتاتك آه، واللي من النت لازم توقيع |
| [[Bypass]] | كله |

~~~text Get-ExecutionPolicy -List · اتشغّل فعلًا (جهاز التجربة)
MachinePolicy  Undefined
   UserPolicy  Undefined
      Process  Bypass
  CurrentUser  Undefined
 LocalMachine  RemoteSigned
~~~

> [[MachinePolicy]] و [[UserPolicy]] من الـ IT — بيكسبوا على كل حاجة.

---

## الخلاصة

- [[Restricted]] = مفيش سكربتات. [[RemoteSigned]] = اللي من النت محتاج توقيع.
- العلامة = [[Zone.Identifier]] بـ [[ZoneId=3]].
- [[Unblock-File]] للي واثق فيه بس.
- [[-Scope CurrentUser RemoteSigned]] بدل قفل الحماية.`,
          sol: R`الـ policy، والعلامة، والرفض، و [[Unblock-File]]، و [[Restricted]] اتشغّلوا على ملفات تجربة بـ [[-ExecutionPolicy]] للعملية بس (إعداد الجهاز ماتغيّرش). الافتراضيات وجدول ZoneId وفك الـ zip من وثائق Microsoft، و [[Set-ExecutionPolicy -Scope CurrentUser]] مااتشغّلش لأنه بيغيّر إعداد.`,
          solCode: R`Get-ExecutionPolicy -List          # Process Bypass | LocalMachine RemoteSigned
pwsh -ExecutionPolicy RemoteSigned -File .\downloaded.ps1     # hello from downloaded script
# + Zone.Identifier (ZoneId=3):
#   SecurityError: ... is not digitally signed. You cannot run this script on the current system.
Unblock-File .\downloaded.ps1      # (Get-Item -Stream *).Stream  ->  :$DATA
#   hello from downloaded script
pwsh -ExecutionPolicy Restricted -File .\hello.ps1
#   SecurityError: ... running scripts is disabled on this system.`
        },

        {
          cmd: "سكربت bash من ويندوز",
          title: "Permission denied، و 'bash\\r'، و «شغّال عندي»",
          learn: R`تعرف المشكلتين اللي بيوقّعوا أي سكربت [[.sh]] اتكتب على ويندوز، وتمنعهم من الأول.`,
          out: R`[[.sh]] بتكتبه على ويندوز يشتغل على أي لينكس أو Docker أو CI.`,
          use: {
            prog: R`[[entrypoint.sh]] في Docker، وسكربتات CI، و [[deploy.sh]] على السيرفر — كلهم بيتكتبوا على ويندوز غالبًا وبيتشغّلوا على لينكس.`,
            work: R`«الكونتينر مش راضي يقوم» واللوج فيه [[no such file or directory]] على سكربت موجود — ده CRLF في أغلب الأحوال.`,
          },
          desc: R`**المشكلة الأولى: Permission denied.**

على لينكس، الملف لازم يكون عليه صلاحية تشغيل:

[[-rw-r--r--]] ← [[./new.sh]] ← **[[Permission denied]]** ([[exit=126]])

[[chmod +x new.sh]] ← [[-rwxr-xr-x]] ← اشتغل.

**ومفاجأة:** الملف اللي جاي من فولدر ويندوز متركّب في Docker ظهر **[[-rwxrwxrwx]]** — يعني قابل للتشغيل من غير [[chmod]]. فالسكربت «شغّال عندك» في Docker على جهازك، ويقع على السيرفر أو في CI. ده سبب كلاسيكي لـ «شغّال عندي».

**المشكلة التانية: CRLF.**

ويندوز بيكتب آخر كل سطر [[\r\n]]، ولينكس بيستنى [[\n]] بس. فسطر [[#!/usr/bin/env bash]] بيتقري [[bash\r]]:

[[/usr/bin/env: 'bash\r': No such file or directory]]

**الرسالة بتقول «مش موجود»** — مع إن [[bash]] موجود. والمشكلة حرف مخفي. وده بيضيّع ساعات لأن الملف شكله سليم في أي محرر.

و [[bash crlf.sh]] (من غير [[./]]) **اشتغل** — بس الناتج فيه [[\r]] في آخر كل سطر، وده بيبوّظ المقارنات والمسارات.

**الإصلاح:** [[sed -i 's/\r$//' crlf.sh]] — واشتغل.

**والمنع من الأول: [[.gitattributes]]** فيه [[*.sh text eol=lf]]. جرّبته في repo تجربة فيه [[core.autocrlf=true]] (الإعداد الشائع على ويندوز): الـ [[.sh]] نزل في clone جديد **من غير CR**، والـ [[.txt]] العادي نزل بـ CRLF.`,
          example: R`# Linux:
ls -l new.sh
./new.sh a
chmod +x new.sh && ./new.sh a
./crlf.sh x
sed -i 's/\r$//' crlf.sh && ./crlf.sh x
# في الـ repo (أي نظام):
echo '*.sh text eol=lf' >> .gitattributes
git ls-files --eol`,
          lines: [
            R`الصلاحيات. [[-rw-r--r--]] = قراية وكتابة بس، مفيش [[x]] (تشغيل).`,
            R`[[Permission denied]] و [[exit=126]] — الملف موجود بس مش مسموح يتشغّل.`,
            R`[[+x]] بتضيف صلاحية التشغيل. ودلوقتي اشتغل.`,
            R`ملف اتكتب على ويندوز: [[/usr/bin/env: 'bash\r': No such file or directory]]. الـ [[\r]] المخفي بقى جزء من اسم البرنامج.`,
            R`[[sed]] بيشيل [[\r]] من آخر كل سطر ([[$]] = آخر السطر)، و [[-i]] = عدّل الملف نفسه. ودلوقتي اشتغل.`,
            R`**المنع:** Git هيخزن ويطلّع الـ [[.sh]] بـ LF دايمًا، حتى على ويندوز. وده في الـ repo، فبيتطبق على كل اللي بيشتغل عليه.`,
            R`بيوريك كل ملف متخزن بإيه ([[i/]]) وعندك بإيه ([[w/]]) والقاعدة اللي عليه ([[attr/]]).`,
          ],
          try: R`في VS Code افتح أي [[.sh]] وبص في الشريط اللي تحت: لو مكتوب [[CRLF]]، دوس عليه وغيّره لـ [[LF]]. وبعدين ضيف [[.gitattributes]] للـ repo بتاعك فيه [[*.sh text eol=lf]] — ومعاه لو بتستخدم Docker: [[Dockerfile text eol=lf]].`,
          deep: {
            why: R`ويندوز ولينكس اختلفوا من السبعينات على آخر السطر، وعلى الصلاحيات. والسكربت اللي بيتنقل بينهم بيقع في الاتنين، والرسايل مش بتقول السبب الحقيقي.`,
            how: R`**ليه الـ [[-rwxrwxrwx]]؟** فولدر ويندوز متركّب في Docker مالوش صلاحيات لينكس، فـ Docker Desktop بيعرضه كأن كل حاجة مسموحة. فالسكربت بيشتغل جوه Docker على جهازك. وعلى سيرفر لينكس (أو في CI بعد [[git clone]])، الصلاحية بتيجي من Git.

**Git بيحفظ صلاحية التشغيل:** [[git update-index --chmod=+x deploy.sh]] بيخليها جزء من الـ repo، فأي [[clone]] بيطلّعها قابلة للتشغيل — حتى لو الـ commit اتعمل من ويندوز. (من وثائق Git.)

**[[git ls-files --eol]] اتشغّل فعلًا:**

~~~text
i/lf    w/crlf  attr/                 .gitattributes
i/lf    w/crlf  attr/text eol=lf      a.sh
i/lf    w/crlf  attr/                 b.txt
~~~

[[i/]] = في الـ repo (index)، و [[w/]] = في الفولدر عندك. الاتنين [[lf]] في الـ repo. والفرق بيبان في الـ checkout: [[a.sh]] نزل LF و [[b.txt]] نزل CRLF.

**ليه الـ [[.gitattributes]] أحسن من [[core.autocrlf]]؟** [[core.autocrlf]] إعداد عند كل واحد على جهازه — ممكن يكون مختلف عند كل حد في الفريق. و [[.gitattributes]] جوه الـ repo نفسه، فبيتطبق على الكل.

**ملفات تانية بتتأثر بنفس الحكاية:** [[Dockerfile]]، و [[entrypoint.sh]]، و [[.env]] (قيمة فيها [[\r]] في الآخر بتبوّظ كلمات السر)، وملفات الـ YAML بتاعة CI.

**وفي الاتجاه التاني:** ملف [[.bat]] بـ LF بيقع على ويندوز (درس «مشروع — ملف بيتداس عليه» في تاب CMD). فالقاعدة: [[*.bat text eol=crlf]] كمان في [[.gitattributes]].

~~~text .gitattributes كامل
* text=auto
*.sh text eol=lf
Dockerfile text eol=lf
*.bat text eol=crlf
*.cmd text eol=crlf
~~~`,
            when: R`أي [[.sh]] أو [[Dockerfile]] بتكتبه على ويندوز، وأي repo فيه سكربتات للنظامين.`,
            mistakes: R`تتأكد إن السكربت «شغّال» في Docker على جهازك وتنشره. أو تصلّح CRLF بإيدك كل مرة بدل [[.gitattributes]]. أو تشغّل [[bash script.sh]] وتفتكر المشكلة اتحلت والناتج فيه [[\r]]. أو تنسى [[.bat]] في الاتجاه العكسي.`
          },
          teach: R`## المشكلة الأولى: Permission denied

~~~bash
printf '#!/usr/bin/env bash\necho "hello from sh: [$1]"\n' > new.sh
ls -l new.sh
./new.sh a
~~~

~~~text اتشغّل فعلًا · أوبونتو 24.04
-rw-r--r--
bash: line 5: ./new.sh: Permission denied
exit=126
~~~

~~~bash
chmod +x new.sh && ls -l new.sh && ./new.sh a
~~~

~~~text اتشغّل فعلًا
-rwxr-xr-x
hello from sh: [a]
~~~

### ومفاجأة: «شغّال عندي»

~~~text ملف من فولدر ويندوز متركّب في Docker · اتشغّل فعلًا
-rwxrwxrwx
~~~

**قابل للتشغيل من غير [[chmod]]** — على جهازك بس. على السيرفر أو في CI: [[Permission denied]].

---

## المشكلة التانية: CRLF

~~~text crlf.sh — اتكتب بـ \r\n · اتشغّل فعلًا
./crlf.sh x
/usr/bin/env: 'bash\r': No such file or directory
exit=127
~~~

**«مش موجود»** — مع إن [[bash]] موجود. الـ [[\r]] المخفي بقى جزء من الاسم.

~~~text bash crlf.sh x — اشتغل، بس · اتشغّل فعلًا
h e l l o   f r o m   s h :   [ x ] \r \n
~~~

الـ [[\r]] لسه في الناتج.

~~~bash الإصلاح
sed -i 's/\r$//' crlf.sh && ./crlf.sh x
~~~

~~~text اتشغّل فعلًا
hello from sh: [x]
~~~

---

## المنع من الأول: [[.gitattributes]]

~~~text .gitattributes
*.sh text eol=lf
~~~

~~~text git ls-files --eol · اتشغّل فعلًا (core.autocrlf=true)
i/lf    w/crlf  attr/text eol=lf      a.sh
i/lf    w/crlf  attr/                 b.txt
~~~

~~~text في clone جديد · اتشغّل فعلًا
a.sh فيه CR؟  False
b.txt فيه CR؟ True
~~~

**الـ [[.sh]] نزل LF حتى على ويندوز.**

~~~text .gitattributes كامل
* text=auto
*.sh text eol=lf
Dockerfile text eol=lf
*.bat text eol=crlf
*.cmd text eol=crlf
~~~

> و [[.bat]] بـ LF بيقع على ويندوز — نفس المشكلة بالعكس.

---

## الخلاصة

- [[Permission denied]] = [[chmod +x]].
- Docker على ويندوز بيخبّي المشكلة ([[-rwxrwxrwx]]).
- [['bash\r']] = CRLF. [[sed -i 's/\r$//']] للإصلاح.
- [[.gitattributes]] بـ [[eol=lf]] للمنع.`,
          sol: R`[[chmod]] و [[Permission denied]] والـ [[-rwxrwxrwx]] و CRLF و [[sed]] اتشغّلوا على أوبونتو 24.04 جوه Docker. و [[.gitattributes]] اتجرّب في repo تجربة على ويندوز بـ [[core.autocrlf=true]] (في ملف config الـ repo بس). [[git update-index --chmod]] من وثائق Git.`,
          solCode: R`ls -l new.sh            # -rw-r--r--
./new.sh a              # Permission denied   (exit=126)
chmod +x new.sh         # -rwxr-xr-x  ->  hello from sh: [a]
./crlf.sh x             # /usr/bin/env: 'bash\r': No such file or directory   (exit=127)
sed -i 's/\r$//' crlf.sh && ./crlf.sh x      # hello from sh: [x]
git ls-files --eol      # i/lf w/crlf attr/text eol=lf a.sh
# clone جديد:  a.sh فيه CR؟ False  |  b.txt فيه CR؟ True`
        }
      ]
    },

    {
      t: "مشروع: تقرير صحة جهازك",
      l: 3,
      time: R`حوالي ساعة`,
      goal: [
        R`تجمع كل اللي اتعلمته في التاب ده في سكربت واحد بيطلّع تقرير صحة جهازك.`,
        R`تخلي السكربت يحذّرك بس من اللي يستاهل: ديسك فاضي أقل من ١٠٪، بطارية تحت ٦٠٪، حماية مقفولة.`,
        R`تحفظ السكربت صح عشان العربي ميتكسرش في Windows PowerShell 5.1.`,
      ],
      use: {
        work: R`سكربت واحد تشغّله على أي جهاز (بتاعك أو بتاع حد في البيت) ويقولك في ٧ ثواني إيه اللي محتاج اهتمام.`,
        prog: R`ده نمط هتستخدمه كتير: تجمع بيانات من مصادر مختلفة، وتطلّع تقرير، وتعلّم على الاستثناءات بس.`,
      },
      lab: R`# Windows (PowerShell):
New-Item -ItemType Directory health; Set-Location health
code health.ps1`,
      projects: [
        { t: R`تقرير بالأخضر والأحمر`, what: R`خلي سطور التحذير ([[!!]]) بالأحمر بـ [[$PSStyle]] (درس «ألوان في الترمنال»)، والباقي عادي. ولو مفيش ولا تحذير، اطبع «كله تمام» بالأخضر في الآخر.` },
        { t: R`تقرير كل أسبوع`, what: R`خلي السكربت يحفظ التقرير باسم فيه التاريخ ([[health-20261029.txt]])، وجدوله كل أسبوع. وبعد شهر، قارن ٤ تقارير: المساحة نزلت قد إيه؟` },
      ],
      n: R`السكربت اتشغّل على جهاز التجربة في PowerShell 7.6 و Windows PowerShell 5.1. والتقرير اللي تحت نتيجته الحقيقية، والأسماء الشخصية اتشالت`,
      items: [
        {
          cmd: "health.ps1: تقرير في شاشة واحدة",
          title: "كل اللي في التاب، في سكربت واحد بيحذّرك من اللي يستاهل",
          learn: R`تكتب سكربت بيجمع معلومات من مصادر كتير، ويطلّع تقرير، ويعلّم على المشاكل بس.`,
          out: R`[[health.ps1]] شغّال، بيطلّع تقرير في ٧ ثواني، ويحفظه في ملف لو طلبت.`,
          use: {
            work: R`على جهاز التجربة، السكربت طلّع ٤ تحذيرات في أول تشغيل: ديسكين فاضيين أقل من ١٠٪، وبطارية ٥٦٪. وده اللي محتاج اهتمام فعلًا.`,
            prog: R`[[CmdletBinding]] و [[param()]] و [[List]] بتاع .NET — نفس الأدوات اللي في مشاريع تاب PowerShell.`,
          },
          desc: R`**السكربت كله قراية** — مفيش ولا أمر بيغيّر حاجة. وبيعمل تمن أجزاء:

| الجزء | من درس |
|---|---|
| النظام والرام | «معلومات الجهاز في ثانية» |
| الديسكات | «الديسك: مساحة وصحة» |
| البطارية | «البطارية فاضل منها كام» |
| الحماية | «فحص فيروسات من الترمنال» |
| أكتر حاجة واكلة رام | «مين واكل الجهاز» |
| اللي بيفتح مع الجهاز | «مين واكل الجهاز» |
| البورتات | «البورتات المفتوحة على جهازك» |
| TEMP | «نضّف من غير ما تمسح غلط» |

**والتحذيرات بس لما تستاهل:**

| لو | السطر |
|---|---|
| الرام الفاضية أقل من ١٥٪ | [[!! الرام الفاضية أقل من ١٥٪]] |
| حرف فاضي أقل من ١٠٪ | [[!! E: فاضي أقل من ١٠٪]] |
| ديسك مش [[Healthy]] | [[!! ... مش Healthy]] |
| البطارية تحت ٦٠٪ | [[!! البطارية تحت ٦٠٪ من سعتها الأصلية]] |
| الحماية اللحظية مقفولة | [[!! الحماية اللحظية مقفولة]] |

**ونتيجته الحقيقية على جهاز التجربة** (أخد ٧ ثواني):

[[== الديسكات]]

[[  D: فاضي 55.4 من 629 جيجا (9%) | Healthy]]

[[  !! D: فاضي أقل من ١٠٪]]

[[  E: فاضي 46.8 من 954 جيجا (5%) | Healthy]]

[[  !! E: فاضي أقل من ١٠٪]]

[[== البطارية]]

[[  السعة دلوقتي 50,640 من 90,005 mWh (56% من الأصلية)]]

[[  !! البطارية تحت ٦٠٪ من سعتها الأصلية]]

[[== الحماية]]

[[  آخر full scan: عمره ما اتعمل]]

[[== أكتر حاجة واكلة رام (متجمّعة بالاسم)]]

[[  chrome        62 عملية   11,053 ميجا]]

**ولاحظ** إن «عمره ما اتعمل» اتكتبت بدل [[4294967295]] — السكربت بيترجم القيمة الغريبة لكلام مفهوم.`,
          example: R`# health.ps1 — تقرير صحة الجهاز. كله قراية، ومفيش حاجة بتتغيّر
[CmdletBinding()]
param([string]$Out)
$lines = New-Object 'System.Collections.Generic.List[string]'
function Add([string]$t) { $lines.Add($t) }
function Warn([string]$t) { $lines.Add("  !! $t") }

$os = Get-CimInstance Win32_OperatingSystem
$freeRam = $os.FreePhysicalMemory / $os.TotalVisibleMemorySize
Add ("== الجهاز: {0} | الرام فاضي {1:P0}" -f $os.Caption, $freeRam)
if ($freeRam -lt 0.15) { Warn "الرام الفاضية أقل من ١٥٪" }

Add "== الديسكات"
foreach ($v in Get-Volume | Where-Object DriveLetter | Sort-Object DriveLetter) {
    $pct = $v.SizeRemaining / $v.Size
    Add ("  {0}: فاضي {1:N1} من {2:N0} جيجا ({3:P0}) | {4}" -f $v.DriveLetter, ($v.SizeRemaining/1GB), ($v.Size/1GB), $pct, $v.HealthStatus)
    if ($pct -lt 0.10) { Warn "$($v.DriveLetter): فاضي أقل من ١٠٪" }
}

Add "== الحماية"
$mp = Get-MpComputerStatus
$full = if ($mp.FullScanAge -eq [uint32]::MaxValue) { 'عمره ما اتعمل' } else { "من $($mp.FullScanAge) يوم" }
Add "  آخر full scan: $full"
if (-not $mp.RealTimeProtectionEnabled) { Warn "الحماية اللحظية مقفولة" }

$report = $lines -join [Environment]::NewLine
$report
if ($Out) { $report | Set-Content -Path $Out -Encoding utf8; "اتحفظ في $Out" }`,
          lines: [
            R`[[CmdletBinding]] بيخلي السكربت يتصرف زي أي أمر PowerShell أصلي: يقبل [[-Verbose]] و [[-ErrorAction]] من غير ما تكتبهم بنفسك.`,
            R`[[-Out]] اختياري: لو كتبت [[-Out report.txt]] التقرير بيتحفظ في الملف كمان، ولو ماكتبتهوش بيتطبع على الشاشة بس.`,
            R`قايمة فاضية هنجمع فيها سطور التقرير واحد واحد. [[List]] بتكبر في مكانها، بينما [[+=]] على مصفوفة عادية بيعمل مصفوفة جديدة كل مرة.`,
            R`[[Add]] دالة صغيرة بتضيف سطر للتقرير. وجودها بيخلي باقي السكربت يتقري زي جمل: [[Add "== الديسكات"]].`,
            R`[[Warn]] نفس [[Add]] بس بتحط [[!!]] قبل السطر، عشان التحذيرات تبان وسط التقرير من أول نظرة.`,
            R`بنسأل CIM عن النظام مرة واحدة: فيه اسم النظام والرام الكلية والفاضية. ده أسرع بكتير من [[Get-ComputerInfo]] (٢.٣ ثانية).`,
            R`الرام الفاضية ÷ الرام الكلية = رقم بين ٠ و ١ (مثلًا [[0.28]] = ٢٨٪). بنحسبه مرة ونستخدمه في السطر والتحذير.`,
            R`سطر الجهاز. [[{1:P0}]] بيحوّل [[0.28]] لـ [[28%]] من غير كسور، فمش محتاج تضرب في ١٠٠ بنفسك.`,
            R`**التحذير بس لما يستاهل:** تحت ١٥٪ فاضي، الجهاز بيبدأ يستخدم الديسك كرام وبيتقل. فوق كده مفيش سطر تحذير.`,
            R`عنوان القسم في التقرير، عشان تلاقي الديسكات بسرعة وسط باقي الأقسام.`,
            R`بنلف على كل partition ليه حرف ([[C:]] و [[D:]]...). [[Where-Object DriveLetter]] بيشيل الـ partitions المخفية زي Recovery، و [[Sort-Object]] بيرتبهم بالحروف.`,
            R`نسبة الفاضي في الحرف ده: المساحة الفاضية ÷ الحجم الكلي، رقم بين ٠ و ١.`,
            R`سطر لكل حرف: الفاضي بالجيجا، والحجم، والنسبة، والحالة. [[/1GB]] بيحوّل البايتات لجيجا، و [[N1]] رقم عشري واحد.`,
            R`تحذير لو الحرف فاضي فيه أقل من ١٠٪. تحت الحد ده ويندوز بيبدأ يفشل في التحديثات والملفات المؤقتة.`,
            R`نهاية اللفة على الحروف.`,
            R`عنوان قسم الحماية في التقرير، وتحته حالة Defender وآخر فحص.`,
            R`بنقرا حالة Defender كلها مرة واحدة (مفعّل ولا لأ، والحماية اللحظية، وآخر فحص) ونستخدم منها اللي محتاجينه.`,
            R`**ترجمة القيمة الغريبة**: [[FullScanAge]] بيرجّع [[4294967295]] لو عمره ما اتعمل full scan. [[[uint32]::MaxValue]] هو نفس الرقم بس باسم مفهوم، فبنكتب «عمره ما اتعمل» بدل رقم يلخبط.`,
            R`سطر آخر full scan بالكلام اللي اتحسب فوقه.`,
            R`تحذير لو الحماية اللحظية مقفولة، لأن من غيرها الملفات الجديدة مش بتتفحص وانت بتفتحها.`,
            R`بنجمع كل سطور القايمة في نص واحد، كل سطر في سطر جديد. [[NewLine]] بيختار علامة السطر الجديد المناسبة للنظام.`,
            R`بنطبع التقرير على الشاشة (في PowerShell، أي قيمة لوحدها في سطر بتتطبع).`,
            R`ولو [[-Out]] اتحدد، بنحفظه في الملف بـ UTF-8 عشان العربي يفضل سليم، ونقول اتحفظ فين.`,
          ],
          try: R`انسخ المثال وشغّله: [[pwsh -NoProfile -File health.ps1]]. وبعدين ضيف الأجزاء الناقصة واحد واحد (البطارية، وأكتر حاجة واكلة رام، والبورتات، و TEMP) من الدروس — كل جزء ٤ أو ٥ سطور. والنسخة الكاملة في الحل.`,
          flag: "script",
          deep: {
            why: R`كل أمر في التاب ده لوحده مفيد. بس لما يتجمعوا في سكربت، بتشغّله على أي جهاز في ثواني، وبتقارن تقارير ببعض، وبتشوف المشاكل من غير ما تفتكر ١٥ أمر.`,
            how: R`**ليه التحذيرات بس للاستثناءات؟** تقرير فيه ٣٠ سطر كلهم بنفس الشكل محدش بيقراه. ولما ٤ سطور بس عليهم [[!!]]، عينك بتروح ليهم على طول. ده نفس منطق الـ alerts في المراقبة (تاب التشخيص): نبّه على اللي محتاج حد يتصرف، مش على كل حاجة.

**الأرقام اللي اخترتها:**

| | الحد | ليه |
|---|---|---|
| الديسك | ١٠٪ | تحته ويندوز بيبدأ يتلخبط |
| الرام | ١٥٪ | تحته الجهاز بيستخدم الديسك كرام وبيتقل |
| البطارية | ٦٠٪ | عتبة شائعة لـ «محتاجة تتغيّر» |

غيّرهم براحتك — دي اختيارات، مش قواعد.

**[[List]] مقابل [[@()]] و [[+=]]:** [[$a += $x]] على مصفوفة بيعمل مصفوفة جديدة كل مرة. لـ ٣٠ سطر مش فارق، بس ده نمط كويس تتعوّد عليه.

**[[[uint32]::MaxValue]]:** بدل ما تكتب [[4294967295]] في الكود (رقم محدش هيفهمه بعد شهر)، الاسم بيقول هو إيه.

**والسكربت محتاج Admin؟** لأ. كل الأوامر اللي فيه بتشتغل بصلاحيات عادية. والحاجات اللي محتاجة Admin (حرارة الديسك مثلًا) مش فيه — ولو ضفتها، اعمل [[try/catch]] عشان السكربت ميقعش لما يتشغّل من غير Admin.

**والنسخة الكاملة** (البطارية، والرام متجمّعة، واللي بيفتح مع الجهاز، والبورتات، و TEMP) ٨٠ سطر — في الحل.`,
            when: R`جهاز جديد استلمته، أو جهاز حد في البيت بيشتكي، أو مرة في الشهر على جهازك.`,
            mistakes: R`تحذيرات على كل حاجة فمحدش يقراها. أو أرقام سحرية زي [[4294967295]] في الكود. أو أمر محتاج Admin من غير [[try/catch]]. أو تحفظ السكربت بترميز غلط فالعربي يتكسر في 5.1 (الدرس الجاي).`
          },
          teach: R`## السكربت كله قراية

| الجزء | من درس |
|---|---|
| النظام والرام | «معلومات الجهاز في ثانية» |
| الديسكات | «الديسك: مساحة وصحة» |
| البطارية | «البطارية فاضل منها كام» |
| الحماية | «فحص فيروسات من الترمنال» |
| الرام متجمّعة | «مين واكل الجهاز» |
| البورتات | «البورتات المفتوحة على جهازك» |
| TEMP | «نضّف من غير ما تمسح غلط» |

---

## ١. الهيكل

~~~powershell
[CmdletBinding()]
param([string]$Out)
$lines = New-Object 'System.Collections.Generic.List[string]'
function Add([string]$t) { $lines.Add($t) }
function Warn([string]$t) { $lines.Add("  !! $t") }
~~~

**كل جزء بيعمل [[Add]] للمعلومة، و [[Warn]] بس لما يستاهل.**

---

## ٢. التحذيرات

| لو | |
|---|---|
| حرف فاضي < ١٠٪ | [[!!]] |
| رام فاضية < ١٥٪ | [[!!]] |
| ديسك مش [[Healthy]] | [[!!]] |
| بطارية < ٦٠٪ | [[!!]] |
| حماية لحظية مقفولة | [[!!]] |

---

## ٣. النتيجة الحقيقية

~~~powershell
pwsh -NoProfile -File health.ps1 -Out report.txt
~~~

~~~text اتشغّل فعلًا · ٧ ثواني (الأسماء الشخصية اتشالت)
== الجهاز
  Microsoft Windows 11 Home Single Language | شغّال من 1 يوم و 10 ساعة
  الرام: فاضي 8.7 من 31.4 جيجا (28%)
== الديسكات
  C: فاضي 36.8 من 301 جيجا (12%) | Healthy
  D: فاضي 55.4 من 629 جيجا (9%) | Healthy
  !! D: فاضي أقل من ١٠٪
  E: فاضي 46.8 من 954 جيجا (5%) | Healthy
  !! E: فاضي أقل من ١٠٪
  SSD-1 (SSD, NVMe): Healthy
  SSD-2 (SSD, NVMe): Healthy
== البطارية
  السعة دلوقتي 50,640 من 90,005 mWh (56% من الأصلية)
  !! البطارية تحت ٦٠٪ من سعتها الأصلية
== الحماية
  Defender: True | الحماية اللحظية: True | التعريفات: 2026-10-28
  آخر full scan: عمره ما اتعمل
== أكتر حاجة واكلة رام (متجمّعة بالاسم)
  chrome        62 عملية   11,053 ميجا
  Code          19 عملية    2,742 ميجا
  vmmemWSL       1 عملية    2,718 ميجا
== البرامج اللي بتفتح مع الجهاز
  11 برنامج
== الشبكة
  بورتات مفتوحة على كل الواجهات: 20 | على الجهاز نفسه بس: 25
== التنضيف
  فولدر TEMP: 17,896 ملف، 3.02 جيجا
~~~

**٤ تحذيرات بس.** وده اللي محتاج اهتمام فعلًا.

---

## ٤. ترجم القيم الغريبة

~~~powershell
$full = if ($mp.FullScanAge -eq [uint32]::MaxValue) { 'عمره ما اتعمل' } else { "من $($mp.FullScanAge) يوم" }
~~~

[[[uint32]::MaxValue]] أوضح من [[4294967295]] في الكود.

---

## ٥. والبطارية: اتعامل مع إنها مش موجودة

~~~powershell
if (Get-CimInstance Win32_Battery) {
    # التقرير والحسبة
} else { Add "  مفيش بطارية (جهاز مكتبي)" }
~~~

---

## الخلاصة

- كل جزء من درس.
- [[Add]] للمعلومة، و [[Warn]] للاستثناء.
- ترجم الأرقام الغريبة.
- اتعامل مع اللي ممكن ميكونش موجود.
- مفيش حاجة محتاجة Admin.`,
          sol: R`السكربت الكامل (٨٠ سطر) اتشغّل على جهاز التجربة في PowerShell 7.6 (٧ ثواني) وفي Windows PowerShell 5.1، والتقرير منسوخ من التشغيل (أسماء الديسكات اتغيّرت).`,
          solCode: R`# النسخة الكاملة — بتكمّل المثال بالأجزاء دي:

Add "== البطارية"
if (Get-CimInstance Win32_Battery) {
    $tmp = Join-Path ([IO.Path]::GetTempPath()) "battery-report.html"
    powercfg /batteryreport /output $tmp | Out-Null
    $h = Get-Content $tmp -Raw
    $cap = [regex]::Matches($h, '(DESIGN CAPACITY|FULL CHARGE CAPACITY)</span></td><td>([\d,]+) mWh') |
        ForEach-Object { [int]($_.Groups[2].Value -replace ',', '') }
    if ($cap.Count -ge 2) {
        $health = $cap[1] / $cap[0]
        Add ("  السعة دلوقتي {0:N0} من {1:N0} mWh ({2:P0} من الأصلية)" -f $cap[1], $cap[0], $health)
        if ($health -lt 0.6) { Warn "البطارية تحت ٦٠٪ من سعتها الأصلية" }
    }
} else { Add "  مفيش بطارية (جهاز مكتبي)" }

Add "== أكتر حاجة واكلة رام (متجمّعة بالاسم)"
Get-Process | Group-Object Name | ForEach-Object {
    [pscustomobject]@{ Name = $_.Name; Count = $_.Count; MB = ($_.Group | Measure-Object WorkingSet64 -Sum).Sum / 1MB }
} | Sort-Object MB -Descending | Select-Object -First 3 | ForEach-Object {
    Add ("  {0,-12} {1,3} عملية  {2,7:N0} ميجا" -f $_.Name, $_.Count, $_.MB)
}

Add "== البرامج اللي بتفتح مع الجهاز"
Add ("  {0} برنامج" -f @(Get-CimInstance Win32_StartupCommand).Count)

Add "== الشبكة"
$listen = Get-NetTCPConnection -State Listen
Add ("  بورتات مفتوحة على كل الواجهات: {0} | على الجهاز نفسه بس: {1}" -f
    @($listen | Where-Object { $_.LocalAddress -in '0.0.0.0', '::' }).Count,
    @($listen | Where-Object { $_.LocalAddress -in '127.0.0.1', '::1' }).Count)

Add "== التنضيف"
$t = Get-ChildItem $env:TEMP -Recurse -File -Force -ErrorAction SilentlyContinue | Measure-Object Length -Sum
Add ("  فولدر TEMP: {0:N0} ملف، {1:N2} جيجا" -f $t.Count, ($t.Sum/1GB))`
        },

        {
          cmd: "العربي في سكربتات PowerShell 5.1",
          title: "اشتغل عندي، واتكسر عند غيري: احفظ بـ UTF-8 with BOM",
          learn: R`تعرف ليه السكربت اللي فيه عربي بيشتغل على جهاز ويتكسر على تاني، وتحفظه صح.`,
          out: R`سكربتك بيطلّع عربي سليم على أي ويندوز.`,
          use: {
            prog: R`أي سكربت فيه نص غير إنجليزي (عربي، أو إيموجي، أو علامات) ممكن يتكسر في Windows PowerShell 5.1 حسب الجهاز.`,
            work: R`بتبعت سكربت لزميل، ويرجعلك «الكلام طالع حروف غريبة».`,
          },
          desc: R`شغّلت [[health.ps1]] في Windows PowerShell 5.1 على جهاز التجربة — **والعربي طلع سليم**.

**ده كان مفاجأة.** المعروف إن 5.1 بيقرا الملفات اللي **من غير BOM** بترميز الجهاز القديم (ANSI)، مش UTF-8. والملف كان من غير BOM:

[[BOM? False]]

**فبصيت على ترميز الجهاز:**

[[Default codepage: 65001]]

[[ACP: 65001]]

**65001 = UTF-8.** جهاز التجربة مفعّل فيه إعداد «Beta: Use Unicode UTF-8 for worldwide language support». وده **مش** الافتراضي في ويندوز. على جهاز عادي بالعربي، الترميز [[1256]].

**فعملت محاكاة:** نفس بايتات الملف، بس اتقرت بـ 1256 (زي ما 5.1 هيقراها على جهاز عادي):

| | السطر ١١ |
|---|---|
| UTF-8 | [[Add "== الجهاز"]] |
| 1256 | **[[Add "== ط§ظ„ط¬ظ‡ط§ط²"]]** |

**ده شكل العربي المكسور اللي الناس بتشوفه.** وفي حالات تانية، الحروف المكسورة دي بتعمل syntax error والسكربت مبيشتغلش خالص.

**الحل: احفظ الملف بـ UTF-8 with BOM.** الـ BOM تلات بايتات في أول الملف ([[EF BB BF]]) بتقول «أنا UTF-8». و 5.1 بيقراها ويفهم. و PowerShell 7 بيقرا UTF-8 صح في الحالتين.`,
          example: R`# Windows (PowerShell 7):
$b = [IO.File]::ReadAllBytes("health.ps1")[0..2]; ($b[0] -eq 0xEF) -and ($b[1] -eq 0xBB) -and ($b[2] -eq 0xBF)
[Text.Encoding]::Default.CodePage
$text = Get-Content health.ps1 -Raw -Encoding utf8
Set-Content health.ps1 -Value $text -Encoding utf8BOM -NoNewline
# Windows PowerShell 5.1 (نفس الحاجة):
[IO.File]::WriteAllText("$PWD\health.ps1", $text, [Text.UTF8Encoding]::new($true))`,
          lines: [
            R`أول ٣ بايتات = [[EF BB BF]]؟ يعني فيه BOM.`,
            R`ترميز الجهاز. [[65001]] = UTF-8 (الإعداد الـ Beta شغّال). [[1256]] = عربي قديم، و [[1252]] = إنجليزي قديم.`,
            R`اقرا الملف كـ UTF-8.`,
            R`**واكتبه بـ BOM.** [[utf8BOM]] موجود في PowerShell 7 بس.`,
            R`في 5.1: [[UTF8Encoding($true)]] = UTF-8 **مع** BOM. (و [[Set-Content -Encoding UTF8]] في 5.1 بيكتب BOM برضه.)`,
          ],
          try: R`شوف ترميز جهازك: [[[Text.Encoding]::Default.CodePage]] في Windows PowerShell 5.1. لو [[65001]]، جهازك زي جهاز التجربة — بس اللي هتبعتله السكربت غالبًا لأ. فاحفظ بـ BOM دايمًا. وفي VS Code: الشريط اللي تحت ← UTF-8 ← Save with Encoding ← UTF-8 with BOM.`,
          deep: {
            why: R`ويندوز قديم أقدم من UTF-8، فكل لغة كان ليها ترميز (1256 للعربي، 1252 للإنجليزي، 1251 للروسي). و Windows PowerShell 5.1 لسه بيفترض ده لو الملف مقالش هو إيه.`,
            how: R`**مين بيقرا إيه:**

| | ملف UTF-8 من غير BOM | ملف UTF-8 بـ BOM |
|---|---|---|
| PowerShell 7 | ✓ | ✓ |
| Windows PowerShell 5.1 (جهاز عادي) | **✗ بيقراه ANSI** | ✓ |
| Windows PowerShell 5.1 (ACP = 65001) | ✓ | ✓ |
| bash / Python / Node | ✓ | ✓ غالبًا (الـ BOM ممكن يبان كحرف غريب في الأول لبعض الأدوات) |

(سلوك 5.1 من وثائق Microsoft «about_Character_Encoding». والحالة التالتة اتجرّبت على جهاز التجربة. والتانية اتعملت محاكاة بفك البايتات بـ 1256 — مااتشغّلتش على جهاز تاني.)

**ليه مش كل الملفات بـ BOM؟** لأن أدوات تانية (Linux shells، وبعض الـ parsers) بتعتبر الـ BOM حروف زيادة. فالقاعدة: **BOM لملفات [[.ps1]] اللي هتتشغّل في 5.1 بس**. وباقي الملفات (JSON، و bash، والكود) UTF-8 من غير BOM.

**الإعداد الـ Beta:** Settings ← Time & language ← Language & region ← Administrative language settings ← Change system locale ← «Beta: Use Unicode UTF-8 for worldwide language support». بيخلي الـ ACP = 65001. **بس** بعض البرامج القديمة بتتلخبط معاه. فمتعتمدش إن اللي هيشغّل سكربتك مفعّله.

**وناتج السكربت لملف:** في 5.1، [[Set-Content -Encoding utf8]] بيكتب BOM. و [[Out-File]] من غير [[-Encoding]] بيكتب UTF-16 (ملف حجمه الضعف وأدوات كتير مبتقراهوش). ففي 5.1 حدد [[-Encoding UTF8]] دايمًا. وفي 7 الافتراضي UTF-8 من غير BOM. (من نفس الوثيقة.)

**وفي الكونسول نفسه:** لو العربي في الترمنال طالع علامات استفهام، ممكن تكون مشكلة الخط أو [[[Console]::OutputEncoding]] — مش الملف. [[chcp 65001]] في CMD (درس في تاب CMD) و [[[Console]::OutputEncoding = [Text.Encoding]::UTF8]] في PowerShell.`,
            when: R`أي سكربت [[.ps1]] فيه حرف مش إنجليزي، وهيتشغّل على جهاز غير جهازك أو في Windows PowerShell 5.1.`,
            mistakes: R`تجرّب على جهازك (اللي ممكن يكون 65001) وتفتكره شغال في كل حتة. أو BOM على ملف bash أو JSON. أو [[Out-File]] في 5.1 من غير [[-Encoding]]. أو تخلط بين مشكلة الملف ومشكلة خط الكونسول.`
          },
          teach: R`## اشتغل عندي

~~~powershell
powershell -NoProfile -File health.ps1
~~~

~~~text اتشغّل فعلًا · Windows PowerShell 5.1
== الجهاز
  Microsoft Windows 11 Home Single Language | شغّال من 1 يوم و 10 ساعة
~~~

العربي سليم. **مع إن الملف من غير BOM:**

~~~text اتشغّل فعلًا
BOM? False
~~~

---

## ١. ليه؟

~~~powershell
[Text.Encoding]::Default.CodePage
(Get-ItemProperty HKLM:\SYSTEM\CurrentControlSet\Control\Nls\CodePage).ACP
~~~

~~~text اتشغّل فعلًا
Default codepage: 65001
ACP: 65001
~~~

**جهاز التجربة مفعّل فيه «UTF-8 لكل اللغات» (Beta).** وده **مش** الافتراضي. على جهاز عادي بالعربي: [[1256]].

---

## ٢. محاكاة جهاز عادي

نفس البايتات، مقروءة بـ 1256:

~~~powershell
$bytes = [IO.File]::ReadAllBytes("health.ps1")
([Text.Encoding]::GetEncoding(1256).GetString($bytes) -split "$__btn")[10]
~~~

~~~text اتشغّل فعلًا (محاكاة — مش جهاز تاني)
utf8: Add "== الجهاز"
1256: Add "== ط§ظ„ط¬ظ‡ط§ط²"
~~~

**ده العربي المكسور.**

---

## ٣. الحل: UTF-8 with BOM

~~~powershell PowerShell 7
$text = Get-Content health.ps1 -Raw -Encoding utf8
Set-Content health.ps1 -Value $text -Encoding utf8BOM -NoNewline
~~~

~~~powershell Windows PowerShell 5.1
[IO.File]::WriteAllText("$PWD\health.ps1", $text, [Text.UTF8Encoding]::new($true))
~~~

> وفي VS Code: الشريط اللي تحت ← UTF-8 ← Save with Encoding ← **UTF-8 with BOM**.

---

## ٤. BOM لـ [[.ps1]] بس

| | |
|---|---|
| [[.ps1]] هيتشغّل في 5.1 | **BOM** |
| JSON و bash والكود | من غير BOM |

---

## الخلاصة

- 5.1 بيقرا الملف من غير BOM بترميز الجهاز.
- جهازك ممكن يكون 65001 — اللي هتبعتله لأ.
- BOM لملفات [[.ps1]].
- اختبر بالمحاكاة لو مش عندك جهاز تاني.`,
          sol: R`التشغيل في 5.1، وفحص الـ BOM، والـ codepage، اتعملوا على جهاز التجربة. والعربي المكسور **محاكاة** بفك نفس البايتات بـ 1256 — مااتشغّلش على جهاز ترميزه 1256. سلوك 5.1 من وثائق Microsoft «about_Character_Encoding».`,
          solCode: R`# BOM? False
# [Text.Encoding]::Default.CodePage  ->  65001       (جهاز التجربة: الإعداد الـ Beta شغّال)
# ACP: 65001
# محاكاة 1256:
#   utf8: Add "== الجهاز"
#   1256: Add "== ط§ظ„ط¬ظ‡ط§ط²"`
        }
      ]
    }
  ]
});
