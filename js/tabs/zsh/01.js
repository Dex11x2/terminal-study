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

خد بالك إن [[$SHELL]] هو الشيل الافتراضي بتاع اليوزر، مش الشيل اللي انت فيه دلوقتي: جوه bash هيفضل يطبع [[/bin/zsh]]. عشان تعرف انت فين فعلًا [[echo $0]]. (جربتها على أوبونتو 24.04: zsh 5.9 و bash 5.2.21. سطور الماك اللي فوق، نسخة bash 3.2.57 ورسالة The default interactive shell، من توثيق Apple ومش متجربة هنا.)`
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
      t: "شكّل zsh بتاعك",
      l: 2,
      n: "الـ prompt بإيدك من غير إضافات، وبعدين ثيمات جاهزة من Oh My Zsh و Powerlevel10k",
      items: [
        {
          cmd: "PROMPT",
          title: "اكتب الـ prompt بتاعك بإيدك",
          desc: R`الـ prompt هو النص اللي zsh بيطبعه قبل كل أمر (زي [[sara shop %]])، وشكله متخزن في متغير اسمه [[PROMPT]] (نفس دور [[PS1]] في bash). بتكتب فيه نص عادي ورموز بتبدأ بـ [[%]]، و zsh بيبدّل كل رمز بقيمته كل مرة يطبع السطر: اسمك، والفولدر، والساعة، وكمان اسم الـ git branch.

