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
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("angular", {
  label: "Angular",
  prompt: "$ ",
  lab: R`npm i -g @angular/cli
ng new shop --routing --style=css --ssr=false
cd shop && ng serve -o`,
  labText: "Angular 22 (سبتمبر ٢٠٢٦) محتاج Node 22.22.3 أو 24.15 أو أحدث. مشروع ng new هو المكان اللي تجرّب فيه كل الدروس، وركّب Angular DevTools في المتصفح عشان تشوف الـ components والـ signals.",
  levels: {"1":["الأساس","components و templates و signals و control flow و services"],"2":["التطبيقات الحقيقية","routing و HTTP و forms و RxJS و state و Material و i18n و RTL"],"3":["الإنتاج والانترفيو","change detection و SSR والأداء، والاختبارات، والـ deploy، والكود القديم بـ NgModules، وأسئلة الانترفيو"]},
  categories: [
    {
      t: "Angular بيعمل إيه والـ CLI",
      l: 1,
      n: "framework كامل بـ TypeScript، وأداة ng بتعمل المشروع وتولّد الملفات وتشغّل وتختبر",
      items: [
        {
          cmd: "ng new",
          title: "Angular يعني إيه، وتعمل أول مشروع إزاي",
          desc: R`Angular هو framework كامل من Google لبناء تطبيقات ويب بـ TypeScript. على عكس React اللي هي مكتبة للواجهة بس وانت بتختار الباقي، Angular جاي فيه كل حاجة جوه: routing، و HTTP client، و forms، و dependency injection، و testing، و i18n، و أداة build واحدة اسمها Angular CLI ([[ng]]).

آخر نسخة في سبتمبر ٢٠٢٦ هي Angular 22 (نزلت يونيو ٢٠٢٦، و 22.2 آخر minor). بتنزل major كل ٦ شهور تقريبًا، وكل major بيتدعم ١٨ شهر. وده مهم في مصر: شركات كتير (بنوك، وشركات enterprise، وحكومي) شغالة Angular، وكتير منها لسه على نسخ قديمة، فهتقابل الشكلين: الحديث (standalone و signals) والقديم (NgModules و RxJS في كل حتة). التاب ده بيعلّمك الحديث، وفيه قسم كامل في المستوى ٣ لقراية القديم.

المتوقع إنك عارف JavaScript و TypeScript (classes و decorators و generics) من «تاب JavaScript» و «تاب TypeScript»: Angular كله classes عليها decorators.`,
          example: R`npm i -g @angular/cli
ng version
ng new shop --routing --style=css --ssr=false
cd shop
ng serve -o
ng build`,
          try: R`اعمل المشروع، وافتح [[src/app/app.ts]] و [[src/app/app.html]]. غيّر أي نص في app.html والصفحة مفتوحة: هتتحدّث لوحدها. وبعدين بص على [[package.json]]: دوّر على zone.js وعلى karma. وفي الآخر [[ng build]] وبص على [[dist/shop/browser]].`,
          deep: {
            why: R`في مشروع كبير فيه ٢٠ مطوّر، أكبر مشكلة مش إزاي ترسم زرار: هي إن كل واحد يعمل الحاجة بطريقته. Angular بيحسم القرارات دي بدالك: فيه طريقة واحدة للـ routing، وواحدة للـ HTTP، وواحدة للـ DI، وهيكل ملفات متفق عليه. وده سبب إن البنوك والشركات الكبيرة بتحبه: أي مطوّر Angular بيدخل أي مشروع Angular ويفهمه بسرعة. التمن: حاجات كتير تتعلمها في الأول، والـ framework بيفرض عليك شكله.`,
            how: R`[[ng new]] بيعمل workspace فيه: [[angular.json]] (إعدادات الـ build والـ serve والـ test)، و [[src/main.ts]] اللي بيشغّل التطبيق بـ [[bootstrapApplication(App, appConfig)]]، و [[src/app/app.ts]] أول component، و [[app.config.ts]] فيه الـ providers (الراوتر وغيره)، و [[app.routes.ts]] فيه الصفحات.

من Angular 20 أسامي الملفات بقت أقصر ([[app.ts]] مش [[app.component.ts]]، والكلاس [[App]] مش [[AppComponent]]). ولو فتحت مشروع قديم هتلاقي الشكل الطويل، وده عادي.

والـ build بقى بـ esbuild و Vite ([[@angular/build]]) بدل webpack. و Angular 22 بيعمل المشروع من غير zone.js (zoneless، بقى الافتراضي من 21)، والاختبارات بـ Vitest مش Karma. والـ compiler بيحوّل الـ templates لكود JS وقت الـ build (AOT)، فأي غلطة في الـ template بتطلع خطأ build مش وقت التشغيل.`,
            when: "تطبيقات كبيرة: لوحات تحكم، وأنظمة داخلية، وبنوك، و ERP، وأي حاجة فيها فورمات وصلاحيات كتير وفريق كبير. لموقع صغير أو landing page هو تقيل، و Next.js أو Astro أنسب.",
            mistakes: R`تسطّب الـ CLI على Node قديم: [[ng]] بيرفض يشتغل ويقولك The Angular CLI requires a minimum Node.js version of v22.22.3 or v24.15.0 or v26.0.0. وتخلط AngularJS (النسخة 1.x القديمة خالص، JavaScript و [[$scope]]) بـ Angular: دول اتنين مختلفين تمامًا، ولو إعلان شغل مكتوب فيه AngularJS يبقى نظام قديم جدًا. وفي الانترفيو: «Angular framework ولا library؟» framework، وبيحدد الـ routing والـ DI والـ build.`
          },
          teach: R`## الفكرة: ٦ أوامر، أول ٣ منهم مرة واحدة بس

المثال هو رحلة أول مشروع: تسطّب الأداة، وتتأكد منها، وتعمل المشروع، وتدخله، وتشغّله، وتعمله build. كل الناتج هنا حقيقي من ويندوز 11 على Node 24.19 و Angular CLI 22.2.2 (آخر نسخة وقت الكتابة).

---

## ١. [[npm i -g @angular/cli]]

| الحتة | معناها |
|---|---|
| [[npm]] | مدير الباكدجات اللي جاي مع Node |
| [[i]] | اختصار [[install]] |
| [[-g]] | global: على الجهاز كله، مش جوه مشروع، فيبقى عندك أمر [[ng]] في أي فولدر |
| [[@angular/cli]] | اسم الباكدج. الـ [[@angular/]] ده scope: كل باكدجات Angular الرسمية تحته |

في الـ lab ده مسطبناش حاجة global (عشان منغيّرش الجهاز)، واستخدمنا [[npx]] بداله: بينزّل الباكدج في كاش ويشغّلها مرة:

~~~powershell
npx @angular/cli@latest new shop --routing --style=css --ssr=false --defaults --skip-git
~~~

[[@latest]] معناها «آخر نسخة». والنتيجة نفسها، والفرق إنك بعدها بتكتب [[npx ng]] جوه المشروع بدل [[ng]].

> لو Node عندك قديم، الـ CLI بيرفض يشتغل. الشرط مكتوب في [[package.json]] بتاع الـ CLI نفسه: [[^22.22.3 || ^24.15.0 || >=26.0.0]]، يعني Node 22 من 22.22.3، أو 24 من 24.15، أو 26 وأحدث.

---

## ٢. [[ng version]]

[[ng]] هو الـ CLI نفسه (Command Line Interface). [[version]] بيطبع نسخته ونسخ كل حاجة حواليه:

~~~text الناتج (مختصر)
Angular CLI       : 22.2.2
Angular           : 22.2.1
Node.js           : 24.19.0
Package Manager   : npm 11.17.0
Operating System  : win32 x64

│ Package                   │ Installed Version │ Requested Version │
│ @angular/build            │ 22.2.2            │ ^22.2.2           │
│ @angular/core             │ 22.2.1            │ ^22.2.0           │
│ @angular/router           │ 22.2.1            │ ^22.2.0           │
│ rxjs                      │ 7.8.2             │ ~7.8.0            │
│ typescript                │ 6.0.3             │ ~6.0.2            │
│ vitest                    │ 5.0.3             │ ^5.0.0            │
~~~

- **Installed** اللي متسطب فعلًا في [[node_modules]]، و **Requested** اللي مكتوب في [[package.json]].
- [[^22.2.0]] معناها «أي 22.x.x من 22.2.0 وطالع»، و [[~7.8.0]] معناها «أي 7.8.x بس». عشان كده [[core]] طلع 22.2.1 مع إن المطلوب 22.2.0.
- الجدول ده أول حاجة تلزقها لما تسأل حد عن مشكلة: نص المشاكل سببها نسخ مش متوافقة.

---

## ٣. [[ng new shop --routing --style=css --ssr=false]]

| الحتة | معناها |
|---|---|
| [[new]] | اعمل workspace جديد |
| [[shop]] | اسم المشروع والفولدر |
| [[--routing]] | فيه ملف routes جاهز ([[app.routes.ts]]) |
| [[--style=css]] | CSS عادي (البدائل [[scss]] و [[sass]] و [[less]]) |
| [[--ssr=false]] | من غير Server-Side Rendering (المستوى ٣) |
| [[--defaults]] | (أضفناها) خد الافتراضي في أي سؤال ومتسألنيش |
| [[--skip-git]] | (أضفناها) متعملش git repo |

الشرطتين [[--]] قبل اسم الخيار الطويل، و [[=]] بتديله قيمة. والناتج:

~~~text الناتج
CREATE shop/angular.json (1970 bytes)
CREATE shop/package.json (780 bytes)
CREATE shop/tsconfig.json (939 bytes)
CREATE shop/src/main.ts (228 bytes)
CREATE shop/src/index.html (303 bytes)
CREATE shop/src/styles.css (81 bytes)
CREATE shop/src/app/app.spec.ts (702 bytes)
CREATE shop/src/app/app.ts (299 bytes)
CREATE shop/src/app/app.css (0 bytes)
CREATE shop/src/app/app.html (20488 bytes)
CREATE shop/src/app/app.config.ts (322 bytes)
CREATE shop/src/app/app.routes.ts (80 bytes)
CREATE shop/public/favicon.ico (15086 bytes)
- Installing packages (npm)...
✔ Packages installed successfully.
~~~

(شلنا من الناتج ملفات صغيرة زي [[.prettierrc]] و [[.vscode/]].)

### الملفات المهمة

| الملف | شغلته |
|---|---|
| [[angular.json]] | إعدادات الـ CLI: الـ build والـ serve والـ test |
| [[src/main.ts]] | نقطة البداية: [[bootstrapApplication(App, appConfig)]] |
| [[src/index.html]] | الصفحة الوحيدة، فيها [[<app-root>]] |
| [[src/app/app.ts]] | أول component، اسم الكلاس [[App]] |
| [[src/app/app.html]] | الـ template بتاعه (صفحة ترحيب ٢٠ كيلو، هتمسحها) |
| [[src/app/app.config.ts]] | الـ providers: [[provideRouter(routes)]] وغيره |
| [[src/app/app.routes.ts]] | [[export const routes: Routes = [];]] فاضية |
| [[src/app/app.spec.ts]] | اختبار لـ App |

و [[package.json]] اللي اتعمل فيه [[vitest]] و [[jsdom]] في الـ devDependencies، ومفيهوش [[zone.js]] ولا [[karma]] (اتأكدنا: ولا واحد فيهم في [[node_modules]]).

---

## ٤. [[cd shop]]

[[cd]] = change directory: ادخل فولدر المشروع. كل أوامر [[ng]] اللي جاية لازم تتنفّذ جوه الـ workspace، ولو جربت [[ng new]] من جوه workspace هيقولك This command is not available when running the Angular CLI inside a workspace.

---

## ٥. [[ng serve -o]]

[[serve]] بيعمل build في الذاكرة ويشغّل dev server، و [[-o]] اختصار [[--open]]: افتح المتصفح. شغّلناه بـ [[--port 5960]] بدل البورت الافتراضي 4200:

~~~text الناتج
Initial chunk files | Names         | Raw size
main.js             | main          | 48.76 kB |
styles.css          | styles        | 95 bytes |

Application bundle generation complete. [1.761 seconds]

Watch mode enabled. Watching for file changes...
  ➜  Local:   http://localhost:5960/
~~~

- **Watch mode**: بيراقب الملفات، وأي حفظ بيعمل build تاني.
- [[main.js]] في التطوير 48 KB ومن غير hash في الاسم، لأنه مش متصغّر.

وفي Chrome الصفحة طلّعت [[<h1>Hello, shop</h1>]]. ولما غيّرنا السطر في [[app.html]] لـ [[أهلا يا {{ title() }}]] والصفحة مفتوحة:

~~~text الناتج
before: Hello, shop
after: أهلا يا shop
~~~

وفي الترمنال طلع [[Component update sent to client(s).]] يعني الـ component بس اتحدّث جوه الصفحة (HMR) من غير reload كامل.

---

## ٦. [[ng build]]

build للإنتاج: بيصغّر الكود ويحطه في [[dist/]]:

~~~text الناتج
Initial chunk files | Names         |  Raw size | Estimated transfer size
main-E7LYUGAO.js    | main          | 216.46 kB |                59.39 kB
styles-5INURTSO.css | styles        |   0 bytes |                 0 bytes

                    | Initial total | 216.46 kB |                59.39 kB

Application bundle generation complete. [5.903 seconds]

Output location: C:\Users\ali\...\shop\dist\shop
~~~

### نقرا الجدول

| العمود | معناه |
|---|---|
| Initial chunk files | الملفات اللي بتتحمّل أول ما الصفحة تفتح |
| [[E7LYUGAO]] | hash من محتوى الملف: لو الكود اتغير الاسم يتغير، فالمتصفح ميستخدمش نسخة قديمة من الكاش |
| Raw size | الحجم على الديسك: 216 KB |
| Estimated transfer size | الحجم المتوقع بعد ضغط السيرفر (gzip أو brotli): حوالي 59 KB، وده اللي المستخدم بينزّله فعلًا |

ليه 216 KB في الإنتاج و 48 KB في الـ serve؟ لأن الـ serve بيسيب Angular نفسه في ملفات منفصلة بتتحمّل جنب [[main.js]]، والـ build بيجمع كل حاجة في ملف واحد.

وجوه [[dist/shop/browser]]:

~~~text الناتج
favicon.ico
index.html
main-E7LYUGAO.js
styles-5INURTSO.css
~~~

و [[index.html]] فيه [[<app-root></app-root>]] و [[<script src="main-E7LYUGAO.js" type="module">]]. موقع static ترفعه على أي سيرفر.

---

## الخلاصة

| الأمر | إمتى |
|---|---|
| [[npm i -g @angular/cli]] | مرة على الجهاز (أو [[npx @angular/cli@latest]]) |
| [[ng version]] | تتأكد من النسخ، وأول حاجة في أي سؤال |
| [[ng new shop ...]] | مرة لكل مشروع |
| [[ng serve -o]] | كل يوم وانت شغال |
| [[ng build]] | قبل الرفع، والناتج في [[dist/shop/browser]] |`,
          lines: [
            R`سطّب الـ CLI مرة واحدة على جهازك، فيبقى عندك أمر [[ng]].`,
            "يطبع نسخة الـ CLI و Node والباكدجات، وأول حاجة تبعتها لما تسأل عن مشكلة.",
            R`اعمل مشروع اسمه shop فيه راوتر و CSS عادي ومن غير SSR. ضيف [[--defaults]] لو عايزه ميسألكش أسئلة.`,
            "ادخل فولدر المشروع.",
            R`شغّل dev server على [[localhost:4200]] وافتح المتصفح ([[-o]]). أي حفظ بيحدّث الصفحة.`,
            R`build للإنتاج في [[dist/shop/browser]]: ملفات JS و CSS أساميها فيها hash.`
          ],
          sol: R`[[package.json]] فيه [[@angular/core]] بنسخة 22، و [[vitest]] و [[jsdom]] في الـ devDependencies. مش هتلاقي [[zone.js]] ولا [[karma]]: من Angular 21 المشروع الجديد zoneless والاختبارات بـ Vitest. لو لقيتهم، يبقى الـ CLI عندك قديم: اعمل [[ng version]].

[[ng build]] بيطبع جدول «Initial chunk files» فيه [[main-XXXX.js]] و [[styles-XXXX.css]] والحجم الخام والحجم المتوقع بعد الضغط (حوالي ٦٠ KB لمشروع فاضي). وفي [[dist/shop/browser]] هتلاقي [[index.html]] بيحمّل الملفات دي. ده موقع static تقدر ترفعه على أي سيرفر (المستوى ٣).`
        },
        {
          cmd: "ng generate",
          title: "تولّد component و service و guard بأمر واحد",
          desc: R`[[ng generate]] (أو [[ng g]]) بيعمل الملفات بالشكل المظبوط: الكلاس، والـ template، والـ CSS، وملف اختبار [[.spec.ts]]. مش لازم تستخدمه، بس بيوفّر وقت وبيخلي المشروع متسق.

أشهر حاجة: [[ng g c]] للـ component، و [[ng g s]] للـ service، و [[ng g guard]]، و [[ng g interceptor]]، و [[ng g pipe]]، و [[ng g directive]]، و [[ng g environments]].`,
          example: R`ng g c products/product-card
ng g s products/products
ng g guard auth/auth
ng g interceptor core/auth
ng g pipe shared/egp
ng g environments
ng g c products/product-list --dry-run`,
          try: R`ولّد component اسمه [[cart/cart-summary]] بـ [[--dry-run]] الأول وشوف هيعمل إيه، وبعدين من غيره. افتح الـ [[.ts]] وشوف الـ selector. وبعدين ولّد service وبص على الـ decorator اللي فوقها.`,
          deep: {
            why: "كل component في Angular محتاج شوية boilerplate: decorator بإعدادات، و selector بـ prefix، وملف template، وملف CSS، وملف اختبار. لو بتكتبهم بإيدك هتنسى حاجة أو تسمّي غلط. الأمر بيعمل ده في ثانية وبنفس الشكل لكل الفريق.",
            how: R`الـ CLI بيستخدم schematics: قوالب بتولّد وتعدّل ملفات. [[ng g c products/product-card]] بيعمل فولدر [[src/app/products/product-card/]] فيه ٤ ملفات، والكلاس اسمه [[ProductCard]] والـ selector [[app-product-card]] (الـ [[app]] ده الـ prefix من [[angular.json]]).

الـ guard والـ interceptor بيطلعوا functions مش classes ([[CanActivateFn]] و [[HttpInterceptorFn]]) لأن ده الشكل الحديث. والـ service في Angular 22 بتطلع بـ [[@Service()]]، وده decorator جديد وأبسط من [[@Injectable({ providedIn: 'root' })]] (درس الـ services).

[[--dry-run]] (أو [[-d]]) بيوريك الملفات من غير ما يكتبها. و [[--skip-tests]] من غير ملف الاختبار، و [[--inline-template]] و [[--inline-style]] يحطوا الـ HTML والـ CSS جوه الـ .ts.`,
            when: "كل مرة تعمل component أو service جديد في مشروع Angular. بعض الناس بيعملوا الملفات بإيدهم أو بـ snippets في VS Code، وده مقبول لو المشروع ماشي على نفس الشكل.",
            mistakes: R`تكتب اسم الـ component بـ PascalCase ([[ng g c ProductCard]]): الـ CLI هيحوّله لـ kebab-case وممكن تتلخبط في الأسامي. اكتب [[product-card]]. وتولّد من فولدر غلط: المسار بيتحسب من [[src/app]]. وتمسح ملف الـ spec وتنسى، فالاختبارات تفضل مستنية ملف مش موجود.`
          },
          teach: R`## الفكرة: كل سطر بيقول «ولّد لي نوع كذا في المكان كذا»

كل أوامر المثال نفس الشكل:

~~~text شكل الأمر
ng   g          c            products/product-card    --dry-run
CLI  generate   النوع        المسار/الاسم              خيارات
~~~

- [[g]] اختصار [[generate]].
- النوع: [[c]] = component، و [[s]] = service، و [[guard]] و [[interceptor]] و [[pipe]] و [[environments]] بأساميهم.
- المسار بيتحسب من [[src/app]]. آخر جزء هو الاسم، واللي قبله فولدرات.

كل الأوامر اتشغّلت فعلًا في مشروع Angular 22.2 على ويندوز، والناتج تحت.

---

## ١. [[ng g c products/product-card]]

~~~text الناتج
CREATE src/app/products/product-card/product-card.spec.ts (590 bytes)
CREATE src/app/products/product-card/product-card.ts (218 bytes)
CREATE src/app/products/product-card/product-card.css (0 bytes)
CREATE src/app/products/product-card/product-card.html (28 bytes)
~~~

الـ component بياخد فولدر لوحده جوه [[products/]]، و ٤ ملفات: الكلاس ([[.ts]])، والـ template ([[.html]])، والـ CSS، والاختبار ([[.spec.ts]]). والـ [[.ts]] شكله كده:

~~~text product-card.ts
import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-product-card',
  styleUrl: './product-card.css',
  templateUrl: './product-card.html',
})
export class ProductCard {}
~~~

- الاسم [[product-card]] (kebab-case: كلمات صغيرة بينها شرطة) بقى كلاس [[ProductCard]] (PascalCase: كل كلمة بحرف كبير).
- [[selector: 'app-product-card']]: الـ [[app-]] ده prefix مكتوب في [[angular.json]]، عشان أسامي الـ tags بتاعتك متتخانقش مع HTML ولا مع مكتبات.
- [[imports: []]] فاضية: هنا هتحط أي component تاني هتستخدمه في الـ template.
- مفيش [[standalone: true]]: بقى الافتراضي.
- و [[product-card.html]] فيه سطر واحد: [[<p>product-card works!</p>]] (الـ 28 bytes).

---

## ٢. [[ng g s products/products]]

~~~text الناتج
CREATE src/app/products/products.spec.ts (345 bytes)
CREATE src/app/products/products.ts (84 bytes)
~~~

الـ service مبتاخدش فولدر لوحدها، وملفين بس (مفيش HTML ولا CSS لأنها مش بتعرض حاجة):

~~~text products.ts
import { Service } from '@angular/core';

@Service()
export class Products {}
~~~

[[@Service()]] decorator جديد في Angular 22، معناه «ده service واحدة لكل التطبيق». في الكود الأقدم هتلاقي مكانه [[@Injectable({ providedIn: 'root' })]] (درس الـ services).

---

## ٣. [[ng g guard auth/auth]]

~~~text الناتج
CREATE src/app/auth/auth-guard.spec.ts (476 bytes)
CREATE src/app/auth/auth-guard.ts (133 bytes)
~~~

لاحظ الاسم: [[auth-guard.ts]]، يعني الـ CLI بيضيف نوع الحاجة للاسم بشرطة. وجواه:

~~~text auth-guard.ts
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
~~~

function مش class، ونوعها [[CanActivateFn]]، وبترجّع [[true]] (يعني «ادخل») لحد ما تكتب الشرط بتاعك. لو الترمنال interactive الأمر بيسألك أنهي نوع guard، وإحنا شغّلناه من غير ترمنال فأخد الافتراضي. وعشان تختار من غير سؤال:

~~~powershell
ng g guard auth/admin --implements CanMatch
~~~

~~~text admin-guard.ts
export const adminGuard: CanMatchFn = (route, segments) => {
  return true;
};
~~~

---

## ٤. [[ng g interceptor core/auth]]

~~~text auth-interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
~~~

interceptor = دالة بتقف في نص أي طلب HTTP. [[req]] الطلب، و [[next(req)]] معناها «كمّل بيه زي ما هو». هتغيّره في درس الـ interceptors.

---

## ٥. [[ng g pipe shared/egp]]

~~~text egp-pipe.ts
@Pipe({
  name: 'egp',
})
export class EgpPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
~~~

الملف [[egp-pipe.ts]] والكلاس [[EgpPipe]]، والاسم اللي هتكتبه في الـ template [[egp]]: [[{{ price | egp }}]]. والـ [[transform]] بترجّع [[null]] لحد ما تكتبها (درس الـ pipes).

---

## ٦. [[ng g environments]]

~~~text الناتج
CREATE src/environments/environment.ts (31 bytes)
CREATE src/environments/environment.development.ts (31 bytes)
UPDATE angular.json (2201 bytes)
~~~

[[UPDATE]] معناها إنه عدّل ملف موجود. الملفين فيهم [[export const environment = {};]]، والتعديل في [[angular.json]] هو ده:

~~~text angular.json (جزء)
"fileReplacements": [
  {
    "replace": "src/environments/environment.ts",
    "with": "src/environments/environment.development.ts"
  }
]
~~~

يعني في الـ build بتاع development، أي [[import]] لـ [[environment.ts]] بيتبدّل بملف الـ development. فتحط مثلًا [[apiUrl]] مختلف في كل ملف.

---

## ٧. [[ng g c products/product-list --dry-run]]

~~~text الناتج
CREATE src/app/products/product-list/product-list.spec.ts (590 bytes)
CREATE src/app/products/product-list/product-list.ts (218 bytes)
CREATE src/app/products/product-list/product-list.css (0 bytes)
CREATE src/app/products/product-list/product-list.html (28 bytes)

NOTE: The "--dry-run" option means no changes were made.
~~~

نفس ناتج الأمر الحقيقي، بس الـ NOTE بتقول إن مفيش حاجة اتكتبت فعلًا. استخدمه قبل أي أمر مش متأكد هيحط الملفات فين.

### ولو كتبت الاسم PascalCase؟

~~~powershell
ng g c ProductCard --dry-run
~~~

~~~text الناتج
CREATE src/app/product-card/product-card.ts (218 bytes)
...
~~~

الـ CLI حوّله لـ [[product-card]] لوحده، بس في فولدر جديد في [[src/app/]] مش جوه [[products/]]. عشان كده اكتب المسار بالـ kebab-case من الأول.

---

## الخلاصة

| الأمر | بيعمل | الملفات |
|---|---|---|
| [[ng g c x/name]] | component | فولدر [[name/]] فيه ts و html و css و spec |
| [[ng g s x/name]] | service بـ [[@Service()]] | [[name.ts]] و spec |
| [[ng g guard x/name]] | [[CanActivateFn]] | [[name-guard.ts]] |
| [[ng g interceptor x/name]] | [[HttpInterceptorFn]] | [[name-interceptor.ts]] |
| [[ng g pipe x/name]] | [[@Pipe]] | [[name-pipe.ts]] |
| [[ng g environments]] | ملفات environment | + تعديل [[angular.json]] |
| [[--dry-run]] | يوريك من غير ما يكتب | ولا حاجة |`,
          lines: [
            R`component في [[src/app/products/product-card/]]: ts و html و css و spec.`,
            R`service اسمها [[Products]] في [[products/products.ts]].`,
            R`guard كـ function من نوع [[CanActivateFn]] (الافتراضي، وبيسألك لو شغّال interactive). [[--implements CanMatch]] لنوع تاني.`,
            R`interceptor كـ function من نوع [[HttpInterceptorFn]].`,
            R`pipe اسمها [[egp]] (كلاس [[EgpPipe]]).`,
            R`بيعمل [[src/environments/]] ويعدّل [[angular.json]] عشان يبدّل الملف حسب الـ build.`,
            "يوريك هيعمل إيه من غير ما يكتب حاجة."
          ],
          sol: R`[[ng g c cart/cart-summary --dry-run]] بيطبع ٤ سطور CREATE: [[cart-summary.css]] و [[cart-summary.spec.ts]] و [[cart-summary.ts]] و [[cart-summary.html]] جوه [[src/app/cart/cart-summary/]]، وفي الآخر NOTE: The "--dry-run" option means no changes were made.

الـ [[.ts]] فيه [[selector: 'app-cart-summary']] والكلاس [[CartSummary]] و [[imports: []]]، ومفيهوش [[standalone: true]] لأنه بقى الافتراضي من Angular 19.

والـ service ([[ng g s cart/cart]]) بتطلع:

[[import { Service } from '@angular/core';]] وتحتها [[@Service()]] و [[export class Cart {}]]. لو شفت [[@Injectable({ providedIn: 'root' })]] بدلها، يبقى الـ CLI عندك أقدم من 22، والاتنين بيشتغلوا نفس الشغل تقريبًا.`
        }
      ]
    },
    {
      t: "الـ components والـ templates",
      l: 1,
      n: "كلاس عليه @Component، و template فيه bindings، و input و output و model بين الأب والابن",
      items: [
        {
          cmd: "@Component",
          title: "شكل الـ component: selector و template و imports",
          desc: R`الـ component في Angular كلاس TypeScript عليه decorator اسمه [[@Component]]. الـ decorator بيقول: الـ tag اسمه إيه ([[selector]])، والـ HTML بتاعه ([[template]] أو [[templateUrl]])، والـ CSS ([[styles]] أو [[styleUrl]])، وبيستخدم components تانية إيه ([[imports]]).

الكلاس نفسه فيه البيانات والدوال، والـ template بيقرا منهم. زي function component في React، بس هنا الـ HTML منفصل عن الكود، ومش JSX.

وكل component في Angular الحديث standalone: بيعلن اللي محتاجه في [[imports]] بتاعته، من غير NgModule.`,
          example: R`import { Component, signal } from '@angular/core';
@Component({
  selector: 'app-hello',
  template: $__bt
    <h1>أهلا يا {{ name() }}</h1>
    <p>عندك {{ count() }} رسالة</p>
  $__bt,
  styles: $__bth1 { color: teal; }$__bt,
})
export class Hello {
  protected readonly name = signal('سارة');
  protected readonly count = signal(3);
}
// في app.ts: imports: [Hello] وفي الـ template: <app-hello />`,
          try: R`اعمل الـ component ده في [[src/app/hello.ts]]، وضيفه في [[imports]] بتاع [[App]]، واكتب [[<app-hello />]] في app.html. بعدين امسح [[Hello]] من الـ imports وشوف الـ build بيقول إيه.`,
          flag: "script",
          deep: {
            why: "الشاشة بتتقسم لقطع صغيرة كل واحدة مسؤولة عن حتة: هيدر، وكارت منتج، وسلة. كل قطعة ليها HTML و CSS ومنطق، ولو في ملف واحد ضخم محدش هيعرف يلاقي حاجة. الـ component بيجمع التلاتة في وحدة واحدة ليها اسم تستخدمه زي tag.",
            how: R`الـ compiler بيقرا الـ decorator وقت الـ build ويحوّل الـ template لتعليمات JS بتعمل الـ DOM وتحدّثه. عشان كده لو كتبت [[<app-hello />]] وانت ناسي تحطه في [[imports]]، الـ build بيقع بـ NG8001: 'app-hello' is not a known element. ده مش خطأ runtime، ده من الـ compiler.

الـ styles معزولة افتراضيًا (Emulated encapsulation): Angular بيضيف attribute زي [[_ngcontent-ng-c123]] على العناصر ويعدّل الـ CSS بتاعك عشان يطبّق عليها بس. فـ [[h1 { color: teal }]] هنا مش هيلوّن كل h1 في الموقع.

[[protected]] على الخصايص معناها «الـ template يقدر يشوفها، بس كلاس تاني من برا لأ»، والـ CLI بيولّدها كده. و [[readonly]] عشان متعيّنش الـ signal نفسه بقيمة تانية بالغلط.

والـ self-closing [[<app-hello />]] مسموح من Angular 15.1.`,
            when: "أي حتة في الشاشة ليها معنى لوحدها أو بتتكرر. في الأول template صغير inline جوه الـ .ts مريح، ولما يكبر عن ١٠ سطور تقريبًا انقله لـ [[templateUrl]].",
            mistakes: R`تنسى تحط الـ component في [[imports]] بتاع الأب (NG8001). وتكتب [[{{ name }}]] على signal من غير قوسين: الـ build بيعدّي بتحذيرين (NG8109 و NG8117) والصفحة بتطبع [[[Signal (name): سارة]]]، الصح [[{{ name() }}]]. وتتوقع إن CSS الـ component يأثر على component جوّاه: لأ، العزل بيمنعه. وفي كود قديم هتلاقي [[standalone: false]] أو components متعرفة في NgModule، وده الشكل القديم (المستوى ٣).`
          },
          teach: R`## الفكرة: كلاس عادي + decorator بيقول لـ Angular «ده component»

المثال ٣ حتت: سطر import، وdecorator فيه الإعدادات، وكلاس فيه البيانات. اتشغّل في مشروع Angular 22.2 ([[ng serve]] و [[ng build]]) واتفحص في Chrome headless.

---

## ١. الـ import

~~~text hello.ts
import { Component, signal } from '@angular/core';
~~~

[[@angular/core]] قلب Angular. بناخد منه [[Component]] (الـ decorator) و [[signal]] (علبة لقيمة بتتغير، ليها درس كامل بعد شوية). الأقواس [[{ }]] معناها «هات الحاجات دي بالاسم» (named imports).

---

## ٢. الـ decorator: [[@Component({...})]]

الـ decorator دالة بتتكتب بـ [[@]] فوق الكلاس على طول، وبتضيف له معلومات. هنا بتاخد object فيه الإعدادات:

### [[selector: 'app-hello']]

اسم الـ tag اللي هتكتبه في HTML أي component تاني: [[<app-hello />]]. الشرطة في الاسم مش ديكور: أي custom element في HTML لازم يبقى فيه شرطة عشان ميتخانقش مع tags المتصفح، و [[app-]] هو الـ prefix بتاع المشروع.

### [[template]]

الـ HTML نفسه، مكتوب بين علامتين backtick (template string في TypeScript) عشان يبقى على كذا سطر:

~~~text template
<h1>أهلا يا {{ name() }}</h1>
<p>عندك {{ count() }} رسالة</p>
~~~

- [[{{ }}]] اسمها interpolation: «اطبع قيمة الـ expression ده كنص».
- [[name()]] بالقوسين: الـ signal بتتقري كأنها دالة.

### [[styles]]

[[h1 { color: teal; }]]: CSS خاص بالـ component ده. ولو الـ HTML أو الـ CSS كبروا، بتنقلهم لملفات وتكتب [[templateUrl: './hello.html']] و [[styleUrl: './hello.css']] زي اللي [[ng g c]] بيولّده.

---

## ٣. الكلاس

~~~text hello.ts
export class Hello {
  protected readonly name = signal('سارة');
  protected readonly count = signal(3);
}
~~~

| الكلمة | معناها |
|---|---|
| [[export]] | عشان ملف تاني يقدر يعمل [[import { Hello }]] |
| [[class Hello]] | اسم الكلاس، من غير كلمة Component في آخره (الشكل الحديث) |
| [[protected]] | الـ template يشوفها، بس كود من برا الكلاس لأ |
| [[readonly]] | متقدرش تكتب [[this.name = ...]] وتبدّل الـ signal نفسها؛ بتغيّر القيمة اللي جواها بـ [[set]] |
| [[signal('سارة')]] | signal قيمتها الأولى سارة، ونوعها اتعرف لوحده: string |

---

## ٤. نستخدمه: [[imports: [Hello]]]

في [[app.ts]] (زي الـ solCode):

~~~text app.ts
@Component({
  selector: 'app-root',
  imports: [Hello],
  template: $__bt<app-hello />$__bt,
})
export class App {}
~~~

[[imports]] هي قايمة الـ components (والـ directives والـ pipes) اللي الـ template ده مسموح يستخدمها. ده معنى standalone: كل component بيعلن اللي محتاجه بنفسه.

### الناتج في المتصفح

~~~text الـ DOM في Chrome
<app-hello _nghost-ng-c4047523299="">
  <h1 _ngcontent-ng-c4047523299="">أهلا يا سارة</h1>
  <p _ngcontent-ng-c4047523299="">عندك 3 رسالة</p>
</app-hello>
~~~

ولون الـ h1 طلع [[rgb(0, 128, 128)]]، وده teal.

### الـ attributes الغريبة دي إيه؟

دي آلية عزل الـ CSS. Angular حط [[_nghost-...]] على الـ tag نفسه و [[_ngcontent-...]] على كل عنصر جواه، وعدّل الـ CSS بتاعك لده:

~~~text الـ style اللي اتحط في الصفحة
h1[_ngcontent-ng-c4047523299] {
  color: teal;
}
~~~

يعني الـ h1 اللي عليه الـ attribute ده بس، مش كل h1 في الموقع. الرقم بيتولّد لكل component.

---

## ٥. لو نسيت [[imports]]

شلنا [[Hello]] من [[imports]] وسبنا [[<app-hello />]] في الـ template، و [[ng build]]:

~~~text الناتج
Application bundle generation failed.

X [ERROR] NG8001: 'app-hello' is not a known element:
1. If 'app-hello' is an Angular component, then verify that it is included in the '@Component.imports' of this component.
2. If 'app-hello' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@Component.schemas' of this component to suppress this message.

    src/app/app.ts:7:13:
      7 │   template: $__bt<app-hello /><router-outlet />$__bt,
        ╵              ~~~~~~~~~~~~~
~~~

اقرا الرسالة: الـ compiler مش عارف [[app-hello]]، واقترح حلين: لو component حطه في الـ imports (ده حالتنا)، ولو Web Component (عنصر معمول من غير Angular) قوله يتجاهله. والسهم تحت بيشاور على السطر والعمود بالظبط. والـ build وقع، يعني الغلطة مش هتوصل للمستخدم.

والعكس: [[Hello]] في [[imports]] والـ template مش بيستخدمه:

~~~text الناتج
▲ [WARNING] NG8113: Hello is not used within the template of App
~~~

تحذير بس، والـ build بيكمّل. شيله عشان الـ bundle.

---

## ٦. لو نسيت القوسين: [[{{ name }}]]

~~~text الناتج
▲ [WARNING] NG8109: name is a function and should be invoked: name()
▲ [WARNING] NG8117: Function in text interpolation should be invoked: name().
~~~

والصفحة طبعت:

~~~text الناتج في Chrome
أهلا يا [Signal (name): سارة]
~~~

اللي اتطبع وصف الـ signal نفسها مش القيمة. الـ compiler حذّرك، فاقرا التحذيرات.

---

## الخلاصة

| الحتة | شغلتها |
|---|---|
| [[@Component({...})]] | يحوّل الكلاس لـ component |
| [[selector]] | اسم الـ tag، فيه شرطة |
| [[template]] / [[templateUrl]] | الـ HTML |
| [[styles]] / [[styleUrl]] | CSS معزول للـ component ده بس |
| [[imports]] | اللي الـ template ده بيستخدمه، وإلا NG8001 |
| [[{{ x() }}]] | اطبع قيمة signal، بالقوسين |`,
          lines: [
            R`[[Component]] الـ decorator، و [[signal]] عشان البيانات اللي بتتغير.`,
            "الـ decorator: كل الإعدادات جوه object.",
            R`الاسم اللي هتكتبه في HTML: [[<app-hello />]].`,
            "الـ HTML inline بين backticks.",
            R`[[{{ }}]] بيطبع قيمة. [[name()]] بتقرا الـ signal.`,
            "نفس الفكرة لرقم.",
            "قفلة الـ template.",
            "CSS خاص بالـ component ده بس.",
            "قفلة الـ decorator.",
            R`الكلاس. اسمه [[Hello]] من غير كلمة Component في الشكل الحديث.`,
            R`بيانات الـ component. [[protected]] يعني الـ template يشوفها.`,
            "رقم في signal.",
            "قفلة الكلاس."
          ],
          sol: R`لما يبقى في الـ imports هتشوف «أهلا يا سارة» بلون teal و «عندك 3 رسالة». وافتح DevTools: هتلاقي [[<app-hello _nghost-...>]] والـ h1 عليه [[_ngcontent-...]]، ودي آلية عزل الـ CSS.

لما تمسحه من الـ imports، [[ng serve]] بيطلّع:

[[NG8001: 'app-hello' is not a known element]] ومعاه اقتراح: If 'app-hello' is an Angular component, then verify that it is included in the '@Component.imports' of this component. والعكس: لو [[Hello]] في [[imports]] والـ template مش بيستخدمه، الـ build بيعدّي بتحذير [[NG8113: Hello is not used within the template of App]]. الخطأ بيطلع في الـ build، مش بعد ما تفتح الصفحة، وده من فوايد الـ AOT compiler.`,
          solCode: R`// app.ts
import { Component } from '@angular/core';
import { Hello } from './hello';
@Component({
  selector: 'app-root',
  imports: [Hello],
  template: $__bt<app-hello />$__bt,
})
export class App {}`
        },
        {
          cmd: "bindings",
          title: "{{ }} و [prop] و (event) و #ref في الـ template",
          desc: R`الـ template بيتكلم مع الكلاس بـ ٤ أشكال:

[[{{ expr }}]] interpolation: بتطبع قيمة كنص.

[[[prop]="expr"]] property binding: بتحط قيمة في خاصية DOM ([[[disabled]]] و [[[src]]])، أو [[[class.active]]] و [[[style.width.px]]].

[[(event)="handler()"]] event binding: بتسمع لحدث. [[$event]] هو الـ event نفسه، و [[(keyup.enter)]] بيسمع لـ Enter بس.

[[#box]] template reference: اسم لعنصر تقدر تستخدمه في نفس الـ template.

الأقواس المربعة = البيانات داخلة للعنصر، والقوسين العاديين = حدث طالع منه.`,
          example: R`@Component({
  selector: 'app-bindings',
  template: $__bt
    <img [src]="photo" [alt]="title" />
    <button [disabled]="saving()" (click)="save()">حفظ</button>
    <p [class.error]="failed()" [style.font-size.px]="16">{{ status() }}</p>
    <input #box (keyup.enter)="greet(box.value)" />
  $__bt,
})
export class Bindings {
  protected photo = '/logo.png';
  protected title = 'لوجو المحل';
  protected saving = signal(false);
  protected failed = signal(false);
  protected status = signal('جاهز');
  protected save() { this.saving.set(true); this.status.set('بيحفظ...'); }
  protected greet(v: string) { this.status.set('أهلا ' + v); }
}`,
          try: R`حط الـ component واكتب اسمك في الـ input واضغط Enter. بعدين اضغط حفظ وشوف الزرار اتقفل. وجرّب تكتب [[disabled="saving()"]] من غير أقواس مربعة، وشوف الزرار بيبقى إيه.`,
          flag: "script",
          deep: {
            why: "محتاج طريقة توصّل البيانات بالشاشة في الاتجاهين من غير ما تكتب querySelector و addEventListener بإيدك. الـ bindings بتقول لـ Angular «الخاصية دي مربوطة بالقيمة دي»، وهو اللي يحدّثها لما القيمة تتغير.",
            how: R`[[[disabled]="saving()"]] مش HTML attribute، دي property على الـ DOM element ([[button.disabled = true]]). الفرق مهم: الـ attribute نص ثابت في HTML، والـ property قيمة JS حية. لو محتاج attribute فعلًا (زي [[aria-label]] أو [[colspan]]) اكتب [[[attr.aria-label]]].

من غير أقواس، [[disabled="saving()"]] بتبقى نص ثابت "saving()"، ووجود attribute [[disabled]] أصلًا بيقفل الزرار أيًا كانت قيمته.

الـ expressions في الـ template JS محدودة: تقرا وتنادي دوال وتستخدم [[?.]] و [[??]] و ternary، بس متعملش [[new]] ولا assignments معقدة. والـ compiler بيفحص أنواعها (strict templates شغال افتراضيًا)، فلو كتبت [[greet(box.valu)]] هيطلع خطأ build.

[[(keyup.enter)]] pseudo-event من Angular: بيفلتر المفتاح بدالك. وفيه [[(keydown.control.s)]] وغيره.`,
            when: R`interpolation للنص، و [[[prop]]] لأي حاجة مش نص أو خاصية DOM، و [[(event)]] لأي تفاعل. و [[#ref]] لما محتاج قيمة عنصر في نفس الـ template من غير ما تخزنها في الكلاس.`,
            mistakes: R`[[[src]="'/logo.png'"]] بدل [[src="/logo.png"]]: لو القيمة ثابتة مش محتاج binding. و [[(click)="save"]] من غير قوسين: مش هيحصل حاجة، لازم تنادي الدالة [[save()]]. و [[{{ }}]] جوه [[[prop]]]: متخلطهمش، اختار واحد. وتعدّل state جوه expression في الـ template (زي [[{{ count = count + 1 }}]]): ممنوع ومش منطقي.`
          },
          teach: R`## الفكرة: ٤ رموز، كل واحد ليه اتجاه

| الرمز | الاسم | الاتجاه |
|---|---|---|
| [[{{ x }}]] | interpolation | من الكلاس للشاشة، كنص |
| [[[prop]="x"]] | property binding | من الكلاس لخاصية في العنصر |
| [[(event)="f()"]] | event binding | من العنصر للكلاس، لما حاجة تحصل |
| [[#name]] | template reference | اسم للعنصر جوه الـ template نفسه |

افتكرها كده: الأقواس المربعة **داخلة** للعنصر، والقوسين العاديين **طالعين** منه. المثال اتشغّل في [[ng serve]] (Angular 22.2) واتفحص في Chrome headless بـ Playwright. (المثال من غير سطر import: محتاج [[import { Component, signal } from '@angular/core';]] فوق.)

---

## ١. [[<img [src]="photo" [alt]="title" />]]

[[[src]="photo"]] معناها: خاصية [[src]] بتاعة الصورة = قيمة [[photo]] من الكلاس. اللي جوه علامات التنصيص **expression** (كود)، مش نص. فـ [[photo]] هنا اسم خاصية، قيمتها [['/logo.png']].

~~~text الـ DOM في Chrome
<img src="/logo.png" alt="لوجو المحل">
~~~

(والصورة طلعت 404 لأن مفيش [[logo.png]] في [[public/]]، وده طبيعي في التجربة.)

> القيمة هنا ثابتة، فكان ممكن [[src="/logo.png"]] من غير binding. الـ binding مفيد لما القيمة جاية من الكلاس أو بتتغير.

---

## ٢. [[<button [disabled]="saving()" (click)="save()">]]

حتتين على نفس العنصر:

### [[[disabled]="saving()"]]

[[disabled]] هنا **property** على عنصر الـ DOM، يعني [[button.disabled = false]] أو [[true]] حسب [[saving()]]. في الأول [[saving]] بـ [[false]]:

~~~text الـ DOM في الأول
<button>حفظ</button>          button.disabled = false
~~~

### [[(click)="save()"]]

لما الزرار يتداس، نفّذ [[save()]]. لاحظ القوسين بعد [[save]]: انت بتكتب كود بيتنفّذ، فلازم تنادي الدالة.

و [[save()]] في الكلاس:

~~~text bindings.ts
protected save() { this.saving.set(true); this.status.set('بيحفظ...'); }
~~~

[[set]] بتحط قيمة جديدة في الـ signal، و Angular بيحدّث كل حتة في الشاشة بتقراها. بعد الضغطة:

~~~text الـ DOM بعد الضغط
<button disabled="">حفظ</button>      button.disabled = true
<p style="font-size: 16px;">بيحفظ...</p>
~~~

---

## ٣. [[<p [class.error]="failed()" [style.font-size.px]="16">]]

شكلين مختصرين للـ property binding:

| الشكل | معناه |
|---|---|
| [[[class.error]="failed()"]] | حط class اسمه [[error]] لو القيمة [[true]]، وشيله لو [[false]] |
| [[[style.font-size.px]="16"]] | [[style.fontSize = '16px']]. الـ [[.px]] في الآخر هي الوحدة |

[[failed()]] بـ [[false]]، فمفيش class، والـ style اتحط:

~~~text الـ DOM
<p style="font-size: 16px;">جاهز</p>
~~~

و [[{{ status() }}]] جوّاه بيطبع النص من الـ signal.

---

## ٤. [[<input #box (keyup.enter)="greet(box.value)" />]]

- [[#box]]: اسم للـ input ده، تقدر تستخدمه في أي حتة في نفس الـ template. [[box]] هنا هو عنصر الـ DOM نفسه ([[HTMLInputElement]])، فـ [[box.value]] هو المكتوب جواه.
- [[(keyup.enter)]]: حدث [[keyup]] (رفع الصباع من على زرار)، بس لو الزرار Enter. الفلترة دي من Angular، مش من المتصفح.
- [[greet(box.value)]]: ابعت النص لـ [[greet]].

كتبنا «سارة» ودوسنا Enter:

~~~text الناتج
after enter p: أهلا سارة
~~~

### والـ template متفحوص بالأنواع

غلطنا وكتبنا [[box.valu]]، و [[ng build]]:

~~~text الناتج
X [ERROR] TS2551: Property 'valu' does not exist on type 'HTMLInputElement'. Did you mean 'value'?

      8 │     <input #box (keyup.enter)="greet(box.valu)" />
        ╵                                          ~~~~
~~~

الـ compiler عارف إن [[box]] نوعه [[HTMLInputElement]] وفحص الاسم، زي TypeScript في ملف [[.ts]] بالظبط.

---

## ٥. الكلاس

| السطر | ليه كده |
|---|---|
| [[protected photo = '/logo.png']] | خاصية عادية: مش هتتغير، فمش محتاجة signal |
| [[protected saving = signal(false)]] | بتتغير والشاشة لازم تعرف، فـ signal |
| [[protected greet(v: string)]] | [[v: string]] نوع الـ parameter |
| [[this.status.set('أهلا ' + v)]] | [[+]] بيلزق نصين |

---

## ٦. التجربة: [[disabled="saving()"]] من غير أقواس

~~~text الـ DOM من أول لحظة
<button disabled="saving()">حفظ</button>      button.disabled = true
~~~

من غير أقواس مربعة ده بقى HTML attribute عادي قيمته **النص** «saving()»، و Angular مش بيقيّمه. وفي HTML مجرد وجود attribute [[disabled]] بيقفل الزرار أيًا كانت قيمته، فالزرار اتقفل من الأول ومعرفناش ندوس عليه خالص.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تطبع قيمة | [[{{ status() }}]] |
| خاصية من الكلاس | [[[disabled]="saving()"]] |
| class بشرط | [[[class.error]="failed()"]] |
| style بوحدة | [[[style.font-size.px]="16"]] |
| تسمع لحدث | [[(click)="save()"]] بالقوسين |
| Enter بس | [[(keyup.enter)]] |
| عنصر من الـ template | [[#box]] وبعدين [[box.value]] |
| attribute حقيقي | [[[attr.aria-label]="x"]] |`,
          lines: [
            "الـ decorator.",
            "اسم الـ tag.",
            "بداية الـ template.",
            R`property binding: [[src]] و [[alt]] جايين من الكلاس.`,
            R`الزرار مقفول لو [[saving()]] بـ true، والضغط بينادي [[save()]].`,
            R`class [[error]] بيتحط لو [[failed()]] بـ true، وحجم الخط 16px، والنص من [[status()]].`,
            R`[[#box]] اسم للـ input، و Enter بيبعت قيمته لـ [[greet]].`,
            "قفلة الـ template.",
            "قفلة الـ decorator.",
            "الكلاس.",
            "خاصية عادية مش signal لأنها مش هتتغير.",
            "نفس الكلام.",
            "حالة الحفظ في signal عشان الشاشة تتحدّث لما تتغير.",
            "حالة الخطأ.",
            "النص اللي بيظهر.",
            R`[[set]] بتغيّر قيمة الـ signal، والشاشة بتتحدّث لوحدها.`,
            "بتاخد النص من الـ input.",
            "قفلة الكلاس."
          ],
          sol: R`لما تكتب «سارة» وتضغط Enter، النص تحت بيبقى «أهلا سارة». ولما تضغط حفظ، الزرار بيبقى رمادي ومقفول والنص «بيحفظ...».

لما تكتب [[disabled="saving()"]] من غير أقواس، الزرار بيبقى مقفول من أول لحظة ومش هيتفتح أبدًا. السبب: ده بقى HTML attribute قيمته النص "saving()"، ومجرد وجود attribute [[disabled]] بيقفل الزرار. نفس الحكاية مع [[disabled="false"]]: برضه مقفول. عشان كده القيم الـ boolean دايمًا بـ [[[disabled]]].`
        },
        {
          cmd: "input() و output()",
          title: "تبعت بيانات للـ component الابن، وتسمع منه",
          desc: R`الأب بيبعت بيانات للابن عن طريق [[input()]]، والابن بيبلّغ الأب بحاجة حصلت عن طريق [[output()]]. زي props و callbacks في React بالظبط، بس بشكل مختلف:

في الابن: [[product = input.required<Product>()]] و [[added = output<number>()]].

في الأب: [[<app-product-card [product]="p" (added)="onAdd($event)" />]].

[[input()]] بترجع signal للقراية بس: بتقراها [[product()]] ومتقدرش تعمل لها set من جوه الابن.`,
          example: R`import { Component, computed, input, output } from '@angular/core';
export type Product = { id: number; name: string; price: number };
@Component({
  selector: 'app-product-card',
  template: $__bt
    <h3>{{ product().name }}</h3>
    <p>{{ priceLabel() }}</p>
    <button (click)="added.emit(product().id)">أضف للسلة</button>
  $__bt,
})
export class ProductCard {
  product = input.required<Product>();
  currency = input('EGP');
  added = output<number>();
  priceLabel = computed(() => $__bt$__{this.product().price} $__{this.currency()}$__bt);
}
// في الأب: <app-product-card [product]="p" (added)="onAdd($event)" />`,
          try: R`استخدم الكارت في [[App]] مع منتج، واعمل [[onAdd(id: number)]] بتطبع الـ id في الـ console. وبعدين امسح [[[product]="p"]] من الأب وشوف الخطأ. وجرّب [[currency="USD"]] من غير أقواس.`,
          flag: "script",
          deep: {
            why: "الـ component اللي بيعرض كارت منتج مينفعش يعرف المنتج جاي منين ولا السلة بتتحفظ فين، وإلا مش هتعرف تستخدمه في صفحة تانية. بيستقبل البيانات من برا، ويقول «حد داس على الزرار» ويسيب الأب يقرر يعمل إيه. ده بيخليه قابل لإعادة الاستخدام وسهل تختبره.",
            how: R`[[input.required<T>()]] معناها الأب لازم يبعتها، ولو نسي الـ compiler بيطلّع NG8008: Required input 'product' from component ProductCard must be specified. و [[input('EGP')]] ليها قيمة افتراضية ونوعها اتستنتج string.

ولأن الـ input signal، تقدر تبني عليه [[computed]] وهيتحسب تاني لوحده لما الأب يبعت قيمة جديدة. ده بيغنيك عن [[ngOnChanges]] اللي كانت في الشكل القديم.

[[output<number>()]] بيرجع [[OutputEmitterRef]]، و [[.emit(7)]] بتبعت 7، والأب بيستلمها في [[$event]]. مفيش bubbling زي DOM events: الـ output بيوصل للأب المباشر بس.

في الكود القديم هتلاقي [[@Input() product!: Product]] و [[@Output() added = new EventEmitter<number>()]]. نفس الفكرة بـ decorators، والـ migration [[ng g @angular/core:signal-input-migration]] بيحوّلها.`,
            when: R`أي component بيعرض بيانات جاية من برا أو بيبلّغ عن تفاعل. لو البيانات محتاجها components كتير بعيدة عن بعض، متعدّيهاش input ورا input: حطها في service (درس الـ services).`,
            mistakes: R`تحاول [[this.product.set(...)]] جوه الابن: input للقراية بس، ولو محتاج الاتجاهين استخدم [[model()]] (الدرس الجاي). وتكتب [[[currency]="USD"]] فيدوّر على متغير اسمه USD؛ النص الثابت من غير أقواس [[currency="USD"]] أو [[[currency]="'USD'"]]. وتقرا [[this.product()]] في الـ constructor: الـ input لسه ماتحطش. الـ compiler في 22 بيمسكها وقت الـ build ([[NG8118: product is a required input and does not have a value in this context]])، ولو عدّت بطريقة ما، بتقع وقت التشغيل بـ NG0950. اقراه في computed أو في الـ template أو بعد ngOnInit.`
          },
          teach: R`## الفكرة: الأب بيبعت بـ [[[ ]]]، والابن بيرد بـ [[( )]]

~~~text الاتجاهين
الأب (App)                                   الابن (ProductCard)
[product]="p"         ───── input ─────►     product = input.required<Product>()
(added)="onAdd($event)" ◄──── output ─────    added.emit(7)
~~~

اتشغّل الابن من المثال والأب من الـ solCode في [[ng serve]] (Angular 22.2) واتفحص في Chrome.

---

## ١. الـ imports والنوع

~~~text card.ts
import { Component, computed, input, output } from '@angular/core';
export type Product = { id: number; name: string; price: number };
~~~

[[input]] و [[output]] و [[computed]] دوال من core. و [[type Product]] بيوصف شكل المنتج: object فيه [[id]] رقم و [[name]] نص و [[price]] رقم. [[export]] عشان الأب كمان يستخدم النوع.

---

## ٢. الـ inputs

~~~text card.ts
product = input.required<Product>();
currency = input('EGP');
~~~

| السطر | معناه |
|---|---|
| [[input.required<Product>()]] | input **إجباري**، نوعه [[Product]]. الـ [[<Product>]] ده generic: بيقول نوع القيمة |
| [[input('EGP')]] | اختياري، ولو الأب مبعتهوش قيمته [['EGP']]، ونوعه string اتعرف من القيمة |

الاتنين signals للقراية: بتقراهم [[product()]] و [[currency()]]، ومفيش [[set]].

---

## ٣. الـ output

~~~text card.ts
added = output<number>();
~~~

[[output<number>()]] قناة بيبعت منها الابن رقم للأب. وفي الـ template:

~~~text template
<button (click)="added.emit(product().id)">أضف للسلة</button>
~~~

لما الزرار يتداس: [[product().id]] = 7، و [[emit(7)]] بتبعته.

---

## ٤. [[computed]] من اتنين inputs

~~~text card.ts
priceLabel = computed(() => $__bt$__{this.product().price} $__{this.currency()}$__bt);
~~~

- [[() =>]] arrow function بترجّع القيمة.
- النص بين backticks template literal، و [[$__{...}]] بتحط قيمة جوه النص.
- [[computed]] بتعرف لوحدها إنها بتقرا [[product]] و [[currency]]، فلو الأب بعت قيمة جديدة لأي واحد فيهم، [[priceLabel]] بتتحسب تاني.

---

## ٥. الأب (الـ solCode)

~~~text app.ts
template: $__bt<app-product-card [product]="p" currency="USD" (added)="onAdd($event)" />$__bt,
~~~

| الحتة | معناها |
|---|---|
| [[[product]="p"]] | ابعت قيمة [[p]] من كلاس الأب |
| [[currency="USD"]] | من غير أقواس = النص «USD» كما هو |
| [[(added)="onAdd($event)"]] | لما الابن يعمل [[emit]]، نادي [[onAdd]] |
| [[$event]] | القيمة اللي اتبعتت في [[emit]]: هنا الرقم 7، مش event من المتصفح |

### الناتج في Chrome

~~~text الناتج
قلم
10 USD
أضف للسلة
~~~

ودوسنا الزرار:

~~~text الـ Console
added 7
~~~

---

## ٦. الأخطاء اللي الـ compiler بيمسكها

### الأب نسي input إجباري

شلنا [[[product]="p"]]:

~~~text ng build
X [ERROR] NG8008: Required input 'product' from component ProductCard must be specified.

      6 │   template: $__bt<app-product-card currency="USD" (added)="onAdd($event...
        ╵               ~~~~~~~~~~~~~~~~
~~~

### أقواس على نص ثابت

كتبنا [[[currency]="USD"]]:

~~~text ng build
X [ERROR] TS2339: Property 'USD' does not exist on type 'CardParent'.
~~~

الأقواس المربعة خلّت [[USD]] كود، فدوّر على خاصية اسمها [[USD]] في الأب. النص الثابت يا إما من غير أقواس، يا إما [[[currency]="'USD'"]] بعلامات تنصيص جوه.

### قراية input في الـ constructor

زوّدنا [[constructor() { console.log(this.product()); }]]:

~~~text ng build
X [ERROR] NG8118: $__btproduct$__bt is a required $__btinput$__bt and does not have a value in this context.
~~~

الـ constructor بيشتغل قبل ما الأب يحط القيم، والـ compiler مسك ده. اقراه في [[computed]] أو في الـ template.

---

## الخلاصة

| الحاجة | في الابن | في الأب |
|---|---|---|
| بيانات داخلة إجبارية | [[x = input.required<T>()]] | [[[x]="value"]] |
| بيانات داخلة بقيمة افتراضية | [[x = input('EGP')]] | [[x="USD"]] أو مفيش |
| حدث طالع | [[done = output<number>()]] و [[done.emit(7)]] | [[(done)="f($event)"]] |
| القراية | [[x()]] | — |`,
          lines: [
            R`[[input]] و [[output]] و [[computed]] كلهم من core.`,
            "نوع المنتج.",
            "الـ decorator.",
            "الـ selector.",
            "بداية الـ template.",
            R`بنقرا الـ input كـ signal: [[product()]].`,
            R`قيمة محسوبة من اتنين inputs.`,
            R`الضغطة بتبعت الـ id للأب بـ [[emit]].`,
            "قفلة الـ template.",
            "قفلة الـ decorator.",
            "الكلاس.",
            "input إجباري: الأب لازم يبعته.",
            "input اختياري بقيمة افتراضية.",
            "output بيبعت رقم.",
            R`[[computed]] بتتحسب تاني لوحدها لما أي input يتغير.`,
            "قفلة الكلاس."
          ],
          sol: R`لما تضغط «أضف للسلة» الـ console بيطبع 7 (أو الـ id اللي بعته). [[$event]] في الأب هو نفس الرقم اللي اتبعت في [[emit]]، مش event من المتصفح.

لما تمسح [[[product]="p"]]: خطأ build [[NG8008: Required input 'product' from component ProductCard must be specified]].

[[currency="USD"]] من غير أقواس شغال وبيبعت النص "USD"، فالكارت يعرض [[10 USD]]. لو كتبت [[[currency]="USD"]] هيطلع خطأ Property 'USD' does not exist on type 'App' لأنه بيعتبرها اسم متغير.`,
          solCode: R`@Component({
  selector: 'app-root',
  imports: [ProductCard],
  template: $__bt<app-product-card [product]="p" currency="USD" (added)="onAdd($event)" />$__bt,
})
export class App {
  p: Product = { id: 7, name: 'قلم', price: 10 };
  onAdd(id: number) { console.log('added', id); }
}`
        },
        {
          cmd: "model()",
          title: "two-way binding بـ [( )] و model()",
          desc: R`ساعات الابن محتاج يغيّر قيمة جاية من الأب: عدّاد كمية، أو toggle، أو input مخصوص. بدل input و output منفصلين، فيه [[model()]]: signal الابن يقدر يقراه ويعمل له set، والأب يربطه بـ [[[(value)]="qty"]].

الشكل [[[( )]]] اسمه «banana in a box»: أقواس مربعة (داخل) جواها قوسين (طالع). ولو الأب بعت signal، القيمة بتتحدّث عنده لوحدها.

وده نفس اللي بيحصل في [[[(ngModel)]]] على input عادي (template-driven forms)، اللي هتلاقيه كتير في الكود القديم.`,
          example: R`import { Component, model, signal } from '@angular/core';
@Component({
  selector: 'app-counter',
  template: $__bt
    <button (click)="value.update(v => v - 1)" [disabled]="value() <= 1">-</button>
    <span>{{ value() }}</span>
    <button (click)="value.update(v => v + 1)">+</button>
  $__bt,
})
export class Counter {
  value = model(1);
}
@Component({
  selector: 'app-cart-line',
  imports: [Counter],
  template: $__bt<app-counter [(value)]="qty" /> <p>الكمية: {{ qty() }}</p>$__bt,
})
export class CartLine {
  protected qty = signal(2);
}`,
          try: R`شغّل [[CartLine]] واضغط + و - وشوف «الكمية» في الأب بتتغير. بعدين غيّر الأب لـ [[[value]="qty()"]] بس (من غير الأقواس العادية) وشوف إيه اللي بطّل يتحدّث.`,
          flag: "script",
          deep: {
            why: R`من غير two-way binding، كل عداد أو toggle محتاج input اسمه value و output اسمه valueChange، والأب يكتب [[[value]="qty()" (valueChange)="qty.set($event)"]] في كل مرة. [[model()]] بيختصر ده لسطر واحد في الابن وسطر في الأب.`,
            how: R`[[model(1)]] بيعمل حاجتين: input اسمه [[value]]، و output اسمه [[valueChange]]. لما الابن يعمل [[value.set(...)]] أو [[update]]، Angular بيبعت الـ output تلقائيًا. و [[[(value)]="qty"]] في الأب اختصار لـ [[[value]="qty()" (valueChange)="qty.set($event)"]].

لو الأب بعت signal ([[qty]] من غير قوسين)، Angular بيحدّثه مباشرة. ولو بعت خاصية عادية، بيعيّنها. ولو بعت [[[value]="qty()"]] بس، الابن بياخد القيمة أول مرة، وتعديلاته بتفضل عنده والأب مش بيعرف.

[[update(fn)]] بتاخد القيمة القديمة وترجع الجديدة، أحسن من [[set(value() + 1)]] لما القيمة الجديدة معتمدة على القديمة.`,
            when: R`components شبه form controls: عداد، و toggle، و date picker، و rating. للبيانات العادية اللي الابن بيعرضها بس، [[input()]] كفاية. ولو الابن بيعمل حدث مش «تغيير قيمة» (زي «اتحذف»)، [[output()]].`,
            mistakes: R`تكتب [[[(value)]="qty()"]] بالقوسين: ده بيبعت القيمة مش الـ signal، والـ compiler بيعترض. و [[[(ngModel)]]] من غير [[FormsModule]] في imports: NG8002 Can't bind to 'ngModel'. وتستخدم model لكل حاجة فكل الـ components تعدّل بيانات بعض ومحدش يعرف مين غيّر إيه: خليها للحالات اللي فعلًا two-way.`
          },
          teach: R`## الفكرة: [[model()]] = input + output في سطر واحد

المثال فيه component اتنين في ملف واحد: [[Counter]] (الابن، عداد) و [[CartLine]] (الأب، سطر في السلة). الأب بيدي العداد الكمية، والعداد بيغيّرها، والأب بيعرف. اتشغّل في [[ng serve]] (Angular 22.2) واتفحص في Chrome بضغطات حقيقية.

---

## ١. الابن: [[Counter]]

~~~text model.ts
export class Counter {
  value = model(1);
}
~~~

[[model(1)]] بتعمل signal زي [[signal(1)]]، بس فيها حاجتين زيادة:

| اللي بيتعمل | اسمه | شغلته |
|---|---|---|
| input | [[value]] | الأب يقدر يبعت قيمة |
| output | [[valueChange]] | أي [[set]] أو [[update]] من الابن بيتبعت للأب |

و [[1]] القيمة الافتراضية لو الأب مبعتش حاجة. والفرق عن [[input()]]: الابن يقدر يكتب فيها.

### الـ template

~~~text template
<button (click)="value.update(v => v - 1)" [disabled]="value() <= 1">-</button>
<span>{{ value() }}</span>
<button (click)="value.update(v => v + 1)">+</button>
~~~

- [[value.update(v => v - 1)]]: [[update]] بتاخد دالة، بتديها القيمة الحالية [[v]]، واللي ترجّعه يبقى القيمة الجديدة. [[v => v - 1]] arrow function بترجّع [[v - 1]].
- [[[disabled]="value() <= 1"]]: زرار الناقص بيتقفل لما القيمة تبقى 1 أو أقل، فالكمية متنزلش تحت 1.
- [[{{ value() }}]]: الرقم الحالي.

---

## ٢. الأب: [[CartLine]]

~~~text model.ts
@Component({
  selector: 'app-cart-line',
  imports: [Counter],
  template: $__bt<app-counter [(value)]="qty" /> <p>الكمية: {{ qty() }}</p>$__bt,
})
export class CartLine {
  protected qty = signal(2);
}
~~~

### [[[(value)]="qty"]]: الـ banana in a box

الأقواس المربعة برا (داخل) والعادية جوه (طالع). وهو اختصار للشكل ده:

~~~text اللي Angular بيفهمه
[value]="qty()"   (valueChange)="qty.set($event)"
~~~

يعني: ابعت قيمة [[qty]] للعداد، ولما العداد يبعت قيمة جديدة حطها في [[qty]]. ولاحظ إننا كاتبين [[qty]] **من غير** قوسين: بنسلّم الـ signal نفسها، مش قيمتها.

### الناتج بالضغطات

~~~text الناتج (Chrome)
start          2 | الكمية: 2 | minus disabled: false
after +        3 | الكمية: 3 | minus disabled: false
after -        2 | الكمية: 2 | minus disabled: false
after - again  1 | الكمية: 1 | minus disabled: true
~~~

- العمود الأول رقم العداد، والتاني نص الأب: الاتنين بيتغيروا مع بعض.
- بدأ من 2 مش 1: الأب بعت 2 فغطّى الافتراضي.
- عند 1 زرار الناقص اتقفل.

---

## ٣. التجربة: [[[value]="qty()"]] بس

~~~text الناتج (Chrome)
start          2 | الكمية: 2
after +        3 | الكمية: 2
after -        2 | الكمية: 2
after - again  1 | الكمية: 2
~~~

العداد بيتغير (لأن الـ model جواه signal بيتحدّث)، بس الأب فاضل 2: بعت القيمة مرة، ومحدش بيسمع لـ [[valueChange]].

---

## ٤. غلطة: [[[(value)]="qty()"]]

~~~text ng build
X [ERROR] NG5002: Unsupported expression in a two-way binding

      16 │   template: $__bt<app-counter [(value)]="qty()" /> ...
         ╵                           ~~~~~~~~~~~~~~~~~
~~~

[[qty()]] قيمة (الرقم 2)، ومينفعش تكتب فيه حاجة. الـ two-way محتاج حاجة يكتب فيها: signal ([[qty]]) أو خاصية عادية.

---

## الخلاصة

| الحاجة | الشكل |
|---|---|
| في الابن | [[value = model(1)]]، وتغيّرها بـ [[set]] أو [[update]] |
| في الأب | [[[(value)]="qty"]]: الـ signal من غير قوسين |
| اختصار لـ | [[[value]="qty()" (valueChange)="qty.set($event)"]] |
| [[[value]="qty()"]] | اتجاه واحد: الأب مش بيعرف بالتغيير |`,
          lines: [
            R`[[model]] للـ two-way و [[signal]] للأب.`,
            "الـ decorator.",
            "الـ selector.",
            "بداية الـ template.",
            R`ينقّص واحد، ومقفول عند 1.`,
            "القيمة الحالية.",
            "يزوّد واحد.",
            "قفلة الـ template.",
            "قفلة الـ decorator.",
            "الكلاس.",
            R`[[model(1)]]: input اسمه value قيمته الافتراضية 1، ومعاه output اسمه valueChange.`,
            "قفلة.",
            "الأب.",
            "الـ selector.",
            "لازم يعمل import للعدّاد.",
            R`[[[(value)]="qty"]] بيبعت الـ signal نفسه، فأي تغيير في العدّاد بيوصل هنا.`,
            "قفلة.",
            "الكلاس.",
            "القيمة الأصلية عند الأب.",
            "قفلة."
          ],
          sol: R`مع [[[(value)]="qty"]]: الرقم في العدّاد والـ «الكمية: X» اللي تحته بيتغيروا مع بعض. تبدأ 2، وبعد + تبقى 3.

مع [[[value]="qty()"]] بس: العدّاد نفسه بيتغير (لأن الـ model جواه signal بيتحدّث)، بس «الكمية» في الأب بتفضل 2. الأب بعت القيمة مرة واحدة ومش بيسمع لـ [[valueChange]]. وده اختبار حقيقي اتعمل بـ TestBed: بعد ضغطة + على [[[(value)]]]، النص بقى «الكمية: 3».`
        }
      ]
    },
    {
      t: "الـ signals",
      l: 1,
      n: "signal و computed و effect: البيانات اللي Angular بيعرف إمتى تتغير",
      items: [
        {
          cmd: "signal و computed",
          title: "signal بتخزن قيمة، و computed بتحسب من غيرها",
          desc: R`الـ signal علبة فيها قيمة، وAngular بيعرف مين بيقراها. بتقراها كدالة [[count()]]، وبتغيّرها بـ [[set(5)]] أو [[update(v => v + 1)]].

[[computed(() => ...)]] قيمة محسوبة من signals تانية: بتتحسب أول ما حد يقراها، وبتتخزن، وبتتحسب تاني بس لو واحدة من اللي بتقراهم اتغيرت. زي derived state في React أو [[useMemo]]، بس الـ dependencies بتتعرف لوحدها.

والأهم: لو الـ template قرا signal، Angular بيعرف إن الـ component ده لازم يتحدّث لما الـ signal تتغير. ده أساس Angular الحديث.`,
          example: R`import { signal, computed } from '@angular/core';
const price = signal(100);
const qty = signal(2);
const total = computed(() => price() * qty());
console.log(total()); // 200
qty.set(3);
console.log(total()); // 300
price.update((p) => p * 0.9);
console.log(total()); // 270
const items = signal<string[]>([]);
items.update((list) => [...list, 'قلم']);
console.log(items()); // [ 'قلم' ]`,
          try: R`حط الكود في [[scripts/signals.ts]] جوه مشروع Angular وشغّله بـ [[node scripts/signals.ts]] (Node 24 بيشغّل TS). بعدين زوّد: [[const n = computed(() => items().length)]]، واطبع [[n()]]، وبعدين اعمل [[items().push('كشكول')]] واطبع [[n()]] تاني. إيه اللي حصل؟`,
          flag: "script",
          deep: {
            why: R`أي framework محتاج يعرف إمتى يعيد رسم الشاشة. Angular القديم كان بيستخدم zone.js: بيراقب كل click و setTimeout و HTTP، وبعد كل واحدة يفحص الـ app كله. ده شغال بس تقيل وغامض. الـ signals بتقول لـ Angular بالظبط «القيمة دي اتغيرت، واللي بيقراها هو الـ component ده»، فيحدّث اللي محتاج بس. وده اللي خلّى Angular 21 يستغنى عن zone.js افتراضيًا.`,
            how: R`لما [[computed]] بتشتغل، أي signal بتتقري جواها بتتسجل كـ dependency. لما واحدة منهم تتغير، الـ computed بتتعلم dirty، ومش بتتحسب غير لما حد يقراها تاني (lazy). ولو محدش قراها، مش بتتحسب خالص.

[[set]] بتقارن القيمة الجديدة بالقديمة بـ [[Object.is]]، ولو زي بعض محدش بيتبلّغ. عشان كده الـ arrays والـ objects لازم تتغير immutable: [[update(list => [...list, x])]] بتعمل array جديدة، أما [[items().push(x)]] بتعدّل نفس الـ array فـ Angular مش هيعرف إنها اتغيرت. نفس قاعدة React في «تاب React».

[[computed]] للقراية بس، مفيهاش set. ولو محتاج قيمة محسوبة تقدر تعدّلها يدويًا، فيه [[linkedSignal]] (الدرس الجاي).

والـ signals مش مرتبطة بالـ components: تشتغل في أي ملف TS، وده اللي بيخلي الـ services تستخدمها كـ state.`,
            when: R`أي بيانات في component أو service بتتغير والشاشة محتاجة تعرضها. و [[computed]] لأي حاجة ممكن تتحسب من غيرها (إجمالي، فلترة، عدد، رسالة خطأ) بدل ما تخزنها وتنسى تحدّثها.`,
            mistakes: R`تعدّل array أو object جوه الـ signal بـ push أو [[obj.x = 1]]: الـ computed والشاشة مش هيحسّوا. وتنسى القوسين في الـ template [[{{ total }}]]. وتعمل signal لقيمة محسوبة وتحدّثها بإيدك من مكانين بدل computed. وفي الانترفيو: «computed بتتحسب إمتى؟» lazy: لما حد يقراها وكان فيه dependency اتغيرت، ونتيجتها بتتخزن (memoized).`
          },
          teach: R`## الفكرة: علبة بتقراها كدالة، وقيمة محسوبة بتعرف بتعتمد على مين

المثال مش component: ملف TypeScript عادي، عشان تشوف إن الـ signals شغالة لوحدها. اتشغّل جوه مشروع Angular 22.2 بـ [[node scripts/signals.ts]] على Node 24.19 (Node 24 بيشيل الأنواع ويشغّل TS على طول).

---

## ١. [[signal(100)]]

~~~text signals.ts
import { signal, computed } from '@angular/core';
const price = signal(100);
const qty = signal(2);
~~~

[[signal(100)]] بترجّع signal قيمتها 100. والـ signal نفسها **دالة**:

| تعمل إيه | تكتب |
|---|---|
| تقرا | [[price()]] |
| تحط قيمة جديدة | [[price.set(80)]] |
| قيمة جديدة من القديمة | [[price.update(p => p * 0.9)]] |

اتأكدنا: [[typeof]] للـ signal طلع [[function]]، و [[String(signal)]] طلع [[[Signal: 5]]].

---

## ٢. [[computed(() => price() * qty())]]

~~~text signals.ts
const total = computed(() => price() * qty());
console.log(total()); // 200
~~~

[[computed]] بتاخد دالة. أول ما حد يقرا [[total()]]، بتشغّل الدالة، وأي signal اتقرت جواها ([[price]] و [[qty]]) بتتسجّل كـ **dependency**. انت مكتبتش القايمة دي في أي حتة: اتعرفت من القراية نفسها.

~~~text الناتج
200
~~~

---

## ٣. [[set]] وبعدين قراية

~~~text signals.ts
qty.set(3);
console.log(total()); // 300
~~~

[[qty]] اتغيرت، فـ [[total]] اتعلّمت إنها محتاجة تتحسب، واتحسبت لما قريناها: 100 × 3 = 300.

---

## ٤. [[update]]

~~~text signals.ts
price.update((p) => p * 0.9);
console.log(total()); // 270
~~~

[[update]] بتديك القيمة الحالية [[p]] (100) وبتاخد اللي ترجّعه (90). و 90 × 3 = 270.

~~~text الناتج
300
270
~~~

---

## ٥. signal لـ array

~~~text signals.ts
const items = signal<string[]>([]);
items.update((list) => [...list, 'قلم']);
console.log(items()); // [ 'قلم' ]
~~~

- [[<string[]>]]: النوع مكتوب بإيدك، لأن [[[]]] لوحدها TypeScript ميعرفش هي array من إيه.
- [[[...list, 'قلم']]]: الـ [[...]] اسمها spread: بتفرد عناصر [[list]] القديمة جوه array **جديدة**، وبعدها [['قلم']].

~~~text الناتج
[ 'قلم' ]
~~~

> ومع أول تشغيل Node بيطلّع تحذير [[MODULE_TYPELESS_PACKAGE_JSON]]: يعني [[package.json]] مفيهوش [["type": "module"]] فـ Node خمّن إن الملف ES module. تحذير بس، والناتج سليم.

---

## ٦. ليه الـ array لازم تبقى جديدة؟ (التجربة والـ solCode)

~~~text sol.ts
const items = signal<string[]>(['قلم']);
const n = computed(() => items().length);
console.log(n()); // 1
items().push('كشكول');
console.log(n(), items());
items.update((l) => [...l, 'قلم رصاص']);
console.log(n()); // 3
~~~

~~~text الناتج
1
1 [ 'قلم', 'كشكول' ]
3
~~~

السطر التاني هو المهم: الـ array فيها عنصرين فعلًا، بس [[n()]] لسه 1. السبب إن [[items().push]] عدّلت **نفس** الـ array من جوه، والـ signal محدش قالها حاجة، فـ [[n]] رجّعت النتيجة المتخزنة. ومع [[update]] بـ array جديدة، الـ signal قارنت الجديدة بالقديمة بـ [[Object.is]] ولقتهم مختلفين، فـ [[n]] اتحسبت: 3.

---

## ٧. [[computed]] كسولة ومتخزنة

جرّبنا عدّاد جوه الـ computed يعدّ كام مرة اتحسبت:

~~~text extra.ts
let runs = 0;
const a = signal(1);
const b = computed(() => { runs++; return a() * 2; });
~~~

~~~text الناتج
runs before read: 0
runs after 3 reads: 1
runs after set(same): 1
runs after set(5), no read: 1
10 runs: 2
~~~

| السطر | المعنى |
|---|---|
| [[before read: 0]] | lazy: محدش قراها، فمتحسبتش |
| [[after 3 reads: 1]] | memoized: ٣ قرايات وحساب واحد |
| [[set(same): 1]] | [[a.set(1)]] والقيمة 1 أصلًا، فمحدش اتبلّغ |
| [[set(5), no read: 1]] | اتغيرت بس محدش قرا، فلسه متحسبتش |
| [[10 runs: 2]] | أول قراية بعد التغيير: اتحسبت، 5 × 2 = 10 |

---

## الخلاصة

| الحاجة | الشكل |
|---|---|
| قيمة بتتغير | [[x = signal(0)]] وتقراها [[x()]] |
| تغيير | [[x.set(5)]] أو [[x.update(v => v + 1)]] |
| قيمة محسوبة | [[computed(() => a() * b())]]، للقراية بس |
| array أو object | دايمًا قيمة جديدة: [[[...list, x]]]، مش [[push]] |
| [[computed]] | بتتحسب لما حد يقراها وحاجة اتغيرت، والنتيجة بتتخزن |`,
          lines: [
            "الاتنين من core، وبيشتغلوا برا الـ components عادي.",
            "signal فيها 100.",
            "وواحدة فيها 2.",
            R`[[total]] بتقرا الاتنين، فهما الـ dependencies بتوعها.`,
            "أول قراية: بتتحسب دلوقتي.",
            R`[[set]]: قيمة جديدة.`,
            R`[[qty]] اتغيرت، فالـ computed اتحسبت تاني.`,
            R`[[update]]: القيمة الجديدة من القديمة.`,
            "100 × 0.9 × 3.",
            "signal لـ array فاضية، والنوع مكتوب لأن [] لوحدها مش بتقول نوع.",
            "array جديدة فيها القديم + عنصر (immutable).",
            "القيمة الجديدة."
          ],
          sol: R`الكود الأصلي طبع [[200]] وبعدين [[300]] وبعدين [[270]] وبعدين [[[ 'قلم' ]]]. (ممكن Node يطلّع تحذير MODULE_TYPELESS_PACKAGE_JSON، تجاهله أو ضيف [["type": "module"]].)

في التجربة، لو قريت [[n()]] قبل الـ push هتطلع 1، وبعد [[items().push('كشكول')]] هتفضل 1، مع إن [[items()]] بقت فيها عنصرين فعلًا. الـ signal مش عارفة إن حد عدّل الـ array من جوه، والـ computed متخزّن. بعد [[items.update(l => [...l, 'قلم رصاص'])]] هتطلع 3. ده بالظبط اللي اتجرّب في الـ lab: before 1، after push 1، after update 3.

الدرس: عدّل بـ [[set]] أو [[update]] وبقيمة جديدة دايمًا.`,
          solCode: R`import { signal, computed } from '@angular/core';
const items = signal<string[]>(['قلم']);
const n = computed(() => items().length);
console.log(n()); // 1
items().push('كشكول');
console.log(n(), items()); // 1 [ 'قلم', 'كشكول' ]
items.update((l) => [...l, 'قلم رصاص']);
console.log(n()); // 3`
        },
        {
          cmd: "effect و linkedSignal",
          title: "effect لما تعمل حاجة برا Angular، و linkedSignal لقيمة ليها default بيتغير",
          desc: R`[[effect(() => ...)]] بتشتغل مرة في الأول، وتاني كل ما signal جواها تتغير. استخدامها للحاجات اللي برا عالم Angular: تكتب في localStorage، أو تعمل log، أو تكلّم مكتبة chart أو map. زي [[useEffect]] في React، بس الـ dependencies بتتعرف لوحدها.

[[linkedSignal(() => ...)]] signal عادية تقدر تعمل لها set، بس قيمتها بترجع للـ default المحسوب لما مصدرها يتغير. مثال: أول خيار شحن متاختار افتراضيًا، والمستخدم يقدر يغيّره، ولو قائمة الخيارات اتغيرت يرجع لأول واحد.`,
          example: R`import { Component, effect, linkedSignal, signal } from '@angular/core';
type Theme = 'light' | 'dark';
@Component({
  selector: 'app-settings',
  template: $__bt<button (click)="toggle()">{{ theme() }}</button> <p>{{ shipping() }}</p>$__bt,
})
export class Settings {
  theme = signal<Theme>((localStorage.getItem('theme') as Theme) ?? 'light');
  options = signal(['شحن عادي', 'شحن سريع']);
  shipping = linkedSignal(() => this.options()[0]);
  constructor() {
    effect(() => {
      localStorage.setItem('theme', this.theme());
      document.documentElement.dataset['theme'] = this.theme();
    });
  }
  toggle() { this.theme.update((t) => (t === 'light' ? 'dark' : 'light')); }
}`,
          try: R`دوس على الزرار مرتين واعمل refresh: الـ theme اتحفظ؟ بعدين زوّد زرار بيعمل [[shipping.set('شحن سريع')]] وزرار تاني بيعمل [[options.set(['استلام من الفرع'])]]، وشوف [[shipping()]] بقت إيه بعد كل واحد.`,
          flag: "script",
          deep: {
            why: "مش كل حاجة شاشة. أوقات تغيير في البيانات لازم يوصل لحاجة Angular مش بيديرها: storage، أو analytics، أو DOM خارجي. من غير effect هتفتكر تنادي الكود ده في كل مكان بيغيّر القيمة. و linkedSignal بتحل مشكلة متكررة جدًا: اختيار افتراضي المستخدم يقدر يغيّره، بس لازم يتظبط لو البيانات اتغيرت.",
            how: R`[[effect]] لازم تتعمل في injection context: في الـ constructor أو في field initializer، لأنها بتربط نفسها بعمر الـ component وبتتقفل لوحدها لما يتشال. لو حاولت تعملها في دالة عادية بعد كده هيطلع NG0203.

الـ effects بتشتغل async، مش فورًا مع كل set: لو غيّرت الـ signal ٣ مرات ورا بعض، الـ effect ممكن تشتغل مرة واحدة بآخر قيمة. وبتشتغل كجزء من change detection.

[[linkedSignal]] بتحسب القيمة من الدالة، وأي [[set]] بيكتب فوقها لحد ما الـ source يتغير فترجع تتحسب. وفيه شكل مطوّل [[linkedSignal({ source, computation: (src, prev) => ... })]] لو محتاج تحافظ على الاختيار القديم لو لسه موجود في القائمة الجديدة.

و [[untracked(() => x())]] جوه effect أو computed بتقرا من غير ما تسجّل dependency.`,
            when: R`effect: sync مع حاجة برا (storage و log و مكتبات DOM). مش لحساب قيمة من قيمة (ده computed)، ومش لنسخ signal في signal (ده computed أو linkedSignal). linkedSignal: اختيار افتراضي أو قيمة draft بتتعمل reset لما الأصل يتغير.`,
            mistakes: R`تستخدم effect عشان تعمل [[this.total.set(this.price() * this.qty())]]: ده computed، والـ effect هنا بيعمل رسم زيادة ومشاكل ترتيب. وتعمل effect في [[ngOnInit]] أو في click handler: NG0203 لأنه برا injection context. وتقرا [[localStorage]] مباشرة في field زي هنا والتطبيق عليه SSR: السيرفر مفيهوش localStorage وهيقع (المستوى ٣ بيوريك الحل بـ [[afterNextRender]]).`
          },
          teach: R`## الفكرة: effect بتنفّذ كود برا Angular، و linkedSignal قيمة افتراضية تقدر تغيّرها

component فيه حاجتين مستقلين: theme بيتحفظ في المتصفح (ده شغل [[effect]])، واختيار شحن ليه default (ده شغل [[linkedSignal]]). اتشغّل في [[ng serve]] (Angular 22.2) واتفحص في Chrome، وضفنا زرارين الـ solCode للـ template، وسطر [[console.log]] جوه الـ effect عشان نشوف هي بتشتغل إمتى.

---

## ١. [[type Theme = 'light' | 'dark']]

نوع اسمه [[Theme]] قيمته يا [['light']] يا [['dark']] بس (الخط الرأسي معناه «أو»). أي قيمة تانية TypeScript يرفضها.

---

## ٢. الـ theme من localStorage

~~~text settings.ts
theme = signal<Theme>((localStorage.getItem('theme') as Theme) ?? 'light');
~~~

من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[localStorage.getItem('theme')]] | اقرا القيمة المحفوظة في المتصفح بالمفتاح ده. لو مفيش: [[null]] |
| [[as Theme]] | قول لـ TypeScript «اعتبرها Theme» (الـ getItem بترجّع [[string]] أو [[null]]) |
| [[?? 'light']] | لو اللي على الشمال [[null]] أو [[undefined]]، خد [['light']] |
| [[signal<Theme>(...)]] | signal بالقيمة دي |

---

## ٣. الـ [[effect]]

~~~text settings.ts
constructor() {
  effect(() => {
    localStorage.setItem('theme', this.theme());
    document.documentElement.dataset['theme'] = this.theme();
  });
}
~~~

- [[effect]] بتاخد دالة وبتشغّلها مرة في الأول، وتاني كل ما signal اتقرت جواها تتغير. هنا بتقرا [[this.theme()]]، فدي الـ dependency.
- [[localStorage.setItem]] بتحفظ القيمة في المتصفح، فتفضل بعد الـ refresh.
- [[document.documentElement]] هو عنصر [[<html>]]، و [[dataset['theme']]] بيحط عليه [[data-theme="..."]]، فالـ CSS يقدر يكتب [[[data-theme=dark] body {...}]].
- ليه في الـ constructor؟ لأن [[effect]] لازم تتعمل في **injection context** (constructor أو field initializer)، عشان Angular يربطها بعمر الـ component ويقفلها لما يتشال.

### الناتج بالضغطات

~~~text الناتج (Chrome)
effect ran with light
start        | btn: light | ls: light | html data-theme: light
effect ran with dark
click 1      | btn: dark  | ls: dark  | html data-theme: dark
effect ran with dark
after reload | btn: dark  | ls: dark  | html data-theme: dark
effect ran with light
click 2      | btn: light | ls: light | html data-theme: light
~~~

- الـ effect اشتغلت أول ما الـ component اتعمل، وبعد كل ضغطة.
- بعد الـ reload: الـ signal بدأت [[dark]] لأنها قرت من localStorage.

### الـ effect مش بتشتغل مع كل set

دوسنا الزرار ٣ مرات ورا بعض في نفس اللحظة (light ← dark ← light ← dark):

~~~text الناتج (Chrome)
effect ran with dark
after 3 clicks | btn: dark | ls: dark
~~~

الـ effect اشتغلت **مرة واحدة** بآخر قيمة. الـ effects بتتجدول وتشتغل بعدين، مش جوه الـ [[set]] نفسه.

### لو عملتها برا الـ constructor

حطينا [[effect(...)]] جوه [[toggle()]] ودوسنا:

~~~text الـ Console
ERROR RuntimeError: NG0203: effect() can only be used within an injection context such as a constructor, a factory function, a field initializer, or a function used with $__btrunInInjectionContext$__bt.
~~~

---

## ٤. [[toggle()]]

~~~text settings.ts
toggle() { this.theme.update((t) => (t === 'light' ? 'dark' : 'light')); }
~~~

[[a ? b : c]] اسمها ternary: لو الشرط صح خد [[b]]، وإلا [[c]]. يعني لو light بقت dark، والعكس.

---

## ٥. [[linkedSignal]]

~~~text settings.ts
options = signal(['شحن عادي', 'شحن سريع']);
shipping = linkedSignal(() => this.options()[0]);
~~~

[[linkedSignal]] بتحسب قيمتها من دالة زي [[computed]] (هنا أول عنصر في [[options]])، بس ينفع تعمل لها [[set]] زي [[signal]]. والزرارين من الـ solCode:

~~~text template
<button (click)="shipping.set('شحن سريع')">اختار السريع</button>
<button (click)="options.set(['استلام من الفرع'])">غيّر القايمة</button>
~~~

~~~text الناتج (Chrome)
start          | p: شحن عادي
shipping.set   | p: شحن سريع
options.set    | p: استلام من الفرع
~~~

| الخطوة | ليه |
|---|---|
| [[شحن عادي]] | الـ default: [[options()[0]]] |
| [[شحن سريع]] | [[set]] كتب فوق المحسوب (المستخدم اختار) |
| [[استلام من الفرع]] | [[options]] اتغيرت، فاتحسبت من جديد والاختيار القديم اتمسح |

### المقارنة

| | ينفع [[set]]؟ | بتتحسب تاني لما المصدر يتغير؟ |
|---|---|---|
| [[signal]] | أيوه | لأ، مالهاش مصدر |
| [[computed]] | لأ | أيوه |
| [[linkedSignal]] | أيوه | أيوه، وبتمسح الـ set |

---

## الخلاصة

| الأداة | استخدمها لـ |
|---|---|
| [[effect(() => ...)]] | تبعت قيمة لبرا Angular: localStorage، و DOM خارجي، و log. في الـ constructor بس |
| [[computed]] | تحسب قيمة من قيمة (مش effect) |
| [[linkedSignal(() => ...)]] | اختيار افتراضي المستخدم يغيّره، ويرجع للـ default لما المصدر يتغير |`,
          lines: [
            R`[[effect]] و [[linkedSignal]] مع signal.`,
            "نوع للـ theme.",
            "الـ decorator.",
            "الـ selector.",
            "زرار بيعرض الـ theme، وسطر بيعرض الشحن المختار.",
            "قفلة.",
            "الكلاس.",
            "القيمة الأولى من localStorage، ولو مفيش يبقى light.",
            "قائمة خيارات الشحن.",
            "افتراضيًا أول خيار، وتقدر تعمل له set، ويرجع لأول خيار لو القائمة اتغيرت.",
            R`الـ constructor injection context، فينفع نعمل effect هنا.`,
            R`بتشتغل مرة في الأول، وتاني كل ما [[theme]] يتغير.`,
            "تحفظ في المتصفح.",
            R`وتحط [[data-theme]] على [[<html>]] عشان الـ CSS يستخدمه.`,
            "قفلة الـ effect.",
            "قفلة الـ constructor.",
            R`يقلب القيمة بـ [[update]].`,
            "قفلة الكلاس."
          ],
          sol: R`بعد ضغطتين الـ theme رجع light، وبعد ضغطة واحدة و refresh هيفضل dark: الـ effect كتب في localStorage، والـ signal قرت منه أول ما اتعملت. افتح Elements هتلاقي [[<html data-theme="dark">]].

لما تعمل [[shipping.set('شحن سريع')]]: [[shipping()]] بقت «شحن سريع» مع إن الـ computation بتقول أول عنصر. لما تعمل [[options.set(['استلام من الفرع'])]]: [[shipping()]] رجعت «استلام من الفرع»، لأن مصدرها اتغير فاتحسبت من جديد وضاع الـ set القديم. ده الفرق بينها وبين signal عادية (مكانتش هترجع) و computed (مكانتش هتقبل set أصلًا).`,
          solCode: R`<!-- في الـ template -->
<button (click)="shipping.set('شحن سريع')">اختار السريع</button>
<button (click)="options.set(['استلام من الفرع'])">غيّر القايمة</button>
<p>{{ shipping() }}</p>`
        }
      ]
    },
    {
      t: "control flow في الـ template",
      l: 1,
      n: "@if و @switch و @for و @let و @defer بدل *ngIf و *ngFor",
      items: [
        {
          cmd: "@if و @switch",
          title: "تعرض حاجة بشرط بـ @if و @else و @switch",
          desc: R`من Angular 17 الـ template فيه control flow مدمج شبه JS: [[@if (cond) { ... } @else if (...) { ... } @else { ... }]]، و [[@switch (value) { @case ('x') { ... } @default { ... } }]].

و [[@if (user(); as u)]] بتحفظ القيمة في متغير [[u]] جوه البلوك، ومعاها TypeScript بيعرف إن [[u]] مش null (narrowing زي في «تاب TypeScript»).

في الكود القديم هتلاقي [[*ngIf="user; else login"]] و [[[ngSwitch]]] و [[*ngSwitchCase]]: نفس الفكرة بـ directives، ومحتاجة CommonModule.`,
          example: R`@if (user(); as u) {
  <p>أهلا {{ u.name }}</p>
} @else if (loading()) {
  <p>بيحمّل...</p>
} @else {
  <a routerLink="/login">سجّل دخول</a>
}
@switch (order().status) {
  @case ('pending') { <span>مستني التأكيد</span> }
  @case ('shipped') { <span>في الطريق</span> }
  @default { <span>اتسلّم</span> }
}`,
          try: R`اعمل component فيه [[user = signal<{ name: string } | null>(null)]] و [[loading = signal(true)]] و [[order = signal({ status: 'shipped' as 'pending' | 'shipped' | 'delivered' })]]، وحط الـ template ده. غيّر القيم من الـ console أو بزراير وشوف إيه اللي بيظهر. وبعدين اكتب [[{{ user().name }}]] برا الـ @if وشوف الـ compiler بيقول إيه.`,
          deep: {
            why: R`الشاشات الحقيقية مليانة حالات: داخل ولا لأ، بيحمّل ولا فيه خطأ، الطلب في أنهي مرحلة. الـ syntax الجديد أوضح من [[*ngIf]] القديم (خصوصًا [[else]] اللي كانت محتاجة [[ng-template]] منفصل)، ومش محتاج import، وأسرع شوية لأنه مدمج في الـ compiler.`,
            how: R`البلوكات دي مش directives، الـ compiler بيحوّلها لتعليمات مباشرة. العناصر اللي جوه بلوك مش متحقق بتتشال من الـ DOM خالص، مش بتستخبى بـ CSS، فأي component جواها بيتدمّر ويتعمل من جديد.

[[as u]] بتقرا الـ signal مرة واحدة وتحفظها، فمش محتاج تنادي [[user()]] كل شوية جوه البلوك، والنوع جواه [[{ name: string }]] مش [[| null]].

[[@switch]] بيقارن بـ [[===]]، ومفيش fallthrough زي JS: كل [[@case]] ليه بلوك لوحده ومفيش [[break]].`,
            when: R`[[@if]] لأي حاجة بشرط، و [[@switch]] لما عندك قيمة واحدة ليها ٣ حالات أو أكتر (status و role و step). لو محتاج تخبي حاجة بس من غير ما تتدمّر (زي tab عايز يحتفظ بحالته)، استخدم [[[hidden]]] أو [[[class.hidden]]].`,
            mistakes: R`تستخدم [[{{ user().name }}]] برا الـ @if فيطلع خطأ Object is possibly 'null' (strict templates). وتنسى إن المحتوى جوه @if بيتدمّر: form جوه tab اتقفل بيضيع اللي المستخدم كتبه. وتخلط الشكلين في نفس الـ template وانت بتعمل migration: شغّل [[ng g @angular/core:control-flow]] يحوّل الكل مرة واحدة.`
          },
          teach: R`## الفكرة: [[if]] و [[switch]] بتوع JavaScript، بس جوه الـ HTML وقبلهم [[@]]

المثال template بس. شغّلناه جوه component الـ solCode ([[Account]]) في [[ng serve]] (Angular 22.2)، ودوسنا الزراير في Chrome وطبعنا اللي اترسم بعد كل ضغطة.

---

## ١. [[@if (user(); as u)]]

~~~text template
@if (user(); as u) {
  <p>أهلا {{ u.name }}</p>
}
~~~

- [[@if (شرط) { ... }]]: لو الشرط truthy، ارسم اللي بين القوسين المعرّجين. ولو falsy ([[null]] و [[false]] و [[0]] و [['']])، متعملهوش خالص.
- [[user()]] بتقرا الـ signal: يا [[null]] يا [[{ name: 'سارة' }]].
- [[; as u]]: احفظ القيمة دي في متغير اسمه [[u]] جوه البلوك. فبدل [[user()!.name]] بتكتب [[u.name]]، و TypeScript عارف إن [[u]] جوه البلوك مش [[null]].

---

## ٢. [[@else if]] و [[@else]]

~~~text template
} @else if (loading()) {
  <p>بيحمّل...</p>
} @else {
  <a routerLink="/login">سجّل دخول</a>
}
~~~

زي JavaScript: لو الأول مش متحقق جرّب التاني، ولو مفيش ولا واحد خد [[@else]]. واحد بس من التلاتة بيترسم.

---

## ٣. [[@switch]]

~~~text template
@switch (order().status) {
  @case ('pending') { <span>مستني التأكيد</span> }
  @case ('shipped') { <span>في الطريق</span> }
  @default { <span>اتسلّم</span> }
}
~~~

- [[@switch (قيمة)]]: القيمة اللي هنقارن بيها، هنا [[order().status]].
- [[@case ('pending')]]: لو القيمة [[===]] النص ده. المقارنة صارمة: نفس النوع ونفس القيمة.
- [[@default]]: أي قيمة مش في الـ cases.
- مفيش [[break]]: كل [[@case]] بلوك لوحده، ومفيش وقوع للي بعده زي JS.

---

## ٤. الناتج مع كل ضغطة

الـ state في الأول: [[user]] = [[null]]، و [[loading]] = [[true]]، و [[order]] = [[shipped]].

~~~text الناتج (Chrome، من غير الزراير)
start          | <p>بيحمّل...</p><span>في الطريق</span>
loading=false  | <a routerlink="/login" href="/login">سجّل دخول</a><span>في الطريق</span>
user=سارة      | <p>أهلا سارة</p><span>في الطريق</span>
delivered      | <p>أهلا سارة</p><span>اتسلّم</span>
~~~

| الخطوة | ليه ده اللي ظهر |
|---|---|
| start | [[user()]] null، و [[loading()]] true |
| loading=false | الاتنين falsy، فـ [[@else]] |
| user=سارة | [[user()]] بقى object، فأول فرع |
| delivered | [[delivered]] مش [[pending]] ولا [[shipped]]، فـ [[@default]] |

لاحظ إن العنصر القديم **اتشال** من الـ DOM، مش استخبى. مفيش [[<p>بيحمّل...</p>]] مخفي في أي حتة.

### الـ [[href]] جه منين؟

[[routerLink]] directive من [[RouterLink]]، وهي اللي حطت [[href="/login"]]. شلنا [[RouterLink]] من [[imports]]:

~~~text الناتج (Chrome)
<a routerlink="/login">سجّل دخول</a>
~~~

الـ build عدّى من غير ولا تحذير (attribute مجهول مسموح في HTML)، بس اللينك بقى من غير [[href]] ومش بيودّي في حتة.

---

## ٥. [[{{ user().name }}]] برا الـ @if

~~~text ng build
X [ERROR] TS2531: Object is possibly 'null'.

      20 │     <p>{{ user().name }}</p>
         ╵                  ~~~~
~~~

الـ compiler بيفحص الـ template بقواعد TypeScript (strict templates): [[user()]] ممكن تبقى [[null]]، فـ [[.name]] ممكن تقع. جوه [[@if (user(); as u)]] المشكلة مش موجودة. وبرّاه: [[{{ user()?.name }}]] (الـ [[?.]] بترجّع [[undefined]] بدل ما تقع).

---

## الخلاصة

| عايز | اكتب |
|---|---|
| حاجة بشرط | [[@if (cond) { ... }]] |
| وإلا | [[@else if (x) { ... }]] و [[@else { ... }]] |
| تحفظ القيمة | [[@if (user(); as u)]] |
| قيمة ليها حالات | [[@switch (x) { @case ('a') { ... } @default { ... } }]] |
| القديم | [[*ngIf]] و [[[ngSwitch]]]: نفس الفكرة |`,
          lines: [
            R`لو فيه user، احفظه في [[u]].`,
            R`[[u]] هنا مش null أكيد.`,
            "وإلا لو لسه بيحمّل.",
            "رسالة التحميل.",
            "وإلا (مفيش user ومش بيحمّل).",
            R`لينك للـ login ([[routerLink]] محتاج [[RouterLink]] في imports).`,
            "قفلة الـ @if.",
            "اختار حسب حالة الطلب.",
            "لو pending.",
            "لو shipped.",
            "أي حالة تانية.",
            "قفلة الـ @switch."
          ],
          sol: R`في الأول ([[user]] بـ null و [[loading]] بـ true) هتشوف «بيحمّل...» و «في الطريق». لما [[loading]] يبقى false هتشوف لينك «سجّل دخول». ولما [[user.set({ name: 'سارة' })]] هتشوف «أهلا سارة». وده اللي اتجرّب في الـ lab بـ TestBed: الناتج كان «سجّل دخول في الطريق».

[[{{ user().name }}]] برا الـ @if بيطلّع خطأ build: [[TS2531: Object is possibly 'null']] من الـ angular-compiler، لأن strict templates بتفحص الـ template بنفس قواعد TypeScript. الحل إما جوه [[@if]]، أو [[{{ user()?.name }}]] لو عايز يطبع فاضي لما مفيش user.

لو استخدمت [[routerLink]] ونسيت [[RouterLink]] في الـ imports، الـ build مش هيقع ومفيش ولا تحذير (attribute مجهول مسموح في HTML)، بس اللينك مش هيشتغل كـ navigation. ولو بتختبره بـ TestBed لازم [[provideRouter([])]] وإلا NG0201: No provider found for ActivatedRoute (حصلت فعلًا في الـ lab).`,
          solCode: R`type Status = 'pending' | 'shipped' | 'delivered';
@Component({
  selector: 'app-account',
  imports: [RouterLink],
  template: $__bt
    <!-- نفس الـ @if و @switch اللي في المثال هنا -->
    <button (click)="loading.set(false)">خلّص تحميل</button>
    <button (click)="user.set({ name: 'سارة' })">دخول</button>
    <button (click)="order.set({ status: 'delivered' })">اتسلّم</button>
  $__bt,
})
export class Account {
  user = signal<{ name: string } | null>(null);
  loading = signal(true);
  order = signal<{ status: Status }>({ status: 'shipped' });
}`
        },
        {
          cmd: "@for و @let",
          title: "تلف على list بـ @for و track، وتعمل متغير بـ @let",
          desc: R`[[@for (p of products(); track p.id) { ... } @empty { ... }]] بترسم عنصر لكل item، و [[@empty]] لما الـ list فاضية. [[track]] إجباري: بيقول لـ Angular إزاي يعرف إن العنصر ده هو نفسه بعد ما الـ list تتغير، زي [[key]] في React.

جوه البلوك فيه متغيرات جاهزة: [[$index]] و [[$first]] و [[$last]] و [[$even]] و [[$odd]] و [[$count]].

و [[@let total = cartTotal();]] بتعمل متغير في الـ template تستخدمه كذا مرة من غير ما تنادي الدالة كل مرة.`,
          example: R`<ul>
  @for (p of products(); track p.id; let i = $index, last = $last) {
    <li [class.last]="last">{{ i + 1 }}. {{ p.name }}</li>
  } @empty {
    <li>مفيش منتجات</li>
  }
</ul>
@let total = cartTotal();
<p>الإجمالي: {{ total }} جنيه</p>`,
          try: R`اعمل [[products = signal<Product[]>([...])]] فيها ٣ منتجات و [[cartTotal = computed(...)]]. بعدين زرار بيعمل [[products.set([])]] وشوف @empty. وجرّب تشيل [[track p.id]] خالص وشوف الخطأ.`,
          deep: {
            why: R`اللستات في كل حتة: منتجات، وطلبات، وصفوف جدول. لما عنصر يتضاف أو يتشال أو الترتيب يتغير، Angular محتاج يعرف أنهي عنصر DOM يفضل وأنهي يتشال، وإلا هيعيد رسم كل الـ list، وده بطيء وبيضيّع الـ focus وحالة الـ inputs.`,
            how: R`[[track p.id]] بيعمل مفتاح لكل عنصر. لما الـ list تتغير، Angular بيقارن المفاتيح: اللي موجود قبل وبعد بيتنقل أو يفضل، والجديد بيتعمل، والمختفي بيتشال. لو عملت [[track $index]]، أي حذف من النص بيخلي كل اللي بعده يتعتبر «اتغير».

في [[*ngFor]] القديم الـ [[trackBy]] كان اختياري، وناس كتير نسيته فكان بيعيد رسم كل حاجة. في [[@for]] بقى إجباري عشان تفكر فيه.

[[@let]] (من Angular 18.1) بتتحسب كل مرة الـ template يتحدّث، ومقصورة على البلوك اللي اتعملت فيه، ومينفعش تعمل لها assign تاني. مفيدة مع [[async]] pipe: [[@let user = user$ | async;]].`,
            when: R`أي list في الـ template. [[track item.id]] لو فيه id ثابت (غالبًا من الداتابيز). [[track item]] لو العناصر primitive زي strings. [[track $index]] بس لو الـ list ثابتة ومش هتتغير.`,
            mistakes: R`[[track $index]] على list بتتحذف منها عناصر والعناصر فيها inputs: الكتابة بتنتقل لعنصر غلط. و [[track p]] على objects بتيجي جديدة من API كل مرة: كل refresh بيعيد رسم الكل لأن الـ reference اتغير. وتعمل [[products().filter(...)]] جوه الـ @for: بتتحسب كل change detection؛ حطها في computed.`
          },
          teach: R`## الفكرة: [[for...of]] جوه الـ template، ومعاه مفتاح لكل عنصر

المثال template بس. شغّلناه في component فيه:

~~~text list.ts
products = signal<Product[]>([
  { id: 1, name: 'قلم', price: 10 },
  { id: 2, name: 'كشكول', price: 45 },
  { id: 3, name: 'مسطرة', price: 15 },
]);
cartTotal = computed(() => this.products().reduce((s, p) => s + p.price, 0));
~~~

[[reduce]] بتلف على الـ array وتجمع: [[s]] المجموع لحد دلوقتي (بيبدأ من [[0]])، و [[p]] المنتج الحالي. اتشغّل في [[ng serve]] (Angular 22.2) واتفحص في Chrome.

---

## ١. سطر الـ [[@for]]

~~~text template
@for (p of products(); track p.id; let i = $index, last = $last) {
~~~

٣ حتت مفصولة بـ [[;]]:

| الحتة | معناها |
|---|---|
| [[p of products()]] | لف على الـ array، والعنصر الحالي اسمه [[p]] |
| [[track p.id]] | المفتاح اللي Angular يعرف بيه العنصر: الـ id |
| [[let i = $index, last = $last]] | خد متغيرات جاهزة بأسامي أقصر |

المتغيرات الجاهزة كلها بتبدأ بـ [[$]]:

| المتغير | قيمته |
|---|---|
| [[$index]] | رقم العنصر، من 0 |
| [[$first]] / [[$last]] | هل ده الأول / الأخير |
| [[$even]] / [[$odd]] | زوجي / فردي (للجداول المقلّمة) |
| [[$count]] | عدد العناصر |

---

## ٢. جسم الـ loop

~~~text template
<li [class.last]="last">{{ i + 1 }}. {{ p.name }}</li>
~~~

- [[[class.last]="last"]]: class اسمه [[last]] على آخر عنصر بس.
- [[{{ i + 1 }}]]: الـ index بيبدأ من 0، فبنزوّد 1 عشان الترقيم يبدأ من 1.

---

## ٣. [[@empty]]

~~~text template
} @empty {
  <li>مفيش منتجات</li>
}
~~~

بيترسم بس لو الـ array فاضية. من غيره هتحتاج [[@if (products().length === 0)]] منفصلة.

---

## ٤. [[@let]]

~~~text template
@let total = cartTotal();
<p>الإجمالي: {{ total }} جنيه</p>
~~~

[[@let]] بتعمل متغير جوه الـ template. هنا مش فارقة كتير، لكن لما تستخدم القيمة ٣ و ٤ مرات بتكتبها مرة. وآخرها [[;]] لازم.

---

## ٥. الناتج

~~~text الناتج (Chrome)
<li>1. قلم</li><li>2. كشكول</li><li class="last">3. مسطرة</li>
الإجمالي: 70 جنيه
~~~

10 + 45 + 15 = 70. وبعد زرار بيعمل [[products.set([])]]:

~~~text الناتج (Chrome)
<li>مفيش منتجات</li>
الإجمالي: 0 جنيه
~~~

الإجمالي 0 لأن [[reduce]] بدأت من [[0]] ومفيش عناصر.

---

## ٦. من غير [[track]]

~~~text ng build
X [ERROR] NG5002: @for loop must have a "track" expression

      7 │   @for (p of products(); let i = $index, last = $last) {
        ╵   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~

إجباري، والـ build بيقع.

---

## ٧. [[track p.id]] ولا [[track $index]]؟ التجربة

عملنا قايمتين بنفس المنتجات، وجوه كل [[li]] حقل [[<input>]]. كتبنا «ملاحظة على كشكول» في حقل الكشكول في القايمتين، وبعدين حذفنا أول منتج (القلم) من الاتنين:

~~~text الناتج (Chrome)
track p.id     كشكول [ملاحظة على كشكول] / مسطرة []
track $index   كشكول [] / مسطرة [ملاحظة على كشكول]
~~~

(اللي بين [[[ ]]] هو المكتوب في الحقل.)

- مع [[track p.id]]: Angular عرف إن عنصر الـ id 1 اتشال، فشال الـ [[li]] بتاعه، والكشكول فضل بنفس عنصره ونفس الحقل.
- مع [[track $index]]: المفتاح هو المكان. بعد الحذف المكان 0 والمكان 1 لسه موجودين والمكان 2 اختفى، فـ Angular شال **آخر** [[li]]، وحدّث النص في الباقي. الحقل اللي كان في المكان 1 فضل في المكان 1، اللي بقى فيه المسطرة.

عشان كده [[track]] بحاجة ثابتة للعنصر نفسه، زي الـ id.

---

## الخلاصة

| الحاجة | الشكل |
|---|---|
| تلف | [[@for (p of list(); track p.id) { ... }]] |
| لو فاضية | [[} @empty { ... }]] |
| الـ index وغيره | [[let i = $index, last = $last]] |
| متغير في الـ template | [[@let total = cartTotal();]] |
| [[track]] | إجباري: [[p.id]] للـ objects، و [[p]] للـ strings، و [[$index]] للقوايم الثابتة بس |`,
          lines: [
            "بداية القائمة.",
            R`لف على المنتجات، اعرفهم بالـ id، وخد الـ index وهل ده الأخير.`,
            R`عنصر لكل منتج، و class [[last]] على آخر واحد.`,
            "لو الـ list فاضية.",
            "رسالة بدل القائمة.",
            "قفلة البلوك.",
            "قفلة القائمة.",
            R`متغير في الـ template بقيمة الـ computed.`,
            "نستخدمه عادي."
          ],
          sol: R`بـ ٣ منتجات: «1. قلم» «2. كشكول» «3. ...»، والأخير عليه class [[last]]، و«الإجمالي: X جنيه». بعد [[products.set([])]]: «مفيش منتجات»، والإجمالي 0 (لو الـ computed بتعمل reduce من 0).

لو شلت [[track]]: خطأ build [[NG5002: @for loop must have a "track" expression]]. ده مقصود، مش bug.

للتأكد إن [[track]] بيفرق: حط [[<input>]] جوه كل [[li]]، اكتب في التاني، واحذف الأول. مع [[track p.id]] الكلام بيفضل مع المنتج بتاعه. مع [[track $index]] الكلام بيفضل في المكان التاني اللي بقى فيه منتج تاني.`
        },
        {
          cmd: "@defer",
          title: "تأجّل تحميل حتة من الصفحة لحد ما المستخدم يحتاجها",
          desc: R`[[@defer]] بيقسّم الـ components اللي جواه في ملف JS منفصل (lazy chunk)، ومش بيحمّله غير لما شرط يتحقق: [[on viewport]] (ظهر في الشاشة)، و [[on interaction]] (المستخدم داس)، و [[on idle]] (الافتراضي، المتصفح فاضي)، و [[on timer(2s)]]، و [[when cond()]].

ومعاه بلوكات: [[@placeholder]] قبل ما يبدأ، و [[@loading]] وهو بيحمّل، و [[@error]] لو فشل.

ده code splitting على مستوى حتة من الصفحة، مش صفحة كاملة.`,
          example: R`<h1>المنتج</h1>
@defer (on viewport) {
  <app-reviews [productId]="id" />
} @placeholder {
  <p>التقييمات هتظهر لما تنزل لتحت</p>
} @loading (minimum 300ms) {
  <p>بيحمّل التقييمات...</p>
} @error {
  <p>التقييمات مش راضية تحمّل</p>
}`,
          try: R`اعمل component [[Reviews]] وحطه جوه @defer زي المثال. اعمل [[ng build]] وبص على جدول «Lazy chunk files»: فيه chunk جديد؟ وبعدين شغّل [[ng serve --no-hmr]] وافتح Network وانزل لتحت، وشوف إمتى الـ chunk بيتحمّل.`,
          deep: {
            why: R`الصفحة فيها حاجات تقيلة المستخدم ممكن ميوصلهاش: تقييمات تحت خالص، و chart، و editor، وخريطة. لو كلهم في الـ bundle الأساسي، أول تحميل بيبطأ عشان حاجات محدش شافها. @defer بيخلي الأساسي خفيف، والباقي ييجي وقت الحاجة. ده بيحسّن LCP و INP.`,
            how: R`الـ compiler بيشوف الـ components اللي جوه @defer، ولو شروطها اتحققت بيطلّعها في chunk لوحدها ويحط مكانها dynamic import. الشروط: تكون standalone، ومتكونش مستخدمة eager في أي حتة تانية في نفس الـ template، ومتعرّفة في ملف لوحدها. لو [[Reviews]] متعرّف في نفس ملف الـ component اللي بيستخدمه، أو مستخدم برا الـ @defer كمان، مش هيتقسم وهيتحمّل مع الصفحة عادي (من غير أي خطأ).

[[on viewport]] بيستخدم IntersectionObserver على الـ placeholder، فالـ [[@placeholder]] لازم يبقى فيه عنصر واحد. [[@loading (minimum 300ms)]] بيمنع وميض لو التحميل سريع، و [[after 100ms]] يأخر ظهوره.

وفيه [[prefetch on idle]]: حمّل الملف بدري بس متعرضوش غير على الشرط.

ومع SSR: المحتوى جوه @defer مش بيترندر على السيرفر (بيطلع الـ placeholder)، إلا مع incremental hydration بـ [[hydrate on viewport]] (المستوى ٣).`,
            when: "حاجات تقيلة أو تحت في الصفحة أو ورا تفاعل: تعليقات، و charts، و rich editors، و dialogs كبيرة، وخرايط. مش للحاجة اللي فوق في أول الشاشة (above the fold): هتعمل layout shift وتبطّأ الـ LCP.",
            mistakes: R`تحط @defer على component متعرّف في نفس الملف أو مستخدم برا كمان في نفس الـ template، فمبيتقسمش وتفتكر إنه شغال. اتأكد من «Lazy chunk files» في [[ng build]]. و [[on viewport]] مع placeholder فيه أكتر من عنصر أو فاضي: خطأ أو مش بيشتغل. و @defer على الـ hero أو العنوان الرئيسي: الصفحة بتنط. وتنسى إن محتواه مش بيتقرا في SSR فالـ SEO مش هيشوفه.`
          },
          teach: R`## الفكرة: «الحتة دي في ملف لوحده، وهاتها لما تظهر»

المثال template لصفحة منتج، وتحت فيها تقييمات تقيلة. شغّلناه في Angular 22.2: [[Reviews]] في ملف لوحده ([[reviews.ts]])، و [[ProductPage]] فيها عنوان وبعده [[div]] طوله 2000px عشان التقييمات تبقى تحت برا الشاشة. واتفحص في [[ng build]] وفي Chrome.

---

## ١. [[@defer (on viewport) { ... }]]

~~~text template
@defer (on viewport) {
  <app-reviews [productId]="id" />
}
~~~

- [[@defer]]: اللي جوه البلوك (هنا component [[Reviews]]) يتحط في ملف JS منفصل، ومايتحمّلش مع الصفحة.
- [[(on viewport)]]: الشرط اللي بيبدأ التحميل: لما الـ placeholder يدخل الجزء الظاهر من الشاشة (الـ viewport).

الشروط التانية بنفس الشكل:

| الشرط | يبدأ التحميل لما |
|---|---|
| [[on idle]] | المتصفح يفضى (الافتراضي لو مكتبتش حاجة) |
| [[on viewport]] | الـ placeholder يظهر في الشاشة |
| [[on interaction]] | المستخدم يدوس أو يكتب في الـ placeholder |
| [[on hover]] | الماوس يعدّي عليه |
| [[on timer(2s)]] | بعد ثانيتين |
| [[when cond()]] | expression يبقى true |

---

## ٢. البلوكات اللي معاه

~~~text template
} @placeholder {
  <p>التقييمات هتظهر لما تنزل لتحت</p>
} @loading (minimum 300ms) {
  <p>بيحمّل التقييمات...</p>
} @error {
  <p>التقييمات مش راضية تحمّل</p>
}
~~~

| البلوك | بيظهر إمتى |
|---|---|
| [[@placeholder]] | من الأول لحد ما الشرط يتحقق. ومع [[on viewport]] هو العنصر اللي بيتراقب، فلازم يبقى فيه عنصر واحد |
| [[@loading (minimum 300ms)]] | وهو بيحمّل، ولو ظهر يفضل ٣٠٠ms على الأقل عشان ميعملش وميض |
| [[@error]] | لو الملف فشل يتحمّل (النت فصل مثلًا) |

---

## ٣. [[ng build]]: الملف اتعمل فعلًا؟

~~~text الناتج
Initial chunk files | Names         |  Raw size | Estimated transfer size
main-PI7AMDJ2.js    | main          | 239.05 kB |                65.35 kB

Lazy chunk files    | Names         |  Raw size | Estimated transfer size
chunk-7y-Jrvaw.js   | reviews       | 519 bytes |               519 bytes
~~~

(في المشروع ده كان فيه chunks تانية لصفحات lazy، شلناها من الناتج.)

**Lazy chunk files** = الملفات اللي مش بتتحمّل في الأول. وسطر [[reviews]] هو الـ component بتاعنا: 519 bytes بقوا برا [[main]].

### لو [[Reviews]] في نفس الملف

نقلنا كلاس [[Reviews]] جوه [[product-page.ts]] نفسه وعملنا build تاني: سطر [[reviews]] اختفى من Lazy chunk files، ومفيش ولا خطأ ولا تحذير. الـ component اتحمّل مع الصفحة عادي. عشان كده بص على الجدول دايمًا، متفترضش.

---

## ٤. في المتصفح: إمتى بيتحمّل؟

### الأول: [[ng serve]] العادي

~~~text الـ Console
NG0751: Angular has detected that this application contains $__bt@defer$__bt blocks and the hot module replacement (HMR) mode is enabled. All $__bt@defer$__bt block dependencies will be loaded eagerly.
~~~

الـ HMR (تحديث الصفحة من غير reload وانت بتعدّل) شغال افتراضيًا في [[ng serve]]، ومعاه Angular بيحمّل كل الـ @defer من الأول. فعشان تشوف السلوك الحقيقي:

~~~powershell
ng serve --no-hmr
~~~

### بـ [[--no-hmr]]

فتحنا الصفحة (شاشة 800×600)، واستنينا، وبعدين نزلنا لتحت. الأرقام ملي ثانية من أول ما فتحنا:

~~~text الناتج (Chrome)
+1214ms before scroll: المنتج  التقييمات هتظهر لما تنزل لتحت
+1231ms request chunk-SWTK6G6R.js
+1322ms المنتج  بيحمّل التقييمات...
+1428ms المنتج  بيحمّل التقييمات...
+1535ms المنتج  منتج 5: ممتاز ★★★★★  كويس ★★★★
~~~

| الوقت | اللي حصل |
|---|---|
| لحد 1214 | الـ placeholder بس، والملف **ماتطلبش** |
| 1231 | نزلنا، الـ placeholder دخل الشاشة، فالملف اتطلب |
| 1322 لـ 1428 | الـ [[@loading]] ظاهر |
| 1535 | التقييمات ظهرت، و [[productId]] وصل 5 |

الـ loading فضل حوالي ٣٠٠ms مع إن الملف صغير وجه في ثواني: ده الـ [[minimum 300ms]].

---

## الخلاصة

| الحاجة | الشكل |
|---|---|
| أجّل حتة | [[@defer (on viewport) { <app-x /> }]] |
| قبل التحميل | [[@placeholder { عنصر واحد }]] |
| وهو بيحمّل | [[@loading (minimum 300ms) { ... }]] |
| لو فشل | [[@error { ... }]] |
| شروط التقسيم | component في ملف لوحده، ومش مستخدم برا الـ @defer |
| اتأكد | «Lazy chunk files» في [[ng build]]، و [[ng serve --no-hmr]] للتجربة |`,
          lines: [
            "ده بيتحمّل مع الصفحة عادي.",
            "أجّل اللي جوه لحد ما الـ placeholder يظهر في الشاشة.",
            "الـ component ده هيبقى في ملف JS لوحده.",
            "قبل ما التحميل يبدأ.",
            "عنصر واحد بيتراقب بـ IntersectionObserver.",
            "وهو بيحمّل، ويفضل ظاهر ٣٠٠ms على الأقل عشان ميعملش وميض.",
            "رسالة التحميل.",
            "لو الـ chunk فشل (نت فصل مثلًا).",
            "رسالة الخطأ.",
            "قفلة."
          ],
          sol: R`في [[ng build]] هتلاقي تحت «Lazy chunk files» سطر جديد باسم ملف الـ component، زي [[chunk-XXXX.js | reviews-list | 424 bytes]]. ده اللي حصل في الـ lab بالظبط، بس بعد ما [[Reviews]] اتنقل لملف لوحده: لما كان متعرّف في نفس ملف [[ProductPage]]، مفيش chunk اتعمل خالص. فلو مش لاقيه: انقل الـ component لملف لوحده، واتأكد إنه مش مستخدم برا الـ @defer.

في Network (مع [[--no-hmr]]): الـ chunk مش بيتحمّل مع الصفحة، وبيتحمّل أول ما «التقييمات هتظهر...» تدخل الشاشة، وبعدها «بيحمّل التقييمات...» لمدة ٣٠٠ms على الأقل، وبعدين التقييمات. لو الـ placeholder ظاهر من الأول (الصفحة قصيرة)، هيتحمّل على طول، وده سلوك صح.

ولو شغّال [[ng serve]] عادي، هتلاقي في الـ console [[NG0751]]: الـ HMR (التحديث من غير reload) شغال افتراضيًا، ومعاه Angular بيحمّل كل الـ @defer eager، فالـ chunk هيتحمّل مع الصفحة. ده في التطوير بس، والـ build مش متأثر.`
        }
      ]
    },
    {
      t: "services و pipes و directives",
      l: 1,
      n: "منطق مشترك في service بـ inject()، وتنسيق بـ pipe، وسلوك على عنصر بـ directive",
      items: [
        {
          cmd: "services و inject()",
          title: "service بتشيل المنطق والبيانات المشتركة، و inject() بتجيبها",
          desc: R`الـ service كلاس بيشيل حاجة مش مكانها component: بيانات مشتركة (السلة، المستخدم الحالي)، أو كلام مع API، أو منطق. أي component يطلبها بـ [[inject(Cart)]]، و Angular بيديله نفس النسخة (singleton).

في Angular 22 فيه decorator جديد [[@Service()]] بيعمل كده. وفي كل الكود قبله، وفي ٩٠٪ من اللي هتقابله في الشغل: [[@Injectable({ providedIn: 'root' })]]. الاتنين بيعملوا singleton على مستوى التطبيق.

ده اسمه Dependency Injection: الـ component مش بيعمل [[new Cart()]]، بيطلبها، و Angular هو اللي يعملها ويديها.`,
          example: R`import { Component, Service, computed, inject, signal } from '@angular/core';
@Service()
export class Cart {
  private readonly items = signal<Product[]>([]);
  readonly count = computed(() => this.items().length);
  readonly total = computed(() => this.items().reduce((s, p) => s + p.price, 0));
  add(p: Product) { this.items.update((list) => [...list, p]); }
}
@Component({
  selector: 'app-header',
  template: $__bt<span>السلة ({{ cart.count() }}) - {{ cart.total() }} جنيه</span>$__bt,
})
export class Header {
  protected readonly cart = inject(Cart);
}`,
          try: R`حط [[Header]] فوق في [[App]]، وفي [[ProductCard]] (أو في App) اعمل field [[cart = inject(Cart)]] وخلي زرار «أضف للسلة» ينادي [[cart.add(...)]] (مش [[inject(Cart)]] جوه الـ click handler نفسه: ده NG0203). شوف الهيدر بيتحدّث مع إن مفيش input بينهم. بعدين غيّر [[@Service()]] لـ [[@Injectable({ providedIn: 'root' })]] وتأكد إن مفيش فرق.`,
          flag: "script",
          deep: {
            why: R`لو كل component بيعمل [[new Cart()]]، كل واحد هيبقى عنده سلة لوحده. ولو بتعدّي السلة input ورا input من App لحد الهيدر والكارت، هتعدّيها في ١٠ components مالهمش دعوة. الـ service المشتركة بتحل ده. و DI بيخلي الاختبار سهل: في التست تقدر تقول «لما حد يطلب Cart، اديله نسخة وهمية».`,
            how: R`[[inject(Cart)]] بتسأل الـ injector: عندك Cart؟ لو [[@Service()]] أو [[providedIn: 'root']]، الـ root injector بيعملها أول مرة حد يطلبها ويحتفظ بيها لآخر التطبيق. ولو محدش طلبها خالص، بتتشال من الـ bundle (tree-shakable).

[[inject()]] لازم تتنادى في injection context: field initializer، أو constructor، أو دالة factory. مينفعش في click handler.

الفرق بين الاتنين: [[@Service()]] معمول أساسًا لـ singleton في الـ root بيستخدم [[inject()]]، ومش بيدعم constructor injection ولا [[useClass]] وغيرها (ولو عايزه في providers بتاع component بتكتب [[@Service({ autoProvided: false })]]). [[@Injectable]] أعم: ينفع تحطه في providers بتاع component أو route، وينفع [[constructor(private http: HttpClient)]] (الشكل القديم اللي هتلاقيه في كل مكان، ولسه شغال).

وفي الـ service اللي فوق: الـ signal [[private]] والتعديل من [[add]] بس، و [[count]] و [[total]] للقراية. كده محدش من برا يقدر يلخبط البيانات.`,
            when: R`أي state مشترك بين أكتر من component، وأي كلام مع API، وأي منطق مش خاص بالعرض (حسابات، صلاحيات، تنسيقات). والـ component يفضل مسؤول عن العرض والتفاعل بس.`,
            mistakes: R`[[new Cart()]] جوه component: نسخة لوحدها، ومش هتتحقن فيها dependencies. و [[inject()]] جوه دالة بتتنادي بعدين: NG0203 inject() must be called from an injection context. وتحط الـ service في [[providers: [Cart]]] بتاع component وانت عايز singleton: كل component بياخد نسخة جديدة (ده مفيد أحيانًا، وهتشوفه في سؤال DI hierarchy في الانترفيو). وتعمل [[items]] public فأي حد يعمل [[cart.items.set([])]].`
          },
          teach: R`## الفكرة: كلاس واحد بيشيل السلة، وأي component يطلبه ياخد نفس النسخة

المثال حتتين: الـ service ([[Cart]]) والـ component اللي بيقرا منها ([[Header]]). عشان نشوف المشاركة، زوّدنا component تالت [[Adder]] فيه زرارين بيضيفوا للسلة، وحطينا الاتنين في صفحة واحدة. اتشغّل في [[ng serve]] (Angular 22.2) واتفحص في Chrome. (ونوع [[Product]] متعرّف فوق زي درس [[input()]].)

---

## ١. [[@Service()]]

~~~text svc.ts
import { Component, Service, computed, inject, signal } from '@angular/core';
@Service()
export class Cart {
~~~

[[@Service()]] بيقول لـ Angular: «الكلاس ده service، اعمل منه نسخة واحدة للتطبيق كله لما حد يطلبه». النسخة الواحدة دي اسمها **singleton**.

---

## ٢. جوه الـ service

~~~text svc.ts
private readonly items = signal<Product[]>([]);
readonly count = computed(() => this.items().length);
readonly total = computed(() => this.items().reduce((s, p) => s + p.price, 0));
add(p: Product) { this.items.update((list) => [...list, p]); }
~~~

| السطر | ليه كده |
|---|---|
| [[private readonly items]] | [[private]]: محدش برا الكلاس يقدر يقرا أو يعدّل [[items]] مباشرة |
| [[readonly count = computed(...)]] | عدد العناصر، للقراية بس |
| [[readonly total = computed(...)]] | مجموع الأسعار بـ [[reduce]] من 0 |
| [[add(p)]] | الطريقة **الوحيدة** للتعديل، وبـ array جديدة ([[...list]]) |

الفكرة: البيانات مقفول عليها، وفيه باب واحد للتعديل. فلو السلة باظت، بتدوّر في [[add]] بس.

---

## ٣. [[inject(Cart)]]

~~~text svc.ts
export class Header {
  protected readonly cart = inject(Cart);
}
~~~

[[inject(Cart)]] معناها: «يا Angular، هاتلي الـ Cart». أول مرة حد يطلبها Angular بيعملها، وكل مرة بعد كده بيرجّع **نفس** النسخة. الـ component مبيعملش [[new Cart()]] بنفسه، وده اسمه Dependency Injection.

والـ template بيقرا منها مباشرة:

~~~text template
<span>السلة ({{ cart.count() }}) - {{ cart.total() }} جنيه</span>
~~~

---

## ٤. التجربة: component تاني بيضيف

~~~text svc.ts
export class Adder {
  protected readonly cart = inject(Cart);
}
// template: <button (click)="cart.add({ id: 1, name: 'قلم', price: 10 })">أضف قلم</button>
~~~

ودوسنا الزراير:

~~~text الناتج (Chrome)
start: السلة (0) - 0 جنيه
after قلم: السلة (1) - 10 جنيه
after كشكول: السلة (2) - 55 جنيه
~~~

[[Header]] و [[Adder]] مفيش بينهم input ولا output. الاتنين طلبوا [[Cart]] فأخدوا نفس النسخة، و [[Adder]] غيّر الـ signal اللي [[Header]] بيقرا منها، فاتحدّث لوحده. و 10 + 45 = 55.

---

## ٥. [[inject()]] فين بالظبط؟

[[inject]] بتشتغل بس في **injection context**: field في الكلاس (زي فوق)، أو الـ constructor. جرّبنا نناديها جوه دالة الـ click:

~~~text svc.ts
late() { inject(Cart).add({ id: 1, name: 'قلم', price: 10 }); }
~~~

~~~text الـ Console
ERROR RuntimeError: NG0203: The $__bt_Cart$__bt token injection failed. $__btinject()$__bt function must be called from an injection context such as a constructor, a factory function, a field initializer, or a function used with $__btrunInInjectionContext$__bt.
~~~

والسلة فضلت (0). الحل: [[cart = inject(Cart)]] كـ field، وفي الدالة [[this.cart.add(...)]].

---

## ٦. [[@Injectable({ providedIn: 'root' })]]

بدّلنا [[@Service()]] بالشكل اللي هتلاقيه في كل الكود اللي قبل Angular 22:

~~~text svc.ts
@Injectable({ providedIn: 'root' })
export class Cart { ... }
~~~

نفس الناتج بالظبط ([[السلة (2) - 55 جنيه]]). [[providedIn: 'root']] معناها «سجّلها في الـ root injector»، يعني نسخة واحدة للتطبيق.

### الفرق: constructor injection

زوّدنا [[constructor(private http: HttpClient) {}]] لـ [[Cart]] وهي [[@Service()]]:

~~~text ng build
X [ERROR] NG2028: @Service class cannot use constructor dependency injection. Use the $__btinject$__bt function instead.
~~~

مع [[@Injectable]] نفس الـ constructor شغال، وده الشكل القديم اللي هتقراه كتير.

| | [[@Service()]] | [[@Injectable({ providedIn: 'root' })]] |
|---|---|---|
| نسخة واحدة للتطبيق | أيوه | أيوه |
| [[inject()]] جواها | أيوه | أيوه |
| [[constructor(private x: X)]] | لأ: NG2028 | أيوه |
| من إمتى | Angular 22 | من زمان، في كل مشروع |

---

## الخلاصة

| الحاجة | الشكل |
|---|---|
| service للتطبيق كله | [[@Service()]] (أو [[@Injectable({ providedIn: 'root' })]]) |
| تجيبها | [[cart = inject(Cart)]] كـ field |
| البيانات | [[private]] signal، وتعرض [[computed]] للقراية |
| التعديل | دوال في الـ service بس |
| [[inject]] برا field أو constructor | NG0203 |`,
          lines: [
            R`[[Service]] الجديد و [[inject]] والـ signals.`,
            "service متاحة لكل التطبيق كنسخة واحدة.",
            "الكلاس.",
            R`البيانات [[private]]: محدش من برا يعدّلها مباشرة.`,
            "العدد محسوب.",
            "والإجمالي محسوب.",
            "الطريقة الوحيدة للتعديل، وبشكل immutable.",
            "قفلة.",
            "component بيستخدمها.",
            "الـ selector.",
            "بيقرا من الـ service مباشرة في الـ template.",
            "قفلة.",
            "الكلاس.",
            R`[[inject]] بتجيب نفس النسخة اللي عند أي حد تاني.`,
            "قفلة."
          ],
          sol: R`لما تدوس «أضف للسلة» في أي حتة، الهيدر بيتحدّث: «السلة (1) - 10 جنيه» وبعدين «السلة (2) - 55 جنيه». مفيش input ولا output بين الهيدر والكارت، الاتنين طلبوا نفس النسخة من [[Cart]]، والهيدر بيقرا signals فبيتحدّث لوحده. وده اتأكد في الـ lab باختبار: بعد إضافة منتجين بسعر 10 و 45، [[count()]] رجعت 2 و [[total()]] رجعت 55.

بعد ما تبدّل لـ [[@Injectable({ providedIn: 'root' })]] (ومتنساش [[import { Injectable }]]) السلوك نفسه بالظبط. الفرق هيبان بس لو حاولت [[constructor(private http: HttpClient)]]: مع [[@Service()]] الـ build بيقع بـ [[NG2028: @Service class cannot use constructor dependency injection]]، ومع [[@Injectable]] شغال.`
        },
        {
          cmd: "pipes",
          title: "تنسّق القيم في الـ template بـ | date و currency و pipe بتاعتك",
          desc: R`الـ pipe دالة بتنسّق قيمة للعرض في الـ template: [[{{ price | currency: 'EGP' }}]] و [[{{ createdAt | date: 'd MMM y' }}]] و [[{{ name | uppercase }}]]. مش بتغيّر البيانات، بتغيّر شكلها وهي بتتعرض.

الجاهزين في [[@angular/common]]: [[DatePipe]] و [[CurrencyPipe]] و [[DecimalPipe]] و [[PercentPipe]] و [[UpperCasePipe]] و [[JsonPipe]] و [[AsyncPipe]] (بتاعة الـ Observables، في درس RxJS). ولازم تحطهم في [[imports]].

وتقدر تعمل pipe بتاعتك بـ [[@Pipe]] و [[transform()]].`,
          example: R`import { Component, Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
@Pipe({ name: 'egp' })
export class EgpPipe implements PipeTransform {
  private fmt = new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' });
  transform(value: number | null | undefined): string {
    return value == null ? '—' : this.fmt.format(value);
  }
}
@Component({
  selector: 'app-price',
  imports: [CurrencyPipe, DatePipe, UpperCasePipe, EgpPipe],
  template: $__bt
    <p>{{ price | currency: 'EGP' : 'symbol' : '1.0-2' }}</p>
    <p>{{ createdAt | date: 'd MMM y' }}</p>
    <p>{{ name | uppercase }}</p>
    <p>{{ price | egp }}</p>
  $__bt,
})
export class Price {
  price = 1250.5;
  createdAt = new Date(2026, 8, 30);
  name = 'angular';
}`,
          try: R`اعرض الـ component وقارن سطر الـ currency بسطر الـ egp. بعدين اعمل pipe اسمها [[timeAgo]] بتاخد Date وترجع «من X دقيقة» بـ [[Intl.RelativeTimeFormat('ar')]] (فيه درس عنه في «تاب JavaScript»).`,
          flag: "script",
          deep: {
            why: R`التنسيق بيتكرر في كل مكان: تاريخ وفلوس وأرقام. لو بتعمله في الكلاس، هتعمل خاصية زيادة لكل قيمة (priceLabel و dateLabel...). الـ pipe بتخلي التنسيق في الـ template حيث مكانه، وبتتكتب مرة وتتستخدم في كل حتة.`,
            how: R`الـ pipe «pure» افتراضيًا: Angular بينادي [[transform]] بس لما القيمة الداخلة تتغير (بالـ reference). ده بيخليها أسرع من دالة عادية في الـ template ([[{{ format(price) }}]] بتتنادى في كل change detection).

عشان كده لو بعت array وعدّلت فيها بـ push، الـ pure pipe مش هتحس. [[pure: false]] بتخليها تتنادى كل مرة، وده مكلّف، والأحسن تغيّر البيانات immutable.

الـ pipes بتتسلسل: [[{{ date | date: 'short' | uppercase }}]]. والـ arguments بعد [[:]].

الـ [[DatePipe]] و [[CurrencyPipe]] بيستخدموا الـ locale بتاع التطبيق (الافتراضي en-US). عشان تنسيق عربي محتاج [[registerLocaleData]] للعربي و [[LOCALE_ID]]، أو [[Intl]] مباشرة زي الـ egp هنا، وده أبسط.`,
            when: R`أي تنسيق للعرض بس: تواريخ وفلوس ونسب واختصار نص. لو القيمة المنسّقة محتاجها في الكود (هتبعتها API مثلًا)، اعملها في service أو computed مش pipe.`,
            mistakes: R`تنسى تعمل import للـ pipe في الـ component: NG8004 No pipe found with name 'currency'. وتعمل pipe بتعمل HTTP أو حسابات تقيلة. وتستخدم [[pure: false]] عشان «مش بتتحدّث»، والمشكلة الحقيقية إنك بتعدّل البيانات mutable. وتفتكر إن [[currency: 'EGP']] هيطلع بالعربي: هيطلع [[EGP1,250.50]] لأن الـ locale إنجليزي.`
          },
          teach: R`## الفكرة: [[|]] في الـ template معناها «عدّي القيمة على دالة تنسيق»

~~~text شكل الـ pipe
{{ price | currency : 'EGP' : 'symbol' : '1.0-2' }}
   القيمة   اسم الـ pipe   argument 1   argument 2   argument 3
~~~

القيمة على الشمال، و [[|]] (pipe)، واسم الـ pipe، وبعد كل [[:]] argument. البيانات نفسها مش بتتغير، الشكل بس اللي بيتعرض. المثال اتشغّل في [[ng serve]] (Angular 22.2) واتقرا النص من Chrome.

---

## ١. الـ imports

~~~text price.ts
import { Component, Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
~~~

[[Pipe]] و [[PipeTransform]] عشان نعمل pipe بتاعتنا. والـ pipes الجاهزة في [[@angular/common]]، وكل واحدة كلاس بتعمله import.

---

## ٢. الـ pipe بتاعتنا: [[EgpPipe]]

~~~text price.ts
@Pipe({ name: 'egp' })
export class EgpPipe implements PipeTransform {
  private fmt = new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' });
  transform(value: number | null | undefined): string {
    return value == null ? '—' : this.fmt.format(value);
  }
}
~~~

| السطر | معناه |
|---|---|
| [[@Pipe({ name: 'egp' })]] | الاسم اللي هيتكتب بعد [[|]] في الـ template |
| [[implements PipeTransform]] | وعد لـ TypeScript إن الكلاس فيه دالة [[transform]]، ولو نسيتها يعترض |
| [[new Intl.NumberFormat('ar-EG', ...)]] | منسّق أرقام جاهز في المتصفح: لغة عربي مصر، وشكل عملة، والعملة جنيه. بنعمله مرة واحدة كـ field مش مع كل نداء |
| [[transform(value)]] | Angular بيناديها بالقيمة اللي على شمال [[|]]، واللي ترجّعه هو اللي بيظهر |
| [[number | null | undefined]] | القيمة ممكن تبقى رقم أو فاضية |
| [[value == null]] | الـ [[==]] (مش [[===]]) بتمسك [[null]] و [[undefined]] الاتنين |
| [[? '—' : this.fmt.format(value)]] | لو فاضية رجّع شرطة، وإلا نسّق |

---

## ٣. الـ component

~~~text price.ts
imports: [CurrencyPipe, DatePipe, UpperCasePipe, EgpPipe],
~~~

كل pipe بتتكتب في الـ template لازم تبقى هنا، الجاهزة وبتاعتك.

### السطور الأربعة والناتج

~~~text الناتج (Chrome)
EGP1,250.5
30 Sep 2026
ANGULAR
‏١٬٢٥٠٫٥٠ ج.م.‏
~~~

### ١: [[price | currency: 'EGP' : 'symbol' : '1.0-2']]

| الـ argument | معناه |
|---|---|
| [['EGP']] | كود العملة |
| [['symbol']] | اعرض رمز العملة (لو ليها رمز في الـ locale، وإلا الكود) |
| [['1.0-2']] | الصيغة: رقم صحيح واحد على الأقل، ومن 0 لـ 2 رقم بعد العلامة |

فـ 1250.5 طلعت [[EGP1,250.5]]: رقم واحد بعد العلامة لأن الحد الأدنى 0. ومن غير [['1.0-2']]، بس [[currency: 'EGP']]، طلعت [[EGP1,250.50]] (رقمين دايمًا). والشكل إنجليزي لأن locale التطبيق الافتراضي [[en-US]].

### ٢: [[createdAt | date: 'd MMM y']]

[[new Date(2026, 8, 30)]]: الشهور في JavaScript من 0، فـ 8 = سبتمبر. والصيغة: [[d]] اليوم، و [[MMM]] اسم الشهر مختصر، و [[y]] السنة. النتيجة [[30 Sep 2026]].

### ٣: [[name | uppercase]]

[[angular]] بقت [[ANGULAR]].

### ٤: [[price | egp]]

[[‏١٬٢٥٠٫٥٠ ج.م.‏]]: أرقام عربية، و [[٬]] فاصل الآلاف، و [[٫]] العلامة العشرية. وفيه حروف مخفية: طبعنا أكواد الحروف في Node ولقينا أول حرف وآخر حرف [[200f]]، ودي علامة RLM (Right-to-Left Mark) بتظبط اتجاه النص، وبعد الرقم [[a0]] مسافة مبتتقسمش.

وجرّبنا كمان [[{{ nothing | egp }}]] و [[nothing = null]]: طلعت [[—]].

---

## ٤. لو نسيت الـ import

شلنا [[CurrencyPipe]] من [[imports]]:

~~~text ng build
X [ERROR] NG8004: No pipe found with name 'currency'.
To fix this, import the "CurrencyPipe" class from "@angular/common" and add it to the "imports" array of the component.

      26 │     <p>{{ price | currency: 'EGP' : 'symbol' : '1.0-2' }}</p>
         ╵                   ~~~~~~~~
~~~

الرسالة بتقولك الحل بالاسم.

---

## ٥. الـ solCode: [[timeAgo]]

~~~text time-ago.ts
private rtf = new Intl.RelativeTimeFormat('ar', { numeric: 'auto' });
transform(date: Date | string | null): string {
  if (!date) return '';
  const minutes = Math.round((new Date(date).getTime() - Date.now()) / 60000);
  if (Math.abs(minutes) < 60) return this.rtf.format(minutes, 'minute');
  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 24) return this.rtf.format(hours, 'hour');
  return this.rtf.format(Math.round(hours / 24), 'day');
}
~~~

- [[Intl.RelativeTimeFormat]] بتكتب «قبل X» أو «بعد X». و [[numeric: 'auto']] بتخليها تقول «أمس» بدل «قبل يوم واحد».
- [[getTime() - Date.now()]]: الفرق بالملي ثانية، سالب لو التاريخ فات. ونقسم على 60000 (ملي ثانية في الدقيقة).
- [[Math.abs]] القيمة من غير إشارة، فأقل من 60 دقيقة نكتب بالدقايق، وأقل من 24 ساعة بالساعات، وإلا بالأيام.

جرّبناها بأربع تواريخ في Chrome:

~~~text الناتج (Chrome)
قبل 5 دقائق
قبل 3 ساعات
أمس
قبل 4 أيام
~~~

الأرقام إنجليزي لأن [['ar']] لوحدها في Chrome بتستخدمها، عكس [['ar-EG']] في الـ egp.

---

## الخلاصة

| الحاجة | الشكل |
|---|---|
| تستخدم pipe | [[{{ x | name: arg1 : arg2 }}]] |
| الجاهزة | [[currency]] و [[date]] و [[uppercase]] و [[number]] و [[percent]] و [[json]] من [[@angular/common]] |
| بتاعتك | [[@Pipe({ name })]] و [[transform(value)]] |
| لازم | كل pipe في [[imports]]، وإلا NG8004 |
| تنسيق عربي | [[Intl]] بـ [['ar-EG']]، أو locale عربي للتطبيق |`,
          lines: [
            R`[[Pipe]] و [[PipeTransform]] عشان نعمل pipe.`,
            "الـ pipes الجاهزة.",
            R`اسمها في الـ template هيبقى [[egp]].`,
            R`[[PipeTransform]] بيضمن إن فيه [[transform]].`,
            R`[[Intl]] بتاع المتصفح بينسّق بالعربي. بنعمله مرة واحدة مش في كل نداء.`,
            R`[[transform]] بتاخد القيمة وترجع النص.`,
            R`لو null أو undefined نرجع شرطة، وإلا ننسّق.`,
            "قفلة.",
            "قفلة الكلاس.",
            "component بيستخدمهم.",
            "الـ selector.",
            "لازم import لكل pipe، الجاهزة وبتاعتك.",
            "بداية الـ template.",
            R`currency بالـ EGP، وبالرمز، ومن 0 لـ 2 رقم عشري.`,
            "تاريخ بصيغة مختصرة.",
            "حروف كبيرة.",
            "الـ pipe بتاعتنا.",
            "قفلة الـ template.",
            "قفلة الـ decorator.",
            "الكلاس.",
            "رقم عادي.",
            R`30 سبتمبر 2026 (الشهور من 0 في [[Date]]).`,
            "نص.",
            "قفلة."
          ],
          sol: R`هتشوف: [[EGP1,250.5]]، و [[30 Sep 2026]]، و [[ANGULAR]]، و [[‏١٬٢٥٠٫٥٠ ج.م.‏]]. الأخير اتجرّب في الـ lab بالظبط (فيه علامات اتجاه RTL مخفية حوالين النص). الفرق إن [[CurrencyPipe]] بتستخدم locale التطبيق (en-US)، والـ egp بتستخدم [[ar-EG]] مباشرة.

الـ timeAgo:`,
          solCode: R`import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'timeAgo' })
export class TimeAgoPipe implements PipeTransform {
  private rtf = new Intl.RelativeTimeFormat('ar', { numeric: 'auto' });
  transform(date: Date | string | null): string {
    if (!date) return '';
    const minutes = Math.round((new Date(date).getTime() - Date.now()) / 60000);
    if (Math.abs(minutes) < 60) return this.rtf.format(minutes, 'minute');
    const hours = Math.round(minutes / 60);
    if (Math.abs(hours) < 24) return this.rtf.format(hours, 'hour');
    return this.rtf.format(Math.round(hours / 24), 'day');
  }
}
// {{ order.createdAt | timeAgo }}  ← «قبل 5 دقائق» أو «أمس»`
        },
        {
          cmd: "directives",
          title: "directive بتضيف سلوك لأي عنصر موجود",
          desc: R`الـ component عنصر جديد ليه template. الـ directive مالهاش template: بتتحط على عنصر موجود وتضيف له سلوك أو شكل. [[<p appHighlight>]] مثلًا بتلوّن أي عنصر لما الماوس يعدّي عليه.

بتتعمل بـ [[@Directive({ selector: '[appHighlight]' })]]، والأقواس المربعة في الـ selector معناها «أي عنصر عليه attribute بالاسم ده». وبتسمع للأحداث وتغيّر الـ attributes والـ styles عن طريق [[host]].

[[routerLink]] و [[formControlName]] و [[ngModel]] كلهم directives.`,
          example: R`import { Directive, input, signal } from '@angular/core';
@Directive({
  selector: '[appHighlight]',
  host: {
    '(mouseenter)': 'hover.set(true)',
    '(mouseleave)': 'hover.set(false)',
    '[style.background-color]': 'hover() ? (color() || "yellow") : null',
  },
})
export class Highlight {
  color = input('', { alias: 'appHighlight' });
  protected hover = signal(false);
}
// <p appHighlight>أصفر</p>   <p appHighlight="lightblue">أزرق</p>`,
          try: R`حط الـ directive في [[imports]] وجرّبها على [[p]] و [[button]] و [[li]]. بعدين اعمل directive تانية [[appAutofocus]] بتعمل focus للـ input أول ما يظهر (استخدم [[inject(ElementRef)]] و [[afterNextRender]]).`,
          flag: "script",
          deep: {
            why: "فيه سلوكيات بتتكرر على عناصر كتير مختلفة: tooltip، و autofocus، و «اقفل لما تدوس برا»، و صلاحيات تخبّي زرار. لو كتبتها في كل component هتتكرر، ولو عملتها component هتضطر تغلّف العنصر. الـ directive بتتحط كـ attribute على أي عنصر من غير ما تغيّر شكل الـ HTML.",
            how: R`الـ [[host]] في الـ decorator بيربط أحداث وخصايص على العنصر اللي الـ directive عليه: [[(mouseenter)]] حدث، و [[[style.background-color]]] binding. ده الشكل الحديث؛ في الكود القديم هتلاقي [[@HostListener('mouseenter')]] و [[@HostBinding('style.backgroundColor')]] وهما نفس الفكرة.

[[input('', { alias: 'appHighlight' })]] بتخلي قيمة الـ attribute نفسه هي الـ input: [[appHighlight="lightblue"]]. ولو كتبته من غير قيمة، القيمة بتبقى نص فاضي، عشان كده الـ [[||]].

لو محتاج العنصر نفسه: [[private el = inject(ElementRef<HTMLElement>)]] وبعدين [[this.el.nativeElement]]، بس متلمسش الـ DOM غير بعد ما يترسم ([[afterNextRender]]) وخد بالك إنه مش موجود في SSR.

فيه كمان structural directives (زي [[*ngIf]] القديمة) بتغيّر الـ DOM نفسه، بس مع @if و @for بقى نادر إنك تكتب واحدة.`,
            when: R`سلوك مستقل عن شكل العنصر وبيتكرر: tooltip، و autofocus، و click outside، و «اعرض لو عنده صلاحية». لو محتاج template (HTML جديد)، اعمل component.`,
            mistakes: R`تنسى الأقواس المربعة في الـ selector فيبقى selector لـ tag اسمه appHighlight. وتعدّل [[nativeElement.style]] مباشرة بدل host binding: شغال، بس بيتخانق مع Angular وبيبوّظ SSR. وتنسى import للـ directive فالـ attribute يتجاهل بهدوء من غير أي خطأ، لأن attribute مجهول مسموح في HTML.`
          },
          teach: R`## الفكرة: كلاس بيتلزق على عنصر موجود من خلال attribute

[[Highlight]] مالهاش HTML خاص بيها. بتتكتب كـ attribute على أي عنصر ([[<p appHighlight>]])، وتسمع لأحداثه وتغيّر شكله. اتشغّلت هي و [[Autofocus]] بتاعة الـ solCode في [[ng serve]] (Angular 22.2)، والماوس اتحرك فعلًا في Chrome بـ Playwright.

---

## ١. [[@Directive]] و [[selector: '[appHighlight]']]

~~~text dir.ts
import { Directive, input, signal } from '@angular/core';
@Directive({
  selector: '[appHighlight]',
~~~

- [[@Directive]] زي [[@Component]] من غير [[template]] ولا [[styles]].
- الـ selector ده CSS selector: [[[appHighlight]]] بالأقواس المربعة = «أي عنصر عليه attribute اسمه appHighlight». من غير الأقواس، [[appHighlight]] كان هيبقى اسم tag.
- [[app]] الـ prefix بتاع المشروع، زي [[app-]] في الـ components.

---

## ٢. [[host]]: روابط على العنصر نفسه

~~~text dir.ts
host: {
  '(mouseenter)': 'hover.set(true)',
  '(mouseleave)': 'hover.set(false)',
  '[style.background-color]': 'hover() ? (color() || "yellow") : null',
},
~~~

الـ host هو العنصر اللي الـ directive عليه. والمفاتيح نفس رموز الـ template بالظبط:

| المفتاح | معناه |
|---|---|
| [['(mouseenter)']] | حدث: الماوس دخل العنصر، فنفّذ [[hover.set(true)]] |
| [['(mouseleave)']] | حدث: الماوس خرج |
| [['[style.background-color]']] | binding: لون الخلفية = الـ expression |

والـ expression الأخير من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[color() || "yellow"]] | اللون اللي اتكتب في الـ attribute، ولو نص فاضي خد yellow. الـ [[||]] بتاخد التاني لو الأول falsy |
| [[hover() ? (...) : null]] | لو الماوس فوقه حط اللون، وإلا [[null]]، و [[null]] معناها «شيل الـ style» |

---

## ٣. الكلاس

~~~text dir.ts
export class Highlight {
  color = input('', { alias: 'appHighlight' });
  protected hover = signal(false);
}
~~~

- [[input('', { alias: 'appHighlight' })]]: input قيمته الافتراضية نص فاضي، واسمه من برا [[appHighlight]]، يعني نفس اسم الـ attribute. فـ [[appHighlight="lightblue"]] بتشغّل الـ directive **وبتبعت** اللون في نفس الوقت. وجوه الكلاس اسمه [[color]] عشان يبقى مفهوم.
- [[hover]] signal بتقول الماوس فوقه ولا لأ.

---

## ٤. الناتج

~~~text template
<p appHighlight>أصفر</p>   <p appHighlight="lightblue">أزرق</p>
<button appHighlight="pink">زرار</button>
~~~

~~~text الناتج (Chrome)
before:   <p apphighlight="">أصفر</p>                                         bg=rgba(0, 0, 0, 0)
hover p1: <p apphighlight="" style="background-color: yellow;">أصفر</p>      bg=rgb(255, 255, 0)
hover p2: <p apphighlight="lightblue" style="background-color: lightblue;">  bg=rgb(173, 216, 230)
hover b:  <button apphighlight="pink" style="background-color: pink;">        bg=rgb(255, 192, 203)
leave p2: <p apphighlight="lightblue" style="">أزرق</p>                       bg=rgba(0, 0, 0, 0)
~~~

- الأول من غير قيمة: [[apphighlight=""]] نص فاضي، فأخد yellow.
- [[rgba(0, 0, 0, 0)]] معناها شفاف، يعني مفيش خلفية.
- اشتغلت على [[button]] زي [[p]]: الـ selector مش مربوط بنوع عنصر.
- بعد ما الماوس خرج، [[style=""]]: الـ [[null]] شالت اللون.

(المتصفح بيكتب أسامي الـ attributes small، عشان كده [[apphighlight]].)

### من غير import

عملنا component تاني فيه [[<p appHighlight>]] ومحطيناش [[Highlight]] في [[imports]]: الـ build عدّى من غير ولا تحذير، والماوس عدّى والخلفية فضلت [[rgba(0, 0, 0, 0)]]. الـ attribute اتساب كـ HTML عادي.

---

## ٥. الـ solCode: [[Autofocus]]

~~~text autofocus.ts
@Directive({ selector: '[appAutofocus]' })
export class Autofocus {
  private el = inject<ElementRef<HTMLInputElement>>(ElementRef);
  constructor() {
    afterNextRender(() => this.el.nativeElement.focus());
  }
}
~~~

| السطر | معناه |
|---|---|
| [[inject(ElementRef)]] | هات غلاف العنصر اللي الـ directive عليه |
| [[<ElementRef<HTMLInputElement>>]] | النوع: الغلاف ده جواه input، فـ TypeScript يعرف إن فيه [[focus()]] |
| [[afterNextRender(() => ...)]] | نفّذ ده مرة بعد ما Angular يرسم الصفحة، لأن الـ focus على عنصر لسه مش في الصفحة مبيشتغلش. ومش بيشتغل على السيرفر في SSR |
| [[this.el.nativeElement]] | عنصر الـ DOM الحقيقي |

~~~text الناتج (Chrome)
focused: <input appautofocus="" placeholder="دوّر...">
~~~

[[document.activeElement]] (العنصر اللي عليه الـ focus) طلع الـ input بتاعنا.

---

## الخلاصة

| الحاجة | الشكل |
|---|---|
| directive | [[@Directive({ selector: '[appX]' })]] بالأقواس المربعة |
| حدث على العنصر | [[host: { '(mouseenter)': 'f()' }]] |
| خاصية على العنصر | [[host: { '[style.color]': 'expr' }]] |
| قيمة من الـ attribute نفسه | [[input('', { alias: 'appX' })]] |
| العنصر نفسه | [[inject(ElementRef)]] جوه [[afterNextRender]] |
| نسيت الـ import | مفيش خطأ، ومفيش تأثير |`,
          lines: [
            "المطلوب من core.",
            "directive مش component: مفيش template.",
            "بتشتغل على أي عنصر عليه attribute اسمه appHighlight.",
            "روابط على العنصر نفسه.",
            "الماوس دخل.",
            "الماوس خرج.",
            "لون الخلفية لو الماوس فوقه، وإلا مفيش.",
            "قفلة الـ host.",
            "قفلة الـ decorator.",
            "الكلاس.",
            "قيمة الـ attribute نفسه هي اللون.",
            "حالة الـ hover.",
            "قفلة."
          ],
          sol: R`الـ [[p]] الأول بيبقى أصفر لما الماوس يعدّي، والتاني أزرق فاتح، وبيرجعوا لما الماوس يخرج. بتشتغل على أي عنصر لأن الـ selector attribute مش tag. لو مفيش أي تأثير، اتأكد إن [[Highlight]] في [[imports]]: Angular مش هيطلّع خطأ لو نسيته.

الـ autofocus:`,
          solCode: R`import { Directive, ElementRef, afterNextRender, inject } from '@angular/core';
@Directive({ selector: '[appAutofocus]' })
export class Autofocus {
  private el = inject<ElementRef<HTMLInputElement>>(ElementRef);
  constructor() {
    afterNextRender(() => this.el.nativeElement.focus());
  }
}
// <input appAutofocus placeholder="دوّر..." />`
        }
      ]
    },
    {
      t: "الـ routing",
      l: 2,
      n: "صفحات بـ provideRouter، وتحميل lazy، و params كـ inputs، و guards و resolvers كـ functions",
      items: [
        {
          cmd: "provideRouter و routerLink",
          title: "تعمل صفحات وتتنقل بينها من غير reload",
          desc: R`الراوتر جزء من Angular نفسه ([[@angular/router]]). بتعرّف الصفحات في array اسمها [[routes]]: كل route فيه [[path]] و [[component]]، وبتسجّلها بـ [[provideRouter(routes)]] في [[app.config.ts]].

في الـ template: [[<router-outlet />]] المكان اللي الصفحة بتترسم فيه، و [[routerLink="/products"]] لينك بيتنقل من غير reload، و [[routerLinkActive="active"]] بيحط class على اللينك الحالي. ومن الكود: [[inject(Router).navigate(['/products'])]].

ده زي React Router في «تاب React»، بس جاي مع الـ framework.`,
          example: R`export const routes: Routes = [
  { path: '', component: Home, title: 'الرئيسية' },
  { path: 'products', component: ProductList, title: 'المنتجات' },
  { path: 'products/:id', component: ProductDetails },
  { path: 'old-shop', redirectTo: 'products' },
  { path: '**', component: NotFound },
];
// app.config.ts
providers: [provideRouter(routes, withComponentInputBinding())]
// app.html
<nav>
  <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">الرئيسية</a>
  <a routerLink="/products" routerLinkActive="active">المنتجات</a>
</nav>
<router-outlet />`,
          try: R`اعمل ٣ components ([[Home]] و [[ProductList]] و [[NotFound]]) وحط الـ routes دي. اتنقل بين اللينكات وشوف عنوان التاب في المتصفح. افتح [[/old-shop]] و [[/xyz]]. وبعدين بدّل ترتيب [[**]] وخليه أول route وشوف إيه اللي حصل.`,
          flag: "script",
          deep: {
            why: "تطبيق فيه صفحات كتير محتاج URL لكل صفحة: المستخدم يعمل refresh أو bookmark أو يبعت لينك ويرجع لنفس المكان، وزرار back يشتغل. الراوتر بيربط الـ URL بالـ component من غير ما الصفحة تعمل reload كامل، فالتطبيق يفضل سريع والـ state محفوظ.",
            how: R`الراوتر بيقرا الـ URL ويدوّر في [[routes]] بالترتيب، وأول واحد يطابق بيكسب. عشان كده [[**]] (أي حاجة) لازم يبقى آخر واحد. [[:id]] جزء متغير. و [[redirectTo]] بيحوّل، ومع path فاضي لازم [[pathMatch: 'full']] وإلا كل URL هيطابقه.

[[routerLink]] بيعمل [[<a href>]] حقيقي (فـ ctrl+click يفتح tab جديد) بس بيمنع الـ reload ويستخدم History API ([[pushState]]، فيه درس في «تاب JavaScript»). [[title]] بيغيّر عنوان التاب.

[[routerLinkActive]] بيطابق بالبداية: [[/]] يطابق كل حاجة، عشان كده [[exact: true]] على لينك الرئيسية.

والـ SPA محتاجة السيرفر يرجّع [[index.html]] لأي مسار، وإلا refresh على [[/products]] يطلع 404. [[ng serve]] بيعمل ده، وفي الإنتاج بتظبطه في Nginx (المستوى ٣).`,
            when: "أي تطبيق فيه أكتر من شاشة. ومع كل route جديد فكّر: هل محتاج lazy loading (الدرس الجاي)؟ غالبًا أيوه لأي حاجة مش الصفحة الرئيسية.",
            mistakes: R`[[<a href="/products">]] بدل [[routerLink]]: شغال بس بيعمل reload كامل وبيضيّع الـ state. و [[**]] في الأول فكل الصفحات تبقى NotFound. وتنسى [[RouterLink]] و [[RouterOutlet]] في imports الـ component. و [[{ path: '', redirectTo: 'home' }]] من غير [[pathMatch: 'full']]: خطأ NG04014 أو loop.`
          },
          teach: R`## الفكرة: جدول «URL ده يعرض component ده»، ومكان في الصفحة يتعرض فيه

المثال ٣ ملفات: [[app.routes.ts]] (الجدول)، و [[app.config.ts]] (تسجيل الراوتر)، و [[app.html]] (اللينكات والمكان). اتعمل بالظبط في مشروع Angular 22.2 بأربع components صغيرة ([[Home]] و [[ProductList]] و [[ProductDetails]] و [[NotFound]])، واتفحص في Chrome.

---

## ١. الجدول: [[routes]]

~~~text app.routes.ts
export const routes: Routes = [
  { path: '', component: Home, title: 'الرئيسية' },
  { path: 'products', component: ProductList, title: 'المنتجات' },
  { path: 'products/:id', component: ProductDetails },
  { path: 'old-shop', redirectTo: 'products' },
  { path: '**', component: NotFound },
];
~~~

[[Routes]] نوع من [[@angular/router]]: array من objects، كل واحد route.

| المفتاح | معناه |
|---|---|
| [[path: '']] | المسار الفاضي = [[/]]، الصفحة الرئيسية. ومن غير [[/]] في الأول |
| [[component: Home]] | الـ component اللي يترسم |
| [[title: 'الرئيسية']] | عنوان تاب المتصفح |
| [[path: 'products/:id']] | [[:]] قبل اسم = جزء متغير. [[/products/5]] و [[/products/abc]] الاتنين بيطابقوا، والقيمة اسمها [[id]] |
| [[redirectTo: 'products']] | متعرضش حاجة، حوّل لمسار تاني |
| [[path: '**']] | أي حاجة. لازم آخر واحد |

---

## ٢. التسجيل: [[provideRouter]]

~~~text app.config.ts
providers: [provideRouter(routes, withComponentInputBinding())]
~~~

- [[providers]] في [[app.config.ts]] هي الخدمات اللي التطبيق كله بيستخدمها، و [[provideRouter(routes)]] بتضيف الراوتر بالجدول بتاعنا.
- [[withComponentInputBinding()]] ميزة إضافية: [[:id]] توصل للصفحة كـ input اسمه [[id]] (درس route params). وبيها [[ProductDetails]] عندنا عرضت «منتج 5».

---

## ٣. اللينكات والمكان: [[app.html]]

~~~text app.html
<nav>
  <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">الرئيسية</a>
  <a routerLink="/products" routerLinkActive="active">المنتجات</a>
</nav>
<router-outlet />
~~~

| الحتة | معناها |
|---|---|
| [[routerLink="/products"]] | لينك بيتنقل جوه التطبيق من غير reload |
| [[routerLinkActive="active"]] | حط class [[active]] على اللينك لما الـ URL يطابقه |
| [[[routerLinkActiveOptions]="{ exact: true }"]] | طابق الـ URL كله بالظبط، مش بدايته |
| [[<router-outlet />]] | هنا الصفحة الحالية بتترسم |

والـ component اللي فيه الـ template ده لازم يعمل import لـ [[RouterLink]] و [[RouterLinkActive]] و [[RouterOutlet]].

---

## ٤. الناتج في Chrome

~~~text الناتج
open /         | url: /           | title: الرئيسية | h2: الرئيسية
  <a href="/" class="active">الرئيسية</a> <a href="/products">المنتجات</a>
click المنتجات | url: /products   | title: المنتجات | h2: المنتجات
  <a href="/" class="">الرئيسية</a> <a href="/products" class="active">المنتجات</a>
/products/5    | url: /products/5 | h2: منتج 5
  <a href="/">الرئيسية</a> <a href="/products" class="active">المنتجات</a>
/old-shop      | url: /products   | title: المنتجات | h2: المنتجات
/xyz           | url: /xyz        | h2: الصفحة مش موجودة
~~~

(اختصرنا الـ attributes من اللينكات.)

- [[routerLink]] حط [[href]] حقيقي، فـ ctrl+click بيفتح تاب جديد عادي.
- في [[/products/5]] لينك المنتجات لسه [[active]]: [[routerLinkActive]] بيطابق بالبداية، و [[/products/5]] بادئة بـ [[/products]].
- ولينك الرئيسية مش active في [[/products]] بسبب [[exact: true]]. من غيرها كان هيبقى active في كل الصفحات لأن كل URL بيبدأ بـ [[/]].
- [[/old-shop]] الـ URL نفسه اتغير لـ [[/products]].
- [[/xyz]] مطابقش أي حاجة غير [[**]].

### مفيش reload فعلًا؟

عدّينا طلبات الـ document (الصفحة الكاملة) اللي المتصفح عملها:

~~~text الناتج
docs after first load: 1
after click products: docs = 1
after click home: docs = 1
~~~

طلب واحد بس في الأول، والضغطات مطلبتش صفحة جديدة: الراوتر غيّر الـ URL بـ History API ورسم الـ component.

---

## ٥. [[**]] في الأول

نقلنا [[{ path: '**', component: NotFound }]] لأول الجدول:

~~~text الناتج
docs after first load: 2 | h2: الصفحة مش موجودة
after click products: docs = 2 | h2: الصفحة مش موجودة
/products h2: الصفحة مش موجودة
~~~

كل حاجة بقت NotFound: الراوتر بيمشي على الجدول بالترتيب وبيقف عند **أول** route يطابق، و [[**]] بيطابق أي حاجة.

---

## ٦. [[redirectTo]] من غير [[pathMatch]]

زوّدنا [[{ path: '', redirectTo: 'home' }]]. الـ build عدّى، والصفحة طلعت فاضية وفي الـ console:

~~~text الـ Console
ERROR RuntimeError: NG04014: Invalid configuration of route '{path: "", redirectTo: "home"}': please provide 'pathMatch'. The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'.
~~~

[[path: '']] بالـ prefix بيطابق بداية أي URL (كل URL بيبدأ بـ «لا حاجة»)، فالراوتر بيرفضه. الصح: [[{ path: '', redirectTo: 'home', pathMatch: 'full' }]].

---

## الخلاصة

| الحاجة | الشكل |
|---|---|
| صفحة | [[{ path: 'products', component: ProductList, title: '...' }]] |
| جزء متغير | [[products/:id]] |
| تحويل | [[redirectTo]]، ومع [[path: '']] لازم [[pathMatch: 'full']] |
| 404 | [[{ path: '**', component: NotFound }]] آخر واحد |
| تسجيل | [[provideRouter(routes)]] في [[app.config.ts]] |
| لينك | [[routerLink="/x"]]، و [[routerLinkActive]] للـ class |
| مكان الصفحة | [[<router-outlet />]] |`,
          lines: [
            R`array الصفحات، نوعها [[Routes]].`,
            R`المسار الفاضي = الصفحة الرئيسية، و [[title]] عنوان التاب.`,
            "صفحة المنتجات.",
            R`[[:id]] جزء متغير: [[/products/5]] و [[/products/abc]].`,
            "مسار قديم بيتحوّل للجديد.",
            "أي حاجة تانية: صفحة 404. لازم آخر واحد.",
            "قفلة.",
            R`بتسجّل الراوتر، و [[withComponentInputBinding]] بتخلي الـ params توصل كـ inputs (بعد درسين).`,
            "القايمة.",
            R`لينك الرئيسية: [[exact]] عشان متبقاش active في كل الصفحات.`,
            R`لينك المنتجات، بياخد class [[active]] لما تكون فيها أو في [[/products/5]].`,
            "قفلة.",
            "هنا الصفحة الحالية بتترسم."
          ],
          sol: R`اللينكات بتتنقل من غير ما الصفحة تعمل reload (مفيش وميض، والـ Network مفيهوش طلب index.html جديد)، وعنوان التاب بيبقى «الرئيسية» أو «المنتجات». [[/old-shop]] بيتحوّل لـ [[/products]] والـ URL نفسه بيتغير. [[/xyz]] بيعرض NotFound.

لما تحط [[**]] أول واحد: كل الصفحات بقت NotFound، حتى الرئيسية، لأن الراوتر بيقف عند أول تطابق. رجّعه آخر واحد.`
        },
        {
          cmd: "lazy routes",
          title: "تحمّل الصفحة وقت ما المستخدم يروحلها بـ loadComponent و loadChildren",
          desc: R`بدل [[component: About]]، اكتب [[loadComponent: () => import('./about/about').then(m => m.About)]]: الصفحة بتتقسم في ملف JS لوحدها، ومش بتتحمّل غير لما حد يفتحها.

ولقسم كامل (لوحة أدمن فيها ١٠ صفحات): [[loadChildren: () => import('./admin/admin.routes').then(m => m.adminRoutes)]]، والملف ده فيه [[Routes]] تانية.

ولو الـ component عامل [[export default]]، تقدر تختصر [[loadComponent: () => import('./about/about')]].`,
          example: R`export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', loadComponent: () => import('./about/about').then((m) => m.About) },
  { path: 'cart', loadComponent: () => import('./cart/cart-page') },
  {
    path: 'admin',
    canMatch: [adminMatch],
    loadChildren: () => import('./admin/admin.routes').then((m) => m.adminRoutes),
  },
];
// admin/admin.routes.ts
export const adminRoutes: Routes = [
  { path: '', component: Dashboard },
  { path: 'orders', loadComponent: () => import('./orders/orders').then((m) => m.Orders) },
];`,
          try: R`حوّل صفحتين من routes الدرس اللي فات لـ lazy. اعمل [[ng build]] وقارن جدول «Initial chunk files» و «Lazy chunk files» قبل وبعد. وفي [[ng serve]] افتح Network (فلتر JS) واتنقل للصفحة: إمتى الـ chunk بيتحمّل؟`,
          flag: "script",
          deep: {
            why: R`كل صفحة بتضيفها بتكبّر الـ bundle الأساسي، والمستخدم اللي فاتح الرئيسية بيحمّل كود لوحة الأدمن اللي عمره ما هيفتحها. في تطبيق enterprise فيه ٥٠ شاشة، الفرق بين أول تحميل ٢ ميجا و ٣٠٠ كيلو. والـ lazy loading كمان بيعزل الأقسام: فريق الأدمن يشتغل في [[admin/]] من غير ما يلمس الباقي.`,
            how: R`[[import()]] دي dynamic import من JS نفسها ([[dynamic import()]] في «تاب JavaScript»). الـ bundler (esbuild) بيشوفها ويعمل chunk منفصل لكل واحدة. الراوتر بيناديها أول ما route يطابق، ويستنى الـ Promise، وبعدين يرسم.

[[loadChildren]] بيحمّل array routes كاملة، ودي بتتدمج تحت [[admin/]]. وممكن تحط [[providers]] على الـ route نفسه، فتتعمل injector خاص بالقسم ده (سؤال DI في الانترفيو).

الراوتر ممكن يحمّل بدري: [[withPreloading(PreloadAllModules)]] في [[provideRouter]] بيحمّل كل الـ lazy routes في الخلفية بعد ما التطبيق يفتح.

[[canMatch]] (درس الـ guards) بيتفحص قبل التحميل، فلو المستخدم مش أدمن، كود الأدمن مش بيتحمّل أصلًا. [[canActivate]] بيتفحص بعد التحميل.

وفيه migration جاهز: [[ng g @angular/core:route-lazy-loading]] بيحوّل الـ routes الـ eager لـ lazy.`,
            when: "كل route ما عدا الرئيسية والصفحات اللي الكل بيفتحها في أول ثانية. وأي قسم كبير (أدمن، إعدادات، تقارير) بـ loadChildren.",
            mistakes: R`تعمل lazy route وفي نفس الوقت تستورد الـ component عادي في ملف تاني (زي [[import { About }]] في app.ts عشان تستخدمه في حتة): الـ bundler بيضمّه في الأساسي والـ lazy بقى ملوش لازمة. وتكتب [[import('./about/about.ts')]] بالامتداد. وتستخدم [[canActivate]] بدل [[canMatch]] للحماية من تحميل الكود: canActivate بيمنع الدخول بس الكود اتحمّل.`
          },
          teach: R`## الفكرة: بدل «الصفحة دي هي About»، «لما حد يروح هنا، روح هات About»

الفرق كله في كلمة: [[component:]] بتشاور على كلاس موجود في الـ bundle، و [[loadComponent:]] بتشاور على **دالة** بتجيب الملف وقت الحاجة. اتعمل المثال بالظبط في Angular 22.2 بـ components صغيرة، واتقارن [[ng build]] قبل وبعد، واتفحص التحميل في Chrome مع [[ng serve --no-hmr]].

---

## ١. [[loadComponent]] مع [[then]]

~~~text app.routes.ts
{ path: 'about', loadComponent: () => import('./about/about').then((m) => m.About) },
~~~

من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[import('./about/about')]] | dynamic import: بيحمّل الملف وقت ما يتنادى، وبيرجّع Promise. والمسار من غير [[.ts]] |
| [[.then((m) => m.About)]] | لما يخلص: [[m]] هو الـ module كله (كل اللي متصدّر من الملف)، وإحنا عايزين [[About]] منه |
| [[() => ...]] | الكل جوه دالة، فمش بيتنفّذ دلوقتي. الراوتر بيناديها لما حد يروح [[/about]] |

---

## ٢. [[loadComponent]] من غير [[then]]

~~~text app.routes.ts
{ path: 'cart', loadComponent: () => import('./cart/cart-page') },
~~~

الملف عامل [[export default class CartPage]]. الراوتر لو لقى [[default]] في الـ module بياخده لوحده، فمش محتاج [[then]].

---

## ٣. [[loadChildren]]: قسم كامل

~~~text app.routes.ts
{
  path: 'admin',
  canMatch: [adminMatch],
  loadChildren: () => import('./admin/admin.routes').then((m) => m.adminRoutes),
},
~~~

~~~text admin/admin.routes.ts
export const adminRoutes: Routes = [
  { path: '', component: Dashboard },
  { path: 'orders', loadComponent: () => import('./orders/orders').then((m) => m.Orders) },
];
~~~

- [[loadChildren]] بيجيب **جدول routes** مش component، وبيحطه تحت [[admin/]]: فـ [['']] جواه = [[/admin]]، و [['orders']] = [[/admin/orders]].
- [[Dashboard]] eager جوه الملف ده، يعني بيتحمّل مع [[admin.routes]] نفسه. و [[Orders]] lazy جوه القسم اللي هو lazy أصلًا.
- [[canMatch: [adminMatch]]]: دالة بتتفحص **قبل** التحميل. في الـ lab خليناها [[() => localStorage.getItem('role') === 'admin']].

---

## ٤. [[ng build]] قبل وبعد

### قبل (كله [[component:]] و [[children:]])

~~~text الناتج
Initial chunk files | Names         |  Raw size | Estimated transfer size
chunk-6KI7XEV4.js   | -             | 120.45 kB |                36.09 kB
main-EBVUINZP.js    | main          | 100.67 kB |                25.20 kB

                    | Initial total | 221.12 kB |                61.28 kB

Lazy chunk files    | Names         |  Raw size | Estimated transfer size
chunk-2VYZOAAB.js   | orders        | 330 bytes |               330 bytes
~~~

### بعد (المثال)

~~~text الناتج
Initial chunk files | Names         |  Raw size | Estimated transfer size
main-SVMZ62GD.js    | main          | 221.29 kB |                59.66 kB

                    | Initial total | 221.29 kB |                59.66 kB

Lazy chunk files    | Names         |  Raw size | Estimated transfer size
chunk-DbOaGoMp.js   | admin-routes  | 415 bytes |               415 bytes
chunk-g7F6wEtf.js   | about         | 364 bytes |               364 bytes
chunk-Cjmumw5H.js   | cart-page     | 296 bytes |               296 bytes
chunk-uuhEpRIE.js   | orders        | 296 bytes |               296 bytes
~~~

- كل [[import()]] بقى ملف في Lazy chunk files، واسمه من اسم الملف.
- الـ Initial total تقريبًا هو هو: الصفحات هنا سطر HTML واحد (أقل من نص كيلو)، فاللي اتنقل صغير. في مشروع حقيقي الصفحة فيها مئات السطور ومكتبات، والفرق بيبقى كبير.

---

## ٥. في Chrome: إمتى بيتحمّل؟

~~~text الناتج (Chrome، ng serve --no-hmr)
+876ms home loaded
  +900ms request chunk-YBJ2MGC5.js            ← دوسنا «عن المحل»
+1314ms h2: عن المحل
+2091ms about again, h2: عن المحل             ← مفيش request تاني
+2529ms /admin (no role), h2: الصفحة مش موجودة   ← ولا request
  +2869ms request chunk-LV2IRFJM.js           ← بعد role=admin
+3276ms /admin (admin), h2: لوحة الأدمن
  +3289ms request chunk-KNVPG4AF.js
+3698ms /admin/orders, h2: الطلبات
~~~

| اللي حصل | ليه |
|---|---|
| الرئيسية فتحت من غير chunk | about لسه محدش طلبها |
| الضغطة طلبت الـ chunk | الراوتر نادى الدالة |
| المرة التانية مفيش طلب | الـ module اتحمّل مرة وخلاص |
| [[/admin]] من غير role = NotFound ومفيش طلب | [[canMatch]] رجّعت false قبل التحميل، فالراوتر كمّل للـ [[**]] |
| مع role = admin | الـ chunk بتاع [[admin-routes]] اتحمّل، وبعده [[orders]] لما رحنا لها |

---

## ٦. الغلطة: import عادي في حتة تانية

زوّدنا [[import { About } from './about/about';]] في [[app.ts]] واستخدمناه في خاصية، و [[ng build]]:

~~~text الناتج
chunk-CRw_mPh2.js   | about         |  58 bytes |                58 bytes
~~~

الـ chunk لسه موجود بس 58 bytes بس: الـ component نفسه اتنقل لـ [[main]] لأنه مطلوب من البداية، والـ chunk بقى فاضي تقريبًا. الـ lazy بقى ملوش لازمة.

---

## الخلاصة

| الحاجة | الشكل |
|---|---|
| صفحة lazy | [[loadComponent: () => import('./x/x').then(m => m.X)]] |
| لو [[export default]] | [[loadComponent: () => import('./x/x')]] |
| قسم lazy | [[loadChildren: () => import('./admin/admin.routes').then(m => m.adminRoutes)]] |
| تمنع التحميل نفسه | [[canMatch]] (مش [[canActivate]]) |
| اتأكد | «Lazy chunk files» في [[ng build]]، ومفيش import عادي للصفحة في أي حتة |`,
          lines: [
            "الـ routes.",
            "الرئيسية eager: جوه الـ bundle الأساسي.",
            R`[[About]] في chunk لوحده، بيتحمّل لما حد يروح [[/about]].`,
            R`نفس الكلام، بس الملف فيه [[export default]] فمش محتاج [[then]].`,
            "قسم كامل.",
            "المسار.",
            "بيتفحص قبل ما الكود يتحمّل (درس الـ guards).",
            R`بيحمّل routes تانية وبيحطها تحت [[/admin]].`,
            "قفلة.",
            "قفلة.",
            R`ملف القسم: routes عادية بتتصدّر باسم.`,
            R`[[/admin]] نفسه.`,
            R`[[/admin/orders]]، وlazy هو كمان جوه القسم.`,
            "قفلة."
          ],
          sol: R`قبل: كل الصفحات في «Initial chunk files» ومفيش «Lazy chunk files». بعد: فيه سطر لكل صفحة بقت lazy، واسمه من اسم الملف، زي [[chunk-XXXX.js | admin-routes | 397 bytes]] (ده ناتج حقيقي من الـ lab)، والـ initial total بيقل بحجم كود الصفحات اللي اتنقلت. لو صفحاتك لسه صغيرة (سطر HTML واحد) الفرق مش هيبان: في الـ lab الـ initial فضل حوالي 221 kB قبل وبعد، لأن كل صفحة كانت أقل من نص كيلو، والراوتر زوّد كود التحميل الـ lazy.

في Network: الـ chunk مش بيتحمّل مع الصفحة الأولى، وبيتحمّل أول ما تدوس على اللينك. ولو رجعت للصفحة تاني، مش بيتحمّل تاني (الـ module اتخزن). لو لقيت الصفحة لسه في الـ initial، دوّر على import عادي ليها في أي ملف eager.`
        },
        {
          cmd: "route params",
          title: "تقرا :id و ?query من الـ URL كـ inputs",
          desc: R`مع [[withComponentInputBinding()]] في [[provideRouter]]، الراوتر بيحط params الـ URL في الـ inputs بتاعة الصفحة بنفس الاسم: [[/products/:id]] يوصل لـ [[id = input.required<string>()]]، و [[?tab=reviews]] يوصل لـ [[tab = input<string>()]]، وبيانات الـ resolver كمان.

ولأنها signals، تقدر تبني عليها [[computed]] أو [[httpResource]] وهيتحدّثوا لوحدهم لما تتنقل من [[/products/5]] لـ [[/products/6]].

الطريقة القديمة ([[inject(ActivatedRoute).paramMap]] وهو Observable) لسه شغالة، وهتلاقيها في كل مشروع قديم.`,
          example: R`@Component({
  selector: 'app-details',
  imports: [RouterLink],
  template: $__bt
    <h1>منتج رقم {{ id() }} - تاب {{ tab() ?? 'specs' }}</h1>
    <a [routerLink]="['/products', nextId()]" [queryParams]="{ tab: 'reviews' }">اللي بعده</a>
    <button (click)="back()">رجوع للقايمة</button>
  $__bt,
})
export class Details {
  id = input.required<string>();
  tab = input<string>();
  nextId = computed(() => Number(this.id()) + 1);
  private router = inject(Router);
  back() { this.router.navigate(['/products'], { queryParams: { from: this.id() } }); }
}
// الطريقة القديمة: inject(ActivatedRoute).paramMap.pipe(map(p => p.get('id')))`,
          try: R`حط الصفحة على [[products/:id]] وافتح [[/products/5?tab=specs]]. دوس «اللي بعده» كذا مرة: الـ component بيتعمل من جديد ولا نفسه بيتحدّث؟ (حط [[console.log]] في الـ constructor). وبعدين شيل [[withComponentInputBinding()]] وشوف إيه اللي بيحصل.`,
          flag: "script",
          deep: {
            why: R`صفحة التفاصيل محتاجة تعرف هي بتعرض أنهي منتج، والفلاتر والترتيب والتاب المفتوح أحسن يبقوا في الـ URL عشان الـ refresh والـ share يرجّعوا نفس الشاشة. قبل الـ input binding كان لازم تكتب [[subscribe]] على [[paramMap]] وتنسى تعمل unsubscribe. دلوقتي هي inputs عادية.`,
            how: R`الراوتر لما يتنقل لنفس الـ route بـ params مختلفة ([[/products/5]] لـ [[/products/6]]) بيعيد استخدام نفس الـ component instance افتراضيًا ومبيعملوش من جديد. عشان كده لازم تتعامل مع الـ id كقيمة بتتغير (signal أو Observable)، مش تقراه مرة في الـ constructor وخلاص.

الـ params دايمًا strings، فـ [[Number(this.id())]] لو محتاج رقم. أو [[input.required({ transform: numberAttribute })]].

الأولوية لو نفس الاسم موجود في أكتر من مصدر: بيانات الـ resolver، وبعدين الـ path params، وبعدين الـ query params (الراوتر بيدمج query وبعدين path وبعدين data، فاللي بيتدمج آخر، الـ resolver، هو اللي بيكسب. والأحسن متكررش الاسم).

[[navigate(['/products', 6])]] بياخد array أجزاء. و [[navigateByUrl('/products/6?x=1')]] بياخد string كامل. و [[queryParamsHandling: 'merge']] بيحافظ على الـ query params الموجودة.`,
            when: "أي صفحة تفاصيل، وأي فلتر أو sort أو pagination أو tab عايز المستخدم يقدر يشاركه أو يرجعله بالـ back.",
            mistakes: R`تقرا [[this.route.snapshot.paramMap.get('id')]] مرة في [[ngOnInit]]: لما تتنقل من منتج لمنتج من نفس الصفحة، الـ component نفسه بيفضل والـ id القديم بيفضل. وتنسى إن الـ id string فتعمل [[id() + 1]] فتطلع [["51"]]. وتنسى [[withComponentInputBinding()]] فالـ inputs تفضل undefined، والـ required منهم يطلع NG0950 وقت التشغيل.`
          },
          teach: R`## الفكرة: الـ URL بقى مصدر inputs للصفحة

في [[/products/5?tab=specs]] فيه حتتين بيانات: [[5]] (path param، مكانه [[:id]] في الـ route) و [[tab=specs]] (query param، بعد [[?]]). مع [[withComponentInputBinding()]] الراوتر بيحطهم في inputs بنفس الاسم. المثال اتشغّل على [[{ path: 'products/:id', ... }]] في Angular 22.2، وزوّدنا [[console.log]] في الـ constructor زي التجربة، واتفحص في Chrome.

---

## ١. الـ template

~~~text details.ts
<h1>منتج رقم {{ id() }} - تاب {{ tab() ?? 'specs' }}</h1>
<a [routerLink]="['/products', nextId()]" [queryParams]="{ tab: 'reviews' }">اللي بعده</a>
<button (click)="back()">رجوع للقايمة</button>
~~~

| الحتة | معناها |
|---|---|
| [[tab() ?? 'specs']] | لو مفيش [[?tab=]] في الـ URL، [[tab()]] بـ [[undefined]]، فاكتب specs |
| [[[routerLink]="['/products', nextId()]"]] | لينك من array أجزاء: [[/products]] و [[6]] بيتلزقوا [[/products/6]] |
| [[[queryParams]="{ tab: 'reviews' }"]] | زوّد [[?tab=reviews]] |

---

## ٢. الكلاس

~~~text details.ts
id = input.required<string>();
tab = input<string>();
nextId = computed(() => Number(this.id()) + 1);
private router = inject(Router);
back() { this.router.navigate(['/products'], { queryParams: { from: this.id() } }); }
~~~

| السطر | معناه |
|---|---|
| [[id = input.required<string>()]] | من [[:id]]. إجباري لأن الـ route مش هيطابق من غيره. ونوعه string دايمًا: الـ URL نص |
| [[tab = input<string>()]] | من [[?tab=]]، اختياري |
| [[Number(this.id()) + 1]] | [[Number]] بيحوّل النص لرقم. من غيره [["5" + 1]] = [["51"]] (لزق نصوص مش جمع) |
| [[inject(Router)]] | الراوتر نفسه عشان نتنقل من الكود |
| [[navigate(['/products'], { queryParams: {...} })]] | روح [[/products?from=7]] |

---

## ٣. الناتج

~~~text الناتج (Chrome)
Details constructor
open   | url: /products/5?tab=specs   | h1: منتج رقم 5 - تاب specs   | href: /products/6?tab=reviews
next 1 | url: /products/6?tab=reviews | h1: منتج رقم 6 - تاب reviews | href: /products/7?tab=reviews
next 2 | url: /products/7?tab=reviews | h1: منتج رقم 7 - تاب reviews | href: /products/8?tab=reviews
back   | url: /products?from=7        | h2: المنتجات
~~~

- [[Details constructor]] اتطبعت **مرة واحدة** مع إننا اتنقلنا مرتين. الراوتر لما بيروح لنفس الـ route بـ params مختلفة بيستخدم نفس الـ component، وبيحدّث الـ inputs بس.
- عشان كده [[nextId]] لازم [[computed]]: اتحسبت تاني لوحدها مع كل [[id]] جديد، واللينك اتغير [[6]] ثم [[7]] ثم [[8]]. لو كنت حسبتها مرة في الـ constructor، كانت هتفضل 6.
- [[back()]] وداك [[/products?from=7]].

---

## ٤. من غير [[withComponentInputBinding()]]

شلناها من [[provideRouter]] وفتحنا نفس الـ URL:

~~~text الـ Console
Details constructor
ERROR RuntimeError: NG0950: Input "id" is required but no value is available yet.
~~~

الراوتر مبقاش بيحط حاجة في الـ inputs، و [[id]] required، فأول ما الـ template قراه وقع. والصفحة فضلت فاضية.

---

## ٥. الطريقة القديمة (في التعليق)

~~~text القديم
inject(ActivatedRoute).paramMap.pipe(map(p => p.get('id')))
~~~

[[ActivatedRoute]] معلومات الـ route الحالي، و [[paramMap]] Observable بيطلّع قيمة جديدة مع كل تغيير في الـ params، و [[map]] بيطلّع منه الـ id. نفس النتيجة، بس محتاج RxJS و subscribe (تاب RxJS في المستوى ٢).

---

## الخلاصة

| الحاجة | الشكل |
|---|---|
| تشغيلها | [[provideRouter(routes, withComponentInputBinding())]] |
| [[/products/:id]] | [[id = input.required<string>()]] |
| [[?tab=x]] | [[tab = input<string>()]] |
| رقم | [[Number(this.id())]]، الـ params نصوص |
| قيمة من الـ param | [[computed]]، لأن نفس الـ component بيتعاد استخدامه |
| تنقّل من الكود | [[router.navigate(['/products', 6], { queryParams })]] |`,
          lines: [
            "الـ decorator.",
            "الـ selector.",
            R`[[RouterLink]] عشان [[[routerLink]]] و [[[queryParams]]].`,
            "بداية الـ template.",
            R`[[id]] من الـ path و [[tab]] من الـ query، ولو مفيش tab نكتب specs.`,
            R`لينك بـ array أجزاء: [[/products/6?tab=reviews]].`,
            "تنقّل من الكود.",
            "قفلة الـ template.",
            "قفلة الـ decorator.",
            "الكلاس.",
            R`من [[:id]]. دايمًا string.`,
            R`من [[?tab=]]. ممكن متبقاش موجودة.`,
            R`محسوبة من الـ id، وبتتحدّث لما الـ URL يتغير.`,
            "الراوتر نفسه.",
            R`[[navigate]] بـ array أجزاء و query params.`,
            "قفلة."
          ],
          sol: R`في [[/products/5?tab=specs]] العنوان «منتج رقم 5 - تاب specs». لما تدوس «اللي بعده» العنوان بيبقى «منتج رقم 6 - تاب reviews» والـ [[console.log]] اللي في الـ constructor مش بيتطبع تاني: نفس الـ instance، والـ inputs بس اتحدّثت. ده اتجرّب في الـ lab بـ [[RouterTestingHarness]]: [[/products/5?tab=reviews]] طلّع «id من الرابط: 5 - tab: reviews».

من غير [[withComponentInputBinding()]]: [[id]] required ومحدش بيحطه، فالصفحة بتقع بـ [[NG0950: Input "id" is required but no value is available yet]] أول ما حاجة تقراه.`
        },
        {
          cmd: "guards",
          title: "تمنع صفحة عن اللي مش مسجّل دخول بـ canActivate و canMatch",
          desc: R`الـ guard دالة بترجّع [[true]] (ادخل) أو [[false]] (لأ) أو [[UrlTree]] (روح هنا بدالها، زي صفحة login). بتتحط على الـ route:

[[canActivate]]: قبل ما تدخل الصفحة. [[canMatch]]: قبل ما الـ route يتطابق أصلًا، فلو false الراوتر يكمّل يدوّر في اللي بعده، والـ lazy code مش بيتحمّل. [[canDeactivate]]: قبل ما تخرج (فيه تعديلات مش محفوظة؟). [[canActivateChild]]: على كل الأبناء.

الشكل الحديث functions من نوع [[CanActivateFn]] وجواها [[inject()]]. القديم classes بتعمل [[implements CanActivate]].`,
          example: R`export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);
  if (auth.isLoggedIn()) return true;
  return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};
export const adminMatch: CanMatchFn = () => inject(Auth).role() === 'admin';
export const unsavedGuard: CanDeactivateFn<{ dirty(): boolean }> = (c) =>
  !c.dirty() || confirm('فيه تعديلات مش محفوظة، تخرج؟');
// في الـ routes:
{ path: 'orders', component: Orders, canActivate: [authGuard] },
{ path: 'admin', canMatch: [adminMatch], loadChildren: () => import('./admin/admin.routes').then((m) => m.adminRoutes) },
{ path: 'profile/edit', component: EditProfile, canDeactivate: [unsavedGuard] },`,
          try: R`اعمل [[Auth]] service فيها [[token = signal<string | null>(null)]] و [[isLoggedIn = computed(...)]]. حط [[authGuard]] على صفحة وافتحها: هتروح فين والـ URL شكله إيه؟ بعدين في صفحة الـ login اعمل زرار بيحط token ويرجّعك للـ [[returnUrl]].`,
          flag: "script",
          deep: {
            why: R`صفحات كتير مش لأي حد: الطلبات للمسجّلين، ولوحة الأدمن للأدمن. لو كل صفحة بتفحص في [[ngOnInit]] وتعمل redirect، الصفحة هتظهر لحظة وبعدين تتحوّل، والكود هيتكرر. الـ guard بيفحص قبل التنقل خالص. ومهم جدًا: ده UX بس، مش أمان. الأمان الحقيقي في الـ API اللي بيرفض الطلب لو مفيش صلاحية.`,
            how: R`الراوتر بيشغّل الـ guards بالترتيب قبل ما يكمّل التنقل. الـ guard ممكن يرجّع قيمة مباشرة، أو Promise، أو Observable (أول قيمة هي اللي بتتاخد)، فتقدر تسأل السيرفر.

رجوع [[UrlTree]] أحسن من [[router.navigate()]] جوه الـ guard: الراوتر بيلغي التنقل الحالي ويبدأ واحد جديد بشكل نضيف. وفيه كمان [[new RedirectCommand(urlTree, { replaceUrl: true })]] لو محتاج خيارات للتنقل الجديد.

[[state.url]] الـ URL اللي المستخدم كان رايحه، فبتحطه في [[returnUrl]] عشان بعد الـ login ترجّعه.

الـ guards بتتنادى في injection context، فـ [[inject()]] شغالة جواها. وفي الشكل القديم كانت classes عليها [[@Injectable]] وبتعمل [[implements CanActivate]] وبتاخد dependencies من الـ constructor، ولسه هتلاقيها في مشاريع كتير.`,
            when: R`[[canActivate]] للـ login والصلاحيات العادية. [[canMatch]] لما عايز الـ route يبقى «مش موجود» لغير المسموح (الـ lazy code ميتحمّلش)، أو عايز route تاني بنفس الـ path يطابق بداله (نفس [[/dashboard]] لأدمن ولمستخدم). [[canDeactivate]] للفورمات الطويلة.`,
            mistakes: R`تعتبر الـ guard حماية: أي حد يقدر يفتح DevTools ويغيّر الـ signal أو يكلّم الـ API مباشرة. الـ API لازم يفحص الـ token والصلاحية. و [[router.navigate(['/login'])]] مع [[return false]] بدل [[return router.createUrlTree(...)]]. وتنسى إن [[canActivate]] مش بيمنع تحميل الـ lazy chunk.`
          },
          teach: R`## الفكرة: دالة بيسألها الراوتر «أكمّل ولا لأ؟» قبل التنقل

المثال ٣ guards من ٣ أنواع، وتحتهم الـ routes اللي بتستخدمهم. اتشغّل كله في Angular 22.2 مع [[Auth]] service بتاعة التجربة:

~~~text guards.ts
@Service()
export class Auth {
  token = signal<string | null>(null);
  role = signal<'user' | 'admin'>('user');
  isLoggedIn = computed(() => this.token() !== null);
}
~~~

و [[LoginPage]] بتاعة الـ solCode، واتفحص في Chrome.

---

## ١. [[authGuard]]: [[CanActivateFn]]

~~~text guards.ts
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);
  if (auth.isLoggedIn()) return true;
  return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};
~~~

| السطر | معناه |
|---|---|
| [[: CanActivateFn]] | نوع الدالة: بتاخد [[route]] (الـ route اللي رايحله) و [[state]] (فيه [[state.url]] الـ URL كله) |
| [[inject(Auth)]] | [[inject]] شغالة هنا لأن الراوتر بينادي الـ guard في injection context |
| [[return true]] | كمّل التنقل |
| [[router.createUrlTree(['/login'], ...)]] | بيبني URL ([[UrlTree]]) من غير ما يتنقل. لما الـ guard يرجّعه، الراوتر بيلغي التنقل الحالي ويروح ده بداله |
| [[queryParams: { returnUrl: state.url }]] | خلي الصفحة اللي كان رايحها في الـ URL، عشان نرجّعه بعد الـ login |

والـ route:

~~~text routes
{ path: 'orders', component: Orders, canActivate: [authGuard] },
~~~

[[canActivate]] array، فينفع تحط كذا guard، ولازم كلهم يوافقوا.

### الناتج

~~~text الناتج (Chrome)
open /orders   | url: /login?returnUrl=%2Forders | h2: دخول
click دخول     | url: /orders                    | h2: طلباتي
~~~

- فتحنا [[/orders]] من غير token، فلقينا نفسنا في [[/login]]. والـ [[/]] جوه الـ query بقت [[%2F]]: الـ URL encoding، لأن [[/]] ليها معنى في الـ URL.
- صفحة الـ login (الـ solCode) استلمت [[returnUrl]] كـ input بفضل [[withComponentInputBinding]]، وعملت [[token.set('demo-token')]] و [[navigateByUrl('/orders')]]، والـ guard المرة دي رجّع [[true]].

---

## ٢. [[adminMatch]]: [[CanMatchFn]]

~~~text guards.ts
export const adminMatch: CanMatchFn = () => inject(Auth).role() === 'admin';
~~~

دالة سطر واحد بترجّع [[true]] أو [[false]]. و [[canMatch]] بيتفحص قبل ما الراوتر يعتبر الـ route مطابق أصلًا:

~~~text routes
{ path: 'admin', canMatch: [adminMatch], loadChildren: () => import('./admin/admin.routes').then((m) => m.adminRoutes) },
~~~

~~~text الناتج (Chrome، role = 'user')
/admin as user | url: /admin | h2: الصفحة مش موجودة
~~~

الـ URL فضل [[/admin]]، بس الراوتر اعتبر الـ route مش موجود وكمّل يدوّر لحد [[**]]. ومفيش chunk أدمن اتحمّل (اتأكدنا من ده في درس lazy routes).

---

## ٣. [[unsavedGuard]]: [[CanDeactivateFn]]

~~~text guards.ts
export const unsavedGuard: CanDeactivateFn<{ dirty(): boolean }> = (c) =>
  !c.dirty() || confirm('فيه تعديلات مش محفوظة، تخرج؟');
~~~

- [[CanDeactivateFn<...>]] بيتنادى وانت **خارج** من الصفحة، وأول argument هو الـ component نفسه ([[c]]).
- [[<{ dirty(): boolean }>]] النوع: أي component فيه دالة [[dirty]] بترجّع boolean.
- [[!c.dirty() || confirm(...)]]: لو مفيش تعديلات ([[!]] = not) خلاص [[true]] ومتسألش (الـ [[||]] بيقف عند أول true). وإلا اعرض [[confirm]]، والنتيجة [[true]] لو المستخدم داس OK.

جرّبناها على صفحة فيها input، و [[dirty()]] بترجّع true لما حد يكتب:

~~~text الناتج (Chrome)
leave clean | url: /             | h2: الرئيسية
[dialog] confirm فيه تعديلات مش محفوظة، تخرج؟
leave dirty (OK)     | url: /              | h2: الرئيسية
leave dirty (Cancel) | url: /profile/edit  | h2: تعديل البروفايل
~~~

من غير كتابة خرجنا على طول. بعد الكتابة ظهر الـ confirm: OK خرّجنا، و Cancel خلّانا في الصفحة.

---

## ٤. ده UX مش أمان

الـ guard كود في المتصفح. أي حد يقدر يفتح DevTools ويغيّر الـ signal، أو يكلّم الـ API مباشرة من غير ما يفتح الصفحة أصلًا. الـ guard بيمنع المستخدم العادي يشوف صفحة مش ليه، والـ API هو اللي لازم يرفض الطلب.

---

## الخلاصة

| الـ guard | بيتفحص إمتى | false معناها |
|---|---|---|
| [[canActivate]] | قبل الدخول، بعد تحميل الكود | التنقل بيتلغي، أو [[UrlTree]] يحوّل |
| [[canMatch]] | قبل المطابقة والتحميل | الراوتر يكمّل للـ route اللي بعده |
| [[canDeactivate]] | قبل الخروج | تفضل في الصفحة |
| [[canActivateChild]] | قبل أي ابن | زي canActivate |
| تحويل لصفحة تانية | أي guard | [[return router.createUrlTree([...])]]، مش [[navigate]] + false |`,
          lines: [
            R`guard كـ function: بياخد الـ route والـ state (فيه الـ URL اللي رايحله).`,
            R`[[inject]] شغالة جوه الـ guard.`,
            "الراوتر عشان نعمل redirect.",
            "مسجّل؟ ادخل.",
            R`لأ؟ روح للـ login ومعاك الصفحة اللي كنت رايحها.`,
            "قفلة.",
            R`[[canMatch]]: لو مش أدمن، الـ route ده كأنه مش موجود.`,
            R`[[canDeactivate]] بياخد الـ component نفسه، فيقدر يسأله عنده تعديلات ولا لأ.`,
            "لو مفيش تعديلات اخرج، ولو فيه اسأل.",
            R`[[canActivate]] على صفحة.`,
            R`[[canMatch]] على قسم lazy: الكود مش هيتحمّل لغير الأدمن.`,
            R`[[canDeactivate]] على صفحة تعديل.`
          ],
          sol: R`من غير token، لما تفتح [[/orders]] (أو [[/secret]]) هتلاقي نفسك في [[/login?returnUrl=%2Forders]]. الـ [[/]] اتعملت encode لـ [[%2F]]. ده اللي طلع في الـ lab بالظبط: [[/login?returnUrl=%2Fsecret]]، وبعد ما حطينا token نفس الـ URL فتح الصفحة.

صفحة الـ login:`,
          solCode: R`@Component({
  selector: 'app-login-page',
  template: $__bt<button (click)="login()">دخول تجريبي</button>$__bt,
})
export class LoginPage {
  private auth = inject(Auth);
  private router = inject(Router);
  returnUrl = input<string>('/'); // من ?returnUrl= بفضل withComponentInputBinding
  login() {
    this.auth.token.set('demo-token');
    this.router.navigateByUrl(this.returnUrl());
  }
}`
        },
        {
          cmd: "resolvers",
          title: "تجيب بيانات الصفحة قبل ما تفتح بـ resolve",
          desc: R`الـ resolver دالة بتجيب بيانات قبل ما الراوتر يكمّل التنقل، والصفحة بتفتح والبيانات جاهزة. بتتحط في [[resolve: { product: productResolver }]] على الـ route، ومع [[withComponentInputBinding()]] بتوصل للصفحة كـ [[product = input.required<Product>()]].

الشكل الحديث [[ResolveFn<T>]] بـ [[inject()]] جواها، وبترجّع Observable أو Promise أو قيمة.

البديل إن الصفحة تفتح على طول وتجيب البيانات هي (بـ [[httpResource]] في درس HTTP) وتعرض loading. الاتنين صح، والفرق في تجربة المستخدم.`,
          example: R`export const productResolver: ResolveFn<Product> = (route) =>
  inject(ProductsApi).getOne(route.paramMap.get('id')!);
// الـ route:
{ path: 'products/:id', component: Details, resolve: { product: productResolver } }
// الصفحة:
export class Details {
  product = input.required<Product>();
}
// template: <h1>{{ product().name }}</h1>`,
          try: R`حط الـ resolver على صفحة التفاصيل وخلي الـ API بطيء (Network throttling على Slow 3G). دوس على منتج: إيه اللي بيحصل في الفترة دي؟ بعدين خلي الـ API يرجّع 404 وشوف إيه اللي بيحصل للتنقل.`,
          flag: "script",
          deep: {
            why: R`صفحات زي «تعديل منتج» ملهاش معنى من غير البيانات، ولو فتحت فاضية وبعدين اتملت، الفورم بتنط والمستخدم ممكن يبدأ يكتب في حقل فاضي. الـ resolver بيضمن إن لما الصفحة تفتح البيانات موجودة، فمفيش [[@if (loading)]] ولا [[?]] في كل حتة.`,
            how: R`الراوتر بيشغّل الـ guards الأول، وبعدين الـ resolvers، وبيستنى كلهم. لو Observable، بياخد أول قيمة ويكمّل. طول ما هو مستني، الصفحة القديمة فاضلة والـ URL لسه متغيرش، فلازم تعرض مؤشر تحميل عام: [[inject(Router).events]] فيه [[NavigationStart]] و [[NavigationEnd]]، أو ببساطة loading bar في الـ layout.

لو الـ resolver وقع بخطأ، التنقل بيتلغي والمستخدم بيفضل في الصفحة القديمة، وبيطلع [[NavigationError]]. عشان كده الأحسن تمسك الخطأ وترجّع [[RedirectCommand]] لصفحة 404، أو تستخدم [[withNavigationErrorHandler]].

والـ resolver بيشتغل تاني لما الـ params تتغير (من منتج لمنتج) افتراضيًا، ودي بتتظبط بـ [[runGuardsAndResolvers]].`,
            when: "صفحات تعديل، أو صفحات لازم تبقى كاملة من أول لحظة، أو لما عايز تحوّل لـ 404 قبل ما الصفحة تفتح. للـ dashboards والـ lists، الصفحة تفتح على طول وتعرض skeleton أحسن غالبًا: المستخدم بيحس إن الضغطة اشتغلت.",
            mistakes: R`API بطيء + resolver + مفيش loading indicator: المستخدم بيدوس ومفيش حاجة بتحصل، فيدوس تاني وتالت. و resolver بيرمي error فالتنقل يتلغي بصمت. وتستخدم resolver لكل صفحة فالتطبيق كله يبقى بطيء في الإحساس.`
          },
          teach: R`## الفكرة: الراوتر بيستنى البيانات، وبعدين يفتح الصفحة ومعاها

المثال ٤ حتت: الـ resolver، والـ route، والصفحة، والـ template. اتشغّل في Angular 22.2 مع [[ProductsApi]] service فيها [[getOne(id)]] بتعمل [[http.get<Product>('/api/products/' + id)]]. ومكان سيرفر حقيقي، عملنا interceptor بيرد على [[/api/products/5]] بعد ١٫٥ ثانية (زي نت بطيء)، وعلى أي id تاني بـ 404. واتفحص في Chrome.

---

## ١. الـ resolver

~~~text resolve.ts
export const productResolver: ResolveFn<Product> = (route) =>
  inject(ProductsApi).getOne(route.paramMap.get('id')!);
~~~

| الحتة | معناها |
|---|---|
| [[ResolveFn<Product>]] | نوع الدالة: بترجّع [[Product]]، أو Observable أو Promise بيطلّعوا [[Product]] |
| [[(route) =>]] | الـ route اللي رايحله، وفيه الـ params |
| [[route.paramMap.get('id')]] | قيمة [[:id]] من الـ URL، كنص. وممكن ترجّع [[null]] لو مفيش param بالاسم ده |
| [[!]] | (non-null assertion) بتقول لـ TypeScript «متأكد إنها مش null»، لأن الـ route فيه [[:id]] أكيد |
| [[inject(ProductsApi).getOne(...)]] | بيرجّع Observable من HttpClient. الراوتر بيعمل subscribe ويستنى أول قيمة |

---

## ٢. الـ route

~~~text routes
{ path: 'products/:id', component: Details, resolve: { product: productResolver } }
~~~

[[resolve]] object: المفتاح [[product]] هو اسم البيانات، والقيمة الـ resolver. ومع [[withComponentInputBinding()]] المفتاح ده بيبقى اسم الـ input.

---

## ٣. الصفحة

~~~text details.ts
export class Details {
  product = input.required<Product>();
}
// template: <h1>{{ product().name }}</h1>
~~~

[[input.required]] من غير قلق: الصفحة مش هتتعمل أصلًا غير لما البيانات تبقى موجودة. فمفيش [[@if (loading)]] ولا [[?.]].

---

## ٤. الناتج: API بطيء

كنا في [[/products]] ودوسنا لينك [[/products/5]] (في الـ lab المسار [[/r/5]]):

~~~text الناتج (Chrome)
+1388ms  on list        | url: /products | page: المنتجات
HTTP GET /api/products/5
+1552ms  after click 5  | url: /products | page: المنتجات
+2265ms  after click 5  | url: /products | page: المنتجات
+3282ms  after click 5  | url: /r/5      | page: قلم
~~~

- الطلب خرج أول ما دوسنا.
- لمدة ١٫٥ ثانية: الـ URL لسه [[/products]] والصفحة القديمة لسه ظاهرة. من ناحية المستخدم: «دوست ومفيش حاجة حصلت».
- لما الرد وصل: الـ URL اتغير والصفحة فتحت كاملة فيها «قلم».

عشان كده مع resolvers لازم مؤشر تحميل عام في الـ layout، بتشغّله من [[inject(Router).events]] ([[NavigationStart]] لحد [[NavigationEnd]]).

---

## ٥. الناتج: 404

~~~text الناتج (Chrome)
HTTP GET /api/products/99
ERROR HttpErrorResponse
+4479ms  after click 99 | url: /products | page: المنتجات
~~~

الـ resolver وقع، فالراوتر **لغى** التنقل: فضلنا في [[/products]]، والخطأ في الـ console، والمستخدم مش فاهم حاجة.

---

## ٦. الـ solCode: [[safeProductResolver]]

~~~text resolve.ts
export const safeProductResolver: ResolveFn<Product> = (route) => {
  const router = inject(Router);
  return inject(ProductsApi).getOne(route.paramMap.get('id')!).pipe(
    catchError(() => of(new RedirectCommand(router.parseUrl('/not-found')))),
  );
};
~~~

| الحتة | معناها |
|---|---|
| [[const router = inject(Router)]] | في أول الدالة، لأن جوه [[catchError]] احنا برا الـ injection context |
| [[.pipe(...)]] | بتعدّي الـ Observable على operators (تاب RxJS) |
| [[catchError(() => ...)]] | لو حصل خطأ، رجّع Observable تاني بداله |
| [[of(x)]] | Observable بيطلّع قيمة واحدة: [[x]] |
| [[router.parseUrl('/not-found')]] | بيحوّل النص لـ [[UrlTree]] |
| [[new RedirectCommand(...)]] | قيمة بتقول للراوتر «سيب التنقل ده وروح هنا» |

~~~text الناتج (Chrome)
HTTP GET /api/products/99
+5321ms  safe 99 | url: /not-found | page: الصفحة مش موجودة
~~~

مفيش خطأ في الـ console، والمستخدم وصل لصفحة بتفهّمه (هنا [[/not-found]] طابقت [[**]]).

---

## الخلاصة

| الحاجة | الشكل |
|---|---|
| resolver | [[ResolveFn<T> = (route) => inject(Api).get(...)]] |
| على الـ route | [[resolve: { product: productResolver }]] |
| في الصفحة | [[product = input.required<T>()]] مع [[withComponentInputBinding()]] |
| وهو مستني | الصفحة القديمة والـ URL القديم، فاعرض loading عام |
| لو وقع | التنقل بيتلغي، فامسكه بـ [[catchError]] و [[RedirectCommand]] |`,
          lines: [
            R`resolver بيرجّع [[Product]]، وبياخد الـ route عشان يقرا الـ id.`,
            R`بيطلب المنتج من الـ API. الـ [[!]] لأن الـ route فيه [[:id]] أكيد.`,
            R`[[resolve]] على الـ route: المفتاح [[product]] هو اسم الـ input.`,
            "الصفحة.",
            "البيانات وصلت كـ input جاهز، من غير loading.",
            "قفلة."
          ],
          sol: R`مع Slow 3G: بتدوس على المنتج ومفيش حاجة بتتغير لثواني، لا الصفحة ولا الـ URL، وبعدين الصفحة بتفتح كاملة. ده بالظبط ليه محتاج loading bar عام. في الـ lab، [[/products/5]] مع resolver طلب [[/api/products/5]] الأول، والصفحة اترسمت بعد الـ flush وفيها «قلم».

مع 404: التنقل بيتلغي وبتفضل في صفحة القايمة، وفي الـ console خطأ HttpErrorResponse. الحل: [[catchError]] في الـ resolver يرجّع [[of(new RedirectCommand(router.parseUrl('/not-found')))]]، والـ [[router]] يتعمل له inject في أول الـ resolver مش جوه catchError (برا injection context)، أو تسيب الصفحة تجيب بنفسها وتعرض رسالة:`,
          solCode: R`export const safeProductResolver: ResolveFn<Product> = (route) => {
  const router = inject(Router);
  return inject(ProductsApi).getOne(route.paramMap.get('id')!).pipe(
    catchError(() => of(new RedirectCommand(router.parseUrl('/not-found')))),
  );
};`
        }
      ]
    }
  ]
});
