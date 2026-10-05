// تكملة تاب zsh: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/zsh/01.js (شرح حقول الدرس في أوله)
MORE("zsh", [
    {
      t: "سكربتات zsh",
      l: 3,
      n: "سكربتات لجهازك الماك: zsh فيه حاجات مش في bash. ولو السكربت هيتنقل لسيرفر أو CI، اكتبه bash",
      items: [
        {
          cmd: "hello.zsh",
          title: "أول سكربت zsh وإزاي تشغّله",
          desc: R`السكربت ملف نصي فيه أوامر ورا بعض، بتشغّله مرة واحدة بدل ما تكتبهم بإيدك كل مرة. أول سطر اسمه shebang: [[#!/usr/bin/env zsh]] بيقول للنظام «شغّل الملف ده بـ zsh»، و [[env]] بتدوّر على zsh في الـ PATH بدل ما تكتب مساره بإيدك. أي سطر تاني بيبدأ بـ [[#]] تعليق.

جوه السكربت [[$1]] أول كلمة اتكتبت بعد اسم السكربت، و [[$__{1:-world}]] معناها «خد [[$1]]، ولو فاضية استخدم world». [[$#]] عدد الكلمات اللي اتبعتت، و [[$0]] اسم السكربت نفسه. [[print]] أمر zsh بيطبع زي [[echo]] بس سلوكه ثابت.

عشان تشغّله: [[chmod +x hello.zsh]] مرة واحدة تدّي الملف صلاحية التنفيذ (x)، وبعدها [[./hello.zsh Sara]]. الـ [[./]] معناها «الملف اللي في الفولدر ده»، لأن الشيل مش بيدوّر في الفولدر الحالي لوحده. أو [[zsh hello.zsh Sara]] من غير chmod خالص.

امتى تكتب bash بدل zsh؟ zsh مش متسطب افتراضي على أوبونتو ولا في أغلب Docker images وأجهزة CI. فلو السكربت هيشتغل على سيرفر أو عند زمايلك اكتبه bash ([[#!/usr/bin/env bash]])، وسيب zsh لسكربتات جهازك.`,
          example: R`#!/usr/bin/env zsh
# hello.zsh: أول سكربت
name=$__{1:-world}
print "Hello, $name"
print "zsh $ZSH_VERSION | script: $0 | args: $#"`,
          try: "احفظه في lab باسم hello.zsh، شغّله بـ ./ مرة باسمك ومرة من غير اسم، وبعدين جرّب [[bash hello.zsh]] وشوف بيقع فين.",
          flag: "script",
          deep: {
            why: "أي حاجة بتعملها كل يوم بكذا أمر (تجهيز مشروع، تنظيف فولدر، باك أب سريع) تبقى أمر واحد. وعلى الماك zsh موجود دايمًا، فمش محتاج تسطّب حاجة.",
            how: R`لما تكتب [[./hello.zsh Sara]]، النظام بيقرا أول سطر، يلاقي [[#!]]، فيشغّل [[/usr/bin/env zsh ./hello.zsh Sara]]. لو شغلته بـ [[zsh hello.zsh]] الـ shebang بيتجاهل لأنه بقى تعليق عادي. ولو شغلته بـ [[bash hello.zsh]] هيقع عند [[print]] بـ [[print: command not found]]، لأن bash مش بيعرفها.

متغيرات السكربت: [[$1]] و [[$2]] وهكذا الكلمات بالترتيب، و [[$@]] كلهم كلستة، و [[$#]] عددهم، و [[$ZSH_VERSION]] نسخة zsh اللي شغالة.

حط سكربتاتك في فولدر زي [[~/bin]] وضيفه للـ PATH في [[~/.zshrc]]، فتقدر تكتب [[hello.zsh]] من أي مكان من غير [[./]].`,
            when: "مهمة بتكررها على جهازك. لو هتشتغل على سيرفر أو في GitHub Actions، bash أضمن.",
            mistakes: R`تنسى [[chmod +x]] فيطلع [[zsh: permission denied: ./hello.zsh]]. أو تكتب [[hello.zsh]] من غير [[./]] فيطلع [[command not found]]. أو تكتب سكربت bash للسيرفر وتجربه على الماك بس: bash الماك 3.2 ناقصه حاجات زي [[declare -A]]، والسيرفر عليه bash 5، فجرّب على نفس البيئة اللي هيشتغل عليها.`
          },
          lines: [
            "[[$1]] أول argument، ولو مفيش خد world.",
            "اطبع التحية ([[print]] بتاعة zsh، زي echo).",
            "اطبع نسخة zsh، واسم السكربت ([[$0]])، وعدد الـ arguments ([[$#]])."
          ],
          sol: R`جربته في zsh 5.9: [[./hello.zsh Sara]] طبع [[Hello, Sara]] وتحته [[zsh 5.9 | script: ./hello.zsh | args: 1]]. ومن غير اسم طبع [[Hello, world]] و [[args: 0]]. ولو شغلته بـ [[zsh hello.zsh a b c]] الـ [[$0]] بقت [[hello.zsh]] من غير [[./]] و [[args: 3]]، والتحية بقت [[Hello, a]] لأن [[$1]] أول كلمة بس.

[[bash hello.zsh]] طبع [[hello.zsh: line 4: print: command not found]] ونفس الغلطة للسطر 5، والـ exit code بقى 127. ده اللي بيحصل لما سكربت zsh يتشغل بـ bash. ولو [[./hello.zsh]] قال [[permission denied]] يبقى نسيت [[chmod +x hello.zsh]].`,
          solCode: R`chmod +x hello.zsh
./hello.zsh Sara
./hello.zsh
bash hello.zsh`
        },
        {
          cmd: "alias vs function",
          title: "alias ولا function",
          desc: R`الـ alias اسم قصير بيتبدّل بنص قبل ما الأمر يتنفّذ: [[alias gs='git status -sb']] بتخلي [[gs]] تبقى [[git status -sb]] بالظبط، وأي كلام تكتبه بعدها بيتحط في الآخر. مفيهوش منطق، ومش بيقدر يحط كلمة في نص الأمر.

الـ function أمر صغير ليه جسم بين [[{ }]]: بياخد كلمات ([[$1]] أولهم و [[$@]] كلهم) ويستخدمها في أي مكان، وينفع فيها شروط وكذا أمر. [[mkcd]] في المثال بتعمل فولدر وتدخله: [[mkdir -p]] بتعمل الفولدر واللي قبله لو مش موجودين، و [[&&]] معناها «كمّل بس لو اللي قبلي نجح»، و [[--]] معناها «اللي بعدي اسم مش option»، عشان فولدر اسمه بيبدأ بـ [[-]] ميتفهمش غلط.

القاعدة: اختصار لأمر ثابت يبقى alias. محتاج argument في النص أو أكتر من خطوة يبقى function. [[alias -g]] (global) حاجة zsh بس: بتتبدّل في أي مكان في السطر مش في أوله بس، فـ [[G]] بقت [[| grep -i]]. و [[type]] بتقولك الاسم ده alias ولا function ولا برنامج. الاتنين بيتحطوا في [[~/.zshrc]] عشان يفضلوا.`,
          example: R`alias gs='git status -sb'
alias -g G='| grep -i'
ls -la ~ G zsh
mkcd() { mkdir -p -- "$1" && cd -- "$1"; }
mkcd ~/lab/new/app
type gs mkcd`,
          try: R`اعمل [[mkcd]] وجربها، وبعدين اعمل [[alias greet='echo Hello $1 !']] وجرب [[greet Sara]] وفكّر ليه الناتج غريب.`,
          deep: {
            why: "بتكتب نفس الأوامر الطويلة كل يوم. الـ alias والـ function بيخلوها كلمة، والفرق بينهم هو اللي بيحدد هتشتغل صح ولا لأ.",
            how: R`الـ alias بيتبدّل كنص وقت ما الشيل بيقرا السطر. عشان كده [[alias greet='echo Hello $1 !']] مش بتشتغل زي ما متوقع: [[greet Sara]] بتطبع [[Hello ! Sara]]، لأن [[$1]] فاضية في الترمنال، والكلمة اتحطت في الآخر. نفس الفكرة كـ function: [[greet() { echo "Hello $1 !"; }]] بتطبع [[Hello Sara !]].

لو عايز تتخطى alias مرة واحدة اكتب [[\gs]] أو [[command ls]]. و [[unalias gs]] بتشيله من الجلسة. [[alias]] لوحدها بتطبع كل الـ aliases، و [[functions mkcd]] بتطبع كود الـ function.

الـ global alias قوي بس خطير: أي [[G]] لوحدها في أي أمر هتتبدّل، فاختار أسامي كابيتال مش هتكتبها صدفة.`,
            when: "أمر بتكتبه أكتر من مرة في اليوم. خطوتين دايمًا ورا بعض زي mkdir وبعدها cd.",
            mistakes: R`تعمل alias محتاج argument في النص وتستغرب. أو تكتب mkcd كسكربت منفصل وتستنى يغيّر فولدر الترمنال: السكربت بيشتغل في شيل لوحده، و [[cd]] جواه مش بتأثر عليك، عشان كده لازم function في [[~/.zshrc]]. وخد بالك إن السكربتات مش بتقرا [[~/.zshrc]]، فالـ aliases والـ functions بتوعك مش موجودة جواها.`
          },
          lines: [
            "alias عادي: [[gs]] تتبدّل بـ git status -sb.",
            "global alias (zsh بس): [[G]] تتبدّل في أي مكان في السطر.",
            "يبقى [[ls -la ~ | grep -i zsh]]: الملفات اللي فيها zsh في الـ home.",
            "function بتاخد اسم فولدر، تعمله وتدخله.",
            "جرّبها: عملت الفولدرات التلاتة ودخلت آخرهم.",
            "اعرف كل اسم هو إيه."
          ],
          sol: R`جربتها في zsh: [[ls -la ~ G zsh]] طبعت سطور [[.zshrc]] و [[.zsh_history]] بس، لأنها بقت [[ls -la ~ | grep -i zsh]]. و [[mkcd ~/lab/new/app]] عملت الفولدرات ودخلت، و [[pwd]] بعدها بيطبع مسار app. و [[type gs mkcd]] طبعت [[gs is an alias for git status -sb]] وتحتها إن mkcd [[shell function]] (ولو متعرّفة في [[.zshrc]] بيقولك اسم الملف كمان).

و [[greet Sara]] من الـ alias طبعت [[Hello ! Sara]]: الـ [[$1]] اتفكت فاضية وقت ما الـ alias اتبدّل، و Sara اتحطت في آخر السطر. ده بالظبط الموقف اللي محتاج فيه function.`,
          solCode: R`mkcd() { mkdir -p -- "$1" && cd -- "$1"; }
mkcd ~/lab/new/app
pwd
alias greet='echo Hello $1 !'
greet Sara
greet2() { echo "Hello $1 !"; }
greet2 Sara`
        },
        {
          cmd: "autoload -Uz",
          title: "functions في ملفات لوحدها (autoload)",
          desc: R`لما الـ functions بتاعتك تكتر، [[~/.zshrc]] بيطول وكل ترمنال بيقراه كله. zsh عنده حل: كل function في ملف لوحده جوه فولدر، واسم الملف هو اسم الـ function، وجواه جسمها بس. [[fpath]] هي لستة الفولدرات اللي zsh بيدوّر فيها على الملفات دي (زي PATH بس للـ functions)، و [[fpath=(~/.zfunc $fpath)]] بتحط فولدرك في أولها وتسيب الباقي زي ما هو.

[[autoload -Uz note]] بتقول لـ zsh «فيه function اسمها note، متحمّلهاش دلوقتي، وأول ما تتنادى دوّر عليها في fpath». [[-U]] معناها متفكّش الـ aliases جوه الملف وقت التحميل، و [[-z]] حمّلها بطريقة zsh العادية. الاتنين بيتكتبوا مع بعض دايمًا.

في المثال الـ function بتكتب تاريخ النهارده والكلام اللي بعدها ([[$*]] كل الكلمات كنص واحد) في آخر ملف notes.txt. [[print -r]] بتطبع النص زي ما هو، و [[>>]] بتضيف في آخر الملف. سطري [[fpath]] و [[autoload]] مكانهم [[~/.zshrc]] عشان يفضلوا. وهتشوف نفس الفكرة في السطر المشهور [[autoload -Uz compinit && compinit]] اللي بيشغّل الإكمال بـ Tab.`,
          example: R`mkdir -p ~/.zfunc
print 'print -r -- "$(date +%F) $*" >> ~/notes.txt' > ~/.zfunc/note
fpath=(~/.zfunc $fpath)
autoload -Uz note
note buy milk
tail -1 ~/notes.txt`,
          try: "اعمل function اسمها note بالطريقة دي، اكتب بيها ملاحظتين، وبعدين اعرف حالتها بـ [[type note]] قبل وبعد أول استخدام.",
          deep: {
            why: "تخلي [[~/.zshrc]] قصير ونضيف، وكل function في ملف تعدّله لوحده، والترمنال بيفتح أسرع لأن الـ function مش بتتقري غير لما تستخدمها.",
            how: R`[[type note]] قبل أول استخدام بتقول [[note is an autoload shell function]]، وبعده [[note is a shell function from /Users/sara/.zfunc/note]]، يعني اتحملت من الملف.

لو عدّلت الملف بعد ما الـ function اتحملت، zsh مش هيشوف التعديل لأنها في الذاكرة. [[unfunction note && autoload -Uz note]] بتشيلها وتعلّمها تتحمّل تاني من الملف، أو افتح ترمنال جديد.

بتشوف fpath كلها بـ [[print -l $fpath]]. أدوات زي brew بتحط فيها ملفات الإكمال بتاعتها، وده سبب إن [[compinit]] يلاقيها.`,
            when: "عندك أكتر من 3 أو 4 functions في الـ zshrc، أو function طويلة عايز تعدّلها براحتك في ملف لوحدها.",
            mistakes: R`الفولدر مش في [[fpath]] أو اسم الملف مختلف عن اسم الـ function، فيطلع [[note: function definition file not found]] أول ما تناديها. أو تعدّل الملف وتفضل تجرّب في نفس الترمنال وتستغرب إن التعديل مش ظاهر.`
          },
          lines: [
            "فولدر لملفات الـ functions.",
            "اعمل ملف اسمه note جواه جسم الـ function بس. علامات التنصيص الفردية بتخلي [[$(date)]] و [[$*]] يتكتبوا زي ما هم.",
            "حط الفولدر في أول fpath.",
            "سجّل note كـ function تتحمّل وقت أول استخدام.",
            "استخدمها زي أي أمر.",
            "آخر سطر في الملف: الملاحظة بتاريخ النهارده."
          ],
          sol: R`جربتها في zsh 5.9: [[note buy milk]] مش بتطبع حاجة، و [[tail -1 ~/notes.txt]] طبع [[2026-10-01 buy milk]] (بتاريخ يومك). [[type note]] قبل أول استخدام طبع [[note is an autoload shell function]]، وبعده [[note is a shell function from /root/.zfunc/note]] (عندك هيبقى مسار الـ home بتاعك).

لو طلع [[function definition file not found]] يبقى سطر [[fpath]] متنفّذش في الجلسة دي، أو الملف اسمه مختلف. وعشان تفضل موجودة في كل ترمنال، ضيف سطري [[fpath]] و [[autoload]] في [[~/.zshrc]].`,
          solCode: R`note buy milk
note call Ali
tail -2 ~/notes.txt
type note`
        },
        {
          cmd: "zsh arrays",
          title: "arrays و parameter flags في zsh",
          desc: R`الـ array لستة قيم في متغير واحد: [[fruits=(apple banana cherry)]]. أهم فرق عن bash: العد في zsh بيبدأ من 1 مش 0. فـ [[$fruits[1]]] هي apple، وفي bash [[$__{fruits[1]}]] كانت هتطلع banana. [[$fruits[-1]]] آخر عنصر، و [[$#fruits]] عدد العناصر، ومش محتاج الأقواس [[{}]] اللي bash بيطلبها.

الـ parameter flags حروف بين قوسين في أول [[$__{...}]] بتعدّل القيمة قبل ما تستخدمها: [[(U)]] كله كابيتال، و [[(L)]] كله سمول، و [[(C)]] أول حرف من كل كلمة كابيتال، و [[(s:,:)]] قسّم النص عند كل فاصلة لـ array، و [[(j:-:)]] العكس: لزّق عناصر الـ array وحط [[-]] بينهم. الحرف اللي بين النقطتين هو الفاصل، وتقدر تغيّره لأي حاجة.

فرق مهم كمان: zsh مش بيقسّم المتغير على المسافات لوحده. [[for w in $name]] بتلف مرة واحدة على [[sara ali]] كلها، وفي bash كانت هتلف مرتين. ده بيحميك من أسامي ملفات فيها مسافات، بس لو نقلت سكربت bash بيعتمد على التقسيم ده هيتصرف مختلف.`,
          example: R`#!/usr/bin/env zsh
fruits=(apple banana cherry)
print $fruits[1]
print $fruits[-1]
print $#fruits
csv="a,b,c"
parts=($__{(s:,:)csv})
print $#parts $parts[2]
name="sara ali"
print $__{(U)name} / $__{(C)name}
print $__{(j:-:)fruits}
for w in $name; do print "[$w]"; done`,
          try: R`قسّم [[PATH]] على [[:]] لـ array واطبع عدد الفولدرات وأول فولدر.`,
          flag: "script",
          deep: {
            why: "على الماك هتكتب سكربتات zsh، ولو جبت عادات bash (العد من 0، والتقسيم على المسافات) هتطلعلك نتايج غلط من غير أي error.",
            how: R`قطع من الـ array: [[$fruits[2,3]]] من التاني للتالت. إضافة: [[fruits+=(mango)]]. كل العناصر في سطور: [[print -l $fruits]].

flags تانية مفيدة: [[(f)]] قسّم على السطور، فـ [[lines=($__{(f)"$(cat file)"})]] بتحط كل سطر في عنصر. و [[(o)]] رتّب، و [[(u)]] شيل المكرر. وتقدر تجمع أكتر من flag: [[$__{(uo)list}]] من غير تكرار ومترتبة.

لو عايز سلوك bash في حتة معينة: [[$=name]] بتقسّم على المسافات، و [[setopt ksh_arrays]] بتخلي العد من 0، بس الأحسن تتعود على zsh.`,
            when: "أي سكربت zsh فيه لستة ملفات أو أسامي، أو بتقطّع فيه نص.",
            mistakes: R`تكتب [[$fruits[0]]] وتستنى apple: في zsh بتطلع فاضية. أو تقسّم نص بـ [[for w in $line]] وتستغرب إنه لف مرة واحدة. أو تنسى علامات التنصيص حوالين [[$(cat file)]] مع [[(f)]].`
          },
          lines: [
            "array بتلات عناصر.",
            "أول عنصر: العد في zsh بيبدأ من 1.",
            "[[-1]] آخر عنصر.",
            "[[$#]] قبل اسم الـ array: عدد العناصر.",
            "نص فيه فواصل.",
            "[[(s:,:)]] قسّمه عند الفاصلة لـ array.",
            "اطبع العدد (3) والعنصر التاني (b).",
            "نص فيه مسافة.",
            "[[(U)]] كابيتال، و [[(C)]] أول حرف من كل كلمة.",
            "[[(j:-:)]] لزّق العناصر بشرطة بينهم.",
            "لفة واحدة بس: zsh مش بيقسّم المتغير على المسافات."
          ],
          sol: R`جربت المثال في zsh 5.9 وطبع بالترتيب: [[apple]] و [[cherry]] و [[3]] و [[3 b]] و [[SARA ALI / Sara Ali]] و [[apple-banana-cherry]] و [[[sara ali]]] في سطر واحد. نفس الـ array في bash: [[echo "$__{fruits[1]}"]] طبع [[banana]].

حل التجربة: [[dirs=($__{(s.:.)PATH})]] (الفاصل نقطتين، فبنستخدم النقطة كحد بداله)، وبعدين [[print $#dirs $dirs[1]]] بيطبع العدد وأول فولدر، زي [[9 /opt/homebrew/bin]] على ماك فيه brew. zsh كمان عامل array جاهزة اسمها [[$path]] (سمول) مربوطة بـ PATH، فـ [[print $#path]] بيدّيك نفس العدد.`,
          solCode: R`dirs=($__{(s.:.)PATH})
print $#dirs $dirs[1]
print $#path`
        },
        {
          cmd: "*(.om[1,5])",
          title: "glob qualifiers: فلترة وترتيب من غير find",
          desc: R`الـ glob qualifier شرط بين قوسين لازق في آخر الـ pattern، بيفلتر ويرتّب الملفات اللي طابقت. ده شغل [[find]] و [[ls -t]] و [[head]] في حتة واحدة، وده في zsh بس. [[(.)]] ملفات عادية بس، و [[(/)]] فولدرات بس.

[[o]] معناها رتّب، والحرف اللي بعدها بإيه: [[om]] بوقت التعديل والأحدث الأول، و [[on]] بالاسم، و [[oL]] بالحجم والأصغر الأول ([[O]] الكابيتال بتعكس الترتيب). [[[1,5]]] بعدها معناها خد من الأول للخامس بس. فـ [[*(.om[1,5])]] هي آخر 5 ملفات اتعدلت.

[[L]] للحجم: [[Lm+10]] أكبر من 10 ميجا ([[k]] كيلو، و [[+]] أكبر، و [[-]] أصغر). [[m]] لوقت التعديل: [[mw+4]] اتعدل من أكتر من 4 أسابيع، و [[md+14]] من أكتر من 14 يوم، و [[md-1]] خلال آخر يوم. [[N]] متطلعش error لو مفيش نتيجة. وبتجمعهم في قوس واحد زي [[(N.md+14)]].

جرّب دايمًا بـ [[print -l]] (بتطبع كل اسم في سطر) قبل ما تحط نفس الـ pattern مع [[rm]] أو [[mv]].`,
          example: R`print -l *(.)
print -l *(/)
print -l *(.om[1,5])
print -l *(.Lm+10)
print -l ~/Downloads/*(.mw+4)
print -l ~/Desktop/Screenshot*(N.md+14)`,
          try: R`في lab اعمل [[touch new.txt]] و [[touch -t 202601010900 old.txt]] (الـ -t بتدّيه تاريخ قديم)، واطبع اللي اتعدل من أكتر من أسبوع بس.`,
          deep: {
            why: "مهام زي «اللي أقدم من أسبوعين» أو «آخر 5 ملفات» أو «الملفات التقيلة» بتبقى سطر قصير ومقروء بدل find بفلاجات كتير.",
            how: R`الأنواع: [[.]] ملف، و [[/]] فولدر، و [[@]] symlink، و [[*]] ملف تنفيذي. الترتيب: [[om]] تعديل، و [[oL]] حجم، و [[on]] اسم. الوقت: [[m]] تعديل و [[a]] آخر فتح، ووحداته [[h]] ساعات و [[d]] أيام و [[w]] أسابيع و [[M]] شهور.

المقابل بـ find: [[*(.mw+4)]] قريب من [[find . -maxdepth 1 -type f -mtime +28]]. ومع [[**/]] بيدخل الفولدرات: [[**/*(.Lm+100)]] أي ملف أكبر من 100 ميجا في أي مكان تحت.

الـ qualifier بيشتغل مع أي أمر مش print بس: [[ls -lh *(.om[1,3])]] أو [[open *(.om[1])]] بتفتح آخر ملف اتعدل.`,
            when: "تنظيف Downloads و Desktop، وإيجاد الملفات التقيلة، وفتح آخر ملف اتعدل.",
            mistakes: R`تنسى النقطة فـ [[*(mw+4)]] تمسك فولدرات قديمة كمان، ومع [[rm -r]] دي كارثة. أو تنسى [[N]] جوه سكربت فيقع أول ما الفولدر يبقى فاضي. والقوس لازم يبقى لازق في الـ pattern من غير مسافة، وفي bash الكلام ده كله مش موجود.`
          },
          lines: [
            "الملفات العادية بس، من غير فولدرات.",
            "الفولدرات بس.",
            "رتّب بالتعديل الأحدث الأول وخد أول 5.",
            "الملفات اللي أكبر من 10 ميجا.",
            "ملفات Downloads اللي آخر تعديل فيها من أكتر من 4 أسابيع.",
            "صور الشاشة اللي على Desktop وأقدم من 14 يوم، و [[N]] عشان ميقعش لو مفيش."
          ],
          sol: R`[[print -l *(.mw+1)]]. جربتها في zsh في فولدر فيه [[new.txt]] و [[old.txt]] (تاريخه يناير)، فطبعت [[old.txt]] بس. ولما عملت فولدر قديم كمان وكتبت [[*(mw+1)]] من غير النقطة، طلع الفولدر معاهم، وده الفرق اللي النقطة بتعمله.

وفي نفس التجربة [[*(.om[1,3])]] على فولدر فيه ملفات عمرها من يوم لـ 7 أيام طلع الأحدث الأول بالترتيب، و [[*(.Lm+10)]] طلع ملف الـ 12 ميجا لوحده. ولو مفيش ملف قديم خالص، من غير [[N]] بيطلع [[zsh: no matches found]].`,
          solCode: R`touch new.txt
touch -t 202601010900 old.txt
print -l *(.mw+1)`
        },
        {
          cmd: "setopt err_exit",
          title: "سكربت zsh آمن: emulate و err_exit",
          desc: R`سكربت من غير حماية بيكمّل عادي بعد ما أمر يفشل، فممكن يكتب أو يمسح في مكان غلط وانت مش واخد بالك. أول سطرين هنا هما «حزام الأمان» لأي سكربت zsh. [[emulate -L zsh]] بترجّع كل إعدادات zsh للوضع الافتراضي، فأي [[setopt]] غريب في إعدادات اليوزر ميغيّرش سلوك السكربت (و [[-L]] جوه function بتخلي التغيير محلي ويرجع لما تخلص).

[[setopt]] بتشغّل options: [[err_exit]] وقّف السكربت أول ما أمر يفشل (زي [[set -e]] في bash)، و [[no_unset]] اعتبر استخدام متغير مش متعرّف غلطة بدل ما يبقى فاضي بهدوء (زي [[set -u]])، و [[pipe_fail]] لو أي أمر في pipe فشل اعتبر الـ pipe كله فشل.

[[$__{1:?usage...}]] لو مفيش argument اطبع الرسالة دي واخرج. [[print -u2]] بتطبع على الـ stderr (مكان الأخطاء). و [[:t]] و [[:h]] اسمهم modifiers: [[:t]] آخر جزء في المسار (اسم الفولدر)، و [[:h]] كل اللي قبله. وفي [[tar -czf]]: [[c]] اعمل أرشيف، و [[z]] اضغطه gzip، و [[f]] اسم الملف، و [[-C]] ادخل الفولدر ده الأول عشان المسارات جوه الأرشيف تبقى قصيرة.`,
          example: R`#!/usr/bin/env zsh
emulate -L zsh
setopt err_exit no_unset pipe_fail
src=$__{1:?usage: backup.zsh <folder>}
[[ -d $src ]] || { print -u2 "not a folder: $src"; exit 1; }
out=~/backups/$__{src:t}-$(date +%F).tar.gz
mkdir -p ~/backups
tar -czf $out -C $__{src:h} $__{src:t}
print "saved $out ($(du -h $out | cut -f1))"`,
          try: R`احفظه باسم backup.zsh وشغّله من غير argument، وبعدين بفولدر مش موجود، وبعدين بـ [[~/lab]]، وبعد كل مرة اطبع [[echo $?]].`,
          flag: "script",
          deep: {
            why: "سكربت باك أب أو تنظيف لو كمّل بعد غلطة ممكن يعمل ضرر حقيقي: يمسح من فولدر غلط، أو يكتب أرشيف فاضي وانت فاكره سليم.",
            how: R`من غير [[err_exit]]: [[zsh -c 'false; echo still-running']] بتطبع [[still-running]]. معاها السكربت بيقف عند [[false]] بـ exit code 1. ومن غير [[no_unset]] غلطة إملائية زي [[$scr]] بدل [[$src]] بتبقى نص فاضي بهدوء، ومعاها بيطلع [[scr: parameter not set]] ويقف.

سطر [[-d]] بيتأكد إن المسار فولدر موجود، و [[||]] معناها «لو اللي قبلي فشل نفّذ اللي بعدي». و zsh مش بيقسّم المتغيرات على المسافات، فـ [[$out]] من غير علامات تنصيص آمنة هنا حتى لو المسار فيه مسافة؛ في bash لازم [["$out"]].

err_exit مش بيمسك كل حاجة: أمر جوه شرط [[if]] أو قبل [[||]] أو [[&&]] فشله مش بيوقف السكربت، لأن الشيل فاهم إنك بتتعامل معاه بنفسك.`,
            when: "أي سكربت بيمسح أو ينقل أو يكتب ملفات، أو هيشتغل لوحده في ميعاد من غير ما حد يتفرج عليه.",
            mistakes: R`تعتمد على err_exit وتنسى تتأكد من المدخلات بنفسك، زي إن المسار فولدر موجود فعلًا. أو تكتب [[set -e]] في سطر و [[setopt]] في سطر وتلخبط نفسك: zsh بيفهم الاتنين، بس اختار طريقة واحدة. وخد بالك إن [[:t]] و [[:h]] مش موجودين في bash، هناك [[basename]] و [[dirname]].`
          },
          lines: [
            "رجّع إعدادات zsh للافتراضي، فإعدادات اليوزر متأثرش على السكربت.",
            "وقّف عند أول فشل، وعند أي متغير مش متعرّف، ولو أي جزء من pipe فشل.",
            "خد أول argument، ولو مش موجود اطبع طريقة الاستخدام واخرج.",
            "لو المسار مش فولدر اطبع غلطة على stderr واخرج بـ 1.",
            "اسم الأرشيف: اسم الفولدر ([[:t]]) وتاريخ النهارده.",
            "اعمل فولدر الباك أب لو مش موجود.",
            "اضغط الفولدر: [[-C]] ادخل الفولدر اللي فوقه ([[:h]]) وخد اسمه بس.",
            "اطبع مكان الأرشيف وحجمه."
          ],
          sol: R`جربته في zsh 5.9 على أوبونتو. من غير argument طبع [[./backup.zsh:4: 1: usage: backup.zsh <folder>]] و [[$?]] بقت 1. بفولدر مش موجود ([[nope]]) طبع [[not a folder: nope]] و 1. بفولدر حقيقي طبع زي [[saved /home/sara/backups/api-2026-10-02.tar.gz (4.0K)]] و 0 (عندك المسار هيبقى في الـ home بتاعك وتاريخ يومك). و [[tar -tzf]] على الأرشيف طلّع [[api/]] و [[api/a.txt]]، يعني المسارات جوه قصيرة بفضل [[-C]].

لو مرة نسيت [[err_exit]] وكان [[mkdir]] فشل (مثلًا مفيش صلاحية)، كان tar هيحاول يكتب برضه ويطلع غلطة تانية، وكان آخر سطر هيطبع saved كأن كله تمام.`
        },
        {
          cmd: "report.zsh",
          title: "حاجات zsh بس في السكربت",
          desc: "[[setopt null_glob]] يخلي اللوب يعدّي بهدوء لو مفيش ملفات. [[*(/)]] معناها فولدرات بس، وده glob qualifier خاص بـ zsh. شغّله بـ [[chmod +x report.zsh && ./report.zsh]].",
          example: R`#!/bin/zsh
setopt null_glob

echo "Log files:"
for f in **/*.log; do
  echo "  $f ($(wc -l < "$f") lines)"
done

echo "Project sizes:"
for dir in ~/lab/*(/); do
  echo "  $dir -> $(du -sh "$dir" | cut -f1)"
done`,
          try: "شغّله على lab وبعدين غيّر المسار لفولدر مشاريعك.",
          flag: "script",
          deep: {
            why: "سكربت zsh حقيقي بيجمع كل حاجة اتعلمتها: glob بأي عمق، وglob qualifiers، و null_glob.",
            how: R`[[#!/bin/zsh]] في الأول (مش bash)، أو [[#!/usr/bin/env zsh]].

zsh بيدعم colors بـ [[%F{color}]] في prompt strings و[[tput]] في الـ output العادي. أو [[echo "\033[0;32m"]] ANSI codes.

[[typeset -a]] في zsh بيعلن array. وzsh arrays بتبدأ من index 1 مش 0 زي bash.

[[zstat]] في zsh (من module zsh/stat) أقوى من stat في bash.

[[$__{array[@]}]] نفس syntax بتاع bash، و[[$__{#array[@]}]] العدد.

الـ error handling في zsh: [[setopt ERR_EXIT]] بدل [[set -e]] في bash.`,
            when: "سكربتات على الماك. أتمتة daily tasks.",
            mistakes: "تكتب سكربت بـ bash syntax كامل وتضيف #!/usr/bin/env zsh. بعض الحاجات مختلفة خصوصًا arrays (index يبدأ من 1 في zsh)."
          },
          lines: [
            "لو pattern ملقاش ملفات، طلّع لستة فاضية بدل error.",
            "عنوان.",
            "لكل ملف log بأي عمق.",
            "اطبع اسمه وعدد سطوره. [[wc -l < file]] بيطبع الرقم بس من غير اسم الملف.",
            "قفلة.",
            "عنوان.",
            "لكل فولدر جوه lab. [[(/)]] في zsh يعني فولدرات بس.",
            "اطبع اسمه وحجمه ([[cut -f1]] ياخد الرقم بس من ناتج du).",
            "قفلة."
          ],
          sol: R`جربته على lab فيه [[api/err.log]] بسطر و [[app/logs/app.log]] بـ 3 سطور، فطبع [[Log files:]] وتحته [[api/err.log (1 lines)]] و [[app/logs/app.log (3 lines)]]، وبعدين [[Project sizes:]] وتحته كل فولدر في [[~/lab]] وحجمه زي [[/…/lab/api -> 8.0K]]. وفي فولدر فاضي من غير lab طبع العنوانين بس من غير أي error، وده شغل [[null_glob]].

عشان تغيّر المسار، بدّل [[~/lab/*(/)]] بفولدر مشاريعك، مثلًا [[~/projects/*(/)]]. خد بالك إن [[**/*.log]] بيدوّر من المكان اللي انت واقف فيه مش من lab، فاعمل cd الأول. ولو شغلته بـ [[bash report.zsh]] هيبوظ عند [[setopt]] و [[*(/)]] لأنهم zsh بس. وعلى الماك [[du -sh]] بيطبع أحجام بشكل زي [[12K]] برضه.`
        },
        {
          cmd: "tidy-downloads.zsh",
          title: "سكربت يرتّب Downloads لوحده",
          desc: R`سكربت حقيقي تستخدمه على الماك: بيلف على كل ملف في Downloads ويحطه في فولدر حسب امتداده (PDF في Docs، والصور في Images، وهكذا)، واللي ملوش نوع معروف يروح Other. لو شغلته بـ [[DRY=1 ./tidy.zsh]] بيطبع اللي هيعمله بس من غير ما ينقل حاجة، ودي أول حاجة تعملها مع أي سكربت بينقل أو بيمسح.

الجديد هنا: [[typeset -A kinds]] بتعمل associative array، يعني جدول كل مفتاح فيه ليه قيمة (الامتداد وقصاده الفولدر)، والقيم بتتكتب أزواج: مفتاح وبعده قيمته. [[$__{(L)f:e}]] بتاخد امتداد الملف ([[:e]]) وتحوّله سمول ([[(L)]]) عشان [[.JPG]] و [[.jpg]] يتعاملوا زي بعض. [[$__{kinds[$ext]:-Other}]] بتدوّر على الامتداد في الجدول، ولو مش موجود تاخد Other. و [[*(.)]] ملفات بس، فالفولدرات اللي السكربت عملها مش بتتنقل.

[[mv -n]] معناها متكتبش فوق ملف موجود بنفس الاسم، و [[--]] بتحمي من أسامي بتبدأ بـ [[-]]. [[$__{1:-$HOME/Downloads}]] معناها الفولدر اللي هتديهوله، ولو مدتهوش حاجة Downloads. وخد بالك إن السكربت ده zsh بس: [[typeset -A]] مش موجودة في bash 3.2 بتاع الماك.`,
          example: R`#!/usr/bin/env zsh
# رتّب الملفات في فولدرات حسب النوع. DRY=1 يوريك من غير ما ينقل
emulate -L zsh
setopt err_exit null_glob
dir=$__{1:-$HOME/Downloads}
[[ -d $dir ]] || { print -u2 "no such folder: $dir"; exit 1; }
typeset -A kinds
kinds=(pdf Docs docx Docs zip Archives dmg Installers png Images jpg Images mp4 Videos)
for f in $dir/*(.); do
  ext=$__{(L)f:e}
  target=$__{kinds[$ext]:-Other}
  if [[ -n $__{DRY:-} ]]; then
    print "would move $__{f:t} -> $target/"
  else
    mkdir -p $dir/$target
    mv -n -- $f $dir/$target/
  fi
done
print "done: $dir"`,
          try: R`جرّبه على فولدر تجربة مش على Downloads: [[mkdir -p ~/lab/dl && cd ~/lab/dl && touch a.pdf b.JPG c.zip README]]، وشغّله بـ DRY=1 الأول وبعدين من غيرها.`,
          flag: "script",
          deep: {
            why: "Downloads بيتملى بسرعة. سكربت تشغّله مرة في الأسبوع (أو launchd يشغّله لوحده، الدرس الجاي) أسرع وأنضف من الترتيب بإيدك.",
            how: R`احفظه في [[~/bin/tidy.zsh]] واعمل [[chmod +x ~/bin/tidy.zsh]]. التجربة: [[DRY=1 ~/bin/tidy.zsh ~/lab/dl]]، وبعدها من غير DRY.

تضيف أنواع بإنك تزوّد أزواج في سطر [[kinds=(...)]]، زي [[mov Videos]] أو [[pkg Installers]]. والسكربت آمن تشغّله كذا مرة: المرة التانية مفيش ملفات في أول الفولدر فمش بيعمل حاجة.

[[$__{DRY:-}]] معناها قيمة DRY ولو مش متعرّفة اعتبرها فاضية، وده مهم لو ضفت [[no_unset]]. و [[-n]] بتسأل «النص ده مش فاضي؟». ولو الفولدر مش موجود، سطر [[-d]] بيطبع غلطة ويخرج بـ 1 بدل ما يقول done كأن كله تمام.`,
            when: "تنظيف Downloads أو Desktop، أو أي ترتيب ملفات حسب نوعها.",
            mistakes: R`تشغّله على Downloads على طول من غير DRY وتكتشف إنه نقل ملفات كنت محتاجها في مكانها. أو تشغّله وانت بتحمّل حاجة، فملف لسه بيتحمل (زي [[.crdownload]] بتاع Chrome) يتنقل لـ Other قبل ما يخلص.`
          },
          lines: [
            "رجّع إعدادات zsh للافتراضي.",
            "وقّف عند أي غلطة، ولو مفيش ملفات اللفة متعملش حاجة بدل error.",
            "الفولدر من أول argument، والافتراضي Downloads.",
            "لو مش فولدر موجود اطبع غلطة واخرج.",
            "اعمل جدول (associative array).",
            "املاه أزواج: الامتداد وبعده اسم الفولدر.",
            "لف على الملفات العادية بس جوه الفولدر.",
            "الامتداد بحروف سمول.",
            "الفولدر من الجدول، ولو الامتداد مش فيه خد Other.",
            "لو DRY متعرّفة ومش فاضية...",
            "...اطبع اللي هيحصل بس ([[:t]] اسم الملف من غير المسار).",
            "غير كده:",
            "اعمل الفولدر لو مش موجود.",
            "انقل الملف، و [[-n]] متكتبش فوق ملف بنفس الاسم.",
            "قفلة الـ if.",
            "قفلة اللفة.",
            "اطبع إنه خلص."
          ],
          sol: R`جربته في zsh 5.9 على فولدر فيه [[a.pdf]] و [[b.JPG]] و [[c.zip]] و [[README]]. مع DRY=1 طبع [[would move a.pdf -> Docs/]] و [[would move b.JPG -> Images/]] و [[would move c.zip -> Archives/]] و [[would move README -> Other/]] (الترتيب عندك ممكن يختلف) وبعدها [[done: /home/sara/lab/dl]]، و [[ls]] أكّد إن مفيش حاجة اتنقلت. من غير DRY الملفات راحت فعلًا: [[Docs/a.pdf]] و [[Images/b.JPG]] و [[Archives/c.zip]] و [[Other/README]].

لاحظ إن [[b.JPG]] راح Images رغم إن الامتداد كابيتال، ده شغل [[(L)]]. وتشغيله تاني على نفس الفولدر طبع done بس، لأن [[*(.)]] مش بتمسك الفولدرات. وبفولدر مش موجود طبع [[no such folder]] وخرج بـ 1.`,
          solCode: R`mkdir -p ~/lab/dl && cd ~/lab/dl
touch a.pdf b.JPG c.zip README
DRY=1 zsh ~/bin/tidy.zsh ~/lab/dl
zsh ~/bin/tidy.zsh ~/lab/dl
find ~/lab/dl -type f`
        },
        {
          cmd: "launchd plist",
          title: "شغّل سكربت في ميعاد على الماك (launchd)",
          desc: R`على الماك اللي بيشغّل حاجات في مواعيد هو launchd، نظام الخدمات بتاع macOS (زي systemd في لينكس). بتوصفله المهمة في ملف plist (نوع XML)، وتحطه في [[~/Library/LaunchAgents]] عشان يشتغل باسمك وانت عامل login.

أهم المفاتيح: [[Label]] اسم فريد للمهمة، والعادة يتكتب بشكل [[com.me.tidy]]. [[ProgramArguments]] الأمر، وكل كلمة فيه في [[<string>]] لوحدها، بمسارات كاملة: launchd مش بيفهم [[~]] ولا بيقرا [[~/.zshrc]]، والـ PATH عنده قصير. [[StartCalendarInterval]] الميعاد: [[Hour]] 9 و [[Minute]] 0 يعني كل يوم 9:00 الصبح، والمفتاح اللي مش موجود معناه «أي قيمة»، فلو شيلت Hour تبقى كل ساعة. وفيه كمان [[Weekday]] (0 يعني الحد) و [[Day]] (يوم الشهر). [[StandardOutPath]] و [[StandardErrorPath]] الملفات اللي الناتج والأخطاء بيتكتبوا فيها، ومن غيرهم مش هتعرف المهمة عملت إيه.

ميزة عن cron: لو الماك كان نايم وقت الميعاد، launchd بيشغّل المهمة أول ما يصحى، أما cron فبيفوّتها. cron لسه موجود على الماك ([[crontab -e]] زي لينكس)، بس Apple بتنصح بـ launchd.`,
          example: R`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.me.tidy</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/zsh</string>
    <string>/Users/sara/bin/tidy.zsh</string>
  </array>
  <key>StartCalendarInterval</key>
  <dict>
    <key>Hour</key>
    <integer>9</integer>
    <key>Minute</key>
    <integer>0</integer>
  </dict>
  <key>StandardOutPath</key>
  <string>/tmp/tidy.log</string>
  <key>StandardErrorPath</key>
  <string>/tmp/tidy.err</string>
</dict>
</plist>`,
          try: R`اعمل الملف في [[~/Library/LaunchAgents/com.me.tidy.plist]] لسكربت tidy بتاعك (غيّر sara لاسم اليوزر بتاعك، [[whoami]] بتقولهولك)، واتأكد إنه سليم بـ [[plutil -lint]].`,
          flag: "script",
          deep: {
            why: "عايز سكربت الترتيب أو الباك أب يشتغل لوحده كل يوم من غير ما تفتكر، وحتى لو الجهاز كان نايم في الميعاد.",
            how: R`الملف لازم يبقى XML سليم، و [[plutil -lint]] بتتأكد منه. اسم الملف بالعادة نفس الـ Label وبعده [[.plist]].

لو عايز كل مدة ثابتة بدل ميعاد: مفتاح [[StartInterval]] وقيمته [[<integer>3600</integer>]] يعني كل ساعة. و [[RunAtLoad]] بقيمة [[<true/>]] بتشغّلها مرة أول ما تتحمّل. ولو عايز أكتر من ميعاد، [[StartCalendarInterval]] تاخد array فيها أكتر من dict.

[[~/Library/LaunchAgents]] مهام بتشتغل باسمك بعد الـ login. [[/Library/LaunchDaemons]] بتشتغل كـ root حتى من غير login، ودي محتاجة sudo ومش محتاجها لسكربتات شخصية. التحميل والتشغيل بـ [[launchctl]] في الدرس الجاي.`,
            when: "سكربت عايزه يشتغل كل يوم أو كل ساعة على الماك. على السيرفر اللينكس استخدم cron أو systemd timer.",
            mistakes: R`تكتب [[~/bin/tidy.zsh]] في ProgramArguments فمش بيشتغل؛ لازم المسار كامل [[/Users/sara/bin/tidy.zsh]]. أو تحط الأمر كله في string واحدة ([[/bin/zsh /Users/sara/bin/tidy.zsh]]) فـ launchd يدوّر على برنامج اسمه كده بالمسافة. ولو السكربت بيلمس Downloads أو Desktop وملف الأخطاء فيه [[Operation not permitted]]، دي حماية الخصوصية في الماك: الحل غالبًا من System Settings ثم Privacy & Security ثم Full Disk Access وتضيف [[/bin/zsh]]، وده إذن واسع لأي سكربت zsh فاعرف انت بتدّي إيه.`
          },
          lines: [
            "سطر بيقول إن الملف XML بترميز UTF-8. بيتنسخ زي ما هو.",
            "نوع الملف: plist بتاع Apple. بيتنسخ زي ما هو برضه.",
            "بداية الـ plist.",
            "قاموس: كل [[key]] وبعده قيمته.",
            "مفتاح الاسم.",
            "الاسم الفريد للمهمة، وبيه هتكلّم launchctl.",
            "مفتاح الأمر اللي هيتشغّل.",
            "لستة: كل كلمة في الأمر عنصر لوحده.",
            "البرنامج نفسه بمساره الكامل.",
            "السكربت بمسار كامل، من غير [[~]].",
            "قفلة اللستة.",
            "مفتاح الميعاد.",
            "قاموس الميعاد: أي مفتاح مش مكتوب معناه «أي قيمة».",
            "الساعة...",
            "...9 الصبح (من 0 لـ 23).",
            "الدقيقة...",
            "...صفر، فالمهمة كل يوم 9:00.",
            "قفلة الميعاد.",
            "مكان الناتج العادي.",
            "اللي السكربت بيطبعه بيتكتب هنا.",
            "مكان الأخطاء.",
            "رسائل الأخطاء هنا، وده أول مكان تبص فيه لو المهمة مشتغلتش.",
            "قفلة القاموس الرئيسي.",
            "آخر الملف."
          ],
          sol: R`[[plutil -lint ~/Library/LaunchAgents/com.me.tidy.plist]] بيطبع المسار وبعده [[OK]] لو الملف سليم. لو نسيت تقفل tag أو كتبت [[<integer>]] بغلطة، بيطبع رسالة فيها رقم السطر اللي فيه المشكلة. (اتأكدت إن الملف ده بالظبط بيتقري كـ plist سليم بـ [[plistlib]] بتاع Python، و plutil نفسه موجود على الماك بس.)

خد بالك إن [[/tmp]] مكان مؤقت والماك بينضّفه لوحده، فلو عايز اللوج يفضل، خليه في [[/Users/sara/Library/Logs/tidy.log]] مثلًا، بمسار كامل برضه.

والمفاتيح نفسها (Label و ProgramArguments و StartCalendarInterval وإن المفتاح الناقص معناه «أي قيمة»، وإن launchd بيشغّل المهمة اللي فاتت أول ما الجهاز يصحى من النوم عكس cron) من صفحة [[man launchd.plist]] بتاعة Apple.`,
          solCode: R`whoami
nano ~/Library/LaunchAgents/com.me.tidy.plist
plutil -lint ~/Library/LaunchAgents/com.me.tidy.plist`
        },
        {
          cmd: "launchctl",
          title: "حمّل المهمة وجرّبها ووقّفها",
          desc: R`ملف الـ plist لوحده مش كفاية، لازم تقول لـ launchd يقراه، و [[launchctl]] هو الأمر اللي بتكلّمه بيه. [[gui/$(id -u)]] اسمه domain: [[id -u]] بتطبع رقم اليوزر بتاعك (غالبًا 501)، و [[$(...)]] بتحط الرقم مكانها، فـ [[gui/501]] معناها «مهام اليوزر ده وهو عامل login».

[[bootstrap]] بتحمّل الملف وتفعّل المهمة، ومن بعدها هتشتغل في ميعادها وبعد كل restart طول ما الملف في LaunchAgents. [[launchctl list]] بتطبع المهام المحمّلة في 3 أعمدة: الـ PID لو شغالة دلوقتي أو [[-]]، وآخر exit code (0 يعني آخر مرة نجحت)، والـ Label. [[kickstart]] بتشغّلها حالًا عشان تجرّب من غير ما تستنى الميعاد. و [[bootout]] بتشيلها من launchd، ولازم تعملها قبل ما تعدّل الملف، وبعدين bootstrap تاني.

هتلاقي في شروحات قديمة [[launchctl load -w]] و [[unload]]، دي الطريقة القديمة ولسه شغالة، بس bootstrap و bootout هما الحاليين.`,
          example: R`plutil -lint ~/Library/LaunchAgents/com.me.tidy.plist
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.me.tidy.plist
launchctl list | grep com.me
launchctl kickstart gui/$(id -u)/com.me.tidy
cat /tmp/tidy.log /tmp/tidy.err
launchctl bootout gui/$(id -u)/com.me.tidy`,
          try: "حمّل مهمة tidy، شغّلها بـ kickstart، واقرا اللوج، وبعدين شيلها بـ bootout.",
          deep: {
            why: "من غير launchctl الملف قاعد في الفولدر ومحدش بيقراه لحد الـ login الجاي. وبيه تجرّب المهمة دلوقتي وتعرف نجحت ولا لأ.",
            how: R`[[launchctl print gui/$(id -u)/com.me.tidy]] بيطبع تفاصيل كتير عن المهمة، منها [[state]] و [[last exit code]]، وده أوضح من list لما حاجة متشتغلش.

لو عدّلت الـ plist: [[bootout]] الأول وبعدين [[bootstrap]] تاني، لأن launchd قرا النسخة القديمة وشايلها.

البديل cron على الماك: [[crontab -e]] وسطر زي [[0 9 * * * /bin/zsh /Users/sara/bin/tidy.zsh]] (شرح الحقول الخمسة في تاب VPS). أبسط في الكتابة، بس بيفوّت الميعاد لو الجهاز نايم، و cron نفسه محتاج Full Disk Access عشان يلمس فولدرات زي Downloads.`,
            when: "بعد ما تكتب أو تعدّل أي plist في LaunchAgents.",
            mistakes: R`تعمل bootstrap لمهمة محمّلة أصلًا فيطلع [[Bootstrap failed: 5: Input/output error]]: اعمل bootout الأول. أو تعدّل الملف من غير bootout وتستغرب إن مفيش تغيير. أو تنسى [[/com.me.tidy]] في آخر kickstart و bootout: هما محتاجين اسم المهمة، و bootstrap محتاج مسار الملف.`
          },
          lines: [
            "اتأكد إن الملف سليم قبل ما تحمّله.",
            "حمّل المهمة في مهام اليوزر بتاعك ([[id -u]] رقمك).",
            "اتأكد إنها اتحملت: PID وآخر exit code والاسم.",
            "شغّلها دلوقتي من غير ما تستنى الميعاد.",
            "اقرا الناتج والأخطاء من الملفات اللي حددتها في الـ plist.",
            "شيل المهمة من launchd (الملف نفسه بيفضل مكانه)."
          ],
          sol: R`ده على الماك بس، مجربتوش هنا. الأوامر وشكلها من صفحة [[man launchctl]] بتاعة Apple (وهي بتحط [[list]] و [[load]] و [[unload]] تحت «LEGACY SUBCOMMANDS»: لسه شغالين، بس bootstrap و bootout و kickstart و print هما الحاليين). المتوقع: [[bootstrap]] مش بيطبع حاجة لو نجح. [[launchctl list | grep com.me]] بيطبع سطر فيه [[-]] (مش شغالة دلوقتي) وبعده [[0]] بعد ما تشتغل مرة بنجاح وبعدهم [[com.me.tidy]]. بعد [[kickstart]] بثانية، [[/tmp/tidy.log]] هيبقى فيه ناتج السكربت زي [[done: /Users/sara/Downloads]].

لو الرقم التاني في list مش 0، بص في [[/tmp/tidy.err]]: [[Operation not permitted]] يبقى إذن الخصوصية (درس الـ plist)، و [[no such file]] يبقى مسار غلط في ProgramArguments. ولو bootstrap قال [[Input/output error]] يبقى المهمة محمّلة قبل كده، اعمل bootout الأول.`
        }
      ]
    }
]);