الرموز الأساسية:
• [[%n]] اسم اليوزر، و [[%m]] اسم الجهاز لحد أول نقطة (على الماك حاجة زي [[Saras-MacBook-Pro]])، و [[%M]] الاسم كامل.
• [[%~]] الفولدر الحالي بمساره، والـ home بيتكتب [[~]]. و [[%1~]] آخر جزء بس (اسم الفولدر)، و [[%2~]] آخر جزئين.
• [[%#]] بتطلع [[%]] لو انت يوزر عادي و [[#]] لو انت root، فتعرف من شكل السطر إنك شغال بصلاحيات كاملة.
• [[%T]] الساعة بنظام 24 ([[14:05]])، و [[%*]] نفس الساعة بالثواني، و [[%D]] التاريخ بشكل سنة-شهر-يوم ([[26-10-02]]).

الألوان: [[%F{green}]] بتبدأ لون للكلام اللي بعدها، و [[%f]] بترجّع اللون العادي. اللون بالاسم ([[black]] و [[red]] و [[green]] و [[yellow]] و [[blue]] و [[magenta]] و [[cyan]] و [[white]]) أو برقم من 0 لـ 255 لو الترمنال بيدعم 256 لون، زي [[%F{240}]] رمادي. و [[%B]] بتبدأ خط عريض و [[%b]] بتقفله. لو نسيت [[%f]] أو [[%b]] اللون هيكمّل على الأمر اللي بتكتبه.

[[RPROMPT]] prompt تاني بيظهر على يمين نفس السطر، وبيختفي لوحده لو الأمر اللي بتكتبه طوّل ووصل له. مكان مناسب للساعة.

اسم الـ branch: zsh جاي معاه أداة اسمها [[vcs_info]] بتعرف انت جوه repo ولا لأ. [[autoload -Uz vcs_info]] بتحمّلها (شرح autoload في مستوى ٣). [[precmd() { vcs_info }]] بتعرّف function اسمها [[precmd]]: الاسم وبعده [[()]]، والجسم بين [[{ }]]. والاسم ده خاص: zsh بيشغّلها قبل ما يطبع كل prompt، فاسم الـ branch بيتحدّث بعد كل أمر. [[zstyle ':vcs_info:git:*' formats '%F{yellow}(%b)%f ']] بتحدد شكل الناتج: [[':vcs_info:git:*']] معناها «الإعداد ده لـ vcs_info جوه repo بتاع git»، و [[%b]] جوه formats معناها اسم الـ branch (مش bold هنا، دي رموز vcs_info نفسها). والناتج بيتحط في متغير اسمه [[vcs_info_msg_0_]]، وبيبقى فاضي برّه أي repo.

[[setopt prompt_subst]] بتخلي zsh يفك المتغيرات جوه الـ PROMPT كل مرة يطبعه، زي [[$__{vcs_info_msg_0_}]] ([[$__{...}]] قيمة المتغير، زي [[$name]] بس بأقواس). وعشان كده الـ PROMPT بين علامات تنصيص مفردة [['...']]: المتغير بيتحفظ زي ما هو ويتفك وقت الطباعة. بعلامات مزدوجة [["..."]] الشيل بيفكه مرة واحدة وقت التعريف، والـ branch يفضل متجمّد على القديم.

[[print -P]] بتطبع نص وهي بتفك رموز الـ prompt ([[-P]] = prompt)، فتجرّب بيها أي رمز من غير ما تغيّر حاجة. وكل اللي بتكتبه في الترمنال بيروح لما تقفله: عشان يفضل، حط السطور في [[~/.zshrc]]. ولو عندك Oh My Zsh، حطها بعد سطر [[source $ZSH/oh-my-zsh.sh]] أو خلي [[ZSH_THEME=""]]، وإلا الثيم هيكتب فوق الـ PROMPT بتاعك.`,
          example: R`print -P '%n %m %~ %1~ %# %T %*'
PROMPT='%B%F{green}%n%f%b %F{blue}%1~%f %# '
RPROMPT='%F{240}%*%f'
autoload -Uz vcs_info
precmd() { vcs_info }
setopt prompt_subst
zstyle ':vcs_info:git:*' formats '%F{yellow}(%b)%f '
PROMPT='%B%F{green}%n%f%b %F{blue}%1~%f $__{vcs_info_msg_0_}%# '`,
          try: R`اعمل prompt فيه اسم الفولدر بالأزرق واسم الـ branch بالأصفر، وادخل repo واعمل [[git switch -c test]] وشوف الـ branch اتغير لوحده، واخرج لفولدر عادي وشوف القوسين اختفوا. وبعدين خليه دايم في [[~/.zshrc]].`,
          deep: {
            why: "الـ prompt بتشوفه قبل كل أمر، فلو فيه الفولدر والـ branch هتبطّل تكتب [[pwd]] و [[git status]] كل شوية عشان تعرف انت فين. ولما تكتبه بإيدك من غير إضافات، الترمنال بيفتح بسرعة وانت فاهم كل حرف فيه وتعرف تصلّحه.",
            how: R`قبل كل سطر zsh بيشغّل [[precmd]]، وبعدين يقرا [[PROMPT]] ويبدّل كل رمز [[%]] بقيمته، ولو [[prompt_subst]] شغالة بيفك كمان [[$...]] و [[$(...)]] جواه. عشان كده vcs_info بيلحق يحط اسم الـ branch في [[vcs_info_msg_0_]] قبل الطباعة.

رموز تانية مفيدة: [[%?]] الـ exit code بتاع آخر أمر، و [[%(?.ok.fail)]] شرط: لو آخر أمر نجح اطبع [[ok]] وإلا [[fail]]. فـ [[%(?.%F{green}.%F{red})%#%f]] بتخلي علامة [[%]] خضرا وتقلب حمرا لما أمر يفشل. و [[%K{blue}]] لون خلفية و [[%k]] بتقفله. و [[setopt transient_rprompt]] بتشيل الـ RPROMPT من السطور القديمة بعد Enter، فالنسخ من الترمنال يبقى أنضف.

جوه formats بتاع vcs_info: [[%b]] الـ branch، و [[%r]] اسم الـ repo، و [[%s]] نوع الـ VCS ([[git]]). ولو عايزه يعلّم على التعديلات: [[zstyle ':vcs_info:*' check-for-changes true]] وبعدها [[%u]] بتطلع [[U]] لو فيه تعديلات مش staged و [[%c]] بتطلع [[S]] لو فيه staged. ده بيخلي الـ prompt أبطأ في repo ضخم.`,
            when: "أول ما تتعود على الترمنال وتعرف انت عايز تشوف إيه قدامك. ولو عايز شكل جاهز بأيقونات وألوان كتير من غير ما تكتب حاجة، شوف الدرس الجاي.",
            mistakes: R`تكتب الـ PROMPT بعلامات تنصيص مزدوجة فالـ branch يتجمّد على اللي كان وقت التعريف، أو تنسى [[setopt prompt_subst]] فيظهر [[$__{vcs_info_msg_0_}]] مكتوب بالنص. وتنسى [[%f]] أو [[%b]] فاللون يسيح على كل اللي بتكتبه. وتحط الـ PROMPT في [[~/.zshrc]] قبل سطر Oh My Zsh فالثيم يمسحه. ولو أداة تانية معرّفة [[precmd]] قبلك، تعريف جديد بنفس الاسم بيمسح بتاعها: الأأمن [[autoload -Uz add-zsh-hook]] وبعدها [[add-zsh-hook precmd vcs_info]]، دي بتضيف من غير ما تمسح.`
          },
          lines: [
            "جرّب الرموز من غير ما تغيّر حاجة: اسمك، والجهاز، والمسار، واسم الفولدر، و [[%]]، والساعة مرتين (من غير وبالثواني).",
            "prompt جديد: اسمك عريض بالأخضر، واسم الفولدر بالأزرق، وبعدين [[%]] ومسافة. بيتطبق من السطر الجاي على طول.",
            "الساعة بالثواني على يمين السطر بلون رمادي (240 من الـ 256 لون).",
            "حمّل vcs_info اللي جاي مع zsh.",
            "function بتشتغل قبل كل prompt وبتحدّث معلومات الـ repo.",
            "اسمح بفك المتغيرات جوه الـ PROMPT كل مرة يتطبع.",
            "شكل معلومة git: اسم الـ branch بين قوسين بالأصفر وبعده مسافة.",
            "الـ prompt النهائي ومعاه الـ branch. العلامات المفردة هي اللي بتخلي الـ branch يتحدّث."
          ],
          sol: R`جربت المثال ده بالحرف في zsh 5.9 على لينكس (الرموز نفسها على الماك)، كيوزر اسمه sara والجهاز اسمه [[sara-mbp.local]]: أول سطر طبع [[sara sara-mbp ~/projects/shop shop % 10:26 10:26:47]]. جوه repo على main الـ prompt بقى [[sara shop (main) %]] بالألوان، وعلى اليمين الساعة بالثواني. بعد [[git switch -c test]] الأمر اللي بعده طلع [[sara shop (test) %]] لوحده، وفي فولدر مش repo طلع [[sara Downloads %]] من غير قوسين.

لو شفت [[$__{vcs_info_msg_0_}]] مكتوبة بالنص في الـ prompt، يبقى ناقص [[setopt prompt_subst]]. ولو الـ branch مش بيتغير بعد switch، يبقى الـ PROMPT متعرّف بعلامات مزدوجة أو [[precmd]] مش متعرّفة. (جربت الغلطتين في نفس الاختبار: من غير prompt_subst طلع النص زي ما هو، وبالعلامات المزدوجة فضل [[(main)]] بعد ما الـ branch اتغير.) ولما تحطهم في [[~/.zshrc]] اعمل [[source ~/.zshrc]] أو افتح ترمنال جديد.`,
          solCode: R`# في آخر ~/.zshrc (بعد سطر oh-my-zsh لو موجود)
autoload -Uz vcs_info
precmd() { vcs_info }
setopt prompt_subst
zstyle ':vcs_info:git:*' formats '%F{yellow}(%b)%f '
PROMPT='%B%F{green}%n%f%b %F{blue}%1~%f $__{vcs_info_msg_0_}%# '
RPROMPT='%F{240}%*%f'
# وبعدين في الترمنال
source ~/.zshrc
cd ~/projects/shop && git switch -c test`
        },
        {
          cmd: "ZSH_THEME و Powerlevel10k",
          title: "ثيمات جاهزة للـ prompt",
          desc: R`لو مش عايز تكتب الـ prompt بإيدك، Oh My Zsh جاي معاه أكتر من 140 ثيم جاهز بتختار منهم بسطر [[ZSH_THEME]] في [[~/.zshrc]]. و Powerlevel10k ثيم مشهور من برّه بيسألك كام سؤال ويبنيلك prompt فيه الـ branch وحالة git ومدة آخر أمر وأيقونات.

تسطيب Oh My Zsh نفسه في درس «Oh My Zsh» في المستوى الأول. ثيماته في [[~/.oh-my-zsh/themes]]، كل ثيم ملف اسمه [[name.zsh-theme]]، واللي بتكتبه في [[ZSH_THEME]] هو الاسم من غير الامتداد، والافتراضي [[robbyrussell]]. وفيه قيم وأوامر خاصة:
• [[ZSH_THEME="random"]] ثيم عشوائي مع كل ترمنال وبيطبع اسمه، و [[echo $RANDOM_THEME]] بتقولك هو مين.
• [[ZSH_THEME=""]] من غير ثيم خالص، لو هتكتب [[PROMPT]] بإيدك (الدرس اللي فات).
• [[omz theme use agnoster]] بتجرّب ثيم في الترمنال ده بس، و [[omz theme set agnoster]] بتكتبه في [[~/.zshrc]] بدالك وبتعمل نسخة احتياطي باسم [[~/.zshrc.bck]].

في المثال [[^]] جوه grep معناها «أول السطر»، و [[|]] بتبعت ناتج ls لـ [[wc -l]] اللي بتعد السطور، يعني عدد ملفات الثيمات.

Powerlevel10k بيتسطب كإضافة لـ Oh My Zsh: [[git clone --depth=1]] بينزّل آخر نسخة بس من غير تاريخ الـ commits كله. [[$__{ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}]] معناها «قيمة [[ZSH_CUSTOM]]، ولو مش متعرّف خد [[~/.oh-my-zsh/custom]]»، و [[:-]] هي اللي بتعمل «ولو فاضي خد دي». ده فولدر إضافاتك اللي Oh My Zsh مش بيلمسه وهو بيتحدّث. والقيمة [["powerlevel10k/powerlevel10k"]] معناها فولدر اسمه powerlevel10k وجواه ملف ثيم بنفس الاسم.

[[exec zsh]] بتبدّل الشيل الحالي بواحد جديد بيقرا [[~/.zshrc]] من الأول. أول مرة Powerlevel10k بيفتح wizard اسمه [[p10k configure]] (وتشغّله تاني في أي وقت): يسألك شايف رموز معينة ولا لأ عشان يعرف الخط بتاعك، وبعدين تختار الشكل، ويحفظ اختياراتك في [[~/.p10k.zsh]] ويضيف سطر يقراه في آخر [[~/.zshrc]].

Instant prompt من ضمن أسئلة الـ wizard: بيطبع الـ prompt فورًا وباقي [[~/.zshrc]] بيكمّل تحميل، وعشان كده بيحط block في أول الملف. أي حاجة في الـ zshrc بتسأل (باسورد أو [[y/n]]) لازم تتنقل فوق الـ block ده، لأن الإدخال تحته مقفول لحد ما التحميل يخلص.

الأيقونات محتاجة خط فيه الرموز دي (Nerd Font). Powerlevel10k بيرشّح [[MesloLGS NF]]: ٤ ملفات (Regular و Bold و Italic و Bold Italic) من صفحته على GitHub، تسطّبهم بدبل كليك وتختار الخط في إعدادات الترمنال (Terminal أو iTerm2 أو VS Code). في iTerm2، [[p10k configure]] بيعرض يسطّبه لوحده. ومن غيره هتشوف مربعات مكان الأيقونات (درس «Nerd Font» في تاب اختصارات النظام بيشرح الخطوط دي).

خد بالك: صفحة Powerlevel10k على GitHub مكتوب في أولها إن دعم المشروع محدود جدًا: مفيش features جديدة، ومعظم الـ bugs مش هتتصلح، وأسئلة المساعدة مش هيترد عليها. لسه شغال وناس كتير بتستخدمه، بس انت بتعتمد على حاجة مش بتتطور.`,
          example: R`grep '^ZSH_THEME' ~/.zshrc
ls ~/.oh-my-zsh/themes | wc -l
omz theme use agnoster
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git "$__{ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k"
omz theme set powerlevel10k/powerlevel10k
exec zsh
p10k configure`,
          try: R`جرّب ٣ ثيمات بـ [[omz theme use]] (مثلًا agnoster و af-magic و ys) وشوف الفرق. وبعدين سطّب MesloLGS NF وظبطه في الترمنال، وسطّب Powerlevel10k وكمّل [[p10k configure]] لحد الآخر.`,
          deep: {
            why: "الثيم بيوفّرلك وقت تظبيط: الـ branch وحالة git ونسخة Node أو Python والوقت بشكل مقروء من أول يوم. و Powerlevel10k بيجيب حالة git ببرنامج صغير شغال في الخلفية (gitstatus)، فالـ prompt بيفضل سريع حتى في repo كبير.",
            how: R`Oh My Zsh وهو بيحمّل بيدوّر على الثيم في [[$ZSH_CUSTOM/themes]] الأول وبعدين في [[~/.oh-my-zsh/themes]]. فلو نسخت ثيم جاهز لـ custom وعدّلته، نسختك هي اللي بتتحمل ومش بتتمسح مع التحديث. وملف الثيم نفسه zsh عادي بيعرّف [[PROMPT]] و [[RPROMPT]] بنفس الرموز اللي في الدرس اللي فات.

Powerlevel10k بيكتب كل إعداداته في [[~/.p10k.zsh]] (ملف طويل وفيه شرح لكل جزء)، فتقدر تعدّل بإيدك: مثلًا تدوّر على [[POWERLEVEL9K_LEFT_PROMPT_ELEMENTS]] وتشيل أو تضيف عناصر. ونفس الملف فيه [[POWERLEVEL9K_INSTANT_PROMPT]]: [[verbose]] بيحذرك لو حاجة طبعت وقت التحميل، و [[quiet]] بيسكت التحذير، و [[off]] بيقفل الـ instant prompt خالص.

ولو عايز بديل مش مربوط بـ zsh: Starship، prompt واحد بيشتغل في zsh و bash و PowerShell بنفس ملف الإعدادات، ومحتاج Nerd Font برضه.`,
            when: "لو عايز prompt مرتب بسرعة ومش فارق معاك تفهم كل رمز. ولو بتحب تتحكم في كل حرف، الدرس اللي فات أخف وأسرع.",
            mistakes: R`تسطّب Powerlevel10k والخط مش متظبط في الترمنال، فالـ wizard يعرض رموز مكسورة وتختار إجابات غلط: ظبط الخط الأول. وتكتب [[PROMPT]] بتاعك في [[~/.zshrc]] وفيه ثيم شغال، فواحد يكتب فوق التاني. وتسيب سطر بيسأل باسورد تحت block الـ instant prompt، فالترمنال يبان واقف. وتكتب [[ZSH_THEME="powerlevel10k"]] من غير [[/powerlevel10k]] فيطلع [[[oh-my-zsh] theme 'powerlevel10k' not found]].`
          },
          lines: [
            "اعرف الثيم الحالي: السطر اللي بيبدأ بـ ZSH_THEME.",
            "عدد ملفات الثيمات اللي جاية مع Oh My Zsh.",
            "جرّب agnoster في الترمنال ده بس. محتاج خط فيه رموز Powerline أو Nerd Font.",
            "نزّل Powerlevel10k في فولدر الثيمات بتاعك (custom).",
            R`اكتب [[ZSH_THEME="powerlevel10k/powerlevel10k"]] في [[~/.zshrc]] مكان القيمة القديمة.`,
            "شيل جديد بيقرا الإعداد. أول مرة الـ wizard بيفتح لوحده.",
            "افتح الـ wizard تاني في أي وقت عشان تغيّر الشكل."
          ],
          sol: R`جربت الخطوات دي في zsh 5.9 على لينكس (Docker) بنفس Oh My Zsh اللي على الماك: [[grep '^ZSH_THEME' ~/.zshrc]] طبع [[ZSH_THEME="robbyrussell"]]، و [[ls ~/.oh-my-zsh/themes | wc -l]] طبع 143 (منهم [[example.zsh-theme]]). اسم غلط في [[omz theme use]] بيطبع [[nosuchtheme theme not found]]. وبعد الـ clone، [[omz theme set powerlevel10k/powerlevel10k]] طبع [['powerlevel10k/powerlevel10k' theme set correctly.]] وغيّر السطر لـ [[ZSH_THEME="powerlevel10k/powerlevel10k" # set by $__btomz$__bt]]، و [[type p10k]] قال إنها function جاية من [[custom/themes/powerlevel10k]]، يعني الثيم اتحمّل. ومع [[ZSH_THEME="random"]] كل ترمنال جديد طبع سطر زي [[[oh-my-zsh] Random theme 'awesomepanda' loaded]].

الـ wizard نفسه تفاعلي ومكمّلتوش هنا. حسب صفحة المشروع والكود بتاعه: أول سؤال [[Does this look like a diamond (rotated square)?]] وتحته رمز. لو شايف مربع فاضي أو علامة استفهام، الخط مش متظبط: دوس [[q]] تخرج من غير ما يغيّر حاجة، وظبط MesloLGS NF في الترمنال، وارجع [[p10k configure]]. وفي الآخر بيسألك [[Apply changes to ~/.zshrc?]] وبعدها بيكتب [[~/.p10k.zsh]].`
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

لو [[brew]] نفسه قال [[command not found]] بعد التسطيب، يبقى مشغّلتش السطرين اللي طبعهم في الآخر ([[eval "$(/opt/homebrew/bin/brew shellenv)"]] على Apple Silicon)، ودول بيضيفوا brew للـ PATH. على ماك Intel مكانه [[/usr/local/bin]] ومفيش المشكلة دي غالبًا. ولو [[tree]] طبع آلاف السطور، ضيف [[-I node_modules]].

(ده ماك بس: أمر التسطيب و Next steps من موقع brew.sh وتوثيق Homebrew، والناتج ده مش متجرب هنا.)`
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

الاسم في brew مش دايمًا زي اسم التطبيق: VS Code اسمه [[visual-studio-code]]. ولو التطبيق متسطب قبل كده من dmg، brew هيقولك إن فيه app موجود بالفعل في Applications، إما امسحه الأول أو استخدم [[--force]] وانت عارف انت بتعمل إيه.

(ده ماك بس: الأسماء ورسالة التطبيق الموجود من توثيق Homebrew، مش متجربة هنا.)`
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

اعمل [[brew update]] الأول، وإلا الأداة هتقارن بلستة قديمة ومش هتشوف التحديثات الجديدة. وخد بالك إن الـ casks اللي بتحدث نفسها (زي Chrome) ممكن متظهرش هنا، [[brew outdated --greedy]] بيعرضها. وقبل [[brew upgrade]] في يوم شغل مهم، فكّر إن ترقية postgresql أو node ممكن تغيّر سلوك مشروعك.

(ده ماك بس: شكل [[brew outdated]] و [[--greedy]] و [[brew pin]] من توثيق Homebrew (بيطبع النسخ لما يكون في ترمنال، وبيطبع الأسامي بس لما الناتج رايح pipe)، مش متجرب هنا.)`
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

لو قالك [[Not installed]] يبقى الأداة مش متسطبة لسه، والمعلومات اللي فوق عن النسخة المتاحة. ولو كتبت اسم غلط هيقولك [[No available formula with the name]]، دوّر الأول بـ [[brew search]].

(ده ماك بس: شكل [[brew info]] من توثيق Homebrew، والأرقام هتختلف عندك. مش متجرب هنا.)`
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

لو ping قالت [[Could not connect to Redis at 127.0.0.1:6379: Connection refused]]، بص في [[brew services list]]: لو الحالة [[error]] يبقى فيه حاجة تانية ماسكة بورت 6379 (زي Redis في Docker)، اعرفها بـ [[lsof -i :6379]]. وخد بالك إن start بيخليها تقوم مع كل boot، ولو عايزها تشتغل دلوقتي بس استخدم [[brew services run redis]].

(ده ماك بس: [[start]] و [[run]] و [[list]] وحالاتها من توثيق [[brew services]]، مش متجربة هنا. [[redis-cli ping]] و [[PONG]] نفس الكلام على أي نظام.)`
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

لو ظهر [[Unable to find application named 'Visual Studio Code']] يبقى الاسم مختلف عندك (زي [[Visual Studio Code - Insiders]]) أو التطبيق مش في Applications. الاسم لازم بين علامات تنصيص لأن فيه مسافات. و [[open]] أمر ماك بس، على أوبونتو [[xdg-open]].

(ده ماك بس: من صفحة [[man open]] بتاعة Apple، مش متجرب هنا.)`
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

لو لزقت ولقيت حاجة قديمة، يبقى الـ pipe مش متكتب صح. و pbcopy بيشيل الألوان (مش بيحافظ عليها) وده كويس. ودي أوامر ماك بس، على لينكس فيه [[xclip]] أو [[wl-copy]]، وفي WSL [[clip.exe]].

(ده ماك بس: من صفحة [[man pbcopy]] بتاعة Apple، مش متجرب هنا.)`
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

[[-name]] بيطابق أي اسم فيه الكلمة، فممكن يطلع [[docker-compose.yml.bak]] كمان. ولو مطلعش حاجة وانت متأكد إن الملف موجود، يبقى الفولدر ده مستبعد من Spotlight (Privacy في إعدادات Spotlight) أو لسه متفهرسش، استخدم [[find ~ -name docker-compose.yml]] بدله. و mdfind ماك بس.

(ده ماك بس: [[-name]] و [[-onlyin]] من صفحة [[man mdfind]] بتاعة Apple، مش متجرب هنا.)`
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

عشان تتأكد وهو شغال، افتح ترمنال تاني واكتب [[pmset -g assertions]]، هتلاقي caffeinate في اللستة. وخد بالك إن [[-t]] لوحدها بتمنع نوم النظام بس وقفل الشاشة ممكن يحصل عادي، لو عايز الشاشة تفضل صاحية ضيف [[-d]]. وقفل غطا اللابتوب بيخليه ينام برضه.

(ده ماك بس، ومش متجرب هنا. اتأكدت من صفحة [[man caffeinate]]: من غير أي flag بيمنع idle sleep بس، و [[-d]] للشاشة، و [[-s]] بيشتغل على الشاحن بس، و [[-t]] بالثواني.)`
        },
        {
          cmd: "pmset",
          title: "نيّم أو اطفي الماك في ميعاد",
          desc: R`[[pmset]] أداة الطاقة في الماك: بتنيّم الجهاز دلوقتي، أو تسجّل ميعاد يصحى أو يقفل فيه، أو تعرض حالة البطارية. ومعاها [[shutdown]] اللي بيقفل الجهاز أو يعمل restart بعد مدة.

[[shutdown]]: [[sudo]] لازمة لأن القفل محتاج صلاحية root، ومن غيرها هيقولك [[NOT super-user]]. [[-h]] اقفل الجهاز خالص، و [[-r]] اعمل restart، و [[-s]] نيّمه. بعدها الميعاد: [[now]] دلوقتي، أو [[+60]] بعد 60 دقيقة (وينفع [[+2h]] ساعتين أو [[+30s]] ثانية)، أو ساعة بعينها زي [[2230]] يعني 10:30 بالليل النهارده، ولو الساعة دي عدّت يبقى بكرة. الأمر بيطبع ميعاد القفل ورقم العملية (PID) اللي هتستنى، ويرجّعلك الـ prompt.

الإلغاء على الماك مش [[shutdown -c]] زي لينكس: القفل المتجدول عبارة عن عملية [[shutdown]] قاعدة مستنية، فبتلغيه بإنك تقفلها: [[sudo killall shutdown]] ([[killall]] بيقفل كل العمليات اللي بالاسم ده).

[[pmset]]:
• [[pmset sleepnow]] ينيّم الجهاز حالًا.
• [[-g]] (get) للعرض ومش محتاج sudo: [[pmset -g batt]] البطارية (النسبة وبيشحن ولا لأ والوقت الباقي)، و [[pmset -g sched]] المواعيد المتسجلة.
• [[sudo pmset schedule shutdown "10/03/26 23:00:00"]] ميعاد مرة واحدة. التاريخ بالترتيب الأمريكي [[MM/dd/yy HH:mm:ss]]: شهر/يوم/سنة وبعدين الساعة بنظام 24، وبين علامات تنصيص لأن فيه مسافة. النوع واحد من [[sleep]] و [[wake]] و [[poweron]] و [[shutdown]] و [[wakeorpoweron]] (يصحى لو نايم أو يشتغل لو مقفول). و [[sudo pmset schedule cancelall]] بيلغي المواعيد اللي من النوع ده كلها.
• [[sudo pmset repeat wakeorpoweron MTWRF 08:00:00]] ميعاد بيتكرر كل أسبوع. الأيام حروف من [[MTWRFSU]]: M الاتنين، و T التلات، و W الأربع، و R الخميس، و F الجمعة، و S السبت، و U الحد، فـ MTWRF يعني من الاتنين للجمعة. مسموح بزوج واحد بس من المواعيد المتكررة (ميعاد تشغيل وميعاد قفل أو نوم)، فاكتبهم الاتنين في نفس الأمر زي المثال. و [[sudo pmset repeat cancel]] بيلغيهم.

من macOS Ventura (13)، Apple شالت شاشة Schedule من الإعدادات، وصفحة الدعم بتاعتها بقت بتشرح pmset. وحسب نفس الصفحة: القفل في ميعاد بيحصل بس لو الماك صاحي وانت عامل login، وأي ملف مش متحفظ في برنامج مفتوح ممكن يمنعه.

خطر: الأوامر دي بتقفل الجهاز أو تنيّمه فعلًا، وأي شغل مش متحفظ أو build أو download شغال هيقف.`,
          example: R`pmset -g batt
pmset -g sched
sudo shutdown -h +60
sudo killall shutdown
sudo pmset schedule shutdown "10/03/26 23:00:00"
sudo pmset schedule cancelall
sudo pmset repeat wakeorpoweron MTWRF 08:00:00 shutdown MTWRF 23:00:00
sudo pmset repeat cancel
pmset sleepnow
sudo shutdown -r now`,
          try: "اعرض حالة البطارية والمواعيد المتسجلة. وبعدين جدول قفل بعد ساعتين بـ shutdown، واتأكد إن العملية مستنية، والغيه.",
          flag: "danger",
          deep: {
            why: "build أو تحميل كبير هيخلص بالليل وعايز الجهاز يقفل بعده، أو عايز الماك يكون صاحي وجاهز الساعة 8 كل يوم شغل. ومن غير شاشة Schedule في الإعدادات، الترمنال بقى الطريقة الرسمية.",
            how: R`[[shutdown]] بيعمل fork: عملية في الخلفية بتستنى لحد الميعاد، وقبله بخمس دقايق بيمنع أي login جديد. عشان كده الإلغاء = قفل العملية دي. و [[pmset -g sched]] مش بيعرض القفل ده، لأنه مش متسجل في pmset: اعرفه بـ [[pgrep -l shutdown]].

[[pmset schedule]] و [[pmset repeat]] بيسجلوا الميعاد في نظام الطاقة نفسه، فالجهاز يقدر يصحى من النوم أو يشتغل وهو مقفول (لو الجهاز بيدعم ده). و [[-g sched]] بيعرض الاتنين: جزء [[Scheduled power events]] للمرة الواحدة، وجزء [[Repeating power events]] للمتكرر، وممكن تلاقي فيه مواعيد مسجلها النظام نفسه (زي restart لتحديث).

لو عايز تمنع النوم مش تجدوله، ده [[caffeinate]] (الدرس اللي فات). و [[pmset -g assertions]] بتعرض مين مانع الجهاز ينام دلوقتي.`,
            when: "تقفل الجهاز بعد شغل طويل وانت مش جنبه. وجدول ثابت للجهاز (يصحى الصبح ويقفل بالليل) على ماك شغال كسيرفر صغير أو جهاز مكتب.",
            mistakes: R`تكتب [[shutdown -c]] من عادة لينكس عشان تلغي، والماك مش بيعرفها: الإلغاء [[sudo killall shutdown]]. وتكتب التاريخ يوم/شهر زي ما احنا متعودين ([[03/10/26]])، فيتسجل 10 مارس. وتسجّل [[pmset repeat]] للتشغيل لوحده وبعدين للقفل لوحده، والمسموح زوج واحد بس: اكتبهم في أمر واحد واتأكد بـ [[pmset -g sched]]. وتعتمد على القفل المتجدول وانت سايب ملف مش متحفظ، فالجهاز يفضل مستني تدوس Save.`
          },
          lines: [
            "حالة البطارية: النسبة وبيشحن ولا لأ والوقت الباقي. مش محتاج sudo.",
            "المواعيد المتسجلة في pmset (مرة واحدة ومتكررة).",
            "اقفل الجهاز بعد ساعة. بيطبع الميعاد والـ PID ويرجّعلك الترمنال.",
            "الغي القفل المتجدول: اقفل عملية shutdown اللي مستنية.",
            "اقفل الجهاز مرة واحدة يوم 3 أكتوبر 2026 الساعة 11 بالليل (شهر/يوم/سنة).",
            "امسح كل المواعيد اللي مرة واحدة.",
            "من الاتنين للجمعة: يصحى أو يشتغل 8 الصبح، ويقفل 11 بالليل.",
            "امسح المواعيد المتكررة.",
            "نيّم الجهاز دلوقتي.",
            "restart دلوقتي حالًا. احفظ شغلك الأول."
          ],
          sol: R`ده ماك بس، مجربتوش هنا. المكتوب من [[man pmset]] و [[man shutdown]] والكود المفتوح بتاع أمر shutdown من Apple. [[pmset -g batt]] بيطبع سطر زي [[Now drawing from 'AC Power']] وتحته سطر البطارية فيه حاجة زي [[81%; charging; 1:19 remaining]]، وعلى البطارية بيبقى [[Battery Power]] و [[discharging]]. ولو فيه مواعيد متكررة، [[pmset -g sched]] بيعرضها تحت [[Repeating power events]] بشكل زي [[wakepoweron at 8:00AM]] وبعده الأيام.

[[sudo shutdown -h +2h]] بيطبع [[Shutdown at]] وبعدها التاريخ والساعة بعد ساعتين، وسطر فيه كلمة [[pid]] ورقم العملية، ويرجّعلك الـ prompt. [[pgrep -l shutdown]] بيطبع نفس الرقم وجنبه [[shutdown]]، يعني القفل مستني. [[sudo killall shutdown]] مش بيطبع حاجة، و [[pgrep -l shutdown]] بعدها مش بيطبع حاجة، يعني القفل اتلغى. لو نسيت [[sudo]] هيطلع [[NOT super-user]] ومفيش حاجة هتتجدول.`,
          solCode: R`pmset -g batt
pmset -g sched
sudo shutdown -h +2h
pgrep -l shutdown
sudo killall shutdown
pgrep -l shutdown`
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

الفرق عن أمر [[defaults write]] إن الاختصار سريع ومش محتاج [[killall Finder]]. لو مفيش حاجة ظهرت، يبقى الفولدر ده مفيهوش ملفات مخفية أصلًا، جرب الـ home بتاعك. ولو استخدمت الأمر ونسيت [[killall Finder]] مش هيبان تغيير لحد ما Finder يعيد التشغيل.

(ده ماك بس: من صفحة [[man defaults]] وتوثيق Apple، مش متجرب هنا.)`
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

فخ مهم: لو الترمنال نفسه شغال بـ Rosetta، [[uname -m]] هيطبع [[x86_64]] حتى على جهاز M. اتأكد من [[sysctl -n machdep.cpu.brand_string]] أو من سطر Chip في system_profiler.

(ده ماك بس: شكل الناتج من صفحة [[man sw_vers]] بتاعة Apple، والأرقام عندك هتختلف. مش متجرب هنا. ([[uname -m]] بس جربته على لينكس وطبع [[x86_64]].))`
        },
        {
          cmd: "say",
          title: "خلّي الماك يتكلم",
          desc: R`[[say]] أمر ماك بيحوّل أي نص لصوت. أشهر استخدام للمبرمج: تشغّل build أو تيستات طويلة وتسيبها، والماك يقولك بصوت أول ما تخلص.

[[say "Build done"]] بيقول الجملة بالصوت الافتراضي اللي في إعدادات الجهاز. علامات التنصيص مش شرط، بس أأمن لو الجملة فيها رموز الشيل ممكن يفهمها. [[-v]] بتختار صوت باسمه، و [[say -v '?']] بتطبع الأصوات المتسطبة: كل سطر فيه اسم الصوت، واللغة ([[en_US]] مثلًا، أو [[ar_001]] للعربي)، وبعد [[#]] جملة تجربة. علامات التنصيص حوالين [[?]] عشان zsh ميعاملهاش كـ glob (درس «no matches found»).

العربي: الصوت العربي اسمه [[Majed]]، فـ [[say -v Majed "الـ build خلص"]]. لو مش ظاهر في اللستة، نزّله من System Settings ثم Accessibility ثم Read & Speak (في النسخ الأقدم اسمها Spoken Content) ثم علامة (i) جنب System voice.

[[-r 250]] السرعة بالكلمات في الدقيقة، ورقم أكبر = أسرع. [[-o build-done.aiff]] بيحفظ الصوت في ملف بدل ما يقوله، ونوع الملف الافتراضي AIFF. و [[-f notes.txt]] بيقرا النص من ملف.

وعشان تسمع النتيجة بعد أمر: [[;]] معناها «نفّذ اللي بعدي بعد ما اللي قبلي يخلص، نجح أو فشل». و [[&&]] «لو نجح بس»، و [[||]] «لو فشل». فـ [[npm test && say "tests passed" || say "tests failed"]] بتقول جملة مختلفة حسب النتيجة.`,
          example: R`say "Build done"
say -v '?'
say -v '?' | grep ar_
say -v Majed "الـ build خلص"
say -r 250 "faster than normal"
say -o build-done.aiff "Build done"
npm run build; say "build finished"
npm test && say "tests passed" || say "tests failed"`,
          try: R`شغّل [[sleep 5; say "time is up"]] وسيب الترمنال. وبعدين اعرف الأصوات العربي اللي عندك، وخلّي Majed يقول جملة.`,
          deep: {
            why: "مش هتفضل باصص للترمنال ١٠ دقايق مستني build أو [[docker build]]. صوت بيقولك خلص فتكمّل شغلك التاني وترجع في الوقت الصح. ومفيد كمان تسمع نص كتبته (رسالة أو README) فتلاقي الأخطاء اللي عينك بتعدّيها.",
            how: R`say بيستخدم محرك الكلام بتاع macOS نفسه، والأصوات اللي [[-v '?']] بتعرضها هي المتنزّلة على جهازك بس. بيرجع exit code 0 لو اتكلم بنجاح وغيره لو فشل، والأخطاء بتتطبع على stderr، فينفع جوه سكربتات.

لو كتبت [[say]] لوحدها من غير نص، بتقرا اللي بتكتبه سطر سطر لحد Ctrl+D. ولو بعتلها نص بـ pipe بتقراه: [[git log -1 --format=%s | say]] بتقرا رسالة آخر commit. و [[man say]] فيها إزاي تحفظ بأنواع ملفات تانية غير AIFF.`,
            when: "build أو تيستات أو [[npm install]] أو نقل ملفات بياخد أكتر من دقيقة. ولما تجرّب سكربت طويل على جهازك. على السيرفر مفيش سماعات، استخدم إشعار أو رسالة.",
            mistakes: R`تكتب [[say -v ?]] من غير علامات تنصيص فـ zsh يحاول يفكها كـ glob ويطلع [[no matches found]]. أو تستخدم [[&&]] لوحدها، فلما الـ build يفشل مش بتسمع حاجة وتفضل مستني: استخدم [[;]] أو [[&& ... || ...]]. أو تحط say في سكربت هيشتغل على لينكس أو CI: الأمر ده ماك بس.`
          },
          lines: [
            "قول الجملة بالصوت الافتراضي.",
            "اطبع الأصوات المتسطبة: الاسم واللغة وجملة تجربة.",
            "الأصوات العربي بس: [[ar_]] في عمود اللغة.",
            "قول جملة عربي بصوت Majed.",
            "أسرع: 250 كلمة في الدقيقة.",
            "احفظ الصوت في ملف AIFF بدل ما يتقال (شغّله بـ [[open build-done.aiff]]).",
            "بعد ما الـ build يخلص، نجح أو فشل، قول build finished.",
            "جملة حسب نتيجة التيستات: [[&&]] لو نجحت و [[||]] لو فشلت."
          ],
          sol: R`ده ماك بس، مجربتوش هنا. المكتوب من [[man say]] وصفحات دعم Apple: [[sleep 5; say "time is up"]] بيستنى ٥ ثواني وبعدين تسمع الجملة، ومش بيطبع حاجة، والـ prompt بيرجع بعد ما الكلام يخلص. [[say -v '?' | grep ar_]] بيطبع سطر فيه [[Majed]] و [[ar_001]] وبعد [[#]] جملة التجربة [[مرحبًا! اسمي ماجد.]]، و [[say -v Majed "إزيك"]] بيقرا العربي.

لو grep مطلعش حاجة، الصوت العربي مش متنزّل عندك: نزّله من System Settings ثم Accessibility ثم Read & Speak (أو Spoken Content في النسخ الأقدم) ثم System voice. ولو مسمعتش حاجة خالص، شوف الصوت مش Mute وإن السماعة اللي متوصلة هي اللي مختارة.`
        },
        {
          cmd: "osascript display notification",
          title: "إشعار ونافذة سؤال من الترمنال",
          desc: R`[[osascript]] بيشغّل AppleScript من الترمنال، وأشهر سطرين فيه: [[display notification]] يطلّع إشعار في ركن الشاشة زي إشعارات أي تطبيق، و [[display dialog]] يطلّع نافذة فيها زراير ويرجّعلك الزرار اللي اتداس.

[[-e]] بعدها سطر AppleScript. AppleScript بيستخدم علامات التنصيص المزدوجة للنصوص، فلف السطر كله بعلامات مفردة [['...']] عشان الشيل يسيبه زي ما هو. في [[display notification "All 42 tests passed" with title "shop" subtitle "npm test" sound name "Glass"]]: أول نص هو الرسالة، و [[with title]] العنوان العريض، و [[subtitle]] سطر تحته، و [[sound name]] صوت من أصوات النظام (أي ملف في فولدرات [[Library/Sounds]]، زي Basso و Glass و Ping و Submarine اللي في [[/System/Library/Sounds]]).

[[display dialog "Deploy to production?" buttons {"Cancel", "Deploy"} default button "Deploy" cancel button "Cancel"]]:
• [[buttons]] لستة لحد ٣ زراير بين [[{ }]] ومفصولة بفاصلة.
• [[default button]] الزرار اللي بيتداس لو دوست Enter، و [[cancel button]] اللي بيتداس بـ Esc. لو حددت buttons بنفسك ومكتبتش دول، مفيش default ولا cancel.
• osascript بيطبع النتيجة [[button returned:Deploy]]. ولو اتداس زرار الـ cancel، AppleScript بيعتبرها error رقم -128 ([[User canceled.]])، و osascript بيخرج بـ exit code 1، وده اللي يخلي [[&&]] أو [[|| exit 1]] يوقفوا السكربت.
• [[button returned of (...)]] بتاخد اسم الزرار بس من الناتج ([[of]] يعني «الجزء ده من»)، والأقواس بتخلي الـ dialog يتنفذ الأول. و [[default answer ""]] بتضيف خانة كتابة، و [[text returned]] هو اللي اتكتب فيها.

الإذن: في نسخ macOS الحديثة الإشعار بيظهر باسم وأيقونة Script Editor مش Terminal. لو الأمر خلص من غير error ومفيش إشعار ظهر، افتح System Settings ثم Notifications واسمح لـ Script Editor. لو مش موجود في اللستة، افتح Script Editor (في Applications ثم Utilities) وشغّل نفس السطر منه مرة فيسألك. ولو Focus (زي Do Not Disturb) شغال، الإشعارات مش هتظهر برضه.`,
          example: R`osascript -e 'display notification "Build done" with title "shop"'
osascript -e 'display notification "All 42 tests passed" with title "shop" subtitle "npm test" sound name "Glass"'
npm run build && osascript -e 'display notification "Build OK" with title "shop" sound name "Glass"'
osascript -e 'display dialog "Deploy to production?" buttons {"Cancel", "Deploy"} default button "Deploy" cancel button "Cancel"'
osascript -e 'button returned of (display dialog "Run migrations?" buttons {"Skip", "Run"} default button "Run")'
osascript -e 'text returned of (display dialog "Commit message:" default answer "")'`,
          try: R`اعمل function اسمها [[notify]] بتطلّع إشعار بصوت بالرسالة اللي تديهالها، وجرّبها بعد [[sleep 3]]. وبعدين اكتب سكربت صغير بيسألك «Deploy?»، ولو دوست Deploy يطبع [[deploying...]]، ولو Cancel يقف.`,
          deep: {
            why: "انت سايب build أو تيستات شغالة وفاتح المتصفح. الإشعار بيوصلك وانت في أي برنامج، وبيفضل في Notification Center لو كنت بعيد. والـ dialog بيدّي سكربتاتك خطوة تأكيد حقيقية قبل حاجة خطيرة زي deploy أو مسح.",
            how: R`[[display notification]] و [[display dialog]] من «Standard Additions»، أوامر جاهزة لأي AppleScript. شكل الإشعار نفسه (banner بيختفي ولا alert بيفضل، وبصوت ولا لأ) بيتحدد من إعدادات Notifications بتاعة التطبيق اللي الإشعار ظاهر باسمه، مش من السكربت.

osascript بيطبع نتيجة آخر سطر بشكل مقروء: الـ record [[{button returned:"Deploy"}]] بيتطبع [[button returned:Deploy]] من غير أقواس ولا علامات تنصيص. [[giving up after 10]] بيقفل النافذة لوحده بعد 10 ثواني ويرجّع [[gave up:true]]، فالسكربت ميفضلش مستني للأبد. وتقدر تكتب أكتر من [[-e]]، كل واحد سطر، أو تكتب السكربت بـ JavaScript بـ [[-l JavaScript]].`,
            when: "آخر خطوة في أي أمر طويل على الماك، وقبل أي خطوة في سكربت محتاجة موافقتك. على سيرفر أو CI مفيش حد قاعد قدام الشاشة، استخدم لوج أو رسالة.",
            mistakes: R`تلف السطر بعلامات مزدوجة فالشيل ياكل علامات AppleScript اللي جوه: خلي المفردة برّه. وتستنى الإشعار ومش بيظهر ومفيش error: ده إذن الإشعارات أو Focus، مش الأمر. وتحط [[display dialog]] في سكربت شغال من ssh أو في وقت انت مش قاعد فيه، فيفضل مستني حد يدوس: ضيف [[giving up after]]. ولو الرسالة نفسها فيها علامة تنصيص مزدوجة من متغير، هتكسر السطر.`
          },
          lines: [
            "إشعار بسيط: رسالة وعنوان.",
            "إشعار كامل: عنوان وسطر تحته وصوت Glass.",
            "الإشعار يظهر بس لو الـ build نجح ([[&&]]).",
            "نافذة بزرارين: Enter = Deploy و Esc = Cancel. بتطبع [[button returned:Deploy]]، و Cancel بيخرج بـ error.",
            "اسم الزرار بس: بيطبع [[Run]] أو [[Skip]]. مفيش cancel button هنا، فمفيش error.",
            "نافذة فيها خانة كتابة فاضية، وبتطبع اللي اتكتب. زرارين افتراضيين: Cancel (بـ error) و OK."
          ],
          sol: R`ده ماك بس، مجربتوش هنا. المكتوب من دليل AppleScript بتاع Apple و [[man osascript]]. الـ function (حطها في [[~/.zshrc]]) بتاخد الرسالة في [[$1]]، وعلامات التنصيص المزدوجة اللي جوه السطر مسبوقة بـ [[\]] عشان تعدّي للـ AppleScript. [[sleep 3; notify "Done"]] بيطلّع بعد ٣ ثواني إشعار عنوانه Terminal ورسالته Done بصوت Glass، والأمر نفسه مش بيطبع حاجة.

في السكربت ([[zsh deploy.zsh]]، مش تلزقه في الترمنال لأن [[exit]] هتقفل الترمنال نفسه): Deploy (أو Enter) يكمّل ويطبع [[deploying...]]. Cancel (أو Esc) يخلّي osascript يطبع رسالة آخرها [[User canceled. (-128)]] ويخرج بـ 1، فـ [[|| exit 1]] توقف السكربت قبل echo. ولو الإشعار مظهرش خالص والأمر خلص من غير error، اسمح لـ Script Editor من System Settings ثم Notifications.`,
          solCode: R`# في ~/.zshrc
notify() { osascript -e "display notification \"$1\" with title \"Terminal\" sound name \"Glass\"" }
# في الترمنال
sleep 3; notify "Done"
# ملف deploy.zsh، وشغّله بـ zsh deploy.zsh
osascript -e 'display dialog "Deploy?" buttons {"Cancel", "Deploy"} default button "Deploy" cancel button "Cancel"' >/dev/null || exit 1
echo "deploying..."`
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

لو شغلت أمر لينكس [[sed -i 's/3000/4000/g' .env]] على الماك هيطلع error زي [[sed: 1: ".env": invalid command code .]]، لأن sed الماك اعتبر السكربت امتداد الباك أب واعتبر [[.env]] هو الأوامر. والعكس: أمر الماك على لينكس (GNU sed) بيفشل؛ جربته فطلع [[sed: can't read s/3000/4000/g: No such file or directory]] والملف متغيرش. عشان سكربت يشتغل على الاتنين استخدم [[-i.bak]] لازقة من غير مسافة.

(الجزء بتاع الماك (رسالة [[invalid command code]]) من صفحة [[man sed]] بتاعة BSD ومن تجارب معروفة، مش متجرب هنا. جربت بس ناحية لينكس: [[sed -i '' ...]] فشل بالرسالة اللي فوق، و [[sed -i.bak ...]] اشتغل وعمل [[.env.bak]].)`
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

لو السيرفر مش شغال، [[lsof -t]] مش هيطبع حاجة و kill يقول [[kill: not enough arguments]] (جربتها في zsh وطلعت كده). ولو [[lsof -i :3000]] مطبعش حاجة والبرنامج شغال، يبقى البرنامج بتاع يوزر تاني، جرب [[sudo lsof -i :3000]]. وابدأ بـ [[kill]] من غير [[-9]] عشان البرنامج يقفل بهدوء.

(جربت الأوامر على أوبونتو (lsof موجود هناك كمان): [[lsof -i :3000]] طلّع [[TCP *:3000 (LISTEN)]] برقم البورت، لأن ملف services على أوبونتو مفيهوش اسم لبورت 3000. اسم [[hbci]] ده من ملف [[/etc/services]] على الماك، مش متجرب هنا.)`
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

لو بتدور على «التطبيق» كله مش عملية واحدة، Activity Monitor أوضح لأن Chrome مثلًا متقسم لعشرات العمليات. و [[vm_stat]] بيطبع أرقام بالـ pages مش بالبايت (الـ page على Apple Silicon 16KB)، فمتقارنش الأرقام دي مباشرة بالجيجا. ولو [[top -o mem]] قال illegal option، يبقى انت على لينكس، هناك [[top]] ثم Shift+M.

(ده ماك بس: [[-o mem]] وحجم الصفحة 16KB (أول سطر في [[vm_stat]] بيقوله) من صفحات [[man top]] و [[man vm_stat]] بتاعة Apple، مش متجرب هنا.)`
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

لو جربت [[date -v-1d]] على لينكس هيطلع [[date: invalid option -- 'v']] (جربتها فعلًا)، والعكس [[date -d yesterday]] على الماك بيطلع [[illegal option -- d]]. و [[-v]] بتتعامل مع آخر الشهر صح، يعني [[date -v+1d]] من 30 سبتمبر يطلع 1 أكتوبر. ولو محتاج نفس الأمر على الاتنين، سطب coreutils واستخدم [[gdate]] (درس coreutils).

(الـ [[-v]] من صفحة [[man date]] بتاعة BSD: الماك مفيهوش [[-d]] أصلًا (الصفحة بتقول إن [[-d]] القديم اتشال). جربت ناحية لينكس بس.)`
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

لو [[gsed]] قالت command not found يبقى brew مش في الـ PATH أو التسطيب لسه مخلصش. والأوامر الأصلية ([[sed]] و [[date]]) لسه هي بتاعة الماك، ومتغيرش أسماءها في النظام؛ ده مقصود عشان متبوظش سكربتات الماك نفسه.

(ده ماك بس: أسامي الأوامر بحرف g وفولدر [[gnubin]] من توثيق Homebrew لـ coreutils و gnu-sed، مش متجربة هنا.)`
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

ده مش معناه إن ls على الماك ناقص، الشرح في [[man ls]]. وخد بالك إن الـ options نفسها ممكن تختلف بين الاتنين، فأمر نقلته من شرح لينكس ممكن يطلع [[illegal option]]، وساعتها بص في man على الماك أو استخدم نسخة GNU من coreutils.

(رسالة ls بتاعة الماك من سلوك ls بتاع BSD المعروف، مش متجربة هنا. ناحية أوبونتو جربتها: [[ls --help]] طبع الشرح الطويل.)`
        }
      ]
    }
  ]
});
