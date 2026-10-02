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
      t: "إدارة الماك: اليوزرز والصلاحيات والأمان",
      l: 2,
      n: "يوزرز وأدمن، وصلاحيات أدق من rwx، والبرامج اللي Gatekeeper بيمنعها، والفايروول والتشفير. أغلبها محتاج sudo، فاقرا التحذير قبل ما تنفّذ",
      items: [
        {
          cmd: "dscl و sysadminctl",
          title: "اليوزرز على الماك: اعرضهم واعمل يوزر وامسحه",
          desc: R`على الماك اليوزرز مش متسجلين في [[/etc/passwd]] زي لينكس، متسجلين في قاعدة اسمها Directory Services. [[dscl]] بيقرا منها، و [[sysadminctl]] أداة Apple اللي بتعمل يوزر جديد أو تمسحه من الترمنال.

[[dscl]]: النقطة [[.]] بعده معناها «الجهاز ده»، و [[list /Users]] اطبع أسامي كل اليوزرز. هتلاقي لستة طويلة أغلبها بيبدأ بـ [[_]] زي [[_www]] و [[_spotlight]]: دول يوزرز الخدمات، محدش بيعمل بيهم login، وكل خدمة شغالة بيوزر لوحدها عشان لو اتخترقت متلمسش غير ملفاتها. [[grep -v '^_']] بتشيلهم: [[-v]] اطبع السطور اللي مش مطابقة، و [[^_]] السطر اللي أوله [[_]]. اللي بيفضل اليوزرز الحقيقيين ومعاهم [[root]] و [[daemon]] و [[nobody]] بتوع النظام. و [[list /Users UniqueID]] بتطبع جنب كل اسم رقمه (UID)، واليوزرز اللي بتعملهم من الإعدادات بيبدأوا من 501.

[[read /Users/sara]] بتطبع بيانات يوزر واحد، وأغلبها كلام داخلي، فاكتب بعدها اللي عايزه بس: [[RealName]] الاسم الكامل، و [[UniqueID]] الـ UID، و [[NFSHomeDirectory]] فولدر الـ home، و [[UserShell]] الشيل. و [[id sara]] زي لينكس: الـ UID والجروبات، ولو لقيت فيهم [[80(admin)]] يبقى أدمن.

[[sysadminctl]] (التعديل محتاج [[sudo]]):
• [[-addUser ali]] اسم الدخول: حروف إنجليزي صغيرة من غير مسافات، وهو نفسه اسم فولدر [[/Users/ali]].
• [[-fullName "Ali Hassan"]] الاسم اللي بيظهر في شاشة الدخول.
• [[-password -]]: الشرطة مكان الباسورد معناها «اسألني»، فتكتبه في prompt ومش بيتسجل في [[~/.zsh_history]]. لو كتبت الباسورد نفسه في الأمر هيفضل في الـ history، وأي حد على الجهاز يقدر يشوفه بـ [[ps]] وهو شغال.
• [[-admin]] يخليه أدمن. من غيرها بيبقى standard، وده الصح لأي حد مش محتاج يسطّب برامج للنظام أو يغيّر إعداداته.
• [[-adminUser sara -adminPassword -]] أدمن موجود بيوافق على العملية، وفايدتها في الـ secure token تحت.
• [[-deleteUser ali]] بيمسح اليوزر وفولدر الـ home بتاعه، و [[-keepHome]] بتسيب الفولدر.
• [[-secureTokenStatus ali]] بيقولك اليوزر ده عنده secure token ولا لأ.

Secure token: على Apple Silicon، اليوزر اللي معندوش secure token ميقدرش يفتح الديسك المتشفر بـ FileVault من شاشة البداية، ولا يوافق على تحديث macOS. أول يوزر عمل setup للجهاز بياخده لوحده. اليوزر اللي بتعمله من الترمنال بياخده بس لو أدمن عنده token وافق في نفس الأمر بـ [[-adminUser]]، زي سطر dev في المثال. والأسهل تعمل اليوزرز من System Settings ثم Users & Groups وانت داخل بيوزر عنده token، فالـ token بيتدّي لوحده.

خطر: [[-deleteUser]] مالوش undo ومش بيسألك «متأكد؟». اعمل باك أب الأول (درس «tmutil»)، ومتمسحش اليوزر اللي انت داخل بيه.`,
          example: R`dscl . list /Users | grep -v '^_'
dscl . list /Users UniqueID | grep -v '^_'
dscl . read /Users/sara RealName UniqueID NFSHomeDirectory UserShell
id sara
sudo sysadminctl -addUser ali -fullName "Ali Hassan" -password -
sudo sysadminctl -addUser dev -fullName "Dev Admin" -password - -admin -adminUser sara -adminPassword -
sysadminctl -secureTokenStatus dev
sudo sysadminctl -deleteUser ali -keepHome`,
          try: R`اعرض اليوزرز الحقيقيين على جهازك والـ UID بتاع كل واحد، واعرف انت أدمن ولا لأ من [[id]]. ولو عايز تجرّب الإنشاء: اعمل يوزر standard اسمه [[testuser]]، واتأكد إنه ظهر في dscl، واعرف عنده secure token ولا لأ، وبعدين امسحه.`,
          flag: "danger",
          deep: {
            why: R`بتجهّز ماك لحد في البيت أو الشغل، أو عايز يوزر standard تشتغل بيه كل يوم وتسيب الأدمن للتسطيب بس، أو يوزر تجربة تجرّب عليه برنامج من غير ما يلمس ملفاتك. ومن الترمنال تعمل ده في سكربت لكذا جهاز، أو على ماك داخل عليه بـ ssh.`,
            how: R`القاعدة المحلية متخزنة في ملفات plist تحت [[/var/db/dslocal]]، ودي محمية ومتعدلهاش بإيدك. [[dscl . -read]] و [[dscl . read]] نفس الحاجة، الشرطة اختيارية. وفيه [[dscl . -create]] بيعمل يوزر حتة حتة، بس [[sysadminctl]] بيعمل كله مرة واحدة: UID فاضي، وفولدر home، والـ token لو أدمن وافق، عشان كده هو اللي تستخدمه.

الجروبات بنفس الشكل: [[dscl . list /Groups]] كل الجروبات، و [[dscl . read /Groups/admin GroupMembership]] أعضاء جروب الأدمن (الدرس الجاي بيعدّل فيهم). و [[sudo sysadminctl -guestAccount off]] بيقفل يوزر الضيف. المقابل في لينكس [[useradd]] و [[userdel]] و [[getent passwd]] (درس «useradd و usermod» في تاب «bash»).`,
            when: R`قبل ما تدّي الجهاز لحد، أو تعمل يوزر تجربة، أو تنضّف يوزرز قديمة. ولو جهاز واحد ومرة واحدة، شاشة Users & Groups أسهل وبتظبط الـ secure token لوحدها.`,
            mistakes: R`تكتب الباسورد نفسه بعد [[-password]] فيفضل في الـ history. تعمل يوزر من الترمنال على Apple Silicon من غير [[-adminUser]] فميقدرش يفتح الجهاز بعد restart أو يحدّث النظام. تمسح يوزر من غير [[-keepHome]] وملفاته كان ليها لازمة. وتفتكر يوزرز [[_]] زيادة وتمسحهم: دول خدمات النظام نفسه، ومسحهم بيبوّظ حاجات زي Spotlight والطباعة.`
          },
          lines: [
            R`اليوزرز الحقيقيين بس: [[grep -v]] بيشيل اللي أولهم [[_]] (يوزرز الخدمات).`,
            R`نفس اللستة وجنب كل اسم الـ UID. بتوعك من 501 وطالع.`,
            R`بيانات يوزر واحد: الاسم الكامل والـ UID والـ home والشيل.`,
            R`الـ UID والجروبات. لو فيهم [[80(admin)]] يبقى أدمن.`,
            R`اعمل يوزر standard. sudo هيسأل على باسوردك، وبعده sysadminctl يسأل على باسورد ali.`,
            R`اعمل يوزر أدمن، و sara (أدمن عنده token) توافق، فـ dev ياخد secure token. هيسأل على باسورد sara كمان.`,
            R`dev عنده secure token ولا لأ.`,
            R`امسح ali وسيب فولدر [[/Users/ali]] زي ما هو.`
          ],
          sol: R`ده ماك بس، مجربتوش هنا. المكتوب من [[man dscl]] و [[man sysadminctl]] (والملخص بتاعه على ss64.com)، ودليل Apple للـ deployment عن secure token. على ماك عليه يوزر واحد، [[dscl . list /Users UniqueID | grep -v '^_']] بيطبع سطور زي [[daemon 1]] و [[nobody -2]] و [[root 0]] و [[sara 501]]. و [[id]] من غير اسم بيطبع بياناتك انت، زي [[uid=501(sara) gid=20(staff) groups=20(staff),12(everyone),61(localaccounts),80(admin),...]]: الـ [[80(admin)]] معناها إنك أدمن.

[[sudo sysadminctl -addUser testuser -fullName "Test User" -password -]] بيسأل على باسورد sudo وبعدين باسورد اليوزر الجديد، وبيطبع سطور لوج أولها التاريخ واسم الأداة. بعدها [[dscl . list /Users UniqueID | grep testuser]] بيطبع [[testuser 502]]. [[sysadminctl -secureTokenStatus testuser]] هيقول إن الـ token [[DISABLED]] لأنك معملتوش بـ [[-adminUser]]، و [[ENABLED]] لو عملته. [[sudo sysadminctl -deleteUser testuser]] بيمسحه هو والـ home بتاعه، و dscl مش هيطبعه تاني.

لو [[-addUser]] قال إن الاسم موجود، اختار اسم تاني أو امسح القديم. ولو نسيت [[sudo]] الأمر هيفشل بـ error صلاحيات.`,
          solCode: R`dscl . list /Users UniqueID | grep -v '^_'
id
sudo sysadminctl -addUser testuser -fullName "Test User" -password -
dscl . list /Users UniqueID | grep testuser
sysadminctl -secureTokenStatus testuser
sudo sysadminctl -deleteUser testuser`
        },
        {
          cmd: "dseditgroup",
          title: "خلّي يوزر أدمن أو شيلها منه",
          desc: R`الأدمن على الماك هو أي يوزر عضو في جروب اسمه [[admin]] (رقمه 80). [[dseditgroup]] بيضيف يوزر لجروب أو يشيله منه، فبيه بتدّي صلاحية الأدمن أو تسحبها من الترمنال.

[[-o edit]] العملية: عدّل الجروب. [[-a ali]] ضيف (add) ali، و [[-d ali]] شيله (delete). [[-t user]] نوع اللي بتضيفه: يوزر، لأن الجروب ممكن يبقى جواه جروب تاني. وآخر كلمة [[admin]] اسم الجروب. التعديل محتاج [[sudo]]، ومش بيطبع حاجة لو نجح.

[[-o checkmember -m ali admin]] بيسأل: ali عضو في admin؟ ويرد بسطر أوله [[yes]] أو [[no]]. و [[dscl . read /Groups/admin GroupMembership]] بيطبع كل الأعضاء في سطر واحد.

التغيير بيبان في الإعدادات على طول، بس الترمنال اللي ali فاتحه دلوقتي ممكن يفضل شايفه بالصلاحية القديمة لحد ما يفتح جلسة جديدة أو يعمل log out ويدخل تاني.

النصيحة: اشتغل كل يوم بيوزر standard، وخلّي يوزر أدمن تاني للتسطيب وتغيير إعدادات النظام. برنامج خبيث شغال باسمك وانت standard ميقدرش يغيّر حاجة في النظام من غير باسورد الأدمن. وقبل ما تشيل الأدمن من نفسك، اتأكد إن فيه يوزر أدمن تاني شغال وانت عارف باسورده، وإلا مش هتلاقي حد يرجّعهالك.`,
          example: R`dseditgroup -o checkmember -m ali admin
dscl . read /Groups/admin GroupMembership
sudo dseditgroup -o edit -a ali -t user admin
id ali
sudo dseditgroup -o edit -d ali -t user admin
dseditgroup -o checkmember -m ali admin`,
          try: R`اعرف مين أدمن على جهازك. ولو عندك يوزر تجربة (من درس «dscl و sysadminctl»)، خليه أدمن واتأكد بـ checkmember و [[id]]، وبعدين رجّعه standard.`,
          flag: "danger",
          deep: {
            why: R`تدّي حد صلاحية أدمن مؤقتة يسطّب برنامج وترجّعها، أو تحوّل يوزرك لـ standard بعد ما تعمل يوزر أدمن منفصل. ومن الترمنال تعملها على ماك داخل عليه بـ ssh من غير شاشة.`,
            how: R`ملف [[/etc/sudoers]] على الماك فيه سطر [[%admin ALL = (ALL) ALL]]: أي عضو في جروب admin يقدر يستخدم sudo، و [[%]] قبل الاسم معناها جروب مش يوزر. وده نفس الجروب اللي شاشات الإعدادات بتطلب باسورد واحد منه. [[dseditgroup -o read admin]] بيطبع بيانات الجروب كلها. وفيه جروبات تانية بنفس الفكرة: [[staff]] (رقمه 20) فيه كل اليوزرز العاديين، و [[_developer]] بيسمح بأدوات الـ debugging بتاعة Xcode. المقابل في لينكس [[usermod -aG sudo ali]] و [[gpasswd -d ali sudo]] (درس «useradd و usermod» في تاب «bash»).`,
            when: R`ماك جديد بيوزرين (أدمن و standard)، أو صلاحية مؤقتة لحد، أو مراجعة مين أدمن على أجهزة الفريق.`,
            mistakes: R`تشيل الأدمن من آخر أدمن على الجهاز فتقفل على نفسك، والرجوع ساعتها محتاج Recovery. تكتب الاسم الكامل [["Ali Hassan"]] بدل اسم الدخول [[ali]]. تنسى [[sudo]] مع [[-o edit]] فالأمر يفشل. وتستغرب إن ali لسه مش قادر يستخدم sudo في الترمنال اللي كان فاتحه: افتح جلسة جديدة.`
          },
          lines: [
            R`ali أدمن؟ بيرد بسطر أوله yes أو no.`,
            R`كل أعضاء جروب admin.`,
            R`خلّي ali أدمن: ضيفه لجروب admin.`,
            R`اتأكد: [[80(admin)]] بقت في جروباته.`,
            R`رجّع ali يوزر standard: شيله من admin.`,
            R`اتأكد إن الرد بقى no.`
          ],
          sol: R`ده ماك بس، مجربتوش هنا. المكتوب من [[man dseditgroup]] و [[man dscl]]، وشكل رد checkmember من سكربتات منشورة بتستخدمه. [[dscl . read /Groups/admin GroupMembership]] بيطبع حاجة زي [[GroupMembership: root sara]]. قبل الإضافة [[dseditgroup -o checkmember -m testuser admin]] بيطبع [[no testuser is NOT a member of admin]]، وبعد [[sudo dseditgroup -o edit -a testuser -t user admin]] (مش بيطبع حاجة) بيطبع [[yes testuser is a member of admin]]، و [[id testuser]] فيه [[80(admin)]]، وفي System Settings ثم Users & Groups هتلاقي تحت اسمه Admin. بعد [[-d]] كل ده بيرجع زي الأول.

لو قالك إن اليوزر مش موجود، راجع الاسم: ده اسم الدخول القصير (اللي في [[/Users]])، مش الاسم الكامل.`,
          solCode: R`dseditgroup -o checkmember -m testuser admin
sudo dseditgroup -o edit -a testuser -t user admin
dseditgroup -o checkmember -m testuser admin
id testuser
sudo dseditgroup -o edit -d testuser -t user admin`
        },
        {
          cmd: "chmod +a",
          title: "صلاحية ليوزر معين بالاسم (ACL على الماك)",
          desc: R`صلاحيات [[rwx]] العادية فيها 3 خانات بس: صاحب الملف، والجروب، وباقي الناس. الـ ACL (Access Control List) بتخليك تدّي أو تمنع صلاحية ليوزر أو جروب معين بالاسم، وعلى الماك بتضيفها بـ [[chmod +a]] وتشوفها بـ [[ls -le]].

[[ls -le]]: [[-l]] اللستة الطويلة و [[-e]] اعرض الـ ACL. الملف اللي عليه ACL بيظهر جنب صلاحياته [[+]] (زي [[-rw-r--r--+]])، وتحته إدخالاته مترقمة من 0، زي [[0: user:ali allow read,write]]. هتلاقي في الـ home فولدرات زي Desktop و Documents عليها [[group:everyone deny delete]] من النظام نفسه، عشان محدش يمسح الفولدر أو يغيّر اسمه بالغلط.

الإدخال بيتكتب بين علامات تنصيص: مين، وبعدين [[allow]] (اسمح) أو [[deny]] (امنع)، وبعدين الصلاحيات مفصولة بفاصلة من غير مسافات.
• مين: [[user:ali]] يوزر، أو [[group:staff]] جروب، و [[group:everyone]] جروب فيه الكل.
• صلاحيات الملف: [[read]] و [[write]] و [[append]] (يكتب في الآخر بس، ميعدّلش القديم) و [[execute]] و [[delete]].
• صلاحيات الفولدر: [[list]] (يشوف اللي جواه) و [[search]] (يوصل لملف جواه بالاسم) و [[add_file]] و [[add_subdirectory]] و [[delete_child]] (يمسح حاجة جواه).
• للفولدر بس: [[file_inherit]] و [[directory_inherit]] بيخلوا الإدخال يتنسخ لوحده على أي ملف أو فولدر جديد يتعمل جواه.

الأوامر:
• [[chmod +a "..." file]] ضيف إدخال. ولو فيه إدخال لنفس الشخص، الصلاحيات بتتجمع فيه.
• [[chmod -a "user:ali allow write" file]] شيل الصلاحية دي بس من الإدخال، والباقي يفضل.
• [[chmod "-a#" 0 file]] شيل الإدخال رقم 0 كله. علامات التنصيص حوالين [[-a#]] عشان لو [[extended_glob]] شغال عندك، zsh بيعتبر [[#]] رمز glob ويطلع [[no matches found]] (درس «no matches found»).
• [[chmod -N file]] امسح الـ ACL كلها.

الترتيب بيفرق: الماك بيقرا الإدخالات من فوق لتحت، و [[+a]] بيحط [[deny]] قبل [[allow]] لوحده، فالمنع بيكسب. واللي الـ ACL متكلمتش عنه، الماك بيرجع فيه لـ [[rwx]] العادية. والـ ACL مش بتغلب حماية الخصوصية بتاعة الماك (TCC): برنامج ممنوع من Desktop في Privacy & Security هيفضل ممنوع.

الفرق عن لينكس: لينكس بيستخدم POSIX ACL بأوامر [[setfacl]] و [[getfacl]] (درس «setfacl و getfacl» في تاب «bash»). الماك بيستخدم نوع تاني (شبه ويندوز و NFSv4): فيه [[deny]]، وفيه صلاحيات أدق زي [[delete]] و [[append]] لوحدهم، ومفيش setfacl خالص. فأوامر ACL مش بتتنقل بين النظامين.`,
          example: R`ls -le ~
touch notes.txt
chmod +a "user:ali allow read,write" notes.txt
chmod +a "group:everyone deny delete" notes.txt
ls -le notes.txt
chmod -a "user:ali allow write" notes.txt
chmod "-a#" 0 notes.txt
chmod -N notes.txt
mkdir shared
chmod +a "user:ali allow list,search,add_file,delete_child,file_inherit,directory_inherit" shared`,
          try: R`اعمل ملف، وحط عليه [[group:everyone deny delete]]، وجرّب تمسحه بـ [[rm]]. وبعدين شيل الإدخال بـ [[chmod "-a#" 0]] وامسحه. ولو عندك يوزر تجربة (درس «dscl و sysadminctl»)، اديله [[read]] بس على ملف، وادخل بيه واتأكد إنه بيقرا ومش بيكتب.`,
          deep: {
            why: R`فولدر مشروع مشترك بين يوزرين على نفس الماك، أو ملف عايزه يتقري بس من يوزر معين، أو تحمي فولدر مهم من المسح بالغلط حتى منك. ولما برنامج يقولك Permission denied رغم إن [[rwx]] شكلها مظبوطة، غالبًا السبب ACL، و [[ls -le]] هو اللي هيوريهالك.`,
            how: R`لكل صلاحية مطلوبة، أول إدخال بيتكلم عنها هو اللي بيحكم، فلو [[deny]] قبل [[allow]] المنع بيكسب. الترتيب اللي [[+a]] بيحافظ عليه: deny المحلي، وبعده allow المحلي، وبعدهم المتورّث (inherited) بنفس الترتيب. [[chmod +a# 2 "..."]] بيحط الإدخال في مكان بعينه، و [[chmod =a# 1 "..."]] بيكتب إدخال من جديد، والاتنين بيكسروا الترتيب الطبيعي لو مش واخد بالك.

المسح بيتسمح من [[delete]] على الملف نفسه أو [[delete_child]] على الفولدر اللي هو فيه، بس [[deny delete]] صريحة على الملف بتمنعه حتى لو الفولدر سامح، وده اللي بيحمي Desktop. وفي Finder: Get Info ثم Sharing & Permissions لما تضيف يوزر بالـ [[+]] بيعمل ACL برضه.`,
            when: R`فولدر مشترك بين أكتر من يوزر على نفس الجهاز، أو حماية فولدر من المسح، أو تحقيق في Permission denied غريب.`,
            mistakes: R`تنسى إن ali محتاج يوصل للفولدرات اللي فوق الملف ([[search]] أو [[x]])، فالـ ACL على الملف لوحده مش بتفيده. تحط مسافة بعد الفاصلة بين الصلاحيات فـ chmod ممكن ميفهمهاش. تكتب [[-a#]] من غير علامات تنصيص و [[extended_glob]] شغال. تنقل أمر [[setfacl]] من شرح لينكس. وتعمل [[chmod -N]] على فولدرات الـ home الأساسية فتشيل الحماية اللي النظام حاطها.`
          },
          lines: [
            R`الـ ACL على فولدرات الـ home: Desktop و Documents عليهم [[group:everyone deny delete]].`,
            R`ملف تجربة.`,
            R`ali يقرا ويكتب في الملف، حتى لو مش صاحبه ولا في جروبه.`,
            R`محدش يقدر يمسح الملف، ولا انت نفسك (المنع بيكسب).`,
            R`اتأكد: [[+]] جنب الصلاحيات، والإدخالات مترقمة والـ deny الأول.`,
            R`شيل الكتابة بس من ali، والقراية تفضل.`,
            R`شيل الإدخال رقم 0 (الـ deny) كله.`,
            R`امسح الـ ACL كلها، والملف يرجع لـ rwx بس.`,
            R`فولدر مشترك.`,
            R`ali يشوف اللي جواه ويضيف ويمسح، والإدخال بيتنسخ لوحده على أي حاجة جديدة جواه.`
          ],
          sol: R`ده ماك بس، مجربتوش هنا. المكتوب من [[man chmod]] (جزء ACL MANIPULATION OPTIONS) و [[man ls]]، والترقيم من 0 زي ناتج [[ls -le]] الحقيقي في مقالات The Eclectic Light Company. بعد [[chmod +a "group:everyone deny delete" notes.txt]]، [[ls -le notes.txt]] بيطبع سطر الملف وفيه [[-rw-r--r--+]]، وتحته [[0: group:everyone deny delete]]. [[rm notes.txt]] بيرفض ويطبع error صلاحيات، والملف بيفضل مكانه. بعد [[chmod "-a#" 0 notes.txt]] الـ [[+]] بتختفي و [[rm]] بيمسحه عادي.

خد بالك إن أمثلة صفحة man بترقّم الإدخالات من 1، والناتج الحقيقي بيبدأ من 0، فاعتمد على اللي [[ls -le]] بيطبعه عندك قبل [[-a#]]. ولو [[chmod -a# 0]] من غير علامات تنصيص قال [[no matches found]]، يبقى [[extended_glob]] شغال عندك.`,
          solCode: R`touch notes.txt
chmod +a "group:everyone deny delete" notes.txt
ls -le notes.txt
rm notes.txt
chmod "-a#" 0 notes.txt
rm notes.txt`
        },
        {
          cmd: "xattr و quarantine",
          title: "«App is damaged» والبرامج اللي Gatekeeper مانعها",
          desc: R`أي ملف بتنزّله من المتصفح أو AirDrop أو شات، الماك بيحط عليه علامة مخفية اسمها [[com.apple.quarantine]]. أول مرة تفتح البرنامج، Gatekeeper (الحماية اللي بتتأكد إن البرنامج موقّع من مطوّر مسجل عند Apple ومتراجع منها، notarized) بيشيك عليه، ولو مش عاجبه بيمنعه برسالة زي [[“App” is damaged and can’t be opened]] أو [[Apple could not verify “App” is free of malware]]. [[xattr]] بيعرض العلامة دي ويشيلها، و [[spctl]] بيقولك رأي Gatekeeper.

الـ extended attributes (اختصارها xattr) بيانات زيادة متخزنة مع الملف بعيد عن محتواه، زي نزل منين وإمتى. [[xattr -l]] بيطبع كل الـ attributes بأساميها وقيمها ([[-l]] الاسم والقيمة مع بعض). قيمة الـ quarantine شكلها [[0083;66fd1a2b;Safari;...]]: رقم flags، والوقت، والبرنامج اللي نزّله. [[-d com.apple.quarantine]] بيمسح الـ attribute ده بالاسم، و [[-r]] بيمشي على كل اللي جوه الفولدر، ولازمة هنا لأن [[.app]] فولدر فيه مئات الملفات (درس «.app و .dmg و .pkg» في تاب «الملفات وامتداداتها»). والفلاجات بتتلزق: [[-dr]] زي [[-d -r]]. البرنامج في [[/Applications]] غالبًا محتاج [[sudo]].

[[spctl --assess -vv]] بيسأل Gatekeeper عن برنامج ([[-vv]] تفاصيل أكتر): [[accepted]] وتحته [[source=Notarized Developer ID]] يعني موقّع ومتراجع، و [[rejected]] يعني هيتمنع. و [[codesign -dvv]] بيطبع مين موقّع البرنامج: سطور [[Authority=]] فيها اسم المطوّر، و [[Signature=adhoc]] معناها إن البرنامج متوقّع على الجهاز اللي اتبنى عليه بس، ودي أشهر سبب لرسالة damaged على Apple Silicon مع برامج GitHub المفتوحة.

الطريقة الرسمية قبل الترمنال: افتح البرنامج واترفض، وبعدين System Settings ثم Privacy & Security، وتحت في Security هتلاقي [[Open Anyway]] (بيفضل ظاهر حوالي ساعة بعد المحاولة)، وبعدها باسورد الماك. من macOS Sequoia (15) مبقاش ينفع تتخطى Gatekeeper بكليك يمين ثم Open زي زمان، لازم الإعدادات.

خطر: شيل الـ quarantine بيقفل الحماية دي للبرنامج ده خالص. اعملها بس لبرنامج نزّلته من موقع المطوّر الرسمي أو من GitHub بتاع المشروع نفسه وانت عارف هو إيه. أشهر طريقة البرامج الخبيثة بتدخل بيها الماك إن حد يقولك «لو قالك damaged اكتب الأمر ده». برنامج crack أو من موقع تحميلات مجهول: امسحه، متشيلش العلامة.`,
          example: R`spctl --assess -vv /Applications/Safari.app
xattr -l ~/Downloads/Tool.dmg
spctl --assess -vv /Applications/Tool.app
codesign -dvv /Applications/Tool.app
sudo xattr -dr com.apple.quarantine /Applications/Tool.app
xattr -l /Applications/Tool.app`,
          try: R`نزّل أي برنامج مجاني من موقعه الرسمي (أو أي ملف [[.dmg]])، وشوف علامة الـ quarantine عليه بـ [[xattr -l]]، وقارن رأي Gatekeeper فيه وفي Safari بـ [[spctl]]. متشيلش العلامة غير لو البرنامج اترفض وانت متأكد من مصدره.`,
          flag: "danger",
          deep: {
            why: R`برامج مفتوحة المصدر كتير مش موقّعة بشهادة Apple المدفوعة، فبتظهر damaged رغم إنها سليمة. لازم تعرف تفرّق بين ده وبين برنامج خطر فعلًا، وتعرف الطريق الرسمي بدل ما تنسخ أوامر من النت من غير ما تفهمها.`,
            how: R`المتصفحات وبرامج الشات بتحط العلامة، لكن [[curl]] و [[git clone]] من الترمنال مش بيحطوها، عشان كده سكربت نزّلته بـ curl بيشتغل من غير Gatekeeper. Gatekeeper بيشيك على البرنامج المعلّم أول مرة بس، وبعد ما توافق بيفتكر.

Notarization: المطوّر بيبعت البرنامج لـ Apple تفحصه أوتوماتيك وترجّعله تذكرة، و Gatekeeper بيدوّر على التذكرة دي. «damaged» على Apple Silicon غالبًا معناها توقيع adhoc أو توقيع اتكسر، و «could not verify» معناها موقّع بس مش notarized. [[xattr -c]] بيمسح كل الـ attributes مش الـ quarantine بس، فمتستخدمهوش هنا. ولما تسحب البرنامج من الـ [[.dmg]] لـ Applications، العلامة بتتنقل معاه على النسخة الجديدة.`,
            when: R`برنامج من مصدر رسمي انت متأكد منه، والرسالة بتمنعه، و Open Anyway مش ظاهر أو البرنامج أدوات command line كتير جوه فولدر. مش لأي برنامج من موقع مجهول.`,
            mistakes: R`تكتب [[xattr -d]] من غير [[-r]] فالعلامة تتشال من الفولدر بس وملفات جواه تفضل عليها. تستخدم [[sudo spctl --master-disable]] من شروحات قديمة: ده بيفتح اختيار Anywhere في الإعدادات ويقفل الحماية عن كل البرامج، ومن Sequoia لازم تأكيد من الإعدادات كمان، وفي الآخر انت شلت الحماية عن الجهاز كله عشان برنامج واحد. تشيل العلامة من الـ dmg بعد ما نقلت البرنامج. وتصدّق إن البرنامج بايظ فعلًا وتنزّله عشر مرات.`
          },
          lines: [
            R`رأي Gatekeeper في برنامج بتاع Apple: accepted.`,
            R`العلامات على ملف نزّلته: هتلاقي [[com.apple.quarantine]] ومين نزّله.`,
            R`رأي Gatekeeper في البرنامج اللي بيترفض: rejected والسبب.`,
            R`مين موقّع البرنامج، ولو [[Signature=adhoc]] يبقى مش موقّع من مطوّر مسجل.`,
            R`شيل العلامة من البرنامج وكل اللي جواه. بعدها هيفتح من غير Gatekeeper، فاعملها لمصدر متأكد منه بس.`,
            R`اتأكد إن [[com.apple.quarantine]] مبقاش موجود.`
          ],
          sol: R`ده ماك بس، مجربتوش هنا. المكتوب من [[man xattr]] و [[man spctl]] وصفحة دعم Apple «Open a Mac app from an unknown developer» وإعلان Apple للمطورين عن تغيير Gatekeeper في Sequoia. [[spctl --assess -vv /Applications/Safari.app]] بيطبع [[/Applications/Safari.app: accepted]] وتحته [[source=Apple System]]. برنامج من مطوّر مسجل هتلاقي [[source=Notarized Developer ID]] وتحته [[origin=Developer ID Application:]] واسم المطوّر. و [[xattr -l]] على ملف نزّلته بيطبع سطر أوله [[com.apple.quarantine:]] وفيه اسم المتصفح، وممكن كمان [[com.apple.metadata:kMDItemWhereFroms]] وفيه اللينك اللي نزل منه.

لو البرنامج اترفض وانت متأكد من مصدره، بعد [[sudo xattr -dr com.apple.quarantine]] السطر ده مش هيظهر في [[xattr -l]] والبرنامج هيفتح. ولو xattr قال [[No such xattr: com.apple.quarantine]] يبقى العلامة مش موجودة أصلًا، والمشكلة حاجة تانية: البرنامج مش لمعالجك (Intel من غير Rosetta، درس «softwareupdate»)، أو فعلًا بايظ.`,
          solCode: R`spctl --assess -vv /Applications/Safari.app
xattr -l ~/Downloads/Tool.dmg
spctl --assess -vv /Applications/Tool.app`
        },
        {
          cmd: "socketfilterfw",
          title: "الفايروول بتاع الماك من الترمنال",
          desc: R`الماك فيه firewall اسمه Application Firewall بيتحكم في الاتصالات الداخلة لكل برنامج (مين من برّه يقدر يكلّم برنامج على جهازك)، وغالبًا بيبقى مقفول على الأجهزة الجديدة. [[socketfilterfw]] هو الأمر بتاعه، ومكانه مش في الـ PATH، فبتكتب مساره كامل [[/usr/libexec/ApplicationFirewall/socketfilterfw]]. نفس الإعدادات في System Settings ثم Network ثم Firewall.

عشان المسار طويل، أول سطر في المثال بيحطه في متغير: [[fw=...]] من غير مسافات حوالين [[=]]، وبعدها [[$fw]] بتتبدل بالمسار في أي أمر. الخيارات:
• [[--getglobalstate]] الفايروول شغال ولا لأ: [[Firewall is enabled. (State = 1)]] أو [[disabled]] مع [[State = 0]].
• [[--setglobalstate on]] شغّله و [[off]] اقفله. أي تغيير محتاج [[sudo]].
• [[--setstealthmode on]] stealth mode: الماك ميردش على ping ولا على محاولة اتصال ببورت مقفول، فاللي بيعمل scan للشبكة ميعرفش إن فيه جهاز أصلًا. البرامج اللي انت سامح لها بتشتغل عادي. و [[--getstealthmode]] بيقولك الحالة.
• [[--listapps]] البرامج اللي ليها قاعدة، وكل واحد مسموح ولا ممنوع.
• [[--add /Applications/Tool.app]] ضيف برنامج للستة، و [[--blockapp]] امنعه يستقبل اتصالات، و [[--unblockapp]] رجّعه، و [[--remove]] شيله من اللستة.
• [[--setblockall on]] امنع كل الاتصالات الداخلة غير الأساسية (زي DHCP اللي بيجيبلك IP)، حتى للبرامج المسموحة، وده بيوقف Remote Login و Screen Sharing ومشاركة الملفات.
• [[--setallowsigned on]] و [[--setallowsignedapp on]] بيسمحوا لوحدهم للبرامج الموقّعة (بتاعة النظام، والمتنزلة) من غير ما يسألك.

الفايروول ده للاتصالات الداخلة بس: أي برنامج على جهازك يقدر يبعت لأي حتة برّه عادي، ولو عايز تتحكم في الطالع محتاج برنامج زي LuLu (مجاني ومفتوح المصدر) أو Little Snitch. وتحت منه فيه packet filter أقدم اسمه [[pf]]، بيتدار بـ [[pfctl]] وملف [[/etc/pf.conf]]، شبه iptables في لينكس، وتحتاجه بس لقواعد بالبورت والـ IP.

خطر: تغيير الفايروول ممكن يقطع خدمات شغالة، زي Remote Login أو سيرفر تطوير بتفتحه من موبايلك على الواي فاي. ولو الماك بتاع شغل وعليه MDM (درس «fdesetup و profiles»)، الشركة ممكن تكون ماسكة الإعدادات دي وتغييرك يترجع.`,
          example: R`fw=/usr/libexec/ApplicationFirewall/socketfilterfw
$fw --getglobalstate
sudo $fw --setglobalstate on
sudo $fw --setstealthmode on
$fw --getstealthmode
$fw --listapps
sudo $fw --add /Applications/Tool.app
sudo $fw --blockapp /Applications/Tool.app
sudo $fw --unblockapp /Applications/Tool.app`,
          try: R`اعرف حالة الفايروول عندك. شغّله وشغّل stealth mode، ومن جهاز تاني على نفس الشبكة اعمل [[ping]] للماك قبل وبعد stealth mode.`,
          flag: "danger",
          deep: {
            why: R`على واي فاي عام (كافيه، مطار، سكن) أي حد على نفس الشبكة يقدر يوصل للبورتات المفتوحة على جهازك: سيرفر تطوير شغال على [[0.0.0.0]]، أو مشاركة ملفات نسيتها. الفايروول مع stealth mode بيقلل اللي ظاهر منك. ومن الترمنال تشغّله في سكربت تجهيز أي ماك جديد.`,
            how: R`الـ Application Firewall بيشتغل بالبرنامج مش بالبورت: أول ما برنامج جديد يحاول يستقبل اتصال، الماك يسألك Allow أو Deny ويحفظ القرار مربوط بتوقيع البرنامج، فلو البرنامج اتعدّل ممكن يسألك تاني. من macOS Sequoia (15) الإعدادات مبقتش في ملف [[/Library/Preferences/com.apple.alf.plist]] زي زمان، فالسكربتات القديمة اللي بتكتب فيه بـ [[defaults]] مبقتش بتشتغل، والطريق socketfilterfw أو الإعدادات أو MDM. و [[sudo pfctl -s info]] بيقولك pf شغال ولا لأ.`,
            when: R`أول ما تجهّز لابتوب هتشتغل بيه برّه البيت، أو بعد ما تكتشف إن سيرفر التطوير بتاعك ظاهر للشبكة.`,
            mistakes: R`تفتكر الفايروول بيحميك من برنامج خبيث بيبعت داتا لبرّه: هو للداخل بس. تشغّل [[--setblockall on]] وتنسى، وبعدين Remote Login وسيرفر التطوير ميشتغلوش وانت مش عارف ليه. تكتب [[socketfilterfw]] من غير المسار فيقولك [[command not found]]. وتحط مسافة في [[fw = ...]] فـ zsh يفتكر [[fw]] أمر.`
          },
          lines: [
            R`احفظ المسار الطويل في متغير اسمه fw.`,
            R`الفايروول شغال ولا لأ (State 1 أو 0).`,
            R`شغّل الفايروول.`,
            R`شغّل stealth mode: الماك ميردش على ping والـ scan.`,
            R`اتأكد إن stealth mode اشتغل.`,
            R`البرامج اللي ليها قاعدة، ومسموح لها ولا لأ.`,
            R`ضيف برنامج للستة.`,
            R`امنع البرنامج يستقبل اتصالات من برّه.`,
            R`رجّعه مسموح.`
          ],
          sol: R`ده ماك بس، مجربتوش هنا. المكتوب من [[man socketfilterfw]] وصفحات دعم Apple عن إعدادات الـ Firewall. [[$fw --getglobalstate]] بيطبع [[Firewall is disabled. (State = 0)]] على أغلب الأجهزة الجديدة، وبعد [[sudo $fw --setglobalstate on]] بيبقى [[Firewall is enabled. (State = 1)]]. [[--getstealthmode]] بيطبع سطر بيقول إن stealth mode شغال، وشكل الجملة بيختلف شوية بين النسخ.

من جهاز تاني: قبل stealth mode، [[ping 192.168.1.20]] (IP الماك من [[ipconfig getifaddr en0]]) بيرد بسطور [[64 bytes from 192.168.1.20]]. بعده بيطبع [[Request timeout]] على الماك ولينكس، أو [[Request timed out.]] على ويندوز، لأن الماك مبقاش بيرد. لو فضل بيرد، اتأكد إن الفايروول نفسه شغال: stealth mode من غيره ملوش تأثير.`,
          solCode: R`fw=/usr/libexec/ApplicationFirewall/socketfilterfw
$fw --getglobalstate
sudo $fw --setglobalstate on
sudo $fw --setstealthmode on
$fw --getstealthmode
ipconfig getifaddr en0`
        },
        {
          cmd: "fdesetup و profiles",
          title: "الديسك متشفر؟ والجهاز مُدار من شركة؟",
          desc: R`سؤالين لازم تعرف إجابتهم لأي ماك: الديسك متشفر بـ FileVault (لو اتسرق محدش يقرا ملفاتك من غير باسورد)؟ والجهاز مسجل في MDM (نظام إدارة أجهزة الشركات، بيفرض إعدادات ويسطّب برامج ويقدر يقفل الجهاز)؟ [[fdesetup]] بيجاوب على الأول و [[profiles]] على التاني.

[[fdesetup]]:
• [[fdesetup status]] بيطبع [[FileVault is On.]] أو [[FileVault is Off.]]، وأثناء التشفير بيقول إنه شغال.
• [[fdesetup isactive]] بيطبع [[true]] ويخرج بـ 0، أو [[false]] ويخرج بـ 1، فينفع جوه [[if]] في سكربت.
• [[sudo fdesetup list]] اليوزرز اللي يقدروا يفتحوا الديسك من شاشة البداية بعد restart، كل واحد بالاسم وبعده فاصلة وبعدها GUID (رقم تعريف طويل). يوزر مش في اللستة دي ميقدرش يفتح الجهاز بعد restart لحد ما حد من اللستة يفتحه، ودي حكاية الـ secure token في درس «dscl و sysadminctl».
• تشغيل FileVault الأسهل من System Settings ثم Privacy & Security ثم FileVault. واحفظ مفتاح الاسترجاع (recovery key) في مكان برّه الجهاز: لو نسيت الباسورد ومعاكش المفتاح، الداتا مش هترجع.

[[profiles]]:
• [[profiles status -type enrollment]] بيطبع سطرين: [[Enrolled via DEP: No]] (يعني الجهاز مش متسجل تلقائي باسم شركة من ساعة ما اتشرى، والاسم الجديد للخدمة دي Automated Device Enrollment)، و [[MDM enrollment: No]]. لو أي واحد فيهم [[Yes]] يبقى الجهاز مُدار.
• [[sudo profiles list]] الـ configuration profiles المتسطبة: كل profile بيفرض إعدادات زي واي فاي أو VPN أو شهادات أو قيود. لو مفيش، بيطبع رسالة إن مفيش profiles.
• نفس المعلومات في System Settings ثم General ثم Device Management (في نسخ أقدم Privacy & Security ثم Profiles).

ليه يهمك: لو اشتريت ماك مستعمل ولقيته مسجل DEP باسم شركة، الشركة تقدر تقفله أو تمسحه حتى بعد ما تفرمته، فارجع للبايع قبل ما تدفع. ولو جهاز الشغل عليه MDM، إعدادات زي الفايروول والتحديثات ممكن تبقى في إيد الشركة، والـ MDM بيشوف معلومات زي البرامج المتسطبة وإعدادات الجهاز.`,
          example: R`fdesetup status
fdesetup isactive
sudo fdesetup list
profiles status -type enrollment
sudo profiles list`,
          try: R`اعرف جهازك متشفر ولا لأ، ومين يقدر يفتحه بعد restart، ومسجل في MDM ولا لأ. ولو FileVault مقفول على لابتوب، شغّله من الإعدادات واحفظ مفتاح الاسترجاع.`,
          deep: {
            why: R`لابتوب من غير FileVault لو اتسرق، اللي معاه يقدر يوصل للديسك ويقرا كل ملفاتك: مفاتيح SSH وملفات [[.env]] والكود. وماك مستعمل عليه MDM ممكن يتقفل في وشك بعد ما تشتريه.`,
            how: R`على Apple Silicon والأجهزة Intel اللي فيها شريحة T2، الديسك متشفر بالهاردوير دايمًا، و FileVault بيربط مفتاح التشفير بباسوردك، فتشغيله بيخلص بسرعة ومش بيبطّأ الجهاز. [[fdesetup status -extended]] بيفضل يطبع التقدم أثناء التشفير على APFS. و [[sudo fdesetup enable]] بيشغّله من الترمنال ويطبع مفتاح الاسترجاع، بس الإعدادات أوضح. و [[profiles show -type enrollment]] بيطبع بيانات سيرفر الشركة لو الجهاز مسجل، و Apple حاطة عليه حد (حوالي 10 مرات كل 23 ساعة) فمتكرروش في لوب.`,
            when: R`أول يوم على أي لابتوب، وقبل ما تشتري ماك مستعمل، وأول يوم في شغل جديد بجهاز الشركة.`,
            mistakes: R`تشغّل FileVault وتختار إن مفتاح الاسترجاع ميتحفظش في أي حتة وبعدين تنسى الباسورد. تفتكر الفرمتة بتشيل MDM: تسجيل DEP مربوط برقم الجهاز التسلسلي عند Apple ومش بيروح بالفرمتة. وتعمل يوزر من الترمنال على Apple Silicon وتستغرب إنه مش ظاهر في شاشة البداية بعد restart: ده secure token.`
          },
          lines: [
            R`FileVault شغال ولا لأ.`,
            R`نفس السؤال بـ true أو false، للسكربتات.`,
            R`اليوزرز اللي يقدروا يفتحوا الديسك بعد restart.`,
            R`الجهاز متسجل في DEP أو MDM؟ No و No يعني جهاز شخصي مش مُدار.`,
            R`الـ configuration profiles المتسطبة على الجهاز.`
          ],
          sol: R`ده ماك بس، مجربتوش هنا. المكتوب من [[man fdesetup]] و [[man profiles]]. على لابتوب FileVault فيه شغال: [[fdesetup status]] بيطبع [[FileVault is On.]]، و [[fdesetup isactive]] بيطبع [[true]]، و [[sudo fdesetup list]] بيطبع سطر لكل يوزر زي [[sara,]] وبعدها الـ GUID. على ماك شخصي [[profiles status -type enrollment]] بيطبع [[Enrolled via DEP: No]] و [[MDM enrollment: No]]، و [[sudo profiles list]] بيقول إن مفيش profiles.

لو لقيت يوزر بتدخل بيه مش في [[fdesetup list]]، يبقى معندوش secure token، وساعتها يوزر من اللستة لازم يفتح الجهاز بعد كل restart. ولو لقيت [[Yes]] في status على جهاز اشتريته مستعمل، كلّم البايع قبل أي حاجة.`
        }
      ]
    },
    {
      t: "إدارة الماك: الشبكة والديسكات والصيانة",
      l: 2,
      n: "الواي فاي والـ DNS والأجهزة اللي حواليك، والدخول على الماك من بعيد، والفلاشات والتحديثات والباك أب والبطارية",
      items: [
        {
          cmd: "networksetup",
          title: "إعدادات الشبكة والواي فاي من الترمنال",
          desc: R`[[networksetup]] بيعمل من الترمنال اللي بتعمله في System Settings ثم Network: يعرض الـ IP والـ DNS، ويغيّر الـ DNS، ويحط IP ثابت ويرجّعه تلقائي، ويقفل ويفتح الواي فاي. أوامر التغيير محتاجة يوزر أدمن، وأحيانًا root، فالأضمن تكتب قبلها [[sudo]]. قفل وفتح الواي فاي بيشتغل غالبًا من غيرها لو انت أدمن.

الأمر بيتعامل مع حاجتين بأسامي مختلفة:
• network service: الاسم اللي في الإعدادات زي [[Wi-Fi]] و [[Ethernet]] و [[Thunderbolt Bridge]]. [[-listallnetworkservices]] بتطبعهم، والنجمة [[*]] جنب اسم معناها إنه متقفل. أوامر [[-getinfo]] و [[-setdnsservers]] و [[-setmanual]] بتاخد الاسم ده، ولو فيه مسافة حطه بين علامات تنصيص.
• hardware port: الكارت نفسه. [[-listallhardwareports]] بتطبع كل port وتحته [[Device]] زي [[en0]] (درس «ifconfig / route»). أوامر الواي فاي بتاخد [[en0]]، واسمها فيه airport من أيام ما الواي فاي في أجهزة Apple كان اسمه AirPort.

الأوامر:
• [[-getinfo Wi-Fi]] الـ IP والـ subnet mask والراوتر، وأول سطر بيقول DHCP (تلقائي) ولا Manual.
• [[-getdnsservers Wi-Fi]] الـ DNS اللي انت حاطه بإيدك. لو قالك [[There aren't any DNS Servers set on Wi-Fi.]] يبقى الماك بياخد الـ DNS من الراوتر.
• [[-setdnsservers Wi-Fi 1.1.1.1 8.8.8.8]] DNS بإيدك (Cloudflare، و Google احتياطي)، وكلمة [[empty]] مكان العناوين بترجّعه للي جاي من الراوتر. و [[scutil --dns]] بيطبع الـ DNS اللي النظام بيستخدمه فعلًا، و [[grep nameserver]] بيسيب سطور العناوين بس.
• [[-setmanual Wi-Fi 192.168.1.50 255.255.255.0 192.168.1.1]] IP ثابت: العنوان، وبعده الـ subnet mask، وبعده الراوتر. مع IP ثابت الماك مبيبقاش واخد DNS من الراوتر، فحط DNS بإيدك معاه. و [[-setdhcp Wi-Fi]] بترجّع كله تلقائي.
• [[-setairportpower en0 off]] تقفل الواي فاي و [[on]] تفتحه، وده أسرع حل لما الواي فاي يعلق.
• [[-listpreferredwirelessnetworks en0]] الشبكات اللي الماك فاكرها وبيتصل بيها لوحده.
• [[-setairportnetwork en0 "Home WiFi"]] اتصل بشبكة. لو اتصلت بيها قبل كده، الماك فاكر باسوردها في Keychain ومش محتاج تكتبه. ولو كتبت الباسورد بعد الاسم، هيتسجل في [[~/.zsh_history]] وأي حد على الجهاز يقدر يشوفه في [[ps]] وهو شغال، فالأأمن تتصل أول مرة من قايمة الواي فاي.

قوة الإشارة والخصوصية: من macOS Sonoma 14.4 أداة [[airport]] القديمة (اللي كانت بتعرض الإشارة وتعمل scan) اتشالت وبقت بتطبع إنها deprecated، و Apple بتقول استخدم [[wdutil]]. [[sudo wdutil info]] بيطبع [[RSSI]] (قوة الإشارة بالـ dBm، وكل ما تقرب من 0 أحسن: حوالي -50 ممتازة و -80 ضعيفة)، و [[Noise]]، والقناة، و [[Tx Rate]] (سرعة الاتصال بالراوتر). ومن macOS Sequoia (15) اسم الشبكة (SSID) بقى معلومة خصوصية: [[-getairportnetwork en0]] ممكن يقولك [[You are not associated with an AirPort network.]] وانت متصل، و wdutil بيكتب [[<redacted>]] مكان الاسم.`,
          example: R`networksetup -listallnetworkservices
networksetup -listallhardwareports
networksetup -getinfo Wi-Fi
networksetup -getdnsservers Wi-Fi
sudo networksetup -setdnsservers Wi-Fi 1.1.1.1 8.8.8.8
scutil --dns | grep nameserver
sudo networksetup -setdnsservers Wi-Fi empty
sudo networksetup -setmanual Wi-Fi 192.168.1.50 255.255.255.0 192.168.1.1
sudo networksetup -setdhcp Wi-Fi
networksetup -setairportpower en0 off
networksetup -setairportpower en0 on
networksetup -listpreferredwirelessnetworks en0
networksetup -setairportnetwork en0 "Home WiFi"
sudo wdutil info`,
          try: R`اعرف اسم كارت الواي فاي، والـ IP، والـ DNS الحالي. حط DNS بتاع Cloudflare، واتأكد منه بـ [[scutil --dns]] وبـ [[dig example.com]] (سطر SERVER)، وبعدين رجّعه [[empty]].`,
          deep: {
            why: R`بتغيّر الـ DNS لما بتاع مزود النت بطيء أو بيحجب مواقع، وتحط IP ثابت لماك شغال سيرفر صغير في البيت، وتعمل ده في سكربت أو على ماك داخل عليه بـ ssh. وأسرع من إنك تدوّر في الإعدادات كل مرة.`,
            how: R`networksetup بيكتب في نفس إعدادات الشبكة اللي System Settings بتعرضها، فالتغيير بيبان هناك وبيفضل بعد restart. [[scutil --dns]] بيقرا الإعداد اللي اتطبق فعلًا، ولو VPN شغال ممكن تلاقي resolvers تانية قبل بتاعك. [[-createlocation]] و [[-switchtolocation]] بيحفظوا مجموعة إعدادات باسم (البيت والشغل) وتبدّل بينهم. و [[networksetup -help]] بيطبع كل الأوامر. المقابل في لينكس [[nmcli]] و [[resolvectl]] (دروس «nmcli» و «resolvectl» في تاب «bash»).`,
            when: R`DNS بطيء أو محجوب، IP ثابت لجهاز في البيت، واي فاي معلّق محتاج off و on، أو سكربت بيجهّز ماك جديد.`,
            mistakes: R`تكتب [[en0]] في أوامر الـ service ([[-getinfo en0]]) أو [[Wi-Fi]] في أوامر الواي فاي: الأولى بتاخد اسم الـ service والتانية اسم الكارت، والغلط بيطلع رسالة زي [[en0 is not a recognized network service.]]. تحط IP ثابت من غير DNS فالمواقع متفتحش رغم إن النت شغال. تختار IP ثابت جوه الرينج اللي الراوتر بيوزّعه فيتعارض مع جهاز تاني. وتقفل الواي فاي على ماك داخل عليه بـ ssh من نفس الواي فاي، فتقطع الفرع اللي قاعد عليه.`
          },
          lines: [
            R`أسامي الـ services: Wi-Fi و Ethernet وغيرهم.`,
            R`كل كارت واسمه (Device): عشان تعرف الواي فاي en0 ولا en1.`,
            R`الـ IP والـ subnet mask والراوتر بتوع الواي فاي.`,
            R`الـ DNS اللي انت حاطه بإيدك (أو رسالة إن مفيش).`,
            R`حط DNS بإيدك: Cloudflare وبعده Google.`,
            R`الـ DNS اللي النظام بيستخدمه فعلًا.`,
            R`رجّع الـ DNS للي جاي من الراوتر.`,
            R`IP ثابت: العنوان والـ mask والراوتر. حط DNS معاه.`,
            R`رجّع كله تلقائي من الراوتر.`,
            R`اقفل الواي فاي.`,
            R`افتحه تاني.`,
            R`الشبكات اللي الماك فاكرها.`,
            R`اتصل بشبكة الماك فاكر باسوردها.`,
            R`قوة الإشارة والـ Noise والقناة والسرعة (بديل airport).`
          ],
          sol: R`ده ماك بس، مجربتوش هنا. المكتوب من [[man networksetup]] و [[man wdutil]]، ومن Apple Community و Apple Developer Forums عن تغييرات Sonoma 14.4 و Sequoia. [[networksetup -listallhardwareports]] بيطبع لكل كارت [[Hardware Port: Wi-Fi]] وتحته [[Device: en0]] و [[Ethernet Address:]]. [[networksetup -getinfo Wi-Fi]] أوله [[DHCP Configuration]] وبعده [[IP address: 192.168.1.15]] و [[Subnet mask: 255.255.255.0]] و [[Router: 192.168.1.1]].

[[-getdnsservers Wi-Fi]] أول مرة غالبًا [[There aren't any DNS Servers set on Wi-Fi.]]. بعد [[sudo networksetup -setdnsservers Wi-Fi 1.1.1.1]] (مش بيطبع حاجة)، [[scutil --dns | grep nameserver]] بيطبع [[nameserver[0] : 1.1.1.1]]، و [[dig example.com | grep SERVER]] بيطبع [[;; SERVER: 1.1.1.1#53(1.1.1.1)]]. بعد [[empty]]، [[-getdnsservers]] بيرجع للرسالة الأولى، و scutil بيرجع يطبع IP الراوتر.

لو قالك [[Wi-Fi is not a recognized network service.]] يبقى الاسم عندك مختلف، شوفه من [[-listallnetworkservices]] واكتبه بالظبط.`,
          solCode: R`networksetup -listallhardwareports
networksetup -getinfo Wi-Fi
networksetup -getdnsservers Wi-Fi
sudo networksetup -setdnsservers Wi-Fi 1.1.1.1
scutil --dns | grep nameserver
dig example.com | grep SERVER
sudo networksetup -setdnsservers Wi-Fi empty
networksetup -getdnsservers Wi-Fi`
        },
        {
          cmd: "dns-sd و arp -a",
          title: "مين معاك على الشبكة (بأدوات الماك)",
          desc: R`عايز تعرف الأجهزة اللي معاك على شبكة البيت: الطابعة، أو Raspberry Pi جديد، أو ماك تاني فاتح SSH. الماك جاي معاه أداتين: [[arp -a]] بيعرض الأجهزة اللي جهازك كلّمها قريب، و [[dns-sd]] بيسأل الأجهزة اللي بتعلن عن نفسها بـ Bonjour. استخدمهم على شبكتك انت بس، أو بإذن صاحب الشبكة.

[[arp -a]]: ARP هو اللي بيحوّل IP لعنوان MAC (رقم الكارت الفعلي) جوه الشبكة المحلية، والماك بيحتفظ بجدول للعناوين اللي اتكلم معاها. [[-a]] اطبع الجدول كله، وكل سطر شكله [[? (192.168.1.1) at 1c:2b:3c:4d:5e:6f on en0]]: [[?]] مكان الاسم معناها إن مفيش اسم معروف للعنوان ده. [[-n]] بتمنعه يدوّر على أسامي فيبقى أسرع، و [[-i en0]] بتحصره على كارت واحد. الجدول فيه بس الأجهزة اللي جهازك كلّمها في آخر كام دقيقة، مش كل الشبكة.

[[dns-sd]]: Bonjour (اسمه التقني mDNS و DNS-SD) هو اللي بيخلي الطابعات وأجهزة Apple يظهروا لوحدهم من غير ما تكتب IP: كل جهاز بيعلن على الشبكة «أنا اسمي كذا وعندي خدمة كذا». [[-B]] (browse) دوّر على نوع خدمة، والنوع بشكل [[_اسم._tcp]]:
• [[_services._dns-sd._udp]] نوع خاص معناه «اطبع أنواع الخدمات الموجودة»، فتعرف تدوّر على إيه بعدها.
• [[_ssh._tcp]] أجهزة فاتحة SSH (زي ماك عليه Remote Login)، و [[_smb._tcp]] مشاركة ملفات، و [[_ipp._tcp]] طابعات، و [[_airplay._tcp]] أجهزة AirPlay.
الأمر مش بيخلص لوحده: بيفضل يطبع كل ما جهاز يظهر ([[Add]]) أو يختفي ([[Rmv]])، فبعد ثانيتين اقفله بـ Ctrl+C. و [[-G v4 sara-mbp.local]] بيجيب IPv4 بتاع جهاز من اسمه، وبرضه Ctrl+C.

[[ping -c 3 sara-mbp.local]]: أي ماك ليه اسم بينتهي بـ [[.local]] (تلاقيه في System Settings ثم General ثم Sharing تحت Local hostname)، فتكلّمه بالاسم حتى لو الـ IP اتغير. [[-c 3]] ابعت 3 مرات واقف، من غيرها ping بيفضل شغال لحد Ctrl+C.

عشان تمسح كل عنوان في الشبكة محتاج [[nmap]] ([[brew install nmap]] وبعدين [[nmap -sn 192.168.1.0/24]])، وده في درس «nmap -sn و arp-scan» في تاب «bash». ومن macOS Sequoia (15) فيه إذن اسمه Local Network: الأوامر اللي بتشغّلها من Terminal بتاخده لوحدها، لكن لو شغّالها من الترمنال اللي جوه VS Code أو برنامج تاني، البرنامج ده لازم يبقى مسموح له في System Settings ثم Privacy & Security ثم Local Network، وإلا الاتصال بأجهزة البيت ممكن يفشل.`,
          example: R`arp -a
arp -a -n -i en0
dns-sd -B _services._dns-sd._udp
dns-sd -B _ssh._tcp
dns-sd -G v4 sara-mbp.local
ping -c 3 sara-mbp.local`,
          try: R`اعرف كام جهاز في جدول ARP عندك، وأنواع الخدمات اللي بتتعلن على شبكة البيت. ولو عندك ماك تاني أو Raspberry Pi فاتح SSH، لاقيه بـ [[dns-sd -B _ssh._tcp]] واعمله ping باسمه.`,
          deep: {
            why: R`عايز تدخل بـ ssh على Raspberry Pi جديد ومش عارف الراوتر اداله أنهي IP، أو تلاقي الطابعة، أو تتأكد إن مفيش جهاز غريب على الواي فاي بتاعك. arp و dns-sd موجودين في كل ماك من غير تسطيب.`,
            how: R`mDNS بيشتغل على UDP بورت 5353 لكل الأجهزة على نفس الشبكة مرة واحدة (multicast)، ومش بيعدّي الراوتر لشبكة تانية. الخدمة اللي بتشغّله على الماك [[mDNSResponder]]، نفس اللي بتبعتلها HUP في درس «flush DNS». [[dns-sd -L "اسم الجهاز" _ssh._tcp]] بيطبع الجهاز والبورت لخدمة معينة. وتقدر تعلن عن خدمة بنفسك: [[dns-sd -R "My Site" _http._tcp . 8000]] بيخلي سيرفرك المحلي يبان في Bonjour طول ما الأمر شغال. المقابل في لينكس [[avahi-browse -a]] (درس «avahi-browse و .local» في تاب «bash»).`,
            when: R`جهاز جديد على الشبكة ومش عارف عنوانه، طابعة مش ظاهرة، أو مراجعة سريعة لشبكة البيت.`,
            mistakes: R`تفتكر [[arp -a]] بيوريك كل الأجهزة: ده بيوريك اللي جهازك كلّمه بس. تستنى dns-sd يخلص لوحده وهو مش بيخلص: Ctrl+C. تدوّر بـ Bonjour على جهاز ويندوز أو لينكس مش بيعلن عن نفسه (لينكس محتاج Avahi). تعمل scan لشبكة الشغل أو الكافيه من غير إذن: ممنوع في سياسات الشركات وأنظمة الحماية بتمسكه. وتعتمد على عنوان MAC للموبايلات: iPhone و Android بيستخدموا عنوان عشوائي لكل شبكة (Private Wi-Fi Address).`
          },
          lines: [
            R`جدول ARP: الأجهزة اللي جهازك كلّمها قريب، بالـ IP والـ MAC.`,
            R`نفس الجدول بأرقام بس ([[-n]]) وعلى كارت الواي فاي بس.`,
            R`أنواع الخدمات اللي بتتعلن على الشبكة. Ctrl+C بعد ثانيتين.`,
            R`الأجهزة اللي فاتحة SSH. Ctrl+C للخروج.`,
            R`IPv4 بتاع جهاز من اسمه .local.`,
            R`كلّم الجهاز باسمه 3 مرات واقف.`
          ],
          sol: R`ده ماك بس، مجربتوش هنا. المكتوب من [[man arp]] و [[man dns-sd]]، وملاحظة Apple التقنية TN3179 عن Local Network. [[arp -a]] بيطبع سطر لكل عنوان زي [[? (192.168.1.1) at 1c:2b:3c:4d:5e:6f on en0 ifscope]]، وهتلاقي فيه كمان عناوين مش أجهزة: [[192.168.1.255]] بـ [[ff:ff:ff:ff:ff:ff]] ده الـ broadcast، و [[224.0.0.251]] ده عنوان Bonjour نفسه.

[[dns-sd -B _services._dns-sd._udp]] بيطبع [[Browsing for _services._dns-sd._udp]] وتاريخ، وبعدين جدول أعمدته Timestamp و A/R و Flags و if و Domain و Service Type و Instance Name. في عمود Instance Name هتلاقي أسامي زي [[_ssh]] و [[_airplay]] و [[_ipp]]، وفي Service Type [[_tcp.local.]]. [[dns-sd -B _ssh._tcp]] بيطبع سطر [[Add]] لكل جهاز فاتح SSH وفي آخره اسمه. Ctrl+C بيرجّعلك الـ prompt.

لو مطلعش أي جهاز، يا إما مفيش حاجة بتعلن عن نفسها، يا إما الراوتر عامل client isolation (شائع في شبكات الضيوف والكافيهات) فالأجهزة مش شايفة بعض أصلًا.`
        },
        {
          cmd: "Remote Login و Screen Sharing",
          title: "ادخل على الماك من جهاز تاني (SSH والشاشة)",
          desc: R`Remote Login هو SSH server جاي مع الماك: لما تشغّله تقدر تدخل على ترمنال الماك من لابتوب ويندوز أو لينكس أو ماك تاني بـ [[ssh]]. و Screen Sharing بيوريك شاشة الماك نفسها وتتحكم فيها من جهاز تاني (بروتوكول VNC). الاتنين مقفولين افتراضيًا، والأسهل تشغّلهم من System Settings ثم General ثم Sharing.

من الترمنال: [[sudo systemsetup -getremotelogin]] بيطبع [[Remote Login: On]] أو [[Off]]، و [[sudo systemsetup -setremotelogin on]] بيشغّله. حسب [[man systemsetup]] التشغيل والقفل محتاجين Full Disk Access، يعني الترمنال نفسه لازم يكون في System Settings ثم Privacy & Security ثم Full Disk Access، ومن غيرها بيطلع [[Turning Remote Login on or off requires Full Disk Access privileges.]]. Full Disk Access إذن واسع، فلو مش محتاجه غير للحتة دي، شغّل Remote Login من الإعدادات أحسن. [[-f]] في سطر القفل بتلغي سؤال «متأكد؟».

في الإعدادات، جنب Remote Login زرار (i): هتلاقي أمر الاتصال مكتوب جاهز زي [[ssh sara@192.168.1.20]]، و Allow access for (خليها Only these users واختار اللي محتاجينها بس)، و [[Allow full disk access for remote users]] سيبها مقفولة إلا لو محتاجها.

الاتصال: ويندوز 10 و 11 فيه [[ssh]] جاهز في PowerShell، ولينكس والماك نفس الأمر: [[ssh sara@192.168.1.20]]. IP الماك من [[ipconfig getifaddr en0]] (درس «ipconfig getifaddr»)، أو اسمه من [[scutil --get LocalHostName]] وبعده [[.local]]، وده بيشتغل لو الجهاز التاني بيفهم Bonjour (ماك آه، ولينكس اللي عليه Avahi، وويندوز مش دايمًا). وللشاشة: من ماك تاني [[open vnc://192.168.1.20]] بيفتح برنامج Screen Sharing ويسألك على يوزر وباسورد الماك. من ويندوز أو لينكس محتاج VNC viewer (زي TigerVNC أو RealVNC Viewer)، وتشغّل في إعدادات Screen Sharing ثم (i) [[VNC viewers may control screen with password]] بباسورد مختلف عن باسورد الماك. البورت 22 لـ SSH و 5900 لـ VNC.

الأمان:
• متفتحش 22 ولا 5900 على النت من الراوتر (port forwarding). من برّه البيت استخدم VPN زي Tailscale أو WireGuard.
• ادخل بمفتاح مش باسورد: حط مفتاحك العام في [[~/.ssh/authorized_keys]] على الماك (درس «ssh-add»، ودرس «sshd_config» في تاب «VPS»). وبعد ما تتأكد إن الدخول بالمفتاح شغال، اقفل الباسورد بملف [[/etc/ssh/sshd_config.d/000-keys-only.conf]] فيه سطرين: [[PasswordAuthentication no]] و [[KbdInteractiveAuthentication no]]. سطر [[Include]] في [[/etc/ssh/sshd_config]] هو اللي بيقرا الفولدر ده، و [[sudo sshd -t]] بيفحص الإعدادات ومش بيطبع حاجة لو سليمة.
• VNC بباسورد لوحده مش متأمن كويس مع الـ viewers العادية، فمرّره جوه SSH: [[ssh -L 5901:localhost:5900 sara@192.168.1.20]] وافتح الـ viewer على [[localhost:5901]] (درس «ssh -L» في تاب «bash»).

خطر: Remote Login و Screen Sharing بيفتحوا باب على جهازك لأي حد على نفس الشبكة يعرف يوزر وباسورد. شغّلهم وقت ما تحتاجهم واقفلهم بعدها.`,
          example: R`sudo systemsetup -getremotelogin
sudo systemsetup -setremotelogin on
ipconfig getifaddr en0
scutil --get LocalHostName
ssh sara@192.168.1.20
open vnc://192.168.1.20
grep Include /etc/ssh/sshd_config
sudo nano /etc/ssh/sshd_config.d/000-keys-only.conf
sudo sshd -t
sudo systemsetup -setremotelogin -f off`,
          try: R`شغّل Remote Login (من الإعدادات، أو بالأمر بعد ما تدّي Terminal صلاحية Full Disk Access)، وادخل على الماك من جهاز تاني على نفس الواي فاي بـ ssh. وبعدين اقفله لو مش محتاجه.`,
          flag: "danger",
          deep: {
            why: R`ماك قديم في البيت بيتحول لسيرفر صغير (build أو ملفات) تدخل عليه من اللابتوب، أو تساعد حد في أهلك على جهازه من غير ما تروحله، أو تشغّل حاجة على ماكك وانت قاعد على جهاز الشغل.`,
            how: R`Remote Login بيشغّل OpenSSH ([[sshd]]) عن طريق launchd، وكل اتصال جديد بيقرا الإعدادات من الأول، فملف جديد في [[sshd_config.d]] بيسري على الاتصال الجاي من غير restart. [[/etc/ssh/sshd_config]] نفسه تحديثات macOS ممكن ترجّعه للأصل، عشان كده إعداداتك في ملف لوحدها، واسمه بيبدأ بـ 000 لأن sshd بياخد أول قيمة يلاقيها والملفات بتتقري بالترتيب الأبجدي.

لو [[-getremotelogin]] نفسه طلب Full Disk Access، اتأكد بطريقة تانية: [[nc -z localhost 22]] بيقول [[succeeded]] لو SSH شغال. Screen Sharing ماك لماك بيشفّر الاتصال لوحده، و Remote Management في نفس صفحة Sharing ده للي بيستخدموا Apple Remote Desktop.`,
            when: R`ماك شغال سيرفر في البيت، مساعدة عن بعد لحد على نفس الشبكة (أو عن طريق VPN)، أو نقل ملفات بـ [[scp]] بين أجهزتك.`,
            mistakes: R`تعمل port forwarding لـ 22 أو 5900 على الراوتر فبوتات النت تجرب باسوردات على جهازك طول اليوم. تسيب [[Allow full disk access for remote users]] شغالة من غير سبب. تقفل الدخول بالباسورد قبل ما تتأكد إن المفتاح شغال وانت داخل من بعيد، فتقفل على نفسك: سيب جلسة مفتوحة وجرّب من نافذة جديدة. تنسى إن الماك لما ينام SSH بيقع (درس «caffeinate» و «pmset»). وتنسى تدّي الترمنال Full Disk Access فتفتكر الأمر بايظ.`
          },
          lines: [
            R`Remote Login شغال ولا لأ.`,
            R`شغّله. محتاج إن Terminal ياخد Full Disk Access.`,
            R`IP الماك على الواي فاي، عشان تتصل بيه.`,
            R`اسم الماك على الشبكة، وتتصل بيه بـ [[.local]] بعده.`,
            R`من الجهاز التاني: ادخل على الماك باليوزر sara.`,
            R`من ماك تاني: افتح شاشة الماك ده بـ Screen Sharing.`,
            R`اتأكد إن sshd_config بيقرا فولدر [[sshd_config.d]].`,
            R`اعمل ملف يقفل الدخول بالباسورد (السطرين في الشرح فوق). بعد ما المفتاح يشتغل بس.`,
            R`افحص إعدادات sshd: مفيش ناتج يعني سليمة.`,
            R`اقفل Remote Login من غير سؤال ([[-f]]).`
          ],
          sol: R`ده ماك بس، مجربتوش هنا. المكتوب من [[man systemsetup]] وصفحات دعم Apple «Allow a remote computer to access your Mac» و «Turn screen sharing on or off». [[sudo systemsetup -getremotelogin]] بيطبع [[Remote Login: Off]]، وبعد التشغيل [[Remote Login: On]]. لو الترمنال معندوش Full Disk Access هتشوف رسالة إن Remote Login محتاج Full Disk Access ومش هيتغير حاجة.

من ويندوز (PowerShell) أو لينكس: [[ssh sara@192.168.1.20]] أول مرة بيسأل [[Are you sure you want to continue connecting (yes/no/[fingerprint])?]]، اكتب [[yes]]، وبعدها باسورد sara، وتلاقي prompt الماك زي [[sara@sara-mbp ~ %]]. [[exit]] بيرجّعك. لو قال [[Connection refused]] يبقى Remote Login مقفول، ولو [[Operation timed out]] يبقى الـ IP غلط أو الفايروول بيمنع (درس «socketfilterfw»).

ولما تقفله بـ [[-setremotelogin off]] من غير [[-f]]، هيسألك yes/no لأن الجلسات اللي داخلة بـ ssh هتقع.`,
          solCode: R`# على الماك
sudo systemsetup -setremotelogin on
sudo systemsetup -getremotelogin
ipconfig getifaddr en0
# من الجهاز التاني (PowerShell أو ترمنال لينكس)
ssh sara@192.168.1.20
exit
# على الماك لو خلصت
sudo systemsetup -setremotelogin -f off`
        },
        {
          cmd: "diskutil",
          title: "الديسكات والفلاشات: اعرض وافرمت واعمل bootable",
          desc: R`[[diskutil]] هو Disk Utility من الترمنال: بيعرض كل الديسكات المتوصلة، ويفرمت فلاشة، ويفصلها بأمان، ويفحص الديسك. أهم قاعدة: قبل أي مسح اعرف الـ identifier الصح ([[disk4]] مثلًا)، لأن رقم غلط معناه إنك تمسح ديسك تاني.

[[diskutil list]] بيطبع كل ديسك بعنوان زي [[/dev/disk0 (internal, physical):]]:
• [[internal]] جوه الجهاز و [[external]] متوصل من برّه (فلاشة أو هارد). [[physical]] ديسك حقيقي، و [[synthesized]] ديسك افتراضي APFS معمول جوه جزء من الديسك الحقيقي (هنا بتلاقي [[Macintosh HD]]).
• تحت كل ديسك أجزاؤه (partitions) في عمود IDENTIFIER زي [[disk4s1]]: [[s1]] يعني أول جزء في disk4.
• [[diskutil list external]] الخارجي بس، وده اللي تبدأ بيه قبل أي مسح.
[[diskutil info disk4]] تفاصيل ديسك واحد: الاسم والحجم و [[Protocol: USB]] و [[Device Location: External]]، فتتأكد إنه الفلاشة. و [[diskutil apfs list]] بيعرض الـ APFS containers والـ volumes اللي جواها، ومعاها سطر [[FileVault]] لكل volume.

[[diskutil eraseDisk ExFAT USB GPT disk4]] بيمسح الديسك كله ويعمله جزء واحد: [[ExFAT]] نوع الـ file system (بيتقري ويتكتب على ويندوز وماك ولينكس، ومفيهوش حد 4 جيجا للملف زي FAT32)، و [[USB]] الاسم اللي هيظهر، و [[GPT]] نوع جدول الأجزاء، وآخر حاجة الديسك نفسه. أنواع تانية: [[APFS]] لماك بس، و [[MS-DOS]] يعني FAT32 (لأجهزة قديمة وشاشات، والاسم ساعتها كابيتال لحد 11 حرف) ومعاه [[MBR]] بدل GPT. [[diskutil listFilesystems]] بيطبع كل الأسامي المسموحة.

[[diskutil unmountDisk disk4]] بيفصل كل أجزاء الديسك من غير ما يطلّعه، ودي لازمة قبل [[dd]]. [[diskutil eject disk4]] بيفصله عشان تشيله بأمان. [[diskutil verifyVolume /]] بيفحص الـ file system بتاع ديسك النظام وهو شغال (زي First Aid في Disk Utility)، و [[repairVolume]] بيصلّح ديسك خارجي.

فلاشة bootable:
• macOS: نزّل الـ installer (درس «softwareupdate»)، وبعدين [[createinstallmedia]] اللي جوه التطبيق نفسه بيمسح الفلاشة ويعملها installer. بيسأل على باسوردك وبعدين [[Y]] للتأكيد، و Apple بتقول 32 جيجا كفاية لأي نسخة. [[\ ]] قبل المسافة في المسار معناها إن المسافة جزء من الاسم.
• لينكس (ملف ISO): [[dd]] بينسخ الملف بايت بايت على الفلاشة. [[if=]] الملف اللي بيقرا منه، و [[of=]] اللي بيكتب فيه، و [[/dev/rdisk4]] (بـ r) نسخة raw من نفس الديسك أسرع بكتير من [[/dev/disk4]]، و [[bs=4m]] اكتب 4 ميجا في المرة، و [[status=progress]] اطبع التقدم كل ثانية. المسار بـ [[$HOME]] مش [[~]]، لأن zsh مش بيفك [[~]] بعد [[=]]. بعد ما يخلص الماك هيقولك إن الديسك مش مقروء، ده طبيعي: دوس Eject.

خطر: eraseDisk و dd مالهمش undo ومش بيسألوك «متأكد؟»، و [[dd]] على identifier غلط بيكتب فوق ديسك تاني من غير أي تحذير. اعمل [[diskutil list external]] قبلها على طول (الرقم بيتغير لما تشيل وتركّب)، وخلي الفلاشة هي الحاجة الوحيدة المتوصلة.`,
          example: R`# اعرف الديسكات
diskutil list
diskutil list external
diskutil info disk4
diskutil apfs list
diskutil verifyVolume /
# فرمت فلاشة (بيمسح كل اللي عليها)
diskutil eraseDisk ExFAT USB GPT disk4
diskutil eject disk4
# فلاشة لينكس من ملف ISO
diskutil unmountDisk disk4
sudo dd if=$HOME/Downloads/ubuntu-24.04.3-desktop-amd64.iso of=/dev/rdisk4 bs=4m status=progress
diskutil eject disk4
# فلاشة تسطيب macOS
sudo /Applications/Install\ macOS\ Tahoe.app/Contents/Resources/createinstallmedia --volume /Volumes/USB`,
          try: R`وصّل فلاشة مفيهاش حاجة مهمة. اعرف الـ identifier بتاعها من [[diskutil list external]] واتأكد منه بـ [[diskutil info]]، وبعدين فرمتها ExFAT باسم USB واعملها eject.`,
          flag: "danger",
          deep: {
            why: R`فلاشة جديدة جاية FAT32 ومش بتاخد ملف أكبر من 4 جيجا، أو عايز تسطّب لينكس على جهاز تاني، أو تعمل installer لماك بايظ. و Disk Utility بيخبّي حاجات (زي الفرق بين الديسك كله والـ volume) الترمنال بيوريهالك صريحة.`,
            how: R`APFS بيقسم الديسك لـ container، وجوه الـ container كذا volume بيشاركوا نفس المساحة: System (للقراية بس) و Data (ملفاتك) و Preboot و Recovery و VM. عشان كده [[diskutil list]] بيوريك disk0 حقيقي و disk3 synthesized. [[/dev/diskN]] بيعدّي على كاش النظام، و [[/dev/rdiskN]] بيكتب على الديسك على طول، وده اللي بيخلي dd أسرع. ولو dd شغال من غير status، Ctrl+T بتطبعلك وصل لفين (الماك بيبعتله إشارة SIGINFO). المقابل في لينكس [[lsblk]] و [[fdisk]] و [[mkfs]] (درس «fdisk و mkfs و dd» في تاب «bash»).`,
            when: R`فرمتة فلاشة أو هارد خارجي، فلاشة تسطيب لينكس أو macOS، أو فحص الديسك لما الماك يتصرف غريب.`,
            mistakes: R`تعتمد على إن الفلاشة disk4 زي المرة اللي فاتت: الأرقام بتتغير. تكتب [[disk4s1]] في eraseDisk بدل [[disk4]]. تنسخ [[disk0]] أو رقم من شرح على النت من غير ما تبص على جهازك. تختار APFS لفلاشة هتتقري على ويندوز. وتكتب [[if=~/Downloads/x.iso]] في zsh فيقولك [[No such file or directory]] لأن [[~]] بعد [[=]] مش بيتفك إلا لو [[setopt magic_equal_subst]].`
          },
          lines: [
            R`كل الديسكات وأجزاؤها. disk0 غالبًا الديسك الداخلي.`,
            R`الديسكات الخارجية بس: ابدأ بيها قبل أي مسح.`,
            R`تفاصيل disk4: اتأكد إنه USB و External وحجمه حجم الفلاشة.`,
            R`الـ APFS containers والـ volumes وحالة FileVault.`,
            R`افحص ديسك النظام وهو شغال (First Aid).`,
            R`امسح disk4 كله واعمله ExFAT باسم USB. مفيش «متأكد؟».`,
            R`افصل الفلاشة عشان تشيلها بأمان.`,
            R`افصل أجزاء disk4 من غير ما تطلّعه، عشان dd يكتب عليه.`,
            R`انسخ ISO لينكس على الفلاشة بايت بايت، والتقدم كل ثانية.`,
            R`اطلّعها بعد ما dd يخلص.`,
            R`اعمل فلاشة macOS Tahoe: باسوردك وبعدين Y عشان يمسح الفلاشة.`
          ],
          sol: R`ده ماك بس، مجربتوش هنا. المكتوب من [[man diskutil]] و [[man dd]] وصفحة Apple «How to create a bootable installer for macOS». [[diskutil list external]] بيطبع حاجة زي [[/dev/disk4 (external, physical):]] وتحتها سطر الديسك كله بالحجم [[*32.0 GB]] و [[disk4]]، وسطر الجزء [[disk4s1]]. الرقم عندك ممكن يبقى غير 4. [[diskutil info disk4 | grep -E 'Device Location|Protocol|Disk Size']] بيطبع [[Device Location: External]] و [[Protocol: USB]] والحجم. [[grep -E]] بيسيب السطور اللي فيها أي كلمة من اللي بينهم [[|]].

[[diskutil eraseDisk ExFAT USB GPT disk4]] بيطبع خطوات أولها [[Started erase on disk4]] وآخرها [[Finished erase on disk4]]، و [[ls /Volumes]] هيوريك [[USB]]. [[diskutil eject disk4]] بيطبع [[Disk disk4 ejected]].

لو قال إن فيه volume مش راضي يتفصل، يبقى فيه برنامج فاتح ملف عليها أو ترمنال واقف جواها: اعمل [[cd ~]] واقفل Finder على الفلاشة وجرّب تاني.`,
          solCode: R`diskutil list external
diskutil info disk4 | grep -E 'Device Location|Protocol|Disk Size'
diskutil eraseDisk ExFAT USB GPT disk4
ls /Volumes
diskutil eject disk4`
        },
        {
          cmd: "softwareupdate",
          title: "تحديثات macOS و Rosetta من الترمنال",
          desc: R`[[softwareupdate]] بيعمل اللي في System Settings ثم General ثم Software Update: يدوّر على تحديثات macOS و Safari و Command Line Tools، وينزّلها ويسطّبها. ومنه كمان تنزّل installer كامل لنسخة macOS معينة، وتسطّب Rosetta.

الأوامر:
• [[-l]] (list) التحديثات المتاحة. كل تحديث ليه سطر [[Label:]] وده الاسم اللي هتكتبه في التسطيب، وتحته سطر [[Title]] فيه الحجم، و [[Action: restart]] لو محتاج restart. [[*]] قبل Label يعني recommended. ده الأمر الوحيد اللي مش محتاج صلاحية أدمن.
• [[-i "Label"]] (install) نزّل وسطّب تحديث واحد باسمه، بين علامات تنصيص لأن فيه مسافات. [[-ia]] هي [[-i -a]]: سطّب كل المتاح (all). و [[--restart]] اعمل restart لوحدك لو التحديث محتاجه، من غيرها الأمر يخلص ويقولك تعمل restart.
• [[-d]] (download) نزّل بس، وتسطّب بعدين من الإعدادات أو بـ [[-i]].
• [[--history]] التحديثات اللي اتسطبت: الاسم والنسخة والتاريخ.
• [[--list-full-installers]] نسخ macOS الكاملة المتاحة لجهازك، و [[--fetch-full-installer --full-installer-version 15.7.1]] بينزّل [[Install macOS Sequoia.app]] في Applications (أكتر من 10 جيجا)، وبيه تعمل فلاشة تسطيب (درس «diskutil»). من غير [[--full-installer-version]] بينزّل أحدث نسخة.
• [[--install-rosetta --agree-to-license]] على Apple Silicon: Rosetta 2 بتشغّل برامج Intel (x86_64) على شريحة M، و [[--agree-to-license]] بتوافق على الترخيص من غير ما يسألك. على جهاز Intel ملوش لازمة.

على Apple Silicon تحديث macOS نفسه محتاج موافقة يوزر عنده secure token (درس «dscl و sysadminctl»)، فممكن يسألك على باسوردك حتى مع sudo. و Apple قالت إن Rosetta هتفضل متاحة بشكل عام لحد macOS 27، وبعدها هتبقى لحاجات محدودة زي الألعاب القديمة، فلو أداة عندك لسه Intel بس، دوّر على نسخة arm64.

خطر: [[--restart]] بيقفل البرامج ويعمل restart من غير ما يستناك، وأي شغل مش متحفظ ممكن يضيع. وأثناء تحديث النظام خلي اللابتوب على الشاحن.`,
          example: R`softwareupdate -l
softwareupdate --history
sudo softwareupdate -i "macOS Sequoia 15.7.1-24G231"
sudo softwareupdate -ia --restart
softwareupdate --list-full-installers
softwareupdate --fetch-full-installer --full-installer-version 15.7.1
softwareupdate --install-rosetta --agree-to-license`,
          try: R`اعرض التحديثات المتاحة وتاريخ التحديثات. ولو جهازك Apple Silicon، اعرف Rosetta متسطبة ولا لأ بـ [[arch -x86_64 /usr/bin/true]]، وسطّبها لو برنامج Intel محتاجها.`,
          flag: "danger",
          deep: {
            why: R`تحديث من سكربت لأكتر من ماك، أو على ماك داخل عليه بـ ssh من غير شاشة، أو تنزّل installer كامل لنسخة بعينها لأن مشروعك أو Xcode محتاجها. و [[--history]] بتقولك إمتى اتسطب آخر تحديث أمني.`,
            how: R`softwareupdate بيكلّم نفس خدمة التحديثات اللي الإعدادات بتستخدمها، فاللي بتنزّله من هنا بيظهر هناك والعكس. [[-r]] (recommended) بدل [[-a]] بيسطّب الـ recommended بس. [[--schedule]] بيقولك التحديث التلقائي في الخلفية شغال ولا لأ، و [[--background]] بيعمل check دلوقتي. وبعد [[xcode-select --install]]، تحديثات Command Line Tools بتظهر هنا باسم زي [[Command Line Tools for Xcode]] وبعده رقم النسخة.

[[arch -x86_64]] بيشغّل البرنامج اللي بعده كـ Intel. [[/usr/bin/true]] برنامج مش بيعمل حاجة غير إنه ينجح، فلو اشتغل يبقى Rosetta موجودة، ولو طلع [[Bad CPU type in executable]] يبقى مش متسطبة.`,
            when: R`قبل ما تبدأ شغل على ماك جديد، أو مرة في الأسبوع لو التحديث التلقائي مقفول، أو لما برنامج قديم يقولك محتاج Rosetta.`,
            mistakes: R`تكتب الـ Label غلط أو من غير علامات تنصيص فيقولك مش لاقيه: انسخه من [[-l]] بالحرف. تشغّل [[-ia --restart]] وعندك شغل مفتوح. تستغرب إنه بيسأل على باسورد مع sudo على Apple Silicon: ده تأكيد اليوزر صاحب الـ token. و [[--fetch-full-installer]] في بعض النسخ (اتبلّغ عنه في 15.4) كان بيطلع [[Install failed with error: Update not found]] لأي نسخة: نزّل من App Store أو من صفحة Apple «How to download and install macOS».`
          },
          lines: [
            R`التحديثات المتاحة: Label و Title لكل واحد.`,
            R`التحديثات اللي اتسطبت قبل كده وتواريخها.`,
            R`سطّب تحديث واحد. الاسم بالظبط زي سطر Label عندك (ده مثال).`,
            R`سطّب كل المتاح، واعمل restart لوحدك لو محتاج. احفظ شغلك الأول.`,
            R`نسخ macOS الكاملة المتاحة لجهازك.`,
            R`نزّل installer كامل لنسخة 15.7.1 في Applications.`,
            R`سطّب Rosetta 2 ووافق على الترخيص (Apple Silicon بس).`
          ],
          sol: R`ده ماك بس، مجربتوش هنا. المكتوب من [[man softwareupdate]]، ومن Apple Developer Forums (مشكلة fetch-full-installer في 15.4)، وتقارير إعلان Apple عن Rosetta. [[softwareupdate -l]] بيطبع [[Software Update Tool]] و [[Finding available software]]، وبعدها يا إما [[No new software available.]] يا إما لستة كل واحد فيها سطر [[* Label:]] وتحته [[Title:]] فيه [[Version]] و [[Size]] و [[Recommended: YES]]. [[--history]] بيطبع جدول أعمدته [[Display Name]] و [[Version]] و [[Date]].

على Apple Silicon من غير Rosetta، [[arch -x86_64 /usr/bin/true]] بيطبع error فيه [[Bad CPU type in executable]]. بعد [[softwareupdate --install-rosetta --agree-to-license]] (بيطبع إنك وافقت على الترخيص وبعدين [[Install of Rosetta 2 finished successfully]])، نفس الأمر مش بيطبع حاجة، و [[&& echo "rosetta ok"]] بيطبع [[rosetta ok]]: [[&&]] معناها نفّذ اللي بعدي لو اللي قبلي نجح.`,
          solCode: R`softwareupdate -l
softwareupdate --history
arch -x86_64 /usr/bin/true && echo "rosetta ok"
softwareupdate --install-rosetta --agree-to-license
arch -x86_64 /usr/bin/true && echo "rosetta ok"`
        },
        {
          cmd: "tmutil",
          title: "Time Machine من الترمنال (واستبعد node_modules)",
          desc: R`Time Machine هو الباك أب المبني في الماك: بيعمل نسخة من كل حاجة على هارد خارجي أو على الشبكة كل ساعة. [[tmutil]] بيتحكم فيه من الترمنال: تبدأ باك أب، وتعرف آخر باك أب، وتستبعد فولدرات زي [[node_modules]] منه.

الأوامر:
• [[tmutil status]] فيه باك أب شغال دلوقتي ولا لأ: [[Running = 1]] يعني شغال، ومعاه المرحلة والنسبة.
• [[tmutil startbackup --block]] ابدأ باك أب دلوقتي. [[--block]] بيخلي الأمر يستنى لحد ما الباك أب يخلص بدل ما يرجّعلك الـ prompt على طول، فينفع في سكربت قبل خطوة خطيرة.
• [[tmutil latestbackup]] مسار آخر باك أب كامل، و [[tmutil listbackups]] كل الباك أبات. [[man tmutil]] بيقول إن أوامر كتير منه محتاجة root و Full Disk Access، فلو طلع error صلاحيات ضيف Terminal في System Settings ثم Privacy & Security ثم Full Disk Access.
• [[tmutil addexclusion ~/projects/shop/node_modules]] متعملش باك أب للفولدر ده. ده استبعاد بيمشي مع الفولدر لو نقلته أو نسخته، ومش محتاج sudo. و [[tmutil isexcluded]] بيرد بسطر أوله [[Excluded]] أو [[Included]] بين أقواس مربعة، و [[removeexclusion]] بترجّعه للباك أب.

ليه node_modules: فولدر فيه عشرات آلاف الملفات الصغيرة بترجع بـ [[npm install]] في دقيقة، وبيبطّأ كل باك أب ويملا الهارد. نفس الكلام لـ [[.venv]] و [[target]] و [[build]] و Docker. والـ glob بتاع zsh بيستبعدهم كلهم مرة واحدة: [[~/projects/*/node_modules]]، و [[*]] معناها أي اسم فولدر.

local snapshots: لو Time Machine متظبط، الماك كمان بيعمل snapshot على الديسك الداخلي نفسه كل ساعة ويحتفظ بيها 24 ساعة، فتقدر ترجّع ملف حتى والهارد الخارجي مش متوصل. [[tmutil localsnapshot]] اعمل واحد دلوقتي (قبل تحديث أو تجربة خطيرة)، و [[tmutil listlocalsnapshots /]] اعرضهم ([[/]] يعني ديسك النظام)، و [[tmutil thinlocalsnapshots / 20000000000 4]] خلّي الماك يمسح snapshots لحد ما يفضّي حوالي 20 جيجا (الرقم بالبايت، و 4 أعلى درجة استعجال من 1 لـ 4). الماك بيمسحهم لوحده لما المساحة تقل، بس ده بيفيد لو برنامج بيقولك الديسك مليان.`,
          example: R`tmutil status
tmutil startbackup --block
tmutil latestbackup
tmutil listbackups
tmutil addexclusion ~/projects/shop/node_modules
tmutil addexclusion ~/projects/*/node_modules
tmutil isexcluded ~/projects/shop/node_modules
tmutil localsnapshot
tmutil listlocalsnapshots /
sudo tmutil thinlocalsnapshots / 20000000000 4`,
          try: R`استبعد كل فولدرات [[node_modules]] في مشاريعك من Time Machine واتأكد بـ [[isexcluded]]. ولو Time Machine متظبط عندك، اعمل local snapshot واعرضه.`,
          deep: {
            why: R`الهارد باظ أو اللابتوب اتسرق أو مسحت فولدر بالغلط: Time Machine هو اللي بيرجّعلك كل حاجة. ومن الترمنال بتعمل باك أب قبل حاجة خطيرة (تحديث، مسح يوزر، فرمتة)، وتشيل الحاجات اللي بتطوّل الباك أب من غير فايدة.`,
            how: R`الاستبعاد العادي (sticky) متسجل على الفولدر نفسه كـ extended attribute اسمه [[com.apple.metadata:com_apple_backup_excludeItem]]، عشان كده بيمشي معاه، وتشوفه بـ [[xattr -l]] (درس «xattr و quarantine»). [[-p]] استبعاد بالمسار و [[-v]] لديسك كامل، والاتنين محتاجين sudo. [[tmutil destinationinfo]] بيطبع الهارد المتظبط، و [[tmutil restore]] بيرجّع ملف من باك أب، و [[tmutil compare]] بيقارن الجهاز بآخر باك أب. و [[tmutil status]] مش مكتوب في كل نسخ man، بس موجود وبتستخدمه السكربتات كتير.`,
            when: R`أول ما تجيب هارد للباك أب، وأول ما تعمل مشروع جديد فيه node_modules أو [[.venv]]، وقبل أي أمر خطير في الدروس دي.`,
            mistakes: R`تفتكر local snapshots باك أب: هي على نفس الديسك، فلو الديسك باظ راحت معاه. تستبعد [[~/projects]] كله بدل node_modules بس فتخسر كودك. تشغّل listbackups وتلاقي error فتفتكر مفيش باك أب، والمشكلة Full Disk Access. تكتب [[~/projects/*/node_modules]] ومفيش ولا مشروع فيه node_modules فـ zsh يقول [[no matches found]]. وتعتمد على Time Machine لوحده لحاجة مهمة: خلّي نسخة برّه البيت كمان، وللكود Git remote.`
          },
          lines: [
            R`فيه باك أب شغال دلوقتي ولا لأ.`,
            R`ابدأ باك أب واستنى لحد ما يخلص.`,
            R`مسار آخر باك أب كامل.`,
            R`كل الباك أبات. لو error صلاحيات: Full Disk Access للترمنال.`,
            R`استبعد node_modules بتاع مشروع واحد.`,
            R`استبعد node_modules في كل مشاريعك مرة واحدة.`,
            R`اتأكد إنه مستبعد.`,
            R`اعمل local snapshot دلوقتي.`,
            R`اعرض الـ snapshots اللي على ديسك النظام.`,
            R`امسح snapshots لحد ما تفضّي حوالي 20 جيجا.`
          ],
          sol: R`ده ماك بس، مجربتوش هنا. المكتوب من [[man tmutil]] وصفحات دعم Apple عن Time Machine. [[tmutil addexclusion ~/projects/*/node_modules]] مش بيطبع حاجة، و [[tmutil isexcluded]] على أي واحد منهم بيطبع سطر فيه كلمة Excluded بين أقواس مربعة وبعدها المسار، زي المثال اللي في صفحة man. ولو مشروع معندوش node_modules، الـ glob بيتجاهله، ولو مفيش ولا واحد zsh بيقول [[no matches found]].

لو Time Machine متظبط: [[tmutil localsnapshot]] بيطبع [[Created local snapshot with date:]] وبعدها التاريخ بشكل [[2026-10-02-101500]] (سنة-شهر-يوم-ساعة دقيقة ثانية)، و [[tmutil listlocalsnapshots /]] بيطبع [[Snapshots for disk /:]] وتحتها أسامي زي [[com.apple.TimeMachine.2026-10-02-101500.local]]. ولو Time Machine مش متظبط خالص، الأوامر دي ممكن تفشل أو متطبعش snapshots.`,
          solCode: R`tmutil addexclusion ~/projects/*/node_modules
tmutil isexcluded ~/projects/*/node_modules
tmutil localsnapshot
tmutil listlocalsnapshots /`
        },
        {
          cmd: "system_profiler و ioreg",
          title: "البطارية والـ USB والهاردوير بالتفصيل",
          desc: R`[[system_profiler]] بيطبع نفس اللي في تطبيق System Information: كل حاجة عن الهاردوير والسوفتوير، مقسمة لأنواع (data types). درس «sw_vers» عرض نوع الجهاز والشريحة؛ هنا البطارية والـ USB وإزاي تاخد الناتج JSON لسكربت، ومعاهم [[ioreg]] و [[sysctl]] للتفاصيل الأدق.

system_profiler:
• [[-listDataTypes]] بيطبع أسامي كل الأنواع، وكلها بتبدأ بـ [[SP]] وتنتهي بـ [[DataType]].
• [[SPPowerDataType]] الطاقة والبطارية. تحت Health Information هتلاقي [[Cycle Count]] (عدد الدورات: كل ما تستهلك 100% من سعة البطارية، حتى لو على كذا مرة، تبقى دورة)، و [[Condition]] ([[Normal]]، أو [[Service Recommended]] يعني محتاجة تتغير)، و [[Maximum Capacity]] السعة دلوقتي كنسبة من وهي جديدة. [[grep -E]] بيطبع السطور اللي فيها أي كلمة من اللي بينهم [[|]].
• [[-detailLevel mini]] تقرير كامل من غير معلومات شخصية زي الرقم التسلسلي، و [[>]] بتحطه في ملف، وده اللي تبعته لحد بيساعدك.
• [[-json]] الناتج JSON بدل نص، وده اللي تستخدمه في سكربت. من macOS Sequoia (15) [[jq]] جاي مع الماك، و [[jq -r '.SPHardwareDataType[0].physical_memory']] بتطلع الرام بس: [[.SPHardwareDataType]] المفتاح، والـ 0 بين الأقواس المربعة يعني أول عنصر في اللستة، و [[-r]] اطبع النص من غير علامات تنصيص.
• [[SPUSBDataType]] كان بيعرض أجهزة الـ USB المتوصلة، وفي macOS Tahoe (26) اتشال، والجديد [[SPUSBHostDataType]] بيعرض الـ controllers بس. الأضمن [[ioreg -p IOUSB]] اللي بيطبع شجرة أجهزة الـ USB على أي نسخة.

ioreg بيعرض شجرة الأجهزة اللي الـ kernel شايفها (I/O Kit registry). [[-r -c AppleSmartBattery]] اعرض بس الحاجة اللي نوعها (class) البطارية وتفاصيلها، وفيها أرقام البطارية الخام زي [[CycleCount]]، وأسرع من system_profiler. و [[ioreg -l | grep -i cycle]] بيوصل لنفس الحاجة بس بيلف على الشجرة كلها. [[-p IOUSB]] بيعرض الشجرة من ناحية الـ USB بس.

sysctl بيقرا قيم من الـ kernel، و [[-n]] اطبع القيمة بس من غير الاسم: [[hw.model]] رقم الموديل زي [[Mac14,2]] (بيه تدوّر على مواصفات جهازك بالظبط)، و [[hw.memsize]] الرام بالبايت، و [[machdep.cpu.brand_string]] اسم المعالج زي [[Apple M2]] أو اسم Intel كامل. و [[sysctl.proc_translated]] بيطبع [[1]] لو الترمنال نفسه شغال بـ Rosetta و [[0]] لو native، وعلى Intel مش موجود أصلًا.`,
          example: R`system_profiler -listDataTypes
system_profiler SPPowerDataType | grep -E 'Cycle Count|Condition|Maximum Capacity'
system_profiler -detailLevel mini > ~/Desktop/mac-report.txt
system_profiler -json SPHardwareDataType | jq -r '.SPHardwareDataType[0].physical_memory'
ioreg -r -c AppleSmartBattery | grep -i cycle
ioreg -p IOUSB
sysctl -n hw.model hw.memsize
sysctl -n machdep.cpu.brand_string
sysctl -n sysctl.proc_translated`,
          try: R`اعرف عدد دورات البطارية وحالتها والسعة القصوى، وقارن [[CycleCount]] من ioreg باللي في system_profiler. ولو جهازك Apple Silicon، اتأكد إن الترمنال مش شغال بـ Rosetta.`,
          deep: {
            why: R`بتشتري ماك مستعمل: عدد الدورات والسعة القصوى بيقولولك حالة البطارية الحقيقية. أو بتكتب سكربت جرد لأجهزة الفريق، أو بتطلب مساعدة وعايز تبعت مواصفات جهازك من غير الرقم التسلسلي.`,
            how: R`system_profiler بطيء نسبيًا لأنه بيجمع من مصادر كتير، فحدد الـ data type دايمًا. وناتج [[-json]] شكله ثابت أكتر من النص اللي ممكن يتغير بين النسخ، فاستخدمه في السكربتات. ioreg بيقرا من الـ kernel مباشرة وأسرع، بس أسامي المفاتيح فيه داخلية ممكن تتغير. والبطاريات في لابتوبات Apple الحديثة معمولة تحتفظ بحوالي 80% من سعتها لحد 1000 دورة. المقابل في لينكس [[lsusb]] و [[lspci]] (درس «lsusb و lspci و lshw» في تاب «bash»).`,
            when: R`شرا أو بيع ماك، بطارية بتخلص بسرعة، جرد أجهزة، أو قبل ما تطلب مساعدة في منتدى.`,
            mistakes: R`تعتمد على [[SPUSBDataType]] في سكربت فيرجع فاضي على Tahoe. تعمل grep على الناتج النصي ولغة الجهاز مش إنجليزي فممكن الأسامي تبقى مترجمة، والـ JSON مفاتيحه ثابتة. تبعت تقرير كامل فيه الرقم التسلسلي لحد مش عارفه. وتحكم من رقم [[Maximum Capacity]] مرة واحدة: الرقم بيتحرك شوية بعد معايرة البطارية، فبص على اتجاهه مع الوقت. وعلى ماك ديسكتوب (Mac mini أو iMac) مفيش بطارية أصلًا، فـ grep مش هيطبع حاجة.`
          },
          lines: [
            R`أسامي كل أنواع التقارير.`,
            R`حالة البطارية: الدورات والحالة والسعة القصوى.`,
            R`تقرير كامل من غير معلومات شخصية، في ملف على الـ Desktop.`,
            R`الرام بس، من ناتج JSON بـ jq.`,
            R`عدد الدورات من ioreg مباشرة (أسرع).`,
            R`شجرة أجهزة الـ USB المتوصلة.`,
            R`رقم الموديل والرام بالبايت، كل واحد في سطر.`,
            R`اسم المعالج.`,
            R`1 لو الترمنال شغال بـ Rosetta، و 0 لو native.`
          ],
          sol: R`ده ماك بس، مجربتوش هنا. المكتوب من [[man system_profiler]] و [[man ioreg]] و [[man sysctl]]، و Apple Community عن SPUSBDataType في Tahoe. على لابتوب، سطر grep بيطبع حاجة زي [[Cycle Count: 187]] و [[Condition: Normal]] و [[Maximum Capacity: 89%]]. و [[ioreg -r -c AppleSmartBattery | grep -i cycle]] بيطبع سطر فيه [["CycleCount" = 187]] (نفس الرقم)، ومعاه سطور تانية فيها كلمة cycle زي أقصى عدد دورات البطارية معمولة له.

[[sysctl -n sysctl.proc_translated]] بيطبع [[0]] لو الترمنال native. لو طبع [[1]]، اقفل Terminal، واعمل Get Info عليه في Applications ثم Utilities، وشيل علامة Open using Rosetta، وافتحه تاني. وعلى جهاز Intel الأمر بيطبع error إن الاسم مش موجود، وده طبيعي.`
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
