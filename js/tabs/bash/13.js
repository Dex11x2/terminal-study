// تكملة تاب bash: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/bash/01.js (شرح حقول الدرس في أوله)
MORE("bash", [
    {
      t: "شكّل الترمنال بتاعك",
      l: 2,
      n: "prompt بيقولك انت فين وعلى أنهي branch، وألوان تفرّق الملف من الفولدر، وأدوات بتلاقي الملف أو الفولدر أو الأمر القديم بكلمتين",
      items: [
        {
          cmd: "PS1",
          title: "غيّر شكل الـ prompt",
          desc: R`[[PS1]] متغير في bash فيه شكل الـ prompt، النص اللي بيظهر قبل كل أمر زي [[ali@laptop:~/projects/shop$]]. بتغيّره عشان يوريك اللي محتاجه من نظرة: انت مين، وعلى أنهي جهاز، وفي أنهي فولدر، وعلى أنهي branch في git، وكل حاجة بلون.

جوه [[PS1]] رموز بتبدأ بـ backslash، و bash بيبدّلها قبل ما يطبع: [[\u]] اسم اليوزر، و [[\h]] اسم الجهاز (لحد أول نقطة)، و [[\w]] الفولدر الحالي بمساره و [[~]] مكان فولدرك، و [[\W]] اسم الفولدر الحالي لوحده، و [[\t]] الساعة بنظام ٢٤ ساعة، و [[\n]] سطر جديد. و [[\$]] بتطلع [[$]] لو انت يوزر عادي و [[#]] لو root، فتعرف من غير ما تسأل.

الألوان أكواد بيفهمها الترمنال: [[\e[32m]] معناها «اللي جاي أخضر»، و [[\e]] هو حرف Escape، و [[32]] رقم اللون (31 أحمر، 32 أخضر، 33 أصفر، 34 أزرق، 36 سماوي)، و [[1;]] قبل الرقم bold، و [[\e[0m]] بيرجّع اللون العادي. وكل كود لازم يتحط بين [[\[]] و [[\]]]: دول بيقولوا لـ bash «اللي بينّا مش بيظهر على الشاشة، متعدّوش». من غيرهم bash بيعدّ الأكواد كأنها حروف، فلما تكتب أمر طويل السطر بيلف في المكان الغلط ويكتب فوق أوله.

[[PS1]] بيتكتب بين single quotes، عشان [[$(...)]] اللي جواه تتنفّذ مع كل prompt جديد مش مرة واحدة. ده اللي بيخلي [[$(__git_ps1 " (%s)")]] يطبع الـ branch الحالي كل مرة: [[__git_ps1]] فانكشن جاية مع git في ملف [[/usr/lib/git-core/git-sh-prompt]] على أوبونتو، بتحط اسم الـ branch مكان [[%s]] لو انت جوه repo، ومبتطبعش حاجة لو بره. و [[GIT_PS1_SHOWDIRTYSTATE=1]] بيزوّد [[*]] لو فيه ملفات متعدّلة لسه من غير [[git add]]، و [[+]] لو فيه حاجات اتعملها add ولسه من غير commit.

و [[echo "$__{PS1@P}"]] بيطبع الـ prompt بعد ما bash يفك رموزه، فتشوف النتيجة على طول ([[@P]] بتعمل في المتغير نفس اللي bash بيعمله في الـ prompt). والتغيير بيعيش في الترمنال ده بس؛ عشان يفضل، حط نفس السطور في آخر [[~/.bashrc]] (درس «alias و .bashrc»).`,
          example: R`# جرّبهم واحد واحد، وكل واحد بيغيّر الـ prompt في الترمنال ده بس
PS1='\u@\h:\w\$ '
PS1='[\t] \W \$ '
PS1='\[\e[1;32m\]\u@\h\[\e[0m\]:\[\e[1;34m\]\w\[\e[0m\]\$ '
source /usr/lib/git-core/git-sh-prompt
GIT_PS1_SHOWDIRTYSTATE=1
PS1='\[\e[32m\]\u\[\e[0m\]:\[\e[34m\]\w\[\e[33m\]$(__git_ps1 " (%s)")\[\e[0m\]\$ '
echo "$__{PS1@P}"`,
          try: R`جرّب السطور واحد واحد، وبعد آخر [[PS1]] ادخل فولدر فيه git repo. عدّل ملف فيه واتفرج على الـ prompt، واعمل [[git add]] واتفرج تاني. وبعدين خلّي آخر prompt دايم في [[~/.bashrc]] وافتح ترمنال جديد تتأكد.`,
          mac: ["diff", R`الماك بيستخدم zsh، والـ prompt هناك متغير اسمه [[PROMPT]] في [[~/.zshrc]] ورموزه بـ [[%]]: [[%n]] اليوزر، و [[%m]] الجهاز، و [[%~]] الفولدر، بدل [[\u]] و [[\h]] و [[\w]]. ولو شغال bash على الماك، [[PS1]] زي ما هو، بس ملف [[git-sh-prompt]] مكانه بيختلف حسب طريقة تسطيب git.`],
          deep: {
            why: R`الـ prompt بتبص عليه قبل كل أمر بتكتبه. لو بيقولك انت على أنهي جهاز، وفي أنهي فولدر، وعلى أنهي branch، هتبطّل تكتب [[pwd]] و [[git branch]] كل شوية، وهتاخد بالك قبل ما تعمل commit على main بالغلط، أو تمسح حاجة على سيرفر الإنتاج وانت فاكره سيرفر التجارب.`,
            how: R`قبل ما bash يطبع الـ prompt بيعمل تلات حاجات على [[PS1]]: يبدّل الرموز اللي بـ backslash ([[\u]] و [[\w]] وغيرهم)، ويفك المتغيرات و [[$(...)]]، ويطبع الناتج. عشان كده لما تكتبه بين single quotes، [[$(__git_ps1)]] بتفضل نص لحد لحظة الطباعة، فتتنفّذ من جديد مع كل prompt. لو كتبته بين double quotes، الشيل هيفكها مرة واحدة وانت بتعرّف المتغير، والـ branch هيفضل ثابت على اللي كان ساعتها.

الترمنال لما يستقبل حرف Escape وبعده [[[32m]] مبيطبعهمش، بيفهمهم أمر «غيّر اللون». و [[\e]] و [[\033]] نفس الحرف (رقمه 27)، وهتلاقي الاتنين في الشروحات؛ إعداد أوبونتو الافتراضي بيستخدم [[\033[01;32m]].

وليه [[\[ \]]]؟ bash لازم يعرف عرض الـ prompt بالظبط، عشان يعرف السطر هيلف فين، وعشان لما تمسح أو تتحرك بالأسهم يرجع للمكان الصح. هو بيعدّ الحروف، فلو فيه ١٠ بايت أكواد ألوان مش متعلّمة، هيفتكر الـ prompt أطول بـ ١٠ حروف من الحقيقة. [[\[]] و [[\]]] بيقولوله «اللي بينّا ملوش عرض».

و [[~/.bashrc]] الافتراضي في أوبونتو بيعرّف [[PS1]] ملوّن (لو الترمنال بيدعم ألوان)، وبيزوّد قبله جزء [[\[\e]0;\u@\h: \w\a\]]] بيكتب عنوان نافذة الترمنال. لما تحط [[PS1]] بتاعك في آخر الملف بيغطي على ده كله، فلو عايز عنوان النافذة يفضل يتغير، حط الجزء ده في أول [[PS1]] بتاعك.`,
            when: R`أول ما تبدأ تشتغل بـ git من الترمنال: اسم الـ branch في الـ prompt بيمنع commits على الـ branch الغلط. وعلى السيرفرات: لون مختلف لكل سيرفر (أحمر للإنتاج مثلًا) و [[\h]] في الـ prompt، فمتتلخبطش بين الشبابيك. ولو عايز شكل جاهز بأيقونات من غير ما تكتب أكواد، شوف درس starship.`,
            mistakes: R`أكواد ألوان من غير [[\[ \]]]، فالسطر يلف غلط والسهم لفوق يسيب حروف على الشاشة. و double quotes بدل single، فالـ branch يتجمّد. ونسيان [[\e[0m]] في الآخر، فكل اللي بتكتبه بعد الـ prompt يطلع ملوّن. و [[PS1]] بتاعك في أول [[.bashrc]]، فسطور أوبونتو اللي بعده تمسحه؛ حطه في الآخر. و [[__git_ps1]] من غير [[source]] للملف على سيرفر مفيهوش bash-completion، فكل prompt يطبع [[command not found]].`
          },
          teach: R`## [[PS1]] متغير، و bash بيطبعه قبل كل أمر بعد ما يبدّل رموزه

[[PS1]] = prompt string 1. كل سطر في المثال بيدّيله قيمة جديدة. عشان نشوف الناتج من غير ما نبص على شاشة، استخدمنا [[echo "$__{PS1@P}"]] (آخر سطر في المثال) بعد كل واحد. اتشغّل على أوبونتو 24.04 جوه Docker، واسم الجهاز [[laptop]]، واليوزر [[ali]]، والفولدر [[~/projects/shop]] فيه git repo على [[main]].

---

## ١. [[PS1='\u@\h:\w\$ ']]

| الرمز | بيتبدل بـ |
|---|---|
| [[\u]] | user: اسم اليوزر |
| [[@]] و [[:]] | نفسهم، حروف عادية |
| [[\h]] | host: اسم الجهاز لحد أول نقطة |
| [[\w]] | working directory: المسار، و [[~]] مكان الـ home |
| [[\$]] | [[$]] ليوزر عادي و [[#]] لـ root |
| المسافة في الآخر | عشان اللي تكتبه ميلزقش في [[$]] |

~~~text الناتج
ali@laptop:~/projects/shop$
~~~

ونفس السطر كـ root طلّع [[root@laptop:/#]].

### ليه single quotes؟

عشان الشيل ميلمسش الـ backslashes ولا أي [[$]] وانت بتعرّف المتغير. التبديل يحصل وقت طباعة الـ prompt، مش وقت التعريف.

---

## ٢. [[PS1='[\t] \W \$ ']]

[[\t]] الساعة HH:MM:SS، و [[\W]] (كابيتال) اسم الفولدر الحالي لوحده من غير المسار. و [[[ ]]] حروف عادية:

~~~text الناتج
[09:01:07] shop $
~~~

الساعة دي وقت ما الـ prompt اتطبع، فتعرف الأمر اللي قبله خلص إمتى.

---

## ٣. الألوان

~~~bash
PS1='\[\e[1;32m\]\u@\h\[\e[0m\]:\[\e[1;34m\]\w\[\e[0m\]\$ '
~~~

نفس رقم ١، ومزروع فيه ٤ أكواد ألوان. نفك واحد:

~~~text
\[  \e[1;32m  \]
~~~

| الحتة | معناها |
|---|---|
| [[\e]] | حرف Escape (رقمه 27). الترمنال لما يشوفه مبيطبعش اللي بعده، بيفهمه أمر |
| [[[1;32m]] | [[1]] bold، و [[32]] أخضر، و [[m]] نهاية الكود |
| [[\[]] و [[\]]] | لـ bash: «اللي بينّا مالوش عرض على الشاشة، متعدّوش» |

و [[\e[0m]] بيرجّع اللون العادي، و [[1;34]] أزرق bold. الأرقام: 31 أحمر، 32 أخضر، 33 أصفر، 34 أزرق، 36 سماوي.

[[cat -v]] بيوري الحروف المخفية، و Escape بيظهر [[^[]]:

~~~text echo "$__{PS1@P}" | cat -v
^[[1;32mali@laptop^[[0m:^[[1;34m~/projects/shop^[[0m$
~~~

[[\[]] و [[\]]] اختفوا (دول لـ bash بس)، وفضلت الأكواد. على الشاشة: [[ali@laptop]] أخضر والمسار أزرق.

---

## ٤. [[source /usr/lib/git-core/git-sh-prompt]]

[[source]] بينفّذ الملف ده جوه الشيل الحالي، فبيتعرّف فيه فانكشن اسمها [[__git_ps1]] جاية مع git.

## ٥. [[GIT_PS1_SHOWDIRTYSTATE=1]]

متغير بتقراه [[__git_ps1]]: لو موجود، تزوّد علامة لحالة الملفات.

## ٦. الـ prompt بالـ branch

~~~bash
PS1='\[\e[32m\]\u\[\e[0m\]:\[\e[34m\]\w\[\e[33m\]$(__git_ps1 " (%s)")\[\e[0m\]\$ '
~~~

الجديد [[$(__git_ps1 " (%s)")]]: [[$( )]] نفّذ اللي جوايا وحط ناتجه هنا، و [[__git_ps1]] بتطبع النص [[" (%s)"]] بعد ما تحط اسم الـ branch مكان [[%s]]، وبره أي repo مبتطبعش حاجة. جربناها (من غير ألوان عشان القراية):

| الحالة | الـ prompt |
|---|---|
| repo نضيف | [[ali:~/projects/shop (main)$]] |
| عدّلنا ملف | [[ali:~/projects/shop (main *)$]] |
| بعد [[git add]] | [[ali:~/projects/shop (main +)$]] |
| [[cd /tmp]] | [[ali:/tmp$]] |

وبالألوان:

~~~text echo "$__{PS1@P}" | cat -v
^[[32mali^[[0m:^[[34m~/projects/shop^[[33m (main +)^[[0m$
~~~

[[33]] أصفر للـ branch، و [[0m]] قبل [[$]].

### ليه single quotes مهمة هنا بالذات

جربنا نفس الفكرة بـ double quotes: [[PS1="\u:\w$(__git_ps1 " (%s)")\$ "]]، وبعدين [[git switch -c feature]]:

~~~text الناتج
ali:~/projects/shop (main +)$
~~~

لسه [[main]] مع إننا على [[feature]]. الـ double quotes خلت الشيل ينفّذ [[$( )]] **مرة واحدة** وقت التعريف ويحط الناتج ثابت. الـ single quotes بتسيبه نص، فيتنفذ مع كل prompt.

---

## ٧. [[echo "$__{PS1@P}"]]

[[$__{PS1}]] قيمة المتغير، و [[@P]] بتقول لـ bash «فكّه زي ما بتفك الـ prompt». مفيد تجرّب بيه قبل ما تحط حاجة في [[.bashrc]].

---

## أوبونتو بيعمل إيه أصلًا

~~~text grep -n 'PS1=' ~/.bashrc
60:    PS1='$__{debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
62:    PS1='$__{debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
69:    PS1="\[\e]0;$__{debian_chroot:+($debian_chroot)}\u@\h: \w\a\]$PS1"
~~~

نفس رقم ٣ بالظبط بس بـ [[\033]] (نفس Escape بالـ octal). وسطر 69 بيكتب عنوان شباك الترمنال. عشان كده [[PS1]] بتاعك يتحط في **آخر** الملف.

| النظام | المتغير | اليوزر / الجهاز / المسار |
|---|---|---|
| bash | [[PS1]] | [[\u]] [[\h]] [[\w]] |
| zsh (الماك) | [[PROMPT]] | [[%n]] [[%m]] [[%~]] (من الـ docs) |
| PowerShell | فانكشن اسمها [[prompt]] | [[function prompt { "$(Get-Location)> " }]] |

## الخلاصة

single quotes، وكل كود لون بين [[\[ \]]]، و [[\e[0m]] في الآخر، و [[echo "$__{PS1@P}"]] تجرّب. ودايم في آخر [[.bashrc]].`,
          lines: [
            R`[[\u]] اليوزر و [[@]] و [[\h]] الجهاز و [[:]] و [[\w]] المسار، و [[\$]] بتبقى [[$]] أو [[#]] لـ root.`,
            R`[[\t]] الساعة وقت طباعة الـ prompt، و [[\W]] اسم الفولدر الحالي بس.`,
            R`نفس الأول بألوان: [[\[\e[1;32m\]]] أخضر bold، و [[\[\e[0m\]]] رجّع العادي، و [[\[\e[1;34m\]]] أزرق bold للمسار.`,
            R`حمّل فانكشن [[__git_ps1]] اللي جاية مع git.`,
            R`خلّيها تزوّد [[*]] لو فيه تعديلات و [[+]] لو فيه حاجة اتعملها add.`,
            R`اليوزر أخضر والمسار أزرق، وبعدين الـ branch بالأصفر بين قوسين لو انت جوه repo، ورجّع اللون العادي قبل [[\$]].`,
            R`اطبع الـ prompt بعد ما bash يفك رموزه ([[@P]])، عشان تشوف النتيجة.`
          ],
          sol: R`بعد أول سطر الـ prompt بقى [[ali@laptop:~/projects/shop$]]، وبعد التاني [[[10:11:26] shop $]]، والساعة هنا وقت ما الـ prompt اتطبع، مش ساعة شغالة. التالت نفس الأول، بس [[ali@laptop]] أخضر bold والمسار أزرق bold، ودي نفس ألوان أوبونتو الافتراضية.

بعد آخر [[PS1]]، جوه repo على main: [[ali:~/projects/shop (main)$]]. عدّل ملف تلاقيه [[(main *)]]، و [[git add]] يخليه [[(main +)]]، و [[cd /tmp]] (بره أي repo) الجزء ده بيختفي: [[ali:/tmp$]]. ولو انت root هتلاقي [[#]] في الآخر بدل [[$]].

عشان يفضل: الكود اللي تحت بيزوّد السطور في آخر [[~/.bashrc]]. لو ظهر [[__git_ps1: command not found]] قبل كل prompt، يبقى سطر [[source]] مش موجود أو بعد سطر [[PS1]]. ولو السطر بيلف غلط لما تكتب أمر طويل، أو السهم لفوق بيسيب حروف، يبقى فيه كود لون مش محطوط بين [[\[ \]]].`,
          solCode: R`cat >> ~/.bashrc <<'EOF'
source /usr/lib/git-core/git-sh-prompt
GIT_PS1_SHOWDIRTYSTATE=1
PS1='\[\e[32m\]\u\[\e[0m\]:\[\e[34m\]\w\[\e[33m\]$(__git_ps1 " (%s)")\[\e[0m\]\$ '
EOF
source ~/.bashrc`
        },
        {
          cmd: "LS_COLORS و --color",
          title: "ألوان ls و grep",
          desc: R`[[ls]] بيلوّن الفولدرات أزرق والملفات اللي بتتشغّل أخضر والـ links سماوي، و [[grep]] بيلوّن الكلمة اللي لقاها أحمر. اللي بيشغّل الألوان [[--color=auto]]، واللي بيحدد كل نوع ملف لونه إيه متغير اسمه [[LS_COLORS]].

[[--color]] ليه ٣ قيم: [[auto]] يلوّن بس لو الناتج رايح للشاشة، و [[always]] يلوّن دايمًا حتى لو رايح لملف أو pipe، و [[never]] من غير ألوان. وعلى أوبونتو [[~/.bashrc]] الافتراضي فيه [[alias ls='ls --color=auto']] و [[alias grep='grep --color=auto']]، عشان كده بتشوف ألوان من غير ما تكتب حاجة، و [[type ls grep]] يوريك الـ aliases دي. و [[less -R]] بيعرض الألوان صح بدل ما يطبع أكوادها، فـ [[ls --color=always | less -R]] لفولدر فيه ملفات كتير.

[[dircolors]] هو اللي بيبني [[LS_COLORS]]. [[dircolors -p]] بيطبع قاعدة الألوان الافتراضية بشكل مقري، سطر لكل نوع زي [[DIR 01;34]] (فولدر: bold أزرق) و [[EXEC 01;32]] (ملف عليه x: bold أخضر). والأرقام نفس أكواد ألوان الترمنال في درس PS1: [[01]] bold، و [[31]] أحمر، و [[33]] أصفر، و [[34]] أزرق، و [[90]] رمادي. و [[.bashrc]] بتاع أوبونتو بيعمل [[eval "$(dircolors -b)"]]: [[dircolors -b]] بيطبع أمر bash جاهز [[LS_COLORS='...'; export LS_COLORS]]، و [[eval]] بينفّذ النص ده كأنك كتبته.

[[LS_COLORS]] نفسه لستة مفصولة بـ [[:]]، كل عنصر [[نوع=لون]]: [[di]] فولدر، و [[ln]] link، و [[ex]] ملف بيتشغّل، و [[*.log]] أي ملف امتداده .log. و [[tr ':' '\n']] بيحوّل كل [[:]] لسطر جديد عشان تقراها. ولو زوّدت عناصر في الآخر، الأخيرة هي اللي بتكسب: [[LS_COLORS="$LS_COLORS:di=1;33:*.log=90"]] بيخلي الفولدرات أصفر وملفات الـ log رمادي في الترمنال ده. وعشان يفضل: [[dircolors -p > ~/.dircolors]] وعدّل الملف، و [[.bashrc]] بتاع أوبونتو بيقراه لوحده لو موجود.

و grep لونه في متغير تاني: [[GREP_COLORS='mt=01;32']] بيخلي الكلمة اللي لقاها أخضر ([[mt]] من matched text). والمتغير القديم [[GREP_COLOR]] (من غير S) بيطلّع تحذير deprecated في grep 3.8 وأحدث (أوبونتو 24.04 فيها 3.11).`,
          example: R`ls --color=auto
ls --color=always | less -R
type ls grep
dircolors -p | grep -E '^(DIR|LINK|EXEC) '
echo "$LS_COLORS" | tr ':' '\n' | head -5
LS_COLORS="$LS_COLORS:di=1;33:*.log=90"
ls --color=auto
echo "error: disk full" | GREP_COLORS='mt=01;32' grep --color=auto error`,
          try: R`في [[~/lab]] اعمل فولدر [[src]] وملف [[app.log]] وسكربت [[run.sh]] عليه [[chmod +x]] وملف [[archive.tar.gz]]، وبص على ألوانهم. بعدين خلّي الفولدرات أصفر وملفات الـ log رمادي، وخلّي التعديل دايم بـ [[~/.dircolors]].`,
          mac: ["diff", R`[[ls]] بتاع الماك بيلوّن بـ [[ls -G]] (أو [[export CLICOLOR=1]] في [[~/.zshrc]])، وألوانه في متغير اسمه [[LSCOLORS]] بصيغة حروف مختلفة، ومفيش [[dircolors]]. لو عايز نفس سلوك لينكس: [[brew install coreutils]] و [[gls --color=auto]]. و [[grep --color=auto]] شغال زي ما هو.`],
          deep: {
            why: R`الألوان بتخليك تفرق الفولدر من الملف من السكربت من غير ما تقرا الصلاحيات، والكلمة اللي grep لقاها بتبان وسط سطر طويل. ولما تعرف هي جاية منين، هتفهم ليه الألوان بتختفي ساعات (في pipe أو سكربت)، وليه سيرفر شكله مختلف عن جهازك.`,
            how: R`الألوان أكواد Escape بتتطبع قبل الاسم وبعده، والترمنال بيفهمها ومبيعرضهاش (نفس أكواد درس PS1). و [[ls]] و [[grep]] مبيطلّعوهاش غير لو طلبتها بـ [[--color]].

ليه [[auto]] مش [[always]]؟ لأن الناتج ساعات بيروح لبرنامج تاني مش لعينك: [[ls | wc -l]]، أو سكربت بيقرا ناتج grep. لو الأكواد اتبعتت هناك هتبقى حروف زيادة في النص وتبوّظ المقارنة. فـ [[auto]] بيسأل «الناتج رايح لترمنال؟» (نفس فكرة [[-t]] في درس «log() والألوان»)، ويلوّن بس لو أيوه.

و [[ls]] بيقرا [[LS_COLORS]] كل مرة بيشتغل، والمتغير ده بيتعمل في [[.bashrc]]: من [[~/.dircolors]] لو موجود، وإلا من القاعدة الافتراضية اللي جوه [[dircolors]] نفسه. عشان كده الألوان مبتظهرش في شيل مش تفاعلي زي السكربتات أو cron: لا الـ alias ولا [[LS_COLORS]] موجودين هناك.

والترتيب: نوع الملف الأول (فولدر، link، ملف عليه x)، وبعدين الامتداد. عشان كده [[run.sh]] أخضر عشان عليه x، ولو شلت الـ x بيرجع من غير لون.`,
            when: R`لما لون مش واضح على خلفية الترمنال بتاعك (الأزرق الغامق على خلفية سودا مثلًا). لما تبعت ناتج [[ls]] أو [[grep]] لـ [[less]] وعايز الألوان تفضل: [[--color=always | less -R]]. ولما تلاقي سيرفر من غير ألوان: غالبًا [[.bashrc]] بتاعه مفيهوش الـ aliases، فضيفها.`,
            mistakes: R`[[--color=always]] جوه alias، فكل ناتج رايح لملف أو لسكربت يتملي أكواد. وتعديل [[LS_COLORS]] من غير [[$LS_COLORS:]] في الأول، فتمسح كل الألوان التانية. وإنك تفتكر الامتداد هو اللي بيخلي الملف أخضر؛ الأخضر معناه عليه صلاحية تشغيل. وإنك تعتمد على الألوان في سكربت: استخدم [[-d]] و [[-x]] جوه [[if]] بدلها.`
          },
          teach: R`## الألوان أكواد بتتطبع جنب الأسامي، و [[--color]] بيقرر تتطبع ولا لأ

اتشغّل على أوبونتو 24.04 جوه Docker في bash تفاعلي، في فولدر فيه فولدر [[src]]، وملفات [[app.log]] و [[archive.tar.gz]] و [[run.sh]] (عليه [[chmod +x]])، و link اسمه [[link]]. عشان نشوف الأكواد نفسها بنعدّي الناتج على [[cat -v]]، اللي بيكتب حرف Escape كـ [[^[]].

> ملحوظة من التجربة: أول مرة الـ container كان من غير متغير [[TERM]]، فـ [[dircolors]] طلّع [[LS_COLORS='']] ومفيش ألوان خالص. dircolors بيلوّن بس لو [[TERM]] نوع ترمنال معروف. أي ترمنال حقيقي بيظبطه لوحده.

---

## ١. [[ls --color=auto]]

[[--color]] ليه ٣ قيم: [[auto]] لوّن لو الناتج رايح لترمنال، و [[always]] دايمًا، و [[never]] أبدًا. جربنا auto وهو رايح لـ pipe:

~~~text ls --color=auto | cat -v
app.log
archive.tar.gz
link
run.sh
src
~~~

من غير أكواد: [[auto]] شاف إن الناتج رايح لبرنامج تاني مش لعينك، فمطبعهاش.

## ٢. [[ls --color=always | less -R]]

~~~text ls --color=always | cat -v
app.log
^[[0m^[[01;31marchive.tar.gz^[[0m
^[[01;36mlink^[[0m
^[[01;32mrun.sh^[[0m
^[[01;34msrc^[[0m
~~~

دلوقتي الأكواد ظاهرة. نقرا واحد: [[^[]] = Escape، وبعده [[[01;34m]]: [[01]] bold، و [[34]] أزرق. وبعد الاسم [[[0m]] رجّع العادي. فـ:

| الملف | الكود | اللون | ليه |
|---|---|---|---|
| [[src]] | [[01;34]] | أزرق bold | فولدر |
| [[link]] | [[01;36]] | سماوي bold | symbolic link |
| [[run.sh]] | [[01;32]] | أخضر bold | عليه x |
| [[archive.tar.gz]] | [[01;31]] | أحمر bold | امتداد أرشيف |
| [[app.log]] | مفيش | عادي | مفيش قاعدة لـ .log |

و [[less -R]] (raw) بيعدّي الأكواد للترمنال فتشوف ألوان، بدل ما يطبعها [[ESC[01;34m]].

---

## ٣. [[type ls grep]]

~~~text الناتج
ls is aliased to $__btls --color=auto'
grep is aliased to $__btgrep --color=auto'
~~~

ده سر الألوان من غير ما تكتب حاجة: [[.bashrc]] بتاع أوبونتو عامل الـ aliases دي.

---

## ٤. [[dircolors -p | grep -E '^(DIR|LINK|EXEC) ']]

[[dircolors -p]] (print) بيطبع القاعدة الافتراضية: 236 سطر. و grep بيسيب ٣: [[-E]] regex، و [[^]] أول السطر، و [[(DIR|LINK|EXEC)]] واحدة من التلاتة، والمسافة بعدها عشان [[DIR]] متطابقش [[DIRS]] مثلًا:

~~~text الناتج
DIR 01;34 # directory
LINK 01;36 # symbolic link. (If you set this to 'target' instead of a
EXEC 01;32
~~~

نفس الأكواد اللي شفناها فوق.

---

## ٥. [[echo "$LS_COLORS" | tr ':' '\n' | head -5]]

[[LS_COLORS]] نفسه سطر واحد طويل. [[tr ':' '\n']] (translate) بيبدّل كل [[:]] بسطر جديد:

~~~text الناتج
rs=0
di=01;34
ln=01;36
mh=00
pi=40;33
~~~

نفس القاعدة بأسامي قصيرة: [[di]] directory، و [[ln]] link، و [[pi]] pipe ([[40;33]] أصفر على خلفية سودا). ومين عمله؟ [[.bashrc]] بيشغّل [[eval "$(dircolors -b)"]]:

~~~text dircolors -b (أوله)
LS_COLORS='rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:...
export LS_COLORS
~~~

[[-b]] (bourne shell) بيطبع أوامر bash جاهزة، و [[eval]] بينفّذها.

---

## ٦. [[LS_COLORS="$LS_COLORS:di=1;33:*.log=90"]]

[[$LS_COLORS]] القديم كله، وبعده [[:]] وقاعدتين جداد. ولو نفس النوع متكرر، الأخيرة بتكسب. [[1;33]] أصفر bold، و [[*.log]] أي اسم آخره .log، و [[90]] رمادي.

## ٧. [[ls --color=auto]] تاني

(بـ always عشان cat -v):

~~~text الناتج
^[[0m^[[90mapp.log^[[0m
^[[01;31marchive.tar.gz^[[0m
^[[01;36mlink^[[0m
^[[01;32mrun.sh^[[0m
^[[1;33msrc^[[0m
~~~

[[src]] بقى [[1;33]] و [[app.log]] بقى [[90]].

---

## ٨. [[echo "error: disk full" | GREP_COLORS='mt=01;32' grep --color=auto error]]

[[GREP_COLORS='mt=01;32']] قبل grep في نفس السطر = متغير للأمر ده بس (درس export). و [[mt]] (matched text) لون الكلمة اللي لقاها:

~~~text الافتراضي، ومع GREP_COLORS
^[[01;31m^[[Kerror^[[m^[[K: disk full
^[[01;32m^[[Kerror^[[m^[[K: disk full
~~~

[[31]] أحمر بقى [[32]] أخضر. ([[[K]] بعد Escape كود «امسح لآخر السطر»، grep بيحطه عشان الخلفية متبوظش.) والمتغير القديم:

~~~text GREP_COLOR='01;32' grep ...
grep: warning: GREP_COLOR='01;32' is deprecated; use GREP_COLORS='mt=01;32'
~~~

ده grep 3.11.

---

### الأخضر مش عشان [[.sh]]

بعد [[chmod -x run.sh]]، [[ls --color=always run.sh | cat -v]] طبع [[run.sh]] من غير أي كود. اللون جاي من صلاحية التشغيل.

> على الماك: [[ls -G]] و [[CLICOLOR=1]] ومتغير اسمه [[LSCOLORS]] بشكل تاني، ومفيش dircolors (من الـ docs). وعلى ويندوز PowerShell 7.2+ بيلوّن [[Get-ChildItem]] لوحده، والألوان في [[$PSStyle.FileInfo]] (جربناها في PowerShell 7.6: لون الفولدرات [[ESC[44;1m]]).

## الخلاصة

[[--color=auto]] (من الـ alias) بيلوّن للشاشة بس، والألوان جاية من [[LS_COLORS]] اللي dircolors بيعمله. تعدّل بـ [[$LS_COLORS:]] في الأول، وتخليه دايم بـ [[~/.dircolors]].`,
          lines: [
            R`لوّن لو الناتج رايح للشاشة (ودي اللي الـ alias بيعملها).`,
            R`لوّن حتى في الـ pipe، و [[less -R]] يعرض الألوان مش أكوادها.`,
            R`اتأكد إن ls و grep عليهم alias فيه [[--color=auto]].`,
            R`اطبع قاعدة الألوان، وسيب سطور الفولدر والـ link والملف اللي بيتشغّل بس ([[-E]] regex، و [[^]] أول السطر، و [[|]] أو).`,
            R`أول ٥ عناصر في [[LS_COLORS]]، كل عنصر في سطر.`,
            R`زوّد قاعدتين في الآخر: الفولدرات أصفر bold، و .log رمادي.`,
            R`نفس ls، وشوف الألوان الجديدة.`,
            R`لوّن الكلمة اللي grep لقاها أخضر بدل أحمر، للأمر ده بس.`
          ],
          sol: R`[[ls --color=auto]] في الترمنال: [[src]] أزرق bold، و [[run.sh]] أخضر (عشان عليه x، مش عشان امتداده .sh)، و [[archive.tar.gz]] أحمر، و [[app.log]] من غير لون لأن مفيش قاعدة لـ .log في الافتراضي. ولو عملت [[ls --color=auto | cat -v]] مش هتلاقي أكواد، لأن الناتج رايح لـ pipe؛ ومع [[--color=always]] هتلاقي قبل [[src]] حاجة زي [[01;34m]]، وده كود اللون.

بعد الكود اللي تحت: [[src]] بقى أصفر bold و [[app.log]] رمادي، و [[echo "$LS_COLORS" | tr ':' '\n' | grep -E '^(di|\*\.log)=']] بيطبع [[di=01;33]] و [[*.log=00;90]]. لو مفيش تغيير، اتأكد إن [[ls]] عليه [[--color=auto]] ([[type ls]])، وإن [[.bashrc]] بتاعك فيه سطر [[dircolors]] (بيبقى فيه على أوبونتو، بس ممكن يكون اتمسح).`,
          solCode: R`mkdir -p ~/lab/colors/src && cd ~/lab/colors
touch app.log archive.tar.gz run.sh && chmod +x run.sh
ls --color=always | cat -v
dircolors -p > ~/.dircolors
sed -i 's/^DIR 01;34/DIR 01;33/' ~/.dircolors
echo '.log 00;90' >> ~/.dircolors
source ~/.bashrc
ls`
        },
        {
          cmd: "starship",
          title: "prompt جاهز بأيقونات",
          desc: R`[[starship]] برنامج بيرسم الـ prompt بدل [[PS1]] اللي بتكتبه بإيدك: الفولدر، والـ branch وحالة git، ونسخة المشروع و Node أو Python لو انت جوه مشروع، والأمر خد قد إيه لو طوّل، من غير ولا كود لون. ونفس البرنامج ونفس ملف الإعدادات بيشتغلوا في bash و zsh و PowerShell، فالـ prompt بيبقى شبه بعضه على لينكس والماك وويندوز.

التسطيب على لينكس بالسكربت الرسمي: [[curl -sS https://starship.rs/install.sh | sh]]. [[-s]] من غير شريط تقدّم، و [[-S]] اطبع الـ error لو حصل، و [[| sh]] شغّل السكربت اللي اتحمّل. السكربت بيسألك [[[y/N]]] قبل ما يحط البرنامج في [[/usr/local/bin]]، وبيطلب sudo لو محتاج. على أوبونتو 22.04 و 24.04 starship مش في apt، فده الطريق؛ وعلى 26.04 فيه [[sudo apt install starship]] بس نسخته أقدم من آخر إصدار. وعلى الماك [[brew install starship]]، وعلى ويندوز [[winget install --id Starship.Starship]].

بعدها [[eval "$(starship init bash)"]] في آخر [[~/.bashrc]]: [[starship init bash]] بيطبع كود bash بيخلي الشيل ينادي starship كل ما يحتاج يرسم prompt، و [[eval]] بينفّذ الكود ده. وفي zsh نفس السطر بـ [[zsh]] في [[~/.zshrc]]، وفي PowerShell [[Invoke-Expression (&starship init powershell)]] في الملف اللي [[$PROFILE]] بيشاور عليه.

الإعدادات كلها في ملف واحد [[~/.config/starship.toml]] بصيغة TOML: [[[اسم_الجزء]]] وتحته [[مفتاح = قيمة]]. و [[starship preset --list]] بيعرض الأشكال الجاهزة، و [[starship preset اسمه -o ~/.config/starship.toml]] بيكتب واحد منهم في الملف ([[-o]] من output). والشكل الافتراضي ومعظم الـ presets فيهم أيقونات محتاجة خط Nerd Font في الترمنال، وإلا هتظهر مربعات أو علامات استفهام (شوف درس «Nerd Font» في تاب «اختصارات النظام»). ولو مش عايز تغيّر الخط، preset [[plain-text-symbols]] أو [[no-nerd-font]] بيستخدموا حروف عادية.`,
          example: R`curl -sS https://starship.rs/install.sh | sh
starship --version
echo 'eval "$(starship init bash)"' >> ~/.bashrc
source ~/.bashrc
starship preset --list
mkdir -p ~/.config
starship preset plain-text-symbols -o ~/.config/starship.toml`,
          try: R`سطّبه وادخل فولدر فيه git repo و [[package.json]] وبص على الـ prompt. شغّل [[sleep 3]] واتفرج على السطر اللي بعده، وبعدين [[false]]. وبعدين اكتب ملف إعدادات بنفسك: من غير السطر الفاضي اللي قبل الـ prompt، ورمز الـ branch كلمة [[git]]، ومن غير نسخة Node.`,
          mac: ["both", R`[[brew install starship]]، والسطر في [[~/.zshrc]]: [[eval "$(starship init zsh)"]]. وملف [[starship.toml]] نفسه تنسخه زي ما هو بين الماك ولينكس وويندوز.`],
          deep: {
            why: R`[[PS1]] بإيدك محتاج أكواد ألوان وفانكشنز، وكل معلومة بتزوّدها (نسخة Node، حالة git، وقت الأمر) بتخليه أصعب في القراية والصيانة. starship بيديك ده كله جاهز، بملف إعدادات واحد بتنقله على أي جهاز وأي شيل، فمتعيدش نفس الشغل في bash على السيرفر و zsh على الماك و PowerShell على ويندوز.`,
            how: R`[[starship init bash]] مبيغيّرش حاجة لوحده، هو بيطبع شوية كود bash. لما تعمله [[eval]]، الكود ده بيخلي bash قبل كل prompt يشغّل [[starship prompt]] ويبعتله exit code آخر أمر ومدته، ويحط اللي رجع في [[PS1]].

starship برنامج واحد مكتوب بـ Rust، بيبص في الفولدر اللي انت فيه: فيه [[.git]]؟ يقرا الـ branch والحالة. فيه [[package.json]]؟ يقرا نسخة المشروع ويسأل [[node --version]]. كل جزء من دول اسمه module، وليه قسم في [[starship.toml]] باسمه زي [[[git_branch]]] و [[[nodejs]]] تغيّر فيه الرمز واللون، أو تقفله بـ [[disabled = true]].

والأوامر اللي بيشغّلها ليها حد وقت اسمه [[command_timeout]]، افتراضيًا 500 مللي ثانية، فلو برنامج بطيء starship بيسيبه ويكمّل بدل ما يعلّق الـ prompt. و [[STARSHIP_CONFIG]] متغير بيخليك تحط ملف الإعدادات في مكان تاني.

والأيقونات زي رمز الـ branch مش emoji: دي حروف في منطقة خاصة جوه خطوط Nerd Font، والخط العادي ملوش شكل ليها فبيرسم مربع.`,
            when: R`لو عايز prompt مفيد من غير ما تكتب [[PS1]] وتصونه، أو بتشتغل على أكتر من جهاز وشيل وعايز نفس الشكل في كله. على سيرفر بتدخله بـ ssh كل فين وفين، [[PS1]] بسيط من درس PS1 كفاية ومش محتاج تسطّب حاجة.`,
            mistakes: R`سطر [[eval]] قبل حاجة في [[.bashrc]] بتغيّر [[PS1]] بعده، فتلغيه؛ خليه آخر سطر. ومربعات مكان الأيقونات لأن خط الترمنال مش Nerd Font، والخط بيتغيّر من إعدادات الترمنال نفسه (و VS Code ليه إعداد خط منفصل للترمنال). و [[starship preset ... -o ~/.config/starship.toml]] قبل ما فولدر [[~/.config]] يتعمل. و [[curl ... | sh]] من أي مصدر والسلام: هنا ده الموقع الرسمي، بس متعملهاش مع سكربت متعرفش جاي منين.`
          },
          teach: R`## starship برنامج بيرسم الـ prompt، و bash بينادي عليه قبل كل سطر

اتشغّل على أوبونتو 24.04 جوه Docker كيوزر [[ali]] (عنده sudo)، وطلعت نسخة starship 1.26.0. ولأن الـ prompt بيظهر على الشاشة، طبعناه بـ [[starship prompt]] (نفس الأمر اللي bash بينادي عليه) وشلنا أكواد الألوان.

---

## ١. [[curl -sS https://starship.rs/install.sh | sh]]

- [[curl]] نزّل الملف من الرابط (درس curl).
- [[-s]] silent: من غير شريط تقدّم.
- [[-S]] show error: بس لو حصل error اطبعه.
- [[|]] وبعده [[sh]]: ابعت السكربت اللي نزل لـ [[sh]] يشغّله على طول من غير ما يتحفظ.

السكربت بيعرف نظامك ويسألك قبل ما يكتب حاجة:

~~~text الناتج (مختصر)
  Configuration
> Bin directory: /usr/local/bin
> Platform:      unknown-linux-musl
> Arch:          x86_64

> Tarball URL: https://github.com/starship/starship/releases/latest/download/starship-x86_64-unknown-linux-musl.tar.gz
? Install Starship latest to /usr/local/bin? [y/N]
~~~

[[y]] وبيطلب sudo لأن [[/usr/local/bin]] ملك root. (من غير ترمنال يرد، زي سكربت، هيقول [[please re-run with the '--yes' option]]: [[sh -s -- -y]] بيجاوب yes لوحده.)

---

## ٢. [[starship --version]]

~~~text الناتج
starship 1.26.0
branch:main
commit_hash:fca92d8
build_time:2026-06-28 17:04:57 +00:00
~~~

أول سطر هو اللي يهمك.

---

## ٣. [[echo 'eval "$(starship init bash)"' >> ~/.bashrc]]

الـ single quotes بره بتخلي السطر يتكتب **زي ما هو** في الملف من غير ما الشيل ينفّذ [[$( )]] دلوقتي:

~~~text tail -1 ~/.bashrc
eval "$(starship init bash)"
~~~

وكل ترمنال جديد هيعمل كده:

1. [[starship init bash]] بيطبع كود bash. جربناه لوحده:

~~~text starship init bash
eval -- "$(/usr/local/bin/starship init bash --print-full-init)"
~~~

2. [[$( )]] بتحط النص ده مكانها، و [[eval]] بينفّذه كأنك كتبته. وده بدوره بيجيب الكود الكامل (فانكشنز بتخلي bash قبل كل prompt يشغّل [[starship prompt]] ويحط ناتجه في [[PS1]]).

---

## ٤. [[source ~/.bashrc]]

نفّذ الملف دلوقتي، فالـ prompt يتغير من غير ما تفتح ترمنال جديد (درس alias).

جوه فولدر [[shop]] فيه git على branch [[feature/login]] و [[package.json]] نسخته 1.2.0، الشكل الافتراضي طلّع:

~~~text الناتج (من غير ألوان)

shop on  feature/login [?] is 📦 v1.2.0 via  v18.19.1
⬢ [Docker] ❯
~~~

| الحتة | منين |
|---|---|
| السطر الفاضي فوق | [[add_newline]] افتراضيًا true |
| [[shop]] | module [[directory]]: الفولدر (جوه repo بيبدأ من اسم الـ repo) |
| أيقونة و [[feature/login]] | [[git_branch]]. الأيقونة حرف Nerd Font |
| [[[?]]] | [[git_status]]: فيه ملف untracked (هنا [[package.json]] لسه من غير add) |
| [[📦 v1.2.0]] | [[package]]: النسخة من [[package.json]] |
| أيقونة و [[v18.19.1]] | [[nodejs]]: ناتج [[node --version]] |
| [[⬢ [Docker]]] | [[container]]: ظهر لأننا جوه container، على جهازك مش هيظهر |
| [[❯]] | [[character]]: أخضر، أو أحمر لو آخر أمر فشل |

وبعد أمر خد 3 ثواني وفشل (starship بياخدهم من bash: [[--status=1 --cmd-duration=3000]]):

~~~text الناتج
shop on  feature/login [?] is 📦 v1.2.0 via  v18.19.1 took 3s
~~~

زوّد [[took 3s]]، و [[❯]] بقى أحمر.

---

## ٥. [[starship preset --list]]

~~~text الناتج
bracketed-segments
catppuccin-powerline
gruvbox-rainbow
jetpack
nerd-font-symbols
no-empty-icons
no-nerd-font
no-runtime-versions
pastel-powerline
plain-text-symbols
pure-preset
tokyo-night
~~~

أشكال جاهزة بأسامي.

---

## ٦. [[mkdir -p ~/.config]]

السطر الجاي بيكتب ملف جوه [[~/.config]]. جربناه من غير الفولدر:

~~~text الناتج
Error writing preset to "/home/ali/.config/starship.toml": Error creating temporary file: No such file or directory (os error 2)
~~~

## ٧. [[starship preset plain-text-symbols -o ~/.config/starship.toml]]

[[-o]] (output) اكتب الـ preset في الملف ده:

~~~text head -5 ~/.config/starship.toml
"$schema" = 'https://starship.rs/config-schema.json'

continuation_prompt = "[.](bright-black) "

[character]
~~~

صيغة TOML: [[[character]]] اسم module، وتحته [[مفتاح = قيمة]]. والـ prompt بقى بكلام بدل أيقونات:

~~~text الناتج
shop on git feature/login [?] is pkg v1.2.0 via nodejs v18.19.1
container  [Docker] >
~~~

---

## ملف الإعدادات بتاعك (الحل)

~~~text ~/.config/starship.toml
add_newline = false

[directory]
truncation_length = 2

[git_branch]
symbol = "git "

[nodejs]
disabled = true
~~~

~~~text الناتج جوه shop، وبره في /usr/share/doc/git
shop on git feature/login [?] is 📦 v1.2.0
doc/git🔒
~~~

من غير سطر فاضي، و [[git]] كلمة، ومن غير Node. وبره الـ repo المسار اتقصر لآخر فولدرين ([[truncation_length = 2]])، و 🔒 لأن الفولدر مش بتاعك تكتب فيه.

---

| الشيل | السطر | الملف |
|---|---|---|
| bash | [[eval "$(starship init bash)"]] | [[~/.bashrc]] |
| zsh (الماك) | [[eval "$(starship init zsh)"]] | [[~/.zshrc]] |
| PowerShell | [[Invoke-Expression (&starship init powershell)]] | [[$PROFILE]] |

(الماك و PowerShell من الـ docs.) و [[starship.toml]] واحد للكل.

## الخلاصة

سطّب، وحط سطر [[eval]] في **آخر** ملف الشيل، وعدّل [[~/.config/starship.toml]]. ولو مربعات مكان الأيقونات: الخط مش Nerd Font، أو استخدم [[plain-text-symbols]].`,
          lines: [
            R`نزّل سكربت التسطيب الرسمي ([[-s]] من غير شريط تقدّم، و [[-S]] اطبع الأخطاء) وشغّله بـ sh. هيسألك قبل ما يحط البرنامج في [[/usr/local/bin]].`,
            R`اتأكد إنه اتسطب واعرف نسخته.`,
            R`ضيف سطر التشغيل في آخر [[.bashrc]]. الـ single quotes بتخلي السطر يتكتب زي ما هو.`,
            R`نفّذ [[.bashrc]] في الترمنال ده، فالـ prompt الجديد يظهر على طول.`,
            R`اعرض أسامي الأشكال الجاهزة.`,
            R`اعمل فولدر الإعدادات لو مش موجود ([[-p]] متعملش error لو موجود).`,
            R`اكتب preset من غير أيقونات Nerd Font في ملف الإعدادات ([[-o]] الملف اللي هيتكتب فيه).`
          ],
          sol: R`على جهاز فيه Nerd Font، جوه repo على branch [[feature/login]] وفيه [[package.json]] نسخته 1.2.0، الشكل الافتراضي بيطبع سطر فاضي، وبعدين سطر فيه [[shop on]] وأيقونة branch و [[feature/login is 📦 v1.2.0 via]] وأيقونة Node ونسخة node عندك (مثلًا [[v18.19.1]] بتاعة apt في أوبونتو 24.04)، وتحته [[❯]] أخضر تكتب بعده. بعد [[sleep 3]] السطر بيزيد [[took 3s]]، وبعد [[false]] الـ [[❯]] بيبقى أحمر لأن آخر أمر فشل. واسم اليوزر مبيظهرش غير لو انت root أو داخل بـ ssh. ولو الأيقونات طلعت مربعات، الخط مش Nerd Font.

ومع [[plain-text-symbols]] نفس السطر بحروف عادية: [[shop on git feature/login is pkg v1.2.0 via nodejs v18.19.1]] وتحته [[>]]. وبالملف اللي تحت: [[shop on git feature/login is 📦 v1.2.0]] من غير سطر فاضي قبله ومن غير Node، ولو فيه ملف جديد لسه من غير [[git add]] هتلاقي [[[?]]] بعد اسم الـ branch. و [[truncation_length = 2]] بيقصّر المسار بره أي repo لآخر فولدرين (جوه repo بيبدأ من اسم الـ repo أصلًا).

لو مفيش أي تغيير بعد [[source ~/.bashrc]]: اتأكد إن سطر [[eval]] في آخر الملف وإن [[starship --version]] شغال. ولو [[starship preset]] قالك [[Error writing preset]]، يبقى فولدر [[~/.config]] مش موجود.`,
          solCode: R`cat > ~/.config/starship.toml <<'EOF'
add_newline = false

[directory]
truncation_length = 2

[git_branch]
symbol = "git "

[nodejs]
disabled = true
EOF`
        },
        {
          cmd: "fzf",
          title: "دوّر في أي لستة بكلمتين",
          desc: R`[[fzf]] بياخد أي لستة (ملفات، أو أوامر قديمة، أو branches) ويفتحلك مربع بحث: تكتب حروف من اللي في دماغك بالترتيب حتى لو مش ورا بعض، واللستة بتقصر وانت بتكتب، و Enter بيطبع اللي اخترته. يعني [[btn]] بتلاقي [[src/components/Button.jsx]].

أكتر حاجة هتستخدمه فيها ٣ اختصارات بيضيفها لـ bash: Ctrl+R يدوّر في كل الـ history في لستة بدل واحد واحد، و Ctrl+T يحط مسار ملف تختاره مكان المؤشر في الأمر اللي بتكتبه، و Alt+C يعمل [[cd]] لفولدر تختاره. والاختصارات دي مبتشتغلش غير لما تحمّلها في [[~/.bashrc]]، والطريقة بتختلف حسب نسخة fzf ([[fzf --version]]):
• fzf 0.48 وأحدث (أوبونتو 26.04، و brew، أو [[git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf && ~/.fzf/install]]): [[eval "$(fzf --bash)"]].
• أوبونتو 24.04 (fzf 0.44) و 22.04 (fzf 0.29): [[--bash]] مش موجود وهيقولك [[unknown option: --bash]]، فاعمل [[source /usr/share/doc/fzf/examples/key-bindings.bash]].

ولوحده: [[nano "$(fzf)"]] بيفتح الملف اللي تختاره: [[$( )]] بتحط ناتج fzf جوه الأمر (درس [[$( )]])، والـ double quotes عشان الأسامي اللي فيها مسافات؛ ونفس الفكرة مع [[vim]] أو [[code]]. و [[--preview 'أمر {}']] بيعرض جنب اللستة ناتج أمر على السطر اللي انت واقف عليه، و [[{}]] بيتبدّل بالسطر ده؛ [[batcat --color=always {}]] بيعرض الملف ملوّن (درس «bat و eza»). و [[--height 60%]] بيفتحه في جزء من الشاشة، و [[--reverse]] بيحط مربع البحث فوق.

جوه fzf: الأسهم أو Ctrl+J و Ctrl+K تتحرك، و Enter تختار، و Esc تلغي. ومع [[-m]] تختار كذا حاجة بـ Tab. وفي البحث: [['main]] بعلامة ' قبلها تطابق الكلمة بالظبط مش حروف متفرقة، و [[^src]] لازم في أول السطر، و [[.js$]] لازم في آخره، و [[!test]] اللي مفيهوش test.`,
          example: R`sudo apt install fzf
fzf --version
# أوبونتو 24.04 و 22.04. لو fzf 0.48 أو أحدث، حط بدل السطر الجاي: echo 'eval "$(fzf --bash)"' >> ~/.bashrc
echo 'source /usr/share/doc/fzf/examples/key-bindings.bash' >> ~/.bashrc
source ~/.bashrc
nano "$(fzf)"
fzf --preview 'batcat --color=always {}' --height 60% --reverse
git switch "$(git branch --format='%(refname:short)' | fzf)"`,
          try: R`فعّل الاختصارات، واضغط Ctrl+R واكتب [[dock]]. وفي فولدر مشروع اكتب [[cat ]] (بمسافة) واضغط Ctrl+T واختار ملف. وجرّب Alt+C، و [[nano "$(fzf)"]] واكتب حروف متفرقة من اسم ملف.`,
          mac: ["both", R`[[brew install fzf]] بيجيب آخر نسخة، فحط [[source <(fzf --zsh)]] في [[~/.zshrc]] (السطر اللي في شرح fzf الرسمي لـ zsh)، أو [[eval "$(fzf --bash)"]] لو bash. وعشان Alt+C يشتغل في Terminal فعّل «Use Option as Meta key».`],
          deep: {
            why: R`أغلب وقتك في الترمنال بتدوّر: على أمر كتبته امبارح، على ملف جوه مشروع فيه ألف ملف، على branch اسمه طويل. البحث العادي (Ctrl+R بتاع bash، و [[find]]، و Tab) بيطلب منك تفتكر الكلام بالظبط أو بدايته. fzf بيخليك تكتب أي حروف فاكرها وتختار من لستة قدامك.`,
            how: R`fzf في فكرته بسيط: بيقرا سطور من الـ stdin، ويعرضها، ويطبع اللي اخترته على الـ stdout. عشان كده بيشتغل مع أي أمر: [[git branch | fzf]] و [[ps aux | fzf]] و [[docker ps | fzf]]. ولو مفيش stdin (كتبت [[fzf]] لوحده)، بيلف على الفولدر الحالي واللي تحته ويعرض الملفات.

البحث «fuzzy»: [[btn]] بتطابق أي سطر فيه b وبعدها t وبعدها n، وبيدّي درجة أعلى لو الحروف ورا بعض أو في أول كلمة أو بعد [[/]]، فـ [[Button.jsx]] بتطلع فوق. ولو دوست Enter ومفيش ولا سطر مطابق بيخرج بـ exit code 1، ولو لغيت بـ Esc أو Ctrl+C بيخرج بـ 130.

والاختصارات: ملف [[key-bindings.bash]] بيستخدم [[bind -x]] عشان يربط Ctrl+R بفانكشن بتطلّع الـ history وتبعتها لـ fzf، واللي تختاره بيتحط في [[READLINE_LINE]]، وده المتغير اللي فيه السطر اللي بتكتبه. و [[fzf --bash]] في النسخ الجديدة بيطبع نفس الكود ده (ومعاه الإكمال بـ [[**]] و Tab)، و [[eval]] بينفّذه.

وتقدر تغيّر الأمر اللي بيجيب الملفات بمتغيرات زي [[FZF_DEFAULT_COMMAND]] و [[FZF_CTRL_T_COMMAND]]، والإعدادات الافتراضية بـ [[FZF_DEFAULT_OPTS]].`,
            when: R`كل يوم: Ctrl+R بدل ما تدوس السهم لفوق خمسين مرة، و Ctrl+T لما تكتب أمر محتاج مسار ملف بعيد. وفي السكربتات الصغيرة بتاعتك على جهازك: أي مكان محتاج «اختار من لستة» ([[git switch]]، أو [[docker logs]] لـ container، أو [[kill]] لعملية) حط fzf في النص.`,
            mistakes: R`[[eval "$(fzf --bash)"]] على أوبونتو 24.04، فيطلع [[unknown option: --bash]] مع كل ترمنال جديد والاختصارات متشتغلش. و [[nano $(fzf)]] من غير double quotes، فالاسم اللي فيه مسافة يتقسم لملفين. و fzf في سكربت هيشتغل من cron أو CI: مفيش حد يختار، فهيفشل أو يعلّق. وإنك تشغّله في [[/]] أو فولدر ضخم من غير فلتر، فيلف على مئات الآلاف من الملفات.`
          },
          teach: R`## [[fzf]]: لستة تدخل، تكتب حروف، سطر واحد يطلع

fzf بيقرا سطور (من pipe، أو أسامي الملفات لو مفيش pipe)، ويعرضهم، وانت بتكتب، واللي تختاره بيتطبع على الـ stdout. اتشغّل على أوبونتو 24.04 جوه Docker (fzf 0.44.1)، في فولدر [[shop]] فيه [[src/components/Button.jsx]] و [[Navbar.jsx]] و [[src/app.js]] و [[README.md]] و [[.env]] و [[node_modules/x/index.js]]، و branches [[main]] و [[feature/login]] و [[fix/header-bug]]. الاختيار بالكيبورد اتجرب بـ [[script]] (بيعمل ترمنال وهمي)، وفي الباقي استخدمنا [[--filter]]: بيعمل نفس البحث من غير شاشة ويطبع كل اللي طابق.

---

## ١. [[sudo apt install fzf]]

## ٢. [[fzf --version]]

~~~text الناتج
0.44.1 (debian)
~~~

الرقم ده بيحدد السطر الجاي. جربنا الطريقة الجديدة:

~~~text fzf --bash
unknown option: --bash
~~~

[[--bash]] بدأ من 0.48، فهنا لازم الملف.

---

## ٣. [[echo 'source /usr/share/doc/fzf/examples/key-bindings.bash' >> ~/.bashrc]]

بيزوّد سطر [[source]] في آخر [[.bashrc]]. والملف ده جاي مع باكدج fzf:

~~~text dpkg -L fzf | grep key-bind
/usr/share/doc/fzf/examples/key-bindings.bash
/usr/share/doc/fzf/examples/key-bindings.fish
/usr/share/doc/fzf/examples/key-bindings.zsh
~~~

> في صورة Docker «minimized» الملف ده مش بيتسطب أصلًا (كل [[/usr/share/doc]] بيتشال)، فلو جربت في container هتلاقي [[No such file or directory]]. على أوبونتو عادي موجود.

جواه بيربط الزراير بفانكشنز:

~~~text grep "bind -m emacs-standard -x" key-bindings.bash
  bind -m emacs-standard -x '"\C-t": fzf-file-widget'
  bind -m emacs-standard -x '"\C-r": __fzf_history__'
~~~

[[bind -x]] = لما تدوس الزرار ده شغّل الفانكشن دي. [[\C-t]] يعني Ctrl+T، و [[\C-r]] Ctrl+R.

## ٤. [[source ~/.bashrc]]

نفّذ الملف دلوقتي.

---

## ٥. [[nano "$(fzf)"]]

من جوه لبرة:

1. [[fzf]] من غير pipe بيلف على الفولدر الحالي واللي تحته ويعرض الملفات.
2. [[$( )]] بتستنى fzf يخلص وتحط اللي طبعه مكانها.
3. الـ double quotes حواليها عشان لو الاسم فيه مسافة يفضل كلمة واحدة.
4. [[nano]] بيفتح الملف ده.

اللستة اللي fzf عرضها:

~~~text الناتج
node_modules/x/index.js
src/app.js
src/components/Button.jsx
src/components/Navbar.jsx
README.md
~~~

[[.env]] مش موجود (0.44 بيخفي الملفات المخفية)، و [[node_modules]] موجود. ولما كتبنا [[btn]] و Enter:

~~~text echo "picked=[$(fzf)]"
picked=[src/components/Button.jsx]
~~~

[[btn]] طابقت لأن b و t و n موجودين **بالترتيب** في [[Button]] (B-u-t-t-o-n). ولو دوست Esc:

~~~text الناتج
exit=130 out=[]
~~~

fzf مطبعش حاجة وخرج بـ 130، فـ nano هيفتح ملف جديد فاضي.

---

## ٦. [[fzf --preview 'batcat --color=always {}' --height 60% --reverse]]

| الحتة | معناها |
|---|---|
| [[--preview '...']] | اعرض جنب اللستة ناتج الأمر ده على السطر اللي انت واقف عليه |
| [[{}]] | بيتبدل بالسطر ده (اسم الملف) |
| [[batcat --color=always]] | اعرض الملف ملوّن (درس «bat و eza»). [[always]] لأن الناتج رايح لـ fzf مش لترمنال |
| [[--height 60%]] | افتح في ٦٠٪ من الشاشة بس، والأوامر اللي قبله تفضل باينة |
| [[--reverse]] | مربع البحث فوق واللستة تحته |

---

## ٧. [[git switch "$(git branch --format='%(refname:short)' | fzf)"]]

من جوه لبرة: [[git branch]] لوحده بيطبع:

~~~text git branch
  feature/login
  fix/header-bug
* main
~~~

والمسافات والـ [[*]] هتبوّظ الاسم. [[--format='%(refname:short)']] أسامي بس:

~~~text git branch --format='%(refname:short)'
feature/login
fix/header-bug
main
~~~

بعدها [[| fzf]] تختار، و [[$( )]] تحط الاسم، و [[git switch]] يروحله. جربناها بـ [[--filter login]] بدل الاختيار:

~~~text الناتج
Switched to branch 'feature/login'
~~~

---

## البحث جوه fzf

جربنا على لستة فيها [[src/main.js]] و [[test/main.test.js]] و [[src/util.js]] و [[README.md]]:

| تكتب | معناها | طلع |
|---|---|---|
| [['main]] | الكلمة بالظبط | [[src/main.js]] و [[test/main.test.js]] |
| [[^src]] | في أول السطر | [[src/main.js]] و [[src/util.js]] |
| [[.js$ !test]] | آخره .js، ومفيهوش test | [[src/main.js]] و [[src/util.js]] |

والمسافة بين كلمتين = الاتنين لازم. ولو مفيش ولا سطر طابق ودوست Enter، fzf بيخرج بـ 1.

---

| الزرار (بعد تحميل الاختصارات) | بيعمل |
|---|---|
| Ctrl+R | يدوّر في الـ history ويحط الأمر في السطر |
| Ctrl+T | يحط مسار ملف تختاره مكان المؤشر |
| Alt+C | [[cd]] لفولدر تختاره |

| النظام | تحميل الاختصارات |
|---|---|
| أوبونتو 24.04 و 22.04 | [[source /usr/share/doc/fzf/examples/key-bindings.bash]] |
| fzf 0.48+ (أوبونتو 26.04، brew) | [[eval "$(fzf --bash)"]] |
| الماك zsh | [[source <(fzf --zsh)]] في [[~/.zshrc]] (من الـ docs) |
| ويندوز | [[winget install fzf]]، والاختصارات من module اسمه PSFzf (من الـ docs) |

## الخلاصة

[[أمر | fzf]] لاختيار سطر، و [[$(fzf)]] تحطه في أمر تاني. والاختصارات Ctrl+R و Ctrl+T و Alt+C محتاجة سطر في [[.bashrc]] حسب النسخة.`,
          lines: [
            R`سطّبه من apt.`,
            R`اعرف النسخة، عشان تعرف تحمّل الاختصارات بأنهي طريقة.`,
            R`ضيف سطر تحميل الاختصارات (Ctrl+R و Ctrl+T و Alt+C) في آخر [[.bashrc]].`,
            R`نفّذ [[.bashrc]] دلوقتي عشان الاختصارات تشتغل في الترمنال ده.`,
            R`اختار ملف من كل الملفات اللي تحت الفولدر الحالي، وافتحه في nano.`,
            R`نفس الاختيار، بس جنبه معاينة للملف ملوّنة، وفي ٦٠٪ من الشاشة، ومربع البحث فوق.`,
            R`اختار branch من لستة وروحله. [[--format='%(refname:short)']] بيطبع أسامي الـ branches بس، من غير [[*]] اللي جنب الحالي.`
          ],
          sol: R`Ctrl+R بيفتح لستة بالأوامر القديمة، جنب كل أمر رقمه في الـ history، والأحدث تحت جنب مربع البحث، وفوق المربع عدّاد زي [[4/4]]: اللي باين من الكل. أول ما تكتب [[dock]] اللستة بتقصر على الأوامر اللي فيها d و o و c و k بالترتيب، و Enter بيحط الأمر في السطر من غير ما ينفّذه، فتعدّل فيه أو تدوس Enter تاني.

و Ctrl+T بعد [[cat ]] بيكمّل السطر بالمسار اللي اخترته: [[cat src/components/Button.jsx]]. و Alt+C بيدخلك الفولدر على طول ويرجعلك الـ prompt. وفي fzf 0.44 بتاع أوبونتو 24.04 الملفات المخفية زي [[.env]] مبتظهرش، و [[node_modules]] بتظهر وبتزحم اللستة؛ ومن 0.48 العكس: [[.env]] بتظهر، و [[node_modules]] و [[.git]] بيتخطوا لوحدهم.

لو Ctrl+R لسه بيعمل البحث القديم [[(reverse-i-search)]]، يبقى ملف الاختصارات ماتحمّلش: اتأكد من السطر في [[~/.bashrc]] واعمل [[source ~/.bashrc]]. ولو Alt+C على الماك بيكتب [[ç]]، فعّل «Use Option as Meta key» في إعدادات Terminal. ولو دوست Esc في [[nano "$(fzf)"]]، fzf مبيطبعش حاجة و nano بيفتح ملف جديد فاضي.`
        },
        {
          cmd: "zoxide",
          title: "cd أذكى بيفتكر فولدراتك",
          desc: R`[[zoxide]] بيفتكر كل فولدر بتدخله، وبيدّي لكل واحد درجة حسب بتدخله قد إيه وآخر مرة كانت إمتى. فبدل [[cd ~/work/clients/acme/shop-api]] تكتب [[z api]] من أي مكان ويوديك هناك.

التسطيب: على أوبونتو 24.04 و 26.04 [[sudo apt install zoxide]] (نسخة 0.9.3 و 0.9.8). أوبونتو 22.04 فيها 0.4.3 قديمة جدًا، فهناك استخدم السكربت الرسمي [[curl -sSfL https://raw.githubusercontent.com/ajeetdsouza/zoxide/main/install.sh | sh]] اللي بيحطه في [[~/.local/bin]]. وعلى الماك [[brew install zoxide]]، وعلى ويندوز [[winget install ajeetdsouza.zoxide]]. وبعدين [[eval "$(zoxide init bash)"]] في آخر [[~/.bashrc]]، وده بيعمل أمرين [[z]] و [[zi]]، وبيخلي الشيل يسجّل كل فولدر بتوصله.

[[z]] بياخد كلمة أو أكتر ويروح لأعلى فولدر في الدرجات بيطابقها: [[z shop]]، أو [[z shop web]] لو عندك كذا فولدر فيه shop. الكلمات لازم تيجي بنفس ترتيبها في المسار، وآخر كلمة لازم تطابق آخر جزء فيه، يعني [[z projects]] مش هتوديك [[projects/shop]]. و [[z]] مبيرجعكش للفولدر اللي انت فيه أصلًا، بيدوّر في الباقي. و [[zi shop]] بيوريك كل اللي بيطابق في لستة تختار منها بـ fzf (الدرس اللي فات). و [[z]] مع مسار موجود، أو [[..]] أو [[-]] أو لوحدها، بتشتغل زي [[cd]] بالظبط.

zoxide مبيعرفش فولدر غير لما تدخله بنفسك مرة، فأول يوم مش هيفرق كتير. و [[zoxide query -ls]] بيوريك الفولدرات اللي حافظها ودرجة كل واحد ([[-l]] الكل و [[-s]] بالدرجة)، و [[zoxide remove مسار]] يشيل واحد. ولو عايز [[cd]] نفسه يبقى ذكي: [[eval "$(zoxide init bash --cmd cd)"]] بيخلي اسم الأمرين [[cd]] و [[cdi]] بدل [[z]] و [[zi]].`,
          example: R`sudo apt install zoxide fzf
echo 'eval "$(zoxide init bash)"' >> ~/.bashrc
source ~/.bashrc
mkdir -p ~/lab/projects/shop-api ~/lab/projects/shop-web ~/lab/projects/blog
cd ~/lab/projects/shop-api
cd ~/lab/projects/shop-web
cd ~
z api
z shop
zi shop
zoxide query -ls`,
          try: R`بعد التسطيب ادخل [[shop-api]] مرة و [[shop-web]] مرتين و [[blog]] مرة (كل [[cd]] في سطر لوحده)، وارجع [[cd ~]]. جرّب [[z shop]] و [[z api]] و [[z -]]، وبعدين [[zoxide query -ls]]، و [[z]] بكلمة مش موجودة.`,
          mac: ["both", R`[[brew install zoxide]]، والسطر في [[~/.zshrc]]: [[eval "$(zoxide init zsh)"]]. مكان قاعدة البيانات بيختلف، بس الاستخدام واحد.`],
          deep: {
            why: R`في الشغل الحقيقي بتتنقل بين نفس ٥ أو ١٠ فولدرات طول اليوم، ومساراتها طويلة. Tab بيساعد بس لسه بتكتب المسار من أوله، و alias لكل مشروع بيتنسي. zoxide بيتعلم لوحده من استخدامك، فبعد كام يوم [[z]] وكلمة بتوديك أي مكان بتروحه كتير.`,
            how: R`[[zoxide init bash]] بيطبع كود bash، و [[eval]] بينفّذه. الكود ده بيعمل حاجتين: فانكشن اسمها [[z]] (وفانكشن [[zi]])، وبيزوّد [[__zoxide_hook]] في [[PROMPT_COMMAND]]، وده متغير فيه أوامر bash بيشغّلها قبل ما يطبع كل prompt. الـ hook بيشوف: الفولدر الحالي اتغير من آخر prompt؟ لو أيوه يعمل [[zoxide add]] للفولدر ده. ولأن الفحص ده بيحصل عند الـ prompt بس، الفولدرات اللي عدّيت عليها في نص سطر واحد مبتتسجّلش.

الدرجة (frecency، من frequency و recency): كل زيارة بتزوّد 1، ووقت البحث الرقم بيتضرب في 4 لو آخر زيارة في آخر ساعة، و 2 لو في آخر يوم، وبيتقسم على 2 لو في آخر أسبوع، وعلى 4 لو أقدم. فالفولدر اللي بتدخله كتير ودخلته من شوية بيكسب. ولما مجموع الدرجات يعدّي حد ([[_ZO_MAXAGE]]، افتراضيًا 10000) zoxide بيصغّر الكل، والفولدرات اللي بقت أقل من 1 بتتشال، فاللي بطّلت تستخدمه بيختفي لوحده.

و [[z api]] بيدوّر في قاعدة البيانات (ملف في [[~/.local/share/zoxide]]) على المسارات اللي آخر جزء فيها فيه api، من غير ما يفرق بين كابيتال وسمول، وياخد أعلى درجة. والـ home نفسه متجاهَل افتراضيًا ([[_ZO_EXCLUDE_DIRS]]). ولو الكلمة مسار موجود فعلًا جنبك، بيعمل [[cd]] عادي من غير ما يدوّر.`,
            when: R`أول ما يبقى عندك أكتر من كام مشروع، أو بتتنقل كتير بين فولدر المشروع وفولدرات زي [[/var/log]] و [[/etc/nginx]] على السيرفر. وفي السكربتات استخدم [[cd]] بمسار كامل: [[z]] بتعتمد على الـ history بتاعك، فنتيجتها بتختلف من جهاز للتاني.`,
            mistakes: R`سطر [[eval]] في نص [[.bashrc]] وبعده حاجة بتكتب [[PROMPT_COMMAND]] من جديد بـ [[=]]، فالـ hook يضيع ومفيش فولدر بيتسجّل؛ حطه آخر سطر. و [[zi]] من غير fzf متسطب. وإنك تتوقع [[z]] تعرف فولدر عمرك ما دخلته. وإنك تستخدم [[z]] في سكربت أو alias هيشتغل على جهاز تاني.`
          },
          teach: R`## zoxide بيسجّل كل فولدر بتدخله، و [[z]] بيوديك لأعلاهم درجة بكلمة

اتشغّل على أوبونتو 24.04 جوه Docker (zoxide 0.9.3 من apt) في bash تفاعلي كيوزر [[ali]]، بنفس ترتيب المثال.

---

## ١. [[sudo apt install zoxide fzf]]

[[fzf]] معاه عشان [[zi]] بيستخدمه للاختيار (الدرس اللي فات).

## ٢. [[echo 'eval "$(zoxide init bash)"' >> ~/.bashrc]]

نفس فكرة starship: [[zoxide init bash]] بيطبع كود bash، و [[eval]] بينفّذه مع كل ترمنال. والكود ده فيه (أرقام السطور من ناتج [[zoxide init bash]]):

~~~text الناتج (السطور المهمة)
25:function __zoxide_hook() {
38:    PROMPT_COMMAND="__zoxide_hook;$__{PROMPT_COMMAND#;}"
81:function z() {
86:function zi() {
~~~

| الحتة | بتعمل |
|---|---|
| [[__zoxide_hook]] | فانكشن بتسجّل الفولدر الحالي |
| [[PROMPT_COMMAND]] | متغير فيه أوامر bash بيشغّلها قبل كل prompt. zoxide بيحط الـ hook في أوله |
| [[z]] و [[zi]] | الأمرين اللي هتستخدمهم |

## ٣. [[source ~/.bashrc]]

~~~text type z | head -2
z is a function
z ()
~~~

[[z]] مش برنامج، فانكشن جوه الشيل (عشان [[cd]] لازم يحصل في الشيل نفسه، درس [[cd]] جوه السكربت).

---

## ٤. [[mkdir -p ~/lab/projects/shop-api ~/lab/projects/shop-web ~/lab/projects/blog]]

٣ فولدرات، و [[-p]] يعمل [[lab]] و [[projects]] لو مش موجودين.

## ٥ و ٦ و ٧. [[cd]] للأول، وللتاني، ولـ [[~]]

كل [[cd]] في سطر لوحده، فبعد كل واحد الـ prompt بيظهر، والـ hook بيسجّل. والـ home نفسه zoxide بيتجاهله.

---

## ٨. [[z api]]

zoxide دوّر على مسار آخر جزء فيه [[api]]:

~~~text pwd
/home/ali/lab/projects/shop-api
~~~

## ٩. [[z shop]]

فيه اتنين بيطابقوا shop، ودرجتهم وقتها متساوية. بس انت **جوه** shop-api، و [[z]] مبيرجعكش لمكانك:

~~~text pwd
/home/ali/lab/projects/shop-web
~~~

## ١٠. [[zi shop]]

نفس البحث، بس بيفتح fzf بكل اللي طابق وانت تختار (محتاج ترمنال حقيقي، فمجربناهوش هنا).

## ١١. [[zoxide query -ls]]

[[query]] اسأل قاعدة البيانات، و [[-l]] (list) الكل، و [[-s]] (score) بالدرجات:

~~~text الناتج
   8.0 /home/ali/lab/projects/shop-api
   8.0 /home/ali/lab/projects/shop-web
~~~

كل فولدر اتزار مرتين (مرة [[cd]] ومرة [[z]])، وكل زيارة بـ 1، والرقم بيتضرب في 4 لأن آخر زيارة في آخر ساعة: 2 × 4 = 8. و [[blog]] مش هنا لأننا لسه مدخلناهوش.

---

## حاجات جربناها كمان

~~~text z nothing; echo "exit=$?"
zoxide: no match found
exit=1
~~~

~~~text z projects
zoxide: no match found
~~~

موجود في المسار، بس **آخر** كلمة لازم تطابق **آخر** جزء، و [[projects]] مش آخر جزء في أي فولدر محفوظ.

~~~text z -; pwd
/home/ali/lab/projects/shop-api
~~~

[[z -]] زي [[cd -]]: الفولدر اللي كنت فيه قبل كده. و [[z lab/projects/blog]] (مسار موجود فعلًا) اشتغل زي [[cd]] عادي.

وبعد [[cd /tmp && cd /var && cd /etc]] في سطر واحد:

~~~text zoxide query -ls
  12.0 /home/ali/lab/projects/shop-api
   8.0 /home/ali/lab/projects/shop-web
   4.0 /etc
   4.0 /home/ali/lab/projects/blog
~~~

[[/etc]] بس اتسجل، لأن الـ hook شغال عند الـ prompt، والـ prompt ظهر مرة واحدة بعد السطر كله.

---

سطر التشغيل في كل شيل:

- bash: [[eval "$(zoxide init bash)"]] في [[~/.bashrc]].
- zsh (الماك): [[eval "$(zoxide init zsh)"]] في [[~/.zshrc]] (من الـ docs).
- PowerShell: [[Invoke-Expression (& { (zoxide init powershell | Out-String) })]] في الملف اللي [[$PROFILE]] بيشاور عليه (من الـ docs).

## الخلاصة

zoxide بيتعلم من [[cd]] بتاعك. [[z كلمة]] لأعلى فولدر آخر جزء فيه الكلمة، و [[zi]] تختار بنفسك، و [[zoxide query -ls]] تشوف الدرجات. وفي السكربتات [[cd]] بمسار كامل.`,
          lines: [
            R`سطّب zoxide، و fzf عشان [[zi]].`,
            R`ضيف سطر التشغيل في آخر [[.bashrc]].`,
            R`نفّذ [[.bashrc]] دلوقتي.`,
            R`اعمل ٣ فولدرات للتجربة.`,
            R`ادخل الأول، فيتسجّل.`,
            R`ادخل التاني.`,
            R`ارجع للـ home (الـ home نفسه مبيتسجّلش).`,
            R`روح لأعلى فولدر آخر جزء فيه api: shop-api.`,
            R`روح لـ shop: انت دلوقتي في shop-api، و [[z]] مبيرجعكش لنفس مكانك، فبيوديك shop-web.`,
            R`اعرض كل اللي بيطابق shop في لستة واختار بنفسك.`,
            R`اعرض الفولدرات المحفوظة ودرجة كل واحد.`
          ],
          sol: R`بالترتيب ده ([[shop-api]] مرة، و [[shop-web]] مرتين، و [[blog]] مرة)، [[z shop]] بيوديك [[/home/ali/lab/projects/shop-web]] لأن درجته أعلى، و [[z api]] بيوديك [[shop-api]]، و [[z -]] بيرجعك [[shop-web]]. و [[zoxide query -ls]] بيطبع:
[[16.0 /home/ali/lab/projects/shop-web]]
[[8.0 /home/ali/lab/projects/shop-api]]
[[4.0 /home/ali/lab/projects/blog]]
الأرقام دي عدد الزيارات (و [[z]] نفسها زيارة) مضروب في 4، لأن كلها في آخر ساعة. والـ home مش في اللستة لأن zoxide بيتجاهله.

و [[z nothing]] بيطبع [[zoxide: no match found]] ويرجّع 1 ومكانك مبيتغيرش. ولو [[z]] قالك [[command not found]]، يبقى سطر [[eval]] مش في [[.bashrc]] أو لسه ماعملتش [[source]]. ولو فولدر دخلته ومش ظاهر، اتأكد إنك دخلته في ترمنال فيه zoxide شغال، وإن [[cd]] كان في سطر لوحده: zoxide بيسجّل مكانك لما الـ prompt يظهر، فـ [[cd a && cd b]] بيسجّل b بس.`
        },
        {
          cmd: "bat و eza",
          title: "cat و ls بشكل أحدث",
          desc: R`[[bat]] زي [[cat]] بس بيلوّن الكود حسب لغته، وبيرقّم السطور، وبيعلّم السطور اللي اتغيرت في git. و [[eza]] زي [[ls]] بألوان أوضح، وبعمود فيه حالة git لكل ملف، وشجرة فولدرات بـ [[--tree]]. الاتنين إضافة على جهازك مش بديل: [[cat]] و [[ls]] الأصليين هما اللي هتلاقيهم على أي سيرفر، وهما اللي تستخدمهم في السكربتات.

على أوبونتو [[sudo apt install bat]] بيسطّب البرنامج باسم [[batcat]] مش [[bat]]، لأن فيه باكدج تاني قديم واخد الاسم. فإما تكتب [[batcat]]، أو تعمل link باسم [[bat]] في [[~/.local/bin]] ([[ln -s]] من درس ln). و [[~/.profile]] بتاع أوبونتو بيحط الفولدر ده في الـ PATH لو موجود، بس بيتقري وقت الدخول، فبعد أول مرة اعمل [[source ~/.profile]] أو اخرج وادخل تاني.

flags bat: [[-n]] أرقام السطور من غير الإطار، و [[-r 10:20]] (line-range) السطور من 10 لـ 20 بس، و [[-l json]] تحدد اللغة لو الملف من غير امتداد أو جاي من pipe، و [[-A]] بيظهر الحروف المخفية: [[·]] للمسافة، و [[├──┤]] للتاب، و [[␍]] لحرف CR اللي ويندوز بيحطه في آخر كل سطر وبيبوّظ سكربتات bash وملفات [[.env]]. والملف الطويل بيتفتح في [[less]] (q للخروج)، و [[--paging=never]] بيطبعه على طول. ولما الناتج رايح لـ pipe أو ملف، bat بيطبع المحتوى زي cat من غير ألوان ولا إطار.

[[eza]] موجود في أوبونتو 24.04 وأحدث: [[sudo apt install eza]] (مش موجود في 22.04، هناك محتاج الـ repo بتاعهم). [[-l]] تفاصيل و [[-a]] حتى المخفي زي ls، و [[--git]] عمودين قبل الاسم: الأول للي في الـ staging والتاني للي لسه، و [[N]] جديد و [[M]] متعدّل و [[-]] مفيش تغيير. و [[--group-directories-first]] الفولدرات فوق، و [[--tree --level=2]] شجرة لحد مستويين (زي [[tree -L 2]])، و [[--icons]] أيقونة جنب كل ملف ومحتاجة خط Nerd Font (شوف درس «Nerd Font» في تاب «اختصارات النظام»).`,
          example: R`sudo apt install bat eza
# في فولدر مشروع فيه git
batcat app.js
batcat -n -r 1:20 server.js
batcat -A .env
mkdir -p ~/.local/bin && ln -s /usr/bin/batcat ~/.local/bin/bat
eza -l --git --group-directories-first
eza --tree --level=2
alias ll='eza -la --git --group-directories-first'`,
          try: R`في فولدر مشروع فيه git: عدّل سطر في ملف .js وضيف سطر جديد، واعمل ملف تاني جديد واعمله [[git add]]، وبعدين [[batcat]] على الملف المتعدّل و [[eza -l --git]]. واعمل [[.env]] بنهايات ويندوز ([[printf 'PORT=3000\r\nNAME=my shop\r\n' > .env]]) وشوفه بـ [[batcat -A]].`,
          mac: ["both", R`[[brew install bat eza]]، والأمر هناك اسمه [[bat]] على طول من غير [[batcat]].`],
          deep: {
            why: R`وانت بتقرا كود أو ملف إعدادات في الترمنال، الألوان وأرقام السطور بتفرق جدًا، خصوصًا لما error يقولك «السطر 47». و [[ls]] مبيقولكش أنهي ملف اتعدّل من آخر commit؛ [[eza --git]] بيقولك من غير [[git status]]. وأهم حاجة عملية: [[bat -A]] بيكشف الحروف المخفية زي CR اللي بتعمل errors غريبة في السكربتات.`,
            how: R`[[bat]] بيعرف لغة الملف من امتداده (أو من أول سطر زي [[#!/usr/bin/env bash]])، وبيلوّنه بنفس قواعد تلوين محررات زي Sublime Text، وفيه أكتر من 170 لغة ([[batcat --list-languages]]). وبيسأل git عن الفرق بين الملف وآخر commit عشان يحط العلامات جنب السطور.

وبيشوف الـ stdout رايح فين، زي [[--color=auto]] في درس LS_COLORS: لو ترمنال بيرسم الإطار والألوان ويفتح [[less]] لو الملف أطول من الشاشة، ولو pipe أو ملف بيطبع المحتوى زي ما هو. عشان كده [[batcat file | grep x]] شغال عادي.

و [[eza]] بيقرا نفس المعلومات اللي [[ls -l]] بيقراها، بس بيعرضها بشكل تاني: الحجم مقري على طول من غير [[-h]]، والتاريخ أقصر، والصلاحيات ملوّنة حرف حرف. ومع [[--git]] بيقرا حالة الـ repo مرة واحدة ويحطها جنب كل ملف.

والاسم [[batcat]] على أوبونتو وديبيان: كان فيه باكدج قديم فيه برنامج اسمه bat (أداة تانية خالص)، فديبيان غيّرت اسم الملف اللي بيتسطب عشان ميتخانقوش.`,
            when: R`على جهازك وانت بتقرا كود أو لوجات أو ملفات إعدادات، و [[batcat -A]] أول ما سكربت يطلّع error غريب زي [[$'\r': command not found]]. و [[eza --tree]] لما تشرح شكل مشروع لحد. أما على سيرفر حد تاني، أو في سكربت هيشتغل في مكان تاني، استخدم [[cat]] و [[ls]].`,
            mistakes: R`إنك تكتب [[bat]] على أوبونتو وتستغرب [[command not found]]، والأمر اسمه [[batcat]]. و [[alias cat=bat]] أو [[alias ls=eza]] ونسيان إن السكربتات والسيرفرات مفيهاش الكلام ده، فتتعوّد على flags مش موجودة في الأصلي. و [[--icons]] من غير Nerd Font فتطلع مربعات. وإنك تعتمد على شكل ناتج eza في سكربت: شكله ممكن يتغير بين النسخ، و [[ls]] و [[find]] أثبت.`
          },
          teach: R`## [[batcat]] = [[cat]] بألوان وأرقام وعلامات git، و [[eza]] = [[ls]] بعمود git

اتشغّلوا على أوبونتو 24.04 جوه Docker (bat 0.24.0 و eza 0.18.2) في فولدر [[shop]] فيه git repo. بعد آخر commit: زودنا سطر تاني في [[app.js]] وغيّرنا [[3000]] لـ [[8080]] في سطر تاني، وعملنا [[config.json]] جديد و [[git add]] له، و [[.env]] بنهايات سطور ويندوز. وعشان bat بيرسم الإطار بس لو الناتج رايح لترمنال، شغّلناه جوه [[script]] (ترمنال وهمي) وشلنا أكواد الألوان.

---

## ١. [[sudo apt install bat eza]]

~~~text which bat
(ولا حاجة، exit 1)
~~~

باكدج [[bat]] بيسطّب البرنامج باسم [[batcat]]، لأن اسم bat كان واخده برنامج تاني قديم في ديبيان.

---

## ٢. [[batcat app.js]]

~~~text الناتج (من غير ألوان)
───────┬────────────────────────────────────────────────────
       │ File: app.js
───────┼────────────────────────────────────────────────────
   1   │ const express = require("express");
   2 + │ // new line
   3   │ const app = express();
   4 ~ │ app.listen(8080);
───────┴────────────────────────────────────────────────────
~~~

| الحتة | معناها |
|---|---|
| [[File: app.js]] | اسم الملف فوق |
| [[1]] [[2]] ... | أرقام السطور |
| [[+]] | سطر جديد من آخر commit |
| [[~]] | سطر اتعدّل من آخر commit |
| الكود | ملوّن حسب اللغة (عرفها من [[.js]]) |

وفيه 173 لغة ([[batcat --list-languages | wc -l]]). ولو الملف أطول من الشاشة بيفتحه في [[less]] (q للخروج).

### لما الناتج مش لترمنال

~~~text batcat app.js | head -2
const express = require("express");
// new line
~~~

من غير إطار ولا أرقام ولا ألوان، زي cat بالظبط. عشان كده ينفع في pipe.

---

## ٣. [[batcat -n -r 1:20 server.js]]

[[-n]] (number) أرقام السطور بس من غير الإطار، و [[-r 1:20]] (line-range) من سطر 1 لـ 20. جربناها بـ [[1:5]]:

~~~text الناتج
   1 console.log(1);
   2 console.log(2);
   3 console.log(3);
   4 console.log(4);
   5 console.log(5);
~~~

---

## ٤. [[batcat -A .env]]

[[-A]] (show-all) بيرسم الحروف اللي مش بتبان:

~~~text الناتج
PORT=3000␍␊
NAME=my·shop␍␊
├──┤TAB=1␊
~~~

| الرمز | الحرف |
|---|---|
| [[␊]] | LF: نهاية سطر لينكس ([[\n]]) |
| [[␍]] | CR: ويندوز بيحطه قبل الـ LF ([[\r\n]]) |
| [[·]] | مسافة |
| [[├──┤]] | Tab |

أول سطرين فيهم [[␍␊]]: الملف ده اتكتب على ويندوز. وده اللي بيخلي [[PORT]] يتقري [[3000\r]] وسكربتات bash تطلّع [[$'\r': command not found]].

---

## ٥. [[mkdir -p ~/.local/bin && ln -s /usr/bin/batcat ~/.local/bin/bat]]

[[&&]] التاني يشتغل بس لو الأول نجح. و [[ln -s]] بيعمل link اسمه [[bat]] بيشاور على [[batcat]]:

~~~text ls -l ~/.local/bin
lrwxrwxrwx 1 ali ali 15 Oct  6 09:10 bat -> /usr/bin/batcat
~~~

بس [[~/.local/bin]] مش في الـ PATH لسه في الشيل ده. [[~/.profile]] بتاع أوبونتو بيزوّده لو الفولدر موجود، وقت الدخول بس. جربنا login shell جديد:

~~~text bash -lc 'which bat'
/home/ali/.local/bin/bat
~~~

[[-l]] (login) خلاه يقرا [[~/.profile]]. في ترمنالك: [[source ~/.profile]] أو اخرج وادخل.

---

## ٦. [[eza -l --git --group-directories-first]]

~~~text الناتج
drwxrwxr-x   - ali  6 Oct 09:10 -- src
.rw-rw-r--  89 ali  6 Oct 09:10 -M app.js
.rw-rw-r--   3 ali  6 Oct 09:10 N- config.json
.rw-rw-r--  21 ali  6 Oct 09:10 -- package.json
.rw-rw-r-- 501 ali  6 Oct 09:10 -- server.js
~~~

| العمود | معناه |
|---|---|
| [[.rw-rw-r--]] | الصلاحيات زي [[ls -l]]، و [[.]] أوله يعني ملف عادي (ls بيكتب [[-]]) |
| [[89]] | الحجم بالبايت، و [[-]] للفولدر |
| [[ali]] | المالك |
| [[6 Oct 09:10]] | آخر تعديل |
| [[-M]] و [[N-]] | حالة git (تحت) |

عمود git حرفين: الأول للـ staging (اللي اتعمله [[git add]])، والتاني للي لسه:

| الحالة | معناها |
|---|---|
| [[--]] | زي آخر commit |
| [[-M]] | اتعدّل ولسه من غير add |
| [[N-]] | ملف جديد واتعمله add |

و [[--group-directories-first]] حط [[src]] فوق. ومع [[-a]] ظهر كمان [[-N .env]] (جديد ومن غير add) و [[-I .git]] ([[I]] = ignored).

---

## ٧. [[eza --tree --level=2]]

~~~text الناتج
.
├── app.js
├── config.json
├── package.json
├── server.js
└── src
~~~

[[--level=2]] لحد مستويين (زي [[tree -L 2]]). [[src]] فاضي فمفيش تحته حاجة.

---

## ٨. [[alias ll='eza -la --git --group-directories-first']]

[[ll]] بقى eza بكل الإعدادات دي (درس alias). ولو عايزه دايم في [[.bashrc]].

---

| النظام | التسطيب | اسم الأمر |
|---|---|---|
| أوبونتو 24.04 | [[sudo apt install bat eza]] | [[batcat]] و [[eza]] |
| الماك | [[brew install bat eza]] | [[bat]] و [[eza]] (من الـ docs) |
| ويندوز | [[winget install sharkdp.bat]] | [[bat]] (من الـ docs) |

## الخلاصة

[[batcat]] للقراية (و [[-A]] يكشف CR ويندوز)، و [[eza -l --git]] تعرف أنهي ملف اتغير. على جهازك بس: في السكربتات والسيرفرات [[cat]] و [[ls]].`,
          lines: [
            R`سطّب الاتنين (eza في 24.04 وأحدث).`,
            R`اعرض الملف ملوّن بأرقام السطور وعلامات git، وفي less لو طويل.`,
            R`أرقام السطور بس ([[-n]])، ومن السطر 1 لـ 20 ([[-r 1:20]]).`,
            R`اظهر الحروف المخفية: المسافات والتابات و CR ويندوز.`,
            R`اعمل [[~/.local/bin]] واعمل جواه link اسمه bat بيشاور على batcat.`,
            R`تفاصيل الملفات، وحالة كل ملف في git، والفولدرات الأول.`,
            R`شجرة الفولدر لحد مستويين.`,
            R`اختصار ll بيستخدم eza (ولو عايزه دايم حطه في [[.bashrc]]).`
          ],
          sol: R`[[batcat app.js]] في الترمنال بيطبع إطار فوقه [[File: app.js]]، وجنب كل سطر رقمه، والكود ملوّن. والسطر اللي اتعدّل ولسه من غير commit جنبه [[~]]، والسطر الجديد جنبه [[+]]. و [[eza -l --git]] بيطلّع حاجة زي:
[[.rw-r--r-- 61 ali  2 Oct 10:30 -M app.js]]
[[.rw-r--r--  3 ali  2 Oct 10:30 N- config.json]]
[[.rw-r--r-- 34 ali  2 Oct 10:09 -- package.json]]
[[-M]] متعدّل ولسه من غير add، و [[N-]] ملف جديد عملتله [[git add]]، و [[--]] زي ما هو في آخر commit. ولو عملت add للملف المتعدّل هيبقى [[M-]].

و [[batcat -A .env]] بيطبع [[PORT=3000␍␊]] و [[NAME=my·shop␍␊]]: الـ [[␍]] هو الـ CR، يعني الملف ده محتاج يتحوّل ([[sed -i 's/\r$//' .env]] أو [[dos2unix]]). ولو [[bat]] قالك [[command not found]] وانت عامل الـ link، يبقى [[~/.local/bin]] لسه مش في الـ PATH: [[source ~/.profile]].`
        }
      ]
    }
]);
