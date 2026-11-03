// تكملة تاب cmd: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cmd/01.js (شرح حقول الدرس في أوله)
MORE("cmd", [
    {
      t: "اليوزرز والصلاحيات",
      l: 2,
      n: R`مين على الجهاز وبصلاحيات إيه: اليوزرز والجروبات و UAC وصلاحيات الملفات والتشغيل كيوزر تاني. العرض من CMD عادي، والتغيير محتاج CMD كأدمن والخطير عليه علامة`,
      time: R`حوالي ساعتين`,
      goal: [R`تعرف مين على الجهاز وبصلاحيات إيه.`, R`تقرا وتغيّر صلاحيات ملف أو فولدر بـ [[icacls]].`, R`تشغّل أمر كيوزر تاني، وتفتح CMD كأدمن، وتخلّي سكربتك يعرف هو أدمن ولا لأ.`, R`تلاقي الباسوردات المحفوظة ([[cmdkey]]) والسياسات المفروضة ([[gpresult]]).`],
      use: { work: R`«Access is denied» — [[whoami /groups]] و [[icacls]] بيقولوا ليه.`, cs: R`ACL: كل ملف ليه قايمة بمين يعمل إيه. نفس فكرة [[chmod]]، بس أدق.` },
      lab: R`mkdir %TEMP%\cmdlab & cd /d %TEMP%\cmdlab`,
      projects: [
        { lvl: 'صغير', t: R`افهم «Access is denied»`, what: R`فولدر تجربة في TEMP: اقفل منه الكتابة ليوزرك بـ [[icacls /deny]]، وجرّب تكتب فيه، واقرا الرسالة والـ errorlevel، ورجّع الصلاحية بـ [[/remove:d]]. من درس icacls.`, done: R`الكتابة بتطبع [[Access is denied.]] وانت عارف إن errorlevel بيفضل 0 بعد [[>]] الفاشل، وبعد الرجوع الكتابة بتنجح، و [[icacls]] على الفولدر مفيهوش سطر [[(DENY)]].` },
        { lvl: 'صغير', t: R`أول سطرين في كل سكربت أدمن`, what: R`[[need-admin.bat]] بيفحص بـ [[net session]] ولو فشل بـ [[whoami /groups]] و [[S-1-16-12288]]، ويطبع رسالة ويرجّع 1، وكل سكربت محتاج أدمن يبدأ بـ [[call need-admin.bat || exit /b 1]]. من درسي net session و whoami /groups /priv.`, done: R`من نافذة عادية أي سكربت بيناديه بيقف من أول سطر برسالة واحدة، واختبار [[test-need-admin.bat]] بيطبع [[PASS (expected 1, got 1)]]، ومفيش ولا [[%errorlevel%]] على نفس سطر الأمر.` },
        { lvl: 'متوسط', t: R`مين على الجهاز وبصلاحيات إيه`, what: R`[[users-report.bat]] بيطبع كل يوزر من [[net user]] ومعاه Account active و Password expires و Last logon، وجنب أي واحد في Administrators علامة، وأي يوزر شغال ومش داخل من أكتر من شهر تحذير. قراية بس. من دروس net user و net localgroup.`, done: R`التقرير فيه سطر لكل يوزر (مش لكل سطر في [[net user]])، والحسابات المدمجة ([[Administrator]] و [[Guest]] و [[DefaultAccount]] و [[WDAGUtilityAccount]]) مكتوب جنبها «built-in»، وجهاز بلغة تانية بيشتغل لأن جروب الأدمنز متقري بالـ SID [[S-1-5-32-544]].` },
        { lvl: 'متوسط', t: R`سكربت صيانة بيطلب الأدمن لوحده`, what: R`[[fix-dns.bat]]: لو مش أدمن ينادي [[Start-Process -FilePath '%~f0' -Verb RunAs]] و [[-ArgumentList]] بس لو فيه arguments، وفي النسخة الأدمن [[cd /d "%~dp0"]] وبعدين [[ipconfig /flushdns]] ولوج. ومعاه [[DRYRUN]] بيطبع سطر الطلب من غير UAC. من درس Run as Administrator.`, done: R`بـ [[DRYRUN]] من فولدر فيه مسافة: السطر صح بـ argument ومن غيره، والدوس مرتين على السكربت بيطلّع UAC مرة واحدة، والرفض بيطبع «cancelled» وكود 1، والنسخة الأدمن بتلاقي ملفاتها جنبها.` },
        { lvl: 'كبير', t: R`مراجعة صلاحيات فولدر مشترك`, what: R`[[acl-audit.bat FOLDER]] بيلف على كل ملف وفولدر جوه، ويطلّع: أي سطر صريح (من غير [[(I)]]) لـ Users أو Everyone، وأي [[(DENY)]]، وأي فولدر مقطوع عنه الوراثة، وصاحب كل حاجة مش بتاعتك. بياخد [[icacls /save]] كنسخة في الأول، ويكتب [[audit.csv]] و [[audit.log]] بالوقت والكود، وفيه [[--fix]] بيشيل الصريح بـ [[/reset]] بس بعد [[choice]]. من دروس icacls و takeown و whoami.`, done: R`على فولدر تجربة فيه ٣ مشاكل مزروعة (grant لـ Users، و deny، ووراثة مقطوعة) التقرير بيطلّع التلاتة بمساراتها، والتشغيل التاني من غير [[--fix]] بيطلّع نفس النتيجة ومبيغيّرش حاجة، و [[--fix]] بعد الموافقة بيخلي التقرير فاضي، ومسار مش موجود أو ممنوع بيتكتب في اللوج بكوده والباقي بيكمّل، ونسخة [[/save]] موجودة قبل أي تعديل.`, ext: R`زوّد مقارنة بين تقريرين ([[fc]]) عشان تعرف إيه اللي اتغيّر من الأسبوع اللي فات، واعمل نسخة PowerShell بـ [[Get-Acl]] بتطلّع JSON، وجرّب [[icacls /restore]] من نافذة أدمن على نسخة الـ save.` },
        { lvl: 'كبير', t: R`تقرير «ليه مش شغال؟» للدعم الفني`, what: R`[[support-report.bat]] قراية بس، بيجمع في فولدر بالتاريخ: مستوى النافذة ([[whoami /groups]])، والحساب في Administrators ولا لأ، وملخص [[gpresult /r /scope user]] (٣ سطور)، وعدد الحسابات المحفوظة من غير أساميها ([[cmdkey /list | find /c "Target:"]])، وآخر الأخطاء ([[wevtutil qe System]] بفلتر Level=2)، ولو أدمن [[/scope computer]] كمان. وفي الآخر ملف [[summary.txt]] بأهم ٥ سطور. من كل دروس الوحدة ودرس wevtutil.`, done: R`من نافذة عادية بيخلص بكود 0، وكل خطوة محتاجة أدمن مكتوبة «needs admin» مش error، و [[summary.txt]] مفيهوش أي اسم سيرفر أو target أو باسورد (اتأكدت بـ [[findstr /i "target= password"]] ومطلعش حاجة)، وتشغيله مرتين بيعمل فولدرين.`, ext: R`خلّيه يضغط الفولدر بـ [[tar -a -cf report.zip folder]]، ويطلب الأدمن لوحده بطريقة درس Run as Administrator لو المستخدم وافق، ويطبع في الآخر مسار الملف اللي يبعته.` },
        { lvl: 'فكرة', t: R`جهاز مشترك في البيت أو المكتب`, what: R`جهاز بيستخدمه أكتر من حد (عيلة، أو مكتب صغير): صمّم إزاي كل واحد يبقى ليه يوزر عادي، وأدمن واحد بس، وفولدر مشترك بصلاحيات واضحة، ومن غير باسوردات محفوظة غلط. ونفّذه في Windows Sandbox أو VM بسكربت.`, done: R`السكربت في الـ VM بيعمل اليوزرز والجروب والفولدر بالصلاحيات ويتشغّل مرتين من غير errors (بيفحص قبل ما يعمل)، وفيه سكربت تاني بيراجع إن مفيش يوزر زيادة في Administrators، و README بيقول كل يوزر يقدر يعمل إيه.`, ext: R`زوّد [[/times]] لحسابات الأطفال، ونسخة احتياطي للفولدر المشترك بـ [[robocopy]] و [[schtasks]]، وتقرير شهري من مراجعة الصلاحيات.` },
      ],
      items: [
        {
          cmd: "net user",
          title: "اليوزرز: اعرض واعمل وعطّل وامسح",
          desc: R`[[net user]] بيعرض اليوزرز اللي على الجهاز وتفاصيل كل واحد، وبيعمل يوزر جديد أو يعطّله أو يمسحه. شغال في Home و Pro، وده مهم لأن [[lusrmgr.msc]] (الواجهة الرسومية لليوزرز والجروبات) مش موجودة في Home.

[[net user]] لوحده: لستة اليوزرز (العرض مش محتاج أدمن). جنب يوزرك هتلاقي حسابات ويندوز نفسه: [[Administrator]] (الأدمن المدمج، مقفول افتراضيًا)، و [[Guest]]، و [[DefaultAccount]]، و [[WDAGUtilityAccount]]، متلمسهمش.
[[net user ali]] تفاصيل يوزر: [[Account active]] شغال ولا متعطل، و [[Password expires]]، و [[Logon hours allowed]]، وتحت [[Local Group Memberships]] جروباته (لو فيها [[*Administrators]] يبقى أدمن). و [[%USERNAME%]] اسم يوزرك الحالي.

التعديل كله محتاج CMD كأدمن (من غيره: [[System error 5 has occurred.]] و [[Access is denied.]]):
[[net user sara * /add]] يوزر جديد اسمه sara. الـ [[*]] مكان الباسورد معناها «اسألني»: بيطلبه مرتين ومش بيظهر وانت بتكتبه. متكتبش الباسورد نفسه في الأمر، لأنه بيفضل في history النافذة (سهم لفوق و [[doskey /history]]) وفي أي سكربت أو لوج.
[[/active:no]] عطّل اليوزر من غير ما تمسحه (ملفاته باقية)، و [[/active:yes]] رجّعه.
[[/expires:12/31/2026]] اليوزر يقف لوحده من أول اليوم ده (بصيغة تاريخ جهازك)، و [[/expires:never]] من غير نهاية.
[[/times:M-F,8AM-6PM]] يدخل في الأوقات دي بس: الأيام ([[M]] و [[T]] و [[W]] و [[Th]] و [[F]] و [[Sa]] و [[Su]]) وبعدها فاصلة والساعات، بالساعة الكاملة، و [[;]] بين أكتر من فترة، ومن غير مسافات. و [[/times:all]] أي وقت.
[[/passwordchg:no]] اليوزر ميقدرش يغيّر الباسورد بتاعه.
[[/delete]] امسح اليوزر. فولدره في [[C:\Users]] بيفضل، فامسحه بإيدك لو مش محتاجه.

الاسم لحد 20 حرف، والباسورد لحد 127.`,
          example: R`net user
net user %USERNAME%
net user sara * /add
net user sara /expires:12/31/2026 /times:M-F,8AM-6PM
net user sara /active:no
net user sara /delete
net user Administrator /active:yes
net user Administrator /active:no`,
          try: R`اعرض اليوزرز وتفاصيل يوزرك: انت في Administrators؟ وباسوردك بينتهي إمتى؟ ولو معاك CMD أدمن: اعمل يوزر تجربة بالـ [[*]]، واعرض تفاصيله، وعطّله، وامسحه.`,
          flag: "danger",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[net user labnosuchuser]] وبعدها [[echo %errorlevel%]] على سطر لوحده.`, done: R`[[The user name could not be found.]] و [[More help is available by typing NET HELPMSG 2221.]] و errorlevel 2. و [[net helpmsg 2221]] بيطبع نفس الجملة. يعني [[net user الاسم >nul 2>&1]] بيقولك اليوزر موجود ولا لأ من الكود.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** [[net user %USERNAME% | findstr /c:"Account active" /c:"Password expires" /c:"Local Group"]].`, done: R`٣ سطور زي [[Account active               Yes]] و [[Password expires             Never]] و [[Local Group Memberships      *Administrators       *docker-users]]. ولو [[*Administrators]] موجودة يبقى حسابك أدمن (بس النافذة نفسها ممكن تكون عادية، درس whoami /groups /priv).` },
            { lvl: 'تطبيق', t: R`**ابني:** [[am-i-admin-account.bat]] بيطبع «حسابك في Administrators» أو «حساب عادي» من [[net user %USERNAME% | findstr /i "Administrators"]]، ويخرج بـ 0 أو 1.`, done: R`على حساب أدمن طبع الرسالة الأولى و errorlevel 0. وكتبت تحتها إن ده عن **الحساب** مش عن النافذة: من نافذة عادية لنفس الحساب [[net session]] لسه بيقول [[System error 5 has occurred.]].` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** [[net user | find /c /v ""]] وعدّ اليوزرز الحقيقيين من الناتج. ليه الرقم أكبر من عدد اليوزرز؟`, done: R`على جهاز التجربة 8 سطور: سطر فاضي، و [[User accounts for \\LAB-PC]]، وسطر شرط، وسطرين أسامي (الأسامي بتترص ٣ في السطر)، و [[The command completed successfully.]]. يعني [[find /c]] مش بيعدّ يوزرز، فلو عايز العدد اقرا الأسامي بـ [[for /f]] أو استخدم [[Get-LocalUser]] في PowerShell.` },
            { lvl: 'تحدي', t: R`**محاكاة:** في Windows Sandbox (مش جهازك): اعمل [[sara]] بـ [[net user sara * /add]]، وحط لها [[/times:M-F,8AM-6PM]]، وعطّلها، وامسحها، واقرا [[net user sara]] بعد كل خطوة.`, done: R`بعد كل خطوة السطر اللي اتغيّر باين ([[Account active No]] بعد التعطيل، و [[Logon hours allowed]] فيها الأيام والساعات)، وبعد [[/delete]] الأمر [[net user sara]] بيطلّع [[The user name could not be found.]]. والإنشاء والتعديل من وثائق Microsoft، ومتجرّبوش على جهاز التجربة.` },
          ],
          deep: {
            why: R`جهاز في البيت عليه أكتر من حد، أو لابتوب هتسلّمه لحد يشتغل عليه فترة، أو جهاز اختبار محتاج يوزر عادي (مش أدمن) تجرّب عليه برنامجك زي ما المستخدم الحقيقي هيشوفه. وفي Home مفيش [[lusrmgr.msc]]، فالأمر ده (أو Settings) هو الطريق. وكمان أول حاجة تبص عليها لو شاكك إن حد عمل يوزر على جهازك.`,
            how: R`اليوزرز المحليين متخزنين في قاعدة على الجهاز اسمها SAM، و [[net user]] بيقرا ويكتب فيها. اليوزر اللي داخل بحساب Microsoft (إيميل) ليه برضه يوزر محلي مربوط بيه، اسمه غالبًا أول حروف الإيميل، وباسورده هو باسورد حساب Microsoft. جرّبت [[net user]] على يوزر من النوع ده وطلع [[Last logon Never]] مع إن اليوزر داخل كل يوم، لأن الدخول بيتسجل على حساب Microsoft مش العداد المحلي، فمتعتمدش على السطر ده.

اليوزر الجديد بيدخل جروب [[Users]] بس (يوزر عادي)، ولو عايزه أدمن [[net localgroup Administrators sara /add]] (الدرس الجاي). وأول مرة يدخل ويندوز بيتعمله فولدر [[C:\Users\sara]].

[[net accounts]] بيعرض سياسة الباسوردات والقفل. على ويندوز 11 Home عندي: [[Minimum password length: 0]] و [[Maximum password age (days): 42]] و [[Lockout threshold: 10]] و [[Lockout duration (minutes): 10]]، يعني 10 محاولات غلط ورا بعض بتقفل اليوزر 10 دقايق. والـ 42 يوم دي ممكن تتطبق على يوزر عملته بـ [[net user]]، فبص على [[Password expires]] في تفاصيله؛ لو فيها تاريخ هيطلب منه يغيّر الباسورد ساعتها.

الأدمن المدمج ([[Administrator]]): [[net user Administrator /active:yes]] بيفعّله. ده خطر لأنه افتراضيًا مش بيعدّي على UAC (كل حاجة بتشتغل بصلاحيات كاملة من غير ما تسأل)، واسمه معروف فأي هجوم بيجرّبه الأول، ومستثنى من قيود UAC على الشبكة (درس shutdown /m). استخدامه المعقول الوحيد: يوزرك الأدمن باظ ومحتاج تدخل تصلّحه. حطله باسورد قوي ([[net user Administrator *]])، واقفله بـ [[/active:no]] أول ما تخلص. وفي بعض لغات ويندوز اسمه متترجم، فشوف اسمه من [[net user]] الأول.

المقابل في PowerShell: [[Get-LocalUser]] و [[New-LocalUser]] و [[Disable-LocalUser]] (في تاب «PowerShell»).`,
            when: R`جهاز مشترك في البيت، يوزر عادي للتجربة أو لطفل، يوزر مؤقت لحد بـ [[/expires]]، ساعات استخدام بـ [[/times]]، أو مراجعة أمنية: مين اليوزرز اللي على الجهاز ومين فيهم أدمن.`,
            mistakes: R`تكتب الباسورد في الأمر نفسه فيفضل في الـ history والسكربتات. أو تمسح يوزر وتفتكر ملفاته راحت (فولدره في C:\Users لسه موجود). أو تفعّل Administrator وتسيبه شغال أو من غير باسورد. أو تعطّل يوزرك الأدمن الوحيد ([[/active:no]]) فمتلاقيش حد يصلّح. أو صيغة تاريخ [[/expires]] غير صيغة جهازك (شوفها بـ [[echo %date%]]). أو [[/times]] فيها مسافات. أو تجرّب من CMD عادي وتستغرب [[Access is denied]].`
          },
          teach: R`## الفكرة: [[net user]] + اسم + اللي عايز تعمله

من غير اسم: لستة اليوزرز. باسم بس: تفاصيله. باسم وإضافة: عدّل ([[/add]] أو [[/active:no]] أو [[/delete]]...). العرض جرّبته من CMD عادي على ويندوز 11 Home، والتعديل محتاج أدمن ومشغّلتهوش عشان ميغيّرش يوزرز الجهاز (جرّبت [[/add]] من CMD عادي بس، واترفض). اسم الجهاز واليوزر في الناتج غيّرتهم لـ [[ALI-PC]] و [[ali]].

---

## ١. [[net user]]

~~~cmd
net user
~~~

~~~text الناتج
User accounts for \\ALI-PC

-------------------------------------------------------------------------------
ali                      Administrator            DefaultAccount
Guest                    WDAGUtilityAccount
The command completed successfully.
~~~

- [[\\ALI-PC]] اسم الجهاز، و [[\\]] قبله طريقة ويندوز لكتابة اسم جهاز.
- [[ali]] اليوزر الحقيقي. الباقي حسابات ويندوز نفسه، متلمسهاش:

| الحساب | إيه هو |
|---|---|
| [[Administrator]] | الأدمن المدمج، مقفول افتراضيًا |
| [[Guest]] | ضيف، مقفول |
| [[DefaultAccount]] | حساب داخلي بيستخدمه النظام |
| [[WDAGUtilityAccount]] | بتاع Microsoft Defender Application Guard |

---

## ٢. [[net user %USERNAME%]]

~~~cmd
net user %USERNAME%
~~~

[[%USERNAME%]] متغير CMD فيه اسم يوزرك، فـ CMD بيبدّله بـ [[ali]] قبل ما ينفّذ.

~~~text الناتج (السطور المهمة)
Account active               Yes
Account expires              Never
Password last set            2/27/2026 4:59:35 PM
Password expires             Never
Last logon                   Never
Logon hours allowed          All
Local Group Memberships      *Administrators       *docker-users
                             *Performance Log Users*Users
~~~

| السطر | معناه |
|---|---|
| [[Account active]] | شغال ولا متعطل |
| [[Password expires]] | الباسورد بينتهي إمتى ([[Never]] أبدًا) |
| [[Last logon]] | [[Never]] رغم إني داخل! لأنه حساب Microsoft، والدخول بيتسجل هناك |
| [[Logon hours allowed]] | [[All]] أي وقت |
| [[Local Group Memberships]] | الجروبات، وكل اسم قبله [[*]]. [[*Administrators]] يعني أدمن |

([[*Performance Log Users*Users]] لازقين لأن العمود ضيق؛ دول جروبين.)

---

## ٣. يوزر جديد

~~~cmd
net user sara * /add
~~~

- [[sara]] الاسم (لحد 20 حرف).
- [[*]] مكان الباسورد: «اسألني عليه». بيطلبه مرتين ومش بيظهر وانت بتكتب، ومش بيتسجل في الـ history.
- [[/add]] اعمل اليوزر.

من CMD عادي جرّبته: سأل الباسورد مرتين عادي، وبعدين:

~~~text الناتج
Type a password for the user: Retype the password to confirm: System error 5 has occurred.

Access is denied.
~~~

يعني الفحص على الصلاحية بييجي **بعد** ما تكتب الباسورد. من CMD أدمن: [[The command completed successfully.]] (من التوثيق).

---

## ٤. ميعاد انتهاء وساعات دخول

~~~cmd
net user sara /expires:12/31/2026 /times:M-F,8AM-6PM
~~~

- [[/expires:12/31/2026]] اليوزر يقف من أول اليوم ده، بصيغة تاريخ جهازك (عندي شهر/يوم/سنة).
- [[/times:M-F,8AM-6PM]]: [[M-F]] من الاتنين (Monday) للجمعة (Friday)، وبعد الفاصلة الساعات. من غير مسافات خالص.

---

## ٥ و ٦. عطّل وامسح

~~~cmd
net user sara /active:no
net user sara /delete
~~~

[[/active:no]] اليوزر ميقدرش يدخل بس ملفاته باقية (و [[/active:yes]] يرجّعه)، و [[/delete]] يمسحه، بس فولدره في [[C:\Users\sara]] بيفضل.

---

## ٧ و ٨. الأدمن المدمج

~~~cmd
net user Administrator /active:yes
net user Administrator /active:no
~~~

الأول بيفعّله للطوارئ، والتاني بيقفله تاني. ده حساب مش بيعدّي على UAC، فمتسيبهوش شغال. وحالته عندي ([[net user Administrator]]):

~~~text الناتج
Comment                      Built-in account for administering the computer/domain
Account active               No
~~~

---

## سياسة الباسوردات: [[net accounts]]

~~~text الناتج (سطور منه)
Maximum password age (days):                          42
Minimum password length:                              0
Lockout threshold:                                    10
Lockout duration (minutes):                           10
~~~

يعني 10 محاولات غلط ورا بعض بتقفل اليوزر 10 دقايق، والباسورد ممكن يطلب يتغيّر كل 42 يوم لليوزر اللي [[Password expires]] بتاعه مش Never.

---

## الخلاصة

| عايز | اكتب | أدمن؟ |
|---|---|---|
| اليوزرز | [[net user]] | لأ |
| تفاصيل | [[net user الاسم]] | لأ |
| جديد | [[net user الاسم * /add]] | أيوه |
| عطّل / رجّع | [[/active:no]] / [[/active:yes]] | أيوه |
| امسح | [[/delete]] | أيوه |

والباسورد دايمًا [[*]]، مش مكتوب في الأمر.`,
          lines: [
            R`لستة اليوزرز على الجهاز (مش محتاج أدمن).`,
            R`تفاصيل يوزرك: شغال ولا لأ، والباسورد، والجروبات.`,
            R`يوزر جديد، والـ [[*]] بتسأل على الباسورد مخفي بدل ما يتكتب في الأمر (أدمن).`,
            R`ينتهي آخر السنة، ويدخل من الاتنين للجمعة من 8 الصبح لـ 6 بالليل بس.`,
            R`عطّله من غير ما تمسحه.`,
            R`امسح اليوزر (فولدره في C:\Users بيفضل).`,
            R`فعّل الأدمن المدمج (للطوارئ بس).`,
            R`واقفله تاني أول ما تخلص.`
          ],
          sol: R`[[net user]] طلّع عندي:
[[User accounts for \\ALI-PC]]
[[ali  Administrator  DefaultAccount  Guest  WDAGUtilityAccount]]
[[The command completed successfully.]]
و [[net user %USERNAME%]] طلّع [[Account active Yes]] و [[Password expires Never]] و [[Logon hours allowed All]]، وتحت [[Local Group Memberships]]: [[*Administrators]] و [[*docker-users]] و [[*Performance Log Users]] و [[*Users]]، يعني اليوزر ده أدمن. و [[Last logon Never]] مع إني داخل بيه، لأنه حساب Microsoft. و [[net user Administrator]] طلّع [[Account active No]] و [[Comment Built-in account for administering the computer/domain]]: الأدمن المدمج موجود بس مقفول، وده الصح.

(الإنشاء والتعديل والمسح مشغّلتهمش هنا عشان ميغيّروش يوزرز الجهاز؛ ده من توثيق Microsoft.) من CMD أدمن [[net user sara * /add]] بيسأل [[Type a password for the user:]] وبعدين [[Retype the password to confirm:]] ومش بيظهر اللي بتكتبه، وبعدها [[The command completed successfully.]]، وكذلك [[/active:no]] و [[/delete]]. ومن CMD عادي: [[System error 5 has occurred.]] و [[Access is denied.]].`
        },
        {
          cmd: "net localgroup",
          title: "الجروبات: مين أدمن ومين لأ",
          desc: R`[[net localgroup]] بيعرض الجروبات المحلية ومين جوه كل جروب، وبيضيف يوزر لجروب أو يشيله منه. الجروب هو اللي بيحدد الصلاحيات: اللي في [[Administrators]] أدمن، واللي في [[Users]] بس يوزر عادي.

[[net localgroup]] لوحده: كل الجروبات (كل اسم قبله [[*]]). [[net localgroup Administrators]] مين الأدمنز. والعرض مش محتاج أدمن.
[[net localgroup Administrators sara /add]] خلّي sara أدمن، و [[/delete]] شيلها من الجروب (اليوزر نفسه بيفضل). الاتنين محتاجين CMD كأدمن.
[[net localgroup "Remote Desktop Users" sara /add]] تقدر تدخل الجهاز ده بـ Remote Desktop من غير ما تبقى أدمن، وعلامات التنصيص عشان الاسم فيه مسافات. الجروب ده مش موجود في Home أصلًا: جرّبته وطلع [[System error 1376 has occurred.]] و [[The specified local group does not exist.]]، لأن Home مينفعش يستقبل Remote Desktop (درس mstsc).

أسماء الجروبات متترجمة: على ويندوز بلغة تانية [[Administrators]] اسمه مختلف، فالأمر بالإنجليزي هيطلّع نفس error 1376. شوف الاسم الصح من [[net localgroup]] على الجهاز نفسه. وفي السكربتات استخدم الـ SID الثابت (رقم مش بيتترجم): [[S-1-5-32-544]] هو Administrators في أي لغة، و [[S-1-5-32-545]] هو Users.`,
          example: R`net localgroup
net localgroup Administrators
net localgroup Administrators sara /add
net localgroup Administrators sara /delete
net localgroup "Remote Desktop Users" sara /add
net localgroup Users`,
          try: R`اعرف مين الأدمنز على جهازك. لو لقيت يوزر مش عارفه، اعرف تفاصيله بـ [[net user]] قبل ما تعمل أي حاجة.`,
          flag: "danger",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[net localgroup LabNoSuchGroup]] و [[net localgroup "Remote Desktop Users"]] على ويندوز Home، والـ errorlevel بعد كل واحد.`, done: R`الاتنين [[System error 1376 has occurred.]] و [[The specified local group does not exist.]] و errorlevel 2. الجروب التاني موجود في Pro بس، فنفس السكربت بيتصرّف مختلف حسب النسخة.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** مين الأدمنز على جهازك: [[net localgroup Administrators]]، وبعدين [[net user]] لكل اسم في Members.`, done: R`عرفت كل عضو: يوزرك، و [[Administrator]] المدمج (عضو دايمًا حتى وهو مقفول، و [[Account active No]])، وأي اسم تاني عرفت هو بتاع مين من [[Last logon]] و [[Password last set]].` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** اسم Administrators بيتغيّر مع لغة ويندوز. اعرف الـ SID الثابت بتاعه من [[whoami /groups | findstr /c:"S-1-5-32-544"]]، واكتب ليه السكربت الصح بيستخدم الـ SID.`, done: R`السطر طلع [[BUILTIN\Administrators  Alias  S-1-5-32-544  Group used for deny only]] (من نافذة عادية). وكتبت إن [[S-1-5-32-544]] نفسه على ويندوز عربي أو ألماني، والاسم لأ، فـ [[icacls]] بـ [[*S-1-5-32-544]] بيشتغل في كل اللغات.` },
          ],
          deep: {
            why: R`أي برنامج بتشغّله بياخد صلاحيات اليوزر اللي شغّله. لو انت أدمن طول اليوم، أي برنامج خبيث يوصلك يقدر ياخد صلاحيات كاملة بدوسة «Yes» واحدة على UAC. والجروبات هي اللي بتقرر مين أدمن، فلازم تعرف تشوفها وتظبطها، خصوصًا على جهاز مشترك أو جهاز حد طلب منك تراجعه.`,
            how: R`كل يوزر ليه SID (رقم ثابت)، وكل جروب كمان. لما يوزر يدخل، ويندوز بيعمله «توكن» فيه SID بتاعه و SIDs كل جروباته، وكل ملف أو إعداد بيتقارن بالتوكن ده. عشان كده إضافة يوزر لجروب مبتسريش غير لما يعمل sign out ويدخل تاني (توكن جديد).

الجروبات المدمجة ليها SIDs ثابتة: Administrators [[S-1-5-32-544]]، و Users [[S-1-5-32-545]]، و Remote Desktop Users [[S-1-5-32-555]]. [[net localgroup]] مبيقبلش SID، فالسكربت اللي هيشتغل على أجهزة بلغات مختلفة يستخدم PowerShell: [[Add-LocalGroupMember -SID S-1-5-32-544 -Member sara]] (في تاب «PowerShell»)، و [[icacls]] بيقبل SID بالشكل [[*S-1-5-32-545]] (درس icacls).

جروبات هتشوفها: [[docker-users]] (Docker Desktop بيعمله، ومن غيره Docker مش هيشتغل لليوزر)، و [[Hyper-V Administrators]]، و [[OpenSSH Users]]، و [[Remote Management Users]] (PowerShell Remoting). وفي [[Users]] هتلاقي [[NT AUTHORITY\Authenticated Users]] و [[NT AUTHORITY\INTERACTIVE]]: أي حد داخل الجهاز يوزر عادي تلقائيًا.

النصيحة اليومية: اعمل يوزر أدمن منفصل للتسطيب والإعدادات، واشتغل يوميًا بيوزر عادي (Standard). لما حاجة تحتاج أدمن، UAC هيطلب باسورد الأدمن بدل «Yes» بس، وده بيوقف أغلب البرامج الخبيثة. ومتشيلش نفسك من Administrators إلا لما تتأكد إن فيه أدمن تاني شغال وعارف باسورده.`,
            when: R`مراجعة مين أدمن على جهاز، تحويل يوزر لعادي أو أدمن، إضافة حد لـ docker-users أو Remote Desktop Users من غير ما يبقى أدمن، أو سكربت تجهيز أجهزة.`,
            mistakes: R`تشيل يوزرك الأدمن الوحيد من Administrators فتقفل على نفسك (الحل ساعتها من أدمن تاني أو Safe Mode). أو تستغرب إن الصلاحية الجديدة مسرتش (لازم sign out ودخول تاني). أو تكتب [[Administrators]] بالإنجليزي على ويندوز بلغة تانية. أو تنسى علامات التنصيص حوالين اسم فيه مسافات. أو تدوّر على Remote Desktop Users في Home.`
          },
          teach: R`## الفكرة: [[net localgroup]] + جروب + يوزر + إضافة

نفس شكل [[net user]]: من غير حاجة لستة الجروبات، وباسم جروب أعضاءه، وباسم جروب واسم يوزر و [[/add]] أو [[/delete]] تضيفه أو تشيله. جرّبت العرض من CMD عادي على ويندوز 11 Home، والإضافة جرّبتها من CMD عادي واترفضت فمتغيّرش حاجة. الأسامي في الناتج: [[ali]] و [[ALI-PC]].

---

## ١. [[net localgroup]]

~~~cmd
net localgroup
~~~

~~~text الناتج (سطور منه)
Aliases for \\ALI-PC

-------------------------------------------------------------------------------
*Administrators
*docker-users
*Guests
*Hyper-V Administrators
*OpenSSH Users
*Remote Management Users
*Users
The command completed successfully.
~~~

[[Aliases]] هو اسم ويندوز الرسمي للجروبات المحلية، وكل اسم قبله [[*]]. عندي كانوا 15، ومفيش [[Remote Desktop Users]] لأن الجهاز Home.

---

## ٢. مين الأدمنز

~~~cmd
net localgroup Administrators
~~~

~~~text الناتج
Alias name     Administrators
Comment        Administrators have complete and unrestricted access to the computer/domain

Members

-------------------------------------------------------------------------------
ali
Administrator
The command completed successfully.
~~~

[[Members]] الأعضاء: [[ali]] (أنا) و [[Administrator]] (الأدمن المدمج، عضو دايمًا حتى وهو مقفول).

---

## ٣ و ٤. ضيف وشيل

~~~cmd
net localgroup Administrators sara /add
net localgroup Administrators sara /delete
~~~

الترتيب: **الجروب الأول، وبعدين اليوزر**. [[/add]] تبقى sara أدمن، و [[/delete]] تتشال من الجروب بس (اليوزر نفسه بيفضل). من CMD عادي:

~~~text الناتج
System error 5 has occurred.

Access is denied.
~~~

ومن CMD أدمن: [[The command completed successfully.]]. والتغيير مش بيسري غير لما sara تعمل sign out وتدخل تاني.

---

## ٥. Remote Desktop من غير أدمن

~~~cmd
net localgroup "Remote Desktop Users" sara /add
~~~

علامات التنصيص لأن اسم الجروب فيه مسافات؛ من غيرها CMD هيفتكر إن اسم الجروب [[Remote]] بس. على Home الجروب مش موجود، وحتى العرض بيقول:

~~~text الناتج (net localgroup "Remote Desktop Users")
System error 1376 has occurred.

The specified local group does not exist.
~~~

[[1376]] = الجروب ده مش موجود. ونفس الخطأ هيطلع لو كتبت [[Administrators]] على ويندوز بلغة تانية الجروب فيها متترجم.

---

## ٦. اليوزرز العاديين

~~~cmd
net localgroup Users
~~~

~~~text الناتج
Alias name     Users
Comment        Users are prevented from making accidental or intentional system-wide changes and can run most applications

Members

-------------------------------------------------------------------------------
ali
NT AUTHORITY\Authenticated Users
NT AUTHORITY\INTERACTIVE
The command completed successfully.
~~~

[[NT AUTHORITY\Authenticated Users]] أي حد دخل بيوزر وباسورد، و [[NT AUTHORITY\INTERACTIVE]] أي حد قاعد على الجهاز نفسه. يعني كل يوزر تلقائيًا في Users.

---

## الخلاصة

| عايز | اكتب | أدمن؟ |
|---|---|---|
| كل الجروبات | [[net localgroup]] | لأ |
| أعضاء جروب | [[net localgroup الجروب]] | لأ |
| ضيف | [[net localgroup الجروب اليوزر /add]] | أيوه |
| شيل | [[net localgroup الجروب اليوزر /delete]] | أيوه |

- الجروب الأول وبعده اليوزر، والاسم اللي فيه مسافات بين علامات تنصيص.
- التغيير بيسري بعد sign out ودخول تاني.`,
          lines: [
            R`كل الجروبات على الجهاز.`,
            R`مين الأدمنز (مش محتاج أدمن).`,
            R`خلّي sara أدمن (أدمن، وبيسري بعد ما تدخل تاني).`,
            R`شيلها من الأدمنز (اليوزر نفسه بيفضل).`,
            R`تدخل بـ Remote Desktop من غير ما تبقى أدمن (Pro بس).`,
            R`مين في جروب اليوزرز العاديين.`
          ],
          sol: R`[[net localgroup Administrators]] طلّع عندي:
[[Alias name     Administrators]]
[[Comment        Administrators have complete and unrestricted access to the computer/domain]]
وتحت [[Members]] اسمين: [[ali]] و [[Administrator]] (الأدمن المدمج دايمًا عضو حتى وهو مقفول). و [[net localgroup]] عرض 15 جروب منهم [[*Administrators]] و [[*Users]] و [[*Guests]] و [[*docker-users]] و [[*OpenSSH Users]] و [[*Remote Management Users]] و [[*Device Owners]]، ومفيش [[Remote Desktop Users]] لأن الجهاز Home. و [[net localgroup Users]] فيه [[ali]] و [[NT AUTHORITY\Authenticated Users]] و [[NT AUTHORITY\INTERACTIVE]].

لو لقيت يوزر مش عارفه في Administrators: [[net user الاسم]] وبص على [[Account active]] و [[Password last set]] و [[Last logon]]. ولو مش بتاعك عطّله الأول بـ [[net user الاسم /active:no]] (أضمن من المسح، لو طلع برنامج محتاجه). (الإضافة والشيل مشغّلتهمش هنا: بيطبعوا [[The command completed successfully.]] من CMD أدمن، و [[System error 5 has occurred.]] من غيره.)`
        },
        {
          cmd: "whoami /groups /priv",
          title: "النافذة دي أدمن ولا لأ؟ (integrity level)",
          desc: R`[[whoami /groups]] بيعرض الجروبات اللي في «التوكن» بتاع النافذة دي، ومنها سطر [[Mandatory Label]] اللي بيقولك هي شغالة بصلاحيات أدمن فعلًا ولا لأ. و [[whoami /priv]] بيعرض الـ privileges: صلاحيات خاصة زي «اقفل الجهاز» و «غيّر المنطقة الزمنية».

ليه انت في Administrators ومع ذلك [[Access is denied]]؟ بسبب UAC: الأدمن لما يدخل بياخد توكنين، واحد عادي بيشتغل بيه كل حاجة، وواحد كامل بيتستخدم بس لما توافق على UAC (Run as administrator). سطر [[Mandatory Label]] بيفرّق:
[[Medium Mandatory Level]] نافذة عادية، حتى لو انت أدمن.
[[High Mandatory Level]] نافذة أدمن (elevated).
[[System Mandatory Level]] شغال كـ SYSTEM (خدمة، أو مهمة مجدولة بـ [[/ru SYSTEM]]).

وفي النافذة العادية بتاعة أدمن، سطر [[BUILTIN\Administrators]] جنبه [[Group used for deny only]]: الجروب موجود في التوكن بس مبيدّيش أي سماح. وفي نافذة الأدمن بيبقى [[Enabled group]].

[[/fo list]] (أو [[table]] أو [[csv]]) شكل الناتج، و [[/all]] كل حاجة مرة واحدة (اليوزر والـ SID والجروبات والـ privileges). وفي [[/priv]] عمود [[State]]: [[Disabled]] مش معناها ممنوع، معناها موجودة في التوكن والبرنامج يفعّلها وقت ما يحتاجها. اللي مش في اللستة خالص هو اللي مش عندك.`,
          example: R`whoami /groups /fo list | findstr /c:"Mandatory Label"
whoami /groups | findstr /i "Administrators"
whoami /priv
whoami /groups | find "S-1-16-12288" >nul || echo NOT-ELEVATED
whoami /all`,
          try: R`افتح نافذة CMD عادية ونافذة أدمن (Win+X ثم Terminal (Admin))، وشغّل أول سطرين في الاتنين وقارن.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** من نافذة CMD عادية وحسابك أدمن: [[whoami /groups | findstr /c:"S-1-5-32-544"]]. إيه اللي في آخر السطر؟`, done: R`[[BUILTIN\Administrators ... S-1-5-32-544 ... Group used for deny only]]: الجروب في التوكن بس متعطّل للسماح. في نافذة أدمن نفس السطر بيبقى فيه [[Enabled group]].` },
            { lvl: 'سريع', t: R`**بيانات حقيقية:** [[whoami /priv | findstr /i "SeShutdownPrivilege SeTimeZonePrivilege SeChangeNotifyPrivilege"]].`, done: R`[[SeShutdownPrivilege  Shut down the system  Disabled]] و [[SeChangeNotifyPrivilege  Bypass traverse checking  Enabled]] و [[SeTimeZonePrivilege  Change the time zone  Disabled]]. [[Disabled]] هنا معناها «عندك وبتتفعّل وقت الحاجة»، مش ممنوع.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** عدّ الـ privileges في نافذة عادية: [[whoami /priv /fo csv | find /c /v ""]]، وفي نافذة أدمن (لو عندك). والجروبات: [[whoami /groups /fo csv /nh | find /c /v ""]].`, done: R`النافذة العادية طلّعت 6 سطور privileges (سطر عناوين + 5)، والجروبات 15. ونافذة الأدمن فيها privileges أكتر بكتير (زي [[SeTakeOwnershipPrivilege]] و [[SeDebugPrivilege]])، وده الفرق الحقيقي بين التوكنين.` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** [[whoami /upn]] على حساب محلي، و [[whoami /nosuch]]، والـ errorlevel.`, done: R`الأول [[ERROR: Unable to get User Principal Name (UPN) as the current logged-on user]] و [[is not a domain user.]] و 1، والتاني [[ERROR: Invalid argument/option - '/nosuch'.]] و 1. و [[whoami /groups /priv]] مع بعض اشتغل وطبع القسمين.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** [[net session >nul 2>&1 & echo admin-check=%errorlevel%]] على سطر واحد في [[cmd /c]] طبع [[admin-check=0]] من نافذة عادية. ليه؟ وصلّحه.`, done: R`[[%errorlevel%]] اتفك لما CMD قرا السطر، قبل ما [[net session]] يشتغل، فطبع القيمة القديمة (0). على سطرين في ملف [[.bat]] طبع [[errorlevel=2]]، وكمان [[net session >nul 2>&1 && echo ADMIN || echo NOT ADMIN]] طبع [[NOT ADMIN]] صح لأن [[||]] بيشوف كود الأمر نفسه.` },
            { lvl: 'تحدي', t: R`**ابني:** [[level.bat]] بيطبع «High» أو «Medium» من [[whoami /groups | findstr /c:"S-1-16-12288"]] و [[S-1-16-8192]]، ويخرج بـ 0 للأدمن و 1 للعادي، عشان سكربتات تانية تناديه بـ [[call]].`, done: R`من نافذة عادية طبع [[MEDIUM]] و errorlevel 1، و [[call level.bat || echo need admin]] طبع [[need admin]]. والأرقام دي SIDs للـ integrity level ([[S-1-16-12288]] = High) فمش بتتغيّر مع لغة ويندوز.` },
          ],
          deep: {
            why: R`أغلب «Access is denied» على جهازك الشخصي مش لأنك مش أدمن، لكن لأن النافذة نفسها مش elevated. السطر الأول بيقولك ده في ثانية بدل التخمين، والسطر الرابع بيخلّي سكربت bat يتأكد إنه شغال كأدمن قبل ما يبدأ، بدل ما يفشل في النص.`,
            how: R`كل process ليه token فيه: اليوزر، والجروبات، والـ privileges، والـ integrity level. ويندوز بيقارن التوكن ده بصلاحيات كل ملف أو مفتاح ريجستري (درس icacls). والـ integrity level طبقة زيادة: process بـ Medium ميقدرش يكتب في حاجة متعلّمة High حتى لو الصلاحيات بتسمح.

الـ SIDs بتوع المستويات ثابتة ومش بتتترجم: [[S-1-16-8192]] Medium، و [[S-1-16-12288]] High، و [[S-1-16-16384]] System. عشان كده السطر الرابع بيدوّر على SID مش على كلمة High، فبيشتغل على أي لغة ويندوز. [[>nul]] بيخفي ناتج find، و [[||]] بينفّذ اللي بعده لو find ملقاش (درس && و || و &). وفي سكربت حقيقي: [[whoami /groups | find "S-1-16-12288" >nul || (echo Run this as administrator & exit /b 1)]].

سطر [[NT AUTHORITY\Local account and member of Administrators group]] ([[S-1-5-114]]) بيظهر لأي يوزر محلي أدمن، وهو اللي بيمنع حسابات محلية أدمن من الإدارة عن بعد (UAC remote restrictions، درس shutdown /m).

و [[whoami /priv]] في نافذة عادية بيطلّع حوالي 5 privileges، وفي نافذة أدمن أكتر من 20، منها [[SeTakeOwnershipPrivilege]] (اللي takeown بيستخدمها) و [[SeBackupPrivilege]] و [[SeDebugPrivilege]] و [[SeRemoteShutdownPrivilege]].`,
            when: R`قبل أي أمر محتاج أدمن (sfc و chkdsk و netsh set و icacls على ملفات النظام)، في أول سكربت bat لازم يشتغل كأدمن، أو لما برنامج يقول Access denied وانت متأكد إنك أدمن.`,
            mistakes: R`تفتكر إن وجودك في Administrators معناه إن كل نافذة أدمن. أو تقرا [[Disabled]] في /priv على إنها «ممنوع». أو تتأكد من الأدمن في سكربت بـ findstr على [[High Mandatory Level]] فيبوظ على ويندوز بلغة تانية (استخدم الـ SID). أو تخلط بين [[whoami]] (انت مين) و [[whoami /groups]] (انت بصلاحيات إيه دلوقتي).`
          },
          teach: R`## الفكرة: اسأل النافذة دي نفسها

[[whoami]] لوحده بيقول انت مين. لكن [[/groups]] و [[/priv]] بيقروا **التوكن** بتاع النافذة دي: الجروبات والصلاحيات اللي معاها فعلًا دلوقتي. جرّبت كل السطور في نافذة CMD عادية (مش أدمن) على ويندوز 11، واليوزر أدمن.

> لو Git متسطب، فيه [[whoami]] تاني بتاع Git. [[where whoami]] عندي طلّع الاتنين، وفي CMD عادي اللي بيشتغل [[C:\Windows\System32\whoami.exe]]. لو شفت [[Invalid argument]] مع [[/groups]]، يبقى اشتغل التاني.

---

## ١. النافذة دي أدمن ولا لأ؟

~~~cmd
whoami /groups /fo list | findstr /c:"Mandatory Label"
~~~

- [[/groups]] الجروبات اللي في التوكن.
- [[/fo list]] (format) كل جروب في كذا سطر، وأول سطر فيهم [[Group Name: ...]].
- [[| findstr /c:"Mandatory Label"]] خلّي السطر اللي فيه الكلام ده بس. و [[/c:]] عشان الكلام فيه مسافة: من غيرها findstr هيدوّر على [[Mandatory]] **أو** [[Label]].

~~~text الناتج
Group Name: Mandatory Label\Medium Mandatory Level
~~~

[[Medium]] = نافذة عادية، حتى لو انت أدمن. في نافذة أدمن بيبقى [[High Mandatory Level]] (من توثيق UAC؛ نافذة أدمن مقدرتش أفتحها هنا).

---

## ٢. جروب Administrators في التوكن

~~~cmd
whoami /groups | findstr /i "Administrators"
~~~

[[/i]] من غير فرق بين كابيتال وسمول. والشكل الافتراضي جدول، سطر لكل جروب:

~~~text الناتج (مختصر)
NT AUTHORITY\Local account and member of Administrators group  S-1-5-114     Group used for deny only
BUILTIN\Administrators                                         S-1-5-32-544  Group used for deny only
~~~

[[Group used for deny only]] يعني: الجروب موجود في التوكن، **بس مبيدّيش أي سماح**؛ بيتستخدم بس لو فيه منع على الجروب ده. ده اللي UAC بيعمله: الأدمن بياخد توكن عادي، والكامل بس لما توافق على Run as administrator. في نافذة الأدمن نفس السطر بيبقى [[Enabled group]].

---

## ٣. [[whoami /priv]]

~~~cmd
whoami /priv
~~~

~~~text الناتج
Privilege Name                Description                          State
============================= ==================================== ========
SeShutdownPrivilege           Shut down the system                 Disabled
SeChangeNotifyPrivilege       Bypass traverse checking             Enabled
SeUndockPrivilege             Remove computer from docking station Disabled
SeIncreaseWorkingSetPrivilege Increase a process working set       Disabled
SeTimeZonePrivilege           Change the time zone                 Disabled
~~~

- [[Privilege Name]] اسم الصلاحية الخاصة ([[Se]] من security)، و [[Description]] شرحها.
- [[State Disabled]] **مش** معناها ممنوع: الصلاحية موجودة في التوكن، والبرنامج يفعّلها وقت ما يحتاجها (زي [[shutdown]] لما يقفل الجهاز).
- 5 بس في النافذة العادية. في نافذة الأدمن أكتر من 20، منهم [[SeTakeOwnershipPrivilege]] اللي takeown محتاجها.

---

## ٤. فحص للسكربتات

~~~cmd
whoami /groups | find "S-1-16-12288" >nul || echo NOT-ELEVATED
~~~

من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[S-1-16-12288]] | الـ SID الثابت بتاع High Mandatory Level، نفسه في أي لغة ويندوز |
| [[find "..."]] | دوّر عليه، ولو ملقاهوش errorlevel بيبقى 1 |
| [[>nul]] | خبّي ناتج find، مش محتاجينه |
| [[echo NOT-ELEVATED]] | اطبع التحذير |

