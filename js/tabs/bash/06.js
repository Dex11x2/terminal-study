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
          teach: R`## الفكرة

اليوزر على لينكس مش أكتر من سطور في ملفات نصية: سطر في [[/etc/passwd]] (اسمه ورقمه وفولدره وشيله)، وسطر في [[/etc/shadow]] (الباسورد)، وسطور في [[/etc/group]] (جروباته). [[useradd]] بيكتب السطور دي ويعمل فولدر الـ home، و [[usermod]] بيعدّلها. كل الناتج تحت اتطبع فعلًا في container أوبونتو 24.04 ([[docker run ubuntu:24.04]])، والأرقام عندك هتختلف.

---

## ١. [[sudo useradd -m -s /bin/bash -G sudo sara]]

نفكّه حتة حتة:

| الحتة | معناها |
|---|---|
| [[sudo]] | عمل يوزر بيكتب في ملفات النظام، فمحتاج صلاحية root |
| [[useradd]] | اعمل يوزر جديد |
| [[-m]] | create home: اعمل [[/home/sara]] وانسخ فيه ملفات [[/etc/skel]] |
| [[-s /bin/bash]] | shell: الشيل اللي هيفتح لما تدخل |
| [[-G sudo]] | Groups: جروبات «إضافية»، هنا [[sudo]] (اللي بيسمح باستخدام sudo على أوبونتو) |
| [[sara]] | اسم اليوزر، ودايمًا في الآخر |

الأمر مبيطبعش حاجة لو نجح. نشوف عمل إيه:

~~~bash
grep '^sara' /etc/passwd
ls -la /home/sara
~~~

~~~text الناتج
sara:x:1001:1003::/home/sara:/bin/bash
-rw-r--r-- 1 sara sara  220 Mar 31  2024 .bash_logout
-rw-r--r-- 1 sara sara 3771 Mar 31  2024 .bashrc
-rw-r--r-- 1 sara sara  807 Mar 31  2024 .profile
~~~

التلات ملفات دول اتنسخوا من [[/etc/skel]] (skeleton = الهيكل)، ده «القالب» اللي أي home جديد بيتعمل منه. والسطر في passwd فيه الـ home والشيل اللي طلبناهم. (الحقول السبعة متشرحة بالتفصيل في درس «id و groups و getent».)

### ليه [[-m]] و [[-s]] لازمين على أوبونتو؟

لأن الافتراضي هناك مكتوب في [[/etc/default/useradd]]:

~~~text الناتج: grep SHELL /etc/default/useradd
SHELL=/bin/sh
~~~

ومفيش [[CREATE_HOME yes]] في [[/etc/login.defs]]، فلو كتبت [[useradd bare]] من غير flags:

~~~text الناتج
bare:x:1002:1004::/home/bare:/bin/sh
ls: cannot access '/home/bare': No such file or directory
~~~

السطر بيقول الـ home هو [[/home/bare]]، بس الفولدر نفسه متعملش، والشيل [[sh]] الفقير.

---

## ٢. [[sudo passwd sara]]

[[useradd]] مبيسألش عن باسورد، فالحساب بيتعمل والباسورد «مقفول». [[passwd]] (password) بيحطله باسورد، وبيسألك مرتين ومش بيعرض اللي بتكتبه:

~~~text الناتج
New password:
Retype new password:
passwd: password updated successfully
~~~

---

## ٣. [[id sara]]

~~~text الناتج
uid=1001(sara) gid=1003(sara) groups=1003(sara),27(sudo)
~~~

- [[uid]] (User ID): رقم sara. النظام بيتعامل بالأرقام، والاسم للبني آدمين بس.
- [[gid]] (Group ID): جروبها **الأساسي**. useradd عمل جروب بنفس اسمها (رقمه 1003)، لأن [[USERGROUPS_ENAB yes]] في [[/etc/login.defs]].
- [[groups=]]: كل جروباتها: الأساسي + [[sudo]] (رقمه 27 ثابت على أوبونتو).

---

## ٤. [[sudo usermod -aG docker sara]]

[[usermod]] (user modify) بيعدّل يوزر موجود. و [[-aG]] حرفين متجمّعين: [[-a]] (append = ضيف) و [[-G]] (الجروبات الإضافية). يعني «ضيف docker على اللي عندها».

~~~text الناتج: id sara
uid=1001(sara) gid=1003(sara) groups=1003(sara),27(sudo),1001(docker)
~~~

> الجروب لازم يكون موجود. لو مش موجود: [[usermod: group 'docker' does not exist]]، واعمله بـ [[sudo groupadd docker]].

---

## ٥ و ٦. الغلطة: [[sudo usermod -G devs sara]] من غير [[-a]]

[[-G]] لوحدها معناها «جروباتها الإضافية هي دي **بس**»:

~~~text الناتج: id sara
uid=1001(sara) gid=1003(sara) groups=1003(sara),1002(devs)
~~~

[[sudo]] و [[docker]] اتشالوا. الأساسي ([[sara]]) فضل لأن [[-G]] مبتلمسش الجروب الأساسي. لو sara هي يوزرك الوحيد على السيرفر، كده انت قفلت نفسك برّه sudo.

---

## ٧. [[sudo usermod -aG sudo,docker sara]]

أكتر من جروب بيتفصلوا بفاصلة **من غير مسافات**. ومع [[-a]] بيضيفهم على devs:

~~~text الناتج: id sara
uid=1001(sara) gid=1003(sara) groups=1003(sara),27(sudo),1001(docker),1002(devs)
~~~

### الجروب الجديد مش بيظهر في الجلسة المفتوحة

جربتها: عملية شغالة كـ sara من قبل، وبعدين ضفتها لجروب جديد اسمه video2:

~~~text الناتج
old session:   sudo,docker,devs,sara
new login:     sara sudo docker devs video2
~~~

الجروبات بتتحدد لحظة الـ login وبتتورث لكل أمر بتشغّله. فبعد [[usermod]] اليوزر لازم يخرج ويدخل تاني (أو [[newgrp docker]]).

---

## ٨. [[sudo useradd -r -M -s /usr/sbin/nologin myapp]]

يوزر لخدمة (تطبيقك مثلًا) مش لبني آدم:

| الحتة | معناها |
|---|---|
| [[-r]] | system account: رقم أقل من 1000 |
| [[-M]] | متعملش home (عكس [[-m]]) |
| [[-s /usr/sbin/nologin]] | ممنوع يفتح شيل |

~~~text الناتج: getent passwd myapp
myapp:x:999:999::/home/myapp:/usr/sbin/nologin
~~~

الرقم 999 (أوبونتو بيدّي حسابات النظام أرقام من 999 ونازل)، والفولدر مكتوب بس مش موجود.

---

## ٩ و ١٠. [[usermod -L]] و [[usermod -U]]

[[-L]] (lock) بيحط [[!]] قدام الـ hash في [[/etc/shadow]]، و [[-U]] (unlock) بيشيلها. بصينا على أول ٢٠ حرف من سطرها:

~~~text الناتج
after -L:  sara:!$y$j9T$cxIDMiH
after -U:  sara:$y$j9T$cxIDMiH.
~~~

الـ hash نفسه متغيرش، فالباسورد القديم بيرجع يشتغل. (القفل ده للباسورد بس، والدخول بمفتاح SSH بيفضل شغال: درس «passwd -l و chage».)

---

## ١١. [[sudo userdel -r olduser]]

[[userdel]] بيمسح السطور، و [[-r]] (remove) بيمسح فولدر الـ home كمان:

~~~text الناتج
userdel: olduser mail spool (/var/mail/olduser) not found
~~~

دي مجرد ملاحظة إن مفيش صندوق بريد يتمسح، والأمر نجح (exit code 0).

---

## الخلاصة

| عايز | اكتب |
|---|---|
| يوزر لبني آدم | [[useradd -m -s /bin/bash -G sudo اسم]] ثم [[passwd اسم]] |
| يوزر لخدمة | [[useradd -r -M -s /usr/sbin/nologin اسم]] |
| ضيف جروب | [[usermod -aG جروب اسم]] (الـ [[-a]] متتنسيش) |
| اقفل / افتح الباسورد | [[usermod -L]] / [[usermod -U]] |
| امسح هو وفولدره | [[userdel -r اسم]] |

وعلى فيدورا و RHEL جروب المديرين [[wheel]]. وعلى الماك اليوزرز مش في [[/etc/passwd]] أصلًا، فبتستخدم [[sysadminctl]] و [[dseditgroup]] (من الـ man pages بتاعة الماك، مش متجرّبة هنا).`,
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
          teach: R`## الفكرة

الأوامر دي «بتسأل» بس، مبتغيّرش حاجة: اليوزر ده رقمه إيه؟ في أنهي جروبات؟ وسطره في قاعدة اليوزرز شكله إيه؟ اتجربت كلها في container أوبونتو 24.04 فيه يوزر اسمه sara في جروبات sudo و docker و devs.

---

## ١. [[id sara]]

~~~text الناتج
uid=1001(sara) gid=1003(sara) groups=1003(sara),27(sudo),1001(docker),1002(devs)
~~~

| الحتة | معناها |
|---|---|
| [[uid=1001(sara)]] | User ID: رقم اليوزر، والاسم بين قوسين |
| [[gid=1003(sara)]] | Group ID: الجروب **الأساسي**، وهو اللي ملفاتها الجديدة بتاخده |
| [[groups=...]] | كل الجروبات: الأساسي والإضافية، كل واحد برقمه واسمه |

ولو عايز حتة واحدة بس: [[id -u sara]] طبع [[1001]]، و [[id -gn sara]] طبع [[sara]] ([[-g]] الجروب الأساسي و [[-n]] بالاسم بدل الرقم).

---

## ٢. [[id -nG]]

من غير اسم يوزر، [[id]] بيتكلم عنك انت، وعن **جلستك الحالية**. و [[-G]] كل الجروبات و [[-n]] بالأسامي:

~~~text الناتج (كـ sara)
sara sudo docker devs
~~~

الفرق المهم: [[id sara]] بيقرا من الملفات دلوقتي، و [[id]] لوحده بيقرا جروبات العملية اللي انت فيها، اللي اتحددت لحظة الـ login. لو اختلفوا، يبقى فيه جروب اتضاف بعد ما دخلت.

---

## ٣. [[groups sara]]

~~~text الناتج
sara : sara sudo docker devs
~~~

نفس المعلومة بالأسامي بس، وقبلها اسم اليوزر و [[:]].

---

## ٤. [[getent passwd sara]]

[[getent]] (get entries) بيجيب سطر من «قاعدة بيانات» النظام، و [[passwd]] اسم القاعدة (اليوزرز):

~~~text الناتج
sara:x:1001:1003::/home/sara:/bin/bash
~~~

### نفك السطر: ٧ حقول بينهم [[:]]

| # | القيمة | معناها |
|---|---|---|
| ١ | [[sara]] | الاسم |
| ٢ | [[x]] | الباسورد مش هنا، في [[/etc/shadow]] |
| ٣ | [[1001]] | UID: صفر = root، وأقل من 1000 حسابات نظام، و 1000 وطالع ناس |
| ٤ | [[1003]] | GID الجروب الأساسي |
| ٥ | فاضي | الوصف أو الاسم الكامل (GECOS) |
| ٦ | [[/home/sara]] | فولدر الـ home |
| ٧ | [[/bin/bash]] | الشيل |

وللمقارنة، سطور حسابات نظام من نفس الجهاز:

~~~text الناتج: getent passwd root www-data nobody
root:x:0:0:root:/root:/bin/bash
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
~~~

[[nologin]] في الآخر يعني الحساب ده ممنوع يفتح شيل.

### ليه getent مش [[cat /etc/passwd]]؟

getent بيسأل نفس المصادر اللي النظام بيسألها، والمصادر مكتوبة في [[/etc/nsswitch.conf]]:

~~~text الناتج: grep -E '^(passwd|group|shadow):' /etc/nsswitch.conf
passwd:         files
group:          files
shadow:         files
~~~

[[files]] يعني الملفات اللي في [[/etc]] بس. على جهاز شركة ممكن تلاقي [[files sss]] أو [[files ldap]]، وساعتها getent بيلاقي يوزرز الشركة و grep لأ.

---

## ٥. [[getent group sudo]]

~~~text الناتج
sudo:x:27:ubuntu,sara
~~~

٤ حقول: الاسم، و [[x]]، والرقم، والأعضاء مفصولين بفاصلة. والأعضاء هنا هما اللي sudo جروب **إضافي** ليهم؛ لو حد جروبه الأساسي sudo مش هيتكتب هنا.

---

## ٦. [[getent passwd nosuchuser; echo "exit: $?"]]

- [[;]] نفّذ اللي بعدها مهما حصل.
- [[$?]] الـ exit code بتاع آخر أمر (درس «$?»).

~~~text الناتج
exit: 2
~~~

مفيش سطر خالص، والـ exit code [[2]] معناه «مش لاقي». ده مفيد في سكربت: [[if getent passwd sara > /dev/null; then ...]].

---

## ٧. الـ awk: اليوزرز «الحقيقيين»

~~~bash
awk -F: '$3 >= 1000 && $3 < 60000 {print $1, $3, $7}' /etc/passwd
~~~

| الحتة | معناها |
|---|---|
| [[awk]] | برنامج بيمشي على الملف سطر سطر ويقسّم كل سطر لحقول |
| [[-F:]] | Field separator: الحقول مفصولة بـ [[:]] |
| [[$3]] | الحقل التالت (الـ UID). جوه awk مش متغير شيل، وعشان كده الكود كله بين single quotes |
| [[$3 >= 1000 && $3 < 60000]] | الشرط: الرقم من 1000 لحد أقل من 60000 ([[&&]] = و) |
| [[{print $1, $3, $7}]] | لو الشرط اتحقق: اطبع الاسم والرقم والشيل |

ليه 1000 و 60000؟ دول [[UID_MIN]] و [[UID_MAX]] في [[/etc/login.defs]]، يعني المدى اللي useradd بيدّي منه أرقام للناس، فـ nobody (65534) مش هيظهر.

~~~text الناتج
ubuntu 1000 /bin/bash
sara 1001 /bin/bash
~~~

[[ubuntu]] يوزر جاي جاهز في صورة Docker بتاعة أوبونتو 24.04.

---

## ٨. [[sudo grep -E '^(root|sara):' /etc/shadow]]

[[-E]] regex موسّع، و [[^]] أول السطر، و [[(root|sara)]] واحد من الاتنين. ومحتاج sudo لأن الملف مقفول:

~~~text الناتج: ls -l /etc/shadow
-rw-r----- 1 root shadow 646 Oct  6 07:55 /etc/shadow
~~~

صاحبه root يقرا ويكتب، وجروب shadow يقرا، والباقي ولا حاجة. وأي يوزر عادي بياخد [[cat: /etc/shadow: Permission denied]].

~~~text الناتج
root:*:20713:0:99999:7:::
sara:$y$j9T$xHwlIToiKV5Ro.o52HGwd/$Be9rOAOYKhIa2S85a.LlIceWYkcZQbxxpMOB8THBGoA:20732:0:99999:7:::
~~~

### نفك سطر sara

| الحقل | القيمة | معناها |
|---|---|---|
| ١ | [[sara]] | الاسم |
| ٢ | [[$y$j9T$...$...]] | الـ hash: [[$y$]] = yescrypt، و [[j9T]] إعداداته، وبعدها الـ salt (حتة عشوائية)، وبعدها الـ hash نفسه |
| ٣ | [[20732]] | آخر تغيير للباسورد بعدد الأيام من 1970-01-01 |
| ٤ | [[0]] | min: أقل عدد أيام قبل ما يغيّره تاني |
| ٥ | [[99999]] | max: لازم يتغير كل كام يوم (99999 = عمليًا أبدًا) |
| ٦ | [[7]] | warn: ينبّهه قبلها بكام يوم |
| ٧ و ٨ و ٩ | فاضيين | inactive و expire وواحد محجوز |

و 20732 يوم ده إمتى؟

~~~bash
date -d "1970-01-01 +20732 days" +%F
~~~

~~~text الناتج
2026-10-06
~~~

يعني النهارده، اليوم اللي اتعمل فيه الباسورد. و [[*]] في سطر root معناها مفيش باسورد يتدخل بيه أصلًا؛ أوبونتو بيخليك تستخدم sudo.

---

## الخلاصة

| السؤال | الأمر |
|---|---|
| اليوزر ده في أنهي جروبات؟ | [[id اسم]] أو [[groups اسم]] |
| جلستي أنا فيها إيه دلوقتي؟ | [[id]] أو [[id -nG]] |
| سطر يوزر أو جروب | [[getent passwd اسم]] و [[getent group اسم]] |
| مين في جروب sudo؟ | [[getent group sudo]] |
| حالة الباسورد | سطره في [[/etc/shadow]] بـ sudo |

وعلى الماك [[id]] و [[groups]] موجودين، بس مفيش [[getent]] ولا [[/etc/shadow]]: البديل [[dscl . -read /Users/اسم]] (من الـ man page، مش متجرّب هنا).`,
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
          teach: R`## الفكرة

المثال بيبني فولدر مشترك لفريق: جروب اسمه webteam، فيه ali و mona، وفولدر [[/srv/webteam]] أي حد منهم يعمل فيه ملف، التاني يقدر يعدّله. ٣ حاجات بتشتغل مع بعض: الجروب، وصلاحيات الفولدر، والـ setgid. اتجرب في container أوبونتو 24.04 فيه اليوزرين ali و mona.

---

## ١. [[sudo groupadd webteam]]

[[groupadd]] بيضيف سطر جديد في [[/etc/group]] بأول رقم فاضي من 1000. مبيطبعش حاجة لو نجح.

---

## ٢ و ٣. [[sudo gpasswd -a ali webteam]]

[[gpasswd]] (group password، الاسم قديم، بس بيدير الأعضاء) و [[-a]] (add) يضيف عضو واحد لجروب واحد:

~~~text الناتج
Adding user ali to group webteam
Adding user mona to group webteam
~~~

> متتلخبطش مع [[usermod -a]]: هنا [[-a]] مالهاش فخ. [[gpasswd]] بيلمس الجروب ده بس، والجروبات التانية بتاعة ali زي ما هي.

---

## ٤. [[getent group webteam]]

~~~text الناتج
webteam:x:1008:ali,mona
~~~

الاسم، و [[x]]، والرقم (1008 هنا لأن الأرقام اللي قبله اتاخدت)، والأعضاء في الآخر. وفيه ملف تاني بيتحدّث معاه، [[/etc/gshadow]]، السطر فيه [[webteam:!::ali,mona]]: الـ [[!]] يعني الجروب ملوش باسورد، والحقل الفاضي بعده مديري الجروب (اللي [[gpasswd -A]] بيحطهم).

---

## ٥. [[sudo mkdir -p /srv/webteam]]

[[/srv]] (service data) المكان المتعارف عليه لداتا السيرفر. و [[-p]] (parents) يعمل الفولدرات اللي قبله لو مش موجودة، ومايشتكيش لو الفولدر موجود.

~~~text الناتج: ls -ld /srv/webteam
drwxr-xr-x 2 root root 4096 Oct  6 07:55 /srv/webteam
~~~

ملك root وجروبه root، والفريق مش هيقدر يكتب فيه.

---

## ٦. [[sudo chgrp webteam /srv/webteam]]

[[chgrp]] (change group) بيغيّر جروب الفولدر بس، والصاحب يفضل root:

~~~text الناتج: ls -ld /srv/webteam
drwxr-xr-x 2 root webteam 4096 Oct  6 07:55 /srv/webteam
~~~

بس صلاحيات الجروب لسه [[r-x]]، يعني يقرا بس.

---

## ٧ و ٨. [[sudo chmod 2775 /srv/webteam]]

الرقم ده ٤ أرقام، نقراه من الشمال:

| الرقم | لمين | معناه |
|---|---|---|
| [[2]] | خاص | setgid: الملفات الجديدة تاخد جروب الفولدر |
| [[7]] | الصاحب (root) | rwx = 4+2+1 |
| [[7]] | الجروب (webteam) | rwx: الفريق يعمل ويمسح ملفات |
| [[5]] | الباقي | r-x = 4+1: يدخل ويقرا بس |

~~~text الناتج: ls -ld /srv/webteam
drwxrwsr-x 2 root webteam 4096 Oct  6 07:55 /srv/webteam
~~~

بص على خانة الجروب: [[rws]]. الـ [[s]] مكان الـ [[x]] معناها «x موجودة ومعاها setgid».

### التجربة: ali تعمل ملف و mona تعدّله

~~~bash
su - ali -c "umask; echo v1 > /srv/webteam/plan.txt"
su - mona -c "echo v2 >> /srv/webteam/plan.txt; cat /srv/webteam/plan.txt"
ls -l /srv/webteam
~~~

[[su - ali -c "..."]] بيشغّل الأمر ده كـ ali (درس «su - و sudo -i»)، و [[>>]] بيضيف في آخر الملف.

~~~text الناتج
0002
v1
v2
-rw-rw-r-- 1 ali webteam 6 Oct  6 07:55 plan.txt
~~~

- جروب الملف [[webteam]] مش [[ali]]: ده شغل الـ setgid.
- والجروب عنده [[rw-]]: ده شغل الـ umask بتاع ali ([[0002]]، درس umask).
- فـ mona قدرت تضيف [[v2]].

من غير الـ 2 (فولدر [[775]] بس) الملف كان هيطلع [[ali ali]]، و mona تاخد Permission denied (متجرّبة، الناتج في الحل).

---

## ٩. [[sudo gpasswd -d mona webteam]]

[[-d]] (delete) يشيل عضو:

~~~text الناتج
Removing user mona from group webteam
~~~

و [[getent group webteam]] بقى [[webteam:x:1008:ali]]. ولو mona كانت داخلة، جلستها المفتوحة لسه شايلة الجروب لحد ما تخرج (نفس فكرة الـ login في درس «useradd و usermod»).

---

## الخلاصة

| الخطوة | الأمر | ليه |
|---|---|---|
| ١ | [[groupadd webteam]] | الجروب |
| ٢ | [[gpasswd -a اسم webteam]] | الأعضاء واحد واحد |
| ٣ | [[chgrp webteam الفولدر]] | الفولدر ملك الجروب |
| ٤ | [[chmod 2775 الفولدر]] | الجروب يكتب + الملفات الجديدة تاخد جروب الفولدر |
| ٥ | umask 002 عند الأعضاء | الملفات الجديدة الجروب يكتب فيها |

وعلى الماك [[dseditgroup]] بدل groupadd و gpasswd، ومش محتاج setgid أصلًا: حسب الـ man page بتاعة [[open(2)]] هناك، الملف الجديد بياخد جروب الفولدر دايمًا (من الـ docs، مش متجرّب).`,
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
          teach: R`## الفكرة

كل حاجة في الدرس ده أرقام في سطر اليوزر في [[/etc/shadow]]: الـ hash، وتاريخ آخر تغيير، وكام يوم مسموح، وإمتى الحساب كله يقفل. [[passwd]] و [[chage]] و [[usermod -e]] بيغيّروا الأرقام دي بس. اتجرب على يوزر ali في container أوبونتو 24.04، والتاريخ يومها كان 2026-10-06.

---

## ١. [[sudo passwd -S ali]]

[[-S]] (status) سطر واحد عن حالة الباسورد:

~~~text الناتج
ali P 2026-10-06 0 99999 7 -1
~~~

| الحتة | معناها |
|---|---|
| [[ali]] | اليوزر |
| [[P]] | Password: عنده باسورد شغال. ([[L]] = Locked مقفول، و [[NP]] = No Password من غير باسورد خالص) |
| [[2026-10-06]] | آخر مرة الباسورد اتغير |
| [[0]] | min: أقل أيام بين تغييرين |
| [[99999]] | max: لازم يتغير كل كام يوم (99999 يعني عمليًا أبدًا) |
| [[7]] | warn: تنبيه قبل الانتهاء بكام يوم |
| [[-1]] | inactive: مفيش فترة سماح بعد الانتهاء |

---

## ٢. [[sudo passwd -l ali]]

[[-l]] (lock):

~~~text الناتج
passwd: password changed.
ali L 2026-10-06 0 99999 7 -1
~~~

السطر الأول رسالة عامة بتطلع مع أي تعديل، مش معناها الباسورد نفسه اتغير. والتاني (من [[passwd -S]]) بقى [[L]]. واللي حصل في shadow:

~~~text الناتج: أول ١٢ حرف من سطر ali
ali:!$y$j9T$
~~~

[[!]] اتحطت قدام الـ hash، فمفيش أي باسورد هيطابقه. والدخول بمفتاح SSH بيفضل شغال، لأنه مبيقارنش hash أصلًا.

---

## ٣. [[sudo passwd -u ali]]

[[-u]] (unlock) بيشيل الـ [[!]]، فالحالة ترجع [[P]] والباسورد القديم يشتغل تاني.

---

## ٤. [[sudo passwd -e ali]]

[[-e]] (expire) بيعتبر الباسورد منتهي:

~~~text الناتج: passwd -S ali
ali P 1970-01-01 0 99999 7 -1
~~~

خلّى تاريخ آخر تغيير **صفر**، يعني «اتغير يوم 1970-01-01». فأول ما ali يدخل، النظام يشوف إن الباسورد عدّى عليه أكتر من الـ max، ويقوله:

~~~text الناتج (من الحل)
You are required to change your password immediately (administrator enforced).
~~~

---

## ٥. [[sudo chage -M 90 -m 1 -W 7 -E 2026-12-31 ali]]

[[chage]] (change age) بيظبط المواعيد كلها مرة واحدة:

| الحتة | معناها |
|---|---|
| [[-M 90]] | Maximum: لازم يغيّره كل ٩٠ يوم |
| [[-m 1]] | minimum: مايغيّرهوش تاني قبل يوم، عشان ميرجعش للقديم على طول |
| [[-W 7]] | Warning: ينبّهه قبلها بأسبوع |
| [[-E 2026-12-31]] | Expire: الحساب **كله** يقفل في التاريخ ده |

مبيطبعش حاجة. والسطر في shadow (من الحقل التالت):

~~~text الناتج
0:1:90:7::20818:
~~~

[[0]] آخر تغيير (لسه منتهي من الخطوة اللي فاتت)، و [[1]] min، و [[90]] max، و [[7]] warn، وفاضي inactive، و [[20818]] تاريخ انتهاء الحساب بالأيام من 1970، وده 2026-12-31.

---

## ٦. [[sudo chage -l ali]]

[[-l]] (list) نفس الأرقام بكلام مقروء. وعشان ali لسه عليه [[passwd -e]]:

~~~text الناتج
Last password change                                    : password must be changed
Password expires                                        : password must be changed
Password inactive                                       : password must be changed
Account expires                                         : Dec 31, 2026
Minimum number of days between password change          : 1
Maximum number of days between password change          : 90
Number of days of warning before password expires       : 7
~~~

وبعد ما رجّعتله باسورد عادي ونفّذت نفس سطر chage:

~~~text الناتج
Last password change                                    : Oct 06, 2026
Password expires                                        : Jan 04, 2027
Password inactive                                       : never
Account expires                                         : Dec 31, 2026
~~~

[[Jan 04, 2027]] = ٦ أكتوبر + ٩٠ يوم. لاحظ الفرق: **الباسورد** بينتهي (يغيّره ويكمّل)، و **الحساب** بينتهي (مفيش دخول خالص).

---

## ٧. [[sudo usermod -e 1 ali]]

[[-e]] هنا (expire date) تاريخ انتهاء الحساب، و [[1]] يعني يوم واحد بعد 1970-01-01. يعني الحساب منتهي من زمان:

~~~text الناتج
Account expires                                         : Jan 02, 1970
Your account has expired; please contact your system administrator.
su: Authentication failure
~~~

السطرين التانيين لما root نفسه عمل [[su - ali]]: انتهاء الحساب بيتشيك مع أي طريقة دخول، حتى مفتاح SSH. وده الفرق عن [[passwd -l]].

---

## ٨. [[sudo usermod -e "" ali]]

تاريخ فاضي يعني «مفيش انتهاء»:

~~~text الناتج: chage -l ali | grep "Account expires"
Account expires                                         : never
~~~

---

## الخلاصة

| عايز | الأمر | بيلمس إيه في shadow |
|---|---|---|
| أشوف الحالة | [[passwd -S]] أو [[chage -l]] | بيقرا بس |
| أقفل الباسورد بس | [[passwd -l]] | [[!]] قدام الـ hash |
| يغيّر الباسورد أول دخول | [[passwd -e]] | آخر تغيير = 0 |
| سياسة كل ٩٠ يوم | [[chage -M 90 -m 1 -W 7]] | الحقول ٤ و ٥ و ٦ |
| أقفل الحساب كله | [[usermod -e 1]] | الحقل ٨ |

والماك مفيهوش [[chage]] ولا [[passwd -l]]: سياسات الباسورد هناك بـ [[pwpolicy]] (من الـ docs، مش متجرّب هنا).`,
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
          teach: R`## الفكرة

كل الأشكال دي بتجاوب على سؤالين: هتبقى مين؟ وهتاخد «بيئة» مين (الفولدر الحالي و [[HOME]] والمتغيرات)؟ عشان نشوف الفرق، اتجربوا كلهم في container أوبونتو 24.04 من نفس المكان: فولدر [[/srv]] وفيه متغير [[MYVAR=hello]] عملناله [[export]]، وفي كل شكل طبعنا:

~~~bash
echo "whoami=$(whoami) pwd=$PWD HOME=$HOME MYVAR=$MYVAR"
~~~

[[whoami]] انت مين دلوقتي، و [[$PWD]] الفولدر الحالي، و [[$HOME]] فولدر الـ home.

---

## ١. [[su - sara]]

[[su]] (switch user) بيطلب **باسورد sara** (مش باسوردك). والشرطة [[-]] معناها login shell: كأن sara لسه داخلة من الأول.

~~~text الناتج
whoami=sara pwd=/home/sara HOME=/home/sara MYVAR=
~~~

راحت فولدرها، و [[MYVAR]] فاضي لأن البيئة اتمسحت وبدأت من جديد من ملفاتها ([[.profile]] وغيره).

### وللمقارنة: [[su sara]] من غير الشرطة

~~~text الناتج
whoami=sara pwd=/srv HOME=/home/sara MYVAR=hello
~~~

بقيت sara، بس فاضل في [[/srv]] ومعاك متغيراتك انت. خليط بين اليوزرين، وده مصدر مشاكل غريبة، فاستخدم الشرطة دايمًا.

---

## ٢. [[whoami; pwd]]

[[;]] بيفصل أمرين في سطر واحد. ده اللي بيأكدلك انت مين وفين بعد السطر الأول: [[sara]] و [[/home/sara]].

## ٣. [[exit]]

بيقفل الشيل بتاع sara ويرجّعك للشيل اللي كنت فيه، بيوزرك انت. (Ctrl+D نفس الحاجة.)

---

## ٤ و ٥. [[sudo -i]]

[[sudo]] بيطلب **باسوردك انت**، ويشيك إنك مسموحلك في [[/etc/sudoers]]. و [[-i]] (login) شيل root كامل، زي [[su -]] بالظبط بس من غير باسورد root:

~~~text الناتج
whoami=root pwd=/root HOME=/root MYVAR=
~~~

وعلى أوبونتو ده الطريق الوحيد لشيل root، لأن root نفسه ملوش باسورد (الخطوة ١٠).

---

## ٦ و ٧. [[sudo -s]]

[[-s]] (shell): شيل root من غير login:

~~~text الناتج
whoami=root pwd=/srv HOME=/root MYVAR=
~~~

فاضل في [[/srv]]، بس [[HOME]] بقى [[/root]] و [[MYVAR]] اتمسح. ليه اتمسح؟ لأن sudo بيمسح معظم المتغيرات دايمًا (إعداد [[env_reset]] في sudoers)، حتى من غير [[-i]].

---

## ٨. [[sudo -u sara whoami]]

[[-u sara]] (user) شغّل الأمر ده بس كـ sara مش root، وارجع على طول:

~~~text الناتج (اتجربت بـ ali)
ali
~~~

ونفس السطر بتاع البيئة: [[whoami=ali pwd=/srv HOME=/home/ali MYVAR=]]. ده اللي بتستخدمه مع يوزرات الخدمات: [[sudo -u postgres psql]].

---

## ٩. [[sudo -l]]

[[-l]] (list): أنا مسموحلي بإيه؟ كـ sara (في جروب sudo):

~~~text الناتج
Matching Defaults entries for sara on server:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin, use_pty

User sara may run the following commands on server:
    (ALL : ALL) ALL
~~~

### نقرا الناتج

- [[env_reset]]: امسح المتغيرات (ده اللي شفناه في [[MYVAR]]).
- [[secure_path=...]]: الـ PATH الثابت اللي sudo بيدوّر فيه على الأوامر. [[~/.local/bin]] مش فيه، فأمر متسطب هناك يقول command not found مع sudo بس.
- [[(ALL : ALL) ALL]]: تقدر تشغّل كأي يوزر ([[ALL]] الأولى) وأي جروب (التانية) أي أمر (التالتة). و [[server]] اسم الجهاز.

ويوزر مش في sudo بياخد [[Sorry, user ali may not run sudo on server.]] (من الحل).

---

## ١٠. [[sudo passwd -S root]]

~~~text الناتج
root L 2026-09-17 0 99999 7 -1
~~~

[[L]] يعني باسورد root مقفول (درس «passwd -l و chage»). فـ [[su -]] على أوبونتو هيرد [[su: Authentication failure]] مهما كتبت.

---

## الخلاصة

| الأمر | هتبقى | باسورد مين | الفولدر | المتغيرات |
|---|---|---|---|---|
| [[su sara]] | sara | sara | زي ما هو | بتوعك |
| [[su - sara]] | sara | sara | home بتاعها | بتوعها |
| [[sudo -i]] | root | انت | [[/root]] | root |
| [[sudo -s]] | root | انت | زي ما هو | متمسحة |
| [[sudo -u sara أمر]] | sara لأمر واحد | انت | زي ما هو | متمسحة |

وعلى الماك نفس الأوامر بالظبط، و root مقفول هناك كمان، بس جروب المديرين اسمه [[admin]] (من الـ docs، مش متجرّب هنا).`,
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
          teach: R`## الفكرة

عايزين يوزر [[deploy]] يقدر يعمل restart لتطبيق اسمه myapp بـ sudo من غير باسورد، ومايقدرش يعمل أي حاجة تانية. ده سطرين في ملف جوه [[/etc/sudoers.d/]]، و [[visudo]] هو اللي بيكتبهم بأمان. اتجرب في container أوبونتو 24.04، ومفيش systemd في الـ container، فعملت [[/usr/bin/systemctl]] وهمي بيطبع الكلام اللي جاله بس، عشان نشوف sudo سمح ولا لأ.

---

## ١. [[sudo visudo -f /etc/sudoers.d/deploy]]

[[visudo]] بيفتح الملف في محرر (nano على أوبونتو)، و [[-f]] (file) الملف ده بدل [[/etc/sudoers]]. ولما تحفظ وتخرج، بيفحصه قبل ما يطبّقه.

### السطرين اللي بتكتبهم

~~~text /etc/sudoers.d/deploy
Cmnd_Alias MYAPP = /usr/bin/systemctl restart myapp, /usr/bin/systemctl status myapp
deploy ALL=(root) NOPASSWD: MYAPP
~~~

السطر الأول: [[Cmnd_Alias]] (command alias) اسم لمجموعة أوامر، الاسم بحروف كابيتال، والأوامر بمسارها الكامل ومفصولة بفاصلة.

السطر التاني القاعدة نفسها:

| الحتة | معناها |
|---|---|
| [[deploy]] | مين (و [[%webteam]] لجروب، الـ [[%]] معناها جروب) |
| [[ALL]] | على أنهي جهاز: أي جهاز |
| [[(root)]] | يشغّل الأوامر كـ root |
| [[NOPASSWD:]] | من غير ما يسأل باسورد. النقطتين جزء منها |
| [[MYAPP]] | الأوامر المسموحة: اللي في الـ alias |

ولأن الأوامر مكتوبة بالـ arguments بتاعتها ([[restart myapp]])، دي بالظبط بس اللي مسموحة؛ [[stop myapp]] مش مسموح.

### لو كتبت غلطة

جربت سطر من غير النقطتين بعد NOPASSWD:

~~~text الناتج
/tmp/bad:1:41: syntax error
deploy ALL=(root) NOPASSWD /usr/bin/true
                                        ^
~~~

[[1:41]] السطر ١ والحرف ٤١، والـ [[^]] تحت مكان الغلطة. و visudo جوه المحرر بيسألك [[What now?]]: [[e]] تصلّح، و [[x]] تخرج من غير حفظ، و [[Q]] تحفظ الغلط (متختارهاش).

---

## ٢. [[sudo visudo -c]]

[[-c]] (check) يفحص كل الملفات من غير ما يفتح محرر:

~~~text الناتج
/etc/sudoers: parsed OK
/etc/sudoers.d/README: parsed OK
/etc/sudoers.d/deploy: parsed OK
~~~

فحص الملف الأساسي، وكل ملف في [[sudoers.d]]. والسبب إن آخر سطر في [[/etc/sudoers]] هو:

~~~text الناتج: grep -v '^#' /etc/sudoers (السطور المهمة)
Defaults	env_reset
Defaults	secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin"
root	ALL=(ALL:ALL) ALL
%admin ALL=(ALL) ALL
%sudo	ALL=(ALL:ALL) ALL
@includedir /etc/sudoers.d
~~~

[[%sudo ALL=(ALL:ALL) ALL]] هي اللي بتدّي جروب sudo كل حاجة، و [[@includedir]] بيقرا كل ملفات الفولدر.

---

## ٣. [[ls -l /etc/sudoers.d/]]

~~~text الناتج
-r--r----- 1 root root 1068 Jan 29  2024 README
-r--r----- 1 root root  119 Oct  6 07:55 deploy
~~~

[[-r--r-----]] = [[0440]]: root والجروب root يقروا بس، ومحدش يكتب. sudo بيرفض أي ملف حد غير root يقدر يكتب فيه، لأن اللي يكتب فيه يقدر يدّي نفسه root.

---

## ٤. [[sudo -l -U deploy]]

[[-l]] (list) و [[-U deploy]] لليوزر ده (محتاج root):

~~~text الناتج
User deploy may run the following commands on server:
    (root) NOPASSWD: /usr/bin/systemctl restart myapp, /usr/bin/systemctl status myapp
~~~

sudo فك الـ alias وعرض الأوامر نفسها. (وفوقها سطور [[Matching Defaults]] زي درس «su - و sudo -i».)

---

## ٥. [[sudo -u deploy sudo -n systemctl restart myapp]]

السطر فيه sudo مرتين:

1. [[sudo -u deploy]]: احنا root، فبنشغّل اللي بعده كـ deploy عشان نجرّب صلاحياته.
2. [[sudo -n systemctl restart myapp]]: ده deploy نفسه بيطلب sudo. و [[-n]] (non-interactive) يعني متسألش باسورد: لو محتاج باسورد افشل على طول، بدل ما تستنى حد يكتب.

~~~text الناتج
fake systemctl: restart myapp
~~~

اتنفّذ كـ root من غير باسورد (ده الـ systemctl الوهمي بيقول وصله إيه).

---

## ٦. [[sudo -u deploy sudo -n whoami]]

~~~text الناتج
sudo: a password is required
~~~

[[whoami]] مش في القاعدة، فـ sudo كان هيسأل باسورد، و [[-n]] خلاه يفشل (exit code 1). ونفس الرد لـ [[systemctl stop myapp]].

---

## الطريقة من غير محرر (الـ solCode)

~~~bash
echo 'deploy ALL=(root) NOPASSWD: /usr/bin/systemctl restart myapp' > /tmp/deploy
sudo visudo -cf /tmp/deploy && sudo install -m 0440 -o root -g root /tmp/deploy /etc/sudoers.d/deploy
~~~

1. [[echo '...' > /tmp/deploy]] اكتب القاعدة في ملف مؤقت.
2. [[visudo -cf /tmp/deploy]] افحصه (check + file). طبع [[/tmp/deploy: parsed OK]].
3. [[&&]] كمّل بس لو الفحص نجح.
4. [[install]] بينسخ الملف ويظبط الصلاحيات في خطوة واحدة: [[-m 0440]] (mode) و [[-o root]] (owner) و [[-g root]] (group).

ده الشكل اللي تحطه في سكربت تجهيز سيرفر.

---

## الخلاصة

| الخطوة | الأمر |
|---|---|
| اكتب القاعدة | [[visudo -f /etc/sudoers.d/اسم]] (اسم من غير نقطة) |
| افحص الكل | [[visudo -c]] |
| الصلاحيات | [[0440]] ملك root |
| اتأكد | [[sudo -l -U اليوزر]] |
| جرّب من غير ما يعلّق | [[sudo -n]] |

وعلى الماك visudo موجود بنفس الـ syntax، والفولدر [[/private/etc/sudoers.d]]، وجروب المديرين [[%admin]] (من الـ docs، مش متجرّب هنا).`,
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
          teach: R`## الفكرة

الصلاحيات العادية ٩ حروف (rwx للصاحب والجروب والباقي). فوقهم ٣ «bits» خاصة، كل واحدة ليها رقم قدام الأرقام التلاتة وحرف بيظهر مكان x:

| الاسم | الرقم | الحرف | بيظهر فين |
|---|---|---|---|
| setuid | 4 | [[s]] | مكان x الصاحب |
| setgid | 2 | [[s]] | مكان x الجروب |
| sticky | 1 | [[t]] | مكان x الباقي |

كل الناتج تحت من container أوبونتو 24.04.

---

## ١. [[ls -l /usr/bin/passwd /usr/bin/sudo]]

~~~text الناتج
-rwsr-xr-x 1 root root  64152 May 30  2024 /usr/bin/passwd
-rwsr-xr-x 1 root root 282032 Sep 21 18:37 /usr/bin/sudo
~~~

[[rws]] في خانة الصاحب: setuid. يعني أي حد يشغّل البرنامج ده، بيشتغل بصلاحيات **صاحبه** (root). عشان كده انت كيوزر عادي تقدر تكتب [[passwd]] وتغيّر باسورك، والأمر يكتب في [[/etc/shadow]] اللي انت أصلًا مش قادر تقراه.

---

## ٢. [[ls -ld /tmp]]

[[-d]] (directory) اعرض الفولدر نفسه مش اللي جواه:

~~~text الناتج
drwxrwxrwt 1 root root 4096 Oct  6 07:55 /tmp
~~~

الكل عنده rwx، بس آخر حرف [[t]]: sticky. معناها: كل واحد يمسح أو يغيّر اسم ملفاته **هو** بس. جربتها: ali عملت [[/tmp/ali.txt]]، و mona حاولت تمسحه:

~~~text الناتج
rm: cannot remove '/tmp/ali.txt': Operation not permitted
~~~

---

## ٣ و ٤. [[sudo chmod 2775 /srv/shared]]

بعد ما عملنا الفولدر بـ [[mkdir -p]]: الـ [[2]] setgid، و [[775]] العادية:

~~~text الناتج: ls -ld /srv/shared
drwxrwsr-x 2 root root 4096 Oct  6 07:56 /srv/shared
~~~

[[s]] في خانة الجروب. على فولدر معناها: أي ملف جديد جواه ياخد جروب الفولدر (درس «groupadd و gpasswd»).

---

## ٥. [[sudo chmod +t /srv/shared]]

[[+t]] زوّد الـ sticky من غير ما تلمس الباقي (الشكل بالحروف بيضيف، مش بيستبدل):

~~~text الناتج
drwxrwsr-t 2 root root 4096 Oct  6 07:56 /srv/shared
~~~

ليه [[t]] صغيرة؟ لأن x بتاعة الباقي موجودة تحتها (775 فيها 5 = r-x). لو مكانتش موجودة كانت هتبقى [[T]] كابيتال.

---

## ٦. [[stat -c '%a %A %n' ...]]

[[stat]] بيعرض معلومات الملف، و [[-c]] (format) بشكل انت تحدده:

| الحتة | معناها |
|---|---|
| [[%a]] | الصلاحيات أرقام (access rights in octal) |
| [[%A]] | الصلاحيات حروف زي ls |
| [[%n]] | الاسم (name) |

~~~text الناتج
3775 drwxrwsr-t /srv/shared
1777 drwxrwxrwt /tmp
4755 -rwsr-xr-x /usr/bin/passwd
~~~

الرقم الأول هو جمع البتات الخاصة: [[3]] = 2 (setgid) + 1 (sticky)، و [[1]] sticky بس، و [[4]] setuid بس.

---

## ٧. [[sudo chmod g-s,-t /srv/shared]]

[[g-s]] شيل s من الجروب، و [[-t]] شيل الـ sticky، والفاصلة بتجمع تعديلين في أمر:

~~~text الناتج: stat -c '%a %A %n' /srv/shared
775 drwxrwxr-x /srv/shared
~~~

### ليه بالحروف مش [[chmod 755]]؟

جربت على فولدر عليه setgid:

~~~text الناتج
after chmod 755:    2755 drwxr-sr-x
after chmod 00755:  755 drwxr-xr-x
~~~

GNU chmod بيحافظ على الـ setgid في الفولدرات لو كتبت ٣ أو ٤ أرقام، عشان متبوّظش فولدر مشترك بالغلط. لازم [[g-s]] أو ٥ أرقام.

---

## ٨. [[sudo find / -xdev -perm -4000 -type f 2>/dev/null]]

| الحتة | معناها |
|---|---|
| [[find /]] | دوّر من أول الديسك |
| [[-xdev]] | متعدّيش لـ filesystem تاني ([[/proc]] و [[/sys]] وديسكات متركّبة) |
| [[-perm -4000]] | الـ setuid موجود، ومعاه أي صلاحيات تانية. الشرطة قبل الرقم هي اللي بتقول «ومعاه أي حاجة» |
| [[-type f]] | ملفات بس |
| [[2>/dev/null]] | ارمي رسايل الـ errors (stream رقم 2) في [[/dev/null]] |

~~~text الناتج
/usr/bin/mount
/usr/bin/chsh
/usr/bin/gpasswd
/usr/bin/passwd
/usr/bin/umount
/usr/bin/newgrp
/usr/bin/su
/usr/bin/chfn
/usr/bin/at
/usr/bin/sudo
~~~

دي البرامج المعروفة اللي محتاجة root عشان تشتغل لليوزر العادي. ([[at]] ظهر لأني كنت مسطّبه في الـ container ده لدرس at.)

---

## ٩. [[sudo find / -xdev -perm -2000 -type f 2>/dev/null]]

نفس الكلام لـ setgid:

~~~text الناتج
/usr/bin/expiry
/usr/bin/chage
/usr/bin/at
/usr/sbin/unix_chkpwd
/usr/sbin/pam_extrausers_chkpwd
~~~

[[chage]] مثلًا جروبه [[shadow]]، فبيقدر يقرا [[/etc/shadow]] (اللي جروبه shadow) من غير root كامل.

---

## الخلاصة

| عايز | اكتب | تشوف |
|---|---|---|
| فولدر فريق | [[chmod 2775]] | [[drwxrwsr-x]] |
| فولدر الكل يرمي فيه | [[chmod 1777]] | [[drwxrwxrwt]] |
| تشيلهم | [[chmod g-s,-t]] (مش [[755]]) | |
| الأرقام | [[stat -c '%a %A %n']] | [[3775]] |
| فحص أمني | [[find / -xdev -perm -4000 -type f]] | |

وعلى الماك نفس الحروف والأرقام، و [[/tmp]] هناك اختصار لـ [[/private/tmp]] وعليه t، و [[stat]] بتاع الماك (BSD) مفيهوش [[-c]]: المكافئ [[stat -f '%Mp%Lp %Sp %N']] ([[M]] رقم البتات الخاصة و [[L]] الرقم العادي) (من الـ man page، مش متجرّب هنا).`,
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
          teach: R`## الفكرة

أي برنامج بيعمل ملف بيطلب صلاحيات كاملة تقريبًا: [[666]] (rw للكل) للملف، و [[777]] للفولدر. والـ umask «قناع» بيشيل من الطلب ده قبل ما الملف يتعمل. كل الناتج تحت كيوزر عادي (ali) جوه [[~/lab]] في container أوبونتو 24.04.

---

## ١. [[umask]]

من غير حاجة بيطبع القيمة الحالية:

~~~text الناتج (كـ ali)
0002
~~~

٤ أرقام: الأول للبتات الخاصة (setuid وغيره) وغالبًا صفر، والتلاتة الباقيين للصاحب والجروب والباقي. وكل رقم معناه «شيل الصلاحيات دي»:

| الرقم | بيشيل |
|---|---|
| [[0]] | ولا حاجة |
| [[2]] | w (الكتابة) |
| [[7]] | rwx كلها |

فـ [[0002]]: شيل الكتابة من «الباقي» بس. و root على نفس الجهاز طلعله [[0022]]. ليه الفرق؟ أوبونتو بيدّي اليوزر العادي 002 لأن جروبه الأساسي باسمه ومفيش حد تاني فيه ([[USERGROUPS_ENAB yes]] في [[/etc/login.defs]]).

---

## ٢. [[umask -S]]

[[-S]] (symbolic) بيطبع العكس: اللي **فاضل** مش اللي بيتشال:

~~~text الناتج
u=rwx,g=rwx,o=rx
~~~

[[u]] الصاحب، و [[g]] الجروب، و [[o]] الباقي (others). الباقي ناقصه w، زي ما قلنا.

---

## ٣. [[umask 027]]

من هنا ورايح في الشيل ده: [[0]] متشيلش حاجة من الصاحب، و [[2]] شيل الكتابة من الجروب، و [[7]] شيل كله من الباقي. مبيطبعش حاجة.

## ٤. [[touch secret.txt && mkdir private]]

[[touch]] يعمل ملف فاضي، و [[&&]] كمّل لو نجح، و [[mkdir]] فولدر.

## ٥. [[ls -ld secret.txt private]]

~~~text الناتج
drwxr-x--- 2 ali ali 4096 Oct  6 07:56 private
-rw-r----- 1 ali ali    0 Oct  6 07:56 secret.txt
~~~

### الحسبة

| | الطلب | ناقص 027 | النتيجة |
|---|---|---|---|
| الملف | [[rw-rw-rw-]] (666) | الجروب يفقد w، والباقي يفقد كله | [[rw-r-----]] (640) |
| الفولدر | [[rwxrwxrwx]] (777) | نفس الكلام | [[rwxr-x---]] (750) |

الملف مفيهوش x أصلًا لأن البرنامج مطلبهاش، والـ umask عمره ما بيضيف صلاحية.

---

## ٦ و ٧. [[umask 077]] ثم [[touch key.txt && ls -l key.txt]]

[[077]] شيل كل حاجة من الجروب والباقي:

~~~text الناتج
-rw------- 1 ali ali 0 Oct  6 07:56 key.txt
~~~

انت بس تقرا وتكتب: ده اللي تحتاجه لمفتاح أو ملف [[.env]].

---

## ٨. [[umask 022]]

رجّعها للقيمة الشائعة: ملفات [[644]] وفولدرات [[755]]. والـ umask متغيّر في الشيل ده بس، فلو قفلت الترمنال كانت هترجع لوحدها.

### «طرح» ده تبسيط

جربت [[umask 033]] (شيل w و x من الجروب والباقي). لو طرح كان الملف هيطلع 633:

~~~text الناتج
drwxr--r-- 2 ali ali 4096 Oct  6 07:56 d033
-rw-r--r-- 1 ali ali    0 Oct  6 07:56 f033
~~~

الملف [[644]] والفولدر [[744]]. الـ umask بيشيل **bits**: لو الـ bit مش موجود في الطلب (x في الملف) مفيش حاجة تتشال.

### ليه umask مش برنامج؟

~~~text الناتج: type umask
umask is a shell builtin
~~~

builtin يعني جوه bash نفسه. لازم يبقى كده، لأن برنامج منفصل هيغيّر الـ umask بتاعه هو ويخلص، والشيل بتاعك هيفضل زي ما هو.

---

## ٩. [[echo 'umask 027' >> ~/.bashrc]]

[[>>]] يضيف السطر في آخر [[~/.bashrc]] من غير ما يمسح اللي فيه (بـ [[>]] كان هيمسح الملف كله). و [[.bashrc]] بيتقري مع كل ترمنال تفاعلي جديد، فالقيمة تتثبت ليك:

~~~text الناتج: tail -1 ~/.bashrc
umask 027
~~~

بس الخدمات (systemd) مبتقراش [[.bashrc]]، ليها [[UMask=]] في ملف الخدمة.

---

## الخلاصة

| umask | ملف | فولدر | امتى |
|---|---|---|---|
| [[022]] | 644 | 755 | الافتراضي لـ root |
| [[002]] | 664 | 775 | يوزر أوبونتو العادي، وفولدرات الفريق |
| [[027]] | 640 | 750 | سيرفرات |
| [[077]] | 600 | 700 | أسرار ومفاتيح |

وعلى الماك نفس الأمر والافتراضي [[0022]]، وهناك [[launchctl config user umask]] لو عايزها لكل البرامج مش الترمنال بس (من الـ docs، مش متجرّب هنا).`,
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
          teach: R`## الفكرة

الفولدر [[/srv/reports]] ملك mona وصلاحياته [[750]]، يعني ali (مش صاحبه ولا في جروبه) ممنوع:

~~~text الناتج: ls -ld /srv/reports ثم ls كـ ali
drwxr-x--- 2 mona mona 4096 Oct  6 07:56 /srv/reports
ls: cannot open directory '/srv/reports': Permission denied
~~~

عايزين ali بالذات يكتب فيه، من غير ما نغيّر الصاحب ولا الجروب. ده شغل الـ ACL (Access Control List): لستة قواعد إضافية متعلّقة في الملف. كله اتجرب في container أوبونتو 24.04.

---

## ١. [[sudo apt install acl]]

الأوامر نفسها ([[setfacl]] و [[getfacl]]) في باكدج اسمه [[acl]]، مش موجود في صورة Docker ولا أوبونتو minimal.

---

## ٢. [[sudo setfacl -m u:ali:rwx /srv/reports]]

| الحتة | معناها |
|---|---|
| [[setfacl]] | set file ACL |
| [[-m]] | modify: ضيف قاعدة أو عدّلها |
| [[u:ali:rwx]] | ٣ حتت بينهم [[:]]: النوع ([[u]] user، و [[g]] group)، والاسم، والصلاحيات |

مبيطبعش حاجة. ودلوقتي ali بيقدر يعمل [[ls]] ويكتب.

## ٣. [[sudo setfacl -m u:ali:rw /srv/reports/q3.txt]]

نفس الفكرة على ملف جوه: ali يقرا ويكتب [[q3.txt]]. جربت [[echo more >> q3.txt]] كـ ali ونجح.

---

## ٤. [[ls -ld /srv/reports]]

~~~text الناتج
drwxrwx---+ 2 mona mona 4096 Oct  6 07:56 /srv/reports
~~~

حاجتين:

- [[+]] في الآخر: الفولدر ده عليه ACL. لو شفتها، [[ls -l]] مش بيقولك الحكاية كلها.
- خانة الجروب بقت [[rwx]] مع إن جروب mona لسه [[r-x]]. ليه؟ لما يبقى فيه ACL، الخانة دي بتعرض الـ **mask** مش الجروب. (الخطوة الجاية.)

---

## ٥. [[getfacl /srv/reports]]

~~~text الناتج
getfacl: Removing leading '/' from absolute path names
# file: srv/reports
# owner: mona
# group: mona
user::rwx
user:ali:rwx
group::r-x
mask::rwx
other::---
~~~

| السطر | معناه |
|---|---|
| السطر الأول | ملاحظة بس: بيكتب المسار من غير [[/]] عشان الناتج ينفع يترجّع في مكان تاني |
| [[# ...]] | تعليقات: الملف وصاحبه وجروبه ([[-c]] بيشيلهم) |
| [[user::rwx]] | صاحب الملف (الاسم فاضي = الصاحب) |
| [[user:ali:rwx]] | القاعدة اللي ضفناها |
| [[group::r-x]] | جروب الملف |
| [[mask::rwx]] | أقصى صلاحية لأي قاعدة غير الصاحب و other |
| [[other::---]] | الباقي |

---

## ٦. [[sudo setfacl -d -m u:ali:rwx /srv/reports]]

القاعدة اللي فاتت على الفولدر نفسه، مش على الملفات اللي **هتتعمل** جواه بعدين. جربت: mona عملت [[before.txt]] قبل السطر ده، و [[after.txt]] بعده (والاتنين بـ umask 027):

~~~text الناتج: ls -l /srv/reports
-rw-rw----+ 1 mona mona  0 Oct  6 07:56 after.txt
-rw-r-----  1 mona mona  0 Oct  6 07:56 before.txt
~~~

[[-d]] (default) عمل «وصفة» بتتنسخ لأي حاجة جديدة. و [[getfacl -c after.txt]]:

~~~text الناتج
user::rw-
user:ali:rwx	#effective:rw-
group::r-x	#effective:r--
mask::rw-
other::---
~~~

[[#effective:rw-]]: القاعدة بتقول rwx، بس الـ mask [[rw-]] فالفعلي rw. الـ mask اتحسب من الصلاحيات اللي البرنامج طلبها للملف (من غير x). ولاحظ إن الـ umask 027 اتجاهل: الملف طلع [[rw-rw----]] مش [[rw-r-----]]، لأن الـ default ACL بيحل محل الـ umask.

---

## ٧. [[sudo setfacl -R -m g:webteam:rX /srv/reports]]

- [[-R]] (recursive) على الفولدر وكل اللي جواه دلوقتي.
- [[g:webteam]] قاعدة لجروب.
- [[X]] كابيتال: x للفولدرات بس (عشان يدخلوها)، ومش للملفات العادية.

~~~text الناتج: getfacl -c /srv/reports/q3.txt
user::rw-
user:ali:rw-
group::r--
group:webteam:r--
mask::rw-
other::---
~~~

الملف خد [[r--]] من غير x، زي ما الـ [[X]] وعدت.

---

## ٨. [[sudo setfacl -x u:ali /srv/reports/q3.txt]]

[[-x]] شيل قاعدة واحدة (من غير صلاحيات، الاسم بس كفاية):

~~~text الناتج: getfacl -c /srv/reports/q3.txt
user::rw-
group::r--
group:webteam:r--
mask::r--
other::---
~~~

سطر ali راح، والـ mask اتحسب تاني من اللي فاضل.

### الفخ: [[chmod]] على ملف عليه ACL

قبل الخطوة الجاية جربت [[chmod 750 /srv/reports]]:

~~~text الناتج: getfacl -c /srv/reports
user::rwx
user:ali:rwx	#effective:r-x
group::r-x
group:webteam:r-x
mask::r-x
other::---
~~~

الـ 5 بتاعة الجروب راحت على الـ mask، فـ ali فقد الكتابة من غير أي رسالة.

---

## ٩. [[sudo setfacl -b /srv/reports]]

[[-b]] (remove all) شيل كل الـ ACL، بما فيها الـ default:

~~~text الناتج
drwxr-x--- 2 mona mona 4096 Oct  6 07:56 /srv/reports
~~~

الـ [[+]] اختفت ورجعنا للـ rwx العادية.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| يوزر ياخد صلاحية | [[setfacl -m u:اسم:rwX مسار]] |
| وعلى الحاجات الجديدة كمان | [[setfacl -d -m u:اسم:rwX مسار]] |
| جروب على فولدر كامل | [[setfacl -R -m g:اسم:rX مسار]] |
| أشوف القواعد | [[getfacl مسار]] (وبص على [[#effective]]) |
| أشيل قاعدة / كله | [[setfacl -x u:اسم]] / [[setfacl -b]] |

وعلى الماك مفيش setfacl: الـ ACL هناك بـ [[chmod +a "ali allow read,write" dir]] وبتتعرض بـ [[ls -le]] (من الـ man page بتاعة chmod على الماك، مش متجرّب هنا).`,
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
          teach: R`## الفكرة

[[chattr]] بيحط على الملف «علامة» متخزنة في الـ filesystem نفسه، والـ kernel بيشيكها قبل ما يسأل انت مين. فحتى root بيترفض لحد ما العلامة تتشال. اتجرب في container أوبونتو 24.04 بـ [[--privileged]] على ديسك ext4 صغير متركّب من ملف، لأن Docker من غير الصلاحية دي بيرفض chattr حتى لـ root.

---

## ١. [[echo "DB_PASS=secret" > .env]]

ملف تجربة. و [[lsattr .env]] عليه دلوقتي:

~~~text الناتج
--------------e------- .env
~~~

كل خانة حرف لعلامة، والشرطة يعني مش موجودة. الـ [[e]] (extents) طريقة ext4 العادية في تخزين أي ملف، موجودة على كله تقريبًا ومالهاش دعوة بالحماية.

---

## ٢ و ٣. [[sudo chattr +i .env]] ثم [[lsattr .env]]

[[chattr]] (change attributes)، و [[+]] ضيف، و [[i]] (immutable = ميتغيرش):

~~~text الناتج
----i---------e------- .env
~~~

الـ [[i]] ظهرت في خانتها.

---

## ٤. [[sudo rm -f .env]]

[[-f]] (force) معناها «متسألش ومتشتكيش لو مش موجود»، بس مش بتعدّي الـ immutable:

~~~text الناتج
rm: cannot remove '.env': Operation not permitted
~~~

ولاحظ الرسالة: [[Operation not permitted]] مش [[Permission denied]]. الأولى معناها «العملية دي ممنوعة على الملف ده لأي حد»، والتانية «انت معندكش صلاحية». الفرق ده أول علامة إن السبب chattr.

## ٥. [[echo "x" >> .env]]

~~~text الناتج
bash: line 8: .env: Operation not permitted
~~~

حتى الإضافة في الآخر. وجربت كمان، وكلهم اترفضوا بنفس الكلمتين:

~~~text الناتج
mv: cannot move '.env' to 'x': Operation not permitted
chmod: changing permissions of '.env': Operation not permitted
touch: cannot touch '.env': Operation not permitted
~~~

---

## ٦. [[sudo chattr -i .env]]

[[-]] شيل العلامة. [[lsattr]] رجع [[--------------e-------]]، وأي حاجة بقت مسموحة تاني.

---

## ٧ و ٨. [[sudo touch /var/log/myapp.log]] ثم [[sudo chattr +a ...]]

[[a]] (append only): الإضافة في الآخر بس:

~~~text الناتج: lsattr
-----a--------e------- logs/myapp.log
~~~

(في التجربة كان الملف في فولدر [[logs]] على ديسك الـ ext4، نفس الفكرة.)

---

## ٩. [[echo "started" | sudo tee -a /var/log/myapp.log]]

ليه [[tee]] ومش [[sudo echo "started" >> ملف]]؟ لأن [[>>]] بيعمله **الشيل بتاعك** قبل sudo، فالكتابة بتحصل بصلاحياتك انت. [[tee]] برنامج بيكتب في الملف بنفسه، فـ [[sudo tee]] بيكتب كـ root. و [[-a]] (append) يضيف بدل ما يكتب فوقه:

~~~text الناتج
started
~~~

[[tee]] بيطبع اللي وصله على الشاشة دايمًا، وكمان كتبه في الملف: نجح.

## ١٠. [[echo "wipe" | sudo tee /var/log/myapp.log]]

من غير [[-a]]، tee بيفتح الملف عشان يكتب فوقه:

~~~text الناتج
wipe
tee: logs/myapp.log: Operation not permitted
~~~

[[wipe]] طلعت على الشاشة بس، والملف فضل فيه [[started]] بس. و [[rm]] كمان اترفض. ده بالظبط اللي عايزه في لوج: محدش يمسح اللي اتكتب.

---

## ١١. [[sudo chattr -a /var/log/myapp.log]]

شيل العلامة في الآخر، وإلا أي حاجة بتلف اللوجات (logrotate) هتفشل عليه.

---

## الخلاصة

| عايز | اكتب | الحرف في lsattr |
|---|---|---|
| ملف ميتغيرش ولا يتمسح | [[chattr +i]] | [[i]] |
| لوج يتزوّد بس | [[chattr +a]] | [[a]] |
| تشيل | [[chattr -i]] / [[chattr -a]] | |
| تشوف | [[lsattr ملف]] (و [[-d]] للفولدر نفسه) | |

ولو root بياخد [[Operation not permitted]] على ملف عادي، [[lsattr]] أول حاجة.

وعلى الماك مفيش chattr: البديل [[chflags uchg]] و [[sudo chflags schg]]، وبتتعرض بـ [[ls -lO]] (من الـ man page بتاعة chflags، مش متجرّب هنا).`,
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
    }
]);
