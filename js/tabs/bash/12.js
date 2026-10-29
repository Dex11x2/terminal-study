// تكملة تاب bash: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/bash/01.js (شرح حقول الدرس في أوله)
MORE("bash", [
    {
      t: "البيئة والسرعة",
      l: 2,
      n: "اختصارات هتوفر عليك ساعات",
      projects: [
        { lvl: 'صغير', t: R`ملف اختصاراتي`, what: R`[[~/.bash_aliases]] فيه ١٠ aliases من أكتر أوامرك (من التمرين بتاع [[history]])، و ٣ فانكشنز: [[mkcd]]، و [[up N]] (تطلع N فولدرات لفوق)، و [[bak FILE]] (تعمل نسخة [[FILE.bak-DATE]]). من درسي «alias و .bashrc» و «history».`, done: R`[[bash -n ~/.bash_aliases]] ساكت. في ترمنال جديد [[type up]] بيقول function، و [[up 2]] من [[~/lab/a/b]] بيوديك [[~/lab]]، و [[bak notes.txt]] بيعمل نسخة جنبه.` },
        { lvl: 'صغير', t: R`أكتر أوامرك`, what: R`[[topcmds.sh N]] بيقرا [[~/.bash_history]] (من غير سطور [[#]] اللي فيها الوقت)، ويشيل [[sudo]] من أول الأمر، ويطبع أكتر N أوامر وعددهم ونسبتهم. من درس «history».`, done: R`[[./topcmds.sh 5]] بيطبع ٥ سطور، و [[sudo apt]] بتتعد [[apt]]. والنسب مجموعها مش أكتر من ١٠٠. و [[./topcmds.sh]] من غير رقم بيستخدم ١٠.` },
        { lvl: 'متوسط', t: R`[[loadenv]]: حمّل .env صح`, what: R`فانكشن [[loadenv FILE VAR...]]: بتتجاهل السطور الفاضية والتعليقات، وبتشيل [[\r]] لو الملف جاي من ويندوز، وبتعمل export لكل متغير، وبتطلع بغلط لو أي VAR من اللي طلبتهم مش موجود. من دروس «export و env» و «alias و .bashrc».`, done: R`ملف بنهايات ويندوز ([[printf 'PORT=3000\r\n']]) بعد [[loadenv .env PORT]] [[printf '%s' "$PORT" | od -c]] مفيهوش [[\r]]. و [[loadenv .env DB_URL]] من غير DB_URL بيطبع اسمه ويرجع 1. و [[bash -c 'echo $PORT']] بعدها بيطبع 3000.` },
        { lvl: 'متوسط', t: R`[[cheat]]: ورقة الغش بتاعتك`, what: R`[[cheat CMD]] بيطبع ملاحظاتك انت من [[~/cheats/CMD.md]] لو موجودة، ولو لأ يجرّب [[tldr CMD]]، ولو مش متسطّب يطبع أول ٣٠ سطر من [[CMD --help]]. و [[cheat -e CMD]] بيفتح ملفك في المحرر. من درس «man / --help».`, done: R`أمر ليه ملف عندك بيطبع ملفك. أمر ملوش ملف ولا tldr بيطبع أول ٣٠ سطر من [[--help]]. أمر مش موجود خالص بيقول كده ويخرج 1. و [[-e]] بيعمل الملف لو مش موجود.` },
        { lvl: 'كبير', t: R`dotfiles في repo وسكربت تركيب`, what: R`فولدر [[~/dotfiles]] (git repo) فيه [[bash_aliases]] و [[bashrc.local]] و [[inputrc]]، و [[install.sh]] بـ [[set -euo pipefail]]: لكل ملف، لو فيه ملف حقيقي مكانه ياخد منه نسخة [[.bak-DATE]] وبعدين يعمل symlink، ويضيف سطر [[source ~/.bashrc.local]] لـ [[.bashrc]] **مرة واحدة بس** ([[grep -qxF]])، ويعمل [[bash -n]] على كل ملف قبل ما يربطه، وفيه [[--dry-run]] ولوج. من دروس الوحدة كلها ودروس الملفات والـ [[ln -s]].`, done: R`تشغيل [[install.sh]] مرتين: التانية بتطبع «كله مظبوط» ومبتعملش نسخ احتياطي جديدة، و [[grep -c 'bashrc.local' ~/.bashrc]] بيطبع 1. ملف فيه syntax error بيوقف التركيب قبل ما يغيّر حاجة. [[--dry-run]] مبيغيّرش [[ls -la ~]]. وجرّبه في container جديد ([[docker run --rm -it ubuntu:24.04]] وانسخ الفولدر): ترمنال جديد بيفتح من غير أخطاء والاختصارات شغالة.`, ext: R`زوّد [[uninstall.sh]] بيرجّع النسخ الاحتياطي، أو ملفات خاصة بكل جهاز ([[bashrc.$(hostname)]])، أو GitHub Action بيعمل [[bash -n]] و [[shellcheck]] على كل push.` },
        { lvl: 'فكرة', t: R`مساعد الترمنال`, what: R`حاجة بتراقب الـ history بتاعك وتقترح: أوامر طويلة بتكتبها كتير محتاجة alias، وأوامر بتغلط فيها كتير (زي [[gti]])، وتطبع اقتراح أسبوعي.`, done: R`كل أسبوع بتطلعلك ٣ اقتراحات alias حقيقية من استخدامك، وتقدر تقبل واحد فيتضاف لـ [[~/.bash_aliases]] لوحده.`, ext: R`خلّيه يحسب الوقت اللي وفّرته (عدد الحروف × عدد المرات)، أو يكتشف الأوامر اللي فيها باسوردات في الـ history وينبّهك تمسحها.` },
      ],
      items: [
        {
          cmd: "export و env",
          title: "متغيرات البيئة",
          desc: R`متغيرات البيئة إعدادات بتتبعت لأي برنامج تشغّله: أنهي بورت، وأنهي قاعدة بيانات، و development ولا production. و [[$]] قبل الاسم بتجيب القيمة: [[$HOME]] فولدرك، و [[$PATH]] لستة الفولدرات اللي الشيل بيدوّر فيها على البرامج، مفصولة بـ [[:]].

[[export API_URL=http://localhost:3000]] بيعمل متغير والبرامج اللي هتشغّلها بعده تشوفه (في Node بـ [[process.env.API_URL]])، ومن غير مسافات حوالين [[=]]. ومن غير [[export]] المتغير بيفضل جوه الشيل بس والبرامج متشوفهوش. و [[env]] بيطبع كل متغيرات البيئة، ومع [[| grep NODE]] تدوّر على واحد.

المتغير بيعيش في الترمنال ده بس، ولما تقفله يروح. عشان يبقى دايم حطه في [[~/.bashrc]]، وللمشاريع استخدم ملف [[.env]].`,
          example: R`echo $HOME
echo $PATH
export API_URL=http://localhost:3000
env | grep NODE`,
          try: "اعمل export لمتغير، اطبعه، اقفل الترمنال وافتح تاني ولاحظ إنه راح.",
          practice: [
            { lvl: 'سريع', t: R`الفرق بين متغير عادي ومتغير بيئة: [[X=1; bash -c 'echo "<$X>"']]، وبعدين [[export X=1; bash -c 'echo "<$X>"']].`, done: R`الأولى بتطبع [[<>]] (البرنامج الابن مشافش X)، والتانية بتطبع [[<1>]]. يعني [[export]] هو اللي بيخلّي البرامج اللي بتشغّلها (node و python و docker) تشوف المتغير.` },
            { lvl: 'تطبيق', t: R`متغير لأمر واحد بس من غير ما يفضل في الشل: [[PORT=4000 python3 -c 'import os; print(os.environ["PORT"])']]، وبعدين [[echo "<$PORT>"]].`, done: R`الأول بيطبع 4000، والتاني بيطبع [[<>]]: المتغير وصل للأمر ده بس ومفضلش في الترمنال. ده اللي بتعمله لما تشغّل [[NODE_ENV=production npm start]].` },
            { lvl: 'تحدي', t: R`سكربت [[run.sh]] بيحمّل [[.env]] بـ [[set -a; . ./.env; set +a]]، وبيتأكد إن المتغيرات المهمة موجودة بسطر زي [[: "$__{DB_URL:?missing}"]] قبل ما يكمّل، وبعدين يطبع [[env | grep -E '^(DB_URL|PORT)=']].`, done: R`من غير [[DB_URL]] في الملف، [[bash run.sh]] بيقف عند السطر ده برسالة فيها [[DB_URL: missing]] و [[echo $?]] = 1 ومبيطبعش حاجة بعدها. ومع [[DB_URL]] بيكمّل والـ grep بيطلّع السطرين، يعني المتغيرات بقت export للبرامج اللي السكربت هيشغّلها.` },
          ],
          deep: {
            why: "البرامج محتاجة إعدادات: أنهي قاعدة بيانات تتصل بيها، وأنهي بورت، وشغالة development ولا production. متغيرات البيئة هي الطريقة اللي بتدّي بيها الإعدادات دي من غير ما تكتبها جوه الكود.",
            how: R`فيه نوعين متغيرات في الشيل، والفرق بينهم مهم.

لو كتبت [[NAME=Ali]] بس، المتغير بيبقى موجود جوه الشيل ده بس. أي برنامج تشغّله مش هيشوفه.

[[export NAME=Ali]] بيخليه «متغير بيئة»: كل برنامج تشغّله بعد كده بياخد نسخة منه. عشان كده لما تعمل [[export DATABASE_URL=...]] وتشغّل node، الكود يقدر يقراه بـ [[process.env.DATABASE_URL]].

وكلمة «نسخة» مهمة: البرنامج بياخد نسخة، فلو غيّرها جواه مش بتتغير عندك (نفس فكرة [[cd]] جوه السكربت).

والمتغيرات دي بتتمسح لما تقفل الترمنال. عشان تبقى دايمة، تحطها في [[~/.bashrc]].

وممكن تدّي متغير لأمر واحد بس: [[NODE_ENV=production node app.js]].`,
            when: "تجربة مشروع بإعدادات مختلفة. معرفة إعداد معين موجود ولا لأ: [[env | grep NODE]]. وفي Docker والسيرفرات كل الإعدادات بتتحط كمتغيرات بيئة.",
            mistakes: "مسافات حوالين [[=]]: [[export NAME = Ali]] غلط. ونسيان [[export]]، فالبرنامج مش شايف المتغير. وكتابة مفاتيح API حقيقية في الترمنال، لأنها بتتحفظ في الـ history، والأسلم تحطها في ملف .env."
          },
          teach: R`## متغيرات البيئة: إعدادات بتتبعت لكل برنامج تشغّله

كل الأوامر اتشغّلت على أوبونتو 24.04 جوه Docker كيوزر [[ali]]، ومعاها Node عشان نشوف البرنامج شايف إيه.

---

## ١. [[echo $HOME]]

[[$]] قبل اسم المتغير معناها «حط قيمته هنا». الشيل بيبدّل [[$HOME]] قبل ما [[echo]] يشتغل، فـ echo بيستلم المسار جاهز:

~~~text الناتج
/home/ali
~~~

---

## ٢. [[echo $PATH]]

~~~text الناتج
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
~~~

لستة فولدرات مفصولة بـ [[:]]. لما تكتب [[ls]]، الشيل بيدوّر على ملف اسمه ls في الأول، وبعدين التاني، وهكذا، وأول واحد يلاقيه يشغّله ([[/usr/bin/ls]]). عشان كده برنامج متسطب في فولدر مش في الـ PATH بيطلّع [[command not found]].

---

## ٣. [[export API_URL=http://localhost:3000]]

حتتين:

| الحتة | معناها |
|---|---|
| [[API_URL=http://localhost:3000]] | اعمل متغير اسمه API_URL. **من غير مسافات** حوالين [[=]] |
| [[export]] | وابعته لأي برنامج هشغّله بعد كده |

جربنا Node يقراه:

~~~bash
node -e 'console.log(process.env.API_URL)'
~~~

~~~text الناتج
http://localhost:3000
~~~

[[-e]] بيشغّل الكود اللي بعده، و [[process.env]] هو متغيرات البيئة جوه Node.

### من غير [[export]]

~~~bash
NAME=Ali
node -e 'console.log(process.env.NAME)'
~~~

~~~text الناتج
undefined
~~~

المتغير موجود في الشيل ([[echo $NAME]] يطبع Ali)، بس البرنامج الجديد مشافهوش. ونفس الكلام مع bash جديد: [[bash -c 'echo "child sees: [$NAME]"']] طبع [[child sees: []]]. ولما عملنا [[export NAME]] (من غير قيمة: «صدّر الموجود») وكررنا، طبع [[child sees: [Ali]]].

### لأمر واحد بس

~~~bash
NODE_ENV=production node -e 'console.log(process.env.NODE_ENV)'
echo "after: [$NODE_ENV]"
~~~

~~~text الناتج
production
after: []
~~~

[[VAR=قيمة أمر]] في نفس السطر: الأمر ده بس يشوفه، والشيل نفسه لأ.

### المسافات

~~~text export API_URL = http://x
-bash: export: $__bt=': not a valid identifier
-bash: export: $__bthttp://x': not a valid identifier
~~~

الشيل قسم السطر عند المسافات لـ ٣ كلمات، وفهم كل واحدة اسم متغير، و [[=]] مش اسم ينفع.

---

## ٤. [[env | grep NODE]]

[[env]] من غير حاجة بيطبع كل متغيرات البيئة، سطر لكل واحد [[اسم=قيمة]]:

~~~text env | head -5
SHELL=/bin/bash
API_URL=http://localhost:3000
NODE_OPTIONS=--max-old-space-size=512
NAME=Ali
PWD=/home/ali
~~~

و [[| grep NODE]] يسيب السطور اللي فيها NODE:

~~~text الناتج
NODE_OPTIONS=--max-old-space-size=512
~~~

(كنا عاملين [[export NODE_OPTIONS=...]] قبلها. [[NODE_ENV]] مش ظاهر لأنه كان لأمر واحد بس.)

---

## بيعيش فين؟

فتحنا شيل جديد بـ [[bash -c]] من نفس الترمنال: شاف [[API_URL]]، لأنه ابن الشيل ده. بس ترمنال جديد خالص (شباك تاني) بيبدأ من الصفر، ومش هيلاقيه. عشان يبقى دايم: سطر [[export]] في [[~/.bashrc]].

| النظام | اقرا | اعمل للجلسة دي |
|---|---|---|
| bash (لينكس، Git Bash) | [[echo $HOME]] | [[export X=1]] |
| zsh (الماك) | [[echo $HOME]] | [[export X=1]]، ودايم في [[~/.zshrc]] |
| PowerShell | [[$env:USERPROFILE]] | [[$env:X = "1"]] |
| CMD | [[echo %USERPROFILE%]] | [[set X=1]] |

## الخلاصة

[[export NAME=value]] من غير مسافات، والبرامج اللي بتشغّلها بعدها بتشوفه. [[env]] يعرض الكل. والترمنال يتقفل، المتغير يروح.`,
          lines: [
            R`[[$HOME]] متغير الشيل بيحط فيه مسار فولدرك (زي [[/home/ali]])، و [[echo]] بيطبعه. الـ [[$]] قبل الاسم معناها «حط قيمة المتغير هنا»، ومن غيرها هيطبع كلمة HOME نفسها.`,
            "اطبع الفولدرات اللي الشيل بيدوّر فيها على البرامج.",
            R`[[export]] بيعمل المتغير ويعلّمه إنه يتبعت لأي برنامج يتشغّل من الترمنال ده (زي node). من غير [[export]] المتغير بيفضل جوه الشيل بس والبرامج مش هتشوفه. وبيروح أول ما تقفل الترمنال.`,
            "اعرض كل المتغيرات، وسيب اللي فيها NODE."
          ],
          sol: R`بعد [[export API_URL=http://localhost:3000]]، [[echo $API_URL]] بيطبع [[http://localhost:3000]]. اقفل وافتح ترمنال جديد، [[echo $API_URL]] هيطبع سطر فاضي. المتغير كان عايش في ذاكرة الشيل ده والبرامج اللي بيشغّلها بس، ومتسجلش في أي ملف.

عشان يفضل موجود: حطه في [[~/.bashrc]] (أو [[~/.zshrc]] على الماك)، وللمشاريع استخدم [[.env]]. والغلطة الشائعة [[export API_URL = http://...]] بمسافات، ودي بتطلّع [[not a valid identifier]].`
        },
        {
          cmd: "alias و .bashrc",
          title: "اختصاراتك الشخصية",
          desc: R`[[alias]] بيعمل اسم قصير لأمر طويل: [[alias ll='ls -lah']] معناها لما تكتب [[ll]] الشيل يحط مكانها [[ls -lah]]. من غير مسافات حوالين [[=]]، والأمر بين single quotes.

بس الـ alias بيضيع لما تقفل الترمنال. [[~/.bashrc]] ملف bash بيتنفذ أوتوماتيك مع كل ترمنال جديد، فأي alias تحطه فيه يفضل موجود. و [[echo "..." >> ~/.bashrc]] بيضيف السطر في آخره ([[>>]] مش [[>]]، وإلا هتمسح الملف كله!).

وبعد التعديل [[source ~/.bashrc]] بينفّذ الملف في الترمنال الحالي، فالتعديل يشتغل من غير ما تقفل وتفتح. والـ aliases للترمنال بتاعك بس، مش بتشتغل جوه السكربتات.`,
          example: R`alias ll='ls -lah'
alias gs='git status'
echo "alias ll='ls -lah'" >> ~/.bashrc
source ~/.bashrc`,
          try: "اعمل alias اسمه dc لـ [[docker compose]] وحطه في .bashrc.",
          practice: [
            { lvl: 'سريع', t: R`[[alias ll='ls -lah']]، وبعدين [[type ll]]، وبعدين [[unalias ll]] و [[type ll]] تاني.`, done: R`الأولى بتطبع [[ll is aliased to]] وبعدها [[ls -lah]] بين علامتين. بعد [[unalias]] بتطبع [[type: ll: not found]]. و [[type]] ده اللي تستخدمه لما أمر يعمل حاجة غريبة وعايز تعرف هو alias ولا برنامج.` },
            { lvl: 'تطبيق', t: R`الـ alias مبياخدش arguments في النص، فاعمل فانكشن: [[mkcd() { mkdir -p "$1" && cd "$1"; }]] في [[~/.bashrc]]، و [[source ~/.bashrc]]، وجرّبها.`, done: R`[[mkcd ~/lab/a/b]] بيعمل الفولدرين ويدخلك جوه، و [[pwd]] بيطبع المسار ده. و [[type mkcd]] أول سطر فيه [[mkcd is a function]] وتحته الكود.` },
            { lvl: 'تحدي', t: R`نظّم اختصاراتك في [[~/.bash_aliases]] بدل ما تحطها في [[.bashrc]] نفسه: ٥ aliases وفانكشن [[mkcd]]. واتأكد إن الملف بيتحمّل، وجرّب تعدّي الـ alias وتشغّل الأمر الأصلي.`, done: R`[[grep -n bash_aliases ~/.bashrc]] بيلاقي سطر [[if [ -f ~/.bash_aliases ]; then]] (موجود في .bashrc الافتراضي في أوبونتو). [[bash -n ~/.bash_aliases]] مبيطبعش حاجة. في ترمنال جديد [[alias]] فيه اختصاراتك، و [[\ls]] أو [[command ls]] بيشغّل [[ls]] الأصلي من غير الـ alias.` },
          ],
          mac: ["diff", "على الماك الملف اسمه [[~/.zshrc]]."],
          deep: {
            why: "فيه أوامر طويلة بتكتبها عشرين مرة في اليوم. alias بيخليك تكتبها بكلمتين.",
            how: R`[[alias ll='ls -lah']] معناها: لما تكتب [[ll]] كأول كلمة في الأمر، الشيل يحط مكانها [[ls -lah]] قبل ما ينفّذ. مجرد استبدال نص.

بس الـ alias بيضيع لما تقفل الترمنال. عشان كده فيه [[~/.bashrc]]: ملف سكربت bash بيشغّله أوتوماتيك كل ما تفتح ترمنال جديد. أي alias أو export تحطه فيه، هيبقى موجود كل مرة.

وبعد ما تعدّل [[.bashrc]]، التعديل مش هيتطبق على الترمنال المفتوح. [[source ~/.bashrc]] بينفّذ الملف جوه الشيل الحالي نفسه. ليه مش [[bash ~/.bashrc]]؟ لأن ده بيشغّل شيل جديد، ينفّذ الملف جواه ويقفل، فالتعديلات تروح معاه، ونفس فكرة [[cd]] جوه السكربت.`,
            when: "اختصارات لأوامر git و docker. [[alias dc='docker compose']] و [[alias gs='git status']] من أشهرهم.",
            mistakes: "تعدّل [[.bashrc]] وتنسى [[source]] وتستغرب إنه مش شغال. وتعمل alias باسم أمر موجود فتخفيه. والـ aliases مش بتشتغل جوه السكربتات، فمتستخدمهاش فيها."
          },
          teach: R`## [[alias]] اسم قصير لأمر طويل، و [[~/.bashrc]] بيخليه دايم

اتشغّل على أوبونتو 24.04 جوه Docker في bash تفاعلي كيوزر [[ali]]، جوه فولدر فيه git repo فاضي.

---

## ١. [[alias ll='ls -lah']]

| الحتة | معناها |
|---|---|
| [[alias]] | الأمر |
| [[ll]] | الاسم الجديد |
| [[=]] | من غير مسافات حواليها (زي المتغيرات) |
| [['ls -lah']] | اللي هيتكتب مكانه. single quotes عشان المسافة اللي جواه |

ميطبعش حاجة. [[type]] بيقولك [[ll]] بقى إيه:

~~~text type ll
ll is aliased to $__btls -lah'
~~~

ولما كتبنا [[ll]]:

~~~text الناتج
total 12K
drwxrwxr-x 3 ali ali 4.0K Oct  6 08:45 .
drwxr-x--- 3 ali ali 4.0K Oct  6 08:45 ..
drwxrwxr-x 7 ali ali 4.0K Oct  6 08:45 .git
~~~

ده ناتج [[ls -lah]]: [[-l]] تفاصيل، و [[-a]] حتى المخفي، و [[-h]] أحجام مقروءة. bash شاف إن أول كلمة [[ll]]، بدّلها بالنص، ونفّذ.

---

## ٢. [[alias gs='git status']]

نفس الفكرة:

~~~text gs
On branch master

No commits yet

nothing to commit (create/copy files and use "git add" to track)
~~~

---

## ٣. [[echo "alias ll='ls -lah'" >> ~/.bashrc]]

| الحتة | معناها |
|---|---|
| [[echo "..."]] | اطبع السطر ده. الـ double quotes بره عشان الـ single quotes اللي جوه تتطبع زي ما هي |
| [[>>]] | بدل الشاشة، زوّده في **آخر** الملف |
| [[~/.bashrc]] | الملف اللي bash بيشغّله مع كل ترمنال جديد |

~~~text tail -1 ~/.bashrc
alias ll='ls -lah'
~~~

[[>]] واحدة كانت هتمسح الملف كله وتحط السطر ده بس.

---

## ٤. [[source ~/.bashrc]]

عشان نتأكد إنه بيشتغل من الملف، شلنا الـ alias الأول بـ [[unalias ll]]:

~~~text type ll
bash: type: ll: not found
~~~

وبعد [[source ~/.bashrc]]:

~~~text type ll
ll is aliased to $__btls -lah'
~~~

[[source]] بينفّذ الملف جوه الشيل الحالي نفسه، فكل alias فيه بيتعرّف هنا. ([[bash ~/.bashrc]] كان هيشغّل شيل تاني ويقفل، والـ aliases تروح معاه.)

---

## [[alias]] لوحده

بيعرض كل الـ aliases. على أوبونتو لقينا جاهزين من الأول:

~~~text alias (مختصر)
alias grep='grep --color=auto'
alias gs='git status'
alias l='ls -CF'
alias la='ls -A'
alias ll='ls -lah'
alias ls='ls --color=auto'
~~~

يعني [[.bashrc]] بتاع أوبونتو فيه أصلًا [[alias ll='ls -alF']]، والسطر بتاعنا في الآخر غطّى عليه لأنه اتقري بعده. وعشان كده [[ls]] بيطلع ملوّن من غير ما تكتب حاجة (درس «LS_COLORS و --color»).

---

| النظام | اعمل alias | يفضل دايم في |
|---|---|---|
| bash (لينكس، Git Bash) | [[alias ll='ls -lah']] | [[~/.bashrc]] |
| zsh (الماك) | نفس الشكل | [[~/.zshrc]] (من الـ docs) |
| PowerShell | [[Set-Alias]] لأمر واحد من غير flags، أو [[function ll { ls -Force }]] | الملف اللي في [[$PROFILE]] |

## الخلاصة

[[alias اسم='أمر']]، و [[>>]] للـ [[.bashrc]]، و [[source]] عشان يشتغل دلوقتي. و [[type اسم]] يقولك هو alias ولا أمر حقيقي.`,
          lines: [
            "اعمل اختصار: لما تكتب ll يتنفذ ls -lah.",
            "اختصار gs لـ git status.",
            "احفظ الاختصار في آخر ملف .bashrc عشان يفضل موجود كل مرة.",
            "اقرا .bashrc تاني دلوقتي عشان الاختصار يشتغل من غير ما تقفل الترمنال."
          ],
          sol: R`[[echo "alias dc='docker compose'" >> ~/.bashrc]] وبعدين [[source ~/.bashrc]]. اتأكد بـ [[type dc]]، هيطبع [[dc is aliased to ...docker compose...]]، وجرّب [[dc version]] هيطبع نسخة Docker Compose اللي عندك.

لو [[dc: command not found]] في ترمنال جديد، يبقى كتبت في ملف الشيل الغلط: على الماك zsh بيقرا [[~/.zshrc]] مش [[.bashrc]]. وخلي بالك إن [[dc]] اسم حاسبة قديمة في بعض التوزيعات، والـ alias بيغطي عليها في الترمنال بتاعك، ومفيش مشكلة.`
        },
        {
          cmd: "history",
          title: "الأوامر اللي فاتت",
          desc: R`bash بيحفظ كل أمر بتكتبه، و [[history]] بيعرضهم برقم جنب كل واحد، فـ [[history | tail -20]] آخر ٢٠. [[!!]] بتتبدّل بآخر أمر، و [[!42]] بالأمر رقم 42 في اللستة.

أهم اختصار هنا Ctrl+R: ابدأ اكتب أي جزء من أمر قديم، فيجيبلك آخر أمر فيه الكلام ده؛ Ctrl+R تاني للي قبله، و Enter ينفّذ. والسهم لفوق بيجيب الأوامر اللي فاتت واحد واحد، و Tab بيكمّل أسامي الأوامر والملفات (اضغطه مرتين يوريك الاحتمالات).

واختصارات تحريك السطر: Ctrl+A أول السطر، و Ctrl+E آخره، و Ctrl+W تمسح الكلمة اللي قبل المؤشر، و Ctrl+L تمسح الشاشة. ومتكتبش باسوردات جوه الأوامر، لأنها بتتحفظ في [[~/.bash_history]].`,
          example: R`history | tail -20
!!
!42`,
          try: "اضغط Ctrl+R واكتب [[mkdir]]، هيجيبلك آخر mkdir كتبته. اضغط Ctrl+R تاني للي قبله.",
          practice: [
            { lvl: 'سريع', t: R`[[cat /etc/shadow]] (هيقول Permission denied)، وبعدين [[sudo !!]].`, done: R`bash بيطبع الأمر كامل [[sudo cat /etc/shadow]] قبل ما ينفّذه (عشان تشوف إيه اللي هيتشغّل)، والمرة دي بيشتغل بعد الباسورد. و [[history | tail -2]] فيه الأمر الكامل مش [[!!]].` },
            { lvl: 'تطبيق', t: R`أكتر ١٠ أوامر بتستخدمها: [[history | awk '{print $2}' | sort | uniq -c | sort -rn | head]].`, done: R`١٠ سطور، كل سطر رقم واسم أمر، مترتبين من الأكتر للأقل. ودول أول ناس تعملهم alias. (لو عندك [[HISTTIMEFORMAT]] الخانة التانية هتبقى التاريخ، فاستخدم [[$4]] بدل [[$2]].)` },
            { lvl: 'تحدي', t: R`ظبّط الـ history في [[~/.bashrc]]: [[HISTCONTROL=ignoreboth]] و [[HISTSIZE=10000]] و [[HISTTIMEFORMAT='%F %T ']] و [[shopt -s histappend]] و [[PROMPT_COMMAND='history -a']]. وافتح ترمنالين.`, done: R`[[history | tail -3]] كل سطر فيه تاريخ ووقت قبل الأمر. أمر بادئ بمسافة (زي [[ echo secret]]) مبيظهرش في [[history]] خالص. وأمر كتبته في ترمنال بيظهر في [[tail -2 ~/.bash_history]] على طول من غير ما تقفل (وقبله سطر [[#]] ورقم، وده الوقت).` },
          ],
          mac: ["diff", "في zsh [[history]] بتعرض آخر 16 بس، اكتب [[history 1]] عشان الكل."],
          deep: {
            why: "عشان متكتبش أوامر طويلة تاني، وعشان تفتكر كتبت إيه امبارح لما حاجة اشتغلت وعايز تكررها.",
            how: R`bash بيحفظ كل أمر بتكتبه في الذاكرة، ولما تقفل الترمنال بيكتبهم في ملف اسمه [[~/.bash_history]]، فيفضلوا موجودين المرة الجاية. و [[history]] بيعرضهم برقم جنب كل واحد.

و [[!!]] و [[!42]] الشيل بيبدّلهم قبل ما ينفّذ: [[!!]] بتبقى آخر أمر، و [[!42]] الأمر رقم 42.

وأقوى طريقة في الحقيقة Ctrl+R: بتبدأ تكتب أي جزء من الأمر، وهو بيجيبلك آخر أمر فيه الكلام ده وانت بتكتب. Ctrl+R تاني يجيب اللي قبله، و Enter ينفّذ، والأسهم تعدّله الأول.

وحيلة مفيدة: لو بدأت الأمر بمسافة، على أوبونتو مش هيتحفظ في الـ history. مفيد لو فيه باسورد.`,
            when: "كل يوم. أمر docker طويل كتبته امبارح: Ctrl+R واكتب docker.",
            mistakes: "كتابة باسوردات أو مفاتيح جوه الأوامر، فتتحفظ في ملف أي حد يقدر يقراه لو دخل الجهاز. و [[!]] جوه نص بين double quotes ممكن الشيل يفهمه كأمر history."
          },
          teach: R`## bash فاكر كل أمر كتبته، وده بيرجّعهولك

اتشغّل على أوبونتو 24.04 جوه Docker في bash تفاعلي كيوزر [[ali]]، وكتبنا قبل المثال: [[mkdir -p lab]] و [[cd lab]] و [[echo one]] و [[ echo secret-with-space]] (بمسافة في أوله) و [[ls]].

---

## ١. [[history | tail -20]]

[[history]] بيطبع اللستة كلها برقم جنب كل أمر، و [[| tail -20]] بيسيب آخر ٢٠. عندنا كانت ٥ بس:

~~~text history | tail -5
    1  mkdir -p lab
    2  cd lab
    3  echo one
    4  ls
    5  history | tail -5
~~~

لاحظ حاجتين:

- الأمر [[history | tail -5]] نفسه دخل اللستة (رقم 5).
- [[echo secret-with-space]] **مش موجود**. أوبونتو حاطط [[HISTCONTROL=ignoreboth]]، يعني: الأمر اللي بيبدأ بمسافة ميتسجلش، والأمر المكرر ورا بعضه يتسجل مرة واحدة.

~~~text echo $HISTCONTROL $HISTSIZE $HISTFILESIZE $HISTFILE
ignoreboth 1000 2000 /home/ali/.bash_history
~~~

| المتغير | معناه |
|---|---|
| [[HISTSIZE]] | كام أمر يفضل في الذاكرة: 1000 |
| [[HISTFILESIZE]] | كام سطر في الملف: 2000 |
| [[HISTFILE]] | الملف اللي بيتحفظ فيه لما تقفل الترمنال |

---

## ٢. [[!!]]

bash بيبدّل [[!!]] بآخر أمر **قبل** التنفيذ، وبيطبع الأمر بعد التبديل عشان تعرف اتنفذ إيه:

~~~text الناتج
history | tail -5
    1  mkdir -p lab
    ...
~~~

أول سطر هو الأمر اللي [[!!]] بقت هو. أشهر استخدام: [[sudo !!]] لما أمر يقولك Permission denied.

---

## ٣. [[!42]]

[[!]] ورقم = الأمر رقم كذا في اللستة. عندنا [[!3]]:

~~~text الناتج
echo one
one
~~~

السطر الأول الأمر (رقم 3 = [[echo one]])، والتاني ناتجه. ولو الرقم مش موجود: [[bash: !42: event not found]].

---

## الملف

لما قفلنا الشيل، اتكتب في [[~/.bash_history]]:

~~~text cat ~/.bash_history
mkdir -p lab
cd lab
echo one
ls
history | tail -5
echo hi
echo one
echo $HISTCONTROL $HISTSIZE $HISTFILESIZE $HISTFILE
~~~

[[!!]] و [[!3]] اتسجلوا بالأوامر اللي بقوا هي ([[history | tail -5]] مرة واحدة بس عشان ignoreboth، و [[echo one]]). وده ملف نص عادي: أي حد يقدر يقرا الـ home بتاعك يشوف أوامرك، فمتكتبش باسورد في أمر.

---

## الاختصارات (في الترمنال التفاعلي)

| الزرار | بيعمل |
|---|---|
| Ctrl+R | دوّر في الـ history وانت بتكتب، و Ctrl+R تاني للأقدم |
| السهم لفوق | الأمر اللي قبله |
| Tab | كمّل الاسم، ومرتين يعرض الاحتمالات |
| Ctrl+A و Ctrl+E | أول السطر وآخره |
| Ctrl+W | امسح الكلمة اللي قبل المؤشر |
| Ctrl+L | امسح الشاشة |

> zsh على الماك: [[!!]] و [[!42]] و Ctrl+R نفس الكلام، بس [[history]] لوحده بيعرض آخر 16 بس و [[history 1]] الكل (من الـ docs). وفي PowerShell: [[Get-History]] أو [[h]]، و [[r 42]] بينفّذ رقم 42، و Ctrl+R شغال.

## الخلاصة

[[history]] اللستة، و [[!!]] آخر أمر، و [[!رقم]] أمر معين، و Ctrl+R أسرعهم. والأمر اللي بيبدأ بمسافة مش بيتسجل على أوبونتو.`,
          lines: ["اعرض آخر ٢٠ أمر كتبتهم.", R`[[!!]] الشيل بيبدّلها بآخر أمر كتبته، وبيطبعه قبل ما ينفّذه عشان تشوف هيشغّل إيه. أشهر استخدام: أمر فشل بـ Permission denied، فتكتب [[sudo !!]] بدل ما تكتبه تاني.`, "كرر الأمر رقم ٤٢ في الـ history."],
          sol: R`Ctrl+R بيحوّل الـ prompt لـ [[(reverse-i-search)]]، وأول ما تكتب [[mkdir]] بيظهر آخر أمر فيه الكلمة دي. Ctrl+R تاني بيجيب اللي قبله، وهكذا. Enter بينفّذه زي ما هو، والسهم يمين أو شمال بيحطه في السطر تعدّله، و Ctrl+G (أو Ctrl+C) بيلغي.

لو كتبت ومظهرش حاجة (أو ظهر [[failed reverse-i-search]])، يبقى مفيش أمر فيه الكلمة دي في الـ history. ولو فوّت الأمر اللي عايزه بـ Ctrl+R زيادة، الغي وابدأ تاني؛ Ctrl+S (اللي المفروض يرجع لقدام) في أغلب الترمنالات بتجمّد الشاشة بدل كده، ولو حصل Ctrl+Q بيفكها.`
        },
        {
          cmd: "man / --help",
          title: "الشرح الرسمي",
          desc: R`مش محتاج تحفظ كل flag، محتاج تعرف تلاقيه. [[man grep]] (من manual) بيفتح الدليل الرسمي للأمر جوه [[less]]، فـ [[/]] تدوّر جواه على الكلمة أو الـ flag، و [[q]] تخرج. وفي جزء SYNOPSIS أي حاجة بين أقواس مربعة اختيارية، و [[...]] معناها ممكن تتكرر.

[[ls --help]] نسخة مختصرة في صفحة واحدة بتتطبع على الشاشة. و [[tldr tar]] بيجيبلك أشهر الأمثلة الجاهزة للأمر، وده غالبًا اللي انت محتاجه؛ محتاج تسطّبه الأول: على أوبونتو 24.04 [[pipx install tldr]] (باكدجات apt القديمة [[tldr]] و [[tealdeer]] مبقتش بتعرف تنزّل الصفحات)، وعلى أوبونتو 26.04 [[sudo apt install tealdeer]] وبعدها [[tldr --update]].

ومتقراش الـ man من أوله لآخره: دوّر بـ [[/]] على اللي محتاجه على طول. ولو فيه رمز مش فاهمه في أمر، شوف تاب «الرموز».`,
          example: R`man grep
ls --help
tldr tar`,
          try: "سطّب tldr واقرا أمثلة [[find]].",
          practice: [
            { lvl: 'سريع', t: R`لاقي معنى خيار من غير ما تفتح الـ manual كله: [[ls --help | grep -- ' -S ']].`, done: R`سطر واحد: [[-S]] وجنبه [[sort by file size, largest first]]. و [[--]] قبل الكلمة مهمة: من غيرها [[grep]] هيفتكر [[-S]] خيار ليه هو.` },
            { lvl: 'تطبيق', t: R`لاقي أمر من غير ما تعرف اسمه: [[man -k partition]] (أو [[apropos partition]]). وبعدين قارن [[man crontab]] بـ [[man 5 crontab]].`, done: R`[[man -k]] بيطلّع سطور شكلها اسم أمر وجنبه رقم بين قوسين وشرح قصير (زي [[fdisk (8)]]). و [[man 5 crontab]] بيفتح شرح **شكل الملف** (الخمس خانات)، مش شرح الأمر اللي في section 1.` },
            { lvl: 'تحدي', t: R`الأوامر اللي جوه bash نفسه: [[type -a echo]] و [[type cd]]، وبعدين [[help cd]] بدل [[man cd]]، ولاقي فيه الفرق بين [[-P]] و [[-L]].`, done: R`[[type -a echo]] بيطبع [[echo is a shell builtin]] وبعدها مسار أو اتنين زي [[/usr/bin/echo]]، يعني فيه نسختين والـ builtin هو اللي بيشتغل. [[type cd]] بيقول builtin بس (مفيش برنامج اسمه cd)، و [[help cd]] بيشرح [[-L]] (يمشي ورا الـ symlinks) و [[-P]] (المسار الحقيقي).` },
          ],
          mac: ["diff", "أوامر كتير على الماك مش بتفهم [[--help]]، استخدم [[man]]."],
          deep: {
            why: "مستحيل تحفظ كل flag لكل أمر. ومش محتاج. محتاج تعرف تلاقي المعلومة بسرعة، حتى من غير نت.",
            how: R`[[man]] (من manual) بيفتح الدليل الرسمي للأمر، وبيفتحه جوه [[less]]، فكل اللي اتعلمته هناك شغال: [[/]] تدوّر، و [[q]] تخرج.

الدليل مقسّم أجزاء: NAME إيه الأمر، و SYNOPSIS شكل كتابته، و DESCRIPTION و OPTIONS شرح كل flag، وأحيانًا EXAMPLES. وفي SYNOPSIS: أي حاجة بين أقواس مربعة اختيارية، والنقط [[...]] معناها «ممكن تكرر».

و [[--help]] نسخة مختصرة في صفحة واحدة. و [[tldr]] أداة بتجيبلك أشهر ٥ أمثلة للأمر، وده غالبًا اللي انت محتاجه.`,
            when: "نسيت flag. عايز تعرف أمر بيقدر يعمل إيه كمان. شايف أمر في شرح أونلاين ومش فاهم جزء منه.",
            mistakes: "إنك تقرا الـ man من أوله لآخره. دوّر بـ [[/]] على الكلمة أو الـ flag اللي محتاجه على طول."
          },
          teach: R`## ٣ مستويات شرح: [[man]] الكامل، و [[--help]] المختصر، و [[tldr]] الأمثلة

اتشغّلوا على أوبونتو 24.04 جوه Docker. ملحوظة: صورة Docker «minimized»، فـ [[man grep]] فيها بيطبع [[This system has been minimized by removing packages and content...]] ومفيش صفحات. عشان نجرّب رجّعنا الصفحات (زي أوبونتو العادي على لابتوب).

---

## ١. [[man grep]]

[[man]] = manual. بيفتح الدليل جوه [[less]] (الأسهم و Space تتحرك، و [[/كلمة]] تدوّر، و [[n]] اللي بعدها، و [[q]] تخرج). أوله:

~~~text الناتج (أول الصفحة)
GREP(1)                          User Commands                         GREP(1)

NAME
       grep, egrep, fgrep, rgrep - print lines that match patterns

SYNOPSIS
       grep [OPTION...] PATTERNS [FILE...]
       grep [OPTION...] -e PATTERNS ... [FILE...]
       grep [OPTION...] -f PATTERN_FILE ... [FILE...]

DESCRIPTION
       grep  searches  for  PATTERNS  in  each  FILE.
~~~

### [[GREP(1)]]

الرقم بين القوسين «القسم»: [[1]] أوامر عادية، و [[5]] شكل ملفات الإعدادات، و [[8]] أوامر الأدمن. فيه أسامي في أكتر من قسم، فـ [[man 5 passwd]] شكل ملف [[/etc/passwd]] و [[man passwd]] الأمر.

### نقرا SYNOPSIS

[[grep [OPTION...] PATTERNS [FILE...]]]:

| الحتة | معناها |
|---|---|
| [[grep]] | اسم الأمر نفسه، بتكتبه زي ما هو |
| [[[OPTION...]]] | بين أقواس مربعة = اختياري، و [[...]] = ممكن أكتر من واحد |
| [[PATTERNS]] | من غير أقواس = لازم |
| [[[FILE...]]] | ملف أو أكتر، اختياري (من غيره بيقرا الـ stdin) |

### دوّر على flag

بدل ما تقرا كله: [[/-i]] وانت جوه man. اللي هتلاقيه:

~~~text الناتج
       -i, --ignore-case
              Ignore  case  distinctions  in  patterns and input data, so that
              characters that differ only in case match each other.
~~~

الشكل القصير [[-i]] والطويل [[--ignore-case]] نفس الحاجة.

---

## ٢. [[ls --help]]

البرنامج نفسه بيطبع ملخص على الشاشة (من غير less):

~~~text ls --help (أوله)
Usage: ls [OPTION]... [FILE]...
List information about the FILEs (the current directory by default).

Mandatory arguments to long options are mandatory for short options too.
  -a, --all                  do not ignore entries starting with .
  -A, --almost-all           do not list implied . and ..
~~~

بس هو 139 سطر، فـ [[ls --help | grep -- -h,]] أسرع:

~~~text الناتج
  -h, --human-readable       with -l and -s, print sizes like 1K 234M 2G etc.
~~~

[[--]] قبل [[-h,]] بتقول لـ grep «اللي بعدي مش flag ليك، ده الكلمة اللي بدوّر عليها».

---

## ٣. [[tldr tar]]

[[tldr]] (too long; didn't read) بيجيب صفحة قصيرة فيها أشهر الأمثلة من مشروع tldr-pages على النت. **مش متسطب لوحده، وجربنا طرق التسطيب على أوبونتو 24.04**:

| الطريقة | النتيجة |
|---|---|
| [[sudo apt install tldr]] (نسخة 0.9.2) | [[tldr --update]] فشل: [[Did not find end of central directory signature]] |
| [[sudo apt install tealdeer]] (1.6.1) | فشل في تنزيل الصفحات: [[invalid Zip archive]] |
| [[npm i -g tldr]] مع Node 18 بتاع apt | وقع بـ [[ERR_REQUIRE_ESM]] |
| [[pipx install tldr]] (نسخة 3.4.4) | اشتغل ونزّل الصفحات من غير مشاكل |

النسخ القديمة بتنزّل الصفحات من رابط اتغير. وعلى أوبونتو 26.04 [[sudo apt install tealdeer]] (1.8.1) اشتغل بعد [[tldr --update]]. ناتج [[tldr tar]]:

~~~text الناتج (أوله)
  Archiving utility.
  Often combined with a compression method, such as $__btgzip$__bt or $__btbzip2$__bt.

  [c]reate an archive and write it to a [f]ile:

      tar cf path/to/target.tar path/to/file1 path/to/file2 ...

  [c]reate a g[z]ipped archive and write it to a [f]ile:

      tar czf path/to/target.tar.gz path/to/file1 path/to/file2 ...

  E[x]tract a (compressed) archive [f]ile into the target directory:

      tar xf path/to/source.tar.ext [-C|--directory] path/to/directory
~~~

كل مثال: جملة بتقول بيعمل إيه (والحروف بين [[[ ]]] بتشاور على الـ flag جت منين)، وتحتها الأمر. و [[path/to/...]] بتتبدل بمساراتك.

---

الترتيب العملي:

1. مثال سريع: [[tldr]].
2. flag نسيته: [[--help]] ومعاه [[grep]].
3. كل التفاصيل: [[man]] وجواه [[/]].

> على الماك [[man]] موجود، وأوامر كتير هناك (نسخ BSD) مبتفهمش [[--help]] (من الـ docs). وفي PowerShell: [[Get-Help Get-ChildItem -Examples]]، بس الأمثلة مش بتيجي مع PowerShell 7 (جربناها وطلّعت ملخص قصير)، فمحتاج [[Update-Help]] مرة أو [[-Online]].

## الخلاصة

[[tldr]] الأول، و [[--help]] لو محتاج flag، و [[man]] لما تحتاج كل حاجة. وجوه man متقراش، دوّر بـ [[/]].`,
          lines: [
            "manual: الدليل الكامل لأمر grep. q للخروج.",
            R`[[--help]] بيطبع شرح مختصر للأمر وكل الـ flags بتاعته على الشاشة مرة واحدة، من غير ما يفتح [[less]]. أسرع من [[man]] لما تكون عارف الأمر وناسي flag بس. معظم الأوامر بتفهمه، بس مش كلها.`,
            "أمثلة جاهزة ومختصرة (محتاج تسطّب tldr الأول)."
          ],
          sol: R`على أوبونتو 24.04: [[sudo apt install pipx]] وبعدين [[pipx install tldr]] (بيحطه في [[~/.local/bin]]، و [[pipx ensurepath]] يزوّده للـ PATH). جربنا البدايل ومنفعتش: [[apt install tldr]] (0.9.2) و [[apt install tealdeer]] (1.6.1) فشلوا في تنزيل الصفحات، و [[npm i -g tldr]] مع Node 18 بتاع apt وقع بـ [[ERR_REQUIRE_ESM]]. وعلى أوبونتو 26.04 [[sudo apt install tealdeer]] وبعدين [[tldr --update]] اشتغل. وعلى الماك [[brew install tlrc]] (من الـ docs). بعدها [[tldr find]] بيطبع وصف في سطر وتحته أمثلة جاهزة، زي البحث بالاسم أو الامتداد، والبحث بتاريخ التعديل، وتنفيذ أمر على كل نتيجة.

لو قالك [[No tldr entry for find]] أو [[Page cache not found]]، يبقى الصفحات لسه ماتحمّلتش (أو الجهاز مش واصل للنت)، شغّل [[tldr --update]]. ولو شفت flag في tldr وعايز تفاصيله، ساعتها [[man find]] وابحث جواه بـ [[/]] زي less.`
        }
      ]
    }
]);
