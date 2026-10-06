// تكملة تاب wsl: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/wsl/01.js (شرح حقول الدرس في أوله)
MORE("wsl", [
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
          teach: R`## الأول: إزاي لينكس بيشغّل [[.exe]] أصلًا؟

لينكس مبيفهمش ملفات [[.exe]]. لكن WSL بيسجّل في الـ kernel «مترجم» اسمه [[WSLInterop]]: أي ملف [[.exe]] تشغّله، الـ kernel يسلّمه لـ WSL، و WSL يشغّله على ويندوز ويوصّل الدخل والخرج بتاعه بـ bash. اسم الميزة **interop**. ده واضح لما تجرّب أدوات WSL في container أوبونتو عادي (مش WSL):

~~~text الناتج في Docker (مفيش interop)
grep: /proc/sys/fs/binfmt_misc/WSLInterop: No such file or directory
WSL Interopability is disabled. Please enable it before using WSL.
~~~

يعني الأدوات دي بتدوّر على الملف ده بالظبط. جوه WSL حقيقي هو موجود.

الأوامر اللي بتطبع ناتج ([[powershell.exe]] و [[cmd.exe]]) اتشغّلت على ويندوز 11 من Git Bash (نفس فكرة bash بينادي [[.exe]]). و [[clip.exe]] و [[notepad.exe]] و [[wslview]] متشغّلوش (بيغيّروا الكليب بورد أو بيفتحوا شبابيك)، وكلامهم من الـ docs.

---

## ١. [[cat ~/.ssh/id_ed25519.pub | clip.exe]]

اقراها من الشمال لليمين:

| الحتة | معناها |
|---|---|
| [[cat]] | اطبع محتوى الملف |
| [[~/.ssh/id_ed25519.pub]] | المفتاح **العام** بتاع SSH ([[.pub]] = public). ده اللي تديه لـ GitHub، مش اللي من غير [[.pub]] |
| [[|]] | pipe: بدل ما تطبعه على الشاشة، ابعته كدخل للأمر اللي بعدي |
| [[clip.exe]] | برنامج ويندوز بيحط اللي جاله في الكليب بورد |

الأمر مش بيطبع حاجة. بس بعدها Ctrl+V في أي مكان في ويندوز هيلزق سطر بيبدأ بـ [[ssh-ed25519 AAAA...]].

> [[.exe]] لازم يتكتب. [[clip]] لوحدها مش هيلاقيها.

---

## ٢. [[notepad.exe .env]]

يفتح ملف [[.env]] (الملف اللي فيه متغيرات البيئة للمشروع) في Notepad. WSL بيحوّل المسار لوحده لمسار [[\\wsl.localhost\...]] عشان Notepad يوصله.

> خد بالك: الحفظ من برامج ويندوز القديمة ممكن يغيّر نهاية السطور لـ CRLF (درس [[Git و line endings]]). لملفات المشروع استخدم [[code]] أو [[nano]].

---

## ٣. [[powershell.exe -c "Get-Date"]]

- [[powershell.exe]] هو Windows PowerShell 5.1 اللي جاي مع ويندوز.
- [[-c]] اختصار [[-Command]]: نفّذ الأمر ده واخرج.
- [[" "]] الأمر كله جوه تنصيص عشان يوصل لـ PowerShell كحتة واحدة.

~~~text الناتج
Tuesday, October 6, 2026 1:10:03 PM
~~~

الناتج رجع لـ bash، فتقدر تحطه في متغير أو تبعته بـ [[|]] لأمر لينكس.

---

## ٤. [[cmd.exe /c "ipconfig | findstr IPv4"]]

- [[cmd.exe]] هو CMD، و [[/c]] نفّذ واخرج (زي [[-c]]).
- [[ipconfig]] بيطبع كروت الشبكة، و [[findstr]] (زي [[grep]]) بيسيب السطور اللي فيها [[IPv4]].
- **ليه الـ [[|]] جوه التنصيص؟** عشان تتنفذ في CMD نفسه (والـ [[findstr]] أمر ويندوز). لو برة التنصيص bash هو اللي ياخدها.

~~~text الناتج
   IPv4 Address. . . . . . . . . . . : 192.168.1.65
   IPv4 Address. . . . . . . . . . . : 172.29.160.1
~~~

الأول IP الجهاز على الواي فاي، والتاني IP ويندوز على الشبكة الداخلية اللي بينه وبين WSL (درس [[الشبكة والبورتات]]).

---

## ٥. [[wslview https://github.com]]

بيفتح اللينك في المتصفح الافتراضي في ويندوز (زي [[open]] على الماك و [[xdg-open]] على لينكس). جاي من حزمة اسمها [[wslu]] (WSL utilities). لو مش موجود عندك سطّبها، وده اتجرّب على أوبونتو 24.04:

~~~text apt-cache policy wslu
wslu:
  Installed: (none)
  Candidate: 3.2.3-0ubuntu3
~~~

وبعد [[sudo apt install wslu]] بتنزل معاها أدوات تانية: [[wslview]] و [[wslvar]] (يقرا متغيرات بيئة ويندوز) و [[wslsys]] (معلومات النظام) وغيرهم.

---

## والعكس: لينكس من PowerShell

| من PowerShell | بيعمل إيه |
|---|---|
| [[wsl cat /etc/os-release]] | أمر لينكس في التوزيعة الافتراضية، والناتج يرجع لـ PowerShell |
| [[wsl -d Ubuntu-24.04 -u root whoami]] | في توزيعة معينة ([[-d]]) بيوزر معين ([[-u]]) |

(من الـ docs. الـ options دي متأكدة من [[wsl --help]]: [[--distribution, -d]] و [[--user, -u]].)

---

## الخلاصة

| السطر | بيعمل إيه |
|---|---|
| [[cat ... | clip.exe]] | ملف للكليب بورد |
| [[notepad.exe .env]] | افتح الملف في Notepad |
| [[powershell.exe -c "..."]] | أمر PowerShell والناتج يرجع لـ bash |
| [[cmd.exe /c "..."]] | أمر CMD |
| [[wslview URL]] | افتح لينك في متصفح ويندوز |

- [[.exe]] لازم يتكتب.
- الـ [[|]] جوه التنصيص للبرنامج التاني، وبرة التنصيص لـ bash.`,
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
          teach: R`## الأول: ٥ أوامر بتغيّر حاجات، فاقرا قبل ما تكتب

كل الأوامر دي في PowerShell، وكلها بتقفل أو بتنسخ أو بتمسح توزيعات. عشان كده **متشغّلتش** على الجهاز اللي جربنا عليه (التوزيعة الوحيدة هناك بتاعة Docker Desktop). الشرح من docs مايكروسوفت، ووصف كل option منقول من [[wsl --help]] اللي اتشغّل فعلًا (WSL 2.6.3).

---

## ١. [[wsl --shutdown]]

النص في [[wsl --help]]:

~~~text من wsl --help
--shutdown
    Immediately terminates all running distributions and the WSL 2
    lightweight utility virtual machine.
~~~

يعني بيقفل **كل** التوزيعات **والماكينة الافتراضية نفسها** فورًا. مش بيسأل، ومش بيستنى البرامج تحفظ. استخدامه:

- بعد تعديل [[.wslconfig]] أو [[wsl.conf]] (الإعدادات بتتقري بس لما الـ VM تقوم من الأول).
- لما WSL حاجز رام كتير وانت خلصت.

> لو Docker Desktop شغال على WSL، ده هيقفله هو كمان.

---

## ٢. [[wsl --terminate Ubuntu-24.04]]

[[--terminate]] (اختصاره [[-t]]) بعده **اسم** توزيعة: اقفل دي بس، والباقي يفضل شغال. أخف من [[--shutdown]]، وكفاية بعد تعديل [[wsl.conf]] بتاع توزيعة واحدة.

---

## ٣. [[wsl --export Ubuntu-24.04 D:\backup\ubuntu.tar]]

بياخد حاجتين: **اسم** التوزيعة، ثم **مسار ملف** على ويندوز.

| الحتة | معناها |
|---|---|
| [[--export]] | صدّر نظام ملفات التوزيعة كله في ملف واحد |
| [[Ubuntu-24.04]] | أنهي توزيعة (من عمود NAME) |
| [[D:\backup\ubuntu.tar]] | الملف الناتج. [[.tar]] = ملفات كتير ملزوقة في ملف واحد (من غير ضغط) |

الفولدر [[D:\backup]] لازم يكون موجود قبلها. وحسب [[wsl --help]] فيه [[--format]] بقيم [[tar]] و [[tar.gz]] و [[tar.xz]] و [[vhd]]، يعني تقدر تضغطه:

~~~powershell
wsl --export Ubuntu-24.04 D:\backup\ubuntu.tar.gz --format tar.gz
~~~

الملف فيه **كل حاجة**: البرامج والإعدادات والمشاريع ومفاتيح SSH. فخليه في مكان آمن.

---

## ٤. [[wsl --import Ubuntu-dev D:\wsl\dev D:\backup\ubuntu.tar]]

بياخد **٣** حاجات بالترتيب:

| الحتة | معناها |
|---|---|
| [[Ubuntu-dev]] | اسم **جديد** للتوزيعة اللي هتتعمل (لازم ميكونش مستخدم) |
| [[D:\wsl\dev]] | الفولدر اللي ديسك التوزيعة الجديدة ([[ext4.vhdx]]) هيتحط فيه |
| [[D:\backup\ubuntu.tar]] | الباك أب اللي هتتعمل منه |

بعدها [[wsl -l -v]] هيوريك [[Ubuntu-dev]] جنب الأصلية، والاتنين منفصلين تمامًا: اللي تعمله في واحدة مش بيأثر على التانية.

> التوزيعة الجاية من import بتدخل كـ **root**، لأن «مين اليوزر الافتراضي» مش جوه الـ tar. الحل: [[wsl --manage Ubuntu-dev --set-default-user you]] (موجود في [[wsl --help]] تحت [[--manage]])، أو قسم [[[user]]] فيه [[default=you]] في [[/etc/wsl.conf]].

---

## ٥. [[wsl --unregister Ubuntu-dev]]

من [[wsl --help]]:

~~~text من wsl --help
--unregister <Distro>
    Unregisters the distribution and deletes the root filesystem.
~~~

[[deletes the root filesystem]] يعني **بيمسح ديسك التوزيعة بكل اللي فيه**. مفيش سؤال «متأكد؟»، ومفيش سلة مهملات. الرجوع الوحيد من ملف export.

> قبل ما تكتبه: [[wsl -l -v]] واقرا الاسم مرتين. [[Ubuntu-dev]] و [[Ubuntu-24.04]] قريبين من بعض.

---

## الخلاصة

| الأمر | بيعمل إيه | خطير؟ |
|---|---|---|
| [[wsl --shutdown]] | اقفل كل التوزيعات والـ VM | بيقفل الشغال من غير حفظ |
| [[wsl --terminate اسم]] | اقفل توزيعة واحدة | نفس الكلام لتوزيعة واحدة |
| [[wsl --export اسم ملف.tar]] | باك أب كامل في ملف | لا |
| [[wsl --import اسم_جديد فولدر ملف.tar]] | توزيعة جديدة من الباك أب | لا |
| [[wsl --unregister اسم]] | امسح التوزيعة نهائيًا | **أيوه، مفيش رجوع** |

- الترتيب: export الأول، وبعدين أي حاجة تانية.`,
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
          teach: R`## الأول: ملفين مختلفين في مكانين مختلفين

المثال مش أوامر، ده **محتوى ملفين**:

| الملف | مكانه | بيتحكم في |
|---|---|---|
| [[.wslconfig]] | على **ويندوز**: [[C:\Users\you\.wslconfig]] | الماكينة الافتراضية كلها: رام، معالج، swap، شبكة. لكل التوزيعات |
| [[wsl.conf]] | جوه **كل توزيعة**: [[/etc/wsl.conf]] | التوزيعة دي بس: systemd، اليوزر، الـ mounts |

ملحوظة: [[%USERPROFILE%]] في CMD (أو [[$env:USERPROFILE]] في PowerShell) هو فولدر يوزرك، وعلى الجهاز اللي جربنا عليه طلع [[C:\Users\7ossa]].

الجهاز ده معندوش [[.wslconfig]] أصلًا ([[ls]] قال [[No such file or directory]])، ومعدّلناش فيه حاجة. فالقيم الافتراضية اتقاست فعلًا، والتعديلات نفسها من docs مايكروسوفت (Advanced settings configuration in WSL).

---

## شكل الملف (INI)

الاتنين بنفس الشكل:

~~~text
[اسم_القسم]
المفتاح=القيمة
~~~

- السطر اللي بين [[[ ]]] اسمه **section** (قسم)، وكل اللي تحته تابع له لحد القسم اللي بعده.
- [[#]] أول السطر تعليق.
- من غير مسافات حوالين [[=]] أحسن.

---

## الجزء الأول: [[.wslconfig]]

### [[[wsl2]]]

القسم ده لإعدادات WSL 2. أي حاجة برّاه في الملف ده مش هتتقري.

### [[memory=6GB]]

أقصى رام الـ VM تاخدها. الوحدة لازم تتكتب: [[GB]] أو [[MB]]. الافتراضي حسب الـ docs **٥٠٪ من رام ويندوز**. وده اتقاس على الجهاز ده (رام ويندوز [[31.4]] جيجا، ومفيش [[.wslconfig]])، بـ [[free -h]] جوه Docker اللي شغال على نفس الـ VM:

~~~text الناتج (القيم الافتراضية)
               total        used        free      shared  buff/cache   available
Mem:            15Gi       956Mi        13Gi        16Mi       985Mi        14Gi
Swap:          4.0Gi          0B       4.0Gi
~~~

[[15Gi]] تقريبًا نص الـ ٣١.٤. ولو كتبت [[memory=6GB]] الرقم ده هيبقى أقل من ٦ بشوية (الـ kernel بيحجز حتة لنفسه).

### [[processors=4]]

عدد الـ logical processors اللي الـ VM تشوفها. الافتراضي **كلهم**: [[nproc]] على الجهاز ده طلع [[16]]، نفس [[$env:NUMBER_OF_PROCESSORS]] في ويندوز.

### [[swap=2GB]]

مساحة من الديسك تتستعمل كرام لما الرام تخلص (أبطأ بكتير). الافتراضي حسب الـ docs **٢٥٪ من رام ويندوز** مقرّبة لأقرب جيجا لفوق، وده اللي ظهر فوق: [[4.0Gi]]. و [[swap=0]] بيلغيها.

### [[networkingMode=mirrored]]

الافتراضي [[nat]]: لينكس ورا شبكة داخلية ليها IP لوحده. [[mirrored]] (ويندوز 11 22H2 أو أحدث): لينكس بيشوف نفس كروت الشبكة وعناوين ويندوز. تفاصيله في درس [[الشبكة والبورتات]].

---

## الجزء التاني: [[/etc/wsl.conf]]

السطر [[# /etc/wsl.conf (inside Ubuntu)]] في المثال تعليق بيقولك إن اللي تحته ملف تاني.

### [[[boot]]] و [[systemd=true]]

[[boot]] = إقلاع، يعني «لما التوزيعة تقوم». و [[systemd=true]] شغّل systemd كأول برنامج (PID 1)، وهو اللي بيشغّل الخدمات زي Docker Engine و Postgres (درس [[systemd والخدمات]]).

### [[[user]]] و [[default=you]]

اليوزر اللي [[wsl]] بيدخلك بيه. مهم بعد [[--import]] لأن التوزيعة بتدخل كـ root.

### [[[automount]]] و [[options="metadata,umask=22,fmask=11"]]

[[automount]] = تركيب ديسكات ويندوز تحت [[/mnt]] لوحدها. و [[options]] بتتحكم في شكل الملفات هناك:

| الخيار | معناه |
|---|---|
| [[metadata]] | اسمح بـ [[chmod]] و [[chown]] على ملفات ويندوز (WSL بيخزن الصلاحيات في بيانات إضافية للملف) |
| [[umask=22]] | شيل صلاحية الكتابة من الجروب والباقيين، للملفات والفولدرات |
| [[fmask=11]] | للملفات بس: شيل صلاحية التشغيل من الجروب والباقيين |

### الـ mask بيتحسب إزاي؟

الصلاحيات أرقام octal (رقم لليوزر، رقم للجروب، رقم للباقيين)، و [[4]] قراية و [[2]] كتابة و [[1]] تشغيل. الـ mask هو اللي **بيتشال** من [[777]]. حسبناها في bash:

~~~bash
printf '%o %o\n' $((0777 & ~0022 & ~0011)) $((0777 & ~0022))
~~~

~~~text الناتج
744 755
~~~

يعني الملفات بقت [[744]] ([[rwxr--r--]]) والفولدرات [[755]] ([[rwxr-xr-x]])، بدل [[777]] اللي شفناها في درس [[ملفات ويندوز من لينكس]].

---

## بعد أي تعديل

1. احفظ الملف (واتأكد إن ويندوز مسمّاهوش [[.wslconfig.txt]]).
2. [[wsl --shutdown]] من PowerShell.
3. استنى كام ثانية وافتح أوبونتو تاني.
4. [[free -h]] و [[nproc]] للتأكد.

---

## الخلاصة

| السطر | الملف | معناه |
|---|---|---|
| [[[wsl2]]] | .wslconfig | قسم إعدادات الـ VM |
| [[memory=6GB]] | .wslconfig | أقصى رام (الافتراضي ٥٠٪) |
| [[processors=4]] | .wslconfig | عدد المعالجات (الافتراضي كلهم) |
| [[swap=2GB]] | .wslconfig | swap (الافتراضي ٢٥٪ من الرام) |
| [[networkingMode=mirrored]] | .wslconfig | نفس شبكة ويندوز |
| [[[boot]]] و [[systemd=true]] | wsl.conf | شغّل systemd |
| [[[user]]] و [[default=you]] | wsl.conf | اليوزر الافتراضي |
| [[[automount]]] و [[options]] | wsl.conf | صلاحيات ملفات [[/mnt/c]] |

- [[.wslconfig]] على ويندوز لكل WSL، و [[wsl.conf]] جوه التوزيعة لنفسها.
- مفيش حاجة بتتطبق من غير [[wsl --shutdown]].`,
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
          teach: R`## الأول: Docker حتتين

أي Docker فيه:

- **client**: أمر [[docker]] اللي بتكتبه.
- **daemon** (أو server/engine): البرنامج اللي شغال في الخلفية وبيشغّل الـ containers فعلًا.

الـ client بيبعت طلبات للـ daemon. والطريقتين في الدرس الفرق بينهم **الـ daemon فين**:

| | Docker Desktop | Docker Engine جوه أوبونتو |
|---|---|---|
| الـ daemon | في توزيعة خاصة اسمها [[docker-desktop]] | جوه أوبونتو بتاعك نفسه |
| التسطيب | برنامج ويندوز + تفعيل WSL integration | [[apt install]] زي السيرفر |
| محتاج systemd؟ | لا | أيوه |

أول سطرين اتشغّلوا على جهاز عليه Docker Desktop 4.82 (من PowerShell). وسطور التسطيب اتجرّبت في container أوبونتو 24.04 لحد ما ينفع (مفيش systemd في container).

---

## ١. [[docker version]]

بيطبع نسخة الـ client والـ server. لو الـ server مطلعش، يبقى الـ client مش لاقي daemon.

~~~text الناتج (مختصر)
Client:
 Version:           29.6.1
 OS/Arch:           windows/amd64
 Context:           desktop-linux

Server: Docker Desktop 4.82.0 (233772)
 Engine:
  Version:          29.6.1
  OS/Arch:          linux/amd64
~~~

| السطر | معناه |
|---|---|
| [[Client ... OS/Arch: windows/amd64]] | الأمر نفسه شغال على ويندوز |
| [[Context: desktop-linux]] | بيكلّم أنهي daemon (السطر الجاي) |
| [[Server: Docker Desktop 4.82.0]] | الـ daemon جاي من Docker Desktop |
| [[Engine ... OS/Arch: linux/amd64]] | والـ daemon نفسه **لينكس**: شغال جوه WSL 2 |

لو Engine جوه أوبونتو، السطر هيبقى [[Server: Docker Engine - Community]] أو نسخة أوبونتو بدل Docker Desktop.

---

## ٢. [[docker context ls]]

**context** = «أنهي daemon أكلّم وإزاي». [[ls]] = اعرضهم.

~~~text الناتج
NAME              DESCRIPTION                               DOCKER ENDPOINT
default           Current DOCKER_HOST based configuration   npipe:////./pipe/docker_engine
desktop-linux *   Docker Desktop                            npipe:////./pipe/dockerDesktopLinuxEngine
~~~

- النجمة [[*]] = المستخدم دلوقتي.
- [[npipe://]] (named pipe) طريقة ويندوز إن برنامجين يكلموا بعض.

جوه أوبونتو الـ endpoint بيبقى [[unix:///var/run/docker.sock]]: ملف خاص (socket) الـ client والـ daemon بيتكلموا عن طريقه. لو لقيت أكتر من context بنجوم بتتغير، يبقى عندك الطريقتين مع بعض، وده اللي الدرس بيقولك متعملوش.

---

## ٣. [[sudo apt install -y docker.io docker-compose-v2]]

ده لطريقة Engine بس. الحزمتين من مستودعات أوبونتو نفسها. على أوبونتو 24.04 [[apt-cache policy]] قال:

~~~text الناتج
docker.io:
  Candidate: 29.1.3-0ubuntu3~24.04.2
docker-compose-v2:
  Candidate: 2.40.3+ds1-0ubuntu1~24.04.1
~~~

| الحزمة | فيها |
|---|---|
| [[docker.io]] | الـ client والـ daemon (اسمها كده عشان [[docker]] كان اسم برنامج تاني قديم في Debian) |
| [[docker-compose-v2]] | أمر [[docker compose]] (بمسافة) |

[[Candidate]] = النسخة اللي هتتسطب لو سطّبت دلوقتي.

---

## ٤. [[sudo usermod -aG docker $USER]]

الـ daemon بيقبل أوامر من root أو من أعضاء جروب اسمه [[docker]]. فبدل [[sudo docker]] كل مرة، ضيف نفسك للجروب:

| الحتة | معناها |
|---|---|
| [[usermod]] | (user modify) عدّل يوزر |
| [[-a]] | (append) **ضيف** على جروباته، متمسحش القديمة |
| [[-G docker]] | الجروب ده |
| [[$USER]] | متغير فيه اسمك |

> من غير [[-a]]، [[-G docker]] بيخلي docker **الجروب الوحيد** ويشيلك من [[sudo]]. غلطة مشهورة.

جربناها في أوبونتو على يوزر [[you]]:

~~~text قبل وبعد (id you)
uid=1001(you) gid=1002(you) groups=1002(you)
uid=1001(you) gid=1002(you) groups=1002(you),1001(docker)
~~~

والجروب الجديد مبيظهرش في الترمنال المفتوح. الجلسة القديمة محتفظة بجروباتها القديمة، فلازم تخرج وتدخل (أو [[wsl --terminate]]).

---

## ٥. [[sudo systemctl enable --now docker]]

- [[systemctl]] الأداة اللي بتكلّم systemd.
- [[enable]] شغّل الخدمة دي **كل مرة** التوزيعة تقوم.
- [[--now]] وكمان شغّلها **دلوقتي**.

ده محتاج systemd شغال ([[systemd=true]] في [[wsl.conf]]). في container من غير systemd، [[systemctl is-system-running]] بيقول [[offline]] (جربناها في درس [[systemd والخدمات]])، وأي [[systemctl]] تاني مش هيشغّل حاجة.

---

## الخلاصة

| السطر | بيعمل إيه | لأنهي طريقة |
|---|---|---|
| [[docker version]] | Client و Server ومين الـ Server | الاتنين |
| [[docker context ls]] | بتكلّم أنهي daemon | الاتنين |
| [[sudo apt install -y docker.io docker-compose-v2]] | سطّب Engine و compose | Engine |
| [[sudo usermod -aG docker $USER]] | من غير sudo (اخرج وادخل) | Engine |
| [[sudo systemctl enable --now docker]] | شغّله دلوقتي ومع كل إقلاع | Engine |

- طريقة واحدة بس، مش الاتنين.
- لو [[docker version]] مطلعش [[Server:]]، الـ daemon مش شغال أو مش واصل له.`,
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
          teach: R`## الأول: ٣ أجهزة، ٣ عناوين

في الوضع الافتراضي (NAT)، الصورة كده:

| مين | العنوان | جه منين |
|---|---|---|
| ويندوز على الواي فاي | [[192.168.1.65]] | الراوتر |
| ويندوز على الشبكة الداخلية مع WSL | [[172.29.160.1]] | ويندوز عامل شبكة صغيرة لـ WSL |
| لينكس جوه WSL | [[172.x.x.x]] تاني | نفس الشبكة الداخلية |

أول رقمين ده ناتج حقيقي من الجهاز اللي جربنا عليه. وويندوز بيعمل حاجة لوحده: أي بورت لينكس بيسمع عليه بيبقى متاح على [[localhost]] في ويندوز (اسمها **localhost forwarding** في الـ docs). عشان كده [[localhost:3000]] من المتصفح بيشتغل. لكن **من جهاز تاني** (الموبايل) القصة مختلفة.

الأوامر اللي جوه لينكس اتشغّلت في container أوبونتو 24.04 (مش WSL، فالعناوين بتاعة Docker)، وأمر PowerShell على ويندوز نفسه.

---

## ١. [[ip addr show eth0 | grep inet]]

| الحتة | معناها |
|---|---|
| [[ip addr]] | اعرض عناوين كروت الشبكة ([[ip]] أداة الشبكة في لينكس) |
| [[show eth0]] | الكارت ده بس. [[eth0]] أول كارت ethernet، وده كارت WSL |
| [[| grep inet]] | سيب السطور اللي فيها العنوان بس |

~~~text الناتج (جوه container)
    inet 172.17.0.2/16 brd 172.17.255.255 scope global eth0
~~~

| الحتة | معناها |
|---|---|
| [[inet]] | عنوان IPv4 ([[inet6]] لو IPv6) |
| [[172.17.0.2]] | العنوان نفسه |
| [[/16]] | أول ١٦ bit (يعني [[172.17]]) اسم الشبكة، والباقي للأجهزة |
| [[brd 172.17.255.255]] | broadcast: عنوان «كله» في الشبكة دي |

جوه WSL هتلاقي حاجة شبيهة بـ [[172.x.x.x]]، وده عنوان **داخلي** محدش برة جهازك يوصله.

---

## ٢. [[cat /etc/resolv.conf]]

الملف اللي بيقول للينكس يسأل مين عن أسامي المواقع (DNS). في الـ container طلع:

~~~text الناتج (جوه container)
# Generated by Docker Engine.
nameserver 192.168.65.7
~~~

[[nameserver]] = عنوان سيرفر الـ DNS. والسطر اللي فوق تعليق بيقول مين كتب الملف. جوه WSL هتلاقي تعليق إن WSL هو اللي كتبه (حسب الـ docs، ومع DNS tunneling الحديث العنوان بيبقى [[10.255.255.254]]). ولو الملف ده بايظ، [[apt update]] بيفشل (درس [[مشاكل شائعة]]).

---

## ٣. [[powershell.exe -c "(Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias Wi-Fi).IPAddress"]]

ده أمر PowerShell بنشغّله من bash (درس [[أوامر ويندوز من لينكس]]). من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[Get-NetIPAddress]] | هات عناوين IP بتاعة ويندوز |
| [[-AddressFamily IPv4]] | IPv4 بس |
| [[-InterfaceAlias Wi-Fi]] | كارت الواي فاي بس (بالاسم اللي ويندوز مديهوله) |
| [[( ).IPAddress]] | من النتيجة خد خانة العنوان بس |

~~~text الناتج
192.168.1.65
~~~

ده العنوان اللي الموبايل يكتبه. ولو اسم الكارت عندك مختلف (زي [[Ethernet]])، شوف الأسامي كلها:

~~~text Get-NetIPAddress -AddressFamily IPv4 (جزء)
InterfaceAlias                     IPAddress
vEthernet (WSL (Hyper-V firewall)) 172.29.160.1
Wi-Fi                              192.168.1.65
Loopback Pseudo-Interface 1        127.0.0.1
~~~

[[vEthernet (WSL ...)]] ده كارت ويندوز على الشبكة الداخلية مع WSL.

---

## ٤. [[npm run dev -- --host 0.0.0.0]]

### الـ [[--]] لوحدها

[[npm run dev]] بيشغّل سكربت [[dev]] من [[package.json]]. و [[--]] معناها «أي حاجة بعدي مش لـ npm، ابعتها للسكربت». فـ [[--host 0.0.0.0]] بتوصل لـ Vite نفسه.

### [[0.0.0.0]] ضد [[127.0.0.1]]

السيرفر بيختار هو «بيسمع» على أنهي كارت:

- [[127.0.0.1]] (localhost): الطلبات اللي جاية **من نفس الجهاز** بس.
- [[0.0.0.0]]: من **أي كارت**، يعني من برة كمان.

جربناها بسيرفر Node صغير جوه container، وبورت 3000 متوصل لبورت 3999 على ويندوز. الطلب من ويندوز هنا جاي «من برة» الـ container، زي الموبايل بالنسبة لجهازك:

~~~text الناتج
listening on 127.0.0.1:3000
inside:
hello from linux
from windows:
curl failed exit=52
listening on 0.0.0.0:3000
inside:
hello from linux
from windows:
hello from linux
~~~

على [[127.0.0.1]] اشتغل من جوه بس، و [[curl]] من برة فشل ([[exit=52]] يعني السيرفر قفل من غير رد). على [[0.0.0.0]] اشتغل من الناحيتين.

> في WSL نفسه، المتصفح على ويندوز بيوصل حتى لو السيرفر على 127.0.0.1 (الـ localhost forwarding). الـ [[0.0.0.0]] بيفرق مع الموبايل والأجهزة التانية.

---

## ٥. [[curl -s localhost:3000 | head -3]]

- [[curl]] بيعمل طلب HTTP ويطبع الرد.
- [[-s]] (silent) من غير شريط التقدم.
- [[| head -3]] أول ٣ سطور بس (أول الـ HTML).

ده اختبار **من جوه**: لو نجح، السيرفر شغال. لكن زي ما شفنا فوق، نجاحه مش معناه إن الموبايل هيوصل.

---

## الموبايل عشان يوصل محتاج إيه؟

1. السيرفر على [[0.0.0.0]] (السطر ٤).
2. ويندوز يوصّل الطلب للينكس: في NAT محتاج [[netsh interface portproxy]] من PowerShell كمدير، أو [[networkingMode=mirrored]] في [[.wslconfig]] (لينكس بياخد عنوان ويندوز نفسه).
3. فايروول ويندوز يسمح بالبورت.

(الخطوتين ٢ و ٣ بيغيّروا إعدادات الجهاز فمتجرّبوش هنا، من الـ docs.)

---

## الخلاصة

| السطر | بيعمل إيه |
|---|---|
| [[ip addr show eth0 | grep inet]] | عنوان لينكس الداخلي |
| [[cat /etc/resolv.conf]] | مين الـ DNS |
| [[powershell.exe -c "...Get-NetIPAddress..."]] | عنوان ويندوز على الواي فاي (للموبايل) |
| [[npm run dev -- --host 0.0.0.0]] | السيرفر يسمع من برة |
| [[curl -s localhost:3000 | head -3]] | اختبار من جوه |

- [[localhost]] من ويندوز بيشتغل لوحده. الموبايل محتاج [[0.0.0.0]] + توصيل + فايروول.`,
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
git config --global credential.helper "/mnt/c/Program\ Files/Git/ucrt64/bin/git-credential-manager.exe"
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
          teach: R`## الأول: الحرف الخفي [[\r]]

كل سطر في ملف نصي بيخلص بحرف خفي اسمه «نهاية السطر»:

| النظام | نهاية السطر | بالحروف |
|---|---|---|
| لينكس والماك | **LF** (Line Feed) | [[\n]] |
| ويندوز | **CRLF** (Carriage Return + Line Feed) | [[\r\n]] |

يعني ملف ويندوز فيه حرف زيادة [[\r]] آخر كل سطر. bash مبيعتبروش مسافة، بيعتبره **جزء من الكلمة**. ومن هنا كل المشاكل.

كل اللي في الدرس ده اتشغّل في أوبونتو 24.04 جوه Docker (Git 2.43، bash 5.2.21)، ومسار Git Credential Manager اتأكد منه على ويندوز.

---

## ١. [[git config --global core.autocrlf input]]

| الحتة | معناها |
|---|---|
| [[git config]] | غيّر إعداد في Git |
| [[--global]] | لليوزر ده في كل المشاريع (بيتحفظ في [[~/.gitconfig]]) |
| [[core.autocrlf]] | الإعداد اللي بيحوّل نهايات السطور |
| [[input]] | وقت الـ commit حوّل CRLF لـ LF، ووقت الـ checkout متلمسش حاجة |

قيم [[autocrlf]] التلاتة:

| القيمة | وقت commit | وقت checkout | لمين |
|---|---|---|---|
| [[true]] | CRLF يتحوّل LF | LF يتحوّل CRLF | Git على ويندوز (ده الافتراضي هناك) |
| [[input]] | CRLF يتحوّل LF | ولا حاجة | **WSL** ولينكس |
| [[false]] | ولا حاجة | ولا حاجة | لو ملف [[.gitattributes]] بيتحكم |

على ويندوز [[git config --system --get core.autocrlf]] طلع [[true]]. يعني لو نفس الريبو اتعمله checkout من ويندوز وفتحته من WSL، الملفات فيها CRLF و Git في لينكس هيشوفها متغيرة.

جربنا ملف بـ CRLF مع [[input]]:

~~~text الناتج (git add ثم git ls-files --eol)
warning: in the working copy of 'w.txt', CRLF will be replaced by LF the next time Git touches it
i/lf    w/crlf  attr/                 	w.txt
~~~

[[i/lf]] = في الريبو (index) اتحفظ LF. [[w/crlf]] = في الفولدر عندك لسه CRLF. يعني [[input]] نضّف اللي داخل الريبو.

---

## ٢. [[git config --global core.filemode false]]

[[filemode]] = هل Git يتابع صلاحية التشغيل ([[x]]) بتاعة الملفات؟ على [[/mnt/c]] كل الملفات بتبان [[777]]، فـ Git يفتكر إن كل ملف اتغيرت صلاحيته. [[false]] = تجاهل الصلاحيات. بعد السطرين دول:

~~~text git config --global --list
core.autocrlf=input
core.filemode=false
~~~

> لو المشروع جوه [[~/projects]] (وده الصح) مش محتاج [[filemode false]]، وأحسن تسيبه عشان صلاحية التشغيل بتاعة السكربتات تتحفظ.

---

## ٣. [[git config --global credential.helper "/mnt/c/Program\ Files/Git/ucrt64/bin/git-credential-manager.exe"]]

**credential helper** = البرنامج اللي Git بيسأله على اليوزر والباسورد (أو التوكن) لما تعمل push على HTTPS. هنا بنقوله: استخدم **Git Credential Manager** بتاع ويندوز (اللي اتسطب مع Git for Windows)، فتسجّل دخول GitHub مرة واحدة من المتصفح، وويندوز و WSL يشاركوا نفس الحفظ.

| الحتة | معناها |
|---|---|
| [[/mnt/c/Program\ Files/]] | [[C:\Program Files]] من لينكس. الـ [[\ ]] قبل المسافة عشان الـ helper بيتشغّل كأمر shell، والمسافة من غيرها تقسمه |
| [[Git/ucrt64/bin/]] | فولدر برامج Git for Windows |
| [[git-credential-manager.exe]] | البرنامج نفسه، وبيشتغل من لينكس عادي لأنه [[.exe]] |

### المسار اتغير

مقالات كتير وشروحات قديمة بتكتب [[mingw64]] (وده اللي كان مكتوب في الدرس ده نفسه). على Git for Windows 2.56 المسار ده **مبقاش موجود**:

~~~text على ويندوز
$ ls "/c/Program Files/Git/mingw64/bin/"
ls: cannot access '/c/Program Files/Git/mingw64/bin/': No such file or directory
$ where.exe git-credential-manager
C:\Program Files\Git\ucrt64\bin\git-credential-manager.exe
~~~

والـ ReleaseNotes بتاعة Git for Windows بتقول إن [[mingw64]] اتشال وبقى [[ucrt64]]. يعني **اتأكد من المسار عندك** بـ [[where.exe git-credential-manager]] في PowerShell وحوّله لمسار لينكس.

> لو بتستخدم SSH keys مع GitHub (الأسهل في WSL)، مش محتاج السطر ده خالص.

---

## ٤. [[file src/index.js]]

[[file]] بيقرا أول الملف ويقولك نوعه، ولو فيه CRLF بيقولها صريحة:

~~~text الناتج
index.js: ASCII text
win.js: ASCII text, with CRLF line terminators
~~~

الأول LF (سليم)، والتاني اتكتب بـ CRLF.

---

## ٥. [[sed -i 's/\r$//' script.sh]]

### المشكلة الأول

سكربت اتكتب على ويندوز:

~~~text الناتج
script.sh: Bourne-Again shell script, ASCII text executable, with CRLF line terminators
bash: line 1: ./script.sh: cannot execute: required file not found
~~~

ليه؟ أول سطر [[#!/bin/bash\r]]، يعني لينكس بيدوّر على برنامج اسمه [[bash\r]] (بالحرف الخفي) ومش لاقيه. [[cat -A]] بيوري الحروف الخفية ([[^M]] = [[\r]] و [[$]] = آخر السطر):

~~~text cat -A script.sh
#!/bin/bash^M$
echo hi^M$
~~~

ولو الـ shebang [[#!/usr/bin/env bash]] الرسالة أوضح:

~~~text الناتج
/usr/bin/env: 'bash\r': No such file or directory
~~~

### الحل حتة حتة

| الحتة | معناها |
|---|---|
| [[sed]] | (stream editor) بيعدّل النص سطر سطر |
| [[-i]] | (in-place) عدّل الملف نفسه بدل ما تطبع |
| [[s/.../.../]] | استبدل: [[s/اللي بدوّر عليه/البديل/]] |
| [[\r$]] | حرف [[\r]] **في آخر السطر** ([[$]] = آخر السطر) |
| [[//]] | البديل فاضي، يعني امسحه |
| [[' ']] | تنصيص مفرد عشان bash ميلمسش الـ [[\]] ولا الـ [[$]] |

~~~text بعد sed
script.sh: Bourne-Again shell script, ASCII text executable
#!/bin/bash$
echo hi$
hi
~~~

[[with CRLF line terminators]] اختفت، و [[^M]] اختفت، والسكربت طبع [[hi]].

---

## الخلاصة

| السطر | بيعمل إيه |
|---|---|
| [[core.autocrlf input]] | اللي داخل الريبو يبقى LF |
| [[core.filemode false]] | تجاهل الصلاحيات (لـ [[/mnt/c]] بس) |
| [[credential.helper ".../ucrt64/.../git-credential-manager.exe"]] | تسجيل دخول GitHub من ويندوز |
| [[file اسم]] | فيه CRLF؟ |
| [[sed -i 's/\r$//' اسم]] | شيل الـ CR |

- الحل الدائم للفريق كله: ملف [[.gitattributes]] فيه [[* text=auto eol=lf]].
- مسار credential manager اتأكد منه عندك، مش من مقالة.`,
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
          teach: R`## الأول: مين بيشغّل الخدمات؟

**خدمة** (service) برنامج شغال في الخلفية على طول، زي قاعدة بيانات مستنية اتصالات. في أوبونتو، اللي بيشغّل الخدمات ويقومها مع الجهاز ويرجّعها لو وقعت اسمه **systemd**، وهو أول برنامج بيقوم (رقمه PID 1). وأداة التحكم فيه [[systemctl]].

في WSL، systemd بيشتغل بس لو [[systemd=true]] في [[/etc/wsl.conf]] (درس [[.wslconfig و wsl.conf]]).

الدرس اتجرّب في أوبونتو 24.04 جوه Docker. و Docker **مفيهوش** systemd، وده بيخلينا نشوف بالظبط شكل المشكلة لما systemd مش موجود. وشغّلنا Postgres بالطريقة اليدوية عشان نجرّب الباقي.

---

## ١. [[systemctl is-system-running]]

بيسأل systemd: «انت شغال وكله تمام؟». في الـ container:

~~~text الناتج
offline
~~~

وبرنامج رقم 1 هناك كان [[bash]] مش [[systemd]] ([[ps -p 1 -o comm=]] طبع [[bash]]). ده نفس اللي هيحصل في WSL من غير [[systemd=true]].

| الرد | معناه |
|---|---|
| [[running]] | كله تمام |
| [[degraded]] | شغال، بس فيه خدمة واحدة أو أكتر فشلت. شائع في WSL ومش مشكلة غالبًا ([[systemctl --failed]] يوريك مين) |
| [[offline]] | systemd مش شغال أصلًا |

---

## ٢. [[sudo apt install -y postgresql]]

بيسطّب Postgres، وعلى أوبونتو 24.04 النسخة 16. الحزمة بتعمل **cluster** (نسخة شغالة من قاعدة البيانات) جاهز. [[pg_lsclusters]] بيعرضه:

~~~text الناتج (قبل التشغيل)
Ver Cluster Port Status Owner    Data directory              Log file
16  main    5432 down   postgres /var/lib/postgresql/16/main /var/log/postgresql/postgresql-16-main.log
~~~

| العمود | معناه |
|---|---|
| [[Ver]] و [[Cluster]] | النسخة 16، والاسم [[main]] |
| [[Port]] | [[5432]]، البورت الافتراضي لـ Postgres |
| [[Status]] | [[down]] واقف (مفيش systemd يشغّله) |
| [[Owner]] | يوزر لينكس اسمه [[postgres]] اتعمل مخصوص |
| [[Data directory]] | مكان الداتا الفعلية |

مع systemd كان هيبقى [[online]] على طول بعد التسطيب.

---

## ٣. [[sudo systemctl enable --now postgresql]]

- [[enable]] قوم الخدمة كل ما WSL يقوم.
- [[--now]] وشغّلها دلوقتي كمان.

في الـ container ده مستحيل، فشغّلناها بالطريقة اليدوية بتاعة أوبونتو [[pg_ctlcluster 16 main start]]، والحالة بقت:

~~~text الناتج
16  main    5432 online postgres /var/lib/postgresql/16/main ...
~~~

> الفرق: اليدوي لازم يتعاد كل مرة WSL يقوم. [[enable]] بيعملها لوحده.

---

## ٤. [[sudo -u postgres psql -c "SELECT version();"]]

| الحتة | معناها |
|---|---|
| [[sudo -u postgres]] | نفّذ **كيوزر لينكس اسمه postgres** (مش root) |
| [[psql]] | برنامج Postgres في الترمنال |
| [[-c "..."]] | نفّذ الأمر ده واخرج |
| [[SELECT version();]] | استعلام SQL بيرجّع نسخة السيرفر |

~~~text الناتج
                                                                 version
------------------------------------------------------------------------------------------------------------------------------------------
 PostgreSQL 16.15 (Ubuntu 16.15-0ubuntu0.24.04.1) on x86_64-pc-linux-gnu, compiled by gcc (Ubuntu 13.3.0-6ubuntu2~24.04.1) 13.3.0, 64-bit
(1 row)
~~~

### ليه دخل من غير باسورد؟

ملف [[pg_hba.conf]] (hba = host-based authentication) بيحدد مين يدخل إزاي. أول سطرين فيه:

~~~text pg_hba.conf (جزء)
local   all             postgres                                peer
host    all             all             127.0.0.1/32            scram-sha-256
~~~

- [[local ... peer]]: الاتصال من نفس الجهاز عن طريق ملف socket، و [[peer]] معناها «لو يوزر لينكس اسمه زي يوزر Postgres، ادخل». عشان كده [[sudo -u postgres]] دخل.
- [[host ... scram-sha-256]]: الاتصال بالشبكة (TCP) حتى من [[127.0.0.1]] محتاج **باسورد**.

وده اللي هيقابلك من DBeaver على ويندوز (بيتصل TCP). جربناه بباسورد غلط:

~~~text الناتج
psql: error: connection to server at "localhost" (::1), port 5432 failed: FATAL:  password authentication failed for user "postgres"
~~~

وبعد [[ALTER USER postgres PASSWORD 'dev']] (رد بـ [[ALTER ROLE]]) نفس الاتصال بالباسورد [[dev]] نجح.

---

## ٥. [[sudo systemctl status postgresql --no-pager | head -5]]

- [[status]] حالة الخدمة: شغالة ولا لأ، من إمتى، وآخر سطور من اللوج.
- [[--no-pager]] اطبع على طول، متفتحش [[less]] تستنى فيه تدوس [[q]].
- [[| head -5]] أول ٥ سطور بس.

المهم فيها سطر [[Active:]]: لو [[active (running)]] أو [[active (exited)]] يبقى تمام. (حسب docs أوبونتو: خدمة [[postgresql]] نفسها غلاف بيشغّل الـ clusters، فممكن تقول [[active (exited)]] والسيرفر شغال عادي.) في الـ container مفيش systemd فمتجرّبش.

---

## الخلاصة

| السطر | بيعمل إيه |
|---|---|
| [[systemctl is-system-running]] | systemd شغال؟ ([[offline]] = لأ) |
| [[sudo apt install -y postgresql]] | سطّب Postgres 16 |
| [[sudo systemctl enable --now postgresql]] | شغّله دلوقتي ومع كل مرة |
| [[sudo -u postgres psql -c "SELECT version();"]] | اتأكد إنه بيرد |
| [[sudo systemctl status postgresql --no-pager]] | الحالة |

- [[offline]] = حط [[systemd=true]] و [[wsl --shutdown]].
- من نفس الجهاز بـ [[sudo -u postgres]] من غير باسورد، ومن DBeaver محتاج باسورد.`,
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
          teach: R`## الأول: ٣ مشاكل، وكل واحدة ليها سطور

| المشكلة | السطور | بتتكتب فين |
|---|---|---|
| DNS: [[apt update]] بيفشل | ١ لـ ٥ | جوه أوبونتو |
| الساعة غلط | ٦ | جوه أوبونتو |
| ديسك ويندوز بيخلص | ٧ و ٨ | PowerShell **كمدير** |

سطور لينكس اتجرّبت في أوبونتو 24.04 جوه Docker (مع الفروق اللي تحت). وسطور ويندوز بتقفل WSL أو بتعدّل ملف الديسك، فمتشغّلتش، بس اتأكدنا من اللي ينفع نتأكد منه على ويندوز 11 Home.

> قبل أي حاجة: [[wsl --update]]. نسخ WSL الحديثة فيها **DNS tunneling** مفعّل افتراضيًا (حسب الـ docs) وبيحل أغلب مشاكل الـ DNS مع VPN.

---

## المشكلة ١: DNS

### السطور ١ لـ ٤: [[sudo tee -a /etc/wsl.conf > /dev/null <<'EOF']]

ده أمر واحد على ٤ سطور. من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[<<'EOF']] | **heredoc**: السطور اللي بعدي لحد سطر فيه [[EOF]] لوحده هي الدخل. والتنصيص حوالين [[EOF]] معناه «متغيّرش أي [[$]] جواها» |
| [[tee -a /etc/wsl.conf]] | [[tee]] بياخد الدخل ويكتبه في ملف. و [[-a]] (append) **ضيف في الآخر**، متمسحش اللي موجود |
| [[sudo]] | الملف في [[/etc]] ومحتاج root |
| [[> /dev/null]] | [[tee]] كمان بيطبع اللي كتبه على الشاشة. [[/dev/null]] «سلة» بترمي أي حاجة، فمش هتشوف تكرار |

### ليه مش [[sudo echo ... > /etc/wsl.conf]]؟

لأن [[>]] بيعمله الـ shell **بتاعك** (مش root) قبل ما [[sudo]] يشتغل، فهيقول Permission denied. [[tee]] هو اللي بيفتح الملف، وهو اللي شغال بـ sudo.

### وليه [[-a]] مهمة؟

الملف غالبًا فيه [[systemd=true]] وممكن اليوزر الافتراضي. من غير [[-a]] هيتمسحوا. جربناها على ملف فيه [[[boot]]] قبلها:

~~~text cat /etc/wsl.conf بعد الأمر
[boot]
systemd=true
[network]
generateResolvConf=false
~~~

القديم فضل، والجديد اتضاف تحته. و [[generateResolvConf=false]] معناها: «يا WSL متكتبش [[/etc/resolv.conf]] لوحدك، أنا هكتبه».

### السطر ٥: [[sudo rm /etc/resolv.conf && echo "nameserver 1.1.1.1" | sudo tee /etc/resolv.conf]]

1. [[sudo rm /etc/resolv.conf]]: امسح الملف القديم. في WSL ده غالبًا **رابط** (symlink) لملف WSL بيولّده، فلازم يتشال عشان تكتب ملف حقيقي مكانه (من الـ docs).
2. [[&&]] لو اتمسح كمّل.
3. [[echo "nameserver 1.1.1.1"]] السطر الجديد. [[1.1.1.1]] DNS عام من Cloudflare (أو [[8.8.8.8]] بتاع Google).
4. [[| sudo tee /etc/resolv.conf]] اكتبه في الملف (من غير [[-a]]، يعني ملف جديد). وهنا مفيش [[> /dev/null]]، فهتشوف السطر مطبوع، وده تأكيد.

> في Docker الملف ده متركّب من برة، فـ [[rm]] قال [[Device or resource busy]]. ده بتاع Docker بس، مش WSL.

ولازم بعدها [[wsl --shutdown]] عشان [[generateResolvConf]] تتقري، وتتأكد إن الملف لسه [[nameserver 1.1.1.1]].

---

## المشكلة ٢: الساعة

### السطر ٦: [[sudo hwclock -s]]

[[hwclock]] (hardware clock) بيتعامل مع ساعة الجهاز، و [[-s]] (من [[--hctosys]]: hardware clock to system) معناها «ظبّط ساعة لينكس من ساعة الجهاز». فكرته إن بعد sleep ساعة WSL بتتأخر، وساعة الجهاز (اللي ويندوز ماشي عليها) مظبوطة.

في التجربة طلعت حاجتين مهمين:

~~~bash
which hwclock || echo "no hwclock"
~~~

~~~text الناتج في container أوبونتو 24.04
no hwclock
~~~

يعني الأمر **مش متسطب** في الصورة الصغيرة، وبييجي من حزمة [[util-linux-extra]]. وبعد ما سطّبناها:

~~~text الناتج
hwclock: Cannot access the Hardware Clock via any known method.
~~~

لأن الماكينة الافتراضية مفيهاش ساعة hardware حقيقية تقراها. نفس الرسالة دي بتطلع في نسخ WSL كتير. الحل المضمون: [[wsl --shutdown]] من PowerShell وافتح تاني، فالساعة تتظبط من ويندوز وهي بتقوم.

---

## المشكلة ٣: الديسك

لينكس كله عايش في ملف واحد على ويندوز اسمه [[ext4.vhdx]] (virtual hard disk). الملف بيكبر لما تكتب، و**مبيصغرش لوحده** لما تمسح.

### السطر ٧: [[wsl --shutdown]]

لازم الملف ميكونش مفتوح وانت بتضغطه. (شرحه في درس [[إدارة WSL]].)

### السطر ٨: [[Optimize-VHD -Path "..." -Mode Full]]

| الحتة | معناها |
|---|---|
| [[Optimize-VHD]] | أمر PowerShell بيضغط ملف ديسك افتراضي (بيرجّع المساحة الفاضية لويندوز) |
| [[-Path "..."]] | مسار ملف [[ext4.vhdx]] |
| [[$env:LOCALAPPDATA]] | فولدر [[C:\Users\you\AppData\Local]] |
| [[-Mode Full]] | ضغط كامل (أبطأ وأحسن) |

**بس:** الأمر ده جزء من Hyper-V، ومش موجود على ويندوز Home. ده الناتج الحقيقي على ويندوز 11 Home:

~~~text الناتج
Optimize-VHD: The term 'Optimize-VHD' is not recognized as a name of a cmdlet, function, script file, or executable program.
~~~

البدائل (من الـ docs و [[wsl --help]]):

| الطريقة | ينفع على Home؟ |
|---|---|
| [[Optimize-VHD]] | لا، Pro و Enterprise بس |
| [[diskpart]] ثم [[select vdisk file="..."]] و [[compact vdisk]] | أيوه |
| [[wsl --manage Ubuntu-24.04 --set-sparse true]] | أيوه. الـ help بيقول إنه بيخلي الملف «sparse» فالمساحة ترجع **لوحدها** |

### المسار اللي في المثال مش ثابت

المسار ده بتاع التوزيعات اللي اتسطبت من الـ Store زمان. المسار الحقيقي متسجل في الـ registry، وده أمر **بيقرا بس**:

~~~powershell
Get-ChildItem HKCU:\Software\Microsoft\Windows\CurrentVersion\Lxss | % { "{0} -> {1}" -f $_.GetValue("DistributionName"), $_.GetValue("BasePath") }
~~~

| الحتة | معناها |
|---|---|
| [[HKCU:\...\Lxss]] | مفتاح في الـ registry فيه مفتاح فرعي لكل توزيعة (Lxss اسم WSL القديم) |
| [[%]] | اختصار [[ForEach-Object]]: لكل واحد |
| [[$_]] | العنصر الحالي |
| [[.GetValue("BasePath")]] | الفولدر اللي فيه [[ext4.vhdx]] |
| [[-f]] | ركّب النص: [[{0}]] أول قيمة و [[{1}]] التانية |

~~~text الناتج على الجهاز ده
docker-desktop -> \\?\C:\Users\7ossa\AppData\Local\Docker\wsl\main
~~~

عندك هيظهر سطر لأوبونتو. حط [[\ext4.vhdx]] في آخر مساره واستخدمه في [[-Path]].

---

## الخلاصة

| السطر | المشكلة | بيعمل إيه |
|---|---|---|
| ١ لـ ٤ | DNS | ضيف [[generateResolvConf=false]] لـ [[wsl.conf]] من غير ما تمسح القديم |
| ٥ | DNS | امسح [[resolv.conf]] واكتب [[nameserver 1.1.1.1]] |
| ٦ | الساعة | [[hwclock -s]]، ولو فشل [[wsl --shutdown]] |
| ٧ | الديسك | اقفل WSL |
| ٨ | الديسك | اضغط [[ext4.vhdx]] (Pro بس، وعلى Home [[diskpart]] أو [[--set-sparse]]) |

- جرّب [[wsl --update]] الأول.
- [[sudo tee]] لأي ملف محتاج root، و [[-a]] عشان متمسحش اللي فيه.`,
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
]);
