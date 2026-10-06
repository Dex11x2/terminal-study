// تكملة تاب cmd: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cmd/01.js (شرح حقول الدرس في أوله)
MORE("cmd", [
    {
      t: "تحكّم في الشبكة والأجهزة اللي معاك",
      l: 2,
      n: R`فايروول و IP ثابت وواي فاي وتصليح النت وشير و Remote Desktop وأجهزة تانية على شبكتك. أغلب التغيير محتاج CMD كأدمن والخطير عليه علامة، واللي بيدوّر على أجهزة: على شبكتك انت بس أو بإذن صاحبها`,
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
| [[State ON]] | الفايروول شغال |
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
| [[Enabled]] | القاعدة شغالة |
| [[Direction: In]] | على الاتصالات الداخلة |
| [[Profiles]] | على أنهي نوع شبكة. هنا التلاتة |
| [[Grouping]] | جروب القاعدة (البرامج بتحط قواعدها في جروب باسمها) |
| [[LocalIP]] و [[RemoteIP]] | عنوان جهازك والعنوان اللي جاي منه. [[Any]] يعني أي عنوان |
| [[Protocol]] و [[LocalPort]] | البروتوكول والبورت على جهازك (5353 بورت mDNS) |
| [[Action: Allow]] | اسمح |

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
| [[action=allow]] | اسمح بيها |
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
            R`أنهي profile شغال دلوقتي، والفايروول شغال فيه ولا لأ.`,
            R`أسامي كل القواعد الداخلة ([[/c:]] عشان المسافة تتقري كجزء من الكلام).`,
            R`افتح بورت 5173 للداخل على الشبكات الخاصة بس (أدمن).`,
            R`اتأكد إنها اتعملت.`,
            R`امنع برنامج يكلم النت.`,
            R`امسح قاعدة البورت.`,
            R`وقاعدة البرنامج.`
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
| [[Type]] | [[Dedicated]] كارت عادي |
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
| [[set address]] | غيّر العنوان |
| [[name="Wi-Fi"]] | على الكارت ده |
| [[static]] | بإيدي، مش من الراوتر |
| [[192.168.1.50]] | العنوان الجديد |
| [[255.255.255.0]] | الـ mask |
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
            R`أسامي الكروت، وأنهي واحد متوصل.`,
            R`إعدادات الـ IP والـ DNS بتاعة الواي فاي دلوقتي (اكتبها قبل أي تغيير).`,
            R`IP ثابت: العنوان والـ mask والراوتر (أدمن، وبيقطع ثانية).`,
            R`أول DNS.`,
            R`DNS تاني كاحتياطي.`,
            R`اتأكد إن الراوتر لسه بيرد.`,
            R`رجّع الـ IP أوتوماتيك من الراوتر.`,
            R`ورجّع الـ DNS أوتوماتيك.`
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
            R`الاتصال الحالي: الشبكة والإشارة والقناة والسرعة.`,
            R`الشبكات اللي حواليك، ولكل راوتر قناته وإشارته.`,
            R`الشبكات المحفوظة على الجهاز.`,
            R`اتصل بشبكة محفوظة.`,
            R`فولدر للتصدير.`,
            R`صدّر كل الشبكات ومعاها الباسوردات (أدمن عشان الباسورد يطلع واضح).`,
            R`على الجهاز الجديد: ضيف شبكة من الملف.`,
            R`انسى شبكة مش محتاجها.`,
            R`تقرير HTML عن آخر 3 أيام (أدمن).`
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
            R`الشيرات اللي جهازك عاملها، ومنها الإدارية C$ و ADMIN$ و IPC$.`,
            R`على جهاز الملفات: شير D:\Docs قراية بس للكل (أدمن).`,
            R`على الجهاز التاني: الدرايفات المتوصلة.`,
            R`وصّل الشير كدرايف Z، ويرجع بعد الـ restart.`,
            R`وصّل بالـ IP وبيوزر من الجهاز التاني، والـ [[*]] تسأل على الباسورد.`,
            R`افتحه زي أي درايف.`,
            R`افصل Z.`,
            R`وافصل Y.`,
            R`على جهاز الملفات: شيل الشير (الفولدر باقي).`
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
            R`افتح جلسة بيوزر أدمن من الجهاز التاني (هيسأل على الباسورد).`,
            R`restart بعد دقيقة، والرسالة بتظهر للي قدامه.`,
            R`الغيه.`,
            R`إيقاف فوري بسبب مخطط.`,
            R`اقفل الجلسة.`,
            R`النافذة الرسومية لأكتر من جهاز.`
          ],
          sol: R`(مشغّلتهوش لأنه بيقفل جهاز تاني؛ ده من توثيق shutdown و UAC.) لو كل حاجة مظبوطة: [[shutdown /r /m \\192.168.1.50 /t 600 /c "Test"]] مش بيطبع حاجة عندك، والجهاز التاني بيطلّع إشعار إنه هيعمل restart وفيه الرسالة، و [[shutdown /a /m \\192.168.1.50]] بيلغيه.

الأخطاء بتطلع بالشكل [[192.168.1.50: Access is denied.(5)]]: اليوزر مش أدمن هناك، أو أدمن محلي اتشالت صلاحياته على الشبكة، أو جلسة [[IPC$]] مفتوحة بيوزر تاني. و [[The network path was not found.(53)]]: الجهاز مقفول، أو الاسم غلط، أو File and printer sharing مقفول، أو الشبكة Public. و [[net use \\PC\IPC$]] بباسورد غلط: [[System error 1326 has occurred.]] و [[The user name or password is incorrect.]] (النصوص دي طلّعتها بـ [[net helpmsg 53]] و [[net helpmsg 1326]]).`
        }
      ]
    },
    {
      t: "المتغيرات والاختصارات",
      l: 2,
      n: "",
      items: [
        {
          cmd: "set / setx",
          title: "متغيرات البيئة",
          desc: R`متغيرات البيئة قيم بيشوفها أي برنامج بتشغّله، زي [[PATH]] (الفولدرات اللي بيدوّر فيها على البرامج) و [[USERPROFILE]] و [[TEMP]]. [[set]] لوحده بيعرضهم كلهم، و [[set PORT=3000]] بيعمل متغير للنافذة دي بس، ومن غير مسافات حوالين [[=]]. وبتقرا القيمة بالمتغير بين علامتين [[%]]: [[echo %PORT%]]، زي [[$PORT]] في bash.

[[setx]] بيحفظ المتغير دايمًا في إعدادات اليوزر، بس بيظهر في النوافذ الجديدة بس، مش في اللي انت فيها. والقيمة اللي فيها مسافات أو رموز بين علامات تنصيص.

تحذير مهم: متعملش [[setx PATH "%PATH%;..."]] أبدًا. [[%PATH%]] في النافذة دي هو PATH النظام واليوزر لازقين في بعض، و setx بيكتبهم كلهم في PATH اليوزر، وبيقص أي حاجة بعد 1024 حرف. عدّل الـ PATH من Edit environment variables في ويندوز. وفي ملفات bat المتغيرات بتتعمل بنفس الطريقة، والتفاصيل في «set و %1» و «setlocal / endlocal».`,
          example: R`set
set PORT=3000
echo %PORT%
echo %PATH%
setx API_URL "http://localhost:3000"`,
          try: "اعمل set لمتغير واطبعه، وافتح نافذة جديدة ولاحظ إنه مش موجود.",
          deep: {
            why: "متغيرات البيئة في CMD. [[set]] للجلسة الحالية، [[setx]] للحفظ الدائم.",
            how: R`[[set VAR=value]] بيضبط المتغير للجلسة الحالية بس. [[echo %VAR%]] بيقراه (نسبة مئوية من الطرفين).

[[setx VAR value]] بيحفظ دائم في الـ registry للـ user. بيأثر على الجلسات الجديدة مش الحالية.

[[setx VAR value /m]] للـ System (كل المستخدمين)، محتاج Admin.

[[set]] من غير حاجة بيعرض كل المتغيرات. [[set JAVA]] بيعرض المتغيرات اللي بتبدأ بـ JAVA.`,
            when: "تضبط JAVA_HOME أو NODE_ENV. (الـ PATH عدّله من System Properties مش بـ setx.)",
            mistakes: "set بيضيف المسافات لو كتبت [[set VAR = value]] (مسافة قبل وبعد =). اكتب [[set VAR=value]] بدون مسافات."
          },
          teach: R`## الأول: متغير البيئة يعني إيه؟

متغير البيئة (environment variable) اسم وجنبه قيمة، شايلهم ويندوز لكل برنامج شغال. ولما برنامج يشغّل برنامج تاني، التاني بياخد **نسخة** منهم. فـ Node و Python و git كلهم يقدروا يقروا [[PATH]] و [[USERPROFILE]] واللي انت تعمله. الأوامر اتشغّلت هنا في CMD على ويندوز 11، إلا [[setx]] (تحت ليه)، والأسامي في الناتج متغيّرة.

---

## ١. [[set]] لوحده: كله

~~~cmd
set
~~~

بيطبع كل المتغيرات بالشكل [[اسم=قيمة]]، مترتبين أبجديًا، وهما كتير. سطرين منهم:

~~~text الناتج (جزء)
ALLUSERSPROFILE=C:\ProgramData
APPDATA=C:\Users\ali\AppData\Roaming
...
~~~

ولو كتبت بعده بداية اسم بيطبع اللي بيبدأوا بيها بس. [[set USER]]:

~~~text الناتج
USERDOMAIN=MYPC
USERDOMAIN_ROAMINGPROFILE=MYPC
USERNAME=ali
USERPROFILE=C:\Users\ali
~~~

ولو مفيش ولا واحد: [[set NOPE]] طبع [[Environment variable NOPE not defined]].

---

## ٢. اعمل متغير: [[set PORT=3000]]

- [[set]] الأمر.
- [[PORT]] الاسم. الكابيتال عادة مش شرط: CMD مش بيفرق بين [[PORT]] و [[port]].
- [[=3000]] القيمة. كل حاجة بعد [[=]] لحد آخر السطر.

مش بيطبع حاجة. والمتغير ده موجود في **النافذة دي بس** (والبرامج اللي هتشغّلها منها)، ولما تقفلها يروح.

### المسافات حوالين [[=]]

في CMD المسافة جزء من الاسم والقيمة. جرّبت [[set PORT = 3000]] وبعدها [[set PORT]]:

~~~text الناتج
PORT = 3000
~~~

شكله صح، بس اللي اتعمل متغير اسمه [[PORT ]] (بمسافة في الآخر) وقيمته [[ 3000]] (بمسافة في الأول). و [[echo [%PORT %]]] طبع [[[ 3000]]]. فاكتبها لازقة: [[set PORT=3000]].

---

## ٣. اقراه: [[echo %PORT%]]

[[%PORT%]]: الاسم بين علامتين [[%]] معناه «حط القيمة هنا». CMD بيبدّل [[%PORT%]] بـ [[3000]] **قبل** ما ينفّذ السطر، فـ [[echo]] بيشوف [[echo 3000]]:

~~~text الناتج
3000
~~~

ولو المتغير مش موجود (افتح نافذة جديدة وجرّب)، CMD بيسيب الكلام زي ما هو:

~~~text الناتج في نافذة جديدة
%PORT%
~~~

> «قبل ما ينفّذ السطر» دي مهمة: جرّبت [[set PORT=3000& echo %PORT%]] **في سطر واحد** وطبع [[%PORT%]]، لأن CMD بدّل [[%PORT%]] في السطر كله قبل ما [[set]] يشتغل. لما تكتبهم في سطرين بيشتغل عادي. وده بالظبط موضوع درس «%errorlevel% و !errorlevel!».

---

## ٤. [[echo %PATH%]]

[[PATH]] أهم متغير: لستة فولدرات مفصولة بـ [[;]]، ولما تكتب اسم برنامج ([[git]] مثلًا)، CMD بيدوّر عليه فيهم بالترتيب (درس where). الناتج سطر واحد طويل جدًا، أوله هنا:

~~~text الناتج (أول ٦٠ حرف)
C:\Program Files\WindowsApps\Microsoft.PowerShell_7.6.6.0_x6
~~~

(طلّعت أول ٦٠ حرف بـ [[%PATH:~0,60%]]: [[:~0,60]] بعد الاسم معناها «من الحرف رقم 0، خد 60 حرف».)

---

## ٥. احفظه دايمًا: [[setx API_URL "http://localhost:3000"]]

[[setx]] (set extended) برنامج منفصل مش جزء من CMD، وبيكتب المتغير في إعدادات اليوزر في الريجستري:

- [[API_URL]] الاسم، **من غير [[=]]**: في setx الاسم والقيمة مفصولين بمسافة.
- [[" "]] حوالين القيمة عشان فيها رموز زي [[:]] و [[/]]، وأي قيمة فيها مسافة لازم كده.

حسب توثيق setx بيطبع [[SUCCESS: Specified value was saved.]]. بس النافذة اللي انت فيها **مش بتتغيّر**: [[echo %API_URL%]] فيها هيطبع [[%API_URL%]]. النوافذ اللي هتفتحها بعد كده بس هي اللي هتلاقيه، لأن كل نافذة بتاخد نسختها من المتغيرات وهي بتفتح. ومشغّلتهوش هنا لأنه بيغيّر إعدادات اليوزر بشكل دايم.

و [[setx ... /m]] (machine) لكل اليوزرز، ومحتاج أدمن.

---

## الخلاصة

| عايز | الأمر | بيعيش قد إيه |
|---|---|---|
| كل المتغيرات | [[set]] | — |
| اللي بيبدأوا بكذا | [[set USER]] | — |
| متغير مؤقت | [[set PORT=3000]] (من غير مسافات) | النافذة دي |
| اقرا قيمة | [[echo %PORT%]] | — |
| متغير دايم | [[setx NAME "value"]] (من غير [[=]]) | النوافذ الجديدة |

> [[set]] بـ [[=]] ومن غير مسافات، و [[setx]] بمسافة ومن غير [[=]]. ومتعملش [[setx PATH "%PATH%;..."]] أبدًا: عدّل الـ PATH من شاشة Environment Variables.`,
          lines: [
            "كل المتغيرات.",
            "متغير للجلسة دي بس. من غير مسافات حوالين =.",
            "اقراه: النسبة المئوية من الطرفين.",
            "الـ PATH.",
            "متغير دائم لليوزر (بيظهر في النوافذ الجديدة بس)."
          ],
          sol: R`[[set PORT=3000]] وبعدين [[echo %PORT%]] بيطبع [[3000]]. افتح نافذة CMD جديدة واكتب [[echo %PORT%]]: هيطبع [[%PORT%]] زي ما هي، لأن CMD لما المتغير مش موجود بيسيب الكلام زي ما هو بدل ما يطبع فاضي.

لو عايزه يفضل استخدم [[setx PORT 3000]]، هيقولك [[SUCCESS: Specified value was saved.]]، بس في النافذة الحالية [[echo %PORT%]] مش هتتأثر، النوافذ الجديدة بس. (setx مجربتهوش هنا لأنه بيكتب في الـ registry بشكل دائم؛ الرسالة من توثيق setx على Microsoft Learn، وإنه بيأثر على النوافذ الجديدة بس مكتوب في [[setx /?]].) وخد بالك من [[set PORT = 3000]] بمسافات، ده بيعمل متغير اسمه [["PORT "]] بمسافة وقيمته [[" 3000"]]: جربتها و [[echo [%PORT %]]] طبع [[[ 3000]]].`
        },
        {
          cmd: "doskey",
          title: "اختصارات",
          desc: R`[[doskey]] بيعمل اختصارات (macros) للأوامر الطويلة، زي [[alias]] في bash. الشكل: الاسم الجديد، و [[=]]، والأمر الحقيقي. فـ [[doskey gs=git status]] بيخلي [[gs]] تشغّل git status.

[[$*]] جوه الـ macro معناها «أي حاجة اتكتبت بعد الاختصار»، فـ [[ll src]] بتبقى [[dir /a src]]. وفيه [[$1]] و [[$2]] للـ arguments بالترتيب، و [[$T]] بتفصل أمرين جوه macro واحد. و [[doskey /macros]] بيعرض اللي عملته.

الاختصارات دي بتروح لما تقفل النافذة، ومش بتشتغل جوه ملفات bat ولا في PowerShell. عشان تفضل: حطها في ملف macros.txt (كل سطر [[gs=git status]]) وحمّله بـ [[doskey /macrofile=macros.txt]]. و F7 في CMD بيفتح قايمة بالأوامر اللي كتبتها، و F8 بيكمّل من التاريخ.`,
          example: R`doskey ll=dir /a $*
doskey gs=git status`,
          try: "اعمل alias اسمه ll وجربه.",
          deep: {
            why: R`أوامر طويلة بتكتبها كل يوم ([[git status]] و [[dir /a]] و [[cd /d D:\projects\shop]]). doskey بيخليها كلمتين، زي alias في bash. بس بيضيع مع النافذة، فلازم تعرف تحفظه.`,
            how: R`[[doskey ls=dir /w $*]] بيعمل alias [[ls]] يشغّل [[dir /w]]. [[$*]] هي الـ arguments اللي بتتمرر.

[[doskey /macros]] بيعرض كل الـ macros المعمولة.

للحفظ الدائم: اعمل ملف .bat بيه كل الـ doskey commands، وضيفه في autorun في الـ registry: [[HKCU\Software\Microsoft\Command Processor\AutoRun]].`,
            when: "اختصارات للأوامر الطويلة في CMD.",
            mistakes: R`تفتكر الاختصار هيشتغل جوه ملف bat (مش هيشتغل، الـ bat بيشوف الأوامر الحقيقية بس). أو تسمّي اختصار باسم أمر موجود فيغطّي عليه. أو تتعب في الـ registry (AutoRun) وتنسى إنه بيشتغل مع كل cmd بيتفتح حتى جوه سكربتات وبرامج تانية.`
          },
          teach: R`## الأول: اختصار بيتبدّل وانت بتكتب

[[doskey]] برنامج قديم من أيام DOS (الاسم منه)، شغلته إنه يمسك اللي بتكتبه في نافذة CMD **قبل** ما CMD يشوفه. فلو عملت اختصار (macro) اسمه [[gs]]، وكتبت [[gs]] وضغطت Enter، doskey بيبدّله بـ [[git status]] و CMD بيستلم الأمر الحقيقي. زي [[alias]] في bash.

اتشغّل هنا في CMD على ويندوز 11.

---

## ١. [[doskey ll=dir /a $*]]

| الحتة | معناها |
|---|---|
| [[doskey]] | البرنامج |
| [[ll]] | اسم الاختصار اللي هتكتبه |
| [[=]] | الفاصل: اللي على الشمال الاختصار، واللي على اليمين بيتبدّل بيه |
| [[dir /a]] | الأمر الحقيقي: [[dir]] بكل الملفات حتى المخفية ([[/a]] = all attributes، درس dir) |
| [[$*]] | «أي حاجة اتكتبت بعد [[ll]]» |

### [[$*]] بالظبط بتعمل إيه؟

من غيرها، [[ll src]] هيتبدّل بـ [[dir /a]] بس وكلمة [[src]] تضيع. معاها:

~~~text اللي بتكتبه ← اللي CMD بيستلمه
ll           ←  dir /a
ll src       ←  dir /a src
ll src /s    ←  dir /a src /s
~~~

وفيه [[$1]] و [[$2]] لحد [[$9]] لو عايز كل كلمة في مكان معين، و [[$T]] بتفصل أمرين جوه اختصار واحد ([[doskey up=cd .. $T dir]]).

---

## ٢. [[doskey gs=git status]]

نفس الشكل، من غير [[$*]] لأن [[git status]] مش محتاج حاجة بعده. الاتنين مش بيطبعوا حاجة.

---

## ٣. اتأكد: [[doskey /macros]]

[[/macros]] اعرض الاختصارات اللي عملتها. جرّبته بعد السطرين:

~~~text الناتج
ll=dir /a $*
gs=git status
~~~

---

## إمتى بيشتغل وإمتى لأ

الاختصار بيتبدّل بس لما **انت** تكتبه بالكيبورد في نافذة CMD، لأن doskey قاعد على الكيبورد مش جوه CMD. جرّبت أبعت نفس الأوامر لـ CMD من غير كيبورد (بـ pipe من برنامج تاني): [[doskey /macros]] عرضهم، بس [[ll]] طلّع:

~~~text الناتج
'll' is not recognized as an internal or external command,
operable program or batch file.
~~~

ونفس السبب بيخلّيه مش شغال جوه ملفات bat ولا في PowerShell. والاختصارات بتروح لما تقفل النافذة. عشان تفضل: حطهم في ملف نص (كل سطر [[gs=git status]]) وحمّلهم بـ [[doskey /macrofile=macros.txt]]، أو في ملف بيشتغل مع كل نافذة (درس title و mode con).

---

## الخلاصة

| عايز | الأمر |
|---|---|
| اختصار ثابت | [[doskey gs=git status]] |
| اختصار بياخد كلام بعده | [[doskey ll=dir /a $*]] |
| أمرين في اختصار | [[... $T ...]] |
| اعرض اختصاراتك | [[doskey /macros]] |
| حمّل من ملف | [[doskey /macrofile=macros.txt]] |

> doskey بيبدّل اللي بتكتبه بإيدك في CMD بس. مش في bat، ومش في PowerShell، ومش بعد ما تقفل النافذة.`,
          lines: ["اختصار: [[ll]] تبقى dir /a، و [[$*]] بيمرر أي arguments.", "اختصار لـ git status."],
          sol: R`[[doskey ll=dir /a $*]] مش بيطبع حاجة. [[ll]] بعدها بيطبع dir بالملفات المخفية، و [[ll src]] بيعرض src لأن [[$*]] بتاخد أي حاجة بعد ll.

الـ alias بيروح لما تقفل النافذة، ومش بيشتغل في PowerShell ولا جوه ملفات bat. لو [[ll]] قالك is not recognized، يبقى انت في نافذة جديدة أو في PowerShell. و [[doskey /macros]] بيعرض كل الـ aliases اللي عملتها.`
        }
      ]
    },
    {
      t: "شكّل CMD بتاعك",
      l: 2,
      n: R`الألوان والـ prompt والعنوان والحجم، وإزاي تخليهم يفتحوا معاك في كل نافذة`,
      items: [
        {
          cmd: "color",
          title: "لوّن شاشة CMD",
          desc: R`[[color]] بيغيّر لون الخلفية ولون الكلام في نافذة CMD كلها مرة واحدة. بياخد رقمين لازقين في بعض: الأول للخلفية والتاني للكلام، فـ [[color 0A]] يعني خلفية سودا وكلام أخضر فاتح.

الأرقام hex، يعني العد بيكمّل بعد 9 بحروف: [[A]] هي 10 لحد [[F]] هي 15، والحرف كابيتال أو سمول زي بعض. ده الجدول اللي بيطبعه [[color /?]]، وأي رقم ينفع للخلفية أو للكلام، والفاتح من كل لون هو رقمه زائد 8:
[[0]] أسود و [[8]] رمادي
[[1]] أزرق و [[9]] أزرق فاتح
[[2]] أخضر و [[A]] أخضر فاتح
[[3]] تركواز (Aqua) و [[B]] تركواز فاتح
[[4]] أحمر و [[C]] أحمر فاتح
[[5]] بنفسجي و [[D]] بنفسجي فاتح
[[6]] أصفر غامق و [[E]] أصفر فاتح
[[7]] أبيض (شكله رمادي فاتح) و [[F]] أبيض ساطع

[[color]] لوحدها بترجّع الألوان اللي النافذة فتحت بيها. ولو الرقمين زي بعض ([[color 77]]) الأمر مش بيتنفذ، لأن الكلام هيختفي في الخلفية، وبيحط errorlevel بـ 1 (درس if و errorlevel). ورقم واحد بس ([[color A]]) بيبقى لون الكلام والخلفية سودا. وأي حاجة مش hex زي [[color 0Z]] بتطبع صفحة المساعدة ومش بتغيّر حاجة.

اللون بيتغيّر للشاشة كلها، حتى الكلام اللي اتكتب قبل كده، وبيفضل لحد ما تقفل النافذة. في نافذة CMD القديمة (conhost) الـ 16 لون جايين من جدول ألوان النافذة (كليك يمين على العنوان، Properties، Colors). وفي Windows Terminal نفس الأرقام بتتحوّل لألوان الـ color scheme بتاع البروفايل، فـ [[A]] بتبقى «الأخضر الفاتح» بتاع الـ scheme اللي انت مختاره، ودرجته ممكن تختلف. ولو عايز ألوان دايمة في Windows Terminal، غيّر Color scheme من إعدادات البروفايل بدل color.`,
          example: R`color /?
color 0A
color 1F
color 77
echo %errorlevel%
color`,
          try: R`جرّب [[color 0A]] و [[color 1F]] و [[color E0]]، وبعدين [[color 77]] واطبع [[%errorlevel%]]، وفي الآخر [[color]] لوحدها. ولو عندك Windows Terminal، جرّب نفس الأوامر فيه وفي النافذة القديمة (اكتب [[conhost]] في Win+R) وقارن الدرجات.`,
          deep: {
            why: R`عشان تفرّق بين النوافذ بعينك: نافذة السيرفر لون، ونافذة الأدمن لون، ونافذة متوصلة بـ production أحمر يفكّرك تاخد بالك. وفي سكربتات bat اللون بيلفت النظر لرسالة نجاح أو فشل.`,
            how: R`[[color]] أمر داخلي في cmd.exe، بيغيّر «اللون الافتراضي» للنافذة ويعيد تلوين كل الخانات اللي على الشاشة، عشان كده الكلام القديم بيتلوّن كمان. والأرقام مش ألوان ثابتة: كل رقم مكان في جدول من 16 لون. الجدول ده في الكونسول القديم من Properties ثم Colors (وفي ويندوز 10 و 11 افتراضيًا scheme اسمه Campbell)، وفي Windows Terminal من الـ color scheme بتاع البروفايل.

اللون اللي [[color]] لوحدها بترجعله جاي من واحد من تلاتة (زي ما [[color /?]] بيقول): [[/T]] لو النافذة اتفتحت بـ [[cmd /t:0A]]، أو قيمة [[DefaultColor]] في الريجستري تحت [[HKCU\Software\Microsoft\Command Processor]]، أو ألوان النافذة لما فتحت. جرّبت في نافذة conhost: في CMD عادي (اللي بتفتحه وتكتب فيه) [[color]] رجّعت الأسود والرمادي و errorlevel 0. لكن في سكربت متشغّل بـ [[cmd /c]] (وده اللي بيحصل في الدبل كليك على ملف bat) [[color]] لوحدها مغيّرتش حاجة ورجّعت errorlevel 1. فجوه السكربتات اكتب اللون صريح: [[color 07]].

[[color]] بيلوّن الشاشة كلها بس. لون لكلمة واحدة (زي OK أخضر و FAIL أحمر في نفس السطر) محتاج ANSI codes، ودي في درس prompt.

Windows Terminal: [[color]] شغال فيه، بس فيه نسخ كان فيها bugs معاه (زي إن الجزء الفاضي من الشاشة يرجع للون البروفايل بعد ما الكلام يعمل scroll). لو شفت حاجة زي كده، ده مش من عندك.`,
            when: R`نافذة شغال فيها سيرفر أو متوصلة بـ production وعايزها تبان مختلفة، أو سكربت bat بيقلب أحمر لو حصل خطأ ([[color 4F]] قبل رسالة الفشل)، أو نافذة أدمن تميّزها من أول نظرة.`,
            mistakes: R`[[color 77]] أو أي رقمين زي بعض وتستغرب إن مفيش حاجة حصلت. أو تفتكر إن color بيلوّن اللي جاي بس، وهو بيلوّن الشاشة كلها. أو [[color green]] (لازم أرقام). أو خلفية فاتحة وكلام فاتح ([[color EF]]) فمتقراش حاجة. أو تشغّل سكربت فيه color من CMD مفتوح وتنسى إن اللون هيفضل في النافذة بعد ما السكربت يخلص.`
          },
          teach: R`## الأول: رقمين، واحد للخلفية وواحد للكلام

[[color]] أمر جوه CMD نفسه (مش برنامج منفصل)، بياخد خانتين لازقين: **الأولى الخلفية والتانية الكلام**. وبيلوّن النافذة كلها مرة واحدة.

---

## ١. [[color /?]]: الجدول

[[/?]] مع أي أمر في CMD معناها «اعرض المساعدة». ودي اللي اتطبعت هنا:

~~~text الناتج (جزء)
Color attributes are specified by TWO hex digits -- the first
corresponds to the background; the second the foreground.  Each digit
can be any of the following values:

    0 = Black       8 = Gray
    1 = Blue        9 = Light Blue
    2 = Green       A = Light Green
    3 = Aqua        B = Light Aqua
    4 = Red         C = Light Red
    5 = Purple      D = Light Purple
    6 = Yellow      E = Light Yellow
    7 = White       F = Bright White
~~~

### يعني إيه hex؟

العد العادي بيخلص عند 9 (خانة واحدة، ١٠ أرقام). الـ hex (hexadecimal، ستة عشري) بيكمّل بحروف عشان الخانة الواحدة تشيل ١٦ قيمة: [[A]] = 10، [[B]] = 11، لحد [[F]] = 15. فعندك ١٦ لون، وكل لون ليه خانة واحدة.

ولاحظ الترتيب: العمود اليمين هو نفس العمود الشمال **زائد 8** وأفتح. [[2]] أخضر و [[A]] (يعني 10 = 2 + 8) أخضر فاتح. و [[background]] الخلفية و [[foreground]] الكلام.

---

## ٢. [[color 0A]]

- [[0]] الخلفية: أسود.
- [[A]] الكلام: أخضر فاتح.

الشاشة كلها بتتلوّن، حتى الكلام اللي كان مكتوب فوق. [[color 0a]] نفس الحاجة: الحروف كابيتال أو سمول زي بعض.

## ٣. [[color 1F]]

[[1]] خلفية زرقا، و [[F]] كلام أبيض ساطع.

---

## ٤. [[color 77]] و [[echo %errorlevel%]]

الرقمين زي بعض يعني الكلام هيبقى بنفس لون الخلفية ومش هيتقري. فـ [[color]] بيرفض ومش بيغيّر حاجة، والمساعدة نفسها بتقول كده:

~~~text من color /?
The COLOR command sets ERRORLEVEL to 1 if an attempt is made to execute
the COLOR command with a foreground and background color that are the
same.
~~~

[[errorlevel]] متغير CMD بيحط فيه كل أمر «خلصت إزاي»: [[0]] تمام، وأي رقم تاني مشكلة (درس if و errorlevel). و [[echo %errorlevel%]] بيطبعه، فهنا بيطبع:

~~~text الناتج
1
~~~

وده متجرّب في نافذة conhost (نافذة CMD العادية) زي ما في الحل: [[color 0A]] رجّع 0، و [[color 77]] رجّع 1 والألوان فضلت زي ما هي.

> جرّبت كمان هنا في كونسول مستخبي من غير نافذة حقيقية، وهناك [[color]] رجّع 1 لكل حاجة حتى [[0A]]، لأن مفيش نافذة يلوّنها. فلو بتجرّب، جرّب في نافذة CMD حقيقية.

---

## ٥. [[color]] لوحدها

من غير أرقام: رجّع الألوان اللي النافذة فتحت بيها. والمساعدة بتقول إن «اللي فتحت بيها» ده جاي من واحد من تلاتة: ألوان النافذة نفسها، أو [[/T]] لو اتفتحت بـ [[cmd /t:0A]]، أو قيمة [[DefaultColor]] في الريجستري. وجوه سكربت bat اكتب اللون صريح ([[color 07]]) بدل [[color]] لوحدها، لأنها في سكربت متشغّل بـ [[cmd /c]] مش بترجّع حاجة (التفاصيل في «إزاي»).

---

## الخلاصة

| الأمر | النتيجة |
|---|---|
| [[color /?]] | جدول الـ ١٦ لون |
| [[color 0A]] | خلفية سودا، كلام أخضر فاتح |
| [[color 1F]] | خلفية زرقا، كلام أبيض ساطع |
| [[color 77]] | مش بيتنفذ، و errorlevel = 1 |
| [[color]] | ألوان النافذة الأصلية |

> أول خانة الخلفية وتاني خانة الكلام، وأي رقم + 8 = نفس اللون فاتح. واللون بيفضل في النافذة لحد ما تقفلها.`,
          lines: [
            R`جدول الـ 16 لون والشرح.`,
            R`خلفية سودا ([[0]]) وكلام أخضر فاتح ([[A]]).`,
            R`خلفية زرقا ([[1]]) وكلام أبيض ساطع ([[F]]).`,
            R`نفس اللون للاتنين: مش هيتنفذ.`,
            R`هيطبع 1، لأن color رفض الأمر اللي فات.`,
            R`لوحدها: رجّع ألوان النافذة الأصلية.`
          ],
          sol: R`في نافذة CMD القديمة: [[color 0A]] بيقلب الشاشة كلها أسود وأخضر فاتح، حتى الكلام اللي كان فوق. [[color 1F]] أزرق وأبيض، و [[color E0]] أصفر فاتح وكلام أسود. [[color 77]] مش بيغيّر حاجة، و [[echo %errorlevel%]] بعده بيطبع [[1]]. و [[color]] لوحدها بترجّع الأسود والرمادي اللي النافذة بدأت بيهم.

جرّبت ده في نافذة conhost حقيقية وقريت ألوانها بعد كل أمر: [[color 0A]] رجّع errorlevel 0، و [[color 77]] رجّع 1 والألوان فضلت زي ما هي، و [[color A]] (رقم واحد) خلّى الخلفية سودا والكلام أخضر، و [[color 0Z]] طبع المساعدة بس. في Windows Terminal نفس الأوامر شغالة بس الدرجات من الـ color scheme، فالأخضر في Campbell غير الأخضر في One Half Dark مثلًا.`
        },
        {
          cmd: "prompt",
          title: "غيّر شكل الـ prompt",
          desc: R`[[prompt]] بيغيّر الكلام اللي CMD بيكتبه قبل كل أمر (الافتراضي [[C:\lab>]]). بتكتب النص اللي عايزه، وجواه أكواد بتبدأ بـ [[$]] بتتبدّل كل مرة الـ prompt بيتطبع: المسار، والوقت، وسطر جديد، وألوان.

الأكواد (الحرف كابيتال أو سمول عادي):
[[$P]] الدرايف والمسار ([[C:\lab]])، و [[$N]] حرف الدرايف بس ([[C]] من غير النقطتين).
[[$G]] علامة [[>]]، و [[$L]] علامة [[<]]، و [[$B]] علامة [[|]]، و [[$Q]] علامة [[=]]، و [[$A]] علامة [[&]]، و [[$C]] و [[$F]] القوسين [[(]] و [[)]]. الأكواد دي موجودة لأن الرموز نفسها ليها معنى في CMD (توجيه وربط)، فلو كتبتها على طول هتتفهم أمر.
[[$T]] الوقت ([[13:15:14.55]])، و [[$D]] التاريخ ([[Fri 10/02/2026]]، وشكله حسب إعدادات المنطقة)، و [[$V]] نسخة ويندوز.
[[$S]] مسافة، و [[$_]] سطر جديد، و [[$$]] علامة [[$]] نفسها، و [[$H]] بيمسح الحرف اللي قبله.
[[$E]] حرف الـ Escape (رقمه 27)، وده مفتاح ألوان ANSI: [[$E[32m]] كل اللي بعده أخضر، و [[$E[0m]] رجّع اللون العادي. الأرقام: 31 أحمر، و 32 أخضر، و 33 أصفر، و 34 أزرق، و 35 بنفسجي، و 36 تركواز، و 90 رمادي، و [[1;]] قبلها بتخليها عريضة أو فاتحة ([[$E[1;36m]]).

[[prompt]] لوحدها بترجّع الافتراضي ([[$P$G]]). والتغيير للنافذة دي بس، لأن [[prompt]] بيحط القيمة في متغير بيئة اسمه [[PROMPT]] (اكتب [[set PROMPT]] وشوفه)، و CMD أول ما يفتح بيقرا المتغير ده. عشان كده الحفظ الدايم سطر واحد: [[setx PROMPT "..."]] (درس set / setx)، وكل نافذة CMD جديدة هتفتح بيه. أو تحطه في ملف بيشتغل مع كل نافذة (درس title و mode con، و AutoRun في درس doskey).`,
          example: R`prompt [$T]$S$P$G
prompt $P$_$G$S
prompt $E[32m$P$E[0m$G
prompt $E[1;36m%USERNAME%$E[0m@%COMPUTERNAME% $E[33m$P$E[0m$_$$$S
prompt
setx PROMPT "$E[32m$P$E[0m$_$G$S"`,
          try: R`جرّب الأشكال واحد ورا التاني، واعمل [[cd ..]] بعد كل واحد عشان تشوف [[$P]] بيتحدّث. وبعدين اعمل prompt على سطرين: المسار بالأصفر والوقت بالرمادي في السطر الأول، و [[>]] في التاني.`,
          deep: {
            why: R`الـ prompt أكتر حاجة بتبصلها في الترمنال. مسار طويل زي [[C:\Users\ali\projects\shop\backend\src>]] بياكل نص السطر فالأوامر بتلف، ومفيش حاجة بتفرّق بين نافذة عادية ونافذة أدمن أو سيرفر. prompt على سطرين وبلون بيحل الاتنين، من غير أي برنامج زيادة.`,
            how: R`CMD بيطبع الـ prompt قبل كل أمر من قيمة متغير [[PROMPT]]، ولو مش موجود بيستخدم [[$P$G]]. جرّبت: [[prompt]] لوحدها بتمسح المتغير خالص ([[set PROMPT]] بعدها بيقول [[Environment variable PROMPT not defined]])، و CMD اللي بيتفتح وفيه PROMPT جاي من بره بيستخدمه على طول. عشان كده [[setx PROMPT]] بيشتغل: setx بيحفظه في متغيرات اليوزر، وأي CMD جديد بيورثه.

[[$E]] بيطبع حرف Escape، والترمنال بيفهم [[ESC[...m]] كأمر ألوان (ANSI أو VT). CMD في ويندوز 10 وأحدث بيشغّل الدعم ده في النافذة القديمة وفي Windows Terminal الاتنين. وأي لون فتحته اقفله بـ [[$E[0m]]، وإلا الأمر اللي بتكتبه وناتجه هيتلوّنوا كمان.

[[%USERNAME%]] جوه أمر prompt بتتبدّل مرة واحدة وانت بتكتب الأمر، وده تمام مع اسم اليوزر لأنه مش بيتغيّر. لكن [[%CD%]] هتفضل المسار القديم للأبد، عشان كده المسار دايمًا [[$P]].

الحفظ الدايم بطريقتين: [[setx PROMPT "..."]] (أبسط، ومن غير ريجستري)، أو ملف bat بيتشغّل مع كل نافذة. ولو عايز تشيل الـ PROMPT المحفوظ، امسحه من شاشة متغيرات البيئة (درس «rundll32 sysdm.cpl,EditEnvironmentVariables» في تاب «اختصارات النظام») وافتح نافذة جديدة. والـ prompt في PowerShell حاجة تانية خالص: function اسمها prompt في [[$PROFILE]] (درس «$PROFILE» في تاب «PowerShell»)، و PowerShell بيتجاهل متغير PROMPT.`,
            when: R`أول ما تجهز جهازك، أو لما تشتغل في مشروع مساره طويل، أو عايز نوافذ (أدمن، سيرفر) يبان الفرق بينها من الـ prompt.`,
            mistakes: R`تنسى [[$E[0m]] فكل حاجة بعد الـ prompt تتلوّن. أو تكتب [[>]] أو [[|]] أو [[&]] على طول بدل [[$G]] و [[$B]] و [[$A]]، فـ CMD يفهمها توجيه ويعمل ملف أو يشغّل أمر تاني. أو تشغّل [[setx PROMPT "$P$G"]] من PowerShell: جوه علامات التنصيص المزدوجة PowerShell بيعتبر [[$P]] و [[$G]] متغيرات (فاضية) ويحفظ كلام ناقص، فمن PowerShell استخدم علامات تنصيص مفردة. أو تستنى setx يغيّر النافذة الحالية (النوافذ الجديدة بس). أو تشوف [[←[32m]] بدل الألوان: يبقى ويندوز أقدم من 10، أو مفعّل «Use legacy console» في خصائص النافذة القديمة.`
          },
          teach: R`## الأول: الـ prompt نص فيه «خانات» بتتملا كل مرة

الـ prompt هو اللي CMD بيكتبه قبل ما تكتب أي أمر، والافتراضي [[C:\Windows>]]: المسار وبعده [[>]]. [[prompt]] بياخد نص، وجواه أكواد بتبدأ بـ [[$]]، و CMD بيبدّل كل كود بقيمته **كل مرة** بيطبع الـ prompt. فالمسار والوقت بيتحدّثوا لوحدهم.

جرّبت كل سطر هنا في CMD على ويندوز 11، بإني ببعت الأوامر لـ CMD وبقرا اللي بيطبعه. وكل الأمثلة بدأت من [[C:\Windows]].

---

## ١. [[prompt [$T]$S$P$G]]

نقراه حرف حرف من الشمال:

| الحتة | بتطبع |
|---|---|
| أول حرف | قوس مربع مفتوح زي ما هو (أي حرف مش كود بيتطبع زي ما هو) |
| [[$T]] | الوقت (Time) |
| الحرف بعد [[$T]] | قوس مربع مقفول |
| [[$S]] | مسافة (Space) |
| [[$P]] | الدرايف والمسار (Path) |
| [[$G]] | علامة [[>]] (Greater than) |

~~~text الناتج: الـ prompt قبل وبعد cd ..
[10:26:23.93] C:\Windows>
[10:26:23.93] C:\>
~~~

الوقت ساعات:دقايق:ثواني وبعد النقطة أجزاء من مية من الثانية، وده وقت **طباعة الـ prompt**، مش وقت تنفيذ الأمر اللي بعده. وبعد [[cd ..]] المسار اتحدّث لوحده لـ [[C:\]].

### ليه [[$G]] مش [[>]] على طول؟

لأن [[>]] في CMD معناها «ابعت الناتج لملف» (درس | > >> 2>&1). لو كتبت [[prompt C:>]] هيفهمها توجيه. فعشان كده كل رمز ليه معنى في CMD ليه كود. جرّبتهم كلهم مرة واحدة: [[prompt $N$Q$B$A$C$F$L$$$G]] طبع:

~~~text الناتج
C=|&()<$>
~~~

| الكود | الرمز | الكود | الرمز |
|---|---|---|---|
| [[$N]] | حرف الدرايف ([[C]]) | [[$C]] و [[$F]] | [[(]] و [[)]] |
| [[$Q]] | [[=]] | [[$L]] | [[<]] |
| [[$B]] | الخط الرأسي بتاع الـ pipe | [[$$]] | [[$]] نفسها |
| [[$A]] | [[&]] | [[$G]] | [[>]] |

وكمان [[$D]] التاريخ و [[$V]] نسخة ويندوز: [[prompt $D $V$G]] طبع [[Tue 10/06/2026 Microsoft Windows [Version 10.0.26300.9550]>]]. وشكل التاريخ حسب إعدادات المنطقة عندك.

---

## ٢. [[prompt $P$_$G$S]]

[[$_]] سطر جديد. فالمسار في سطر، و [[> ]] في السطر اللي تحته، وانت بتكتب بعدها:

~~~text الناتج
C:\
>
~~~

مهما المسار طال، الأمر اللي بتكتبه بيبدأ من أول السطر.

---

## ٣. [[prompt $E[32m$P$E[0m$G]]: ألوان

[[$E]] بيطبع حرف اسمه Escape، رقمه 27. الترمنال لما يشوف Escape وبعده قوس مربع وأرقام وحرف [[m]] مش بيطبعهم، بيفهمهم «غيّر اللون». ودي اسمها ANSI codes.

| الحتة | معناها |
|---|---|
| [[$E[32m]] | من هنا ورايح أخضر |
| [[$P]] | المسار (بالأخضر) |
| [[$E[0m]] | رجّع اللون العادي |
| [[$G]] | [[>]] باللون العادي |

عشان أتأكد إن [[$E]] بيطبع حرف حقيقي، بصيت على البايتات اللي CMD طبعها:

~~~text البايتات بالـ hex
1B 5B 33 32 6D 43 3A 5C ...      ESC [ 3 2 m C : \ ...
~~~

[[1B]] بالـ hex هو 27 (درس color لو الـ hex جديد عليك): ده الـ Escape. والأرقام: [[31]] أحمر، [[32]] أخضر، [[33]] أصفر، [[34]] أزرق، [[36]] تركواز، [[90]] رمادي، و [[0]] رجّع العادي.

> اقفل أي لون فتحته بـ [[$E[0m]]، وإلا الأمر اللي بتكتبه وناتجه هيتلوّنوا كمان.

---

## ٤. السطر الطويل: شكل لينكس

~~~cmd
prompt $E[1;36m%USERNAME%$E[0m@%COMPUTERNAME% $E[33m$P$E[0m$_$$$S
~~~

بالترتيب:

1. [[$E[1;36m]] تركواز ([[36]]) وعريض أو فاتح ([[1;]] قبله، والـ [[;]] بتفصل أكتر من كود).
2. [[%USERNAME%]] اسم اليوزر. ده مش كود prompt، ده متغير بيئة (درس set / setx): CMD بيبدّله **مرة واحدة وانت بتكتب الأمر**، فالـ prompt بيتحفظ فيه الاسم نفسه. ده تمام لأن اسمك مش بيتغيّر، لكن متستخدمش [[%CD%]] للمسار، هيفضل المسار القديم للأبد. المسار دايمًا [[$P]].
3. [[$E[0m]] رجّع العادي، و [[@]] زي ما هي، و [[%COMPUTERNAME%]] اسم الجهاز، ومسافة.
4. [[$E[33m$P$E[0m]] المسار بالأصفر.
5. [[$_]] سطر جديد، و [[$$]] علامة [[$]]، و [[$S]] مسافة.

النتيجة شبه لينكس: [[ali@MYPC C:\Windows]] بالألوان، وتحته [[$ ]].

---

## ٥. [[prompt]] لوحدها

بترجّع الافتراضي [[$P$G]]. ليه؟ لأن [[prompt]] بيحط النص في متغير بيئة اسمه [[PROMPT]]، و [[prompt]] لوحدها بتمسحه. جرّبت [[set PROMPT]] بعد ما عملت prompt:

~~~text الناتج
PROMPT=$N$Q$B$A$C$F$L$$$G
~~~

وبعد [[prompt]] لوحدها:

~~~text الناتج
Environment variable PROMPT not defined
~~~

ومن غير المتغير، CMD بيستخدم [[$P$G]].

---

## ٦. احفظه: [[setx PROMPT "$E[32m$P$E[0m$_$G$S"]]

بما إن الـ prompt مجرد متغير بيئة، [[setx]] بيحفظه لليوزر، وأي CMD جديد بيفتح بيه (درس set / setx). علامات التنصيص عشان النص فيه رموز. والنافذة الحالية مش بتتغيّر. مشغّلتهوش هنا عشان ميغيّرش إعدادات الجهاز، بس جرّبت إن CMD اللي بيتفتح وفيه [[PROMPT]] جاي من برة بيستخدمه على طول (الحل والدرس اللي بعده).

---

## الخلاصة

| الكود | بيطبع |
|---|---|
| [[$P]] | المسار |
| [[$G]] | [[>]] |
| [[$T]] و [[$D]] | الوقت والتاريخ |
| [[$S]] و [[$_]] | مسافة وسطر جديد |
| [[$E[32m]] ... [[$E[0m]] | لون وبعدين رجّع العادي |
| [[$$]] | [[$]] |

> كل حاجة مش كود بتتطبع زي ما هي، والرموز اللي ليها معنى في CMD ([[>]] و [[|]] و [[&]]) اكتبها بأكوادها. و [[prompt]] لوحدها بترجّعك للأصل.`,
          lines: [
            R`الوقت بين قوسين مربعين، ومسافة، والمسار، و [[>]]: زي [[[13:15:14.55] C:\lab>]].`,
            R`المسار لوحده في سطر ([[$_]] سطر جديد)، وتكتب في السطر اللي تحته بعد [[> ]].`,
            R`المسار بالأخضر، وبعدين رجّع اللون العادي قبل [[>]].`,
            R`اسم اليوزر تركواز عريض و @ واسم الجهاز، والمسار أصفر، وتحتهم [[$]] ومسافة زي لينكس.`,
            R`لوحدها: رجّع [[$P$G]] الافتراضي.`,
            R`احفظه لكل نافذة CMD جديدة (النافذة الحالية مش هتتغيّر).`
          ],
          sol: R`[[prompt [$T]$S$P$G]] بيخلي كل سطر يبدأ زي [[[13:15:14.55] C:\lab>]]، والوقت بيتحدّث مع كل أمر (ده وقت طباعة الـ prompt مش وقت تنفيذ الأمر). و [[prompt $P$_$G$S]] بيطبع المسار لوحده في سطر وتحته [[> ]] تكتب بعدها. ولما تعمل [[cd ..]] المسار في الـ prompt بيتغيّر على طول.

الشكل اللي على سطرين: [[prompt $E[33m$P$E[0m$S$E[90m$T$E[0m$_$G$S]]. جرّبته في CMD على ويندوز 11: بعد [[cd ..]] المسار اتحدّث، و [[set PROMPT]] طبع [[PROMPT=$E[33m$P$E[0m$S$E[90m$T$E[0m$_$G$S]]. وجرّبت كمان إن CMD جديد بيبدأ بالـ PROMPT اللي جاله من البيئة، وده اللي بيخلّي [[setx PROMPT]] يشتغل. (setx نفسه مشغّلتهوش عشان ميغيّرش إعدادات الجهاز.)`
        },
        {
          cmd: "title و mode con",
          title: "عنوان النافذة وحجمها",
          desc: R`[[title]] بيغيّر العنوان اللي فوق النافذة (أو اسم التاب في Windows Terminal)، و [[mode con]] بيعرض حجم النافذة ويغيّره بعدد الأعمدة والسطور. الاتنين بيخلّوك تعرف كل نافذة فيها إيه من أول نظرة.

[[title Dev Server]]: كل الكلام اللي بعد title هو العنوان، من غير علامات تنصيص (لو كتبتها هتظهر في العنوان). مفيد لما يبقى عندك ٤ نوافذ CMD: «Server» و «Tests» و «DB» بدل ٤ «Command Prompt» شبه بعض في Alt+Tab.

[[mode con]] لوحده بيطبع «Status for device CON»: [[Lines]] و [[Columns]] و [[Keyboard rate]] و [[Keyboard delay]] و [[Code page]]. و [[CON]] اسم الكونسول (الشاشة والكيبورد) عند ويندوز من أيام DOS، والنقطتين في [[con:]] اختيارية. و [[mode con: cols=120 lines=40]] بيخلي العرض 120 حرف والطول 40 سطر.

فرقين مهمين: في النافذة القديمة (conhost) [[lines=40]] بيخلي الـ buffer نفسه 40 سطر، يعني الـ scroll لفوق بيضيع والكلام القديم بيتشال. والرقم الكبير اللي بتشوفه في [[Lines]] (زي 9001) ده طول الـ buffer مش الشاشة. وفي Windows Terminal [[mode con: cols= lines=]] مش بيغيّر حجم النافذة أصلًا (والكلام ممكن يتلف كأن العرض اتغيّر)، والحجم هناك من الإعدادات (Startup ثم Launch size) أو [[wt --size 120,40]].

فكرة «شاشة ترحيب»: [[cmd /k "..."]] بيفتح CMD جديد ينفّذ الأوامر اللي بين علامات التنصيص ويفضل مفتوح ([[/k]] عكس [[/c]] اللي بتنفّذ وتقفل)، والأوامر مربوطة بـ [[&]] (درس اربط أوامر). فالسطر الأخير في المثال بيعمل عنوان ولون ورسالة مرة واحدة، و [[exit]] بيرجّعك للـ CMD اللي قبله. ولو حطيت الأوامر دي في ملف وخليت Windows Terminal يشغّله، كل تاب CMD هيفتح بيها (الحل تحت).`,
          example: R`title Dev Server
mode con
mode con: cols=120 lines=40
cmd /k "title Dev & color 0A & echo Welcome %USERNAME%"`,
          try: R`اعمل ملف [[%USERPROFILE%\cmdrc.bat]] فيه عنوان و prompt واختصارات doskey ورسالة ترحيب، وخلّي بروفايل Command Prompt في Windows Terminal يشغّله مع كل تاب.`,
          deep: {
            why: R`لما يبقى عندك سيرفر و watcher و git في تلات نوافذ، العنوان هو اللي بيخليك تلاقي اللي عايزه في Alt+Tab أو في التابات. والحجم مهم لأوامر بتطبع جداول عريضة (زي [[tasklist]] و [[netstat -ano]] و [[winget upgrade]]) فبتلف وتتلخبط في نافذة ضيقة.`,
            how: R`[[title]] بيطلب من الكونسول يغيّر العنوان. في Windows Terminal ده بيغيّر اسم التاب، إلا لو البروفايل مفعّل فيه Suppress title changes ([[suppressApplicationTitle]])، ساعتها التاب بيفضل بالاسم اللي في الإعدادات. وبرامج كتير بتغيّر العنوان لوحدها وهي شغالة، فمتستغربش لو اتغيّر.

[[mode]] أمر قديم من DOS بيظبط «أجهزة»: [[con]] الشاشة، و [[com1]] بورت serial. في conhost [[mode con: cols= lines=]] بيغيّر حجم النافذة والـ buffer مع بعض. جرّبتها في نافذة conhost: قبلها [[mode con]] طلّع [[Lines: 9001]] و [[Columns: 120]]، وبعد [[cols=90 lines=25]] النافذة والـ buffer بقوا 90 في 25 بالظبط، يعني الـ scrollback راح. عشان تكبّر النافذة من غير ما تخسر الـ scroll: كليك يمين على العنوان، Properties، Layout، وغيّر Window Size بس وسيب Screen Buffer Size كبير.

Windows Terminal بيرسم النافذة بنفسه والـ shell اللي جواه مبيقدرش يغيّر حجمها (فيه issues على GitHub عن ده بالظبط)، فالحجم من Startup ثم Launch size، أو [[wt --size 120,40]] وانت بتفتحه.

[[cmd /k "أوامر"]] هو نفسه اللي ينفع تحطه في Command line بتاع بروفايل Command Prompt في Windows Terminal: [[%SystemRoot%\System32\cmd.exe /k "%USERPROFILE%\cmdrc.bat"]]. كده كل تاب CMD يفتح بالعنوان والـ prompt والاختصارات بتوعك. ده أأمن من AutoRun في الريجستري (درس doskey)، لأن AutoRun بيشتغل مع أي [[cmd /c]] بتشغّله البرامج والسكربتات كمان، فرسالة الترحيب هتظهر في نص ناتجهم. ولنافذة CMD القديمة: اعمل shortcut على الديسكتوب الـ Target بتاعه [[cmd.exe /k "%USERPROFILE%\cmdrc.bat"]].`,
            when: R`كذا نافذة مفتوحة مع بعض، أو سكربت bat طويل عايز تعرف هو في أنهي خطوة من العنوان ([[title Step 2 of 5: building]])، أو أوامر بتطبع جداول عريضة.`,
            mistakes: R`[[title "My Server"]] بعلامات تنصيص فتظهر في العنوان. أو [[mode con lines=40]] في conhost وتستغرب إن الـ scroll لفوق اختفى. أو تجرّب mode con في Windows Terminal وتفتكر الأمر بايظ. أو تحط رسالة ترحيب بـ echo في AutoRun، فتظهر في ناتج أي سكربت أو برنامج بيستخدم cmd وتبوّظه.`
          },
          teach: R`## الأول: أمرين صغيرين للنافذة نفسها

[[title]] بيغيّر الكلام اللي فوق النافذة، و [[mode con]] بيعرض حجمها ويغيّره. وفي الآخر سطر بيجمع حاجات كتير في نافذة جديدة، وده اللي بيوصلك لملف «إعدادات CMD» بتاعك في الحل. اتجرّب هنا في CMD على ويندوز 11، والأسامي والمسارات في الناتج متغيّرة.

---

## ١. [[title Dev Server]]

[[title]] وبعده العنوان. **كل** الكلام اللي بعد [[title]] لحد آخر السطر بيبقى العنوان، بمسافاته، فمش محتاج علامات تنصيص. ولو كتبتها ([[title "Dev Server"]]) هتظهر في العنوان نفسه.

مش بيطبع حاجة. اللي بيتغيّر هو عنوان النافذة فوق (أو اسم التاب في Windows Terminal)، وده اللي بتشوفه في Alt+Tab وفي شريط المهام.

---

## ٢. [[mode con]]: الحجم الحالي

[[mode]] أمر من أيام DOS بيظبط «أجهزة»، و [[con]] (console) اسم الشاشة والكيبورد عند ويندوز. فـ [[mode con]] = «إعدادات الكونسول إيه؟»:

~~~cmd
mode con
~~~

~~~text الناتج
Status for device CON:
----------------------
    Lines:          9001
    Columns:        120
    Keyboard rate:  31
    Keyboard delay: 1
    Code page:      65001
~~~

| السطر | معناه |
|---|---|
| [[Lines: 9001]] | عدد السطور في الـ **buffer**: كل الكلام اللي تقدر تعمله scroll لفوق، مش اللي باين على الشاشة |
| [[Columns: 120]] | العرض بالحروف: كام حرف في السطر |
| [[Keyboard rate]] و [[Keyboard delay]] | سرعة تكرار الحرف لما تفضل دايس على زرار، وقد إيه يستنى قبل ما يبدأ يكرر |
| [[Code page: 65001]] | الترميز: 65001 يعني UTF-8 (درس chcp 65001). عندك ممكن يبقى 437 أو 720 |

الـ 9001 دي هي اللي بتخلّيك تعمل scroll لفوق وتلاقي ناتج أوامر قديمة.

---

## ٣. [[mode con: cols=120 lines=40]]

- [[con:]] النقطتين اختيارية ([[con]] و [[con:]] زي بعض).
- [[cols=120]] العرض ١٢٠ حرف.
- [[lines=40]] الطول ٤٠ سطر.

في نافذة CMD القديمة (conhost) ده بيغيّر النافذة **والـ buffer** مع بعض: بعد [[cols=100 lines=30]]، [[mode con]] بقى بيقول [[Lines: 30]] و [[Columns: 100]] (التجربة في الحل). يعني الـ 9001 سطر بقوا 30، والـ scroll لفوق راح.

وفي كونسول مش بيقدر يتغيّر حجمه، الأمر بيرفض. جرّبته هنا في كونسول مستخبي من غير نافذة حقيقية وطلع:

~~~text الناتج
The screen cannot be set to the number of lines and columns specified.
~~~

وفي Windows Terminal الحجم مش بيتغيّر من الأمر ده أصلًا. هناك من الإعدادات (Startup ثم Launch size) أو [[wt --size 120,40]].

---

## ٤. [[cmd /k "title Dev & color 0A & echo Welcome %USERNAME%"]]

ده بيفتح CMD **جديد** جوه اللي انت فيه، وبينفّذ فيه أوامر الأول. نفكّه:

| الحتة | معناها |
|---|---|
| [[cmd]] | شغّل نسخة جديدة من CMD |
| [[/k]] | (keep) نفّذ اللي بعدي وخلّيك مفتوح. عكسها [[/c]] (close): نفّذ واقفل |
| [[" "]] | الأوامر كلها بين علامات تنصيص عشان تتبعت لـ CMD الجديد كحتة واحدة |
| [[title Dev]] | عنوان (الخطوة ١) |
| [[&]] | نفّذ اللي بعدي بعد اللي قبلي (درس «اربط أوامر») |
| [[color 0A]] | أخضر على أسود (درس color) |
| [[echo Welcome %USERNAME%]] | رسالة فيها اسم اليوزر (متغير بيئة، درس set / setx) |

جرّبته، وطبع:

~~~text الناتج
Welcome ali

C:\Windows>
~~~

وبعدها CMD الجديد مستني أوامرك. [[exit]] بيقفله ويرجّعك للي قبله.

---

## ٥. كود الحل: [[cmdrc.bat]]

نفس فكرة الخطوة ٤، بس الأوامر في ملف بدل سطر واحد، و Windows Terminal يشغّله مع كل تاب CMD:

~~~cmd
@echo off
REM cmdrc.bat: runs at the start of every CMD tab
title Dev - %USERNAME%
prompt $E[32m$P$E[0m$_$G$S
doskey ll=dir /a $*
doskey gs=git status
echo Welcome %USERNAME%, today is %DATE%
~~~

| السطر | بيعمل إيه |
|---|---|
| [[@echo off]] | متطبعش كل أمر قبل ما تنفّذه. و [[@]] متطبعش السطر ده نفسه (درس أول ملف .bat) |
| [[REM ...]] | تعليق، مش بيتنفذ |
| [[title Dev - %USERNAME%]] | العنوان فيه اسمك |
| [[prompt ...]] | المسار أخضر، و [[> ]] في سطر تحته (درس prompt) |
| [[doskey ...]] | الاختصارات (درس doskey) |
| [[echo Welcome ...%DATE%]] | رسالة ترحيب، و [[%DATE%]] متغير فيه تاريخ النهارده |

جرّبته بـ [[cmd /k]] والملف، وبعدين كتبت [[doskey /macros]] و [[set PROMPT]]:

~~~text الناتج
Welcome ali, today is Tue 10/06/2026
C:\lab
> doskey /macros
ll=dir /a $*
gs=git status

C:\lab
> set PROMPT
PROMPT=$E[32m$P$E[0m$_$G$S
~~~

(المسار بالأخضر في نافذة حقيقية.) يعني الاختصارات والـ prompt اتعملوا، و [[@echo off]] اللي في الملف مأثّرش على الـ prompt بعد ما الملف خلص.

---

## الخلاصة

| عايز | الأمر |
|---|---|
| عنوان للنافذة | [[title اسم]] (من غير علامات تنصيص) |
| الحجم الحالي | [[mode con]] |
| حجم جديد (conhost بس) | [[mode con: cols=120 lines=40]] |
| CMD جديد يبدأ بأوامر ويفضل مفتوح | [[cmd /k "أمر & أمر"]] |
| نفس الأوامر كل مرة | ملف [[cmdrc.bat]] و [[cmd.exe /k]] في بروفايل Windows Terminal |

> [[Lines]] في [[mode con]] هو الـ buffer مش الشاشة، و [[lines=]] بيقصّره. وفي Windows Terminal الحجم من الإعدادات مش من mode.`,
          lines: [
            R`عنوان النافذة (أو التاب) يبقى Dev Server.`,
            R`اعرض الحجم: Lines و Columns وصفحة الترميز.`,
            R`120 عمود و 40 سطر (في conhost، وبيقصّر الـ buffer لـ 40 سطر).`,
            R`CMD جديد بعنوان ولون ورسالة ترحيب، ويفضل مفتوح ([[/k]])، و exit بيرجّعك.`
          ],
          sol: R`الملف في الكود تحت. احفظه [[%USERPROFILE%\cmdrc.bat]] (UTF-8 من غير BOM). في Windows Terminal: الإعدادات، Command Prompt، وخلّي Command line: [[%SystemRoot%\System32\cmd.exe /k "%USERPROFILE%\cmdrc.bat"]]، واحفظ وافتح تاب جديد.

جرّبت الملف بـ [[cmd /k]]: طبع [[Welcome ali, today is Fri 10/02/2026]]، وبعدين الـ prompt على سطرين: المسار بالأخضر وتحته [[> ]]، و [[doskey /macros]] عرض [[ll=dir /a $*]]. و [[@echo off]] جوه الملف مش بيخفي الـ prompt بعد ما الملف يخلص، فمش محتاج [[echo on]] في الآخر. ولو التاب اسمه مش بيتغيّر لـ [[Dev - ali]]، يبقى Suppress title changes مفعّل في البروفايل.

و [[mode con]] في نافذة CMD القديمة طلّع عندي [[Lines: 9001]] و [[Columns: 120]] و [[Code page: 65001]] (الصفحة عندك ممكن تبقى 437 أو 720)، وبعد [[mode con: cols=100 lines=30]] بقى [[Lines: 30]] و [[Columns: 100]].`,
          solCode: R`@echo off
REM cmdrc.bat: runs at the start of every CMD tab
title Dev - %USERNAME%
prompt $E[32m$P$E[0m$_$G$S
doskey ll=dir /a $*
doskey gs=git status
echo Welcome %USERNAME%, today is %DATE%`
        }
      ]
    }
]);
