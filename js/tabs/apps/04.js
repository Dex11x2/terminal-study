// ملف إضافي لتاب apps: الحقول نفس شكلها في 01.js.

MORE("apps", [
    {
      t: "Tauri 2: برنامج ديسكتوب أخف",
      l: 2,
      n: "نفس واجهة الويب، بس من غير ما تشحن Chromium: الـ backend بـ Rust والنافذة من webview النظام",
      items: [
        {
          cmd: "Electron ولا Tauri ولا native",
          title: "تعمل برنامج ديسكتوب بإيه؟ الحجم والذاكرة والأمان",
          desc: R`Electron بيشحن Chromium و Node جوه كل برنامج، فأصغر برنامج حوالي ١٠٠ ميجا. Tauri بيستخدم الـ webview اللي في النظام نفسه (WebView2 على ويندوز، و WebKit على الماك ولينكس) والـ backend بـ Rust، فالبرنامج بضعة ميجات. و native (C# على ويندوز، و Swift على الماك) أحسن تكامل مع النظام بس كود منفصل لكل نظام.

جرّبت نفس الصفحة بـ Electron و Tauri على لينكس: الـ deb بتاع Electron ‏97 ميجا، وبتاع Tauri ‏2.3 ميجا. بس الذاكرة وقت التشغيل كانت قريبة من بعض.`,
          example: R`# Tauri (في فولدر المشروع، بعد npm run tauri build):
ls -lh src-tauri/target/release/bundle/deb/
dpkg-deb -I src-tauri/target/release/bundle/deb/notes-app_0.1.0_amd64.deb | grep -E "Installed-Size|Depends"
# Electron (نفس الصفحة بـ electron-builder --linux deb):
ls -lh release/
dpkg-deb -I release/notes-electron_0.1.0_amd64.deb | grep -E "Installed-Size|Depends"`,
          try: R`على ويندوز من غير ما تسطّب حاجة: افتح PowerShell في فولدر أي مشروع Tauri (حتى لو لسه [[npm create tauri-app]] بس) وشغّل [[npx tauri info]]. هتلاقي سطر [[WebView2]] بالنسخة اللي على جهازك. ده المتصفح اللي برنامجك هيستخدمه. وفكّر: لو عندك برنامج داخلي للشركة فريقه كله JavaScript ومحتاج مكتبة Node معينة، هتختار إيه؟`,
          deep: {
            why: "أول سؤال في أي مشروع ديسكتوب، وبيتسأل في الانترفيو: «ليه VS Code و Slack و Discord معمولين بـ Electron؟» و «إيه اللي Tauri بيحله؟». الاختيار بيأثر على حجم التحميل، والذاكرة، واللغة اللي الفريق هيكتب بيها، وشكل الواجهة على كل نظام.",
            how: R`Electron: كل برنامج معاه Chromium كامل (نفس نسخة المتصفح على كل الأنظمة) و Node.js في الـ main process. الواجهة شكلها واحد بالظبط في كل حتة، وتقدر تستخدم أي مكتبة npm. التمن: ١٠٠ ميجا تحميل وأكتر من ٢٥٠ ميجا بعد التسطيب، وكل برنامج بيحدّث Chromium بتاعه لوحده (أو مبيحدّثوش فيفضل فيه ثغرات).

Tauri 2: الـ webview من النظام: WebView2 (مبني على Edge/Chromium) على ويندوز، و WKWebView (Safari) على الماك، و WebKitGTK على لينكس. الـ backend Rust بيتكلم مع الواجهة بـ commands، وكل حاجة الواجهة تقدر تعملها لازم تتسمح صراحةً (capabilities). التمن: لازم تتعلم شوية Rust، والواجهة ممكن تتصرف مختلف شوية بين Chromium و WebKit (CSS و APIs جديدة)، والبناء أبطأ أول مرة (أول build عندي أخد حوالي ٩ دقايق، والتعديلات بعده دقيقة ونص). وكمان بيبني Android و iOS من نفس المشروع.

قياساتي (لينكس في Docker، Tauri 2.12 و Electron 45.1، صفحة HTML صغيرة): الـ deb ‏2.3 ميجا مقابل 97 ميجا، والمساحة بعد التسطيب حوالي 8 ميجا مقابل 273 ميجا (منهم ملف التشغيل نفسه 224 ميجا). الذاكرة (PSS لكل العمليات بعد ٨ ثواني): Tauri ‏277 ميجا (البرنامج + WebKitWebProcess + WebKitNetworkProcess)، و Electron ‏243 ميجا (٦ عمليات). يعني فرق الحجم حقيقي وضخم، لكن «Tauri بياكل رام أقل» مش مضمون: بيعتمد على الـ webview بتاع النظام.

native: WinUI/WPF بـ C# (تاب «C# و .NET»)، و SwiftUI على الماك (تاب «Swift و iOS»)، و GTK أو Qt. أحسن أداء وتكامل (accessibility، وشكل النظام، والـ APIs)، بس كل نظام كود لوحده. و Flutter كمان بيعمل ديسكتوب برسم الواجهة بنفسه (تاب «Flutter و Dart»).`,
            when: "Electron: فريق JavaScript، ومحتاج نفس الشكل بالظبط في كل نظام، أو مكتبات Node أو Chromium APIs (زي VS Code). Tauri: الحجم والأمان مهمين، أو أداة صغيرة، أو عايز ديسكتوب وموبايل من نفس الكود ومش خايف من Rust. native: برنامج لنظام واحد أو محتاج تكامل عميق معاه.",
            mistakes: R`تختار Tauri عشان «أخف في الرام» من غير ما تقيس: على لينكس كان أتقل في تجربتي. وتختبر الواجهة على Chrome بس وتنزل Tauri على الماك فتلاقي CSS أو API مش شغال في Safari/WebKit. وتفتكر إن Tauri «مفيهوش backend»: كل حاجة حساسة (ملفات، مفاتيح، شبكة من غير CORS) مكانها Rust commands مش الـ JavaScript. وتفتكر إن Electron «غير آمن» في المطلق: المشكلة في الإعدادات (nodeIntegration و contextIsolation) مش في Electron نفسه.`
          },
          teach: R`## نفس الصفحة، طريقتين

بنيت صفحة HTML صغيرة جدًا مرتين في container لينكس (Debian 12): مرة بـ Tauri 2.12 (قالب [[vanilla]] من [[create-tauri-app]]، من غير plugin updater)، ومرة بـ Electron 45.1 و electron-builder 26.18. وبعدين قريت الحجم والذاكرة.

---

## ١. حجم الـ installer

### Tauri

~~~bash
ls -lh src-tauri/target/release/bundle/deb/
~~~

~~~text ناتج البناء
Finished 2 bundles at:
    .../bundle/deb/notes-app_0.1.0_amd64.deb (2.32 MiB)
    .../bundle/rpm/notes-app-0.1.0-1.x86_64.rpm (2.32 MiB)
~~~

[[-l]] تفاصيل، و [[-h]] الحجم بالميجا (human). (بعد ما ضفت plugin الـ updater في درس جاي بقى 3.4M.)

### Electron

~~~bash
ls -lh release/
~~~

~~~text الناتج
-rw-r--r-- 1 root root  857 Oct 27 23:51 builder-debug.yml
drwxr-xr-x 4 root root 4.0K Oct 27 23:50 linux-unpacked
-rw-r--r-- 1 root root  97M Oct 27 23:51 notes-electron_0.1.0_amd64.deb
~~~

**2.3 ميجا مقابل 97 ميجا** لنفس الصفحة. وعلى ويندوز درس «electron-builder» طلّع Setup.exe بـ 111 ميجا.

---

## ٢. بعد التسطيب: [[dpkg-deb -I]]

[[dpkg-deb]] أداة ملفات [[.deb]] (باكدجات Debian و Ubuntu)، و [[-I]] (Info) بيطبع بيانات الباكدج من غير ما يسطّبه. و [[grep -E "A|B"]] بيسيب السطور اللي فيها A أو B.

~~~text Tauri
 Installed-Size: 8149
 Depends: libwebkit2gtk-4.1-0, libgtk-3-0
~~~

~~~text Electron
 Installed-Size: 280014
 Depends: libgtk-3-0, libnotify4, libnss3, libxss1, libxtst6, xdg-utils, libatspi2.0-0, libuuid1, libsecret-1-0
~~~

| | Tauri | Electron |
|---|---|---|
| [[Installed-Size]] (بالكيلوبايت) | 8149 ≈ 8 ميجا | 280014 ≈ 273 ميجا |
| أكبر ملف | البرنامج نفسه 6 ميجا (8 مع الـ updater) | البرنامج 224 ميجا (Chromium جواه) |
| [[Depends]] | الـ webview بتاع النظام ([[libwebkit2gtk-4.1-0]]) | مكتبات بيحتاجها Chromium |

ده الفرق الأساسي: Electron **بيشحن** المتصفح، و Tauri **بيستلفه** من النظام. على ويندوز المتصفح ده WebView2، وموجود في ويندوز ١٠ و ١١ الحديثة. [[npx tauri info]] على ويندوز هنا قال:

~~~text الناتج (مختصر)
[✘] Environment
    - OS: Windows 10.0.26300 x86_64 (X64)
    ✔ WebView2: 155.0.4283.62
    ✘ Couldn't detect any Visual Studio or VS Build Tools instance with MSVC and SDK components.
    ✘ rustc: not installed!
~~~

WebView2 موجود، بس البناء على ويندوز محتاج Rust و Visual Studio Build Tools (مسطّبتهمش، فبناء ويندوز في الدروس دي من الـ docs).

---

## ٣. الذاكرة: النتيجة اللي ممكن متتوقعهاش

شغّلت الاتنين تحت شاشة وهمية (Xvfb) وجمعت **PSS** لكل العمليات بعد ٨ ثواني. PSS = الذاكرة الخاصة بالعملية + نصيبها من الذاكرة المشتركة (أعدل رقم لما تجمع كذا عملية).

~~~text الناتج
tauri: 277 MB PSS, processes: notes-app WebKitNetworkPr WebKitWebProces
electron: 243 MB PSS, processes: electron electron electron electron electron electron
~~~

- Tauri: البرنامج نفسه + عملية WebKit للصفحة + عملية للشبكة.
- Electron: ٦ عمليات (main و renderer و GPU و utility...).

على لينكس WebKitGTK مش أخف من Chromium. على ويندوز Tauri بيستخدم WebView2 (Chromium برضه)، فالفرق في الرام بيعتمد على النظام. **الحجم** هو المكسب المؤكد، مش الرام.

---

## ٤. الجدول

| | Electron | Tauri 2 | native |
|---|---|---|---|
| الواجهة | HTML/CSS/JS في Chromium مشحون | HTML/CSS/JS في webview النظام | أدوات النظام (WinUI، SwiftUI، GTK) |
| الـ backend | Node.js | Rust | نفس لغة الواجهة |
| الحجم | ~100 ميجا | بضعة ميجات | صغير |
| الشكل على كل نظام | واحد بالظبط | ممكن يختلف (WebKit مقابل Chromium) | مختلف (مقصود) |
| الأمان الافتراضي | لازم تضبط الإعدادات | الواجهة مش بتقدر تعمل حاجة غير اللي مسموحلها | حسب الكود |
| موبايل | لأ | Android و iOS | كود لوحده |
| أمثلة | VS Code، Slack، Discord | أدوات أصغر وأحدث | برامج النظام |

## الخلاصة

- Electron = بتشحن متصفح كامل: أكبر، بس كل حاجة Node و Chromium متاحة وشكل واحد.
- Tauri = بتستلف متصفح النظام: أصغر بمراحل، و Rust للـ backend، واختبر على كل نظام.
- الرام قيسها بنفسك، متصدقش الجملة الشائعة.`,
          lines: [
            "Tauri: اعرض ملفات الـ deb اللي اتبنت وأحجامها بالميجا.",
            "Tauri: بيانات الباكدج: الحجم بعد التسطيب بالكيلوبايت، والمكتبات اللي محتاجها من النظام.",
            "Electron: ملفات الناتج من electron-builder وأحجامها.",
            "Electron: نفس البيانات لباكدج Electron للمقارنة."
          ],
          sol: R`على الجهاز هنا [[npx tauri info]] طلّع [[✔ WebView2: 155.0.4283.62]]. ده Chromium بتاع Edge، وكل برامج Tauri على الجهاز بتستخدمه وبيتحدّث مع ويندوز. وفي نفس الناتج: [[✘ rustc: not installed!]] و [[✘ Couldn't detect any Visual Studio or VS Build Tools]]، يعني عشان تبني لازم Rust و Build Tools الأول (صفحة Prerequisites في docs بتاعة Tauri).

البرنامج الداخلي لفريق JavaScript محتاج مكتبة Node: Electron غالبًا أسهل. الحجم مش مشكلة جوه شركة، والفريق مش هيتعلم Rust. Tauri يكسب لو هتوزّعه لناس كتير والحجم والأمان فارقين.`
        },
        {
          cmd: "npm create tauri-app",
          title: "أول مشروع Tauri: الفولدرات ومين بيعمل إيه",
          desc: R`[[npm create tauri-app@latest]] بيعمل مشروع فيه حتتين: الواجهة (فولدر [[src]] أو مشروع Vite) والـ backend بـ Rust في [[src-tauri]]. [[npm run tauri dev]] بيفتح البرنامج ويعيد تحميله مع كل تعديل، و [[npm run tauri build]] بيطلّع installer.

قبلها محتاج: Node، و Rust (rustup)، وعلى ويندوز Visual Studio Build Tools و WebView2، وعلى لينكس [[libwebkit2gtk-4.1-dev]] ومكتبات تانية.`,
          example: R`npm create tauri-app@latest notes-app -- --template vanilla --manager npm --identifier com.example.notes --yes
cd notes-app
npm install
npx tauri info
npm run tauri dev
# Linux (Debian/Ubuntu) قبل أول build:
sudo apt install libwebkit2gtk-4.1-dev build-essential curl wget file libxdo-dev libssl-dev libayatana-appindicator3-dev librsvg2-dev
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`,
          try: R`اعمل المشروع بأول سطر (على ويندوز ده بيشتغل من غير Rust، بيعمل الملفات بس). افتح [[src-tauri/tauri.conf.json]] ولاقي: اسم البرنامج، والـ identifier، وحجم النافذة، وفولدر الواجهة. وبعدين غيّر [[--template vanilla]] لـ [[react-ts]] في مشروع تاني وقارن [[package.json]] بتاع الاتنين.`,
          deep: {
            why: "المشروع فيه لغتين وأدوات بناء اتنين (npm و cargo)، ولو مش فاهم مين بيعمل إيه هتتوه في أول error. [[create-tauri-app]] بيعمل الهيكل الصح، وبيقولك لو ناقصك حاجة من الـ prerequisites.",
            how: R`[[npm create tauri-app@latest]] بيشغّل باكدج [[create-tauri-app]] (نسخة 4.7 وقت التجربة). الـ flags بعد [[--]] بتروح للأداة نفسها مش لـ npm: [[--template]] (vanilla و vanilla-ts و react-ts و vue-ts و svelte-ts و angular وغيرهم)، و [[--manager]] (npm أو pnpm أو cargo...)، و [[--identifier]] (اسم فريد بالدومين المعكوس، زي Capacitor و Android)، و [[--yes]] من غير أسئلة.

الهيكل: [[src/]] الواجهة (في vanilla: index.html و main.js و styles.css). [[src-tauri/]] مشروع Rust: [[Cargo.toml]] (زي package.json بتاع Rust، وفيه [[tauri]] و [[serde]] و [[tauri-plugin-opener]])، و [[src/main.rs]] نقطة البداية وبيستدعي [[run()]] من [[src/lib.rs]] (هنا الـ commands)، و [[tauri.conf.json]] الإعدادات، و [[capabilities/default.json]] الصلاحيات، و [[icons/]]، و [[build.rs]].

[[tauri.conf.json]]: [[productName]] و [[version]] و [[identifier]]، و [[build.frontendDist]] فولدر الواجهة الجاهزة، و [[app.windows]] (العنوان والمقاس)، و [[app.withGlobalTauri: true]] (في vanilla: الـ API متاح في [[window.__TAURI__]] من غير import)، و [[bundle]] (الأيقونات وأنواع الـ installers).

[[npm run tauri dev]]: بيشغّل الـ dev server بتاع الواجهة لو فيه (Vite)، وبيعمل [[cargo build]] للـ debug، ويفتح النافذة. تعديل الواجهة بيتحدّث على طول، وتعديل Rust بيعيد البناء.

[[npx tauri info]]: بيفحص البيئة (Rust و WebView2/WebKitGTK و Build Tools) ونسخ الباكدجات. أول حاجة تشغّلها لما حاجة متشتغلش.`,
            when: "أول ما تبدأ برنامج ديسكتوب بـ Tauri. ولو عندك مشروع ويب موجود (React أو Vue)، فيه [[npx tauri init]] بيضيف [[src-tauri]] للمشروع الموجود بدل مشروع جديد.",
            mistakes: R`تشغّل [[npm run tauri dev]] على ويندوز من غير Visual Studio Build Tools (مكوّن «Desktop development with C++»): الـ error بيبقى من الـ linker ومش واضح. [[npx tauri info]] بيقولك على طول. وتفتكر إن [[npm install]] كفاية: Rust بيتسطّب لوحده بـ rustup. وأول build بينزّل ويبني مئات الـ crates (عندي ٤٤٧ باكدج و ٩ دقايق)، فمتفتكرش إنه وقف. وفولدر [[src-tauri/target]] بيوصل ١.٥ جيجا: لازم يبقى في [[.gitignore]] (والقالب حاطه).`
          },
          teach: R`## مشروع فيه لغتين

اتعمل المشروع على ويندوز ١١ بـ [[create-tauri-app]] من npm، واتبنى وجرّبته في container لينكس (Debian 12 + Rust 1.99 + WebKitGTK 2.50) لأن البناء على ويندوز محتاج Build Tools مش متسطبة هنا.

---

## ١. [[npm create tauri-app@latest notes-app -- ...]]

| الحتة | معناها |
|---|---|
| [[npm create tauri-app@latest]] | شغّل أحدث [[create-tauri-app]] (npm بيحط [[create-]] قبل الاسم) |
| [[notes-app]] | اسم المشروع والفولدر |
| [[--]] | اللي بعدها للأداة مش لـ npm |
| [[--template vanilla]] | واجهة HTML و JS عادي من غير framework |
| [[--manager npm]] | الأوامر هتبقى npm |
| [[--identifier com.example.notes]] | الاسم الفريد للبرنامج |
| [[--yes]] | من غير أسئلة |

~~~text الناتج على ويندوز
Template created!

Your system is missing dependencies (or they do not exist in $PATH):
╭──────┬───────────────────────────────────────────────────────────────────╮
│ Rust │ Visit https://www.rust-lang.org/learn/get-started#installing-rust │
╰──────┴───────────────────────────────────────────────────────────────────╯

For Desktop development, run:
  npm run tauri dev
~~~

عمل الملفات، وقالك إن Rust ناقص.

---

## ٢. الملفات

~~~text الشجرة (من غير الأيقونات)
notes-app/
  package.json              npm: فيه @tauri-apps/cli بس
  src/                      الواجهة
    index.html
    main.js
    styles.css
  src-tauri/                الـ backend (مشروع Rust)
    Cargo.toml              الـ dependencies بتاعة Rust
    build.rs                بيتشغّل قبل البناء (tauri_build::build())
    tauri.conf.json         إعدادات البرنامج
    capabilities/
      default.json          الواجهة مسموحلها تعمل إيه
    src/
      main.rs               نقطة البداية
      lib.rs                الـ commands وتشغيل البرنامج
    icons/
~~~

### [[package.json]]

~~~text package.json
"scripts": { "tauri": "tauri" },
"devDependencies": { "@tauri-apps/cli": "^2" }
~~~

[[npm run tauri dev]] = شغّل الـ CLI بأمر [[dev]].

### [[src-tauri/Cargo.toml]] (المهم منه)

~~~text Cargo.toml
[package]
name = "notes-app"
edition = "2024"

[lib]
name = "notes_app_lib"
crate-type = ["staticlib", "cdylib", "rlib"]

[dependencies]
tauri = { version = "2", features = [] }
tauri-plugin-opener = "2"
serde = { version = "1", features = ["derive"] }
serde_json = "1"

[profile.release]
codegen-units = 1
lto = true
opt-level = 3
panic = "abort"
strip = true
~~~

- [[edition = "2024"]]: نسخة لغة Rust، ومحتاجة Rust 1.85 أو أحدث.
- [[[lib]]]: الكود في library عشان نفس الكود يتبني لموبايل كمان.
- [[serde]]: تحويل بيانات Rust لـ JSON والعكس (بيه الـ commands بتكلم JavaScript).
- [[[profile.release]]]: إعدادات بتصغّر البرنامج: [[lto]] (تحسين على كل الكود)، و [[strip]] (شيل رموز الـ debug)، و [[panic = "abort"]].

### [[src-tauri/src/main.rs]]

~~~text main.rs
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    notes_app_lib::run()
}
~~~

السطر الأول: في نسخة الـ release على ويندوز متفتحش نافذة console سودا جنب البرنامج. و [[main]] بتنادي [[run()]] من [[lib.rs]].

### [[tauri.conf.json]]

~~~text tauri.conf.json
"productName": "notes-app",
"version": "0.1.0",
"identifier": "com.example.notes",
"build": { "frontendDist": "../src" },
"app": {
  "withGlobalTauri": true,
  "windows": [ { "title": "notes-app", "width": 800, "height": 600 } ],
  "security": { "csp": null }
},
"bundle": { "active": true, "targets": "all", "icon": [ ... ] }
~~~

| الخانة | معناها |
|---|---|
| [[frontendDist]] | فولدر الواجهة الجاهزة (في React/Vue بيبقى [[../dist]] ومعاه [[devUrl]]) |
| [[withGlobalTauri]] | الـ API في [[window.__TAURI__]] من غير import |
| [[windows]] | النوافذ اللي تفتح في الأول |
| [[csp]] | Content Security Policy. [[null]] = مفيش، وفي الإنتاج حط واحدة (تاب «الأمان») |
| [[targets: "all"]] | كل أنواع الـ installers المتاحة للنظام |

---

## ٣. [[npx tauri info]]

على لينكس (الـ container بعد تسطيب المتطلبات):

~~~text الناتج (مختصر)
[✔] Environment
    - OS: Debian 12.0.0 x86_64 (X64)
    ✔ webkit2gtk-4.1: 2.50.6
    ✔ rustc: 1.99.1 (58cf8f9c3 2026-10-13)
    ✔ cargo: 1.99.1 (5f94df478 2026-08-27)
    ✔ rustup: 1.29.2 (d8c92c676 2026-10-21)
[-] Packages
    - tauri 🦀: 2.12.5
    - @tauri-apps/cli ⱼₛ: 2.12.4
~~~

[[🦀]] = باكدج Rust (crate)، و [[ⱼₛ]] = باكدج npm. وعلى ويندوز بنفس الأمر شفنا WebView2 موجود و Rust و Build Tools ناقصين (الدرس اللي فات).

---

## ٤. المتطلبات لكل نظام

| النظام | المطلوب |
|---|---|
| ويندوز | Visual Studio Build Tools (Desktop development with C++)، و WebView2 (موجود في ١٠ و ١١)، و Rust بـ rustup |
| لينكس | سطر [[apt install]] اللي في المثال، و Rust بـ rustup |
| الماك | Xcode Command Line Tools ([[xcode-select --install]])، و Rust بـ rustup |

سطر لينكس جربته جوه الـ container (من غير [[sudo]] لأنه root). و rustup: [[curl ... | sh]] بينزّل سكربت التسطيب ويشغّله، و [[--proto '=https' --tlsv1.2]] يجبر HTTPS حديث. ويندوز والماك من صفحة Prerequisites في docs بتاعة Tauri.

## ٥. [[npm run tauri dev]]

بيبني نسخة debug ويفتح النافذة. أول مرة بينزّل ويبني كل الـ crates (عندي [[Locking 447 packages]] وحوالي ٩ دقايق للـ release)، وبعدها التعديلات أسرع بكتير.

## الخلاصة

| الحاجة | مكانها |
|---|---|
| الواجهة | [[src/]] |
| الـ commands بـ Rust | [[src-tauri/src/lib.rs]] |
| الإعدادات | [[src-tauri/tauri.conf.json]] |
| الصلاحيات | [[src-tauri/capabilities/]] |
| فحص البيئة | [[npx tauri info]] |`,
          lines: [
            "اعمل مشروع Tauri اسمه notes-app بقالب vanilla و npm و identifier، من غير أسئلة.",
            "ادخل الفولدر.",
            "سطّب الـ CLI بتاع Tauri (من package.json).",
            "افحص البيئة: Rust والـ webview و Build Tools ونسخ الباكدجات.",
            "شغّل البرنامج في وضع التطوير: بيبني Rust ويفتح النافذة.",
            "لينكس: المكتبات اللي Tauri محتاجها للبناء (WebKitGTK وغيرها).",
            "لينكس والماك: سطّب Rust بـ rustup."
          ],
          sol: R`في [[tauri.conf.json]]: [[productName: "notes-app"]] و [[identifier: "com.example.notes"]] و النافذة [[800]] × [[600]] و [[frontendDist: "../src"]].

مشروع [[react-ts]]: [[package.json]] فيه react و vite و typescript و [[@tauri-apps/api]]، و [[tauri.conf.json]] فيه [[devUrl]] (سيرفر Vite) و [[frontendDist: "../dist"]] و [[beforeDevCommand]] و [[beforeBuildCommand]] بيشغّلوا Vite. والـ invoke بيتعمل بـ [[import { invoke } from "@tauri-apps/api/core"]] بدل [[window.__TAURI__]].`
        },
        {
          cmd: "#[tauri::command] و invoke",
          title: "الواجهة تنادي دالة Rust وتاخد النتيجة",
          desc: R`أي دالة Rust عليها [[#[tauri::command]]] وتتسجّل في [[generate_handler!]] تقدر تناديها من JavaScript بـ [[invoke("اسمها", { args })]]، وبترجع Promise. الـ arguments والنتيجة بتتحوّل JSON في الطريق، و [[Result<T, String>]] في Rust بيبقى resolve أو reject في JavaScript.

ده الجسر الوحيد بين الواجهة والنظام: قراية ملفات، وقاعدة بيانات، وحسابات تقيلة، كلها commands.`,
          example: R`// src-tauri/src/lib.rs
#[derive(serde::Serialize)]
struct Note { id: u32, title: String }

#[tauri::command]
fn add_note(title: String) -> Result<Note, String> {
    if title.trim().is_empty() { return Err("title is empty".into()); }
    Ok(Note { id: 1, title })
}

#[tauri::command]
async fn word_count(text: String) -> usize { text.split_whitespace().count() }

tauri::Builder::default().invoke_handler(tauri::generate_handler![add_note, word_count])
// src/main.js
const { invoke } = window.__TAURI__.core;
const note = await invoke("add_note", { title: "shopping" });
try { await invoke("add_note", { title: "  " }); } catch (e) { console.log("error:", e); }
const n = await invoke("word_count", { text: "one two  three" });`,
          try: R`ضيف command اسمه [[greet_user]] بياخد [[first_name: String]] ويرجّع ترحيب. نادِه من JavaScript بـ [[{ first_name: "Sara" }]] وشوف الـ error، وبعدين بـ [[{ firstName: "Sara" }]]. وجرّب [[invoke("missing_cmd")]].`,
          deep: {
            why: "الواجهة في Tauri صفحة ويب جوه webview: مفيهاش [[fs]] ولا [[child_process]] ولا وصول للنظام زي Node في Electron. أي حاجة محتاجة النظام بتعدّي على command بـ Rust، وده اللي بيخلي Tauri آمن: الواجهة تقدر تعمل اللي انت كاتبه بس.",
            how: R`[[#[tauri::command]]] attribute (زي decorator) بيولّد كود يستقبل الـ JSON ويحوّله لـ arguments الدالة ويحوّل الناتج JSON. أي نوع بيرجع لازم يبقى [[Serialize]] (بـ [[#[derive(serde::Serialize)]]])، وأي argument لازم [[Deserialize]] (النصوص والأرقام جاهزين).

[[generate_handler![a, b]]] بيسجّل الـ commands. command مش متسجّل: [[Command missing_cmd not found]] (جربتها).

أسامي الـ arguments: Rust بتكتب [[snake_case]] و JavaScript بتبعت [[camelCase]]، و Tauri بيحوّل لوحده: [[first_name]] في Rust تتبعت [[firstName]] من JS. ناقص argument: [[invalid args ‹name› for command ‹greet›: command greet missing required key name]] (جربتها). ولو عايز snake_case من JS: [[#[tauri::command(rename_all = "snake_case")]]].

الأخطاء: [[Result<Note, String>]]: [[Ok]] بيبقى قيمة الـ Promise، و [[Err]] بيبقى reject فبتمسكه بـ [[try/catch]]. الـ error type لازم يبقى Serialize (أسهل حاجة String، أو enum بـ thiserror).

[[async fn]]: بيتنفّذ في thread تاني فميعلّقش الواجهة، استخدمه لأي حاجة بتاخد وقت (ملفات، شبكة). الـ command العادي بيتنفّذ على الـ main thread.

حاجات تانية الـ command يقدر ياخدها كـ arguments من غير ما JS يبعتها: [[app: tauri::AppHandle]] و [[window: tauri::Window]] و [[state: tauri::State<'_, T>]] (بيانات مشتركة بتسجّلها بـ [[.manage()]]).`,
            when: "أي حاجة الواجهة متقدرش أو مينفعش تعملها: الملفات والـ registry والعمليات، وقاعدة SQLite، والمفاتيح السرية (متحطهاش في JS أبدًا)، و requests من غير CORS، والحسابات التقيلة.",
            mistakes: R`تكتب command وتنسى تضيفه في [[generate_handler!]]: الواجهة بتاخد «not found». وتبعت [[{ first_name }]] من JS وتستغرب الـ «missing required key». وتعمل command تقيل من غير [[async]] فالنافذة تهنج. وتسيب [[unwrap()]] جوه command: لو فشل، البرنامج كله بيقفل (panic) بدل ما يرجّع error للواجهة. وتثق في الـ arguments: الواجهة ممكن يتحقن فيها كود (XSS)، فاتحقق جوه Rust (مسار الملف جوه الفولدر المسموح مثلًا).`
          },
          teach: R`## الجسر بين الصفحة و Rust

اتبنى في container لينكس (Tauri 2.12.5، Rust 1.99) واتشغّل تحت شاشة وهمية (Xvfb). عشان أشوف النتايج من غير ما أبص على النافذة، عملت command صغير [[log]] بيطبع اللي JavaScript بتبعته في الترمنال، فكل سطر [[[js]]] تحت ده ناتج حقيقي من الواجهة.

---

## ١. نوع البيانات: [[struct Note]]

~~~text lib.rs
#[derive(serde::Serialize)]
struct Note { id: u32, title: String }
~~~

- [[struct]]: نوع فيه حقول (زي object بشكل ثابت).
- [[u32]]: رقم صحيح موجب 32 بت. [[String]]: نص.
- [[#[derive(serde::Serialize)]]]: «ولّد كود يحوّل النوع ده لـ JSON» تلقائي. من غيره مينفعش يرجع للواجهة.

## ٢. command بيرجّع نجاح أو error

~~~text lib.rs
#[tauri::command]
fn add_note(title: String) -> Result<Note, String> {
    if title.trim().is_empty() { return Err("title is empty".into()); }
    Ok(Note { id: 1, title })
}
~~~

| الحتة | معناها |
|---|---|
| [[#[tauri::command]]] | الدالة دي تتنادى من JavaScript |
| [[title: String]] | argument، وهيتاخد من [[{ title: ... }]] |
| [[-> Result<Note, String>]] | بترجّع يا [[Ok(Note)]] يا [[Err(String)]] |
| [[title.trim().is_empty()]] | النص فاضي بعد شيل المسافات؟ |
| [[.into()]] | حوّل [["title is empty"]] (‏&str) لـ [[String]] |
| [[Ok(Note { id: 1, title })]] | نجاح، والـ [[title]] لوحدها = [[title: title]] |

## ٣. command [[async]]

~~~text lib.rs
#[tauri::command]
async fn word_count(text: String) -> usize { text.split_whitespace().count() }
~~~

[[split_whitespace()]] بيقسم بأي مسافات (حتى لو اتنين ورا بعض)، و [[count()]] بيعدّ. [[usize]] رقم صحيح بحجم الجهاز. و [[async]] = يتنفّذ برّه الـ main thread.

## ٤. التسجيل

~~~text lib.rs
tauri::Builder::default()
    .plugin(tauri_plugin_opener::init())
    .invoke_handler(tauri::generate_handler![greet, add_note, word_count, log])
    .run(tauri::generate_context!())
~~~

[[generate_handler![...]]] هو الليستة اللي JavaScript تقدر تناديها. الـ [[!]] معناها macro (كود بيولّد كود وقت البناء).

---

## ٥. من JavaScript: [[invoke]]

~~~javascript
const { invoke } = window.__TAURI__.core;
~~~

في القالب vanilla، [[withGlobalTauri: true]] بيحط الـ API في [[window.__TAURI__]]. في مشروع Vite/React: [[import { invoke } from "@tauri-apps/api/core"]].

### النجاح

~~~javascript
const note = await invoke("add_note", { title: "shopping" });
~~~

~~~text الناتج
[js] {"id":1,"title":"shopping"}
~~~

الـ [[Note]] بتاع Rust وصل object عادي.

### الـ error

~~~javascript
try { await invoke("add_note", { title: "  " }); } catch (e) { console.log("error:", e); }
~~~

~~~text الناتج
[js] error: title is empty
~~~

[[Err]] في Rust = الـ Promise اترفض، والقيمة هي النص.

### async

~~~text الناتج
[js] 3
~~~

[["one two  three"]] = ٣ كلمات رغم المسافتين.

---

## ٦. الأخطاء اللي هتقابلها (كلها اتجربت)

~~~javascript
await invoke("greet", {});        // ناقص argument
await invoke("missing_cmd");      // مش متسجّل
~~~

~~~text الناتج
[js] error: invalid args $__btname$__bt for command $__btgreet$__bt: command greet missing required key name
[js] error: Command missing_cmd not found
~~~

والـ command اللي جه مع القالب شغال:

~~~text الناتج
[js] Hello, Sara! You've been greeted from Rust!
~~~

---

## الخلاصة

| Rust | JavaScript |
|---|---|
| [[#[tauri::command] fn x(a: String)]] | [[invoke("x", { a: "..." })]] |
| [[first_name]] (snake_case) | [[firstName]] (camelCase) |
| [[Ok(value)]] | الـ Promise بيرجع value |
| [[Err(msg)]] | الـ Promise بيترفض بـ msg |
| struct بـ [[Serialize]] | object |
| [[async fn]] | نفس الشكل، بس مش بيعلّق النافذة |

ومتنساش: كل command لازم في [[generate_handler!]].`,
          lines: [
            "struct اسمه Note فيه رقم وعنوان، والـ derive(serde::Serialize) اللي فوقه بيخليه يتحوّل JSON ويرجع للواجهة.",
            "دالة add_note بتاخد العنوان وبترجّع Note أو رسالة error.",
            "لو العنوان فاضي ارجع Err.",
            "غير كده ارجع Ok بالـ Note.",
            "قفلة الدالة.",
            "command بـ async بيعدّ الكلمات برّه الـ main thread.",
            "سجّل الاتنين عشان الواجهة تقدر تناديهم.",
            "هات invoke من الـ API العام (withGlobalTauri).",
            "نادي add_note واستنى الـ Note: {id: 1, title: 'shopping'}.",
            "عنوان فاضي: الـ Promise بيترفض بـ 'title is empty'.",
            "نادي word_count: بيرجّع 3."
          ],
          sol: R`[[invoke("greet_user", { first_name: "Sara" })]] بيترفض بـ [[missing required key firstName]]، لأن Tauri بيتوقع camelCase من JavaScript. [[{ firstName: "Sara" }]] بيشتغل.

[[invoke("missing_cmd")]]: [[Command missing_cmd not found]]. ولو نسيت تضيف [[greet_user]] في [[generate_handler!]] هتاخد نفس الرسالة.`,
          solCode: R`#[tauri::command]
fn greet_user(first_name: String) -> String {
    format!("Welcome, {}!", first_name)
}
// وضيفه: tauri::generate_handler![add_note, word_count, greet_user]
// JavaScript:
// await invoke("greet_user", { firstName: "Sara" })`
        },
        {
          cmd: "capabilities",
          title: "الواجهة مسموحلها تعمل إيه بالظبط",
          desc: R`في Tauri 2 أي API من الـ core أو plugin (تغيير عنوان النافذة، قراية ملف، فتح لينك) ممنوع على الواجهة إلا لو مسموح في ملف capability جوه [[src-tauri/capabilities/]]. الملف بيقول: النوافذ دي، مسموحلها الـ permissions دي.

[[npx tauri permission add]] بيضيف permission، و [[npx tauri permission ls]] بيعرض المتاح.`,
          example: R`cat src-tauri/capabilities/default.json
npx tauri permission ls core:window
npx tauri permission add core:window:allow-set-title
cat src-tauri/capabilities/default.json
npm run tauri build -- --no-bundle`,
          try: R`في الواجهة نادي [[window.__TAURI__.window.getCurrentWindow().setTitle("Notes")]] قبل ما تضيف الـ permission، واطبع الـ error. وبعدين ضيفها وابني تاني. وبعدين اعمل capability تانية لنافذة اسمها [[settings]] بس، وفكّر: ليه أفصلها عن [[main]]؟`,
          deep: {
            why: "لو حد قدر يحقن JavaScript في صفحتك (XSS من محتوى يوزر، أو مكتبة npm مخترقة)، في Electron المتساهل ده ممكن يبقى تحكم في الجهاز. في Tauri الكود المحقون يقدر يعمل اللي الـ capabilities سامحة بيه بس. فكل permission زيادة مساحة هجوم زيادة، وده مبدأ least privilege.",
            how: R`ملف الـ capability JSON فيه: [[identifier]] (اسمه)، و [[windows]] (أسامي النوافذ اللي ينطبق عليها، أو [[*]])، و [[permissions]] (ليستة)، واختياري [[platforms]] (macOS و windows و linux و android و iOS) و [[remote]] (لو صفحة من URL برّه).

اسم الـ permission: [[plugin:allow-command]] أو [[plugin:deny-command]] أو [[plugin:default]] (مجموعة الافتراضي). [[core:default]] بيسمح بحاجات القراية الآمنة (القالب حاطه): [[npx tauri permission ls core:window]] بيوري إن [[core:window:default]] فيه [[allow-title]] (قراية العنوان) بس مش [[allow-set-title]].

جربت: من غير الـ permission، [[setTitle]] اترفض بـ [[Command plugin:window|set_title not allowed by ACL]] (ACL = Access Control List). بعد [[permission add]] وبناء تاني: [[title set]].

الـ plugins (fs و dialog و shell و http...) كل واحد ليه permissions، وبعضهم بـ scope: [[fs:allow-read-text-file]] مع [[{ "path": "$APPDATA/*" }]] يعني قراية ملفات فولدر البرنامج بس. [[npx tauri add <plugin>]] بيضيف الـ crate والـ npm package والـ permission الافتراضي (جربته مع updater: عمل [[capabilities/desktop.json]] فيه [[updater:default]] لـ [[platforms]] الديسكتوب).

الـ commands بتاعتك (اللي في [[generate_handler!]]) مسموحة لكل النوافذ افتراضيًا. لو عايز تتحكم فيها كمان، بتعرّفها في [[build.rs]] بـ [[AppManifest]] وتعمل لها permissions (من الـ docs، صفحة «Permissions»). الملفات بتتجمع وقت البناء: تعديل capability محتاج build جديد.`,
            when: "مع كل plugin أو API جديد بتستخدمه. وافصل capabilities للنوافذ: نافذة بتعرض محتوى من النت أو من اليوزر تاخد أقل حاجة، ونافذة الإعدادات تاخد اللي محتاجاه بس.",
            mistakes: R`تحط [[fs:default]] أو [[shell:allow-execute]] من غير scope عشان «الـ error يروح»: كده رجّعت مشكلة Electron. وتنسى إن [[windows: ["main"]]] بيطابق اسم النافذة (label) مش العنوان، فنافذة جديدة اسمها تاني مش هتاخد ولا permission. وتعدّل الـ JSON وتشغّل الـ build القديم وتستغرب إن لسه مرفوض.`
          },
          teach: R`## الواجهة ممنوعة من كل حاجة، إلا اللي انت سامحه

اتجرّب في container لينكس على نفس مشروع [[notes-app]] (Tauri 2.12.5 و CLI 2.12.4)، والنتايج من الواجهة طالعة في الترمنال بالـ command [[log]] من الدرس اللي فات.

---

## ١. [[cat src-tauri/capabilities/default.json]]

~~~text الناتج
{
  "$schema": "../gen/schemas/desktop-schema.json",
  "identifier": "default",
  "description": "Capability for the main window",
  "windows": ["main"],
  "permissions": [
    "core:default",
    "opener:default"
  ]
}
~~~

| الخانة | معناها |
|---|---|
| [[$schema]] | ملف بيخلي VS Code يكمّل لك أسامي الـ permissions ويعلّم الغلط |
| [[identifier]] | اسم الـ capability |
| [[windows: ["main"]]] | تنطبق على النافذة اللي الـ label بتاعها [[main]] (الافتراضي لأول نافذة) |
| [[core:default]] | الحاجات الآمنة من الـ core (قراية معلومات النافذة والأحداث...) |
| [[opener:default]] | الافتراضي من plugin الـ opener (فتح لينكات في المتصفح) |

---

## ٢. جرّب حاجة مش مسموحة

في [[main.js]]:

~~~javascript
await window.__TAURI__.window.getCurrentWindow().setTitle("Notes");
~~~

~~~text الناتج
[js] error: Command plugin:window|set_title not allowed by ACL
~~~

- [[plugin:window|set_title]]: الأمر الداخلي اللي [[setTitle]] بيناديه.
- [[not allowed by ACL]]: مش موجود في أي capability للنافذة دي.

---

## ٣. [[npx tauri permission ls core:window]]

بيعرض كل permissions الـ window. المهم منها:

~~~text الناتج (مختصر)
core:window:default
Default permissions for the plugin.
Permissions: allow-get-all-windows, allow-scale-factor, ..., allow-title, allow-current-monitor, ...
core:window:allow-set-title
Enables the set_title command without any pre-configured scope.
Allow commands: set_title
~~~

[[default]] فيه [[allow-title]] (تقرا العنوان) بس، مش [[allow-set-title]] (تغيّره). أي حاجة بتغيّر لازم تطلبها.

## ٤. [[npx tauri permission add core:window:allow-set-title]]

~~~text الناتج
Added permission $__btcore:window:allow-set-title$__bt to $__btdefault$__bt at /root/notes-app/src-tauri/capabilities/default.json
~~~

## ٥. [[cat]] تاني

~~~text الناتج (الجزء اللي اتغير)
  "permissions": [
    "core:default",
    "opener:default",
    "core:window:allow-set-title"
  ]
~~~

## ٦. [[npm run tauri build -- --no-bundle]]

الـ capabilities بتتجمع جوه البرنامج وقت البناء، فلازم build. [[--no-bundle]] = ابني البرنامج من غير installers (أسرع: ٩٥ ثانية هنا لأن الـ crates متبنية). وشغّلته:

~~~text الناتج
[js] title set
~~~

---

## ٧. capability للـ plugins: اللي [[tauri add]] بيعمله

لما ضفت plugin الـ updater (درس جاي) بـ [[npx tauri add updater]]، عمل ملف تاني:

~~~text src-tauri/capabilities/desktop.json
{
  "identifier": "desktop-capability",
  "platforms": ["macOS", "windows", "linux"],
  "windows": ["main"],
  "permissions": ["updater:default"]
}
~~~

[[platforms]]: الملف ده للديسكتوب بس (الـ updater مش شغال على الموبايل). كل الملفات في الفولدر بتتجمع مع بعض.

## الخلاصة

| الحاجة | الأمر/الشكل |
|---|---|
| شوف المتاح | [[npx tauri permission ls <plugin>]] |
| ضيف | [[npx tauri permission add <permission>]] |
| plugin جديد بـ permission الافتراضي | [[npx tauri add <plugin>]] |
| الرفض شكله | [[... not allowed by ACL]] |
| بعد التعديل | build جديد |

خد أقل permission محتاجه، وبـ scope لو الـ plugin بيدعمه.`,
          lines: [
            "اعرض الـ capability الافتراضية: النافذة main و core:default و opener:default.",
            "اعرض كل permissions الخاصة بالنوافذ وإيه اللي جوه core:window:default.",
            "ضيف permission تغيير عنوان النافذة للـ capability.",
            "اتأكد إنها اتضافت.",
            "ابني البرنامج من غير installers عشان الصلاحيات الجديدة تدخل فيه."
          ],
          sol: R`قبل الـ permission: [[Command plugin:window|set_title not allowed by ACL]]. بعد [[permission add]] و build: العنوان اتغير.

نافذة settings بـ capability لوحدها: لو نافذة [[main]] بتعرض محتوى من اليوزر (ملاحظات فيها HTML مثلًا) واتحقن فيها كود، مش هيقدر يعمل اللي settings مسموحلها بيه (زي كتابة ملف الإعدادات). كل نافذة بأقل صلاحيات تلزمها.`,
          solCode: R`{
  "identifier": "settings",
  "windows": ["settings"],
  "permissions": ["core:default", "core:window:allow-set-title"]
}`
        },
        {
          cmd: "tauri build",
          title: "اعمل installer: deb و rpm و AppImage، و msi و exe، و dmg",
          desc: R`[[npm run tauri build]] بيبني الواجهة، وبعدين نسخة release من Rust، وبعدين بيغلّفها installers للنظام اللي انت عليه: على لينكس [[.deb]] و [[.rpm]] و [[.AppImage]]، وعلى ويندوز [[-setup.exe]] (NSIS) و [[.msi]]، وعلى الماك [[.app]] و [[.dmg]]. كل نظام بيتبني على نفسه (أو في CI على runner بنفس النظام).

[[--bundles]] بيختار أنواع معينة، و [[--no-bundle]] البرنامج بس من غير installer.`,
          example: R`npm run tauri build -- --bundles deb,rpm
ls -lh src-tauri/target/release/notes-app
ls src-tauri/target/release/bundle/*/
dpkg-deb -c src-tauri/target/release/bundle/deb/notes-app_0.1.0_amd64.deb
du -sh src-tauri/target`,
          try: R`غيّر [[version]] في [[tauri.conf.json]] لـ [[0.2.0]] وابني تاني. اسم الـ deb اتغير؟ وكام ثانية أخد البناء التاني مقارنة بالأول؟ وبعدين اقرا في [[Cargo.toml]] الـ [[[profile.release]]] وجرّب تشيل [[strip = true]] وقارن حجم البرنامج.`,
          deep: {
            why: "اليوزر مش هيعمل cargo build. محتاج ملف يسطّبه، باسم وأيقونة وإدخال في قايمة البرامج. وكل نظام ليه شكل installer مختلف، وكمان الـ updater (الدرس الجاي) بياخد منه الملف اللي ينزّله.",
            how: R`[[npm run tauri build]] بيعمل بالترتيب: [[beforeBuildCommand]] لو موجود (زي [[npm run build]] بتاع Vite)، ثم [[cargo build --release]] بإعدادات [[[profile.release]]] (lto و strip...)، ثم الـ bundler. الـ [[--]] بيعدّي [[--bundles deb,rpm]] للـ CLI.

جربت على لينكس (Docker): أول build ‏538 ثانية (منهم تنزيل وبناء ٤٤٧ crate)، والـ builds اللي بعده دقيقة ونص لـ ٣ دقايق. الناتج [[target/release/notes-app]] ‏6 ميجا (8 بعد plugin الـ updater)، والـ deb ‏2.3 ميجا. وفولدر [[target]] كله ‏1.5 جيجا (ملفات وسيطة، بيتمسح عادي).

الـ deb فيه: البرنامج في [[/usr/bin]]، وملف [[.desktop]] (عشان يظهر في قايمة البرامج)، والأيقونات. و [[Depends]] بيقول للنظام يسطّب WebKitGTK لو مش موجود.

AppImage: ملف واحد بيشتغل على أغلب التوزيعات، بس بيشحن WebKitGTK جواه فحجمه أكبر بكتير، والبناء بينزّل أدوات linuxdeploy (مبنيتهوش هنا).

ويندوز (من الـ docs، مش متجرّب هنا لأن Build Tools مش متسطبة): NSIS بيطلّع [[*-setup.exe]] و WiX بيطلّع [[.msi]]، و [[bundle.windows.webviewInstallMode]] بيحدد يعمل إيه لو WebView2 مش موجود: [[downloadBootstrapper]] (الافتراضي، بينزّله وقت التسطيب)، أو [[embedBootstrapper]] (~1.8 ميجا زيادة)، أو [[offlineInstaller]]، أو [[fixedRuntime]] (~180 ميجا زيادة). والتوقيع: [[certificateThumbprint]] و [[timestampUrl]] تحت [[bundle.windows]]، وإلا SmartScreen هيحذّر زي Electron.

الماك (من الـ docs): [[.app]] و [[.dmg]]، ولازم توقيع بـ Apple Developer ID و notarization وإلا Gatekeeper بيرفض يفتحه. والبناء لكل الأنظمة من GitHub Actions بـ [[tauri-apps/tauri-action]] على [[ubuntu-latest]] و [[windows-latest]] و [[macos-latest]].`,
            when: "كل ما تجهّز نسخة لحد. وفي التطوير [[tauri dev]] أو [[build --no-bundle]] أسرع. ونزّل لكل نظام النوع المتعارف عليه: exe/msi لويندوز، و dmg للماك، و deb و AppImage للينكس.",
            mistakes: R`تحاول تبني installer ويندوز من لينكس أو العكس: Tauri بيبني للنظام اللي انت عليه، والـ cross-compile تجريبي. استخدم CI. وتنسى تزوّد [[version]]: الـ updater والـ installers بيعتمدوا عليه. وتشيل [[strip]] و [[lto]] عشان البناء أسرع وتنسى ترجعهم، فالبرنامج يكبر. وتحط [[src-tauri/target]] في git (١.٥ جيجا).`
          },
          teach: R`## من كود لـ installer

اتجرّب في container لينكس (Debian 12، Rust 1.99، Tauri CLI 2.12.4) على [[notes-app]].

---

## ١. [[npm run tauri build -- --bundles deb,rpm]]

- [[npm run tauri build]]: شغّل [[tauri build]] من الـ CLI.
- [[--]]: اللي بعده يروح لـ tauri مش لـ npm.
- [[--bundles deb,rpm]]: الـ deb والـ rpm بس (من غير AppImage).

~~~text الناتج (أول build، السطور المهمة)
    Updating crates.io index
     Locking 447 packages to highest Rust 1.99.1 compatible versions
   Compiling webkit2gtk v2.0.2
   Compiling tao v0.37.2
    ...
    Finished $__btrelease$__bt profile [optimized] target(s) in 8m 55s
       Built application at: /root/notes-app/src-tauri/target/release/notes-app
    Bundling notes-app_0.1.0_amd64.deb (.../bundle/deb/notes-app_0.1.0_amd64.deb)
    Bundling notes-app-0.1.0-1.x86_64.rpm (.../bundle/rpm/notes-app-0.1.0-1.x86_64.rpm)
    Finished 2 bundles at:
        .../bundle/deb/notes-app_0.1.0_amd64.deb (2.32 MiB)
        .../bundle/rpm/notes-app-0.1.0-1.x86_64.rpm (2.32 MiB)
~~~

| السطر | معناه |
|---|---|
| [[Locking 447 packages]] | Rust حدد ٤٤٧ crate هيتبنوا (tauri و webview و gtk و serde...) |
| [[Compiling ...]] | سطر لكل crate (بيتبنوا مرة، وبعدين بيتعادوا لو اتغيروا بس) |
| [[profile [optimized]]] | release بإعدادات [[[profile.release]]] |
| [[8m 55s]] | أول مرة بس. البناء التالت (بعد تعديل capability) أخد ٩٥ ثانية |
| [[Bundling]] | تغليف البرنامج في deb و rpm |

## ٢. [[ls -lh src-tauri/target/release/notes-app]]

~~~text الناتج (أول build، قبل plugin الـ updater، بـ ls -la)
-rwxr-xr-x 2 root root 6077112 Oct 27 22:44 notes-app
~~~

ده البرنامج نفسه: 6077112 بايت ≈ 5.8 ميجا (و [[-h]] بيكتبه [[5.8M]]). من غير WebKit جواه، لأنه بيستخدم بتاع النظام.

## ٣. [[ls src-tauri/target/release/bundle/*/]]

[[*]] أي فولدر: بيعرض محتوى [[deb/]] و [[rpm/]]:

~~~text الناتج (بعد بنايات درس الـ updater، فيه نسختين و .sig)
src-tauri/target/release/bundle/deb/:
notes-app_0.1.0_amd64
notes-app_0.1.0_amd64.deb
notes-app_0.1.0_amd64.deb.sig

src-tauri/target/release/bundle/rpm/:
notes-app-0.1.0-1.x86_64
notes-app-0.1.0-1.x86_64.rpm
notes-app-0.1.0-1.x86_64.rpm.sig
notes-app-0.2.0-1.x86_64
notes-app-0.2.0-1.x86_64.rpm
notes-app-0.2.0-1.x86_64.rpm.sig
~~~

الفولدرات اللي من غير امتداد هي الملفات قبل ما تتقفل في الباكدج، و [[.sig]] توقيع الـ updater (الدرس الجاي). اسم الملف = [[productName]] + [[version]] + المعمارية ([[amd64]] = [[x86_64]] = 64 بت).

## ٤. [[dpkg-deb -c ...deb]]

[[-c]] (contents) بيعرض الملفات اللي جوه الباكدج:

~~~text الناتج (الحجم والمسار)
8286944 usr/bin/notes-app
150 usr/share/applications/notes-app.desktop
567 usr/share/icons/hicolor/32x32/apps/notes-app.png
1593 usr/share/icons/hicolor/128x128/apps/notes-app.png
2861 usr/share/icons/hicolor/256x256@2/apps/notes-app.png
~~~

(ده بعد plugin الـ updater، فالبرنامج 8 ميجا.) البرنامج في [[/usr/bin]]، وملف [[.desktop]] بيحطه في قايمة البرامج، والأيقونات من [[src-tauri/icons]].

## ٥. [[du -sh src-tauri/target]]

~~~text الناتج
1.5G	src-tauri/target
~~~

[[du]] (disk usage) و [[-s]] المجموع و [[-h]] بالجيجا. كل الملفات الوسيطة للبناء. بتتمسح عادي ([[cargo clean]])، ولازم في [[.gitignore]].

---

## ٦. ويندوز والماك (من الـ docs)

| النظام | الأمر | الناتج |
|---|---|---|
| ويندوز | [[npm run tauri build]] | [[bundle/nsis/*-setup.exe]] و [[bundle/msi/*.msi]] |
| الماك | [[npm run tauri build]] | [[bundle/macos/*.app]] و [[bundle/dmg/*.dmg]] |

ويندوز محتاج Build Tools (الـ MSVC linker)، و WebView2 لو مش موجود عند اليوزر بيتنزّل وقت التسطيب (الافتراضي [[downloadBootstrapper]]). والتوقيع:

~~~text tauri.conf.json (من الـ docs)
"bundle": {
  "windows": {
    "certificateThumbprint": "A1B1A2B2...",
    "digestAlgorithm": "sha256",
    "timestampUrl": "http://timestamp.comodoca.com"
  }
}
~~~

## الخلاصة

| الأمر | بيعمل |
|---|---|
| [[tauri build]] | كل الـ installers المتاحة للنظام |
| [[tauri build -- --bundles deb,rpm]] | أنواع معينة |
| [[tauri build -- --no-bundle]] | البرنامج بس |
| [[target/release/bundle/]] | مكان الـ installers |

كل نظام بيتبني على نفسه، فللتلاتة: GitHub Actions بـ runner لكل نظام.`,
          lines: [
            "ابني نسخة release واعمل منها deb و rpm بس.",
            "حجم البرنامج نفسه (من غير installer).",
            "الـ installers اللي اتعملت، كل نوع في فولدر.",
            "الملفات اللي جوه الـ deb: البرنامج وملف القايمة والأيقونات.",
            "مساحة فولدر البناء كله (ملفات وسيطة)."
          ],
          sol: R`بعد [[version: "0.2.0"]]: الملف بقى [[notes-app-0.2.0-1.x86_64.rpm]] (والـ deb [[notes-app_0.2.0_amd64.deb]]). البناء التاني بعد التعديل أخد دقايق قليلة مش ٩، لأن الـ crates متبنية والمتغير كود البرنامج بس.

من غير [[strip = true]] البرنامج بيكبر، لأن رموز الـ debug (أسامي الدوال للـ stack traces) بتفضل جواه. (تجربة strip دي مش متجرّبة هنا، المعلومة من صفحة «App Size» في docs بتاعة Tauri.)`
        },
      ]
    },
    {
      t: "Tauri: تحديث تلقائي موقّع",
      l: 3,
      n: "البرنامج يسأل سيرفرك عن نسخة جديدة وينزّلها، ومش بيقبل غير ملف موقّع بمفتاحك",
      items: [
        {
          cmd: "tauri updater",
          title: "التحديث التلقائي: مفتاح، و latest.json، و check() من الواجهة",
          desc: R`plugin الـ updater بيخلي البرنامج يسأل URL انت حاطه عن آخر نسخة ([[latest.json]])، ولو أحدث ينزّلها ويسطّبها. كل ملف تحديث لازم يبقى موقّع بمفتاح خاص عندك انت بس، والبرنامج شايل المفتاح العام وبيرفض أي ملف توقيعه غلط، حتى لو حد سيطر على السيرفر.

[[tauri signer generate]] بيعمل المفتاحين، و [[TAURI_SIGNING_PRIVATE_KEY]] وقت البناء بيطلّع ملف [[.sig]] جنب كل installer.`,
          example: R`npx tauri add updater
npx tauri signer generate -w ~/.tauri/notes.key
export TAURI_SIGNING_PRIVATE_KEY=~/.tauri/notes.key TAURI_SIGNING_PRIVATE_KEY_PASSWORD=""
npm run tauri build
cat src-tauri/target/release/bundle/rpm/notes-app-0.2.0-1.x86_64.rpm.sig
// src/main.js
const update = await window.__TAURI__.updater.check();
if (update) { await update.downloadAndInstall(); }`,
          try: R`في نسخة 0.1.0 من البرنامج خلي [[check()]] يطبع [[update.version]] و [[update.body]]. اعمل [[latest.json]] بيقول [[0.2.0]] بس حط فيه ملف وتوقيع نسخة 0.1.0. إيه اللي حصل؟ وبعدين حط الملف والتوقيع الصح وزوّد بايت واحد في آخر الملف.`,
          deep: {
            why: "برنامج ديسكتوب من غير تحديث تلقائي = يوزرز على نسخ قديمة فيها bugs وثغرات للأبد. والتحديث نفسه أخطر feature في البرنامج: لو حد قدر يخلي البرنامج ينزّل ملفه هو، يبقى شغّل كود على كل أجهزة اليوزرز. عشان كده Tauri بيرفض يشتغل من غير توقيع.",
            how: R`[[npx tauri add updater]] بيضيف [[tauri-plugin-updater]] في [[Cargo.toml]] (للديسكتوب بس)، و [[@tauri-apps/plugin-updater]] في npm، و [[.plugin(tauri_plugin_updater::Builder::new().build())]] في [[lib.rs]]، و capability [[updater:default]]. في نسختي (2.14) حط كمان [[requireSignedVersion: true]].

[[tauri signer generate -w path]]: مفتاحين minisign: الخاص في [[path]] (اختياري بباسورد، و [[--ci -p ""]] من غير أسئلة)، والعام في [[path.pub]]. العام بيتحط **كنص** في [[plugins.updater.pubkey]] جوه [[tauri.conf.json]] (مش مسار ملف). والخاص يتحفظ كـ secret في CI ومتحطوش في git أبدًا.

[[tauri.conf.json]]: [[bundle.createUpdaterArtifacts: true]]، و [[plugins.updater.endpoints]]: ليستة URLs بيجرّبهم بالترتيب (ممكن فيهم [[{{target}}]] و [[{{arch}}]] و [[{{current_version}}]]). HTTPS إجباري في الإنتاج، و [[dangerousInsecureTransportProtocol: true]] للتجربة على http محلي بس.

[[latest.json]]: [[version]] و [[notes]] و [[pub_date]] و [[platforms]]، وكل platform ([[linux-x86_64]] و [[windows-x86_64]] و [[darwin-aarch64]]...) فيه [[url]] و [[signature]] (محتوى ملف الـ .sig نفسه، مش رابطه). Tauri بيتحقق من الملف كله قبل ما يقارن النسخة، فأي platform ناقص بيبوّظ الكل. و [[tauri-action]] في GitHub Actions بيعمله لوحده.

جربت end-to-end في Docker: برنامج 0.1.0، و [[latest.json]] على سيرفر محلي بيقول 0.2.0. [[check()]] رجّع التحديث، و [[download()]] نزّل 3548351 بايت والتوقيع اتقبل. لما حطيت ملف 0.1.0 وتوقيعه: [[The update was signed for version 0.1.0 but the update endpoint announced version 0.2.0]] (الـ trusted comment في التوقيع فيه النسخة، وده اللي [[requireSignedVersion]] بيتحقق منه). ولما زوّدت بايت في الملف: [[The signature verification failed]].

ده توقيع الـ updater، وهو غير توقيع النظام: ويندوز (SmartScreen) والماك (Gatekeeper و notarization) محتاجين شهادات code signing لوحدهم (درس «tauri build»).`,
          when: "أي برنامج هيتوزّع برّه جهازك. حط الـ updater من أول نسخة، لأن اليوزرز اللي نزّلوا نسخة من غيره مش هيوصلهم التحديث أبدًا إلا لو نزّلوا بإيدهم.",
          mistakes: R`تضيع المفتاح الخاص أو الباسورد: النسخ اللي اتوزعت مش هتقبل أي تحديث تاني أبدًا (الـ CLI نفسه بيحذّرك). وترفع المفتاح الخاص في git أو تحطه في [[.env]] (Tauri مش بيقرا .env للمتغير ده أصلًا). وتحط مسار الـ .sig أو رابطه في [[signature]] بدل محتواه. وتنسى تزوّد [[version]] فالبرنامج يفضل يقول مفيش تحديث. وتعمل [[downloadAndInstall()]] من غير ما تسأل اليوزر وهو شغال على حاجة.`
          },
          teach: R`## التحديث = ملف + توقيع + latest.json

اتجرّب كله في container لينكس (Tauri 2.12.5، tauri-plugin-updater 2.14.0) بسيرفر HTTP محلي على [[127.0.0.1:8765]]. ما رفعتش حاجة على النت.

---

## ١. [[npx tauri add updater]]

~~~text الناتج
Info Installing Cargo dependency "tauri-plugin-updater"...
Info Installing NPM dependency "@tauri-apps/plugin-updater@~2"...
Info Capability matching platforms ["macOS", "windows", "linux"] not found, creating .../capabilities/desktop.json
Added permission $__btupdater:default$__bt to $__btdesktop-capability$__bt at .../capabilities/desktop.json
Info Enabled $__btplugins > updater > requireSignedVersion$__bt in .../tauri.conf.json
Info Remember to set $__btplugins > updater > pubkey$__bt and $__btendpoints$__bt.
Info Adding plugin to .../src/lib.rs
~~~

٤ حاجات في أمر واحد: الـ crate، والـ npm package، والـ permission (capability للديسكتوب بس)، وسطر [[.plugin(...)]] في [[lib.rs]].

## ٢. [[npx tauri signer generate -w ~/.tauri/notes.key]]

[[-w]] (write) = احفظ المفتاح الخاص هنا. هيسألك باسورد (في CI: [[--ci -p ""]]).

~~~text الناتج
Your keypair was generated successfully:
Private: /root/keys/notes.key (Keep it secret!)
Public: /root/keys/notes.key.pub
---------------------------

Environment variables used to sign:
- $__btTAURI_SIGNING_PRIVATE_KEY$__bt: Your private key. For the $__btbuild$__bt and $__btbundle$__bt command it can be either a string or a path to the file
- $__btTAURI_SIGNING_PRIVATE_KEY_PASSWORD$__bt:  Your private key password (optional if key has no password)

ATTENTION: If you lose your private key OR password, you'll not be able to sign your update package and updates will not work
~~~

الملف العام نص base64، ولو فكيته أوله [[untrusted comment: minisign public key: 8DC5...]]: يعني ده مفتاح minisign (أداة توقيع صغيرة مبنية على Ed25519).

### الإعدادات في [[tauri.conf.json]]

~~~text tauri.conf.json
"bundle": { "createUpdaterArtifacts": true, ... },
"plugins": {
  "updater": {
    "requireSignedVersion": true,
    "pubkey": "<محتوى notes.key.pub>",
    "endpoints": ["http://127.0.0.1:8765/latest.json"],
    "dangerousInsecureTransportProtocol": true
  }
}
~~~

| الخانة | معناها |
|---|---|
| [[createUpdaterArtifacts]] | اعمل .sig مع كل installer |
| [[pubkey]] | المفتاح العام **كنص** |
| [[endpoints]] | فين latest.json (في الإنتاج https، زي GitHub Releases) |
| [[dangerousInsecureTransportProtocol]] | اسمح بـ http، للتجربة المحلية بس |

## ٣. البناء بالتوقيع

~~~bash
export TAURI_SIGNING_PRIVATE_KEY=~/.tauri/notes.key TAURI_SIGNING_PRIVATE_KEY_PASSWORD=""
npm run tauri build
~~~

[[export]] بيحط المتغيرين للأوامر اللي بعده (على ويندوز PowerShell: [[$env:TAURI_SIGNING_PRIVATE_KEY = "..."]]).

~~~text الناتج (آخره)
    Finished 1 updater signature at:
        /root/notes-app/src-tauri/target/release/bundle/rpm/notes-app-0.2.0-1.x86_64.rpm.sig
~~~

## ٤. الـ [[.sig]]

ملف base64 (‏436 بايت). لو فكيته:

~~~text الناتج (التوقيع نفسه متشال)
untrusted comment: signature from tauri secret key
<التوقيع>
trusted comment: timestamp:1793144861	file:notes-app-0.2.0-1.x86_64.rpm	version:0.2.0
~~~

الـ **trusted comment** موقّع هو كمان، وفيه اسم الملف والنسخة. ده اللي بيمنع حد يقدّم ملف قديم على إنه جديد.

---

## ٥. [[latest.json]] على السيرفر

~~~text latest.json
{
  "version": "0.2.0",
  "notes": "Faster search",
  "pub_date": "2026-10-28T10:00:00Z",
  "platforms": {
    "linux-x86_64": {
      "signature": "<محتوى الـ .sig كله>",
      "url": "http://127.0.0.1:8765/notes-app-0.2.0.rpm"
    }
  }
}
~~~

## ٦. من الواجهة

~~~javascript
const update = await window.__TAURI__.updater.check();
if (update) { await update.downloadAndInstall(); }
~~~

- [[check()]]: بيجيب latest.json ويقارن [[version]] بنسخة البرنامج. لو أحدث بيرجّع object، لو لأ [[null]].
- [[update.version]] و [[update.body]] (الـ notes) و [[update.currentVersion]].
- [[downloadAndInstall()]]: ينزّل، ويتحقق من التوقيع، ويسطّب. وبعدها [[relaunch()]] من plugin الـ process يفتح النسخة الجديدة.

في التجربة استخدمت [[download()]] بس (من غير تسطيب) وطبعت عدد البايتات، والبرنامج 0.1.0:

~~~text الناتج
[js] update 0.1.0 -> 0.2.0: Faster search
[js] downloaded 3548351 bytes, signature ok
~~~

---

## ٧. محاولتين غش (الاتنين اترفضوا)

| المحاولة | الناتج |
|---|---|
| latest.json بيقول 0.2.0 بس الملف والتوقيع بتوع 0.1.0 | [[The update was signed for version 0.1.0 but the update endpoint announced version 0.2.0. The endpoint response may have been tampered with...]] |
| الملف الصح بس اتزوّد فيه بايت واحد | [[The signature verification failed]] |

والسيرفر لوج قال إن البرنامج طلب [[/latest.json]] وبعدين الملف، يعني الرفض بيحصل بعد التنزيل وقبل التسطيب.

## الخلاصة

1. [[tauri add updater]] + [[signer generate]].
2. [[pubkey]] كنص و [[endpoints]] و [[createUpdaterArtifacts]].
3. البناء بـ [[TAURI_SIGNING_PRIVATE_KEY]] بيطلّع [[.sig]].
4. [[latest.json]] فيه النسخة و url ومحتوى الـ sig لكل platform.
5. [[check()]] ثم [[downloadAndInstall()]].

والمفتاح الخاص: secret في CI ونسخة احتياطي في مكان آمن. لو ضاع، مفيش تحديثات تاني.`,
          lines: [
            "ضيف plugin الـ updater: الـ crate والـ npm package والـ permission والسطر في lib.rs.",
            "اعمل مفتاحين للتوقيع: الخاص في الملف ده والعام جنبه بـ .pub.",
            "حط المفتاح الخاص (والباسورد) في متغيرات البيئة للبناء.",
            "ابني: كل installer بيطلع معاه ملف .sig.",
            "اعرض التوقيع: ده اللي بيتحط في signature جوه latest.json.",
            "الواجهة: اسأل الـ endpoint فيه نسخة أحدث؟",
            "لو فيه: نزّلها واتحقق من التوقيع وسطّبها."
          ],
          sol: R`ملف وتوقيع 0.1.0 مع [[version: "0.2.0"]] في latest.json: [[check()]] لقى التحديث، بس [[download()]] رجّع [[The update was signed for version 0.1.0 but the update endpoint announced version 0.2.0. The endpoint response may have been tampered with to force installing a different release.]]

الملف الصح وفيه بايت زيادة: [[The signature verification failed]]. في الحالتين ولا حاجة اتسطبت.`,
          solCode: R`const update = await window.__TAURI__.updater.check();
if (update) {
  console.log(update.currentVersion, "->", update.version, update.body);
  try { await update.download(); console.log("signature ok"); }
  catch (e) { console.log("error:", e); }
}`
        },
      ]
    }
]);
