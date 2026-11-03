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
    }
  ]
});
