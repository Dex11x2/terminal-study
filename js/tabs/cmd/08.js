// تكملة تاب cmd: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cmd/01.js (شرح حقول الدرس في أوله)
MORE("cmd", [
    {
      t: "تحكّم في الجهاز وصيانته",
      l: 2,
      n: R`إيقاف ومهام مجدولة وطاقة وتحميل وتحديث وصيانة وفلاشات ودرايفرات وخدمات ووقت. كتير منها محتاج CMD كأدمن، والخطير عليه علامة`,
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
            R`كل يوم الساعة 11:30 بالليل: shutdown بعد إنذار دقيقة (تقدر تلغيه بـ [[shutdown /a]]).`,
            R`اعرضها: الاسم و Next Run Time و Status.`,
            R`مهمة مرة واحدة في تاريخ معين ([[/sd]] بصيغة تاريخ جهازك)، و [[/f]] اكتب فوقها لو موجودة.`,
            R`شغّلها دلوقتي من غير ما تستنى ميعادها: هتفتح نافذة فيها hi.`,
            R`عطّلها من غير ما تمسحها (Status يبقى Disabled).`,
            R`كل التفاصيل: آخر تشغيل ونتيجته وشروط البطارية.`,
            R`امسح المهمة من غير سؤال.`,
            R`وامسح دي كمان.`
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
            R`أنواع النوم المتاحة والمش متاحة وسبب كل واحد.`,
            R`تقرير البطارية في ملف HTML في فولدرك.`,
            R`افتحه في المتصفح.`,
            R`مين مانع النوم دلوقتي (CMD كأدمن).`,
            R`راقب الجهاز 60 ثانية واكتب تقرير مشاكل الطاقة (أدمن، وبياخد دقيقة).`,
            R`على الشاحن: الشاشة تقفل بعد 10 دقايق.`,
            R`على الشاحن: الجهاز مينامش أبدًا ([[0]]).`
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
            R`اتأكد إن curl موجود وشوف نسخته.`,
            R`نزّل ملف شهادات curl، وتابع أي redirect ([[-L]])، واحفظه بالاسم ده ([[-o]]).`,
            R`نزّل ملف البصمة بنفس اسمه ([[-O]])، ولو السيرفر رد بخطأ افشل ([[-f]]).`,
            R`اطبع البصمة المنشورة.`,
            R`احسب بصمة الملف اللي نزل وقارنها باللي فوق.`,
            R`ملف كبير (حوالي 35 ميجا) بشريط تقدم، ولو اتقطع شغّل نفس السطر تاني يكمّل ([[-C -]]).`
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
            R`اعرض البرامج اللي ليها تحديث (من غير ما يحدّث حاجة).`,
            R`حدّث Git بس.`,
            R`حدّث كل حاجة من غير نوافذ ومن غير أسئلة الشروط.`,
            R`احفظ لستة البرامج المتسطبة في ملف JSON.`,
            R`على الجهاز الجديد: سطّب كل اللي في اللستة.`
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
            R`فولدر عادي، ده الأصل.`,
            R`اعمل junction اسمه shortcut بيشاور على real (اسم اللينك الأول وبعدين الأصل).`,
            R`اكتب ملف جوه اللينك...`,
            R`...وهتلاقيه في الأصل.`,
            R`shortcut ظاهر [[<JUNCTION>]] وجنبه المسار الكامل للأصل.`,
            R`امسح اللينك بس، و real بملفاته زي ما هو.`
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
            R`افتح diskpart (أدمن، وبيفتح prompt [[DISKPART>]]).`,
            R`كل الديسكات بأرقامها وأحجامها: اعرف الفلاشة من الحجم.`,
            R`اختار الفلاشة. الخطوة الخطيرة: اتأكد من الرقم.`,
            R`اتأكد إنها هي: الموديل و Type USB والحروف.`,
            R`شيل علامة «قراية بس» (لو write protected).`,
            R`امسح جدول البارتيشنات كله.`,
            R`بارتيشن واحد بكل المساحة.`,
            R`فرمتة سريعة exFAT باسم USB.`,
            R`ادّيها حرف درايف.`,
            R`اخرج من diskpart.`
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
            R`الخدمات الشغالة دلوقتي.`,
            R`حالة خدمة الطباعة (بالاسم القصير).`,
            R`الحالة ومعاها الـ PID.`,
            R`إعداداتها: بتشتغل إمتى، وبأنهي حساب، والبرنامج.`,
            R`الاسم القصير من الاسم الظاهر.`,
            R`وقّفها (أدمن).`,
            R`شغّلها تاني.`,
            R`خلّيها تشتغل لما حاجة تطلبها بس (اكتب مسافة بعد = زي ما مساعدة sc بتقول).`,
            R`عدد كل الخدمات حتى المتوقفة.`
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
            R`الحالة: المصدر وآخر مزامنة ناجحة.`,
            R`السيرفرات المتظبطة وحالتها.`,
            R`قيس الفرق مع سيرفر Microsoft 3 مرات (مش بيغيّر حاجة).`,
            R`المنطقة الزمنية والتوقيت الصيفي.`,
            R`شغّل خدمة الوقت لو متوقفة (أدمن).`,
            R`زامن دلوقتي (أدمن).`,
            R`غيّر السيرفرات لاتنين وطبّق على طول (أدمن).`
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
AMD Ryzen 9 5900HX with Radeon Graphics             8                        16
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
HFM001TD3JX013N 1024203640320 OK
CT1000P3SSD8    1000202273280 OK
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
| [[wmic cpu get name]] | [[Get-CimInstance Win32_Processor]] |
| [[wmic diskdrive get model,size]] | [[Get-CimInstance Win32_DiskDrive]] |
| [[wmic os get caption]] | [[Get-CimInstance Win32_OperatingSystem]] |
| [[wmic bios get serialnumber]] | [[(Get-CimInstance Win32_BIOS).SerialNumber]] |
| [[wmic process list]] | [[Get-CimInstance Win32_Process]] |

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
البروسيسور: [[AMD Ryzen 9 5900HX with Radeon Graphics]] و [[8]] cores و [[16]] logical processors (في شكل جدول).
الديسكات: [[HFM001TD3JX013N  1024203640320  OK]] و [[CT1000P3SSD8  1000202273280  OK]] (الحجم بالبايت: حوالي 1 تيرا بحساب الشركات).
ويندوز: [[Microsoft Windows 11 Home Single Language]] و [[10.0.26300]] ووقت آخر boot.
والـ serial سطر واحد (مش هكتبه هنا).

ولو شلت علامات التنصيص: [[powershell -NoProfile -Command Get-CimInstance Win32_Processor | Select-Object Name]] طلّع [['Select-Object' is not recognized as an internal or external command,]]، لأن CMD أخد الـ [[|]] وحاول يشغّل Select-Object كأمر بتاعه.`
        }
      ]
    }
]);
