// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
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
    },
    {
      t: "Branches والـ remote",
      l: 2,
      n: "",
      items: [
        {
          cmd: "git switch / branch",
          title: "اشتغل على فرع منفصل",
          desc: R`الـ branch خط شغل موازي: بتعمل فيه commits من غير ما تلمس main، ولما الشغل يخلص ويشتغل بتدمجه. كده main بيفضل دايمًا شغال، وكل ميزة أو إصلاح في branch باسمها، زي [[feature/login]] (الـ [[/]] جزء من الاسم، للتنظيم بس).

[[git branch]] لوحدها بتعرض الـ branches اللي عندك، والنجمة [[*]] جنب اللي انت عليها. [[git switch -c feature/login]] بتعمل branch جديدة من مكانك الحالي وتنقلك لها ([[-c]] يعني create)، و [[git switch main]] بترجّعك، وملفاتك بتتغير لنسخة الـ branch دي. [[-a]] بتعرض كمان الـ branches اللي على GitHub (بتبدأ بـ [[remotes/origin/]]). و [[branch -d]] بتمسح branch اتدمجت خلاص، وبترفض لو لسه متدمجتش.

قبل ما تعمل switch اعمل commit أو stash للتعديلات، وإلا هتمشي معاك أو Git هيرفض. وهتلاقي في شروحات قديمة [[git checkout]] بنفس المعنى.`,
          example: R`git branch
git switch -c feature/login
git switch main
git branch -a
git branch -d feature/login`,
          try: "اعمل branch، اعمل فيها commit، ارجع main ولاحظ إن التعديل مش موجود.",
          deep: {
            why: "عايز تشتغل على ميزة جديدة من غير ما تبوّظ النسخة الشغالة. الـ branch نسخة موازية من المشروع، تجرّب فيها براحتك، ولما تخلص تدمجها.",
            how: R`الـ branch في Git أبسط بكتير مما تتخيل: هو مجرد «اسم» بيشاور على commit معين. زي ورقة ملزوقة على صفحة في كتاب. مفيش نسخ ملفات ولا حاجة، عشان كده عمل branch بياخد جزء من الثانية.

وفيه مؤشر خاص اسمه [[HEAD]]، وده بيقول انت واقف فين دلوقتي. لما تعمل commit جديد، الـ branch اللي انت عليها بتتحرك لقدام وتشاور على الـ commit الجديد، والـ branches التانية بتفضل مكانها.

[[git switch branch]] بيحرّك [[HEAD]] للـ branch دي، ويغيّر ملفاتك على الجهاز عشان تبقى زي آخر commit فيها. و [[switch -c]] بيعمل branch جديدة من مكانك الحالي ويروح لها.

هتلاقي في شروحات قديمة [[git checkout]] بيعمل نفس الحاجة، بس [[switch]] أحدث وأوضح.`,
            when: "كل ميزة أو إصلاح في branch لوحدها: [[feature/login]] أو [[fix/cart-total]]. و main تفضل دايمًا شغالة وجاهزة تترفع.",
            mistakes: "تنقل branch وعندك تعديلات مش محفوظة: Git ممكن يرفض، أو ياخد التعديلات معاك للـ branch التانية وتتلخبط. اعمل commit أو stash الأول. ومسح branch معملتهاش merge: [[-d]] هيرفض ويحميك، إنما [[-D]] الكابيتال هيمسح غصب."
          },
          lines: [
            "اعرض الـ branches، واللي عليها [[*]] انت فيها.",
            "اعمل branch جديدة ([[-c]] create) وروح لها.",
            "ارجع لـ main.",
            "اعرض كل الـ branches حتى اللي على GitHub ([[-a]] all).",
            "امسح branch خلصت ([[-d]] delete)."
          ],
          sol: R`[[git switch -c feature/login]] بيطبع [[Switched to a new branch 'feature/login']]. بعد الـ commit والرجوع بـ [[git switch main]]، [[ls]] مش هيوري الملف الجديد، و [[git branch]] بيوري الاتنين والنجمة جنب [[* main]].

الملف مااتمسحش: هو موجود في commit على الـ branch التاني بس. ارجع لها وهتلاقيه.

الغلط الشائع: تعدّل من غير commit وتعمل switch، فالتعديل يمشي معاك لـ main لأنه لسه مش متسجل في أي branch. أو Git يرفض بـ [[Your local changes ... would be overwritten]]: اعمل commit أو stash الأول.`,
          solCode: R`git switch -c feature/login
echo login > login.js && git add login.js && git commit -m "add login"
git switch main
ls
git branch`
        },
        {
          cmd: "git merge",
          title: "ادمج الـ branch",
          desc: R`الـ merge بياخد الـ commits اللي في branch ويدخّلها في branch تانية. القاعدة: تقف على الـ branch اللي هتستقبل (غالبًا main) بـ [[git switch main]]، وبعدين [[git merge feature/login]] يعني «هات اللي في feature/login هنا».

لو main متحركتش من ساعة ما عملت الـ branch، Git بيحرّك main لقدام بس، ودي اسمها fast-forward ومش بتعمل commit جديد. لو main اتغيرت هي كمان، Git بيعمل merge commit بيجمع الاتنين. ولو الاتنين عدّلوا نفس السطر بشكل مختلف، بيوقف بـ conflict (الدرس الجاي). و [[git log --oneline --graph]] بيرسم التاريخ بخطوط، فتشوف الدمج حصل إزاي.

بعد الدمج الـ branch القديمة ملهاش لازمة: [[git branch -d feature/login]]. وفي الفرق اللي بتشتغل على GitHub، الدمج غالبًا بيحصل من Pull Request مش من الترمنال، بس اللي بيحصل جوه هو هو.`,
          example: R`git switch main
git merge feature/login
git log --oneline --graph`,
          try: "ادمج الـ branch اللي عملتها في main.",
          deep: {
            why: "خلّصت الميزة في الـ branch بتاعتها، ودلوقتي عايزها في main.",
            how: R`بتقف على الـ branch اللي هتستقبل التعديلات (غالبًا main)، وبتقول [[git merge feature/login]].

وفيه حالتين:

لو main متغيرتش من ساعة ما عملت الـ branch، Git مش محتاج يعمل حاجة غير إنه يحرّك main لقدام تشاور على آخر commit في الـ feature. دي اسمها fast-forward، ومش بتعمل commit جديد.

لو main اتغيرت هي كمان (حد عمل فيها commits)، Git بيعمل commit جديد اسمه merge commit، ليه «أبّين»: آخر commit في main، وآخر commit في الـ feature، وبيجمع التعديلات من الاتنين.

ولو التعديلات في أماكن مختلفة من الملفات، Git بيجمعهم لوحده. لو الاتنين عدّلوا نفس السطور، Git مش هيعرف يختار، وده الـ conflict (الأمر اللي بعده).`,
            when: "كل ما تخلّص ميزة. وعلى GitHub غالبًا بتعمل ده من Pull Request بدل الترمنال، بس الفكرة هي هي.",
            mistakes: "إنك تعمل merge وانت واقف على الـ branch الغلط، فتدمج main جوه الـ feature بدل العكس. اتأكد بـ [[git status]] انت فين قبل الـ merge."
          },
          lines: [
            "روح لـ main الأول، ده المكان اللي هتدمج فيه.",
            "هات تعديلات feature/login وادمجها هنا.",
            "اعرض التاريخ مرسوم وشوف الدمج."
          ],
          sol: R`لو main متحركش من ساعة ما عملت الـ branch، هيطبع [[Updating b5f32ec..6de874a]] و [[Fast-forward]] وأسماء الملفات. ده معناه إن Git نقل main لقدام بس من غير commit دمج، و [[git log --oneline --graph]] هيبان خط مستقيم.

لو main كان عليه commits جديدة، هيعمل commit دمج ويطبع [[Merge made by the 'ort' strategy.]]، والـ graph هيبان فيه فرعين بيتقابلوا.

الغلط الشائع: تعمل [[git merge feature/login]] وانت واقف على الـ feature نفسها، فيقول [[Already up to date.]]. لازم تقف على الفرع اللي عايز تدمج فيه (main) الأول.`
        },
        {
          cmd: "الـ conflicts",
          title: "لما اتنين يعدّلوا نفس السطر",
          desc: "Git بيوقف ويحط الجزئين في الملف بين علامات [[<<<<<<<]] و [[=======]] و [[>>>>>>>]]. بتفتح الملف، تسيب الصح، تمسح العلامات، وبعدين add و commit. و [[merge --abort]] بيرجعك لقبل الـ merge لو اتلخبطت.",
          example: R`git merge feature/header
git status
code index.html
git add index.html
git commit
# أو قبل الـ commit، لو اتلخبطت، الغي الدمج كله:
git merge --abort`,
          try: "اعمل conflict بإيدك: عدّل نفس السطر في branchين مختلفين وادمجهم.",
          deep: {
            why: "لما اتنين (أو انت في branchين) يعدّلوا نفس السطر بطريقتين مختلفتين، Git مش هيقدر يعرف أنهي الصح. فبيوقف ويسيبلك القرار.",
            how: R`Git مبيبوّظش حاجة ولا بيضيّع شغل. بيوقف الـ merge في النص، ويحط الجزئين الاتنين جوه الملف، بين علامات:

[[<<<<<<< HEAD]] وبعدها نسختك (الـ branch اللي انت عليها). وبعدين [[=======]] كفاصل. وبعدها النسخة التانية، وفي الآخر [[>>>>>>> feature/header]].

دورك: تفتح الملف، وتقرر: تسيب نسختك، ولا التانية، ولا تجمع الاتنين بطريقة جديدة. وتمسح العلامات التلاتة كلها. VS Code بيسهّل ده جدًا، وبيحط زراير فوق كل conflict: Accept Current، أو Accept Incoming، أو Accept Both.

بعد ما تخلص كل الملفات، [[git add]] عشان تقول لـ Git «صلّحته»، وبعدين [[git commit]] يكمّل الـ merge.

ولو اتلخبطت ومش عارف تعمل إيه، [[git merge --abort]] بيرجّعك لقبل الـ merge بالظبط، كأن مفيش حاجة حصلت.`,
            when: "بيحصل كتير لما تشتغل مع فريق، أو لما branch تطوّل من غير ما تتدمج. وعشان تقلله: اعمل merge بدري وكتير، ومتسيبش branch أسابيع.",
            mistakes: R`إنك تنسى تمسح علامات [[<<<<<<<]] وتعمل commit، فالكود يبوظ. دوّر عليهم قبل الـ commit: [[grep -rn "<<<<<<<" .]]. والذعر: الـ conflict عادي جدًا، و [[--abort]] دايمًا موجود.`
          },
          lines: [
            "جرب تدمج، و Git يوقف لو فيه تعارض.",
            "اعرف أنهي ملفات فيها تعارض.",
            "افتح الملف في VS Code وصلّحه.",
            "قول لـ Git إنك صلّحته.",
            "كمّل الدمج.",
            "أو الغي الدمج كله وارجع زي ما كنت."
          ],
          sol: R`الـ merge بيطبع [[CONFLICT (content): Merge conflict in index.html]] و [[Automatic merge failed]]. و [[git status]] بيوري [[both modified: index.html]] تحت [[Unmerged paths]]. والملف فيه:

[[<<<<<<< HEAD]] وتحتها سطر main، و [[=======]]، وتحتها سطر الـ branch، و [[>>>>>>> feature/header]].

الحل: اكتب السطر اللي عايزه وامسح التلات علامات، وبعدين [[git add index.html]] و [[git commit --no-edit]]، والـ graph هيوري الفرعين اتقابلوا في [[Merge branch 'feature/header']]. الغلط الشائع: تنسى علامة زي [[=======]] جوه الملف وتعمل commit، فالموقع يبوظ. [[git diff --check]] قبل الـ add بيمسك العلامات المنسية.`,
          solCode: R`echo '<h1>Shop</h1>' > index.html && git add . && git commit -m idx
git switch -c feature/header
echo '<h1>Shop Red</h1>' > index.html && git commit -am red
git switch main
echo '<h1>Shop Green</h1>' > index.html && git commit -am green
git merge feature/header
cat index.html
echo '<h1>Shop Red Green</h1>' > index.html
git add index.html && git commit --no-edit
git log --oneline --graph`
        },
        {
          cmd: "git remote / push / pull",
          title: "اربط بـ GitHub",
          desc: "[[origin]] الاسم المتعارف عليه للـ remote. [[push -u]] أول مرة بتربط الـ branch بالـ remote، وبعد كده [[git push]] بس. [[fetch]] بينزّل التغييرات من غير ما يدمجها، و [[pull]] بينزّل ويدمج.",
          example: R`git remote add origin git@github.com:USER/REPO.git
git remote -v
git push -u origin main
git fetch origin
git pull`,
          try: "اعمل repo فاضي على GitHub وارفعله الـ repo بتاع lab.",
          deep: {
            why: "الـ repo على جهازك بس. عشان تحفظه في مكان آمن، أو تشتغل مع فريق، أو تنزّله على السيرفر، محتاج نسخة على GitHub، وتزامن بينهم.",
            how: R`الـ remote اسم مختصر لعنوان repo تاني على النت، والاسم المتعارف عليه [[origin]].

[[git push]] بيرفع الـ commits الجديدة اللي عندك ومش على GitHub. و [[-u origin main]] أول مرة بيربط main عندك بـ main على GitHub، فبعد كده [[git push]] بس بتكفي.

[[git fetch]] بينزّل الـ commits الجديدة من GitHub، بس مش بيلمس ملفاتك ولا بيدمج. بيحطها جنب شغلك تبص عليها. و [[git pull]] بيعمل fetch وبعده merge على طول.

وحاجة مهمة: Git مش هيسمحلك تعمل push لو GitHub عليه commits انت معندكش (حد تاني رفع قبلك). هيقولك «rejected». الحل: [[git pull]] الأول تجيب اللي فاتك، وبعدين push.`,
            when: "push في آخر كل جلسة شغل على الأقل، عشان شغلك يبقى محفوظ بره جهازك. pull أول ما تبدأ تشتغل، خصوصًا مع فريق. وعلى السيرفر: pull عشان تجيب آخر نسخة من الموقع.",
            mistakes: "إنك تحل الـ «rejected» بـ [[git push --force]]. ده بيمسح شغل الناس التانية من GitHub. اعمل pull. ونسيان إن push بيرفع الـ commits بس، مش التعديلات اللي لسه معملتلهاش commit."
          },
          lines: [
            "اربط المشروع بـ repo على GitHub وسمّيه origin.",
            "اعرض الـ remotes المربوطة ([[-v]] verbose).",
            "ارفع main أول مرة، و [[-u]] يفتكر الربط عشان بعد كده تكتب [[git push]] بس.",
            "نزّل التعديلات الجديدة من غير ما تدمجها.",
            "نزّل وادمج على طول."
          ],
          sol: R`[[git remote -v]] بيطبع سطرين: [[origin git@github.com:USER/REPO.git (fetch)]] و [[(push)]]. وأول [[git push -u origin main]] بيطبع [[* [new branch] main -> main]] و [[branch 'main' set up to track 'origin/main']]. بعدها صفحة الـ repo على GitHub بتوري ملفاتك.

و [[git status]] بعد كده بيقول [[Your branch is up to date with 'origin/main']]، و [[git pull]] بيقول [[Already up to date.]].

الأغلاط الشائعة: [[Permission denied (publickey)]] يعني الـ ssh key مش متضاف (الدرس الجاي). و [[rejected ... (fetch first)]] يعني عملت الـ repo على GitHub ومعاه README، فاعمل [[git pull]] الأول وبعدين push. و [[error: remote origin already exists]] صلّحه بـ [[git remote set-url origin]].`
        },
        {
          cmd: "ssh key لـ GitHub",
          title: "من غير باسورد كل مرة",
          desc: "بتضيف المفتاح العام في GitHub من Settings ثم SSH and GPG keys. و [[ssh -T]] بيختبر الاتصال. على السيرفر اعمل مفتاح مختلف، أو استخدم deploy key خاص بالـ repo ده بس.",
          example: R`ssh-keygen -t ed25519 -C "you@example.com"
cat ~/.ssh/id_ed25519.pub
ssh -T git@github.com`,
          try: "ضيف المفتاح لحسابك، ولازم ssh -T يرد عليك باسم الحساب.",
          deep: {
            why: "عشان GitHub يعرف إنك انت من غير ما تكتب باسورد أو توكن كل مرة تعمل push.",
            how: R`نفس فكرة مفاتيح SSH للسيرفر بالظبط (شرحناها في bash المستوى ٢): مفتاح خاص على جهازك، ومفتاح عام بتديه لـ GitHub.

بتعمل الزوج بـ [[ssh-keygen]]، وبتنسخ المفتاح العام (الملف اللي آخره [[.pub]]) وتحطه في GitHub من Settings ثم SSH and GPG keys. من ساعتها، أي عملية بعنوان [[git@github.com:]] بتستخدم المفتاح.

و [[ssh -T git@github.com]] بيختبر: لو كله تمام، GitHub هيرد برسالة فيها اسم حسابك.

وعلى السيرفر، بدل ما تحط مفتاحك الشخصي اللي بيفتح كل حاجاتك، الأحسن تعمل «deploy key»: مفتاح مخصوص للسيرفر ده، ومسموح له بـ repo واحد بس. لو السيرفر اتخترق، المهاجم مش هيوصل لباقي مشاريعك.`,
            when: "مرة واحدة على كل جهاز بتشتغل عليه. وعلى كل سيرفر محتاج يعمل pull من repo خاص.",
            mistakes: "نسخ المفتاح الخاص بدل العام وحطه في GitHub. المفتاح العام دايمًا اللي آخره [[.pub]]. واستخدام عنوان [[https://]] وتستغرب إنه لسه بيسأل على باسورد، لأن المفتاح بيشتغل مع عنوان [[git@github.com:]] بس."
          },
          lines: [
            "اعمل مفتاح جديد، و [[-C]] تعليق (إيميلك) عشان تعرفه.",
            "اطبع المفتاح العام، انسخه وحطه في GitHub.",
            "اختبر: GitHub المفروض يرد باسم حسابك."
          ],
          sol: R`بعد ما تحط محتوى [[id_ed25519.pub]] في GitHub › Settings › SSH and GPG keys، الأمر [[ssh -T git@github.com]] المفروض يرد:

[[Hi USER! You've successfully authenticated, but GitHub does not provide shell access.]] بـ USER اسم حسابك. ولو أول مرة هيسألك [[Are you sure you want to continue connecting]]، اكتب yes.

متقلقش من إن الـ exit code بيطلع 1، ده طبيعي لأن GitHub مش بيدّيك shell. الغلط الشائع: [[Permission denied (publickey)]] يعني حطيت المفتاح الخاص بدل الـ [[.pub]]، أو المفتاح مش متحمّل (جرّب [[ssh -vT git@github.com]] وشوف أنهي ملف بيجرّبه). ولو رد باسم حساب تاني يبقى المفتاح ده متضاف لحساب غير اللي قاصده.`
        },
        {
          cmd: "gh pr",
          title: "Pull Request من الترمنال",
          desc: "[[gh]] أداة GitHub الرسمية (winget install GitHub.cli أو sudo apt install gh أو brew install gh). بدل ما تروح للموقع: [[pr create --fill]] يعمل PR بعنوان ووصف من الـ commits، و [[pr checkout]] ينزّل PR حد تاني تجرّبه عندك، و [[pr merge --squash]] يدمجه commit واحد ويمسح الـ branch.",
          example: R`gh auth login
git switch -c feature/login
git push -u origin feature/login
gh pr create --fill
gh pr list
gh pr checkout 42
gh pr merge 42 --squash --delete-branch
git switch main
git pull`,
          try: "اعمل branch وPR لنفسك على repo التجربة، وادمجه من الترمنال.",
          deep: {
            why: "في أي فريق، الكود مش بيدخل main مباشرة. بيدخل بـ Pull Request: حد يراجعه، والـ CI يشغّل التستات، وبعدين يتدمج.",
            how: R`الـ PR طلب «ادمجوا الـ branch دي في main». الشغل في Git عادي (branch وcommits وpush)، والـ PR نفسه حاجة على GitHub.

[[gh]] بيكلّم GitHub من الترمنال، فتعمل الدورة كلها من غير ما تسيبه. و [[pr checkout]] مفيد جدًا في المراجعة: بينزّل branch الـ PR حتى لو من fork، فتشغّله وتجرّبه بجد مش تقرا الـ diff بس.

و [[--squash]] بيحط كل commits الـ PR في commit واحد على main، فالتاريخ يفضل نضيف.`,
            when: "كل ميزة أو إصلاح في مشروع عليه أكتر من شخص، أو عليه CI.",
            mistakes: "تنسى [[git pull]] على main بعد الدمج، فالـ branch الجاية تبدأ من نسخة قديمة. وPR ضخم فيه أسبوع شغل، ومحدش يقدر يراجعه."
          },
          lines: [
            "سجّل دخول gh بحسابك مرة واحدة.",
            "اعمل branch للميزة.",
            "ارفعها لـ GitHub واربطها ([[-u]]).",
            "اعمل Pull Request، والعنوان والوصف من الـ commits ([[--fill]]).",
            "اعرض الـ PRs المفتوحة.",
            "نزّل PR رقم 42 على جهازك تجرّبه.",
            "ادمجه كـ commit واحد ([[--squash]]) وامسح الـ branch.",
            "ارجع لـ main.",
            "هات الدمج الجديد."
          ],
          sol: R`[[gh pr create --fill]] بياخد العنوان والوصف من الـ commits ويطبع رابط زي [[https://github.com/USER/REPO/pull/1]]. و [[gh pr list]] بيوريه بالرقم والعنوان واسم الـ branch.

[[gh pr merge 1 --squash --delete-branch]] بيطبع حاجة زي [[✓ Squashed and merged pull request USER/REPO#1]] و [[✓ Deleted branch feature/login]]. وبعد [[git switch main]] و [[git pull]] بتلاقي commit واحد جديد على main فيه كل شغل الـ PR.

الغلط الشائع: [[gh pr create]] يقول [[you must first push the current branch]]: نسيت [[git push -u]]. أو [[gh]] يقول إنك مش مسجّل: [[gh auth login]] الأول. ولو الـ merge اترفض بسبب checks أو branch protection، الرسالة بتقولك إيه الناقص.`
        },
        {
          cmd: "git stash",
          title: "شيل التعديلات على جنب",
          desc: R`[[git stash]] بياخد التعديلات اللي لسه متعملهاش commit ويشيلها على جنب في «رف»، ويرجّع ملفاتك نضيفة زي آخر commit. ده مفيد لما تكون في نص حاجة ومحتاج تنقل branch بسرعة تصلّح حاجة عاجلة، ومش عايز تعمل commit لكود نص نص.

[[push -m "..."]] بيشيل التعديلات باسم تفتكرها بيه. [[list]] بتعرض اللي على الرف، والأحدث اسمه [[stash@{0}]]. [[pop]] بيرجّع آخر حاجة اتشالت على ملفاتك ويمسحها من الرف، و [[apply]] بيرجّعها ويسيبها على الرف، لو عايز تطبّقها في أكتر من branch.

خد بالك: الملفات الجديدة اللي Git مش متابعها (untracked) مش بتتشال من غير [[-u]]. والـ stash محلي على جهازك بس، مش بيترفع مع push.`,
          example: R`git stash push -m "half-done header"
git stash list
git switch main
git stash pop`,
          try: "عدّل ملف، اعمل stash، اتأكد إن التعديل اختفى، وبعدين pop.",
          deep: {
            why: "انت في نص حاجة مش خلصانة، وفجأة لازم تصلّح حاجة عاجلة في branch تانية. مش عايز تعمل commit لكود نص نص، ومش عايز تضيّعه.",
            how: R`[[git stash]] بياخد كل التعديلات اللي لسه متعملهاش commit، ويشيلها في «رف» جنب، ويرجّع ملفاتك نضيفة زي آخر commit. فتقدر تنقل branch وانت مطمّن.

الرف ده عبارة عن «stack»: آخر حاجة بتحطها فوق. [[git stash list]] بيعرض اللي على الرف.

[[git stash pop]] بياخد آخر حاجة اتشالت ويرجّعها على ملفاتك، ويشيلها من الرف. و [[git stash apply]] نفس الحاجة بس بيسيبها على الرف كمان، لو عايز تطبّقها على كذا branch.

و [[-m]] بيدّيها اسم، مفيد لو عندك أكتر من حاجة متشالة.`,
            when: "حاجة عاجلة وسط شغلك. عملت تعديلات على branch غلط: stash، وبعدين switch للصح، وبعدين pop.",
            mistakes: "إنك تنسى إن عندك حاجات متشالة، وتتراكم. شوف [[git stash list]] كل فترة. والملفات الجديدة خالص (untracked) الـ stash العادي مش بياخدها، محتاج [[-u]]."
          },
          lines: [
            "شيل التعديلات على جنب برسالة تفتكرها بيها.",
            "اعرض كل اللي متشال.",
            "روح branch تانية وانت مطمّن.",
            "رجّع آخر حاجة شيلتها ([[pop]])."
          ],
          sol: R`[[git stash push -m "half-done header"]] بيطبع [[Saved working directory and index state On main: half-done header]]. و [[git stash list]] بيوري [[stash@{0}: On main: half-done header]]، و [[git status]] بيبقى نضيف كأنك معدّلتش حاجة.

[[git stash pop]] بيرجّع التعديل ([[git status]] يوريه modified تاني) ويطبع [[Dropped refs/stash@{0}]]، يعني اتشال من القايمة.

الغلط الشائع: ملف جديد (untracked) مش بيتعمله stash من غير [[-u]]، فتلاقيه لسه موجود. ولو pop عمل conflict، الـ stash مش بيتمسح؛ صلّح وبعدين [[git stash drop]].`
        }
      ]
    },
    {
      t: "Git في السكربتات والإعدادات",
      l: 2,
      n: "سكربت يسأل Git «فيه تغييرات؟»، ومشاكل الملكية ونهايات السطور بين ويندوز ولينكس",
      items: [
        {
          cmd: "git diff --quiet",
          title: "اعرف فيه تغييرات ولا لأ من سكربت",
          desc: R`[[--quiet]] بيخلي [[git diff]] ميطبعش حاجة ويرجع exit code بس: 0 لو مفيش فرق، و 1 لو فيه.

فالسكربت يقدر يسأل «فيه حاجة أعملها commit؟» قبل ما يعمل commit، بدل ما Git يطلع «nothing to commit» والسكربت يقع.`,
          example: R`git add -A
git diff --cached --quiet
echo $?
git diff --cached --quiet || git commit -m "backup $(date +%F)"
git diff --quiet || echo "فيه تعديلات لسه متجهزتش"
test -z "$(git status --porcelain)" && echo "clean"`,
          try: "اعمل سكربت باك أب صغير بالسطر الرابع، وشغّله مرتين ورا بعض: المرة التانية المفروض متعملش commit.",
          deep: {
            why: "سكربت باك أب أو deploy بيعمل [[git add -A]] و [[git commit]] كل ساعة. لو مفيش تغييرات، [[git commit]] بيرجع 1 ويطبع «nothing to commit»، والسكربت يفتكر إن حاجة فشلت ويقف، أو يبعتلك تنبيه على الفاضي.",
            how: R`[[git diff --cached]] (نفس [[--staged]]) بيقارن منطقة التحضير بآخر commit، يعني «إيه اللي هيدخل الـ commit». و [[--quiet]] بيقفل الطباعة ويشغّل [[--exit-code]]: 0 معناها مفيش فرق، و 1 معناها فيه.

وده عكس اللي ممكن تتوقعه: 0 (نجاح) يعني «مفيش تغييرات». فـ [[git diff --cached --quiet || git commit]] معناها: لو مفيش تغييرات (نجح) خلاص، لو فيه (فشل) اعمل commit.

[[git diff --quiet]] من غير [[--cached]] بيسأل عن التعديلات اللي لسه معملتلهاش add. والاتنين مبيشوفوش الملفات الجديدة اللي Git مش متابعها، عشان كده [[git add -A]] الأول. أو استخدم [[git status --porcelain]]: بيطبع سطر لكل تغيير من أي نوع، بشكل ثابت مبيتغيرش بين النسخ واللغات، فلو فاضي يبقى الـ repo نضيف.

في ملف bat على ويندوز: بعد الأمر [[if %errorlevel%==0 (echo no changes & exit /b 0)]]. وفي PowerShell: [[if ($LASTEXITCODE -eq 0) { exit 0 }]].`,
            when: "أي سكربت بيعمل commit لوحده: باك أب، أو تحديث ملف متولّد، أو bot. و [[--exit-code]] في CI عشان تتأكد إن ملف متولّد متحدّث (في تاب فحص الكود).",
            mistakes: R`تقرا الـ exit code بالعكس، فالسكربت يعمل commit لما مفيش تغييرات ويسكت لما فيه. وتنسى [[git add -A]] قبل [[--cached]]، فتلاقيه دايمًا 0 حتى والملفات متغيرة. وتقارن نص [[git status]] العادي في سكربت، والنص ده بيتغير مع اللغة ونسخة Git، فاستخدم [[--porcelain]].`
          },
          lines: [
            "جهّز كل التغييرات، حتى الملفات الجديدة والممسوحة.",
            "فيه حاجة متجهزة؟ مبيطبعش، بيرجع exit code بس.",
            "اطبع الـ exit code: 0 يعني مفيش تغييرات، و 1 يعني فيه.",
            "اعمل commit بس لو فيه تغييرات، ومن غير ما السكربت يقع لو مفيش.",
            "نفس السؤال على التعديلات اللي لسه متجهزتش.",
            "الـ repo نضيف خالص؟ [[--porcelain]] بيشمل الملفات الجديدة وشكله ثابت للسكربتات."
          ],
          sol: R`أول تشغيل: فيه تغييرات، فـ [[git diff --cached --quiet]] بيرجع 1، و [[||]] بيشغّل الـ commit ويطبع [[[main bc27540] backup 2026-09-30]]. تاني تشغيل: مفيش حاجة جديدة، فـ [[--quiet]] بيرجع 0، والـ commit مش بيتشغل والسكربت بيخلص ساكت. و [[git log --oneline]] بيوري commit باك أب واحد بس.

ولو شغلت [[echo $?]] بعد [[git diff --cached --quiet]] على repo نضيف هيطبع 0، وبعد تعديل متعمله add هيطبع 1.

الغلط الشائع: تستخدم [[git diff --quiet]] من غير [[--cached]] بعد [[git add -A]]، فيرجع 0 دايمًا لأن كل حاجة بقت staged، والباك أب عمره ما يتعمل.`,
          solCode: R`cat > backup.sh <<'EOF2'
git add -A
git diff --cached --quiet || git commit -m "backup $(date +%F)"
EOF2
echo data > notes.txt
bash backup.sh
bash backup.sh
git log --oneline -2`
        },
        {
          cmd: "safe.directory",
          title: "لما Git يقول dubious ownership",
          desc: R`من Git 2.35.2، Git بيرفض يشتغل في repo فولدره مملوك ليوزر غيرك، ويطلّع «detected dubious ownership». بيحصل لما تنقل هارد من جهاز تاني، أو تنسخ مشروع من ويندوز قديم، أو repo على سيرفر مملوك لـ root وانت شغال بيوزر تاني.

[[safe.directory]] بيقول لـ Git «الفولدر ده أنا واثق فيه».`,
          example: R`# fatal: detected dubious ownership in repository at 'D:/projects/myapp'
git config --global --add safe.directory D:/projects/myapp
git config --global --get-all safe.directory
git -c safe.directory='*' -C D:/projects/myapp status
sudo chown -R deploy:deploy /opt/myapp`,
          try: R`على سيرفر التجربة: [[sudo git clone]] لـ repo في /opt/test، وبعدين [[git status]] جواه كيوزر عادي وشوف الخطأ، وصلّحه بـ chown.`,
          deep: {
            why: "repo جوه فولدر مملوك لحد تاني ممكن يكون فيه [[.git/config]] أو hooks حطها اليوزر التاني، وأول ما تكتب [[git status]] جواه، Git ممكن يشغّل أوامره بصلاحياتك انت. عشان كده Git بقى يرفض لحد ما تقول صراحة إنك واثق.",
            how: R`Git بيقارن صاحب فولدر الـ repo باليوزر اللي مشغّل الأمر. لو مختلفين، يقف ويطبع المسار والأمر اللي يحل المشكلة.

[[--add safe.directory PATH]] بيضيف المسار لقايمة في [[~/.gitconfig]]. و [[--add]] مهمة لأن الإعداد ده بيقبل أكتر من قيمة، ومن غيرها بتكتب فوق اللي قبله. و [[--get-all]] بيعرض القايمة كلها.

على ويندوز اكتب المسار بـ / مش backslash، وزي ما Git طبعه في الرسالة بالظبط.

[[-c safe.directory='*']] بيدّي الإعداد للأمر ده بس من غير ما يتحفظ، و [[-C path]] بيشغّل Git كأنك جوه الفولدر ده. مفيد في سكربت فحص بيعدّي على repos كتير.

وعلى لينكس الحل الأنضف غالبًا مش safe.directory: الـ repo اتعمله clone بـ sudo فبقى ملك root. [[chown]] للمستخدم اللي بيشتغل عليه وخلاص.`,
            when: "أول ما تشوف الرسالة. وعلى سيرفر: قبل ما تضيف safe.directory، اعرف ليه الملكية غلط.",
            mistakes: R`[[safe.directory '*']] بـ [[--global]] عشان تخلص من الرسالة للأبد، فالحماية تتقفل لكل الفولدرات. استخدمه بس في حاويات أو CI كل حاجة فيها بتاعتك. وفي مشروع حقيقي الخطأ ظهر على repo اتنقل من جهاز تاني (الفولدر ملك يوزر ويندوز قديم): الحل safe.directory للفولدر ده بس، أو تاخد ملكية الفولدر من Properties ثم Security. ونسيان [[--add]]، فالمسار الجديد يمسح اللي قبله.`
          },
          lines: [
            "سجّل الفولدر ده إنه آمن، في إعداداتك انت ([[--global]]).",
            "اعرض كل الفولدرات اللي سجّلتها.",
            "للأمر ده بس من غير ما تحفظ حاجة: [[-c]] إعداد مؤقت، و [[-C]] الفولدر.",
            "على لينكس: الحل الأصلي، رجّع ملكية الفولدر لليوزر اللي بيشتغل عليه."
          ],
          sol: R`[[git status]] كيوزر عادي على repo صاحبه root بيطبع:

[[fatal: detected dubious ownership in repository at '/opt/test']] وتحته [[git config --global --add safe.directory /opt/test]].

بعد [[sudo chown -R $USER:$USER /opt/test]]، نفس الأمر بيشتغل ويقول [[On branch main]]. الـ chown أحسن من safe.directory لأنه بيصلّح السبب: اليوزر اللي بيشغّل Git هو صاحب الملفات، فمفيش حد يقدر يحط [[.git/config]] فيه أوامر تتنفذ باسمك.

الغلط الشائع: [[safe.directory '*']] في الإعدادات الـ global عشان الرسالة تختفي، وده بيقفل الحماية على كل الجهاز. ولو استخدمت [[sudo git]] جوه الـ repo بعد كده، الملفات هترجع ملك root وتتكرر المشكلة.`
        },
        {
          cmd: ".gitattributes",
          title: "نهايات السطور بقاعدة واحدة للمشروع",
          desc: R`ملف في جذر المشروع بيقول لـ Git يعمل إيه مع كل نوع ملف: يحوّل نهايات السطور ولا لأ، وأنهي ملفات binary ميلمسهاش.

وبيغلب إعداد [[core.autocrlf]] اللي على جهاز كل واحد، فالمشروع يبقى بنفس الشكل عند الكل.`,
          example: R`# .gitattributes
* text=auto eol=lf
*.bat text eol=crlf
*.cmd text eol=crlf
*.png binary
*.jpg binary`,
          try: R`ضيف الملف لـ repo التجربة، واعمل [[git add --renormalize .]] وبعدين [[git status]]: الملفات اللي كانت CRLF هتظهر متغيرة.`,
          flag: "script",
          deep: {
            why: "سكربت bash اتعمله commit من ويندوز بـ CRLF، ونزل على السيرفر فوقع بـ [[bad interpreter: /bin/bash^M]]. أو كل ملفات المشروع بتظهر modified من غير ما حد يلمسها، لأن اتنين في الفريق autocrlf بتاعهم مختلف. الملف ده بيحط القاعدة في المشروع نفسه بدل إعداد كل جهاز.",
            how: R`كل سطر: pattern وبعده attributes. وآخر سطر بيطابق الملف هو اللي بيكسب، فالعام في الأول والاستثناءات بعده.

[[text=auto]]: Git يحدد لوحده الملف نص ولا binary، والنص بيتخزّن جوه الـ repo بـ LF دايمًا. و [[eol=lf]] معناها «ولما تطلّعه على الجهاز، خليه LF برضه»، حتى على ويندوز. و [[eol=crlf]] للملفات اللي لازم CRLF، زي سكربتات bat و cmd.

[[binary]] معناها متحوّلش ومتعملش diff نصي، للصور والخطوط والـ zip.

والبديل [[* -text]]: «متلمسش نهايات السطور خالص»، فكل ملف يتخزّن بالبايتات اللي اتكتب بيها بالظبط. في مشروع حقيقي كان مستخدم عشان الملفات في الريبو تفضل نفس البايتات اللي على السيرفر. ده بيشتغل لو كل الفريق بيكتب بنفس الشكل، بس مش بيحميك من ملف اتكتب CRLF بالغلط.

الملف بيأثر على اللي هيتعمله add من دلوقتي. الملفات الموجودة محتاجة [[git add --renormalize .]] مرة واحدة، في commit لوحده. (وإعدادات Git جوه WSL في تاب WSL.)`,
            when: "أول يوم في أي مشروع بيتشغّل على ويندوز ولينكس مع بعض، أو فيه سكربتات shell هتتنفّذ على سيرفر.",
            mistakes: R`تضيف الملف ومتعملش renormalize، فالملفات القديمة تفضل CRLF جوه الـ repo. وتعمل renormalize في نفس الـ commit مع تعديل حقيقي، فالـ diff يبقى المشروع كله. و [[eol=lf]] على ملفات bat، فتشتغل غلط في CMD.`
          },
          lines: [
            "كل الملفات: Git يفرّق النص من الـ binary، والنص LF في الـ repo وعلى الجهاز.",
            "سكربتات bat لازم CRLF، فاستثنيها.",
            "ونفسه لملفات cmd.",
            "الصور binary: متحوّلش ومتعملش diff.",
            "ونفسه لـ jpg."
          ],
          sol: R`لو الـ repo فيه ملف متعمله commit بـ CRLF، بعد [[git add --renormalize .]] [[git status -s]] بيوري [[M  win.txt]] (staged)، و [[git diff --cached --stat]] بيقول إن كل سطوره اتغيرت ([[2 insertions(+), 2 deletions(-)]] لملف سطرين) مع إن الكلام نفسه مااتغيرش، التغيير في نهاية السطر بس. و [[.gitattributes]] نفسه ظاهر [[??]] لحد ما تعمله add.

اعمل commit للاتنين مع بعض برسالة زي [[normalize line endings]]، عشان الـ commit ده ميتخلطش بتعديلات حقيقية.

لو مفيش ولا ملف ظهر، ده معناه إن الـ repo كان نضيف أصلًا (كله LF). وده مش غلط. تقدر تتأكد بـ [[git ls-files --eol]]: العمود [[i/crlf]] هو اللي كان هيتغير.`,
          solCode: R`git init crlf && cd crlf
git config core.autocrlf false
printf 'a\r\nb\r\n' > win.txt && git add . && git commit -m crlf
printf '* text=auto eol=lf\n' > .gitattributes
git add --renormalize .
git status -s
git add .gitattributes && git commit -m "normalize line endings"`
        }
      ]
    },
    {
      t: "المساهمة في مشاريع مفتوحة",
      l: 2,
      n: "fork و upstream، و Issues بتتقفل لوحدها من الـ PR، و submodule و lfs باختصار",
      items: [
        {
          cmd: "fork و upstream",
          title: "اعمل PR لمشروع مش بتاعك",
          desc: R`مش هتقدر تعمل push على repo مش بتاعك. فبتعمل fork: نسخة من الـ repo على حسابك، تعمل فيها push براحتك، وتفتح منها PR للمشروع الأصلي.

عندك remote اتنين: [[origin]] الـ fork بتاعك (بتعمل push عليه)، و [[upstream]] المشروع الأصلي (بتعمل منه fetch بس). وكل مساهمة بتبدأ branch جديدة من [[upstream/main]] مش من main بتاعك.`,
          example: R`gh repo fork OWNER/REPO --clone
cd REPO
git remote -v
# لو عملت clone للـ fork بإيدك من غير gh:
git remote add upstream https://github.com/OWNER/REPO.git
git fetch upstream
git switch -c fix/typo-readme upstream/main
git commit -am "docs: fix typo in README"
git push -u origin fix/typo-readme
gh pr create --repo OWNER/REPO --fill
git switch main
git merge --ff-only upstream/main
git push origin main`,
          try: R`اعمل fork لأي repo مفتوح صغير (أو repo تجربة من حساب تاني)، وضيف upstream، واعمل branch من [[upstream/main]] وارفعها على الـ fork. متفتحش PR لو التعديل مش حقيقي.`,
          deep: {
            why: "المساهمة في مشاريع مفتوحة من أحسن حاجات الـ portfolio: كود بتاعك اتراجع واتقبل في مشروع ناس بتستخدمه، وده بيتشاف على GitHub. والطريقة الوحيدة تبعت كود لمشروع مش بتاعك هي fork و PR.",
            how: R`[[gh repo fork --clone]] بيعمل الـ fork على حسابك وينزّله، ويظبط الـ remotes لوحده: [[origin]] للـ fork و [[upstream]] للأصلي. ولو عملت clone للـ fork بإيدك، هتلاقي origin بس، وتضيف upstream بـ [[git remote add]].

الـ fork نسخة اتاخدت في لحظة، ومش بتتحدّث لوحدها. المشروع الأصلي بيتقدم كل يوم، فقبل أي شغل: [[git fetch upstream]]، وتعمل الـ branch من [[upstream/main]] مباشرة. كده الـ PR بيبدأ من آخر نسخة، حتى لو main بتاعك قديم.

تحديث main بتاع الـ fork: [[git merge --ff-only upstream/main]] وبعدين push لـ origin. [[--ff-only]] بيرفض لو main بتاعك فيه commits مش في الأصلي، ودي علامة إنك اشتغلت على main بالغلط. وفيه زرار «Sync fork» على صفحة الـ fork في GitHub، و [[gh repo sync]] بيعمل نفس الحاجة من الترمنال.

[[gh pr create --repo OWNER/REPO]] بيفتح الـ PR على المشروع الأصلي. ولما المشرف يطلب تعديلات، تعمل commit و push على نفس الـ branch، والـ PR بيتحدّث لوحده.`,
            when: R`أي مساهمة في مشروع مش بتاعك. قبلها اقرا [[CONTRIBUTING.md]] لو موجود، ودوّر على Issues عليها label زي «good first issue»، واكتب تعليق إنك هتشتغل عليها قبل ما تبدأ.`,
            mistakes: R`تشتغل على main بتاع الـ fork، فكل PR جديد ياخد commits الـ PR اللي قبله، ومتعرفش تحدّث main من غير conflicts. branch لكل PR، ومن [[upstream/main]]. وتفتح PR ضخم من غير ما تسأل الأول في Issue، فيترفض لأن المشروع مش عايز الميزة دي أصلًا. وفي الانترفيو: «فرق fork عن branch؟» الـ branch جوه نفس الـ repo ومحتاج صلاحية push عليه، والـ fork repo كامل على حسابك مش محتاج أي صلاحية على الأصلي.`
          },
          lines: [
            "اعمل fork على حسابك ونزّله، و gh يظبط origin و upstream لوحده.",
            "ادخل فولدر المشروع.",
            "اتأكد: origin هو الـ fork بتاعك، و upstream هو الأصلي.",
            "لو مفيش upstream: ضيف المشروع الأصلي باسم upstream.",
            "نزّل آخر حاجة في المشروع الأصلي.",
            "اعمل branch للتعديل من آخر نسخة في الأصلي مش من main بتاعك.",
            "احفظ التعديل.",
            "ارفع الـ branch على الـ fork بتاعك (origin).",
            "افتح PR على المشروع الأصلي.",
            "بعدين، عشان تحدّث main بتاع الـ fork: ارجع لـ main.",
            "خده لقدام لآخر upstream، ويرفض لو main بتاعك فيه شغل مش في الأصلي.",
            "وارفعه على الـ fork."
          ],
          sol: R`[[git remote -v]] المفروض يطلّع ٤ سطور: [[origin]] بعنوان الـ fork بتاعك (fetch و push)، و [[upstream]] بعنوان المشروع الأصلي.

وبعد [[git switch -c fix/typo-readme upstream/main]]، [[git branch -vv]] بيوري الـ branch بتتبع [[upstream/main]]. ده طبيعي، و [[git push -u origin fix/typo-readme]] بيغيّر التتبع للـ fork.

وبعد الـ push، GitHub بيطبع رابط «Create a pull request» وصفحة الـ fork بتعرض زرار «Compare & pull request» بيشاور على الـ repo الأصلي.

الغلط الشائع: الـ push يترفض بـ 403. يبقى origin لسه بيشاور على الأصلي (عملت clone للأصلي مش للـ fork). صلّحه بـ [[git remote set-url origin]] بعنوان الـ fork.`
        },
        {
          cmd: "Closes #12",
          title: "اربط الـ PR بالـ Issue",
          desc: R`الـ Issue هو المكان اللي بتتكتب فيه المشكلة أو الميزة قبل الكود: وصف، وخطوات تكرار الـ bug، والنقاش. والـ PR هو الحل.

لو كتبت [[Closes #12]] في وصف الـ PR (أو [[Fixes #12]] أو [[Resolves #12]])، GitHub بيربطهم، ولما الـ PR يتدمج في الـ default branch، Issue رقم 12 بيتقفل لوحده.`,
          example: R`gh issue create --title "Cart total ignores coupon" --body "Steps: add item, apply SAVE10, total unchanged"
gh issue list --label bug
gh issue develop 12 --checkout
git commit -m "fix: apply coupon to cart total (closes #12)"
gh pr create --fill --body "Closes #12"
gh issue view 12`,
          try: "على repo التجربة: افتح Issue، واعمل branch و PR في وصفه Closes ورقم الـ Issue، وادمجه، واتأكد إن الـ Issue اتقفل لوحده.",
          deep: {
            why: "في فريق أو مشروع مفتوح، الشغل بيتتبع في Issues: إيه المطلوب، ومين شغال على إيه، وإيه اتحل. الربط بيخلي أي حد يفتح الـ Issue يلاقي الكود اللي حله، ويفتح الـ PR يعرف ليه اتعمل، من غير ما حد يقفل حاجة بإيده وينسى.",
            how: R`الكلمات اللي GitHub بيفهمها: close و closes و closed، و fix و fixes و fixed، و resolve و resolves و resolved، وبعدها رقم الـ Issue. ولـ Issue في repo تاني: [[Closes OWNER/REPO#12]]. ولكذا Issue كرر الكلمة: [[Closes #12, closes #15]].

بتشتغل في وصف الـ PR، أو في رسالة commit، بس القفل بيحصل لما الـ PR يتدمج في الـ default branch (غالبًا main). PR داخل branch تانية (زي develop) مش هيقفل حاجة.

[[#12]] من غير الكلمة بيعمل رابط بس، والـ Issue بيفضل مفتوح. وده مفيد لما الـ PR جزء من الحل مش كله: [[Part of #12]].

[[gh issue develop 12 --checkout]] بيعمل branch مربوطة بالـ Issue من صفحته، ويروح لها. وفي صفحة الـ PR، قسم «Development» في الجنب بيوريك الـ Issues اللي هتتقفل.`,
            when: "كل PR بيحل Issue. وفي مشروع مفتوح: متبدأش شغل من غير Issue، واكتب فيه الأول إنك هتاخده.",
            mistakes: R`تكتب [[Closes #12]] في PR داخل branch مش الـ default، وتستغرب إن الـ Issue مقفلش. وتكتب [[Closes 12]] من غير [[#]] أو كلمة مش في القايمة زي [[Solves #12]]، فالربط ميحصلش (النقطتين والحروف الكبيرة عادي: [[Fixes: #12]] و [[CLOSES #12]] شغالين). وتكتب Closes في PR بيحل جزء بس، فالـ Issue يتقفل والمشكلة لسه موجودة.`
          },
          lines: [
            "افتح Issue بعنوان ووصف فيه خطوات تكرار الـ bug.",
            "اعرض الـ Issues اللي عليها label bug.",
            "اعمل branch مربوطة بـ Issue رقم 12 وروح لها.",
            "رسالة commit فيها رقم الـ Issue.",
            "افتح PR، والوصف فيه Closes #12 عشان يتقفل مع الدمج.",
            "بعد الدمج: اتأكد إن حالته بقت CLOSED."
          ],
          sol: R`قبل الدمج، صفحة الـ PR بتوري الـ Issue تحت «Development»، وصفحة الـ Issue فيها سطر «linked a pull request that will close this issue».

بعد [[gh pr merge]]، [[gh issue view 12]] بيوري الحالة Closed، وفي تايملاين الـ Issue على GitHub سطر إنه اتقفل بالـ PR ورقمه.

لو فضل مفتوح: اتأكد إن الـ PR اتدمج في الـ default branch، وإن الصيغة زي [[Closes #12]]: كلمة من القايمة وبعدها [[#]] والرقم.`
        },
        {
          cmd: "submodule و lfs",
          title: "repo جوه repo، وملفات ضخمة",
          desc: R`[[submodule]] بيحط repo تاني جوه مشروعك في فولدر، ومشروعك بيحفظ رقم commit معين منه بس. و [[git lfs]] بيخلّي الملفات الضخمة (فيديو وتصميمات و datasets) تتخزن بره التاريخ، والـ repo يحفظ مؤشر صغير لها.

الاتنين بيتقابلوا في مشاريع قديمة أو مفتوحة أكتر ما تحتاجهم في مشروعك.`,
          example: R`git submodule add https://github.com/OWNER/theme.git themes/theme
git commit -m "add theme as submodule"
git clone --recurse-submodules https://github.com/USER/REPO.git
git submodule update --init --recursive
git lfs install
git lfs track "*.psd"
git add .gitattributes design.psd
git lfs ls-files`,
          try: "اعمل repo صغير، وضيفه كـ submodule في repo تاني، واعمل clone للتاني من غير recurse وشوف الفولدر فاضي، وبعدين update --init.",
          deep: {
            why: R`submodule: مكتبة أو theme مشتركة بين كذا مشروع، وعايز كل مشروع يثبّت نسخة معينة منها. lfs: GitHub بيرفض أي ملف أكبر من 100MB، والملفات الـ binary الكبيرة بتتقل الـ repo للأبد لأن كل نسخة منها بتفضل في التاريخ.`,
            how: R`[[submodule add]] بيعمل clone للـ repo التاني جوه الفولدر، ويكتب ملف [[.gitmodules]] فيه المسار والرابط. ومشروعك مش بيحفظ ملفات الـ submodule، بيحفظ رقم commit واحد بس منه. فلو الـ repo التاني اتقدم، مشروعك مش هيتأثر لحد ما تدخل الفولدر وتعمل pull، وترجع تعمل commit للرقم الجديد.

[[git clone]] العادي بيسيب فولدر الـ submodule فاضي. [[--recurse-submodules]] وقت الـ clone، أو [[git submodule update --init --recursive]] بعده، بينزّل كل واحد على الـ commit المحفوظ.

[[git lfs install]] مرة على الجهاز. و [[git lfs track "*.psd"]] بيكتب سطر في [[.gitattributes]]، ومن ساعتها أي psd بيتخزن على سيرفر LFS، والـ repo فيه ملف نصي صغير بيشاور عليه. ولازم [[.gitattributes]] نفسه يدخل commit، وإلا باقي الفريق يرفعوا الملفات عادي. و [[git lfs ls-files]] بيعرض الملفات اللي LFS ماسكها.`,
            when: R`submodule: كود مشترك بين repos ومش عايزه package على npm. في مشروع Node غالبًا package أو monorepo (workspaces) أسهل. lfs: assets كبيرة لازم تبقى جنب الكود، وإلا خليها في S3 أو R2 بره Git خالص.`,
            mistakes: R`تعدّل كود جوه فولدر submodule وتنسى تعمل commit و push جوه الـ submodule نفسه، فمشروعك يشاور على commit محدش عنده، والباقيين يطلعلهم خطأ في update. وتنسى [[--recurse-submodules]] في CI أو على السيرفر، فالبيلد يقع لأن الفولدر فاضي. و [[lfs track]] بعد ما الملفات اتعملها commit عادي: الملفات القديمة بتفضل في التاريخ بحجمها. وحصص LFS على GitHub ليها حد تخزين ونقل.`
          },
          lines: [
            "ضيف repo تاني كـ submodule في فولدر themes/theme.",
            "احفظ .gitmodules ورقم الـ commit في مشروعك.",
            "نزّل مشروع ومعاه كل الـ submodules مرة واحدة.",
            "أو بعد clone عادي: نزّل الـ submodules (والمتداخلة جواها).",
            "فعّل LFS على جهازك (مرة واحدة).",
            "أي ملف psd يتخزن في LFS (بيكتب في .gitattributes).",
            "احفظ .gitattributes مع الملف نفسه.",
            "اعرض الملفات اللي LFS ماسكها."
          ],
          sol: R`[[git submodule add]] بيعمل [[.gitmodules]] فيه قسم [[submodule "vendor/lib"]] و [[path]] و [[url]]، و [[git status -s]] بيطلّع سطرين: [[A .gitmodules]] و [[A vendor/lib]]. الفولدر ظاهر كحاجة واحدة مش ملفات، لأن مشروعك حافظ رقم commit بس.

بعد clone عادي للمشروع التاني، [[ls vendor/lib]] فاضي. و [[git submodule update --init --recursive]] بيطبع [[Submodule path 'vendor/lib': checked out 'رقم']]، والملفات بتظهر.

لو الـ repo التاني على جهازك (مسار زي [[../lib]] مش رابط)، Git الجديد بيرفض بـ [[transport 'file' not allowed]]. للتجربة بس: [[git -c protocol.file.allow=always submodule add ../lib vendor/lib]] وبنفس الـ [[-c]] مع update.`,
          solCode: R`mkdir -p ~/lab/sub && cd ~/lab/sub
git init -b main lib && cd lib && echo x > l && git add l && git commit -m lib && cd ..
git init -b main app && cd app
git -c protocol.file.allow=always submodule add ../lib vendor/lib
cat .gitmodules && git status -s
git commit -m "add lib" && cd ..
git clone app app2 && ls app2/vendor/lib
cd app2 && git -c protocol.file.allow=always submodule update --init --recursive
ls vendor/lib && git submodule status`
        }
      ]
    }
  ]
});
