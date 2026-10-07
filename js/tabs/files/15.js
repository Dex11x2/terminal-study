// تكملة تاب files: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/files/01.js (شرح حقول الدرس في أوله)
MORE("files", [
    {
      t: "البرامج والمثبّتات",
      l: 3,
      n: "الملفات اللي بتتشغّل أو بتسطّب برامج على كل نظام: .exe و .msi و .dll، و .so و .dylib، و .app و .dmg، و .deb و .rpm و .AppImage، و .apk و .ipa، و .wasm. جواهم إيه، ومين يشغّلهم، وإزاي تتأكد إنهم سليمين",
      items: [
        {
          cmd: ".exe و .msi",
          title: "ملفات .exe و .msi إيه، وإزاي تتأكد إن البرنامج اللي نزّلته سليم؟",
          desc: R`على ويندوز:
• [[.exe]] (executable): برنامج جاهز يتشغّل، فيه كود المعالج مباشرة. الصيغة اسمها PE (Portable Executable)، وأول حرفين فيه دايمًا [[MZ]] (الـ bytes [[4D 5A]]، أول حروف اسم مهندس من أيام DOS). ممكن يبقى البرنامج نفسه، أو مثبّت (installer) بيحط البرنامج في [[C:\Program Files]].
• [[.msi]] (Microsoft Installer): مش برنامج، ده قاعدة بيانات بخطوات التسطيب، وبيشغّلها [[msiexec]] الموجود في ويندوز. ميزته إن الشركات تقدر تسطّبه على مئات الأجهزة من غير أسئلة: [[msiexec /i app.msi /quiet]]. وأخوه [[.msix]] (الصيغة الحديثة بتاعة Microsoft Store).
• [[.com]] و [[.scr]] (شاشة التوقف): برضه برامج بتتشغّل. و [[.scr]] مشهور في الفيروسات لأن الناس مش متوقعة إنه برنامج.

ويندوز بيقرر يشغّل ولا لأ بالامتداد: [[.exe]] و [[.com]] و [[.bat]] و [[.cmd]] و [[.ps1]] (بشروط) و [[.msi]] و [[.scr]] و [[.vbs]] و [[.js]] (Windows Script Host!) كلها ممكن تشغّل كود بدبل كليك.

الأمان قبل ما تشغّل حاجة نزلت من النت:
• نزّل من الموقع الرسمي بس، أو [[winget install]] (مدير حزم ويندوز).
• SmartScreen: الشباك الأزرق «Windows protected your PC» معناه إن البرنامج مش معروف أو مش موقع. متدوسش [[Run anyway]] غير لو متأكد من المصدر.
• التوقيع (code signing): كليك يمين ثم Properties ثم تاب Digital Signatures بيوريك مين الشركة. وفي PowerShell [[Get-AuthenticodeSignature setup.exe]].
• الـ checksum: المواقع الكويسة بتكتب SHA-256 للملف. احسبه وقارنه: [[Get-FileHash setup.exe]] على ويندوز، و [[sha256sum]] على لينكس، و [[shasum -a 256]] على الماك. لو حرف واحد مختلف، الملف اتغيّر (اتبوّظ في التنزيل أو حد عدّله).

على لينكس والماك [[.exe]] مبيشتغلش، إلا بـ Wine (طبقة بتترجم نداءات ويندوز). والبرامج هناك ملهاش امتداد أصلًا ([[/bin/ls]])، والتشغيل بيتحدد بصلاحية [[x]] مش بالاسم.`,
          example: R`file hostname.exe
xxd -l 16 hostname.exe
sha256sum hostname.exe
sha256sum -c SHA256SUMS
wine hostname.exe`,
          try: R`على ويندوز: افتح PowerShell في فولدر Downloads ونفّذ [[Get-FileHash <أي-برنامج-نزّلته>.exe]] وقارنه بالرقم اللي على موقعه لو موجود (مثلًا موقع Node.js بيحط [[SHASUMS256.txt]]). وكليك يمين على الملف ثم Properties ثم Digital Signatures. على لينكس: نفّذ [[file]] و [[xxd -l 16]] على أي [[.exe]] عندك (أو [[/bin/ls]] للمقارنة)، وجرّب [[sha256sum]] مرتين على نفس الملف وبعدين بعد ما تضيف byte ([[echo >> copy.exe]] على نسخة).`,
          deep: {
            why: R`أي برنامج بتشغّله بياخد نفس صلاحياتك: يقرا ملفاتك ويبعتها، ويشفّرها ويطلب فدية (ransomware). عشان كده أهم مهارة مش إنك تعرف تشغّل [[.exe]]، إنك تعرف إمتى متشغّلوش، وتتأكد من المصدر والتوقيع والـ hash.`,
            how: R`لما تدوس على [[.exe]]، ويندوز بيقرا الـ PE header (بعد [[MZ]] فيه مكان الـ header الحقيقي اللي بيقول نوع المعالج والأقسام والـ DLLs المطلوبة)، ويحمّل الـ DLLs، ويبدأ من نقطة البداية. والـ SHA-256 دالة بتطلّع رقم ثابت الطول من أي ملف: نفس الملف دايمًا نفس الرقم، وأي تغيير ولو bit واحد بيغيّر الرقم كله.`,
            when: R`كل ما تنزّل أداة تطوير أو برنامج (Node و Git و Python و Docker Desktop) أو تستلم ملف من حد. والـ checksum بالذات لما تنزّل ISO أو ملف كبير.`,
            mistakes: R`تنزّل البرنامج من موقع «download» وسيط بدل الموقع الرسمي. تتجاهل SmartScreen كل مرة لحد ما تتعود. تفتح مرفق [[.exe]] أو [[.scr]] أو [[.js]] جاي في إيميل أو جوه zip. وتقارن أول ٤ حروف بس من الـ hash.`
          },
          teach: R`## المثال: نفحص برنامج ويندوز قبل ما نشغّله

الأوامر بتعمل اللي المفروض تعمله مع أي برنامج نزّلته: تعرف نوعه من محتواه، وتشوف بصمته، وتحسب الـ hash وتقارنه بالرقم الرسمي، وفي الآخر بس تشغّله. البرنامج اللي جربنا عليه [[hostname.exe]]: برنامج ويندوز صغير بيطبع اسم الجهاز. على لينكس أخدناه من Wine (حزمة [[wine64]] في [[docker run --rm ubuntu:24.04]])، وعلى ويندوز من [[C:\Windows\System32]].

---

## ١. [[file hostname.exe]]

~~~text الناتج
hostname.exe: PE32+ executable (console) x86-64, for MS Windows, 16 sections
~~~

| الكلمة | معناها |
|---|---|
| [[PE32+]] | صيغة PE (Portable Executable) بتاعة ويندوز، و [[+]] = 64-bit |
| [[executable]] | برنامج يتشغّل (مش [[(DLL)]]) |
| [[(console)]] | برنامج ترمنال. البرامج اللي ليها شبابيك بتبقى [[(GUI)]] |
| [[x86-64]] | لمعالجات Intel و AMD الـ 64-bit |
| [[16 sections]] | الملف مقسوم ١٦ قسم (كود وداتا وموارد...) |

---

## ٢. [[xxd -l 16 hostname.exe]]

[[xxd]] بيعرض الـ bytes، و [[-l 16]] = أول ١٦ byte.

~~~text الناتج
00000000: 4d5a 9000 0300 0000 0400 0000 ffff 0000  MZ..............
~~~

- [[00000000:]]: مكان أول byte في السطر (الـ offset) بالـ hex.
- [[4d5a ...]]: الـ bytes نفسها، كل رقمين hex = byte.
- [[MZ..............]]: نفس الـ bytes كحروف، والنقطة مكان أي byte مش حرف مطبوع.

[[4d]] هو [[M]] و [[5a]] هو [[Z]]: البصمة اللي أي [[.exe]] و [[.dll]] بيبدأ بيها (أول حروف اسم Mark Zbikowski، مهندس في Microsoft أيام DOS). والـ bytes اللي بعدها header قديم من DOS، وجواه عند الـ offset [[0x3c]] رقم بيقول الـ header الحقيقي (PE) فين. في الملف ده [[xxd -s 0x3c -l 4]] طلّع [[8000 0000]]، يعني الـ PE header عند الـ byte رقم [[0x80]].

---

## ٣. [[sha256sum hostname.exe]]

SHA-256 دالة hash: بتاخد ملف بأي حجم وتطلّع رقم ثابت الطول، ٢٥٦ bit = ٦٤ حرف hex. نفس الملف = نفس الرقم دايمًا، وأي تغيير ولو byte واحد = رقم مختلف تمامًا.

~~~text الناتج
3d169e9c5a3f2593cfd5fa5a8c0cb397e5b952d55155019b17d812901c708d62  hostname.exe
~~~

---

## ٤. [[sha256sum -c SHA256SUMS]]

المواقع بتنشر ملف (غالبًا اسمه [[SHA256SUMS]] أو [[SHASUMS256.txt]]) فيه سطر لكل ملف: الـ hash، ومسافتين، والاسم، بنفس شكل ناتج [[sha256sum]]. و [[-c]] = check: اقرا الملف ده، واحسب hash كل ملف مذكور فيه، وقارن.

~~~text الناتج
hostname.exe: OK
~~~

وعشان نشوف الفشل، عملنا نسخة [[copy.exe]] وضفنالها byte واحد (سطر فاضي في الآخر):

~~~text الناتج
e2834a85a064a9d5184e6584607c69ee04759300adb594b114590ece24ade648  copy.exe
copy.exe: FAILED
sha256sum: WARNING: 1 computed checksum did NOT match
~~~

byte واحد غيّر الـ ٦٤ حرف كلهم. والأمر خرج بـ exit code 1، فتقدر تستخدمه في سكربت يوقف لو الملف مش سليم.

---

## ٥. [[wine hostname.exe]]

Wine طبقة بتخلي برامج ويندوز تشتغل على لينكس: بتفهم صيغة PE، ولما البرنامج ينادي دالة من مكتبات ويندوز، Wine بيترجمها لنداء لينكس. شغّلناه في container اسم الجهاز فيه [[ALI-PC]]:

~~~text الناتج
wine: configuration in L"/root/.wine" has been updated.
ALI-PC
~~~

أول سطر Wine بيعمل فولدر [[~/.wine]] (ويندوز وهمي فيه [[C:]]). وفي أوبونتو 24.04 مع [[--no-install-recommends]] أمر [[wine]] مش موجود، فشغّلناه بالمسار [[/usr/lib/wine/wine64]]؛ لو سطّبت حزمة [[wine]] كاملة هتلاقي [[wine]] عادي.

---

## ٦. نفس الفحص على ويندوز

جربناه على [[C:\Windows\System32\hostname.exe]] (نسخة Microsoft، مش بتاعة Wine، فالـ hash مختلف)، في PowerShell 7.6:

~~~powershell
Get-FileHash .\hostname.exe
Format-Hex .\hostname.exe -Count 16
Get-AuthenticodeSignature .\hostname.exe
~~~

~~~text الناتج
Algorithm : SHA256
Hash      : F8B207720D8673FEB5839DF1E52360F72C2AD2CE9917D5F3DA4F30368DC747C9

0000000000000000 4D 5A 90 00 03 00 00 00 04 00 00 00 FF FF 00 00 MZ...
~~~

- [[Get-FileHash]]: نفس [[sha256sum]]، و SHA256 هو الافتراضي، والحروف كبيرة (المقارنة مش بتفرق).
- [[Format-Hex]]: نفس [[xxd]]، و [[-Count 16]] = أول ١٦ byte. نفس البصمة [[4D 5A]].
- [[Get-AuthenticodeSignature]]: بيقرا التوقيع الرقمي. الـ [[Status]] أهم خانة:

| الملف | [[Status]] | الموقّع |
|---|---|---|
| [[hostname.exe]] | [[Valid]] | [[CN=Microsoft Windows]] (نوع التوقيع [[Catalog]]: ملفات ويندوز موقّعة في كتالوج مركزي) |
| [[node.exe]] | [[Valid]] | [[CN=OpenJS Foundation]] |
| [[copy.exe]] (byte زيادة) | [[NotSigned]] | مفيش |
| نسخة من [[node.exe]] غيّرنا فيها byte | [[HashMismatch]] | التوقيع موجود بس المحتوى اتغيّر بعده |

[[HashMismatch]] أخطر واحدة: حد عدّل برنامج موقّع. و [[Valid]] معناها إن الملف ما اتغيّرش من ساعة ما الشركة دي وقّعته، مش معناها إن البرنامج «آمن»، فبص كمان على اسم الشركة. و [[Get-FileHash]] و [[Get-AuthenticodeSignature]] على [[hostname.exe]] طلّعوا نفس الـ Hash ونفس [[Valid]] في Windows PowerShell 5.1.

### و [[.msi]]؟

الـ [[.msi]] قاعدة بيانات بيشغّلها [[msiexec]]، و [[Get-FileHash]] و [[Get-AuthenticodeSignature]] شغالين عليه بنفس الطريقة. أوامر التسطيب زي [[msiexec /i app.msi /quiet]] بتغيّر الجهاز، فمشغّلناهاش هنا: دي من docs بتاعة Microsoft.

---

## الخلاصة

| السؤال | لينكس | ويندوز |
|---|---|---|
| نوعه إيه؟ | [[file]] | خصائص الملف |
| البصمة | [[xxd -l 16]] | [[Format-Hex -Count 16]] |
| الـ hash | [[sha256sum]] | [[Get-FileHash]] |
| أقارن بملف checksums | [[sha256sum -c SHA256SUMS]] | قارن الـ Hash بعينك أو بـ [[-eq]] |
| مين وقّعه؟ | (مفيش توقيع PE على لينكس) | [[Get-AuthenticodeSignature]] |

قارن الـ hash كله، مش أول ٤ حروف.`,
          lines: [
            R`[[file]] بيقول إنه برنامج ويندوز 64-bit (PE32+) console.`,
            R`أول bytes: [[4d5a]] يعني [[MZ]]، بصمة أي برنامج ويندوز.`,
            R`بيحسب SHA-256 للملف: ٦٤ حرف hex.`,
            R`بيقارن الملفات بالأرقام المكتوبة في ملف [[SHA256SUMS]] (الشكل اللي المواقع بتنشره).`,
            R`على لينكس: Wine بيشغّل برنامج ويندوز.`
          ],
          sol: R`الناتج الحقيقي (على [[hostname.exe]] بتاع Wine):
[[hostname.exe: PE32+ executable (console) x86-64, for MS Windows, 16 sections]]
[[00000000: 4d5a 9000 0300 0000 0400 0000 ffff 0000  MZ..............]]
[[3d169e9c5a3f2593cfd5fa5a8c0cb397e5b952d55155019b17d812901c708d62  hostname.exe]]
[[hostname.exe: OK]]
و [[wine hostname.exe]] بيطبع اسم الجهاز.

و [[Get-FileHash]] في PowerShell بيطبع نفس الرقم بحروف كبيرة: [[Algorithm : SHA256]] و [[Hash : 3D169E9C...]]. ولما تضيف byte للنسخة، الـ hash بيتغير بالكامل، و [[sha256sum -c]] بيقول [[FAILED]] و [[WARNING: 1 computed checksum did NOT match]].

و [[file /bin/ls]] للمقارنة: [[ELF 64-bit LSB pie executable, x86-64]]، يعني برنامج لينكس بصيغة تانية خالص (ELF، بصمته [[7f 45 4c 46]]).`
        },
        {
          cmd: ".dll و .so و .dylib",
          title: "المكتبات المشتركة (.dll و .so و .dylib) إيه، وليه بيطلعلي VCRUNTIME140.dll was not found؟",
          desc: R`البرامج مش بتحط كل الكود جواها. حاجات كتير مشتركة (الطباعة على الشاشة، التشفير، الضغط، الرسم) بتبقى في مكتبات منفصلة، وكل البرامج بتستخدم نفس النسخة وقت التشغيل. اسمها shared libraries أو dynamic libraries:

• [[.dll]] (Dynamic-Link Library): ويندوز. نفس صيغة PE بتاعة [[.exe]] (بتبدأ بـ [[MZ]] برضه)، بس ملهاش نقطة بداية تتشغّل منها. في [[C:\Windows\System32]] أو جنب البرنامج. وفي .NET، الـ [[.dll]] فيها IL مش كود معالج، و [[dotnet app.dll]] بيشغّلها.
• [[.so]] (shared object): لينكس. صيغة ELF. الأسامي فيها أرقام النسخة: [[libc.so.6]] و [[libssl.so.3]]. في [[/usr/lib]] و [[/lib]].
• [[.dylib]] (dynamic library): الماك. صيغة Mach-O. وكمان [[.framework]] (فولدر فيه المكتبة وملفاتها).

وفيه static libraries بتتلزق جوه البرنامج وقت الـ build: [[.a]] (لينكس والماك) و [[.lib]] (ويندوز).

بتشوف البرنامج محتاج إيه إزاي:
• لينكس: [[ldd /bin/ls]].
• الماك: [[otool -L /bin/ls]].
• ويندوز: Dependencies (برنامج مجاني) أو [[dumpbin /dependents app.exe]] من Visual Studio.

وده سبب رسايل مشهورة:
• ويندوز: [[The code execution cannot proceed because VCRUNTIME140.dll was not found]]: البرنامج محتاج Microsoft Visual C++ Redistributable. نزّله من موقع Microsoft (مش من مواقع «dll download»، دي أشهر طريقة لتوزيع الفيروسات).
• لينكس: [[error while loading shared libraries: libssl.so.1.1: cannot open shared object file]]: المكتبة مش متسطّبة أو نسختها مختلفة. ده بيحصل كتير لما تنقل برنامج من توزيعة لتوزيعة، أو image Docker مبني على نسخة قديمة.
• وفي Node: مكتبات زي [[bcrypt]] و [[sharp]] فيها جزء native ([[.node]]، وهو [[.so]] أو [[.dll]] متسمّي كده)، فلو نسخت [[node_modules]] من ويندوز لـ لينكس بتقع ([[invalid ELF header]]).`,
          example: R`file -L /usr/lib/x86_64-linux-gnu/libc.so.6
ldd /bin/ls
file zlib1.dll
xxd -l 4 /bin/ls`,
          try: R`على لينكس: [[ldd $(which node)]] و [[ldd $(which python3)]] وشوف بيعتمدوا على إيه. على الماك: [[otool -L $(which python3)]]. على ويندوز: افتح [[C:\Windows\System32]] ورتّب بالنوع وشوف كام [[.dll]]. وفي أي مشروع Node فيه [[bcrypt]] أو [[sharp]]: [[find node_modules -name "*.node"]] و [[file]] عليهم.`,
          deep: {
            why: R`لو كل برنامج حط نسخة من كل مكتبة جواه، الهارد والرامات هيتملوا نسخ مكررة، وأي ثغرة في مكتبة تشفير هتحتاج تحديث كل برنامج لوحده. المكتبات المشتركة بتخلي التحديث في مكان واحد، بس التمن إن البرنامج بيعتمد على إن المكتبة موجودة بالنسخة الصح.`,
            how: R`لما البرنامج يبدأ، برنامج صغير اسمه dynamic loader (على لينكس [[/lib64/ld-linux-x86-64.so.2]]) بيقرا ليستة المكتبات المطلوبة من الـ header، ويدوّر عليها في مسارات معروفة، ويحمّلها في الذاكرة، ويربط كل نداء بمكانه. لو مكتبة ناقصة البرنامج مبيبدأش خالص. و [[ldd]] بيعرض نتيجة الخطوة دي من غير ما يشغّل.`,
            when: R`لما برنامج ميرضاش يفتح برسالة عن DLL أو .so، ولما تبني Docker image على Alpine (بيستخدم musl مش glibc، فبرامج كتير متبنية لـ glibc بتقع)، ولما تشتغل بمكتبات native في Node أو Python.`,
            mistakes: R`تنزّل DLL ناقصة من موقع عشوائي. تنسخ [[node_modules]] بين أنظمة بدل [[npm ci]] على كل نظام. تمسح [[.dll]] من System32 عشان «تنضّف». وتستخدم image Alpine لبرنامج متبني على glibc فيطلعلك [[not found]] مع إن الملف موجود.`
          },
          teach: R`## المثال: نسأل ٣ أسئلة عن المكتبات

المثال ٤ أوامر لينكس بتجاوب: المكتبة دي نوعها إيه؟ البرنامج ده محتاج أنهي مكتبات؟ والـ DLL بتاعة ويندوز شكلها إيه من جوه؟ كله اتشغّل في [[docker run --rm ubuntu:24.04]] (سطّبنا [[file]] و [[xxd]]، وحزمة [[libz-mingw-w64]] عشان نجيب [[zlib1.dll]] حقيقية، دي مكتبة الضغط zlib متبنية لويندوز).

---

## ١. [[file -L /usr/lib/x86_64-linux-gnu/libc.so.6]]

### الحتت

- [[file]]: بيقرا أول bytes في الملف ويقولك نوعه، من غير ما يبص على الامتداد.
- [[-L]]: لو الملف symlink (اختصار بيشاور على ملف تاني)، اتبعه واوصف الملف الحقيقي. من غيرها [[file]] على symlink بيقول [[symbolic link to ...]] وبس. مكتبات كتير في لينكس symlinks ([[libz.so.1]] بيشاور على [[libz.so.1.3]] مثلًا)، فـ [[-L]] عادة كويسة. وعلى أوبونتو 24.04 [[libc.so.6]] نفسه ملف حقيقي، فالناتج واحد بيها ومن غيرها.
- [[/usr/lib/x86_64-linux-gnu/]]: فولدر المكتبات على أوبونتو. [[x86_64-linux-gnu]] معناها «للمعالجات x86 64-bit، لينكس، بمكتبة GNU»، عشان الجهاز ممكن يبقى عليه مكتبات لمعمارية تانية جنبها.
- [[libc.so.6]]: مكتبة C الأساسية (glibc). [[lib]] = library، و [[c]] اللغة، و [[.so]] = shared object، و [[6]] رقم الـ ABI (نسخة الواجهة). تقريبًا كل برنامج على لينكس بيستخدمها.

~~~text الناتج
/usr/lib/x86_64-linux-gnu/libc.so.6: ELF 64-bit LSB shared object, x86-64, version 1 (GNU/Linux), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=a4a7..., for GNU/Linux 3.2.0, stripped
~~~

| الكلمة | معناها |
|---|---|
| [[ELF]] | صيغة البرامج والمكتبات في لينكس (Executable and Linkable Format) |
| [[64-bit LSB]] | 64-bit، و LSB = Least Significant Byte first (little-endian: الأرقام متخزنة من الـ byte الصغير الأول) |
| [[shared object]] | مكتبة مشتركة مش برنامج يتشغّل لوحده |
| [[x86-64]] | للمعالجات دي (Intel و AMD). على Raspberry Pi هتلاقي [[ARM aarch64]] |
| [[dynamically linked]] | هي نفسها بتعتمد على مكتبات تانية بتتحمّل وقت التشغيل |
| [[interpreter /lib64/ld-linux-x86-64.so.2]] | الـ dynamic loader: البرنامج اللي بيحمّل المكتبات |
| [[stripped]] | أسامي الدوال الداخلية (للـ debugging) اتشالت عشان الحجم |

---

## ٢. [[ldd /bin/ls]]

[[ldd]] = list dynamic dependencies: «البرنامج ده محتاج أنهي مكتبات، وهيلاقيها فين؟»

~~~text الناتج
	linux-vdso.so.1 (0x00007fff1777f000)
	libselinux.so.1 => /lib/x86_64-linux-gnu/libselinux.so.1 (0x00007ab627106000)
	libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007ab626ef3000)
	libpcre2-8.so.0 => /lib/x86_64-linux-gnu/libpcre2-8.so.0 (0x00007ab626e59000)
	/lib64/ld-linux-x86-64.so.2 (0x00007ab62715c000)
~~~

- كل سطر: الاسم المطلوب، و [[=>]]، والملف اللي اتلقى فعلًا.
- الرقم بين القوسين: العنوان في الذاكرة اللي المكتبة اتحمّلت عنده. بيتغير كل مرة (حماية اسمها ASLR)، فمتهتمش بيه.
- [[linux-vdso.so.1]]: مش ملف على الديسك، الـ kernel بيحطها في ذاكرة كل برنامج عشان نداءات سريعة زي الوقت.
- [[libselinux]] (صلاحيات SELinux، عشان [[ls -Z]]) و [[libpcre2-8]] (regex). يعني حتى [[ls]] بيعتمد على ٣ مكتبات.
- آخر سطر هو الـ loader نفسه.

### لو مكتبة ناقصة

نقلنا [[libpcre2-8.so.0]] من مكانها في الـ container وشغّلنا نسخة من [[ls]]:

~~~text الناتج
./myls: error while loading shared libraries: libpcre2-8.so.0: cannot open shared object file: No such file or directory
~~~

دي بالظبط رسالة «.so ناقصة» المشهورة: البرنامج سليم، بس الـ loader مالقاش مكتبة في الليستة فرفض يبدأ. ولاحظ إن [[grep]] نفسه وقع بنفس الرسالة، لأنه بيستخدم نفس المكتبة.

---

## ٣. [[file zlib1.dll]]

~~~text الناتج
zlib1.dll: PE32+ executable (DLL) (console) x86-64 (stripped to external PDB), for MS Windows, 12 sections
~~~

- [[PE32+]]: صيغة PE بتاعة ويندوز، و [[+]] يعني 64-bit (و PE32 من غيرها 32-bit).
- [[executable (DLL)]]: نفس صيغة الـ [[.exe]] بالظبط، الفرق علامة في الـ header بتقول «أنا مكتبة».
- [[stripped to external PDB]]: معلومات الـ debugging متشالة في ملف [[.pdb]] منفصل.
- [[12 sections]]: الملف مقسوم أقسام: كود ([[.text]])، وداتا، وليستة الدوال اللي بيصدّرها (exports)...

---

## ٤. [[xxd -l 4 /bin/ls]]: البصمة

[[xxd]] بيعرض الـ bytes بالـ hex، و [[-l 4]] = أول ٤ bytes بس.

~~~text الناتج
00000000: 7f45 4c46                                .ELF
~~~

[[7f]] byte مش حرف، وبعده [[45 4c 46]] وهما الحروف [[E]] و [[L]] و [[F]]. أي ملف ELF بيبدأ كده. وعلى الـ DLL نفس الأمر بـ [[-l 2]]:

~~~text الناتج
00000000: 4d5a                                     MZ
~~~

---

## ٥. ويندوز: نفس الكلام في PowerShell

~~~powershell
(Get-ChildItem C:\Windows\System32 -Filter *.dll -File).Count
Format-Hex C:\Windows\System32\kernel32.dll -Count 2
~~~

على جهاز ويندوز 11 (PowerShell 7.6):

~~~text الناتج
3453
0000000000000000 4D 5A                                           MZ
~~~

يعني [[System32]] فيه أكتر من ٣٠٠٠ DLL، و [[kernel32.dll]] (من أهم مكتبات ويندوز) بيبدأ بـ [[MZ]] زي أي [[.exe]]. و [[Format-Hex]] هو بديل [[xxd]] في PowerShell، و [[-Count 2]] = أول ٢ bytes.

---

## ٦. الماك

[[otool -L /bin/ls]] هو بديل [[ldd]] على الماك، والمكتبات [[.dylib]] بصيغة Mach-O. مفيش ماك هنا نجرّب عليه، فده من docs بتاعة Apple.

---

## الخلاصة

| | ويندوز | لينكس | الماك |
|---|---|---|---|
| المكتبة | [[.dll]] | [[.so]] | [[.dylib]] |
| الصيغة والبصمة | PE: [[MZ]] | ELF: [[7f E L F]] | Mach-O |
| البرنامج محتاج إيه؟ | Dependencies أو [[dumpbin /dependents]] | [[ldd]] | [[otool -L]] |
| رسالة الناقصة | [[... .dll was not found]] | [[error while loading shared libraries]] | [[Library not loaded]] |

ولما مكتبة تنقص: سطّبها من مصدرها الرسمي (Visual C++ Redistributable من Microsoft، أو [[apt install]] للحزمة)، مش ملف من موقع «dll download».`,
          lines: [
            R`[[-L]] يتبع الـ symlink: مكتبة C الأساسية في لينكس، [[shared object]] بصيغة ELF.`,
            R`المكتبات اللي [[ls]] محتاجها، ومكان كل واحدة.`,
            R`DLL ويندوز: PE زي الـ exe، بس مكتوب [[(DLL)]].`,
            R`بصمة ELF: [[7f]] وبعدها [[ELF]].`
          ],
          sol: R`الناتج الحقيقي (أوبونتو):
[[/usr/lib/x86_64-linux-gnu/libc.so.6: ELF 64-bit LSB shared object, x86-64, version 1 (GNU/Linux), dynamically linked, ...]]
[[linux-vdso.so.1 (0x...)]]
[[libselinux.so.1 => /lib/x86_64-linux-gnu/libselinux.so.1 (0x...)]]
[[libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x...)]]
[[libpcre2-8.so.0 => /lib/x86_64-linux-gnu/libpcre2-8.so.0 (0x...)]]
[[/lib64/ld-linux-x86-64.so.2 (0x...)]]
[[zlib1.dll: PE32+ executable (DLL) (console) x86-64 (stripped to external PDB), for MS Windows, 12 sections]]
[[00000000: 7f45 4c46                                .ELF]]

([[zlib1.dll]] موجودة لو عندك Wine أو mingw، أي DLL هتطلع نفس الشكل.) و [[file]] على ملف [[.node]] في [[bcrypt]] بيقول [[ELF 64-bit LSB shared object]] على لينكس، و [[PE32+ executable (DLL)]] على ويندوز.`
        },
        {
          cmd: ".app و .dmg و .pkg",
          title: "على الماك: .app ده ملف ولا فولدر، و .dmg و .pkg بيسطّبوا إزاي؟",
          desc: R`على الماك:

• [[.app]]: البرنامج نفسه، بس هو في الحقيقة فولدر (اسمه bundle) و Finder بيعرضه كأنه ملف واحد. جواه:
  [[Contents/Info.plist]]: معلومات البرنامج (الاسم والنسخة والأيقونة والصلاحيات)، وهو XML (أو binary plist).
  [[Contents/MacOS/]]: البرنامج الحقيقي (Mach-O).
  [[Contents/Resources/]]: الأيقونات والصور والترجمات.
  [[Contents/Frameworks/]]: المكتبات.
  كليك يمين ثم [[Show Package Contents]] بيفتحه كفولدر. والتسطيب غالبًا مجرد إنك تسحبه لفولدر [[/Applications]].
• [[.dmg]] (disk image): زي فلاشة وهمية. بتدوس عليه دبل كليك فيظهر كـ disk في Finder، جواه غالبًا [[.app]] وسهم لـ Applications. بعد ما تسحب البرنامج اعمل Eject. من الترمنال: [[hdiutil attach app.dmg]].
• [[.pkg]]: مثبّت بخطوات (زي [[.msi]])، بيحط ملفات في أماكن مختلفة في النظام وممكن يشغّل سكربتات. من الترمنال: [[sudo installer -pkg app.pkg -target /]].
• [[.plist]]: ملفات إعدادات في الماك و iOS (Property List)، XML أو binary. [[plutil -p file.plist]] بيعرضها مقروءة.

الأمان (Gatekeeper):
• البرامج اللي نزلت من النت عليها علامة quarantine، والماك بيتأكد إنها موقّعة من مطوّر مسجل ومتراجعة من Apple (notarized).
• لو مش كده: [[“App” cannot be opened because the developer cannot be verified]] أو [[“App” is damaged and can’t be opened]].
• الحل الصح لو متأكد من المصدر: System Settings ثم Privacy & Security ثم [[Open Anyway]]. والحل اللي هتلاقيه في النت [[xattr -d com.apple.quarantine App.app]] بيشيل العلامة، وده بيقفل الحماية للبرنامج ده، فاعمله بس لبرنامج انت متأكد منه.

وأسهل طريقة للمبرمج: Homebrew ([[brew install --cask visual-studio-code]]) بينزّل ويسطّب ويحدّث.`,
          example: R`ls /Applications/Safari.app/Contents
plutil -p /Applications/Safari.app/Contents/Info.plist | head -5
file /Applications/Safari.app/Contents/MacOS/Safari
hdiutil attach ~/Downloads/app.dmg
xattr -l ~/Downloads/app.dmg`,
          try: R`على الماك: نفّذ أول ٣ أوامر على أي برنامج في [[/Applications]]. وفي Finder كليك يمين على أي [[.app]] ثم Show Package Contents. ولو عندك [[.dmg]] في Downloads، نفّذ [[xattr -l]] عليه وشوف [[com.apple.quarantine]]. (على ويندوز ولينكس: اقرا الدرس وخلاص، أو لو عندك مشروع iOS أو Flutter افتح [[ios/Runner/Info.plist]]، ده نفس صيغة Info.plist.)`,
          deep: {
            why: R`Apple عايزة البرنامج يبقى «حاجة واحدة» تسحبها وتمسحها، من غير ملفات متفرقة في النظام. الـ bundle بيحقق ده: كل حاجة البرنامج محتاجها في فولدر واحد شكله ملف. والـ [[.dmg]] طريقة توزيع بتحافظ على الـ bundle كامل بصلاحياته وتوقيعه.`,
            how: R`Finder بيعرف إن الفولدر bundle من امتداده ([[.app]]) ومن [[Info.plist]]. لما تشغّله، النظام بيقرا [[CFBundleExecutable]] من الـ plist ويشغّل الملف ده من [[Contents/MacOS/]]. والمتصفح لما ينزّل أي ملف بيحط عليه extended attribute اسمه [[com.apple.quarantine]]، و Gatekeeper بيشيك عليه أول مرة تفتحه.`,
            when: R`لما تسطّب أدوات على الماك، أو تشتغل iOS أو macOS (الـ [[Info.plist]] هتعدّله كتير: صلاحيات الكاميرا والموقع).`,
            mistakes: R`تشغّل البرنامج من جوه الـ [[.dmg]] مباشرة بدل ما تسحبه لـ Applications (بيشتغل بس مش هيتحدث، والـ dmg يفضل mounted). تشيل الـ quarantine عن أي حاجة من غير ما تفكر. وتنسى صلاحيات [[NSCameraUsageDescription]] وأخواتها في [[Info.plist]] فالتطبيق يقع أول ما يطلب الكاميرا.`
          },
          teach: R`## المثال: نفتح برنامج ماك من جوه

الأوامر الخمسة بتعمل حاجة واحدة: بتثبت إن [[.app]] فولدر عادي، وتقرا بطاقة تعريف البرنامج، وتلاقي البرنامج الحقيقي جواه، وبعدين تفتح [[.dmg]] وتشوف علامة «نازل من النت». الأوامر دي كلها بتاعة الماك ([[plutil]] و [[hdiutil]] و [[xattr]] مش موجودين على ويندوز ولا لينكس)، ومفيش ماك هنا نجرّب عليه، فالأشكال والنواتج من docs بتاعة Apple وناتج الدرس اللي في «الحل». الحتة الوحيدة اللي جربناها هي صيغة الـ plist نفسها، بـ Python في Docker.

---

## ١. [[ls /Applications/Safari.app/Contents]]

- [[ls]]: اعرض اللي جوه فولدر.
- [[/Applications/]]: فولدر البرامج على الماك (زي [[C:\Program Files]]).
- [[Safari.app]]: Finder بيوريهولك أيقونة واحدة، بس [[ls]] بيعامله زي أي فولدر. ده معنى **bundle**: فولدر النظام بيعرضه كأنه ملف.
- [[Contents]]: الفولدر الوحيد جوه أي [[.app]].

وجواه:

| الحاجة | فيها إيه |
|---|---|
| [[Info.plist]] | بطاقة التعريف: الاسم والنسخة والـ ID والصلاحيات |
| [[MacOS/]] | البرنامج الحقيقي اللي بيتشغّل |
| [[Resources/]] | الأيقونات والصور والترجمات |
| [[Frameworks/]] | المكتبات اللي جاية مع البرنامج (لو فيه) |
| [[_CodeSignature/]] | التوقيع: hash لكل ملف في الـ bundle |

---

## ٢. [[plutil -p .../Info.plist | head -5]]

- [[plutil]] = property list utility، أداة Apple للـ plist.
- [[-p]] = print: اطبعه بشكل مقروء، سواء كان الملف XML أو binary.
- [[|]] (pipe): ابعت الناتج للأمر اللي بعده بدل الشاشة.
- [[head -5]]: أول ٥ سطور بس.

### الـ plist من جوه

الـ plist (Property List) جدول مفاتيح وقيم. في شكله الـ XML بيبان كده (عملنا واحد صغير لتطبيق تجربة):

~~~text Info.plist
<plist version="1.0">
<dict>
  <key>CFBundleIdentifier</key>
  <string>com.example.gym</string>
  <key>CFBundleExecutable</key>
  <string>Gym</string>
  <key>CFBundleShortVersionString</key>
  <string>1.4.0</string>
  <key>NSCameraUsageDescription</key>
  <string>Scan member QR codes</string>
</dict>
</plist>
~~~

[[<dict>]] = dictionary، وجواه كل [[<key>]] وبعده قيمته ([[<string>]] أو [[<integer>]] أو [[<true/>]]...). قريناه بـ [[plistlib]] اللي جاية مع Python (في [[python:3.13-slim]] على Docker)، وهي بتعمل نفس شغل [[plutil -p]]:

~~~text الناتج
{'CFBundleIdentifier': 'com.example.gym', 'CFBundleExecutable': 'Gym', 'CFBundleShortVersionString': '1.4.0', 'NSCameraUsageDescription': 'Scan member QR codes'}
~~~

وحفظناه تاني بصيغة binary: طلع ٢٠٧ byte وأول ٨ bytes [[bplist00]]. دي البصمة اللي هتلاقيها في plist بايظ الشكل لو فتحته في محرر نصوص، وعشان كده [[plutil -p]] مفيد: بيقرا الاتنين.

| المفتاح | معناه |
|---|---|
| [[CFBundleIdentifier]] | ID فريد للبرنامج بالمقلوب من الدومين ([[com.apple.Safari]]) |
| [[CFBundleExecutable]] | اسم الملف اللي هيتشغّل من [[Contents/MacOS/]] |
| [[CFBundleShortVersionString]] | النسخة اللي اليوزر بيشوفها |
| [[NSCameraUsageDescription]] | الجملة اللي بتظهر لما التطبيق يطلب الكاميرا. من غيرها التطبيق بيقع |

---

## ٣. [[file /Applications/Safari.app/Contents/MacOS/Safari]]

ده الملف اللي [[CFBundleExecutable]] بيشاور عليه. و [[file]] بيقول عليه (من ناتج الدرس):

~~~text
Mach-O universal binary with 2 architectures: [x86_64:...] [arm64e:...]
~~~

- [[Mach-O]]: صيغة البرامج على الماك (زي PE في ويندوز و ELF في لينكس).
- [[universal binary]]: ملف واحد جواه نسختين من البرنامج: [[x86_64]] لأجهزة Intel، و [[arm64e]] لـ Apple Silicon (M1 وما بعده). الماك بيشغّل النسخة المناسبة.

---

## ٤. [[hdiutil attach ~/Downloads/app.dmg]]

- [[hdiutil]] = hard disk image utility.
- [[attach]]: «ركّب» الـ disk image، زي ما تحط فلاشة. نفس اللي بيحصل لما تدوس دبل كليك.
- [[~]]: فولدر اليوزر بتاعك ([[/Users/ali]]).

بيطبع سطر فيه [[/Volumes/App]]: كل disk متركّب على الماك بيظهر في [[/Volumes/]]. ولما تخلص: [[hdiutil detach /Volumes/App]] (أو Eject في Finder).

---

## ٥. [[xattr -l ~/Downloads/app.dmg]]

- [[xattr]] = extended attributes: معلومات زيادة متعلقة على الملف بره محتواه (مش جوه الـ bytes بتاعته).
- [[-l]] = list: اعرضهم بقيمهم.

~~~text شكل الناتج
com.apple.quarantine: 0083;...;Safari;...
~~~

دي علامة الـ quarantine: المتصفح حطها وقت التنزيل، وفيها رقم (flags) ووقت التنزيل بالـ hex واسم البرنامج اللي نزّله. أول مرة تفتح الملف، Gatekeeper بيشوف العلامة دي ويتأكد من التوقيع والـ notarization. وده شبيه بـ «Mark of the Web» في ويندوز.

---

## الخلاصة

| الملف | هو إيه | التسطيب |
|---|---|---|
| [[.app]] | فولدر (bundle) فيه البرنامج كله | اسحبه لـ [[/Applications]] |
| [[.dmg]] | disk image، زي فلاشة وهمية | افتحه، اسحب الـ [[.app]]، اعمل Eject |
| [[.pkg]] | مثبّت بخطوات وسكربتات | دبل كليك أو [[sudo installer -pkg]] |
| [[.plist]] | إعدادات مفتاح وقيمة (XML أو [[bplist00]]) | اقراه بـ [[plutil -p]] |`,
          lines: [
            R`الـ [[.app]] فولدر: جواه [[Info.plist]] و [[MacOS]] و [[Resources]]...`,
            R`[[plutil -p]] بيعرض الـ plist مقروء.`,
            R`البرنامج الحقيقي: Mach-O.`,
            R`بيفتح الـ dmg كـ disk في [[/Volumes/]].`,
            R`بيعرض الـ extended attributes، ومنها علامة الـ quarantine.`
          ],
          sol: R`على ماك حديث:
[[ls]] بيطبع حاجات زي [[Info.plist]] و [[MacOS]] و [[Resources]] و [[_CodeSignature]] و [[version.plist]].
[[plutil -p]] بيطبع سطور زي [["CFBundleIdentifier" => "com.apple.Safari"]] و [["CFBundleExecutable" => "Safari"]].
[[file]] بيطبع [[Mach-O universal binary with 2 architectures: [x86_64:...] [arm64e:...]]] (برنامج واحد فيه نسختين: Intel و Apple Silicon).
[[hdiutil attach]] بيطبع سطور فيها [[/Volumes/App]].
[[xattr -l]] بيطبع [[com.apple.quarantine: 0083;...;Safari;...]] (مين نزّله وإمتى).

وتلاقي [[_CodeSignature/]]: التوقيع اللي Gatekeeper بيتأكد منه.`
        },
        {
          cmd: ".deb و .rpm و .AppImage",
          title: "على لينكس: الفرق بين .deb و .rpm و .AppImage و snap و flatpak إيه؟",
          desc: R`على لينكس أغلب البرامج بتتسطّب من مدير الحزم ([[apt]] أو [[dnf]]) اللي بينزّل من مستودعات التوزيعة. بس ساعات هتنزّل ملف بنفسك:

• [[.deb]]: حزمة Debian و Ubuntu و Mint. أرشيف فيه ملفات البرنامج بالمسارات اللي هتتحط فيها ([[./usr/bin/hello]]) وملف [[control]] (الاسم والنسخة والـ dependencies). بتتسطّب بـ [[sudo apt install ./file.deb]] (الـ [[./]] مهمة، وبتنزّل الـ dependencies)، أو [[sudo dpkg -i file.deb]] (مبيجيبش الـ dependencies).
• [[.rpm]]: نفس الفكرة لـ Fedora و RHEL و openSUSE: [[sudo dnf install ./file.rpm]].
• [[.AppImage]]: البرنامج كله بمكتباته في ملف واحد بيشتغل على أي توزيعة من غير تسطيب: [[chmod +x App.AppImage]] و [[./App.AppImage]]. محتاج FUSE (على Ubuntu 24.04: [[sudo apt install libfuse2t64]]).
• snap ([[snap install code --classic]]) و flatpak ([[flatpak install flathub ...]]): حزم بتيجي بمكتباتها ومعزولة عن النظام، من متاجر مركزية.
• [[.tar.gz]] فيه البرنامج جاهز (زي Node و Go الرسميين): بتفكه وتحط الفولدر في الـ PATH.
• [[.sh]] installer ([[curl ... | sh]]): سكربت بيسطّب. شائع (nvm و rustup و Docker) بس اقراه الأول لو المصدر مش معروف.

أوامر تفحص بيها [[.deb]] من غير ما تسطّبه:
• [[dpkg-deb -I file.deb]]: المعلومات والـ dependencies.
• [[dpkg-deb -c file.deb]]: الملفات اللي هتتحط فين.
• [[apt download hello]]: ينزّل الـ [[.deb]] من المستودع من غير تسطيب (تجربة آمنة).`,
          example: R`apt download hello
file hello_*.deb
dpkg-deb -I hello_*.deb
dpkg-deb -c hello_*.deb | head -5
sudo apt install ./hello_*.deb
hello`,
          try: R`على Ubuntu أو Debian (أو WSL): نفّذ أول ٤ أوامر في فولدر تجربة، واقرا الـ [[Depends:]] والمسارات. لو حابب تسطّب نفّذ الباقي وبعدين [[sudo apt remove hello]]. ولو عندك أي [[.AppImage]] جرّب تشغّله من غير [[chmod +x]] الأول.`,
          deep: {
            why: R`كل توزيعة لينكس ليها نسخ مكتبات مختلفة، فالحزمة لازم تتبني لكل توزيعة ومدير الحزم بيتأكد إن الـ dependencies موجودة. ده بيخلي النظام متناسق ويتحدث كله بأمر واحد ([[apt upgrade]])، بس صعب على المطورين. AppImage و snap و flatpak جم يحلوا ده بإن البرنامج ييجي بمكتباته.`,
            how: R`الـ [[.deb]] هو أرشيف [[ar]] جواه ٣ حاجات: [[debian-binary]] (النسخة)، و [[control.tar]] (المعلومات والسكربتات)، و [[data.tar]] (الملفات). [[dpkg]] بيفك [[data]] في [[/]] ويسجل كل ملف عشان يعرف يمسحه بعدين، و [[apt]] فوقه بيحل الـ dependencies.`,
            when: R`برامج مش في المستودعات: Chrome و VS Code و Discord بيدّوك [[.deb]] أو [[.rpm]]. و AppImage لبرامج عايز تجربها من غير ما تلمس النظام.`,
            mistakes: R`[[sudo apt install file.deb]] من غير [[./]] فـ apt يدوّر على حزمة بالاسم ده. [[dpkg -i]] وبعدين تستغرب إن البرنامج مش شغال (dependencies ناقصة، الحل [[sudo apt -f install]]). تنزّل [[.deb]] من موقع مش رسمي (بيتشغّل كـ root وقت التسطيب). وتنسى [[chmod +x]] للـ AppImage.`
          },
          teach: R`## المثال: نفتح حزمة [[.deb]] قبل ما نسطّبها

بدل ما تسطّب حزمة وانت مش عارف فيها إيه، المثال بينزّلها كملف، ويقرا بطاقتها، ويشوف الملفات اللي هتتحط، وبعدين بس يسطّبها. البرنامج اللي بنجرّب عليه اسمه [[hello]]: برنامج صغير معمول مخصوص كمثال للحزم، بيطبع «Hello, world!». كله اتشغّل في [[docker run --rm ubuntu:24.04]] بعد [[apt-get update]] (اللي بينزّل ليستة الحزم المتاحة).

---

## ١. [[apt download hello]]

- [[apt]]: مدير الحزم على Debian و Ubuntu.
- [[download]]: نزّل ملف الحزمة في الفولدر الحالي **من غير** تسطيب ومن غير [[sudo]]. (و [[apt install]] بينزّل ويسطّب.)

~~~text الناتج
Get:1 http://archive.ubuntu.com/ubuntu noble/main amd64 hello amd64 2.10-3build1 [26.0 kB]
Fetched 26.0 kB in 1s (19.2 kB/s)
~~~

السطر الأول بيقول جاب منين: [[noble]] اسم أوبونتو 24.04، و [[main]] القسم الرسمي، و [[amd64]] المعمارية (أي x86 64-bit)، و [[2.10-3build1]] النسخة. والملف اللي نزل اسمه [[hello_2.10-3build1_amd64.deb]]: الاسم والنسخة والمعمارية مفصولين بـ [[_]]. عشان كده المثال بيكتب [[hello_*.deb]]: الـ [[*]] بتطابق أي نسخة.

---

## ٢. [[file hello_*.deb]]

~~~text الناتج
hello_2.10-3build1_amd64.deb: Debian binary package (format 2.0), with control.tar.zst, data compression zst
~~~

الحزمة جواها أرشيفين مضغوطين بـ zstd ([[.zst]]): [[control]] (المعلومات) و [[data]] (الملفات). وتقدر تشوف ده بنفسك بـ [[ar t]] (الـ [[.deb]] من بره أرشيف بصيغة قديمة اسمها [[ar]]، و [[t]] = اعرض اللي جواه):

~~~text الناتج
debian-binary
control.tar.zst
data.tar.zst
~~~

[[debian-binary]] ملف صغير فيه نسخة الصيغة ([[2.0]]).

---

## ٣. [[dpkg-deb -I hello_*.deb]]

[[dpkg-deb]] أداة الحزم في المستوى الأوطى (apt مبني فوق [[dpkg]])، و [[-I]] = info: اعرض ملف [[control]]. أهم سطور الناتج:

~~~text الناتج
 Package: hello
 Version: 2.10-3build1
 Architecture: amd64
 Installed-Size: 104
 Depends: libc6 (>= 2.38)
 Conflicts: hello-traditional
~~~

| السطر | معناه |
|---|---|
| [[Package]] | اسم الحزمة اللي هتستخدمه في [[apt remove hello]] |
| [[Version]] | [[2.10]] نسخة البرنامج الأصلي، و [[-3build1]] رقم تغليف أوبونتو ليه |
| [[Installed-Size]] | المساحة بعد التسطيب بالـ KB |
| [[Depends]] | لازم يبقى عندك [[libc6]] نسخة 2.38 أو أحدث (درس [[.so]]) |
| [[Conflicts]] | ممنوع يتسطّب جنب الحزمة دي |

---

## ٤. [[dpkg-deb -c hello_*.deb | head -5]]

[[-c]] = contents: كل الملفات اللي هتتحط، بالمسار والصلاحيات. و [[head -5]] أول ٥:

~~~text الناتج
drwxr-xr-x root/root         0 2024-04-08 15:58 ./
drwxr-xr-x root/root         0 2024-04-08 15:58 ./usr/
drwxr-xr-x root/root         0 2024-04-08 15:58 ./usr/bin/
-rwxr-xr-x root/root     26856 2024-04-08 15:58 ./usr/bin/hello
drwxr-xr-x root/root         0 2024-04-08 15:58 ./usr/share/
dpkg-deb: error: tar subprocess was killed by signal (Broken pipe)
~~~

- [[./usr/bin/hello]]: المسار بيتحسب من [[/]]، يعني الملف هيتحط في [[/usr/bin/hello]]. و [[-rwxr-xr-x]] يعني قابل للتشغيل ([[x]])، و 26856 حجمه.
- آخر سطر مش مشكلة: [[head]] أخد ٥ سطور وقفل، فالأمر اللي قبله اتقطع عليه الـ pipe (Broken pipe). من غير [[| head]] الرسالة دي مبتظهرش.

---

## ٥. [[sudo apt install ./hello_*.deb]]

الـ [[./]] هي اللي بتقول لـ apt «ده ملف في الفولدر ده»، مش اسم حزمة يدوّر عليه في المستودعات. وميزة [[apt]] على [[dpkg -i]] إنه بيقرا [[Depends]] ويسطّب الناقص. (في الـ container كنا root فمحتاجناش [[sudo]].)

~~~text الناتج
Preparing to unpack .../hello_2.10-3build1_amd64.deb ...
Unpacking hello (2.10-3build1) ...
Setting up hello (2.10-3build1) ...
~~~

[[Unpacking]] = فك [[data.tar]] في [[/]]، و [[Setting up]] = تشغيل سكربتات الحزمة (لو فيه). ومن غير [[./]]:

~~~text الناتج
E: Unable to locate package hello_2.10-3build1_amd64.deb
~~~

---

## ٦. [[hello]]

~~~text الناتج
Hello, world!
~~~

و [[which hello]] قال [[/usr/bin/hello]]، نفس المسار اللي شفناه في [[dpkg-deb -c]].

---

## ٧. AppImage من غير [[chmod +x]]

عملنا ملف اسمه [[App.AppImage]] من غير صلاحية تشغيل وحاولنا نشغّله:

~~~text الناتج
./App.AppImage: Permission denied
~~~

و exit code كان 126 (يعني «لقيت الملف بس مش مسموحلي أشغّله»). لينكس بيشغّل حسب صلاحية [[x]] مش الامتداد، فأول خطوة مع أي AppImage: [[chmod +x App.AppImage]].

---

## الخلاصة

| الأمر | بيعمل إيه | محتاج sudo؟ |
|---|---|---|
| [[apt download pkg]] | ينزّل الـ [[.deb]] بس | لأ |
| [[dpkg-deb -I file.deb]] | البطاقة: النسخة والـ Depends | لأ |
| [[dpkg-deb -c file.deb]] | الملفات هتتحط فين | لأ |
| [[apt install ./file.deb]] | يسطّب ويجيب الـ dependencies | آه |
| [[apt remove pkg]] | يشيله بالاسم من [[Package]] | آه |

والـ [[.rpm]] نفس الفكرة على Fedora: [[rpm -qip file.rpm]] للمعلومات و [[rpm -qlp file.rpm]] للملفات (من الـ docs، مجربناهوش هنا).`,
          lines: [
            R`ينزّل [[.deb]] بتاع برنامج hello من مستودع Ubuntu من غير تسطيب.`,
            R`[[file]] بيعرف إنه حزمة Debian.`,
            R`المعلومات: الاسم والنسخة والمعمارية والـ dependencies.`,
            R`أول ملفات هتتحط فين.`,
            R`يسطّب (والـ [[./]] بتقول إنه ملف مش اسم حزمة).`,
            R`يشغّل البرنامج.`
          ],
          sol: R`الناتج الحقيقي (Ubuntu 24.04):
[[Fetched 26.0 kB in 1s (45.6 kB/s)]]
[[hello_2.10-3build1_amd64.deb: Debian binary package (format 2.0), with control.tar.zst, data compression zst]]
و [[dpkg-deb -I]] فيه:
[[Package: hello]]
[[Version: 2.10-3build1]]
[[Architecture: amd64]]
[[Depends: libc6 (>= 2.38)]]
و [[dpkg-deb -c]]:
[[drwxr-xr-x root/root 0 ... ./usr/bin/]]
[[-rwxr-xr-x root/root 26856 ... ./usr/bin/hello]]
وبعد التسطيب [[hello]] بيطبع [[Hello, world!]].

والـ AppImage من غير [[chmod +x]]: [[Permission denied]].`
        },
        {
          cmd: ".apk و .aab و .ipa",
          title: "ملفات تطبيقات الموبايل .apk و .aab و .ipa جواها إيه؟",
          desc: R`• [[.apk]] (Android Package): التطبيق الجاهز للتسطيب على Android. هو zip فيه:
  [[AndroidManifest.xml]]: الـ manifest (درس AndroidManifest)، بس متحوّل لـ XML binary.
  [[classes.dex]] (و [[classes2.dex]]...): الكود (Kotlin و Java) متحوّل لـ bytecode بتاع Android (Dalvik).
  [[res/]] و [[resources.arsc]]: الصور والـ layouts والنصوص.
  [[lib/arm64-v8a/*.so]]: مكتبات native لكل معالج (Flutter و React Native فيهم دول).
  [[assets/]]: ملفات خام (Flutter بيحط فيها الـ Dart المتحوّل والخطوط).
  [[META-INF/]]: التوقيع.
  بيتسطّب بـ [[adb install app.apk]] أو بفتحه على الموبايل (لازم تسمح «Install unknown apps»).
• [[.aab]] (Android App Bundle): الصيغة اللي بترفعها على Google Play دلوقتي (إجباري للتطبيقات الجديدة). مش بيتسطّب مباشرة: Google Play بيعمل منه APKs صغيرة لكل جهاز (بس الصور والمكتبات اللي الجهاز ده محتاجها). [[./gradlew bundleRelease]] بيعمله، و [[./gradlew assembleRelease]] بيعمل APK.
• [[.ipa]] (iOS App Store Package): تطبيق iOS. zip جواه فولدر [[Payload/App.app]]. مبيتسطّبش على أي آيفون إلا لو موقّع بشهادة Apple ومسموح للجهاز ده (TestFlight أو App Store أو Ad Hoc).
• [[.xapk]] و [[.apks]]: صيغ غير رسمية لمواقع التحميل. ابعد عنها.

التوقيع: كل APK لازم يتوقّع بمفتاح (keystore، درس [[.jks]]). Android بيرفض تحديث تطبيق بتوقيع مختلف عن النسخة المتسطّبة. عشان كده لو ضيّعت الـ keystore مش هتعرف تحدّث تطبيقك (Play App Signing بيحل ده لو مفعّل).

وتسطيب APK من مصدر مش معروف هو أشهر طريقة لنشر برامج التجسس على Android.`,
          example: R`file app-release.apk
unzip -l app-release.apk | tail -1
unzip -l app-release.apk | grep -E "AndroidManifest|classes.*dex|resources.arsc"
unzip -p app-release.apk AndroidManifest.xml | xxd -l 8
adb install app-release.apk`,
          try: R`لو عندك مشروع Android أو Flutter أو React Native: اعمل build ([[flutter build apk]] أو [[./gradlew assembleRelease]]) ونفّذ المثال على الـ APK الناتج (في [[build/app/outputs/flutter-apk/]] أو [[app/build/outputs/apk/]]). لو مفيش: أي APK عندك يمشي، أو حط [[.apk]] في [[unzip -l]] بس. ولو موبايلك متوصل بـ USB debugging جرّب [[adb install]].`,
          deep: {
            why: R`الموبايل محتاج ملف واحد فيه كل حاجة: الكود والصور والصلاحيات والتوقيع، عشان يتسطّب ويتأكد إنه من نفس المطور في كل تحديث. والـ zip كان أسهل اختيار. و [[.aab]] جه عشان الـ APK الواحد كان فيه صور ومكتبات لكل الأجهزة فبيبقى كبير.`,
            how: R`وقت الـ build، Gradle بيحوّل الكود لـ [[.dex]]، و AAPT2 بيحوّل الـ resources والـ manifest لصيغة binary، وبيحطهم في zip ويوقّعه بالـ keystore. والموبايل وقت التسطيب بيتأكد من التوقيع، ويقرا الـ manifest عشان الصلاحيات، ويحوّل الـ dex لكود المعالج (ART).`,
            when: R`لما تنزّل تطبيقك للتجربة على موبايل، أو ترفعه على Play (aab)، أو تفحص حجم التطبيق (Android Studio فيه Build ثم Analyze APK).`,
            mistakes: R`ترفع [[.apk]] على Play بدل [[.aab]]. تضيّع الـ keystore أو باسورده. تبعت APK الـ debug للعميل (أبطأ ومتوقّع بمفتاح debug). وتسطّب APK من مواقع تحميل عشان «نسخة مدفوعة ببلاش».`
          },
          teach: R`## المثال: APK ده zip، تعالى نفتحه

الأوامر بتثبت إن الـ APK أرشيف zip، وتعدّ اللي فيه، وتطلّع أهم ملفاته، وتبص على الـ manifest. جربناها في [[docker run --rm ubuntu:24.04]] على APK حقيقي: تطبيق F-Droid الرسمي (نزّلناه من [[https://f-droid.org/F-Droid.apk]] جوه الـ container وسمّيناه [[app-release.apk]])، حجمه 12537183 byte (حوالي ١٢ ميجا).

---

## ١. [[file app-release.apk]]

~~~text الناتج
app-release.apk: Android package (APK), with gradle app-metadata.properties
~~~

[[file]] شاف إنه zip، وبص جواه ولقى ملفات بتاعة Android فقال APK. و [[gradle app-metadata.properties]] ملف بيحطه Gradle (أداة الـ build في Android) فيه معلومات عن الـ build. وأول ٤ bytes في الملف ([[xxd -l 4]]) هي [[504b 0304]] = [[PK..]]، نفس بصمة أي zip.

---

## ٢. [[unzip -l app-release.apk | tail -1]]

- [[unzip -l]] = list: اعرض محتوى الـ zip من غير ما تفكه.
- [[| tail -1]]: آخر سطر بس، وهو سطر الإجمالي.

~~~text الناتج
 25551275                     973 files
~~~

٩٧٣ ملف، وحجمهم **بعد الفك** 25551275 byte (حوالي ٢٤ ميجا)، والـ APK نفسه ١٢ ميجا. يعني الضغط نزّله للنص تقريبًا.

---

## ٣. [[unzip -l ... | grep -E "AndroidManifest|classes.*dex|resources.arsc"]]

- [[grep -E]]: دوّر بـ regex موسّع، اللي فيه [[|]] معناها «أو».
- [[classes.*dex]]: [[classes]]، وبعدها [[.*]] (أي حروف، أو ولا حرف)، وبعدها [[dex]]. فبتطابق [[classes.dex]] و [[classes2.dex]] وأي رقم.

~~~text الناتج
  9295512  1981-01-01 01:01   classes.dex
  9622304  1981-01-01 01:01   classes2.dex
  1661772  1981-01-01 01:01   classes3.dex
    29980  1981-01-01 01:01   AndroidManifest.xml
  2057108  1981-01-01 01:01   resources.arsc
~~~

| الملف | فيه إيه |
|---|---|
| [[classes.dex]] و [[classes2.dex]] و [[classes3.dex]] | كود Kotlin و Java متحوّل لـ bytecode بتاع Android (DEX = Dalvik Executable). ملف الـ dex الواحد ليه حد أقصى ٦٥٥٣٦ دالة، فالتطبيقات الكبيرة بتتقسم كذا ملف (multidex) |
| [[AndroidManifest.xml]] | اسم التطبيق والصلاحيات والشاشات |
| [[resources.arsc]] | جدول الـ resources: النصوص والألوان، وكل اسم بيشاور على أنهي ملف |

والتاريخ [[1981-01-01]] مش حقيقي: أدوات الـ build بتثبّت التواريخ عشان نفس الكود يطلّع نفس الـ APK بالظبط (reproducible build).

وعدّينا الملفات حسب أول فولدر: [[res]] فيه 703 ملف (الصور والـ layouts)، و [[META-INF]] فيه 147 (التوقيع وبيانات المكتبات)، و [[assets]] 96، و [[lib]] 4 (مكتبات [[.so]] native لكل معالج).

---

## ٤. [[unzip -p app-release.apk AndroidManifest.xml | xxd -l 8]]

- [[unzip -p]] = pipe: فك ملف واحد واطبعه على الـ stdout بدل ما تكتبه على الديسك.
- [[xxd -l 8]]: أول ٨ bytes.

~~~text الناتج
00000000: 0300 0800 1c75 0000                      .....u..
~~~

لو كان XML نصي كان هيبدأ بـ [[<?xml]] أو [[<manifest]]. بس هنا [[0300]] (رقم 3 little-endian) = نوع الـ chunk «XML binary» في صيغة Android، و [[0800]] = حجم الـ header ٨ bytes، و [[1c75 0000]] = حجم الملف كله: [[0x751c]] = 29980، نفس الرقم اللي [[unzip -l]] قاله. يعني AAPT2 وقت الـ build حوّل الـ XML لصيغة binary أسرع في القراية على الموبايل. وعشان تقراه: Android Studio (Build ثم Analyze APK) أو [[aapt2 dump xmltree]].

---

## ٥. [[adb install app-release.apk]]

[[adb]] = Android Debug Bridge: أداة من Android SDK بتكلم موبايل متوصل بـ USB (و USB debugging مفعّل) أو محاكي. [[install]] بيبعت الـ APK ويسطّبه. محتاج موبايل، فمجربناهوش هنا: الناتج [[Performing Streamed Install]] ثم [[Success]] من docs بتاعة Android.

---

## الخلاصة

| الملف | بيتعمل بـ | بيتسطّب؟ |
|---|---|---|
| [[.apk]] | [[./gradlew assembleRelease]] أو [[flutter build apk]] | آه، مباشرة على الموبايل أو [[adb install]] |
| [[.aab]] | [[./gradlew bundleRelease]] | لأ، بترفعه على Google Play وهو يعمل APKs |
| [[.ipa]] | Xcode (Archive) | بس على أجهزة مسموحلها بالتوقيع |

والتلاتة zip من جوه، فـ [[unzip -l]] شغال عليهم كلهم.`,
          lines: [
            R`[[file]] بيعرف إنه APK.`,
            R`آخر سطر في ليستة الـ zip: الحجم الكلي وعدد الملفات.`,
            R`أهم ملفات جواه.`,
            R`الـ manifest جوه الـ APK binary: أول bytes مش [[<?xml]].`,
            R`يسطّبه على موبايل متوصل (USB debugging).`
          ],
          sol: R`على APK حقيقي لتطبيق React Native:
[[app-release.apk: Android package (APK), with gradle app-metadata.properties]]
[[ 15754197                     545 files]] (حوالي 15 ميجا و 545 ملف)
وفي الليستة: [[AndroidManifest.xml]] و [[classes.dex]] و [[classes2.dex]] و [[resources.arsc]]، وكمان فولدرات [[res/]] و [[lib/]] و [[assets/]] و [[META-INF/]].
[[00000000: 0300 0800 5033 0000                      ....P3..]]
يعني الـ manifest XML binary مش نص. (Android Studio و [[aapt2 dump xmltree]] بيرجّعوه مقروء.)
و [[adb install]] بيطبع [[Performing Streamed Install]] وبعدين [[Success]].`
        },
        {
          cmd: ".wasm",
          title: "ملف .wasm (WebAssembly) إيه، وبيتشغّل في المتصفح و Node إزاي؟",
          desc: R`[[.wasm]] (WebAssembly): صيغة binary لكود بيتشغّل في المتصفح (و Node و Deno) بسرعة قريبة من البرامج الـ native. مش بتكتبه بإيدك: بتكتب C أو C++ أو Rust أو Go وتعمله compile لـ [[.wasm]]، وبعدين JavaScript بيحمّله ويستخدم الدوال اللي فيه.

جواه إيه:
• أول ٤ bytes: [[00 61 73 6D]] يعني [[\0asm]]، وبعدها النسخة [[01 00 00 00]].
• أقسام (sections): أنواع الدوال، والدوال، والـ exports (اللي JS يقدر يناديه)، والكود.
• وله صيغة نصية للقراية اسمها WAT ([[.wat]]): [[(module (func (export "add") (param i32 i32) (result i32) local.get 0 local.get 1 i32.add))]].

هتقابله فين:
• مكتبات تقيلة شغالة في المتصفح: معالجة الصور والفيديو (ffmpeg.wasm)، وقواعد بيانات (SQLite و PGlite، والموقع ده نفسه بيستخدم PGlite لتمارين SQL!)، وضغط ملفات 3D (draco)، والخطوط (harfbuzz).
• Figma و Photoshop على الويب و Google Earth.
• أدوات JavaScript: esbuild و SWC ليهم نسخ wasm.
• بره المتصفح: Cloudflare Workers و WASI.

بيتحمّل إزاي:
• في المتصفح: [[WebAssembly.instantiateStreaming(fetch("add.wasm"))]]. والسيرفر لازم يبعته بـ [[Content-Type: application/wasm]] (درس MIME)، وإلا المتصفح بيرفض الـ streaming.
• في Node: [[WebAssembly.instantiate(await readFile("add.wasm"))]].
• وغالبًا المكتبة بتيجي بملف JS بيحمّل الـ wasm لوحده، وانت بتعمل [[import]] عادي.`,
          example: R`file add.wasm
xxd add.wasm
cat run-wasm.mjs
node run-wasm.mjs`,
          try: R`اعمل [[add.wasm]] بالـ bytes دي (ده module صغير فيه دالة [[add]]):
[[printf '\x00\x61\x73\x6d\x01\x00\x00\x00\x01\x07\x01\x60\x02\x7f\x7f\x01\x7f\x03\x02\x01\x00\x07\x07\x01\x03\x61\x64\x64\x00\x00\x0a\x09\x01\x07\x00\x20\x00\x20\x01\x6a\x0b' > add.wasm]]
واعمل [[run-wasm.mjs]] فيه: [[import { readFile } from "node:fs/promises";]] و [[const { instance } = await WebAssembly.instantiate(await readFile("add.wasm"));]] و [[console.log(instance.exports.add(2, 3));]]. نفّذ المثال. ودوّر في [[node_modules]] عندك: [[find node_modules -name "*.wasm" | head]].`,
          deep: {
            why: R`JavaScript سريع بس مش كفاية لحاجات زي تعديل فيديو أو محرك ألعاب، والمتصفح مكنش بيشغّل غير JS. WebAssembly اتعمل (2017) كصيغة صغيرة وآمنة وسريعة، أي لغة تقدر تتحول لها، وكل المتصفحات بتشغّلها في نفس الـ sandbox بتاع JS.`,
            how: R`المتصفح بيعمل validate للـ binary (أنواع ثابتة ومفيش وصول للذاكرة بره المساحة المسموحة)، وبعدين يحوّله لكود المعالج بسرعة. الـ wasm ميقدرش يلمس الـ DOM ولا الشبكة لوحده: بيعمل كده بس من خلال دوال JS بتتديله (imports). عشان كده هو آمن زي JS.`,
            when: R`مش هتكتبه غالبًا، بس هتستخدم مكتبات فيها wasm، وهتحتاج تظبط السيرفر يبعته صح، وتعرف ليه حجم الـ bundle كبير.`,
            mistakes: R`السيرفر بيبعت الـ [[.wasm]] بـ [[application/octet-stream]] فيطلعلك [[Incorrect response MIME type. Expected 'application/wasm']]. Vite أو webpack مش بينسخ الـ [[.wasm]] للـ build. وتفتكر إن wasm هيسرّع أي كود: لو الشغل كله DOM، JS أحسن.`
          },
          teach: R`## المثال: أصغر برنامج WebAssembly، byte byte

الملف [[add.wasm]] اللي في «جرّب» ٤١ byte بس، وفيه دالة واحدة اسمها [[add]] بتجمع رقمين. المثال بيتأكد إنه wasm، ويعرض الـ bytes، وبعدين JavaScript يحمّله وينادي الدالة. الـ [[file]] و [[xxd]] اتشغّلوا في [[docker run --rm ubuntu:24.04]]، و Node (نسخة 24) على ويندوز.

---

## ١. [[file add.wasm]]

~~~text الناتج
add.wasm: WebAssembly (wasm) binary module version 0x1 (MVP)
~~~

[[module]] هو اسم ملف wasm (زي ما JavaScript فيه modules). و [[version 0x1]] نسخة الصيغة، و [[MVP]] = Minimum Viable Product: النسخة الأولى من المعيار (2017)، ولسه هي رقم 1 لحد النهارده (المميزات الجديدة بتتضاف من غير ما الرقم يتغير).

---

## ٢. [[xxd add.wasm]]: نقرا الـ ٤١ byte

~~~text الناتج
00000000: 0061 736d 0100 0000 0107 0160 027f 7f01  .asm.......$__bt....
00000010: 7f03 0201 0007 0701 0361 6464 0000 0a09  .........add....
00000020: 0107 0020 0020 016a 0b                   ... . .j.
~~~

الملف بيتقسم كده: بصمة، ونسخة، وبعدين **sections**. كل section بيبدأ بـ byte رقمه (نوعه)، وبعده byte حجمه، وبعده المحتوى.

| الـ bytes | معناها |
|---|---|
| [[00 61 73 6d]] | البصمة: byte صفر، وبعده [[a]] [[s]] [[m]]. عشان كده [[xxd]] كاتب [[.asm]] |
| [[01 00 00 00]] | النسخة 1 (little-endian: الـ byte الصغير الأول) |
| [[01 07]] ... | section رقم 1 (**Type**)، حجمه 7 bytes |
| [[01 60 02 7f 7f 01 7f]] | نوع واحد: [[60]] = دالة، [[02]] بارامترين، [[7f 7f]] الاتنين [[i32]] (رقم صحيح 32-bit)، [[01 7f]] بترجّع [[i32]] واحد |
| [[03 02 01 00]] | section رقم 3 (**Function**): دالة واحدة من النوع رقم 0 |
| [[07 07]] ... | section رقم 7 (**Export**)، حجمه 7 |
| [[01 03 61 64 64 00 00]] | export واحد: اسمه ٣ حروف [[add]]، نوعه [[00]] (دالة)، ورقمها 0 |
| [[0a 09]] ... | section رقم 10 (**Code**)، حجمه 9 |
| [[01 07 00]] | جسم دالة واحدة، حجمه 7، ومفيهاش متغيرات محلية |
| [[20 00]] | [[local.get 0]]: هات البارامتر الأول |
| [[20 01]] | [[local.get 1]]: هات التاني |
| [[6a]] | [[i32.add]]: اجمعهم |
| [[0b]] | [[end]]: آخر الدالة، والنتيجة هي اللي فاضلة |

وبالصيغة النصية (WAT) نفس الملف هو:

~~~text add.wat
(module
  (func (export "add") (param i32 i32) (result i32)
    local.get 0
    local.get 1
    i32.add))
~~~

لاحظ إن الـ wasm **stack machine**: [[local.get]] بيحط قيمة على كومة (stack)، و [[i32.add]] بياخد آخر اتنين ويحط مجموعهم مكانهم.

---

## ٣. [[run-wasm.mjs]]: JavaScript بيحمّله

~~~text run-wasm.mjs
import { readFile } from "node:fs/promises";
const { instance } = await WebAssembly.instantiate(await readFile("add.wasm"));
console.log(instance.exports.add(2, 3));
~~~

- [[.mjs]]: ملف JavaScript بصيغة ES modules، عشان [[import]] و [[await]] في أول الملف يشتغلوا.
- [[readFile]] من [[node:fs/promises]]: بتقرا الملف كله كـ bytes (Buffer)، و [[await]] بتستنى لحد ما تخلص.
- [[WebAssembly.instantiate(bytes)]]: object جاهز في JavaScript. بيعمل حاجتين: يفحص الـ bytes ويحوّلها لكود معالج (compile)، وبعدين يعمل منها نسخة شغالة (instance). وبيرجّع object فيه [[module]] و [[instance]]، و [[{ instance }]] بتاخد [[instance]] بس (destructuring).
- [[instance.exports.add]]: الـ exports هي اللي شفناها في section 7، والـ [[add]] بقت دالة JavaScript عادية تناديها.

---

## ٤. [[node run-wasm.mjs]]

~~~text الناتج
5
~~~

الجمع حصل جوه الـ wasm مش في JavaScript. وجربنا كمان حاجتين يبينوا إن الأنواع حقيقية:

~~~text الناتج
add(2147483647, 1)  ←  -2147483648
add(2.9, "4")       ←  6
~~~

- [[2147483647]] أكبر رقم يدخل في [[i32]]، فلما زودنا 1 لفّ للسالب (overflow). JavaScript العادي كان هيطبع 2147483648.
- [[2.9]] اتحوّلت لـ 2 و [["4"]] (نص) اتحوّلت لـ 4 قبل ما تدخل، لأن الدالة نوعها [[i32]] بس.

و [[WebAssembly.Module.imports]] على الملف ده رجّعت [[[]]] (ليستة فاضية): الـ module مش طالب أي حاجة من JavaScript. والـ wasm الحقيقي (زي PGlite) بيطلب imports كتير، لأنه ميقدرش يلمس ملفات ولا شبكة ولا DOM غير من خلال دوال JavaScript بتتديله.

---

## الخلاصة

| الحاجة | فين في الملف |
|---|---|
| البصمة [[\0asm]] والنسخة | أول ٨ bytes |
| شكل الدوال | Type section (1) |
| أسامي اللي JavaScript يشوفه | Export section (7) |
| الكود نفسه | Code section (10)، أوامر [[local.get]] و [[i32.add]] |
| التحميل | [[WebAssembly.instantiate(bytes)]] ثم [[instance.exports]] |

وفي المتصفح نفس الكلام بـ [[WebAssembly.instantiateStreaming(fetch("add.wasm"))]]، والسيرفر لازم يبعته بـ [[Content-Type: application/wasm]].`,
          lines: [
            R`[[file]] بيعرف الـ module والنسخة.`,
            R`أول ٤ bytes [[0061 736d]] يعني [[\0asm]]، وكلمة [[add]] باينة في الـ exports.`,
            R`كود JS بيقرا الملف ويعمله instantiate وينادي [[add]].`,
            R`النتيجة جاية من دالة WebAssembly.`
          ],
          sol: R`الناتج الحقيقي:
[[add.wasm: WebAssembly (wasm) binary module version 0x1 (MVP)]]
[[00000000: 0061 736d 0100 0000 0107 0160 027f 7f01  .asm.......$__bt....]]
[[00000010: 7f03 0201 0007 0701 0361 6464 0000 0a09  .........add....]]
[[00000020: 0107 0020 0020 016a 0b                   ... . .j.]]
[[5]]

الملف كله ٤١ byte: فيه دالة بتجمع رقمين ([[6a]] هي [[i32.add]]). وفي مشروع Next أو Vite كبير هتلاقي ملفات زي [[hb.wasm]] (خطوط) أو [[draco_decoder.wasm]] (3D).`
        }
      ]
    }
]);
