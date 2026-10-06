// تكملة تاب zsh: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/zsh/01.js (شرح حقول الدرس في أوله)
MORE("zsh", [
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
          teach: R`## الفكرة

٨ سطور على مرحلتين: الأربعة الأولى **بتقرا** بس (مين اليوزرز؟ ورقم كل واحد؟ وبيانات واحد منهم؟ وهو أدمن؟)، والأربعة الأخيرة **بتغيّر** (اعمل يوزر، واعمل أدمن، واسأل عن الـ token، وامسح). [[dscl]] و [[sysadminctl]] ماك بس، والشرح والناتج من [[man dscl]] و [[man sysadminctl]] ودليل Apple للـ deployment (مفيش ماك هنا). الحتت اللي مش ماك بس ([[grep -v]] و [[id]]) جرّبتها في zsh على أوبونتو 24.04 جوه Docker.

---

## ١. [[dscl . list /Users | grep -v '^_']]

نفكّه من الشمال لليمين، زي ما بيتنفّذ:

### [[dscl]]

Directory Service command line: بيقرا ويكتب في «الدليل»، القاعدة اللي الماك شايل فيها اليوزرز والجروبات (بدل [[/etc/passwd]] في لينكس).

### [[.]]

أي دليل؟ النقطة معناها **الجهاز ده** (الدليل المحلي). في الشركات ممكن يبقى فيه دليل على سيرفر.

### [[list /Users]]

[[list]] اطبع اللي تحت المسار ده، و [[/Users]] «فولدر» اليوزرز جوه الدليل (مش [[/Users]] اللي على الديسك، ده اسم جوه القاعدة).

### [[| grep -v '^_']]

- [[|]] (pipe) ناتج اللي على الشمال يدخل للي على اليمين.
- [[grep]] بيسيب السطور اللي فيها نمط، و [[-v]] بيعكس: اطبع اللي **مش** فيها.
- [[^_]] النمط: [[^]] أول السطر، و [[_]] الحرف نفسه. يعني «سطر بيبدأ بـ _».
- علامات التنصيص [[' ']] عشان zsh ميحاولش يفهم الرموز.

جرّبت الـ grep على لستة شبه اللي dscl بيطلعها:

~~~zsh
printf '_www\n_spotlight\ndaemon\nnobody\nroot\nsara\n' | grep -v '^_'
~~~

~~~text الناتج
daemon
nobody
root
sara
~~~

[[_www]] و [[_spotlight]] اختفوا: دول يوزرز خدمات. على ماك حقيقي اللستة الأصلية فيها أكتر من ١٠٠ يوزر بيبدأوا بـ [[_]].

---

## ٢. [[dscl . list /Users UniqueID | grep -v '^_']]

نفس الأمر، وزيادة اسم خانة: [[UniqueID]] (الـ UID، رقم اليوزر). فكل سطر بيبقى الاسم وجنبه رقمه (الشكل من الـ docs):

~~~text شكل الناتج
daemon                  1
nobody                  -2
root                    0
sara                    501
~~~

[[root]] دايمًا 0، واليوزرز اللي بتعملهم بيبدأوا من **501** على الماك (على لينكس من 1000).

---

## ٣. [[dscl . read /Users/sara RealName UniqueID NFSHomeDirectory UserShell]]

[[read]] اطبع بيانات حاجة واحدة، والكلمات بعد المسار هي الخانات اللي عايزها بس:

| الخانة | معناها |
|---|---|
| [[RealName]] | الاسم الكامل اللي في شاشة الدخول |
| [[UniqueID]] | الـ UID |
| [[NFSHomeDirectory]] | فولدر الـ home (الاسم قديم من أيام NFS) |
| [[UserShell]] | الشيل، على الماك الحديث [[/bin/zsh]] |

~~~text شكل الناتج (من الـ docs)
NFSHomeDirectory: /Users/sara
RealName:
 Sara Ahmed
UniqueID: 501
UserShell: /bin/zsh
~~~

المقابل في لينكس سطر واحد في [[/etc/passwd]]:

~~~zsh
getent passwd sara
~~~

~~~text الناتج (أوبونتو)
sara:x:1001:1001::/home/sara:/bin/zsh
~~~

---

## ٤. [[id sara]]

نفس الأمر في لينكس والماك: الـ UID والجروب الأساسي وكل الجروبات. ده الناتج في الـ container:

~~~text الناتج (أوبونتو)
uid=1001(sara) gid=1001(sara) groups=1001(sara)
~~~

وعلى الماك (من الـ docs) الجروب الأساسي [[20(staff)]]، ولو اليوزر أدمن هتلاقي في الجروبات [[80(admin)]]. ده السؤال اللي بيجاوب «أنا أدمن؟».

---

## ٥. [[sudo sysadminctl -addUser ali -fullName "Ali Hassan" -password -]]

| الحتة | معناها |
|---|---|
| [[sudo]] | التغيير محتاج صلاحيات root |
| [[sysadminctl]] | system administration control: أداة Apple لإدارة اليوزرز |
| [[-addUser ali]] | اعمل يوزر اسم الدخول بتاعه [[ali]] (وفولدره [[/Users/ali]]) |
| [[-fullName "Ali Hassan"]] | الاسم الكامل، بين علامات تنصيص لأن فيه مسافة |
| [[-password -]] | الشرطة = «اسألني»، فالباسورد ميتكتبش في الأمر ولا في [[~/.zsh_history]] |

هيسألك مرتين: باسوردك انت (عشان sudo)، وبعدين باسورد ali الجديد. وبيطبع سطور لوج أولها التاريخ.

---

## ٦. [[sudo sysadminctl -addUser dev ... -admin -adminUser sara -adminPassword -]]

نفس اللي فات وزيادة ٣ حاجات:

- [[-admin]] خليه أدمن (يدخل جروب admin).
- [[-adminUser sara]] أدمن موجود بيوافق على العملية.
- [[-adminPassword -]] باسورد sara، وبرضه [[-]] = اسألني.

### ليه sara توافق؟ الـ secure token

على Apple Silicon، فتح الديسك المتشفر (FileVault) بعد restart وتحديث macOS محتاجين يوزر معاه «secure token». أول يوزر عمل setup للجهاز بياخده. أي يوزر جديد بياخده بس لو يوزر معاه token وافق. فـ sara (عندها token) بتدّيه لـ dev في نفس الأمر.

---

## ٧. [[sysadminctl -secureTokenStatus dev]]

بيسأل بس، فمش محتاج sudo. بيقول [[ENABLED]] أو [[DISABLED]] (من الـ docs).

---

## ٨. [[sudo sysadminctl -deleteUser ali -keepHome]]

[[-deleteUser ali]] امسح اليوزر، و [[-keepHome]] سيب فولدر [[/Users/ali]] بملفاته. من غير [[-keepHome]] الفولدر بيتمسح كمان، **ومن غير ما يسألك**.

---

## ملخص السطور

| # | السطر | بيقرا ولا بيغيّر |
|---|---|---|
| ١ | [[dscl . list /Users]] | بيقرا: الأسامي |
| ٢ | [[... UniqueID]] | بيقرا: الأسامي والأرقام |
| ٣ | [[dscl . read /Users/sara ...]] | بيقرا: بيانات واحد |
| ٤ | [[id sara]] | بيقرا: الجروبات (أدمن؟) |
| ٥ | [[-addUser ali]] | بيغيّر: يوزر standard |
| ٦ | [[-addUser dev ... -admin -adminUser sara]] | بيغيّر: أدمن بـ token |
| ٧ | [[-secureTokenStatus]] | بيقرا |
| ٨ | [[-deleteUser ali -keepHome]] | بيغيّر: مسح من غير undo |

## مقارنة مع لينكس

| | الماك | لينكس |
|---|---|---|
| اليوزرز متخزنين فين | Directory Services | [[/etc/passwd]] |
| اعرضهم | [[dscl . list /Users]] | [[getent passwd]] |
| اعمل يوزر | [[sysadminctl -addUser]] | [[useradd -m]] |
| امسح | [[sysadminctl -deleteUser]] | [[userdel -r]] |
| أول UID عادي | 501 | 1000 |

---

## الخلاصة

~~~text
dscl . list / read     اقرا اليوزرز من الدليل (بدل /etc/passwd)
grep -v '^_'           شيل يوزرز الخدمات اللي بتبدأ بـ _
id                     80(admin) في الجروبات = أدمن
sysadminctl -password -   الشرطة = اسألني، متكتبش الباسورد في الأمر
-adminUser             أدمن عنده token يوافق، عشان الجديد ياخد secure token
~~~`,
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
          teach: R`## الفكرة

«أدمن» على الماك مش صفة في اليوزر، هو **عضوية في جروب** اسمه [[admin]]. فالدرس كله: اسأل ali في الجروب ولا لأ، ضيفه، اتأكد، شيله، اتأكد تاني. [[dseditgroup]] ماك بس، والشرح من [[man dseditgroup]] (مفيش ماك هنا)، وشكل رد checkmember من سكربتات منشورة بتستخدمه.

---

## ١. [[dseditgroup -o checkmember -m ali admin]]

| الحتة | معناها |
|---|---|
| [[dseditgroup]] | Directory Service edit group: عدّل جروبات الدليل (نفس الدليل اللي [[dscl]] بيقراه) |
| [[-o checkmember]] | العملية (operation): اسأل عن عضوية |
| [[-m ali]] | العضو (member) اللي بنسأل عنه |
| [[admin]] | الجروب، دايمًا آخر كلمة |

~~~text شكل الناتج
no ali is NOT a member of admin
~~~

أول كلمة [[yes]] أو [[no]]، فتقدر تعمل عليها شرط في سكربت. والسؤال مش محتاج sudo.

---

## ٢. [[dscl . read /Groups/admin GroupMembership]]

نفس [[dscl . read]] من الدرس اللي فات، بس على جروب: [[/Groups/admin]]، والخانة [[GroupMembership]] لستة أسامي الأعضاء:

~~~text شكل الناتج
GroupMembership: root sara
~~~

كل الأدمنز في سطر واحد، مفصولين بمسافة.

---

## ٣. [[sudo dseditgroup -o edit -a ali -t user admin]]

| الحتة | معناها |
|---|---|
| [[sudo]] | التعديل محتاج root |
| [[-o edit]] | العملية: عدّل الجروب |
| [[-a ali]] | add: ضيف ali |
| [[-t user]] | type: اللي بتضيفه يوزر (الجروب ممكن يبقى جواه جروب، فلازم تقول) |
| [[admin]] | الجروب |

لو نجح **مش بيطبع حاجة**.

---

## ٤. [[id ali]]

[[id]] بيطبع الجروبات، وده نفس الأمر في لينكس. شكله في الـ container (أوبونتو جوه Docker) ليوزر عادي:

~~~text الناتج (أوبونتو)
uid=1001(sara) gid=1001(sara) groups=1001(sara)
~~~

وعلى الماك بعد الإضافة هتلاقي في آخر الجروبات [[80(admin)]]: [[80]] رقم الجروب (GID) و [[admin]] اسمه.

---

## ٥ و ٦. [[-d ali]] وبعدها checkmember تاني

[[-d]] = delete: شيله من الجروب، نفس باقي الفلاجات. وبعدها السؤال تاني يرجع [[no]].

> قبل ما تعمل [[-d]] على **نفسك**: اتأكد إن فيه يوزر أدمن تاني شغال وعارف باسورده. لو شلت آخر أدمن، مفيش حد يرجّعها غير من Recovery.

---

## ليه مش بتظهر على طول في الترمنال المفتوح؟

الجروبات بتتقري لما الجلسة تبدأ. ali لو فاتح ترمنال قبل الإضافة، [[sudo]] هيفضل يرفضه لحد ما يفتح نافذة جديدة أو يعمل log out.

---

## ملخص

| السطر | العملية | محتاج sudo؟ |
|---|---|---|
| [[-o checkmember -m ali admin]] | اسأل | لأ |
| [[dscl . read /Groups/admin GroupMembership]] | اعرض الأعضاء | لأ |
| [[-o edit -a ali -t user admin]] | ضيف | آه |
| [[-o edit -d ali -t user admin]] | شيل | آه |

## مقارنة مع لينكس

| | الماك | لينكس |
|---|---|---|
| جروب الأدمن | [[admin]] (80) | [[sudo]] في أوبونتو، [[wheel]] في Fedora |
| ضيف | [[dseditgroup -o edit -a ali -t user admin]] | [[usermod -aG sudo ali]] |
| شيل | [[dseditgroup -o edit -d ali -t user admin]] | [[gpasswd -d ali sudo]] |
| مين الأعضاء | [[dscl . read /Groups/admin GroupMembership]] | [[getent group sudo]] |

---

## الخلاصة

~~~text
أدمن = عضو في جروب admin (GID 80)
-o checkmember   اسأل: yes أو no
-o edit -a / -d  ضيف أو شيل، بـ sudo، ومفيش ناتج لو نجح
-t user          اللي بتضيفه يوزر مش جروب
جلسة جديدة       عشان الصلاحية الجديدة تبان
~~~`,
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
          teach: R`## الفكرة

[[rwx]] العادية بتعرف ٣ أنواع ناس بس: صاحب الملف، والجروب، والباقي. الـ ACL بتزوّد «إدخالات» كل واحد فيها: **مين** + **اسمح ولا امنع** + **إيه بالظبط**. الأوامر دي ماك بس ([[chmod]] بتاع لينكس معندوش [[+a]])، فالشرح والناتج من [[man chmod]] (جزء ACL MANIPULATION OPTIONS) و [[man ls]] (مفيش ماك هنا). حتة الـ [[#]] مع zsh جرّبتها فعلًا في zsh 5.9 على أوبونتو 24.04 جوه Docker.

---

## ١. [[ls -le ~]]

- [[-l]] اللستة الطويلة (صلاحيات وصاحب وحجم وتاريخ).
- [[-e]] (ماك بس) اطبع الـ ACL تحت كل ملف عليه ACL.
- [[~]] فولدر الـ home.

~~~text شكل الناتج (من الـ docs)
drwx------+  5 sara  staff  160 Oct  2 10:00 Desktop
 0: group:everyone deny delete
drwx------+  4 sara  staff  128 Oct  2 10:00 Documents
 0: group:everyone deny delete
~~~

- الـ [[+]] بعد الصلاحيات معناها «عليه ACL».
- تحته الإدخالات مترقمة من **0**.
- [[group:everyone deny delete]]: الجروب اللي فيه الكل، ممنوع يمسح الفولدر ده. النظام حاطها عشان محدش يمسح Desktop بالغلط.

---

## ٢. [[touch notes.txt]]

[[touch]] بيعمل ملف فاضي لو مش موجود. ده ملف التجربة.

---

## ٣. [[chmod +a "user:ali allow read,write" notes.txt]]

الإدخال بين علامات التنصيص ٣ حتت:

| الحتة | معناها |
|---|---|
| [[user:ali]] | مين: اليوزر ali (أو [[group:اسم]] لجروب) |
| [[allow]] | اسمح (والعكس [[deny]]) |
| [[read,write]] | الصلاحيات، بفاصلة **من غير مسافة** |

و [[+a]] = ضيف إدخال. دلوقتي ali يقرا ويكتب حتى لو مش صاحب الملف ولا في جروبه.

---

## ٤. [[chmod +a "group:everyone deny delete" notes.txt]]

إدخال تاني: الكل ممنوع يمسح الملف، **وانت كمان**، لأنك جزء من everyone.

ليه المنع بيكسب؟ الماك بيقرا الإدخالات من فوق لتحت، وأول إدخال بيتكلم عن الصلاحية المطلوبة هو اللي بيحكم. و [[+a]] بيحط [[deny]] قبل [[allow]] لوحده، وده هيبان في الخطوة الجاية.

---

## ٥. [[ls -le notes.txt]]

~~~text شكل الناتج (من الـ docs)
-rw-r--r--+ 1 sara  staff  0 Oct  2 10:05 notes.txt
 0: group:everyone deny delete
 1: user:ali allow read,write
~~~

الـ deny بقى رقم 0 رغم إنه اتضاف تاني.

---

## ٦. [[chmod -a "user:ali allow write" notes.txt]]

[[-a]] (بالشرطة) = شيل. وبتشيل **الصلاحية اللي كتبتها بس** من الإدخال: write راحت، و read فضلت. فالإدخال رقم 1 بقى [[user:ali allow read]].

---

## ٧. [[chmod "-a#" 0 notes.txt]]

[[-a#]] شيل بالرقم مش بالكلام، و [[0]] رقم الإدخال (الـ deny). بعدها تقدر تمسح الملف تاني.

### ليه [[-a#]] بين علامات تنصيص؟

في zsh لو [[extended_glob]] شغال (ناس كتير بتشغّله في [[~/.zshrc]])، [[#]] بتبقى رمز glob معناه «الحرف اللي قبلي يتكرر». فـ zsh بيحاول يلاقي ملفات اسمها [[-]] أو [[-a]] أو [[-aa]]... ولما ميلاقيش بيوقف الأمر قبل ما chmod يشتغل أصلًا. جرّبتها:

~~~zsh
setopt extended_glob
chmod -a# 0 notes.txt
print -r -- "-a#"
~~~

~~~text الناتج (zsh على أوبونتو)
zsh:1: no matches found: -a#
-a#
~~~

السطر الأول: zsh وقف الأمر (الـ [[:1]] رقم السطر لأني شغّلته بـ [[zsh -c]]، في الترمنال العادي بيبقى [[zsh: no matches found]]). والتاني: نفس الكلمة بين علامات تنصيص وصلت زي ما هي. [[print -r --]] بيطبع الكلام بالحرف من غير ما يفسّر حاجة.

---

## ٨. [[chmod -N notes.txt]]

[[-N]] امسح الـ ACL كلها. الـ [[+]] بتختفي والملف يرجع لـ [[rwx]] بس.

---

## ٩ و ١٠. فولدر مشترك

~~~zsh
mkdir shared
chmod +a "user:ali allow list,search,add_file,delete_child,file_inherit,directory_inherit" shared
~~~

صلاحيات الفولدر غير صلاحيات الملف:

| الصلاحية | معناها |
|---|---|
| [[list]] | يشوف أسامي اللي جوه |
| [[search]] | يوصل لملف جوه بالاسم (زي [[x]] على فولدر) |
| [[add_file]] | يعمل ملف جديد جواه |
| [[delete_child]] | يمسح حاجة جواه |
| [[file_inherit]] | الإدخال ده يتنسخ على أي **ملف** جديد جواه |
| [[directory_inherit]] | ويتنسخ على أي **فولدر** جديد جواه |

من غير الـ inherit، ali يقدر يعمل ملف بس ممكن ميقدرش يفتح ملفات انت عملتها بعدين.

---

## ملخص الأوامر

| الأمر | بيعمل |
|---|---|
| [[ls -le]] | اعرض الـ ACL |
| [[chmod +a "..."]] | ضيف إدخال |
| [[chmod -a "..."]] | شيل صلاحيات من إدخال |
| [[chmod "-a#" N]] | شيل إدخال برقمه |
| [[chmod -N]] | امسح الـ ACL كلها |

## مقارنة مع لينكس

| | الماك | لينكس |
|---|---|---|
| ضيف | [[chmod +a "user:ali allow read"]] | [[setfacl -m u:ali:r file]] |
| اعرض | [[ls -le]] | [[getfacl file]] |
| فيه deny؟ | آه | لأ |
| علامة الـ ACL في [[ls -l]] | [[+]] | [[+]] |

---

## الخلاصة

~~~text
+a "who allow|deny perms"   ضيف إدخال، والفاصلة بين الصلاحيات من غير مسافة
deny قبل allow              المنع بيكسب، والترقيم من 0
"-a#" بين تنصيص              عشان extended_glob في zsh ميبوّظوش
inherit                     للفولدرات: الإدخال يتنسخ على الجديد
~~~`,
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
          teach: R`## الفكرة

٦ سطور بترتيب منطقي: اسأل Gatekeeper عن برنامج سليم (للمقارنة)، وبص على العلامة على الملف اللي نزّلته، واسأل Gatekeeper عن البرنامج المرفوض، واعرف مين موقّعه، وبعدين (لو متأكد من مصدره بس) شيل العلامة واتأكد. [[xattr]] و [[spctl]] و [[codesign]] ماك بس، فشرحهم وشكل الناتج من [[man xattr]] و [[man spctl]] وصفحة دعم Apple «Open a Mac app from an unknown developer» (مفيش ماك هنا). فكرة الـ extended attributes نفسها موجودة في لينكس، فجرّبتها في zsh على أوبونتو 24.04 جوه Docker.

---

## ١. [[spctl --assess -vv /Applications/Safari.app]]

| الحتة | معناها |
|---|---|
| [[spctl]] | security policy control: الأداة اللي بتكلّم Gatekeeper |
| [[--assess]] | قيّم البرنامج ده: هيتفتح ولا هيترفض؟ |
| [[-vv]] | verbose مرتين: قول السبب والمصدر |
| [[/Applications/Safari.app]] | البرنامج (والـ [[.app]] فولدر مش ملف) |

~~~text شكل الناتج (من الـ docs)
/Applications/Safari.app: accepted
source=Apple System
~~~

[[accepted]] = هيتفتح. و [[source]] المصدر: [[Apple System]] لبرامج Apple، و [[Notarized Developer ID]] لمطوّر مسجل وApple راجعت البرنامج. ده خط المقارنة.

---

## ٢. [[xattr -l ~/Downloads/Tool.dmg]]

### يعني إيه extended attribute؟

بيانات زيادة متخزنة **مع** الملف بس مش **جواه**: كل واحدة ليها اسم وقيمة. محتوى الملف ميتغيرش، والـ attributes بتمشي معاه. لينكس فيه نفس الفكرة بأوامر [[setfattr]] و [[getfattr]]، فعملت علامة شبه بتاعة الماك على ملف:

~~~zsh
setfattr -n user.quarantine -v '0083;66fd1a2b;Safari;' notes.txt
getfattr -d notes.txt
~~~

~~~text الناتج (أوبونتو)
# file: notes.txt
user.quarantine="0083;66fd1a2b;Safari;"
~~~

[[-n]] الاسم و [[-v]] القيمة، و [[getfattr -d]] (dump) اطبعهم كلهم. (لينكس بيحتاج [[user.]] قبل الاسم، الماك لأ.)

### [[xattr -l]] على الماك

[[-l]] اطبع الاسم والقيمة مع بعض. على ملف نزّلته من المتصفح هتلاقي سطر شبه ده (من الـ docs):

~~~text شكل الناتج
com.apple.quarantine: 0083;66fd1a2b;Safari;
~~~

القيمة مفصولة بـ [[;]]:

| الحتة | معناها |
|---|---|
| [[0083]] | flags (أرقام داخلية لحالة العلامة) |
| [[66fd1a2b]] | الوقت اللي الملف نزل فيه، hex |
| [[Safari]] | البرنامج اللي نزّله |

الوقت ده عدد الثواني من 1 يناير 1970 (Unix time) مكتوب hex. حوّلته في zsh:

~~~zsh
echo $((16#66fd1a2b))
date -u -d @$((16#66fd1a2b))
~~~

~~~text الناتج
1727863339
Wed Oct  2 10:02:19 UTC 2024
~~~

[[16#]] في zsh معناها «الرقم اللي بعدي base 16»، و [[date -d @رقم]] بيحوّل Unix time لتاريخ (ده [[date]] بتاع لينكس، على الماك [[date -r رقم]]).

---

## ٣. [[spctl --assess -vv /Applications/Tool.app]]

نفس السطر الأول على البرنامج اللي بيترفض:

~~~text شكل الناتج (من الـ docs)
/Applications/Tool.app: rejected
~~~

[[rejected]] = Gatekeeper هيمنعه، وغالبًا تحته سطر بالسبب.

---

## ٤. [[codesign -dvv /Applications/Tool.app]]

- [[codesign]] أداة توقيع البرامج.
- [[-d]] display: اعرض التوقيع، متوقّعش.
- [[-vv]] تفاصيل أكتر.

الناتج طويل، والمهم فيه سطرين: [[Authority=Developer ID Application: اسم المطوّر]] لو موقّع من مطوّر مسجل، أو [[Signature=adhoc]] لو اتوقّع على جهاز اللي بناه بس، وده أشهر سبب لرسالة «damaged» مع برامج GitHub.

---

## ٥. [[sudo xattr -dr com.apple.quarantine /Applications/Tool.app]]

| الحتة | معناها |
|---|---|
| [[sudo]] | البرنامج في [[/Applications]] وغالبًا مش ملكك |
| [[-d]] | delete: امسح attribute |
| [[-r]] | recursive: على الفولدر وكل اللي جواه |
| [[-dr]] | الاتنين لازقين، زي [[-d -r]] |
| [[com.apple.quarantine]] | اسم العلامة بس، مش كل الـ attributes |

ليه [[-r]] لازمة؟ [[Tool.app]] فولدر فيه مئات الملفات، وكل واحد عليه العلامة.

> ده بيقفل Gatekeeper للبرنامج ده خالص. اعمله بس لبرنامج من موقعه الرسمي وانت عارفه.

---

## ٦. [[xattr -l /Applications/Tool.app]]

نفس السطر ٢: لو سطر [[com.apple.quarantine]] اختفى، العلامة اتشالت.

---

## ملخص

| # | الأمر | السؤال |
|---|---|---|
| ١ | [[spctl --assess -vv Safari.app]] | شكل «accepted» |
| ٢ | [[xattr -l file]] | عليه علامة quarantine؟ ومين نزّله وإمتى؟ |
| ٣ | [[spctl --assess -vv Tool.app]] | Gatekeeper رافضه؟ |
| ٤ | [[codesign -dvv Tool.app]] | مين موقّعه؟ adhoc؟ |
| ٥ | [[sudo xattr -dr com.apple.quarantine]] | شيل العلامة (مصدر مضمون بس) |
| ٦ | [[xattr -l]] | اتشالت؟ |

## على الأنظمة التانية

| | الماك | ويندوز | لينكس |
|---|---|---|---|
| علامة «نزل من النت» | [[com.apple.quarantine]] | Mark of the Web (stream اسمه [[Zone.Identifier]]) | مفيش |
| شيلها | [[xattr -d]] | [[Unblock-File]] في PowerShell | مفيش |

---

## الخلاصة

~~~text
xattr -l       العلامات المخفية على الملف: quarantine = نزل من النت
spctl --assess رأي Gatekeeper: accepted أو rejected
codesign -dvv  مين موقّع، و adhoc = مش مطوّر مسجل
xattr -dr      شيل العلامة من الفولدر وكل اللي جواه، لمصدر مضمون بس
~~~`,
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
          teach: R`## الفكرة

أول سطر بيحط مسار طويل في متغير، وكل اللي بعده نفس الأداة بخيارات مختلفة: اسأل عن الحالة، شغّل، شغّل stealth، اعرض البرامج، ضيف برنامج وامنعه ورجّعه. [[socketfilterfw]] ماك بس، والخيارات من [[man socketfilterfw]] بتاعة Apple وشكل الناتج من صفحات دعم Apple (مفيش ماك هنا). حتة المتغير جرّبتها فعلًا في zsh 5.9 على أوبونتو 24.04 جوه Docker.

---

## ١. [[fw=/usr/libexec/ApplicationFirewall/socketfilterfw]]

### المسار

[[socketfilterfw]] مش في الـ PATH (الفولدرات اللي الشيل بيدوّر فيها على الأوامر)، فلو كتبت اسمه لوحده هيقولك command not found. مكانه:

| الجزء | معناه |
|---|---|
| [[/usr/libexec]] | فولدر برامج النظام اللي مش معمولة إن اليوزر يكتبها على طول |
| [[ApplicationFirewall]] | فولدر الفايروول |
| [[socketfilterfw]] | socket filter firewall: الأداة نفسها |

### المتغير

[[fw=...]] بيحط المسار في متغير اسمه [[fw]]، و [[$fw]] بعد كده بتتبدل بالمسار. جرّبتها بـ [[/bin/echo]] مكان المسار، عشان [[echo]] بيطبع الكلام اللي جاله فنشوف اللي حصل:

~~~zsh
fw=/bin/echo
$fw --getglobalstate
~~~

~~~text الناتج (zsh على أوبونتو)
--getglobalstate
~~~

zsh بدّل [[$fw]] بـ [[/bin/echo]] فاتنفّذ [[/bin/echo --getglobalstate]]. وعلى الماك نفس الشيء بيبقى [[/usr/libexec/.../socketfilterfw --getglobalstate]].

ولو حطيت مسافات حوالين [[=]]:

~~~zsh
fw = /bin/echo
~~~

~~~text الناتج
zsh:1: command not found: fw
~~~

zsh فهم [[fw]] على إنه أمر و [[=]] و [[/bin/echo]] arguments ليه. في الشيل: **مفيش مسافات حوالين [[=]]**.

---

## ٢. [[$fw --getglobalstate]]

[[get]] اسأل، و [[globalstate]] الحالة العامة: شغال ولا لأ. مش محتاج sudo.

~~~text شكل الناتج (من الـ docs)
Firewall is disabled. (State = 0)
~~~

[[State = 0]] مقفول، و [[1]] شغال.

---

## ٣. [[sudo $fw --setglobalstate on]]

[[set]] غيّر، و [[on]] شغّل ([[off]] اقفل). أي [[set]] محتاج [[sudo]]. بعدها السؤال اللي فات يقول [[Firewall is enabled. (State = 1)]].

---

## ٤ و ٥. [[--setstealthmode on]] و [[--getstealthmode]]

stealth = متخفي: الماك ميردش على ping ولا على محاولة اتصال ببورت مقفول، فاللي بيعمل scan يفتكر مفيش جهاز. التاني بيسأل اتشغّل ولا لأ.

> stealth mode من غير الفايروول نفسه شغال ملوش تأثير.

---

## ٦. [[$fw --listapps]]

البرامج اللي ليها قاعدة، وجنب كل واحد مسموح يستقبل اتصالات ولا ممنوع.

---

## ٧ و ٨ و ٩. [[--add]] و [[--blockapp]] و [[--unblockapp]]

كلهم بياخدوا مسار البرنامج:

| الخيار | بيعمل |
|---|---|
| [[--add /Applications/Tool.app]] | ضيف البرنامج للستة |
| [[--blockapp ...]] | امنعه يستقبل اتصالات من برّه |
| [[--unblockapp ...]] | رجّعه مسموح |
| [[--remove ...]] | شيله من اللستة خالص |
| [[--getappblocked ...]] | اسأل: ممنوع ولا لأ؟ |

---

## الفايروول ده بيمنع إيه بالظبط؟

**الاتصالات الداخلة بس**، ولكل برنامج مش لكل بورت. أي برنامج على جهازك يقدر يبعت لبرّه عادي.

## على الأنظمة التانية

| | الماك | لينكس (أوبونتو) | ويندوز |
|---|---|---|---|
| الحالة | [[$fw --getglobalstate]] | [[sudo ufw status]] | [[Get-NetFirewallProfile]] |
| شغّل | [[sudo $fw --setglobalstate on]] | [[sudo ufw enable]] | [[Set-NetFirewallProfile -Enabled True]] |
| القواعد بـ | البرنامج | البورت (غالبًا) | البرنامج أو البورت |

---

## الخلاصة

~~~text
fw=/usr/libexec/...      المسار في متغير، ومن غير مسافات حوالين =
--get...                 اسأل، من غير sudo
--set... on|off          غيّر، بـ sudo
stealth mode             ميردش على ping والـ scan، ومحتاج الفايروول شغال
للداخل بس                الطالع محتاج LuLu أو Little Snitch
~~~`,
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
          teach: R`## الفكرة

٥ أسئلة، كلهم **بيقروا بس** ومش بيغيّروا حاجة: الديسك متشفر؟ (مرتين، مرة للإنسان ومرة للسكربت)، مين يقدر يفتحه؟ الجهاز مسجل في شركة؟ وإيه الإعدادات المفروضة عليه؟ [[fdesetup]] و [[profiles]] ماك بس، والناتج من [[man fdesetup]] و [[man profiles]] (مفيش ماك هنا). حتة الـ exit code جرّبتها في zsh على أوبونتو 24.04 جوه Docker.

---

## ١. [[fdesetup status]]

- [[fdesetup]] = Full Disk Encryption setup: أداة FileVault.
- [[status]] الحالة.

~~~text شكل الناتج (من الـ docs)
FileVault is On.
~~~

أو [[FileVault is Off.]]. ولو التشفير لسه شغال هيقولك إنه بيتشفر.

---

## ٢. [[fdesetup isactive]]

نفس السؤال، بس للسكربتات: بيطبع [[true]] أو [[false]]، والأهم إنه بيخرج بـ **exit code** 0 أو 1.

### يعني إيه exit code؟

كل أمر لما يخلص بيرجّع رقم: 0 = نجح (أو «آه»)، وأي رقم تاني = لأ. والرقم ده محفوظ في [[$?]]. جرّبت بـ [[true]] و [[false]] (أوامر بترجّع 0 و 1 وخلاص):

~~~zsh
true; echo $?
false; echo $?
if false; then echo on; else echo off; fi
~~~

~~~text الناتج (zsh على أوبونتو)
0
1
off
~~~

[[if]] بيبص على الـ exit code مش على الكلام المطبوع. فعلى الماك:

~~~zsh
if fdesetup isactive >/dev/null; then echo "متشفر"; else echo "مش متشفر"; fi
~~~

[[>/dev/null]] بترمي كلمة true أو false المطبوعة، لأننا محتاجين الـ exit code بس.

---

## ٣. [[sudo fdesetup list]]

[[list]] اليوزرز اللي يقدروا يفتحوا الديسك من شاشة البداية بعد restart. محتاج [[sudo]] لأنها معلومة أمان.

~~~text شكل الناتج (من الـ docs)
sara,85B5B0B6-0E4A-4D7D-8F4C-1A2B3C4D5E6F
~~~

الاسم، وبعده فاصلة، وبعدها GUID: رقم تعريف ثابت لليوزر (الرقم هنا مثال). يوزر مش في اللستة دي معندوش secure token (درس «dscl و sysadminctl»).

---

## ٤. [[profiles status -type enrollment]]

| الحتة | معناها |
|---|---|
| [[profiles]] | أداة الـ configuration profiles والـ MDM |
| [[status]] | الحالة |
| [[-type enrollment]] | حالة **التسجيل**: الجهاز متسجل في نظام إدارة ولا لأ |

~~~text شكل الناتج (من الـ docs، ماك شخصي)
Enrolled via DEP: No
MDM enrollment: No
~~~

| السطر | معناه |
|---|---|
| [[Enrolled via DEP]] | DEP = Device Enrollment Program (اسمه الجديد Automated Device Enrollment): الجهاز اتسجل باسم شركة من ساعة ما اتشرى، ومربوط بالرقم التسلسلي |
| [[MDM enrollment]] | MDM = Mobile Device Management: الجهاز تحت إدارة سيرفر شركة دلوقتي |

**No و No** = جهاز شخصي. أي **Yes** = فيه شركة ليها إيد عليه.

---

## ٥. [[sudo profiles list]]

الـ configuration profiles المتسطبة: كل واحد ملف إعدادات بيفرض حاجة (واي فاي، VPN، شهادات، قيود). على جهاز شخصي غالبًا هيقولك إن مفيش.

---

## ملخص

| # | الأمر | السؤال | sudo؟ |
|---|---|---|---|
| ١ | [[fdesetup status]] | متشفر؟ (للإنسان) | لأ |
| ٢ | [[fdesetup isactive]] | متشفر؟ (exit code للسكربت) | لأ |
| ٣ | [[fdesetup list]] | مين يفتحه بعد restart؟ | آه |
| ٤ | [[profiles status -type enrollment]] | مسجل DEP أو MDM؟ | لأ |
| ٥ | [[profiles list]] | إعدادات مفروضة؟ | آه |

## على الأنظمة التانية

| | الماك | ويندوز | لينكس |
|---|---|---|---|
| تشفير الديسك | FileVault: [[fdesetup status]] | BitLocker: [[manage-bde -status]] (أدمن) | LUKS: [[lsblk -f]] (نوع [[crypto_LUKS]]) |
| إدارة شركة | [[profiles status -type enrollment]] | [[dsregcmd /status]] | مفيش أداة واحدة |

---

## الخلاصة

~~~text
fdesetup status / isactive   FileVault شغال؟ والتاني للـ if (exit code 0 = آه)
fdesetup list                اللي معاهم secure token ويفتحوا بعد restart
profiles status -type enr..  No و No = جهاز شخصي، أي Yes = مُدار
~~~`,
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
    }
]);