والعلامتين [[||]] في النص معناهم: لو اللي قبلهم فشل (find ملقاش)، نفّذ اللي بعدهم (درس && و || و &).

~~~text الناتج في النافذة العادية
NOT-ELEVATED
~~~

وفي نافذة أدمن find بيلاقي الـ SID فمبيطبعش حاجة. ليه SID مش كلمة High؟ لأن الكلام بيتترجم على ويندوز بلغة تانية، والرقم لأ. الـ SIDs: [[S-1-16-8192]] Medium، و [[S-1-16-12288]] High، و [[S-1-16-16384]] System.

---

## ٥. [[whoami /all]]

~~~cmd
whoami /all
~~~

كل حاجة مرة واحدة. أوله:

~~~text الناتج (أوله)
USER INFORMATION
----------------

User Name    SID
============ ==============================================
ali-pc\ali   S-1-5-21-...-1001
~~~

وبعده قسم [[GROUP INFORMATION]] (زي [[/groups]]) و [[PRIVILEGES INFORMATION]] (زي [[/priv]]). والـ SID بتاع اليوزر بيخلص بـ [[1001]]: أول يوزر اتعمل على الجهاز.

---

## الخلاصة

| السؤال | الأمر | الإجابة في نافذة عادية |
|---|---|---|
| النافذة أدمن؟ | [[whoami /groups]] + Mandatory Label | [[Medium]] |
| Administrators شغال؟ | [[whoami /groups]] + Administrators | [[deny only]] |
| الـ privileges | [[whoami /priv]] | 5 |
| في سكربت | [[find "S-1-16-12288"]] | [[NOT-ELEVATED]] |

