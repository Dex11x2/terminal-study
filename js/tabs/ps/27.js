// تكملة تاب ps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ps/01.js (شرح حقول الدرس في أوله)
MORE("ps", [
    {
      t: "أوامر قوية للسكربتات",
      l: 3,
      time: R`حوالي ساعتين`,
      goal: [
        R`تدخل أدمن من الترمنال نفسه (نافذة جديدة بـ [[Start-Process -Verb RunAs]] أو [[sudo]] بتاع ويندوز 11) بدل ما تقفل وتفتح بكليك يمين، وتعرف تقرا النافذة دي أدمن ولا لأ.`,
        R`تشيل الباسوردات والتوكنز من جوه ملف السكربت: تطلبها من اليوزر، أو تحفظها متشفّرة ليك انت بس، أو تاخدها من متغير بيئة في الـ CI.`,
        R`تشغّل شغل كتير بيستنى (شبكة أو sleep أو ديسك) بالتوازي بـ [[ForEach-Object -Parallel]]، وتقيس الفرق بنفسك بـ [[Measure-Command]].`,
        R`تقارن قايمتين (فولدرين، أو ملفين config، أو قبل وبعد تسطيب) بـ [[Compare-Object]] وتطلّع الفرق بس.`,
        R`تخلي PowerShell يقع بصوت عالي على غلطة إملا في اسم متغير أو property بدل ما يكمّل بـ [[$null]] ويشتغل على الحاجة الغلط.`,
      ],
      use: {
        prog: R`كل سكربت حقيقي بيقابل الخمس حاجات دول: محتاج صلاحية، ومحتاج سر (باسورد أو توكن)، وعنده شغل كتير بيستنى، ومحتاج يعرف إيه اللي اتغيّر، ولازم يقع بدري لو فيه غلطة بدل ما يكمّل غلط.`,
        net: R`فحص بورتات أو سيرفرات كتير بالتوازي، وتوكن API من غير ما يتكتب في الملف، وأوامر الشبكة اللي محتاجة أدمن ([[netstat -b]] وتعديل الفايروول) — دي شغل الشبكات اليومي.`,
        cs: R`الـ token بتاع البروسيس بيتحدد وهو بيبدأ ومبيتغيّرش (مبدأ أمان في أي نظام تشغيل)، والتشفير المربوط بحساب اليوزر (DPAPI)، والتوازي اللي بيكسب بس لما الشغل بيستنى مش لما بيحسب.`,
        work: R`«اقفل وافتح كأدمن» كل شوية، وباسورد مكتوب في سكربت اتبعت لزميل، وباك أب ناقص ملفات محدش لاحظ، وسكربت مسح الفولدر الغلط عشان حرف — كلها حاجات بتحصل في الشغل والدرس ده بيقفلها.`,
      },
      lab: R`New-Item -ItemType Directory "$HOME\lab\power\photos", "$HOME\lab\power\backup" -Force | Out-Null
Set-Location "$HOME\lab\power"
'a.jpg', 'b.jpg', 'c.jpg', 'd.jpg' | ForEach-Object { Set-Content ".\photos\$_" $_ }
'a.jpg', 'b.jpg', 'd.jpg', 'old.jpg' | ForEach-Object { Set-Content ".\backup\$_" $_ }
Add-Content .\backup\d.jpg 'changed'
Set-Content .\before.env 'PORT=3000', 'DEBUG=false', 'DB_HOST=localhost'
Set-Content .\after.env 'PORT=8080', 'DEBUG=false', 'DB_HOST=localhost', 'CACHE=on'`,
      projects: [
        { lvl: 'صغير', t: R`علامة الأدمن في الـ prompt`, what: R`دالة [[prompt]] في [[$PROFILE]] بتسأل [[IsInRole(...Administrator)]] (درس ١)، ولو النافذة أدمن تكتب كلمة [[ADMIN]] بين قوسين مربعين قبل المسار بالأحمر، عشان متنساش انت في نافذة خطيرة.`, done: R`نافذة عادية مفيهاش العلامة، ونافذة فتحتها بـ [[Start-Process pwsh -Verb RunAs]] فيها العلامة، والـ prompt لسه بيطبع المسار.` },
        { lvl: 'صغير', t: R`صياد الغلطات الإملائية`, what: R`خد أي سكربت قديم كتبته، وحط في أوله [[Set-StrictMode -Version Latest]] (درس ٥)، وشغّله، وصلّح كل error بيطلع واحدة واحدة.`, done: R`السكربت بيشتغل للآخر من غير ولا error والـ strict mode شغال، وكاتب في تعليق فوق كل تصليح الغلطة اللي اتمسكت كانت إيه.` },
        { lvl: 'متوسط', t: R`باك أب بيتأكد من نفسه`, what: R`بعد ما تنسخ فولدر، قارن الأسامي والـ hash بين الأصل والنسخة بـ [[Compare-Object]] واطبع الناقص والمختلف بس. ولو فيه فرق، السكربت يخرج بكود ١ عشان المهمة المجدولة تبان فاشلة. من درس ٤.`, done: R`لو مسحت ملف من النسخة أو غيّرت حرف في ملف، السكربت بيطبع اسمه بالظبط و [[$LASTEXITCODE]] بيبقى ١. ولو النسخة سليمة بيطبع «سليم» ويخرج بـ ٠.` },
        { lvl: 'متوسط', t: R`لقطة قبل وبعد`, what: R`سكربت [[snapshot.ps1]] بيحفظ البرامج المتسطّبة والخدمات ومتغير [[PATH]] في CSV، وسكربت تاني بيقارن أي لقطتين ويقولك التسطيب الأخير غيّر إيه. من درس ٤ (وانتبه لفخ الـ CSV و [[$null]] اللي في الدرس).`, done: R`تاخد لقطة، وتزوّد فولدر لـ [[PATH]] بتاع الجلسة أو تشغّل خدمة، وتاخد لقطة تانية: المقارنة بتطلّع التغيير ده بس، ومفيش ولا فرق وهمي من [[$null]] و [['']].` },
        { lvl: 'كبير', t: R`سكربت صيانة بيرفع نفسه`, what: R`سكربت [[fix-net.ps1]] أوله [[Set-StrictMode -Version Latest]] و [[$ErrorActionPreference = 'Stop']]، وبعدهم فحص الأدمن اللي بيفتح نفسه تاني بـ [[-Verb RunAs]] (درس ١)، وبعدها أوامر محتاجة أدمن زي [[ipconfig /flushdns]] و [[netstat -abno]]، وكل خطوة بتتكتب في لوج بالوقت. من دروس ١ و ٥.`, done: R`من نافذة عادية بيطلب UAC مرة واحدة ويكمّل في نافذة الأدمن. لو رفضت UAC بيطبع رسالة مفهومة ويخرج بكود غير صفر. واللوج فيه سطر لكل خطوة، واتشغّل مرتين ورا بعض من غير مشاكل.` },
        { lvl: 'فكرة', t: R`عدّة جهازك انت`, what: R`اختار ٣ حاجات بتعملها بإيدك كل أسبوع على جهازك (تنضيف، باك أب، فحص شبكة، تحديث برامج...) وحوّلهم لموديول واحد فيه أمر لكل حاجة، بيرفع نفسه أدمن لو محتاج، وبياخد أي سر من برا الكود، وبيشتغل بالتوازي لما ينفع، و strict mode شغال. انت اللي بتقرر الأوامر.`, done: R`الموديول بيتحمّل بـ [[Import-Module]]، وكل أمر خطير فيه [[-WhatIf]]، وفيه README بيشرح كل أمر بمثال حقيقي.`, ext: R`زوّد [[Get-Help]] لكل دالة، واعمله مهمة مجدولة، وخلّيه يبعتلك تقرير. وبعد كده انشره على PowerShell Gallery لو حابب.` },
        { lvl: 'كبير', t: R`فاحص سيرفرات بالتوازي`, what: R`ملف [[hosts.txt]] فيه اسم وبورت في كل سطر، وسكربت بيفحصهم كلهم بـ [[ForEach-Object -Parallel]] و [[-ThrottleLimit 20]] ويطلّع جدول متترتب. والتوكن بتاع الإشعار جاي من [[Import-Clixml]] على جهازك ومن [[$env:]] في الـ CI. من دروس ٢ و ٣ و ٥.`, done: R`٢٠ سطر بيخلصوا في وقت قريب من أبطأ واحد مش مجموعهم. السطر الغلط (من غير بورت) بيتطبع كتحذير ومبيوقّفش الباقي. والتوكن مش مكتوب في أي ملف جوه المشروع، و [[git grep]] على اسمه مبيلاقيش حاجة.` },
      ],
      n: R`خمس أوامر مالهاش غنى عنها في أي سكربت جد: الأدمن من الترمنال، والأسرار برا الملف، والتوازي، والمقارنة، والـ strict mode. كله اتجرّب في PowerShell 7.6 و Windows PowerShell 5.1 على ويندوز ١١، وأي حاجة مينفعش تتجرّب (سؤال UAC، و [[Get-Credential]]، وتسجيل vault) مكتوب إنها من الـ docs`,
      items: [
        {
          cmd: "Start-Process -Verb RunAs",
          title: "ادخل أدمن من الترمنال",
          learn: R`تعرف النافذة دي أدمن ولا لأ، وتفتح نافذة أدمن أو تشغّل أمر واحد كأدمن من غير ما تقفل الترمنال، وتعرف [[sudo]] بتاع ويندوز 11 وسكربت بيرفع نفسه.`,
          out: R`مش هتحتاج كليك يمين «Run as administrator» تاني، وسكربتاتك هتطلب الصلاحية لوحدها أو ترفض تشتغل برسالة واضحة.`,
          use: {
            work: R`أمر قال «Access is denied» أو «requires elevation» وانت في نص شغلك: سطر واحد بيفتح لك نافذة أدمن جنب اللي انت فيها، والنافذة القديمة بتفضل زي ما هي بالـ history بتاعها.`,
            net: R`[[netstat -b]] (مين البرنامج اللي فاتح البورت) وتعديل الفايروول والـ DNS والـ IP كلهم محتاجين أدمن.`,
            cs: R`الصلاحية جزء من البروسيس من أول ما بيتولد (access token)، ومينفعش تتزوّد بعدين. ده نفس السبب اللي بيخلي [[sudo]] في لينكس يشغّل بروسيس جديد مش بيرفع الشيل اللي انت فيه.`,
          },
          desc: R`النافذة اللي انت فاتحها **مش هتبقى أدمن أبدًا**، حتى لو حسابك أدمن. الحل إنك تفتح بروسيس **جديد** كأدمن من نفس الترمنال: [[Start-Process pwsh -Verb RunAs]] (ويندوز هيسألك سؤال UAC)، أو [[sudo]] المدمج في ويندوز 11 بعد ما تفعّله.

الأول اعرف انت فين: [[whoami /groups]] بيطبع مستوى النافذة، [[Medium Mandatory Level]] يعني عادي و [[High Mandatory Level]] يعني أدمن. وفي سكربت، [[IsInRole(...Administrator)]] بيرجّع [[True]] أو [[False]].

[[Start-Process]] بيشغّل برنامج، و [[-Verb RunAs]] معناها «شغّله بالأمر اللي في قايمة الكليك يمين: Run as administrator». ينفع مع [[pwsh]] (PowerShell 7) و [[powershell]] (5.1) و [[wt]] (Windows Terminal كله) و [[cmd]]. ولو عايز أمر واحد بس، ابعته في [[-ArgumentList]] مع [[-NoExit]] عشان النافذة متقفلش قبل ما تقرا الناتج.

ومن CMD مفيش [[Start-Process]]، فبتنادي PowerShell يعملها: [[powershell -c "Start-Process cmd -Verb RunAs"]].

و [[sudo]] في ويندوز 11 (24H2 وأحدث) مقفول من الأول. على الجهاز ده [[sudo -h]] طبع «Sudo is disabled on this machine». بيتفعّل من Settings، وبعدها [[sudo <أمر>]] بيشغّل الأمر ده بس كأدمن (برضه بعد سؤال UAC).

وفي السكربتات: يا إما السكربت يفحص نفسه ولو مش أدمن يفتح نفسه تاني بـ [[-Verb RunAs]] و [[-File "$PSCommandPath"]] ويقفل، يا إما أول سطر فيه [[#Requires -RunAsAdministrator]] فيرفض يشتغل أصلًا برسالة واضحة.`,
          example: R`# Windows (PowerShell):
whoami /groups | Select-String 'Mandatory Level'
$me = [Security.Principal.WindowsPrincipal]::new([Security.Principal.WindowsIdentity]::GetCurrent())
$me.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
Start-Process pwsh -Verb RunAs
Start-Process powershell -Verb RunAs
Start-Process wt -Verb RunAs
Start-Process pwsh -Verb RunAs -ArgumentList '-NoExit', '-Command', 'netstat -abno'
sudo -h
# Windows (CMD):
powershell -c "Start-Process cmd -Verb RunAs"`,
          lines: [
            R`[[whoami /groups]] بيطبع كل الجروبات اللي في الـ token بتاع النافذة دي، ومن ضمنهم سطر «مستوى الثقة» (integrity level). و [[Select-String 'Mandatory Level']] بيفلتر السطر ده بس من وسط حوالي ١٥ سطر. لو طلع [[Medium]] النافذة عادية، ولو [[High]] النافذة أدمن. متكتبش [[Mandatory]] بس، لأن الكلمة دي موجودة في كل سطر تقريبًا ([[Mandatory group]]).`,
            R`[[WindowsIdentity]::GetCurrent()]] بيجيب هوية الحساب اللي شغّال بيه البروسيس ده، و [[WindowsPrincipal]::new(...)]] بيلفّها في object تقدر تسأله «انت عضو في جروب كذا؟». [[$me]] اسم اخترناه، و [[::]] معناها «method تبع الـ class نفسه» مش تبع object.`,
            R`[[IsInRole(...Administrator)]] بيرجّع [[True]] بس لو النافذة **مرفوعة فعلًا** (elevated)، مش لو حسابك أدمن وخلاص. ده اللي بتحطه في [[if]] جوه سكربت، لأن ناتج [[whoami]] نص لازم تدوّر فيه، وده [[True]] أو [[False]] جاهز.`,
            R`[[Start-Process]] بيشغّل برنامج جديد في نافذة لوحده، و [[pwsh]] هو PowerShell 7، و [[-Verb RunAs]] بتطلب من ويندوز يشغّله كأدمن، فيطلع سؤال UAC «Do you want to allow this app...». لو وافقت تفتح نافذة جديدة أدمن، والنافذة اللي انت فيها تفضل زي ما هي (مش أدمن).`,
            R`نفس الكلام بس لـ Windows PowerShell 5.1 ([[powershell.exe]] الأزرق). استخدمه لو السكربت أو الموديول اللي هتشغّله مكتوب لـ 5.1 بس (زي موديولات قديمة بتاعة Active Directory أو Exchange).`,
            R`[[wt]] هو Windows Terminal. لما تفتحه أدمن، **كل التابات** اللي هتفتحها جواه أدمن (PowerShell و CMD و WSL)، وده أريح لو هتشتغل شوية كأدمن. ولو [[wt]] مش متسطّب الأمر هيقول إنه مش لاقي الملف.`,
            R`أمر واحد بس كأدمن: [[-ArgumentList]] هي الكلام اللي بيتبعت لـ [[pwsh]] الجديد. [[-NoExit]] بتخلي النافذة تفضل مفتوحة بعد الأمر عشان تقرا الناتج (من غيرها بتفتح وتقفل في ثانية)، و [[-Command 'netstat -abno']] الأمر نفسه. [[netstat -b]] بيطلّع اسم البرنامج اللي فاتح كل بورت، ومن غير أدمن بيرد «The requested operation requires elevation».`,
            R`[[sudo]] بتاع ويندوز 11 (برنامج حقيقي في [[C:\Windows\System32\sudo.exe]])، و [[-h]] بيطبع المساعدة. على الجهاز ده رد بـ «Sudo is disabled on this machine» لأنه مقفول من المصنع. بعد التفعيل من Settings، [[sudo netstat -abno]] بيشغّل الأمر ده كأدمن بعد سؤال UAC.`,
            R`من CMD: [[Start-Process]] مش أمر CMD، فبنشغّل [[powershell]] و [[-c]] (اختصار [[-Command]]) يشغّل الأمر اللي بين علامات التنصيص، وهو بيفتح [[cmd]] جديد كأدمن. علامات التنصيص الدبل لازم، عشان CMD يبعت الجملة كلها لـ PowerShell حتة واحدة.`,
          ],
          try: R`افتح PowerShell عادي واكتب [[whoami /groups | Select-String 'Mandatory Level']] واتأكد إنه [[Medium]]. بعدها [[Start-Process pwsh -Verb RunAs]] ووافق على UAC، وفي النافذة الجديدة اكتب نفس الأمر: المفروض [[High]]. وجرّب [[sudo -h]] تشوف sudo عندك مفعّل ولا لأ.`,
          practice: [
            { lvl: 'سريع', t: R`من نافذة عادية افتح نافذة أدمن بأمر واحد، وفي الاتنين شغّل [[whoami /groups | Select-String 'Mandatory Level']].`, done: R`القديمة بتقول Medium والجديدة High، والقديمة لسه مفتوحة زي ما هي.` },
            { lvl: 'تطبيق', t: R`سكربت [[check-admin.ps1]] بيطبع «أدمن» أو «مش أدمن» ويخرج بكود ٠ أو ١ حسب [[IsInRole]].`, done: R`من نافذة عادية [[& .\check-admin.ps1; $LASTEXITCODE]] بيطبع ١، ومن نافذة أدمن بيطبع ٠.` },
            { lvl: 'تحدي', t: R`سكربت بيرفع نفسه ويبعت للنسخة الأدمن نفس الـ arguments اللي اتبعتتله، حتى لو فيها مسافات.`, done: R`[[.\up.ps1 -Name 'my file']] بيوصل للنافذة الأدمن والاسم كامل بالمسافة، ولو رفضت UAC بتطبع رسالة واضحة ومفيش نافذة اتفتحت.` },
          ],
          deep: {
            why: R`أوامر كتير بتقول «Access is denied» من غير أدمن: الفايروول، والخدمات، وملف [[hosts]]، و [[netstat -b]]، وتسطيب برامج لكل اليوزرز. والطريقة اللي الناس بتعملها (تقفل الترمنال، تدوّر عليه، كليك يمين، Run as administrator، وترجع للفولدر) بتضيّع وقت وبتضيّع الـ history. سطر واحد بيفتح نافذة أدمن جنب اللي انت فيها، وسكربتك يقدر يعملها لوحده.`,
            how: R`لما بتدخل ويندوز بحساب أدمن، ويندوز بيعملك **token متقسّم** (UAC split token): نسخة «عادية» من غير صلاحيات الأدمن، ونسخة «كاملة». كل برنامج بتفتحه بياخد النسخة العادية، وده اللي بيبان في [[whoami /groups]]: جروب [[BUILTIN\Administrators]] جنبه [[Group used for deny only]]، يعني موجود بس متعطّل.

الـ token بيتحط في البروسيس **وهو بيتولد** ومفيش API بتغيّره لبروسيس شغال. عشان كده مفيش أمر يخلي النافذة اللي انت فيها أدمن. الحل الوحيد: بروسيس جديد ياخد النسخة الكاملة، وده اللي [[-Verb RunAs]] بتطلبه: ويندوز بيوقّف كل حاجة ويعرض سؤال UAC على شاشة آمنة (secure desktop) محدش يقدر يدوس عليها برمجيًا.

[[RunAs]] اسمه «verb»: أمر من أوامر الكليك يمين على الملف. [[[Diagnostics.ProcessStartInfo]::new('C:\Windows\System32\cmd.exe').Verbs]] طلّعت [[open]] و [[runas]] و [[runasuser]] على الجهاز ده. و [[sudo]] بتاع ويندوز بيستخدم نفس الآلية (UAC) من تحت، بس بيوصّل الناتج للنافذة اللي انت فيها لو اخترت الوضع «Inline».`,
            when: R`[[Start-Process -Verb RunAs]] لما تحتاج نافذة أدمن تشتغل فيها شوية، أو جوه سكربت بيرفع نفسه. [[sudo]] لأمر واحد بسرعة لو مفعّل عندك. [[#Requires -RunAsAdministrator]] لما السكربت ليك انت وعايزه يرفض بوضوح بدل ما يرفع نفسه. ومتشغّلش كل حاجة أدمن «عشان تريّح دماغك»: أي غلطة في نافذة أدمن بتعدّي من غير ما ويندوز يوقفها.`,
            mistakes: R`تفتكر إن حسابك أدمن يبقى النافذة أدمن (لأ: [[IsInRole]] هيرجّع [[False]]). أو تنسى [[-NoExit]] فالنافذة الأدمن تفتح وتقفل قبل ما تقرا حاجة. أو تبعت مسار فيه مسافة في [[-ArgumentList]] من غير علامات تنصيص فيتقطع. أو تفتكر النافذة الجديدة هتفتح في نفس الفولدر (غالبًا بتفتح في [[C:\Windows\System32]] حسب الـ docs). أو تكتب [[sudo Remove-Item ...]]: [[sudo]] بيشغّل برامج (exe) مش cmdlets.`
          },
          teach: R`## الفكرة: نافذة جديدة، مش النافذة دي

النافذة اللي انت فاتحها اتحدّدت صلاحيتها وهي بتفتح، ومفيش أمر يغيّرها. فكل الطرق هنا بتعمل حاجة واحدة: **بتشغّل بروسيس جديد كأدمن**، وويندوز بيسألك سؤال UAC قبلها. كل اللي تحت اتجرّب على ويندوز ١١ في PowerShell 7.6 و 5.1 من نافذة **عادية**، ما عدا فتح النافذة الأدمن نفسها (سؤال UAC بيوقّف الجلسة اللي بتجرّب)، ودي مكتوب عليها إنها من الـ docs.

---

## ١. انت أدمن دلوقتي؟

### بالعين: [[whoami /groups]]

~~~powershell
whoami /groups | Select-String 'Mandatory Level'
~~~

- [[whoami]] برنامج ويندوز ([[C:\Windows\System32\whoami.exe]]) بيقول انت مين، و [[/groups]] بيطبع كل الجروبات اللي في الـ token بتاع النافذة.
- [[|]] بيبعت الناتج لـ [[Select-String]]، وده بيسيب السطور اللي فيها [[Mandatory Level]] بس.

~~~text اتشغّل فعلًا · نافذة عادية · PowerShell 7.6 و 5.1 نفس الناتج
Mandatory Label\Medium Mandatory Level    Label    S-1-16-8192
~~~

المستويات اللي ممكن تشوفها:

| السطر | معناه |
|---|---|
| [[Medium Mandatory Level]] | نافذة عادية، حتى لو حسابك أدمن. ده اللي طلع هنا |
| [[High Mandatory Level]] | النافذة مرفوعة كأدمن (وافقت على UAC) |
| [[System Mandatory Level]] | شغّال كـ SYSTEM، زي الخدمات والمهام المجدولة اللي بتشتغل بالحساب ده |
| [[Low Mandatory Level]] | بروسيس محبوس أكتر من العادي، زي أجزاء من المتصفح |

والرقم في الآخر هو الـ SID بتاع المستوى: [[S-1-16-8192]] = Medium و [[S-1-16-12288]] = High (من الـ docs).

> **انتبه:** متفلترش على [[Mandatory]] لوحدها. جرّبتها وطلع ١٣ سطر، لأن كل جروب جنبه [[Mandatory group, Enabled by default]].

ودوّر على سطر جروب الأدمنز نفسه:

~~~powershell
whoami /groups | Select-String 'S-1-5-32-544'
~~~

~~~text اتشغّل فعلًا · نافذة عادية
BUILTIN\Administrators    Alias    S-1-5-32-544    Group used for deny only
~~~

[[Group used for deny only]] معناها: الحساب **أدمن**، بس الصلاحية دي متعطّلة في النافذة دي. ده الـ UAC split token اللي في «ازاي بيشتغل».

### في سكربت: [[IsInRole]]

~~~powershell
$me = [Security.Principal.WindowsPrincipal]::new([Security.Principal.WindowsIdentity]::GetCurrent())
$me.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
~~~

فكّها من جوه لبرة:

1. [[[Security.Principal.WindowsIdentity]::GetCurrent()]] بيجيب الحساب اللي شغّال بيه البروسيس ده.
2. [[[Security.Principal.WindowsPrincipal]::new(...)]] بيعمل منه object تسأله عن الجروبات.
3. [[.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)]] بيسأل: الـ token ده فيه صلاحية الأدمن **شغالة**؟

~~~text اتشغّل فعلًا · نافذة عادية · 7.6 و 5.1
False
~~~

درس «IsInRole (Admin check)» في قسم «اليوزرز والصلاحيات» شارح السطرين دول بالتفصيل.

---

## ٢. ليه مفيش أمر يخلي النافذة دي أدمن؟

| اللي بتتخيله | اللي بيحصل فعلًا |
|---|---|
| «أكتب أمر والنافذة تبقى أدمن» | الـ token بيتحط في البروسيس وهو بيبدأ، ومفيش طريقة تزوّده بعدين |
| «حسابي أدمن، يبقى أنا أدمن» | ويندوز بيدّي كل برنامج النسخة العادية من الـ token، والكاملة بس للي توافق له في UAC |
| «[[sudo]] بيرفع الشيل اللي أنا فيه» | لا في لينكس ولا في ويندوز: [[sudo]] بيشغّل بروسيس **جديد** كأدمن والشيل بتاعك بيفضل زي ما هو |

فالنتيجة: افتح بروسيس جديد. والحاجات اللي عملتها في النافذة القديمة (متغيرات، [[cd]]، history) مش هتروح معاه.

---

## ٣. افتح نافذة أدمن: [[Start-Process -Verb RunAs]]

~~~powershell
Start-Process pwsh -Verb RunAs
~~~

| الحتة | معناها |
|---|---|
| [[Start-Process]] | بيشغّل برنامج كبروسيس جديد في نافذته، ومبيستناش يخلص (درس «Start-Process») |
| [[pwsh]] | البرنامج اللي هيتشغّل: PowerShell 7. بيتدوّر عليه في الـ PATH زي ما بتكتبه في الترمنال |
| [[-Verb RunAs]] | شغّله بالـ verb اللي اسمه RunAs، وده نفسه «Run as administrator» اللي في الكليك يمين |

الـ verbs المتاحة لأي برنامج بتتقري كده:

~~~powershell
[Diagnostics.ProcessStartInfo]::new('C:\Windows\System32\cmd.exe').Verbs
~~~

~~~text اتشغّل فعلًا · PowerShell 7.6
open
runas
runasuser
~~~

والبرامج اللي هتحتاجها (اتأكدت إنهم موجودين بـ [[Get-Command pwsh, powershell, wt, cmd]]):

| الأمر | بيفتح إيه أدمن |
|---|---|
| [[Start-Process pwsh -Verb RunAs]] | PowerShell 7، اللي بتستخدمه في الدروس |
| [[Start-Process powershell -Verb RunAs]] | Windows PowerShell 5.1، لموديولات قديمة مكتوبة ليه بس |
| [[Start-Process wt -Verb RunAs]] | Windows Terminal كله، وكل تاب جواه هيبقى أدمن |
| [[Start-Process cmd -Verb RunAs]] | CMD أدمن، لو هتشغّل [[.bat]] محتاج صلاحية |

**اللي بيحصل بعد الأمر (من الـ docs، لأن سؤال UAC مينفعش يتجرّب هنا):** الشاشة بتغمق وييجي سؤال «Do you want to allow this app to make changes to your device?». لو وافقت، نافذة جديدة بتفتح وعنوانها بيبدأ بـ [[Administrator:]]. ولو رفضت، [[Start-Process]] بيرمي error إن العملية اتلغت، والنافذة القديمة بتكمّل عادي.

> النافذة الأدمن غالبًا بتفتح في [[C:\Windows\System32]] مش في الفولدر اللي كنت فيه (من الـ docs). مع [[pwsh]] ابعتله الفولدر بنفسك: [[Start-Process pwsh -Verb RunAs -ArgumentList "-NoExit -WorkingDirectory ""$PWD"""]]. جرّبت [[pwsh -WorkingDirectory C:\Windows]] من غير أدمن وطبع [[C:\Windows]].

---

## ٤. أمر واحد بس كأدمن: [[-ArgumentList]]

~~~powershell
Start-Process pwsh -Verb RunAs -ArgumentList '-NoExit', '-Command', 'netstat -abno'
~~~

- [[-ArgumentList]] الكلام اللي هيتكتب بعد [[pwsh]] في النافذة الجديدة. القايمة [[ '-NoExit', '-Command', '...']] بتتلزق بمسافات، فبيبقى [[pwsh -NoExit -Command netstat -abno]].
- [[-NoExit]]: متقفلش بعد الأمر. من غيرها النافذة بتطبع وتقفل في نفس الثانية.
- [[netstat -abno]]: [[-a]] كل البورتات، و [[-b]] اسم البرنامج، و [[-n]] أرقام مش أسامي، و [[-o]] رقم البروسيس (PID).

ليه الأدمن مهم هنا؟ جرّبت [[netstat -b]] من نافذة عادية:

~~~text اتشغّل فعلًا · نافذة عادية
The requested operation requires elevation.
~~~

وكود الخروج كان [[1]].

### مسار فيه مسافة؟ علامات تنصيص بإيدك

[[-ArgumentList]] بيلزق القيم بمسافات **من غير** ما يحط علامات تنصيص. جرّبت ده من غير أدمن (نفس [[-ArgumentList]] بالظبط، من غير [[-Verb RunAs]]) على سكربت في فولدر اسمه [[my scripts]]:

~~~powershell
# غلط: المسار بيتقطع عند المسافة
Start-Process pwsh -Wait -ArgumentList '-NoProfile', '-File', $p, '-Name', 'nour dev'
# صح: نص واحد، و "" جوه النص = علامة تنصيص
Start-Process pwsh -Wait -ArgumentList "-NoProfile -File ""$p"" -Name ""nour dev"""
~~~

~~~text اتشغّل فعلًا · الأولى · PowerShell 7.6 (وبعدها صفحة Usage بتاعة pwsh)
The argument 'C:\Users\you\lab\power\my' is not recognized as the name of a script file. Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
~~~

~~~text اتشغّل فعلًا · التانية · PowerShell 7.6 و 5.1 (اللي السكربت كتبه)
got Name=[nour dev] from [C:\Users\you\lab\power\my scripts\show.ps1]
~~~

المسار اتقطع عند المسافة، فـ pwsh دوّر على ملف اسمه [[my]].

---

## ٥. [[sudo]] بتاع ويندوز 11

ويندوز 11 (من 24H2) فيه [[sudo.exe]] حقيقي، بس **مقفول** لحد ما تفعّله:

~~~powershell
sudo -h
Get-Command sudo | Format-List Name, Source, Version
~~~

~~~text اتشغّل فعلًا · ويندوز ١١ · PowerShell 7.6
Sudo is disabled on this machine. To enable it, go to the Developer Settings page in the Settings app

Name    : sudo.exe
Source  : C:\WINDOWS\system32\sudo.exe
Version : 1.0.1.0
~~~

> **مفاجأة:** وهو مقفول، [[sudo -h]] رجّع [[$LASTEXITCODE]] = [[0]]. فسكربت بيفحص «sudo موجود؟» بكود الخروج هيفتكره شغّال.

**التفعيل (من الـ docs):** Settings ← System ← For developers، وشغّل «Enable sudo». (أو من نافذة أدمن: [[sudo config --enable normal]].) وفيه تلات أوضاع بتختار منهم:

| الوضع | اسمه في [[sudo config]] | بيعمل إيه |
|---|---|---|
| In a new window | [[forceNewWindow]] | الأمر بيتشغّل في نافذة أدمن جديدة لوحدها. ده الافتراضي والأأمن |
| Input closed | [[disableInput]] | الناتج بيظهر في نافذتك، بس الأمر مايقدرش يقرا منك كتابة |
| Inline | [[normal]] | زي sudo بتاع لينكس: الناتج والكتابة في نافذتك. الأقرب للي متعوّد عليه، والـ docs بتقول إنه الأقل أمان |

**الاستخدام (من الـ docs):**

~~~powershell
sudo netstat -abno
sudo pwsh -NoProfile -Command "Get-Service | Where-Object Status -eq 'Stopped'"
~~~

- كل مرة بيطلع سؤال UAC؛ مفيش «افتكر الباسورد ١٥ دقيقة» زي لينكس.
- [[sudo]] بيشغّل **برنامج**. [[Remove-Item]] و [[Get-Service]] cmdlets جوه PowerShell مش برامج، فابعتهم لـ [[pwsh -Command]] زي السطر التاني.

---

## ٦. سكربت بيرفع نفسه

لو هتبعت السكربت لحد مش هيعرف يفتح نافذة أدمن، خليه يعملها لوحده:

~~~powershell elevate.ps1
param([string]$Name = 'world')
$me = [Security.Principal.WindowsPrincipal]::new([Security.Principal.WindowsIdentity]::GetCurrent())
if (-not $me.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    $exe = (Get-Process -Id $PID).Path
    Start-Process $exe -Verb RunAs -ArgumentList "-NoProfile -NoExit -File ""$PSCommandPath"" -Name ""$Name"""
    exit
}
"أدمن دلوقتي، والاسم: $Name"
~~~

| السطر | ليه موجود |
|---|---|
| [[param([string]$Name = 'world')]] | السكربت بياخد parameter، عشان نشوف إزاي بيتبعت للنسخة الأدمن |
| [[if (-not $me.IsInRole(...))]] | لو **مش** أدمن بس. لو أدمن بيعدّي على طول لآخر سطر |
| [[$exe = (Get-Process -Id $PID).Path]] | [[$PID]] رقم البروسيس الحالي، و [[.Path]] مسار البرنامج بتاعه. كده السكربت بيفتح نفسه بنفس النسخة اللي اتشغّل بيها (7 أو 5.1) |
| [[-File ""$PSCommandPath""]] | [[$PSCommandPath]] المسار الكامل للسكربت ده، بين علامات تنصيص عشان المسافات |
| [[-Name ""$Name""]] | الـ parameters لازم تتبعت بإيدك، النسخة الجديدة مش بتشوف حاجة من القديمة |
| [[exit]] | يقفل النسخة العادية. من غيره كانت هتكمّل وتفشل في الأوامر اللي محتاجة أدمن |

**اتجرّب إزاي من غير UAC:** عملت دالة اسمها [[Start-Process]] بتطبع اللي اتبعت لها بس (الدالة بتغطّي على الـ cmdlet اللي بنفس الاسم)، وشغّلت السكربت من نافذة عادية:

~~~text اتشغّل فعلًا · PowerShell 7.6
FilePath: C:\Program Files\WindowsApps\Microsoft.PowerShell_7.6.9.0_x64__8wekyb3d8bbwe\pwsh.exe
Verb: RunAs
Args: -NoProfile -NoExit -File "C:\Users\you\lab\power\my scripts\elevate.ps1" -Name "nour dev"
~~~

~~~text اتشغّل فعلًا · Windows PowerShell 5.1
FilePath: C:\WINDOWS\System32\WindowsPowerShell\v1.0\powershell.exe
Verb: RunAs
Args: -NoProfile -NoExit -File "C:\Users\you\lab\power\my scripts\elevate.ps1" -Name "nour dev"
~~~

لاحظ إن [[$exe]] طلع [[pwsh.exe]] في 7 و [[powershell.exe]] في 5.1 لوحده، والمسار اللي فيه مسافة جه بين علامات تنصيص. والسكربت **لازم يبقى ملف**: لو لزقته في الترمنال [[$PSCommandPath]] بيبقى فاضي.

---

## ٧. ولا ترفع، ارفض: [[#Requires -RunAsAdministrator]]

~~~powershell req.ps1
#Requires -RunAsAdministrator
'لو شايف ده يبقى انت أدمن'
~~~

السطر ده شكله تعليق (بيبدأ بـ [[#]]) بس PowerShell بيقراه **قبل** ما يشغّل أي سطر في الملف:

~~~text اتشغّل فعلًا · نافذة عادية · PowerShell 7.6 (كود الخروج 1)
PermissionDenied: The script 'req.ps1' cannot be run because it contains a "#requires" statement for running as Administrator. The current PowerShell session is not running as Administrator. Start PowerShell by using the Run as Administrator option, and then try running the script again.
~~~

~~~text اتشغّل فعلًا · Windows PowerShell 5.1 (كود الخروج 1)
The script 'req.ps1' cannot be run because it contains a "#requires" statement for running as Administrator. The
current Windows PowerShell session is not running as Administrator. Start Windows PowerShell by  using the Run as
Administrator option, and then try running the script again.
    + CategoryInfo          : PermissionDenied: (req.ps1:String) [], ParentContainsErrorRecordException
    + FullyQualifiedErrorId : ScriptRequiresElevation
~~~

ولا سطر من السكربت اشتغل، وده أحسن من سكربت يعمل نص الشغل ويقع في النص.

---

## ٨. من CMD

~~~cmd
powershell -c "Start-Process cmd -Verb RunAs"
~~~

CMD معندوش أمر يرفع الصلاحية ([[runas]] بتاع CMD بيشغّل بحساب **تاني** وبيسأل عن باسورده، مش بيرفع حسابك). فبنستلف [[Start-Process]] من PowerShell: [[-c]] = [[-Command]]، والجملة كلها بين [[""]] عشان توصل حتة واحدة.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| أعرف أنا أدمن؟ (بالعين) | [[whoami /groups]] وبعدها [[Select-String 'Mandatory Level']]: Medium عادي و High أدمن |
| أعرف أنا أدمن؟ (في سكربت) | [[$me.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)]] |
| نافذة أدمن | [[Start-Process pwsh -Verb RunAs]] (أو [[powershell]] أو [[wt]] أو [[cmd]]) |
| أمر واحد كأدمن | [[-ArgumentList '-NoExit', '-Command', '...']] أو [[sudo <أمر>]] بعد التفعيل |
| سكربت يرفع نفسه | فحص ← [[Start-Process $exe -Verb RunAs -ArgumentList "-File ""$PSCommandPath"""]] ← [[exit]] |
| سكربت يرفض من غير أدمن | [[#Requires -RunAsAdministrator]] في أوله |

- النافذة اللي انت فيها **عمرها ما هتبقى أدمن**؛ كل الطرق بتفتح بروسيس جديد.
- حسابك أدمن ≠ النافذة أدمن.
- مسار فيه مسافة في [[-ArgumentList]] = علامات تنصيص بإيدك.
- [[sudo]] بيشغّل برامج مش cmdlets، ومقفول لحد ما تفعّله.`,
          sol: R`[[whoami /groups]] في النافذة العادية طلع [[Medium Mandatory Level]] و [[IsInRole]] طلع [[False]] (اتشغّلوا فعلًا في 7.6 و 5.1)، و [[sudo -h]] طبع «Sudo is disabled on this machine...» على الجهاز ده. أما فتح النافذة الأدمن نفسها و [[High Mandatory Level]] جواها وشكل سؤال UAC، فمن الـ docs، لأن سؤال UAC بيوقّف الجلسة اللي بتجرّب. وسكربت الرفع اتجرّب بدالة بتطبع اللي كان هيتشغّل بدل [[Start-Process]].`,
          solCode: R`# في النافذة العادية (اتشغّل فعلًا):
whoami /groups | Select-String 'Mandatory Level'
# Mandatory Label\Medium Mandatory Level    Label    S-1-16-8192

Start-Process pwsh -Verb RunAs
# ← سؤال UAC، وافق

# في النافذة الجديدة (من الـ docs):
whoami /groups | Select-String 'Mandatory Level'
# Mandatory Label\High Mandatory Level      Label    S-1-16-12288

sudo -h
# Sudo is disabled on this machine. To enable it, go to the Developer Settings page in the Settings app`
        },

        {
          cmd: "Get-Credential و الأسرار",
          title: "الباسورد برا ملف السكربت",
          learn: R`تطلب الباسورد بـ [[Get-Credential]]، وتعمل [[PSCredential]] من [[SecureString]]، وتحفظه متشفّر بـ [[Export-Clixml]]، وتاخد السر من متغير بيئة في الـ CI، وتعرف SecretManagement.`,
          out: R`سكربت تقدر تبعته أو ترفعه على GitHub من غير ما يبقى فيه ولا باسورد ولا توكن.`,
          use: {
            work: R`سكربت فيه [[$password = 'P@ss-123']] اتبعت لزميل، أو اترفع على repo، أو اتحفظ في لوج: الباسورد ده لازم يتغيّر في كل مكان. والأسهل إنه ميتكتبش أصلًا.`,
            net: R`الدخول على سيرفر بـ [[Invoke-Command -Credential]] أو [[Enter-PSSession]]، وتوكنز APIs في [[Invoke-RestMethod -Headers]]، كلهم محتاجين سر في وقت التشغيل.`,
            cs: R`DPAPI (Data Protection API) بيشفّر بمفتاح مشتق من باسورد حساب ويندوز بتاعك، فاللي بيفك هو نفس الحساب على نفس الجهاز بس. ده «التشفير المربوط بالهوية» بدل مفتاح محفوظ جنب البيانات.`,
          },
          desc: R`أي باسورد أو توكن مكتوب جوه [[.ps1]] بيتسرّب في الآخر: في git، أو في إيميل، أو في شاشة حد شايفها. الحل إنه ييجي من **برا** الملف في وقت التشغيل: من اليوزر بـ [[Get-Credential]]، أو من ملف متشفّر ليك انت بس بـ [[Export-Clixml]]، أو من متغير بيئة في الـ CI.

[[Get-Credential]] بيسأل اليوزر عن اسم وباسورد ويرجّع object من نوع [[PSCredential]]: فيه [[UserName]] نص عادي، و [[Password]] من نوع [[SecureString]] (نص متشفّر في الذاكرة ومبيتطبعش). وأغلب الأوامر اللي بتتصل بحاجة بتقبله في [[-Credential]].

[[Export-Clixml]] بيحفظ الـ object في ملف XML، والباسورد جواه بيتشفّر بـ **DPAPI**: مفتاح مربوط بحساب ويندوز بتاعك على الجهاز ده. [[Import-Clixml]] بيرجّعه زي ما كان، بس **لنفس اليوزر على نفس الجهاز**. يوزر تاني أو جهاز تاني بياخد error ومش بيشوف الباسورد.

وفي الـ CI (GitHub Actions مثلًا) مفيش حد يكتب ومفيش ملف DPAPI، فالسر بييجي من [[$env:DEPLOY_TOKEN]] اللي الـ CI بيحطه من الـ secrets بتاعته. والسكربت **يقع بدري** لو المتغير مش موجود، بدل ما يبعت طلب بتوكن فاضي.

ولو عندك أسرار كتير، موديول **SecretManagement** بيدّيك [[Set-Secret]] و [[Get-Secret]] فوق خزنة (vault) زي SecretStore. محتاج تسطيب، والدرس بيوريك تجرّبه من فولدر مؤقت من غير ما يلمس جهازك.`,
          example: R`$cred = Get-Credential -UserName 'nour' -Message 'باسورد سيرفر التجربة'
$cred | Export-Clixml -Path "$HOME\lab\power\cred.xml"
$back = Import-Clixml -Path "$HOME\lab\power\cred.xml"
$back.UserName
$back.GetNetworkCredential().Password.Length
if (-not $env:DEPLOY_TOKEN) { throw 'DEPLOY_TOKEN مش متظبط' }
$sec = ConvertTo-SecureString $env:DEPLOY_TOKEN -AsPlainText -Force
$ci  = [pscredential]::new('deploy-bot', $sec)`,
          lines: [
            R`[[Get-Credential]] بيسأل عن الباسورد ويرجّع [[PSCredential]] بنحطه في [[$cred]]. [[-UserName 'nour']] بيملا الاسم مسبقًا فاليوزر يكتب الباسورد بس، و [[-Message]] الجملة اللي بتظهر فوق السؤال عشان اليوزر يعرف الباسورد ده بتاع إيه. في 7 السؤال بيظهر في الترمنال نفسه، وفي 5.1 نافذة ويندوز صغيرة.`,
            R`[[|]] بيبعت الـ credential لـ [[Export-Clixml]] اللي بيحوّله لملف XML في [[-Path]]. الاسم بيتكتب عادي والباسورد بيتشفّر بـ DPAPI بمفتاح حسابك. الملف ده آمن تسيبه على جهازك، بس **متحطوش في git**: مش هيفيد حد تاني (مش هيعرف يفكه) وهيبان إن عندك ملف أسرار.`,
            R`[[Import-Clixml]] بيقرا الملف ويبني الـ [[PSCredential]] تاني بنفس النوع، والباسورد بيتفك وبيرجع [[SecureString]]. ده اللي بتحطه في أول السكربت بدل [[Get-Credential]]، فالسكربت يشتغل لوحده (مهمة مجدولة مثلًا) من غير ما يسأل حد.`,
            R`[[UserName]] نص عادي مش متشفّر، فبيتطبع على طول: طلع [[nour]]. اطبعه عشان تتأكد إنك فتحت الملف الصح، لكن الباسورد نفسه متطبعهوش.`,
            R`[[GetNetworkCredential()]] بيفك الـ [[SecureString]] لنص عادي في [[.Password]]، و [[.Length]] عدد حروفه (طلع [[8]]). بنطبع الطول بس كدليل إن الفك نجح من غير ما الباسورد يظهر على الشاشة أو في الـ transcript. استخدم [[.Password]] نفسه بس لما برنامج خارجي محتاج نص عادي.`,
            R`في الـ CI: [[$env:DEPLOY_TOKEN]] متغير بيئة الـ CI بيحطه من الـ secrets. [[-not]] بتقلب: لو المتغير مش موجود أو فاضي يبقى الشرط True، و [[throw]] بيوقّف السكربت برسالة واضحة. من غير السطر ده، السكربت كان هيبعت طلب بتوكن فاضي ويرجّع 401 مش مفهوم بعد دقايق.`,
            R`[[ConvertTo-SecureString]] بيحوّل النص لـ [[SecureString]]. [[-AsPlainText]] معناها «اللي جاي نص عادي»، و [[-Force]] معناها «أيوه أنا عارف إنه نص عادي» (من غيرها بيرفض لأن السر كان مكتوب واضح قبل كده). محتاجها لأن أوامر كتير بتقبل [[SecureString]] أو [[PSCredential]] بس.`,
            R`[[[pscredential]::new(اسم, باسورد)]] بيعمل [[PSCredential]] بإيدك من اسم و [[SecureString]] من غير أي سؤال. ده نفس النوع اللي [[Get-Credential]] بيرجّعه، فأي أمر بياخد [[-Credential $ci]]. والمسافة بعد [[$ci]] للمحاذاة بس.`,
          ],
          try: R`ابني credential بإيدك ([[ConvertTo-SecureString]] و [[[pscredential]::new]]) بدل [[Get-Credential]]، واحفظه بـ [[Export-Clixml]]، وافتح [[cred.xml]] بـ [[Get-Content]] وشوف الباسورد شكله إيه. بعدها [[Import-Clixml]] واطبع [[.UserName]] وطول الباسورد. وجرّب سطر [[DEPLOY_TOKEN]] مرة من غير المتغير ومرة بعد [[$env:DEPLOY_TOKEN = 'demo']].`,
          practice: [
            { lvl: 'سريع', t: R`احفظ credential تجريبي بـ [[Export-Clixml]] وافتح الملف بـ [[Get-Content]].`, done: R`الباسورد مش مكتوب في الملف (مكانه سطر hex طويل)، و [[(Import-Clixml f.xml).GetNetworkCredential().Password]] بيرجّع الباسورد الأصلي.` },
            { lvl: 'تطبيق', t: R`سكربت بياخد التوكن من [[$env:DEPLOY_TOKEN]] لو موجود، ولو لأ من ملف Clixml، ولو الاتنين مش موجودين يقف برسالة.`, done: R`التلات حالات شغالة، والتوكن مش بيتطبع على الشاشة ولا في أي لوج.` },
            { lvl: 'تحدي', t: R`اكتب سكربت فيه ٣ تسريبات: باسورد مكتوب في متغير، وفي [[Write-Host]]، وجوه [[Start-Transcript]]، وبعدين صلّحهم.`, done: R`بعد التصليح [[Select-String]] على السكربت والـ transcript مبيلاقيش الباسورد التجريبي خالص.` },
          ],
          deep: {
            why: R`الباسورد اللي في الملف بيتنسخ مع الملف: لكل زميل، ولكل نسخة باك أب، ولكل commit في تاريخ git حتى لو مسحته بعدين. وبوتات بتدوّر على GitHub على توكنز مكشوفة في دقايق. لما السر ييجي من برا الملف، السكربت نفسه بيبقى آمن تبعته وترفعه وتعرضه، والسر بيتغيّر في مكان واحد.`,
            how: R`[[SecureString]] نص محفوظ في الذاكرة متشفّر، وPowerShell مبيطبعوش (بيكتب [[System.Security.SecureString]] بداله). [[PSCredential]] = اسم + [[SecureString]].

[[Export-Clixml]] بيكتب أي object كـ XML (CLIXML = Common Language Infrastructure XML)، ولما يقابل [[SecureString]] بيشفّره بـ [[ConvertFrom-SecureString]] من غير مفتاح، وده بيستخدم DPAPI بنطاق CurrentUser. DPAPI بيشتق المفتاح من سر الحساب بتاعك، فـ [[Import-Clixml]] بيشتغل بس لنفس الحساب على نفس الجهاز. جرّبت أصدّر من 7 وأقرا من 5.1 والعكس: اشتغل، لأنه نفس الحساب ونفس الجهاز.

على لينكس والماك الكلام ده **مش صحيح**: الـ docs بتاعة [[Export-Clixml]] بتقول إن الـ credentials هناك بتتحفظ كنص من غير تشفير حقيقي. فـ [[Export-Clixml]] كخزنة أسرار على ويندوز بس.

SecretManagement طبقة موحّدة: نفس [[Get-Secret]] و [[Set-Secret]] فوق خزن مختلفة (SecretStore المحلي، أو KeePass، أو Azure Key Vault) بتتسجّل بـ [[Register-SecretVault]].`,
            when: R`[[Get-Credential]] لما فيه يوزر قاعد قدام السكربت. [[Export-Clixml]] لسكربت بيشتغل لوحده على جهازك أو سيرفرك بنفس الحساب (مهمة مجدولة). [[$env:]] في الـ CI والكونتينرز. SecretManagement لما الأسرار تكتر أو تبقى مشتركة بين سكربتات كتير، أو محتاج خزنة سحابية.`,
            mistakes: R`تكتب الباسورد في الملف «مؤقتًا» وينسى ويترفع. أو تنسخ [[cred.xml]] لجهاز أو حساب تاني وتستغرب ليه بيقول «Key not valid for use in specified state». أو تشغّل المهمة المجدولة بحساب SYSTEM وهي بتقرا ملف اتعمل بحسابك (نفس المشكلة). أو تطبع [[.GetNetworkCredential().Password]] للتأكد فيظهر في [[Start-Transcript]] واللوجات. أو تنسى الفحص في الـ CI فالسكربت يكمّل بتوكن فاضي.`
          },
          teach: R`## الفكرة: السر بييجي وقت التشغيل، مش مكتوب في الملف

فيه أربع طرق، وكل واحدة لموقف:

| الموقف | السر جاي منين |
|---|---|
| فيه يوزر قاعد قدام السكربت | [[Get-Credential]] بيسأله |
| السكربت بيشتغل لوحده على جهازك | ملف [[Export-Clixml]] متشفّر لحسابك |
| السكربت شغّال في CI أو كونتينر | متغير بيئة [[$env:...]] من الـ secrets |
| أسرار كتير أو مشتركة | خزنة SecretManagement |

كل اللي تحت اتشغّل في PowerShell 7.6 و 5.1، ما عدا سؤال [[Get-Credential]] (بيستنى كتابة) وتسجيل الخزنة (بيكتب في إعدادات اليوزر)، ودول من الـ docs.

---

## ١. [[Get-Credential]]: اسأل اليوزر

~~~powershell
$cred = Get-Credential -UserName 'nour' -Message 'باسورد سيرفر التجربة'
~~~

| الحتة | معناها |
|---|---|
| [[Get-Credential]] | بيسأل عن اسم وباسورد ويرجّع [[PSCredential]] |
| [[-UserName 'nour']] | الاسم مكتوب مسبقًا، فاليوزر بيكتب الباسورد بس |
| [[-Message]] | الجملة اللي فوق السؤال: قول الباسورد ده بتاع إيه |

**شكل السؤال (من الـ docs):** في PowerShell 7 السؤال بيظهر في الترمنال نفسه، والباسورد بيتكتب نجوم:

~~~text من الـ docs · PowerShell 7
PowerShell credential request
باسورد سيرفر التجربة
Password for user nour: ********
~~~

وفي 5.1 بتطلع نافذة ويندوز صغيرة فيها خانة الاسم والباسورد. ولو اليوزر داس Cancel، [[$cred]] بيبقى [[$null]]، فافحصه قبل ما تستخدمه.

> جرّبت أبعت الباسورد لـ [[Get-Credential]] من stdin ([[printf ... | pwsh -c Get-Credential]]): فضل مستني لحد ما قفلته بعد ٢٠ ثانية. يعني مينفعش في سكربت مفيش حد قدامه.

---

## ٢. [[PSCredential]] بإيدك من [[SecureString]]

ده اللي جرّبت بيه بدل [[Get-Credential]]، وهو نفس اللي بتعمله في الـ CI:

~~~powershell
$sec = ConvertTo-SecureString 'P@ss-123' -AsPlainText -Force
$sec
$cred = [pscredential]::new('nour', $sec)
$cred
$cred.GetNetworkCredential().Password
~~~

~~~text اتشغّل فعلًا · PowerShell 7.6 و 5.1 نفس الناتج
System.Security.SecureString

UserName                     Password
--------                     --------
nour     System.Security.SecureString
P@ss-123
~~~

- [[$sec]] لوحده بيطبع اسم النوع بس، مش الباسورد. ده الفرق بين [[SecureString]] والنص العادي.
- النوع [[pscredential]] (بين قوسين مربعين) اختصار لـ [[System.Management.Automation.PSCredential]]، و [[::new(اسم, باسورد)]] بيبنيه.
- [[GetNetworkCredential().Password]] بيفكه لنص. ده الطريق الوحيد لنص الباسورد، فاستخدمه بس لما برنامج خارجي محتاجه.

> الباسورد مكتوب هنا عشان التجربة بس. في سكربت حقيقي النص ده جاي من [[$env:]] أو من [[Read-Host -AsSecureString]] (بيسأل ويرجّع [[SecureString]] على طول).

### الفرق بين 7 و 5.1

~~~powershell
ConvertFrom-SecureString $sec -AsPlainText
~~~

~~~text اتشغّل فعلًا
PowerShell 7.6:  P@ss-123
Windows PowerShell 5.1:  A parameter cannot be found that matches parameter name 'AsPlainText'.
~~~

[[-AsPlainText]] في [[ConvertFrom-SecureString]] جديد في 7. في 5.1 استخدم [[GetNetworkCredential().Password]] (شغال في الاتنين).

---

## ٣. [[Export-Clixml]]: احفظه متشفّر لحسابك

~~~powershell
$cred | Export-Clixml -Path "$HOME\lab\power\cred.xml"
Get-Content "$HOME\lab\power\cred.xml"
~~~

~~~text اتشغّل فعلًا · PowerShell 7.6 (الـ hex اتقص)
<Objs Version="1.1.0.1" xmlns="http://schemas.microsoft.com/powershell/2004/04">
  <Obj RefId="0">
    <TN RefId="0">
      <T>System.Management.Automation.PSCredential</T>
      <T>System.Object</T>
    </TN>
    <ToString>System.Management.Automation.PSCredential</ToString>
    <Props>
      <S N="UserName">nour</S>
      <SS N="Password">01000000d08c9ddf0115d1118c7a00c04fc297eb01000000…</SS>
    </Props>
  </Obj>
</Objs>
~~~

اقرا الملف:

| الحتة | معناها |
|---|---|
| [[<T>...PSCredential</T>]] | نوع الـ object، عشان [[Import-Clixml]] يرجّعه بنفس النوع |
| [[<S N="UserName">nour</S>]] | [[S]] = String: الاسم مكتوب واضح |
| [[<SS N="Password">]] | [[SS]] = SecureString: الباسورد متشفّر بـ DPAPI، ٤٩٢ حرف hex لباسورد من ٨ حروف |
| [[01000000d08c9ddf...]] | أول الـ blob ثابت على أي جهاز (رقم نسخة DPAPI ورقم الـ provider)، وبعده رقم المفتاح بتاع حسابك والبيانات المتشفّرة |

ورجّعه:

~~~powershell
$back = Import-Clixml -Path "$HOME\lab\power\cred.xml"
$back.GetType().FullName
$back.UserName
$back.GetNetworkCredential().Password.Length
~~~

~~~text اتشغّل فعلًا · 7.6 و 5.1
System.Management.Automation.PSCredential
nour
8
~~~

> **مفاجأة صغيرة:** نفس الملف حجمه [[882]] بايت من 7 و [[1766]] بايت من 5.1، لأن 5.1 بيكتبه UTF-16 (حرفين بايت لكل حرف). والاتنين بيقروا ملفات بعض عادي: صدّرت من 7 وقريت من 5.1 والعكس، وطلع [[P@ss-123]] في الحالتين.

### لو يوزر تاني أو جهاز تاني فتح الملف

مينفعش أجرّب بحساب تاني على الجهاز، فقلّدت الحالة: غيّرت رقم المفتاح جوه الـ blob لرقم مش موجود (زي ملف اتعمل بحساب تاني):

~~~text اتشغّل فعلًا · PowerShell 7.6
Import-Clixml: Error occurred during a cryptographic operation.
~~~

~~~text اتشغّل فعلًا · Windows PowerShell 5.1
Import-Clixml : Key not valid for use in specified state.
    + CategoryInfo          : NotSpecified: (:) [Import-Clixml], CryptographicException
~~~

نفس الغلطة برسالتين مختلفتين. لو شفت أي واحدة فيهم: الملف اتعمل بحساب أو على جهاز غير اللي انت عليه. الحل إنك تعمله تاني بنفس الحساب اللي هيقراه (لو مهمة مجدولة بحساب معيّن، اعمل الملف وانت داخل بالحساب ده).

---

## ٤. في الـ CI: متغير بيئة، وافحصه بدري

~~~powershell deploy.ps1
$token = $env:DEPLOY_TOKEN
if ([string]::IsNullOrWhiteSpace($token)) {
    throw 'DEPLOY_TOKEN مش متظبط. حطّه في secrets بتاعة الـ CI أو في الجلسة.'
}
$headers = @{ Authorization = "Bearer $token" }
"token length: $($token.Length), header ready: $($headers.Keys)"
~~~

- [[[string]::IsNullOrWhiteSpace($token)]] بيرجّع True لو المتغير مش موجود ([[$null]]) أو فاضي أو مسافات بس. أدق من [[-not $token]] اللي بيعدّي [[' ']].
- [[@{ Authorization = "Bearer $token" }]] الـ header اللي أغلب الـ APIs عايزاه، وبيتبعت بـ [[Invoke-RestMethod -Headers $headers]].

~~~text اتشغّل فعلًا · من غير المتغير · 7.6 (كود الخروج 1)
Exception: C:\Users\you\lab\power\deploy.ps1:3
Line |
   3 |      throw 'DEPLOY_TOKEN مش متظبط. حطّه في secrets بتاعة الـ CI أو في  …
     |      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     | DEPLOY_TOKEN مش متظبط. حطّه في secrets بتاعة الـ CI أو في الجلسة.
~~~

وبعد [[$env:DEPLOY_TOKEN='abc123xyz']] في نفس الجلسة:

~~~text اتشغّل فعلًا · 7.6 و 5.1
token length: 9, header ready: Authorization
~~~

[[$env:X = '...']] بيعيش في الجلسة دي بس ويروح لما تقفلها، فمش بيتحفظ على الجهاز. وفي GitHub Actions بتحطه كده (من الـ docs):

~~~text .github/workflows/deploy.yml (جزء)
- run: ./deploy.ps1
  shell: pwsh
  env:
    DEPLOY_TOKEN: $__{{ secrets.DEPLOY_TOKEN }}
~~~

---

## ٥. SecretManagement: خزنة أسرار

موديولين من Microsoft: **SecretManagement** (الأوامر) و **SecretStore** (خزنة محلية متشفّرة). مش جايين مع ويندوز. عشان تجرّبهم من غير ما يتسطّبوا في البروفايل بتاعك، نزّلهم في فولدر مؤقت واعمل import من هناك:

~~~powershell
$mods = "$env:TEMP\secmods"
New-Item -ItemType Directory $mods -Force | Out-Null
Save-Module -Name Microsoft.PowerShell.SecretManagement, Microsoft.PowerShell.SecretStore -Path $mods -Repository PSGallery
Import-Module "$mods\Microsoft.PowerShell.SecretManagement", "$mods\Microsoft.PowerShell.SecretStore"
Get-Command -Module Microsoft.PowerShell.SecretManagement
~~~

- [[Save-Module]] بينزّل الموديول بس في [[-Path]]، من غير تسطيب ومن غير ما يلمس [[PSModulePath]]. (أخد حوالي ٣ دقايق هنا.)
- [[Import-Module "مسار"]] بيحمّله للجلسة دي بس من الفولدر ده.

~~~text اتشغّل فعلًا · 7.6 و 5.1 نفس الأوامر
Name                                  Version
Microsoft.PowerShell.SecretManagement 1.1.2
Microsoft.PowerShell.SecretStore      1.0.6

Get-Secret            Get-SecretInfo          Get-SecretVault
Register-SecretVault  Remove-Secret           Set-Secret
Set-SecretInfo        Set-SecretVaultDefault  Test-SecretVault
Unlock-SecretVault    Unregister-SecretVault
~~~

**الاستخدام (من الـ docs، مااتشغّلش لأن [[Register-SecretVault]] بيكتب في إعدادات اليوزر في LocalAppData):**

~~~powershell
Register-SecretVault -Name LocalStore -ModuleName Microsoft.PowerShell.SecretStore -DefaultVault
Set-Secret -Name DeployToken -Secret 'ghp_xxx'
Get-Secret -Name DeployToken -AsPlainText
Get-SecretInfo
~~~

| الأمر | بيعمل إيه |
|---|---|
| [[Register-SecretVault]] | بيسجّل خزنة باسم، و [[-DefaultVault]] بيخليها اللي بتتستخدم لو مقلتش [[-Vault]] |
| [[Set-Secret -Name ... -Secret ...]] | بيحفظ سر (نص أو [[SecureString]] أو [[PSCredential]] أو hashtable) |
| [[Get-Secret -AsPlainText]] | بيرجّعه نص. من غير [[-AsPlainText]] النص بيرجع [[SecureString]] |
| [[Get-SecretInfo]] | بيعرض أسامي الأسرار وأنواعها من غير القيم |

ومساعدة SecretStore نفسها (من [[Get-Help]] بتاع الموديول اللي نزل) بتقول إن الإعداد الافتراضي: [[Scope]] = CurrentUser، و [[Authentication]] = باسورد للخزنة، و [[PasswordTimeout]] = ١٥ دقيقة، و [[Interaction]] = يسألك لو الجلسة تفاعلية. يعني أول [[Set-Secret]] هيطلب منك باسورد للخزنة نفسها.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| أسأل اليوزر | [[Get-Credential -UserName ... -Message ...]] |
| أحفظ لنفسي على الجهاز ده | [[Export-Clixml]] وبعدين [[Import-Clixml]] (ويندوز بس، نفس الحساب ونفس الجهاز) |
| الـ CI | [[$env:NAME]] + فحص بـ [[throw]] في أول السكربت |
| أعمل credential من نص | [[ConvertTo-SecureString ... -AsPlainText -Force]] وبعدين [[[pscredential]::new]] |
| أسرار كتير | SecretManagement + SecretStore |

- [[SecureString]] مبيتطبعش، و [[GetNetworkCredential().Password]] الطريق الوحيد للنص.
- ملف [[Export-Clixml]] **مش بيتنقل**: حساب تاني أو جهاز تاني = error.
- متطبعش الباسورد للتأكد؛ اطبع طوله.`,
          sol: R`اللي اتشغّل فعلًا في 7.6 و 5.1: بناء [[PSCredential]] من [[SecureString]]، و [[Export-Clixml]] وشكل الملف، و [[Import-Clixml]] (طلع [[nour]] و [[8]])، والقراية بين النسختين، والـ error لما رقم المفتاح اتغيّر، وفحص [[DEPLOY_TOKEN]]، و [[Save-Module]] لـ SecretManagement في فولدر مؤقت و [[Get-Command]]. ومن الـ docs: شكل سؤال [[Get-Credential]] (بيستنى كتابة)، و [[Register-SecretVault]] و [[Set-Secret]] و [[Get-Secret]] (بيكتبوا في إعدادات اليوزر)، وسلوك [[Export-Clixml]] على لينكس والماك.`,
          solCode: R`$sec  = ConvertTo-SecureString 'P@ss-123' -AsPlainText -Force
$cred = [pscredential]::new('nour', $sec)
$cred | Export-Clixml -Path "$HOME\lab\power\cred.xml"
Get-Content "$HOME\lab\power\cred.xml"     # <SS N="Password">01000000d08c9ddf...</SS>
$back = Import-Clixml -Path "$HOME\lab\power\cred.xml"
$back.UserName                              # nour
$back.GetNetworkCredential().Password.Length # 8

if (-not $env:DEPLOY_TOKEN) { throw 'DEPLOY_TOKEN مش متظبط' }   # بيقع
$env:DEPLOY_TOKEN = 'demo'
if (-not $env:DEPLOY_TOKEN) { throw 'DEPLOY_TOKEN مش متظبط' }   # بيعدّي`
        },

        {
          cmd: "ForEach-Object -Parallel",
          title: "شغل كتير بيستنى؟ خليه يستنى مع بعض",
          learn: R`تقيس الفرق بين التشغيل ورا بعض والتشغيل بالتوازي، وتستخدم [[$using:]] و [[-ThrottleLimit]]، وتعرف إن الترتيب مش مضمون، وتعمل نفس الحاجة في 5.1 بـ [[Start-Job]].`,
          out: R`فحص ١٠ بورتات في ثانية بدل ٨ ثواني، ومعرفة إمتى التوازي بيبطّأ بدل ما يسرّع.`,
          use: {
            net: R`فحص بورتات أو سيرفرات أو مواقع كتير: كل فحص بيقعد يستنى رد، فالتوازي بيخلي كلهم يستنوا في نفس الوقت.`,
            prog: R`تنزيل ملفات كتير، أو نداء API لكل عنصر في قايمة، أو ضغط فولدرات: أي لوب كل لفة فيها انتظار.`,
            cs: R`الفرق بين I/O-bound (بيستنى) و CPU-bound (بيحسب). التوازي بيكسب كتير في الأولاني، وفي التاني محدود بعدد الـ cores. وكل runspace ليه تكلفة بدء، فالشغل الصغير بيبطأ.`,
          },
          desc: R`[[ForEach-Object -Parallel]] (في PowerShell 7 بس) بيشغّل الـ scriptblock على كل عنصر في نفس الوقت بدل ما يستنى كل واحد يخلص. ٥ عناصر كل واحد بيستنى ثانية: ورا بعض ٥ ثواني، وبالتوازي ثانية.

كل لفة بتشتغل في **runspace** لوحده (جلسة PowerShell صغيرة جوه نفس البروسيس)، فمبتشوفش المتغيرات اللي برا. عشان تقرا متغير من برا اكتبه [[$using:اسمه]]، وده نسخة للقراية بس.

[[-ThrottleLimit]] أقصى عدد بيشتغل في نفس الوقت، والافتراضي **٥**. ١٠ عناصر بالافتراضي = دفعتين.

**الترتيب مش مضمون:** اللي يخلص الأول يطلع الأول. لو الترتيب مهم، رتّب بعدها بـ [[Sort-Object]].

في Windows PowerShell 5.1 مفيش [[-Parallel]] خالص، والرسالة مش واضحة: «Parameter set cannot be resolved». البديل [[Start-Job]] (بروسيس لكل مهمة، أبطأ في البداية)، و [[Start-ThreadJob]] موجود في 7 بس ومحتاج موديول [[ThreadJob]] في 5.1.

ومش كل لوب يستاهل: التوازي بيكسب لما كل لفة **بتستنى** (شبكة، ديسك، sleep). لفة صغيرة بتحسب بس بتبقى أبطأ بالتوازي، لأن عمل runspace بياخد وقت أكتر من الشغل نفسه.`,
          example: R`(Measure-Command { 1..5 | ForEach-Object { Start-Sleep -Seconds 1 } }).TotalSeconds
(Measure-Command { 1..5 | ForEach-Object -Parallel { Start-Sleep -Seconds 1 } }).TotalSeconds
$timeout = 1000
$ports = 135, 445, 3000, 5432, 8080, 9001, 9002, 9003, 9004, 9005
$result = $ports | ForEach-Object -Parallel {
    $port = $_
    $c = [Net.Sockets.TcpClient]::new()
    try     { $ok = $c.ConnectAsync('127.0.0.1', $port).Wait($using:timeout) }
    catch   { $ok = $false }
    finally { $c.Dispose() }
    [pscustomobject]@{ Port = $port; Open = $ok }
} -ThrottleLimit 10
$result | Sort-Object Port | Where-Object Open`,
          lines: [
            R`القياس الأول، ورا بعض: [[1..5]] بيعمل الأرقام من ١ لـ ٥، و [[ForEach-Object]] بيشغّل [[Start-Sleep -Seconds 1]] لكل رقم واحد بعد التاني. [[Measure-Command { }]] بيقيس الوقت اللي الـ block أخده، و [[.TotalSeconds]] بيطلّعه رقم ثواني. طلع [[5.04]].`,
            R`نفس الشغل بس بـ [[-Parallel]]: الخمس sleeps بيبدأوا مع بعض في ٥ runspaces (والافتراضي ٥ بالظبط). طلع [[1.09]]: ثانية الانتظار نفسها وحوالي ١٠٠ مللي ثانية تكلفة عمل الـ runspaces.`,
            R`[[$timeout]] أقصى وقت (بالمللي ثانية) نستنى فيه أي بورت يرد. متعرّف **برا** الـ [[-Parallel]]، فجوه هنقراه بـ [[$using:timeout]]. ثانية كفاية على [[127.0.0.1]]، وعلى سيرفر بعيد ممكن تحتاج أكتر.`,
            R`[[$ports]] قايمة البورتات اللي هنفحصها على جهازك: [[135]] و [[445]] بتوع ويندوز نفسه (غالبًا فاتحين)، و [[3000]] و [[5432]] و [[8080]] بتوع مشاريع تطوير (Node و PostgreSQL)، والباقي غالبًا مقفول. الفاصلة بتعمل array.`,
            R`[[$ports]] بيدخل الـ pipeline، و [[ForEach-Object -Parallel { ... }]] بيشغّل الـ block لكل بورت في runspace لوحده. كل اللي الـ block بيطلّعه بيتجمّع في [[$result]] (بترتيب الخلصان، مش ترتيب القايمة).`,
            R`[[$_]] العنصر الحالي (البورت). بنحفظه في [[$port]] **الأول**، لأن جوه [[catch]] [[$_]] بيتغيّر ويبقى الـ error نفسه. من غير السطر ده، لو حصل exception كان [[Port]] هيطلع رسالة الـ error بدل الرقم.`,
            R`[[[Net.Sockets.TcpClient]::new()]] بيعمل عميل TCP فاضي من .NET، لسه مااتصلش بحاجة. ده أسرع وأخف من [[Test-NetConnection]] اللي بيعمل ping وحاجات تانية قبل البورت.`,
            R`[[ConnectAsync('127.0.0.1', $port)]] بيبدأ محاولة اتصال من غير ما يوقّف، و [[.Wait($using:timeout)]] بيستنى لحد ثانية ويرجّع [[True]] لو اتصل أو [[False]] لو الوقت خلص. [[$using:timeout]] بيقرا المتغير من برا. وعلى ويندوز البورت المقفول حتى على localhost بيترفض بعد حوالي ثانيتين (قستها: [[2.04]] ثانية) لأن ويندوز بيعيد المحاولة، فالـ [[Wait]] بياخد الثانية كلها: ده اللي بيخلي الفحص ورا بعض بطيء.`,
            R`[[catch]] بيمسك أي exception (زي إن الاتصال اترفض بسرعة وطلع AggregateException) ويحط [[$ok = $false]]، فالبورت يتحسب مقفول بدل ما اللفة دي تقع وتطبع error أحمر.`,
            R`[[finally]] بيتنفّذ دايمًا، نجح أو فشل. [[$c.Dispose()]] بيقفل الـ socket ويرجّع موارده للنظام. من غيره، فحص آلاف البورتات بيسيب sockets مفتوحة لحد ما الـ garbage collector يلحقها.`,
            R`كل لفة بتطلّع object فيه [[Port]] و [[Open]]، مش نص. كده تقدر تفلتر وترتّب وتصدّر النتيجة بعدين بـ [[Where-Object]] و [[Sort-Object]] و [[Export-Csv]] زي أي أمر PowerShell.`,
            R`[[}]] بيقفل الـ block، و [[-ThrottleLimit 10]] بيخلي العشرة يشتغلوا مع بعض بدل دفعتين بالافتراضي (٥). طلع الكل في [[1.1]] ثانية، وورا بعض نفس الفحص أخد [[8.1]] ثانية.`,
            R`[[Sort-Object Port]] بيرجّع الترتيب بالرقم (لأن التوازي لخبطه: طلع [[135 445 5432 3000 9001 8080...]])، و [[Where-Object Open]] بيسيب اللي [[Open]] بتاعه True بس. على الجهاز ده طلع [[135]] و [[445]].`,
          ],
          try: R`شغّل السطرين الأولانيين وقارن الرقمين. بعدها شيل [[-ThrottleLimit 10]] من فحص البورتات وقيس بـ [[Measure-Command]]: المفروض يطلع حوالي ٢ ثانية (دفعتين). وافتح سيرفر صغير على بورت منهم (زي [[python -m http.server 8080]] في نافذة تانية) وشوفه بقى [[Open]].`,
          practice: [
            { lvl: 'سريع', t: R`قيس [[1..10 | ForEach-Object -Parallel { Start-Sleep 1 }]] بـ [[Measure-Command]]، وبعدين نفس الحاجة من غير [[-Parallel]].`, done: R`الأول حوالي ثانيتين (الحد الافتراضي ٥ في نفس الوقت)، والتاني حوالي ١٠ ثواني.` },
            { lvl: 'تطبيق', t: R`افحص ١٠ بورتات على [[127.0.0.1]] بالتوازي، وطلّع جدول متترتب بالبورت.`, done: R`الجدول متترتب مهما كان مين خلص الأول، وكل سطر فيه البورت ومفتوح ولا لأ.` },
            { lvl: 'تحدي', t: R`اعدّ الملفات في ٥ فولدرات بالتوازي من غير ما تكتب في متغير مشترك: كل فولدر يرجّع عدده، والجمع يحصل بره.`, done: R`المجموع بيساوي [[(Get-ChildItem -Recurse -File).Count]] العادي بالظبط، في كل مرة تشغّله.` },
          ],
          deep: {
            why: R`أغلب السكربتات اللي «بطيئة» مش بتحسب: بتستنى. فحص ٥٠ سيرفر كل واحد ثانية = دقيقة إلا عشرة، وبالتوازي ٥ ثواني. ومن غير [[-Parallel]] كنت محتاج [[Start-Job]] وتجمّع النتايج بإيدك، أو تكتب C#.`,
            how: R`[[-Parallel]] بيعمل pool من الـ runspaces (كل واحد جلسة PowerShell بالمتغيرات بتاعتها) جوه نفس البروسيس، وبيوزّع العناصر عليهم بحد أقصى [[-ThrottleLimit]]. كل runspace بيبدأ نضيف: مفيش متغيرات ولا دوال من الجلسة الأصلية، عشان كده [[$using:]] بيعمل **نسخة** من القيمة وقت البداية. ومينفعش تكتب فيها: [[$using:count++]] بيدّي ParserError «The '++' operator works only on variables or on properties».

لو محتاج كل اللفات تكتب في حاجة واحدة، استخدم collection آمنة للـ threads: [[$bag = New-Object 'System.Collections.Concurrent.ConcurrentBag[int]']] وجوه الـ block [[($using:bag).Add($_)]]. جرّبتها بـ ٥ عناصر وطلع العدد ٥. لأن [[$using:]] بينسخ **الإشارة** للـ object مش الـ object نفسه، فكلهم بيكتبوا في نفس الـ bag.

[[Start-Job]] بيعمل **بروسيس** PowerShell جديد لكل مهمة، فالبداية أتقل بكتير: ٥ مهام sleep ثانية أخدوا [[2.1]] ثانية في 5.1 و [[2.6]] في 7. و [[Start-ThreadJob]] (موديول [[Microsoft.PowerShell.ThreadJob]] 2.2.0 جاي مع 7.6) بيستخدم threads زي [[-Parallel]]: نفس الخمسة أخدوا [[1.2]] ثانية.`,
            when: R`لما كل عنصر بيستنى حاجة برا البروسيس: شبكة، أو API، أو ديسك بطيء، أو برنامج خارجي. ومتستخدمهوش لحسابات صغيرة: [[1..100]] ضرب ٢ أخد [[0.031]] ثانية ورا بعض و [[0.729]] ثانية بالتوازي (أبطأ ٢٣ مرة). ولا لما كل اللفات بتكتب في نفس الملف (هتتلخبط السطور)، ولا لما السيرفر اللي بتكلمه عنده rate limit.`,
            mistakes: R`تستخدم متغير من برا من غير [[$using:]] فيطلع فاضي من غير أي error (جرّبت [[$prefix]] والأقواس طلعت فاضية بدل ما يبقى فيها [[item]]). أو تعتمد على ترتيب النتايج. أو تحط [[-ErrorAction]] على [[ForEach-Object -Parallel]]: في 7.6 بيرفض «The following common parameters are not currently supported in the Parallel parameter set: ErrorAction, WarningAction, InformationAction, PipelineVariable». أو تنادي دالة متعرّفة برا جوه الـ block (مش موجودة هناك). أو تشغّله في 5.1 وتستغرب الرسالة.`
          },
          teach: R`## الفكرة: الانتظار بيتعمل مع بعض

لو كل لفة في اللوب بتستنى ثانية (رد من سيرفر، أو sleep)، اللوب العادية بتستنى ثانية **ورا** ثانية. [[-Parallel]] بيخلي كل الانتظار يحصل في نفس الوقت. كل اللي تحت اتشغّل فعلًا في PowerShell 7.6 على ويندوز ١١، والجزء بتاع 5.1 اتشغّل في Windows PowerShell 5.1.

---

## ١. قيس بنفسك

~~~powershell
(Measure-Command { 1..5 | ForEach-Object { Start-Sleep -Seconds 1 } }).TotalSeconds
(Measure-Command { 1..5 | ForEach-Object -Parallel { Start-Sleep -Seconds 1 } }).TotalSeconds
~~~

| الحتة | معناها |
|---|---|
| [[1..5]] | الأرقام ١ و ٢ و ٣ و ٤ و ٥، والـ [[..]] اسمه range operator |
| [[Start-Sleep -Seconds 1]] | يستنى ثانية ومبيعملش حاجة، فده «شغل بيستنى» نضيف للتجربة |
| [[Measure-Command { }]] | بيشغّل الـ block ويرجّع الوقت كـ TimeSpan، ومبيطبعش ناتج الـ block |
| [[( ... ).TotalSeconds]] | القوسين بيخلّصوا القياس الأول، وبعدها بناخد الثواني كرقم عشري |

~~~text اتشغّل فعلًا · PowerShell 7.6
5.0367899
1.0940079
~~~

الـ [[0.09]] الزيادة في التاني هي تكلفة عمل ٥ runspaces. ودي بتفرق في الشغل الصغير (تحت).

---

## ٢. [[-ThrottleLimit]]: كام واحد مع بعض

~~~powershell
(Measure-Command { 1..10 | ForEach-Object -Parallel { Start-Sleep 1 } }).TotalSeconds
(Measure-Command { 1..10 | ForEach-Object -Parallel { Start-Sleep 1 } -ThrottleLimit 10 }).TotalSeconds
~~~

~~~text اتشغّل فعلًا · PowerShell 7.6
2.1
1.2
~~~

الافتراضي **٥** في نفس الوقت، فعشرة = دفعتين = ثانيتين. و [[-ThrottleLimit 10]] بيشغّلهم كلهم مرة واحدة. متكبّرهاش أوي على سيرفر حد تاني: ٢٠٠ طلب مع بعض ممكن يتحسبوا هجوم أو ياخدوا rate limit.

---

## ٣. الترتيب مش مضمون

~~~powershell
(1..8 | ForEach-Object -Parallel { Start-Sleep -Milliseconds (Get-Random -Max 300); $_ }) -join ' '
~~~

~~~text اتشغّل فعلًا · PowerShell 7.6
4 2 6 1 3 5 7 8
~~~

كل عنصر استنى وقت عشوائي ([[Get-Random -Max 300]] رقم من ٠ لـ ٢٩٩ مللي ثانية)، واللي خلص الأول طلع الأول. لو الترتيب مهم: رتّب بعدها بـ [[Sort-Object]]، أو خلي كل لفة ترجّع object فيه الرقم الأصلي.

---

## ٤. [[$using:]]: الـ runspace مبيشوفش متغيراتك

~~~powershell
$prefix = 'item'
1..2 | ForEach-Object -Parallel { "[$prefix] $_" }
1..2 | ForEach-Object -Parallel { "[$using:prefix] $_" }
~~~

~~~text اتشغّل فعلًا · PowerShell 7.6
[] 1
[] 2
[item] 1
[item] 2
~~~

من غير [[$using:]] المتغير **فاضي من غير أي error**، وده أخطر من إنه يقع. وده نسخة للقراية بس:

~~~powershell
$count = 0
1..3 | ForEach-Object -Parallel { $using:count++ }
~~~

~~~text اتشغّل فعلًا · PowerShell 7.6 (من ملف using2.ps1)
ParserError: C:\Users\you\lab\power\using2.ps1:2
Line |
   2 |  1..3 | ForEach-Object -Parallel { $using:count++ }
     |                                    ~~~~~~~~~~~~
     | The '++' operator works only on variables or on properties.
~~~

ولو كتبت [[$count++]] من غير [[$using:]]، بيزوّد نسخة جوه الـ runspace وبرا [[$count]] بيفضل [[0]] (جرّبتها). الحل: خلي كل لفة **ترجّع** قيمة، واجمعهم برا ([[$result = ... -Parallel { ... }]] ثم [[($result | Measure-Object -Sum).Sum]]).

---

## ٥. مثال حقيقي: مين من البورتات دي فاتح

ده المثال اللي فوق. فكّه:

~~~powershell
$c = [Net.Sockets.TcpClient]::new()
try     { $ok = $c.ConnectAsync('127.0.0.1', $port).Wait($using:timeout) }
catch   { $ok = $false }
finally { $c.Dispose() }
~~~

- [[TcpClient]] عميل TCP من .NET. [[ConnectAsync]] بيبدأ الاتصال وبيرجّع Task (حاجة هتخلص بعدين).
- [[.Wait(1000)]] بيستنى الـ Task لحد ١٠٠٠ مللي ثانية: [[True]] لو اتصل، [[False]] لو الوقت خلص.
- [[try/catch/finally]]: أي exception = مقفول، و [[Dispose()]] بيتنفّذ في كل الأحوال.

~~~text اتشغّل فعلًا · PowerShell 7.6 · الترتيب زي ما طلع
135 445 5432 3000 9001 8080 9002 9003 9005 9004
~~~

~~~text اتشغّل فعلًا · بعد Sort-Object و Where-Object
Port Open
---- ----
 135 True
 445 True
~~~

| نفس الفحص | الوقت |
|---|---|
| [[foreach]] عادي، بورت ورا بورت | [[8.1]] ثانية (٨ مقفولين × ثانية) |
| [[-Parallel -ThrottleLimit 10]] | [[1.1]] ثانية |

**ليه البورت المقفول بياخد الثانية كلها؟** على ويندوز الـ TCP بيعيد المحاولة كذا مرة قبل ما يقول «مرفوض»، حتى على [[127.0.0.1]]. قسته من غير timeout:

~~~text اتشغّل فعلًا · ConnectAsync لبورت مقفول و Wait(10000)
ERR: One or more errors occurred. (No connection could be made because the target machine actively refused it.)
2.04s
~~~

يعني الرفض بييجي بعد حوالي ثانيتين، والـ [[Wait(1000)]] بيخلص قبله فبيرجّع [[False]]. ده بالظبط الشغل اللي بيستنى، واللي التوازي بيكسب فيه.

> بورتاتك هتطلع غير دي. شغّل [[python -m http.server 8080]] في نافذة تانية وشغّل الفحص تاني: [[8080]] هيبقى [[True]].

---

## ٦. إمتى التوازي بيبطّأ

~~~powershell
(Measure-Command { 1..100 | ForEach-Object { $_ * 2 } }).TotalSeconds
(Measure-Command { 1..100 | ForEach-Object -Parallel { $_ * 2 } }).TotalSeconds
~~~

~~~text اتشغّل فعلًا · PowerShell 7.6
0.031
0.729
~~~

الضرب نفسه بياخد أجزاء من المللي ثانية، وعمل runspace لكل عنصر بياخد أكتر منه بكتير. **القاعدة:** التوازي للفات اللي بتستنى (مللي ثواني لثواني)، مش للفات اللي بتحسب حاجة صغيرة.

---

## ٧. Windows PowerShell 5.1: مفيش [[-Parallel]]

~~~powershell
1..3 | ForEach-Object -Parallel { $_ }
~~~

~~~text اتشغّل فعلًا · Windows PowerShell 5.1
ForEach-Object : Parameter set cannot be resolved using the specified named parameters.
    + FullyQualifiedErrorId : AmbiguousParameterSet,Microsoft.PowerShell.Commands.ForEachObjectCommand
~~~

> **مفاجأة:** الرسالة مش «parameter مش موجود» زي ما تتوقع. [[ForEach-Object]] في 5.1 عنده parameter اسمه [[RemainingScripts]] بيلم أي حاجة زيادة، فأي اسم غلط بيطلّع نفس الرسالة دي (جرّبت [[-Banana]] وطلعت هي هي). لو شفتها في 5.1، غالبًا انت كاتب حاجة من 7.

[[Start-ThreadJob]] كمان مش موجود في 5.1 ([[Get-Command Start-ThreadJob]] مالقاهوش)، ومحتاج موديول [[ThreadJob]] من PSGallery. البديل الموجود دايمًا [[Start-Job]]:

~~~powershell
$jobs = 1..5 | ForEach-Object {
    Start-Job -ScriptBlock { param($n) Start-Sleep -Seconds 1; "done $n" } -ArgumentList $_
}
$jobs | Wait-Job | Receive-Job
$jobs | Remove-Job
~~~

| السطر | بيعمل إيه |
|---|---|
| [[Start-Job -ScriptBlock { param($n) ... }]] | بيشغّل الـ block في بروسيس PowerShell جديد في الخلفية ويرجّع object للـ job على طول |
| [[-ArgumentList $_]] | بيبعت الرقم للـ [[param($n)]] جوه. وفي 5.1 [[$using:]] شغال مع [[Start-Job]] كمان |
| [[Wait-Job]] | بيستنى كل الـ jobs تخلص |
| [[Receive-Job]] | بيجيب اللي كل job طبعه |
| [[Remove-Job]] | بيمسح الـ jobs من الجلسة؛ من غيره بيفضلوا في [[Get-Job]] |

~~~text اتشغّل فعلًا
done 1, done 2, done 3, done 4, done 5
Start-Job x5: 2.1s (5.1)   2.6s (7.6)
Start-ThreadJob x5: 1.2s (7.6 بس)
~~~

[[Start-Job]] أبطأ لأن كل job بروسيس كامل بيتعمل (درس «Start-Job» شارحه بالتفصيل). لعشرات المهام كويس، لمئات خليك في 7 و [[-Parallel]].

---

## الخلاصة

| الأداة | فين | بتشتغل إزاي | تكلفة البداية |
|---|---|---|---|
| [[ForEach-Object -Parallel]] | 7 بس | runspaces في نفس البروسيس | قليلة |
| [[Start-ThreadJob]] | 7 (و 5.1 بموديول) | threads | قليلة |
| [[Start-Job]] | 5.1 و 7 | بروسيس لكل مهمة | عالية |

- المتغيرات من برا = [[$using:]]، ونسخة للقراية بس.
- الافتراضي ٥ مع بعض، وغيّره بـ [[-ThrottleLimit]].
- الترتيب مش مضمون: [[Sort-Object]] بعدها.
- للشغل اللي بيستنى بس. الحسابات الصغيرة بتبطأ.`,
          sol: R`اتشغّل فعلًا في PowerShell 7.6: الخمس sleeps [[5.04]] ثانية ورا بعض و [[1.09]] بالتوازي، والعشرة بالافتراضي [[2.1]] وبـ [[-ThrottleLimit 10]] [[1.2]]، وفحص البورتات [[8.1]] ورا بعض و [[1.1]] بالتوازي (طلع [[135]] و [[445]] فاتحين)، و [[$using:]] والـ ParserError، وتكلفة الشغل الصغير. وفي 5.1: رسالة [[-Parallel]] و [[Start-Job]]. أرقامك هتختلف شوية، وبورتاتك المفتوحة كمان.`,
          solCode: R`(Measure-Command { 1..5 | ForEach-Object { Start-Sleep -Seconds 1 } }).TotalSeconds            # 5.0367899
(Measure-Command { 1..5 | ForEach-Object -Parallel { Start-Sleep -Seconds 1 } }).TotalSeconds   # 1.0940079

# بعد ما تشيل -ThrottleLimit 10 من فحص البورتات:
# حوالي 2.1 ثانية: عشرة بورتات على دفعتين من خمسة`
        },

        {
          cmd: "Compare-Object",
          title: "إيه اللي اختلف بين القايمتين؟",
          learn: R`تقارن قايمتين وتقرا [[SideIndicator]] ([[<=]] و [[=>]] و [[==]])، وتقارن objects بـ [[-Property]]، وتاخد الـ objects الأصلية بـ [[-PassThru]]، وتطلّع الملفات الناقصة من باك أب.`,
          out: R`أمر واحد يقولك الباك أب ناقص إيه، أو ملف الإعدادات اتغيّر فيه إيه، أو التسطيب الأخير زوّد إيه.`,
          use: {
            work: R`«الباك أب كامل؟» و«مين غيّر الـ config؟» و«البرنامج ده سطّب إيه؟» أسئلة بتتسأل كل أسبوع، وإجابتها مقارنة قايمتين.`,
            net: R`قارن البورتات المفتوحة أو الخدمات الشغالة أو قواعد الفايروول النهارده بلقطة امبارح، فأي حاجة جديدة تبان على طول.`,
            prog: R`قارن أسامي الملفات بين فولدرين، أو الـ dependencies بين نسختين من المشروع، أو متغيرات البيئة قبل وبعد سكربت.`,
          },
          desc: R`[[Compare-Object]] بياخد قايمتين، **الأصل** (Reference) و**التانية** (Difference)، ويطلّع العناصر اللي موجودة في واحدة بس. جنب كل عنصر [[SideIndicator]]: [[<=]] يعني موجود في الأصل بس (ناقص من التانية)، و [[=>]] يعني موجود في التانية بس (زيادة)، و [[==]] موجود في الاتنين (بيظهر بس مع [[-IncludeEqual]]).

أول قايمة بتتكتب الأول: [[Compare-Object $src.Name $bak.Name]]. افتكر السهم كده: بيشاور على الناحية اللي العنصر موجود فيها.

لما تقارن objects (ملفات أو خدمات)، قول بتقارن على إيه: [[-Property Name, Length]] بيقارن الاسم والحجم مع بعض، فملف بنفس الاسم وحجم مختلف بيطلع فرق. ومن غير [[-Property]] PowerShell بيقارن النص بتاع الـ object، وده في 7 **المسار الكامل** (فكل ملفات فولدرين مختلفين بتطلع مختلفة) وفي 5.1 الاسم بس. فاكتب [[-Property]] دايمًا مع الـ objects.

[[-PassThru]] بيرجّعلك الـ objects **الأصلية** (FileInfo بكل خصايصها زي [[FullName]]) ومتعلّق عليها [[SideIndicator]]، بدل جدول فيه الخصايص اللي قارنت عليها بس.

والمقارنة **مش حساسة لحالة الحروف** ([[A.jpg]] زي [[a.jpg]]) إلا بـ [[-CaseSensitive]]، ومبتهتمش بالترتيب. و [[$null]] كقايمة بيدّي error، فلو القايمة ممكن تبقى فاضية لفّها في [[@()]].`,
          example: R`$src = Get-ChildItem .\photos -File
$bak = Get-ChildItem .\backup -File
Compare-Object $src.Name $bak.Name
Compare-Object $src.Name $bak.Name -IncludeEqual
Compare-Object $src $bak -Property Name, Length
Compare-Object $src $bak -Property Name -PassThru | Where-Object SideIndicator -eq '<=' | Select-Object Name, FullName
Compare-Object (Get-Content .\before.env) (Get-Content .\after.env)`,
          lines: [
            R`[[Get-ChildItem .\photos -File]] بيجيب الملفات اللي في فولدر الأصل كـ objects من نوع FileInfo (فيها الاسم والحجم والمسار والتاريخ)، و [[-File]] بيسيب الفولدرات اللي جواه برا المقارنة. [[$src]] = الأصل (source).`,
            R`نفس الكلام لفولدر الباك أب في [[$bak]]. في الـ lab فيه [[c.jpg]] ناقص منه، و [[old.jpg]] زيادة، و [[d.jpg]] موجود بس محتواه اتغيّر.`,
            R`[[$src.Name]] بيطلّع أسامي الملفات بس كقايمة نصوص (member enumeration)، وكده بنقارن نصوص بنصوص. الأصل الأول وبعده التاني. طلع [[old.jpg =>]] (في الباك أب بس) و [[c.jpg <=]] (في الأصل بس، يعني ناقص من الباك أب).`,
            R`[[-IncludeEqual]] بيطلّع كمان العناصر اللي في الاتنين بـ [[==]]: [[a.jpg]] و [[b.jpg]] و [[d.jpg]]. مفيد لما عايز صورة كاملة أو تعد المتطابق. لاحظ إن [[d.jpg]] طلع [[==]] رغم إن محتواه مختلف، لأننا بنقارن الأسامي بس.`,
            R`المقارنة على الـ objects نفسها بس على خاصيتين مع بعض: [[-Property Name, Length]] معناها الملف «نفسه» لو الاسم **والحجم** زي بعض. فـ [[d.jpg]] طلع مرتين: [[16 =>]] في الباك أب و [[7 <=]] في الأصل، يعني اتغيّر. والجدول بيطلع فيه الخاصيتين دول بس.`,
            R`[[-PassThru]] بيرجّع الـ FileInfo الأصلي ومعاه [[SideIndicator]]، و [[Where-Object SideIndicator -eq '<=']] بيسيب اللي في الأصل بس (اللي ناقص من الباك أب)، و [[Select-Object Name, FullName]] بيعرض الاسم والمسار الكامل. طلع [[c.jpg]] بمساره، فتقدر تبعته لـ [[Copy-Item]] على طول.`,
            R`[[Get-Content]] بيقرا كل ملف كقايمة سطور، والقوسين [[( )]] بيخلّوا كل قراية تخلص وتتبعت كقايمة. طلع [[PORT=8080 =>]] و [[CACHE=on =>]] (جديد أو اتغيّر) و [[PORT=3000 <=]] (القيمة القديمة). السطر اللي اتغيّر قيمته بيطلع مرتين: القديم بـ [[<=]] والجديد بـ [[=>]].`,
          ],
          try: R`اعمل الـ lab وشغّل السطور واحد واحد. بعدها اعرف الملفات اللي **محتواها** اتغيّر حتى لو حجمها زي بعض: قارن [[Get-FileHash]] بتاع الفولدرين بـ [[-Property Hash]]. وجرّب [[Compare-Object $src $bak]] من غير [[-Property]] في 7 وفي 5.1 وشوف الفرق.`,
          practice: [
            { lvl: 'سريع', t: R`قارن قايمتين أسامي كاتبهم بإيدك، مرة عادي ومرة بـ [[-IncludeEqual]].`, done: R`تقدر تقول كل سهم معناه إيه، و [[==]] بيظهر للأسامي اللي في الاتنين بس مع [[-IncludeEqual]].` },
            { lvl: 'تطبيق', t: R`قارن فولدرين بـ [[-Property Name, Length]].`, done: R`الملف اللي اتغيّر حجمه بيظهر مرتين ([[<=]] و [[=>]])، والملف الناقص بيظهر مرة واحدة.` },
            { lvl: 'تحدي', t: R`قارن ملفين config سطر سطر، وطلّع السطور اللي اتغيّرت بس ومعاها رقم السطر.`, done: R`لو غيّرت سطرين بيطلعوا هما الاتنين برقمهم، ولو الملفين زي بعض مفيش ناتج والكود ٠.` },
          ],
          deep: {
            why: R`العين مبتلاقيش الملف الناقص في فولدر فيه ٣٠٠٠ صورة، ولا السطر اللي اتغيّر في config من ٢٠٠ سطر. [[Compare-Object]] بيطلّع الفرق بس، والفرق بيبقى object تقدر تعمل بيه حاجة: تنسخ الناقص، أو تبعت إيميل، أو تخرج بكود خطأ لو فيه فرق.`,
            how: R`[[Compare-Object -ReferenceObject $a -DifferenceObject $b]] (الاسمين دول هم الـ parameters اللي بيتملوا بالترتيب). لكل عنصر بيشوف هل فيه عنصر «يساويه» في القايمة التانية. «يساويه» يعني: لو فيه [[-Property]] كل الخصايص دي متساوية، ولو مفيش يبقى القيمة نفسها لو نص أو رقم، أو ناتج [[ToString()]] لو object.

وده سبب الفرق بين 7 و 5.1 في الملفات: [[FileInfo.ToString()]] في .NET الجديد (اللي تحت 7) بيرجّع المسار الكامل، وفي .NET Framework (تحت 5.1) بيرجّع الاسم. فـ [[Compare-Object $src $bak]] في 7 طلّع **التمن ملفات** كلهم مختلفين، وفي 5.1 طلّع [[old.jpg]] و [[c.jpg]] بس (وفوّت [[d.jpg]] اللي اتغيّر).

المقارنة بتستخدم [[-eq]] بتاع PowerShell، فهي مش حساسة للحروف الكبيرة والصغيرة. والنتيجة مش بترتيب الملف: الـ [[=>]] بتطلع الأول وبعدها [[<=]]. وعشان تعرف المحتوى اتغيّر حتى لو الحجم زي بعض: [[Get-FileHash]] لكل فولدر وقارن بـ [[-Property Hash]].`,
            when: R`باك أب: الأصل والنسخة بـ [[-Property Name]] وبعدها بـ [[Hash]]. Config: [[Get-Content]] للملفين. قبل وبعد تسطيب أو سكربت: خد لقطة ([[Get-Service]] أو البرامج المتسطّبة أو [[$env:Path -split ';']]) واحفظها بـ [[Export-Csv]]، وقارن بعدين. ولما الملفات نصوص طويلة ومحتاج رقم السطر، [[git diff --no-index]] أوضح.`,
            mistakes: R`تقارن objects من غير [[-Property]] (في 7 كل حاجة بتطلع مختلفة). أو تعكس الترتيب فتقرا [[<=]] و [[=>]] بالعكس. أو تبعت [[$null]] فيقع بـ «Cannot bind argument to parameter 'ReferenceObject' because it is null». أو تقارن لقطة من CSV بلقطة live: CSV بيحوّل [[$null]] لنص فاضي، و [[Compare-Object]] بيعتبرهم مختلفين، فبيطلع فروق مش موجودة.`
          },
          teach: R`## الفكرة: قايمتين، والفرق بس

[[Compare-Object]] بياخد الأصل والتانية، ويقولك لكل عنصر هو في أنهي ناحية. كل اللي تحت اتشغّل في PowerShell 7.6 و 5.1 على ملفات الـ lab:

~~~text الـ lab
photos\   a.jpg  b.jpg  c.jpg  d.jpg
backup\   a.jpg  b.jpg         d.jpg (اتغيّر)  old.jpg
~~~

---

## ١. قارن أسامي: [[SideIndicator]]

~~~powershell
$src = Get-ChildItem .\photos -File
$bak = Get-ChildItem .\backup -File
Compare-Object $src.Name $bak.Name
~~~

~~~text اتشغّل فعلًا · 7.6 و 5.1
InputObject SideIndicator
----------- -------------
old.jpg     =>
c.jpg       <=
~~~

| العلامة | معناها | في المثال |
|---|---|---|
| [[<=]] | في الأصل (الأولى) بس | [[c.jpg]] ناقص من الباك أب |
| [[=>]] | في التانية بس | [[old.jpg]] زيادة في الباك أب |
| [[==]] | في الاتنين، بيظهر مع [[-IncludeEqual]] بس | [[a.jpg]] و [[b.jpg]] و [[d.jpg]] |

**افتكرها كده:** السهم بيشاور على الناحية اللي العنصر **موجود** فيها. الأصل شمال، والتانية يمين.

و [[InputObject]] هو العنصر نفسه. اسم العمود ده ثابت لما بتقارن قيم من غير [[-Property]].

~~~powershell
Compare-Object $src.Name $bak.Name -IncludeEqual
~~~

~~~text اتشغّل فعلًا · 7.6 و 5.1
InputObject SideIndicator
----------- -------------
a.jpg       ==
b.jpg       ==
d.jpg       ==
old.jpg     =>
c.jpg       <=
~~~

[[d.jpg]] طلع [[==]] رغم إن محتواه اتغيّر: إحنا بنقارن **أسامي**. الخطوة الجاية بتحل ده.

---

## ٢. قارن objects: [[-Property]]

~~~powershell
Compare-Object $src $bak -Property Name, Length
~~~

~~~text اتشغّل فعلًا · 7.6 و 5.1
Name    Length SideIndicator
----    ------ -------------
d.jpg       16 =>
old.jpg      9 =>
c.jpg        7 <=
d.jpg        7 <=
~~~

دلوقتي «نفس الملف» = نفس الاسم **ونفس الحجم**. [[d.jpg]] طلع مرتين: ٧ بايت في الأصل و ١٦ في الباك أب. (الـ ٧ = [[d.jpg]] خمس حروف + سطر جديد [[\r\n]] بايتين.)

### من غير [[-Property]]: الفرق بين 7 و 5.1

~~~powershell
Compare-Object $src $bak
~~~

~~~text اتشغّل فعلًا · PowerShell 7.6
InputObject                                  SideIndicator
-----------                                  -------------
C:\Users\you\lab\power\backup\a.jpg          =>
C:\Users\you\lab\power\backup\b.jpg          =>
C:\Users\you\lab\power\backup\d.jpg          =>
C:\Users\you\lab\power\backup\old.jpg        =>
C:\Users\you\lab\power\photos\a.jpg          <=
C:\Users\you\lab\power\photos\b.jpg          <=
C:\Users\you\lab\power\photos\c.jpg          <=
C:\Users\you\lab\power\photos\d.jpg          <=
~~~

~~~text اتشغّل فعلًا · Windows PowerShell 5.1
InputObject SideIndicator
----------- -------------
old.jpg     =>
c.jpg       <=
~~~

> **مفاجأة:** نفس الأمر بنتيجتين. من غير [[-Property]]، PowerShell بيقارن [[ToString()]] بتاع الملف: في 7 ده المسار الكامل (فولدرين مختلفين = كل حاجة مختلفة)، وفي 5.1 الاسم بس (وفوّت [[d.jpg]] اللي اتغيّر). **مع الـ objects اكتب [[-Property]] دايمًا.**

---

## ٣. خد الملفات نفسها: [[-PassThru]]

~~~powershell
Compare-Object $src $bak -Property Name -PassThru |
    Where-Object SideIndicator -eq '<=' |
    Select-Object Name, FullName
~~~

~~~text اتشغّل فعلًا · 7.6 و 5.1
Name  FullName
----  --------
c.jpg C:\Users\you\lab\power\photos\c.jpg
~~~

من غير [[-PassThru]] بيرجعلك object صغير فيه [[Name]] و [[SideIndicator]] بس. ومعاه بيرجّع الـ **FileInfo الأصلي** وزوّد عليه خاصية [[SideIndicator]] (اتأكدت بـ [[Get-Member]]: النوع [[System.IO.FileInfo]] و [[SideIndicator]] جواه NoteProperty). فتقدر تكمّل بيه على طول:

~~~powershell
Compare-Object $src $bak -Property Name -PassThru |
    Where-Object SideIndicator -eq '<=' |
    Copy-Item -Destination .\backup -WhatIf
~~~

~~~text اتشغّل فعلًا · 7.6 و 5.1
What if: Performing the operation "Copy File" on target "Item: C:\Users\you\lab\power\photos\c.jpg Destination: C:\Users\you\lab\power\backup\c.jpg".
~~~

[[-WhatIf]] بيوريك اللي هيتنسخ من غير ما ينسخ. شيله لما تتأكد.

---

## ٤. المحتوى اتغيّر؟ قارن الـ hash

الحجم ممكن يفضل زي ما هو والمحتوى يتغيّر. [[Get-FileHash]] بيدّي بصمة للمحتوى (درس «Get-FileHash»):

~~~powershell
$h1 = $src | Get-FileHash
$h2 = $bak | Get-FileHash
Compare-Object $h1 $h2 -Property Hash -PassThru |
    Select-Object SideIndicator, @{ n = 'Name'; e = { Split-Path $_.Path -Leaf } }
~~~

- [[@{ n = 'Name'; e = { ... } }]] عمود محسوب: [[n]] اسم العمود و [[e]] الـ expression. [[Split-Path -Leaf]] بياخد اسم الملف من المسار.

~~~text اتشغّل فعلًا · 7.6 و 5.1
SideIndicator Name
------------- ----
=>            d.jpg
=>            old.jpg
<=            c.jpg
<=            d.jpg
~~~

اسم موجود في الناحيتين = الملف موجود بس محتواه اتغيّر.

---

## ٥. ملفين config

~~~powershell
Compare-Object (Get-Content .\before.env) (Get-Content .\after.env)
~~~

~~~text اتشغّل فعلًا · 7.6 و 5.1
InputObject SideIndicator
----------- -------------
PORT=8080   =>
CACHE=on    =>
PORT=3000   <=
~~~

كل سطر عنصر. السطر اللي قيمته اتغيّرت بيطلع مرتين (القديم [[<=]] والجديد [[=>]])، والجديد خالص بيطلع [[=>]] بس. والترتيب مش ترتيب الملف، ومفيش أرقام سطور؛ لو محتاجها استخدم [[git diff --no-index before.env after.env]].

---

## ٦. قبل وبعد: لقطة متغير [[PATH]]

~~~powershell
$before = $env:Path -split ';'
$env:Path += ';C:\tools\demo'
Compare-Object $before ($env:Path -split ';')
~~~

~~~text اتشغّل فعلًا · 7.6 و 5.1
InputObject   SideIndicator
-----------   -------------
C:\tools\demo =>
~~~

[[-split ';']] بيقسّم الـ PATH لمسارات. ونفس الفكرة بعد تسطيب برنامج: خد لقطة قبله وبعده وقارن. (التعديل هنا في الجلسة دي بس.)

### فخ: لقطة CSV ولقطة live

جرّبت أحفظ البرامج المتسطّبة في CSV وأقارنها بنفس القايمة live **من غير ما أسطّب حاجة**، وطلع ٦ فروق! السبب: برامج مالهاش [[DisplayVersion]]، والـ live بيرجّع [[$null]] والـ CSV بيرجّع نص فاضي [['']]. وده نفسه:

~~~powershell
Compare-Object @([pscustomobject]@{ v = '' }) @([pscustomobject]@{ v = $null }) -Property v
~~~

~~~text اتشغّل فعلًا · 7.6 و 5.1
v SideIndicator
- -------------
  =>
  <=
~~~

**الحل:** قارن CSV بـ CSV. احفظ اللقطة التانية بـ [[Export-Csv]] كمان واقراها بـ [[Import-Csv]]: نفس القايمتين طلعوا [[0]] فرق.

---

## ٧. حاجات تانية

~~~text اتشغّل فعلًا · 7.6 و 5.1
Compare-Object 'A.jpg' 'a.jpg'                → ولا حاجة (مش حساس للحروف)
Compare-Object 'A.jpg' 'a.jpg' -CaseSensitive → a.jpg =>   A.jpg <=
Compare-Object $null @('x')                   → Cannot bind argument to parameter 'ReferenceObject' because it is null.
Compare-Object @() $bak.Name                  → كل الأسامي بـ =>
~~~

[[Get-ChildItem]] على فولدر فاضي بيرجّع [[$null]]، فلفّه في [[@( )]] عشان يبقى قايمة فاضية بدل [[$null]].

---

## الخلاصة

| عايز | اكتب |
|---|---|
| الناقص من التانية | [[Where-Object SideIndicator -eq '<=']] |
| الزيادة في التانية | [[Where-Object SideIndicator -eq '=>']] |
| المتطابق كمان | [[-IncludeEqual]] (بيطلع [[==]]) |
| objects | [[-Property Name, Length]] دايمًا |
| الـ objects الأصلية | [[-PassThru]] |
| المحتوى اتغيّر | [[Get-FileHash]] و [[-Property Hash]] |

- الأصل الأول، والسهم بيشاور على الناحية اللي العنصر فيها.
- من غير [[-Property]] النتيجة بتختلف بين 7 و 5.1.
- مش حساس للحروف ولا للترتيب، و [[$null]] بيوقّعه.`,
          sol: R`كل ده اتشغّل فعلًا في 7.6 و 5.1 على ملفات الـ lab. الـ hash بيطلّع [[d.jpg]] في الناحيتين (المحتوى اتغيّر) و [[old.jpg]] بـ [[=>]] و [[c.jpg]] بـ [[<=]]. ومن غير [[-Property]]: في 7 التمن ملفات كلهم مختلفين بالمسار الكامل، وفي 5.1 [[old.jpg]] و [[c.jpg]] بس.`,
          solCode: R`$h1 = Get-ChildItem .\photos -File | Get-FileHash
$h2 = Get-ChildItem .\backup -File | Get-FileHash
Compare-Object $h1 $h2 -Property Hash -PassThru |
    Select-Object SideIndicator, @{ n = 'Name'; e = { Split-Path $_.Path -Leaf } }

# SideIndicator Name
# ------------- ----
# =>            d.jpg
# =>            old.jpg
# <=            c.jpg
# <=            d.jpg`
        },

        {
          cmd: "Set-StrictMode",
          title: "غلطة إملا متعدّيش ساكتة",
          learn: R`تشوف إزاي غلطة في اسم متغير بتدّي [[$null]] من غير أي error وبتخلي السكربت يشتغل على الحاجة الغلط، وتقفلها بـ [[Set-StrictMode -Version Latest]] و [[$ErrorActionPreference = 'Stop']].`,
          out: R`أول سطرين تحطهم في أي سكربت، وتعرف كل واحد بيمسك إيه.`,
          use: {
            work: R`سكربت تنضيف فيه [[$logDri]] بدل [[$logDir]]: من غير strict mode بيمسح ملفات الفولدر اللي انت واقف فيه بدل فولدر اللوجات، ومعاه بيقع في نفس السطر.`,
            prog: R`نفس فكرة [[set -u]] في bash و [[strict]] في JavaScript و TypeScript الـ strict: الغلطة تبان وانت بتكتب مش وهي بتبوّظ.`,
            cs: R`Fail fast: البرنامج اللي بيقع أول ما يلاقي حاجة غلط أسهل يتصلّح بكتير من اللي بيكمّل بقيمة غلط وبيبوّظ حاجة بعد ١٠٠ سطر.`,
          },
          desc: R`في PowerShell، متغير مش موجود قيمته [[$null]] **من غير أي error**، و property مش موجودة برضه [[$null]]. فغلطة إملا واحدة ([[$logDri]] بدل [[$logDir]]) بتعدّي ساكتة، والسكربت بيكمّل بـ [[$null]] ويعمل حاجة غلط. [[Set-StrictMode -Version Latest]] بيحوّل الحاجات دي لـ errors.

[[Set-StrictMode -Version]] بياخد رقم، وكل رقم بيمسك أكتر:

• [[1.0]]: متغير مااتعرّفش.
• [[2.0]]: اللي قبله + متغير مش متعرّف جوه نص [["..."]] + property مش موجودة + نداء دالة بأقواس وفواصل [[f(1, 2)]].
• [[3.0]]: اللي قبله + index برا الـ array ([[$arr[10]]]).
• [[Latest]]: أعلى رقم في نسختك (3.0 في 5.1 و 7.6 حسب الـ docs، واتجرّب إنه بيمسك نفس اللي 3.0 بيمسكه).

ومعاه [[$ErrorActionPreference = 'Stop']]: أوامر كتير لما تفشل بتطبع error أحمر **وتكمّل** للسطر اللي بعده (non-terminating). [[Stop]] بيخلي أي error يوقّف السكربت أو يروح للـ [[catch]].

الاتنين بيمسكوا حاجات مختلفة: الأول غلطاتك في الكود، والتاني فشل الأوامر وهي شغالة. فأي سكربت جد بيبدأ بالاتنين.

[[Set-StrictMode]] بيأثر على الـ scope اللي اتكتب فيه واللي جواه بس. في سكربت بيخلص مع السكربت ومبيأثرش على الترمنال بتاعك.`,
          example: R`Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$logDir = Join-Path $PSScriptRoot 'logs'
Get-ChildItem $logDri -Filter *.log | Remove-Item -WhatIf
'done'`,
          lines: [
            R`[[Set-StrictMode]] بيشغّل الوضع الصارم، و [[-Version Latest]] بأعلى مستوى في النسخة اللي شغّالة. من دلوقتي متغير مش متعرّف أو property مش موجودة أو index برا الـ array = error بيوقّف السطر بدل [[$null]] ساكت.`,
            R`[[$ErrorActionPreference]] متغير بيقول لكل الأوامر تعمل إيه لما تفشل، والافتراضي [[Continue]] (اطبع error وكمّل). [[Stop]] بيحوّل أي فشل لـ error بيوقّف السكربت، فميكمّلش على نتيجة ناقصة. الاتنين بيبقوا أول سطرين في أي سكربت.`,
            R`[[Join-Path]] بيركّب مسار فولدر [[logs]] جنب السكربت: [[$PSScriptRoot]] فولدر ملف السكربت نفسه (مش الفولدر اللي انت واقف فيه). النتيجة في [[$logDir]]، بحرف [[r]] في الآخر.`,
            R`**الغلطة:** [[$logDri]] بدل [[$logDir]] (حرفين اتبدّلوا). من غير strict mode ده [[$null]]، و [[Get-ChildItem $null]] بيجيب ملفات **الفولدر اللي انت واقف فيه**، فـ [[Remove-Item]] كان هيمسحها. اتجرّب: طلع What if على [[strict\app.log]] و [[strict\notes.log]] بدل [[logs\old.log]]. ومع strict mode السطر بيقع بـ «The variable '$logDri' cannot be retrieved because it has not been set». و [[-WhatIf]] هنا عشان التجربة متمسحش حاجة.`,
            R`سطر بيأكد إن السكربت وصل للآخر. من غير strict mode بيطبع [[done]] بعد ما «مسح» الملفات الغلط، فشكله نجح. ومع strict mode مبيوصلوش، لأن [[Stop]] وقّف السكربت عند الـ error (كود الخروج [[1]]).`,
          ],
          try: R`اعمل فولدر [[strict]] فيه [[app.log]] و [[logs\old.log]]، واحفظ المثال [[clean.ps1]] جواه، واقف في الفولدر وشغّله. بعدها امسح سطر [[Set-StrictMode]] وشغّله تاني وشوف الـ What if على أنهي ملفات. وفي الآخر صلّح الاسم لـ [[$logDir]].`,
          practice: [
            { lvl: 'سريع', t: R`اكتب [[$nmae = 'x'; $name]]، مرة من غير strict mode ومرة بعد [[Set-StrictMode -Version Latest]].`, done: R`من غيره مبيطبعش حاجة ومبيشتكيش، ومعاه بيطلع error فيه اسم المتغير الغلط.` },
            { lvl: 'تطبيق', t: R`اقرا خاصية مش موجودة ([[$obj.Nmae]]) تحت [[-Version 1]] وبعدين تحت [[Latest]].`, done: R`[[-Version 1]] بيعدّيها و [[Latest]] بيمسكها، وتقدر تقول ليه.` },
            { lvl: 'تحدي', t: R`سكربت بيستخدم [[.Count]] على نتيجة ممكن تبقى صفر أو عنصر واحد أو كتير. شغّله تحت strict mode وصلّحه بـ [[@( )]].`, done: R`بيشتغل صح في التلات حالات، ومفيش ولا error.` },
          ],
          flag: "script",
          deep: {
            why: R`PowerShell اتعمل عشان تكتب فيه أوامر بسرعة في الترمنال، فبيسامح: متغير مش موجود = [[$null]] و property غلط = [[$null]]. ده مريح في سطر واحد وخطر في سكربت ٢٠٠ سطر، لأن [[$null]] بيمشي في الكود ويتحوّل لحاجة تانية: مسار فاضي = الفولدر الحالي، وشرط فاضي = False، ورقم فاضي = 0. وبتكتشف الغلطة لما تلاقي النتيجة غلط، مش في السطر اللي فيه الغلطة.`,
            how: R`الأرقام بتاعة [[-Version]] مش نسخ PowerShell، دي مستويات القواعد. جرّبت كل مستوى على خمس غلطات في 7.6 و 5.1 (نفس النتيجة بالظبط):

[[Off]]: الخمسة عدّوا. [[1.0]]: مسك المتغير المش متعرّف بس (و [["hi $usr"]] جوه نص عدّى). [[2.0]]: زوّد المتغير جوه النص، و property غلط ([[$user.Nmae]]: «The property 'Nmae' cannot be found on this object»)، و [[f(1, 2)]] («The function or command was called as if it were a method»). [[3.0]] و [[Latest]]: زوّدوا [[$arr[10]]] («Index was outside the bounds of the array»).

[[Latest]] معناها أعلى مستوى في النسخة اللي بتشغّل، ولو نسخة جاية زوّدت مستوى، سكربتك هيبقى أصرم لوحده. لو عايز السلوك ثابت، اكتب [[3.0]].

[[$ErrorActionPreference = 'Stop']] حاجة تانية: بيخلي الـ non-terminating errors (زي [[Get-Item]] لملف مش موجود) توقّف. بس مبيأثرش على البرامج الخارجية: [[cmd /c exit 3]] كمّل عادي في الاتنين. في 7.4 وأحدث فيه [[$PSNativeCommandUseErrorActionPreference = $true]]، ومعاه نفس الأمر طلّع «Program "cmd.exe" ended with non-zero exit code: 3» واتمسك في [[catch]]. وفي 5.1 المتغير ده مالوش تأثير.`,
            when: R`أول سطرين في أي ملف [[.ps1]] بتحفظه: [[Set-StrictMode -Version Latest]] و [[$ErrorActionPreference = 'Stop']]. وفي الموديولات جوه كل [[.psm1]]. ومتحطوش في [[$PROFILE]]: هيبوّظ موديولات وأوامر مكتوبة من غيره، وانت بتكتب في الترمنال محتاج التسامح.`,
            mistakes: R`تفتكر [[Set-StrictMode]] بيمسك غلطات الإملا في أسماء الأوامر (لأ: دي كانت بتقع من الأول). أو تستخدم [[.Count]] على حاجة ممكن تبقى عنصر واحد: مع strict mode [[$one.Count]] و [[$null.Count]] بيقعوا بـ «The property 'Count' cannot be found» في 5.1 و 7.6؛ الحل [[@($x).Count]]. أو [[$hash.key]] لمفتاح مش موجود (بيقع)، والحل [[$hash['key']]] أو [[ContainsKey()]]. أو تفتكر [[Stop]] بيوقّف لما [[git]] أو [[npm]] يفشل (لأ، افحص [[$LASTEXITCODE]]).`
          },
          teach: R`## الفكرة: [[$null]] الساكت

~~~powershell
$user = [pscustomobject]@{ Name = 'nour'; Port = 8080 }
$user.Nmae
$usr.Name
~~~

السطرين التانيين فيهم غلطة إملا (property و متغير)، والاتنين **مبيطبعوش حاجة ومبيقولوش حاجة**. ده سلوك PowerShell الافتراضي. اتشغّل كل اللي تحت في PowerShell 7.6 و 5.1، والنتيجة نفسها في الاتنين إلا لو مكتوب غير كده.

---

## ١. الغلطة اللي بتمسح الملفات الغلط

~~~powershell clean.ps1 (من غير strict mode)
$ErrorActionPreference = 'Stop'
$logDir = Join-Path $PSScriptRoot 'logs'
Get-ChildItem $logDri -Filter *.log | Remove-Item -WhatIf
'done'
~~~

الفولدر:

~~~text
strict\
  app.log
  notes.log
  clean.ps1
  logs\
    old.log      ← ده اللي المفروض يتمسح
~~~

وانت واقف في [[strict]] وبتشغّل [[.\clean.ps1]]:

~~~text اتشغّل فعلًا · 7.6 و 5.1
What if: Performing the operation "Remove File" on target "C:\Users\you\lab\power\strict\app.log".
What if: Performing the operation "Remove File" on target "C:\Users\you\lab\power\strict\notes.log".
done
~~~

خطوة خطوة:

1. [[$logDri]] مش متعرّف ← قيمته [[$null]]، من غير error.
2. [[Get-ChildItem $null -Filter *.log]] = [[Get-ChildItem -Filter *.log]] ← ملفات **الفولدر الحالي**.
3. [[Remove-Item]] كان هيمسحهم، و [[old.log]] اللي كان المفروض يتمسح سليم.
4. [[done]]، فالسكربت شكله نجح.

[[$ErrorActionPreference = 'Stop']] ماعملش حاجة، لأن مفيش حاجة **فشلت**: كل أمر اشتغل صح على قيمة غلط.

---

## ٢. نفس السكربت بـ [[Set-StrictMode]]

~~~powershell clean.ps1
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$logDir = Join-Path $PSScriptRoot 'logs'
Get-ChildItem $logDri -Filter *.log | Remove-Item -WhatIf
'done'
~~~

~~~text اتشغّل فعلًا · PowerShell 7.6 (كود الخروج 1)
InvalidOperation: C:\Users\you\lab\power\strict\clean.ps1:4
Line |
   4 |  Get-ChildItem $logDri -Filter *.log | Remove-Item -WhatIf
     |                ~~~~~~~
     | The variable '$logDri' cannot be retrieved because it has not been set.
~~~

~~~text اتشغّل فعلًا · Windows PowerShell 5.1 (كود الخروج 1)
The variable '$logDri' cannot be retrieved because it has not been set.
At C:\Users\you\lab\power\strict\clean.ps1:4 char:15
+ Get-ChildItem $logDri -Filter *.log | Remove-Item -WhatIf
+               ~~~~~~~
    + CategoryInfo          : InvalidOperation: (logDri:String) [], ParentContainsErrorRecordException
    + FullyQualifiedErrorId : VariableIsUndefined
~~~

اقرا الرسالة: رقم السطر ([[:4]] في 7 و [[char:15]] في 5.1 يعني الحرف رقم ١٥)، والـ [[~~~~~~~]] تحت المتغير نفسه بالظبط. ولا ملف اتلمس، و [[done]] مااتطبعتش.

وبعد ما تصلّح [[$logDri]] لـ [[$logDir]]:

~~~text اتشغّل فعلًا · 7.6 و 5.1
What if: Performing the operation "Remove File" on target "C:\Users\you\lab\power\strict\logs\old.log".
done
~~~

---

## ٣. المستويات: كل رقم بيمسك إيه

جرّبت خمس غلطات تحت كل مستوى:

~~~powershell
$user = [pscustomobject]@{ Name = 'nour'; Port = 8080 }
$arr  = 1, 2, 3
$usr.Name                          # متغير مش متعرّف
"hi $usr"                          # متغير مش متعرّف جوه نص
$user.Nmae                         # property مش موجودة
$arr[10]                           # index برا الـ array
function f($a, $b) { "$a|$b" }; f(1, 2)   # نداء دالة بأقواس وفاصلة
~~~

| الغلطة | Off | 1.0 | 2.0 | 3.0 و Latest |
|---|---|---|---|---|
| [[$usr.Name]] | [[$null]] | **error** | **error** | **error** |
| [["hi $usr"]] | [[hi ]] | [[hi ]] | **error** | **error** |
| [[$user.Nmae]] | [[$null]] | [[$null]] | **error** | **error** |
| [[$arr[10]]] | [[$null]] | [[$null]] | [[$null]] | **error** |
| [[f(1, 2)]] | [[1 2 بس]] | [[1 2 بس]] | **error** | **error** |

~~~text الرسايل (اتشغّل فعلًا · 7.6 و 5.1 نفس النص)
The variable '$usr' cannot be retrieved because it has not been set.
The property 'Nmae' cannot be found on this object. Verify that the property exists.
Index was outside the bounds of the array.
The function or command was called as if it were a method. Parameters should be separated by spaces.
~~~

الغلطة الأخيرة مهمة لو جاي من لغة تانية: [[f(1, 2)]] في PowerShell معناها «ابعت array فيها ١ و ٢ كأول parameter»، فـ [[$a]] بيبقى [[1 2]] و [[$b]] فاضي. الصح [[f 1 2]].

> [[Latest]] = أعلى مستوى في النسخة اللي بتشغّل (٣ في 5.1 و 7.6 حسب الـ docs، والجدول فوق بيأكد إن الاتنين مسكوا نفس الغلطات). لو عايز سكربت سلوكه ثابت حتى في نسخ جاية، اكتب [[-Version 3.0]].

---

## ٤. فخاخ strict mode نفسه

~~~powershell
Set-StrictMode -Version Latest
$one = 5
$one.Count
$null.Count
@($one).Count
$h = @{ a = 1 }
$h.b
$h['b']
~~~

~~~text اتشغّل فعلًا · 7.6 و 5.1
$one.Count    → The property 'Count' cannot be found on this object. Verify that the property exists.
$null.Count   → The property 'Count' cannot be found on this object. Verify that the property exists.
@($one).Count → 1
$h.b          → The property 'b' cannot be found on this object. Verify that the property exists.
$h['b']       → (فاضي، من غير error)
~~~

- [[.Count]] على قيمة واحدة بيقع. وده بيحصل كتير: [[Get-ChildItem]] بيرجّع object واحد لو فيه ملف واحد. الحل [[@( ... ).Count]] دايمًا.
- مفتاح مش موجود في hashtable بالنقطة بيقع، وبالأقواس لأ. أو اسأل الأول بـ [[$h.ContainsKey('b')]].

---

## ٥. [[$ErrorActionPreference = 'Stop']]: النص التاني

~~~powershell
Get-Item .\nothere.txt
'after 1 (continue)'
$ErrorActionPreference = 'Stop'
try { Get-Item .\nothere.txt; 'after 2' } catch { 'caught: ' + $_.Exception.Message }
~~~

~~~text اتشغّل فعلًا · PowerShell 7.6 (من ملف eap.ps1)
Get-Item: C:\Users\you\lab\power\eap.ps1:1
Line |
   1 |  Get-Item .\nothere.txt
     |  ~~~~~~~~~~~~~~~~~~~~~~
     | Cannot find path 'C:\Users\you\lab\power\nothere.txt' because it does not exist.
after 1 (continue)
caught: Cannot find path 'C:\Users\you\lab\power\nothere.txt' because it does not exist.
~~~

- من غير [[Stop]]: error أحمر **وكمّل** ([[after 1]] اتطبعت).
- مع [[Stop]]: نفس الـ error راح للـ [[catch]] و [[after 2]] مااتطبعتش.

**البرامج الخارجية مختلفة:** [[cmd /c exit 3]] كمّل عادي حتى مع [[Stop]] في الاتنين. في 7.4 وأحدث:

~~~powershell
$PSNativeCommandUseErrorActionPreference = $true
try { cmd /c exit 3; 'continued' } catch { 'caught: ' + $_.Exception.Message }
~~~

~~~text اتشغّل فعلًا
PowerShell 7.6:  caught: Program "cmd.exe" ended with non-zero exit code: 3 (0x00000003).
Windows PowerShell 5.1:  continued
~~~

في 5.1 افحص [[$LASTEXITCODE]] بعد كل برنامج خارجي (درس «$LASTEXITCODE»).

---

## ٦. النطاق: بيخلص مع السكربت

~~~powershell
& { Set-StrictMode -Version Latest; try { $nope } catch { 'inside: ERR' } }
"outside: [$nope] no error"
~~~

~~~text اتشغّل فعلًا · 7.6 و 5.1
inside: ERR
outside: [] no error
~~~

[[Set-StrictMode]] بيأثر على الـ scope اللي اتكتب فيه واللي جواه. [[& { }]] scope لوحده، وكذلك ملف السكربت. فحطّه في أول السكربت وهو مش هيبوّظ الترمنال بتاعك بعد ما يخلص.

---

## الخلاصة: أول سطور أي سكربت

~~~powershell
#Requires -Version 5.1
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
~~~

| السطر | بيمسك إيه |
|---|---|
| [[#Requires -Version 5.1]] | السكربت مش هيشتغل على نسخة أقدم |
| [[Set-StrictMode -Version Latest]] | غلطاتك في الكود: متغير أو property أو index غلط |
| [[$ErrorActionPreference = 'Stop']] | فشل الأوامر وهي شغالة: ملف مش موجود، أو صلاحية ناقصة |
| [[$LASTEXITCODE]] بعد كل برنامج خارجي | فشل [[git]] و [[npm]] وأي exe (أو [[$PSNativeCommandUseErrorActionPreference]] في 7.4+) |

- [[$null]] الساكت أخطر من الـ error: الأول بيبوّظ، والتاني بيقولك فين.
- مع strict mode: [[@( ).Count]] و [[$h['key']]].
- مش في [[$PROFILE]]؛ في السكربتات بس.`,
          sol: R`اتشغّل فعلًا في 7.6 و 5.1. من غير strict mode: What if على [[strict\app.log]] و [[strict\notes.log]] (الفولدر الحالي) وبعدها [[done]]. ومع strict mode: «The variable '$logDri' cannot be retrieved because it has not been set» في السطر ٤ وكود الخروج [[1]]. وبعد التصليح: What if على [[logs\old.log]] بس.`,
          solCode: R`# من غير Set-StrictMode (اتشغّل فعلًا · 7.6 و 5.1):
# What if: Performing the operation "Remove File" on target "C:\Users\you\lab\power\strict\app.log".
# What if: Performing the operation "Remove File" on target "C:\Users\you\lab\power\strict\notes.log".
# done

# بعد التصليح:
$logDir = Join-Path $PSScriptRoot 'logs'
Get-ChildItem $logDir -Filter *.log | Remove-Item -WhatIf
# What if: Performing the operation "Remove File" on target "C:\Users\you\lab\power\strict\logs\old.log".`
        },
      ]
    }
]);
