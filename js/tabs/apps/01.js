// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   teach    اختياري: «الشرح خطوة بخطوة»: markdown صغير (## و ### و ~~~lang عنوان ... ~~~ و جداول | و - و 1. و > و ---). القواعد في README
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
//   check    اختياري: تمرين بيتصحح لوحده في الصفحة
//            JS:  { lang: "js", starter, tests: R`test("..", () => expect(x).toBe(y))`, solution }
//            SQL: { lang: "sql", setup: R`CREATE TABLE ...; INSERT ...`, starter, expect: [[...صفوف]] أو expectSql: R`استعلام مرجعي`, solution, ordered }
//            solution حل مرجعي مش بيظهر، و npm run check بيتأكد إنه بيعدّي الاختبارات. المتاح في tests: test و expect(x).toBe/toEqual/toThrow/toBeTruthy/toBeFalsy
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("apps", {
  label: "Desktop و Mobile",
  prompt: "$ ",
  lab: R`node -v
java -version
npx cap --version`,
  labText: "Electron محتاج Node بس. Android محتاج كمان JDK و Android SDK (أسهل حاجة تسطّب Android Studio). على ويندوز شغّل gradlew.bat بدل ./gradlew.",
  levels: {"1":["البداية","تشغّل التطبيق وتفهم بيتكوّن من إيه"],"2":["المتوسط","تبني .exe أو APK على جهازك"],"3":["المتقدم","توقيع وبناء أوتوماتيك في CI ونشر النسخ"]},
  categories: [
    {
      t: "Electron: موقع جوه برنامج",
      l: 1,
      n: "Electron بيحط واجهة ويب في نافذة برنامج حقيقي، ومعاها Node",
      items: [
        {
          cmd: "npx electron .",
          title: "شغّل تطبيق Electron",
          desc: R`Electron بيحط موقعك (HTML و JS) جوه نافذة برنامج، ومعاه Node عشان يقرا ملفات ويكلّم النظام. التطبيق بيبدأ من الملف اللي مكتوب في [[main]] في package.json، و [[npx electron .]] بيشغّله من الفولدر ده.

عادة بتعمل سكربت [[start]] بيعمل نفس الحاجة، فتكتب [[npm start]] وخلاص.`,
          example: R`npm init -y
npm install --save-dev electron
npm pkg set main=main.js
npm pkg set scripts.start="electron ."
npm start`,
          try: "اعمل فولدر فيه main.js (الدرس اللي بعده) و index.html فيه كلمة «أهلًا»، وشغّله بـ [[npm start]].",
          deep: {
            why: "عايز برنامج لويندوز أو لينكس وانت بتعرف HTML و JS بس. Electron بيديك نافذة حقيقية بأيقونة في شريط المهام، والكود نفسه بتاع الويب.",
            how: R`التطبيق فيه نوعين كود:

الـ [[main process]]: الملف اللي في [[main]] (غالبًا main.js). ده Node عادي: بيفتح النوافذ، ويقرا ويكتب ملفات، ويتحكم في القوايم. واحد بس للتطبيق كله.

الـ [[renderer]]: كل نافذة صفحة ويب (Chromium) بتحمّل index.html أو URL. ده كود الواجهة، وافتراضيًا مالوش وصول لـ Node عشان الأمان.

الـ [[preload.js]]: ملف صغير بيشتغل قبل الصفحة، وبيدّي الواجهة دوال معيّنة بس بـ [[contextBridge]]، زي [[window.api.saveFile()]]. ده الجسر الوحيد بين الاتنين.

[[npx electron .]] بيشغّل Electron اللي في node_modules، والنقطة معناها «التطبيق هو الفولدر ده» فبيقرا package.json منه. و [[npm pkg set]] بيعدّل package.json من الترمنال من غير ما تفتحه.

Electron نفسه حوالي ١٠٠ ميجا بينزل مع npm install، وعشان كده في devDependencies: البرنامج النهائي بياخد نسخة منه وقت التغليف.`,
            when: "برنامج ديسكتوب لأداة داخلية أو فريق صغير، وعندك واجهة ويب جاهزة أو بتعرف تعملها.",
            mistakes: R`[[nodeIntegration: true]] في النافذة عشان «يشتغل»: أي سكربت في الصفحة يقدر يمسح ملفات. استخدم preload. وعلى لينكس Electron ممكن يرفض يقوم برسالة عن [[chrome-sandbox]]: الملف [[node_modules/electron/dist/chrome-sandbox]] لازم يبقى ملك root بصلاحية 4755. في مشروع حقيقي الحل كان [[sudo chown root:root]] و [[sudo chmod 4755]] عليه، ولازم تعيدها بعد أي npm install بيسطّب Electron من جديد.`
          },
          lines: [
            "package.json جديد.",
            "سطّب Electron كـ devDependency.",
            "خلّي نقطة البداية main.js.",
            "سكربت start بيشغّل Electron على الفولدر ده.",
            "شغّل."
          ],
          sol: R`[[npm start]] بيفتح نافذة سطح مكتب فيها الـ [[index.html]] بتاعك، وفوقها منيو [[File]] و [[Edit]] الافتراضية بتاعة Electron. جربتها (بـ Xvfb لأن مفيش شاشة هنا) والنافذة فتحت والعنوان طلع [[My App]] وكلمة «أهلًا» ظهرت.

في الترمنال هتلاقي أي [[console.log]] من [[main.js]] بيظهر هنا (ده الـ main process)، مش في DevTools. لو النافذة فتحت بيضا خالص، غالبًا مسار الملف غلط في [[loadFile]]، أو نسيت [[app.whenReady()]].

لو طلع [[Error: Cannot find module 'electron']] يبقى التسطيب مخلصش، و [[electron: command not found]] معناها إنك بتشغّل [[electron]] لوحده مش [[npx electron .]] أو [[npm start]]. وعلى سيرفر من غير شاشة لازم [[xvfb-run]] (ولو بتشتغل كـ root محتاج [[--no-sandbox]]).`
        },
        {
          cmd: "main.js",
          title: "أصغر تطبيق Electron",
          desc: "الـ main.js بيستنى Electron يجهز، ويفتح نافذة، ويحمّل فيها الواجهة. وانت بتطوّر بيحمّل سيرفر Vite عشان التعديلات تظهر على طول، وفي النسخة المتغلّفة بيحمّل الملفات المبنية. و [[app.isPackaged]] هو اللي بيفرّق.",
          example: R`const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000, height: 700,
    webPreferences: { preload: path.join(__dirname, 'preload.js') }
  });
  if (app.isPackaged) win.loadFile(path.join(__dirname, 'dist/index.html'));
  else win.loadURL('http://localhost:5173');
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });`,
          try: "غيّر width و height وشغّل تاني. وبعدين افتح DevTools من النافذة بـ Ctrl+Shift+I وشوف إن [[require]] مش موجود في الواجهة.",
          flag: "script",
          deep: {
            why: "ده الهيكل اللي كل تطبيق Electron بيبدأ منه. لو فهمته، أي مشروع Electron هتعرف تقراه.",
            how: R`[[app]] بيمثّل البرنامج كله، و [[BrowserWindow]] نافذة. [[app.whenReady()]] لازم: مينفعش تفتح نوافذ قبل ما Electron يجهز.

[[webPreferences.preload]] مسار ملف الـ preload. [[path.join(__dirname, ...)]] مهم: [[__dirname]] هو فولدر main.js نفسه، فالمسار يشتغل مهما كان البرنامج اتشغّل منين.

[[app.isPackaged]] بيبقى false وانت شغّال بـ [[npx electron .]]، و true في الـ exe. فوانت بتطوّر بيحمّل [[localhost:5173]] (سيرفر Vite بـ hot reload)، وفي النسخة النهائية بيحمّل [[dist/index.html]] من جوه البرنامج.

[[window-all-closed]]: لما آخر نافذة تتقفل اقفل البرنامج، إلا على الماك ([[darwin]]) لأن العادة هناك البرنامج يفضل في الـ Dock.`,
            when: "أول ملف في أي تطبيق Electron.",
            mistakes: "مسار نسبي زي [['dist/index.html']] من غير __dirname: بيشتغل عندك وبيطلع شاشة بيضا في النسخة المتغلّفة. وتحميل localhost في النسخة النهائية فيطلع «This site can't be reached» عند المستخدم."
          },
          lines: [
            "هات app و BrowserWindow من Electron.",
            "مكتبة المسارات.",
            "دالة بتفتح النافذة.",
            "نافذة جديدة...",
            "...بمقاس.",
            "...و preload بمسار مطلق من فولدر الملف.",
            "نهاية الإعدادات.",
            "في البرنامج المتغلّف: حمّل الملفات المبنية.",
            "وانت بتطوّر: حمّل سيرفر Vite.",
            "نهاية الدالة.",
            "لما Electron يجهز افتح النافذة.",
            "لما النوافذ كلها تتقفل اقفل البرنامج (إلا على الماك)."
          ],
          sol: R`لما تغيّر [[width]] و [[height]] وتشغّل تاني، النافذة بتفتح بالمقاس الجديد. جربت [[win.getSize()]] بعد التحميل ورجع [[[ 1000, 700 ]]] بالظبط.

في DevTools (Ctrl+Shift+I) لو كتبت [[typeof require]] في Console الواجهة هيرجع [[undefined]]. جربتها من الكود ([[executeJavaScript('typeof require')]]) والنتيجة كانت [[undefined]]. ده مقصود وآمن: [[contextIsolation]] و [[nodeIntegration: false]] هما الافتراضي من Electron 12، فكود الصفحة ماينفعش يوصل لـ Node مباشرة. لو عايز الواجهة تنادي حاجة من النظام، بتعرّضها من [[preload.js]] بـ [[contextBridge]].

لو [[require]] طلع [[function]] يبقى عندك [[nodeIntegration: true]] أو Electron قديم، وده ثغرة أمان حقيقية لو بتحمّل محتوى من النت.`
        },
        {
          cmd: "npm run dev",
          title: "الواجهة و Electron مع بعض وانت بتطوّر",
          desc: "وانت بتطوّر عايز Vite شغال بـ hot reload، و Electron يفتح عليه. بس لو Electron قام قبل Vite هيفتح صفحة فاضية. [[concurrently]] بيشغّل الاتنين من أمر واحد، و [[wait-on]] بيخلي Electron يستنى لحد ما البورت يرد.",
          example: R`npm install --save-dev concurrently wait-on
# في package.json جوه "scripts":
#   "dev": "concurrently -k \"vite\" \"wait-on tcp:5173 && electron .\""
npm run dev
# نفس الفكرة بإيدك في ترمنالين:
npx vite
npx wait-on tcp:5173 && npx electron .`,
          try: "شغّل [[npm run dev]]، وعدّل كلمة في الواجهة وشوفها بتتغير لوحدها. وبعدين عدّل main.js وشوف إنها مش بتتغير غير لما تعيد التشغيل.",
          deep: {
            why: "من غير السكربت ده: ترمنال لـ Vite، وتستنى، وترمنال تاني لـ Electron، وكل مرة. ولو شغّلت Electron بدري بتلاقي نافذة بيضا وتفتكر فيه مشكلة.",
            how: R`[[concurrently]] بيشغّل كذا أمر مع بعض في نفس الترمنال، وبيحط قبل كل سطر رقم زي [0] أو [1] عشان تعرف مين قال إيه. و [[-k]] معناها لو واحد خلص اقفل الباقي: تقفل نافذة Electron، Vite يقف معاها.

[[wait-on tcp:5173]] بيفضل يجرّب البورت لحد ما حد يرد، وبعدين يكمّل للأمر اللي بعد [[&&]]. ممكن كمان [[http://localhost:5173]] يستنى صفحة ترجع 200.

الـ [[\"]] جوه package.json عشان النص نفسه جوه علامات تنصيص JSON.

الـ hot reload بيشتغل على الواجهة بس. تعديل main.js أو preload.js محتاج تعيد تشغيل Electron (أو أداة زي electronmon بتعيده لوحدها).`,
            when: "أي تطبيق Electron واجهته بـ Vite أو React أو أي dev server.",
            mistakes: R`Vite لقى 5173 مشغول فقام على 5174 من غير ما يقولك بصوت عالي، و wait-on فضل مستني 5173 للأبد. حط [[server: { strictPort: true }]] في vite.config عشان يفشل بدل ما يغيّر البورت. ومن غير [[-k]]، تقفل Electron ويفضل Vite شغال ماسك البورت.`
          },
          lines: [
            "سطّب الأداتين كـ devDependencies.",
            "شغّل الاتنين مع بعض.",
            "ترمنال ١: سيرفر الواجهة.",
            "ترمنال ٢: استنى البورت يرد، وبعدين افتح Electron."
          ],
          sol: R`[[npm run dev]] بيشغّل Vite و Electron مع بعض. لما تعدّل كلمة في الواجهة وتحفظ، بتتغير في نافذة Electron لوحدها من غير reload، لأن Electron بيحمّل [[http://localhost:5173]] و Vite بيعمل HMR زي المتصفح بالظبط.

بس لو عدّلت [[main.js]] (كود الـ main process) مش هيتغير: لازم تقفل Electron وتشغّل [[npm run dev]] تاني، لأن الـ main process مابيتعملوش hot reload. ده الفرق اللي المفروض تحسّه في التجربة.

[[concurrently -k]] مهم: الـ [[-k]] بيقفل Vite لما تقفل Electron. من غيره Vite هيفضل شغال على 5173 وتقفل الترمنال. ولو Electron فتح على طول وطلّع شاشة بيضا أو خطأ اتصال، يبقى [[wait-on tcp:5173]] مش موجود وElectron سبق Vite.`
        }
      ]
    },
    {
      t: "Capacitor: موقعك تطبيق موبايل",
      l: 1,
      n: "Capacitor بياخد build الويب ويحطه جوه مشروع أندرويد حقيقي",
      items: [
        {
          cmd: "npx cap add android",
          title: "ضيف أندرويد لمشروع ويب",
          desc: R`Capacitor بياخد الموقع بعد الـ build (فولدر dist) ويحطه جوه تطبيق أندرويد بيعرضه في WebView، ومعاه plugins للكاميرا والإشعارات وغيرها. [[cap init]] بيعمل ملف الإعدادات، و [[cap add android]] بيعمل فولدر [[android/]] فيه مشروع Android Studio كامل.

فولدر android/ ده بيتعمله commit: ده المشروع الأصلي بتاعك، وهتعدّل فيه الأيقونات والصلاحيات والتوقيع.`,
          example: R`npm install @capacitor/core
npm install --save-dev @capacitor/cli
npx cap init myapp com.example.myapp --web-dir dist
npm install @capacitor/android
npm run build
npx cap add android`,
          try: "على مشروع Vite تجربة: نفّذ الأوامر دي، وافتح [[capacitor.config.ts]] وشوف appId و webDir، وبص جوه فولدر android/.",
          deep: {
            why: "عندك موقع React أو Vue شغال، والعميل عايز تطبيق على الموبايل. بدل ما تكتب التطبيق من الأول، Capacitor بيلف نفس الموقع في تطبيق حقيقي يتسطّب.",
            how: R`[[@capacitor/core]] المكتبة اللي الكود بتاعك بيستخدمها، و [[@capacitor/cli]] أداة الأوامر [[cap]]، و [[@capacitor/android]] المنصة نفسها.

[[cap init]] بياخد: اسم التطبيق، و [[appId]] بصيغة دومين معكوس ([[com.example.myapp]])، و [[--web-dir]] الفولدر اللي الـ build بيطلع فيه (dist لـ Vite، و build لـ Create React App).

الـ appId هو الـ package name في أندرويد: هوية التطبيق للأبد. لو غيرته بعدين، أندرويد والـ Play Store بيعتبروه تطبيق تاني خالص.

[[cap add android]] محتاج الـ build يكون اتعمل، لأنه بينسخ webDir جوه المشروع. وبيعمل [[android/]] بـ Gradle والملفات كلها.

وفيه iOS بنفس الطريقة ([[@capacitor/ios]] و [[cap add ios]])، بس محتاج ماك و Xcode.`,
            when: "مرة واحدة في أول المشروع.",
            mistakes: R`webDir غلط فيطلع [[Could not find the web assets directory]]. وتحط android/ في .gitignore فتضيع كل تعديلاتك في المشروع الأصلي. وتغيّر appId بعد ما الناس سطّبت التطبيق: النسخة الجديدة مش هتتسطّب كتحديث.`
          },
          lines: [
            "المكتبة الأساسية.",
            "أداة الأوامر cap.",
            "ملف الإعدادات: الاسم، والـ appId، وفولدر الـ build.",
            "منصة أندرويد.",
            "ابني الموقع الأول.",
            "اعمل مشروع أندرويد في فولدر android/."
          ],
          sol: R`جربت الأوامر على مشروع فيه فولدر [[dist]]. [[npx cap init]] عمل [[capacitor.config.json]] (أو [[.ts]]) وجواه:

[[{ "appId": "com.example.myapp", "appName": "myapp", "webDir": "dist" }]]

و [[npx cap add android]] طلّع [[✔ add android]] و [[[success] android platform added!]] وعمل فولدر [[android/]] فيه مشروع Gradle كامل ([[gradlew]] و [[app/]] و [[settings.gradle]]).

[[webDir]] لازم يشاور على فولدر البناء الحقيقي بتاعك ([[dist]] في Vite، [[build]] في CRA، [[out]] في Next export). لو غلط، الأوامر اللي بعده هتشتكي إنها ملقتش [[index.html]]. و [[appId]] لازم يبقى reverse-domain فريد لأنه هوية التطبيق في المتجر ومينفعش يتغير بعد النشر.`
        },
        {
          cmd: "npx cap sync android",
          title: "انقل آخر تعديل للتطبيق",
          desc: "مشروع أندرويد فيه نسخة من ملفات الموقع، مش لينك ليها. فكل ما تعدّل في الويب: [[npm run build]] وبعدين [[npx cap sync android]] ينسخ dist جوه المشروع ويحدّث الـ plugins. من غيرهم الـ APK هيطلع بالنسخة القديمة.",
          example: R`npm run build
npx cap sync android
# أو سكربت جاهز في package.json:
#   "cap:sync": "vite build && cap sync android"
npm run cap:sync
npx @capacitor/assets generate --android --iconBackgroundColor '#0f172a' --splashBackgroundColor '#0f172a'`,
          try: "غيّر عنوان في الصفحة، واعمل build و sync، وبعدين دوّر على العنوان الجديد جوه [[android/app/src/main/assets/public]].",
          deep: {
            why: "أشهر لخبطة في Capacitor: عدّلت الموقع، بنيت APK، ولقيت التطبيق زي ما هو. السبب إن الملفات ما اتنسختش.",
            how: R`[[cap sync]] بيعمل حاجتين: [[copy]] بينسخ webDir لـ [[android/app/src/main/assets/public]]، و [[update]] بيحدّث ملفات Gradle لو سطّبت أو شلت plugin. لو غيّرت الويب بس، [[cap copy]] كفاية، بس sync أضمن.

السكربت [[cap:sync]] بيجمع الاتنين في أمر عشان متنساش الـ build.

الأيقونة وشاشة البداية: [[@capacitor/assets]] بياخد [[assets/icon.png]] (1024×1024) و [[assets/splash.png]]، ويولّد كل المقاسات اللي أندرويد محتاجها في المكان الصح. ولون الخلفية للأيقونة التكيفية (adaptive) وشاشة البداية.`,
            when: "بعد أي تعديل في الويب وقبل أي build للـ APK.",
            mistakes: R`تعدّل في [[assets/public]] جوه android بإيدك: أول sync يمسحه. والأخطر: الموقع بيكلم الـ API بمسار نسبي زي [[fetch('/api/login')]]. على الويب تمام، بس جوه التطبيق الأصل بقى [[https://localhost]] فالطلب بيروح للموبايل نفسه. استخدم URL كامل ([[VITE_API_URL=https://api.example.com]]) وضيف [[https://localhost]] في CORS بتاع السيرفر. و API على http من غير s أندرويد بيمنعه افتراضيًا.`
          },
          lines: [
            "ابني الموقع.",
            "انسخه جوه مشروع أندرويد وحدّث الـ plugins.",
            "أو الاتنين في سكربت واحد.",
            "ولّد كل مقاسات الأيقونة وشاشة البداية من صورة واحدة."
          ],
          sol: R`جربتها: غيّرت العنوان في [[dist/index.html]] من [[Hello v1]] لـ [[Hello v2]]، عملت [[npx cap sync android]]، ولقيت [[Hello v2]] جوه [[android/app/src/main/assets/public/index.html]]. اللوج طبع [[✔ Copying web assets from dist to android/app/src/main/assets/public]].

الفرق بين [[copy]] و [[sync]]: [[copy]] بينقل ملفات الويب بس، [[sync]] بينقلها + بيحدّث الـ native plugins. بعد ما تضيف أي [[@capacitor/...]] plugin لازم [[sync]] مش [[copy]].

الغلط الأشهر: تعدّل الكود وتفتح Android Studio على طول من غير [[npm run build]] و [[cap sync]]، فتلاقي التطبيق شايف النسخة القديمة. خليها سكربت واحد [[vite build && cap sync android]]. و [[@capacitor/assets]] بياخد [[icon.png]] (1024×1024) و [[splash.png]] ويطلّع كل المقاسات لوحده.`
        },
        {
          cmd: "npx cap open android",
          title: "افتح المشروع في Android Studio",
          desc: "[[cap open android]] بيفتح فولدر android/ في Android Studio، ومن هناك زرار Run بيسطّب على موبايل موصّل أو emulator. و [[cap run android]] بيعمل نفس الحاجة من الترمنال من غير ما تفتح Android Studio.",
          example: R`npx cap open android
npx cap run android --list
npx cap run android
# iOS (على ماك و Xcode بس):
npm install @capacitor/ios
npx cap add ios
npx cap open ios`,
          try: "اعمل emulator من Device Manager في Android Studio، وشغّل [[npx cap run android]] واختاره.",
          deep: {
            why: "أول مرة محتاج تشوف التطبيق شغال على موبايل وتضبط إعدادات Android Studio. وبعد كده الترمنال أسرع.",
            how: R`[[cap open]] بيفتح البرنامج على الفولدر. أول مرة Gradle بيعمل sync وبينزّل حاجات، وده ممكن ياخد دقايق. استنى الشريط اللي تحت يخلص قبل ما تدوس Run.

[[cap run android --list]] بيعرض الأجهزة المتاحة (موبايلات موصّلة بـ USB و emulators). [[cap run android]] بيبني ويسطّب ويفتح التطبيق، وبيسألك على أنهي جهاز لو فيه أكتر من واحد.

iOS بنفس الأوامر بس محتاج ماك و Xcode، ولازم حساب Apple Developer عشان تسطّب على آيفون حقيقي لفترة طويلة.`,
            when: "أول تشغيل. ولما تحتاج Logcat أو profiler أو تعدّل إعدادات بواجهة.",
            mistakes: "تدوس Run قبل ما Gradle sync يخلص فتطلع errors غريبة. وعلى لينكس [[cap open]] ممكن ميلاقيش Android Studio: حط مساره في متغير [[CAPACITOR_ANDROID_STUDIO_PATH]]."
          },
          lines: [
            "افتح مشروع أندرويد في Android Studio.",
            "الأجهزة المتاحة.",
            "ابني وسطّب وشغّل على جهاز.",
            "منصة iOS.",
            "اعمل مشروع iOS.",
            "افتحه في Xcode."
          ],
          sol: R`[[npx cap open android]] بيفتح Android Studio على مشروع [[android/]]. أول مرة Android Studio هياخد وقت في «Gradle sync» وممكن يطلب يسطّب Android SDK أو build-tools ناقصة، سيبه يخلّص. [[npx cap run android --list]] بيطلّع الأجهزة والـ emulators المتاحة بالـ IDs بتاعتهم.

بعد ما تعمل emulator من Device Manager وتشغّله، [[npx cap run android]] بيبني ويسطّب ويفتح التطبيق عليه. لو قال [[No target devices found]] يبقى مفيش emulator شغال ولا موبايل موصّل بـ USB debugging.

(ما قدرتش أفتح Android Studio ولا أبني APK في البيئة دي: مفيش Android SDK متسطب، و [[./gradlew]] وقف عند [[Could not resolve com.android.tools.build:gradle]] لأنه محتاج ينزّل من النت. الأوامر نفسها صح، بس محتاجة جهاز فيه Android Studio.)`
        }
      ]
    },
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
npx @electron/asar list release/win-unpacked/resources/app.asar | head`,
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
          lines: [
            "سطّب أداة التغليف.",
            "ابني الواجهة الأول.",
            "installer عادي لويندوز.",
            "exe واحد من غير تسطيب.",
            "شوف الناتج.",
            "إيه اللي دخل جوه app.asar فعلًا."
          ],
          sol: R`[[npx electron-builder --win nsis]] بيطلّع فولدر [[release/]] فيه installer اسمه زي [[myapp Setup 1.0.0.exe]]. بعد ما تسطّبه هتلاقي البرنامج في قايمة Start وأيقونة على سطح المكتب. [[--win portable]] بيطلّع [[.exe]] واحد بيشتغل من غير تسطيب.

في [[release/win-unpacked]] هتلاقي التطبيق «مفكوك»: [[myapp.exe]] وجنبه [[resources/app.asar]]. الـ [[.exe]] ده بيشتغل على طول من غير installer، مفيد للتجربة السريعة. و [[@electron/asar list]] بيوريك ملفاتك (main.js و index.html...) مضغوطة جوه الـ asar، فأي حد يقدر يفكها، يعني الكود مش سري.

مهم: بناء نسخة ويندوز لازم يتعمل على ويندوز (أو Linux + Wine)، ونسخة الماك لازم على ماك للتوقيع. وأول مرة electron-builder بينزّل ملفات كبيرة، فمحتاج نت. (ما جربتوش هنا لأنه محتاج بيئة ويندوز.)`
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

الفكرة اللي تطلع بيها: الـ .exe مش بيخبّي كودك. لو عايز حماية للكود استخدم asar (مش تشفير حقيقي) أو احتفظ بالمنطق الحساس على السيرفر. (السكربت PowerShell و rcedit، فما اتجربش على Linux، بس منطق النسخ صحيح.)`
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
exec npx electron .

REM run.bat (ويندوز)
@echo off
cd /d "%~dp0"
where node >nul 2>nul || ( echo Node.js is not installed & pause & exit /b 1 )
if not exist .env ( echo .env missing & pause & exit /b 1 )
if not exist node_modules ( call npm ci || ( pause & exit /b 1 ) )
call npx vite build || ( pause & exit /b 1 )
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
            "شغّل Electron مكان السكربت.",
            "متطبعش الأوامر.",
            "روح لفولدر الملف (ولو على درايف تاني).",
            "Node موجود؟",
            ".env موجود؟",
            "سطّب أول مرة.",
            "ابني الواجهة كل مرة.",
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

(ما قدرتش أبني APK هنا: [[./gradlew]] وقف عند [[Could not resolve com.android.tools.build:gradle:8.13.0]] لأن مفيش Android SDK ولا نت جوه Gradle. الأوامر صح لكن محتاجة بيئة فيها Android SDK.)`
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
    },
    {
      t: "التوقيع والنشر",
      l: 3,
      n: "مفتاح توقيع ثابت، ورقم نسخة بيزيد، و APK بيتبني ويتنشر لوحده",
      items: [
        {
          cmd: "keytool",
          title: "مفتاح توقيع للإصدارات",
          desc: R`كل APK لازم يبقى موقّع، وأندرويد مش بيقبل تحديث إلا لو موقّع بنفس المفتاح بتاع النسخة المتسطّبة. [[keytool]] (بييجي مع JDK) بيعمل المفتاح ده مرة واحدة في ملف keystore.

الملف ده أهم ملف في المشروع: لو ضاع مش هتقدر تحدّث التطبيق تاني. ولو اتسرب، أي حد يقدر يعمل «تحديث» باسمك. عشان كده مينفعش يتعمله commit أبدًا.`,
          example: R`keytool -genkeypair -v -keystore release.p12 -storetype PKCS12 -alias myapp -keyalg RSA -keysize 2048 -validity 10000
keytool -list -v -keystore release.p12
echo "*.p12" >> .gitignore
echo "*.jks" >> .gitignore
git check-ignore -v release.p12
cd android && ./gradlew assembleRelease`,
          try: "اعمل keystore تجربة، واتأكد بـ [[git check-ignore]] إنه متجاهَل، وبعدين اعمل backup منه في مكانين (password manager ومكان offline).",
          deep: {
            why: "النسخة اللي بتتوزع لازم تتوقّع بمفتاح واحد ثابت طول عمر التطبيق. مفتاح debug بيختلف من جهاز للتاني، فمينفعش للإصدارات.",
            how: R`[[-genkeypair]] بيعمل مفتاح جديد. [[-storetype PKCS12]] الصيغة الحديثة (.p12)، والقديمة كانت .jks. [[-alias]] اسم المفتاح جوه الملف. [[-validity 10000]] يوم، يعني حوالي ٢٧ سنة. هيسألك على باسورد وعلى اسمك وبلدك.

[[-list -v]] بيعرض اللي في الملف وبصمة الشهادة (SHA-256)، ودي اللي بتحتاجها لـ Google Sign-In أو Firebase.

ربطه بـ Gradle: في [[android/app/build.gradle]] جوه [[signingConfigs { release { ... } }]] بتقرا القيم من متغيرات بيئة: [[storeFile file(System.getenv("RELEASE_KEYSTORE_FILE"))]] و [[storePassword System.getenv("RELEASE_STORE_PASSWORD")]] وكمان [[keyAlias System.getenv("RELEASE_KEY_ALIAS")]] و [[keyPassword System.getenv("RELEASE_KEY_PASSWORD")]] (في PKCS12 باسورد المفتاح هو نفس باسورد الـ keystore)، وبعدين في [[buildTypes { release { signingConfig signingConfigs.release } }]]. كده مفيش ولا باسورد في الكود، والـ CI بيدّي نفس المتغيرات.

[[git check-ignore -v]] بيقولك الملف متجاهَل بسبب أنهي سطر. لو مطبعش حاجة يبقى مش متجاهَل.

و [[apksigner verify --print-certs app-release.apk]] (من build-tools) بيتأكد إن الـ APK موقّع بالمفتاح اللي انت فاكره.`,
            when: "قبل أول نسخة تتوزع على أي حد.",
            mistakes: R`الـ keystore اتعمله commit في repo عام: اعتبره اتسرب، ومسحه من التاريخ مش كفاية. والباسورد مكتوب في build.gradle. ومفيش backup: الجهاز باظ والمفتاح راح، والتطبيق اللي بره Play Store مش هيتحدّث تاني غير لو الناس مسحته وسطّبته من جديد.`
          },
          lines: [
            "اعمل مفتاح توقيع جديد في ملف release.p12 (هيسألك على باسورد).",
            "اعرض اللي في الملف وبصمته.",
            "متخليش Git يشوف ملفات .p12...",
            "...ولا .jks.",
            "اتأكد إن الملف متجاهَل فعلًا.",
            "ابني نسخة الإصدار موقّعة."
          ],
          sol: R`جربتها: [[keytool -genkeypair ...]] عمل ملف [[release.p12]] وطلب مني dname وبيانات، وطبع [[[Storing release.p12]]]. [[keytool -list -v -keystore release.p12]] طلّع [[Keystore type: PKCS12]] و [[Alias name: myapp]] و [[Entry type: PrivateKeyEntry]] و [[Valid from: ... until: ...]] (بعد ٢٧ سنة لأن [[-validity 10000]]) و بصمة [[SHA256:]].

[[git check-ignore -v release.p12]] رجع [[.gitignore:1:*.p12  release.p12]] وexit code صفر، يعني متجاهَل فعلًا. جربت [[git check-ignore main.js]] ورجع فاضي وexit 1 (مش متجاهَل)، فده الفرق اللي يأكدلك إن القاعدة شغالة.

الأهم اللي التجربة بتعلّمه: الـ keystore ده لو ضاع، مش هتقدر تطلّع تحديث للتطبيق على Google Play أبدًا (لازم نفس المفتاح لكل النسخ). فخد منه backup في مكانين على الأقل، والباسورد في password manager. وطبعًا برّه Git خالص.`
        },
        {
          cmd: "versionCode",
          title: "رقم النسخة اللي أندرويد بيقارن بيه",
          desc: "في build.gradle رقمين: [[versionName]] اللي المستخدم بيشوفه (1.4.0)، و [[versionCode]] رقم صحيح أندرويد بيقارن بيه. كل نسخة لازم versionCode بتاعها أكبر من اللي قبلها، وإلا التحديث مش هيتسطّب.",
          example: R`grep -n "versionCode\|versionName" android/app/build.gradle
sed -i 's/versionCode [0-9]*/versionCode 42/' android/app/build.gradle
# في CI: من رقم الـ run
sed -i "s/versionCode [0-9]*/versionCode $__{GITHUB_RUN_NUMBER}/" android/app/build.gradle
aapt dump badging app-release.apk | grep version`,
          try: "ابني APK بـ versionCode 5 وسطّبه، وبعدين ابني بـ 4 وجرّب [[adb install -r]]: هتشوف [[INSTALL_FAILED_VERSION_DOWNGRADE]].",
          deep: {
            why: "نسيت تزوّد الرقم، فالتحديث مرفوض من Play Store، أو التطبيق بيقول «فيه تحديث» ومش بيتسطّب. وتزويده بإيدك كل مرة هتنساه.",
            how: R`[[versionCode]] رقم صحيح بس (حده حوالي ٢ مليار). أندرويد بيرفض تسطيب نسخة رقمها أصغر من المتسطّبة، و Play Store بيرفض نفس الرقم مرتين.

[[versionName]] نص حر للعرض بس.

[[sed -i 's/versionCode [0-9]*/versionCode 42/']] بيدوّر على السطر ويبدّل الرقم في الملف نفسه. على الماك [[sed -i '']] بدل [[sed -i]].

في CI: [[GITHUB_RUN_NUMBER]] بيزيد ١ مع كل run، فأحسن مصدر أوتوماتيك. والـ [[$__{...}]] مع علامات تنصيص مزدوجة عشان الشيل يفك المتغير.

[[aapt dump badging]] (من Android SDK build-tools) بيقرا الـ APK نفسه ويطبع versionCode و versionName والـ package، فتتأكد من اللي اتبنى فعلًا.

ولو التطبيق بيشيك على تحديثات من سيرفرك (ملف زي latest.json)، حط فيه نفس الـ versionCode، والتطبيق يقارنه باللي عنده.`,
            when: "مع كل نسخة. والأحسن أوتوماتيك في CI.",
            mistakes: R`run_number بيبدأ من ١ لو غيّرت اسم ملف الـ workflow أو نقلت الـ repo، فالأرقام تبقى أصغر من اللي اتنشر: زوّد رقم ثابت، زي [[$((GITHUB_RUN_NUMBER + 1000))]]. وتعدّل versionName وتنسى versionCode.`
          },
          lines: [
            "شوف الرقمين في الملف.",
            "غيّر versionCode لـ 42.",
            "في CI: خليه رقم الـ run.",
            "اتأكد من الرقم جوه الـ APK نفسه."
          ],
          sol: R`[[grep versionCode android/app/build.gradle]] بيوريك سطر زي [[versionCode 1]] و [[versionName "1.0"]]. جربت [[sed]] وغيّرته لـ [[versionCode 42]] بنجاح. الفرق بينهم: [[versionName]] نص بيشوفه المستخدم ([[1.2.3]])، و [[versionCode]] رقم صحيح بس، أندرويد بيقارن بيه أي نسخة أحدث.

لو بنيت APK بـ versionCode 5 وسطّبته، وبعدين بنيت بـ 4 وعملت [[adb install -r]]، أندرويد بيرفض بـ [[INSTALL_FAILED_VERSION_DOWNGRADE]]: مش بيسمح تنزّل لنسخة أقدم فوق أحدث. ده اللي بيخلّي كتير يزوّدوه غلط أو ينسوه فيترفض الرفع على Play.

الحل العملي في CI: خلّي [[versionCode]] من رقم الـ run زي [[$__{GITHUB_RUN_NUMBER}]]، فبيزيد لوحده مع كل build ومتنساش تزوّده. (عدّلت الملف وتأكدت من الرقم، لكن اختبار [[INSTALL_FAILED_VERSION_DOWNGRADE]] نفسه محتاج جهاز أندرويد.)`
        },
        {
          cmd: "android.yml",
          title: "APK موقّع مع كل push",
          desc: "workflow بيعمل كل اللي فات لوحده: يبني الويب، يعمل sync، يرجّع الـ keystore من secret، يحط versionCode من رقم الـ run، ويبني APK موقّع ويرفعه كـ artifact. ولو محتاج تنشره على سيرفرك، شوف «نشر ملفات بـ scp» في تاب GitHub Actions.",
          example: R`name: Android
on:
  workflow_dispatch:
  push:
    branches: [main]
    paths: ['android/**', 'src/**', 'capacitor.config.ts']
jobs:
  apk:
    runs-on: ubuntu-latest
    env:
      RELEASE_STORE_PASSWORD: $__{{ secrets.ANDROID_KEYSTORE_PASSWORD }}
      RELEASE_KEY_ALIAS: myapp
      RELEASE_KEY_PASSWORD: $__{{ secrets.ANDROID_KEYSTORE_PASSWORD }}
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with: { node-version: 24, cache: npm }
      - uses: actions/setup-java@v5
        with: { distribution: temurin, java-version: 21 }
      - run: npm ci && npm run build && npx cap sync android
      - env: { KEYSTORE_BASE64: "$__{{ secrets.ANDROID_KEYSTORE_BASE64 }}" }
        run: |
          [ -n "$KEYSTORE_BASE64" ] || { echo "::error::ANDROID_KEYSTORE_BASE64 is missing"; exit 1; }
          echo "$KEYSTORE_BASE64" | base64 -d > "$RUNNER_TEMP/release.p12"
          echo "RELEASE_KEYSTORE_FILE=$RUNNER_TEMP/release.p12" >> "$GITHUB_ENV"
      - run: sed -i "s/versionCode [0-9]*/versionCode $GITHUB_RUN_NUMBER/" android/app/build.gradle
      - run: cd android && chmod +x gradlew && ./gradlew assembleRelease --no-daemon
      - uses: actions/upload-artifact@v7
        with:
          name: apk
          path: android/app/build/outputs/apk/release/app-release.apk
          if-no-files-found: error`,
          try: "حط الـ keystore بتاع التجربة في secret (base64) والباسورد في secret تاني، واعمل push، ونزّل الـ APK من صفحة الـ run وسطّبه.",
          flag: "script",
          deep: {
            why: "البناء على جهازك معناه: الـ keystore لازم يبقى عندك، والنسخة بتعتمد على اللي متسطّب على جهازك، ولازم تفتكر الخطوات. في CI كل push يطلّع APK بنفس الطريقة بالظبط.",
            how: R`[[paths]] بيشغّله بس لو اتغير حاجة في الأندرويد أو الويب أو إعدادات Capacitor، و [[workflow_dispatch]] عشان تشغّله بإيدك.

[[setup-java]] بيسطّب JDK (temurin توزيعة مجانية). و Android SDK موجود جاهز على ubuntu-latest.

الـ keystore: الـ secret فيه الملف كنص base64، والـ step بترجّعه ملف في [[$RUNNER_TEMP]] (بيتمسح مع نهاية الـ job) وتحط مساره في [[$GITHUB_ENV]]. و build.gradle بيقرا [[RELEASE_KEYSTORE_FILE]] و [[RELEASE_STORE_PASSWORD]] و [[RELEASE_KEY_ALIAS]] و [[RELEASE_KEY_PASSWORD]] من البيئة (درس keytool)؛ لو واحد منهم ناقص الـ build بيفشل. ولو الـ secret فاضي الـ job يفشل برسالة واضحة، مش يكمّل.

[[sed]] بيحط رقم الـ run كـ versionCode، فكل build رقمه أكبر من اللي قبله.

[[if-no-files-found: error]] لو الـ APK مطلعش في المسار ده، افشل بدل ما ترفع artifact فاضي وتفتكر كله تمام.

بعد كده تقدر تزوّد: رفع الـ APK على سيرفرك بـ scp مع latest.json في الآخر، أو GitHub Release.`,
            when: "أول ما التطبيق يبقى له مستخدمين بيستنوا تحديثات.",
            mistakes: R`في مشروع حقيقي الـ workflow كان لو الـ keystore secret فاضي بيبني debug بهدوء، فطلع APK أخضر بس مش بيتسطّب كتحديث. وكان بيختار الـ APK بـ [[find ... | head -1]] فممكن ياخد debug بدل release: حدد المسار بالظبط زي هنا. و paths كان فيها [[src/**]] والتطبيق كمان بيتحدّث OTA (zip للويب من غير APK جديد)، فأي تعديل CSS بيبني APK كامل. لو عندك OTA، شيل src من paths واعمل workflow خفيف للـ zip.`
          },
          lines: [
            "الاسم.",
            "الأحداث.",
            "زرار تشغيل يدوي.",
            "push...",
            "...على main...",
            "...لو اتغير الأندرويد أو الويب أو إعدادات Capacitor.",
            "المهام.",
            "بناء الـ APK.",
            "ماكينة أوبونتو (فيها Android SDK جاهز).",
            "متغيرات للـ job كله.",
            "باسورد الـ keystore (Gradle بيقراه).",
            "اسم المفتاح جوه الـ keystore (الـ alias).",
            "باسورد المفتاح: في PKCS12 هو نفس باسورد الـ keystore.",
            "الخطوات.",
            "الكود.",
            "Node.",
            "بكاش npm.",
            "JDK.",
            "نسخة 21.",
            "سطّب، وابني الويب، وانقله للمشروع.",
            "الـ keystore من secret كـ base64...",
            "...أوامر:",
            "لو الـ secret فاضي افشل برسالة واضحة.",
            "رجّعه ملف في الفولدر المؤقت.",
            "وحط مساره للـ steps الجاية.",
            "versionCode = رقم الـ run.",
            "ابني نسخة الإصدار الموقّعة.",
            "ارفع الـ APK لصفحة الـ run.",
            "إعداداته.",
            "اسم الـ artifact.",
            "مسار الـ APK بالظبط.",
            "لو مش موجود افشل."
          ],
          sol: R`الـ workflow ده بيبني APK موقّع على GitHub. الفكرة الأساسية إنك مش بترفع الـ keystore على Git، بترفعه كـ secret: تعمله base64 ([[base64 -w0 release.p12]]) وتحطه في secret اسمه [[ANDROID_KEYSTORE_BASE64]]، والباسورد في secret تاني، والـ workflow بيفكّه في [[$RUNNER_TEMP]] وقت البناء بس.

بعد الـ push (أو Run workflow يدوي) هتلاقي الـ run في تاب Actions، وفي آخره artifact اسمه [[apk]] فيه [[app-release.apk]]، نزّله وسطّبه. [[if-no-files-found: error]] بيفشّل الـ run لو البناء ماطلّعش APK بدل ما يعدّي بصمت. و [[versionCode $GITHUB_RUN_NUMBER]] بيضمن رقم متزايد مع كل build.

الغلط الأشهر: نسيان أي secret. الخطوة بتتشيّك [[[ -n "$KEYSTORE_BASE64" ]]] وتطلّع [[::error::ANDROID_KEYSTORE_BASE64 is missing]] بدل ما البناء يفشل برسالة غامضة. راجع الـ actions بأرقام نسخها في «تاب GitHub Actions». (ما شغّلتش الـ workflow لأنه محتاج repo على GitHub وrunner بـ Android SDK.)`
        }
      ]
    }
  ]
});
