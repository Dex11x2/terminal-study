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

بعد الميزانية الصغيرة: [[✘ total-byte-weight failure for maxNumericValue assertion]] وتحتها [[expected: <=100]] و [[found: ...]] و [[all values: ...]] للتلات مرات، وفي الآخر [[Assertion failed. Exiting with status code 1.]]. ده بالظبط اللي هيوقّع الـ PR.

لو شفت [[WARNING: Timed out waiting for the server to start listening]] يبقى [[startServerReadyPattern]] مش لاقي السطر: شغّل [[npm run start]] بإيدك وشوف بيطبع إيه بالظبط.`
        }
      ]
    }
]);
