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

TAB("zsh", {
  label: "zsh",
  prompt: "% ",
  lab: R`mkdir -p ~/lab && cd ~/lab
pwd`,
  categories: [
    {
      t: "zsh والفرق عن bash",
      l: 1,
      n: "معظم أوامر تاب bash شغالة هنا زي ما هي. التاب ده للي بيختلف وللي خاص بالماك",
      items: [
        {
          cmd: "echo $SHELL",
          title: "انت على أنهي شيل",
          desc: R`الشيل هو البرنامج اللي بيقرا الأوامر اللي بتكتبها في الترمنال وينفّذها. الماك من إصدار Catalina (10.15) بيفتح الترمنال على zsh، وقبلها كان bash. bash لسه موجود على الماك، بس نسخة 3.2 من 2007، لأن النسخ الأحدث رخصتها GPLv3 و Apple مش بتشحنها، وده سبب التغيير.

[[$SHELL]] متغير جواه مسار الشيل الافتراضي بتاعك، و [[echo]] بتطبعه. و [[--version]] بعد اسم أي شيل بتطبع نسخته. خد بالك إن [[$SHELL]] بيقولك الافتراضي، مش اللي انت فيه دلوقتي: لو كتبت [[bash]] ودخلت جواه هيفضل يطبع [[/bin/zsh]]، والأدق ساعتها [[echo $0]].`,
          example: R`echo $SHELL
zsh --version
bash --version`,
          try: "اعرف الشيل ونسخته، واكتب [[bash]] تدخل bash و [[exit]] ترجع لـ zsh.",
          deep: {
            why: "تعرف أنهي shell بتستخدم على الماك. الماك الجديد (Apple Silicon وCatalina+) بيستخدم zsh افتراضيًا، القديم كان bash.",
            how: R`[[echo $SHELL]] بيطبع [[/bin/zsh]] أو [[/bin/bash]]. لو كنت في shell موقتة: [[echo $0]] برضه.

bash على الماك قديم (bash 3.2 من 2007) بسبب قضية ترخيص. zsh أحدث وفيه features أكتر.

[[chsh -s /bin/zsh]] بيغيّر الافتراضي لـ zsh. [[chsh -s /bin/bash]] بيرجع لـ bash. محتاج تعيد فتح الترمنال.`,
            when: "أول مرة على ماك جديد. لو السكربتات بتتصرف غريب.",
            mistakes: "تعمل سكربت بشرح bash-specific features (arrays syntax مختلفة مثلًا) على ماك بـ zsh افتراضي."
          },
          lines: [
            "الشيل الافتراضي بتاعك: /bin/zsh على الماك الحديث.",
            "نسخة zsh.",
            "نسخة bash: هتلاقيها 3.2 قديمة جدًا (من 2007) بسبب الترخيص."
          ],
          sol: R`على ماك جديد [[echo $SHELL]] بيطبع [[/bin/zsh]]، و [[zsh --version]] حاجة زي [[zsh 5.9 (arm64-apple-darwin24.0)]]، و [[bash --version]] أول سطر فيه [[GNU bash, version 3.2.57]]. اكتب [[bash]]: الماك هيطبع رسالة [[The default interactive shell is now zsh.]] والـ prompt يتغير لشكل bash ([[bash-3.2$]])، و [[exit]] يرجعك للـ prompt بتاع zsh.

خد بالك إن [[$SHELL]] هو الشيل الافتراضي بتاع اليوزر، مش الشيل اللي انت فيه دلوقتي: جوه bash هيفضل يطبع [[/bin/zsh]]. عشان تعرف انت فين فعلًا [[echo $0]]. (جربتها على لينكس: zsh 5.9 و bash 5.2، النسخ على الماك مختلفة زي ما فوق.)`
        },
        {
          cmd: "~/.zshrc",
          title: "ملف إعداداتك",
          desc: R`[[~/.zshrc]] ملف نصي في الـ home بتاعك ([[~]] اختصار للـ home)، و zsh بيقراه وينفّذ اللي فيه كل ما تفتح ترمنال جديد. بتحط فيه الـ aliases (اسم قصير لأمر طويل)، والـ exports (متغيرات زي PATH)، والـ functions. هو نفس دور [[.bashrc]] في bash بالظبط.

في المثال [[>>]] معناها «ضيف في آخر الملف». أما [[>]] لوحدها فبتمسح الملف كله وتكتب السطر الجديد بس، وده أشهر طريقة حد يضيّع بيها الـ zshrc بتاعه. [[alias ll='ls -lah']] بيخلي [[ll]] تتنفّذ كأنك كتبت [[ls -lah]]. و [[export PATH="$HOME/.local/bin:$PATH"]] بيحط فولدر في أول الـ PATH، و [[:$PATH]] في الآخر بتحافظ على القديم.

الترمنال المفتوح مش بيشوف التعديل لوحده: [[source ~/.zshrc]] بتقرا الملف تاني في نفس الجلسة.`,
          example: R`nano ~/.zshrc
echo "alias ll='ls -lah'" >> ~/.zshrc
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc`,
          try: "اعمل alias اسمه dc لـ [[docker compose]] وفعّله بـ source.",
          deep: {
            why: "زي .bashrc في bash: ملف بيشتغل كل ما تفتح terminal على الماك، بتحط فيه الإعدادات والـ aliases.",
            how: R`[[code ~/.zshrc]] لتعديله في VS Code. أو [[nano ~/.zshrc]].

بعد التعديل: [[source ~/.zshrc]] يطبّق التغييرات من غير ما تقفل وتفتح.

أهم ما يتحط فيه: [[export PATH="..."]] لإضافة فولدرات للـ PATH (Homebrew، وPython، وNode). وaliases. ومتغيرات ثابتة. وإعداد أدوات زي nvm وpyenv.

والـ zsh عنده كمان ملفات تانية: [[~/.zshenv]] بيشتغل دايمًا حتى في non-interactive shells، و[[~/.zprofile]] بيشتغل مع login shells.`,
            when: "إضافة PATH جديد. إعداد alias. تخصيص الـ prompt.",
            mistakes: "تعمل تغيير وتفضل تتساءل ليه مش شغال من غير ما تعمل [[source]]."
          },
          lines: [
            "افتح ملف الإعدادات (نفس دور .bashrc).",
            "ضيف اختصار في آخره.",
            "ضيف فولدر للـ PATH. single quotes عشان [[$HOME]] يتكتب زي ما هو ويتفك كل مرة.",
            "طبّق في الجلسة دي."
          ],
          sol: R`[[echo "alias dc='docker compose'" >> ~/.zshrc]] وبعدين [[source ~/.zshrc]]. اتأكد بـ [[type dc]]، جربتها في zsh وطبعت [[dc is an alias for docker compose]]. دلوقتي [[dc up -d]] هي [[docker compose up -d]].

لو [[dc]] لسه مش شغالة يبقى نسيت [[source]] أو انت في تاب اتفتح قبل التعديل. ولو كتبت [[>]] بدل [[>>]] هتمسح الـ zshrc كله وتكتب السطر ده بس. و dc اسم برنامج آلة حاسبة قديم موجود في النظام، والـ alias بيغطي عليه، وده مش مشكلة.`,
          solCode: R`echo "alias dc='docker compose'" >> ~/.zshrc
source ~/.zshrc
type dc`
        },
        {
          cmd: "**/*.js",
          title: "بحث في كل الفولدرات من غير find",
          desc: R`الـ glob هو إن الشيل نفسه يحوّل pattern زي [[*.js]] للستة أسامي الملفات اللي بتطابقه، قبل ما الأمر يشتغل. [[*]] معناها «أي حروف» بس في فولدر واحد. zsh بيفهم كمان [[**/]]، ومعناها «الفولدر ده وكل الفولدرات اللي تحته مهما كانت عميقة»، فـ [[**/*.js]] بتجيب كل ملفات js في المشروع من غير [[find]].

[[wc -l src/**/*.ts]] بتعدّ سطور كل ملفات ts جوه src وتحتها. و [[(N)]] في آخر الـ pattern اسمها glob qualifier، ومعناها: لو مفيش ولا ملف مطابق رجّع لستة فاضية بدل ما zsh يوقف بـ error. في bash نفس [[**]] محتاجة [[shopt -s globstar]] الأول.

خد بالك إن [[**]] بيدخل [[node_modules]] كمان، فممكن يطلع آلاف الملفات. وقبل ما تستخدمه مع [[rm]] جرّبه بـ [[ls]] وشوف هيمسك إيه.`,
          example: R`ls **/*.js
wc -l src/**/*.ts
ls **/*.log(N)`,
          try: "اعرض كل ملفات json جوه src في أي مشروع.",
          deep: {
            why: "zsh عنده glob patterns أقوى من bash. [[**]] معناها «أي عمق من الفولدرات».",
            how: R`[[ls **/*.js]] بيعرض كل ملفات .js في الفولدر الحالي وكل ما جواه، بكل العمق. في bash [[**]] شغالة بس مع [[globstar]] option.

[[rm **/*.log]] بيمسح كل .log في كل الفولدرات الفرعية (حتى جوه node_modules)، فجرّب [[ls **/*.log]] الأول.

patterns تانية في zsh: [[ls *(.)]] ملفات بس (مش فولدرات). [[ls *(/)]] فولدرات بس.

[[ls *(om)]] مرتبة بالتعديل الأحدث. [[ls *(Lm+1)]] الأكبر من 1 ميجا.`,
            when: "إيجاد أو تنفيذ أمر على نوع ملفات في project كبير.",
            mistakes: "استخدام [[**]] في bash من غير تفعيل globstar [[shopt -s globstar]]."
          },
          lines: [
            "كل ملفات .js بأي عمق (zsh بتفهم [[**]] من غير إعداد).",
            "عدّ سطور كل ملفات .ts جوه src.",
            "[[(N)]] في الآخر: لو مفيش ملفات، متطلعش error، طلّع لستة فاضية."
          ],
          sol: R`[[ls src/**/*.json]] بيطبع كل ملفات json جوه src وأي فولدر تحتها. جربتها في zsh على مشروع فيه [[src/app.json]] و [[src/a/b/deep.json]] فطلع الاتنين، ومن غير أي حاجة من node_modules لأن البحث بدأ من src.

لو كتبت [[**/*.json]] من فولدر المشروع هيدخل node_modules (جربتها فطلع [[node_modules/x/package.json]] معاهم)، استبعده بـ [[ls **/*.json~node_modules/*]] بعد [[setopt extended_glob]]. وخد بالك من فخ [[(N)]]: لو مفيش نتايج، [[ls **/*.log(N)]] بتبقى [[ls]] لوحدها فبتعرض الفولدر الحالي كله. جربتها فعلًا وطبعت كل حاجة في الفولدر.`
        },
        {
          cmd: "no matches found",
          title: "ليه الأمر وقف ومعملش حاجة",
          desc: "في bash لو [[*.tmp]] ملهاش نتيجة بتعدّي كنص عادي. في zsh الأمر كله بيقف بـ error. وأي URL فيه [[?]] أو [[[]] حطه بين علامات تنصيص وإلا zsh هيفتكره pattern.",
          example: R`rm *.tmp
# zsh: no matches found: *.tmp
curl "https://api.github.com/search/repositories?q=zsh"`,
          try: "اكتب [[ls *.xyz]] وشوف الرسالة، وبعدين جرّب نفس الـ curl من غير علامات تنصيص.",
          deep: {
            why: "zsh بيحاول يوسّع الـ glob pattern. لو مش لاقي ملفات، بيطلع error. في bash كان بيبعت الـ pattern كما هو.",
            how: R`الرسالة: [[zsh: no matches found: *.log]]. في bash نفس الأمر كان ممكن يشتغل ويبعت [[*.log]] للأمر كنص.

الحل لو الـ pattern صح: [[setopt NULL_GLOB]] يخليه يتجاهل الـ no matches. أو [[ls *.log(N)]] للأمر ده بس (الـ [[2>/dev/null]] مش هتنفع لأن الـ error من zsh نفسه قبل ما الأمر يشتغل).

لو الـ pattern متوقع إنه يتبعت زي ما هو (زي لـ curl): حطه بين علامات تنصيص: [[curl "api.example.com/*.json"]].`,
            when: "أوامر من لينكس بتطلع error على الماك.",
            mistakes: "تفتكر الـ command مش موجود. المشكلة في الـ glob expansion مش في الأمر."
          },
          lines: [
            "لو مفيش ملفات .tmp: zsh بتطلع «no matches found» وتوقف (bash كانت هتبعت *.tmp لـ rm زي ما هو).",
            "الـ URL فيه [[?]]، وده رمز glob في zsh. علامات التنصيص تخليه يعدّي كنص."
          ],
          sol: R`[[ls *.xyz]] في zsh بيطبع [[zsh: no matches found: *.xyz]] والأمر مش بيتنفذ أصلًا (ls متشغلش)، والـ exit code 1. في bash نفس الأمر بيبعت [[*.xyz]] لـ ls فتطبع [[ls: cannot access '*.xyz': No such file or directory]].

الـ curl من غير علامات تنصيص: zsh بيقف بـ [[zsh: no matches found: https://api.github.com/search/repositories?q=zsh]] من غير ما يبعت أي طلب، لأن [[?]] معناها «أي حرف» في الـ glob. جربتها بـ echo على URL فيه [[?q=]] وطلعت نفس الرسالة. الحل علامات تنصيص، أو backslash قبل [[?]].`
        },
        {
          cmd: "Cmd+K",
          title: "اختصارات ترمنال الماك",
          desc: "Cmd+K يمسح الشاشة كلها، Cmd+T تاب جديد، Option+Click يحط المؤشر مكان ما دوست، و Ctrl+R بحث في التاريخ زي bash. في zsh [[history]] لوحدها بتعرض آخر 16 أمر بس، و [[history 1]] بتعرض كله.",
          example: R`history 1 | grep docker
!!`,
          try: "دوّر في تاريخك على آخر أمر فيه git بـ Ctrl+R.",
          deep: {
            why: "نضيف الشاشة بطريقة تختلف عن [[clear]].",
            how: R`[[clear]] أو Ctrl+L بيدفع الـ terminal للأسفل، بس لو صعدت فوق لسه تشوف الـ history.

Cmd+K في Terminal.app وiTerm2 بيمسح الـ scrollback buffer الكلي. مش هتلاقي حاجة لو رجعت فوق. مفيد لما بتبدأ مهمة جديدة وعايز صفحة نضيفة.

في VS Code terminal: Cmd+K برضه، أو من الـ command palette.`,
            when: "قبل ما تبدأ مهمة حساسة وعايز تتأكد مش في شاشة كلامها قديم.",
            mistakes: "تعمل Cmd+K وتنسى إن التاريخ في ملف ~/.zsh_history لسه موجود."
          },
          lines: [
            "الـ history من الأول ([[history 1]] في zsh، مش history لوحدها) وفلتر على docker.",
            "آخر أمر تاني (بيشتغل في zsh زي bash)."
          ],
          sol: R`Ctrl+R وبعدين اكتب [[git]]: هيظهرلك تحت [[bck-i-search: git_]] وجنبه آخر أمر فيه git. Ctrl+R تاني يرجع للأقدم، Enter ينفذه، وسهم يمين (أو Ctrl+E) يحطه في السطر عشان تعدّله. Ctrl+G أو Ctrl+C يلغي.

لو مطلعش حاجة، يبقى التاريخ فاضي أو مش بيتحفظ. ولو كتبت [[history | grep git]] ولقيت أوامر قليلة، ده لأن [[history]] لوحدها في zsh بتعرض آخر 16 بس، استخدم [[history 1 | grep git]]. ولو الأوامر مش بتتحفظ بين التابات، ضيف [[setopt share_history]] في [[~/.zshrc]].`
        },
        {
          cmd: "Oh My Zsh",
          title: "إكمال أذكى واختصارات جاهزة",
          desc: "إطار بيضيف ثيمات و plugins. بعد التسطيب عدّل سطر [[plugins=(git docker npm)]] في [[~/.zshrc]]. plugin الـ git بيديك اختصارات زي [[gst]] لـ git status و [[gco]] لـ git checkout.",
          example: R`sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
nano ~/.zshrc
source ~/.zshrc`,
          try: "سطّبه وجرّب [[gst]] جوه أي repo.",
          deep: {
            why: "Framework بيضيف themes وplugins لـ zsh ويخلّي الـ terminal أجمل وأفيد. الأشهر للمطورين على الماك.",
            how: R`بعد التسطيب، [[~/.zshrc]] بيتعدّل أوتوماتيك ويبدأ يحمّل Oh My Zsh.

الـ [[ZSH_THEME]] في [[.zshrc]] بيحدد الشكل. أشهر theme هو [[agnoster]] أو [[robbyrussell]] (الافتراضي).

الـ plugins: ضيفهم في [[plugins=()]] في [[.zshrc]]. أشهرهم [[git]] (يضيف aliases لـ git)، و[[zsh-autosuggestions]] (يقترح من الـ history)، و[[zsh-syntax-highlighting]] (لوّن الكلام لو الأمر صح أو غلط).

بعد التعديل: [[source ~/.zshrc]].`,
            when: "أول ما تجهّز ماك جديد للتطوير.",
            mistakes: "تسطّبه وتبقى لا تعرف إيه اللي بيعمله. الـ plugins غير المعرّفة هتطلع error كل ما تفتح terminal."
          },
          lines: ["نزّل سكربت التسطيب الرسمي وشغّله.", "افتح الإعدادات: غيّر [[ZSH_THEME]] وضيف plugins.", "طبّق."],
          sol: R`بعد التسطيب الـ prompt هيتغير لشكل زي [[➜  myrepo git:(main)]] (ثيم robbyrussell الافتراضي)، و [[~/.zshrc]] القديم بيتحفظ باسم [[~/.zshrc.pre-oh-my-zsh]]. جوه أي repo اكتب [[gst]]، هيطبع نفس ناتج [[git status]]: [[On branch main]] وبعدها الملفات.

لو [[gst]] قالت [[command not found]]، يبقى [[git]] مش في سطر [[plugins=(...)]] أو نسيت [[source ~/.zshrc]]. ولو aliases قديمة بتاعتك اختفت، ده لأن الـ zshrc اتبدل: انقلها من [[.zshrc.pre-oh-my-zsh]] للجديد. واعرف كل الـ aliases بـ [[alias | grep git]].`
        }
      ]
    },
    {
      t: "Homebrew",
      l: 1,
      n: "مدير البرامج بتاع الماك، زي apt في أوبونتو",
      items: [
        {
          cmd: "brew install",
          title: "سطّب Homebrew وأي أداة",
          desc: R`Homebrew هو مدير البرامج للماك، زي [[apt]] في أوبونتو: بتكتب اسم الأداة وهو ينزّلها ويسطّبها هي والحاجات اللي محتاجاها. مش بييجي مع الماك، فبتسطّبه مرة واحدة بأول سطر (من موقع brew.sh). [[curl]] بينزّل سكربت التسطيب، و [[$(...)]] بتحط اللي نزل كنص، و [[bash -c]] بتشغّل النص ده. فلاجات curl: [[-f]] يفشل لو السيرفر رد بـ error، و [[-s]] من غير شريط تقدم، و [[-S]] يطبع الخطأ لو حصل، و [[-L]] يتبع التحويلات.

في آخر التسطيب هيطبع قسم [[Next steps]] فيه أوامر بتضيف brew للـ PATH. نفّذها، وإلا [[brew]] هيقولك command not found. بعدها [[brew install]] بتاخد اسم أداة أو أكتر، و [[@24]] بعد الاسم معناها نسخة رئيسية معينة (node 24). ومتشغّلش brew بـ [[sudo]]، هو أصلًا بيرفض.`,
          example: R`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install tree htop wget
brew install node@24`,
          try: "سطّب tree و htop وجرب [[tree -L 2]].",
          deep: {
            why: "Homebrew هو مدير الـ packages للماك. مش موجود على الماك افتراضيًا، بيتسطّب مرة واحدة.",
            how: R`[[brew install node]] بيسطّب node. [[brew install git ffmpeg postgresql]] كذا package مرة واحدة.

Homebrew بيحط كل شئ في مسار واحد ([[/opt/homebrew]] على Apple Silicon، [[/usr/local]] على Intel). وبيتأكد إن مافيش package يأثر على الـ system packages بتاعة الماك.

بعد تسطيب بعض الـ packages، Homebrew بيقولك «Caveats» (تنبيهات): أحيانًا محتاج تضيف شئ للـ PATH أو تشغّل أمر معين. اقراهم دايمًا.`,
            when: "تسطيب أي أداة development على الماك.",
            mistakes: R`نسيان إن PATH بحاجة لـ Homebrew prefix. على Apple Silicon لازم تضيف [[eval "$(/opt/homebrew/bin/brew shellenv)"]] في [[.zshrc]].`
          },
          lines: [
            "سطّب Homebrew نفسه (مرة واحدة). بيطلب باسورد الماك.",
            "سطّب ٣ أدوات مرة واحدة.",
            "نسخة معينة من node (بعض الباكدجات بتحتاج تضيفها للـ PATH، اقرا الـ Caveats بعد التسطيب)."
          ],
          sol: R`بعد [[brew install tree htop]]، [[tree -L 2]] في فولدر مشروع بيطبع الفولدرات ومستوى واحد جواها، وفي الآخر سطر زي [[5 directories, 12 files]]. و [[htop]] بيفتح شاشة ملونة بالعمليات، q للخروج.

لو [[brew]] نفسه قال [[command not found]] بعد التسطيب، يبقى مشغّلتش السطرين اللي طبعهم في الآخر ([[eval "$(/opt/homebrew/bin/brew shellenv)"]] على Apple Silicon)، ودول بيضيفوا brew للـ PATH. على ماك Intel مكانه [[/usr/local/bin]] ومفيش المشكلة دي غالبًا. ولو [[tree]] طبع آلاف السطور، ضيف [[-I node_modules]].`
        },
        {
          cmd: "brew --cask",
          title: "برامج بواجهة",
          desc: R`Homebrew فيه نوعين: formula ودي أدوات سطر أوامر زي git و tree، و cask ودي تطبيقات بواجهة رسومية زي VS Code و Docker Desktop و Chrome. [[--cask]] بتقول لـ brew إن الاسم ده تطبيق، فهو بينزّل ملف الـ dmg أو الـ pkg بنفسه ويحط التطبيق في [[/Applications]] من غير ما تسحب وتفلت بإيدك.

الاسم في brew مش دايمًا زي اسم التطبيق: VS Code اسمه [[visual-studio-code]] و Chrome اسمه [[google-chrome]]، فدوّر الأول بـ [[brew search --cask]]. ولو التطبيق متسطب قبل كده من dmg، brew هيرفض ويقولك إنه موجود. و [[brew uninstall --cask]] بتشيله.`,
          example: R`brew install --cask visual-studio-code
brew install --cask docker-desktop`,
          try: "دوّر على تطبيق بتستخدمه بـ [[brew search --cask]] واعرف اسمه.",
          deep: {
            why: "Homebrew Cask بيسطّب تطبيقات ذات واجهة رسومية (GUI apps) زي VS Code وGoogle Chrome وDocker.",
            how: R`[[brew install --cask google-chrome]] بيسطّب Chrome. [[brew install --cask visual-studio-code docker-desktop iterm2]] كذا تطبيق.

الفرق: [[brew install]] للـ CLI tools. [[brew install --cask]] للـ GUI apps.

[[brew list --cask]] بيعرض الـ casks المسطّبة. [[brew uninstall --cask app-name]] بيشيله.

وفيه موقع [[formulae.brew.sh]] للبحث عن الـ packages.`,
            when: "تجهيز ماك جديد للتطوير. تسطيب Docker Desktop أو VS Code.",
            mistakes: "[[brew install chrome]] مش شغال. الاسم الصح [[google-chrome]] وتاخده من الـ formulae.brew.sh."
          },
          lines: ["برنامج بواجهة (GUI) بيتسطب بـ [[--cask]].", "Docker Desktop."],
          sol: R`[[brew search --cask chrome]] مثلًا بيطبع تحت [[==> Casks]] أسامي زي [[google-chrome]] و [[google-chrome@beta]]. الاسم ده اللي تكتبه في [[brew install --cask google-chrome]]. و [[brew info --cask google-chrome]] يوريك النسخة والموقع الرسمي قبل ما تسطب.

الاسم في brew مش دايمًا زي اسم التطبيق: VS Code اسمه [[visual-studio-code]]. ولو التطبيق متسطب قبل كده من dmg، brew هيقولك إن فيه app موجود بالفعل في Applications، إما امسحه الأول أو استخدم [[--force]] وانت عارف انت بتعمل إيه.`
        },
        {
          cmd: "brew upgrade",
          title: "حدّث كل حاجة",
          desc: R`Homebrew شغال بكتالوج: لستة بكل البرامج المتاحة ونسخها، متخزّنة عندك. [[brew update]] بتحدّث الكتالوج ده بس ومش بتلمس برامجك، زي [[apt update]]. [[brew outdated]] بتقارن اللي متسطب عندك بالكتالوج وتطبع اللي ليه نسخة أحدث، ولو مطبعتش حاجة يبقى كله محدّث.

[[brew upgrade]] من غير اسم بتحدّث كل اللي في اللستة دي، ومع اسم ([[brew upgrade node]]) بتحدّث حاجة واحدة. و [[brew cleanup]] بتمسح النسخ القديمة والملفات المتنزلة اللي مبقتش محتاجها، وده ممكن يوفّر جيجات.

خد بالك: الترقية ممكن تنقل حاجة زي postgresql أو node لنسخة رئيسية جديدة وتبوّظ مشروع شغال. لو عايز تثبّت حاجة على نسختها: [[brew pin postgresql@16]].`,
          example: R`brew update
brew outdated
brew upgrade
brew cleanup`,
          try: "اعرف إيه اللي محتاج تحديث عندك بـ [[brew outdated]].",
          deep: {
            why: "تحديث الـ packages المسطّبة. زي apt upgrade في لينكس.",
            how: R`[[brew update]] بيجيب آخر لستة packages (تحديث Homebrew نفسه). [[brew upgrade]] بيحدّث كل المسطّبات.

[[brew upgrade node]] لـ package واحدة. [[brew outdated]] بيوريك اللي فيه تحديث.

[[brew cleanup]] بيمسح النسخ القديمة وبيوفّر مساحة.

وتقدر تعمل كل ده مرة واحدة: [[brew update && brew upgrade && brew cleanup]]. ممكن تحطها في cron أسبوعي.`,
            when: "بانتظام عشان تفضل محدّث وآمن.",
            mistakes: "تحديث قاعدة بيانات غير متوقع: [[brew upgrade postgresql]] ممكن يغيّر version رئيسية وبياناتك مش هتشتغل. اتأكد إيه اللي هيتحدّث."
          },
          lines: [
            "حدّث كتالوج Homebrew (زي apt update).",
            "إيه اللي فيه نسخة أحدث.",
            "حدّث كله (زي apt upgrade).",
            "امسح النسخ القديمة ووفّر مساحة."
          ],
          sol: R`[[brew outdated]] بيطبع سطر لكل حاجة قديمة زي [[node (24.1.0) < 24.8.0]]، ولو كله محدث مش بيطبع أي حاجة، وده معناه إنك تمام.

اعمل [[brew update]] الأول، وإلا الأداة هتقارن بلستة قديمة ومش هتشوف التحديثات الجديدة. وخد بالك إن الـ casks اللي بتحدث نفسها (زي Chrome) ممكن متظهرش هنا، [[brew outdated --greedy]] بيعرضها. وقبل [[brew upgrade]] في يوم شغل مهم، فكّر إن ترقية postgresql أو node ممكن تغيّر سلوك مشروعك.`
        },
        {
          cmd: "brew list / info",
          title: "اعرف متسطب إيه",
          desc: R`دول الأوامر اللي بتعرف بيها إيه اللي عندك وإيه المتاح. [[brew list]] بتطبع كل اللي سطّبته بـ brew، و [[--formula]] أو [[--cask]] بعدها تحصر النوع. [[brew search postgres]] بتدوّر في الكتالوج على أي اسم فيه الكلمة دي، فتعرف الاسم الصح (زي [[postgresql@16]]) قبل ما تسطّب.

[[brew info node]] بتطبع النسخة المتاحة، ولو متسطبة فين مكانها وحجمها، والاعتماديات، وأي Caveats (تعليمات لازم تعملها بعد التسطيب). و [[brew uninstall wget]] بتشيل الأداة، بس مش بتشيل الاعتماديات اللي اتسطبت معاها؛ [[brew autoremove]] بتمسح اللي مبقاش حد محتاجه.`,
          example: R`brew list
brew search postgres
brew info node
brew uninstall wget`,
          try: "اعرض معلومات أي حاجة متسطبة عندك.",
          deep: {
            why: "تعرف إيه المسطّب وأين ومتى آخر تحديث.",
            how: R`[[brew list]] كل الـ packages المسطّبة. [[brew list --formula]] الـ CLI tools بس. [[brew list --cask]] الـ GUI apps.

[[brew info node]] معلومات عن package: الـ version، وتاريخ آخر تحديث، والـ dependencies.

[[brew deps --tree node]] يعرض الـ dependencies كشجرة.

[[brew doctor]] بيشوف لو فيه مشاكل في إعداد Homebrew. مفيد لو حاجة مش شغالة.`,
            when: "بعد مشاكل تسطيب. التأكد من version معين. مراجعة ما هو مسطّب.",
            mistakes: "[[brew list]] بيطلع كتير. افلتر بـ [[brew list | grep git]]."
          },
          lines: ["المسطّب.", "دوّر على باكدج.", "تفاصيل باكدج ونسخته ومتسطب ولا لأ.", "شيل باكدج."],
          sol: R`[[brew info tree]] (أو أي حاجة من [[brew list]]) بيطبع أول سطر زي [[==> tree: stable 2.2.1 (bottled)]]، ووصف والموقع الرسمي، ومكان التسطيب زي [[/opt/homebrew/Cellar/tree/2.2.1]] وحجمه، وقسم Dependencies لو ليها اعتمادات.

لو قالك [[Not installed]] يبقى الأداة مش متسطبة لسه، والمعلومات اللي فوق عن النسخة المتاحة. ولو كتبت اسم غلط هيقولك [[No available formula with the name]]، دوّر الأول بـ [[brew search]].`
        },
        {
          cmd: "brew services",
          title: "خدمات في الخلفية (بديل systemctl)",
          desc: R`فيه برامج زي Postgres و Redis و Nginx مش أوامر تشغّلها وتخلص، دي سيرفرات لازم تفضل شغالة في الخلفية. [[brew services]] بتديرهم على الماك زي [[systemctl]] على لينكس، ومن جوه بتعمل ده بملفات launchd (نظام الخدمات بتاع الماك).

[[start]] بتشغّل الخدمة دلوقتي وكمان بتسجّلها تقوم لوحدها مع كل login. [[stop]] بتوقفها وتلغي التسجيل. [[list]] بتطبع كل خدمة وحالتها: [[started]] شغالة، و [[none]] مش متسجلة، و [[error]] حاولت تقوم ووقعت. و [[@16]] جزء من اسم الباكدج، يعني نسخة 16 من postgres.

لو عايز الخدمة تشتغل دلوقتي بس من غير ما تقوم مع الجهاز كل مرة: [[brew services run]].`,
          example: R`brew install postgresql@16
brew services start postgresql@16
brew services list
brew services stop postgresql@16`,
          try: "سطّب redis وشغّله بـ brew services واختبره بـ [[redis-cli ping]].",
          deep: {
            why: "تشغيل وإيقاف خدمات زي PostgreSQL وRedis وMongoDB. على الماك بيشتغلوا كـ LaunchAgents.",
            how: R`[[brew services list]] بيعرض الخدمات وحالتها. [[brew services start postgresql@16]] بيشغّلها. [[brew services stop]] بيوقّفها. [[brew services restart]] بيعيد تشغيل.

[[brew services start postgresql@16]] كمان بيخليها تشتغل مع كل restart للماك.

بديل: [[pg_ctl start]] أو [[redis-server]] بيشغّل مؤقتًا من غير ما يتسجّل كـ service.`,
            when: "تشغيل قاعدة بيانات محلية. تشغيل Redis للتطوير.",
            mistakes: "تحاول تشغّل postgresql القديم والجديد في نفس الوقت. بيتخانقوا على البورت."
          },
          lines: [
            "سطّب Postgres 16.",
            "شغّله كخدمة دايمة (بتقوم مع الماك). زي systemctl enable --now.",
            "الخدمات وحالتها.",
            "وقّفه."
          ],
          sol: R`[[brew install redis]] وبعدين [[brew services start redis]] يطبع [[==> Successfully started redis (label: homebrew.mxcl.redis)]]. [[brew services list]] يوريك redis بحالة [[started]]. و [[redis-cli ping]] يرد [[PONG]].

لو ping قالت [[Could not connect to Redis at 127.0.0.1:6379: Connection refused]]، بص في [[brew services list]]: لو الحالة [[error]] يبقى فيه حاجة تانية ماسكة بورت 6379 (زي Redis في Docker)، اعرفها بـ [[lsof -i :6379]]. وخد بالك إن start بيخليها تقوم مع كل boot، ولو عايزها تشتغل دلوقتي بس استخدم [[brew services run redis]].`
        }
      ]
    },
    {
      t: "أوامر الماك بس",
      l: 2,
      n: "مش موجودة في لينكس",
      items: [
        {
          cmd: "open",
          title: "افتح أي حاجة",
          desc: R`[[open]] أمر ماك بيفتح أي حاجة كأنك دوست عليها دبل كليك في Finder: فولدر يتفتح في Finder، وملف يتفتح بالبرنامج الافتراضي بتاعه، ولينك يتفتح في المتصفح. النقطة في [[open .]] معناها الفولدر الحالي.

[[-a]] بعدها اسم تطبيق، فبتختار البرنامج بنفسك بدل الافتراضي، والاسم لازم بين علامات تنصيص لو فيه مسافات زي [["Visual Studio Code"]]. الأمر مش بيطبع حاجة لو نجح.

المقابل على أوبونتو [[xdg-open]]، وعلى ويندوز [[start]]، فلو بتكتب سكربت هيشتغل على أكتر من نظام متعتمدش على [[open]].`,
          example: R`open .
open index.html
open -a "Visual Studio Code" .
open https://github.com`,
          try: "افتح مشروع في VS Code من الترمنال.",
          deep: {
            why: "فتح ملفات وفولدرات وURLs بالتطبيق الافتراضي. خاص بالماك.",
            how: R`[[open .]] يفتح الـ Finder على الفولدر الحالي. [[open file.pdf]] يفتح الـ PDF بالتطبيق الافتراضي. [[open http://localhost:3000]] يفتح المتصفح.

[[-a]] بيحدد التطبيق: [[open -a "Visual Studio Code" file.js]]. [[open -e file]] بيفتحه في TextEdit.

[[open -R file]] بيفتح Finder ويعلّم على الملف.

في لينكس: [[xdg-open]]. في ويندوز: [[start]].`,
            when: "فتح Finder على فولدر مشروع من terminal. فتح موقع لما يشتغل server.",
            mistakes: "[[open]] بيشتغل على الماك بس. في سكربتات cross-platform متستخدمهوش من غير check."
          },
          lines: [
            "افتح الفولدر الحالي في Finder.",
            "افتح ملف بالبرنامج الافتراضي (html في المتصفح).",
            "افتح الفولدر في VS Code ([[-a]] اختار برنامج).",
            "افتح لينك."
          ],
          sol: R`في فولدر المشروع: [[open -a "Visual Studio Code" .]] يفتح VS Code على الفولدر، ومش بيطبع حاجة. أو ثبت أمر [[code]] من VS Code نفسه (Cmd+Shift+P ثم Shell Command: Install 'code' command in PATH) وبعدها [[code .]].

لو ظهر [[Unable to find application named 'Visual Studio Code']] يبقى الاسم مختلف عندك (زي [[Visual Studio Code - Insiders]]) أو التطبيق مش في Applications. الاسم لازم بين علامات تنصيص لأن فيه مسافات. و [[open]] أمر ماك بس، على أوبونتو [[xdg-open]].`
        },
        {
          cmd: "pbcopy / pbpaste",
          title: "الكليب بورد",
          desc: R`pbcopy و pbpaste أوامر ماك بتوصّل الترمنال بالكليب بورد (اللي بتنسخ فيه بـ Cmd+C). [[pbcopy]] بتاخد أي نص داخل لها وتحطه على الكليب بورد بدل ما يتطبع، و [[pbpaste]] بتطبع اللي على الكليب بورد.

في المثال [[<]] معناها «خلي محتوى الملف ده هو اللي داخل للأمر»، و [[|]] (pipe) بتبعت ناتج الأمر اللي قبلها للي بعدها، و [[>]] بتكتب الناتج في ملف وتمسح اللي كان فيه. أشهر استخدام: نسخ مفتاح SSH العام عشان تلزقه في GitHub.

خد بالك: انسخ الملف اللي بينتهي بـ [[.pub]]، مش المفتاح الخاص. ونسخ [[.env]] معناه إن الباسوردات اللي فيه بقت على الكليب بورد، وممكن تلزقها في شات بالغلط.`,
          example: R`pbcopy < ~/.ssh/id_ed25519.pub
cat .env | pbcopy
pbpaste > notes.txt`,
          try: "انسخ ناتج [[ls -la]] والصقه في أي مكان.",
          deep: {
            why: "نسخ ولصق من الـ clipboard في terminal. خاص بالماك، مش في لينكس.",
            how: R`[[cat file.txt | pbcopy]] بينسخ محتوى الملف للـ clipboard. [[echo "text" | pbcopy]] بينسخ نص.

[[pbpaste]] بيطبع ما في الـ clipboard. [[pbpaste > file.txt]] يحفظه في ملف.

أمثلة مفيدة: [[pwd | pbcopy]] تنسخ المسار. [[cat ~/.ssh/id_rsa.pub | pbcopy]] تنسخ المفتاح العام. [[pbpaste | jq .]] تشوف JSON في الـ clipboard منسّق.

في لينكس: [[xclip]] أو [[xsel]] يعملوا نفس الحاجة.`,
            when: "نسخ ناتج أمر للـ clipboard. اللصق من clipboard في ملف.",
            mistakes: R`[[pbpaste]] ممكن يحط newline في الآخر. لو دقة مهمة: [[printf '%s' "$(pbpaste)"]].`
          },
          lines: [
            "انسخ مفتاحك العام للكليب بورد، جاهز تلزقه في GitHub.",
            "نفس الفكرة بـ pipe.",
            "الزق اللي في الكليب بورد في ملف."
          ],
          sol: R`[[ls -la | pbcopy]] مش بيطبع حاجة في الترمنال، الناتج راح للكليب بورد. Cmd+V في أي مكان (Notes أو المتصفح) هيلزق الناتج كامل. و [[pbpaste]] في الترمنال يطبعه تاني.

لو لزقت ولقيت حاجة قديمة، يبقى الـ pipe مش متكتب صح. و pbcopy بيشيل الألوان (مش بيحافظ عليها) وده كويس. ودي أوامر ماك بس، على لينكس فيه [[xclip]] أو [[wl-copy]]، وفي WSL [[clip.exe]].`
        },
        {
          cmd: "mdfind",
          title: "دوّر بـ Spotlight",
          desc: R`mdfind هو Spotlight (البحث بتاع Cmd+Space) بس من الترمنال. الماك بيعمل فهرس (index) لملفاتك في الخلفية، و mdfind بيسأل الفهرس ده فبيرد في ثانية، أما [[find]] فبيلف على الديسك ملف ملف.

من غير فلاجات بيدوّر في أسامي الملفات وجوه محتواها كمان. [[-name]] يحصر البحث في الأسامي بس، و [[-onlyin ~/projects]] يحصره في فولدر معين وما تحته، والكلمة اللي بتدوّر عليها بين علامات تنصيص لو فيها مسافات.

عيبه إنه مش بيشوف الفولدرات المستبعدة من Spotlight ولا الحاجات اللي لسه متفهرستش، فلو مطلعش نتيجة وانت متأكد إن الملف موجود، ارجع لـ [[find]].`,
          example: R`mdfind -name package.json
mdfind -onlyin ~/projects "TODO"`,
          try: "اعرف فين كل ملفات docker-compose.yml عندك.",
          deep: {
            why: "بحث Spotlight من terminal. أسرع بكتير من find لأنه بيستخدم الـ index.",
            how: R`[[mdfind "query"]] بيدوّر في كل الماك. [[mdfind -onlyin . "query"]] في الفولدر الحالي بس.

بيدوّر في محتوى الملفات كمان مش بس الأسامي.

[[mdfind -name "*.config"]] بيدوّر على الاسم.

فيه metadata queries: [[mdfind "kMDItemContentType == 'com.adobe.pdf'"]] كل ملفات PDF.

بيشتغل مباشرة من غير أي انتظار، لأن Spotlight بيعمل index في الخلفية دايمًا.`,
            when: "إيجاد ملف سريع. إيجاد كل ملفات بمحتوى معين.",
            mistakes: "مش بيدوّر في ملفات مخفية أو في فولدرات Spotlight excluded."
          },
          lines: ["دوّر على ملف بالاسم في الجهاز كله بـ Spotlight (لحظي).", "دوّر على كلمة جوه ملفات فولدر معين."],
          sol: R`[[mdfind -name docker-compose.yml]] بيطبع مسار كامل لكل ملف في سطر، زي [[/Users/ali/projects/shop/docker-compose.yml]]، في ثانية تقريبًا لأنه بيسأل فهرس Spotlight مش بيلف على الديسك.

[[-name]] بيطابق أي اسم فيه الكلمة، فممكن يطلع [[docker-compose.yml.bak]] كمان. ولو مطلعش حاجة وانت متأكد إن الملف موجود، يبقى الفولدر ده مستبعد من Spotlight (Privacy في إعدادات Spotlight) أو لسه متفهرسش، استخدم [[find ~ -name docker-compose.yml]] بدله. و mdfind ماك بس.`
        },
        {
          cmd: "caffeinate",
          title: "امنع الجهاز ينام",
          desc: R`الماك بينام لوحده لو ملمستش الكيبورد والماوس فترة، والنوم بيوقف أي build أو تحميل شغال. [[caffeinate]] بيمنعه ينام طول ما هو نفسه شغال.

[[-i]] بتمنع النوم بسبب عدم الاستخدام (idle sleep). ولو كتبت بعد caffeinate أمر زي [[npm run build]]، هو بيشغّله ويفضل مانع النوم لحد ما الأمر ده يخلص، وبعدها يقفل لوحده. [[-t 3600]] بتمنع النوم مدة بالثواني (3600 = ساعة). و [[-d]] تخلي الشاشة نفسها متطفيش.

Ctrl+C يوقفه في أي وقت. وقفل غطا اللابتوب بينيّمه برضه، caffeinate مش بيغلب ده.`,
          example: R`caffeinate -i npm run build
caffeinate -t 3600`,
          try: "شغّل [[caffeinate -t 60]] وسيب الجهاز.",
          deep: {
            why: "بيمنع الماك يدخل sleep أثناء تشغيل أمر طويل. مفيد جدًا لـ downloads أو builds.",
            how: R`[[caffeinate]] بيفضل شغال ويمنع الـ sleep لحد Ctrl+C. [[caffeinate -t 3600]] لساعة. [[caffeinate -i command]] بيشغّل الأمر ويمنع الـ sleep طول ما شغال.

[[caffeinate -s]] يمنع نوم السيستم طول ما الجهاز على الشاحن بس، وقفل الغطا هينيّمه برضه.

ممكن تشغّل في background: [[caffeinate &]] وبعدين [[kill %1]] تقفله.`,
            when: "npm install كبير. Docker build. نقل ملفات كبيرة.",
            mistakes: "إنك تنسى إنه شغال وتستغرب ليه الماك مش بيخش sleep. [[pkill caffeinate]] يقفله."
          },
          lines: ["شغّل الـ build وامنع الماك ينام لحد ما يخلص ([[-i]] idle).", "امنع النوم لساعة (٣٦٠٠ ثانية)."],
          sol: R`[[caffeinate -t 60]] مش بيطبع حاجة وبيفضل شغال دقيقة ويرجعلك الـ prompt لوحده. في الدقيقة دي الجهاز مش هينام حتى لو إعدادات النوم أقل. Ctrl+C يوقفه قبل كده.

عشان تتأكد وهو شغال، افتح ترمنال تاني واكتب [[pmset -g assertions]]، هتلاقي caffeinate في اللستة. وخد بالك إن [[-t]] لوحدها بتمنع نوم النظام بس وقفل الشاشة ممكن يحصل عادي، لو عايز الشاشة تفضل صاحية ضيف [[-d]]. وقفل غطا اللابتوب بيخليه ينام برضه.`
        },
        {
          cmd: "defaults",
          title: "إعدادات مخفية",
          desc: R`كل تطبيق على الماك بيحفظ إعداداته في ملف plist، و [[defaults]] بيقرا ويكتب الإعدادات دي من الترمنال، ومنها إعدادات مش موجودة في أي شاشة Settings.

الشكل: [[defaults write domain key value]]. الـ domain اسم التطبيق مكتوب بالمقلوب زي الدومين ([[com.apple.finder]] يعني Finder)، والـ key اسم الإعداد ([[AppleShowAllFiles]] يعني اعرض الملفات المخفية)، و [[-bool true]] نوع القيمة وقيمتها. [[defaults read]] بتقرا الإعداد، و [[defaults delete]] بتمسحه فيرجع للافتراضي.

التطبيق بيقرا إعداداته وهو بيفتح، فـ [[killall Finder]] بتقفل Finder والماك بيفتحه تاني لوحده بالإعداد الجديد. اكتب الـ key صح حرف بحرف: الغلط مش بيطلع error، بيتحفظ ومش بيأثر على حاجة. ولو عايز تشوف الملفات المخفية مرة، Cmd+Shift+. جوه Finder أسرع.`,
          example: R`defaults write com.apple.finder AppleShowAllFiles -bool true
killall Finder`,
          try: "جرّب Cmd+Shift+. في Finder الأول.",
          deep: {
            why: "قراية وتعديل إعدادات تطبيقات الماك والنظام من terminal. إعدادات مخبّية مش موجودة في الـ UI.",
            how: R`[[defaults write domain key value]] بيكتب إعداد. [[defaults read domain key]] بيقراه. [[defaults delete domain key]] بيمسحه.

أمثلة مفيدة: [[defaults write com.apple.finder AppleShowAllFiles true]] بيخلي Finder يعرض الملفات المخفية. [[defaults write NSGlobalDomain KeyRepeat -int 2]] بيسرّع الكيبورد repeat.

بعض التغييرات محتاج تقفل وتفتح التطبيق أو تعمل [[killall Finder]].

[[defaults read]] من غير arguments بيعرض كل إعدادات النظام.`,
            when: "تخصيص الماك بشكل متقدم. automation لإعداد ماك جديد.",
            mistakes: "بعض التغييرات محتاج restart. وبعضها بيترجع للأصل بعد تحديث نظام."
          },
          lines: ["خلّي Finder يعرض الملفات المخفية.", "اقفل Finder وافتحه عشان يطبّق."],
          sol: R`جوه أي نافذة Finder دوس Cmd+Shift+. (نقطة): هتظهر الملفات والفولدرات اللي بتبدأ بنقطة زي [[.git]] و [[.env]] باهتة شوية. دوسها تاني ترجع مخفية. التغيير ده بيفضل حتى بعد ما تقفل Finder.

الفرق عن أمر [[defaults write]] إن الاختصار سريع ومش محتاج [[killall Finder]]. لو مفيش حاجة ظهرت، يبقى الفولدر ده مفيهوش ملفات مخفية أصلًا، جرب الـ home بتاعك. ولو استخدمت الأمر ونسيت [[killall Finder]] مش هيبان تغيير لحد ما Finder يعيد التشغيل.`
        },
        {
          cmd: "sw_vers",
          title: "معلومات الجهاز",
          desc: R`[[sw_vers]] بيطبع نسخة macOS اللي عندك (الاسم والرقم ورقم الـ build)، وده أول حاجة تتأكد منها قبل ما تطبّق شرح من النت.

[[uname -m]] بيطبع نوع المعالج: [[arm64]] يعني Apple Silicon (M1 وما بعده)، و [[x86_64]] يعني Intel. الفرق ده بيبان مع Docker: image معمولة لـ amd64 بس بتشتغل على جهاز M بمحاكاة أبطأ أو مش بتشتغل خالص، وبتحتاج [[--platform linux/amd64]].

[[system_profiler SPHardwareDataType]] بيطبع تفاصيل الجهاز: اسم الشريحة والرام والرقم التسلسلي. لو هتبعت الناتج لحد يساعدك، شيل الرقم التسلسلي منه.`,
          example: R`sw_vers
uname -m
system_profiler SPHardwareDataType`,
          try: "اعرف نسخة macOS ونوع المعالج.",
          deep: {
            why: "معلومات عن نسخة الماك. أهم معلومة لما تستخدم أي شرح أونلاين.",
            how: R`[[sw_vers]] بيعرض ProductName وProductVersion وBuildVersion. مفيد جدًا عشان تعرف انت على Tahoe (26) أو Sequoia (15) أو Sonoma (14).

[[uname -m]] بيعرض المعالج: [[arm64]] هو Apple Silicon، [[x86_64]] هو Intel.

[[system_profiler SPHardwareDataType]] تفاصيل كاملة عن الـ hardware.`,
            when: "قبل ما تاخد شرح من أونلاين: تتأكد إنه للنسخة بتاعتك. ولما تطلب مساعدة تقدر تدّي المعلومات.",
            mistakes: "تطبّق شرح مكتوب لنسخة macOS تانية. بعض الأوامر اتغيرت مع الوقت."
          },
          lines: ["نسخة macOS.", "المعالج: arm64 يعني Apple Silicon، و x86_64 يعني Intel.", "كل تفاصيل الجهاز."],
          sol: R`[[sw_vers]] بيطبع 3 سطور: [[ProductName: macOS]] و [[ProductVersion: 15.6]] (الرقم حسب جهازك) و [[BuildVersion]]. و [[uname -m]] بيطبع [[arm64]] (Apple Silicon: M1 وما بعده) أو [[x86_64]] (Intel). و [[system_profiler SPHardwareDataType]] يطلع اسم الشريحة (زي [[Chip: Apple M2]]) والرام.

فخ مهم: لو الترمنال نفسه شغال بـ Rosetta، [[uname -m]] هيطبع [[x86_64]] حتى على جهاز M. اتأكد من [[sysctl -n machdep.cpu.brand_string]] أو من سطر Chip في system_profiler.`
        }
      ]
    },
    {
      t: "الفروق عن لينكس",
      l: 2,
      n: "الماك بيستخدم نسخ BSD من الأدوات، ولينكس نسخ GNU. نفس الأسامي، وبعض الفلاجات مختلفة",
      items: [
        {
          cmd: "sed -i ''",
          title: "sed على الماك",
          desc: R`[[sed]] بيعدّل نص. [['s/3000/4000/g']] معناها: [[s]] استبدل، و 3000 القديم، و 4000 الجديد، و [[g]] كل مرة في السطر مش أول مرة بس. [[-i]] معناها عدّل الملف نفسه بدل ما تطبع الناتج على الشاشة.

هنا الفرق: sed الماك (نسخة BSD) لازم ياخد بعد [[-i]] امتداد لملف باك أب. [['']] (نص فاضي) معناها من غير باك أب، و [['.bak']] معناها احفظ النسخة القديمة في [[.env.bak]]. sed لينكس (GNU) مش بياخد الحتة دي منفصلة، فأمر لينكس على الماك بيطلع error غريب، وأمر الماك على لينكس بيفشل برضه.

لو السكربت لازم يشتغل على الاتنين: [[-i.bak]] لازقة من غير مسافة، وبعدها امسح ملف الـ bak.`,
          example: R`sed -i '' 's/3000/4000/g' .env
sed -i '.bak' 's/3000/4000/g' .env`,
          try: "غيّر البورت في .env، وبعدين جرب التانية وشوف ملف .env.bak اللي اتعمل.",
          deep: {
            why: "[[sed -i]] على الماك بيشتغل بشكل مختلف عن لينكس. ده الفرق الأشهر في سكربتات cross-platform.",
            how: R`على لينكس: [[sed -i 's/old/new/g' file]]. على الماك: [[sed -i '' 's/old/new/g' file]].

الفرق: [[sed]] على الماك هو BSD sed مش GNU sed. BSD sed بيطلب extension للـ backup حتى لو فاضي ([['']]). GNU sed مش محتاج.

الحل لسكربتات cross-platform: استخدم perl: [[perl -pi -e 's/old/new/g' file]]. بيشتغل على الاتنين.

أو سطّب GNU sed على الماك: [[brew install gnu-sed]]، وبيبقى اسمه [[gsed]].`,
            when: "أي سكربت بيستخدم sed -i على الماك.",
            mistakes: "تنسى [['']] على الماك فيطلع error غريب. وبعض السكربتات من GitHub بتشتغل على لينكس وتفشل على الماك بسببه."
          },
          lines: [
            "عدّل الملف مباشرة. على الماك لازم [['']] الفاضية بعد -i، وإلا error.",
            "أو اعمل نسخة احتياطية باسم .env.bak قبل التعديل."
          ],
          sol: R`[[sed -i '' 's/3000/4000/g' .env]] مش بيطبع حاجة، و [[cat .env]] هيوريك [[PORT=4000]]. التانية [[sed -i '.bak' ...]] بتعدّل .env وبتعمل [[.env.bak]] فيه القديم. [[ls -a]] هيوريك الاتنين.

لو شغلت أمر لينكس [[sed -i 's/3000/4000/g' .env]] على الماك هيطلع error زي [[sed: 1: ".env": invalid command code .]]، لأن sed الماك اعتبر السكربت امتداد الباك أب واعتبر [[.env]] هو الأوامر. والعكس: أمر الماك على لينكس (GNU sed) بيفشل؛ جربته فطلع [[sed: can't read s/3000/4000/g: No such file or directory]] والملف متغيرش. عشان سكربت يشتغل على الاتنين استخدم [[-i.bak]] لازقة من غير مسافة.`
        },
        {
          cmd: "lsof -i",
          title: "مين على البورت",
          desc: R`[[lsof]] معناها list open files. في الماك ولينكس الاتصالات الشبكية بتتعامل كملفات، فـ [[-i]] بتحصر الناتج على الشبكة، و [[:3000]] على بورت معين. ده بديل [[ss]] اللي مش موجود على الماك.

[[-P]] بتطبع البورت كرقم بدل اسمه (من غيرها 3000 بيظهر [[hbci]])، و [[grep LISTEN]] بتسيب البورتات اللي فيه برنامج مستني عليها. [[-t]] بتطبع رقم العملية (PID) بس، و [[$(...)]] بتحط الرقم ده مكانها جوه أمر [[kill]].

[[-9]] بيقتل العملية فورًا من غير ما تقفل نفسها بهدوء أو تحفظ حاجة، فجرّب [[kill]] من غيرها الأول. ومن غير [[sudo]] lsof بيوريك عملياتك انت بس.`,
          example: R`lsof -i :3000
lsof -i -P | grep LISTEN
kill -9 $(lsof -t -i :3000)`,
          try: "شغّل [[python3 -m http.server 3000]] واقفله من ترمنال تاني بآخر سطر.",
          flag: "danger",
          deep: {
            why: "مين ماسك بورت على الماك. زي ss على لينكس.",
            how: R`[[lsof -i :3000]] بيعرض الـ process اللي على بورت 3000. [[lsof -i TCP:3000]] أوضح.

[[lsof -i]] كل الـ network connections. [[lsof -iTCP -sTCP:LISTEN]] البورتات اللي بتستمع بس.

الناتج: COMMAND (اسم البرنامج)، PID، USER، والـ connection.

[[kill -9 $(lsof -ti :3000)]] بيقتل البرنامج الماسك البورت في أمر واحد.`,
            when: "EADDRINUSE. تعرف مين شغال على بورت معين.",
            mistakes: "تنسى الـ [[sudo]] مع lsof: بدون sudo بيعرض بس processes بتاعتك أنت."
          },
          lines: [
            "مين ماسك بورت 3000 (بديل ss على الماك).",
            "كل البورتات اللي بتسمع، بأرقام ([[-P]]).",
            "اقفل اللي ماسك البورت: [[-t]] يطلع رقم العملية بس، و kill ياخده."
          ],
          sol: R`في ترمنال: [[python3 -m http.server 3000]] يطبع [[Serving HTTP on :: port 3000]]. في التاني [[lsof -i :3000]] يطبع سطر فيه [[COMMAND Python]] و الـ PID و [[TCP *:hbci (LISTEN)]]. hbci هو اسم بورت 3000 في ملف services، و [[-P]] بتخليه يكتب 3000. بعدين [[kill -9 $(lsof -t -i :3000)]]، والترمنال الأول هيطبع [[zsh: killed     python3 -m http.server 3000]].

لو السيرفر مش شغال، [[lsof -t]] مش هيطبع حاجة و kill يقول [[kill: not enough arguments]] (جربتها في zsh وطلعت كده). ولو [[lsof -i :3000]] مطبعش حاجة والبرنامج شغال، يبقى البرنامج بتاع يوزر تاني، جرب [[sudo lsof -i :3000]]. وابدأ بـ [[kill]] من غير [[-9]] عشان البرنامج يقفل بهدوء.`
        },
        {
          cmd: "top -o mem",
          title: "الرام والمعالج",
          desc: R`مفيش أمر [[free]] على الماك، و [[top]] بتاعه مختلف عن لينكس. [[top]] بيعرض العمليات الشغالة ويحدّث الشاشة كل ثانية، و [[-o mem]] بيرتّبهم بالرام من الأكبر (و [[-o cpu]] بالمعالج). q للخروج.

[[vm_stat]] بيطبع إحصائيات الذاكرة بالـ pages مش بالبايت (الصفحة 16KB على Apple Silicon)، فمتقراش الأرقام دي كأنها ميجا. ولو عايز الشكل المألوف من لينكس سطّب [[htop]] من brew.

للاستخدام اليومي Activity Monitor أوضح، لأن تطبيق زي Chrome متقسم لعشرات العمليات و top بيعرضهم منفصلين.`,
          example: R`top -o mem
vm_stat
brew install htop`,
          try: "اعرف أكتر تطبيق بياكل رام.",
          deep: {
            why: "الماك له [[top]] مختلف عن لينكس، وفيه [[Activity Monitor]] الرسومي، بس من terminal لازم تعرف الفرق.",
            how: R`[[top]] على الماك: [[o]] لتغيير ترتيب. [[top -o mem]] مرتب بالذاكرة. [[top -o cpu]] بالـ CPU.

[[top -l 1]] بياخد snapshot واحد ويخرج. مفيد في السكربتات.

الفرق عن htop: htop مش موجود افتراضيًا، سطّبه بـ [[brew install htop]].

Activity Monitor أسهل للاستخدام اليومي: Cmd+Space ثم «Activity Monitor».`,
            when: "السيستم بطيء وعايز تعرف السبب من terminal.",
            mistakes: "[[top]] على الماك من غير arguments مش مرتب بشكل مفيد. حدد [[-o mem]] أو [[-o cpu]]."
          },
          lines: [
            "top مرتب بالرام ([[-o]] ترتيب، مش زي لينكس).",
            "إحصائيات الذاكرة (بديل free اللي مش موجود على الماك).",
            "أو سطّب htop وخلاص."
          ],
          sol: R`[[top -o mem]] بيرتب العمليات بعمود MEM من الأكبر، فأول سطر تحت الهيدر هو أكتر حاجة بتاكل رام (غالبًا Chrome Helper أو Safari أو Docker أو WindowServer). q يخرجك.

لو بتدور على «التطبيق» كله مش عملية واحدة، Activity Monitor أوضح لأن Chrome مثلًا متقسم لعشرات العمليات. و [[vm_stat]] بيطبع أرقام بالـ pages مش بالبايت (الـ page على Apple Silicon 16KB)، فمتقارنش الأرقام دي مباشرة بالجيجا. ولو [[top -o mem]] قال illegal option، يبقى انت على لينكس، هناك [[top]] ثم Shift+M.`
        },
        {
          cmd: "date -v",
          title: "حساب التواريخ",
          desc: R`[[date +%F]] بيطبع تاريخ النهارده بشكل [[2026-09-30]]: الـ [[+]] معناها «ده شكل الطباعة»، و [[%F]] اختصار لسنة-شهر-يوم. ده زي لينكس بالظبط، الحساب هو اللي بيختلف.

date الماك (نسخة BSD) بيحسب بـ [[-v]]، وبعدها [[-]] أو [[+]] ورقم ووحدة: [[d]] يوم، و [[w]] أسبوع، و [[m]] شهر، و [[y]] سنة، و [[H]] ساعة. فـ [[-v-1d]] إمبارح، و [[-v+7d]] بعد أسبوع.

لينكس (GNU) مش بيفهم [[-v]] وبيكتبها [[date -d yesterday]]، والماك مش بيفهم [[-d]]. فسكربت باك أب منقول من السيرفر للماك هيقع هنا؛ الحل في درس coreutils.`,
          example: R`date +%F
date -v-1d +%F
date -v+7d +%F`,
          try: "اطبع تاريخ النهارده، وتاريخ إمبارح، وتاريخ بعد أسبوع، كلهم بصيغة [[+%F]].",
          deep: {
            why: "التلاعب بالتواريخ على الماك. مختلف تمامًا عن GNU date في لينكس.",
            how: R`[[date]] على الماك هو BSD date. [[date -v+1d]] التاريخ بعد يوم. [[date -v-7d]] قبل أسبوع. [[date -v+1m]] الشهر الجاي.

[[date -j -f "%Y-%m-%d" "2024-01-15" "+%A"]] يحوّل تاريخ لاسم اليوم.

الفرق عن لينكس: [[date -d "+1 day"]] شغالة على لينكس بس. على الماك: [[-v+1d]].

للسكربتات cross-platform: [[python3 -c "import datetime; print(...)"]]. أو سطّب GNU date: [[brew install coreutils]] وبيبقى [[gdate]].`,
            when: "سكربتات باك أب أو reports بتحتاج تواريخ.",
            mistakes: "استخدام [[date -d]] (GNU) في سكربت على الماك."
          },
          lines: ["تاريخ النهارده.", "امبارح: [[-v-1d]] (على لينكس كانت [[-d yesterday]]).", "بعد أسبوع."],
          sol: R`على الماك: [[date +%F]] بيطبع زي [[2026-09-30]]، و [[date -v-1d +%F]] بيطبع [[2026-09-29]]، و [[date -v+7d +%F]] بيطبع [[2026-10-07]].

لو جربت [[date -v-1d]] على لينكس هيطلع [[date: invalid option -- 'v']] (جربتها فعلًا)، والعكس [[date -d yesterday]] على الماك بيطلع [[illegal option -- d]]. و [[-v]] بتتعامل مع آخر الشهر صح، يعني [[date -v+1d]] من 30 سبتمبر يطلع 1 أكتوبر. ولو محتاج نفس الأمر على الاتنين، سطب coreutils واستخدم [[gdate]] (درس coreutils).`
        },
        {
          cmd: "shasum",
          title: "الهاش (hash)",
          desc: "الـ hash بصمة فريدة للملف: لو اتغير فيه بايت واحد البصمة كلها تتغير. على الماك [[shasum -a 256]] بدل [[sha256sum]] بتاع لينكس، و [[md5]] بدل [[md5sum]].",
          example: R`shasum -a 256 file.zip
md5 file.zip`,
          try: "اطلع هاش لملف، غيّر فيه حرف، واطلع الهاش تاني ولاحظ إنه اتغير كله.",
          deep: {
            why: "التحقق من سلامة الملفات. على الماك الأمر [[shasum]] مش [[sha256sum]].",
            how: R`[[shasum -a 256 file]] بيحسب SHA-256 (مش [[sha256sum]] زي لينكس).

[[shasum -a 256 file > file.sha256]] بيحفظ. [[shasum -a 256 -c file.sha256]] بيتحقق.

[[md5 file]] لـ MD5 (مش [[md5sum]]).

الأسامي على لينكس: [[sha256sum]]، [[sha512sum]]، [[md5sum]]. على الماك: [[shasum -a 256]]، [[shasum -a 512]]، [[md5]].

أو سطّب coreutils: [[brew install coreutils]] وبيبقى عندك [[gsha256sum]].`,
            when: "التحقق من ملف نزّلته. باك أب integrity check.",
            mistakes: "استخدام [[sha256sum]] مباشرة على الماك: «command not found». استخدم [[shasum -a 256]]."
          },
          lines: ["بصمة SHA256 (الأمر اسمه shasum مش sha256sum).", "بصمة MD5 (الأمر md5 مش md5sum)."],
          sol: R`[[echo hello > f.txt]] و [[shasum -a 256 f.txt]] بيطبع 64 حرف وبعدهم اسم الملف. جربتها فطلع [[5891b5b5...6be03  f.txt]]. غيّر حرف واحد ([[hellp]]) وشغّله تاني: طلع [[bf8c8341...3cda6]]، رقم مختلف تمامًا مش حرف أو اتنين.

ده اللي بيخلي الهاش مفيد: أصغر تغيير بيغيّر البصمة كلها. ولو كتبت [[shasum f.txt]] من غير [[-a 256]] هيطلع SHA-1 (40 حرف) ومش هيطابق SHA256 المكتوب في صفحة التحميل. و [[md5]] على الماك شكل ناتجه [[MD5 (f.txt) = ...]] مش زي md5sum بتاع لينكس.`
        },
        {
          cmd: "coreutils",
          title: "خلّي الأوامر زي لينكس بالظبط",
          desc: R`الماك بييجي بنسخ BSD من الأدوات الأساسية (sed و date و ls وغيرهم)، والسيرفرات اللينكس عليها نسخ GNU، ونفس الأمر بيتصرف مختلف على الاتنين. [[coreutils]] باكدج فيها نسخ GNU من ls و date و cp وغيرهم، و [[gnu-sed]] فيها sed بتاع GNU.

عشان متبوّظش أوامر الماك الأصلية، brew بيسطّبهم بحرف [[g]] في أول الاسم: [[gsed]] و [[gdate]] و [[gls]]. فـ [[gsed -i 's/a/b/g' file]] بتشتغل زي لينكس من غير [['']]، و [[gdate -d yesterday +%F]] بتفهم كلمة yesterday.

ممكن تخليهم بالأسامي العادية بإضافة فولدر [[gnubin]] للـ PATH (التفاصيل تحت)، بس ساعتها أي سكربت ماك متوقع سلوك BSD ممكن يتلخبط.`,
          example: R`brew install coreutils gnu-sed
gsed -i 's/a/b/g' file
gdate -d yesterday +%F`,
          try: "سطّبهم وجرب أمر sed بتاع لينكس بـ gsed.",
          deep: {
            why: "أوامر الماك هي BSD versions مختلفة عن GNU versions اللي على لينكس. coreutils بيسطّب GNU versions على الماك.",
            how: R`[[brew install coreutils]] بيسطّب كل GNU coreutils. الأوامر بتبقى متاحة بـ [[g]] prefix: [[gls]]، [[gdate]]، [[gcp]]، [[gsed]].

لو عايز الـ GNU بدون prefix في الـ PATH: أضيف للـ .zshrc:
[[export PATH="$(brew --prefix)/opt/coreutils/libexec/gnubin:$PATH"]]

وبعدها [[ls]] هتشتغل كـ GNU. بعض الناس بيفضّلوا الـ prefix عشان واضح إنك بتستخدم GNU version.

أشهر الفروق: [[ls]] (colors مختلفة)، [[sed -i]] (syntax مختلف)، [[date]] (options مختلفة).`,
            when: "لما سكربت من لينكس مش بيشتغل على الماك. لما محتاج GNU-specific features.",
            mistakes: "تضيف GNU للـ PATH بدون prefix وتنتج سلوك مختلف مش متوقع في بعض الحالات."
          },
          lines: [
            "سطّب نسخ GNU من الأدوات، بتيجي بحرف g قبل الاسم.",
            "gsed بيشتغل زي sed لينكس بالظبط.",
            "gdate بيفهم كلام زي yesterday."
          ],
          sol: R`بعد [[brew install coreutils gnu-sed]]، [[gsed -i 's/3000/4000/g' .env]] يشتغل زي لينكس بالظبط من غير [['']]، و [[gdate -d yesterday +%F]] يطبع تاريخ إمبارح. و [[gsed --version]] أول سطر [[sed (GNU sed) 4.9]].

لو [[gsed]] قالت command not found يبقى brew مش في الـ PATH أو التسطيب لسه مخلصش. والأوامر الأصلية ([[sed]] و [[date]]) لسه هي بتاعة الماك، ومتغيرش أسماءها في النظام؛ ده مقصود عشان متبوظش سكربتات الماك نفسه.`
        },
        {
          cmd: "man بدل --help",
          title: "الشرح",
          desc: R`على لينكس أغلب الأوامر بتطبع شرح مختصر لو كتبت بعدها [[--help]]. أوامر الماك نسخ BSD ومعظمها مش بيفهم الـ options الطويلة دي، فـ [[ls --help]] بيطلع [[unrecognized option]] وتحته سطر usage فيه حروف الـ options بس.

الشرح الكامل في [[man]] (اختصار manual): [[man ls]] بيفتح صفحة الأمر، تتحرك بالأسهم أو المسافة، و [[/word]] بتدوّر على كلمة جوه الصفحة، و q للخروج. [[tldr]] أداة بتسطّبها من brew وبتديك أشهر أمثلة الأمر في صفحة قصيرة بدل الشرح الطويل.`,
          example: R`ls --help
man ls
brew install tldr
tldr find`,
          try: "قارن [[ls --help]] على الماك وعلى أوبونتو.",
          deep: {
            why: "على الماك، كتير من الأوامر مش بيدعم [[--help]]. [[man]] هو الطريقة الرسمية.",
            how: R`[[man ls]] بيفتح manual في less. [[q]] للخروج. [[/keyword]] للبحث.

[[man -k keyword]] بيدوّر على الـ manuals كلها اللي فيها الكلمة. [[man man]] المساعدة عن المساعدة نفسها.

بعض الأوامر عندها section: [[man 1 cd]] للـ shell commands، [[man 2 open]] للـ system calls.

[[tldr ls]] بديل: بيدّيك أمثلة عملية بسرعة. بيتسطّب بـ [[brew install tldr]].`,
            when: "نسيت option معين. تتعلم أمر جديد. أمر طلع error غريب.",
            mistakes: "تكتب [[command --help]] وتستغرب إنه مش شغال على الماك. جرّب [[man command]] الأول."
          },
          lines: [
            "على الماك ده بيطلع error، أوامر BSD مش بتفهم --help.",
            "الدليل الرسمي، q للخروج.",
            "سطّب tldr.",
            "أشهر أمثلة لأمر find في صفحة واحدة."
          ],
          sol: R`على الماك [[ls --help]] بيطبع error زي [[ls: unrecognized option]] وتحته سطر [[usage: ls ...]] فيه لستة حروف الـ options بس، لأن ls بتاع BSD مش بيعرف [[--help]]. على أوبونتو نفس الأمر بيطبع شرح طويل لكل option بالإنجليزي.

ده مش معناه إن ls على الماك ناقص، الشرح في [[man ls]]. وخد بالك إن الـ options نفسها ممكن تختلف بين الاتنين، فأمر نقلته من شرح لينكس ممكن يطلع [[illegal option]]، وساعتها بص في man على الماك أو استخدم نسخة GNU من coreutils.`
        }
      ]
    },
    {
      t: "الشبكة",
      l: 2,
      n: "",
      items: [
        {
          cmd: "networkQuality",
          title: "اختبار سرعة النت (موجود في الماك)",
          desc: R`[[networkQuality]] أداة من Apple مبنية في الماك من macOS Monterey (12)، بتعمل اختبار سرعة من الترمنال من غير ما تفتح موقع.

بتطبع 3 أرقام: Downlink وده سرعة التحميل، و Uplink سرعة الرفع (الاتنين بالـ Mbps)، و Responsiveness ودي قد إيه النت بيرد بسرعة وهو مضغوط، بتتقاس بالـ RPM (عدد الردود في الدقيقة، وكل ما تكبر أحسن). الرقم الأخير ده هو اللي بيبان في مكالمات الفيديو والألعاب: ممكن نت سريع يقطّع لو الـ Responsiveness واطية.

الأمر بياخد حوالي 20 ثانية وبيستهلك داتا، فمتشغّلوش على نت محدود كتير.`,
          example: "networkQuality",
          try: "قارن النتيجة على الواي فاي وعلى الكابل.",
          deep: {
            why: "قياس سرعة النت والـ latency بدون أي موقع خارجي. مبني في الماك (Monterey+).",
            how: R`[[networkQuality]] بيعمل speed test وبيقولك: Upload، وDownload، والـ Responsiveness (RPM: عدد الـ round trips في الدقيقة وقت الضغط).

[[-v]] verbose مع تفاصيل أكتر. [[-s]] sequential بدل parallel.

الـ Responsiveness مهم للـ video calls والـ gaming: مش بس السرعة، بس كم طلب بتعمله في وقت واحد.`,
            when: "النت بطيء وعايز تعرف المشكلة. قبل مكالمة مهمة.",
            mistakes: "[[networkQuality]] موجود من Monterey فصاعدًا. على الإصدارات الأقدم مش موجود."
          },
          lines: ["قياس سرعة النت والاستجابة، مبني في الماك."],
          sol: R`[[networkQuality]] بياخد حوالي 20 ثانية وبعدين يطبع [[Uplink capacity]] و [[Downlink capacity]] بالـ Mbps، و [[Responsiveness]] بالـ RPM مع تقييم زي High أو Medium أو Low، وقيمة Idle Latency.

المتوقع إن الكابل يطلع Responsiveness أعلى وسرعة أثبت من الواي فاي، خصوصًا لو بعيد عن الراوتر. لو الواي فاي أقل بكتير، المشكلة غالبًا في الإشارة مش الخط. و Responsiveness واطية مع سرعة عالية معناها إن النت بيعلق لما حد تاني بيحمّل. ولو قالك command not found يبقى نسختك أقدم من Monterey.`
        },
        {
          cmd: "ifconfig / route",
          title: "عناوينك والطريق",
          desc: R`مفيش أمر [[ip]] على الماك، بداله [[ifconfig]] للكروت وعناوينها و [[route]] للطريق. كل كارت شبكة ليه اسم: [[en0]] غالبًا الواي فاي، و [[lo0]] الـ loopback (الجهاز بيكلم نفسه). في ناتج [[ifconfig en0]] السطر اللي بيبدأ بـ [[inet]] فيه الـ IP بتاعك على الشبكة.

[[route -n get default]] بيطبع الطريق الافتراضي، يعني الراوتر (gateway) اللي أي حاجة رايحة برا شبكتك بتعدّي عليه، و [[-n]] معناها اطبع أرقام من غير ما تحوّلها لأسامي. [[networksetup -listallhardwareports]] بيطبع كل كارت والاسم الحقيقي بتاعه (Wi-Fi أو Ethernet).

ملف [[/etc/hosts]] مكانه زي لينكس، وتعديله محتاج [[sudo]] لأنه ملف نظام.`,
          example: R`ifconfig en0
route -n get default
networksetup -listallhardwareports
sudo nano /etc/hosts`,
          try: "اعرف IP جهازك على الشبكة من [[ifconfig en0]]، و IP الراوتر من [[route -n get default]].",
          deep: {
            why: "معلومات الشبكة التفصيلية على الماك. [[ifconfig]] هو المقابل لـ [[ip a]] في لينكس.",
            how: R`[[ifconfig]] بيعرض كل الكروت وعناوينها. [[ifconfig en0]] كارت Wi-Fi فقط.

في الناتج: [[inet]] هو IPv4 الخاص. [[inet6]] هو IPv6. [[ether]] هو MAC address. [[status: active]] الكارت شغال.

[[netstat -rn]] جدول الـ routing (زي [[ip route]] في لينكس). الـ default route هو السطر اللي Destination بتاعه [[default]].

الكروت الشائعة: [[en0]] Wi-Fi، [[en1]] Ethernet على بعض الماكات، [[lo0]] loopback.`,
            when: "إيجاد عنوان الماك على الشبكة. troubleshooting شبكة.",
            mistakes: "[[ifconfig]] على الماك يطلع كتير من الـ virtual interfaces. فلتر على اسم الكارت."
          },
          lines: [
            "عناوين كارت الواي فاي (en0).",
            "الراوتر الافتراضي (زي ip route).",
            "أسامي كل الكروت، عشان تعرف الواي فاي en0 ولا en1.",
            "ملف hosts نفس مكانه زي لينكس."
          ],
          sol: R`[[ifconfig en0]] دوّر فيه على سطر [[inet 192.168.1.15 netmask 0xffffff00 broadcast 192.168.1.255]]: الرقم بعد inet هو IP جهازك. و [[route -n get default]] هيطبع سطر [[gateway: 192.168.1.1]]، ده الراوتر، ومعاه [[interface: en0]].

لو [[ifconfig en0]] مفيهوش سطر inet، يبقى en0 مش الكارت اللي انت متوصل بيه (مثلًا على Mac بكابل أو بعض الموديلات الواي فاي بيبقى en1)؛ [[route -n get default]] بيقولك الـ interface الصح في سطر interface، و [[networksetup -listallhardwareports]] يوريك أنهي en هو Wi-Fi. سطر [[inet6]] ده IPv6 مش هو المطلوب.`
        },
        {
          cmd: "ipconfig getifaddr",
          title: "الـ IP بتاعك",
          desc: R`[[ipconfig getifaddr en0]] بيطبع الـ IP المحلي بتاع الكارت en0 (غالبًا الواي فاي) في سطر واحد من غير كلام زيادة، فينفع جوه سكربت. ده العنوان اللي جوه شبكة البيت، زي [[192.168.1.15]]، وهو اللي تفتح بيه سيرفر شغال على جهازك من موبايل على نفس الواي فاي.

[[curl ifconfig.me]] بيسأل موقع برا عن العنوان اللي شايفك بيه، وده الـ IP العام بتاع الراوتر على النت. الاتنين مختلفين لأن الراوتر بيخبّي كل أجهزة البيت ورا عنوان عام واحد (NAT).

خد بالك إن [[ipconfig]] على الماك أمر تاني خالص غير [[ipconfig]] بتاع ويندوز.`,
          example: R`ipconfig getifaddr en0
curl ifconfig.me`,
          try: "اعرف الـ IP المحلي والعام.",
          deep: {
            why: "أسرع طريقة تعرف عنوانك على الـ Wi-Fi على الماك. سطر واحد.",
            how: R`[[ipconfig getifaddr en0]] بيطبع عنوان Wi-Fi بس. [[en0]] هو الاسم الافتراضي للـ Wi-Fi على معظم الماكات. بعض الماكات [[en1]].

عنوانك العام (IP على النت): [[curl ifconfig.me]] أو [[curl ipinfo.io/ip]].

ولو مش عارف اسم كارتك: [[networksetup -listallhardwareports]] بيعرض كل الكروت.`,
            when: "شارك الـ URL مع موبايل على نفس الواي فاي. تعرف عنوانك على الشبكة.",
            mistakes: "تستخدم [[en0]] وجهازك الـ Wi-Fi على [[en1]]. افحص بـ [[ifconfig]] أو [[networksetup]]."
          },
          lines: ["عنوانك على الواي فاي في سطر واحد.", "عنوانك العام على النت."],
          sol: R`[[ipconfig getifaddr en0]] بيطبع الـ IP المحلي بس، زي [[192.168.1.15]]. و [[curl ifconfig.me]] بيطبع الـ IP العام زي [[41.x.x.x]]، ومن غير سطر جديد في الآخر فالـ prompt بيلزق جنبه، ده طبيعي.

الاتنين مختلفين لأن الراوتر بيعمل NAT. لو [[getifaddr en0]] مطبعش حاجة، يبقى الكارت ده مش متوصل، جرب [[en1]]. ولو [[curl ifconfig.me]] طبع IP غريب مش بتاع مزود النت، يبقى انت على VPN.`
        },
        {
          cmd: "flush DNS",
          title: "امسح كاش الـ DNS",
          desc: R`الـ DNS هو اللي بيحوّل اسم زي [[example.com]] لـ IP. الماك بيحفظ الردود دي فترة (كاش) عشان ميسألش كل مرة، فلو غيّرت سجل DNS لدومينك أو عدّلت [[/etc/hosts]]، ممكن يفضل يفتح العنوان القديم.

السطر ده أمرين مفصولين بـ [[;]] (نفّذ الأول وبعده التاني): [[dscacheutil -flushcache]] بيمسح كاش النظام، و [[killall -HUP mDNSResponder]] بيبعت إشارة HUP لخدمة الـ DNS بتاعة الماك فتعيد تحميل نفسها وترمي الكاش اللي معاها. الاتنين محتاجين [[sudo]]، فهيطلب باسورد الماك.

لو نجح مش بيطبع حاجة. والمتصفح نفسه عنده كاش منفصل، فممكن تحتاج تقفله وتفتحه.`,
          example: "sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder",
          try: "نفّذه بعد أي تغيير DNS.",
          deep: {
            why: "بعد تعديل ملف hosts أو تغيير DNS، الماك بيحتفظ بالكاش القديم. flush بيمسحه.",
            how: R`على أي macOS حديث (من Monterey لحد Tahoe 26): [[sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder]].

على Monterey وما قبلها: نفس الأمر، بس الترتيب ممكن يختلف.

الأمر بياخد sudo. بعده بيكون التغيير فعّال فورًا في كل التطبيقات.

تحقق من إن DNS اتغيّر: [[nslookup example.com]] أو [[dig +short example.com]].`,
            when: "بعد تعديل [[/etc/hosts]]. بعد تغيير DNS settings. لما موقع لسه بيفتح عنوان قديم.",
            mistakes: "تعمل flush بدون sudo: مش هيشتغل أو هيطلع error. لازم sudo للاتنين."
          },
          lines: ["امسح كاش الـ DNS وأعد تحميل خدمة الـ DNS. الاتنين لازمين، وبـ sudo."],
          sol: R`الأمر هيطلب باسورد الماك (عشان sudo)، وبعدها مش بيطبع أي حاجة، وده معناه إنه نجح. بعدها [[dscacheutil -q host -a name yourdomain.com]] أو افتح الموقع، المفروض ياخد الـ IP الجديد.

لو لسه بيفتح القديم: المتصفح نفسه عنده كاش (Chrome: chrome://net-internals/#dns ثم Clear host cache)، أو راوتر البيت عامل كاش، أو الـ TTL القديم عند الـ DNS بتاعك لسه مخلصش؛ اتأكد إن السجل اتغير فعلًا بـ [[dig @1.1.1.1 yourdomain.com]]. ولو ملف [[/etc/hosts]] فيه سطر للدومين ده، هو اللي بيكسب على أي DNS.`
        },
        {
          cmd: "ssh-add",
          title: "خلّي الماك يفتكر باسورد المفتاح",
          desc: "مع [[--apple-use-keychain]] الباسورد بيتحفظ في Keychain فمش هتكتبه كل مرة، بشرط تضيف [[UseKeychain yes]] و [[AddKeysToAgent yes]] في [[~/.ssh/config]].",
          example: R`ssh-keygen -t ed25519
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
pbcopy < ~/.ssh/id_ed25519.pub`,
          try: "اعمل مفتاح، انسخه بـ pbcopy وضيفه في GitHub.",
          deep: {
            why: "على الماك، الـ SSH key بيتقفل بعد كل restart من غير [[ssh-add]]. وبيستفيد من Keychain عشان يحفظ الـ passphrase.",
            how: R`[[ssh-add ~/.ssh/id_rsa]] بيضيف المفتاح للـ ssh-agent. هتسألك الـ passphrase مرة واحدة.

[[ssh-add --apple-use-keychain ~/.ssh/id_rsa]] على الماك بيحفظ الـ passphrase في macOS Keychain. مش هيسأل بعدها.

لازم تضيف في [[~/.ssh/config]] تحت [[Host *]] السطرين [[UseKeychain yes]] و [[AddKeysToAgent yes]].

[[ssh-add -l]] بيعرض المفاتيح المضافة. [[ssh-add -D]] بيمسح كلهم.`,
            when: "أول مرة بعد إنشاء SSH key على ماك. بعد restart وإيجاد إن ssh بيطلب passphrase تاني.",
            mistakes: "نسيان --apple-use-keychain فبعد كل restart تحتاج تضيف المفتاح تاني."
          },
          lines: [
            "اعمل زوج مفاتيح.",
            "ضيف المفتاح للـ agent واحفظ الـ passphrase في Keychain، فمش هيسأل عليها تاني.",
            "انسخ المفتاح العام عشان تحطه في GitHub أو السيرفر."
          ],
          sol: R`[[ssh-keygen -t ed25519]] هيسألك عن المكان (Enter للافتراضي) والـ passphrase، ويطبع [[Your public key has been saved in /Users/ali/.ssh/id_ed25519.pub]]. [[ssh-add --apple-use-keychain ~/.ssh/id_ed25519]] يطبع [[Identity added: ...]]. بعد [[pbcopy < ~/.ssh/id_ed25519.pub]] الصق في GitHub، Settings، SSH and GPG keys، New SSH key. التأكيد: [[ssh -T git@github.com]] يرد [[Hi username! You've successfully authenticated, but GitHub does not provide shell access.]]

لو لزقت ولقيت كلام طويل غريب يبدأ بـ [[-----BEGIN OPENSSH PRIVATE KEY-----]]، نسخت المفتاح الخاص بالغلط؛ متحطهوش في أي مكان، وانسخ الملف اللي بينتهي بـ [[.pub]]. ولو [[ssh -T]] قال [[Permission denied (publickey)]]، المفتاح مش متضاف في GitHub أو الـ agent مش شايفه ([[ssh-add -l]]).`,
          solCode: R`ssh-keygen -t ed25519 -C "you@example.com"
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
pbcopy < ~/.ssh/id_ed25519.pub
ssh -T git@github.com`
        }
      ]
    },
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
          sol: R`جربته في zsh 5.9. من غير argument طبع [[backup.zsh:4: 1: usage: backup.zsh <folder>]] و [[$?]] بقت 1. بفولدر مش موجود ([[nope]]) طبع [[not a folder: nope]] و 1. بفولدر حقيقي طبع زي [[saved /root/backups/api-2026-10-01.tar.gz (4.0K)]] و 0 (عندك المسار هيبقى في الـ home بتاعك وتاريخ يومك). و [[tar -tzf]] على الأرشيف طلّع [[api/]] و [[api/a.txt]]، يعني المسارات جوه قصيرة بفضل [[-C]].

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
          sol: R`جربته في zsh 5.9 على فولدر فيه [[a.pdf]] و [[b.JPG]] و [[c.zip]] و [[README]]. مع DRY=1 طبع [[would move a.pdf -> Docs/]] و [[would move b.JPG -> Images/]] و [[would move c.zip -> Archives/]] و [[would move README -> Other/]] (الترتيب عندك ممكن يختلف) وبعدها [[done]]، و [[ls]] أكّد إن مفيش حاجة اتنقلت. من غير DRY الملفات راحت فعلًا: [[Docs/a.pdf]] و [[Images/b.JPG]] و [[Archives/c.zip]] و [[Other/README]].

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

خد بالك إن [[/tmp]] على الماك بتتمسح مع الـ restart، فلو عايز اللوج يفضل، خليه في [[/Users/sara/Library/Logs/tidy.log]] مثلًا، بمسار كامل برضه.`,
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
          sol: R`ده على الماك بس، مجربتوش على لينكس. المتوقع: [[bootstrap]] مش بيطبع حاجة لو نجح. [[launchctl list | grep com.me]] بيطبع سطر فيه [[-]] (مش شغالة دلوقتي) وبعده [[0]] بعد ما تشتغل مرة بنجاح وبعدهم [[com.me.tidy]]. بعد [[kickstart]] بثانية، [[/tmp/tidy.log]] هيبقى فيه ناتج السكربت زي [[done: /Users/sara/Downloads]].

لو الرقم التاني في list مش 0، بص في [[/tmp/tidy.err]]: [[Operation not permitted]] يبقى إذن الخصوصية (درس الـ plist)، و [[no such file]] يبقى مسار غلط في ProgramArguments. ولو bootstrap قال [[Input/output error]] يبقى المهمة محمّلة قبل كده، اعمل bootout الأول.`
        }
      ]
    }
  ]
});
