// تكملة تاب apps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/apps/01.js (شرح حقول الدرس في أوله)
MORE("apps", [
    {
      t: "Electron: برنامج .exe",
      l: 2,
      n: "تغلّف التطبيق لبرنامج يتسطّب أو يتنسخ على فلاشة",
      items: [
        {
          cmd: "electron-builder",
          title: "اعمل installer لويندوز",
          desc: R`[[electron-builder]] بياخد Electron نفسه، ويغيّر اسمه لاسم برنامجك، ويحط الكود بتاعك جوه ملف [[app.asar]]، ويطلّع installer. [[--win nsis]] بيعمل Setup.exe عادي، و [[--win portable]] exe واحد يشتغل من غير تسطيب.

الإعدادات في package.json تحت [[build]]: الـ appId، وأنهي ملفات تدخل، وفولدر الناتج.`,
          example: R`npm install --save-dev electron-builder
npm run build
npx electron-builder --win nsis
npx electron-builder --win portable
ls release
npx @electron/asar list release/win-unpacked/resources/app.asar`,
          try: "اعمل installer، وسطّبه، ودوّر على البرنامج في قايمة Start. وبعدين افتح [[release/win-unpacked]] وشغّل الـ exe منه على طول.",
          deep: {
            why: "المستخدم مش هيعمل npm install. محتاج ملف يدوس عليه مرتين ويلاقي البرنامج في قايمة Start وله أيقونة و uninstall.",
            how: R`الإعدادات في package.json مثلًا: [[appId]]، و [[directories.output: "release"]]، و [[files]] وهي قايمة زي [[main.js]] و [[preload.js]] و [[dist/**]]. الـ files بيحدد إيه اللي يدخل البرنامج، والـ devDependencies مش بتدخل لوحدها.

ليه release مش dist؟ لأن الافتراضي بتاع electron-builder هو dist، ونفس الاسم Vite بيبني فيه الواجهة، فالاتنين يدوسوا على بعض.

الناتج: [[win-unpacked]] فولدر البرنامج جاهز (للتجربة السريعة)، و [[Setup.exe]] من nsis بيسطّب في AppData وبيعمل اختصار و uninstaller، و portable exe واحد بيفك نفسه في فولدر مؤقت كل مرة يشتغل (أبطأ في الفتح).

الـ [[app.asar]] ملف أرشيف زي zip من غير ضغط، و Electron بيقراه كأنه فولدر. بيخلي النسخ والقراية أسرع، وبيخبّي شكل الملفات شوية، بس مش تشفير: أي حد يقدر يفكه بـ [[npx @electron/asar extract]]. و [[asar list]] بيوريك إيه اللي دخل فعلًا.

بناء nsis من لينكس محتاج wine، فالأسهل تبني على ويندوز أو في CI على [[windows-latest]]. ومن غير توقيع رقمي (شهادة code signing)، ويندوز هيطلّع تحذير SmartScreen «Windows protected your PC» لحد ما البرنامج ياخد سمعة.`,
            when: "أي برنامج هيوصل لحد غيرك.",
            mistakes: R`ملف [[.env]] فيه مفاتيح دخل جوه البرنامج لأن files مش محدد: أي حد يفك الـ asar يشوفه. وفي مشروع حقيقي كان electron-builder متسطّب ومتعرّف له scripts، وجنبه سكربت PowerShell بيغلّف بإيده، فمحدش عارف أنهي نسخة اللي اتوزعت. اختار طريقة واحدة. ومكتبة تقيلة في dependencies بدل devDependencies فالبرنامج يتقل ١٠٠ ميجا.`
          },
          teach: R`## الفكرة

المستخدم مش هيعمل [[npm install]]. محتاج ملف يدوس عليه مرتين. [[electron-builder]] بياخد Electron نفسه، ويغيّر اسمه لاسم برنامجك، ويحط كودك جنبه، ويطلّع **installer** (برنامج تسطيب) أو exe واحد.

جربت كل الأوامر على ويندوز ١١ في PowerShell 7، بـ electron-builder 26.15.3 و Electron 44.6.0. ما سطّبتش الـ installer نفسه عشان مغيّرش حاجة على الجهاز.

---

## ٠. الإعدادات في package.json

قبل الأوامر، electron-builder بيقرا خانة [[build]] من [[package.json]]:

~~~text package.json
"build": {
  "appId": "com.example.myapp",
  "directories": { "output": "release" },
  "files": ["main.js", "preload.js", "dist/**"]
}
~~~

| الخانة | معناها |
|---|---|
| [[appId]] | هوية البرنامج عند ويندوز (دومين معكوس زي Capacitor) |
| [[directories.output]] | فولدر الناتج. الافتراضي [[dist]]، وده نفس فولدر Vite فيدوسوا على بعض، عشان كده [[release]] |
| [[files]] | الملفات اللي تدخل البرنامج بس. و [[dist/**]] يعني فولدر dist وكل اللي جواه مهما كان عميق |

## ١. [[npm install --save-dev electron-builder]]

بيسطّب الأداة كـ devDependency، لأنها بتشتغل وقت البناء بس.

## ٢. [[npm run build]]

بيبني الواجهة في [[dist]] (بـ [[vite build]]). لازم قبل التغليف، وإلا البرنامج هيتغلّف بواجهة قديمة أو من غير واجهة.

## ٣. [[npx electron-builder --win nsis]]

[[--win]] يعني ابني لويندوز، و [[nsis]] نوع الـ installer. NSIS (Nullsoft Scriptable Install System) برنامج مجاني بيعمل installers، وكتير من برامج ويندوز معمولة بيه.

~~~text الناتج (السطور المهمة)
• electron-builder  version=26.15.3 os=10.0.26300
• loaded configuration  file=package.json ("build" field)
• description is missed in the package.json
• packaging       platform=win32 arch=x64 electron=44.6.0 appOutDir=release\win-unpacked
• default Electron icon is used  reason=application icon is not set
• signing with signtool.exe  path=release\win-unpacked\myapp.exe
• building        target=nsis file=release\myapp Setup 1.0.0.exe archs=x64 oneClick=true perMachine=false
• downloaded      label=nsis-3.0.4.1.7z progress=100%
• building block map  blockMapFile=release\myapp Setup 1.0.0.exe.blockmap
~~~

نقرا الناتج:

| السطر | معناه |
|---|---|
| [[loaded configuration ... "build" field]] | قرا الإعدادات من خانة [[build]] |
| [[description is missed]] | تحذير بس: مفيش [[description]] في package.json |
| [[packaging ... arch=x64]] | بيعمل نسخة لويندوز 64 بت في [[release\win-unpacked]] |
| [[default Electron icon is used]] | مفيش أيقونة، فالبرنامج بأيقونة Electron |
| [[signing with signtool.exe]] | بيحاول يوقّع، بس من غير شهادة مفيش توقيع فعلًا |
| [[oneClick=true perMachine=false]] | installer بضغطة واحدة، وبيسطّب لليوزر الحالي بس (من غير صلاحيات أدمن) |
| [[downloaded label=nsis...]] | أول مرة بينزّل NSIS نفسه |
| [[blockmap]] | ملف بيساعد التحديث التلقائي ينزّل الأجزاء اللي اتغيرت بس |

وعشان أتأكد من التوقيع سألت ويندوز:

~~~powershell
(Get-AuthenticodeSignature "release\myapp Setup 1.0.0.exe").Status
~~~

~~~text الناتج
NotSigned
~~~

يعني مش موقّع، فويندوز هيطلّع تحذير SmartScreen «Windows protected your PC» عند المستخدم. التوقيع محتاج شهادة code signing بتتشترى.

## ٤. [[npx electron-builder --win portable]]

[[portable]] يعني exe واحد يشتغل من غير تسطيب (ينفع على فلاشة). كل مرة بيشتغل بيفك نفسه في فولدر مؤقت، فبيفتح أبطأ شوية.

~~~text الناتج
• building        target=portable file=release\myapp 1.0.0.exe archs=x64
~~~

## ٥. [[ls release]]

~~~text الناتج (من غير عمود التاريخ)
Mode     Length     Name
----     ------     ----
d----               win-unpacked
-a---    6495       builder-debug.yml
-a---    100068226  myapp 1.0.0.exe
-a---    111309584  myapp Setup 1.0.0.exe
-a---    117612     myapp Setup 1.0.0.exe.blockmap
~~~

| الملف | هو إيه |
|---|---|
| [[win-unpacked]] | البرنامج مفكوك: [[myapp.exe]] وجنبه ملفات Electron. شغّله على طول للتجربة السريعة |
| [[myapp Setup 1.0.0.exe]] | الـ installer (حوالي ١٠٦ ميجا) |
| [[myapp 1.0.0.exe]] | الـ portable (حوالي ٩٥ ميجا) |
| [[builder-debug.yml]] | الإعدادات النهائية اللي استخدمها، للـ debugging |

الأرقام بالـ byte: [[111309584 / 1MB]] تقريبًا ١٠٦. حجم كبير لبرنامج فيه سطرين؟ أيوه، لأن جواه Chromium و Node كاملين.

وجوه [[win-unpacked\resources]]:

~~~text الناتج
Name        Length
----        ------
app.asar      1867
elevate.exe 107520
~~~

كودك كله في [[app.asar]] (١٨٦٧ byte بس). و [[elevate.exe]] أداة صغيرة بيستخدمها لو احتاج صلاحيات أدمن.

## ٦. [[npx @electron/asar list release/win-unpacked/resources/app.asar]]

[[asar]] أرشيف زي zip بس من غير ضغط، و Electron بيقراه كأنه فولدر. و [[list]] بيعرض اللي جواه:

~~~text الناتج
\dist
\dist\index.html
\main.js
\package.json
\preload.js
~~~

ده بالظبط اللي في [[files]] + [[package.json]] (بيدخل لوحده). مفيش [[node_modules]] ولا [[.env]] ولا [[src]]. وده أهم سبب تشغّل الأمر ده: تتأكد إن مفيش ملف سري دخل.

> الـ asar مش تشفير: [[npx @electron/asar extract]] بيفكه لأي حد.

---

## الخلاصة

| الخطوة | الأمر | الناتج |
|---|---|---|
| ١ | [[npm install --save-dev electron-builder]] | الأداة |
| ٢ | [[npm run build]] | الواجهة في [[dist]] |
| ٣ | [[npx electron-builder --win nsis]] | [[myapp Setup 1.0.0.exe]] |
| ٤ | [[npx electron-builder --win portable]] | [[myapp 1.0.0.exe]] |
| ٥ | [[ls release]] | تشوف الناتج |
| ٦ | [[asar list]] | تتأكد إيه اللي دخل |

البرنامج = Electron متغيّر اسمه + [[resources\app.asar]] فيه كودك. وبناء نسخة ويندوز أسهل على ويندوز أو في CI على [[windows-latest]].`,
          lines: [
            "سطّب أداة التغليف.",
            "ابني الواجهة الأول.",
            "installer عادي لويندوز.",
            "exe واحد من غير تسطيب.",
            "شوف الناتج.",
            "إيه اللي دخل جوه app.asar فعلًا."
          ],
          sol: R`[[npx electron-builder --win nsis]] بيطلّع فولدر [[release/]] فيه installer اسمه زي [[myapp Setup 1.0.0.exe]]. بعد ما تسطّبه هتلاقي البرنامج في قايمة Start وأيقونة على سطح المكتب. [[--win portable]] بيطلّع [[.exe]] واحد بيشتغل من غير تسطيب.

في [[release/win-unpacked]] هتلاقي التطبيق «مفكوك»: [[myapp.exe]] وجنبه [[resources/app.asar]]. الـ [[.exe]] ده بيشتغل على طول من غير installer، مفيد للتجربة السريعة. و [[@electron/asar list]] بيوريك ملفاتك (main.js و index.html...) متجمّعة جوه الـ asar (من غير ضغط)، فأي حد يقدر يفكها، يعني الكود مش سري.

مهم: بناء نسخة ويندوز لازم يتعمل على ويندوز (أو Linux + Wine)، ونسخة الماك لازم على ماك للتوقيع. وأول مرة electron-builder بينزّل ملفات كبيرة، فمحتاج نت. (جربت البناء على ويندوز ١١: طلع [[myapp Setup 1.0.0.exe]] و [[myapp 1.0.0.exe]] (الـ portable)، والاتنين حوالي ١٠٠ ميجا. ما سطّبتش الـ installer نفسه عشان مغيّرش حاجة على الجهاز.)`
        },
        {
          cmd: "build-exe.ps1",
          title: "الـ exe من جوه: تغليف بإيدك",
          desc: "عشان تفهم electron-builder بيعمل إيه: الـ exe بتاع أي برنامج Electron هو [[electron.exe]] نفسه متغيّر اسمه، والكود بتاعك قاعد في [[resources\\app]]. السكربت ده بيعمل كده بإيده بـ PowerShell: ينسخ Electron، يغيّر الاسم، يحط الملفات، ويغيّر الأيقونة.",
          example: R`# build-exe.ps1: يطلّع dist\myapp\myapp.exe
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot
if (-not (Test-Path "node_modules\electron\dist\electron.exe")) {
  npm ci
  if ($LASTEXITCODE -ne 0) { throw "npm ci failed" }
}
$out = "dist\myapp"
if (Test-Path $out) { Remove-Item $out -Recurse -Force }
New-Item -ItemType Directory -Force $out | Out-Null
Copy-Item "node_modules\electron\dist\*" $out -Recurse -Force
Rename-Item "$out\electron.exe" "myapp.exe"
$app = "$out\resources\app"
New-Item -ItemType Directory -Force $app | Out-Null
Copy-Item "main.js", "preload.js", "index.html", "icon.png" $app -Force
[IO.File]::WriteAllText("$PWD\$app\package.json", '{ "name": "myapp", "version": "1.0.0", "main": "main.js" }')
node -e "require('rcedit').rcedit('dist/myapp/myapp.exe',{icon:'icon.ico'}).catch(e=>{console.error(e.message);process.exit(1)})"
if ($LASTEXITCODE -ne 0) { throw "rcedit failed" }
Write-Host "Done: $out\myapp.exe" -ForegroundColor Green`,
          try: "شغّل السكربت على مشروع تجربة، وافتح [[dist\\myapp\\resources\\app]] وشوف ملفاتك زي ما هي. وبعدين جرّب تمسح package.json اللي هناك وشغّل الـ exe: هيفتح شاشة Electron الافتراضية.",
          flag: "script",
          deep: {
            why: "electron-builder صندوق أسود لحد ما حاجة تبوظ. لما تعرف إن البرنامج كله «Electron + فولدر فيه كودك»، أي مشكلة في التغليف هتعرف تدوّر عليها فين.",
            how: R`الـ electron.exe برنامج عام. لما يشتغل بيدوّر جنبه على [[resources\app.asar]] أو فولدر [[resources\app]]، ويقرا package.json اللي فيه، ويشغّل الملف اللي في main. لو ملقاش حاجة، بيفتح شاشة Electron الافتراضية.

فالتغليف: انسخ فولدر Electron كله، غيّر اسم الـ exe، وحط ملفاتك مع package.json صغير في resources\app. ده بالظبط اللي electron-builder بيعمله، وبيزوّد عليه asar والـ installer والتوقيع.

[[$ErrorActionPreference = "Stop"]] بيخلي أي خطأ في أوامر PowerShell يوقف السكربت. بس الأوامر الخارجية (npm و node) مش بتتأثر بيه، عشان كده بعدها [[$LASTEXITCODE]] بإيدك.

[[WriteAllText]] بيكتب UTF-8 من غير BOM. [[Out-File -Encoding utf8]] في PowerShell 5.1 بيحط BOM في أول الملف، وده حرف مخفي ممكن يبوّظ قراية JSON في أدوات كتير.

[[rcedit]] (npm install --save-dev rcedit) بيغيّر أيقونة الـ exe وبياناته. من غيره البرنامج بأيقونة Electron.`,
            when: "برنامج داخلي بسيط تنسخه على فلاشة. أو عشان تفهم التغليف. لغير كده electron-builder.",
            mistakes: R`في مشروع حقيقي السكربت ده كان بيعتمد على ErrorActionPreference بس، فلما npm install فشل كمّل عادي وطلّع برنامج ناقص. والحل [[$LASTEXITCODE]] بعد كل أمر خارجي. وكان بيستخدم npm install بدل [[npm ci]] فالنسخ بتتغير من build للتاني. ومن غير asar كودك مقروء لأي حد يفتح الفولدر، ومن غير توقيع SmartScreen هيحذّر.`
          },
          teach: R`## الفكرة

أي برنامج Electron من جوه = **[[electron.exe]] متغيّر اسمه** + **فولدر فيه كودك** اسمه [[resources\app]]. السكربت ده بيعمل ده بإيده عشان تشوف إن مفيش سحر: ينسخ Electron، يغيّر اسمه، يحط ملفاتك، ويغيّر الأيقونة.

جربته على ويندوز ١١ مرتين: في PowerShell 7 ([[pwsh]]) وفي Windows PowerShell 5.1، والاتنين اشتغلوا من فولدر تاني غير فولدر السكربت.

---

## ١. التجهيز (السطور ١ إلى ٦)

~~~powershell
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot
~~~

- [[$ErrorActionPreference]] متغير بيحدد PowerShell يعمل إيه لما أمر يفشل. الافتراضي [[Continue]]: يطبع الخطأ ويكمّل. و [[Stop]] يوقف السكربت كله.
- [[$PSScriptRoot]] متغير جاهز فيه **فولدر السكربت نفسه**. و [[Set-Location]] (زي [[cd]]) بيروح له، فالمسارات النسبية اللي جاية تشتغل مهما شغّلت السكربت منين.

~~~powershell
if (-not (Test-Path "node_modules\electron\dist\electron.exe")) {
  npm ci
  if ($LASTEXITCODE -ne 0) { throw "npm ci failed" }
}
~~~

- [[Test-Path]] بيرجّع [[True]] لو الملف موجود. و [[-not]] بيعكسها. يعني: لو Electron مش متسطّب...
- [[npm ci]] بيسطّب النسخ اللي في [[package-lock.json]] بالظبط (ci من clean install). أضمن من [[npm install]] اللي ممكن يحدّث نسخ.
- [[$LASTEXITCODE]] رقم خروج آخر برنامج خارجي: [[0]] نجح، غيره فشل. و [[-ne]] يعني «مش بيساوي» (not equal).
- [[throw]] بيرمي خطأ يوقف السكربت.

> ليه [[$LASTEXITCODE]] لو عندنا [[Stop]]؟ لأن [[Stop]] بيأثر على أوامر PowerShell بس ([[Copy-Item]] و [[Remove-Item]]...). أما [[npm]] و [[node]] برامج خارجية، ولو فشلوا PowerShell بيكمّل عادي. فلازم تشيّك بإيدك.

## ٢. فولدر الناتج (السطور ٧ إلى ٩)

~~~powershell
$out = "dist\myapp"
if (Test-Path $out) { Remove-Item $out -Recurse -Force }
New-Item -ItemType Directory -Force $out | Out-Null
~~~

- [[$out]] متغير فيه المسار، عشان منكتبوش كل مرة.
- [[Remove-Item -Recurse -Force]] بيمسح الفولدر القديم بكل اللي جواه ([[-Recurse]])، حتى الملفات اللي للقراية بس ([[-Force]]). كده كل build بيبدأ نضيف.
- [[New-Item -ItemType Directory]] بيعمل فولدر. و [[| Out-Null]] بيرمي الناتج بتاعه عشان الشاشة متتملاش.

## ٣. انسخ Electron وغيّر اسمه (السطور ١٠ و ١١)

~~~powershell
Copy-Item "node_modules\electron\dist\*" $out -Recurse -Force
Rename-Item "$out\electron.exe" "myapp.exe"
~~~

[[node_modules\electron\dist]] فيه Electron كامل لويندوز: [[electron.exe]] وملفات Chromium. و [[*]] يعني كل اللي جواه. وبعدين [[Rename-Item]] بيغيّر اسم الـ exe. و [[$out\electron.exe]] بين علامات تنصيص مزدوجة، فـ PowerShell بيحط قيمة [[$out]] مكانها.

## ٤. حط كودك (السطور ١٢ إلى ١٥)

~~~powershell
$app = "$out\resources\app"
New-Item -ItemType Directory -Force $app | Out-Null
Copy-Item "main.js", "preload.js", "index.html", "icon.png" $app -Force
[IO.File]::WriteAllText("$PWD\$app\package.json", '{ "name": "myapp", "version": "1.0.0", "main": "main.js" }')
~~~

لما [[myapp.exe]] يشتغل، بيدوّر جنبه على [[resources\app]] (أو [[resources\app.asar]])، ويقرا [[package.json]] اللي فيه، ويشغّل الملف اللي في [[main]]. فبنعمل الفولدر، وننسخ ملفاتنا (الفاصلة بين الأسامي معناها قايمة)، ونكتب [[package.json]] صغير.

### ليه [[[IO.File]::WriteAllText]] مش [[Out-File]]؟

[[[IO.File]]] class من .NET (المكتبة اللي PowerShell مبني عليها)، و [[::]] بينادي دالة على الـ class نفسه. و [[WriteAllText]] بيكتب UTF-8 **من غير BOM** في الاتنين. أما [[Out-File -Encoding utf8]] في PowerShell 5.1 بيحط BOM: ٣ bytes مخفية في أول الملف. جربتهم:

~~~text Out-File -Encoding utf8 في PowerShell 5.1
00000000   EF BB BF 7B 7D 0D 0A        ï»¿{}..
~~~

~~~text package.json اللي WriteAllText كتبه
7B 20 22 6E 61 6D 65 22 ...   { "name"...
~~~

[[EF BB BF]] هي الـ BOM، والملف التاني بيبدأ على طول بـ [[7B]] (يعني [[{]]). أدوات كتير بتقرا JSON بترفض الـ BOM. و [[$PWD]] الفولدر الحالي، والمسار لازم يبقى كامل لأن .NET مش بيعرف [[Set-Location]] بتاع PowerShell.

> لو [[main.js]] بتاعك هو بتاع درس [[main.js]] (بيحمّل [[dist/index.html]] في البرنامج المتغلّف)، انسخ فولدر [[dist]] بدل [[index.html]]. السكربت هنا لـ main.js بيحمّل [[index.html]] اللي جنبه.

## ٥. الأيقونة (السطور ١٦ و ١٧)

~~~powershell
node -e "require('rcedit').rcedit('dist/myapp/myapp.exe',{icon:'icon.ico'}).catch(e=>{console.error(e.message);process.exit(1)})"
if ($LASTEXITCODE -ne 0) { throw "rcedit failed" }
~~~

[[node -e]] بيشغّل كود JavaScript مكتوب في الأمر نفسه. و [[rcedit]] مكتبة ([[npm install --save-dev rcedit]]) بتعدّل الـ **resources** جوه ملف exe: الأيقونة واسم الشركة والنسخة. والنسخة الحالية (5.0.2) بتصدّر دالة اسمها [[rcedit]]، عشان كده [[require('rcedit').rcedit]].

الدالة بترجّع Promise، و [[.catch]] بيمسك الخطأ لو حصل: يطبعه ويخرج بـ [[process.exit(1)]]، فـ [[$LASTEXITCODE]] يبقى ١ والسكربت يوقف. والأيقونة لازم [[.ico]] (صيغة أيقونات ويندوز)، مش png.

## ٦. [[Write-Host "Done: ..." -ForegroundColor Green]]

[[Write-Host]] بيطبع على الشاشة، و [[-ForegroundColor Green]] لون الكلام.

---

## التشغيل

~~~powershell
pwsh -NoProfile -File .\exeproj\build-exe.ps1
~~~

~~~text الناتج
Done: dist\myapp\myapp.exe
~~~

[[-File]] بيشغّل ملف سكربت، و [[-NoProfile]] من غير إعداداتك الشخصية. وفي Windows PowerShell 5.1 ([[powershell]]) نفس الناتج، بس ممكن تحتاج [[-ExecutionPolicy Bypass]] لو الجهاز مانع السكربتات.

اللي في [[resources\app]] بعدها:

~~~text الناتج
Name         Length
----         ------
icon.png        839
index.html      118
main.js         426
package.json     58
preload.js       29
~~~

ملفاتك زي ما هي، نص عادي أي حد يقدر يفتحه. والبرنامج كله ٣٦٨ ميجا، تقريبًا كلهم Electron.

### التجربة: امسح [[package.json]]

شلت [[package.json]] من [[resources\app]] وشغّلت [[myapp.exe]]: النافذة اللي فتحت كان عنوانها [[Electron]]. ده الـ **default app**: Electron ملقاش تطبيق، فشغّل الشاشة الافتراضية من [[resources\default_app.asar]] (ملف بييجي مع Electron). يعني الـ exe هو Electron نفسه، و [[resources\app]] هو برنامجك.

---

## الخلاصة

| الخطوة | السطور | بتعمل إيه |
|---|---|---|
| ١ | [[Stop]] و [[$PSScriptRoot]] و [[npm ci]] | جهّز ووقّف عند أي خطأ |
| ٢ | [[Remove-Item]] و [[New-Item]] | فولدر ناتج نضيف |
| ٣ | [[Copy-Item]] و [[Rename-Item]] | Electron باسم برنامجك |
| ٤ | [[resources\app]] و [[WriteAllText]] | كودك + package.json من غير BOM |
| ٥ | [[rcedit]] | الأيقونة |

electron-builder بيعمل نفس الخطوات دي، وبيزوّد عليها asar والـ installer والتوقيع.`,
          lines: [
            "أي خطأ في أوامر PowerShell يوقف السكربت.",
            "اشتغل من فولدر السكربت نفسه.",
            "لو Electron مش متسطّب...",
            "...سطّب بالنسخ اللي في الـ lock.",
            "...ولو فشل وقّف (npm مش بيتأثر بـ Stop).",
            "نهاية الشرط.",
            "فولدر الناتج.",
            "امسح الناتج القديم لو موجود.",
            "واعمله من جديد.",
            "انسخ Electron كله.",
            "غيّر اسم الـ exe لاسم برنامجك.",
            "فولدر الكود جوه resources.",
            "اعمله.",
            "انسخ ملفاتك فيه.",
            "package.json صغير بيقول ابدأ من main.js (من غير BOM).",
            "غيّر أيقونة الـ exe.",
            "ولو فشل وقّف.",
            "خلصنا."
          ],
          sol: R`السكربت ده هو electron-builder بإيدك عشان تفهم إن الـ exe مجرد نسخة Electron + ملفاتك. بعد ما يشتغل هتلاقي [[dist\myapp\myapp.exe]] وجنبه [[resources\app\]] وفيه [[main.js]] و [[preload.js]] و [[index.html]] و [[package.json]] زي ما هم نص عادي، مش مشفّرين.

لو مسحت [[package.json]] اللي في [[resources\app]] وشغّلت الـ exe، Electron مش هيلاقي [[main]] فهيفتح الشاشة الترحيبية الافتراضية بتاعة Electron بدل تطبيقك. ده بيثبتلك إن الـ exe نفسه هو Electron، والـ [[resources\app]] هو تطبيقك.

الفكرة اللي تطلع بيها: الـ .exe مش بيخبّي كودك. لو عايز حماية للكود استخدم asar (مش تشفير حقيقي) أو احتفظ بالمنطق الحساس على السيرفر. (جربت السكربت على ويندوز ١١ في PowerShell 7 و Windows PowerShell 5.1: الاتنين طبعوا [[Done: dist\myapp\myapp.exe]]، والبرنامج فتح الواجهة. ولما شلت [[package.json]] من [[resources\app]]، النافذة اللي فتحت كان عنوانها [[Electron]]: الشاشة الافتراضية.)`
        },
        {
          cmd: "app.isPackaged",
          title: "الإعدادات في النسخة المتغلّفة",
          desc: "في النسخة المتغلّفة مفيش .env، والفولدر الحالي مش فولدر مشروعك، و app.asar للقراية بس. فالإعدادات اللي المستخدم يغيّرها تتحط في [[app.getPath('userData')]]، والملفات اللي مع البرنامج تتقري من [[process.resourcesPath]]، و .env للتطوير بس.",
          example: R`const { app } = require('electron');
const path = require('path');
const fs = require('fs');

if (!app.isPackaged) require('dotenv').config();
const file = path.join(app.getPath('userData'), 'config.json');
if (!fs.existsSync(file)) {
  fs.writeFileSync(file, JSON.stringify({ apiUrl: 'https://api.example.com' }, null, 2));
}
const config = JSON.parse(fs.readFileSync(file, 'utf8'));
const apiUrl = process.env.API_URL || config.apiUrl;
const base = app.isPackaged ? process.resourcesPath : __dirname;
const logo = path.join(base, 'assets', 'logo.png');`,
          try: "اطبع [[app.getPath('userData')]] في main.js وافتح الفولدر ده. على ويندوز هتلاقيه في [[%APPDATA%]] باسم برنامجك.",
          flag: "script",
          deep: {
            why: "البرنامج شغال تمام وانت بتطوّر، وعند المستخدم بيقول ENOENT أو مش لاقي الإعدادات. السبب دايمًا حاجة من التلاتة: مسار نسبي، أو كتابة جوه البرنامج، أو .env مش موجود.",
            how: R`[[app.isPackaged]] بيفرّق بين التطوير والنسخة المتغلّفة. [[dotenv]] بيتحمّل وانت بتطوّر بس.

[[app.getPath('userData')]] فولدر خاص ببرنامجك يقدر يكتب فيه: [[%APPDATA%\myapp]] على ويندوز، و [[~/.config/myapp]] على لينكس. هنا الإعدادات والكاش وقاعدة SQLite لو فيه. المسح والتحديث مش بيلمسوه، فالإعدادات بتفضل بعد التحديث.

الكتابة جوه فولدر البرنامج مش هتنفع: app.asar للقراية بس، و Program Files محتاج صلاحيات أدمن.

[[process.resourcesPath]] هو فولدر resources جنب الـ exe. الملفات اللي بتحددها في [[extraResources]] في إعدادات electron-builder بتتنسخ هناك بره الـ asar، مفيدة لصور أو برامج تانية البرنامج بيشغّلها.

والأهم: أي مفتاح API جوه برنامج ديسكتوب مش سر. الملف عند المستخدم، ويقدر يفكه. المفاتيح الحقيقية تفضل على سيرفرك، والبرنامج يكلّم سيرفرك.`,
            when: "أول ما البرنامج يحتاج إعدادات أو يقرا ملف جنبه.",
            mistakes: R`قراية [[fs.readFileSync('data.json')]] بمسار نسبي: عندك الفولدر الحالي هو المشروع، وعند المستخدم ممكن يبقى System32. وفي مشروع حقيقي كان التغليف بـ electron-packager بيستخدم [[--ignore="^/\.env$"]] عشان يستبعد .env، ومن غيره الملف بمفاتيحه كان هيتشحن جوه البرنامج لكل الناس.`
          },
          teach: R`## المشكلة

البرنامج شغال تمام عندك، وعند المستخدم بيقول [[ENOENT]] (يعني الملف مش موجود) أو مش لاقي الإعدادات. السبب إن ٣ حاجات بتتغير لما البرنامج يتغلّف: الفولدر الحالي، ومكان كودك، ووجود [[.env]]. الكود ده بيتعامل مع التلاتة.

جربته على ويندوز ١١ مرتين: مرة بـ Electron من الترمنال (تطوير)، ومرة جوه البرنامج المتغلّف من درس [[build-exe.ps1]]، وزوّدت في آخره سطر بيطبع كل المتغيرات.

---

## ١. السطور ١ إلى ٣: [[require]]

[[app]] من Electron، و [[path]] لتركيب المسارات، و [[fs]] (من file system) لقراية وكتابة الملفات. الاتنين الأخيرين جاهزين في Node.

## ٢. [[if (!app.isPackaged) require('dotenv').config();]]

- [[app.isPackaged]]: [[false]] وانت بتطوّر، [[true]] في البرنامج المتغلّف. و [[!]] بتعكسها، يعني «لو مش متغلّف».
- [[dotenv]] مكتبة بتقرا ملف [[.env]] (سطور زي [[API_URL=http://localhost:3000]]) وتحطها في [[process.env]].

فـ [[.env]] للتطوير بس. والشرط ده كمان معناه إن البرنامج المتغلّف مش محتاج [[dotenv]] أصلًا.

جربته وانا جوه فولدر المشروع:

~~~text الناتج
◇ injected env (1) from .env
~~~

[[injected env (1)]] يعني قرا متغير واحد. بس لما شغّلته من فولدر تاني:

~~~text الناتج
◇ injected env (0) from .env
~~~

صفر! لأن [[dotenv]] بيدوّر على [[.env]] في **الفولدر الحالي** مش فولدر الكود. فشغّل وانت جوه المشروع ([[npm start]] بيعمل كده لوحده).

## ٣. [[const file = path.join(app.getPath('userData'), 'config.json');]]

[[app.getPath('userData')]] فولدر خاص ببرنامجك يقدر يكتب فيه براحته، واسمه من [[name]] في package.json:

| النظام | المسار |
|---|---|
| ويندوز | [[C:\Users\ali\AppData\Roaming\myapp]] (يعني [[%APPDATA%\myapp]]) |
| لينكس | [[~/.config/myapp]] |
| الماك | [[~/Library/Application Support/myapp]] |

مسار ويندوز اتجرّب هنا، ولينكس والماك من دليل Electron. و [[path.join]] بيضيف اسم الملف للمسار.

ليه هنا؟ لأن فولدر البرنامج نفسه مينفعش يتكتب فيه: [[app.asar]] للقراية بس، و [[Program Files]] محتاج أدمن. والتحديث ومسح البرنامج مش بيلمسوا [[userData]]، فالإعدادات بتفضل.

## ٤. السطور ٥ إلى ٧: اعمل الملف أول مرة

~~~text
if (!fs.existsSync(file)) {
  fs.writeFileSync(file, JSON.stringify({ apiUrl: 'https://api.example.com' }, null, 2));
}
~~~

- [[fs.existsSync]] بيرجّع [[true]] لو الملف موجود. و [[Sync]] في الاسم يعني بيستنى لحد ما يخلص قبل السطر اللي بعده.
- [[JSON.stringify(object, null, 2)]] بيحوّل الـ object لنص JSON. و [[null]] مكان خانة بنسيبها فاضية، و [[2]] يعني مسافتين قبل كل سطر عشان يبقى مقروء.

والملف اللي اتعمل:

~~~text config.json
{
  "apiUrl": "https://api.example.com"
}
~~~

## ٥. [[const config = JSON.parse(fs.readFileSync(file, 'utf8'));]]

من جوه لبرة: [[fs.readFileSync(file, 'utf8')]] بيقرا الملف كنص (ومن غير [['utf8']] بيرجّع bytes)، و [[JSON.parse]] بيحوّل النص لـ object تقدر تقرا منه [[config.apiUrl]].

## ٦. [[const apiUrl = process.env.API_URL || config.apiUrl;]]

[[||]] هنا معناها «لو اللي على الشمال فاضي، خد اللي على اليمين». فلو [[API_URL]] متحدد في [[.env]] يكسب، ولو لأ ناخد من ملف الإعدادات.

## ٧. السطرين الأخيرين: الملفات اللي جاية مع البرنامج

~~~text
const base = app.isPackaged ? process.resourcesPath : __dirname;
const logo = path.join(base, 'assets', 'logo.png');
~~~

[[شرط ? أ : ب]] اسمه ternary: لو الشرط صح خد [[أ]]، غير كده [[ب]]. و [[process.resourcesPath]] فولدر [[resources]] جنب الـ exe، وده المكان اللي electron-builder بيحط فيه الملفات اللي في [[extraResources]] (بره الـ asar).

---

## الناتج في الحالتين

~~~text تطوير (من فولدر المشروع، مختصر من console.log)
isPackaged: false
apiUrl: 'http://localhost:3000'
base:   '...\exeproj\isp'
logo:   '...\exeproj\isp\assets\logo.png'
file:   'C:\Users\ali\AppData\Roaming\myapp\config.json'
~~~

~~~text البرنامج المتغلّف (شغّلته وانا في C:\Windows\System32)
isPackaged: true
apiUrl: 'https://api.example.com'
base:   '...\dist\myapp\resources'
logo:   '...\dist\myapp\resources\assets\logo.png'
file:   'C:\Users\ali\AppData\Roaming\myapp\config.json'
cwd:    'C:\Windows\System32'
~~~

قارن:

| الحاجة | تطوير | متغلّف |
|---|---|---|
| [[apiUrl]] | من [[.env]] | من [[config.json]] |
| [[base]] | فولدر الكود | [[resources]] جنب الـ exe |
| [[config.json]] | نفس المكان | نفس المكان ([[userData]]) |
| الفولدر الحالي ([[cwd]]) | فولدر المشروع | أي حاجة (هنا System32) |

السطر الأخير في الجدول هو سبب الدرس كله: لو كتبت [[fs.readFileSync('data.json')]] بمسار نسبي، البرنامج المتغلّف كان هيدوّر في System32.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| تعرف انت في تطوير ولا متغلّف | [[app.isPackaged]] |
| مكان تكتب فيه إعدادات أو بيانات | [[app.getPath('userData')]] |
| ملف جاي مع البرنامج | [[process.resourcesPath]] (متغلّف) أو [[__dirname]] (تطوير) |
| أسرار التطوير | [[.env]] بـ dotenv، في التطوير بس |

وأي مفتاح API جوه برنامج ديسكتوب مش سر: المستخدم عنده الملفات. المفاتيح الحقيقية تفضل على سيرفرك.`,
          lines: [
            "هات app.",
            "المسارات.",
            "الملفات.",
            "وانت بتطوّر بس: اقرا .env.",
            "ملف إعدادات في فولدر البرنامج الخاص بالمستخدم.",
            "لو مش موجود (أول تشغيل)...",
            "...اعمله بالقيم الافتراضية.",
            "نهاية الشرط.",
            "اقرا الإعدادات.",
            "متغير البيئة يكسب لو موجود (للتطوير).",
            "فولدر الملفات اللي جاية مع البرنامج: resources في النسخة المتغلّفة.",
            "مسار صورة بيشتغل في الحالتين."
          ],
          sol: R`اطبع [[app.getPath('userData')]] في [[main.js]]. جربتها على Linux ورجعت [[/root/.config/myapp]] (باسم [[name]] من package.json). على ويندوز بتبقى [[C:\Users\<you>\AppData\Roaming\myapp]] (يعني [[%APPDATA%\myapp]])، وعلى الماك [[~/Library/Application Support/myapp]].

الفكرة المهمة: في التطوير ملفاتك جنب الكود، لكن في النسخة المتغلّفة الكود جوه [[app.asar]] للقراءة بس، فأي ملف بتكتب فيه (config، database، logs) لازم يروح [[userData]]. عشان كده الكود بيعمل [[config.json]] هناك لو مش موجود.

و [[app.isPackaged]] بيفرّق بين الحالتين: في التطوير [[false]] (فبيقرا [[.env]] و [[__dirname]])، وفي الـ build [[true]] (فبيقرا من [[process.resourcesPath]]). لو خلطت الاتنين هتلاقي التطبيق شغال في التطوير وبيكراش بعد الـ build بـ [[ENOENT]] على ملف مش لاقيه.`
        },
        {
          cmd: "launcher",
          title: "ملف تشغيل بضغطتين",
          desc: "لزميل مش مبرمج بيشغّل البرنامج من الكود: سكربت واحد يتأكد إن Node موجود و .env موجود، يسطّب أول مرة، يبني الواجهة لو اتغيرت، ويشغّل. نفس المنطق مرتين: bash للينكس و bat لويندوز.",
          example: R`#!/usr/bin/env bash
# run.sh (لينكس)
set -e
cd "$(dirname "$0")"
command -v node >/dev/null || { echo "Node.js is not installed"; exit 1; }
[ -f .env ] || { echo ".env missing: copy .env.example to .env"; exit 1; }
[ -d node_modules ] || npm ci
SB=node_modules/electron/dist/chrome-sandbox
if [ "$(stat -c '%u %a' "$SB")" != "0 4755" ]; then
  sudo chown root:root "$SB" && sudo chmod 4755 "$SB"
fi
if [ ! -f dist/index.html ] || [ -n "$(find src -newer dist/index.html -print -quit)" ]; then
  npx vite build
fi
LOAD_DIST=1 exec npx electron .

REM run.bat (ويندوز)
@echo off
cd /d "%~dp0"
where node >nul 2>nul || ( echo Node.js is not installed & pause & exit /b 1 )
if not exist .env ( echo .env missing & pause & exit /b 1 )
if not exist node_modules ( call npm ci || ( pause & exit /b 1 ) )
call npx vite build || ( pause & exit /b 1 )
set LOAD_DIST=1
npx electron .`,
          try: "اعمل الملفين في مشروع Electron تجربة، وامسح node_modules، وشغّل run.sh أو run.bat بدبل كليك وشوفه بيسطّب ويفتح.",
          flag: "script",
          deep: {
            why: "«شغّل npm install وبعدين npx vite build وبعدين npx electron .» مش تعليمات لحد مش مبرمج. ملف واحد بيعمل كله ويقول بالظبط إيه الناقص لو حاجة مش موجودة.",
            how: R`في bash: [[set -e]] أي أمر يفشل يوقف. [[cd "$(dirname "$0")"]] يروح لفولدر السكربت مهما اتشغّل منين. [[command -v node]] بيتأكد إن Node موجود. [[[ -d node_modules ] || npm ci]] يسطّب أول مرة بس.

الـ chrome-sandbox: Electron على لينكس محتاج الملف ده ملك root بصلاحية 4755. [[stat -c '%u %a']] بيطبع صاحب الملف وصلاحيته، ولو مش مظبوطين يصلّحهم بـ sudo (مرة واحدة).

إعادة البناء: [[find src -newer dist/index.html]] بيدوّر على أي ملف في src أحدث من آخر build. لو فيه، يبني. و [[exec]] بيخلي Electron ياخد مكان السكربت بدل ما السكربت يفضل مستنيه.

في bat: [[%~dp0]] فولدر الملف، و [[cd /d]] يغيّر الدرايف كمان. [[where node]] بيدوّر على Node. [[call]] لازمة قبل npm و npx لأنهم ملفات bat، ومن غيرها السكربت بيخلص بعد أول واحد. و [[pause]] قبل الخروج عشان الشباك ميتقفلش قبل ما المستخدم يقرا الرسالة. والرسايل بالإنجليزي عشان CMD بيبوّظ العربي.`,
            when: "برنامج Electron داخلي بيتشغّل من الكود على أجهزة الفريق.",
            mistakes: R`في مشروع حقيقي نسخة bash مكانش فيها [[set -e]] ولا بتسطّب لو node_modules مش موجود، وكانت بتقارن [[src/App.jsx]] بس بـ dist، فتعديل في أي ملف تاني مكانش بيعمل build. ونسخة bat مكانتش بتبني تاني بعد أول مرة خالص، فالزميل فضل شغّال على نسخة قديمة أسابيع. ومحدش كان بيتأكد إن Node متسطّب أصلًا.`
          },
          teach: R`## الفكرة

زميلك مش مبرمج وعايز يشغّل البرنامج من الكود. بدل ما تقوله «اعمل npm ci وبعدين vite build وبعدين electron .»، بتديله ملف يدوس عليه مرتين. الملف بيتأكد إن كل حاجة موجودة، ولو حاجة ناقصة بيقول إيه هي بالظبط.

نفس المنطق مكتوب مرتين: [[run.sh]] للينكس (bash) و [[run.bat]] لويندوز (CMD). جربت [[run.bat]] كامل على ويندوز ١١، و [[run.sh]] جوه Docker ([[node:22-slim]]) لحد قبل السطر الأخير (مفيش شاشة هناك تفتح Electron).

---

## الجزء الأول: [[run.sh]] (لينكس)

### ١. [[#!/usr/bin/env bash]]

اسمه **shebang**: أول سطر بيقول للنظام «شغّل الملف ده بـ bash». و [[/usr/bin/env bash]] بيدوّر على bash في الـ PATH بدل ما تكتب مكانه بالظبط. والسطر اللي بعده تعليق ([[#]]).

### ٢. [[set -e]]

أي أمر يفشل، السكربت يقف. من غيره bash بيكمّل عادي بعد الخطأ.

> فيه استثناء: الأمر اللي قبل [[&&]] لو فشل، [[set -e]] مش بيوقف. جربتها: لما [[chrome-sandbox]] مكانش موجود، [[sudo chown]] فشل والسكربت كمّل. عشان كده كل خطوة مهمة هنا ليها رسالة بإيدها.

### ٣. [[cd "$(dirname "$0")"]]

من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[$0]] | مسار السكربت زي ما اتشغّل، مثلًا [[/w/launch/run.sh]] |
| [[dirname]] | بيشيل اسم الملف ويسيب الفولدر: [[/w/launch]] |
| [[$( )]] | نفّذ اللي جوه وحط ناتجه هنا |
| [[cd]] | روح للفولدر ده |

علامات التنصيص عشان لو المسار فيه مسافات. فالسكربت بيشتغل صح حتى لو دوست عليه من مكان تاني.

### ٤. Node موجود؟

~~~bash
command -v node >/dev/null || { echo "Node.js is not installed"; exit 1; }
~~~

[[command -v node]] بيطبع مكان node لو موجود ([[/usr/local/bin/node]]) ويخرج بـ 0، ولو مش موجود يخرج بـ 1. و [[>/dev/null]] بيرمي المسار، احنا عايزين النتيجة بس. و [[||]] يعني «لو فشل شغّل اللي بعدي»، و [[{ ...; }]] بيجمع أمرين.

### ٥. [[.env]] موجود؟

~~~bash
[ -f .env ] || { echo ".env missing: copy .env.example to .env"; exit 1; }
~~~

[[[ -f .env ]]] اختبار: «فيه ملف اسمه .env؟». جربته من غير .env:

~~~text الناتج
.env missing: copy .env.example to .env
~~~

وخرج بـ 1. الرسالة مش بس بتقول الغلط، بتقول الحل كمان.

### ٦. [[[ -d node_modules ] || npm ci]]

[[-d]] يعني «فيه فولدر؟». لو مفيش، [[npm ci]] يسطّب. جربته: [[added 115 packages ... in 2s]]. ولو مفيش [[package-lock.json]]، [[npm ci]] بيرفض والسكربت يقف (بسبب [[set -e]]).

### ٧. الـ chrome-sandbox

~~~bash
SB=node_modules/electron/dist/chrome-sandbox
if [ "$(stat -c '%u %a' "$SB")" != "0 4755" ]; then
  sudo chown root:root "$SB" && sudo chmod 4755 "$SB"
fi
~~~

- [[SB=...]] متغير بالمسار عشان منكررهوش.
- [[stat -c '%u %a']] بيطبع رقم صاحب الملف ([[%u]]، و root رقمه 0) وصلاحياته بالأرقام ([[%a]]).
- [[4755]]: الـ [[4]] هي **setuid** (البرنامج يشتغل بصلاحيات صاحبه root)، و [[755]] صاحبه يقرا ويكتب وينفّذ والباقي يقرا وينفّذ. Electron على لينكس محتاج كده عشان الـ sandbox (العزل اللي بيحمي الجهاز من الصفحات).
- [[!=]] يعني «مش بيساوي». فلو مش مظبوط، صلّحه بـ [[sudo]].

جربتها على ملف تجربة: قبل [[0 755]]، وبعد السكربت [[0 4755]]، و [[ls -l]] بقى يوريه [[-rwsr-xr-x]] (الـ [[s]] مكان [[x]] هي الـ setuid).

### ٨. ابني لو فيه جديد

~~~bash
if [ ! -f dist/index.html ] || [ -n "$(find src -newer dist/index.html -print -quit)" ]; then
  npx vite build
fi
~~~

شرطين بينهم [[||]]:

1. [[[ ! -f dist/index.html ]]]: مفيش build أصلًا ([[!]] بتعكس).
2. [[find src -newer dist/index.html -print -quit]]: دوّر في [[src]] على أي ملف **أحدث** من آخر build، واطبع أول واحد واقف ([[-quit]]). و [[[ -n "..." ]]] يعني «الناتج مش فاضي».

جربتها: من غير تعديل السكربت عدّى من غير build، وبعد ما لمست [[src/main.js]] الـ find طبع [[src/main.js]] وعمل build.

### ٩. [[LOAD_DIST=1 exec npx electron .]]

- [[LOAD_DIST=1]] قبل الأمر بيحط متغير بيئة للأمر ده بس. و [[main.js]] (درسه) بيشوفه فيحمّل [[dist/index.html]] بدل سيرفر Vite اللي مش شغال هنا. جربت [[LOAD_DIST=1 exec printenv LOAD_DIST]] وطبع [[1]].
- [[exec]] بيخلي Electron **ياخد مكان** السكربت، بدل ما يبقى فيه bash مستني في الخلفية.

> من غير [[LOAD_DIST]]: جربت الملف القديم على ويندوز، وElectron حاول يفتح [[localhost:5173]] وطلع [[ERR_CONNECTION_REFUSED]]، يعني نافذة بيضا. ولو هتحمّل dist، حط [[base: './']] في vite.config (شرحه في درس [[main.js]]).

---

## الجزء التاني: [[run.bat]] (ويندوز)

| السطر | معناه |
|---|---|
| [[@echo off]] | متطبعش كل أمر قبل ما تنفّذه. و [[@]] بتخفي السطر ده نفسه |
| [[cd /d "%~dp0"]] | [[%~dp0]] فولدر الملف (d = الدرايف، p = المسار، 0 = الملف نفسه). و [[/d]] بيغيّر الدرايف كمان لو الملف على D: |
| [[where node >nul 2>nul]] | زي [[command -v]]. و [[>nul]] بيرمي الناتج، و [[2>nul]] بيرمي الأخطاء |
| [[if not exist .env ( ... )]] | زي [[[ -f .env ]]] |
| [[call npm ci]] | [[npm]] نفسه ملف [[.cmd]]، ومن غير [[call]] الـ bat بيخلص بعده ومايرجعش |
| [[call npx vite build]] | ابني كل مرة (أبسط من نسخة bash) |
| [[set LOAD_DIST=1]] | متغير بيئة لكل اللي بعده في الملف ده |
| [[npx electron .]] | شغّل. آخر سطر فمش محتاج [[call]] |

و [[( echo ... & pause & exit /b 1 )]]: [[&]] بتشغّل الأوامر ورا بعض، و [[pause]] بيطبع «Press any key» عشان الشباك ميتقفلش قبل ما المستخدم يقرا، و [[exit /b 1]] بيخرج من الملف بكود 1.

جربته على ويندوز من غير [[.env]]:

~~~text الناتج
.env missing
Press any key to continue . . .
~~~

ومع [[.env]]:

~~~text الناتج
vite v8.3.3 building client environment for production...
✓ 4 modules transformed.
dist/index.html                0.19 kB │ gzip: 0.18 kB
dist/assets/index-BAls_7aN.js  0.77 kB │ gzip: 0.44 kB
✓ built in 71ms
~~~

وبعدها Electron فتح [[file:///.../myapp/dist/index.html]]. والرسايل بالإنجليزي لأن CMD بيبوّظ العربي في الرسايل.

---

## الخلاصة

| السؤال | bash | bat |
|---|---|---|
| روح لفولدر السكربت | [[cd "$(dirname "$0")"]] | [[cd /d "%~dp0"]] |
| Node موجود؟ | [[command -v node]] | [[where node]] |
| ملف موجود؟ | [[[ -f .env ]]] | [[if not exist .env]] |
| متغير للأمر | [[LOAD_DIST=1 exec ...]] | [[set LOAD_DIST=1]] |

كل فحص بيطلّع رسالة بتقول الناقص إيه، وده الفرق بين ملف تشغيل حد يعتمد عليه وملف بيقفل فجأة.`,
          lines: [
            "أي فشل يوقف.",
            "روح لفولدر السكربت.",
            "Node موجود؟",
            ".env موجود؟",
            "سطّب أول مرة بس.",
            "ملف الـ sandbox.",
            "لو صاحبه أو صلاحيته غلط...",
            "...صلّحهم (sudo مرة واحدة).",
            "نهاية الشرط.",
            "لو مفيش build أو فيه ملف في src أحدث منه...",
            "...ابني.",
            "نهاية الشرط.",
            "شغّل Electron مكان السكربت، و LOAD_DIST=1 بيخلّي main.js يحمّل dist بدل سيرفر Vite.",
            "متطبعش الأوامر.",
            "روح لفولدر الملف (ولو على درايف تاني).",
            "Node موجود؟",
            ".env موجود؟",
            "سطّب أول مرة.",
            "ابني الواجهة كل مرة.",
            "قول لـ main.js يحمّل dist (مفيش سيرفر Vite هنا).",
            "شغّل."
          ],
          sol: R`الفكرة: المستخدم العادي مش هيفتح ترمنال ويكتب أوامر، فبتديله ملف يدوس عليه دبل كليك. جربت [[run.sh]] (نسخة معدّلة توقف قبل تشغيل النافذة): من غير [[.env]] وقف وطبع [[.env missing: copy .env.example to .env]] وخرج بـ 1، وبعد ما عملت [[.env]] كمّل عادي.

جزء الـ sandbox في نسخة Linux مهم: [[chrome-sandbox]] بتاع Electron لازم يكون مملوك لـ root وبصلاحية [[4755]]، وإلا Electron بيكراش بـ [[The SUID sandbox helper binary was found, but is not configured correctly]]. جربت الشرط ده وفعلًا صلّح الصلاحية من [[0 755]] لـ [[0 4755]].

بعد ما تمسح [[node_modules]] وتدوس على الملف، هتلاقيه بيعمل [[npm ci]] الأول (ياخد وقت) وبعدين [[vite build]] وبعدين يفتح. على ويندوز [[run.bat]] بيعمل نفس الشيء، و [[pause]] بيخلّي شاشة الخطأ تفضل مفتوحة عشان المستخدم يقراها بدل ما تقفل بسرعة.`
        }
      ]
    },
    {
      t: "Android: APK من الترمنال",
      l: 2,
      n: "تبني APK من غير ما تفتح Android Studio، وتسطّبه على موبايلك وتشوف اللوج",
      items: [
        {
          cmd: "./gradlew assembleDebug",
          title: "ابني APK من الترمنال",
          desc: R`جوه android/ فيه [[gradlew]]: سكربت بيشغّل Gradle بالنسخة اللي المشروع محتاجها. [[assembleDebug]] بيطلّع APK للتجربة موقّع بمفتاح debug، و [[assembleRelease]] نسخة الإصدار (محتاجة مفتاح توقيع، المستوى ٣).

على ويندوز نفس الأمر بس [[.\gradlew.bat]].`,
          example: R`npm run build && npx cap sync android
cd android
chmod +x gradlew
./gradlew assembleDebug
ls app/build/outputs/apk/debug/
./gradlew assembleRelease
# على ويندوز (PowerShell أو CMD):
.\gradlew.bat assembleDebug`,
          try: "ابني APK debug، وابعته لموبايلك (تليجرام أو كابل) وسطّبه. أول مرة Gradle هياخد دقايق، التانية أسرع بكتير.",
          deep: {
            why: "Android Studio تقيل ومحتاج كليكات. من الترمنال: أمر واحد، وتقدر تحطه في سكربت أو CI.",
            how: R`[[gradlew]] (Gradle Wrapper) بينزّل نسخة Gradle المظبوطة للمشروع أول مرة ويخزّنها في [[~/.gradle]]، فمش محتاج تسطّب Gradle بنفسك.

محتاج حاجتين على الجهاز: JDK (Capacitor الحديث عايز Java 21، والقديم 17)، و Android SDK (بيتسطّب مع Android Studio). Gradle بيلاقي الـ SDK من متغير [[ANDROID_HOME]] أو من ملف [[android/local.properties]] فيه [[sdk.dir=...]].

[[chmod +x]] لأن الملف ساعات بيوصل من ويندوز أو Git من غير صلاحية تنفيذ، فيطلع Permission denied.

الناتج: [[app/build/outputs/apk/debug/app-debug.apk]]. نسخة debug موقّعة بمفتاح debug اتعمل لوحده على جهازك في [[~/.android/debug.keystore]].

[[assembleRelease]] من غير إعداد توقيع بيطلّع [[app-release-unsigned.apk]] ودي مش بتتسطّب. و [[bundleRelease]] بيطلّع [[.aab]] ودي اللي Play Store عايزها.

[[./gradlew clean]] بيمسح الـ build القديم لو حاجة غريبة بتحصل. و [[--no-daemon]] في CI عشان Gradle ميفضلش شغال في الخلفية.`,
            when: "كل مرة محتاج APK. وفي CI دايمًا.",
            mistakes: R`نسيان sync فالـ APK بالويب القديم. و [[JAVA_HOME]] شايف JDK قديمة فيطلع [[Android Gradle plugin requires Java 17]] أو [[Unsupported class file major version]]. و [[SDK location not found]]: اعمل local.properties. وفي مشروع حقيقي النسخة اللي بتتوزع كانت debug: كل جهاز بيبني بمفتاح debug مختلف، فـ APK اتبنى على جهاز تاني مكانش بيتسطّب كتحديث فوق اللي عند الناس.`
          },
          teach: R`## الفكرة

جوه [[android/]] اللي Capacitor عمله فيه سكربت اسمه [[gradlew]]. ده بيبني التطبيق من الترمنال من غير ما تفتح Android Studio، وبيطلّع ملف APK (الملف اللي بيتسطّب على الموبايل).

جربت الأوامر في Docker على أوبونتو 24.04 فيه JDK 21، ومفيش Android SDK، فالبناء وقف عند الخطوة اللي محتاجة الـ SDK، وهتشوف الرسالة الحقيقية. وجربت [[gradlew.bat]] على ويندوز ١١ من غير Java خالص. ونجاح البناء ومكان الـ APK مكتوبين من دليل أندرويد.

---

## ١. [[npm run build && npx cap sync android]]

نفس درس [[npx cap sync android]]: ابني الموقع، وانسخه جوه مشروع أندرويد. و [[&&]] بتخلّي الـ sync يشتغل بس لو الـ build نجح. من غيرهم الـ APK هيطلع بالموقع القديم.

## ٢. [[cd android]]

[[gradlew]] لازم يشتغل من جوه فولدر المشروع، لأنه بيقرا [[settings.gradle]] و [[build.gradle]] من الفولدر الحالي.

## ٣. [[chmod +x gradlew]]

[[chmod]] (change mode) بيغيّر صلاحيات ملف، و [[+x]] بيضيف صلاحية **التنفيذ**. الملف ساعات بيوصل من غير الصلاحية دي (اتنقل من ويندوز أو zip). جربت أشيلها بـ [[chmod -x]] وأشغّله:

~~~text الناتج من غير صلاحية تنفيذ
bash: line 1: ./gradlew: Permission denied
~~~

وبعد [[chmod +x]] اشتغل. والـ [[./]] قبل الاسم معناها «الملف اللي في الفولدر ده»، لأن bash مش بيدوّر في الفولدر الحالي لوحده.

## ٤. [[./gradlew assembleDebug]]

### [[gradlew]] نفسه

اسمه **Gradle Wrapper**. [[Gradle]] أداة البناء بتاعة أندرويد، والـ wrapper بيضمن إن كل الناس بتستخدم نفس نسخة Gradle اللي المشروع محتاجها. النسخة مكتوبة في ملف:

~~~text android/gradle/wrapper/gradle-wrapper.properties
distributionUrl=https\://services.gradle.org/distributions/gradle-8.14.3-all.zip
~~~

أول مرة بينزّلها لوحده:

~~~text الناتج أول مرة
Downloading https://services.gradle.org/distributions/gradle-8.14.3-all.zip
.....................10%.....................20%......  ...100%
Welcome to Gradle 8.14.3!
~~~

وبيخزّنها في [[~/.gradle]] مع المكتبات اللي بينزّلها. بعد المحاولة دي الفولدر كان ٨٦١ ميجا، عشان كده أول build بطيء (على نت بطيء أخد هنا أكتر من ربع ساعة)، والتاني أسرع بكتير.

و [[./gradlew --version]] بيوريك هو شغال بإيه:

~~~text الناتج (آخره)
Launcher JVM:  21.0.12.1 (Ubuntu 21.0.12.1+1-1-24.04.4-Ubuntu)
Daemon JVM:    /usr/lib/jvm/java-21-openjdk-amd64 (no JDK specified, using current Java home)
OS:            Linux 6.6.87.2-microsoft-standard-WSL2 amd64
~~~

[[JVM]] (Java Virtual Machine) هو اللي بيشغّل Gradle، يعني Gradle محتاج **JDK** على الجهاز. و Capacitor 8 عايز Java 21.

### [[assembleDebug]]

ده اسم **task** (مهمة) في Gradle: [[assemble]] يعني ابني، و [[Debug]] نوع النسخة. الـ debug بتتوقّع لوحدها بمفتاح تجربة، فتتسطّب على أي موبايل للتجربة بس.

ولما الـ Android SDK مش موجود:

~~~text الناتج
> Configure project :app
FAILURE: Build failed with an exception.
* What went wrong:
Could not determine the dependencies of task ':app:compileDebugJavaWithJavac'.
> SDK location not found. Define a valid SDK location with an ANDROID_HOME environment variable or by setting the sdk.dir path in your project's local properties file at '/w/myapp/android/local.properties'.
BUILD FAILED in 12s
~~~

الرسالة نفسها فيها الحلّين: متغير البيئة [[ANDROID_HOME]]، أو ملف [[android/local.properties]] فيه سطر زي:

~~~text local.properties
sdk.dir=/home/ali/Android/Sdk
~~~

و [[:app:compileDebugJavaWithJavac]] اسم task جوه مشروع [[app]]: الـ [[:]] بتفصل اسم المشروع عن اسم المهمة.

## ٥. [[ls app/build/outputs/apk/debug/]]

لما البناء ينجح (على جهاز فيه Android SDK) آخر سطر بيبقى [[BUILD SUCCESSFUL]]، والـ APK بيبقى هنا:

~~~text الناتج (من دليل أندرويد)
app-debug.apk
~~~

## ٦. [[./gradlew assembleRelease]]

نسخة الإصدار. من غير إعداد توقيع (درس [[keytool]]) بتطلع [[app-release-unsigned.apk]]، وده مش بيتسطّب. و [[bundleRelease]] بيطلّع [[.aab]]، الصيغة اللي Play Store عايزها.

---

## ٧. على ويندوز: [[.\gradlew.bat assembleDebug]]

[[gradlew]] سكربت bash، وجنبه [[gradlew.bat]] لويندوز. و [[.\]] زي [[./]]. جربته في PowerShell 7 و Windows PowerShell 5.1 على جهاز مفيهوش Java:

~~~text الناتج
ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.

Please set the JAVA_HOME variable in your environment to match the
location of your Java installation.
~~~

يعني Gradle مش لاقي Java: سطّب JDK 21، وحط [[JAVA_HOME]] على فولدره. أسهل طريقة إن Android Studio بييجي معاه JDK. وفي PowerShell كتابة [[./gradlew]] اشتغلت برضو، لأنه بيلاقي [[gradlew.bat]] لوحده.

---

## الخلاصة

| الخطوة | الأمر | ليه |
|---|---|---|
| ١ | [[npm run build && npx cap sync android]] | آخر نسخة من الموقع |
| ٢ | [[cd android]] | Gradle بيشتغل من هنا |
| ٣ | [[chmod +x gradlew]] | ضد [[Permission denied]] |
| ٤ | [[./gradlew assembleDebug]] | APK للتجربة |
| ٥ | [[ls app/build/outputs/apk/debug/]] | [[app-debug.apk]] |
| ٦ | [[./gradlew assembleRelease]] | نسخة الإصدار (محتاجة توقيع) |

محتاج على الجهاز: JDK 21 (أو [[JAVA_HOME]] عليه) و Android SDK ([[ANDROID_HOME]] أو [[local.properties]]).`,
          lines: [
            "ابني الويب وانقله للمشروع.",
            "ادخل مشروع أندرويد.",
            "ادّي gradlew صلاحية تنفيذ.",
            "ابني APK للتجربة.",
            "الناتج هنا.",
            "نسخة الإصدار (محتاجة توقيع).",
            "نفس الأمر على ويندوز."
          ],
          sol: R`[[./gradlew assembleDebug]] بيطلّع في آخره [[BUILD SUCCESSFUL]]، و [[ls app/build/outputs/apk/debug/]] بيوريك [[app-debug.apk]]. الـ debug APK موقّع بمفتاح debug تلقائي، فينفع يتسطب على أي موبايل للتجربة بس مش ينفع للمتجر.

أول build Gradle بينزّل الـ Android Gradle Plugin والـ dependencies (دقايق)، والتانية بتبقى أسرع بكتير بسبب الـ cache والـ daemon. [[assembleRelease]] بيطلّع نسخة الإنتاج بس محتاجة توقيع (الدرس بتاع keytool).

لو وقف بـ [[SDK location not found]] اعمل [[local.properties]] فيه [[sdk.dir=...]] أو ظبط [[ANDROID_HOME]]. ولو [[Permission denied]] على gradlew اعمل [[chmod +x gradlew]] (على ويندوز استخدم [[.\gradlew.bat]]).

(ما قدرتش أبني APK هنا لأن مفيش Android SDK: في أوبونتو 24.04 فيه JDK 21، [[./gradlew assembleDebug]] نزّل Gradle 8.14.3 ووقف بـ [[SDK location not found]]. وعلى ويندوز من غير Java، [[.\gradlew.bat]] وقف بـ [[ERROR: JAVA_HOME is not set]]. الأوامر صح لكن محتاجة جهاز فيه Android SDK.)`
        },
        {
          cmd: "adb",
          title: "سطّب على موبايلك وشوف اللوج",
          desc: "[[adb]] بيكلّم الموبايل الموصّل بالكابل: [[adb devices]] يتأكد إنه شايفه، و [[adb install -r]] يسطّب الـ APK فوق القديم من غير ما يمسح البيانات، و [[adb logcat]] يوريك لوج الموبايل لايف، وفيه أخطاء التطبيق.",
          example: R`adb devices
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
adb shell am start -n com.example.myapp/.MainActivity
adb logcat | grep -i -E "capacitor|chromium"
adb reverse tcp:3000 tcp:3000`,
          try: "فعّل USB debugging، ووصّل الموبايل، وسطّب الـ APK بـ adb. وبعدين افتح [[chrome://inspect]] في Chrome على الكمبيوتر وافتح DevTools للتطبيق.",
          deep: {
            why: "بعت الـ APK على تليجرام وسطّبته بإيدك كل مرة بطيء. والتطبيق بيقفل أو شاشة بيضا ومش عارف ليه: الإجابة في اللوج.",
            how: R`[[adb]] في Android SDK جوه [[platform-tools]]، ضيفه للـ PATH.

على الموبايل: الإعدادات، عن الهاتف، دوس على Build number ٧ مرات، وبعدين Developer options وفعّل USB debugging. أول ما توصّل هيسألك «Allow USB debugging?» وافق.

[[adb devices]]: لو الحالة [[device]] تمام. [[unauthorized]] يعني وافق على الرسالة في الموبايل. [[no permissions]] على لينكس محتاج udev rules.

[[install -r]] بيستبدل التطبيق ويحافظ على بياناته. لو المفتاح مختلف عن النسخة المتسطّبة يفشل بـ [[INSTALL_FAILED_UPDATE_INCOMPATIBLE]]، والحل الوحيد [[adb uninstall com.example.myapp]] وده بيمسح بيانات التطبيق.

[[am start -n]] بيفتح التطبيق من الترمنال. [[logcat]] كمية لوج ضخمة من كل الموبايل، فلتر بـ grep: رسايل [[console.log]] بتاعة Capacitor بتظهر تحت [[Capacitor/Console]].

أحسن من logcat للويب: [[chrome://inspect]] في Chrome على الكمبيوتر بيوريك الـ WebView بتاع التطبيق، وتفتحله DevTools كاملة (Console و Network) كأنه موقع (في نسخة debug).

[[adb reverse tcp:3000 tcp:3000]]: الـ localhost:3000 على الموبايل يروح للـ 3000 على الكمبيوتر، فالتطبيق يكلّم الـ API المحلي وانت بتطوّر. ولو فيه أكتر من جهاز: [[adb -s SERIAL]].`,
            when: "كل تجربة على موبايل حقيقي. وأي crash أو شاشة بيضا.",
            mistakes: "تقرا logcat كله من غير فلتر وتتوه. وتعمل uninstall عشان تحل INSTALL_FAILED وتنسى إنه بيمسح بيانات التطبيق: على موبايل حد تاني ده معناه يفقد اللي عليه."
          },
          teach: R`## الفكرة

[[adb]] (Android Debug Bridge) برنامج على الكمبيوتر بيكلّم موبايل أندرويد موصّل بالكابل (أو emulator): يسطّب عليه، ويفتح تطبيقات، ويقرا اللوج. بييجي مع Android SDK في فولدر [[platform-tools]].

جربت [[adb]] في Docker على أوبونتو 24.04 (من باكدج [[adb]] بتاع أوبونتو)، ومفيش موبايل موصّل هناك، فهتشوف شكله من غير أجهزة. وناتج الأوامر على موبايل حقيقي من دليل أندرويد.

---

## قبل أي حاجة: فعّل USB debugging

على الموبايل: Settings، ثم About phone، ودوس على **Build number** ٧ مرات لحد ما يقولك إنك بقيت developer. ارجع هتلاقي **Developer options**، فعّل منها **USB debugging**. وأول ما توصّل الكابل، الموبايل هيسألك «Allow USB debugging?»: وافق.

---

## ١. [[adb devices]]

بيعرض الأجهزة اللي adb شايفها. أول مرة بيشغّل **server** صغير في الخلفية:

~~~text الناتج من غير أجهزة
* daemon not running; starting now at tcp:5037
* daemon started successfully
List of devices attached

~~~

[[daemon]] برنامج شغال في الخلفية، والـ adb بتاعك بيكلّمه على البورت [[5037]]. والقايمة فاضية لأن مفيش موبايل. ولما يبقى فيه، كل جهاز سطر فيه رقمه التسلسلي (serial) وحالته:

| الحالة | معناها |
|---|---|
| [[device]] | تمام، جاهز |
| [[unauthorized]] | وافق على رسالة «Allow USB debugging» في الموبايل |
| [[offline]] | شيل الكابل ووصّله تاني |
| [[no permissions]] | على لينكس: محتاج udev rules تدّي اليوزر صلاحية على الجهاز |

ولو فيه أكتر من جهاز، أي أمر محتاج تقوله أنهي واحد: [[adb -s SERIAL ...]].

## ٢. [[adb install -r android/app/build/outputs/apk/debug/app-debug.apk]]

[[install]] بيسطّب الـ APK (المسار ده بتاع درس [[./gradlew assembleDebug]]). و [[-r]] (من replace) يعني لو التطبيق متسطّب، حدّثه **وسيب بياناته**. على موبايل الناتج المتوقع:

~~~text الناتج (من دليل أندرويد)
Performing Streamed Install
Success
~~~

ولما جربته من غير ولا جهاز:

~~~text الناتج
adb: no devices/emulators found
~~~

وأشهر فشل: [[INSTALL_FAILED_UPDATE_INCOMPATIBLE]]. معناها التطبيق المتسطّب موقّع بمفتاح تاني (مثلًا debug من جهاز زميلك). الحل الوحيد [[adb uninstall com.example.myapp]]، وده **بيمسح بيانات التطبيق**.

## ٣. [[adb shell am start -n com.example.myapp/.MainActivity]]

من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[adb shell]] | شغّل أمر **جوه** الموبايل (أندرويد فيه لينكس) |
| [[am]] | Activity Manager: البرنامج اللي بيفتح الشاشات |
| [[start -n]] | افتح الشاشة اللي اسمها كذا (n من name) |
| [[com.example.myapp]] | الـ appId (من [[cap init]]) |
| [[/.MainActivity]] | اسم الشاشة. والنقطة في أولها اختصار لـ [[com.example.myapp.MainActivity]] |

[[MainActivity]] هي الشاشة اللي Capacitor بيعملها وجواها الـ WebView.

## ٤. [[adb logcat | grep -i -E "capacitor|chromium"]]

[[logcat]] بيطبع لوج الموبايل كله لايف، وده آلاف السطور من كل التطبيقات. فبنفلتر:

- [[|]] (pipe) بيبعت الناتج لـ [[grep]].
- [[-i]] متفرّقش بين الحروف الكبيرة والصغيرة.
- [[-E]] regex موسّع، عشان [[|]] جوه النص يبقى معناها «أو»: سطور فيها [[capacitor]] **أو** [[chromium]].

أي [[console.log]] في صفحتك بيظهر بتاج [[Capacitor/Console]]، وأخطاء الـ WebView بتيجي من [[chromium]]. ويفضل شغال لحد ما تدوس Ctrl+C.

> على ويندوز مفيش [[grep]] في PowerShell: [[adb logcat | Select-String -Pattern "capacitor|chromium"]] بيعمل نفس الشغلانة (ومش بيفرّق بين الكبير والصغير لوحده).

وأحسن من logcat للويب: افتح [[chrome://inspect]] في Chrome على الكمبيوتر والموبايل موصّل، هتلاقي الـ WebView بتاع تطبيقك (نسخة debug)، ودوس inspect: DevTools كاملة على التطبيق الحقيقي.

## ٥. [[adb reverse tcp:3000 tcp:3000]]

جوه الموبايل [[localhost]] هو الموبايل نفسه، مش الكمبيوتر. [[reverse]] بيعمل نفق: أي اتصال بـ [[localhost:3000]] **على الموبايل** يروح لـ [[localhost:3000]] **على الكمبيوتر**. الرقم الأول بورت الموبايل، والتاني بورت الكمبيوتر. كده التطبيق يكلّم الـ API اللي شغال عندك وانت بتطوّر، من غير ما تعرف IP الكمبيوتر.

---

## الخلاصة

| الأمر | بيعمل |
|---|---|
| [[adb devices]] | الأجهزة وحالتها |
| [[adb install -r app.apk]] | سطّب أو حدّث وسيب البيانات |
| [[adb shell am start -n id/.MainActivity]] | افتح التطبيق |
| [[adb logcat]] مع فلتر | اللوج لايف |
| [[adb reverse tcp:3000 tcp:3000]] | localhost الموبايل يروح للكمبيوتر |

ولو [[adb]] مش لاقيه: ضيف [[platform-tools]] من الـ Android SDK للـ PATH.`,
          lines: [
            "الموبايلات المتوصلة وحالتها.",
            "سطّب فوق القديم وحافظ على البيانات.",
            "افتح التطبيق.",
            "لوج الموبايل لايف، متفلتر على التطبيق والـ WebView.",
            "localhost:3000 على الموبايل يروح للكمبيوتر."
          ],
          sol: R`[[adb devices]] بيطلّع قايمة، وموبايلك المفروض يظهر كسطر [[XXXXXX  device]]. لو ظهر [[unauthorized]] بص على شاشة الموبايل ووافق على «Allow USB debugging». لو مفيش أي جهاز، فعّل Developer options ثم USB debugging، وجرّب كابل تاني.

[[adb install -r ...apk]] بيطبع [[Success]]، و [[-r]] معناها replace (تحديث تطبيق متسطب من غير ما تمسحه). [[adb shell am start -n com.example.myapp/.MainActivity]] بيفتح التطبيق. [[adb logcat | grep -i capacitor]] بيوريك لوج الويب فيو وأي [[console.log]] من صفحتك.

أقوى حاجة: افتح [[chrome://inspect]] في Chrome على الكمبيوتر والموبايل موصّل، هتلاقي الـ WebView بتاع تطبيقك، دوس inspect وهتفتحلك DevTools كاملة على تطبيق الموبايل الحقيقي، تعمل debugging زي أي موقع. و [[adb reverse tcp:3000 tcp:3000]] بيخلّي الموبايل يوصل لسيرفر شغال على الكمبيوتر عبر [[localhost:3000]]. (محتاج موبايل حقيقي أو emulator، مش متاح هنا.)`
        }
      ]
    }
]);
