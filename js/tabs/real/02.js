// تكملة تاب real: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/real/01.js (شرح حقول الدرس في أوله)
MORE("real", [
    {
      t: "الواجهة والتطبيقات",
      l: 1,
      n: "screenshots بكل المقاسات، و Electron على ويندوز، و APK من موقع React",
      items: [
        {
          cmd: "PWA محلي + screenshots",
          title: "تجرّب PWA على جهازك وتصوّرها بكل المقاسات",
          desc: R`الـ service worker مبيشتغلش من [[file://]]، فالـ PWA لازم تتفتح من سيرفر حتى وانت بتجرّب. [[python -m http.server]] كفاية.

وبدل ما تغيّر حجم المتصفح بإيدك، Playwright بيصوّر الصفحة بأي مقاس في أمر واحد، فتقارن الموبايل والتابلت والديسكتوب جنب بعض.`,
          example: R`# 1) سيرفر static (الـ service worker مبيشتغلش من file://)
cd site
python -m http.server 8791
# 2) من ترمنال تاني
npx playwright install chromium
npx playwright screenshot --viewport-size "1440,900" http://localhost:8791 shot-desktop.png
npx playwright screenshot --viewport-size "800,1000" http://localhost:8791 shot-tablet.png
npx playwright screenshot --viewport-size "390,844" --full-page http://localhost:8791 shot-mobile.png
echo "shot-*.png" >> .gitignore
# 3) لو الصفحة لسه قديمة بعد التعديل، من Console في المتصفح:
# navigator.serviceWorker.getRegistrations().then(rs => rs.forEach(r => r.unregister()))`,
          try: "اعمل فولدر فيه index.html بسيط وشغّل السيرفر، وصوّره بالتلات مقاسات وافتح الصور جنب بعض. بعدين غيّر الـ viewport لـ 360,640 (موبايل صغير) وشوف إيه اللي اتكسر.",
          deep: {
            why: "الـ PWA (manifest و sw.js) بتخلي الموقع يتسطّب زي تطبيق ويشتغل من غير نت. بس المتصفح مش بيسجّل service worker غير على https أو localhost، فلازم سيرفر. والتأكد إن التصميم سليم على كل مقاس بإيدك ممل وبيتنسي.",
            how: R`[[python -m http.server 8791]] سيرفر static من الفولدر الحالي، مفيش تسطيب. بعدها DevTools ← Application بيوريك الـ Manifest والـ Service Workers وهل اتسجلوا.

[[npx playwright install chromium]] بينزّل متصفح Chromium خاص بـ Playwright مرة واحدة.

[[playwright screenshot]] بيفتح الصفحة في متصفح من غير شاشة بالمقاس اللي في [[--viewport-size]] ويحفظ صورة. و [[--full-page]] بيصوّر الصفحة كلها بالطول مش اللي باين بس.

والـ service worker بيفضل ماسك النسخة القديمة من الملفات. الكود اللي في آخر المثال بيلغي تسجيله من Console، والحل الدائم إنك تغيّر اسم الكاش في sw.js مع كل نسخة.`,
            when: "أي موقع قبل ما ترفعه، وأي PWA وانت بتطوّرها. أوامر Python لوحدها في تاب Python، والـ DevTools في تاب المتصفح.",
            mistakes: R`في مشروع حقيقي كان sw.js بيستخدم cache-first لكل حاجة، فأي تعديل في index.html مش بيوصل للزوار إلا لو اسم الكاش اتغيّر ([[const CACHE = 'myapp-v2']]). اعمل HTML بـ network-first.

والأيقونات icon-192 و icon-512 اللي في الـ manifest مكانتش موجودة، والـ Console كان بيطلع 404 عليها وعلى favicon، فالموقع مش بيتسطّب. ووسم [[apple-mobile-web-app-capable]] قديم.

والفولدر كان مليان عشرات الـ screenshots جنب الكود. حطهم في فولدر لوحدهم أو في .gitignore.`
          },
          teach: R`## الأول: ٣ خطوات في ترمنالين

1. سيرفر صغير يخدم فولدر الموقع (ترمنال لوحده، لأنه بيفضل شغال).
2. من ترمنال تاني: Playwright يصوّر الصفحة بـ ٣ مقاسات.
3. لو المتصفح ماسك نسخة قديمة: سطر JavaScript في الـ Console يشيل الـ service worker.

جربت ده على ويندوز: موقع صغير فيه [[index.html]] و [[manifest.json]] و [[sw.js]]، و Python 3.14، و Playwright 1.63.

---

## ١. السيرفر

### [[cd site]]

ادخل الفولدر اللي فيه [[index.html]]. السيرفر هيخدم الفولدر اللي انت واقف فيه.

### [[python -m http.server 8791]]

- [[python -m]] شغّل module من مكتبة Python الجاهزة كأنه برنامج (m = module).
- [[http.server]] سيرفر ملفات static جاي مع Python، مفيش تسطيب.
- [[8791]] البورت. أي رقم فاضي، بعيد عن 3000 و 8000 المشهورين.

~~~text الناتج
Serving HTTP on :: port 8791 (http://[::]:8791/) ...
::1 - - [07/Oct/2026 16:47:25] "GET / HTTP/1.1" 200 -
~~~

- [[::]] يعني سامع على كل الواجهات (IPv6 و IPv4).
- كل طلب بيظهر سطر: مين طلب ([[::1]] = localhost بـ IPv6)، والوقت، والطلب، والـ status ([[200]] = تمام).

السيرفر بيفضل شغال لحد ما تدوس Ctrl+C، عشان كده الخطوات الجاية في ترمنال تاني.

### ليه مش تفتح الملف بدبل كليك؟

دبل كليك بيفتحه بـ [[file:///C:/...]]، والمتصفح مبيسجّلش service worker غير على [[https]] أو [[localhost]]. جربت أسجّله من [[file://]]:

~~~text الناتج
Failed to register a ServiceWorker: The URL protocol of the current origin ('null') is not supported.
~~~

ومن [[http://localhost:8791]] الـ Console طبع:

~~~text الناتج
SW registered http://localhost:8791/
~~~

---

## ٢. الصور

### [[npx playwright install chromium]]

[[npx playwright]] بيشغّل أداة Playwright (وبينزّلها لو مش موجودة). [[install chromium]] بينزّل نسخة Chromium خاصة بيه، مش Chrome اللي عندك:

~~~text الناتج (مختصر)
Downloading Chrome Headless Shell 153.0.8010.12 (playwright chromium-headless-shell v1243)
Chrome Headless Shell ... downloaded to ...\ms-playwright\chromium_headless_shell-1243
~~~

ده بيحصل **مرة واحدة**، والنسخة بتتحفظ في [[%LOCALAPPDATA%\ms-playwright]] (على لينكس [[~/.cache/ms-playwright]]). وخد بالك إنها كبيرة: الفولدر عندي بقى حوالي 700MB بعد التنزيل. (أنا حطيته في فولدر مؤقت بمتغير [[PLAYWRIGHT_BROWSERS_PATH]] ومسحته بعد التجربة.)

### [[npx playwright screenshot --viewport-size "1440,900" http://localhost:8791 shot-desktop.png]]

| الحتة | معناها |
|---|---|
| [[screenshot]] | افتح الصفحة في متصفح من غير شاشة (headless) وصوّرها |
| [[--viewport-size "1440,900"]] | مقاس الشاشة: عرض 1440 وطول 900 بكسل. بين علامتين تنصيص عشان الفاصلة متتفهمش غلط |
| [[http://localhost:8791]] | الصفحة |
| [[shot-desktop.png]] | اسم الصورة |

~~~text الناتج
Navigating to http://localhost:8791
Capturing screenshot into shot-desktop.png
~~~

### التلات مقاسات

قريت عرض وطول كل صورة من ملف الـ PNG نفسه:

~~~text مقاسات الصور
shot-desktop.png  1440 × 900
shot-tablet.png    800 × 1000
shot-mobile.png    390 × 1482
~~~

- 1440 عرض لابتوب شائع، و 800 تابلت، و 390 عرض iPhone 12 و 13 و 14 بالـ CSS pixels.
- الموبايل طوله 1482 مش 844، ليه؟ بسبب [[--full-page]]: صوّر الصفحة **كلها** بالطول، مش اللي باين في الشاشة بس. الكروت اللي كانت جنب بعض على الديسكتوب نزلت تحت بعض على 390، فالصفحة طولت.

### [[echo "shot-*.png" >> .gitignore]]

- [[echo "..."]] اطبع النص ده.
- [[>>]] ضيفه في **آخر** الملف (لو [[>]] واحدة كان هيمسح الملف ويكتب السطر لوحده).
- [[shot-*.png]] النجمة يعني أي حاجة، فكل الصور اللي بتبدأ بـ [[shot-]] git هيتجاهلها.

---

## ٣. الـ service worker الماسك في القديم

~~~text الكود (في Console المتصفح)
navigator.serviceWorker.getRegistrations().then(rs => rs.forEach(r => r.unregister()))
~~~

فكّه من الشمال:

- [[navigator.serviceWorker]] واجهة المتصفح للـ service workers.
- [[.getRegistrations()]] هات كل الـ service workers المتسجلة للموقع ده. بترجع Promise (نتيجة هتيجي بعدين).
- [[.then(rs => ...)]] لما النتيجة تيجي، حطها في [[rs]] (قايمة).
- [[rs.forEach(r => r.unregister())]] لكل واحد، الغي تسجيله.

جربته بـ Playwright على نفس الصفحة:

~~~text الناتج
regs: 1
unregister: [ true ]
regs after: 0
~~~

كان فيه واحد متسجّل، اتلغى ([[true]])، وبقى صفر. بعدها اعمل refresh والصفحة تيجي من السيرفر. ده حل وقتي لجهازك، لكن الزوار محتاجين اسم كاش جديد في [[sw.js]].

---

## الخلاصة

| الخطوة | الأمر |
|---|---|
| سيرفر للفولدر | [[python -m http.server 8791]] |
| المتصفح (مرة واحدة) | [[npx playwright install chromium]] |
| صورة بمقاس | [[npx playwright screenshot --viewport-size "W,H" URL file.png]] |
| الصفحة كلها بالطول | [[--full-page]] |
| شيل الـ SW القديم | [[getRegistrations()]] ثم [[unregister()]] |

والـ PWA لازم تتجرّب من [[localhost]] أو [[https]]، عمرها ما هتشتغل من [[file://]].`,
          lines: [
            "ادخل فولدر الموقع.",
            "سيرفر static على 8791.",
            "نزّل المتصفح بتاع Playwright (مرة واحدة).",
            "صورة بمقاس ديسكتوب.",
            "صورة بمقاس تابلت.",
            "صورة موبايل بطول الصفحة كلها.",
            "متدخّلش الصور في git."
          ],
          sol: R`جربت الـ [[npx playwright screenshot]] على سيرفر محلي وطبع [[Navigating to http://localhost:8791]] و [[Capturing screenshot into shot-mobile.png]]. هتلاقي ٣ صور: [[shot-desktop.png]] بـ 1440×900، و [[shot-tablet.png]] بـ 800×1000، و [[shot-mobile.png]] بعرض 390 وطول الصفحة كلها (بسبب [[--full-page]]).

على 360×640 اللي بيتكسر عادةً: عنصر بعرض ثابت بيعمل سكرول أفقي، عنوان طويل بيخرج بره الشاشة، أزرار جنب بعض بتتزنق، أو صورة من غير [[max-width: 100%]]. ولو الصفحة كلها طالعة صغيرة جدًا، يبقى ناقص [[<meta name="viewport" content="width=device-width, initial-scale=1">]].

لو طلع [[Executable doesn't exist]] يبقى نسيت [[npx playwright install chromium]]. و [[echo "shot-*.png" >> .gitignore]] عشان الصور ماتترفعش. ولو عدّلت الصفحة وفضلت شايف القديم في المتصفح، ده الـ service worker، والسطر اللي في آخر المثال بيشيله.`
        },
        {
          cmd: "shots.ps1",
          title: "صوّر صفحات موقعك بـ Chrome من غير أي مكتبة",
          desc: R`Chrome نفسه يقدر يصوّر صفحة من غير ما يفتح شباك: [[--headless=new]] و [[--screenshot]]. السكربت ده بيعدّي على قايمة صفحات، كل واحدة بطول مختلف، ويقولك أنهي صورة نجحت.

مفيش npm install ولا Playwright، و Chrome موجود أصلًا. ومعاه تتعلم hashtables و foreach و [[Start-Process -Wait]] في شغل حقيقي.`,
          example: R`$outDir = Join-Path $env:TEMP "shots"
New-Item -ItemType Directory -Force $outDir | Out-Null
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chrome)) { $chrome = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" }
$targets = @(
  @{ file = "01_home.png";     url = "http://localhost:3000/";         h = 950 },
  @{ file = "02_checkout.png"; url = "http://localhost:3000/checkout"; h = 900 },
  @{ file = "03_contact.png";  url = "http://localhost:3000/contact";  h = 1000 }
)
foreach ($t in $targets) {
  $out = Join-Path $outDir $t.file
  Remove-Item $out -ErrorAction SilentlyContinue
  $chromeArgs = @("--headless=new", "--disable-gpu", "--no-first-run",
                  "--user-data-dir=$env:TEMP\shot-profile",
                  "--window-size=1440,$($t.h)", "--virtual-time-budget=4000",
                  "--screenshot=$out", $t.url)
  Start-Process $chrome -ArgumentList $chromeArgs -Wait
  if (Test-Path $out) { Write-Host "OK   $($t.file)" } else { Write-Host "FAIL $($t.file)" }
}
Invoke-Item $outDir`,
          try: "شغّل أي موقع على localhost:3000 وعدّل الـ targets لصفحاتك، وشغّل السكربت. بعدين غيّر 1440 لـ 390 وشوف نسخة الموبايل.",
          flag: "script",
          deep: {
            why: "محتاج صور لصفحاتك قبل الرفع، أو للـ README، أو تبعتها لعميل. تسطيب Playwright أو Puppeteer لحاجة زي دي تقيل، و Chrome على جهازك يقدر يعملها لوحده.",
            how: R`[[@( @{...}, @{...} )]] مصفوفة من hashtables: كل صفحة ليها اسم ملف ورابط وطول. و [[$t.file]] بيقرا القيمة من الـ hashtable.

[[--headless=new]] وضع headless الجديد (نفس محرك Chrome العادي). [[--user-data-dir]] بروفايل منفصل، فمش هيتخانق مع Chrome المفتوح عندك ولا يستخدم الـ extensions بتاعتك. [[--virtual-time-budget=4000]] بيدّي الصفحة ٤ ثواني «افتراضية» تحمّل الخطوط والصور والـ JavaScript قبل التصوير.

[[$($t.h)]] جوه string معناها «احسب التعبير ده وحطه هنا». من غير [[$( )]] PowerShell هيكتب [[$t]] وبعدين [[.h]] كنص.

[[Start-Process -Wait]] بيستنى Chrome يخلص قبل ما يكمّل، فـ [[Test-Path]] بعدها بيشوف الصورة فعلًا. و [[Invoke-Item]] بيفتح الفولدر في Explorer.`,
            when: "صور سريعة من غير تسطيب أي حاجة. لو محتاج تضغط زراير أو تسجّل دخول قبل الصورة، ده شغل Playwright. أساسيات PowerShell في تاب PowerShell.",
            mistakes: R`في مشروع حقيقي كانت المسارات كاملة فيها اسم اليوزر ([[C:\Users\you\...]])، فالسكربت ميشتغلش على جهاز تاني. [[$env:TEMP]] بدلها.

وكان [[--no-sandbox]] موجود، ومش محتاجه على ويندوز (ده بيقفل حماية).

ومكانش بيمسح الصورة القديمة قبل ما يصوّر، فلو التصوير فشل [[Test-Path]] بيلاقي الصورة القديمة ويقول OK. عشان كده [[Remove-Item]] الأول.

ونسخة تانية كانت بتشغّل Chrome بـ [[&]] من غير [[-Wait]] وبتعتمد على [[Start-Sleep]]. واسم المتغير كان [[$args]]، ودا متغير محجوز في PowerShell فيه arguments السكربت نفسه.`
          },
          teach: R`## الأول: الفكرة في سطر

Chrome نفسه عنده وضع من غير شباك (headless) يقدر يفتح رابط ويحفظ صورة ويقفل. السكربت ده بيعمل كده لكل صفحة في قايمة، وبيتأكد إن الصورة اتعملت فعلًا.

جربته في PowerShell 7.6 و Windows PowerShell 5.1 مع Chrome 154، على سيرفر محلي على 3000 فيه ٣ صفحات ([[/]] و [[/checkout]] و [[/contact]]). الاتنين طلّعوا نفس النتيجة، والسكربت كله خلص في حوالي ٣ ثواني.

---

## ١. فولدر الصور

~~~powershell
$outDir = Join-Path $env:TEMP "shots"
New-Item -ItemType Directory -Force $outDir | Out-Null
~~~

- [[$outDir]] متغير. في PowerShell أي متغير بيبدأ بـ [[$]].
- [[$env:TEMP]] متغير البيئة [[TEMP]]: فولدر الملفات المؤقتة بتاع اليوزر ([[C:\Users\ali\AppData\Local\Temp]]). موجود على أي ويندوز، فالسكربت يشتغل على أي جهاز من غير ما تكتب اسمك.
- [[Join-Path]] بيلزق جزئين مسار بالـ [[\]] الصح. أحسن من [[$env:TEMP + "\shots"]] لأنه مبيغلطش في الشرط.
- [[New-Item -ItemType Directory]] اعمل فولدر. و [[-Force]]: لو موجود متعملش خطأ.
- [[| Out-Null]] [[New-Item]] بيطبع معلومات الفولدر اللي عمله، و [[Out-Null]] بيرميها.

---

## ٢. مكان Chrome

~~~powershell
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chrome)) { $chrome = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" }
~~~

- [[Test-Path]] بيرجع [[True]] لو المسار موجود و [[False]] لو لأ.
- [[-not (...)]] اعكس النتيجة. يعني «لو Chrome **مش** في المكان الأول».
- [[Program Files (x86)]] المكان اللي كانت بتتسطب فيه نسخة الـ 32 بت في الأجهزة القديمة.

---

## ٣. قايمة الصفحات: array من hashtables

~~~powershell
$targets = @(
  @{ file = "01_home.png";     url = "http://localhost:3000/";         h = 950 },
  @{ file = "02_checkout.png"; url = "http://localhost:3000/checkout"; h = 900 },
  @{ file = "03_contact.png";  url = "http://localhost:3000/contact";  h = 1000 }
)
~~~

- [[@( ... )]] array: قايمة عناصر مفصولة بفواصل.
- [[@{ ... }]] hashtable: مجموعة «مفتاح = قيمة» مفصولة بـ [[;]]. هنا كل صفحة ليها ٣ مفاتيح:

| المفتاح | معناه |
|---|---|
| [[file]] | اسم الصورة. الأرقام [[01_]] في الأول عشان تترتّب في الفولدر |
| [[url]] | الصفحة |
| [[h]] | طول النافذة بالبكسل |

ولما تكتب [[$t.file]] بتجيب القيمة بتاعة المفتاح [[file]] من الـ hashtable اللي في [[$t]].

---

## ٤. اللوب: [[foreach ($t in $targets) { ... }]]

لكل عنصر في [[$targets]]، حطه في [[$t]] ونفّذ اللي بين القوسين.

### [[$out = Join-Path $outDir $t.file]]

المسار الكامل للصورة، مثلًا [[C:\Users\ali\AppData\Local\Temp\shots\01_home.png]].

### [[Remove-Item $out -ErrorAction SilentlyContinue]]

امسح الصورة لو موجودة من مرة قبل كده. و [[-ErrorAction SilentlyContinue]] عشان أول مرة الملف مش موجود، و [[Remove-Item]] هيشتكي.

ليه؟ لأن الفحص في الآخر بيسأل «الملف موجود؟». لو الصورة القديمة لسه هناك والتصوير فشل، الفحص هيقول OK وهو كداب.

### الـ arguments بتاعة Chrome

~~~powershell
$chromeArgs = @("--headless=new", "--disable-gpu", "--no-first-run",
                "--user-data-dir=$env:TEMP\shot-profile",
                "--window-size=1440,$($t.h)", "--virtual-time-budget=4000",
                "--screenshot=$out", $t.url)
~~~

array فيه كل كلمة هتتبعت لـ Chrome. السطر ممكن يتكسر على أكتر من سطر لأن القوس لسه مفتوح.

| الـ flag | معناه |
|---|---|
| [[--headless=new]] | من غير شباك، بوضع headless الجديد (نفس Chrome العادي من جوه) |
| [[--disable-gpu]] | متستخدمش كارت الشاشة، أضمن في الوضع ده |
| [[--no-first-run]] | متعرضش شاشات «أول مرة» (welcome وغيره) |
| [[--user-data-dir=...\shot-profile]] | بروفايل منفصل في Temp، فمش بيلمس Chrome المفتوح عندك ولا الـ extensions بتاعتك. (عندي بقى حوالي 12MB) |
| [[--window-size=1440,950]] | مقاس النافذة = مقاس الصورة |
| [[--virtual-time-budget=4000]] | ادّي الصفحة ٤٠٠٠ ملي ثانية «افتراضية» تحمّل وتشغّل JavaScript قبل التصوير |
| [[--screenshot=$out]] | صوّر واحفظ هنا |
| [[$t.url]] | الصفحة (آخر حاجة) |

### [[$($t.h)]]: ليه الـ [[$( )]]؟

جوه string بعلامتين تنصيص، PowerShell بيبدّل المتغيرات البسيطة لوحده: [[$out]] تمام. لكنه بيقف عند النقطة. فلو كتبت [[1440,$t.h]] هيبدّل [[$t]] بس ويسيب [[.h]] زي ما هي. جربتها:

~~~text الناتج
--window-size=1440,System.Collections.Hashtable.h
--window-size=1440,950
~~~

الأول من غير [[$( )]] والتاني بيها. [[$( ... )]] معناها «احسب التعبير ده كله وحط النتيجة هنا»، فتطلع [[1440,950]].

### [[Start-Process $chrome -ArgumentList $chromeArgs -Wait]]

- [[Start-Process]] شغّل برنامج.
- [[-ArgumentList]] الـ arguments بتاعته (الـ array اللي عملناه).
- [[-Wait]] **استنى** لحد ما البرنامج يقفل قبل ما تكمّل. من غيرها السطر اللي بعده هيدوّر على الصورة قبل ما Chrome يلحق يحفظها.

### الفحص

~~~powershell
if (Test-Path $out) { Write-Host "OK   $($t.file)" } else { Write-Host "FAIL $($t.file)" }
~~~

الصورة موجودة؟ اطبع OK، وإلا FAIL. والمسافات بعد [[OK]] عشان الأسامي تيجي تحت بعض.

~~~text الناتج
OK   01_home.png
OK   02_checkout.png
OK   03_contact.png
~~~

قريت مقاسات الصور من ملفات الـ PNG:

~~~text مقاسات الصور
01_home.png      1440 × 950
02_checkout.png  1440 × 900
03_contact.png   1440 × 1000
~~~

كل صورة طولها الـ [[h]] بتاعها بالظبط. ولما قفلت السيرفر وشغّلت السكربت تاني:

~~~text الناتج
FAIL 01_home.png
FAIL 02_checkout.png
FAIL 03_contact.png
~~~

Chrome مبيحفظش صورة لصفحة مفيش سيرفر يرد عليها، والـ [[Remove-Item]] اللي فوق خلّى الفحص صادق.

---

## ٥. [[Invoke-Item $outDir]]

[[Invoke-Item]] «افتح الحاجة دي بالبرنامج الافتراضي بتاعها». لفولدر يعني Explorer، ولصورة يعني عارض الصور.

---

## الخلاصة

| الخطوة | الأداة |
|---|---|
| فولدر من غير اسمك | [[Join-Path $env:TEMP]] + [[New-Item -Force]] |
| Chrome فين | [[Test-Path]] على المكانين |
| الصفحات | array من hashtables، و [[$t.file]] |
| فحص صادق | [[Remove-Item]] قبل، و [[Test-Path]] بعد |
| حساب جوه string | [[$($t.h)]] |
| استنى Chrome | [[Start-Process -Wait]] |

ولو عايز موبايل غيّر [[1440]] لـ [[390]]، بس ده بيغيّر حجم النافذة بس، مش device emulation كامل (مفيش touch ولا user agent موبايل).`,
          lines: [
            "فولدر الصور في Temp، مش مسار فيه اسمك.",
            "اعمله لو مش موجود، واسكت.",
            "مكان Chrome العادي.",
            "ولو مش هناك، جرّب نسخة الـ 32 بت.",
            "قايمة الصفحات:",
            "الرئيسية بطول 950.",
            "صفحة الدفع.",
            "صفحة التواصل.",
            "قفلة القايمة.",
            "لف على كل صفحة.",
            "مسار الصورة.",
            "امسح القديمة عشان الفحص يبقى صادق.",
            "arguments بتاعة Chrome: من غير شباك.",
            "بروفايل منفصل.",
            "المقاس، ووقت للتحميل.",
            "فين يحفظ، وأي رابط.",
            "شغّل Chrome واستنى يخلص.",
            "الصورة اتعملت؟",
            "قفلة الـ foreach.",
            "افتح الفولدر."
          ],
          sol: R`السكربت بيطبع سطر لكل صفحة: [[OK   01_home.png]] لو الصورة اتعملت، و [[FAIL ...]] لو لأ، وفي الآخر بيفتح فولدر [[%TEMP%\shots]]. كل صورة عرضها 1440 وطولها الـ [[h]] اللي في الـ target.

لما تغيّر [[1440]] لـ [[390]] هتاخد نسخة الموبايل، بس خد بالك إن [[--window-size]] بيغيّر حجم النافذة بس، مش بيعمل device emulation كامل (مفيش touch ولا user agent موبايل). فالنتيجة قريبة من Device Toolbar على Responsive، مش iPhone حقيقي.

لو كل الصفحات طلعت FAIL، غالبًا الموقع مش شغال على 3000 (جربت كده: Chrome مبيحفظش صورة لصفحة مفيهاش سيرفر، فالتلاتة طلعوا FAIL)، أو مسار Chrome غلط (غيّر [[$chrome]]). ولو الصورة بيضا أو ناقصة، زوّد [[--virtual-time-budget]] عشان JavaScript يلحق يرسم. (جربته في PowerShell 7.6 و Windows PowerShell 5.1 مع Chrome 154، والتلات صور طلعوا بالمقاسات 1440×950 و 1440×900 و 1440×1000.)`
        },
        {
          cmd: "launch.sh / launch.bat",
          title: "زرار تشغيل لتطبيق Electron على لينكس وويندوز",
          desc: R`نفس المنطق بلغتين: اتأكد إن Node موجود و .env موجود، سطّب المكتبات أول مرة، ابني الواجهة لو الكود أحدث من آخر build، وشغّل Electron.

مقارنة مباشرة بين bash و batch: [[test -f .env]] قصاد [[if not exist .env]]، و [[||]] في الاتنين معناها «لو فشل».`,
          example: R`#!/usr/bin/env bash
# launch.sh (لينكس)
set -euo pipefail
cd "$(dirname "$0")"
command -v node >/dev/null || { echo "install Node first"; exit 1; }
[ -f .env ] || { echo ".env missing: cp .env.example .env"; exit 1; }
[ -d node_modules ] || npm install
SB=node_modules/electron/dist/chrome-sandbox
[ -e "$SB" ] || node node_modules/electron/install.js
if [ "$(stat -c '%u %a' "$SB")" != "0 4755" ]; then
  sudo chown root:root "$SB" && sudo chmod 4755 "$SB"
fi
if [ ! -f dist/index.html ] || [ -n "$(find src -newer dist/index.html -print -quit)" ]; then
  npx vite build
fi
exec npx electron .
REM launch.bat (ويندوز): نفس الخطوات
@echo off
cd /d "%~dp0"
where node >nul 2>&1 || ( echo install Node first & pause & exit /b 1 )
if not exist .env ( echo .env missing & pause & exit /b 1 )
if not exist node_modules ( call npm install || (pause & exit /b 1) )
call npx vite build || (pause & exit /b 1)
npx electron .`,
          try: "في مشروع Electron + Vite تجريبي حط الملفين، وشغّل launch.bat بدبل كليك. امسح .env وشغّله تاني وشوف الرسالة. على لينكس عدّل ملف في src ولاحظ إنه بيعيد البناء، وشغّله تاني من غير تعديل ولاحظ إنه مبيبنيش.",
          flag: "script",
          deep: {
            why: "تطبيق Electron محتاج كذا خطوة قبل ما يقوم (مكتبات، build للواجهة، .env). لو اعتمدت إنك فاكرها، هتنسى واحدة وتضيّع وقت على «شاشة بيضا». الـ launcher بيعملها بالترتيب ويقف برسالة واضحة.",
            how: R`[[cd "$(dirname "$0")"]] و [[cd /d "%~dp0"]] نفس الفكرة: ادخل فولدر السكربت نفسه، فالدبل كليك أو التشغيل من أي مكان يشتغل.

[[command -v node]] و [[where node]] بيدوّروا على البرنامج في PATH.

chrome-sandbox على لينكس لازم يبقى ملك root وعليه setuid ([[4755]])، وإلا Electron يرفض يقوم. [[stat -c '%u %a']] بيطبع رقم المالك والصلاحيات، فنصلّحهم مرة واحدة بس. وفي نسخ Electron الجديدة (جربت 44) الـ [[npm install]] مبينزّلش البرنامج نفسه (بيتنزّل أول ما تشغّله)، فـ chrome-sandbox مبيبقاش موجود وقت الفحص؛ عشان كده [[node node_modules/electron/install.js]] الأول لو الملف مش موجود.

[[find src -newer dist/index.html -print -quit]] بيطبع أول ملف في src اتعدّل بعد آخر build ويقف. لو الناتج مش فاضي ([[-n]]) يبقى محتاج build.

[[exec]] بيستبدل الـ shell بـ Electron، فإشارة الإغلاق توصله هو مباشرة. وفي batch لازم [[call]] قبل npm و npx (دول ملفات .cmd) وإلا السكربت يخلص بعدهم ومايكملش.`,
            when: "أي تطبيق Electron أو أداة داخلية بتشغّلها كل يوم أو بتديها لحد مش مبرمج. أساسيات bash و CMD في تاباتهم، و Electron نفسه في تاب Desktop و Mobile.",
            mistakes: R`في مشروع حقيقي كانت نسخة bash من غير [[set -e]]، ولو node_modules مش موجودة مكانتش بتعمل [[npm install]]، فأول تشغيل على جهاز جديد يقع.

وفحص «الكود أحدث من الـ build» كان [[-nt]] على ملفين بس، فتعديل أي ملف تاني في src ميعملش rebuild والتطبيق يفضل قديم. [[find -newer]] بيشوف الفولدر كله.

والنسخة الـ bat كانت بتبني أول مرة بس، وبعد كده عمرها ما بتعيد البناء. هنا بتبني كل مرة (Vite سريع). ومكانش فيه فحص إن Node متسطب أصلًا.`
          },
          teach: R`## الأول: نفس الـ ٦ خطوات بلغتين

| الخطوة | bash (لينكس) | batch (ويندوز) |
|---|---|---|
| ادخل فولدر السكربت | [[cd "$(dirname "$0")"]] | [[cd /d "%~dp0"]] |
| Node موجود؟ | [[command -v node]] | [[where node]] |
| .env موجود؟ | [[[ -f .env ]]] | [[if not exist .env]] |
| المكتبات أول مرة | [[[ -d node_modules ] || npm install]] | [[if not exist node_modules (call npm install)]] |
| build للواجهة | لو src أحدث من dist بس | كل مرة |
| شغّل | [[exec npx electron .]] | [[npx electron .]] |

ولينكس ليه خطوة زيادة: صلاحيات [[chrome-sandbox]].

جربت نسخة bash في container لينكس ([[node:22-slim]]، Debian) بيوزر عادي معاه sudo، على مشروع Vite 8 + Electron 44 صغير. والـ container مفيهوش شاشة ولا مكتبات الواجهة، فـ Electron نفسه مش هيفتح؛ الخطوات اللي قبله كلها اشتغلت بجد. ونسخة batch اتجرّبت في CMD على ويندوز بنفس المشروع، مع تغيير آخر سطر لـ [[echo]] عشان مايفتحش شباك.

ومن التجربة طلع bug: Electron 44 مبينزّلش البرنامج نفسه مع [[npm install]]، فـ [[chrome-sandbox]] مكانش موجود وقت الفحص. عشان كده اتضاف سطر [[node node_modules/electron/install.js]] (تحت).

---

## نسخة bash سطر سطر

### [[#!/usr/bin/env bash]]

الـ shebang: أول سطر بيقول للنظام «شغّل الملف ده بـ bash». و [[/usr/bin/env bash]] بيدوّر على bash في PATH بدل ما يفترض مكانه.

### [[set -euo pipefail]]

| الحرف | معناه |
|---|---|
| [[-e]] | أي أمر يفشل يوقف السكربت |
| [[-u]] | متغير مش معرّف = خطأ (بدل ما يبقى فاضي في صمت) |
| [[-o pipefail]] | في [[a | b]]، لو [[a]] فشل الـ pipe كله يعتبر فشل |

### [[cd "$(dirname "$0")"]]

اقراه من جوه لبرة:

1. [[$0]] = مسار السكربت زي ما اتشغّل، مثلًا [[/home/dev/app/launch.sh]].
2. [[dirname]] بيشيل اسم الملف ويسيب الفولدر: [[/home/dev/app]].
3. [[$( ... )]] حط ناتج الأمر هنا.
4. [[cd]] ادخله.

جربت أشغّله وانا واقف في [[/tmp]] واشتغل عادي، لأنه دخل فولدره الأول. والتنصيص [[" "]] عشان لو المسار فيه مسافات.

### [[command -v node >/dev/null || { echo "install Node first"; exit 1; }]]

- [[command -v node]] بيطبع مسار [[node]] لو موجود في PATH، ويفشل لو لأ.
- [[>/dev/null]] ارمي المسار، مش محتاجينه.
- [[||]] «لو اللي قبلي فشل، نفّذ اللي بعدي».
- [[{ ...; ...; }]] مجموعة أوامر تتنفذ مع بعض (لازم مسافة بعد [[{]] و [[;]] قبل [[}]]).

### [[[ -f .env ] || { echo ".env missing: cp .env.example .env"; exit 1; }]]

[[[ -f .env ]]] اختبار: «فيه ملف عادي اسمه [[.env]]؟». لو لأ، اطبع إزاي تعمله واخرج. أول تشغيل عندي من غير [[.env]]:

~~~text الناتج
.env missing: cp .env.example .env
exit=1
~~~

### [[[ -d node_modules ] || npm install]]

[[-d]] = فيه **فولدر** بالاسم ده؟ لو مفيش، سطّب. فأول مرة بس:

~~~text الناتج
+ npm install
added 28 packages, and audited 29 packages in 21s
~~~

(السطور اللي بتبدأ بـ [[+]] ده [[bash -x]]: بيطبع كل أمر قبل ما ينفّذه. شغّلته كده عشان نشوف أنهي فرع اتنفّذ.)

### [[SB=node_modules/electron/dist/chrome-sandbox]]

متغير فيه المسار، عشان منكتبوش ٣ مرات. ومن غير مسافات حوالين [[=]]، وإلا bash يفهمها أمر اسمه [[SB]].

### [[[ -e "$SB" ] || node node_modules/electron/install.js]]

[[-e]] = موجود (أي نوع). لو البرنامج لسه متنزّلش، شغّل سكربت التنزيل اللي جاي مع مكتبة electron. السطر ده اتضاف بعد التجربة: من غيره أول تشغيل طلع:

~~~text الناتج (من غير السطر ده)
stat: cannot statx 'node_modules/electron/dist/chrome-sandbox': No such file or directory
chown: cannot access 'node_modules/electron/dist/chrome-sandbox': No such file or directory
...
+ exec npx electron .
Downloading Electron binary...
~~~

يعني الفحص اشتغل على ملف مش موجود، والبرنامج اتنزّل **بعده** لما [[npx electron]] اشتغل، فالصلاحيات متصلحتش أول مرة.

### الـ if بتاع الـ sandbox

~~~bash
if [ "$(stat -c '%u %a' "$SB")" != "0 4755" ]; then
  sudo chown root:root "$SB" && sudo chmod 4755 "$SB"
fi
~~~

- [[stat -c '%u %a']] بيطبع حاجتين: [[%u]] رقم المالك (UID)، و [[%a]] الصلاحيات بالأرقام.
- [[!= "0 4755"]] لو مش «root (رقمه 0) وصلاحيات 4755».
- [[chown root:root]] خلي المالك root والجروب root.
- [[chmod 4755]]: الـ [[4]] في الأول هي **setuid**: البرنامج يشتغل بصلاحيات مالكه (root) مهما مين شغّله. Electron محتاجها عشان يعمل الـ sandbox بتاعه على لينكس، وإلا بيرفض يقوم. و [[755]] الصلاحيات العادية (المالك يقرا ويكتب وينفّذ، والباقي يقرا وينفّذ).

~~~text الناتج أول مرة
++ stat -c '%u %a' node_modules/electron/dist/chrome-sandbox
+ '[' '1001 755' '!=' '0 4755' ']'
+ sudo chown root:root node_modules/electron/dist/chrome-sandbox
+ sudo chmod 4755 node_modules/electron/dist/chrome-sandbox
~~~

~~~text ls -l بعدها
-rwsr-xr-x 1 root root 15232 Jan  1  1980 .../chrome-sandbox
~~~

[[1001]] رقم اليوزر بتاعي (مش root)، وبعد التصليح الـ [[s]] مكان [[x]] في [[rws]] هي الـ setuid. وتاني مرة الشرط بقى [['0 4755' != '0 4755']] = غلط، فمفيش sudo.

### الـ if بتاع الـ build

~~~bash
if [ ! -f dist/index.html ] || [ -n "$(find src -newer dist/index.html -print -quit)" ]; then
  npx vite build
fi
~~~

شرطين بينهم [[||]]، وأي واحد فيهم كفاية:

1. [[[ ! -f dist/index.html ]]] = مفيش build خالص ([[!]] = عكس).
2. [[find src -newer dist/index.html -print -quit]]: دوّر في [[src]] على أي ملف **أحدث** من [[dist/index.html]] ([[-newer]])، اطبعه ([[-print]])، واقف عند أول واحد ([[-quit]]، مش محتاجين الباقي). و [[[ -n "..." ]]] = النص ده مش فاضي. يعني «فيه ملف اتعدّل بعد آخر build».

و [[npx vite build]] بيبني الواجهة في [[dist/]]:

~~~text الناتج
vite v8.3.3 building client environment for production...
✓ 4 modules transformed.
dist/index.html                0.13 kB │ gzip: 0.12 kB
dist/assets/index-_1mdX_qN.js  0.72 kB │ gzip: 0.42 kB
✓ built in 53ms
~~~

تاني تشغيل من غير تعديل: [[find]] رجّع فاضي فمفيش build:

~~~text الناتج
++ find src -newer dist/index.html -print -quit
+ '[' -n '' ']'
+ exec npx electron .
~~~

وبعد ما عملت [[touch src/main.js]] (غيّر وقت تعديل الملف) الـ build رجع اشتغل.

### [[exec npx electron .]]

- [[npx electron .]] شغّل Electron على الفولدر الحالي ([[.]])، فيقرا [[main]] من [[package.json]].
- [[exec]] بدّل الـ bash بـ Electron بدل ما يشغّله كابن. فمفيش bash مستني في الخلفية، و Ctrl+C أو إشارة القفل بتوصل لـ Electron على طول.

في الـ container طلع:

~~~text الناتج
error while loading shared libraries: libglib-2.0.so.0: cannot open shared object file
~~~

ده متوقع: مفيش واجهة رسومية في الـ container. على لينكس desktop المكتبات دي موجودة.

---

## نسخة batch سطر سطر

### [[@echo off]]

batch بيطبع كل أمر قبل ما ينفّذه. [[echo off]] يوقف ده، و [[@]] تخفي السطر ده نفسه.

### [[cd /d "%~dp0"]]

- [[%0]] مسار السكربت (زي [[$0]]).
- [[%~dp0]]: [[~]] شيل التنصيص، و [[d]] الدرايف، و [[p]] المسار. يعني «درايف وفولدر السكربت»، وبيخلص بـ [[\]].
- [[/d]] غيّر الدرايف كمان. من غيرها [[cd]] لو السكربت على [[D:]] وانت على [[C:]] مش هيروح.

جربته وانا واقف في [[C:\]] والسكربت في فولدر تاني، واشتغل.

### [[where node >nul 2>&1 || ( echo install Node first & pause & exit /b 1 )]]

- [[where node]] زي [[command -v]]: فين [[node]]؟
- [[>nul 2>&1]] ارمي المخرجات والأخطاء ([[nul]] هو [[/dev/null]] بتاع ويندوز).
- [[||]] لو فشل.
- [[( ... & ... & ... )]] كذا أمر ورا بعض. [[&]] في CMD = نفّذ اللي بعدي (زي [[;]] في bash).
- [[pause]] اطبع [[Press any key to continue]] واستنى. مهمة للدبل كليك: من غيرها الشباك يقفل قبل ما تقرا الرسالة.
- [[exit /b 1]] اخرج من السكربت ده ([[/b]] = batch بس، مش CMD كله) برقم 1.

### [[if not exist .env ( echo .env missing & pause & exit /b 1 )]]

[[if not exist]] = لو الملف مش موجود. أول تشغيل:

~~~text الناتج
.env missing
Press any key to continue . . .
exit=1
~~~

### [[if not exist node_modules ( call npm install || (pause & exit /b 1) )]]

### ليه [[call]]؟

[[npm]] و [[npx]] على ويندوز ملفات [[.cmd]] (batch برضه). ولما batch يشغّل batch تاني **من غير** [[call]]، التحكم بيروح له ومبيرجعش. جربت سكربتين، واحد فيه [[npx vite --version]] من غير call والتاني بـ call، وبعدها [[echo after npx]]:

~~~text من غير call
vite/8.3.3 win32-x64 node-v24.19.0
~~~

~~~text مع call
vite/8.3.3 win32-x64 node-v24.19.0
after npx
~~~

من غير [[call]] السطر اللي بعده **عمره ما اتنفّذ**.

### [[call npx vite build || (pause & exit /b 1)]]

ابني كل مرة (مفيش [[find -newer]] سهل في CMD، و Vite سريع). ولو فشل، استنى واخرج.

~~~text الناتج (مع .env)
added 28 packages, and audited 29 packages in 16s
vite v8.3.3 building client environment for production...
✓ 4 modules transformed.
dist/index.html                0.13 kB │ gzip: 0.12 kB
✓ built in 97ms
~~~

### [[npx electron .]]

آخر سطر، فمش محتاج [[call]]: مفيش حاجة بعده ترجعلها.

---

## الخلاصة

| | bash | batch |
|---|---|---|
| فولدر السكربت | [[$(dirname "$0")]] | [[%~dp0]] |
| «لو فشل» | [[||]] | [[||]] |
| كذا أمر | [[{ a; b; }]] | [[( a & b )]] |
| ملف موجود؟ | [[[ -f x ]]] | [[if exist x]] |
| تشغيل npm من سكربت | عادي | [[call npm]] |
| الشباك ميقفلش | — | [[pause]] |

وعلى لينكس: [[chrome-sandbox]] لازم [[root]] و [[4755]]، واتأكد إن Electron اتنزّل قبل ما تفحصه.`,
          lines: [
            "وقّف عند أي خطأ أو متغير مش معرّف.",
            "ادخل فولدر السكربت.",
            "Node موجود؟",
            ".env موجود؟",
            "سطّب المكتبات لو مش موجودة.",
            "مسار chrome-sandbox.",
            "لو برنامج Electron لسه متنزّلش (في نسخ Electron الجديدة، زي 44، بيتنزّل أول تشغيل مش مع npm install)، نزّله دلوقتي عشان الفحص اللي بعده يلاقي الملف.",
            "لو مش ملك root بصلاحية 4755:",
            "صلّحه (sudo مرة واحدة).",
            "قفلة الـ if.",
            "مفيش build، أو فيه ملف في src أحدث منه:",
            "ابني الواجهة.",
            "قفلة الـ if.",
            "شغّل Electron مكان الـ shell.",
            "اخفي الأوامر نفسها من الشاشة.",
            "ادخل فولدر السكربت (حتى لو على درايف تاني).",
            "Node موجود؟",
            ".env موجود؟",
            "سطّب أول مرة.",
            "ابني الواجهة.",
            "شغّل Electron."
          ],
          sol: R`من غير [[.env]]، [[launch.bat]] بيطبع [[.env missing]] ويستنى ([[pause]]) عشان تلحق تقرا، و [[launch.sh]] بيطبع [[.env missing: cp .env.example .env]] ويخرج بـ 1. جربت نفس الفحص في سكربت شبهه ده بالظبط اللي حصل.

على لينكس، أول تشغيل ممكن يطلب باسورد sudo مرة واحدة عشان صلاحيات [[chrome-sandbox]] (لازم [[0 4755]]). جربت الشرط ده وغيّر الصلاحية من [[0 755]] لـ [[0 4755]]. وبعد كده:
لو عدّلت ملف في [[src/]]، [[find src -newer dist/index.html]] بيلاقيه، فبتشوف [[vite build]] شغال قبل ما النافذة تفتح. ولو ماعدّلتش حاجة، بيفتح على طول من غير build.

[[launch.bat]] بيعمل [[vite build]] كل مرة، لأن مفيش [[find -newer]] سهل في CMD. ولو الدبل كليك على [[launch.sh]] فتحه في محرر نصوص، اعمل [[chmod +x launch.sh]] وفعّل «Run as program» أو شغّله من الترمنال.`
        },
        {
          cmd: "Capacitor: موقع لـ APK",
          title: "تطبيق أندرويد من موقع React على جهازك",
          desc: R`Capacitor بياخد الموقع بعد الـ build (فولدر dist) ويحطه جوه تطبيق أندرويد أو آيفون. الخطوات: build، و sync، وتبني APK من الترمنال بـ gradlew، وتولّد الأيقونات من صورة واحدة.

والـ APK ده debug: ينفع للتجربة على موبايلك، مش للتوزيع.`,
          example: R`npm install
npm run build
npx cap sync android
npx @capacitor/assets generate --android --iconBackgroundColor '#0f172a' --splashBackgroundColor '#0f172a'
npx cap open android
cd android && ./gradlew assembleDebug && cd ..
# الناتج: android/app/build/outputs/apk/debug/app-debug.apk
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
# iOS: على Mac عليه Xcode بس
npm install @capacitor/ios
npx cap add ios
npx cap sync ios
npx cap open ios`,
          try: "في مشروع Vite + React تجريبي اعمل [[npm i @capacitor/core @capacitor/cli @capacitor/android]] و [[npx cap init]] و [[npx cap add android]]، وبعدين الخطوات دي، ونزّل الـ APK على موبايلك بـ adb (فعّل USB debugging الأول).",
          deep: {
            why: "عندك موقع شغال وعايز تطبيق على الموبايل من غير ما تكتب كود أندرويد. Capacitor بيلف الموقع في WebView ويديك وصول للكاميرا والإشعارات وغيرهم.",
            how: R`[[npm run build]] بيعمل dist. [[cap sync android]] بينسخ dist جوه مشروع الأندرويد (فولدر android/) وبيحدّث الـ plugins. أي تعديل في الموقع محتاج build و sync تاني، وإلا التطبيق يفضل على النسخة القديمة.

[[cap open android]] بيفتح Android Studio لو عايز تشتغل من هناك. بس مش لازم: [[./gradlew assembleDebug]] بيبني APK من الترمنال (على PowerShell [[.\gradlew.bat assembleDebug]]).

[[@capacitor/assets generate]] بياخد [[assets/icon.png]] (1024×1024) ويعمل كل مقاسات الأيقونة وشاشة البداية.

[[adb install -r]] بيسطّب على موبايل موصّل بـ USB، و [[-r]] يعني حدّث فوق النسخة الموجودة.

وفي مشروع حقيقي كان الـ APK بيترفع على السيرفر في فولدر downloads يتخدم من Nginx عشان الموظفين ينزّلوه: [[scp myapp.apk deploy@203.0.113.10:/opt/myapp/downloads/]].`,
            when: "تطبيق داخلي لموظفين، أو أول نسخة موبايل من موقع موجود. بناء الـ APK الموقّع أوتوماتيك في درس «android.yml» في المستوى التالت، والأوامر لوحدها في تاب Desktop و Mobile.",
            mistakes: R`في مشروع حقيقي كانت نسخة الـ debug بتتوزّع على الموظفين. دي مش موقّعة بمفتاح ثابت، فمينفعش تتحدّث فوقها نسخة release موقّعة بعدين: لازم يمسحوا التطبيق الأول.

ولما فولدر downloads اتضاف لـ compose بعد ما الـ container كان شغال، مكانش بيتركّب لحد [[docker compose up -d --force-recreate frontend]].

والتوزيع من برّه Play Store محتاج «تثبيت من مصادر غير معروفة» على كل موبايل، فجهّز ده للموظفين.`
          },
          teach: R`## الأول: الفكرة

Capacitor مش بيحوّل الـ React لكود أندرويد. هو بيعمل مشروع أندرويد صغير فيه **WebView** (متصفح من غير شريط عنوان) بيفتح ملفات موقعك اللي في [[dist]]. فالشغل كله: ابني الموقع، وانسخه جوه مشروع الأندرويد، وابني الـ APK.

~~~text
src/  →  npm run build  →  dist/  →  npx cap sync  →  android/app/src/main/assets/public/  →  gradlew  →  app-debug.apk
~~~

جربت جزء Capacitor على ويندوز بمشروع Vite صغير و Capacitor 8.5.2 ([[@capacitor/cli]]). أما [[gradlew]] و [[adb]] محتاجين Java و Android SDK ومش متسطّبين هنا، فكلامهم من توثيق Capacitor و Android، ومكتوب كده تحت.

قبل المثال المشروع لازم يبقى فيه Capacitor ومنصة أندرويد (ده في الـ try):

~~~bash
npm i @capacitor/core @capacitor/cli @capacitor/android
npx cap init MyApp com.example.myapp --web-dir dist
npx cap add android
~~~

- [[cap init]] بياخد اسم التطبيق، والـ app id (اسم فريد بالشكل المقلوب للدومين، وده اللي بيعرّف التطبيق على الموبايل وفي Play Store)، و [[--web-dir]] فولدر الـ build. وبيعمل:

~~~text capacitor.config.json
{
  "appId": "com.example.myapp",
  "appName": "MyApp",
  "webDir": "dist"
}
~~~

- [[cap add android]] بيعمل فولدر [[android/]] (مشروع Android Studio كامل):

~~~text الناتج
√ Adding native android project in android in 116.42ms
√ Copying web assets from dist to android\app\src\main\assets\public in 4.69ms
[success] android platform added!
~~~

---

## ١. [[npm install]]

سطّب المكتبات من [[package.json]]، ومنها [[@capacitor/cli]] اللي [[npx cap]] بيشغّله.

~~~bash
npx cap --version
~~~

~~~text الناتج
8.5.2
~~~

## ٢. [[npm run build]]

بيشغّل سكربت [[build]] (هنا [[vite build]]) ويطلّع الموقع جاهز في [[dist/]]. ده اللي هيدخل التطبيق، مش [[src/]].

~~~text الناتج
✓ built in 62ms
~~~

## ٣. [[npx cap sync android]]

[[sync]] = [[copy]] + [[update]]:

~~~text الناتج
√ Copying web assets from dist to android\app\src\main\assets\public in 7.07ms
√ Creating capacitor.config.json in android\app\src\main\assets in 806.60μs
√ copy android in 16.65ms
√ Updating Android plugins in 805.00μs
√ update android in 29.43ms
[info] Sync finished in 0.057s
~~~

- **copy**: انسخ [[dist]] لـ [[android/app/src/main/assets/public]]، والإعدادات جنبها.
- **update**: حدّث الـ plugins الأصلية (كاميرا، إشعارات...) في مشروع الأندرويد.

غيّرت النص في [[src/main.js]] لـ «hello android» وعملت build و sync، ولقيته جوه مشروع الأندرويد:

~~~text grep
android/app/src/main/assets/public/assets/index-....js: hello android
~~~

يعني أي تعديل في الموقع لازم **build ثم sync**، وإلا التطبيق يفضل على القديم.

## ٤. الأيقونات وشاشة البداية

~~~bash
npx @capacitor/assets generate --android --iconBackgroundColor '#0f172a' --splashBackgroundColor '#0f172a'
~~~

| الحتة | معناها |
|---|---|
| [[@capacitor/assets]] | أداة بتاخد صورة واحدة وتعمل منها كل المقاسات |
| [[generate]] | ولّد |
| [[--android]] | للأندرويد بس (من غيرها iOS و PWA كمان) |
| [[--iconBackgroundColor]] | لون خلفية الأيقونة |
| [[--splashBackgroundColor]] | لون خلفية شاشة البداية |
| [[#0f172a]] | لون بالـ hex (أحمر أخضر أزرق)، هنا كحلي غامق. بين [[' ']] عشان [[#]] في bash أول كلمة تعليق |

بتقرا [[assets/icon.png]] (مربعة، 1024×1024 أو أكبر). عملت صورة كده وشغّلت الأمر:

~~~text الناتج (مختصر)
CREATE android icon ...\res\mipmap-xxxhdpi\ic_launcher.png (1.69 KB)
CREATE android icon ...\res\mipmap-xxxhdpi\ic_launcher_round.png (3.74 KB)
CREATE android adaptive-icon ...\res\mipmap-xxxhdpi\ic_launcher_foreground.png (4.37 KB)
CREATE android splash ...\res\drawable-port-xxxhdpi\splash.png (52.37 KB)
CREATE android splash-dark ...\res\drawable-night\splash.png (2.41 KB)
Totals:
android: 74 generated, 544.43 KB total
~~~

ليه ٧٤ صورة؟ أندرويد عنده مقاسات شاشات (كثافات): [[ldpi]] و [[mdpi]] و [[hdpi]] و [[xhdpi]] و [[xxhdpi]] و [[xxxhdpi]]، وكل واحدة محتاجة الأيقونة بمقاسها. وفيه أيقونة عادية ومدوّرة ([[round]])، و adaptive icon (طبقة قدام [[foreground]] وطبقة ورا [[background]] عشان الموبايل يقصّها بالشكل اللي عايزه)، وشاشة بداية للطول ([[port]]) والعرض ([[land]]) والوضع الليلي ([[night]]).

ولازم الخطوة دي **قبل** gradlew، عشان الصور تدخل الـ APK.

> شغّلتها من [[npm i -D @capacitor/assets]] الأول. من [[npx]] مباشرة على ويندوز طلّعت تحذيرات [[EPERM]] كتير وقت تنضيف الكاش.

## ٥. [[npx cap open android]]

بيفتح فولدر [[android/]] في Android Studio. ولو مش متسطّب:

~~~text الناتج
[error] Unable to launch Android Studio. Is it installed?
        You can configure this with the CAPACITOR_ANDROID_STUDIO_PATH environment variable.
~~~

اختياري: تقدر تبني من غيره بالخطوة الجاية.

## ٦. [[cd android && ./gradlew assembleDebug && cd ..]]

| الحتة | معناها |
|---|---|
| [[cd android]] | ادخل مشروع الأندرويد |
| [[./gradlew]] | Gradle Wrapper: سكربت جاي مع المشروع (اتعمل مع [[cap add]]) بينزّل نسخة Gradle الصح ويشغّلها. [[./]] = من الفولدر الحالي |
| [[assembleDebug]] | ابني نسخة debug |
| [[cd ..]] | ارجع لفولدر المشروع |

والـ [[&&]] بينهم: لو البناء فشل، متكمّلش. على PowerShell أو CMD اكتب [[.\gradlew.bat assembleDebug]]. (الملفين [[gradlew]] و [[gradlew.bat]] موجودين فعلًا في [[android/]] بعد [[cap add]].)

محتاج JDK و Android SDK (بييجوا مع Android Studio). حسب التوثيق، في الآخر بيطبع [[BUILD SUCCESSFUL]] والـ APK بيبقى في:

~~~text المسار
android/app/build/outputs/apk/debug/app-debug.apk
~~~

نسخة **debug** متوقّعة بمفتاح debug أوتوماتيك، تنفع للتجربة على موبايلك، مش للتوزيع.

## ٧. [[adb install -r android/app/build/outputs/apk/debug/app-debug.apk]]

- [[adb]] (Android Debug Bridge) أداة بتكلّم الموبايل الموصّل بـ USB (لازم USB debugging مفعّل من Developer options).
- [[install]] سطّب الـ APK ده.
- [[-r]] (replace) لو التطبيق متسطّب، حدّثه وسيب بياناته.

حسب التوثيق بيطبع [[Success]]. و [[adb devices]] بيوريك الموبايلات الموصّلة.

---

## ٨. iOS (على Mac بس)

| السطر | بيعمل إيه |
|---|---|
| [[npm install @capacitor/ios]] | مكتبة منصة iOS |
| [[npx cap add ios]] | فولدر [[ios/]] فيه مشروع Xcode |
| [[npx cap sync ios]] | نفس sync: انسخ [[dist]] وحدّث الـ plugins |
| [[npx cap open ios]] | افتح Xcode، ومنه تبني وتشغّل |

بناء iOS محتاج Xcode، و Xcode على macOS بس. (من توثيق Capacitor، مفيش Mac هنا.)

---

## الخلاصة

| الخطوة | الأمر | امتى |
|---|---|---|
| ابني الموقع | [[npm run build]] | بعد أي تعديل |
| انسخه للأندرويد | [[npx cap sync android]] | بعد أي build |
| الأيقونات | [[npx @capacitor/assets generate --android]] | لما الأيقونة تتغير |
| APK | [[./gradlew assembleDebug]] | لما عايز تجرّب على موبايل |
| سطّب | [[adb install -r ...apk]] | |

والغلطة الأشهر: شاشة بيضا لأن [[webDir]] مش [[dist]]، أو نسيت build قبل sync.`,
          lines: [
            "سطّب المكتبات.",
            "ابني الموقع لـ dist.",
            "انسخ dist جوه مشروع الأندرويد.",
            "ولّد الأيقونات وشاشة البداية من صورة واحدة (قبل البناء، عشان تدخل في الـ APK).",
            "افتح Android Studio (اختياري).",
            "ابني APK debug من الترمنال.",
            "سطّب على الموبايل الموصّل، فوق القديم.",
            "ضيف منصة iOS.",
            "اعمل مشروع Xcode.",
            "انسخ الموقع جواه.",
            "افتح Xcode."
          ],
          sol: R`جربت جزء Capacitor: [[npx cap add android]] طبع [[[success] android platform added!]] وعمل فولدر [[android/]]. [[npx cap sync android]] نقل الـ build لـ [[android/app/src/main/assets/public]] (غيّرت كلمة وتأكدت إنها وصلت هناك). وخد بالك إن [[cap init]] بيعمل [[capacitor.config.json]] لو المشروع مفيهوش TypeScript، و [[capacitor.config.ts]] لو فيه.

[[./gradlew assembleDebug]] في الآخر بيقول [[BUILD SUCCESSFUL]] والـ APK في [[android/app/build/outputs/apk/debug/app-debug.apk]]. [[adb install -r]] بيطبع [[Success]] والتطبيق بيظهر على الموبايل. لو [[adb devices]] مش شايف الموبايل أو بيقول [[unauthorized]]، وافق على رسالة USB debugging على الموبايل.

الغلط الأشهر: التطبيق بيفتح شاشة بيضا، لأن [[webDir]] مش [[dist]] أو نسيت [[npm run build]] قبل [[cap sync]]. ولو الـ API مش بيرد من الموبايل، [[localhost]] على الموبايل هو الموبايل نفسه، استخدم IP الكمبيوتر أو [[adb reverse]]. (ما قدرتش أبني الـ APK هنا، [[gradlew]] محتاج Android SDK ونت.)`
        }
      ]
    }
]);
