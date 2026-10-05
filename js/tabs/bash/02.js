// تكملة تاب bash: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/bash/01.js (شرح حقول الدرس في أوله)
MORE("bash", [
    {
      t: "اليوزرز والجروبات والصلاحيات بعمق",
      l: 3,
      n: "يوزرز وجروبات بالأوامر الأصلية، و sudo لأمر واحد بس، وصلاحيات أدق من rwx: setgid و umask و ACL و chattr",
      items: [
        {
          cmd: "useradd و usermod",
          title: "اعمل يوزر وعدّل جروباته",
          desc: R`[[useradd]] بيعمل يوزر جديد، و [[usermod]] بيعدّل يوزر موجود: يضيفه لجروب، أو يقفله، أو يغيّر الشيل بتاعه. دول الأوامر الأصلية اللي موجودة على كل توزيعات لينكس، و [[adduser]] بتاع ديبيان وأوبونتو واجهة ودودة فوقهم بتسألك أسئلة (شوف درس «adduser» في تاب «VPS»). في السكربتات والسيرفرات اللي مش أوبونتو هتحتاج الأصلية.

flags بتاعة [[useradd]]:
• [[-m]] (create home) بيعمل [[/home/sara]] وينسخ فيه ملفات [[/etc/skel]] زي [[.bashrc]]. من غيرها على أوبونتو وديبيان مفيش home خالص.
• [[-s /bin/bash]] الشيل. الافتراضي على أوبونتو وديبيان [[/bin/sh]]، فاليوزر هيلاقي prompt فقير من غير أسهم للـ history ولا Tab.
• [[-G sudo]] جروبات إضافية، ولو أكتر من واحد مفصولين بفاصلة من غير مسافات: [[-G sudo,docker]].
• [[-r]] حساب نظام (رقمه أقل من 1000) لخدمة مش لبني آدم، و [[-M]] من غير home.
وكل يوزر ليه جروب «أساسي» واحد، و useradd بيعمله جروب بنفس اسمه.

flags بتاعة [[usermod]]:
• [[-aG docker]]: [[-G]] لوحدها معناها «جروباته الإضافية هي دي بس»، فبتشيله من أي جروب مش مكتوب. [[-a]] (append) معناها «ضيف على اللي عنده». النسيان ده من أشهر الغلطات، والمثال بيوريك بيحصل إيه.
• [[-L]] (lock) يقفل الباسورد بإنه يحط [[!]] قدام الـ hash، و [[-U]] (unlock) يشيلها.
• [[-s /usr/sbin/nologin]] اليوزر مايقدرش يفتح شيل، ودي للخدمات.
• [[-e 2026-12-31]] (expire) الحساب كله يقفل في التاريخ ده.

الجروب الجديد مش بيظهر في الجلسة المفتوحة: الجروبات بتتحدد لحظة الـ login. فبعد [[usermod -aG docker sara]] سارة لازم تخرج وتدخل تاني (تقفل ssh وتفتحه)، أو تكتب [[newgrp docker]] اللي بيفتح شيل جديد الجروب ده فيه. و [[id sara]] بيقرا من الملفات فهيقولك docker موجود، لكن [[id]] من غير اسم جوه جلستها القديمة لأ.

و [[userdel -r]] بيمسح اليوزر وفولدر الـ home بتاعه كله. وعلى فيدورا و RHEL [[useradd]] بيعمل home لوحده والشيل bash، وجروب المديرين اسمه [[wheel]] مش [[sudo]]، و [[adduser]] هناك مجرد اسم تاني لـ useradd.`,
          example: R`sudo useradd -m -s /bin/bash -G sudo sara
sudo passwd sara
id sara
sudo usermod -aG docker sara
# الغلطة: من غير -a بيشيلها من sudo و docker
sudo usermod -G devs sara
id sara
sudo usermod -aG sudo,docker sara
sudo useradd -r -M -s /usr/sbin/nologin myapp
sudo usermod -L sara
sudo usermod -U sara
sudo userdel -r olduser`,
          try: R`اعمل يوزر sara بالأمر الأول، وضيفها لجروب docker (لو الجروب مش موجود: [[sudo groupadd docker]]). اعمل جروب devs، وجرّب [[usermod -G devs]] من غير [[-a]] وقارن [[id sara]] قبل وبعد، ورجّع جروباتها. وفي الآخر امسحها بـ [[userdel -r]].`,
          flag: "danger",
          mac: ["linux", R`على الماك اليوزرز في Directory Services مش في [[/etc/passwd]]: [[sudo sysadminctl -addUser sara -fullName "Sara" -password -]] (الشرطة يعني اسألني الباسورد)، و [[sudo dseditgroup -o edit -a sara -t user admin]] بدل [[usermod -aG sudo]]، و [[sudo sysadminctl -deleteUser sara]] للمسح.`],
          deep: {
            why: R`على أي سيرفر بيشتغل عليه أكتر من حد أو أكتر من خدمة، كل واحد لازم يبقى ليه يوزر: عشان الصلاحيات تتفصل، واللوج يقولك مين عمل إيه، ولو حد ساب تقفل حسابه هو بس. والخدمات (تطبيقك، قاعدة البيانات) بتشتغل بيوزرز من غير شيل ولا باسورد، عشان لو اتخترقت متبقاش root.`,
            how: R`اليوزر في الحقيقة سطر في [[/etc/passwd]] (الاسم والرقم والـ home والشيل)، وسطر في [[/etc/shadow]] (الباسورد)، وسطر جروب في [[/etc/group]]، و [[useradd]] بيكتب السطور دي وبيعمل الفولدر. والنظام نفسه مبيعرفش أسامي: بيتعامل بالأرقام (UID و GID)، والاسم للبني آدمين.

والجروبات الإضافية مكتوبة في آخر سطر الجروب في [[/etc/group]]: [[docker:x:1001:sara]]. [[usermod -G devs]] بيعيد كتابة السطور دي كلها بحيث sara تبقى في devs بس، و [[-a]] بيضيف اسمها لسطر جديد بس.

ولما تعمل login، البرنامج اللي دخّلك (sshd أو login) بيقرا جروباتك ويحطها في العملية بتاعتك، وكل أمر بتشغّله بيورثها. عشان كده التعديل مبيظهرش غير في جلسة جديدة. و [[newgrp]] بيفتح شيل جديد بجروب أساسي مختلف.

وقيم افتراضية زي الشيل وإن الـ home يتعمل ولا لأ موجودة في [[/etc/default/useradd]] و [[/etc/login.defs]]، وده سبب إن أوبونتو وفيدورا بيتصرفوا مختلف بنفس الأمر.`,
            when: R`سكربت بيجهّز سيرفر (cloud-init أو Ansible) ومحتاج أوامر من غير أسئلة: useradd. يوزر محتاج Docker من غير sudo: [[usermod -aG docker]]. خدمة جديدة: [[useradd -r -M -s /usr/sbin/nologin]]. موظف في إجازة: [[usermod -L]] (أو أحسن، درس «passwd -l و chage»).`,
            mistakes: R`[[usermod -G]] من غير [[-a]]، فاليوزر يتشال من sudo ويتقفل برّه صلاحيات المدير؛ ولو ده يوزرك الوحيد على السيرفر هتحتاج console الاستضافة. و [[useradd]] من غير [[-m]] و [[-s]] على أوبونتو، فتلاقي يوزر من غير home وشيله sh. ونسيان إن الجروب الجديد محتاج login جديد، فتفضل تقول «ضفته ولسه docker بيقول permission denied». وإن جروب [[docker]] بيدّي صلاحيات root فعليًا (أي حد فيه يقدر يشغّل container بيركّب [[/]]).`
          },
          lines: [
            R`اعمل يوزر sara بـ home ([[-m]]) وشيل bash ([[-s]])، وفي جروب sudo ([[-G]]).`,
            R`ادّيها باسورد (useradd مبيسألش). من غيره الحساب مقفول.`,
            R`اعرض رقمها وجروباتها.`,
            R`ضيفها لجروب docker من غير ما تشيلها من الباقي ([[-a]] append).`,
            R`[[-G]] لوحدها: جروباتها الإضافية بقت devs بس، و sudo و docker اتشالوا.`,
            R`اتأكد: هتلاقي devs بس.`,
            R`رجّعها لـ sudo و docker (و devs فاضلة لأن [[-a]] بيضيف).`,
            R`يوزر لخدمة: حساب نظام ([[-r]])، من غير home ([[-M]])، ومن غير شيل.`,
            R`اقفل باسوردها ([[!]] قدام الـ hash).`,
            R`افتحه تاني.`,
            R`امسح يوزر وفولدر الـ home بتاعه ([[-r]]).`
          ],
          sol: R`ده ناتج حقيقي من container أوبونتو 24.04 (الأرقام عندك هتختلف). بعد الإنشاء: [[uid=1001(sara) gid=1002(sara) groups=1002(sara),27(sudo)]]. بعد [[-aG docker]]: [[groups=1002(sara),27(sudo),1001(docker)]]. وبعد [[usermod -G devs sara]] من غير [[-a]]: [[groups=1002(sara),1004(devs)]]، يعني sudo و docker راحوا. وبعد [[-aG sudo,docker]] رجعوا التلاتة.

وجربت الجلسة القديمة: عملية كانت شغالة كـ sara قبل [[usermod -aG video2 sara]] طبعت [[sara sudo docker devs]] من غير video2، وجلسة جديدة بعدها طبعت video2. و [[usermod -U]] على يوزر لسه ملوش باسورد بيرفض: [[usermod: unlocking the user's password would result in a passwordless account.]] (حماية: مش هيسيب حساب من غير باسورد). و [[su - myapp]] بيرد [[This account is currently not available.]] لأن شيله nologin. و [[userdel -r olduser]] ممكن يطبع [[userdel: olduser mail spool (/var/mail/olduser) not found]]، ودي مجرد ملاحظة إن مفيش صندوق بريد يتمسح.

ولو عملت [[useradd bare]] من غير flags على أوبونتو: السطر في [[/etc/passwd]] بيبقى [[bare:x:1002:1003::/home/bare:/bin/sh]]، و [[ls /home/bare]] بيقول No such file or directory.`
        },
        {
          cmd: "id و groups و getent",
          title: "مين اليوزر ده وفي أنهي جروبات",
          desc: R`[[id]] و [[groups]] بيقولولك اليوزر رقمه إيه وفي أنهي جروبات، و [[getent]] بيجيب سطر أي يوزر أو جروب من «قاعدة بيانات» النظام. والقاعدة دي على أي جهاز عادي ٣ ملفات نصية: [[/etc/passwd]] و [[/etc/group]] و [[/etc/shadow]]، والدرس بيعلّمك تقراهم.

[[id sara]]: [[uid]] رقم اليوزر، و [[gid]] الجروب الأساسي، و [[groups=]] كل الجروبات بأرقامها. [[-u]] الرقم بس، و [[-gn]] اسم الجروب الأساسي، و [[-nG]] أسامي كل الجروبات. و [[id]] من غير اسم بيقرا جروبات الجلسة الحالية، و [[id sara]] بيقرا من الملفات، فلو اختلفوا يبقى في جروب اتضاف بعد ما دخلت (درس «useradd و usermod»). و [[groups sara]] الأسامي بس: [[sara : sara sudo docker]].

[[getent passwd sara]] (get entries) بيطبع سطر اليوزر، و [[getent group sudo]] سطر الجروب وفي آخره الأعضاء. ليه مش [[grep sara /etc/passwd]]؟ لأن getent بيسأل نفس المصادر اللي النظام بيسألها (مكتوبة في [[/etc/nsswitch.conf]])، فلو الشركة عندها يوزرز في LDAP أو Active Directory هيظهروا، و grep لأ. ولو اليوزر مش موجود مبيطبعش حاجة وبيرجع exit code 2.

[[/etc/passwd]] سطر لكل يوزر، ٧ حقول بينهم [[:]]، زي [[sara:x:1001:1002::/home/sara:/bin/bash]]:
1. الاسم.
2. [[x]]: الباسورد مش هنا، في [[/etc/shadow]].
3. UID. و 0 دايمًا root، وأقل من 1000 حسابات نظام (زي www-data = 33)، و 1000 وطالع ناس حقيقيين، و 65534 هو nobody.
4. GID الجروب الأساسي.
5. وصف أو اسم كامل (اسمه GECOS)، وغالبًا فاضي.
6. فولدر الـ home.
7. الشيل. [[/usr/sbin/nologin]] أو [[/bin/false]] يعني ممنوع يفتح شيل.

[[/etc/group]]: [[sudo:x:27:ubuntu,sara]] = الاسم، و x، والرقم، والأعضاء. والأعضاء هنا هما اللي الجروب ده «إضافي» ليهم؛ اللي جروبه الأساسي sudo مش بيتكتب في السطر.

[[/etc/shadow]] (root بس يقراه، صلاحياته [[640]] وجروبه [[shadow]]): ٩ حقول: الاسم، والـ hash، وتاريخ آخر تغيير (بعدد الأيام من 1970-01-01)، و min و max و warn و inactive و expire (درس «passwd -l و chage»)، وواحد محجوز. والـ hash بيبدأ بنوعه: [[$y$]] يعني yescrypt، وده الافتراضي في أوبونتو 22.04 وأحدث وديبيان 12 وفيدورا. و [[$6$]] يعني SHA-512، الأقدم ولسه شغال. و [[$1$]] يعني MD5، قديم وضعيف. و [[!]] قدام الـ hash يعني الباسورد مقفول، و [[!]] لوحدها أو [[*]] يعني مفيش باسورد يتدخل بيه أصلًا، زي حسابات النظام و root على أوبونتو.`,
          example: R`id sara
id -nG
groups sara
getent passwd sara
getent group sudo
getent passwd nosuchuser; echo "exit: $?"
awk -F: '$3 >= 1000 && $3 < 60000 {print $1, $3, $7}' /etc/passwd
sudo grep -E '^(root|sara):' /etc/shadow`,
          try: R`اعرف جروباتك انت بـ [[id]]، وبعدين اطبع كل اليوزرز «الحقيقيين» على جهازك بالـ awk، وفك سطرك في [[/etc/passwd]] و [[/etc/shadow]] حقل حقل: الـ hash بتاعك نوعه إيه، وآخر مرة غيّرت الباسورد إمتى؟`,
          mac: ["diff", R`[[id]] و [[groups]] موجودين، بس مفيش [[getent]] ولا [[/etc/shadow]]: اليوزرز في Directory Services. [[dscl . -read /Users/ali]] بيانات يوزر، و [[dscl . -list /Users UniqueID]] كل اليوزرز وأرقامهم، و [[dscacheutil -q group -a name admin]] أعضاء جروب. ويوزرز الماك بيبدأوا من 501 مش 1000.`],
          deep: {
            why: R`نص مشاكل الصلاحيات سؤالها «اليوزر ده في الجروب ده ولا لأ؟»: Nginx بيقرا ملفات الموقع؟ اليوزر يقدر يستخدم docker؟ و Permission denied على ملف جروبه www-data. ولما تفهم الملفات التلاتة دول، هتفهم إيه اللي useradd و usermod و passwd بيعملوه بالظبط، وتعرف تكتشف حساب غريب اتضاف لسيرفرك.`,
            how: R`لما برنامج يحتاج يحوّل اسم يوزر لرقم أو العكس (زي [[ls -l]] وهو بيكتب اسم صاحب الملف)، بيسأل مكتبة النظام، وهي بتشوف [[/etc/nsswitch.conf]]: [[passwd: files]] يعني دوّر في [[/etc/passwd]]، ولو مكتوب [[files sss]] أو [[files ldap]] بتسأل كمان سيرفر الشركة. [[getent]] بيسأل نفس السؤال، فبيوريك اللي النظام شايفه فعلًا.

والباسوردات كانت زمان في [[/etc/passwd]] نفسه، واللي كل الناس تقدر تقراه (لازم، عشان ls وغيره يعرفوا الأسامي)، فأي حد كان يقدر ياخد الـ hashes ويحاول يكسرها. عشان كده اتنقلت لـ [[/etc/shadow]] اللي root بس يقراه، وفضل مكانها [[x]].

والـ hash مش تشفير يتفك: النظام لما تكتب الباسورد بيعمله hash بنفس الطريقة والـ salt (الجزء العشوائي بين علامات [[$]]) ويقارن. و yescrypt متعمّل مخصوص يبقى بطيء وياكل رام، عشان تجربة ملايين الباسوردات تبقى مكلفة.`,
            when: R`قبل ما تدّي حد صلاحية: [[getent group sudo]] و [[getent group docker]] مين فيهم دلوقتي. بعد ما تعمل يوزر: [[id اسمه]]. مراجعة أمنية لسيرفر: [[awk]] على [[/etc/passwd]] تشوف مين عنده شيل حقيقي، وأي UID تاني بـ 0 غير root مصيبة. ولما دخول بيفشل: [[passwd -S]] أو الحقل التاني في shadow تشوفه مقفول ولا لأ.`,
            mistakes: R`إنك تعدّل [[/etc/passwd]] أو [[/etc/shadow]] بإيدك بمحرر: غلطة في سطر ممكن تقفل الكل برّه. استخدم useradd و usermod و passwd، ولو مضطر [[sudo vipw]] و [[sudo vigr]] (بيقفلوا الملف ويفحصوه). و [[grep]] على passwd على جهاز داخل على LDAP، فتفتكر اليوزر مش موجود. وإنك تقرا [[id]] في جلسة قديمة وتفتكر الجروب متضافش.`
          },
          lines: [
            R`رقم sara وجروبها الأساسي وكل جروباتها، من الملفات.`,
            R`أسامي جروبات «جلستك» انت دلوقتي ([[-n]] أسامي و [[-G]] كل الجروبات).`,
            R`جروبات sara بالأسامي.`,
            R`سطرها في قاعدة اليوزرز (٧ حقول).`,
            R`سطر جروب sudo، وآخره الأعضاء.`,
            R`يوزر مش موجود: مفيش ناتج، والـ exit code بيبان 2.`,
            R`[[-F:]] افصل بالنقطتين: اطبع الاسم والـ UID والشيل لكل يوزر رقمه بين 1000 و 60000 (الناس الحقيقيين).`,
            R`سطر root و sara في shadow (محتاج sudo): هتشوف الـ hash أو [[*]] أو [[!]].`
          ],
          sol: R`ناتج حقيقي من container أوبونتو 24.04: [[getent passwd sara]] طبع [[sara:x:1001:1002::/home/sara:/bin/bash]]، و [[getent group sudo]] طبع [[sudo:x:27:ubuntu,sara]]، و [[groups sara]] طبع [[sara : sara sudo docker devs]]، و [[getent passwd nosuchuser; echo "exit: $?"]] طبع [[exit: 2]] بس. والـ awk طبع [[ubuntu 1000 /bin/bash]] و [[sara 1001 /bin/bash]] (على جهازك هتلاقي يوزرك).

وسطور shadow:
[[root:*:20713:0:99999:7:::]]: [[*]] يعني root ملوش باسورد يتدخل بيه (أوبونتو بيخليك تستخدم sudo).
[[sara:$y$j9T$0YoYg/3WqWk7mpX9kwPFL0$k/dcsl9...:20728:0:99999:7:::]]: [[$y$]] يعني yescrypt، وبعده الإعدادات ([[j9T]]) والـ salt والـ hash، و 20728 يوم من 1970 = 2026-10-02 (تاريخ آخر تغيير)، و 0 min، و 99999 max (يعني مفيش انتهاء)، و 7 warn.
وبعد [[usermod -L sara]] الحقل بقى يبدأ بـ [[!$y$]].

وكمان: [[ls -l /etc/shadow]] بيطبع [[-rw-r----- 1 root shadow]]، ولو حاولت تقراه من غير sudo: [[cat: /etc/shadow: Permission denied]]. ولو لقيت [[ENCRYPT_METHOD SHA512]] في [[/etc/login.defs]] بس الـ hashes الجديدة [[$y$]]، ده طبيعي: [[passwd]] على أوبونتو ماشي بإعداد PAM ([[pam_unix.so obscure yescrypt]] في [[/etc/pam.d/common-password]]) مش بـ login.defs.`
        },
        {
          cmd: "groupadd و gpasswd",
          title: "جروب لفريق وفولدر مشترك",
          desc: R`[[groupadd]] بيعمل جروب جديد، و [[gpasswd]] بيضيف ويشيل أعضاء منه واحد واحد. والاستخدام الأشهر: فريق (ali و mona) شغالين على فولدر واحد على السيرفر، وكل واحد لازم يقدر يعدّل ملفات التاني من غير [[chmod 777]].

[[groupadd webteam]] بياخد أول رقم فاضي من 1000، و [[-g 2001]] رقم بإيدك (مفيد لو عايز نفس الرقم على كذا سيرفر، لأن الملفات بتتخزن بالرقم مش الاسم). و [[gpasswd]]:
• [[-a ali]] (add) يضيف عضو، ومالهوش فخ [[-a]] بتاع usermod: بيضيف لجروب واحد بس ومبيلمسش الباقي.
• [[-d mona]] (delete) يشيل عضو.
• [[-M ali,mona]] (members) يحدد اللستة كلها مرة واحدة (اللي مش مكتوب يتشال).
• [[-A ali]] (administrator) يخلّي ali مدير الجروب، فيقدر يضيف ويشيل من غير sudo.
و [[groupmod -n newname]] بيغيّر الاسم، و [[groupdel]] بيمسح الجروب، ومينفعش يمسح الجروب الأساسي ليوزر موجود.

الفولدر المشترك: [[chgrp webteam]] (change group) يخلي الفولدر ملك الجروب، و [[chmod 2775]]: الـ 2 في الأول اسمها setgid (شرحها في درس «setuid و setgid و sticky bit»)، و 775 = صاحبه والجروب rwx، والباقي r-x. والـ setgid على فولدر معناها: أي ملف يتعمل جواه ياخد جروب الفولدر (webteam) مش جروب اللي عمله. من غيرها ملف ali هيتعمل وجروبه ali، و mona مش هتقدر تعدّل فيه.

وعشان mona «تكتب» في ملف ali، الملف نفسه لازم يتعمل والجروب عنده w ([[rw-rw-r--]])، ودي بيحددها الـ umask بتاع ali (درس umask). على أوبونتو لما تدخل بـ ssh أو [[su -]]، الـ umask بيبقى 002 لليوزرز العاديين، فبيشتغل لوحده. ولو حد الـ umask عنده 022، ملفاته هتطلع [[rw-r--r--]] وزمايله يقروا بس؛ والحل default ACL (درس «setfacl و getfacl»).`,
          example: R`sudo groupadd webteam
sudo gpasswd -a ali webteam
sudo gpasswd -a mona webteam
getent group webteam
sudo mkdir -p /srv/webteam
sudo chgrp webteam /srv/webteam
sudo chmod 2775 /srv/webteam
ls -ld /srv/webteam
sudo gpasswd -d mona webteam`,
          try: R`اعمل اليوزرين ali و mona (درس «useradd و usermod») والجروب والفولدر. ادخل كـ ali بـ [[sudo su - ali]] واعمل [[echo v1 > /srv/webteam/plan.txt]] واخرج، وبعدين ادخل كـ mona وزوّد سطر بـ [[>>]]. وبعدين كرر نفس الكلام في فولدر تاني [[chmod 775]] من غير الـ 2 وقارن.`,
          mac: ["linux", R`على الماك: [[sudo dseditgroup -o create webteam]] و [[sudo dseditgroup -o edit -a ali -t user webteam]]. والـ setgid على الفولدرات مش محتاجينه هناك: الماك (زي BSD) بيدّي الملف الجديد جروب الفولدر اللي هو فيه دايمًا.`],
          deep: {
            why: R`الحل السهل الغلط لمشكلة «اتنين محتاجين يعدّلوا نفس الملفات» هو [[chmod 777]]، وده بيفتح الملفات لأي يوزر وأي خدمة على الجهاز. الجروب بيقول «الناس دول بس»، والـ setgid بيخلي الملفات الجديدة تفضل تبع الجروب لوحدها، فمحدش يحتاج يفتكر يعمل chgrp.`,
            how: R`الجروب سطر في [[/etc/group]]، وأعضاؤه آخر السطر: [[webteam:x:1007:ali,mona]]. و [[gpasswd]] بيعدّل السطر ده وسطره في [[/etc/gshadow]] (اللي فيه مديري الجروب: [[webteam:!:ali:ali,mona]]).

ولما ali تعمل ملف، الـ kernel بيدّيه صاحب = ali، وجروب = جروب ali الأساسي، إلا لو الفولدر عليه setgid، فياخد جروب الفولدر. وصلاحيات الملف = اللي البرنامج طلبه (غالبًا 666) ناقص الـ umask. فالتلاتة مع بعض: الجروب، والـ setgid، و umask 002، هما اللي بيعملوا فولدر مشترك شغال.

والعضوية الجديدة محتاجة login جديد زي أي جروب (درس «useradd و usermod»).`,
            when: R`فولدر موقع بيعدّل فيه أكتر من مطوّر، فولدر رفع ملفات بين يوزر الـ deploy وخدمة التطبيق، فولدر باك أب بيكتب فيه أكتر من سكربت. وأي حد محتاج «يقرا» اللوجات من غير sudo: [[gpasswd -a ali adm]] (جروب adm في أوبونتو بيقرا [[/var/log]]).`,
            mistakes: R`[[chmod 775]] من غير الـ 2، فالملفات الجديدة تتعمل بجروب صاحبها والفريق ميقدرش يعدّلها. وإنك تعمل [[chown -R]] أو [[chmod -R 775]] كل شوية تصلّح، بدل ما تحط setgid مرة. ونسيان إن [[gpasswd -M]] بيستبدل اللستة كلها. وإن العضو الجديد لازم يعمل login من جديد.`
          },
          lines: [
            R`اعمل جروب webteam.`,
            R`ضيف ali للجروب ([[-a]] add).`,
            R`ضيف mona.`,
            R`اتأكد: آخر السطر فيه الأعضاء.`,
            R`اعمل الفولدر المشترك.`,
            R`خلّي جروب الفولدر webteam.`,
            R`2 = setgid (الملفات الجديدة تاخد جروب الفولدر)، و 775 = الصاحب والجروب rwx، والباقي r-x.`,
            R`اتأكد: [[s]] مكان x الجروب.`,
            R`شيل mona من الجروب ([[-d]] delete).`
          ],
          sol: R`ناتج حقيقي من container أوبونتو 24.04: [[gpasswd -a]] بيطبع [[Adding user ali to group webteam]]، و [[getent group webteam]] بيطبع [[webteam:x:1007:ali,mona]]، و [[ls -ld]] بيطبع [[drwxrwsr-x 2 root webteam 4096 Oct  2 11:19 /srv/webteam]]: لاحظ [[s]] مكان x بتاعة الجروب.

ملف ali طلع [[-rw-rw-r-- 1 ali webteam]] (جروب الفولدر مش ali، والجروب يكتب لأن umask ali كان 0002)، و mona زوّدت فيه سطر من غير مشاكل. وفي الفولدر التاني ([[775]] من غير setgid) نفس الملف طلع [[-rw-rw-r-- 1 ali ali]]، و mona خدت [[-bash: line 1: /srv/nosgid/plan.txt: Permission denied]]: هي في webteam بس الملف جروبه ali. وجربت كمان ali بـ [[umask 022]] جوه الفولدر الصح: الملف طلع [[-rw-r--r-- 1 ali webteam]] و mona برضه Permission denied، وده سبب إن الـ umask جزء من الحل.

و [[gpasswd -d mona webteam]] بيطبع [[Removing user mona from group webteam]]. ولو [[groupdel sara]] وهو الجروب الأساسي ليوزر: [[groupdel: cannot remove the primary group of user 'sara']].`
        },
        {
          cmd: "passwd -l و chage",
          title: "اقفل حساب أو اجبره يغيّر الباسورد",
          desc: R`[[passwd -l]] بيقفل باسورد يوزر من غير ما تمسحه، و [[chage]] (change age) بيتحكم في عمر الباسورد والحساب: لازم يتغيّر كل كام يوم، ويتنبّه قبلها بقد إيه، والحساب كله يقفل إمتى. مفيدين لموظف في إجازة طويلة، أو متدرب حسابه لازم يقفل في ميعاد، أو يوزر جديد لازم يغيّر الباسورد المؤقت أول ما يدخل.

[[passwd]]:
• [[-l]] (lock) بيحط [[!]] قدام الـ hash في [[/etc/shadow]]، فمفيش باسورد هيطابقه. و [[-u]] (unlock) بيشيلها والباسورد القديم يرجع يشتغل.
• [[-e]] (expire) الباسورد يعتبر منتهي، فأول login يقوله «غيّره دلوقتي».
• [[-S]] (status) سطر حالة: الاسم، وبعده [[P]] فيه باسورد، أو [[L]] مقفول، أو [[NP]] من غير باسورد خالص (وده خطر)، وبعدين تاريخ آخر تغيير، و min و max و warn و inactive. و [[-S -a]] لكل اليوزرز.

[[chage]]:
• [[-l]] (list) كل المواعيد بكلام مقروء.
• [[-M 90]] (max) لازم يغيّره كل 90 يوم، و [[-m 1]] (min) مايغيّرهوش تاني قبل يوم (عشان ميرجعش للقديم على طول).
• [[-W 7]] (warn) يتنبّه قبل الانتهاء بأسبوع.
• [[-E 2026-12-31]] (expire) الحساب كله يقفل في التاريخ ده، و [[-E -1]] يلغي التاريخ.
• [[-d 0]] زي [[passwd -e]].

مهم: [[passwd -l]] بيقفل الباسورد بس، مش الحساب. لو اليوزر عنده مفتاح SSH، هيفضل يدخل عادي، والـ man page بتاعة passwd بتقول كده صريح. جربتها: بعد [[passwd -l ali]]، [[ssh localhost whoami]] بمفتاح ali طبع [[ali]]. عشان تقفل الحساب كله: [[usermod -e 1]] (تاريخ انتهاء في 1970، ودي الطريقة اللي الـ man page بتقترحها)، ومعاها لو عايز [[usermod -s /usr/sbin/nologin]]. بعدها نفس الـ ssh رد [[Your account has expired; please contact your system administrator.]]`,
          example: R`sudo passwd -S ali
sudo passwd -l ali
sudo passwd -u ali
sudo passwd -e ali
sudo chage -M 90 -m 1 -W 7 -E 2026-12-31 ali
sudo chage -l ali
sudo usermod -e 1 ali
sudo usermod -e "" ali`,
          try: R`على يوزر تجربة: اقفله وشوف [[passwd -S]]، وافتحه. وبعدين [[passwd -e]] وادخل بيه من ترمنال تاني ([[su - ali]] من يوزر عادي، أو ssh) وشوف بيطلب منك إيه. وفي الآخر حط تاريخ انتهاء للحساب واقرا [[chage -l]].`,
          flag: "danger",
          mac: ["linux", R`مفيش [[chage]] ولا [[passwd -l]] على الماك. سياسات الباسورد بـ [[pwpolicy]]، وتعطيل حساب: [[sudo pwpolicy -u ali disableuser]]، والأسهل من System Settings ← Users & Groups.`],
          deep: {
            why: R`مسح يوزر بيمسح أثره (وأحيانًا ملفاته)، وساعات محتاج بس «توقفه»: حد في إجازة، أو متعاقد خلّص، أو حساب شكله اتسرق ولسه بتحقق. والباسورد المؤقت اللي بتبعته لحد جديد لازم ميعيشش: [[passwd -e]] بيخليه أول حاجة يعملها يغيّره.`,
            how: R`كل ده أرقام في سطر اليوزر في [[/etc/shadow]]: [[ali:$y$...:20728:1:90:7::20818:]]. الحقل التالت تاريخ آخر تغيير بالأيام من 1970، و [[passwd -e]] بيخليه 0 (يعني «اتغيّر سنة 1970» فهو منتهي). والرابع والخامس والسادس min و max و warn. والثامن تاريخ انتهاء الحساب كله (20818 = 2026-12-31).

ولما حد يحاول يدخل، PAM (المكتبة اللي بتتحقق من الدخول) بتشيك الحاجات دي. والباسورد نفسه بيتشيك بس لو الدخول بالباسورد؛ الدخول بمفتاح SSH مبيقارنش hash، فـ [[!]] مبتفرقش معاه. لكن «الحساب منتهي» PAM بتشيكه مع أي طريقة دخول، حتى مع [[su]] من root.`,
            when: R`موظف ساب ولسه هتراجع ملفاته: [[usermod -e 1]] و [[-L]]. يوزر جديد بباسورد مؤقت: [[passwd -e]]. سياسة شركة «غيّر كل 90 يوم»: [[chage -M 90 -W 7]]. حساب متدرب لحد آخر السنة: [[chage -E 2026-12-31]]. وتشوف حالة الكل بسرعة: [[sudo passwd -S -a]].`,
            mistakes: R`الاعتماد على [[passwd -l]] لوحده لقفل حساب بيدخل بمفتاح SSH. و [[chage -E 0]]: الـ man page بتاعة shadow بتقول القيمة 0 ممكن تتفهم «من غير انتهاء»، فاستخدم 1 أو تاريخ. و [[-M 90]] على حساب خدمة أو حساب بتدخل بيه سكربتات، فيوم 91 يقف. ونسيان [[-m]] مع [[-M]]، فاليوزر يغيّر الباسورد مرتين ورا بعض ويرجع للقديم.`
          },
          lines: [
            R`حالة الباسورد: P أو L أو NP، وتاريخ آخر تغيير.`,
            R`اقفل الباسورد ([[!]] قدام الـ hash). الدخول بالمفتاح لسه شغال.`,
            R`افتحه، والباسورد القديم يرجع.`,
            R`الباسورد منتهي: أول دخول لازم يغيّره.`,
            R`يتغيّر كل 90 يوم، ومش قبل يوم، وتنبيه قبلها بأسبوع، والحساب كله يقفل آخر السنة.`,
            R`اعرض المواعيد دي بكلام مقروء.`,
            R`اقفل الحساب كله (تاريخ انتهاء في 1970): مفيش دخول بأي طريقة.`,
            R`شيل تاريخ الانتهاء ورجّع الحساب.`
          ],
          sol: R`ناتج حقيقي من container أوبونتو 24.04: [[passwd -S ali]] طبع [[ali P 2026-10-02 0 99999 7 -1]]، وبعد [[-l]]: [[ali L 2026-10-02 0 99999 7 -1]] والـ hash بقى يبدأ بـ [[!$y$]]. و [[-l]] و [[-u]] بيطبعوا [[passwd: password changed.]] (رسالة عامة، مش معناها الباسورد اتغيّر).

بعد [[passwd -e ali]]، الدخول بيطبع:
[[You are required to change your password immediately (administrator enforced).]]
[[Changing password for ali.]]
وبعدين [[Current password:]] و [[New password:]] و [[Retype new password:]]، وبعدها بيكمّل عادي.

[[chage -l ali]] بعد سطر الـ chage:
[[Password expires : Dec 31, 2026]]
[[Account expires : Dec 31, 2026]]
[[Maximum number of days between password change : 90]]
[[Number of days of warning before password expires : 7]]

وبعد [[usermod -e 1 ali]]: [[Account expires : Jan 02, 1970]]، والدخول بمفتاح SSH رد [[Your account has expired; please contact your system administrator.]]، وحتى root لما عمل [[su - ali]] خد [[su: Authentication failure]].`
        },
        {
          cmd: "su - و sudo -i",
          title: "تبقى يوزر تاني أو root",
          desc: R`[[su]] و [[sudo]] الاتنين بيخلّوك تشتغل كيوزر تاني، والفرق في باسورد مين بتكتب، وفي «البيئة» اللي بتاخدها: الفولدر والمتغيرات والـ PATH. [[su]] (switch user) بيطلب باسورد اليوزر اللي رايحله، و [[sudo]] بيطلب باسوردك انت وبيشوف القواعد في [[/etc/sudoers]] (الدرس الجاي).

• [[su sara]]: بقيت sara، بس لسه في نفس الفولدر ومعاك متغيراتك انت.
• [[su - sara]]: الشرطة معناها login shell، يعني كأنها لسه داخلة: فولدرها ومتغيراتها و [[.profile]] بتاعها. ده الشكل الآمن.
• [[su -]] من غير اسم: root، ومحتاج باسورد root.
• [[sudo -i]] (login): شيل root كامل بباسوردك انت، بيروح [[/root]] وبيقرا إعدادات root. زي [[su -]] من غير ما تحتاج باسورد root.
• [[sudo -s]] (shell): شيل root بس فاضل في نفس الفولدر.
• [[sudo -u sara أمر]]: شغّل أمر واحد كيوزر تاني (مش root)، زي [[sudo -u postgres psql]] تدخل قاعدة البيانات بيوزر postgres.
• [[sudo -l]] (list): أنا مسموحلي بإيه؟ و [[sudo -l -U deploy]] لحد تاني (محتاج root).
• [[exit]] أو Ctrl+D يرجّعك لنفسك.

على أوبونتو باسورد root مقفول من التسطيب ([[sudo passwd -S root]] بيقول [[L]])، فـ [[su -]] هيرد [[su: Authentication failure]] مهما كتبت. ده مقصود: الكل يستخدم sudo، وكل أمر بيتسجّل باسم اللي عمله في [[/var/log/auth.log]] (أو بـ journalctl، شوف درس «journalctl» في تاب «VPS»). لو محتاج شيل root استخدم [[sudo -i]]. على فيدورا، وعلى ديبيان لو اديت root باسورد وقت التسطيب، [[su -]] بيشتغل.

وخلي بالك: [[sudo]] بيمسح معظم متغيراتك (إعداد اسمه [[env_reset]]) وبيستخدم PATH ثابت ([[secure_path]])، عشان كده أمر اتسطب في [[~/.local/bin]] ممكن يقول command not found مع sudo بس.`,
          example: R`su - sara
whoami; pwd
exit
sudo -i
exit
sudo -s
exit
sudo -u sara whoami
sudo -l
sudo passwd -S root`,
          try: R`من فولدر زي [[/tmp]] اعمل [[export MYVAR=hello]]، وبعدين قارن: [[su sara]] و [[su - sara]] و [[sudo -i]] و [[sudo -s]]، وفي كل واحد اكتب [[whoami; pwd; echo $MYVAR]] وبعدين [[exit]].`,
          mac: ["both", R`نفس الأوامر على الماك، و root مقفول هناك كمان، فـ [[sudo -i]] هو الطريق. والفرق إن جروب المديرين اسمه [[admin]].`],
          deep: {
            why: R`محتاج تجرّب حاجة كيوزر تاني (هل deploy يقدر يقرا الملف ده؟)، أو تعمل كذا أمر ورا بعض كـ root من غير ما تكتب sudo كل مرة، أو تشغّل أداة بيوزر خدمتها (postgres، www-data). والاختيار الغلط بين الأشكال دي بيعمل مشاكل غريبة: أمر بيشتغل مع [[sudo -i]] وبيفشل مع [[sudo]]، أو ملفات بتتعمل ملك root في فولدر يوزر.`,
            how: R`[[su]] برنامج setuid (درس «setuid و setgid و sticky bit»)، فبيشتغل كـ root، ويسأل PAM: الباسورد ده بتاع اليوزر المطلوب؟ ولو أيوه، يغيّر الـ UID ويشغّل الشيل بتاعه. والـ [[-]] بتقوله: امسح المتغيرات، واعمل [[cd]] للـ home، وشغّل الشيل كـ login shell فيقرا [[.profile]].

[[sudo]] برضه setuid، بس بيسأل عن باسوردك انت، ويشيك القواعد، ويسجّل الأمر، ويشغّله. و [[-i]] بيعمل نفس اللي [[su -]] بيعمله، و [[-s]] بيشغّل شيل من غير login. وبعد ما تكتب الباسورد، sudo بيفتكره حوالي ربع ساعة للترمنال ده بس.`,
            when: R`تجرّب صلاحيات يوزر: [[sudo -u www-data cat /var/www/app/.env]]. شغل كتير كـ root ورا بعض (تسطيب وتعديل إعدادات): [[sudo -i]] وبعدين [[exit]] أول ما تخلص. أداة خدمة: [[sudo -u postgres psql]]. يوزر جديد عايز تعرف يقدر يعمل إيه: [[sudo -l -U deploy]].`,
            mistakes: R`[[su sara]] من غير شرطة، فتفضل بالـ PATH والمتغيرات بتوعك وتحصل حاجات مش منطقية. وإنك تفضل في [[sudo -i]] وتنسى، فتعمل [[git clone]] أو [[npm install]] كـ root. وإنك تحاول تدّي root باسورد على أوبونتو «عشان su يشتغل»، وده باب زيادة. و [[sudo su -]]: بيشتغل، بس [[sudo -i]] نفس الحاجة وأوضح.`
          },
          lines: [
            R`بقيت sara بكامل بيئتها (login shell). هيسألك باسورد sara.`,
            R`اتأكد: انت sara وفي فولدرها.`,
            R`ارجع ليوزرك.`,
            R`شيل root كامل بباسوردك انت، وبيبدأ من [[/root]].`,
            R`اخرج من root.`,
            R`شيل root وانت فاضل في نفس الفولدر.`,
            R`اخرج.`,
            R`أمر واحد كيوزر sara (مش root).`,
            R`أنا مسموحلي أعمل إيه بـ sudo؟`,
            R`حالة باسورد root: [[L]] يعني مقفول.`
          ],
          sol: R`ناتج حقيقي من container أوبونتو 24.04، كل الأوامر اتعملت من [[/srv]] بعد [[export MYVAR=hello]]:
[[su sara]]: [[whoami=sara pwd=/srv HOME=/home/sara]] و [[MYVAR=hello]] (فضلت).
[[su - sara]]: [[pwd=/home/sara]] و [[MYVAR=]] فاضي.
[[sudo -i]]: [[user=root pwd=/root HOME=/root]].
[[sudo -s]]: [[user=root pwd=/srv HOME=/root]].
[[sudo -u ali]]: [[user=ali pwd=/srv HOME=/home/ali]].
و [[MYVAR]] كان فاضي في كل أشكال sudo، بسبب [[env_reset]].

و [[sudo -l]] لـ sara (اللي في جروب sudo) طبع [[User sara may run the following commands on server:]] وتحته [[(ALL : ALL) ALL]]. ويوزر مش في sudo خد [[Sorry, user ali may not run sudo on server.]]، ولو حاول يشغّل أمر: [[ali is not in the sudoers file.]]. و [[passwd -S root]] طبع [[root L 2026-09-17 0 99999 7 -1]]، و [[su -]] بأي باسورد: [[su: Authentication failure]].`
        },
        {
          cmd: "visudo و sudoers.d",
          title: "صلاحية sudo لأمر واحد بس",
          desc: R`[[visudo]] بيعدّل قواعد sudo بأمان: بيفتح نسخة، ولما تحفظ بيفحص الـ syntax، ولو فيه غلطة بيرفض يطبّق. غلطة في [[/etc/sudoers]] متحفظة من nano عادي ممكن تكسر sudo كله، وعلى أوبونتو (root مقفول) ساعتها مش هتعرف تصلّح غير من recovery mode أو console الاستضافة.

القاعدة: [[deploy ALL=(root) NOPASSWD: /usr/bin/systemctl restart myapp]]:
• [[deploy]] مين. و [[%webteam]] جروب (الـ [[%]] معناها جروب).
• [[ALL]] على أنهي جهاز (hostname). دايمًا ALL إلا لو نفس الملف متوزّع على سيرفرات كتير.
• [[(root)]] يقدر يشغّل الأوامر كمين. و [[(ALL:ALL)]] أي يوزر وأي جروب.
• [[NOPASSWD:]] من غير ما يسأل باسورد (للسكربتات و CI). من غيرها بيسأل.
• وبعدها الأوامر بالمسار الكامل ومفصولة بفاصلة. ولو كتبت arguments، يبقى دي بالظبط بس المسموحة.
و [[Cmnd_Alias MYAPP = ...]] اسم لمجموعة أوامر تستخدمه في كذا قاعدة. والسطر الموجود في أوبونتو [[%sudo ALL=(ALL:ALL) ALL]] هو اللي بيدّي جروب sudo كل حاجة.

مكان القواعد: متعدّلش [[/etc/sudoers]] نفسه. حط ملف في [[/etc/sudoers.d/]]، والسطر [[@includedir /etc/sudoers.d]] في آخر الملف الأساسي بيقرا الفولدر ده. و [[visudo -f /etc/sudoers.d/deploy]] (file) يعدّل الملف ده بنفس الأمان، و [[visudo -c]] (check) يفحص كل الملفات، و [[visudo -cf ملف]] يفحص ملف قبل ما تحطه. والصلاحيات لازم [[0440]] (root وجروب root يقروا بس)، ولو الملف حد يقدر يكتب فيه sudo بيتجاهله. واسم الملف مينفعش فيه نقطة ولا يخلص بـ [[~]]: [[deploy.conf]] بيتجاهل من غير أي رسالة (جربتها).

الخطر: [[NOPASSWD: ALL]] معناها اللي يسرق حساب اليوزر ده (أو مفتاحه أو توكن الـ CI) بقى root من غير ولا سؤال. وفيه أوامر شكلها بريء بس بتدّي root كامل: [[vim]] و [[less]] (منهم تكتب [[:!bash]] فيفتح شيل root)، و [[find]] بـ [[-exec]]، و [[cp]] و [[tee]] (يكتبوا فوق [[/etc/sudoers]] نفسه)، و [[systemctl]] من غير arguments محددة. اديه أمر محدد بـ arguments محددة، ولو محتاج يعدّل ملف معين استخدم [[sudoedit]].`,
          example: R`sudo visudo -f /etc/sudoers.d/deploy
# اكتب جوه الملف السطرين دول واحفظ:
# Cmnd_Alias MYAPP = /usr/bin/systemctl restart myapp, /usr/bin/systemctl status myapp
# deploy ALL=(root) NOPASSWD: MYAPP
sudo visudo -c
ls -l /etc/sudoers.d/
sudo -l -U deploy
sudo -u deploy sudo -n systemctl restart myapp
sudo -u deploy sudo -n whoami`,
          try: R`على جهاز تجربة: اعمل يوزر deploy، وادّيله بالقاعدة دي صلاحية [[systemctl restart]] لخدمة واحدة بس من غير باسورد. اتأكد بـ [[sudo -l -U deploy]]، وجرّب كـ deploy أمر مسموح وأمر مش مسموح. وجرّب تحفظ قاعدة غلط (امسح النقطتين بعد NOPASSWD) وشوف visudo بيعمل إيه.`,
          flag: "danger",
          mac: ["diff", R`[[visudo]] موجود على الماك ونفس الـ syntax، والفولدر [[/private/etc/sudoers.d]] (و [[/etc]] على الماك اختصار لـ [[/private/etc]]). وجروب المديرين [[%admin]] مش [[%sudo]].`],
          deep: {
            why: R`السكربتات و CI (زي GitHub Actions بيعمل deploy) محتاجين يعملوا حاجة واحدة بصلاحية root، زي restart لتطبيقك، ومينفعش يسألوا باسورد. الحل الغلط إن يوزر الـ deploy ياخد sudo كامل من غير باسورد. الحل الصح قاعدة لأمر واحد، فلو المفتاح اتسرق، أقصى حاجة المهاجم يعملها restart.`,
            how: R`sudo بيقرا [[/etc/sudoers]] والملفات اللي في [[/etc/sudoers.d]] بالترتيب الأبجدي، ولو أكتر من قاعدة طابقت، آخر واحدة هي اللي بتكسب. عشان كده الملفات بيتسمّوا ساعات بأرقام في الأول.

ولما deploy يكتب [[sudo systemctl restart myapp]]، sudo بيدوّر على [[systemctl]] في [[secure_path]] فيلاقيه [[/usr/bin/systemctl]]، ويقارن الأمر كامل بالـ arguments باللي في القاعدة. [[restart myapp]] مطابق؛ [[stop myapp]] لأ، فبيسأل باسورد (ولو بـ [[-n]]، non-interactive، بيفشل على طول).

و visudo بيقفل الملف عشان اتنين ميعدّلوش مع بعض، ويكتب في نسخة مؤقتة، ويفحصها بنفس الـ parser اللي sudo بيستخدمه، وينقلها مكان الأصل لو سليمة بس.`,
            when: R`يوزر deploy بيعمل restart لخدمة: القاعدة اللي فوق. فريق محتاج reload لـ Nginx بس: [[%webteam ALL=(root) /usr/bin/systemctl reload nginx]]. سكربت monitoring بيقرا لوج محمي: أمر [[cat]] لملف محدد. وبعد أي تعديل: [[sudo visudo -c]] و [[sudo -l -U اليوزر]].`,
            mistakes: R`[[sudo nano /etc/sudoers]] بدل visudo. و [[NOPASSWD: ALL]] لأي يوزر بيدخل من سكربت أو CI. وأمر من غير مسار كامل، أو بـ [[*]] في الـ arguments (بتطابق أي حاجة، حتى arguments خطيرة). واسم ملف فيه نقطة فيتجاهل وتقعد تدوّر ليه مش شغال. وإنك تختار (Q) في سؤال visudo بعد غلطة: بيحفظ الملف الغلط.`
          },
          lines: [
            R`افتح ملف القواعد الخاص بـ deploy بأمان (هيتفحص لما تحفظ).`,
            R`افحص كل ملفات sudoers.`,
            R`اتأكد إن الملف [[-r--r-----]] (0440).`,
            R`deploy مسموحله بإيه؟`,
            R`جرّب كـ deploy الأمر المسموح ([[-n]]: متسألش باسورد، افشل لو محتاج).`,
            R`وأمر مش مسموح: هيفشل.`
          ],
          sol: R`ناتج حقيقي من container أوبونتو 24.04 (مع [[systemctl]] وهمي لأن مفيش systemd في الـ container): [[visudo -c]] طبع [[/etc/sudoers: parsed OK]] و [[/etc/sudoers.d/README: parsed OK]] و [[/etc/sudoers.d/deploy: parsed OK]]. و [[ls -l]] بيوري [[-r--r----- 1 root root 190 Oct  2 11:20 deploy]]. و [[sudo -l -U deploy]] طبع:
[[User deploy may run the following commands on server:]]
[[(root) NOPASSWD: /usr/bin/systemctl restart myapp, /usr/bin/systemctl status myapp]]
والأمر المسموح اشتغل من غير باسورد، و [[sudo -n whoami]] و [[sudo -n systemctl stop myapp]] ردّوا [[sudo: a password is required]].

ولو حفظت قاعدة غلط ([[NOPASSWD]] من غير [[:]]):
[[/etc/sudoers.d/test:1:46: syntax error]]
والسطر وتحته [[^]] عند الغلطة، وبعدين [[What now?]]، ولو كتبت [[?]]: [[(e)dit sudoers file again]] و [[e(x)it without saving changes to sudoers file]] و [[(Q)uit and save changes to sudoers file (DANGER!)]]. اختار e تصلّح أو x تخرج. (x ساب ملف فاضي، وده مش بيضر.)

وجربت الفخاخ: صلاحيات 0644 خلّت [[visudo -c]] يقول [[bad permissions, should be mode 0440]]، وصلاحيات 0666 خلّت sudo نفسه يقول [[sudo: /etc/sudoers.d/deploy is world writable]] ويتجاهله. وتغيير الاسم لـ [[deploy.conf]] خلّى [[sudo -l -U deploy]] يقول [[User deploy is not allowed to run sudo on server.]]. والطريقة اللي من غير محرر (للسكربتات) تحت.`,
          solCode: R`echo 'deploy ALL=(root) NOPASSWD: /usr/bin/systemctl restart myapp' > /tmp/deploy
sudo visudo -cf /tmp/deploy && sudo install -m 0440 -o root -g root /tmp/deploy /etc/sudoers.d/deploy
sudo -l -U deploy`
        },
        {
          cmd: "setuid و setgid و sticky bit",
          title: "الـ s والـ t في الصلاحيات",
          desc: R`فوق الـ rwx فيه ٣ صلاحيات خاصة بتظهر مكان الـ x في [[ls -l]]: setuid ([[s]] في خانة صاحب الملف)، و setgid ([[s]] في خانة الجروب)، و sticky ([[t]] في خانة الباقي). وفي الأرقام بتبقى رقم رابع قدام: 4 setuid، و 2 setgid، و 1 sticky، فـ [[chmod 2775]] يعني setgid + 775، و [[1777]] يعني sticky + 777.

setuid على برنامج ([[chmod u+s]] أو [[4755]]): البرنامج بيشتغل بصلاحيات صاحبه (root غالبًا) مهما مين شغّله. ده اللي بيخلّي [[passwd]] يقدر يكتب في [[/etc/shadow]] وانت يوزر عادي: [[ls -l /usr/bin/passwd]] بيوري [[-rwsr-xr-x 1 root root]]، وكمان [[sudo]] و [[su]] و [[mount]]. ولينكس بيتجاهل setuid على السكربتات (جربت سكربت bash ملك root عليه s، وطبع اسم اليوزر العادي مش root)، فهي بتأثر في البرامج المترجمة بس.

setgid على فولدر ([[chmod g+s]] أو [[2775]]): الملفات الجديدة جواه بتاخد جروب الفولدر، والفولدرات الجديدة بتورث الـ setgid نفسه. ده أساس الفولدر المشترك (درس «groupadd و gpasswd»). وعلى برنامج: بيشتغل بصلاحيات جروبه، زي [[chage]] اللي جروبه [[shadow]] عشان يقرا shadow.

sticky على فولدر ([[chmod +t]] أو [[1777]]): في فولدر الكل بيكتب فيه، كل واحد يمسح أو يغيّر اسم ملفاته هو بس. ده [[/tmp]]: [[drwxrwxrwt]]. من غيره أي يوزر يقدر يمسح ملفات غيره المؤقتة.

الكابيتال: [[S]] أو [[T]] يعني البت الخاص موجود بس الـ x اللي تحته مش موجود، وده غالبًا غلطة: [[chmod u+s]] على ملف 644 بيطلّع [[-rwSr--r--]].

وفخ في GNU chmod: [[chmod 755]] على فولدر عليه setgid مبيشيلوش (بيحافظ عليه عمدًا عشان متبوّظش فولدر مشترك). عشان تشيله: [[chmod g-s]]، أو ٥ أرقام [[chmod 00755]]. على الملفات العادية الأرقام الأربعة بتمسحه عادي.

فحص أمني: [[find / -xdev -perm -4000 -type f]]: [[-perm -4000]] يعني «البت ده موجود ومعاه أي حاجة»، و [[-xdev]] متدخلش ديسكات تانية (زي [[/proc]] والديسكات المتركّبة)، و [[2>/dev/null]] يخبي رسايل Permission denied. على أوبونتو 24.04 النضيف هتلاقي حوالي ١٠ ملفات معروفة. أي حاجة غريبة، زي نسخة من [[bash]] أو [[find]] عليها s في [[/tmp]] أو home، علامة اختراق كلاسيكية: المخترق بيسيبها عشان يرجع root بعدين.`,
          example: R`ls -l /usr/bin/passwd /usr/bin/sudo
ls -ld /tmp
sudo mkdir -p /srv/shared
sudo chmod 2775 /srv/shared
sudo chmod +t /srv/shared
stat -c '%a %A %n' /srv/shared /tmp /usr/bin/passwd
sudo chmod g-s,-t /srv/shared
sudo find / -xdev -perm -4000 -type f 2>/dev/null
sudo find / -xdev -perm -2000 -type f 2>/dev/null`,
          try: R`اعمل الفولدر وحط عليه setgid و sticky واقرا الأرقام بـ [[stat]]. وبعدين جرّب [[chmod 755]] عليه وشوف الـ s اتشالت ولا لأ، وجرّب [[chmod 00755]]. وفي الآخر اعمل الـ find على جهازك وقارن باللستة اللي في الحل.`,
          mac: ["both", R`نفس الفكرة والحروف على الماك، و [[find / -perm -4000 -type f 2>/dev/null]] شغال (من غير [[-xdev]] هياخد وقت). و [[/tmp]] هناك اختصار لـ [[/private/tmp]] وعليه t.`],
          deep: {
            why: R`فيه حاجات اليوزر العادي لازم يعملها بس محتاجة root: يغيّر باسورده (يكتب في shadow)، يستخدم sudo، يركّب فلاشة. setuid بيحلها من غير ما تدّيه root. والـ setgid والـ sticky بيحلوا مشكلتين في الفولدرات المشتركة: الجروب، ومين يمسح إيه. ونفس القوة دي هي اللي بتخلي setuid على البرنامج الغلط ثغرة.`,
            how: R`كل ملف ليه ١٢ bit صلاحيات مش ٩: التلاتة الزيادة هما الـ 4 و 2 و 1 اللي قدام. ولما تشغّل برنامج عليه setuid، الـ kernel بيدّي العملية «effective UID» = صاحب الملف بدل UID بتاعك، فكل الملفات بتتفتح بصلاحياته. عشان كده البرامج دي مكتوبة بحذر شديد ([[passwd]] بيسيبك تغيّر باسورد نفسك بس).

والسكربت بيتجاهل لأن اللي بيشتغل فعلًا هو [[bash]] بيقرا الملف، والـ kernel شايل الدعم ده من زمان عشان ثغرات قديمة.

والـ setgid على الفولدر قاعدة في الـ kernel وقت إنشاء الملف: «جروب الملف الجديد = جروب الفولدر». والـ sticky قاعدة وقت المسح والنقل: «لازم تكون صاحب الملف أو صاحب الفولدر أو root».`,
            when: R`فولدر فريق: [[2775]]. فولدر الكل بيرمي فيه ملفات (uploads مؤقتة): [[1777]] زي [[/tmp]]. مراجعة أمنية دورية لسيرفر: الـ find وتقارنه بنسخة قديمة ([[> suid-list.txt]] وبعدين [[diff]]). و setuid بتاعك انت: تقريبًا أبدًا، استخدم sudo بقاعدة محددة.`,
            mistakes: R`[[chmod 777]] على فولدر مشترك من غير t، فأي حد يمسح شغل أي حد. و [[chmod u+s]] على سكربت وتستغرب إنه مش شغال كـ root. و [[chmod -R 755]] تفتكره شال الـ setgid من الفولدرات وهو مشالوش. و [[find / -perm 4000]] من غير الشرطة: بيدوّر على الصلاحيات دي «بالظبط» (4000 لوحدها)، فمش هيلاقي [[4755]].`
          },
          lines: [
            R`[[s]] مكان x الصاحب: البرنامجين بيشتغلوا كـ root.`,
            R`[[t]] في الآخر: sticky، كل واحد يمسح ملفاته بس.`,
            R`اعمل فولدر تجربة.`,
            R`setgid (2) + 775.`,
            R`زوّد sticky ([[+t]]) فوقها.`,
            R`اطبع الصلاحيات رقم ([[%a]]) وحروف ([[%A]]) واسم ([[%n]]).`,
            R`شيل الاتنين بالحروف (الطريقة المضمونة على الفولدرات).`,
            R`كل البرامج اللي عليها setuid على الديسك ده.`,
            R`وكل اللي عليها setgid.`
          ],
          sol: R`ناتج حقيقي من container أوبونتو 24.04: [[-rwsr-xr-x 1 root root 64152 May 30 2024 /usr/bin/passwd]] و [[-rwsr-xr-x 1 root root 282032 ... /usr/bin/sudo]]، و [[drwxrwxrwt ... /tmp]]. و [[stat]] طبع:
[[3775 drwxrwsr-t /srv/shared]]
[[1777 drwxrwxrwt /tmp]]
[[4755 -rwsr-xr-x /usr/bin/passwd]]
وبعد [[chmod g-s,-t]]: [[775 drwxrwxr-x]].

الـ find للـ setuid طلّع: [[/usr/bin/mount]] و [[/usr/bin/chsh]] و [[/usr/bin/gpasswd]] و [[/usr/bin/passwd]] و [[/usr/bin/umount]] و [[/usr/bin/newgrp]] و [[/usr/bin/su]] و [[/usr/bin/chfn]] و [[/usr/bin/sudo]]. وللـ setgid: [[/usr/bin/expiry]] و [[/usr/bin/chage]] و [[/usr/sbin/unix_chkpwd]] و [[/usr/sbin/pam_extrausers_chkpwd]]. على Desktop هتلاقي أكتر (زي [[fusermount3]] و [[pkexec]] وحاجات snap).

وفي الـ sticky: mona حاولت تمسح ملف ali في [[/tmp]]: [[rm: cannot remove '/tmp/ali.txt': Operation not permitted]]. والفخ: على فولدر عليه s، [[chmod 0755]] سابه [[drwxr-sr-x]]، و [[chmod 00755]] بس اللي شاله. و [[chmod u+s]] على ملف من غير x طلّع [[-rwSr--r--]].`
        },
        {
          cmd: "umask",
          title: "الصلاحيات الافتراضية للملفات الجديدة",
          desc: R`[[umask]] بيحدد صلاحيات أي ملف أو فولدر جديد بتعمله. البرامج بتطلب 666 (rw للكل) للملفات و 777 للفولدرات، والـ umask بيشيل منهم الصلاحيات اللي فيه: [[umask 022]] بيطلّع ملفات 644 وفولدرات 755.

كل رقم في الـ umask = الصلاحيات اللي «تتشال» من المجموعة دي (الصاحب، الجروب، الباقي): 0 متشيلش حاجة، و 2 شيل الكتابة، و 7 شيل كله.
• [[022]]: الكل يقرا وانت بس تكتب (ملفات 644 وفولدرات 755). الافتراضي لـ root ولكتير من التوزيعات.
• [[002]]: جروبك كمان يكتب (664 و 775). الافتراضي لليوزرز العاديين في أوبونتو، لأن كل يوزر في جروب لوحده باسمه، فمفيش حد تاني فيه.
• [[027]]: الجروب يقرا، والباقي ولا حاجة (640 و 750). كويس للسيرفرات.
• [[077]]: انت بس (600 و 700). للأسرار والمفاتيح.

[[umask]] لوحده بيطبع القيمة الحالية بـ ٤ أرقام ([[0022]]، الأول للبتات الخاصة)، و [[-S]] (symbolic) بيطبع اللي «فاضل» مش اللي بيتشال: [[u=rwx,g=rx,o=rx]]. وتقدر تكتبها كده كمان: [[umask u=rwx,g=rx,o=]] هي نفسها 027.

«طرح» ده تبسيط: الحقيقة إنها بتشيل bits. [[umask 033]] مش بيطلّع 633: الملف بيطلع 644 والفولدر 744 (جربتها). وكمان الـ umask عمره ما بيضيف x: الملف العادي بيتعمل من غير تشغيل مهما كانت، فـ [[chmod +x]] لازم للسكربتات.

مكانها: [[umask 027]] في الترمنال بتأثر على الشيل ده واللي بيتفتح منه بس. عشان تثبتها ليوزرك: آخر [[~/.bashrc]]. للجهاز كله: [[UMASK]] في [[/etc/login.defs]] (أوبونتو بيطبقها عن طريق pam_umask، ومع [[USERGROUPS_ENAB yes]] بتبقى 002 لليوزر اللي جروبه باسمه). وللخدمات: [[UMask=0027]] في ملف الخدمة بتاع systemd (شوف درس «/etc/systemd/system/myapp.service» في تاب «VPS»)، لأن الخدمة مبتقراش .bashrc.`,
          example: R`umask
umask -S
umask 027
touch secret.txt && mkdir private
ls -ld secret.txt private
umask 077
touch key.txt && ls -l key.txt
umask 022
echo 'umask 027' >> ~/.bashrc`,
          try: R`في [[~/lab]] جرّب ٤ قيم (022 و 002 و 027 و 077)، وفي كل مرة اعمل ملف وفولدر واقرا صلاحياتهم. وبعدين جرّب [[umask 033]] وتوقّع النتيجة قبل ما تشوفها.`,
          mac: ["both", R`نفس الكلام، والافتراضي على الماك [[0022]]. ولو عايزها ثابتة لكل البرامج مش الترمنال بس: [[sudo launchctl config user umask 027]] وبعدين ريستارت.`],
          deep: {
            why: R`كل ملف بيتعمل على السيرفر (لوج، أو باك أب، أو ملف رفعه يوزر) بياخد صلاحياته من الـ umask بتاع البرنامج اللي عمله. umask 022 معناه أي يوزر على الجهاز يقدر يقرا الباك أب بتاع قاعدة البيانات. والعكس: umask 077 في فولدر مشترك معناه زمايلك مش هيشوفوا ملفاتك.`,
            how: R`الـ umask قيمة في كل عملية (زي الفولدر الحالي)، وبتتورث للعمليات اللي بتطلع منها. ولما برنامج يعمل ملف، بيطلب صلاحيات (غالبًا 0666، وللفولدر 0777)، والـ kernel بيعمل: المطلوب AND (NOT umask). يعني أي bit موجود في الـ umask بيتشال. عشان كده [[033]] بتشيل wx من الجروب والباقي، والملف أصلًا معندوش x، فيفضل 644.

و [[umask]] أمر جوه الشيل نفسه (builtin)، لأن برنامج منفصل مش هيقدر يغيّر قيمة الشيل اللي شغّله.`,
            when: R`سيرفر فيه أسرار: [[027]] أو [[077]] لليوزر اللي بيعمل الباك أب. فولدر مشترك: [[002]]. خدمة بتكتب ملفات المفروض Nginx يقراها: [[UMask=0022]] أو [[0027]] مع جروب مشترك. سكربت بيعمل مفتاح أو ملف .env: [[umask 077]] في أوله (أو [[install -m 600]]).`,
            mistakes: R`إنك تحسبها طرح فتتوقع أرقام غلط. وإنك تحط umask في [[.bashrc]] وتستغرب إن الخدمة مش متأثرة. وإنك تفتكر الـ umask بيغيّر صلاحيات الملفات الموجودة، هو للجديدة بس. و [[umask 000]] «عشان المشاكل تخلص»: زي [[chmod 777]] لكل حاجة هتتعمل.`
          },
          lines: [
            R`القيمة الحالية بالأرقام.`,
            R`نفس القيمة بالحروف: الصلاحيات اللي فاضلة.`,
            R`من هنا ورايح: الجروب يقرا بس، والباقي ولا حاجة.`,
            R`اعمل ملف وفولدر جداد.`,
            R`اقرا صلاحياتهم: [[-rw-r-----]] و [[drwxr-x---]].`,
            R`انت بس.`,
            R`ملف جديد: [[-rw-------]].`,
            R`رجّعها للعادي.`,
            R`ثبّت 027 ليوزرك في كل ترمنال جديد.`
          ],
          sol: R`ناتج حقيقي من container أوبونتو 24.04: كـ root [[umask]] طبع [[0022]] و [[-S]] طبع [[u=rwx,g=rx,o=rx]]. وكـ يوزر عادي داخل بـ [[su -]] طبع [[0002]] (بسبب USERGROUPS_ENAB). والنتايج:
[[-rw-r--r-- f022]] و [[drwxr-xr-x d022]]
[[-rw-rw-r-- f002]] و [[drwxrwxr-x d002]]
[[-rw-r----- f027]] و [[drwxr-x--- d027]]
[[-rw------- f077]] و [[drwx------ d077]]
و [[umask 033]] طلّع [[-rw-r--r--]] للملف و [[drwxr--r--]] للفولدر، مش 633.

و [[umask u=rwx,g=rx,o=]] وبعدين [[umask]] طبع [[0027]]. ولاحظ إن [[touch new.sh]] مع أي umask طلع من غير x، ولازم [[chmod +x]].`
        },
        {
          cmd: "setfacl و getfacl",
          title: "ادّي يوزر واحد زيادة صلاحية على فولدر",
          desc: R`الـ ACL (Access Control List) بتخليك تدّي يوزر أو جروب معين صلاحيات على ملف أو فولدر، من غير ما تغيّر صاحبه ولا جروبه. مفيدة لما التلات خانات (صاحب، جروب، باقي) مش كفاية: «الفولدر ده بتاع mona، وعايز ali بس يقدر يكتب فيه، من غير ما أعمل جروب».

[[setfacl]]:
• [[-m]] (modify) يضيف أو يعدّل قاعدة: [[u:ali:rwx]] يوزر ali ياخد rwx، و [[g:webteam:rX]] جروب، و [[X]] الكابيتال تشغيل للفولدرات بس (زي chmod).
• [[-R]] على الفولدر وكل اللي جواه دلوقتي.
• [[-d]] (default) القاعدة تتطبّق على أي ملف أو فولدر «هيتعمل» جوه بعد كده، وده اللي بيتنسى: من غيرها الملفات الجديدة مش هتبقى لـ ali صلاحية عليها.
• [[-x u:ali]] يشيل قاعدة واحدة، و [[-b]] يشيل كل الـ ACL ويرجع rwx عادي.

[[getfacl]] بيعرض القواعد: [[user::rwx]] صاحب الملف، و [[user:ali:rwx]] القاعدة اللي ضفناها، و [[group::r-x]] الجروب، و [[mask::rwx]] أقصى صلاحية لأي قاعدة غير صاحب الملف و other، و [[other::---]] الباقي، والسطور اللي بتبدأ بـ [[default:]] القواعد اللي هتتورث. و [[-c]] من غير التعليقات اللي فوق. و [[ls -l]] بيعلّم أي ملف عليه ACL بـ [[+]] في آخر الصلاحيات: [[drwxrwx---+]].

الـ mask: بيتحسب لوحده لما تضيف قواعد، وأي قاعدة صلاحيتها أكبر منه بتتقص، و getfacl بيكتب جنبها [[#effective:r-x]]. والفخ: لما يبقى فيه ACL، خانة الجروب في [[ls -l]] بتعرض الـ mask مش الجروب، و [[chmod 750]] على الفولدر بتغيّر الـ mask لـ r-x، فـ ali يفقد الكتابة من غير ما تاخد بالك (جربتها).

الدعم: ext4 و xfs و btrfs بيدعموها افتراضيًا على أي لينكس حديث (زمان كان لازم تكتب [[acl]] في fstab). الأوامر نفسها في باكدج [[acl]] (مش موجود في أوبونتو minimal ولا Docker). ومش مدعومة على FAT و exFAT. ومبتنتقلش مع [[cp]] العادي ولا [[tar]] إلا بـ [[cp -a]] و [[tar --acls]] و [[rsync -A]]. وللاحتياطي: [[getfacl -R dir > acl.txt]] وترجّعها بـ [[setfacl --restore=acl.txt]].`,
          example: R`sudo apt install acl
sudo setfacl -m u:ali:rwx /srv/reports
sudo setfacl -m u:ali:rw /srv/reports/q3.txt
ls -ld /srv/reports
getfacl /srv/reports
sudo setfacl -d -m u:ali:rwx /srv/reports
sudo setfacl -R -m g:webteam:rX /srv/reports
sudo setfacl -x u:ali /srv/reports/q3.txt
sudo setfacl -b /srv/reports`,
          try: R`اعمل [[/srv/reports]] ملك mona بـ [[chmod 750]] واتأكد إن ali مش قادر يعمل [[ls]] فيه. ادّيله ACL واتأكد إنه بقى يقدر. وبعدين خلّي mona تعمل ملف جديد جوه وشوف ali عنده صلاحية عليه ولا لأ، قبل [[-d]] وبعدها. وفي الآخر اعمل [[chmod 750]] تاني على الفولدر واقرا [[getfacl]].`,
          mac: ["diff", R`الماك عنده ACL بشكل تاني ومفيش setfacl: [[chmod +a "ali allow read,write,execute" dir]] يضيف، و [[ls -le]] يعرضها، و [[chmod -a "ali allow read,write,execute" dir]] يشيل.`],
          deep: {
            why: R`أحيانًا الحل بجروب تقيل: تعمل جروب جديد عشان يوزر واحد، وتغيّر جروب الفولدر فتبوّظ الصلاحيات اللي كانت شغالة. الـ ACL بيضيف استثناء من غير ما يلمس الموجود: يوزر الـ backup يقرا فولدر التطبيق، أو Nginx ([[www-data]]) يقرا فولدر جوه home يوزر، أو زميل يكتب في فولدر واحد بس.`,
            how: R`الـ ACL بيتخزن مع الملف نفسه كـ «extended attribute» على الـ filesystem. ولما حد يفتح الملف، الـ kernel بيشيك بالترتيب: صاحب الملف؟ يطبّق [[user::]]. قاعدة باسمه ([[user:ali:]])؟ يطبّقها مقصوصة بالـ mask. في جروب الملف أو جروب ليه قاعدة؟ أي واحدة فيهم بتسمح، مقصوصة بالـ mask. غير كده other.

والـ default ACL على الفولدر مش بيأثر على الفولدر نفسه، دي «وصفة» بتتنسخ لأي حاجة جديدة جواه، ولما بتكون موجودة الـ umask بيتجاهل والـ mask الجديد بيتحسب من الوصفة والصلاحيات اللي البرنامج طلبها.`,
            when: R`يوزر واحد زيادة على فولدر: [[setfacl -m u:اسمه:rwX]] ومعاه [[-d -m]]. سكربت باك أب بيوزر لوحده محتاج يقرا [[/var/www]]: [[setfacl -R -m u:backup:rX]] و [[-d]]. فولدر مشترك ليوزرز الـ umask بتاعهم 022: default ACL للجروب بيخلي الملفات الجديدة قابلة للكتابة للجروب مهما كان الـ umask.`,
            mistakes: R`ACL على الموجود ونسيان [[-d]] للجديد. و [[chmod]] على ملف عليه ACL فتقص الـ mask وتقفل الناس من غير ما تعرف ليه (بص على [[#effective]]). ونسخ الملفات بـ [[cp]] عادي لمكان تاني والـ ACL تضيع. وإنك متاخدش بالك من الـ [[+]] في [[ls -l]] وانت بتحقق ليه حد عنده صلاحية مش باينة.`
          },
          lines: [
            R`سطّب أوامر الـ ACL لو مش موجودة.`,
            R`ادّي ali (يوزر، [[u:]]) rwx على الفولدر، من غير ما تغيّر صاحبه ولا جروبه.`,
            R`وادّيه قراية وكتابة على ملف جواه.`,
            R`هتلاقي [[+]] في آخر الصلاحيات: عليه ACL.`,
            R`اعرض كل القواعد والـ mask.`,
            R`default ([[-d]]): أي حاجة هتتعمل جوه بعد كده ياخد ali عليها rwx.`,
            R`جروب webteam يقرا الفولدر وكل اللي جواه ([[-R]])، و [[X]] تدخل الفولدرات بس.`,
            R`شيل قاعدة ali بس من الملف ([[-x]]).`,
            R`شيل كل الـ ACL من الفولدر ([[-b]]).`
          ],
          sol: R`ناتج حقيقي من container أوبونتو 24.04: قبل الـ ACL، ali خد [[ls: cannot open directory '/srv/reports': Permission denied]]. بعدها [[ls -ld]] طبع [[drwxrwx---+ 2 mona mona 4096 Oct  2 11:20 /srv/reports]]، و [[getfacl]] طبع:
[[# file: srv/reports]] و [[# owner: mona]] و [[# group: mona]]
[[user::rwx]]
[[user:ali:rwx]]
[[group::r-x]]
[[mask::rwx]]
[[other::---]]
وفوقهم [[getfacl: Removing leading '/' from absolute path names]]، دي مجرد ملاحظة. و ali قدر يعمل ls ويكتب في q3.txt.

ملف جديد عملته mona بعد [[-d]] (بـ umask 027) طلع [[-rw-rw----+]] وفيه [[user:ali:rwx #effective:rw-]]: الـ default اشتغل والـ umask اتجاهل. وبعد [[chmod 750]] على الفولدر: [[mask::r-x]] و [[user:ali:rwx #effective:r-x]]، يعني ali فقد الكتابة. و [[setfacl -b]] رجّع [[drwxr-x---]] من غير [[+]].`
        },
        {
          cmd: "chattr و lsattr",
          title: "ملف محدش يقدر يمسحه، حتى root",
          desc: R`[[chattr]] (change attributes) بيحط على الملف خصائص على مستوى الـ filesystem أقوى من الصلاحيات: [[+i]] (immutable) يخلّي الملف مايتعدّلش ولا يتمسح ولا يتغيّر اسمه، حتى من root، لحد ما حد يشيلها. و [[lsattr]] بيعرض الخصائص دي.

[[+i]]: كل حاجة بترفض بـ [[Operation not permitted]]: الكتابة، و [[rm]]، و [[mv]]، و [[chmod]]، و [[ln]]، وحتى [[touch]]. وعلى فولدر: مينفعش تعمل أو تمسح حاجة جواه. و [[-i]] يشيلها. و [[+a]] (append only): مسموح الإضافة في الآخر بس ([[>>]] و [[tee -a]])، والكتابة فوقه ([[>]]) والمسح و [[sed -i]] بيترفضوا؛ مناسب لملفات اللوج، عشان اللي يخترق ميعرفش يمسح أثره بسهولة. والاتنين محتاجين root (تحديدًا صلاحية اسمها CAP_LINUX_IMMUTABLE)، واليوزر العادي بياخد Operation not permitted حتى على ملفه.

[[lsattr]] سطر حروف لكل ملف: [[----i---------e-------]]: الـ [[i]] immutable، والـ [[a]] append، والـ [[e]] (extents) طريقة تخزين ext4 العادية وموجودة على كل ملف تقريبًا، متقلقش منها. و [[-d]] للفولدر نفسه مش اللي جواه، و [[-R]] لكل اللي جوه.

ليه الدرس عليه علامة خطر: root نفسه هيتلخبط («انا root ومش قادر أمسح الملف!»)، وأي برنامج بيحدّث الملف هيفشل: [[apt]] لو حطيتها على ملف سيستم، أو certbot على شهادة، أو تطبيقك على .env بيتعدّل. وفيه حركة مشهورة للمخترقين إنهم يعملوا [[+i]] على ملفاتهم أو على [[authorized_keys]] عشان متتمسحش، فلو ملف مش راضي يتمسح كـ root، [[lsattr]] أول حاجة.

الدعم: ext4 و xfs و btrfs، وعلى الـ kernel الحديث tmpfs كمان. مش شغالة على FAT ولا NTFS ولا NFS. وفي Docker محتاج [[--cap-add LINUX_IMMUTABLE]] (أو [[--privileged]])، من غيرها حتى root بياخد [[chattr: Operation not permitted while setting flags on f]] (جربت الاتنين). والخصائص دي بتاعة الملف ده بس: [[cp]] بيطلّع نسخة من غيرها.`,
          example: R`echo "DB_PASS=secret" > .env
sudo chattr +i .env
lsattr .env
sudo rm -f .env
echo "x" >> .env
sudo chattr -i .env
sudo touch /var/log/myapp.log
sudo chattr +a /var/log/myapp.log
echo "started" | sudo tee -a /var/log/myapp.log
echo "wipe" | sudo tee /var/log/myapp.log
sudo chattr -a /var/log/myapp.log`,
          try: R`في [[~/lab]]: اعمل ملف وحط عليه [[+i]]، وجرّب تمسحه وتعدّله وتغيّر اسمه وتعمله chmod، حتى بـ sudo. شيلها وامسحه. وبعدين جرّب [[+a]] على ملف لوج: ضيف سطر بـ [[>>]] واكتب فوقه بـ [[>]]. ومتنساش [[-a]] في الآخر.`,
          flag: "danger",
          mac: ["diff", R`الماك مفيهوش chattr: [[sudo chflags schg file]] (system immutable، زي [[+i]]) و [[chflags uchg file]] (صاحبه يقدر يشيلها)، و [[ls -lO]] بيعرض الـ flags، و [[chflags noschg]] تشيلها. و [[schg]] في الوضع العادي محتاجة sudo بس، أما لو الجهاز في securelevel أعلى فمش هتتشال غير من recovery.`],
          deep: {
            why: R`الصلاحيات بتحمي من اليوزرز التانيين، بس root بيعدّي منها. [[+i]] بيحمي ملف من «الغلطة» حتى لو انت root: سكربت بيمسح بالغلط، أو حد بيعمل [[rm -rf]] في المكان الغلط. و [[+a]] بيخلي اللوج «يتكتب بس»، وده مهم لما تحتاج تعرف حصل إيه بعد اختراق.`,
            how: R`الخصائص دي flags متخزنة في الـ inode بتاع الملف على الـ filesystem، مش في bits الصلاحيات. والـ kernel بيشيكها قبل أي عملية تعديل، وقبل ما يشيك إنت مين. فحتى root بيترفض. والطريقة الوحيدة إن عملية عندها CAP_LINUX_IMMUTABLE (root عادي عنده) تشيل الـ flag الأول.

و [[sed -i]] بيفشل على [[+a]] لأنه مش بيعدّل الملف، بيكتب ملف جديد وبيغيّر اسمه مكان القديم، والاسم الجديد مش مسموح. ونفس السبب إن محررات كتير مش هتقدر تحفظ ملف عليه [[+i]].`,
            when: R`ملف إعدادات حساس مش المفروض يتغيّر غير وانت قاصد ([[/etc/resolv.conf]] لو برنامج كل شوية بيكتب فوقه، وانت عارف بتعمل إيه). لوج مهم: [[+a]] (بس logrotate هيفشل يلف الملف، فاعمل له استثناء أو متستخدمهاش على لوجات بتتلف). وفي التحقيق بعد اختراق: [[lsattr -R]] على [[/etc]] و [[~/.ssh]].`,
            mistakes: R`[[+i]] على ملف بيتحدّث لوحده (شهادة، .env، ملف apt) وتنسى، فتحديث يفشل بعد شهور ومحدش فاكر. و [[+a]] على لوج بيعمل له logrotate. وإنك تفتكر الـ flag بيتنقل مع الباك أب، ومش بيتنقل. و [[rm -rf]] بيفشل كـ root وتفضل تزوّد sudo، والحل [[lsattr]].`
          },
          lines: [
            R`اعمل ملف تجربة.`,
            R`immutable: محدش يغيّره ولا يمسحه، حتى root.`,
            R`اعرض الخصائص: هتلاقي [[i]].`,
            R`المسح بيترفض حتى بـ sudo.`,
            R`والإضافة كمان.`,
            R`شيل الحماية.`,
            R`اعمل ملف لوج.`,
            R`append only: إضافة في الآخر بس.`,
            R`[[tee -a]] بيضيف: مسموح.`,
            R`[[tee]] من غير [[-a]] بيكتب فوقه: مرفوض.`,
            R`شيل الـ append only في الآخر.`
          ],
          sol: R`ناتج حقيقي من container أوبونتو 24.04 بـ [[--privileged]]، على ext4 متركّب من ملف (loop): [[lsattr .env]] طبع [[----i---------e------- .env]]، وكل حاجة اترفضت:
[[rm: cannot remove '.env': Operation not permitted]]
[[bash: line 7: .env: Operation not permitted]] (للـ >>)
[[mv: cannot move '.env' to 'x': Operation not permitted]]
[[chmod: changing permissions of '.env': Operation not permitted]]
[[ln: failed to create hard link 'hard' => '.env': Operation not permitted]]
[[touch: cannot touch '.env': Operation not permitted]]
وبعد [[chattr -i]] الملف اتمسح عادي.

ومع [[+a]]: [[tee -a]] نجح، و [[tee]] من غير [[-a]] طبع [[wipe]] على الشاشة بس (لأن tee بيطبع دايمًا) وبعدها [[tee: myapp.log: Operation not permitted]]، والملف فضل فيه [[started]] بس. و [[rm]] اترفض، و [[sed -i]] قال [[sed: cannot rename logs/sedpdpoyK: Operation not permitted]] (وساب ملف مؤقت جنبه). ويوزر عادي على ملفه هو: [[chattr: Operation not permitted while setting flags on /tmp/ali2]]. ولو شغّال في Docker من غير الصلاحية، حتى root بياخد نفس الرسالة.`
        }
      ]
    },
    {
      t: "العمليات والخدمات",
      l: 2,
      n: "إيه اللي شغال، وازاي توقفه",
      items: [
        {
          cmd: "ps",
          title: "العمليات الشغالة",
          desc: R`[[ps]] (من process status) بيعرض البرامج الشغالة على الجهاز. كل برنامج شغال اسمه process، وليه رقم فريد اسمه PID، وده الرقم اللي هتحتاجه عشان توقفه بـ [[kill]].

[[aux]] تلات اختيارات متجمّعة (من غير شرطة، طريقة قديمة): [[a]] عمليات كل اليوزرز، و [[u]] بالتفاصيل (مين مشغّلها، و %CPU و %MEM)، و [[x]] حتى اللي مش مربوطة بترمنال زي الخدمات. والـ PID هو العمود التاني.

وعشان الناتج مئات السطور، دايمًا بتعمله pipe لـ [[grep]]. هتلاقي سطر زيادة هو [[grep node]] نفسه، فمتتلخبطش؛ [[pgrep -af node]] بيدوّر من غير ما يظهر نفسه.`,
          example: R`ps aux
ps aux | grep node`,
          try: R`شغّل [[node -e "setInterval(()=>{},1000)"]] في ترمنال، ومن ترمنال تاني لاقي الـ PID بتاعه.`,
          deep: {
            why: "عشان تعرف إيه اللي شغال على الجهاز: هل تطبيقك شغال؟ فيه كذا نسخة منه شغالة؟ إيه رقمه عشان توقفه؟",
            how: R`أي برنامج شغال اسمه «process» (عملية)، وكل واحدة ليها رقم فريد اسمه PID. الكيرنل (قلب النظام) بيحتفظ بمعلومات كل عملية، و [[ps]] بيقراها ويعرضها.

[[aux]] دي ٣ اختيارات مجمّعة: [[a]] عمليات كل اليوزرز، و [[u]] بالتفاصيل، و [[x]] حتى اللي مش مربوطة بترمنال (زي الخدمات). والأعمدة المهمة: USER مين مشغّلها، و PID رقمها، و %CPU و %MEM بتاكل قد إيه، و COMMAND الأمر اللي شغّلها.

وعشان [[ps aux]] بيطلع مئات السطور، دايمًا بتعمله pipe لـ [[grep]].`,
            when: "تتأكد إن تطبيقك شغال: [[ps aux | grep node]]. تعرف الـ PID عشان توقف عملية معلّقة. تعرف مين بياكل الرام.",
            mistakes: "لما تعمل [[ps aux | grep node]]، هتلاقي سطر زيادة هو [[grep node]] نفسه، لأنه شغال في نفس اللحظة. فمتفتكرش إن node شغال لو ده السطر الوحيد. الأسهل: [[pgrep -a node]]، وده بيدوّر ومش بيظهر نفسه."
          },
          lines: [
            "process status: اعرض كل البرامج الشغالة. [[aux]] يعني كل البرامج بكل التفاصيل.",
            "نفسه، بس سيب بس اللي فيها node."
          ],
          sol: R`في الترمنال التاني [[ps aux | grep setInterval]] بيطلع سطرين: سطر عمليتك [[ali  8715 ... node -e setInterval(()=>{},1000)]] والـ PID هو العمود التاني (8715 هنا)، وسطر تاني لـ [[grep setInterval]] نفسه. السطر ده مش عمليتك، ده grep لقى نفسه لأن الكلمة في الأمر بتاعه.

عشان تتجنبه: [[pgrep -af setInterval]] (بيطبع الـ PID والأمر بس)، أو الحيلة المشهورة [[ps aux | grep [s]etInterval]]. واحفظ الـ PID، هتحتاجه في درس kill.`
        },
        {
          cmd: "top / htop",
          title: "مراقبة لايف للـ CPU والرام",
          desc: R`[[top]] و [[htop]] بيعرضوا البرامج الشغالة لايف: بيتحدّثوا كل ثانية ومترتبين بالأكتر استهلاكًا للمعالج، فتعرف مين بيبطّأ الجهاز. [[htop]] أوضح وبالألوان: [[sudo apt install htop]]. جواه F6 تختار الترتيب (بالرام مثلًا)، و F9 توقف عملية، و q تخرج.

[[free -h]] بيطبع الرام بسرعة ([[-h]] بالـ G و M). الرقم اللي يهمك عمود available مش free، لأن لينكس بيستخدم الرام الفاضية كـ cache وده طبيعي.

[[uptime]] بيقولك السيرفر شغال بقاله قد إيه، و load average: ٣ أرقام لمتوسط الضغط في آخر دقيقة و٥ و١٥. قارنهم بعدد الأنوية ([[nproc]])؛ لو أكبر منه بكتير السيرفر محمّل.`,
          example: R`htop
free -h
uptime`,
          try: "افتح htop ورتب بالرام، واعرف أكتر عملية بتاكل ميموري.",
          mac: ["diff", "مفيش [[free]] على الماك، استخدم [[top -o mem]]، و htop بـ [[brew install htop]]."],
          deep: {
            why: "السيرفر بطيء. ليه؟ مين بياكل المعالج؟ الرام خلصت؟ [[ps]] بياخد صورة للحظة واحدة، إنما [[top]] و [[htop]] بيعرضوا لايف ويتحدّثوا كل ثانية.",
            how: R`بيعرضوا نفس معلومات [[ps]] بس بيتحدّثوا باستمرار، ومترتبين بالأكتر استهلاكًا.

فوق هتلاقي load average، وده ٣ أرقام: متوسط الضغط في آخر دقيقة، وآخر ٥، وآخر ١٥. الرقم معناه كام عملية بتشتغل أو مستنية دورها. قارنه بعدد أنوية المعالج ([[nproc]]): لو عندك ٢ أنوية والـ load 2، المعالج مشغول بالكامل. لو 6، فيه عمليات كتير مستنية، والسيرفر هيبقى بطيء.

وأهم حاجة تفهمها في الرام: لينكس بيستخدم الرام الفاضية كـ cache للملفات عشان يسرّع الجهاز. فهتلاقي «free» قليلة جدًا، وده طبيعي. الرقم اللي يهمك هو «available»، وده اللي تقدر تستخدمه فعلًا لو احتجت.`,
            when: "السيرفر أو الموقع بطيء. build وقع بـ out of memory. عايز تعرف تطبيقك بياكل قد إيه.",
            mistakes: "الخوف لما تشوف الرام الفاضية قليلة. بص على available. وإنك مش عارف تخرج: q."
          },
          lines: [
            "شاشة لايف بالبرامج وقد إيه بتاكل من المعالج والرام. q للخروج.",
            "الرام: قد إيه مستخدم وقد إيه فاضي. [[-h]] human.",
            "السيرفر شغال بقاله قد إيه، ومتوسط الضغط عليه."
          ],
          sol: R`جوه htop دوس F6 واختار [[PERCENT_MEM]] و Enter (أو اختصار Shift+M)، فعمود [[MEM%]] يبقى هو اللي بيرتب، وأول سطر هو أكتر عملية بتاكل رام. على جهاز مطور غالبًا هتلاقي المتصفح أو VS Code أو [[node]]، وعلى السيرفر [[postgres]] أو [[java]] أو [[node]]. و [[q]] أو F10 للخروج.

لو لقيت نفس البرنامج في سطور كتير (خصوصًا المتصفح)، دي threads أو عمليات فرعية؛ دوس [[H]] يخفي الـ threads. ومن غير htop: [[ps aux --sort=-%mem | head -5]]. وعلى الماك مفيش [[--sort]] ولا [[free]]: استخدم [[top -o mem]]، و htop بـ [[brew install htop]].`
        },
        {
          cmd: "kill",
          title: "وقّف عملية",
          desc: R`[[kill]] بيوقف برنامج برقمه (الـ PID اللي جبته من [[ps]]). الاسم مضلل: هو بيبعت «إشارة» للبرنامج. [[kill 1234]] بيبعت إشارة TERM ومعناها «اقفل بأدب»، فالبرنامج يحفظ اللي محتاجه ويقفل اتصالاته ويخرج.

[[kill -9]] بيبعت إشارة KILL، ودي النظام بيوقف بيها البرنامج فورًا من غير ما يحفظ ولا ينضّف، زي ما تشد الفيشة. استخدمها بس لو [[kill]] العادي مجابش نتيجة بعد كام ثانية.

[[pkill]] بيوقف بالاسم بدل الرقم، و [[-f]] بيدوّر في سطر الأمر كله، فـ [[pkill -f "node server.js"]] يقفل السيرفر ده بالذات. اتفرج الأول بـ [[pgrep -af الكلمة]]، لأن كلمة عامة زي node ممكن تقفل حاجات تانية كتير.`,
          example: R`kill 1234
kill -9 1234
pkill -f "node server.js"`,
          try: "اقتل عملية node اللي شغلتها في تجربة ps بالـ PID بتاعها.",
          flag: "danger",
          deep: {
            why: "عشان توقف برنامج: معلّق، أو ماسك بورت، أو شغال بالغلط.",
            how: R`الاسم مضلل. [[kill]] مش بيقتل حاجة بشكل مباشر، هو بيبعت «إشارة» (signal) للبرنامج، والبرنامج يتصرف.

الإشارة الافتراضية اسمها TERM، ومعناها «لو سمحت اقفل». البرنامج بيستلمها ويقفل بأدب: يحفظ اللي محتاج يتحفظ، ويقفل اتصالات قاعدة البيانات، ويخلص الطلبات اللي في إيده. وده اللي انت عايزه في الغالب.

[[kill -9]] بيبعت إشارة اسمها KILL، ودي البرنامج مش بيستلمها أصلًا. النظام نفسه بيوقفه فورًا في نص أي حاجة، من غير ما يحفظ ولا ينضّف. زي ما تشد فيشة الكمبيوتر بدل ما تقفله.

و Ctrl+C اللي بتستخدمها في الترمنال بتبعت إشارة تالتة اسمها INT، ومعناها برضه «اقفل».

و [[pkill]] بيبعت الإشارة بالاسم بدل الرقم، و [[-f]] بيدوّر في الأمر كله مش في اسم البرنامج بس.`,
            when: "تطبيق معلّق. بورت مشغول بتطبيق قديم نسيته شغال (EADDRINUSE).",
            mistakes: "إنك تروح لـ [[kill -9]] على طول. جرّب [[kill]] العادي الأول وادّيله ثواني، ولو مسمعش الكلام ساعتها [[-9]]، لأن [[-9]] ممكن يسيب ملفات أو داتا متبوّظة. و [[pkill node]] هيقفل كل عمليات node على الجهاز، مش بتاعتك بس."
          },
          lines: [
            "اطلب من البرنامج رقم 1234 يقفل بهدوء.",
            "[[-9]] اقفله غصب فورًا (لو الأول ماسمعش الكلام).",
            "اقفل أي برنامج في أمره «node server.js»، بالاسم بدل الرقم."
          ],
          sol: R`اقتل العملية اللي انت شغلتها بس، بالـ PID اللي لقيته في درس ps: [[kill 8715]]. مش هيطبع حاجة، والـ node في الترمنال الأول هيقف ويرجعلك الـ prompt (وممكن bash يكتب [[Terminated]]). اتأكد بـ [[ps -p 8715]]: هيطبع سطر العناوين بس، و [[echo $?]] = 1 يعني العملية مش موجودة.

متستخدمش [[-9]] غير لو [[kill]] العادي مجابش نتيجة بعد كام ثانية. وخلي بالك من [[pkill -f]]: بيدوّر في سطر الأمر كله، ولو كلمة البحث عامة زي [[node]] ممكن يقتل حاجات كتير تانية (VS Code نفسه بيشغّل node). اتفرج الأول بـ [[pgrep -af الكلمة]] قبل أي [[pkill]].`
        },
        {
          cmd: "& و jobs و fg",
          title: "شغّل حاجة في الخلفية",
          desc: R`أي أمر عادي بيمسك الترمنال لحد ما يخلص. [[&]] في آخر الأمر بيشغّله في الخلفية والترمنال يرجعلك على طول، و [[jobs]] بيوريك اللي شغال في الخلفية من الترمنال ده، كل واحد برقم بين أقواس مربعة.

[[fg]] (foreground) بيرجّع أمر من الخلفية قدامك، و [[fg %1]] الأمر رقم 1 بالظبط. ولو أمر شغال قدامك وعايز الترمنال: Ctrl+Z بيوقفه مؤقتًا (مش بيقفله)، وبعدين [[bg]] يكمّله في الخلفية. و Ctrl+C بيقفل الأمر اللي قدامك خالص.

و [[sleep 300]] في المثال أمر بيستنى ٣٠٠ ثانية ومبيعملش حاجة، مثالي للتجربة. وخلي بالك: اللي في الخلفية بيقفل لما تقفل الترمنال؛ عشان يفضل شغال شوف [[nohup]].`,
          example: R`sleep 300 &
jobs
fg %1`,
          try: "شغّل [[sleep 300]]، اضغط Ctrl+Z، اكتب [[bg]] ثم [[jobs]] ثم [[fg]] ثم Ctrl+C.",
          deep: {
            why: "لو شغّلت أمر بياخد وقت، الترمنال بيفضل مشغول لحد ما يخلص. ساعات عايز تشغّل حاجة وتكمّل شغلك في نفس الترمنال.",
            how: R`الأمر العادي بيشتغل في «المقدمة» (foreground): ماسك الترمنال، وانت مستنيه.

[[&]] في آخر الأمر بتشغّله في «الخلفية» (background): الأمر بيشتغل، والترمنال بيرجعلك على طول. و [[jobs]] بيوريك اللي شغال في الخلفية، كل واحد برقم.

و Ctrl+Z بتعمل حاجة الناس بتتلخبط فيها: مش بتقفل الأمر ولا بتوديه الخلفية. بتوقفه مؤقتًا (pause)، يعني البرنامج متجمّد مش شغال. بعدها [[bg]] يكمّله في الخلفية، أو [[fg]] يرجّعه قدامك.

وحاجة مهمة: البرامج اللي في الخلفية لسه مربوطة بالترمنال ده. لو قفلت الترمنال (أو ssh اتقطع)، هتقفل معاه. عشان كده فيه [[nohup]] و tmux.`,
            when: "حاجة بسيطة وسريعة عايز تشغّلها وتكمّل. ولما تشغّل حاجة وتفتكر إنك محتاج الترمنال: Ctrl+Z وبعدين [[bg]].",
            mistakes: "إنك تعمل Ctrl+Z وتفتكر البرنامج قفل. هو لسه موجود ومتجمّد وماسك البورت بتاعه، فلما تشغّله تاني يقولك البورت مشغول. شوف [[jobs]]. وإنك تفتكر إن [[&]] كفاية عشان حاجة تفضل شغالة على السيرفر."
          },
          lines: [
            "[[&]] في الآخر: شغّل الأمر في الخلفية وارجعلي الترمنال فاضي.",
            "اعرض البرامج اللي في الخلفية.",
            "foreground: هات البرنامج رقم ١ قدامي تاني."
          ],
          sol: R`Ctrl+Z بيطبع [[[1]+  Stopped                 sleep 300]]. [[bg]] بيطبع [[[1]+ sleep 300 &]] ويكمّله في الخلفية. [[jobs]] بيطبع [[[1]+  Running                 sleep 300 &]]. [[fg]] بيطبع [[sleep 300]] ويرجّعه قدامك، و Ctrl+C يوقفه ([[echo $?]] بعدها = 130).

الفرق المهم: بعد Ctrl+Z العملية واقفة مش شغالة (Stopped)، و [[bg]] هو اللي بيخليها تكمّل. ولو [[jobs]] مطبعش حاجة يبقى انت في ترمنال تاني، لأن الـ jobs خاصة بكل شيل لوحده.`
        },
        {
          cmd: "nohup",
          title: "خلّي الأمر شغال بعد ما تقفل",
          desc: R`لما تقفل الترمنال أو جلسة ssh تتقطع، كل البرامج اللي شغّلتها منه بتقفل معاه. [[nohup]] (من no hang up) بيشغّل البرنامج بحيث يتجاهل إشارة القفل دي، فيفضل شغال.

في المثال: [[> out.log 2>&1]] الناتج والأخطاء يروحوا لملف بدل الشاشة (لو محددتش، nohup بيكتب في [[nohup.out]])، و [[&]] في الآخر بيشغّله في الخلفية عشان الترمنال يرجعلك.

بس nohup مش بيرجّع التطبيق لو وقع ولا لو السيرفر عمل restart. للتطبيقات الحقيقية استخدم [[pm2]] لتطبيقات Node: [[pm2 start server.js --name api]] بيشغّله باسم ويرجّعه لو وقع، و [[pm2 logs api]] بيعرض لوجاته. أو systemd أو Docker.`,
          example: R`nohup node server.js > out.log 2>&1 &
pm2 start server.js --name api
pm2 logs api`,
          try: "شغّل حاجة بـ nohup، اقفل الترمنال وافتح واحد جديد، وتأكد إنها لسه شغالة بـ [[ps aux | grep]].",
          mac: ["both", "pm2 شغال على الاتنين، بس systemd لينكس بس."],
          deep: {
            why: "لما تقفل الترمنال أو الـ ssh يتقطع، كل البرامج اللي شغّلتها منه بتقفل. [[nohup]] بيمنع ده.",
            how: R`لما الترمنال يتقفل، النظام بيبعت لكل البرامج اللي شغالة منه إشارة اسمها HUP (من hang up، يعني «السكة اتقفلت»)، والبرامج بتقفل لما تستلمها.

[[nohup]] (من no hang up) بيشغّل البرنامج بحيث يتجاهل الإشارة دي، فيفضل شغال. وبما إن مفيش ترمنال يطلع فيه الكلام، بيحفظ الناتج في ملف اسمه [[nohup.out]]، أو في الملف اللي انت تحدده. ومعاه [[&]] عشان يشتغل في الخلفية.

بس nohup بيحل مشكلة واحدة. لو التطبيق وقع بسبب error، أو السيرفر عمل ريستارت، التطبيق مش هيرجع. عشان كده للتطبيقات الحقيقية فيه أدوات مخصوصة: [[pm2]] لتطبيقات Node (بيرجّعها لو وقعت ويشغّلها مع السيرفر)، أو systemd أو Docker.`,
            when: "مهمة طويلة بتشغّلها مرة واحدة على السيرفر، زي باك أب كبير أو script استيراد داتا. وحتى هنا tmux غالبًا أحسن، لأنك تقدر ترجعلها وتشوفها.",
            mistakes: "استخدامه لتشغيل موقعك في الإنتاج. أول ما يوقع مش هيقوم لوحده، وممكن تقعد ساعات مش واخد بالك. ونسيان [[&]] فالترمنال يفضل مشغول."
          },
          lines: [
            "شغّل السيرفر في الخلفية ([[&]])، وفضّله شغال حتى لو قفلت الترمنال ([[nohup]])، والناتج والأخطاء في out.log.",
            "الطريقة الأحسن: [[pm2]] يشغّل التطبيق ويرجّعه لو وقع. [[--name api]] اسم تنادي بيه.",
            "اعرض اللوجات بتاعة التطبيق اللي اسمه api."
          ],
          sol: R`[[nohup sleep 600 > out.log 2>&1 &]] بيطبع رقم الـ job والـ PID زي [[[1] 12345]]. اقفل الترمنال، وافتح واحد جديد و [[ps aux | grep [s]leep]]: هتلاقي [[sleep 600]] لسه شغال بنفس الـ PID، لأن nohup خلاه يتجاهل إشارة SIGHUP اللي بتتبعت لما الترمنال يتقفل.

من غير nohup العملية بتموت مع الترمنال. ولو كتبت [[nohup]] من غير [[> out.log]]، هيعمل ملف [[nohup.out]] ويكتب فيه. ونضّف وراك بـ [[kill 12345]]. وعلى سيرفر حقيقي استخدم pm2 أو systemd بدل nohup، عشان التطبيق يرجع يشتغل لوحده لو وقع أو السيرفر عمل restart.`
        },
        {
          cmd: "systemctl",
          title: "تحكم في خدمات السيرفر",
          desc: R`الخدمات (services) برامج لازم تفضل شغالة على السيرفر طول الوقت، زي Nginx و Docker و SSH، و [[systemctl]] هو اللي بيديرهم. [[status]] شغالة ولا واقفة، و [[start]] و [[stop]] و [[restart]]، و [[reload]] تقرا الإعدادات من جديد من غير ما تقطع الزوار.

[[enable]] بتخلي الخدمة تشتغل لوحدها مع كل تشغيل للسيرفر، بس مش بتشغّلها دلوقتي (لده [[enable --now]]). و [[nginx -t]] بيختبر إعدادات Nginx، فـ [[nginx -t && systemctl reload nginx]] مش هيطبّق إعدادات فيها غلطة توقّع الموقع.

[[journalctl -u nginx]] لوجات خدمة معينة: [[-n 50]] آخر ٥٠ سطر، و [[-f]] فضّل متابع لايف. ده لينكس بس، مش موجود على الماك.`,
          example: R`sudo systemctl status nginx
sudo nginx -t && sudo systemctl reload nginx
sudo systemctl enable docker
journalctl -u nginx -n 50 -f`,
          try: "على سيرفرك شوف status بتاع nginx و docker، واعرض آخر 20 سطر لوج لكل واحد.",
          mac: ["linux", "مش موجود على الماك. للحاجات اللي بـ brew استخدم [[brew services]]."],
          deep: {
            why: "البرامج اللي لازم تفضل شغالة على السيرفر طول الوقت، زي Nginx و Docker و SSH، اسمها «خدمات» (services). [[systemctl]] هو اللي بيديرهم: تشغيل، وإيقاف، وريستارت، وتشغيل أوتوماتيك مع السيرفر.",
            how: R`أول برنامج بيشتغل لما السيرفر يقوم اسمه systemd، ورقمه 1، وهو اللي بيشغّل كل حاجة تانية. لكل خدمة عنده ملف بيوصفها: إزاي تشتغل، وتشتغل بعد إيه، ويعمل إيه لو وقعت. و [[systemctl]] هو الطريقة اللي بتكلّمه بيها.

والفرق بين أوامره مهم: [[start]] يشغّل دلوقتي بس. [[enable]] يخليها تشتغل أوتوماتيك مع كل ريستارت، بس مش بيشغّلها دلوقتي. و [[enable --now]] الاتنين.

و [[restart]] بيقفل الخدمة ويفتحها (الموقع بيقع ثانية). [[reload]] بيخليها تقرا الإعدادات من جديد من غير ما تقفل، وده أحسن لـ Nginx.

و systemd بيجمّع لوجات كل الخدمات في مكان واحد، و [[journalctl]] بيقراها.`,
            when: "بعد تعديل إعدادات Nginx: [[nginx -t]] وبعدين [[reload]]. خدمة وقعت ومش عارف ليه: [[status]] وبعدين [[journalctl -u]]. تسطيب حاجة جديدة وعايزها تشتغل مع السيرفر: [[enable --now]].",
            mistakes: "[[enable]] وتفتكر إنها اشتغلت، وهي هتشتغل بعد الريستارت الجاي بس. و [[restart nginx]] من غير [[nginx -t]] الأول، فلو فيه غلطة في الإعدادات، Nginx مش هيقوم تاني وكل مواقعك تقع."
          },
          lines: [
            "Nginx شغال ولا واقف؟ وفيه مشاكل؟",
            "[[nginx -t]] اختبر الإعدادات، ولو سليمة ([[&&]]) طبّقها من غير ما تقطع الزوار.",
            "خلّي Docker يشتغل لوحده مع كل تشغيل للسيرفر.",
            "اعرض آخر ٥٠ سطر لوج لـ Nginx ([[-n 50]])، وفضّل متابع ([[-f]])."
          ],
          sol: R`[[sudo systemctl status nginx]] بيطلّع كام سطر، أهمهم [[Active: active (running) since ...]]؛ لو [[inactive (dead)]] يبقى واقف، و [[failed]] يبقى وقع. و [[Loaded: ... enabled]] معناها بيقوم مع السيرفر. بيفتح في pager، فـ [[q]] للخروج. وللوج: [[sudo journalctl -u nginx -n 20 --no-pager]] ونفس الأمر بـ [[-u docker]].

لو journalctl قالك [[-- No entries --]]، يا إما الخدمة مابدأتش خالص، يا إما محتاج sudo عشان تشوف لوجات النظام. ولو [[Unit nginx.service could not be found]] يبقى nginx مش متسطب كخدمة (أو شغال جوه Docker، وساعتها [[docker logs]]). وعلى الماك مفيش systemctl أصلًا: [[brew services list]].`
        }
      ]
    },
    {
      t: "أوامر قوية للجهاز",
      l: 2,
      n: "تطفي أو تعمل ريستارت بميعاد، وتشغّل أمر مرة واحدة بعدين، وتتابع حاجة لحد ما تتغير، وتخلي الجهاز ينبّهك لما شغلانة طويلة تخلص",
      items: [
        {
          cmd: "shutdown",
          title: "اطفي أو اعمل ريستارت بميعاد",
          desc: R`[[shutdown]] بيطفي الجهاز أو يعمل له ريستارت، دلوقتي أو في ميعاد تحدده، وبيبعت رسالة تحذير لكل اللي داخلين على الجهاز. محتاج [[sudo]]، وعلى سيرفر بعيد هيقطع الـ ssh بتاعك، ولو طفيته (مش ريستارت) مش هترجّعه غير من لوحة التحكم بتاعة الاستضافة.

الميعاد: [[now]] دلوقتي، و [[+30]] بعد ٣٠ دقيقة، و [[23:30]] الساعة ١١:٣٠ بالليل بتوقيت الجهاز (نظام ٢٤ ساعة). ومن غير ميعاد خالص بيعتبره [[+1]]، يعني بعد دقيقة. و [[-h]] بيطفي (الاسم جاي من halt، بس على أوبونتو بقت معناها power off)، و [[-r]] (reboot) ريستارت. وأي كلام بعد الميعاد هو الرسالة اللي هتتبعت للناس: [[sudo shutdown -r +10 "Restarting for kernel update"]].

ولما تجدول، بيطبع حاجة زي [[Shutdown scheduled for Fri 2026-10-02 23:30:00 EEST, use 'shutdown -c' to cancel.]]. و [[sudo shutdown -c]] بيلغيه، و [[shutdown --show]] بيقولك فيه حاجة متجدولة ولا لأ. وفي آخر ٥ دقايق قبل الميعاد النظام بيمنع أي login جديد.

و [[systemctl]] (درس systemctl) فيه أوامر بتتنفّذ على طول: [[systemctl poweroff]] يطفي، و [[systemctl reboot]] ريستارت، و [[systemctl suspend]] (sleep): الجهاز بيفضل شغال على الرام بأقل كهربا وبيصحى في ثواني بكل حاجة مفتوحة زي ما هي. و [[systemctl hibernate]] بيكتب الرام على الديسك ويطفي خالص، وده غالبًا مش شغال على أوبونتو من غير إعداد (محتاج swap قد الرام، وبيتقفل لو Secure Boot شغال). و [[sudo reboot]] و [[sudo poweroff]] اختصارات لنفس الحاجة.

وفي container أو WSL الكلام ده مبيطفيش جهازك الحقيقي. في container غالبًا الأمر مش موجود أصلًا، ولو موجود هيقولك [[System has not been booted with systemd as init system (PID 1). Can't operate.]]. وفي WSL اقفل من ويندوز: [[wsl --shutdown]] في PowerShell بيقفل كل التوزيعات والـ VM بتاعتها، و [[wsl -t Ubuntu]] (terminate) بيقفل توزيعة واحدة بالاسم اللي [[wsl -l -v]] بيطلّعه.`,
          example: R`# متجرّبش السطور دي على سيرفر عليه ناس شغالة
sudo shutdown -h 23:30
shutdown --show
sudo shutdown -c
sudo shutdown -r +10 "Restarting for kernel update, save your work"
sudo shutdown -h now
sudo systemctl reboot
systemctl suspend`,
          try: R`على جهازك (مش سيرفر): جدول إطفاء بعد ١٠ دقايق برسالة، واتأكد بـ [[shutdown --show]]، وبعدين الغيه واتأكد إنه اتلغى.`,
          flag: "danger",
          mac: ["diff", R`على الماك نفس [[sudo shutdown -h +30]] و [[sudo shutdown -r now]]، بس الساعة بتتكتب [[2330]] من غير [[:]]، ومفيش [[-c]] ولا [[systemctl]]: تلغي بـ [[sudo killall shutdown]]. و [[-s]] بيعمل sleep، و [[pmset sleepnow]] sleep على طول.`],
          deep: {
            why: R`على السيرفر بتحتاج ريستارت بعد تحديث الـ kernel، وأحسن وقت ليه آخر الليل وانت مش صاحي. وعلى جهازك ساعات بتسيب تحميل أو build طويل وعايز الجهاز يطفي لوحده بعدها. و [[shutdown]] بميعاد ورسالة بيدّي اللي شغالين على الجهاز فرصة يحفظوا شغلهم.`,
            how: R`على أوبونتو [[shutdown]] و [[reboot]] و [[poweroff]] مجرد اختصارات لـ [[systemctl]]، وكلهم بيكلّموا systemd (البرنامج رقم 1 اللي بيشغّل كل حاجة، درس systemctl). لما تدّي ميعاد، الطلب بيتسجّل عند خدمة اسمها systemd-logind، عشان كده [[shutdown]] بيخلص على طول ويرجعلك الترمنال، وتقدر تقفل الترمنال والميعاد لسه قائم.

ولما الميعاد ييجي، systemd بيبعت لكل الخدمات إشارة TERM (زي [[kill]] العادي) ويستناها تقفل بأدب، ولو واحدة اتأخرت (90 ثانية افتراضيًا) بيبعتلها KILL، وبعدين يفصل الديسكات ويطفي. وده الفرق بينه وبين إنك تشد الفيشة: الداتا اللي في الذاكرة بتتكتب على الديسك، وقواعد البيانات بتقفل نضيف.

و [[-h]] تاريخيًا كانت halt: النظام يقف بس الجهاز يفضل شغال. على systemd [[-h]] لوحدها بقت power off، و [[-H]] هي halt الحقيقية. والرسالة بتتبعت بـ [[wall]] (write all) لكل ترمنال مسجّل دخول على الجهاز، زي جلسات ssh.`,
            when: R`ريستارت مجدول للسيرفر بعد تحديث بـ [[+10]] ورسالة، عشان اللي داخلين يلحقوا يحفظوا. وإطفاء جهازك بعد تحميل كبير: [[sudo shutdown -h +120]] لو عارف هياخد قد إيه. ولو مش عارف، شغّل الاتنين كـ root: [[sudo sh -c 'apt full-upgrade -y; shutdown -h now']]، عشان sudo ميقفش يسألك على الباسورد بعد ساعة وانت مش موجود. ولو محتاج ريستارت في ميعاد يوم تاني، [[at]] (الدرس الجاي) أو cron.`,
            mistakes: R`[[shutdown -h now]] على السيرفر الغلط: بص على الـ prompt ([[\h]] في درس PS1) قبل أي أمر زي ده. و [[poweroff]] لـ VPS بدل [[reboot]]، فمش هيرجع غير من لوحة التحكم. وريستارت سيرفر من غير ما تتأكد إن خدماتك عليها [[enable]] (درس systemctl)، فيقوم والموقع واقع. ونسيان إن الريستارت بيقطع ssh: خليه آخر خطوة.`
          },
          lines: [
            R`اطفي الجهاز الساعة ١١:٣٠ بالليل ([[-h]] يعني power off).`,
            R`فيه إطفاء أو ريستارت متجدول؟ وإمتى؟`,
            R`الغي اللي متجدول.`,
            R`ريستارت بعد ١٠ دقايق ([[-r]] و [[+10]])، والكلام اللي بين علامات التنصيص بيتبعت لكل اللي داخلين على الجهاز.`,
            R`اطفي دلوقتي حالًا.`,
            R`ريستارت على طول من systemd، زي [[sudo reboot]].`,
            R`sleep: الجهاز ينام على الرام ويصحى بنفس الحالة.`
          ],
          sol: R`[[sudo shutdown -h +10 "test, will cancel"]] بيطبع [[Shutdown scheduled for Fri 2026-10-02 23:40:00 EEST, use 'shutdown -c' to cancel.]] (بتاريخك ووقتك)، و [[shutdown --show]] بيطبع نفس السطر. وأي حد داخل الجهاز بـ ssh بيوصله تحذير فيه الرسالة. وبعد [[sudo shutdown -c]]، [[shutdown --show]] بيقول [[No scheduled shutdown.]].

لو جدولت بـ [[-r]] هتلاقي [[Reboot scheduled for ...]] بدل Shutdown. ولو انت في WSL أو container وطلعلك [[System has not been booted with systemd as init system (PID 1). Can't operate.]]، ده طبيعي: اقفل من ويندوز بـ [[wsl --shutdown]]، والـ container بـ [[docker stop]].`
        },
        {
          cmd: "at",
          title: "شغّل أمر مرة واحدة في ميعاد",
          desc: R`[[at]] بيشغّل أمر مرة واحدة في ميعاد تحدده: بعد ساعتين، أو الساعة ٣ الفجر، أو بكرة ٩ الصبح. يعني زي cron بس لمرة واحدة، ومن غير ما تفتكر تمسح السطر بعدها.

مش متسطب افتراضيًا: [[sudo apt install at]] بيسطّب الأوامر وخدمة اسمها [[atd]]، وهي اللي بتصحى في الميعاد وتشغّل المهمة؛ و [[systemctl status atd]] بيأكدلك إنها شغالة. والأوامر بتدخل لـ [[at]] من الـ stdin: [[echo "الأمر" | at الميعاد]]. ولو كتبت [[at 23:30]] لوحدها بيفتحلك [[at>]] تكتب فيه أوامر سطر سطر وتخلّص بـ Ctrl+D.

المواعيد: [[now + 10 minutes]] (أو [[hours]] أو [[days]])، و [[23:30]]، و [[9:00 tomorrow]]، و [[3pm]]، و [[midnight]] و [[noon]]. ولو الساعة اللي كتبتها عدّت النهارده، بيجدولها بكرة. والدقة بالدقيقة: [[now + 1 minute]] الساعة 10:12:05 بيشتغل 10:13:00. وكل مرة بتجدول بيطبع [[warning: commands will be executed using /bin/sh]] (طبيعي، معناها الأوامر بتتنفّذ بـ sh مش bash)، وبعدها رقم المهمة وميعادها: [[job 2 at Sat Oct  3 03:00:00 2026]].

[[atq]] (at queue) بيعرض المهام اللي مستنية: الرقم والميعاد، وبعدهم [[a]] (اسم الطابور) واسم اليوزر. و [[at -c 2]] بيطبع السكربت اللي هيتنفّذ فعلًا في المهمة 2، و [[atrm 2]] بيلغيها. وفي ناتج [[at -c]] هتلاقي إن at حافظ الفولدر اللي كنت فيه ومتغيرات البيئة بتاعتك، فالأمر بيشتغل كأنك كاتبه من نفس المكان، عكس cron.

والناتج؟ at بيحاول يبعته إيميل، وعلى أغلب الأجهزة مفيش إيميل فبيضيع. فوجّه الناتج لملف جوه الأمر نفسه بـ [[>> ملف 2>&1]]. وعشان تشغّل سكربت bash، ابعت مساره زي ما في المثال، مش [[at -f script.sh]]: [[-f]] بيقرا سطور السكربت ويشغّلها بـ sh، فالـ shebang بيتجاهل وأي حاجة bash بس (زي [[[[ ]]]]) بتفشل.

والمقارنة: cron (درس «cron للسكربت») للحاجة اللي بتتكرر. و [[sleep 3600 && ./deploy.sh &]] بيستنى ساعة في الخلفية، بس لو قفلت الترمنال أو الجهاز عمل ريستارت بيروح. at بيحفظ المهمة في ملف تحت [[/var/spool/cron/atjobs]]، فبتفضل بعد الريستارت، ولو الجهاز كان مطفي وقت الميعاد بتتنفّذ أول ما [[atd]] يقوم.`,
          example: R`sudo apt install at
systemctl status atd
echo "date > ~/lab/at-test.txt" | at now + 2 minutes
echo "$HOME/bin/backup.sh >> $HOME/logs/at.log 2>&1" | at 03:00
atq
at -c 2 | tail -3
atrm 2`,
          try: R`سطّبه، وجدول [[date > ~/lab/at-test.txt]] بعد دقيقتين، وبص على [[atq]]، واستنى وافتح الملف. وبعدين جدول حاجة لبكرة، واعرض محتواها بـ [[at -c]]، والغيها.`,
          mac: ["diff", R`[[at]] موجود على الماك، بس الخدمة اللي بتشغّل المهام (atrun) مقفولة افتراضيًا، فالمهام هتفضل في [[atq]] ومش هتتنفّذ إلا لو شغّلتها بـ [[sudo launchctl load -w /System/Library/LaunchDaemons/com.apple.atrun.plist]]. وفي الغالب launchd أنسب هناك (تاب zsh).`],
          deep: {
            why: R`ساعات محتاج حاجة تحصل مرة واحدة بس في وقت مش مناسبلك: ريستارت السيرفر الساعة ٣ الفجر بعد تحديث، أو migration بعد ما الزوار يقلّوا، أو باك أب كبير بالليل. cron مصمّم للتكرار وهتنسى تمسح السطر، و [[sleep]] في الخلفية بيموت مع الترمنال.`,
            how: R`[[at]] بيقرا الأوامر ويكتب ملف سكربت جديد في [[/var/spool/cron/atjobs]]: أوله [[#!/bin/sh]]، وبعدين [[umask]] بتاعك (الصلاحيات الافتراضية للملفات اللي هتتعمل)، وكل متغيرات البيئة اللي عليها [[export]]، و [[cd]] للفولدر اللي كنت فيه، وفي الآخر أوامرك.

و [[atd]] خدمة بتصحى كل شوية تبص على الملفات دي، وأي واحد ميعاده جه أو عدّى بتشغّله بـ [[/bin/sh]] بصلاحيات اليوزر اللي جدوله، وتمسحه بعد ما يخلص. عشان كده المهمة بتفضل بعد ريستارت: هي ملف على الديسك، مش عملية في الذاكرة زي [[sleep]].

ومين مسموحله يستخدم at؟ ملف [[/etc/at.deny]] فيه يوزرز ممنوعين (حسابات النظام)، ولو فيه [[/etc/at.allow]] بيبقى هو بس اللي مسموحلهم.

وفيه أخ صغير اسمه [[batch]]: بيشغّل الأوامر لما الجهاز يفضى (الـ load يقل عن 1.5 افتراضيًا)، مش في ميعاد.`,
            when: R`ريستارت بعد تحديث في وقت هادي: [[echo "systemctl reboot" | sudo at 03:00]]. شغلانة تقيلة بالليل مرة واحدة: import أو باك أب كبير. ولو عايز تفتكر إن فيه مهمة متجدولة، [[atq]] أول حاجة. وللحاجات اللي بتتكرر استخدم cron.`,
            mistakes: R`[[at -f script.sh]] لسكربت bash، فيتنفّذ بـ sh ويفشل في صمت. ونسيان توجيه الناتج، فمتعرفش نجح ولا فشل. وإن [[atd]] مش شغال (على سيرفر minimal أو container)، فالمهام تتراكم في [[atq]] ومحدش بيشغّلها. و [[at 3:00]] وانت فاكرها ٣ العصر: الساعة بنظام ٢٤، والعصر [[15:00]] أو [[3pm]]. و [[sudo]] جوه الأمر: المهمة مفيهاش ترمنال تكتب فيه باسورد، فجدول المهمة نفسها بـ [[sudo at]].`
          },
          lines: [
            R`سطّب at وخدمة atd.`,
            R`اتأكد إن atd شغالة (q للخروج).`,
            R`شغّل أمر بعد دقيقتين: [[at]] بياخد الأمر من الـ pipe.`,
            R`شغّل سكربت الباك أب الساعة ٣ الفجر (بكرة لو الساعة عدّت)، والناتج والأخطاء في لوج. [[$HOME]] بتتفك دلوقتي لأنها جوه double quotes.`,
            R`اعرض المهام اللي مستنية.`,
            R`اعرض آخر سطور المهمة 2، وفيهم الأمر اللي هيتنفّذ.`,
            R`الغي المهمة 2.`
          ],
          sol: R`بعد [[echo "date > ~/lab/at-test.txt" | at now + 2 minutes]] هتشوف [[warning: commands will be executed using /bin/sh]] وتحتها حاجة زي [[job 1 at Fri Oct  2 10:14:00 2026]]، و [[atq]] بيطبع [[1 Fri Oct  2 10:14:00 2026 a ali]]. بعد الميعاد المهمة بتختفي من [[atq]]، و [[cat ~/lab/at-test.txt]] فيه وقت التشغيل بالظبط، على أول الدقيقة.

و [[at -c 2]] بيطبع سكربت طويل: [[#!/bin/sh]]، وسطور [[export]] لكل متغيرات البيئة بتاعتك، و [[cd /home/ali/lab || {]]، وفي الآخر الأمر بتاعك. و [[atrm 2]] مبيطبعش حاجة، والمهمة بتختفي من [[atq]].

لو المهمة فضلت في [[atq]] بعد ميعادها، يبقى [[atd]] مش شغال: [[sudo systemctl enable --now atd]]، وأول ما يقوم بيشغّل المتأخر. ولو اتنفّذت ومفيش أثر، الـ errors راحت إيميل مش موجود؛ زوّد [[>> ملف 2>&1]]. ولو [[at]] قال [[Garbled time]]، الميعاد مكتوب غلط (زي [[25:99]]).`
        },
        {
          cmd: "watch",
          title: "كرر أمر كل كام ثانية وتابع التغيير",
          desc: R`[[watch]] بيشغّل أمر كل ثانيتين (أو المدة اللي تحددها) ويعرض ناتجه مكان القديم في نفس الشاشة، فتتابع حاجة بتتغير من غير ما تكتب الأمر كل شوية: ديسك بيتملى، ملف بيتحمّل، container بيقوم. و Ctrl+C يخرج.

[[-n 5]] (interval) كل ٥ ثواني بدل ٢، وينفع كسور زي [[-n 0.5]]. و [[-d]] (differences) بيعلّم الحروف اللي اتغيرت من آخر مرة، فعينك تقع عليها على طول. و [[-t]] بيشيل سطر العنوان اللي فوق، اللي فيه [[Every 2.0s:]] والأمر واسم الجهاز والوقت. و [[-g]] بيخرج أول ما الناتج يتغير، فتحط بعده أمر بـ [[&&]]. و [[-e]] لو الأمر فشل بيوقف التحديث ويستناك تدوس زرار. و [[-c]] بيعرض الألوان لو الأمر بيطلّعها.

والأمر بيتحط بين single quotes لو فيه [[|]] أو [[&&]] أو [[$]]: [[watch 'ls -l | wc -l']] بيدّي السطر كله لـ watch، وهو بيشغّله بـ [[sh -c]]. من غير علامات التنصيص، الشيل بتاعك هيعمل الـ pipe على ناتج watch نفسه. وعشان watch بيشغّل [[sh]] جديد، الـ aliases بتاعتك (زي [[ll]]) مش موجودة جواه، فاكتب الأمر الأصلي.

وفي المثال [[free -h]] بيعرض الرام: المستخدم والفاضي والـ swap. و [[docker ps --format "{{.Names}}: {{.Status}}"]] اسم كل container وحالته بس (تاب Docker). و [[timeout --foreground 10 watch ...]] بيقفل watch لوحده بعد ١٠ ثواني، و [[--foreground]] لازم هنا: من غيره timeout بيشغّل watch في الخلفية، و watch محتاج يرسم على الشاشة فبيتجمّد ومبيخرجش.`,
          example: R`watch df -h
watch -n 5 -d 'df -h / && free -h'
watch -n 1 'ls -l ~/Downloads | tail -5'
watch -n 2 'docker ps --format "{{.Names}}: {{.Status}}"'
watch -g 'ls ~/Downloads' && echo "new file arrived"
timeout --foreground 10 watch -n 1 date`,
          try: R`افتح ترمنالين. في الأول [[watch -n 1 -d 'ls -l ~/lab']]، وفي التاني اعمل ملفات في [[~/lab]] وامسحها واتفرج. وبعدين جرّب [[watch -g -n 1 'ls ~/lab' && echo "new file arrived"]] واعمل ملف من الترمنال التاني.`,
          mac: ["diff", R`[[watch]] مش موجود على الماك: [[brew install watch]]، وبعدها نفس الكلام.`],
          deep: {
            why: R`فيه حاجات بتستناها تتغير: تحميل بيكبر، ديسك بيتملى، container لسه بيقوم، عدد ملفات في فولدر. إنك تكتب نفس الأمر كل شوية مملّ وبيملى الشاشة. [[watch]] بيخلي الشاشة لوحة متابعة بتتحدّث لوحدها.`,
            how: R`watch بيمسح الشاشة، ويشغّل الأمر بـ [[sh -c "الأمر"]]، ويعرض الناتج، وينام المدة اللي حددتها، ويعيد. والناتج اللي أطول من الشاشة بيتقص من تحت، فاختار أمر ناتجه قصير أو استخدم [[head]] و [[tail]].

و [[-d]] بيقارن الشاشة الجديدة بالقديمة حرف حرف ويعلّم اللي اختلف. و [[-g]] بيقارن الناتج كله، وأول ما يختلف بيخرج بـ 0، فتربطه بـ [[&&]] (درس «&& و || و ;»).

والمدة بتتحسب من بعد ما الأمر يخلص، فلو الأمر بياخد ٣ ثواني و [[-n 2]]، التحديث فعليًا كل ٥ تقريبًا ([[-p]] بيحاول يخليها مظبوطة). و watch مبيحتفظش بتاريخ: لو عايز تسجّل القيم، اعمل لوب [[while]] و [[sleep]] واكتب في ملف.`,
            when: R`متابعة تحميل أو نسخ كبير: [[watch -n 1 'ls -lh file.iso']]. مستني container يبقى healthy بعد [[docker compose up]]. بتراقب مساحة الديسك وانت بتمسح لوجات. بتجرّب cron وعايز تشوف الملف بيتكتب. ولو عايز تشغّل أمر لما ملف يتغير (مش تتفرج بس)، [[inotifywait]] في الدرس الجاي أنسب.`,
            mistakes: R`أمر فيه [[|]] من غير single quotes، فالـ pipe يشتغل على watch نفسه والشاشة تبوظ. واستخدام alias جوه watch. و [[-n 0.1]] على أمر تقيل زي [[du]] على فولدر كبير، فالجهاز يتعب. والاعتماد على [[watch -g ... && أمر]] في حاجة مهمة: Ctrl+C بيخرّج watch بـ 0 برضه، فالأمر اللي بعده هيتنفّذ. و [[timeout 10 watch ...]] من غير [[--foreground]]، فيعلّق.`
          },
          lines: [
            R`اعرض المساحة وحدّثها كل ثانيتين (الافتراضي). Ctrl+C للخروج.`,
            R`كل ٥ ثواني، وعلّم اللي اتغير ([[-d]])، ومساحة [[/]] والرام مع بعض. الـ single quotes عشان [[&&]] يبقى جوه watch.`,
            R`كل ثانية: آخر ٥ ملفات في Downloads، وانت مستني ملف يخلص تحميل.`,
            R`حالة الـ containers كل ثانيتين، وانت مستني واحد يقوم.`,
            R`استنى لحد ما محتوى Downloads يتغير، وبعدين اطبع رسالة.`,
            R`اعرض الساعة كل ثانية لمدة ١٠ ثواني بس، واخرج لوحدك.`
          ],
          sol: R`الشاشة بتتمسح، وأول سطر [[Every 1.0s: ls -l ~/lab]] وعلى يمينه اسم الجهاز والوقت، وتحته ناتج [[ls -l]]. أول ما تعمل [[touch ~/lab/new.txt]] في الترمنال التاني، خلال ثانية بيظهر سطر [[new.txt]]، و [[-d]] بيعلّم الحروف الجديدة بخلفية معكوسة، وكمان رقم [[total]] لو اتغير. و Ctrl+C بيخرجك والترمنال بيرجع زي ما كان.

ومع [[-g]]: watch بيفضل مستني، وأول ما تعمل ملف بيخرج لوحده وتتطبع [[new file arrived]]. بس خلي بالك: الخروج بـ Ctrl+C كمان بيرجّع 0، فالرسالة هتتطبع برضه حتى لو مفيش حاجة اتغيرت. ولو شفت [[sh: 1: ll: not found]]، يبقى استخدمت alias جوه watch؛ اكتب [[ls -l]].`
        },
        {
          cmd: "inotifywait",
          title: "نفّذ أمر أول ما ملف يتغير",
          desc: R`[[inotifywait]] بيستنى لحد ما حاجة تحصل لملف أو فولدر (اتعمل، أو اتحفظ، أو اتمسح) ويطبع اللي حصل. فتربطه بأمر يتنفّذ لوحده كل ما تحفظ: اختبارات، أو build، أو رفع الملف على السيرفر. والـ kernel نفسه هو اللي بيبلّغه بالتغيير لحظتها (خاصية اسمها inotify)، فمبيفحصش كل ثانية زي [[watch]].

جاي في باكدج [[inotify-tools]]: [[sudo apt install inotify-tools]]. من غير flags بيستنى أول حدث ويطبعه ويخرج. [[-m]] (monitor) يفضل شغال ويطبع كل حدث في سطر، و [[-r]] (recursive) يراقب الفولدر وكل اللي جواه، حتى الفولدرات اللي هتتعمل بعدين، و [[-q]] (quiet) من غير رسالة [[Setting up watches]]، و [[-e close_write,moved_to]] الأحداث دي بس، و [[--exclude 'regex']] يتجاهل أي مسار بيطابق الـ regex، و [[-t 60]] يخرج بعد ٦٠ ثانية لو محصلش حاجة.

أشهر الأحداث: [[create]] ملف اتعمل، و [[modify]] اتكتب فيه (وبيتكرر كذا مرة في الحفظة الواحدة)، و [[close_write]] اتقفل بعد كتابة، يعني الحفظ خلص، و [[moved_to]] ملف اتنقل للفولدر، و [[delete]] اتمسح. عشان كده [[close_write]] هو اللي معناه «اتحفظ»، و [[moved_to]] معاه عشان محررات كتير بتحفظ في ملف مؤقت وبعدين تغيّر اسمه للاسم الحقيقي.

و [[--format '%w%f']] بيخلي كل سطر هو مسار الملف بس: [[%w]] الفولدر و [[%f]] اسم الملف (و [[%e]] اسم الحدث لو عايزه). والسطور دي بتروح بـ pipe لـ [[while read -r f; do ... done]] (درس «while read»): كل سطر بيتقري في [[f]] وتتنفّذ اللي جوه اللوب، واللوب مبيخلصش طول ما inotifywait شغال. و [[case "$f" in *.js) ... ;; esac]] (درس case) بيخلي الأمر يتنفّذ لملفات .js بس. و [[node --check]] بيتأكد إن الملف مفيهوش syntax error من غير ما يشغّله.`,
          example: R`sudo apt install inotify-tools
# جرّب الأول: اطبع كل حدث في src لحد ما تدوس Ctrl+C
inotifywait -m -r src/
# كل ما ملف .js يتحفظ، اتأكد إن مفيهوش syntax error
inotifywait -q -m -r -e close_write,moved_to --exclude '(node_modules|\.git)' --format '%w%f' . |
while read -r f; do
  case "$f" in
    *.js) echo "$(date +%T) $f" && node --check "$f" && echo "OK" ;;
  esac
done`,
          try: R`في فولدر مشروع شغّل الأمر التاني، وافتح ترمنال تاني: احفظ ملف .js سليم، وبعدين ملف فيه غلطة ([[echo "const = ;" > src/bad.js]])، وبعدين ملف .txt، وراقب الترمنال الأول.`,
          flag: "script",
          mac: ["diff", R`مفيش inotify على الماك. البديل [[brew install fswatch]]: [[fswatch -o src | xargs -n1 -I{} npm test]] بيشغّل الاختبارات مرة مع كل دفعة تغييرات ([[-o]] سطر واحد لكل دفعة بدل سطر لكل ملف).`],
          deep: {
            why: R`كل مرة تحفظ ملف وتروح للترمنال تكتب نفس الأمر (اختبار، build، [[rsync]] للسيرفر) ده شغل ممكن يتعمل لوحده. أدوات زي [[nodemon]] و [[vite]] بتعمل ده جوه مشروع Node، لكن [[inotifywait]] بيخليك تربط أي أمر بأي فولدر، حتى لو ملوش علاقة بـ Node: ملفات Markdown تتحوّل HTML، أو صور تتصغّر أول ما تتحط في فولدر، أو إعدادات Nginx يتعملها test أول ما تتعدّل.`,
            how: R`inotify جزء من kernel لينكس: البرنامج بيقوله «بلّغني بأي تغيير في الفولدر ده»، والـ kernel بيبعتله حدث لحظة ما أي برنامج يكتب أو يمسح أو ينقل ملف هناك. مفيش فحص كل ثانية، فمبياكلش CPU وهو مستني.

كل فولدر بيتراقب محتاج watch واحد، و [[-r]] بيعمل watch لكل فولدر تحت اللي اديته. فولدر فيه node_modules ممكن يبقى جواه عشرات الآلاف من الفولدرات، وفيه حد أقصى للـ watches لكل يوزر ([[/proc/sys/fs/inotify/max_user_watches]]؛ في الأنظمة القديمة كان 8192، والـ kernel الجديد بيحسبه من حجم الرام). عشان كده [[--exclude]] مهم: الفولدرات المستبعدة مبتتراقبش أصلًا.

والـ pipe لـ [[while read]]: inotifywait بيطبع سطر لكل حدث وبيفضل شغال، فاللوب بيفضل مستني السطر الجاي. ولو الأمر اللي جوه اللوب طوّل، الأحداث الجديدة بتستنى في الـ pipe لحد ما يخلص. وعشان كده متشغّلش جوه اللوب حاجة مبتخلصش (زي سيرفر)؛ ده محتاج أداة بتعمل restart زي [[entr -r]] أو [[node --watch]].

ومبيشتغلش على فولدرات الشبكة (NFS و SMB)، ولا على تعديلات برامج ويندوز في [[/mnt/c]] من جوه WSL، لأن التعديل محصلش من خلال الـ kernel ده.`,
            when: R`تشغيل اختبارات أو lint أول ما تحفظ في مشروع مفيهوش watch mode. رفع ملف على السيرفر كل ما يتعدّل: [[rsync]] جوه اللوب. فولدر «inbox» على السيرفر: أول ما ملف يتحط فيه ([[close_write]] أو [[moved_to]]) سكربت يعالجه وينقله. ولو كل اللي عايزه إعادة تشغيل سيرفر Node، [[node --watch app.js]] أبسط.`,
            mistakes: R`مراقبة [[modify]] بدل [[close_write]]، فالأمر يشتغل كذا مرة في الحفظة الواحدة، وساعات على ملف لسه نصه مكتوب. ونسيان [[moved_to]]، فالمحررات اللي بتحفظ بملف مؤقت متتمسكش. و [[-r]] على مشروع فيه node_modules من غير [[--exclude]]. وإن الأمر جوه اللوب يكتب في نفس الفولدر اللي بتراقبه (build بيطلّع ملفات في src مثلًا)، فيعمل حدث جديد، واللوب يلف على نفسه للأبد. ونسيان [[-m]]، فيمسك أول حدث ويخرج.`
          },
          lines: [
            R`سطّب inotifywait.`,
            R`راقب src وكل اللي جواه ([[-r]])، واطبع كل حدث في سطر وفضل شغال ([[-m]]).`,
            R`راقب الفولدر الحالي من غير رسايل ([[-q]])، على الحفظ ونقل الملفات بس، ومن غير node_modules و .git، واطبع مسار الملف بس. والـ [[|]] في آخر السطر معناه إن الأمر مكمّل في السطر الجاي.`,
            R`كل سطر (مسار ملف) بيتقري في المتغير f...`,
            R`...وبنشوف امتداده:`,
            R`لو .js: اطبع الوقت والمسار، وافحص الـ syntax بـ [[node --check]]، ولو سليم اطبع OK.`,
            R`نهاية الـ case.`,
            R`نهاية اللوب، اللي مبيخلصش طول ما inotifywait شغال.`
          ],
          sol: R`مع كل حفظة لملف .js سليم بيظهر سطر زي [[10:44:32 ./src/app.js]] وتحته [[OK]]. ومع [[bad.js]] بيظهر اسمه، وبعده رسالة node: السطر الغلط وتحته [[^]]، و [[SyntaxError: Unexpected token '=']]، ومفيش OK لأن [[&&]] وقفت. والـ .txt مبيطبعش حاجة لأن [[case]] بيتجاهله، وأي حاجة جوه [[node_modules]] أو [[.git]] مبتوصلش أصلًا. ولو ملف اتحفظ في ملف مؤقت واسمه اتغير بعدين (زي ما محررات كتير بتعمل)، [[moved_to]] بيمسكه.

ولو مفيش أي حاجة بتظهر وانت في WSL والملفات على [[/mnt/c]]، ده متوقع: inotify مبيشوفش تعديلات برامج ويندوز هناك؛ حط المشروع جوه لينكس ([[~/projects]]). ولو ظهر [[upper limit on inotify watches reached]]، شوف [[cat /proc/sys/fs/inotify/max_user_watches]] وزوّده، أو استبعد فولدرات زي node_modules بـ [[--exclude]].`
        },
        {
          cmd: "notify-send و spd-say",
          title: "خلّي الجهاز ينبّهك لما الأمر يخلص",
          desc: R`لو شغّلت حاجة بتاخد وقت (build، أو تسطيب، أو باك أب) وسبت الترمنال، [[notify-send]] بيطلّع إشعار على سطح المكتب، و [[spd-say]] بينطق جملة بصوت، و [[paplay]] بيشغّل صوت. فتعرف إنها خلصت من غير ما تفضل باصص. ده على لينكس بواجهة (desktop) بس، مش على سيرفر.

الفكرة كلها في [[;]]: [[npm run build; notify-send "Build" "finished"]] بيطلّع الإشعار بعد ما الأمر الأول يخلص، نجح أو فشل ([[&&]] بدلها لو عايزه لو نجح بس). و [[$?]] جوه الإشعار بيطبع exit code الأمر اللي قبله، 0 لو نجح (درس [[$?]]). و [[notify-send]] بياخد عنوان وبعده نص: [[-u critical]] (urgency) بيخلي الإشعار يفضل لحد ما تقفله، و [[-i dialog-error]] أيقونة، و [[-t 5000]] مدة الظهور بالمللي ثانية (GNOME غالبًا بيتجاهلها).

على أوبونتو Desktop الحاجات دي غالبًا متسطبة؛ ولو لأ: [[sudo apt install libnotify-bin speech-dispatcher pulseaudio-utils]] (الأولى فيها notify-send، والتانية spd-say، والتالتة paplay). والأصوات الجاهزة في [[/usr/share/sounds/freedesktop/stereo/]] زي [[complete.oga]] و [[bell.oga]]. ومن أوبونتو 22.10 الصوت ماشي على PipeWire، فـ [[pw-play]] بيشغّل نفس الملفات من غير pulseaudio-utils.

و [[~/.bashrc]] بتاع أوبونتو فيه [[alias alert=...]] جاهز: [[sleep 10; alert]] بيطلّع إشعار نصه الأمر نفسه ([[sleep 10]])، بأيقونة ترمنال لو نجح وأيقونة error لو فشل. هو بيقرا [[$?]] الأول، وبعدين بياخد آخر سطر في [[history]] ويشيل منه الرقم و [[; alert]] بـ [[sed]]. وفي المثال فانكشن [[ding]] بتعمل نفس الفكرة بشكل أوضح: [[local rc=$?]] لازم أول حاجة فيها عشان تمسك exit code الأمر اللي قبلها قبل ما أي أمر تاني يغيّره، و [[$*]] كل الكلام اللي اتبعتلها، و [[return $rc]] بترجّع نفس النتيجة. ومتسميهاش [[done]]: دي كلمة محجوزة في bash (بتقفل اللوب)، و [[done() {]] بيطلّع syntax error.

وعلى سيرفر بـ ssh، أو في WSL أو container، مفيش سطح مكتب، و [[notify-send]] هيقولك [[Cannot autolaunch D-Bus without X11 $DISPLAY]]. هناك أبسط حاجة [[printf '\a']]: حرف الجرس (bell)، بيوصل لترمنالك على جهازك حتى عبر ssh، والترمنال بيعمل صوت أو بيعلّم التاب حسب إعداداته.`,
          example: R`sudo apt install libnotify-bin speech-dispatcher pulseaudio-utils
sleep 5; notify-send "Done" "sleep 5 finished"
npm run build; notify-send -u critical "Build" "exit code: $?"
spd-say "build finished"
paplay /usr/share/sounds/freedesktop/stereo/complete.oga
sleep 3; alert
ding() { local rc=$?; notify-send "Finished (exit $rc)" "$*"; printf '\a'; return $rc; }
ls /nope; ding "ls"`,
          try: R`شغّل [[sleep 10; alert]] واعمل minimize للترمنال واستنى. وبعدين حط فانكشن [[ding]] في [[~/.bashrc]] وجرّبها مع أمر بيفشل: [[ls /nope; ding "ls"]]، وبعدها [[echo $?]].`,
          mac: ["diff", R`مفيش notify-send على الماك. الإشعار: [[osascript -e 'display notification "Build finished" with title "Done"']]، والصوت: [[say "build finished"]] و [[afplay /System/Library/Sounds/Glass.aiff]]. و [[printf '\a']] شغال في كل حتة.`],
          deep: {
            why: R`الأوامر الطويلة بتسرق تركيزك: يا إما تفضل باصص على الترمنال، يا إما تروح تعمل حاجة وترجع بعد نص ساعة تلاقيه خلص من ٢٠ دقيقة، أو وقف من أول دقيقة على error. إشعار أو صوت لحظة ما يخلص بيحل الاتنين، وخصوصًا لو بيقولك نجح ولا فشل.`,
            how: R`[[notify-send]] مبيرسمش الإشعار بنفسه: بيبعت رسالة على D-Bus (قناة بتتكلم بيها برامج سطح المكتب مع بعض) لخدمة الإشعارات بتاعة الواجهة (GNOME Shell في أوبونتو)، وهي اللي بترسمه. عشان كده محتاج جلسة desktop شغالة، ومتغيرات زي [[DISPLAY]] و [[DBUS_SESSION_BUS_ADDRESS]]، ومن غيرهم بيطلّع error.

و [[spd-say]] بيبعت النص لـ speech-dispatcher، وده بيستخدم محرك نطق (غالبًا espeak-ng) ويطلّع الصوت. و [[paplay]] بيشغّل ملف صوت على سيرفر الصوت، و PipeWire بيفهم نفس الطلبات دي.

و [[printf '\a']] أقدم من كل ده: حرف رقمه 7 اسمه BEL، والترمنال لما يستقبله مبيطبعش حاجة وبيعمل تنبيه. ولأنه مجرد حرف في الناتج، بيعدّي في ssh و tmux لحد ترمنالك.

والـ alias [[alert]] فيه حيلة: [[$?]] جوه الـ alias بيتقري لحظة تنفيذه، و [[alert]] جاية بعد [[;]] على طول، فـ [[$?]] هو exit code الأمر اللي قبلها.`,
            when: R`أي حاجة بتاخد أكتر من دقيقة وانت على جهازك: [[docker compose build]]، و [[npm install]] في مشروع كبير، و [[apt upgrade]]، ونسخ ملفات كبيرة. ومع [[watch -g]] أو [[inotifywait]]: «نبّهني لما الملف ده يظهر». وعلى السيرفر جرس [[printf '\a']]، ولو محتاج إشعار حقيقي على الموبايل، طلب [[curl]] لخدمة زي Telegram bot أو ntfy.`,
            mistakes: R`[[أمر && notify-send]] وتستنى إشعار لو فشل، و [[&&]] مبتكمّلش لو فشل؛ استخدم [[;]]. و [[local rc=$?]] مش أول حاجة في الفانكشن، فتمسك exit code أمر جواها. وفانكشن اسمها [[done]]. و notify-send في cron: مفيش جلسة desktop هناك فبيفشل في صمت. وإنك تتعوّد على الإشعارات وتنسى إن السيرفر مفيهوش.`
          },
          lines: [
            R`سطّب الأدوات لو مش موجودة.`,
            R`استنى ٥ ثواني، وبعدين ([[;]]) إشعار بعنوان ونص.`,
            R`بعد الـ build، إشعار مهم بيفضل ظاهر، فيه exit code بتاع الـ build.`,
            R`انطق الجملة دي بصوت.`,
            R`شغّل صوت «خلصت» من أصوات النظام.`,
            R`الـ alias الجاهز في أوبونتو: إشعار نصه [[sleep 3]].`,
            R`فانكشن بتاعتك: امسك exit code اللي فات، وإشعار فيه الرقم والكلام اللي اديته لها، وجرس، ورجّع نفس الـ exit code.`,
            R`أمر هيفشل، وبعده ding، فالإشعار هيقول exit 2.`
          ],
          sol: R`بعد ١٠ ثواني بيظهر إشعار فوق الشاشة نصه [[sleep 10]] بأيقونة ترمنال. ومع [[ls /nope; ding "ls"]]: الترمنال بيطبع [[ls: cannot access '/nope': No such file or directory]]، والإشعار عنوانه [[Finished (exit 2)]] ونصه [[ls]]، ومعاه صوت الجرس. و [[echo $?]] بعدها بيطبع [[2]] مش [[0]]، لأن [[ding]] رجّعت نفس الـ exit code بـ [[return $rc]]، فتقدر تكمّل بعدها بـ [[&&]] عادي.

لو مفيش إشعار والترمنال طبع [[Cannot autolaunch D-Bus without X11 $DISPLAY]]، انت في ssh أو WSL أو container، والجرس هو اللي هيوصلك. ولو [[alert]] قالك [[command not found]]، يبقى [[.bashrc]] بتاعك مفيهوش السطر ده (مش أوبونتو أو اتعدّل)، فاستخدم [[ding]]. ولو الإشعار ظهر واختفى وانت مش قاعد، زوّد [[-u critical]].`
        },
        {
          cmd: "fastfetch",
          title: "ملخص الجهاز ولوجو التوزيعة",
          desc: R`[[fastfetch]] بيطبع ملخص الجهاز في لحظة جنب لوجو التوزيعة: نسخة النظام والـ kernel، والمعالج والرام والديسك، والشيل والترمنال، والجهاز شغال بقاله قد إيه. مفيد أول ما تدخل سيرفر أو جهاز جديد، أو لما حد يسألك في issue على GitHub «انت شغال على إيه؟».

هتلاقي شروحات قديمة كتير بتستخدم [[neofetch]]، بس صاحبه أرشف المشروع على GitHub في أبريل 2024 ومبقاش بيتحدّث، وأوبونتو 26.04 شالته من الـ repo. و [[fastfetch]] هو البديل اللي معظم الناس راحتله: مكتوب بـ C فأسرع، وبيتحدّث باستمرار، وفيه [[-c neofetch]] بنفس شكل neofetch القديم.

التسطيب بيختلف حسب نسخة أوبونتو:
• 25.04 وأحدث (زي 26.04 LTS): [[sudo apt install fastfetch]] على طول.
• 24.04 و 22.04: مش في الـ repo الرسمي، فيا إما الـ PPA اللي صفحة المشروع بتقول عليه: [[sudo add-apt-repository ppa:zhangsongcui3371/fastfetch]] وبعدين [[sudo apt install fastfetch]]، يا إما ملف [[fastfetch-linux-amd64.deb]] من صفحة الـ releases على GitHub وتسطّبه بـ [[sudo apt install ./fastfetch-linux-amd64.deb]].
• الماك: [[brew install fastfetch]]، وويندوز: [[winget install fastfetch]].
والـ PPA (Personal Package Archive) repo على Launchpad بيعمله شخص أو فريق، و [[add-apt-repository]] بيضيفه لمصادر apt ويعمل [[apt update]] لوحده؛ يعني انت كده بتثق في صاحبه، فاستخدم بس اللي صفحة المشروع الرسمية بتشاور عليه.

[[--logo none]] من غير لوجو، و [[-l ubuntu_small]] لوجو أصغر ([[--list-logos]] يعرض الأسامي). و [[-s OS:Kernel:Uptime:Memory:Disk]] (structure) بيعرض الأجزاء دي بس وبالترتيب ده، و [[--list-modules]] يعرض كل الأجزاء الموجودة. و [[-c all]] كل حاجة يعرفها، و [[--pipe]] من غير ألوان لو هتحفظ الناتج في ملف.

وعشان متكتبش flags كل مرة: [[fastfetch --gen-config]] بيعمل [[~/.config/fastfetch/config.jsonc]]، وده JSON مسموح فيه تعليقات بـ [[//]]، وجواه لستة [[modules]] تمسح منها اللي مش عايزه. ولو عايزه يظهر مع كل ترمنال جديد، ضيف سطر [[fastfetch]] في آخر [[~/.bashrc]]: أول الملف ده في أوبونتو بيقفل لو الشيل مش تفاعلي، فمش هيبوّظ [[scp]] ولا [[rsync]]. بس خليه صغير، لأن كل ترمنال هيستناه.`,
          example: R`# أوبونتو 24.04 و 22.04 (على 25.04 وأحدث: sudo apt install fastfetch على طول)
sudo add-apt-repository ppa:zhangsongcui3371/fastfetch
sudo apt install fastfetch
fastfetch
fastfetch --logo none -s OS:Kernel:Uptime:CPU:Memory:Disk
fastfetch -l ubuntu_small
fastfetch --gen-config
echo 'fastfetch -l ubuntu_small -s OS:Uptime:Memory:Disk' >> ~/.bashrc`,
          try: R`سطّبه واعرض الملخص الكامل. وبعدين اعمل ملف إعدادات بلوجو صغير وفيه OS و Kernel و Uptime و Memory و Disk بس، وخلّي [[fastfetch]] يظهر مع كل ترمنال جديد.`,
          mac: ["both", R`[[brew install fastfetch]]، وبيعرض لوجو آبل ونوع الشريحة (زي Apple M2) والـ GPU. والسطر هناك في [[~/.zshrc]].`],
          deep: {
            why: R`لما تدخل سيرفر جديد أو جهاز حد، أول أسئلة: أوبونتو نسخة كام؟ الرام قد إيه؟ الديسك فاضي فيه قد إيه؟ شغال بقاله قد إيه من آخر ريستارت؟ بدل ما تكتب [[lsb_release -a]] و [[free -h]] و [[df -h]] و [[uptime]] ورا بعض، fastfetch بيجاوب في شاشة واحدة. ولما تكتب bug report، الملخص ده هو اللي المطوّرين بيطلبوه.`,
            how: R`fastfetch بيقرا المعلومات من نفس الأماكن اللي الأوامر التانية بتقرا منها، بس مباشرة من غير ما يشغّلها: [[/etc/os-release]] للتوزيعة، و [[/proc/meminfo]] للرام، و [[/proc/cpuinfo]] للمعالج، وقاعدة بيانات dpkg لعدد الباكدجات، ومتغيرات البيئة للشيل والترمنال. عشان كده سريع، وده الفرق الأساسي عن neofetch اللي كان سكربت bash بيشغّل أوامر كتير.

كل سطر في الناتج «module»، و [[-s]] أو لستة [[modules]] في الـ config بتحدد أنهي يظهر وبأي ترتيب. واللوجو بيتختار من [[ID]] اللي في [[/etc/os-release]]، وتقدر تغيّره لأي لوجو من [[--list-logos]] أو ملف نص فيه رسمة بتاعتك.

وملف الـ config بيتقري من [[~/.config/fastfetch/config.jsonc]] لو موجود، والـ flags اللي بتكتبها في الأمر بتغلب اللي في الملف.`,
            when: R`أول ما تدخل VPS جديد، أو بتكتب issue أو بتسأل في جروب ومحتاج تقول جهازك فيه إيه، أو بتتأكد إن ترقية التوزيعة نجحت. وكتحية في أول الترمنال لو عاجبك، بشرط يكون صغير.`,
            mistakes: R`سطر [[neofetch]] من شرح قديم: على 26.04 مش موجود، وحتى لو موجود مبيتحدّثش. و [[add-apt-repository]] لأي PPA تلاقيه في شرح، من غير ما تتأكد إنه من صفحة المشروع الرسمية. و fastfetch كامل في [[.bashrc]] على سيرفر بتدخله بـ ssh كتير، فكل دخلة تستنى وتعدّي شاشة. وإنك تبعت الناتج كامل في مكان عام: فيه اسم اليوزر والجهاز و IP الداخلي ([[Local IP]]).`
          },
          lines: [
            R`ضيف الـ PPA بتاع المشروع (وده بيعمل apt update لوحده).`,
            R`سطّب fastfetch منه.`,
            R`اعرض الملخص الكامل جنب لوجو التوزيعة.`,
            R`من غير لوجو، والأجزاء دي بس بالترتيب ده.`,
            R`نفس الملخص بلوجو أوبونتو الصغير.`,
            R`اعمل ملف إعدادات فيه كل الأجزاء الافتراضية تعدّل فيه.`,
            R`خلّي نسخة صغيرة منه تظهر مع كل ترمنال جديد.`
          ],
          sol: R`[[fastfetch]] بيطبع لوجو أوبونتو على الشمال، وعلى اليمين [[ali@laptop]] وتحته خط، وبعدين سطور زي دي (ده ناتج حقيقي من أوبونتو 24.04 شغال جوه Docker على WSL، والأرقام عندك هتختلف):
[[OS: Ubuntu 24.04.5 LTS (Noble Numbat) x86_64]]
[[Kernel: Linux 6.6.87.2-microsoft-standard-WSL2]]
[[Uptime: 20 mins]]
[[Packages: 404 (dpkg)]]
[[Shell: bash 5.2.21]]
[[CPU: AMD Ryzen 9 5900HX (16) @ 3.29 GHz]]
[[Memory: 930.13 MiB / 15.33 GiB (6%)]]
[[Disk (/): 14.29 GiB / 1006.85 GiB (1%) - overlay]]
وفي الآخر مربعات ألوان الترمنال. على جهاز عادي الـ Kernel بيخلص بـ [[generic]] والديسك [[ext4]]، وعلى Desktop هتلاقي كمان سطور للشاشة والواجهة (GNOME) والخط.

بالملف اللي تحت، [[fastfetch]] لوحده بيطبع اللوجو الصغير وجنبه [[ali@laptop]] والـ ٥ سطور دول بس (ولو ضفت سطر المثال في [[.bashrc]] قبل كده، امسحه عشان ميطبعش مرتين). ولو [[--gen-config]] قالك إن الملف [[exists]]، يبقى عملته قبل كده: عدّله أو امسحه الأول. ولو [[add-apt-repository]] مش موجود: [[sudo apt install software-properties-common]].`,
          solCode: R`mkdir -p ~/.config/fastfetch
cat > ~/.config/fastfetch/config.jsonc <<'EOF'
{
  "$schema": "https://github.com/fastfetch-cli/fastfetch/raw/master/doc/json_schema.json",
  "logo": { "source": "ubuntu_small" },
  // الأجزاء اللي هتظهر، بالترتيب
  "modules": ["title", "separator", "os", "kernel", "uptime", "memory", "disk"]
}
EOF
fastfetch
echo 'fastfetch' >> ~/.bashrc`
        }
      ]
    }
]);
