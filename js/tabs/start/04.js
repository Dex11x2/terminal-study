// تكملة تاب start: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/start/01.js (شرح حقول الدرس في أوله)
MORE("start", [
    {
      t: "عدّتك: تسطّب البرامج وتكتب الكود",
      l: 2,
      n: "قبل أول سطر كود: تسطّب البرامج صح بمدير حزم، وتفهم PATH وليه command not found، وصلاحيات المدير، والمحرر اللي هتكتب فيه، ومشكلة الامتداد المستخبي",
      items: [
        {
          cmd: "مدير الحزم",
          title: "تسطّب البرامج من الترمنال بدل ما تدوّر على مواقعها",
          desc: R`مدير الحزم (package manager) برنامج بيسطّب البرامج ويحدّثها ويشيلها بأمر واحد، من مصدر موثوق، من غير ما تفتح مواقع وتنزّل ملفات وتدوس Next عشر مرات. على أوبونتو اسمه [[apt]]، وعلى الماك [[brew]] (Homebrew)، وعلى ويندوز [[winget]].`,
          deep: {
            why: R`الطريقة القديمة: تدوّر في جوجل على البرنامج، وتتمنى إن الموقع اللي فتحته هو الرسمي مش نسخة فيها فيروس، وتنزّل installer وتدوس Next Next Next، وبعد شهرين تكتشف إن نسختك قديمة. مدير الحزم بيحل الكلام ده: مصدر واحد موثوق، وأمر واحد للتسطيب، وأمر واحد يحدّث كل البرامج مرة واحدة، وأوامر تقدر تكتبها في سكربت عشان تجهّز جهاز جديد في دقايق.`,
            how: R`مدير الحزم عنده «كتالوج» (repository) فيه أسامي البرامج ونسخها ومكان تحميلها. [[apt update]] بيحدّث الكتالوج ده على جهازك، و [[apt install]] بينزّل البرنامج ويحطه في مكانه الصح، ويسطّب معاه أي حاجة هو محتاجها (اسمها dependencies). و [[sudo apt upgrade]] بيحدّث كل البرامج المتسطبة. و [[apt]] محتاج [[sudo]] لأنه بيكتب في فولدرات النظام.

[[brew]] على الماك مش جاي مع النظام: بتسطّبه مرة بالأمر اللي على موقعه الرسمي brew.sh، وبعدها [[brew install]] للأدوات، و [[brew install --cask]] للبرامج اللي ليها واجهة (زي VS Code). و [[winget]] جاي مع ويندوز ١١ والنسخ الحديثة من ويندوز ١٠، وبيسطّب من نفس الـ installers الرسمية بس من غير ما تدوس حاجة، و [[winget upgrade --all]] بيحدّث كله.

وفيه نوع تاني من مديري الحزم هتقابله بعدين: بتاع لغات البرمجة، زي [[npm]] لـ JavaScript و [[pip]] لـ Python. دول بيسطّبوا «مكتبات» جوه مشروعك، مش برامج على الجهاز (درس «المكتبة والفريمورك» في القسم الجاي).`,
            when: R`أي أداة مطوّر: Git و Node و Python و VS Code و Docker، والأدوات الصغيرة زي [[tree]] و [[curl]]. ولو البرنامج مش موجود في مدير الحزم، نزّله من موقعه الرسمي بس، واكتب عنوانه بإيدك بدل ما تدوس على أول إعلان في جوجل.`,
            mistakes: R`تنسى [[sudo apt update]] قبل التسطيب على جهاز جديد، فيقولك [[Unable to locate package]]. تستخدم [[sudo]] مع [[brew]] أو مع [[npm install -g]]. تسطّب نفس البرنامج بطريقتين (مرة من الموقع ومرة من مدير الحزم) فيبقى عندك نسختين والترمنال يشغّل القديمة. تنزّل برامج من مواقع «تحميل مجاني» مش رسمية. وعلى ويندوز: تجرّب البرنامج في ترمنال كان مفتوح قبل التسطيب وتستغرب إنه مش موجود (الدرس الجاي بيشرح ليه).`
          },
          teach: R`## المثال: نفس المهمة على ٣ أنظمة

كل جزء في المثال بيعمل نفس الحاجة: يسطّب Git ويتأكد إنه اتسطب. الفرق اسم مدير الحزم.

---

## ١. أوبونتو و WSL: [[apt]]

### [[sudo apt update]]

| الحتة | معناها |
|---|---|
| [[sudo]] | نفّذ ده بصلاحيات المدير (درس «root و sudo») |
| [[apt]] | مدير الحزم بتاع أوبونتو و Debian |
| [[update]] | حدّث «الكتالوج»: لستة البرامج المتاحة ونسخها |

مبيسطّبش حاجة. اتجرّب على أوبونتو 24.04 (جوه Docker كـ root، فمكانش محتاج [[sudo]])، وآخر سطوره:

~~~text الناتج (آخره)
Reading package lists...
Building dependency tree...
Reading state information...
3 packages can be upgraded. Run 'apt list --upgradable' to see them.
~~~

آخر سطر بيقولك فيه ٣ برامج متسطبة ليها نسخة أحدث (ودي بيحدّثها [[sudo apt upgrade]]).

### [[sudo apt install git]]

[[install]] سطّب، و [[git]] اسم الحزمة. أهم سطور الناتج:

~~~text الناتج (مختصر)
The following additional packages will be installed:
...
Need to get 20.8 MB of archives.
After this operation, 92.7 MB of additional disk space will be used.
Setting up git (1:2.43.0-1ubuntu7.3) ...
~~~

| السطر | معناه |
|---|---|
| [[additional packages]] | حاجات تانية Git محتاجها (dependencies) هتتسطب معاه |
| [[Need to get 20.8 MB]] | هينزّل ٢٠.٨ ميجا |
| [[92.7 MB of additional disk space]] | هياخد ٩٢.٧ ميجا من الديسك بعد ما يتفك |
| [[Setting up git]] | بيسطّب فعلًا، والرقم بعده النسخة |

وعلى جهازك هيسألك [[Do you want to continue? [Y/n]]]: الحرف الكابيتال [[Y]] هو الافتراضي، فـ Enter لوحدها = نعم.

### [[git --version]]

~~~text الناتج
git version 2.43.0
~~~

---

## ٢. الماك: [[brew]]

[[brew install git]] نفس الفكرة. Homebrew بيتسطب الأول من brew.sh، ومش محتاج [[sudo]]. (من دليل Homebrew، مفيش ماك هنا.)

---

## ٣. ويندوز: [[winget]]

### [[winget search vscode]]

[[search]] دوّر. اتجرّب على ويندوز ١١، أول سطور الجدول:

~~~text الناتج (أوله)
Name                                      Id                                        Version      Match                              Source
------------------------------------------------------------------------------------------------------------------------------------------
Microsoft Visual Studio Code              Microsoft.VisualStudioCode                1.140.0      Moniker: vscode                    winget
Visual Studio / Code for Command Palette  15722UsefulApp.WorkspaceLauncherForVSCode 1.30.0.0     Tag: vscode                        winget
Codium                                    Alex313031.Codium                         1.93.1.24277 Tag: vscode                        winget
~~~

| العمود | معناه |
|---|---|
| [[Name]] | اسم البرنامج |
| [[Id]] | الاسم الفريد اللي بتسطّب بيه: [[Microsoft.VisualStudioCode]] |
| [[Version]] | آخر نسخة |
| [[Match]] | ليه ظهر في البحث: [[Moniker: vscode]] اسم مختصر رسمي، [[Tag: vscode]] كلمة مكتوبة عليه |
| [[Source]] | جاي من أنهي كتالوج |

> خد الـ Id من أول سطر (اللي الـ Match بتاعه Moniker)، لأن البحث بيطلّع برامج تانية شبه الاسم.

### [[winget install Git.Git]]

سطّب بالـ Id [[Git.Git]]. ممكن تطلعلك رسالة UAC (موافقة المدير). وفي الآخر [[Successfully installed]]. (متجربناش التسطيب هنا عشان Git متسطب أصلًا، والشكل من دليل winget.)

### [[git --version]]

~~~text الناتج على ويندوز
git version 2.56.0.windows.1
~~~

---

## الخلاصة

| | أوبونتو | الماك | ويندوز |
|---|---|---|---|
| المدير | [[apt]] | [[brew]] | [[winget]] |
| حدّث الكتالوج | [[sudo apt update]] | [[brew update]] | تلقائي |
| دوّر | [[apt search]] | [[brew search]] | [[winget search]] |
| سطّب | [[sudo apt install]] | [[brew install]] | [[winget install]] |
| حدّث كله | [[sudo apt upgrade]] | [[brew upgrade]] | [[winget upgrade --all]] |`,
          example: R`# Ubuntu / WSL:
sudo apt update
sudo apt install git
git --version
# Mac (install Homebrew first from brew.sh):
brew install git
git --version
# Windows (PowerShell):
winget search vscode
winget install Git.Git
git --version`,
          lines: [
            "حدّث لستة البرامج المتاحة ونسخها (مش بيسطّب حاجة، بيجيب الكتالوج الجديد بس). محتاج [[sudo]].",
            "سطّب Git. هيوريك هيسطّب إيه ومساحته، ولو سألك تكمّل ولا لأ ([[Y/n]]) دوس Enter.",
            "اتأكد إنه اتسطب: لازم يطبع رقم النسخة.",
            "نفس الحكاية على الماك. و brew مش محتاج [[sudo]]، ومينفعش تشغّله بيه أصلًا.",
            "نفس التأكيد على الماك.",
            "ويندوز: دوّر على برنامج بالاسم، وهيطلعلك جدول فيه اسمه والـ Id بتاعه. الـ Id هو اللي بتسطّب بيه.",
            "سطّب Git بالـ Id بتاعه. ممكن تظهرلك رسالة UAC تطلب موافقة المدير.",
            "اتأكد إنه اتسطب. على ويندوز اقفل الترمنال وافتحه الأول، الدرس الجاي بيشرح ليه."
          ],
          try: R`سطّب أداة صغيرة اسمها [[tree]] بمدير الحزم بتاع نظامك ([[sudo apt install tree]] أو [[brew install tree]])، وجرّب [[tree ~/lab]]. ولو على ويندوز: [[tree]] موجود فيه أصلًا، بس بيعرض الفولدرات بس، فجرّب [[tree /f $HOME\lab]] عشان يعرض الملفات كمان. وبعدين [[winget search git]] واقرا الجدول، ولو Git مش متسطب سطّبه بـ [[winget install Git.Git]].`,
          sol: R`[[sudo apt install tree]] هيطلب باسوردك، وبعدين يطبع سطور زي [[The following NEW packages will be installed:]] وتحتها [[tree]]، وفي الآخر [[Setting up tree]]. ولو نسيت [[sudo]] هيقولك [[E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)]] وبعدها [[are you root?]]. وبعد التسطيب [[tree ~/lab]] هيرسم الفولدرات والملفات كشجرة، وفي الآخر سطر زي [[3 directories, 5 files]].

على الماك [[brew install tree]] هيطبع سطور بتبدأ بـ [[==>]] وهو بينزّل ويسطّب. وعلى ويندوز [[winget search git]] طلّع جدول أعمدته [[Name]] و [[Id]] و [[Version]] و [[Match]] (ليه البرنامج ده ظهر، زي [[Tag: git]]) و [[Source]]، وأول سطرين [[Git]] بالـ Id [[Git.Git]] و [[Microsoft.Git]]. وأول مرة ممكن يسألك توافق على شروط المصدر: اكتب [[Y]]. و [[tree /f $HOME\lab]] بيرسم الشجرة بخطوط زي [[└───]]. و [[winget install Git.Git]] هينزّل ويسطّب وفي الآخر [[Successfully installed]]. ولو [[winget]] نفسه طلع [[is not recognized]]، حدّث برنامج App Installer من Microsoft Store.`
        },
        {
          cmd: "PATH",
          title: "ليه الترمنال بيقول command not found وانت لسه مسطّب البرنامج",
          desc: R`لما تكتب اسم أمر زي [[git]] أو [[node]]، الشيل مش بيدوّر في الجهاز كله: بيدوّر في لستة فولدرات معينة اسمها PATH، بالترتيب. لو البرنامج متسطب في فولدر مش في اللستة دي، هيقولك [[command not found]] (أو [[is not recognized]] على ويندوز) حتى لو البرنامج موجود.

في PowerShell [[echo $PATH]] بيطبع سطر فاضي (المتغير هناك اسمه [[$env:Path]])، و [[which]] مش موجود، فاستخدم سطور ويندوز.`,
          deep: {
            why: R`لو الشيل دوّر في كل الديسك كل مرة تكتب أمر، كان كل أمر هياخد دقايق. فبدل كده فيه لستة قصيرة بالأماكن اللي البرامج متعودة تتحط فيها. وأشهر مشكلة بتقابل أي حد بيسطّب أدوات برمجة: «سطّبت Node أو Python والترمنال بيقول مش لاقيه». وفي أغلب المرات السبب PATH.`,
            how: R`PATH متغير بيئة (المستوى ٣ بيشرحها) قيمته فولدرات ورا بعض. على أوبونتو بيبقى فيه حاجات زي [[/usr/local/bin]] و [[/usr/bin]] و [[/bin]] و [[/snap/bin]]. لما تكتب [[git]]، الشيل بيبص في أول فولدر، مش لاقيه؟ اللي بعده، وهكذا، وأول واحد يلاقيه فيه بيشغّله. ولو خلّص اللستة كلها: [[command not found]]. عشان كده لو عندك نسختين من البرنامج، اللي فولدرها أول في اللستة هي اللي بتشتغل.

والمهم: كل ترمنال بياخد نسخة من PATH لما يتفتح. فلو الـ installer عدّل PATH، الترمنالات المفتوحة مش هتعرف. الحل: اقفل الترمنال وافتحه تاني (ولو الترمنال جوه VS Code، اقفل VS Code كله وافتحه).

والسكربت أو البرنامج اللي في الفولدر الحالي مش في PATH، عشان كده بتشغّله بـ [[./script.sh]]: انت بتديله المسار بنفسك فالشيل مش محتاج يدوّر.

تزوّد فولدر لـ PATH على لينكس والماك بسطر في [[~/.bashrc]] أو [[~/.zshrc]] زي [[export PATH="$HOME/.local/bin:$PATH"]] (يعني «الفولدر ده، وبعده اللستة القديمة كلها»). وعلى ويندوز من شاشة Environment Variables (في تاب اختصارات النظام المستوى ٢ درس «عدّل PATH ومتغيرات البيئة من الواجهة»). وأغلب الـ installers بتعمل ده لوحدها لو علّمت على الاختيار الصح، زي [[Add python.exe to PATH]] في installer بتاع Python على ويندوز.`,
            when: R`كل مرة تسطّب أداة وتلاقي [[command not found]] أو [[is not recognized]]. وكل مرة أمر يشغّل نسخة غير اللي متوقعها (مثلًا [[node --version]] يطلع رقم قديم): [[which node]] أو [[Get-Command node]] هيقولك هو جاي منين.`,
            mistakes: R`تنسى تقفل الترمنال وتفتحه بعد التسطيب، وتعيد التسطيب ٣ مرات. تكتب [[export PATH="$HOME/bin"]] من غير [[:$PATH]] في الآخر، فتمسح اللستة كلها وكل الأوامر تقول [[command not found]] (اقفل الترمنال وافتحه، التغيير كان للجلسة دي بس). على ويندوز تستخدم [[setx PATH]] فيقص القيمة لو طويلة، استخدم الواجهة. وعلى ويندوز تكتب [[python]] على جهاز جديد فيفتحلك Microsoft Store بدل Python: ده اختصار من ويندوز نفسه، سطّب Python بجد (ولو سطّبته من python.org جرّب [[py]]).`
          },
          teach: R`## المثال: نشوف اللستة ونسأل «الأمر ده جاي منين؟»

---

## ١. لينكس والماك

### [[echo $PATH]]

[[$PATH]] يعني «قيمة متغير اسمه PATH». اتجرّب على أوبونتو 24.04 (جوه Docker):

~~~text الناتج
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
~~~

دي ٦ فولدرات بينهم [[:]]. لما تكتب [[git]]، الشيل بيدوّر بالترتيب ده بالظبط:

| الترتيب | الفولدر |
|---|---|
| ١ | [[/usr/local/sbin]] |
| ٢ | [[/usr/local/bin]] |
| ٣ | [[/usr/sbin]] |
| ٤ | [[/usr/bin]] |
| ٥ | [[/sbin]] |
| ٦ | [[/bin]] |

وأول فولدر يلاقي فيه البرنامج بيشغّله منه. ولو مالقاهوش في الست: [[command not found]].

### [[which python3]]

[[which]] = «أنهي واحد؟»: بيعمل نفس التدوير ويطبع المسار اللي لقاه. جربناه على [[ls]] و [[bash]] (صورة Docker مفيهاش python3):

~~~text الناتج
/usr/bin/ls
/usr/bin/bash
~~~

### [[which nothing-here]]

أمر مش موجود: مبيطبعش ولا حرف. ولو بعده [[echo $?]] هيطبع [[1]] (فشل).

---

## ٢. ويندوز (PowerShell)

### [[$env:Path -split ";"]]

| الحتة | معناها |
|---|---|
| [[$env:Path]] | متغير البيئة Path (على ويندوز الفاصل [[;]] مش [[:]]، لأن [[:]] موجودة في [[C:]]) |
| [[-split ";"]] | قسّم النص عند كل [[;]]، فكل فولدر يطلع في سطر |

اتجرّب في PowerShell 7، أول سطور:

~~~text الناتج (أوله)
C:\Program Files\WindowsApps\Microsoft.PowerShell_7.6.6.0_x64__8wekyb3d8bbwe
C:\WINDOWS\system32
C:\WINDOWS
C:\WINDOWS\System32\Wbem
C:\WINDOWS\System32\WindowsPowerShell\v1.0\
C:\WINDOWS\System32\OpenSSH\
~~~

### [[Get-Command node]]

زي [[which]]:

~~~text الناتج
CommandType     Name                                               Version    Source
-----------     ----                                               -------    ------
Application     node.exe                                           24.19.0.0  C:\Program Files\nodejs\node.exe
~~~

[[Application]] يعني برنامج حقيقي (مش alias)، و [[Source]] المكان اللي هيتشغّل منه.

> لو فتحت PowerShell من جوه Git Bash، [[Get-Command git]] طلّع مسار تاني ([[C:\Program Files\Git\ucrt64\bin\git.exe]]) لأن Git Bash بيحط فولداراته أول اللستة. نفس البرنامج من مكان تاني: ده بالظبط معنى «الترتيب مهم».

---

## ٣. تجربة «جرّب»: أمرك انت

اتجرّبت على أوبونتو 24.04 (جوه Docker، كيوزر ali):

| الخطوة | الناتج |
|---|---|
| [[hi]] | [[hi: command not found]] |
| [[./bin/hi]] | [[hi from my own command]] |
| [[export PATH="$PWD/bin:$PATH"]] | مفيش ناتج |
| [[hi]] | [[hi from my own command]] |
| [[which hi]] | [[/home/ali/lab/bin/hi]] |

نفك سطر [[export]]: [[export]] خلّي التغيير ده يشوفه أي برنامج تشغّله، و [[$PWD]] الفولدر الحالي، و [[:$PATH]] في الآخر يعني «وبعده اللستة القديمة كلها». ولو نسيت [[:$PATH]] هتمسح اللستة.

---

## الخلاصة

~~~text
PATH       لستة فولدرات، الشيل بيدوّر فيها بالترتيب
:  و  ;    الفاصل في لينكس وويندوز
which / Get-Command    الأمر ده جاي منين؟
installer عدّل PATH؟   اقفل الترمنال وافتحه
~~~`,
          example: R`# Linux و Mac:
echo $PATH
which python3
which nothing-here
# Windows (PowerShell):
$env:Path -split ";"
Get-Command node`,
          lines: [
            "اطبع الـ PATH: فولدرات بينها [[:]]، والشيل بيدوّر فيهم من الشمال لليمين.",
            "[[which]] بيقولك الأمر ده هيتشغّل من أنهي فولدر بالظبط.",
            "أمر مش موجود: [[which]] مش هيطبع حاجة خالص.",
            "ويندوز: نفس اللستة بس الفاصل [[;]]، و [[-split]] بيحط كل فولدر في سطر.",
            "ويندوز: زي [[which]]، بيقولك node هيتشغّل منين. (وفي CMD الأمر [[where node]])"
          ],
          try: R`اعمل أمر بتاعك انت (التجربة دي في bash: لينكس أو الماك أو WSL): في فولدر lab اعمل فولدر [[bin]] وجواه ملف [[hi]] فيه السطرين [[#!/usr/bin/env bash]] و [[echo "hi from my own command"]]، واعمله [[chmod +x bin/hi]]. جرّب [[hi]]، وبعدين [[./bin/hi]]، وبعدين [[export PATH="$PWD/bin:$PATH"]] وجرّب [[hi]] تاني و [[which hi]].`,
          sol: R`أول [[hi]] هيقولك [[hi: command not found]] (أو [[bash: hi: command not found]] حسب النظام): الملف موجود، بس فولدره مش في PATH. و [[./bin/hi]] هيطبع [[hi from my own command]] لأنك اديته المسار بنفسك. بعد الـ [[export]]، [[hi]] لوحده هيشتغل، و [[which hi]] هيطبع [[/home/ali/lab/bin/hi]]. ([[$PWD]] متغير فيه الفولدر الحالي.)

لو قفلت الترمنال وفتحته، [[hi]] هيرجع [[command not found]]، لأن [[export]] للجلسة دي بس. وده بالظبط اللي بيحصل مع الـ installers: بيعدّلوا الإعداد الدايم، والترمنال القديم معاه النسخة القديمة. على ويندوز جرّب بدل كده [[Get-Command git]]: لو Git متسطب هيطبع سطر فيه [[Application]] و [[git.exe]] والمسار، زي [[C:\Program Files\Git\cmd\git.exe]]. و [[Get-Command node]] طبع عندنا [[C:\Program Files\nodejs\node.exe]]. ولو كتبت أوامر لينكس في PowerShell: [[echo $PATH]] طبع سطر فاضي، و [[which python3]] قال [[The term 'which' is not recognized]].`
        },
        {
          cmd: "root و sudo",
          title: "المدير والصلاحيات",
          desc: R`النظام بيفصل بين يوزر عادي ومدير. على لينكس المدير اسمه [[root]]، و [[sudo]] قبل الأمر بتديك صلاحياته للأمر ده بس بعد ما تكتب باسوردك، والماك نفس الكلام. وويندوز بيسمّيها «Run as administrator» ورسالة UAC اللي بتسألك «تسمح للبرنامج ده يعدّل جهازك؟». استخدم الصلاحيات دي بس للي محتاجها فعلًا: تسطيب برامج النظام وتعديل إعداداته.`,
          deep: {
            why: R`المدير يقدر يعمل أي حاجة، حتى يمسح النظام كله بغلطة واحدة. وأي برنامج بتشغّله بياخد نفس صلاحياتك: لو انت مدير طول الوقت، أي فيروس أو سكربت غلط بقى مدير هو كمان. عشان كده من الأمان إنك تشتغل بيوزر عادي، ولما تحتاج صلاحيات المدير تطلبها لأمر واحد وانت واعي.`,
            how: R`لما تكتب [[sudo]] قبل أمر، النظام بيتأكد إن اليوزر بتاعك في جروب المسموحلهم (على أوبونتو جروب اسمه sudo، و [[groups]] بيوريك جروباتك)، ويطلب باسوردك انت مش باسورد root، ويشغّل الأمر كـ root، ويسجّل ده في لوج. وبيفتكر الباسورد حوالي ١٥ دقيقة.

وانت بتكتب الباسورد في الترمنال مفيش أي حاجة بتظهر، ولا حتى نجوم. ده طبيعي ومقصود عشان محدش يعرف طوله. اكتبه عادي ودوس Enter.

على ويندوز: حتى لو حسابك Administrator، البرامج بتشتغل بصلاحيات عادية لحد ما تطلب. كليك يمين على Windows Terminal أو PowerShell ثم Run as administrator، أو دوّر على البرنامج في قايمة Start ودوس Ctrl+Shift+Enter. هتطلعلك رسالة UAC، ولما توافق هتلاقي في عنوان الشباك كلمة [[Administrator]]. وويندوز ١١ الجديد فيه كمان أمر [[sudo]] بتفعّله من إعدادات المطوّر (For developers).`,
            when: R`على لينكس: [[apt install]] و [[apt update]]، وتعديل ملفات في [[/etc]]، وإدارة الخدمات بـ [[systemctl]]. على ويندوز: [[wsl --install]]، وتعديل ملف hosts، وبعض الـ installers. وفي غير كده؟ غالبًا مش محتاجها.`,
            mistakes: R`تحط [[sudo]] قبل أي أمر بيرفض: لو الملف جوه مشروعك، [[sudo]] هيعمل ملفات ملك root، وبعدها حتى الأوامر العادية تقولك [[Permission denied]] (الحل [[sudo chown -R $USER:$USER ~/projects/app]] اللي بيرجّع الملكية ليك). [[sudo npm install -g]] بيبوّظ صلاحيات npm، والحل الصح nvm (تاب Node و npm). [[sudo cd /root]] مش هيشتغل لأن [[cd]] جوه الشيل نفسه مش برنامج. وعلى ويندوز: تشغّل VS Code أو الترمنال as administrator على طول «عشان المشاكل تخلص»، فالملفات اللي بتتعمل تبقى ملك المدير وتعمل مشاكل بعدين.`
          },
          teach: R`## المثال: نفس الأمر بصلاحيات مختلفة

---

## ١. لينكس و WSL

اتجرّب على أوبونتو 24.04 (جوه Docker، بيوزر عادي اسمه ali ضفناه لجروب sudo).

### [[whoami]]

~~~text الناتج
ali
~~~

### [[sudo whoami]]

[[sudo]] اختصار «superuser do»: نفّذ الأمر اللي بعدي كمدير.

~~~text الناتج
[sudo] password for ali:
root
~~~

طلب باسورد [[ali]] (مش باسورد root)، وبعدين [[whoami]] رد [[root]]: الأمر ده بس اتنفّذ كمدير. وانت بتكتب الباسورد مش هيظهر أي حرف، وده طبيعي.

وجربنا [[groups]] (جروباتي إيه؟) فطلع [[ali sudo]]: وجود [[sudo]] هنا هو اللي بيسمح لـ ali يستخدمه.

### [[apt update]] من غير sudo

~~~text الناتج
Reading package lists...
E: Could not open lock file /var/lib/apt/lists/lock - open (13: Permission denied)
E: Unable to lock directory /var/lib/apt/lists/
~~~

| الحتة | معناها |
|---|---|
| [[E:]] | Error |
| [[lock file]] | ملف بيمنع برنامجين يعدّلوا لستة البرامج في نفس الوقت |
| [[/var/lib/apt/lists/]] | فولدر نظام، ملك root |
| [[13: Permission denied]] | ممنوع ([[13]] رقم الخطأ ده في لينكس) |

### [[sudo apt update]]

نفس الأمر بـ sudo: هيشتغل ويطبع سطور [[Hit:]] و [[Get:]] (بيجيب الكتالوج من السيرفرات) وفي الآخر عدد الحزم اللي ليها تحديث.

---

## ٢. ويندوز (PowerShell)

### [[whoami]]

اتجرّب في PowerShell 7 و 5.1 (غيّرنا الأسامي):

~~~text الناتج
laptop\ali
~~~

اسم الجهاز، و [[\]]، واسمك.

### [[net session]]

أمر بيعرض مين متصل بملفاتك المتشاركة، وبيحتاج صلاحيات المدير. فبنستخدمه كاختبار: «الشباك ده مدير؟». من PowerShell عادي:

~~~text الناتج
System error 5 has occurred.

Access is denied.
~~~

[[System error 5]] هو رقم «ممنوع» في ويندوز. ولو فتحت PowerShell بـ Run as administrator الرسالة دي مش هتظهر.

---

## الخلاصة

| | لينكس | الماك | ويندوز |
|---|---|---|---|
| المدير | [[root]] | [[root]] | Administrator |
| أمر واحد كمدير | [[sudo]] قبله | [[sudo]] قبله | Run as administrator |
| الباسورد | باسوردك انت | باسوردك انت | رسالة UAC |
| علامة الـ prompt | [[#]] | [[#]] | كلمة Administrator في العنوان |`,
          example: R`# Linux (and WSL):
whoami
sudo whoami
apt update
sudo apt update
# Windows (PowerShell):
whoami
net session`,
          try: R`على لينكس أو WSL: اكتب [[apt update]] من غير sudo وشوف الرفض، وبعدين بـ sudo، ولاحظ إن الباسورد مش بيظهر وانت بتكتبه. وعلى ويندوز: افتح PowerShell عادي واكتب [[net session]]، وبعدين افتحه Run as administrator واكتبه تاني.`,
          lines: [
            "انت مين؟ هيطبع اسمك.",
            "نفس السؤال بصلاحيات المدير، فهيطبع [[root]]. ده بيوضّح إن sudo بيخليك مدير للأمر ده بس.",
            "تحديث لستة البرامج من غير صلاحيات، فهيرفض.",
            "نفس الأمر بـ sudo، فهيشتغل (بعد ما تكتب الباسورد).",
            R`ويندوز: [[whoami]] موجود في ويندوز كمان، وبيطبع اسم الجهاز واسمك زي [[laptop\ali]].`,
            "ويندوز: أمر محتاج صلاحيات المدير، فمن PowerShell عادي هيرفض بـ [[Access is denied]]. اختبار سريع: الشباك ده مدير ولا لأ."
          ],
          sol: R`[[whoami]] هيطبع اسمك، و [[sudo whoami]] هيطلب باسوردك ويطبع [[root]]: الأمر اتنفذ كمدير. [[apt update]] من غير sudo هيطلع [[E: Could not open lock file /var/lib/apt/lists/lock - open (13: Permission denied)]]، ومع sudo هيشتغل ويطبع سطور [[Hit:]] و [[Get:]] وفي الآخر عدد الحزم اللي ليها تحديث. ولو كتبت الباسورد ومفيش حاجة ظهرت، ده الطبيعي. و [[sudo]] بيفتكر الباسورد حوالي ١٥ دقيقة، فالأمر التاني مش هيسألك. ولو طلعلك [[ali is not in the sudoers file]] يبقى اليوزر ده مش مسموحله يبقى مدير.

على ويندوز [[whoami]] طبع [[laptop\ali]] (اسم جهازك واسمك)، و [[net session]] من غير صلاحيات قال [[System error 5 has occurred.]] و [[Access is denied.]]. وكمدير الرسالة دي مش هتظهر، وهيعرض لستة الناس المتصلين بملفاتك (غالبًا فاضية)، ولاحظ إن عنوان الشباك فيه Administrator. ولو كتبت [[apt update]] في PowerShell هيقولك [[The term 'apt' is not recognized]]، و [[sudo whoami]] على ويندوز ١١ وهو مش متفعّل (وده الافتراضي) قال [[Sudo is disabled on this machine. To enable it, go to the Developer Settings page in the Settings app]]. وعلى الماك مفيش apt أصلًا (عندك [[brew]] ومش محتاج sudo)، بس [[sudo whoami]] شغال زي لينكس.`
        },
        {
          cmd: "محرر النصوص",
          title: "ليه متكتبش كود في Word",
          desc: R`الكود بيتكتب في «محرر نصوص» (text editor) زي VS Code أو Notepad أو nano، وده بيحفظ الحروف اللي كتبتها بالظبط ومفيش غيرها. أما Word و Google Docs فاسمهم «معالج نصوص» (word processor): بيحفظوا معاك خطوط وألوان وتنسيق، والملف بتاعهم من جوه مش نص عادي، وبيغيّروا علامات التنصيص والشرط من غير ما تاخد بالك، فالكود يبوظ.`,
          deep: {
            why: R`البرامج (المتصفح و Node و Python والسيرفر) بتقرا ملف الكود حرف حرف، وأي حاجة زيادة أو متغيرة بتبوّظه. Word معمول لبني آدمين بيقروا مستند متنسق، مش لبرامج. وبيعمل «تصحيح تلقائي» لطيف في الكلام بس مدمّر في الكود: [["]] بتبقى [[“]]، و [[--]] بتبقى [[—]]، وأول حرف في السطر بيبقى كابيتال.`,
            how: R`ملف [[.txt]] أو [[.js]] أو [[.html]] جواه الحروف وبس (ومعاها رمز آخر السطر). أما ملف [[.docx]] فهو في الحقيقة ملف ZIP جواه ملفات XML كتير فيها الكلام والتنسيق والخطوط والإعدادات. عشان كده كلمة واحدة في Word حجمها آلاف البايتات.

محررات النصوص اللي هتقابلها: VS Code (اللي هتستخدمه في البرمجة، الدرس الجاي). و Notepad على ويندوز، و TextEdit على الماك، و Text Editor على أوبونتو، ودول ينفعوا لتعديل سريع. و [[nano]] و [[vim]] جوه الترمنال، ودول هتحتاجهم على السيرفر لأنه مفيهوش واجهة (تاب VPS أوبونتو المستوى ١).

TextEdit على الماك بيفتح افتراضيًا في وضع Rich Text (زي Word)، فلازم Format ثم Make Plain Text (Shift+Cmd+T) قبل ما تكتب فيه كود.`,
            when: R`أي كود، وأي ملف إعدادات ([[.json]] و [[.env]] و [[.yml]])، وأي سكربت: محرر نصوص. و Word و Google Docs للمستندات اللي هيقراها بني آدم: CV أو تقرير.`,
            mistakes: R`تكتب كود في Word أو Google Docs وتنسخه. تنسخ كود من PDF أو واتساب فييجي معاه تنصيص مايل. تعدّل ملف [[.json]] في TextEdit وهو في وضع Rich Text فيبوظ. أو تفتح ملف كود بـ Word «عشان تشوفه بس»، فيعرض عليك تحفظه بصيغته هو.`
          },
          teach: R`## المثال: نفس الكلمة، ملفين مختلفين خالص

المثال بيقارن [[notes.txt]] (من محرر نصوص) و [[notes.docx]] (من Word) وفيهم نفس الكلمة hello.

اتجرّب على أوبونتو 24.04 (جوه Docker). ملف الـ docx عملناه بمكتبة Python اسمها python-docx لأن مفيش Word هنا، فحجمه غير اللي Word أو LibreOffice بيعمله، بس الفكرة نفسها.

---

## ١. [[ls -l notes.txt notes.docx]]

[[ls -l]] بالتفصيل، والاسمين بعده = اعرض الاتنين دول بس.

~~~text الناتج
-rw-r--r-- 1 root root 36580 Oct  5 23:32 notes.docx
-rw-r--r-- 1 root root     6 Oct  5 23:32 notes.txt
~~~

[[notes.txt]] ٦ بايت (h e l l o وآخر السطر). و [[notes.docx]] [[36580]] بايت لنفس الكلمة!

---

## ٢. [[cat notes.txt]]

~~~text الناتج
hello
~~~

اللي كتبته بالظبط، ومفيش غيره.

---

## ٣. [[file notes.docx]]

~~~text الناتج
notes.docx: Microsoft Word 2007+
~~~

[[file]] عرف النوع من المحتوى: ملف Word بالصيغة الجديدة (من 2007).

---

## ٤. [[unzip -l notes.docx]]

[[unzip]] بيفك الملفات المضغوطة، و [[-l]] (من list) بيعرض اللي جوه بس من غير ما يفك. ليه يشتغل على docx؟ لأن docx أصلًا ZIP:

~~~text الناتج (مختصر)
  Length      Date    Time    Name
---------  ---------- -----   ----
     1738  2026-10-05 23:32   [Content_Types].xml
     1586  2026-10-05 23:32   word/document.xml
   349458  2026-10-05 23:32   word/styles.xml
     2811  2026-10-05 23:32   word/fontTable.xml
...
---------                     -------
   826198                     17 files
~~~

| الملف | فيه إيه |
|---|---|
| [[word/document.xml]] | الكلام نفسه (hello) ملفوف في وسوم XML |
| [[word/styles.xml]] | التنسيقات |
| [[word/fontTable.xml]] | الخطوط |
| [[[Content_Types].xml]] | فهرس الملفات |

١٧ ملف عشان كلمة واحدة. وأول حرفين في الملف [[PK]]: توقيع ZIP.

---

## ٥. ويندوز (PowerShell)

| السطر | بيعمل إيه |
|---|---|
| [[ls notes.txt, notes.docx]] | الفاصلة بتخلي الاسمين لستة واحدة، والحجم في عمود [[Length]] |
| [[cat notes.txt]] | [[cat]] اسم مختصر لـ [[Get-Content]]: اطبع المحتوى |
| [[tar -tf notes.docx]] | [[tar]] جاي مع ويندوز ١١ وبيقرا ZIP: [[-t]] اعرض اللي جوه، و [[-f]] وبعده اسم الملف |

اتجرّب في PowerShell 7 و 5.1: [[notes.txt]] اتعمل بـ [[Set-Content]] وطلع [[Length]] بـ [[7]] (ويندوز بيكتب آخر السطر بايتين)، و [[cat notes.txt]] طبع [[hello]].

---

## الخلاصة

~~~text
محرر نصوص (VS Code, Notepad, nano)   بيحفظ الحروف بس
Word / Google Docs                     ZIP فيه XML وتنسيق
الكود دايمًا في محرر نصوص
~~~`,
          example: R`# Linux و Mac:
ls -l notes.txt notes.docx
cat notes.txt
file notes.docx
unzip -l notes.docx
# Windows (PowerShell):
ls notes.txt, notes.docx
cat notes.txt
tar -tf notes.docx`,
          lines: [
            "قارن الحجم: نفس كلمة hello، مرة محفوظة من محرر ومرة من Word.",
            "[[cat]] بيطبع محتوى الملف النصي: الكلمة اللي كتبتها بس.",
            "[[file]] بيقولك ملف Word نوعه إيه من جوه.",
            "[[unzip -l]] بيعرض اللي جوه ملف مضغوط من غير ما يفكّه. وملف Word طلع مضغوط وجواه ملفات كتير.",
            "ويندوز: اعرض الملفين، والحجم في عمود [[Length]]. الفاصلة [[,]] بين الاسمين عشان PowerShell ياخدهم لستة. (و [[ls -l notes.txt notes.docx]] هنا مش هيطلع error، بس هيعرض notes.txt لوحده من غير ما يقولك!)",
            "ويندوز: [[cat]] في PowerShell اسم مختصر لـ [[Get-Content]]، وبيطبع محتوى الملف.",
            "ويندوز: مفيش [[file]] ولا [[unzip]] في PowerShell، بس ويندوز ١١ (والنسخ الحديثة من ١٠) فيه [[tar]] اللي بيقرا ملفات ZIP كمان: [[-t]] اعرض اللي جواه بس، و [[-f]] وبعدها اسم الملف."
          ],
          try: R`اكتب كلمة hello في محرر نصوص (Notepad، أو TextEdit في وضع Plain Text، أو Text Editor) واحفظها [[notes.txt]] في فولدر lab. ولو عندك Word أو LibreOffice، اكتب نفس الكلمة واحفظها [[notes.docx]] في نفس الفولدر. وبعدين نفّذ أوامر نظامك من المثال.`,
          sol: R`[[ls -l]] هيوريك [[notes.txt]] حجمه [[6]] بايت (٥ حروف وآخر السطر)، و [[notes.docx]] حجمه آلاف البايتات: في تجربتنا [[4880]] لملف عمله LibreOffice، و Word بيعمل أكبر. [[cat notes.txt]] يطبع [[hello]]. و [[file notes.docx]] يطبع [[Microsoft Word 2007+]]. و [[unzip -l notes.docx]] عرض ١٠ ملفات جوه، منهم [[word/document.xml]] (الكلام) و [[word/styles.xml]] (التنسيق) و [[[Content_Types].xml]].

حجم [[notes.txt]] ممكن يفرق عندك بايت أو اتنين: لو المحرر محطش سطر جديد بعد الكلمة هيبقى ٥، وويندوز بيكتب آخر السطر بايتين، فعلى ويندوز ملف اتعمل بـ [[Set-Content]] طلع [[7]].

لو جربت [[cat notes.docx]] هيطبع رموز غريبة أولها [[PK]]، وده توقيع ملفات ZIP. ولو مش عندك [[unzip]]: [[sudo apt install unzip]]. وعلى ويندوز في PowerShell (7 و 5.1): [[ls notes.txt, notes.docx]] طبع جدول فيه [[Length]] بـ [[7]] و [[4880]]، و [[cat notes.txt]] طبع [[hello]]، و [[tar -tf notes.docx]] طبع نفس الـ ١٠ ملفات، و [[unzip]] قال [[The term 'unzip' is not recognized]].`
        },
        {
          cmd: "VS Code",
          title: "تسطّب محرر الكود وتفتح بيه فولدر",
          desc: R`VS Code محرر كود مجاني من مايكروسوفت، شغال على ويندوز والماك ولينكس، وأغلب المبرمجين بيستخدموه. بيلوّن الكود، ويكمّل وانت بتكتب، ويوريك الأخطاء، وفيه ترمنال جواه. وأهم عادة: افتح «الفولدر» بتاع المشروع كله مش ملف لوحده، ومن الترمنال [[code .]] بتفتح الفولدر اللي انت فيه.`,
          deep: {
            why: R`ممكن تكتب كود في Notepad، بس هتتعب: مفيش ألوان تفرق الكلمات عن بعض، ولا حد يقولك «القوس ده مقفلتهوش»، ولا طريقة تشوف كل ملفات المشروع مع بعض. VS Code بيعمل كل ده ومجاني، وكل تابات البرمجة في الصفحة دي بتفترض إنه عندك.`,
            how: R`الشاشة بتتكوّن من: شريط على الشمال (Explorer فيه شجرة ملفات الفولدر اللي فتحته، والبحث، و Git، والـ Extensions)، والمحرر في النص، وتحت لوحة فيها الترمنال (افتحها بـ Ctrl+$__bt)، والترمنال ده بيبدأ في فولدر المشروع على طول.

أمر [[code]] بيتضاف لـ PATH على ويندوز ولينكس لوحده. وعلى الماك لو سطّبته بالسحب لـ Applications: افتح VS Code، ودوس Cmd+Shift+P، واكتب [[Shell Command: Install 'code' command in PATH]].

والـ Extensions إضافات بتسطّبها من جوه البرنامج لكل لغة، وأول ما تفتح ملف بامتداد جديد (زي [[.py]]) هيقترح عليك الإضافة المناسبة. والاختصارات والإعدادات بالتفصيل في تاب VS Code.`,
            when: R`من النهارده. سطّبه، واعمل فولدر [[~/projects/hello]]، وافتحه بـ [[code .]]، ومن هنا ورايح أي ملف في أي تاب اكتبه فيه.`,
            mistakes: R`تفتح ملف واحد بدبل كليك بدل الفولدر كله، فمتلاقيش شجرة ملفات و VS Code ميعرفش باقي المشروع. تسطّب Visual Studio (البرنامج البنفسجي التقيل بتاع C#) بدل Visual Studio Code. تسطّب ٣٠ extension من أول يوم فالبرنامج يتقل. تنسى تحفظ (النقطة اللي جنب اسم الملف في التاب معناها مش محفوظ)، أو فعّل Auto Save من قايمة File. وعلى الماك: تشغّله من Downloads من غير ما تنقله لـ Applications.`
          },
          teach: R`## المثال: ٣ سطور، مكررين لكل نظام

كل نظام: سطّب، واتأكد، وافتح فولدر.

---

## ١. ويندوز

### [[winget install Microsoft.VisualStudioCode]]

[[winget install]] سطّب، و [[Microsoft.VisualStudioCode]] الـ Id اللي شفناه في [[winget search vscode]] (درس «مدير الحزم»).

### [[code --version]]

[[code]] أمر VS Code في الترمنال. اتجرّب في PowerShell على ويندوز ١١:

~~~text الناتج
1.140.0
07f806f999227108933c2e30515b26eecc1fda74
x64
~~~

| السطر | معناه |
|---|---|
| [[1.140.0]] | النسخة |
| الرقم الطويل | الـ commit: بصمة النسخة دي في كود VS Code نفسه |
| [[x64]] | معمول لأنهي معالج (درس «64-bit و ARM») |

لو قالك [[is not recognized]]: اقفل الترمنال وافتحه (درس PATH).

### [[code .]]

[[.]] يعني الفولدر الحالي. فبيفتح VS Code على الفولدر اللي انت واقف فيه، وتلاقي ملفاته على الشمال.

---

## ٢. الماك

### [[brew install --cask visual-studio-code]]

[[--cask]] يعني برنامج بواجهة (مش أداة ترمنال). و [[visual-studio-code]] اسمه في Homebrew. (من دليل Homebrew.)

و [[code --version]] و [[code .]] نفس الكلام. لو [[code]] مش موجود: Cmd+Shift+P في VS Code واكتب [[Shell Command: Install 'code' command in PATH]].

---

## ٣. أوبونتو

### [[sudo snap install --classic code]]

| الحتة | معناها |
|---|---|
| [[snap]] | مدير حزم تاني في أوبونتو، للبرامج الكبيرة |
| [[--classic]] | اديله وصول لملفاتك زي أي برنامج عادي |
| [[code]] | اسم الحزمة |

(من دليل VS Code، لأن Docker مفيهوش snap ولا شاشة.)

---

## الخلاصة

~~~text
code --version   متسطب؟ ونسخة كام؟
code .           افتح الفولدر ده كله (مش ملف لوحده)
Ctrl+$__bt          افتح الترمنال اللي جوه VS Code
~~~`,
          example: R`# Windows (PowerShell):
winget install Microsoft.VisualStudioCode
code --version
code .
# Mac:
brew install --cask visual-studio-code
code --version
code .
# Ubuntu:
sudo snap install --classic code
code --version
code .`,
          lines: [
            "ويندوز: سطّبه بـ winget، أو نزّله من code.visualstudio.com. الـ installer بيضيف [[code]] لـ PATH لوحده.",
            "اتأكد إن أمر [[code]] شغال (افتح ترمنال جديد الأول): بيطبع ٣ سطور: النسخة، ورقم طويل، ونوع الجهاز.",
            "افتح الفولدر الحالي ([[.]] يعني هنا) في VS Code.",
            "الماك: [[--cask]] يعني برنامج بواجهة مش أداة ترمنال.",
            "نفس التأكيد على الماك.",
            "نفس الفتح على الماك.",
            "أوبونتو: من snap، و [[--classic]] بتديله يوصل لملفاتك زي أي برنامج عادي. (أو نزّل ملف [[.deb]] من الموقع)",
            "نفس التأكيد على أوبونتو.",
            "نفس الفتح على أوبونتو."
          ],
          try: R`سطّب VS Code بالطريقة المناسبة لنظامك، واقفل الترمنال وافتحه، واكتب [[code --version]]. وبعدين [[mkdir -p ~/projects/hello]] (في PowerShell [[mkdir -Force ~/projects/hello]]) و [[cd ~/projects/hello]] و [[code .]]، واعمل من جوه VS Code ملف [[index.html]] واكتب فيه أي كلمة واحفظ بـ Ctrl+S.`,
          sol: R`[[code --version]] هيطبع ٣ سطور زي: [[1.140.0]] (النسخة)، وبعدها رقم طويل (الـ commit بتاع النسخة دي)، وبعدها [[x64]] أو [[arm64]]. لو قالك [[command not found]] أو [[is not recognized]]، اقفل الترمنال وافتحه، وعلى الماك اعمل خطوة Shell Command اللي في الشرح.

[[code .]] هيفتح شباك VS Code وعلى الشمال اسم الفولدر [[HELLO]] بحروف كابيتال (ده عرض بس). وأول مرة ممكن يسألك [[Do you trust the authors of the files in this folder?]]: ده فولدرك انت، اختار Yes. وبعد ما تعمل [[index.html]] وتحفظ، [[ls]] في الترمنال هيعرضه. ولاحظ إن VS Code لوّن الكلام وحط أيقونة HTML جنب الملف، لأنه عرف النوع من الامتداد.`
        },
        {
          cmd: "file.txt.txt",
          title: "حفظت index.html والمتصفح فتحه كنص",
          desc: R`ويندوز بيخبي الامتدادات المعروفة افتراضيًا، و Notepad بيضيف [[.txt]] لوحده لو نوع الحفظ «Text Documents». فانت تكتب الاسم [[index.html]] والملف الحقيقي يبقى [[index.html.txt]]، وتشوفه في File Explorer [[index.html]] عادي. الحل: ظهّر الامتدادات مرة واحدة وللأبد، واعمل ملفات الكود من VS Code.`,
          deep: {
            why: R`دي من أشهر مشكلة بتقابل المبتدئ على ويندوز: يعمل [[index.html]] ويفتحه في المتصفح فيلاقي الكود نفسه مكتوب كنص بدل الصفحة، أو يعمل [[script.py]] و Python يقوله الملف مش موجود. وهو شايف الاسم صح قدامه!`,
            how: R`File Explorer فيه إعداد «Hide extensions for known file types» شغال افتراضيًا، فـ [[index.html.txt]] بيظهر [[index.html]] بأيقونة Notepad. والحل الدايم: في ويندوز ١١ View ثم Show ثم File name extensions، وفي ويندوز ١٠ تبويب View وعلّم على File name extensions.

وفي Notepad وقت Save As: غيّر «Save as type» لـ All files، أو حط الاسم بين علامتي تنصيص [["index.html"]] فـ Notepad ميزوّدش حاجة. وعلى الماك TextEdit ممكن يحفظ بـ [[.rtf]] لو مش في وضع Plain Text، أو يسألك تستخدم أنهي امتداد. والأضمن في الحالتين: اعمل الملف من VS Code، لأنه بيحفظ الاسم زي ما كتبته بالظبط.`,
            when: R`أول يوم على أي جهاز ويندوز: ظهّر الامتدادات. وكل ما ملف يتصرف غلط (يتفتح بالبرنامج الغلط، أو أداة تقولك مش لاقياه): اعرضه في الترمنال بـ [[ls]] أو [[dir]] وشوف الاسم الحقيقي.`,
            mistakes: R`تعدّل الاسم في File Explorer والامتدادات لسه مخفية، فتكتب [[index.html]] ويبقى الحقيقي [[index.html.html]]، أو [[.txt]] يفضل مستخبي. تحفظ سكربت [[hello.ps1]] أو [[hello.sh]] من Notepad فيبقى [[hello.ps1.txt]]، وتقضي ساعة فاكر إن المشكلة في الكود. أو تعمل ملف [[.env]] من File Explorer فيبقى [[.env.txt]]: اعمله من VS Code أو من الترمنال.`
          },
          teach: R`## المثال: نشوف الاسم الحقيقي ونصلّحه

الترمنال مبيخبيش امتدادات، فهو أسهل مكان تكتشف فيه المشكلة.

---

## ١. لينكس والماك

### [[ls]]

هيعرض الاسم الحقيقي: [[index.html.txt]].

### [[mv index.html.txt index.html]]

[[mv]] (move) بياخد اسمين: القديم وبعده الجديد. ولو الاتنين في نفس الفولدر، يبقى ده تغيير اسم. مبيطبعش حاجة.

### [[ls]] تاني

[[index.html]] بس.

---

## ٢. ويندوز (PowerShell)

اتجرّب في PowerShell 7 و 5.1:

### [[ls]]

~~~text الناتج
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a---           10/6/2026  2:31 AM              0 index.html.txt
~~~

عمود [[Name]] فيه الاسم كامل، حتى لو File Explorer بيعرضه [[index.html]].

### [[Rename-Item index.html.txt index.html]]

[[Rename-Item]] غيّر الاسم: القديم وبعده الجديد. ([[mv]] شغال كمان كاسم مختصر لـ [[Move-Item]].)

### [[ls]] تاني

الاسم بقى [[index.html]].

---

## ٣. إزاي الغلطة بتحصل أصلًا؟

1. File Explorer مخبي الامتدادات المعروفة (الإعداد الافتراضي).
2. Notepad نوع الحفظ فيه «Text Documents (*.txt)»، فبيزوّد [[.txt]] على الاسم.
3. انت كتبت [[index.html]]، فالملف بقى [[index.html.txt]].
4. File Explorer خبّى [[.txt]]، فشايف [[index.html]] ومش فاهم.

والحل: View ثم Show ثم File name extensions، واعمل ملفات الكود من VS Code.

---

## الخلاصة

| | لينكس والماك | PowerShell |
|---|---|---|
| شوف الاسم الحقيقي | [[ls]] | [[ls]] |
| غيّر الاسم | [[mv قديم جديد]] | [[Rename-Item قديم جديد]] |`,
          example: R`# Linux و Mac:
ls
mv index.html.txt index.html
ls
# Windows (PowerShell):
ls
Rename-Item index.html.txt index.html
ls`,
          lines: [
            "الترمنال مبيخبيش امتدادات: هتشوف الاسم الحقيقي [[index.html.txt]].",
            "غيّر الاسم للصح.",
            "اعرض تاني: [[index.html]] بس.",
            "ويندوز: PowerShell كمان مبيخبيش امتدادات: هتشوف [[index.html.txt]] في عمود [[Name]]، حتى لو File Explorer بيعرضه [[index.html]].",
            "ويندوز: [[Rename-Item]] بيغيّر الاسم. ([[mv]] شغال في PowerShell برضه كاختصار)",
            "ويندوز: اعرض تاني: [[index.html]] بس."
          ],
          try: R`اعمل المشكلة بإيدك: في فولدر lab اعمل ملف اسمه [[index.html.txt]] (من الترمنال: [[touch index.html.txt]]، وفي PowerShell [[New-Item index.html.txt]])، وشوفه في مدير الملفات بتاع نظامك، وبعدين صلّحه بالأوامر. ولو على ويندوز: ظهّر الامتدادات في File Explorer وشوف الفرق.`,
          sol: R`أول [[ls]] هيعرض [[index.html.txt]]، وبعد [[mv]] (أو [[Rename-Item]] في PowerShell) التاني هيعرض [[index.html]] بس، ونفس الكلام طلع في PowerShell 7 و 5.1. ولو فتحته بدبل كليك هيتفتح في المتصفح كصفحة ويب (فاضية، لأن الملف فاضي) مش كنص.

على ويندوز والامتدادات مخفية، File Explorer هيوريك [[index.html]] ونوعه (عمود Type في عرض Details) [[Text Document]]: ده الدليل إن فيه [[.txt]] مستخبي. وبعد ما تظهّر الامتدادات هيبان [[index.html.txt]]، وبعد التصليح نوعه هيبقى حاجة زي [[Chrome HTML Document]] أو [[Microsoft Edge HTML Document]] حسب المتصفح الافتراضي. وعلى لينكس مدير الملفات بيعرض الاسم كامل من الأول، وعلى الماك غالبًا كمان (ولو عايز تضمن: Finder ثم Settings ثم Advanced ثم Show all filename extensions).`
        }
      ]
    }
]);
