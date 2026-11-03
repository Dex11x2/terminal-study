// تكملة تاب tools: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/tools/01.js (شرح حقول الدرس في أوله)
MORE("tools", [
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
    }
]);
