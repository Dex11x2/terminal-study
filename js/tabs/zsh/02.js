// تكملة تاب zsh: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/zsh/01.js (شرح حقول الدرس في أوله)
MORE("zsh", [
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

المتوقع إن الكابل يطلع Responsiveness أعلى وسرعة أثبت من الواي فاي، خصوصًا لو بعيد عن الراوتر. لو الواي فاي أقل بكتير، المشكلة غالبًا في الإشارة مش الخط. و Responsiveness واطية مع سرعة عالية معناها إن النت بيعلق لما حد تاني بيحمّل. ولو قالك command not found يبقى نسختك أقدم من Monterey.

(ده ماك بس، ومش متجرب هنا. اتأكدت من صفحة [[man networkQuality]]: [[-v]] تفاصيل أكتر، و [[-s]] الرفع والتحميل ورا بعض بدل مع بعض، وإنه بيستهلك من باقة النت.)`
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

لو [[ifconfig en0]] مفيهوش سطر inet، يبقى en0 مش الكارت اللي انت متوصل بيه (مثلًا على Mac بكابل أو بعض الموديلات الواي فاي بيبقى en1)؛ [[route -n get default]] بيقولك الـ interface الصح في سطر interface، و [[networksetup -listallhardwareports]] يوريك أنهي en هو Wi-Fi. سطر [[inet6]] ده IPv6 مش هو المطلوب.

(ده ماك بس: من صفحات [[man ifconfig]] و [[man route]] و [[man networksetup]] بتاعة Apple، والأرقام مثال. مش متجرب هنا.)`
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

الاتنين مختلفين لأن الراوتر بيعمل NAT. لو [[getifaddr en0]] مطبعش حاجة، يبقى الكارت ده مش متوصل، جرب [[en1]]. ولو [[curl ifconfig.me]] طبع IP غريب مش بتاع مزود النت، يبقى انت على VPN.

(جربت [[curl ifconfig.me]] على لينكس: طبع الـ IP من غير سطر جديد في الآخر فعلًا. [[ipconfig getifaddr]] ماك بس، من صفحة [[man ipconfig]] بتاعة Apple، مش متجرب هنا.)`
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

لو لسه بيفتح القديم: المتصفح نفسه عنده كاش (Chrome: chrome://net-internals/#dns ثم Clear host cache)، أو راوتر البيت عامل كاش، أو الـ TTL القديم عند الـ DNS بتاعك لسه مخلصش؛ اتأكد إن السجل اتغير فعلًا بـ [[dig @1.1.1.1 yourdomain.com]]. ولو ملف [[/etc/hosts]] فيه سطر للدومين ده، هو اللي بيكسب على أي DNS.

(ده ماك بس: الأمر من صفحة دعم Apple عن مسح كاش الـ DNS، مش متجرب هنا.)`
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
    }
]);
