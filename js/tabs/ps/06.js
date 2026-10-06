// تكملة تاب ps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ps/01.js (شرح حقول الدرس في أوله)
MORE("ps", [
    {
      t: "الشبكة",
      l: 2,
      n: "",
      items: [
        {
          cmd: "Test-NetConnection",
          title: "ping واختبار بورت",
          desc: R`[[Test-NetConnection]] (اختصاره [[tnc]]) بيجاوب على سؤالين: الجهاز ده بيرد؟ والبورت ده مفتوح؟ من غير [[-Port]] بيعمل ping ويقولك [[PingSucceeded]]. ومع [[-Port 22]] بيحاول يفتح اتصال TCP على البورت ده ويقولك [[TcpTestSucceeded : True]] لو نجح، زي [[nc -zv host 22]] في لينكس.

الـ IP اللي في المثال [[203.0.113.10]] رقم للأمثلة بس، حط مكانه IP سيرفرك. و [[localhost]] يعني جهازك نفسه، فالسطر التالت بيتأكد إن Postgres شغال وسامع على 5432 قبل ما تلوم الكود.

افهم الـ False صح: [[TcpTestSucceeded : False]] معناها إن الاتصال ماتمش، والسبب ممكن firewall قافل، أو مفيش برنامج شغال على البورت ده أصلًا. وممكن ياخد ثواني قبل ما يرد. الأمر ده ويندوز بس، وفي PowerShell 7 على أي نظام فيه [[Test-Connection host -TcpPort 22]].`,
          example: R`Test-NetConnection google.com
Test-NetConnection 203.0.113.10 -Port 22
Test-NetConnection localhost -Port 5432`,
          try: "اختبر إن بورت 22 و 443 مفتوحين على سيرفرك.",
          deep: {
            why: R`قبل ما تقعد ساعة تدوّر في الكود ليه التطبيق مش واصل لقاعدة البيانات أو للسيرفر، اتأكد إن الاتصال نفسه شغال. Test-NetConnection بيجاوب في سطر: الجهاز بيرد؟ والبورت مفتوح؟ زي ping و [[nc -zv]] مع بعض.`,
            how: R`[[Test-NetConnection google.com]] بيعمل ping. [[-Port 443]] بيجرّب اتصال TCP على البورت. الناتج object بيه [[TcpTestSucceeded]] (True/False)، و[[PingSucceeded]]، ورقم PingReplyDetails.

[[Test-NetConnection -ComputerName db.server.com -Port 5432]] تتأكد إن قاعدة البيانات وصولها تمام.

على عكس nc في bash، Test-NetConnection موجود افتراضيًا في ويندوز.`,
            when: "ECONNREFUSED أو timeout. تتأكد إن firewall مش بيقفل بورت. قبل ما تشتكي من الكود، تتأكد من الاتصال.",
            mistakes: "تفتكر TcpTestSucceeded=False معناها الجهاز التاني مش شغال. ممكن الجهاز شغال والبورت مقفول."
          },
          teach: R`## الأول: سؤالين بيتسألوا قبل ما تلوم الكود

[[Test-NetConnection]] بيسأل سؤالين: الجهاز التاني بيرد؟ والبورت ده عليه حد بيسمع؟ المثال ٣ سطور، كل سطر نفس الأمر بس بسؤال مختلف. والناتج object بخانات ليها أسامي، فهنقرا الخانات واحدة واحدة.

كل اللي تحت اتشغّل على لابتوب ويندوز 11 في PowerShell 7.6 (و 5.1 طلّعت نفس الخانات).

---

## ١. [[Test-NetConnection google.com]]: ping بس

من غير [[-Port]] الأمر بيعمل **ping**: بيبعت رسالة صغيرة اسمها ICMP Echo (ICMP بروتوكول رسايل التحكم في الشبكة، مش TCP) ويستنى الرد.

~~~powershell
Test-NetConnection google.com
~~~

~~~text الناتج
ComputerName           : google.com
RemoteAddress          : 142.250.74.174
InterfaceAlias         : Wi-Fi
SourceAddress          : 192.168.1.65
PingSucceeded          : True
PingReplyDetails (RTT) : 267 ms
~~~

| الخانة | معناها |
|---|---|
| [[ComputerName]] | الاسم اللي انت كتبته |
| [[RemoteAddress]] | الـ IP اللي الاسم اتحوّل له بالـ DNS (درس Resolve-DnsName) |
| [[InterfaceAlias]] | الكارت اللي الطلب طلع منه، هنا الواي فاي |
| [[SourceAddress]] | الـ IP بتاع جهازك على الكارت ده |
| [[PingSucceeded]] | **True** يعني الجهاز رد |
| [[PingReplyDetails (RTT)]] | RTT = Round Trip Time: الرسالة راحت ورجعت في قد إيه |

ليه ٢٦٧ ملّي ثانية مرة، وجربته بعدها بدقايق طلع ٥٤؟ الـ RTT بيتغير مع زحمة الشبكة في اللحظة دي، فرقم واحد مش حكم. والـ IP نفسه ممكن يتغير بين مرة والتانية لأن جوجل عنده سيرفرات كتير.

---

## ٢. [[-Port 22]]: البورت مفتوح؟

~~~powershell
Test-NetConnection 203.0.113.10 -Port 22
~~~

[[203.0.113.10]] من رينج عناوين محجوز للأمثلة في الكتب (اسمه TEST-NET-3)، فمش هيرد على حد. حط مكانه IP سيرفرك. ومع [[-Port]] الأمر بيحاول يعمل **اتصال TCP** كامل على البورت ده، يعني نفس اللي SSH أو المتصفح بيعمله في أول ثانية، ويقفله على طول.

بورت **22** هو بورت SSH الافتراضي. لو الاتصال اتعمل:

~~~text الشكل لو البورت مفتوح
RemotePort       : 22
TcpTestSucceeded : True
~~~

وجربت بورت مفيش عليه حاجة (1 على جهازي نفسه) عشان تشوف شكل الفشل:

~~~powershell
Test-NetConnection 127.0.0.1 -Port 1
~~~

~~~text الناتج
WARNING: TCP connect to (127.0.0.1 : 1) failed

ComputerName           : 127.0.0.1
RemoteAddress          : 127.0.0.1
RemotePort             : 1
InterfaceAlias         : Loopback Pseudo-Interface 1
SourceAddress          : 127.0.0.1
PingSucceeded          : True
PingReplyDetails (RTT) : 0 ms
TcpTestSucceeded       : False
~~~

بص على السطرين الأخيرين مع بعض: [[PingSucceeded : True]] و [[TcpTestSucceeded : False]]. يعني **الجهاز شغال، بس محدش بيسمع على البورت**. ده بالظبط الفرق اللي الدرس عايزك تفهمه: لما الـ TCP يفشل اعرف الأول هل الـ ping نجح.

---

## ٣. [[Test-NetConnection localhost -Port 5432]]: قاعدة البيانات عندك

[[localhost]] اسم معناه «الجهاز ده نفسه». و **5432** البورت الافتراضي بتاع PostgreSQL. على جهاز كان شغال عليه Postgres:

~~~text الناتج
ComputerName     : localhost
RemoteAddress    : ::1
RemotePort       : 5432
InterfaceAlias   : Loopback Pseudo-Interface 1
SourceAddress    : ::1
TcpTestSucceeded : True
~~~

ليه [[RemoteAddress : ::1]] مش 127.0.0.1؟ [[::1]] هو localhost بتاع IPv6، وويندوز بيجرّبه الأول. و [[Loopback Pseudo-Interface 1]] كارت وهمي جوه ويندوز للاتصالات اللي مش طالعة من الجهاز. ومفيش هنا سطر Ping لأن مع [[-Port]] على localhost الأمر بيعرض نتيجة الـ TCP بس.

---

## تقرا False إزاي

| PingSucceeded | TcpTestSucceeded | غالبًا معناها |
|---|---|---|
| True | True | كله تمام، المشكلة في الكود أو الإعدادات |
| True | False | الجهاز شغال، والبرنامج مش شغال على البورت أو firewall قافله |
| False | True | السيرفر قافل الـ ping بس، والبورت شغال (ده عادي في السيرفرات) |
| False | False | العنوان غلط، أو الجهاز مقفول، أو firewall قافل كل حاجة |

---

## نفس الحكاية على الأنظمة التانية

[[Test-NetConnection]] موجود في ويندوز بس (جاي من موديول [[NetTCPIP]]، واختصاره [[tnc]] بيتعرّف مع الموديول). و PowerShell 7 فيه بديل شغال على أي نظام:

~~~powershell
Test-Connection 127.0.0.1 -TcpPort 5432
~~~

~~~text الناتج
True
~~~

| السؤال | ويندوز | PowerShell 7 أي نظام | لينكس والماك |
|---|---|---|---|
| بيرد؟ | [[Test-NetConnection host]] | [[Test-Connection host]] | [[ping -c 4 host]] |
| البورت مفتوح؟ | [[Test-NetConnection host -Port 22]] | [[Test-Connection host -TcpPort 22]] | [[nc -zv host 22]] |

---

## الخلاصة

~~~text
من غير -Port     ping بس       PingSucceeded
مع -Port 22      اتصال TCP     TcpTestSucceeded
Ping True + TCP False   الجهاز شغال والبورت محدش عليه
~~~`,
          lines: [
            "ping ومعلومات الاتصال في أمر واحد.",
            "جرّب بورت 22 على السيرفر: TcpTestSucceeded True يعني مفتوح (زي nc -zv).",
            "قاعدة البيانات المحلية بتسمع؟"
          ],
          sol: R`[[Test-NetConnection IP -Port 22]] بيطبع [[ComputerName]] و [[RemoteAddress]] و [[RemotePort : 22]] وفي الآخر [[TcpTestSucceeded : True]] لو البورت مفتوح. اعمل نفس الحكاية مع [[-Port 443]].

لو البورت مقفول أو فيه firewall، هيطبع [[WARNING: TCP connect to (IP : 443) failed]] و [[TcpTestSucceeded : False]]، وممكن ياخد ثواني قبل ما يرد. False ممكن معناها إن مفيش حاجة شغالة على البورت ده (مثلًا Nginx مش شغال على 443) مش بس firewall. و Test-NetConnection موجود على ويندوز بس؛ في PowerShell 7 على أي نظام فيه [[Test-Connection IP -TcpPort 22]].`
        },
        {
          cmd: "Invoke-RestMethod",
          title: "كلّم API",
          desc: "[[irm]] اختصار، وبيحوّل JSON لـ object لوحده. في Windows PowerShell 5 كلمة [[curl]] alias لـ Invoke-WebRequest، فاكتب [[curl.exe]] لو عايز curl الحقيقي. وفي 5.1 ضيف [[-UseBasicParsing]] لـ Invoke-WebRequest عشان ميطلعلكش تحذير أمان يوقف السكربت، و [[$ProgressPreference = 'SilentlyContinue']] عشان التحميل ميبقاش بطيء جدًا.",
          example: R`$u = irm https://api.github.com/users/octocat
$u.public_repos
Invoke-RestMethod -Uri http://localhost:3000/api/users -Method Post -ContentType "application/json" -Body '{"name":"test"}'
Invoke-WebRequest https://example.com/file.zip -OutFile file.zip`,
          try: "هات بيانات GitHub بتاعك واطبع عدد الـ repos.",
          deep: {
            why: R`بتختبر API عملته، أو سكربت محتاج يجيب بيانات من GitHub أو يبعت رسالة لـ webhook. Invoke-RestMethod زي curl، بس الرد JSON بيرجع object على طول تقرا منه بالنقطة من غير jq.`,
            how: R`[[Invoke-RestMethod]] بيبعت HTTP request ولو الرد JSON بيحوّله تلقائيًا لـ object. مش محتاج ConvertFrom-Json.

[[-Method POST]] و[[-Body ($body | ConvertTo-Json)]] و[[-Headers @{Authorization="Bearer ..."}]] و[[-ContentType "application/json"]] هم اللي بتستخدمهم أكتر.

[[Invoke-WebRequest]] بديل أقل تلقائية: بيرجع object بيه StatusCode والـ Content كـ string، محتاج تحوّله يدويًا. أحسن لو محتاج headers أو status code.`,
            when: "اختبار API. سكربت بيجيب بيانات من API. ديبلوي بيتريجر webhook.",
            mistakes: "نسيان -ContentType مع POST بـ JSON. ومع APIs بتستخدم HTTPS وشهادة self-signed بيطلع error، حلها [[-SkipCertificateCheck]] في PowerShell 7."
          },
          teach: R`## الأول: يعني إيه «تكلّم API»؟

API على النت عنوان (URL) بتبعتله طلب HTTP، وهو يرد عليك بداتا، غالبًا بصيغة JSON (نص منظم بأقواس [[{ }]] ومفاتيح وقيم). [[Invoke-RestMethod]] بيبعت الطلب، ولو الرد JSON بيحوّله لوحده لـ object تقرا منه بالنقطة. المثال ٤ سطور: نجيب داتا، نقرا منها، نبعت داتا، وننزّل ملف.

اتشغّل على PowerShell 7.6 على ويندوز.

---

## ١. [[$u = irm https://api.github.com/users/octocat]]

### [[irm]]

اختصار (alias) لـ [[Invoke-RestMethod]]. جربت [[Get-Alias irm]] وطلع [[irm -> Invoke-RestMethod]].

### اللينك

[[https://api.github.com/users/octocat]] عنوان في API بتاع GitHub بيرجع بيانات يوزر اسمه octocat (يوزر تجريبي بتاع GitHub نفسه). من غير [[-Method]] الطلب بيبقى **GET**، يعني «هاتلي».

### [[$u =]]

بنخزن الرد في متغير اسمه [[$u]] عشان نقرا منه أكتر من مرة من غير ما نبعت الطلب تاني.

~~~powershell
$u | Select-Object login, name, public_repos, followers
~~~

~~~text الناتج
login        : octocat
name         : The Octocat
public_repos : 8
followers    : 24446
~~~

الرد الحقيقي فيه خانات أكتر بكتير، و [[Select-Object]] اختار ٤ بس. ونوعه:

~~~powershell
$u.GetType().Name
~~~

~~~text الناتج
PSCustomObject
~~~

يعني الـ JSON اتحوّل object، مش نص. ده الفرق الكبير عن [[curl]] في bash اللي بيديك نص وتحتاج [[jq]] عشان تقراه.

---

## ٢. [[$u.public_repos]]

النقطة معناها «هات الخانة اللي اسمها كذا»:

~~~text الناتج
8
~~~

ده عدد الـ repos العامة بتاعة octocat.

---

## ٣. طلب POST بـ JSON

~~~powershell
Invoke-RestMethod -Uri http://localhost:3000/api/users -Method Post -ContentType "application/json" -Body '{"name":"test"}'
~~~

| الحتة | معناها |
|---|---|
| [[-Uri]] | العنوان. هنا سيرفر على جهازك على بورت 3000 |
| [[-Method Post]] | نوع الطلب: POST يعني «خد الداتا دي» (بتستخدمه عشان تضيف حاجة) |
| [[-ContentType "application/json"]] | بيقول للسيرفر «الداتا اللي باعتها JSON» |
| [[-Body '{"name":"test"}']] | الداتا نفسها. علامات التنصيص الفردية عشان الـ double quotes اللي جوه تفضل زي ما هي |

عشان أجرّبه بجد شغّلت سيرفر node صغير على 3000 بيرجّع اللي وصله:

~~~text الناتج
method      : POST
url         : /api/users
contentType : application/json
got         : @{name=test}
id          : 7
~~~

السيرفر شاف POST، والـ Content-Type، والـ JSON اتقري صح. و [[@{name=test}]] ده شكل PowerShell لما يعرض object جوه object. وأي API حقيقي بيرجع حاجة زي الـ [[id]] للحاجة اللي اتعملت.

---

## ٤. [[Invoke-WebRequest ... -OutFile file.zip]]: نزّل ملف

[[Invoke-RestMethod]] بيفهم الرد ويحوّله. لكن لو عايز الملف زي ما هو على الديسك، [[Invoke-WebRequest]] (اختصاره [[iwr]]) مع [[-OutFile]] اسم الملف اللي هيتحفظ.

[[example.com/file.zip]] في المثال مكان ملف وهمي. جربته فعلًا فرجع:

~~~text الناتج
Response status code does not indicate success: 404 (Not Found).
~~~

يعني الملف مش موجود على السيرفر، ومفيش ملف اتعمل عندي. وجربت على صفحة موجودة:

~~~powershell
Invoke-WebRequest https://example.com -OutFile page.html
~~~

الأمر مطبعش حاجة خالص (مع [[-OutFile]] مبيرجعش ناتج)، والملف اتعمل بحجم 577 بايت.

---

## ملخص

| السطر | بيعمل إيه | زي إيه في bash |
|---|---|---|
| [[irm URL]] | GET والـ JSON يبقى object | [[curl URL]] وبعده [[jq]] |
| [[$u.public_repos]] | اقرا خانة | [[jq .public_repos]] |
| [[-Method Post -Body ...]] | ابعت داتا | [[curl -X POST -d ...]] |
| [[iwr URL -OutFile f]] | نزّل ملف | [[curl -o f URL]] |

> في Windows PowerShell 5.1 كلمة [[curl]] لوحدها alias لـ [[Invoke-WebRequest]] (جربتها: [[(Get-Alias curl).Definition]] طلع [[Invoke-WebRequest]])، فلو عايز curl الحقيقي اكتب [[curl.exe]].

## الخلاصة

[[Invoke-RestMethod]] للـ APIs (الرد يبقى object)، و [[Invoke-WebRequest -OutFile]] للملفات. ومع POST بـ JSON متنساش [[-ContentType "application/json"]].`,
          lines: [
            "[[irm]] اختصار Invoke-RestMethod: هات بيانات يوزر، والـ JSON بيتحول object لوحده.",
            "اقرا حقل منه على طول.",
            "طلب POST بـ JSON (زي curl -X POST -d).",
            "نزّل ملف واحفظه (زي wget)."
          ],
          sol: R`[[(irm https://api.github.com/users/YOUR_NAME).public_repos]] بيطبع رقم زي [[12]]. الـ API بيرجع JSON و irm بيحوله لـ PSCustomObject على طول، فبتوصل للقيمة بالنقطة. جربت نفس الفكرة على سيرفر محلي بيرجع JSON فيه public_repos بـ 8، فطلع [[8]] ونوع الناتج PSCustomObject.

الرقم ده الـ repos العامة بس، الـ private مش محسوبة. لو طلعلك [[Not Found]] يبقى اسم المستخدم غلط. ولو [[API rate limit exceeded]] يبقى عملت أكتر من 60 طلب في الساعة من غير توكن، استنى شوية.`
        },
        {
          cmd: "ssh / scp",
          title: "موجودين في ويندوز 10 و 11",
          desc: R`ويندوز 10 و 11 جايين بـ OpenSSH client مبني جوّاهم، فـ [[ssh]] و [[scp]] و [[ssh-keygen]] نفس أوامر لينكس بالظبط ومن غير PuTTY. [[ssh-keygen -t ed25519]] بيعمل زوج مفاتيح من النوع ed25519 (الأحدث والأنصح)، وبيحفظهم في [[$HOME\.ssh]]: [[id_ed25519]] (الخاص، متبعتهوش لحد) و [[id_ed25519.pub]] (العام، ده اللي بيتحط على السيرفر).

[[ssh root@203.0.113.10]] يعني ادخل على السيرفر ده باليوزر root (الـ [[@]] بتفصل اليوزر عن العنوان). و [[scp]] بينسخ ملف: المصدر الأول ([[.\dist.zip]] من جهازك)، والهدف بالشكل [[user@server:/path]]، والنقطتين [[:]] بتفصل السيرفر عن المسار اللي عليه.

الفرق الوحيد عن لينكس: مفيش [[ssh-copy-id]]، فالمفتاح العام بتنقله بإيدك (الحل في «جرّب»). ولو [[ssh]] مش موجود، سطّب OpenSSH Client من Settings، Optional features.`,
          example: R`ssh-keygen -t ed25519
ssh root@203.0.113.10
scp .\dist.zip root@203.0.113.10:/var/www/`,
          try: "ادخل سيرفرك من PowerShell مباشرة.",
          deep: {
            why: R`ويندوز ١٠ و ١١ فيهم SSH client مبني جوه (OpenSSH)، فبتدخل سيرفرات لينكس وترفع ملفات من PowerShell على طول من غير PuTTY ولا WinSCP.`,
            how: R`نفس أوامر SSH بالظبط زي Linux: [[ssh user@server]]، [[scp file user@server:/path]].

المفاتيح بتتحفظ في [[~/.ssh/]] زي Linux. [[ssh-keygen]] بيشتغل. [[ssh-copy-id]] ممكن مش موجودة بس تقدر تعمل نفس الحاجة يدويًا: تنسخ محتوى [[~/.ssh/id_rsa.pub]] وتلزقه في [[~/.ssh/authorized_keys]] على السيرفر.

المفاتيح المحفوظة في Windows Credential Manager أو بـ [[ssh-agent]] مش محتاج تدخل passphrase كل مرة.`,
            when: "الدخول على سيرفرات لينكس من ويندوز بدون PuTTY. نقل ملفات لسيرفر.",
            mistakes: "permissions على ملف المفتاح الخاص: على ويندوز المفروض يكون بـ Full Control لصاحبه بس. لو SSH رفض المفتاح، بص على permissions."
          },
          teach: R`## الأول: ٣ أوامر، كل واحد ليه شغلانة

[[ssh-keygen]] بيعمل مفتاح، و [[ssh]] بيدخلك على سيرفر، و [[scp]] بينسخ ملف للسيرفر. التلاتة جايين مع ويندوز 10 و 11 في فولدر [[C:\WINDOWS\System32\OpenSSH\]]:

~~~powershell
ssh -V
~~~

~~~text الناتج
OpenSSH_for_Windows_9.5p2, LibreSSL 3.8.2
~~~

عشان أجرّب بجد من غير سيرفر حقيقي، شغّلت سيرفر SSH جوه container أوبونتو 24.04 على بورت 2222 في جهازي، فهتلاقي في الناتج [[-p 2222]] و [[127.0.0.1]]. على سيرفرك الحقيقي البورت 22 فمش محتاج [[-p]].

---

## ١. [[ssh-keygen -t ed25519]]

### الأجزاء

- [[ssh-keygen]]: SSH key generator، بيعمل **زوج مفاتيح**: واحد خاص (private) فاضل عندك، وواحد عام (public) بتحطه على السيرفر.
- [[-t]]: اختصار type، نوع المفتاح.
- [[ed25519]]: نوع حديث، مفتاحه قصير وآمن. القديم اسمه rsa وكان بيحتاج مفاتيح أطول بكتير.

### الأسئلة اللي هتطلعلك

أول سؤال (ده من تشغيل حقيقي):

~~~text الناتج
Generating public/private ed25519 key pair.
Enter file in which to save the key (C:\Users\ali/.ssh/id_ed25519):
~~~

اضغط Enter عشان المكان الافتراضي. وبعده بيسألك على passphrase (باسورد للمفتاح نفسه، لو حد سرق الملف ميعرفش يستخدمه)، و Enter فاضي يعني من غير.

وفي الآخر بيطبع حاجة زي دي (المفتاح ده اتعمل في فولدر تجربة):

~~~text الناتج
The key fingerprint is:
SHA256:HICm4AYXbbZ4w3o8QBBguuAgjDbG8nY6z36OHDhpMiI ali@laptop
~~~

الـ **fingerprint** بصمة قصيرة للمفتاح تقارن بيها من غير ما تقرا المفتاح كله. والملفين:

~~~text الملفات
id_ed25519        444 بايت   الخاص: متبعتهوش لحد
id_ed25519.pub     93 بايت   العام: ده اللي بيتحط على السيرفر
~~~

والعام سطر واحد شكله كده:

~~~text id_ed25519.pub
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMkduIw5rxn9U7Ho5ZnYZqjrZ0YGkXvn8zplXuMLntVr ali@laptop
~~~

نوع المفتاح، وبعدين المفتاح نفسه، وبعدين تعليق (غالبًا اسمك واسم الجهاز).

---

## ٢. [[ssh root@203.0.113.10]]

- [[root]]: اليوزر اللي هتدخل بيه على السيرفر.
- [[@]]: بتفصل اليوزر عن العنوان.
- [[203.0.113.10]]: عنوان للأمثلة، حط مكانه IP سيرفرك.

أول مرة بتدخل سيرفر، ssh مبيعرفوش، فبيسألك تأكد إنه هو (The authenticity of host ... can't be established) وتكتب [[yes]]، فيحفظ بصمته في ملف [[known_hosts]]:

~~~text الناتج
Warning: Permanently added '[127.0.0.1]:2222' (ED25519) to the list of known hosts.
~~~

ولما بعتّ أمر للسيرفر بدل ما أفتح shell:

~~~powershell
ssh -p 2222 root@127.0.0.1 "whoami; hostname; uname -sr"
~~~

~~~text الناتج
root
3869262c1f68
Linux 6.6.87.2-microsoft-standard-WSL2
~~~

الأوامر اتنفذت **على السيرفر**: اليوزر root، واسم الجهاز (هنا رقم الـ container)، والنظام لينكس. من غير الأمر اللي بين علامات التنصيص بتاخد shell على السيرفر، و [[exit]] يرجعك PowerShell.

ولو المفتاح العام مش على السيرفر:

~~~text الناتج
root@127.0.0.1: Permission denied (publickey,password).
~~~

اللي بين القوسين الطرق اللي السيرفر بيقبلها: مفتاح أو باسورد.

---

## ٣. [[scp .\dist.zip root@203.0.113.10:/var/www/]]

[[scp]] = secure copy. الشكل: **المصدر الأول وبعده الهدف**.

| الحتة | معناها |
|---|---|
| [[.\dist.zip]] | الملف من الفولدر الحالي على جهازك |
| [[root@203.0.113.10]] | اليوزر والسيرفر زي ssh |
| [[:]] | بتفصل السيرفر عن المسار اللي عليه |
| [[/var/www/]] | الفولدر على السيرفر |

جربته على السيرفر التجريبي وبعدين بصيت عليه:

~~~text الناتج
-rw-r--r-- 1 root root 1002 Oct  6 06:41 dist.zip
~~~

[[scp]] مطبعش حاجة لما نجح، والـ exit code كان 0. وخلي بالك: في scp البورت بـ [[-P]] كابيتال، وفي ssh بـ [[-p]] سمول.

---

## نفس الأوامر في كل الأنظمة

| | ويندوز 10/11 | لينكس والماك |
|---|---|---|
| مفتاح | [[ssh-keygen -t ed25519]] | نفسه |
| مكان المفاتيح | [[$HOME\.ssh]] | [[~/.ssh]] |
| دخول | [[ssh user@host]] | نفسه |
| نسخ | [[scp file user@host:/path]] | نفسه |
| نقل المفتاح العام | بإيدك (الحل في «جرّب») | [[ssh-copy-id user@host]] |

## الخلاصة

~~~text
ssh-keygen   اعمل المفتاحين مرة واحدة
ssh          ادخل (أو نفّذ أمر) على السيرفر
scp          انسخ: من الأول، لـ التاني، و : بين السيرفر والمسار
~~~`,
          lines: [
            "اعمل مفاتيح SSH (نفس الأمر زي لينكس، OpenSSH مبني في ويندوز).",
            "ادخل السيرفر.",
            "ارفع ملف للسيرفر."
          ],
          sol: R`أول مرة [[ssh root@IP]] هيسألك [[The authenticity of host ... can't be established.]] ومعاه fingerprint، اكتب [[yes]]، وبعدها الـ prompt يبقى بتاع السيرفر زي [[root@server:~#]]. [[exit]] يرجعك PowerShell.

لو قالك [[ssh : The term 'ssh' is not recognized]] يبقى OpenSSH Client مش متسطب: من Settings، Optional features، OpenSSH Client. ولو [[Permission denied (publickey)]] يبقى المفتاح العام مش في السيرفر، وويندوز مفيهوش [[ssh-copy-id]]، فابعته كده: [[type $HOME\.ssh\id_ed25519.pub | ssh root@IP "cat >> ~/.ssh/authorized_keys"]] (محتاج باسورد أو دخول تاني للسيرفر).`
        }
      ]
    }
]);
