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

TAB("sshc", {
  label: "ssh config",
  prompt: "$ ",
  lab: R`touch ~/.ssh/config && chmod 600 ~/.ssh/config
ssh -G prod | head`,
  labText: R`الملف في ~/.ssh/config على جهازك (وعلى ويندوز في C:\Users\اسمك\.ssh\config). بعد أي تعديل: ssh -G اسم يوريك الإعدادات النهائية.`,
  levels: {
    "1": ["الأساسيات", "اسم واحد لكل سيرفر، وأنماط، و jump hosts، ومفاتيح متعددة، و tunnels في الملف"]
  },
  categories: [
    {
      t: "~/.ssh/config",
      l: 1,
      n: "بدل ما تكتب اليوزر والـ IP والبورت والمفتاح كل مرة، تكتب اسم",
      items: [
        {
          cmd: "الملف الأساسي",
          title: "ssh prod بدل ssh -p 2222 -i key deploy@203.0.113.10",
          desc: "ملف نصي في [[~/.ssh/config]]. كل [[Host]] اسم مختصر بتختاره، وتحته الإعدادات. بعدها [[ssh prod]] بيقرا الباقي من الملف. وكل أدوات SSH (scp، rsync، git، VS Code) بتفهمه.",
          example: R`Host prod
    HostName 203.0.113.10
    User deploy
    Port 2222
    IdentityFile ~/.ssh/prod_ed25519

Host staging
    HostName staging.example.com
    User deploy
    IdentityFile ~/.ssh/staging_ed25519`,
          try: "اكتب الملف، و [[chmod 600 ~/.ssh/config]]، وجرّب [[ssh prod]] و [[scp file prod:/tmp/]].",
          flag: "script",
          deep: {
            why: "٤ سيرفرات، كل واحد يوزر وبورت ومفتاح. بعد أسبوع مش هتفتكر. والأمر الطويل بيتكتب غلط. الملف بيخلي كل سيرفر كلمة.",
            how: R`ssh بيقرا [[~/.ssh/config]] قبل ما يتصل. لما تكتب [[ssh prod]]، بيدوّر على [[Host prod]] ويطبّق اللي تحته: [[HostName]] العنوان الحقيقي (IP أو دومين)، [[User]] اليوزر، [[Port]] لو مش 22، [[IdentityFile]] المفتاح.

الاسم بعد Host أي حاجة تختارها، مش لازم يبقى دومين. والمسافات البادئة للتنظيم بس.

خلّي صلاحيته 600، و ssh بيرفضه لو حد غيرك يقدر يكتب فيه (664 أو 666)، وفولدر .ssh 700.

ومن اللحظة دي [[scp file prod:/tmp/]] و [[rsync ... prod:/path]] و [[git clone prod:/repo]] كلهم بيفهموا prod.

على ويندوز نفس الملف في [[C:\Users\اسمك\.ssh\config]] مع OpenSSH المبني، و VS Code بيقراه.

[[ssh -v prod]] بيوريك أنهي إعدادات اتطبقت من الملف.`,
            when: "من أول سيرفر. وكل سيرفر جديد سطرين في الملف.",
            mistakes: "صلاحيات الملف 664 أو 666 (جروب أو حد تاني يقدر يكتب) فـ ssh يقول Bad owner or permissions. و HostName بالـ IP القديم بعد نقل السيرفر."
          },
          teach: R`## الفكرة: دفتر عناوين لـ ssh

من غير الملف، عشان تدخل سيرفر لازم تكتب كل حاجة كل مرة:

~~~bash
ssh -p 2222 -i ~/.ssh/prod_ed25519 deploy@203.0.113.10
~~~

الملف بيخلّي ssh يحفظ الكلام ده تحت اسم انت بتختاره، فتكتب [[ssh prod]] بس. المثال مش أوامر بتتنفّذ، ده **محتوى ملف**. هنكتبه، ونتأكد إن ssh فهمه، وبعدين نتصل بيه.

> كل اللي تحت اتجرّب على ٣ containers [[ubuntu:24.04]] (سيرفرين عليهم [[sshd]] وجهاز عميل، OpenSSH 9.6)، وعلى ويندوز 11 بـ OpenSSH المبني (9.5). العنوان [[203.0.113.10]] اللي في المثال من رينج محجوز للأمثلة والكتب (اسمه TEST-NET-3) ومفيش سيرفر حقيقي عليه، فاحنا حطينا مكانه IP السيرفر بتاع التجربة [[172.18.0.2]].

---

## ١. الملف فين، وصلاحياته

~~~bash
touch ~/.ssh/config && chmod 600 ~/.ssh/config
~~~

- [[~]] يعني فولدر اليوزر بتاعك (home)، و [[.ssh]] فولدر مخفي فيه كل حاجة تخص ssh (المفاتيح و known_hosts والـ config). النقطة في أول الاسم بتخليه مخفي في لينكس والماك.
- [[config]] اسم الملف بالظبط، **من غير امتداد**.
- [[touch]] بيعمل الملف لو مش موجود (ولو موجود مبيلمسش محتواه).
- [[&&]] يعني «لو اللي قبلي نجح، نفّذ اللي بعدي».
- [[chmod 600]]: الرقم ٣ خانات: المالك ثم الجروب ثم الباقي. ٦ = قراية (٤) + كتابة (٢)، و ٠ = ولا حاجة. يعني انت بس تقرا وتكتب.

ليه ssh مهتم؟ لأن اللي يقدر يكتب في الملف ده يقدر يحوّل [[prod]] لسيرفر تاني خالص. جربنا [[chmod 666]] على الملف ورجعنا شغّلنا ssh:

~~~text الناتج (container أوبونتو)
Bad owner or permissions on /root/.ssh/config
~~~

ssh رفض يكمّل خالص لحد ما رجّعناه 600.

---

## ٢. البلوك الأول سطر سطر

~~~text
Host prod
    HostName 203.0.113.10
    User deploy
    Port 2222
    IdentityFile ~/.ssh/prod_ed25519
~~~

| السطر | معناه | لو مكتبتوش |
|---|---|---|
| [[Host prod]] | بداية بلوك. [[prod]] اسم مستعار انت مخترعه، مش لازم يبقى دومين | مفيش بلوك أصلًا |
| [[HostName 203.0.113.10]] | العنوان الحقيقي: IP أو دومين | ssh هيحاول يوصل لجهاز اسمه حرفيًا [[prod]] |
| [[User deploy]] | اليوزر اللي هتدخل بيه على السيرفر | اسم اليوزر بتاعك على جهازك |
| [[Port 2222]] | البورت اللي [[sshd]] سامع عليه | 22 |
| [[IdentityFile ...]] | المفتاح الخاص اللي هيتجرّب | [[~/.ssh/id_ed25519]] والأسامي الافتراضية التانية |

- كل سطر **كلمة ثم قيمة**، والكلمة مش حساسة لحروف كبيرة وصغيرة ([[hostname]] زي [[HostName]]).
- المسافات في أول السطر للعين بس. ssh بيعرف إن البلوك خلص لما يلاقي [[Host]] جديد، مش من الإزاحة.
- [[ed25519]] في اسم المفتاح نوع الخوارزمية (الأحدث والأقصر)، والاسم كله انت اللي اخترته وقت [[ssh-keygen]].

البلوك التاني [[staging]] نفس الفكرة، بس مفيهوش [[Port]]، فهيتصل على 22.

---

## ٣. اتأكد قبل ما تتصل: [[ssh -G]]

[[-G]] بيقول لـ ssh: «اقرا الإعدادات وادمجها واطبع النتيجة النهائية، **ومتتصلش**». بيطبع حوالي ٨٠ سطر (عندنا 83)، فبنفلتر الأربعة اللي يهمونا بـ [[grep -E]] (E يعني regex موسّع، و [[^]] يعني أول السطر):

~~~bash
ssh -G prod | grep -E "^(hostname|user|port|identityfile) "
ssh -G staging | grep -E "^(hostname|user|port|identityfile) "
~~~

~~~text الناتج (container العميل)
user deploy
hostname 172.18.0.2
port 2222
identityfile ~/.ssh/prod_ed25519

user deploy
hostname db
port 22
identityfile ~/.ssh/staging_ed25519
~~~

لاحظ: الأسامي بتطلع بحروف صغيرة، و [[staging]] أخد [[port 22]] الافتراضي. ولو كتبت اسم مش في الملف خالص ([[ssh -G nosuch]]) هيطلع [[hostname nosuch]] و [[user root]] (اسم اليوزر المحلي): يعني ssh مش لاقي بلوك، فمحدش غيّر حاجة.

---

## ٤. أول اتصال

~~~bash
ssh prod hostname
~~~

الكلمة بعد اسم السيرفر ([[hostname]]) أمر بيتنفّذ هناك ويرجع. أول مرة ssh ميعرفش السيرفر ده، فبيسألك:

~~~text الناتج أول مرة
The authenticity of host '[172.18.0.2]:2222 ([172.18.0.2]:2222)' can't be established.
ED25519 key fingerprint is SHA256:fH0B1x+HwlIlB4TYt0Ccxs1lq8b376O4RWT5C4n7s48.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '[172.18.0.2]:2222' (ED25519) to the list of known hosts.
bastion
~~~

- السطر التاني **بصمة السيرفر**، وبعد [[yes]] بتتحفظ في [[~/.ssh/known_hosts]] (درس known_hosts آخر التاب).
- العنوان مكتوب بين أقواس مربعة وبعده [[:2222]] لأن البورت مش 22، فـ ssh بيحفظ العنوان والبورت مع بعض.
- [[bastion]] في الآخر ده ناتج الأمر [[hostname]] على السيرفر: اسم الجهاز هناك.

المرة التانية مفيش أسئلة:

~~~bash
ssh prod "hostname; whoami"
~~~

~~~text الناتج
bastion
deploy
~~~

[[whoami]] طبع [[deploy]]: يعني [[User deploy]] اتطبّق من غير ما نكتبه.

---

## ٥. scp بنفس الاسم

~~~bash
scp file prod:/tmp/
ssh prod "ls -l /tmp/file"
~~~

[[prod:/tmp/]] معناها «فولدر [[/tmp/]] على السيرفر اللي اسمه prod». ‏scp قرا نفس الملف وأخد البورت والمفتاح واليوزر منه:

~~~text الناتج
-rw-r--r-- 1 deploy deploy 6 Oct  6 10:32 /tmp/file
~~~

الملف وصل ومملوك لـ [[deploy]]. (في ترمنال حقيقي scp بيطبع كمان سطر تقدّم فيه اسم الملف و 100%.)

---

## ٦. ssh بيقولك قرا إيه: [[ssh -v]]

[[-v]] يعني verbose: كلام كتير عن كل خطوة. بنفلتره:

~~~bash
ssh -v prod true 2>&1 | grep -E "Reading configuration|Applying options|Connecting to|Authenticated"
~~~

[[2>&1]] بيحوّل رسايل الـ debug (بتطلع على stderr) لنفس المكان بتاع الناتج العادي عشان [[grep]] يشوفها. و [[true]] أمر بيخلص على طول من غير ما يعمل حاجة.

~~~text الناتج
debug1: Reading configuration data /root/.ssh/config
debug1: /root/.ssh/config line 1: Applying options for prod
debug1: Reading configuration data /etc/ssh/ssh_config
debug1: Connecting to 172.18.0.2 [172.18.0.2] port 2222.
Authenticated to 172.18.0.2 ([172.18.0.2]:2222) using "publickey".
~~~

ssh قرا ملفك الأول، ولقى بلوك prod في السطر 1، وبعدين قرا ملف النظام [[/etc/ssh/ssh_config]] (إعدادات عامة لكل اليوزرز)، واتصل على 2222، ودخل بالمفتاح ([[publickey]]).

---

## ٧. على ويندوز

نفس الملف بالظبط في [[C:\Users\اسمك\.ssh\config]]، و [[ssh.exe]] المبني في ويندوز بيقراه. جربناه بملف تجربة ([[-F]] بيدّي ssh ملف config تاني بدل الافتراضي):

~~~powershell
ssh -F .\win_config -G prod | Select-String '^(hostname|user|port) '
ssh -F .\win_config prod "hostname; whoami"
~~~

~~~text الناتج (PowerShell 7 على ويندوز 11)
user deploy
hostname 127.0.0.1
port 2222
bastion
deploy
~~~

حاجتين خاصين بويندوز طلعولنا في التجربة:

- لو المسار فيه مسافات، حطه بين [[" "]] في الملف: [[IdentityFile "D:\my keys\prod_ed25519"]].
- ويندوز بيشيّك على صلاحيات **المفتاح الخاص** نفسه. مفتاح محطوط في فولدر بيورّث صلاحيات لـ [[Authenticated Users]] طلّع [[WARNING: UNPROTECTED PRIVATE KEY FILE!]] و ssh تجاهله. المفاتيح جوه [[C:\Users\اسمك\.ssh]] صلاحياتها مظبوطة لوحدها.
- Notepad بيحفظ [[config.txt]] من غير ما تاخد بالك. اتأكد بـ [[Get-ChildItem ~\.ssh]] إن الاسم [[config]] بس.

---

## الخلاصة

- الملف [[~/.ssh/config]]، صلاحياته 600، واسمه من غير امتداد.
- كل [[Host]] اسم مستعار، وتحته [[HostName]] و [[User]] و [[Port]] و [[IdentityFile]]. اللي متكتبش بياخد الافتراضي (22، اسمك المحلي، المفاتيح الافتراضية).
- [[ssh -G اسم]] يوريك اللي هيتطبّق من غير اتصال، و [[ssh -v]] يوريك السطر اللي اتطبّق منه.
- نفس الاسم بيشتغل مع [[scp]] و [[rsync]] و [[git]] وغيرهم.`,
          lines: [
            "اسم مختصر بتختاره.",
            "العنوان الحقيقي.",
            "اليوزر.",
            "البورت (لو مش 22).",
            "المفتاح.",
            "سيرفر تاني.",
            "بدومين.",
            "يوزر.",
            "مفتاح مختلف."
          ],
          sol: R`[[ssh prod]] يدخلك على طول من غير ما تكتب IP ولا بورت ولا مفتاح، وأول مرة بس هيسألك عن بصمة السيرفر. [[scp file prod:/tmp/]] هيرفع الملف ويطبع سطر تقدّم فيه اسمه و 100%، وتقدر تتأكد بـ [[ssh prod 'ls -l /tmp/file']]. جربنا ده على sshd محلي على بورت 2222 بنفس الشكل واشتغل من غير أي flag.

لو ssh قال [[Bad owner or permissions on ~/.ssh/config]] يبقى الـ chmod متعملش أو الملف مملوك ليوزر تاني. ولو قال [[Could not resolve hostname prod]] يبقى ssh مش شايف الملف: اتأكد إن اسمه [[config]] بالظبط من غير امتداد (Notepad على ويندوز بيضيف [[.txt]] لوحده) وإنه في [[~/.ssh/]]. ولو [[Permission denied (publickey)]] شوف مسار [[IdentityFile]] وإن المفتاح العام متحط في [[authorized_keys]] على السيرفر.`
        },
        {
          cmd: "Host * والأنماط",
          title: "إعدادات لكل السيرفرات",
          desc: "[[Host *]] بيطبّق على الكل، و [[Host *.example.com]] على مجموعة. الإعداد الأول اللي يطابق بيكسب، فالعام في آخر الملف. هنا بتحط الحاجات اللي عايزها دايمًا: keepalive، والمفتاح الافتراضي، والـ agent.",
          example: R`Host web1 web2 web3
    HostName %h.example.com
    User deploy

Host *.internal
    User admin
    ProxyJump bastion

Host *
    ServerAliveInterval 30
    ServerAliveCountMax 3
    AddKeysToAgent yes
    IdentitiesOnly yes`,
          try: "[[ssh -G prod]] بيطبع الإعدادات النهائية لـ host بعد دمج كل الأنماط. اتأكد إن اللي عايزه اتطبق.",
          flag: "script",
          deep: {
            why: "١٠ سيرفرات بنفس اليوزر ونفس المفتاح: مش هتكرر ١٠ مرات. والإعدادات اللي عايزها على كل اتصال (keepalive) مكانها الطبيعي مرة واحدة.",
            how: R`[[Host]] بياخد أكتر من اسم في سطر ([[web1 web2 web3]])، و [[%h]] في HostName بيتبدّل بالاسم اللي كتبته، فـ [[ssh web2]] بيروح [[web2.example.com]].

الأنماط: [[*]] أي حاجة، [[?]] حرف واحد، [[!]] استثناء ([[Host * !bastion]]).

الترتيب: ssh بيقرا الملف من فوق لتحت، ولكل إعداد أول قيمة يلاقيها بتثبت. فلو [[Host *]] في الأول وفيه User، مش هتقدر تغيّره في host بعده. عشان كده العام دايمًا في آخر الملف.

[[ServerAliveInterval 30]]: نبضة كل ٣٠ ثانية. [[ServerAliveCountMax 3]]: بعد ٣ نبضات من غير رد يعتبر الاتصال مات (بدل ما يعلّق للأبد).

[[AddKeysToAgent yes]]: أول مرة تستخدم مفتاح بـ passphrase، بيتضاف للـ agent لوحده.

[[IdentitiesOnly yes]]: استخدم المفتاح المحدد بس، متجرّبش كل اللي في الـ agent (بعض السيرفرات بتحظرك بعد ٥ محاولات بمفاتيح غلط).

[[ssh -G host]] بيطبع الإعدادات النهائية بعد الدمج: أفضل طريقة تتأكد.`,
            when: "Host * من أول يوم بالـ keepalive. والأنماط لما السيرفرات بتزيد.",
            mistakes: "Host * في أول الملف فيغطي على الباقي. وتنسى إن IdentitiesOnly محتاجة IdentityFile في كل host."
          },
          teach: R`## الفكرة: بلوك واحد لكذا سيرفر

في الدرس اللي فات كل [[Host]] كان اسم واحد. هنا [[Host]] بياخد **أكتر من اسم** أو **نمط** (pattern) يطابق أسامي كتير، و [[Host *]] بيطابق أي اسم. هنفك البلوكات التلاتة، وبعدين نشوف بـ [[ssh -G]] إيه اللي اتطبّق على كل اسم.

> اتجرّب في container [[ubuntu:24.04]] (OpenSSH 9.6) بالملف ده محفوظ باسم [[c2]] ومتمرر بـ [[-F c2]]. الأسامي هنا وهمية، و [[-G]] مبيتصلش، فمش محتاج سيرفرات.

---

## ١. [[Host web1 web2 web3]] و [[%h]]

~~~text
Host web1 web2 web3
    HostName %h.example.com
    User deploy
~~~

- الأسامي بعد [[Host]] مفصولة بمسافات، والبلوك بيتطبّق لو كتبت أي واحد منهم.
- [[%h]] اسمه token: ssh بيبدّله بالاسم اللي انت كتبته. فـ [[ssh web2]] يبقى HostName = [[web2.example.com]].

~~~bash
ssh -F c2 -G web2 | grep -E "^(hostname|user) "
~~~

~~~text الناتج
user deploy
hostname web2.example.com
~~~

---

## ٢. النمط [[*.internal]]

~~~text
Host *.internal
    User admin
    ProxyJump bastion
~~~

رموز الأنماط في [[Host]]:

| الرمز | معناه | مثال |
|---|---|---|
| [[*]] | أي عدد حروف (حتى صفر) | [[*.internal]] يطابق [[db.internal]] و [[a.b.internal]] |
| [[?]] | حرف واحد بالظبط | [[web?]] يطابق [[web1]] ومش [[web10]] |
| [[!]] | استثناء | [[Host * !bastion]] = كل حاجة ما عدا bastion |

[[ProxyJump bastion]] معناها «ادخل عن طريق bastion» (الدرس الجاي). جربنا [[ssh -F c2 -G db.internal]]:

~~~text الناتج
user admin
hostname db.internal
proxyjump bastion
~~~

لاحظ إن [[hostname]] فضل [[db.internal]] زي ما كتبته، لأن البلوك مفيهوش [[HostName]].

وجربنا [[?]] و [[!]] بملف صغير فيه [[Host * !bastion]] (User admin) و [[Host web?]] (Port 2200):

~~~text الناتج
bastion: user root port 22
web1:    user admin port 2200
web10:   user admin port 22
~~~

[[bastion]] اتستثنى فأخد اليوزر الافتراضي، و [[web10]] مطابقش [[web?]] لأن بعد web حرفين مش حرف.

---

## ٣. [[Host *]] والسطور الأربعة

~~~text
Host *
    ServerAliveInterval 30
    ServerAliveCountMax 3
    AddKeysToAgent yes
    IdentitiesOnly yes
~~~

| السطر | معناه |
|---|---|
| [[ServerAliveInterval 30]] | لو مفيش داتا من السيرفر ٣٠ ثانية، ابعتله رسالة صغيرة جوه الاتصال المشفّر تسأله «انت عايش؟» |
| [[ServerAliveCountMax 3]] | لو ٣ رسايل ورا بعض من غير رد (يعني حوالي ٩٠ ثانية)، اقفل الاتصال وقول، بدل ما الترمنال يفضل متجمّد |
| [[AddKeysToAgent yes]] | أول مرة تفك مفتاح بالـ passphrase، حطه في الـ ssh-agent عشان متتسألش تاني |
| [[IdentitiesOnly yes]] | جرّب المفاتيح المكتوبة في [[IdentityFile]] بس، مش كل اللي في الـ agent |

قارن [[prod]] (مش مذكور في الملف غير في [[Host *]]) مع ملف فاضي خالص:

~~~text الناتج: ssh -G prod بملف c2 وبملف فاضي
                      c2      ملف فاضي
serveraliveinterval   30      0
serveralivecountmax   3       3
addkeystoagent        true    false
identitiesonly        yes     no
~~~

- [[0]] في [[serveraliveinterval]] يعني «متبعتش نبضات خالص»، وده الافتراضي.
- [[-G]] بيطبع [[yes]] بتاعة AddKeysToAgent كـ [[true]]، نفس المعنى.

---

## ٤. القاعدة الأهم: أول قيمة بتكسب

ssh بيقرا الملف من فوق لتحت، وبيدخل **كل** بلوك اسمه بيطابق، بس لكل إعداد بياخد **أول** قيمة يقابلها ويتجاهل اللي بعدها. جربنا ملفين:

~~~text ملف 1: العام فوق
Host *
    User root

Host prod
    User deploy
~~~

~~~text ملف 2: العام تحت
Host prod
    User deploy

Host *
    User root
~~~

~~~text الناتج: ssh -G prod | grep "^user "
ملف 1:  user root
ملف 2:  user deploy
~~~

في الملف الأول [[Host *]] طابق الأول فثبّت [[root]]، وبلوك prod اتجاهل. عشان كده العام دايمًا **آخر الملف**: يملا الإعدادات اللي البلوكات اللي فوقه مقالتهاش بس.

---

## ٥. [[ssh -G]] أول سطر فيه

~~~text الناتج: ssh -F c2 -G web2 | head -5
host web2
user deploy
hostname web2.example.com
port 22
addressfamily any
~~~

[[head -5]] أول ٥ سطور. السطر الأول [[host]] الاسم اللي كتبته، والباقي القيم النهائية بعد الدمج. أي نتيجة غريبة: ابدأ من هنا.

---

## الخلاصة

| اللي كتبته | البلوكات اللي اتطبقت |
|---|---|
| [[web2]] | [[Host web1 web2 web3]] ثم [[Host *]] |
| [[db.internal]] | [[Host *.internal]] ثم [[Host *]] |
| [[prod]] | [[Host *]] بس |

- [[Host]] بياخد أسامي كتير وأنماط بـ [[*]] و [[?]] و [[!]]، و [[%h]] = الاسم اللي كتبته.
- لكل إعداد أول قيمة بتكسب، فـ [[Host *]] في الآخر.
- [[ssh -G]] بيوريك النتيجة من غير اتصال، فجرّب بيه أي اسم قبل ما تعتمد عليه.`,
          lines: [
            "تلات أسامي في سطر.",
            "%h بيتبدّل بالاسم اللي كتبته.",
            "نفس اليوزر للتلاتة.",
            "أي حاجة بتنتهي بـ .internal.",
            "يوزر.",
            "عبر bastion.",
            "لكل السيرفرات (في الآخر عشان ميغطيش على اللي فوق).",
            "نبضة كل ٣٠ ثانية.",
            "بعد ٣ من غير رد اعتبره وقع.",
            "ضيف المفتاح للـ agent أول استخدام.",
            "استخدم المفتاح المحدد بس."
          ],
          sol: R`[[ssh -G prod]] بيطبع حوالي ٨٠ سطر، كل إعداد بقيمته النهائية وبحروف صغيرة. دوّر بـ [[ssh -G prod | grep -E '^(hostname|user|port|identityfile|serveraliveinterval|identitiesonly) ']] وهتلاقي حاجة زي: [[user deploy]] و [[hostname 203.0.113.10]] و [[port 2222]] من بلوك prod، و [[serveraliveinterval 30]] و [[identitiesonly yes]] من [[Host *]]. ولو جربت [[ssh -G web2]] هتلاقي [[hostname web2.example.com]] لأن [[%h]] اتبدلت باسم الـ host، و [[ssh -G db.internal]] يطلع [[user admin]] و [[proxyjump bastion]].

القاعدة اللي بتفسر أي نتيجة غريبة: لكل إعداد، أول قيمة ssh يقابلها من فوق لتحت هي اللي بتكسب. عشان كده [[Host *]] لازم في الآخر. لو حطيته فوق وفيه [[User root]]، هتلاقي [[ssh -G prod]] بيقول [[user root]] مع إن بلوك prod فيه deploy. و [[-G]] مبيتصلش بالسيرفر خالص، فتقدر تجربه على أسامي وهمية.`
        },
        {
          cmd: "ProxyJump",
          title: "سيرفر ورا سيرفر",
          desc: "قاعدة البيانات أو السيرفرات الداخلية مش على النت، بتوصلها من سيرفر واحد مكشوف (bastion). [[ProxyJump]] بيخلي ssh يدخل الأول ومنه للتاني في أمر واحد، والاتصال متشفّر من طرف لطرف.",
          example: R`Host bastion
    HostName 203.0.113.5
    User deploy

Host db-internal
    HostName 10.0.0.12
    User deploy
    ProxyJump bastion

# equivalent one-off:
ssh -J deploy@203.0.113.5 deploy@10.0.0.12`,
          try: "[[ssh db-internal]] و [[scp backup.dump db-internal:/tmp/]] بيشتغلوا عبر bastion لوحدهم.",
          flag: "script",
          deep: {
            why: "الأصح أمنيًا إن قاعدة البيانات والسيرفرات الداخلية مش عليها IP عام. بتدخل من سيرفر واحد محمي (bastion أو jump host). من غير ProxyJump ده اتنين ssh ورا بعض ومفيش scp مباشر.",
            how: R`[[ProxyJump bastion]]: ssh بيتصل بـ bastion الأول، ومن خلاله بيفتح اتصال TCP للسيرفر الداخلي، وبيعمل مصافحة SSH كاملة مع الداخلي عبر الممر ده. النتيجة: التشفير بينك وبين الداخلي مباشرة، و bastion بيمرر بايتات مش شايفها. مفتاحك مش لازم يبقى على bastion.

الـ bastion نفسه Host في الملف، وممكن يبقى له ProxyJump كمان (سلسلة).

[[-J]] نفس الحاجة من سطر الأوامر لمرة واحدة، وممكن كذا واحد بفواصل.

بعد كده كل أدوات ssh بتشتغل مع db-internal مباشرة: scp و rsync و LocalForward (tunnel للقاعدة الداخلية عبر bastion في أمر واحد).

الطريقة القديمة كانت [[ProxyCommand ssh bastion -W %h:%p]]، ProxyJump أبسط ونفس النتيجة.

على bastion: اليوزر يفضل من غير shell كامل لو هيبقى للمرور بس.`,
            when: "أي بنية فيها سيرفرات داخلية. و VPCs على الكلاود.",
            mistakes: "تنسخ مفتاحك الخاص على bastion «عشان يعدّي». ProxyJump مش محتاجه. وتنسى HostName للداخلي بالـ IP الخاص مش العام."
          },
          teach: R`## الفكرة: سيرفر مش شايفه، بتوصله من سيرفر شايفه

جهازك يقدر يوصل لـ [[bastion]] بس. السيرفر التاني ([[db-internal]]) على شبكة داخلية، و bastion بس هو اللي شايفه. [[ProxyJump]] بيخلي ssh يعمل الطريق ده لوحده في أمر واحد.

> عشان نجرّب ده بجد عملنا ٣ containers [[ubuntu:24.04]]: جهاز عميل، و bastion على شبكتين، و db على شبكة داخلية بس (Docker network بـ [[--internal]]). في التجربة bastion عنوانه [[172.18.0.2]] بدل [[203.0.113.5]]، و db عنوانه [[172.19.0.2]] بدل [[10.0.0.12]]. والملف متمرر بـ [[-F c3]].

---

## ١. الأول: اتأكد إنك فعلًا مش شايفه

~~~bash
ssh -o ConnectTimeout=4 deploy@172.19.0.2 true
~~~

[[-o]] بيدّي ssh إعداد واحد من سطر الأوامر (أي كلمة من كلمات الملف)، و [[ConnectTimeout=4]] يعني متستناش أكتر من ٤ ثواني.

~~~text الناتج (من جهاز العميل)
ssh: connect to host 172.19.0.2 port 22: Connection timed out
~~~

مفيش طريق مباشر. ده بالظبط شكل قاعدة بيانات الإنتاج المحمية.

---

## ٢. البلوكين سطر سطر

~~~text
Host bastion
    HostName 203.0.113.5
    User deploy

Host db-internal
    HostName 10.0.0.12
    User deploy
    ProxyJump bastion
~~~

- بلوك [[bastion]] عادي زي الدرس الأول: العنوان **العام** واليوزر.
- [[HostName 10.0.0.12]] للداخلي: ده IP **خاص** (الرينج [[10.x.x.x]] محجوز للشبكات الداخلية ومش بيتشاف من النت). bastion هو اللي هيتصل بيه، فلازم العنوان اللي bastion شايفه.
- [[ProxyJump bastion]]: [[bastion]] هنا اسم البلوك اللي فوق، يعني ssh هيقرا إعداداته (العنوان واليوزر والمفتاح) من نفس الملف.

~~~bash
ssh -F c3 -G db-internal | grep -E "^(hostname|user|proxyjump) "
~~~

~~~text الناتج
user deploy
hostname 172.19.0.2
proxyjump bastion
~~~

---

## ٣. الاتصال

~~~bash
ssh -F c3 db-internal "hostname; hostname -I"
~~~

[[hostname -I]] بيطبع الـ IPs بتاعة الجهاز اللي الأمر اتنفّذ عليه.

~~~text الناتج أول مرة
Warning: Permanently added '172.18.0.2' (ED25519) to the list of known hosts.
Warning: Permanently added '172.19.0.2' (ED25519) to the list of known hosts.
db
172.19.0.2
~~~

ssh حفظ **بصمتين**: bastion والداخلي. ده معناه إن فيه مصافحة SSH كاملة مع كل واحد فيهم، مش مع bastion بس.

---

## ٤. بيحصل إيه من تحت: [[ssh -v]]

~~~bash
ssh -v db-internal true 2>&1 | grep -iE "proxy|Authenticated to"
~~~

~~~text الناتج (الملف في ~/.ssh/config)
debug1: Setting implicit ProxyCommand from ProxyJump: ssh -v -W '[%h]:%p' bastion
debug1: Executing proxy command: exec ssh -v -W '[172.19.0.2]:22' bastion
Authenticated to 172.18.0.2 ([172.18.0.2]:22) using "publickey".
Authenticated to 172.19.0.2 (via proxy) using "publickey".
~~~

نقراها سطر سطر:

1. ssh حوّل [[ProxyJump bastion]] لأمر ssh تاني بيشغّله هو بنفسه.
2. الأمر ده [[ssh -W '[172.19.0.2]:22' bastion]]: ادخل bastion، و [[-W]] معناها «متفتحليش shell، وصّل الـ input والـ output بتوعي بـ [[172.19.0.2]] بورت 22». [[%h]] و [[%p]] اتبدلوا بالعنوان والبورت.
3. اتصال تاني بـ bastion نجح بالمفتاح.
4. جوه الممر ده، مصافحة كاملة مع الداخلي، و [[via proxy]] يعني إنها عدّت من الممر.

الـ [[-v]] اتنقل للأمر الداخلي لوحده. والمفتاح في المرتين اتقرا من **جهازك**. على bastion نفسه مفيش غير [[authorized_keys]]:

~~~text الناتج: ssh bastion "ls -a ~/.ssh"
.
..
authorized_keys
~~~

---

## ٥. السطر الأخير: [[-J]] لمرة واحدة

~~~bash
ssh -J deploy@203.0.113.5 deploy@10.0.0.12
~~~

[[-J]] = ProxyJump من سطر الأوامر، من غير ما تكتب حاجة في الملف. اتجرّب بعناوين التجربة:

~~~bash
ssh -i ~/.ssh/lab_ed25519 -J deploy@172.18.0.2 deploy@172.19.0.2 hostname
~~~

~~~text الناتج
db
~~~

ولو فيه كذا قفزة: [[-J a,b]] (بفاصلة، بالترتيب).

---

## ٦. scp والوقت

~~~bash
scp -F c3 backup.dump db-internal:/tmp/
ssh -F c3 db-internal "ls -l /tmp/backup.dump"
~~~

~~~text الناتج
-rw-r--r-- 1 deploy deploy 5 Oct  6 10:35 /tmp/backup.dump
~~~

نسخ مباشر لسيرفر مش متشاف، من غير ما تنسخ على bastion الأول. وقارنّا الوقت بـ [[time]]: [[ssh bastion true]] أخد 0.21 ثانية، و [[ssh db-internal true]] أخد 0.37، لأنهم اتصالين ورا بعض.

---

## ٧. لو bastion قافل التمرير

قفلنا [[AllowTcpForwarding no]] في [[sshd_config]] بتاع bastion وجربنا تاني:

~~~text الناتج
channel 0: open failed: administratively prohibited: open failed
stdio forwarding failed
Connection closed by UNKNOWN port 65535
~~~

يعني الدخول لـ bastion نفسه نجح، بس هو رفض يفتح ممر. الحل على bastion مش عندك.

---

## ٨. على ويندوز

نفس الملف شغال مع [[ssh.exe]] بتاع ويندوز (9.5)، وطلع نفس [[Authenticated to ... (via proxy)]]. حاجة واحدة اكتشفناها: لو انت مدّي ssh ملف config بـ [[-F]] ومساره فيه مسافات، الـ ProxyCommand اللي بيتعمل لوحده بيكسر المسار، وبيطلع [[hostname contains invalid characters]]. مع الملف الافتراضي [[C:\Users\اسمك\.ssh\config]] مفيش مشكلة لأنه مش بيتمرر بـ [[-F]].

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[HostName 10.0.0.12]] | العنوان اللي **bastion** شايفه |
| [[ProxyJump bastion]] | ادخل bastion الأول (بإعدادات بلوكه) |
| [[ssh -W host:port]] | اللي ssh بيشغّله من تحت: ممر من غير shell |
| [[-J user@host]] | نفس الحاجة لمرة واحدة من سطر الأوامر |

- التشفير والمصادقة بينك وبين الداخلي مباشرة، و bastion بيمرر بايتات بس.
- مفتاحك الخاص ميتنسخش على bastion أبدًا.
- [[ssh -v]] بيأكد إنه عدّى ([[via proxy]]).`,
          lines: [
            "السيرفر المكشوف.",
            "عنوانه العام.",
            "يوزر.",
            "الداخلي.",
            "IP خاص مش على النت.",
            "يوزر.",
            "ادخله عبر bastion.",
            "نفس الحاجة لمرة واحدة بـ -J."
          ],
          sol: R`الاتنين هيشتغلوا كأن db-internal قدامك، وهتلاحظ إنهم أبطأ شوية (اتصالين مش واحد). عشان تتأكد إنه عدّى عبر bastion فعلًا شغّل [[ssh -v db-internal true 2>&1 | grep -i proxy]]، هيطلع [[Setting implicit ProxyCommand from ProxyJump: ssh -v -W '[%h]:%p' bastion]] وبعدين [[Authenticated to 10.0.0.12 (via proxy) using "publickey".]]. جربناها بسيرفر محلي والسطرين دول طلعوا بالظبط.

المفتاح بيتقري من جهازك في المرحلتين، مش من bastion، فمش محتاج تحط مفتاحك الخاص على bastion. ولو ظهر [[channel 0: open failed: administratively prohibited]] يبقى bastion قافل [[AllowTcpForwarding]] في sshd_config بتاعه. ولو الاتصال بـ bastion نفسه نجح بس بعده timeout، يبقى [[10.0.0.12]] مش متشاف من bastion (IP غلط أو firewall داخلي).`
        },
        {
          cmd: "مفاتيح متعددة",
          title: "GitHub شخصي وشغل بنفس الجهاز",
          desc: "حسابين GitHub بمفتاحين. GitHub بيعرفك من المفتاح، فلازم تقوله أنهي مفتاح لأنهي حساب. الحيلة: Host وهمي لكل حساب، وتستخدمه في remote URL. و [[IdentitiesOnly]] يمنع ssh يجرّب كل مفاتيحك.",
          example: R`Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519
    IdentitiesOnly yes

Host github-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/work_ed25519
    IdentitiesOnly yes

# in the work repo:
git remote set-url origin git@github-work:company/repo.git`,
          try: "[[ssh -T github-work]] المفروض يرد باسم حساب الشغل، و [[ssh -T github.com]] بالشخصي.",
          flag: "script",
          deep: {
            why: "GitHub بيقبل المفتاح الواحد في حساب واحد بس. شغل وشخصي = مفتاحين. ومن غير config، ssh بيبعت أول مفتاح يلاقيه، فتعمل push بالحساب الغلط أو يترفض.",
            how: R`الفكرة: اسمين مختلفين لنفس السيرفر. [[Host github.com]] الشخصي بمفتاحه، و [[Host github-work]] (اسم وهمي) بـ [[HostName github.com]] ومفتاح الشغل.

الـ remote URL في مشاريع الشغل: [[git@github-work:company/repo.git]] بدل [[git@github.com:...]]. Git بيمرر github-work لـ ssh، و ssh بيلاقيه في الملف ويستخدم مفتاح الشغل ويتصل بـ github.com.

[[IdentitiesOnly yes]] هنا أساسية: من غيرها ssh بيجرّب كل المفاتيح في الـ agent بالترتيب، وأول واحد GitHub يقبله بيحدد الحساب، وممكن يبقى الشخصي.

[[User git]] لأن GitHub كل الاتصالات بيوزر git.

[[ssh -T]] بيختبر: GitHub بيرد «Hi username!» فتعرف أنهي حساب.

بديل لكل الـ repos في فولدر معين: في [[~/.gitconfig]] قسم [[[includeIf "gitdir:~/work/"]]] بيحمّل config تاني فيه [[core.sshCommand = ssh -i ~/.ssh/work_ed25519]]، فمش محتاج تغيّر remote URLs.

ونفس الحيلة لسيرفرين بنفس الدومين بيوزرز مختلفين.`,
            when: "أول ما يبقى عندك حسابين GitHub أو GitLab.",
            mistakes: "clone بـ git@github.com في مشروع شغل فيروح بالمفتاح الشخصي. و commits باسم وإيميل الحساب الغلط (ده Git config مش SSH)."
          },
          teach: R`## الفكرة: نفس السيرفر باسمين

GitHub كل الناس بتدخله بنفس اليوزر [[git]] على نفس العنوان. هو بيعرف انت مين من **المفتاح** اللي بتقدّمه بس. فلو عندك حسابين، لازم ssh يقدّم المفتاح الصح. الحيلة: بلوكين بأسامي مختلفة، الاتنين [[HostName github.com]]، وكل واحد بمفتاحه.

> مقدرناش نجرّب على GitHub بحسابين حقيقيين، فعملنا نسخة مصغّرة من نفس الفكرة: سيرفر [[sshd]] في container [[ubuntu:24.04]] عليه يوزر [[git]]، وفي [[authorized_keys]] بتاعه المفتاحين، وكل مفتاح مربوط بأمر بيطبع اسم «حساب» مختلف (خاصية [[command=]] في authorized_keys). ده تقريبًا اللي GitHub بيعمله: المفتاح بيحدد الحساب. في التجربة الأسامي [[gitlab-lab]] و [[gitlab-lab-work]] والعنوان [[172.18.0.2]].

---

## ١. البلوك الشخصي

~~~text
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519
    IdentitiesOnly yes
~~~

- [[Host github.com]]: الاسم المستعار هنا هو نفس الدومين، عشان أي [[git@github.com:...]] عادي (الـ URLs اللي GitHub بيديهالك) يمسك البلوك ده.
- [[User git]]: GitHub كله بيوزر واحد. (في الـ URL [[git@github.com]] الـ [[git@]] هو اليوزر.)
- [[IdentityFile]]: المفتاح الشخصي.
- [[IdentitiesOnly yes]]: «قدّم المفتاح ده **بس**». هنشوف تحت ليه دي أهم سطر.

## ٢. البلوك التاني: اسم وهمي

~~~text
Host github-work
    HostName github.com
    User git
    IdentityFile ~/.ssh/work_ed25519
    IdentitiesOnly yes
~~~

[[github-work]] مش دومين ومحدش يعرفه غير ملفك. ssh بيلاقيه، ويروح لـ [[github.com]] الحقيقي، بمفتاح الشغل. نتأكد من غير نت:

~~~bash
ssh -G github-work | grep -E "^(hostname|user|identityfile|identitiesonly) "
~~~

~~~text الناتج (نسخة التجربة)
user git
hostname 172.18.0.2
identitiesonly yes
identityfile ~/.ssh/work_ed25519
~~~

---

## ٣. اختبار الحسابين: [[ssh -T]]

[[-T]] يعني «متطلبش terminal»، لأن GitHub مبيديكش shell أصلًا، هو بيرد برسالة ويقفل.

~~~bash
ssh -T gitlab-lab; echo "exit=$?"
ssh -T gitlab-lab-work; echo "exit=$?"
~~~

[[$?]] بيطبع الـ exit code بتاع آخر أمر.

~~~text الناتج (التجربة)
Hi personal-user! You have successfully authenticated, but this lab does not provide shell access.
exit=1
Hi work-user! You have successfully authenticated, but this lab does not provide shell access.
exit=1
~~~

نفس العنوان ونفس اليوزر، وكل اسم دخل بحساب مختلف. GitHub بيرد بنفس الشكل بالظبط ([[Hi USERNAME! You've successfully authenticated, but GitHub does not provide shell access.]]) وبرضه exit code 1، وده طبيعي مش خطأ.

---

## ٤. ليه [[IdentitiesOnly yes]] أساسية

شيلنا السطر ده من البلوكين، وحطينا المفتاح **الشخصي** في الـ ssh-agent (ده اللي بيحصل عادي لما تستخدمه مرة):

~~~bash
ssh -T gitlab-lab-work
~~~

~~~text الناتج من غير IdentitiesOnly
Hi personal-user! You have successfully authenticated, but this lab does not provide shell access.
~~~

كتبنا اسم الشغل، ودخلنا بالحساب **الشخصي**. [[ssh -v]] بيقول ليه:

~~~text الناتج: ssh -v -T gitlab-lab-work (مختصر)
Will attempt key: lab@sshc01 ED25519 SHA256:YaDw... agent
Will attempt key: /root/.ssh/work_ed25519 ED25519 SHA256:79RL... explicit
Offering public key: lab@sshc01 ED25519 SHA256:YaDw... agent
Server accepts key: lab@sshc01 ED25519 SHA256:YaDw... agent
~~~

ssh بيجرّب مفاتيح الـ agent **الأول** ([[agent]])، وبعدين اللي في الملف ([[explicit]]). السيرفر قبل أول مفتاح يعرفه، والشخصي معروف، فخلصت. ورجّعنا [[IdentitiesOnly yes]]:

~~~text الناتج مع IdentitiesOnly
Will attempt key: /root/.ssh/work_ed25519 ED25519 SHA256:79RL... explicit
Offering public key: /root/.ssh/work_ed25519 ED25519 SHA256:79RL... explicit
Server accepts key: /root/.ssh/work_ed25519 ED25519 SHA256:79RL... explicit
~~~

مفتاح واحد بس اتعرض، والصح.

---

## ٥. السطر الأخير: [[git remote set-url]]

~~~bash
git remote set-url origin git@github-work:company/repo.git
~~~

- [[git remote]] بيتعامل مع العناوين اللي الـ repo بيعمل منها push و pull، و [[origin]] اسم العنوان الافتراضي.
- [[set-url]] بيغيّر عنوانه.
- [[git@github-work:company/repo.git]]: اليوزر [[git]]، والسيرفر [[github-work]] (الاسم الوهمي)، وبعد [[:]] مسار الـ repo على GitHub.

Git مش بيفهم الاسم، هو بيدّيه لـ ssh زي ما هو، و ssh يلاقيه في الملف. جربناه:

~~~text الناتج: git remote -v بعد التغيير
origin	git@github-work:company/repo.git (fetch)
origin	git@github-work:company/repo.git (push)
~~~

ومن هنا أي [[git push]] في الـ repo ده بيروح بمفتاح الشغل. الـ repos الشخصية تفضل [[git@github.com:...]] فتمسك البلوك الأول.

---

## الخلاصة

| اللي في الـ URL | البلوك | المفتاح | الحساب |
|---|---|---|---|
| [[git@github.com:me/x.git]] | [[Host github.com]] | [[id_ed25519]] | الشخصي |
| [[git@github-work:company/repo.git]] | [[Host github-work]] | [[work_ed25519]] | الشغل |

- المفتاح هو اللي بيحدد الحساب، مش اليوزر ولا العنوان.
- من غير [[IdentitiesOnly yes]]، مفاتيح الـ agent بتتجرّب الأول وممكن تدخل بالحساب الغلط.
- [[ssh -T اسم]] أسرع طريقة تعرف إنت داخل بأنهي حساب.`,
          lines: [
            "الشخصي (نفس اسم الدومين).",
            "العنوان.",
            "GitHub كله بيوزر git.",
            "المفتاح الشخصي.",
            "ده بس، متجرّبش غيره.",
            "اسم وهمي للشغل.",
            "نفس العنوان.",
            "git.",
            "مفتاح الشغل.",
            "ده بس.",
            "في مشروع الشغل: الـ remote بالاسم الوهمي."
          ],
          sol: R`الاتنين هيرجعوا exit code 1 ورسالة زي [[Hi work-user! You've successfully authenticated, but GitHub does not provide shell access.]]، والفرق في الاسم بعد Hi: [[ssh -T github-work]] باسم حساب الشغل، و [[ssh -T github.com]] باسمك الشخصي. الـ exit code 1 طبيعي هنا لأن GitHub مبيدكش shell.

لو الاتنين ردوا بنفس الاسم، غالبًا [[IdentitiesOnly yes]] ناقص، فـ ssh بيجرب المفاتيح اللي في الـ agent الأول، وGitHub بيقبل أول مفتاح يعرفه. ولو [[Permission denied (publickey)]] يبقى المفتاح العام بتاع الشغل مش متضاف في حساب الشغل. وتقدر تتأكد إن الاسم بيتحول صح من غير نت: [[ssh -G github-work | grep -E '^(hostname|identityfile) ']] يطلع [[hostname github.com]] والمفتاح بتاع الشغل.`
        },
        {
          cmd: "keepalive و multiplexing",
          title: "اتصال مش بيقع، وثاني ssh لحظي",
          desc: "[[ServerAliveInterval]] بيبعت نبضة كل ٣٠ ثانية فالراوتر ميقفلش الاتصال الصامت. و [[ControlMaster]] بيعيد استخدام اتصال مفتوح: أول ssh بياخد ثانية، والتاني والـ scp اللي بعده لحظي من غير مصافحة جديدة.",
          example: R`Host *
    ServerAliveInterval 30
    ServerAliveCountMax 3
    ControlMaster auto
    ControlPath ~/.ssh/cm-%r@%h:%p
    ControlPersist 10m

# check / close the shared connection:
ssh -O check prod
ssh -O exit prod`,
          try: "افتح [[ssh prod]] في نافذة، وفي نافذة تانية [[time ssh prod true]]: أقل من ٠.١ ثانية.",
          flag: "script",
          deep: {
            why: "اتصال ssh صامت لدقايق بيتقفل من الراوتر أو الفايروول، وترجع تلاقي الترمنال متجمّد. و deploy بيعمل ٥ أوامر ssh ورا بعض كل واحد بمصافحة كاملة.",
            how: R`[[ServerAliveInterval]]: ssh بيبعت رسالة صغيرة للسيرفر كل ٣٠ ثانية عبر الاتصال المشفّر، فالراوتر شايف نشاط ومش بيقفله. و [[CountMax 3]]: لو ٣ رسايل من غير رد، ssh بيقفل ويقولك بدل ما يعلّق.

الـ multiplexing: [[ControlMaster auto]] أول اتصال لـ host بيبقى «الأساسي» وبيعمل socket في [[ControlPath]]. أي ssh أو scp تاني لنفس الـ host بيلاقي الـ socket ويعدّي من الاتصال المفتوح: مفيش مصافحة ولا مصادقة تانية، فبيفتح في أجزاء من الثانية. [[%r@%h:%p]] في المسار عشان socket لكل يوزر وسيرفر وبورت.

[[ControlPersist 10m]]: الاتصال الأساسي يفضل مفتوح ١٠ دقايق بعد ما تقفل آخر جلسة، فـ ssh بعدها لحظي.

[[-O check]] هل فيه اتصال مشترك، و [[-O exit]] يقفله (مفيد لو السيرفر عمل ريستارت والـ socket بقى قديم).

مع الـ multiplexing، سكربت deploy بـ ١٠ أوامر ssh بيبقى بنفس سرعة أمر واحد.

على ويندوز ControlMaster مش مدعوم في OpenSSH المبني، الباقي شغال.`,
            when: "Host * في كل جهاز. الـ multiplexing لما تعمل أوامر متكررة على نفس السيرفر.",
            mistakes: "ControlPath في مكان مش موجود أو طويل (Unix sockets ليها حد في الطول). و socket قديم بعد ريستارت السيرفر: -O exit."
          },
          teach: R`## الفكرة: حاجتين مختلفتين في بلوك واحد

- **keepalive** (أول سطرين): نبضات عشان الاتصال الصامت ميتقفلش، ولو السيرفر مات فعلًا ssh يعرف ويقفل.
- **multiplexing** (التلات سطور اللي بعدهم): أول اتصال بيفضل مفتوح، وأي ssh أو scp بعده لنفس السيرفر بيركب عليه من غير مصافحة جديدة.

> اتجرّب في container [[ubuntu:24.04]] عميل، على سيرفر [[sshd]] في container تاني (بلوك [[prod]] من الدرس الأول، بورت 2222، العنوان [[172.18.0.2]]).

---

## ١. keepalive

~~~text
ServerAliveInterval 30
ServerAliveCountMax 3
~~~

الراوترات والفايروولات بتقفل الاتصالات اللي مفيهاش ولا بايت لفترة. [[ServerAliveInterval 30]]: لو عدّى ٣٠ ثانية من غير داتا من السيرفر، ssh يبعتله رسالة صغيرة جوه الاتصال المشفّر. والرد عليها نشاط، فالراوتر شايف الاتصال عايش.

[[ServerAliveCountMax 3]]: لو ٣ رسايل ورا بعض مرجعلهاش رد، يعني حوالي ٣٠ × ٣ = ٩٠ ثانية، ssh يقفل ويطبع [[Timeout, server ... not responding]] (الرسالة من الـ docs) بدل ما الترمنال يفضل متجمّد.

---

## ٢. multiplexing سطر سطر

~~~text
ControlMaster auto
ControlPath ~/.ssh/cm-%r@%h:%p
ControlPersist 10m
~~~

| السطر | معناه |
|---|---|
| [[ControlMaster auto]] | لو فيه اتصال مفتوح استخدمه، ولو مفيش افتح واحد وخلّيه «الأساسي» (master) |
| [[ControlPath ...]] | مكان ملف الـ socket اللي الاتصالات التانية بتلاقي الأساسي منه |
| [[ControlPersist 10m]] | خلّي الأساسي مفتوح ١٠ دقايق بعد ما آخر جلسة تقفل |

الـ socket ملف خاص بيستخدموه برامج على نفس الجهاز يكلّموا بعض (Unix socket)، مش ملف عادي. والـ tokens في المسار:

| token | بيتبدّل بـ |
|---|---|
| [[%r]] | اليوزر على السيرفر (remote user) |
| [[%h]] | العنوان الحقيقي (HostName) |
| [[%p]] | البورت |

عشان كل يوزر وسيرفر وبورت ليه socket لوحده. نشوف القيم النهائية:

~~~bash
ssh -G prod | grep -E "^(serveralive|control)"
~~~

~~~text الناتج
controlmaster auto
serveralivecountmax 3
serveraliveinterval 30
controlpath /root/.ssh/cm-deploy@172.18.0.2:2222
controlpersist 600
~~~

[[~]] اتفكت لمسار كامل والـ tokens اتبدلت، و [[10m]] بقت [[600]] لأن [[-G]] بيطبع الوقت بالثواني.

---

## ٣. التجربة خطوة خطوة

### قبل أي اتصال: [[ssh -O check]]

[[-O]] بيبعت أمر تحكم (control command) للاتصال الأساسي بدل ما يفتح جلسة. و [[check]] يعني «انت شغال؟».

~~~text الناتج
Control socket connect(/root/.ssh/cm-deploy@172.18.0.2:2222): No such file or directory
~~~

مفيش socket لسه.

### أول اتصال

~~~bash
time ssh prod true
ls -l ~/.ssh/cm-*
~~~

[[time]] بيقيس الأمر اللي بعده، و [[real]] هو الوقت الفعلي.

~~~text الناتج
real	0m0.242s
srw------- 1 root root 0 Oct  6 10:36 /root/.ssh/cm-deploy@172.18.0.2:2222
~~~

أول حرف [[s]] في الصلاحيات يعني socket، و [[rw-------]] يعني انت بس، لأن أي حد يوصله يقدر يركب على اتصالك.

### التاني

~~~bash
ssh -O check prod
time ssh prod true
~~~

~~~text الناتج
Master running (pid=3100)
real	0m0.014s
~~~

من 0.242 لـ 0.014 ثانية. ده على سيرفر في نفس الجهاز، فعلى سيرفر بعيد الفرق أكبر بكتير لأن المصافحة والمصادقة هما اللي بياخدوا الوقت. و [[ssh -v]] بيأكد:

~~~text الناتج: ssh -v prod true (مختصر)
debug1: auto-mux: Trying existing master at '/root/.ssh/cm-deploy@172.18.0.2:2222'
debug1: mux_client_request_session: master session id: 2
~~~

[[mux]] اختصار multiplexing.

### القفل: [[ssh -O exit]]

~~~bash
ssh -O exit prod
~~~

~~~text الناتج
Exit request sent.
~~~

وبعدها [[ls ~/.ssh | grep cm-]] مطلعش حاجة: الـ socket اتمسح.

---

## ٤. على ويندوز

OpenSSH المبني في ويندوز مبيدعمش ControlMaster. جربناه بنفس السطور على ويندوز 11 (OpenSSH 9.5) والاتصال نفسه فشل:

~~~text الناتج (PowerShell)
getsockname failed: Not a socket
Read from remote host 127.0.0.1: Unknown error
~~~

فعلى ويندوز سيب سطرين الـ keepalive بس، واستخدم الـ multiplexing من WSL (ليه ملف config خاص بيه جوه لينكس).

---

## الخلاصة

| السطر | بيعمل إيه | تشوفه إزاي |
|---|---|---|
| [[ServerAliveInterval 30]] | نبضة بعد ٣٠ ثانية سكوت | [[ssh -G]] |
| [[ServerAliveCountMax 3]] | ٣ من غير رد = اقفل | [[ssh -G]] |
| [[ControlMaster auto]] | أول اتصال يبقى مشترك | [[ssh -O check]] |
| [[ControlPath ...%r@%h:%p]] | مكان الـ socket | [[ls -l ~/.ssh/cm-*]] |
| [[ControlPersist 10m]] | يفضل مفتوح بعد آخر جلسة | [[ssh -O check]] بعد ما تقفل |

- الـ socket لازم يبقى في مكان موجود وانت بس توصله.
- [[ssh -O exit]] لو السيرفر عمل ريستارت والاتصال المشترك علّق.
- مش شغال مع ssh بتاع ويندوز.`,
          lines: [
            "لكل السيرفرات.",
            "نبضة كل ٣٠ ثانية.",
            "٣ من غير رد = وقع.",
            "أول اتصال يبقى مشترك.",
            "ملف الـ socket: يوزر وسيرفر وبورت.",
            "يفضل مفتوح ١٠ دقايق بعد آخر جلسة.",
            "فيه اتصال مشترك؟",
            "اقفله."
          ],
          sol: R`أول [[ssh prod]] بيعمل الاتصال الحقيقي وبيعمل socket في [[~/.ssh/]] باسم زي [[cm-deploy@203.0.113.10:2222]] (بورت prod). التاني [[time ssh prod true]] هيطلع [[real 0m0.0xx]]: جربناها على سيرفر محلي والأول أخد ٠.٢ ثانية والتاني ٠.٠٠٩. وعلى سيرفر بعيد الفرق أوضح بكتير لأن مفيش handshake ولا مصادقة من جديد. [[ssh -O check prod]] يطبع [[Master running (pid=...)]]، و [[ssh -O exit prod]] يطبع [[Exit request sent.]].

لو التاني لسه بطيء، [[ssh -O check prod]] هيقولك [[Control socket connect(...): No such file or directory]]، يعني الإعدادات مش متطبقة على الـ host ده (اتأكد بـ [[ssh -G prod | grep control]]). وعلى ويندوز بـ OpenSSH بتاع مايكروسوفت، ControlMaster مبيشتغلش أصلًا، اعمل التجربة من WSL.`
        },
        {
          cmd: "LocalForward",
          title: "الـ tunnel في الملف",
          desc: "الـ SSH tunnel لقاعدة البيانات (bash المستوى ٣) بتكتبه مرة في config. [[ssh -N prod-db]] يفتح الممر، أو مع أي ssh عادي للـ host ده. و [[RemoteForward]] العكس: بورت على السيرفر يوصل لجهازك (webhook على جهازك من غير ngrok).",
          example: R`Host prod-db
    HostName 203.0.113.10
    User deploy
    LocalForward 5433 127.0.0.1:5432
    LocalForward 6380 127.0.0.1:6379

Host prod-expose
    HostName 203.0.113.10
    User deploy
    RemoteForward 9000 127.0.0.1:3000`,
          try: "[[ssh -N -f prod-db]] وبعدين DBeaver على localhost:5433. و [[ssh -O exit prod-db]] يقفله.",
          flag: "script",
          deep: {
            why: "الـ tunnel لقاعدة البيانات أمر طويل بتكتبه كل يوم. في config بيبقى [[ssh -N prod-db]]. وفيه اتجاه معاكس ناس كتير مش عارفاه.",
            how: R`[[LocalForward 5433 127.0.0.1:5432]]: نفس [[-L]] بالظبط: بورت 5433 على جهازك يروح لـ 127.0.0.1:5432 من ناحية السيرفر. كذا سطر لكذا خدمة (Postgres و Redis). كل ما تعمل ssh للـ host ده الممرات بتتفتح، و [[-N]] لو مش عايز ترمنال، و [[-f]] للخلفية.

[[RemoteForward 9000 127.0.0.1:3000]]: العكس. بورت 9000 على السيرفر يروح لـ localhost:3000 على جهازك. يعني حاجة على السيرفر (أو Nginx عليه) تقدر توصل لتطبيقك المحلي. مع server block في Nginx بيعمل proxy لـ 9000، يبقى عندك [[dev.example.com]] بيوصل لجهازك من غير ngrok، على دومينك وبشهادتك. للـ webhooks والعرض للعميل. (بيحتاج [[GatewayPorts]] لو عايز 9000 يسمع على كل الكروت، بس مع Nginx على نفس السيرفر مش لازم.)

[[DynamicForward 1080]] نوع تالت: SOCKS proxy، المتصفح كله بيعدّي من السيرفر (زي VPN بسيط).

الممر بيفضل طول ما ssh شغال. مع ControlPersist بيقفل بعد المدة.`,
            when: "LocalForward لكل قاعدة بيانات إنتاج. RemoteForward بديل ngrok لو عندك سيرفر.",
            mistakes: "بورت محلي مشغول فالممر يفشل بصمت (ssh بيطبع تحذير بس بيكمّل)، و [[ExitOnForwardFailure yes]] في الـ Host بيخليه يقف بدل كده. و RemoteForward على بورت مفتوح للنت من غير auth."
          },
          teach: R`## الفكرة: بورت عندك يوصل لبورت هناك (أو العكس)

قاعدة البيانات على السيرفر سامعة على [[127.0.0.1:5432]]، يعني من جوه السيرفر بس. [[LocalForward]] بيفتح بورت على **جهازك**، وأي حاجة تدخله بتعدّي جوه اتصال ssh وتطلع من **السيرفر** على العنوان اللي انت محدده. و [[RemoteForward]] نفس الحكاية بالعكس.

> اتجرّب في containers [[ubuntu:24.04]]. مكان Postgres و Redis شغّلنا على السيرفر (العنوان [[172.18.0.2]]) سيرفرين HTTP صغيرين بـ [[python3 -m http.server]] على [[127.0.0.1:5432]] و [[127.0.0.1:6379]]، كل واحد بيرد بجملة بتقول هو مين، عشان نشوف بعينينا الطلب وصل فين. الملف متمرر بـ [[-F c6]].

---

## ١. من غير tunnel

~~~bash
curl -s -m 3 http://172.18.0.2:5432/; echo "exit=$?"
~~~

[[curl]] بيعمل طلب HTTP، و [[-s]] يعني silent (من غير شريط تقدّم)، و [[-m 3]] أقصى ٣ ثواني.

~~~text الناتج (من جهاز العميل)
exit=7
~~~

exit code 7 في curl يعني «مقدرتش أتصل». الخدمة سامعة على [[127.0.0.1]] بتاع السيرفر، فمحدش من بره يوصلها. ده الصح أمنيًا.

---

## ٢. [[LocalForward]] سطر سطر

~~~text
Host prod-db
    HostName 203.0.113.10
    User deploy
    LocalForward 5433 127.0.0.1:5432
    LocalForward 6380 127.0.0.1:6379
~~~

[[LocalForward 5433 127.0.0.1:5432]] ليها جزئين:

| الجزء | فين | معناه |
|---|---|---|
| [[5433]] | جهازك | البورت اللي هيتفتح عندك |
| [[127.0.0.1:5432]] | **من ناحية السيرفر** | السيرفر هيوصل لنفسه على 5432 |

يعني [[127.0.0.1]] التانية دي «السيرفر نفسه» مش جهازك، لأنها بتتقري هناك. واخترنا 5433 مش 5432 عشان لو عندك Postgres محلي ماسك 5432 ميحصلش تعارض. والسطر التاني نفس الفكرة لـ Redis: سطر لكل خدمة. ده نفس [[ssh -L 5433:127.0.0.1:5432]] بالظبط بس محفوظ.

~~~bash
ssh -F c6 -G prod-db | grep -iE "^(localforward|remoteforward)"
~~~

~~~text الناتج
localforward 5433 [127.0.0.1]:5432
localforward 6380 [127.0.0.1]:6379
~~~

---

## ٣. افتح الممر: [[ssh -N -f]]

~~~bash
ssh -F c6 -N -f prod-db
~~~

- [[-N]]: No command. اتصل وافتح الممرات بس، من غير shell.
- [[-f]]: بعد ما تتصل، روح الخلفية (background) ورجّعلي الـ prompt.

الأمر رجع على طول بـ exit 0. نشوف البورتات اللي فتحت عندنا:

~~~bash
ss -ltn | grep -E "5433|6380"
~~~

[[ss]] بيعرض الاتصالات والبورتات: [[-l]] اللي سامعين (listening) بس، [[-t]] TCP، [[-n]] أرقام مش أسامي.

~~~text الناتج
LISTEN 0      128        127.0.0.1:5433       0.0.0.0:*
LISTEN 0      128        127.0.0.1:6380       0.0.0.0:*
LISTEN 0      128            [::1]:5433          [::]:*
LISTEN 0      128            [::1]:6380          [::]:*
~~~

ssh فاتح البورتين على [[127.0.0.1]] (و [[::1]] نفس الحاجة بـ IPv6)، يعني من جهازك بس.

~~~bash
curl -s http://127.0.0.1:5433/
curl -s http://127.0.0.1:6380/
~~~

~~~text الناتج
I am the fake postgres on the server (127.0.0.1:5432)
I am the fake redis on the server (127.0.0.1:6379)
~~~

طلبنا localhost عندنا، والرد جه من خدمات السيرفر. مع Postgres حقيقي، DBeaver أو psql على [[localhost:5433]] بنفس الطريقة.

---

## ٤. لو البورت مشغول

فتحنا الممر تاني والأول لسه شغال:

~~~text الناتج
bind [127.0.0.1]:5433: Address already in use
channel_setup_fwd_listener_tcpip: cannot listen to port: 5433
Could not request local forwarding.
exit=0
~~~

خد بالك من [[exit=0]]: ssh اشتكى بس **كمّل** ودخل الخلفية من غير ممر. مع [[-o ExitOnForwardFailure=yes]] نفس الرسايل بس [[exit=255]] ومفيش ssh معلّق. فالأحسن تحط [[ExitOnForwardFailure yes]] في البلوك.

وعشان تقفله: [[ssh -O exit prod-db]] طلّع [[No ControlPath specified for "-O" command]] لأن مفيش multiplexing في الملف ده، فقفلناه بـ [[pkill]] (بيقتل عملية باسمها).

---

## ٥. العكس: [[RemoteForward]]

~~~text
Host prod-expose
    HostName 203.0.113.10
    User deploy
    RemoteForward 9000 127.0.0.1:3000
~~~

هنا الترتيب مقلوب:

| الجزء | فين |
|---|---|
| [[9000]] | بورت هيتفتح على **السيرفر** |
| [[127.0.0.1:3000]] | **جهازك**: تطبيقك اللي شغال محلي |

جربناها: شغّلنا على جهاز العميل سيرفر صغير على 3000 بيرد [[hello from my laptop app on :3000]]، وفتحنا [[ssh -N -f prod-expose]]، وبعدين من **جوه السيرفر** طلبنا [[http://127.0.0.1:9000/]]:

~~~text الناتج (اتطبع على السيرفر)
hello from my laptop app on :3000
~~~

السيرفر كلّم بورت عنده، والرد جه من جهازك. ده اللي بيخلي Nginx على السيرفر يقدر يعدّي دومين حقيقي لتطبيق شغال على جهازك.

---

## الخلاصة

| | البورت بيتفتح فين | بيوصل لفين | زي |
|---|---|---|---|
| [[LocalForward 5433 127.0.0.1:5432]] | جهازك | السيرفر:5432 | [[ssh -L]] |
| [[RemoteForward 9000 127.0.0.1:3000]] | السيرفر | جهازك:3000 | [[ssh -R]] |

- العنوان التاني في السطر بيتقري من **الناحية التانية**.
- [[-N -f]]: ممرات بس، في الخلفية.
- [[ss -ltn]] يأكد إن البورت اتفتح، و [[ExitOnForwardFailure yes]] يخلّي الفشل واضح.`,
          lines: [
            "host للـ tunnel.",
            "العنوان.",
            "يوزر.",
            "5433 عندك يروح لـ Postgres على السيرفر.",
            "و 6380 لـ Redis.",
            "host للعكس.",
            "العنوان.",
            "يوزر.",
            "9000 على السيرفر يروح لتطبيقك المحلي على 3000."
          ],
          sol: R`[[ssh -N -f prod-db]] هيرجعلك الـ prompt على طول من غير ما يدخلك، لأن [[-f]] بيحطه في الخلفية و [[-N]] يعني من غير أوامر. اتأكد إن البورت بقى مفتوح عندك: [[ss -ltn | grep 5433]] (أو [[lsof -i :5433]] على الماك) هيطلع [[127.0.0.1:5433 LISTEN]]. في DBeaver: Host [[localhost]] و Port [[5433]] واليوزر والباسورد بتوع Postgres اللي على السيرفر، مش بتوع SSH. جربناها محليًا و psql على 5433 وصل لـ Postgres وطلب الباسورد، يعني النفق شغال.

خد بالك: [[ssh -O exit prod-db]] بيشتغل بس لو [[ControlMaster]] و [[ControlPath]] متفعلين (زي [[Host *]] في الدرس اللي قبله)، غير كده هيقول [[No ControlPath specified]] وتقفله بـ [[pkill -f 'ssh -N -f prod-db']]. ولو قال [[bind [127.0.0.1]:5433: Address already in use]] يبقى نفق قديم لسه شغال أو Postgres محلي ماسك البورت.`
        },
        {
          cmd: "ssh-agent و forwarding",
          title: "المفتاح في الذاكرة مش على السيرفر",
          desc: "الـ agent بيحفظ المفتاح مفكوك في الذاكرة فمتكتبش passphrase كل مرة. و [[ForwardAgent]] بيخلي السيرفر يستخدم مفتاحك (لـ git pull من repo خاص) من غير ما تنسخ المفتاح عليه. بس على سيرفرات تثق فيها بس: الـ root هناك يقدر يستخدمه طول ما انت داخل.",
          example: R`eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
ssh-add -l
Host prod
    ForwardAgent yes
ssh prod 'ssh -T git@github.com'`,
          try: "على السيرفر بعد الدخول بـ ForwardAgent: [[git clone git@github.com:USER/private.git]] من غير أي مفتاح على السيرفر.",
          flag: "script",
          deep: {
            why: "مفتاح بـ passphrase آمن بس مزعج: كل ssh بيسألك. والسيرفر محتاج يعمل git pull من repo خاص: تحط مفتاحك عليه؟ لأ.",
            how: R`[[ssh-agent]] عملية بتفضل شغالة وبتحفظ المفاتيح مفكوكة في الذاكرة. [[eval "$(ssh-agent -s)"]] بيشغّله ويحط متغيرات البيئة اللي ssh بيلاقيه بيها (على أوبونتو ديسكتوب والماك شغال لوحده). [[ssh-add]] بيضيف مفتاح (بيسأل passphrase مرة). [[-l]] يعرض المضاف.

[[ForwardAgent yes]]: لما تدخل السيرفر، ssh بيعمل socket هناك بيوصّل لـ agent بتاعك على جهازك. أي ssh من السيرفر (زي git لـ GitHub) بيطلب التوقيع من agent جهازك عبر الاتصال. المفتاح نفسه عمره ما يسيب جهازك.

الخطر: طول ما انت داخل، أي حد root على السيرفر ده يقدر يستخدم الـ socket ويوقّع بمفتاحك (مش يقراه، بس يستخدمه). فـ ForwardAgent على سيرفراتك انت بس، ومش في [[Host *]].

البديل الأنضف للسيرفرات: deploy key خاص بالسيرفر ده على GitHub بصلاحية قراية لـ repo واحد (تاب Git).

الـ agent بيتقفل مع الجلسة. على الماك Keychain بيحفظ الـ passphrase (تاب zsh). على ويندوز خدمة ssh-agent لازم تتفعّل مرة: [[Set-Service ssh-agent -StartupType Automatic]].`,
            when: "agent دايمًا. forwarding لسيرفراتك عند الحاجة، مش افتراضيًا.",
            mistakes: "ForwardAgent yes في Host *، فأي سيرفر (حتى تجربة على استضافة مشتركة) يقدر يستخدم مفتاحك. وتنسى إن agent forwarding مش بيشتغل مع sudo على السيرفر من غير إعداد."
          },
          teach: R`## الفكرة: برنامج شايل مفتاحك، والسيرفر يستلفه

المثال ٣ أوامر بتشغّل الـ agent وتحط فيه مفتاح، وبعدين بلوك في الـ config، وأمر بيجرّب إن السيرفر استخدم مفتاحك من غير ما يكون عنده.

> اتجرّب في containers [[ubuntu:24.04]]: جهاز عميل، وسيرفر [[prod]] مفيش عليه أي مفتاح خاص. ومكان GitHub استخدمنا يوزر [[git]] على نفس السيرفر بيرد [[Hi personal-user!]] لما يعرف مفتاحك (نفس فكرة درس «مفاتيح متعددة»).

---

## ١. قبل أي حاجة: مفيش agent

~~~bash
ssh-add -l
~~~

~~~text الناتج
Could not open a connection to your authentication agent.
~~~

[[ssh-add]] بيكلّم الـ agent، وملقاهوش. على أوبونتو ديسكتوب والماك فيه agent شغال لوحده من أول الجلسة، بس في سيرفر أو container لازم تشغّله.

---

## ٢. [[eval "$(ssh-agent -s)"]] من جوه لبرة

### [[ssh-agent -s]] لوحده

[[-s]] يعني اطبع الأوامر بصيغة sh/bash. شغّلناه لوحده:

~~~text الناتج
SSH_AUTH_SOCK=/tmp/ssh-sNoAQ3NldqR4/agent.3381; export SSH_AUTH_SOCK;
SSH_AGENT_PID=3382; export SSH_AGENT_PID;
echo Agent pid 3382;
~~~

الـ agent اشتغل في الخلفية، وطبع **أوامر shell** بتعرّف متغيرين:

- [[SSH_AUTH_SOCK]]: مسار الـ socket اللي ssh و ssh-add بيكلّموا الـ agent منه.
- [[SSH_AGENT_PID]]: رقم العملية، عشان تقفله بعدين بـ [[ssh-agent -k]].

بس الطباعة لوحدها مبتعرّفش حاجة، فده agent ملوش لازمة (قفلناه).

### [[$(...)]] و [[eval]]

[[$(...)]] بينفّذ اللي جواه ويحط ناتجه مكانه، والـ [[" "]] حواليه عشان الناتج يفضل حتة واحدة. و [[eval]] بينفّذ النص ده كأوامر في الـ shell الحالي، فالمتغيرين يتعرّفوا فعلًا:

~~~bash
eval "$(ssh-agent -s)"
echo "$SSH_AUTH_SOCK"
ssh-add -l
~~~

~~~text الناتج
Agent pid 3384
/tmp/ssh-gMj6qUJ9xdDj/agent.3383
The agent has no identities.
~~~

الـ agent شغال ومتوصّل، بس فاضي.

---

## ٣. [[ssh-add]] و [[ssh-add -l]]

~~~bash
ssh-add ~/.ssh/id_ed25519
ssh-add -l
~~~

~~~text الناتج
Identity added: /root/.ssh/id_ed25519 (lab@sshc01)
256 SHA256:YaDwA4x7MztEXzOC9U52CC+9eIs3RM5umBV7vu0wWgY lab@sshc01 (ED25519)
~~~

مفتاح التجربة من غير passphrase، فمسألش. لو مفتاحك عليه passphrase هيسألك هنا **مرة واحدة**، وبعدها الـ agent شايله مفكوك في الذاكرة. و [[-l]] (list) بيطبع لكل مفتاح:

| الحتة | معناها |
|---|---|
| [[256]] | طول المفتاح بالـ bits (ed25519 دايمًا 256) |
| [[SHA256:YaDw...]] | البصمة (fingerprint): ملخص قصير يميّز المفتاح |
| [[lab@sshc01]] | الـ comment اللي اتكتب وقت [[ssh-keygen -C]] |
| [[(ED25519)]] | النوع |

---

## ٤. [[ForwardAgent yes]]

~~~text
Host prod
    ForwardAgent yes
~~~

لما تدخل prod، ssh بيعمل socket **على السيرفر**، وأي طلب توقيع يجيله بيرجع جوه الاتصال لـ agent جهازك. المفتاح نفسه مبيتنقلش. نشوف من جوه السيرفر:

~~~bash
ssh prod 'echo $SSH_AUTH_SOCK; ssh-add -l; ls ~/.ssh'
~~~

الـ [[' ']] (single quotes) مهمة: من غيرها [[$SSH_AUTH_SOCK]] هيتفك على جهازك قبل ما يتبعت.

~~~text الناتج (اتطبع على السيرفر)
/tmp/ssh-v75ImBlmdx/agent.4353
256 SHA256:YaDwA4x7MztEXzOC9U52CC+9eIs3RM5umBV7vu0wWgY lab@sshc01 (ED25519)
authorized_keys
~~~

نفس البصمة بالظبط، مع إن فولدر [[~/.ssh]] على السيرفر مفيهوش غير [[authorized_keys]].

---

## ٥. السطر الأخير: [[ssh prod 'ssh -T git@github.com']]

ssh جوه ssh: الأول بيدخلك prod، والتاني بيتنفّذ **على prod** ويكلّم GitHub. في التجربة:

~~~text الناتج مع ForwardAgent
Hi personal-user! You have successfully authenticated, but this lab does not provide shell access.
~~~

~~~text الناتج من غير ForwardAgent
sock=[]
Could not open a connection to your authentication agent.
git@127.0.0.1: Permission denied (publickey,password).
~~~

من غير forwarding مفيش [[SSH_AUTH_SOCK]] على السيرفر، فمفيش مفتاح يتقدّم.

---

## ٦. الخطر بعينك

وإحنا داخلين بـ ForwardAgent، دخلنا السيرفر كـ [[root]] من ناحية تانية واستخدمنا الـ socket بتاعنا:

~~~bash
SSH_AUTH_SOCK=/tmp/ssh-59R9qf03G4/agent.4399 ssh-add -l
~~~

~~~text الناتج (root على السيرفر)
256 SHA256:YaDwA4x7MztEXzOC9U52CC+9eIs3RM5umBV7vu0wWgY lab@sshc01 (ED25519)
~~~

root شاف مفتاحك ويقدر يدخل بيه أي حتة بيقبله، طول ما انت متصل. مقدرش ياخد نسخة منه، بس يقدر **يستخدمه**. عشان كده ForwardAgent لسيرفرات بتثق فيها بس، ومش في [[Host *]].

---

## ٧. على ويندوز

الـ agent على ويندوز خدمة (Service) اسمها [[ssh-agent]] مش أمر بتشغّله بـ eval، ومحتاجة تتفعّل مرة بـ PowerShell كأدمن: [[Set-Service ssh-agent -StartupType Automatic]] ثم [[Start-Service ssh-agent]]، وبعدها [[ssh-add]] و [[ssh-add -l]] زي لينكس. ده من docs مايكروسوفت، مجربناهوش عشان بيغيّر إعدادات الجهاز.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[eval "$(ssh-agent -s)"]] | شغّل الـ agent وعرّف [[SSH_AUTH_SOCK]] في الـ shell ده |
| [[ssh-add مفتاح]] | حط المفتاح في الـ agent (passphrase مرة) |
| [[ssh-add -l]] | المفاتيح اللي جواه |
| [[ForwardAgent yes]] | السيرفر يطلب توقيعات من agent جهازك |

- المفتاح عمره ما بيسيب جهازك، بس root على السيرفر يقدر يستخدمه وانت متصل.
- لو [[ssh-add -l]] على السيرفر قال [[Could not open a connection]]، الـ forwarding مش شغال.`,
          lines: [
            "شغّل الـ agent وجهّز متغيراته.",
            "ضيف مفتاحك (passphrase مرة).",
            "المفاتيح المضافة.",
            "في config لسيرفرك.",
            "مرر الـ agent للسيرفر ده.",
            "من السيرفر: كلّم GitHub بمفتاحك اللي على جهازك."
          ],
          sol: R`بعد [[ssh-add]]، [[ssh-add -l]] على جهازك يطبع سطر زي [[256 SHA256:... you@laptop (ED25519)]]. على السيرفر اللي دخلته بـ [[ForwardAgent yes]]، [[ssh-add -l]] هيطبع نفس السطر بالظبط، و [[echo $SSH_AUTH_SOCK]] يطبع مسار زي [[/tmp/ssh-XXXX/agent.1234]]. عشان كده [[git clone git@github.com:USER/private.git]] هناك هيشتغل من غير أي ملف مفتاح في [[~/.ssh]] على السيرفر.

لو [[ssh-add -l]] على السيرفر قال [[Could not open a connection to your authentication agent]] (جربناها من غير ForwardAgent وده اللي طلع)، يبقى الـ forwarding مش شغال: إما [[ForwardAgent]] مش على الـ Host ده، أو السيرفر قافل [[AllowAgentForwarding]]، أو الـ agent عندك فاضي ([[The agent has no identities]]). وفعّله بس للسيرفرات اللي تثق فيها، لأن root عليها يقدر يستخدم مفتاحك طول ما انت متصل.`
        },
        {
          cmd: "الأدوات بتقرا الملف",
          title: "scp و rsync و VS Code و Git",
          desc: "أي حاجة بتستخدم ssh من تحت بتفهم الأسامي: scp و rsync و git و Ansible و VS Code Remote-SSH (بيعرض الـ hosts من الملف في قايمة). اسم واحد في مكان واحد، وتغيير IP السيرفر سطر واحد.",
          example: R`scp -r dist/ prod:/var/www/site/
rsync -avz --delete dist/ prod:/var/www/site/
ssh prod 'docker compose -f /var/www/app/compose.yml logs --tail 50'
git clone prod:/srv/git/repo.git
code --remote ssh-remote+prod /var/www/app`,
          try: "في VS Code: Remote-SSH ثم Connect to Host: هتلاقي prod و staging جاهزين من الملف.",
          deep: {
            why: "الفايدة الحقيقية من config إن مش ssh بس اللي بيقراه. كل أداة بتستخدم ssh من تحت بتفهم الأسامي، فـ prod بقى اسم في كل مكان.",
            how: R`[[scp]] و [[rsync]]: [[prod:/path]] بدل [[deploy@203.0.113.10:/path]] مع كل الإعدادات (بورت، مفتاح، jump). rsync بيستخدم ssh افتراضيًا (لو عايز تحدد: [[-e ssh]]).

[[ssh prod 'أمر']]: ينفّذ أمر ويرجع. أساس السكربتات: deploy.sh بيعمل [[ssh prod 'cd /app && docker compose up -d']].

[[git clone prod:/srv/git/repo.git]]: repo على سيرفرك بدل GitHub، و [[git@github-work:...]] من عنصر المفاتيح.

VS Code: extension Remote-SSH بتقرا الملف وبتعرض الـ hosts في قايمة، وبتفتح فولدر على السيرفر كأنه محلي (نفس WSL extension بالظبط). [[code --remote ssh-remote+prod /path]] من الترمنال.

Ansible و Terraform و Docker context ([[docker context create prod --docker "host=ssh://prod"]] وبعدها [[docker ps]] بيوريك containers السيرفر) كلهم بيقروا الملف.

فلما IP السيرفر يتغير: سطر HostName واحد، وكل الأدوات والسكربتات شغالة.`,
            when: "من أول ما تكتب الملف. وكل سكربت جديد يستخدم الأسامي مش العناوين.",
            mistakes: "سكربتات فيها IPs وبورتات مكتوبة، فنقل السيرفر يكسرها كلها."
          },
          teach: R`## الفكرة: الاسم بيشتغل في كل حتة

كل الأوامر دي بتشغّل [[ssh]] من تحت، و ssh هو اللي بيقرا الملف. فـ [[prod]] بالبورت والمفتاح واليوزر بتوعه بيشتغل معاهم كلهم من غير ما تكتب حاجة زيادة.

> اتجرّب في containers [[ubuntu:24.04]]: عميل فيه [[~/.ssh/config]] ببلوك [[prod]] (بورت 2222 ومفتاح خاص)، وسيرفر عليه [[rsync]] و [[git]]. فولدر [[dist]] فيه [[index.html]] و [[css/app.css]]. الـ [[docker compose]] و VS Code مكانوش متاحين في التجربة.

---

## ١. [[scp -r dist/ prod:/var/www/site/]]

- [[scp]] = secure copy: نسخ عبر ssh.
- [[-r]] = recursive: انسخ الفولدر بكل اللي جواه.
- [[prod:/var/www/site/]]: قبل [[:]] اسم السيرفر من الملف، وبعدها المسار هناك.

~~~bash
scp -r dist/ prod:/var/www/site/
ssh prod "find /var/www/site | sort"
~~~

~~~text الناتج
/var/www/site
/var/www/site/dist
/var/www/site/dist/css
/var/www/site/dist/css/app.css
/var/www/site/dist/index.html
~~~

خد بالك: scp حط فولدر [[dist]] **نفسه** جوه [[site]]، مع إننا كاتبين [[dist/]] بشرطة. الشرطة في الآخر مبتفرقش مع scp. لو عايز اللي جوه بس: [[scp -r dist/* prod:/var/www/site/]].

---

## ٢. [[rsync -avz --delete dist/ prod:/var/www/site/]]

| الحتة | معناها |
|---|---|
| [[-a]] | archive: فولدرات جوه فولدرات، ويحافظ على الصلاحيات والتواريخ |
| [[-v]] | verbose: اطبع اسم كل ملف |
| [[-z]] | اضغط الداتا وهي ماشية |
| [[--delete]] | امسح من الهدف أي ملف مش موجود في المصدر |
| [[dist/]] | الشرطة هنا **بتفرق**: انسخ اللي جوه dist، مش dist نفسه |

أول مرة (والمصدر فيه [[old.txt]] كمان):

~~~text الناتج
sending incremental file list
index.html
old.txt
css/
css/app.css

sent 322 bytes  received 88 bytes  820.00 bytes/sec
total size is 23  speedup is 0.06
~~~

مسحنا [[old.txt]] من عندنا، وغيّرنا [[index.html]]، وشغّلناه تاني:

~~~text الناتج
sending incremental file list
deleting old.txt
index.html

sent 204 bytes  received 60 bytes  528.00 bytes/sec
total size is 19  speedup is 0.07
~~~

- rsync بعت **اللي اتغير بس** ([[index.html]])، و [[app.css]] مبعتوش لأنه زي ما هو.
- [[deleting old.txt]] بسبب [[--delete]]: الهدف بقى نسخة طبق الأصل من المصدر.
- [[speedup]] أقل من 1 هنا لأن الملفات صغيرة جدًا والكلام الإضافي أكبر منها. مع مشروع كبير اتغيّر فيه ملفين بيبقى الرقم كبير.

---

## ٣. [[ssh prod 'أمر']]

اللي بعد اسم السيرفر بيتنفّذ هناك، والناتج بيرجعلك، والاتصال يقفل:

~~~bash
ssh prod "cat /var/www/site/index.html; uptime"
~~~

~~~text الناتج
<h1>v2</h1>
 10:37:48 up  4:01,  0 user,  load average: 0.30, 0.49, 0.46
~~~

والأمر اللي في المثال [[docker compose -f ... logs --tail 50]] محتاج Docker على السيرفر: [[-f]] بيحدد ملف الـ compose، و [[logs --tail 50]] آخر ٥٠ سطر من لوجات الـ containers. سيرفر التجربة مفيهوش Docker، فطلع [[bash: line 1: docker: command not found]] و exit 127، وده بيوريك إن الخطأ جه من **السيرفر** مش من ssh.

---

## ٤. [[git clone prod:/srv/git/repo.git]]

repo من نوع bare (من غير ملفات شغل، الـ history بس) على السيرفر، و git بيوصله عبر ssh بنفس الاسم:

~~~text الناتج
Cloning into 'repo'...
~~~

وجوه الـ repo الجديد:

~~~text الناتج: git remote -v
origin	prod:/srv/git/repo.git (fetch)
origin	prod:/srv/git/repo.git (push)
~~~

الاسم اتحفظ زي ما هو، فلو IP السيرفر اتغير، تعدّل [[HostName]] والـ repo يفضل شغال.

---

## ٥. [[code --remote ssh-remote+prod /var/www/app]]

ده أمر VS Code (من الـ docs، مجربناهوش هنا): [[--remote]] يفتح شباك متوصّل بجهاز تاني، و [[ssh-remote+prod]] يعني «عن طريق extension الـ Remote-SSH، على الـ host اللي اسمه prod في الملف»، وبعدين الفولدر اللي هيتفتح هناك. محتاج extension الـ Remote-SSH متسطبة.

---

## على ويندوز

[[scp.exe]] و [[ssh.exe]] بتوع ويندوز بيقروا نفس الملف. جربنا [[scp file.txt prod:/tmp/]] من PowerShell (بملف config تجربة) والملف وصل. [[rsync]] مش موجود في ويندوز نفسه، استخدمه من WSL أو Git Bash لو متسطب.

---

## الخلاصة

| الأداة | الشكل |
|---|---|
| scp | [[scp -r مصدر prod:/مسار]] |
| rsync | [[rsync -avz --delete مصدر/ prod:/مسار/]] |
| ssh | [[ssh prod 'أمر']] |
| git | [[git clone prod:/مسار/repo.git]] |
| VS Code | [[code --remote ssh-remote+prod /مسار]] |

- مع rsync الشرطة في آخر المصدر بتفرق، مع scp لأ.
- [[--delete]] بيمسح من الهدف، فاتأكد من المصدر الأول.`,
          lines: [
            "scp بالاسم (بيحط فولدر dist نفسه جوه site).",
            "rsync بالاسم (مع مسح اللي مش في المصدر).",
            "أمر على السيرفر ويرجع.",
            "clone من repo على سيرفرك.",
            "VS Code يفتح فولدر على السيرفر."
          ],
          sol: R`في VS Code: F1 ثم «Remote-SSH: Connect to Host...» هيظهر لستة فيها [[prod]] و [[staging]] بالأسامي اللي في [[Host]]، وأي بلوك فيه [[*]] زي [[Host *]] مش هيظهر. اختار prod هيفتح شباك جديد، أول مرة هيسألك نوع السيرفر (Linux) ويسطّب VS Code Server هناك، وبعدين في الركن الشمال تحت هتلاقي [[SSH: prod]].

لو اللستة فاضية، VS Code بيقرا ملف تاني: من «Remote-SSH: Open SSH Configuration File...» شوف أنهي مسار مختار (الإعداد [[remote.SSH.configFile]]). وعلى ويندوز، الملف لازم يبقى في [[C:\Users\you\.ssh\config]]، مش جوه WSL، لأن Remote-SSH شغال بـ ssh بتاع ويندوز.`
        },
        {
          cmd: "known_hosts",
          title: "بصمة السيرفر والتحذير الكبير",
          desc: "أول اتصال ssh بيسألك «متأكد؟» وبيحفظ بصمة السيرفر في [[~/.ssh/known_hosts]]. بعدها لو البصمة اتغيرت بيرفض بتحذير كبير (REMOTE HOST IDENTIFICATION HAS CHANGED): يا إما السيرفر اتعمل من جديد، يا إما حد في النص. [[StrictHostKeyChecking accept-new]] بيقبل الجديد لوحده بس بيرفض المتغيّر.",
          example: R`Host *
    StrictHostKeyChecking accept-new
    HashKnownHosts yes
    UpdateHostKeys yes

# fingerprint on the server itself vs what you see:
ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub
ssh-keyscan -t ed25519 203.0.113.10 | ssh-keygen -lf -
ssh-keygen -F 203.0.113.10
ssh-keygen -R 203.0.113.10`,
          try: "بعد ما تعيد تسطيب سيرفر، [[ssh-keygen -R IP]] وادخل تاني. ومتحطش أبدًا [[StrictHostKeyChecking no]] في Host *.",
          flag: "script",
          deep: {
            why: "البصمة هي الضمان الوحيد إنك بتكلّم سيرفرك مش حد عامل نفسه هو. التحذير الكبير اللي الناس بتتخطاه بـ StrictHostKeyChecking no هو بالظبط اللي بيحميك من هجوم في النص.",
            how: R`كل سيرفر ليه مفتاح host ثابت. أول اتصال ssh بيوريك بصمته (SHA256:...)، ولو قلت yes بيتحفظ في [[known_hosts]]. كل اتصال بعد كده بيقارن.

[[StrictHostKeyChecking]]: [[ask]] الافتراضي بيسأل في الأول. [[accept-new]] بيقبل أي سيرفر جديد من غير سؤال، بس لو بصمة سيرفر معروف اتغيرت بيرفض. ده الأنسب للسكربتات. [[no]] بيقبل أي حاجة، وده بيلغي الحماية.

[[HashKnownHosts yes]] بيخزّن أسامي السيرفرات متشفّرة، فلو الملف اتسرّب محدش يعرف انت بتدخل فين. و [[UpdateHostKeys yes]] بيحدّث المفاتيح لوحده لو السيرفر ضاف نوع جديد.

عشان تتأكد بجد: [[ssh-keygen -lf]] على ملف المفتاح العام جوه السيرفر (من console الاستضافة) بيدّي البصمة الحقيقية. قارنها باللي [[ssh-keyscan]] جابه من بره. [[-F]] بيدوّر على سيرفر في known_hosts، و [[-R]] بيمسح بصمته القديمة.

وفي CI (GitHub Actions) حط سطر known_hosts الجاهز في secret بدل ssh-keyscan وقت التشغيل.`,
            when: "accept-new في Host * من أول يوم. و -R بعد أي إعادة تسطيب لسيرفر.",
            mistakes: "[[StrictHostKeyChecking no]] و [[UserKnownHostsFile /dev/null]] «عشان التحذير يسكت». وتعمل -R وتدخل من غير ما تعرف ليه البصمة اتغيرت."
          },
          teach: R`## الفكرة: ssh بيفتكر وش كل سيرفر

كل سيرفر عنده **مفتاح host** ثابت اتعمل وقت التسطيب. أول مرة تتصل، ssh بيحفظ بصمته في [[~/.ssh/known_hosts]]، وكل مرة بعدها بيقارن. المثال فيه ٤ سطور config بتتحكم في ده، و ٤ أوامر [[ssh-keyscan]] و [[ssh-keygen]] للتأكد والتصليح.

> اتجرّب في containers [[ubuntu:24.04]] (OpenSSH 9.6): عميل وسيرفر عنوانه [[172.18.0.2]] بدل [[203.0.113.10]]. الـ known_hosts كان ملف تجربة فاضي اسمه [[kh]] (بـ [[UserKnownHostsFile]]، وبـ [[-f kh]] مع ssh-keygen)، وفي الآخر عملنا مفاتيح host جديدة للسيرفر عشان نشوف التحذير الكبير.

---

## ١. السطور الأربعة

~~~text
Host *
    StrictHostKeyChecking accept-new
    HashKnownHosts yes
    UpdateHostKeys yes
~~~

[[StrictHostKeyChecking]] بيحدد ssh يعمل إيه مع البصمة:

| القيمة | سيرفر جديد | سيرفر معروف بصمته اتغيرت |
|---|---|---|
| [[ask]] (الافتراضي) | يسألك yes/no | يرفض |
| [[accept-new]] | يضيفه لوحده | يرفض |
| [[yes]] | يرفض (لازم تضيفه بإيدك) | يرفض |
| [[no]] | يضيفه | **يكمّل**، وده اللي بيلغي الحماية |

- [[HashKnownHosts yes]]: بدل ما يكتب [[172.18.0.2]] في الملف، يكتب hash منه. اللي يسرق الملف ميعرفش انت بتدخل فين.
- [[UpdateHostKeys yes]]: لو السيرفر عنده مفاتيح host من أنواع تانية، ssh يتعلمها لوحده بعد ما يتأكد منه.

---

## ٢. البصمة الحقيقية من جوه السيرفر

~~~bash
ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub
~~~

- [[ssh-keygen]] أداة المفاتيح، مش بس لعمل مفتاح جديد.
- [[-l]] = list: اطبع البصمة، و [[-f]] = file: من الملف ده.
- [[/etc/ssh/ssh_host_ed25519_key.pub]] المفتاح العام بتاع السيرفر نفسه (مش بتاعك).

~~~text الناتج (اتشغّل على السيرفر)
256 SHA256:fH0B1x+HwlIlB4TYt0Ccxs1lq8b376O4RWT5C4n7s48 root@bastion (ED25519)
~~~

ده لازم يتشغّل **جوه** السيرفر، من console شركة الاستضافة مثلًا، مش عبر الشبكة اللي انت شاكك فيها.

## ٣. البصمة اللي بتوصلك من بره

~~~bash
ssh-keyscan -t ed25519 203.0.113.10 | ssh-keygen -lf -
~~~

- [[ssh-keyscan]] بيسأل السيرفر عن مفتاحه العام من غير ما يدخل، و [[-t ed25519]] النوع ده بس.
- [[|]] بيبعت ناتجه لـ [[ssh-keygen -lf]]، و [[-]] بدل اسم الملف يعني «اقرا من الـ pipe».

~~~text الناتج (من العميل)
# 172.18.0.2:22 SSH-2.0-OpenSSH_9.6p1 Ubuntu-3ubuntu13.19
256 SHA256:fH0B1x+HwlIlB4TYt0Ccxs1lq8b376O4RWT5C4n7s48 172.18.0.2 (ED25519)
~~~

السطر اللي بيبدأ بـ [[#]] نسخة السيرفر. والبصمة **مطابقة** للي جوه السيرفر حرف بحرف، يعني مفيش حد في النص.

---

## ٤. أول اتصال، وشكل السطر المحفوظ

~~~text الناتج: ssh 172.18.0.2 hostname
Warning: Permanently added '172.18.0.2' (ED25519) to the list of known hosts.
bastion
~~~

[[accept-new]] ضافه من غير سؤال. والسطر في [[kh]]:

~~~text محتوى kh (مختصر)
|1|9w254Xd8AaNNO5RE2ujfYypRSXE=|bwYMtYITUphjVdwQjn+jhYJOrhw= ssh-ed25519 AAAAC3NzaC1lZDI1N...
~~~

[[|1|]] يعني الاسم متخزن hash، وبعده نوع المفتاح والمفتاح نفسه. مفيش [[172.18.0.2]] مكتوب في أي حتة. وبعد تاني اتصال، [[UpdateHostKeys]] زوّد الملف لـ ٣ سطور:

~~~text الناتج: awk '{print $2}' kh
ssh-ed25519
ssh-rsa
ecdsa-sha2-nistp256
~~~

[[awk '{print $2}']] بيطبع الكلمة التانية من كل سطر، وهي نوع المفتاح.

---

## ٥. [[ssh-keygen -F]]: السيرفر ده محفوظ؟

[[-F]] = find. بما إن الأسامي hash، [[grep]] مش هيلاقيها، لكن [[-F]] بيعمل hash للاسم ويقارن:

~~~text الناتج: ssh-keygen -F 172.18.0.2 -f kh
# Host 172.18.0.2 found: line 1
|1|9w254Xd8AaNNO5RE2ujfYypRSXE=|bwYMtYITUphjVdwQjn+jhYJOrhw= ssh-ed25519 AAAAC3NzaC1lZDI1N...
~~~

---

## ٦. البصمة اتغيرت

مسحنا مفاتيح host السيرفر وعملنا جداد ([[ssh-keygen -A]])، زي ما بيحصل بعد إعادة تسطيب:

~~~text الناتج (مختصر)
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
The fingerprint for the ED25519 key sent by the remote host is
SHA256:e78bjJLi93wW3PLsFguHR3T542MCE6pshfSM132uqvU.
Offending ECDSA key in /root/lab/kh:3
  remove with:
  ssh-keygen -f '/root/lab/kh' -R '172.18.0.2'
Host key for 172.18.0.2 has changed and you have requested strict checking.
Host key verification failed.
~~~

- مع إن [[accept-new]] شغال، رفض. لأنه بيقبل **الجديد** بس، مش **المتغيّر**.
- [[Offending ... kh:3]] رقم السطر القديم في الملف.
- البصمة الجديدة في الرسالة: قارنها بـ [[ssh-keygen -lf]] على السيرفر قبل أي حاجة. لو مطابقة، انت عارف ليه اتغيرت. لو لأ، **متكمّلش**.

## ٧. [[ssh-keygen -R]]: امسح القديم

[[-R]] = remove:

~~~text الناتج: ssh-keygen -R 172.18.0.2 -f kh
# Host 172.18.0.2 found: line 1
# Host 172.18.0.2 found: line 2
# Host 172.18.0.2 found: line 3
kh updated.
Original contents retained as kh.old
~~~

مسح التلات سطور بتوع السيرفر ده، وساب نسخة من الملف القديم باسم [[kh.old]]. الاتصال اللي بعده اتعامل معاه كسيرفر جديد:

~~~text الناتج
Warning: Permanently added '172.18.0.2' (ED25519) to the list of known hosts.
bastion
~~~

---

## ٨. والافتراضي [[ask]] في سكربت

من غير [[accept-new]]، وبـ [[-o BatchMode=yes]] (يعني مفيش حد يرد على أسئلة، زي سكربت أو CI):

~~~text الناتج
Host key verification failed.
~~~

عشان كده [[accept-new]] هو الأنسب للسكربتات: بيعدّي السيرفر الجديد، ولسه بيحميك من المتغيّر.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[ssh-keygen -lf ملف.pub]] | بصمة مفتاح من ملف (على السيرفر: البصمة الحقيقية) |
| [[ssh-keyscan -t ed25519 IP]] | مفتاح السيرفر من بره من غير دخول |
| [[ssh-keygen -F IP]] | السيرفر محفوظ؟ (بيشتغل مع الـ hash) |
| [[ssh-keygen -R IP]] | امسح بصماته، ويسيب [[known_hosts.old]] |

- [[accept-new]] يقبل الجديد ويرفض المتغيّر، و [[no]] بيلغي الحماية.
- التحذير الكبير معناه «اتأكد»: قارن البصمة من جوه السيرفر قبل [[-R]].`,
          lines: [
            "لكل السيرفرات.",
            "اقبل السيرفر الجديد لوحده، وارفض لو بصمة معروف اتغيرت.",
            "خزّن الأسامي متشفّرة.",
            "حدّث مفاتيح السيرفر لوحده.",
            "البصمة الحقيقية من جوه السيرفر.",
            "البصمة اللي بتوصلك من بره: لازم تطابق اللي فوقها.",
            "السيرفر ده موجود في known_hosts؟",
            "امسح بصمته القديمة (بعد إعادة تسطيب)."
          ],
          sol: R`بعد إعادة التسطيب، أول [[ssh]] هيطلع تحذير كبير [[WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!]] ومعاه [[Offending ED25519 key in ~/.ssh/known_hosts:1]] والاتصال هيقف. [[ssh-keygen -R 203.0.113.10]] يطبع [[# Host 203.0.113.10 found: line 1]] و [[known_hosts updated.]] و [[Original contents retained as known_hosts.old]]. بعدها ssh هيتعامل معاه كسيرفر جديد: مع [[accept-new]] يضيفه لوحده ويطبع [[Warning: Permanently added ...]]، ومن غيرها هيسألك yes/no. جربنا ده كله على sshd محلي غيّرنا مفتاحه.

قبل ما تعمل [[-R]]، قارن البصمة: [[ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub]] على السيرفر (من الـ console بتاع شركة الاستضافة) لازم يطابق اللي في رسالة التحذير. ولاحظ إن [[accept-new]] بيقبل السيرفرات الجديدة بس، والمفتاح اللي اتغير لسه بيوقف الاتصال، وده الصح. [[StrictHostKeyChecking no]] هو اللي بيعدّي ده، وعشان كده ممنوع.`
        }
      ]
    }
  ]
});
