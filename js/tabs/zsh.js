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
          desc: "الماك من إصدار Catalina بيفتح على zsh. فيه bash كمان بس نسخة 3.2 قديمة جدًا، وده سبب إن Apple غيّرت.",
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
          ]
        },
        {
          cmd: "~/.zshrc",
          title: "ملف إعداداتك",
          desc: "نفس دور [[.bashrc]] بالظبط: aliases و exports و functions. بعد أي تعديل [[source ~/.zshrc]].",
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
          ]
        },
        {
          cmd: "**/*.js",
          title: "بحث في كل الفولدرات من غير find",
          desc: "zsh بيفهم [[**]] يعني كل الفولدرات اللي تحت مهما كانت عميقة. [[(N)]] في الآخر تخليه ميطلعش error لو مفيش نتايج. خد بالك إنه بيدخل node_modules كمان.",
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
          ]
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
          ]
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
          ]
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
          lines: ["نزّل سكربت التسطيب الرسمي وشغّله.", "افتح الإعدادات: غيّر [[ZSH_THEME]] وضيف plugins.", "طبّق."]
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
          desc: "أول سطر هو أمر التسطيب الرسمي من brew.sh. في آخره هيطبعلك سطرين تضيف بيهم brew للـ PATH، نفّذهم.",
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
          ]
        },
        {
          cmd: "brew --cask",
          title: "برامج بواجهة",
          desc: "تطبيقات عادية زي VS Code و Docker Desktop من غير ما تحمّل ملفات dmg بإيدك.",
          example: R`brew install --cask visual-studio-code
brew install --cask docker-desktop`,
          try: "دوّر على تطبيق بتستخدمه بـ [[brew search --cask]] واعرف اسمه.",
          deep: {
            why: "Homebrew Cask بيسطّب تطبيقات ذات واجهة رسومية (GUI apps) زي VS Code وGoogle Chrome وDocker.",
            how: R`[[brew install --cask google-chrome]] بيسطّب Chrome. [[brew install --cask visual-studio-code docker iterm2]] كذا تطبيق.

الفرق: [[brew install]] للـ CLI tools. [[brew install --cask]] للـ GUI apps.

[[brew list --cask]] بيعرض الـ casks المسطّبة. [[brew uninstall --cask app-name]] بيشيله.

وفيه موقع [[formulae.brew.sh]] للبحث عن الـ packages.`,
            when: "تجهيز ماك جديد للتطوير. تسطيب Docker Desktop أو VS Code.",
            mistakes: "[[brew install chrome]] مش شغال. الاسم الصح [[google-chrome]] وتاخده من الـ formulae.brew.sh."
          },
          lines: ["برنامج بواجهة (GUI) بيتسطب بـ [[--cask]].", "Docker Desktop."]
        },
        {
          cmd: "brew upgrade",
          title: "حدّث كل حاجة",
          desc: "update بتحدّث لستة البرامج المتاحة، upgrade بتحدّث البرامج نفسها، و cleanup بتمسح النسخ القديمة وتوفر مساحة.",
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
          ]
        },
        {
          cmd: "brew list / info",
          title: "اعرف متسطب إيه",
          desc: "[[list]] بيعرض كل اللي سطّبته، و [[search]] بيدوّر على باكدج قبل ما تسطّبها، و [[info]] بيوريك نسختها ومكانها واعتمادياتها، و [[uninstall]] بيشيلها.",
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
          lines: ["المسطّب.", "دوّر على باكدج.", "تفاصيل باكدج ونسخته ومتسطب ولا لأ.", "شيل باكدج."]
        },
        {
          cmd: "brew services",
          title: "خدمات في الخلفية (بديل systemctl)",
          desc: "للحاجات اللي سطبتها بـ brew زي Postgres و Redis و Nginx. start بتشغّلها وتخليها تقوم مع الجهاز.",
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
          ]
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
          desc: "[[open .]] يفتح Finder في مكانك، [[-a]] يفتح بتطبيق معين، ومع URL يفتح المتصفح. زي [[xdg-open]] في أوبونتو.",
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
          ]
        },
        {
          cmd: "pbcopy / pbpaste",
          title: "الكليب بورد",
          desc: "pbcopy بياخد الناتج على الكليب بورد، و pbpaste بيطبع اللي عليه. أشهر استخدام: نسخ مفتاح SSH العام عشان تحطه في GitHub أو السيرفر.",
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
          ]
        },
        {
          cmd: "mdfind",
          title: "دوّر بـ Spotlight",
          desc: "أسرع بكتير من find لأنه بيدوّر في فهرس جاهز. [[-name]] بالاسم بس، و [[-onlyin]] يحصر البحث في فولدر.",
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
          lines: ["دوّر على ملف بالاسم في الجهاز كله بـ Spotlight (لحظي).", "دوّر على كلمة جوه ملفات فولدر معين."]
        },
        {
          cmd: "caffeinate",
          title: "امنع الجهاز ينام",
          desc: "وانت بتعمل build طويل أو تحميل كبير. [[-i]] يمنع النوم طول ما الأمر اللي بعده شغال، و [[-t]] بالثواني.",
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
          lines: ["شغّل الـ build وامنع الماك ينام لحد ما يخلص ([[-i]] idle).", "امنع النوم لساعة (٣٦٠٠ ثانية)."]
        },
        {
          cmd: "defaults",
          title: "إعدادات مخفية",
          desc: "بيغيّر إعدادات النظام. المثال بيظهر الملفات المخفية في Finder دايمًا (أو من غير أوامر: Cmd+Shift+. جوه Finder).",
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
          lines: ["خلّي Finder يعرض الملفات المخفية.", "اقفل Finder وافتحه عشان يطبّق."]
        },
        {
          cmd: "sw_vers",
          title: "معلومات الجهاز",
          desc: "[[uname -m]] لو طلع arm64 يبقى جهازك Apple Silicon، ودي بتفرق مع Docker images اللي معمولة لـ amd64 بس.",
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
          lines: ["نسخة macOS.", "المعالج: arm64 يعني Apple Silicon، و x86_64 يعني Intel.", "كل تفاصيل الجهاز."]
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
          desc: "على الماك [[-i]] لازم بعدها امتداد لملف الباك أب، و [['']] معناها من غير باك أب. الأمر بتاع لينكس هيطلع error هنا.",
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
          ]
        },
        {
          cmd: "lsof -i",
          title: "مين على البورت",
          desc: "مفيش [[ss]] على الماك، فـ lsof هو الطريقة. [[-P]] يعرض أرقام البورتات بدل أساميها، و [[-t]] الـ PID بس.",
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
          ]
        },
        {
          cmd: "top -o mem",
          title: "الرام والمعالج",
          desc: "مفيش [[free]]. [[top -o mem]] بيرتب بالرام (q للخروج)، و htop من brew لو عايز نفس شكل لينكس.",
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
          ]
        },
        {
          cmd: "date -v",
          title: "حساب التواريخ",
          desc: "[[date +%F]] زي لينكس، بس الحساب مختلف: لينكس بيكتب [[date -d yesterday]]، الماك [[date -v-1d]].",
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
          lines: ["تاريخ النهارده.", "امبارح: [[-v-1d]] (على لينكس كانت [[-d yesterday]]).", "بعد أسبوع."]
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
          lines: ["بصمة SHA256 (الأمر اسمه shasum مش sha256sum).", "بصمة MD5 (الأمر md5 مش md5sum)."]
        },
        {
          cmd: "coreutils",
          title: "خلّي الأوامر زي لينكس بالظبط",
          desc: "لو عايز نفس سلوك السيرفر، سطّب أدوات GNU. بتيجي بحرف g في الأول: gsed و gdate و gls.",
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
          ]
        },
        {
          cmd: "man بدل --help",
          title: "الشرح",
          desc: "أوامر BSD على الماك غالبًا مش بتفهم [[--help]] وهتطلعلك error. استخدم man أو tldr.",
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
          ]
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
          desc: "أداة Apple الرسمية، موجودة من macOS Monterey. بتقيس سرعة التحميل والرفع وقد إيه النت بيستجيب وهو مضغوط.",
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
          lines: ["قياس سرعة النت والاستجابة، مبني في الماك."]
        },
        {
          cmd: "ifconfig / route",
          title: "عناوينك والطريق",
          desc: "مفيش [[ip]] على الماك. [[ifconfig en0]] الواي فاي غالبًا، و [[route -n get default]] يطلع الـ gateway. و [[networksetup]] يوريك أسامي الكروت.",
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
          ]
        },
        {
          cmd: "ipconfig getifaddr",
          title: "الـ IP بتاعك",
          desc: "[[en0]] غالبًا الواي فاي. التاني بيجيبلك الـ IP العام.",
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
          lines: ["عنوانك على الواي فاي في سطر واحد.", "عنوانك العام على النت."]
        },
        {
          cmd: "flush DNS",
          title: "امسح كاش الـ DNS",
          desc: "بعد ما تغيّر DNS دومين ولسه الماك بيفتح القديم.",
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
          lines: ["امسح كاش الـ DNS وأعد تحميل خدمة الـ DNS. الاتنين لازمين، وبـ sudo."]
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
          ]
        }
      ]
    },
    {
      t: "سكربتات zsh",
      l: 3,
      n: "",
      items: [
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
          ]
        }
      ]
    }
  ]
});
