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

TAB("wsl", {
  label: "WSL",
  prompt: "you@PC:~$ ",
  lab: R`wsl --install
wsl -l -v
wsl`,
  labText: "كل ده على ويندوز 10 أو 11. أوامر wsl بتتكتب في PowerShell، والباقي جوه أوبونتو. بعد التسطيب، كل تاب bash في الصفحة دي بيشتغل هنا.",
  levels: {
    "1": ["البداية", "تسطّب أوبونتو جوه ويندوز، وتعرف فين تحط المشروع، وتشغّل VS Code عليه"],
    "2": ["المتوسط", "أوامر بين العالمين، والإعدادات، و Docker، والشبكة، و Git، والمشاكل المتكررة"]
  },
  categories: [
    {
      t: "التسطيب وأول يوم",
      l: 1,
      n: "لينكس حقيقي جوه ويندوز، وكل تاب bash في الصفحة دي بيشتغل فيه",
      items: [
        {
          cmd: "wsl --install",
          title: "أوبونتو في أمر واحد",
          desc: R`WSL (Windows Subsystem for Linux) بيشغّل لينكس حقيقي جوه ويندوز، فتشتغل بنفس الأوامر والأدوات اللي على السيرفر. [[wsl --install]] بيعمل كل حاجة في أمر واحد: يفعّل الميزة في ويندوز، وينزّل أوبونتو، ويطلب ريستارت. لازم تشغّله من PowerShell كمدير (كليك يمين، Run as administrator).

[[--list --online]] بيعرض التوزيعات المتاحة، و [[-d Ubuntu-24.04]] بيسطّب توزيعة معينة بالاسم. [[wsl --version]] بيطبع نسخة WSL. و [[wsl]] لوحدها من أي ترمنال ويندوز بتدخّلك أوبونتو.

بعد الريستارت أول فتحة بتطلب يوزر وباسورد للينكس، وده حساب منفصل عن ويندوز، والباسورد ده هو اللي [[sudo]] هيطلبه بعد كده. ومحتاج الـ virtualization مفعّل في الـ BIOS، وغالبًا بيبقى مفعّل.`,
          example: R`wsl --install
wsl --list --online
wsl --install -d Ubuntu-24.04
wsl --version
wsl`,
          try: "بعد الريستارت افتح «Ubuntu» من Start، اعمل يوزر، واكتب [[uname -a]] و [[cat /etc/os-release]].",
          deep: {
            why: "السيرفرات لينكس. Docker لينكس. السكربتات bash. لو بتشتغل على ويندوز وبتتعلم من صفحة زي دي، WSL بيديك نفس البيئة بالظبط من غير جهاز تاني ولا virtual machine تقيلة.",
            how: R`WSL 2 هو virtual machine خفيفة جدًا بتشغّل kernel لينكس حقيقي، متكاملة مع ويندوز: بتقوم في ثانية، وبتشارك الرام حسب الحاجة، وبتشوف ملفاتك.

[[wsl --install]] من PowerShell كمدير بيعمل كل حاجة: يفعّل مكونات ويندوز اللازمة، وينزّل kernel لينكس، وينزّل أوبونتو (الافتراضي)، ويطلب ريستارت.

[[--list --online]] بيعرض التوزيعات المتاحة (أوبونتو بنسخه، Debian، وغيرهم). [[-d]] بتختار واحدة. أوبونتو LTS الأنسب لأنها نفس اللي على السيرفر.

بعد الريستارت، أول فتحة بتكمّل التسطيب وتسألك يوزر وباسورد. دول ليوزر لينكس، مش مرتبطين بويندوز. الباسورد ده اللي sudo بيطلبه.

[[wsl]] لوحدها من أي ترمنال ويندوز بتدخّلك التوزيعة الافتراضية في نفس الفولدر. و Windows Terminal بيضيف تاب لأوبونتو لوحده.

محتاج ويندوز 10 (2004+) أو 11، والـ virtualization مفعّل في BIOS (غالبًا مفعّل).`,
            when: "أول حاجة على أي جهاز ويندوز للتطوير. قبل Git Bash وقبل أي حاجة تانية.",
            mistakes: "تنسى تشغّل PowerShell كمدير. وتفتكر إن يوزر ويندوز هو يوزر لينكس. و virtualization مقفول في BIOS فيطلع error غامض."
          },
          lines: [
            "فعّل WSL ونزّل أوبونتو (PowerShell كمدير).",
            "التوزيعات المتاحة.",
            "توزيعة معينة.",
            "نسخة WSL.",
            "ادخل التوزيعة الافتراضية."
          ],
          sol: R`أول ما تفتح Ubuntu هيكتب [[Installing, this may take a few minutes...]] وبعدين يطلب [[Enter new UNIX username:]] وباسورد مرتين (مش هيظهر وانت بتكتبه، وده طبيعي). اليوزر ده مالوش علاقة بحساب ويندوز، واختاره حروف صغيرة من غير مسافات. بعدها [[uname -a]] هيطبع حاجة زي [[Linux DESKTOP-ABC 6.6.87.2-microsoft-standard-WSL2 #1 SMP ... x86_64 GNU/Linux]]: الكلمة المهمة [[microsoft-standard-WSL2]]، يعني كيرنل لينكس حقيقي من مايكروسوفت. و [[cat /etc/os-release]] هيطبع [[PRETTY_NAME="Ubuntu 24.04.x LTS"]] أو نسخة أحدث حسب اللي [[wsl --install]] نزّله وقتها. رقم الكيرنل بالظبط بيتغير مع تحديثات WSL.

لو التسطيب وقف بـ [[0x80370102]] أو رسالة عن الـ virtualization، يبقى Virtualization مقفول في الـ BIOS/UEFI (اسمه Intel VT-x أو AMD SVM). ولو فتحت Ubuntu ولقيته قافل على طول من غير ما يسأل عن يوزر، اعمل الريستارت اللي طلبه التسطيب الأول.`
        },
        {
          cmd: "wsl -l -v",
          title: "النسخ والتوزيعات",
          desc: "ممكن يبقى عندك أكتر من توزيعة (أوبونتو و Debian)، وكل واحدة WSL 1 أو 2. الـ 2 هي اللي فيها kernel لينكس حقيقي و Docker، وهي الافتراضية. الأمر بيوريك الحالة والنسخة.",
          example: R`wsl -l -v
wsl --set-default Ubuntu-24.04
wsl --set-version Ubuntu-24.04 2
wsl -d Debian
wsl --status`,
          try: "اتأكد إن التوزيعة بتاعتك VERSION 2. لو 1، حوّلها.",
          deep: {
            why: "WSL 1 كان ترجمة لأوامر لينكس فوق ويندوز: سريع مع ملفات ويندوز بس مفيهوش Docker ولا systemd. WSL 2 لينكس حقيقي. لو توزيعتك على 1 حاجات كتير مش هتشتغل.",
            how: R`[[-l -v]] (list verbose) بيعرض كل التوزيعات، وحالتها (Running أو Stopped)، ونسخة WSL (1 أو 2). والنجمة جنب الافتراضية.

[[--set-default]] بتحدد اللي [[wsl]] لوحدها بتفتحها. [[--set-version اسم 2]] بيحوّل توزيعة من 1 لـ 2 (بياخد دقايق حسب حجمها). و [[-d اسم]] بيفتح توزيعة معينة.

ممكن يبقى عندك أكتر من توزيعة لأغراض مختلفة: أوبونتو للشغل، و Debian للتجارب، ونسخة بتعمل عليها اختبار مدمر وترميها. كل واحدة نظام ملفات منفصل.

[[--status]] بيقولك النسخة الافتراضية للتوزيعات الجديدة ونسخة الـ kernel. و [[--update]] بيحدّث WSL نفسه (من Microsoft Store أو الأمر).`,
            when: "بعد التسطيب تتأكد من الرقم 2. ولما تسطّب توزيعة تانية.",
            mistakes: "توزيعة قديمة على WSL 1 و Docker مش بيشتغل، وتدوّر في Docker."
          },
          lines: [
            "التوزيعات وحالتها ونسخة WSL لكل واحدة.",
            "الافتراضية.",
            "حوّل توزيعة لـ WSL 2.",
            "افتح توزيعة معينة.",
            "الإعدادات العامة ونسخة الـ kernel."
          ],
          sol: R`[[wsl -l -v]] في PowerShell هيطلع جدول زي ده، والنجمة قدام التوزيعة الافتراضية:

[[  NAME            STATE           VERSION]]
[[* Ubuntu-24.04    Running         2]]

لو [[VERSION]] طلع 1، [[wsl --set-version Ubuntu-24.04 2]] هيكتب [[Conversion in progress, this may take a few minutes.]] وبعد شوية [[The operation completed successfully.]]. الاسم لازم يبقى زي عمود NAME بالظبط، مش «Ubuntu» لو هو [[Ubuntu-24.04]]، وإلا هيقولك [[There is no distribution with the supplied name]]. و STATE ممكن يبقى [[Stopped]]، ده عادي، معناه إنها مش شغالة دلوقتي بس.`
        },
        {
          cmd: "أول دخول",
          title: "يوزر و apt والمكان",
          desc: "أول ما تفتح أوبونتو انت في [[~]] بتاع يوزر لينكس. النظام محتاج تحديث، وبعدها كل أوامر تاب bash و VPS شغالة زي ما هي. و [[sudo]] بباسورد لينكس اللي عملته.",
          example: R`whoami && pwd
sudo apt update && sudo apt upgrade -y
sudo apt install -y build-essential curl git unzip
cat /etc/wsl.conf
exit`,
          try: "نفّذ لاب تاب bash المستوى ١ هنا. هو نفس أوبونتو اللي على السيرفر.",
          deep: {
            why: "أوبونتو اللي نزل نسخة مصغّرة. محتاجة تحديث وأدوات البناء الأساسية، وإلا أول [[npm install]] لمكتبة native يفشل.",
            how: R`[[whoami && pwd]]: يوزرك و [[/home/اسمك]]. ده نظام ملفات لينكس، مش ويندوز.

[[apt update && upgrade]]: نفس السيرفر بالظبط. [[build-essential]] فيه gcc و make اللي مكتبات Node native محتاجاها (bcrypt، sharp). [[curl]] و [[git]] و [[unzip]] أساسيات.

[[/etc/wsl.conf]]: إعدادات التوزيعة دي. غالبًا فاضي أو فيه [[[boot] systemd=true]] في النسخ الجديدة.

[[exit]] بيقفل الترمنال، بس WSL نفسه بيفضل شغال في الخلفية شوية.

بعد كده: nvm و Node (تاب Node)، ومفاتيح SSH (جديدة أو انسخ اللي عندك من [[/mnt/c/Users/اسمك/.ssh]] مع [[chmod 600]])، و Git config. كل حاجة زي جهاز جديد.`,
            when: "مرة واحدة بعد التسطيب. ودي نفس خطوات تجهيز أي سيرفر، فاعتبرها تمرين.",
            mistakes: "تنسى build-essential وتستغرب إن bcrypt بيفشل. وتستخدم Node بتاع ويندوز من جوه WSL (بيشتغل بس بطيء وبيلخبط)."
          },
          lines: [
            "انت مين وفين (فولدرك في لينكس).",
            "حدّث النظام (زي السيرفر).",
            "أدوات البناء (لمكتبات Node native) والأساسيات.",
            "إعدادات التوزيعة.",
            "اخرج (WSL يفضل شغال شوية)."
          ],
          sol: R`[[whoami && pwd]] هيطبع اليوزر اللي عملته و [[/home/اسمك]]. لو [[pwd]] طلع [[/mnt/c/Users/...]] يبقى فتحت الترمنال من فولدر ويندوز (مثلًا من Explorer أو بـ [[wsl]] من PowerShell وانت في C:)، اكتب [[cd ~]] واشتغل من هنا. [[sudo apt update]] هيطلب باسورد لينكس اللي عملته، مش باسورد ويندوز.

باقي أوامر bash المستوى ١ هتطلع نفس نتايج أوبونتو على السيرفر بالظبط. الفرق الوحيد اللي هتلاحظه إن [[ls /mnt]] فيه [[c]] (ودي درايفات ويندوز)، و [[cat /etc/wsl.conf]] غالبًا فيه قسم boot وتحته [[systemd=true]] في نسخ أوبونتو الحديثة، وممكن قسم user فيه [[default=]] كمان. ولو قال [[No such file or directory]] يبقى الملف مش موجود لسه، وده عادي.`
        },
        {
          cmd: "ملفات ويندوز من لينكس",
          title: "/mnt/c والعكس",
          desc: R`ديسك C ظاهر جوه لينكس على [[/mnt/c]]، ولينكس ظاهر في ويندوز على [[\\wsl$\Ubuntu]] (أو [[\\wsl.localhost]]). و [[explorer.exe .]] بيفتح الفولدر الحالي في Explorer. الاتنين بيشوفوا بعض، بس السرعة بتفرق.`,
          example: R`ls /mnt/c/Users
cd /mnt/c/Users/you/Downloads
explorer.exe .
wslpath -u 'C:\Users\you\Desktop'
wslpath -w ~/projects`,
          try: R`افتح Explorer واكتب في شريط العنوان [[\\wsl$]]: هتلاقي توزيعتك كفولدر.`,
          deep: {
            why: "مشروع قديم في Documents، وملف نزل في Downloads، وعايز تفتح فولدر لينكس في Explorer. الاتنين محتاجين يشوفوا بعض.",
            how: R`WSL بيعمل mount لكل درايف ويندوز تحت [[/mnt]]: [[/mnt/c]] و [[/mnt/d]]. من هناك أي مسار ويندوز بمسار لينكس: [[C:\Users\you]] هو [[/mnt/c/Users/you]]. الحروف بحالتها (Users مش users).

من ناحية ويندوز، نظام ملفات لينكس متاح كـ network share: [[\\wsl$\Ubuntu-24.04\home\you]] أو [[\\wsl.localhost\...]]. تقدر تفتحه في Explorer وتسحب ملفات، وبيظهر في شريط Explorer الجانبي كـ «Linux».

[[explorer.exe .]] بيفتح الفولدر الحالي (حتى لو جوه لينكس) في Explorer. وأي [[.exe]] بيشتغل من bash.

[[wslpath]] بيحوّل المسارات: [[-u]] من ويندوز للينكس، و [[-w]] العكس. مفيد في السكربتات وفي أوامر بتاخد مسار ويندوز.

الملفات على [[/mnt/c]] بتظهر بصلاحيات 777 (كل حاجة قابلة للتشغيل) إلا لو [[metadata]] مفعّلة في wsl.conf.`,
            when: "نقل ملفات بين العالمين. فتح ناتج build في Explorer. مسار ويندوز في أمر لينكس.",
            mistakes: "تشتغل على المشروع من /mnt/c (العنصر الجاي). وتعدّل ملفات لينكس بأدوات ويندوز اللي بتغيّر line endings."
          },
          lines: [
            "يوزرز ويندوز من لينكس.",
            "Downloads بتاعك.",
            "افتح الفولدر الحالي في Explorer.",
            "حوّل مسار ويندوز لمسار لينكس.",
            "والعكس."
          ],
          sol: R`[[\\wsl$]] في شريط عنوان Explorer هيوريك فولدر لكل توزيعة زي [[Ubuntu-24.04]]، وجوه كل واحدة شجرة لينكس كاملة. ويندوز الحديث بيحوّلك لـ [[\\wsl.localhost\Ubuntu-24.04]]، وده نفس المكان باسم أحدث. وكمان في Explorer هتلاقي «Linux» في الشريط الشمال بطريق الاختصار. وفي الاتجاه التاني، [[wslpath -w ~/projects]] بيطبع [[\\wsl.localhost\Ubuntu-24.04\home\you\projects]]، و [[wslpath -u 'C:\Users\you\Desktop']] بيطبع [[/mnt/c/Users/you/Desktop]].

لو الفولدر فاضي، افتح Ubuntu مرة الأول، ويندوز القديم كان بيعرض التوزيعات الشغالة بس. ومتعدلش ملفات لينكس بأدوات ويندوز قديمة وتحفظ بـ CRLF، وادخل [[~/projects]] من Explorer للتصفح والنسخ عادي.`
        },
        {
          cmd: "فين تحط المشروع",
          title: "الأداء بيفرق ١٠ مرات",
          desc: "المشروع على [[/mnt/c]] بيشتغل، بس npm install و git status و hot reload أبطأ بكتير لأن كل ملف بيعدّي بين نظامين. المشروع جوه لينكس ([[~/projects]]) سريع زي الماك. الفرق مش تفصيلة.",
          example: R`mkdir -p ~/projects && cd ~/projects
git clone git@github.com:USER/myapp.git
cd myapp && time npm ci
cp -r /mnt/c/Users/you/old-project ~/projects/
df -h ~ /mnt/c`,
          try: "انسخ مشروع فيه node_modules من /mnt/c لـ ~/projects وقيس [[time npm run build]] في الاتنين.",
          deep: {
            why: "نفس المشروع: [[npm install]] ٢٠ ثانية في مكان و ٣ دقايق في مكان تاني. و hot reload بيشتغل أو مش بيحس بالتعديل. الفرق كله في المسار.",
            how: R`نظام ملفات لينكس جوه WSL 2 هو ملف vhdx واحد بيتقري كـ ext4 مباشرة: سريع زي أي لينكس. أما [[/mnt/c]] فبيتقري عبر بروتوكول (9P) بين الـ VM وويندوز: كل ملف بيتفتح عملية عبور بين نظامين. node_modules فيه عشرات الآلاف من الملفات، فالبطء بيتضرب فيهم.

وكمان مراقبة الملفات (inotify) اللي hot reload و nodemon بيعتمدوا عليها مش بتشتغل بشكل موثوق على /mnt/c، فالتعديل مش بيتلاحظ.

القاعدة: الكود في [[~/projects]] جوه لينكس. وتفتحه من ويندوز عبر [[\\wsl$]] لو احتجت (VS Code بيعمل ده لوحده).

[[time npm ci]] بيقيس الفرق بنفسك. و [[df -h ~ /mnt/c]] بيوريك المساحة في الاتنين (لينكس على vhdx بيكبر لحد ١ تيرا افتراضيًا (النسخ القديمة جدًا كانت ٢٥٦ أو ٥١٢ جيجا)).

المشاريع اللي كانت على ويندوز: انسخها لجوه لينكس، وامسح node_modules، وسطّب من جديد (المكتبات native متبنية لويندوز).`,
            when: "من أول مشروع. متبدأش على /mnt/c «مؤقتًا».",
            mistakes: "تنسخ node_modules مع المشروع. وتفتح المشروع من ويندوز بـ VS Code عادي (مش WSL extension) فالترمنال يبقى PowerShell."
          },
          lines: [
            "فولدر المشاريع جوه لينكس.",
            "clone هنا.",
            "قيس وقت التسطيب.",
            "انقل مشروع قديم من ويندوز لجوه (وبعدين امسح node_modules وسطّب).",
            "المساحة في الاتنين."
          ],
          sol: R`النتيجة المتوقعة إن [[time npm run build]] (و [[npm ci]] أكتر) في [[~/projects]] أسرع بشكل واضح من [[/mnt/c/...]]. الرقم بيختلف حسب الجهاز والمشروع ومضاد الفيروسات، بس فرق ٣ لـ ١٠ مرات مش غريب في المشاريع اللي فيها node_modules كبير، لأن كل ملف على [[/mnt/c]] بيعدّي على بروتوكول بين لينكس وويندوز. قارن سطر [[real]] في الاتنين.

لو الفرق طلع صغير، غالبًا المشروع صغير أو الـ build نفسه تقيل على المعالج مش على الملفات، جرّب [[npm ci]] من غير cache. وخد بالك: متنسخش node_modules من ويندوز وتشغّلها في لينكس. الحزم اللي فيها binaries (زي esbuild و sharp) متسطبة لويندوز وهتطلع errors، امسحها واعمل [[npm ci]] جوه لينكس.`
        },
        {
          cmd: "VS Code",
          title: "الكود في لينكس والمحرر في ويندوز",
          desc: "extension اسمها WSL بتخلي VS Code (على ويندوز) يشتغل كأنه جوه لينكس: الترمنال bash، والـ extensions بتتسطب جوه لينكس، والملفات من لينكس مباشرة. [[code .]] من الترمنال بيفتح الفولدر الحالي.",
          example: R`code .
code ~/projects/myapp
code --list-extensions | head
which code`,
          try: "افتح مشروع بـ [[code .]] وشوف في الركن الشمال تحت [[WSL: Ubuntu]]. الترمنال جوه VS Code بقى bash.",
          deep: {
            why: R`المحرر على ويندوز والكود جوه لينكس. من غير الـ extension، VS Code بيشوف الملفات عبر \\wsl$ ببطء، والترمنال PowerShell، والـ extensions (ESLint، Prettier) بتشتغل بـ Node ويندوز.`,
            how: R`extension «WSL» من Microsoft. بعدها [[code .]] من bash: VS Code بيفتح على ويندوز، بس بيشغّل جزء منه (VS Code Server) جوه لينكس. الواجهة على ويندوز، وكل حاجة تانية (الملفات، الترمنال، الـ extensions، الـ debugger) جوه لينكس.

الترمنال المدمج بقى bash في نفس الفولدر. الـ extensions بتتسطب في قسم «WSL: Ubuntu» منفصل عن ويندوز، فمرة تانية تسطّب ESLint هنا.

الركن الشمال تحت بيقول [[WSL: Ubuntu-24.04]] (الأخضر) لما تكون جوه. لو مش موجود، انت فاتح عادي.

[[code]] نفسه جوه WSL هو سكربت صغير بيكلّم VS Code بتاع ويندوز، عشان كده [[which code]] بيديك مسار جوه /mnt/c.

والـ debugger لـ Node بيشتغل عادي، و Git من الشريط الجانبي بيستخدم git بتاع لينكس.

نفس الفكرة للـ Remote SSH: تفتح VS Code على سيرفر بعيد بنفس الطريقة.`,
            when: "كل مشروع. [[code .]] هي الطريقة الافتراضية لفتح أي حاجة.",
            mistakes: R`تفتح المشروع من File ثم Open Folder بمسار \\wsl$ من غير الـ extension. بطيء وملخبط. دايمًا من الترمنال أو من الأخضر تحت.`
          },
          lines: [
            "افتح الفولدر الحالي في VS Code (جوه WSL).",
            "أو مسار معين.",
            "الـ extensions المسطّبة في قسم WSL.",
            "الأمر code نفسه جاي من ويندوز."
          ],
          sol: R`أول مرة [[code .]] هيطبع [[Installing VS Code Server for x64...]] وبعدين يفتح VS Code على ويندوز. تحت شمال (Remote indicator) هتلاقي زرار أخضر أو أزرق مكتوب فيه [[WSL: Ubuntu-24.04]] (بالاسم اللي في [[wsl -l]]). ولو فتحت الترمنال بـ Ctrl+$__bt (زرار الـ backtick، اللي عليه حرف «ذ» في الكيبورد العربي) هتلاقيه bash والـ prompt بتاع لينكس، و [[which code]] جوه لينكس بيطبع مسار على [[/mnt/c/.../Microsoft VS Code/bin/code]].

لو VS Code اتفتح من غير [[WSL:]] في الركن، يبقى امتداد WSL (بتاع مايكروسوفت) مش متسطب، أو فتحت الفولدر من ويندوز عن طريق [[\\wsl$]]، وساعتها الترمنال والـ extensions شغالين على ويندوز. ولو [[code]] قال command not found جوه لينكس، اقفل الترمنال وافتحه تاني، أو اتأكد إن VS Code متسطب بخيار «Add to PATH».`
        }
      ]
    },
    {
      t: "الشغل اليومي وبين العالمين",
      l: 2,
      n: "ويندوز ولينكس بيكلموا بعض: أوامر وملفات وبورتات و Docker",
      items: [
        {
          cmd: "أوامر ويندوز من لينكس",
          title: ".exe بتشتغل من bash",
          desc: "أي برنامج ويندوز بينفع يتنادي من bash بامتداده: [[notepad.exe]]، و [[clip.exe]] للكليب بورد، و [[powershell.exe -c]] لأمر PowerShell. والعكس: من PowerShell [[wsl ls -la]].",
          example: R`cat ~/.ssh/id_ed25519.pub | clip.exe
notepad.exe .env
powershell.exe -c "Get-Date"
cmd.exe /c "ipconfig | findstr IPv4"
wslview https://github.com`,
          try: "انسخ مفتاح SSH للكليب بورد بـ clip.exe والزقه في GitHub. ومن PowerShell جرّب [[wsl cat /etc/os-release]].",
          deep: {
            why: "مش كل حاجة ليها بديل لينكس: الكليب بورد، والمتصفح، وبرامج ويندوز. وأحيانًا محتاج أمر PowerShell من سكربت bash.",
            how: R`WSL بيسمح بتشغيل أي ملف .exe من bash، وبيمرر له الـ stdin/stdout. فـ [[cat file | clip.exe]] بيحط محتوى الملف في كليب بورد ويندوز، و [[notepad.exe .env]] بيفتح الملف في Notepad (بيحوّل المسار لوحده).

[[powershell.exe -c "أمر"]] بينفّذ PowerShell ويرجّع الناتج لـ bash، فتقدر تجيب معلومات ويندوز (IP الواي فاي، البطارية) في سكربت لينكس. و [[cmd.exe /c]] لأوامر CMD.

[[wslview]] (من wslu، بتيجي مع أوبونتو) بيفتح URL أو ملف بالبرنامج الافتراضي في ويندوز، زي [[open]] على الماك. و [[wslu]] فيها أدوات تانية.

العكس من PowerShell: [[wsl أمر]] بينفّذ في التوزيعة الافتراضية ويرجّع الناتج. [[wsl -d Ubuntu -u root]] بيوزر معين.

الامتداد [[.exe]] لازم يتكتب. وملفات ويندوز لازم تبقى على مسار ويندوز بيوصله (البرنامج بتاع ويندوز مش شايف /home).`,
            when: "نسخ للكليب بورد. فتح لينكات. سكربتات بتجمع الاتنين.",
            mistakes: R`[[notepad.exe ~/file]] لملف جوه لينكس: Notepad بيفتحه عبر \\wsl$ بس لو حفظت ممكن يغيّر line endings. استخدم code أو nano.`
          },
          lines: [
            "انسخ مفتاح SSH لكليب بورد ويندوز.",
            "افتح ملف في Notepad.",
            "أمر PowerShell من bash.",
            "أمر CMD من bash.",
            "افتح لينك في متصفح ويندوز."
          ],
          sol: R`[[cat ~/.ssh/id_ed25519.pub | clip.exe]] مش هيطبع حاجة، بس الكليب بورد بتاع ويندوز بقى فيه سطر يبدأ بـ [[ssh-ed25519 AAAA...]]. في GitHub: Settings ثم SSH and GPG keys ثم New SSH key، الزق واحفظ، و [[ssh -T git@github.com]] يرد [[Hi USER! You've successfully authenticated...]]. ومن PowerShell، [[wsl cat /etc/os-release]] يطبع بيانات أوبونتو جوه PowerShell.

لو [[clip.exe]] قال command not found، يبقى [[appendWindowsPath=false]] في [[wsl.conf]] أو ويندوز مش في الـ PATH، استخدم [[/mnt/c/Windows/System32/clip.exe]]. وخد بالك إن clip.exe بيتعامل مع العربي غلط أحيانًا (بيطلع رموز) لأنه مش متوقع UTF-8، فللمفاتيح والإنجليزي بس. ولو [[wslview]] مش موجود سطّبه بـ [[sudo apt install wslu]].`
        },
        {
          cmd: "إدارة WSL",
          title: "shutdown و export و import",
          desc: "WSL بيفضل شغال في الخلفية بعد ما تقفل الترمنال. [[--shutdown]] بيقفله كله (مفيد لتطبيق إعدادات أو تحرير رام). و [[--export]] بيحفظ التوزيعة كلها في ملف: باك أب كامل تنقله لجهاز تاني.",
          example: R`wsl --shutdown
wsl --terminate Ubuntu-24.04
wsl --export Ubuntu-24.04 D:\backup\ubuntu.tar
wsl --import Ubuntu-dev D:\wsl\dev D:\backup\ubuntu.tar
wsl --unregister Ubuntu-dev`,
          try: "اعمل export لتوزيعتك مرة في الشهر. لو WSL باظ، import في دقايق بدل ما تجهّز من الأول.",
          deep: {
            why: "WSL بياكل رام في الخلفية، والإعدادات مش بتتطبق غير بريستارت، وتوزيعة اتبوّظت محتاجة ترجع. والباك أب الكامل ملف واحد.",
            how: R`[[--shutdown]] بيقفل كل التوزيعات والـ VM كلها. لازم بعد تعديل .wslconfig أو wsl.conf، وبيحرر الرام اللي WSL حاجزها. وبيقفل Docker لو جواه.

[[--terminate اسم]] توزيعة واحدة.

[[--export اسم ملف.tar]]: نظام الملفات كله في tar. ده باك أب كامل: الأدوات والإعدادات والمشاريع. و [[--import اسم_جديد مسار ملف.tar]] بيعمل توزيعة جديدة منه في المسار ده. تقدر تعمل نسخة من توزيعتك تجرّب فيها حاجة مدمرة وترميها بـ [[--unregister]].

[[--unregister]] بيمسح التوزيعة نهائيًا بكل ملفاتها. مفيش سؤال.

والـ import بيخلي اليوزر الافتراضي root، فبعده حط [[[user] default=اسمك]] في wsl.conf.

الـ export مناسب كمان لنقل بيئتك لجهاز جديد: export، انسخ الملف، import.`,
            when: "shutdown بعد أي تعديل إعدادات. export شهري وقبل أي تجربة كبيرة.",
            mistakes: "--unregister على التوزيعة الغلط. مفيش رجوع غير من export."
          },
          lines: [
            "اقفل كل حاجة (بعد تعديل إعدادات، أو لتحرير الرام).",
            "اقفل توزيعة واحدة.",
            "باك أب كامل للتوزيعة في ملف.",
            "اعمل توزيعة جديدة من الباك أب في مسار معين.",
            "امسح توزيعة نهائيًا."
          ],
          sol: R`[[wsl --export Ubuntu-24.04 D:\backup\ubuntu.tar]] هيكتب [[Export in progress, this may take a few minutes.]] وبعدين [[The operation completed successfully.]]، والملف حجمه بحجم اللي جوه التوزيعة (عادي يبقى كام GB). اتأكد إن فولدر [[D:\backup]] موجود قبلها، وإلا هيفشل. ولو [[wsl --import]] اشتغل، [[wsl -l -v]] هيوريك [[Ubuntu-dev]] جنب الأصلية.

بعد import، التوزيعة الجديدة بتدخل كـ root افتراضيًا، لأن اليوزر الافتراضي مش جوه ملف الـ tar. حطه في [[/etc/wsl.conf]] (قسم user وتحته [[default=you]]) وبعدين [[wsl --terminate Ubuntu-dev]]. وخد بالك إن [[--unregister]] بيمسح التوزيعة والديسك بتاعها نهائيًا من غير سؤال.`
        },
        {
          cmd: ".wslconfig و wsl.conf",
          title: "الرام والمعالج و systemd",
          desc: R`ملفين: [[%USERPROFILE%\.wslconfig]] على ويندوز لإعدادات WSL كله (رام، معالج، شبكة). و [[/etc/wsl.conf]] جوه كل توزيعة (اليوزر الافتراضي، systemd، الـ mounts). التغيير محتاج [[wsl --shutdown]].`,
          example: R`[wsl2]
memory=6GB
processors=4
swap=2GB
networkingMode=mirrored

# /etc/wsl.conf (inside Ubuntu)
[boot]
systemd=true
[user]
default=you
[automount]
options="metadata,umask=22,fmask=11"`,
          try: "حط .wslconfig بنص رام جهازك، و [[wsl --shutdown]]، وافتح واعمل [[free -h]].",
          flag: "script",
          deep: {
            why: "WSL افتراضيًا بياخد لحد ٥٠٪ من الرام، وممكن يبقى أكتر أو أقل من اللي تحتاجه. و systemd مش مفعّل في التوزيعات القديمة، فالخدمات مش بتشتغل.",
            how: R`[[.wslconfig]] في فولدر يوزر ويندوز ([[C:\Users\اسمك\.wslconfig]]، تعمله لو مش موجود). قسم [[[wsl2]]]: [[memory]] أقصى رام، و [[processors]] عدد الأنوية، و [[swap]]. WSL بياخد اللي يحتاجه لحد الحد ده ويرجّعه (في النسخ الحديثة).

[[networkingMode=mirrored]] (ويندوز 11): WSL بياخد نفس عناوين ويندوز، فـ localhost بيشتغل في الاتجاهين وبورتات لينكس بتظهر على الشبكة مباشرة، و VPN بيشتغل أحسن.

[[/etc/wsl.conf]] جوه كل توزيعة: [[[boot] systemd=true]] لتشغيل systemd (لازم لـ Docker Engine وأي خدمة). [[[user] default]] اليوزر اللي بتدخل بيه. [[[automount] options]] بتتحكم في صلاحيات ملفات /mnt/c: [[metadata]] بتسمح بـ chmod عليهم، و [[umask]] الافتراضي.

وفيه [[[interop]]] لتعطيل تشغيل .exe لو محتاج، و [[[network]]] لـ DNS.

كل تعديل: [[wsl --shutdown]] وافتح تاني.`,
            when: ".wslconfig على أي جهاز رامه ١٦ جيجا أو أقل. systemd=true دايمًا.",
            mistakes: "memory كبيرة قوي فويندوز نفسه يتخنق. وتعدّل وتنسى shutdown."
          },
          lines: [
            "قسم إعدادات WSL 2 (في .wslconfig على ويندوز).",
            "أقصى رام.",
            "عدد الأنوية.",
            "swap.",
            "لينكس ياخد نفس عناوين ويندوز (ويندوز 11).",
            "قسم التشغيل (في wsl.conf جوه أوبونتو).",
            "شغّل systemd.",
            "قسم اليوزر.",
            "اليوزر الافتراضي.",
            "قسم الـ mounts.",
            "صلاحيات لينكس على ملفات ويندوز."
          ],
          sol: R`بعد [[wsl --shutdown]] واستنى حوالي ٨ ثواني، افتح و [[free -h]]: لو جهازك 16GB وحطيت [[memory=8GB]]، هتلاقي [[total]] في سطر Mem حوالي [[7.7Gi]] أو [[7.8Gi]] (أقل شوية من الرقم لأن الكيرنل حاجز جزء). وسطر [[Swap]] هيبقى حوالي [[2.0Gi]] من [[swap=2GB]]. من غير الملف، الافتراضي نص رام ويندوز.

لو الرقم متغيرش: الملف غالبًا اتحفظ [[.wslconfig.txt]] (فعّل «File name extensions» في Explorer تشوف)، أو مش في [[%UserProfile%]] يعني [[C:\Users\you]]، أو لسه فيه توزيعة شغالة (اتأكد بـ [[wsl --list --running]]). و [[networkingMode=mirrored]] محتاج ويندوز 11 22H2 أو أحدث، على ويندوز 10 بيتجاهله.`
        },
        {
          cmd: "Docker مع WSL",
          title: "Docker Desktop أو Engine جوه لينكس",
          desc: "طريقتين: Docker Desktop على ويندوز مع تفعيل WSL integration (أسهل، وبيديك docker في bash)، أو تسطّب Docker Engine جوه أوبونتو مباشرة زي السيرفر (أخف ومجاني للشركات). في الحالتين الأوامر واحدة.",
          example: R`docker version
docker context ls
sudo apt install -y docker.io docker-compose-v2
sudo usermod -aG docker $USER
sudo systemctl enable --now docker`,
          try: "لو Docker Desktop: Settings ثم Resources ثم WSL integration وفعّل أوبونتو. لو Engine: لازم systemd=true في wsl.conf الأول.",
          deep: {
            why: "Docker على ويندوز بيشتغل جوه WSL 2 أصلًا. السؤال بس: تديره من Docker Desktop ولا تسطّبه جوه أوبونتو زي السيرفر.",
            how: R`Docker Desktop: برنامج ويندوز بيعمل توزيعة WSL خاصة به (docker-desktop) وبيشغّل الـ daemon فيها. مع WSL integration مفعّلة، أمر [[docker]] جوه أوبونتو بيكلّم الـ daemon ده. سهل، وفيه واجهة، بس تقيل شوية ومدفوع للشركات الكبيرة.

Docker Engine جوه أوبونتو: نفس تسطيب السيرفر ([[apt install docker.io]] أو السكربت الرسمي). محتاج [[systemd=true]] عشان الـ daemon يشتغل كخدمة. أخف، ومجاني، ونفس البيئة بالظبط زي الإنتاج. من ويندوز مش هتشوف الـ containers إلا من جوه WSL (أو بـ [[wsl docker ps]]).

[[docker context ls]] بيوريك انت بتكلّم أنهي daemon.

الـ volumes و bind mounts: مسارات لينكس سريعة، ومسارات /mnt/c بطيئة (نفس مشكلة المشروع).

والبورتات: container على 3000 بيفتح من متصفح ويندوز على localhost:3000 في الحالتين.

الاختيار: Desktop لو عايز واجهة وبساطة. Engine لو عايز نفس السيرفر وخفة.`,
            when: "بعد ما تختار مكان المشروع. Engine جوه WSL هو الأقرب لتاب Docker والسيرفر.",
            mistakes: "الاتنين مع بعض فتتلخبط الـ contexts. واحد بس. و Engine من غير systemd فالـ daemon مش بيقوم."
          },
          lines: [
            "Docker شغال ومن أنهي مصدر.",
            "الـ daemons المتاحة ومين المستخدم.",
            "أو سطّب Engine جوه أوبونتو (محتاج systemd).",
            "استخدمه من غير sudo (اخرج وادخل).",
            "شغّله كخدمة."
          ],
          sol: R`مع Docker Desktop وبعد تفعيل Ubuntu في WSL integration: [[docker version]] جوه أوبونتو يطبع قسم [[Client]] وقسم [[Server: Docker Desktop ...]]، و [[docker context ls]] بيوريك context عليه نجمة. مع Engine جوه لينكس: [[Server: Docker Engine - Community]] أو نسخة أوبونتو، و [[systemctl status docker]] يقول [[active (running)]]. وفي الحالتين [[docker run hello-world]] يطبع [[Hello from Docker!]].

أشهر رسالتين: [[permission denied while trying to connect to the Docker daemon socket]] يعني انت اتضفت لجروب docker بس الجلسة قديمة، اقفل الترمنال أو [[wsl --shutdown]] وافتح تاني. و [[Cannot connect to the Docker daemon at unix:///var/run/docker.sock]] يعني الـ daemon مش شغال: Docker Desktop مقفول، أو systemd مش مفعّل فـ [[systemctl]] نفسه بيقول [[System has not been booted with systemd]]. ومتشغّلش الاتنين (Desktop و Engine) مع بعض على نفس التوزيعة.`
        },
        {
          cmd: "الشبكة والبورتات",
          title: "localhost بيشتغل من الاتجاهين",
          desc: "سيرفر على 3000 جوه WSL بيفتح من متصفح ويندوز على localhost:3000 لوحده. والعكس مع mirrored networking. بس من موبايل على نفس الواي فاي محتاج IP ويندوز والسيرفر يسمع على 0.0.0.0.",
          example: R`ip addr show eth0 | grep inet
cat /etc/resolv.conf
powershell.exe -c "(Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias Wi-Fi).IPAddress"
npm run dev -- --host 0.0.0.0
curl -s localhost:3000 | head -3`,
          try: "شغّل dev server بـ [[--host]] وافتحه من موبايلك على IP ويندوز. لو مفتحش، الفايروول بتاع ويندوز.",
          deep: {
            why: "السيرفر شغال جوه WSL وعايز تفتحه من متصفح ويندوز، ومن موبايلك، ومن Docker. كل حالة طريق مختلف.",
            how: R`WSL 2 افتراضيًا (NAT mode) ليه شبكة داخلية و IP خاص ([[ip addr show eth0]])، بس ويندوز بيعمل forwarding لـ localhost لوحده: سيرفر على 3000 جوه لينكس بيفتح من ويندوز على localhost:3000. والعكس (خدمة على ويندوز من لينكس) بيحتاج IP ويندوز أو mirrored mode.

من جهاز تاني على الشبكة (موبايل): الطلب بيوصل لـ IP ويندوز على الواي فاي (الأمر التالت بيجيبه من PowerShell). ويندوز مش بيوجّهه للينكس لوحده في NAT mode، محتاج [[netsh interface portproxy]] أو mirrored mode. ومع mirrored، لينكس بياخد IP ويندوز نفسه فبيشتغل مباشرة.

والسيرفر لازم يسمع على [[0.0.0.0]] مش localhost بس، عشان كده [[--host 0.0.0.0]] لـ Vite. وفايروول ويندوز لازم يسمح بالبورت (بيسأل أول مرة).

[[/etc/resolv.conf]] بيوريك DNS بتاع WSL، وده مصدر مشاكل مع VPN.

Docker من جوه WSL بيشوف نفس localhost.`,
            when: "اختبار من الموبايل. خدمة على ويندوز محتاجها من لينكس.",
            mistakes: "dev server على localhost بس وتحاول من الموبايل. وتنسى فايروول ويندوز."
          },
          lines: [
            "IP لينكس الداخلي.",
            "DNS بتاع WSL.",
            "IP ويندوز على الواي فاي (للموبايل).",
            "اسمع على كل الكروت مش localhost بس.",
            "جرّب من جوه."
          ],
          sol: R`Vite مع [[--host]] هيطبع سطرين: [[Local: http://localhost:5173/]] و [[Network: http://172.x.x.x:5173/]]. الـ IP ده (في NAT mode) عنوان لينكس الداخلي، والموبايل مش هيوصله. الموبايل لازم يفتح IP ويندوز على الواي فاي (زي [[192.168.1.20:5173]]) اللي بيطلع من الأمر التالت. في NAT mode ده مش هيشتغل لوحده: محتاج [[netsh interface portproxy]] من ويندوز يحوّل البورت للينكس. مع [[networkingMode=mirrored]] الـ Network URL هيبقى IP ويندوز نفسه.

وبعد كده لو لسه مبيفتحش، الفايروول: جرّب من PowerShell كمدير قاعدة inbound للبورت ده، ومع mirrored لازم كمان تسمح في Hyper-V firewall بتاع WSL. وخد بالك إن [[curl localhost:3000]] من جوه لينكس بيشتغل حتى من غير [[--host]]، فده مش دليل إن الموبايل هيوصل. الدليل الحقيقي إن السطر [[Network:]] يظهر أصلًا.`
        },
        {
          cmd: "Git و line endings",
          title: "CRLF و LF وصلاحيات الملفات",
          desc: "ويندوز بينهي السطر بـ CRLF ولينكس بـ LF. لو Git على ويندوز مضبوط بـ autocrlf، الملفات بتتغير كلها في diff. ومشروع على /mnt/c بيبان إن كل الملفات صلاحياتها اتغيرت. الحل إعدادات Git جوه WSL مستقلة.",
          example: R`git config --global core.autocrlf input
git config --global core.filemode false
git config --global credential.helper "/mnt/c/Program\ Files/Git/mingw64/bin/git-credential-manager.exe"
file src/index.js
sed -i 's/\r$//' script.sh`,
          try: "لو سكربت bash بيطلع [[bad interpreter: /bin/bash^M]] (أو في bash 5.1 وأحدث زي أوبونتو 24.04: [[cannot execute: required file not found]])، فيه CRLF. الأمر الأخير بيصلّحه.",
          deep: {
            why: "فتحت مشروع وكل الملفات modified في git status من غير ما تلمسها. أو سكربت bash بيطلع [[^M]]. الاتنين من الفرق بين ويندوز ولينكس في نهاية السطر والصلاحيات.",
            how: R`ويندوز بيكتب نهاية السطر CRLF (حرفين)، ولينكس LF (حرف). Git على ويندوز غالبًا بـ [[core.autocrlf=true]]: بيحوّل لـ CRLF عند checkout ولـ LF عند commit. لو نفس المشروع اتفتح من WSL بإعداد مختلف، كل ملف يبان متعدل.

الإعداد الصح في WSL: [[autocrlf=input]]: متحوّلش عند checkout (سيبها LF)، وحوّل أي CRLF لـ LF عند commit. والأفضل ملف [[.gitattributes]] في المشروع بـ [[* text=auto eol=lf]] يفرض ده على الكل.

[[core.filemode=false]]: على /mnt/c الصلاحيات كلها 777، فـ Git بيشوف كل ملف اتغير mode بتاعه. الإعداد ده بيتجاهل الصلاحيات. (لو المشروع جوه لينكس مش محتاجه.)

[[credential.helper]] بيخلي Git جوه WSL يستخدم Git Credential Manager بتاع ويندوز، فمش محتاج تسجّل GitHub تاني. أو استخدم SSH keys وخلاص.

[[file]] بيقولك الملف فيه CRLF ولا LF. و [[sed 's/\r$//']] بيشيل الـ CR (أو [[dos2unix]]).`,
            when: "أول ما تجهّز Git في WSL. ولما تشوف كل الملفات modified.",
            mistakes: "تعمل commit لكل الملفات «المعدلة» فتبوّظ التاريخ لكل الفريق."
          },
          lines: [
            "سيب LF عند checkout وحوّل CRLF لـ LF عند commit.",
            "تجاهل تغيير الصلاحيات (لمشاريع على /mnt/c).",
            "استخدم مدير credentials بتاع ويندوز.",
            "الملف فيه CRLF ولا LF؟",
            "شيل الـ CR من ملف."
          ],
          sol: R`[[file script.sh]] على الملف البايظ بيطبع [[Bourne-Again shell script, ASCII text executable, with CRLF line terminators]]. تشغيله بـ [[./script.sh]] بيطلع [[bad interpreter: /bin/bash^M]] في bash القديم، وفي bash 5.2 (أوبونتو 24.04) الرسالة بقت [[cannot execute: required file not found]]، ولو الـ shebang [[#!/usr/bin/env bash]] هيطلع [[/usr/bin/env: 'bash\r': No such file or directory]]. التلاتة نفس السبب: [[\r]] في آخر السطر الأول. جربنا الحالات دي كلها.

بعد [[sed -i 's/\r$//' script.sh]]، [[file]] هيطبع نفس الكلام من غير [[with CRLF line terminators]] والسكربت يشتغل. عشان ميرجعش تاني: [[core.autocrlf input]] جوه WSL، وملف [[.gitattributes]] فيه [[*.sh text eol=lf]] في الريبو عشان يحمي كل الفريق، وفي VS Code غيّر CRLF لـ LF من شريط الحالة تحت يمين.`
        },
        {
          cmd: "systemd والخدمات",
          title: "Postgres و Redis جوه WSL",
          desc: "مع [[systemd=true]] تقدر تشغّل خدمات زي السيرفر بالظبط: Postgres و Redis و Nginx بـ systemctl. من غيرها الخدمات بتتشغّل يدوي بـ service أو بتقفل مع الترمنال.",
          example: R`systemctl is-system-running
sudo apt install -y postgresql
sudo systemctl enable --now postgresql
sudo -u postgres psql -c "SELECT version();"
sudo systemctl status postgresql --no-pager | head -5`,
          try: "سطّب Postgres جوه WSL واتصل بيه من DBeaver على ويندوز على localhost:5432.",
          deep: {
            why: "Postgres للتطوير محتاج يشتغل كخدمة. من غير systemd، بتشغّله بإيدك كل مرة وبيقفل مع الترمنال.",
            how: R`systemd هو اللي بيدير الخدمات في أوبونتو (تاب VPS). في WSL القديم مكانش موجود، والخدمات كانت بـ [[service اسم start]] يدوي. من 2022، [[systemd=true]] في wsl.conf بيشغّله، وأوبونتو 24.04 على WSL بييجي بيه مفعّل.

[[systemctl is-system-running]] بيقولك running أو degraded (شغال بس خدمة فشلت) أو error لو systemd مش موجود.

بعدها كل حاجة زي السيرفر: [[apt install postgresql]] وبيشتغل، و [[enable --now]] بيخليه يقوم مع WSL، و [[status]] و [[journalctl]].

Postgres جوه WSL بيسمع على localhost، وويندوز بيشوف localhost:5432، فـ DBeaver على ويندوز بيتصل مباشرة. نفس الحاجة Redis و Nginx.

الخدمات بتقوم لما WSL يقوم (أول ما تفتح ترمنال)، وبتقف مع [[wsl --shutdown]].

وده بيخليك تتمرن على كل تاب VPS محليًا: Nginx و certbot (مش هيشتغل من غير دومين) و ufw و fail2ban.`,
            when: "قاعدة بيانات و Redis للتطوير. وتمرين على إدارة السيرفر.",
            mistakes: "Postgres جوه WSL و Postgres على ويندوز الاتنين على 5432 فيتخانقوا. واحد بس."
          },
          lines: ["systemd شغال؟", "سطّب Postgres.", "شغّله دلوقتي ومع كل مرة.", "اتأكد.", "الحالة."],
          sol: R`[[systemctl is-system-running]] يطبع [[running]] أو [[degraded]] (يعني فيه خدمة واحدة فشلت، وده شائع وعادي في WSL). لو طبع [[offline]] أو [[System has not been booted with systemd]]، فعّل [[systemd=true]] الأول. [[SELECT version();]] يطبع سطر زي [[PostgreSQL 16.x (Ubuntu 16.x-...) on x86_64-pc-linux-gnu]] على أوبونتو 24.04.

في DBeaver: Host [[localhost]] و Port [[5432]] و User [[postgres]]. أول محاولة غالبًا هتفشل بـ [[password authentication failed]]، لأن [[sudo -u postgres psql]] بيدخل بـ peer auth من غير باسورد، بس الاتصال من DBeaver بيجي على TCP ومحتاج باسورد. حطه بـ [[sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'dev'"]]. ولو [[Connection refused]] اتأكد إن مفيش Postgres تاني على ويندوز نفسه ماسك 5432.`
        },
        {
          cmd: "مشاكل شائعة",
          title: "DNS والوقت والديسك",
          desc: R`تلات مشاكل بتقابل أغلب الناس في WSL. الأولى DNS: [[apt update]] بيفشل بـ [[Temporary failure resolving]] (خصوصًا مع VPN)، لأن WSL بيكتب [[/etc/resolv.conf]] لوحده. أول سطور المثال بتضيف لـ [[/etc/wsl.conf]] قسم [[[network]]] فيه [[generateResolvConf=false]] (بطّل تكتب الملف)، و [[tee -a]] بتضيف للملف بـ sudo، و [[<<'EOF']] بتكتب السطور اللي بعدها لحد EOF. بعدين تمسح الملف القديم وتكتب DNS عام زي 1.1.1.1. جرّب [[wsl --update]] الأول، لأن النسخ الحديثة حلت معظم ده.

التانية الساعة: بعد sleep ساعة WSL ممكن تتأخر، فالتوكنات والشهادات تبان منتهية. [[hwclock -s]] بيظبطها من ساعة ويندوز. التالتة الديسك: لينكس عايش في ملف [[ext4.vhdx]] بيكبر ومش بيصغر لما تمسح. [[wsl --shutdown]] بيقفل WSL، وبعدين [[Optimize-VHD]] من PowerShell كمدير بيضغط الملف (محتاج Hyper-V، يعني ويندوز Pro)، والمسار بيختلف حسب توزيعتك.`,
          example: R`sudo tee -a /etc/wsl.conf > /dev/null <<'EOF'
[network]
generateResolvConf=false
EOF
sudo rm /etc/resolv.conf && echo "nameserver 1.1.1.1" | sudo tee /etc/resolv.conf
sudo hwclock -s
wsl --shutdown
Optimize-VHD -Path "$env:LOCALAPPDATA\Packages\CanonicalGroupLimited.Ubuntu24.04LTS_79rhkp1fndgsc\LocalState\ext4.vhdx" -Mode Full`,
          try: "لو [[apt update]] بيفشل بـ Temporary failure resolving، الحل الأول. لو الوقت غلط، [[hwclock -s]]. الأمر الأخير من PowerShell كمدير بعد shutdown.",
          deep: {
            why: "تلات مشاكل بتيجي لمعظم الناس بعد شهر: [[apt]] بيفشل فجأة، والوقت غلط، والديسك على ويندوز بيقل من غير سبب واضح.",
            how: R`DNS: WSL بيولّد [[/etc/resolv.conf]] لوحده يشاور على ويندوز كـ DNS. مع VPN أو بعض الشبكات ده بيبوظ، فتطلع «Temporary failure in name resolution». الحل: [[generateResolvConf=false]] في wsl.conf، وبعدين تكتب الملف بإيدك بـ DNS عام. الـ [[tee]] مع heredoc عشان الملف محتاج sudo. وفي WSL الحديث [[dnsTunneling=true]] في .wslconfig مفعّل افتراضيًا وبيحل معظم مشاكل الـ VPN، فجرّب [[wsl --update]] الأول قبل ما تلمس resolv.conf. و mirrored networking بيساعد كمان.

الوقت: بعد sleep/hibernate ساعة WSL ممكن تتأخر بالساعات، فـ JWT ينتهي و apt يشتكي من شهادات. [[hwclock -s]] بيمزامن من ساعة ويندوز. الحل الدائم [[wsl --shutdown]] أو تحديث WSL.

الديسك: لينكس عايش في ملف [[ext4.vhdx]] بيكبر لما تكتب ومش بيصغر لما تمسح (زي كل virtual disks). بعد مسح node_modules كتير و docker prune، الملف لسه ٤٠ جيجا. [[Optimize-VHD]] من PowerShell كمدير (بعد shutdown) بيضغطه. المسار بيختلف حسب التوزيعة: هاته من الريجستري: [[(Get-ChildItem HKCU:\Software\Microsoft\Windows\CurrentVersion\Lxss | ? { $_.GetValue("DistributionName") -eq 'Ubuntu-24.04' }).GetValue("BasePath")]] (التسطيبات الجديدة في [[%LOCALAPPDATA%\wsl]] مش Packages). و Optimize-VHD محتاج Hyper-V (ويندوز Pro بس)، وعلى Home استخدم diskpart بـ compact vdisk. لو Optimize-VHD مش موجود (Home edition)، بديله [[diskpart]] بأوامر compact vdisk.`,
            when: "DNS أول ما apt يفشل مع VPN. الوقت بعد sleep. الديسك كل كام شهر.",
            mistakes: "تعدّل resolv.conf من غير generateResolvConf=false فيتكتب فوقه في أول ريستارت. و Optimize-VHD و WSL شغال."
          },
          lines: [
            "ضيف لآخر wsl.conf (بـ sudo، و -a عشان متمسحش systemd واليوزر): متولّدش resolv.conf لوحدك.",
            "القسم.",
            "الإعداد.",
            "نهاية الكتابة.",
            "اكتب DNS عام بإيدك.",
            "زامن الساعة من ويندوز.",
            "اقفل WSL (قبل ضغط الديسك).",
            "من PowerShell كمدير: اضغط ملف الديسك بتاع أوبونتو."
          ],
          sol: R`بعد إصلاح DNS، [[apt update]] هيكمّل بسطور [[Hit:]] و [[Get:]] بدل [[Temporary failure resolving 'archive.ubuntu.com']]. اتأكد بـ [[cat /etc/resolv.conf]]: لازم يبقى [[nameserver 1.1.1.1]] ويفضل كده بعد [[wsl --shutdown]]. لو رجع اتغير، يبقى [[generateResolvConf=false]] مش متحفظ صح في [[/etc/wsl.conf]]. بس قبل كل ده جرّب [[wsl --update]]، لأن dnsTunneling في النسخ الحديثة بيحل معظمها.

الوقت: قارن [[date]] بساعة ويندوز. [[sudo hwclock -s]] في نسخ WSL كتير بيفشل بـ [[Cannot access the Hardware Clock]] لأن مفيش RTC حقيقي، وساعتها [[wsl --shutdown]] من PowerShell هو الحل المضمون. و [[Optimize-VHD]] محتاج Hyper-V PowerShell module (ويندوز Pro أو Enterprise)، وعلى Home هيقول الأمر مش معروف، استخدم [[diskpart]] بـ [[compact vdisk]]. ومسار ملف [[ext4.vhdx]] مش ثابت: التوزيعات اللي اتسطبت بـ [[wsl --install]] الحديث ممكن تبقى في [[%LOCALAPPDATA%\wsl\{GUID}]]، والمسار الصح في الريجستري [[HKCU\Software\Microsoft\Windows\CurrentVersion\Lxss]] تحت [[BasePath]].`
        }
      ]
    }
  ]
});
