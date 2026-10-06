// تكملة تاب cmd: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cmd/01.js (شرح حقول الدرس في أوله)
MORE("cmd", [
    {
      t: "اليوزرز والصلاحيات",
      l: 2,
      n: R`مين على الجهاز وبصلاحيات إيه: اليوزرز والجروبات و UAC وصلاحيات الملفات والتشغيل كيوزر تاني. العرض من CMD عادي، والتغيير محتاج CMD كأدمن والخطير عليه علامة`,
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
            R`فولدر للتجربة وفولدر جواه.`,
            R`اعرض صلاحياته.`,
            R`ادّي Users تعديل على الفولدر وكل اللي جواه.`,
            R`اللي جوه ورثها: هتلاقي [[(I)]] جنبها.`,
            R`بدّل صلاحية Users بقراية وتشغيل بس ([[:r]] تستبدل بدل ما تضيف).`,
            R`احفظ صلاحيات الفولدر وكل اللي جواه في ملف.`,
            R`شيل صلاحية Users الصريحة.`,
            R`رجّع كل حاجة للموروث بس، على كل اللي جوه ومن غير سطر لكل ملف.`
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
            R`مين صاحب الملفات؟ (dir بعمود الصاحب).`,
            R`خد ملكية الفولدر وكل اللي جواه، ومتسألش (أدمن).`,
            R`ادّي يوزرك Full على كل حاجة جواه، وكمّل لو حاجة فشلت.`,
            R`دلوقتي تقدر تمسحه.`,
            R`الملكية لجروب Administrators بدل يوزرك ([[/a]]).`
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
        }
      ]
    }
]);
