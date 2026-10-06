// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   teach    اختياري: «الشرح خطوة بخطوة»: markdown صغير (## و ### و ~~~lang عنوان ... ~~~ و جداول | و - و 1. و > و ---). القواعد في README
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
//   check    اختياري: تمرين بيتصحح لوحده في الصفحة
//            JS:  { lang: "js", starter, tests: R`test("..", () => expect(x).toBe(y))`, solution }
//            SQL: { lang: "sql", setup: R`CREATE TABLE ...; INSERT ...`, starter, expect: [[...صفوف]] أو expectSql: R`استعلام مرجعي`, solution, ordered }
//            solution حل مرجعي مش بيظهر، و npm run check بيتأكد إنه بيعدّي الاختبارات. المتاح في tests: test و expect(x).toBe/toEqual/toThrow/toBeTruthy/toBeFalsy
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("vps", {
  label: "VPS",
  prompt: "deploy@vps:~$ ",
  lab: R`multipass launch 24.04 --name lab
multipass shell lab`,
  labText: "متتعلمش على سيرفر عليه مواقع شغالة. اعمل VPS تجربة رخيص، أو ماكينة أوبونتو كاملة على جهازك بـ multipass (من multipass.run) تقدر تبوّظها وتمسحها وتبدأ من جديد.",
  levels: {
    "1": ["البداية", "تدخل السيرفر، وتعرف مواصفاته، وتسطّب وتحدّث عليه"],
    "2": ["المتوسط", "تأمّنه، وتنشر عليه موقع بدومين و HTTPS"],
    "3": ["المتقدم", "أتمتة وباك أب وصيانة، والاستضافة المشتركة، وفي الآخر التحدي الكبير"]
  },
  categories: [
    {
      t: "اتعرّف على السيرفر",
      l: 1,
      n: "أول حاجة بعد ما تدخل: السيرفر ده إيه وحالته إيه",
      items: [
        {
          cmd: "ssh / exit",
          title: "ادخل واخرج",
          desc: "أول دخول غالبًا بـ root، بالباسورد أو المفتاح اللي اخترته وانت بتعمل السيرفر. [[exit]] أو Ctrl+D يخرجك. لو الاتصال علّق خالص: اضغط Enter وبعدين [[~.]] يقفله.",
          example: R`ssh root@203.0.113.10
exit`,
          try: "ادخل سيرفر التجربة واخرج، وبعدين ادخل بـ alias من [[~/.ssh/config]] (موجود في تاب bash).",
          deep: {
            why: "السيرفر مفيهوش شاشة، فالطريقة الوحيدة تشتغل عليه إنك تفتح ترمنال عليه من جهازك.",
            how: R`[[ssh root@IP]] بيفتح اتصال مشفّر، ولما يدخل، الترمنال اللي قدامك بيبقى ترمنال السيرفر. هتعرف من الـ prompt: اسم الجهاز بقى اسم السيرفر. وأي أمر تكتبه بعد كده بيتنفذ هناك مش عندك.

والنقطة دي بتلخبط ناس كتير في الأول: الملفات اللي عندك على جهازك مش موجودة على السيرفر، والعكس. لو كتبت [[ls]] وانت جوه السيرفر، هتشوف ملفات السيرفر.

[[exit]] بيقفل الاتصال ويرجّعك لجهازك. ولو الاتصال علّق (النت قطع مثلًا)، الترمنال ممكن يفضل متجمّد. دوس Enter، وبعدين [[~]] وبعدين [[.]]، ودي حركة خاصة بـ ssh بتقفل الاتصال المعلّق.

وأول مرة تدخل أي سيرفر، هيسألك «Are you sure you want to continue connecting?» ويوريك بصمة السيرفر. اكتب yes، وده بيحصل مرة واحدة بس.`,
            when: "كل مرة تشتغل على السيرفر.",
            mistakes: "تنسى انت فين، وتنفّذ على جهازك حاجة كانت للسيرفر أو العكس. بص على الـ prompt قبل أي أمر مهم."
          },
          teach: R`## الفكرة: ترمنال السيرفر جوه ترمنالك

الـ VPS كمبيوتر في داتا سنتر مفيهوش شاشة ولا كيبورد. [[ssh]] بيفتحلك ترمنال عليه من جهازك، وكل اللي هتكتبه بعدها بيتنفذ هناك. و [[exit]] بيقفل الترمنال ده ويرجّعك لجهازك.

الأمثلة هنا متجرّبة على محاكاة: كونتينر [[ubuntu:24.04]] شغال كسيرفر اسمه [[my-server]] على IP [[203.0.113.10]]، وكونتينر تاني شغال كلابتوب اسمه [[laptop]] واليوزر فيه [[ali]]، والدخول بمفتاح تجربة. على VPS حقيقي هتحط الـ IP اللي شركة الاستضافة اديتهولك.

---

## ١. [[ssh root@203.0.113.10]]

### نفك الأمر

| الحتة | معناها |
|---|---|
| [[ssh]] | اختصار Secure Shell: ترمنال على جهاز تاني، والاتصال كله مشفّر |
| [[root]] | اسم اليوزر اللي هتدخل بيه على السيرفر. root هو المدير اللي ليه كل الصلاحيات |
| [[@]] | فاصل بين اليوزر والجهاز، اقراها «عند» |
| [[203.0.113.10]] | عنوان السيرفر (IP). ممكن تكتب دومين بداله |

يعني الأمر بيقول: «دخّلني كـ root على الجهاز اللي عنوانه 203.0.113.10». ولو مكتبتش يوزر خالص، ssh بيستخدم اسم يوزرك على جهازك (هنا [[ali]])، وده غالبًا مش موجود على السيرفر.

### أول مرة: سؤال البصمة

~~~bash
ssh root@203.0.113.10
~~~

~~~text الناتج أول مرة
The authenticity of host '203.0.113.10 (203.0.113.10)' can't be established.
ED25519 key fingerprint is SHA256:ZB+7YzWjapvx2azp9rzx7W7R3XbdqYMRaSnlTuku3bE.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '203.0.113.10' (ED25519) to the list of known hosts.
~~~

كل سيرفر ليه مفتاح خاص بيه (host key)، و [[fingerprint]] بصمة مختصرة منه. ssh مش عارف السيرفر ده قبل كده، فبيسألك: «متأكد إن ده السيرفر اللي انت عايزه؟». بتكتب [[yes]] (كلمة كاملة، مش [[y]])، فـ ssh بيحفظ البصمة في ملف [[~/.ssh/known_hosts]] على جهازك. المرة الجاية مش هيسأل، ولو البصمة اتغيرت فجأة هيرفض ويحذرك، وده بيحميك من حد بينتحل شخصية السيرفر.

[[ED25519]] نوع المفتاح، و [[SHA256]] طريقة حساب البصمة. مش محتاج تحفظهم.

### بعد الدخول

~~~text الناتج
Welcome to Ubuntu 24.04.5 LTS (GNU/Linux 6.6.87.2-microsoft-standard-WSL2 x86_64)

 * Documentation:  https://help.ubuntu.com
...
root@my-server:~#
~~~

الرسالة دي اسمها MOTD (Message Of The Day)، بيطبعها السيرفر مع كل دخول. والمهم السطر الأخير، الـ prompt:

| الحتة | معناها |
|---|---|
| [[root]] | انت داخل بيوزر إيه |
| [[my-server]] | اسم الجهاز: ده السيرفر مش جهازك |
| [[~]] | انت في الـ home بتاع اليوزر ([[/root]] لـ root) |
| [[#]] | علامة root. اليوزر العادي بيشوف [[$]] |

جرّب [[hostname]] وانت جوه:

~~~text الناتج
root@my-server:~# hostname
my-server
~~~

---

## ٢. [[exit]]

~~~text الناتج
root@my-server:~# exit
logout
Connection to 203.0.113.10 closed.
~~~

[[logout]] يعني الشيل على السيرفر قفل، و [[Connection ... closed]] رسالة ssh على جهازك إن الاتصال خلص. والـ prompt رجع [[ali@laptop]]. و Ctrl+D بيعمل نفس الحاجة: معناه «خلص الكلام» (end of input)، والشيل بيقفل لما يلاقيه في سطر فاضي.

---

## ٣. لو الاتصال علّق: Enter ثم [[~.]]

لو النت قطع، الترمنال بيفضل واقف ومش بيرد على أي حاجة، ولا حتى Ctrl+C (لأنها بتتبعت للسيرفر اللي مش واصل). ssh بيراقب حرف [[~]] لو جه **أول السطر**، ويعتبره أمر ليه هو مش للسيرفر. و [[~.]] معناها «اقفل الاتصال ده دلوقتي». عشان كده Enter الأول: عشان [[~]] تبقى أول السطر.

جرّبتها في المحاكاة:

~~~text الناتج
root@my-server:~# Connection to 203.0.113.10 closed.
~~~

---

## ٤. الأغلاط اللي هتقابلك (متجرّبة من الكونتينر)

| الرسالة | السبب |
|---|---|
| [[Permission denied (publickey,password).]] | اليوزر أو المفتاح غلط. هنا جربت أدخل بيوزر [[ali]] اللي مش موجود على السيرفر |
| [[Connection timed out]] | مفيش رد خالص: IP غلط، أو بورت 22 مقفول في firewall المزود |
| [[No route to host]] | الجهاز ده مش موجود على الشبكة |
| [[REMOTE HOST IDENTIFICATION HAS CHANGED]] | البصمة اتغيرت (غالبًا عملت reinstall للسيرفر). [[ssh-keygen -R IP]] يمسح القديمة |

---

## الخلاصة

~~~text
ssh user@IP     افتح ترمنال على السيرفر كـ user
yes             مرة واحدة أول دخول: احفظ بصمة السيرفر
prompt          اسم الجهاز فيه بيقولك انت فين: laptop ولا my-server
exit / Ctrl+D   اقفل وارجع لجهازك
Enter ثم ~.     اقفل اتصال معلّق
~~~`,
          lines: ["ادخل السيرفر كـ root.", "اخرج وارجع لجهازك."],
          sol: R`أول دخول بيسألك [[The authenticity of host '203.0.113.10' can't be established]] ومعاه fingerprint، اكتب [[yes]]، وبعدها الـ prompt بيتغير لحاجة زي [[root@my-server:~#]]. و [[exit]] بيطبع [[logout]] و [[Connection to 203.0.113.10 closed.]] وترجع لـ prompt جهازك.

وبالـ alias ([[ssh myserver]] مثلًا) المفروض تدخل نفس السيرفر من غير ما تكتب IP ولا يوزر، لأن [[~/.ssh/config]] فيه [[HostName]] و [[User]] و [[IdentityFile]].

الأغلاط الشائعة: [[Permission denied (publickey)]]: المفتاح مش متضاف للسيرفر أو [[IdentityFile]] غلط. و [[Connection timed out]]: IP غلط أو بورت 22 مقفول في firewall المزود. و [[REMOTE HOST IDENTIFICATION HAS CHANGED]] بعد ما تعيد تسطيب السيرفر: امسح السطر القديم بـ [[ssh-keygen -R 203.0.113.10]].`
        },
        {
          cmd: "hostnamectl",
          title: "السيرفر ده إيه",
          desc: "نسخة النظام والكيرنل واسم السيرفر. [[nproc]] عدد الأنوية، و [[uptime]] من إمتى شغال ومتوسط الحمل (load average). لو الحمل أكبر من عدد الأنوية باستمرار يبقى السيرفر مضغوط.",
          example: R`hostnamectl
lsb_release -a
nproc
free -h
df -h
uptime`,
          try: "اكتب ملخص لسيرفرك: النظام، عدد الأنوية، الرام، المساحة الفاضية.",
          deep: {
            why: "أول ما تستلم سيرفر جديد، أو قبل ما تشخّص مشكلة، محتاج تعرف انت بتتعامل مع إيه: نظام إيه، ومعالج قد إيه، ورام كام، ومساحة كام.",
            how: R`كل أمر من دول بيقرا معلومة من النظام:

[[hostnamectl]] اسم السيرفر ونوع النظام ونسخة الكيرنل. و [[lsb_release -a]] نسخة أوبونتو بالظبط، وده مهم لأن الأوامر والباكدجات بتختلف بين النسخ (زي 22.04 و 24.04). والنسخ اللي فيها LTS هي اللي عليها دعم طويل (٥ سنين)، وهي اللي تستخدمها على السيرفرات.

[[nproc]] عدد أنوية المعالج، و [[free -h]] الرام، و [[df -h]] الديسك.

و [[uptime]] من إمتى السيرفر شغال، ومتوسط الضغط (شرحناه في htop). لو الـ uptime قليل وانت معملتش ريستارت، يبقى السيرفر عمل ريستارت لوحده، وده يستاهل تعرف ليه.`,
            when: "أول ما تستلم أي سيرفر. قبل ما تقرر السيرفر محتاج ترقية ولا لأ. ولما تسأل حد مساعدة، هيسألك على المعلومات دي أول حاجة.",
            mistakes: "إنك تتبع شرح أونلاين مكتوب لنسخة أوبونتو تانية، والأوامر متشتغلش. اعرف نسختك الأول."
          },
          teach: R`## ٦ أسئلة للسيرفر

كل أمر في المثال سؤال واحد: انت مين؟ نسختك إيه؟ عندك كام نواة؟ كام رام؟ كام ديسك؟ وشغال بقالك قد إيه؟ مفيش أمر منهم بيغيّر حاجة، فجرّبهم براحتك.

الناتج هنا من كونتينر [[ubuntu:24.04]] شغال فيه systemd كأنه سيرفر اسمه [[my-server]]، على Docker Desktop. فشوية أرقام (زي الـ 16 نواة والديسك الضخم) بتاعة الجهاز اللي تحته. على VPS صغير هتلاقي أرقام أصغر بكتير.

---

## ١. [[hostnamectl]]

[[hostname]] اسم الجهاز، و [[ctl]] اختصار control. فهو أداة بتعرض وبتغيّر اسم الجهاز، وبتطبع معاه معلومات النظام:

~~~text الناتج
 Static hostname: my-server
       Icon name: computer-container
         Chassis: container
      Machine ID: 1917d95aedfe406caced7a6c18f700dd
         Boot ID: 68477dee593648be868a85f1442c68fc
  Virtualization: wsl
Operating System: Ubuntu 24.04.5 LTS
          Kernel: Linux 6.6.87.2-microsoft-standard-WSL2
    Architecture: x86-64
~~~

| السطر | معناه |
|---|---|
| [[Static hostname]] | اسم السيرفر، وده اللي بيظهر في الـ prompt |
| [[Chassis]] | نوع الجهاز. هنا [[container]]، وعلى VPS غالبًا [[vm]] |
| [[Virtualization]] | السيرفر شغال جوه إيه. على VPS هتلاقي حاجة زي [[kvm]] |
| [[Operating System]] | النظام ونسخته |
| [[Kernel]] | الكيرنل: قلب لينكس اللي بيكلّم الهاردوير |
| [[Architecture]] | نوع المعالج: [[x86-64]] (Intel/AMD) أو [[arm64]] |

> [[hostnamectl]] جزء من systemd. في كونتينر أوبونتو عادي (من غير systemd) هيقولك [[hostnamectl: command not found]]، وفي WSL ممكن يقول [[System has not been booted with systemd]]. ساعتها [[cat /etc/os-release]] بيجيب النسخة.

---

## ٢. [[lsb_release -a]]

LSB اختصار Linux Standard Base، و [[release]] يعني النسخة. و [[-a]] من all: اطبع كل المعلومات:

~~~text الناتج
Distributor ID:	Ubuntu
Description:	Ubuntu 24.04.5 LTS
Release:	24.04
Codename:	noble
~~~

- [[24.04]]: السنة والشهر اللي النسخة نزلت فيهم (أبريل ٢٠٢٤). و [[.5]] رقم التحديث المجمّع الخامس.
- [[LTS]]: Long Term Support، يعني دعم ٥ سنين. استخدم النسخ دي بس على السيرفرات.
- [[noble]]: اسم الشهرة بتاع النسخة. هتشوفه في روابط المستودعات زي [[noble-updates]].

---

## ٣. [[nproc]]

اختصار number of processing units: كام نواة يقدر البرنامج يستخدمها.

~~~text الناتج
16
~~~

على VPS رخيص هتلاقي [[1]] أو [[2]]. والرقم ده مهم عشان تقرا [[uptime]] تحت.

---

## ٤. [[free -h]]

[[free]] الرام، و [[-h]] من human: بالجيجا والميجا بدل البايت:

~~~text الناتج
               total        used        free      shared  buff/cache   available
Mem:            15Gi       1.1Gi        12Gi        53Mi       2.5Gi        14Gi
Swap:          4.0Gi          0B       4.0Gi
~~~

| العمود | معناه |
|---|---|
| [[total]] | الرام كلها |
| [[used]] | اللي البرامج واخداه |
| [[free]] | فاضي خالص ومحدش بيستخدمه |
| [[buff/cache]] | لينكس مستخدمه cache للملفات، وبيرجّعه أول ما برنامج يحتاج |
| [[available]] | **ده الرقم المهم**: قد إيه متاح لبرنامج جديد فعلًا |

و [[Swap]] مساحة على الديسك النظام بيستلفها لما الرام تخلص. لو لقيت [[used]] في Swap كبير، السيرفر محتاج رام أكتر.

---

## ٥. [[df -h]]

[[df]] اختصار disk free، و [[-h]] نفس المعنى:

~~~text الناتج
Filesystem      Size  Used Avail Use% Mounted on
overlay        1007G   16G  941G   2% /
tmpfs            64M     0   64M   0% /dev
...
~~~

السطر اللي يهمك هو اللي تحت [[Mounted on]] فيه [[/]]: ده الديسك اللي عليه النظام. [[Avail]] الفاضي، و [[Use%]] نسبة الامتلاء. هنا اسمه [[overlay]] لأنه كونتينر؛ على VPS هتلاقي حاجة زي [[/dev/vda1]] أو [[/dev/sda1]]. وسطور [[tmpfs]] مساحات في الرام مش على الديسك، سيبها.

---

## ٦. [[uptime]]

~~~text الناتج
 11:38:35 up  5:02,  0 user,  load average: 0.58, 0.60, 0.30
~~~

| الحتة | معناها |
|---|---|
| [[11:38:35]] | الساعة دلوقتي على السيرفر |
| [[up 5:02]] | شغال من ٥ ساعات ودقيقتين من غير ريستارت |
| [[0 user]] | عدد اللي داخلين بترمنال دلوقتي |
| [[load average: 0.58, 0.60, 0.30]] | متوسط الضغط في آخر دقيقة، وآخر ٥ دقايق، وآخر ١٥ دقيقة |

الـ load تقريبًا «كام عملية عايزة المعالج في نفس اللحظة». قارنه بـ [[nproc]]: لو عندك نواتين والـ load بقاله ١٥ دقيقة فوق ٢، يبقى السيرفر مضغوط.

---

## الخلاصة

| السؤال | الأمر | بص على |
|---|---|---|
| السيرفر ده إيه؟ | [[hostnamectl]] | [[Operating System]] و [[Kernel]] |
| النسخة بالظبط؟ | [[lsb_release -a]] | [[Release]] |
| كام نواة؟ | [[nproc]] | الرقم |
| كام رام؟ | [[free -h]] | [[total]] و [[available]] |
| كام ديسك فاضي؟ | [[df -h]] | [[Avail]] في سطر [[/]] |
| مضغوط؟ | [[uptime]] | الـ load مقارنة بـ [[nproc]] |`,
          lines: [
            "اسم السيرفر ونوع النظام.",
            "نسخة أوبونتو بالظبط.",
            "عدد أنوية المعالج.",
            "الرام: المستخدم والفاضي.",
            "مساحة الديسك.",
            "شغال بقاله قد إيه، ومتوسط الضغط."
          ],
          sol: R`الملخص بيبقى أربع سطور من الأوامر دي: النظام من [[hostnamectl]] (سطر [[Operating System: Ubuntu 24.04.x LTS]]) أو [[lsb_release -a]]، وعدد الأنوية من [[nproc]] (زي [[2]])، والرام من [[free -h]] في عمود [[total]] سطر [[Mem:]] (زي [[1.9Gi]])، والمساحة الفاضية من [[df -h]] عمود [[Avail]] سطر [[/]].

مثال لملخص: «Ubuntu 24.04 LTS، 2 core، 2GB رام (1.3GB available)، 32GB فاضيين من 50». و [[uptime]] بيقولك من امتى السيرفر شغال والـ load.

الغلط الشائع: تاخد [[free]] من عمود [[free]] وتفتكر الرام خلصانة؛ لينكس بيستخدم الرام الفاضية كاش، والرقم الحقيقي في [[available]]. وفي Docker أو WSL [[hostnamectl]] ممكن يطلع [[System has not been booted with systemd]]؛ ده عادي هناك، استخدم [[lsb_release -a]] أو [[cat /etc/os-release]].`
        },
        {
          cmd: "timedatectl",
          title: "ضبط الوقت والمنطقة",
          desc: R`كل سيرفر ليه منطقة زمنية (timezone)، ومنها بيحسب الوقت اللي بيظهر في اللوجات ومواعيد الـ cron. أغلب السيرفرات بتيجي على UTC، وده ورا القاهرة بساعتين أو تلاتة حسب التوقيت الصيفي، فلو حطيت باك أب «الساعة 3» هيشتغل 3 بتوقيت UTC مش بتوقيتك.

[[timedatectl]] لوحدها بتعرض الوقت المحلي و UTC والمنطقة الحالية، وكمان هل الساعة بتتظبط لوحدها من النت (NTP). [[set-timezone Africa/Cairo]] بتغيّر المنطقة، والاسم لازم بالشكل ده بالظبط (قارة/مدينة)، و [[timedatectl list-timezones]] بتطبع كل الأسامي. التغيير محتاج [[sudo]] لأنه للسيرفر كله، و [[date]] بعدها بتتأكد.

قرّر المنطقة أول ما تجهّز السيرفر وقبل ما تحط أي cron. والتطبيقات اللي كانت شغالة ممكن تفضل بالمنطقة القديمة لحد ما تعمل لها restart.`,
          example: R`timedatectl
sudo timedatectl set-timezone Africa/Cairo
date`,
          try: "اضبط المنطقة الزمنية واتأكد بـ [[date]].",
          deep: {
            why: "السيرفر ممكن يكون في ألمانيا وماشي على توقيت UTC، وانت في مصر. لما تقرا اللوجات أو تجدول باك أب الساعة ٣ الفجر، لازم تعرف «الساعة ٣» دي بتوقيت مين.",
            how: R`[[timedatectl]] بيعرض الوقت بأكتر من طريقة: الوقت المحلي، و UTC (التوقيت العالمي الموحّد)، والمنطقة الزمنية المظبوطة.

معظم السيرفرات بتيجي على UTC. وفيه ناس بتفضّل تسيبها كده، خصوصًا لو عندك سيرفرات في كذا بلد، عشان كل اللوجات تبقى على نفس التوقيت وتقارن بينها بسهولة. وناس بتحب تغيّرها لتوقيتها عشان تقرا اللوجات أسهل.

[[set-timezone Africa/Cairo]] بيغيّر المنطقة. وبيأثر على الوقت اللي بيظهر في اللوجات الجديدة، وعلى مواعيد الـ cron.

وكمان [[timedatectl]] بيقولك لو الوقت بيتظبط أوتوماتيك من النت (NTP). ده مهم، لأن شهادات SSL والتوكنات بتعتمد على إن الوقت مظبوط.`,
            when: "أول ما تجهّز السيرفر، قبل ما تحط أي cron. ولما تلاقي الأوقات في اللوج مش منطقية.",
            mistakes: "تغيّر المنطقة بعد ما حطيت مهام cron، فكل المواعيد تتزق. قرّر من الأول."
          },
          teach: R`## ٣ أوامر: شوف، غيّر، اتأكد

[[timedatectl]] أداة من systemd: [[time]] و [[date]] و [[ctl]] (control). من غير حاجة بتعرض، ومع [[set-timezone]] بتغيّر. الناتج هنا من كونتينر [[ubuntu:24.04]] شغال فيه systemd كأنه السيرفر.

---

## ١. [[timedatectl]]: الوضع الحالي

~~~bash
timedatectl
~~~

~~~text الناتج (سيرفر جديد)
               Local time: Tue 2026-10-06 11:38:46 UTC
           Universal time: Tue 2026-10-06 11:38:46 UTC
                 RTC time: n/a
                Time zone: Etc/UTC (UTC, +0000)
System clock synchronized: yes
              NTP service: inactive
          RTC in local TZ: no
~~~

| السطر | معناه |
|---|---|
| [[Local time]] | الوقت بالمنطقة المظبوطة دلوقتي، وده اللي بيظهر في اللوجات وبيمشي عليه cron |
| [[Universal time]] | UTC: التوقيت العالمي اللي كل المناطق بتتحسب منه |
| [[RTC time]] | ساعة الهاردوير (Real-Time Clock). [[n/a]] لأن الكونتينر مالوش ساعة خاصة |
| [[Time zone]] | المنطقة. [[Etc/UTC]] والفرق عن UTC [[+0000]] |
| [[System clock synchronized]] | الساعة مظبوطة على النت؟ |
| [[NTP service]] | خدمة ظبط الساعة أوتوماتيك (NTP = Network Time Protocol) |

> في الكونتينر [[NTP service]] طالعة [[inactive]] لأن الساعة جاية من الجهاز اللي تحته. على VPS حقيقي المفروض تبقى [[active]]، ولو مش كده الساعة ممكن تزحف، وشهادات SSL والتوكنات بتعتمد على وقت مظبوط.

لاحظ إن [[Local time]] و [[Universal time]] نفس الوقت: السيرفر على UTC.

---

## ٢. [[sudo timedatectl set-timezone Africa/Cairo]]

| الحتة | معناها |
|---|---|
| [[sudo]] | نفّذ بصلاحيات root، لأن المنطقة إعداد للسيرفر كله |
| [[set-timezone]] | غيّر المنطقة |
| [[Africa/Cairo]] | اسم المنطقة بالشكل الرسمي: قارة/مدينة |

الأمر مش بيطبع حاجة لو نجح. ونجرّب نشوف تاني:

~~~text الناتج بعد التغيير
               Local time: Tue 2026-10-06 14:38:46 EEST
           Universal time: Tue 2026-10-06 11:38:46 UTC
                Time zone: Africa/Cairo (EEST, +0300)
~~~

الوقت المحلي بقى قدام UTC بـ ٣ ساعات. [[EEST]] اختصار Eastern European Summer Time (التوقيت الصيفي)، وفي الشتا هتلاقيه [[EET]] و [[+0200]]. والتبديل بينهم بيحصل لوحده، لأن الاسم [[Africa/Cairo]] شايل قواعد التوقيت الصيفي بتاعة مصر.

ورا الكواليس، الأمر غيّر لينك اسمه [[/etc/localtime]]:

~~~text ls -l /etc/localtime
lrwxrwxrwx 1 root root 32 Oct  6 14:38 /etc/localtime -> /usr/share/zoneinfo/Africa/Cairo
~~~

### الاسم لازم يبقى بالظبط

~~~text الناتج لو كتبت Cairo بس
Failed to set time zone: Invalid or not installed time zone 'Cairo'
~~~

[[timedatectl list-timezones]] بيطبع كل الأسامي (٤٩٧ اسم على النسخة دي)، فدوّر فيهم بـ grep:

~~~bash
timedatectl list-timezones | grep -i cairo
~~~

~~~text الناتج
Africa/Cairo
~~~

و [[-i]] يعني متفرّقش بين الحروف الكبيرة والصغيرة.

---

## ٣. [[date]]

~~~text الناتج
Tue Oct  6 14:38:46 EEST 2026
~~~

[[date]] بيطبع الوقت بالمنطقة الحالية، و [[EEST]] في النص بيأكدلك إن التغيير اشتغل.

---

## الخلاصة

~~~text
timedatectl                               شوف الوقت والمنطقة وظبط الساعة
timedatectl list-timezones | grep -i X    دوّر على اسم منطقة
sudo timedatectl set-timezone Area/City   غيّر المنطقة (للسيرفر كله)
date                                      اتأكد
~~~

> البرامج اللي كانت شغالة قبل التغيير (و cron نفسه) ممكن تفضل شايفة المنطقة القديمة لحد ما تعملها restart. فاظبط المنطقة أول يوم، قبل أي cron.`,
          lines: ["الوقت والمنطقة الزمنية الحالية.", "غيّر المنطقة لتوقيت القاهرة.", "اتأكد إن الوقت بقى صح."],
          sol: R`بعد [[sudo timedatectl set-timezone Africa/Cairo]] (مش بيطبع حاجة)، [[timedatectl]] بيوري [[Time zone: Africa/Cairo (EEST, +0300)]] أو [[(EET, +0200)]] حسب التوقيت الصيفي، و [[System clock synchronized: yes]]. و [[date]] بيطبع الوقت بتوقيت مصر مع [[EEST]] أو [[EET]].

[[System clock synchronized: yes]] و [[NTP service: active]] معناهم إن الساعة بتتظبط لوحدها من الإنترنت، وده مهم لشهادات SSL والتوكنز.

الغلط الشائع: [[Failed to set time zone: Invalid or not installed time zone 'Cairo']]: الاسم لازم زي [[Africa/Cairo]] بالظبط؛ [[timedatectl list-timezones | grep -i cairo]] يطلّعهولك. وخلّي بالك إن التطبيقات اللي كانت شغالة (و cron) ممكن تفضل بالمنطقة القديمة لحد ما تعمل لها restart.`
        }
      ]
    },
    {
      t: "apt: تسطيب وتحديث البرامج",
      l: 1,
      n: "",
      items: [
        {
          cmd: "apt update / upgrade",
          title: "حدّث السيرفر",
          desc: R`[[apt]] هو مدير البرامج في أوبونتو: بيجيب البرامج من مستودعات رسمية على النت. [[apt update]] مش بيحدّث أي برنامج، بينزّل بس «الكتالوج»: لستة بآخر نسخة متاحة من كل حاجة. [[apt list --upgradable]] بتقارن اللي متسطب عندك بالكتالوج وتطبع اللي ليه نسخة أحدث. و [[apt upgrade]] هي اللي بتنزّل النسخ الجديدة وتسطّبها، و [[-y]] بتجاوب «أيوه» على سؤال التأكيد لوحدها.

اعمل update الأول دايمًا، وإلا upgrade هتقارن بكتالوج قديم ومش هتلاقي حاجة. الأوامر اللي بتغيّر في النظام محتاجة [[sudo]]، أما [[apt list]] فبتقرا بس. ولو الكيرنل اتحدّث، السيرفر هيحتاج reboot (درس reboot).`,
          example: R`sudo apt update
apt list --upgradable
sudo apt upgrade -y`,
          try: "حدّث سيرفر التجربة وشوف كام حاجة اتحدثت.",
          deep: {
            why: "البرامج على السيرفر بتطلعلها تحديثات باستمرار، وأهمها تحديثات الأمان اللي بتقفل ثغرات. سيرفر مش متحدّث هدف سهل.",
            how: R`[[apt]] هو «متجر البرامج» بتاع أوبونتو. ووظيفته إنه يجيب البرامج من «مستودعات» (repositories) رسمية على النت.

[[apt update]] مش بيحدّث أي برنامج. بينزّل بس «الكتالوج»: لستة بآخر نسخة متاحة من كل برنامج. عشان كده لازم يتعمل الأول، وإلا [[apt]] هيفتكر إن النسخ القديمة هي الأحدث.

[[apt upgrade]] بيقارن البرامج اللي عندك بالكتالوج، ويسطّب النسخ الأحدث. و [[-y]] بيقول «أيوه» لأي سؤال أوتوماتيك.

و [[apt list --upgradable]] بيوريك إيه اللي هيتحدّث قبل ما تحدّث.

أحيانًا بعد التحديث تلاقي رسالة إن فيه خدمات محتاجة تعمل ريستارت، أو إن السيرفر نفسه محتاج reboot (لو الكيرنل اتحدّث).`,
            when: "أول حاجة على أي سيرفر جديد. وبعدين بانتظام (أو أوتوماتيك بـ unattended-upgrades في المستوى ده).",
            mistakes: "تنسى [[update]] وتعمل [[upgrade]] على طول، فمفيش حاجة تتحدّث. أو تعمل [[apt install]] من غير [[update]] على سيرفر جديد، فتلاقي «Unable to locate package» لأن الكتالوج لسه فاضي."
          },
          teach: R`## خطوتين مش خطوة واحدة

التحديث في أوبونتو على مرحلتين: الأول تنزّل «الكتالوج» الجديد ([[update]])، وبعدين تسطّب النسخ الجديدة اللي فيه ([[upgrade]]). وفي النص [[apt list --upgradable]] تتفرج على اللي هيتغير. كل الناتج هنا من كونتينر [[ubuntu:24.04]] جديد، شغال كـ root فمكتبتش [[sudo]].

---

## ١. [[sudo apt update]]

| الحتة | معناها |
|---|---|
| [[sudo]] | اختصار superuser do: نفّذ بصلاحيات root، لأن الأمر بيكتب في ملفات النظام |
| [[apt]] | مدير البرامج (Advanced Package Tool) |
| [[update]] | حدّث **الكتالوج** بس، مش البرامج |

~~~text الناتج (مختصر)
Get:1 http://archive.ubuntu.com/ubuntu noble InRelease [256 kB]
Get:2 http://security.ubuntu.com/ubuntu noble-security InRelease [126 kB]
Get:3 http://archive.ubuntu.com/ubuntu noble-updates InRelease [126 kB]
...
Get:8 http://archive.ubuntu.com/ubuntu noble/universe amd64 Packages [19.3 MB]
...
3 packages can be upgraded. Run 'apt list --upgradable' to see them.
~~~

كل سطر [[Get]] ملف كتالوج اتنزل من مستودع. [[noble]] اسم نسخة أوبونتو 24.04، و [[noble-security]] مستودع تحديثات الأمان، و [[noble-updates]] باقي التحديثات. ولو شغّلته تاني على طول هتلاقي [[Hit]] بدل [[Get]]: يعني «عندي أحدث نسخة من الملف ده، مش هنزّله».

والسطر الأخير هو الخلاصة: فيه ٣ برامج ليها نسخة أحدث من اللي متسطّب.

### ليه الخطوة دي لازمة؟

جرّبت [[apt upgrade]] على كونتينر جديد من غير [[update]]:

~~~text الناتج
0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
~~~

مفيش ولا حاجة، لأن الكتالوج فاضي أو قديم، فـ apt فاكر إن اللي عندك هو الأحدث.

---

## ٢. [[apt list --upgradable]]

[[list]] اعرض باكدجات، و [[--upgradable]] بس اللي ليها نسخة أحدث. ومش محتاج [[sudo]] لأنه بيقرا بس.

~~~text الناتج
Listing...
libaudit-common/noble-updates 1:3.1.2-2.1ubuntu0.1 all [upgradable from: 1:3.1.2-2.1build1.1]
libaudit1/noble-updates 1:3.1.2-2.1ubuntu0.1 amd64 [upgradable from: 1:3.1.2-2.1build1.1]
libssl3t64/noble-updates,noble-security 3.0.13-0ubuntu3.16 amd64 [upgradable from: 3.0.13-0ubuntu3.15]
~~~

نقرا سطر [[libssl3t64]]:

| الحتة | معناها |
|---|---|
| [[libssl3t64]] | اسم الباكدج (مكتبة التشفير OpenSSL) |
| [[noble-updates,noble-security]] | جاي من أنهي مستودع. وجوده في [[security]] معناه إنه تحديث أمان |
| [[3.0.13-0ubuntu3.16]] | النسخة الجديدة |
| [[amd64]] | لمعالجات Intel/AMD. و [[all]] يعني تنفع لأي معالج |
| [[upgradable from: ...15]] | النسخة اللي عندك دلوقتي |

وهتلاقي تحذير [[WARNING: apt does not have a stable CLI interface]]: معناه إن شكل ناتج [[apt]] ممكن يتغير بين النسخ، فمتعتمدش عليه في سكربتات (في السكربتات استخدم [[apt-get]]). للقراية بعينك عادي.

---

## ٣. [[sudo apt upgrade -y]]

[[upgrade]] سطّب النسخ الجديدة، و [[-y]] من yes: جاوب «أيوه» على سؤال [[Do you want to continue? [Y/n]]] لوحدك.

~~~text الناتج (مختصر)
The following packages will be upgraded:
3 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
Need to get 1998 kB of archives.
After this operation, 2048 B of additional disk space will be used.
Setting up libaudit-common (1:3.1.2-2.1ubuntu0.1) ...
Setting up libaudit1:amd64 (1:3.1.2-2.1ubuntu0.1) ...
Setting up libssl3t64:amd64 (3.0.13-0ubuntu3.16) ...
~~~

### نقرا سطر الملخص

| الرقم | معناه |
|---|---|
| [[3 upgraded]] | اتحدّثوا |
| [[0 newly installed]] | برامج جديدة اتسطبت عشان التحديث محتاجها |
| [[0 to remove]] | هيتشالوا |
| [[0 not upgraded]] | ليهم تحديث بس apt أجّلهم (زي الكيرنل أو phased updates اللي بتنزل للناس على دفعات) |

و [[Need to get]] حجم التنزيل، و [[After this operation]] الفرق في مساحة الديسك. وكل سطر [[Setting up]] باكدج خلص تسطيب.

---

## الخلاصة

~~~text
sudo apt update             نزّل الكتالوج (مفيش برنامج بيتغيّر)
apt list --upgradable       مين ليه نسخة أحدث (قراية بس، من غير sudo)
sudo apt upgrade -y         سطّب النسخ الأحدث من غير ما يسأل
~~~

> الترتيب ثابت: update قبل upgrade وقبل install. ولو الكيرنل اتحدّث، شوف درس reboot.`,
          lines: [
            "حدّث لستة البرامج المتاحة.",
            "اعرض إيه اللي ليه تحديث.",
            "حدّث كل البرامج، و [[-y]] وافق على كل حاجة من غير ما تسأل."
          ],
          sol: R`[[sudo apt update]] بيخلص بسطر زي [[45 packages can be upgraded. Run 'apt list --upgradable' to see them.]] (أو [[All packages are up to date.]]). و [[apt list --upgradable]] بيطبع سطر لكل باكدج بالشكل [[base-files/noble-updates 13ubuntu10.5 amd64 [upgradable from: 13ubuntu10.4]]]. عدّ السطور ده جوابك (عندي كانوا 160 تقريبًا على سيستم مااتحدثش من فترة).

[[sudo apt upgrade -y]] بيطبع [[X upgraded, Y newly installed, 0 to remove and Z not upgraded.]] وبعدين بيسطّب. الـ X ده رقم اللي اتحدثوا.

الأغلاط الشائعة: [[Could not get lock /var/lib/dpkg/lock-frontend]]: unattended-upgrades شغال في الخلفية، استنى دقايق وماتمسحش ملف الـ lock. وشاشة بنفسجي بتسأل [[Which services should be restarted?]]: سيب الاختيارات زي ما هي واضغط Enter. و [[Z not upgraded]] مش غلط؛ غالبًا phased updates أو kernel هتتسطب بعدين.`
        },
        {
          cmd: "apt install / remove",
          title: "سطّب وشيل",
          desc: R`[[apt install]] بيسطّب برنامج أو أكتر في أمر واحد، ومعاه كل البرامج اللي محتاجها عشان يشتغل (dependencies)، و [[-y]] بتوافق من غير ما تسأل. [[apt search redis]] بتدوّر في الكتالوج على الكلمة لو مش عارف الاسم بالظبط، و [[apt show nginx]] بتطبع وصف البرنامج ونسخته وحجمه قبل ما تسطّبه.

الإزالة ليها 3 أوامر: [[remove]] بتشيل البرنامج وتسيب ملفات إعداداته في [[/etc]]، فلو سطّبته تاني يرجع بإعداداتك. [[purge]] بتشيل الإعدادات كمان. و [[autoremove]] بتشيل الـ dependencies اللي اتسطبت عشان برنامج اتشال ومبقاش حد محتاجها.

التسطيب والإزالة محتاجين [[sudo]]، والبحث والعرض لأ. وكل برنامج مش محتاجه على السيرفر حاجة زيادة لازم تتحدّث وممكن يبقى فيها ثغرة، فشيل اللي مبتستخدموش.`,
          example: R`sudo apt install -y nginx git curl htop
apt search redis
apt show nginx
sudo apt remove htop
sudo apt autoremove`,
          try: "سطّب htop، شغّله، وبعدين شيله بـ remove و autoremove.",
          deep: {
            why: "عشان تسطّب البرامج اللي محتاجها على السيرفر: Nginx، و git، و htop، وأي حاجة تانية.",
            how: R`[[apt install nginx]] بيعمل كذا حاجة: يدوّر في الكتالوج، ويعرف البرنامج محتاج برامج تانية إيه عشان يشتغل (dependencies)، وينزّلهم كلهم، ويسطّبهم، ولو البرنامج خدمة زي Nginx غالبًا يشغّلها كمان.

والتسطيب محتاج [[sudo]] لأنه بيحط ملفات في أماكن السيستم. إنما [[apt search]] و [[apt show]] مش محتاجين، لأنهم بيقروا بس.

وفيه ٣ طرق للإزالة، والفرق بينهم مهم: [[remove]] بيشيل البرنامج وبيسيب ملفات إعداداته، فلو سطّبته تاني يرجع بنفس إعداداتك. [[purge]] بيشيل الإعدادات كمان. و [[autoremove]] بيشيل الـ dependencies اللي اتسطّبت عشان برنامج انت شيلته ومحدش تاني محتاجها.`,
            when: "تجهيز أي سيرفر جديد. وتنضيف برامج مش محتاجها، لأن كل برنامج زيادة على السيرفر ثغرة محتملة.",
            mistakes: "تسطيب برامج من مصادر مش رسمية. ونسيان [[-y]] في السكربتات، فالسكربت يقف مستني حد يكتب «Y»."
          },
          teach: R`## ٥ أوامر: سطّب، دوّر، اعرف، شيل، نضّف

كلهم بيبدأوا بـ [[apt]]. اللي بيغيّر في النظام (install و remove و autoremove) محتاج [[sudo]]، واللي بيقرا بس (search و show) مش محتاج. الناتج هنا من كونتينر [[ubuntu:24.04]] بعد [[apt update]]، كـ root.

---

## ١. [[sudo apt install -y nginx git curl htop]]

[[install]] وبعدها أسامي البرامج مفصولة بمسافات، فبتسطّب ٤ في أمر واحد. و [[-y]] بيوافق على السؤال لوحده.

~~~text الناتج (مختصر)
The following additional packages will be installed:
  ...
The following NEW packages will be installed:
  ...
1 upgraded, 61 newly installed, 0 to remove and 2 not upgraded.
Need to get 23.7 MB of archives.
After this operation, 101 MB of additional disk space will be used.
Setting up nginx (1.24.0-2ubuntu7.18) ...
Setting up htop (3.3.0-4build1) ...
Setting up git (1:2.43.0-1ubuntu7.3) ...
Setting up curl (8.5.0-2ubuntu10.15) ...
~~~

طلبت ٤ برامج واتسطب ٦١! ليه؟ عشان [[additional packages]]: الـ **dependencies**، يعني المكتبات اللي البرامج دي محتاجاها عشان تشتغل، و apt بيحسبها وبيجيبها لوحده. والرقم اللي بين القوسين بعد كل برنامج نسخته.

> لو الكتالوج فاضي (نسيت [[apt update]] على سيرفر جديد) هتلاقي [[E: Unable to locate package htop]]. جربتها على كونتينر جديد وطلعت كده بالظبط.

---

## ٢. [[apt search redis]]

بيدوّر على الكلمة في أسامي **ووصف** كل الباكدجات:

~~~text الناتج (أوله)
erlang-redis-client/noble 1.2.0-7 amd64
  Redis client for Erlang applications

freeradius-redis/noble-updates 3.2.5+dfsg-3~ubuntu24.04.3 amd64
  Redis module for FreeRADIUS server
...
~~~

كل نتيجة سطرين: الاسم/المستودع والنسخة، وتحته وصف قصير. النتايج كتير لأن أي باكدج ليها علاقة بـ redis بتظهر، فلو عارف أول الاسم ضيّق: [[apt search ^redis]] (الـ [[^]] يعني «بيبدأ بـ»).

---

## ٣. [[apt show nginx]]

بطاقة البرنامج قبل ما تسطّبه:

~~~text الناتج (أهم السطور)
Package: nginx
Version: 1.24.0-2ubuntu7.18
Origin: Ubuntu
Installed-Size: 1355 kB
Depends: libc6 (>= 2.34), ..., nginx-common (= 1.24.0-2ubuntu7.18)
Homepage: https://nginx.org
Download-Size: 525 kB
APT-Sources: http://archive.ubuntu.com/ubuntu noble-updates/main amd64 Packages
Description: small, powerful, scalable web/proxy server
~~~

| السطر | معناه |
|---|---|
| [[Version]] | النسخة اللي هتتسطب |
| [[Origin]] | مين عامل الباكدج: أوبونتو نفسها |
| [[Depends]] | الـ dependencies اللي فوق |
| [[Download-Size]] و [[Installed-Size]] | حجم التنزيل وحجمه على الديسك |
| [[APT-Sources]] | جاي من أنهي مستودع |

---

## ٤. [[sudo apt remove htop]]

من غير [[-y]]، فبيسأل:

~~~text الناتج
The following packages were automatically installed and are no longer required:
  libnl-3-200 libnl-genl-3-200
Use 'apt autoremove' to remove them.
The following packages will be REMOVED:
  htop
0 upgraded, 0 newly installed, 1 to remove and 3 not upgraded.
After this operation, 434 kB disk space will be freed.
Do you want to continue? [Y/n]
~~~

في [[[Y/n]]] الحرف الكبير هو الافتراضي: Enter لوحده يعني Y. ولاحظ أول سطرين: htop كان جاب معاه مكتبتين ([[libnl]])، ودلوقتي مبقاش حد محتاجهم، و apt بيقولك تشيلهم بـ autoremove.

---

## ٥. [[sudo apt autoremove]]

~~~text الناتج
Removing libnl-genl-3-200:amd64 (3.7.0-0.3build1.1) ...
Removing libnl-3-200:amd64 (3.7.0-0.3build1.1) ...
~~~

apt فاكر كل باكدج اتسطبت «لوحدها» كـ dependency، ولما مفيش حد محتاجها بيشيلها. ولو مفيش حاجة بيطبع [[0 upgraded, 0 newly installed, 0 to remove]].

---

## remove ولا purge؟

جربت الاتنين على nginx. إعدادات nginx في أوبونتو جاية في باكدج لوحدها اسمها [[nginx-common]]، فـ purge اتعمل عليها هي:

~~~text الناتج
$ apt remove -y nginx
$ ls /etc/nginx
conf.d  fastcgi.conf  fastcgi_params ...      الإعدادات لسه موجودة
$ apt purge -y nginx-common
Purging configuration files for nginx-common ...
$ ls /etc/nginx
ls: cannot access '/etc/nginx': No such file or directory
~~~

| الأمر | البرنامج | الإعدادات في /etc | الـ dependencies |
|---|---|---|---|
| [[remove]] | بيتشال | بتفضل | بتفضل |
| [[purge]] | بيتشال | بتتمسح | بتفضل |
| [[autoremove]] | | | اللي محدش محتاجها بتتشال |

---

## الخلاصة

~~~text
sudo apt install -y A B C   سطّب برامج ومعاها اللي محتاجينه
apt search كلمة             دوّر لو مش عارف الاسم
apt show اسم                تفاصيل قبل التسطيب
sudo apt remove اسم         شيل وسيب الإعدادات
sudo apt purge اسم          شيل والإعدادات كمان
sudo apt autoremove         شيل الـ dependencies اليتيمة
~~~`,
          lines: [
            "سطّب ٤ برامج مرة واحدة.",
            "دوّر على برنامج بالاسم.",
            "معلومات عن برنامج قبل ما تسطّبه.",
            "شيل برنامج.",
            "شيل الحاجات اللي اتسطبت معاه ومبقاش ليها لازمة."
          ],
          sol: R`[[sudo apt install -y htop]] بيخلص بـ [[Setting up htop (3.3.0-...)]]، و [[htop]] بيفتح شاشة ملونة بالـ CPU والرام والعمليات؛ اخرج بـ [[q]] أو F10.

[[sudo apt remove htop]] بيطبع [[The following packages will be REMOVED: htop]] و [[Removing htop (...)]]. و [[sudo apt autoremove]] بيشيل الباكدجات اللي اتسطبت كـ dependencies ومبقاش حد محتاجها، ولو مفيش بيطبع [[0 upgraded, 0 newly installed, 0 to remove]].

الغلط الشائع: [[E: Unable to locate package]]: نسيت [[apt update]] الأول، أو الاسم غلط (دوّر بـ [[apt search]]). وخلّي بالك إن [[remove]] بيسيب ملفات الإعدادات في [[/etc]]، و [[purge]] هو اللي بيمسحها.`
        },
        {
          cmd: "NodeSource",
          title: "نسخة Node حديثة بدل القديمة اللي في أوبونتو",
          desc: "[[apt install nodejs]] من أوبونتو بيجيب نسخة قديمة غالبًا. NodeSource بيضيف مستودع فيه نسخ Node الرسمية، فتسطّب وتحدّث بـ apt عادي. نزّل السكربت في ملف واقراه قبل ما تشغّله بـ sudo، بدل ما تعمل [[curl | bash]] على عماها.",
          example: R`curl -fsSL https://deb.nodesource.com/setup_24.x -o nodesource_setup.sh
less nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt install -y nodejs
node -v && npm -v`,
          try: "على سيرفر التجربة: [[apt-cache policy nodejs]] قبل وبعد الإضافة، وشوف النسخة المتاحة اتغيرت ومن أنهي مستودع.",
          deep: {
            why: "مكتبات كتير بتطلب Node حديث، والنسخة اللي جاية مع التوزيعة ممكن تكون متأخرة سنين. والنسخ القديمة بتخرج من الدعم وبطّلت تاخد تحديثات أمان.",
            how: R`السكربت بيعمل ٣ حاجات: يضيف مفتاح توقيع NodeSource، ويضيف ملف مستودع في [[/etc/apt/sources.list.d/]] لنسخة معينة (هنا 24)، ويعمل [[apt update]]. بعدها [[apt install nodejs]] بيجيب من المستودع ده، و npm جاي معاه.

وتحديثات النسخة نفسها (24.x) بتيجي مع [[apt upgrade]] العادي. للانتقال لنسخة كبيرة تانية، شغّل سكربت [[setup_26.x]] مثلًا.

ليه [[less]] الأول؟ [[curl URL | sudo bash]] بيشغّل أي حاجة السيرفر يبعتها بصلاحيات root، من غير ما تشوفها. لو الموقع اتخترق أو الاتصال اتقطع في النص، بتشغّل سكربت ناقص أو خبيث. الملف بيخليك تشوف وبيخلي اللي اتشغّل هو نفسه اللي قريته.

البدائل: Docker بـ image [[node:24-alpine]] (مفيش Node على السيرفر خالص)، أو nvm لو يوزر واحد بس هو اللي محتاجه.`,
            when: "سيرفر هيشغّل تطبيق Node من غير Docker (بـ pm2 أو systemd).",
            mistakes: "في مشروع حقيقي التوثيق كان [[curl ... | sudo -E bash -]] مباشرة وعلى نسخة 20 اللي خرجت من الدعم. وتخلط nvm مع Node بتاع apt فيبقى فيه نسختين و [[which node]] في cron غير اللي في الترمنال."
          },
          teach: R`## نزّل، اقرا، شغّل، سطّب، اتأكد

الفكرة: نضيف لـ apt مستودع جديد (بتاع NodeSource) فيه Node 24، وبعدين نسطّب منه بـ apt عادي. كل الخطوات اتجرّبت في كونتينر [[ubuntu:24.04]] جديد، كـ root.

### قبل أي حاجة: أوبونتو عنده إيه؟

[[apt-cache policy nodejs]] بيقولك النسخة اللي هتتسطب ومن أنهي مستودع:

~~~text الناتج قبل الإضافة
nodejs:
  Installed: (none)
  Candidate: 18.19.1+dfsg-6ubuntu5
  Version table:
     18.19.1+dfsg-6ubuntu5 500
        500 http://archive.ubuntu.com/ubuntu noble/universe amd64 Packages
~~~

[[Installed]] المتسطب دلوقتي (ولا حاجة)، و [[Candidate]] اللي هيتسطب لو كتبت [[apt install nodejs]]: نسخة 18، خرجت من الدعم. والـ [[500]] دي **الأولوية** (priority) بتاعة المستودع، وهنرجعلها.

---

## ١. [[curl -fsSL https://deb.nodesource.com/setup_24.x -o nodesource_setup.sh]]

[[curl]] بينزّل من رابط. والحروف:

| الحرف | معناه |
|---|---|
| [[-f]] | fail: لو السيرفر رد بـ error (زي 404) متحفظش صفحة الـ error كأنها السكربت |
| [[-s]] | silent: من غير شريط التحميل |
| [[-S]] | show errors: بس لو حصل error اطبعه (عكس [[-s]] للأخطاء بس) |
| [[-L]] | location: لو الرابط بيحوّل لرابط تاني، روح وراه |
| [[-o nodesource_setup.sh]] | output: احفظ في الملف ده بدل ما تطبع على الشاشة |

و [[setup_24.x]] يعني «جهّز لنسخة 24 وكل تحديثاتها». مفيش ناتج لو نجح. الملف طلع ١٢١ سطر.

---

## ٢. [[less nodesource_setup.sh]]

[[less]] بيفتح الملف للقراية بس: الأسهم و Space تتحرك، و [[q]] تخرج، و [[/كلمة]] تدوّر. انت مش لازم تفهم كل سطر، بس تعرف هو بيعمل إيه. ده أهم اللي فيه:

~~~text أهم السطور في السكربت (برقم السطر، ومختصرة)
64:  curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /usr/share/keyrings/nodesource.gpg
83:  cat <<EOF | tee /etc/apt/sources.list.d/nodesource.sources > /dev/null
99:  echo "Pin: origin deb.nodesource.com" | tee -a /etc/apt/preferences.d/nodejs > /dev/null
100: echo "Pin-Priority: 600" | tee -a /etc/apt/preferences.d/nodejs > /dev/null
114: NODE_VERSION="24.x"
~~~

يعني ٣ حاجات: مفتاح توقيع، وملف مستودع، وملف أولوية. هنشوفهم تحت بعد التشغيل.

---

## ٣. [[sudo bash nodesource_setup.sh]]

[[bash ملف]] بيشغّل السكربت، و [[sudo]] لأنه بيكتب في [[/etc]] و [[/usr/share]]:

~~~text الناتج (آخره)
Get:2 https://deb.nodesource.com/node_24.x nodistro InRelease [12.1 kB]
Get:5 https://deb.nodesource.com/node_24.x nodistro/main amd64 Packages [9293 B]
...
2026-10-06 11:45:01 - Repository configured successfully.
2026-10-06 11:45:01 - To install Node.js, run: apt install nodejs -y
~~~

السكربت عمل [[apt update]] في الآخر، وفيه سطر [[Get]] جديد من [[deb.nodesource.com]]: المستودع الجديد دخل الكتالوج.

### إيه اللي اتغيّر على السيرفر؟

~~~text /etc/apt/sources.list.d/nodesource.sources
Types: deb
URIs: https://deb.nodesource.com/node_24.x
Suites: nodistro
Components: main
Architectures: amd64
Signed-By: /usr/share/keyrings/nodesource.gpg
~~~

ده ملف مستودع: [[URIs]] الرابط، و [[Signed-By]] المفتاح اللي أي ملف جاي من الرابط لازم يكون متوقّع بيه، وإلا apt يرفضه. كده لو حد عدّل الباكدجات في النص، apt هيعرف.

~~~text /etc/apt/preferences.d/nodejs
Package: nodejs
Pin: origin deb.nodesource.com
Pin-Priority: 600
~~~

وده ملف الأولوية: باكدج [[nodejs]] لو جاية من NodeSource خد أولويتها [[600]]، أعلى من [[500]] بتاعة أوبونتو. فـ apt هيختار NodeSource.

### نتأكد

~~~text apt-cache policy nodejs بعد السكربت (مختصر)
nodejs:
  Installed: (none)
  Candidate: 24.21.0-1nodesource1
  Version table:
     24.21.0-1nodesource1 600
        500 https://deb.nodesource.com/node_24.x nodistro/main amd64 Packages
     ...
     18.19.1+dfsg-6ubuntu5 500
        500 http://archive.ubuntu.com/ubuntu noble/universe amd64 Packages
~~~

الـ Candidate بقى 24 بأولوية 600، و 18 لسه موجودة تحت بأولوية 500 بس مش هتتختار.

---

## ٤. [[sudo apt install -y nodejs]]

~~~text الناتج
0 upgraded, 12 newly installed, 0 to remove and 2 not upgraded.
Setting up nodejs (24.21.0-1nodesource1) ...
~~~

باكدج [[nodejs]] من NodeSource فيها npm جوه، فمش محتاج تسطّبه لوحده.

---

## ٥. [[node -v && npm -v]]

[[-v]] من version. و [[&&]] معناها «لو اللي قبلي نجح، شغّل اللي بعدي»:

~~~text الناتج
v24.21.0
11.19.0
~~~

---

## ليه مش [[curl ... | sudo bash]] على طول؟

[[|]] (pipe) بيبعت ناتج curl لـ bash مباشرة، فبيتنفذ وهو لسه بيتنزل، بصلاحيات root، وانت مشفتوش. لو النت قطع في النص، bash ممكن ينفّذ نص سطر. الملف بيخليك تقرا، وبيضمن إن اللي اتشغّل هو بالظبط اللي قريته.

## الخلاصة

| الخطوة | الأمر | النتيجة |
|---|---|---|
| ١ | [[curl -fsSL ... -o ملف]] | السكربت في ملف |
| ٢ | [[less ملف]] | عرفت هيعمل إيه |
| ٣ | [[sudo bash ملف]] | مفتاح + مستودع + أولوية 600 + apt update |
| ٤ | [[sudo apt install -y nodejs]] | Node 24 و npm |
| ٥ | [[node -v && npm -v]] | اتأكدت |

> تحديثات 24.x بتيجي بعد كده مع [[apt upgrade]] العادي. والانتقال لنسخة كبيرة تانية يبقى بسكربتها ([[setup_26.x]]).`,
          lines: [
            "نزّل سكربت الإعداد لنسخة 24 في ملف.",
            "اقراه قبل ما تشغّله.",
            "شغّله: بيضيف المستودع والمفتاح.",
            "سطّب Node (و npm معاه) من المستودع الجديد.",
            "اتأكد من النسخ."
          ],
          sol: R`قبل الإضافة: [[apt-cache policy nodejs]] بيطبع [[Candidate: 18.19.1+dfsg-6ubuntu5]] وجنب النسخة [[500 http://archive.ubuntu.com/ubuntu noble/universe]]. يعني Node 18 القديمة من مستودع أوبونتو (جربتها على أوبونتو 24.04).

بعد السكربت: [[Candidate: 24.21.0-1nodesource1]] ومصدرها [[https://deb.nodesource.com/node_24.x nodistro/main]]، وأولويتها [[600]] أعلى من [[500]] بتاعة أوبونتو فهي اللي هتتسطب. و [[node -v]] بعد التسطيب طبع [[v24.21.0]] و [[npm -v]] طبع [[11.19.0]] (جربت الخطوات كلها في كونتينر أوبونتو 24.04، والأرقام بتزيد مع الوقت).

الغلط الشائع: Candidate لسه 18 بعد السكربت: السكربت فشل (اقرا آخر سطور ناتجه) أو ماعملش [[apt update]]. ولو كان عندك nodejs من أوبونتو متسطب قبل كده، ممكن التسطيب يطلع conflict مع [[libnode]]؛ [[sudo apt remove nodejs libnode*]] الأول.`
        },
        {
          cmd: "reboot",
          title: "محتاج ريستارت؟",
          desc: R`بعض التحديثات، وأهمها تحديثات الكيرنل (قلب النظام)، مبتشتغلش غير بعد ما السيرفر يعمل restart. لما ده يحصل، أوبونتو بيعمل ملف علامة اسمه [[/var/run/reboot-required]]: لو [[ls]] لقاه يبقى محتاج، ولو قال [[No such file or directory]] يبقى لأ. و [[reboot-required.pkgs]] جنبه فيه أسامي الباكدجات اللي طالبة الريستارت.

[[sudo reboot]] بيقفل كل الخدمات ويشغّل السيرفر من الأول. اتصال SSH هيتقطع، وبعد دقيقة تقريبًا تدخل تاني. المواقع بتقع الوقت ده، فاختار وقت الزيارات فيه قليلة.

الريستارت كمان اختبار: أي خدمة معمولها [[enable]] هتقوم لوحدها، وأي حاجة شغّلتها بإيدك مش هترجع. و [[systemctl --failed]] بعدها بيوريك اللي حاول يقوم ووقع.`,
          example: R`ls /var/run/reboot-required
cat /var/run/reboot-required.pkgs
sudo reboot`,
          try: "اعمل reboot لسيرفر التجربة، وادخل تاني، واتأكد إن مفيش خدمات واقعة بـ [[systemctl --failed]].",
          deep: {
            why: "بعض التحديثات، خصوصًا تحديثات الكيرنل (قلب النظام)، مش بتتطبق غير لما السيرفر يعمل ريستارت. والتحديث بيبقى نازل ومش شغال.",
            how: R`لما تحديث محتاج ريستارت، أوبونتو بيعمل ملف اسمه [[/var/run/reboot-required]]. ده «علامة» بس، ولو موجود يبقى محتاج. و [[reboot-required.pkgs]] جنبه بيقولك أنهي باكدجات السبب.

[[sudo reboot]] بيقفل كل الخدمات بالترتيب ويعيد تشغيل السيرفر، وده بياخد من ثواني لدقيقة. والاتصال بتاعك هيتقطع، فهتستنى وتدخل تاني.

وهنا بيبان إذا كنت ظبطت السيرفر صح: كل خدمة معمولها [[enable]] هتقوم لوحدها. وأي حاجة شغّلتها بإيدك (بـ nohup مثلًا) مش هترجع. و [[systemctl --failed]] بيوريك أي خدمة حاولت تقوم وفشلت.`,
            when: "بعد تحديث كيرنل. ولازم تجرّبه مرة على السيرفر بعد ما تجهّزه، عشان تتأكد إن كل حاجة بتقوم لوحدها قبل ما يحصل ريستارت مفاجئ من شركة الاستضافة.",
            mistakes: "reboot في وقت ذروة، والموقع يقع قدام الزوار. ومتجربش الريستارت أبدًا، فيوم ما يحصل غصب عنك تكتشف إن نص الحاجات مبتقومش."
          },
          teach: R`## اسأل الأول، وبعدين اعمل ريستارت

أول سطرين بيسألوا «السيرفر محتاج ريستارت؟ وليه؟»، والتالت بيعمله. اتجرّب على كونتينر [[ubuntu:24.04]] شغال فيه systemd كأنه السيرفر، وكونتينر تاني كلابتوب داخل عليه بـ ssh. والكونتينر مالوش كيرنل خاص بيه، فعملت ملف العلامة بنفس السكربت اللي باكدج الكيرنل بتشغّله وهي بتتسطب.

---

## ١. [[ls /var/run/reboot-required]]

[[ls]] لو اديته اسم ملف بيطبع الاسم لو موجود، وبيشتكي لو مش موجود. فبنستخدمه هنا كسؤال «موجود ولا لأ؟».

~~~text الناتج لو مش محتاج
ls: cannot access '/var/run/reboot-required': No such file or directory
~~~

~~~text الناتج بعد تحديث كيرنل
/var/run/reboot-required
~~~

### الملف ده جه منين؟

لما باكدج زي الكيرنل تتسطب، بتشغّل سكربت صغير ([[/usr/share/update-notifier/notify-reboot-required]] من باكدج [[update-notifier-common]]) بيكتب الملف ده. ومحتواه جملة بس:

~~~text cat /var/run/reboot-required
*** System restart required ***
~~~

و [[/var/run]] لينك لـ [[/run]]، وده فولدر في الرام بيتمسح مع كل ريستارت. عشان كده الملف بيختفي لوحده بعد الريستارت.

---

## ٢. [[cat /var/run/reboot-required.pkgs]]

[[cat]] بيطبع محتوى ملف. و [[.pkgs]] (من packages) فيه أسامي الباكدجات اللي طلبت الريستارت، كل واحدة في سطر:

~~~text الناتج
linux-image-6.8.0-85-generic
~~~

[[linux-image]] يعني كيرنل جديد. الكيرنل القديم لسه هو اللي شغال في الرام، والجديد مش هيشتغل غير لما السيرفر يقوم من الأول. ولو لقيت مكتبات زي [[libc6]] أو [[dbus]]، نفس الحكاية.

---

## ٣. [[sudo reboot]]

[[reboot]] بيقول لـ systemd يقفل كل الخدمات بالترتيب ويشغّل الجهاز من الأول. ومحتاج [[sudo]] لأنه بيأثر على كل اللي على السيرفر.

~~~text الناتج على اللابتوب
root@my-server:~# sudo reboot
Connection to 203.0.113.10 closed by remote host.
Connection to 203.0.113.10 closed.
~~~

[[closed by remote host]] يعني السيرفر هو اللي قفل الاتصال، مش انت. استنى دقيقة وادخل تاني بـ ssh.

---

## بعد ما يرجع: ٣ أسئلة

| السؤال | الأمر | الإجابة السليمة |
|---|---|---|
| عمل ريستارت فعلًا؟ | [[uptime]] | [[up 1 min]] أو قريب منها |
| لسه محتاج؟ | [[ls /var/run/reboot-required]] | [[No such file or directory]] |
| فيه خدمة وقعت؟ | [[systemctl --failed]] | [[0 loaded units listed.]] |

> [[uptime]] في الكونتينر بيوري وقت الجهاز اللي تحته، فمطلعش [[up 1 min]] في المحاكاة. على VPS حقيقي هيطلع.

### لو فيه خدمة واقعة

عملت خدمة تجربة بتشغّل ملف مش موجود، وعملتلها [[enable]]، وعملت ريستارت:

~~~text systemctl --failed
  UNIT         LOAD   ACTIVE SUB    DESCRIPTION
● demo.service loaded failed failed Demo app that crashes

1 loaded units listed.
~~~

[[LOAD loaded]] يعني systemd قرا ملفها تمام، و [[ACTIVE failed]] يعني حاولت تقوم ووقعت. والسبب في اللوج بتاعها من البوت ده ([[-b]] من boot):

~~~text journalctl -u demo -b
systemd[1]: Started demo.service - Demo app that crashes.
systemd[1]: demo.service: Main process exited, code=exited, status=203/EXEC
systemd[1]: demo.service: Failed with result 'exit-code'.
~~~

[[203/EXEC]] معناها systemd مقدرش يشغّل البرنامج نفسه (هنا node مش متسطب أصلًا).

---

## الخلاصة

~~~text
ls /var/run/reboot-required        موجود = محتاج ريستارت
cat /var/run/reboot-required.pkgs  مين السبب
sudo reboot                        ssh هيتقطع، استنى دقيقة
systemctl --failed                 بعد الرجوع: مين مقامش
~~~`,
          lines: [
            "لو الملف ده موجود، السيرفر محتاج ريستارت.",
            "أنهي برامج محتاجة الريستارت.",
            "اعمل ريستارت (الموقع هيقع ثواني)."
          ],
          sol: R`[[sudo reboot]] بيقطع SSH على طول ([[Connection to ... closed by remote host.]]). استنى دقيقة وادخل تاني. [[uptime]] المفروض يقول [[up 1 min]].

[[systemctl --failed]] في الحالة السليمة بيطبع [[0 loaded units listed.]]. ولو فيه خدمة واقعة بتظهر بـ [[failed]] واسمها، واقرا السبب بـ [[journalctl -u اسمها -b]].

و [[ls /var/run/reboot-required]] بعد الـ reboot المفروض يقول [[No such file or directory]]، يعني مفيش reboot مطلوب تاني. الغلط الشائع: السيرفر مابيرجعش خالص: غالبًا تعديل في [[/etc/fstab]] لديسك مش موجود من غير [[nofail]]، والحل من console المزود مش SSH.`
        }
      ]
    }
  ]
});
