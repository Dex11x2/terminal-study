// تكملة تاب os: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/os/01.js (شرح حقول الدرس في أوله)
MORE("os", [
    {
      t: "أوبونتو: أدوات النظام",
      l: 2,
      n: "مدير المهام والإعدادات والديسكات في أوبونتو، من الواجهة ومن الترمنال",
      items: [
        {
          cmd: "gnome-system-monitor",
          title: "مدير المهام بتاع أوبونتو",
          desc: R`System Monitor هو Task Manager أوبونتو. افتحه من Super واكتب «monitor»، أو من الترمنال [[gnome-system-monitor]]. تاب Processes فيه كل العمليات، و Ctrl+F يدوّر، وكليك يمين ← Kill.

و Resources فيها رسم للبروسيسور والرامات والشبكة، و File Systems بتوريك المساحة الفاضية في كل هارد.`,
          example: R`Super → "monitor"               open System Monitor
Processes → Ctrl+F → "node"      find node processes
Right-click → End / Kill         End asks nicely, Kill forces
Resources                        CPU, memory, network graphs
File Systems                     free disk space`,
          try: "شغّل [[sleep 999]] في الترمنال، ولاقيه في System Monitor واقفله بـ End، وشوف الترمنال رجع.",
          flag: "keys",
          deep: {
            why: "برنامج علّق، أو node فضل شغال في الخلفية وماسك بورت، أو الجهاز بطيء وعايز تعرف مين السبب.",
            how: R`End بيبعت SIGTERM (البرنامج يقفل نفسه بنظام)، و Kill بيبعت SIGKILL (يتقفل فورًا). جرّب End الأول. نفس الفرق بين [[kill]] و [[kill -9]] في تاب bash.

من الترمنال فيه [[top]] و [[htop]] بيعرضوا نفس المعلومات.`,
            when: "برنامج مش بيرد. الرامات مليانة. عايز تعرف مين واكل البروسيسور.",
            mistakes: "جاي من ويندوز وبتدوس Ctrl+Alt+Delete فتطلعلك نافذة Power Off. لو عايز اختصار زي ويندوز، اعمل custom shortcut: Ctrl+Shift+Esc يشغّل [[gnome-system-monitor]] (في المستوى التالت)."
          },
          sol: R`[[sleep 999]] هيفضل الترمنال واقف من غير prompt. في System Monitor تاب Processes، Ctrl+F واكتب [[sleep]]، هتلاقي عملية اسمها sleep. كليك يمين ثم End، وهيسألك تأكيد. الترمنال هيطبع [[Terminated]] والـ prompt يرجع.

الفرق: End بيبعت SIGTERM (العملية بتقدر تقفل بشياكة)، و Kill بيبعت SIGKILL (بتموت فورًا) والترمنال هيطبع [[Killed]] بدل Terminated. ولو sleep مظهرش، شوف إن View فوق على «All Processes» أو «My Processes» مش «Active Processes»، لأن sleep مش بيستهلك CPU فمش بيتحسب active.`
        },
        {
          cmd: "Alt+F2",
          title: "شغّل أمر بسرعة من غير ما تفتح ترمنال",
          desc: R`Alt+F2 بيفتح خانة صغيرة تكتب فيها أمر وتدوس Enter، زي Win+R في ويندوز. [[code ~/projects/myapp]] يفتح المشروع، و [[nautilus ~/.config]] يفتح الفولدر، و [[gnome-terminal]] يفتح ترمنال.

الفرق عن الترمنال إنه مش بيعرض أي output، فهو لتشغيل برامج بس.`,
          example: R`Alt+F2 → gnome-terminal               open a terminal
Alt+F2 → code ~/projects/myapp        open a project in VS Code
Alt+F2 → nautilus ~/.config           open a folder in Files
Alt+F2 → gnome-system-monitor         task manager
Up / Down                             previous commands`,
          try: "افتح Alt+F2 واكتب [[nautilus ~/.ssh]] وشوف Files فتح على الفولدر المخفي.",
          flag: "keys",
          deep: {
            why: "عايز تفتح برنامج بمسار معين أو باختيارات، والبحث في Super مش بيفهم arguments.",
            how: R`الخانة بتشغّل الأمر كأنه من الترمنال بس من غير ما تعرضلك حاجة، وبتفتكر الأوامر اللي فاتت.

فيه أوامر خاصة بـ GNOME نفسه هنا، أشهرها [[r]] اللي كان بيعمل restart للواجهة. ده بيشتغل على X11 بس، وأوبونتو 24.04 افتراضيًا على Wayland، فالبديل هو Log Out وتدخل تاني.`,
            when: "فتح مشروع أو فولدر بمسار مباشر، أو برنامج مش ظاهر في قايمة البرامج.",
            mistakes: "تكتب أمر محتاج [[sudo]] أو أمر بيطبع نتيجة ([[ls]]، [[npm install]]) وتستنى، مفيش حاجة هتظهر. الأوامر دي مكانها الترمنال."
          },
          sol: R`Alt+F2 هيفتح خانة صغيرة في نص الشاشة «Enter a Command». [[nautilus ~/.ssh]] و Enter يفتح Files على الفولدر المخفي مباشرة، حتى لو إخفاء الملفات المخفية شغال، لأنك طلبت المسار بالاسم.

لو قال «No such file or directory»، يبقى [[~/.ssh]] مش موجود لسه. ولو Alt+F2 مش بيفتح حاجة، فيه احتمالين: انت على Wayland مع إضافة واخدة الاختصار، أو اللابتوب بيعتبر F2 زرار وظيفة (زي السطوع)، جرّب Alt+Fn+F2.`
        },
        {
          cmd: "gnome-control-center",
          title: "افتح صفحة إعدادات بعينها في أوبونتو من الترمنال",
          desc: R`[[gnome-control-center]] هو برنامج Settings. لو اديته اسم صفحة، بيفتحها على طول: الشبكة، الكيبورد، الشاشة. زي [[ms-settings:]] في ويندوز.

مفيد في السكربتات وفي الشرح: بدل «ادخل Settings وبعدين دوّر على ...»، سطر واحد.`,
          example: R`gnome-control-center
gnome-control-center network
gnome-control-center keyboard
gnome-control-center display
gnome-control-center --list`,
          try: "افتح صفحة الكيبورد من الترمنال، وبعدين اعرض كل أسماء الصفحات بـ [[--list]].",
          deep: {
            why: "توصل لصفحة إعدادات بسرعة، أو تكتبها في README لزميل بيجهز جهازه.",
            how: R`كل صفحة في Settings اسمها panel وليها اسم قصير. [[--list]] بيطبعهم كلهم. البرنامج بيفضل مفتوح والترمنال بيستناه، فلو عايز ترجع للترمنال على طول ضيف [[&]] في الآخر.`,
            when: "تظبيط شبكة أو شاشة أو اختصارات بسرعة.",
            mistakes: "تشغّله جوه SSH أو على سيرفر من غير واجهة: مش هيشتغل، هو برنامج رسومي. وأسماء بعض الصفحات بتتغير بين إصدارات GNOME، فـ [[--list]] هو المرجع."
          },
          lines: [
            "افتح Settings على آخر صفحة كنت فيها.",
            "افتح صفحة الشبكة (Wi-Fi و Ethernet و VPN و proxy).",
            "افتح صفحة الكيبورد، ومنها الاختصارات.",
            "افتح صفحة الشاشات والدقة والتكبير.",
            "اعرض أسماء كل الصفحات اللي ينفع تفتحها."
          ],
          sol: R`[[gnome-control-center keyboard]] هيفتح Settings على صفحة Keyboard على طول. و [[gnome-control-center --list]] هيطبع في الترمنال «Available panels:» وتحتها أسامي زي [[background]] و [[bluetooth]] و [[display]] و [[keyboard]] و [[network]] و [[wifi]] و [[sound]] و [[ubuntu]] وغيرهم. الأسامي دي اللي تحطها بعد الأمر.

لو كتبت اسم غلط، هيفتح Settings عادي على آخر صفحة كنت فيها أو يطبع warning. الأسامي بتتغير بين نسخ GNOME، فـ [[--list]] هو المرجع مش أي لستة على النت. ولو طلع «command not found» يبقى انت مش على GNOME (زي Kubuntu).`
        },
        {
          cmd: "gnome-disks",
          title: "شوف الهاردات وجهّز فلاشة في أوبونتو",
          desc: R`برنامج Disks (من الترمنال [[gnome-disks]]) بيعرض كل الهاردات والفلاشات والـ partitions بشكل مرئي. منه تعمل format لفلاشة، أو تكتب ملف ISO عليها (Restore Disk Image) عشان تبقى bootable، أو تشوف صحة الهارد (SMART).

زي [[lsblk]] و [[df -h]] في الترمنال، بس بالصور، وأسهل تشوف أنهي جهاز هو أنهي.`,
          example: R`Super → "disks"                         open Disks
Left list → pick the USB stick (check the size!)
⋮ → Format Disk                         wipe the whole stick
⋮ → Restore Disk Image → ubuntu.iso     make a bootable USB
⋮ → SMART Data & Self-Tests             disk health`,
          try: "افتح Disks وشوف الهارد الأساسي والـ partitions بتاعته واقرا SMART Data، من غير ما تدوس أي زرار تاني.",
          flag: "keys danger",
          deep: {
            why: "تعمل فلاشة تسطيب لأوبونتو أو لسيرفر، أو تتأكد إن الهارد مش بيموت قبل ما تخسر شغلك.",
            how: R`كل جهاز تخزين بيظهر بالحجم والاسم، وتحته الـ partitions. Restore Disk Image بيكتب ملف الـ ISO على الجهاز كله بايت بايت، وده بيمسح اللي كان عليه.

SMART بيقرا معلومات الهارد عن نفسه (ساعات الشغل، القطاعات البايظة). لو قال «Disk is likely to fail soon» خد backup النهارده.`,
            when: "فلاشة bootable، فورمات فلاشة، فحص هارد بطيء أو بيعمل أصوات.",
            mistakes: "تختار الهارد الغلط وتعمل Format أو Restore عليه، فتمسح النظام أو الداتا بتاعتك. قبل أي زرار: اتأكد من الحجم والاسم، وشيل أي هارد خارجي مش محتاجه. مفيش Undo."
          },
          sol: R`في Disks الشمال فيه لستة بالهاردات، اختار الأساسي (غالبًا NVMe أو SSD بحجمه). اليمين هيعرض الـ partitions كشريط ملوّن: غالبًا partition صغير لـ EFI (حوالي 1 GB أو أقل، FAT) وواحد كبير ext4 لأوبونتو، ولو dual boot هتلاقي NTFS لويندوز. من ⋮ ثم SMART Data & Self-Tests هتلاقي «Overall Assessment: Disk is OK» والحرارة وعدد ساعات التشغيل.

لو SMART متاح بلون رمادي، ده شائع مع NVMe في نسخ gnome-disks القديمة أو جوه VM. جرّب [[sudo smartctl -a /dev/nvme0]] (من حزمة smartmontools). وما تدوسش Format ولا Delete partition في التجربة دي.`
        }
      ]
    },
    {
      t: "الماك: أدوات النظام",
      l: 2,
      n: "مدير المهام واللوجات والباسوردات والصلاحيات على الماك",
      items: [
        {
          cmd: "Activity Monitor",
          title: "مدير المهام بتاع الماك",
          desc: R`Activity Monitor (من Spotlight) بيعرض كل العمليات، حتى اللي من غير واجهة زي [[node]] و [[com.docker.backend]]. اكتب في خانة البحث فوق، حدد العملية، ودوس زرار X ← Quit أو Force Quit.

تاب Memory مهم: الرسم اللي تحت اسمه Memory Pressure، لو أصفر أو أحمر يبقى الرامات مش مكفية فعلًا، مش مجرد «مستخدمة».`,
          example: R`Cmd+Space → "activity"          open Activity Monitor
Search box → "node"             find node processes
Select → X button → Quit / Force Quit
Memory tab → Memory Pressure    green = fine, red = really short on RAM
View → All Processes            include system processes
Double-click a process → Open Files and Ports`,
          try: "شغّل dev server، ولاقي عملية node في Activity Monitor، ودبل كليك عليها ← Open Files and Ports وشوف البورت بتاعها.",
          flag: "keys",
          deep: {
            why: "الماك سخن والمروحة شغالة، أو node فضل شغال بعد ما قفلت الترمنال، أو Docker واكل الرامات.",
            how: R`Quit بيطلب من العملية تقفل بنظام، و Force Quit بيقفلها فورًا. «Open Files and Ports» بيقولك الملفات المفتوحة والبورتات، زي [[lsof]] بالظبط.

الماك بيستخدم الرامات الفاضية كاش، فرقم «Memory Used» العالي طبيعي. Memory Pressure هو المقياس الحقيقي. من الترمنال: [[top -o mem]] و [[lsof -i]] متشرحين في تاب zsh.`,
            when: "الجهاز بطيء. بورت مشغول. عايز تعرف Docker أو Chrome واخدين كام.",
            mistakes: "تقفل عمليات سيستم (زي WindowServer أو kernel_task) عشان عالية. kernel_task بيعلى عمدًا لما الجهاز سخن عشان يبرّده، وقفل WindowServer بيعملك log out."
          },
          sol: R`اكتب [[node]] في خانة البحث، هتلاقي عملية أو أكتر. دبل كليك على اللي بتاعة السيرفر ثم تاب «Open Files and Ports»: دوّر على سطر فيه [[TCP]] و [[LISTEN]]، زي [[TCP *:3000 (LISTEN)]] أو [[TCP localhost:5173 (LISTEN)]]. ده البورت.

لو فيه كذا عملية node، واحدة بس فيها LISTEN، الباقي ممكن يبقوا VS Code أو أدوات تانية. وفي الترمنال نفس المعلومة بـ [[lsof -iTCP -sTCP:LISTEN -n -P | grep node]].`
        },
        {
          cmd: "Console",
          title: "اقرا لوجات الماك وتقارير الكراش",
          desc: R`برنامج Console (من Spotlight) فيه لوجات النظام وتقارير الكراش. برنامجك أو برنامج Electron وقع؟ ادخل Crash Reports على الشمال ولاقي اسمه، وهتلاقي فيه آخر حاجة كان بيعملها.

وللوجات لايف: دوس Start، واكتب اسم البرنامج في البحث عشان تفلتر.`,
          example: R`Cmd+Space → "console"            open Console
Sidebar → Crash Reports          one file per crash, newest first
Sidebar → your Mac → Start       live log stream
Search → process:myapp           filter to one app
Terminal: log stream --predicate 'process == "myapp"'   same thing in the terminal`,
          try: "افتح Console ← Crash Reports وشوف لو فيه أي برنامج وقع قبل كده عندك، وافتح التقرير واقرا أول كام سطر.",
          flag: "keys",
          deep: {
            why: "برنامج بيقفل فجأة من غير رسالة، أو خدمة مش راضية تشتغل، ومحتاج تعرف السبب.",
            how: R`تقرير الكراش فيه اسم البرنامج ونسخته، والـ thread اللي وقع، وسبب الإيقاف (Exception Type). لو برنامجك native أو Electron، السطور دي بتوديك للمكان.

اللوج اللايف زحمة جدًا، عشان كده الفلترة مهمة. [[log stream]] و [[log show --last 1h]] في الترمنال بيعملوا نفس الحاجة وسهل تحفظ النتيجة في ملف.`,
            when: "تطبيق desktop بتطوّره بيقع. برنامج مش راضي يفتح. مشكلة صلاحيات بتظهر في اللوج.",
            mistakes: "تقرا اللوج اللايف من غير فلتر وتتوه في آلاف السطور. فلتر على اسم البرنامج، وشغّل Start قبل ما تعمل الخطوة اللي بتجيب المشكلة بثواني."
          },
          sol: R`في Console الشمال ثم Crash Reports، هتلاقي لستة ملفات بأسامي زي [[Code-2026-09-20-101522.ips]] (اسم البرنامج والتاريخ). افتح واحد: أول سطور فيها [[Process:]] و [[Version:]] و [[Date/Time:]]، وبعدين [[Exception Type:]] زي [[EXC_BAD_ACCESS (SIGSEGV)]] أو [[EXC_CRASH (SIGABRT)]]، ودي بتقولك البرنامج مات إزاي.

لو اللستة فاضية، ده كويس، مش غلطة. التقارير بتتمسح لوحدها بعد مدة. ولو ملقتش Crash Reports في الشمال، في النسخ الحديثة ممكن تلاقيها تحت Reports، وكمان في Terminal [[ls ~/Library/Logs/DiagnosticReports]].`
        },
        {
          cmd: "Keychain Access",
          title: "امسح باسورد git القديم المتخزن على الماك",
          desc: R`الماك بيخزّن الباسوردات والتوكنز في الـ Keychain، ومنهم توكن GitHub اللي git بيستخدمه. غيّرت التوكن و git لسه بيبعت القديم ويقولك Authentication failed؟ افتح Keychain Access، دوّر على [[github.com]]، وامسح الـ entry اللي نوعها internet password.

المرة الجاية git هيسألك وتدخّل التوكن الجديد. وفي الإصدارات الحديثة البرنامج اتشال من فولدر Utilities، بس Spotlight بيلاقيه.`,
          example: R`Cmd+Space → "keychain access"      open it (Utilities folder in older macOS)
Search → github.com                  find the stored credential
Kind: internet password → Delete     git will ask for the new token
Certificates                         local CAs (e.g. from mkcert) live here
Passwords app                        website and Wi-Fi passwords (newer macOS)`,
          try: "افتح Keychain Access ودوّر على [[github.com]] وشوف إذا فيه credential متخزن، من غير ما تمسح حاجة.",
          flag: "keys",
          deep: {
            why: "git على الماك بيستخدم [[credential-osxkeychain]] عشان ميسألكش كل مرة. لما التوكن يتغير أو يخلص، الـ Keychain بيفضل ماسك القديم.",
            how: R`الـ Keychain قاعدة بيانات مشفرة بباسورد الماك. البرامج بتحفظ فيها وبتطلب إذن تقرا منها. من macOS Sequoia الباسوردات العادية بقت في برنامج Passwords، و Keychain Access فضل للحاجات المتقدمة زي الشهادات.

من الترمنال بنفس المعنى: [[git credential-osxkeychain erase]]، أو أمر [[security]] للسكربتات.

الشهادات المحلية (زي اللي [[mkcert]] بيعملها عشان https://localhost) بتتضاف هنا وبتتعلّم Trusted.`,
            when: "git أو npm بيرفضوا الدخول بعد تغيير توكن. شهادة محلية مش متوثق فيها.",
            mistakes: "تمسح entries مش عارفها، أو تعمل Reset للـ keychain كله، فتضيع باسوردات Wi-Fi والبرامج. امسح الـ entry بتاعة الموقع اللي انت عارفه بس."
          },
          sol: R`دوّر على [[github.com]] في خانة البحث فوق يمين. لو git حفظ باسورد أو token، هتلاقي سطر Kind بتاعه «internet password» واسمه [[github.com]] وفي Account اسم حسابك. دبل كليك عليه يعرض التفاصيل (الباسورد نفسه مخفي ومحتاج باسورد الماك عشان يظهر).

لو مفيش ولا سطر، يبقى git بيستخدم SSH مش HTTPS، أو الـ credential helper مش osxkeychain (اعرف بـ [[git config --get credential.helper]]). في macOS 15 وأحدث Keychain Access مبقاش في Utilities، بس Spotlight لسه بيلاقيه، والباسوردات العادية بقت في تطبيق Passwords.`
        },
        {
          cmd: "Full Disk Access",
          title: "الترمنال بيقول Operation not permitted على الماك",
          desc: R`الماك بيحمي فولدرات معينة (Desktop و Documents و Downloads و Mail وغيرهم) حتى من الترمنال. أمر أو سكربت بيقولك [[Operation not permitted]] مع إن الصلاحيات سليمة؟ ادي الترمنال صلاحية.

System Settings ← Privacy & Security ← Full Disk Access ← + ← اختار Terminal أو iTerm2 أو VS Code. واقفل البرنامج وافتحه.`,
          example: R`System Settings → Privacy & Security → Full Disk Access → +
Add Terminal / iTerm2 / VS Code → quit and reopen it
Privacy & Security → Files and Folders   per-folder permissions
Privacy & Security → Accessibility       window tools, automation
Privacy & Security → "Open Anyway"        an app blocked on first launch`,
          try: "افتح Privacy & Security ← Full Disk Access وشوف إيه البرامج اللي عندها الصلاحية دي دلوقتي. لو فيه حاجة مش عارفها، اقفلها.",
          flag: "keys",
          deep: {
            why: "سكربت backup، أو cron، أو أداة بتقرا ملفات في ~/Library، بتفشل على الماك بس، ورسالة الخطأ مش بتقول السبب الحقيقي.",
            how: R`نظام الحماية ده اسمه TCC. الصلاحية بتتدي للبرنامج اللي فاتح الشيل (Terminal نفسه)، وكل أمر بيشتغل جواه بياخدها. عشان كده بتدّيها لـ iTerm2 مش لـ zsh.

Files and Folders أدق: صلاحية لفولدر بعينه (Desktop مثلًا) بدل كل الهارد. و «Open Anyway» بيظهر تحت بعد ما تحاول تفتح برنامج نزلته من النت والماك منعه.`,
            when: "Operation not permitted من غير سبب واضح. برنامج نزلته من GitHub مش راضي يفتح.",
            mistakes: "تدي Full Disk Access لأي برنامج يطلبها. ده بيخليه يقرا الإيميل والرسايل وكل حاجة. ادّيها للترمنال اللي بتستخدمه بس، وشيلها من أي برنامج مبقتش تستخدمه."
          },
          sol: R`في System Settings ثم Privacy & Security ثم Full Disk Access هتلاقي لستة برامج قدام كل واحد مفتاح on/off. الطبيعي تلاقي حاجات زي Terminal أو iTerm أو VS Code لو انت ضفتهم، وبرامج backup أو antivirus. أي برنامج مش فاكره أو اتمسح من الجهاز اقفله أو امسحه بـ [[-]].

لو اللستة فاضية، ده طبيعي على ماك جديد. ولو قفلت الصلاحية عن Terminal، هتلاقي أوامر زي [[ls ~/Library/Mail]] بتطلع [[Operation not permitted]]. ده بالظبط الـ error اللي الدرس بيشرحه. وبعد أي تغيير لازم تقفل البرنامج بـ Cmd+Q وتفتحه، مش تقفل النافذة بس.`
        }
      ]
    },
    {
      t: "ويندوز: مسارات وحيل",
      l: 3,
      n: "أدوات إضافية من مايكروسوفت، ووضع المطوّر، وهارد مخصص للمشاريع",
      items: [
        {
          cmd: "PowerToys",
          title: "أدوات مايكروسوفت الإضافية للمبرمجين على ويندوز",
          desc: R`PowerToys برنامج مجاني من مايكروسوفت (مش جزء من ويندوز، بيتسطب لوحده) فيه أدوات صغيرة مفيدة جدًا: Command Palette يفتح أي حاجة بـ Win+Alt+Space، و File Locksmith يقولك مين ماسك ملف، و Keyboard Manager يغيّر أي زرار (Caps Lock يبقى Esc مثلًا).

وفيه كمان محرر لملف hosts ومحرر لمتغيرات البيئة أسهل من النافذة القديمة، و Text Extractor ينسخ نص من أي حتة في الشاشة حتى لو صورة.`,
          example: R`winget install Microsoft.PowerToys   install it (winget is in the PowerShell tab)
Win+Alt+Space        Command Palette: apps, files, calc, settings
Right-click a file → Unlock with File Locksmith   who is locking it
Keyboard Manager     remap keys (Caps Lock → Esc / Ctrl)
FancyZones           custom window layouts (Win+Shift+(key above Tab) to edit)
Win+Shift+T          Text Extractor: copy text from anything on screen
Hosts File Editor / Environment Variables   friendlier editors`,
          try: "سطّب PowerToys بـ winget، وجرّب File Locksmith على فولدر [[node_modules]] وانت فاتح dev server، وشوف node.exe ظاهر.",
          flag: "keys",
          deep: {
            why: "حاجات بتحتاجها كل يوم ومش موجودة في ويندوز بشكل مريح: مين ماسك الملف، تغيير زراير، ترتيب شبابيك مخصص.",
            how: R`كل أداة ليها زرار تشغيل وإيقاف في إعدادات PowerToys، فشغّل اللي محتاجه بس. Command Palette هو الجيل الجديد من PowerToys Run القديم (اللي كان على Alt+Space)، وممكن تلاقي الاتنين في الإعدادات.

Text Extractor مفيد لما يطلعلك error في نافذة مش بتسمح بالنسخ، أو كود في فيديو. File Locksmith بيعمل نفس اللي [[resmon]] بيعمله في كليك واحد.`,
            when: "أول ما تجهز جهاز ويندوز للتطوير.",
            mistakes: "تغيّر زراير بـ Keyboard Manager وتنسى، وبعدين تستغرب ليه زرار بيعمل حاجة تانية. والتغيير بيشتغل بس وPowerToys شغال. ومتسطبهوش من أي موقع غير GitHub الرسمي أو winget أو Microsoft Store."
          },
          sol: R`[[winget install Microsoft.PowerToys]] هيطبع [[Found PowerToys [Microsoft.PowerToys] Version ...]] وبعدين تحميل وأخيرًا [[Successfully installed]]. شغّل dev server، وكليك يمين على فولدر [[node_modules]] ثم «Unlock with File Locksmith» (في ويندوز 11 ممكن تحت Show more options). هتلاقي [[node.exe]] مع الـ PID بتاعه وعدد الملفات اللي ماسكها، وزرار End task.

لو File Locksmith قال إن مفيش حاجة ماسكة الفولدر، جرّب على فولدر المشروع كله بدل node_modules، لأن السيرفر بعد ما يقوم ممكن ميبقاش فاتح ملفات من node_modules. ولو العملية مش بتاعتك (أدمن)، دوس «Restart as administrator» جوه الأداة. ولو winget نفسه مش موجود، سطّب «App Installer» من Store.`
        },
        {
          cmd: "ms-settings:developers",
          title: "فعّل وضع المطوّر في ويندوز",
          desc: R`صفحة For developers فيها إعدادات معمولة للمبرمجين: Developer Mode بيخليك تعمل symlinks من غير أدمن (ريبوهات فيها symlinks بتتنسخ صح)، و End task بيضيف «End task» لكليك يمين على أي برنامج في الـ taskbar.

وفيها كمان مفاتيح Explorer (إظهار الامتدادات والملفات المخفية) وسماح لسكربتات PowerShell المحلية. في الإصدارات الأحدث الصفحة دي اتنقلت لـ System ← Advanced.`,
          example: R`Win+R → ms-settings:developers        (newer builds: System → Advanced)
Developer Mode → On                   symlinks without admin
End task → On                         right-click a taskbar app → End task
File Explorer → show extensions / hidden files / full path in title bar
PowerShell → allow local scripts      same as ExecutionPolicy RemoteSigned
mklink /D shared C:\code\shared-lib   (CMD) a folder symlink, no admin needed now`,
          try: "فعّل End task، وافتح Notepad، وكليك يمين على أيقونته في الـ taskbar ← End task.",
          flag: "keys",
          deep: {
            why: "ريبوهات فيها symlinks بتتنسخ على ويندوز كملفات نصية صغيرة وتبوظ الـ build. وبرنامج بيعلّق ومحتاج تقفله من غير ما تفتح Task Manager.",
            how: R`عمل symlink في ويندوز كان محتاج أدمن. Developer Mode بيشيل الشرط ده. Git for Windows كمان محتاج [[git config --global core.symlinks true]] (وتعمل clone من جديد) عشان يعمل symlinks حقيقية.

مفتاح PowerShell في الصفحة بيغيّر نفس الـ ExecutionPolicy اللي متشرحة في تاب PowerShell.`,
            when: "أول ما تجهز جهاز للتطوير. أو ريبو فيه symlinks (monorepos كتير كده).",
            mistakes: "Developer Mode بيسمح كمان بتسطيب تطبيقات من برّه الـ Store (sideloading). ده مش مشكلة لوحده، بس متسطبش أي حاجة من مصدر مش واثق فيه بحجة إن الوضع مفعّل."
          },
          sol: R`بعد ما تفعّل End task من صفحة For developers (أو System ثم Advanced في النسخ الأحدث): افتح Notepad، كليك يمين على أيقونته في الـ taskbar، هتلاقي «End task» تحت في القايمة جنب «Close window». دوسه هيقفل Notepad على طول، ولو فيه كلام مش متحفظ مش هيسألك.

لو «End task» مش ظاهر في القايمة، يبقى نسختك من ويندوز 11 أقدم من 23H2 (فيها الخيار ده متاح بعد تحديث) أو الإعداد مش متحفظ. ودي بتقفل العملية كلها مش النافذة بس، فلو عندك ٣ نوافذ Notepad (في Notepad الجديد اللي بالتابات) هيقفلهم كلهم.`
        },
        {
          cmd: "Dev Drive",
          title: "هارد مخصص للمشاريع يخلي npm install أسرع",
          desc: R`Dev Drive ميزة في ويندوز 11 (كل النسخ، حتى Home): partition أو هارد وهمي بنظام ملفات ReFS، معمول للمشاريع والكاش. أسرع في الشغل اللي فيه آلاف الملفات الصغيرة زي [[npm install]] والـ builds، لأن Defender بيفحصه بطريقة أخف (performance mode).

بيتعمل من Settings ← System ← Storage ← Advanced storage settings ← Disks & volumes ← Create dev drive. أقل حجم ٥٠ جيجا.`,
          example: R`Win+R → ms-settings:disksandvolumes → Create dev drive
Create new VHD → VHDX, Dynamically expanding, 50 GB+
D:\code\myapp                          put repos here
setx /M npm_config_cache D:\packages\npm   (admin) move npm's cache there too
fsutil devdrv query D:                 (admin) check it is "trusted"`,
          try: "افتح [[ms-settings:disksandvolumes]] وشوف هل عندك مساحة فاضية كفاية وهل الاختيار ظاهر، من غير ما تكمّل.",
          flag: "keys",
          deep: {
            why: "[[npm install]] و builds على ويندوز أبطأ بشكل ملحوظ من لينكس والماك، وجزء كبير من ده فحص الـ antivirus لكل ملف صغير.",
            how: R`اختيار VHD بيعمل ملف واحد على الهارد بيتعامل كهارد منفصل، ومش بيمس الـ partitions الموجودة، وده الأأمن. «Dynamically expanding» يعني الملف بيكبر مع الاستخدام مش ياخد الـ ٥٠ جيجا من الأول.

Defender بيفضل شغال على الـ Dev Drive، بس في performance mode: بيفحص بعد ما الملف يتفتح بدل ما يوقفه. ده أأمن من إنك تعمل exclusion لفولدر المشاريع في Defender.

بعد [[setx]] لازم تقفل كل الترمنالات وتفتحها.`,
            when: "مشاريع JavaScript أو .NET أو Java كبيرة على ويندوز مش على WSL.",
            mistakes: "تحط البرامج نفسها (Node، VS Code) على الـ Dev Drive، ده مش مقصود ليها، البرامج تفضل على C. ولو مشروعك جوه WSL مش هتستفيد، WSL ليه هارده الخاص. واختيار «Resize an existing volume» بيلعب في الـ partitions، خد backup قبله أو استخدم VHD."
          },
          sol: R`[[ms-settings:disksandvolumes]] هيفتح Disks & volumes. لو نسختك بتدعم Dev Drive (ويندوز 11 22H2 بتحديث 2023 أو أحدث)، هتلاقي زرار «Create dev drive» فوق. دوسه يوريك الخيارات (VHD جديد، أو تصغير partition، أو مساحة فاضية) من غير ما تتنفذ حاجة. وجنب كل درايف المساحة الفاضية، ومحتاج 50 GB على الأقل فاضيين.

لو الزرار مش موجود، يبقى ويندوز أقدم من المطلوب أو ويندوز 10، حدّثه. وخد بالك: Dev Drive بيتفرمت ReFS وبيفرق في npm install مع Defender في وضع «performance mode». الفرق الحقيقي بيتقاس، مش مضمون نفس الرقم في كل جهاز.`
        }
      ]
    },
    {
      t: "ويندوز: شكّل Windows Terminal",
      l: 3,
      n: "خط فيه أيقونات، وملف الإعدادات، وترمنال بينزل من فوق الشاشة بزرار واحد",
      items: [
        {
          cmd: "Nerd Font",
          title: "خط فيه أيقونات للترمنال",
          desc: R`Nerd Font مش خط واحد: ده خطوط برمجة معروفة (زي Meslo و JetBrains Mono و Cascadia) اتضاف عليها آلاف الأيقونات: فرع git، وفولدر، ولوجو Node و Python، وأسهم Powerline. أدوات تجميل الترمنال زي Oh My Posh و Starship و Powerlevel10k و Terminal-Icons بتطبع الأيقونات دي، ولو الترمنال مش على Nerd Font هتظهر مكانها مربعات فاضية أو علامات استفهام.

التسطيب على ويندوز، أي طريقة من دول:
• من [[nerdfonts.com/font-downloads]] (أو صفحة Releases في repo اسمه ryanoasis/nerd-fonts على GitHub): نزّل zip الخط، وفكّه، وحدد ملفات [[.ttf]] كلها، وكليك يمين ثم Install (ليك انت بس) أو Install for all users (محتاج أدمن). في ويندوز 11 ممكن تلاقيهم تحت Show more options.
• لو Oh My Posh متسطب عندك: [[oh-my-posh font install meslo]] بينزّل Meslo ويسطّبه لليوزر بتاعك، ولو الترمنال شغال كأدمن بيسطّبه لكل اليوزرز.
• winget فيه package واحدة بس عاملها حد من المجتمع لخط JetBrainsMono: [[winget install DEVCOM.JetBrainsMonoNerdFont]]. مش من فريق Nerd Fonts نفسه، فاعرف انت بتسطّب من مين.

اسم الخط اللي هتكتبه في الإعدادات هو اسم العيلة مش اسم الملف: من zip بتاع Nerd Fonts أو من Oh My Posh هيبقى زي [[MesloLGM Nerd Font]]، ولو سطّبت نسخة Powerlevel10k هيبقى [[MesloLGS NF]]. وكل خط بييجي بـ 3 أشكال: [[Nerd Font]] الأيقونات فيه أعرض شوية (حوالي حرف ونص) ومناسب لأغلب الترمنالات، و [[Nerd Font Mono]] كل أيقونة بعرض حرف واحد فبتبان أصغر، و [[Nerd Font Propo]] للبرامج العادية مش الترمنال.

بعد التسطيب اقفل البرنامج كله وافتحه عشان يشوف الخط الجديد، وبعدين:
• Windows Terminal: [[Ctrl+,]] ثم Profiles ثم Defaults ثم Appearance ثم Font face، فيتطبق على كل البروفايلات. أو [[font.face]] جوه [[profiles.defaults]] في settings.json (الدرس الجاي).
• VS Code: الترمنال اللي جواه ليه إعداد لوحده، [[terminal.integrated.fontFamily]] في settings.json بتاع VS Code (Ctrl+Shift+P ثم [[Preferences: Open User Settings (JSON)]]).

الاختبار: آخر سطر في المثال بيطبع ٣ أيقونات في PowerShell بأرقامها في Unicode. [[0xf07b]] رقم مكتوب hex ([[0x]] معناها إن اللي بعدها hex)، و [[[char]0xf07b]] بتحوّل الرقم للحرف اللي رقمه كده، و [[$(...)]] جوه النص بتحط الناتج مكانها. لو الخط شغال هتشوف فولدر، وفرع git، ولوجو GitHub. لو شفت مربعات، الخط مش متطبق.`,
          example: R`nerdfonts.com/font-downloads → Meslo → Download          zip with every weight
Extract → select all .ttf → right-click → Install        per user (Install for all users = admin)
oh-my-posh font install meslo                            same, from the terminal (needs Oh My Posh)
winget install DEVCOM.JetBrainsMonoNerdFont              community package, JetBrainsMono only
Windows Terminal → Ctrl+, → Defaults → Appearance → Font face → MesloLGM Nerd Font
VS Code settings.json → "terminal.integrated.fontFamily": "MesloLGM Nerd Font"
"$([char]0xf07b) $([char]0xf418) $([char]0xf09b)"       (PowerShell) folder, git branch, GitHub`,
          try: "سطّب Meslo Nerd Font، وخليه خط Windows Terminal والترمنال بتاع VS Code، واطبع سطر الأيقونات (آخر سطر في المثال) في الاتنين.",
          flag: "keys",
          deep: {
            why: "ثيمات الترمنال بتعرض الـ branch وحالة git ونسخة Node بأيقونات صغيرة بتوفّر مساحة وبتتقري بسرعة. من غير الخط اللي فيه الأيقونات دي، الـ prompt بيطلع مليان مربعات، وناس كتير تفتكر إن الثيم بايظ والمشكلة في الخط.",
            how: R`الأيقونات دي مكانها في Unicode منطقة اسمها Private Use Area (من [[U+E000]] لـ [[U+F8FF]]، وفيه مناطق تانية بعد كده). الأرقام دي مالهاش شكل رسمي، وكل خط بيحط فيها اللي هو عايزه. Nerd Fonts بياخد أيقونات من مجموعات زي Font Awesome و Devicons و Octicons و Powerline ويحطها في أرقام ثابتة، فأي برنامج يطبع [[U+F418]] عارف إنها هتطلع فرع git لو الخط Nerd Font.

Install العادية بتحط الخط في فولدر خطوط اليوزر ([[%LOCALAPPDATA%\Microsoft\Windows\Fonts]])، و Install for all users في [[C:\Windows\Fonts]]. والترمنال بيرسم بالخط اللي في إعداداته بس، فالتسطيب لوحده مش كفاية: لازم تختاره.

ولو بتستخدم WSL أو ssh لسيرفر: الخط بيتسطب على ويندوز بس، مش جوه لينكس، لأن Windows Terminal هو اللي بيرسم الحروف. الـ prompt اللي على السيرفر بيبعت رقم الأيقونة، والترمنال اللي على جهازك هو اللي بيرسمها.`,
            when: "قبل ما تسطّب أي ثيم للترمنال (Oh My Posh أو Starship أو Powerlevel10k) أو Terminal-Icons. ومرة واحدة على كل جهاز جديد.",
            mistakes: R`تغيّر الخط في Windows Terminal بس، وتفتح الترمنال بتاع VS Code تلاقي مربعات: ليه إعداد لوحده. أو تكتب اسم الملف ([[MesloLGMNerdFont-Regular]]) بدل اسم العيلة ([[MesloLGM Nerd Font]]). أو تسطّب ملف Regular بس، فالكلام العريض والمايل بيترسم بشكل تقريبي: سطّب كل الملفات. أو تسطّب الخط جوه WSL وتستنى Windows Terminal يشوفه.`
          },
          lines: [
            "الموقع الرسمي: اختار Meslo (أو أي خط) ونزّل الـ zip، وفيه كل الأوزان: عادي وعريض ومايل.",
            "فك الـ zip وسطّب ملفات [[.ttf]] كلها مرة واحدة. Install لوحدها لليوزر بتاعك بس ومش محتاجة أدمن.",
            "نفس الخطوتين بأمر واحد، لو Oh My Posh متسطب.",
            "الـ package الوحيدة في winget: من حد في المجتمع، ولخط واحد بس.",
            "خليه خط كل البروفايلات في Windows Terminal. اختاره من القايمة بدل ما تكتبه، عشان الاسم يبقى مظبوط.",
            "الترمنال اللي جوه VS Code ليه خط لوحده، مش بياخد من Windows Terminal.",
            "اختبار في PowerShell: ٣ أيقونات بأرقامها. فولدر وفرع git ولوجو GitHub يبقى تمام، ومربعات يبقى الخط مش متطبق."
          ],
          sol: R`في Windows Terminal: [[Ctrl+,]] ثم Defaults تحت Profiles ثم Appearance، ومن Font face اختار [[MesloLGM Nerd Font]] ودوس Save. في VS Code: Ctrl+Shift+P ثم [[Preferences: Open User Settings (JSON)]]، وضيف [["terminal.integrated.fontFamily": "MesloLGM Nerd Font"]] واحفظ. سطر الاختبار في الاتنين بيطبع ٣ أيقونات جنب بعض: فولدر، وفرع git، ولوجو GitHub.

اتأكدت من الأسامي من الملفات نفسها: [[MesloLGMNerdFont-Regular.ttf]] من الـ repo الرسمي اسم العيلة جواه [[MesloLGM Nerd Font]]، ونسخة Mono [[MesloLGM Nerd Font Mono]]، وملف Powerlevel10k [[MesloLGS NF]]. واتأكدت إن الأيقونات التلاتة موجودة في الخطين دول، ومش موجودة في Cascadia Mono (خط Windows Terminal الافتراضي) ولا في خطوط الأيقونات اللي جاية مع ويندوز، فلو ظهرت يبقى الخط اشتغل فعلًا.

لو ظهرت مربعات: الخط مش متختار، أو البرنامج كان مفتوح وانت بتسطّب (اقفل كل نوافذه وافتحه). لو Windows Terminal طلّع تحذير [[Unable to find the following fonts]] وبعده الاسم، يبقى الاسم مكتوب غلط أو الخط مش متسطب. ولو الأيقونات راكبة على الحرف اللي بعدها أو مقطوعة، جرّب نسخة [[Mono]].`
        },
        {
          cmd: "Windows Terminal settings.json",
          title: "شكّل Windows Terminal من ملف الإعدادات",
          desc: R`كل إعدادات Windows Terminal (الخط والألوان والشفافية والبروفايل اللي بيفتح الأول) متخزنة في ملف JSON واحد اسمه [[settings.json]]. [[Ctrl+Shift+,]] بيفتحه في محرر النصوص بتاعك، و [[Ctrl+,]] بيفتح نفس الإعدادات بواجهة.

مكانه:
• النسخة العادية (من Store أو winget): [[%LOCALAPPDATA%\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json]].
• Preview: نفس المسار بس الفولدر اسمه [[Microsoft.WindowsTerminalPreview_8wekyb3d8bbwe]].
• لو متسطب بـ Scoop أو Chocolatey: [[%LOCALAPPDATA%\Microsoft\Windows Terminal\settings.json]].
و [[Ctrl+Alt+,]] بيفتح [[defaults.json]]: كل القيم الافتراضية، للقراية بس، وأي تعديل فيه بيتجاهل.

JSON بسرعة: [[{ }]] object فيه مفاتيح وقيم، و [[[ ]]] لستة، و [[:]] بين المفتاح وقيمته، و [[,]] بين كل عنصر واللي بعده، ومفيش فاصلة بعد آخر عنصر. والنصوص والمفاتيح بين علامات تنصيص مزدوجة، و [[\]] جوه نص بتتكتب [[\\]].

[[profiles]] جواه [[defaults]] (إعدادات بتسري على كل البروفايلات) و [[list]] (البروفايلات نفسها: PowerShell و Command Prompt و Ubuntu...). أي مفتاح في [[defaults]] كل البروفايلات بتاخده، إلا لو بروفايل كاتب نفس المفتاح جواه في [[list]]، فبتاعه هو اللي يكسب.

مفاتيح [[defaults]] في المثال:
• [[font]]: جواه [[face]] اسم الخط (زي [[MesloLGM Nerd Font]] من درس Nerd Font) و [[size]] الحجم بالـ points (الافتراضي 12).
• [[colorScheme]]: اسم مجموعة الألوان. فيه جاهز زي [[Campbell]] (الافتراضي) و [[One Half Dark]] و [[Tango Dark]]، أو اسم scheme عملتها في [[schemes]].
• [[opacity]]: الشفافية من 0 لـ 100 (100 = مش شفاف خالص). و [[useAcrylic]] بـ [[true]] بيخلي الجزء الشفاف مضبب (acrylic)، و [[false]] شفاف من غير تضبيب، ودي على ويندوز 11 بس.
• [[backgroundImage]]: مسار صورة خلفية، و [[backgroundImageOpacity]] شفافيتها من 0 لـ 1 (0.15 يعني باهتة جدًا فالكلام يتقري).
• [[cursorShape]]: شكل المؤشر: [[bar]] (الافتراضي) أو [[underscore]] أو [[filledBox]] أو [[emptyBox]] أو [[vintage]] أو [[doubleUnderscore]].
• [[padding]]: المسافة بين الكلام وحرف النافذة: رقم واحد لكل الجهات، أو أربعة بالترتيب شمال وفوق ويمين وتحت ([["12, 8, 12, 8"]]).
• [[startingDirectory]]: الفولدر اللي التاب الجديد بيفتح فيه. [[%USERPROFILE%]] متغير بيئة ويندوز بيتبدّل بمسار الـ home بتاعك، وده الافتراضي.

وفي أول مستوى (برّه [[profiles]]):
• [[defaultProfile]]: البروفايل اللي بيفتح مع Ctrl+Shift+T أو [[wt]]، باسمه ([["PowerShell"]] ده PowerShell 7) أو بالـ GUID بتاعه.
• [[copyOnSelect]]: [[true]] يعني أي كلام تحدده بالماوس بيتنسخ على طول، وكليك يمين بيلزق.
• [[schemes]]: لستة الـ color schemes بتاعتك. كل واحدة ليها [[name]] (اللي بتكتبه في colorScheme)، و [[background]] و [[foreground]] (لون الكلام)، و [[cursorColor]] و [[selectionBackground]] (اختياريين)، و 16 لون الترمنال: 8 عادية ([[black]] و [[red]] و [[green]] و [[yellow]] و [[blue]] و [[purple]] و [[cyan]] و [[white]]) و 8 فاتحة بنفس الأسامي وقبلها [[bright]] ([[brightRed]] مثلًا). كل لون بالشكل [[#RRGGBB]]: أحمر وأخضر وأزرق، كل واحد رقمين hex.

لو فيه غلطة: الترمنال بيقرا الملف أول ما تحفظ. غلطة في شكل الـ JSON (فاصلة ناقصة أو زيادة) بتطلّع تحذير [[Failed to reload settings]] والترمنال يفضل على الإعدادات اللي قبلها، ولو فتحته والملف بايظ بيقول [[Temporarily using the Windows Terminal default settings.]] ويشتغل بالافتراضي لحد ما تصلّحه. ولو الـ JSON سليم بس فيه قيمة غلط (زي colorScheme مش موجودة)، بيطلع تحذير بالمشكلة دي بس ويتجاهل القيمة.

من الواجهة ([[Ctrl+,]]): Startup فيها Default profile، و Profiles ثم Defaults ثم Appearance فيها الخط والألوان والشفافية والخلفية والمؤشر والـ padding، و Color schemes تعمل فيها scheme جديدة أو تعدّل نسخة من واحدة جاهزة، و Interaction فيها Automatically copy selection to clipboard (ده copyOnSelect). وتحت على الشمال Open JSON file بيفتح نفس الملف.`,
          example: R`{
  "defaultProfile": "PowerShell",
  "copyOnSelect": true,
  "profiles": {
    "defaults": {
      "font": { "face": "MesloLGM Nerd Font", "size": 12 },
      "colorScheme": "My Dark",
      "opacity": 90,
      "useAcrylic": true,
      "backgroundImage": "C:\\Users\\you\\Pictures\\terminal-bg.png",
      "backgroundImageOpacity": 0.15,
      "cursorShape": "filledBox",
      "padding": "12, 8, 12, 8",
      "startingDirectory": "%USERPROFILE%\\projects"
    }
  },
  "schemes": [
    {
      "name": "My Dark",
      "background": "#1E1E2E", "foreground": "#CDD6F4",
      "cursorColor": "#F5E0DC", "selectionBackground": "#585B70",
      "black": "#45475A", "red": "#F38BA8", "green": "#A6E3A1", "yellow": "#F9E2AF",
      "blue": "#89B4FA", "purple": "#F5C2E7", "cyan": "#94E2D5", "white": "#BAC2DE",
      "brightBlack": "#585B70", "brightRed": "#F38BA8", "brightGreen": "#A6E3A1", "brightYellow": "#F9E2AF",
      "brightBlue": "#89B4FA", "brightPurple": "#F5C2E7", "brightCyan": "#94E2D5", "brightWhite": "#A6ADC8"
    }
  ]
}`,
          try: R`افتح الملف بـ [[Ctrl+Shift+,]] وجوه [[profiles]] ثم [[defaults]] ضيف [["colorScheme": "One Half Dark"]] و [["opacity": 85]] واحفظ، وشوف الترمنال اتغير من غير ما تقفله. وبعدين امسح فاصلة عمدًا واحفظ وشوف التحذير، ورجّعها.`,
          flag: "script",
          deep: {
            why: "الواجهة كويسة لتعديل واحد، لكن الملف بيخليك تشوف كل إعداداتك في مكان واحد، وتنسخها لجهاز جديد في ثانية، وتحطها مع الـ dotfiles بتاعتك على GitHub.",
            how: R`الإعدادات طبقات: [[defaults.json]] اللي جاي مع البرنامج، وفوقه [[profiles.defaults]] بتاعتك، وفوقه كل بروفايل في [[list]]، والطبقة الأقرب للبروفايل تكسب. البروفايلات اللي بتتعمل لوحدها (PowerShell 7 و WSL و Git Bash) ليها [["source"]]، وكل بروفايل ليه [["guid"]] رقم ثابت بيتعرف بيه.

البرنامج بيراقب الملف، فأي حفظ بيتطبق على النوافذ المفتوحة على طول. ولو حفظت من الواجهة، البرنامج بيكتب الملف من جديد بترتيبه هو. وأول الملف فيه [["$schema"]]، وده بيخلي VS Code يعرف المفاتيح المسموحة فيكمّلها لك ويعلّم على الغلط وانت بتكتب.

[[colorScheme]] تقدر تديله اتنين: [[{ "light": "One Half Light", "dark": "One Half Dark" }]] فيتغير مع ثيم الترمنال. ولو عايز ترجّع كل حاجة للأصل: اقفل الترمنال، وامسح [[settings.json]] و [[state.json]] اللي جنبه، وافتحه يعمل ملف جديد.`,
            when: "أول ما تجهّز جهاز ويندوز للشغل، وكل ما تسطّب خط أو ثيم جديد. ولما تنقل إعداداتك لجهاز تاني: انسخ الملف.",
            mistakes: R`تلزق مسار فيه [[\]] واحدة فالـ JSON يبوظ: لازم [[\\]] أو [[/]]. وتسيب فاصلة بعد آخر عنصر في object أو لستة. وتلزق المثال مكان الملف كله فتضيّع [["list"]] وتعديلاتك على البروفايلات: عدّل المفاتيح جوه ملفك. وتحط الإعداد في بروفايل واحد جوه [[list]] وتستغرب ليه التاني متغيرش: الإعدادات العامة مكانها [[defaults]]. وتكتب [[opacity]] بالشكل القديم [[0.8]]: القيمة دلوقتي من 0 لـ 100 (المفتاح القديم [[acrylicOpacity]] كان من 0 لـ 1).`
          },
          lines: [
            "بداية الملف.",
            "البروفايل اللي بيفتح الأول: PowerShell 7. لو مش متسطب عندك اكتب [[Windows PowerShell]].",
            "التحديد بالماوس بينسخ على طول، وكليك يمين بيلزق.",
            "بداية البروفايلات.",
            "الإعدادات اللي كل البروفايلات بتاخدها.",
            "الخط (Nerd Font) وحجمه.",
            "مجموعة الألوان اللي معرّفة تحت في schemes.",
            "شفافية: 90 من 100 (100 = مش شفاف).",
            "الجزء الشفاف يبقى مضبب.",
            R`صورة خلفية. كل [[\]] في المسار متكتبة [[\\]].`,
            "الصورة باهتة جدًا عشان الكلام يتقري فوقها.",
            "مؤشر مربع مليان بدل الخط الرفيع.",
            "مسافة 12 شمال ويمين، و 8 فوق وتحت.",
            "التاب الجديد يفتح في فولدر projects جوه الـ home (لازم يكون موجود).",
            "قفلة defaults.",
            "قفلة profiles. الـ list بتاعتك مش في المثال: سيبها في ملفك زي ما هي.",
            "بداية لستة الـ color schemes.",
            "بداية scheme واحدة.",
            "اسمها، وده اللي مكتوب في colorScheme فوق.",
            "لون الخلفية ولون الكلام.",
            "لون المؤشر ولون خلفية الكلام المتحدد.",
            "أول 4 ألوان من الـ 8 العادية.",
            "الـ 4 التانيين.",
            "أول 4 من الفاتحة (bright).",
            "آخر 4.",
            "قفلة الـ scheme.",
            "قفلة اللستة.",
            "آخر الملف."
          ],
          sol: R`أول ما تحفظ (Ctrl+S) الترمنال المفتوح بيتغير من غير restart: الألوان بقت One Half Dark والنافذة شفافة شوية. لما تمسح الفاصلة وتحفظ: بيطلع تحذير [[Failed to reload settings]] وتحته [[Settings could not be reloaded from file. Check for syntax errors, including trailing commas.]]، والترمنال يفضل بالإعدادات اللي كانت قبل الغلطة. رجّع الفاصلة واحفظ، التحذير يروح والتعديل يتطبق.

نصوص التحذيرات دي من ملفات الترجمة بتاعة Windows Terminal نفسه على GitHub، وأسامي المفاتيح ومكان الملف طابقتها مع Microsoft Learn ومع ملف حقيقي على جهاز عليه Windows Terminal 1.24، والمثال اتأكدت إنه JSON سليم. لو كتبت اسم scheme مش موجودة، هيطلع تحذير فيه [[Found a profile with an invalid "colorScheme"]] والبروفايل يرجع للألوان الافتراضية. ولو [[startingDirectory]] لفولدر مش موجود، التاب هيطبع [[Could not access starting directory]] ويفتح في مكان تاني. ولو صورة الخلفية مش موجودة: [[One or more resources (such as icon or backgroundImage) specified in your settings could not be found.]]`
        },
        {
          cmd: "Win+`",
          title: "ترمنال بينزل من فوق الشاشة بزرار (Quake mode)",
          desc: R`[[Win+$__bt]] (الزرار اللي فوق Tab وشمال 1) بيطلّع نافذة Windows Terminal بتنزل من فوق الشاشة وانت في أي برنامج، ونفس الزرار بيخبّيها. الفكرة جاية من كونسول لعبة Quake، وعشان كده اسمها quake mode.

النافذة دي اسمها [[_quake]] وليها قواعد:
• بتلزق في النص اللي فوق من الشاشة، وبتكبّرها أو تصغّرها من الحرف اللي تحت بس.
• مفيهاش شريط تابات ولا title bar (ده اسمه focus mode)، بس جواها تابات و panes عادي: Ctrl+Shift+T تاب جديد، و Ctrl+Tab تتنقل بينهم.
• لما تتخبّى مش بتظهر في الـ taskbar ولا في Alt+Tab، واللي شغال جواها بيفضل شغال.
• نافذة واحدة بس تبقى quake في نفس الوقت.

الاختصار بيشغّل action اسمها [[quakeMode]]، ودي نسخة جاهزة من action تانية اسمها [[globalSummon]] (استدعاء من أي مكان) بالاسم [[_quake]]. «global» يعني الزرار شغال وانت في المتصفح أو VS Code، مش جوه الترمنال بس. وهو متسجّل في الإعدادات الافتراضية كـ [[win+sc(41)]]: [[sc(41)]] يعني scan code رقم 41، يعني مكان الزرار على الكيبورد مش الحرف المكتوب عليه، فبيشتغل حتى والكيبورد عربي (الزرار ده عليه «ذ»).

شرط مهم: الاختصار بيشتغل بس لو فيه نسخة من Windows Terminal شغالة، لأن البرنامج هو اللي بيسجّل الزرار عند ويندوز. لو قفلت كل نوافذه، [[Win+$__bt]] مش هيعمل حاجة. الحل: [[Ctrl+,]] ثم Startup ثم Launch on machine startup، فيقوم مع ويندوز. (في شروحات قديمة هتلاقي مفتاح [[startOnUserLogin]] في الـ JSON: اتشال من نسخة 1.22، وبقى الزرار اللي في الواجهة بيتحكم مباشرة في Startup apps بتاعة ويندوز.)

[[wt -w _quake]] بيفتح نفس النافذة من Win+R أو من أي ترمنال: [[-w]] معناها «اشتغل في النافذة اللي اسمها كده»، ولو موجودة بيفتح فيها تاب جديد.

ولو عايز زرار تاني أو من غير حركة النزول، اعمل action بنفسك في [[settings.json]]: [[globalSummon]] بالاسم [[_quake]]، و [[dropdownDuration]] مدة حركة النزول بالـ milliseconds (0 = تظهر على طول، و quakeMode بيستخدم 200)، و [[toggleVisibility]] بـ [[true]] يخلي نفس الزرار يخبّيها. وبعدين في لستة [[keybindings]] اربط الزرار بالـ [[id]] بتاع الـ action. ومن غير [[name]]، [[globalSummon]] بيجيب آخر نافذة ترمنال عادية استخدمتها، ودي مفيدة لو عايز زرار يجيب الترمنال العادي من أي حتة.`,
          example: R`Win+$__bt                  show / hide the quake window, from any app
wt -w _quake           open the same window from Win+R or a terminal
Ctrl+Shift+T           new tab inside it (tab bar is hidden, Ctrl+Tab switches)
Drag the bottom edge   taller or shorter (width is fixed)
Ctrl+, → Startup → Launch on machine startup → On   so Win+$__bt works right after login
Ctrl+Shift+, → "actions" + "keybindings"           your own globalSummon key (solution below)`,
          try: R`دوس [[Win+$__bt]] وانت في المتصفح، واكتب أمر، ودوسه تاني تختفي. وبعدين اعمل اختصار Ctrl+Alt+T (زي أوبونتو) يجيب نفس النافذة من غير حركة النزول.`,
          flag: "keys",
          deep: {
            why: "بتحتاج ترمنال لأمر سريع ([[git status]]، أو [[ping]]، أو تشوف مين ماسك بورت) وانت في المتصفح أو VS Code. بدل ما تدوّر على نافذة الترمنال وسط عشر نوافذ، زرار واحد ينزّلها فوق اللي انت فيه، ونفس الزرار يرجّعك مكانك.",
            how: R`Windows Terminal بيسجّل الاختصار عند ويندوز بـ [[RegisterHotKey]]، فويندوز بيبعتله الزرار حتى لو برنامج تاني هو اللي قدامك. عشان كده لازم يكون شغال، ولو برنامج تاني سجّل نفس الزرار قبله، الترمنال مش هيقدر ياخده. ولو عندك نسخة أدمن ونسخة عادية (أو Stable و Preview) شغالين، أول واحدة فتحت هي اللي بتاخد الزرار.

[[quakeMode]] نفسها مجرد [[globalSummon]] بالقيم دي: [[name]] = [[_quake]]، و [[dropdownDuration]] = 200، و [[toggleVisibility]] = [[true]]، و [[monitor]] = [[toMouse]] (تنزل على الشاشة اللي فيها الماوس)، و [[desktop]] = [[toCurrent]] (تيجي على الـ virtual desktop اللي انت عليه). والاسم [[_quake]] محجوز: أي نافذة بالاسم ده بتاخد سلوك الـ quake.`,
            when: "لو بتفتح الترمنال عشرين مرة في اليوم لأوامر قصيرة. ولو بتشتغل على أكتر من شاشة: النافذة بتنزل على الشاشة اللي فيها الماوس.",
            mistakes: R`تقفل كل نوافذ Windows Terminal وتستغرب إن [[Win+$__bt]] مبيعملش حاجة. أو تفتح نافذة [[_quake]] بـ [[wt -w _quake]] وانت شايل الاختصار، وبعدين تصغّرها: مش هتلاقيها في الـ taskbar ولا Alt+Tab، والحل Task Manager. أو تدوّر على [[startOnUserLogin]] في الـ JSON زي الشروحات القديمة: اتشال، والإعداد بقى في الواجهة بس. أو تختار لـ globalSummon زرار بتستخدمه في برنامج تاني: طول ما الترمنال شغال، الزرار ده مش هيوصل للبرنامج التاني.`
          },
          lines: [
            "اطلّع النافذة من أي برنامج، ودوسه تاني يخبّيها. لازم Windows Terminal يكون شغال.",
            R`نفس النافذة بأمر: [[-w _quake]] يعني «في النافذة اللي اسمها _quake»، ولو موجودة بيفتح فيها تاب جديد.`,
            "تاب جديد جواها. شريط التابات مخفي، فبتتنقل بـ Ctrl+Tab.",
            "الحرف اللي تحت بس هو اللي بيتسحب، والعرض ثابت على عرض الشاشة.",
            "خلّي الترمنال يقوم مع ويندوز، فالاختصار يشتغل من أول ما تفتح الجهاز.",
            "زرار تاني أو من غير حركة: action من نوع globalSummon في settings.json (الحل تحت)."
          ],
          sol: R`[[Win+$__bt]] من المتصفح: النافذة بتنزل من فوق وبتاخد نص الشاشة اللي فوق، وفيها البروفايل الافتراضي. اكتب [[git status]] مثلًا، ودوس [[Win+$__bt]] تاني: بتطلع لفوق وتختفي، ومش هتلاقيها في الـ taskbar. ودوسه تاني هترجع بنفس اللي كان فيها.

للاختصار الجديد: [[Ctrl+Shift+,]] وضيف العنصر اللي جوه [["actions"]] تحت للستة [["actions"]] اللي في ملفك، واللي جوه [["keybindings"]] للستة [["keybindings"]] (بفاصلة بينه وبين اللي قبله لو اللستة مش فاضية)، واحفظ. بعدها Ctrl+Alt+T من أي برنامج يجيب نفس النافذة على طول من غير حركة. لو مشتغلش، اقفل الترمنال كله وافتحه، ولو برضه لأ جرّب زرار تاني: ممكن برنامج تاني ماسكه.

أسامي الـ actions والخصائص من صفحة Actions على Microsoft Learn، والاختصار الافتراضي [[win+sc(41)]] لقيته في [[defaults.json]] بتاع Windows Terminal 1.24، وإن [[startOnUserLogin]] اتشال لقيته في كود Windows Terminal على GitHub (موجود في 1.21 ومش موجود من 1.22). مجربتش الضغط على الاختصار نفسه هنا. لو [[Win+$__bt]] معملش حاجة: Windows Terminal مش شغال، أو برنامج تاني ماسك الزرار، أو فيه نسخة أدمن شغالة خدت الزرار قبل العادية.`,
          solCode: R`"actions": [
    { "command": { "action": "globalSummon", "name": "_quake", "dropdownDuration": 0 }, "id": "User.QuakeNoAnim" }
],
"keybindings": [
    { "keys": "ctrl+alt+t", "id": "User.QuakeNoAnim" }
]`
        }
      ]
    },
    {
      t: "أوبونتو: تخصيص",
      l: 3,
      n: "اختصاراتك انت، وإعدادات GNOME من الترمنال عشان تجهز أي جهاز في دقيقة",
      items: [
        {
          cmd: "Custom Shortcuts",
          title: "اعمل اختصار يفتح مشروعك أو أي أمر في أوبونتو",
          desc: R`Settings ← Keyboard ← View and Customize Shortcuts ← Custom Shortcuts ← Add Shortcut. تكتب اسم، وأمر، وتختار الزراير. مثلًا Ctrl+Alt+M يفتح ترمنال جوه فولدر المشروع على طول، أو Ctrl+Shift+Esc يفتح System Monitor زي ويندوز.

وفي نفس الصفحة تقدر تغيّر أي اختصار موجود في النظام.`,
          example: R`Settings → Keyboard → View and Customize Shortcuts → Custom Shortcuts
Name:     myapp terminal
Command:  gnome-terminal --working-directory=/home/you/projects/myapp
Shortcut: Ctrl+Alt+M
Name: Task manager   Command: gnome-system-monitor   Shortcut: Ctrl+Shift+Esc
Command:  sh -c "code $HOME/projects/myapp"          when you need ~ or $HOME`,
          try: "اعمل اختصار Ctrl+Shift+Esc يفتح [[gnome-system-monitor]]، وجرّبه.",
          flag: "keys",
          deep: {
            why: "بتفتح نفس المشروع كل يوم بنفس الخطوات. اختصار واحد يوفّرها، وكمان تنقل عادات ويندوز اللي اتعودت عليها.",
            how: R`الأمر بيتشغّل مباشرة من غير شيل. يعني [[~]] و [[$HOME]] والـ pipes و [[&&]] مش هيشتغلوا لوحدهم. اكتب المسار كامل، أو لف الأمر في [[sh -c "..."]] لو محتاج حاجات الشيل.

[[--working-directory]] بتخلي الترمنال يفتح في الفولدر ده بدل الهوم.`,
            when: "مشروع شغال عليه كل يوم. أمر بتكتبه كتير. اختصار من نظام تاني اتعودت عليه.",
            mistakes: R`تكتب [[gnome-terminal --working-directory=~/projects/myapp]] فيفتح في الهوم ومش فاهم ليه، لأن [[~]] مش بتتفك من غير شيل. واختيار زراير مستخدمة في برنامج بتشتغل عليه (زي Ctrl+Shift+P في VS Code) بياخدها منه.`
          },
          sol: R`في Settings ثم Keyboard ثم View and Customize Shortcuts ثم Custom Shortcuts ثم [[+]]: Name أي حاجة، Command [[gnome-system-monitor]]، وبعدين Set Shortcut ودوس Ctrl+Shift+Esc. بعد Add، Ctrl+Shift+Esc من أي مكان هيفتح System Monitor.

لو Settings قالك إن الاختصار مستخدم في حاجة تانية، هيسألك تستبدله، ده في أوبونتو غالبًا مش هيحصل مع الاختصار ده. ولو الاختصار مش بيشتغل وانت على الكيبورد العربي، جرّب بالإنجليزي: GNOME ساعات بيقرا الاختصارات على أول layout بس. ولو كتبت [[~]] في Command وماشتغلش، ده لأن الأمر مش بيتنفذ في shell، استخدم [[sh -c]] زي المثال.`
        },
        {
          cmd: "gsettings",
          title: "غيّر إعدادات GNOME من الترمنال",
          desc: R`كل إعداد في GNOME متخزن كمفتاح، و [[gsettings]] بيقراه ويغيّره من الترمنال. بدل ما تدوّر في Settings، سطر واحد. والأهم: تحط الأوامر دي في سكربت، فأي جهاز أوبونتو جديد يتظبط زي جهازك في ثانية.`,
          example: R`gsettings get org.gnome.desktop.interface color-scheme
gsettings set org.gnome.desktop.interface color-scheme 'prefer-dark'
gsettings set org.gnome.shell.extensions.dash-to-dock click-action 'minimize'
gsettings set org.gnome.mutter center-new-windows true
gsettings reset org.gnome.mutter center-new-windows
gsettings list-keys org.gnome.mutter`,
          try: "اعرف قيمة [[color-scheme]] عندك، وحوّلها لـ dark، وبعدين رجّعها بـ [[gsettings reset org.gnome.desktop.interface color-scheme]].",
          deep: {
            why: "تجهيز جهاز جديد بإعداداتك بالظبط من غير ما تفتكر كل checkbox، وحاجات كتير مش موجودة في Settings أصلًا.",
            how: R`الإعدادات متقسمة لـ schemas (زي [[org.gnome.desktop.interface]])، وكل واحدة فيها مفاتيح. [[list-keys]] يعرض المفاتيح، و [[get]] يقرا، و [[set]] يكتب، و [[reset]] يرجّع الافتراضي. التغيير بيسري فورًا.

القيم النصية لازم تتحط بين ' ' عشان الشيل. [[dash-to-dock]] هو الـ dock بتاع أوبونتو، ومفتاح [[click-action]] بيخلي الضغط على أيقونة برنامج مفتوح يصغّره (زي ويندوز). ولو عايز تشوف الإعدادات بواجهة: [[sudo apt install dconf-editor]].

وللإضافات (extensions): [[sudo apt install gnome-shell-extension-manager]] يسطّب برنامج Extension Manager.`,
            when: "dotfiles وسكربت تجهيز الجهاز. إعداد مخفي ملوش زرار.",
            mistakes: "تغيّر مفاتيح كتير عشوائي من نصايح نت، وبعدين مش فاكر غيّرت إيه. اكتب كل [[set]] في سكربت، وقبله [[get]] للقيمة القديمة، و [[reset]] دايمًا موجود."
          },
          lines: [
            "اقرا الوضع الحالي (فاتح ولا غامق).",
            "خلّي الواجهة dark. القيمة بين ' ' عشان الشيل.",
            "الضغط على أيقونة برنامج مفتوح في الـ dock يصغّره (خاص بأوبونتو).",
            "النوافذ الجديدة تفتح في نص الشاشة.",
            "رجّع المفتاح ده لقيمته الافتراضية.",
            "اعرض كل المفاتيح اللي في الـ schema دي."
          ],
          sol: R`[[gsettings get org.gnome.desktop.interface color-scheme]] هيطبع [[default]] بعلامات تنصيص مفردة (يعني فاتح) أو [[prefer-dark]]، وفي GNOME الحديث ممكن [[prefer-light]]. بعد [[set ... 'prefer-dark']] الـ Settings والبرامج الحديثة هتقلب داكن على طول من غير restart. و [[reset]] يرجّعها للقيمة الافتراضية، و [[get]] بعدها يطبع [[default]].

لو طلع [[No such schema]] يبقى انت مش على GNOME، أو في جلسة ssh أو WSL من غير الـ desktop. ولو اتغير الإعداد والتطبيقات القديمة (GTK3) فضلت فاتحة، ده لأنها بتقرا [[gtk-theme]] مش color-scheme، وده من الـ Appearance في Settings.`
        }
      ]
    },
    {
      t: "الماك: تخصيص",
      l: 3,
      n: "اختصارات Finder للترمنال، وإعدادات الكيبورد اللي المبرمج بيحتاجها",
      items: [
        {
          cmd: "New Terminal at Folder",
          title: "افتح ترمنال على الفولدر من Finder",
          desc: R`الماك فيه أمر جاهز بس مقفول: System Settings ← Keyboard ← Keyboard Shortcuts ← Services ← Files and Folders، وعلّم على «New Terminal at Folder». بعدها كليك يمين على أي فولدر في Finder ← Services ← New Terminal at Folder.

وحيلة من غير إعداد: اسحب الفولدر وارميه على أيقونة Terminal في الـ Dock، هيفتح جواه.`,
          example: R`System Settings → Keyboard → Keyboard Shortcuts → Services
Files and Folders → [x] New Terminal at Folder / New Terminal Tab at Folder
Right-click a folder → Services → New Terminal at Folder
Drag a folder onto Terminal in the Dock   opens a terminal there
Keyboard Shortcuts → App Shortcuts → +    give any menu item a shortcut`,
          try: "فعّل New Terminal at Folder، وافتح ترمنال على فولدر أي مشروع من Finder، واكتب [[pwd]].",
          flag: "keys",
          deep: {
            why: "انت في Finder واقف على المشروع، وعايز ترمنال هناك من غير [[cd]] لمسار طويل.",
            how: R`Services أوامر عامة بتشتغل على الحاجة اللي انت محددها في أي برنامج. من نفس الصفحة تقدر تديها اختصار كيبورد.

App Shortcuts بيخليك تدي اختصار لأي أمر في قايمة أي برنامج: تكتب اسم البرنامج واسم الأمر بالظبط زي ما هو مكتوب في القايمة، وتختار الزراير.

والعكس، من الترمنال لـ Finder: [[open .]] (متشرح في تاب zsh).`,
            when: "كل مرة تبدأ شغل على مشروع من Finder.",
            mistakes: "في App Shortcuts اسم الأمر لازم يطابق اللي في القايمة حرف بحرف، بما فيه «...» لو موجودة، وإلا مش هيشتغل ومش هيقولك ليه."
          },
          sol: R`بعد التفعيل: كليك يمين على فولدر المشروع في Finder ثم Services (أو Quick Actions تحت في بعض النسخ) ثم «New Terminal at Folder». Terminal هيفتح، و [[pwd]] يطبع [[/Users/you/projects/myapp]].

لو Services مش ظاهرة في القايمة، يبقى عملت كليك يمين على ملف أو مساحة فاضية، لازم على الفولدر نفسه. ولو [[pwd]] طبع [[~]] بدل الفولدر، يبقى إعداد في [[~/.zshrc]] بيعمل [[cd ~]] كل مرة الترمنال يفتح.`
        },
        {
          cmd: "ApplePressAndHoldEnabled",
          title: "خلّي الزرار يتكرر لما تدوس عليه مطوّل على الماك",
          desc: R`على الماك لو دوست مطوّل على حرف، بيطلعلك قايمة حروف بتشكيل (é ê ë) بدل ما الحرف يتكرر. ده مزعج جدًا لو بتستخدم Vim أو إضافة Vim في VS Code وعايز تمسك [[j]] تنزل.

الحل أمر [[defaults]] (الأمر نفسه متشرح في تاب zsh) يقفل القايمة دي لبرنامج واحد أو للنظام كله، وأوامر تانية تسرّع التكرار.`,
          example: R`defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false
defaults write -g KeyRepeat -int 2
defaults write -g InitialKeyRepeat -int 15
defaults delete com.microsoft.VSCode ApplePressAndHoldEnabled`,
          try: "نفّذ أول سطر، واقفل VS Code وافتحه، وامسك زرار [[j]] في أي ملف وشوف بيتكرر.",
          deep: {
            why: "مستخدمين Vim ومحبي التنقل بالكيبورد بيحتاجوا التكرار. والتكرار الافتراضي على الماك بطيء على الكتير.",
            how: R`[[-g]] اختصار لـ NSGlobalDomain، يعني النظام كله. [[com.microsoft.VSCode]] يعني VS Code بس، وده أنضف لو مش عايز تفقد الحروف المشكّلة في باقي البرامج.

KeyRepeat هو السرعة (رقم أصغر = أسرع)، و InitialKeyRepeat هو الانتظار قبل ما يبدأ يكرر. 2 و 15 هما أسرع قيم في سلايدرات System Settings، وأي رقم أصغر (زي KeyRepeat 1) بيعدّي حدود السلايدر. إعدادات الكيبورد العامة محتاجة log out وتدخل تاني عشان تسري.`,
            when: "بتستخدم Vim أو إضافته، أو حاسس إن الكيبورد بطيء في التكرار.",
            mistakes: "تكتب [[-g]] مع ApplePressAndHoldEnabled وتنسى، وبعدين تحتاج تكتب حرف بتشكيل ومش عارف ليه القايمة مش بتظهر. واختيار أرقام صغيرة جدًا بيخلي الكتابة العادية تطلع حروف متكررة."
          },
          lines: [
            "اقفل قايمة الحروف المشكّلة في VS Code بس، فالزرار يتكرر وانت ماسكه.",
            "سرعة التكرار للنظام كله (أصغر = أسرع).",
            "المدة قبل ما التكرار يبدأ (أصغر = أسرع).",
            "رجّع VS Code للسلوك الافتراضي."
          ],
          sol: R`[[defaults write]] مش بيطبع حاجة. بعد ما تقفل VS Code بـ Cmd+Q (مش بس النافذة) وتفتحه، امسك [[j]] هيطلع [[jjjjjjjj]] بيتكرر. قبل الأمر، مسكة الزرار كانت بتكتب j واحدة بس (ولحروف زي [[e]] كانت هتطلّع قايمة الحروف بالتشكيل زي é). ولو عايز تشوف القيمة: [[defaults read com.microsoft.VSCode ApplePressAndHoldEnabled]] يطبع [[0]].

لو لسه مش بيتكرر، غالبًا قفلت النافذة بس والبرنامج لسه شغال. ولو السرعة بطيئة، الأمرين التانيين (KeyRepeat و InitialKeyRepeat) محتاجين logout وتدخل تاني. وده خاص بـ VS Code بس، في باقي البرامج مسكة الزرار لسه بتطلع القايمة.`
        }
      ]
    }
]);
