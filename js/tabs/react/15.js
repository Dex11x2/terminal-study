// تكملة تاب react: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/react/01.js (شرح حقول الدرس في أوله)
MORE("react", [
    {
      t: "Storybook بعمق: controls و decorators و tests",
      l: 3,
      n: "Storybook لمشروع Vite + React + TypeScript من التسطيب للـ CI: controls للـ props، و decorators للـ theme والـ router والـ RTL، و play tests بتشتغل headless بـ Vitest، وفحص a11y، ونشر نسخة static",
      items: [
        {
          cmd: "storybook init",
          title: "سطّب Storybook صح، وافهم الملفات اللي كتبها، وابني نسخة static",
          desc: R`[[npm create storybook@latest]] في مشروع Vite + React + TypeScript بيسطّب Storybook 10 ويكتب [[.storybook/main.ts]] و [[.storybook/preview.tsx]] وسكربتين في [[package.json]]: [[storybook]] (سيرفر تطوير على port 6006) و [[build-storybook]] (موقع static في [[storybook-static]] ترفعه على أي استضافة).

أساسيات الـ stories و [[play]] والـ visual regression في درس «Storybook» في قسم «مكتبات الـ dashboard». هنا بنكمّل: إيه اللي اتكتب بالظبط، وإيه اللي تشيله، وإزاي تبني وتجرب النسخة اللي هتترفع.`,
          example: R`npm create storybook@latest -- --yes --features docs test a11y --no-dev
npx storybook remove @chromatic-com/storybook
npm run storybook
npm run build-storybook
npx vite preview --outDir storybook-static --port 6107 --base /my-repo/`,
          try: R`في مشروع [[npm create vite@latest sb-lab -- --template react-ts]] شغّل الأوامر بالترتيب. بعد التسطيب افتح [[.storybook/main.ts]] و [[vite.config.ts]] وشوف إيه اتضاف. بعد [[build-storybook]] شوف حجم [[storybook-static]] وافتح النسخة اللي على [[/my-repo/]] في المتصفح: هل الـ stories بتفتح والـ sidebar كامل؟`,
          deep: {
            why: R`التسطيب بيعمل حاجات كتير لوحده: بيعدّل [[vite.config.ts]]، ويضيف addons، وينزّل متصفح لـ Playwright (حوالي ٧٠٠ ميجا)، ويحط packages بنسخة [[latest]] مش مثبتة. لو مفهمتش اللي اتكتب، أول مشكلة في CI هتبقى لغز. والنسخة الـ static هي اللي الديزاينر والـ PM والفريق التاني هيفتحوها، فلازم تتأكد إنها شغالة من فولدر فرعي زي ما هتترفع.`,
            how: R`الأمر بيكتشف الـ framework من [[package.json]] (هنا [[react-vite]])، وبيضيف [[storybook]] و [[@storybook/react-vite]] و addons الـ features اللي اخترتها: [[docs]] = [[@storybook/addon-docs]] (صفحة توثيق أوتوماتيك)، و [[test]] = [[@storybook/addon-vitest]] ومعاه [[vitest]] و [[@vitest/browser-playwright]] و [[playwright]]، و [[a11y]] = [[@storybook/addon-a11y]]. وبيضيف [[@chromatic-com/storybook]] كمان، ودي addon لخدمة Chromatic المدفوعة (محتاجة حساب)، فلو مش هتستخدمها شيلها.

[[main.ts]] بيتقري في Node: فين الـ stories، وأنهي addons، وأنهي framework. و [[preview.tsx]] بيتقري في المتصفح جنب كل story: decorators و parameters و globals (الدرسين الجايين). و [[storybook build]] بيعمل Vite build لصفحتين: [[index.html]] (الواجهة) و [[iframe.html]] (اللي الـ story بتترسم فيه)، ومعاهم [[index.json]] (فهرس كل الـ stories). الروابط جوه الملفات relative، فالنسخة تشتغل من [[/my-repo/]] زي GitHub Pages من غير إعداد.`,
            when: R`Storybook يستاهل لما يبقى عندك components بتتكرر في صفحات كتير ولها حالات كتير (زرار بـ ٤ أشكال، وجدول فاضي وبيحمّل وفيه خطأ)، أو ديزاينر بيراجع الشغل، أو أكتر من مشروع بيستخدم نفس المكتبة. لفريق صغير (٢ أو ٣) في تطبيق واحد بصفحات قليلة، غالبًا Vitest + Testing Library (قسم «الاختبارات») والتطبيق نفسه كفاية، و Storybook هيبقى ملفات زيادة لازم تتصان مع كل تغيير في الـ props. ابدأ بيه لما تلاقي نفسك بتفتح التطبيق وتلف ٥ صفحات عشان توصل لحالة واحدة.`,
            mistakes: R`سيب [[@chromatic-com/storybook]] وانت مش بتستخدم Chromatic: بيضيف فولدر [[addon-visual-tests-assets]] للـ build. وسيب [["vitest": "latest"]] في [[package.json]] زي ما التسطيب كتبه: الـ lockfile بيحميك لحد ما حد يعمل [[npm install]] من غير lockfile أو يمسحه. ثبّت النسخة. وتشغيل [[npx storybook dev]] في CI عشان «تتأكد إنه شغال» بدل [[build-storybook]] اللي بيفشل فعلًا لو فيه import غلط. وعلى ويندوز 11 آخر سطر في التسطيب طلع [[wmic is not recognized]]: ده Storybook بيحاول يقرا معلومة عن الجهاز بأداة ويندوز شالها، والتسطيب نفسه نجح، فمتقلقش منه.`
          },
          teach: R`## الفكرة: أمر واحد بيكتب ٥ حاجات، وانت لازم تعرفهم

كله اتشغّل على ويندوز 11 بـ Node 24.22.1 و npm 11.19.1 في Git Bash و PowerShell، في مشروع [[create-vite]] 9.3.3 (Vite 8.3.5، و React 19.3.1، و TypeScript 7.0.2). التسطيب نزّل Storybook 10.6.5 و Vitest 4.1.10 و Playwright 1.64.1. ونفس الـ tests والـ build اتشغلوا كمان على لينكس في [[docker run --rm node:22-slim]] (الدرس الرابع).

---

## ١. التسطيب

~~~powershell
npm create storybook@latest -- --yes --features docs test a11y --no-dev
~~~

| الحتة | معناها |
|---|---|
| [[npm create storybook@latest]] | شغّل باكدج [[create-storybook]] بآخر نسخة |
| [[--]] | اللي بعدها يروح لـ [[create-storybook]] نفسه مش لـ npm |
| [[--yes]] | قول «أيوه» لكل سؤال (من غير أسئلة) |
| [[--features docs test a11y]] | الـ addons اللي عايزها: صفحات توثيق، و tests بـ Vitest، وفحص accessibility |
| [[--no-dev]] | متفتحش السيرفر في الآخر |

(في التجربة زودنا [[--disable-telemetry --no-agent]]: الأول بيقفل إرسال إحصائيات الاستخدام، والتاني بيقفل «agent mode» اللي بيشتغل لو الأمر حاسس إن AI agent هو اللي بيشغّله.)

الناتج (مختصر):

~~~text الناتج
●  Adding Storybook version 10.6.5 to your project
◇  Framework detected: react-vite
│  Adding devDependencies:
│  - storybook@^10.6.5
│  - @storybook/react-vite@^10.6.5
│  - @chromatic-com/storybook
│  - @storybook/addon-vitest@^10.6.5
│  - @storybook/addon-a11y@^10.6.5
│  - @storybook/addon-docs@^10.6.5
│  - vitest
│  - @vitest/browser-playwright
│  - @vitest/coverage-v8
│  - playwright
◇  Updating your Vite config file: ...\sb-lab\vite.config.ts
│  Setting up a11y addon for @storybook/addon-vitest
│  • You can run tests with "npx vitest --project=storybook"
│  Installing Playwright browser binaries (press "c" to abort)
│  Playwright browser binaries installed successfully
◇  Storybook was successfully installed in your project!
~~~

- [[Framework detected: react-vite]]: عرف إن المشروع React بـ Vite من [[package.json]]، فاختار [[@storybook/react-vite]].
- [[Installing Playwright browser binaries]]: نزّل Chrome for Testing 156 و headless shell و ffmpeg، حوالي **719 ميجا** على الديسك. ده المتصفح اللي الـ tests هتشتغل فيه.
- لاحظ إن [[vitest]] و [[playwright]] من غير رقم: في [[package.json]] اتكتبوا [["latest"]] (تحت).

---

## ٢. الملفات اللي اتعملت

[[git status]] بعد التسطيب في مشروع نضيف قال إن الجديد: [[.storybook/]]، و [[vitest.shims.d.ts]]، وفولدر [[src/stories]] (أمثلة Button و Header و Page)، والمتعدّل: [[package.json]] و [[vite.config.ts]].

### [[.storybook/main.ts]]

~~~text .storybook/main.ts (اللي التسطيب كتبه)
const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  "framework": "@storybook/react-vite"
};
~~~

- [[stories]]: الأماكن اللي بيدوّر فيها. [[**]] = أي فولدر جوه أي فولدر، و [[@(ts|tsx)]] = واحد من الامتدادات دي.
- [[addons]]: إضافات الواجهة. ترتيبها مش مهم هنا.
- [[framework]]: React مع Vite builder.

وبعد ما مسحنا [[src/stories]] (أمثلة) كل تشغيل كان بيطبع [[No story files found for the specified pattern: src\**\*.mdx]]، لأن مفيش ملفات [[.mdx]]. فبقى كده:

~~~text .storybook/main.ts (بعد التنضيف)
const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-vitest', '@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/react-vite',
  core: { disableTelemetry: true },
}
~~~

[[core: { disableTelemetry: true }]] بيقفل رسالة «Storybook collects completely anonymous usage telemetry» والإرسال نفسه، لكل الفريق مرة واحدة بدل flag في كل أمر.

### [[.storybook/preview.tsx]]

~~~text .storybook/preview.tsx (اللي التسطيب كتبه)
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};
~~~

- [[matchers]]: أي prop اسمه بيخلص بـ [[color]] أو [[background]] ياخد color picker، واللي بيخلص بـ [[Date]] ياخد date picker. ([[/.../i]] = regex من غير فرق بين الحروف الكبيرة والصغيرة.)
- [[a11y.test: 'todo']]: الأخطاء بتظهر في الواجهة بس ومش بتفشّل حاجة. ده أهم سطر هتغيّره (درس addon-a11y).

### [[vite.config.ts]]

اتضاف فيه [[test.projects]] فيه project اسمه [[storybook]]: plugin اسمه [[storybookTest]] بيحوّل كل story لـ test، و [[browser: { enabled: true, headless: true, provider: playwright({}), instances: [{ browser: 'chromium' }] }]]، يعني الـ tests بتشتغل في Chromium حقيقي من غير شباك. ده اللي الدرس الرابع بيشغّله.

### [[package.json]]

~~~text package.json (اللي اتضاف)
"storybook": "storybook dev -p 6006",
"build-storybook": "storybook build"
...
"@chromatic-com/storybook": "latest",
"vitest": "latest",
"@vitest/browser-playwright": "latest",
"@vitest/coverage-v8": "latest",
"playwright": "latest"
~~~

[[latest]] معناها «أي نسخة آخر واحدة وقت التسطيب». الـ lockfile ثبّت [[vitest]] على 4.1.10، بس الأحسن تكتب النسخة نفسها ([[npm i -D vitest@4.1.10]]) عشان [[package.json]] نفسه يقول الحقيقة.

---

## ٣. شيل Chromatic لو مش هتستخدمه

~~~powershell
npx storybook remove @chromatic-com/storybook
~~~

~~~text الناتج
┌  Removing @chromatic-com/storybook from your Storybook
│  Installing dependencies...: removed 8 packages
└  Done!
~~~

شاله من [[addons]] في [[main.ts]] ومن [[package.json]]. وحجم الـ build نزل من 9.2 ميجا لـ 8.6 ميجا، وفولدر [[addon-visual-tests-assets]] اختفى منه.

---

## ٤. [[npm run storybook]]

بيشغّل [[storybook dev -p 6006]]. ([[-p]] = port.) في التجربة اتشغّل على 6106 بـ [[--ci --no-open]] ([[--ci]] = من غير أسئلة، و [[--no-open]] = متفتحش المتصفح):

~~~text الناتج
T  storybook v10.6.5
|   Storybook ready!
|   - Local:                http://127.0.0.1:6106/
•  894 ms for manager and 846 ms for preview
~~~

[[manager]] = الواجهة (الـ sidebar والتابات)، و [[preview]] = الـ iframe اللي الـ stories بتترسم فيه. وفي [[/index.json]] فهرس كل الـ stories (شوفناه في الدرس الجاي).

---

## ٥. [[npm run build-storybook]]

~~~text الناتج (مختصر)
│  storybook-static/assets/axe-C4lPdR0t.js        557.44 kB │ gzip: 176.64 kB
│  storybook-static/assets/iframe-C_yk6Nvq.js   1,133.19 kB │ gzip: 322.83 kB
│  (!) Some chunks are larger than 500 kB after minification.
│  Vite ✓ built in 1.69s
└  Storybook build completed successfully
~~~

- الناتج فولدر [[storybook-static]]: **8.6 ميجا**، فيه [[index.html]] و [[iframe.html]] و [[index.json]] و [[assets]] (30 ملف).
- [[axe-...js]] ده محرك فحص الـ accessibility (addon-a11y). و [[iframe-...js]] فيه React والـ stories.
- تحذير [[larger than 500 kB]] طبيعي في Storybook: ده موقع داخلي للفريق، مش صفحة للعملاء.
- [[npx storybook build --test]] نسخة أخف للـ tests بس (من غير صفحات التوثيق): طلعت 7.5 ميجا. متنشرهاش للفريق.

---

## ٦. جرّب النسخة من فولدر فرعي قبل ما ترفعها

~~~powershell
npx vite preview --outDir storybook-static --port 6107 --base /my-repo/
~~~

- [[vite preview]]: سيرفر static صغير موجود مع Vite أصلًا، فمش محتاج باكدج زيادة.
- [[--outDir storybook-static]]: قدّم الفولدر ده بدل [[dist]].
- [[--base /my-repo/]]: قدّمه تحت [[/my-repo/]]، زي GitHub Pages لمشروع اسمه my-repo ([[username.github.io/my-repo/]]).

فتحنا [[http://localhost:6107/my-repo/?path=/story/forms-loginform--server-error]] في Chromium headless بـ Playwright:

~~~text الناتج
alert text: Wrong email or password
sidebar: Stories UI Button FORMS LoginForm Empty Prefilled Server Error ... LAYOUT SideNav
failed requests: 0 []
~~~

يعني الـ story اترسمت، والـ sidebar كامل، ومفيش ولا request رجع 4xx أو 5xx. ده لأن Storybook بيكتب الروابط relative ([[./assets/...]] مش [[/assets/...]]). النشر نفسه في workflow الدرس الرابع.

---

## الخلاصة

| الأمر / الملف | دوره |
|---|---|
| [[npm create storybook@latest -- --features ...]] | يسطّب Storybook 10 والـ addons ويعدّل [[vite.config.ts]] |
| [[.storybook/main.ts]] | فين الـ stories والـ addons (بيتقري في Node) |
| [[.storybook/preview.tsx]] | decorators و parameters و globals (بيتقري في المتصفح) |
| [[npx storybook remove ...]] | يشيل addon من الإعداد ومن [[package.json]] |
| [[npm run storybook]] | سيرفر تطوير على 6006 |
| [[npm run build-storybook]] | موقع static في [[storybook-static]] |
| [[vite preview --base /my-repo/]] | تتأكد إنه شغال من فولدر فرعي قبل النشر |

ثبّت النسخ اللي اتكتبت [[latest]]، وشيل اللي مش هتستخدمه، وابني وجرّب قبل ما ترفع.`,
          lines: [
            "يسطّب Storybook في مشروع Vite + React بالـ addons بتوع التوثيق والـ tests والـ a11y، من غير أسئلة ومن غير ما يفتح السيرفر.",
            "يشيل addon بتاع Chromatic (خدمة محتاجة حساب) من main.ts و package.json.",
            "يشغّل سيرفر التطوير (storybook dev -p 6006).",
            "يبني موقع static في فولدر storybook-static.",
            "يقدّم الموقع ده تحت /my-repo/ عشان تتأكد إنه شغال من فولدر فرعي زي GitHub Pages."
          ],
          sol: R`التسطيب كتب [[Framework detected: react-vite]] ونزّل Storybook 10.6.5 و Vitest و Playwright، ونزّل Chrome for Testing (حوالي ٧٠٠ ميجا). في [[main.ts]] هتلاقي [[stories]] و [[addons]] و [[framework: '@storybook/react-vite']]، وفي [[vite.config.ts]] project جديد اسمه [[storybook]] فيه [[browser: { enabled: true, headless: true ... }]]. وفي [[package.json]] شوية packages مكتوبة [["latest"]]: ثبّتها.

بعد [[npx storybook remove @chromatic-com/storybook]] الـ build بقى 8.6 ميجا بدل 9.2. [[npm run build-storybook]] بيخلص بـ «Storybook build completed successfully»، وتحذير [[Some chunks are larger than 500 kB]] طبيعي. ولما فتحنا النسخة على [[http://localhost:6107/my-repo/]] الـ story اترسمت والـ sidebar كامل و [[failed requests: 0]]. (متجرّب على ويندوز 11 بـ Node 24.22.1، و Storybook 10.6.5، و Vite 8.3.5.)`,
          solCode: R`npm create vite@latest sb-lab -- --template react-ts
cd sb-lab
npm i
npm create storybook@latest -- --yes --features docs test a11y --no-dev
npx storybook remove @chromatic-com/storybook
npm run build-storybook
npx vite preview --outDir storybook-static --port 6107 --base /my-repo/`
        },
        {
          cmd: "argTypes و controls",
          title: "controls لكل prop: argTypes لزرار وفورم، و autodocs، و render",
          desc: R`Storybook بيقرا أنواع الـ props من TypeScript ويعمل لكل prop خانة في تاب Controls تغيّر منها وانت شايف. و [[argTypes]] بتحدد نوع الخانة بنفسك: [[inline-radio]] لـ variant، و [[select]] للمقاس، و [[text]] لرسالة خطأ، أو تخفي prop من الجدول.

و [[tags: ['autodocs']]] بيعمل صفحة Docs فيها كل الـ stories وجدول الـ props، و [[render]] بيخليك ترسم أكتر من نسخة من الـ component في story واحدة.`,
          example: R`// src/components/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { Button } from './Button'

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  args: { label: 'Save', onClick: fn() },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'ghost', 'danger'] },
    size: { control: 'select', options: ['sm', 'md'] },
    onClick: { table: { disable: true } },
  },
} satisfies Meta<typeof Button>
export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
export const Danger: Story = { args: { variant: 'danger', label: 'Delete' } }
export const Loading: Story = { args: { loading: true } }
export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button {...args} size="sm" />
      <Button {...args} size="md" />
    </div>
  ),
}
// src/components/LoginForm.stories.tsx (نفس الـ imports و export default و type Story)
const meta = {
  title: 'Forms/LoginForm',
  component: LoginForm,
  args: { onSubmit: fn() },
  argTypes: { serverError: { control: 'text' } },
} satisfies Meta<typeof LoginForm>
export const Empty: Story = {}
export const Prefilled: Story = { args: { defaultEmail: 'ali@example.com' } }
export const ServerError: Story = { args: { serverError: 'Wrong email or password' } }`,
          try: R`اكتب [[Button]] بـ [[variant]] و [[size]] و [[loading]] و [[disabled]] و [[onClick]]، و [[LoginForm]] بـ [[onSubmit]] و [[defaultEmail]] و [[serverError]] (الكود في الشرح). افتح UI/Button وغيّر variant من تاب Controls: إيه اللي اتغير في الـ URL؟ وافتح صفحة Docs بتاعة الزرار: فين [[onClick]]؟ بعدين جرّب تفتح [[iframe.html?id=forms-loginform--empty&args=serverError:Locked]].`,
          flag: "script",
          deep: {
            why: R`من غير controls، كل حالة محتاجة story مكتوبة. مع controls، الديزاينر يجرّب نص طويل في الزرار أو رسالة خطأ في سطرين من غير ما يكتب كود، ويبعتلك لينك بالحالة دي بالظبط. والـ Docs بتبقى توثيق للـ props بيتحدّث لوحده مع الكود، مش ملف README بينسى.`,
            how: R`[[@storybook/react-vite]] بيقرا نوع الـ props من TypeScript وقت الـ build: [[string]] يبقى خانة نص، و [[boolean]] زرار on/off، و union زي [['primary' | 'ghost']] يبقى اختيارات. و [[argTypes]] بتكمّل أو تغيّر ده لكل prop: [[control]] نوع الخانة ([[text]] و [[boolean]] و [[number]] و [[range]] و [[color]] و [[date]] و [[select]] و [[radio]] و [[inline-radio]] و [[check]] و [[object]])، و [[options]] الاختيارات، و [[table: { disable: true }]] تخفيه من الجدول.

[[args]] في الـ meta = قيم افتراضية لكل الـ stories، و [[args]] في الـ story بتكتب فوقها. اللي بتغيّره في Controls بيتكتب في الـ URL ([[&args=variant:danger]])، فاللينك بيفتح نفس الحالة. و [[render]] بيستلم الـ args ويرجّع JSX بإيدك، بدل ما Storybook يرسم [[<Button {...args} />]] لوحده.

و [[title: 'UI/Button']] بيحدد مكانه في الـ sidebar والـ id: [[ui-button--primary]]. من غير [[title]] الاسم بيطلع من مكان الملف.`,
            when: R`أي component ليه أكتر من شكل أو حالة: [[argTypes]] للـ props اللي ليها اختيارات محددة، و [[table: { disable: true }]] للـ callbacks اللي ملهاش معنى كخانة، و [[render]] لما عايز تقارن أشكال جنب بعض أو تلف الـ component بحاجة خاصة بالـ story دي بس.`,
            mistakes: R`[[options]] مكتوبة بإيدك ومش ماشية مع النوع: تضيف [['outline']] للـ union وتنسى الـ stories، فالـ control مش هيعرضه. خلي النوع هو المصدر، و [[argTypes]] للحالات اللي الاستنتاج غلط فيها بس. و [[render]] في كل story من غير سبب، فالـ Controls مبقتش بتأثر (لو كتبت [[size="md"]] ثابتة، خانة size هتتغير والزرار لأ). وتتوقع إن أي قيمة تتحط في الـ URL: [[args=defaultEmail:ali@example.com]] اتجاهلت في التجربة، لأن Storybook بيرفض الحروف الخاصة زي [[@]] في args الـ URL.`
          },
          teach: R`## الفكرة: Storybook بيقرا الـ props، و argTypes بتظبط اللي محتاج تظبيط

كله اتشغّل على Storybook 10.6.5 في مشروع الدرس اللي فات، والواجهة اتقرت بـ Playwright في Chromium headless (Chrome for Testing 156) على ويندوز.

---

## ١. الـ components اللي بنعرضها

~~~text src/components/Button.tsx
export type ButtonProps = {
  label: string
  variant?: 'primary' | 'ghost' | 'danger'
  size?: 'sm' | 'md'
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
}
export function Button({ label, variant = 'primary', size = 'md', loading = false, disabled = false, onClick }: ButtonProps) {
  return (
    <button type="button" className={$__bt}btn btn-$__{variant} btn-$__{size}$__bt} disabled={disabled || loading} aria-busy={loading} onClick={onClick}>
      {loading ? '...' : label}
    </button>
  )
}
~~~

- [[?]] بعد اسم الـ prop = اختياري. و [[= 'primary']] في الـ destructuring = القيمة لو محدش بعتها.
- [[aria-busy]]: بيقول لقارئ الشاشة إن الزرار مشغول.

~~~text src/components/LoginForm.tsx
export type LoginFormProps = {
  onSubmit: (values: { email: string; password: string }) => void
  defaultEmail?: string
  serverError?: string
}
export function LoginForm({ onSubmit, defaultEmail = '', serverError }: LoginFormProps) {
  const [errors, setErrors] = useState<string[]>([])
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const email = String(data.get('email'))
    const password = String(data.get('password'))
    const next: string[] = []
    if (!email.includes('@')) next.push('Enter a valid email')
    if (password.length < 8) next.push('Password must be at least 8 characters')
    setErrors(next)
    if (next.length === 0) onSubmit({ email, password })
  }
  return (
    <form onSubmit={handleSubmit} noValidate>
      <label>Email <input name="email" type="email" defaultValue={defaultEmail} /></label>
      <label>Password <input name="password" type="password" /></label>
      {[...errors, ...(serverError ? [serverError] : [])].map(m => <p key={m} role="alert">{m}</p>)}
      <button type="submit">Sign in</button>
    </form>
  )
}
~~~

فورم uncontrolled بـ [[FormData]] (درس «uncontrolled و FormData»). [[noValidate]] بيقفل رسايل المتصفح عشان رسايلنا هي اللي تظهر، وكل رسالة [[role="alert"]] عشان قارئ الشاشة يقراها والـ tests تلاقيها.

---

## ٢. الـ [[meta]] بتاع الزرار سطر سطر

~~~text src/components/Button.stories.tsx
const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  args: { label: 'Save', onClick: fn() },
~~~

- [[title: 'UI/Button']]: الـ [[/]] بتعمل فولدر في الـ sidebar: [[UI]] وتحته [[Button]].
- [[component]]: منه Storybook بيقرا الـ props.
- [[tags: ['autodocs']]]: اعمل صفحة Docs للـ component ده.
- [[args]]: القيم الافتراضية لكل الـ stories. [[fn()]] spy بيظهر في تاب Actions كل ما الزرار يتداس.

~~~text src/components/Button.stories.tsx
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'ghost', 'danger'] },
    size: { control: 'select', options: ['sm', 'md'] },
    onClick: { table: { disable: true } },
  },
} satisfies Meta<typeof Button>
~~~

- [[variant]]: radio buttons جنب بعض في سطر واحد ([[inline-radio]]).
- [[size]]: قايمة منسدلة ([[select]]).
- [[onClick]]: متعرضهوش في الجدول خالص، لأن مفيش معنى لخانة «دالة».
- [[satisfies Meta<typeof Button>]]: TypeScript بيتأكد إن الأسامي والقيم صح من غير ما يضيّع النوع (اتشرح في درس «Storybook»).

### اللي ظهر في تاب Controls

~~~text الناتج (صفوف جدول Controls في UI/Button/Primary)
label*
variant   primary ghost danger
size      Choose option... sm md
loading   Set boolean
disabled  Set boolean
~~~

- [[label*]]: النجمة = prop إجباري (مفيهوش [[?]] في النوع).
- [[loading]] و [[disabled]]: مكتبناش لهم argTypes، و Storybook استنتج إنهم boolean من TypeScript. [[Set boolean]] = لسه مالهوش قيمة في الـ args، والزرار شغال بالـ default بتاع الـ component.
- [[onClick]] مش موجود: ده [[table: { disable: true }]].
- [[size]] بيقول [[Choose option...]] لأننا مبعتناش size في الـ args، فالـ component بياخد [['md']] لوحده.

### اختيار من Controls بيتكتب في الـ URL

دوسنا [[danger]] في خانة variant:

~~~text الناتج
before: btn btn-primary btn-md
after danger click: btn btn-danger btn-md | url: /?path=/story/ui-button--primary&args=variant:danger
~~~

الـ class اتغير على طول، والـ URL بقى فيه [[&args=variant:danger]]. ابعت اللينك ده لحد وهيفتح نفس الحالة. ونفس الكلام شغال على [[iframe.html]] (الـ story لوحدها):

~~~text الناتج (iframe.html?id=...&args=...)
id=ui-button--primary&args=variant:ghost;label:Send  ->  <button class="btn btn-ghost btn-md">Send</button>
id=forms-loginform--empty&args=serverError:Locked    ->  فيه "Locked" في الصفحة
id=forms-loginform--empty&args=defaultEmail:ali@example.com  ->  الخانة فاضية
~~~

[[;]] بيفصل بين أكتر من arg. والأخير اتجاهل: Storybook بيرفض الحروف الخاصة زي [[@]] في args الـ URL، فالقيم دي حطها في story.

---

## ٣. الـ stories

~~~text src/components/Button.stories.tsx
export const Primary: Story = {}
export const Danger: Story = { args: { variant: 'danger', label: 'Delete' } }
export const Loading: Story = { args: { loading: true } }
~~~

[[Primary]] = الـ args بتاعة الـ meta بس. [[Danger]] بتكتب فوق اتنين منهم. وفي [[index.json]] بتاع السيرفر:

~~~text الناتج (index.json)
ui-button--docs                       docs   UI/Button | Docs | dev,test,manifest,autodocs
ui-button--primary                    story  UI/Button | Primary
ui-button--danger                     story  UI/Button | Danger
ui-button--loading                    story  UI/Button | Loading
ui-button--all-sizes                  story  UI/Button | All Sizes
forms-loginform--empty                story  Forms/LoginForm | Empty
forms-loginform--prefilled            story  Forms/LoginForm | Prefilled
forms-loginform--server-error         story  Forms/LoginForm | Server Error
~~~

- الـ id = الـ title بـ kebab-case + [[--]] + اسم الـ export بـ kebab-case. [[AllSizes]] بقت [[all-sizes]] واسمها في الـ sidebar [[All Sizes]].
- [[ui-button--docs]] من نوع [[docs]]: دي صفحة autodocs. الـ LoginForm ملهوش صفحة Docs لأن الـ meta بتاعه مفيهوش [[tags: ['autodocs']]].
- [[dev,test]]: tags بيحطها Storybook لوحده، و [[test]] معناها إن الـ story دي هتشتغل كـ test في Vitest (الدرس الرابع).

### صفحة Docs

~~~text الناتج (جدول الـ props في /?path=/docs/ui-button--docs)
label*    string    -
variant   union     'primary'
size      union     'md'
loading   boolean   false
disabled  boolean   false
~~~

العمود التالت هو الـ default: Storybook قراه من [[variant = 'primary']] في الـ destructuring بتاع الـ component.

---

## ٤. [[render]]: أكتر من نسخة في story واحدة

~~~text src/components/Button.stories.tsx
export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button {...args} size="sm" />
      <Button {...args} size="md" />
    </div>
  ),
}
~~~

- [[render]] بياخد الـ args الحالية (بعد Controls) ويرجّع JSX.
- [[{...args}]]: ابعت كل الـ args كـ props (spread)، وبعدها [[size]] ثابتة بتكتب فوق الـ size اللي جاية من الـ args.
- [[style={{ ... }}]]: القوس الأول JSX expression، والتاني object.

النتيجة: زرارين جنب بعض، وخانة variant لسه بتغيّر الاتنين، لكن خانة size ملهاش تأثير هنا لأننا ثبتناها.

---

## ٥. الفورم

~~~text src/components/LoginForm.stories.tsx
  args: { onSubmit: fn() },
  argTypes: { serverError: { control: 'text' } },
~~~

- [[onSubmit: fn()]]: [[onSubmit]] إجباري في النوع، فلازم يتبعت، والـ spy بيسجل القيم اللي اتبعتت (تاب Actions).
- [[serverError: { control: 'text' }]]: خانة نص، تكتب فيها رسالة وتشوفها تحت الفورم.

و [[ServerError]] story فيها الرسالة ثابتة، عشان الحالة دي تفضل موجودة ويتعملها test (الدرس الرابع بيضيف stories بـ [[play]] للفورم).

---

## الخلاصة

| الحتة | دورها |
|---|---|
| [[component]] + TypeScript | Controls أوتوماتيك لكل prop |
| [[argTypes.control]] | نوع الخانة: [[inline-radio]] و [[select]] و [[text]] ... |
| [[table: { disable: true }]] | تخفي prop من Controls و Docs |
| [[args]] في الـ meta وفي الـ story | قيم افتراضية، والـ story بتكتب فوقها |
| [[&args=name:value]] في الـ URL | لينك لحالة معينة (من غير حروف خاصة) |
| [[tags: ['autodocs']]] | صفحة Docs فيها جدول الـ props بالـ defaults |
| [[render]] | ترسم بإيدك (مقارنة أشكال)، والـ args اللي ثبتها بتبطل تأثر |`,
          lines: [
            R`أنواع TypeScript بس من الـ framework بتاع Storybook لـ React مع Vite: [[Meta]] نوع الإعداد المشترك للملف، و [[StoryObj]] نوع الـ story الواحدة. بتتمسح وقت الـ build ومبتزوّدش حاجة في الـ bundle.`,
            R`[[fn()]] بتعمل spy: دالة وهمية بتسجّل كل مرة اتنادت وبأنهي arguments، وبتظهر في تاب Actions. بنستخدمها مكان أي callback prop زي [[onClick]] عشان نشوف الضغطات ونتأكد منها في [[play]].`,
            R`الـ component اللي الملف ده بيعرض حالاته، وهو اللي Storybook هيقرا منه أنواع الـ props.`,
            R`الإعداد المشترك لكل الـ stories في الملف، وبيتبعت كـ default export تحت. أي حاجة فيه (args و argTypes) بتتطبق على كل story إلا لو الـ story كتبت فوقها.`,
            R`مكان الـ component في الـ sidebar: فولدر [[UI]] وتحته [[Button]]، والـ [[/]] هي اللي بتعمل الفولدرات. لو شلته Storybook بيطلّع الاسم من مكان الملف.`,
            R`الـ component اللي هيترسم، ومنه Storybook بيقرا نوع الـ props عشان يطلّع الـ controls لوحده (boolean يبقى switch، و string يبقى خانة نص).`,
            R`[[autodocs]] بيعمل للـ component صفحة Docs لوحده: الـ stories كلها في صفحة واحدة ومعاها جدول بكل الـ props وأنواعها والـ controls بتاعتها، من غير ما تكتب توثيق بإيدك.`,
            R`[[args]] هي الـ props اللي بتتبعت للـ component في كل الـ stories: الزرار مكتوب عليه Save، و [[onClick]] spy من [[fn()]]. والـ controls بتبدأ من القيم دي، ولو غيّرت حاجة من الـ panel الـ story بتترسم تاني بالقيمة الجديدة.`,
            R`[[argTypes]] بتظبط كل control بيظهر إزاي، لما الشكل اللي Storybook بيطلّعه لوحده مش مناسب. المفتاح هو اسم الـ prop.`,
            R`[[variant]] يبقى radio buttons جنب بعض ([[inline-radio]]) بالاختيارات دي بس. من غيره، لو النوع string عادي هيبقى خانة نص وأي حد يكتب فيها قيمة مش موجودة.`,
            R`[[size]] قايمة منسدلة ([[select]]) فيها [[sm]] و [[md]]. الـ select أحسن من الـ radio لما الاختيارات كتير أو المساحة ضيقة.`,
            R`بنخبّي [[onClick]] من جدول الـ controls والـ Docs، لأن الـ spy ملوش قيمة تتعدّل بإيدك وبيزحم الجدول بس. الـ spy نفسه شغال عادي وبيظهر في Actions.`,
            R`قفلة [[argTypes]].`,
            R`[[satisfies]] بيخلي TypeScript يتأكد إن الـ object ماشي على شكل [[Meta]] من غير ما يغيّر نوعه للنوع العام، فالنوع اللي تحت يفضل عارف إن [[label]] و [[onClick]] اتبعتوا هنا.`,
            R`Storybook بيقرا الـ default export عشان يعرف الـ component والإعدادات، وكل named export تاني في الملف بيبقى story.`,
            R`نوع الـ stories مبني من الـ meta نفسه: لأن [[label]] و [[onClick]] موجودين في [[args]] فوق، الـ stories مش لازم تكتبهم تاني، و TypeScript هيعترض لو بعتت prop مش موجودة في الـ component.`,
            R`story اسمها Primary (من اسم الـ export)، و [[{}]] معناها «الـ args المشتركة زي ما هي»: زرار Save عادي.`,
            R`story بتكتب فوق اتنين من الـ args: [[variant]] بقى [[danger]] و [[label]] بقى Delete، والباقي ([[onClick]]) جاي من الـ meta. كده تشوف زرار المسح من غير ما تكرر كل حاجة.`,
            R`حالة التحميل: [[loading: true]] بيوريك شكل الزرار وهو مستني، وهي حالة صعب تلحق تشوفها في التطبيق الحقيقي لأنها بتعدّي بسرعة.`,
            R`story بترسم بإيدها بدل الرسم الافتراضي (component واحد بالـ args)، عشان نعرض كذا نسخة جنب بعض في نفس الـ story.`,
            R`[[render]] دالة بتاخد الـ args الحالية (بعد تعديلات الـ controls) وترجّع JSX، فالـ controls لسه بتأثر على النسختين.`,
            R`صف ([[display: 'flex']]) بمسافة 8px بين الزراير، عشان المقارنة بين المقاسات تبقى واضحة. (القوسين: الأولانيين «JS جوه JSX» والتانيين الـ object.)`,
            R`نسخة صغيرة: [[{...args}]] بيوزّع كل الـ args، و [[size="sm"]] مكتوب بعدها فبيكسب. عشان كده control الـ size مش هيغيّر النسختين دول.`,
            R`ونسخة بالمقاس العادي بنفس الـ args، جنب الصغيرة.`,
            R`قفلة الـ div اللي لافف الزرارين.`,
            R`قفلة دالة [[render]].`,
            R`قفلة الـ story.`,
            R`meta لملف تاني ([[LoginForm.stories.tsx]])، عشان نشوف نفس الأفكار على فورم.`,
            R`مكانه في الـ sidebar: فولدر [[Forms]] وتحته [[LoginForm]]، بعيد عن الـ UI components الصغيرة.`,
            R`الـ component اللي هيترسم، ونوع الـ props بتاعته هو اللي بيطلّع الـ controls.`,
            R`[[onSubmit]] prop إجباري في الفورم فلازم يتبعت في كل story، وبنبعته spy بـ [[fn()]] عشان نشوف الفورم بعت إيه ونتأكد منه في [[play]].`,
            R`بنقول صراحةً إن [[serverError]] control بتاعه خانة نص، تكتب فيها أي رسالة وتشوف شكلها. مفيد لما الـ prop اختياري و Storybook ميطلّعلوش control مناسب لوحده.`,
            R`نفس الـ [[satisfies]] اللي فوق: TypeScript يتأكد من الـ meta من غير ما يضيّع إن [[onSubmit]] اتبعت.`,
            R`الفورم فاضي بالـ args المشتركة بس، ودي الحالة اللي المستخدم بيشوفها أول ما يفتح الصفحة.`,
            R`الفورم والإيميل مكتوب فيه من الأول عن طريق [[defaultEmail]]، زي لما المستخدم يرجع بعد ما سجّل خروج.`,
            R`الفورم ومعاه رسالة خطأ من السيرفر، عشان تشوف شكلها ومكانها من غير ما تحتاج سيرفر يرد بخطأ فعلًا.`,
          ],
          sol: R`في تاب Controls بتاع UI/Button هتلاقي [[label*]] و [[variant]] (primary ghost danger جنب بعض) و [[size]] (قايمة) و [[loading]] و [[disabled]] ([[Set boolean]])، ومفيش [[onClick]]. دوسة على danger غيّرت الـ class لـ [[btn btn-danger btn-md]] والـ URL بقى فيه [[&args=variant:danger]].

في صفحة Docs ([[ui-button--docs]]) الجدول فيه نفس الـ props بالنوع والـ default ([[variant]] = [['primary']] و [[size]] = [['md']])، و [[onClick]] مش موجود. ولينك [[iframe.html?id=forms-loginform--empty&args=serverError:Locked]] عرض «Locked» تحت الفورم، لكن [[args=defaultEmail:ali@example.com]] اتجاهلت عشان الـ [[@]]. (متجرّب على Storybook 10.6.5 بـ Chromium headless على ويندوز.)`
        },
        {
          cmd: "decorators و globals",
          title: "لف كل story بالـ providers: theme و router و RTL من الـ toolbar",
          desc: R`الـ decorator دالة بتلف الـ story بحاجة قبل ما تترسم، ولو حطيته في [[.storybook/preview.tsx]] بيلف كل الـ stories: [[ThemeProvider]] و [[MemoryRouter]] و [[<div dir="rtl">]]. ومن غير كده أي component بيستخدم [[useTheme]] أو [[NavLink]] بيقع.

و [[globalTypes]] بتعمل زراير في الـ toolbar (light/dark و ltr/rtl) الـ decorator بيقراها من [[globals]]، و [[parameters]] بتبعت إعداد لـ story واحدة (زي الصفحة اللي الـ router يبدأ منها).`,
          example: R`// .storybook/preview.tsx
import type { Preview } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router'
import { ThemeProvider, type Theme } from '../src/theme/ThemeProvider'
import '../src/theme/theme.css'

const preview: Preview = {
  globalTypes: {
    theme: { description: 'Theme', toolbar: { icon: 'paintbrush', items: ['light', 'dark'], dynamicTitle: true } },
    dir: { description: 'Direction', toolbar: { icon: 'transfer', items: ['ltr', 'rtl'], dynamicTitle: true } },
  },
  initialGlobals: { theme: 'light', dir: 'ltr' },
  decorators: [
    (Story, { globals, parameters }) => {
      document.documentElement.dir = globals.dir
      return (
        <MemoryRouter initialEntries={[parameters.route ?? '/']}>
          <ThemeProvider theme={globals.theme as Theme}>
            <div dir={globals.dir}><Story /></div>
          </ThemeProvider>
        </MemoryRouter>
      )
    },
  ],
}
export default preview
// src/components/SideNav.stories.tsx
export const OrdersActive: Story = {
  parameters: { route: '/orders' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: 'Orders' })).toHaveAttribute('aria-current', 'page')
  },
}
export const ArabicDark: Story = {
  globals: { dir: 'rtl', theme: 'dark' },
  play: async ({ canvasElement }) => {
    await expect(document.documentElement.dir).toBe('rtl')
    await expect(canvasElement.querySelector('[data-theme]')).toHaveAttribute('data-theme', 'dark')
  },
}`,
          try: R`اعمل [[ThemeProvider]] و [[SideNav]] بـ [[NavLink]] (الكود في الشرح)، و [[npm i react-router]]. افتح SideNav واقلب light/dark و ltr/rtl من الـ toolbar. بعدين شيل [[<ThemeProvider>]] من الـ decorator وشغّل [[npx vitest --project=storybook --run src/components/SideNav.stories.tsx]]: إيه الخطأ؟ رجّعه وشيل [[<MemoryRouter>]] بداله.`,
          flag: "script",
          deep: {
            why: R`في التطبيق الـ component بيبقى جوه providers كتير متركّبين في [[main.tsx]]: theme، و router، و QueryClient، و i18n. Storybook بيرسم الـ component لوحده، فلو مفيش حد عمل نفس اللفة الـ component هيقع، أو هيترسم بشكل غلط (من غير ألوان الـ theme، أو شمال لليمين في تطبيق عربي). والـ toolbar بيخلي أي حد يشوف كل component في dark و RTL بدوسة، بدل ما الحالات دي تتنسي لحد ما عميل يشتكي.`,
            how: R`الـ decorator بياخد [[Story]] (الـ story نفسها كـ component) و context فيه [[args]] و [[globals]] و [[parameters]] وغيرهم، ويرجّع JSX. الـ decorators في [[preview.tsx]] بتلف كل الـ stories، واللي في الـ meta بتلف ملف واحد، واللي في الـ story بتلفها هي بس. والأقرب للـ story بيبقى جوه.

[[globalTypes]] بتعرّف قيمة واحدة لكل الـ stories، و [[toolbar.items]] بتعمل منها قايمة فوق، و [[dynamicTitle]] بيكتب القيمة الحالية على الزرار. و [[initialGlobals]] البداية. والـ story تقدر تثبّت قيمة لنفسها بـ [[globals: { dir: 'rtl' }]]، وده اللي بيخلي الحالة دي تتعمل test. و [[parameters]] بيانات ثابتة لأي حد يقراها: الـ addons (زي [[a11y]] في الدرس الخامس) أو الـ decorator بتاعك ([[parameters.route]] هنا).

[[MemoryRouter]] router في الذاكرة من غير URL حقيقي، فمش هيلعب في URL بتاع Storybook نفسه، و [[initialEntries]] الصفحة اللي بيبدأ منها. و [[document.documentElement.dir]] بيقلب [[<html>]] نفسه، عشان الحاجات اللي بتترسم برا الـ div بـ portal (dialogs و tooltips، درس «createPortal») تتقلب هي كمان.`,
            when: R`أي provider الـ components بتحتاجه في التطبيق لازم يبقى decorator: theme، و router، و [[QueryClientProvider]] (بـ QueryClient جديد لكل story عشان الكاش ميتشاركش)، و i18n. ولو التطبيق عربي أو بلغتين، الـ dir global من أول يوم. ونفس فكرة «لف بالـ providers» في الـ tests العادية في درس «wrapper بالـ providers».`,
            mistakes: R`decorator بيعمل [[new QueryClient()]] برا الدالة، فكل الـ stories بتشارك كاش واحد وstory بتاخد بيانات story تانية. و [[BrowserRouter]] بدل [[MemoryRouter]]، فالـ router بيقرا URL بتاع Storybook نفسه ([[/iframe.html]]) ومفيش لينك active. وقلب [[dir]] على div بس، فالـ dialog اللي بـ portal يفضل شمال لليمين. وتنسى إن [[globals]] بتاعة الـ toolbar بتفضل محفوظة وانت بتنقل بين الـ stories، فتفتكر إن component اتكسر وهو بس لسه على dark.`
          },
          teach: R`## الفكرة: نفس اللفة اللي في [[main.tsx]]، بس في [[preview.tsx]]

اتشغّل على Storybook 10.6.5 و react-router 8.5.1، والتحقق من الـ toolbar والـ stories اتعمل بـ Playwright في Chromium headless وبـ [[npx vitest --project=storybook --run]] على ويندوز.

---

## ١. الـ components اللي محتاجة providers

~~~text src/theme/ThemeProvider.tsx
export type Theme = 'light' | 'dark'
const ThemeContext = createContext<Theme | null>(null)

export function ThemeProvider({ theme, children }: { theme: Theme; children: ReactNode }) {
  return (
    <ThemeContext.Provider value={theme}>
      <div data-theme={theme} className="app-theme">{children}</div>
    </ThemeContext.Provider>
  )
}
export function useTheme() {
  const t = useContext(ThemeContext)
  if (!t) throw new Error('useTheme must be used inside <ThemeProvider>')
  return t
}
~~~

context للـ theme (درس «useContext»)، و [[data-theme]] على div عشان الـ CSS يغيّر الألوان:

~~~text src/theme/theme.css
.app-theme[data-theme='light'] { --accent: #1d4ed8; --bg: #ffffff; --fg: #111827; ... }
.app-theme[data-theme='dark']  { --accent: #93c5fd; --on-accent: #111827; --bg: #111827; --fg: #f9fafb; ... }
.app-theme a { color: var(--accent); }
~~~

(السطرين [[--on-accent]] و [[a { color }]] اتضافوا بعد ما فحص a11y مسك مشكلتين في dark، الدرس الخامس.)

~~~text src/components/SideNav.tsx
import { NavLink } from 'react-router'
import { useTheme } from '../theme/ThemeProvider'

export function SideNav() {
  const theme = useTheme()
  return (
    <nav aria-label="Main" className={$__bt}sidenav sidenav-$__{theme}$__bt}>
      <NavLink to="/orders">Orders</NavLink>
      <NavLink to="/customers">Customers</NavLink>
    </nav>
  )
}
~~~

[[SideNav]] محتاج الاتنين: [[useTheme]] و [[NavLink]] (لينك بيعرف لو هو الصفحة الحالية ويحط [[aria-current="page"]]، درس «React Router»).

---

## ٢. من غير decorator: الـ component بيقع

شلنا [[<ThemeProvider>]] من الـ decorator وشغّلنا الـ tests:

~~~text الناتج
 FAIL  |storybook (chromium)| src/components/SideNav.stories.tsx > Orders Active
useTheme must be used inside <ThemeProvider>
 ❯ useTheme src/theme/ThemeProvider.tsx:15:16
 ❯ SideNav src/components/SideNav.tsx:5:16
~~~

ورجعناه وشلنا [[<MemoryRouter>]]:

~~~text الناتج
useLocation() may be used only in the context of a <Router> component.
~~~

[[NavLink]] بيسأل الـ router «إحنا فين؟» بـ [[useLocation]]، ومفيش router. الرسالتين دول أول حاجة هتشوفها لما تنقل component من التطبيق لـ Storybook.

---

## ٣. [[globalTypes]]: زراير الـ toolbar

~~~text .storybook/preview.tsx
  globalTypes: {
    theme: { description: 'Theme', toolbar: { icon: 'paintbrush', items: ['light', 'dark'], dynamicTitle: true } },
    dir: { description: 'Direction', toolbar: { icon: 'transfer', items: ['ltr', 'rtl'], dynamicTitle: true } },
  },
  initialGlobals: { theme: 'light', dir: 'ltr' },
~~~

| الحتة | معناها |
|---|---|
| [[theme]] و [[dir]] | أسامي الـ globals، والـ decorator بيقراهم بالأسامي دي |
| [[description]] | الـ tooltip على الزرار |
| [[icon]] | أيقونة من أيقونات Storybook |
| [[items]] | الاختيارات في القايمة |
| [[dynamicTitle: true]] | اكتب القيمة الحالية على الزرار |
| [[initialGlobals]] | القيم أول ما الصفحة تفتح |

زراير الـ toolbar اللي ظهرت (قريناها بـ Playwright):

~~~text الناتج
toolbar buttons: ["light","ltr","Share"]
~~~

[[light]] و [[ltr]] هم الزرارين بتوعنا، والكلام عليهم هو [[dynamicTitle]]. ومن الـ URL كمان: [[&globals=dir:rtl;theme:dark]] فتح الفورم وطلع [[html dir: rtl | theme: dark]].

---

## ٤. الـ decorator نفسه

~~~text .storybook/preview.tsx
  decorators: [
    (Story, { globals, parameters }) => {
      document.documentElement.dir = globals.dir
      return (
        <MemoryRouter initialEntries={[parameters.route ?? '/']}>
          <ThemeProvider theme={globals.theme as Theme}>
            <div dir={globals.dir}><Story /></div>
          </ThemeProvider>
        </MemoryRouter>
      )
    },
  ],
~~~

من جوه لبرة:

1. [[<Story />]]: الـ story نفسها. Storybook بيبعتها كـ component، فبنرسمها زي أي component.
2. [[<div dir={globals.dir}>]]: الـ story جوه div اتجاهه من الـ toolbar.
3. [[<ThemeProvider theme={globals.theme as Theme}>]]: [[as Theme]] بيقول لـ TypeScript «القيمة دي [['light' | 'dark']]»، لأن نوع [[globals]] عام.
4. [[<MemoryRouter initialEntries={[parameters.route ?? '/']}>]]: router بيبدأ من [[parameters.route]] بتاعة الـ story، ولو مفيش ([[??]] = لو اللي على الشمال null أو undefined) يبدأ من [[/]].
5. [[document.documentElement.dir = globals.dir]]: يقلب [[<html>]] نفسه، عشان أي حاجة بتترسم برا الـ div (portal) تتقلب كمان. (نفس فكرة درس «RTL».)

و [[(Story, { globals, parameters })]]: التاني هو الـ context، وبناخد منه الاتنين بالـ destructuring.

---

## ٥. الـ stories بتستخدم الإعداد ده

~~~text src/components/SideNav.stories.tsx
export const OrdersActive: Story = {
  parameters: { route: '/orders' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: 'Orders' })).toHaveAttribute('aria-current', 'page')
  },
}
~~~

- [[parameters: { route: '/orders' }]]: الـ decorator هيعمل [[initialEntries={['/orders']}]].
- الـ [[play]] بيتأكد إن لينك Orders هو الـ active ([[aria-current="page"]]). يعني الـ router شغال فعلًا، مش بس الـ component مقعش. ([[play]] بالتفصيل في الدرس الجاي.)

~~~text src/components/SideNav.stories.tsx
export const ArabicDark: Story = {
  globals: { dir: 'rtl', theme: 'dark' },
  play: async ({ canvasElement }) => {
    await expect(document.documentElement.dir).toBe('rtl')
    await expect(canvasElement.querySelector('[data-theme]')).toHaveAttribute('data-theme', 'dark')
  },
}
~~~

- [[globals: { dir: 'rtl', theme: 'dark' }]]: الـ story دي دايمًا عربي و dark، مهما كان الـ toolbar. عشان الحالة دي تتعمل test كل مرة.
- [[canvasElement]]: عنصر الـ DOM اللي الـ story اترسمت فيه، و [[querySelector('[data-theme]')]] بيجيب أول عنصر عنده attribute ده (الـ div بتاع ThemeProvider).

~~~text الناتج (npx vitest --project=storybook --run src/components/SideNav.stories.tsx --reporter=verbose)
 ✓ |storybook (chromium)| src/components/SideNav.stories.tsx > Orders Active 504ms
 ✓ |storybook (chromium)| src/components/SideNav.stories.tsx > Arabic Dark 52ms
      Tests  2 passed (2)
~~~

(أول مرة [[Arabic Dark]] فشلت، مش بسبب الـ decorator: فحص a11y لقى إن لون اللينك الافتراضي [[#0000ee]] على خلفية dark [[#111827]] نسبة الـ contrast بتاعته 1.88. ده الدرس الخامس.)

---

## الخلاصة

| الحتة | دورها |
|---|---|
| [[decorators]] في [[preview.tsx]] | يلف كل الـ stories بنفس providers التطبيق |
| [[(Story, context)]] | [[context.globals]] من الـ toolbar، و [[context.parameters]] من الـ story |
| [[globalTypes]] + [[initialGlobals]] | زراير theme و dir في الـ toolbar |
| [[globals]] في الـ story | تثبّت حالة (rtl + dark) عشان تتعمل test |
| [[MemoryRouter]] + [[parameters.route]] | router في الذاكرة بيبدأ من الصفحة اللي الـ story عايزاها |
| [[document.documentElement.dir]] | يقلب [[<html>]] عشان الـ portals |

لو component وقع بـ «must be used inside» أو «in the context of a <Router>»، ناقص decorator.`,
          lines: [
            R`نوع [[Preview]]، شكل ملف [[.storybook/preview.tsx]] اللي إعداداته بتتطبق على كل الـ stories في المشروع. نوع بس، فبيتمسح وقت الـ build.`,
            R`[[MemoryRouter]] router بيحفظ الصفحة الحالية في الذاكرة مش في URL المتصفح، فمش هيلعب في URL بتاع Storybook نفسه. من غير router، أي component فيه [[Link]] أو [[useNavigate]] هيقع.`,
            R`الـ provider بتاع الـ theme في التطبيق، و [[Theme]] نوع القيم المسموحة ([[light]] أو [[dark]]). بنستخدم الـ provider الحقيقي مش نسخة مزيفة، عشان الـ stories تشبه التطبيق.`,
            R`بيحمّل CSS الـ theme (المتغيرات والألوان) مرة واحدة لكل الـ stories، زي ما التطبيق بيحمّله في [[main.tsx]]. من غيره الـ components هتترسم من غير ألوانها.`,
            R`الإعداد العام اللي هيتبعت كـ default export تحت.`,
            R`[[globalTypes]] بتعرّف قيم عامة واحدة لكل الـ stories، وكل واحدة ليها زرار في الـ toolbar فوق تغيّرها منه.`,
            R`[[theme]] قيمة عامة ليها قايمة في الـ toolbar فيها [[light]] و [[dark]]. [[icon]] شكل الزرار، و [[dynamicTitle]] بيكتب القيمة المختارة على الزرار نفسه فتعرف انت فين من غير ما تفتحه، و [[description]] النص اللي بيظهر وقت الـ hover.`,
            R`[[dir]] قيمة عامة تانية للاتجاه ([[ltr]] أو [[rtl]])، عشان تشوف أي component بالعربي بضغطة من غير ما تكتب story مخصوص.`,
            R`قفلة [[globalTypes]].`,
            R`القيم اللي الـ globals بتبدأ بيها أول ما Storybook يفتح: light و ltr.`,
            R`[[decorators]] قايمة دوال، كل واحدة بتلف الـ story بحاجة قبل ما تترسم. ولما تتحط في [[preview.tsx]] بتلف كل الـ stories في المشروع.`,
            R`الـ decorator بياخد [[Story]] (الـ story كـ component) والـ context، ومنه بناخد [[globals]] (قيم الـ toolbar) و [[parameters]] (إعدادات الـ story). وبيتنادى تاني كل ما الـ globals تتغير، فالـ story تترسم بالقيم الجديدة.`,
            R`بيحط [[dir]] على عنصر [[<html>]] نفسه. ليه مش كفاية الـ div؟ لأن الحاجات اللي بتترسم بـ portal (modal و tooltip و dropdown) بتتحط في [[body]] برّه الـ div، فمش هتاخد اتجاهه.`,
            R`بداية الـ JSX اللي هيلف الـ story.`,
            R`router بيبدأ من الصفحة اللي الـ story طلبتها في [[parameters.route]]، ولو مطلبتش يبدأ من [[/]]. و [[initialEntries]] قايمة صفحات الـ history، واحنا بنبعت فيها صفحة واحدة.`,
            R`الـ theme اللي اتختار من الـ toolbar بيتبعت للـ provider. الـ [[as Theme]] لأن الـ globals نوعها عام في TypeScript، واحنا عارفين إن القيم [[light]] أو [[dark]] بس من [[items]] فوق.`,
            R`div بالاتجاه المختار وجواه [[<Story />]]، وده رسم الـ story نفسها بالـ args بتاعتها. لو نسيت [[<Story />]] الـ story مش هتظهر خالص.`,
            R`قفلة [[ThemeProvider]]: كل اللي جواه بياخد الـ theme المختار.`,
            R`قفلة [[MemoryRouter]]: الـ provider الخارجي، فالـ theme والـ story الاتنين جوه الـ router.`,
            R`قفلة قوس الـ [[return]].`,
            R`قفلة الـ decorator.`,
            R`قفلة قايمة [[decorators]].`,
            R`قفلة [[preview]].`,
            R`Storybook بيقرا الـ default export بتاع [[preview.tsx]] ويطبّقه على كل الـ stories.`,
            R`story (في ملف stories بتاع الـ SideNav) بتبدأ الـ router على صفحة [[/orders]]، عشان نشوف لينك Orders وهو active.`,
            R`[[parameters]] إعدادات للـ story، و [[route]] اسم احنا اخترناه والـ decorator فوق بيقراه. دي الطريقة اللي الـ story بتكلم بيها الـ decorator.`,
            R`[[play]] بتشتغل بعد ما الـ story تترسم، و [[canvas]] أدوات بحث جوه الـ story بس.`,
            R`بيدوّر على لينك اسمه Orders ويتأكد إن عليه [[aria-current="page"]]، وده اللي [[NavLink]] بيحطه على لينك الصفحة الحالية. لو الـ router مش بادئ من [[/orders]] الاختبار هيفشل، فده بيثبت إن الـ decorator قرا الـ parameter.`,
            R`قفلة [[play]].`,
            R`قفلة الـ story.`,
            R`story بتثبّت عربي و dark دايمًا مهما الـ toolbar فيه إيه، عشان الحالة دي تتختبر في كل مرة الـ tests تشتغل.`,
            R`[[globals]] على مستوى الـ story بتثبّت القيم دي للـ story دي بس، وزراير الـ toolbar بتاعتها بتتقفل وهي مفتوحة.`,
            R`[[play]] هنا بتاخد [[canvasElement]]، وده عنصر الـ DOM اللي الـ story مترسومة جواه، عشان نقدر نعمل [[querySelector]] عادي.`,
            R`بنتأكد إن الـ decorator قلب [[<html>]] نفسه لـ [[rtl]]، مش الـ div بس. والـ [[await]] لأن [[expect]] بتاعة Storybook بتتسجّل كخطوة في تاب Interactions.`,
            R`بندوّر على أول عنصر عليه [[data-theme]] (اللي الـ ThemeProvider بيحطه) ونتأكد إن قيمته [[dark]]، يعني قيمة الـ globals وصلت للـ provider فعلًا.`,
            R`قفلة [[play]].`,
            R`قفلة الـ story.`,
          ],
          sol: R`من غير [[<ThemeProvider>]] الاتنين stories فشلوا بـ [[useTheme must be used inside <ThemeProvider>]] (من [[ThemeProvider.tsx:15]] جاي من [[SideNav.tsx:5]])، ومن غير [[<MemoryRouter>]] فشلوا بـ [[useLocation() may be used only in the context of a <Router> component.]]. بعد ما رجعوا: [[Orders Active]] و [[Arabic Dark]] نجحوا.

في الـ toolbar فيه زرارين مكتوب عليهم [[light]] و [[ltr]] (ده [[dynamicTitle]])، ولما تقلبهم الـ story بتتقلب، و [[<html dir>]] بيبقى [[rtl]]. ولو فتحت [[iframe.html?id=forms-loginform--empty&globals=dir:rtl;theme:dark]] هتلاقي [[html dir: rtl]] و [[data-theme="dark"]]. (متجرّب على Storybook 10.6.5 و react-router 8.5.1 على ويندوز.)`,
          solCode: R`npm i react-router
npx vitest --project=storybook --run src/components/SideNav.stories.tsx --reporter=verbose`
        },
        {
          cmd: "addon-vitest",
          title: "play functions كـ tests: شغّلها headless بـ Vitest وفي GitHub Actions",
          desc: R`أي story فيها [[play]] بتبقى اختبار تفاعل: بتكتب في الفورم وتدوس وتتأكد بـ [[expect]]. و [[@storybook/addon-vitest]] بيشغّل كل الـ stories (حتى اللي من غير play: «اترسمت من غير خطأ؟») كـ tests في Chromium headless بأمر واحد: [[npx vitest --project=storybook --run]].

ده البديل الحالي لـ [[@storybook/test-runner]] القديم (Jest + Playwright)، وفي CI بيبقى job بيسطّب Chromium ويشغّل نفس الأمر، وبعده job يبني Storybook وينشره على GitHub Pages.`,
          example: R`// src/components/LoginForm.stories.tsx (كمّل على stories درس argTypes)
import { fn, expect } from 'storybook/test'

export const ShowsErrorsWhenEmpty: Story = {
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Sign in' }))
    const alerts = await canvas.findAllByRole('alert')
    await expect(alerts.map(a => a.textContent)).toEqual(['Enter a valid email', 'Password must be at least 8 characters'])
    await expect(args.onSubmit).not.toHaveBeenCalled()
  },
}
export const SubmitsValidValues: Story = {
  play: async ({ canvas, userEvent, args, step }) => {
    await step('fill the form', async () => {
      await userEvent.type(canvas.getByLabelText('Email'), 'ali@example.com')
      await userEvent.type(canvas.getByLabelText('Password'), 'secret123')
    })
    await userEvent.click(canvas.getByRole('button', { name: 'Sign in' }))
    await expect(args.onSubmit).toHaveBeenCalledWith({ email: 'ali@example.com', password: 'secret123' })
  },
}
// في الترمنال: npx vitest --project=storybook --run`,
          try: R`ضيف الـ stories دي لـ LoginForm وشغّل [[npx vitest --project=storybook --run --reporter=verbose]]. بعدين غيّر رسالة [['Enter a valid email']] في الـ component لـ [['Invalid email']] وشغّل تاني: الرسالة بتقولك إيه، وفيها لينك لإيه؟ وآخر حاجة اكتب [[.github/workflows/storybook.yml]] فيه job للـ tests و job للنشر.`,
          flag: "script",
          deep: {
            why: R`الـ stories بتوصف كل حالة للـ component، فلو كتبت الحالات تاني في ملف [[.test.tsx]] هتبقى بتكتب نفس الشغل مرتين. مع addon-vitest الـ story هي الـ test: لو حد بوّظ الـ component، الـ story اللي كانت بتترسم هتفشل في CI، ولو فيه play هيفشل التفاعل. ولأنه متصفح حقيقي مش jsdom، الـ CSS والـ focus والـ layout حقيقيين.`,
            how: R`الـ plugin [[storybookTest]] في [[vite.config.ts]] بيقرا [[.storybook/main.ts]]، وبيحوّل كل story عليها tag [[test]] (الافتراضي) لـ test اسمه اسم الـ story. كل test بيرسم الـ story بالـ decorators والـ globals بتوعها، ويشغّل [[play]] لو موجود، ويشغّل فحص a11y لو [[a11y.test]] مش [[off]]. ده كله جوه Vitest browser mode بـ provider [[playwright]] و [[headless: true]].

جوه [[play]]: [[canvas]] فيه queries بتاعة Testing Library ([[getByRole]] و [[findAllByRole]] و [[getByLabelText]])، و [[userEvent]] جاهز، و [[args]] فيها الـ spies، و [[step]] بيجمّع خطوات تحت اسم في تاب Interactions. و [[expect]] من [[storybook/test]] لازم معاه [[await]] عشان الخطوات تتسجل بالترتيب.

[[--project=storybook]] بيشغّل الـ project ده بس (لو عندك project تاني للـ unit tests)، و [[--run]] مرة واحدة من غير watch. و [[@storybook/test-runner]] القديم كان بيحتاج Storybook شغال أو مبني وبيشغّل Jest + Playwright عليه. الـ docs بتاعة الإصدار الجاي بتقول إن الدعم الرسمي ليه انتهى وإن addon-vitest هو البديل. والـ addon محتاج Vite builder، فمشروع Webpack لازم ينقل لـ Vite الأول.`,
            when: R`لأي component فيه تفاعل أو حالات بتتغير: فورم بتحقق، و dropdown، و جدول بـ sort. والـ unit tests العادية بـ Vitest + Testing Library (قسم «الاختبارات») لسه مكانها للـ hooks والدوال وال logic اللي ملوش شكل، و Playwright e2e (تاب «جودة الكود») للرحلة كلها في التطبيق الحقيقي مع API.`,
            mistakes: R`تنسى [[await]] قبل [[expect]] أو [[userEvent]]، فالـ test بيخلص قبل التفاعل وينجح وهو مش مختبر حاجة. و [[getByRole('alert')]] بدل [[findAllByRole]] لعناصر بتظهر بعد state update. وفي CI تنسى [[npx playwright install --with-deps chromium]]، فـ Vitest بيدوّر على متصفح مش موجود (و [[--with-deps]] بيسطّب مكتبات لينكس اللي Chromium محتاجها). وتعتمد على رقم السطر في الـ stack trace: في التجربة الخطأ أشّر على سطر [[Prefilled]] مش سطر الـ [[expect]]، فاقرا اسم الـ story ورسالة الـ diff.`
          },
          teach: R`## الفكرة: كل story = test، واللي فيها [[play]] = test تفاعل

اتشغّل على ويندوز 11 بـ Vitest 4.1.10 و Playwright 1.64.1 (Chrome for Testing 156 headless)، وتاني على لينكس في [[docker run --rm node:22-slim]] بـ Node 22.23.3. الـ workflow اتفحص بـ actionlint 1.7.12 (Docker image [[rhysd/actionlint]])، والنشر على GitHub Pages نفسه من الـ docs بتاعة actions/deploy-pages لأنه محتاج repo حقيقي.

---

## ١. story بتتأكد من رسايل الخطأ

~~~text src/components/LoginForm.stories.tsx
export const ShowsErrorsWhenEmpty: Story = {
  play: async ({ canvas, userEvent, args }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Sign in' }))
    const alerts = await canvas.findAllByRole('alert')
    await expect(alerts.map(a => a.textContent)).toEqual(['Enter a valid email', 'Password must be at least 8 characters'])
    await expect(args.onSubmit).not.toHaveBeenCalled()
  },
}
~~~

بالترتيب:

1. [[userEvent.click(canvas.getByRole('button', { name: 'Sign in' }))]]: دوس Sign in والفورم فاضي.
2. [[await canvas.findAllByRole('alert')]]: [[findAll]] بيستنى لحد ما عنصر واحد على الأقل يظهر (لحد ثانية تقريبًا) ويرجّع كلهم. [[getBy]] كان هيدوّر مرة واحدة بس. (درس «getByRole و findBy».)
3. [[alerts.map(a => a.textContent)]]: حوّل العناصر لنصوصها، و [[toEqual]] بتقارن الـ array كلها بالترتيب.
4. [[expect(args.onSubmit).not.toHaveBeenCalled()]]: [[.not]] بتعكس. الفورم الغلط ميتبعتش.

---

## ٢. story بتملا الفورم وتبعت

~~~text src/components/LoginForm.stories.tsx
export const SubmitsValidValues: Story = {
  play: async ({ canvas, userEvent, args, step }) => {
    await step('fill the form', async () => {
      await userEvent.type(canvas.getByLabelText('Email'), 'ali@example.com')
      await userEvent.type(canvas.getByLabelText('Password'), 'secret123')
    })
    await userEvent.click(canvas.getByRole('button', { name: 'Sign in' }))
    await expect(args.onSubmit).toHaveBeenCalledWith({ email: 'ali@example.com', password: 'secret123' })
  },
}
~~~

- [[step('fill the form', async () => {...})]]: بيجمّع الخطوتين تحت عنوان واحد في تاب Interactions، فلما story طويلة تفشل تعرف في أنهي جزء.
- [[getByLabelText('Email')]]: الخانة اللي الـ label بتاعها Email. شغال لأن الـ input جوه [[<label>]].
- [[userEvent.type]]: بيكتب حرف حرف زي المستخدم.
- [[toHaveBeenCalledWith({...})]]: الـ spy اتنادى بالقيم دي بالظبط. ده بيختبر إن [[FormData]] اتقرت صح.

---

## ٣. التشغيل headless

~~~powershell
npx vitest --project=storybook --run --reporter=verbose
~~~

| الحتة | معناها |
|---|---|
| [[npx vitest]] | شغّل Vitest اللي في المشروع |
| [[--project=storybook]] | الـ project اللي التسطيب ضافه في [[vite.config.ts]] بس |
| [[--run]] | مرة واحدة واقفل (من غيرها بيفضل watch) |
| [[--reporter=verbose]] | سطر لكل test |

~~~text الناتج (ويندوز)
 RUN  v4.1.10 ...\sb-lab
 ✓ |storybook (chromium)| src/components/LoginForm.stories.tsx > Empty 709ms
 ✓ |storybook (chromium)| src/components/LoginForm.stories.tsx > Prefilled 67ms
 ✓ |storybook (chromium)| src/components/Button.stories.tsx > Primary 791ms
 ...
 ✓ |storybook (chromium)| src/components/LoginForm.stories.tsx > Shows Errors When Empty 123ms
 ✓ |storybook (chromium)| src/components/LoginForm.stories.tsx > Submits Valid Values 266ms
 Test Files  3 passed (3)
      Tests  11 passed (11)
   Duration  5.49s
~~~

- [[|storybook (chromium)|]]: اسم الـ project والمتصفح.
- [[Empty]] و [[Primary]] ملهمش [[play]]، وبرضه اتعدّوا tests: الـ test بتاعهم «الـ story اترسمت من غير exception» (وفحص a11y، الدرس الجاي).
- أول test في كل ملف أبطأ (709ms) لأن المتصفح بيحمّل الـ modules، والباقي عشرات الـ ms.

### لما حاجة تتكسر

غيّرنا الرسالة في الـ component لـ [['Invalid email']]:

~~~text الناتج
 FAIL  |storybook (chromium)| src/components/LoginForm.stories.tsx > Shows Errors When Empty
AssertionError:
Click to debug the error directly in Storybook: http://localhost:6006/?path=/story/forms-loginform--shows-errors-when-empty&addonPanel=storybook/interactions/panel
expected [ 'Invalid email', …(1) ] to deeply equal [ 'Enter a valid email', …(1) ]
- Expected
+ Received
  Array [
-   "Enter a valid email",
+   "Invalid email",
    "Password must be at least 8 characters",
  ]
 Test Files  1 failed | 2 passed (3)
      Tests  1 failed | 10 passed (11)
exit 1
~~~

- [[Click to debug ...]]: لينك للـ story نفسها وتاب Interactions مفتوح (لو [[npm run storybook]] شغال على 6006).
- [[- Expected]] / [[+ Received]]: السطر اللي بـ [[-]] المتوقع، واللي بـ [[+]] اللي حصل.
- [[exit 1]]: كود خروج غير صفر، فالـ CI بيفشل.
- رقم السطر اللي ظهر تحت الرسالة في التجربة أشّر على سطر [[Prefilled]] مش سطر الـ [[expect]]، فاعتمد على اسم الـ story والـ diff.

### نفس الأمر على لينكس

~~~bash
docker run --rm node:22-slim bash -c '... npm ci && npx playwright install --with-deps chromium && CI=true npx vitest --project=storybook --run'
~~~

~~~text الناتج (لينكس، 12 test بعد ما اتضافت stories الـ SideNav والـ a11y)
Chrome Headless Shell 156.0.8078.4 (playwright chromium-headless-shell v1248) downloaded to /root/.cache/ms-playwright/chromium_headless_shell-1248
 ✓  storybook (chromium)  src/components/Button.stories.tsx (5 tests) 1638ms
 ✓  storybook (chromium)  src/components/LoginForm.stories.tsx (5 tests) 1865ms
 Test Files  3 passed (3)
      Tests  12 passed (12)
~~~

على لينكس نزّل [[chromium-headless-shell]] بس (120 ميجا)، نسخة Chromium من غير واجهة. ومع [[CI=true]] ومن غير terminal حقيقي، Vitest طبع ملخص لكل ملف بدل سطر لكل test.

---

## ٤. الـ workflow (الـ solCode)

~~~text .github/workflows/storybook.yml (job الـ tests)
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npx vitest --project=storybook --run
~~~

- [[npm ci]]: يسطّب من الـ lockfile بالظبط.
- [[npx playwright install --with-deps chromium]]: ينزّل Chromium و [[--with-deps]] بيسطّب مكتبات النظام اللي محتاجها (بـ apt على Ubuntu). من غيره: مفيش متصفح.
- [[npx vitest --project=storybook --run]]: نفس الأمر اللي على جهازك.

~~~text .github/workflows/storybook.yml (job النشر)
  deploy:
    needs: test
    if: github.event_name == 'push'
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: $__{{ steps.deployment.outputs.page_url }}
    steps:
      ... checkout و setup-node و npm ci ...
      - run: npm run build-storybook
      - uses: actions/configure-pages@v6
      - uses: actions/upload-pages-artifact@v5
        with:
          path: storybook-static
      - id: deployment
        uses: actions/deploy-pages@v5
~~~

| الحتة | معناها |
|---|---|
| [[needs: test]] | ميبدأش غير لو الـ tests نجحت |
| [[if: github.event_name == 'push']] | ينشر على push لـ main بس، مش على كل pull request |
| [[pages: write]] و [[id-token: write]] | الصلاحيات اللي deploy-pages محتاجها (الـ id-token للـ OIDC، درس «OIDC» في تاب GitHub Actions) |
| [[environment: github-pages]] | الـ environment اللي GitHub Pages بيستخدمه، و [[url]] بيظهر لينك الموقع في صفحة الـ run |
| [[upload-pages-artifact]] ثم [[deploy-pages]] | يرفع [[storybook-static]] كـ artifact وبعدين ينشره |

و [[permissions: contents: read]] على مستوى الـ workflow كله، فالـ job الأول ميقدرش يكتب حاجة. في الـ repo لازم Settings ثم Pages ثم Source تبقى «GitHub Actions» (من الـ docs). والـ actionlint:

~~~text الناتج (docker run --rm -v ...:/repo -w /repo rhysd/actionlint:latest -no-color)
actionlint exit 0
~~~

يعني مفيش غلط في الـ syntax ولا في أسامي الـ inputs ولا في الـ expressions. ولو مش عايز GitHub Pages: نفس [[storybook-static]] يترفع على Cloudflare Pages (درس «Cloudflare Pages» في تاب Cloud) أو أي static host.

---

## الخلاصة

| الحتة | دورها |
|---|---|
| [[play]] + [[canvas]] + [[userEvent]] | اختبار تفاعل جوه الـ story بـ API بتاع Testing Library |
| [[findAllByRole]] | يستنى العناصر اللي بتظهر بعد state update |
| [[step]] | يجمّع خطوات تحت اسم في Interactions |
| [[await expect(...)]] | لازم [[await]] عشان الترتيب والتسجيل |
| [[npx vitest --project=storybook --run]] | كل الـ stories كـ tests في Chromium headless |
| [[playwright install --with-deps chromium]] | المتصفح ومكتباته في CI |
| [[needs: test]] + deploy-pages | انشر Storybook بس لو الـ tests نجحت |`,
          lines: [
            R`[[fn]] للـ spies و [[expect]] للتأكيدات، من [[storybook/test]]. مع addon-vitest كل story فيها [[play]] بتبقى test بيشتغل في Vitest جوه متصفح حقيقي، و [[expect]] اللي بتفشل هنا بتفشّل الـ test.`,
            R`story بتختبر الفورم وهو فاضي: بتترسم زي أي story عادية، وبعدين [[play]] بتعمل اللي المستخدم هيعمله وتتأكد من النتيجة.`,
            R`[[play]] بتشتغل بعد الرسم، وبتاخد [[canvas]] (أدوات بحث زي Testing Library جوه الـ story بس)، و [[userEvent]] اللي بيقلّد المستخدم، و [[args]] اللي فيها الـ spy بتاع [[onSubmit]].`,
            R`بيدوّر على الزرار بدوره واسمه زي ما قارئ الشاشة شايفه، وبيدوس عليه بـ [[userEvent.click]] اللي بيبعت الأحداث اللي المستخدم الحقيقي بيعملها (hover و mousedown و focus و click). والفورم فاضي، فالمفروض الـ validation يشتغل.`,
            R`[[findAllByRole]] بتستنى (لحد ثانية افتراضيًا) لحد ما يظهر عنصر واحد على الأقل بـ [[role="alert"]] وترجّعهم كلهم. بنستخدم [[find]] مش [[get]] لأن الرسايل ممكن تظهر بعد الـ validation بشوية مش في نفس اللحظة، ولو مظهرش ولا واحد الاختبار بيفشل.`,
            R`بناخد نص كل رسالة ونقارن القايمة كلها بـ [[toEqual]]: الرسالتين لازم يبقوا موجودين وبنفس النص وبنفس الترتيب اللي في الصفحة، فلو حد غيّر رسالة أو ترتيب الخانات الاختبار هيقول.`,
            R`بنتأكد إن [[onSubmit]] متنداش خالص، يعني الفورم منعت الإرسال وفيها أخطاء. من غير السطر ده، فورم بتعرض الأخطاء وبتبعت برضه كانت هتعدّي.`,
            R`قفلة [[play]].`,
            R`قفلة الـ story.`,
            R`story تانية بتملا الفورم بقيم صح وتتأكد إنه بيبعتها.`,
            R`نفس الـ [[play]]، ومعاه [[step]] اللي بتجمّع كذا خطوة تحت اسم واحد في تاب Interactions، فلما الاختبار يفشل تعرف فشل في أنهي مرحلة.`,
            R`خطوة اسمها «fill the form»، واللي جواها بيظهر متجمّع تحت الاسم ده.`,
            R`[[getByLabelText('Email')]] بيلاقي الخانة عن طريق الـ label بتاعها (وده بيتأكد كمان إن الـ label مربوط صح)، و [[userEvent.type]] بيكتب حرف حرف زي المستخدم، فـ [[onChange]] بتتنادى مع كل حرف.`,
            R`نفس الكلام لخانة الباسورد: [[secret123]] تسع حروف، فبتعدّي شرط الـ 8 حروف.`,
            R`قفلة الخطوة.`,
            R`بيدوس Sign in بعد ما الخانات اتملت.`,
            R`بنتأكد إن [[onSubmit]] اتنادى بالـ object ده بالظبط، نفس المفاتيح ونفس القيم. لو الفورم بعت حقل زيادة أو اسم غلط (زي [[mail]] بدل [[email]]) الاختبار هيفشل.`,
            R`قفلة [[play]].`,
            R`قفلة الـ story.`,
          ],
          sol: R`[[npx vitest --project=storybook --run --reporter=verbose]] طبع سطر لكل story بـ [[✓ |storybook (chromium)|]]، وفي الآخر [[Tests  11 passed (11)]] في حوالي ٥ ثواني. بعد تغيير الرسالة لـ [['Invalid email']]: [[FAIL ... > Shows Errors When Empty]]، ورسالة [[expected [ 'Invalid email', …(1) ] to deeply equal [ 'Enter a valid email', …(1) ]]] ومعاها diff بـ [[-]] و [[+]]، ولينك [[Click to debug the error directly in Storybook: http://localhost:6006/?path=/story/forms-loginform--shows-errors-when-empty&addonPanel=storybook/interactions/panel]]، والأمر خرج بـ 1.

نفس الـ tests على لينكس في [[node:22-slim]] بعد [[npx playwright install --with-deps chromium]] نجحت ([[Tests  12 passed (12)]])، و [[npm run build-storybook]] هناك طلع 8.6 ميجا. والـ workflow تحت عدّى actionlint من غير ولا ملاحظة. (النشر الفعلي على GitHub Pages محتاج repo، فخطواته من docs بتاعة actions/deploy-pages.)`,
          solCode: R`name: storybook
on:
  push:
    branches: [main]
  pull_request:
permissions:
  contents: read
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npx vitest --project=storybook --run
  deploy:
    needs: test
    if: github.event_name == 'push'
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: $__{{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm run build-storybook
      - uses: actions/configure-pages@v6
      - uses: actions/upload-pages-artifact@v5
        with:
          path: storybook-static
      - id: deployment
        uses: actions/deploy-pages@v5`
        },
        {
          cmd: "addon-a11y",
          title: "فحص accessibility لكل story: خلي الـ CI يفشل على مشاكل الـ contrast والأسماء",
          desc: R`[[@storybook/addon-a11y]] بيشغّل axe-core على كل story وبيعرض المشاكل في تاب Accessibility. والإعداد الافتراضي [[a11y: { test: 'todo' }]] بيعرضها بس، وفي الترمنال مبيقولش حاجة. [[test: 'error']] في [[preview.tsx]] بيخلي أي مشكلة تفشّل الـ test في Vitest وفي CI.

ولو rule معينة لازم تتقفل لـ story واحدة، اقفلها في [[parameters.a11y.config.rules]] للـ story دي بس، واكتب السبب جنبها.`,
          example: R`// .storybook/preview.tsx
const preview: Preview = {
  parameters: { a11y: { test: 'error' } },
}
// src/components/Button.stories.tsx
export const OnDarkTheme: Story = { globals: { theme: 'dark' } }
// الإصلاح في src/theme/theme.css و button.css: لون للنص اللي فوق الـ accent
.app-theme[data-theme='dark'] { --accent: #93c5fd; --on-accent: #111827; }
.btn-primary { background: var(--accent, #1d4ed8); color: var(--on-accent, #fff); }
.app-theme a { color: var(--accent); }
// لو لازم تقفل rule لـ story واحدة (مثلًا ألوان brand قديمة متفق عليها لحد الـ redesign):
export const LegacyBrandColors: Story = {
  globals: { theme: 'dark' },
  parameters: { a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } } },
}`,
          try: R`خلي [[a11y.test]] [['error']] وضيف story [[OnDarkTheme]] للزرار بـ [[globals: { theme: 'dark' }]] والـ CSS لسه [[color: #fff]] على [[#93c5fd]]. شغّل [[npx vitest --project=storybook --run]]: أنهي rule فشلت وبكام نسبة؟ صلّحها بـ [[--on-accent]]. وبعدين رجّع الغلط واعمل [[test: 'todo']] للـ story دي بس: الترمنال بيقول إيه؟`,
          flag: "script",
          deep: {
            why: R`مشاكل الـ accessibility اللي ممكن تتقاس (contrast، و زرار من غير اسم، و input من غير label، و ARIA غلط) بتتكرر في كل صفحة لو اتعملت في component مشترك. Storybook بيمسكها في الـ component نفسه، في كل حالة ليه (dark و RTL و loading)، قبل ما تتنشر. ومن غير [[test: 'error']] هي بتظهر في تاب محدش بيفتحه.`,
            how: R`الـ addon بيشغّل axe-core (نسخة 4.14 في التجربة) على عنصر الـ story بعد ما تترسم وبعد [[play]]. في Vitest، [[test: 'error']] بيحوّل أي violation لـ [[expect(received).toHaveNoViolations(expected)]] فاشل، ومعاه الـ HTML اللي فيه المشكلة واسم الـ rule والأرقام ولينك شرحها. [[todo]] بيعرضها في الواجهة بس، و [[off]] مبيفحصش.

الإعداد بيتحط في [[parameters.a11y]] على أي مستوى: [[preview.tsx]] (كل الـ stories)، أو الـ meta (ملف)، أو الـ story. و [[config.rules]] بتقفل أو تفتح rules بالـ id بتاعها ([[color-contrast]] و [[button-name]] و [[label]] ...). و axe بيحسب الـ contrast من الألوان الحقيقية بعد الـ CSS، فالـ theme من الـ decorator بيفرق: نفس الزرار عدّى في light وفشل في dark.`,
            when: R`[[test: 'error']] من أول يوم في مشروع جديد. في مشروع قديم فيه مشاكل كتير: ابدأ بـ [['todo']]، وصلّح component component، وحوّل لـ [['error']] لكل ملف بيخلص (في الـ meta بتاعه)، لحد ما تحطه في [[preview.tsx]]. وفحص الصفحات كاملة في التطبيق الحقيقي بـ [[@axe-core/playwright]] (درس في تاب «جودة الكود»).`,
            mistakes: R`تفتكر إن «a11y عدّى» يعني الـ component سهل الاستخدام: axe بيمسك جزء من المشاكل بس (ترتيب الـ focus، والكيبورد، ومعنى النص، وقارئ الشاشة لازم تجربهم بإيدك، درس «axe و Lighthouse» في تاب CSS). وتقفل [[color-contrast]] في [[preview.tsx]] كله عشان story واحدة فشلت. وتفحص الـ light بس، والـ dark هو اللي فيه المشكلة. وتسيب [['todo']] وتفتكر الـ CI بيفحص: في التجربة story فيها مشكلة contrast عدّت [[5 passed]] من غير ولا كلمة.`
          },
          teach: R`## الفكرة: axe على كل story، و [[error]] عشان الـ CI يشوف

اتشغّل على Storybook 10.6.5 و addon-a11y 10.6.5 (axe-core 4.14) بـ [[npx vitest --project=storybook --run]] في Chromium headless على ويندوز.

---

## ١. [[todo]]: الافتراضي، ومبيفشّلش حاجة

التسطيب كتب [[a11y: { test: 'todo' }]]. ضفنا story للزرار على dark والـ CSS لسه [[color: #fff]]:

~~~text الناتج (todo)
 Test Files  1 passed (1)
      Tests  5 passed (5)
~~~

الزرار فيه مشكلة contrast (تحت)، والـ tests عدّت ومفيش ولا تحذير في الترمنال. [[todo]] = بيظهر في تاب Accessibility وفي الـ test widget جوه Storybook بس.

---

## ٢. [[error]]: المشكلة بتفشّل الـ test

~~~text .storybook/preview.tsx
const preview: Preview = {
  parameters: { a11y: { test: 'error' } },
}
~~~

[[parameters]] في [[preview.tsx]] = لكل الـ stories، و [[a11y]] هو المفتاح اللي الـ addon بيقراه.

~~~text src/components/Button.stories.tsx
export const OnDarkTheme: Story = { globals: { theme: 'dark' } }
~~~

نفس الزرار، بس الـ decorator (الدرس اللي فات) بيلفه بـ [[data-theme="dark"]]، فـ [[--accent]] بقى [[#93c5fd]] (أزرق فاتح).

~~~text الناتج
 FAIL  |storybook (chromium)| src/components/Button.stories.tsx > On Dark Theme
Click to debug the error directly in Storybook: http://localhost:6006/?path=/story/ui-button--on-dark-theme&addonPanel=storybook/interactions/panel
expect(received).toHaveNoViolations(expected)
Expected the HTML found at $('.btn') to have no violations:
<button type="button" class="btn btn-primary btn-md" aria-busy="false">Save</button>
Received:
"Elements must meet minimum color contrast ratio thresholds (color-contrast)"
Fix any of the following:
  Element has insufficient color contrast of 1.8 (foreground color: #ffffff, background color: #93c5fd, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1
You can find more information on this issue here:
https://dequeuniversity.com/rules/axe/4.14/color-contrast?application=axeAPI
 Test Files  1 failed | 2 passed (3)
      Tests  1 failed | 11 passed (12)
~~~

نقرا الرسالة:

| الحتة | معناها |
|---|---|
| [[$('.btn')]] | الـ CSS selector للعنصر اللي فيه المشكلة |
| [[(color-contrast)]] | الـ id بتاع الـ rule، وده اللي بتستخدمه لو هتقفلها |
| [[contrast of 1.8]] | نسبة الإضاءة بين لون النص ولون الخلفية: 1 = نفس اللون، و 21 = أسود على أبيض |
| [[foreground #ffffff, background #93c5fd]] | أبيض على أزرق فاتح |
| [[font size: 12.0pt (16px)]] | نص عادي مش كبير، فالمطلوب 4.5 (النص الكبير، 18pt أو 14pt bold، مطلوبله 3) |
| [[Expected contrast ratio of 4.5:1]] | حد WCAG AA للنص العادي |

نفس الزرار في light ([[#ffffff]] على [[#1d4ed8]]) نسبته 6.70 فعدّى. المشكلة في dark بس، وعشان كده الـ story اللي بتثبّت [[globals]] مهمة.

---

## ٣. الإصلاح: لون للنص اللي فوق الـ accent

~~~text src/theme/theme.css و src/components/button.css
.app-theme[data-theme='dark'] { --accent: #93c5fd; --on-accent: #111827; ... }
.btn-primary { background: var(--accent, #1d4ed8); color: var(--on-accent, #fff); }
~~~

- [[--on-accent]]: متغير CSS جديد = لون النص اللي بيتكتب فوق الـ accent. في dark غامق ([[#111827]]).
- [[var(--on-accent, #fff)]]: لو المتغير مش معرّف (light) خد [[#fff]].

[[#111827]] على [[#93c5fd]] نسبته 9.84 (حسبناها بمعادلة WCAG في Node)، و axe عدّاه.

### مشكلة تانية مسكها نفس الفحص

story [[ArabicDark]] بتاعة SideNav (الدرس اللي فات) فشلت:

~~~text الناتج
Expected the HTML found at $('a[href$="orders"]') to have no violations:
<a class="" href="/orders" data-discover="true">Orders</a>
  Element has insufficient color contrast of 1.88 (foreground color: #0000ee, background color: #111827, ...). Expected contrast ratio of 4.5:1
~~~

[[#0000ee]] ده لون اللينك الافتراضي في المتصفح، وإحنا مكناش لونّا اللينكات أصلًا. الحل [[.app-theme a { color: var(--accent); }]]، وبعدها:

~~~text الناتج
      Tests  12 passed (12)
~~~

---

## ٤. تقفل rule لـ story واحدة

~~~text src/components/Button.stories.tsx
export const LegacyBrandColors: Story = {
  globals: { theme: 'dark' },
  parameters: { a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } } },
}
~~~

- [[config]]: إعداد بيتبعت لـ axe نفسه.
- [[rules: [{ id: 'color-contrast', enabled: false }]]]: اقفل الـ rule دي بالـ id اللي ظهر في الرسالة.
- على الـ story دي بس، وباقي الـ rules (أسماء الزراير، والـ labels ...) لسه شغالة.

جربنا نفس الـ [[parameters]] دي على [[OnDarkTheme]] والزرار لسه فيه المشكلة: [[Tests  12 passed (12)]]. يعني الفحص اتقفل فعلًا، فمتعملهاش غير بسبب مكتوب. وبدلها لو عايز تأجّل كل الـ rules لـ story واحدة: [[parameters: { a11y: { test: 'todo' } }]] (جربناها: [[5 passed]] مع إن المشكلة موجودة).

---

## ٥. axe بيمسك إيه ومبيمسكش إيه

| بيمسك | مبيمسكش |
|---|---|
| contrast الألوان (بعد الـ CSS والـ theme) | ترتيب الـ Tab منطقي ولا لأ |
| زرار أو لينك من غير اسم ([[button-name]] و [[link-name]]) | الـ focus بيروح فين بعد ما dialog يتقفل |
| input من غير label ([[label]]) | النص مفهوم ولا لأ |
| ARIA attributes غلط | التجربة الحقيقية بقارئ الشاشة |

التانية بتتختبر بإيدك أو بـ [[play]] (تدوس Tab وتتأكد من [[document.activeElement]]). وتفاصيل الحدود دي في درس «axe و Lighthouse» في تاب CSS، و [[getByRole]] نفسه بيمسك جزء من مشاكل الأسماء (درس «jsx-a11y و getByRole»).

---

## الخلاصة

| الإعداد | اللي بيحصل |
|---|---|
| [[a11y: { test: 'todo' }]] (الافتراضي) | يظهر في الواجهة بس، والـ CI بينجح |
| [[a11y: { test: 'error' }]] | أي violation = test فاشل ومعاه selector والأرقام |
| [[a11y: { test: 'off' }]] | من غير فحص |
| [[config.rules]] على story | يقفل rule واحدة لـ story واحدة |
| [[globals: { theme: 'dark' }]] على story | يفحص الـ dark كل مرة، وهو اللي مسك المشكلتين |`,
          lines: [
            R`الإعداد العام في [[.storybook/preview.tsx]]، اللي بيتطبق على كل الـ stories.`,
            R`[[test: 'error']] بيخلي أي مشكلة accessibility يلاقيها axe تفشّل الـ test في Vitest وفي CI. الافتراضي [[todo]] بيعرض المشاكل في تاب Accessibility بس ومبيفشّلش حاجة، فممكن تتراكم ومحدش ياخد باله.`,
            R`قفلة [[preview]].`,
            R`story للزرار على الـ theme الـ dark بـ [[globals]]، عشان axe يفحص الألوان دي كمان. من غيرها الفحص بيشوف light بس، ومشكلة الـ contrast في dark تعدّي.`,
            R`في الـ dark theme: [[--accent]] أزرق فاتح، و [[--on-accent]] لون غامق للنص اللي هيتكتب فوقه. النص الأبيض على الأزرق الفاتح ده الـ contrast بتاعه ضعيف، و axe كان بيفشّله.`,
            R`الزرار خلفيته [[--accent]] ولون نصه [[--on-accent]]، والقيمة التانية جوه [[var()]] هي الافتراضي لو المتغير مش معرّف (في light: أزرق غامق ونص أبيض). كده كل theme بيحدد اللونين مع بعض فيفضلوا مقروءين.`,
            R`اللينكات جوه التطبيق بتاخد لون [[--accent]] بدل الأزرق الافتراضي بتاع المتصفح، اللي غامق ومش مقروء على خلفية dark.`,
            R`story بيتقفل فيها فحص rule واحدة بس، لحالة معروفة ومقصودة (ألوان براند قديمة مش هتتغير دلوقتي).`,
            R`على الـ dark theme، نفس الحالة اللي فيها المشكلة.`,
            R`بيقفل rule [[color-contrast]] بالـ id بتاعها للـ story دي بس، وكل الـ rules التانية (زي زرار من غير اسم) لسه شغالة. ده أحسن من إنك تقفلها في [[preview.tsx]] كله وتخبّي المشكلة في كل الـ components.`,
            R`قفلة الـ story.`,
          ],
          sol: R`بـ [['error']] الـ story فشلت بـ [[(color-contrast)]] و [[Element has insufficient color contrast of 1.8 (foreground color: #ffffff, background color: #93c5fd, font size: 12.0pt (16px), font weight: normal). Expected contrast ratio of 4.5:1]] على [[$('.btn')]]. بعد [[--on-accent: #111827]] في dark (نسبة 9.84) عدّت. وفحص [[ArabicDark]] بتاع SideNav مسك كمان لينكات بالأزرق الافتراضي [[#0000ee]] على [[#111827]] بنسبة 1.88، والحل [[.app-theme a { color: var(--accent) }]]، وبعدها [[Tests  12 passed (12)]].

ولما رجّعنا الغلط و [[parameters: { a11y: { test: 'todo' } }]] للـ story دي بس: [[Tests  5 passed (5)]] ومفيش ولا كلمة في الترمنال. ده بالظبط ليه [['todo']] مش فحص في CI. (متجرّب على Storybook 10.6.5 و axe-core 4.14 في Chromium headless على ويندوز.)`
        }
      ]
    }
]);
