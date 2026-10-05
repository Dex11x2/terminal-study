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
[[pnputil /export-driver * D:\DriversBackup]] صدّر كل الدرايفرات اللي من برا ([[*]] يعني كلهم) لفولدر موجود (أدمن). احفظه على درايف غير C أو فلاشة.
[[pnputil /add-driver D:\DriversBackup\*.inf /subdirs /install]] على الويندوز الجديد: ضيف كل ملفات [[.inf]] في الفولدر والفولدرات اللي جواه ([[/subdirs]])، وسطّبها على الأجهزة اللي محتاجاها ([[/install]]). أدمن.

العرض ([[driverquery]] و [[/enum-drivers]] و [[/enum-devices]]) اشتغل عندي من CMD عادي، والتصدير والإضافة محتاجين أدمن.`,
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
          lines: [
            R`كل الدرايفرات: الاسم والنوع والتاريخ.`,
            R`تفاصيل كل واحد (شغال ولا لأ، ومساره)، صفحة صفحة.`,
            R`الدرايفرات اللي مش موقّعة.`,
            R`الدرايفرات اللي من برا ويندوز (oem*.inf).`,
            R`كروت الشاشة ودرايفر كل واحد.`,
            R`الأجهزة اللي فيها مشكلة.`,
            R`فولدر الباك أب (على درايف غير C).`,
            R`صدّر كل الدرايفرات اللي من برا (أدمن).`,
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

(الـ export والـ add مشغّلتهمش هنا: محتاجين أدمن، والـ add بيسطّب درايفرات.) الـ export بيعمل فولدر لكل درايفر وبيطبع سطر لكل واحد وهو بيصدّره، وبعد الفرمتة الـ add بيطبع كل inf اتضاف وهل اتسطب على جهاز.`
        },
        {
          cmd: "sc و net start",
          title: "الخدمات: اعرض وشغّل ووقّف",
          desc: R`الخدمات (services) برامج بتشتغل في الخلفية من غير نافذة: Windows Update، والطباعة، و Docker، وقواعد البيانات اللي بتسطّبها. [[sc]] و [[net start]] بيعرضوها ويشغّلوها ويوقفوها، وبيغيّروا هل تشتغل لوحدها مع الجهاز.

[[net start]] لوحده: أسامي الخدمات الشغالة دلوقتي. و [[net start Spooler]] شغّل خدمة، و [[net stop Spooler]] وقّفها.
[[sc query Spooler]] حالة خدمة: [[STATE]] (RUNNING أو STOPPED). و [[Spooler]] اسمها القصير (service name)، و [[Print Spooler]] اسمها الظاهر (display name)، و [[sc getkeyname "Print Spooler"]] بيجيب القصير من الظاهر.
[[sc queryex]] نفس الحالة ومعاها [[PID]]، فتقدر تقفلها بـ taskkill لو علّقت (درس tasklist / taskkill).
[[sc qc Spooler]] إعداداتها: [[START_TYPE]] ([[AUTO_START]] مع الجهاز، أو [[DEMAND_START]] لما حاجة تطلبها، أو [[DISABLED]] مقفولة)، و [[BINARY_PATH_NAME]] البرنامج نفسه، و [[SERVICE_START_NAME]] شغالة بأنهي حساب.
[[sc config Spooler start= demand]] غيّر نوع التشغيل: [[auto]] أو [[demand]] أو [[disabled]] أو [[delayed-auto]]. المسافة بعد [[=]] لازمة ومفيش مسافة قبلها، ودي غرابة في sc.
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
            mistakes: R`[[start=demand]] من غير مسافة بعد [[=]]: sc بيطبع المساعدة بدل ما ينفّذ. أو [[sc]] في PowerShell فيكتب ملف بدل ما يكلم الخدمات. أو تعمل disabled لخدمات ويندوز من لستة «سرّع جهازك» على النت، فحاجات تبوظ بعدين ومتعرفش ليه (Windows Update و Defender و Spooler وغيرهم). أو الاسم الظاهر مع [[sc query]] (عايز القصير). أو تفتكر STOPPED مع DEMAND_START مشكلة.`
          },
          lines: [
            R`الخدمات الشغالة دلوقتي.`,
            R`حالة خدمة الطباعة (بالاسم القصير).`,
            R`الحالة ومعاها الـ PID.`,
            R`إعداداتها: بتشتغل إمتى، وبأنهي حساب، والبرنامج.`,
            R`الاسم القصير من الاسم الظاهر.`,
            R`وقّفها (أدمن).`,
            R`شغّلها تاني.`,
            R`خلّيها تشتغل لما حاجة تطلبها بس (المسافة بعد = لازمة).`,
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
    },
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
