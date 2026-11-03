// تكملة تاب cmd: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cmd/01.js (شرح حقول الدرس في أوله)
MORE("cmd", [
    {
      t: "تحكّم في الشبكة والأجهزة اللي معاك",
      l: 2,
      n: R`فايروول و IP ثابت وواي فاي وتصليح النت وشير و Remote Desktop وأجهزة تانية على شبكتك. أغلب التغيير محتاج CMD كأدمن والخطير عليه علامة، واللي بيدوّر على أجهزة: على شبكتك انت بس أو بإذن صاحبها`,
      time: R`حوالي ساعة ونص`,
      goal: [R`تفتح وتقفل بورت في الفايروول.`, R`تثبّت IP، وتتوصل بواي فاي، وتصلّح الشبكة من CMD.`, R`تشارك فولدر، وتتحكم في جهاز تاني على شبكتك.`],
      use: { net: R`تجهيز جهاز كسيرفر صغير على شبكة البيت أو المكتب.`, work: R`جهاز من غير واجهة، أو بتساعد حد عن بعد.` },
      lab: R`mkdir %TEMP%\cmdlab & cd /d %TEMP%\cmdlab`,
      projects: [
        { lvl: 'صغير', t: R`تقرير الواي فاي`, what: R`[[wifi-report.bat]] (قراية بس): من [[netsh wlan show interfaces]] الإشارة والقناة والـ Band والـ Radio type، ومن [[netsh wlan show drivers]] الكارت بيدعم إيه، ومن [[show networks mode=bssid]] كام شبكة على كل قناة من [[1]] و [[6]] و [[11]]، وفي الآخر سطر «أفضى قناة». من درس «netsh wlan connect».`, done: R`التقرير ٥–٦ سطور وفيه القناة الحالية (على جهاز التجربة [[Channel                : 7]]) واقتراح بقناة من التلاتة. ولو الـ Location مقفول بيطبع رسالة الـ location بتاعة netsh وطريقة الحل بدل ما يطبع أصفار.` },
        { lvl: 'صغير', t: R`جرد شبكة البيت`, what: R`[[who-is-here.bat]] بيكتب [[devices.csv]] فيه [[IP,MAC,NAME]] لكل سطر [[dynamic]] في [[arp -a]]، والاسم من [[ping -a]] أو [[nbtstat -A]] أو [[?]]. على شبكتك انت بس. من دروس «ping -a و nbtstat -A» و «arp / route».`, done: R`[[devices.csv]] بيتفتح في Excel بعمود لكل حاجة، والراوتر فيه، وعدد السطور = [[arp -a | find /c "dynamic"]] وقت التشغيل، وتشغيله تاني بيكتب الملف من الأول.` },
        { lvl: 'متوسط', t: R`سيرفر صغير على شبكتك`, what: R`(على جهازك من نافذة أدمن، أو في VM) [[serve-lan.bat up|down]]: [[up]] بيدّي الجهاز IP ثابت برا مدى الـ DHCP، ويضيف قاعدة فايروول [[profile=private]] لبورت واحد لو مش موجودة، ويطبع اللينك اللي تفتحه من الموبايل. [[down]] بيرجّع [[dhcp]] ويمسح القاعدة. من دروس «netsh interface ip set address» و «netsh advfirewall firewall».`, done: R`بعد [[up]] الموبايل على نفس الواي فاي فتح الصفحة، و [[show rule name="..."]] فيه قاعدة واحدة حتى لو [[up]] اتشغّل مرتين. وبعد [[down]]: [[show config]] بيقول [[DHCP enabled: Yes]] و [[show rule]] بيقول [[No rules match the specified criteria.]]، و [[down]] التانية مبتطلعش error.` },
        { lvl: 'متوسط', t: R`لقطة الشبكة قبل وبعد`, what: R`[[net-snapshot.bat NAME]] بيحفظ في [[snap-NAME.txt]]: [[route print -4]] وأسامي الـ Winsock catalog وأسامي قواعد الفايروول الداخلة. خد لقطة قبل ما تسطّب VPN أو برنامج شبكة، ولقطة بعده، وقارن بـ [[fc]]. من دروس «netsh winsock reset» و «netsh advfirewall firewall» و «arp / route».`, done: R`لقطتين ورا بعض من غير ما تغيّر حاجة: [[fc]] قال [[FC: no differences encountered]] و [[errorlevel]] [[0]] (على جهاز التجربة كل لقطة حوالي ٣٨ كيلو). وبعد تسطيب برنامج، [[fc]] بيطلّع بس السطور اللي البرنامج زوّدها (قاعدة فايروول أو route أو LSP).` },
        { lvl: 'كبير', t: R`مساعد الشبكة للمكتب`, what: R`[[office-net.bat]] قايمة بـ [[choice]] لمكتب صغير: ١ وصّل كل الدرايفات من [[shares.txt]] ([[Z: \\PC\Docs]] في كل سطر) ويتخطى المتوصل أصلًا، ٢ افصلهم، ٣ افتح Remote Desktop لجهاز من [[pcs.txt]] بملف [[.rdp]] جاهز، ٤ restart لجهاز بعد تأكيد ورسالة (بـ [[/t 300]] عشان يتلغي)، ٥ تقرير الشبكة. كل عملية بتتكتب في [[office-net.log]] بالوقت والنتيجة والكود، وأي حاجة محتاجة أدمن بيرفضها برسالة لو النافذة مش أدمن ([[net session >nul 2>&1]]). من كل دروس الوحدة.`, done: R`١ مرتين: التانية كل السطور [[already connected]] ومفيش error. جهاز مقفول في [[shares.txt]] بيتكتب [[FAIL 53]] والباقي بيكمّل. ٤ بيسأل قبل ما يعمل حاجة، ولو قلت لأ اللوج بيقول [[cancelled]]. وكل خيار بيرجعك للقايمة، والـ log فيه سطر لكل عملية.`, ext: R`زوّد خيار «تشغيل جاف» ([[/dry]]) بيطبع الأوامر من غير ما ينفّذها، وخلّي [[shares.txt]] و [[pcs.txt]] يتقروا من فولدر الشبكة نفسه عشان أي تعديل يوصل للكل.` },
        { lvl: 'كبير', t: R`إعداد شبكة تجارب يتراجع لوحده`, what: R`(في VM أو Windows Sandbox) [[lab-setup.bat up|down|status]] بيعمل ٣ حاجات بالترتيب: قاعدة فايروول، و route تجربة بـ [[store=active]]، وسطر في [[hosts]]. كل خطوة نجحت (أو كانت موجودة أصلًا، [[The object already exists.]]) بتتسجل في [[lab.state]] بأمر التراجع بتاعها، ولو خطوة فشلت بيرجّع اللي قبلها بالعكس. [[down]] بينفّذ اللي في [[lab.state]] بس. من درس «netsh: The object already exists» ودرس «hosts».`, done: R`[[up]] مرتين: التانية كلها [[ok]] من غير فشل. خطوة متعمّد فيها خطأ بترجّع اللي قبلها و [[exit]] بكود [[1]]. [[down]] بيرجّع الـ ٣ وبعده [[route print]] و [[show rule]] و [[hosts]] زي ما كانوا (قارن بـ [[net-snapshot.bat]] قبل وبعد: [[FC: no differences encountered]]). و [[down]] تاني بيقول [[nothing to undo]].`, ext: R`خلّي الخطوات نفسها في ملف [[steps.txt]] (أمر ||| تراجع) بدل ما تبقى مكتوبة في السكربت، وزوّد [[/dry]] يطبع الخطة بس.` },
        { lvl: 'فكرة', t: R`لوحة تحكم الشبكة للبيت`, what: R`أداة واحدة لكل اللي في البيت: مين متوصل دلوقتي، والإشارة في أوضة أوضة (تقيسها وانت ماشي)، وأفضى قناة، ومين بيستخدم شير الملفات، وزرار «اعمل restart للجهاز ده». انت اللي تختار الخيارات والشكل.`, done: R`الأداة بتشتغل من نافذة عادية لكل حاجة قراية، ومبتطلبش أدمن غير للخيارات اللي بتغيّر، وكل خيار بيغيّر حاجة ليه خيار بيرجّعها.`, ext: R`اعملها صفحة HTML بتتولّد من السكربت ([[echo]] لملف [[.html]] وبعدين [[start]])، فيها جدول الأجهزة وتاريخ آخر مرة اتشافوا.` },
      ],
      items: [
        {
          cmd: "netsh advfirewall firewall",
          title: "افتح بورت أو امنع برنامج في الفايروول",
          desc: R`[[netsh advfirewall firewall]] بيعرض قواعد Windows Firewall ويضيف قواعد جديدة ويمسحها، و [[netsh advfirewall]] لوحده بيعرض حالة الفايروول نفسه. أشهر استخدام: «الموبايل مش شايف السيرفر اللي شغال على جهازي»، فتفتح بورت واحد على الشبكات الخاصة بس.

العرض:
[[show currentprofile]] أنهي profile شغال دلوقتي (Domain أو Private أو Public) والفايروول شغال فيه ولا لأ، و [[show allprofiles state]] الحالة في التلاتة.
[[show rule name=all dir=in]] كل القواعد الداخلة (incoming)، وهي مئات، فاستخدم معاها [[| findstr]]. و [[name="..."]] قاعدة واحدة، و [[verbose]] تفاصيل زيادة زي البرنامج.

[[add rule]] قاعدة جديدة، وجواها:
[[name="Dev 5173"]] اسمها، وبيه بتمسحها بعدين.
[[dir=in]] داخل لجهازك، أو [[dir=out]] خارج منه.
[[action=allow]] اسمح، أو [[action=block]] امنع.
[[protocol=TCP]] و [[localport=5173]] البورت على جهازك (5173 بورت Vite).
[[profile=private]] على الشبكات الخاصة بس (البيت)، مش [[public]] (كافيه أو مطار). دي أهم حتة.
[[program="C:\Tools\myapp.exe"]] القاعدة على برنامج معين بدل بورت.
[[delete rule name="Dev 5173"]] امسح القاعدة (وأي قاعدة تانية بنفس الاسم).

الخطيرين: [[netsh advfirewall set allprofiles state off]] بيقفل الفايروول كله، متعملهاش. و [[netsh advfirewall reset]] بيرجّع الفايروول لإعدادات ويندوز الأصلية ويمسح كل قواعدك وقواعد البرامج.

العرض مش محتاج أدمن. الإضافة والمسح والتغيير محتاجين CMD كأدمن، ومن غيره: [[The requested operation requires elevation (Run as administrator).]].`,
          example: R`netsh advfirewall show currentprofile
netsh advfirewall firewall show rule name=all dir=in | findstr /c:"Rule Name:"
netsh advfirewall firewall add rule name="Dev 5173" dir=in action=allow protocol=TCP localport=5173 profile=private
netsh advfirewall firewall show rule name="Dev 5173"
netsh advfirewall firewall add rule name="Block MyApp" dir=out action=block program="C:\Tools\myapp.exe"
netsh advfirewall firewall delete rule name="Dev 5173"
netsh advfirewall firewall delete rule name="Block MyApp"`,
          try: R`شغّل سيرفر على بورت (مثلًا [[python -m http.server 8000]])، وافتحه من الموبايل على نفس الواي فاي بـ IP جهازك. لو مفتحش: ضيف قاعدة للبورت ده بـ [[profile=private]] من CMD أدمن وجرّب تاني، وبعدين امسحها.`,
          practice: [
            { lvl: 'سريع', t: R`**بيانات حقيقية:** من CMD عادي: كام قاعدة داخلة عندك؟ [[netsh advfirewall firewall show rule name=all dir=in | find /c "Rule Name:"]]. والفايروول شغال في كام profile؟ [[netsh advfirewall show allprofiles state | find /c "ON"]].`, done: R`طلعلك رقمين (على جهاز التجربة [[427]] قاعدة و [[3]] profiles شغالين: Domain و Private و Public). والاتنين اشتغلوا من غير أدمن: العرض مش محتاج صلاحيات.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[netsh advfirewall firewall show rule name="NoSuchRule-Lab"]] و [[echo %errorlevel%]]. هيطبع إيه؟`, done: R`[[No rules match the specified criteria.]] و [[errorlevel]] [[1]]. ينفع تبني عليه سكربت: [[show rule name="Dev 5173" >nul || (add rule ...)]] فالقاعدة متتضافش مرتين لو شغّلت السكربت مرتين.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ (قراية):** زميلك كتب لسيرفر Vite: [[netsh advfirewall firewall add rule name="Dev" dir=in action=allow protocol=TCP localport=5173]] وشغّله مرتين. لاقي ٣ مشاكل من غير ما تشغّله.`, done: R`١ مفيش [[profile=private]]، فالبورت مفتوح كمان على شبكات الكافيه والمطار (Public). ٢ التشغيل التاني عمل قاعدة **تانية** بنفس الاسم (netsh بيسمح بأسامي متكررة)، و [[delete rule name="Dev"]] هيمسح الاتنين مرة واحدة. ٣ الاسم عام ([[Dev]]) ومش بيقول البورت. (السلوك من توثيق netsh advfirewall؛ الإضافة محتاجة أدمن فمتجرّبتش هنا.)` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** من [[netsh advfirewall firewall add rule ?]] (بيطبع الـ help ومش بيضيف حاجة): إزاي تخلي القاعدة تسمح لجهاز واحد بس على الشبكة (مثلًا موبايلك [[192.168.1.30]])؟ وإزاي تعمل قاعدة لمدى بورتات؟`, done: R`[[remoteip=192.168.1.30]] (والـ help فيه [[remoteip=any|localsubnet|dns|dhcp|wins|defaultgateway|]] كمان، و [[localsubnet]] لكل الشبكة المحلية)، و [[localport=5173-5175]] للمدى (مثال الـ help نفسه [[localport=5000-5010]]). كتبت القاعدة الكاملة كسطر واحد من غير ما تشغّلها، وفيها [[profile=private]].` },
            { lvl: 'تحدي', t: R`**ابني (في VM أو Windows Sandbox):** [[dev-port.bat open|close PORT]] من CMD أدمن: [[open]] يضيف قاعدة اسمها [[Dev PORT]] بـ [[profile=private]] بس لو مش موجودة (بـ [[show rule]] الأول)، و [[close]] يمسحها، والاتنين يطبعوا النتيجة ويخرجوا بكود صح. ولو النافذة مش أدمن يرفض في الأول برسالة واضحة.`, done: R`[[open 5173]] مرتين ورا بعض: [[show rule name="Dev 5173"]] بيطلّع قاعدة واحدة بس. [[close 5173]] مرتين: التانية بتقول «مش موجودة» وتخرج بـ [[0]] مش error. ومن نافذة عادية بيقول «محتاج أدمن» قبل ما يلمس حاجة (الإضافة من غير أدمن بتطلّع [[The requested operation requires elevation (Run as administrator).]] حسب الدرس).` },
          ],
          flag: "danger",
          deep: {
            why: R`لما تشغّل سيرفر تطوير (Vite أو Node أو Python) وتحاول تفتحه من الموبايل أو جهاز تاني، الفايروول بيمنع الاتصال الداخل. ويندوز ساعات بيطلّع نافذة «Allow access» أول مرة، ولو دوست Cancel أو اخترت غلط بتفضل القاعدة دي تمنع وانت مش واخد بالك. وفي الناحية التانية، أحيانًا عايز تمنع برنامج يكلم النت (برنامج مش واثق فيه، أو تحديث تلقائي بيبوّظ نسخة شغال عليها).`,
            how: R`فيه 3 profiles: Domain (جهاز شركة على دومين)، و Private (شبكة انت واثق فيها)، و Public (أي شبكة تانية، وده الافتراضي لأي واي فاي جديد). كل profile ليه حالته وقواعده، والافتراضي «امنع أي داخل مفيش قاعدة بتسمحه، واسمح بأي خارج» ([[Firewall Policy BlockInbound,AllowOutbound]]). عشان كده [[dir=out action=allow]] ملهاش لازمة غالبًا، و [[dir=out action=block]] هي اللي بتعمل فرق.

جرّبت [[show currentprofile]] على اللابتوب ده وطلع [[Public Profile Settings]]: واي فاي البيت متسجل Public، فقاعدة بـ [[profile=private]] مش هتشتغل عليه. الحل إنك تخلّي الشبكة Private (Settings ثم Network & internet ثم Wi-Fi ثم اسم الشبكة ثم Network profile type، أو [[Set-NetConnectionProfile]] في تاب «PowerShell»)، مش إنك تفتح البورت على Public.

البرامج اللي ويندوز سألك عليها بتعمل قواعد باسمها. عندي لقيت قاعدتين [[Node.js JavaScript Runtime]] (واحدة TCP وواحدة UDP) فيهم [[Program: C:\program files\nodejs\node.exe]] و [[Profiles: Public]] و [[Action: Allow]]، يعني node مسموحله يستقبل اتصالات على الشبكات العامة، وده أوسع من اللازم. تقدر تضيّقها: [[netsh advfirewall firewall set rule name="Node.js JavaScript Runtime" new profile=private]].

netsh بيسمح بقاعدتين بنفس الاسم، فلو شغّلت add مرتين هيبقى عندك اتنين. [[show rule name="..."]] على اسم مش موجود بيطبع [[No rules match the specified criteria.]] ويرجّع errorlevel 1، فتقدر في سكربت تضيف بس لو مش موجودة: [[netsh advfirewall firewall show rule name="Dev 5173" >nul || netsh advfirewall firewall add rule ...]]. و [[remoteip=localsubnet]] بيقصر القاعدة على أجهزة شبكتك بس. والمقابل في PowerShell: [[New-NetFirewallRule]] (في تاب «PowerShell»)، والواجهة [[wf.msc]].`,
            when: R`سيرفر تطوير عايز تفتحه من الموبايل، أو Docker أو WSL أو VM محتاجين يوصلوا لجهازك، أو تمنع برنامج يكلم النت، أو تراجع البرامج المسموحلها تستقبل اتصالات على الشبكات العامة.`,
            mistakes: R`تقفل الفايروول كله ([[state off]]) عشان «السيرفر يشتغل» وتنسى ترجّعه. أو تفتح البورت بـ [[profile=any]] أو public فيبقى مفتوح في أي كافيه. أو تضيف القاعدة والشبكة نفسها Public فمتشتغلش. أو [[findstr "Rule Name"]] من غير [[/c:]]: المسافة بتخليها «Rule أو Name». أو [[netsh advfirewall reset]] وانت فاكره بيصلّح قاعدة واحدة، وهو بيمسح كل القواعد. أو تفتكر إن القاعدة دي بتفتح البورت للنت: النت محتاج port forwarding في الراوتر، ومتعملوش لسيرفر تطوير.`
          },
          teach: R`## الأول: الأمر ده كلمات بتنزل بيك قسم ورا قسم

[[netsh]] اختصار network shell: برنامج واحد جواه «أقسام» (contexts)، كل قسم بيتحكم في حاجة في الشبكة. الكلمات اللي بعده بتدخّلك قسم جوه قسم زي الفولدرات، وآخر كلمة هي الفعل:

| الكلمة | معناها |
|---|---|
| [[netsh]] | البرنامج نفسه (network shell) |
| [[advfirewall]] | قسم الفايروول (Windows Defender Firewall with Advanced Security) |
| [[firewall]] | جوه القسم ده: القواعد (rules) |
| [[show]] و [[add]] و [[delete]] | الفعل: اعرض، ضيف، امسح |

فـ [[netsh advfirewall show ...]] بيكلم الفايروول كله، و [[netsh advfirewall firewall show rule ...]] بيكلم القواعد. كل الأوامر تحت اتشغّلت في CMD على ويندوز 11 (من غير أدمن)، إلا الإضافة والمسح.

---

## ١. الفايروول شغال؟ [[netsh advfirewall show currentprofile]]

[[show]] اعرض، و [[currentprofile]] الـ profile اللي شغال دلوقتي. ويندوز بيقسم الشبكات ٣ أنواع (profiles): Domain لجهاز شركة، و Private لشبكة انت واثق فيها، و Public لأي شبكة تانية. وكل نوع ليه إعداداته وقواعده.

~~~cmd
netsh advfirewall show currentprofile
~~~

~~~text الناتج (أول جزء)
Public Profile Settings:
----------------------------------------------------------------------
State                                 ON
Firewall Policy                       BlockInbound,AllowOutbound
LocalFirewallRules                    N/A (GPO-store only)
LocalConSecRules                      N/A (GPO-store only)
InboundUserNotification               Enable
RemoteManagement                      Disable
UnicastResponseToMulticast            Enable
...
Ok.
~~~

| السطر | معناه |
|---|---|
| [[Public Profile Settings]] | الشبكة اللي انت عليها متسجلة Public |
| [[State ON]] | الفايروول شغال على الـ profile ده |
| [[BlockInbound,AllowOutbound]] | امنع أي اتصال **داخل** مفيش قاعدة بتسمحه، واسمح بأي اتصال **خارج** |
| [[InboundUserNotification Enable]] | لما برنامج يحاول يستقبل اتصال، اسألني (دي نافذة «Allow access») |
| [[Ok.]] | netsh بيختم بيها أي أمر نجح |

وعشان تشوف التلاتة مرة واحدة: [[netsh advfirewall show allprofiles state]]، و [[state]] معناها «الحالة بس من غير باقي الإعدادات». طلّع هنا [[State ON]] تحت Domain و Private و Public.

> لاحظ إن واي فاي البيت هنا متسجل Public. ده هيفرق جدًا في الخطوة ٣.

---

## ٢. أسامي القواعد: [[show rule]] و [[findstr]]

~~~cmd
netsh advfirewall firewall show rule name=all dir=in | findstr /c:"Rule Name:"
~~~

نفكّه بالترتيب:

### [[show rule name=all dir=in]]

- [[show rule]] اعرض قواعد.
- [[name=all]] كل القواعد مش قاعدة باسم معين. والإعدادات في netsh كلها بالشكل ده: [[اسم=قيمة]] من غير مسافات حوالين [[=]].
- [[dir=in]] (dir = direction) القواعد الداخلة بس (incoming).

الأمر ده لوحده بيطبع لكل قاعدة ١٣ سطر تقريبًا، ومئات القواعد. فبنفلتره.

### [[| findstr /c:"Rule Name:"]]

- [[|]] (pipe) خد ناتج اللي على الشمال ودخّله للي على اليمين (درس | > >> 2>&1).
- [[findstr]] بيطبع السطور اللي فيها كلام معين بس (درس findstr).
- [[/c:"Rule Name:"]] دوّر على الكلام ده **كجملة واحدة بالمسافة**. من غير [[/c:]]، [[findstr "Rule Name:"]] بيعتبر المسافة فاصل ويطبع أي سطر فيه Rule **أو** Name:.

~~~text الناتج (أول ٥ سطور من مئات)
Rule Name:                            HNS Container Networking - DNS (UDP-In) - 790E58B4-...
Rule Name:                            HNS Container Networking - ICS DNS (TCP-In) - 790E58B4-...
Rule Name:                            Google Chrome (mDNS-In)
Rule Name:                            ARMOURY CRATE Service
Rule Name:                            AnyDesk
~~~

ولو عايز العدد بس: [[netsh advfirewall firewall show rule name=all dir=in | find /c "Rule Name:"]]. [[find /c]] (c = count) بيعدّ السطور اللي فيها الكلام بدل ما يطبعها، وطلّع هنا [[367]]: قواعد ويندوز والبرامج اللي اتسطبت (Docker و WSL و Chrome وغيرهم).

### قراية قاعدة واحدة

[[name="..."]] بدل [[all]] بيطبع قاعدة واحدة بكل تفاصيلها، والاسم بين علامات تنصيص عشان فيه مسافات:

~~~cmd
netsh advfirewall firewall show rule name="Google Chrome (mDNS-In)"
~~~

~~~text الناتج
Rule Name:                            Google Chrome (mDNS-In)
----------------------------------------------------------------------
Enabled:                              Yes
Direction:                            In
Profiles:                             Domain,Private,Public
Grouping:                             Google Chrome
LocalIP:                              Any
RemoteIP:                             Any
Protocol:                             UDP
LocalPort:                            5353
RemotePort:                           Any
Edge traversal:                       No
Action:                               Allow
Ok.
~~~

| الخانة | معناها |
|---|---|
| [[Enabled]] | القاعدة شغالة دلوقتي ([[No]] يعني موجودة بس متعطّلة) |
| [[Direction: In]] | على الاتصالات الداخلة |
| [[Profiles]] | على أنهي نوع شبكة. هنا التلاتة |
| [[Grouping]] | جروب القاعدة (البرامج بتحط قواعدها في جروب باسمها) |
| [[LocalIP]] و [[RemoteIP]] | عنوان جهازك والعنوان اللي جاي منه. [[Any]] يعني أي عنوان |
| [[Protocol]] و [[LocalPort]] | البروتوكول والبورت على جهازك (5353 بورت mDNS) |
| [[Action: Allow]] | اسمح بالاتصال اللي بيطابق القاعدة ([[Block]] يعني امنعه) |

ولو زودت [[verbose]] في آخر الأمر هتلاقي سطور زيادة، أهمها [[Program: C:\Program Files\Google\Chrome\Application\chrome.exe]]: القاعدة دي على برنامج Chrome بس.

---

## ٣. ضيف قاعدة: [[add rule]]

~~~cmd
netsh advfirewall firewall add rule name="Dev 5173" dir=in action=allow protocol=TCP localport=5173 profile=private
~~~

كل حتة [[اسم=قيمة]]:

| الحتة | معناها |
|---|---|
| [[add rule]] | ضيف قاعدة جديدة |
| [[name="Dev 5173"]] | اسمها، وبيه هتعرضها وتمسحها بعدين. اختار اسم يقولك هي إيه |
| [[dir=in]] | على الاتصالات الداخلة (الموبايل اللي بيكلم جهازك) |
| [[action=allow]] | اسمح بالاتصال اللي بيطابق القاعدة (والعكس [[action=block]]) |
| [[protocol=TCP]] | بروتوكول TCP، اللي أي سيرفر ويب بيستخدمه |
| [[localport=5173]] | البورت على **جهازك** (5173 بورت Vite الافتراضي) |
| [[profile=private]] | على الشبكات الـ Private بس |

[[profile=private]] أهم حتة: البورت يتفتح في البيت بس، ولو اللابتوب راح كافيه (شبكة Public) يفضل مقفول. بس افتكر الخطوة ١: لو شبكة البيت نفسها متسجلة Public (زي الجهاز ده)، القاعدة دي مش هتشتغل عليها. الحل إنك تخلّي الشبكة Private من Settings، مش إنك تفتح البورت على Public.

الإضافة محتاجة CMD كأدمن، ومشغّلتهاش هنا عشان متغيّرش فايروول الجهاز. حسب توثيق Microsoft بتطبع [[Ok.]]، ومن CMD عادي بترفض بـ [[The requested operation requires elevation (Run as administrator).]].

---

## ٤. اتأكد: [[show rule name="Dev 5173"]]

نفس أمر العرض بتاع الخطوة ٢ على الاسم الجديد. بعد الإضافة بيطبع القاعدة بنفس شكل جدول Chrome اللي فوق. وقبلها (جرّبته هنا):

~~~text الناتج
No rules match the specified criteria.
~~~

والأمر في الحالة دي بيرجّع errorlevel بـ [[1]] (جرّبته)، يعني «ملقتش». فده ينفع في سكربت كسؤال «القاعدة موجودة؟» قبل ما تضيفها تاني (netsh بيقبل قاعدتين بنفس الاسم).

---

## ٥. امنع برنامج يكلم النت

~~~cmd
netsh advfirewall firewall add rule name="Block MyApp" dir=out action=block program="C:\Tools\myapp.exe"
~~~

الجديد هنا:

- [[dir=out]] الاتصالات **الخارجة** من جهازك. ليه؟ لأن الافتراضي [[AllowOutbound]] (من الخطوة ١): أي برنامج مسموحله يطلع. فالقاعدة الخارجة المفيدة هي اللي بتمنع.
- [[action=block]] امنع.
- [[program="..."]] بدل البورت: القاعدة على ملف البرنامج نفسه (المسار الكامل لملف الـ exe)، أيًا كان البورت اللي بيستخدمه.

ومفيش [[profile]] هنا، فالقاعدة بتشتغل على التلاتة (الافتراضي [[profile=any]]).

---

## ٦. امسح: [[delete rule]]

~~~cmd
netsh advfirewall firewall delete rule name="Dev 5173"
netsh advfirewall firewall delete rule name="Block MyApp"
~~~

بيمسح **كل** القواعد اللي بالاسم ده. حسب التوثيق بيطبع [[Deleted 1 rule(s).]] و [[Ok.]] (والرقم بيبقى ٢ لو كنت ضفتها مرتين). وزي الإضافة، محتاج أدمن.

---

## ٧. كود الحل: سيرفر من الموبايل

~~~cmd
netsh advfirewall firewall add rule name="Dev 8000" dir=in action=allow protocol=TCP localport=8000 profile=private
python -m http.server 8000
REM open http://YOUR-IP:8000 on the phone, then Ctrl+C
netsh advfirewall firewall delete rule name="Dev 8000"
~~~

1. نفس قاعدة الخطوة ٣ على بورت 8000.
2. [[python -m http.server 8000]] سيرفر ملفات بسيط جاي مع Python: [[-m]] يعني «شغّل module»، و [[http.server]] اسمه، و [[8000]] البورت. بيفضل شغال لحد Ctrl+C.
3. [[REM]] (من remark) سطر تعليق في CMD، مش بيتنفذ. بيقولك تفتح من الموبايل [[http://IP-جهازك:8000]] (الـ IP من [[ipconfig]]).
4. امسح القاعدة لما تخلص، عشان البورت ميفضلش مفتوح.

---

## الخلاصة

| عايز | الأمر |
|---|---|
| الفايروول شغال؟ وأنهي شبكة؟ | [[netsh advfirewall show currentprofile]] |
| أسامي القواعد | [[show rule name=all dir=in]] مع [[findstr /c:"Rule Name:"]] |
| قاعدة واحدة بالتفاصيل | [[show rule name="..." verbose]] |
| افتح بورت في البيت بس | [[add rule ... dir=in action=allow ... profile=private]] |
| امنع برنامج | [[add rule ... dir=out action=block program="..."]] |
| امسح | [[delete rule name="..."]] |

> الداخل ممنوع افتراضيًا والخارج مسموح. افتح أقل حاجة (بورت واحد، Private بس)، وامسحها لما تخلص، ومتقفلش الفايروول كله أبدًا.`,
          lines: [
            R`بيعرض الـ profile اللي ويندوز حاطط الشبكة الحالية عليه (Domain أو Private أو Public) وإعداداته: الفايروول شغال ولا لأ ([[State ON]])، والسياسة الافتراضية للداخل والخارج. مهم تعرفه الأول لأن كل قاعدة بتشتغل على profile معين.`,
            R`[[show rule name=all dir=in]] بيطبع كل القواعد الداخلة بتفاصيلها (مئات السطور)، و [[findstr]] بيسيب سطر الاسم بس. و [[/c:]] عشان [[Rule Name:]] فيها مسافة: من غيرها findstr هيدوّر على [[Rule]] أو [[Name:]] كل واحدة لوحدها ويجيب سطور كتير.`,
            R`بيضيف قاعدة تسمح بالاتصالات **الداخلة** ([[dir=in]]) على بورت TCP رقم 5173 على جهازك، على الشبكات الـ Private بس، فالموبايل اللي على نفس الواي فاي يقدر يفتح سيرفر Vite. محتاج CMD أدمن، ولو نجح بيطبع [[Ok.]]`,
            R`بيعرض القاعدة اللي لسه عاملها بالاسم، فتتأكد إن [[Enabled: Yes]] والبورت والـ profile صح. لو الاسم مش موجود بيطبع [[No rules match the specified criteria.]]، ودي نفس الرسالة اللي هتشوفها لو كتبت الاسم غلط.`,
            R`[[dir=out]] على الاتصالات **الخارجة**، و [[action=block]] امنع، و [[program=]] المسار الكامل للبرنامج، فالبرنامج ده بس مش هيقدر يكلم النت ولا الشبكة، وباقي الجهاز عادي. مفيد لبرنامج بيعمل تحديثات أو بيبعت بيانات وانت مش عايز.`,
            R`بيمسح قاعدة البورت بالاسم، فالبورت يرجع مقفول زي الأول. لو فيه أكتر من قاعدة بنفس الاسم بيمسحهم كلهم مرة واحدة، فاختار أسامي مميزة. محتاج أدمن.`,
            R`بيمسح قاعدة المنع، فالبرنامج يرجع يكلم النت عادي. متنساش تنضّف القواعد اللي عملتها للتجربة، لأنها بتفضل شغالة حتى بعد الـ restart لحد ما تمسحها.`,
          ],
          sol: R`[[netsh advfirewall show currentprofile]] طلّع عندي [[Public Profile Settings:]] وتحتها [[State ON]] و [[Firewall Policy BlockInbound,AllowOutbound]]، و [[show allprofiles state]] طلّع [[State ON]] تحت Domain و Private و Public. و [[show rule name=all dir=in | find /c "Rule Name:"]] عدّ 365 قاعدة داخلة (أغلبها بتاعة ويندوز و Docker و WSL)، و [[show rule name="Dev 5173"]] قبل ما تتعمل طلّع [[No rules match the specified criteria.]].

(الإضافة والمسح مشغّلتهمش هنا عشان ميغيّروش فايروول الجهاز؛ ده من توثيق Microsoft.) من CMD أدمن [[add rule]] بيطبع [[Ok.]]، و [[delete rule]] بيطبع [[Deleted 1 rule(s).]] و [[Ok.]]. بعد ما تضيف القاعدة، السيرفر نفسه لازم يكون سامع على كل الكروت مش localhost بس: [[python -m http.server]] سامع على الكل افتراضيًا، و Vite محتاج [[npm run dev -- --host]]. وافتح من الموبايل [[http://IP-جهازك:8000]] (الـ IP من ipconfig). ولو لسه مش بيفتح والشبكة Public، القاعدة بـ [[profile=private]] مش شغالة عليها: خلّي الشبكة Private.`,
          solCode: R`netsh advfirewall firewall add rule name="Dev 8000" dir=in action=allow protocol=TCP localport=8000 profile=private
python -m http.server 8000
REM open http://YOUR-IP:8000 on the phone, then Ctrl+C
netsh advfirewall firewall delete rule name="Dev 8000"`
        },
        {
          cmd: "netsh interface ip set address",
          title: "IP ثابت و DNS من سطر الأوامر",
          desc: R`[[netsh interface ip set address]] بيدّي كارت الشبكة IP ثابت بدل اللي الراوتر بيوزّعه، و [[set dns]] بيغيّر سيرفر الـ DNS، و [[dhcp]] بيرجّع الاتنين أوتوماتيك. مفيد لجهاز شغال كسيرفر في البيت (NAS أو جهاز بتعمله SSH أو طابعة) عشان عنوانه ميتغيّرش.

[[netsh interface show interface]] أسامي الكروت بالظبط (عمود [[Interface Name]]) وأنهي واحد [[Connected]]. الاسم بين علامات تنصيص لو فيه مسافة أو شرطة: [[name="Wi-Fi"]].
[[netsh interface ipv4 show config]] الإعدادات الحالية لكل كارت: [[DHCP enabled]] و [[IP Address]] و [[Default Gateway]] والـ DNS. ([[ip]] و [[ipv4]] هنا نفس الحاجة.)
[[set address name="Wi-Fi" static 192.168.1.50 255.255.255.0 192.168.1.1]] IP ثابت: العنوان، وبعده الـ mask ([[255.255.255.0]] يعني أول 3 أرقام هي الشبكة)، وبعده الـ gateway (الراوتر).
[[set dns name="Wi-Fi" static 1.1.1.1]] أول DNS، و [[add dns name="Wi-Fi" 8.8.8.8 index=2]] التاني ([[index]] ترتيبه).
[[set address name="Wi-Fi" dhcp]] و [[set dns name="Wi-Fi" dhcp]] رجّعهم أوتوماتيك من الراوتر.

كل [[set]] و [[add]] محتاج CMD كأدمن وبيقطع الاتصال ثانية أو اتنين. واختار IP برا مدى الـ DHCP بتاع الراوتر (من صفحة الراوتر، غالبًا من [[.100]] لـ [[.200]] أو حاجة زي كده)، وإلا الراوتر ممكن يدّي نفس العنوان لجهاز تاني.`,
          example: R`netsh interface show interface
netsh interface ipv4 show config name="Wi-Fi"
netsh interface ip set address name="Wi-Fi" static 192.168.1.50 255.255.255.0 192.168.1.1
netsh interface ip set dns name="Wi-Fi" static 1.1.1.1
netsh interface ip add dns name="Wi-Fi" 8.8.8.8 index=2
ping -n 2 192.168.1.1
netsh interface ip set address name="Wi-Fi" dhcp
netsh interface ip set dns name="Wi-Fi" dhcp`,
          try: R`اعرف اسم الكارت اللي انت متوصل بيه، والـ IP والـ gateway والـ DNS بتوعه من show config، واكتبهم. لو هتجرّب IP ثابت: جرّب وانت قدام الجهاز مش من Remote Desktop، ورجّع DHCP في الآخر.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[netsh interface ipv4 show config name="NoSuchAdapter-Lab"]] و [[echo %errorlevel%]]. الرسالة هتبقى «الكارت مش موجود»؟`, done: R`لأ: الرسالة [[The filename, directory name, or volume label syntax is incorrect.]] و [[errorlevel]] [[1]]. رسالة مضلّلة، فلما تشوفها مع netsh أول حاجة تشك فيها اسم الكارت (قارنه بعمود [[Interface Name]] في [[netsh interface show interface]]).` },
            { lvl: 'تطبيق', t: R`**مسألة:** الراوتر بيوزّع من [[192.168.1.100]] لـ [[192.168.1.200]] بـ mask [[255.255.255.0]]. أنهي من دول ينفع IP ثابت لجهازك: [[192.168.1.50]] و [[192.168.1.150]] و [[192.168.2.50]] و [[192.168.1.255]] و [[192.168.1.1]]؟ ليه؟`, done: R`[[192.168.1.50]] بس. [[.150]] جوه مدى الـ DHCP (الراوتر ممكن يدّيه لجهاز تاني)، و [[192.168.2.50]] شبكة تانية (أول ٣ أرقام لازم زي الراوتر مع الـ mask ده)، و [[.255]] عنوان الـ broadcast، و [[.1]] الراوتر نفسه.` },
            { lvl: 'تحدي', t: R`**ابني (في VM أو Windows Sandbox):** [[static-ip.bat]] بياخد لقطة من الإعدادات الحالية الأول ([[netsh interface ipv4 show config name="..." > before.txt]])، وبعدين يحط IP ثابت و DNS، ويعمل [[ping -n 2]] للـ gateway، ولو مردّش يرجّع [[dhcp]] للاتنين لوحده ويخرج بـ [[1]].`, done: R`على VM: بعد التشغيل [[show config]] بيقول [[DHCP enabled: No]] والـ IP الجديد، والـ ping للراوتر ردّ. ولو حطيت gateway غلط عن قصد، السكربت بيرجّع DHCP لوحده و [[show config]] يقول [[DHCP enabled: Yes]] تاني. (الأوامر من الدرس ومن توثيق netsh، ومتشغّلتش على جهاز التجربة لأنها بتغيّر الشبكة.)` },
          ],
          flag: "danger",
          deep: {
            why: R`جهاز في البيت عامل سيرفر عنوانه بيتغيّر كل كام يوم، فالـ bookmarks و ssh config بيبوظوا. أو عايز DNS تاني غير بتاع مزوّد الخدمة (أسرع، أو بيحجب الإعلانات). أو لابتوب اتساب عليه IP ثابت من شبكة شغل قديمة فمش بيتصل بأي حاجة في البيت. وكل ده سطر واحد ينفع يتحط في سكربت.`,
            how: R`DHCP: الجهاز لما يتصل بيطلب من الراوتر «ادّيني عنوان»، والراوتر بيدّيه واحد من مدى (pool) لمدة (lease) ومعاه الـ gateway والـ DNS. [[static]] بيخلّي الجهاز يستخدم اللي انت كتبته من غير ما يسأل. الأحسن غالبًا «DHCP reservation» من صفحة الراوتر: الراوتر يدّي نفس الـ IP دايمًا لنفس الـ MAC والجهاز يفضل DHCP، فلو نقلته لشبكة تانية يشتغل عادي.

الـ mask: [[255.255.255.0]] (أو [[/24]]) معناها أول 3 أرقام هي الشبكة والأخير للجهاز، فالأجهزة من [[.1]] لـ [[.254]] في نفس الشبكة، والـ IP والـ gateway لازم يبقوا فيها.

الـ DNS مستقل عن الـ IP: ينفع تسيب الـ IP أوتوماتيك وتغيّر الـ DNS بس، وأي DNS ثابت على كارت بيخلّيه يتجاهل الـ DNS اللي جاي من الراوتر. عندي [[show config]] طلّع كارت قديم [[Ethernet 2]] عليه [[DHCP enabled: No]] و [[Statically Configured DNS Servers: 8.8.8.8]] و [[8.8.4.4]]: إعداد ثابت اتعمل زمان، ولو الكابل ده اتوصل هيستخدمه. والواي فاي عليه [[DNS servers configured through DHCP]] يعني جاي من الراوتر.

بعد ما تغيّر الـ DNS اعمل [[ipconfig /flushdns]] (درس ipconfig). ولو بتغيّر الـ IP لجهاز بتكلمه عن بعد، الاتصال هيقطع ومش هترجع غير على العنوان الجديد. والمقابل في PowerShell: [[New-NetIPAddress]] و [[Set-DnsClientServerAddress]] (في تاب «PowerShell»)، والواجهة: Settings ثم Network & internet ثم الكارت ثم IP assignment و DNS server assignment.`,
            when: R`جهاز بيقدّم خدمة على شبكة البيت، تجربة DNS تاني (1.1.1.1 أو 8.8.8.8 أو DNS بيحجب إعلانات)، كارت عليه IP ثابت قديم ومحتاج يرجع أوتوماتيك، أو معمل أو شبكة صغيرة محتاجة عناوين معروفة.`,
            mistakes: R`IP ثابت جوه مدى الـ DHCP فجهازين ياخدوا نفس العنوان (ويندوز بيقول IP address conflict). أو gateway غلط: الشبكة المحلية شغالة والنت لأ. أو اسم الكارت مش مطابق: جرّبت [[show config name="NoSuchAdapter"]] وطلّع [[The filename, directory name, or volume label syntax is incorrect.]] مع إن الغلطة في الاسم مش في ملف، فانسخ الاسم من show interface. أو تنسى ترجّع DHCP على لابتوب فيروح شبكة تانية وميتصلش. أو تغيّر من Remote Desktop فتقفل الباب على نفسك.`
          },
          teach: R`## الأول: إحنا بنعمل إيه

لما جهازك يتصل بالواي فاي، بيسأل الراوتر: «ادّيني عنوان»، والراوتر بيدّيله IP و gateway و DNS. ده اسمه DHCP. الأوامر دي بتخلّيك تكتب الحاجات دي بإيدك (static) بدل ما الراوتر يقررها، وترجّعها أوتوماتيك تاني. ودايمًا بنفس الترتيب: **اعرف الأول، غيّر، اتأكد، رجّع**.

[[netsh]] هو network shell (درس netsh advfirewall firewall)، و [[interface]] قسم كروت الشبكة، و [[ip]] أو [[ipv4]] (هنا نفس الحاجة) جواه إعدادات IPv4. العرض اتشغّل هنا في CMD على ويندوز 11، والتغيير لأ (تحت ليه).

---

## ١. اسم الكارت: [[netsh interface show interface]]

كل أوامر التغيير محتاجة **اسم الكارت بالظبط**، فأول حاجة نعرفه:

~~~cmd
netsh interface show interface
~~~

~~~text الناتج
Admin State    State          Type             Interface Name
-------------------------------------------------------------------------
Enabled        Disconnected   Dedicated        Ethernet
Enabled        Disconnected   Dedicated        HotspotShield Network Adapter
Enabled        Disconnected   Dedicated        Ethernet 2
Enabled        Connected      Dedicated        Wi-Fi
~~~

| العمود | معناه |
|---|---|
| [[Admin State]] | الكارت متفعّل في ويندوز ولا انت قافله |
| [[State]] | متوصل بشبكة دلوقتي ولا لأ |
| [[Type]] | نوع الكارت. غالبًا [[Dedicated]]: كارت شبكة عادي، حتى كروت الـ VPN الافتراضية |
| [[Interface Name]] | الاسم اللي هتكتبه في كل الأوامر |

الكارت اللي [[Connected]] هنا هو [[Wi-Fi]]. والاسم فيه شرطة، وفيه كروت بمسافات ([[Ethernet 2]])، فدايمًا اكتبه بين علامات تنصيص: [[name="Wi-Fi"]].

---

## ٢. الإعدادات الحالية: [[show config]]

~~~cmd
netsh interface ipv4 show config name="Wi-Fi"
~~~

~~~text الناتج
Configuration for interface "Wi-Fi"
    DHCP enabled:                         Yes
    IP Address:                           192.168.1.65
    Subnet Prefix:                        192.168.1.0/24 (mask 255.255.255.0)
    Default Gateway:                      192.168.1.1
    Gateway Metric:                       0
    InterfaceMetric:                      40
    DNS servers configured through DHCP:  8.8.8.8
                                          8.8.4.4
                                          192.168.1.1
    Register with which suffix:           Primary only
    WINS servers configured through DHCP: None
~~~

| السطر | معناه |
|---|---|
| [[DHCP enabled: Yes]] | العنوان جاي أوتوماتيك من الراوتر |
| [[IP Address]] | عنوان جهازك على الشبكة |
| [[Subnet Prefix ... /24 (mask 255.255.255.0)]] | حدود الشبكة (تحت) |
| [[Default Gateway]] | الراوتر: أي حاجة برا الشبكة (النت) بتروحله |
| [[DNS servers configured through DHCP]] | سيرفرات الـ DNS، وجاية من الراوتر بردو |
| [[InterfaceMetric]] | أولوية الكارت لو متوصل بأكتر من كارت (الأقل يكسب) |

اكتب الأرقام دي قبل أي تغيير، عشان ترجعلها لو حاجة باظت. ولاحظ إن الأرقام دي بتتغيّر: في تجربة قبل كده على نفس الجهاز كان العنوان [[192.168.1.2]] والـ DNS غير ده (اللي في الحل تحت). ده بالظبط معنى DHCP: الراوتر بيدّيك اللي فاضي وقتها.

ولو الاسم غلط: جرّبت [[name="NoSuchAdapter"]] وطلع [[The filename, directory name, or volume label syntax is incorrect.]]. الرسالة بتتكلم عن ملف بس الغلطة في اسم الكارت، فانسخه من الخطوة ١.

---

## ٣. IP ثابت: [[set address ... static]]

~~~cmd
netsh interface ip set address name="Wi-Fi" static 192.168.1.50 255.255.255.0 192.168.1.1
~~~

هنا الترتيب هو اللي بيفرق، مش أسامي:

| الحتة | معناها |
|---|---|
| [[set address]] | غيّر عنوان الـ IP بتاع الكارت (الـ DNS ليه أمر لوحده) |
| [[name="Wi-Fi"]] | على الكارت ده |
| [[static]] | بإيدي، مش من الراوتر |
| [[192.168.1.50]] | العنوان الجديد، ولازم ميكونش مع جهاز تاني على الشبكة |
| [[255.255.255.0]] | الـ subnet mask: بيحدد أنهي عناوين معاك على نفس الشبكة (تحت) |
| [[192.168.1.1]] | الـ gateway (الراوتر) |

### الـ mask يعني إيه؟

العنوان ٤ أرقام. الـ mask بيقول أنهي جزء منهم «اسم الشبكة» وأنهي جزء «رقم الجهاز»: [[255]] يعني الرقم ده ثابت للشبكة كلها، و [[0]] يعني الرقم ده بيتغيّر من جهاز للتاني.

~~~text 255.255.255.0
192.168.1   .50
الشبكة       الجهاز
~~~

فكل الأجهزة من [[192.168.1.1]] لـ [[192.168.1.254]] في نفس الشبكة، و [[/24]] نفس المعنى بشكل تاني (أول ٢٤ bit، يعني أول ٣ أرقام × ٨). عشان كده العنوان والـ gateway لازم يبدأوا بنفس الـ [[192.168.1]].

### ليه 50 بالذات؟

لأي رقم برا المدى اللي الراوتر بيوزّع منه (من صفحة الراوتر، إعدادات DHCP). لو اخترت رقم جوه المدى، الراوتر ممكن يدّيه لجهاز تاني فيحصل IP address conflict.

---

## ٤. الـ DNS: [[set dns]] و [[add dns]]

~~~cmd
netsh interface ip set dns name="Wi-Fi" static 1.1.1.1
netsh interface ip add dns name="Wi-Fi" 8.8.8.8 index=2
~~~

الـ DNS هو اللي بيحوّل [[google.com]] لعنوان IP. السطر الأول [[set]] بيمسح أي DNS موجود ويحط [[1.1.1.1]] (بتاع Cloudflare) لوحده. السطر التاني [[add]] بيزوّد واحد من غير ما يمسح، و [[index=2]] ترتيبه: يتسأل لو الأول مردّش. [[8.8.8.8]] بتاع Google.

---

## ٥. اتأكد: [[ping -n 2 192.168.1.1]]

[[ping]] بيبعت رسالة صغيرة ويستنى الرد، و [[-n 2]] مرتين بس (درس ping / tracert / nslookup). لو الراوتر رد، يبقى العنوان والـ mask مظبوطين. على الجهاز ده (بالإعدادات الأوتوماتيك):

~~~text الناتج
Pinging 192.168.1.1 with 32 bytes of data:
Reply from 192.168.1.1: bytes=32 time=167ms TTL=64
Reply from 192.168.1.1: bytes=32 time=1ms TTL=64

Ping statistics for 192.168.1.1:
    Packets: Sent = 2, Received = 2, Lost = 0 (0% loss),
~~~

المهم [[Received = 2]] و [[0% loss]]. والـ [[time]] الوقت رايح جاي بالمللي ثانية: أول رد ممكن ياخد وقت أطول، والتاني (1ms) هو الطبيعي لراوتر في نفس البيت. وبعدها جرّب موقع ([[ping google.com]]) عشان تتأكد من الـ gateway والـ DNS مع بعض.

---

## ٦. رجّع أوتوماتيك: [[dhcp]]

~~~cmd
netsh interface ip set address name="Wi-Fi" dhcp
netsh interface ip set dns name="Wi-Fi" dhcp
~~~

[[dhcp]] مكان [[static]] والأرقام معناها «اسأل الراوتر تاني». ولازم السطرين: الـ IP والـ DNS إعدادين منفصلين، فلو رجّعت الأول بس هيفضل الـ DNS الثابت.

> كل [[set]] و [[add]] هنا محتاجين CMD كأدمن وبيقطعوا النت ثانية، فمشغّلتهمش على الجهاز ده؛ الكلام عنهم من توثيق netsh. ومن CMD عادي بيرفضوا بـ [[The requested operation requires elevation (Run as administrator).]].

---

## الخلاصة

| الخطوة | الأمر |
|---|---|
| ١. اسم الكارت | [[netsh interface show interface]] |
| ٢. اكتب الإعدادات الحالية | [[netsh interface ipv4 show config name="..."]] |
| ٣. IP ثابت | [[set address name="..." static IP MASK GATEWAY]] |
| ٤. DNS | [[set dns ... static]] وبعده [[add dns ... index=2]] |
| ٥. اتأكد | [[ping]] على الراوتر وبعدين على موقع |
| ٦. رجّع | [[set address ... dhcp]] و [[set dns ... dhcp]] |

> الـ IP والـ DNS حاجتين منفصلتين. والـ IP الثابت لازم يبقى في نفس الشبكة (أول ٣ أرقام مع mask 255.255.255.0) وبرا مدى الراوتر.`,
          lines: [
            R`بيعرض كل كروت الشبكة في جدول: متفعّلة ولا لأ، ومتوصلة ولا لأ، واسم كل كارت في آخر عمود. الاسم ده ([[Wi-Fi]] أو [[Ethernet]]) هو اللي هتكتبه في [[name=]] في كل الأوامر الجاية.`,
            R`بيعرض إعدادات كارت واحد ([[name="Wi-Fi"]]): الـ IP والـ mask والراوتر والـ DNS، وهل جايين من DHCP. احفظ الناتج ده قبل أي تغيير ([[> before.txt]])، عشان لو حبيت ترجع لنفس القيم بإيدك تلاقيها.`,
            R`[[static]] يعني العنوان هتكتبه انت مش هيجي من الراوتر، وبعدها 3 حاجات بالترتيب: العنوان الجديد، والـ mask، والراوتر (gateway). محتاج أدمن، والاتصال بيقطع ثانية. اختار عنوان بره المدى اللي الراوتر بيوزّعه عشان ميتخانقش مع جهاز تاني.`,
            R`[[set dns ... static]] بيمسح أي DNS قديم على الكارت ويحط [[1.1.1.1]] (Cloudflare) لوحده في اللستة. وعشان كده الاحتياطي بيتضاف في السطر اللي بعده بـ [[add]] مش [[set]]، وإلا كان هيمسح ده.`,
            R`[[add dns]] بيضيف سيرفر للستة من غير ما يمسح اللي فيها، و [[index=2]] بيحطه التاني في الترتيب: ويندوز يسأل [[1.1.1.1]] الأول، ولو مردّش يسأل [[8.8.8.8]] (Google). كده لو واحد وقع النت ميقفش.`,
            R`بعد أي تغيير، [[ping]] للراوتر مرتين يتأكد إن العنوان والـ mask صح والجهاز لسه شايف الشبكة. لو طلع [[Request timed out]] أو [[Destination host unreachable]] ارجع لـ DHCP بالسطرين اللي جايين.`,
            R`[[dhcp]] مكان [[static]] بيخلي الكارت ياخد العنوان والـ mask والراوتر أوتوماتيك من الراوتر، زي ما كان قبل التجربة. ده الأمر اللي ترجع بيه لو حاجة باظت.`,
            R`ونفس الحكاية للـ DNS: يرجع ياخده من الراوتر. لازم السطرين الاتنين، لأن العنوان والـ DNS إعدادين منفصلين، ولو رجّعت واحد بس التاني بيفضل ثابت.`,
          ],
          sol: R`[[netsh interface show interface]] طلّع عندي جدول [[Admin State  State  Type  Interface Name]]، وفيه [[Enabled  Connected  Dedicated  Wi-Fi]]، وكروت تانية [[Disconnected]] ([[Ethernet]] و [[Ethernet 2]] وكارت VPN). و [[netsh interface ipv4 show config name="Wi-Fi"]] طلّع:
[[DHCP enabled: Yes]]
[[IP Address: 192.168.1.2]]
[[Subnet Prefix: 192.168.1.0/24 (mask 255.255.255.0)]]
[[Default Gateway: 192.168.1.1]]
[[DNS servers configured through DHCP: 94.140.14.15]] و [[94.140.15.16]] (الراوتر بيوزّع DNS بتاع AdGuard).
دول اللي ترجعلهم لو حاجة باظت.

(الـ set والـ add مشغّلتهمش هنا عشان ميقطعوش نت الجهاز؛ ده من توثيق netsh.) من CMD عادي بيطلّعوا [[The requested operation requires elevation (Run as administrator).]]. ومن أدمن النت بيقطع لحظة، وبعدها show config بيوريك [[DHCP enabled: No]] و [[IP Address: 192.168.1.50]] و [[Statically Configured DNS Servers: 1.1.1.1]] وتحتها [[8.8.8.8]]. وبعد سطري [[dhcp]] بيرجع [[DHCP enabled: Yes]] والـ DNS [[configured through DHCP]].`
        },
        {
          cmd: "netsh wlan connect",
          title: "الواي فاي من الترمنال: الإشارة والقنوات والاتصال",
          desc: R`[[netsh wlan]] بيتحكم في الواي فاي من سطر الأوامر: بيعرض قوة الإشارة والقناة اللي انت عليها، والشبكات اللي حواليك وقنواتها، ويتصل ويفصل، وينقل الشبكات المحفوظة لجهاز جديد. (عرض باسورد شبكة محفوظة في درس netsh.)

[[show interfaces]] الاتصال الحالي: [[SSID]] اسم الشبكة، و [[Signal]] الإشارة بالنسبة المئوية، و [[Channel]] و [[Band]] (2.4 أو 5 GHz)، و [[Radio type]] (زي [[802.11ac]]، أو [[802.11ax]] اللي هو Wi-Fi 6)، و [[Receive rate (Mbps)]] سرعة الوصلة بين الجهاز والراوتر (مش سرعة النت).
[[show networks mode=bssid]] كل الشبكات اللي حواليك، ولكل راوتر ([[BSSID]]) إشارته وقناته. من هنا تعرف القنوات الزحمة وتختار لراوترك قناة أفضى.
[[connect name="HomeNet"]] اتصل بشبكة محفوظة (الاسم من [[show profiles]])، و [[disconnect]] افصل.
[[export profile key=clear folder=D:\wifi]] احفظ كل الشبكات المحفوظة كملفات XML ومعاها الباسوردات، و [[add profile filename="..."]] ضيف واحدة منهم على جهاز تاني.
[[delete profile name="OldCafe"]] انسى شبكة.
[[show wlanreport]] تقرير HTML عن الاتصالات والفصل والأخطاء آخر 3 أيام (CMD كأدمن).

على ويندوز 11 الحديث، [[show networks]] و [[show interfaces]] محتاجين إذن الموقع (Location)، لأن أسامي الشبكات اللي حواليك بتكشف انت فين. من غيره هتشوف [[Network shell commands need location permission to access WLAN information.]]، والحل: Settings ثم Privacy & security ثم Location، وشغّل Location services و Let desktop apps access your location ([[start ms-settings:privacy-location]] بيفتح الصفحة دي).`,
          example: R`netsh wlan show interfaces
netsh wlan show networks mode=bssid
netsh wlan show profiles
netsh wlan connect name="HomeNet"
mkdir D:\wifi
netsh wlan export profile key=clear folder=D:\wifi
netsh wlan add profile filename="D:\wifi\Wi-Fi-HomeNet.xml"
netsh wlan delete profile name="OldCafe"
netsh wlan show wlanreport`,
          try: R`اعرف إشارتك وقناتك من show interfaces، وبعدين show networks mode=bssid واكتب كل شبكة على أنهي قناة. لو راوترك على 2.4 GHz: أنهي قناة من 1 و 6 و 11 أفضى عندك؟`,
          practice: [
            { lvl: 'سريع', t: R`**بيانات حقيقية:** [[netsh wlan show interfaces | findstr /c:"Signal" /c:"Channel" /c:"Radio type" /c:"Band"]]. اكتب الأربع قيم، ولو طلعت رسالة الـ location اكتبها.`, done: R`٤ سطور زي [[Band                   : 2.4 GHz]] و [[Channel                : 7]] و [[Radio type             : 802.11n]] و [[Signal                 : 93%]] (دي من جهاز التجربة). أو [[Network shell commands need location permission to access WLAN information.]] لو الـ Location مقفول، والحل من الدرس.` },
            { lvl: 'تطبيق', t: R`**اشرحها:** من الأرقام اللي طلعت: الجهاز على قناة [[7]] في 2.4 GHz. اكتب لصاحب البيت ٣ سطور: ليه 7 مش أحسن اختيار، وأحسن قناة إيه، وإزاي تتأكد بـ [[show networks mode=bssid]].`, done: R`كتبت إن 2.4 GHz فيها ٣ قنوات بس مش متداخلة ([[1]] و [[6]] و [[11]])، و 7 بتتداخل مع 6 و 11 الاتنين، فتختار من التلاتة اللي عليها شبكات أقل في [[show networks mode=bssid]] (عدّ سطور [[Channel]] لكل رقم)، أو تنقل لـ 5 GHz لو الأجهزة بتدعمه.` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** من [[netsh wlan show /?]]: أنهي أمر بيقولك كارت الواي فاي بيدعم إيه (أنواع الـ radio والـ hosted network)؟ شغّله واقرا سطر [[Radio types supported]].`, done: R`[[netsh wlan show drivers]]، والسطر فيه أنواع زي [[802.11n 802.11g 802.11b 802.11ac 802.11ax]] حسب الكارت. ولو [[802.11ax]] موجود الكارت Wi-Fi 6 حتى لو متوصل دلوقتي بـ [[802.11n]] (يعني المشكلة في الراوتر أو القناة مش في الكارت).` },
            { lvl: 'تحدي', t: R`**ابني:** [[wifi-signal.bat N]] بيكتب الإشارة كل ٥ ثواني N مرة في [[signal.log]] (الوقت والنسبة)، من [[netsh wlan show interfaces]] بـ [[for /f "tokens=2 delims=:"]]، وفي الآخر يطبع أقل وأعلى قيمة. امشي بيه في البيت وانت شايل اللابتوب.`, done: R`[[signal.log]] فيه N سطر زي [[18:56:28.90 93%]]، والسكربت بيطبع [[min 41% max 93%]] (أرقامك انت). ولو الواي فاي اتفصل أثناء التشغيل بيكتب [[no signal]] للسطر ده ويكمّل من غير ما يقع.` },
          ],
          flag: "danger",
          deep: {
            why: R`«النت بطيء» ساعات مش من مزوّد الخدمة: إشارة ضعيفة، أو راوترك على نفس قناة جيران كتير، أو الجهاز على 2.4 GHz وهو يقدر على 5. الأرقام دي بتطلع في ثانية من الترمنال. وكمان جهاز جديد: بدل ما تكتب باسورد كل شبكة (البيت والشغل والأهل) بتنقلهم كلهم بأمرين.`,
            how: R`2.4 GHz فيها 13 قناة متداخلة، والقنوات اللي مش بتتداخل مع بعض 1 و 6 و 11 بس، فراوتر على 7 بيتأثر بأي شبكة من 3 لـ 11 تقريبًا. 5 GHz قنواتها أكتر ومش متداخلة ومداها أقصر، فلو الراوتر والجهاز بيدعموها استخدمها وانت في نفس الأوضة أو قريب. والقناة بتتغيّر من صفحة الراوتر مش من ويندوز.

الإشارة: 70% وطالع كويسة، وتحت 40% هتلاقي بطء وقطع. و [[Rssi]] نفس المعلومة بالـ dBm: [[-42]] ممتازة و [[-70]] ضعيفة. و [[Receive rate]] و [[Transmit rate]] سرعة الوصلة اللاسلكية، والنت الحقيقي أقل منها دايمًا.

[[export]] بيعمل ملف لكل شبكة اسمه [[Wi-Fi-اسم الشبكة.xml]] ([[Wi-Fi]] اسم الكارت)، والفولدر لازم يكون موجود. مع [[key=clear]] من CMD أدمن الباسورد بيتكتب واضح جوه [[keyMaterial]]، ومن غير أدمن بيتكتب مشفّر ومينفعش يتنقل لجهاز تاني (حسب توثيق Microsoft). الملفات دي فيها باسوردات كل شبكاتك، فامسحها بعد ما تضيفها.

[[connect]] بيشتغل بس على شبكة ليها profile محفوظ، و «اتصل» معناها إن الطلب اتبعت، فاتأكد بـ show interfaces. و [[show wlanreport]] بيحفظ التقرير في [[C:\ProgramData\Microsoft\Windows\WlanReport\wlan-report-latest.html]]، افتحه بـ [[start ""]] والمسار (درس start).`,
            when: R`الواي فاي بطيء أو بيقطع، اختيار قناة للراوتر، جهاز جديد أو بعد فرمتة، لابتوب عليه شبكات قديمة كتير محتاج تنضيف، أو سكربت بيتصل بشبكة معينة.`,
            mistakes: R`تسيب ملفات export بالباسوردات على الديسكتوب أو ترفعها في ريبو. أو تحكم على سرعة النت من Receive rate. أو تغيّر قناة الراوتر لـ 4 أو 9 (متداخلة مع الكل) بدل 1 و 6 و 11. أو [[connect]] على شبكة مش محفوظة قبل كده. أو تقفل Location وتستغرب إن show networks بقى بيقول Access is denied.`
          },
          teach: R`## الأول: [[wlan]] قسم الواي فاي في netsh

[[netsh wlan]] (wlan = wireless LAN، يعني شبكة محلية لاسلكية) قسم في netsh خاص بالواي فاي. نصه عرض (إشارتك، والشبكات اللي حواليك، والمحفوظ عندك)، ونصه تغيير (اتصل، صدّر، ضيف، امسح). العرض اتشغّل هنا في CMD على لابتوب ويندوز 11 فيه كارت Intel AX200، وغيّرت اسم الشبكة لـ HomeNet وخبّيت الـ MAC.

---

## ١. اتصالك دلوقتي: [[show interfaces]]

~~~cmd
netsh wlan show interfaces
~~~

~~~text الناتج (أهم السطور)
    Name                   : Wi-Fi
    Description            : Intel(R) Wi-Fi 6 AX200 160MHz
    Physical address       : 84:1b:77:xx:xx:xx
    State                  : connected
    SSID                   : HomeNet
    AP BSSID               : dc:51:93:xx:xx:xx
    Band                   : 2.4 GHz
    Channel                : 11
    Radio type             : 802.11n
    Authentication         : WPA2-Personal
    Receive rate (Mbps)    : 300
    Transmit rate (Mbps)   : 300
    Signal                 : 87%
    Rssi                   : -58
    Profile                : HomeNet
~~~

| السطر | معناه |
|---|---|
| [[Name]] و [[Description]] | اسم الكارت في ويندوز ونوعه |
| [[Physical address]] | الـ MAC بتاع الكارت بتاعك |
| [[SSID]] | اسم الشبكة اللي بتشوفه في قايمة الواي فاي |
| [[AP BSSID]] | الـ MAC بتاع الراوتر نفسه (AP = Access Point). شبكة واحدة ممكن يبقى ليها أكتر من BSSID |
| [[Band]] و [[Channel]] | الترددات: 2.4 أو 5 GHz، ورقم القناة جواها |
| [[Radio type]] | نسخة الواي فاي المستخدمة: [[802.11n]] (Wi-Fi 4)، [[802.11ac]] (Wi-Fi 5)، [[802.11ax]] (Wi-Fi 6) |
| [[Authentication]] | نوع الحماية. [[WPA2-Personal]] يعني باسورد واحد للكل |
| [[Receive rate]] و [[Transmit rate]] | سرعة الوصلة بين اللابتوب والراوتر بالـ Mbps، **مش** سرعة النت |
| [[Signal]] و [[Rssi]] | قوة الإشارة بالنسبة المئوية، ونفس المعلومة بالـ dBm |

### نقرا الأرقام

- [[Signal 87%]] كويسة (٧٠٪ وطالع كويس، وتحت ٤٠٪ هتلاحظ بطء). و [[Rssi -58]] رقم سالب: كل ما يقرّب من صفر الإشارة أقوى، فـ [[-42]] أحسن من [[-58]]، و [[-70]] ضعيفة.
- الكارت Wi-Fi 6، بس الاتصال [[802.11n]] على 2.4 GHz. يعني الحد هنا من الشبكة اللي انت عليها مش من اللابتوب (هنشوف ليه في الخطوة الجاية).
- [[300 Mbps]] سرعة الوصلة. النت الحقيقي أقل منها دايمًا.

> على ويندوز 11 الحديث، الأمر ده و [[show networks]] محتاجين إذن Location. من غيره بيطلع [[Network shell commands need location permission to access WLAN information.]].

---

## ٢. الشبكات اللي حواليك: [[show networks mode=bssid]]

[[show networks]] لوحده بيطبع أسامي الشبكات بس. و [[mode=bssid]] بيطبع كل راوتر (BSSID) لوحده بإشارته وقناته. الناتج طويل، فده لكل شبكة السطور المهمة بس (فلترتها بـ [[findstr]]):

~~~text الناتج (ملخّص)
There are 12 networks currently visible.

SSID 1 : WE_DF1A30_EXT      Signal 29%   2.4 GHz   Channel 7
SSID 2 :                    Signal 62%   2.4 GHz   Channel 5   (+ BSSID تاني على 5 GHz قناة 36)
SSID 3 : Home               Signal 46%   2.4 GHz   Channel 1
SSID 7 : HomeNet 5G         Signal 85%   5 GHz     Channel 52
SSID 9 : HomeNet            Signal 85%   2.4 GHz   Channel 11
SSID 10 : ...               Signal 60%   2.4 GHz   Channel 7
SSID 12 : ...               Signal 81%   2.4 GHz   Channel 1
...
~~~

وكل شبكة في الناتج الحقيقي شكلها كده:

~~~text شبكة واحدة كاملة
SSID 1 : WE_DF1A30_EXT
    Network type            : Infrastructure
    Authentication          : WPA2-Personal
    Encryption              : CCMP
    BSSID 1                 : 40:ed:00:xx:xx:xx
         Signal             : 29%
         Radio type         : 802.11n
         Band               : 2.4 GHz
         Channel            : 7
         Bss Load:
             Connected Stations:         3
             Channel Utilization:        70 (27 %)
~~~

- [[SSID 2 :]] من غير اسم: شبكة مخفية (hidden)، بتبعت إشارة بس مش بتعلن اسمها.
- [[BSSID 1]] و [[BSSID 2]] تحت نفس الـ SSID: نفس الشبكة من أكتر من راديو (2.4 و 5) أو أكتر من جهاز.
- [[Connected Stations]] عدد الأجهزة المتوصلة بالراوتر ده، و [[Channel Utilization]] القناة مشغولة قد إيه من وقتها (هنا ٢٧٪). مش كل الراوترات بتبعت السطور دي.

### نستفيد إيه؟

على 2.4 GHz القنوات اللي مش بتتداخل مع بعض هي [[1]] و [[6]] و [[11]] بس. هنا فيه ٣ شبكات على 7 و ٣ على 5، وكلهم بيضايقوا 6 و 11 شوية. والأهم: الراوتر نفسه عامل شبكة **5 GHz** ([[HomeNet 5G]]) بنفس الإشارة 85٪ على قناة 52 مفيش عليها حد، واللابتوب متوصل بالـ 2.4. فالحل الأسهل هنا مش تغيير قناة، الحل إنك تتصل بالـ 5G.

---

## ٣. المحفوظ عندك: [[show profiles]]

~~~cmd
netsh wlan show profiles
~~~

~~~text الناتج (الأسامي متغيّرة)
Profiles on interface Wi-Fi:

Group policy profiles (read only)
---------------------------------
    <None>

User profiles
-------------
    All User Profile     : HomeNet
    All User Profile     : Office
    All User Profile     : Cafe
    ...
~~~

كل شبكة اتصلت بيها قبل كده وحفظت باسوردها ليها profile. [[All User Profile]] يعني محفوظة لكل اليوزرز على الجهاز. وعلى الجهاز ده كان فيه ٢٤ profile، أغلبهم شبكات قديمة مش هيرجعلها تاني. الاسم اللي هنا هو اللي بتكتبه في [[connect]] و [[delete]].

---

## ٤. اتصل: [[connect name="HomeNet"]]

[[connect]] بيطلب من الكارت يتصل، و [[name=]] اسم الـ profile من الخطوة ٣ (لازم يكون محفوظ قبل كده، عشان الباسورد جواه). حسب التوثيق بيطبع [[Connection request was completed successfully.]]، وده معناه إن الطلب اتبعت مش إن الاتصال نجح، فاتأكد بـ [[show interfaces]]. مشغّلتهوش هنا عشان ميقطعش اتصال الجهاز.

---

## ٥. انقل الشبكات لجهاز تاني: [[export]] و [[add profile]]

~~~cmd
mkdir D:\wifi
netsh wlan export profile key=clear folder=D:\wifi
netsh wlan add profile filename="D:\wifi\Wi-Fi-HomeNet.xml"
~~~

1. [[mkdir D:\wifi]] اعمل فولدر (درس mkdir)، لأن export مش بيعمله لوحده.
2. [[export profile]] من غير [[name=]] بيصدّر **كل** الشبكات، ملف XML لكل واحدة اسمه [[Wi-Fi-اسم الشبكة.xml]] (أول جزء اسم الكارت). و [[key=clear]] اكتب الباسورد واضح جوه الملف (في خانة [[keyMaterial]])، وده محتاج CMD أدمن؛ من غيره الباسورد بيتكتب مشفّر ومينفعش يتنقل لجهاز تاني. و [[folder=]] فين.
3. على الجهاز الجديد: [[add profile filename="..."]] ضيف الشبكة من الملف، والمسار بين علامات تنصيص.

حسب التوثيق، export بيطبع لكل شبكة [[Interface profile "HomeNet" is saved in file "D:\wifi\Wi-Fi-HomeNet.xml" successfully.]]. الملفات دي فيها باسوردات كل شبكاتك: امسحها بعد ما تخلص.

---

## ٦. انسى شبكة وتقرير: [[delete]] و [[wlanreport]]

[[netsh wlan delete profile name="OldCafe"]] بيمسح الـ profile (الجهاز مش هيتصل بيها لوحده تاني). و [[show wlanreport]] بيعمل تقرير HTML عن الاتصالات والفصل آخر ٣ أيام. من CMD عادي هنا طلّع:

~~~text الناتج
You must run this command from a command prompt with administrator privilege.
~~~

ومن أدمن بيحفظه في [[C:\ProgramData\Microsoft\Windows\WlanReport\wlan-report-latest.html]].

---

## الخلاصة

| عايز | الأمر |
|---|---|
| إشارتي وقناتي وسرعة الوصلة | [[show interfaces]] |
| الشبكات اللي حواليا وقنواتها | [[show networks mode=bssid]] |
| الشبكات المحفوظة | [[show profiles]] |
| اتصل بواحدة محفوظة | [[connect name="..."]] |
| انقلهم لجهاز جديد | [[export profile key=clear folder=...]] ثم [[add profile filename=...]] |
| انسى شبكة | [[delete profile name="..."]] |

> [[Receive rate]] مش سرعة النت. والإشارة الكويسة على 2.4 GHz مش أحسن حاجة: لو الراوتر عنده 5 GHz وانت قريب، اتصل بيها.`,
          lines: [
            R`[[show interfaces]] بيعرض كارت الواي فاي واتصاله دلوقتي: اسم الشبكة ([[SSID]])، و [[Band]] و [[Channel]]، وسرعة الاستقبال والإرسال، والإشارة ([[Signal]]) كنسبة مئوية. أول أمر تشغّله لما النت بطيء عشان تعرف الإشارة ضعيفة ولا المشكلة في حتة تانية.`,
            R`[[show networks]] بيعرض الشبكات اللي الكارت شايفها حواليك دلوقتي، و [[mode=bssid]] بيفصّل كل راوتر (BSSID) لوحده بإشارته وقناته والـ [[Band]] (2.4 ولا 5 GHz). مفيد تعرف القنوات الزحمة، أو ليه شبكة واحدة ليها أكتر من راوتر.`,
            R`بيطبع أسامي الشبكات اللي الجهاز حفظها قبل كده (الـ profiles) تحت [[All User Profile]]. الأسامي دي بالظبط هي اللي بتتكتب في [[name=]] في [[connect]] و [[delete]].`,
            R`بيتصل بشبكة محفوظة قبل كده باسم الـ profile بتاعها (زي ما ظهر في [[show profiles]] بالظبط). مش بيسأل باسورد لأنه محفوظ في الـ profile، وبيرجع على طول، فاتأكد بعدها بـ [[netsh wlan show interfaces]] إن الحالة [[connected]].`,
            R`بيعمل فولدر فاضي تتجمع فيه ملفات التصدير في مكان واحد معروف. الفولدر ده هيبقى فيه باسوردات مكتوبة واضحة، فامسحه بعد ما تنقل الملفات للجهاز الجديد.`,
            R`[[export profile]] من غير [[name=]] بيصدّر كل الشبكات المحفوظة، ملف XML لكل واحدة جوه [[folder=]]، واسمه زي [[Wi-Fi-HomeNet.xml]] (اسم الكارت وبعده اسم الشبكة). و [[key=clear]] بيكتب الباسورد واضح جوه الملف (محتاج أدمن)، ومن غيره بيبقى متشفّر بمفتاح الجهاز ده ومينفعش ينقل.`,
            R`على الجهاز الجديد: [[add profile]] بيقرا ملف XML ويضيف الشبكة بإعداداتها وباسوردها، فالجهاز يتصل بيها لوحده لما يشوفها. [[filename=]] بالمسار الكامل للملف، والتنصيص عشان المسار ممكن يبقى فيه مسافات.`,
            R`[[delete profile]] بيمسح الشبكة دي من المحفوظ، فالجهاز ميحاولش يتصل بيها لوحده تاني. مفيد لشبكة كافيه قديمة الجهاز بيتعلق فيها بدل شبكة البيت. ولو احتجتها تاني هتكتب الباسورد من الأول.`,
            R`[[show wlanreport]] بيعمل تقرير HTML فيه اتصالات وانقطاعات الواي فاي في آخر 3 أيام ومعاها الأسباب، وبيطبع مسار الملف في الآخر. محتاج CMD أدمن، وافتح الملف بـ [[start]] والمسار اللي طلع.`,
          ],
          sol: R`[[netsh wlan show interfaces]] طلّع عندي (غيّرت اسم الشبكة): [[Description : Intel(R) Wi-Fi 6 AX200 160MHz]] و [[SSID : HomeNet]] و [[Band : 2.4 GHz]] و [[Channel : 7]] و [[Radio type : 802.11n]] و [[Receive rate (Mbps) : 130]] و [[Signal : 94%]] و [[Rssi : -42]]. الإشارة ممتازة، بس الكارت Wi-Fi 6 ([[show drivers]] قال [[Radio types supported : 802.11b 802.11g 802.11n 802.11a 802.11ac 802.11ax]]) وشغال 802.11n على 2.4 GHz، يعني الراوتر هو اللي محدد السرعة مش اللابتوب.

[[show networks mode=bssid]] طلّع [[There are 10 networks currently visible.]]، كلهم 2.4 GHz على القنوات 1 و 4 و 5 و 7 و 8 و 9 و 10 و 11، وواحدة منهم على قناتي 7، وشبكة مخفية (من غير اسم) [[Authentication : Open]] و [[Encryption : None]]. أفضى قناة هنا 11: عليها 3 شبكات إشاراتهم ضعيفة (من 18% لـ 35%)، و 1 عليها شبكة واحدة بس قوية (70%). و [[show wlanreport]] من CMD عادي طلّع [[You must run this command from a command prompt with administrator privilege.]]. (الموقع كان مسموح على الجهاز ده، فـ show networks اشتغل.)

(الاتصال والتصدير والإضافة والمسح مشغّلتهمش عشان ميغيّروش شبكات الجهاز.) [[connect]] لو اتقبل بيطبع [[Connection request was completed successfully.]]، و [[export]] بيطبع لكل شبكة [[Interface profile "HomeNet" is saved in file "D:\wifi\Wi-Fi-HomeNet.xml" successfully.]].`
        },
        {
          cmd: "netsh winsock reset",
          title: "النت بايظ على جهاز واحد: التصليح بالترتيب",
          desc: R`لما النت مش شغال على جهازك بس (الموبايل على نفس الواي فاي شغال)، فيه ترتيب أوامر بيصلّح أغلب الحالات من الأخف للأتقل. [[netsh winsock reset]] و [[netsh int ip reset]] هما الأتقل: بيرجّعوا إعدادات الشبكة في ويندوز لأصلها ومحتاجين restart.

بالترتيب، من CMD كأدمن، وقف عند أول خطوة تحل المشكلة:
1. [[ipconfig /release]] و [[ipconfig /renew]]: سيب الـ IP واطلب جديد من الراوتر (درس ipconfig /release /renew).
2. [[ipconfig /flushdns]]: امسح كاش الـ DNS.
3. [[netsh winsock reset]]: رجّع Winsock لحالته الأصلية. Winsock هو الطبقة اللي البرامج بتكلم بيها الشبكة، والـ reset بيشيل أي LSP: إضافات برامج (VPN قديمة أو antivirus) بتحشر نفسها في الطريق، ولما تتشال غلط بتقطع النت عن كل البرامج.
4. [[netsh int ip reset]]: رجّع إعدادات TCP/IP في الريجستري لأصلها، كأنك شيلت TCP/IP وسطّبته تاني. أي IP أو DNS ثابت بيروح والكروت ترجع DHCP. و [[int]] اختصار [[interface]]، والملف اللي بعده ([[C:\resetlog.txt]]) لوج بكل اللي اتغيّر.
5. restart، ودي جزء من الحل مش اختياري.

الأتقل من ده كله: Settings ثم Network & internet ثم Advanced network settings ثم Network reset. بيشيل كل كروت الشبكة ويسطّبها تاني بإعداداتها الأصلية، وبعده ممكن تحتاج تسطّب أو تظبط تاني برامج VPN والـ virtual switches (Hyper-V وغيره)، والجهاز بيعمل restart لوحده بعد دقايق.`,
          example: R`netsh winsock show catalog | findstr /c:"Description:"
ipconfig /release
ipconfig /renew
ipconfig /flushdns
netsh winsock reset
netsh int ip reset C:\resetlog.txt
shutdown /r /t 0`,
          try: R`من غير ما تصلّح حاجة: اعرض الـ Winsock catalog بالسطر الأول، وشوف فيه أي اسم غير MSAFD و RSVP و Hyper-V و Bluetooth و AF_UNIX. ولو النت بايظ عندك فعلًا، امشي بالترتيب ووقف عند أول خطوة تحل المشكلة.`,
          practice: [
            { lvl: 'سريع', t: R`**بيانات حقيقية:** [[netsh winsock show catalog | find /c "Description:"]]. كام entry؟ وبعدين اعرض الأسامي بس بـ [[findstr /c:"Description:"]] وشوف لو فيه اسم برنامج مش من ويندوز.`, done: R`طلعلك رقم (على جهاز التجربة [[38]])، والأسامي كلها من النوع اللي في الدرس (MSAFD و RSVP و Hyper-V و AF_UNIX وغيرهم). لو لقيت اسم برنامج VPN أو antivirus قديم اتشال، ده المشتبه بيه الأول.` },
            { lvl: 'تطبيق', t: R`**اشرحها:** رتّب الخطوات دي من الأخف للأتقل واكتب جنب كل واحدة إيه اللي بيتمسح: [[netsh int ip reset]]، Network reset من Settings، [[ipconfig /flushdns]]، [[netsh winsock reset]]، [[ipconfig /release]] و [[/renew]].`, done: R`الترتيب: release/renew (الـ IP بس) ثم flushdns (كاش الأسامي) ثم winsock reset (الـ LSPs بتاعة البرامج) ثم int ip reset (أي IP أو DNS ثابت بيروح) ثم Network reset (الكروت نفسها بتتسطّب تاني، وبرامج VPN ممكن تحتاج تتظبط تاني). وكل واحدة من الـ ٣ الأخيرة محتاجة restart.` },
            { lvl: 'تحدي', t: R`**ابني:** [[net-before-reset.bat]] بياخد لقطة قبل أي reset في فولدر بالتاريخ: [[netsh winsock show catalog]] و [[ipconfig /all]] و [[netsh interface ipv4 show config]] و [[route print]]، عشان لو حاجة باظت بعد الـ reset تعرف كان فيه إيه. (السكربت قراية بس؛ الـ reset نفسه من الدرس وفي VM.)`, done: R`الفولدر فيه ٤ ملفات مش فاضيين، وأي IP ثابت أو DNS متغيّر باين في ملف الـ config، وتشغيله مرتين بيعمل فولدرين بأسامي مختلفة. واتأكدت إن مفيش ولا سطر فيه [[reset]] في السكربت ([[findstr /i reset net-before-reset.bat]] مطلّعش حاجة).` },
          ],
          flag: "danger",
          deep: {
            why: R`فيه مشاكل نت سببها الجهاز نفسه مش الراوتر: برنامج VPN أو antivirus اتشال وساب وراه إعدادات، أو IP ثابت قديم، أو كاش DNS فيه ردود غلط. الأعراض: الموبايل شغال والجهاز لأ، أو [[ping]] شغال والمتصفح لأ، أو «No internet» والواي فاي متصل. الخطوات دي بتصلّح ده من غير فرمتة، وبالترتيب عشان متعملش الأتقل وهو مش محتاج.`,
            how: R`كل خطوة بتصلّح طبقة: release و renew العنوان نفسه (والـ gateway والـ DNS اللي جايين معاه). و flushdns الكاش اللي ويندوز حافظه عن الدومينات. و winsock reset الـ catalog اللي بيقول مين بيتعامل مع اتصالات البرامج: البرامج بتنادي Winsock، و Winsock بيعدّي على أي LSP متسجل قبل ما يوصل لـ TCP/IP، فلو LSP بايظ كل البرامج بتقع. و int ip reset بيكتب فوق مفاتيح الريجستري [[SYSTEM\CurrentControlSet\Services\Tcpip\Parameters]] و [[SYSTEM\CurrentControlSet\Services\DHCP\Parameters]]، واللوج بيقولك كل مفتاح اتغيّر وقيمته القديمة.

قبل ما توصل للخطوات دي، اتأكد إن المشكلة في الجهاز وعند أنهي طبقة (درس ping / tracert / nslookup): [[ping 192.168.1.1]] (الراوتر) شغال؟ [[ping 1.1.1.1]] (IP على النت من غير DNS) شغال؟ [[nslookup google.com]] بيرد؟ لو الأولاني بس اللي واقع المشكلة في الواي فاي أو الكابل، ولو التالت بس يبقى DNS.

LSPs بقت نادرة في ويندوز الحديث (أغلب البرامج بقت تستخدم طرق تانية)، فـ winsock reset بقى بيفرق أقل من زمان. و [[netsh winsock show catalog]] بيوريك هل فيه حاجة غريبة قبل ما تمسح. و [[netsh int ipv6 reset]] نفس فكرة int ip reset لـ IPv6.`,
            when: R`الجهاز ده بس اللي مفيهوش نت، بعد ما شلت VPN أو antivirus، بعد ما رجعت من شبكة كان عليها IP ثابت، أو «No internet» والواي فاي متصل.`,
            mistakes: R`تبدأ بـ Network reset أو int ip reset على طول قبل الخطوات الخفيفة. أو int ip reset على جهاز عليه IP ثابت مقصود (سيرفر في البيت) فيروح (هتلاقيه في اللوج). أو تنسى الـ restart وتقول «مفيش فايدة». أو [[/release]] من Remote Desktop فتفصل نفسك. أو تصلّح الجهاز والمشكلة أصلًا في الراوتر أو عند مزوّد الخدمة (الموبايل كمان مفيهوش نت).`
          },
          teach: R`## الأول: الفكرة طبقات

النت بيوصل لبرامجك على طبقات: الكارت ياخد عنوان من الراوتر، وويندوز يحوّل أسامي المواقع لعناوين (DNS)، والبرامج تكلم الشبكة من خلال Winsock، و Winsock يسلّم لـ TCP/IP. أي طبقة ممكن تبوظ، والأوامر في المثال كل واحد بيصلّح طبقة، **مرتبين من الأخف للأتقل**. فبتمشي واحد واحد وتوقف أول ما النت يرجع.

أول سطر بس عرض، والباقي بيغيّر إعدادات الشبكة أو بيقطع النت، فمشغّلتهوش على الجهاز ده (الكلام عنه من توثيق Microsoft). كله في CMD كأدمن.

---

## ٠. قبل ما تصلّح: [[netsh winsock show catalog]]

~~~cmd
netsh winsock show catalog | findstr /c:"Description:"
~~~

### يعني إيه catalog؟

Winsock (من Windows Sockets) هو الطبقة اللي أي برنامج بيكلم بيها الشبكة. و الـ catalog لستة «المزوّدين» (providers) اللي Winsock بيعدّي عليهم. ويندوز بيحط فيها مزوّدينه، وبرامج زي VPN قديمة أو antivirus كانت بتحشر نفسها فيها كـ LSP (Layered Service Provider): طبقة في النص كل اتصالات البرامج بتعدّي عليها. لو البرنامج ده اتشال غلط، الطبقة بتفضل في السكة وتقطع النت عن كل البرامج.

### الأمر

- [[show catalog]] اعرض اللستة. الناتج طويل (حوالي ١٥ سطر لكل مزوّد).
- [[| findstr /c:"Description:"]] خد سطر الاسم بس من كل واحد (درس findstr).

~~~text الناتج على ويندوز 11 هنا
Description:                        Hyper-V RAW
Description:                        AF_UNIX
Description:                        MSAFD Tcpip [TCP/IPv6]
Description:                        MSAFD Tcpip [UDP/IPv6]
Description:                        MSAFD Tcpip [RAW/IPv6]
Description:                        MSAFD Tcpip [TCP/IP]
Description:                        MSAFD Tcpip [UDP/IP]
Description:                        MSAFD Tcpip [RAW/IP]
Description:                        RSVP TCPv6 Service Provider
Description:                        RSVP TCP Service Provider
Description:                        RSVP UDPv6 Service Provider
Description:                        RSVP UDP Service Provider
Description:                        MSAFD L2CAP [Bluetooth]
Description:                        MSAFD RfComm [Bluetooth]
... (نفس الـ ١٤ تاني)
Description:                        E-mail Naming Shim Provider
Description:                        Tcpip
Description:                        NTDS
Description:                        @%SystemRoot%\system32\nlasvc.dll,-1000
Description:                        Bluetooth Namespace
... (ونفس الخمسة تاني)
~~~

### نقراه

| الاسم | ده إيه |
|---|---|
| [[MSAFD Tcpip [...]]] | مزوّد ويندوز لـ TCP و UDP، على IPv4 و IPv6 |
| [[RSVP ...]] | مزوّد ويندوز قديم لحجز جودة الاتصال |
| [[Hyper-V RAW]] و [[AF_UNIX]] | بتوع ويندوز (الأجهزة الافتراضية، و Unix sockets) |
| [[MSAFD L2CAP]] و [[RfComm [Bluetooth]]] | بتوع البلوتوث |
| الخمسة الأخيرين | namespace providers: بيحوّلوا الأسامي لعناوين، والـ reset مش بيلمسهم |

اللستة متكررة مرتين لأن ويندوز 64-bit عنده catalog للبرامج الـ 64-bit وواحد للـ 32-bit. وكل حاجة هنا بتاعة ويندوز، فـ winsock reset مش هيفرق على الجهاز ده. ولو شفت اسم برنامج (VPN، antivirus، كلمة proxy، أو حاجة مش عارفها)، ده المشتبه فيه. ومن غير [[findstr]] هتلاقي لكل مزوّد [[Entry Type: Base Service Provider]] (مزوّد أساسي)، والـ LSP بيبان مكتوب عليه Layered.

---

## ١. عنوان جديد: [[ipconfig /release]] و [[/renew]]

~~~cmd
ipconfig /release
ipconfig /renew
~~~

[[ipconfig]] (IP configuration) بيعرض ويغيّر عنوان الكروت (درس ipconfig /release /renew). [[/release]] سيب العنوان اللي معاك (النت بيقطع هنا)، و [[/renew]] اطلب عنوان جديد من الراوتر بالـ DHCP. ده بيصلّح عنوان غلط أو منتهي، ومعاه الـ gateway والـ DNS اللي جايين من الراوتر.

---

## ٢. كاش الأسامي: [[ipconfig /flushdns]]

ويندوز بيحفظ ردود DNS (اسم الموقع وعنوانه) فترة عشان ميسألش كل مرة. لو اتحفظ رد غلط، الموقع ده بس يفضل مبيفتحش. [[/flushdns]] بيمسح الكاش ده. جرّبته هنا من CMD عادي وطلّع:

~~~text الناتج
The requested operation requires elevation.
~~~

يعني على ويندوز ده حتى الخطوة دي محتاجة أدمن. ومن أدمن بيطبع [[Successfully flushed the DNS Resolver Cache.]] (حسب التوثيق).

---

## ٣. Winsock لأصله: [[netsh winsock reset]]

[[netsh]] هو network shell، و [[winsock]] القسم، و [[reset]] رجّعه لحالته الأصلية: catalog فيه مزوّدين ويندوز بس، وأي LSP بيتشال. حسب التوثيق بيطبع:

~~~text الناتج
Successfully reset the Winsock Catalog.
You must restart the computer in order to complete the reset.
~~~

---

## ٤. TCP/IP لأصله: [[netsh int ip reset C:\resetlog.txt]]

| الحتة | معناها |
|---|---|
| [[int]] | اختصار [[interface]]، netsh بيقبل أول حروف الكلمة لو مش ملخبطة مع غيرها |
| [[ip]] | إعدادات IPv4 |
| [[reset]] | رجّعها لأصلها في الريجستري، كأنك شيلت TCP/IP وسطّبته تاني |
| [[C:\resetlog.txt]] | ملف لوج بيتكتب فيه كل مفتاح اتغيّر وقيمته القديمة |

ده الأتقل: أي IP أو DNS ثابت عملته (درس netsh interface ip set address) بيروح والكروت ترجع DHCP. واللوج هو اللي هيقولك كان إيه عشان ترجّعه. حسب التوثيق بيطبع سطر [[Resetting ..., OK!]] لكل جزء، وفي الآخر [[Restart the computer to complete this action.]]. و [[netsh int ipv6 reset]] نفس الفكرة لـ IPv6.

---

## ٥. [[shutdown /r /t 0]]

[[shutdown]] (درس shutdown) و [[/r]] restart و [[/t 0]] بعد صفر ثانية. الـ restart هنا جزء من التصليح: الرسالتين اللي فوق بيقولوا إن التغيير مش بيكمل غير بيه. احفظ شغلك الأول.

---

## الخلاصة: بالترتيب، ووقف عند أول خطوة تحل

| # | الأمر | بيصلّح | الثمن |
|---|---|---|---|
| ٠ | [[netsh winsock show catalog]] | ولا حاجة، بيوريك بس | مفيش |
| ١ | [[ipconfig /release]] و [[/renew]] | العنوان والـ gateway | النت يقطع ثواني |
| ٢ | [[ipconfig /flushdns]] | ردود DNS غلط | مفيش |
| ٣ | [[netsh winsock reset]] | LSP بايظ | restart |
| ٤ | [[netsh int ip reset]] | إعدادات TCP/IP بايظة | الـ IP الثابت يروح، و restart |
| ٥ | [[shutdown /r /t 0]] | بيكمّل ٣ و ٤ | — |

> قبل أي خطوة اتأكد إن المشكلة في الجهاز ده: لو الموبايل كمان مفيهوش نت، المشكلة في الراوتر أو عند مزوّد الخدمة.`,
          lines: [
            R`شوف مين متسجل في Winsock قبل ما تمسح (عرض بس).`,
            R`سيب الـ IP (النت بيقطع).`,
            R`اطلب IP جديد من الراوتر.`,
            R`امسح كاش الـ DNS.`,
            R`رجّع Winsock لأصله (أدمن، ومحتاج restart).`,
            R`رجّع إعدادات TCP/IP لأصلها، والـ IP الثابت بيروح، واللوج في الملف ده.`,
            R`restart دلوقتي عشان التصليح يكمل.`
          ],
          sol: R`السطر الأول طلّع عندي [[Description: MSAFD Tcpip [TCP/IP]]] و [[MSAFD Tcpip [UDP/IPv6]]] و [[RSVP TCP Service Provider]] و [[Hyper-V RAW]] و [[AF_UNIX]] و [[MSAFD L2CAP [Bluetooth]]] وفي الآخر [[E-mail Naming Shim Provider]] و [[Tcpip]] (دول namespace providers، والـ reset مش بيلمسهم). كله بتاع ويندوز، فـ winsock reset مش هيفرق على الجهاز ده. لو لقيت اسم برنامج (VPN أو antivirus أو «proxy» أو حاجة مش عارفها)، ده LSP وهو المشتبه فيه الأول.

(الخطوات نفسها مشغّلتهاش لأنها بتقطع النت وبتغيّر إعدادات الشبكة؛ ده من توثيق Microsoft.) [[netsh winsock reset]] بيطبع [[Successfully reset the Winsock Catalog.]] و [[You must restart the computer in order to complete the reset.]]. و [[netsh int ip reset C:\resetlog.txt]] بيطبع سطر [[Resetting ..., OK!]] لكل جزء، وفي الآخر [[Restart the computer to complete this action.]]. ومن CMD عادي الاتنين بيرفضوا ويطلبوا أدمن. واللوج فيه سطور زي [[reset ...\EnableDhcp]] وتحتها [[old REG_DWORD = 0]]، فلو كان عندك IP ثابت هتلاقيه هناك عشان ترجّعه.`
        },
        {
          cmd: "net share / net use",
          title: "شير فولدر ووصّل درايف شبكة",
          desc: R`[[net share]] بيعرض الفولدرات اللي جهازك عاملها شير على الشبكة، وبيعمل شير جديد أو يشيله. و [[net use]] الناحية التانية: بيوصّل فولدر متشير على جهاز تاني كدرايف بحرف (زي Z:)، ويعرض الدرايفات دي ويفصلها.

على الجهاز اللي فيه الملفات (CMD كأدمن):
[[net share Docs=D:\Docs /grant:Everyone,READ]] شير الفولدر D:\Docs باسم Docs. [[/grant:]] مين وإيه: [[READ]] قراية، و [[CHANGE]] قراية وكتابة، و [[FULL]] كل حاجة. وصلاحيات NTFS على الفولدر نفسه (درس icacls) لازم تسمح كمان، والأضيق من الاتنين هو اللي بيكسب. و [[/remark:"..."]] وصف.
[[net share]] لوحده: كل الشيرات. هتلاقي [[C$]] و [[ADMIN$]] و [[IPC$]]: شيرات إدارية ويندوز بيعملها لوحده، والـ [[$]] في آخر الاسم بتخفي الشير من لستة الأجهزة التانية.
[[net share Docs /delete]] شيل الشير (الفولدر نفسه مش بيتمسح).

على الجهاز التاني (مش محتاج أدمن):
[[net use Z: \\PC\Docs]] وصّل الشير كدرايف Z. و [[\\PC\Docs]] اسمه UNC path: اسم الجهاز (أو الـ IP) وبعده اسم الشير.
[[/user:PC\sara]] ادخل بيوزر من الجهاز التاني بدل يوزرك، و [[*]] بعد المسار يسألك على الباسورد.
[[/persistent:yes]] الدرايف يرجع لوحده بعد الـ restart.
[[net use]] لوحده: الدرايفات المتوصلة وحالتها، و [[net use Z: /delete]] افصل.

الشبكة لازم تبقى Private، و File and printer sharing مفعّل (Settings ثم Network & internet ثم Advanced network settings ثم Advanced sharing settings). و [[Everyone]] اسمه متترجم على ويندوز بلغة تانية زي Administrators (درس net localgroup).`,
          example: R`net share
net share Docs=D:\Docs /grant:Everyone,READ /remark:"Shared docs"
net use
net use Z: \\PC\Docs /persistent:yes
net use Y: \\192.168.1.50\Docs * /user:PC\sara
dir Z:\
net use Z: /delete
net use Y: /delete
net share Docs /delete`,
          try: R`اعرض الشيرات اللي على جهازك والدرايفات المتوصلة. ولو عندك جهازين على شبكة Private: شير فولدر قراية بس من واحد، ووصّله كدرايف على التاني، وبعدين شيل الاتنين.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[net share NoSuchShare-Lab]] و [[echo %errorlevel%]]، وبعدين [[net use]] لوحده على جهاز مفيهوش درايفات شبكة.`, done: R`الأول [[This shared resource does not exist.]] وتحتها [[More help is available by typing NET HELPMSG 2310.]] و [[errorlevel]] [[2]]. التاني [[New connections will be remembered.]] و [[There are no entries in the list.]] بكود [[0]].` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** الرقم [[2310]] في الرسالة دي. شغّل [[net helpmsg 2310]]، وجرّب كمان [[net helpmsg 53]] و [[net helpmsg 5]] و [[net helpmsg 1116]].`, done: R`كل رقم بيطبع الرسالة بتاعته بالإنجليزي: [[2310]] نفس «This shared resource does not exist.»، و [[53]] [[The network path was not found.]]، و [[5]] [[Access is denied.]]، و [[1116]] رسالة الـ shutdown اللي مكانش فيه حاجة يلغيها. كده لما سكربت يطبع رقم بس، تعرف معناه.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** [[net share]] بيعرض [[C$]] و [[ADMIN$]] و [[IPC$]]. اكتب الفرق بين التلاتة، وليه الـ [[$]] مش «حماية»، وجرّب [[dir \\localhost\C$]] من نافذة عادية واقرا الرد.`, done: R`كتبت إن [[C$]] الدرايف كله و [[ADMIN$]] فولدر ويندوز و [[IPC$]] للاتصالات (مش ملفات)، وإن [[$]] بيخفي الشير من اللستة بس، ومحدش بيدخل إلا الأدمن. وعلى جهاز التجربة (حساب أدمن، نافذة عادية) الـ [[dir]] اشتغل وطبع [[Directory of \\localhost\C$]]: الشير «المخفي» مفتوح لأي أدمن، ومن يوزر مش أدمن بيرد [[Access is denied.]] (حسب توثيق Microsoft للشيرات الإدارية). فـ [[$]] إخفاء مش قفل.` },
            { lvl: 'تحدي', t: R`**ابني (جهازين في البيت أو VMs):** [[map-share.bat]] بيوصّل [[\\PC\Docs]] على [[Z:]] لو مش متوصل أصلًا ([[net use Z: >nul 2>&1]] الأول)، ولو [[Z:]] ماسكه شير تاني يقول ومش يغيّره، ولو الشبكة مش موجودة يطبع رسالة مفهومة بدل [[System error 53]].`, done: R`تشغيله مرتين: التانية بتقول «متوصل أصلًا» ومش بتطلع error. ولو الجهاز التاني مقفول بيطبع رسالتك وبعدها الكود [[53]]. و [[net use]] بعدها فيه سطر [[Z:]] واحد بس. (الشير نفسه بيتعمل من نافذة أدمن على الجهاز التاني، مش على جهاز التجربة.)` },
          ],
          flag: "danger",
          deep: {
            why: R`تنقل ملفات بين جهازين في البيت أو المكتب من غير فلاشة ولا رفع على النت، أو فولدر مشترك لفريق صغير، أو سكربت باك أب بيكتب على جهاز تاني أو NAS. و [[net use]] كمان بيفتح جلسة ببيانات يوزر معين قبل أي أمر إدارة على الجهاز ده (درس shutdown /m).`,
            how: R`الشير بيشتغل ببروتوكول SMB على بورت 445. على الجهاز اللي عامل الشير، قواعد الفايروول «File and Printer Sharing» لازم تكون مفعّلة على الـ profile الحالي، وده بيحصل لوحده لما تشغّل File and printer sharing للشبكات الـ Private. لو الشبكة Public الشير مش هيبان، وده مقصود.

مين بيدخل؟ لما تفتح [[\\PC\Docs]]، الجهاز التاني بيطلب يوزر وباسورد موجودين عليه هو. لو نفس اسم اليوزر ونفس الباسورد على الجهازين بيدخل لوحده، غير كده [[/user:]]. لو اليوزر هناك حساب Microsoft اكتب الإيميل وباسورد الحساب (مش الـ PIN). ويوزر من غير باسورد مش بيدخل من الشبكة أصلًا.

الشيرات الإدارية ([[\\PC\C$]]) الدرايف كله، للأدمنز بس. وعلى أجهزة البيت (مش على دومين) فيه قيد اسمه UAC remote restrictions: يوزر محلي أدمن داخل من الشبكة بياخد توكن عادي، فـ [[C$]] بيطلع [[Access is denied]] حتى بباسورد صح. الحل اللي هتلاقيه على النت (قيمة [[LocalAccountTokenFilterPolicy]] في الريجستري) بيشيل الحماية دي خالص (التفاصيل في درس shutdown /m)، فاعمل شير عادي للفولدر اللي محتاجه بدل كده.

ويندوز 11 24H2 بقى بيطلب SMB signing افتراضيًا، و Pro (مش Home) قفل الدخول كـ guest من غير باسورد، فأجهزة NAS أو راوترات فيها USB ممكن متفتحش لحد ما تعمل عليها يوزر وباسورد. والمقابل في PowerShell: [[New-SmbShare]] و [[New-PSDrive]] (في تاب «PowerShell»).`,
            when: R`نقل ملفات في البيت أو المكتب، فولدر مشترك، درايف شبكة ثابت لسكربت باك أب، الوصول لـ NAS، أو جلسة بيوزر معين على [[IPC$]] قبل أوامر إدارة عن بعد.`,
            mistakes: R`شير بـ [[Everyone,FULL]] على فولدر فيه حاجات مهمة. أو شير على شبكة Public. أو [[net use]] من CMD أدمن ومتلاقيش الدرايف في Explorer: نافذة الأدمن ونافذتك العادية جلستين منفصلتين، فاعمله من CMD عادي. أو تتوصل لنفس الجهاز بيوزرين مختلفين فيطلع [[System error 1219]] ([[Multiple connections to a server or shared resource by the same user, using more than one user name, are not allowed.]])، والحل [[net use \\PC\IPC$ /delete]] أو [[net use * /delete]]. أو حرف الدرايف مستخدم ([[System error 85]]: [[The local device name is already in use.]]).`
          },
          teach: R`## الأول: جهازين، وكل واحد ليه أمر

فيه جهاز **فيه الملفات** وده بيستخدم [[net share]] («شيّر الفولدر ده»)، وجهاز **عايز الملفات** وده بيستخدم [[net use]] («وصّلني بالفولدر ده»). [[net]] نفسه برنامج قديم في ويندوز جواه أوامر كتير للشبكة واليوزرز ([[net user]] و [[net localgroup]] و [[net start]] وغيرهم)، والكلمة اللي بعده بتحدد الأمر.

العرض اتشغّل هنا في CMD على ويندوز 11. الإنشاء والتوصيل والمسح لأ، عشان ميغيّروش شيرات الجهاز (الكلام عنهم من التوثيق ومن الحل تحت).

---

## ١. الشيرات اللي على جهازك: [[net share]]

~~~cmd
net share
~~~

~~~text الناتج
Share name   Resource                        Remark

-------------------------------------------------------------------------------
C$           C:\                             Default share
D$           D:\                             Default share
E$           E:\                             Default share
IPC$                                         Remote IPC
ADMIN$       C:\WINDOWS                      Remote Admin
The command completed successfully.
~~~

| العمود | معناه |
|---|---|
| [[Share name]] | الاسم اللي الأجهزة التانية بتطلبه |
| [[Resource]] | الفولدر الحقيقي على جهازك |
| [[Remark]] | وصف |

الجهاز ده مش عامل أي شير، ومع ذلك فيه ٥. دول شيرات **إدارية** ويندوز بيعملها لوحده:

- [[C$]] و [[D$]] و [[E$]] كل درايف كله، للأدمنز بس.
- [[ADMIN$]] فولدر ويندوز، برامج الإدارة عن بعد بتستخدمه.
- [[IPC$]] (Inter-Process Communication) مش فولدر خالص: «باب» بتفتح عليه جلسة بيوزر وباسورد قبل أوامر الإدارة عن بعد (درس shutdown /m).

والـ [[$]] في آخر الاسم معناها «شير مخفي»: مش بيظهر في لستة الشيرات لما جهاز تاني يبص على جهازك، بس اللي يعرف اسمه يقدر يطلبه.

---

## ٢. اعمل شير: [[net share Docs=D:\Docs ...]]

~~~cmd
net share Docs=D:\Docs /grant:Everyone,READ /remark:"Shared docs"
~~~

| الحتة | معناها |
|---|---|
| [[Docs=D:\Docs]] | الاسم على الشبكة [[=]] الفولدر على جهازك. ينفع الاتنين يختلفوا |
| [[/grant:Everyone,READ]] | ادّي صلاحية: مين، وبعد الفاصلة إيه |
| [[Everyone]] | أي يوزر بيدخل |
| [[READ]] | قراية بس. أو [[CHANGE]] قراية وكتابة ومسح، أو [[FULL]] كل حاجة ومعاها تغيير الصلاحيات |
| [[/remark:"..."]] | الوصف اللي بيظهر في عمود Remark |

وفيه طبقتين صلاحيات: صلاحيات الشير دي، وصلاحيات NTFS على الفولدر نفسه (درس icacls). اللي داخل من الشبكة بياخد **الأضيق** من الاتنين. محتاج CMD كأدمن، وحسب التوثيق بيطبع [[Docs was shared successfully.]].

---

## ٣. الناحية التانية: [[net use]]

~~~cmd
net use
~~~

~~~text الناتج
New connections will be remembered.

There are no entries in the list.
~~~

لوحده بيعرض الدرايفات والجلسات اللي جهازك متوصل بيها على أجهزة تانية. السطر الأول معناه إن الإعداد الحالي «افتكر الاتصالات الجديدة بعد الـ restart» (ده اللي [[/persistent]] بيغيّره)، والتاني إن مفيش أي اتصال دلوقتي.

---

## ٤. وصّل درايف: [[net use Z: \\PC\Docs]]

~~~cmd
net use Z: \\PC\Docs /persistent:yes
~~~

- [[Z:]] حرف الدرايف اللي هيظهر عندك في Explorer. اختار حرف مش مستخدم.
- [[\\PC\Docs]] اسمه **UNC path** (Universal Naming Convention): [[\\]] في الأول معناها «جهاز على الشبكة»، وبعدها اسم الجهاز (أو الـ IP)، وبعدها [[\]] واسم الشير (اللي قبل [[=]] في الخطوة ٢، مش مسار الفولدر).
- [[/persistent:yes]] رجّع الدرايف ده لوحده بعد كل restart.

حسب التوثيق بيطبع [[The command completed successfully.]]، ومش محتاج أدمن. بالعكس: اعمله من CMD **عادي**، لأن نافذة الأدمن جلسة منفصلة والدرايف مش هيظهر في Explorer بتاعك.

### بيوزر من الجهاز التاني

~~~cmd
net use Y: \\192.168.1.50\Docs * /user:PC\sara
~~~

- [[\\192.168.1.50\Docs]] نفس الفكرة بالـ IP بدل الاسم (مفيد لما الاسم مش بيتعرف).
- [[*]] مكان الباسورد: «اسألني عليه». بيتكتب ومش بيظهر، وأحسن من إنك تكتبه في الأمر فيفضل في التاريخ.
- [[/user:PC\sara]] ادخل باليوزر [[sara]] اللي على الجهاز [[PC]]. الجهاز التاني بيتأكد من يوزر **موجود عنده هو**، مش يوزرك.

---

## ٥. استخدمه وافصل

~~~cmd
dir Z:\
net use Z: /delete
net use Y: /delete
net share Docs /delete
~~~

1. [[dir Z:\]] اعرض اللي في الدرايف زي أي درايف (درس dir).
2. [[net use Z: /delete]] افصل الدرايف من عندك. حسب التوثيق: [[Z: was deleted successfully.]].
3. نفس الحاجة لـ Y.
4. على جهاز الملفات: [[net share Docs /delete]] شيل الشير. الفولدر نفسه وملفاته مش بيتمسحوا، بس مبقاش متشير.

---

## ٦. الأخطاء اللي هتقابلها

كل خطأ في [[net]] بيطلع برقم: [[System error 53 has occurred.]]. و [[net helpmsg]] والرقم بيطبع معناه. طلّعتهم هنا:

| الرقم | [[net helpmsg]] بيقول | يعني |
|---|---|---|
| 53 | [[The network path was not found.]] | الجهاز مش باين: مقفول، أو الاسم غلط، أو الشبكة Public، أو File sharing مقفول |
| 1326 | [[The user name or password is incorrect.]] | يوزر أو باسورد غلط (على الجهاز التاني) |
| 85 | [[The local device name is already in use.]] | الحرف ده مستخدم عندك |
| 1219 | [[Multiple connections to a server or shared resource by the same user, using more than one user name, are not allowed. ...]] | متوصل بنفس الجهاز بيوزر تاني. افصل الأول ([[net use * /delete]]) |

---

## الخلاصة

| على أنهي جهاز | عايز | الأمر |
|---|---|---|
| اللي فيه الملفات | الشيرات | [[net share]] |
| اللي فيه الملفات | شير قراية بس | [[net share اسم=فولدر /grant:Everyone,READ]] (أدمن) |
| التاني | وصّل درايف | [[net use Z: \\جهاز\شير]] |
| التاني | بيوزر وباسورد | [[... * /user:جهاز\يوزر]] |
| التاني | افصل | [[net use Z: /delete]] |
| اللي فيه الملفات | شيل الشير | [[net share اسم /delete]] |

> الشيرات اللي بـ [[$]] ويندوز عاملها لوحده متقلقش منها. والشبكة لازم تبقى Private عشان أي ده يشتغل.`,
          lines: [
            R`[[net share]] لوحده بيعرض الفولدرات اللي جهازك مشاركها على الشبكة. هتلاقي شيرات إدارية ويندوز عاملها لوحده (اسمها بيخلص بـ [[$]]): [[C$]] الدرايف كله و [[ADMIN$]] فولدر ويندوز وده للأدمنز بس، و [[IPC$]] للاتصالات بين الأجهزة.`,
            R`على جهاز الملفات: [[Docs]] اسم الشير اللي الناس هتشوفه، وبعد [[=]] الفولدر الحقيقي. [[/grant:Everyone,READ]] الكل يقرا بس من غير تعديل، و [[/remark]] وصف بيظهر جنب الشير. محتاج CMD أدمن.`,
            R`على الجهاز التاني: [[net use]] لوحده بيعرض الدرايفات والجلسات المتوصلة بأجهزة تانية، وحالة كل واحد ([[OK]] أو [[Disconnected]] أو [[Unavailable]]). شغّله الأول عشان تعرف الحروف المحجوزة.`,
            R`[[Z:]] حرف الدرايف الجديد، و [[\\PC\Docs]] الشير على جهاز اسمه PC (اسم الجهاز وبعده اسم الشير). و [[/persistent:yes]] بيخلي ويندوز يرجّع الدرايف ده لوحده بعد كل restart.`,
            R`وصّل بالـ IP وبيوزر من الجهاز التاني، والـ [[*]] تسأل على الباسورد. ولأن [[/persistent]] مش مكتوب، [[net use]] بياخد آخر قيمة اتستخدمت، فـ Y هيرجع بعد الـ restart هو كمان زي Z.`,
            R`[[dir Z:\]] بيعرض الملفات اللي على الجهاز التاني كأنها على درايف عندك، وأي أمر زي [[copy]] و [[type]] بيشتغل عليه عادي، بس أبطأ لأنه بيعدّي على الشبكة. والكتابة هتترفض لأن الشير READ بس.`,
            R`بيفصل الدرايف [[Z:]] اللي اتوصل في السطر الرابع، ولأنه كان [[/persistent:yes]] بيتشال كمان من اللي ويندوز بيرجّعه بعد الـ restart. لو فيه ملفات مفتوحة منه هيسألك تأكيد قبل ما يفصل.`,
            R`بيفصل [[Y:]] كمان. افصل كل درايف خلصت منه، لأن الاتصال بيفضل شايل اليوزر والباسورد بتوع الجهاز التاني لحد ما تقفله.`,
            R`على جهاز الملفات: [[/delete]] بيشيل المشاركة بس، فمحدش يقدر يوصلها تاني، لكن الفولدر [[D:\Docs]] وملفاته فاضلين زي ما هم. محتاج أدمن.`,
          ],
          sol: R`[[net share]] على جهاز مش عامل أي شير طلّع:
[[Share name   Resource   Remark]]
[[C$   C:\   Default share]] وكمان [[D$]] و [[E$]] لكل درايف
[[IPC$      Remote IPC]]
[[ADMIN$   C:\WINDOWS   Remote Admin]]
و [[net use]] طلّع [[New connections will be remembered.]] و [[There are no entries in the list.]]. الشيرات اللي بـ [[$]] ويندوز بيعملها لوحده، ومش بتبان في Network على الأجهزة التانية.

(الإنشاء والتوصيل والمسح مشغّلتهمش عشان ميغيّروش شيرات الجهاز.) من CMD أدمن [[net share Docs=D:\Docs /grant:Everyone,READ]] بيطبع [[Docs was shared successfully.]]، و [[net use Z: \\PC\Docs]] بيطبع [[The command completed successfully.]]، و [[net use Z: /delete]] بيطبع [[Z: was deleted successfully.]]. ولو الجهاز التاني مش باين: [[System error 53 has occurred.]] و [[The network path was not found.]] (طلّعها عندي [[net view \\IP]] على موبايل على الشبكة)، ولو الباسورد غلط: [[System error 1326 has occurred.]] و [[The user name or password is incorrect.]].`
        },
        {
          cmd: "ping -a و nbtstat -A",
          title: "مين الأجهزة دي؟ اسم الجهاز من الـ IP",
          desc: R`بعد ما [[arp -a]] يوريك IPs الأجهزة اللي على شبكتك (درس arp / route)، الأوامر دي بتحاول تعرف اسم كل جهاز: [[ping -a]] و [[nbtstat -A]] و [[nslookup]]. كل واحد بيسأل بطريقة مختلفة وكتير منهم مش هيلاقي، فجرّب التلاتة. واستخدمهم على شبكتك انت أو بإذن صاحبها بس.

[[ping -a 192.168.1.20]] الـ [[-a]] بتخلّي ping يحوّل الـ IP لاسم قبل ما يبدأ، والاسم بيظهر في أول سطر: [[Pinging NAME [192.168.1.20]]]. لو ملقاش اسم بيكتب الـ IP بس. بيدوّر في ملف hosts الأول، وبعدين بكل الطرق اللي ويندوز يعرفها (DNS و mDNS و LLMNR و NetBIOS).
[[nbtstat -A 192.168.1.20]] (A كابيتال: بالـ IP) بيسأل الجهاز نفسه بـ NetBIOS عن اسمه، ويرد بجدول فيه اسم الجهاز ([[<00> UNIQUE]]) والـ workgroup ([[<00> GROUP]]) و [[<20>]] لو بيعمل شير، والـ MAC. بيشتغل بس لو الجهاز التاني ويندوز (أو Samba) و NetBIOS over TCP/IP شغال عليه وفايروله سامح. و [[nbtstat -a NAME]] (a صغيرة) العكس، بالاسم. و [[nbtstat -n]] الأسامي اللي جهازك نفسه معلنها.
[[nslookup 192.168.1.20]] بيسأل سيرفر الـ DNS (غالبًا الراوتر) عن اسم الـ IP (reverse lookup). راوترات بتسجّل أسامي الأجهزة اللي أخدت منها IP، وراوترات لأ.

[[net view]] زمان كان بيعرض كل الأجهزة اللي على الشبكة. على ويندوز 10 و 11 غالبًا بيطلّع [[System error 6118 has occurred.]] و [[The list of servers for this workgroup is not currently available]]، لأن الخدمة اللي كانت بتعمل اللستة دي (Computer Browser) اتشالت مع SMB1. و [[net view \\PC]] لسه بيعرض شيرات جهاز معين.`,
          example: R`arp -a
ping -a -n 1 192.168.1.1
nbtstat -A 192.168.1.20
nslookup 192.168.1.20
nbtstat -n
net view
net view \\192.168.1.20`,
          try: R`على شبكة بيتك: [[arp -a]]، وخد IP جهاز تاني (موبايل أو تليفزيون أو لابتوب)، وجرّب عليه الأوامر التلاتة وشوف أنهي واحد عرف اسمه. وقارن بلستة الأجهزة في صفحة الراوتر.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[ping -a -n 1 127.0.0.1 | findstr /c:"Pinging"]]. الطبيعي يطلع [[localhost]] أو اسم جهازك. جرّب وشوف عندك.`, done: R`على جهاز التجربة طلع [[Pinging kubernetes.docker.internal [127.0.0.1] with 32 bytes of data:]]: Docker Desktop بيزوّد السطر ده في [[hosts]]، و [[ping -a]] بيدوّر في [[hosts]] **الأول**. فالاسم اللي بيطلع مش لازم يكون اسم الجهاز: ممكن يكون أي سطر في hosts.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** [[net view]] و [[echo %errorlevel%]] على ويندوز 10 أو 11، وبعدين [[nbtstat -A 127.0.0.1]] وعدّ كام كارت قال [[Host not found.]].`, done: R`[[System error 6118 has occurred.]] و [[The list of servers for this workgroup is not currently available]] بكود [[2]]. و [[nbtstat -A 127.0.0.1]] طبع بلوك لكل كارت (أوله [[Node IpAddress]]) وتحت كل واحد [[Host not found.]] بكود [[0]]: NetBIOS مبيردش على loopback، والكود صفر حتى لما ملقاش.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** لجهاز تاني على شبكتك (من [[arp -a]])، جرّب [[ping -a -n 1]] و [[nbtstat -A]] و [[nslookup]] واعمل جدول: الأمر، لقى اسم ولا لأ، والاسم. وقارن بلستة الأجهزة في صفحة الراوتر.`, done: R`الجدول فيه ٣ صفوف لكل جهاز جرّبته، وعرفت أنهي طريقة شغالة على شبكتك (غالبًا [[nbtstat]] بيلاقي أجهزة ويندوز بس، و [[nslookup]] بيلاقي لو الراوتر بيسجّل الأسامي)، والأسامي اللي لقيتها موجودة في صفحة الراوتر.` },
            { lvl: 'تحدي', t: R`**ابني:** [[who-is-here.bat]] بيلف على كل سطر [[dynamic]] في [[arp -a]] (بـ [[for /f "tokens=1,2"]])، ولكل IP يجرّب [[ping -a -n 1 -w 500]] وياخد الاسم من سطر [[Pinging]]، ويطبع [[IP  MAC  NAME]] (أو [[?]] لو ملقاش اسم). على شبكتك انت بس.`, done: R`سطر لكل جهاز في جدول الـ ARP، والراوتر واحد منهم، والأجهزة اللي مالهاش اسم مكتوب قدامها [[?]]. ولو شغلته مرتين الناتج زي بعض تقريبًا (جهاز ممكن يختفي لو مكلمتهوش من مدة، وده طبيعي في الـ ARP).` },
          ],
          deep: {
            why: R`عايز توصل لطابعة أو Raspberry Pi أو جهاز تاني في البيت ومش عارف عنوانه، أو بتراجع مين متوصل بالواي فاي بتاعك (جهاز غريب في arp يبقى حد معاه الباسورد). الـ IP لوحده مش بيقول حاجة، الاسم أو الـ MAC هما اللي بيقولوا.`,
            how: R`الأجهزة بتعلن أسماءها بأكتر من طريقة: NetBIOS (ويندوز تقريبًا بس، وقديم)، و LLMNR و mDNS (أجهزة أبل وطابعات وأجهزة كتير، وأسماء بتخلص بـ [[.local]])، والراوتر نفسه لو بيسجّل الأسماء في الـ DNS بتاعه. [[ping -a]] بيستخدم الـ resolver بتاع ويندوز اللي بيجرّب كل ده، و [[nslookup]] بيسأل DNS بس، و [[nbtstat]] NetBIOS بس.

الـ MAC: أول 3 أجزاء منه بتقول الشركة المصنّعة (دوّر عليها في أي موقع «MAC vendor lookup»). بس لو الحرف التاني في الـ MAC [[2]] أو [[6]] أو [[A]] أو [[E]]، ده MAC عشوائي (locally administered): موبايلات ولابتوبات حديثة بتعمل MAC مختلف لكل شبكة عشان الخصوصية، فالبحث مش هيفيد. و [[TTL]] في رد ping بيدّي فكرة: 128 غالبًا ويندوز، و 64 غالبًا لينكس أو أندرويد أو أجهزة أبل أو راوتر.

[[arp -a]] بيعرض بس الأجهزة اللي جهازك كلّمها قريب. عشان يبقى فيه كل اللي على الشبكة لازم تكلمهم الأول، مثلًا loop بيعمل ping لكل عنوان (درس for و delayed expansion):
[[for /l %i in (1,1,254) do @ping -n 1 -w 200 192.168.1.%i | find "TTL="]]
بيطبع اللي رد بس، وبعدها [[arp -a]] يبقى فيه الكل (حتى الأجهزة اللي فايرولها بيمنع ping بتبان في arp غالبًا). جوه ملف bat اكتب [[%%i]] بدل [[%i]]. وفي PowerShell نفس الفكرة أسرع بالتوازي، و [[Get-NetNeighbor]] بدل arp (في تاب «PowerShell»). وده على شبكتك بس: اللف على شبكة مش بتاعتك (الشغل أو كافيه) ممكن يتعتبر فحص غير مصرّح بيه.`,
            when: R`بتدوّر على IP طابعة أو Raspberry Pi أو جهاز في البيت، بتراجع مين على الواي فاي بتاعك، أو قبل SSH أو Remote Desktop لجهاز مش فاكر عنوانه.`,
            mistakes: R`[[nbtstat -a]] بالـ IP (الصغيرة للاسم والكابيتال للـ IP). أو تفتكر إن مفيش اسم يبقى الجهاز مش موجود (موجود بس مش معلن اسمه، أو فايروله بيمنع). أو تصدّق اسم [[ping -a]] من غير ما تبص على ملف hosts (الحل تحت). أو تعتمد على [[net view]]. أو تلف على شبكة مش بتاعتك.`
          },
          teach: R`## الأول: عندنا IP وعايزين اسم

الأجهزة على الشبكة بتتعرف بالـ IP، بس الـ IP مش بيقولك ده موبايل ولا طابعة ولا لابتوب أخوك. فيه ٣ طرق تسأل بيها «ده مين؟»، وكل طريقة بتسأل حد مختلف، فكل أمر من التلاتة ممكن ينجح أو يفشل لوحده. هنبدأ بلستة الأجهزة، وبعدين نسأل عن كل واحد.

الأوامر اتشغّلت هنا في CMD على ويندوز 11 على شبكة البيت (والأسامي والـ MACs متغيّرة أو متخبية جزئيًا). اسأل عن أجهزة شبكتك انت بس.

---

## ١. مين على الشبكة: [[arp -a]]

[[arp]] (Address Resolution Protocol) هو اللي بيحوّل IP لـ MAC جوه الشبكة المحلية، وويندوز بيحفظ اللي عرفه في جدول. [[-a]] (all) اعرض الجدول ده (التفاصيل في درس arp / route).

~~~text الناتج (مختصر)
Interface: 192.168.1.65 --- 0xd
  Internet Address      Physical Address      Type
  192.168.1.1           dc-51-93-xx-xx-xx     dynamic
  192.168.1.3           d8-32-14-xx-xx-xx     dynamic
  192.168.1.5           1e-0b-c2-xx-xx-xx     dynamic
  192.168.1.6           4a-5b-18-xx-xx-xx     dynamic
  ...
  192.168.1.255         ff-ff-ff-ff-ff-ff     static
  224.0.0.251           01-00-5e-00-00-fb     static
  239.255.255.250       01-00-5e-7f-ff-fa     static

Interface: 172.29.160.1 --- 0x35
  172.29.173.165        00-15-5d-xx-xx-xx     dynamic
  ...
~~~

| الحتة | معناها |
|---|---|
| [[Interface: 192.168.1.65]] | الجدول ده بتاع الكارت اللي عنوانه كده (الواي فاي). و [[0xd]] رقم الكارت جوه ويندوز بالـ hex |
| [[Internet Address]] | الـ IP |
| [[Physical Address]] | الـ MAC |
| [[dynamic]] | اتعرف من الشبكة وهيتمسح لوحده بعد شوية |
| [[static]] | ثابت. هنا كله عناوين خاصة: [[.255]] (broadcast: كل الشبكة) و [[224...]] و [[239...]] (multicast: جروبات) |

والجدول التاني ([[172.29.160.1]]) كارت افتراضي بتاع WSL جوه الجهاز نفسه، مش شبكة البيت.

على الشبكة دي كان فيه ٢٧ جهاز غير الراوتر. وبص على **الحرف التاني** في الـ MAC: لو [[2]] أو [[6]] أو [[A]] أو [[E]] يبقى MAC عشوائي (موبايل أو لابتوب حديث بيغيّر الـ MAC لكل شبكة عشان الخصوصية)، زي [[1e-...]] و [[4a-...]]. ١٥ جهاز من الـ ٢٧ هنا كانوا كده. الباقي ([[d8-...]] و [[dc-...]]) MAC حقيقي، وأول ٣ أجزاء منه بتقول الشركة المصنّعة.

---

## ٢. [[ping -a -n 1 192.168.1.1]]

[[ping]] عادي بيبعت رسالة ويستنى رد (درس ping / tracert / nslookup). الإضافات:

- [[-a]] (address to name) قبل ما تبدأ، حاول تحوّل الـ IP لاسم.
- [[-n 1]] مرة واحدة بس بدل ٤.

~~~text الناتج
Pinging 192.168.1.1 [192.168.1.1] with 32 bytes of data:
Reply from 192.168.1.1: bytes=32 time=1ms TTL=64
~~~

بص على **أول سطر**: لو اتعرف اسم، بيتكتب [[Pinging الاسم [IP]]]. هنا الاتنين IP، يعني ملقاش اسم للراوتر. و [[TTL=64]] بيدّي فكرة عن النظام: ٦٤ غالبًا لينكس (الراوترات أغلبها لينكس) أو أندرويد أو أبل، و ١٢٨ غالبًا ويندوز.

[[ping -a]] بيسأل بكل الطرق اللي ويندوز يعرفها: ملف hosts الأول (درس hosts)، وبعدين DNS، و mDNS و LLMNR (الأجهزة بتعلن أسماءها على الشبكة)، و NetBIOS. وفي تجربة اللي في الحل تحت، رجّع اسم **غلط** من ملف hosts، فمتصدّقش أول اسم.

---

## ٣. [[nbtstat -A 192.168.1.20]]

[[nbtstat]] (NetBIOS over TCP/IP statistics) بيكلم NetBIOS بس: نظام أسامي قديم من أيام شبكات ويندوز الأولى. و [[-A]] كابيتال يعني «بالـ IP»: ابعت للجهاز ده نفسه واسأله عن أسماءه. ([[-a]] صغيرة نفس الحاجة بس بالاسم.)

لو الجهاز ويندوز و NetBIOS شغال عليه بيرد بجدول زي اللي في الخطوة ٥. لو لأ (موبايل، تليفزيون، أغلب الأجهزة الحديثة)، بيطبع [[Host not found.]] تحت كل كارت عندك، وده اللي حصل في تجربة الحل تحت.

---

## ٤. [[nslookup 192.168.1.20]]

[[nslookup]] (name server lookup) بيسأل سيرفر الـ DNS بس، وهنا السؤال بالعكس (reverse lookup): «مين صاحب الـ IP ده؟». الـ DNS في البيت غالبًا الراوتر، وفيه راوترات بتسجّل اسم كل جهاز أخد منها عنوان وفيه لأ. لو ملقاش بيطبع [[Non-existent domain]] (درس nslookup).

---

## ٥. أسامي جهازك انت: [[nbtstat -n]]

[[-n]] (names) الأسامي اللي جهازك **نفسه** معلنها في NetBIOS. ده على الجهاز هنا (غيّرت الاسم لـ MYPC):

~~~text الناتج (الكارت المتوصل بس)
Wi-Fi:
Node IpAddress: [192.168.1.65] Scope Id: []

                NetBIOS Local Name Table

       Name               Type         Status
    ---------------------------------------------
    MYPC           <20>  UNIQUE      Registered
    WORKGROUP      <00>  GROUP       Registered
    MYPC           <00>  UNIQUE      Registered
~~~

| الاسم | النوع | معناه |
|---|---|---|
| [[MYPC <00>]] | [[UNIQUE]] | اسم الجهاز، ومحدش غيره ياخده |
| [[MYPC <20>]] | [[UNIQUE]] | نفس الاسم كخدمة «File Server»: الجهاز يقدر يعمل شير |
| [[WORKGROUP <00>]] | [[GROUP]] | اسم الجروب، وأجهزة كتير بتشترك فيه |

والرقم بين [[< >]] نوع الخدمة بالـ hex. والكروت اللي مش متوصلة بيطبع تحتها [[No names in cache]].

---

## ٦. [[net view]] و [[net view \\IP]]

[[net view]] لوحده كان زمان بيعرض كل أجهزة الشبكة. جرّبته:

~~~text الناتج
System error 6118 has occurred.

The list of servers for this workgroup is not currently available
~~~

الخدمة اللي كانت بتجمع اللستة دي (Computer Browser) اتشالت من ويندوز 10 و 11، فده الطبيعي دلوقتي. لكن [[net view \\192.168.1.20]] (بالـ [[\\]] قبل العنوان) لسه بيعرض شيرات جهاز **معين** لو SMB شغال عليه، ولو مش شغال بيطلع [[System error 53 has occurred.]] (درس net share / net use).

---

## الخلاصة

| الأمر | بيسأل مين | بينجح إمتى |
|---|---|---|
| [[arp -a]] | جدول جهازك | دايمًا، بس الأجهزة اللي كلمتها قريب |
| [[ping -a IP]] | hosts ثم DNS و mDNS و LLMNR و NetBIOS | أحسن فرصة، بس ممكن يجيب اسم غلط من hosts |
| [[nbtstat -A IP]] | الجهاز نفسه بـ NetBIOS | أجهزة ويندوز قديمة الإعدادات |
| [[nslookup IP]] | DNS الراوتر | لو الراوتر بيسجّل الأسامي |
| [[nbtstat -n]] | جهازك | أسامي جهازك انت |
| [[net view \\IP]] | الجهاز بـ SMB | أجهزة عاملة شير |

> على شبكات البيت الحديثة غالبًا مش هتلاقي أسامي كتير بالأوامر دي. صفحة الراوتر (Connected devices) هي اللي فيها اسم كل جهاز.`,
          lines: [
            R`الـ IPs والـ MACs اللي جهازك يعرفها على الشبكة.`,
            R`IP لاسم: الاسم بيظهر في أول سطر لو اتعرف.`,
            R`اسأل الجهاز بـ NetBIOS عن اسمه وجروبه والـ MAC.`,
            R`اسأل DNS الراوتر عن اسم الـ IP.`,
            R`الأسامي اللي جهازك نفسه معلنها.`,
            R`زمان كانت لستة الأجهزة، دلوقتي غالبًا error 6118.`,
            R`شيرات جهاز معين (لو SMB مفتوح عليه).`
          ],
          sol: R`جرّبت على شبكة بيتي. [[arp -a]] كان فيه الراوتر بس ([[192.168.1.1]])، وبعد loop صغير على 4 عناوين رد [[192.168.1.4]] بـ [[TTL=64]]، و arp بقى فيه [[192.168.1.4  46-d5-d9-xx-xx-xx  dynamic]]. الحرف التاني [[6]]: MAC عشوائي، يعني موبايل غالبًا.

[[ping -a 192.168.1.4]] طبع [[Pinging host.docker.internal [192.168.1.4]]]! الاسم ده من ملف hosts: Docker Desktop كتب فيه عنوان اللابتوب لما كان [[.4]] ([[192.168.1.4 host.docker.internal]])، وبعدين الراوتر ادّى نفس العنوان للموبايل. يعني [[ping -a]] ممكن يدّيك اسم غلط تمامًا (درس hosts). و [[nbtstat -A 192.168.1.4]] طبع [[Host not found.]] تحت كل كارت، و [[nslookup 192.168.1.4]] طبع [[*** UnKnown can't find 192.168.1.4: Non-existent domain]] و [[Server: UnKnown]] و [[Address: fe80::1]] (الراوتر نفسه هو الـ DNS، بعنوان IPv6)، و [[net view \\192.168.1.4]] طبع [[System error 53 has occurred.]]. وعلى الراوتر نفس النتيجة: [[ping -a 192.168.1.1]] من غير اسم.

اللي اشتغل: [[ping -a 192.168.1.2]] (اللابتوب نفسه) طبع [[Pinging ALI-PC.home [192.168.1.2]]] ([[.home]] الدومين اللي الراوتر بيوزّعه)، و [[nbtstat -n]] طبع [[ALI-PC <00> UNIQUE Registered]] و [[ALI-PC <20> UNIQUE Registered]] و [[WORKGROUP <00> GROUP Registered]]. و [[net view]] لوحده طبع [[System error 6118 has occurred.]]. الخلاصة: على شبكات البيت الحديثة غالبًا مش هتلاقي أسماء بالأوامر دي، وصفحة الراوتر (Connected devices أو DHCP clients) هي اللي فيها اسم كل جهاز والـ MAC.`
        },
        {
          cmd: "mstsc",
          title: "Remote Desktop: افتح جهاز ويندوز تاني",
          desc: R`[[mstsc]] هو برنامج Remote Desktop Connection: بيفتح شاشة جهاز ويندوز تاني في نافذة عندك، وتشتغل عليه كأنك قدامه. الإضافات بتتكتب بـ [[/]] وبعدها [[:]] والقيمة.

[[/v:PC]] الجهاز (اسم أو IP)، و [[/v:PC:3390]] لو بورت غير الافتراضي 3389.
[[/f]] full screen (و Ctrl+Alt+Break بيبدّل بين full screen والنافذة).
[[/w:1600 /h:900]] حجم النافذة.
[[/multimon]] استخدم كل شاشاتك زي ما هي متركبة عندك، و [[/span]] شاشة واحدة كبيرة على شاشات جنب بعض بنفس الدقة.
[[/admin]] جلسة الإدارة على Windows Server.
[[/prompt]] اسأل على اليوزر والباسورد حتى لو محفوظين.
[[/public]] متحفظش الباسورد ولا صور الشاشة على الجهاز ده (لما تكون على جهاز مش بتاعك).
[[/edit file.rdp]] افتح ملف اتصال للتعديل. أي إعدادات بتظبطها من Show Options وتحفظها بـ Save As بتبقى ملف [[.rdp]]، ودبل كليك عليه بيتصل على طول.

العميل (اللي بيفتح جهاز تاني) شغال في أي نسخة ويندوز. لكن الجهاز اللي هيتفتح لازم يبقى Pro أو أعلى: Home مينفعش يستقبل Remote Desktop خالص. لو جهازك Home وعايز حد يساعدك عليه عن بعد، فيه Quick Assist جاي مع ويندوز، أو برامج زي Chrome Remote Desktop.`,
          example: R`mstsc /v:192.168.1.50
mstsc /v:office-pc:3390 /f
mstsc /v:192.168.1.50 /w:1600 /h:900 /prompt
mstsc /v:192.168.1.50 /multimon
mstsc /edit "%USERPROFILE%\Documents\office.rdp"
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Terminal Server" /v fDenyTSConnections /t REG_DWORD /d 0 /f
netsh advfirewall firewall set rule group="remote desktop" new enable=Yes`,
          try: R`لو عندك جهاز Pro في البيت: فعّل Remote Desktop عليه من Settings، وافتحه من جهازك بـ [[mstsc /v:]] والـ IP، وجرّب [[/w /h]] و [[/f]]. لو الاتنين Home: افتح [[mstsc]] لوحده، واتفرج على Show Options، واحفظ ملف rdp وافتحه بـ [[/edit]].`,
          practice: [
            { lvl: 'سريع', t: R`**دوّر بنفسك:** جهازك بيستقبل Remote Desktop ولا لأ؟ من غير ما تفتح Settings: [[reg query "HKLM\SYSTEM\CurrentControlSet\Control\Terminal Server" /v fDenyTSConnections]] (قراية بس).`, done: R`على جهاز التجربة (Home) [[fDenyTSConnections    REG_DWORD    0x1]]: [[1]] يعني «ارفض الاتصالات»، و [[0]] يعني مسموح. وعلى Home حتى لو بقت [[0]] مش هيستقبل، لأن الخدمة نفسها مش موجودة في النسخة دي (درس «mstsc» قسم «ليه مينفعش على Home؟»).` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** هل فيه قاعدة فايروول داخلة لبورت [[3389]] عندك؟ [[netsh advfirewall firewall show rule name=all dir=in | findstr /i /c:"LocalPort:" | findstr /r /c:" 3389$" | find /c /v ""]].`, done: R`على جهاز التجربة (Home) طلع [[0]]: مفيش قاعدة لـ RDP خالص. على جهاز Pro متفعّل عليه Remote Desktop المفروض تلاقي قواعد [[Remote Desktop - User Mode (TCP-In)]]، وده اللي بيعمله السطر الأخير في المثال.` },
            { lvl: 'تحدي', t: R`**ابني:** ملف [[office.rdp]] نص عادي. اكتبه بإيدك بـ [[echo]] (٣ سطور: [[full address:s:192.168.1.50]] و [[screen mode id:i:1]] و [[desktopwidth:i:1600]])، وافتحه بـ [[mstsc /edit office.rdp]] واتأكد إن الإعدادات ظهرت في Show Options. ومن غير ما تتصل.`, done: R`[[type office.rdp]] فيه التلات سطور، ونافذة [[mstsc /edit]] فتحت والكمبيوتر مكتوب فيها [[192.168.1.50]] ووضع النافذة مش full screen ([[screen mode id:i:1]] = نافذة، و [[2]] = full screen، من توثيق إعدادات ملفات RDP). قفلت النافذة من غير Connect.` },
          ],
          flag: "danger",
          deep: {
            why: R`تشتغل على جهاز البيت من اللابتوب، أو على سيرفر ويندوز (VPS ويندوز أو جهاز في الشغل)، أو تساعد حد في البيت من أوضة تانية. Remote Desktop مدمج في ويندوز، وبينقل الكليبورد، وبيدعم أكتر من شاشة، وبيقدر يوصّل درايفاتك جوه الجلسة (Show Options ثم Local Resources).`,
            how: R`البروتوكول اسمه RDP على بورت 3389. على الجهاز اللي هيتفتح (Pro): Settings ثم System ثم Remote Desktop، أو من CMD أدمن السطرين الأخيرين في المثال: قيمة الريجستري [[fDenyTSConnections]] = 0 معناها «متمنعش اتصالات Remote Desktop»، و [[set rule group="remote desktop" new enable=Yes]] بيفعّل كل قواعد الفايروول اللي في الجروب ده. اسم الجروب بيتترجم على ويندوز بلغة تانية، فالـ Settings أضمن.

مين يدخل: الأدمنز وأعضاء [[Remote Desktop Users]] (درس net localgroup)، ولازم اليوزر عنده باسورد. الدخول بيعمل sign out للي قاعد قدام الجهاز، لأن ويندوز العادي جلسة واحدة بس في المرة. و Network Level Authentication (مفعّل افتراضيًا) بيخلّي الجهاز يطلب اليوزر والباسورد قبل ما يفتح أي حاجة.

الأمان: متفتحش 3389 على النت (port forwarding في الراوتر). فيه بوتات بتلف على النت كله طول اليوم تجرّب باسوردات على أي 3389 مفتوح، وثغرات في RDP اتستغلت قبل كده. لو محتاج توصل من برا البيت: VPN أو Tailscale (شبكة خاصة بين أجهزتك)، وبعدين mstsc على عنوان الجهاز جوه الشبكة دي. ولتشغيل أوامر على جهاز تاني من غير شاشة: OpenSSH Server أو [[Enter-PSSession]] (في تاب «PowerShell»).`,
            when: R`جهاز Pro في البيت أو الشغل، سيرفر ويندوز، مساعدة حد على شبكتك، أو اختصارات بملفات rdp جاهزة لكذا جهاز.`,
            mistakes: R`تحاول تفعّله على Home. أو تفتح 3389 في الراوتر للنت. أو يوزر من غير باسورد. أو تنسى إن الدخول بيقفل جلسة اللي قاعد على الجهاز. أو تحفظ الباسورد في ملف rdp على جهاز مش بتاعك (استخدم [[/public]]). أو تفعّل الريجستري وتنسى الفايروول أو العكس، فيطلع «Remote Desktop can't connect to the remote computer».`
          },
          teach: R`## الأول: برنامج بواجهة، والإضافات بتقوله يفتح إيه

[[mstsc]] اختصار قديم لـ Microsoft Terminal Services Client، وده الاسم القديم لـ Remote Desktop Connection. لما تكتبه بيفتح **نافذة**، مش بيطبع حاجة في CMD. والإضافات بتملا النافذة دي بدل ما تكتب بإيدك، وكلها بالشكل [[/اسم:قيمة]].

فيه جهازين: **العميل** (اللي انت قاعد عليه وبيفتح الشاشة) و**الجهاز البعيد** (اللي شاشته هتظهر). أول ٥ سطور على العميل، وآخر سطرين على الجهاز البعيد.

> الأوامر دي مشغّلتهاش هنا: mstsc بيفتح نافذة وبيتصل بجهاز تاني، والجهاز ده Windows Home، وآخر سطرين بيغيّروا إعدادات النظام. الشرح من توثيق Microsoft، ومعاه أوامر عرض بس اتشغّلت (تحت).

---

## ١. [[mstsc /v:192.168.1.50]]

[[/v:]] (v = server، الجهاز البعيد) وبعد النقطتين اسمه أو الـ IP. ده أقل أمر مفيد: بيفتح نافذة الاتصال على الجهاز ده على البورت الافتراضي **3389**، ويسألك على اليوزر والباسورد بتوع الجهاز البعيد.

---

## ٢. [[mstsc /v:office-pc:3390 /f]]

- [[office-pc]] اسم الجهاز بدل الـ IP.
- [[:3390]] بعد الاسم: البورت. محتاجه بس لو الجهاز البعيد متظبط على بورت غير 3389.
- [[/f]] (full screen) الشاشة كلها. و Ctrl+Alt+Break بيبدّل بين full screen والنافذة.

يعني أول [[:]] بعد [[/v]] فاصل الإضافة عن قيمتها، والتانية فاصل الاسم عن البورت.

---

## ٣. [[mstsc /v:192.168.1.50 /w:1600 /h:900 /prompt]]

- [[/w:1600]] (width) العرض بالبكسل، و [[/h:900]] (height) الطول. نافذة بحجم ثابت بدل full screen.
- [[/prompt]] اسألني على اليوزر والباسورد حتى لو محفوظين. مفيد لو عايز تدخل بيوزر تاني.

---

## ٤. [[mstsc /v:192.168.1.50 /multimon]]

[[/multimon]] (multiple monitors) لو عندك أكتر من شاشة، الجلسة تستخدمهم كلهم بنفس ترتيبهم عندك. والمختلف عنه [[/span]]: بيعمل من الشاشات صورة واحدة عريضة (لازم يكونوا جنب بعض وبنفس الدقة).

---

## ٥. [[mstsc /edit "%USERPROFILE%\Documents\office.rdp"]]

أي إعدادات بتظبطها في النافذة (Show Options) تقدر تحفظها بـ Save As في ملف [[.rdp]]: ملف نص فيه اسم الجهاز والحجم والإعدادات. و [[/edit]] افتح الملف ده للتعديل بدل ما يتصل على طول.

و [[%USERPROFILE%]] متغير بيئة فيه فولدر اليوزر بتاعك ([[C:\Users\ali]] مثلًا)، و CMD بيبدّله بقيمته قبل التنفيذ (درس set / setx). والمسار كله بين علامات تنصيص لأنه ممكن يبقى فيه مسافات.

---

## ٦. على الجهاز البعيد: [[reg add ... fDenyTSConnections ...]]

~~~cmd
reg add "HKLM\SYSTEM\CurrentControlSet\Control\Terminal Server" /v fDenyTSConnections /t REG_DWORD /d 0 /f
~~~

[[reg]] برنامج بيقرا ويكتب في الريجستري (قاعدة إعدادات ويندوز)، و [[add]] اكتب قيمة. نفكّه:

| الحتة | معناها |
|---|---|
| [[HKLM\SYSTEM\...\Terminal Server]] | المفتاح (زي الفولدر). [[HKLM]] = HKEY_LOCAL_MACHINE: إعدادات الجهاز كله، فمحتاج أدمن |
| [[/v fDenyTSConnections]] | (v = value) اسم القيمة: «امنع اتصالات Terminal Services» |
| [[/t REG_DWORD]] | (t = type) نوعها: رقم 32-bit |
| [[/d 0]] | (d = data) القيمة: 0 يعني **متمنعش**، و 1 يعني امنع |
| [[/f]] | (force) اكتب فوق القديمة من غير ما تسألني |

الاسم بالنفي: «Deny = 0» يعني «مسموح». عشان تشوف القيمة من غير ما تغيّرها: [[reg query]] بنفس المفتاح و [[/v]]. جرّبته على الجهاز هنا:

~~~text الناتج
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Terminal Server
    fDenyTSConnections    REG_DWORD    0x1
~~~

[[0x1]] (يعني 1 بالـ hex): Remote Desktop ممنوع، وده الافتراضي.

---

## ٧. على الجهاز البعيد: الفايروول

~~~cmd
netsh advfirewall firewall set rule group="remote desktop" new enable=Yes
~~~

- [[set rule]] غيّر قواعد موجودة (درس netsh advfirewall firewall).
- [[group="remote desktop"]] كل القواعد اللي في الجروب ده، بدل قاعدة قاعدة.
- [[new]] الكلمة اللي بتفصل «أنهي قواعد» عن «التغيير». وبعدها [[enable=Yes]] فعّلها.

الريجستري بيخلّي ويندوز يقبل، والفايروول بيخلّي الاتصال يوصل. لو عملت واحد بس هيطلع «Remote Desktop can't connect to the remote computer». واسم الجروب بيتترجم لو ويندوز بلغة تانية، فـ Settings ثم System ثم Remote Desktop أضمن، وبتعمل الاتنين مرة واحدة.

---

## ليه مينفعش على Home؟

جرّبت على الجهاز هنا (Home): [[sc query TermService]] (الخدمة اللي بتستقبل Remote Desktop) طلّع:

~~~text الناتج
SERVICE_NAME: TermService
        TYPE               : 20  WIN32_SHARE_PROCESS
        STATE              : 1  STOPPED
~~~

الخدمة موجودة بس مقفولة، و Home مفيهوش قواعد الفايروول ولا جروب Remote Desktop Users (التفاصيل في الحل). يعني Home يقدر يفتح أجهزة تانية (العميل)، بس ميستقبلش.

---

## الخلاصة

| السطر | فين | بيعمل إيه |
|---|---|---|
| [[mstsc /v:IP]] | العميل | افتح الجهاز ده على 3389 |
| [[/v:اسم:بورت /f]] | العميل | بورت تاني، و full screen |
| [[/w: /h: /prompt]] | العميل | حجم ثابت، واسألني على اليوزر |
| [[/multimon]] | العميل | كل شاشاتي |
| [[/edit ملف.rdp]] | العميل | عدّل اتصال محفوظ |
| [[reg add ... fDenyTSConnections ... /d 0]] | البعيد (Pro، أدمن) | اسمح بـ Remote Desktop |
| [[netsh ... group="remote desktop" new enable=Yes]] | البعيد (أدمن) | افتحله الفايروول |

> متفتحش 3389 للنت من الراوتر. من برا البيت: VPN أو Tailscale الأول، وبعدين mstsc.`,
          lines: [
            R`افتح جهاز بالـ IP على البورت الافتراضي 3389.`,
            R`جهاز بالاسم على بورت 3390، و full screen.`,
            R`نافذة 1600 في 900، واسألني على اليوزر والباسورد.`,
            R`استخدم كل الشاشات اللي عندي.`,
            R`عدّل ملف اتصال محفوظ.`,
            R`على الجهاز اللي هيتفتح (Pro، أدمن): اسمح بـ Remote Desktop.`,
            R`وفعّل قواعده في الفايروول.`
          ],
          sol: R`(مشغّلتش mstsc لأنه برنامج بواجهة بيتصل بجهاز تاني، والجهاز ده Home؛ اللي جاي من توثيق Microsoft ومن أوامر عرض بس.) [[mstsc /?]] نفسه مش بيطبع في CMD، بيفتح نافذة فيها الإضافات. [[mstsc /v:IP]] بيفتح نافذة الاتصال، ولو الجهاز مش بيرد بتطلع رسالة «Remote Desktop can't connect to the remote computer» وفيها 3 أسباب: Remote access مش مفعّل، أو الجهاز مقفول، أو مش على الشبكة.

على جهازي (Home): [[netsh advfirewall firewall show rule name=all dir=in | findstr /i /c:"Remote Desktop"]] مطلّعش ولا سطر، و [[net localgroup "Remote Desktop Users"]] طلّع [[System error 1376 has occurred.]]، و [[sc query TermService]] طلّع [[STATE : 1 STOPPED]] و [[sc qc TermService]] فيه [[DISPLAY_NAME : Remote Desktop Services]]. يعني Home فيه الخدمة بس من غير الباقي، ومفيش طريقة رسمية تخلّيه يستقبل. على Pro بعد ما تفعّله، نفس أمر الفايروول بيطلّع قواعد زي [[Remote Desktop - User Mode (TCP-In)]].`
        },
        {
          cmd: "shutdown /m",
          title: "restart أو إيقاف لجهاز تاني على الشبكة",
          desc: R`[[shutdown /m \\PC]] بيبعت أمر الإيقاف أو الـ restart لجهاز تاني على شبكتك بدل جهازك، بنفس إضافات درس shutdown. و [[shutdown /i]] بيفتح نافذة Remote Shutdown تختار منها أكتر من جهاز.

[[/m \\PC]] الجهاز التاني، باسمه أو الـ IP، والـ [[\\]] لازمة.
[[/r]] restart، أو [[/s]] إيقاف.
[[/t 60]] بعد دقيقة، واللي قاعد قدام الجهاز بيشوف إشعار، و [[/c "..."]] رسالة بتظهر فيه.
[[/a /m \\PC]] الغي إيقاف متجدول على الجهاز ده.
[[/d p:4:1]] سبب، و [[p]] يعني planned، بيتسجل في Event Log على الجهاز التاني.
[[/i]] النافذة الرسومية، ولازم تبقى أول إضافة.

الشروط على الجهاز التاني، ومن غيرها هتشوف [[Access is denied.(5)]] أو [[The network path was not found.(53)]]:
لازم تكون أدمن عليه، والأدمن ده يقدر يدخل من الشبكة. الأسهل تفتح جلسة بيوزره الأول: [[net use \\PC\IPC$ /user:PC\admin *]] (درس net share / net use)، وبعدها shutdown بيستخدمها.
الشبكة Private و File and printer sharing مفعّل، لأن shutdown بيكلم الجهاز على SMB (بورت 445).
على أجهزة البيت (مش على دومين)، أدمن محلي داخل من الشبكة بيتشال منه الأدمن (UAC remote restrictions، تحت)، فممكن تاخد Access is denied حتى بباسورد صح.`,
          example: R`net use \\192.168.1.50\IPC$ /user:OFFICE-PC\admin *
shutdown /r /m \\192.168.1.50 /t 60 /c "Restarting for updates in 1 minute"
shutdown /a /m \\192.168.1.50
shutdown /s /m \\192.168.1.50 /t 0 /d p:0:0
net use \\192.168.1.50\IPC$ /delete
shutdown /i`,
          try: R`لو عندك جهازين في البيت وانت أدمن على التاني: جدول restart عليه بعد 10 دقايق برسالة، واتأكد إن الإشعار ظهر هناك، وبعدين الغيه بـ [[/a /m]]. ومن غير جهاز تاني: اقرا الشروط وخمّن هتقابل أنهي error ولّا لأ.`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[shutdown /a]] على جهازك ومفيش أي إيقاف متجدول، وبعدها [[echo %errorlevel%]]. (آمن: مفيش حاجة يلغيها.)`, done: R`[[Unable to abort the system shutdown because no shutdown was in progress.(1116)]] و [[errorlevel]] [[1116]]: الرقم اللي بين القوسين هو نفسه كود الخروج، و [[net helpmsg 1116]] بيطبع نفس الجملة.` },
            { lvl: 'تطبيق', t: R`**اشرحها:** لكل رسالة من دول اكتب السبب والحل في سطر: [[Access is denied.(5)]] و [[The network path was not found.(53)]]. استخدم قسم «لما يفشل: الأرقام» في الدرس و [[net helpmsg]].`, done: R`٥: مش أدمن على الجهاز التاني أو UAC remote restrictions شالت الأدمن (افتح جلسة [[IPC$]] بيوزر أدمن من هناك). ٥٣: الجهاز مش باين على الشبكة أو SMB (445) مقفول أو الشبكة Public. و [[net helpmsg 5]] و [[53]] طبعوا [[Access is denied.]] و [[The network path was not found.]].` },
            { lvl: 'تحدي', t: R`**ابني (جهازين في البيت أو VMs):** [[remote-restart.bat PC]] بيتأكد الأول إن الجهاز بيرد ([[ping -n 1]] + [[TTL=]])، ويفتح جلسة [[IPC$]] ([[*]] بيسأل الباسورد)، ويجدول [[shutdown /r /m \\PC /t 300 /c "..."]]، ويطبع إزاي يتلغي، ويقفل الجلسة في الآخر حتى لو فشل.`, done: R`على VM: الإشعار ظهر على الجهاز التاني بالرسالة، و [[shutdown /a /m \\PC]] لغاه. لو الجهاز مقفول بيقف عند الـ ping برسالة واضحة. ولو الباسورد غلط بيطبع الكود ([[5]] أو [[1326]]) و [[net use]] بعدها مفيهوش جلسة متعلقة. (الأوامر من الدرس وتوثيق shutdown، ومتشغّلتش على جهاز التجربة.)` },
          ],
          flag: "danger",
          deep: {
            why: R`جهاز في أوضة تانية أو مكتب تاني محتاج restart بعد تحديث، أو أجهزة معمل عايز تقفلها آخر اليوم بسكربت واحد بدل ما تقوم لكل واحد. وكمان بتفهم من الدرس ده ليه أي أمر إدارة عن بعد على أجهزة البيت بيقول Access denied.`,
            how: R`shutdown بيكلم الجهاز التاني بـ RPC جوه SMB (بروتوكول Remote Shutdown)، فالمحتاج هو نفس اللي الشير محتاجه: بورت 445 مفتوح في الفايروول، ويوزر من الجهاز التاني يدخل من الشبكة. والجهاز التاني بيتأكد إن اليوزر عنده صلاحية «Force shutdown from a remote system» ([[SeRemoteShutdownPrivilege]])، ودي افتراضيًا للأدمنز بس.

القيد الكبير: UAC remote restrictions. على جهاز مش على دومين، أي يوزر محلي في Administrators (غير الأدمن المدمج) لما يدخل من الشبكة بيتشال منه الأدمن، زي سطر [[Group used for deny only]] اللي في النافذة العادية (درس whoami /groups /priv). Microsoft بتوثّق إن قيمة [[LocalAccountTokenFilterPolicy]] = 1 في [[HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System]] بتشيل القيد ده، بس ده بيخلّي أي حد معاه باسورد (أو hash) أي أدمن محلي يتحكم في الجهاز كله من الشبكة، وده طريق مشهور لهجمات بتنتشر من جهاز لجهاز. استخدمها على أجهزتك بس ولو فاهم ده، والأحسن OpenSSH Server أو PowerShell Remoting ([[Restart-Computer -ComputerName]] في تاب «PowerShell»).

Remote Registry متقفل افتراضيًا على ويندوز 11 (جرّبت [[sc qc RemoteRegistry]] وطلع [[START_TYPE : 4 DISABLED]]). shutdown.exe الحديث مش محتاجه غالبًا، لكن أدوات تانية زي [[net rpc shutdown]] من لينكس (اللي Home Assistant بيستخدمه مثلًا) بتعدّي عليه، فساعتها لازم يشتغل على الجهاز التاني.

[[shutdown /i]] بيفتح نافذة: Add تضيف أسامي أجهزة، وتختار Restart أو Shutdown والرسالة والسبب. وأرقام الأسباب ([[p:4:1]] يعني Application: Maintenance (Planned)) كلها في [[shutdown /?]].`,
            when: R`restart لجهاز تاني بعد تحديث أو تسطيب، إيقاف أجهزة معمل أو مكتب صغير آخر اليوم، أو جهاز شغال سيرفر في البيت محتاج restart من اللابتوب.`,
            mistakes: R`[[/t 0]] على جهاز حد شغال عليه فيضيع شغله، و [[/t]] أكبر من صفر معناها [[/f]] (البرامج بتتقفل غصب). أو تنسى [[\\]] قبل الاسم. أو تشغّل [[LocalAccountTokenFilterPolicy]] على كل الأجهزة «عشان تمشي». أو تفتح 445 على Public. أو تغلط في الـ IP فتقفل جهاز حد تاني. أو تنسى [[net use ... /delete]] فالجلسة بباسورد الأدمن تفضل مفتوحة.`
          },
          teach: R`## الأول: نفس shutdown، بس على جهاز تاني

الأمر هو [[shutdown]] اللي في درس shutdown، بنفس [[/r]] و [[/s]] و [[/t]]. الجديد [[/m]] اللي بيقوله «مش الجهاز ده، الجهاز ده». والمثال ٣ مراحل: **افتح جلسة بيوزر أدمن هناك**، ابعت الأوامر، **اقفل الجلسة**.

> مشغّلتش أي سطر من دول، لأنهم بيقفلوا جهاز تاني أو بيفتحوا جلسة أدمن عليه. اللي اتشغّل هنا: [[shutdown /?]] (عشان أرقام الأسباب) و [[net helpmsg]] (عشان نصوص الأخطاء). الباقي من التوثيق.

---

## ١. افتح جلسة: [[net use \\192.168.1.50\IPC$ /user:OFFICE-PC\admin *]]

shutdown مش بيسألك على باسورد، بيستخدم أي جلسة مفتوحة مع الجهاز ده. فبنفتحها الأول بـ [[net use]] (درس net share / net use):

| الحتة | معناها |
|---|---|
| [[\\192.168.1.50]] | الجهاز التاني |
| [[\IPC$]] | مش فولدر: شير مخفي ويندوز عامله عشان تفتح عليه جلسة بس |
| [[/user:OFFICE-PC\admin]] | اليوزر [[admin]] اللي على الجهاز [[OFFICE-PC]]، ولازم يكون أدمن هناك |
| [[*]] | اسألني على الباسورد (بيتكتب ومش بيظهر) |

---

## ٢. restart بعد دقيقة برسالة

~~~cmd
shutdown /r /m \\192.168.1.50 /t 60 /c "Restarting for updates in 1 minute"
~~~

| الحتة | معناها |
|---|---|
| [[/r]] | restart (إيقاف وتشغيل تاني) |
| [[/m \\192.168.1.50]] | على الجهاز ده. الـ [[\\]] قبل الاسم أو الـ IP لازمة |
| [[/t 60]] | بعد ٦٠ ثانية. اللي قاعد قدام الجهاز بيشوف إشعار |
| [[/c "..."]] | (comment) الرسالة اللي في الإشعار، بين علامات تنصيص عشان فيها مسافات |

ولو كله مظبوط مش بيطبع حاجة عندك. خد بالك: [[shutdown /?]] بيقول إن أي [[/t]] أكبر من صفر معناه [[/f]] كمان، يعني البرامج المفتوحة هناك هتتقفل غصب لما الوقت يخلص. فالـ ٦٠ ثانية دي فرصة اللي هناك يحفظ.

---

## ٣. الغيه: [[shutdown /a /m \\192.168.1.50]]

[[/a]] (abort) الغي إيقاف متجدول. بيشتغل بس جوه وقت الـ [[/t]]، فده السبب إنك دايمًا تدّي وقت.

---

## ٤. إيقاف فوري بسبب: [[shutdown /s /m \\192.168.1.50 /t 0 /d p:0:0]]

- [[/s]] (shutdown) إيقاف مش restart.
- [[/t 0]] دلوقتي، من غير فرصة إلغاء.
- [[/d p:0:0]] (d = reason) السبب، وبيتسجل في Event Log على الجهاز التاني: [[p]] يعني planned (متخطط)، والرقمين بعده نوع السبب وتفصيله.

الأرقام كلها في [[shutdown /?]]. ده جزء منها من الجهاز هنا:

~~~text من ناتج shutdown /?
E P     0       0       Other (Planned)
E P     1       1       Hardware: Maintenance (Planned)
E P     2       4       Operating System: Reconfiguration (Planned)
E P     4       1       Application: Maintenance (Planned)
E P     4       2       Application: Installation (Planned)
E P     5       19      Security issue (Planned)
~~~

فـ [[p:0:0]] «Other (Planned)» و [[p:4:1]] «Application: Maintenance (Planned)». والحروف في الأول (زي ما المساعدة بتشرحها): [[E]] = Expected يعني إيقاف متوقع، و [[U]] = Unexpected يعني الجهاز وقع لوحده، و [[P]] = planned يعني متخطط. وفيه أسطر Unplanned من غير P.

---

## ٥. اقفل الجلسة: [[net use \\192.168.1.50\IPC$ /delete]]

[[/delete]] بيقفل الجلسة اللي فتحتها في الخطوة ١. من غيرها الجلسة دي (بصلاحيات أدمن) بتفضل مفتوحة لحد ما تعمل sign out.

---

## ٦. [[shutdown /i]]

[[/i]] (interface) بيفتح نافذة Remote Shutdown: تضيف فيها أسامي أجهزة، وتختار restart أو إيقاف والرسالة والسبب، لكذا جهاز مرة واحدة. ولازم تبقى أول إضافة في الأمر.

---

## لما يفشل: الأرقام

الأخطاء بتطلع بالشكل [[192.168.1.50: Access is denied.(5)]]: الجهاز، والرسالة، ورقمها بين قوسين. و [[net helpmsg]] والرقم بيطبع الرسالة، طلّعتهم هنا:

| الرقم | الرسالة | السبب الغالب |
|---|---|---|
| 5 | [[Access is denied.]] | مش أدمن هناك، أو أدمن محلي اتشالت صلاحياته على الشبكة (UAC remote restrictions)، أو جلسة بيوزر تاني |
| 53 | [[The network path was not found.]] | الجهاز مقفول، أو اسم غلط، أو الشبكة Public، أو File and printer sharing مقفول |
| 1326 | [[The user name or password is incorrect.]] | من خطوة [[net use]]: باسورد أو يوزر غلط |

---

## الخلاصة

| الخطوة | الأمر |
|---|---|
| ١. جلسة أدمن | [[net use \\IP\IPC$ /user:PC\admin *]] |
| ٢. restart بمهلة ورسالة | [[shutdown /r /m \\IP /t 60 /c "..."]] |
| ٣. الغي | [[shutdown /a /m \\IP]] |
| ٤. إيقاف فوري بسبب | [[shutdown /s /m \\IP /t 0 /d p:0:0]] |
| ٥. اقفل الجلسة | [[net use \\IP\IPC$ /delete]] |
| نافذة لكذا جهاز | [[shutdown /i]] |

> دايمًا [[/t]] أكبر من صفر على جهاز حد شغال عليه، عشان يلحق يحفظ وعشان تلحق تلغي لو غلطت في الـ IP.`,
          lines: [
            R`[[IPC$]] شير خاص بالاتصالات بين الأجهزة، والسطر ده بيفتح جلسة عليه بيوزر [[OFFICE-PC\admin]] (يوزر محلي اسمه admin على الجهاز التاني). الـ [[*]] بتخليه يسألك الباسورد من غير ما يتكتب في الأمر. الجلسة دي هي اللي بتدّي [[shutdown /m]] الصلاحية.`,
            R`[[/r]] restart، و [[/m \\192.168.1.50]] على الجهاز ده مش جهازك، و [[/t 60]] بعد 60 ثانية، و [[/c]] رسالة بتظهر للي قاعد قدامه عشان يحفظ شغله. ولازم الجلسة اللي في السطر اللي فوق تكون مفتوحة بيوزر أدمن هناك، وإلا هيطلع [[Access is denied.(5)]]`,
            R`[[/a]] (abort) بيلغي الـ restart اللي اتجدول في السطر اللي فوق، بشرط إنه يتكتب قبل ما الـ 60 ثانية بتوع [[/t]] يخلصوا. بعد ما الجهاز بدأ يقفل مفيش رجوع، وعشان كده [[/t 0]] على جهاز حد شغال عليه خطر.`,
            R`[[/s]] إيقاف تشغيل (مش restart)، و [[/t 0]] من غير أي انتظار، و [[/d p:0:0]] سبب الإيقاف اللي بيتسجل في ويندوز: [[p]] يعني planned (مخطط)، و [[0:0]] يعني «Other». الأدمن بيشوف السبب ده بعدين في سجل الأحداث.`,
            R`بيقفل الجلسة اللي فتحتها في أول سطر على [[IPC$]]، فجهازك ميفضلش شايل يوزر وباسورد الأدمن بتوع الجهاز التاني. اعمله دايمًا لما تخلص.`,
            R`[[/i]] بيفتح نافذة Remote Shutdown: تضيف فيها أسامي أو IPs لأكتر من جهاز وتختار restart أو shutdown والرسالة والسبب، بدل ما تكتب الأمر لكل جهاز لوحده.`,
          ],
          sol: R`(مشغّلتهوش لأنه بيقفل جهاز تاني؛ ده من توثيق shutdown و UAC.) لو كل حاجة مظبوطة: [[shutdown /r /m \\192.168.1.50 /t 600 /c "Test"]] مش بيطبع حاجة عندك، والجهاز التاني بيطلّع إشعار إنه هيعمل restart وفيه الرسالة، و [[shutdown /a /m \\192.168.1.50]] بيلغيه.

الأخطاء بتطلع بالشكل [[192.168.1.50: Access is denied.(5)]]: اليوزر مش أدمن هناك، أو أدمن محلي اتشالت صلاحياته على الشبكة، أو جلسة [[IPC$]] مفتوحة بيوزر تاني. و [[The network path was not found.(53)]]: الجهاز مقفول، أو الاسم غلط، أو File and printer sharing مقفول، أو الشبكة Public. و [[net use \\PC\IPC$]] بباسورد غلط: [[System error 1326 has occurred.]] و [[The user name or password is incorrect.]] (النصوص دي طلّعتها بـ [[net helpmsg 53]] و [[net helpmsg 1326]]).`
        },
        {
          cmd: "netsh: The object already exists",
          title: "The object already exists: أوامر إعداد وتراجع تتشغّل مرتين من غير ما تبوظ (idempotent)",
          learn: R`تفهم ليه [[add]] بيفشل في التشغيلة التانية، وتكتب خطوات إعداد بتعتبر «موجود أصلًا» نجاح، وتسجّل أمر التراجع لكل خطوة نجحت، وترجع بالعكس عند أول فشل، وتخلي [[netsh]] يعمل routes مؤقتة بـ [[store=active]].`,
          out: R`تشغيل [[up]] مرتين ورا بعض الاتنين [[ok]]، و [[down]] بيرجّع كل خطوة مرة واحدة بس، وفشل خطوة بيرجّع اللي قبلها و [[exit=1]].`,
          desc: R`الأداة بتعمل خطوات إعداد للشبكة ورا بعض، ومن ضمنها:

[[netsh interface ipv6 add address vpnlab0 fd00::2/64]]

ورجع [[The object already exists.]] لأن العنوان فضل على الكارت من تجربة قبلها. الأداة اعتبرت ده فشل، وعملت rollback كامل لكل اللي اتعمل، والاتصال مقامش. والمشكلة مش في الأمر، في إن الإعداد **مش idempotent**: مينفعش يتشغّل مرتين.

العلاج ٣ حاجات: (١) أمر بيشتغل في الحالتين لو موجود ([[set address]] بدل [[add]] في IPv6، و [[ip addr replace]] في لينكس)، أو «already exists» تتحسب نجاح. (٢) كل خطوة نجحت أمر تراجعها يتسجّل في ملف حالة، ومرة واحدة بس. (٣) أول خطوة تفشل فعلًا: ارجع بالعكس. ومعاهم: [[store=active]] في أي [[add route]]، لأن الافتراضي **دائم** ([[persistent: Change is persistent. This is the default.]] من [[netsh ... add route /?]]).`,
          example: R`# Windows (CMD):
netsh interface ipv6 add address vpnlab0 fd00::2/64
netsh interface ipv6 set address vpnlab0 fd00::2/64 store=active
netsh interface ipv4 add route prefix=0.0.0.0/1 interface=vpnlab0 nexthop=10.255.0.1 store=active
netsh interface ipv4 add route /? | findstr /c:"default"
route print -4 | findstr /c:"Persistent Routes" /c:"None"
.\lab.bat & .\lab.bat & .\lab.bat down
# Linux (and WSL):
ip addr add 10.255.0.2/24 dev vpnlab0; echo "exit=$?"
ip addr replace 10.255.0.2/24 dev vpnlab0; echo "exit=$?"
sudo ./lab-net.sh up && sudo ./lab-net.sh up && sudo ./lab-net.sh down`,
          lines: [
            R`الأمر اللي فشل في الحالة الحقيقية: [[add]] بيضيف عنوان، ولو العنوان موجود على الكارت بيرد [[The object already exists.]] وبكود خروج مش صفر.`,
            R`البديل اللي بيشتغل في الحالتين: [[set address]] في IPv6 بيضبط العنوان لو موجود ويضيفه لو مش موجود (ده اللي اشتغل في الحالة الحقيقية). و [[store=active]] لحد الـ restart بس.`,
            R`route مؤقت: [[prefix=0.0.0.0/1]] نص الإنترنت، و [[interface=vpnlab0]] الكارت، و [[nexthop]] البوابة جوه النفق، و [[store=active]] عشان ميبقاش دائم.`,
            R`اسأل [[netsh]] نفسه عن الافتراضي (قراية بس): السطر اللي فيه [[default]] بيقول إن [[persistent]] هو الافتراضي.`,
            R`اتأكد إن مفيش routes دائمة فضلت: قسم [[Persistent Routes]] في [[route print]] والسطر [[None]] تحته. ([[/c:]] = النص ده بالظبط، وكذا [[/c:]] = أي واحد فيهم.)`,
            R`معمل CMD آمن (فولدرات مكان الـ routes): [[up]] مرتين ورا بعض وبعدين [[down]]. [[.\]] لازمة لو الجهاز عليه [[NoDefaultCurrentDirectoryInExePath]] (تحت).`,
            R`نفس الغلطة في لينكس: [[ip addr add]] لعنوان موجود: [[Error: ipv4: Address already assigned.]] وكود 2.`,
            R`[[replace]] = «خليه كده سواء موجود أو لأ»: كود 0 في الحالتين.`,
            R`سكربت الإعداد والتراجع في لينكس (في الشرح): [[up]] مرتين ينجحوا، و [[down]] يرجّع كل حاجة مرة واحدة.`,
          ],
          try: R`في كونتينر: [[docker run --rm -it --cap-add NET_ADMIN ubuntu:24.04]]، وسطّب [[iproute2]]، واعمل كارت تجربة [[ip link add vpnlab0 type dummy]] و [[ip link set vpnlab0 up]]، وجرّب [[ip addr add]] مرتين وبعدين [[replace]]، و [[ip route add]] مرتين. وبعدين شغّل [[lab-net.sh]] اللي في الشرح بالحالات الأربعة. وعلى ويندوز شغّل [[lab.bat]] (فولدرات بس، مفيش شبكة). أوامر [[netsh]] اللي بتغيّر متشغّلهاش غير على جهاز تجارب.`,
          teach: R`## العَرَض

الأداة بتبدأ الاتصال بـ ٦ أوامر [[netsh]] ورا بعض. الأمر التالت:

~~~text الحالة الحقيقية
netsh interface ipv6 add address vpnlab0 fd00::2/64
The object already exists.
~~~

والأداة عملت اللي اتعلّمته: «خطوة فشلت؟ ارجع». فشالت الخطوتين اللي قبلها، والاتصال مقامش. وكل محاولة تانية نفس الحكاية، لأن العنوان لسه على الكارت من تجربة قديمة اتقفلت من غير تنظيف.

السؤالين: ليه العنوان فضل؟ (قضية «جلسة ماتت وسابت وراها» في تاب التشخيص)، وليه الإعداد مش قادر يكمّل لو حاجة موجودة أصلًا؟ الدرس ده التاني.

---

## ١. نفس الغلطة في معمل

[[netsh]] اللي بيغيّر مش هنشغّله على جهاز حقيقي. نفس السلوك بالظبط في لينكس، في كونتينر بكارت وهمي:

~~~bash
docker run --rm -it --cap-add NET_ADMIN ubuntu:24.04
apt-get update -qq && apt-get install -y -qq iproute2
ip link add vpnlab0 type dummy && ip link set vpnlab0 up
~~~

[[--cap-add NET_ADMIN]] بيدّي الكونتينر صلاحية يغيّر شبكته هو بس (مش شبكة جهازك). و [[type dummy]] كارت وهمي ملوش سلك.

~~~text add مرتين، و route مرتين، و del مرتين
ip addr add 10.255.0.2/24 dev vpnlab0          → exit=0
ip addr add 10.255.0.2/24 dev vpnlab0          → Error: ipv4: Address already assigned.   exit=2
ip -6 addr add fd00::2/64 dev vpnlab0 (مرتين)  → Error: ipv6: address already assigned.   exit=2
ip route add 0.0.0.0/1 via 10.255.0.1 dev vpnlab0 (مرتين) → RTNETLINK answers: File exists   exit=2
ip route del 0.0.0.0/1 via 10.255.0.1 dev vpnlab0 (مرتين) → RTNETLINK answers: No such process exit=2
~~~

| الرسالة | معناها | ويندوز بيقولها إزاي |
|---|---|---|
| [[Address already assigned]] | العنوان على الكارت أصلًا | [[The object already exists.]] |
| [[RTNETLINK answers: File exists]] | الـ route موجود بنفس الوجهة والبوابة | [[The object already exists.]] |
| [[RTNETLINK answers: No such process]] | بتمسح حاجة مش موجودة | [[delete]] بيرجّع خطأ برضه (متجرّبش هنا) |

يعني [[add]] و [[del]] الاتنين **مش** idempotent: التانية بتفشل.

---

## ٢. أوامر بتشتغل في الحالتين

~~~text replace
ip addr replace 10.255.0.2/24 dev vpnlab0          → exit=0  (موجود)
ip route replace 0.0.0.0/1 via 10.255.0.1 dev vpnlab0 → exit=0  (موجود)
~~~

[[replace]] = «خلّي الحالة دي هي الحالة»، موجودة أو لأ. وفي ويندوز:

| ويندوز (من وثائق [[netsh]]) | بيعمل إيه |
|---|---|
| [[netsh interface ipv6 set address vpnlab0 fd00::2/64]] | [[set]] بيضبط عنوان موجود، وفي الحالة الحقيقية اشتغل كمان والعنوان مش موجود. فبقى بديل [[add]] |
| [[netsh interface ipv4 set interface name=vpnlab0 metric=1]] | [[set]] على الكارت نفسه: idempotent بطبيعته. (خلّى ويندوز يفضّل DNS الكارت، بس في الحالة الحقيقية زوّد مشكلة تانية، فبقى اختياري) |
| [[add route]] | مفيش [[set route]] بيضيف. فالحل التاني تحت: «already exists» = نجاح |

وفي PowerShell نفس الفكرة: [[New-NetRoute]] بيفشل لو موجود، فبتسأل الأول بـ [[Get-NetRoute -DestinationPrefix 0.0.0.0/1 -ErrorAction SilentlyContinue]] (درس «New-NetIPAddress» في تاب PowerShell).

---

## ٣. [[store=active]]: الـ route الدائم

~~~text netsh interface ipv4 add route /? | findstr /c:"default" (قراية بس)
                                         the default.
~~~

~~~text netsh interface ipv4 add route /? (الجزء ده)
       store             - One of the following values:
                           active: Change only lasts until next boot.
                           persistent: Change is persistent. This is
                                         the default.
~~~

يعني [[netsh interface ipv4 add route prefix=0.0.0.0/1 interface=vpnlab0 nexthop=10.255.0.1]] من غير [[store=]] بيعمل route **بيرجع بعد الـ restart**، والكارت ممكن ميكونش موجود ساعتها، فالنت يروح لكارت مش موجود. ده بيبان في [[route print]] تحت [[Persistent Routes]]:

~~~text route print -4 (جهاز سليم)
Persistent Routes:
  None
~~~

فأي [[add route]] في أداة VPN: [[store=active]]. وعناوين IPv6 كمان: [[netsh interface ipv6 add address /?]] بيقول [[persistent: Change is persistent (default).]]

وأمر الطوارئ لو route دائم فضل (من الوثائق): [[netsh interface ipv4 delete route prefix=0.0.0.0/1 interface=vpnlab0 nexthop=10.255.0.1]] من نافذة أدمن.

وقراية الجدول من غير ما تغيّر حاجة:

~~~text netsh interface ipv4 show route
Publish  Type      Met  Prefix                    Idx  Gateway/Interface Name
-------  --------  ---  ------------------------  ---  ------------------------
No       Manual    0    0.0.0.0/0                  13  192.168.1.1
No       System    256  127.0.0.0/8                 1  Loopback Pseudo-Interface 1
~~~

---

## ٤. سكربت إعداد وتراجع بيتشغّل مرتين (لينكس)

~~~bash lab-net.sh
#!/usr/bin/env bash
STATE=/run/lab-net.undo
step() {                       # step "<do>" "<undo>"
  out=$(eval "$1" 2>&1); rc=$?
  if [ $rc -eq 0 ] || grep -qiE 'already assigned|File exists|already exists' <<<"$out"; then
    echo "ok   ($rc) $1"; grep -qxF "$2" "$STATE" 2>/dev/null || echo "$2" >> "$STATE"; return 0
  fi
  echo "FAIL ($rc) $1: $out"; return 1
}
down() {
  [ -s "$STATE" ] || { echo "nothing to undo"; return 0; }
  tac "$STATE" | while read -r cmd; do eval "$cmd" 2>/dev/null; echo "undo $cmd -> $?"; done
  rm -f "$STATE"
}
case "$1" in
  up)
    step "ip addr add 10.255.0.2/24 dev vpnlab0"             "ip addr del 10.255.0.2/24 dev vpnlab0" &&
    step "ip route add 0.0.0.0/1 via 10.255.0.1 dev vpnlab0" "ip route del 0.0.0.0/1 via 10.255.0.1 dev vpnlab0" &&
    step "ip route add 128.0.0.0/1 via $__{GW:-10.255.0.1} dev vpnlab0" "ip route del 128.0.0.0/1 via $__{GW:-10.255.0.1} dev vpnlab0" ||
    { echo "rolling back"; down; exit 1; } ;;
  down) down ;;
esac
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[out=$(eval "$1" 2>&1); rc=$?]] | شغّل الخطوة وخد نصها (stdout و stderr) وكود خروجها |
| [[grep -qiE 'already assigned|File exists|already exists']] | لو فشلت بس السبب «موجود أصلًا»: ده نجاح. الحالة اللي عايزينها موجودة |
| [[grep -qxF "$2" "$STATE" || echo "$2" >> "$STATE"]] | سجّل أمر التراجع، **بس لو مش متسجّل**. [[-x]] السطر كله، و [[-F]] نص مش regex |
| [[&&]] بين الخطوات و [[||]] في الآخر | أول خطوة ترجع 1 بتوقف الباقي وتروح للـ rollback |
| [[tac]] | اقرا ملف الحالة من تحت لفوق: التراجع بالعكس (الـ route قبل العنوان) |
| [[rm -f "$STATE"]] | بعد التراجع: مفيش حاجة ترجع لها تاني |
| [[$__{GW:-10.255.0.1}]] | بوابة ممكن تتغيّر من بره ([[GW=...]]) عشان نجرّب الفشل |

~~~text والعنوان موجود أصلًا من «تشغيلة قديمة»: up
ok   (2) ip addr add 10.255.0.2/24 dev vpnlab0
ok   (0) ip route add 0.0.0.0/1 via 10.255.0.1 dev vpnlab0
ok   (0) ip route add 128.0.0.0/1 via 10.255.0.1 dev vpnlab0
exit=0
~~~

[[ok   (2)]]: الخطوة رجعت 2 بس اتحسبت نجاح، والإعداد كمّل. ده بالظبط اللي كان ناقص في الأداة.

~~~text up تاني، وبعدين down، وبعدين down تاني
ok   (2) ip addr add 10.255.0.2/24 dev vpnlab0
ok   (2) ip route add 0.0.0.0/1 via 10.255.0.1 dev vpnlab0
ok   (2) ip route add 128.0.0.0/1 via 10.255.0.1 dev vpnlab0
undo ip route del 128.0.0.0/1 via 10.255.0.1 dev vpnlab0 -> 0
undo ip route del 0.0.0.0/1 via 10.255.0.1 dev vpnlab0 -> 0
undo ip addr del 10.255.0.2/24 dev vpnlab0 -> 0
nothing to undo
~~~

~~~text GW=10.99.0.1 ./lab-net.sh up (بوابة مش على الشبكة)
ok   (0) ip addr add 10.255.0.2/24 dev vpnlab0
ok   (0) ip route add 0.0.0.0/1 via 10.255.0.1 dev vpnlab0
FAIL (2) ip route add 128.0.0.0/1 via 10.99.0.1 dev vpnlab0: Error: Nexthop has invalid gateway.
rolling back
undo ip route del 0.0.0.0/1 via 10.255.0.1 dev vpnlab0 -> 0
undo ip addr del 10.255.0.2/24 dev vpnlab0 -> 0
exit=1
~~~

فشل حقيقي (مش «موجود»)، فالتراجع رجّع الخطوتين اللي نجحوا بس، والكارت رجع فاضي.

### الباج اللي ظهر في أول نسخة

أول نسخة كانت [[echo "$2" >> "$STATE"]] من غير الـ [[grep -qxF]]. بعد [[up]] مرتين، ملف الحالة بقى فيه كل أمر مرتين، و [[down]] طلّع:

~~~text
undo ip route del 128.0.0.0/1 via 10.255.0.1 dev vpnlab0 -> 0
undo ip route del 0.0.0.0/1 via 10.255.0.1 dev vpnlab0 -> 0
undo ip addr del 10.255.0.2/24 dev vpnlab0 -> 0
undo ip route del 128.0.0.0/1 via 10.255.0.1 dev vpnlab0 -> 2
undo ip route del 0.0.0.0/1 via 10.255.0.1 dev vpnlab0 -> 2
undo ip addr del 10.255.0.2/24 dev vpnlab0 -> 2
~~~

الإعداد بقى idempotent والتراجع لأ. لازم الاتنين.

---

## ٥. نفس الفكرة في batch (ويندوز)

على ويندوز من غير ما نلمس الشبكة: الخطوات بتعمل فولدرات. [[mkdir]] على فولدر موجود بيرد [[A subdirectory or file vpnlab0 already exists.]]، يعني نفس شكل المشكلة.

~~~batch lab.bat
@echo off
setlocal enabledelayedexpansion
set "STATE=%~dp0undo.txt"
set "LOG=%~dp0step.log"
if /i "%~1"=="down" goto down
call :step "mkdir vpnlab0" "rmdir vpnlab0" || goto rollback
call :step "mkdir vpnlab0\routes" "rmdir vpnlab0\routes" || goto rollback
call :step "mkdir vpnlab0\%BADNAME%dns" "rmdir vpnlab0\dns" || goto rollback
echo up: all steps ok
exit /b 0

:step
%~1 > "%LOG%" 2>&1
set "RC=!errorlevel!"
if !RC! neq 0 findstr /i /c:"already exists" "%LOG%" >nul || (echo FAIL ^(!RC!^) %~1 & type "%LOG%" & exit /b 1)
echo ok   ^(!RC!^) %~1
if exist "%STATE%" findstr /x /c:"%~2" "%STATE%" >nul && exit /b 0
>>"%STATE%" echo %~2
exit /b 0

:rollback
echo rolling back
call :down
exit /b 1

:down
if not exist "%STATE%" (echo nothing to undo & exit /b 0)
set n=0
for /f "usebackq delims=" %%L in ("%STATE%") do (set /a n+=1 & set "U!n!=%%L")
for /l %%i in (!n!,-1,1) do (!U%%i! >nul 2>&1 && echo undo !U%%i! -^> ok || echo undo !U%%i! -^> FAILED)
del "%STATE%"
exit /b 0
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[%~1 > "%LOG%" 2>&1]] | شغّل الخطوة واكتب كل ناتجها في ملف (batch مفيهوش [[$( )]]) |
| [[set "RC=!errorlevel!"]] | خد الكود على طول، قبل أي أمر تاني يغيّره. [[!...!]] بسبب [[enabledelayedexpansion]] |
| [[findstr /i /c:"already exists"]] | «موجود أصلًا» = نجاح. ولأمر [[netsh]] الحقيقي نفس السطر بيلاقي [[The object already exists.]] |
| [[findstr /x /c:"%~2"]] | أمر التراجع مكتوب قبل كده؟ متكتبوش تاني (نفس باج لينكس) |
| [[for /f ... set "U!n!=%%L"]] | اقرا ملف الحالة في متغيرات [[U1]] و [[U2]]... (batch مفيهوش [[tac]]) |
| [[for /l %%i in (!n!,-1,1)]] | لف من الآخر للأول: التراجع بالعكس |
| [[&& ... || ...]] | نجح ولا لأ (تحت ليه مش [[%errorlevel%]]) |

~~~text .\lab.bat (وفولدر vpnlab0 موجود من قبل)، و .\lab.bat تاني
ok   (1) mkdir vpnlab0
ok   (0) mkdir vpnlab0\routes
ok   (0) mkdir vpnlab0\dns
up: all steps ok
ok   (1) mkdir vpnlab0
ok   (1) mkdir vpnlab0\routes
ok   (1) mkdir vpnlab0\dns
up: all steps ok
~~~

~~~text .\lab.bat down، و down تاني
undo rmdir vpnlab0\dns -> ok
undo rmdir vpnlab0\routes -> ok
undo rmdir vpnlab0 -> ok
nothing to undo
~~~

~~~text set BADNAME=? و .\lab.bat (خطوة ٣ بتفشل فعلًا)
ok   (0) mkdir vpnlab0
ok   (0) mkdir vpnlab0\routes
FAIL (1) mkdir vpnlab0\?dns
The filename, directory name, or volume label syntax is incorrect.
rolling back
undo rmdir vpnlab0\routes -> ok
undo rmdir vpnlab0 -> ok
exit=1
~~~

### فخ: [[rmdir]] مش بيصفّر [[errorlevel]]

النسخة الأولى كانت بتطبع [[-^> !errorlevel!]] بعد كل تراجع، وطلّعت [[-> 1]] مع إن الفولدرات اتمسحت فعلًا. اتجرّب:

~~~text cmd /v:on /c "mkdir x & mkdir x & echo after fail: !errorlevel! & rd x & echo after rd ok: !errorlevel!"
after fail: 1
after rd ok: 1
~~~

أوامر داخلية كتير في CMD (زي [[rd]] و [[echo]] و [[set]]) لما تنجح **مبتغيّرش** [[errorlevel]]، فبيفضل فيه رقم الأمر اللي فشل قبلها. لكن [[&&]] و [[||]] بيبصّوا على نجاح الأمر نفسه ([[rd x && echo rd said ok]] طبع [[rd said ok]]). فبعد أوامر داخلية: [[&&]] و [[||]]، مش [[%errorlevel%]].

### فخ: [['lab.bat' is not recognized]]

على جهاز التجربة [[.\lab.bat]] اشتغل و [[lab.bat]] لوحده رجّع [['lab.bat' is not recognized as an internal or external command,]] والسبب متغيّر البيئة [[NoDefaultCurrentDirectoryInExePath=1]]: بيمنع CMD يدوّر على البرامج في الفولدر الحالي (حماية من برنامج مزروع بنفس اسم أمر). فاكتب [[.\]] دايمًا في السكربتات.

---

## ٦. البدايل اللي اترفضت

| البديل | ليه لأ |
|---|---|
| تتجاهل أي خطأ ([[2>nul]] وتكمّل) | خطأ حقيقي (زي [[Nexthop has invalid gateway]]) يعدّي، والإعداد يبقى نصه شغّال |
| تمسح كل حاجة الأول ([[delete]] ثم [[add]]) | بتقطع الشبكة لحظة، ولو [[add]] فشل بعدها مفيش حاجة خالص. وكمان بتمسح حاجة يمكن مش بتاعتك |
| [[netsh]] من غير [[store=active]] | routes دائمة بتفضل بعد الـ restart لكارت مش موجود |
| تعدّ الخطوات بدل ملف حالة | لو العملية ماتت في النص، مفيش حاجة تقول اتعمل لحد فين |

---

## ٧. متتكررش

- كل خطوة إعداد: أمر بيشتغل في الحالتين ([[set]] و [[replace]])، أو «موجود» = نجاح.
- كل خطوة نجحت: أمر تراجعها في ملف حالة، مرة واحدة.
- أول فشل حقيقي: تراجع بالعكس، وكود خروج مش صفر.
- [[store=active]] في [[netsh]]، و [[route print]] قسم [[Persistent Routes]] = [[None]] بعد أي تجربة.
- جرّب السكربت **مرتين ورا بعض** و [[down]] **مرتين**، مش مرة.

---

## الخلاصة

| الموقف | اعمل |
|---|---|
| [[The object already exists.]] / [[File exists]] | الحالة المطلوبة موجودة: نجاح |
| عنوان IPv6 في ويندوز | [[netsh interface ipv6 set address ... store=active]] |
| route في ويندوز | [[netsh interface ipv4 add route ... store=active]] |
| لينكس | [[ip addr replace]] و [[ip route replace]] |
| التراجع | ملف حالة بالعكس ([[tac]] أو [[for /l]] بالسالب) |
| نجح؟ في batch | [[&&]] و [[||]] بعد الأوامر الداخلية |`,
          deep: {
            why: R`أي سكربت إعداد هيتشغّل أكتر من مرة: بعد فشل، أو بعد restart، أو من نسختين، أو بعد ما حد عمل نص الخطوات بإيده. لو التشغيلة التانية بتفشل على حاجة موجودة، السكربت بيعاقبك على إن الحالة **صح**. وفي الحالة الحقيقية ده خلّى الاتصال مستحيل لحد ما حد يمسح العنوان بإيده.`,
            how: R`[[netsh]] و [[ip]] الاتنين بيبعتوا طلب «أضف» للنظام (في ويندوز لـ NetIO عن طريق IP Helper API، وفي لينكس للكيرنل عن طريق netlink). النظام بيرفض لو العنصر موجود بنفس المفتاح (العنوان، أو الوجهة والبوابة): [[ERROR_OBJECT_ALREADY_EXISTS]] (5010) في ويندوز، و [[EEXIST]] في لينكس (وده اللي [[RTNETLINK answers: File exists]] بيقوله). [[replace]] في لينكس بيبعت الطلب بعلامة [[NLM_F_REPLACE]] و [[NLM_F_CREATE]] مع بعض: «اعمله أو بدّله». و [[store=persistent]] في ويندوز بيكتب في الـ registry تحت [[Tcpip\Parameters\PersistentRoutes]] فبيرجع مع كل boot.`,
            when: R`أي أداة بتركّب شبكة (VPN، أو Docker network، أو routes لـ lab)، وسكربتات setup لأي حاجة (فولدرات، ويوزرز، وقواعد firewall، وخدمات)، وأي خطوة في CI ممكن تتعاد. نفس المبدأ اللي Ansible و Terraform مبنيين عليه: «الحالة المطلوبة» مش «الأوامر».`,
            mistakes: R`تعامل «already exists» كفشل وتعمل rollback. أو العكس: تتجاهل كل الأخطاء. وتكتب أمر التراجع قبل ما الخطوة تنجح. وتسجّل التراجع مرتين فـ [[down]] يفشل على النص التاني. وتنسى [[store=active]]. وتعتمد على [[%errorlevel%]] بعد [[rd]] أو [[echo]] في batch. وتجرّب السكربت مرة واحدة بس.`
          },
          sol: R`في الكونتينر: [[ip addr add]] التانية [[Error: ipv4: Address already assigned.]] وكود 2، و IPv6 [[Error: ipv6: address already assigned.]]، و [[ip route add]] التانية [[RTNETLINK answers: File exists]]، و [[ip route del]] التانية [[RTNETLINK answers: No such process]]، و [[replace]] كود 0 في الحالتين. و [[lab-net.sh]]: [[up]] والعنوان موجود [[ok   (2)]] وكمّل، و [[up]] تاني كله [[ok   (2)]]، و [[down]] ٣ سطور [[-> 0]]، و [[down]] تاني [[nothing to undo]]، و [[GW=10.99.0.1]] طلّع [[FAIL (2) ... Error: Nexthop has invalid gateway.]] ورجّع الخطوتين و [[exit=1]]. والنسخة من غير [[grep -qxF]] طلّعت ٣ تراجعات [[-> 2]] زيادة.

وعلى ويندوز: [[lab.bat]] مرتين [[up: all steps ok]]، و [[down]] ٣ [[ok]]، و [[BADNAME=?]] طلّع [[The filename, directory name, or volume label syntax is incorrect.]] و [[exit=1]]، و [[rd]] الناجح ساب [[errorlevel]] = 1. و [[netsh interface ipv4 add route /?]] (قراية بس): [[persistent: Change is persistent. This is the default.]]، و [[route print]]: [[Persistent Routes:]] و [[None]].

اتجرّب في [[ubuntu:24.04]] بـ [[--cap-add NET_ADMIN]] وعلى ويندوز 11 في CMD. أوامر [[netsh ... add/set/delete]] ونص [[The object already exists.]] من الحالة الأصلية ووثائق [[netsh]]، ومتشغّلتش على الجهاز.`,
          practice: [
            { lvl: 'سريع', t: R`**اشرحها:** من غير ما تبص: اكتب ٣ رسايل معناها «موجود أصلًا» (ويندوز ولينكس)، وأمرين بيشتغلوا في الحالتين.`, done: R`[[The object already exists.]] و [[Address already assigned]] و [[RTNETLINK answers: File exists]]، و [[ip addr replace]] (أو [[ip route replace]]) و [[netsh interface ipv6 set address]].` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** في [[lab-net.sh]] لو بدّلت ترتيب [[&&]] و [[||]] في آخر [[up]] بحيث [[||]] بعد كل خطوة لوحدها، فشل الخطوة التانية هيعمل إيه؟ وبعدين جرّب بـ [[GW]].`, done: R`توقعت إن الـ rollback هيحصل بس السكربت هيكمّل للخطوة اللي بعدها (لأن [[||]] بيرجّع نجاح)، وده اللي حصل، ورجّعت الترتيب.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[for /l %%i in (!n!,-1,1) do (!U%%i! >nul 2>&1 & echo undo !U%%i! -^> !errorlevel!)]] بيطبع [[-> 1]] والفولدرات اتمسحت. ليه؟ وصلّحه.`, done: R`السبب إن [[rmdir]] الناجح مبيصفّرش [[errorlevel]] فبيفضل 1 من الخطوة اللي فشلت، والإصلاح [[&& echo ... ok || echo ... FAILED]]، والناتج بقى [[ok]].` },
            { lvl: 'تطبيق', t: R`**ابني:** زوّد على [[lab-net.sh]] خطوة رابعة: [[ip -6 addr add fd00::2/64 dev vpnlab0]] بتراجعها، وشغّل [[up]] مرتين و [[down]] مرتين.`, done: R`[[up]] التانية فيها [[ok   (2) ip -6 addr add ...]]، و [[down]] بيرجّع ٤ خطوات أولها الـ IPv6، و [[ip -6 addr show dev vpnlab0 | grep -c fd00]] بعدها صفر.` },
            { lvl: 'تحدي', t: R`**ابني:** [[safe-setup.sh]] عام: بياخد ملف خطوات كل سطر فيه [[do ||| undo]]، وبينفّذ بنفس قواعد [[lab-net.sh]]، ومع [[--dry-run]] بيطبع الخطة بس، ومع [[status]] بيطبع اللي في ملف الحالة. جرّبه على خطوات [[mkdir]] و [[ip]].`, done: R`نفس ملف الخطوات بيتشغّل مرتين من غير فشل، وخطوة فيها خطأ حقيقي بترجّع اللي قبلها، و [[status]] بعد [[up]] بيطبع أوامر التراجع بالترتيب اللي هتتنفّذ بيه، و [[--dry-run]] مبيغيّرش حاجة.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من [[netsh interface ipv4 add route /?]] و [[netsh interface ipv6 add address /?]] و [[netsh interface ipv4 set interface /?]] (قراية بس)، اكتب لكل أمر القيمة الافتراضية لـ [[store]]، وإيه اللي [[metric]] بيعمله.`, done: R`كتبت إن [[persistent]] هو الافتراضي في الاتنين، والسطر بالنص من الـ help، وإن [[metric]] بيتضاف على metric الـ routes بتاعة الكارت (السطر [[Interface metric, added to route metrics]]).` },
          ],
          ci: [
            { os: [R`windows`], sh: R`cmd`, run: R`@echo off
mkdir vpnlab0
mkdir vpnlab0 2>step.log
echo mkdir2 errorlevel=%errorlevel%
findstr /i /c:"already exists" step.log >nul && echo treated as ok
setlocal enabledelayedexpansion
mkdir x 2>nul & mkdir x 2>nul
echo after fail: !errorlevel!
rd x
echo after rd ok: !errorlevel!
mkdir y & rd y && echo rd said ok
netsh interface ipv4 add route /? | findstr /c:"the default"`, expect: [R`mkdir2 errorlevel=1`, R`treated as ok`, R`after fail: 1`, R`after rd ok: 1`, R`rd said ok`, R`the default.`] },
            { os: [R`ubuntu`], sh: R`bash`, run: R`sudo unshare -n bash -c '
ip link set lo up
ip addr add 10.255.0.2/24 dev lo; echo "add1=$?"
ip addr add 10.255.0.2/24 dev lo 2>&1; echo "add2=$?"
ip addr replace 10.255.0.2/24 dev lo; echo "replace=$?"
ip route add 0.0.0.0/1 via 10.255.0.1 dev lo
ip route add 0.0.0.0/1 via 10.255.0.1 dev lo 2>&1; echo "route2=$?"
ip route replace 0.0.0.0/1 via 10.255.0.1 dev lo; echo "route-replace=$?"
'`, expect: [R`add1=0`, R`Address already assigned`, R`add2=2`, R`replace=0`, R`RTNETLINK answers: File exists`, R`route2=2`, R`route-replace=0`] },
          ],
        }
      ]
    }
]);
