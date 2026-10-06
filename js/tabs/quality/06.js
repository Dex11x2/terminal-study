// تكملة تاب quality: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/quality/01.js (شرح حقول الدرس في أوله)
MORE("quality", [
    {
      t: "Playwright: e2e في متصفح حقيقي",
      l: 3,
      n: "login من أوله لآخره، و locators متتكسرش، و login مرة واحدة، و trace للـ CI، و a11y وميزانية أداء في كل PR",
      items: [
        {
          cmd: "npm init playwright",
          title: "جهّز Playwright في المشروع",
          desc: R`[[npm init playwright@latest]] بيسطّب [[@playwright/test]]، ويعمل [[playwright.config.ts]] وفولدر اختبارات فيه مثال، ويسألك تنزّل المتصفحات ولا لأ. و [[--gha]] بيضيف workflow لـ GitHub Actions.

[[npx playwright install]] بينزّل المتصفحات نفسها (Chromium و Firefox و WebKit) في كاش برا المشروع. و [[--with-deps]] بيسطّب مكتبات لينكس اللي محتاجاها، ودي للـ CI.

[[--ui]] بيفتح واجهة تشغّل منها الاختبارات وتشوف كل خطوة، و [[codegen]] بيسجّل اللي بتعمله في المتصفح ويكتبه كود.`,
          example: R`npm init playwright@latest
npm init playwright@latest -- --quiet --lang=ts --browser=chromium --gha
npx playwright install --with-deps chromium
npx playwright test
npx playwright test --ui
npx playwright codegen http://localhost:3000
npx playwright show-report`,
          try: R`في مشروع الـ lab، شغّل التاني ([[--quiet]]) وشوف الملفات اللي اتعملت. بعدين [[npx playwright install chromium]] و [[npx playwright test]]. وجرّب [[codegen]] على أي موقع، ادوس على كام حاجة، واقرا الكود اللي طلع.`,
          deep: {
            why: "الـ unit tests بتقول [[cartTotal]] صح، و supertest بيقول الـ API صح، بس محدش فيهم بيقول «اليوزر يقدر يسجّل دخول ويدفع». الـ cookie ممكن متتحفظش، أو الـ redirect يروح لمكان غلط، أو زرار مغطّي بـ modal. e2e بيشغّل المتصفح الحقيقي على التطبيق كله زي اليوزر بالظبط.",
            how: R`[[@playwright/test]] حاجتين: مكتبة بتتحكم في المتصفح (افتح صفحة، اكتب، دوس)، و test runner خاص بيها ([[playwright test]]) بيشغّل الملفات بالتوازي في workers، كل اختبار في browser context نضيف (زي incognito جديد).

المتصفحات مش من npm. [[playwright install]] بينزّل نسخ معينة متظبطة على نسخة Playwright دي بالظبط، في [[~/.cache/ms-playwright]] على لينكس. لو رقّيت [[@playwright/test]] لازم تعيد install، وإلا هيقولك «Executable doesn't exist». و [[--with-deps]] بيستخدم apt يسطّب مكتبات النظام (fonts و libnss وغيرهم)، فمحتاج sudo، وده الطبيعي في CI.

الـ init بيعمل: [[playwright.config.ts]]، و [[tests/example.spec.ts]]، ويضيف للـ [[.gitignore]] الفولدرات اللي بتتولّد ([[test-results/]] و [[playwright-report/]] و [[playwright/.auth/]])، ومع [[--gha]] ملف [[.github/workflows/playwright.yml]].

[[--ui]] أحسن طريقة وانت بتكتب: قايمة الاختبارات، وتشغّل واحد، وتشوف لقطة لكل خطوة، ووضع watch. و [[--headed]] يفتح المتصفح قدامك، و [[--debug]] يوقف عند كل خطوة. و [[show-report]] بيفتح تقرير HTML بعد التشغيل.

[[codegen]] بيفتح متصفح وكل ما تدوس أو تكتب بيطلّعلك سطر كود، وبيختار locators كويسة ([[getByRole]]). بداية ممتازة، بس بعدها نضّف الكود وضيف الـ assertions بنفسك.`,
            when: "أول ما يبقى عندك flow حرج بيعدّي على كذا صفحة وسيرفر: login، و checkout، و onboarding. ومش لكل حاجة: كل e2e بياخد ثواني.",
            mistakes: R`تسطّب المتصفحات التلاتة وانت محتاج Chromium بس، فالـ CI ينزّل ٤٠٠ ميجا كل مرة: حدد [[chromium]] في الـ install وفي الـ projects. وترقّي [[@playwright/test]] من غير [[playwright install]]، فكل الاختبارات تقع بـ «Executable doesn't exist». وتحط [[tests/]] بتاعة Playwright في نفس مكان اختبارات vitest، فـ vitest يحاول يشغّل ملفات [[.spec.ts]] بتاعة Playwright ويقع: خليها في [[e2e/]] وقول لـ vitest يستثنيه ([[exclude]]).`
          },
          teach: R`## الأول: ٧ أوامر، كل واحد ليه وقت

المثال مش سكربت بيتشغّل مرة واحدة. السطرين الأولانيين بيجهّزوا المشروع (مرة في عمره)، والتالت بينزّل المتصفح، والباقي هتستخدمه كل يوم. كل الناتج اللي تحت حقيقي من تشغيل على ويندوز 11 بـ Node 24 و Playwright [[1.63.0]] في فولدر تجربة فاضي اسمه [[lab]]، وجزء لينكس من container [[node:22-slim]]. والأوامر نفسها بتتكتب زي ما هي في PowerShell و bash.

---

## ١. [[npm init playwright@latest]]

### يعني إيه [[npm init]] حاجة؟

[[npm init]] لوحده بيعمل [[package.json]]. لكن لما تكتب بعده اسم، npm بيدوّر على package اسمها [[create-]] + الاسم ده، يعني هنا [[create-playwright]]، وينزّلها مؤقتًا ويشغّلها (زي [[npx create-playwright]] بالظبط). و [[@latest]] معناها «آخر نسخة»، عشان ميستخدمش نسخة قديمة متخزّنة عندك.

السطر الأول تفاعلي: بيسألك أربع أسئلة (من الـ docs): TypeScript ولا JavaScript؟ الاختبارات في أنهي فولدر؟ تضيف workflow لـ GitHub Actions؟ تنزّل المتصفحات دلوقتي؟ وانت بتختار بالأسهم و Enter.

---

## ٢. نفس الأمر من غير أسئلة

~~~bash
npm init playwright@latest -- --quiet --lang=ts --browser=chromium --gha
~~~

### الـ [[--]] اللي في النص

أي حاجة **قبل** [[--]] دي options لـ npm نفسه، وأي حاجة **بعدها** npm بيعدّيها زي ما هي لـ [[create-playwright]]. من غير [[--]]، npm ممكن يفتكر [[--quiet]] بتاعته هو.

| الجزء | معناه |
|---|---|
| [[--quiet]] | متسألش، خد الإجابات الافتراضية أو اللي بعدي |
| [[--lang=ts]] | TypeScript (الملفات [[.ts]]) |
| [[--browser=chromium]] | Chromium بس، مش التلاتة |
| [[--gha]] | اعمل ملف workflow لـ GitHub Actions |

### بيطبع إيه

~~~text الناتج (مختصر)
> npx
> create-playwright --quiet --lang=ts --browser=chromium --gha

Getting started with writing end-to-end tests with Playwright:
Initializing project in '.'
Initializing NPM project (npm init -y)…
Installing Playwright Test (npm install --save-dev @playwright/test)…
added 3 packages, and audited 4 packages in 2s
Installing Types (npm install --save-dev @types/node)…
Writing playwright.config.ts.
Writing .github\workflows\playwright.yml.
Writing tests\example.spec.ts.
Writing package.json.
Downloading browsers (npx playwright install chromium)…
✔ Success! Created a Playwright Test project at C:\Users\ali\lab
~~~

لاحظ السطر الأول: [[npm init]] اتحوّل لـ [[npx create-playwright]] زي ما قلنا. والفولدر كان فاضي، فعمل [[package.json]] بـ [[npm init -y]] الأول. وفي الآخر نزّل المتصفح لوحده، فالسطر التالت في المثال ده لجهاز جديد أو للـ CI.

### الملفات اللي اتعملت

~~~text
./.github/workflows/playwright.yml
./.gitignore
./package-lock.json
./package.json
./playwright.config.ts
./tests/example.spec.ts
~~~

و [[package.json]] بقى فيه:

~~~json package.json (جزء)
"devDependencies": {
  "@playwright/test": "^1.63.0",
  "@types/node": "^26.6.4"
}
~~~

[[@playwright/test]] هو الـ runner والمكتبة، و [[@types/node]] عشان TypeScript يفهم [[process.env]] اللي في الإعدادات. و [[.gitignore]] اتعمل وفيه:

~~~text .gitignore
# Playwright
node_modules/
/test-results/
/playwright-report/
/blob-report/
/playwright/.cache/
/playwright/.auth/
~~~

دي كلها فولدرات Playwright بيولّدها وانت بتشغّل (نتايج، وتقارير، و sessions)، ومكانها مش Git.

> الـ workflow اللي [[--gha]] عمله فيه [[npx playwright install --with-deps]] **من غير** [[chromium]]، يعني بينزّل التلات متصفحات في كل run، حتى لو اخترت Chromium بس. عدّله بإيدك وزوّد [[chromium]] في آخره.

---

## ٣. [[npx playwright install --with-deps chromium]]

### [[npx]] و [[playwright install]]

[[npx]] بيشغّل أمر من الـ packages اللي في [[node_modules]] بتاعة المشروع، يعني نفس نسخة Playwright اللي في [[package.json]]. و [[install]] بينزّل المتصفحات نفسها، لأنها مش جوه npm. كل نسخة Playwright متظبطة على نسخة متصفح معينة بالظبط، و [[--dry-run]] بيوريك هينزّل إيه وفين من غير ما ينزّل:

~~~text npx playwright install --dry-run chromium (ويندوز)
Chrome for Testing 153.0.8010.12 (playwright chromium v1243)
  Install location:    C:\Users\ali\AppData\Local\ms-playwright\chromium-1243
Chrome Headless Shell 153.0.8010.12 (playwright chromium-headless-shell v1243)
  Install location:    C:\Users\ali\AppData\Local\ms-playwright\chromium_headless_shell-1243
FFmpeg (playwright ffmpeg v1011)
Winldd (playwright winldd v1007)
~~~

~~~text نفس الأمر في node:22-slim (لينكس)
Chrome for Testing 153.0.8010.12 (playwright chromium v1243)
  Install location:    /root/.cache/ms-playwright/chromium-1243
Chrome Headless Shell 153.0.8010.12 (playwright chromium-headless-shell v1243)
  Install location:    /root/.cache/ms-playwright/chromium_headless_shell-1243
~~~

يعني الكاش برا المشروع: [[%LOCALAPPDATA%\ms-playwright]] على ويندوز و [[~/.cache/ms-playwright]] على لينكس، ومشترك بين كل مشاريعك. وكلمة [[chromium]] بتنزّل حاجتين: Chrome كامل (للـ [[--headed]] و [[--ui]]) و Headless Shell أخف بيتشغّل في الـ headless العادي. على الجهاز ده الاتنين أخدوا حوالي ٤٣٣ و ٢٧١ ميجا بعد فك الضغط. لو الماكينة مش هتفتح متصفح ظاهر أبدًا (CI)، [[--only-shell]] بينزّل التاني بس.

### [[--with-deps]]: مكتبات لينكس

Chromium على لينكس محتاج مكتبات نظام (fonts و libnss و libglib وغيرهم). على صورة صغيرة زي [[node:22-slim]] نزّلت المتصفح **من غير** [[--with-deps]] وشغّلت اختبار:

~~~text الناتج (node:22-slim)
Error: browserType.launch: Target page, context or browser has been closed
...
chrome-headless-shell: error while loading shared libraries: libglib-2.0.so.0: cannot open shared object file: No such file or directory
~~~

ومع [[--with-deps]] Playwright شغّل [[apt-get]] وسطّب عشرات المكتبات ([[Installing dependencies...]] وبعدها قايمة طويلة)، والاختبار عدّى: [[1 passed (1.3s)]]. الـ container كان شغال كـ root، فمحتاجش sudo. على GitHub Actions بيستخدم sudo لوحده. وعلى ويندوز والماك مفيش الحكاية دي.

---

## ٤. [[npx playwright test]]

بيشغّل كل ملفات الاختبار في [[testDir]]، headless (من غير ما تشوف شباك). المثال اللي الـ init عمله بيفتح [[playwright.dev]]، فمحتاج نت:

~~~text الناتج
Running 2 tests using 2 workers

  ok 1 [chromium] › tests\example.spec.ts:3:5 › has title (4.0s)
  ok 2 [chromium] › tests\example.spec.ts:10:5 › get started link (4.1s)

  2 passed (6.9s)
~~~

| الحتة | معناها |
|---|---|
| [[2 workers]] | اتنين processes شغالين بالتوازي، كل واحد بمتصفحه |
| [[[chromium]]] | اسم الـ project من [[playwright.config.ts]] |
| [[tests\example.spec.ts:3:5]] | الملف، والسطر ٣، والعمود ٥ اللي فيه [[test(]] |
| [[has title]] | اسم الاختبار |
| [[(4.0s)]] | وقته (أول مرة أبطأ عشان المتصفح بيفتح) |

### لو المتصفح مش متنزّل

ده اللي هيحصل لو رقّيت [[@playwright/test]] ونسيت [[install]]. جرّبته بإني وجّهت Playwright لفولدر متصفحات فاضي (بمتغير البيئة [[PLAYWRIGHT_BROWSERS_PATH]]، اللي بيغيّر مكان الكاش):

~~~text الناتج
Error: browserType.launch: Executable doesn't exist at ...\chromium_headless_shell-1243\chrome-headless-shell-win64\chrome-headless-shell.exe
╔════════════════════════════════════════════════════════════╗
║ Looks like Playwright was just installed or updated.       ║
║ Please run the following command to download new browsers: ║
║                                                            ║
║     npx playwright install                                 ║
╚════════════════════════════════════════════════════════════╝
~~~

لاحظ الرقم [[1243]] في المسار: ده رقم نسخة المتصفح اللي Playwright ده مستنيها بالظبط.

---

## ٥. [[--ui]] و [[codegen]]: واجهات بتتفتح قدامك

الاتنين بيفتحوا شبابيك، فمتشغّلوش في CI. ([[--ui]] و [[codegen]] متجرّبوش هنا لأنهم محتاجين حد يدوس، والكلام عنهم من الـ docs و [[--help]].)

- [[npx playwright test --ui]]: قايمة اختباراتك على الشمال، تشغّل واحد بدوسة، وتشوف لقطة لكل خطوة، وفيه watch.
- [[npx playwright codegen http://localhost:3000]]: بيفتح متصفح على العنوان ده، وكل ما تدوس أو تكتب بيطلّع سطر كود في شباك جنبه. [[--help]] بتاعه بيقول إن [[-o file]] يحفظ الكود في ملف، و [[--target]] يختار اللغة (الافتراضي [[playwright-test]])، و [[--device "iPhone 11"]] يقلّد موبايل.

---

## ٦. [[npx playwright show-report]]

بعد أي تشغيل بالـ reporter بتاع [[html]]، التقرير بيتحط في [[playwright-report/index.html]]، والأمر ده بيعمل سيرفر صغير ويفتحه:

~~~text الناتج
  Serving HTML report at http://localhost:9323. Press Ctrl+C to quit.
~~~

[[9323]] هو البورت الافتراضي ([[--port]] يغيّره)، والسيرفر بيفضل شغال لحد Ctrl+C. وتقدر تديله فولدر أو zip نزّلته من CI: [[npx playwright show-report playwright-report]].

---

## الأوامر كلها

| الأمر | بتشغّله إمتى |
|---|---|
| [[npm init playwright@latest]] | أول مرة، بأسئلة |
| [[... -- --quiet --lang=ts --browser=chromium --gha]] | أول مرة، من غير أسئلة |
| [[npx playwright install --with-deps chromium]] | جهاز جديد، أو CI، أو بعد ترقية Playwright |
| [[npx playwright test]] | كل ما تشغّل الاختبارات |
| [[npx playwright test --ui]] | وانت بتكتب اختبار |
| [[npx playwright codegen URL]] | عشان تبدأ اختبار بسرعة |
| [[npx playwright show-report]] | بعد التشغيل عشان تشوف التفاصيل |

## الخلاصة

- [[npm init playwright]] = [[npx create-playwright]]: بيسطّب [[@playwright/test]] ويعمل config ومثال و [[.gitignore]] (و workflow مع [[--gha]]).
- المتصفحات مش في [[node_modules]]: في كاش برا المشروع، ونسختها مربوطة بنسخة Playwright. رقّيت؟ اعمل [[install]] تاني.
- [[--with-deps]] لمكتبات لينكس بس، ومن غيرها على صورة صغيرة هتشوف [[error while loading shared libraries]].
- workflow الـ [[--gha]] بينزّل التلات متصفحات: زوّد [[chromium]].`,
          lines: [
            "جهّز Playwright بأسئلة تفاعلية.",
            "نفسه من غير أسئلة: TypeScript، و Chromium بس، و workflow لـ GitHub Actions.",
            "نزّل Chromium ومكتبات لينكس اللي محتاجها (للـ CI أو أول مرة).",
            "شغّل كل الاختبارات headless.",
            "واجهة تشغّل منها وتشوف كل خطوة.",
            "سجّل اللي بتعمله في المتصفح واكتبه كود.",
            "افتح تقرير HTML لآخر تشغيل."
          ],
          sol: R`بعد الـ init هتلاقي: [[playwright.config.ts]]، و [[tests/example.spec.ts]]، و [[.github/workflows/playwright.yml]] (من [[--gha]])، وسطور جديدة في [[.gitignore]] زي [[/test-results/]] و [[/playwright-report/]] و [[/playwright/.auth/]]، و [[@playwright/test]] في devDependencies.

[[npx playwright test]] بيطبع [[Running 2 tests using 2 workers]] وبعدين [[2 passed]] (المثال بيفتح موقع playwright.dev، فمحتاج نت).

لو طلعلك [[Executable doesn't exist at ...]] يبقى المتصفحات مش متنزّلة أو نسختها مش بتاعة Playwright ده: [[npx playwright install chromium]].`
        },
        {
          cmd: "playwright.config.ts",
          title: "الإعدادات: السيرفر والعنوان والمتصفحات",
          desc: R`[[webServer]] بيشغّل تطبيقك قبل الاختبارات ويستنى لحد ما العنوان يرد، ويقفله بعدها. و [[baseURL]] بيخليك تكتب [[page.goto("/login")]] بدل العنوان كامل.

[[retries]] و [[trace]] للـ CI بس: لو اختبار وقع يتعاد، ويتسجّل trace تفتحه بعدين. و [[forbidOnly]] بيمنع [[test.only]] اللي حد نسيه.`,
          example: R`import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["html", { open: "never" }], ["github"]] : "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: process.env.CI ? "npm run start" : "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});`,
          try: R`حط الإعدادات دي في مشروعك (أو في الـ lab مع سيرفر بسيط)، واقفل السيرفر وشغّل [[npx playwright test]]: Playwright هيشغّله لوحده. بعدين شغّل السيرفر بإيدك وشغّل الاختبارات تاني ولاحظ الفرق في الوقت.`,
          flag: "script",
          deep: {
            why: "من غير webServer، لازم تفتكر تشغّل السيرفر في ترمنال تاني قبل الاختبارات، وفي CI محتاج سكربت يشغّله في الخلفية ويستنى. ومن غير baseURL، كل اختبار فيه [[http://localhost:3000]] ولما تغيّر البورت تعدّل عشرين ملف.",
            how: R`[[webServer.command]] بيتشغّل في shell، و Playwright بيعمل طلبات على [[url]] لحد ما يرجع أي status مش خطأ (2xx أو 3xx أو 400-403)، وبعدين يبدأ الاختبارات، ولو عدّى [[timeout]] يقع. في CI بنشغّل [[npm run start]] على build حقيقي لأنه أقرب للإنتاج وأسرع من dev (Next في dev بيعمل compile لكل صفحة أول مرة). و [[reuseExistingServer]] على جهازك: لو السيرفر شغال أصلًا يستخدمه بدل ما يقع بـ «port already in use».

[[use]] إعدادات لكل الاختبارات: [[baseURL]]، و [[trace]]، و [[screenshot: "only-on-failure"]]، و [[locale]] و [[timezoneId]] لو التطبيق عربي.

[[projects]] بتشغّل نفس الاختبارات بإعدادات مختلفة: Chrome، و Firefox، و موبايل ([[devices["Pixel 7"]]]). كل project ليه اسم تختاره بـ [[--project=chromium]].

[[fullyParallel]] بيشغّل الاختبارات جوه الملف الواحد بالتوازي كمان. [[workers: 1]] في CI عشان ماكينة GitHub صغيرة وعشان الاختبارات متتخانقش على نفس الداتابيز. و [[!!process.env.CI]] بيحوّل النص لـ true/false.

والـ reporter [[github]] بيحط الأخطاء كـ annotations على السطر في الـ PR، و [[html]] بيعمل تقرير ترفعه artifact.`,
            when: "مرة واحدة لما تجهّز Playwright. وتعدّله لما تضيف متصفح أو setup project (الدرس الجاي بعد اللي جاي).",
            mistakes: R`[[retries: 2]] على جهازك، فالاختبار الـ flaky بيعدّي في التانية ومتاخدش بالك: خليها في CI بس، وبص على كلمة flaky في التقرير. و [[url]] في webServer بيشاور على صفحة بترجع 500 وقت ما الداتابيز لسه مش جاهزة، فيستنى لحد الـ timeout. و [[npm run dev]] في CI فأول اختبار ياخد ٣٠ ثانية compile ويقع بالـ timeout. وتنسى إن [[baseURL]] من غير [[/]] في الآخر، و [[goto("login")]] من غير [[/]] ممكن يروح لمكان غلط حسب الصفحة الحالية.`
          },
          teach: R`## الأول: الملف ده بيرد على ٣ أسئلة

[[playwright.config.ts]] ملف TypeScript عادي بيصدّر object واحد، و Playwright بيقراه قبل أي اختبار. والـ object ده بيرد على ٣ أسئلة: الاختبارات فين وتتشغّل إزاي؟ في أنهي متصفح؟ والتطبيق نفسه مين يشغّله؟ وفي كل سؤال فيه إجابة لجهازك وإجابة للـ CI.

جرّبت الإعدادات دي زي ما هي على ويندوز في مشروع تجربة: سيرفر Node صغير ([[server.js]]) بيطبع [[ready on http://localhost:3000]]، و [[npm run dev]] و [[npm run start]] الاتنين بيشغّلوه، و Playwright [[1.63.0]].

---

## ١. سطر الـ import

~~~ts
import { defineConfig, devices } from "@playwright/test";
~~~

- [[defineConfig]] دالة بترجّع الـ object زي ما هو. فايدتها إن الـ editor يعرف شكل الإعدادات، فيكمّل الأسامي ويطلّعلك خط أحمر لو كتبت [[retry]] بدل [[retries]].
- [[devices]] قاموس فيه إعدادات جاهزة لأجهزة ومتصفحات. في النسخة دي فيه ٢٠٧ جهاز. شوف واحد:

~~~bash
node -e 'const { devices } = require("@playwright/test"); console.log(devices["Desktop Chrome"])'
~~~

~~~text الناتج
{
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ... Chrome/153.0.8010.12 Safari/537.36',
  viewport: { width: 1280, height: 720 },
  screen: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
  isMobile: false,
  hasTouch: false,
  defaultBrowserType: 'chromium'
}
~~~

يعني «Desktop Chrome» = شاشة ١٢٨٠×٧٢٠، ماوس مش لمس، و Chromium. و [[devices["Pixel 7"]]] نفس الفكرة بـ [[viewport]] عرضه ٤١٢ و [[isMobile: true]] و [[hasTouch: true]].

## ٢. [[export default defineConfig({ ... })]]

[[export default]] معناها «ده الحاجة الأساسية اللي الملف بيطلّعها»، و Playwright بيدوّر عليها بالظبط. كل اللي جوه القوسين هو الإعدادات.

---

## ٣. فين الاختبارات وتتشغّل إزاي

### [[testDir: "./e2e"]]

الفولدر اللي Playwright بيدوّر فيه على ملفات [[.spec.ts]] و [[.test.ts]]. فولدر لوحده عشان vitest ميلمسهوش.

### [[fullyParallel: true]]

من غيرها، الملفات بتتوزّع على الـ workers، بس الاختبارات **جوه الملف الواحد** بتمشي ورا بعض. معاها حتى دول بيتوزّعوا.

### [[forbidOnly: !!process.env.CI]]

خلينا نفكّها من جوه:

- [[process.env.CI]]: متغير البيئة [[CI]]. GitHub Actions (وأغلب أنظمة الـ CI) بيعرّفه بـ [[true]]، وعلى جهازك مش موجود فبيبقى [[undefined]].
- [[!!]]: علامة «not» مرتين. الأولى بتحوّل القيمة لـ boolean مقلوب، والتانية بترجّعه. النتيجة: أي نص فيه حاجة يبقى [[true]]، والفاضي أو [[undefined]] يبقى [[false]].

~~~bash
node -e 'console.log(!!undefined, !!"true", !!"", !!"0")'
~~~

~~~text الناتج
false true false true
~~~

خد بالك من الأخيرة: [[CI=0]] برضه [[true]]، لأنه نص مش فاضي.

و [[forbidOnly]] بيرفض أي [[test.only]] (اللي بيخلي اختبار واحد بس يشتغل وانت بتصلّحه). حطّيت ملف فيه [[test.only("focused", ...)]] وشغّلت بـ [[CI=1]]:

~~~text الناتج
Error: item focused with '.only' is not allowed due to the 'forbidOnly' option in '..\playwright.config.ts': "only.spec.ts focused"
   at only.spec.ts:2
> 2 | test.only("focused", async () => {});
    |      ^
~~~

ومن غير [[CI]] نفس الملف اشتغل عادي: [[1 passed]]. كده على جهازك [[.only]] مسموح، وفي CI ممنوع.

### [[retries]] و [[workers]]: علامة [[? :]]

[[process.env.CI ? 2 : 0]] معناها: لو [[CI]] موجود خد ٢، وإلا خد ٠. اسمها ternary، وهي [[if/else]] في سطر.

- [[retries]]: الاختبار اللي يقع يتعاد كام مرة. في CI مرتين، وعلى جهازك ولا مرة عشان تشوف الفشل على طول.
- [[workers]]: عدد الـ processes اللي شغالة بالتوازي. [[1]] في CI، و [[undefined]] على جهازك يعني «Playwright يختار»، والاختيار نص عدد الـ logical processors. على جهاز فيه ١٦:

~~~text الناتج (على الجهاز / مع CI=1)
Running 21 tests using 8 workers
Running 2 tests using 1 worker
~~~

### [[reporter]]

شكل الناتج. [[process.env.CI ? [...] : "list"]]:

- على جهازك [[list]]: سطر لكل اختبار ([[ok 1 [chromium] › ...]]).
- في CI مصفوفة فيها اتنين reporters مع بعض، كل واحد [[["اسم", { options }]]]:
  - [[["html", { open: "never" }]]]: التقرير في [[playwright-report/]] من غير ما يحاول يفتح متصفح.
  - [[["github"]]]: بيطبع سطور GitHub بيفهمها ويحطها على السطر في الـ PR. ده الناتج الحقيقي لاختبار وقع مع [[CI=1]]:

~~~text الناتج
::error file=e2e\broken.spec.ts,title=[chromium] › e2e\broken.spec.ts:2:5 › home has a cart link,line=4,col=58::  1) [chromium] › ...
~~~

[[file=]] و [[line=]] و [[col=]] هما اللي بيخلوا GitHub يعلّم على السطر ٤ في الملف ده.

---

## ٤. [[use]]: إعدادات كل اختبار

- [[baseURL: "http://localhost:3000"]]: أي [[page.goto("/login")]] بيتكمّل عليه، فيبقى [[http://localhost:3000/login]].
- [[trace: "on-first-retry"]]: سجّل trace (تسجيل لكل خطوة، ليه درس لوحده) لما الاختبار يقع ويتعاد أول مرة بس. على جهازك [[retries]] صفر، فمفيش traces إلا لو طلبتها.

## ٥. [[projects]]

كل project = نفس الاختبارات بإعدادات مختلفة، وليه [[name]] بيظهر بين قوسين مربعين في الناتج ([[[chromium]]]). و [[...devices["Desktop Chrome"]]] معناها «افرد كل خانات الـ object ده هنا» (الـ [[...]] اسمها spread). لو زوّدت [[{ name: "mobile", use: { ...devices["Pixel 7"] } }]] كل اختبار هيتشغّل مرتين.

---

## ٦. [[webServer]]: مين يشغّل التطبيق

| الخانة | معناها |
|---|---|
| [[command]] | الأمر اللي يشغّل التطبيق: [[npm run start]] في CI و [[npm run dev]] عندك |
| [[url]] | Playwright يفضل يبعت طلبات للعنوان ده لحد ما يرد، وبعدين يبدأ |
| [[reuseExistingServer: !process.env.CI]] | عندك: لو فيه سيرفر شغال استخدمه. في CI: لأ |
| [[timeout: 120_000]] | يستنى لحد ١٢٠ ألف ملي ثانية (دقيقتين). الـ [[_]] بس عشان الرقم يتقري |

جرّبت الأربع حالات:

### السيرفر مقفول

Playwright شغّل [[npm run dev]] لوحده، واستنى، واختبر، وقفله:

~~~text الناتج
Running 2 tests using 2 workers
  ok 2 [chromium] › e2e\login.spec.ts:14:5 › wrong password shows an error (1.9s)
  ok 1 [chromium] › e2e\login.spec.ts:3:5 › user can sign in and see the dashboard (3.2s)
  2 passed (6.1s)
~~~

### السيرفر شغال بإيدك، من غير CI

[[reuseExistingServer]] بـ [[true]]، فاستخدمه على طول: [[2 passed (4.7s)]]. الفرق هنا صغير لأن السيرفر بيقوم في جزء من ثانية، بس مع Next في dev ممكن يبقى ثواني كتير.

### السيرفر شغال و [[CI=1]]

[[reuseExistingServer]] بقى [[false]]، فرفض يكمّل بدل ما يختبر على سيرفر مش هو اللي شغّله:

~~~text الناتج
Error: http://localhost:3000 is already used, make sure that nothing is running on the port/url or set reuseExistingServer:true in config.webServer.
~~~

### حاجة تانية ماسكة البورت ومش بترد صح

شغّلت برنامج ماسك بورت ٣٠٠٠ وبيقفل أي اتصال على طول. Playwright ملقاش رد على الـ [[url]]، فشغّل [[npm run dev]]، والسيرفر وقع. كل سطر من السيرفر بيظهر وقبله [[[WebServer]]]:

~~~text الناتج (مختصر)
[WebServer] Error: listen EADDRINUSE: address already in use :::3000
[WebServer]   code: 'EADDRINUSE',
Error: Process from config.webServer was not able to start. Exit code: 1
~~~

[[EADDRINUSE]] = Error ADDRess IN USE، يعني البورت مع حد تاني. أول ما الـ webServer يقع، اقرا سطور [[[WebServer]]] الأول: فيها خطأ التطبيق نفسه.

---

## الملف كله في جدول

| الخانة | عندك | في CI |
|---|---|---|
| [[forbidOnly]] | false | true |
| [[retries]] | 0 | 2 |
| [[workers]] | نص الـ logical processors | 1 |
| [[reporter]] | list | html + github |
| [[webServer.command]] | npm run dev | npm run start |
| [[reuseExistingServer]] | true | false |

## الخلاصة

- كل اختلاف بين جهازك والـ CI متعلّق على [[process.env.CI]]، و [[!!]] بتحوّله true/false (وخلي بالك [[CI=0]] برضه true).
- [[baseURL]] يخليك تكتب [[goto("/login")]]، و [[projects]] تشغّل نفس الاختبارات على أكتر من جهاز.
- [[webServer]] بيشغّل التطبيق ويستنى الـ [[url]]، ولو وقع اقرا سطور [[[WebServer]]].`,
          lines: [
            "defineConfig للـ autocomplete، و devices فيها إعدادات جاهزة لكل متصفح وجهاز.",
            "الإعدادات كلها.",
            "الاختبارات في فولدر e2e (بعيد عن اختبارات vitest).",
            "حتى الاختبارات جوه الملف الواحد بالتوازي.",
            "في CI: لو حد نسي test.only، الـ run يقع.",
            "في CI: الاختبار اللي يقع يتعاد مرتين.",
            "في CI: worker واحد، وعلى جهازك Playwright يختار حسب الـ CPU.",
            "في CI: تقرير HTML و annotations على الـ PR. على جهازك: قايمة في الترمنال.",
            "إعدادات لكل الاختبارات:",
            "goto('/login') يبقى على العنوان ده.",
            "سجّل trace لو الاختبار وقع واتعاد.",
            "نهاية use.",
            "المتصفحات:",
            "Chrome ديسكتوب بس.",
            "نهاية projects.",
            "شغّل التطبيق قبل الاختبارات:",
            "في CI على build حقيقي، وعلى جهازك dev.",
            "استنى لحد ما العنوان ده يرد.",
            "على جهازك: لو السيرفر شغال أصلًا استخدمه.",
            "استنى لحد دقيقتين.",
            "نهاية webServer.",
            "نهاية الإعدادات."
          ],
          sol: R`لما السيرفر مقفول، Playwright بيشغّل [[npm run dev]] ويستنى لحد ما [[localhost:3000]] يرد، وبعدين يبدأ. وبعد ما يخلص بيقفله. ولو الأمر وقع، هتشوف سطور [[[WebServer]]] في الترمنال فيها خطأ السيرفر نفسه، ودي أول حاجة تقراها.

لما السيرفر شغال بإيدك، [[reuseExistingServer]] بيخليه يستخدمه على طول، فالاختبارات تبدأ أسرع.

لو فيه سيرفر بيرد على العنوان و [[reuseExistingServer]] بـ false (يعني [[CI]] متعرّف عندك)، Playwright بيرفض: [[http://localhost:3000 is already used ... or set reuseExistingServer:true]]. ولو حاجة تانية ماسكة البورت ومش بترد صح على الـ url، الأمر بيتشغّل ويقع بـ [[EADDRINUSE]] في سطور [[[WebServer]]]، وبعدها [[Error: Process from config.webServer was not able to start]].`
        },
        {
          cmd: "getByRole و expect(page)",
          title: "أول e2e: تسجيل الدخول من أوله لآخره",
          desc: R`[[page.getByRole("button", { name: "Sign in" })]] بيدوّر على العنصر زي ما اليوزر (وقارئ الشاشة) شايفه: زرار اسمه Sign in. و [[getByLabel("Email")]] الـ input اللي الـ label بتاعه Email. متتكسرش لما class أو id يتغير.

[[await expect(locator).toBeVisible()]] و [[expect(page).toHaveURL()]] بيستنوا لوحدهم لحد ما الشرط يتحقق (لحد ٥ ثواني): مفيش [[sleep]].`,
          example: R`import { test, expect } from "@playwright/test";

test("user can sign in and see the dashboard", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("sara@example.com");
  await page.getByLabel("Password").fill("secret123");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page).toHaveURL(/\/dashboard/);
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  await expect(page.getByRole("list", { name: "Orders" }).getByRole("listitem")).toHaveCount(2);
});`,
          try: R`اكتب اختبار تاني في نفس الملف: باسورد غلط. لازم تظهر رسالة خطأ ([[role="alert"]]) فيها «Wrong email or password»، والعنوان يفضل [[/login]].`,
          flag: "script",
          deep: {
            why: "أكتر سبب بيخلي الناس تكره e2e: اختبارات بتقع من غير ما حاجة تبوظ. إما selector زي [[.btn-primary > span]] اتغير مع أول تعديل تصميم، أو الاختبار دوّر على عنصر قبل ما يظهر. getByRole بيحل الأولى، والـ auto-wait بيحل التانية.",
            how: R`الـ locators بالأولوية اللي Playwright بينصح بيها: [[getByRole]] (الدور والاسم اللي بيوصل لقارئ الشاشة)، و [[getByLabel]] للـ inputs، و [[getByPlaceholder]]، و [[getByText]]، وفي الآخر [[getByTestId]] ([[data-testid]]) لو مفيش حاجة تانية. والـ CSS و XPath آخر حل.

ميزة getByRole إنها بتختبر الـ accessibility ببلاش: لو الزرار [[div]] عليه onClick، مش هيلاقيه كـ button، وده bug حقيقي لليوزر اللي بيستخدم الكيبورد. والاسم بيتطابق كجزء من النص ومش حساس لحالة الحروف، إلا لو قلت [[exact: true]].

الـ locator مش العنصر، ده «طريقة توصل له». كل مرة تستخدمه بيدوّر من جديد، فلو الصفحة اتغيرت بياخد النسخة الجديدة. وتقدر تسلسله: [[getByRole("list", { name: "Orders" }).getByRole("listitem")]] يعني العناصر جوه القايمة دي بس.

الأفعال زي [[click]] و [[fill]] بتستنى لوحدها لحد ما العنصر موجود، وظاهر، وثابت، ومش مغطّي، و enabled. وبعدين تنفّذ.

والـ web-first assertions ([[await expect(locator).toBeVisible()]] و [[toHaveText]] و [[toHaveCount]] و [[expect(page).toHaveURL]]) بتعيد الفحص لحد ما يتحقق أو الوقت يخلص (٥ ثواني افتراضي). ده اللي بيخلي اختبار القايمة يعدّي حتى لو الأوردرات بتيجي من API بعد ثانية.

والـ fixture [[{ page }]] صفحة جديدة في context نضيف لكل اختبار: مفيش cookies من اختبار قبله.`,
            when: "لكل flow حرج: login، و signup، و checkout، و «نسيت الباسورد». اختبار لكل مسار ناجح، وواحد أو اتنين للأخطاء المهمة (باسورد غلط، كارت اترفض).",
            mistakes: R`[[page.waitForTimeout(3000)]] «عشان الصفحة تحمّل»: بطيء دايمًا، وبرضه بيقع لو السيرفر أبطأ من ٣ ثواني. استنى الحاجة نفسها ([[toBeVisible]]). و [[expect(await locator.isVisible()).toBe(true)]]: ده بيفحص مرة واحدة بس ومبيستناش، فبيبقى flaky: استخدم [[await expect(locator).toBeVisible()]]. ونسيان [[await]] قبل expect أو click، فالاختبار يخلص قبل الخطوة (فعّل قاعدة [[no-floating-promises]] في eslint على ملفات e2e). و selectors زي [[#root > div:nth-child(2) button]] من DevTools.`
          },
          teach: R`## الأول: الاختبار بيعمل اللي اليوزر بيعمله بالظبط

يفتح صفحة الـ login، ويكتب الإيميل والباسورد، ويدوس الزرار، وبعدين يتأكد من ٣ حاجات: العنوان بقى dashboard، والعنوان الكبير ظهر، والقايمة فيها أوردرين. جرّبته على ويندوز ضد سيرفر تجربة صغير: صفحة login حقيقية (فورم بـ labels)، و dashboard فيها [[ul]] اسمها Orders بتتملي من API بيرد **بعد ثانية**، عشان نشوف الانتظار التلقائي بجد.

~~~text الناتج (الاختبار ده + اختبار الـ solCode)
Running 2 tests using 2 workers
  ok 2 [chromium] › e2e\login.spec.ts:14:5 › wrong password shows an error (1.9s)
  ok 1 [chromium] › e2e\login.spec.ts:3:5 › user can sign in and see the dashboard (3.2s)
  2 passed (6.1s)
~~~

---

## ١. [[import { test, expect } from "@playwright/test"]]

[[test]] بيعرّف اختبار، و [[expect]] بيتأكد من حاجة. الاتنين من Playwright، **مش** من vitest: [[expect]] بتاع Playwright فيه دوال بتستنى ([[toBeVisible]] و [[toHaveURL]])، واللي في vitest مفيهوش.

## ٢. [[test("...", async ({ page }) => { ... })]]

- أول حاجة اسم الاختبار، وده اللي بيظهر في الناتج.
- [[async]] لأن كل خطوة جوه بتكلّم متصفح وبتاخد وقت، فبنستناها بـ [[await]].
- [[({ page })]]: Playwright بيدّي كل اختبار حاجات جاهزة اسمها fixtures، وانت بتختار منها بالاسم. [[page]] = تاب جديد في متصفح نضيف (context جديد زي incognito)، من غير cookies من أي اختبار قبله.

## ٣. [[await page.goto("/login")]]

افتح الصفحة. [[/login]] من غير الدومين لأن [[baseURL]] في الإعدادات بيكمّله لـ [[http://localhost:3000/login]]. و [[goto]] بيستنى لحد ما الصفحة تحمّل (حدث load).

---

## ٤. الـ locators: إزاي تلاقي العنصر

### [[page.getByLabel("Email")]]

بيدوّر على الـ input اللي مربوط بـ [[<label>]] مكتوب فيه Email. ده نفس الاسم اللي قارئ الشاشة بيقوله. وبعدها:

### [[.fill("sara@example.com")]]

بيمسح اللي في الـ input ويكتب النص. قبل ما يكتب بيستنى لوحده لحد ما العنصر يبقى موجود وظاهر و enabled.

### [[page.getByRole("button", { name: "Sign in" })]]

- [[getByRole]]: دوّر بالـ **role**، يعني نوع العنصر زي ما المتصفح بيوصفه لقارئ الشاشة: [[button]] و [[link]] و [[heading]] و [[list]] و [[listitem]] و [[textbox]] و [[alert]].
- [[{ name: "Sign in" }]]: الاسم اللي بيتقري للعنصر (نص الزرار، أو الـ label، أو [[aria-label]]).

عشان تشوف المتصفح شايف الصفحة إزاي، Playwright عنده [[ariaSnapshot()]]. جرّبته على صفحة فيها زرار، و [[div]] عليه onclick، و input بـ label، و input بـ placeholder بس:

~~~text الناتج
- button "Sign in"
- text: Pay Email
- textbox "Email"
- textbox "Search"
~~~

الـ [[div]] اللي مكتوب فيه Pay ظهر **نص** مش زرار. وده اللي حصل لما دوّرت عليه:

~~~text الناتج
button sign = 1
button sign exact = 0
button Pay = 0
text Pay = 1
label Email = 1
~~~

| السطر | ليه |
|---|---|
| [[button sign = 1]] | الاسم بيتطابق كجزء من النص ومن غير فرق بين capital و small |
| [[exact = 0]] | مع [[exact: true]] لازم الاسم كله بالظبط |
| [[button Pay = 0]] | الـ div مش زرار. وده bug حقيقي: اللي بيستخدم الكيبورد مش هيعرف يوصله |
| [[text Pay = 1]] | [[getByText]] لقاه، بس مبيقولكش إنه مش زرار |

### [[.click()]]

يدوس. قبلها بيستنى إن العنصر ظاهر، وثابت (مش بيتحرك في animation)، ومش مغطّي بحاجة، و enabled.

---

## ٥. الـ assertions اللي بتستنى

### [[await expect(page).toHaveURL(/\/dashboard/)]]

- [[/\/dashboard/]] ده regex (نمط): الشرطتين على الأطراف بيقفلوه، و [[\/]] معناها شرطة عادية جوه النمط. يعني «العنوان فيه [[/dashboard]] في أي حتة».
- [[toHaveURL]] بيفضل يبص على العنوان لحد ما يطابق، لأن بعد الـ click السيرفر بيعمل redirect وده بياخد وقت.

### [[await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible()]]

[[heading]] = عنوان ([[h1]] لحد [[h6]]). و [[toBeVisible]] بيستنى لحد ما يظهر.

### [[...getByRole("list", { name: "Orders" }).getByRole("listitem")).toHaveCount(2)]]

هنا locator جوه locator: الأول هات الـ [[list]] اللي اسمها Orders (عندنا [[<ul aria-label="Orders">]])، وبعدين **جوّاها بس** هات كل [[listitem]] ([[li]]). و [[toHaveCount(2)]] يستنى لحد ما يبقوا ٢.

والأوردرات بتيجي من API بعد ثانية، يعني لحظة ما الصفحة فتحت القايمة كانت فاضية. الاختبار عدّى لأن [[toHaveCount]] فضل يعيد الفحص. لو كنت كتبت [[expect(await list.count()).toBe(2)]] كان هيقرا مرة واحدة ويلاقي صفر (ده الدرس اللي بعد الجاي).

### كام بيستنوا؟

جرّبت عنصر مش موجود:

~~~text الناتج
Error: expect(locator).toBeVisible() failed
Locator: getByRole('link', { name: 'Cart' })
Expected: visible
Timeout: 1000ms
Error: element(s) not found
~~~

(هنا أنا اللي حطيت [[{ timeout: 1000 }]].) الافتراضي للـ [[expect]] خمس ثواني ([[Timeout: 5000ms]])، أما الأفعال زي [[fill]] و [[click]] فمالهاش حد لوحدها، بتستنى لحد ما الاختبار كله يخلص وقته (٣٠ ثانية افتراضي):

~~~text الناتج (input مش موجود)
Error: locator.fill: Test timeout of 30000ms exceeded.
  - waiting for getByLabel('Email')
~~~

---

## ٦. الـ solCode: الباسورد الغلط

نفس الخطوات بباسورد [[wrong]]، والفرق في الآخر:

- [[expect(page.getByRole("alert")).toHaveText("Wrong email or password")]]: عنصر عليه [[role="alert"]] (قارئ الشاشة بيقراه أول ما يظهر) والنص بتاعه بالظبط ده.
- [[expect(page).toHaveURL(/\/login/)]]: لسه على صفحة الـ login.

عدّى: [[ok 2 ... wrong password shows an error (1.9s)]].

---

## الاختبار كله

| السطر | بيعمل إيه | بيستنى إيه |
|---|---|---|
| [[goto("/login")]] | يفتح الصفحة | الصفحة تحمّل |
| [[getByLabel(...).fill(...)]] | يكتب | الـ input يظهر ويبقى enabled |
| [[getByRole("button").click()]] | يدوس | الزرار جاهز ومش مغطّي |
| [[toHaveURL]] | يتأكد من العنوان | لحد ٥ ثواني |
| [[toBeVisible]] | العنوان الكبير ظاهر | لحد ٥ ثواني |
| [[toHaveCount(2)]] | القايمة فيها ٢ | لحد ٥ ثواني |

## الخلاصة

- دوّر زي اليوزر: [[getByRole]] و [[getByLabel]] الأول، و [[getByTestId]] آخر حل، والـ CSS بعده.
- [[getByRole]] بيكشف مشاكل accessibility ببلاش: [[div]] عليه onclick مش زرار.
- كل [[await expect(locator).toX()]] بيستنى (٥ ثواني)، وكل فعل بيستنى العنصر يجهز. مفيش [[sleep]].
- اكتب [[await]] قبل كل خطوة، وإلا الاختبار يخلص قبلها.`,
          lines: [
            "test و expect من Playwright (مش من vitest).",
            "اختبار بياخد page جديدة في context نضيف.",
            "افتح صفحة الـ login (baseURL من الإعدادات).",
            "اكتب في الـ input اللي الـ label بتاعه Email.",
            "والباسورد.",
            "دوس على الزرار اللي اسمه Sign in. بيستنى لحد ما يبقى جاهز.",
            "استنى لحد ما العنوان يبقى dashboard.",
            "والعنوان الرئيسي Dashboard يبقى ظاهر.",
            "والقايمة (اللي بتيجي من API بعد شوية) فيها أوردرين. بيعيد الفحص لحد ما يتحقق.",
            "نهاية الاختبار."
          ],
          sol: R`الاختبار بيعدّي: [[2 passed]].

[[toHaveText]] على الـ alert بتستنى لحد ما الرسالة تظهر بعد رد السيرفر. و [[toHaveURL(/\/login/)]] بيأكد إنه متحوّلش للـ dashboard.

لو استخدمت [[getByText("Wrong")]] هيشتغل برضه، بس [[getByRole("alert")]] أحسن: بيتأكد كمان إن الرسالة معمولة بشكل قارئ الشاشة يقراه أول ما تظهر.

ولو الاختبار وقع بـ [[Timeout 5000ms exceeded... waiting for getByRole('alert')]]، يبقى الصفحة مفيهاش [[role="alert"]]: ده bug accessibility، مش مشكلة في الاختبار.`,
          solCode: R`test("wrong password shows an error", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("sara@example.com");
  await page.getByLabel("Password").fill("wrong");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("alert")).toHaveText("Wrong email or password");
  await expect(page).toHaveURL(/\/login/);
});`
        },
        {
          cmd: "storageState",
          title: "سجّل دخول مرة واحدة لكل الاختبارات",
          desc: R`كل اختبار بيبدأ في context نضيف، يعني من غير login. بدل ما كل اختبار يعدّي على صفحة الـ login، فيه setup project بيسجّل دخول مرة، ويحفظ الـ cookies والـ localStorage في ملف بـ [[storageState({ path })]].

وباقي الـ projects بتبدأ بالملف ده ([[use.storageState]])، فكل اختبار بيفتح وهو مسجّل.

والملف فيه session حقيقية: في [[.gitignore]] دايمًا.`,
          example: R`import { test as setup, expect } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("sign in once", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill(process.env.E2E_EMAIL ?? "sara@example.com");
  await page.getByLabel("Password").fill(process.env.E2E_PASSWORD ?? "secret123");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  await page.context().storageState({ path: authFile });
});`,
          try: R`حط الملف ده في [[e2e/auth.setup.ts]]، وعدّل [[projects]] في الإعدادات: project اسمه setup، و chromium يعتمد عليه ويبدأ بالملف. اكتب [[e2e/dashboard.spec.ts]] بيفتح [[/dashboard]] على طول ويلاقي «Welcome, Sara». وخلّي اختبار الـ login نفسه يبدأ من غير session.`,
          flag: "script",
          deep: {
            why: "لو عندك ٣٠ اختبار وكل واحد بيسجّل دخول، ده ٣٠ مرة فورم و bcrypt وredirect: دقيقة ضايعة، و ٣٠ فرصة يقع حاجة ملهاش دعوة بالاختبار. وكمان لو صفحة الـ login باظت، الـ ٣٠ يقعوا مع بعض ومتعرفش السبب. login مرة واحدة في مكان واحد.",
            how: R`[[storageState]] صورة من حالة المتصفح: كل الـ cookies (بما فيها HttpOnly) والـ localStorage لكل origin، في ملف JSON. لما context جديد يبدأ بيه، كأنه نفس المتصفح بعد الـ login.

الإعداد في [[playwright.config.ts]]:
[[{ name: "setup", testMatch: /.*\.setup\.ts/ }]] project بيشغّل ملفات setup بس.
[[{ name: "chromium", use: { ...devices["Desktop Chrome"], storageState: "playwright/.auth/user.json" }, dependencies: ["setup"] }]] بيستنى setup يخلص، وكل اختباراته بتبدأ بالملف.

[[test as setup]] نفس test بس باسم أوضح. والـ [[expect]] قبل الحفظ مهم: بيستنى لحد ما الـ login خلص فعلًا والـ cookie اتحطت، وإلا ممكن تحفظ حالة فاضية.

الاختبارات اللي محتاجة تبدأ من غير login (صفحة الـ login نفسها، و signup) تقول [[test.use({ storageState: { cookies: [], origins: [] } })]] في أول الملف.

ولو عندك أدوار (admin و user)، اعمل setup لكل واحد وملف لكل واحد، والـ spec يختار بـ [[test.use({ storageState: "playwright/.auth/admin.json" })]].

وبيانات الدخول من متغيرات بيئة ([[E2E_EMAIL]])، وفي CI من secrets. واليوزر ده يتعمل في الـ seed بتاع داتابيز الاختبار.`,
            when: "أول ما يبقى عندك أكتر من اختبارين محتاجين login. ولو الاختبارات بتغيّر بيانات اليوزر (بتمسح حاجات)، ممكن تحتاج يوزر لكل worker، وده في docs Playwright تحت «one account per parallel worker».",
            mistakes: R`ترفع [[playwright/.auth/]] على GitHub، وفيها session صالحة. والـ session في السيرفر بتخلص (أو السيرفر اتعاد تشغيله والـ sessions في الذاكرة)، فكل الاختبارات تتحوّل لـ /login وتقع مع بعض: الـ setup لازم يشتغل كل مرة، مش ملف قديم. و [[--no-deps]] أو [[--project=chromium]] من غير setup بيستخدم ملف قديم لو موجود. واختبار بيعمل logout بالـ session المشتركة، فيبوّظها للاختبارات اللي شغالة معاه بالتوازي.`
          },
          teach: R`## الأول: الفكرة في سطرين

ملف setup بيسجّل دخول مرة واحدة ويحفظ «حالة المتصفح» (الـ cookies والـ localStorage) في ملف JSON. وبعدين كل اختبار تاني بيبدأ بالملف ده، فيفتح وهو مسجّل. جرّبت ده على ويندوز في نفس مشروع التجربة: سيرفر بيعمل session في الذاكرة ويحط cookie اسمها [[sid]] بعد الـ login الصح.

---

## ١. [[import { test as setup, expect } from "@playwright/test"]]

[[as]] بتغيّر الاسم وانت بتستورد: [[test]] هو هو، بس جوه الملف ده اسمه [[setup]]. ملهاش أي تأثير غير إن الكود يتقري «خطوة تجهيز» مش «اختبار».

## ٢. [[const authFile = "playwright/.auth/user.json"]]

مكان الملف، نسبة لفولدر المشروع. الفولدر [[playwright/.auth/]] مش لازم يبقى موجود: Playwright بيعمله وهو بيحفظ. والسطر ده موجود أصلًا في [[.gitignore]] اللي الـ init عمله ([[/playwright/.auth/]])، لأن الملف فيه session شغالة.

## ٣. [[setup("sign in once", async ({ page }) => { ... })]]

نفس شكل أي اختبار: اسم، و [[page]] نضيفة.

## ٤. الإيميل والباسورد: علامة [[??]]

~~~ts
await page.getByLabel("Email").fill(process.env.E2E_EMAIL ?? "sara@example.com");
~~~

[[process.env.E2E_EMAIL]] متغير بيئة إنت بتعرّفه (في CI من الـ secrets). و [[??]] معناها «لو اللي على الشمال [[undefined]] أو [[null]]، خد اللي على اليمين»:

~~~bash
node -e 'console.log(undefined ?? "a", "" ?? "a", "" || "a")'
~~~

~~~text الناتج
a  a
~~~

التلاتة طلعوا: [[a]]، وبعدين نص فاضي (المسافتين)، وبعدين [[a]]. يعني [[??]] سابت النص الفاضي زي ما هو، و [[||]] استبدلته. وفي الحالتين على جهازك من غير المتغير بتاخد [[sara@example.com]]، ولو عرّفته ([[E2E_EMAIL=x@y.z]]) بتاخد قيمته.

## ٥. الدوسة والانتظار

[[click]] على Sign in، وبعدين:

~~~ts
await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
~~~

السطر ده مش زينة. الـ click بيرجع أول ما الدوسة تحصل، قبل ما السيرفر يرد ويحط الـ cookie. لو حفظت على طول ممكن تحفظ متصفح لسه مش مسجّل. استنى حاجة مبتظهرش غير بعد الدخول فعلًا.

## ٦. [[await page.context().storageState({ path: authFile })]]

- [[page.context()]]: الـ context اللي الصفحة دي جواه، يعني «المتصفح» بتاع الاختبار ده بكل الـ cookies بتاعته.
- [[storageState(...)]]: صوّر حالته. ومع [[{ path }]] بيكتبها في الملف.

الملف اللي طلع:

~~~json playwright/.auth/user.json
{
  "cookies": [
    {
      "name": "sid",
      "value": "nc9e....",
      "domain": "localhost",
      "path": "/",
      "expires": -1,
      "httpOnly": true,
      "secure": false,
      "sameSite": "Lax"
    }
  ],
  "origins": []
}
~~~

| الخانة | معناها |
|---|---|
| [[cookies]] | كل الـ cookies، حتى [[httpOnly]] اللي الـ JavaScript في الصفحة مش شايفها |
| [[expires: -1]] | session cookie (من غير تاريخ انتهاء) |
| [[origins]] | الـ localStorage لكل موقع. فاضي هنا لأن التطبيق ده مبيستخدموش |

---

## ٧. الإعدادات (أول جزء في الـ solCode)

~~~ts
{ name: "setup", testMatch: /.*\.setup\.ts/ },
~~~

project اسمه setup، بيشغّل بس الملفات اللي اسمها ماشي مع الـ regex: [[.*]] = أي حروف، و [[\.]] = نقطة بجد (من غير [[\]] النقطة معناها «أي حرف»)، فالنمط = أي ملف آخره [[.setup.ts]].

~~~ts
use: { ...devices["Desktop Chrome"], storageState: "playwright/.auth/user.json" },
dependencies: ["setup"],
~~~

- [[storageState]] في [[use]]: كل context في الـ project ده يبدأ من الملف.
- [[dependencies: ["setup"]]]: متبدأش غير لما project الـ setup يخلص وينجح.

والنتيجة:

~~~text الناتج
Running 4 tests using 3 workers

  ok 1 [setup] › e2e\auth.setup.ts:5:6 › sign in once (1.7s)
  ok 4 [chromium] › e2e\dashboard.spec.ts:3:5 › dashboard opens already signed in (343ms)
  ok 2 [chromium] › e2e\login.spec.ts:16:5 › wrong password shows an error (1.1s)
  ok 3 [chromium] › e2e\login.spec.ts:5:5 › user can sign in and see the dashboard (2.4s)

  4 passed (8.7s)
~~~

[[[setup]]] اشتغل الأول، واختبار الـ dashboard خد ٣٤٣ ملي ثانية بس لأنه فتح [[/dashboard]] على طول من غير فورم.

## ٨. [[test.use({ storageState: { cookies: [], origins: [] } })]]

في ملف اختبارات الـ login بس: [[test.use]] بيغيّر الإعدادات للملف ده، وهنا بيدّيله حالة فاضية بنفس شكل الملف. من غيره، اختبار الـ login هيبدأ وهو مسجّل. شلته وشغّلت، وصفحة [[/login]] في التطبيق ده بتحوّل المسجّل للـ dashboard، فالـ label مش موجود:

~~~text الناتج
  x  2 [chromium] › e2e\login.spec.ts:3:5 › user can sign in and see the dashboard (30.0s)
    Test timeout of 30000ms exceeded.
    Error: locator.fill: Test timeout of 30000ms exceeded.
    Call log:
      - waiting for getByLabel('Email')
~~~

---

## ٩. لما الملف يبقى ناقص أو قديم

### الملف مش موجود

مسحت [[playwright/]] وشغّلت من غير الـ setup ([[--no-deps]] = متشغّلش الـ dependencies):

~~~bash
npx playwright test e2e/dashboard.spec.ts --project=chromium --no-deps
~~~

~~~text الناتج
Error: Error reading storage state from playwright/.auth/user.json:
ENOENT: no such file or directory, open '...\lab\playwright\.auth\user.json'
~~~

[[ENOENT]] = Error NO ENTry، يعني الملف مش موجود.

### الملف موجود بس الـ session ماتت

شغّلت مرة كاملة (اتعمل ملف)، والسيرفر اتقفل بعدها فالـ sessions اللي في ذاكرته راحت. بعدين شغّلت تاني بـ [[--no-deps]]، يعني بالملف القديم:

~~~text الناتج
Error: expect(locator).toBeVisible() failed
Locator: getByText('Welcome, Sara')
Expected: visible
Timeout: 5000ms
Error: element(s) not found
~~~

الـ cookie اتبعتت، بس السيرفر مش عارفها، فحوّل للـ login. عشان كده الـ setup لازم يشتغل كل مرة، وده اللي [[dependencies]] بيضمنه.

---

## الأجزاء كلها

| الجزء | فين | بيعمل إيه |
|---|---|---|
| [[auth.setup.ts]] | [[e2e/]] | يسجّل دخول ويحفظ الحالة |
| [[{ name: "setup", testMatch }]] | الإعدادات | يشغّل ملفات setup بس |
| [[storageState]] + [[dependencies]] | الإعدادات | باقي الاختبارات تستنى الـ setup وتبدأ بالملف |
| [[test.use({ storageState: { cookies: [], origins: [] } })]] | ملفات login و signup | تبدأ من غير session |
| [[/playwright/.auth/]] | [[.gitignore]] | الملف ميترفعش |

## الخلاصة

- login واحد للكل: أسرع، ولو الـ login باظ يقع في مكان واحد واضح.
- استنى علامة إن الدخول خلص قبل [[storageState({ path })]].
- [[dependencies: ["setup"]]] بيخلي الملف يتعمل جديد كل run، و [[--no-deps]] بيستخدم القديم (ممكن يكون ميت).
- الملف فيه session حقيقية: [[.gitignore]].`,
          lines: [
            "test باسم setup، و expect.",
            "مكان حفظ الـ session (في .gitignore).",
            "خطوة setup بتتشغّل قبل باقي الاختبارات.",
            "صفحة الـ login.",
            "الإيميل من متغير بيئة، وقيمة افتراضية لجهازك.",
            "والباسورد نفس الفكرة.",
            "دوس دخول.",
            "استنى لحد ما الدخول خلص فعلًا والـ cookie اتحطت.",
            "احفظ الـ cookies والـ localStorage في الملف.",
            "نهاية الـ setup."
          ],
          sol: R`[[npx playwright test]] بيطبع [[[setup] › e2e/auth.setup.ts › sign in once]] الأول، وبعدين اختبارات [[[chromium]]]. و [[dashboard opens already signed in]] بياخد أقل من ثانية لأنه مبيعدّيش على الـ login.

ولو شلت [[dependencies: ["setup"]]] والملف مش موجود: [[Error reading storage state from playwright/.auth/user.json]] و [[ENOENT: no such file or directory]]، لأن محدش عمل الملف. ولو الملف موجود من مرة قديمة، ممكن يعدّي النهارده ويقع بكرة لما الـ session تخلص.

ولو شلت [[test.use]] من ملف الـ login، اختبارات الـ login هتبدأ وهي مسجّلة. في تطبيقات كتير صفحة [[/login]] بتحوّل اليوزر المسجّل للـ dashboard على طول، فالـ label مش هيتلاقي والاختبار يقع بـ timeout.`,
          solCode: R`// playwright.config.ts: جوه defineConfig
projects: [
  { name: "setup", testMatch: /.*\.setup\.ts/ },
  {
    name: "chromium",
    use: { ...devices["Desktop Chrome"], storageState: "playwright/.auth/user.json" },
    dependencies: ["setup"],
  },
],

// e2e/dashboard.spec.ts
import { test, expect } from "@playwright/test";

test("dashboard opens already signed in", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page.getByText("Welcome, Sara")).toBeVisible();
});

// e2e/login.spec.ts: أول سطر بعد الـ import
test.use({ storageState: { cookies: [], origins: [] } });`
        },
        {
          cmd: "trace viewer و flaky",
          title: "الاختبار وقع في CI ليه، وإزاي تصلّح flaky",
          desc: R`الـ trace ملف zip فيه كل حاجة حصلت في الاختبار: كل خطوة بلقطة للـ DOM قبلها وبعدها، والـ network، والـ console. [[show-trace]] بيفتحه وتمشي فيه خطوة خطوة.

flaky يعني بيعدّي مرة ويقع مرة من غير تغيير. [[--repeat-each]] بيكشفه، والسبب غالبًا حاجة مش مستنية صح.`,
          example: R`npx playwright test --trace on
npx playwright show-trace test-results/login-user-can-sign-in-and-see-the-dashboard-chromium/trace.zip
npx playwright test e2e/login.spec.ts --repeat-each=20 --workers=4
npx playwright test --retries=2 --fail-on-flaky-tests
npx playwright test --last-failed
npx playwright test e2e/login.spec.ts --debug`,
          try: R`اكتب اختبار بيقرا عدد الأوردرات مرة واحدة: [[const n = await page.getByRole("listitem").count(); expect(n).toBe(2);]] على صفحة بتجيب الأوردرات بعد ثانية. شغّله بـ [[--trace on]]، وافتح الـ trace وشوف القايمة كانت فين. وبعدين صلّحه.`,
          deep: {
            why: "الاختبار بيعدّي على جهازك ويقع في CI، ومش قدامك غير «Timeout 5000ms exceeded». من غير trace بتخمّن. ومع trace بتشوف الصفحة كانت شكلها إيه لحظة الفشل: modal فوق الزرار، أو API رجع 500، أو لسه بيحمّل.",
            how: R`[[trace: "on-first-retry"]] في الإعدادات بيسجّل trace بس لما الاختبار يقع ويتعاد، فالتكلفة قليلة. [[--trace on]] من الترمنال بيسجّل لكل اختبار. الملف بيتحط في [[test-results/<اسم الاختبار>/trace.zip]]، وفي التقرير HTML فيه زرار يفتحه. من CI: نزّل artifact التقرير وافتحه، أو ارفع الملف على [[trace.playwright.dev]] (بيتفتح في المتصفح عندك من غير ما يترفع لسيرفر).

جوه الـ trace: timeline فوق، والخطوات على الشمال، ولكل خطوة لقطة Before و After تقدر تعمل فيها inspect، وتابات Network و Console و Source.

أسباب الـ flaky المشهورة وحلها:
قراية مرة واحدة من غير انتظار ([[count()]] و [[isVisible()]] و [[textContent()]] جوه [[expect]] عادي): استخدم web-first assertion ([[toHaveCount]] و [[toBeVisible]] و [[toHaveText]]).
[[waitForTimeout]]: استنى الحاجة نفسها، أو الرد نفسه بـ [[page.waitForResponse]].
اختبارات بتتشارك داتا (اتنين بيعدّلوا نفس الأوردر بالتوازي): كل اختبار يعمل الداتا بتاعته.
animations و وقت: [[page.clock]] أو [[reducedMotion]].

[[--repeat-each=20]] بيشغّل كل اختبار ٢٠ مرة: لو وقع ولو مرة يبقى flaky. و [[--fail-on-flaky-tests]] بيخلي الـ run يقع لو اختبار عدّى بعد retry، بدل ما يستخبى. و [[--last-failed]] بيعيد اللي وقع بس.`,
            when: "أي فشل في CI: افتح الـ trace قبل ما تعمل re-run. وقبل ما تعمل merge لاختبار e2e جديد، شغّله بـ repeat-each عشان تتأكد إنه ثابت.",
            mistakes: R`تزوّد [[retries]] لـ ٥ وتقول اتحلت: الاختبار لسه flaky، وممكن يكون الـ bug في التطبيق نفسه (race condition حقيقي). وتزوّد الـ timeout لـ ٦٠ ثانية بدل ما تعرف مستني إيه. و [[trace: "on"]] دايمًا في CI فالـ artifacts تبقى جيجات. وتعمل re-run لحد ما يخضر ومتبصّش على الـ trace. وفي الانترفيو: «إزاي بتتعامل مع flaky test؟» اعزله، واكشفه بـ repeat، واقرا الـ trace، وصلّح السبب، ومتسيبش retries تخبّيه.`
          },
          teach: R`## الأول: هنكسر اختبار بإيدنا ونمسكه

كل الأوامر دي بتلف حوالين سؤالين: الاختبار وقع **ليه**؟ وهل هو فعلًا مكسور ولا flaky (بيعدّي مرة ويقع مرة)؟ عشان نشوفهم بجد، كتبت على ويندوز الاختبار الغلط اللي في الـ try: dashboard الأوردرات بتاعتها بتيجي من API بعد ثانية، والاختبار بيعدّهم مرة واحدة:

~~~ts e2e/orders.spec.ts
test("dashboard lists two orders", async ({ page }) => {
  await page.goto("/dashboard");
  const n = await page.getByRole("listitem").count();
  expect(n).toBe(2);
});
~~~

---

## ١. [[npx playwright test --trace on]]

[[--trace]] بيغلب اللي في الإعدادات. القيم: [[on]] (سجّل لكل اختبار)، و [[off]]، و [[on-first-retry]] (الافتراضي في الإعدادات بتاعتنا)، و [[on-all-retries]] وغيرهم. وبيطبع:

~~~text الناتج (مختصر)
  x  4 [chromium] › e2e\orders.spec.ts:3:5 › dashboard lists two orders (463ms)

  1) [chromium] › e2e\orders.spec.ts:3:5 › dashboard lists two orders ──────

    Error: expect(received).toBe(expected) // Object.is equality

    Expected: 2
    Received: 0

    Error Context: test-results\orders-dashboard-lists-two-orders-chromium\error-context.md

    attachment #2: trace (application/zip) ─────────
    test-results\orders-dashboard-lists-two-orders-chromium\trace.zip
    Usage:

        npx playwright show-trace test-results\orders-dashboard-lists-two-orders-chromium\trace.zip
~~~

- [[Received: 0]]: القايمة كانت فاضية. [[count()]] قرا مرة واحدة بعد ٤٦٣ ملي ثانية، والأوردرات بتيجي بعد ثانية.
- اسم الفولدر [[test-results\<الملف>-<اسم الاختبار>-<الـ project>]]، والمسافات بقت شرط. ولو الاختبار اتعاد، الإعادة ليها فولدر لوحدها آخره [[-retry1]].
- Playwright كتبلك الأمر اللي يفتح الـ trace جاهز.

### الـ trace فيه إيه

ملف zip عادي. فكّيت قايمته:

~~~text unzip -l trace.zip (مختصر)
  Length  Name
     219  src/0c75....ts
    9408  test.trace
    4113  1-trace.trace
    3241  1-trace.network
     461  resources/75ba....html
~~~

[[test.trace]] و [[1-trace.trace]] = الخطوات واللقطات، و [[.network]] = الطلبات، و [[src/]] = كود الاختبار نفسه عشان يتعرض جنب كل خطوة، و [[resources/]] = الـ HTML اللي اتصوّر.

### [[error-context.md]]: لقطة سريعة من غير ما تفتح حاجة

جنب الـ trace فيه ملف نصي فيه الخطأ وشكل الصفحة لحظة الفشل:

~~~text error-context.md (جزء)
# Page snapshot

- main [ref=e2]:
  - heading "Dashboard" [level=1] [ref=e3]
  - paragraph [ref=e4]: Welcome, Sara
  - list "Orders"
~~~

[[list "Orders"]] من غير ولا [[listitem]] تحتها. ده السبب كله في سطر.

---

## ٢. [[npx playwright show-trace <المسار>/trace.zip]]

بيفتح الـ Trace Viewer في شباك: timeline فوق، والخطوات على الشمال، ولكل خطوة لقطة Before و After تعمل فيها inspect، وتابات Network و Console و Source. (الشباك محتاج حد يدوس، فالوصف ده من الـ docs. و [[--help]] بيقول إن [[--port]] أو [[--host]] بيخليه يفتح في تاب متصفح بدل شباك.) ولو مش عايز تسطّب حاجة، [[trace.playwright.dev]] بيفتح نفس الملف في المتصفح عندك.

---

## ٣. التصليح

~~~ts
await expect(page.getByRole("listitem")).toHaveCount(2);
~~~

[[toHaveCount]] بيعيد العدّ لحد ما يلاقي ٢ أو الـ ٥ ثواني يخلصوا.

## ٤. [[--repeat-each=20 --workers=4]]: اتأكد إنه ثابت

~~~bash
npx playwright test e2e/orders.spec.ts --repeat-each=20 --workers=4
~~~

- [[e2e/orders.spec.ts]]: الملف ده بس.
- [[--repeat-each=20]]: كل اختبار ٢٠ مرة.
- [[--workers=4]]: ٤ في نفس الوقت، عشان الضغط يكشف أي race.

~~~text الناتج
Running 21 tests using 4 workers
...
  21 passed (21.4s)
~~~

ليه ٢١ مش ٢٠؟ الـ ٢٠ دول الاختبار، والواحد الزيادة هو الـ setup project (من درس [[storageState]]) اللي اشتغل مرة قبلهم. لو ولا مرة وقعت من العشرين، الاختبار ثابت. لو مرة واحدة بس وقعت، يبقى flaky.

---

## ٥. [[--retries=2 --fail-on-flaky-tests]]

عشان أشوف ده، كتبت اختبار flaky بالعافية: بيقع في أول محاولة وبيعدّي في الإعادة ([[test.info().retry]] رقم المحاولة، بيبدأ من ٠):

~~~ts
expect(test.info().retry).toBeGreaterThan(0);
~~~

### [[--retries=2]] لوحده

~~~text الناتج
  x  2 [chromium] › e2e\flaky.spec.ts:2:5 › fails on first try only (7ms)
  ok 3 [chromium] › e2e\flaky.spec.ts:2:5 › fails on first try only (retry #1) (5ms)

  1 flaky
    [chromium] › e2e\flaky.spec.ts:2:5 › fails on first try only
  1 passed (4.5s)
~~~

و [[exit code]] كان [[0]]. يعني الـ CI هيبقى أخضر، والمشكلة استخبّت ورا كلمة [[1 flaky]] محدش بيقراها.

### ومع [[--fail-on-flaky-tests]]

نفس الناتج بالظبط، بس الـ exit code بقى [[1]]: الـ run وقع. كده الـ retries بتديك trace للفشل (على [[on-first-retry]] اتعمل [[test-results\flaky-...-retry1\trace.zip]])، من غير ما تخبّي إن فيه مشكلة.

---

## ٦. [[--last-failed]]

Playwright بيفتكر اللي وقع في آخر run (في [[test-results/.last-run.json]]: فيه [[status]] وقايمة [[failedTests]])، والأمر ده بيعيده هو بس:

~~~text الناتج
Running 2 tests using 1 worker
  ok 1 [setup] › e2e\auth.setup.ts:5:6 › sign in once (1.7s)
  x  2 [chromium] › e2e\orders.spec.ts:3:5 › dashboard lists two orders (165ms)
~~~

اللي وقع بس من الأربعة، والـ setup معاه لأنه dependency.

## ٧. [[--debug]]

بيفتح المتصفح ظاهر ومعاه Playwright Inspector، ويقف قبل كل خطوة لحد ما تدوس Step. (شباك تفاعلي، فده من الـ docs.) بتستخدمه على ملف واحد زي المثال.

---

## الأوامر كلها

| الأمر | بيرد على |
|---|---|
| [[--trace on]] | «حصل إيه بالظبط؟» (سجّل كل حاجة) |
| [[show-trace .../trace.zip]] | «وريني الصفحة لحظة الفشل» |
| [[--repeat-each=20 --workers=4]] | «هو ثابت ولا flaky؟» |
| [[--retries=2 --fail-on-flaky-tests]] | «اعيد عشان أجيب trace، بس متعديش الـ flaky» |
| [[--last-failed]] | «شغّل اللي وقع بس» |
| [[--debug]] | «امشي معايا خطوة خطوة» |

## الخلاصة

- اقرا [[error-context.md]] أو افتح الـ trace **قبل** ما تعيد التشغيل.
- أشهر سبب للـ flaky: قراية مرة واحدة ([[count()]] و [[isVisible()]]) بدل assertion بتستنى ([[toHaveCount]] و [[toBeVisible]]).
- [[retries]] لوحدها بتخلي الـ flaky يعدّي بـ exit code صفر، فزوّد [[--fail-on-flaky-tests]].
- اختبار جديد؟ [[--repeat-each=20]] قبل الـ merge.`,
          lines: [
            "شغّل وسجّل trace لكل اختبار.",
            "افتح الـ trace وامشي فيه خطوة خطوة.",
            "شغّل كل اختبار في الملف ٢٠ مرة بـ ٤ workers عشان تكشف الـ flaky.",
            "اسمح بإعادة، بس اعتبر أي اختبار احتاج إعادة فشل.",
            "أعد الاختبارات اللي وقعت في آخر مرة بس.",
            "شغّل ووقّف عند كل خطوة في Playwright Inspector."
          ],
          sol: R`الاختبار بيقع: [[Expected: 2]] و [[Received: 0]]. في الـ trace هتلاقي لقطة الخطوة دي والقايمة لسه فاضية: [[count()]] قرا مرة واحدة أول ما الصفحة فتحت، قبل ما الأوردرات تيجي.

التصليح: [[await expect(page.getByRole("listitem")).toHaveCount(2);]]. ده بيعيد الفحص لحد ما يلاقي ٢ (أو يخلص الوقت). جرّبه بـ [[--repeat-each=20]]: المفروض الـ ٢٠ يعدّوا.

الغلط الشائع إنك تصلّحه بـ [[await page.waitForTimeout(2000)]]: هيعدّي على جهازك، ويقع في CI يوم ما الـ API ياخد ثانيتين ونص.`
        },
        {
          cmd: "Playwright في GitHub Actions",
          title: "e2e في CI مع قاعدة بيانات والسيرفر",
          desc: R`job لوحده للـ e2e: Postgres كـ service container، وبعدين install و migrate و seed و build، و Playwright يشغّل السيرفر بـ [[webServer]] ويختبر عليه.

والتقرير (فيه الـ traces) بيترفع artifact حتى لو الاختبارات وقعت، عشان تنزّله وتفتحه.`,
          example: R`name: e2e
on:
  pull_request:
  push:
    branches: [main]
jobs:
  e2e:
    runs-on: ubuntu-latest
    timeout-minutes: 20
    services:
      postgres:
        image: postgres:18
        env:
          POSTGRES_USER: app
          POSTGRES_PASSWORD: app
          POSTGRES_DB: app_test
        ports:
          - 5432:5432
        options: >-
          --health-cmd "pg_isready -U app"
          --health-interval 5s
          --health-timeout 5s
          --health-retries 10
    env:
      DATABASE_URL: postgresql://app:app@localhost:5432/app_test
      E2E_EMAIL: sara@example.com
      E2E_PASSWORD: $__{{ secrets.E2E_PASSWORD }}
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npx prisma migrate deploy
      - run: npx prisma db seed
      - run: npm run build
      - run: npx playwright test
      - uses: actions/upload-artifact@v7
        if: $__{{ !cancelled() }}
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 14`,
          try: R`حط الـ workflow في repo فيه تطبيق و Prisma و Playwright، واعمل PR فيه اختبار بيقع عمدًا. نزّل artifact التقرير من صفحة الـ run، وافتحه بـ [[npx playwright show-report]] وادخل على الـ trace.`,
          flag: "script",
          deep: {
            why: "e2e على جهازك بس معناه إن محدش بيشغّله. في CI على كل PR، والـ merge ممنوع لو وقع، فمفيش PR يكسر الـ login من غير ما حد ياخد باله. بس محتاج بيئة كاملة: داتابيز فاضية، و migrations، و يوزر اختبار، وتطبيق مبني.",
            how: R`[[services.postgres]] بيشغّل container جنب الـ job. [[ports: 5432:5432]] بيخليه على [[localhost:5432]] من الـ steps (لأن الـ job شغال على الماكينة نفسها مش جوه container). و [[options]] بيضيف health check، و GitHub مبيبدأش الـ steps غير لما الداتابيز تبقى healthy، وإلا أول migrate بيقع بـ «connection refused».

[[env]] على مستوى الـ job بيوصل لكل step، ومنها [[webServer]] اللي Playwright بيشغّله، فالتطبيق بيقرا [[DATABASE_URL]]. والباسورد من [[secrets]] (حتى لو يوزر اختبار، عادة كويسة).

الترتيب: [[npm ci]]، وبعدين المتصفح بس (Chromium) مع مكتبات لينكس، و [[migrate deploy]] يبني الجداول، و [[db seed]] يعمل يوزر الاختبار، و build، وبعدين [[playwright test]]. والـ [[webServer]] في الإعدادات بيشغّل [[npm run start]] لأن [[CI]] متعرّف لوحده في GitHub Actions.

[[if: $__{{ !cancelled() }}]] بيخلي الرفع يحصل حتى لو الاختبارات وقعت (من غيره، أي step بيقع بيوقف اللي بعده). و [[retention-days]] عشان التقارير متاكلش مساحة الـ repo.

للسرعة: كاش المتصفحات بـ [[actions/cache]] على [[~/.cache/ms-playwright]] بمفتاح نسخة Playwright، أو container الرسمي [[mcr.microsoft.com/playwright]] اللي فيه المتصفحات. ولو الاختبارات كتير، [[--shard=1/4]] على ٤ jobs بـ matrix، و [[merge-reports]] يجمعهم.

والتفاصيل العامة (concurrency، و permissions، و secrets، و services) في «تاب GitHub Actions».`,
            when: "على كل PR لـ main، كـ required check. ولو بطيء، ممكن تشغّل smoke (login و checkout) على كل PR، والباقي كل ليلة.",
            mistakes: R`من غير health check، أول migrate بيقع ساعات وساعات لأ. و [[localhost]] في [[DATABASE_URL]] لو الـ job نفسه شغال في [[container:]]: ساعتها اسم الـ service ([[postgres]]) هو العنوان مش localhost. ونسيان seed، فالـ setup مبيعرفش يسجّل دخول وكل حاجة تقع بـ timeout على الـ Dashboard. ورفع التقرير من غير [[!cancelled()]]، فلما يقع (وقت ما محتاجه) مبيترفعش. وتشغيل [[npx playwright install --with-deps]] للتلات متصفحات وانت بتختبر Chromium بس.`
          },
          teach: R`## الأول: الملف ده بيبني بيئة كاملة من الصفر في كل PR

ماكينة أوبونتو فاضية، وجنبها Postgres فاضي، والـ workflow بيسطّب، ويبني الجداول، ويعمل يوزر اختبار، ويبني التطبيق، ويشغّل Playwright. الملف بيتحط في [[.github/workflows/e2e.yml]].

ماكينة GitHub نفسها متجرّبتش هنا (محتاجة repo و push)، فالكلام عنها من docs GitHub Actions. اللي اتجرّب على الجهاز ده: Postgres 18 بنفس الـ env والـ health check في Docker، و Playwright بـ [[CI=1]] عشان نشوف شكل الناتج والتقرير اللي هيترفعوا، والتأكد إن [[actions/checkout]] و [[setup-node]] و [[upload-artifact]] عندهم tag اسمه [[v7]] فعلًا ([[git ls-remote --tags]]). أوامر Prisma ([[migrate deploy]] و [[db seed]]) شرحها في تاب Prisma.

---

## ١. الراس: الاسم وإمتى يشتغل

~~~yaml
name: e2e
on:
  pull_request:
  push:
    branches: [main]
~~~

- [[name]]: الاسم اللي بيظهر في تاب Actions وفي الـ checks تحت الـ PR.
- [[on]]: الأحداث اللي بتشغّله. [[pull_request:]] فاضية = أي PR. و [[push]] على [[main]] بس، عشان بعد الـ merge يتأكد تاني.

## ٢. الـ job

~~~yaml
jobs:
  e2e:
    runs-on: ubuntu-latest
    timeout-minutes: 20
~~~

- [[jobs]] فيها مهمة واحدة اسمها [[e2e]] (الاسم ده إنت بتختاره).
- [[runs-on: ubuntu-latest]]: ماكينة أوبونتو جديدة لكل run.
- [[timeout-minutes: 20]]: لو حاجة علّقت (سيرفر مقامش)، الـ job يتقفل بعد ٢٠ دقيقة. الافتراضي ٣٦٠ دقيقة (٦ ساعات) من دقايقك.

---

## ٣. [[services]]: Postgres جنب الـ job

~~~yaml
    services:
      postgres:
        image: postgres:18
        env:
          POSTGRES_USER: app
          POSTGRES_PASSWORD: app
          POSTGRES_DB: app_test
        ports:
          - 5432:5432
        options: >-
          --health-cmd "pg_isready -U app"
          --health-interval 5s
          --health-timeout 5s
          --health-retries 10
~~~

| السطر | معناه |
|---|---|
| [[postgres:]] | اسم الـ service (لو الـ job نفسه جوه container، ده بيبقى الـ hostname) |
| [[image: postgres:18]] | الصورة الرسمية، نسخة 18 |
| [[POSTGRES_USER]] و [[_PASSWORD]] و [[_DB]] | الصورة بتقراهم أول مرة تقوم: تعمل يوزر [[app]] وداتابيز [[app_test]] فاضية |
| [[5432:5432]] | بورت الماكينة : بورت الـ container، فالـ steps توصله على [[localhost:5432]] |
| [[options: >-]] | flags زيادة لـ [[docker run]]. و [[>-]] في YAML معناها «السطور اللي تحت دي سطر واحد» |

### الـ health check

- [[--health-cmd "pg_isready -U app"]]: الأمر اللي بيقول الداتابيز جاهزة ولا لأ. [[pg_isready]] أداة صغيرة مع Postgres بترجع 0 لو بيقبل اتصالات.
- [[--health-interval 5s]]: جرّبه كل ٥ ثواني. [[--health-timeout 5s]]: لو مردّش في ٥ ثواني اعتبرها فشل. [[--health-retries 10]]: بعد ١٠ فشل ورا بعض اعتبر الـ container واقع.

و GitHub مش بيبدأ الـ steps غير لما الـ service تبقى [[healthy]]. شغّلت نفس الحاجة بـ [[docker run]] بنفس الـ env والـ options (على بورت تاني) وبصيت على الحالة كل ثانيتين:

~~~text الناتج
t=2s starting
t=4s starting
t=6s starting
t=8s healthy
~~~

~~~text docker exec ... pg_isready -U app
/var/run/postgresql:5432 - accepting connections
~~~

~~~text docker exec ... psql -U app -d app_test -c "select current_database(), current_user;"
 current_database | current_user
------------------+--------------
 app_test         | app
~~~

يعني حوالي ٦ ثواني الداتابيز مكانتش جاهزة. من غير الـ health check، أول step بيكلّمها في الوقت ده كان هيقع بـ «connection refused».

---

## ٤. [[env]] على مستوى الـ job

~~~yaml
    env:
      DATABASE_URL: postgresql://app:app@localhost:5432/app_test
      E2E_EMAIL: sara@example.com
      E2E_PASSWORD: $__{{ secrets.E2E_PASSWORD }}
~~~

- كل step بيشوفهم، ومنهم السيرفر اللي Playwright بيشغّله بـ [[webServer]] (بيورث الـ env).
- [[DATABASE_URL]] متفكّك: [[postgresql://]] النوع، و [[app:app]] يوزر:باسورد، و [[@localhost:5432]] العنوان والبورت، و [[/app_test]] الداتابيز. نفس القيم اللي في الـ service.
- [[$__{{ secrets.E2E_PASSWORD }}]]: الـ [[$__{{ }}]] صيغة expressions في GitHub Actions، و [[secrets.X]] قيمة متخزّنة في Settings ثم Secrets، وبتظهر [[***]] في اللوج.

---

## ٥. الـ steps بالترتيب

~~~yaml
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 24
          cache: npm
~~~

- [[uses]] = شغّل action جاهزة. [[checkout]] بتجيب كود الـ repo، و [[setup-node]] بتسطّب Node 24. و [[@v7]] رقم النسخة الكبيرة.
- [[cache: npm]]: كاش لفولدر npm بمفتاح من [[package-lock.json]]، فالـ install يبقى أسرع المرة الجاية.

~~~yaml
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npx prisma migrate deploy
      - run: npx prisma db seed
      - run: npm run build
      - run: npx playwright test
~~~

| الخطوة | ليه في المكان ده |
|---|---|
| [[npm ci]] | يسطّب بالظبط اللي في الـ lock، ويقع لو الـ lock مش ماشي مع [[package.json]] |
| [[playwright install --with-deps chromium]] | Chromium بس ومكتبات لينكس بتاعته (درس [[npm init playwright]]) |
| [[prisma migrate deploy]] | يعمل الجداول في [[app_test]] من الـ migrations |
| [[prisma db seed]] | يعمل يوزر الاختبار ([[sara@example.com]]) اللي الـ setup هيسجّل بيه |
| [[npm run build]] | لأن الـ webServer في CI بيشغّل [[npm run start]] على build |
| [[npx playwright test]] | [[CI]] متعرّف لوحده في GitHub، فـ [[retries: 2]] و [[workers: 1]] والـ reporters بتوع CI بيشتغلوا |

### شكل الناتج بتاع آخر خطوة

شغّلت Playwright بـ [[CI=1]] وفيه اختبار بيقع عمدًا. الـ reporter [[github]] بيطبع سطور بتبدأ بـ [[::error]]، و GitHub بيحوّلها annotation على السطر في الـ PR:

~~~text الناتج (مختصر)
Running 6 tests using 1 worker
·××F
::error file=e2e\broken.spec.ts,title=[chromium] › e2e\broken.spec.ts:2:5 › home has a cart link,line=4,col=58::  1) ...
  1 failed
    [chromium] › e2e\broken.spec.ts:2:5 › home has a cart link
  5 passed (16.7s)
::notice title=🎭 Playwright Run Summary::  1 failed ...
~~~

[[·]] = اختبار عدّى، و [[×]] = محاولة وقعت وهتتعاد، و [[F]] = وقع نهائي. يعني [[××F]] = وقع ٣ مرات (الأصلي و [[retries: 2]]). والـ exit code [[1]]، فالخطوة بتقع والـ job كله أحمر.

---

## ٦. رفع التقرير

~~~yaml
      - uses: actions/upload-artifact@v7
        if: $__{{ !cancelled() }}
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 14
~~~

- عادةً أول step يقع، اللي بعده مبيتشغّلش. [[if: $__{{ !cancelled() }}]] = «اشتغل حتى لو اللي قبلك وقع، طول ما الـ run متلغاش».
- [[path: playwright-report/]]: الفولدر اللي الـ reporter [[html]] عمله. بعد الـ run الفاشل عندي كان فيه:

~~~text الناتج
playwright-report:
data
index.html
trace
~~~

و [[data/]] فيه الـ [[trace.zip]] بتاع الإعادة (من [[trace: "on-first-retry"]]) والـ [[error-context]].
- [[retention-days: 14]]: يتمسح بعد أسبوعين.

ولما تنزّله من صفحة الـ run (تحت Artifacts) بيجيلك zip. [[npx playwright show-report]] بيقبل الفولدر أو الـ zip نفسه، وبيطبع [[Serving HTML report at http://localhost:9323. Press Ctrl+C to quit.]]

---

## الخلاصة

- [[services]] + health check = داتابيز جاهزة قبل أول step. من غير الـ health check أول [[migrate]] بيقع ساعات.
- [[ports: 5432:5432]] بيخلي [[localhost]] يوصل، لأن الـ steps شغالة على الماكينة نفسها.
- الترتيب: [[ci]] ثم المتصفح ثم [[migrate]] ثم [[seed]] ثم [[build]] ثم [[test]]، و [[CI]] متعرّف لوحده.
- [[if: $__{{ !cancelled() }}]] على الرفع، وإلا التقرير مش هيترفع في الوقت اللي محتاجه فيه.`,
          lines: [
            "اسم الـ workflow.",
            "بيشتغل إمتى:",
            "أي PR.",
            "وأي push...",
            "...على main.",
            "المهام.",
            "مهمة e2e.",
            "ماكينة أوبونتو.",
            "لو علّقت، تتقفل بعد ٢٠ دقيقة بدل ٦ ساعات.",
            "containers جنب الـ job:",
            "Postgres.",
            "النسخة.",
            "إعدادات أول تشغيل:",
            "اليوزر...",
            "...والباسورد...",
            "...والداتابيز اللي هتتعمل فاضية.",
            "افتح البورت...",
            "...على localhost:5432 للـ steps.",
            "خيارات docker:",
            "الصحة: pg_isready لازم ينجح...",
            "...كل ٥ ثواني...",
            "...ويستنى ٥ ثواني للرد...",
            "...ولحد ١٠ محاولات قبل ما يعتبرها واقعة.",
            "متغيرات لكل الـ steps (والسيرفر اللي Playwright بيشغّله):",
            "عنوان داتابيز الاختبار.",
            "يوزر الاختبار اللي الـ seed بيعمله.",
            "والباسورد من الـ secrets.",
            "الخطوات:",
            "هات الكود.",
            "سطّب Node...",
            "بالإعدادات دي:",
            "نسخة 24.",
            "وكاش لـ npm.",
            "سطّب بالظبط اللي في الـ lock.",
            "Chromium بس ومكتبات لينكس بتاعته.",
            "ابني الجداول من الـ migrations.",
            "اعمل يوزر الاختبار والداتا الأساسية.",
            "ابني التطبيق (webServer هيشغّل npm run start).",
            "شغّل e2e. CI متعرّف لوحده، فالإعدادات بتاعة CI بتشتغل.",
            "ارفع التقرير...",
            "...حتى لو الاختبارات وقعت (إلا لو الـ run اتلغى).",
            "بالإعدادات دي:",
            "اسم الـ artifact.",
            "الفولدر.",
            "يتمسح بعد أسبوعين."
          ],
          sol: R`الـ run يقع في خطوة [[npx playwright test]]، والخطأ بيظهر كـ annotation على سطر الاختبار في تاب Files في الـ PR (من reporter [[github]]). وخطوة [[upload-artifact]] بتشتغل برضه بفضل [[!cancelled()]].

من صفحة الـ run، تحت Artifacts، نزّل [[playwright-report]] وفكّه، و [[npx playwright show-report playwright-report]]. ادخل على الاختبار اللي وقع، ولو اتعاد هتلاقي trace (من [[on-first-retry]]).

لو كل الاختبارات وقعت في الـ setup بـ timeout على [[Dashboard]]، شوف خطوة seed: غالبًا يوزر الاختبار متعملش، أو [[E2E_PASSWORD]] مش متظبط في الـ secrets.`
        },
        {
          cmd: "@axe-core/playwright",
          title: "افحص الـ accessibility في كل صفحة مهمة",
          desc: R`[[@axe-core/playwright]] بيشغّل axe (نفس المحرك اللي في Lighthouse) على الصفحة المفتوحة، ويرجّع قايمة violations: صورة من غير alt، و input من غير label، وتباين ألوان ضعيف.

[[expect(results.violations).toEqual([])]] بيخلي أي مشكلة تفشّل الاختبار، وفي CI يمنع الـ PR.`,
          example: R`import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.use({ storageState: { cookies: [], origins: [] } });

test("login page has no detectable a11y violations", async ({ page }) => {
  await page.goto("/login");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .exclude("#third-party-chat")
    .analyze();
  expect(results.violations).toEqual([]);
});`,
          try: R`[[npm i -D @axe-core/playwright]] وشغّل الاختبار على صفحة الـ login. بعدين ضيف [[<img src="/logo.png">]] من غير alt وشغّله تاني، واقرا الـ violation.`,
          flag: "script",
          deep: {
            why: "مشاكل الـ accessibility مبتبانش لما تجرّب بالماوس. input من غير label بيشتغل عادي، بس قارئ الشاشة بيقول «edit text» وخلاص. وفي دول كتير ده التزام قانوني. الفحص الأوتوماتيكي بيمسك حوالي ثلث المشاكل من غير أي مجهود، وبيمنع إنها ترجع بعد ما اتصلّحت.",
            how: R`[[new AxeBuilder({ page })]] بيحقن axe-core في الصفحة ويشغّله على الـ DOM الحالي، بعد ما الـ JavaScript اشتغل. فلو فيه modal أو قايمة بتظهر بعد click، افتحها الأول وبعدين analyze.

[[withTags]] بيحدد القواعد: [[wcag2a]] و [[wcag2aa]] (وأخواتهم 21) هم المستوى اللي أغلب القوانين بتطلبه. [[exclude(selector)]] بيستثني حتة مش بتاعتك (widget خارجي). و [[include]] العكس. و [[disableRules(["color-contrast"])]] لقاعدة معينة، بس بسبب مكتوب.

كل violation فيها [[id]] (زي [[image-alt]] و [[label]] و [[color-contrast]])، و [[impact]] (minor لحد critical)، و [[help]] جملة، و [[nodes]] العناصر نفسها بالـ selector. [[toEqual([])]] بيطبع كل ده في رسالة الفشل.

ولصفحات كتير: اعمل fixture أو دالة [[checkA11y(page)]] وناديها في آخر كل اختبار مهم. ولمشروع قديم فيه ١٠٠ مشكلة: ابدأ بـ [[critical]] بس ([[violations.filter(v => v.impact === "critical")]]) وزوّد.

الأوتوماتيك مبيكفيش: ترتيب الـ Tab، و focus بعد فتح modal، ومعنى الـ alt نفسه، دول محتاجين تجرّب بالكيبورد وقارئ الشاشة. وقواعد [[jsx-a11y]] في eslint بتمسك جزء تاني وقت الكتابة (المستوى الأول).`,
            when: "على الصفحات الأساسية (الرئيسية، و login، و checkout، و أي فورم)، وعلى حالات مهمة (فورم فيه أخطاء، و modal مفتوح). في نفس job الـ e2e.",
            mistakes: R`تشغّل analyze قبل ما الصفحة تخلص (قبل [[toBeVisible]] على المحتوى)، فبيفحص skeleton. وتعمل [[disableRules]] لكل قاعدة بتقع لحد ما يعدّي. و [[exclude]] على الـ body كله. وتفتكر إن صفر violations يعني الموقع accessible: ده الحد الأدنى بس. وملحوظة: axe بيقبل [[placeholder]] كاسم للـ input، فـ input من غير label بس فيه placeholder مش هيتمسك، مع إن الـ placeholder بيختفي أول ما تكتب.`
          },
          teach: R`## الأول: axe بيلف على الصفحة ويقولك مين مش accessible

[[axe-core]] مكتبة JavaScript بتتحقن في الصفحة، وتمشي على كل عنصر في الـ DOM، وتطبّق عليه قواعد (صورة من غير alt؟ input من غير اسم؟ لون باهت على خلفية فاتحة؟). و [[@axe-core/playwright]] حتة صغيرة بتوصّلها بصفحة Playwright. جرّبتها على ويندوز بنسخة [[4.13.0]] على صفحة الـ login بتاعة مشروع التجربة:

~~~bash
npm i -D @axe-core/playwright
~~~

[[-D]] = devDependency، لأنها للاختبارات بس. وبتجيب معاها [[axe-core@4.13.0]].

---

## ١. السطور الأولى

~~~ts
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
~~~

[[AxeBuilder]] هو الـ default export (من غير أقواس [[{ }]])، وهو class بتبني بيه الفحص خطوة خطوة.

~~~ts
test.use({ storageState: { cookies: [], origins: [] } });
~~~

صفحة الـ login لازم تتفتح من غير session، وإلا التطبيق يحوّلك للـ dashboard وتفحص صفحة غلط (نفس سطر درس [[storageState]]).

## ٢. [[await page.goto("/login")]]

افتح الصفحة. axe بيفحص الـ DOM **الحالي**، فلو المحتوى بيتحمّل بعدين أو فيه modal بيتفتح بدوسة، استنى أو افتحه الأول.

---

## ٣. بناء الفحص: من جوه لبرة

~~~ts
const results = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
  .exclude("#third-party-chat")
  .analyze();
~~~

### [[new AxeBuilder({ page })]]

اعمل builder مربوط بالصفحة دي. لسه مفحصش حاجة.

### [[.withTags([...])]]

كل قاعدة في axe عليها tags. دول بيقولوا «شغّل القواعد بتاعة WCAG بس»:

| الـ tag | يعني |
|---|---|
| [[wcag2a]] | WCAG 2.0 مستوى A (الأساسيات) |
| [[wcag2aa]] | WCAG 2.0 مستوى AA (زي تباين الألوان) |
| [[wcag21a]] و [[wcag21aa]] | القواعد اللي اتضافت في WCAG 2.1 بنفس المستويين |

WCAG = Web Content Accessibility Guidelines، والمستوى AA هو اللي أغلب القوانين بتطلبه.

### [[.exclude("#third-party-chat")]]

متفحصش العنصر ده وكل اللي جواه (CSS selector). للحاجات اللي مش بتاعتك، زي widget شات من شركة تانية. ولو الـ selector مش موجود في الصفحة (زي هنا) مفيش مشكلة، الفحص كمّل عادي.

### [[.analyze()]]

هنا بس بيحقن axe ويشغّله، ويرجّع object فيه [[violations]] (المشاكل)، و [[passes]] (القواعد اللي عدّت)، و [[incomplete]] (حاجات محتاجة بني آدم يحكم).

## ٤. [[expect(results.violations).toEqual([])]]

[[toEqual([])]] = «لازم تبقى مصفوفة فاضية». ومن غير [[await]] هنا لأن [[results]] جاهزة خلاص، مش حاجة بتستنى.

~~~text الناتج (الصفحة السليمة)
  ok 2 [chromium] › e2e\a11y.spec.ts:6:5 › login page has no detectable a11y violations (1.1s)
  2 passed (6.6s)
~~~

(الاتنين = الـ setup والاختبار.)

---

## ٥. لما فيه مشكلة: [[<img>]] من غير alt

شغّلت السيرفر بحيث الصفحة فيها [[<img src="/logo.png">]]، والاختبار وقع. [[toEqual]] بيطبع الفرق بين المتوقع ([[Array []]]) واللي جه، وده جزء منه:

~~~text الناتج (مختصر)
    - Expected  -  1
    + Received  + 80

    + Array [
    +   Object {
    +     "description": "Ensure <img> elements have alternative text or a role of none or presentation",
    +     "help": "Images must have alternative text",
    +     "helpUrl": "https://dequeuniversity.com/rules/axe/4.13/image-alt?application=playwright",
    +     "id": "image-alt",
    +     "impact": "critical",
    +     "nodes": Array [
    +       Object {
    +         "failureSummary": "Fix any of the following:
    +   Element does not have an alt attribute
    +   aria-label attribute does not exist or is empty
    +   ...
    +         "html": "<img src=\"/logo.png\">",
    +         "target": Array [
    +           "img",
    +         ],
~~~

| الخانة | معناها |
|---|---|
| [[id]] | اسم القاعدة: [[image-alt]] |
| [[impact]] | الخطورة: [[minor]] أو [[moderate]] أو [[serious]] أو [[critical]] |
| [[help]] و [[helpUrl]] | جملة، ولينك فيه الشرح والحل |
| [[nodes]] | كل عنصر فيه المشكلة: الـ [[html]] بتاعه، و [[target]] (selector توصله بيه)، و [[failureSummary]] (أي حل من دول يكفي) |

---

## ٦. axe بيمسك إيه ومبيمسكش إيه

جرّبت ٥ حتت HTML صغيرة، كل واحدة في صفحة لوحدها، وطبعت [[id]] و [[impact]] لكل violation:

~~~text الناتج
placeholderOnly => []
nothing => [["label","critical"]]
altEmpty => []
altText => []
lowContrast => [["color-contrast","serious"]]
~~~

| الـ HTML | النتيجة | ليه |
|---|---|---|
| [[<input placeholder="Email">]] | عدّى | axe بيقبل الـ placeholder كاسم، مع إنه بيختفي أول ما تكتب |
| [[<input>]] | [[label]] critical | مفيش أي اسم خالص |
| [[<img alt="">]] | عدّى | [[alt=""]] = «صورة ديكور، قارئ الشاشة يتجاهلها» |
| [[<img alt="MyApp">]] | عدّى | فيه وصف. صح ولا غلط؟ axe ميعرفش |
| نص [[#bbb]] على أبيض | [[color-contrast]] serious | التباين أقل من 4.5:1 اللي AA بيطلبه |

عشان كده صفر violations = الحد الأدنى، مش «الموقع accessible».

---

## الخلاصة

| الخطوة | الكود |
|---|---|
| ابني الفحص على الصفحة | [[new AxeBuilder({ page })]] |
| قواعد WCAG A و AA | [[.withTags([...])]] |
| استثني حاجة مش بتاعتك | [[.exclude(selector)]] |
| شغّل | [[await ... .analyze()]] |
| مفيش مشاكل | [[expect(results.violations).toEqual([])]] |

- افتح الحالة اللي عايز تفحصها الأول (المحتوى ظاهر، الـ modal مفتوح)، وبعدين [[analyze]].
- رسالة الفشل فيها كل حاجة: [[id]] و [[impact]] والعنصر نفسه والحل.
- axe بيمسك جزء من المشاكل بس: الـ placeholder بيعدّي، ومعنى الـ alt محدش بيحكم فيه غيرك.`,
          lines: [
            "test و expect.",
            "الـ builder اللي بيشغّل axe على صفحة Playwright.",
            "الصفحة دي من غير login.",
            "اختبار accessibility لصفحة الـ login.",
            "افتح الصفحة.",
            "جهّز فحص axe على الصفحة الحالية...",
            "...بقواعد WCAG 2.0 و 2.1 مستوى A و AA...",
            "...واستثني widget خارجي مش بتاعنا...",
            "...وشغّل الفحص.",
            "لازم مفيش ولا مشكلة. لو فيه، الرسالة بتطبعها كلها.",
            "نهاية الاختبار."
          ],
          sol: R`الصفحة السليمة: [[1 passed]].

بعد الصورة: الاختبار بيقع، والفرق فيه violation بـ [[id: "image-alt"]] و [[impact: "critical"]] و [[help: "Images must have alternative text"]]، وتحتها الـ node نفسه ([[img]]) والحلول المقترحة (alt، أو aria-label، أو role="presentation").

الحل: [[alt="MyApp"]] لو اللوجو بيقول حاجة، أو [[alt=""]] لو ديكور بس. الاتنين بيعدّوا، والفرق في المعنى، ودي حاجة axe ميقدرش يحكم فيها.`
        },
        {
          cmd: "Lighthouse CI",
          title: "ميزانية أداء في كل PR",
          desc: R`[[@lhci/cli]] بيشغّل Lighthouse على صفحاتك كذا مرة، ويقارن النتيجة بميزانية في [[lighthouserc.json]]: الـ performance فوق ٩٠، و LCP أقل من ٢.٥ ثانية، والصفحة أقل من حجم معين. لو أي حاجة عدّت الحد، الأمر يرجع exit code 1 والـ PR يقع.

كده الأداء بقى شرط زي الاختبارات، مش حاجة بتبص عليها لما حد يشتكي.`,
          example: R`{
  "ci": {
    "collect": {
      "startServerCommand": "npm run start",
      "startServerReadyPattern": "ready",
      "url": ["http://localhost:3000/", "http://localhost:3000/login"],
      "numberOfRuns": 3,
      "settings": { "preset": "desktop" }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "total-byte-weight": ["warn", { "maxNumericValue": 500000 }]
      }
    },
    "upload": { "target": "temporary-public-storage" }
  }
}`,
          try: R`[[npm i -D @lhci/cli]]، وحط الملف في جذر المشروع، و [[npm run build]] وبعدين [[npx lhci autorun]]. بعدين وطّي [[total-byte-weight]] لرقم صغير جدًا (١٠٠) وخليه error، وشغّل تاني واقرا رسالة الفشل.`,
          flag: "script",
          deep: {
            why: "الأداء بيبوظ بالتدريج: مكتبة ٢٠٠ كيلو هنا، وصورة ٣ ميجا هناك، وكل PR لوحده «مش فارق». بعد ست شهور الصفحة بتاخد ٦ ثواني ومحدش عارف إمتى حصل. الميزانية بتمسك الـ PR اللي عدّى الحد وقت ما اتعمل، والتصليح لسه سهل.",
            how: R`[[lhci autorun]] بيعمل تلات خطوات: [[collect]]، و [[assert]]، و [[upload]].

collect: [[startServerCommand]] بيشغّل التطبيق (بعد build) ويستنى سطر فيه [[startServerReadyPattern]] (regex، و [[next start]] بيطبع «Ready in ...»). وبعدين يشغّل Lighthouse على كل [[url]] عدد [[numberOfRuns]] مرات، لأن رقم الأداء بيتذبذب من run للتاني. و [[preset: "desktop"]] بيقيس كديسكتوب، ومن غيره الافتراضي موبايل على شبكة بطيئة متزيّفة (أصعب بكتير).

assert: كل سطر [[audit-id]] أو [[categories:x]]، ومستوى ([[error]] يوقّع، و [[warn]] يطبع بس)، وشرط: [[minScore]] (من ٠ لـ ١) للفئات، و [[maxNumericValue]] للأرقام (LCP بالملي ثانية، و CLS رقم، والحجم بالبايت). وفيه [[preset: "lighthouse:recommended"]] بقواعد كتير جاهزة، بس بيبقى صارم جدًا على مشروع قايم.

upload: [[temporary-public-storage]] بيرفع التقرير لرابط مؤقت عام (أيام) تفتحه من اللوج. أو [[filesystem]] يحطه في فولدر ترفعه artifact، أو سيرفر LHCI بتاعك لو عايز تاريخ ومقارنة.

في GitHub Actions: step بعد [[npm run build]] بيعمل [[npx @lhci/cli autorun]]، وبيلاقي Chrome المتسطّب على ماكينة ubuntu. ولو عايز status check على الـ PR برابط التقرير، فيه GitHub App اسمها Lighthouse CI بتدّيك [[LHCI_GITHUB_APP_TOKEN]].`,
            when: "على الصفحات اللي بتجيب زوار (الرئيسية، و landing، و صفحة المنتج). وابدأ بالأرقام الحالية كحد وزوّد، زي الـ coverage.",
            mistakes: R`run واحد ([[numberOfRuns: 1]]) فالنتيجة بتتذبذب والـ PR يقع ويعدّي من غير تغيير. وتقيس [[npm run dev]] بدل build: dev مش مضغوط ومفيهوش optimizations، فالأرقام ملهاش معنى. و [[minScore: 1]] للـ performance، فأي حاجة تفشّل. و [[temporary-public-storage]] لتطبيق داخلي فيه بيانات حساسة في الصفحة: التقرير بيبقى عام. و [[startServerReadyPattern]] مش مطابق للي السيرفر بيطبعه، فـ lhci يستنى لحد timeout ويكمّل على سيرفر لسه مش جاهز.`
          },
          teach: R`## الأول: Lighthouse بيدّي درجات، و LHCI بيحوّلها نجاح أو فشل

Lighthouse (اللي في Chrome DevTools) بيفتح الصفحة ويقيس: سرعتها، و accessibility، و best practices، و SEO، ويدّي كل واحدة درجة من ٠ لـ ١٠٠. [[@lhci/cli]] (LHCI = Lighthouse CI) بيشغّله من الترمنال، ويقارن الأرقام بالحدود اللي في [[lighthouserc.json]]، ويرجع exit code. جرّبته على ويندوز بنسخة [[0.15.1]] على مشروع التجربة (سيرفر Node بيطبع [[ready on http://localhost:3000]])، ولقى Chrome المتسطّب على الجهاز لوحده.

~~~bash
npm i -D @lhci/cli
npx lhci autorun
~~~

[[autorun]] = اعمل الخطوات التلاتة ورا بعض: [[collect]] ثم [[assert]] ثم [[upload]]. والملف متقسّم بنفس الأسامي.

---

## ١. [[collect]]: اجمع القياسات

~~~json
"collect": {
  "startServerCommand": "npm run start",
  "startServerReadyPattern": "ready",
  "url": ["http://localhost:3000/", "http://localhost:3000/login"],
  "numberOfRuns": 3,
  "settings": { "preset": "desktop" }
}
~~~

| الخانة | معناها |
|---|---|
| [[startServerCommand]] | الأمر اللي يشغّل التطبيق المبني |
| [[startServerReadyPattern]] | regex: استنى لحد ما السيرفر يطبع سطر فيه الكلمة دي (من غير فرق capital و small) |
| [[url]] | الصفحات اللي هتتقاس |
| [[numberOfRuns]] | كل صفحة كام مرة |
| [[settings.preset: "desktop"]] | قيس كشاشة ديسكتوب. من غيره الافتراضي موبايل بشبكة ومعالج أبطأ متزيّفين |

### الناتج

~~~text الناتج
✅  .lighthouseci/ directory writable
✅  Configuration file found
✅  Chrome installation found
Healthcheck passed!

Started a web server with "npm run start"...
Running Lighthouse 3 time(s) on http://localhost:3000/
Run #1...done.
Run #2...done.
Run #3...done.
Running Lighthouse 3 time(s) on http://localhost:3000/login
Run #1...done.
Run #2...done.
Run #3...done.
Done running Lighthouse!
~~~

- أول ٣ سطور فحص سريع: يقدر يكتب في [[.lighthouseci/]] (الفولدر اللي بيحط فيه النتايج، حطه في [[.gitignore]])، ولقى الإعدادات، ولقى Chrome.
- ٢ صفحة × ٣ مرات = ٦ قياسات. على الجهاز ده الأمر كله خد حوالي دقيقة و ٤٠ ثانية.

### ليه ٣ مرات؟

الأرقام بتتذبذب حسب الجهاز مشغول قد إيه. LHCI بيختار run «ممثّل» من التلاتة (الوسط) ويستخدمه في التقرير. على السيرفر الصغير ده الدرجات طلعت:

~~~text الناتج (من manifest.json)
http://localhost:3000/       {"performance":1,"accessibility":1,"best-practices":0.96,"seo":1}
http://localhost:3000/login  {"performance":1,"accessibility":1,"best-practices":0.96,"seo":1}
~~~

[[1]] = ١٠٠، و [[0.96]] = ٩٦. نفس الدرجة اللي بتشوفها في DevTools بس مقسومة على ١٠٠.

---

## ٢. [[assert]]: الميزانية

~~~json
"categories:performance": ["error", { "minScore": 0.9 }],
~~~

كل سطر شكله: [[اسم: [المستوى, { الشرط }]]].

- الاسم: [[categories:x]] للدرجة الكبيرة، أو [[audit id]] لقياس واحد بعينه.
- المستوى: [[error]] يفشّل الأمر، و [[warn]] يطبع تحذير بس، و [[off]] يقفله.
- الشرط: [[minScore]] (من ٠ لـ ١) للدرجات، و [[maxNumericValue]] للأرقام بوحدتها.

| السطر | الحد | الرقم الحقيقي على السيرفر ده |
|---|---|---|
| [[categories:performance]] | ٠.٩ على الأقل | 1 |
| [[categories:accessibility]] | ٠.٩٥ على الأقل | 1 |
| [[largest-contentful-paint]] | ٢٥٠٠ ملي ثانية | 204.9 (يعني 0.2 s) |
| [[cumulative-layout-shift]] | ٠.١ | 0 |
| [[total-byte-weight]] | ٥٠٠ ألف بايت (warn) | 889 بايت |

- LCP = Largest Contentful Paint: إمتى أكبر حاجة في الصفحة (صورة أو عنوان) ظهرت. ٢.٥ ثانية هو حد «كويس» عند جوجل.
- CLS = Cumulative Layout Shift: الصفحة اتنططت قد إيه وهي بتحمّل (رقم من غير وحدة). أقل من ٠.١ كويس.
- [[total-byte-weight]]: حجم كل اللي اتنزّل بالبايت.

كله عدّى، فالناتج:

~~~text الناتج
Checking assertions against 2 URL(s), 6 total run(s)

All results processed!
~~~

### نكسر الميزانية

غيّرت [[total-byte-weight]] لـ [[["error", { "maxNumericValue": 100 }]]] وشغّلت تاني:

~~~text الناتج
1 result(s) for http://localhost:3000/ :

  ×  total-byte-weight failure for maxNumericValue assertion
       Avoids enormous network payloads
       https://developer.chrome.com/docs/lighthouse/performance/total-byte-weight/

        expected: <=100
           found: 889
      all values: 889, 889, 889

1 result(s) for http://localhost:3000/login :
  ×  total-byte-weight failure for maxNumericValue assertion
        expected: <=100
           found: 1046
      all values: 1046, 1046, 1046

Assertion failed. Exiting with status code 1.
~~~

[[expected]] الحد، و [[found]] الرقم اللي اتقارن، و [[all values]] الـ ٣ قياسات. و [[status code 1]] = الـ step في CI يقع والـ PR يتمنع.

---

## ٣. [[upload]]: التقرير يروح فين

~~~json
"upload": { "target": "temporary-public-storage" }
~~~

[[temporary-public-storage]] بيرفع التقرير HTML على سيرفر عام لأيام، ويطبع لينك تفتحه من لوج الـ CI. «عام» يعني أي حد معاه اللينك يشوف الصفحة. عشان كده في التجربة دي مرفعتش، وغيّرت المكان من الترمنال:

~~~bash
npx lhci autorun --upload.target=filesystem --upload.outputDir=./lhci-out
~~~

أي خانة في الملف تقدر تغيّرها بـ [[--section.key=value]]. و [[filesystem]] حط ٦ تقارير HTML و JSON و [[manifest.json]] في الفولدر (ده اللي ترفعه artifact):

~~~text الناتج
Dumping 6 reports to disk at ...\lab\lhci-out...
Done writing reports to disk.
~~~

---

## ٤. لما السيرفر ميطبعش الكلمة

جرّبت [[--startServerReadyPattern=nope]]:

~~~text الناتج
Started a web server with "npm run start"...
WARNING: Timed out waiting for the server to start listening.
         Ensure the server prints a pattern that matches /nope/i when it is ready.
Running Lighthouse 1 time(s) on http://localhost:3000/
~~~

لاحظ [[/nope/i]]: الـ [[i]] = مش فارق capital و small. واستنى ١٠ ثواني ([[startServerReadyTimeout]] الافتراضي ١٠٠٠٠) وبعدين **كمّل عادي**. هنا السيرفر كان قام فعلًا فمحصلش حاجة، بس لو سيرفر بطيء (build كبير) هيقيس صفحة لسه مش جاهزة. الافتراضي لو مكتبتش الخانة دي [[listen|ready]].

---

## الملف كله

| الجزء | بيرد على |
|---|---|
| [[collect]] | شغّل إيه، وقيس أنهي صفحات، كام مرة، كديسكتوب ولا موبايل |
| [[assert]] | الحدود، وكل حد [[error]] ولا [[warn]] |
| [[upload]] | التقرير يروح فين |

## الخلاصة

- [[npx lhci autorun]] = collect ثم assert ثم upload، و [[exit 1]] لو أي [[error]] اتكسر.
- [[numberOfRuns: 3]] على الأقل عشان الذبذبة، وقيس [[npm run start]] على build مش dev.
- [[minScore]] من ٠ لـ ١ للدرجات، و [[maxNumericValue]] بالملي ثانية أو البايت.
- [[temporary-public-storage]] عام: لتطبيق داخلي استخدم [[filesystem]] وارفعه artifact. وحط [[.lighthouseci/]] في [[.gitignore]].`,
          lines: [
            "بداية الإعدادات.",
            "كل حاجة تحت ci.",
            "جمع النتايج:",
            "شغّل التطبيق المبني.",
            "استنى لحد ما يطبع سطر فيه ready.",
            "الصفحات اللي هتتقاس.",
            "كل صفحة ٣ مرات، والنتيجة من التلاتة (عشان الذبذبة).",
            "قيس كديسكتوب مش موبايل بطيء.",
            "نهاية collect.",
            "الشروط:",
            "كل ميزانية:",
            "درجة الأداء ٩٠ على الأقل، وإلا فشل.",
            "درجة الـ accessibility ٩٥ على الأقل.",
            "أكبر عنصر يظهر في أقل من ٢.٥ ثانية.",
            "الصفحة متتنططش أكتر من ٠.١.",
            "حجم الصفحة كله فوق ٥٠٠ كيلو: تحذير بس.",
            "نهاية assertions.",
            "نهاية assert.",
            "ارفع التقرير لرابط مؤقت تفتحه من اللوج.",
            "نهاية ci.",
            "نهاية الإعدادات."
          ],
          sol: R`الأول: [[Running Lighthouse 3 time(s) on http://localhost:3000/]]، وبعدين [[Checking assertions against 2 URL(s), 6 total run(s)]]، ولو كله تمام [[All results processed!]] ولينك التقرير.

بعد الميزانية الصغيرة: [[× total-byte-weight failure for maxNumericValue assertion]] وتحتها [[expected: <=100]] و [[found: ...]] و [[all values: ...]] للتلات مرات، وفي الآخر [[Assertion failed. Exiting with status code 1.]]. ده بالظبط اللي هيوقّع الـ PR.

لو شفت [[WARNING: Timed out waiting for the server to start listening]] يبقى [[startServerReadyPattern]] مش لاقي السطر: شغّل [[npm run start]] بإيدك وشوف بيطبع إيه بالظبط.`
        }
      ]
    }
]);
