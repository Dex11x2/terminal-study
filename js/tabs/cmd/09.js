// تكملة تاب cmd: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cmd/01.js (شرح حقول الدرس في أوله)
MORE("cmd", [
    {
      t: "تحكّم في الجهاز وصيانته",
      l: 2,
      n: R`إيقاف ومهام مجدولة وطاقة وتحميل وتحديث وصيانة وفلاشات ودرايفرات وخدمات ووقت. كتير منها محتاج CMD كأدمن، والخطير عليه علامة`,
      time: R`حوالي ٣ ساعات`,
      goal: [R`تجدول مهام، وتتحكم في الطاقة والإيقاف.`, R`تصلّح ملفات النظام والديسك بـ [[sfc]] و [[DISM]] و [[chkdsk]].`, R`تدير الخدمات والدرايفرات والبرامج بـ [[sc]] و [[pnputil]] و [[winget]].`, R`تقرا الريجستري وتعمله نسخة بـ [[reg]]، وتقرا Event Viewer بـ [[wevtutil]].`],
      use: { work: R`صيانة جهاز أو سيرفر ويندوز من غير ما تفتح عشر شاشات.`, prog: R`[[winget]] بيسطّب بيئة تطويرك كلها من سكربت.`, cs: R`الخدمات (services) برامج شغالة من غير يوزر — نفس فكرة systemd في لينكس.` },
      lab: R`mkdir %TEMP%\cmdlab & cd /d %TEMP%\cmdlab`,
      projects: [
        { lvl: 'صغير', t: R`مؤقّت إيقاف بعد ما التنزيل يخلص`, what: R`[[sleep-timer.bat]] بياخد دقايق، ويتأكد إنها رقم من ١ لـ ٦٠٠، وبيعمل [[shutdown /s /t]] برسالة، وبيطبع أمر الإلغاء، وفيه وضع تجربة بيطبع الأمر بس. من درس shutdown.`, done: R`من غير argument أو بحروف بيطلّع رسالة الاستخدام وكود 1، ووضع التجربة بيطبع [[shutdown /s /t 3600 /c "..."]] لـ ٦٠ دقيقة، و [[shutdown /a]] بعد التشغيل الحقيقي بيلغيه، والتانية بتطبع [[(1116)]] وانت فاهمها.` },
        { lvl: 'صغير', t: R`تحميل بيتأكد من نفسه`, what: R`[[get-tool.bat]] بينزّل ملف بـ [[curl -fsSL -C -]] وملف البصمة بتاعه، ويقارنهم بـ [[certutil -hashfile ... SHA256]]، ويمسح الملف لو البصمة مش مطابقة. من درس curl.exe.`, done: R`ملف سليم بيطبع PASS وكود 0، ولو غيّرت حرف في البصمة المتوقعة بيطبع FAIL ويمسح الملف وكود 1، ولينك 404 بيقف بكود 22 من غير ما يحفظ صفحة الخطأ.` },
        { lvl: 'متوسط', t: R`كشف الخدمات اللي تهمك`, what: R`[[svc-report.bat]] بيقرا [[services.txt]] (اسم خدمة في كل سطر: [[Spooler]] و [[wuauserv]] و [[w32time]] وخدمات أدواتك زي Docker أو قاعدة البيانات)، ويطبع لكل واحدة الحالة ونوع التشغيل والحساب، ويعلّم أي خدمة [[AUTO_START]] وهي [[STOPPED]]. قراية بس. من درس sc و net start.`, done: R`الجدول فيه سطر لكل خدمة، والمش متسطّبة مكتوب جنبها [[1060]] والسكربت كمّل، والخدمة الأوتوماتيك الواقفة عليها علامة، ومفيش ولا start أو stop في الكود.` },
        { lvl: 'متوسط', t: R`نقل فولدر تقيل من C بأمان`, what: R`[[move-and-link.bat SRC DEST]]: [[robocopy /E /MOVE]] وبعدها [[mklink /J]] مكان القديم، ويرفض لو الهدف موجود، ويعدّي لو المصدر أصلًا junction، ويكتب لوج. جرّبه على فولدر تجربة الأول (كاش npm أو فولدر Downloads قديم). من دروس mklink و robocopy.`, done: R`بعد التشغيل الملفات ظاهرة من المسار القديم و [[dir /al]] فيه [[<JUNCTION>]]، والتشغيلة التانية بتطبع «already a junction» وكود 0، والهدف الموجود بيطبع رسالة وكود 1، واللوج فيه سطر لكل نقل.` },
        { lvl: 'كبير', t: R`تقرير صحة الجهاز (قراية بس)`, what: R`[[health.bat]] بيعمل فولدر باسم فيه التاريخ، وجواه: [[powercfg /batteryreport]] و [[powercfg /a]]، و [[w32tm /query /status]] و stripchart، و [[driverquery /v /fo csv]] و [[pnputil /enum-devices /problem]]، و [[sc query]] للخدمات المهمة، و [[schtasks /query /fo csv]]، وآخر الأخطاء من [[wevtutil qe System]]، ولو النافذة أدمن ([[net session]]) يزوّد [[chkdsk C: /scan]] و [[DISM /CheckHealth]]. كل خطوة بكودها في [[health.log]]. من كل دروس الوحدة.`, done: R`من نافذة عادية بيخلص وكل خطوة أدمن مكتوب جنبها «skipped: not admin» مش error، ومن نافذة أدمن بيعمل كل الخطوات. لو خطوة فشلت (مثلًا مفيش نت للـ stripchart) بتتكتب بكودها والباقي بيكمّل، وتشغيله مرتين بيعمل فولدرين ومبيكتبش فوق الأول، ومفيش ولا أمر بيغيّر حاجة في الجهاز.`, ext: R`زوّد ملخص في أول التقرير (صحة البطارية بالنسبة، وفرق الساعة، وعدد الأجهزة اللي فيها مشكلة)، واعمله مهمة أسبوعية بـ [[schtasks]] في Sandbox الأول، وقارن تقرير الأسبوع ده باللي قبله بـ [[fc]].` },
        { lvl: 'كبير', t: R`سكربت تجهيز جهاز جديد بيتشغّل تاني من غير مشاكل`, what: R`[[setup.bat]] بيقرا [[apps.txt]] (Id لكل سطر)، ولكل برنامج: [[winget list --id ... -e]] الأول، ولو مش موجود [[winget install --id ... -e --silent --accept-package-agreements]]، ولو موجود [[winget upgrade]]، ويكمّل لو واحد فشل، ويكتب الكود في لوج. ومعاه [[apps.json]] من [[winget export]] كنسخة احتياطي. من درس winget upgrade. جرّبه في Windows Sandbox، مش على جهازك.`, done: R`في الـ Sandbox: أول تشغيلة بتسطّب الكل، والتانية بتطبع «already installed» أو بتحدّث بس من غير ما تعيد التسطيب، و Id غلط ([[Lab.NoSuchApp]]) بيتكتب في اللوج بكوده ([[-1978335212]] لـ «مش لاقيه») والباقي بيكمّل، وآخر سطر فيه عدد اللي نجح واللي فشل.`, ext: R`زوّد إعدادات بعد التسطيب (git config، خطة الطاقة بـ [[powercfg /setactive]]، و junction لفولدر الكاش على درايف تاني)، وخلّيه يعمل نقطة رجوع بـ [[reg export]] لأي مفتاح هيغيّره.` },
        { lvl: 'فكرة', t: R`عدّة الصيانة بتاعتك`, what: R`فكّر في أكتر ٣ مشاكل بتحصل على أجهزة اللي حواليك (بطء، ساعة غلط، طابعة معلّقة، درايفر ناقص بعد فرمتة، ديسك بيتملى) وحوّل كل واحدة لسكربت: تشخيص قراية الأول، والتصليح بعد سؤال، وكله بلوج. انت اللي بتختار المشاكل والأوامر.`, done: R`كل سكربت بيطبع التشخيص قبل أي تغيير ويسأل بـ [[choice]] قبل أي أمر خطير، وبيرفض يكمّل التصليح من غير أدمن برسالة واضحة، وفيه README بيقول كل سكربت بيعمل إيه وإزاي ترجّع اللي عمله.`, ext: R`اجمعهم في قايمة واحدة ([[menu.bat]]) بأرقام، وخلّي كل تصليح يحفظ الحالة قبله (مثلًا [[sc qc]] أو [[reg export]]) عشان يقدر يرجّعها.` },
      ],
      items: [
        {
          cmd: "shutdown",
          title: "اقفل الجهاز أو اعمل restart بميعاد",
          desc: R`[[shutdown]] بيقفل الجهاز أو يعمل restart أو sign out، فورًا أو بعد عدد ثواني. أشهر استخدام: «اقفل الجهاز بعد ساعة» وانت سايب حاجة بتنزل، و [[shutdown /a]] بيلغي لو غيّرت رأيك.

العملية (واحدة بس في الأمر):
[[/s]] اقفل الجهاز (shutdown).
[[/r]] اقفل وافتح تاني (restart).
[[/l]] اعمل sign out لليوزر الحالي على طول، ومن غير أي إضافة تانية.
[[/h]] hibernate: الجهاز يحفظ كل اللي مفتوح على الديسك ويقفل، ولما يفتح يرجع زي ما كان. لازم يكون متاح على جهازك ([[powercfg /a]] في درس powercfg).
[[/a]] الغي shutdown أو restart متجدول (abort)، وينفع بس قبل ما الوقت يخلص.
[[/sg]] اقفل، ولما الجهاز يفتح يدخل لوحده ويفتح البرامج المسجّلة إنها ترجع (لو Automatic Restart Sign-On مفعّل)، و [[/g]] نفس الحكاية بس restart.

الإضافات:
[[/t 3600]] استنى 3600 ثانية (ساعة) قبل التنفيذ. من 0 لـ 315360000 (عشر سنين)، ولو مكتبتهاش الافتراضي 30 ثانية.
[[/f]] اقفل البرامج المفتوحة غصب من غير ما تسأل، يعني أي شغل مش محفوظ بيضيع. ومهم: أي [[/t]] أكبر من صفر معناها [[/f]] لوحدها، حتى لو مكتبتهاش.
[[/c "رسالة"]] سبب بيظهر في الإشعار ويتسجل، لحد 512 حرف.
[[/fw]] مع [[/r]]: الـ restart يدخل على شاشة إعدادات الـ UEFI (اللي بيسموها BIOS) على طول، من غير ما تلحق تدوس F2 أو Del. محتاج CMD كأدمن وجهاز UEFI.
[[/o]] مع [[/r]]: يفتح قايمة Advanced startup (فيها Safe Mode و System Restore).

[[shutdown /s]] من CMD بيعمل shutdown كامل، مش زي زرار Shut down في Start اللي بيستخدم Fast Startup (بيحفظ جزء من ويندوز على الديسك عشان الفتح يبقى أسرع). عشان كده [[shutdown /s /t 0]] مفيد لما درايفر أو جهاز معلّق ومحتاج «قفلة بجد»، و [[/s /hybrid]] بيعمل زي Start. والأمر واحد في Home و Pro، وفي Windows Terminal زي النافذة القديمة، والتنبيهات بتظهر كإشعارات ويندوز.`,
          example: R`shutdown /s /t 3600
shutdown /a
shutdown /r /t 60 /c "Restarting to finish updates, save your work"
shutdown /s /t 0
shutdown /h
shutdown /r /fw /t 0`,
          try: R`احفظ شغلك الأول. جدول shutdown بعد 10 دقايق برسالة بتاعتك ([[/t 600]] و [[/c]])، وشوف الإشعار، وبعدين الغيه بـ [[shutdown /a]]. وجرّب [[shutdown /a]] تاني وشوف الـ error.`,
          flag: "danger",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** مفيش أي shutdown متجدول، وكتبت [[shutdown /a]] وبعدها [[echo %errorlevel%]]. هيطبع إيه في السطرين؟ وبعدين شغّلهم (آمن: مفيش حاجة هتتلغي).`, done: R`السطر الأول [[Unable to abort the system shutdown because no shutdown was in progress.(1116)]] والتاني [[1116]]: الرقم اللي بين القوسين في آخر الرسالة هو نفسه الـ errorlevel، و [[net helpmsg 1116]] بيطبع نفس الجملة. فسكربت يقدر يفرّق بين «اتلغى» (0) و «مكانش فيه حاجة» (1116).` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** من [[shutdown /? > sh.txt]] و [[findstr]] عليه، لاقي: السويتش اللي بيفتح نافذة الإيقاف الرسومية، وأكبر قيمة لـ [[/t]]، وشكل [[/d]] اللي بيسجّل سبب الإيقاف.`, done: R`[[/i]] جنبه [[Display the graphical user interface (GUI).]]، و [[The valid range is 0-315360000 (10 years), with a default of 30.]]، و [[/d [p|u:]xx:yy  Provide the reason for the restart or shutdown.]]. والملف كله ٨٤ سطر ([[find /c /v "" sh.txt]]).` },
            { lvl: 'تطبيق', t: R`**ابني:** [[sleep-timer.bat]] بياخد عدد دقايق في [[%1]]، ويرفض الفاضي والحروف وأي حاجة برا ١–٦٠٠، ويحسب الثواني بـ [[set /a]]، ويطبع أمر الإلغاء. خلّيه «تجربة» افتراضيًا: [[set "RUN=echo"]] قدام [[shutdown]]، ومش بينفّذ بجد غير لو [[%2]] = [[go]].`, done: R`من غير arguments: [[usage: sleep-timer.bat MINUTES [go] ]] و errorlevel 1. و [[abc]] و [[700]]: [[minutes must be 1..600]] و 1 ([[set /a sec=abc*60]] بيطلّع 0 لأن [[abc]] متغير فاضي). و [[60]]: طبع [[shutdown /s /t 3600 /c "Sleep timer: 60 min"]] و [[cancel with: shutdown /a]] من غير ما يجدول حاجة. ([[go]] نفسها جرّبها وانت مستعد تلغي بـ [[/a]].)` },
            { lvl: 'تحدي', t: R`**اشرحها:** زميلك بيقول «[[shutdown /s /t 0]] هو نفس زرار Shut down». اكتبله ٣ سطور: الفرق في Fast Startup، وإمتى ده يفرق مع درايفر معلّق، وليه [[/t 60]] لوحدها خطر على شغله المفتوح.`, done: R`السطور فيها: الزرار بيعمل hybrid (زي [[/s /hybrid]]) وبيحفظ kernel ويندوز على الديسك، و [[/s]] من CMD قفلة كاملة فالدرايفر بيتحمّل من الأول، وأي [[/t]] أكبر من صفر بتفعّل [[/f]] لوحدها فالبرامج بتتقفل من غير ما تسأل (من [[shutdown /?]]).` },
          ],
          deep: {
            why: R`سايب ملف كبير بينزل أو build طويل أو رندر فيديو، ومش عايز الجهاز يفضل شغال طول الليل. أو محتاج restart نضيف بعد تسطيب درايفر، أو تدخل الـ UEFI تغيّر حاجة ومش لاحق تدوس الزرار وقت الـ boot (أجهزة كتير بتفتح بسرعة جدًا). shutdown بيعمل كل ده من سطر واحد، وتقدر تحطه في سكربت أو مهمة مجدولة (الدرس اللي بعده).`,
            how: R`[[shutdown]] بيطلب من ويندوز يبدأ عملية الإيقاف، فويندوز بيبعت لكل برنامج «اقفل نفسك». من غير [[/f]] البرنامج اللي فيه شغل مش محفوظ ممكن يرد «استنى»، فتطلع شاشة «This app is preventing shutdown». مع [[/f]] (أو أي [[/t]] أكبر من صفر) ويندوز مش بيستنى. عشان كده [[/t 3600]] أخطر مما شكله: بعد ساعة الملف المفتوح في Word هيتقفل من غير حفظ.

الإيقاف المتجدول واحد بس في نفس الوقت، و [[/a]] بيلغيه من أي نافذة أو سكربت.

Fast Startup: لما تدوس Shut down من Start، ويندوز بيعمل sign out ويحفظ الـ kernel والدرايفرات في ملف (زي hibernate صغير)، فالفتح الجاي أسرع، بس مش «قفلة نضيفة». [[/r]] (restart) دايمًا كامل، و [[/s]] من CMD كامل كمان إلا لو كتبت [[/hybrid]]. عشان كده لما مشكلة مش بتتحل بالقفل والفتح، [[shutdown /r]] أضمن.

الصلاحيات: [[/s]] و [[/r]] و [[/a]] بيشتغلوا من CMD عادي على جهازك الشخصي، و [[/fw]] محتاج أدمن. وفيه [[/m \\PC-NAME]] لجهاز تاني على الشبكة، ودي محتاجة صلاحيات على الجهاز ده.`,
            when: R`«اقفل بعد ما التحميل يخلص»، أو restart نضيف بعد درايفر أو تحديث، أو دخول UEFI لتفعيل الـ virtualization (محتاجه لـ WSL و Docker)، أو سكربت صيانة بيخلص بـ restart، أو مهمة مجدولة بتقفل الجهاز بالليل.`,
            mistakes: R`[[/t]] طويل ونسيت إنه بيقفل البرامج غصب، فشغلك اللي مش محفوظ يضيع. أو [[shutdown /s /t 0]] في سكربت بتجرّبه فالجهاز يقفل في وشك. أو [[shutdown /h]] والـ hibernate مقفول ([[powercfg /h off]]) فيطلع error. أو [[/fw]] من CMD عادي أو على جهاز Legacy BIOS. أو [[/a]] بعد ما الإيقاف بدأ فعلًا (فات الأوان).`
          },
          teach: R`## الفكرة: عملية واحدة + توقيت + إضافات

كل سطر في المثال مبني بنفس الشكل: [[shutdown]] وبعده **عملية واحدة** (اقفل، أو restart، أو الغي، أو hibernate)، وبعدها إضافات اختيارية (بعد كام ثانية، ورسالة، ورايح فين بعد الـ restart). الإضافات في ويندوز بتبدأ بـ [[/]] مش [[-]] زي لينكس.

> مشغّلتش أي سطر بيقفل الجهاز هنا عشان الجهاز ميقفلش. اللي شغّلته: [[shutdown /?]] (المساعدة، ومنها الأرقام اللي تحت) و [[shutdown /a]] من غير حاجة متجدولة، في CMD على ويندوز 11.

---

## ١. [[shutdown /s /t 3600]]

~~~cmd
shutdown /s /t 3600
~~~

| الحتة | معناها |
|---|---|
| [[shutdown]] | البرنامج نفسه، [[C:\Windows\System32\shutdown.exe]] |
| [[/s]] | العملية: shutdown، اقفل الجهاز |
| [[/t 3600]] | استنى 3600 ثانية قبل ما تنفّذ. 3600 = 60 × 60 = ساعة |

السطر ده مش بيطبع حاجة في CMD لو نجح، وويندوز بيطلّع إشعار إن الجهاز هيقفل. والمهم اللي مكتوب في [[shutdown /?]]:

~~~text من shutdown /?
/t xxx     Set the time-out period before shutdown to xxx seconds.
           The valid range is 0-315360000 (10 years), with a default of 30.
           If the timeout period is greater than 0, the /f parameter is
           implied.
~~~

يعني:
- أكبر رقم 315360000 ثانية = 10 سنين، ومن غير [[/t]] الافتراضي 30 ثانية.
- **أي [[/t]] أكبر من صفر معناها [[/f]] لوحدها**: بعد الساعة، البرامج المفتوحة هتتقفل غصب، وأي شغل مش محفوظ بيضيع.

---

## ٢. [[shutdown /a]]

~~~cmd
shutdown /a
~~~

[[/a]] من abort: الغي. بيلغي الإيقاف المتجدول من أي نافذة، بس لازم قبل ما الوقت يخلص. لو مفيش حاجة متجدولة (جرّبته كده):

~~~text الناتج
Unable to abort the system shutdown because no shutdown was in progress.(1116)
~~~

والرقم [[1116]] هو كود الخطأ، وبيرجع كمان في [[%errorlevel%]] (طلع عندي [[1116]])، فتقدر تشيّك عليه في سكربت.

---

## ٣. [[shutdown /r /t 60 /c "..."]]

~~~cmd
shutdown /r /t 60 /c "Restarting to finish updates, save your work"
~~~

- [[/r]] العملية: restart (اقفل وافتح تاني). والـ restart دايمًا «كامل» من غير Fast Startup.
- [[/t 60]] بعد دقيقة.
- [[/c "..."]] من comment: رسالة بتظهر في الإشعار وبتتسجل في لوج النظام، لحد 512 حرف. علامات التنصيص لازمة لأن الرسالة فيها مسافات؛ من غيرها CMD هيعتبر كل كلمة إضافة لوحدها.

---

## ٤. [[shutdown /s /t 0]]

~~~cmd
shutdown /s /t 0
~~~

[[/t 0]] يعني دلوقتي حالًا. ولأن الوقت صفر، [[/f]] **مش** متضمنة هنا: لو برنامج فيه شغل مش محفوظ، ويندوز هيطلّع شاشة «This app is preventing shutdown» ويستناك.

وليه ده مختلف عن زرار Shut down في Start؟ الزرار بيستخدم **Fast Startup**: بيحفظ الـ kernel والدرايفرات في ملف عشان الفتح الجاي يبقى أسرع. [[shutdown /s]] من CMD بيعمل قفلة كاملة إلا لو كتبت [[/hybrid]]:

~~~text من shutdown /?
/hybrid    Performs a shutdown of the computer and prepares it for fast startup.
           Must be used with /s option.
~~~

---

## ٥. [[shutdown /h]]

~~~cmd
shutdown /h
~~~

[[/h]] = hibernate: كل اللي مفتوح بيتحفظ من الـ RAM على الديسك والجهاز يقفل، ولما يفتح يرجع زي ما سبته. بيشتغل بس لو الـ hibernate متاح؛ اعرف ده من [[powercfg /a]] (الدرس اللي بعد الجاي). على الجهاز اللي جرّبت عليه [[Hibernate]] كان في لستة المتاح.

---

## ٦. [[shutdown /r /fw /t 0]]

~~~cmd
shutdown /r /fw /t 0
~~~

- [[/fw]] من firmware: الـ boot الجاي يدخل على شاشة إعدادات الـ UEFI (اللي الناس بتسميها BIOS) على طول.
- لازم مع عملية زي [[/r]]، ومحتاج CMD كأدمن، وجهاز UEFI مش Legacy BIOS.

---

## العمليات والإضافات في جدول

| | معناها | ملاحظة |
|---|---|---|
| [[/s]] | اقفل | كامل، من غير Fast Startup |
| [[/r]] | restart | دايمًا كامل |
| [[/h]] | hibernate | لو متاح |
| [[/l]] | sign out | من غير أي إضافة تانية |
| [[/a]] | الغي | قبل ما الوقت يخلص |
| [[/t N]] | بعد N ثانية | أكبر من 0 = [[/f]] |
| [[/f]] | اقفل البرامج غصب | الشغل المش محفوظ بيضيع |
| [[/c "..."]] | رسالة | لحد 512 حرف |
| [[/fw]] | ادخل UEFI | مع [[/r]]، أدمن |

---

## الخلاصة

- [[shutdown]] لوحده من غير أي حاجة بيطبع المساعدة بس، مش بيقفل.
- [[/t]] أكبر من صفر = قفل غصب للبرامج. احفظ شغلك قبل ما تجدول.
- [[shutdown /a]] هو زرار الطوارئ، ولازم قبل ما الوقت يخلص.`,
          lines: [
            R`اقفل الجهاز بعد ساعة (3600 ثانية)، و [[/f]] متضمنة لأن الوقت أكبر من صفر.`,
            R`الغي الإيقاف المتجدول، من أي نافذة، قبل ما الوقت يخلص.`,
            R`restart بعد دقيقة، والرسالة بتظهر في الإشعار.`,
            R`shutdown كامل دلوقتي (من غير Fast Startup). ومن غير [[/f]]، فبرنامج فيه شغل مش محفوظ ممكن يوقفه ويسألك.`,
            R`hibernate دلوقتي (لو متاح على جهازك).`,
            R`restart على شاشة UEFI على طول (CMD كأدمن).`
          ],
          sol: R`[[shutdown /s /t 600 /c "Test from CMD"]] مش بيطبع حاجة في CMD لو نجح، وويندوز بيطلّع إشعار إن الجهاز هيقفل وفيه رسالتك. [[shutdown /a]] برضه ساكت لو نجح، ويطلّع إشعار إن الإيقاف اتلغى. ولو نسيت تلغيه، بعد 10 دقايق البرامج هتتقفل غصب ([[/f]] متضمنة) والجهاز يقفل.

[[shutdown /a]] تاني ومفيش حاجة متجدولة: [[Unable to abort the system shutdown because no shutdown was in progress.(1116)]]. ولو جدولت مرتين ورا بعض: [[A system shutdown has already been scheduled.(1190)]]، الغي الأول وجدول من جديد. و [[shutdown]] لوحده من غير أي حاجة بيطبع المساعدة بس، مش بيقفل. (مشغّلتش shutdown هنا عشان الجهاز ميقفلش: الإضافات من [[shutdown /?]] اللي شغّلته، ونصوص الأخطاء من [[net helpmsg 1116]] و [[net helpmsg 1190]].)`
        },
        {
          cmd: "schtasks",
          title: "شغّل أمر لوحده في ميعاد",
          desc: R`[[schtasks]] هو Task Scheduler من سطر الأوامر: بيخلي ويندوز يشغّل أمر أو سكربت لوحده في ميعاد، مرة واحدة أو كل يوم أو كل أسبوع، زي [[cron]] في لينكس. وبيعرض المهام ويشغّلها ويعطّلها ويمسحها.

[[/create]] مهمة جديدة، وبعدها:
[[/tn]] اسمها (task name)، وبيه بتتعامل معاها بعد كده.
[[/tr]] الأمر اللي هيتنفذ (task run)، بين علامات تنصيص.
[[/sc]] نوع الجدول (schedule): [[once]] مرة واحدة، و [[daily]] كل يوم، و [[weekly]] كل أسبوع، و [[minute]] و [[hourly]]، و [[onlogon]] مع كل دخول.
[[/st 23:30]] الساعة بنظام 24 ساعة، و [[/sd]] التاريخ (مع once)، و [[/d MON,FRI]] الأيام (مع weekly)، و [[/mo 30]] «كل كام» (مع minute يعني كل 30 دقيقة).
[[/f]] لو فيه مهمة بنفس الاسم، اكتب فوقها من غير سؤال.

باقي العمليات بتاخد [[/tn]] بس: [[/query]] اعرض (و [[/v /fo list]] كل التفاصيل في شكل لستة، منها آخر تشغيل ونتيجته)، و [[/run]] شغّلها دلوقتي، و [[/end]] وقّفها لو شغالة، و [[/change /disable]] عطّلها من غير ما تمسحها و [[/enable]] رجّعها، و [[/delete /f]] امسحها من غير سؤال.

المهام دي بتشتغل باسمك وانت داخل على الجهاز بس (Interactive only)، ومش محتاجة أدمن. أما [[/ru SYSTEM]] (تشتغل حتى لو محدش داخل) و [[/rl HIGHEST]] (بصلاحيات أدمن) و [[/sc onlogon]] فمحتاجين CMD كأدمن، ومن غيره هتاخد [[ERROR: Access is denied.]]. ونفس المهام بتظهر في الواجهة الرسومية [[taskschd.msc]]، والأمر واحد في Home و Pro.`,
          example: R`schtasks /create /tn "NightShutdown" /tr "shutdown /s /t 60" /sc daily /st 23:30
schtasks /query /tn "NightShutdown"
schtasks /create /tn "HelloOnce" /tr "cmd /c echo hi & pause" /sc once /sd 12/31/2030 /st 18:00 /f
schtasks /run /tn "HelloOnce"
schtasks /change /tn "NightShutdown" /disable
schtasks /query /tn "NightShutdown" /v /fo list
schtasks /delete /tn "HelloOnce" /f
schtasks /delete /tn "NightShutdown" /f`,
          try: R`اعمل مهمة مرة واحدة بعد دقيقتين من دلوقتي تفتح notepad، واستناها تفتح لوحدها، وبعدين اقرا Last Result بـ [[/query /v /fo list]] وامسحها.`,
          flag: "danger",
          practice: [
            { lvl: 'سريع', t: R`**بيانات حقيقية:** عدّ المهام المجدولة على جهازك بطريقتين: [[schtasks /query /fo csv /nh > tasks.csv]] و [[find /c /v "" tasks.csv]]، و [[schtasks /query /fo list | find /c "TaskName:"]].`, done: R`الرقمين زي بعض (عندنا 284 في الاتنين): [[/nh]] شالت سطر العناوين فكل سطر في الـ CSV مهمة، و [[/fo list]] بيكتب [[TaskName:]] مرة لكل مهمة. أغلبهم مهام ويندوز نفسه تحت [[\Microsoft\Windows\]]، فمتلمسهمش.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[schtasks /query /tn "LabNoSuchTask" >nul 2>&1 && echo exists || echo missing]]. هيطبع إيه؟ وإيه اللي اتخبّى بـ [[2>nul]]؟`, done: R`طبع [[missing]]. ومن غير التوجيه الرسالة [[ERROR: The system cannot find the file specified.]] و errorlevel 1. ده الفحص اللي سكربت الإنشاء بيعمله قبل [[/create]] عشان يبقى آمن لو اتشغّل مرتين.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** مهمة ويندوز المدمجة [[\Microsoft\Windows\Defrag\ScheduledDefrag]]: اعرض [[/v /fo list]] وطلّع منها ٤ سطور بس بـ [[findstr /c:"Last Result" /c:"Run As User" /c:"Schedule Type" /c:"Logon Mode"]].`, done: R`عندنا: [[Last Result: 0]] و [[Run As User: SYSTEM]] و [[Schedule Type: On demand only]] و [[Logon Mode: Interactive/Background]]. يعني بتشتغل بحساب SYSTEM حتى لو محدش داخل، وده اللي محتاج أدمن عشان تعمله بـ [[/ru SYSTEM]].` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** نفس المهمة بالتلات أشكال: [[/fo table]] و [[/fo csv]] و [[/fo list]]، وعدّ سطور كل واحد بـ [[find /c /v ""]]. أنهي شكل تقراه بـ [[for /f]] أسهل؟`, done: R`table طلع 5 سطور (فيهم سطر [[Folder:]] وسطر فاضي وسطر شرط)، و csv سطرين بس ([["TaskName","Next Run Time","Status"]] وسطر المهمة)، و list 7. الـ CSV مع [[/nh]] هو اللي [[for /f "tokens=1,2 delims=,"]] بيقراه من غير ما تعدّي سطور.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** سكربت فيه [[schtasks /create /tn "Backup" /tr C:\Lab Tools\backup.bat /sc daily /st 02:00]]، والمسار فيه مسافة. اقرا [[schtasks /create /?]] (قراية بس) واعرف الأمر هيتقسم إزاي، واكتبه صح. والتجربة الفعلية في Windows Sandbox أو VM مش على جهازك.`, done: R`من غير تنصيص [[/tr]] بياخد [[C:\Lab]] بس و [[Tools\backup.bat]] بتبقى argument زيادة فالأمر بيترفض. الصح [[/tr "\"C:\Lab Tools\backup.bat\""]]: التنصيص الخارجي لـ CMD، و [[\"]] جواه بيوصل علامة التنصيص للمهمة نفسها (ده من أمثلة [[schtasks /create /?]] ووثائق Microsoft، ومتجرّبش هنا لأن الإنشاء بيغيّر الجهاز).` },
            { lvl: 'تحدي', t: R`**ابني:** [[ensure-task.bat]]: لو [[LabNightly]] موجودة يطبع «already there» ويخرج بـ 0، ولو مش موجودة يعملها بـ [[/create ... /f]] ويطبع رسالة النجاح. جرّب جزء الفحص على جهازك، والإنشاء في Sandbox.`, done: R`على جهازك من غير إنشاء: طبع [[LabNightly missing: would create]] (الفحص بـ [[schtasks /query /tn]] و [[if errorlevel 1]]). وفي الـ Sandbox: أول مرة [[SUCCESS: The scheduled task "LabNightly" has successfully been created.]]، والتانية «already there» ومفيش سؤال Y/N ولا مهمة متكررة.` },
          ],
          deep: {
            why: R`حاجات المفروض تتعمل كل يوم وانت مش فاكرها: باك أب بالليل (درس backup-date.bat)، أو تنضيف TEMP كل أسبوع (درس clean-temp.bat)، أو قفل الجهاز لو نسيته شغال. schtasks بيعمل ده من غير برنامج زيادة، وبأمر تقدر تحطه في سكربت setup أو تبعته لحد.`,
            how: R`المهمة بتتسجل في Task Scheduler (افتحه بـ [[taskschd.msc]] وهتلاقيها في Task Scheduler Library). [[/tr]] بيتنفذ زي ما تكتبه في Win+R، والفولدر الحالي بتاعه غالبًا [[C:\Windows\System32]] مش فولدر السكربت، عشان كده أي سكربت bat هيتشغّل من مهمة لازم يبدأ بـ [[cd /d "%~dp0"]] (درس %~dp0 و %~nx1).

المسارات اللي فيها مسافات: [[/tr]] نفسه بين علامات تنصيص، فالمسار جواه بيتكتب بـ [[\"]]: [[/tr "\"C:\My Scripts\backup.bat\""]]. الأسهل تحط سكربتاتك في مسار من غير مسافات زي [[C:\scripts]].

[[/sd]] بيتكتب بصيغة التاريخ في إعدادات ويندوز: [[12/31/2030]] على جهاز إعداداته أمريكاني، و [[31/12/2030]] على إعدادات تانية كتير. جهازك بيستخدم أنهي؟ [[echo %date%]]. ولو [[/sc once]] من غير [[/sd]] بياخد النهارده.

شروط مخفية بتفاجئ الناس: المهام اللي بيعملها schtasks افتراضيًا مش بتبدأ والجهاز على البطارية، وبتقف لو الشاحن اتشال (جرّبت وطلع [[Power Management: Stop On Battery Mode, No Start On Batteries]]). وكمان لو الجهاز كان مقفول أو نايم في الميعاد، المهمة مش بتشتغل لما يفتح. الاتنين بيتغيّروا من [[taskschd.msc]]: Properties ثم Conditions (الكهربا) و Settings (Run task as soon as possible after a scheduled start is missed)، أو من PowerShell (درس «Register-ScheduledTask» في تاب «PowerShell»).

Last Result: [[0]] نجح، و [[267011]] لسه مشتغلتش ولا مرة، و [[267009]] شغالة دلوقتي، وأي رقم تاني هو exit code بتاع الأمر (زي [[1]] لو السكربت خرج بـ [[exit /b 1]]).`,
            when: R`باك أب يومي، أو تنضيف أسبوعي، أو قفل الجهاز بالليل، أو سكربت يشغّل أدوات التطوير بعد الدخول، أو تذكير. ولو المهمة لازم تشتغل وانت مش داخل (جهاز شغال كسيرفر في البيت مثلًا) [[/ru SYSTEM]] من CMD أدمن.`,
            mistakes: R`تجرّب المثال وتنسى تمسح NightShutdown، فالجهاز يقفل الساعة 11:30 كل يوم (لو حصل: [[shutdown /a]] خلال الدقيقة، وبعدين [[schtasks /delete /tn "NightShutdown" /f]]). أو [[/sd]] بصيغة غير صيغة جهازك. أو سكربت فيه [[pause]] أو [[set /p]] فالمهمة تفضل مستنية للأبد (درس clean-temp.bat). أو مسار نسبي في [[/tr]]، أو سكربت من غير [[cd /d "%~dp0"]]. أو مهمة على لابتوب مش بتشتغل ومش عارف ليه: شرط البطارية. أو [[/ru SYSTEM]] من CMD عادي.`
          },
          teach: R`## الفكرة: كل أوامر schtasks شكلها واحد

[[schtasks]] وبعده **عملية** ([[/create]] أو [[/query]] أو [[/run]] أو [[/change]] أو [[/delete]])، وبعدها [[/tn "الاسم"]] عشان تقوله أنهي مهمة. [[/create]] بس هو اللي محتاج إضافات زيادة (تشغّل إيه وإمتى). جرّبت من CMD عادي على ويندوز 11، بمهمة بتعمل [[echo]] بدل shutdown عشان الجهاز ميقفلش.

---

## ١. اعمل مهمة يومية

~~~cmd
schtasks /create /tn "NightShutdown" /tr "shutdown /s /t 60" /sc daily /st 23:30
~~~

نفكّها حتة حتة:

| الحتة | اختصار إيه | معناها هنا |
|---|---|---|
| [[/create]] | | مهمة جديدة |
| [[/tn "NightShutdown"]] | task name | اسمها، وبيه هتكلمها بعد كده |
| [[/tr "shutdown /s /t 60"]] | task run | الأمر اللي هيتنفذ، كله بين علامات تنصيص لأن فيه مسافات |
| [[/sc daily]] | schedule | كل يوم |
| [[/st 23:30]] | start time | الساعة 11:30 بالليل، بنظام 24 ساعة |

والأمر جواها [[shutdown /s /t 60]] (الدرس اللي فات): اقفل بعد دقيقة، فعندك دقيقة تلغي فيها بـ [[shutdown /a]].

~~~text الناتج
SUCCESS: The scheduled task "NightShutdown" has successfully been created.
~~~

و [[%errorlevel%]] بعدها [[0]].

---

## ٢. اعرضها

~~~cmd
schtasks /query /tn "NightShutdown"
~~~

~~~text الناتج
Folder: \
TaskName                                 Next Run Time          Status
======================================== ====================== ===============
NightShutdown                            10/6/2026 11:30:00 PM  Ready
~~~

| العمود | معناه |
|---|---|
| [[Folder: \]] | المهمة في الفولدر الرئيسي بتاع Task Scheduler |
| [[Next Run Time]] | هتشتغل إمتى المرة الجاية (بصيغة تاريخ جهازك) |
| [[Status]] | [[Ready]] جاهزة، و [[Running]] شغالة دلوقتي، و [[Disabled]] متعطلة |

---

## ٣. مهمة مرة واحدة في تاريخ معين

~~~cmd
schtasks /create /tn "HelloOnce" /tr "cmd /c echo hi & pause" /sc once /sd 12/31/2030 /st 18:00 /f
~~~

- [[/sc once]] مرة واحدة بس.
- [[/sd 12/31/2030]] start date. **بصيغة تاريخ جهازك**: جهازي إعداداته أمريكاني ([[echo %date%]] طبع [[Tue 10/06/2026]]، يعني شهر/يوم/سنة)، فالتاريخ بيتكتب [[12/31/2030]].
- [[/tr "cmd /c echo hi & pause"]]: [[cmd /c]] افتح CMD نفّذ الأمر واقفل، و [[&]] نفّذ اللي بعدها كمان (درس && و || و &)، و [[pause]] استنى زرار عشان تلحق تشوف hi.
- [[/f]] من force: لو فيه مهمة بنفس الاسم اكتب فوقها.

ليه [[/f]] مهمة؟ جرّبت أعمل نفس المهمة تاني من غيرها، فوقف يسأل:

~~~text الناتج
WARNING: The task name "HelloOnce" already exists. Do you want to replace it (Y/N)?
~~~

وده في سكربت معناه إنه هيفضل مستني للأبد.

---

## ٤. شغّلها دلوقتي

~~~cmd
schtasks /run /tn "HelloOnce"
~~~

[[/run]] بيشغّل المهمة حالًا من غير ما يستنى ميعادها، وده أحسن طريقة تتأكد إن [[/tr]] مكتوب صح. هتفتح نافذة فيها [[hi]].

---

## ٥. عطّلها من غير ما تمسحها

~~~cmd
schtasks /change /tn "NightShutdown" /disable
~~~

[[/change]] بيعدّل مهمة موجودة، و [[/disable]] بيوقفها (و [[/enable]] بيرجّعها). بعدها [[/query]] بيبقى فيه [[Disabled]] تحت Status، و [[/run]] عليها بيطلّع [[ERROR: The scheduled task "..." could not run because it is disabled.]] (من التجربة اللي في الحل).

---

## ٦. كل التفاصيل

~~~cmd
schtasks /query /tn "NightShutdown" /v /fo list
~~~

- [[/v]] من verbose: كل الخانات مش التلاتة بس.
- [[/fo list]] من format: كل خانة في سطر لوحدها بدل جدول عريض جدًا.

أهم السطور (من التجربة اللي في الحل):

~~~text سطور من الناتج
Last Run Time:     10/2/2026 2:32:00 PM
Last Result:       0
Logon Mode:        Interactive only
Power Management:  Stop On Battery Mode, No Start On Batteries
~~~

| السطر | معناه |
|---|---|
| [[Last Result]] | [[0]] نجحت، و [[267011]] لسه مشتغلتش، وأي رقم تاني exit code الأمر |
| [[Logon Mode]] | [[Interactive only]]: بتشتغل بس وانت داخل على الجهاز |
| [[Power Management]] | مش بتبدأ على البطارية، وبتقف لو الشاحن اتشال |

---

## ٧ و ٨. امسحهم

~~~cmd
schtasks /delete /tn "HelloOnce" /f
schtasks /delete /tn "NightShutdown" /f
~~~

[[/delete]] امسح، و [[/f]] هنا معناها متسألنيش «Are you sure». **متنساش السطر الأخير**، وإلا الجهاز هيقفل الساعة 11:30 كل يوم.

~~~text الناتج
SUCCESS: The scheduled task "HelloOnce" was successfully deleted.
~~~

---

## الخلاصة

| العملية | الشكل |
|---|---|
| اعمل | [[/create /tn الاسم /tr "الأمر" /sc النوع /st الساعة]] |
| اعرض | [[/query /tn الاسم]] (و [[/v /fo list]] للتفاصيل) |
| شغّل دلوقتي | [[/run /tn الاسم]] |
| عطّل / رجّع | [[/change /tn الاسم /disable]] أو [[/enable]] |
| امسح | [[/delete /tn الاسم /f]] |

و [[/f]] في [[/create]] = اكتب فوق الموجود، وفي [[/delete]] = متسألش. الاتنين بيمنعوا السكربت إنه يقف يستنى إجابة.`,
          lines: [
            "بيعمل مهمة مجدولة: [[/tn]] اسمها، و [[/tr]] الأمر اللي هيشتغل (بين تنصيص لأنه فيه مسافات)، و [[/sc daily]] كل يوم، و [[/st 23:30]] الساعة ١١:٣٠ بالليل بنظام ٢٤ ساعة. الأمر نفسه [[shutdown /s /t 60]] بيقفل الجهاز بعد إنذار دقيقة، فتلحق تلغيه بـ [[shutdown /a]].",
            "بيعرض المهمة دي بس: اسمها و [[Next Run Time]] الميعاد الجاي و [[Status]] (Ready يعني مستنية ميعادها). ده أسرع طريقة تتأكد إن المهمة اتعملت صح من غير ما تفتح Task Scheduler.",
            "مهمة تشتغل مرة واحدة ([[/sc once]]) في يوم معين: [[/sd]] التاريخ، وشكله لازم يبقى زي إعدادات تاريخ جهازك (هنا شهر/يوم/سنة)، وإلا هتترفض. [[cmd /c echo hi & pause]] بيفتح نافذة تطبع [[hi]] وتستنى. و [[/f]] بيكتب فوق مهمة بنفس الاسم من غير ما يسأل.",
            "بيشغّل المهمة دلوقتي حالًا من غير ما يستنى ميعادها، وميعادها الأصلي بيفضل زي ما هو. مفيد تجرّب إن الأمر بيشتغل صح قبل ما تستنى لحد ٢٠٣٠.",
            "بيعطّل المهمة من غير ما يمسحها: [[Status]] يبقى [[Disabled]] ومش هتشتغل في ميعادها، وترجّعها بـ [[/enable]]. أحسن من المسح لو عايز توقفها مؤقتًا.",
            "[[/v]] (verbose) بيطبع كل التفاصيل، و [[/fo list]] بيعرضها كل خاصية في سطر بدل جدول عريض مش مقري. هنا تلاقي [[Last Run Time]] و [[Last Result]] (صفر يعني نجحت)، وشروط زي «متشتغلش على البطارية» اللي ساعات بتمنع المهمة من غير ما تعرف.",
            "بيمسح المهمة اللي اتعملت للتجربة. [[/f]] بيمسح من غير ما يسأل [[Are you sure]]، ومن غيره السكربت هيقف مستني إجابة.",
            "بيمسح مهمة الـ shutdown كمان بنفس الطريقة، عشان متفضلش تقفل جهازك كل يوم الساعة ١١:٣٠ بعد ما خلصت التجربة."
          ],
          sol: R`لو الساعة دلوقتي 14:30: [[schtasks /create /tn "OpenNotepad" /tr "notepad" /sc once /st 14:32]] (من غير [[/sd]] بياخد تاريخ النهارده) بيطبع [[SUCCESS: The scheduled task "OpenNotepad" has successfully been created.]]. في الميعاد notepad بيفتح لوحده. و [[schtasks /query /tn "OpenNotepad" /v /fo list]] فيه سطور زي [[Last Run Time: 10/2/2026 2:32:00 PM]] و [[Last Result: 0]] (صفر يعني نجح) و [[Logon Mode: Interactive only]] و [[Power Management: Stop On Battery Mode, No Start On Batteries]]. وقبل أول تشغيل Last Result بيبقى [[267011]]. و [[schtasks /delete /tn "OpenNotepad" /f]] بيطبع [[SUCCESS: The scheduled task "OpenNotepad" was successfully deleted.]].

جرّبت ده على ويندوز 11 بمهمة [[cmd /c echo hi]] واتمسحت بعدها: الـ create والـ query والـ run والـ delete طلّعوا الرسايل دي، و [[/run]] على مهمة متعطّلة طلّع [[ERROR: The scheduled task "..." could not run because it is disabled.]]، و [[/query]] على اسم مش موجود [[ERROR: The system cannot find the file specified.]]، وتاريخ [[31/12/2026]] على جهاز إعداداته أمريكاني طلّع [[ERROR: Incorrect Start Date.]]، و [[/ru SYSTEM]] و [[/sc onlogon]] من CMD عادي طلّعوا [[ERROR: Access is denied.]].`
        },
        {
          cmd: "powercfg",
          title: "صحة البطارية والنوم والطاقة",
          desc: R`[[powercfg]] أداة ويندوز لكل حاجة ليها علاقة بالطاقة: تقرير عن صحة البطارية، وأنواع النوم اللي جهازك بيدعمها، ومين مانع الجهاز ينام، ومواعيد قفل الشاشة والنوم.

[[/a]] (اختصار [[/availablesleepstates]]) أنواع النوم المتاحة على جهازك، واللي مش متاحة وليه.
[[/batteryreport]] تقرير HTML عن البطارية، و [[/output "مسار"]] مكان حفظه (من غيرها بيتحفظ [[battery-report.html]] في الفولدر اللي انت فيه). أهم أرقام فيه: [[DESIGN CAPACITY]] سعة البطارية وهي جديدة، و [[FULL CHARGE CAPACITY]] سعتها دلوقتي، و [[CYCLE COUNT]] عدد دورات الشحن.
[[/requests]] البرامج والدرايفرات اللي طالبة دلوقتي إن الشاشة متقفلش أو الجهاز مينامش (محتاج CMD كأدمن).
[[/energy]] بيراقب الجهاز 60 ثانية ويطلّع تقرير بمشاكل استهلاك الطاقة (أدمن، وسيب الجهاز في حاله وهو شغال)، و [[/duration 120]] بتغيّر المدة.
[[/change monitor-timeout-ac 10]] الشاشة تقفل بعد 10 دقايق والجهاز على الشاحن. [[ac]] الشاحن و [[dc]] البطارية، و [[monitor]] الشاشة و [[standby]] النوم و [[hibernate]] الـ hibernate، والقيمة بالدقايق، و [[0]] معناها «أبدًا».

التقرير بتفتحه بـ [[start "" "المسار"]] (درس start). ده كله في ويندوز 10 و 11 بكل نسخها، والفرق بين الأجهزة نفسها: اللابتوب الحديث غالبًا عنده Modern Standby ([[S0 Low Power Idle]]) بدل النوم القديم ([[S3]])، وده بيخلي الجهاز يفضل متصل بالنت وهو نايم، وده سبب إن لابتوبات بتسخن أو بطاريتها بتخلص في الشنطة.`,
          example: R`powercfg /a
powercfg /batteryreport /output "%USERPROFILE%\battery.html"
start "" "%USERPROFILE%\battery.html"
powercfg /requests
powercfg /energy /output "%USERPROFILE%\energy.html"
powercfg /change monitor-timeout-ac 10
powercfg /change standby-timeout-ac 0`,
          try: R`اعمل تقرير البطارية وافتحه، واحسب صحة البطارية: FULL CHARGE CAPACITY على DESIGN CAPACITY. وشوف [[powercfg /a]] عندك فيه S3 ولا S0.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** من CMD عادي (مش أدمن) [[powercfg /requests]] وبعدها [[echo %errorlevel%]].`, done: R`[[This command requires administrator privileges and must be executed from an elevated command prompt.]] و errorlevel 1. أما [[powercfg /a]] و [[/list]] و [[/batteryreport]] فاشتغلوا من نفس النافذة بـ 0: القراية مسموحة، والكشف على البرامج اللي مانعة النوم لأ.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** طلّع الـ GUID واسم خطة الطاقة الشغالة في متغيرين من [[powercfg /getactivescheme]] بـ [[for /f]]: [[tokens=4]] للـ GUID، و [[tokens=2 delims=()]] للاسم.`, done: R`طبع [[guid=27fa6203-3987-4dcc-918d-748559d549ec]] و [[name=Performance]] على جهاز التجربة (عندك ممكن [[381b4222-f694-41f0-9685-ff5bb260df2e]] و Balanced). الـ GUIDs دي ثابتة لخطط ويندوز المعروفة، فتنفع في سكربت.` },
            { lvl: 'تحدي', t: R`**مسألة:** التقرير بيكتب السعة بفاصلة: [[41,200 mWh]] و [[50,000 mWh]]. احسب صحة البطارية بـ [[set /a h=41,200*100/50000]] وشوف الناتج، وبعدين صلّحه.`, done: R`طلع [[h=41]]، مش 82: الفاصلة في [[set /a]] بتفصل بين تعبيرين، فـ [[h]] خدت 41 والباقي اتحسب واترمى من غير error. الإصلاح تشيل الفاصلة الأول: [[set "fc=%fc:,=%"]] وبعدين [[set /a h=%fc%*100/50000]] طلّع [[82]].` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** في [[powercfg /a]] على جهازك: أنهي حالات نوم متاحة، و Microsoft بتقول إيه عن S3 لما S0 متاح؟`, done: R`على لابتوب التجربة: المتاح [[Standby (S0 Low Power Idle) Network Connected]] و [[Hibernate]] و [[Fast Startup]]، و S3 مش متاح وتحته [[This standby state is disabled when S0 low power idle is supported.]]. يعني الجهاز بيعمل Modern Standby وبيفضل على النت وهو نايم.` },
          ],
          deep: {
            why: R`«البطارية بقت بتخلص بسرعة» أو «اللابتوب صحي لوحده بالليل» أو «الشاشة مش بتقفل لوحدها». الحاجات دي ليها أسباب بتتقاس، و powercfg بيوريك الأرقام بدل التخمين، ومن غير أي برنامج.`,
            how: R`[[/batteryreport]] بيقرا السجل اللي ويندوز بيحفظه عن البطارية: السعة الأصلية والحالية، والاستخدام آخر أيام، والسعة على مدار الأسابيع، وتقدير مدة البطارية. التقرير ملف HTML عادي، فاحفظه بـ [[/output]] في مكان تعرفه؛ من CMD كأدمن الفولدر الحالي بيبقى [[C:\Windows\System32]]، فالملف بيتحفظ هناك ومش هتلاقيه.

[[/requests]] بيطبع أقسام: [[DISPLAY]] (حاجة مانعة الشاشة تقفل، زي فيديو شغال في المتصفح)، و [[SYSTEM]] (حاجة مانعة الجهاز ينام، زي تحميل أو صوت شغال)، و [[AWAYMODE]] و [[EXECUTION]] وغيرهم، وتحت كل قسم اسم البرنامج أو الدرايفر أو [[None.]]. و [[/lastwake]] بيقولك إيه اللي صحّى الجهاز آخر مرة، و [[/waketimers]] المواعيد اللي هتصحّيه.

[[/energy]] بيسجّل اللي بيحصل لمدة دقيقة ويحلله، وفي الآخر بيقول عدد Errors و Warnings ومكان التقرير. عدد Errors كبير عادي يكون من حاجات مش مهمة، فاقرا التفاصيل قبل ما تقلق.

[[/change]] بيعدّل خطة الطاقة الشغالة دلوقتي بس (Balanced مثلًا)، و [[/list]] بيعرض الخطط و [[/getactivescheme]] الشغالة. و [[powercfg /h off]] (أدمن) بيقفل الـ hibernate ويمسح ملف [[hiberfil.sys]] اللي حجمه جيجات على C، بس بيقفل Fast Startup معاه.`,
            when: R`قبل ما تشتري لابتوب مستعمل (اطلب تقرير البطارية)، أو لما البطارية تقل فجأة، أو الجهاز مش بينام أو بيصحى لوحده، أو سكربت setup بيظبط الشاشة والنوم على أي جهاز جديد.`,
            mistakes: R`تشغّل [[/batteryreport]] من غير [[/output]] من CMD أدمن، فتدوّر على الملف وهو في System32. أو تحكم على البطارية من رقم Design لوحده من غير ما تقارنه بـ Full Charge. أو [[/energy]] وانت شغال على الجهاز، فالتقرير يتملي حاجات انت السبب فيها. أو [[standby-timeout-dc 0]] على لابتوب فالبطارية تخلص في الشنطة. أو [[/requests]] من CMD عادي.`
          },
          teach: R`## الفكرة: أداة واحدة، وكل إضافة سؤال مختلف

[[powercfg]] لوحده مبيعملش حاجة مفيدة؛ الإضافة اللي بعده هي اللي بتحدد السؤال: أنواع النوم؟ صحة البطارية؟ مين مانع النوم؟ أو «غيّر ميعاد قفل الشاشة». جرّبت السطور اللي بتقرا بس من CMD عادي على لابتوب بويندوز 11، والسطور اللي بتغيّر إعدادات مشغّلتهاش.

---

## ١. أنواع النوم: [[powercfg /a]]

~~~cmd
powercfg /a
~~~

[[/a]] اختصار [[/availablesleepstates]]. الناتج على اللابتوب ده (مختصر):

~~~text الناتج
The following sleep states are available on this system:
    Standby (S0 Low Power Idle) Network Connected
    Hibernate
    Fast Startup

The following sleep states are not available on this system:
    Standby (S3)
	The system firmware does not support this standby state.
	This standby state is disabled when S0 low power idle is supported.
~~~

الأسامي دي إيه؟

| الاسم | معناه |
|---|---|
| [[S3]] | النوم القديم: كل حاجة تقف ماعدا الـ RAM |
| [[S0 Low Power Idle]] | Modern Standby: الجهاز «صاحي بالعافية»، و [[Network Connected]] يعني فاضل متصل بالنت |
| [[Hibernate]] | الـ RAM بتتحفظ على الديسك والجهاز يقفل خالص |
| [[Fast Startup]] | hibernate صغير لويندوز بس، عشان الفتح يبقى أسرع |

الجهاز ده Modern Standby (S3 مش مدعوم من الـ firmware)، وده سبب إن لابتوبات بتسخن في الشنطة: هي مش نايمة نوم كامل.

---

## ٢. تقرير البطارية

~~~cmd
powercfg /batteryreport /output "%USERPROFILE%\battery.html"
~~~

- [[/batteryreport]] اعمل تقرير HTML عن البطارية.
- [[/output "..."]] احفظه هنا. و [[%USERPROFILE%]] متغير فيه فولدر يوزرك ([[C:\Users\الاسم]])، فالملف هيبقى في مكان تعرفه.

~~~text الناتج
Battery life report saved to file path C:\Users\ali\battery.html.
~~~

---

## ٣. افتحه

~~~cmd
start "" "%USERPROFILE%\battery.html"
~~~

[[start]] بيفتح الملف بالبرنامج المرتبط بيه (المتصفح). و [[""]] الأولى عنوان النافذة؛ لازمة لأن [[start]] بيعتبر أول حاجة بين علامات تنصيص عنوان (درس start).

### نقرا الأرقام المهمة

ده اللي في قسم Installed batteries على اللابتوب ده:

~~~text من التقرير
DESIGN CAPACITY        90,005 mWh
FULL CHARGE CAPACITY   51,354 mWh
CYCLE COUNT            -
~~~

- [[mWh]] (milliwatt-hour) وحدة الطاقة اللي البطارية بتشيلها.
- [[DESIGN CAPACITY]] سعتها وهي جديدة، و [[FULL CHARGE CAPACITY]] سعتها دلوقتي لما تتشحن 100%.
- الصحة = 51354 ÷ 90005 = **حوالي 57%**: البطارية بتشيل أكتر من نص اللي كانت بتشيله بشوية.
- [[CYCLE COUNT]] طلع [[-]] لأن الشركة المصنعة مش بتبعت الرقم ده.

---

## ٤. مين مانع النوم: [[/requests]]

~~~cmd
powercfg /requests
~~~

بيعرض أقسام ([[DISPLAY]] و [[SYSTEM]] و [[AWAYMODE]] و [[EXECUTION]]...) وتحت كل واحد البرنامج اللي طالب «متناموش»، أو [[None.]]. من CMD عادي:

~~~text الناتج
This command requires administrator privileges and must be executed from an elevated command prompt.
~~~

و [[%errorlevel%]] طلع [[1]]. يعني لازم Terminal (Admin).

---

## ٥. تقرير الطاقة: [[/energy]]

~~~cmd
powercfg /energy /output "%USERPROFILE%\energy.html"
~~~

بيراقب الجهاز 60 ثانية ويكتب تقرير بالمشاكل. برضه محتاج أدمن (نفس الرسالة اللي فوق)، وسيب الجهاز في حاله وهو شغال.

---

## ٦ و ٧. غيّر المواعيد: [[/change]]

~~~cmd
powercfg /change monitor-timeout-ac 10
powercfg /change standby-timeout-ac 0
~~~

اسم الإعداد متركّب من حتتين:

| الحتة | المعنى |
|---|---|
| [[monitor]] | الشاشة تقفل |
| [[standby]] | الجهاز ينام |
| [[hibernate]] | الجهاز يعمل hibernate |
| [[-timeout-]] | بعد كام دقيقة |
| [[ac]] | وهو على الشاحن (AC = التيار) |
| [[dc]] | وهو على البطارية (DC = تيار البطارية) |

والرقم بالدقايق، و [[0]] يعني «أبدًا». فالسطرين: على الشاحن، الشاشة تقفل بعد 10 دقايق، والجهاز مينامش أبدًا. التغيير بيتطبق على خطة الطاقة الشغالة بس؛ اعرفها بـ [[powercfg /getactivescheme]]، وعندي طلّع:

~~~text الناتج
Power Scheme GUID: 27fa6203-3987-4dcc-918d-748559d549ec  (Performance)
~~~

([[GUID]] رقم تعريف ثابت للخطة، والاسم بين القوسين.)

---

## الخلاصة

| السؤال | الأمر | أدمن؟ |
|---|---|---|
| أنواع النوم | [[powercfg /a]] | لأ |
| صحة البطارية | [[powercfg /batteryreport /output ...]] | لأ |
| مين مانع النوم | [[powercfg /requests]] | أيوه |
| مشاكل الطاقة | [[powercfg /energy]] | أيوه |
| مواعيد الشاشة والنوم | [[powercfg /change ...]] | مشغّلتهوش هنا لأنه بيغيّر الإعدادات |

ودايمًا اكتب [[/output]] بمسار كامل، عشان من CMD أدمن الفولدر الحالي بيبقى System32.`,
          lines: [
            "[[/a]] (available) بيعرض أنواع النوم اللي الجهاز يقدر يعملها (Standby و Hibernate وغيرهم)، واللي مش متاحة مع سبب كل واحدة، زي إن الدرايفر مش بيدعمها أو إن Hibernate مقفول. أول حاجة تبص عليها لو الجهاز مش بينام.",
            "بيعمل تقرير عن البطارية: السعة اللي اتصنعت بيها، والسعة الحالية، واستخدامها في الأيام اللي فاتت. [[/output]] بيحدد مكان الملف، و [[%USERPROFILE%]] فولدر اليوزر فمش محتاج Admin يكتب فيه. التنصيص عشان المسار ممكن يبقى فيه مسافات.",
            "[[start]] بيفتح الملف بالبرنامج الافتراضي لـ HTML، يعني المتصفح. التنصيص الفاضي [[\"\"]] الأول هو عنوان النافذة: لازم يتكتب لأن من غيره [[start]] هياخد المسار اللي بين تنصيص على إنه العنوان ومش هيفتح حاجة.",
            "[[/requests]] بيعرض البرامج والدرايفرز اللي طالبة من الويندوز «متنامش» أو «متطفيش الشاشة» دلوقتي، زي فيديو شغّال أو برنامج بيحمّل. محتاج CMD كـ Admin، ومن غيره هيطلع إن الصلاحيات مش كفاية.",
            "[[/energy]] بيراقب الجهاز ٦٠ ثانية ويكتب تقرير HTML بالأخطاء والتحذيرات اللي بتصرف بطارية (أجهزة USB مش بتنام، إعدادات CPU…). محتاج Admin، وسيب الجهاز من غير شغل تقيل وقت المراقبة عشان التقرير يبقى دقيق.",
            "[[/change]] بيغيّر إعداد في خطة الطاقة الحالية: [[monitor-timeout-ac]] وقت إطفاء الشاشة وانت على الشاحن ([[ac]])، والرقم بالدقايق. ولو عايز نفس الإعداد على البطارية استخدم [[monitor-timeout-dc]].",
            "[[standby-timeout-ac]] وقت دخول الجهاز في النوم وهو على الشاحن، و [[0]] معناها «أبدًا». مفيد لجهاز شغّال سيرفر أو بيحمّل حاجة طول الليل، بس على البطارية متعملهاش عشان البطارية هتخلص."
          ],
          sol: R`[[powercfg /batteryreport /output "%USERPROFILE%\battery.html"]] بيطبع [[Battery life report saved to file path C:\Users\ali\battery.html.]]. في التقرير تحت Installed batteries، على لابتوب جرّبت عليه: [[DESIGN CAPACITY 90,005 mWh]] و [[FULL CHARGE CAPACITY 51,291 mWh]]، يعني 51291 على 90005 = حوالي 57%: البطارية بتشيل أكتر من نص اللي كانت بتشيله وهي جديدة بشوية، وقسم Battery capacity history بيوريك النزول ده أسبوع بأسبوع. و [[CYCLE COUNT]] ممكن يطلع [[-]] لو الشركة المصنعة مش بتبعته.

[[powercfg /a]] على نفس اللابتوب طلّع تحت [[The following sleep states are available on this system:]] السطور [[Standby (S0 Low Power Idle) Network Connected]] و [[Hibernate]] و [[Fast Startup]]، وتحت غير المتاح [[Standby (S3)]] وجنبها [[The system firmware does not support this standby state.]]، يعني الجهاز ده Modern Standby. على ديسكتوب أقدم غالبًا هتلاقي [[Standby (S3)]] متاح. ولو جهاز من غير بطارية، [[/batteryreport]] ممكن يطلّع error بدل التقرير. (مشغّلتش [[/requests]] و [[/energy]] و [[/change]] هنا: الأولين محتاجين أدمن، والتالت بيغيّر إعدادات الجهاز.)`
        },
        {
          cmd: "curl.exe",
          title: "نزّل ملف واتأكد إنه سليم",
          desc: R`[[curl]] موجود جوه ويندوز 10 (من نسخة 1803) و 11 من غير تسطيب، وبينزّل أي ملف من لينك من سطر الأوامر. ومعاه [[certutil -hashfile]] تتأكد إن الملف اللي نزل هو نفسه اللي صاحبه رفعه.

الإضافات:
[[-o name]] احفظ الناتج في ملف بالاسم ده (من غيرها curl بيطبع الملف على الشاشة).
[[-O]] (كابيتال) احفظه بنفس اسمه اللي في آخر اللينك.
[[-L]] لو السيرفر قال «الملف اتنقل لمكان تاني» (redirect، زي لينكات GitHub releases)، روح وراه. من غيرها هتنزّل صفحة صغيرة بدل الملف.
[[-f]] لو السيرفر رد بخطأ (زي 404) اعتبره فشل: ميحفظش حاجة ويرجع exit code 22. من غيرها curl بيحفظ صفحة الخطأ كأنها الملف ويرجع 0.
[[-C -]] كمّل من مكان ما وقف: بيشوف حجم الملف الموجود ويطلب الباقي بس.
[[--progress-bar]] شريط [[####]] بنسبة مئوية بدل جدول الأرقام.
والحروف بتتجمع: [[-fLO]] هي [[-f -L -O]].

[[certutil -hashfile file SHA256]] بيحسب بصمة SHA256 للملف (من غير اسم الخوارزمية بيحسب SHA1). المواقع اللي بتحترم نفسها بتنشر البصمة جنب الملف (ملف [[.sha256]] أو [[SHASUMS256.txt]])، ولو البصمتين زي بعض حرف بحرف يبقى الملف وصل كامل ومحدش لعب فيه.

في CMD اكتب [[curl]] عادي. في Windows PowerShell 5.1، [[curl]] اسم تاني لـ Invoke-WebRequest، فاكتب [[curl.exe]] (في PowerShell 7 الاسم ده اتشال). والإضافات هنا نفس curl اللي في لينكس والماك (درس «curl» في تاب «bash»)، وبديل certutil في PowerShell هو [[Get-FileHash]] (درس «Get-FileHash» في تاب «PowerShell»).`,
          example: R`curl --version
curl -L -o cacert.pem https://curl.se/ca/cacert.pem
curl -fLO https://curl.se/ca/cacert.pem.sha256
type cacert.pem.sha256
certutil -hashfile cacert.pem SHA256
curl -fL -C - -O --progress-bar https://nodejs.org/dist/v22.20.0/node-v22.20.0-win-x64.zip`,
          try: R`نزّل zip الـ Node من السطر الأخير، واقطعه بـ Ctrl+C في النص، وشغّل نفس السطر تاني وشوفه بيكمّل. وبعدين نزّل [[SHASUMS256.txt]] من نفس الفولدر على السيرفر وقارن البصمة.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[curl -s -o nf.html -w "%{http_code}\n" https://example.com/nope-lab]] وبعدها [[echo %errorlevel%]]. وبعدين نفس الأمر بـ [[-f]] وبص هل [[nf.html]] اتعمل.`, done: R`من غير [[-f]]: [[404]] و errorlevel 0، وصفحة الخطأ اتحفظت كأنها الملف. ومع [[-sf]]: errorlevel 22 والملف متحفظش أصلًا. ده سبب [[-f]] في أي سكربت تنزيل.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[curl -s -o setup.exe https://example.com/nope-lab && echo downloaded OK]] بيطبع «downloaded OK» وده كدب. صلّحه بحيث يفشل ويقول ليه.`, done: R`[[curl -fsS -o setup.exe https://example.com/nope-lab && echo downloaded OK]] طبع [[curl: (22) The requested URL returned error: 404]] ومطبعش OK. [[-f]] خلّت الـ 404 فشل، و [[-S]] رجّعت رسالة الخطأ اللي [[-s]] بتخبيها.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** [[curl -sI https://example.com | findstr /i "HTTP/ content-type"]]: الـ headers بس من غير الصفحة.`, done: R`طبع [[HTTP/1.1 200 OK]] و [[Content-Type: text/html; charset=utf-8]]. [[-I]] بيبعت طلب HEAD، فمفيش body بيتنزل خالص.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** [[curl -s -o nul -w "%{http_code} %{time_total}\n" https://example.com]] مرتين، وبعدين نفس الأمر على [[http://localhost:59999]] (مفيش حد بيسمع).`, done: R`عندنا [[200 0.429653]] و [[200 0.383221]] (الوقت بالثواني ومتغيّر)، و localhost طلّع [[000]] و errorlevel 7، ومع [[-sS]] الرسالة [[curl: (7) Failed to connect to localhost:59999 after 0 ms: Could not connect to server]]. [[000]] معناها مفيش رد HTTP أصلًا.` },
            { lvl: 'تحدي', t: R`**ابني:** [[fetch.bat URL FILE]] بيستخدم [[curl -fsSL -m 10]]، ويحوّل الكود لرسالة: 6 «host not found»، و 7 «nobody listening»، و 22 «server returned an error»، و 28 «timed out»، ويكتب سطر في [[fetch.log]] فيه التاريخ والكود، ويخرج بنفس كود curl.`, done: R`على [[https://example.com]] [[rc=0 ok]]، و [[/nope-lab]] [[rc=22]]، و [[https://no-such-host.invalid]] [[rc=6]]، و [[http://localhost:59999]] [[rc=7]]، و [[fetch.log]] فيه ٤ سطور. و 28 جرّبتها بـ [[curl -sS -m 1 https://10.255.255.1]]: [[curl: (28) Connection timed out after 1005 milliseconds]].` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** [[verify.bat FILE SHA256]] بيطلّع PASS أو FAIL بـ [[certutil -hashfile ... SHA256 | findstr /i /x]]. اختبره على ٣ حالات: [[echo hello lab> h.txt]] بالبصمة الصح، وبعد [[echo x>> h.txt]]، وملف مش موجود.`, done: R`البصمة الصح [[92d2ec3066fa2ade82c09998410a044a1831553446f0b7c9fa5e17acd17e14fa]] طلّعت [[PASS h.txt]] و 0، وبعد التعديل [[FAIL h.txt]] و 1، والملف المش موجود [[FAIL missing nosuch.txt]] و 2. ولو سبت certutil يتعامل لوحده مع الملف المش موجود: [[CertUtil: -hashfile command FAILED: 0x80070002 (WIN32: 2 ERROR_FILE_NOT_FOUND)]] و errorlevel سالب ([[-2147024894]]).` },
          ],
          deep: {
            why: R`على سيرفر ويندوز أو جهاز من غير متصفح، أو جوه سكربت setup، محتاج تنزّل installer أو ملف. curl بيعمل ده من غير ما تسطّب حاجة، وبيكمّل التحميل لو النت قطع. والتحقق بالبصمة بيحميك من ملف ناقص أو ملف حد عدّل فيه (مواقع تحميل مزيفة، أو mirror اتخترق).`,
            how: R`ويندوز بيستخدم نسخة curl مبنية على Schannel، يعني بتثق في نفس الشهادات اللي ويندوز بيثق فيها، و [[curl --version]] بيوريك ده في أول سطر.

[[-C -]] بيطلب من السيرفر «ابعت من البايت رقم كذا» (HTTP Range). لو السيرفر مش بيدعم ده، curl بيفشل بدل ما يلزق كلام غلط. ولو الملف اتغيّر على السيرفر بين المحاولتين، الكمّلة هتطلع ملف بايظ، والبصمة هتكشفه.

exit code بتاع curl مفيد في سكربتات bat: 0 نجح، و 6 الدومين مش موجود، و 7 مش قادر يتصل، و 22 خطأ HTTP مع [[-f]]، و 28 الوقت خلص. فتكتب [[curl -fLO URL || goto :fail]] (درس git-backup.bat). و [[-s]] بيخفي جدول التقدم، و [[-S]] معاه بيخلي الأخطاء تظهر.

[[certutil]] أداة شهادات في الأساس، و [[-hashfile]] واحد من أوامرها. الخوارزميات: MD5 و SHA1 و SHA256 و SHA384 و SHA512. البصمة بتطلع حروف صغيرة من غير مسافات في ويندوز 10 و 11. وعشان تاخد سطر البصمة بس في سكربت: [[certutil -hashfile file SHA256 | find /v ":"]] بيشيل السطرين اللي فيهم نقطتين.`,
            when: R`تنزيل installers أو أدوات في سكربت setup، أو ملف كبير على نت بيقطع، أو أي ملف تنفيذي (exe أو zip أو iso) قبل ما تفتحه، خصوصًا لو مش من الموقع الرسمي مباشرة.`,
            mistakes: R`تنسى [[-L]] مع لينك فيه redirect فتنزّل ملف صغير فيه HTML. أو تنسى [[-f]] فتحفظ صفحة 404 باسم الملف وتكتشف بعدين إنه «مش بيتفك». أو [[-o]] و [[-O]] مع بعض. أو [[curl]] في Windows PowerShell 5.1 فيشتغل Invoke-WebRequest ويرفض الإضافات. أو تقارن أول وآخر كام حرف من البصمة بس. أو تاخد البصمة من نفس المكان المشكوك فيه اللي جه منه الملف (لو الموقع اتخترق الاتنين هيتغيروا مع بعض)، فخدها من الصفحة الرسمية.`
          },
          teach: R`## الفكرة: نزّل، وبعدين اتأكد

المثال خطوتين: [[curl]] بينزّل الملف، و [[certutil -hashfile]] بيحسب «بصمته» عشان تقارنها بالبصمة اللي صاحب الملف نشرها. جرّبت كل سطر في CMD على ويندوز 11، في فولدر تجربة.

> على الجهاز ده Git متسطب، وفيه curl تاني. [[where curl]] بيوريك مين بيشتغل: في CMD عادي أول سطر [[C:\Windows\System32\curl.exe]]، وده اللي الناتج تحت منه.

---

## ١. [[curl --version]]

~~~cmd
curl --version
~~~

~~~text الناتج (أول سطر)
curl 8.21.0 (Windows) libcurl/8.21.0 Schannel zlib/1.3.2 WinIDN WinLDAP
~~~

- [[8.21.0]] النسخة، و [[(Windows)]] يعني دي النسخة اللي جاية مع ويندوز.
- [[Schannel]] مكتبة التشفير بتاعة ويندوز: curl بيثق في نفس الشهادات اللي ويندوز بيثق فيها.

---

## ٢. نزّل الملف: [[-L -o]]

~~~cmd
curl -L -o cacert.pem https://curl.se/ca/cacert.pem
~~~

| الحتة | معناها |
|---|---|
| [[-L]] | لو السيرفر قال «الملف اتنقل» (redirect) روح وراه |
| [[-o cacert.pem]] | احفظ في ملف بالاسم ده (o = output) |
| اللينك | الملف اللي عايزه: ملف شهادات بيوزعه موقع curl |

من غير [[-o]] curl بيطبع الملف نفسه على الشاشة. وبيطبع جدول تقدم (مختصر):

~~~text الناتج
  % Total    % Received % Xferd  Average Speed  Time    Time    Time   Current
                                 Dload  Upload  Total   Spent   Left   Speed
100 184.4k 100 184.4k   0      0  98149      0   00:01   00:01
~~~

[[184.4k]] حجم الملف (حوالي 184 كيلوبايت)، و [[Dload]] سرعة التحميل بالبايت في الثانية.

### ليه [[-L]] مهمة؟

جرّبت نفس الملف بـ [[http://]] (مش https) ومن غير [[-L]]، وطلبت من curl يطبع كود الرد والحجم:

~~~text الناتج
301 0
~~~

[[301]] معناها «اتنقل لمكان تاني» (هنا للنسخة الـ https)، والـ [[0]] إن مفيش ولا بايت من الملف نزل. مع [[-L]] curl بيروح للمكان الجديد ويجيب الملف.

---

## ٣. نزّل البصمة: [[-fLO]]

~~~cmd
curl -fLO https://curl.se/ca/cacert.pem.sha256
~~~

[[-fLO]] تلات إضافات لازقين في بعض، زي [[-f -L -O]]:
- [[-f]] (fail): لو السيرفر رد بخطأ زي 404 اعتبره فشل.
- [[-L]] زي فوق.
- [[-O]] (كابيتال): احفظ بنفس الاسم اللي في آخر اللينك، يعني [[cacert.pem.sha256]].

### من غير [[-f]] بيحصل إيه؟

جرّبت لينك مش موجود بالطريقتين:

~~~text مع -f
curl: (22) The requested URL returned error: 404
~~~

و [[%errorlevel%]] طلع [[22]] ومفيش ملف. من غير [[-f]]: errorlevel [[0]] (كأنه نجح!) واتحفظ ملف [[nosuchfile.pem]] حجمه 8,017 بايت، وهو صفحة الـ 404 نفسها. عشان كده [[-f]] مهمة في السكربتات.

---

## ٤. اطبع البصمة المنشورة

~~~cmd
type cacert.pem.sha256
~~~

~~~text الناتج
a41b5d356aea97a529fe27e0f7316d2f9d946d75927476cf9cf1b90637d00505  cacert.pem
~~~

الرقم الطويل ده بصمة SHA256 (64 حرف من 0-9 و a-f)، وبعده اسم الملف اللي البصمة بتاعته. البصمة دي بتتغيّر كل ما الملف بيتحدّث، فلو جرّبت بعدين هتلاقي رقم تاني.

---

## ٥. احسب بصمة الملف اللي نزل

~~~cmd
certutil -hashfile cacert.pem SHA256
~~~

- [[certutil]] أداة شهادات في ويندوز، و [[-hashfile]] واحد من أوامرها: احسب بصمة ملف.
- [[SHA256]] الخوارزمية. من غيرها بيحسب SHA1 (جرّبت: طلع [[SHA1 hash of cacert.pem:]] وبصمة 40 حرف بس).

~~~text الناتج
SHA256 hash of cacert.pem:
a41b5d356aea97a529fe27e0f7316d2f9d946d75927476cf9cf1b90637d00505
CertUtil: -hashfile command completed successfully.
~~~

قارن السطر التاني بالبصمة اللي في الخطوة ٤: **نفس الحروف بالظبط**، يعني الملف وصل كامل ومحدش عدّل فيه. لو حرف واحد اختلف، امسح الملف.

---

## ٦. ملف كبير يكمّل لو اتقطع

~~~cmd
curl -fL -C - -O --progress-bar https://nodejs.org/dist/v22.20.0/node-v22.20.0-win-x64.zip
~~~

| الحتة | معناها |
|---|---|
| [[-fL]] | زي فوق |
| [[-C -]] | كمّل (Continue). الـ [[-]] معناها «احسب انت من فين»: من حجم الملف الموجود |
| [[-O]] | بنفس اسم الملف اللي في اللينك |
| [[--progress-bar]] | شريط [[####]] بنسبة مئوية بدل الجدول |

جرّبت الكمّلة على cacert.pem: قصّيته لأول 100000 بايت وشغّلت [[curl -L -C - -o part.pem --progress-bar ...]]، فالشريط وصل [[100.0%]] والبصمة طلعت زي المنشورة بالظبط. ولما شغّلت نفس الأمر تاني والملف كامل:

~~~text الناتج
** Resuming transfer from byte position 188900
~~~

يعني لقى الملف 188,900 بايت (كامل) ومنزّلش حاجة، و errorlevel [[0]].

---

## كود الحل: بصمة من ملف فيه بصمات كتير

Node بينشر ملف واحد [[SHASUMS256.txt]] فيه بصمة كل ملف في الفولدر، سطر لكل ملف:

~~~cmd
curl -fsSLO https://nodejs.org/dist/v22.20.0/SHASUMS256.txt
findstr win-x64.zip SHASUMS256.txt
certutil -hashfile node-v22.20.0-win-x64.zip SHA256
~~~

- [[REM]] في أول سطر في كود الحل معناها «تعليق»: CMD بيتجاهل السطر.
- [[-s]] (silent) خبّي جدول التقدم، و [[-S]] بس اظهر الأخطاء لو حصلت.
- [[findstr win-x64.zip SHASUMS256.txt]] اطبع السطور اللي فيها الكلام ده بس، فيطلع سطر الملف اللي نزّلته من وسط عشرات السطور (درس findstr).

والسطرين التانيين لازم يطلّعوا نفس البصمة، زي الخطوتين ٤ و ٥.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| احفظ باسم معين | [[-o name]] |
| احفظ بنفس اسمه | [[-O]] |
| تابع الـ redirect | [[-L]] |
| افشل لو 404 | [[-f]] |
| كمّل التحميل | [[-C -]] |
| بصمة الملف | [[certutil -hashfile file SHA256]] |

وفي Windows PowerShell 5.1 اكتب [[curl.exe]] مش [[curl]].`,
          lines: [
            "بيطبع نسخة curl والمكتبات والبروتوكولات اللي بيدعمها. [[curl.exe]] جاي مع ويندوز ١٠ و ١١ في [[System32]]، فلو الأمر اشتغل يبقى موجود. خلي بالك: في Windows PowerShell 5.1 كلمة [[curl]] لوحدها اختصار لـ [[Invoke-WebRequest]]، فهناك اكتب [[curl.exe]].",
            "بينزّل ملف شهادات الـ CA اللي curl بيستخدمها. [[-L]] بيخليه يتبع أي redirect لو الرابط اتنقل لمكان تاني، من غيره هيحفظ صفحة الـ redirect الصغيرة بدل الملف. و [[-o cacert.pem]] بيحفظ في ملف بالاسم ده بدل ما يطبع المحتوى على الشاشة.",
            "بينزّل ملف البصمة. [[-O]] (كابيتال) بيحفظ بنفس الاسم اللي في آخر الرابط، و [[-L]] بيتبع الـ redirect، و [[-f]] بيخلي curl يفشل برقم خروج غير صفر لو السيرفر رد بـ ٤٠٤ أو ٥٠٠، بدل ما يحفظ صفحة الخطأ كأنها الملف.",
            "[[type]] بيطبع محتوى ملف البصمة: سطر فيه بصمة SHA256 اللي الموقع نشرها وجنبها اسم الملف. دي القيمة اللي هتقارن بيها في السطر الجاي.",
            "[[certutil]] جاي مع ويندوز، و [[-hashfile]] بيحسب بصمة الملف اللي نزل بخوارزمية [[SHA256]]. لو البصمة طابقت اللي فوق يبقى الملف وصل كامل ومحدش عدّل فيه، ولو اختلفت متستخدموش.",
            "بينزّل ملف كبير: [[-f]] يفشل لو السيرفر رد بخطأ، [[-L]] يتبع الـ redirect، [[-O]] بنفس الاسم، و [[--progress-bar]] شريط تقدّم بسيط بدل جدول الأرقام. [[-C -]] بيخلي curl يشوف حجم الجزء اللي نزل قبل كده ويكمّل من عنده، فلو النت قطع شغّل نفس السطر تاني بدل ما تبدأ من الأول."
          ],
          sol: R`جرّبته على ويندوز 11 (curl 8.21): [[curl -fsSLO https://nodejs.org/dist/v22.20.0/SHASUMS256.txt]] وبعدين [[findstr win-x64.zip SHASUMS256.txt]] طبع [[bb819d6eb8f5bfda294bbc83a7e4ec6539da67c4233d54b0d655b9248b15e29d  node-v22.20.0-win-x64.zip]]، و [[certutil -hashfile node-v22.20.0-win-x64.zip SHA256]] طبع:
[[SHA256 hash of node-v22.20.0-win-x64.zip:]]
[[bb819d6eb8f5bfda294bbc83a7e4ec6539da67c4233d54b0d655b9248b15e29d]]
[[CertUtil: -hashfile command completed successfully.]]
نفس البصمة بالظبط، يبقى الملف سليم. والشريط كان بيطبع [[######## 100.0%]].

والكمّلة: قصّيت ملف cacert.pem لأول 100000 بايت وشغّلت [[curl -L -C - -o cacert.pem https://curl.se/ca/cacert.pem]]، فطبع [[** Resuming transfer from byte position 100000]] ونزّل الباقي بس، والبصمة طلعت زي المنشورة. ولو الملف كامل أصلًا بيخلص على طول من غير ما ينزّل حاجة. و [[-f]] على لينك مش موجود طبع [[curl: (22) The requested URL returned error: 404]] ومعملش ملف، ومن غير [[-f]] حفظ صفحة الـ 404 (8017 بايت) كأنها الملف وخرج بـ 0. ودومين غلط طلّع [[curl: (6) Could not resolve host: ...]].`,
          solCode: R`curl -fL -C - -O --progress-bar https://nodejs.org/dist/v22.20.0/node-v22.20.0-win-x64.zip
REM press Ctrl+C in the middle, then run the same line again: it resumes
curl -fL -C - -O --progress-bar https://nodejs.org/dist/v22.20.0/node-v22.20.0-win-x64.zip
curl -fsSLO https://nodejs.org/dist/v22.20.0/SHASUMS256.txt
findstr win-x64.zip SHASUMS256.txt
certutil -hashfile node-v22.20.0-win-x64.zip SHA256`
        },
        {
          cmd: "winget upgrade",
          title: "حدّث كل البرامج بأمر واحد",
          desc: R`[[winget upgrade]] بيقارن البرامج المتسطبة على جهازك بآخر نسخة في مصادر winget، ويوريك اللي ليه تحديث، ويحدّثه واحد واحد أو كله مرة واحدة. ومعاه [[winget export]] و [[winget import]] بتنقل لستة برامجك لجهاز جديد.

[[winget]] مدير البرامج بتاع ويندوز (درس «مدير الحزم» في تاب «ابدأ من هنا»). [[winget upgrade]] لوحده بيطبع جدول من غير ما يحدّث حاجة: [[Name]]، و [[Id]] (الاسم الثابت اللي بتستخدمه في الأوامر)، و [[Version]] اللي عندك، و [[Available]] الجديدة، و [[Source]]: [[winget]] (الريبو المفتوح) أو [[msstore]] (Microsoft Store).

الإضافات:
[[--id Git.Git]] برنامج واحد بالـ Id، و [[-e]] الـ Id ده بالظبط مش أي حاجة شبهه.
[[--all]] كل البرامج اللي ليها تحديث.
[[--silent]] (أو [[-h]]) من غير نوافذ التسطيب، لو الـ installer بيدعم ده.
[[--accept-package-agreements]] وافق على شروط البرامج من غير ما يسألك (يعني انت موافق فعلًا).
[[--include-unknown]] كمان البرامج اللي winget مش عارف نسختها.
[[export -o file.json]] احفظ لستة البرامج في ملف JSON، و [[import -i file.json]] سطّب اللي في اللستة على جهاز تاني.

برامج كتير بتحتاج صلاحيات أدمن وهي بتتحدّث، فهيطلعلك UAC لكل واحد، إلا لو شغّلت CMD كأدمن من الأول. واقفل البرنامج قبل ما تحدّثه (VS Code أو Docker أو المتصفح)، وإلا التحديث ممكن يفشل أو يقفله في وشك. و winget جاي مع ويندوز 11 والنسخ الحديثة من ويندوز 10 (جوه App Installer).`,
          example: R`winget upgrade
winget upgrade --id Git.Git -e
winget upgrade --all --silent --accept-package-agreements
winget export -o "%USERPROFILE%\apps.json"
winget import -i "%USERPROFILE%\apps.json" --accept-package-agreements`,
          try: R`اعرض اللي محتاج تحديث عندك، وحدّث برنامج واحد بالـ Id بتاعه، واعمل export للستة وافتحها في notepad.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[winget upgrade --id Lab.NoSuchApp -e]] وبعدها [[echo %errorlevel%]] (آمن: مفيش برنامج بالاسم ده).`, done: R`[[No installed package found matching input criteria.]] و errorlevel [[-1978335212]]. ده رقم سالب لأن winget بيرجّع HRESULT: نفس الرقم بالـ hex [[0x8A150014]] (٢^٣٢ ناقص 1978335212). و [[winget list --id Lab.NoSuchApp -e]] بيرجّع نفس الكود.` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** من [[winget upgrade --help]] لاقي: الاسم الطويل لـ [[--all]]، والفلاج اللي بيحدّث البرامج المتثبّتة على نسخة (pinned)، واللي بيشيل النسخة القديمة بعد التحديث.`, done: R`[[-r,--recurse,--all]]، و [[--pinned,--include-pinned]] ([[Upgrade packages even if they have a non-blocking pin]])، و [[--uninstall-previous]]. وكمان [[-u,--unknown,--include-unknown]]. (winget v1.29).` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** [[winget export -o apps.json --accept-source-agreements]] وبعدين [[find /c "PackageIdentifier" apps.json]]، وافتح الملف واعرف شكله.`, done: R`طبع عدد البرامج اللي winget عارفها (عندنا 61)، والملف JSON فيه [[Sources]] وجوه كل مصدر [[Packages]] وكل برنامج [[PackageIdentifier]] بس من غير نسخة. ده اللي [[winget import -i]] بيسطّبه على جهاز جديد.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** [[winget search --id Git.Git -e]] و [[winget search git]]: عدّ الصفوف في الاتنين.`, done: R`الأولى صف واحد بالظبط ([[Git  Git.Git 2.56.0.4 winget]] وقت التجربة)، والتانية صفوف كتير لأي حاجة فيها «git» في الاسم أو الـ Id أو الـ tag. عشان كده السكربتات بتستخدم [[--id ... -e]] دايمًا.` },
            { lvl: 'تحدي', t: R`**ابني:** [[update-list.bat]] بيقرا [[ids.txt]] (Id في كل سطر)، ولكل واحد [[winget list --id %%i -e]] الأول: لو مش متسطّب يكتب في [[update.log]] «not installed» ويكمّل، ولو متسطّب يحدّثه بـ [[--silent --accept-package-agreements]] ويكتب الكود. التحديث الحقيقي في Sandbox، وعلى جهازك جرّبه بـ [[echo]] قدام [[winget upgrade]].`, done: R`بملف فيه [[Lab.NoSuchApp]] السطر في اللوج فيه [[-1978335212 not installed]] والسكربت كمّل للسطر اللي بعده. ومع [[echo]] بيطبع أمر التحديث لكل Id متسطّب من غير ما يغيّر حاجة.` },
          ],
          deep: {
            why: R`ويندوز مفيهوش «حدّث كل البرامج» زي [[sudo apt upgrade]] في لينكس، فكل برنامج بيحدّث نفسه بطريقته أو مبيحدّثش خالص، والبرامج القديمة (Git و Node و Python و 7-Zip) هي اللي بيبقى فيها ثغرات معروفة. winget بيخليها أمر واحد. و export و import بيوفروا عليك يوم كامل وانت بتجهز جهاز جديد.`,
            how: R`winget بيجيب معلومات البرامج من «مصادر»: [[winget]] (ريبو مفتوح على GitHub فيه لكل برنامج لينك الـ installer الرسمي وبصمته SHA256، و winget بيتأكد من البصمة قبل ما يسطّب) و [[msstore]]. وبيعرف البرامج المتسطبة من قايمة «Installed apps» في ويندوز، حتى اللي انت سطبتها بإيدك، عشان كده بيلاقي تحديثات لبرامج عمرك ما سطبتها بـ winget.

[[--all]] بيحدّث واحد ورا التاني ويكمّل لو واحد فشل، وفي الآخر بيقولك مين فشل. ولو برنامج مش عايزه يتحدّث (نسخة معينة شغال عليها مشروعك): [[winget pin add --id Docker.DockerDesktop]]، وبعدها [[--all]] بيعدّيه، و [[winget pin list]] بيعرض المثبّت و [[winget pin remove]] بيشيل التثبيت.

[[export]] بيكتب البرامج اللي ليها مصدر بس، فاللي متسطب من مكان تاني بيطبع جنبه [[Installed package is not available from any source]]. و [[import]] لو البرنامج متسطب أصلًا بيحدّثه لو فيه أحدث، إلا لو كتبت [[--no-upgrade]].

ممكن تخليه يشتغل كل أسبوع بـ schtasks (درس schtasks)، بس [[--silent]] مش بيمنع UAC، فمهمة باسمك هتقف تستناك توافق. الأضمن تشغّله بإيدك من CMD أدمن.`,
            when: R`مرة في الأسبوع أو الشهر كصيانة، أو بعد ما تسمع عن ثغرة في برنامج عندك، أو قبل ما تفرمت الجهاز (export) وبعدها (import)، أو تجهيز جهاز لحد جديد في الفريق بنفس الأدوات.`,
            mistakes: R`تشغّل [[--all]] وانت في نص شغل فيقفل VS Code أو Docker أو المتصفح عشان يحدّثهم. أو تفتكر export بينقل الإعدادات والملفات (هو أسامي البرامج بس). أو [[--accept-package-agreements]] على برامج مش عارف شروطها. أو تعتمد على [[--all]] مع برامج نسختها مهمة لمشروعك (Node أو Python) فتتحدّث وتكسر الـ build؛ استخدم pin أو مدير نسخ زي nvm. أو تنسى إن برامج الـ Store بتتحدّث من الـ Store كمان.`
          },
          teach: R`## الفكرة: اعرض الأول، وبعدين حدّث

[[winget]] هو مدير البرامج بتاع ويندوز، و [[upgrade]] الأمر الفرعي اللي بيقارن اللي عندك بآخر نسخة. من غير ما تقوله «حدّث مين» بيعرض بس، ومع [[--id]] أو [[--all]] بيحدّث. جرّبت العرض والـ export من CMD عادي على ويندوز 11 ([[winget --version]] طلع [[v1.29.380]])؛ التحديث والـ import مشغّلتهمش عشان ميغيّروش برامج الجهاز.

---

## ١. اعرض اللي ليه تحديث

~~~cmd
winget upgrade
~~~

~~~text الناتج (سطور منه)
Name                Id                         Version   Available  Source
--------------------------------------------------------------------------
Docker Desktop      XP8CBJ40XLBWKX             4.82.0    4.93.0     msstore
GitHub CLI          GitHub.cli                 2.97.0    2.102.0    winget
Windows Terminal    Microsoft.WindowsTerminal  1.24.12741.0  1.25.2733.0  winget
17 upgrades available.
2 package(s) have version numbers that cannot be determined. Use --include-unknown to see all results.
~~~

| العمود | معناه |
|---|---|
| [[Name]] | الاسم زي ما بيظهر في Installed apps |
| [[Id]] | الاسم الثابت اللي بتكتبه في الأوامر |
| [[Version]] | النسخة اللي عندك |
| [[Available]] | النسخة الجديدة |
| [[Source]] | جاي منين: [[winget]] الريبو المفتوح، أو [[msstore]] Microsoft Store |

لاحظ إن Id برامج الـ Store حروف وأرقام ([[XP8CBJ40XLBWKX]]) مش اسم. والسطر الأخير بيقول إن فيه برنامجين winget مش عارف نسختهم، فمش ظاهرين إلا بـ [[--include-unknown]].

> أول مرة تشغّل winget ممكن يسألك توافق على شروط المصادر (Y/N). في سكربت ضيف [[--accept-source-agreements]].

---

## ٢. حدّث برنامج واحد

~~~cmd
winget upgrade --id Git.Git -e
~~~

- [[--id Git.Git]] البرنامج ده بالـ Id بتاعه.
- [[-e]] (exact): الـ Id ده بالظبط. من غيرها winget بيدوّر على أي حاجة شبهه، وممكن يلاقي أكتر من واحد ويقف يسألك.

---

## ٣. حدّث كل حاجة

~~~cmd
winget upgrade --all --silent --accept-package-agreements
~~~

| الحتة | معناها |
|---|---|
| [[--all]] | كل اللي في الجدول اللي فوق، واحد ورا التاني |
| [[--silent]] | من غير نوافذ التسطيب (لو الـ installer بيدعم ده) |
| [[--accept-package-agreements]] | وافق على شروط البرامج من غير ما تسأل |

[[--silent]] مش بيمنع UAC: برامج كتير هتطلب صلاحيات أدمن، إلا لو CMD نفسه أدمن. واقفل البرامج اللي هتتحدّث الأول.

---

## ٤. احفظ لستة برامجك

~~~cmd
winget export -o "%USERPROFILE%\apps.json"
~~~

[[export]] اكتب البرامج المتسطبة في ملف، و [[-o]] (output) مكانه، و [[%USERPROFILE%]] فولدر يوزرك. وهو شغال بيطبع سطور زي:

~~~text الناتج (سطور منه)
Installed package is not available from any source: WinRAR
Exported package requires license agreement to install: Docker Desktop
~~~

السطر الأول يعني البرنامج ده winget مش لاقيه في أي مصدر بالشكل اللي متسطب بيه، **فمش هيتكتب في الملف**. والتاني اتكتب، بس هيطلب موافقة على شروطه وقت التسطيب. والملف نفسه JSON:

~~~text أول الملف
{
	"$schema" : "https://aka.ms/winget-packages.schema.2.0.json",
	"CreationDate" : "2026-10-06T10:28:58.329-00:00",
	"Sources" :
	[
		{
			"Packages" :
			[
				{
					"PackageIdentifier" : "XP8CBJ40XLBWKX"
				},
~~~

يعني لستة Ids متقسمة حسب المصدر (عندي [[msstore]] و [[winget]]، 53 برنامج في الاتنين)، من غير نسخ ولا إعدادات.

---

## ٥. على الجهاز الجديد

~~~cmd
winget import -i "%USERPROFILE%\apps.json" --accept-package-agreements
~~~

[[import]] سطّب كل اللي في الملف، و [[-i]] (input) الملف. البرنامج اللي متسطب أصلًا بيتحدّث لو فيه أحدث، إلا لو كتبت [[--no-upgrade]]. (من توثيق winget، مشغّلتهوش.)

---

## الخلاصة

| عايز | اكتب |
|---|---|
| اعرض اللي ليه تحديث | [[winget upgrade]] |
| حدّث واحد | [[winget upgrade --id الـId -e]] |
| حدّث الكل | [[winget upgrade --all]] |
| لستة برامجك | [[winget export -o file.json]] |
| سطّبها في جهاز تاني | [[winget import -i file.json]] |

والـ export بيشيل أسامي البرامج بس، مش إعداداتها ولا ملفاتك.`,
          lines: [
            "من غير أي حاجة بعده، بيعرض جدول بالبرامج اللي ليها نسخة أحدث: الاسم والـ Id والنسخة الحالية والجديدة. مش بيحدّث حاجة، فآمن تشغّله تشوف الأول.",
            "بيحدّث برنامج واحد بس. [[--id Git.Git]] بيدوّر بالـ Id اللي ظهر في الجدول بدل الاسم، و [[-e]] (exact) بيخلي المطابقة بالظبط، فمش هيمسك برنامج تاني اسمه فيه [[Git]] زي GitHub Desktop.",
            "بيحدّث كل البرامج اللي ليها تحديث مرة واحدة. [[--silent]] بيطلب من كل installer يشتغل من غير نوافذ، و [[--accept-package-agreements]] بيوافق على رخص البرامج من غير ما يسألك عشان التحديث ميقفش مستني. بعض البرامج ممكن تطلب Admin أو تقفل لو مفتوحة.",
            "[[export]] بيكتب لستة البرامج المتسطبة اللي winget يعرفها في ملف JSON، و [[-o]] مكان الملف. مفيد قبل ما تفرمت الجهاز أو تنقل لجهاز جديد. البرامج اللي مش موجودة في مصادر winget مش هتدخل اللستة.",
            "على الجهاز الجديد: [[import]] بيقرا الملف و [[-i]] مكانه، وبيسطّب كل برنامج فيه واحد ورا التاني. [[--accept-package-agreements]] عشان ميسألكش على رخصة كل برنامج، والبرامج المتسطبة أصلًا بيعدّيها."
          ],
          sol: R`[[winget upgrade]] طبع عندي جدول زي:
[[Name  Id  Version  Available  Source]]
[[GitHub CLI  GitHub.cli  2.97.0  2.102.0  winget]]
[[Docker Desktop  XP8CBJ40XLBWKX  4.82.0  4.93.0  msstore]]
وفي الآخر [[16 upgrades available.]] و [[2 package(s) have version numbers that cannot be determined. Use --include-unknown to see all results.]]. لاحظ إن برامج الـ Store الـ Id بتاعها حروف وأرقام مش اسم.

[[winget export -o "%USERPROFILE%\apps.json"]] طبع سطور زي [[Installed package is not available from any source: WinRAR]] لبرامج متسطبة من مواقعها مش من winget (دي مش هتتنقل)، و [[Exported package requires license agreement to install: Docker Desktop]]. والملف فيه [[$schema]] و [[CreationDate]]، وتحت كل Source لستة [[PackageIdentifier]]: Ids بس من غير نسخ (إلا لو ضفت [[--include-versions]]). ولو [[winget]] طلّع [[is not recognized]]، حدّث App Installer من Microsoft Store. (التحديث والـ import نفسهم مشغّلتهمش هنا عشان ميغيّروش برامج الجهاز.)`
        },
        {
          cmd: "mklink",
          title: "فولدر بيشاور على مكان تاني (junction)",
          desc: R`[[mklink]] بيعمل «لينك» في نظام الملفات: اسم شكله فولدر أو ملف عادي، بس محتواه في مكان تاني. أي برنامج يفتح اللينك بيشتغل على الأصل من غير ما يعرف، فتقدر تنقل فولدر تقيل من C لدرايف تاني من غير ما تبوّظ البرامج اللي بتدوّر عليه في مكانه القديم.

الشكل: [[mklink]] والنوع، وبعدين اسم اللينك الجديد، وبعدين الأصل (عكس [[ln -s]] في لينكس اللي الأصل فيه الأول). الأنواع:
[[/J]] junction لفولدر: مش محتاج أدمن، وبيشتغل بين أي درايفات على نفس الجهاز، بس مينفعش لفولدر على الشبكة. ده اللي هتستخدمه أغلب الوقت.
[[/D]] symbolic link لفولدر: بيقبل مسار نسبي ومسار شبكة، بس محتاج CMD كأدمن أو Developer Mode (درس «ms-settings:developers» في تاب «اختصارات النظام»).
من غير نوع: symbolic link لملف، وبنفس شرط [[/D]].
[[/H]] hard link لملف: اسم تاني لنفس البيانات على نفس الدرايف، ومن غير أدمن. لو مسحت اسم منهم، التاني لسه شغال.

[[dir]] بيعرض الـ junction بكلمة [[<JUNCTION>]] جنبه والمسار اللي بيشاور عليه بين قوسين مربعين، والـ symlink بـ [[<SYMLINKD>]] أو [[<SYMLINK>]]. و [[dir /al]] بيعرض اللينكات بس (الـ [[L]] من reparse points).

الفخ الكبير في المسح: [[rmdir link]] (من غير [[/s]]) بيشيل اللينك بس والأصل سليم. لكن [[del link]] بيدخل جوه ويمسح ملفات الأصل نفسه، واللينك بيفضل! جرّبتها: [[del /q]] على junction مسح الملف اللي في الفولدر الأصلي.`,
          example: R`mkdir real
mklink /J shortcut real
echo hi> shortcut\note.txt
dir /b real
dir
rmdir shortcut`,
          try: R`في lab: اعمل فولدر big فيه ملفين، انقله لمكان تاني (درايف تاني لو عندك) بـ [[robocopy big D:\moved\big /E /MOVE]]، واعمل مكانه junction بنفس الاسم، وافتح [[big]] واتأكد إن الملفين ظاهرين.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[mkdir real]] و [[mklink /J jlink real]] مرتين ورا بعض، و [[echo %errorlevel%]] بعد كل واحدة.`, done: R`الأولى [[Junction created for jlink <<===>> real]] و 0، والتانية [[Cannot create a file when that file already exists.]] و 1. فسكربت بيعمل لينك لازم يفحص الأول ([[if exist jlink\]]) عشان يتشغّل مرتين من غير error.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** من CMD عادي من غير Developer Mode، جرّب الأربع أنواع: [[mklink slink.txt real\a.txt]] و [[mklink /D dlink real]] و [[mklink /H hard.txt real\a.txt]] و [[mklink /J jlink real]].`, done: R`الـ symlink بنوعيه طلّع [[You do not have sufficient privilege to perform this operation.]] و 1، والـ hard link [[Hardlink created for hard.txt <<===>> real\a.txt]] والـ junction اشتغلوا من غير أدمن. وده سبب إن [[/J]] هو اللي بتستخدمه أغلب الوقت.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** بعد الـ hard link: [[echo two>> hard.txt]] وبعدين [[type real\a.txt]]، و [[fsutil hardlink list hard.txt]].`, done: R`[[type real\a.txt]] طبع [[one]] و [[two]]: الاسمين نفس البيانات. و [[fsutil hardlink list]] طبع مسارين ([[\Users\ali\...\real\a.txt]] و [[\Users\ali\...\hard.txt]]) من غير حرف الدرايف.` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** سكربت تنضيف فيه [[del /q j2]] عشان «يشيل اللينك». اعمل [[real2\k.txt]] و [[mklink /J j2 real2]] وشغّله، وبعدين [[dir /b real2]]. صلّحه.`, done: R`بعد [[del /q j2]] الأمر [[dir /b real2]] مطبعش حاجة: [[k.txt]] اتمسح من الأصل واللينك لسه موجود. الصح [[rmdir j2]] (من غير [[/s]]): بيشيل اللينك بس و [[real2\k.txt]] بيفضل.` },
            { lvl: 'تحدي', t: R`**اقرا وتوقّع:** [[mklink /J jl2 C:\no\such\folder]] على فولدر مش موجود: هينجح ولا يرفض؟ وبعدها [[dir jl2]].`, done: R`نجح: [[Junction created for jl2 <<===>> C:\no\such\folder]]، و mklink مبيتأكدش إن الأصل موجود. و [[dir jl2]] طبع [[File Not Found]] و errorlevel 1. يعني لينك «مقطوع»، فافحص الأصل بـ [[if exist "target\"]] قبل ما تعمله.` },
            { lvl: 'تحدي', t: R`**ابني:** [[move-and-link.bat SRC DEST]]: ينقل الفولدر بـ [[robocopy /E /MOVE]] ويعمل مكانه [[mklink /J]]، ويرفض لو [[DEST]] موجود، ويعدّي بهدوء لو [[SRC]] أصلًا junction (من [[dir /al]] على الفولدر الأب)، ويكتب لوج. جرّبه على فولدرات تجربة في TEMP بس.`, done: R`أول تشغيلة الملفات ظاهرة من المكان القديم و [[dir /al]] فيه [[<JUNCTION>]]، والتانية بتطبع «already a junction» وتخرج بـ 0 من غير ما تنقل حاجة، و [[DEST]] موجود بيطلّع رسالة وكود 1. وكود robocopy من 0 لـ 7 اعتبرته نجاح (درس «robocopy نجح وسكربتك قال فشل»).` },
          ],
          deep: {
            why: R`درايف C بيتملي من كاشات أدوات التطوير (npm و Gradle و NuGet) وفولدرات برامج مبتسألكش تتسطب فين. لو نقلت الفولدر بإيدك، البرنامج هيدوّر عليه في مكانه القديم ويعمل واحد جديد فاضي أو يبوظ. الـ junction بيخلّي المكان القديم «باب» للجديد. وكمان مفيد تخلي كذا مشروع يشوفوا نفس الفولدر (مكتبة مشتركة أو إعدادات).`,
            how: R`اللينك عبارة عن reparse point: إدخال في نظام الملفات NTFS بيقول «المحتوى الحقيقي هناك»، وويندوز بيحوّل أي فتح للينك للأصل من غير ما البرنامج يحس.

الـ junction بيتسجل بمسار كامل حتى لو كتبت اسم نسبي (جرّبت [[mklink /J jlink real]] و [[dir]] عرض المسار الكامل). فلو نقلت الأصل اللينك بيتقطع. و [[mklink]] مش بيتأكد إن الأصل موجود وقت ما يعمل اللينك، فاللينك المقطوع بيظهر عادي وفتحه بيطلّع [[File Not Found]].

نقل فولدر تقيل خطوة خطوة (اقفل البرنامج اللي بيستخدمه الأول):
[[robocopy "%LOCALAPPDATA%\npm-cache" "D:\cache\npm-cache" /E /MOVE]] بينسخ ويمسح الأصل (درس robocopy). جرّبتها على فولدر تجربة: الفولدر القديم اختفى، و errorlevel 1 يعني نسخ بنجاح.
[[mklink /J "%LOCALAPPDATA%\npm-cache" "D:\cache\npm-cache"]] بيعمل مكانه junction.
لو robocopy مقدرش يمسح ملف مفتوح، الفولدر القديم هيفضل، و mklink هيقول [[Cannot create a file when that file already exists.]]؛ اقفل البرنامج وكمّل.

junction ولا symlink؟ junction للفولدرات على نفس الجهاز ومن غير أدمن. symlink ([[/D]]) لما تحتاج مسار نسبي (ريبو بيتنقل بين أجهزة) أو مسار شبكة، ومن غير صلاحيات بيقول [[You do not have sufficient privilege to perform this operation.]]. و hard link ([[/H]]) للملفات بس وعلى نفس الدرايف، وكل الأسماء متساوية ومفيش «أصل». وفي PowerShell: [[New-Item -ItemType Junction -Path link -Target real]].`,
            when: R`C قرّب يتملي وفيه فولدرات كاش أو SDK كبيرة، أو برنامج مُصر يحفظ في مكان معين، أو كذا مشروع محتاجين نفس الفولدر، أو ريبو فيه symlinks.`,
            mistakes: R`تمسح اللينك بـ [[del]] فتمسح ملفات الأصل (جرّبتها: [[del /q link]] مسح الملفات من الفولدر الأصلي واللينك فضل)؛ امسحه بـ [[rmdir link]] من غير [[/s]]. أو تقلب الترتيب وتكتب الأصل الأول. أو تعمل junction والفولدر القديم لسه موجود مكانه. أو تنقل الأصل بعد كده فاللينك يتقطع. أو تنقل فولدرات نظام (Windows أو Program Files) بالطريقة دي، ده بيبوّظ تحديثات ويندوز.`
          },
          teach: R`## الفكرة: اسم بيشاور على فولدر تاني

المثال بيعمل فولدر حقيقي، وجنبه «لينك» اسمه shortcut، ويثبت إن اللي بتكتبه في اللينك بيروح في الأصل، وبعدين يمسح اللينك بالطريقة الآمنة. جرّبته كله في CMD عادي على ويندوز 11، في فولدر تجربة.

> [[mklink]] أمر جوه CMD نفسه (internal)، مش برنامج: [[where mklink]] طلّع [[INFO: Could not find files for the given pattern(s).]]. عشان كده مش هتلاقيه في PowerShell؛ هناك [[New-Item -ItemType Junction]].

---

## ١. الأصل

~~~cmd
mkdir real
~~~

فولدر عادي جدًا. ده المكان اللي الملفات هتتخزن فيه فعلًا.

---

## ٢. اللينك

~~~cmd
mklink /J shortcut real
~~~

| الحتة | معناها |
|---|---|
| [[mklink]] | make link: اعمل لينك |
| [[/J]] | النوع: junction، لينك لفولدر من غير أدمن |
| [[shortcut]] | **اسم اللينك الجديد** (أول حاجة) |
| [[real]] | **الأصل** اللي بيشاور عليه (تاني حاجة) |

الترتيب ده عكس [[ln -s]] في لينكس (هناك الأصل الأول). اتعوّد تقراه «اعمل shortcut يشاور على real».

~~~text الناتج
Junction created for shortcut <<===>> real
~~~

السهم [[<<===>>]] معناه إن الاتنين بقوا نفس المكان.

---

## ٣ و ٤. اكتب في اللينك، تلاقيه في الأصل

~~~cmd
echo hi> shortcut\note.txt
dir /b real
~~~

- [[echo hi> shortcut\note.txt]] اكتب [[hi]] في ملف جوه اللينك ([[>]] بيحوّل الناتج لملف، درس | > >> 2>&1).
- [[dir /b real]] اعرض اللي جوه **الأصل**، و [[/b]] (bare) الأسامي بس.

~~~text الناتج
note.txt
~~~

الملف اتكتب مرة واحدة بس، في real، واللينك مجرد باب ليه.

---

## ٥. [[dir]] بيفرّق بينهم

~~~cmd
dir
~~~

~~~text الناتج (السطور المهمة)
10/06/2026  10:28 AM    <DIR>          real
10/06/2026  10:28 AM    <JUNCTION>     shortcut [C:\Users\...\lk\real]
~~~

- [[<DIR>]] فولدر عادي.
- [[<JUNCTION>]] لينك، وبين القوسين المربعين المسار **الكامل** للأصل، مع إني كتبت [[real]] بس. الـ junction بيتسجل بمسار كامل دايمًا، فلو نقلت real اللينك هيتقطع.

و [[dir /al]] بيعرض اللينكات بس ([[/a]] attributes، و [[l]] reparse points يعني لينكات)، وعندي طلّع سطر shortcut لوحده.

### أخطاء جرّبتها

~~~text mklink /J shortcut real  (تاني مرة، والاسم موجود)
Cannot create a file when that file already exists.
~~~

~~~text mklink /D sym real  (symlink من CMD عادي ومن غير Developer Mode)
You do not have sufficient privilege to perform this operation.
~~~

يعني [[/D]] (symbolic link) محتاج أدمن أو Developer Mode، و [[/J]] لأ.

---

## ٦. امسح اللينك بس

~~~cmd
rmdir shortcut
~~~

[[rmdir]] من غير [[/s]] بيشيل اللينك نفسه. بعده [[dir /b]] طلّع [[real]] بس، و [[dir /b real]] لسه فيه [[note.txt]]: الأصل سليم.

> **متمسحش اللينك بـ [[del]].** [[del shortcut]] بيدخل جوه اللينك ويمسح ملفات الأصل نفسه، واللينك بيفضل (مجرّب في الدرس، في desc).

---

## الأنواع في جدول

| النوع | الأمر | لـ | أدمن؟ |
|---|---|---|---|
| junction | [[mklink /J link real]] | فولدر، نفس الجهاز | لأ |
| symlink فولدر | [[mklink /D link real]] | فولدر، وبيقبل مسار نسبي وشبكة | أيوه أو Developer Mode |
| symlink ملف | [[mklink link file]] | ملف | زي اللي فوقه |
| hard link | [[mklink /H link file]] | ملف، نفس الدرايف | لأ |

---

## كود الحل: نقل فولدر تقيل

~~~cmd
robocopy big D:\moved\big /E /MOVE
mklink /J big D:\moved\big
~~~

- [[robocopy ... /E /MOVE]] انسخ big بكل الفولدرات اللي جواه ([[/E]]) وامسح الأصل بعد النسخ ([[/MOVE]])، درس robocopy.
- [[mklink /J big D:\moved\big]] اعمل في المكان القديم junction بنفس الاسم، فأي برنامج بيدوّر على big يلاقيه.
- [[dir big]] بيعرض الملفات كأنها في مكانها، و [[dir /al]] بيأكد إن big بقى [[<JUNCTION>]].

---

## الخلاصة

- الترتيب: **اسم اللينك الأول، وبعدين الأصل**.
- [[/J]] للفولدرات من غير أدمن، وده اللي هتستخدمه أغلب الوقت.
- امسح اللينك بـ [[rmdir link]]، مش [[del]] ولا [[rmdir /s]].`,
          lines: [
            "بيعمل فولدر عادي اسمه [[real]]: ده الفولدر الأصلي اللي الملفات هتتحفظ فيه فعلًا.",
            "[[mklink /J]] بيعمل junction: فولدر «وهمي» اسمه [[shortcut]] أي حاجة تتكتب فيه بتروح في [[real]]. الترتيب مهم: اسم اللينك الجديد الأول وبعده الفولدر الأصلي، ولو عكستهم هيقولك إن الفولدر موجود. الـ junction للفولدرات بس، ومش محتاج Admin، عكس [[/D]] (symbolic link) اللي محتاج Admin إلا لو Developer Mode شغّال.",
            "[[echo hi>]] بيكتب [[hi]] في ملف جوه [[shortcut]]. مفيش مسافة قبل [[>]] عشان المسافة كانت هتتكتب في الملف. البرامج كلها بتشوف [[shortcut]] كفولدر عادي، فده بيختبر إن الكتابة فيه بتعدّي للأصل.",
            "[[dir /b]] بيعرض أسامي ملفات [[real]] بس، وهتلاقي [[note.txt]] فيه مع إنك كتبته في [[shortcut]]. ده بيثبت إن الاتنين نفس المكان على الديسك، مش نسختين.",
            "[[dir]] الكامل بيبيّن الفرق: [[shortcut]] مكتوب جنبه [[<JUNCTION>]] بدل [[<DIR>]]، وبعد اسمه المسار الكامل للأصل بين أقواس مربعة. كده تعرف أي junction بيشاور على فين.",
            "[[rmdir]] على junction بيمسح اللينك نفسه بس، و [[real]] بملفاته بيفضل زي ما هو. لكن لو مسحت الملفات اللي **جوه** [[shortcut]] (مثلًا [[del shortcut\\*]]) هتتمسح من الأصل، لأنها هي نفسها ملفات [[real]]."
          ],
          sol: R`جرّبتها في فولدر تجربة (على نفس الدرايف بدل D): [[robocopy big moved\big /E /MOVE]] رجّع errorlevel 1 (يعني نسخ بنجاح) وفولدر big اختفى من مكانه. [[mklink /J big ...\moved\big]] طبع [[Junction created for big <<===>> C:\...\moved\big]]، و [[dir big]] عرض [[a.txt]] و [[b.txt]] كأنهم لسه في مكانهم، و [[dir /al]] عرض اللينك بس: [[<JUNCTION>     big [C:\...\moved\big]]].

لو الدرايف التاني مش موجود، robocopy هيطلّع error ومحدش هيتحرك. ولو mklink قال [[Cannot create a file when that file already exists.]] يبقى big لسه موجود (ملف كان مفتوح فـ robocopy مقدرش يمسحه). وفي الآخر نضّف بـ [[rmdir big]] (اللينك بس)، وبعدين امسح moved لو مش محتاجه.`,
          solCode: R`mkdir big
echo one> big\a.txt
echo two> big\b.txt
robocopy big D:\moved\big /E /MOVE
mklink /J big D:\moved\big
dir big
dir /al`
        },
        {
          cmd: "sfc و DISM",
          title: "صلّح ملفات ويندوز البايظة",
          desc: R`[[sfc /scannow]] بيفحص ملفات ويندوز المحمية ويرجّع أي ملف بايظ أو ناقص من نسخة سليمة، و [[DISM]] بيصلّح المخزن اللي sfc بياخد منه النسخ السليمة. الترتيب اللي Microsoft بتقوله: DISM الأول وبعده sfc، والاتنين من CMD كأدمن.

[[DISM]] (Deployment Image Servicing and Management) بيشتغل على «صورة» ويندوز، و [[/Online]] معناها الويندوز اللي شغال دلوقتي (مش ملف صورة)، و [[/Cleanup-Image]] قسم الصيانة، وبعده واحد من تلاتة:
[[/CheckHealth]] سريع (ثواني): هل اتسجل قبل كده إن فيه بوظان؟
[[/ScanHealth]] فحص كامل (دقايق) من غير تصليح.
[[/RestoreHealth]] فحص وتصليح، وبينزّل النسخ السليمة من Windows Update، فمحتاج نت وممكن ياخد من 10 لـ 30 دقيقة أو أكتر. وكتير بيفضل واقف على نسبة واحدة دقايق، ده عادي.

[[sfc]] (System File Checker): [[/scannow]] افحص وصلّح، و [[/verifyonly]] افحص بس، و [[/scanfile=مسار]] ملف واحد. بيطبع نسبة Verification لحد 100%، وبعدين رسالة من دول:
[[Windows Resource Protection did not find any integrity violations.]] كله سليم.
[[Windows Resource Protection found corrupt files and successfully repaired them.]] لقى ملفات بايظة وصلّحها، اعمل restart.
[[Windows Resource Protection found corrupt files but was unable to fix some of them.]] مقدرش يصلّح كله: شغّل DISM /RestoreHealth وبعده sfc تاني، ولو لسه، التفاصيل في اللوج.
[[Windows Resource Protection could not perform the requested operation.]] الفحص نفسه مكمّلش، و Microsoft بتقول جرّبه في Safe Mode.

اللوج: [[%windir%\Logs\CBS\CBS.log]] ([[%windir%]] فولدر ويندوز، غالبًا [[C:\Windows]])، وده ملف ضخم فيه كل حاجة. السطور اللي تخص sfc بس فيها [[[SR]]]، والسطر الأخير في المثال بيطلّعها في ملف لوحده ([[/c:]] في findstr معناها الكلام ده بالظبط). ولوج DISM في [[%windir%\Logs\DISM\dism.log]]. ومن CMD عادي (مش أدمن) sfc بيقولك [[You must be an administrator running a console session in order to use the sfc utility.]] و DISM بيقول [[Error: 740]] و [[Elevated permissions are required to run DISM.]]. افتح Terminal (Admin) من Win+X (درس «Win+X» في تاب «اختصارات النظام»).`,
          example: R`DISM /Online /Cleanup-Image /CheckHealth
DISM /Online /Cleanup-Image /ScanHealth
DISM /Online /Cleanup-Image /RestoreHealth
sfc /scannow
findstr /c:"[SR]" %windir%\Logs\CBS\CBS.log > "%USERPROFILE%\sfcdetails.txt"`,
          try: R`من Terminal (Admin): شغّل [[DISM /Online /Cleanup-Image /CheckHealth]] واقرا النتيجة، وبعدين [[sfc /verifyonly]] (فحص من غير تصليح). ولو بتعمل الصيانة بجد، شغّل خطوات المثال بالترتيب وافتح sfcdetails.txt.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** من CMD عادي: [[sfc /verifyonly]] و [[DISM /Online /Cleanup-Image /CheckHealth]]، و [[echo %errorlevel%]] بعد كل واحد. (آمنين: من غير أدمن مش هيعملوا حاجة.)`, done: R`sfc طبع [[You must be an administrator running a console session in order to use the sfc utility.]] و 1، و DISM طبع [[Error: 740]] و [[Elevated permissions are required to run DISM.]] و 740. و [[net helpmsg 740]] بيقول [[The requested operation requires elevation.]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** سكربت بيعمل [[sfc /verifyonly | findstr /i "administrator"]] عشان يعرف هل محتاج أدمن، و [[findstr]] مش بيلاقي حاجة مع إن الكلمة في الرسالة. ليه؟`, done: R`errorlevel 1 من findstr: sfc بيكتب ناتجه UTF-16، فلما يتوجّه بيبقى كل حرف بعده بايت صفر (بيبان [[Y o u   m u s t]]) والكلمة متتلاقاش. اعتمد على errorlevel بتاع sfc نفسه أو افحص الأدمن قبلها بـ [[net session]]، واللوج اقراه من [[CBS.log]] بـ [[findstr /c:"[SR]"]].` },
            { lvl: 'تطبيق', t: R`**ابني:** [[repair.bat]] بيبدأ بـ [[net session >nul 2>&1 || (echo run me as admin & exit /b 1)]]، وبعدين DISM CheckHealth ثم ScanHealth ثم sfc /scannow، ويكتب كل خطوة وكودها في [[repair.log]]. شغّل جزء الفحص من نافذة عادية، والسكربت كله في نافذة أدمن أو VM.`, done: R`من نافذة عادية طبع [[run me as admin]] وخرج بـ 1 من غير ما يلمس حاجة. وفي الأدمن اللوج فيه ٣ سطور خطوات بأكوادها، وآخر سطر بيقول هل محتاج restart (من رسالة sfc، والنصوص من وثائق Microsoft).` },
            { lvl: 'تحدي', t: R`**اشرحها:** في ٣ سطور لزميل: ليه DISM قبل sfc ومش العكس، وإيه اللي [[/RestoreHealth]] محتاجه ومش محتاجه [[/CheckHealth]].`, done: R`فيهم: sfc بياخد النسخ السليمة من الـ component store، فلو المخزن نفسه بايظ هيصلّح بنسخ بايظة، و DISM بيصلّح المخزن الأول؛ و [[/RestoreHealth]] بينزّل من Windows Update فمحتاج نت ووقت، و [[/CheckHealth]] بيقرا علامة متسجلة بس في ثواني.` },
          ],
          deep: {
            why: R`ويندوز بيبدأ يعمل حاجات غريبة: برامج ويندوز نفسها بتقفل لوحدها، أو Start أو الإعدادات مش بتفتح، أو update بيفشل كل مرة، أو بعد ما الكهربا قطعت والجهاز بيعمل update. أحيانًا السبب ملفات نظام بايظة، و sfc و DISM بيصلّحوها من غير ما تفرمت أو تخسر ملفاتك وبرامجك.`,
            how: R`ويندوز بيحتفظ بنسخة من مكوّناته في مخزن اسمه component store (فولدر [[C:\Windows\WinSxS]]). [[sfc]] بيقارن كل ملف نظام محمي بالنسخة اللي في المخزن، ولو مختلف بيرجّعها. المشكلة: لو المخزن نفسه بايظ، sfc بيرجّع نسخة بايظة أو يفشل. عشان كده [[DISM /RestoreHealth]] الأول: بيصلّح المخزن من Windows Update، وبعدين sfc ياخد منه نسخ سليمة.

ولو Windows Update نفسه بايظ أو مفيش نت، DISM بيفشل بـ [[0x800f081f]] (The source files could not be found)، والحل تديله مصدر: افتح ISO ويندوز بنفس النسخة (دبل كليك عليه بيعمله درايف، وليكن E) واكتب [[DISM /Online /Cleanup-Image /RestoreHealth /Source:wim:E:\sources\install.wim:1 /LimitAccess]]. [[/Source]] خد الملفات من هنا، و [[:1]] رقم النسخة جوه الملف ولازم يطابق نسختك (Home أو Pro، وتعرف الأرقام بـ [[DISM /Get-WimInfo /WimFile:E:\sources\install.wim]])، و [[/LimitAccess]] متروحش لـ Windows Update. ولو الملف [[install.esd]] اكتب [[esd:]] بدل [[wim:]].

الاتنين بيستهلكوا الديسك والبروسيسور، فمتشغّلش حاجة تقيلة معاهم. والأمرين موجودين في Home و Pro بنفس الشكل، وفي Windows Terminal زي النافذة القديمة، بس لازم «Run as administrator».`,
            when: R`بعد crash أو شاشة زرقا متكررة، أو update بيفشل، أو مكونات ويندوز (Start و Settings و Explorer) بتعلّق، أو قبل ما تقرر تفرمت. ومش «صيانة دورية»: لو الجهاز سليم مش هيفيد بحاجة.`,
            mistakes: R`تشغّل sfc لوحده وتقف عند «unable to fix» من غير DISM. أو تشغّلهم من CMD مش أدمن. أو تقفل النافذة لأن DISM «واقف» على نسبة (ده طبيعي). أو تفتكر إنهم بيصلّحوا برامجك أو الدرايفرات أو الديسك نفسه: دول ملفات ويندوز بس، والديسك ليه chkdsk (الدرس اللي بعده). أو تحفظ sfcdetails على [[%USERPROFILE%\Desktop]] والديسكتوب متنقّل لـ OneDrive، فيطلع [[The system cannot find the path specified.]].`
          },
          teach: R`## الفكرة: صلّح المخزن الأول، وبعدين الملفات

ويندوز شايل نسخة سليمة من ملفاته في مخزن (component store). [[DISM]] بيفحص المخزن ده ويصلّحه، و [[sfc]] بيقارن ملفات النظام بالمخزن ويرجّع أي ملف بايظ. عشان كده الترتيب: DISM الأول (٣ سطور من الخفيف للتقيل)، وبعده sfc، وفي الآخر تقرا اللوج.

> الاتنين محتاجين CMD كأدمن وبيعدّلوا ملفات النظام، فمشغّلتهمش بجد هنا. اللي جرّبته: رسايل الرفض من CMD عادي، وسطر findstr على ملف عيّنة. نواتج النجاح من توثيق Microsoft.

---

## ١. DISM: نفك الاسم

~~~cmd
DISM /Online /Cleanup-Image /CheckHealth
~~~

| الحتة | معناها |
|---|---|
| [[DISM]] | Deployment Image Servicing and Management: أداة صيانة «صورة» ويندوز |
| [[/Online]] | الويندوز الشغال دلوقتي، مش ملف صورة على الديسك |
| [[/Cleanup-Image]] | قسم الصيانة والتصليح |
| [[/CheckHealth]] | بصة سريعة (ثواني): هل اتسجل قبل كده إن فيه بوظان؟ |

على جهاز سليم آخره [[No component store corruption detected.]] و [[The operation completed successfully.]] (من التوثيق). ومن CMD عادي جرّبته وطلع:

~~~text الناتج
Error: 740

Elevated permissions are required to run DISM.
Use an elevated command prompt to complete these tasks.
~~~

و [[%errorlevel%]] طلع [[740]]. افتح Terminal (Admin) من Win+X.

---

## ٢ و ٣. فحص كامل، وبعدين تصليح

~~~cmd
DISM /Online /Cleanup-Image /ScanHealth
DISM /Online /Cleanup-Image /RestoreHealth
~~~

نفس الأول بالظبط، الفرق في الكلمة الأخيرة بس:

| | بيعمل إيه | المدة |
|---|---|---|
| [[/CheckHealth]] | يقرا اللي متسجل بس | ثواني |
| [[/ScanHealth]] | يفحص المخزن كله، من غير تصليح | دقايق |
| [[/RestoreHealth]] | يفحص ويصلّح، والنسخ السليمة من Windows Update (محتاج نت) | ممكن نص ساعة |

[[/RestoreHealth]] كتير بيقف على نسبة واحدة دقايق، ده طبيعي فمتقفلش النافذة.

---

## ٤. [[sfc /scannow]]

~~~cmd
sfc /scannow
~~~

[[sfc]] = System File Checker، و [[/scannow]] افحص كل ملفات النظام المحمية دلوقتي وصلّح. بيطبع [[Verification]] بنسبة لحد 100%، وبعدين رسالة من أربعة (في desc). من CMD عادي:

~~~text الناتج
You must be an administrator running a console session in order to use the sfc utility.
~~~

(الرسالة طلعت عندي بمسافة بين كل حرف والتاني لما حوّلتها لملف، لأن sfc بيكتب UTF-16، بس على الشاشة بتظهر عادي.)

---

## ٥. طلّع سطور sfc من اللوج

~~~cmd
findstr /c:"[SR]" %windir%\Logs\CBS\CBS.log > "%USERPROFILE%\sfcdetails.txt"
~~~

من جوه لبرة:

### [[%windir%\Logs\CBS\CBS.log]]

[[%windir%]] متغير فيه فولدر ويندوز (عندي طبع [[C:\WINDOWS]])، و [[CBS.log]] لوج ضخم لكل عمليات الصيانة، و sfc بيكتب سطوره فيه وقبلها [[[SR]]].

### [[findstr /c:"[SR]"]]

[[findstr]] بيدوّر على كلام جوه ملف ويطبع السطور اللي فيها. و [[/c:]] معناها «الكلام ده بالظبط كجملة واحدة». ليه مهمة هنا؟ لأن findstr من غيرها بيعتبر [[[SR]]] **regex**: الأقواس المربعة يعني «حرف S أو حرف R». جرّبت الاتنين على ملف عيّنة فيه ٤ سطور:

~~~text findstr /c:"[SR]" sample.log
2026-10-06 10:00:02, Info CSI 00000001 [SR] Verifying 100 components
2026-10-06 10:00:04, Info CSI 00000003 [SR] Repairing 0 components
~~~

~~~text findstr "[SR]" sample.log
2026-10-06 10:00:01, Info CBS Loaded Servicing Stack
2026-10-06 10:00:02, Info CSI 00000001 [SR] Verifying 100 components
2026-10-06 10:00:03, Info CSI 00000002 SR is not this line
2026-10-06 10:00:04, Info CSI 00000003 [SR] Repairing 0 components
~~~

من غير [[/c:]] طلعت الأربعة، لأن كل سطر فيه S أو R في أي حتة.

### [[> "%USERPROFILE%\sfcdetails.txt"]]

[[>]] ودّي الناتج لملف بدل الشاشة، في فولدر يوزرك. علامات التنصيص عشان المسار ممكن يبقى فيه مسافات. ولو فيه ملف sfc مقدرش يصلّحه، هتلاقي في الملف سطر فيه [[Cannot repair member file]].

---

## الخلاصة

| الترتيب | الأمر | ليه |
|---|---|---|
| ١ | [[DISM ... /CheckHealth]] | بصة سريعة |
| ٢ | [[DISM ... /ScanHealth]] | فحص كامل للمخزن |
| ٣ | [[DISM ... /RestoreHealth]] | صلّح المخزن |
| ٤ | [[sfc /scannow]] | صلّح ملفات النظام من المخزن |
| ٥ | [[findstr /c:"[SR]" ...]] | اقرا اللي sfc عمله |

كله من CMD **كأدمن**، وده بيصلّح ملفات ويندوز بس، مش برامجك ولا الديسك.`,
          lines: [
            R`بصة سريعة: فيه بوظان متسجل قبل كده؟ (ثواني).`,
            R`فحص كامل للمخزن من غير تصليح (دقايق).`,
            R`صلّح المخزن من Windows Update (محتاج نت، وممكن نص ساعة).`,
            R`افحص ملفات النظام وصلّحها من المخزن اللي لسه متصلّح.`,
            R`طلّع سطور sfc بس من اللوج في ملف في فولدرك.`
          ],
          sol: R`(مشغّلتهمش هنا لأنهم محتاجين أدمن وبيعدّلوا ملفات النظام؛ اللي جاي من توثيق Microsoft.) [[CheckHealth]] على جهاز سليم بيطبع نسخة الأداة ونسخة الصورة، وبعدين [[No component store corruption detected.]] و [[The operation completed successfully.]]. لو طلع [[The component store is repairable.]] شغّل RestoreHealth، وآخره المفروض [[The restore operation completed successfully.]].

[[sfc /verifyonly]] و [[sfc /scannow]] بيطبعوا [[Beginning system scan. This process will take some time.]] وبعدين [[Verification 100% complete.]] والرسالة النهائية (واحدة من الأربعة اللي في الشرح). و sfcdetails.txt سطوره بتبدأ بالتاريخ وفيها [[[SR]]]، ولو فيه ملف مقدرش يصلّحه هتلاقي سطر فيه [[Cannot repair member file]] واسم الملف. (سطر findstr نفسه جرّبته على ملف عيّنة: [[/c:"[SR]"]] جاب السطر اللي فيه [[[SR]]] بس، مش أي سطر فيه S أو R.)`
        },
        {
          cmd: "chkdsk",
          title: "افحص الديسك وصلّح نظام الملفات",
          desc: R`[[chkdsk]] (check disk) بيفحص نظام الملفات على درايف (NTFS أو FAT) ويقولك فيه أخطاء ولا لأ، ومع [[/f]] أو [[/r]] بيصلّحها. محتاج CMD كأدمن في كل الحالات.

من غير إضافات ([[chkdsk C:]]) بيفحص بس ومش بيغيّر حاجة (read-only)، وبيطبع [[WARNING! /F parameter not specified.]] و [[Running CHKDSK in read-only mode.]]، وبعدين المراحل ([[Stage 1]] و 2 و 3)، وفي الآخر النتيجة وملخص المساحة. لو سليم: [[Windows has scanned the file system and found no problems.]] و [[No further action is required.]].

الإضافات:
[[/scan]] (NTFS بس) فحص والدرايف شغال عادي، وبيصلّح اللي يقدر عليه وهو شغال، واللي محتاج الدرايف يقف بيتسجل لبعدين. ابدأ بيه.
[[/f]] صلّح أخطاء نظام الملفات. لازم يقفل الدرايف (lock): على درايف تاني زي D بيقفله ويصلّح على طول (اقفل أي برنامج فاتح منه ملفات)، وعلى درايف ويندوز (C) مستحيل يقفله وهو شغال، فبيسألك [[Would you like to schedule this volume to be checked the next time the system restarts? (Y/N)]]، ولو قلت Y بيشتغل مع الـ restart الجاي قبل ما ويندوز يفتح.
[[/r]] كل اللي [[/f]] بيعمله، وكمان بيقرا كل sector في الدرايف يدوّر على أماكن تالفة ويحاول ينقذ اللي عليها. على هارد كبير (HDD) ممكن ياخد ساعات.
[[/x]] زي [[/f]] بس بيقفل الدرايف غصب حتى لو برامج فاتحة منه ملفات (وشغلها المفتوح بيضيع).

[[chkntfs C:]] بيقولك هل الدرايف «dirty» (ويندوز حاسس إن فيه مشكلة وهيفحصه في الـ boot الجاي) ولا لأ. والفحص مع الـ restart بيظهر كشاشة Scanning and repairing drive قبل ما ويندوز يفتح، ومتقفلش الجهاز في النص. ونتايجه بتتسجل في Event Viewer (Windows Logs ثم Application، المصدر Wininit).`,
          example: R`chkdsk C:
chkdsk C: /scan
chkdsk D: /f
chkdsk C: /f
chkdsk C: /r
chkntfs C:`,
          try: R`من CMD أدمن: شغّل [[chkdsk C: /scan]] واقرا آخر سطرين. ولو عندك فلاشة مفيهاش حاجة مهمة، جرّب [[chkdsk E: /f]] عليها (حط حرفها بدل E) بعد ما تقفل أي ملف مفتوح منها.`,
          flag: "danger",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** من CMD عادي: [[chkdsk C:]] و [[chkntfs C:]] و [[fsutil dirty query C:]]، والـ errorlevel بعد كل واحد. (قراية بس، ومن غير أدمن هيترفضوا.)`, done: R`chkdsk: [[Access Denied as you do not have sufficient privileges or]] و [[the disk may be locked by another process.]] و 3. و chkntfs: [[Cannot query state of drive C:]] و 2. و fsutil: [[Error 5: Access is denied.]] و 1. التلاتة محتاجين نافذة أدمن حتى للقراية.` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** من [[chkdsk /?]] اعرف الفرق بين [[/scan]] و [[/spotfix]] و [[/f]]، ومن وثائق Microsoft معنى أكواد الخروج 0 و 1 و 2 و 3.`, done: R`[[/scan]] فحص أونلاين والدرايف شغال، و [[/spotfix]] بيصلّح اللي اتسجل من الـ scan في ثواني (على C بيحتاج restart)، و [[/f]] تصليح كامل بيقفل الدرايف. والأكواد من الوثائق: 0 مفيش أخطاء، 1 لقى وصلّح، 2 عمل تنضيف أو محتاج [[/f]]، 3 مقدرش يفحص (وده اللي شفناه من غير أدمن).` },
            { lvl: 'تحدي', t: R`**محاكاة:** فحص read-only على D طلّع إن فيه مشاكل، وعلى C نفس الكلام. اكتب الأمر اللي بعده لكل درايف، وإيه اللي هيحصل لو برنامج فاتح ملف من D، وإيه السؤال اللي هيطلع على C.`, done: R`D: [[chkdsk D: /f]] وهيطلب يقفل الدرايف (لو فيه ملف مفتوح هيسأل يعمل dismount أو يأجّل)، و C: [[chkdsk C: /f]] بيطلّع [[Would you like to schedule this volume to be checked the next time the system restarts? (Y/N)]] والفحص بيحصل في الـ boot. (من الدرس ووثائق Microsoft، ومتشغّلش على جهازك.)` },
          ],
          deep: {
            why: R`الجهاز اتقفل فجأة (كهربا أو تعليق)، أو فلاشة اتشالت من غير Eject، أو ملفات بقت مش بتفتح أو فولدر مش بيتمسح ويقولك [[The file or directory is corrupted and unreadable]]. ده غالبًا خطأ في نظام الملفات نفسه (مش في محتوى الملف)، و chkdsk هو اللي بيصلّحه.`,
            how: R`نظام الملفات (NTFS) فيه جداول بتقول كل ملف اسمه إيه ومكانه فين على الديسك. لو الكتابة اتقطعت في النص، الجداول دي ممكن تبقى مش متطابقة. [[chkdsk]] بيمر عليها مرحلة مرحلة: Stage 1 الملفات نفسها، و Stage 2 الفولدرات، و Stage 3 الصلاحيات، ومع [[/r]] مراحل زيادة بتقرا الديسك كله.

ليه الـ restart مع C؟ عشان [[/f]] لازم يقفل الدرايف ومحدش يكتب عليه، وويندوز نفسه شغال من C. فبيعلّم الدرايف، وبرنامج اسمه autochk بيشتغل في أول الـ boot قبل ما ويندوز يفتح ملفاته.

[[/scan]] (من ويندوز 8) هو الطريقة الحديثة على NTFS: بيفحص والدرايف شغال، ولو لقى حاجة محتاجة الدرايف يقف بيسجلها، و [[chkdsk C: /spotfix]] بيصلّح الحاجات دي بس مع restart قصير بدل فحص الدرايف كله.

exit code بعد ما يخلص: 0 مفيش أخطاء، و 1 لقى أخطاء وصلّحها، و 2 عمل تنضيف أو مكانش معاه [[/f]]، و 3 مقدرش يفحص أو فيه أخطاء متصلّحتش.

SSD: [[/r]] بيقرا كل حتة في الـ SSD، فمش خطير بس ملوش لازمة كل شوية (توثيق Microsoft بيقول إن الفحص الكامل المتكرر بيزوّد الكتابة على الـ SSD شوية). وصحة الـ SSD نفسه بتتعرف من أداة الشركة المصنعة أو SMART، مش من chkdsk.`,
            when: R`بعد قفلة مفاجئة أو قطع كهربا، أو فلاشة أو هارد خارجي ويندوز بيقولك عليه «Scan and fix»، أو رسالة corrupted and unreadable، أو قبل ما تنسخ بيانات مهمة من هارد شاكك فيه.`,
            mistakes: R`[[chkdsk C: /r]] على هارد قديم كبير وانت مستعجل، فالجهاز يفضل ساعات قبل ما يفتح. أو تقفل الجهاز في نص الفحص. أو [[/f]] أو [[/r]] على هارد بيموت (بيطلّع أصوات أو بيفصل): انسخ بياناتك الأول، لأن الفحص التقيل ممكن يخلّص عليه. أو تتخض من أخطاء [[chkdsk C:]] من غير [[/f]] على درايف شغال: توثيق Microsoft بيقول إنه ممكن يطلّع أخطاء مش حقيقية لأنه مش قادر يقفل الدرايف، فاتأكد بـ [[/scan]]. أو [[/x]] على درايف عليه شغل مفتوح فيضيع.`
          },
          teach: R`## الفكرة: درايف + قد إيه تتعمق

كل سطر في المثال: [[chkdsk]] وبعده **حرف الدرايف** بنقطتين ([[C:]] أو [[D:]])، وبعده إضافة بتحدد العمق: فحص بس، أو فحص وتصليح والدرايف شغال، أو تصليح كامل، أو تصليح وقراية كل حتة في الديسك.

> chkdsk محتاج أدمن في كل حالاته، وبيلمس نظام الملفات، فمشغّلتهوش بجد. جرّبت من CMD عادي عشان أشوف الرفض، والباقي من توثيق Microsoft Learn. ونظام الملفات هنا NTFS (اللي على C في أي ويندوز حديث).

---

## ١. فحص بس: [[chkdsk C:]]

~~~cmd
chkdsk C:
~~~

من غير أي إضافة: **read-only**، بيفحص ومش بيغيّر حاجة. على جهاز سليم (من التوثيق) بيطبع:

~~~text الناتج (من التوثيق)
The type of the file system is NTFS.
WARNING! /F parameter not specified.
Running CHKDSK in read-only mode.
Stage 1: Examining basic file system structure ...
Stage 2: Examining file name linkage ...
Stage 3: Examining security descriptors ...
Windows has scanned the file system and found no problems.
No further action is required.
~~~

| المرحلة | بتفحص إيه |
|---|---|
| [[Stage 1]] | الملفات نفسها (سجلاتها في جدول NTFS) |
| [[Stage 2]] | الفولدرات: كل اسم بيشاور على ملف موجود؟ |
| [[Stage 3]] | الصلاحيات (security descriptors) |

ومن CMD عادي جرّبته:

~~~text الناتج
Access Denied as you do not have sufficient privileges or
the disk may be locked by another process.
You have to invoke this utility running in elevated mode
and make sure the disk is unlocked.
~~~

و [[%errorlevel%]] طلع [[3]] (يعني «مقدرش يفحص»).

---

## ٢. [[chkdsk C: /scan]]

~~~cmd
chkdsk C: /scan
~~~

[[/scan]] (NTFS بس، من ويندوز 8): فحص **والدرايف شغال**، ويصلّح اللي يقدر عليه من غير ما يوقف حاجة، واللي محتاج الدرايف يقف بيسجله لبعدين. ابدأ دايمًا بيه.

---

## ٣. [[chkdsk D: /f]] على درايف تاني

~~~cmd
chkdsk D: /f
~~~

[[/f]] (fix): صلّح أخطاء نظام الملفات. عشان يصلّح لازم **يقفل** الدرايف (lock) ومحدش يكتب عليه. على D (مش درايف ويندوز) بيقفله ويصلّح على طول. لو فيه ملف مفتوح منه، هيقولك [[Chkdsk cannot run because the volume is in use by another process.]] ويعرض يفصل الدرايف غصب؛ اقفل الملف الأول.

---

## ٤. [[chkdsk C: /f]] على درايف ويندوز

~~~cmd
chkdsk C: /f
~~~

نفس الأمر، بس ويندوز نفسه شغال من C، فمستحيل يتقفل. فبيسألك:

~~~text الناتج (من التوثيق)
Would you like to schedule this volume to be checked the next time the system restarts? (Y/N)
~~~

لو قلت [[Y]]، مع الـ restart الجاي برنامج اسمه autochk بيشتغل **قبل** ما ويندوز يفتح ويصلّح، وبتشوف شاشة Scanning and repairing drive. متقفلش الجهاز في النص.

---

## ٥. [[chkdsk C: /r]]

~~~cmd
chkdsk C: /r
~~~

[[/r]] (recover) = كل اللي [[/f]] بيعمله، **وكمان** بيقرا كل sector في الديسك (أصغر حتة الديسك بيقرا ويكتب بيها) يدوّر على أماكن تالفة وينقذ اللي عليها. على C برضه مع الـ restart، وعلى هارد كبير HDD ممكن ياخد ساعات.

---

## ٦. [[chkntfs C:]]

~~~cmd
chkntfs C:
~~~

بيسأل: هل الدرايف متعلّم «dirty» (ويندوز حاسس إن فيه مشكلة وهيفحصه في الـ boot الجاي)؟ ولا لأ. ده كمان من CMD عادي طلّع:

~~~text الناتج
Cannot query state of drive C:
~~~

و errorlevel [[2]]. من CMD أدمن بيقول الدرايف dirty ولا لأ.

---

## الخلاصة

| الإضافة | بتعمل إيه | الدرايف بيقف؟ |
|---|---|---|
| (ولا حاجة) | فحص بس | لأ |
| [[/scan]] | فحص وتصليح خفيف | لأ |
| [[/f]] | تصليح نظام الملفات | أيوه (C = مع الـ restart) |
| [[/r]] | [[/f]] + قراية كل sector | أيوه، وممكن ساعات |
| [[/x]] | [[/f]] وافصل الدرايف غصب | أيوه، والمفتوح بيضيع |

والترتيب العاقل: [[/scan]] الأول، و [[/f]] لو لقى حاجة، و [[/r]] بس لو شاكك في الديسك نفسه. وكله من CMD **كأدمن**.`,
          lines: [
            R`فحص بس، من غير أي تصليح (read-only).`,
            R`فحص وتصليح والدرايف شغال عادي (NTFS).`,
            R`صلّح درايف مش درايف ويندوز: بيقفله ويصلّح على طول.`,
            R`درايف ويندوز: هيسألك يجدوله مع الـ restart الجاي.`,
            R`تصليح ودوّر على sectors تالفة (ممكن ساعات)، وبرضه مع الـ restart.`,
            R`هل الدرايف متعلّم إنه محتاج فحص؟`
          ],
          sol: R`(chkdsk محتاج أدمن وبيلمس الديسك فمشغّلتهوش هنا؛ اللي جاي من توثيقه على Microsoft Learn والرسايل المعروفة.) [[chkdsk C: /scan]] بيطبع [[The type of the file system is NTFS.]] واسم الدرايف، وبعدين المراحل، ولو سليم [[Windows has scanned the file system and found no problems.]] و [[No further action is required.]] وتحتها أرقام المساحة. من CMD مش أدمن هيقولك [[Access Denied as you do not have sufficient privileges or the disk may be locked by another process.]]، وحتى [[chkntfs C:]] من غير أدمن طلّع عندي [[Cannot query state of drive C:]].

على فلاشة: [[chkdsk E: /f]] بيقفل الدرايف ويفحص ويطبع النتيجة على طول. ولو ملف مفتوح من الفلاشة هيقولك [[Chkdsk cannot run because the volume is in use by another process.]] ويعرض يفصل الدرايف غصب (dismount) قبل ما يكمّل، فاقفل الملف الأول بدل ما توافق.`
        },
        {
          cmd: "diskpart",
          title: "صلّح فلاشة: حجم غلط أو write protected أو RAW",
          desc: R`[[diskpart]] أداة الديسكات والبارتيشنات في ويندوز، وبتشتغل في نافذة لوحدها بـ prompt [[DISKPART>]] ومحتاجة أدمن. أشهر استخدام: فلاشة بتقول حجمها 32 ميجا وهي 32 جيجا، أو «The disk is write protected»، أو ويندوز بيقولك «You need to format the disk» (RAW)، فتمسح جدولها خالص وتعملها من الأول.

الخطوات جوه diskpart:
[[list disk]] كل الديسكات بأرقامها وأحجامها، و [[Disk 0]] غالبًا ديسك ويندوز.
[[select disk 2]] اختار الفلاشة. دي أخطر خطوة في الدرس: كل اللي بعدها بيتنفذ على الديسك ده، ولو اخترت رقم ديسكك هتمسحه.
[[detail disk]] اتأكد إنها هي: الموديل و [[Type : USB]] والفوليومات اللي عليها بحروفها.
[[attributes disk clear readonly]] شيل علامة «قراية بس» (لو write protected من ويندوز).
[[clean]] امسح جدول البارتيشنات كله، فالديسك يبقى فاضي من غير ولا بارتيشن. و [[clean all]] بيكتب أصفار على الديسك كله (ممكن ساعات).
[[create partition primary]] بارتيشن واحد بكل المساحة.
[[format fs=exfat quick label=USB]] فرمتة: [[fs=]] نظام الملفات ([[exfat]] للفلاشات، بيشتغل على ويندوز وماك وأجهزة كتير وبيقبل ملفات أكبر من 4 جيجا، و [[ntfs]] لويندوز، و [[fat32]] للأجهزة القديمة)، و [[quick]] من غير ما يقرا كل sector، و [[label=]] الاسم.
[[assign]] ادّيها حرف درايف عشان تظهر في Explorer.
[[exit]] اخرج.

و [[diskpart /s file.txt]] بينفّذ الأوامر من ملف من غير ما يسأل، وده أخطر لأن مفيش لحظة تبص فيها على الرقم.`,
          example: R`diskpart
list disk
select disk 2
detail disk
attributes disk clear readonly
clean
create partition primary
format fs=exfat quick label=USB
assign
exit`,
          try: R`من CMD أدمن: افتح diskpart واكتب [[list disk]] و [[list volume]] بس، واعرف رقم كل ديسك وحجمه، وبعدين [[exit]]. select و clean على فلاشة متأكد إن مفيهاش حاجة بس، وبعد ما تفصل أي هارد خارجي تاني.`,
          flag: "danger",
          practice: [
            { lvl: 'سريع', t: R`**محاكاة:** [[list disk]] طلّع [[Disk 0  Online  476 GB]] و [[Disk 1  Online  931 GB]] و [[Disk 2  Online  28 GB]]. الفلاشة ٣٢ جيجا. أنهي رقم؟ وإيه الأمر اللي تتأكد بيه قبل [[clean]]؟`, done: R`Disk 2 (الفلاشات بتبان أقل من المكتوب عليها: ٣٢ «جيجا» بالعشري حوالي ٢٨–٢٩ GiB)، والتأكيد [[detail disk]] بعد [[select disk 2]]: لازم [[Type : USB]] والموديل بتاع الفلاشة. (مثال مخترع، diskpart متشغّلش هنا.)` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** ملف [[usb.txt]] فيه [[select disk 2]] و [[clean]] و [[create partition primary]] و [[format fs=exfat quick]] و [[assign]]، واتشغّل بـ [[diskpart /s usb.txt]] بعد ما وصّلت هارد خارجي قبل الفلاشة. إيه اللي ممكن يحصل؟`, done: R`أرقام الديسكات بتتغيّر بترتيب التوصيل، فممكن Disk 2 يبقى الهارد الخارجي و [[clean]] يمسحه من غير أي سؤال، لأن [[/s]] مفيهاش لحظة تبص فيها. فالسكربت ده بيتكتب في VM بس أو بعد [[detail disk]] يدوي كل مرة.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من وثائق Microsoft لـ diskpart: الفرق بين [[clean]] و [[clean all]]، وبين [[list disk]] و [[list volume]]، وإزاي تجرّب السكربت على ديسك وهمي ([[create vdisk]]) في VM أو Windows Sandbox بدل فلاشة حقيقية.`, done: R`[[clean]] بيمسح جدول البارتيشنات بس، و [[clean all]] بيكتب أصفار على كل sector (ساعات)؛ [[list disk]] الديسكات الفيزيائية و [[list volume]] الفوليومات بحروفها؛ و [[create vdisk file=C:\lab\test.vhdx maximum=512 type=expandable]] ثم [[attach vdisk]] بيدّيك ديسك تجرّب عليه [[clean]] و [[format]] من غير خطر. (كله من الوثائق.)` },
          ],
          deep: {
            why: R`فلاشة اتكتب عليها ISO (لينكس أو ويندوز بـ Rufus أو dd) بقت بتظهر بحجم صغير أو مش بتظهر خالص، أو كارت ميموري من كاميرا بقى RAW، أو الفرمتة من Explorer بتفشل. Explorer بيفرمت البارتيشن الموجود بس، و diskpart بيمسح الجدول نفسه ويبدأ من الصفر.`,
            how: R`الديسك عليه جدول بارتيشنات (MBR أو GPT) بيقول فين كل بارتيشن، وكل بارتيشن عليه نظام ملفات. صور الـ ISO بتكتب جدول غريب أو بارتيشنات مخفية، فويندوز يشوف جزء صغير بس. [[clean]] بيكتب فوق الجدول بس (على MBR جدول البارتيشنات والـ sectors المخفية، وعلى GPT الجدول والـ protective MBR)، فبيخلص في ثانية والبيانات نفسها لسه على الديسك نظريًا، و [[clean all]] هو اللي بيمسحها فعلًا.

إزاي تعرف الفلاشة؟ الحجم أهم حاجة: فلاشة 32 جيجا بتظهر حوالي [[28 GB]] أو [[29 GB]] (الشركة بتحسب الجيجا ألف ميجا وويندوز بيحسبها 1024)، وديسكك الأساسي مئات الجيجات. لو عندك ديسكين قريبين في الحجم: افصل الفلاشة واعمل [[list disk]]، ووصّلها واعمله تاني، والرقم اللي ظهر هو هي. و [[list disk]] بيحط [[*]] جنب الديسك المختار، و [[detail disk]] آخر تأكيد قبل clean.

write protected: [[attributes disk clear readonly]] بيشيل العلامة اللي ويندوز حاططها بس. لو الكارت فيه زرار Lock (كروت SD)، أو الفلاشة قفلت نفسها لأنها خلص عمرها (بيحصل كتير مع الفلاشات الرخيصة)، مفيش أمر هيصلّحها.

و FAT32 أدوات ويندوز تاريخيًا مش بترضى تعمله على بارتيشن أكبر من 32 جيجا، فاستخدم exfat. وفي سكربت [[/s]] أي error بيوقف diskpart بـ exit code غير صفر، إلا لو الأمر فيه [[noerr]]. والمقابل في PowerShell: [[Get-Disk]] و [[Clear-Disk]] و [[New-Partition]] و [[Format-Volume]] (في تاب «PowerShell»)، والواجهة [[diskmgmt.msc]] بتعمل أغلب ده ماعدا clean.`,
            when: R`فلاشة بعد ISO، كارت ميموري RAW، فلاشة write protected، هارد خارجي جديد عايز تبدأه نضيف، أو قبل ما تبيع أو تدّي حد فلاشة ([[clean all]]).`,
            mistakes: R`[[select disk]] بالرقم الغلط، ودي الغلطة اللي بتمسح ويندوز أو هارد الباك أب، فاعمل [[detail disk]] كل مرة. أو تكتب الخطوات من الذاكرة ورا بعض بسرعة. أو تسيب هارد الباك أب متوصل وانت بتعمل ده. أو تفتكر [[clean]] بيمسح البيانات بأمان (هو بيمسح الجدول بس). أو تنسى [[assign]] فالفلاشة متظهرش في Explorer. أو تحاول تصلّح فلاشة قفلت نفسها هاردوير.`
          },
          teach: R`## الفكرة: اختار، اتأكد، امسح، ابني من جديد

المثال مش أوامر CMD عادية: أول سطر بيفتح diskpart، وكل اللي بعده بيتكتب **جوه** diskpart عند [[DISKPART>]]. والمنطق: كل الأوامر بتشتغل على «الحاجة المختارة» (focus)، فبتختار الديسك مرة واحدة وكل اللي بعده بيتنفذ عليه.

> diskpart مشغّلتهوش خالص: محتاج أدمن، وبيفتح نافذة لوحده، ورقم غلط واحد بيمسح ديسك. كل الناتج تحت من توثيق Microsoft ورسايل diskpart المعروفة.

---

## ١. [[diskpart]]

~~~cmd
diskpart
~~~

بيطلّع UAC، وبيفتح نافذة جديدة فيها:

~~~text
DISKPART>
~~~

من هنا ورايح انت جوه diskpart، والأوامر بتاعة CMD (زي [[dir]]) مش شغالة.

---

## ٢. [[list disk]]

~~~text
DISKPART> list disk

  Disk ###  Status         Size     Free     Dyn  Gpt
  --------  -------------  -------  -------  ---  ---
  Disk 0    Online          953 GB  1024 KB        *
  Disk 2    Online           28 GB      0 B
~~~

| العمود | معناه |
|---|---|
| [[Disk ###]] | رقم الديسك، وده اللي هتختار بيه |
| [[Size]] | الحجم، **وبيه بتعرف الفلاشة** |
| [[Free]] | مساحة مش متقسمة لبارتيشنات |
| [[Gpt]] | [[*]] يعني جدول البارتيشنات نوعه GPT، وفاضي يعني MBR |

ليه الفلاشة 32 جيجا بتظهر 28؟ الشركة بتحسب الجيجا 1000 × 1000 × 1000 بايت، وويندوز بيحسبها 1024 × 1024 × 1024، فالرقم بيقل حوالي 7%، وكمان الفلاشات بتحجز جزء لنفسها.

---

## ٣. [[select disk 2]]

~~~text
DISKPART> select disk 2

Disk 2 is now the selected disk.
~~~

**أخطر سطر في الدرس.** من دلوقتي أي [[clean]] أو [[format]] بيتنفذ على ديسك 2. لو كتبت 0 هتمسح ويندوز. لو مش متأكد: افصل الفلاشة واعمل [[list disk]]، ووصّلها واعمله تاني؛ الرقم اللي ظهر هو هي.

---

## ٤. [[detail disk]]

~~~text
DISKPART> detail disk

SanDisk Ultra USB Device
Type   : USB
...
~~~

آخر تأكيد: اسم الموديل، و [[Type : USB]]، وتحت لستة الفوليومات بحروفها. لو شفت [[Type : NVMe]] أو [[SATA]] وحرف [[C]]، **اقف**: ده مش الفلاشة.

---

## ٥. [[attributes disk clear readonly]]

~~~text
DISKPART> attributes disk clear readonly

Disk attributes cleared successfully.
~~~

- [[attributes disk]] صفات الديسك المختار، و [[clear readonly]] شيل صفة «قراية بس».
- ده بيشيل العلامة اللي ويندوز حاططها بس. لو الفلاشة مقفولة هاردوير، [[attributes disk]] لوحده هيفضل يقول [[Current Read-only State : Yes]].

---

## ٦. [[clean]]

~~~text
DISKPART> clean

DiskPart succeeded in cleaning the disk.
~~~

بيمسح **جدول البارتيشنات** (MBR أو GPT) في ثانية، فالديسك يبقى من غير ولا بارتيشن. البيانات نفسها لسه على الديسك نظريًا؛ [[clean all]] هو اللي بيكتب أصفار على كل حاجة (ممكن ساعات).

---

## ٧. [[create partition primary]]

~~~text
DISKPART> create partition primary

DiskPart succeeded in creating the specified partition.
~~~

بارتيشن واحد من النوع الأساسي ([[primary]]) بكل المساحة، لأننا محددناش [[size=]]. و diskpart بيختار البارتيشن الجديد لوحده، فالسطر الجاي بيشتغل عليه.

---

## ٨. [[format fs=exfat quick label=USB]]

~~~text
DISKPART> format fs=exfat quick label=USB

  100 percent completed

DiskPart successfully formatted the volume.
~~~

| الحتة | معناها |
|---|---|
| [[fs=exfat]] | نظام الملفات: exFAT، بيشتغل على ويندوز وماك وبيقبل ملفات أكبر من 4 جيجا |
| [[quick]] | سريع: من غير ما يقرا كل sector |
| [[label=USB]] | الاسم اللي هيظهر في Explorer |

---

## ٩ و ١٠. [[assign]] و [[exit]]

~~~text
DISKPART> assign

DiskPart successfully assigned the drive letter or mount point.

DISKPART> exit
~~~

[[assign]] من غير حرف بيدّي أول حرف فاضي، والفلاشة تظهر في Explorer. و [[exit]] يخرج ويقفل النافذة.

---

## الخلاصة

| الخطوة | الأمر | خطر؟ |
|---|---|---|
| شوف | [[list disk]] | لأ |
| اختار | [[select disk N]] | **الرقم هو كل حاجة** |
| اتأكد | [[detail disk]] | لأ، ومتسيبهاش |
| امسح | [[clean]] | بيمسح الجدول |
| ابني | [[create partition primary]] ثم [[format ...]] ثم [[assign]] | |

قبل ما تبدأ: افصل أي هارد خارجي تاني، واعمل [[detail disk]] كل مرة قبل [[clean]].`,
          lines: [
            "بيفتح أداة diskpart في نافذة تانية، والـ prompt بيبقى [[DISKPART>]]: كل اللي بعده أوامر جوه الأداة دي مش أوامر CMD. محتاجة Admin، ومن غيره هيطلعلك طلب UAC أو هتترفض.",
            "بيعرض كل الديسكات المتوصلة بأرقامها ([[Disk 0]]، [[Disk 1]]…) وحجم كل واحد. الرقم ده اللي هتختار بيه في السطر الجاي، فاعرف الفلاشة من حجمها (مثلًا ٧ أو ١٤ GB) مش من ترتيبها، لأن الترتيب بيتغيّر لو وصّلت حاجة تانية.",
            "بيخلّي ديسك رقم ٢ هو «المختار»، وكل الأوامر اللي بعده هتتنفّذ عليه هو. ده أخطر سطر في المثال: لو الرقم غلط، [[clean]] اللي جاي هيمسح الديسك اللي عليه الويندوز أو الداتا بتاعتك من غير ما يسأل.",
            "بيطبع تفاصيل الديسك المختار: الموديل، و [[Type : USB]]، والـ volumes والحروف اللي عليه. ده الفحص قبل المسح: لو الموديل أو النوع مش هو الفلاشة، اخرج وماتكملش.",
            "بيشيل علامة «قراية بس» (readonly) من الديسك المختار. لازمة بس لو الفلاشة بتقول write protected والكتابة بتترفض. لو الحماية من زرار على الفلاشة نفسها أو الفلاشة بايظة، السطر ده مش هيفرق.",
            "بيمسح جدول البارتيشنات كله من الديسك المختار، فكل البارتيشنات والملفات بتختفي من غير سؤال تأكيد. مفيش undo هنا، عشان كده الخطوتين اللي قبله.",
            "بيعمل بارتيشن واحد primary بكل المساحة الفاضية (مكتبتش [[size=]] فبياخد الكل). بعد [[clean]] الديسك بقى فاضي ومحتاج بارتيشن قبل ما يتفرمت.",
            "بيفرمت البارتيشن بنظام ملفات exFAT. [[quick]] بيكتب نظام الملفات بس من غير ما يفحص كل الديسك (ثواني بدل دقايق)، و [[label=USB]] الاسم اللي هيظهر في Explorer. exFAT بيقبل ملفات أكبر من ٤ GB وبيشتغل على ويندوز وماك.",
            "بيدّي البارتيشن حرف درايف (أول حرف فاضي، زي [[E:]]). من غيره الفلاشة متفرمتة بس مش هتظهر في Explorer ولا تقدر تكتب [[E:]] في CMD.",
            "بيخرج من diskpart ويقفل نافذتها. التغييرات اتعملت فعلًا مع كل أمر، فمفيش «حفظ» قبل الخروج."
          ],
          sol: R`(diskpart مشغّلتهوش خالص: محتاج أدمن، وغلطة رقم واحدة بتمسح ديسك. اللي جاي من توثيق Microsoft ورسايل diskpart المعروفة.) من CMD عادي [[diskpart]] بيطلّع UAC ويفتح نافذة لوحده. [[list disk]] بيطبع جدول [[Disk ###  Status  Size  Free  Dyn  Gpt]]، زي [[Disk 0  Online  953 GB  1024 KB  *]] (النجمة تحت Gpt) و [[Disk 2  Online  28 GB  0 B]] (الفلاشة). بعد [[select disk 2]]: [[Disk 2 is now the selected disk.]]، و [[detail disk]] فيه اسم الفلاشة و [[Type   : USB]].

بعدها بالترتيب: [[Disk attributes cleared successfully.]]، و [[DiskPart succeeded in cleaning the disk.]]، و [[DiskPart succeeded in creating the specified partition.]]، و [[100 percent completed]] و [[DiskPart successfully formatted the volume.]]، و [[DiskPart successfully assigned the drive letter or mount point.]]. ولو الفلاشة مقفولة هاردوير: [[attributes disk]] يقول [[Current Read-only State : Yes]]، و clean يفشل بـ [[Virtual Disk Service error:]] و [[The media is write protected.]]، وده مفيش منه رجوع.`
        },
        {
          cmd: "pnputil و driverquery",
          title: "الدرايفرات: اعرضها واعملها باك أب قبل الفرمتة",
          desc: R`[[driverquery]] بيعرض كل الدرايفرات المسجلة على الجهاز، و [[pnputil]] بيدير «مخزن الدرايفرات» (driver store): يعرض الدرايفرات اللي اتسطبت من برا ويندوز، ويصدّرها لفولدر، ويسطّبها من فولدر. أهم استخدام: قبل ما تفرمت خد نسخة من كل درايفرات جهازك، وبعد الفرمتة سطّبها بأمر واحد.

[[driverquery]] جدول: [[Module Name]] و [[Display Name]] و [[Driver Type]] (Kernel أو File System) و [[Link Date]]. و [[/v]] تفاصيل زيادة منها الحالة (Running أو Stopped) والمسار، و [[/fo]] الشكل ([[table]] أو [[list]] أو [[csv]])، و [[/si]] موقّع ولا لأ.
[[pnputil /enum-drivers]] الدرايفرات اللي جت من برا ويندوز (كارت الشاشة والصوت والواي فاي والتاتش باد)، ولكل واحد [[Published Name]] اسمه في المخزن (زي [[oem54.inf]]) و [[Original Name]] و [[Provider Name]] و [[Driver Version]]. و [[/class Display]] نوع واحد.
[[pnputil /enum-devices /class Display]] الأجهزة من نوع معين ودرايفر كل واحد، و [[/problem]] الأجهزة اللي فيها مشكلة (اللي عليها علامة صفرا في Device Manager).
[[pnputil /export-driver * D:\DriversBackup]] صدّر كل الدرايفرات اللي من برا ([[*]] يعني كلهم) لفولدر موجود (تصدير درايفر واحد اشتغل عندي من CMD عادي). احفظه على درايف غير C أو فلاشة.
[[pnputil /add-driver D:\DriversBackup\*.inf /subdirs /install]] على الويندوز الجديد: ضيف كل ملفات [[.inf]] في الفولدر والفولدرات اللي جواه ([[/subdirs]])، وسطّبها على الأجهزة اللي محتاجاها ([[/install]]). أدمن.

العرض ([[driverquery]] و [[/enum-drivers]] و [[/enum-devices]]) اشتغل عندي من CMD عادي، وكمان تصدير درايفر واحد، والإضافة محتاجة أدمن.`,
          example: R`driverquery
driverquery /v /fo list | more
driverquery /si /fo csv | findstr /i "FALSE"
pnputil /enum-drivers
pnputil /enum-devices /class Display
pnputil /enum-devices /problem
mkdir D:\DriversBackup
pnputil /export-driver * D:\DriversBackup
pnputil /add-driver D:\DriversBackup\*.inf /subdirs /install`,
          try: R`اعرض الدرايفرات اللي من برا ويندوز وعدّهم ([[pnputil /enum-drivers | find /c "Published Name"]])، واعرف درايفر كارت الشاشة من [[/enum-devices /class Display]]. ولو هتفرمت قريب: اعمل الـ export على فلاشة.`,
          flag: "danger",
          practice: [
            { lvl: 'سريع', t: R`**بيانات حقيقية:** [[driverquery /fo csv /nh > drv.csv]] و [[find /c /v "" drv.csv]]، وبعدين [[driverquery /fo csv | findstr /i /c:"File System" | find /c /v ""]].`, done: R`على جهاز التجربة 467 درايفر منهم 41 نوعهم File System (زي NTFS و FAT). [[/nh]] شالت سطر العناوين فالعدد = عدد الدرايفرات.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** [[pnputil /enum-drivers | find /c "Published Name"]] جنب رقم [[driverquery]]. ليه الفرق كبير؟`, done: R`pnputil طلّع 125 و driverquery 467: pnputil بيعرض باكدجات الدرايفرات اللي اتضافت للـ driver store من برا ([[oemNN.inf]])، و driverquery كل الدرايفرات المسجلة ومنها مئات من ويندوز نفسه. الـ backup قبل الفرمتة محتاج الـ 125 بس.` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** [[driverquery /nosuch]] و [[pnputil /enum-drivers /class Nosuchclass]]، و errorlevel بعد كل واحد.`, done: R`driverquery: [[ERROR: Invalid argument/option - '/nosuch'.]] و 1. و pnputil: [[No published driver packages were found on the system.]] و errorlevel **0**: «ملقيتش» مش فشل عنده، فسكربت بيعتمد على الكود هيفتكر إن فيه درايفرات.` },
            { lvl: 'تحدي', t: R`**ابني:** [[drivers-report.bat]] بيعمل فولدر باسم فيه التاريخ (درس «%time% فيه مسافة و %date% فيه /»)، وجواه [[driverquery /v /fo csv]] و [[pnputil /enum-drivers]] و [[pnputil /enum-devices /problem]]، ويطبع في الآخر عدد الأجهزة اللي فيها مشكلة.`, done: R`الفولدر فيه ٣ ملفات، والسطر الأخير بيقول عدد المشاكل ([[find /c "Instance ID"]] على ملف [[/problem]]، عندنا 0)، وتشغيله مرتين في نفس اليوم مبيمسحش التقرير الأول (اسم بالوقت أو لاحقة).` },
          ],
          deep: {
            why: R`بعد الفرمتة ويندوز بيلاقي أغلب الدرايفرات لوحده بس مش كلها: التاتش باد، أو كارت واي فاي معين (فمفيش نت أصلًا عشان تنزّل الدرايفر)، أو أزرار اللابتوب، أو الصوت. لو معاك فولدر الباك أب، أمر واحد بيرجّعهم. وكمان العرض بيوريك درايفر مش موقّع أو جهاز من غير درايفر قبل ما يعمل مشكلة.`,
            how: R`ويندوز بيحتفظ بكل الدرايفرات المتسطبة في الـ driver store ([[C:\Windows\System32\DriverStore\FileRepository]]). اللي جت من برا بتتسجل بأسماء [[oem0.inf]] و [[oem1.inf]] وهكذا، ودول اللي [[/export-driver *]] بيصدّرهم: فولدر لكل درايفر فيه الـ [[.inf]] وملفاته، من غير درايفرات ويندوز نفسها (ودي الويندوز الجديد هيجيبها).

جرّبت على لابتوب: [[pnputil /enum-drivers]] طلّع 123 درايفر من برا. و [[driverquery]] عدّ 465، لأنه بيعرض كل الدرايفرات المسجلة (ويندوز ومن برا، شغالة ومتوقفة). و [[driverquery /si]] بيطلّع [[FALSE]] لحاجات كتير ملهاش ملف inf أصلًا (عندي [[NearbySharing]] و [[Bluetooth Peripheral Device]] وجنبهم [[N/A]])، فالـ FALSE اللي تهمك هي اللي ليها inf وشركة، زي [[TAP-Windows Adapter V9]] (كارت VPN قديم) اللي طلع عندي بـ [[oem56.inf]].

الباك أب ممكن يبقى كبير (درايفرات كارت الشاشة لوحدها جيجات)، ولكارت الشاشة الأحسن تنزّل آخر نسخة من موقع الشركة بدل القديمة. و [[pnputil /delete-driver oem12.inf /uninstall]] بيشيل درايفر من المخزن (أدمن، وبحذر). والمقابل في PowerShell: [[Get-PnpDevice]] (في تاب «PowerShell») و [[Export-WindowsDriver]].`,
            when: R`قبل فرمتة أو تغيير ويندوز، جهاز عليه علامة صفرا في Device Manager، بعد تحديث درايفر بوّظ حاجة (تعرف النسخة القديمة كانت إيه)، أو تجهيز فلاشة درايفرات لأجهزة كتير من نفس الموديل.`,
            mistakes: R`تصدّر على C نفسه وتفرمته. أو [[/export-driver]] لفولدر مش موجود. أو تفتكر الباك أب فيه البرامج (لوحة تحكم كارت الشاشة أو برنامج الصوت): ده الدرايفر بس. أو [[/add-driver]] من غير [[/subdirs]] فيدوّر في الفولدر الرئيسي بس ومش هيلاقي حاجة (كل درايفر في فولدر). أو تمسح درايفر شغال على جهاز مهم (كيبورد أو تاتش باد). أو تنقل درايفرات لجهاز موديل تاني.`
          },
          teach: R`## الفكرة: أداتين، واحدة بتعرض والتانية بتنقل

[[driverquery]] بيعرض كل الدرايفرات المسجلة (ويندوز ومن برا)، و [[pnputil]] (Plug and Play utility) بيتعامل مع «مخزن الدرايفرات»: يعرض اللي جه من برا، ويصدّرهم، ويسطّبهم. جرّبت العرض كله وتصدير درايفر واحد لفولدر تجربة من CMD عادي على لابتوب ويندوز 11؛ تصدير الكل والإضافة مشغّلتهمش.

---

## ١. [[driverquery]]

~~~cmd
driverquery
~~~

~~~text الناتج (أول سطور)
Module Name  Display Name           Driver Type   Link Date
============ ====================== ============= ======================
1394ohci     1394 OHCI Compliant Ho Kernel
3ware        3ware                  Kernel        5/19/2015 1:28:03 AM
ACPI         Microsoft ACPI Driver  Kernel
~~~

| العمود | معناه |
|---|---|
| [[Module Name]] | الاسم القصير للدرايفر |
| [[Display Name]] | الاسم الظاهر، والعمود بيقصه لو طويل ([[Compliant Ho]]) |
| [[Driver Type]] | [[Kernel]] درايفر عادي، أو [[File System]] لأنظمة الملفات |
| [[Link Date]] | تاريخ بناء الملف، وكتير بيبقى فاضي |

الملف كان 469 سطر، يعني حوالي 467 درايفر بعد سطرين العناوين.

---

## ٢. التفاصيل صفحة صفحة

~~~cmd
driverquery /v /fo list | more
~~~

- [[/v]] (verbose) أعمدة زيادة، و [[/fo list]] (format) كل خانة في سطر.
- [[| more]] اعرض صفحة واحدة واستنى Space (درس type / more).

~~~text أول درايفر
Module Name:       1394ohci
Display Name:      1394 OHCI Compliant Host Controller
Driver Type:       Kernel
Start Mode:        Manual
State:             Stopped
Status:            OK
Path:              C:\WINDOWS\system32\drivers\1394ohci.sys
~~~

[[Start Mode: Manual]] بيشتغل لما جهاز محتاجه، و [[State: Stopped]] مش شغال دلوقتي (اللابتوب مفيهوش منفذ 1394 أصلًا)، و [[Path]] ملف الدرايفر نفسه ([[.sys]]).

---

## ٣. الدرايفرات اللي مش موقّعة

~~~cmd
driverquery /si /fo csv | findstr /i "FALSE"
~~~

- [[/si]] (signed info) معلومات التوقيع، و [[/fo csv]] كل سطر قيم بفواصل.
- [[findstr /i "FALSE"]] السطور اللي فيها FALSE، و [[/i]] من غير فرق بين كابيتال وسمول.

~~~text الناتج (سطور منه)
"NearbySharing","N/A","FALSE","N/A"
"Bluetooth Peripheral Device","N/A","FALSE","N/A"
"TAP-Windows Adapter V9","oem56.inf","FALSE","TAP-Windows Provider V9"
~~~

الأعمدة: [[DeviceName]] و [[InfName]] و [[IsSigned]] و [[Manufacturer]]. اللي جنبه [[N/A]] ملوش ملف inf أصلًا، فمتقلقش منه. اللي يهمك اللي ليه inf وشركة، زي آخر سطر (كارت VPN قديم).

---

## ٤. اللي جه من برا: [[pnputil /enum-drivers]]

~~~cmd
pnputil /enum-drivers
~~~

[[/enum]] من enumerate: اعرض واحد واحد.

~~~text أول درايفر
Published Name:     oem86.inf
Original Name:      amdacpbus.inf
Provider Name:      AMD
Class Name:         System
Driver Version:     08/01/2024 6.0.0.79
Signer Name:        Microsoft Windows Hardware Compatibility Publisher
~~~

| السطر | معناه |
|---|---|
| [[Published Name]] | اسمه جوه المخزن: [[oem]] ورقم |
| [[Original Name]] | اسم ملف الـ inf الأصلي من الشركة |
| [[Class Name]] | نوع الجهاز (System، Display، Net...) |
| [[Signer Name]] | مين وقّعه |

و [[| find /c "Published Name"]] بيعدّهم: طلع عندي 125.

---

## ٥ و ٦. الأجهزة

~~~cmd
pnputil /enum-devices /class Display
pnputil /enum-devices /problem
~~~

[[/enum-devices]] الأجهزة نفسها مش الدرايفرات، و [[/class Display]] كروت الشاشة بس.

~~~text الناتج (مختصر)
Device Description:         AMD Radeon(TM) Graphics
Status:                     Started
Driver Name:                oem54.inf

Device Description:         NVIDIA GeForce RTX 3070 Laptop GPU
Status:                     Started
Driver Name:                oem71.inf
~~~

يعني اللابتوب فيه كارتين، والاتنين شغالين ([[Started]])، وكل واحد بدرايفر من المخزن. و [[/problem]] الأجهزة اللي فيها مشكلة (العلامة الصفرا في Device Manager)، وعندي طلّع [[No devices were found on the system.]].

---

## ٧ و ٨. الباك أب

~~~cmd
mkdir D:\DriversBackup
pnputil /export-driver * D:\DriversBackup
~~~

- [[mkdir]] لازم الفولدر يبقى موجود قبل الـ export. وخليه على درايف غير C أو فلاشة، عشان الفرمتة هتمسح C.
- [[/export-driver *]] صدّر كل درايفرات [[oem*.inf]]، والنجمة يعني «كلهم».

جرّبت أصدّر درايفر واحد بس لفولدر تجربة من CMD عادي ([[pnputil /export-driver oem86.inf exp]]):

~~~text الناتج
Exporting driver package:   oem86.inf (amdacpbus.inf)
Driver package exported successfully.

Total driver packages:      1
Exported driver packages:   1
~~~

والفولدر اتعمل فيه ملفات الدرايفر ([[amdacpbus.inf]] و [[.sys]] و [[.cat]] وغيرهم)، حوالي 24 ميجا لدرايفر واحد. فالكل ممكن يوصل جيجات.

---

## ٩. على الويندوز الجديد

~~~cmd
pnputil /add-driver D:\DriversBackup\*.inf /subdirs /install
~~~

| الحتة | معناها |
|---|---|
| [[/add-driver]] | ضيف للمخزن |
| [[D:\DriversBackup\*.inf]] | كل ملفات الـ inf |
| [[/subdirs]] | ودوّر في الفولدرات اللي جوه، لأن الـ export بيعمل فولدر لكل درايفر |
| [[/install]] | وسطّبها على الأجهزة اللي محتاجاها |

ده محتاج CMD كأدمن (من توثيق pnputil، مشغّلتهوش لأنه بيسطّب درايفرات).

---

## الخلاصة

| عايز | اكتب |
|---|---|
| كل الدرايفرات | [[driverquery]] |
| اللي جه من برا | [[pnputil /enum-drivers]] |
| أجهزة فيها مشكلة | [[pnputil /enum-devices /problem]] |
| باك أب | [[pnputil /export-driver * فولدر]] |
| رجّعهم | [[pnputil /add-driver فولدر\*.inf /subdirs /install]] |`,
          lines: [
            R`كل الدرايفرات: الاسم والنوع والتاريخ.`,
            R`تفاصيل كل واحد (شغال ولا لأ، ومساره)، صفحة صفحة.`,
            R`الدرايفرات اللي مش موقّعة.`,
            R`الدرايفرات اللي من برا ويندوز (oem*.inf).`,
            R`كروت الشاشة ودرايفر كل واحد.`,
            R`الأجهزة اللي فيها مشكلة.`,
            R`فولدر الباك أب (على درايف غير C).`,
            R`صدّر كل الدرايفرات اللي من برا لفولدر الباك أب.`,
            R`على الويندوز الجديد: سطّبهم كلهم (أدمن).`
          ],
          sol: R`[[pnputil /enum-drivers | find /c "Published Name"]] طلّع 123، وأول درايفر:
[[Published Name: oem86.inf]]
[[Original Name: amdacpbus.inf]]
[[Provider Name: AMD]]
[[Class Name: System]]
[[Driver Version: 08/01/2024 6.0.0.79]]
[[Signer Name: Microsoft Windows Hardware Compatibility Publisher]]
و [[/enum-devices /class Display]] عرض [[AMD Radeon(TM) Graphics]] بـ [[Driver Name: oem54.inf]] و [[NVIDIA GeForce RTX 3070 Laptop GPU]] بـ [[oem71.inf]]، والاتنين [[Status: Started]]. و [[/enum-devices /problem]] طلّع [[No devices were found on the system.]] (مفيش جهاز فيه مشكلة). و [[driverquery]] أول سطوره [[Module Name  Display Name  Driver Type  Link Date]] وتحتها [[1394ohci  1394 OHCI Compliant Ho  Kernel]] (العمود بيقص الاسم الطويل، و [[/fo list]] بيعرضه كامل).

(تصدير الكل والـ add مشغّلتهمش هنا: الـ add محتاج أدمن وبيسطّب درايفرات. جرّبت تصدير درايفر واحد بس من CMD عادي، وطبع [[Driver package exported successfully.]].) الـ export بيعمل فولدر لكل درايفر وبيطبع سطر لكل واحد وهو بيصدّره، وبعد الفرمتة الـ add بيطبع كل inf اتضاف وهل اتسطب على جهاز.`
        },
        {
          cmd: "sc و net start",
          title: "الخدمات: اعرض وشغّل ووقّف",
          desc: R`الخدمات (services) برامج بتشتغل في الخلفية من غير نافذة: Windows Update، والطباعة، و Docker، وقواعد البيانات اللي بتسطّبها. [[sc]] و [[net start]] بيعرضوها ويشغّلوها ويوقفوها، وبيغيّروا هل تشتغل لوحدها مع الجهاز.

[[net start]] لوحده: أسامي الخدمات الشغالة دلوقتي. و [[net start Spooler]] شغّل خدمة، و [[net stop Spooler]] وقّفها.
[[sc query Spooler]] حالة خدمة: [[STATE]] (RUNNING أو STOPPED). و [[Spooler]] اسمها القصير (service name)، و [[Print Spooler]] اسمها الظاهر (display name)، و [[sc getkeyname "Print Spooler"]] بيجيب القصير من الظاهر.
[[sc queryex]] نفس الحالة ومعاها [[PID]]، فتقدر تقفلها بـ taskkill لو علّقت (درس tasklist / taskkill).
[[sc qc Spooler]] إعداداتها: [[START_TYPE]] ([[AUTO_START]] مع الجهاز، أو [[DEMAND_START]] لما حاجة تطلبها، أو [[DISABLED]] مقفولة)، و [[BINARY_PATH_NAME]] البرنامج نفسه، و [[SERVICE_START_NAME]] شغالة بأنهي حساب.
[[sc config Spooler start= demand]] غيّر نوع التشغيل: [[auto]] أو [[demand]] أو [[disabled]] أو [[delayed-auto]]. مساعدة sc نفسها بتقول المسافة بعد [[=]] لازمة ومفيش مسافة قبلها (دي غرابة في sc)، ونسخ ويندوز القديمة كانت بترفض من غيرها. على ويندوز 11 جرّبت [[start=demand]] لازقة واتقبلت، بس اكتب المسافة عشان السكربت يشتغل في كل حتة.
[[sc query state= all type= service]] كل الخدمات حتى المتوقفة.

العرض مش محتاج أدمن، والتشغيل والإيقاف والتغيير محتاجين CMD كأدمن. وفي PowerShell [[sc]] اسم مختصر لـ Set-Content، فاكتب [[sc.exe]] هناك أو استخدم [[Get-Service]] (في تاب «PowerShell»).`,
          example: R`net start
sc query Spooler
sc queryex Spooler
sc qc Spooler
sc getkeyname "Print Spooler"
net stop Spooler
net start Spooler
sc config Spooler start= demand
sc query state= all type= service | find /c "SERVICE_NAME"`,
          try: R`اعرض الخدمات الشغالة، واعرف حالة وإعدادات Windows Update ([[wuauserv]]) و Remote Registry ([[RemoteRegistry]]) بـ query و qc. ولو الطباعة معلّقة عندك: من CMD أدمن وقّف Spooler وشغّله تاني.`,
          flag: "danger",
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[sc query NoSuchLabSvc]] و [[echo %errorlevel%]].`, done: R`[[[SC] EnumQueryServicesStatus:OpenService FAILED 1060:]] وتحتها [[The specified service does not exist as an installed service.]]، و errorlevel 1060. فـ [[if errorlevel 1060]] في سكربت معناها «مش متسطّبة».` },
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من غير ما تفتح services.msc: الاسم القصير لـ «Print Spooler»، والاسم الظاهر لـ [[wuauserv]].`, done: R`[[sc getkeyname "Print Spooler"]] طبع [[Name = Spooler]]، و [[sc getdisplayname wuauserv]] طبع [[Name = Windows Update]]. الأوامر كلها بتاخد الاسم القصير.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** [[sc qc Spooler | findstr /i "START_TYPE SERVICE_START_NAME"]] و [[sc qc wuauserv | findstr /i "START_TYPE"]].`, done: R`Spooler: [[START_TYPE : 2 AUTO_START]] و [[SERVICE_START_NAME : LocalSystem]]. و wuauserv: [[3 DEMAND_START]]، يعني Windows Update مش بتشتغل مع الجهاز، حاجة بتطلبها لما تحتاجها.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** عدّ بتلات طرق: [[sc query | find /c "SERVICE_NAME"]] و [[sc query state= all type= service | find /c "SERVICE_NAME"]] و [[net start | find /c /v ""]]. ليه التلاتة مختلفين؟`, done: R`عندنا 149 و 311 و 154: [[sc query]] لوحده الشغالة بس، و [[state= all]] الشغالة والمتوقفة، و [[net start]] الشغالة بس بس فيه سطر عنوان وسطر [[The command completed successfully.]] وسطور فاضية. و [[state=all]] لازقة اتقبلت برضه على ويندوز 11 وطلّعت 311.` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** Spooler شغالة، وكتبت [[net start Spooler]]. توقّع الرسالة من غير ما تشغّله، واتأكد بـ [[net helpmsg 2182]].`, done: R`[[The requested service has already been started.]] وتحتها [[More help is available by typing NET HELPMSG 2182.]]: مش مشكلة حقيقية، بس جاية في شكل error، فسكربت التشغيل يتأكد بـ [[sc query ... | findstr RUNNING]] الأول بدل ما يقرا الرسالة. (الـ start نفسه متشغّلش هنا؛ النص من [[net helpmsg 2182]].)` },
            { lvl: 'تحدي', t: R`**ابني:** [[svc-check.bat]] بياخد أسامي خدمات كتير ([[shift]] و [[goto]])، ولكل واحدة يطبع سطر: الاسم والحالة ونوع التشغيل من [[for /f "tokens=4"]] على [[sc query]] و [[sc qc]]، والمش متسطّبة يطبع «not installed (1060)».`, done: R`[[svc-check.bat Spooler wuauserv NoSuchLabSvc]] طبع [[Spooler: RUNNING AUTO_START]] و [[wuauserv: STOPPED DEMAND_START]] و [[NoSuchLabSvc: not installed (1060)]]، من غير ولا start أو stop.` },
          ],
          deep: {
            why: R`خدمة معلّقة (الطباعة واقفة، أو Docker مش بيقوم، أو Windows Update واقف على نسبة)، أو قاعدة بيانات متسطبة (MySQL أو PostgreSQL أو SQL Server) شغالة على طول وبتاكل رام وانت محتاجها وقت الشغل بس، أو تتأكد إن خدمة زي Remote Registry متقفلة. من الترمنال أسرع من [[services.msc]]، وبيتحط في سكربت.`,
            how: R`الخدمات بيديرها Service Control Manager. كل خدمة ليها اسم قصير ثابت (اللي بتستخدمه في الأوامر) واسم ظاهر ممكن يتترجم. وخدمات كتير بتشتغل جوه [[svchost.exe]] مشترك ([[TYPE : 20 WIN32_SHARE_PROCESS]])، عشان كده بتلاقي svchost كتير في tasklist.

جرّبت: [[net start]] عرض حوالي 149 خدمة شغالة، و [[sc query state= all type= service]] لقى 308 كلهم. و [[sc qc RemoteRegistry]] طلّع [[START_TYPE : 4 DISABLED]] و [[DEPENDENCIES : RPCSS]] و [[SERVICE_START_NAME : NT AUTHORITY\LocalService]]. و [[sc qc wuauserv]] (Windows Update) طلّع [[DEMAND_START]]: بتشتغل لما ويندوز يحتاجها، فـ STOPPED ساعات يبقى طبيعي. و [[sc query NoSuchSvc]] طلّع [[[SC] EnumQueryServicesStatus:OpenService FAILED 1060:]] و [[The specified service does not exist as an installed service.]] و errorlevel 1060.

الطباعة المعلّقة: [[net stop Spooler]]، وامسح اللي جوه [[C:\Windows\System32\spool\PRINTERS]]، و [[net start Spooler]]. والخدمات بتعتمد على بعض: [[net stop]] على خدمة فيه خدمات تانية محتاجاها بيسألك يوقفهم معاها. ولو عايز برنامجك يشتغل كخدمة: [[sc create]] موجود بس محتاج برنامج مكتوب كخدمة، وأغلب الناس بيستخدموا أداة زي NSSM أو مهمة مجدولة (درس schtasks).`,
            when: R`الطباعة معلّقة، خدمة قاعدة بيانات أو Docker عايز تشغّلها وتقفلها بإيدك، مراجعة إيه اللي بيشتغل مع الجهاز، أو سكربت بيتأكد إن خدمة شغالة قبل ما يكمّل.`,
            mistakes: R`[[start=demand]] من غير مسافة بعد [[=]] على ويندوز قديم (ويندوز 11 بيقبلها، بس المساعدة بتقول المسافة لازمة)، أو قيمة غلط زي [[start=bogus]] فيطبع [[ERROR: Invalid start= field]] والمساعدة. أو [[sc]] في PowerShell فيكتب ملف بدل ما يكلم الخدمات. أو تعمل disabled لخدمات ويندوز من لستة «سرّع جهازك» على النت، فحاجات تبوظ بعدين ومتعرفش ليه (Windows Update و Defender و Spooler وغيرهم). أو الاسم الظاهر مع [[sc query]] (عايز القصير). أو تفتكر STOPPED مع DEMAND_START مشكلة.`
          },
          teach: R`## الفكرة: اعرض، وبعدين شغّل ووقّف وغيّر

أداتين لنفس الحاجة: [[net start]] و [[net stop]] قصيرين وسهلين، و [[sc]] (Service Control) أدق وبيعرض تفاصيل أكتر وبيغيّر الإعدادات. والخدمة اللي في المثال [[Spooler]]: خدمة الطباعة، موجودة على كل ويندوز. جرّبت كل السطور من CMD عادي على ويندوز 11؛ العرض اشتغل، والإيقاف والتغيير اترفضوا (محتاجين أدمن) فمغيّروش حاجة.

---

## ١. [[net start]]

~~~cmd
net start
~~~

~~~text الناتج (أوله)
These Windows services are started:

   AMD Crash Defender Service
   AMD External Events Utility
   AMD User Experience Program Data Uploader
~~~

لستة بالأسامي **الظاهرة** للخدمات الشغالة بس، وعندي كانت 149.

---

## ٢. [[sc query Spooler]]

~~~cmd
sc query Spooler
~~~

~~~text الناتج
SERVICE_NAME: Spooler
        TYPE               : 110  WIN32_OWN_PROCESS  (interactive)
        STATE              : 4  RUNNING
                                (STOPPABLE, NOT_PAUSABLE, IGNORES_SHUTDOWN)
        WIN32_EXIT_CODE    : 0  (0x0)
~~~

| السطر | معناه |
|---|---|
| [[SERVICE_NAME]] | الاسم القصير، وده اللي الأوامر بتاخده |
| [[TYPE]] | [[OWN_PROCESS]] ليها process لوحدها، و [[SHARE_PROCESS]] جوه svchost مع غيرها |
| [[STATE]] | [[4 RUNNING]] شغالة، و [[1 STOPPED]] واقفة. الرقم كود الحالة |
| السطر اللي تحته | [[STOPPABLE]] ينفع توقفها، و [[NOT_PAUSABLE]] مينفعش pause |
| [[WIN32_EXIT_CODE]] | آخر كود خروج، و [[0]] تمام |

---

## ٣. [[sc queryex Spooler]]

~~~cmd
sc queryex Spooler
~~~

[[ex]] من extended: نفس اللي فوق وزيادة سطرين:

~~~text الناتج (الزيادة)
        PID                : 5964
        FLAGS              :
~~~

[[PID]] رقم الـ process. لو الخدمة علّقت ومش راضية تقف، ده الرقم اللي تقفله بـ [[taskkill /pid 5964 /f]] من CMD أدمن (درس tasklist / taskkill).

---

## ٤. [[sc qc Spooler]]

~~~cmd
sc qc Spooler
~~~

[[qc]] = query config: الإعدادات مش الحالة.

~~~text الناتج
[SC] QueryServiceConfig SUCCESS

SERVICE_NAME: Spooler
        START_TYPE         : 2   AUTO_START
        BINARY_PATH_NAME   : C:\WINDOWS\System32\spoolsv.exe
        DISPLAY_NAME       : Print Spooler
        DEPENDENCIES       : RPCSS
                           : http
        SERVICE_START_NAME : LocalSystem
~~~

| السطر | معناه |
|---|---|
| [[START_TYPE]] | [[AUTO_START]] بتقوم مع الجهاز، [[DEMAND_START]] لما حاجة تطلبها، [[DISABLED]] مقفولة |
| [[BINARY_PATH_NAME]] | البرنامج نفسه |
| [[DISPLAY_NAME]] | الاسم الظاهر |
| [[DEPENDENCIES]] | خدمات لازم تكون شغالة الأول |
| [[SERVICE_START_NAME]] | الحساب اللي شغالة بيه ([[LocalSystem]] أعلى صلاحيات) |

ولـ Windows Update ([[sc qc wuauserv]]) طلع [[DEMAND_START]]، فلو لقيتها STOPPED ده طبيعي.

---

## ٥. [[sc getkeyname "Print Spooler"]]

~~~cmd
sc getkeyname "Print Spooler"
~~~

~~~text الناتج
[SC] GetServiceKeyName SUCCESS
Name = Spooler
~~~

بتديله الاسم اللي شفته في [[net start]] أو [[services.msc]]، ويرجّعلك القصير. علامات التنصيص عشان الاسم فيه مسافة.

---

## ٦ و ٧. وقّف وشغّل

~~~cmd
net stop Spooler
net start Spooler
~~~

من CMD أدمن بيطبعوا [[The Print Spooler service is stopping.]] ثم [[...was stopped successfully.]] وبالعكس (من التوثيق). من CMD عادي جرّبت:

~~~text الناتج
System error 5 has occurred.

Access is denied.
~~~

[[5]] هو كود Access is denied في ويندوز كله، و [[%errorlevel%]] بعد [[net]] بيطلع [[2]].

---

## ٨. [[sc config Spooler start= demand]]

~~~cmd
sc config Spooler start= demand
~~~

- [[config]] غيّر الإعدادات، و [[start=]] نوع التشغيل، و [[demand]] لما حاجة تطلبها.
- مساعدة sc بتقول: [[A space is required between the equal sign and the value.]] يعني مسافة **بعد** [[=]] ومفيش قبلها. على ويندوز 11 جرّبت [[start=demand]] لازقة على خدمة مش موجودة ووصل لـ [[FAILED 1060]] (يعني قبل الصيغة)، بس قيمة غلط زي [[start=bogus]] طبعت [[ERROR: Invalid start= field]] والمساعدة كلها.

من CMD عادي:

~~~text الناتج
[SC] OpenService FAILED 5:

Access is denied.
~~~

---

## ٩. عدّ كل الخدمات

~~~cmd
sc query state= all type= service | find /c "SERVICE_NAME"
~~~

- [[sc query]] من غير اسم بيعرض الشغالة بس، و [[state= all]] كمان المتوقفة، و [[type= service]] خدمات بس من غير الدرايفرات.
- [[| find /c "SERVICE_NAME"]] عدّ السطور اللي فيها الكلمة دي، وكل خدمة ليها سطر واحد منها.

~~~text الناتج
308
~~~

308 خدمة متسطبة، منهم 149 شغالين.

---

## الخلاصة

| عايز | اكتب | أدمن؟ |
|---|---|---|
| الشغالة | [[net start]] | لأ |
| حالة خدمة | [[sc query الاسم]] (و [[queryex]] للـ PID) | لأ |
| إعداداتها | [[sc qc الاسم]] | لأ |
| الاسم القصير | [[sc getkeyname "الظاهر"]] | لأ |
| وقّف / شغّل | [[net stop]] / [[net start]] الاسم | أيوه |
| نوع التشغيل | [[sc config الاسم start= demand]] | أيوه |

وفي PowerShell اكتب [[sc.exe]] مش [[sc]].`,
          lines: [
            "من غير اسم خدمة، [[net start]] بيطبع لستة بالخدمات اللي شغالة دلوقتي بس، وبالاسم الظاهر (Display Name) زي [[Print Spooler]]. مش محتاج Admin، ومفيد تشوف بسرعة الخدمة شغالة ولا لأ.",
            "بيطبع حالة خدمة الطباعة: [[STATE]] (RUNNING أو STOPPED). [[sc]] بيستخدم الاسم القصير (Service Name) زي [[Spooler]]، مش الاسم الظاهر، ولو كتبت الظاهر هيقولك الخدمة مش موجودة.",
            "زي [[query]] بالظبط بس بيزوّد [[PID]]: رقم العملية اللي الخدمة شغالة فيها. تستخدمه مع [[tasklist /fi \"PID eq ...\"]] أو [[netstat -ano]] تعرف الخدمة دي هي اللي ماسكة بورت ولا لأ.",
            "[[qc]] = query config: بيطبع إعدادات الخدمة مش حالتها: [[START_TYPE]] (بتشتغل مع الويندوز ولا لما حد يطلبها ولا متقفلة)، و [[BINARY_PATH_NAME]] البرنامج اللي بيشتغل، و [[SERVICE_START_NAME]] الحساب اللي شغالة بيه.",
            "بيحوّل الاسم الظاهر للاسم القصير: هنا بيطبع [[Name = Spooler]]. التنصيص لازم لأن الاسم فيه مسافة، من غيره [[sc]] هياخد [[Print]] بس. مفيد لما تبقى عارف الاسم من services.msc ومحتاج اسم [[sc]].",
            "بيوقّف الخدمة، ولو فيه خدمات معتمدة عليها بيسألك توقّفها هي كمان. محتاج Admin، ومن غيره هيطلع [[Access is denied]]. وقف الـ Spooler بيوقّف الطباعة لحد ما تشغّله تاني.",
            "بيشغّل الخدمة تاني، و [[net]] بيستنى لحد ما تبقى RUNNING ويقولك اشتغلت. ده الفرق عن [[sc start]] اللي بيبعت الأمر ويرجع على طول وحالتها لسه START_PENDING. محتاج Admin برضه.",
            "بيغيّر نوع التشغيل لـ [[demand]] = Manual: الخدمة متشتغلش مع الويندوز، بس تشتغل لما برنامج يطلبها. مساعدة [[sc]] بتقول المسافة بعد [[=]] لازمة ومفيش قبلها، ونسخ ويندوز القديمة كانت بترفض [[start=demand]] لازقة (ويندوز 11 بيقبلها)، فاكتب المسافة عشان السكربت يشتغل في كل حتة. ده تغيير في السيستم ومحتاج Admin، فمتجربهوش على خدمة مش فاهمها.",
            "[[state= all]] بيعرض المتوقف والشغال (الافتراضي الشغال بس)، و [[type= service]] بيستبعد الدرايفرز. الـ [[|]] بيبعت الناتج لـ [[find /c \"SERVICE_NAME\"]] اللي بيعدّ السطور اللي فيها الكلمة دي، وكل خدمة ليها سطر واحد منها، فالرقم اللي بيطلع هو عدد الخدمات."
          ],
          sol: R`[[sc queryex Spooler]] طلّع [[SERVICE_NAME: Spooler]] و [[STATE : 4 RUNNING]] و [[(STOPPABLE, NOT_PAUSABLE, IGNORES_SHUTDOWN)]] و [[PID : 4608]]. و [[sc getkeyname "Print Spooler"]] طلّع [[[SC] GetServiceKeyName SUCCESS]] و [[Name = Spooler]]. و [[sc qc wuauserv]] طلّع [[START_TYPE : 3 DEMAND_START]] و [[DISPLAY_NAME : Windows Update]] و [[SERVICE_START_NAME : LocalSystem]]، و [[sc qc RemoteRegistry]] [[START_TYPE : 4 DISABLED]] (وده الكويس). والسطر الأخير طلّع 308.

(الإيقاف والتشغيل والتغيير مشغّلتهمش هنا عشان ميأثروش على الجهاز.) من CMD أدمن [[net stop Spooler]] بيطبع [[The Print Spooler service is stopping.]] و [[The Print Spooler service was stopped successfully.]]، و [[net start Spooler]] نفس الكلام بـ starting و started، و [[sc config]] بيطبع [[[SC] ChangeServiceConfig SUCCESS]]. ومن CMD عادي: [[System error 5 has occurred.]] و [[Access is denied.]]، و sc بيقول [[[SC] OpenService FAILED 5:]] و [[Access is denied.]].`
        },
        {
          cmd: "w32tm",
          title: "ساعة الجهاز غلط؟ اعرف وزامن",
          desc: R`[[w32tm]] أداة خدمة الوقت في ويندوز (Windows Time): بتقولك آخر مرة الساعة اتزامنت إمتى ومن أنهي سيرفر، وتقيس الفرق بين ساعتك وسيرفر وقت، وتطلب مزامنة دلوقتي.

[[/query /status]] الحالة: [[Source]] الجهاز بياخد الوقت منين، و [[Last Successful Sync Time]] آخر مزامنة نجحت، و [[Leap Indicator]] و [[Stratum]] (لو [[not synchronized]] و 0 يبقى لسه متزامنش).
[[/query /source]] السيرفر بس (عندي طلب أدمن).
[[/query /peers]] السيرفرات المتظبطة وحالة كل واحد.
[[/stripchart /computer:time.windows.com /samples:3 /dataonly]] قيس الفرق بينك وبين سيرفر: [[/samples:3]] 3 قياسات وبعدين يقف (من غيرها بيفضل لحد Ctrl+C)، و [[/dataonly]] أرقام من غير رسم. ده مش بيغيّر حاجة، فجرّبه براحتك.
[[/resync]] زامن دلوقتي (CMD كأدمن، والخدمة لازم تكون شغالة)، و [[/rediscover]] معاه بيدوّر على السيرفرات من الأول.
[[/tz]] المنطقة الزمنية والتوقيت الصيفي.

ليه ده يهمك كمبرمج؟ لو الساعة غلط كام دقيقة: شهادات HTTPS بتبان «لسه مبدأتش» أو «خلصت» فالمواقع و git و npm و curl يفشلوا بـ certificate errors، وتوكنات JWT تتشاف منتهية أو لسه مش صالحة، وأكواد 2FA (TOTP، بتتغيّر كل 30 ثانية) اللي بيولّدها برنامج على الجهاز تطلع غلط، و commits بتتسجل بوقت غلط.`,
          example: R`w32tm /query /status
w32tm /query /peers
w32tm /stripchart /computer:time.windows.com /samples:3 /dataonly
w32tm /tz
net start w32time
w32tm /resync
w32tm /config /manualpeerlist:"time.windows.com,0x9 pool.ntp.org,0x9" /syncfromflags:manual /update`,
          try: R`قيس الفرق بين ساعتك و time.windows.com بالـ stripchart، وشوف آخر مزامنة من [[/query /status]]. لو الفرق أكتر من ثانيتين أو [[Last Successful Sync Time: unspecified]]: من CMD أدمن اعمل [[/resync]] وقيس تاني.`,
          practice: [
            { lvl: 'سريع', t: R`**بيانات حقيقية:** [[w32tm /query /status | findstr /b "Source Stratum Last"]]: الجهاز بياخد الوقت منين وآخر مزامنة إمتى.`, done: R`عندنا [[Source: time.windows.com,0x9]] و [[Stratum: 5 (secondary reference - syncd by (S)NTP)]] و [[Last Successful Sync Time:]] بتاريخ النهارده. لو [[Stratum: 0]] و [[unspecified]] يبقى عمره ما اتزامن.` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** من CMD عادي [[w32tm /query /source]] و [[echo %errorlevel%]]. وحوّل الرقم لـ hex.`, done: R`[[The following error occurred: Access is denied. (0x80070005)]] و errorlevel [[-2147024891]]، وده نفس [[0x80070005]] (٢^٣٢ ناقص 2147024891). يعني [[/status]] مسموح من نافذة عادية و [[/source]] لأ على الجهاز ده.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** [[w32tm /stripchart /computer:time.windows.com /samples:2 /dataonly]]، وبعدين نفس الأمر على [[no-such-host.invalid]].`, done: R`سطرين زي [[18:40:07, -00.2272594s]] (ساعتك متأخرة حوالي ٢٢٧ ملّي ثانية، طبيعي)، والاسم الغلط طبع [[The following error occurred: No such host is known. (0x80072AF9)]].` },
            { lvl: 'تحدي', t: R`**مسألة:** [[clock-ok.bat]] بياخد عينة واحدة من stripchart، ويطلّع الفرق بـ [[for /f "tokens=2"]] على السطر اللي بيبدأ بساعة ([[findstr /r "^[0-9][0-9]:"]])، ويقول OK لو أقل من ثانية و «سنكرن الساعة» لو أكتر. الثواني فيها كسور، فقارن الجزء الصحيح كنص.`, done: R`طبع [[offset=-00.1911247s]] وبعدين OK. الجزء قبل النقطة ([[-00]] أو [[+00]]) هو اللي بتقارنه، لأن [[set /a]] مبيعرفش كسور، و [[00]] و [[-00]] الاتنين أقل من ثانية.` },
          ],
          deep: {
            why: R`لابتوب كان مقفول فترة طويلة أو بطارية الـ BIOS (CMOS) بتاعته ضعفت، أو جهاز dual boot مع لينكس (لينكس بيعتبر ساعة الـ BIOS بتوقيت UTC وويندوز بيعتبرها محلي، فكل ما تبدّل الساعة تتزحلق ساعتين أو تلاتة)، أو VM اتعملها pause. الأعراض: «Your clock is ahead» في المتصفح، أو [[certificate is not yet valid]] في git أو curl، أو أكواد 2FA مش راضية.`,
            how: R`الخدمة [[W32Time]] بتسأل سيرفر NTP (بروتوكول الوقت، UDP بورت 123)، وعلى أجهزة البيت السيرفر الافتراضي [[time.windows.com]]. Microsoft بتوثّق إن الجهاز اللي مش على دومين بيزامن افتراضيًا كل 604,800 ثانية (أسبوع)، ولو الفرق صغير بيعدّل الساعة بالتدريج مش مرة واحدة. وكمان ويندوز بيظبط الساعة لو بعيدة جدًا من أوقات الشهادات في اتصالات HTTPS (اسمها Secure Time Seeding).

جرّبت على لابتوب: [[/query /status]] طلّع [[Leap Indicator: 3(not synchronized)]] و [[Stratum: 0 (unspecified)]] و [[Last Successful Sync Time: unspecified]] و [[Source: Local CMOS Clock]]: من ساعة ما الجهاز فتح (من حوالي يومين) لسه متزامنش، وماشي بساعة الـ BIOS. و [[/query /peers]] طلّع [[Peer: time.windows.com,0x9]] و [[State: Pending]]. ومع ذلك الـ stripchart قاس فرق حوالي عُشر ثانية بس، فالساعة كويسة. والرقم الموجب في الـ stripchart، حسب حسبة NTP، معناه إن السيرفر سابقك بالقيمة دي.

[[0x9]] جنب السيرفر أعلام: [[0x1]] (زامن كل فترة ثابتة) + [[0x8]] (client). و [[/config ... /update]] بيغيّر السيرفرات (أدمن). والأسهل لأغلب الناس: Settings ثم Time & language ثم Date & time ثم Sync now، ودي نفس [[/resync]].

لو [[/resync]] قال [[The following error occurred: The service has not been started. (0x80070426)]] شغّل الخدمة الأول ([[net start w32time]]، درس sc و net start). ولو قال [[The computer did not resync because no time data was available.]] يبقى السيرفر مش بيرد: نت أو فايروول أو شبكة قافلة UDP 123. و Kerberos (دومين الشركة) بيرفض الدخول لو الفرق أكتر من 5 دقايق.`,
            when: R`المتصفح أو git أو curl بيقولوا certificate not yet valid أو expired، أكواد 2FA غلط، dual boot مع لينكس، أو سيرفر ويندوز محتاج ساعته مظبوطة (لوجات ومهام مجدولة ودومين).`,
            mistakes: R`تغيّر الساعة بإيدك بدل ما تصلّح المزامنة فترجع تغلط. أو الساعة متأخرة ساعة بالظبط فتغيّر الوقت، والغلط في المنطقة الزمنية أو التوقيت الصيفي (شوف [[/tz]]). أو [[/resync]] من CMD عادي. أو تفتكر stripchart بيصلّح حاجة. أو dual boot وتعدّل ويندوز كل مرة بدل ما تخلّي لينكس يستخدم الوقت المحلي ([[timedatectl set-local-rtc 1]]).`
          },
          teach: R`## الفكرة: ٤ أسئلة وبعدها ٣ تصليحات

أول ٤ سطور بتسأل بس ومش بتغيّر حاجة: إيه الحالة؟ مين السيرفرات؟ ساعتي بعيدة قد إيه؟ المنطقة الزمنية إيه؟ وآخر ٣ بيصلّحوا (محتاجين أدمن). [[w32tm]] اسم أداة خدمة Windows Time. جرّبت الأربعة الأولانيين والتلاتة التانيين من CMD عادي على ويندوز 11، والتصليح اترفض (مش أدمن) فمتغيّرش حاجة.

---

## ١. الحالة: [[/query /status]]

~~~cmd
w32tm /query /status
~~~

~~~text الناتج
Leap Indicator: 3(not synchronized)
Stratum: 0 (unspecified)
Precision: -23 (119.209ns per tick)
Last Successful Sync Time: unspecified
Source: Local CMOS Clock
Poll Interval: 10 (1024s)
~~~

| السطر | معناه هنا |
|---|---|
| [[Leap Indicator: 3]] | [[3]] معناها «مش متزامن»، و [[0]] كله تمام |
| [[Stratum]] | بُعدك عن الساعة الأصلية: 1 سيرفر جنب ساعة ذرية، وكل خطوة +1. و [[0]] هنا يعني مش معروف |
| [[Last Successful Sync Time]] | آخر مزامنة نجحت: [[unspecified]] يعني لسه ولا مرة من ساعة ما الجهاز فتح |
| [[Source]] | ماشي على ساعة الـ BIOS ([[Local CMOS Clock]])، مش سيرفر |
| [[Poll Interval: 10 (1024s)]] | بيسأل كل 2 أُس 10 = 1024 ثانية |

---

## ٢. السيرفرات: [[/query /peers]]

~~~cmd
w32tm /query /peers
~~~

~~~text الناتج
#Peers: 1

Peer: time.windows.com,0x9
State: Pending
Time Remaining: 14369.9324478s
~~~

سيرفر واحد ([[time.windows.com]])، وحالته [[Pending]] (مستني)، وفاضل حوالي 4 ساعات على المحاولة الجاية. و [[0x9]] أعلام: [[0x1]] زامن كل فترة ثابتة + [[0x8]] اشتغل كـ client.

---

## ٣. قيس الفرق: [[/stripchart]]

~~~cmd
w32tm /stripchart /computer:time.windows.com /samples:3 /dataonly
~~~

| الحتة | معناها |
|---|---|
| [[/stripchart]] | قيس الفرق بين ساعتك وسيرفر كذا مرة |
| [[/computer:time.windows.com]] | السيرفر |
| [[/samples:3]] | 3 قياسات وبس، ومن غيرها بيفضل لحد Ctrl+C |
| [[/dataonly]] | أرقام بس من غير رسم |

~~~text الناتج
Tracking time.windows.com [20.101.57.9:123].
Collecting 3 samples.
The current time is 10/6/2026 10:30:06 AM.
10:30:06, +00.0832942s
10:30:08, +00.0598801s
10:30:10, +00.0853034s
~~~

- [[20.101.57.9:123]] عنوان السيرفر، و [[123]] بورت NTP (بروتوكول الوقت).
- كل سطر قياس، كل ثانيتين تقريبًا. [[+00.0832942s]] = 0.08 ثانية. والرقم الموجب حسب حسبة NTP معناه إن السيرفر سابقك بالقيمة دي.

يعني الساعة كويسة جدًا (أقل من عُشر ثانية) **رغم** إن المزامنة لسه Pending. الحالة لوحدها مش كفاية، القياس هو اللي بيقول.

---

## ٤. المنطقة الزمنية: [[/tz]]

~~~cmd
w32tm /tz
~~~

~~~text الناتج
Time zone: Current:TIME_ZONE_ID_DAYLIGHT Bias: -120min (UTC=LocalTime+Bias)
  [Standard Name:"Egypt Standard Time" Bias:0min Date:(M:10 D:5 DoW:4)]
  [Daylight Name:"Egypt Daylight Time" Bias:-60min Date:(M:4 D:5 DoW:5)]
~~~

- [[TIME_ZONE_ID_DAYLIGHT]] التوقيت الصيفي شغال دلوقتي.
- [[Bias: -120min]] فرق المنطقة الأساسي، والمعادلة مكتوبة جنبه: [[UTC=LocalTime+Bias]]، يعني UTC = الوقت المحلي ناقص 120 دقيقة، فالمنطقة UTC+2.
- في الشتا بيتضاف [[Bias:0min]] بتاع سطر Standard، فتفضل UTC+2. وفي الصيفي بيتضاف [[-60min]] بتاع سطر Daylight: ‎-120 + -60 = ‎-180، يعني UTC+3.
- [[Date:(M:4 D:5 DoW:5)]] الصيفي بيبدأ شهر 4 ([[M]] month)، و [[D:5]] يعني الأسبوع الخامس (الأخير)، و [[DoW:5]] يوم الجمعة (day of week، الأحد = 0).

لو ساعتك متأخرة ساعة بالظبط، المشكلة غالبًا هنا مش في المزامنة.

---

## ٥. شغّل الخدمة

~~~cmd
net start w32time
~~~

[[w32time]] الاسم القصير للخدمة (درس sc و net start). من CMD عادي طلّع [[System error 5 has occurred.]] و [[Access is denied.]]. و [[sc query w32time]] قال إنها [[RUNNING]] أصلًا.

---

## ٦. زامن دلوقتي: [[/resync]]

~~~cmd
w32tm /resync
~~~

~~~text الناتج من CMD عادي
Sending resync command to local computer
The following error occurred: Access is denied. (0x80070005)
~~~

[[0x80070005]] هو نفس error 5 (Access is denied) مكتوب بصيغة hex. من CMD أدمن آخر سطر بيبقى [[The command completed successfully.]] (من التوثيق).

---

## ٧. غيّر السيرفرات

~~~cmd
w32tm /config /manualpeerlist:"time.windows.com,0x9 pool.ntp.org,0x9" /syncfromflags:manual /update
~~~

| الحتة | معناها |
|---|---|
| [[/config]] | غيّر الإعدادات |
| [[/manualpeerlist:"..."]] | لستة السيرفرات، مفصولة بمسافة، وكل واحد بأعلامه |
| [[/syncfromflags:manual]] | خد الوقت من اللستة دي (مش من الدومين) |
| [[/update]] | قول للخدمة تقرا الإعدادات الجديدة دلوقتي |

أدمن، ومشغّلتهوش لأنه بيغيّر الإعدادات.

---

## الخلاصة

| عايز | اكتب | أدمن؟ |
|---|---|---|
| آخر مزامنة | [[w32tm /query /status]] | لأ |
| الفرق الحقيقي | [[w32tm /stripchart /computer:... /samples:3 /dataonly]] | لأ |
| المنطقة الزمنية | [[w32tm /tz]] | لأ |
| زامن | [[w32tm /resync]] | أيوه |

قيس بالـ stripchart الأول: لو الفرق صغير، مفيش حاجة تتصلّح.`,
          lines: [
            "بيعرض حالة مزامنة الوقت: [[Source]] السيرفر اللي الجهاز بياخد منه الوقت، و [[Last Successful Sync Time]] آخر مرة زامن بنجاح. لو المصدر [[Local CMOS Clock]] يبقى الجهاز مش بيزامن مع أي حاجة وساعته ممكن تكون بتزحف.",
            "بيعرض السيرفرات المتظبطة واحد واحد ومعاها [[State]] (Active يعني بيكلمه فعلًا) و [[Time Remaining]] قبل المزامنة الجاية. ده اللي تبص عليه لو الحالة قالت إن آخر مزامنة قديمة.",
            "بيقيس الفرق بين ساعة جهازك وساعة [[time.windows.com]] ٣ مرات ([[/samples:3]]) ويطبع الفرق بالثواني. [[/dataonly]] بيطبع الأرقام بس من غير الرسم بالنجوم. مش بيغيّر الساعة، فآمن تشغّله في أي وقت.",
            "بيعرض المنطقة الزمنية المتظبطة وفرقها عن UTC وقواعد التوقيت الصيفي. لو الساعة غلط بساعة بالظبط، غالبًا المشكلة في المنطقة الزمنية مش في المزامنة.",
            "بيشغّل خدمة الوقت [[w32time]] لو كانت متوقفة. أوامر [[/resync]] و [[/config]] بتكلّم الخدمة دي، فلو مش شغالة هيطلع error إن الخدمة مش متشغّلة. محتاج Admin.",
            "بيطلب من الخدمة تزامن دلوقتي بدل ما تستنى الميعاد الجاي. محتاج Admin، ولو الفرق كبير جدًا أو السيرفر مش واصل هيقولك [[The computer did not resync because no time data was available]].",
            "بيغيّر السيرفرات لاتنين مفصولين بمسافة جوه التنصيص (التنصيص لازم عشان المسافة). [[,0x9]] بعد كل سيرفر فلاجات: 0x8 يعني اتكلم معاه كـ client، و 0x1 يعني استخدم فترة المزامنة الثابتة. [[/syncfromflags:manual]] يعني خد من اللستة دي مش من الدومين، و [[/update]] بيخلّي الخدمة تقرا الإعدادات الجديدة على طول. محتاج Admin."
          ],
          sol: R`جرّبت من CMD عادي. [[w32tm /query /status]]:
[[Leap Indicator: 3(not synchronized)]]
[[Stratum: 0 (unspecified)]]
[[Last Successful Sync Time: unspecified]]
[[Source: Local CMOS Clock]]
[[Poll Interval: 10 (1024s)]]
و [[/query /peers]]: [[#Peers: 1]] و [[Peer: time.windows.com,0x9]] و [[State: Pending]]. و [[/stripchart /computer:time.windows.com /samples:3 /dataonly]]:
[[Tracking time.windows.com [20.101.57.9:123].]]
[[Collecting 3 samples.]]
[[The current time is 10/2/2026 2:22:58 PM.]]
[[14:22:58, +00.1439319s]]
[[14:23:00, +00.1189082s]]
[[14:23:02, +00.0932805s]]
الفرق عُشر ثانية تقريبًا، يعني الساعة كويسة رغم إن المزامنة لسه Pending. و [[/tz]] طلّع [[Egypt Standard Time]] و [[Egypt Daylight Time]]، و [[/query /source]] من غير أدمن: [[The following error occurred: Access is denied. (0x80070005)]].

([[/resync]] و [[/config]] مشغّلتهمش لأنهم محتاجين أدمن وبيغيّروا الساعة والإعدادات.) [[/resync]] لو نجح بيطبع [[Sending resync command to local computer]] و [[The command completed successfully.]]، وبعدها [[/query /status]] بيبقى فيه [[Last Successful Sync Time]] بتاريخ النهارده و [[Source: time.windows.com,0x9]].`
        },
        {
          cmd: "wmic",
          title: "wmic اتشال: البديل من CMD",
          desc: R`[[wmic]] كان أمر في CMD بيجيب معلومات الجهاز (البروسيسور والديسكات والـ BIOS والعمليات)، وهتلاقيه في إجابات وسكربتات قديمة كتير. Microsoft شالته: من ويندوز 11 22H2 بقى ميزة اختيارية (Feature on Demand)، ومش موجود في التسطيبات الجديدة من 24H2، وبيتشال مع الترقية لـ 25H2. البديل [[Get-CimInstance]] في PowerShell، وبيتشغّل من CMD بسطر واحد.

على ويندوز حديث [[wmic cpu get name]] بيطلّع [['wmic' is not recognized as an internal or external command,]] و errorlevel 9009.
[[powershell -NoProfile -Command "..."]] شغّل أمر PowerShell واحد من CMD ورجّع. [[-NoProfile]] متحمّلش ملف الـ profile، فأسرع ومن غير رسايل زيادة. وعلامات التنصيص حوالين الأمر كله لازمة.
[[Get-CimInstance Win32_Processor]] نفس [[wmic cpu]]: الأسامي في wmic كانت اختصارات (alias) لـ classes في WMI، و Get-CimInstance بياخد اسم الـ class نفسه.
[[| Select-Object Name, NumberOfCores]] الأعمدة اللي عايزها، زي [[get name,numberofcores]] في wmic.
الأشهر: [[Win32_BIOS]] (الـ serial)، و [[Win32_DiskDrive]] (الديسكات)، و [[Win32_OperatingSystem]] (نسخة ويندوز وآخر boot)، و [[Win32_Process]] (العمليات ومعاها الـ command line). و [[Win32_Product]] (البرامج المتسطبة) بطيء جدًا وبيخلّي ويندوز يعمل فحص وتصليح لبرامج MSI، فبدله [[winget list]].

WMI نفسه (اللي wmic كان واجهة ليه) لسه موجود، اللي اتشال الأداة بس.`,
          example: R`wmic cpu get name
powershell -NoProfile -Command "Get-CimInstance Win32_Processor | Select-Object Name, NumberOfCores, NumberOfLogicalProcessors"
powershell -NoProfile -Command "Get-CimInstance Win32_DiskDrive | Select-Object Model, Size, Status"
powershell -NoProfile -Command "Get-CimInstance Win32_OperatingSystem | Select-Object Caption, Version, LastBootUpTime"
powershell -NoProfile -Command "(Get-CimInstance Win32_BIOS).SerialNumber"`,
          try: R`لو لقيت سطر wmic في إجابة قديمة (زي [[wmic diskdrive get model,size]])، اكتب بديله بـ Get-CimInstance وشغّله من CMD.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[wmic cpu get name]] و [[where wmic]] على ويندوز 11 حديث، والـ errorlevel بعد كل واحد.`, done: R`[['wmic' is not recognized as an internal or external command,]] و 9009، و [[INFO: Could not find files for the given pattern(s).]] و 1. 9009 هو كود CMD لـ «الأمر مش موجود» في أي سكربت.` },
            { lvl: 'تطبيق', t: R`**refactor:** سكربت قديم فيه [[wmic os get caption]] و [[wmic cpu get numberoflogicalprocessors]]. اكتب بدلهم سطرين [[powershell -NoProfile -Command]] بـ [[Get-CimInstance]].`, done: R`[[(Get-CimInstance Win32_OperatingSystem).Caption]] طبع [[Microsoft Windows 11 Home Single Language]]، و [[Get-CimInstance Win32_Processor | Select-Object -ExpandProperty NumberOfLogicalProcessors]] طبع 16. [[-ExpandProperty]] بيطبع الرقم لوحده من غير عنوان، فـ [[for /f]] يقراه على طول.` },
            { lvl: 'تحدي', t: R`**ابني:** سكربت بيجرّب wmic الأول، ولو errorlevel = 9009 يطبع «wmic missing, using PowerShell» ويكمّل بـ Get-CimInstance، عشان يشتغل على أجهزة قديمة وجديدة.`, done: R`على ويندوز 11 26300 طبع [[wmic missing, using PowerShell]] وتحتها اسم النظام. والشرط [[if %errorlevel%==9009]] بعد [[wmic ... >nul 2>&1]] على سطر لوحده (مش بعد [[&]] على نفس السطر، وإلا [[%errorlevel%]] بيتفك قبل ما wmic يشتغل).` },
          ],
          deep: {
            why: R`سكربتات bat قديمة وإجابات Stack Overflow بتستخدم wmic، وعلى جهاز جديد بتقع بـ «not recognized»، فلازم تعرف تترجمها. وكمان wmic كان من أشهر الأدوات اللي البرامج الخبيثة بتستخدمها (مسح نسخ Shadow Copy وتعطيل الحماية)، وده من أسباب شيله.`,
            how: R`WMI قاعدة معلومات جوه ويندوز عن كل حاجة في الجهاز، متقسمة لـ classes. wmic كان بيكلمها بأسماء مختصرة ([[cpu]] و [[diskdrive]] و [[bios]] و [[os]] و [[process]])، و PowerShell بيكلمها بـ [[Get-CimInstance]] واسم الـ class، والناتج objects تقدر تفلترها وترتبها (درس «Get-CimInstance» في تاب «PowerShell»).

جرّبت على ويندوز 11 (build 26300): wmic مش موجود خالص، و [[where wmic]] طلّع [[INFO: Could not find files for the given pattern(s).]].

لو سكربت قديم مش هتقدر تعدّله ولازم wmic: Settings ثم System ثم Optional features، ودوّر على WMIC لو لسه متاحة لنسختك. ده حل مؤقت. وجوه ملف bat خد الناتج في متغير بـ [[for /f]] (درس for /f)، وأي [[%]] في أمر PowerShell اكتبها [[%%]].`,
            when: R`ترجمة سكربت أو إجابة قديمة، أو معلومة سريعة عن الجهاز (serial للضمان، موديل الديسك، آخر restart) من CMD أو bat.`,
            mistakes: R`تفضل تدوّر إزاي «تسطّب wmic» بدل ما تستخدم البديل. أو [[Get-WmiObject]] (القديم، ومش موجود في PowerShell 7). أو [[Win32_Product]] عشان تعرف البرامج. أو تنسى علامات التنصيص حوالين أمر PowerShell، فـ CMD ياخد الـ [[|]] على إنها pipe بتاعته (التفاصيل تحت).`
          },
          teach: R`## الفكرة: نفس السؤال، من غير wmic

أول سطر بيوريك إن [[wmic]] مبقاش موجود، وكل سطر بعده بيجيب معلومة كان wmic بيجيبها، بس عن طريق PowerShell وانت لسه في CMD. جرّبت كل السطور في CMD على ويندوز 11 (build 26300).

---

## ١. [[wmic cpu get name]]

~~~cmd
wmic cpu get name
~~~

~~~text الناتج
'wmic' is not recognized as an internal or external command,
operable program or batch file.
~~~

و [[%errorlevel%]] طلع [[9009]]، وده الكود اللي CMD بيرجّعه لما ميلاقيش الأمر. و [[where wmic]] قال [[INFO: Could not find files for the given pattern(s).]]: الملف مش على الجهاز أصلًا.

---

## ٢. البروسيسور: السطر من جوه لبرة

~~~cmd
powershell -NoProfile -Command "Get-CimInstance Win32_Processor | Select-Object Name, NumberOfCores, NumberOfLogicalProcessors"
~~~

### الغلاف: [[powershell -NoProfile -Command "..."]]

| الحتة | معناها |
|---|---|
| [[powershell]] | شغّل Windows PowerShell 5.1 (موجود في كل ويندوز 10 و 11) |
| [[-NoProfile]] | متحمّلش ملف الـ profile: أسرع ومن غير رسايل زيادة |
| [[-Command "..."]] | نفّذ الأمر ده وارجع لـ CMD |

علامات التنصيص حوالين الأمر كله **لازمة**. جرّبت من غيرها:

~~~cmd
powershell -NoProfile -Command Get-CimInstance Win32_Processor | Select-Object Name
~~~

~~~text الناتج
'Select-Object' is not recognized as an internal or external command,
operable program or batch file.
~~~

CMD شاف [[|]] الأول، فاعتبرها pipe بتاعته وحاول يشغّل [[Select-Object]] كأمر CMD. مع التنصيص، الـ [[|]] بتوصل لـ PowerShell سليمة.

### جوه: [[Get-CimInstance Win32_Processor]]

[[Get-CimInstance]] بيسأل WMI (قاعدة معلومات ويندوز عن الجهاز)، و [[Win32_Processor]] اسم الـ class اللي فيه البروسيسور. ده نفس اللي [[wmic cpu]] كان بيعمله؛ [[cpu]] كان اسم مختصر (alias) للـ class ده.

### [[| Select-Object Name, NumberOfCores, NumberOfLogicalProcessors]]

خد الأعمدة دي بس، زي [[get name,numberofcores]] في wmic.

~~~text الناتج
Name                                    NumberOfCores NumberOfLogicalProcessors
----                                    ------------- -------------------------
AMD Ryzen 7 5800H with Radeon Graphics             8                        16
~~~

8 cores حقيقية، وكل واحد بيشغّل اتنين في نفس الوقت (SMT)، فويندوز شايف 16.

---

## ٣. الديسكات

~~~cmd
powershell -NoProfile -Command "Get-CimInstance Win32_DiskDrive | Select-Object Model, Size, Status"
~~~

~~~text الناتج
Model                    Size Status
-----                    ---- ------
LABSSD-A-1TB    1024203640320 OK
LABSSD-B-1TB    1000202273280 OK
~~~

[[Size]] بالبايت: 1,000,202,273,280 تقريبًا 1000 مليار = 1 تيرا بحساب الشركات (اللي بتعدّ بالألف)، وويندوز هيقول حوالي 931 GB. و [[Status OK]] الديسك مش بيبلّغ عن مشكلة.

---

## ٤. ويندوز وآخر boot

~~~cmd
powershell -NoProfile -Command "Get-CimInstance Win32_OperatingSystem | Select-Object Caption, Version, LastBootUpTime"
~~~

~~~text الناتج
Caption                                   Version    LastBootUpTime
-------                                   -------    --------------
Microsoft Windows 11 Home Single Language 10.0.26300 10/6/2026 9:23:44 AM
~~~

[[Caption]] اسم النسخة، و [[Version]] رقمها (ويندوز 11 لسه رقمه 10.0، والـ build بعده)، و [[LastBootUpTime]] آخر مرة الجهاز فتح؛ لو تاريخ قديم، الجهاز معملش restart من زمان.

---

## ٥. الـ serial

~~~cmd
powershell -NoProfile -Command "(Get-CimInstance Win32_BIOS).SerialNumber"
~~~

هنا شكل تاني: [[( ... )]] نفّذ الأمر الأول، و [[.SerialNumber]] هات الخانة دي بس، فيطبع سطر واحد فيه الـ serial (بتحتاجه للضمان). (طلع عندي، ومش هكتبه.)

---

## ترجمة wmic القديم

| wmic | البديل |
|---|---|
| [[wmic cpu get name]] | [[Get-CimInstance Win32_Processor]]، واسم البروسيسور في خاصية [[Name]] |
| [[wmic diskdrive get model,size]] | [[Get-CimInstance Win32_DiskDrive]]، والموديل والحجم بالبايت في [[Model]] و [[Size]] |
| [[wmic os get caption]] | [[Get-CimInstance Win32_OperatingSystem]]، واسم الويندوز في [[Caption]] |
| [[wmic bios get serialnumber]] | [[(Get-CimInstance Win32_BIOS).SerialNumber]]: الأقواس بتجيب الكائن الأول وبعدين الخاصية |
| [[wmic process list]] | [[Get-CimInstance Win32_Process]]: كل عملية شغالة بالـ PID بتاعها |

## الخلاصة

- الشكل من CMD: [[powershell -NoProfile -Command "Get-CimInstance الـclass | Select-Object الأعمدة"]].
- التنصيص حوالين الأمر كله، وإلا CMD ياكل الـ [[|]].`,
          lines: [
            R`على ويندوز حديث: not recognized.`,
            R`البديل: اسم البروسيسور وعدد الـ cores.`,
            R`الديسكات: الموديل والحجم بالبايت والحالة.`,
            R`نسخة ويندوز وآخر مرة الجهاز فتح.`,
            R`الـ serial بتاع الجهاز (للضمان).`
          ],
          sol: R`على ويندوز 11 (build 26300): [[wmic cpu get name]] طلّع [['wmic' is not recognized as an internal or external command,]] و errorlevel 9009. والبدايل اشتغلت من CMD:
البروسيسور: [[AMD Ryzen 7 5800H with Radeon Graphics]] و [[8]] cores و [[16]] logical processors (في شكل جدول).
الديسكات: [[LABSSD-A-1TB  1024203640320  OK]] و [[LABSSD-B-1TB  1000202273280  OK]] (أسامي الموديلات اتغيّرت، والأحجام زي ما طلعت. الحجم بالبايت: حوالي 1 تيرا بحساب الشركات).
ويندوز: [[Microsoft Windows 11 Home Single Language]] و [[10.0.26300]] ووقت آخر boot.
والـ serial سطر واحد (مش هكتبه هنا).

ولو شلت علامات التنصيص: [[powershell -NoProfile -Command Get-CimInstance Win32_Processor | Select-Object Name]] طلّع [['Select-Object' is not recognized as an internal or external command,]]، لأن CMD أخد الـ [[|]] وحاول يشغّل Select-Object كأمر بتاعه.`
        },
        {
          cmd: "reg query / reg add",
          title: "اقرا الريجستري واعمله باك أب قبل ما تلمسه",
          learn: R`تقرا أي قيمة من الريجستري بـ [[reg query]] وتطلّعها لمتغير في سكربت، وتدوّر جواه بـ [[/f]]، وتاخد نسخة بـ [[reg export]] وتقارن بـ [[reg compare]]، وتعرف [[reg add]] و [[reg delete]] و [[reg import]] بيتكتبوا إزاي وإمتى.`,
          out: R`أي إجابة على النت بتقولك «غيّر القيمة دي في الريجستري» هتعرف تقراها الأول، وتاخد نسخة منها، وترجّعها لو حاجة باظت.`,
          use: {
            prog: R`سكربت بيعرف نسخة ويندوز من [[CurrentBuild]]، أو مسار برنامج متسطّب من مفتاح [[Uninstall]]، أو إعداد بتاع برنامجك نفسه من [[HKCU\Software]].`,
            work: R`«الإعداد ده مش ظاهر في Settings»: كتير من إعدادات ويندوز والبرامج مكانها الريجستري بس، والدعم الفني بيطلب منك [[reg export]] لمفتاح عشان يشوف إعداداتك.`,
            cs: R`الريجستري قاعدة بيانات شجرية (key/value) بيقرا منها ويندوز والبرامج إعداداتهم، بدل ملفات [[.ini]] متفرقة. نفس فكرة [[/etc]] في لينكس بس في ملفات binary اسمها hives.`,
          },
          desc: R`الريجستري (Registry) هو المكان اللي ويندوز والبرامج بيحفظوا فيه إعداداتهم. [[reg query]] بيقرا منه، و [[reg export]] بياخد نسخة من مفتاح في ملف [[.reg]]، و [[reg compare]] بيقارن مفتاحين. التلاتة قراية بس ومش محتاجين أدمن لأغلب المفاتيح. أما [[reg add]] و [[reg delete]] و [[reg import]] فبيغيّروا فيه، و [[HKLM]] منهم محتاج أدمن.

الشكل شجرة زي الفولدرات: **key** (مفتاح، زي فولدر) جواه **values** (قيم، زي ملفات)، وكل قيمة ليها اسم ونوع وبيانات. أول الشجرة **hive** (فرع رئيسي):
[[HKLM]] (HKEY_LOCAL_MACHINE) إعدادات الجهاز كله، و [[HKCU]] (HKEY_CURRENT_USER) إعداداتك انت بس، و [[HKCR]] أنواع الملفات، و [[HKU]] كل اليوزرز.

[[reg query "المفتاح" /v الاسم]] قيمة واحدة، ومن غير [[/v]] كل اللي في المفتاح، و [[/s]] ومعاه كل اللي تحته، و [[/f "كلمة"]] دوّر.
[[reg export "المفتاح" file.reg /y]] نسخة، و [[/y]] اكتب فوق الملف لو موجود من غير سؤال.
[[reg add "المفتاح" /v الاسم /t REG_SZ /d القيمة /f]] اكتب قيمة (و [[/f]] من غير سؤال)، و [[reg delete "المفتاح" /v الاسم /f]] امسحها، و [[reg import file.reg]] رجّع نسخة.

المسار فيه مسافات دايمًا تقريبًا ([[Windows NT]])، فحطه بين علامات تنصيص. والقاعدة اللي متتكسرش: **[[reg export]] قبل أي [[reg add]] أو [[reg delete]]**. وفي PowerShell نفس الحاجة بـ [[Get-ItemProperty]] على [[HKCU:\]] (تاب «PowerShell»).`,
          example: R`reg query "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion" /v CurrentBuild
reg query "HKCU\Console" /v QuickEdit
reg query "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion" /f "Build" /v
reg export "HKCU\Console" console-backup.reg /y
reg add "HKCU\Software\LabDemo" /v Theme /t REG_SZ /d dark /f
reg query "HKCU\Software\LabDemo"
reg delete "HKCU\Software\LabDemo" /f`,
          try: R`اقرا [[CurrentBuild]] و [[ProductName]] من [[HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion]] وقارنهم بـ [[ver]]. وبعدين اعمل [[reg export]] لـ [[HKCU\Console]] في فولدر تجربة، وعدّ القيم اللي اسمها [[QuickEdit]] جوه الملف.`,
          deep: {
            why: R`نص النصايح بتاعة ويندوز على النت بتقول «غيّر القيمة دي في الريجستري»، والناس بتفتح regedit وتغيّر من غير ما تحفظ القديم. [[reg query]] بيوريك القيمة الحالية بالظبط، و [[reg export]] بيخلي التراجع سطر واحد، وكله من سكربت تقدر تقراه وتعيده بدل ضغطات في regedit محدش فاكرها.`,
            how: R`الريجستري متخزّن في ملفات اسمها hives: [[HKLM\SOFTWARE]] في [[C:\Windows\System32\config\SOFTWARE]]، و [[HKCU]] في [[NTUSER.DAT]] جوه فولدرك. [[reg.exe]] بيكلّم نفس الـ API اللي regedit والبرامج بتستخدمه، فاللي بتقراه هو اللي البرنامج شايفه.

كل مفتاح عليه صلاحيات زي الملفات (ACL): [[HKCU]] بتاعك فبتكتب فيه من غير أدمن، و [[HKLM\SOFTWARE]] الكل يقرا والأدمن بس يكتب، و [[HKLM\SAM\SAM]] (باسوردات اليوزرز) حتى القراية ممنوعة: جرّبتها وطلّعت [[ERROR: Access is denied.]].

وعلى ويندوز 64 بت فيه نسختين من [[HKLM\SOFTWARE]]: واحدة للبرامج الـ 64 وواحدة للـ 32 ([[WOW6432Node]])، و [[/reg:32]] بيقرا من نسخة الـ 32.`,
            when: R`[[reg query]] في أي سكربت محتاج يعرف حاجة عن الجهاز أو برنامج متسطّب، ولما تتأكد من نصيحة قبل ما تطبّقها. [[reg export]] قبل أي تعديل، ولما حد يطلب إعداداتك. [[reg add]] لإعداد بتاع يوزرك في [[HKCU]] أو في سكربت تجهيز جهاز جديد بعد ما تجرّبه في Windows Sandbox. ولو الإعداد ليه مكان في Settings أو Group Policy، استخدمه بدل الريجستري.`,
            mistakes: R`تنسى علامات التنصيص حوالين مسار فيه [[Windows NT]] فتاخد [[ERROR: Invalid syntax.]]. أو تقرا القيمة بـ [[for /f "tokens=3"]] وهي فيها مسافات فتاخد أول كلمة بس. أو تثق في [[ProductName]] اللي بيقول «Windows 10» على ويندوز 11. أو تعمل [[reg export]] من غير [[/y]] جوه سكربت فيقف يسأل [[Overwrite (Yes/No)?]]. أو تعمل [[reg add]] في [[HKLM]] من غير ما تاخد نسخة، أو تحط [[/f]] على [[reg delete]] لمفتاح كامل وانت فاكر إنك بتمسح قيمة واحدة (من غير [[/v]] بيتمسح المفتاح كله باللي تحته).`
          },
          teach: R`## الفكرة: فولدرات وملفات، بس للإعدادات

الريجستري شجرة: **key** شبه الفولدر، وجواه **values** شبه الملفات، ولكل value اسم و **type** و **data**. كل اللي تحت اتشغّل في CMD على ويندوز 11 (build 26300) من نافذة **عادية**، ما عدا [[reg add]] و [[reg delete]] و [[reg import]]: دول بيغيّروا الجهاز، فمكتوب عليهم إنهم من وثائق Microsoft، وجرّبهم في Windows Sandbox أو VM.

| الاختصار | الاسم الكامل | فيه إيه |
|---|---|---|
| [[HKLM]] | HKEY_LOCAL_MACHINE | إعدادات الجهاز كله والبرامج المتسطّبة |
| [[HKCU]] | HKEY_CURRENT_USER | إعداداتك انت بس |
| [[HKCR]] | HKEY_CLASSES_ROOT | أنواع الملفات والبرامج اللي بتفتحها |
| [[HKU]] | HKEY_USERS | كل اليوزرز اللي ليهم بروفايل متحمّل |

---

## ١. قيمة واحدة: [[reg query ... /v]]

~~~cmd
reg query "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion" /v CurrentBuild
~~~

- [["HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion"]] المفتاح، بين علامات تنصيص عشان [[Windows NT]] فيها مسافة.
- [[/v CurrentBuild]] اسم القيمة (v = value).

~~~text اتشغّل فعلًا · ويندوز 11 · cmd.exe · نافذة عادية
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion
    CurrentBuild    REG_SZ    26300
~~~

السطر الأول المفتاح بالاسم الكامل، والتاني فيه ٣ حاجات مفصولة بمسافات: الاسم، والنوع، والبيانات. errorlevel 0.

الأنواع اللي هتشوفها:

| النوع | معناه | مثال |
|---|---|---|
| [[REG_SZ]] | نص | [[26300]] كنص، و [[C:\Program Files]] |
| [[REG_DWORD]] | رقم ٣٢ بت، بيتعرض hex | [[0x1]] |
| [[REG_QWORD]] | رقم ٦٤ بت للأرقام الكبيرة | نادر في الإعدادات العادية |
| [[REG_EXPAND_SZ]] | نص فيه متغيرات بتتفك وقت القراية | [[%SystemRoot%\System32]] |
| [[REG_MULTI_SZ]] | لستة نصوص، كل واحد في سطر | لستة سيرفرات أو مسارات |
| [[REG_BINARY]] | بايتات خام بالـ hex | إعدادات البرامج اللي بتحفظ structs |

~~~cmd
reg query "HKCU\Console" /v QuickEdit
~~~

~~~text اتشغّل فعلًا
HKEY_CURRENT_USER\Console
    QuickEdit    REG_DWORD    0x1
~~~

[[0x1]] يعني «مفعّل»: Quick Edit هو اللي بيخلّي الكليك في نافذة CMD يبدأ تحديد نص (ولو دوست في النص والسكربت وقف، ده السبب).

### لما الحاجة مش موجودة

| جرّبت | الناتج | errorlevel |
|---|---|---|
| قيمة مش موجودة [[/v NoSuchValueLab]] | [[ERROR: The system was unable to find the specified registry key or value.]] | 1 |
| مفتاح مش موجود [[HKCU\Software\NoSuchKeyLab]] | نفس الرسالة | 1 |
| من غير علامات تنصيص حوالين [[Windows NT]] | [[ERROR: Invalid syntax.]] و [[Type "REG QUERY /?" for usage.]] | 1 |
| hive غلط [[HKXX\Software]] | [[ERROR: Invalid key name.]] | 1 |
| [[HKLM\SAM\SAM]] | [[ERROR: Access is denied.]] | 1 |

فـ «موجود ولا لأ» في سكربت:

~~~cmd
reg query "HKCU\Software\NoSuchKeyLab" >nul 2>&1 && echo yes || echo no
~~~

طبع [[no]]. بس خد بالك: نفس الكود 1 للـ «مش موجود» و «ممنوع» و «syntax غلط»، فلو محتاج تفرّق، سيب الرسالة تظهر.

---

## ٢. القيمة في متغير: [[for /f]]

~~~cmd
for /f "tokens=3" %a in ('reg query "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion" /v CurrentBuild ^| findstr CurrentBuild') do echo build=%a
~~~

- [[for /f]] بيشغّل الأمر اللي بين [['...']] ويلف على سطور ناتجه (درس for /f).
- [[^|]] الـ pipe جوه الأقواس لازم [[^]] قبله، عشان CMD ميفهموش pipe للـ [[for]] نفسه.
- [[findstr CurrentBuild]] بيسيب سطر القيمة بس من غير سطر اسم المفتاح.
- [[tokens=3]] الكلمة التالتة: [[CurrentBuild]] ثم [[REG_SZ]] ثم [[26300]].

طبع [[build=26300]]. (في ملف [[.bat]] اكتب [[%%a]] بدل [[%a]].)

### الفخ: قيمة فيها مسافات

نفس الكلام على [[ProductName]] بـ [[tokens=3]] طبع [[tok3=]] وبعدها كلمة [[Windows]] بس. الحل [[tokens=2,*]]: التاني ([[REG_SZ]]) في [[%%a]]، و [[*]] = «كل الباقي» في [[%%b]]:

~~~cmd
for /f "tokens=2,*" %a in ('reg query "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion" /v ProductName ^| findstr ProductName') do echo product=[%b]
~~~

~~~text اتشغّل فعلًا · على ويندوز 11
product=[Windows 10 Home Single Language]
~~~

**أيوه، «Windows 10» على جهاز ويندوز 11.** Microsoft سابت [[ProductName]] زي ما هي عشان برامج قديمة بتقراها. الصح تقرا [[CurrentBuild]]: من [[22000]] وطالع يبقى ويندوز 11. والقاعدة العامة: متعتمدش على اسم ظاهر، اعتمد على رقم.

---

## ٣. دوّر جوه المفاتيح: [[/f]] و [[/s]] و [[/t]]

~~~cmd
reg query "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion" /f "Build" /v
~~~

- [[/f "Build"]] الكلمة اللي بتدوّر عليها (find).
- [[/v]] هنا من غير اسم بعدها معناها «دوّر في أسامي القيم بس» (و [[/k]] في أسامي المفاتيح، و [[/d]] في البيانات).

~~~text اتشغّل فعلًا
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion
    BaseBuildRevisionNumber    REG_DWORD    0x1
    BuildBranch    REG_SZ    ge_release
    BuildGUID    REG_SZ    ffffffff-ffff-ffff-ffff-ffffffffffff
    BuildLab    REG_SZ    26100.ge_release.240331-1435
    BuildLabEx    REG_SZ    26100.1.amd64fre.ge_release.240331-1435
    CurrentBuild    REG_SZ    26300
    CurrentBuildNumber    REG_SZ    26300

End of search: 7 match(es) found.
~~~

errorlevel 0. ولو مفيش نتايج ([[/f "zzzlab"]]): [[End of search: 0 match(es) found.]] و errorlevel **1**. فـ [[/f]] بيرجّع كود ينفع تبني عليه.

- [[/s]] كل المفاتيح اللي تحت (subkeys): [[reg query "HKCU\Console" /s | find /c "HKEY_"]] طبع [[6]]، يعني [[Console]] وتحته ٥ مفاتيح لبرامج مختلفة.
- [[/t REG_DWORD]] نوع واحد بس.
- [[/ve]] القيمة الافتراضية اللي ملهاش اسم: [[reg query "HKCU\Environment" /ve]] طبع [[(Default)    REG_SZ    (value not set)]].

### نسختين من [[HKLM\SOFTWARE]]: [[/reg:32]]

~~~cmd
reg query "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion" /v ProgramFilesDir
reg query "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion" /v ProgramFilesDir /reg:32
~~~

الأول طبع [[C:\Program Files]] والتاني [[C:\Program Files (x86)]]. البرامج الـ 32 بت بتشوف نسخة تانية من [[HKLM\SOFTWARE]] (تحت [[WOW6432Node]])، فلو دوّرت على برنامج قديم ومش لاقيه، جرّب [[/reg:32]].

---

## ٤. خد نسخة: [[reg export]]

~~~cmd
reg export "HKCU\Console" console-backup.reg /y
~~~

~~~text اتشغّل فعلًا
The operation completed successfully.
~~~

- [[console-backup.reg]] ملف نص بيبدأ بـ [[Windows Registry Editor Version 5.00]]، وفيه المفتاح وكل اللي تحته بشكل [["QuickEdit"=dword:00000001]].
- [[/y]] لو الملف موجود اكتب فوقه.

### فخين اتشافوا فعلًا

**١. من غير [[/y]] والملف موجود:** بيسأل [[File console.reg already exists. Overwrite (Yes/No)?]]. لما رديت [[n]] طبع [[The operation was canceled by the user.]] بس errorlevel كان **0**، فسكربت هيفتكر إن النسخة اتاخدت. ولما شغّلته من غير keyboard خالص (stdin متوجّه، زي مهمة مجدولة) السؤال فضل يتكرر لحد ما قفلته بإيدي. يعني [[/y]] دايمًا في السكربتات.

**٢. الملف UTF-16:** [[findstr QuickEdit console-backup.reg]] طبع [[FINDSTR: Warning - input file console.reg is in Unicode format.]] ومالقاش حاجة. الحل [[type console-backup.reg | find /c "QuickEdit"]] (الـ [[type]] بيفك UTF-16) وطبع [[3]].

ومفتاح مش موجود: [[ERROR: The system was unable to find the specified registry key or value.]] و errorlevel 1، فـ [[reg export ... || exit /b 1]] بيوقف السكربت قبل ما يغيّر حاجة من غير نسخة.

---

## ٥. قارن: [[reg compare]]

بيقارن مفتاحين **شغالين** (مش ملفات [[.reg]]). في ملف [[.bat]]، و [[%%]] عشان اسم المفتاح نفسه فيه [[%SystemRoot%]] حرفيًا ومش عايزه يتفك:

~~~cmd
reg compare "HKCU\Console" "HKCU\Console\%%SystemRoot%%_System32_WindowsPowerShell_v1.0_powershell.exe" /v QuickEdit
~~~

~~~text اتشغّل فعلًا
Result Compared:  Identical
The operation completed successfully.
~~~

errorlevel 0. ومن غير [[/v]] ومع [[/s /od]] (اطبع الفرق بس) على نفس المفتاحين: سطور [[<]] للأول و [[>]] للتاني، زي:

~~~text اتشغّل فعلًا (أول سطرين)
< Value: HKEY_CURRENT_USER\Console  FaceName REG_SZ __DefaultTTFont__
> Value: HKEY_CURRENT_USER\Console\%SystemRoot%_System32_WindowsPowerShell_v1.0_powershell.exe  FaceName REG_SZ Lucida Console
~~~

وفي الآخر [[Result Compared:  Different]] و errorlevel **2**. ومفتاح مع نفسه: [[ERROR: The registry entry is being compared with itself.]] و 1.

| errorlevel | reg compare |
|---|---|
| 0 | المفتاحين زي بعض في كل اللي اتقارن |
| 2 | فيه فرق، وسطور [[<]] و [[>]] بتوريه |
| 1 | المقارنة نفسها فشلت: مفتاح مش موجود، أو قارنت مفتاح بنفسه |

---

## ٦. الكتابة: [[reg add]] و [[reg delete]] و [[reg import]] (من الوثائق)

الأوامر دي متشغّلتش على الجهاز ده لأنها بتغيّر الريجستري. الشكل من وثائق Microsoft و [[reg add /?]]:

~~~cmd
reg add "HKCU\Software\LabDemo" /v Theme /t REG_SZ /d dark /f
reg add "HKCU\Software\LabDemo" /v Retries /t REG_DWORD /d 3 /f
reg delete "HKCU\Software\LabDemo" /v Theme /f
reg delete "HKCU\Software\LabDemo" /f
reg import console-backup.reg
~~~

- [[/v]] اسم القيمة، و [[/t]] النوع (من غيره [[REG_SZ]])، و [[/d]] البيانات، و [[/f]] اكتب فوق القديم من غير سؤال. ولو المفتاح مش موجود [[reg add]] بيعمله.
- [[reg delete ... /v Theme]] قيمة واحدة. **ومن غير [[/v]]: المفتاح كله باللي تحته.**
- [[reg import]] بيكتب كل اللي في الملف فوق الموجود.
- النجاح بيطبع نفس [[The operation completed successfully.]] اللي شفناه في export. وفي [[HKLM]] من نافذة عادية بيترفض بـ [[ERROR: Access is denied.]] (زي القراية من [[SAM]] فوق).

الترتيب الآمن في أي سكربت: export ← add ← query تتأكد ← ولو فيه مشكلة import.

---

## ٧. نفس الكلام في PowerShell

| CMD | PowerShell | الفرق |
|---|---|---|
| [[reg query "HKCU\Console" /v QuickEdit]] | [[Get-ItemPropertyValue HKCU:\Console -Name QuickEdit]] | بيرجّع الرقم [[1]] نفسه من غير سطور حواليه |
| [[reg add ... /v x /d 1 /f]] | [[Set-ItemProperty HKCU:\Software\LabDemo -Name x -Value 1]] | المفتاح لازم يكون موجود (بيتعمل بـ [[New-Item]]) |
| [[reg query ... /s]] | [[Get-ChildItem HKCU:\Console -Recurse]] | بيرجّع objects تفلترها بـ [[Where-Object]] |
| [[reg export]] | مفيش بديل مباشر | بيستخدموا [[reg export]] نفسه من PowerShell |

PowerShell بيرجّع القيمة نفسها (رقم أو نص) فمش محتاج [[for /f]] و [[tokens]].

---

## الخلاصة

| عايز | اكتب |
|---|---|
| قيمة واحدة | [[reg query "KEY" /v Name]] |
| موجود ولا لأ | [[reg query "KEY" >nul 2>&1 && ...]] |
| القيمة في متغير | [[for /f "tokens=2,*"]] و [[%%b]] |
| دوّر | [[reg query "KEY" /f "word" /s]] (0 لقى، 1 ملقاش) |
| نسخة | [[reg export "KEY" file.reg /y]] |
| قارن | [[reg compare "K1" "K2" /s /od]] (0 زي بعض، 2 مختلفين) |
| برامج 32 بت | [[/reg:32]] |
| اكتب (بعد export) | [[reg add "KEY" /v Name /t REG_SZ /d value /f]] |

متنساش: تنصيص حوالين المسار، و [[/y]] في export، و [[CurrentBuild]] مش [[ProductName]].`,
          lines: [
            R`بيقرا قيمة واحدة: المفتاح بين علامات تنصيص لأن فيه [[Windows NT]]، و [[/v CurrentBuild]] اسم القيمة. طبع سطر المفتاح وتحته [[CurrentBuild    REG_SZ    26300]]: الاسم والنوع والبيانات، و errorlevel 0. رقم الـ build ده أصدق من اسم النسخة.`,
            R`قيمة من إعداداتك انت في [[HKCU]] (مش محتاج أدمن): [[QuickEdit    REG_DWORD    0x1]]، يعني الكليك في نافذة CMD بيبدأ تحديد. [[REG_DWORD]] رقم وبيتعرض hex.`,
            R`[[/f "Build"]] بيدوّر، و [[/v]] من غير اسم بعدها يعني «في أسامي القيم بس». طبع ٧ قيم فيها Build وآخرها [[End of search: 7 match(es) found.]] و errorlevel 0، ولو ملقاش [[0 match(es)]] و 1.`,
            R`بياخد نسخة من المفتاح وكل اللي تحته في ملف [[.reg]] (UTF-16)، و [[/y]] بيكتب فوق الملف لو موجود من غير ما يسأل. طبع [[The operation completed successfully.]]. ده أول سطر في أي سكربت هيغيّر حاجة.`,
            R`(من الوثائق، جرّبه في Sandbox) بيعمل المفتاح [[LabDemo]] لو مش موجود ويكتب فيه قيمة [[Theme]] نوعها نص وبياناتها [[dark]]. [[/f]] بيكتب فوق القديمة من غير سؤال. في [[HKCU]] مش محتاج أدمن.`,
            R`تتأكد إن الكتابة حصلت: بيطبع المفتاح وتحته [[Theme    REG_SZ    dark]]. دايمًا اقرا بعد ما تكتب بدل ما تفترض.`,
            R`(من الوثائق) بيمسح المفتاح كله باللي فيه، لأن مفيش [[/v]]. و [[/f]] من غير سؤال تأكيد، فلو كتبت المفتاح الغلط مفيش رجوع غير من ملف export.`,
          ],
          sol: R`[[reg query "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion" /v CurrentBuild]] طبع [[CurrentBuild    REG_SZ    26300]] و [[ver]] طبع نفس الرقم في [[10.0.26300.9818]]. أما [[/v ProductName]] فطبع [[Windows 10 Home Single Language]] على ويندوز 11، وده الفخ: الاسم ده متسابش يتحدّث عشان البرامج القديمة، فاعتمد على [[CurrentBuild]] (22000 وطالع = ويندوز 11).

[[reg export "HKCU\Console" console.reg /y]] طبع [[The operation completed successfully.]]، و [[findstr QuickEdit console.reg]] طبع [[FINDSTR: Warning - input file console.reg is in Unicode format.]] ومالقاش حاجة لأن الملف UTF-16، و [[type console.reg | find /c "QuickEdit"]] طبع [[3]]: مرة في [[HKCU\Console]] نفسه ومرتين في مفاتيح نوافذ PowerShell اللي تحته. اتجرّب على ويندوز 11 في CMD عادي، و [[reg add/delete/import]] من وثائق Microsoft ومتشغّلوش.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[reg query "HKCU\Software\NoSuchKeyLab"]] و [[reg query HKXX\Software]] و [[reg query HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion /v CurrentBuild]] (من غير تنصيص). اكتب الرسالة والكود لكل واحد قبل ما تشغّل.`, done: R`الأول [[ERROR: The system was unable to find the specified registry key or value.]]، والتاني [[ERROR: Invalid key name.]]، والتالت [[ERROR: Invalid syntax.]]، والتلاتة errorlevel 1. فالكود لوحده مش بيفرّق بين «مش موجود» و «كتبته غلط».` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[for /f "tokens=3" %%a in ('reg query "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion" /v ProductName ^| findstr ProductName') do set "os=%%a"]] وبعدها [[echo os=%os%]]. إيه اللي اتطبع؟ صلّحه، وبعدين قول ليه حتى بعد التصليح القيمة دي متنفعش تعرف بيها ويندوز 11.`, done: R`البايظ طبع [[os=Windows]] بس. بـ [[tokens=2,*]] و [[%%b]] طبع [[os=Windows 10 Home Single Language]] كاملة، وعلى ويندوز 11! فالسكربت يقرا [[CurrentBuild]] (هنا [[26300]]) ويقارنه بـ 22000 بـ [[if %build% GEQ 22000]].` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** [[reg query "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall" | find /c "HKEY_"]] وبعدين نفس الأمر بـ [[/reg:32]]. وطلّع [[DisplayName]] لأي برنامج من مفتاحه بـ [[/v DisplayName]].`, done: R`رقمين مختلفين: الأول مفاتيح برامج الـ 64 بت والتاني برامج الـ 32 بت ([[WOW6432Node]])، وده سبب إن برنامج «مش لاقيه» في الريجستري. وقريت اسم برنامج من [[DisplayName]] و [[DisplayVersion]].` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** [[reg export "HKCU\Console" c.reg /y]]، وبعدين [[findstr QuickEdit c.reg]] جنب [[type c.reg | find /c "QuickEdit"]]. وجرّب [[echo n| reg export "HKCU\Console" c.reg]] من غير [[/y]] واطبع [[%errorlevel%]] على سطر لوحده.`, done: R`findstr طبع [[FINDSTR: Warning - input file c.reg is in Unicode format.]] ومالقاش، و [[type | find]] طبع 3. والـ [[n]] طبع [[The operation was canceled by the user.]] و errorlevel **0**: الإلغاء مش بيبان في الكود، فـ [[/y]] إجباري في السكربت.` },
            { lvl: 'تحدي', t: R`**ابني:** [[regbackup.bat "KEY" NAME]] بيعمل [[backups\NAME-<تاريخ ووقت>.reg]] (درس «%time% فيه مسافة و %date% فيه /»)، ويخرج بكود 1 برسالة واضحة لو المفتاح مش موجود، ويكتب سطر في [[backups\log.txt]]، ومبيسألش أبدًا.`, done: R`على [[HKCU\Console]] بيعمل ملف جديد كل مرة (تشغيلتين = ملفين)، وعلى [[HKCU\Software\NoSuchKeyLab]] بيطبع رسالتك وكود 1 ومبيعملش ملف فاضي، واللوج فيه سطر لكل تشغيلة بنتيجتها، والسكربت بيخلص لوحده من غير ما يستنى keyboard.` },
            { lvl: 'تحدي', t: R`**محاكاة:** في Windows Sandbox (مش جهازك): [[regbackup.bat "HKCU\Console" console]] ← [[reg add "HKCU\Console" /v QuickEdit /t REG_DWORD /d 0 /f]] ← افتح CMD جديد وجرّب الكليك ← [[reg import]] للنسخة ← [[reg query ... /v QuickEdit]].`, done: R`بعد الـ add [[QuickEdit    REG_DWORD    0x0]] والكليك في النافذة الجديدة مبقاش بيحدد، وبعد الـ import رجعت [[0x1]]. وكتبت إن الإعداد بيتقري وقت فتح النافذة، فالنافذة المفتوحة قبلها مبتتغيّرش. (الخطوات دي من وثائق Microsoft، ومتجرّبتش على جهاز التجربة.)` },
          ],
          ci: [
            { os: [R`windows`], sh: R`cmd`, run: R`@echo off
reg query "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion" /v CurrentBuild | findstr /c:"REG_SZ" >nul && echo build-ok
reg query "HKCU\Software\NoSuchKeyLab" >nul 2>&1 || echo missing-ok
reg query "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion" /f "zzzlab" /v >nul
echo find-none=%errorlevel%
reg export "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon" w.reg /y >nul && echo export-ok
type w.reg | findstr /l /c:"Windows Registry Editor" >nul && echo utf16-ok
exit /b 0`, expect: [R`build-ok`, R`missing-ok`, R`find-none=1`, R`export-ok`, R`utf16-ok`] },
          ],
          flag: "danger",
        },
        {
          cmd: "wevtutil",
          title: "اقرا Event Viewer من سطر الأوامر",
          learn: R`تعرض اللوجات اللي ويندوز بيكتبها، وتطلّع آخر الأخطاء أو حدث معيّن بالـ ID أو آخر ٢٤ ساعة بفلتر XPath، وتصدّر لوج لملف [[.evtx]] تبعته لحد، وتقرا التاريخ صح.`,
          out: R`«الجهاز عمل restart لوحده» أو «الخدمة وقعت إمتى» هتجاوبها بسطر واحد بدل ما تقلّب في Event Viewer، ومن سكربت يشتغل على أي جهاز.`,
          use: {
            work: R`أول سؤال في أي مشكلة ويندوز: إيه اللي اتكتب في System و Application ساعة ما حصلت. ومن سكربت تقدر تجمع اللوجات من جهاز حد وتبعتها.`,
            prog: R`البرنامج اللي بتعمله كخدمة ويندوز (Node أو Python أو .NET) لما بيقع، السبب غالبًا في Application log مش في الكونسول.`,
            cs: R`ويندوز بيكتب أحداث متركّبة (structured): كل حدث ليه مصدر و ID ومستوى ووقت و XML، فبتفلتر بالحقول بدل ما تدوّر في نص زي [[/var/log]] في لينكس (و [[journalctl]] هو الأقرب ليه هناك).`,
          },
          desc: R`[[wevtutil]] (Windows Events Utility) هو Event Viewer من CMD: بيعرض اللوجات (channels)، ويقرا الأحداث منها بفلتر، ويصدّرها لملف. القراية من [[System]] و [[Application]] مش محتاجة أدمن، و [[Security]] محتاج.

[[wevtutil el]] كل اللوجات (enumerate logs)، وعلى ويندوز 11 هتلاقيهم بالألف.
[[wevtutil gl System]] إعدادات لوج (get log): مكان الملف وحجمه الأقصى.
[[wevtutil qe System /c:5 /rd:true /f:text]] اقرا أحداث (query events): [[/c:5]] خمسة بس (count)، و [[/rd:true]] من الأحدث للأقدم (reverse direction)، و [[/f:text]] بشكل مقروء بدل XML.
[[/q:]] فلتر XPath بين علامات تنصيص (شكله الكامل في المثال): [[Level=2]] Error، و [[1]] Critical، و [[3]] Warning، و [[4]] Information. و [[EventID=6005]] حدث معيّن، و [[timediff(@SystemTime) <= 86400000]] آخر ٢٤ ساعة بالملّي ثانية.
[[wevtutil epl System file.evtx]] صدّر (export log) لملف يتفتح في Event Viewer على أي جهاز، ومعاه [[/q:]] نفس الفلتر، و [[/ow:true]] اكتب فوق الملف.

أحداث مهمة تحفظها: [[6005]] و [[6006]] خدمة اللوج بدأت ووقفت (يعني الجهاز فتح أو اتقفل كويس)، و [[6008]] الجهاز اتقفل فجأة، و [[41]] (Kernel-Power) restart من غير قفلة نضيفة، و [[7031]] و [[7034]] خدمة وقعت. وفي PowerShell نفس الحاجة بـ [[Get-WinEvent -FilterHashtable]] (تاب «PowerShell»).`,
          example: R`wevtutil el | find /c /v ""
wevtutil gl System
wevtutil qe System /c:3 /rd:true /f:text
wevtutil qe System /c:5 /rd:true /f:text /q:"*[System/Level=2]"
wevtutil qe System /c:3 /rd:true /f:text /q:"*[System/EventID=6005]"
wevtutil epl System errors.evtx /q:"*[System/Level=1 or System/Level=2]" /ow:true
wevtutil qe errors.evtx /lf:true /c:2 /f:text`,
          try: R`اعرف آخر ٣ مرات الجهاز فتح فيها من حدث [[6005]]، وقارن الوقت اللي في [[/f:text]] بالوقت اللي في الـ XML (من غير [[/f:text]]). وبعدين صدّر أخطاء System لملف وعدّ اللي فيه.`,
          deep: {
            why: R`Event Viewer بطيء وكله ضغطات، ومينفعش تبعته لحد في رسالة. [[wevtutil]] بيطلّعلك الحدث اللي محتاجه في ثانية، وبيشتغل في سكربت يجمع اللوجات من جهاز بعيد عنك أو بعد كل crash، وبيصدّر [[.evtx]] اللي الدعم الفني بيطلبه.`,
            how: R`كل لوج ملف [[.evtx]] في [[%SystemRoot%\System32\Winevt\Logs]]، والخدمة [[EventLog]] هي اللي بتكتب فيه وبتقرا منه. الأحداث متخزّنة XML، و [[/q:]] فلتر XPath بيتنفّذ جوه الخدمة نفسها، فأسرع بكتير من إنك تطلّع كله وتعمل [[findstr]]. و [[/f:text]] مجرد عرض للـ XML ده.

[[System]] حجمه الأقصى 20 ميجا ([[maxSize: 20971520]]) و [[retention: false]] يعني لما يتملى بيكتب فوق الأقدم، فالأحداث القديمة بتختفي لوحدها. عشان كده لو محتاج حدث، صدّره بدري.`,
            when: R`بعد أي restart غريب أو شاشة زرقا أو خدمة وقعت، وقبل ما تبعت مشكلة للدعم الفني (صدّر الأخطاء بـ [[epl]])، وفي سكربت صحة الجهاز (آخر الأخطاء). ولو هتعمل فلترة معقدة أو تحوّل لـ CSV أو JSON، PowerShell أسهل.`,
            mistakes: R`تنسى [[/rd:true]] فتاخد أقدم أحداث في اللوج مش آخرها. أو تنسى [[/c:]] فيطبع آلاف الأحداث. أو تثق في وقت [[/f:text]] على إنه UTC عشان آخره [[Z]] وهو وقت محلي. أو تعمل [[findstr "Description:"]] وتلاقيه فاضي لأن الوصف على السطر اللي بعده. أو تنسى قفلة قوس في XPath فتاخد [[The specified query is invalid.]]. أو تعمل [[wevtutil cl]] (امسح اللوج) عشان «تنضّف»: ده بيمسح الدليل اللي هتحتاجه، وبرامج الحماية بتعتبره علامة اختراق.`
          },
          teach: R`## الفكرة: كل حدث صف في جدول

ويندوز بيكتب في لوجات (channels) كتير، وكل حدث فيه: المصدر (Provider)، و Event ID، والمستوى، والوقت، والوصف. [[wevtutil]] بيعرض اللوجات ويقرا منها بفلتر. كل اللي تحت اتشغّل في CMD على ويندوز 11 من نافذة **عادية**، واسم الجهاز في الناتج اتغيّر لـ [[LAB-PC]]. ما عدا [[wevtutil cl]] (مسح لوج): متشغّلش، وده من الوثائق.

---

## ١. اللوجات اللي موجودة: [[el]] و [[gl]]

~~~cmd
wevtutil el | find /c /v ""
~~~

- [[el]] = enumerate logs: اسم لوج في كل سطر.
- [[find /c /v ""]] عدّ السطور (درس type / more).

طبع [[1178]]. أغلبهم لوجات برامج ومكونات ([[Microsoft-Windows-...]])، والأربعة الأساسيين: [[Application]] و [[Security]] و [[Setup]] و [[System]].

~~~cmd
wevtutil gl System
~~~

~~~text اتشغّل فعلًا · ويندوز 11 · cmd.exe · نافذة عادية (سطور مختارة)
name: System
enabled: true
  logFileName: %SystemRoot%\System32\Winevt\Logs\System.evtx
  retention: false
  maxSize: 20971520
~~~

- [[logFileName]] الملف الحقيقي على الديسك.
- [[maxSize]] بالبايت: 20971520 = ٢٠ ميجا بالظبط (20 × 1024 × 1024).
- [[retention: false]] لما يتملى يكتب فوق الأقدم. و [[wevtutil gli System]] (get log info) طبع [[numberOfLogRecords: 32859]]: حوالي ٣٣ ألف حدث في الـ ٢٠ ميجا دول.

---

## ٢. آخر الأحداث: [[qe]]

~~~cmd
wevtutil qe System /c:3 /rd:true /f:text
~~~

- [[qe]] = query events.
- [[/c:3]] تلاتة بس (count). من غيرها بيطبع اللوج كله.
- [[/rd:true]] reverse direction: الأحدث الأول. **من غيرها بيبدأ بالأقدم**: نفس الأمر من غير [[/rd]] طبع حدث من شهر ٦.
- [[/f:text]] شكل مقروء. من غيرها XML على سطر واحد.

~~~text اتشغّل فعلًا · حدث واحد كامل
Event[0]
  Log Name: System
  Source: EventLog
  Date: 2026-11-01T20:54:41.8590000Z
  Event ID: 6005
  Task: None
  Level: Information
  Opcode: N/A
  Keyword: Classic,
  User: N/A
  User Name: N/A
  Computer: LAB-PC
  Description:
The Event log service was started.
~~~

- سطر [[Event]] ومعاه رقم بين قوسين مربعين: ترتيب الحدث في الناتج ده بس (بيبدأ من صفر).
- [[Source]] مين كتبه، و [[Event ID]] رقمه عند المصدر ده (6005 من EventLog = الجهاز فتح).
- [[Level]] Information أو Warning أو Error أو Critical.
- [[Description:]] فاضية، والوصف نفسه على السطر اللي بعدها. فـ [[findstr /c:"Description:"]] هيطبعلك السطر الفاضي بس.

### فخ الوقت: الـ [[Z]] كدابة

نفس الحدث من غير [[/f:text]] (XML):

~~~text اتشغّل فعلًا (حتة من الـ XML)
<TimeCreated SystemTime='2026-11-01T18:54:41.8593257Z'/>
~~~

الـ XML بيقول 18:54 UTC، و [[/f:text]] قال [[20:54:41.8590000Z]]. الجهاز في مصر (UTC+2 وقتها)، يعني **[[/f:text]] بيطبع الوقت المحلي ويحط جنبه [[Z]]** اللي معناها UTC. فلو بتقارن بلوج سيرفر بالـ UTC، خد الوقت من الـ XML.

---

## ٣. فلتر: [[/q:]] بـ XPath

~~~cmd
wevtutil qe System /c:5 /rd:true /f:text /q:"*[System/Level=2]"
~~~

- [[/q:"..."]] الفلتر، بين علامات تنصيص لأن فيه أقواس مربعة.
- [[*]] أي حدث، وبعده بين قوسين مربعين [[System/Level=2]]: شرط معناه «اللي جوه [[<System>]] في الـ XML، الـ [[<Level>]] بتاعه = 2» (Error).

الشكل اللي Event Viewer نفسه بيكتبه (تبويب XML في Filter Current Log) أطول، وطلّع نفس الناتج بالظبط (٥ أخطاء، و 2087 مع Level=1 كمان):

~~~text الشكل الطويل
*[System[(Level=2)]]
~~~

الطويل بيبان في النت أكتر، والقصير أسهل تكتبه. والأقواس المربعة لازم تتقفل كلها في الاتنين.

طبع ٥ أحداث كلهم [[Level: Error]]. وعلى آخر ٢٠ خطأ عندنا: ١٤ من [[Microsoft-Windows-DistributedCOM]] (ID 10028، أخطاء DCOM عادية جدًا ومش مشكلة في الغالب) و ٤ من [[NDIS]] وواحد [[Schannel]] وواحد [[Tcpip]]. يعني «Error» في Event Viewer مش دايمًا مشكلة: اسأل «حصل إمتى ومرتبط بالعطل ولا لأ».

فلاتر تانية بالشكل الطويل (اتجرّبت كلها):

~~~text الفلتر ← بيجيب
*[System[(Level=1 or Level=2)]]                                   Critical و Error
*[System[(EventID=6005)]]                                         الجهاز فتح
*[System[(EventID=41 or EventID=6008)]]                           قفلة مش نضيفة
*[System[Provider[@Name='Service Control Manager']]]              أحداث الخدمات
*[System[TimeCreated[timediff(@SystemTime) <= 86400000]]]         آخر ٢٤ ساعة (بالملّي ثانية)
*[System[(Level=2) and TimeCreated[timediff(@SystemTime) <= 86400000]]]   الاتنين مع بعض
~~~

وآخر ٢٤ ساعة لوحدها عندنا طلّعت 326 حدث.

### الأخطاء

| جرّبت | الناتج | errorlevel |
|---|---|---|
| [[wevtutil qe Security /c:1]] من نافذة عادية | [[Access is denied.]] و [[Failed to open event query.]] | 5 |
| لوج مش موجود [[NoSuchLogLab]] | [[The specified channel could not be found.]] | 15007 |
| قوس [[(]] مش مقفول في [[/q:]] | [[A syntax error occurred at position 18]] و [[The specified query is invalid.]] | 15001 |

---

## ٤. صدّر لملف: [[epl]]

~~~cmd
wevtutil epl System errors.evtx /q:"*[System/Level=1 or System/Level=2]" /ow:true
~~~

- [[epl]] = export log، والملف [[.evtx]] بيتفتح في Event Viewer على أي جهاز (Open Saved Log).
- [[/q:]] نفس الفلتر، فالملف فيه الأخطاء بس وحجمه صغير.
- [[/ow:true]] overwrite. من غيرها والملف موجود: [[Failed to export log System.]] و [[The file exists.]] و errorlevel 80.

~~~cmd
wevtutil qe errors.evtx /lf:true /c:2 /f:text
~~~

[[/lf:true]] = log file: اقرا من ملف بدل لوج شغال. بيطبع نفس الشكل، فتقدر تحلل لوج جهاز تاني على جهازك.

---

## ٥. اللي متعملوش: [[cl]]

[[wevtutil cl System]] بيمسح اللوج كله (clear log)، ومحتاج أدمن. متشغّلش هنا. الوثائق بتقول [[/bu:backup.evtx]] معاه بياخد نسخة قبل المسح. بس في الشغل: المسح بيضيّع الدليل اللي محتاجه، وبرامج الحماية بتعتبر مسح Security log علامة إن حد بيخبّي حاجة (Event ID 1102 بيتكتب لما ده يحصل).

---

## ٦. نفس الكلام في PowerShell

~~~powershell
Get-WinEvent -FilterHashtable @{LogName='System'; Level=2} -MaxEvents 5
~~~

بيرجّع objects فيها [[TimeCreated]] بالوقت الصح كـ DateTime، وبتقدر تعمل [[| Export-Csv]] على طول. [[wevtutil]] أحسن لما تكون في CMD أو محتاج [[epl]].

---

## الخلاصة

| عايز | اكتب |
|---|---|
| عدد اللوجات | [[wevtutil el | find /c /v ""]] |
| مكان وحجم لوج | [[wevtutil gl System]] |
| آخر ٥ أحداث | [[wevtutil qe System /c:5 /rd:true /f:text]] |
| أخطاء بس | [[/q:]] بـ [[(Level=2)]] |
| الجهاز فتح إمتى | [[/q:]] بـ [[(EventID=6005)]] |
| صدّر | [[wevtutil epl System f.evtx /ow:true]] ومعاه [[/q:]] |
| اقرا ملف | [[wevtutil qe f.evtx /lf:true /f:text]] |

وافتكر: [[/rd:true]] وإلا بتاخد الأقدم، والوقت في [[/f:text]] محلي رغم الـ [[Z]].`,
          lines: [
            R`[[el]] بيطبع اسم كل لوج على سطر، و [[find /c /v ""]] بيعدّ السطور. طبع [[1178]] على ويندوز 11: أغلبهم لوجات مكونات، واللي بتبص فيه غالبًا [[System]] و [[Application]].`,
            R`[[gl]] = get log: إعدادات لوج System، منها [[logFileName]] (ملف [[System.evtx]]) و [[maxSize: 20971520]] (٢٠ ميجا) و [[retention: false]] (بيكتب فوق الأقدم لما يتملى).`,
            R`آخر ٣ أحداث: [[/c:3]] العدد، و [[/rd:true]] الأحدث الأول (من غيرها الأقدم)، و [[/f:text]] شكل مقروء. كل حدث فيه Source و Event ID و Level و Date، والوصف على السطر اللي بعد [[Description:]].`,
            R`نفس الأمر بفلتر XPath: [[Level=2]] يعني Error بس. طبع ٥ أحداث كلهم [[Level: Error]]، وأغلبهم من DistributedCOM (عادي ومش مشكلة).`,
            R`حدث معيّن بالـ ID: [[6005]] = خدمة اللوج بدأت، يعني الجهاز فتح. آخر ٣ = آخر ٣ مرات فتح فيها. والوقت في [[/f:text]] محلي رغم إن آخره [[Z]].`,
            R`[[epl]] بيصدّر Critical و Error بس لملف [[errors.evtx]] يتفتح في Event Viewer على أي جهاز، و [[/ow:true]] بيكتب فوق الملف (من غيرها [[The file exists.]] و errorlevel 80).`,
            R`[[/lf:true]] بيقرا من الملف اللي صدّرته بدل اللوج الشغال، بنفس [[/c]] و [[/f:text]]. كده تقدر تحلل لوج جهاز تاني على جهازك.`,
          ],
          sol: R`سطر المثال الخامس (حدث [[6005]] بـ [[/c:3 /rd:true /f:text]]) طبع ٣ أحداث [[Source: EventLog]] و [[Event ID: 6005]] ووصفهم [[The Event log service was started.]]، وأحدثهم [[Date: 2026-11-01T20:54:41.8590000Z]]. ونفس الأمر من غير [[/f:text]] (و [[/c:1]]) طبع XML فيه [[SystemTime='2026-11-01T18:54:41.8593257Z']]: ساعتين فرق، لأن الجهاز في UTC+2 و [[/f:text]] بيطبع المحلي ويحط [[Z]] غلط.

[[wevtutil epl System sys.evtx]] بفلتر [[(Level=2)]] عمل الملف بـ errorlevel 0، وتاني مرة من غير [[/ow:true]] طبع [[Failed to export log System.]] و [[The file exists.]] و 80. و [[wevtutil qe sys.evtx /lf:true /f:text | find /c "Event["]] طبع عدد الأخطاء اللي في الملف (عندنا 2081). اتجرّب على ويندوز 11 في CMD عادي، و [[wevtutil cl]] من الوثائق ومتشغّلش.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** من نافذة عادية: [[wevtutil qe Security /c:1]] و [[wevtutil qe NoSuchLogLab /c:1]]، واطبع [[%errorlevel%]] على سطر لوحده بعد كل واحد.`, done: R`Security: [[Access is denied.]] و [[Failed to open event query.]] و 5. واللوج الغلط: [[The specified channel could not be found.]] و 15007. الكود بيفرّق بين «ممنوع» و «مش موجود»، فسكربت يقدر يقول للمستخدم يفتح نافذة أدمن.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** خد فلتر الأخطاء بالشكل الطويل اللي في الشرح، وامسح القوس [[)]] اللي بعد [[Level=2]] بس، وشغّله من ملف [[.bat]]. الأمر بيفشل:  اقرا الرسالة، ولاقي رقم الحرف اللي فيه الغلط، وصلّحه.`, done: R`[[A syntax error occurred at position 18]] و [[The specified query is invalid.]] و errorlevel 15001. الحرف ١٨ هو أول قوس مربع قافل بعد [[Level=2]]: القوس [[(]] اتفتح ومتقفلش. الصح [[(Level=2)]] بقوسه، أو الشكل القصير ([[System/Level=2]] بين قوسين مربعين) اللي مفيهوش أقواس عادية أصلًا.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** آخر حدث [[6005]] بـ [[/f:text]] ومن غيرها (XML). قارن الساعة في الاتنين، واعرف المنطقة الزمنية من [[w32tm /tz]] (درس w32tm).`, done: R`[[/f:text]] طبع [[20:54:41]] بـ [[Z]]، والـ XML [[SystemTime='...18:54:41...Z']]، و [[w32tm /tz]] قال [[Bias: -120min]]: الفرق ساعتين بالظبط، والـ XML هو اللي UTC بجد.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** آخر ٢٠ خطأ في System (سطر المثال الرابع بـ [[/c:20]])، ووصّله بـ [[findstr /c:"  Source:"]] و [[sort]]، وعدّ كل مصدر بـ [[find /c]].`, done: R`عندنا ١٤ من [[Microsoft-Windows-DistributedCOM]] و ٤ [[NDIS]] وواحد [[Schannel]] وواحد [[Tcpip]]. وكتبت إن DCOM 10028 غالبًا مش هو سبب أي عطل، وإن الحدث اللي يهمك هو اللي وقته قريب من وقت المشكلة.` },
            { lvl: 'تحدي', t: R`**ابني:** [[collect-logs.bat]] بيعمل فولدر باسم فيه التاريخ والوقت، ويصدّر فيه [[System]] و [[Application]] (Critical و Error في آخر ٧ أيام، يعني [[604800000]] ملّي ثانية) بـ [[epl ... /ow:true]]، ويكتب في [[summary.txt]] عدد الأحداث في كل ملف، ويحاول Security ولو [[errorlevel 5]] يكتب «needs admin» ويكمّل.`, done: R`من نافذة عادية: ملفين [[.evtx]] و [[summary.txt]] فيه رقمين وسطر «Security: needs admin»، والسكربت خرج بـ 0. تشغيله مرتين بيعمل فولدرين، والملفات بتتفتح بـ [[wevtutil qe file.evtx /lf:true]].` },
            { lvl: 'تحدي', t: R`**مسألة:** اعرف آخر مرة الجهاز اتقفل فجأة: دوّر على [[EventID=41]] أو [[EventID=6008]] في System، ولو مفيش اطبع «no unexpected shutdowns». خلّي السكربت يفرّق بين «لقى» و «ملقاش» من غير ما يعتمد على errorlevel بتاع [[qe]].`, done: R`[[qe]] بيرجّع 0 حتى لو ملقاش حاجة، فعملت [[| find /c "Event["]] وقارنت الرقم بـ 0 في [[for /f]]. على جهاز التجربة طبع النتيجة الصح للحالتين: لو فيه أحداث بيطبع تاريخ أحدثها، ولو مفيش بيطبع الرسالة.` },
          ],
          ci: [
            { os: [R`windows`], sh: R`cmd`, run: R`@echo off
wevtutil gl System | findstr /c:"logFileName" >nul && echo gl-ok
wevtutil qe System /c:1 /rd:true /f:text | findstr /l /c:"Event[0]" >nul && echo qe-ok
wevtutil qe NoSuchLogLab /c:1 >nul 2>&1
echo nolog=%errorlevel%
wevtutil qe System /c:1 /q:"*[System[(Level=2]]" >nul 2>&1
echo badq=%errorlevel%
wevtutil epl System s.evtx /q:"*[System[(Level=4)]]" /ow:true && echo epl-ok
exit /b 0`, expect: [R`gl-ok`, R`qe-ok`, R`nolog=15007`, R`badq=15001`, R`epl-ok`] },
          ],
        }
      ]
    }
]);
