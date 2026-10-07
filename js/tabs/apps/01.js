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
          teach: R`## الفكرة

[[Electron]] برنامج جاهز فيه حاجتين: **Chromium** (نفس محرك Chrome، عشان يعرض HTML و CSS و JS) و **Node.js** (عشان يقرا ملفات ويكلّم النظام). انت بتدّيله فولدر فيه كودك، وهو يفتح نافذة برنامج حقيقية بأيقونة في شريط المهام.

الأوامر الخمسة دي بتعمل مشروع من الصفر وتشغّله. جربتها كلها في فولدر فاضي على ويندوز ١١ في PowerShell 7، و Electron اللي نزل كان نسخة 44.6.0. ونفس الأوامر بالظبط على لينكس والماك.

---

## ١. [[npm init -y]]

[[npm]] (Node Package Manager) هو اللي بيسطّب المكتبات. و [[init]] بيعمل ملف [[package.json]]: بطاقة تعريف المشروع (اسمه، ونسخته، ومكتباته، وسكربتاته). و [[-y]] (من yes) معناها «وافق على كل الإجابات الافتراضية» بدل ما يسألك سؤال سؤال.

~~~text الناتج (مختصر)
{
  "name": "myapp",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  ...
}
~~~

[[name]] بياخد اسم الفولدر. وخلي بالك من [[main]]: قيمته [[index.js]]، وده هنغيّره في الخطوة ٣.

## ٢. [[npm install --save-dev electron]]

بيسطّب Electron في [[node_modules]]. و [[--save-dev]] بيكتبه تحت [[devDependencies]] (أدوات التطوير) مش [[dependencies]]:

~~~text الجزء الجديد في package.json
"devDependencies": {
  "electron": "^44.6.0"
}
~~~

ليه dev؟ لأن البرنامج النهائي مش بيشيل Electron كمكتبة: أداة التغليف (درس [[electron-builder]]) بتاخد نسخة من Electron نفسه وتحط كودك جنبها.

العلامة [[^]] قبل الرقم معناها «أي نسخة 44.x.x أحدث من دي»، يعني يقبل تحديثات صغيرة بس مش 45.

> Electron بينزّل ملف zip حوالي ١٠٠ ميجا (لويندوز كان ١١٠ ميجا)، والفولدر بعد الفك حوالي ٣٨٠ ميجا. على نت بطيء التسطيب ده بياخد دقايق.

## ٣. [[npm pkg set main=main.js]]

[[npm pkg set]] بيعدّل خانة في [[package.json]] من الترمنال من غير ما تفتح الملف. هنا بيغيّر [[main]] من [[index.js]] لـ [[main.js]].

و [[main]] ده أهم سطر في المشروع: Electron بيبدأ منه. الملف ده هو الـ **main process**: كود Node عادي بيفتح النوافذ (شرحه في الدرس اللي بعده).

## ٤. [[npm pkg set scripts.start="electron ."]]

النقطة في [[scripts.start]] معناها «جوه»: يعني خانة [[start]] جوه [[scripts]]. فالنتيجة:

~~~text package.json بعد الخطوتين
"main": "main.js",
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "electron ."
},
~~~

و [[electron .]] نفسها: [[electron]] البرنامج، و [[.]] معناها «الفولدر الحالي». يعني «شغّل التطبيق اللي في الفولدر ده»، فـ Electron بيقرا [[package.json]] من هنا ويروح للملف اللي في [[main]].

## ٥. [[npm start]]

[[start]] من الأسامي اللي npm بيعرفها، فبتكتب [[npm start]] من غير [[run]] (أي سكربت تاني بيبقى [[npm run اسمه]]). و npm بيدوّر على [[electron]] في [[node_modules/.bin]] بتاع المشروع، فمش محتاج يكون متسطّب على الجهاز كله. وده نفس اللي [[npx electron .]] بيعمله.

جربته بـ [[main.js]] صغير بيفتح [[index.html]] فيه كلمة «أهلًا»، وبيطبع شوية معلومات ويقفل:

~~~text الناتج
> myapp@1.0.0 start
> electron .

title: My App
text: أهلًا
typeof require in page: undefined
versions: 44.6.0 152.0.7977.130 24.21.0
~~~

نقرا الناتج:

| السطر | معناه |
|---|---|
| [[> electron .]] | npm بيوريك الأمر اللي اتنفّذ من [[scripts.start]] |
| [[title: My App]] | عنوان النافذة جه من [[<title>]] في الصفحة |
| [[typeof require ...: undefined]] | الصفحة **مش** شايفة Node: ده الأمان الافتراضي |
| [[versions]] | Electron 44.6.0 جواه Chromium 152 و Node 24.21 |

> أي [[console.log]] في [[main.js]] بيظهر **في الترمنال**، مش في DevTools، لأن main.js شغال في Node مش في الصفحة.

---

## لو حاجة باظت

| الرسالة | السبب |
|---|---|
| [[Cannot find module 'electron']] | التسطيب مخلصش، اعمل [[npm install]] تاني |
| [[electron: command not found]] | كتبت [[electron]] لوحده في الترمنال؛ استخدم [[npm start]] أو [[npx electron .]] |
| نافذة بيضا | مسار غلط في [[loadFile]] أو [[main]] بيشاور على ملف مش موجود |
| على لينكس: رسالة عن [[chrome-sandbox]] | الملف لازم يبقى ملك root بصلاحية 4755 (شوف «غلطات شائعة» في الدرس) |

---

## الخلاصة

~~~text
npm init -y                       package.json جديد
npm install --save-dev electron   Electron في node_modules
npm pkg set main=main.js          Electron يبدأ من main.js
npm pkg set scripts.start=...     npm start = electron .
npm start                         شغّل
~~~

المشروع كله = [[package.json]] بيقول «ابدأ من main.js» + Electron في [[node_modules]] + ملفات الواجهة.`,
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
  if (app.isPackaged || process.env.LOAD_DIST) win.loadFile(path.join(__dirname, 'dist/index.html'));
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