إنك في Administrators مش معناه إن النافذة أدمن.`,
          lines: [
            R`النافذة دي Medium (عادية) ولا High (أدمن)؟`,
            R`جروب Administrators: [[deny only]] في نافذة عادية، و [[Enabled group]] في نافذة أدمن.`,
            R`الـ privileges اللي في التوكن وحالتها.`,
            R`فحص للسكربتات: بيطبع NOT-ELEVATED لو النافذة مش أدمن، على أي لغة.`,
            R`كل حاجة: اليوزر والـ SID والجروبات والـ privileges.`
          ],
          sol: R`في نافذة CMD عادية وأنا أدمن: السطر الأول طبع [[Group Name: Mandatory Label\Medium Mandatory Level]]. والتاني طبع سطرين: [[NT AUTHORITY\Local account and member of Administrators group ... Group used for deny only]] و [[BUILTIN\Administrators  Alias  S-1-5-32-544  Group used for deny only]]: اليوزر أدمن بس النافذة لأ. و [[whoami /priv]] طلّع 5 بس: [[SeShutdownPrivilege]] (Disabled) و [[SeChangeNotifyPrivilege]] (Enabled) و [[SeUndockPrivilege]] و [[SeIncreaseWorkingSetPrivilege]] و [[SeTimeZonePrivilege]]. والسطر الرابع طبع [[NOT-ELEVATED]].

في نافذة الأدمن (Terminal (Admin)) السطر الأول بيطبع [[High Mandatory Level]]، والتاني بيبقى جنب Administrators [[Mandatory group, Enabled by default, Enabled group, Group owner]] بدل deny only، والرابع مبيطبعش حاجة، و [[/priv]] أكتر من 20 سطر. (نافذة الأدمن مقدرتش أفتحها هنا، فده من توثيق UAC و whoami.)`
        },
        {
          cmd: "icacls",
          title: "صلاحيات الملفات والفولدرات",
          desc: R`[[icacls]] بيعرض صلاحيات ملف أو فولدر (الـ ACL: مين يقدر يعمل إيه) ويغيّرها: يدّي صلاحية، أو يمنع، أو يشيل، أو يرجّعها للموروث، أو ياخد منها نسخة احتياطي. ده المقابل لـ [[chmod]] و [[chown]] في لينكس، بس أدق بكتير.

[[icacls folder]] لوحده بيعرض سطر لكل يوزر أو جروب: الاسم، وبعده [[:]] والصلاحيات بين أقواس.
الصلاحيات الأساسية: [[F]] كل حاجة (Full، ومنها تغيير الصلاحيات نفسها)، و [[M]] تعديل (قراية وكتابة ومسح)، و [[RX]] قراية وتشغيل، و [[R]] قراية بس، و [[W]] كتابة بس، و [[D]] مسح.
الوراثة (inheritance)، وبتتكتب قبل الصلاحية: [[(OI)]] الملفات اللي جوه الفولدر تورثها (object inherit)، و [[(CI)]] الفولدرات اللي جوه تورثها (container inherit)، و [[(IO)]] للي جوه بس مش الفولدر نفسه (inherit only)، و [[(NP)]] المستوى اللي تحته بس (no propagate). و [[(I)]] في العرض معناها «الصلاحية دي جاية بالوراثة من الفولدر اللي فوق».

التعديل:
[[/grant Users:(OI)(CI)M]] ادّي جروب Users تعديل على الفولدر وكل اللي جواه. لو كتبتها تاني بصلاحية مختلفة بتتضاف جنب القديمة، و [[/grant:r]] بتستبدل القديمة (replace).
[[/deny Users:W]] امنع الكتابة. المنع بيكسب أي سماح، فاستخدمه نادرًا.
[[/remove Users]] شيل الصلاحيات المكتوبة صريح لـ Users (مش الموروثة).
[[/inheritance:d]] اقطع الوراثة وانسخ الموروث كصلاحيات صريحة، و [[/inheritance:r]] اقطعها وشيل الموروث خالص، و [[/inheritance:e]] رجّعها.
[[/reset]] امسح الصريح وارجع للموروث بس.
[[/t]] على كل اللي جوه، و [[/c]] كمّل لو حاجة فشلت، و [[/q]] متطبعش سطر لكل ملف.
[[/save file /t]] احفظ الصلاحيات في ملف، و [[/restore file]] رجّعها منه.

القراية مش محتاجة أدمن، والتعديل على ملفاتك (اللي انت صاحبها) برضه لأ. ملفات يوزرز تانيين أو النظام محتاجة CMD كأدمن. ولو الأسماء متترجمة على جهازك، [[*S-1-5-32-545]] (بالنجمة) يعني Users في أي لغة.`,
          example: R`mkdir shared\sub
