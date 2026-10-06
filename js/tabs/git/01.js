// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   teach    اختياري: «الشرح خطوة بخطوة»: markdown صغير (## و ### و ~~~lang عنوان ... ~~~ و جداول | و - و 1. و > و ---). القواعد في README
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
//   check    اختياري: تمرين بيتصحح لوحده في الصفحة
//            JS:  { lang: "js", starter, tests: R`test("..", () => expect(x).toBe(y))`, solution }
//            SQL: { lang: "sql", setup: R`CREATE TABLE ...; INSERT ...`, starter, expect: [[...صفوف]] أو expectSql: R`استعلام مرجعي`, solution, ordered }
//            solution حل مرجعي مش بيظهر، و npm run check بيتأكد إنه بيعدّي الاختبارات. المتاح في tests: test و expect(x).toBe/toEqual/toThrow/toBeTruthy/toBeFalsy
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("git", {
  label: "git",
  prompt: "~/myapp (main)$ ",
  lab: R`mkdir -p ~/lab/gitlab && cd ~/lab/gitlab
git init`,
  labText: "Git بيشتغل بنفس الأوامر في bash و PowerShell و CMD. اعمل repo تجربة جوه lab وجرّب فيه كل حاجة، حتى الأوامر اللي بتمسح التاريخ، قبل ما تستخدمها على مشروع حقيقي.",
  levels: {
    "1": ["البداية", "تحفظ شغلك نقط وتشوف تاريخه والفرق بين كل نقطة"],
    "2": ["المتوسط", "تشتغل في branches وترفع على GitHub وتحل التعارضات"],
    "3": ["المتقدم", "تصلّح أي غلطة، وترجّع اللي اتمسح، وتنضّف التاريخ"]
  },
  categories: [
    {
      t: "أول مرة وأساس الشغل",
      l: 1,
      n: "Git بيشتغل بنفس الأوامر بالظبط في bash و PowerShell و CMD و zsh",
      items: [
        {
          cmd: "مقدمة Git و GitHub",
          title: "Git بيعمل إيه، وإيه الفرق بينه وبين GitHub؟",
          desc: R`من غير Git، الواحد بيحفظ نسخ مشروعه كده: [[project_final]] وبعدين [[project_final_v2]] وبعدين [[project_final_really]]. ولو عايز يرجع لكود الأسبوع اللي فات مش عارف أنهي نسخة، ولو شغال مع حد بيبعتوا zip لبعض والتعديلات بتضيع.

[[Git]] برنامج على جهازك اسمه version control: كل ما توصل لنقطة كويسة، بتاخد «لقطة» من المشروع اسمها [[commit]]، معاها رسالة بتقول عملت إيه. وبعدين تقدر ترجع لأي commit، أو تقارن بين اتنين، أو تعرف مين غيّر سطر معين وإمتى.

[[GitHub]] حاجة تانية: موقع بيستضيف نسخة من الـ repository بتاعك على النت، عشان تشاركه مع فريقك، أو تعمل Pull Request، أو تعرضه في الـ portfolio. Git شغال على جهازك من غير نت خالص، و GitHub (أو GitLab أو Bitbucket) مجرد مكان بترفع عليه.

الملف بيعدّي بـ ٣ أماكن قبل ما يتحفظ:
• الـ working directory: الملفات اللي بتعدّلها في VS Code.
• الـ staging area: بتختار فيها اللي هيدخل في الـ commit الجاي، بـ [[git add]].
• الـ repository: الـ commits اللي اتسجلت فعلًا، بـ [[git commit]].

الدرس ده جولة سريعة. كل أمر ليه درس لوحده في القسم ده بالترتيب: «git config» (تعرّف نفسك)، و «git init / clone»، و «git status»، و «git add / commit»، و «git log»، و «git diff» (الفرق قبل الحفظ)، و «.gitignore» (ملفات Git ميشوفهاش). والـ branches والرفع على GitHub بـ push و pull في المستوى اللي بعده.`,
          example: R`# اتأكد إن Git متسطّب
git --version

# هات نسخة من repo صغير على GitHub وادخل الفولدر بتاعه
git clone https://github.com/octocat/Hello-World
cd Hello-World

# الحالة دلوقتي، وآخر ٣ commits
git status
git log --oneline -n 3`,
          try: R`افتح الترمنال في أي فولدر مش مشروع (زي Desktop) واكتب [[git status]] الأول، واقرا الرسالة. بعدين نفّذ أوامر المثال بالترتيب. وفي الآخر افتح [[https://github.com/octocat/Hello-World/commits]] في المتصفح وقارن الـ commits اللي هناك باللي طلعلك في الترمنال.`,
          deep: {
            why: R`تقريبًا كل شركة برمجة بتستخدم Git. كل feature بتتعمل في branch، والكود بيتراجع في Pull Request قبل ما يدخل، ولو حصل bug بعد نزول نسخة بترجع للـ commit اللي قبله. ولوحدك كمان: Git هو اللي بيخليك تجرّب بجرأة، لأنك دايمًا تقدر ترجع.`,
            how: R`أول ما تعمل [[git init]] أو [[git clone]]، Git بيعمل فولدر مخفي اسمه [[.git]] جوه المشروع. ده فيه كل التاريخ: كل commit محفوظ بمحتوى الملفات وقتها، واسمه hash (زي [[7fd1a60]]، ودي أول ٧ حروف من الاسم الكامل). لو مسحت [[.git]]، الملفات بتفضل بس التاريخ كله بيروح.

عشان كده [[git status]] برا أي repo بيقولك [[not a git repository]]: Git بيدوّر على [[.git]] في الفولدر الحالي واللي فوقه، ومش لاقيه.

الملف بيبقى في حالة من دول: [[untracked]] (جديد و Git مش متابعه)، أو [[modified]] (اتعدل بعد آخر commit)، أو [[staged]] (اتعمله add ومستني الـ commit)، أو متحفظ في commit ومتغيرش.`,
            when: "من أول يوم في أي مشروع، حتى لو لوحدك. اعمل commit مع كل خطوة صغيرة خلصت (صفحة اشتغلت، bug اتصلح)، مش مرة واحدة في آخر الأسبوع.",
            mistakes: R`تفتكر Git و GitHub حاجة واحدة، فتفتكر إنك محتاج نت عشان تعمل commit. تكتب أوامر Git في فولدر غير فولدر المشروع فيطلعلك [[not a git repository]]. وتعمل commit واحد كبير فيه ٢٠٠ ملف ورسالته [[updates]]: بعدين مش هتعرف ترجع لحاجة بعينها.`
          },
          teach: R`## الأول: المثال بيعمل إيه؟

المثال ٤ خطوات: نتأكد إن Git متسطّب، وننزّل repo صغير حقيقي من GitHub، وندخل فولدره، ونسأل Git عن حالته وتاريخه. الأوامر دي نفسها بالحرف في bash و PowerShell و CMD، لأن [[git]] برنامج واحد بيتنادى من أي ترمنال. كل الناتج تحت اتشغّل فعلًا على ويندوز 11 (Git 2.56)، والأرقام على لينكس من أوبونتو 24.04 جوه Docker.

---

## ١. [[git --version]]

[[--version]] فلاج موجود في أغلب البرامج: «قولي نسختك». لو طبع رقم، يبقى Git متسطّب والترمنال لاقيه.

~~~bash
git --version
~~~

~~~text الناتج على ويندوز
git version 2.56.0.windows.1
~~~

~~~text الناتج على أوبونتو 24.04
git version 2.43.0
~~~

[[windows.1]] معناها إنها نسخة Git for Windows (Git متجهز لويندوز ومعاه Git Bash). ولو طلعلك [[command not found]] أو [[is not recognized]] يبقى Git مش متسطّب، أو متسطّب والترمنال اتفتح قبل التسطيب: اقفله وافتحه تاني.

---

## ٢. قبل ما ندخل أي repo: [[git status]] برا

ده مش في المثال بس هو أول حاجة في «جرّب»، ومهم تشوفه:

~~~text الناتج في فولدر عادي
fatal: not a git repository (or any of the parent directories): .git
~~~

- [[fatal]] يعني Git وقف ومعملش حاجة.
- [[not a git repository]] يعني الفولدر ده مش مشروع Git.
- [[(or any of the parent directories): .git]] يعني Git دوّر على فولدر اسمه [[.git]] هنا، وفي اللي فوقه، واللي فوقه، لحد أول الديسك، وملقاش.

يعني «repo» = فولدر جواه (أو فوقه) فولدر مخفي اسمه [[.git]]. ده كل السر.

---

## ٣. [[git clone https://github.com/octocat/Hello-World]]

### الحتت

| الحتة | معناها |
|---|---|
| [[git clone]] | انسخ repo موجود بكل تاريخه لجهازي |
| [[https://github.com/]] | الموقع اللي عليه الـ repo |
| [[octocat]] | اسم الحساب (ده حساب GitHub الرسمي للتجارب) |
| [[Hello-World]] | اسم الـ repo، وبيبقى اسم الفولدر اللي هيتعمل |

~~~text الناتج
Cloning into 'Hello-World'...
~~~

ولو بصّيت جوه الفولدر بـ [[ls -a]] (الـ [[-a]] بتوري الملفات المخفية اللي بتبدأ بنقطة):

~~~text الناتج
.
..
.git
README
~~~

[[README]] ده ملف المشروع الوحيد. و [[.git]] فيه التاريخ كله: كل الـ commits، والـ branches، ومنين اتنزّل. الـ repo ده عام، فمش محتاج تسجيل دخول.

---

## ٤. [[cd Hello-World]]

[[cd]] (change directory) بتدخلك الفولدر. لازم، لأن أوامر Git بتشتغل على الـ repo اللي انت واقف جواه.

---

## ٥. [[git status]] جوه الـ repo

~~~text الناتج
On branch master
Your branch is up to date with 'origin/master'.

nothing to commit, working tree clean
~~~

| السطر | معناه |
|---|---|
| [[On branch master]] | انت على الـ branch اللي اسمها master (repo قديم، الجديدة غالبًا main) |
| [[up to date with 'origin/master']] | نسختك زي آخر نسخة نزلت من GitHub. [[origin]] اسم المكان اللي نزلت منه |
| [[nothing to commit]] | مفيش حاجة جديدة تتحفظ |
| [[working tree clean]] | ولا ملف اتغير عن آخر commit |

[[working tree]] (أو working directory) هي الملفات اللي انت شايفها وبتعدّلها.

---

## ٦. [[git log --oneline -n 3]]

- [[git log]]: اعرض التاريخ، الأحدث فوق.
- [[--oneline]]: كل commit في سطر واحد بدل ٥ سطور.
- [[-n 3]]: آخر ٣ بس.

~~~text الناتج
7fd1a60 Merge pull request #6 from Spaceghost/patch-1
7629413 New line at end of file. --Signed off by Spaceghost
553c207 first commit
~~~

أول كلمة في كل سطر هي الـ **hash**: بصمة الـ commit. الكامل ٤٠ حرف (أرقام وحروف من a لـ f)، و Git بيعرض أول ٧ بس لأنهم كفاية يميّزوه. وبعده رسالة الـ commit اللي صاحبها كتبها. افتح صفحة الـ commits على GitHub هتلاقي نفس الـ hashes بالظبط، لأنها نفس الـ commits.

---

## ٧. Git مش GitHub

| | Git | GitHub |
|---|---|---|
| هو إيه | برنامج على جهازك | موقع على النت |
| محتاج نت؟ | لأ، commit و log و diff كلهم أوفلاين | آه |
| بيعمل إيه | بيحفظ التاريخ في [[.git]] | بيستضيف نسخة من الـ repo، و Pull Requests و Issues |
| بدايل | مفيش، هو المعيار | GitLab و Bitbucket |

والملف بيعدّي على ٣ أماكن قبل ما يتحفظ:

| المكان | إزاي يوصله |
|---|---|
| working directory | بتعدّل الملف في المحرر |
| staging area | [[git add]] |
| repository (جوه [[.git]]) | [[git commit]] |

---

## الخلاصة

~~~text
git --version   Git متسطّب؟
git clone URL   نزّل repo بتاريخه في فولدر جديد
cd FOLDER       ادخل الـ repo قبل أي أمر Git
git status      انت فين، وإيه اللي اتغير
git log         التاريخ، والـ hash بصمة كل commit
.git            ده الـ repo نفسه، امسحه يضيع التاريخ
~~~`,
          lines: [
            R`بيطبع نسخة Git. لو طلعلك [[command not found]] يبقى Git مش متسطّب.`,
            R`بينزّل الـ repo كله بتاريخه في فولدر جديد اسمه [[Hello-World]] (تفاصيله في درس «git init / clone»).`,
            R`تدخل الفولدر، لأن أوامر Git بتشتغل على الـ repo اللي انت واقف فيه.`,
            R`انت على أنهي branch، وفيه ملفات اتغيرت ولا لأ.`,
            R`آخر ٣ commits، كل واحد في سطر: الـ hash المختصر والرسالة.`
          ],
          sol: R`[[git status]] برا أي repo بيطبع:
[[fatal: not a git repository (or any of the parent directories): .git]]

وبعدين أوامر المثال:
[[git version 2.43.0]] (رقمك ممكن يختلف)
[[git status]] جوه Hello-World:
[[On branch master]]
[[Your branch is up to date with 'origin/master'.]]
[[nothing to commit, working tree clean]]

الـ branch هنا اسمه [[master]] لأن الـ repo ده قديم. المشاريع الجديدة غالبًا [[main]]. و [[working tree clean]] معناها مفيش ولا ملف متغير عن آخر commit.

[[git log --oneline -n 3]]:
[[7fd1a60 Merge pull request #6 from Spaceghost/patch-1]]
[[7629413 New line at end of file. --Signed off by Spaceghost]]
[[553c207 first commit]]
الأحدث فوق. ونفس الـ hashes دي هتلاقيها على صفحة الـ commits في GitHub، لأنها نفس الـ commits بالظبط.`
        },
        {
          cmd: "git config",
          title: "عرّف نفسك مرة واحدة",
          desc: "الاسم والإيميل بيتكتبوا على كل commit، فخليهم نفس إيميل GitHub. [[init.defaultBranch main]] يخلي أي repo جديد يبدأ بـ main. و [[pull.rebase false]] بيقول لـ pull يدمج لو شغلك وشغل GitHub اتفرّعوا، ومن غيره Git الجديد بيقف ويطلب منك تختار.",
          example: R`git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
git config --global core.editor "code --wait"
git config --global pull.rebase false
git config --list`,
          try: "اظبط الإعدادات دي واعرضها.",
          deep: {
            why: "كل commit بتعمله بيتسجّل عليه اسم وإيميل، عشان في أي مشروع تعرف مين عمل إيه. وده لازم يتظبط مرة واحدة قبل أول commit.",
            how: R`Git بيقرا الإعدادات من ٣ أماكن بالترتيب: إعدادات المشروع نفسه (جوه فولدر [[.git]])، وبعدين إعداداتك انت لكل المشاريع (ملف [[~/.gitconfig]])، وبعدين إعدادات الجهاز كله. والأقرب بيكسب.

[[--global]] معناها «اكتب في ملفك انت»، فتنطبق على كل مشاريعك. من غيرها، الإعداد بيتكتب للمشروع الحالي بس. ده مفيد لو عندك مشروع شغل عايزه بإيميل الشركة، وباقي مشاريعك بإيميلك الشخصي.

و [[git config --list]] بيعرض كل الإعدادات اللي Git شايفها دلوقتي من الأماكن كلها.

والإيميل ده مهم: GitHub بيربط الـ commit بحسابك عن طريقه. لو كتبته غلط، الـ commits هتظهر من غير صورتك وكأن حد تاني عملها.`,
            when: "أول مرة على أي جهاز جديد أو سيرفر جديد. ولو بتشتغل على مشاريع شغل وشخصية بإيميلات مختلفة.",
            mistakes: "إيميل مختلف عن إيميل GitHub، فالـ commits متتربطش بحسابك. ونسيان الإعداد على السيرفر، فتعمل commit هناك يتسجّل باسم غريب زي root."
          },
          teach: R`## الأول: [[git config]] بيعمل إيه؟

[[git config]] بيكتب أو بيقرا إعدادات Git. كل سطر في المثال شكله واحد: [[git config --global اسم.المفتاح "القيمة"]]. والمفتاح اسمه جزئين بينهم نقطة: القسم ([[user]] أو [[init]] أو [[core]] أو [[pull]]) واسم الإعداد جواه. الأوامر نفسها في bash و PowerShell و CMD.

> جرّبت المثال كله على ويندوز (Git 2.56) بملف global تجريبي بدل ملفي الحقيقي، فالمسارات اللي في الناتج هتختلف عندك بس الشكل هو هو.

---

## ١. يعني إيه [[--global]]؟

Git بيقرا الإعدادات من ٣ ملفات، والأقرب للمشروع بيكسب:

| المستوى | الفلاج | الملف على ويندوز | على لينكس والماك |
|---|---|---|---|
| الجهاز كله | [[--system]] | [[C:/Program Files/Git/etc/gitconfig]] | [[/etc/gitconfig]] |
| انت (كل مشاريعك) | [[--global]] | [[C:\Users\اسمك\.gitconfig]] | [[~/.gitconfig]] |
| المشروع ده بس | [[--local]] (الافتراضي) | [[.git/config]] جوه المشروع | نفسه |

يعني [[--global]] = «اكتبه في ملفي انت، يتطبّق على كل مشاريعي».

---

## ٢. السطور واحد واحد

### [[user.name]] و [[user.email]]

~~~bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
~~~

مبيطبعوش حاجة لو نجحوا. الاسم والإيميل بيتكتبوا على كل commit. والعلامات [[" "]] لازمة لأن الاسم فيه مسافة؛ من غيرها الترمنال هيعتبر [[Name]] كلمة تانية منفصلة. وعلى جهاز جديد من غيرهم، أول commit بيقع كده (أوبونتو 24.04):

~~~text الناتج من غير user.name و user.email
Author identity unknown

*** Please tell me who you are.

Run

  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"
...
fatal: unable to auto-detect email address (got 'root@10e4e773b807.(none)')
~~~

### [[init.defaultBranch main]]

اسم أول branch في أي [[git init]] جديد. من غيره، Git بيستخدم [[master]]. على أوبونتو بيطبع رسالة [[hint: Using 'master' as the name for the initial branch]] طويلة، وعلى ويندوز Git for Windows حاطط [[init.defaultbranch=master]] في إعدادات الجهاز فمبيقولش حاجة.

### [[core.editor "code --wait"]]

لما Git يحتاج يكتب كلام طويل (رسالة merge مثلًا) بيفتح محرر. [[code]] هو VS Code، و [[--wait]] معناها «الترمنال يستنى لحد ما تقفل التاب». من غير [[--wait]]، VS Code بيفتح والترمنال بيكمّل على طول، فـ Git يلاقي الرسالة فاضية ويلغي.

### [[pull.rebase false]]

لما شغلك وشغل GitHub يتفرّعوا، [[git pull]] يعمل merge. من غيره، Git 2.43 على أوبونتو بيقف كده:

~~~text الناتج من غير pull.rebase
hint: You have divergent branches and need to specify how to reconcile them.
...
fatal: Need to specify how to reconcile divergent branches.
~~~

(Git for Windows بيحطه لوحده في إعدادات الجهاز وقت التسطيب، عشان كده على ويندوز ممكن متشوفش الرسالة دي.)

---

## ٣. [[git config --list]]

بيعرض كل الإعدادات من التلات ملفات ورا بعض. ده آخره على ويندوز:

~~~text الناتج (آخر السطور)
credential.helper=manager
credential.https://dev.azure.com.usehttppath=true
init.defaultbranch=master
user.name=Your Name
user.email=you@example.com
init.defaultbranch=main
core.editor=code --wait
pull.rebase=false
~~~

لاحظ [[init.defaultbranch]] ظاهر **مرتين**: [[master]] من إعدادات الجهاز، و [[main]] من ملفك. الاتنين موجودين، والأخير (الأقرب) هو اللي بيكسب. ولاحظ [[defaultBranch]] بقى [[defaultbranch]]: أسماء المفاتيح مش حساسة لحالة الحروف.

ولو عايز تعرف كل سطر جاي منين، [[--show-origin]]:

~~~text git config --list --show-origin (جزء)
file:C:/Program Files/Git/etc/gitconfig   init.defaultbranch=master
file:C:/Users/.../.gitconfig              user.name=Your Name
file:C:/Users/.../.gitconfig              init.defaultbranch=main
~~~

وده شكل ملفك نفسه بعد الأوامر:

~~~text .gitconfig
[user]
	name = Your Name
	email = you@example.com
[init]
	defaultBranch = main
[core]
	editor = code --wait
[pull]
	rebase = false
~~~

يعني [[user.name]] = قسم [[[user]]] وجواه [[name]]. تقدر تفتح الملف وتعدّله بإيدك، بس الأمر أأمن.

---

## ٤. تقرا قيمة واحدة، وإعداد لمشروع واحد

[[git config user.name]] من غير قيمة بيقرا بس:

~~~text الناتج
Your Name
~~~

ولو جوه repo كتبت من غير [[--global]]:

~~~bash
git config user.email work@company.com
git config user.email
~~~

~~~text الناتج
work@company.com
~~~

الإيميل ده اتكتب في [[.git/config]] بتاع المشروع ده بس، وكسب على الـ global جواه. وباقي مشاريعك لسه بإيميلك الشخصي.

والغلط المشهور: تنسى [[--global]] وانت برا أي repo:

~~~text الناتج
fatal: not in a git directory
~~~

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[git config --global KEY "VALUE"]] | يكتب في ملفك لكل المشاريع |
| [[git config KEY "VALUE"]] | يكتب للمشروع الحالي بس (لازم تبقى جوه repo) |
| [[git config KEY]] | يقرا القيمة اللي Git شايفها |
| [[git config --list --show-origin]] | كل الإعدادات وكل واحد جاي منين |

الأقرب بيكسب: المشروع، وبعده انت، وبعده الجهاز.`,
          lines: [
            "سجّل اسمك، وهيتكتب على كل commit. [[--global]] لكل مشاريعك.",
            "سجّل إيميلك (نفس بتاع GitHub).",
            "أي مشروع جديد يبدأ بـ branch اسمه main.",
            "لما Git يحتاج يفتح محرر، يفتح VS Code ويستنى تقفله.",
            "لو الفرعين اتفرّعوا، pull يعمل merge بدل ما يقف بـ «divergent branches».",
            "اعرض كل الإعدادات."
          ],
          sol: R`[[git config --list]] المفروض يطلّع سطورك انت وسط غيرها، بالشكل ده بالظبط: [[user.name=Your Name]] و [[user.email=you@example.com]] و [[init.defaultbranch=main]] و [[pull.rebase=false]] و [[core.editor=code --wait]]. لاحظ إن [[defaultBranch]] بيظهر [[defaultbranch]] بحروف صغيرة، وده طبيعي لأن أسماء المفاتيح مش حساسة لحالة الحروف.

ممكن تلاقي سطور زيادة من إعدادات الجهاز (زي [[credential.helper]])، وده عادي. ولو عايز تشوف كل سطر جاي منين: [[git config --list --show-origin]].

الغلط الشائع: تنسى [[--global]] وانت بره أي repo، فيطلعلك [[fatal: not in a git directory]]. أو الاسم يظهر مرتين بقيمتين مختلفتين: يبقى فيه قيمة في المشروع وقيمة global، والأقرب (بتاعة المشروع) هي اللي بتكسب.`,
          solCode: R`git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
git config --global pull.rebase false
git config --list --show-origin`
        },
        {
          cmd: "git init / clone",
          title: "ابدأ repo",
          desc: R`الـ repo (اختصار repository) هو مشروع Git متابعه. فيه طريقتين تبدأ بيهم: [[git init]] بيحوّل الفولدر اللي انت واقف فيه لـ repo جديد فاضي، وده بيعمل جواه فولدر مخفي اسمه [[.git]] هيتحفظ فيه التاريخ كله، ومش بيلمس ملفاتك. [[git clone]] وبعده رابط بينزّل repo موجود على GitHub بكل تاريخه في فولدر جديد بنفس اسمه، ويربطه بالمكان اللي نزل منه تحت اسم [[origin]].

في المثال [[&&]] معناها «نفّذ التاني بس لو الأول نجح». الرابط اللي بيبدأ بـ [[https://]] بيطلب تسجيل دخول لو الـ repo خاص، واللي بيبدأ بـ [[git@github.com:]] بيستخدم مفتاح SSH. [[USER/REPO]] اسم الحساب واسم المشروع، والرابط كله بتنسخه من زرار Code الأخضر في صفحة الـ repo.

متعملش clone جوه repo تاني، ومتعملش init في الـ home كله. اتأكد انت فين بـ [[pwd]] الأول.`,
          example: R`mkdir myapp && cd myapp
git init
# أو بدل init: نزّل repo موجود (من بره أي repo، مش جوه myapp)
git clone https://github.com/USER/REPO.git
git clone git@github.com:USER/REPO.git`,
          try: "اعمل فولدر جديد جوه lab واعمله init.",
          deep: {
            why: "عشان Git يبدأ يتابع مشروع، محتاج «repo». إما تحوّل فولدر عندك لـ repo جديد، أو تنزّل repo موجود من GitHub.",
            how: R`[[git init]] بيعمل فولدر مخفي اسمه [[.git]] جوه مشروعك، وده الـ repo نفسه. كل الـ commits، والتاريخ كله، والـ branches، والإعدادات، متخزنين جوه الفولدر ده. باقي الملفات اللي انت شايفها اسمها «working directory»، وهي مجرد النسخة الحالية اللي انت شغال عليها.

عشان كده لو مسحت فولدر [[.git]]، المشروع هيفضل موجود، بس التاريخ كله هيضيع ويبقى فولدر عادي.

[[git clone]] بيعمل ٣ حاجات مرة واحدة: بينزّل الـ repo كله بكل تاريخه (مش آخر نسخة بس)، ويعمل الملفات، ويربط المشروع بالمكان اللي نزّله منه تحت اسم [[origin]]، عشان تعمل pull و push بعد كده.

والفرق بين الرابطين: [[https://]] بيطلب منك تسجيل دخول (توكن)، و [[git@github.com:]] بيستخدم مفتاح SSH ومش هيسألك.`,
            when: "[[init]] وانت بتبدأ مشروع جديد من الصفر. [[clone]] لما تنزّل مشروعك على جهاز جديد أو على السيرفر، أو تنزّل مشروع حد تاني.",
            mistakes: "[[git init]] في الفولدر الغلط، زي فولدرك الرئيسي كله، فكل ملفاتك تبقى جزء من repo. لو حصل، امسح [[.git]] من المكان الغلط. و [[clone]] جوه مشروع تاني، فيبقى repo جوه repo."
          },
          teach: R`## الأول: طريقتين تبدأ بيهم

[[git init]] بيبدأ repo جديد فاضي في فولدر عندك، و [[git clone]] بينزّل repo موجود. الاتنين آخرهم واحد: فولدر جواه [[.git]]. الناتج تحت من ويندوز (Git 2.56) وأوبونتو 24.04 (Git 2.43).

---

## ١. [[mkdir myapp && cd myapp]]

| الحتة | معناها |
|---|---|
| [[mkdir myapp]] | اعمل فولدر اسمه myapp (make directory) |
| [[&&]] | لو اللي قبلي نجح، نفّذ اللي بعدي |
| [[cd myapp]] | ادخل الفولدر |

ليه [[&&]] مش [[;]]؟ لو [[mkdir]] فشل (الفولدر موجود مثلًا)، مش عايز تكمّل وانت في مكان غلط. [[&&]] شغالة في bash و zsh و CMD و PowerShell 7. أما Windows PowerShell 5.1 مبيفهمهاش، فاكتبهم سطرين:

~~~powershell
mkdir myapp
cd myapp
~~~

---

## ٢. [[git init]]

~~~text الناتج
Initialized empty Git repository in D:/.../myapp/.git/
~~~

[[Initialized empty]] يعني اتعمل repo فاضي، ومكانه بالظبط [[myapp/.git/]]. ملفاتك (لو فيه) متلمستش. وجوه [[.git]]:

~~~text ls .git
HEAD
config
description
hooks
info
objects
refs
~~~

| الحاجة | فيها إيه |
|---|---|
| [[objects]] | محتوى كل الملفات والـ commits (مضغوط) |
| [[refs]] | أسامي الـ branches وكل واحدة بتشاور على أنهي commit |
| [[HEAD]] | انت واقف على أنهي branch دلوقتي |
| [[config]] | إعدادات المشروع ده بس (درس git config) |
| [[hooks]] | سكربتات بتشتغل لوحدها قبل وبعد commit مثلًا |

مش محتاج تلمس حاجة هنا، بس دلوقتي عارف إن «التاريخ» ملفات عادية في الفولدر ده.

### [[git status]] بعدها

~~~text الناتج
On branch main

No commits yet

nothing to commit (create/copy files and use "git add" to track)
~~~

[[No commits yet]] طبيعي: الـ repo لسه فاضي. واسم الـ branch [[main]] لأن [[init.defaultBranch]] متظبط. لو مش متظبط، على أوبونتو بيطبع:

~~~text الناتج على أوبونتو من غير init.defaultBranch
hint: Using 'master' as the name for the initial branch. This default branch name
hint: is subject to change. To configure the initial branch name to use in all
hint: of your new repositories, which will suppress this warning, call:
hint: 
hint: 	git config --global init.defaultBranch <name>
...
Initialized empty Git repository in /tmp/a/.git/
~~~

ولو لقيت نفسك على master وعايز main: [[git branch -m main]] ([[-m]] move، يعني غيّر الاسم).

---

## ٣. [[git clone URL]]

السطر اللي في المثال بيتكتب **برا** myapp (مش جواه)، لأن clone بيعمل فولدر جديد لوحده. والرابط ليه شكلين:

| الشكل | مثال | بيتعرف عليك إزاي |
|---|---|---|
| HTTPS | [[https://github.com/USER/REPO.git]] | بيسأل على يوزر وتوكن لو الـ repo خاص (Git for Windows بيفتح نافذة تسجيل دخول) |
| SSH | [[git@github.com:USER/REPO.git]] | بمفتاح SSH (درس «ssh key لـ GitHub») |

[[USER/REPO]] مكانهم اسم الحساب واسم المشروع، و [[.git]] في آخر الرابط اختياري. جرّبته على repo عام حقيقي:

~~~text git clone https://github.com/octocat/Hello-World
Cloning into 'Hello-World'...
~~~

والرابط ممكن يبقى فولدر على جهازك كمان. clone لـ myapp الفاضي:

~~~text git clone myapp myapp-copy
Cloning into 'myapp-copy'...
warning: You appear to have cloned an empty repository.
done.
~~~

الاسم التاني ([[myapp-copy]]) اختياري: اسم الفولدر الجديد بدل اسم الـ repo.

بعد أي clone، المكان اللي نزلت منه بيتسجّل باسم [[origin]]، وتشوفه بـ [[git remote -v]]:

~~~text الناتج جوه Hello-World
origin	https://github.com/octocat/Hello-World (fetch)
origin	https://github.com/octocat/Hello-World (push)
~~~

وسطر SSH مقدرتش أجرّبه بحساب حقيقي هنا. من غير مفتاح متضاف لحسابك هيطلع [[Permission denied (publickey)]] (اتجرّبت بمفتاح مش متسجّل).

---

## ٤. الـ solCode

~~~bash
mkdir -p ~/lab/myapp && cd ~/lab/myapp
git init
ls -a
git status
~~~

[[-p]] (parents) بتعمل [[lab]] و [[myapp]] الاتنين لو مش موجودين، ومبتشتكيش لو موجودين. و [[~]] فولدرك الرئيسي. و [[ls -a]] بيوري [[.git]] المخفي. في PowerShell: [[mkdir ~/lab/myapp]] بيعمل الفولدرات اللي في النص لوحده، و [[ls -Force]] بيوري المخفي.

---

## الخلاصة

| | [[git init]] | [[git clone URL]] |
|---|---|---|
| بيشتغل فين | جوه الفولدر اللي عايزه repo | برا، وبيعمل فولدر جديد |
| التاريخ | فاضي | كامل من أول commit |
| [[origin]] | مفيش لحد ما تضيفه | متسجّل لوحده |

> قبل أي init: [[pwd]]. متعملش init في فولدرك الرئيسي، ومتعملش clone جوه repo تاني.`,
          lines: [
            "اعمل فولدر وادخله. [[&&]] يعني «لو الأول نجح، اعمل التاني».",
            "حوّل الفولدر لمشروع Git.",
            "نزّل مشروع موجود من GitHub بكل تاريخه (بـ HTTPS).",
            "نفسه بس بـ SSH، وده من غير باسورد لو عامل مفتاح."
          ],
          sol: R`[[git init]] بيطبع [[Initialized empty Git repository in .../myapp/.git/]]. و [[ls -a]] بيوري فولدر [[.git]]، و [[git status]] بيقول [[On branch main]] و [[No commits yet]].

لو طلعلك [[On branch master]] يبقى [[init.defaultBranch]] مش متظبط (ارجع لدرس git config)، أو غيّر الفرع دلوقتي بـ [[git branch -m main]].

الغلط الشائع: تعمل init جوه فولدر هو أصلًا جوه repo تاني (أو في الـ home كله)، فكل ملفاتك تبان untracked. [[git rev-parse --show-toplevel]] بيقولك الـ repo اللي انت فيه جذره فين، ولو مش الفولدر اللي انت قاصده امسح الـ [[.git]] الغلط.`,
          solCode: R`mkdir -p ~/lab/myapp && cd ~/lab/myapp
git init
ls -a
git status`
        },
        {
          cmd: "git status",
          title: "إيه اللي اتغير",
          desc: "أكتر أمر هتكتبه. بيقسم الملفات لتلات حاجات: untracked (جديد و Git مش متابعه)، و modified (اتعدل ولسه مش متجهز)، و staged (متجهز للـ commit). [[-s]] نسخة مختصرة.",
          example: R`git status
git status -s`,
          try: "اعمل ملف جديد وعدّل ملف قديم، وشوف كل واحد ظاهر فين.",
          deep: {
            why: "قبل أي commit محتاج تعرف: إيه اللي اتغير؟ وإيه اللي هيدخل في الـ commit وإيه اللي لأ؟ [[git status]] أكتر أمر هتكتبه في Git.",
            how: R`عشان تفهم [[status]] لازم تفهم إن Git فيه ٣ «أماكن» للملفات:

الأول الـ working directory: الملفات زي ما هي على جهازك دلوقتي، وانت بتعدّل فيها.

التاني اسمه staging area (أو index): منطقة تحضير. لما تعمل [[git add]]، الملف بينتقل هنا، ومعناه «ده هيدخل في الـ commit الجاي».

التالت الـ repo: الـ commits المحفوظة.

و [[git status]] بيقارن التلاتة ويقولك: «Changes to be committed» يعني ملفات في منطقة التحضير وهتدخل الـ commit. و «Changes not staged» يعني ملفات اتعدّلت بس لسه معملتلهاش add. و «Untracked files» يعني ملفات جديدة Git عمره ما شافها قبل كده.

وكمان بيقولك انت على أنهي branch، وفرقك عن GitHub كام commit.`,
            when: "قبل كل [[add]] وقبل كل [[commit]]، عشان تتأكد إنك مش هتحفظ حاجة مش عايزها. وبعد أي أمر Git مش متأكد عمل إيه.",
            mistakes: "إنك متبصش عليه قبل الـ commit، فتحفظ ملف .env أو ملفات مؤقتة بالغلط. عوّد نفسك: [[status]] الأول دايمًا."
          },
          teach: R`## الأول: [[git status]] بيقارن ٣ نسخ

[[git status]] مبيغيّرش حاجة، بيسأل بس. بيقارن ملفاتك (working directory) بمنطقة التحضير (staging area) بآخر commit، ويقولك كل ملف فين. عشان نشوفه بجد، عملت repo فيه ملف [[old.txt]] متعمله commit، وبعدين عدّلته وعملت ملف جديد [[new.txt]]. الناتج من ويندوز (Git 2.56)، ونفس الكلام في أي ترمنال وعلى لينكس.

---

## ١. [[git status]] الكامل

~~~text الناتج
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   old.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	new.txt

no changes added to commit (use "git add" and/or "git commit -a")
~~~

### نقراه حتة حتة

| الجزء | معناه |
|---|---|
| [[On branch main]] | انت على branch اسمها main |
| [[Changes not staged for commit]] | ملفات Git متابعها واتعدّلت، بس لسه معملتلهاش add |
| [[modified:   old.txt]] | الملف ده بالذات اتعدّل |
| [[Untracked files]] | ملفات جديدة Git عمره ما حفظها |
| [[no changes added to commit]] | منطقة التحضير فاضية، فلو عملت commit دلوقتي مش هيتحفظ حاجة |

والسطور اللي بين قوسين [[(use "git add <file>...")]] نصايح: Git بيقولك الأمر اللي بعده. [[<file>]] يعني «حط اسم الملف هنا».

---

## ٢. بعد [[git add old.txt]]

الملف بيتنقل لقسم جديد:

~~~text الناتج (جزء)
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	modified:   old.txt
~~~

[[Changes to be committed]] = ده اللي هيدخل الـ commit الجاي. والنصيحة اتغيرت: لو عايز ترجّعه من التحضير، [[git restore --staged]].

---

## ٣. [[git status -s]]

[[-s]] اختصار [[--short]]: سطر لكل ملف، وقبله حرفين.

~~~text الناتج قبل الـ add
 M old.txt
?? new.txt
~~~

الحرفين دول عمودين، ولازم تقراهم كده:

~~~text
عمود ١ = منطقة التحضير (staged)    عمود ٢ = ملفاتك (لسه مش staged)
 M old.txt     → عمود ١ فاضي، عمود ٢ M: اتعدّل ولسه مجهزتوش
?? new.txt     → ملف جديد Git مش متابعه
~~~

وبعد [[git add old.txt]]:

~~~text الناتج
M  old.txt
?? new.txt
~~~

الـ M نقلت للعمود الأول: متجهز. ولو عدّلت [[old.txt]] تاني بعد الـ add:

~~~text الناتج
MM old.txt
?? new.txt
~~~

[[MM]] يعني جزء متجهز (اللي عملتله add) وجزء جديد لسه لأ. لو عملت commit دلوقتي، الجزء الأول بس اللي هيدخل.

| الحرفين | معناهم |
|---|---|
| [[??]] | جديد، Git مش متابعه |
| [[ M]] | اتعدّل، مش متجهز |
| [[M ]] | اتعدّل ومتجهز |
| [[MM]] | متجهز واتعدّل تاني بعدها |
| [[A ]] | ملف جديد اتعمله add (Added) |
| [[D ]] أو [[ D]] | اتمسح (Deleted)، متجهز أو لأ |

---

## ٤. السطر الغريب ده على ويندوز

لو بتعمل الملفات من Git Bash على ويندوز هتشوف ساعات:

~~~text الناتج
warning: in the working copy of 'old.txt', LF will be replaced by CRLF the next time Git touches it
~~~

ده مش خطأ. ويندوز ولينكس بيختموا السطر بشكل مختلف، و Git for Windows متظبط إنه يحوّل. تفاصيلها في درس «.gitattributes».

---

## الخلاصة

~~~text
git status      الشرح الكامل، ومعاه الأمر اللي بعده
git status -s   سطر لكل ملف: عمود التحضير ثم عمود ملفاتك
??              جديد       M في العمود الأول   متجهز للـ commit
~~~

اكتبه قبل كل [[add]] وقبل كل [[commit]].`,
          lines: [
            "إيه اللي اتغير من آخر commit؟ وإيه اللي متجهز؟",
            "نفسه بشكل مختصر ([[-s]] short)، حرفين قبل كل ملف."
          ],
          sol: R`الملف الجديد بيظهر تحت [[Untracked files]]، والقديم اللي عدّلته تحت [[Changes not staged for commit]] جنبه [[modified:]]. وفي [[git status -s]] الشكل:

[[ M old.txt]] (الـ M في العمود التاني: اتعدّل ولسه مش staged) و [[?? new.txt]] (جديد و Git مش متابعه).

بعد [[git add old.txt]] الـ M بتنقل للعمود الأول: [[M  old.txt]]، ومعناها staged. لو ملف ظهر [[MM]] يبقى عملت add وبعدين عدّلت تاني، فجزء متجهز وجزء لأ. ولو الملف الجديد مش ظاهر خالص، غالبًا متسمّي في [[.gitignore]].`
        },
        {
          cmd: "git add / commit",
          title: "احفظ نقطة في التاريخ",
          desc: "[[add]] بيجهز التعديلات، و [[commit]] بيحفظها برسالة. اكتب الرسالة بتوصف عملت إيه، زي «add login validation» مش «update». و [[add -p]] بيعرض عليك كل تعديل لوحده تختار تضيفه ولا لأ، وده بيخلي كل commit فيه حاجة واحدة بس.",
          example: R`git add index.js
git add .
git add -p
git commit -m "add login validation"`,
          try: "اعمل تلات commits، كل واحد فيه تعديل واحد بس.",
          deep: {
            why: "ده قلب Git: إنك تحفظ «نقطة» في تاريخ المشروع ترجعلها في أي وقت، ومعاها رسالة بتقول عملت إيه.",
            how: R`الحفظ في Git خطوتين، مش خطوة واحدة، وده عن قصد.

[[git add]] بينقل التعديلات لمنطقة التحضير. تشبيه: بتحط حاجات في شنطة. تقدر تحط ملف ملف، وتختار إيه يدخل وإيه ميدخلش.

[[git commit]] بياخد كل اللي في الشنطة ويحفظه كنقطة واحدة في التاريخ. والنقطة دي بتاخد رقم فريد اسمه hash (زي [[a1b2c3d]])، وفيها: صورة كاملة من المشروع، والرسالة، ومين عملها، وإمتى، وأنهي commit قبلها.

ليه خطوتين؟ عشان لو عدّلت ٥ ملفات في حاجتين مختلفتين (إصلاح bug وميزة جديدة)، تقدر تعمل commit للإصلاح لوحده، وبعدين commit للميزة لوحدها. كده التاريخ بيبقى واضح، ولو الميزة عملت مشكلة ترجع فيها من غير ما تلمس الإصلاح.

و [[add -p]] بيروح أبعد: بيوريك كل تعديل جوه الملف لوحده ويسألك تضيفه ولا لأ.`,
            when: "كل ما تخلّص حاجة صغيرة شغالة: ميزة، أو إصلاح، أو تعديل. commits صغيرة كتير أحسن من commit واحد ضخم في آخر اليوم.",
            mistakes: "رسايل زي «update» أو «fix» أو «asdf». بعد شهر مش هتعرف ده كان إيه. اكتب إيه اللي اتغير: «fix login redirect after logout». ولو عايز صيغة ثابتة للفريق كله، شوف Conventional Commits و commitlint في تاب فحص الكود. و [[git add .]] من غير ما تبص على [[status]]، فتضيف حاجات مش عايزها."
          },
          teach: R`## الأول: الحفظ خطوتين

[[git add]] بيحط التعديل في منطقة التحضير (الشنطة)، و [[git commit]] بيقفل الشنطة ويحفظها نقطة في التاريخ. كل الناتج تحت من repo تجربة على ويندوز (Git 2.56)، والأوامر نفسها في أي ترمنال.

---

## ١. [[git add index.js]]

ضيف الملف ده بس. مبيطبعش حاجة لو نجح، وتتأكد بـ [[git status -s]] (الحرف في العمود الأول). وتقدر تكتب أكتر من ملف: [[git add a.js b.js]].

## ٢. [[git add .]]

النقطة [[.]] معناها «الفولدر الحالي وكل اللي جواه». فبيضيف كل تعديل وكل ملف جديد تحت مكانك، ما عدا اللي في [[.gitignore]]. وفيه [[git add -A]] (all): كل الـ repo حتى لو انت واقف في فولدر جوه. والاتنين بيضيفوا كمان الملفات اللي اتمسحت.

> قبل [[git add .]] بص على [[git status]]، وإلا هتضيف ملفات مش قاصدها.

---

## ٣. [[git add -p]]

[[-p]] اختصار [[--patch]]. بدل ما يضيف الملف كله، بيقسمه «حتت» (hunks)، كل حتة تعديل في مكان، ويسألك على كل واحدة. جربته على ملف فيه تعديلين بعاد عن بعض، الأول إصلاح bug والتاني ميزة:

~~~text الناتج
@@ -1,4 +1,4 @@
-l1
+L1 fix bug
 l2
 l3
 l4
(1/2) Stage this hunk [y,n,q,a,d,k,K,j,J,g,/,e,p,P,?]? y
@@ -7,4 +7,4 @@ l6
 l7
 l8
 l9
-l10
+L10 new feature
(2/2) Stage this hunk [y,n,q,a,d,K,J,g,/,e,p,P,?]? n
~~~

[[(1/2)]] يعني الحتة الأولى من اتنين. و [[-]] السطر القديم و [[+]] الجديد (التفاصيل في درس git diff). أهم الحروف:

| الحرف | معناه |
|---|---|
| [[y]] | yes، ضيف الحتة دي |
| [[n]] | no، سيبها |
| [[q]] | quit، اخرج وسيب الباقي |
| [[a]] | ضيف دي وكل اللي بعدها في الملف |
| [[s]] | split، قسّم الحتة لأصغر (بيظهر لما ينفع) |
| [[?]] | اشرحلي كل حرف |

بعدها [[git status -s]] بيقول [[MM p.txt]]: الإصلاح متجهز والميزة لأ. كده تعمل commit للإصلاح لوحده.

---

## ٤. [[git commit -m "add login validation"]]

[[-m]] (message) والرسالة بين علامات تنصيص. من غير [[-m]]، Git بيفتح المحرر (اللي في [[core.editor]]) تكتب فيه الرسالة. وده ناتج أول ٣ commits في الـ repo:

~~~text الناتج
[main (root-commit) 67c4ee3] add a
 1 file changed, 1 insertion(+)
 create mode 100644 a.txt
[main 38e486c] add b
 1 file changed, 1 insertion(+)
 create mode 100644 b.txt
[main 0bf4c4e] update a
 1 file changed, 1 insertion(+)
~~~

| الحتة | معناها |
|---|---|
| [[main]] | الـ branch اللي اتحفظ عليها |
| [[(root-commit)]] | ده أول commit في الـ repo (ملوش أب) |
| [[67c4ee3]] | الـ hash المختصر بتاع الـ commit الجديد |
| [[add a]] | رسالتك |
| [[1 file changed, 1 insertion(+)]] | ملف واحد اتغير، وسطر واحد اتضاف |
| [[create mode 100644 a.txt]] | الملف جديد في الـ repo، و [[100644]] معناها ملف عادي (السكربت القابل للتشغيل [[100755]]) |

---

## ٥. لما تنسى الـ add

~~~text git commit -m "x" بعد تعديل ملف قديم من غير add
Changes not staged for commit:
...
	modified:   a.txt

no changes added to commit (use "git add" and/or "git commit -a")
~~~

~~~text git commit -m "x" وفيه ملف جديد بس
Untracked files:
...
	n.txt

nothing added to commit but untracked files present (use "git add" to track)
~~~

الاتنين بيرجعوا exit code [[1]] ومبيحفظوش حاجة. [[git commit -a]] اللي في النصيحة بيعمل add لكل ملف Git **متابعه أصلًا** وبعدين commit، بس مش بياخد الملفات الجديدة.

---

## ٦. الـ solCode

~~~bash
echo a > a.txt && git add a.txt && git commit -m "add a"
echo b > b.txt && git add b.txt && git commit -m "add b"
echo a2 >> a.txt && git add a.txt && git commit -m "update a"
git log --oneline
~~~

[[echo a > a.txt]] بيكتب [[a]] في ملف جديد (لو موجود بيمسح اللي فيه)، و [[>>]] بيضيف في الآخر من غير ما يمسح. و [[&&]] بتوقف السلسلة لو خطوة فشلت. الناتج الأخير:

~~~text الناتج
0bf4c4e update a
38e486c add b
67c4ee3 add a
~~~

### في PowerShell

| | PowerShell 7 | Windows PowerShell 5.1 |
|---|---|---|
| [[&&]] | شغالة | مش موجودة، افصل بـ [[;]] أو سطور |
| [[echo a > a.txt]] | ملف نصي عادي | ملف UTF-16، و Git بيشوفه binary |

جرّبت السطور دي في 5.1 وبعدين [[git diff --stat]]:

~~~text الناتج في PowerShell 5.1
 a.txt | Bin 8 -> 16 bytes
 1 file changed, 0 insertions(+), 0 deletions(-)
~~~

[[Bin]] يعني Git مش قادر يوريك السطور. في 5.1 اكتب الملفات بـ [[Set-Content a.txt a]] و [[Add-Content a.txt a2]] بدل [[>]] و [[>>]]، أو استخدم PowerShell 7.

---

## الخلاصة

| الأمر | بيضيف إيه |
|---|---|
| [[git add FILE]] | الملف ده |
| [[git add .]] | كل حاجة تحت الفولدر الحالي |
| [[git add -A]] | كل حاجة في الـ repo |
| [[git add -p]] | حتت بتختارها انت |
| [[git commit -m "..."]] | يحفظ اللي في التحضير بس |

commit = حاجة واحدة ورسالة بتقول عملت إيه.`,
          lines: [
            "جهّز ملف واحد للحفظ.",
            "جهّز كل التعديلات في الفولدر.",
            "[[-p]] patch: اعرض كل تعديل لوحده واسألني أضيفه ولا لأ (y أو n).",
            "احفظ نقطة برسالة بتوصف التعديل."
          ],
          sol: R`كل commit بيطبع سطر زي [[[main 8a61323] edit old]] وتحته [[1 file changed, 1 insertion(+)]]. وفي الآخر [[git log --oneline]] المفروض يوري تلات سطور، كل سطر رسالة واضحة بتوصف تعديل واحد، الأحدث فوق.

المقصود من التمرين إن كل commit يبقى فيه حاجة واحدة، فلو حبيت ترجّع واحد منهم بعدين ترجّعه لوحده. استخدم [[git add ملف]] أو [[git add -p]] عشان تختار، مش [[git add .]] على كل حاجة.

الغلط الشائع: تنسى الـ add. لو كنت عدّلت ملف git متابعه أصلًا، [[git commit -m "..."]] هيطبع [[no changes added to commit (use "git add" and/or "git commit -a")]]. ولو الملف جديد خالص، هيطبع [[nothing added to commit but untracked files present (use "git add" to track)]]. الاتنين معناهم: اعمل [[git add]] الأول. ولو [[git log]] وراك commit فيه ٣ ملفات مالهمش علاقة ببعض، يبقى عملت add لكله مرة واحدة.`,
          solCode: R`echo a > a.txt && git add a.txt && git commit -m "add a"
echo b > b.txt && git add b.txt && git commit -m "add b"
echo a2 >> a.txt && git add a.txt && git commit -m "update a"
git log --oneline`
        },
        {
          cmd: "git log",
          title: "التاريخ",
          desc: "[[--oneline]] سطر لكل commit، و [[--graph --all]] بيرسم الـ branches. الرقم اللي في أول كل سطر هو الـ hash، ودي البصمة اللي بتستخدمها عشان تشاور على commit معين.",
          example: R`git log
git log --oneline
git log --oneline --graph --all
git log -p index.js
git show a1b2c3d`,
          try: "اعرض التاريخ بالشكل المختصر، وافتح commit منهم بـ [[git show]].",
          deep: {
            why: "عشان تشوف تاريخ المشروع: مين عمل إيه، وإمتى، وليه. ولما حاجة تبوظ، تعرف آخر مرة كانت شغالة فيها.",
            how: R`كل commit بيشاور على الـ commit اللي قبله، فبيعملوا سلسلة. [[git log]] بيبدأ من آخر commit ويمشي لورا في السلسلة ويعرضهم.

كل commit ليه رقم طويل اسمه hash، زي [[a1b2c3d4e5...]]. الرقم ده بيتحسب من محتوى الـ commit كله، فمستحيل اتنين يبقوا بنفس الرقم، ولو حد غيّر حاجة في commit قديم، رقمه هيتغير. وعادةً أول ٧ حروف كفاية عشان تشاور عليه.

[[--oneline]] بيعرض كل commit في سطر (الرقم المختصر والرسالة). و [[--graph --all]] بيرسم الـ branches بخطوط، فتشوف فين اتفرعت وفين اتدمجت. و [[-p file]] بيوريك التعديلات نفسها اللي حصلت في ملف معين عبر الزمن. و [[git show hash]] بيفتح commit واحد بكل تفاصيله.

وهو بيفتح جوه [[less]]، فـ q للخروج.`,
            when: "عايز تعرف امتى اتغيرت حاجة. تجيب رقم commit عشان ترجعله أو تشوفه. تراجع شغلك قبل ما ترفعه.",
            mistakes: "إنك متعرفش تخرج منه: q. ورسايل commits مش واضحة بتخلي [[log]] ملوش أي فايدة."
          },
          teach: R`## الأول: [[git log]] بيمشي لورا

كل commit فيه رقم الـ commit اللي قبله، فبيعملوا سلسلة. [[git log]] بيبدأ من آخر commit ويمشي لورا. الناتج تحت من repo تجربة على ويندوز (Git 2.56) فيه ٤ commits على main و branch اسمها [[feature/login]]، ونفس الشكل على لينكس.

---

## ١. [[git log]]

~~~text git log -n 1
commit c4f142a073a3ff9a302e1041dd306033245aa2f0
Author: Your Name <you@example.com>
Date:   Tue Oct 6 13:33:41 2026 +0300

    p
~~~

| السطر | معناه |
|---|---|
| [[commit c4f142a0...]] | الـ hash الكامل: ٤٠ حرف بيتحسبوا من محتوى الـ commit كله |
| [[Author:]] | الاسم والإيميل اللي في [[git config]] |
| [[Date:]] | الوقت، و [[+0300]] فرق التوقيت عن جرينتش |
| السطر المزاح لجوه | رسالة الـ commit |

لما الـ log أطول من الشاشة بيفتح في برنامج اسمه [[less]] (الـ pager): بتنزل بالأسهم أو المسافة، و [[q]] للخروج. ده نفس الكلام في Git Bash و PowerShell.

---

## ٢. [[git log --oneline]]

سطر لكل commit: الـ hash المختصر (أول ٧ حروف) والرسالة.

~~~text الناتج
ac7013e fix a
c4f142a p
0bf4c4e update a
38e486c add b
67c4ee3 add a
~~~

في الترمنال بتشوف كمان [[(HEAD -> main)]] جنب آخر commit: ده معناه انت واقف هنا وعلى main. (لما توجّه الناتج لملف أو pipe، Git بيشيل الزينة دي.)

---

## ٣. [[git log --oneline --graph --all]]

- [[--graph]]: ارسم خطوط تبين مين اتفرّع من مين.
- [[--all]]: كل الـ branches، مش اللي انت عليها بس.

~~~text الناتج
* 4707e05 add login page
| * ac7013e fix a
|/  
* c4f142a p
* 0bf4c4e update a
* 38e486c add b
* 67c4ee3 add a
~~~

اقراه من تحت لفوق: ٤ commits في خط واحد لحد [[c4f142a]]. هنا الخط اتفرّع ([[|/]]): فرع فيه [[fix a]] (ده main)، وفرع فيه [[add login page]] (ده feature/login). كل [[*]] commit، والخطوط [[|]] و [[/]] بتوصّلهم بأبهاتهم.

---

## ٤. [[git log -p index.js]]

[[-p]] (patch) بيوري التعديل نفسه تحت كل commit، واسم الملف بعدها بيقصر التاريخ على الملف ده بس. جربته على [[a.txt]] مع [[--oneline]]:

~~~text git log --oneline -p a.txt (جزء)
ac7013e fix a
diff --git a/a.txt b/a.txt
...
@@ -1,2 +1,3 @@
 a
 a2
+c
0bf4c4e update a
...
 a
+a2
67c4ee3 add a
...
+a
~~~

يعني الملف ده اتغيّر في ٣ commits بس، وكل واحد ضاف سطر. كده بتعرف سطر معين دخل إمتى.

---

## ٥. [[git show a1b2c3d]]

بيفتح commit واحد: نفس رأس [[git log]] وتحته الـ diff بتاعه. [[a1b2c3d]] في المثال مثال، حط hash من عندك:

~~~text git show 0bf4c4e
commit 0bf4c4e4e89ae31afe7d9b7012ef0457e8574fd9
Author: Your Name <you@example.com>
Date:   Tue Oct 6 13:33:40 2026 +0300

    update a

diff --git a/a.txt b/a.txt
index 7898192..9ad2ebb 100644
--- a/a.txt
+++ b/a.txt
@@ -1 +1,2 @@
 a
+a2
~~~

كتبت ٧ حروف بس، و Git كمّل الـ hash لوحده. وتقدر تشاور بالمكان بدل الرقم: [[git show HEAD]] آخر commit، و [[HEAD~1]] اللي قبله. ولو عايز ملخص من غير الـ diff: [[git show --stat HEAD]].

---

## الخلاصة

| الأمر | بيوري |
|---|---|
| [[git log]] | كل commit بالتفصيل (q للخروج) |
| [[git log --oneline]] | سطر لكل commit |
| [[git log --oneline --graph --all]] | الـ branches مرسومة |
| [[git log -p FILE]] | تاريخ ملف واحد بالتعديلات |
| [[git show HASH]] | commit واحد بالـ diff بتاعه |`,
          lines: [
            "اعرض كل الـ commits بالتفاصيل. q للخروج.",
            "كل commit في سطر: الرقم (hash) والرسالة.",
            "ارسم الـ branches بخطوط ([[--graph]]) لكل الـ branches ([[--all]]).",
            "تاريخ ملف واحد، والتعديلات نفسها ([[-p]]).",
            "اعرض commit واحد برقمه: مين عمله وإمتى وغيّر إيه."
          ],
          sol: R`[[git log --oneline]] بيطلّع سطر لكل commit: أول ٧ حروف من الرقم والرسالة، والأحدث فوق، والأحدث جنبه [[(HEAD -> main)]].

[[git show 8a61323]] (أو أي رقم نسخته) بيعرض [[commit]] والرقم كامل، و [[Author:]] و [[Date:]] والرسالة، وتحتهم الـ diff بتاع الـ commit ده بس: السطور اللي اتضافت بـ [[+]] واللي اتشالت بـ [[-]].

لو [[git log]] فتح شاشة ومش راضي يخلص، ده الـ pager: اضغط [[q]]. ولو [[git show]] قال [[unknown revision]] يبقى الرقم متنسخ غلط أو من repo تاني.`
        },
        {
          cmd: "git diff",
          title: "الفرق بالظبط",
          desc: R`[[git diff]] بيوريك الفرق سطر بسطر: السطور اللي قدامها [[+]] اتضافت، واللي قدامها [[-]] اتشالت، والسطور اللي حواليهم من غير علامة عشان تعرف المكان. السطر اللي شكله [[@@ -4,3 +4,4 @@]] فوق كل حتة بيقولك أرقام السطور دي في النسخة القديمة والجديدة.

من غير حاجة بعده، بيقارن ملفاتك بمنطقة التحضير، يعني التعديلات اللي لسه معملتلهاش [[add]]. [[--staged]] بيقارن منطقة التحضير بآخر commit، يعني بالظبط اللي هيدخل الـ commit لو عملته دلوقتي. عشان كده بعد [[git add]] الأمر العادي بيطلع فاضي، والتعديل بيبان في [[--staged]]. ولو كتبت اسمين branches بعده، بيقارن بينهم.

عوّد نفسك على [[git diff --staged]] قبل كل commit وتقرا كل سطر: هتمسك console.log نسيته، أو باسورد في ملف. ولو الناتج طويل بيفتح في less، و q للخروج.`,
          example: R`git diff
git diff --staged
git diff main feature/login`,
          try: "عدّل ملف، شوف diff، اعمل add، وشوف [[diff]] و [[diff --staged]] تاني.",
          deep: {
            why: "عشان تشوف بالظبط إيه اللي اتغير، سطر سطر، قبل ما تحفظه. دي أهم عادة تمنعك من إنك تعمل commit لحاجة غلط.",
            how: R`[[diff]] بيقارن نسختين من الملفات، ويعرض الفرق: السطور اللي عليها [[+]] (خضرا غالبًا) اتضافت، واللي عليها [[-]] (حمرا) اتشالت. وسطور حوالين التعديل من غير علامة عشان تفهم مكانه.

والمهم تعرف أنهي نسختين بيقارنهم، وده مربوط بالتلات أماكن اللي في [[status]]:

[[git diff]] لوحده بيقارن ملفاتك دلوقتي بمنطقة التحضير، يعني التعديلات اللي لسه معملتلهاش add.

[[git diff --staged]] بيقارن منطقة التحضير بآخر commit، يعني بالظبط اللي هيدخل الـ commit لو عملته دلوقتي.

وعشان كده لو عملت add لكل حاجة، [[git diff]] لوحده هيطلع فاضي، وده بيلخبط ناس كتير.

و [[git diff branch1 branch2]] بيقارن branchين ببعض.`,
            when: "قبل كل commit: [[git diff --staged]] وتقرا كل سطر. هتلاقي console.log نسيته، أو تعديل مكانش مقصود.",
            mistakes: "إنك تشغّل [[git diff]] بعد ما عملت add، فتلاقيه فاضي وتفتكر مفيش تعديلات. استخدم [[--staged]]."
          },
          teach: R`## الأول: [[diff]] بيقارن نسختين

السؤال دايمًا: **بين أنهي نسختين؟** الأوامر التلاتة في المثال بيقارنوا حاجات مختلفة. الناتج تحت من repo تجربة على ويندوز (Git 2.56): ضفت سطر [[d]] في آخر [[b.txt]].

---

## ١. [[git diff]]: ملفاتك ضد منطقة التحضير

~~~text الناتج
diff --git a/b.txt b/b.txt
index 6178079..c3219eb 100644
--- a/b.txt
+++ b/b.txt
@@ -1 +1,2 @@
 b
+d
~~~

### نقراه سطر سطر

| السطر | معناه |
|---|---|
| [[diff --git a/b.txt b/b.txt]] | بنقارن [[a/]] (القديم) بـ [[b/]] (الجديد) لنفس الملف |
| [[index 6178079..c3219eb 100644]] | بصمة محتوى الملف قبل وبعد، و [[100644]] ملف عادي |
| [[--- a/b.txt]] و [[+++ b/b.txt]] | السطور اللي عليها [[-]] من القديم، واللي عليها [[+]] من الجديد |
| [[@@ -1 +1,2 @@]] | القديم: من سطر 1 وطوله سطر واحد. الجديد: من سطر 1 وطوله سطرين |
| [[ b]] (بمسافة) | سطر متغيرش، موجود عشان تعرف المكان |
| [[+d]] | سطر اتضاف |

لما الطول ١ Git بيكتب الرقم لوحده: [[-1]] يعني [[-1,1]]. وفي الترمنال [[+]] بيبقى أخضر و [[-]] أحمر.

---

## ٢. [[git diff --staged]]: التحضير ضد آخر commit

ده بالظبط اللي هيدخل الـ commit لو عملته دلوقتي. ([[--cached]] اسم تاني لنفس الحاجة.) شوف التسلسل:

| الخطوة | [[git diff]] | [[git diff --staged]] |
|---|---|---|
| بعد التعديل، قبل add | بيوري [[+d]] | فاضي |
| بعد [[git add b.txt]] | فاضي | بيوري [[+d]] |
| بعد [[git commit]] | فاضي | فاضي |

التعديل مختفاش بعد الـ add، هو نقل من خانة لخانة. لو [[git diff]] طلع فاضي واتخضّيت، جرّب [[--staged]].

---

## ٣. [[git diff main feature/login]]: branch ضد branch

بيقارن آخر commit في الاتنين. عندي feature/login فيها [[login.js]]، و main اتضاف عليها حاجات بعد التفرّع:

~~~text git diff main feature/login --stat
 a.txt    | 1 -
 b.txt    | 1 -
 login.js | 1 +
 3 files changed, 1 insertion(+), 2 deletions(-)
~~~

[[--stat]] ملخص: كل ملف وكام سطر اتضاف ([[+]]) واتشال ([[-]]). بس استنى: feature/login مشالتش حاجة من a.txt! اللي حصل إن main **ضافت** سطور بعد التفرّع، فالمقارنة المباشرة بتبينها كأن الـ feature شالتها.

لو عايز «الـ branch دي عملت إيه من ساعة ما اتفرّعت» استخدم ٣ نقط:

~~~text git diff main...feature/login --stat
 login.js | 1 +
 1 file changed, 1 insertion(+)
~~~

[[...]] بيقارن بنقطة التفرّع، وده نفس اللي GitHub بيوريه في الـ Pull Request.

---

## ٤. ملف واحد بس

أي [[diff]] تقدر تقصره على ملف: [[git diff main feature/login -- login.js]]. الـ [[--]] بتفصل أسامي الـ branches عن أسامي الملفات.

---

## الخلاصة

~~~text
git diff                    ملفاتك      ضد  التحضير       (اللي لسه معملتلوش add)
git diff --staged           التحضير     ضد  آخر commit    (اللي هيدخل الـ commit)
git diff A B                آخر A       ضد  آخر B
git diff A...B              نقطة التفرّع ضد  آخر B         (شغل B بس)
~~~

عادة كويسة: [[git diff --staged]] قبل كل commit، واقرا كل [[+]].`,
          lines: [
            "الفرق في التعديلات اللي لسه متجهزتش.",
            "الفرق في التعديلات اللي جهزتها بـ add.",
            "الفرق بين branchين."
          ],
          sol: R`بعد التعديل: [[git diff]] بيوري السطر الجديد بـ [[+]] (زي [[+c]])، و [[git diff --staged]] فاضي.

بعد [[git add]] بتتقلب: [[git diff]] بقى فاضي (مفيش حاجة مش متجهزة)، و [[git diff --staged]] هو اللي بيوري نفس الـ [[+c]]. يعني [[diff]] = الشغل اللي لسه مجهزتوش، و [[--staged]] = اللي هيدخل الـ commit الجاي.

الغلط الشائع إنك تعمل add وبعدين [[git diff]] يطلع فاضي فتفتكر التعديل ضاع. هو موجود في الـ staging، شوفه بـ [[--staged]].`
        },
        {
          cmd: ".gitignore",
          title: "ملفات Git ميشوفهاش",
          desc: "أي ملف أو فولدر مكتوب فيه Git بيتجاهله. node_modules و .env لازم يبقوا فيه من أول يوم. لو .env اتعمله commit بالغلط، [[rm --cached]] بيشيله من Git ويسيبه على جهازك. بس خد بالك: هو لسه موجود في التاريخ القديم، فغيّر أي باسورد أو key كان فيه.",
          example: R`printf "node_modules/\n.env\ndist/\n*.log\n" > .gitignore
git status
git rm --cached .env
git commit -m "stop tracking .env"`,
          try: "اعمل .env وملف log وتأكد إن [[git status]] مش شايفهم.",
          deep: {
            why: "فيه ملفات مينفعش تدخل Git أبدًا: [[node_modules]] (ضخم وبيترجع بـ npm install)، و [[.env]] (فيه باسوردات)، وملفات الـ build واللوجات. [[.gitignore]] بيقول لـ Git «متشوفش دول خالص».",
            how: R`[[.gitignore]] ملف نصي عادي في أول المشروع، وكل سطر فيه pattern. [[node_modules/]] أي فولدر بالاسم ده، و [[*.log]] أي ملف بينتهي بـ .log، و [[.env]] الملف ده بالظبط.

الملفات دي Git مش هيعرضها في [[status]]، و [[git add .]] مش هيضيفها.

بس فيه نقطة لازم تفهمها كويس: [[.gitignore]] بيأثر بس على الملفات اللي Git «مش متابعها». لو ملف دخل commit قبل كده، Git بيفضل يتابعه حتى لو ضفته في [[.gitignore]] بعدين. عشان كده فيه [[git rm --cached]]: بيقول لـ Git «بطّل تتابع الملف ده»، والملف نفسه بيفضل على جهازك.

وحتى بعد كده، الملف لسه موجود في الـ commits القديمة. فلو كان فيه باسوردات واترفعوا على GitHub، اعتبرهم اتسربوا وغيّرهم.`,
            when: "أول حاجة في أي مشروع جديد، قبل أول commit. وفيه قوالب جاهزة لكل لغة (ابحث عن «gitignore node» على GitHub).",
            mistakes: "إنك تعمل الـ [[.gitignore]] بعد ما [[.env]] أو [[node_modules]] اترفعوا، وتفتكر إن ده كفاية. ومفاتيح اتسربت في تاريخ Git ومتغيرتش. و [[!]] في أول السطر بترجّع ملف اتجاهل: [[.env.*]] وبعده [[!.env.example]] يتجاهل كل ملفات البيئة ما عدا القالب. لو كتبتها بالـ backslash قبل علامة التعجب، بقت اسم ملف حرفي بيبدأ بعلامة تعجب، والقالب يفضل متجاهَل."
          },
          teach: R`## الأول: [[.gitignore]] ملف نصي فيه أسامي

كل سطر فيه اسم أو نمط (pattern)، و Git بيتصرف كأن الملفات اللي بتطابقه مش موجودة: مش بتظهر في [[status]]، و [[git add .]] مبياخدهاش. الناتج تحت من repo تجربة على ويندوز (Git 2.56) فيه [[.env]] و [[app.log]] و [[node_modules/]] و [[index.js]].

---

## ١. قبل الـ .gitignore

~~~text git status -s
?? .env
?? app.log
?? index.js
?? node_modules/
~~~

كله ظاهر، و [[git add .]] هياخد الباسوردات والـ node_modules كلها.

---

## ٢. [[printf "node_modules/\n.env\ndist/\n*.log\n" > .gitignore]]

| الحتة | معناها |
|---|---|
| [[printf]] | اطبع الكلام ده بالظبط (أدق من [[echo]] في التعامل مع [[\n]]) |
| [[\n]] | سطر جديد |
| [[>]] | بدل ما تطبعه على الشاشة، اكتبه في ملف (ويمسح اللي كان فيه) |
| [[.gitignore]] | اسم الملف، لازم كده بالظبط وفي أول المشروع |

~~~text cat .gitignore
node_modules/
.env
dist/
*.log
~~~

| السطر | بيطابق إيه |
|---|---|
| [[node_modules/]] | أي فولدر بالاسم ده في أي مكان. الـ [[/]] في الآخر يعني فولدر بس |
| [[.env]] | أي ملف اسمه [[.env]] بالظبط |
| [[dist/]] | فولدر الـ build |
| [[*.log]] | النجمة [[*]] يعني «أي حاجة»، فأي ملف آخره [[.log]] |

---

## ٣. [[git status]] بعدها

~~~text git status -s
?? .gitignore
?? index.js
~~~

الملفات اختفت. ولو عايز تعرف مين خبّى إيه، [[git check-ignore -v]] ([[-v]] verbose):

~~~text git check-ignore -v .env app.log node_modules/m.js
.gitignore:2:.env	.env
.gitignore:4:*.log	app.log
.gitignore:1:node_modules/	node_modules/m.js
~~~

اقرا كل سطر: الملف اللي فيه القاعدة، ورقم السطر، والقاعدة، وبعدها الملف اللي اتخبّى. مثلًا [[app.log]] اتخبّى بسطر 4 ([[*.log]]).

---

## ٤. [[git rm --cached .env]]: لو [[.env]] دخل commit قبل كده

[[.gitignore]] بيأثر على الملفات اللي Git **مش متابعها** بس. عملت commit لـ [[.env]] بالغلط، وبعدين ضفت الـ [[.gitignore]] وعدّلت [[.env]]:

~~~text git status -s
 M .env
?? .gitignore
~~~

لسه ظاهر [[M]]، لأن Git متابعه. الحل:

| الحتة | معناها |
|---|---|
| [[git rm]] | شيل الملف من Git |
| [[--cached]] | من منطقة التحضير بس، وسيب الملف على الديسك |

~~~text الناتج
rm '.env'
~~~

~~~text git status -s
D  .env
?? .gitignore
~~~

[[D]] في العمود الأول: الملف «اتمسح» من Git ومتجهز للـ commit، بس [[ls .env]] لسه بيلاقيه على جهازك. وبعدين الـ commit:

~~~text git commit -m "stop tracking .env"
[main 3045657] stop tracking .env
 1 file changed, 1 deletion(-)
 delete mode 100644 .env
~~~

بس التاريخ القديم لسه فيه الملف:

~~~text git log --oneline --stat -- .env
3045657 stop tracking .env
 .env | 1 -
 1 file changed, 1 deletion(-)
0b2c2d3 oops
 .env | 1 +
 1 file changed, 1 insertion(+)
~~~

أي حد عنده الـ repo يقدر يعمل [[git show 0b2c2d3]] ويشوف الباسورد. فلو اترفع، غيّر الباسورد.

---

## ٥. على ويندوز: [[printf]] مش في PowerShell

[[printf]] موجود في bash و Git Bash بس. وفي PowerShell خد بالك من [[>]]:

~~~powershell
Set-Content .gitignore 'node_modules/', '.env', 'dist/', '*.log'
~~~

[[Set-Content]] بيكتب كل نص في سطر، وده شغال في 5.1 و 7. أما [[>]] في Windows PowerShell 5.1 بيكتب الملف UTF-16، و Git مبيفهموش. جرّبت [['node_modules/','.env' > .gitignore]] في 5.1:

~~~text git status -s بعدها
?? .env
?? .gitignore
?? app.log
~~~

الـ [[.env]] رجع ظاهر، يعني الـ .gitignore مش شغال. وفي PowerShell 7 الـ [[>]] بيكتب UTF-8 فشغال عادي.

---

## الخلاصة

| عايز | اعمل |
|---|---|
| Git ميشوفش ملف جديد | اكتب اسمه في [[.gitignore]] |
| تعرف مين خبّى ملف | [[git check-ignore -v FILE]] |
| ملف كان متابَع وعايز توقفه | [[git rm --cached FILE]] وبعدين commit |
| سر اترفع قبل كده | غيّره، التاريخ لسه فيه |`,
          lines: [
            R`اعمل ملف .gitignore فيه ٤ سطور. [[\n]] معناها سطر جديد.`,
            "اتأكد إن Git مبقاش شايف الملفات دي.",
            "لو .env اتضاف قبل كده بالغلط: شيله من Git ([[--cached]]) وسيبه على جهازك.",
            "احفظ التغيير ده."
          ],
          sol: R`[[git status -s]] المفروض يوري [[?? .gitignore]] بس، ومايظهرش [[.env]] ولا [[app.log]].

للتأكيد: [[git check-ignore -v .env app.log]] بيقولك مين القاعدة اللي خبّتهم: [[.gitignore:2:.env .env]] و [[.gitignore:4:*.log app.log]].

الغلط الشائع: [[.env]] لسه ظاهر كـ [[M .env]] مش [[??]]. ده معناه إنه اتعمله commit قبل كده، و [[.gitignore]] مش بيأثر على ملف Git متابعه أصلًا. الحل [[git rm --cached .env]] وبعدين commit. وافتكر إنه لسه موجود في التاريخ القديم، فلو فيه أسرار غيّرها.`,
          solCode: R`printf "node_modules/\n.env\ndist/\n*.log\n" > .gitignore
echo SECRET=1 > .env && echo x > app.log
git status -s
git check-ignore -v .env app.log`
        }
      ]
    }
  ]
});