[[app.isPackaged]] بيبقى false وانت شغّال بـ [[npx electron .]]، و true في الـ exe. فوانت بتطوّر بيحمّل [[localhost:5173]] (سيرفر Vite بـ hot reload)، وفي النسخة النهائية بيحمّل [[dist/index.html]] من جوه البرنامج. و [[process.env.LOAD_DIST]] متغير بيئة بيخلّيه يحمّل [[dist]] من غير تغليف، لما حد يشغّل المشروع بـ [[npx electron .]] ومفيش Vite شغال (زي ملف التشغيل في درس launcher).

[[window-all-closed]]: لما آخر نافذة تتقفل اقفل البرنامج، إلا على الماك ([[darwin]]) لأن العادة هناك البرنامج يفضل في الـ Dock.`,
            when: "أول ملف في أي تطبيق Electron.",
            mistakes: "مسار نسبي زي [['dist/index.html']] من غير __dirname: بيشتغل عندك وبيطلع شاشة بيضا في النسخة المتغلّفة. وتحميل localhost في النسخة النهائية فيطلع «This site can't be reached» عند المستخدم. ونسيان [[base: './']] في vite.config: Vite بيكتب مسارات الملفات [[/assets/...]] من أول الدرايف، فتحت [[file://]] الـ JS مبيتحمّلش والصفحة تطلع من غير أي سكربت. جربتها: من غيره عنوان الصفحة فضل زي ما هو، ومعاه الـ JS اشتغل."
          },
          teach: R`## الملف ده بيعمل إيه

[[main.js]] هو أول كود بيشتغل لما البرنامج يفتح. شغلته ٣ حاجات: يستنى Electron يجهز، يفتح نافذة، ويقرر يحمّل فيها إيه. هنمشي عليه سطر سطر.

جربته على ويندوز ١١ بـ Electron 44.6.0، مع سكربت تجربة صغير بيستخبّى النافذة ويطبع معلوماتها ويقفل (السكربت ده مش جزء من الدرس).

---

## ١. [[const { app, BrowserWindow } = require('electron');]]

[[require]] بيحمّل مكتبة في Node. و Electron بيرجّع object فيه حاجات كتير، والأقواس [[{ }]] بتاخد منه اتنين بس بأساميهم (اسمها destructuring):

| الاسم | هو إيه |
|---|---|
| [[app]] | البرنامج كله: إمتى جهز، إمتى يقفل، فولدراته |
| [[BrowserWindow]] | **class** بتعمل منه نوافذ، كل نافذة صفحة ويب |

و [[const]] يعني متغير مش هيتغيّر.

## ٢. [[const path = require('path');]]

[[path]] مكتبة جاهزة في Node بتركّب مسارات الملفات صح على أي نظام (ويندوز بيستخدم [[\]] ولينكس [[/]]).

## ٣. [[function createWindow() { ... }]]

دالة بتجمع خطوات فتح النافذة. مش بتشتغل دلوقتي، هتتنادي بعدين لما Electron يجهز.

### جواها: [[new BrowserWindow({ ... })]]

[[new]] بيعمل نافذة جديدة من الـ class، والـ object اللي بين [[{ }]] إعداداتها:

~~~text الإعدادات
width: 1000, height: 700                 المقاس بالـ pixel
webPreferences: { preload: ... }          إعدادات الصفحة اللي جوه النافذة
~~~

[[webPreferences.preload]] ملف بيشتغل جوه الصفحة **قبل** كودها، وهو الجسر الوحيد بين الصفحة و Node. والمسار مكتوب كده:

~~~text
path.join(__dirname, 'preload.js')
~~~

[[__dirname]] متغير جاهز في Node فيه **فولدر الملف الحالي** (فولدر main.js)، و [[path.join]] بيلزق الاتنين بالفاصل الصح. ليه مش [['preload.js']] بس؟ لأن المسار النسبي بيتحسب من **الفولدر اللي البرنامج اتشغّل منه**، وده عند المستخدم ممكن يبقى أي حاجة. جربت البرنامج المتغلّف وانا واقف في [[C:\Windows\System32]]: [[process.cwd()]] (الفولدر الحالي) طلع [[C:\Windows\System32]]، و [[__dirname]] طلع [[...\myapp\resources\app]]: فولدر البرنامج نفسه. و [[process.platform]] طلع [[win32]].

### [[if (app.isPackaged || process.env.LOAD_DIST) ... else ...]]

هنا البرنامج بيقرر يحمّل إيه:

| الحالة | [[app.isPackaged]] | بيحمّل |
|---|---|---|
| انت بتطوّر ([[npx electron .]]) | [[false]] | [[win.loadURL('http://localhost:5173')]]: سيرفر Vite |
| البرنامج المتغلّف ([[.exe]]) | [[true]] | [[win.loadFile(...'dist/index.html')]]: الملفات المبنية |

