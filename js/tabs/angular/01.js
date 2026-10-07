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
    }
  ]
});
