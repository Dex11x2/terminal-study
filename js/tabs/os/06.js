// تكملة تاب os: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/os/01.js (شرح حقول الدرس في أوله)
MORE("os", [
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
          teach: R`## البرنامج ده بيعمل إيه

Activity Monitor هو Task Manager الماك: كل عملية شغالة، وقد إيه واكلة CPU و RAM، وتقفلها منه. مفيش ماك هنا، فالشرح من دليل Apple (Activity Monitor User Guide).

---

## ١. سطور المثال

| الخطوة | بتعمل إيه |
|---|---|
| [[Cmd+Space → "activity"]] | Spotlight (بحث الماك) يلاقي البرنامج من أول حروف |
| خانة البحث فوق ← [[node]] | الجدول يتفلتر على الاسم |
| حدد ← زرار [[X]] ← Quit / Force Quit | تقفل العملية |
| تاب Memory ← Memory Pressure | هل الـ RAM مكفية فعلًا؟ |
| View ← All Processes | اعرض كل العمليات، حتى بتاعة النظام واليوزرز التانيين |
| دبل كليك ← Open Files and Ports | الملفات والبورتات اللي العملية فاتحاها |

---

## ٢. Quit ولا Force Quit؟

| الزرار | زي إيه في الترمنال | اللي بيحصل |
|---|---|---|
| Quit | [[kill PID]] (SIGTERM) | البرنامج يقفل نفسه بنظام |
| Force Quit | [[kill -9 PID]] (SIGKILL) | يموت فورًا |

**PID** (Process ID) رقم العملية، وهو عمود في الجدول اسمه PID.

---

## ٣. Memory Pressure: الرقم اللي يهمك

الماك بيملا الـ RAM الفاضية بـ cache عشان يسرّع، فرقم «Memory Used» العالي **طبيعي**. Memory Pressure بيقيس هل النظام مضطر يضغط الذاكرة أو يرمي على الديسك (swap):

| اللون | معناه |
|---|---|
| أخضر | الـ RAM مكفية |
| أصفر | النظام بيضغط الذاكرة، ممكن يقيل |
| أحمر | الـ RAM مش مكفية فعلًا: اقفل حاجات أو محتاج RAM أكتر |

---

## ٤. Open Files and Ports

السطر اللي فيه [[TCP]] و [[LISTEN]] هو البورت اللي السيرفر مستني عليه، زي [[TCP *:3000 (LISTEN)]]. [[*]] يعني على كل كروت الشبكة، و [[localhost]] يعني من الجهاز نفسه بس. نفس المعلومة في الترمنال بـ [[lsof -iTCP -sTCP:LISTEN -n -P]] (متشرح في تاب zsh).

---

## الخلاصة

~~~text
Quit / Force Quit        SIGTERM / SIGKILL
Memory Pressure          المقياس الحقيقي للـ RAM، مش Memory Used
Open Files and Ports     مين ماسك البورت
kernel_task, WindowServer  عمليات نظام، متقفلهاش
~~~`,
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
          teach: R`## البرنامج ده بيعمل إيه

Console بيعرض حاجتين: تقارير الكراش (ملف لكل مرة برنامج وقع فيها)، واللوج اللايف بتاع النظام كله. مفيش ماك هنا، فالشرح من دليل Apple (Console User Guide) ومن [[man log]].

---

## ١. سطور المثال

| الخطوة | بتعمل إيه |
|---|---|
| [[Cmd+Space → "console"]] | افتح البرنامج |
| Crash Reports في الشمال | ملف لكل كراش، الأحدث فوق |
| اسم الماك في الشمال ← Start | ابدأ تعرض اللوج اللايف |
| البحث ← [[process:myapp]] | فلتر على برنامج واحد |
| [[log stream ...]] | نفس الكلام في الترمنال |

---

## ٢. تقرير الكراش بيتقري إزاي

أول التقرير فيه:

| الخانة | معناها |
|---|---|
| [[Process:]] | اسم البرنامج اللي وقع |
| [[Version:]] | نسخته |
| [[Exception Type:]] | البرنامج مات إزاي، زي [[EXC_BAD_ACCESS (SIGSEGV)]]: حاول يقرا ذاكرة مش بتاعته |
| Crashed Thread | الـ thread اللي وقع، وتحته الدوال اللي كانت شغالة ساعتها |

**thread** خيط تنفيذ جوه البرنامج: البرنامج الواحد ممكن يعمل كذا حاجة في نفس الوقت، كل واحدة في thread.

الملفات نفسها في [[~/Library/Logs/DiagnosticReports]] بامتداد [[.ips]].

---

## ٣. اللوج اللايف من الترمنال

~~~zsh
log stream --predicate 'process == "myapp"'
~~~

| الحتة | معناها |
|---|---|
| [[log]] | أداة اللوجات في الماك |
| [[stream]] | اعرض اللوج وهو بيتكتب (لايف) لحد ما تدوس Ctrl+C |
| [[--predicate]] | شرط فلترة |
| [[process == "myapp"]] | السطور اللي جاية من عملية اسمها myapp بالظبط |

الشرط كله بين [[' ']] عشان الشيل يبعته كتلة واحدة ومايلعبش في [[" "]] اللي جواه. ولو عايز اللي فات بدل اللايف: [[log show --last 1h]] (آخر ساعة).

---

## الخلاصة

~~~text
Crash Reports            ليه البرنامج وقع (Exception Type)
Start + فلتر             لوج لايف لبرنامج واحد
log stream --predicate   نفس الكلام في الترمنال
~~~`,
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
          teach: R`## البرنامج ده بيعمل إيه

الـ Keychain خزنة مشفرة بباسورد الماك، فيها الباسوردات والتوكنز والشهادات. git على الماك بيحفظ توكن GitHub فيها، ولما التوكن يتغير لازم تمسح القديم من هنا. مفيش ماك هنا، فالشرح من دليل Apple ومن docs بتاعة git.

---

## ١. سطور المثال

| الخطوة | بتعمل إيه |
|---|---|
| [[Cmd+Space → "keychain access"]] | افتح البرنامج (في النسخ القديمة في Applications ثم Utilities) |
| البحث ← [[github.com]] | لاقي الـ credential المتخزن |
| Kind: internet password ← Delete | امسحه، فـ git يسألك تاني |
| Certificates | الشهادات، ومنها شهادات [[mkcert]] المحلية |
| تطبيق Passwords | باسوردات المواقع والـ Wi-Fi في النسخ الحديثة |

**credential** يعني بيانات الدخول (اسم وباسورد أو توكن). و **internet password** نوع entry مربوطة بموقع (server) معين.

---

## ٢. ليه git بيستخدم الـ Keychain أصلًا؟

git على الماك بيستخدم **credential helper** اسمه [[osxkeychain]]: برنامج صغير git بيسأله «معاك باسورد لـ github.com؟». تعرف الـ helper عندك بـ:

~~~zsh
git config --get credential.helper
~~~

لو طبع [[osxkeychain]] يبقى الباسورد في الـ Keychain. ولو مطبعش حاجة أو بتستخدم SSH ([[git@github.com:...]])، الـ Keychain ملوش دعوة.

---

## ٣. نفس المسح من الترمنال

حسب docs بتاعة git، الـ helper بيقرا من الـ input سطور [[key=value]] وسطر فاضي في الآخر:

~~~zsh
printf "protocol=https\nhost=github.com\n\n" | git credential-osxkeychain erase
~~~

- [[printf]] بيطبع النص، و [[\n]] سطر جديد. السطر الفاضي في الآخر معناه «خلصت».
- [[protocol=https]] و [[host=github.com]] بيحددوا أنهي entry.
- [[erase]] امسحها.

مبيطبعش حاجة لو نجح. وبعدها أول [[git push]] هيسألك على اليوزر والتوكن الجديد.

---

## الخلاصة

~~~text
Keychain                 خزنة الباسوردات والشهادات
github.com + internet password   توكن git القديم: امسحه بس هو
credential.helper        اعرف git بيحفظ فين
~~~`,
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
          teach: R`## الإعداد ده بيعمل إيه

الماك فيه نظام حماية اسمه **TCC** (Transparency, Consent, and Control) بيمنع أي برنامج يقرا فولدرات حساسة (Desktop و Documents و Downloads و Mail وغيرهم) إلا لو انت سمحت. والمنع ده بيسري على الترمنال كمان، حتى لو صلاحيات الملفات ([[chmod]]) سليمة. مفيش ماك هنا، فالشرح من دليل Apple (Mac User Guide، Privacy & Security).

---

## ١. شكل المشكلة

لو Terminal مالوش الصلاحية وكتبت [[ls ~/Library/Mail]]، الرسالة بتبقى بالشكل ده (مش متجربة هنا):

~~~text شكل الرسالة
ls: /Users/you/Library/Mail: Operation not permitted
~~~

[[Operation not permitted]] هنا مش [[Permission denied]]: الأولى معناها إن النظام نفسه (TCC) منع البرنامج، مش إن صلاحيات الملف ناقصة. عشان كده [[sudo]] مش بيحلها.

---

## ٢. سطور المثال

| الخطوة | بتعمل إيه |
|---|---|
| System Settings ← Privacy & Security ← Full Disk Access ← [[+]] | افتح لستة البرامج المسموح لها بكل الهارد |
| ضيف Terminal أو iTerm2 أو VS Code ← اقفله وافتحه | الصلاحية بتتقري لما البرنامج يبدأ، فلازم Cmd+Q |
| Files and Folders | صلاحية لفولدر واحد بس (Desktop مثلًا)، أضيق وأأمن |
| Accessibility | برامج بتتحكم في النوافذ والكيبورد (زي Rectangle) |
| [[Open Anyway]] | برنامج نزلته من النت والماك منعه أول مرة |

---

## ٣. مين بياخد الصلاحية؟

الصلاحية بتتدي للبرنامج اللي **فاتح** الشيل، مش للشيل نفسه:

~~~text
Terminal.app  (عنده Full Disk Access)
  └─ zsh
       └─ ls ~/Library/Mail    بياخد صلاحية Terminal
~~~

عشان كده بتضيف iTerm2 أو VS Code (لو بتشغّل أوامر من الترمنال اللي جواه)، مش [[zsh]].

---

## الخلاصة

~~~text
Operation not permitted   TCC مانع البرنامج، sudo مش هيحلها
Full Disk Access          للترمنال اللي بتستخدمه بس
Cmd+Q وافتحه تاني          عشان الصلاحية تسري
~~~`,
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
          teach: R`## البرنامج ده بيعمل إيه

PowerToys برنامج مجاني ومفتوح المصدر من مايكروسوفت فيه أدوات كتير صغيرة، كل واحدة بتتشغّل وتتقفل لوحدها من إعداداته. أول سطر في المثال أمر ترمنال، والباقي أدوات رسومية، شرحها من Microsoft Learn (صفحة PowerToys).

---

## ١. التسطيب: [[winget install Microsoft.PowerToys]]

| الحتة | معناها |
|---|---|
| [[winget]] | مدير البرامج بتاع ويندوز (Windows Package Manager) |
| [[install]] | سطّب |
| [[Microsoft.PowerToys]] | الـ ID بتاع البرنامج: اسم الناشر نقطة اسم البرنامج |

قبل ما تسطّب، تقدر تشوف هو إيه من غير ما تغيّر حاجة:

~~~powershell
winget show Microsoft.PowerToys
~~~

~~~text الناتج (PowerShell 7 على ويندوز 11، أكتوبر 2026)
Found PowerToys [Microsoft.PowerToys]
Version: 0.101.2362.0
Publisher: Microsoft Corporation
Publisher Url: https://github.com/microsoft/PowerToys
...
License: MIT
~~~

[[Publisher]] و [[Publisher Url]] بيأكدوا إنه من مايكروسوفت نفسها، و [[License: MIT]] يعني مفتوح المصدر. ورقم النسخة بيتغير كل شهر تقريبًا.

---

## ٢. الأدوات اللي في المثال

| الأداة | الاختصار أو المكان | بتعمل إيه |
|---|---|---|
| Command Palette | [[Win+Alt+Space]] | خانة واحدة تفتح منها برامج وملفات وحاسبة وإعدادات |
| File Locksmith | كليك يمين على ملف ← Unlock with File Locksmith | مين ماسك الملف ده (اسم البرنامج والـ PID)، وزرار End task |
| Keyboard Manager | من إعدادات PowerToys | غيّر زرار لزرار (Caps Lock يبقى Esc) |
| FancyZones | [[Win+Shift+$__bt]] للتعديل | قسّم الشاشة لأماكن ترمي فيها النوافذ |
| Text Extractor | [[Win+Shift+T]] | حدد أي حتة في الشاشة، والكلام اللي فيها يتنسخ (OCR) |
| Hosts File Editor و Environment Variables | من إعدادات PowerToys | محررين أسهل لملف hosts ومتغيرات البيئة |

**OCR** (Optical Character Recognition) يعني قراية الحروف من صورة. و **PID** رقم العملية.

> كل الأدوات دي شغالة طول ما PowerToys نفسه شغال في الخلفية. لو قفلته، الاختصارات وتغيير الزراير بيقفوا.

---

## الخلاصة

~~~text
winget show / install Microsoft.PowerToys   اعرفه وسطّبه من المصدر الرسمي
File Locksmith       مين ماسك الملف
Keyboard Manager     تغيير زراير، وبيشتغل بس وPowerToys شغال
~~~`,
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
          teach: R`## الصفحة دي بتعمل إيه

[[ms-settings:developers]] عنوان بيفتح صفحة For developers في Settings على طول. فيها مفاتيح on/off للمبرمجين. هنفك العنوان، وبعدين كل مفتاح، وبعدين أمر [[mklink]] اللي في آخر سطر لأنه الوحيد اللي بيتكتب. الصفحة نفسها شرحها من Microsoft Learn، والأوامر اتجربت على ويندوز 11 (build 26300).

---

## ١. العنوان: [[ms-settings:developers]]

| الحتة | معناها |
|---|---|
| [[ms-settings:]] | «افتح تطبيق Settings» (زي [[https:]] بيقول افتح المتصفح) |
| [[developers]] | اسم الصفحة جواه |

بتكتبه في Win+R أو في PowerShell بـ [[start ms-settings:developers]]. وفي نسخ ويندوز 11 الأحدث المفاتيح دي اتنقلت لـ System ثم Advanced، والعنوان بيوديك هناك.

---

## ٢. المفاتيح

| المفتاح | لما تفعّله |
|---|---|
| Developer Mode | تعمل symlinks من غير أدمن، وتسطّب تطبيقات من برّه الـ Store |
| End task | كليك يمين على أي برنامج في الـ taskbar فيه «End task» |
| File Explorer | إظهار الامتدادات والملفات المخفية والمسار الكامل في العنوان |
| PowerShell | تشغيل سكربتات PowerShell المحلية، زي ExecutionPolicy [[RemoteSigned]] |

**symlink** (symbolic link) ملف أو فولدر بيشاور على مكان تاني، زي اختصار بس البرامج بتشوفه كأنه الحاجة الأصلية.

مفتاح PowerShell بيغيّر نفس الإعداد اللي بتشوفه بـ [[Get-ExecutionPolicy -List]]. على الجهاز ده:

~~~text الناتج (PowerShell 7)
        Scope ExecutionPolicy
        ----- ---------------
MachinePolicy       Undefined
   UserPolicy       Undefined
      Process          Bypass
  CurrentUser       Undefined
 LocalMachine    RemoteSigned
~~~

[[LocalMachine]] = [[RemoteSigned]] يعني السكربتات اللي انت كاتبها تشتغل، واللي نازلة من النت لازم تكون موقّعة.

---

## ٣. آخر سطر: [[mklink /D shared C:\code\shared-lib]]

ده أمر CMD (مش PowerShell) بيعمل symlink لفولدر:

| الحتة | معناها |
|---|---|
| [[mklink]] | make link: اعمل link |
| [[/D]] | الـ link لفولدر (Directory)، من غيرها بيبقى لملف |
| [[shared]] | اسم الـ link الجديد |
| [[C:\code\shared-lib]] | المكان الحقيقي اللي بيشاور عليه |

لاحظ الترتيب: **الجديد الأول وبعدين الأصلي**، عكس [[ln -s]] في لينكس.

على الجهاز ده Developer Mode مقفول، وجرّبته في CMD عادي (مش أدمن) في فولدر تجربة:

~~~text الناتج
You do not have sufficient privilege to perform this operation.
~~~

ده بالظبط اللي Developer Mode بيحله: بعد ما تفعّله، نفس الأمر بيطبع [[symbolic link created for shared <<===>> C:\code\shared-lib]] من غير أدمن (الصيغة دي من docs بتاعة [[mklink]]، مفعّلتش الوضع هنا).

---

## الخلاصة

~~~text
ms-settings:developers   صفحة المطوّر (أو System ← Advanced)
Developer Mode           symlinks من غير أدمن
End task                 اقفل برنامج من الـ taskbar
mklink /D <الجديد> <الأصلي>   symlink لفولدر في CMD
~~~`,
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
          teach: R`## الحاجة دي بتعمل إيه

Dev Drive هارد (حقيقي أو ملف بيتعامل كهارد) متفرمت بنظام ملفات اسمه ReFS، و Defender بيفحصه بطريقة أخف. فالشغل اللي فيه آلاف الملفات الصغيرة ([[npm install]] والـ builds) بيبقى أسرع. خطوات العمل نفسها في Settings (من Microsoft Learn، متعملتش هنا)، وأمر [[fsutil]] اتجرب.

---

## ١. سطور المثال

| السطر | بيعمل إيه |
|---|---|
| [[ms-settings:disksandvolumes]] ← Create dev drive | صفحة Disks & volumes، وفيها الزرار |
| Create new VHD ← VHDX، Dynamically expanding، 50 GB+ | الاختيار الأأمن: ملف بيتعامل كهارد |
| [[D:\code\myapp]] | المشاريع مكانها هنا |
| [[setx /M npm_config_cache D:\packages\npm]] | (أدمن) انقل كاش npm هناك |
| [[fsutil devdrv query D:]] | (أدمن) اتأكد إنه Dev Drive وموثوق |

---

## ٢. المصطلحات

| الكلمة | معناها |
|---|---|
| **ReFS** | Resilient File System: نظام ملفات من مايكروسوفت، غير NTFS اللي على C |
| **VHD / VHDX** | Virtual Hard Disk: ملف واحد ويندوز بيركّبه كأنه هارد. VHDX النسخة الأحدث |
| **Dynamically expanding** | الملف بيكبر مع الاستخدام، مش بياخد الـ 50 جيجا من الأول |
| **performance mode** | Defender بيفحص الملف بعد ما يتفتح بدل ما يوقفه لحد ما يخلص |

---

## ٣. [[setx /M npm_config_cache D:\packages\npm]]

| الحتة | معناها |
|---|---|
| [[setx]] | اكتب متغير بيئة بشكل دايم (مش للترمنال الحالي بس) |
| [[/M]] | للجهاز كله (Machine)، وده محتاج أدمن. من غيره لليوزر بتاعك بس |
| [[npm_config_cache]] | متغير npm بيقرا منه مكان الكاش. أي متغير اسمه [[npm_config_X]] بيغيّر إعداد npm اسمه X |
| [[D:\packages\npm]] | المكان الجديد |

متشغّلش هنا لأنه بيغيّر الجهاز. وبعده لازم تقفل كل الترمنالات وتفتحها، لأن كل ترمنال بياخد نسخة من المتغيرات وهو بيفتح.

---

## ٤. [[fsutil devdrv query]]

[[fsutil]] أداة ويندوز لأنظمة الملفات، و [[devdrv]] الجزء الخاص بالـ Dev Drive، و [[query]] اسأل. من غير حرف درايف بيسأل عن الإعداد العام، وده اشتغل من غير أدمن:

~~~text الناتج (ويندوز 11 Home)
Developer volumes are enabled.

Developer volumes are protected by antivirus filter.
~~~

يعني الميزة متاحة على الجهاز، و Defender شغال عليها (في performance mode). ولما تديله درايف من غير أدمن:

~~~text الناتج: fsutil devdrv query C:
Failed to open the volume.
Error 5: Access is denied.
~~~

عشان كده المثال كاتب «(admin)». على درايف Dev Drive وانت أدمن بيقولك إنه trusted developer volume (من الـ docs).

---

## الخلاصة

~~~text
Dev Drive         ReFS + Defender أخف = npm install أسرع
VHD dynamic       أأمن اختيار، مش بيلمس الـ partitions
المشاريع والكاش   على Dev Drive. البرامج نفسها تفضل على C
fsutil devdrv query   اتأكد إنه شغال
~~~`,
          sol: R`[[ms-settings:disksandvolumes]] هيفتح Disks & volumes. لو نسختك بتدعم Dev Drive (ويندوز 11 22H2 بتحديث 2023 أو أحدث)، هتلاقي زرار «Create dev drive» فوق. دوسه يوريك الخيارات (VHD جديد، أو تصغير partition، أو مساحة فاضية) من غير ما تتنفذ حاجة. وجنب كل درايف المساحة الفاضية، ومحتاج 50 GB على الأقل فاضيين.

لو الزرار مش موجود، يبقى ويندوز أقدم من المطلوب أو ويندوز 10، حدّثه. وخد بالك: Dev Drive بيتفرمت ReFS وبيفرق في npm install مع Defender في وضع «performance mode». الفرق الحقيقي بيتقاس، مش مضمون نفس الرقم في كل جهاز.`
        }
      ]
    }
]);