و [[||]] معناها «أو»، و [[process.env.LOAD_DIST]] متغير بيئة: لو حد حطه (زي ملف التشغيل في درس launcher)، البرنامج يحمّل [[dist]] حتى وهو مش متغلّف.

- [[loadURL]] بيفتح عنوان (زي المتصفح)، وده بيخلّي Vite يعمل hot reload: تعدّل وتشوف على طول.
- [[loadFile]] بيفتح ملف من الديسك.

لما شغّلت [[npx electron .]] من غير Vite، Electron حاول يفتح localhost وفشل:

~~~text الناتج من غير Vite
FAIL -102 ERR_CONNECTION_REFUSED http://localhost:5173/
electron: Failed to load URL: http://localhost:5173/ with error: ERR_CONNECTION_REFUSED
isPackaged: false
~~~

[[ERR_CONNECTION_REFUSED]] يعني محدش فاتح البورت ده، والنافذة بتطلع بيضا. ولما شغّلته متغلّف:

~~~text الناتج في البرنامج المتغلّف
isPackaged: true
URL: file:///C:/.../dist/myapp/resources/app/index.html
title: My App
typeof require: undefined
~~~

[[file:///]] يعني ملف من الديسك مش سيرفر. و [[typeof require]] رجع [[undefined]]: الصفحة مش شايفة Node، لأن [[contextIsolation]] و [[nodeIntegration: false]] هما الافتراضي.

> لو هتحمّل [[dist/index.html]] بـ [[loadFile]]، حط [[base: './']] في [[vite.config.js]]. من غيره Vite بيكتب [[src="/assets/index-....js"]] (من أول الدرايف)، وتحت [[file://]] ده بيبقى [[C:\assets]] فالـ JS مبيتحمّلش. جربتها: من غير [[base]] عنوان الصفحة فضل [[My App]] (السكربت ما اشتغلش)، ومعاه اتغيّر لـ [[JS loaded]].

## ٤. [[app.whenReady().then(createWindow);]]

[[app.whenReady()]] بيرجّع **Promise**: وعد إن حاجة هتخلص بعدين. و [[.then(createWindow)]] معناها «لما يخلص، نادي createWindow». ليه نستنى؟ لأن مينفعش تعمل [[BrowserWindow]] قبل ما Electron يجهز؛ هيطلع خطأ.

لاحظ إننا كتبنا [[createWindow]] من غير [[()]]: بنديله **الدالة نفسها** عشان يناديها هو بعدين، مش نتيجتها دلوقتي.

## ٥. [[app.on('window-all-closed', () => { ... });]]

[[app.on(اسم, دالة)]] بيقول «لما الحدث ده يحصل، شغّل الدالة دي». و [[() => { }]] دالة قصيرة من غير اسم (arrow function).

[[window-all-closed]] بيحصل لما آخر نافذة تتقفل. وجواه:

~~~text
if (process.platform !== 'darwin') app.quit();
~~~

[[process.platform]] اسم النظام: [[win32]] لويندوز (حتى 64 بت)، و [[linux]]، و [[darwin]] للماك. و [[!==]] يعني «مش بيساوي». فالمعنى: اقفل البرنامج، إلا على الماك، لأن العادة هناك البرنامج يفضل في الـ Dock بعد ما تقفل نوافذه.

---

## الخلاصة

| السطر | بيعمل إيه |
|---|---|
| [[require('electron')]] | هات [[app]] و [[BrowserWindow]] |
| [[new BrowserWindow({...})]] | نافذة بمقاس و preload |
| [[path.join(__dirname, ...)]] | مسار ثابت من فولدر main.js |
| [[app.isPackaged]] | [[false]] وانت بتطوّر، [[true]] في الـ exe |
| [[loadURL]] / [[loadFile]] | سيرفر Vite / الملفات المبنية |
| [[app.whenReady().then(...)]] | افتح النافذة بعد ما Electron يجهز |
| [[window-all-closed]] | اقفل البرنامج (إلا على الماك) |`,
          lines: [
            "هات app و BrowserWindow من Electron.",
            "مكتبة المسارات.",
            "دالة بتفتح النافذة.",
            "نافذة جديدة...",
            "...بمقاس.",
            "...و preload بمسار مطلق من فولدر الملف.",
            "نهاية الإعدادات.",
            "في البرنامج المتغلّف (أو لو LOAD_DIST متحدد، زي ملف التشغيل في درس launcher): حمّل الملفات المبنية.",
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
          teach: R`## المشكلة اللي بنحلها

وانت بتطوّر محتاج برنامجين شغالين مع بعض: **Vite** (سيرفر الواجهة على البورت 5173) و **Electron** (النافذة اللي بتفتح الـ 5173 ده). ولو Electron قام الأول، هيلاقي البورت مقفول ويفتح نافذة بيضا. الدرس ده بيشغّل الاتنين من أمر واحد وبالترتيب الصح.

جربته على ويندوز ١١ في PowerShell 7، بـ Vite 8.3.3 و Electron 44.6.0.

---

## ١. [[npm install --save-dev concurrently wait-on]]

بيسطّب أداتين صغيرين كـ devDependencies (أدوات تطوير بس):

| الأداة | بتعمل إيه |
|---|---|
| [[concurrently]] | بتشغّل كذا أمر **في نفس الوقت** في ترمنال واحد |
| [[wait-on]] | بتستنى لحد ما حاجة تبقى جاهزة (بورت، أو URL، أو ملف) وبعدين تخلص |

## ٢. السكربت في package.json

~~~text
"dev": "concurrently -k \"vite\" \"wait-on tcp:5173 && electron .\""
~~~

نفكّه من برة لجوة:

### علامات التنصيص [[\"]]

السكربت نفسه نص JSON بين [[" "]]. وجواه محتاجين علامات تنصيص تانية حوالين كل أمر. فبنكتبها [[\"]]: الـ [[\]] معناها «العلامة اللي بعدي جزء من النص، مش نهايته». ولما npm يشغّله، الأمر الحقيقي بيبقى:

~~~text الأمر اللي بيتنفّذ فعلًا
concurrently -k "vite" "wait-on tcp:5173 && electron ."
~~~

> أسهل طريقة تكتبه من غير ما تلخبط العلامات: [[npm pkg set]] (زي درس [[npx electron .]]). في PowerShell جربت ده وطلع نفس السطر بالظبط:

~~~powershell
npm pkg set 'scripts.dev=concurrently -k "vite" "wait-on tcp:5173 && electron ."'
~~~

### [[concurrently -k "أمر ١" "أمر ٢"]]

كل نص بين علامات تنصيص أمر لوحده، و concurrently بيشغّلهم مع بعض. و [[-k]] (من kill-others) معناها: أول ما واحد يخلص، اقفل الباقي. فلما تقفل نافذة Electron، Vite يقف معاها ومايفضلش ماسك البورت.

### [[wait-on tcp:5173 && electron .]]

- [[tcp:5173]] يعني «استنى لحد ما حد يرد على البورت 5173». و TCP هو نوع الاتصال اللي السيرفرات بتستخدمه.
- [[&&]] معناها «لو اللي قبلي نجح، شغّل اللي بعدي». فـ Electron مش هيقوم غير بعد ما Vite يجهز.

## ٣. [[npm run dev]]

~~~text الناتج
> myapp@1.0.0 dev
> concurrently -k "vite" "wait-on tcp:5173 && electron ."

[0]   VITE v8.3.3  ready in 659 ms
[0]   ➜  Local:   http://localhost:5173/
[0]   ➜  Network: use --host to expose
[1] isPackaged: false
[1] URL: http://localhost:5173/
[1] title: My App
[1] wait-on tcp:5173 && electron . exited with code 0
--> Sending SIGTERM to other processes..
[0] vite exited with code 1
~~~

(السطور اللي فيها [[isPackaged]] و [[URL]] من سكربت تجربة بيطبع معلومات النافذة ويقفلها لوحده.)

نقرا الناتج:

| السطر | معناه |
|---|---|
| [[[0]]] و [[[1]]] | رقم الأمر: [[[0]]] هو [[vite]]، و [[[1]]] هو [[wait-on ... && electron .]] |
| [[ready in 659 ms]] | Vite جهز وفتح البورت، فـ wait-on خلص وقام Electron |
| [[URL: http://localhost:5173/]] | Electron فتح سيرفر Vite، مش ملف |
| [[exited with code 0]] | قفلت Electron بشكل عادي |
| [[Sending SIGTERM to other processes]] | ده شغل [[-k]]: بيقفل Vite. و SIGTERM إشارة «اقفل بهدوء» |
| [[vite exited with code 1]] | Vite اتقفل غصب عنه، فالرقم مش صفر، وده طبيعي هنا |

وبعدها اتأكدت إن البورت 5173 فضي، يعني Vite مافضلش شغال في الخلفية.

---

## ٤. نفس الفكرة بإيدك في ترمنالين

~~~bash
npx vite                                  # ترمنال ١
npx wait-on tcp:5173 && npx electron .    # ترمنال ٢
~~~

ده اللي السكربت بيعمله، بس بإيدك. مفيد تفهم منه، بس هتقفل الاتنين بنفسك.

> في Windows PowerShell 5.1 الـ [[&&]] مش موجود (موجود من PowerShell 7). هناك استخدم [[npm run dev]]، لأن npm بيشغّل السكربت في CMD وهو فاهم [[&&]].

---

## الـ hot reload بيشتغل على إيه؟

| عدّلت | بيحصل إيه |
|---|---|
| ملف في الواجهة ([[index.html]] أو [[src/]]) | بيتغير في النافذة لوحده (Vite HMR) |
| [[main.js]] أو [[preload.js]] | ولا حاجة، لازم تقفل وتشغّل [[npm run dev]] تاني |

ليه؟ لأن Vite بيخدم ملفات **الصفحة** بس. أما [[main.js]] فده كود Node اتقرا مرة واحدة لما Electron قام.

---

## الخلاصة

~~~text
concurrently -k   شغّل الاتنين، ولو واحد قفل اقفل التاني
wait-on tcp:5173  استنى Vite يفتح البورت
&&                شغّل Electron بس لو الاستنى نجح
~~~

ولو Vite لقى 5173 مشغول هيقوم على 5174 و wait-on هيفضل مستني للأبد: حط [[server: { strictPort: true }]] في vite.config.`,
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
          try: "على مشروع Vite تجربة: نفّذ الأوامر دي، وافتح [[capacitor.config.json]] (أو [[.ts]] لو المشروع فيه TypeScript) وشوف appId و webDir، وبص جوه فولدر android/.",
          deep: {
            why: "عندك موقع React أو Vue شغال، والعميل عايز تطبيق على الموبايل. بدل ما تكتب التطبيق من الأول، Capacitor بيلف نفس الموقع في تطبيق حقيقي يتسطّب.",
            how: R`[[@capacitor/core]] المكتبة اللي الكود بتاعك بيستخدمها، و [[@capacitor/cli]] أداة الأوامر [[cap]]، و [[@capacitor/android]] المنصة نفسها.

[[cap init]] بياخد: اسم التطبيق، و [[appId]] بصيغة دومين معكوس ([[com.example.myapp]])، و [[--web-dir]] الفولدر اللي الـ build بيطلع فيه (dist لـ Vite، و build لـ Create React App).

الـ appId هو الـ package name في أندرويد: هوية التطبيق للأبد. لو غيرته بعدين، أندرويد والـ Play Store بيعتبروه تطبيق تاني خالص.

[[cap add android]] بيعمل [[android/]] بـ Gradle والملفات كلها، وبعدين بينسخ webDir جوه المشروع. فابني الأول: من غير build المشروع بيتعمل بس بيطلّع [[[warn] sync could not run--missing dist directory.]] والموقع مبيتنسخش.

وفيه iOS بنفس الطريقة ([[@capacitor/ios]] و [[cap add ios]])، بس محتاج ماك و Xcode.`,
            when: "مرة واحدة في أول المشروع.",
            mistakes: R`webDir غلط فيطلع [[Could not find the web assets directory]]. وتحط android/ في .gitignore فتضيع كل تعديلاتك في المشروع الأصلي. وتغيّر appId بعد ما الناس سطّبت التطبيق: النسخة الجديدة مش هتتسطّب كتحديث.`
          },
          teach: R`## الفكرة في سطرين

عندك موقع (Vite أو React) بيتبني في فولدر [[dist]]. Capacitor بياخد الفولدر ده ويحطه جوه مشروع أندرويد حقيقي، والتطبيق بيعرضه في **WebView** (متصفح صغير جوه التطبيق من غير شريط عنوان). الأوامر الستة دي بتعمل كده مرة واحدة في أول المشروع.

جربتها كلها على مشروع Vite فاضي جوه Docker ([[node:22-slim]])، و Capacitor طلع نسخة 8.5.2. الأوامر نفسها هي هي على ويندوز والماك.

---

## ١. [[npm install @capacitor/core]]

[[npm install]] بيسطّب مكتبة في [[node_modules]] ويكتب اسمها في [[package.json]]. و [[@capacitor/core]] هي المكتبة اللي **كود الموقع بتاعك** بيستخدمها لما يحتاج حاجة من الموبايل (كاميرا، إشعارات، ...).

العلامة [[@]] في أول الاسم معناها إن المكتبة جوه **scope**، يعني مجموعة مكتبات تبع نفس الجهة: [[@capacitor/core]] و [[@capacitor/cli]] و [[@capacitor/android]] كلهم تبع فريق Capacitor.

ومن غير [[--save-dev]] بتتكتب تحت [[dependencies]]، لأنها جزء من التطبيق نفسه.

## ٢. [[npm install --save-dev @capacitor/cli]]

[[cli]] اختصار Command Line Interface: ده البرنامج اللي بيدّيك الأمر [[cap]]. و [[--save-dev]] (أو [[-D]]) بيكتبه تحت [[devDependencies]]، يعني أداة بتحتاجها وانت بتبني بس، مش جوه التطبيق.

## ٣. [[npx cap init myapp com.example.myapp --web-dir dist]]

[[npx]] بيشغّل أمر من [[node_modules/.bin]] بتاع المشروع، فمش محتاج تسطّب [[cap]] على الجهاز كله. والأمر بياخد ٣ حاجات:

| الحتة | معناها |
|---|---|
| [[myapp]] | اسم التطبيق اللي هيظهر تحت الأيقونة ([[appName]]) |
| [[com.example.myapp]] | الـ [[appId]]: هوية التطبيق |
| [[--web-dir dist]] | الفولدر اللي الـ build بيطلع فيه ([[webDir]]) |

الـ appId مكتوب **دومين معكوس**: لو موقعك [[myapp.example.com]] يبقى [[com.example.myapp]]. ده هو الـ package name في أندرويد، وده اللي أندرويد والـ Play Store بيعرفوا بيه التطبيق للأبد. لو غيّرته بعد النشر، يبقى تطبيق جديد خالص.

~~~text الناتج
✔ Creating capacitor.config.json in /w/myapp in 966.98μs
[success] capacitor.config.json created!
~~~

والملف اللي اتعمل:

~~~text capacitor.config.json
{
  "appId": "com.example.myapp",
  "appName": "myapp",
  "webDir": "dist"
}
~~~

> الملف طلع [[.json]] لأن المشروع مفيهوش TypeScript. لو مسطّب [[typescript]] بيطلع [[capacitor.config.ts]] بنفس القيم.

ولو نسيت تكتب الاسم والـ appId، [[cap init]] بيسألك عليهم. بس في ترمنال مش تفاعلي (زي CI) بيفشل:

~~~text الناتج
[error] Non-interactive shell detected.
        Run the command with --help to see a list of arguments that must be provided.
~~~

## ٤. [[npm install @capacitor/android]]

ده **منصة** أندرويد نفسها: فيها قالب المشروع ومكتبة Java اللي بتشغّل الـ WebView. ولـ iOS فيه [[@capacitor/ios]] بنفس الطريقة.

## ٥. [[npm run build]]

[[npm run]] بيشغّل سكربت من [[scripts]] في [[package.json]]. هنا [[build]] = [[vite build]]، وبيطلّع الموقع جاهز في [[dist]]:

~~~text الناتج
vite v8.3.3 building client environment for production...
✓ 2 modules transformed.
dist/index.html  0.05 kB │ gzip: 0.06 kB
✓ built in 47ms
~~~

## ٦. [[npx cap add android]]

بيعمل فولدر [[android/]] فيه مشروع Android Studio كامل، وبعدين بيعمل sync على طول (ينسخ [[dist]] جوه المشروع):

~~~text الناتج
✔ Adding native android project in android in 79.35ms
✔ add in 80.00ms
✔ Copying web assets from dist to android/app/src/main/assets/public in 3.85ms
✔ Creating capacitor.config.json in android/app/src/main/assets in 454.98μs
✔ copy android in 10.70ms
✔ Updating Android plugins in 1.01ms
✔ update android in 16.13ms
✔ Syncing Gradle in 265.37μs
[success] android platform added!
~~~

اقرا السطور: [[add]] عمل المشروع، و [[copy]] نسخ الموقع لـ [[android/app/src/main/assets/public]]، و [[update]] ظبط الـ plugins.

ولو نسيت الخطوة ٥ (مفيش [[dist]])، المشروع بيتعمل بس الموقع مبيتنسخش:

~~~text الناتج من غير build
✔ Adding native android project in android in 65.98ms
✔ add in 66.58ms
[warn] sync could not run--missing dist directory.
[success] android platform added!
~~~

### جوه [[android/]] فيه إيه؟

~~~text ls android android/app
android:
app  build.gradle  capacitor-cordova-android-plugins  capacitor.settings.gradle
gradle  gradle.properties  gradlew  gradlew.bat  settings.gradle  variables.gradle

android/app:
build  build.gradle  capacitor.build.gradle  proguard-rules.pro  src
~~~

| الملف | بتاع إيه |
|---|---|
| [[gradlew]] و [[gradlew.bat]] | بيبنوا التطبيق من الترمنال (درس [[./gradlew assembleDebug]]) |
| [[app/build.gradle]] | الـ appId و [[versionCode]] والتوقيع |
| [[variables.gradle]] | نسخ Android: [[minSdkVersion = 24]] (أقل أندرويد 7) و [[targetSdkVersion = 36]] |
| [[app/src/main/assets/public]] | نسخة من موقعك |
| [[app/src/main/res]] | الأيقونات وشاشة البداية |

> الفولدر ده بيتعمله commit، لأنك هتعدّل فيه الأيقونات والصلاحيات والتوقيع.

---

## الخلاصة

| الخطوة | الأمر | ليه |
|---|---|---|
| ١ | [[npm install @capacitor/core]] | مكتبة الكود بتاعك |
| ٢ | [[npm install --save-dev @capacitor/cli]] | الأمر [[cap]] |
| ٣ | [[npx cap init ...]] | الاسم والـ appId والـ webDir |
| ٤ | [[npm install @capacitor/android]] | منصة أندرويد |
| ٥ | [[npm run build]] | الموقع في [[dist]] |
| ٦ | [[npx cap add android]] | مشروع أندرويد في [[android/]] |

الـ appId هوية التطبيق للأبد، و [[webDir]] لازم يشاور على فولدر الـ build الحقيقي ([[dist]] في Vite، [[build]] في Create React App)، وابني قبل [[cap add]].`,
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
          teach: R`## ليه الدرس ده موجود

مشروع أندرويد فيه **نسخة** من موقعك، مش لينك ليه. يعني لو عدّلت الموقع، التطبيق مش هيشوف التعديل غير لما تعمل حاجتين: تبني الموقع، وتنسخه جوه المشروع. الدرس ده هو الخطوتين دول.

جربت كل الأوامر على نفس مشروع درس [[npx cap add android]] جوه Docker ([[node:22-slim]])، بـ Capacitor 8.5.2.

---

## ١. [[npm run build]]

بيشغّل [[vite build]] ويطلّع الموقع الجديد في [[dist]]. ده اللي بيتنسخ بعدين.

## ٢. [[npx cap sync android]]

[[sync]] بيعمل شغلتين ورا بعض، والناتج بيوريهم:

~~~text الناتج
✔ Copying web assets from dist to android/app/src/main/assets/public in 4.98ms
✔ Creating capacitor.config.json in android/app/src/main/assets in 763.76μs
✔ copy android in 13.90ms
✔ Updating Android plugins in 758.48μs
✔ update android in 24.63ms
[info] Sync finished in 0.05s
~~~

| السطر | معناه |
|---|---|
| [[Copying web assets from dist to ...public]] | نسخ موقعك جوه مشروع أندرويد |
| [[Creating capacitor.config.json ...]] | نسخة من الإعدادات للتطبيق يقراها وهو شغال |
| [[copy android]] | خلصت المرحلة الأولى ([[copy]]) |
| [[Updating Android plugins]] و [[update android]] | المرحلة التانية ([[update]]): ظبط ملفات Gradle للـ plugins |

والوحدات: [[ms]] ملي ثانية (جزء من ألف)، و [[μs]] ميكرو ثانية (جزء من مليون). يعني النسخ بياخد لحظة.

### اتأكد إن التعديل وصل

غيّرت العنوان في الصفحة من [[Hello v1]] لـ [[Hello v2]]، وعملت build و sync، ودورت جوه المشروع:

~~~bash
grep -o "Hello v2" android/app/src/main/assets/public/index.html
ls android/app/src/main/assets/public
~~~

~~~text الناتج
Hello v2
cordova.js
cordova_plugins.js
index.html
~~~

[[grep -o]] بيطبع الكلمة اللي لقاها بس (o من only). و [[cordova.js]] ملفات Capacitor بيضيفها عشان plugins قديمة من Cordova (الأداة اللي كانت قبله) تشتغل.

### [[copy]] ولا [[sync]]؟

| الأمر | بيعمل |
|---|---|
| [[npx cap copy android]] | ينسخ الموقع بس |
| [[npx cap sync android]] | ينسخ + يحدّث الـ plugins |

لو غيّرت الموقع بس، [[copy]] كفاية. لو سطّبت أو شلت plugin ([[@capacitor/camera]] مثلًا)، لازم [[sync]]. والأسهل تستخدم [[sync]] دايمًا.

ولو [[dist]] مش موجود، sync بيوقف وبيقولك بالظبط فين المشكلة:

~~~text الناتج من غير build
[error] Could not find the web assets directory: ./dist.
        Please create it and make sure it has an index.html file. You can change the path of this directory in capacitor.config.json (webDir option).
~~~

---

## ٣. السكربت [[cap:sync]]

~~~text في package.json جوه "scripts"
"cap:sync": "vite build && cap sync android"
~~~

[[&&]] معناها «شغّل اللي بعدي بس لو اللي قبلي نجح»: لو الـ build فشل، مفيش نسخ لنسخة بايظة. و [[:]] في الاسم مجرد جزء منه، اسم عادي بيجمع سكربتات Capacitor مع بعض. وجوه سكربت npm مش محتاج [[npx]]، لأن npm بيدوّر في [[node_modules/.bin]] لوحده.

## ٤. [[npm run cap:sync]]

~~~text الناتج (آخره)
✓ built in 43ms
✔ Copying web assets from dist to android/app/src/main/assets/public in 5.27ms
...
[info] Sync finished in 0.049s
~~~

الاتنين ورا بعض في أمر واحد، فمش هتنسى الـ build تاني.

---

## ٥. الأيقونة وشاشة البداية: [[npx @capacitor/assets generate]]

أندرويد محتاج الأيقونة بمقاسات كتير (لكل كثافة شاشة مقاس)، وشاشة البداية بالطول والعرض وفي الوضع الغامق. الأداة دي بتعملهم كلهم من صورتين:

| الملف | المقاس |
|---|---|
| [[assets/icon.png]] | 1024×1024 |
| [[assets/splash.png]] | 2732×2732 |

والأمر:

~~~bash
npx @capacitor/assets generate --android --iconBackgroundColor '#0f172a' --splashBackgroundColor '#0f172a'
~~~

| الحتة | معناها |
|---|---|
| [[npx @capacitor/assets]] | بينزّل الأداة ويشغّلها من غير ما تسطّبها في المشروع |
| [[generate]] | الأمر الفرعي: ولّد |
| [[--android]] | لأندرويد بس (من غيرها بيولّد لكل المنصات اللي في المشروع، وللويب PWA كمان) |
| [[--iconBackgroundColor]] | لون خلفية الأيقونة **التكيفية** (adaptive): أندرويد بيقصّها دايرة أو مربع حسب الموبايل، والخلفية بتملا الباقي |
| [[--splashBackgroundColor]] | لون خلفية شاشة البداية |
| [['#0f172a']] | لون بصيغة hex (أحمر وأخضر وأزرق)، وده كحلي غامق. وعلامات التنصيص عشان [[#]] في bash بتبدأ تعليق |

جربتها بصورتين عملتهم بالكود:

~~~text الناتج (أوله وآخره)
Generating assets for android
CREATE android adaptive-icon .../res/mipmap-ldpi/ic_launcher_foreground.png (333 B)
CREATE android adaptive-icon .../res/mipmap-mdpi/ic_launcher_foreground.png (564 B)
...
CREATE android splash .../res/drawable-port-xxxhdpi/splash.png (51.01 KB)

Totals:
android: 87 generated, 774.18 KB total
~~~

٨٧ ملف من صورتين. والأسامي زي [[mdpi]] و [[hdpi]] و [[xxxhdpi]] هي كثافة الشاشة (dpi = نقطة في البوصة): كل ما الشاشة أدق، المقاس أكبر. و [[land]] و [[port]] العرض والطول، و [[night]] للوضع الغامق.

---

## الخلاصة

~~~text
npm run build              الموقع الجديد في dist
npx cap sync android       انسخه للمشروع + حدّث الـ plugins
npm run cap:sync           الاتنين مرة واحدة
@capacitor/assets generate كل مقاسات الأيقونة وشاشة البداية
~~~

القاعدة: أي تعديل في الويب = build + sync قبل أي APK. ومتعدّلش بإيدك جوه [[assets/public]]: أول sync هيمسحه.`,
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
          teach: R`## الفكرة

بعد [[cap add]] و [[cap sync]] بقى عندك مشروع أندرويد جاهز. فاضل تشغّله على موبايل أو emulator (موبايل وهمي بيشتغل على الكمبيوتر). فيه طريقتين: تفتح Android Studio وتدوس Run، أو تعمل كل حاجة من الترمنال.

جربت الأوامر جوه Docker على نفس المشروع (Capacitor 8.5.2)، ومفيش Android Studio ولا Android SDK هناك، فهتشوف رسايل الخطأ الحقيقية اللي بتطلع لما حاجة ناقصة. والتشغيل الفعلي على موبايل مكتوب من دليل Capacitor.

---

## ١. [[npx cap open android]]

بيفتح فولدر [[android/]] في Android Studio. أول مرة Android Studio بيعمل **Gradle sync**: بيقرا ملفات المشروع وينزّل المكتبات اللي محتاجها، وده ممكن ياخد دقايق. استنى الشريط اللي تحت يخلص قبل ما تدوس Run.

لو Android Studio مش متسطّب أو مش في مكانه المعتاد:

~~~text الناتج على لينكس من غير Android Studio
[error] Unable to launch Android Studio. Is it installed?
        Attempted to open Android Studio at: /usr/local/android-studio/bin/studio.sh
        You can configure this with the CAPACITOR_ANDROID_STUDIO_PATH environment variable.
~~~

الرسالة بتقولك هو دوّر فين ([[/usr/local/android-studio/bin/studio.sh]])، والحل: متغير البيئة [[CAPACITOR_ANDROID_STUDIO_PATH]] فيه مسار Android Studio عندك. مثلًا على لينكس:

~~~bash
export CAPACITOR_ANDROID_STUDIO_PATH="$HOME/android-studio/bin/studio.sh"
~~~

[[export]] بيحط المتغير للترمنال ده والأوامر اللي بتتشغّل منه، و [[$HOME]] فولدر اليوزر بتاعك.

## ٢. [[npx cap run android --list]]

[[cap run]] بيبني ويسطّب ويفتح التطبيق، و [[--list]] بيخليه يعرض الأجهزة المتاحة بس من غير ما يبني. وبيستخدم جواه أداة اسمها [[native-run]]، وهي محتاجة Android SDK:

~~~text الناتج من غير Android SDK
[fatal] native-run failed with error

  	ERR_SDK_NOT_FOUND: No valid Android SDK root found.
~~~

[[SDK root]] يعني فولدر الـ Android SDK. بيدوّر عليه في متغير البيئة [[ANDROID_HOME]] وفي المكان الافتراضي اللي Android Studio بيسطّب فيه. فبعد ما تسطّب Android Studio، الأمر ده بيطلّع جدول فيه الموبايلات الموصّلة والـ emulators بالـ ID بتاع كل واحد.

## ٣. [[npx cap run android]]

نفس الأمر من غير [[--list]]: بيبني الـ APK، ويسطّبه، ويفتحه. ولو فيه أكتر من جهاز بيسألك تختار أنهي. لو مفيش ولا جهاز، بيقولك [[No target devices found]]: شغّل emulator من Device Manager في Android Studio، أو وصّل موبايل مفعّل عليه USB debugging (درس [[adb]]).

---

## ٤. نفس الكلام لـ iOS

~~~bash
npm install @capacitor/ios
npx cap add ios
npx cap open ios
~~~

| الأمر | بيعمل |
|---|---|
| [[npm install @capacitor/ios]] | منصة iOS، زي [[@capacitor/android]] |
| [[npx cap add ios]] | فولدر [[ios/]] فيه مشروع Xcode |
| [[npx cap open ios]] | يفتحه في Xcode |

جربت [[cap add ios]] على لينكس واشتغل عادي، لأنه بيعمل ملفات بس:

~~~text الناتج
✔ Adding native Xcode project in ios in 34.70ms
✔ Copying web assets from dist to ios/App/App/public in 5.42ms
[info] Writing Package.swift
[success] ios platform added!
~~~

([[Package.swift]] ملف Swift Package Manager، مدير المكتبات اللي Capacitor 8 بيستخدمه لـ iOS.) لكن [[cap open ios]] على لينكس طبع [[Opening the Xcode workspace...]] ومفيش حاجة فتحت: Xcode موجود على الماك بس. يعني تقدر تعمل المشروع في أي مكان، بس عشان **تبنيه وتشغّله** محتاج ماك و Xcode، وحساب Apple Developer عشان تسطّبه على آيفون حقيقي لفترة طويلة.

---

## الخلاصة

| الأمر | محتاج إيه | بيعمل |
|---|---|---|
| [[cap open android]] | Android Studio | يفتح المشروع فيه |
| [[cap run android --list]] | Android SDK | يعرض الأجهزة |
| [[cap run android]] | Android SDK + جهاز | يبني ويسطّب ويفتح |
| [[cap add ios]] | أي نظام | مشروع Xcode |
| [[cap open ios]] | ماك + Xcode | يفتحه في Xcode |

أول مرة افتح Android Studio عشان يسطّب الناقص ويعمل emulator، وبعد كده [[cap run android]] من الترمنال أسرع.`,
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
    }
  ]
});