icacls shared
icacls shared /grant Users:(OI)(CI)M
icacls shared\sub
icacls shared /grant:r Users:(OI)(CI)RX
icacls shared /save shared-acl.txt /t
icacls shared /remove Users
icacls shared /reset /t /c /q`,
          try: R`في lab: اعمل فولدر، ادّي Users صلاحية RX عليه، واعرض صلاحيات فولدر جواه وشوف [[(I)]]، وبعدين رجّع كل حاجة بـ [[/reset /t]] وامسح الفولدر.`,
          flag: "danger",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** في فولدر تجربة: [[icacls acl /grant Users:(OI)(CI)RX]] وبعدين [[icacls acl\sub\f.txt | findstr /i "Users"]].`, done: R`الأول [[processed file: acl]] و [[Successfully processed 1 files; Failed processing 0 files]]، والتاني [[acl\sub\f.txt BUILTIN\Users:(I)(RX)]]: الملف ورث RX، و [[(I)]] = جاية بالوراثة. على ملف مفيش [[(OI)(CI)]] لأنه مش فولدر.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** نفس [[/grant Users:(OI)(CI)RX]] تاني، وبعدين [[/grant:r Users:(OI)(CI)M]]. كام سطر Users هيبقى في [[icacls acl]] بعد كل واحدة؟`, done: R`بعد التكرار [[find /c "BUILTIN\Users"]] طبع 1: نفس الصلاحية مبتتكررش. وبعد [[/grant:r]] السطر بقى [[acl BUILTIN\Users:(OI)(CI)(M)]]: [[:r]] شالت RX وحطت M مكانها بدل ما تزوّد.` },
            { lvl: 'تطبيق', t: R`**محاكاة:** امنع نفسك من الكتابة في فولدر تجربة: [[icacls acl\sub /deny "%USERNAME%":(OI)(CI)W]]، وبعدين [[echo x> acl\sub\new.txt]] و [[echo %errorlevel%]] على سطر لوحده، وبعدين رجّع بـ [[/remove:d]].`, done: R`الكتابة طبعت [[Access is denied.]] بس errorlevel كان **0**: فشل التوجيه [[>]] مش بيغيّر الكود، فسكربت بيكتب لوج مش هيعرف إنه فشل (افحص بـ [[if exist]]). وبعد [[icacls acl\sub /remove:d "%USERNAME%"]] الكتابة نجحت.` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** [[icacls nosuchfile.txt]] و [[icacls acl /grant NoSuchLabUser:R]] و [[icacls acl /grant Users:(OI)(CI)Q]]، و errorlevel لكل واحد.`, done: R`[[nosuchfile.txt: The system cannot find the file specified.]] و 2، و [[NoSuchLabUser: No mapping between account names and security IDs was done.]] و 1332، و [[Invalid parameter "Users:(OI)(CI)Q"]] و 87. التلات أكواد بيفرّقوا ملف غلط من يوزر غلط من صلاحية غلط.` },
            { lvl: 'تحدي', t: R`**بيانات حقيقية:** [[icacls acl /save acl.txt /t]] وبعدين [[find /c /v "" acl.txt]] و [[type acl.txt]]. الملف شكله إيه؟ وجرّب [[icacls . /restore acl.txt]] من نافذة عادية.`, done: R`[[find /c]] طلّع رقم غريب (624) لأن الملف UTF-16، و [[type]] وراه سطر اسم الملف وتحته SDDL زي [[D:AI(A;OICI;0x1301bf;;;BU)(A;OICI;FA;;;SY)...]] ([[BU]] = Users، و [[SY]] = SYSTEM، و [[FA]] = Full). و [[/restore]] من نافذة عادية فشل بـ [[Not all privileges or groups referenced are assigned to the caller.]] و errorlevel 1300، فالـ restore بيتعمل من نافذة أدمن.` },
            { lvl: 'تحدي', t: R`**ابني:** [[acl-report.bat FOLDER]] بيطبع لكل ملف وفولدر جوه (بـ [[for /r]]) أي سطر صلاحية **صريح** (من غير [[(I)]]) لـ Users أو Everyone، ويكتبهم في [[acl-report.txt]]، وفي الآخر العدد. قراية بس.`, done: R`على فولدر التجربة بعد [[/grant Users:(OI)(CI)RX]] طلع سطر واحد للفولدر نفسه ومفيش للي جواه (عندهم [[(I)]])، وبعد [[icacls acl /reset /t /c /q]] (طبع [[Successfully processed 4 files]]) العدد بقى 0. والسكربت مفيهوش ولا [[/grant]] أو [[/deny]].` },
          ],
          deep: {
            why: R`مشروع على D مش راضي يتمسح، أو برنامج شغال كخدمة مش قادر يكتب في فولدر اللوج، أو فولدر مشترك على الشبكة عايز الناس تقرا منه بس، أو مفتاح SSH ويندوز رافضه لأن صلاحياته «too open» (OpenSSH على ويندوز بيشترط إن محدش غيرك يقرا المفتاح). كل ده صلاحيات NTFS، والواجهة (Properties ثم Security) بطيئة ومش بتتحط في سكربت.`,
            how: R`كل ملف وفولدر على NTFS ليه صاحب (owner) وقايمة ACL، وكل سطر فيها: يوزر أو جروب، وسماح أو منع، وصلاحيات، وأعلام وراثة. ويندوز بيقرا القايمة بترتيب: المنع الصريح الأول، وبعدين السماح، والصريح قبل الموروث.

الحروف [[F]] و [[M]] و [[RX]] اختصارات لمجموعات، وفيه صلاحيات دقيقة بتتكتب بفواصل، زي [[(RX,WD,AD)]] اللي على [[C:\Users\Public]]، و [[(GR,GE)]] (generic read و execute) مع [[(IO)]] اللي على [[C:\Program Files]]. و [[C:\Windows\notepad.exe]] عليه [[NT SERVICE\TrustedInstaller:(F)]] و [[BUILTIN\Administrators:(RX)]]: حتى الأدمنز قراية وتشغيل بس (درس takeown).

جرّبت على فولدر في TEMP: بعد [[/grant Users:(OI)(CI)M]] الفولدر عرض [[BUILTIN\Users:(OI)(CI)(M)]] (صريح)، والفولدر اللي جواه [[BUILTIN\Users:(I)(OI)(CI)(M)]]، والملف جواه [[BUILTIN\Users:(I)(M)]]: الملف مبيبقاش عليه OI و CI لأن مفيش حاجة جواه تورث. و [[/grant Users:RX]] على ملف عنده M موروثة ضافت سطر جديد جنب الموروث مش مكانه، و [[/deny Users:W]] ظهرت [[BUILTIN\Users:(DENY)(W)]] أول سطر.

[[/save]] بيكتب الصلاحيات بصيغة SDDL (نص زي [[D:AI(A;OICIID;FA;;;SY)]])، والأسامي جواه نسبية للفولدر اللي فوق: [[icacls D:\Projects\app /save acl.txt /t]] بيكتب [[app]] و [[app\file.txt]]، فالـ restore بيكون على الأب: [[icacls D:\Projects /restore acl.txt]]. والملف UTF-16 من غير BOM، فـ [[type]] بيطبعه بمسافات بين الحروف، افتحه في notepad. و [[/restore]] محتاج CMD كأدمن حتى على ملفاتك: جرّبته من غير أدمن وطلع [[Not all privileges or groups referenced are assigned to the caller.]].

errorlevel: [[0]] نجح، و [[1332]] الاسم مش موجود ([[No mapping between account names and security IDs was done.]])، و [[2]] الملف مش موجود. وصاحب الملف دايمًا يقدر يعدّل صلاحياته حتى لو شال كل حاجة، وده اللي بيخلّي الغلطة الأولى في mistakes تتصلّح. والمقابل في PowerShell: [[Get-Acl]] و [[Set-Acl]] (في تاب «PowerShell»).`,
            when: R`فولدر مشترك (قراية بس للناس)، فولدر لوج أو uploads لخدمة أو IIS، مشروع اتنقل من جهاز تاني وبقى مش بيتمسح (مع takeown)، مفتاح SSH، أو باك أب للصلاحيات قبل تعديل كبير.`,
            mistakes: R`[[/inheritance:r]] على فولدر كل صلاحياته موروثة: بيبقى من غير أي صلاحية خالص. جرّبتها على فولدر تجربة: [[icacls sub]] طبع الاسم من غير ولا سطر، والملف اللي جواه طلّع [[Access is denied.]] لصاحبه نفسه، ورجع بـ [[/inheritance:e]]. الصح [[/inheritance:d]] (بينسخ الموروث قبل ما يقطع)، أو [[/grant]] صريح الأول وبعدين [[:r]]. أو [[/deny]] على Everyone أو Users فتمنع نفسك (انت جوه Users). أو تنسى [[/t]] فالتعديل يبقى على الفولدر بس. أو [[/reset /t]] أو أي تعديل على [[C:\]] أو [[C:\Windows]] أو [[Program Files]]: بيبوّظ صلاحيات النظام ومحدش يقدر يرجّعها بسهولة. أو مسافات جوه [[Users:(OI)(CI)M]].`
          },
          teach: R`## الفكرة: مين : (وراثة)(صلاحية)

كل تعديل في icacls بيتكتب بنفس الشكل: **مين**، وبعده [[:]]، وبعده أعلام الوراثة بين أقواس، وفي الآخر الصلاحية. زي [[Users:(OI)(CI)M]]. والعرض بيطلع بنفس الشكل بالظبط. شغّلت المثال كله بالترتيب في CMD عادي على ويندوز 11، في فولدر تجربة جوه TEMP واتمسح في الآخر. اسم الجهاز واليوزر في الناتج [[ALI-PC\ali]].

---

## ١. فولدر التجربة

~~~cmd
mkdir shared\sub
~~~

[[mkdir]] بيعمل [[shared]] و [[sub]] جواه مرة واحدة. وعشان نشوف الوراثة على ملف كمان، عملت ملف جوه sub ([[echo x> shared\sub\f.txt]]).

---

## ٢. اعرض الصلاحيات

~~~cmd
icacls shared
~~~

~~~text الناتج
shared NT AUTHORITY\SYSTEM:(OI)(CI)(F)
       BUILTIN\Administrators:(OI)(CI)(F)
       ALI-PC\ali:(OI)(CI)(F)

Successfully processed 1 files; Failed processing 0 files
~~~

نقرا سطر [[ALI-PC\ali:(OI)(CI)(F)]]:

| الحتة | معناها |
|---|---|
| [[ALI-PC\ali]] | مين: اليوزر ali على الجهاز ALI-PC |
| [[(OI)]] | object inherit: الملفات اللي جوه تورثها |
| [[(CI)]] | container inherit: الفولدرات اللي جوه تورثها |
| [[(F)]] | Full: كل حاجة |

يعني SYSTEM والأدمنز وانت بس ليكم صلاحيات، وكلها Full. (على الجهاز ده فولدرات البروفايل صلاحياتها صريحة، عشان كده مفيش [[(I)]] هنا.)

---

## ٣. ادّي Users تعديل

~~~cmd
icacls shared /grant Users:(OI)(CI)M
~~~

- [[/grant]] ادّي صلاحية (وبتتضاف جنب الموجود).
- [[Users]] جروب كل اليوزرز العاديين.
- [[M]] Modify: قراية وكتابة ومسح، بس مش تغيير الصلاحيات.

~~~text الناتج
processed file: shared
Successfully processed 1 files; Failed processing 0 files
~~~

وبعدها [[icacls shared]] أول سطر بقى [[BUILTIN\Users:(OI)(CI)(M)]]. ([[BUILTIN]] معناها جروب جاي مع ويندوز.)

---

## ٤. اللي جوه ورثها

~~~cmd
icacls shared\sub
~~~

~~~text الناتج
shared\sub BUILTIN\Users:(I)(OI)(CI)(M)
           NT AUTHORITY\SYSTEM:(I)(OI)(CI)(F)
           BUILTIN\Administrators:(I)(OI)(CI)(F)
           ALI-PC\ali:(I)(OI)(CI)(F)
~~~

[[(I)]] = inherited: الصلاحية دي جاية من الفولدر اللي فوق، محدش كتبها هنا. والملف اللي جوه ([[icacls shared\sub\f.txt]]) طلع [[BUILTIN\Users:(I)(M)]] من غير OI و CI، لأن الملف مفيش حاجة جواه تورث.

---

## ٥. بدّل بدل ما تضيف: [[/grant:r]]

~~~cmd
icacls shared /grant:r Users:(OI)(CI)RX
~~~

[[:r]] = replace: شيل صلاحية Users القديمة (M) وحط دي مكانها. [[RX]] Read & Execute: قراية وتشغيل بس. بعدها أول سطر:

~~~text الناتج
shared BUILTIN\Users:(OI)(CI)(RX)
~~~

من غير [[:r]] كان هيبقى فيه سطرين لـ Users.

---

## ٦. باك أب للصلاحيات

~~~cmd
icacls shared /save shared-acl.txt /t
~~~

[[/save]] اكتب الصلاحيات في ملف، و [[/t]] للفولدر وكل اللي جواه:

~~~text الناتج
processed file: shared
processed file: shared\sub
processed file: shared\sub\f.txt
Successfully processed 3 files; Failed processing 0 files
~~~

والملف نفسه بصيغة اسمها SDDL، وكل اسم وتحته سطر زي:

~~~text من shared-acl.txt
shared
D:AI(A;OICI;0x1200a9;;;BU)(A;OICI;FA;;;SY)(A;OICI;FA;;;BA)...
~~~

[[A]] Allow، و [[OICI]] الوراثة، و [[0x1200a9]] هو RX بالأرقام، و [[FA]] Full، و [[BU]] Users، و [[SY]] SYSTEM، و [[BA]] Administrators. والملف UTF-16، فـ [[type]] بيطبعه بمسافة بين كل حرف؛ افتحه في notepad.

---

## ٧. شيل Users

~~~cmd
icacls shared /remove Users
~~~

[[/remove]] بيشيل الصلاحيات **الصريحة** لـ Users على الفولدر ده. بعدها [[icacls shared]] رجع من غير سطر Users.

---

## ٨. رجّع كل حاجة للموروث

~~~cmd
icacls shared /reset /t /c /q
~~~

| الحتة | معناها |
|---|---|
| [[/reset]] | امسح الصريح، وخلّي الموروث بس |
| [[/t]] | على الفولدر وكل اللي جواه |
| [[/c]] | كمّل لو ملف فشل |
| [[/q]] | quiet: متطبعش سطر لكل ملف |

~~~text الناتج
Successfully processed 3 files; Failed processing 0 files
~~~

وبعدها shared و sub الاتنين عرضوا التلات سطور بـ [[(I)]] بس.

---

## أخطاء جرّبتها

~~~text icacls shared /grant NoSuchUser:R
NoSuchUser: No mapping between account names and security IDs was done.
Successfully processed 0 files; Failed processing 1 files
~~~

errorlevel [[1332]]: الاسم مش موجود. و [[icacls shared /grant Users: (OI)(CI)M]] (بمسافة بعد النقطتين) طلّع [[Invalid parameter "Users:"]] و errorlevel [[87]]: الصلاحية لازم تبقى لازقة.

---

## الخلاصة

| الحرف | معناه |
|---|---|
| [[F]] / [[M]] / [[RX]] / [[R]] / [[W]] | كل حاجة / تعديل / قراية وتشغيل / قراية / كتابة |
| [[(OI)]] / [[(CI)]] | تورثها الملفات / الفولدرات اللي جوه |
| [[(I)]] | في العرض: موروثة |
| [[/grant]] / [[/grant:r]] | ضيف / بدّل |
| [[/remove]] / [[/reset]] | شيل الصريح / ارجع للموروث |

وكله على فولدراتك بس، مش [[C:\Windows]] ولا [[Program Files]].`,
          lines: [
            "بيعمل فولدر [[shared]] وجواه [[sub]] في أمر واحد ([[mkdir]] بيعمل الفولدرات الناقصة في المسار لوحده). [[sub]] موجود عشان نشوف الصلاحيات بتورث للي جوه ولا لأ.",
            "من غير أي خيارات، [[icacls]] بيعرض الـ ACL: كل يوزر أو جروب وصلاحيته، زي [[BUILTIN\\Administrators:(OI)(CI)(F)]]. [[F]] = Full، [[M]] = Modify، [[RX]] = قراية وتشغيل، و [[(OI)(CI)]] معناها الصلاحية بتورث للملفات والفولدرات اللي جوه. مش بيغيّر حاجة.",
            "[[/grant]] بيضيف صلاحية: [[Users]] (كل اليوزرز العاديين على الجهاز) تاخد [[M]] تعديل (قراية وكتابة ومسح). [[(OI)]] object inherit يعني الملفات اللي جوه ترثها، و [[(CI)]] container inherit يعني الفولدرات اللي جوه ترثها، فالصلاحية تمشي على كل الشجرة.",
            "بيعرض صلاحيات [[sub]]، وهتلاقي [[BUILTIN\\Users:(I)(OI)(CI)(M)]]. الـ [[(I)]] معناها inherited: الصلاحية جاية من [[shared]] اللي فوقه، مش متكتبة على [[sub]] نفسه، فلو اتشالت من فوق هتتشال من هنا كمان.",
            "[[/grant:r]] بيستبدل صلاحية Users الصريحة كلها بـ [[RX]] (قراية وتشغيل بس) بدل ما يضيف عليها. من غير [[:r]]، [[/grant]] كان هيضيف RX جنب الـ M اللي موجودة، فـ Users يفضلوا يقدروا يعدّلوا.",
            "[[/save]] بيحفظ صلاحيات [[shared]] في ملف نصي، و [[/t]] بيضيف كل الملفات والفولدرات اللي جواه. الملف بصيغة SDDL ومتحفظ UTF-16 فشكله غريب لو فتحته بـ [[type]]. بترجّعه بعدين بـ [[icacls . /restore shared-acl.txt]] من الفولدر اللي فوق [[shared]] لو غيّرت حاجة غلط.",
            "[[/remove]] بيشيل كل الصلاحيات الصريحة اللي ليوزر أو جروب معيّن على الفولدر ده. الموروث من فوق مش بيتشال، فلو Users ليهم صلاحية جاية من الفولدر الأب هتفضل.",
            "[[/reset]] بيمسح كل الصلاحيات الصريحة ويرجّع الفولدر يورث من الأب بس، كأنه لسه متعمل. [[/t]] على كل اللي جوه، و [[/c]] يكمّل لو ملف فشل (مثلًا مفتوح أو مفيش صلاحية)، و [[/q]] بيخفي سطر [[processed file]] لكل ملف ويطبع الملخص بس."
          ],
          sol: R`شغّلت الكود اللي تحت بالظبط في TEMP (والفولدر اتمسح بعدها). [[/grant Users:(OI)(CI)RX]] طبع [[processed file: test-acl]] و [[Successfully processed 1 files; Failed processing 0 files]]. و [[icacls test-acl\inside]] طبع:
[[test-acl\inside BUILTIN\Users:(I)(OI)(CI)(RX)]]
[[NT AUTHORITY\SYSTEM:(I)(OI)(CI)(F)]]
[[BUILTIN\Administrators:(I)(OI)(CI)(F)]]
[[ALI-PC\ali:(I)(OI)(CI)(F)]]
يعني الفولدر اللي جوه ورث RX، و Users مكانش موجود أصلًا قبلها: فولدرك الشخصي مقفول على SYSTEM والأدمنز وانت بس. و [[/reset /t /c /q]] طبع [[Successfully processed 2 files; Failed processing 0 files]] بس (الـ [[/q]] خبّت سطور processed file)، وبعدها الاتنين رجعوا التلات سطور الموروثة [[(I)]] من غير Users.

حاجة شفتها على الجهاز ده: أول [[icacls test-acl]] قبل أي تعديل طلّع التلات سطور من غير [[(I)]]، وبعد الـ grant ظهروا مرتين (مرة صريح ومرة [[(I)]]). ده لأن فولدرات البروفايل هنا صلاحياتها صريحة، والـ [[/reset]] رجّعها موروثة بس. و [[/grant *S-1-5-32-545:(OI)(CI)RX]] بالـ SID عمل نفس الحاجة وظهر [[BUILTIN\Users]]، واسم غلط ([[/grant NoSuchUser:R]]) طلّع [[NoSuchUser: No mapping between account names and security IDs was done.]] و errorlevel 1332.`,
          solCode: R`mkdir test-acl\inside
icacls test-acl /grant Users:(OI)(CI)RX
icacls test-acl\inside
icacls test-acl /reset /t /c /q
icacls test-acl
rmdir /s /q test-acl`
        },
        {
          cmd: "takeown",
          title: "خد ملكية فولدر مش راضي يتمسح",
          desc: R`[[takeown]] بيخلّيك صاحب (owner) ملف أو فولدر، وصاحب الحاجة يقدر يغيّر صلاحياتها دايمًا. فلما فولدر يقولك [[Access is denied]] وانت أدمن (جاي من هارد قديم، أو من يوزر اتمسح، أو من ويندوز تاني)، الحل خطوتين: خد الملكية، وبعدين ادّي نفسك صلاحية بـ icacls.

[[/f path]] الملف أو الفولدر (ينفع [[*]]).
[[/r]] على كل اللي جوه (recursive).
[[/d y]] لو فولدر جوه مش مسموحلك تشوف اللي فيه، خد ملكيته برضه من غير ما تسأل. من غيرها بيسألك عند كل واحد، و [[/d n]] عدّيه.
[[/a]] الملكية تروح لجروب Administrators بدل يوزرك.

الخطوة التانية: [[icacls folder /grant %USERNAME%:F /t]] (درس icacls). والاتنين محتاجين CMD كأدمن، لأن ملكية ملف مش بتاعك محتاجة privilege الأدمن [[SeTakeOwnershipPrivilege]]. و [[dir /q]] بيعرض صاحب كل ملف، فتعرف المشكلة قبل ما تبدأ.

ممنوع على [[C:\Windows]] و [[C:\Program Files]] وملفات النظام: صاحبهم [[NT SERVICE\TrustedInstaller]]، ودي الخدمة اللي بتسطّب تحديثات ويندوز. لو أخدت ملكيتهم، التحديثات ممكن تفشل، و sfc يلاقيهم «متغيرين»، وأي برنامج خبيث شغال باسمك يقدر يعدّل فيهم.`,
          example: R`dir /q "D:\OldPC"
takeown /f "D:\OldPC" /r /d y
icacls "D:\OldPC" /grant %USERNAME%:F /t /c /q
rd /s /q "D:\OldPC"
takeown /f "D:\Shared" /r /d y /a`,
          try: R`اعرض صاحب الملفات في فولدر عندك بـ [[dir /q]]، وقارنه بـ [[dir /q C:\Windows\notepad.exe]]. والـ takeown نفسه جرّبه بس على حاجة متأكد إنها بتاعتك ومش من النظام.`,
          flag: "danger",
          practice: [
            { lvl: 'سريع', t: R`**بيانات حقيقية:** [[dir /q]] على فولدر تجربة عندك، و [[dir /q C:\Windows\notepad.exe]]. مين صاحب كل واحد؟ وبص على عمود الصاحب كويس.`, done: R`ملفك صاحبه [[LAB-PC\ali]]، و notepad صاحبه TrustedInstaller بس العمود طبعه [[NT SERVICE\TrustedInsta]] لازق في اسم الملف ([[TrustedInstanotepad.exe]]): [[dir /q]] بيقص الاسم الطويل. فلما تقرا الصاحب من سكربت استخدم [[icacls]] أو PowerShell [[Get-Acl]].` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** في فولدر تجربة انت صاحبه: [[takeown /f own /r /d y]]، و [[takeown /f nosuch.txt]]، والـ errorlevel.`, done: R`الأول سطر [[SUCCESS: The file (or folder): "...\own\a.txt" now owned by user "LAB-PC\ali".]] لكل ملف وفولدر (٤ سطور) و 0، من غير أدمن لأنهم أصلًا بتوعك. والتاني [[ERROR: The system cannot find the file specified.]] و 1.` },
            { lvl: 'تحدي', t: R`**اشرحها:** زميلك عايز يعمل [[takeown /f C:\Program Files\SomeApp /r /d y]] عشان يمسح فولدر برنامج. اكتبله ٣ سطور: إيه اللي ممكن يبوظ، والبديل الأول، وإمتى takeown هو الحل فعلًا.`, done: R`فيهم: فولدرات النظام والبرامج صاحبها TrustedInstaller أو SYSTEM وتغيير الملكية بيبوّظ التحديثات و sfc، والبديل uninstall أو [[winget uninstall]]، و takeown لفولدرات بياناتك اللي جاية من هارد قديم أو يوزر اتمسح. (ومتجرّبش takeown على ملفات النظام.)` },
          ],
          deep: {
            why: R`ركّبت هارد من جهاز قديم، أو نسخت فولدر من ويندوز تاني، والملفات صلاحياتها لسه باسم يوزرز الجهاز القديم (SIDs مش موجودة عندك، فبتظهر في icacls كأرقام [[S-1-5-21-...]]). النتيجة: Access is denied حتى وانت أدمن. takeown و icacls بيصلّحوا ده من غير برامج «unlocker» من النت.`,
            how: R`الصلاحيات (ACL) بتقول مين يعمل إيه، لكن صاحب الحاجة دايمًا يقدر يقرا ويغيّر الـ ACL نفسه حتى لو مش مكتوب فيه. والأدمن عنده privilege «Take ownership» اللي بتخلّيه صاحب أي حاجة من غير ما يكون عنده أي صلاحية عليها. takeown بيستخدم الـ privilege دي، وبعدها icacls (انت دلوقتي الصاحب) يكتب صلاحية جديدة. الملكية لوحدها مش صلاحية قراية، عشان كده الخطوة التانية لازمة.

[[dir /q]] بيضيف عمود الصاحب، بس العمود بيقص الأسامي الطويلة. ولو الرسالة إن الملف مستخدم (in use) مش Access denied، المشكلة برنامج فاتح الملف مش صلاحيات (درس tasklist / taskkill).

takeown بيطبع سطر لكل ملف، و [[/r]] على فولدر كبير بيطبع آلاف السطور، فممكن تحوّلها لملف: [[> takeown.log]]. وفيه حاجات تانية في ويندوز ملكيتها لازم تفضل زي ما هي: [[C:\Program Files\WindowsApps]] (برامج الـ Store) و [[C:\System Volume Information]].`,
            when: R`هارد أو فلاشة من جهاز تاني، فولدر يوزر اتمسح، باك أب اتنقل بصلاحياته، أو فولدر في D مش بيتمسح ولا بيتنقل.`,
            mistakes: R`takeown على [[C:\Windows]] أو [[Program Files]] أو [[C:\]] كله «عشان أخلص»، فتحديثات ويندوز تبوظ. أو تاخد الملكية وتنسى خطوة icacls وتستغرب إنه لسه Access denied. أو تنسى [[/d y]] فيقف يسألك عند كل فولدر. أو تشغّله من CMD عادي. أو تعمل كده على فولدر مشترك لناس تانيين فتشيل صلاحياتهم.`
          },
          teach: R`## الفكرة: شوف المالك، خد الملكية، ادّي نفسك صلاحية، امسح

المثال سلسلة: [[dir /q]] يوريك المشكلة، و [[takeown]] يخلّيك المالك، و [[icacls]] يدّيك صلاحية، وبعدها [[rd]] يقدر يمسح. والسطر الأخير شكل تاني لـ takeown. [[D:\OldPC]] هنا فولدر جاي من جهاز قديم، فمشغّلتش السطور على فولدر زيه؛ جرّبت [[dir /q]] و takeown من CMD عادي على ملف بتاعي وعلى ملف نظام (واترفض)، على ويندوز 11.

---

## ١. مين المالك؟

~~~cmd
dir /q "D:\OldPC"
~~~

[[/q]] بيضيف عمود المالك (owner) قبل اسم الملف. على فولدر تجربة:

~~~text الناتج
10/06/2026  10:30 AM                 5 ALI-PC\ali           a.txt
~~~

وعلى ملف نظام ([[dir /q C:\Windows\notepad.exe]]):

~~~text الناتج
08/28/2026  12:46 AM           360,448 NT SERVICE\TrustedInstanotepad.exe
~~~

العمود ضيق فقص [[NT SERVICE\TrustedInstaller]] ولزقه في اسم الملف. على فولدر من جهاز قديم هتلاقي يوزر مش موجود عندك أو رقم SID طويل.

---

## ٢. خد الملكية

~~~cmd
takeown /f "D:\OldPC" /r /d y
~~~

| الحتة | معناها |
|---|---|
| [[takeown]] | take ownership: خد الملكية |
| [[/f "..."]] | الملف أو الفولدر (file) |
| [[/r]] | وكل اللي جواه (recursive) |
| [[/d y]] | لو فولدر مش مسموحلك تشوف جواه، خد ملكيته برضه من غير ما تسأل |

من CMD أدمن بيطبع لكل حاجة سطر [[SUCCESS: The file (or folder): "..." now owned by user "ALI-PC\ali".]]. جرّبت على ملف بتاعي أصلًا من CMD عادي واشتغل (لأنه بتاعي)، وعلى ملف نظام اترفض:

~~~text takeown /f C:\Windows\notepad.exe  (CMD عادي)
ERROR: The current logged on user does not have ownership privileges on
       the file (or folder) "C:\Windows\notepad.exe".
~~~

والرفض ده كويس: ملفات النظام ملكيتها لازم تفضل لـ TrustedInstaller. على ملف مش بتاعك محتاج CMD أدمن، لأن الأدمن بس عنده [[SeTakeOwnershipPrivilege]] (درس whoami /groups /priv).

---

## ٣. ادّي نفسك صلاحية

~~~cmd
icacls "D:\OldPC" /grant %USERNAME%:F /t /c /q
~~~

الملكية لوحدها مش صلاحية قراية ولا مسح؛ هي بس بتسمحلك تغيّر الصلاحيات. فالخطوة دي لازمة:

- [[%USERNAME%:F]] يوزرك ([[%USERNAME%]] بيتبدّل باسمك) ياخد Full.
- [[/t]] على كل اللي جوه، و [[/c]] كمّل لو حاجة فشلت، و [[/q]] من غير سطر لكل ملف (درس icacls).

---

## ٤. امسح

~~~cmd
rd /s /q "D:\OldPC"
~~~

[[rd]] = rmdir، و [[/s]] بكل اللي جواه، و [[/q]] من غير «Are you sure». دلوقتي بيشتغل لأنك المالك وعندك Full (درس del / rd).

---

## ٥. الملكية لجروب الأدمنز

~~~cmd
takeown /f "D:\Shared" /r /d y /a
~~~

[[/a]] الملكية تروح لجروب Administrators مش ليوزرك، فأي أدمن على الجهاز يقدر يدير الفولدر. الرسالة بتبقى [[now owned by the administrators group.]] (من [[takeown /?]] والتوثيق).

---

## الخلاصة

| الخطوة | الأمر | ليه |
|---|---|---|
| ١ | [[dir /q]] | اعرف المالك |
| ٢ | [[takeown /f ... /r /d y]] | بقيت المالك |
| ٣ | [[icacls ... /grant %USERNAME%:F /t /c /q]] | بقى عندك صلاحية |
| ٤ | [[rd /s /q ...]] | امسح أو انقل |

من CMD **أدمن**، وعلى فولدرات بياناتك بس، مش [[C:\Windows]] ولا [[Program Files]].`,
          lines: [
            "[[dir /q]] بيضيف عمود باسم صاحب كل ملف وفولدر (owner). التنصيص عشان المسار ممكن يبقى فيه مسافات. لو الصاحب ظاهر SID طويل أو يوزر من جهاز قديم مش موجود، يبقى ده سبب [[Access is denied]] لما تحاول تفتح أو تمسح.",
            "[[takeown]] بيخلي يوزرك صاحب الملفات. [[/f]] المسار، و [[/r]] على الفولدر وكل اللي جواه، و [[/d y]] بيرد «Yes» لوحده على سؤال الفولدرات اللي مقدرش يدخلها. محتاج CMD كـ Admin. خلي بالك: الملكية لوحدها مش بتديك صلاحية، بس بتديك الحق إنك تغيّر الصلاحيات.",
            "بعد ما بقيت الصاحب، [[icacls /grant]] بيدّي يوزرك ([[%USERNAME%]] بيتبدّل باسمك) صلاحية [[F]] = Full. [[/t]] على كل اللي جوه، و [[/c]] يكمّل لو ملف فشل بدل ما يقف، و [[/q]] بيخفي سطر لكل ملف ويطبع الملخص بس.",
            "[[rd]] بيمسح الفولدر: [[/s]] باللي جواه كله، و [[/q]] من غير ما يسأل [[Are you sure]]. دلوقتي هيشتغل لأنك الصاحب ومعاك Full. اتأكد من المسار كويس قبل ما تشغّله، لأن المسح من CMD مش بيروح الـ Recycle Bin.",
            "[[/a]] بيخلي الملكية تروح لجروب [[Administrators]] بدل يوزرك، فأي أدمن على الجهاز يقدر يتحكم في الملفات بعدين. ده أحسن للفولدرات المشتركة اللي مش عايزها تبقى مربوطة بحسابك بالذات."
          ],
          sol: R`[[dir /q]] على فولدر تجربة طلّع عمود الصاحب: [[10/02/2026  02:32 PM    3 ALI-PC\ali    a.txt]]. و [[dir /q C:\Windows\notepad.exe]] طلّع [[NT SERVICE\TrustedInstanotepad.exe]]: العمود قص الاسم ولزقه في اسم الملف، والاسم الكامل [[NT SERVICE\TrustedInstaller]]، و [[icacls C:\Windows\notepad.exe]] أكده: [[NT SERVICE\TrustedInstaller:(F)]] و [[BUILTIN\Administrators:(RX)]].

(takeown نفسه مشغّلتهوش لأنه بيغيّر ملكية ملفات ومحتاج أدمن؛ ده من [[takeown /?]] اللي شغّلته ومن التوثيق.) من CMD أدمن بيطبع لكل حاجة [[SUCCESS: The file (or folder): "D:\OldPC\..." now owned by user "ALI-PC\ali".]]، ومع [[/a]] [[now owned by the administrators group.]]. ومن CMD عادي على حاجة مش بتاعتك: [[ERROR: The current logged on user does not have ownership privileges on the file (or folder) "..."]].`
        },
        {
          cmd: "runas",
          title: "شغّل برنامج كيوزر تاني",
          desc: R`[[runas]] بيشغّل برنامج باسم يوزر تاني وبصلاحياته، وانت فاضل داخل بيوزرك. بيسألك على باسورد اليوزر ده في نفس النافذة، ومش بيظهر وانت بتكتبه.

[[/user:PC\sara]] اليوزر: اسم الجهاز وبعده [[\]] واسم اليوزر (أو [[sara@PC]])، ولجهاز شركة اسم الدومين بدل اسم الجهاز. واسم جهازك في [[%COMPUTERNAME%]].
بعده البرنامج، ولو فيه مسافات أو arguments حطه كله بين علامات تنصيص: [[runas /user:PC\sara "notepad C:\notes.txt"]].
[[/netonly]] البرنامج يشتغل باسمك على الجهاز، لكن أي اتصال على الشبكة (SQL Server أو شير أو Active Directory) يروح بيوزر وباسورد تانيين. مفيد من لابتوب مش على دومين الشركة: كل حاجة بتفتحها من النافذة دي بتكلم سيرفرات الشركة بحسابك هناك. والباسورد مع [[/netonly]] مش بيتأكد منه غير لما البرنامج يتصل فعلًا.
[[/savecred]] احفظ الباسورد في Credential Manager ومتسألش تاني. خطير: أي حد قاعد على يوزرك (أو أي برنامج) يقدر يشغّل أي حاجة باسم اليوزر ده من غير باسورد، فلو ده أدمن يبقى إديت يوزرك صلاحيات أدمن دايمة. وتوثيق Microsoft بيقول إنه مش متاح في نسخ Home القديمة.
[[/noprofile]] متحمّلش بروفايل اليوزر: أسرع، بس برامج ممكن تبوظ من غيره.

مهم: [[runas]] مش بيعمل elevation. [[runas /user:PC\admin cmd]] بيوزر أدمن بيفتح نافذة Medium (درس whoami /groups /priv)، لأن UAC بيدّي الأدمن توكن عادي هنا كمان (إلا الأدمن المدمج). عشان تفتح حاجة كأدمن من CMD: [[powershell -Command "Start-Process cmd -Verb RunAs"]]، وده بيطلّع UAC (درس «Start-Process» في تاب «PowerShell»).`,
          example: R`runas /user:%COMPUTERNAME%\sara cmd
runas /user:%COMPUTERNAME%\sara "notepad C:\Users\Public\test.txt"
runas /netonly /user:CORP\ali cmd
powershell -Command "Start-Process cmd -Verb RunAs"`,
          try: R`لو عندك يوزر تاني على الجهاز (أو يوزر تجربة من درس net user): افتح cmd بيه بـ runas واكتب [[whoami]] جواه. وجرّب السطر الأخير، واكتب في النافذة اللي هتفتح [[whoami /groups | findstr /c:"Mandatory Level"]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[runas /user:%COMPUTERNAME%\labnosuch cmd < nul]] (اليوزر مش موجود، والـ keyboard متوجّه من [[nul]]). هيطبع إيه قبل ما يقف؟ والـ errorlevel؟`, done: R`طبع [[Enter the password for LAB-PC\labnosuch:]] وخرج بـ errorlevel 1 من غير ما يجرّب يدخل: runas بيسأل الباسورد الأول قبل ما يعرف اليوزر موجود ولا لأ، فمينفعش في سكربت غير بـ [[/savecred]] (اللي خطير، اقرا الدرس).` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** من غير ما تشغّل حاجة كأدمن: اكتب جدول لـ ٣ طرق تفتح بيها برنامج «بحساب تاني أو صلاحيات تانية»: [[runas]] بيوزر تاني، و [[runas /netonly]]، و [[powershell -c "Start-Process cmd -Verb RunAs"]]. لكل واحدة: مين اللي بيبان في [[whoami]] جوه، والـ integrity level.`, done: R`[[runas /user]] اليوزر التاني و Medium، و [[/netonly]] انت نفسك في [[whoami]] والشبكة بس بالحساب التاني، و [[-Verb RunAs]] انت نفسك بس [[High Mandatory Level]]. (الجدول من الدرس ووثائق Microsoft، لأن الطرق دي بتسأل باسورد أو UAC.)` },
            { lvl: 'تحدي', t: R`**محاكاة:** في Windows Sandbox: اعمل يوزر تجربة بباسورد، وافتح [[runas /user:%COMPUTERNAME%\sara cmd]]، واكتب [[whoami]] و [[echo %USERPROFILE%]] جوه، وبعدين جرّب باسورد غلط.`, done: R`جوه النافذة [[whoami]] طبع اسم الجهاز و [[sara]] و [[%USERPROFILE%]] بقى [[C:\Users\sara]]، والباسورد الغلط طبع [[1326: The user name or password is incorrect.]] (من الدرس ووثائق Microsoft، ومتجرّبش على جهاز التجربة).` },
          ],
          deep: {
            why: R`تجرّب برنامجك وهو شغال بيوزر عادي من غير ما تعمل sign out، أو تفتح أداة إدارة بحساب أدمن منفصل وانت داخل بيوزر عادي (النصيحة اللي في درس net localgroup)، أو تتصل بقاعدة SQL Server أو شير في الشركة بحساب الدومين من لابتوب شخصي.`,
            how: R`runas بيطلب من خدمة اسمها Secondary Logon ([[seclogon]]) تعمل logon جديد باليوزر والباسورد، وتشغّل البرنامج بالتوكن ده على نفس الشاشة. لو الخدمة دي متوقفة أو disabled هيفشل (درس sc و net start).

[[/netonly]] بيعمل logon من نوع «NewCredentials»: التوكن المحلي هو توكنك بالظبط ([[whoami]] جوه النافذة بيطبع اسمك انت)، والبيانات التانية بتتبعت بس لما البرنامج يطلب حاجة من جهاز تاني. عشان كده الباسورد الغلط مش بيبان غير وقت الاتصال.

runas بيقرا الباسورد من الكيبورد بس، ومفيش طريقة تكتبه في الأمر، وده مقصود. لو محتاج تشغيل تلقائي بيوزر تاني، المكان الصح مهمة مجدولة بـ [[/ru]] و [[/rp]] (درس schtasks) أو خدمة، مش [[/savecred]]. واليوزر لازم يكون عنده باسورد، ولو حساب Microsoft فالباسورد بتاع الحساب مش الـ PIN.`,
            when: R`اختبار برنامج بيوزر عادي، أدوات إدارة بحساب أدمن منفصل، أو أدوات الشركة (SQL Server Management Studio أو أدوات Active Directory أو شيرات) من جهاز مش على الدومين بـ [[/netonly]].`,
            mistakes: R`تفتكر runas بيعمل Run as administrator فتستغرب إن النافذة لسه Access denied. أو [[/savecred]] مع حساب أدمن. أو تنسى علامات التنصيص حوالين البرنامج و arguments بتاعته. أو اسم اليوزر من غير اسم الجهاز فيدوّر عليه في مكان غلط. أو تحاول تحط الباسورد في سكربت.`
          },
          teach: R`## الفكرة: [[runas /user:مين البرنامج]]

[[runas]] بياخد حاجتين: اليوزر بعد [[/user:]]، والبرنامج. وبيسألك على باسورد اليوزر ده في نفس النافذة. أول سطرين تشغيل بيوزر تاني، والتالت حالة خاصة للشبكة، والرابع **مش** runas خالص: ده الطريقة الصح تفتح CMD كأدمن.

> runas مشغّلتهوش لأنه بيسأل على باسورد يوزر تاني من الكيبورد، والجهاز مفيهوش يوزر تاني. الناتج تحت من توثيق Microsoft. اللي جرّبته: [[%COMPUTERNAME%]] وحالة الخدمة اللي runas بيعتمد عليها.

---

## ١. cmd باسم sara

~~~cmd
runas /user:%COMPUTERNAME%\sara cmd
~~~

| الحتة | معناها |
|---|---|
| [[runas]] | run as: شغّل باسم |
| [[/user:]] | اليوزر، لازقة في اللي بعدها |
| [[%COMPUTERNAME%]] | متغير فيه اسم جهازك؛ عندي [[echo %COMPUTERNAME%]] طبع اسم الجهاز بالكابيتال |
| [[\sara]] | اليوزر sara على الجهاز ده |
| [[cmd]] | البرنامج اللي هيتشغّل |

ليه اسم الجهاز قبل اليوزر؟ عشان runas يعرف يدوّر على sara فين: على الجهاز ده، مش على دومين. والناتج (من التوثيق):

~~~text الناتج
Enter the password for ALI-PC\sara:
Attempting to start cmd as user "ALI-PC\sara" ...
~~~

والباسورد مش بيظهر وانت بتكتبه. ونافذة جديدة بتفتح عنوانها فيه [[(running as ALI-PC\sara)]]، و [[whoami]] جواها بيطبع [[ali-pc\sara]].

لو الباسورد غلط: [[1326: The user name or password is incorrect.]]. ولو sara من غير باسورد: [[1327: Account restrictions are preventing this user from signing in...]]، لأن ويندوز مش بيسمح بالدخول بباسورد فاضي من هنا.

---

## ٢. برنامج ومعاه argument

~~~cmd
runas /user:%COMPUTERNAME%\sara "notepad C:\Users\Public\test.txt"
~~~

البرنامج ([[notepad]]) والملف اللي يفتحه بين علامات تنصيص **مع بعض**. من غيرها runas هياخد [[notepad]] بس ويعتبر المسار حاجة تانية. واخترت [[C:\Users\Public]] لأنه فولدر كل اليوزرز يقدروا يكتبوا فيه، فـ sara هتقدر تحفظ.

---

## ٣. [[/netonly]]

~~~cmd
runas /netonly /user:CORP\ali cmd
~~~

- [[CORP]] اسم دومين الشركة بدل اسم الجهاز، و [[ali]] حسابك هناك.
- [[/netonly]]: النافذة شغالة **باسمك انت** على جهازك، بس أي اتصال بجهاز تاني على الشبكة (SQL Server أو شير) بيروح بحساب CORP\ali.

عشان كده [[whoami]] جوه النافذة دي بيطبع اسمك انت مش ali بتاع الشركة، وده الطبيعي. والباسورد الغلط مش بيبان غير لما البرنامج يتصل فعلًا.

---

## ٤. افتح CMD كأدمن بجد

~~~cmd
powershell -Command "Start-Process cmd -Verb RunAs"
~~~

- [[powershell -Command "..."]] نفّذ أمر PowerShell من CMD (درس wmic).
- [[Start-Process cmd]] شغّل cmd.
- [[-Verb RunAs]] بالفعل «Run as administrator»، زي كليك يمين. ده اللي بيطلّع UAC.

ليه مش runas؟ لأن runas بيوزر أدمن بيفتح نافذة **Medium** (درس whoami /groups /priv): UAC بيدّي الأدمن توكن عادي هنا كمان. فـ runas = «يوزر تاني»، و [[-Verb RunAs]] = «صلاحيات أدمن».

---

## الخدمة اللي ورا runas

runas بيطلب من خدمة اسمها [[seclogon]] (Secondary Logon) تعمل الدخول التاني. عندي [[sc qc seclogon]] طلّع [[START_TYPE : 3 DEMAND_START]] و [[sc query seclogon]] طلّع [[STOPPED]]: ده طبيعي، بتقوم لوحدها أول ما runas يطلبها. لو حد عملها disabled، runas هيفشل.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| برنامج بيوزر تاني | [[runas /user:%COMPUTERNAME%\الاسم البرنامج]] |
| برنامج + arguments | [[runas /user:... "البرنامج والملف"]] |
| حساب الشركة للشبكة بس | [[runas /netonly /user:الدومين\الاسم cmd]] |
| CMD كأدمن | [[powershell -Command "Start-Process cmd -Verb RunAs"]] |

runas يعني يوزر تاني، مش أدمن.`,
          lines: [
            R`cmd جديد باسم sara (هيسألك على باسوردها).`,
            R`برنامج ومعاه argument: كله بين علامات تنصيص.`,
            R`cmd باسمك، بس أي اتصال شبكة بيروح بحساب الشركة.`,
            R`ده اللي بيفتح CMD كأدمن فعلًا (بيطلّع UAC).`
          ],
          sol: R`(runas مشغّلتهوش هنا لأنه بيسأل على باسورد يوزر تاني من الكيبورد؛ ده من توثيق Microsoft، ونصوص الأخطاء من [[net helpmsg 1326]] و [[net helpmsg 1327]].) [[runas /user:PC\sara cmd]] بيطبع [[Enter the password for PC\sara:]]، وبعد الباسورد [[Attempting to start cmd as user "PC\sara" ...]] ونافذة جديدة عنوانها فيه [[(running as PC\sara)]]. جواها [[whoami]] بيطبع [[pc\sara]]، ولو sara أدمن [[whoami /groups]] بيوريك [[Medium Mandatory Level]] برضه.

باسورد غلط: [[RUNAS ERROR: Unable to run - cmd]] و [[1326: The user name or password is incorrect.]]. يوزر من غير باسورد: [[1327: Account restrictions are preventing this user from signing in. For example: blank passwords aren't allowed, sign-in times are limited, or a policy restriction has been enforced.]] (ودي نفس الرسالة لو برا الأوقات اللي حددتها بـ [[/times]] في درس net user). ومع [[/netonly]]، [[whoami]] جوه النافذة بيطبع اسمك انت، وده الطبيعي. والسطر الأخير بيطلّع UAC، وفي النافذة الجديدة [[High Mandatory Level]].`
        },
        {
          cmd: "Run as Administrator",
          title: "افتح CMD كأدمن، وخلّي سكربتك يطلبها لوحده",
          learn: R`تفتح نافذة CMD كأدمن بأكتر من طريقة (Win+X، و Ctrl+Shift+Enter، وسطر من النافذة اللي انت فيها)، وتعرف الأوامر اللي بتقول «محتاج أدمن» بأي رسالة، وتكتب [[.bat]] بيطلب الصلاحية لوحده ويكمّل بنفس الـ arguments.`,
          out: R`أي أمر يقولك Access is denied أو requires elevation هتعرف ده سببه ولا لأ، وتفتح النافذة الصح في ثانيتين من غير ما تقفل اللي انت فيه.`,
          use: {
            work: R`نص أوامر الوحدة اللي فاتت ([[sfc]] و [[chkdsk]] و [[sc config]] و [[netsh]] و [[powercfg /requests]]) محتاجة نافذة أدمن، وكل واحد بيقولها بكلام مختلف.`,
            prog: R`سكربت تجهيز بيئة أو صيانة بتديه لزميل: بدل «اعمل كليك يمين و Run as administrator» السكربت بيطلبها هو ويكمّل.`,
            cs: R`الصلاحية جزء من البروسيس من لحظة ما بيتولد (access token)، ومفيش طريقة ترفع نافذة شغالة. «Run as administrator» معناها بروسيس جديد بالتوكن الكامل بعد موافقة UAC.`,
          },
          desc: R`حسابك ممكن يكون في Administrators، بس كل نافذة بتفتحها بتشتغل **عادية** (Medium) لحد ما توافق على UAC. «Run as Administrator» بيفتح نافذة **جديدة** بصلاحيات الأدمن (High)، والنافذة القديمة بتفضل زي ما هي.

**من الكيبورد والماوس:** Win+X وبعدين Terminal (Admin)، أو اكتب [[cmd]] في Start واضغط **Ctrl+Shift+Enter** بدل Enter، أو كليك يمين ← Run as administrator. والنافذة الأدمن عنوانها بيبدأ بـ [[Administrator:]].

**من النافذة اللي انت فيها:** [[powershell -NoProfile -Command "Start-Process cmd -Verb RunAs"]]. CMD معندوش أمر بيعملها، فبيطلبها من PowerShell. و [[sudo]] المدمج في ويندوز 11 (24H2 وأحدث) مقفول من الأول: على جهاز التجربة [[sudo -h]] طبع [[Sudo is disabled on this machine. To enable it, go to the Developer Settings page in the Settings app]].

**الأوامر بتقولها بكلام مختلف:** [[System error 5 has occurred.]] (net)، و [[This command requires administrator privileges and must be executed from an elevated command prompt.]] (powercfg)، و [[Error: 740]] (DISM)، و [[You must be an administrator running a console session...]] (sfc). و 740 نفسه معناه [[The requested operation requires elevation.]].

**سكربت بيطلبها لوحده:** أوله فحص ([[net session]]، الدرس الجاي)، ولو مش أدمن ينادي [[Start-Process]] على نفسه ([[%~f0]]) بـ [[-Verb RunAs]] ويخرج، والنسخة الجديدة هي اللي تكمّل الشغل.`,
          example: R`whoami /groups | findstr /c:"Mandatory Level"
net session >nul 2>&1 && echo ADMIN || echo NOT ADMIN
powershell -NoProfile -Command "([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)"
net helpmsg 740
powershell -NoProfile -Command "Start-Process cmd -Verb RunAs"`,
          try: R`من نافذة عادية شغّل أول ٤ سطور وسجّل ناتجهم. وبعدين افتح نافذة أدمن بـ Ctrl+Shift+Enter (أو السطر الأخير ووافق على UAC) وشغّل نفس الـ ٣ الأولانيين وقارن.`,
          deep: {
            why: R`أغلب أوامر الصيانة والشبكة والخدمات محتاجة نافذة أدمن، والفرق بين «انت أدمن» و «النافذة أدمن» بيضيّع وقت ناس كتير: الأمر يرفض، فيفتكروا الحساب مش أدمن أو الأمر بايظ. لما تعرف تشوف مستوى النافذة وتفتح نافذة أدمن من سطر، وتخلي السكربت يطلبها لوحده، بتقفل الباب ده خالص.`,
            how: R`لما بتدخل بحساب أدمن، ويندوز (UAC) بيعملك توكنين: عادي فيه [[BUILTIN\Administrators]] متعلّم [[Group used for deny only]] ومستواه Medium، وكامل مستواه High. كل البرامج بتاخد العادي. [[-Verb RunAs]] بتطلب من ويندوز (ShellExecute) يشغّل البرنامج بالتوكن الكامل، فبيظهر سؤال UAC على secure desktop، ولو وافقت البروسيس الجديد بياخد High.

[[CreateProcess]] العادي (اللي .NET بيستخدمه لما [[UseShellExecute=false]]) مبيعرضش UAC: على برنامج محتاج أدمن زي [[diskpart.exe]] بيرجّع خطأ 740 [[The requested operation requires elevation.]]. وده اتجرّب هنا من غير ما يظهر أي سؤال.`,
            when: R`نافذة أدمن لما تشتغل شوية في صيانة. السطر من CMD لما تكون في نص شغلك ومش عايز تقفل. السكربت اللي بيطلبها لوحده لسكربتات بتدّيها لحد. والأحسن من الكل: متشغّلش حاجة كأدمن غير اللي محتاجاه، وخلّي نافذة الأدمن تتقفل أول ما تخلص.`,
            mistakes: R`تفتكر إن حسابك أدمن يبقى النافذة أدمن. أو تفتح نافذة أدمن وتلاقيها في [[C:\Windows\System32]] مش في فولدر مشروعك، فأوامر بملفات نسبية تفشل (أول سطر في السكربت [[cd /d "%~dp0"]]). أو تكتب [[-ArgumentList '%*']] والسكربت اتشغّل من غير arguments فـ PowerShell 5.1 يرفض بـ [[Cannot validate argument on parameter 'ArgumentList'. The argument is null or empty.]]. أو تسيب نافذة الأدمن مفتوحة طول اليوم وتشتغل فيها عادي.`
          },
          teach: R`## الفكرة: نافذة جديدة، مش النافذة دي

النافذة اللي انت فيها اتحدّدت صلاحيتها وهي بتفتح. «Run as Administrator» معناها بروسيس جديد بصلاحيات أدمن، وويندوز بيسألك UAC قبله. كل اللي تحت اتشغّل في CMD على ويندوز 11 من نافذة **عادية** وحساب أدمن، ما عدا ظهور سؤال UAC نفسه (بيوقّف الجلسة)، ودي مكتوب عليها إنها من وثائق Microsoft.

---

## ١. انت فين دلوقتي؟

~~~cmd
whoami /groups | findstr /c:"Mandatory Level"
~~~

~~~text اتشغّل فعلًا · ويندوز 11 · cmd.exe · نافذة عادية
Mandatory Label\Medium Mandatory Level    Label    S-1-16-8192
~~~

[[Medium]] = عادية، و [[High]] ([[S-1-16-12288]]) = أدمن (درس whoami /groups /priv). وفي نفس النافذة:

~~~cmd
net session >nul 2>&1 && echo ADMIN || echo NOT ADMIN
~~~

طبع [[NOT ADMIN]]. [[net session]] بيعرض الاتصالات اللي على الشير بتاعك، ومحتاج أدمن، فنجاحه أو فشله هو الفحص (الدرس الجاي بالتفصيل).

~~~cmd
powershell -NoProfile -Command "([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)"
~~~

- [[WindowsIdentity]]::GetCurrent() التوكن بتاع البروسيس ده.
- [[IsInRole(...Administrator)]] هل جروب الأدمنز **متفعّل** فيه.

طبع [[False]] مع إن الحساب أدمن، لأن الجروب [[deny only]] في النافذة العادية.

---

## ٢. الأوامر بتقول «محتاج أدمن» إزاي

| الأمر من نافذة عادية | الرسالة (اتشغّل فعلًا) | errorlevel |
|---|---|---|
| [[net session]] | [[System error 5 has occurred.]] و [[Access is denied.]] | 2 |
| [[powercfg /requests]] | [[This command requires administrator privileges and must be executed from an elevated command prompt.]] | 1 |
| [[DISM /Online /Cleanup-Image /CheckHealth]] | [[Error: 740]] و [[Elevated permissions are required to run DISM.]] | 740 |
| [[sfc /verifyonly]] | [[You must be an administrator running a console session in order to use the sfc utility.]] | 1 |
| [[chkdsk C:]] | [[Access Denied as you do not have sufficient privileges or]] ... | 3 |
| [[openfiles]] | [[ERROR: Logged-on user does not have administrative privilege.]] | |
| [[fltmc]] | [[Filter listing failed with error: 0x80070005]] و [[Access is denied.]] | 1 |

الأرقام اللي بتتكرر: **5** = Access is denied ([[net helpmsg 5]])، و **740** = [[The requested operation requires elevation.]] ([[net helpmsg 740]])، و [[0x80070005]] هو نفس الـ 5 في شكل HRESULT. أي رسالة فيها واحد منهم، جرّب نافذة أدمن قبل أي حاجة تانية.

وحاجة شفتها: لما .NET شغّل [[diskpart.exe]] من غير ShellExecute، مفيش سؤال UAC ظهر خالص، ورجع [[The requested operation requires elevation.]] و 740. يعني UAC بيظهر بس لما حد يطلبه (Explorer، أو [[start]]، أو [[-Verb RunAs]]).

---

## ٣. افتح نافذة أدمن

### من الكيبورد (من الوثائق)

| الطريقة | إزاي |
|---|---|
| Win+X | Terminal (Admin) أو Command Prompt (Admin) حسب الإعداد |
| Start | اكتب [[cmd]] واضغط Ctrl+Shift+Enter بدل Enter |
| Run | Win+R واكتب [[cmd]] واضغط Ctrl+Shift+Enter |
| Task Manager | File ← Run new task ← علّم Create this task with administrative privileges |

### من النافذة اللي انت فيها

~~~cmd
powershell -NoProfile -Command "Start-Process cmd -Verb RunAs"
~~~

- [[Start-Process cmd]] شغّل cmd، و [[-Verb RunAs]] «بأمر Run as administrator».
- بيظهر UAC، ولو وافقت تفتح نافذة جديدة عنوانها [[Administrator: ...]] وفيها [[High Mandatory Level]]. ولو دوست No، PowerShell بيطبع خطأ إن العملية اتلغت ([[The operation was canceled by the user.]]) ويرجّع 1. (UAC متجرّبش هنا؛ ده من وثائق Microsoft.)
- النافذة الجديدة بتفتح غالبًا في [[C:\Windows\System32]]، مش في الفولدر اللي انت فيه.

ولو عايز النافذة الأدمن تفتح في نفس الفولدر:

~~~cmd
powershell -NoProfile -Command "Start-Process cmd -ArgumentList '/k cd /d \"%CD%\"' -Verb RunAs"
~~~

[[/k]] شغّل الأمر وسيب النافذة مفتوحة (عكس [[/c]])، و [[%CD%]] بيتفك في CMD قبل ما PowerShell يشوفه، و [[\"]] بيوصّل علامة التنصيص لـ cmd الجديد. جرّبت نفس السطر من ملف [[.bat]] في فولدر اسمه فيه مسافة، بـ [[/c]] ومن غير [[-Verb RunAs]] (عشان ميطلعش UAC): النافذة الجديدة كتبت [[cd]] بتاعها في ملف، وكان المسار الصح بالمسافة.

---

## ٤. سكربت بيطلبها لوحده

~~~cmd
@echo off
setlocal
net session >nul 2>&1
if %errorlevel% neq 0 goto :elevate
echo running as admin with args: %*
ipconfig /flushdns
pause
exit /b 0

:elevate
echo not admin, asking for elevation...
set "PSARGS="
if not "%~1"=="" set "PSARGS=-ArgumentList '%*'"
powershell -NoProfile -Command "Start-Process -FilePath '%~f0' %PSARGS% -Verb RunAs"
if errorlevel 1 (echo elevation was cancelled or failed & exit /b 1)
exit /b 0
~~~

السطر بسطر:
- [[net session >nul 2>&1]] الفحص، وناتجه مستخبي.
- [[if %errorlevel% neq 0 goto :elevate]] مش أدمن؟ روح لجزء الطلب. ([[neq]] = not equal.)
- الجزء الأول هو الشغل الحقيقي، ومش هيتنفذ غير في النسخة الأدمن. و [[pause]] عشان النافذة الجديدة متقفلش قبل ما تقرا.
- [[%~f0]] المسار الكامل للسكربت نفسه (درس %~dp0 و %~nx1)، بين [[' ']] عشان PowerShell يقبل المسافات.
- [[%*]] كل الـ arguments اللي اتبعتت، و [[PSARGS]] بيتعمل **بس لو فيه arguments**.
- [[if errorlevel 1]] PowerShell بيرجّع 1 لو Start-Process فشل (رفضت UAC مثلًا).

### ليه [[PSARGS]]؟ الفخ اللي في أشهر نسخة على النت

النسخة المشهورة بتكتب [[-ArgumentList '%*']] على طول. لو السكربت اتشغّل من غير arguments، السطر بيبقى [[-ArgumentList '']]، و Windows PowerShell 5.1 (اللي [[powershell]] بيشغّله) بيرفض:

~~~text اتشغّل فعلًا · powershell 5.1 · من غير -Verb RunAs عشان ميطلعش UAC
Start-Process : Cannot validate argument on parameter 'ArgumentList'. The argument is null or empty. Provide an
argument that is not null or empty, and then try the command again.
~~~

يعني السكربت مكانش هيطلب الأدمن أصلًا. (PowerShell 7 بيقبل [['']]، فالباج بيبان على أجهزة ومبيبانش على تانية.)

### جرّبته من غير UAC

بمتغير [[DRYRUN]] بيحط [[echo]] قدام سطر [[powershell]]، من فولدر اسمه فيه مسافة ([[lab tools]]):

~~~text اتشغّل فعلًا · نافذة عادية
not admin, asking for elevation...
powershell -NoProfile -Command "Start-Process -FilePath 'C:\Users\ali\AppData\Local\Temp\claude\cmdstd-C\lab tools\fix-dns.bat' -ArgumentList '--verbose' -Verb RunAs"
~~~

ومن غير arguments السطر طلع من غير [[-ArgumentList]] خالص. (لاحظ: في وضع التجربة [[if errorlevel 1]] بيطبع «cancelled» لأن [[echo]] مبيصفّرش errorlevel اللي جاي من [[net session]]، وده مش بيحصل في التشغيل الحقيقي.)

---

## ٥. الأمان

- نافذة الأدمن مفيش حاجة بتوقفها: [[del]] غلط أو سكربت من النت بيعدّي على ملفات النظام. افتحها للمهمة واقفلها.
- السكربت اللي بيرفع نفسه لازم يكون في مكان محدش غيرك بيكتب فيه، وإلا أي حد يعدّله ياخد أدمن أول ما تشغّله.
- [[runas]] مش بديل: بيشغّل بيوزر تاني، والنافذة بتفضل Medium (درس runas).

---

## الخلاصة

| عايز | اكتب |
|---|---|
| النافذة دي إيه | [[whoami /groups | findstr /c:"Mandatory Level"]] |
| أدمن ولا لأ في سكربت | [[net session >nul 2>&1]] و [[if errorlevel 1]] |
| نافذة أدمن من الكيبورد | Ctrl+Shift+Enter على [[cmd]] في Start |
| نافذة أدمن من CMD | [[powershell -NoProfile -Command "Start-Process cmd -Verb RunAs"]] |
| سكربت يرفع نفسه | [[Start-Process -FilePath '%~f0' -Verb RunAs]] و [[-ArgumentList]] بس لو فيه arguments |
| معنى 5 و 740 | [[net helpmsg 5]] و [[net helpmsg 740]] |

وفي PowerShell: درس «Start-Process -Verb RunAs» في تاب «PowerShell».`,
          lines: [
            R`بيطبع مستوى النافذة: [[Medium Mandatory Level]] (S-1-16-8192) يعني عادية حتى لو حسابك أدمن، و [[High]] يعني أدمن. ده أسرع رد على «النافذة دي أدمن؟».`,
            R`[[net session]] محتاج أدمن، فبنستخدمه كفحص: ناتجه وخطؤه مستخبيين بـ [[>nul 2>&1]]، و [[&&]] بيشتغل لو نجح و [[||]] لو فشل. من نافذة عادية طبع [[NOT ADMIN]].`,
            R`نفس الفحص من .NET: [[IsInRole(...Administrator)]] بيسأل هل جروب الأدمنز متفعّل في توكن البروسيس. طبع [[False]] في النافذة العادية مع إن الحساب أدمن.`,
            R`بيترجم الكود 740 اللي بتشوفه من DISM وأي برنامج محتاج أدمن: [[The requested operation requires elevation.]]. وبنفس الطريقة [[net helpmsg 5]] بيطبع [[Access is denied.]].`,
            R`بيطلب من PowerShell يفتح cmd جديد بـ [[-Verb RunAs]]: ويندوز بيسأل UAC، ولو وافقت تفتح نافذة [[Administrator:]] جديدة، والنافذة اللي انت فيها بتفضل عادية. (الجزء ده من وثائق Microsoft لأن UAC بيوقّف التجربة.)`,
          ],
          sol: R`من نافذة عادية بحساب أدمن على ويندوز 11: السطر الأول [[Mandatory Label\Medium Mandatory Level ... S-1-16-8192]]، والتاني [[NOT ADMIN]]، والتالت [[False]]، والرابع [[The requested operation requires elevation.]]. وفي نافذة أدمن (من الوثائق ومن درس whoami /groups /priv): [[High Mandatory Level]] و [[ADMIN]] و [[True]].

والسكربت اللي بيرفع نفسه اتجرّب بوضع [[DRYRUN]] من فولدر فيه مسافة: طبع سطر [[Start-Process -FilePath '...\lab tools\fix-dns.bat' -ArgumentList '--verbose' -Verb RunAs]] صح، ومن غير arguments من غير [[-ArgumentList]]، والنسخة المشهورة بـ [[-ArgumentList '']] اترفضت في PowerShell 5.1 بـ [[Cannot validate argument on parameter 'ArgumentList'.]]. سؤال UAC نفسه ورسالة الإلغاء من وثائق Microsoft.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** من نافذة عادية: [[net helpmsg 5]] و [[net helpmsg 740]]. وبعدين اكتب لكل رقم أمرين من الوحدة اللي فاتت بيرجّعوه.`, done: R`[[Access is denied.]] و [[The requested operation requires elevation.]]. الـ 5: [[net session]] ([[System error 5 has occurred.]]) و [[fltmc]] ([[0x80070005]]). والـ 740: [[DISM /Online ...]] ([[Error: 740]]) وتشغيل [[diskpart.exe]] من غير ShellExecute.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** شغّل أول ٣ سطور في المثال في نافذة عادية وفي نافذة أدمن (Ctrl+Shift+Enter)، وحط النتايج في جدول.`, done: R`العادية: [[Medium]] و [[NOT ADMIN]] و [[False]]، والأدمن: [[High]] و [[ADMIN]] و [[True]]. والنافذة الأدمن عنوانها بيبدأ بـ [[Administrator:]] وبتبدأ في [[C:\Windows\System32]] (ناتج النافذة الأدمن من درس whoami /groups /priv ووثائق Microsoft).` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** سكربت فيه [[powershell -NoProfile -Command "Start-Process -FilePath '%~f0' -ArgumentList '%*' -Verb RunAs"]] بيشتغل لما تبعتله argument، ولما تدوس عليه مرتين مبيطلبش أدمن ومبيعملش حاجة. جرّب السطر في PowerShell 5.1 من غير [[-Verb RunAs]] و [[-ArgumentList '']] على ملف وهمي عشان تشوف السبب من غير UAC.`, done: R`طلع [[Cannot validate argument on parameter 'ArgumentList'. The argument is null or empty.]]: الدوس مرتين = من غير arguments. الإصلاح [[set "PSARGS="]] و [[if not "%~1"=="" set "PSARGS=-ArgumentList '%*'"]] وتحط [[%PSARGS%]] مكانها، والسطر من غير arguments بيطلع من غير [[-ArgumentList]].` },
            { lvl: 'تطبيق', t: R`**ابني:** خلّي السكربت اللي بيرفع نفسه «قابل للتجربة»: متغير [[DRYRUN]] بيخلي سطر الـ powershell يتطبع بدل ما يتنفذ. جرّبه من فولدر اسمه فيه مسافة، بـ argument ومن غيره.`, done: R`مع [[--verbose]] طبع [[-ArgumentList '--verbose']] والمسار الكامل بالمسافة جوه [[' ']]، ومن غير arguments السطر مفيهوش [[-ArgumentList]]. ومفيش UAC ظهر في الحالتين.` },
            { lvl: 'تحدي', t: R`**مسألة:** النسخة الأدمن من السكربت بتفتح في [[C:\Windows\System32]]، وجواه [[type config.txt]] (ملف جنب السكربت). إيه اللي هيحصل؟ وصلّحه بسطر واحد يشتغل في الحالتين.`, done: R`[[type config.txt]] هيدوّر في System32 ويطبع [[The system cannot find the file specified.]]. الإصلاح [[cd /d "%~dp0"]] بعد [[setlocal]]: [[%~dp0]] فولدر السكربت (درس %~dp0 و %~nx1)، و [[/d]] لو على درايف تاني. جرّبته بـ [[call "lab tools\usecfg.bat"]] من الفولدر اللي فوقه: طبع محتوى [[config.txt]] ([[cfg-ok]]).` },
          ],
          ci: [
            { os: [R`windows`], sh: R`cmd`, run: R`@echo off
whoami /groups | findstr /c:"Mandatory Level" >nul && echo label-ok
net helpmsg 740 | findstr /c:"requires elevation" >nul && echo helpmsg-ok
net session >nul 2>&1 && echo mode=admin || echo mode=user
exit /b 0`, expect: [R`label-ok`, R`helpmsg-ok`, R`mode=`] },
          ],
        },
        {
          cmd: "net session",
          title: "السكربت يعرف لوحده: انا أدمن ولا لأ",
          learn: R`تكتب أول سطرين في أي [[.bat]] محتاج أدمن: فحص بـ [[net session]] ورسالة واضحة، وتعرف فخ [[%errorlevel%]] على نفس السطر، والبدايل ([[fltmc]] و [[whoami /groups]]) وإمتى كل واحد يفشل.`,
          out: R`سكربتاتك مش هتقع في النص بعشرين رسالة «Access is denied»، هتقف من أول سطر وتقول السبب.`,
          use: {
            work: R`سكربت صيانة اشتغل نصه من نافذة عادية ووقف في النص: الملفات اتنقلت والإعداد متغيّرش. فحص الأدمن في الأول بيمنع النص ده.`,
            prog: R`نفس فكرة [[if [ "$(id -u)" -ne 0 ]]] في bash: السكربت بيتأكد من صلاحيته قبل ما يلمس حاجة.`,
          },
          desc: R`[[net session]] بيعرض مين متصل بالفولدرات المشتركة على جهازك، والأمر ده **محتاج أدمن**. فاستخدامه الحقيقي في السكربتات: «جرّبه، ولو فشل يبقى مش أدمن».

من نافذة عادية بيطبع [[System error 5 has occurred.]] و [[Access is denied.]] ويرجّع errorlevel 2. ومن نافذة أدمن بيرجّع 0 (وبيطبع [[There are no entries in the list.]] لو مفيش حد متصل، من الوثائق).

أول السكربت:
[[net session >nul 2>&1]] جرّب، واخفي الناتج والخطأ.
[[if errorlevel 1 (echo Run this as administrator & exit /b 1)]] فشل؟ قول واخرج بكود 1.

**الفخ:** [[net session >nul 2>&1 & echo %errorlevel%]] على سطر واحد بيطبع الكود **القديم**، لأن CMD بيفك [[%errorlevel%]] لما يقرا السطر كله قبل ما يشغّل أي حاجة فيه. استخدم [[if errorlevel]] أو [[&&]] و [[||]] أو سطر لوحده.

**البدايل:** [[net session]] بيعتمد على خدمة Server ([[LanmanServer]])، ولو حد قافلها الفحص بيفشل حتى من أدمن (من الوثائق). البديل [[fltmc >nul 2>&1]] (أدمن بس)، أو [[whoami /groups | findstr /c:"S-1-16-12288"]] (High integrity) اللي مش محتاج أي خدمة.`,
          example: R`@echo off
net session
echo errorlevel=%errorlevel%
net session >nul 2>&1
if errorlevel 1 (echo NOT ADMIN) else (echo ADMIN)
net session >nul 2>&1 & echo sameline=%errorlevel%
whoami /groups | findstr /c:"S-1-16-12288" >nul && echo HIGH || echo NOT HIGH
fltmc >nul 2>&1 || echo fltmc says not admin`,
          try: R`احفظ المثال في [[check.bat]] وشغّله من نافذة عادية، واتوقّع سطر [[sameline]] قبل ما تشغّل. وبعدين غيّر ترتيب السطور بحيث [[sameline]] يبقى أول حاجة في الملف وشغّله تاني.`,
          deep: {
            why: R`سكربت محتاج أدمن واتشغّل من نافذة عادية بيكمّل عادي: كل أمر بيفشل لوحده برسالة، وأوامر تانية بتنجح، فتلاقي نص الشغل حصل. فحص واحد في الأول بيحوّل ده لرسالة واحدة واضحة وكود خروج، وده اللي سكربتات الشغل كلها بتعمله.`,
            how: R`[[net session]] بيكلّم خدمة Server ويطلب لستة الجلسات، والخدمة بترفض أي حد مش أدمن، فالخطأ 5 بيرجع. [[net]] بيحوّل أي خطأ لـ errorlevel 2. وعشان CMD بيعمل expansion للسطر كله مرة واحدة (درس %errorlevel% و !errorlevel!)، [[%errorlevel%]] على نفس السطر بيتقري قبل التنفيذ، أما [[if errorlevel 1]] و [[||]] فبيشوفوا الكود وقت التنفيذ.

[[whoami /groups]] بيقرا الـ integrity label من التوكن نفسه: [[S-1-16-12288]] = High = نافذة أدمن، و [[S-1-16-8192]] = Medium. ده مش محتاج خدمة ولا صلاحية.`,
            when: R`أول سطرين في أي [[.bat]] بيغيّر إعدادات أو خدمات أو ملفات نظام. ولو هتدّي السكربت لناس كتير (أجهزة شركة ممكن تكون قافلة Server)، استخدم [[whoami /groups]] أو اعمل الاتنين. ولو عايز السكربت يطلب الأدمن لوحده بدل ما يرفض، كمّل بدرس «Run as Administrator».`,
            mistakes: R`[[%errorlevel%]] على نفس السطر بعد [[&]]. أو [[if %errorlevel%==1]] مع إن net بيرجّع 2 مش 1 (استخدم [[if errorlevel 1]] أو [[neq 0]]). أو تنسى [[2>&1]] فرسالة [[System error 5]] تظهر للمستخدم. أو تعتمد على [[net user %USERNAME%]] وتشوف [[*Administrators]]: ده بيقول الحساب أدمن، مش النافذة.`
          },
          teach: R`## الفكرة: جرّب حاجة محتاجة أدمن

مفيش أمر في CMD اسمه «انا أدمن؟». الطريقة: شغّل أمر بيرفض غير الأدمن، واقرا نجح ولا لأ. كل اللي تحت اتشغّل في ملف [[.bat]] على ويندوز 11 من نافذة **عادية**. ناتج نافذة الأدمن من وثائق Microsoft ومن دروس الوحدة.

---

## ١. [[net session]] لوحده

~~~cmd
net session
echo errorlevel=%errorlevel%
~~~

~~~text اتشغّل فعلًا · ويندوز 11 · cmd.exe · نافذة عادية
System error 5 has occurred.

Access is denied.

errorlevel=2
~~~

- [[System error 5]] = الكود 5 من ويندوز، و [[net helpmsg 5]] بيطبع [[Access is denied.]].
- errorlevel **2** مش 5: [[net]] بيرجّع 2 لأي خطأ، والرقم الحقيقي في الرسالة بس.

---

## ٢. الفحص اللي بيتحط في أول السكربت

~~~cmd
net session >nul 2>&1
if errorlevel 1 (echo NOT ADMIN) else (echo ADMIN)
~~~

- [[>nul]] الناتج العادي يروح لـ nul، و [[2>&1]] الخطأ يروح مكان الناتج (درس | > >> 2>&1).
- [[if errorlevel 1]] معناها «الكود 1 أو أكتر»، فبتمسك الـ 2.

طبع [[NOT ADMIN]]. وفي سكربت حقيقي:

~~~cmd
net session >nul 2>&1 || (echo Run this as administrator. & exit /b 1)
~~~

[[||]] بيشغّل اللي بعده لو الأمر فشل، و [[exit /b 1]] بيخرج من السكربت بكود 1 عشان اللي ناداه يعرف.

---

## ٣. الفخ: [[%errorlevel%]] على نفس السطر

~~~cmd
net session >nul 2>&1 & echo sameline=%errorlevel%
~~~

في الملف ده طبع [[sameline=2]]، **بس ده كود [[net session]] اللي في السطر اللي قبله**، مش اللي على نفس السطر. والدليل: لما شغّلت نفس السطر لوحده في [[cmd /c]] جديد طبع [[ns=0]] من نافذة عادية، لأن مفيش أمر قبله.

CMD بيقرا السطر كله ويبدّل كل [[%...%]] بقيمته **قبل** ما يشغّل أي حاجة فيه. فـ [[%errorlevel%]] بقى رقم ثابت قبل ما [[net session]] يبدأ. الحلول: سطر لوحده، أو [[if errorlevel]]، أو [[&&]] و [[||]]، أو [[!errorlevel!]] مع delayed expansion (درس %errorlevel% و !errorlevel!).

---

## ٤. البدايل

~~~cmd
whoami /groups | findstr /c:"S-1-16-12288" >nul && echo HIGH || echo NOT HIGH
fltmc >nul 2>&1 || echo fltmc says not admin
~~~

~~~text اتشغّل فعلًا
NOT HIGH
fltmc says not admin
~~~

| الفحص | بيعتمد على | بيفشل غلط لما | من نافذة عادية |
|---|---|---|---|
| [[net session]] | خدمة Server (LanmanServer) | الخدمة مقفولة (من الوثائق) | [[System error 5]] و 2 |
| [[fltmc]] | صلاحية قراية الـ filter drivers | نادر | [[Filter listing failed with error: 0x80070005]] و 1 |
| [[whoami /groups]] و [[S-1-16-12288]] | التوكن نفسه | مبيفشلش | مفيش السطر، و findstr بـ 1 |

[[fltmc]] أداة filter drivers (برامج زي الأنتي فايرس بتراقب الملفات)، وعرضها محتاج أدمن. و [[S-1-16-12288]] هو SID الـ High integrity level، و [[S-1-16-8192]] الـ Medium: في النافذة دي [[findstr /c:"S-1-16-8192"]] لقاه.

---

## ٥. في PowerShell

~~~powershell
([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
~~~

طبع [[False]] من نافذة عادية (درس «Run as Administrator»)، و [[#Requires -RunAsAdministrator]] في أول سكربت [[.ps1]] بيرفض لوحده.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| الفحص المشهور | [[net session >nul 2>&1]] |
| اخرج لو مش أدمن | [[|| (echo Run this as administrator. & exit /b 1)]] |
| فحص من غير خدمات | [[whoami /groups | findstr /c:"S-1-16-12288"]] |
| بديل تاني | [[fltmc >nul 2>&1]] |
| الكود | [[if errorlevel 1]] مش [[%errorlevel%]] على نفس السطر |`,
          lines: [
            R`بيقفل طباعة الأوامر وهي بتتنفّذ، فالشاشة يظهر عليها الناتج بس.`,
            R`[[net session]] لوحده من نافذة عادية: [[System error 5 has occurred.]] و [[Access is denied.]]. ده الأمر اللي بنستخدم رفضه كفحص.`,
            R`على سطر لوحده بعد الأمر، فـ [[%errorlevel%]] بيتقري بعد ما [[net session]] خلص: طبع [[errorlevel=2]]. net بيرجّع 2 لأي خطأ.`,
            R`نفس الفحص من غير ما حاجة تظهر: [[>nul]] للناتج و [[2>&1]] للخطأ. ده السطر اللي بيتحط في أول السكربتات.`,
            R`[[if errorlevel 1]] = «الكود 1 أو أكتر» وقت التنفيذ، فبيمسك الـ 2. طبع [[NOT ADMIN]].`,
            R`الفخ: [[%errorlevel%]] اتفك لما السطر اتقري، قبل ما [[net session]] اللي جنبه يشتغل. طبع [[sameline=2]] بس دي قيمة السطر اللي قبله، وفي [[cmd /c]] لوحده بيطبع 0.`,
            R`فحص من غير خدمات: [[S-1-16-12288]] هو SID الـ High integrity level، ولو مش في التوكن [[findstr]] بيفشل و [[||]] يطبع [[NOT HIGH]].`,
            R`بديل تاني: [[fltmc]] (عرض filter drivers) محتاج أدمن، فرفضه = مش أدمن. طبع [[fltmc says not admin]].`,
          ],
          sol: R`المثال في [[check.bat]] من نافذة عادية طبع بالترتيب: [[System error 5 has occurred.]] و [[Access is denied.]] و [[errorlevel=2]]، و [[NOT ADMIN]]، و [[sameline=2]]، و [[NOT HIGH]]، و [[fltmc says not admin]]. ولما [[sameline]] بقى أول سطر في الملف (بعد [[@echo off]]) طبع [[sameline=0]]: القيمة اللي كانت قبل [[net session]]، وده الدليل إن [[%errorlevel%]] اتفك قبل التنفيذ.

اتجرّب على ويندوز 11 في CMD عادي. ناتج نافذة الأدمن ([[There are no entries in the list.]] و 0) وفشل [[net session]] لما خدمة Server مقفولة من وثائق Microsoft، ومتجرّبوش هنا.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[net session]] من نافذة عادية، وبعده [[echo %errorlevel%]] على سطر لوحده. ليه الرقم مش 5 مع إن الرسالة بتقول error 5؟`, done: R`[[System error 5 has occurred.]] و [[Access is denied.]] و [[2]]. [[net]] بيرجّع 2 لأي خطأ، والـ 5 في الرسالة بس، فـ [[if %errorlevel%==5]] عمره ما هيتحقق.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[net session >nul 2>&1 & if %errorlevel%==0 (echo admin) else (echo user)]] على سطر واحد في أول ملف [[.bat]]. من نافذة عادية طبع إيه؟ صلّحه بطريقتين.`, done: R`طبع [[admin]] غلط: [[%errorlevel%]] اتفك 0 قبل ما [[net session]] يشتغل. الإصلاح [[net session >nul 2>&1 && (echo admin) || (echo user)]]، أو الفحص على سطر و [[if errorlevel 1]] على السطر اللي بعده. الاتنين طبعوا [[user]].` },
            { lvl: 'تطبيق', t: R`**ابني:** [[need-admin.bat]] صغير بيتنادى بـ [[call need-admin.bat || exit /b 1]] من أي سكربت: بيعمل الفحص بطريقتين ([[net session]] ولو فشل [[whoami /groups]] بـ [[S-1-16-12288]])، ويطبع رسالة واضحة، ويرجّع 0 أو 1.`, done: R`من نافذة عادية طبع رسالتك وخرج بـ 1، والسكربت اللي ناداه وقف عند السطر ده ومكمّلش. واتأكدت إن الطريقتين اتفقوا ([[NOT ADMIN]] و [[NOT HIGH]]).` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** شغّل التلات فحوصات ([[net session]] و [[fltmc]] و [[whoami /groups]] مع [[S-1-16-12288]]) واطبع errorlevel كل واحد على سطر لوحده.`, done: R`من نافذة عادية: net session 2، و fltmc 1 (برسالة [[Filter listing failed with error: 0x80070005]])، و findstr 1. التلاتة بيقولوا «مش أدمن» بأكواد مختلفة، فقارن بـ [[if errorlevel 1]] مش برقم معيّن.` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** [[test-need-admin.bat]] بيشغّل [[need-admin.bat]] ويقارن الكود باللي متوقعه حسب مستوى النافذة (من [[whoami /groups]])، ويطبع PASS أو FAIL. شغّله في النافذة العادية، والأدمن لو متاحة.`, done: R`في النافذة العادية [[PASS (expected 1, got 1)]]، وفي نافذة الأدمن المتوقع 0. ولو بوّظت [[need-admin.bat]] بالفخ بتاع [[%errorlevel%]] على نفس السطر، الاختبار طلّع FAIL في النافذة العادية.` },
          ],
          ci: [
            { os: [R`windows`], sh: R`cmd`, run: R`@echo off
net session >nul 2>&1
if errorlevel 1 (echo check=user) else (echo check=admin)
whoami /groups | findstr /c:"S-1-16-" >nul && echo label-ok
net helpmsg 5 | findstr /c:"Access is denied" >nul && echo helpmsg-ok
exit /b 0`, expect: [R`check=`, R`label-ok`, R`helpmsg-ok`] },
          ],
          flag: "script",
        },
        {
          cmd: "cmdkey",
          title: "الباسوردات اللي ويندوز فاكرها (Credential Manager)",
          learn: R`تعرض الحسابات المحفوظة في Credential Manager، وتدوّر على واحد بالاسم، وتعرف أنواعها (Domain و Generic) ومين بيكتبها (Remote Desktop و الشير و git و [[runas /savecred]])، وإزاي [[/add]] و [[/delete]] بيتكتبوا من غير ما الباسورد يفضل في الـ history.`,
          out: R`«git بيستخدم الحساب القديم» أو «الشير بيفتح باسم حد تاني» أو «Remote Desktop مش بيسأل على الباسورد» هتعرف إن السبب حساب محفوظ وتلاقيه وتشيله.`,
          use: {
            work: R`بعد ما باسورد اتغيّر، ويندوز بيفضل يجرّب القديم المحفوظ لحد ما الحساب يتقفل (lockout). الحل تمسح الحساب المحفوظ ده بالاسم.`,
            prog: R`Git Credential Manager على ويندوز بيحفظ التوكن هنا كـ Generic، فلو التوكن انتهى أو بتاع حساب تاني، ده المكان اللي تمسحه منه.`,
            net: R`الشير ([[net use]]) و Remote Desktop ([[mstsc]]) بيقروا من هنا عشان ميسألوش كل مرة، و [[cmdkey /add:الجهاز]] قبل [[net use]] بيخليه يتصل من غير ما يسأل.`,
          },
          desc: R`[[cmdkey]] هو Credential Manager من CMD: بيعرض ويضيف ويمسح الحسابات (اسم ويوزر وباسورد) اللي ويندوز بيستخدمها لوحده لما تتصل بجهاز أو خدمة. كل يوزر ليه لستة خاصة بيه، ومش محتاج أدمن.

[[cmdkey /list]] كل الحسابات المحفوظة، ولكل واحد [[Target:]] (بتاع إيه) و [[Type:]] و [[User:]]. **متنسخش ناتجه في أي مكان**: فيه أسامي سيرفراتك وحساباتك.
[[cmdkey /list:fileserver01]] حساب واحد بالاسم (وبيقبل [[*]])، ولو مش موجود بيطبع [[* NONE *]].
[[cmdkey /add:fileserver01 /user:LAB\ali /pass]] احفظ حساب لجهاز (Domain credential)، و [[/pass]] من غير قيمة معناها «اسألني» فالباسورد مش بيتكتب في الأمر.
[[cmdkey /generic:git:https://git.example.test /user:ali /pass]] حساب Generic لأي برنامج بيطلبه بالاسم ده.
[[cmdkey /delete:fileserver01]] امسح حساب.

[[cmdkey]] مش بيطبع الباسورد أبدًا، حتى لصاحبه. والإضافة والمسح بيغيّروا الحسابات المحفوظة، فهنا اتشرحوا من وثائق Microsoft و [[cmdkey /?]]. وفي PowerShell مفيش أمر مدمج بنفس الشغل، والناس بتستخدم [[cmdkey]] نفسه أو موديول CredentialManager.`,
          example: R`cmdkey /?
cmdkey /list:labsrv01.invalid
cmdkey /list:lab*
cmdkey /list | find /c "Target:"
cmdkey /add:labsrv01.invalid /user:LAB\ali /pass
cmdkey /delete:labsrv01.invalid`,
          try: R`اعرف عدد الحسابات المحفوظة عندك من غير ما تعرضها: [[cmdkey /list | find /c "Target:"]]. وبعدين دوّر على اسم مخترع بـ [[/list:]] واعرف السكربت هيفرّق إزاي بين «موجود» و «مش موجود».`,
          deep: {
            why: R`الحسابات المحفوظة بتريّحك لحد ما الباسورد يتغيّر أو الحساب يبقى غلط: ويندوز بيبعت القديم في صمت، فالسيرفر يرفض أو يقفل حسابك بعد كام محاولة، والرسالة مبتقولش السبب. [[cmdkey]] بيوريك المحفوظ ويمسحه بسطر، ومن سكربت قبل ما تتصل.`,
            how: R`الحسابات متخزّنة في Credential Manager، ملفات في بروفايلك ([[%APPDATA%\Microsoft\Credentials]] و [[%LOCALAPPDATA%\Microsoft\Credentials]]) متشفّرة بـ DPAPI بمفتاح مربوط بباسورد دخولك، فيوزر تاني ميقدرش يقراها حتى لو أدمن من غير باسوردك (من الوثائق). أي برنامج شغال **باسمك** يقدر يطلبها، وده سبب إن [[runas /savecred]] خطير.

الأنواع اللي بتشوفها في [[Target:]]: [[Domain:target=...]] بيستخدمه ويندوز نفسه للشير و Remote Desktop ([[TERMSRV/الجهاز]])، و [[LegacyGeneric:target=...]] لأي برنامج (git مثلًا)، و [[MicrosoftAccount:target=...]] و [[WindowsLive:target=...]] لحساب Microsoft. والسطر الأخير في كل حساب بيقول مدته: [[Local machine persistence]] (دايم) أو [[Saved for this logon only]] (لحد ما تعمل sign out).`,
            when: R`لما حاجة بتدخل بحساب غلط أو قديم، أو قبل [[net use]] في سكربت عشان ميسألش، أو لما تنضّف جهاز هتسيبه. ولو المشكلة في git بس، [[git credential-manager erase]] أو Credential Manager من Control Panel بيعملوا نفس الحاجة بشكل أوضح.`,
            mistakes: R`تكتب [[/pass:Secret123]] في الأمر فالباسورد يفضل في history النافذة وفي السكربت. أو تنسخ [[cmdkey /list]] في issue أو شات فتكشف أسامي سيرفراتك. أو تفتكر إن errorlevel بيقولك الحساب موجود (لأ: 0 حتى مع [[* NONE *]]). أو تمسح الحساب الغلط عشان كتبت جزء من الاسم: [[/delete]] بياخد الـ target بالظبط زي ما في [[/list]].`
          },
          teach: R`## الفكرة: دفتر باسوردات ويندوز

كل ما بتعلّم «Remember my credentials» في نافذة دخول (شير، Remote Desktop، git)، الحساب بيتحفظ في Credential Manager باسم **target**. [[cmdkey]] بيقرا ويكتب الدفتر ده. كل اللي تحت اتشغّل في CMD على ويندوز 11 من نافذة عادية، بأسامي مخترعة على [[.invalid]] (دومين محجوز مش موجود). [[/add]] و [[/delete]] متشغّلوش هنا لأنهم بيغيّروا الحسابات المحفوظة؛ دول من وثائق Microsoft و [[cmdkey /?]].

---

## ١. اعرف الأمر من [[/?]]

~~~text اتشغّل فعلًا · cmdkey /? (أول سطور)
The syntax of this command is:

CMDKEY [{/add | /generic}:targetname {/smartcard | /user:username {/pass{:password}}} | /delete{:targetname | /ras} | /list{:targetname}]
~~~

اقراه كده: يا إما [[/add]] أو [[/generic]] ومعاه اسم، وبعده يا [[/smartcard]] يا [[/user]] ومعاه [[/pass]] اختياري، أو [[/delete]]، أو [[/list]]. والأقواس [[{ }]] معناها «لازم واحد من دول» (درس «سطر الاستخدام في CMD»).

وسويتش غلط ([[cmdkey /nosuch]]) طبع [[The command line parameters are incorrect.]] وبعدها نفس المساعدة، و errorlevel 1.

---

## ٢. دوّر على حساب واحد

~~~cmd
cmdkey /list:labsrv01.invalid
~~~

~~~text اتشغّل فعلًا · ويندوز 11 · cmd.exe · نافذة عادية
Currently stored credentials for labsrv01.invalid:

* NONE *
~~~

errorlevel **0** رغم إنه ملقاش حاجة. فالسكربت بيفرّق كده:

~~~cmd
cmdkey /list:labsrv01.invalid | findstr /c:"* NONE *" >nul && echo not saved || echo saved
~~~

طبع [[not saved]]. و [[cmdkey /list:lab*]] بالنجمة طبع نفس الشكل ([[Currently stored credentials for lab*:]] و [[* NONE *]]). ونفس الحساب ممكن تدوّر عليه بالاسم الكامل: [[cmdkey /list:Domain:target=labsrv01.invalid]] طبع [[* NONE *]] برضه.

---

## ٣. اللستة كلها: [[cmdkey /list]]

متنسخش ناتجها. الشكل (بأسامي مخترعة، والعناوين والأنواع زي ما طلعت فعلًا):

~~~text شكل الناتج · الأسامي مخترعة
Currently stored credentials:

    Target: LegacyGeneric:target=git:https://git.example.test
    Type: Generic
    User: ali
    Local machine persistence

    Target: Domain:target=TERMSRV/lab-pc02
    Type: Domain Password
    User: LAB\ali
    Saved for this logon only
~~~

| السطر | معناه |
|---|---|
| [[Target:]] | اسم الحساب، وقبله نوعه: [[LegacyGeneric:target=]] و [[Domain:target=]] و [[MicrosoftAccount:target=]] و [[WindowsLive:target=]] (التلاتة الأولانيين والرابع ظهروا على جهاز التجربة) |
| [[Type:]] | [[Generic]] لأي برنامج، و [[Domain Password]] لويندوز نفسه (شير و Remote Desktop) |
| [[User:]] | اليوزر اللي هيتبعت |
| آخر سطر | [[Local machine persistence]] دايم، أو [[Saved for this logon only]] لحد الـ sign out |

العدد من غير ما تعرض حاجة: [[cmdkey /list | find /c "Target:"]] طبع رقم (على جهاز التجربة 14).

### فخ: [[findstr]] على نص بيبدأ بـ [[/]]

عايز تطلّع سطور الاستخدام من المساعدة: [[cmdkey /? | findstr /i "/add /generic"]] طبع سطور زي [[FINDSTR: /a ignored]] و [[FINDSTR: /d ignored]]: findstr فهم الكلام اللي بيبدأ بـ [[/]] على إنه سويتشات بتاعته. الحل [[/c:"/add"]].

---

## ٤. ضيف وامسح (من الوثائق)

~~~cmd
cmdkey /add:fileserver01 /user:LAB\ali /pass
cmdkey /generic:git:https://git.example.test /user:ali /pass
cmdkey /add:TERMSRV/lab-pc02 /user:LAB\ali /pass
cmdkey /delete:fileserver01
~~~

- [[/add:fileserver01]] حساب Domain لجهاز: [[net use \\fileserver01\share]] بعدها بيتصل من غير ما يسأل.
- [[/generic:]] حساب لأي برنامج بيطلبه بالاسم ده بالظبط.
- [[TERMSRV/lab-pc02]] الاسم اللي Remote Desktop بيدوّر عليه ([[mstsc /v:lab-pc02]]، درس mstsc).
- [[/pass]] من غير [[:]] بيسأل الباسورد ومش بيظهر. [[/pass:Secret]] بيشتغل بس الباسورد بيفضل في history النافذة ([[doskey /history]]) وفي أي سكربت.
- [[/delete:]] بالاسم زي ما ظاهر في [[/list]] (من غير [[Domain:target=]] للحسابات العادية).

الترتيب الآمن لو حساب قديم بيعمل مشكلة: [[cmdkey /list:الاسم]] تتأكد إنه موجود ← [[cmdkey /delete:الاسم]] ← [[cmdkey /list:الاسم]] يطبع [[* NONE *]] ← اتصل تاني وادخل الباسورد الجديد.

---

## ٥. الأمان

- الحسابات متشفّرة بـ DPAPI ومربوطة بحسابك، و [[cmdkey]] نفسه عمره ما بيطبع باسورد.
- بس أي برنامج شغال باسمك يقدر يستخدمها. و [[runas /savecred]] بيحفظ حساب الأدمن هنا كـ [[Domain:interactive=...]] (من الوثائق)، فأي حد على يوزرك يشغّل أي حاجة كأدمن (درس runas).
- قبل ما تسيب جهاز: امسح حساباتك بالاسم، أو امسح بروفايلك كله.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| عدد المحفوظ | [[cmdkey /list | find /c "Target:"]] |
| حساب واحد | [[cmdkey /list:الاسم]] |
| موجود ولا لأ | [[findstr /c:"* NONE *"]] على الناتج (errorlevel دايمًا 0) |
| احفظ لجهاز | [[cmdkey /add:الجهاز /user:DOMAIN\user /pass]] |
| احفظ لبرنامج | [[cmdkey /generic:الاسم /user:user /pass]] |
| امسح | [[cmdkey /delete:الاسم]] |`,
          lines: [
            R`المساعدة: سطر الاستخدام كله وأمثلة لكل عملية. و errorlevel 0. ده أول حاجة تقراها لأن الأمر مالوش [[--help]].`,
            R`دوّر على حساب بالاسم. الاسم مخترع على [[.invalid]] فطبع [[Currently stored credentials for labsrv01.invalid:]] و [[* NONE *]]، و errorlevel 0 حتى وهو ملقاش.`,
            R`نفس البحث بنجمة: أي target بيبدأ بـ [[lab]]. طبع [[* NONE *]] على جهاز التجربة.`,
            R`بيعدّ الحسابات المحفوظة من غير ما يعرض أساميها: كل حساب ليه سطر [[Target:]] واحد. أأمن من إنك تطبع اللستة على الشاشة قدام حد أو في لوج.`,
            R`(من الوثائق) بيحفظ حساب Domain للجهاز ده، و [[/pass]] من غير قيمة بيسألك الباسورد فمش بيتكتب في الأمر ولا في الـ history.`,
            R`(من الوثائق) بيمسح الحساب ده بالاسم بالظبط. بعدها [[cmdkey /list:labsrv01.invalid]] المفروض يطبع [[* NONE *]].`,
          ],
          sol: R`[[cmdkey /list | find /c "Target:"]] طبع رقم بس (على جهاز التجربة 14) من غير ما يبان أي اسم. و [[cmdkey /list:labsrv01.invalid]] طبع [[Currently stored credentials for labsrv01.invalid:]] وتحتها [[* NONE *]] و errorlevel 0، فـ errorlevel مبيفرّقش. التفريق بـ [[cmdkey /list:labsrv01.invalid | findstr /c:"* NONE *" >nul && echo not saved || echo saved]] وطبع [[not saved]].

اتجرّب على ويندوز 11 في CMD عادي بأسامي مخترعة. [[/add]] و [[/generic]] و [[/delete]] من وثائق Microsoft و [[cmdkey /?]]، ومتشغّلوش عشان ميغيّروش الحسابات المحفوظة.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[cmdkey /list:labsrv01.invalid]] وبعدها [[echo %errorlevel%]] على سطر لوحده. وبعدين [[cmdkey /nosuch]].`, done: R`الأول [[* NONE *]] و errorlevel **0**، والتاني [[The command line parameters are incorrect.]] والمساعدة و 1. فـ «مش موجود» مش error عند cmdkey.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** عايز سطور [[/add]] و [[/generic]] من المساعدة: [[cmdkey /? | findstr /i "/add /generic"]]. إيه اللي طلع؟ صلّحه.`, done: R`طلع [[FINDSTR: /a ignored]] و [[FINDSTR: /d ignored]] و [[FINDSTR: /g ignored]] وغيرهم: findstr فهم كل كلمة بتبدأ بـ [[/]] كسويتش. الصح [[findstr /i /c:"/add" /c:"/generic"]].` },
            { lvl: 'تطبيق', t: R`**ابني:** [[has-cred.bat NAME]] بيطبع «saved» ويخرج بـ 0 لو الحساب موجود، و «not saved» و 1 لو مش موجود، من [[findstr /c:"* NONE *"]] على ناتج [[/list:]]، ومبيطبعش أي حاجة تانية من الناتج.`, done: R`[[has-cred.bat labsrv01.invalid]] طبع [[not saved]] و errorlevel 1، ومن غير argument طبع رسالة الاستخدام و 2. ولو جرّبته على اسم موجود عندك بيطبع [[saved]] بس من غير اليوزر.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** من غير ما تطبع الأسامي، اعرف أنواع الحسابات المحفوظة عندك: [[cmdkey /list | findstr /c:"Type:"]] و [[cmdkey /list | findstr /c:"persistence" /c:"logon only"]].`, done: R`على جهاز التجربة الأنواع كانت [[Type: Generic]] بس (حسابات برامج زي git)، وفي حسابات [[Local machine persistence]] وحسابات [[Saved for this logon only]]. وكتبت إن الأسامي نفسها متطبعتش.` },
            { lvl: 'تحدي', t: R`**محاكاة:** في Windows Sandbox: [[cmdkey /add:labsrv01.invalid /user:LAB\ali /pass]] (اكتب أي باسورد)، و [[cmdkey /list:labsrv01.invalid]]، و [[cmdkey /delete:labsrv01.invalid]]، و [[/list:]] تاني.`, done: R`بعد الإضافة [[Target: Domain:target=labsrv01.invalid]] و [[Type: Domain Password]] و [[User: LAB\ali]]، والباسورد مش ظاهر، وبعد المسح [[* NONE *]]. (الخطوات والشكل من وثائق Microsoft، ومتجرّبتش على جهاز التجربة.)` },
          ],
          ci: [
            { os: [R`windows`], sh: R`cmd`, run: R`@echo off
cmdkey /list:labsrv01.invalid | findstr /c:"* NONE *" >nul && echo none-ok
cmdkey /nosuch >nul 2>&1
echo bad=%errorlevel%
exit /b 0`, expect: [R`none-ok`, R`bad=1`] },
          ],
        },
        {
          cmd: "gpresult",
          title: "إيه السياسات (Group Policy) اللي متطبّقة عليك؟",
          learn: R`تقرا تقرير [[gpresult /r]]: الجهاز على دومين ولا لأ، وآخر مرة السياسات اتطبّقت، وأنهي GPO اتطبّق واتفلتر، وجروباتك، وتعرف الفرق بين [[/scope user]] و [[computer]]، وإن [[/h]] و [[/x]] مش موجودين في Home.`,
          out: R`«الإعداد ده مقفول ومكتوب Some settings are managed by your organization» هتعرف مين اللي قافله ومنين، بدل ما تدوّر في Settings.`,
          use: {
            work: R`على أجهزة الشركة، إعدادات كتير (الـ proxy، و USB، و PowerShell execution policy، وخلفية الشاشة) جاية من Group Policy. [[gpresult /r]] أول أمر الدعم الفني بيطلبه.`,
            cs: R`Group Policy إعدادات بتتبعت من سيرفر الدومين (Active Directory) وبتتكتب في الريجستري عند الدخول وكل ٩٠ دقيقة تقريبًا (من الوثائق)، و RSoP (Resultant Set of Policy) هو «الناتج النهائي» بعد ما كل السياسات اتجمعت.`,
          },
          desc: R`[[gpresult]] بيطبع **RSoP**: السياسات اللي اتطبّقت فعلًا على اليوزر والجهاز، وجت منين. على جهاز شركة ده بيقولك أنهي GPO (Group Policy Object) قافل الإعداد اللي مضايقك، وعلى جهاز بيتك هيقولك إن مفيش حاجة.

[[gpresult /r]] الملخص (summary).
[[/scope user]] اليوزر بس، و [[/scope computer]] الجهاز بس (محتاج أدمن).
[[/v]] تفاصيل، و [[/z]] تفاصيل أكتر: كل إعداد ومن أنهي GPO.
[[/h report.html]] تقرير HTML، و [[/x report.xml]] XML، ومعاهم [[/f]] عشان يكتب فوق الملف. **مش موجودين في ويندوز Home**: على جهاز التجربة طلّعوا [[ERROR: Invalid argument/option - '/h'.]].
[[/user ali]] تقرير يوزر تاني، و [[/s جهاز]] جهاز تاني.

أهم سطور في التقرير: [[OS Configuration:]] ([[Standalone Workstation]] يعني مش على دومين، و [[Member Workstation]] على دومين)، و [[Last time Group Policy was applied:]]، وتحت [[Applied Group Policy Objects]] الـ GPOs اللي اتطبّقت، وتحت [[The following GPOs were not applied]] اللي اتفلترت وليه. ولو عايز تطبّق السياسات من جديد: [[gpupdate /force]] (بيغيّر، فمن الوثائق). وفي PowerShell: [[Get-GPResultantSetOfPolicy]] من موديول GroupPolicy (على السيرفرات و RSAT).`,
          example: R`gpresult /r /scope user
gpresult /r /scope user | findstr /c:"OS Configuration" /c:"Last time" /c:"Domain Type"
gpresult /r /scope computer
gpresult /z /scope user > gp-z.txt
gpresult /h gp.html /f`,
          try: R`اعرف جهازك على دومين ولا لأ، وآخر مرة السياسات اتطبّقت، من [[gpresult /r /scope user]]. وجرّب [[/h]]: لو طلعلك [[Invalid argument/option]] يبقى نسختك Home.`,
          deep: {
            why: R`على جهاز شركة، نص «الإعداد ده مش بيتغيّر» سببه Group Policy، والـ Settings بيقولك بس «managed by your organization». [[gpresult]] بيقولك أنهي GPO ومن أنهي سيرفر وآخر مرة اتطبّق، فتروح للشخص الصح بالاسم بدل ما تجرّب حلول من النت هتترجع لوحدها في التطبيق الجاي.`,
            how: R`عند الدخول وفي فترات ثابتة، خدمة Group Policy Client بتجيب الـ GPOs من الدومين (أو Local Group Policy على الجهاز نفسه)، وتطبّقها بالترتيب (Local ثم Site ثم Domain ثم OU، والأخير بيكسب)، وتسجّل النتيجة RSoP. [[gpresult]] بيقرا التسجيل ده، **مش التوكن بتاع النافذة**: عشان كده في قسم الجروبات على جهاز التجربة ظهر [[High Mandatory Level]] مع إن النافذة كانت عادية، لأن التسجيل اتعمل وقت الدخول.

على Home مفيش محرر سياسات ([[gpedit.msc]]) ولا دومين، فالتقرير بيقول [[Applied Group Policy Objects]] [[N/A]] و [[Local Group Policy]] [[Not Applied (Empty)]].`,
            when: R`لما إعداد مقفول على جهاز شركة، أو بعد ما الـ IT قال «طبّقنا السياسة» وعايز تتأكد ([[Last time Group Policy was applied]])، أو لما تجهّز تقرير للدعم الفني ([[/h]] على Pro و Enterprise). وعلى جهاز بيتك Home غالبًا مش هتحتاجه غير عشان تتأكد إن مفيش سياسات.`,
            mistakes: R`تشغّل [[/scope computer]] من نافذة عادية فتاخد [[ERROR: Access Denied.]] وتفتكر إن الجهاز مقفول. أو تستنى [[/h]] يشتغل على Home. أو تقرا قسم الجروبات كأنه حالة النافذة دي. أو تقرا التاريخ اللي في أول التقرير بـ [[for /f]] فتلاقي حروف مخفية (U+200E) لازقة في الأرقام. أو تتجاهل [[/user]] بيرجّع 0 مع [[INFO: The user "..." does not have RSoP data.]].`
          },
          teach: R`## الفكرة: «مين اللي قفل الإعداد ده؟»

Group Policy إعدادات بتتفرض على اليوزر أو الجهاز من برا (سيرفر الدومين في الشركات، أو Local Group Policy). [[gpresult]] بيطبع الناتج النهائي (RSoP). كل اللي تحت اتشغّل في CMD على **ويندوز 11 Home** من نافذة عادية، وأسامي الجهاز واليوزر اتغيّرت لـ [[LAB-PC]] و [[ali]]. اللي خاص بـ Pro والدومين ([[/h]] و [[/x]] و GPOs حقيقية) من وثائق Microsoft.

---

## ١. التقرير: [[gpresult /r /scope user]]

- [[/r]] الملخص، و [[/scope user]] جزء اليوزر بس (الجزء اللي مش محتاج أدمن).

~~~text اتشغّل فعلًا · ويندوز 11 Home · cmd.exe · نافذة عادية (مختصر)
RSOP data for LAB-PC\ali on LAB-PC : Logging Mode
----------------------------------------------------

OS Configuration:            Standalone Workstation
OS Version:                  10.0.26300
Site Name:                   N/A
Roaming Profile:             N/A
Local Profile:               C:\Users\ali
Connected over a slow link?: No


USER SETTINGS
--------------

    Last time Group Policy was applied: 11/3/2026 at 5:46:57 PM
    Group Policy was applied from:      N/A
    Group Policy slow link threshold:   500 kbps
    Domain Name:                        LAB-PC
    Domain Type:                        <Local Computer>

    Applied Group Policy Objects
    -----------------------------
        N/A

    The following GPOs were not applied because they were filtered out
    -------------------------------------------------------------------
        Local Group Policy
            Filtering:  Not Applied (Empty)

    The user is a part of the following security groups
    ---------------------------------------------------
        High Mandatory Level
        Everyone
        ...
~~~

| السطر | معناه هنا | على جهاز شركة (من الوثائق) |
|---|---|---|
| [[OS Configuration]] | [[Standalone Workstation]]: مش على دومين | [[Member Workstation]] |
| [[Domain Type]] | [[<Local Computer>]]: الجهاز نفسه | [[Windows 2008 or later]] واسم الدومين |
| [[Group Policy was applied from]] | [[N/A]]: مفيش سيرفر | اسم الـ domain controller |
| [[Applied Group Policy Objects]] | [[N/A]]: ولا سياسة | أسامي الـ GPOs بالترتيب |
| [[not applied because they were filtered out]] | [[Local Group Policy]] [[Not Applied (Empty)]]: فاضية | GPO اتفلتر وليه (Security أو WMI filter) |

### فخ: الجروبات مش بتاعة النافذة

القسم الأخير فيه [[High Mandatory Level]] مع إن النافذة عادية ([[whoami /groups]] في نفس النافذة قال [[Medium]]). [[gpresult]] بيقرا اللي اتسجّل وقت تطبيق السياسات، مش التوكن اللي انت فيه. فلـ «النافذة أدمن؟» استخدم [[whoami /groups]] أو [[net session]] (الدرسين اللي فاتوا).

### فخ: حروف مخفية في التاريخ

أول التقرير فيه [[Created on 11/3/2026 at 6:46:26 PM]]، بس قبل الـ 11 والـ 3 والـ 2026 في حرف مخفي [[U+200E]] (Left-to-Right Mark): PowerShell لقى ٣ حروف كود 8206 في السطر. فلو قريت التاريخ ده بـ [[for /f]] وعملت [[set /a]] أو مقارنة، هيبوظ. خد الوقت من [[%date%]] أو PowerShell بدل ما تقراه من التقرير.

---

## ٢. سطور معيّنة بس

~~~cmd
gpresult /r /scope user | findstr /c:"OS Configuration" /c:"Last time" /c:"Domain Type"
~~~

طبع ٣ سطور: [[OS Configuration: Standalone Workstation]] و [[Last time Group Policy was applied: ...]] و [[Domain Type: <Local Computer>]]. ده اللي تبعته في رسالة للدعم الفني بدل ٥٤ سطر.

---

## ٣. [[/scope computer]] و [[/z]]

~~~cmd
gpresult /r /scope computer
~~~

من نافذة عادية: [[ERROR: Access Denied.]] و errorlevel 1. سياسات الجهاز محتاجة نافذة أدمن (درس «Run as Administrator»). و [[gpresult /r]] من غير [[/scope]] من نافذة عادية طلّع جزء اليوزر بس (نفس الـ ٥٤ سطر) و errorlevel 0.

~~~cmd
gpresult /z /scope user > gp-z.txt
~~~

[[/z]] (super-verbose) كل إعداد ومن أنهي GPO، حتى اللي اتكتب عليه من GPO تاني. هنا طلّع 104 سطر. على جهاز شركة ده ممكن يبقى آلاف، فوجّهه لملف ودوّر فيه بـ [[findstr]].

---

## ٤. [[/h]] و [[/x]]: مش في Home

~~~cmd
gpresult /h gp.html /f
~~~

~~~text اتشغّل فعلًا · ويندوز 11 Home
ERROR: Invalid argument/option - '/h'.
Type "GPRESULT /?" for usage.
~~~

errorlevel 1، ونفس الكلام لـ [[/x]]. و [[gpresult /?]] على Home فيه [[/R]] و [[/V]] و [[/Z]] بس. على Pro و Enterprise (من الوثائق): [[/h gp.html]] بيعمل تقرير HTML شكله زي Group Policy Management، و [[/f]] بيكتب فوق الملف لو موجود (من غيره بيرفض)، والتقرير ده أحسن حاجة تبعتها للـ IT.

---

## ٥. يوزر تاني

~~~cmd
gpresult /user labnosuch /r
~~~

طبع [[INFO: The user "labnosuch" does not have RSoP data.]] و errorlevel **0**. يعني «مفيش بيانات» مش فشل، فافحص النص لو بتستخدمه في سكربت.

---

## ٦. وبعدين؟ (من الوثائق)

- [[gpupdate /force]] بيطبّق السياسات من جديد دلوقتي (بدل ما تستنى). بيغيّر الجهاز، فمتشغّلش هنا.
- على Home مفيش [[gpedit.msc]]، والإعدادات اللي المقالات بتقول «اعملها من Group Policy» بتتعمل في الريجستري بنفسها (درس «reg query / reg add»)، بعد [[reg export]].

---

## الخلاصة

| عايز | اكتب |
|---|---|
| الملخص | [[gpresult /r /scope user]] |
| دومين ولا لأ | سطر [[OS Configuration]] و [[Domain Type]] |
| آخر تطبيق | سطر [[Last time Group Policy was applied]] |
| سياسات الجهاز | [[gpresult /r /scope computer]] من نافذة أدمن |
| كل التفاصيل | [[gpresult /z > file.txt]] |
| تقرير HTML | [[gpresult /h gp.html /f]] (Pro و Enterprise بس) |

وافتكر: الجروبات في التقرير مش حالة النافذة، والتاريخ فيه حروف مخفية.`,
          lines: [
            R`ملخص سياسات اليوزر الحالي: الجهاز على دومين ولا لأ، وآخر تطبيق، والـ GPOs اللي اتطبّقت واللي اتفلترت، والجروبات. اشتغل من نافذة عادية وطلّع ٥٤ سطر و errorlevel 0.`,
            R`نفس التقرير بس ٣ سطور: [[/c:]] لكل جملة بالظبط (و [[findstr]] بيعمل OR بينهم). طبع [[Standalone Workstation]] و [[Last time Group Policy was applied]] و [[<Local Computer>]].`,
            R`سياسات الجهاز نفسه، ومحتاجة أدمن: من نافذة عادية [[ERROR: Access Denied.]] و errorlevel 1.`,
            R`[[/z]] كل إعداد ومن أنهي GPO، و [[>]] بيوجّهه لملف لأنه طويل (هنا 104 سطر، وعلى جهاز شركة ممكن آلاف).`,
            R`تقرير HTML و [[/f]] يكتب فوق الملف. على Pro و Enterprise بس: على Home طلّع [[ERROR: Invalid argument/option - '/h'.]] و errorlevel 1.`,
          ],
          sol: R`على ويندوز 11 Home من نافذة عادية: [[OS Configuration: Standalone Workstation]] (مش على دومين)، و [[Domain Type: <Local Computer>]]، و [[Last time Group Policy was applied: 11/3/2026 at 5:46:57 PM]]، و [[Applied Group Policy Objects]] تحتها [[N/A]]. و [[gpresult /h gp.html /f]] طلّع [[ERROR: Invalid argument/option - '/h'.]] و [[Type "GPRESULT /?" for usage.]] و errorlevel 1، و [[gpresult /?]] مفيهوش غير [[/R]] و [[/V]] و [[/Z]]: النسخة Home.

اتجرّب على ويندوز 11 Home في CMD عادي. [[/h]] و [[/x]] على Pro وتقارير الدومين و [[gpupdate /force]] من وثائق Microsoft.`,
          practice: [
            { lvl: 'سريع', t: R`**بيانات حقيقية:** من [[gpresult /r /scope user]] طلّع ٣ إجابات: الجهاز على دومين؟ آخر مرة السياسات اتطبّقت إمتى؟ فيه GPO متطبّق؟`, done: R`على جهاز التجربة: [[Standalone Workstation]] (لأ)، والوقت في سطر [[Last time Group Policy was applied]]، و [[Applied Group Policy Objects]] تحتها [[N/A]]. على جهاز شركة هتلاقي [[Member Workstation]] وأسامي GPOs.` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** من نافذة عادية: [[gpresult /r /scope computer]]، و [[gpresult /h gp.html]]، و [[gpresult /user labnosuch /r]]، و errorlevel كل واحد على سطر لوحده.`, done: R`[[ERROR: Access Denied.]] و 1، و (على Home) [[ERROR: Invalid argument/option - '/h'.]] و 1، و [[INFO: The user "labnosuch" does not have RSoP data.]] و **0**. التالت مش فشل عند gpresult.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** قارن قسم الجروبات في [[gpresult /r /scope user]] بـ [[whoami /groups | findstr /c:"Mandatory Level"]] في نفس النافذة.`, done: R`gpresult قال [[High Mandatory Level]] و whoami قال [[Medium Mandatory Level]]: gpresult بيقرا اللي اتسجّل وقت تطبيق السياسات، و whoami التوكن الحالي. فلـ «النافذة أدمن؟» whoami هو الصح.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** سكربت بيقرا التاريخ من أول التقرير: [[for /f "tokens=3" %%a in ('gpresult /r /scope user ^| findstr /c:"Created on"') do set "d=%%a"]] وبعدها بيقسّمه بـ [[/]] ويعمل [[set /a]] على الشهر، والحسبة بتطلع غلط. اعرف السبب بـ PowerShell.`, done: R`[[(Get-Content gp.txt | Select-String 'Created on').Line.ToCharArray() | ? { [int]$_ -gt 127 } | % { [int]$_ }]] طلّع [[8206]] ٣ مرات: حرف U+200E مخفي قبل كل رقم، فـ [[set /a]] بيقرا حاجة مش رقم. الحل تاخد التاريخ من [[%date%]] أو [[Get-Date]] بدل التقرير.` },
            { lvl: 'تحدي', t: R`**ابني:** [[policy-report.bat]] بيكتب في [[policy.txt]]: سطر [[OS Configuration]] و [[Last time]] و [[Domain Type]]، وعدد الـ GPOs المتطبّقة (السطور بين [[Applied Group Policy Objects]] والقسم اللي بعده من غير [[N/A]])، ولو النافذة أدمن يزوّد [[/scope computer]]، ولو النسخة فيها [[/h]] يعمل [[gp.html]] كمان.`, done: R`على Home من نافذة عادية: [[policy.txt]] فيه التلات سطور و «Applied GPOs: 0» و «computer scope: needs admin» و «HTML: not supported on this edition»، والسكربت خرج بـ 0 من غير ما يقع على أي خطوة.` },
          ],
          ci: [
            { os: [R`windows`], sh: R`cmd`, run: R`@echo off
gpresult /r /scope user > gp.txt 2>&1
findstr /c:"OS Configuration" gp.txt >nul && echo r-ok
gpresult /nosuch >nul 2>&1
echo bad=%errorlevel%
exit /b 0`, expect: [R`r-ok`, R`bad=1`] },
          ],
        }
      ]
    }
]);
