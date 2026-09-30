// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
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
            mistakes: R`تسطّب الـ CLI على Node قديم: [[ng]] بيرفض يشتغل ويقولك The Angular CLI requires a minimum Node.js version of v22.22.3 or v24.15.0. وتخلط AngularJS (النسخة 1.x القديمة خالص، JavaScript و [[$scope]]) بـ Angular: دول اتنين مختلفين تمامًا، ولو إعلان شغل مكتوب فيه AngularJS يبقى نظام قديم جدًا. وفي الانترفيو: «Angular framework ولا library؟» framework، وبيحدد الـ routing والـ DI والـ build.`
          },
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
            mistakes: R`تنسى تحط الـ component في [[imports]] بتاع الأب (NG8001). وتكتب [[{{ name }}]] على signal من غير قوسين: هيطبع الدالة نفسها أو يطلع خطأ، الصح [[{{ name() }}]]. وتتوقع إن CSS الـ component يأثر على component جوّاه: لأ، العزل بيمنعه. وفي كود قديم هتلاقي [[standalone: false]] أو components متعرفة في NgModule، وده الشكل القديم (المستوى ٣).`
          },
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

[[NG8001: 'app-hello' is not a known element]] ومعاه اقتراح: If 'app-hello' is an Angular component, then verify that it is included in the '@Component.imports' of this component. وكمان تحذير NG8113 لو سبت الـ import في الملف ومش مستخدم. الخطأ بيطلع في الـ build، مش بعد ما تفتح الصفحة، وده من فوايد الـ AOT compiler.`,
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
          try: R`اعمل component [[Reviews]] وحطه جوه @defer زي المثال. اعمل [[ng build]] وبص على جدول «Lazy chunk files»: فيه chunk جديد؟ وبعدين في [[ng serve]] افتح Network وانزل لتحت، وشوف إمتى الـ chunk بيتحمّل.`,
          deep: {
            why: R`الصفحة فيها حاجات تقيلة المستخدم ممكن ميوصلهاش: تقييمات تحت خالص، و chart، و editor، وخريطة. لو كلهم في الـ bundle الأساسي، أول تحميل بيبطأ عشان حاجات محدش شافها. @defer بيخلي الأساسي خفيف، والباقي ييجي وقت الحاجة. ده بيحسّن LCP و INP.`,
            how: R`الـ compiler بيشوف الـ components اللي جوه @defer، ولو شروطها اتحققت بيطلّعها في chunk لوحدها ويحط مكانها dynamic import. الشروط: تكون standalone، ومتكونش مستخدمة eager في أي حتة تانية في نفس الـ template، ومتعرّفة في ملف لوحدها. لو [[Reviews]] متعرّف في نفس ملف الـ component اللي بيستخدمه، أو مستخدم برا الـ @defer كمان، مش هيتقسم وهيتحمّل مع الصفحة عادي (من غير أي خطأ).

[[on viewport]] بيستخدم IntersectionObserver على الـ placeholder، فالـ [[@placeholder]] لازم يبقى فيه عنصر واحد. [[@loading (minimum 300ms)]] بيمنع وميض لو التحميل سريع، و [[after 100ms]] يأخر ظهوره.

وفيه [[prefetch on idle]]: حمّل الملف بدري بس متعرضوش غير على الشرط.

ومع SSR: المحتوى جوه @defer مش بيترندر على السيرفر (بيطلع الـ placeholder)، إلا مع incremental hydration بـ [[hydrate on viewport]] (المستوى ٣).`,
            when: "حاجات تقيلة أو تحت في الصفحة أو ورا تفاعل: تعليقات، و charts، و rich editors، و dialogs كبيرة، وخرايط. مش للحاجة اللي فوق في أول الشاشة (above the fold): هتعمل layout shift وتبطّأ الـ LCP.",
            mistakes: R`تحط @defer على component متعرّف في نفس الملف أو مستخدم برا كمان في نفس الـ template، فمبيتقسمش وتفتكر إنه شغال. اتأكد من «Lazy chunk files» في [[ng build]]. و [[on viewport]] مع placeholder فيه أكتر من عنصر أو فاضي: خطأ أو مش بيشتغل. و @defer على الـ hero أو العنوان الرئيسي: الصفحة بتنط. وتنسى إن محتواه مش بيتقرا في SSR فالـ SEO مش هيشوفه.`
          },
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

في Network: الـ chunk مش بيتحمّل مع الصفحة، وبيتحمّل أول ما «التقييمات هتظهر...» تدخل الشاشة، وبعدها «بيحمّل التقييمات...» لمدة ٣٠٠ms على الأقل، وبعدين التقييمات. لو الـ placeholder ظاهر من الأول (الصفحة قصيرة)، هيتحمّل على طول، وده سلوك صح.`
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
          try: R`حط [[Header]] فوق في [[App]]، وخلي زرار «أضف للسلة» في [[ProductCard]] (أو في App) ينادي [[inject(Cart).add(...)]]. شوف الهيدر بيتحدّث مع إن مفيش input بينهم. بعدين غيّر [[@Service()]] لـ [[@Injectable({ providedIn: 'root' })]] وتأكد إن مفيش فرق.`,
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

بعد ما تبدّل لـ [[@Injectable({ providedIn: 'root' })]] (ومتنساش [[import { Injectable }]]) السلوك نفسه بالظبط. الفرق هيبان بس لو حاولت [[constructor(private http: HttpClient)]]: مع [[@Service()]] مش مدعوم، ومع [[@Injectable]] شغال.`
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
// {{ order.createdAt | timeAgo }}  ← «قبل ٥ دقائق» أو «أمس»`
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
          sol: R`قبل: كل الصفحات في «Initial chunk files» ومفيش «Lazy chunk files». بعد: فيه سطر لكل صفحة بقت lazy، واسمه من اسم الملف، زي [[chunk-XXXX.js | admin-routes | 397 bytes]] (ده ناتج حقيقي من الـ lab)، والـ initial total قلّ.

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
    },
    {
      t: "HTTP",
      l: 2,
      n: "HttpClient بأنواع، و interceptors للـ token والأخطاء، و httpResource للبيانات كـ signals",
      items: [
        {
          cmd: "HttpClient",
          title: "تكلّم API بـ HttpClient من service",
          desc: R`[[HttpClient]] من [[@angular/common/http]] هو الطريقة الرسمية تكلّم API: [[get<T>]] و [[post<T>]] و [[put]] و [[patch]] و [[delete]]. بيحوّل JSON لوحده، وبيرمي error لو الـ status مش 2xx (على عكس [[fetch]] العادي).

وبيرجّع Observable، مش Promise: الطلب مش بيتبعت غير لما حد يعمل [[subscribe]] (أو [[async]] pipe أو [[toSignal]] أو [[firstValueFrom]]).

في Angular 22 مش محتاج تسجّله: [[HttpClient]] متاح في الـ root افتراضيًا، وبيستخدم [[fetch]] من جوه. بتحتاج [[provideHttpClient(...)]] بس لو هتضيف interceptors أو إعدادات.`,
          example: R`@Service()
export class ProductsApi {
  private http = inject(HttpClient);
  private base = '/api/products';
  list(q = '') { return this.http.get<Product[]>(this.base, { params: { q } }); }
  getOne(id: string) { return this.http.get<Product>($__bt$__{this.base}/$__{id}$__bt); }
  create(body: Omit<Product, 'id'>) { return this.http.post<Product>(this.base, body); }
  remove(id: number) { return this.http.delete<void>($__bt$__{this.base}/$__{id}$__bt); }
}
// في component:
products = toSignal(inject(ProductsApi).list(), { initialValue: [] });`,
          try: R`اعمل الـ service ونادي [[list()]] من component بـ [[toSignal]]، واعرضهم بـ @for. استخدم أي API تجريبي (أو [[proxy.conf.json]] لـ backend عندك). بعدين نادي [[api.create({...})]] من غير subscribe، وبص في Network: الطلب اتبعت؟`,
          flag: "script",
          deep: {
            why: R`كل تطبيق بيكلّم API. لو كل component بيعمل fetch بنفسه، الـ URLs والـ headers والتحويل للـ JSON والأخطاء هتتكرر في كل مكان. الـ service بتجمع كل endpoints المورد ده في مكان واحد وبأنواع، والـ component بيطلب [[api.list()]] ومش فارق معاه تفاصيل HTTP. وده اللي بيخلي الـ interceptors والاختبار بـ [[HttpTestingController]] ممكنين.`,
            how: R`[[get<Product[]>]] مش بيفحص حاجة: الـ generic وعد بس للـ compiler (نفس فكرة «الأنواع بتتمسح» في «تاب TypeScript»). لو السيرفر رجّع شكل تاني، TypeScript مش هيعرف. لو محتاج فحص حقيقي، مرّر الرد على Zod.

الـ Observable «cold»: كل subscribe = طلب جديد. فلو عملت [[async]] pipe مرتين على نفس الـ Observable في الـ template، هيتبعت طلبين. [[toSignal]] بيعمل subscribe مرة واحدة.

الـ Observable بيطلّع قيمة واحدة وبعدين complete، فمش محتاج unsubscribe في الغالب. بس لو الـ component اتقفل والطلب لسه شغال، الـ unsubscribe (اللي [[toSignal]] و [[async]] بيعملوه لوحدهم) بيلغي الطلب فعلًا.

[[params: { q }]] بيعمل [[?q=...]] مع encode. والـ errors بتيجي [[HttpErrorResponse]] فيها [[status]] و [[error]] (جسم الرد). ولو [[status: 0]] يبقى مفيش رد خالص (نت أو CORS).

ومن 22 الـ backend الافتراضي [[fetch]]؛ لو محتاج progress events للـ upload استخدم [[provideHttpClient(withXhr())]].`,
            when: R`كل كلام مع API. الـ service للـ endpoints، والـ component بيحوّلها signal بـ [[toSignal]] أو يستخدم [[httpResource]] (بعد درسين) للـ GET. والـ POST والـ DELETE بتتنادى من event handler.`,
            mistakes: R`تنادي [[this.api.create(body)]] من غير subscribe وتستنى إن الطلب يتبعت: مش هيتبعت. وتعمل subscribe جوه subscribe (طلب بيعتمد على طلب): استخدم [[switchMap]] (درس RxJS). وتفتكر إن [[get<User>]] بيضمن الشكل. وتحط الـ URL الكامل [[http://localhost:3000]] في الكود بدل environment أو proxy.`
          },
          lines: [
            "service متاحة لكل التطبيق.",
            "الكلاس.",
            R`[[HttpClient]] متاح من غير ما تسجّله.`,
            "الـ URL الأساسي في مكان واحد.",
            R`GET بـ query [[?q=]]، والرد نوعه [[Product[]]].`,
            "GET لمنتج واحد.",
            R`POST بالجسم ده (من غير id)، والرد المنتج اللي اتعمل.`,
            "DELETE.",
            "قفلة.",
            R`[[toSignal]] بيعمل subscribe، والـ [[initialValue]] لحد ما الرد ييجي.`
          ],
          sol: R`الـ list بتظهر بعد ما الرد يوصل، وفي Network طلب واحد [[GET /api/products?q=]].

لما تنادي [[api.create({...})]] من غير subscribe: مفيش أي طلب في Network. الـ Observable مجرد وصفة. لازم [[api.create(body).subscribe()]]، أو [[await firstValueFrom(api.create(body))]]. ده من أكتر الأخطاء اللي بتتكرر من ناس جاية من fetch و axios.

ملحوظة: لو الـ API على دومين تاني وشغال محليًا، اعمل [[proxy.conf.json]] فيه [[{ "/api": { "target": "http://localhost:3000", "secure": false } }]] وشغّل [[ng serve --proxy-config proxy.conf.json]] عشان تتجنب CORS.`
        },
        {
          cmd: "interceptors",
          title: "تحط الـ token على كل طلب، وتمسك 401 في مكان واحد",
          desc: R`الـ interceptor دالة بتعدّي عليها كل الطلبات: بتقدر تعدّل الطلب قبل ما يخرج (header و URL)، وتتعامل مع الرد أو الخطأ قبل ما يوصل للي طلبه.

الشكل الحديث [[HttpInterceptorFn]]: [[(req, next) => next(req)]]، وبتتسجّل بـ [[provideHttpClient(withInterceptors([authInterceptor]))]].

الـ [[req]] immutable: بتعمل نسخة معدّلة بـ [[req.clone({ setHeaders: { ... } })]].

في الكود القديم: كلاس [[implements HttpInterceptor]] فيه [[intercept(req, next)]] ومتسجّل بـ [[{ provide: HTTP_INTERCEPTORS, useClass: ..., multi: true }]].`,
          example: R`export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(Auth).token();
  const router = inject(Router);
  const authReq = token ? req.clone({ setHeaders: { Authorization: $__btBearer $__{token}$__bt } }) : req;
  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) router.navigate(['/login']);
      return throwError(() => err);
    }),
  );
};
// app.config.ts
provideHttpClient(withInterceptors([authInterceptor, loggingInterceptor]))`,
          try: R`سجّل الـ interceptor، وحط token في الـ Auth service، وبص على أي طلب في Network > Headers. بعدين اعمل [[loggingInterceptor]] بيطبع [[req.method]] و [[req.url]] والوقت اللي الطلب خده (استخدم [[tap]] أو [[finalize]] من rxjs).`,
          flag: "script",
          deep: {
            why: R`كل طلب للـ API محتاج [[Authorization]]، وكل 401 معناه «ارجع سجّل دخول». لو ده في كل service، هتنساه في حتة. الـ interceptor بيحط المنطق ده في مكان واحد: token، و refresh token، و loading عام، و retry، و log، وتحويل رسايل الخطأ.`,
            how: R`الـ interceptors بتتنفذ بالترتيب زي سلسلة: الأول بيعدّل الطلب ويسلّمه للي بعده عن طريق [[next(req)]]، لحد ما يوصل للـ backend. والرد بيرجع بالعكس: آخر واحد بيشوفه الأول.

[[inject()]] شغالة في أول الـ interceptor (injection context)، بس مش جوه [[catchError]] لأنه بيتنفذ بعدين. عشان كده الـ [[router]] اتعمل inject فوق.

[[throwError(() => err)]] بيعيد رمي الخطأ عشان اللي طلب يعرف إن الطلب فشل. لو رجّعت [[of(null)]] بدله، الخطأ هيختفي وهيوصل للـ component كأنه نجح بـ null.

و [[HttpContext]] بيخليك تبعت إشارة لـ interceptor معين لطلب معين (زي «الطلب ده متحطش عليه token»).

والقديمة ([[HTTP_INTERCEPTORS]]) محتاجة [[withInterceptorsFromDi()]] في [[provideHttpClient]] عشان تشتغل، وممكن تخلط الاتنين.`,
            when: "token و refresh، والتعامل العام مع 401 و 403 و 500، و loading indicator عام، وإضافة base URL أو language header، و log. مش لمنطق خاص بطلب واحد.",
            mistakes: R`تعدّل [[req.headers.set(...)]] وتفتكره اتغير: الـ request immutable، ولازم [[clone]]. و [[inject(Router)]] جوه [[catchError]]: NG0203. وتبلع الخطأ فالـ component يفتكر إن كله تمام. وتحط الـ token على كل الطلبات حتى اللي رايحة لدومين خارجي (تسريب): افحص [[req.url]] الأول.`
          },
          lines: [
            R`interceptor كـ function: الطلب، و [[next]] بيكمّل السلسلة.`,
            R`اقرا الـ token من الـ service (signal).`,
            R`[[inject]] هنا في الأول، مش جوه [[catchError]].`,
            R`لو فيه token اعمل نسخة من الطلب بالـ header، وإلا سيبه زي ما هو.`,
            "ابعت الطلب، واشتغل على الرد.",
            "لو فيه خطأ.",
            "401 = الـ token مش صالح: روح للـ login.",
            "ارمي الخطأ تاني عشان اللي طلب يعرف.",
            "قفلة.",
            "قفلة الـ pipe.",
            "قفلة.",
            "التسجيل: بالترتيب، الأول بيشوف الطلب الأول."
          ],
          sol: R`في Network > Headers هتلاقي [[Authorization: Bearer <token>]] على كل الطلبات. ده اتأكد في الـ lab باختبار: بعد [[token.set('abc')]]، الطلب في [[HttpTestingController]] كان عليه [[Bearer abc]].

الـ logging interceptor:`,
          solCode: R`import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const started = performance.now();
  return next(req).pipe(
    finalize(() => {
      const ms = Math.round(performance.now() - started);
      console.log($__bt$__{req.method} $__{req.urlWithParams} - $__{ms}ms$__bt);
    }),
  );
};`
        },
        {
          cmd: "httpResource",
          title: "تجيب بيانات كـ signal بـ httpResource وتاخد loading و error جاهزين",
          desc: R`[[httpResource<T>(() => url)]] بيعمل GET ويرجّع object فيه signals: [[value()]] و [[isLoading()]] و [[error()]] و [[hasValue()]] و [[status()]]، و [[reload()]].

والـ URL دالة: لو قرت signal جواها (زي [[this.id()]])، الطلب بيتبعت تاني لوحده لما الـ signal تتغير، والطلب القديم بيتلغي.

بقى stable في Angular 22 (قبلها كان experimental). ومعاه [[resource()]] لأي async function، و [[rxResource()]] لو عندك Observable. ده بيقرّب Angular من [[useQuery]] في React، بس من غير cache مشترك.`,
          example: R`@Component({
  selector: 'app-live',
  template: $__bt
    @if (product.isLoading()) {
      <p>بيحمّل...</p>
    } @else if (product.error()) {
      <p>حصلت مشكلة</p>
    } @else if (product.hasValue()) {
      <h1>{{ product.value().name }}</h1>
    }
    <button (click)="product.reload()">حدّث</button>
  $__bt,
})
export class Live {
  id = input.required<string>();
  product = httpResource<Product>(() => $__bt/api/products/$__{this.id()}$__bt);
}`,
          try: R`حط [[Live]] على [[live/:id]] واتنقل بين [[/live/1]] و [[/live/2]] بسرعة وانت فاتح Network: الطلب القديم بيحصله إيه؟ بعدين خلي الدالة ترجّع [[undefined]] لو الـ id فاضي ([[() => this.id() ? ... : undefined]]) وشوف الـ status.`,
          flag: "script",
          deep: {
            why: R`كل صفحة بتجيب بيانات محتاجة نفس التلات حالات: بيحمّل، وخطأ، والبيانات. وكل مرة بتكتب loading signal و error signal و subscribe و unsubscribe، وتنسى تلغي الطلب القديم لما الـ id يتغير فيوصل رد قديم بعد الجديد (race condition). httpResource بيعمل كل ده في سطر.`,
            how: R`الدالة اللي بتديها بتشتغل جوه reactive context: أي signal بتقراها بتتسجل. لما تتغير، الـ resource بيلغي الطلب الحالي (switchMap من جوه) ويبعت الجديد، والـ [[status()]] بيبقى [[loading]] (أول مرة) أو [[reloading]] (لما تنادي reload والقيمة القديمة لسه موجودة).

[[value()]] بترمي خطأ لو الـ status [[error]]، عشان كده بتفحص [[hasValue()]] الأول. ولو الدالة رجّعت [[undefined]]، مفيش طلب والـ status [[idle]]، ودي طريقة تقول «استنى لحد ما الـ id يبقى موجود».

بيستخدم [[HttpClient]] من جوه، فالـ interceptors بتاعتك بتشتغل عليه. وتقدر تبعت object بدل string: [[{ url, params, headers }]]. و [[parse]] لو عايز تمرر الرد على Zod.

هو للقراية (GET). الـ POST والـ PUT من [[HttpClient]] عادي في event handler.`,
            when: R`بيانات صفحة معتمدة على input أو signal (تفاصيل منتج، list بفلتر). لو محتاج cache مشترك بين الصفحات أو retry أو pagination متقدم، فيه TanStack Query for Angular، أو store (NgRx).`,
            mistakes: R`تقرا [[product.value()]] من غير [[hasValue()]] وهو في error: بيرمي exception. وتستخدمه لطلبات بتغيّر بيانات (POST): هيتبعت كل ما signal تتغير. وتعمل [[httpResource]] جوه دالة أو event handler: لازم injection context زي effect. وتفتكر إنه بيعمل cache: كل component بيعمل resource لوحده بيطلب لوحده.`
          },
          lines: [
            "الـ decorator.",
            "الـ selector.",
            "بداية الـ template.",
            "أول تحميل.",
            "رسالة.",
            "لو فيه خطأ.",
            "رسالة.",
            R`[[hasValue]] بيضمن إن [[value()]] مش هترمي.`,
            "البيانات.",
            "قفلة.",
            "إعادة الطلب يدويًا.",
            "قفلة الـ template.",
            "قفلة الـ decorator.",
            "الكلاس.",
            R`الـ id من الـ URL (مع [[withComponentInputBinding]]).`,
            R`الدالة بتقرا [[id()]]، فأي تغيير فيه يبعت طلب جديد.`,
            "قفلة."
          ],
          sol: R`لما تتنقل بسرعة، الطلب القديم بيظهر في Network بـ status «(canceled)» والجديد بيكمّل. ده الـ race condition اتحل من غير ما تكتب حاجة. في الـ lab الاختبار ده طلع: بعد [[setInput('id', '3')]] الـ status كان [[loading]] والنص «بيحمّل...»، وبعد الرد [[resolved]] و «مسطرة»، وبعد [[id = 4]] ورد 404 بقى [[error]] و «حصلت مشكلة» و [[error().status]] بـ 404.

لما الدالة ترجّع [[undefined]]: مفيش طلب خالص، و [[status()]] بـ [[idle]]، و [[hasValue()]] بـ false. مفيد لصفحة بحث مستنية المستخدم يكتب.`
        }
      ]
    },
    {
      t: "الفورمات",
      l: 2,
      n: "reactive forms بأنواع (الموجود في كل شركة)، و signal forms (الجديد في 22)",
      items: [
        {
          cmd: "reactive forms",
          title: "فورم بـ FormGroup و Validators و formControlName",
          desc: R`الـ reactive forms هي الطريقة الأشهر في شغل Angular: الفورم متعرّف في الكلاس كـ [[FormGroup]] فيه [[FormControl]] لكل حقل ومعاه [[Validators]]، والـ template بيتربط بيه بـ [[[formGroup]]] و [[formControlName]].

كل control عنده state: [[value]] و [[valid]] و [[invalid]] و [[touched]] و [[dirty]] و [[errors]]. والفورم كلها نفس الحاجة للكل.

[[NonNullableFormBuilder]] بيختصر الكتابة، وبيخلي [[reset()]] يرجّع القيمة الأولى مش null.`,
          example: R`@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  template: $__bt
    <form [formGroup]="form" (ngSubmit)="submit()">
      <input formControlName="email" type="email" />
      @if (form.controls.email.touched && form.controls.email.hasError('email')) {
        <small>الإيميل شكله غلط</small>
      }
      <input formControlName="password" type="password" />
      <label><input type="checkbox" formControlName="remember" /> افتكرني</label>
      <button [disabled]="form.pending">دخول</button>
    </form>
  $__bt,
})
export class Login {
  private fb = inject(NonNullableFormBuilder);
  form = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required, Validators.minLength(8)]),
    remember: this.fb.control(false),
  });
  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    console.log(this.form.getRawValue());
  }
}`,
          try: R`اعمل الفورم، واكتب إيميل غلط واخرج من الحقل. بعدين دوس دخول والفورم فاضية. زوّد رسالة لـ [[minLength]] بتقول الطول المطلوب والحالي (بص على [[form.controls.password.errors]]).`,
          flag: "script",
          deep: {
            why: R`الفورمات في تطبيقات البنوك والـ ERP ضخمة: ٣٠ حقل، و validation معقد، وحقول بتظهر وتختفي، وقوايم بتتضاف. الـ reactive forms بتحط كل ده في الكلاس، فتقدر تختبره من غير DOM، وتسمع لتغييرات أي حقل ([[valueChanges]] Observable)، وتعدّل القيم من الكود. والشكل التاني، template-driven بـ [[ngModel]]، أبسط للفورمات الصغيرة بس بيتعب مع الكبيرة.`,
            how: R`[[fb.group({ email: ['', validators] })]] بيعمل [[FormGroup]] فيه [[FormControl<string>]]. الـ directive [[formControlName="email"]] بتربط الـ input بالـ control في الاتجاهين، وبتحدّث [[touched]] لما تخرج من الحقل و [[dirty]] لما تكتب.

الـ validators functions بتاخد الـ control وترجّع [[null]] (تمام) أو object زي [[{ minlength: { requiredLength: 8, actualLength: 3 } }]]. عشان كده [[hasError('email')]].

Angular بيحط classes على الـ inputs لوحده: [[ng-invalid]] و [[ng-touched]] و [[ng-dirty]]، فتقدر تلوّنهم بـ CSS: [[input.ng-invalid.ng-touched { border-color: red }]].

[[(ngSubmit)]] بدل [[(submit)]] بيمنع الـ reload. و [[getRawValue()]] بترجع كل القيم حتى الحقول الـ disabled، أما [[value]] بتسيبها.

[[markAllAsTouched()]] بيخلي كل رسايل الخطأ تظهر لما يدوس submit على فورم ناقصة.`,
            when: "أي فورم متوسطة أو كبيرة، أو فيها منطق (حقل معتمد على حقل)، أو محتاج تختبرها. وده الشكل اللي هتلاقيه في معظم المشاريع الموجودة في الشغل.",
            mistakes: R`تنسى [[ReactiveFormsModule]] في imports: NG8002 Can't bind to 'formGroup'. وتعرض رسالة الخطأ من غير [[touched]] فالفورم تبقى حمرا قبل ما يكتب أي حاجة. وتقفل الزرار بـ [[[disabled]="form.invalid"]] من غير ما تقول للمستخدم ليه: الأحسن تسيبه مفتوح وتعمل [[markAllAsTouched]]. وتستخدم [[FormBuilder]] العادي فالـ [[reset()]] يحط null وتتفاجئ.`
          },
          lines: [
            "الـ decorator.",
            "الـ selector.",
            R`[[ReactiveFormsModule]] فيه [[formGroup]] و [[formControlName]].`,
            "بداية الـ template.",
            R`الفورم مربوطة بالـ [[FormGroup]]، و [[ngSubmit]] من غير reload.`,
            R`input مربوط بـ control اسمه email.`,
            "الرسالة تظهر بس لو لمسه ولو فيه خطأ email.",
            "الرسالة.",
            "قفلة.",
            "كلمة السر.",
            "checkbox مربوط بـ boolean.",
            R`مقفول وهو بيفحص async validators بس.`,
            "قفلة الفورم.",
            "قفلة الـ template.",
            "قفلة الـ decorator.",
            "الكلاس.",
            "builder مفيهوش null.",
            "الفورم.",
            R`control قيمته الأولى نص فاضي ومعاه validators. [[fb.control]] من الـ NonNullable builder نوعه [[FormControl<string>]].`,
            "مطلوب و ٨ حروف على الأقل.",
            R`boolean من غير validators.`,
            "قفلة.",
            "لما يعمل submit.",
            "ناقصة؟ اظهر كل الأخطاء ووقّف.",
            R`القيم بأنواعها: [[{ email: string; password: string; remember: boolean }]].`,
            "قفلة.",
            "قفلة."
          ],
          sol: R`لما تكتب [[abc]] وتخرج: الرسالة بتظهر، والـ input عليه [[ng-invalid ng-touched ng-dirty]]. لما تدوس دخول والفورم فاضية: [[markAllAsTouched]] بيخلي كل الحقول touched، ومفيش console.log. ده اتأكد في الـ lab: بعد [[submit()]] على فورم فاضية، [[email.touched]] بقت true، وبعد [[setValue]] بقيم صح [[valid]] بقت true، و [[reset()]] رجّعت [[email]] لـ [['']] مش null.

رسالة الـ minLength:`,
          solCode: R`@if (form.controls.password.touched && form.controls.password.errors?.['minlength']; as e) {
  <small>محتاج {{ e.requiredLength }} حروف، كتبت {{ e.actualLength }}</small>
}`
        },
        {
          cmd: "typed forms و FormArray",
          title: "أنواع الفورم، و FormArray لحقول بتتضاف، و validator بتاعك",
          desc: R`من Angular 14 الفورمات typed: [[new FormControl('')]] نوعها [[FormControl<string | null>]]، ومع [[nonNullable: true]] بتبقى [[FormControl<string>]]. و [[form.value]] و [[getRawValue()]] بيطلعوا بأنواع، فلو غيّرت اسم حقل الـ compiler هيعرّفك.

[[FormArray]] لحقول عددها بيتغير: أصناف في طلب، أو أرقام تليفونات. وبتلف عليها بـ @for في الـ template.

والـ validator بتاعك دالة: بتاخد control وترجّع [[null]] أو object بالخطأ.`,
          example: R`function egyptianPhone(c: AbstractControl<string>): ValidationErrors | null {
  return /^01[0125]\d{8}$/.test(c.value) ? null : { phone: true };
}
export class OrderForm {
  form = new FormGroup({
    phone: new FormControl('', { nonNullable: true, validators: [Validators.required, egyptianPhone] }),
    items: new FormArray([new FormControl('', { nonNullable: true })]),
    notes: new FormControl<string | null>(null),
  });
  addItem() { this.form.controls.items.push(new FormControl('', { nonNullable: true })); }
}
// template:
<form [formGroup]="form">
  <input formControlName="phone" />
  <div formArrayName="items">
    @for (item of form.controls.items.controls; track $index) { <input [formControl]="item" /> }
  </div>
  <button type="button" (click)="addItem()">صنف كمان</button>
</form>`,
          try: R`جرّب [[form.controls.phone.setValue('0101234567')]] (١٠ أرقام) و [[hasError('phone')]]، وبعدين رقم صح. زوّد صنفين واطبع [[form.getRawValue().items]]. وبعدين اكتب [[const x: number = form.value.phone]] وشوف الـ compiler.`,
          flag: "script",
          deep: {
            why: R`قبل الـ typed forms كان [[form.value]] نوعه [[any]]: تغيّر اسم حقل من [[phone]] لـ [[mobile]] والكود اللي بيقراه يفضل يـ compile ويبعت undefined للسيرفر. الأنواع بتمسك ده. و FormArray موجودة لأن فورمات كتير حقيقية فيها «ضيف واحد كمان».`,
            how: R`النوع بيتستنتج من القيمة الأولى. [[new FormControl('')]] نوعها [[string | null]] لأن [[reset()]] من غير nonNullable بيحط null. [[nonNullable: true]] بيخلي reset يرجّع [['']]، والنوع [[string]] بس.

[[form.value]] نوعه [[Partial<...>]] (كل حاجة ممكن undefined) لأن الحقول الـ disabled بتتشال منه. [[getRawValue()]] فيه كل حاجة ومن غير Partial، فغالبًا هو اللي تبعته للـ API.

[[formArrayName="items"]] بيدخل جوه الـ array، و [[[formControl]="item"]] بيربط كل عنصر. [[track $index]] مقبول هنا لأن الـ controls نفسهم مش ليهم id، بس لو بتحذف من النص الأحسن [[track item]] (الـ control object نفسه ثابت).

الـ validator على مستوى الـ group (مثلًا كلمة السر = التأكيد) بيتحط في [[new FormGroup({...}, { validators: [matchPasswords] })]] وبياخد الـ group كله. والـ async validators (هل الإيميل موجود؟) بيرجّعوا Observable، وأثناءهم [[form.pending]] بـ true.

في الكود القديم هتلاقي [[UntypedFormGroup]] و [[UntypedFormControl]]: دول اللي الـ migration حطهم لما المشروع اتنقل لـ 14، ونوعهم any.`,
            when: R`دايمًا [[nonNullable]] إلا لو null قيمة ليها معنى. FormArray لأي قايمة المستخدم بيزوّد فيها. و validator بتاعك لأي قاعدة بتتكرر (رقم قومي ١٤ رقم، موبايل مصري، IBAN).`,
            mistakes: R`تبعت [[form.value]] للـ API وفيه حقل disabled فيختفي من الـ body. وتعمل [[form.controls.items.value.push(...)]]: ده بيعدّل array عادية مش بيضيف control. وتستخدم [[Untyped...]] في كود جديد. وتنسى [[type="button"]] على زرار الإضافة جوه الـ form فيعمل submit.`
          },
          lines: [
            R`validator: بياخد control نوعه string ويرجّع null أو خطأ.`,
            R`موبايل مصري: 010 أو 011 أو 012 أو 015 وبعدهم ٨ أرقام.`,
            "قفلة.",
            "الكلاس.",
            "الفورم.",
            R`[[FormControl<string>]] مطلوب ولازم يطابق الـ validator.`,
            R`array من controls، بيبدأ بواحد.`,
            R`حقل null مسموح فيه، فالنوع مكتوب صريح.`,
            "قفلة.",
            R`بيضيف control جديد للـ array.`,
            "قفلة.",
            R`الـ [[FormGroup]] نفسه.`,
            R`حقل عادي بالاسم.`,
            R`ادخل جوه [[items]].`,
            R`لف على الـ controls واربط كل واحد بـ [[[formControl]]].`,
            "قفلة.",
            R`[[type="button"]] عشان ميعملش submit.`,
            "قفلة."
          ],
          sol: R`[[0101234567]] (١٠ أرقام): [[hasError('phone')]] بـ true. [[01012345678]]: valid. ده اللي اتأكد في الـ lab. بعد [[addItem()]] مرتين، [[getRawValue().items]] بترجع array فيها ٣ strings.

[[const x: number = form.value.phone]] بيطلّع [[Type 'string | undefined' is not assignable to type 'number']]. لاحظ الـ [[undefined]]: ده من [[form.value]] اللي نوعه Partial. مع [[form.getRawValue().phone]] النوع [[string]] بس.`
        },
        {
          cmd: "signal forms",
          title: "signal forms: الفورم model في signal والـ validation schema (جديد في 22)",
          desc: R`في Angular 22 نزل شكل جديد stable للفورمات في [[@angular/forms/signals]]: البيانات في signal عادية، و [[form(model, schema)]] بيعمل «شجرة حقول» (FieldTree) بنفس شكلها، وكل حقل بيتربط بـ [[[formField]]] في الـ template.

الـ validation في الـ schema: [[required(p.email)]] و [[email(p.email)]] و [[minLength(p.password, 8)]]، وكل حقل عنده signals: [[value()]] و [[valid()]] و [[touched()]] و [[errors()]].

مفيش FormGroup ولا FormControl ولا valueChanges: كله signals. ده الاتجاه الجديد، بس الـ reactive forms هتفضل في المشاريع الموجودة سنين، فلازم تعرف الاتنين.`,
          example: R`import { FormField, email, form, minLength, required, submit } from '@angular/forms/signals';
@Component({
  selector: 'app-signup',
  imports: [FormField],
  template: $__bt
    <input type="email" [formField]="f.email" />
    @if (f.email().touched() && f.email().invalid()) {
      @for (e of f.email().errors(); track e.kind) { <small>{{ e.message }}</small> }
    }
    <input type="password" [formField]="f.password" />
    <button (click)="save()" [disabled]="f().submitting()">سجّل</button>
  $__bt,
})
export class Signup {
  model = signal({ email: '', password: '' });
  f = form(this.model, (p) => {
    required(p.email, { message: 'الإيميل مطلوب' });
    email(p.email, { message: 'الإيميل شكله غلط' });
    minLength(p.password, 8, { message: '٨ حروف على الأقل' });
  });
  async save() {
    await submit(this.f, async () => {
      console.log('هنبعت', this.model());
      return undefined;
    });
  }
}`,
          try: R`اعمل الفورم واكتب في الإيميل، وحط [[{{ model() | json }}]] تحت: بيتحدّث مع كل حرف؟ بعدين اعمل [[model.set({ email: 'a@b.com', password: '12345678' })]] من زرار وشوف الـ inputs. وفي الآخر زوّد حقل [[confirm]] و validation إنه زي الـ password (بص على [[validate]] في الدوكس).`,
          flag: "script",
          deep: {
            why: R`الـ reactive forms اتعملت قبل الـ signals: الـ state في FormControl منفصل عن بياناتك، والتغييرات Observables، والأنواع اتضافت بعدين. الـ signal forms بتخلي بياناتك هي مصدر الحقيقة: الـ model signal، وأي تعديل في الـ input بيكتب فيه مباشرة، وأي تعديل فيه بيظهر في الـ input. والـ validation متعرّفة مرة في schema تقدر تعيد استخدامها.`,
            how: R`[[form(this.model, schemaFn)]] مش بيعمل نسخة: بيقرا ويكتب في [[model]] نفسه. [[f.email]] حقل، و [[f.email()]] الـ state بتاعه ([[value]] و [[errors]] و [[touched]] و [[dirty]] و [[disabled]] و [[invalid]]). و [[f()]] الـ state بتاع الفورم كلها.

[[[formField]="f.email"]] directive بتربط الـ input الـ native في الاتجاهين وبتحدّث touched. وتقدر تعمل component بتاعك يشتغل معاها لو عمل implement لـ [[FormValueControl]] (فيه [[value = model()]]).

الـ errors array من objects فيها [[kind]] ([['required']] و [['email']] و [['minLength']]) و [[message]] لو حطيتها. ولما الإيميل فاضي بيطلع [[required]] بس، لأن [[email]] مش بيعترض على الفاضي.

[[submit(form, action)]] بيعمل touched لكل الحقول، ولو الفورم valid بينادي الـ action، و [[f().submitting()]] بـ true وهو شغال. ولو الـ action رجّعت errors (من السيرفر مثلًا) بتتحط على الحقول.

وفيه [[validateAsync]] و [[validateHttp]] للـ async، و [[disabled(p.x, () => cond)]] و [[hidden]] للمنطق، و [[validateStandardSchema]] لو عايز تستخدم schema من Zod.`,
            when: R`فورمات جديدة في مشروع على 22 والفريق موافق. في مشروع موجود مليان reactive forms، خليك على نفس الشكل عشان الاتساق، وفيه compat layer ([[@angular/forms/signals/compat]]) لو عايز تخلط. وفي الانترفيو ٢٠٢٦ اعرف تقول الفرق.`,
            mistakes: R`تنسى [[FormField]] في imports: [[[formField]]] مش هيتعرف. وتكتب [[f.email().value]] وتفتكره قيمة: ده signal، الصح [[f.email().value()]]. وتعمل [[model().email = 'x']] (mutation) فالفورم متحسش؛ اعمل [[model.update(m => ({ ...m, email: 'x' }))]] أو [[f.email().value.set('x')]]. وتدوّر على دروس قديمة فيها [[[field]]] أو [[Control]]: دي كانت أسامي الـ experimental في 21 واتغيرت.`
          },
          lines: [
            "كل حاجة من الباكدج الجديدة.",
            "الـ decorator.",
            "الـ selector.",
            R`[[FormField]] هو الـ directive بتاع [[[formField]]].`,
            "بداية الـ template.",
            "input مربوط بحقل الإيميل في الاتجاهين.",
            R`كل حاجة signals: [[f.email()]] الـ state، و [[touched()]] و [[invalid()]].`,
            R`[[errors()]] array، وكل خطأ فيه [[kind]] و [[message]].`,
            "قفلة.",
            "حقل كلمة السر.",
            R`[[f()]] state الفورم كلها، و [[submitting()]] وهي بتتبعت.`,
            "قفلة الـ template.",
            "قفلة الـ decorator.",
            "الكلاس.",
            "البيانات نفسها: signal عادية.",
            R`[[form]] بيبني حقول بنفس شكل الـ model، والدالة هي الـ schema.`,
            "مطلوب ورسالته.",
            "شكل إيميل.",
            "طول أدنى.",
            "قفلة الـ schema.",
            "الإرسال.",
            R`[[submit]] بيعمل touched للكل، ولو valid ينادي الـ action.`,
            R`الـ [[model()]] فيه القيم الحالية.`,
            R`[[undefined]] = مفيش أخطاء من السيرفر.`,
            "قفلة.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`[[{{ model() | json }}]] بيتحدّث مع كل حرف (محتاج [[JsonPipe]] في imports). و [[model.set(...)]] بيملا الـ inputs على طول. ده اتأكد في الـ lab: الفورم في الأول invalid وأخطاء الإيميل [[[{"kind":"required","message":"الإيميل مطلوب"}]]] (من غير email لأن الحقل فاضي). بعد [[value.set]] بقيم صح الفورم بقت valid والـ input نفسه عرض القيمة، ولما كتبنا [[bad]] في الـ input الـ [[model().email]] بقى [[bad]] والأخطاء [[['email']]].

حقل التأكيد:`,
          solCode: R`import { validate } from '@angular/forms/signals';
model = signal({ email: '', password: '', confirm: '' });
f = form(this.model, (p) => {
  required(p.email);
  minLength(p.password, 8);
  validate(p.confirm, ({ value, valueOf }) =>
    value() === valueOf(p.password) ? undefined : { kind: 'mismatch', message: 'مش زي كلمة السر' },
  );
});`
        }
      ]
    },
    {
      t: "RxJS اللي هتقابله في الشغل",
      l: 2,
      n: "Observable و pipe و switchMap و debounceTime، و async pipe و toSignal بين العالمين",
      items: [
        {
          cmd: "Observable و subscribe",
          title: "Observable يعني إيه، وليه مش Promise",
          desc: R`RxJS مكتبة Angular معتمد عليها من زمان: [[HttpClient]] و [[valueChanges]] في الفورمات و [[router.events]] كلهم بيرجّعوا Observable. حتى مع الـ signals، هتقابلها في كل مشروع شغال.

الـ Observable زي Promise بيطلّع قيم مع الوقت، بس فيه ٣ فروق: بيطلّع قيم كتير مش واحدة (كل ضغطة، كل حرف)، و lazy: مش بيبدأ غير لما حد يعمل [[subscribe]]، ولكل subscriber تشغيلة لوحده. و cancellable: [[unsubscribe()]] بيوقفه.

والـ subscriber بياخد ٣ callbacks: [[next]] لكل قيمة، و [[error]] لو حصل خطأ، و [[complete]] لما يخلص. والعُرف إن اسم المتغير بيخلص بـ [[$]].`,
          example: R`import { Observable, interval } from 'rxjs';
const nums$ = new Observable<number>((sub) => {
  console.log('بدأ');
  sub.next(1);
  sub.next(2);
  sub.complete();
});
console.log('قبل subscribe');
nums$.subscribe({ next: (v) => console.log('وصل', v), complete: () => console.log('خلص') });
nums$.subscribe((v) => console.log('التاني', v));
const sub = interval(500).subscribe((n) => console.log('tick', n));
setTimeout(() => sub.unsubscribe(), 1600);`,
          try: R`احفظه [[scripts/rx1.mts]] في مشروع Angular (rxjs متسطّب) وشغّله بـ [[node scripts/rx1.mts]]. قبل ما تشغّل، اكتب الترتيب اللي متوقعه. بعدين امسح سطر الـ [[unsubscribe]] وشوف إيه اللي بيحصل.`,
          flag: "script",
          deep: {
            why: R`الـ Promise ممتاز لحاجة بتحصل مرة: طلب ورد. بس الواجهة مليانة حاجات بتحصل كتير: المستخدم بيكتب، و websocket بيبعت، والراوتر بيتنقل، وتايمر. Observable بيوحّد كل ده في شكل واحد، وبيديك operators تركّبهم (الدروس الجاية). والأهم للـ HTTP: الإلغاء. لو المستخدم خرج من الصفحة، الطلب بيتلغي فعلًا.`,
            how: R`الدالة اللي بتديها لـ [[new Observable]] مش بتشتغل غير لما حد يعمل subscribe، وبتشتغل من الأول لكل subscriber (cold). عشان كده «بدأ» اتطبعت مرتين. ده نفس سبب إن [[http.get]] بيبعت طلب جديد مع كل subscribe.

[[complete]] أو [[error]] بيقفلوا الـ Observable: مفيش قيم بعدهم. الـ HTTP بيعمل next مرة و complete، فهو شبه Promise. أما [[interval]] و [[valueChanges]] و [[fromEvent]] مش بيخلصوا أبدًا لوحدهم، فلو عملت subscribe ومعملتش unsubscribe، الـ callback هيفضل شغال بعد ما الـ component يتقفل: memory leak، وأحيانًا كود بيشتغل على component ميت.

فيه كمان Subject: Observable تقدر تعمل له [[next()]] من برا، و [[BehaviorSubject]] بيفتكر آخر قيمة ويديها لأي subscriber جديد. ده كان «الـ state» في Angular قبل الـ signals، وهتلاقيه في services كتير (المستوى ٣).

و [[firstValueFrom(obs$)]] بيحوّل Observable لـ Promise لو عايز [[await]].`,
            when: R`في Angular الحديث: الـ HTTP والـ streams (بحث، websocket، أحداث). والـ state العادي signals. وأي subscribe بإيدك لازم يبقى معاه خطة للـ unsubscribe (درس async و toSignal).`,
            mistakes: R`تعمل [[subscribe]] ومتعملش unsubscribe على حاجة مش بتخلص. وتفتكر إن [[http.get()]] بيبعت الطلب لوحده. وتعمل subscribe مرتين على نفس الـ HTTP Observable فتبعت طلبين. وفي الانترفيو: «الفرق بين Observable و Promise؟» lazy مقابل eager، وقيم كتير مقابل قيمة، و cancellable، والـ operators.`
          },
          lines: [
            R`[[interval]] بيطلّع رقم كل فترة ومش بيخلص.`,
            "Observable بإيدنا عشان نشوف بيحصل إيه.",
            "بيتطبع مع كل subscribe، مش لما يتعمل.",
            "قيمة.",
            "قيمة تانية.",
            "خلص: مفيش قيم بعد كده.",
            "قفلة.",
            "دي بتتطبع الأول: الـ Observable لسه مبدأش.",
            R`أول subscriber بالـ ٣ callbacks (اللي محتاجهم بس).`,
            "subscriber تاني: تشغيلة جديدة من الأول.",
            R`subscribe بيرجّع [[Subscription]] نحفظه.`,
            R`بعد 1.6 ثانية نوقفه، وإلا هيفضل شغال للأبد.`
          ],
          sol: R`الناتج بالظبط (اتشغّل في الـ lab):

[[قبل subscribe]] ثم [[بدأ]] و [[وصل 1]] و [[وصل 2]] و [[خلص]]، ثم [[بدأ]] تاني و [[التاني 1]] و [[التاني 2]]، وبعدين [[tick 0]] و [[tick 1]] و [[tick 2]] والبرنامج يخلص.

«قبل subscribe» أول واحدة لأن الـ Observable lazy. و«بدأ» مرتين لأنه cold: كل subscriber بتشغيلة. و ٣ ticks بس (عند 500 و 1000 و 1500) لأن الـ unsubscribe عند 1600.

من غير الـ unsubscribe: الـ ticks مش بتقف، والبرنامج مش بيخلص خالص (ctrl+c). ده بالظبط الـ memory leak اللي بيحصل في component بيعمل subscribe على interval أو valueChanges ويتقفل.`
        },
        {
          cmd: "pipe و operators",
          title: "تحوّل القيم بـ pipe و map و filter و tap و catchError",
          desc: R`الـ operators دوال بتاخد Observable وترجّع Observable جديد متعدّل، وبتتركّب جوه [[.pipe(...)]] بالترتيب زي خط إنتاج:

[[map]] يحوّل كل قيمة (زي [[Array.map]])، و [[filter]] يعدّي اللي بيحقق شرط، و [[tap]] يعمل حاجة جانبية (log) من غير ما يغيّر القيمة، و [[catchError]] يمسك الخطأ ويرجّع Observable بديل.

ومعاهم [[of(1, 2)]] بيعمل Observable من قيم، و [[from([...])]] من array أو Promise، و [[throwError]] بيعمل واحد بيطلّع خطأ.`,
          example: R`import { from, of, filter, map, tap, catchError, throwError, firstValueFrom } from 'rxjs';
from([5, 12, 30, 7]).pipe(
  filter((n) => n > 6),
  map((n) => n * 2),
  tap((n) => console.log('tap', n)),
).subscribe((n) => console.log('النتيجة', n));
throwError(() => new Error('السيرفر وقع')).pipe(
  catchError((e) => of('بديل: ' + e.message)),
).subscribe((v) => console.log(v));
const first = await firstValueFrom(of('أ', 'ب', 'ج'));
console.log('أول قيمة:', first);`,
          try: R`شغّله بـ [[node]] زي الدرس اللي فات، واكتب الناتج المتوقع الأول. بعدين اكتب service method بترجّع [[http.get<ApiResponse>('/api/products')]] والرد شكله [[{ data: Product[], total: number }]]، وحوّله بـ map لـ [[Product[]]] بس، ولو فيه خطأ رجّع array فاضية.`,
          flag: "script",
          deep: {
            why: R`الـ API نادرًا بيرجّع الشكل اللي الشاشة محتاجاه بالظبط: الداتا جوه [[data]]، والتواريخ strings، وعايز تفلتر أو ترتب. الـ operators بتخليك تعمل التحويل ده في الـ service مرة واحدة، والـ component ياخد الشكل النهائي. و [[catchError]] بيحط خطة للفشل في نفس المكان.`,
            how: R`كل operator بيعمل subscribe على اللي قبله ويطلّع قيم للي بعده. القيمة بتعدّي الخط كله قبل ما اللي بعدها تبدأ، عشان كده «tap 24» وبعدين «النتيجة 24»، مش كل الـ taps الأول.

[[catchError]] لازم يرجّع Observable: [[of(fallback)]] يكمّل بقيمة بديلة، أو [[throwError(() => err)]] يعيد رمي الخطأ (يمكن بعد ما تسجّله). وبعد catchError الـ Observable الأصلي خلص؛ لو ده stream مستمر (بحث)، الخطأ هيقفله، فمكان الـ catchError مهم (الدرس الجاي).

[[tap]] للـ side effects بس: log، أو تحديث loading signal. متغيّرش القيمة جواه.

والترتيب بيفرق: [[filter]] قبل [[map]] غير [[map]] قبل [[filter]]. وفيه operators تانية هتقابلها: [[take(1)]] (خد أول قيمة واقفل)، و [[startWith]]، و [[distinctUntilChanged]]، و [[retry(2)]]، و [[finalize]] (بيشتغل لما يخلص أو يقع أو unsubscribe).`,
            when: R`تحويل ردود الـ API في الـ services، والتعامل مع الأخطاء، وأي stream محتاج فلترة أو تحويل. لو القيمة خلاص بقت signal، استخدم [[computed]] بدل operators.`,
            mistakes: R`تعمل [[.subscribe()]] وجواها تحويلات و ifs بدل ما تحطهم في pipe. و [[catchError(() => [])]] فترجع array مش Observable (بيشتغل بالصدفة لأن array تتحوّل، بس خلي بالك وأوضح [[of([])]]). و [[map]] بيرجّع Observable (زي [[map(q => this.api.search(q))]]) فيبقى عندك Observable جوه Observable: ده محتاج switchMap.`
          },
          lines: [
            R`كل الـ operators بتتعمل import من [[rxjs]] مباشرة.`,
            R`Observable بيطلّع الأرقام دي واحد ورا التاني.`,
            "عدّي الأكبر من 6 بس.",
            "ضاعفهم.",
            "اطبع وسيب القيمة زي ما هي.",
            "اللي بيوصل هنا الناتج النهائي.",
            "Observable بيطلّع خطأ على طول.",
            R`امسك الخطأ وكمّل بقيمة بديلة بـ [[of]].`,
            "هيطبع البديل مش خطأ.",
            R`حوّل لـ Promise وخد أول قيمة ([[firstValueFrom]] بتعمل unsubscribe بعدها).`,
            "أ."
          ],
          sol: R`الناتج (اتشغّل في الـ lab): [[tap 24]]، [[النتيجة 24]]، [[tap 60]]، [[النتيجة 60]]، [[tap 14]]، [[النتيجة 14]]، [[بديل: السيرفر وقع]]، [[أول قيمة: أ]].

الـ 5 اتفلترت. وكل قيمة بتعدّي الخط كله قبل اللي بعدها. والخطأ ماوصلش للـ subscribe كخطأ لأن catchError بدّله.

الـ service:`,
          solCode: R`type ApiResponse = { data: Product[]; total: number };
list() {
  return this.http.get<ApiResponse>('/api/products').pipe(
    map((res) => res.data),
    catchError((err) => {
      console.error('products failed', err);
      return of([] as Product[]);
    }),
  );
}`
        },
        {
          cmd: "switchMap و debounceTime",
          title: "بحث وانت بتكتب: debounceTime و distinctUntilChanged و switchMap",
          desc: R`أشهر pattern في RxJS، وسؤال انترفيو ثابت: input بحث بيكلّم API.

[[debounceTime(300)]]: استنى لحد ما المستخدم يبطّل كتابة ٣٠٠ms. [[distinctUntilChanged()]]: متبعتش لو نفس الكلمة اللي فاتت. [[switchMap(q => api.search(q))]]: لكل كلمة ابعت طلب، ولو جت كلمة جديدة والطلب القديم لسه شغال، الغيه.

ولما تبقى عندك قيمة (كلمة) ومحتاج تعمل بيها Observable (طلب)، دي «higher-order mapping»، وفيه ٤ أنواع: [[switchMap]] (الغي القديم)، و [[mergeMap]] (شغّلهم كلهم مع بعض)، و [[concatMap]] (بالدور)، و [[exhaustMap]] (تجاهل الجديد لحد ما القديم يخلص).`,
          example: R`@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  template: $__bt
    <input [formControl]="q" placeholder="دوّر..." />
    @for (p of results(); track p.id) { <p>{{ p.name }}</p> }
  $__bt,
})
export class Search {
  private api = inject(ProductsApi);
  q = new FormControl('', { nonNullable: true });
  results = toSignal(
    this.q.valueChanges.pipe(
      debounceTime(300),
      map((s) => s.trim()),
      distinctUntilChanged(),
      switchMap((s) => (s.length < 2 ? of([]) : this.api.list(s).pipe(catchError(() => of([]))))),
    ),
    { initialValue: [] as Product[] },
  );
}`,
          try: R`من غير API، شغّل النسخة دي بـ node واتوقع الناتج: Subject اسمه [[typed$]] عليه نفس الـ pipe، و [[fakeApi(q)]] بيطبع «طلب: q» ويرجّع [[timer(400).pipe(map(() => 'نتايج ' + q))]]. ابعت [[l]] و [[la]] و [[lap]] كل ١٠٠ms، وبعدين [[laptop]] عند 800ms، و [[lap]] عند 1150ms. بعدين بدّل switchMap بـ mergeMap وقارن.`,
          flag: "script",
          deep: {
            why: R`من غير الـ pattern ده: كل حرف = طلب (١٠ طلبات لكلمة واحدة)، والردود ممكن توصل بترتيب غلط: طلب «lap» يتأخر ويوصل بعد طلب «laptop»، فالشاشة تعرض نتايج كلمة قديمة وهو كاتب كلمة جديدة. ده race condition حقيقي بيحصل في الإنتاج. ٣ operators بيحلوه كله.`,
            how: R`[[valueChanges]] بيطلّع كل تغيير. [[debounceTime]] بيعمل timer مع كل قيمة، ولو جت قيمة قبل ما يخلص يبدأ من الأول، فبيعدّي بس القيمة اللي بعدها سكوت ٣٠٠ms. ده نفس [[debounce]] في «تاب JavaScript» بس كـ operator.

[[switchMap]] بياخد القيمة ويرجّع Observable (الطلب)، ويعمل subscribe عليه. لما قيمة جديدة توصل، بيعمل unsubscribe من القديم (والـ HttpClient بيلغي الطلب فعلًا، هتشوفه canceled في Network) ويبدأ الجديد. فمستحيل رد قديم يوصل.

مكان [[catchError]] مهم: هو جوه الـ switchMap على الطلب نفسه. لو حطيته برا بعد switchMap، أول خطأ هيقفل الـ stream كله والبحث يبطّل يشتغل خالص.

اختيار النوع: switchMap للقراية (بحث، فلتر، تفاصيل حسب id). [[concatMap]] للحفظ بالترتيب (autosave). [[exhaustMap]] لزرار submit (تجاهل الضغطات لحد ما الطلب يخلص). [[mergeMap]] لما الطلبات مستقلة وعايزهم متوازيين (رفع ملفات).`,
            when: R`أي input بيكلّم API، و autocomplete، وفلاتر بتتغير بسرعة. ولو الـ source signal مش Observable: [[toObservable(this.query)]] الأول، أو [[httpResource]] (فيه switch من جوه) مع [[debounced]] signal لو محتاج debounce.`,
            mistakes: R`[[mergeMap]] في البحث: الردود بتوصل بأي ترتيب. و [[switchMap]] في POST بيحفظ: ضغطتين ورا بعض = الأول ممكن يتلغي من الـ client بس السيرفر يكون استلمه. و catchError برا الـ switchMap فالبحث يموت بعد أول خطأ. وفي الانترفيو: «الفرق بين switchMap و mergeMap و concatMap و exhaustMap» سؤال شبه أكيد.`
          },
          lines: [
            "الـ decorator.",
            "الـ selector.",
            R`[[ReactiveFormsModule]] عشان [[[formControl]]].`,
            "بداية الـ template.",
            "input مربوط بـ control لوحده.",
            "النتايج من signal.",
            "قفلة الـ template.",
            "قفلة الـ decorator.",
            "الكلاس.",
            "الـ API service.",
            R`control نوعه [[string]].`,
            R`[[toSignal]] بيحوّل الـ stream كله لـ signal.`,
            "كل تغيير في الـ input.",
            "استنى لحد ما يبطّل كتابة ٣٠٠ms.",
            "شيل المسافات.",
            "متعيدش نفس الكلمة.",
            R`أقل من حرفين: فاضي. غير كده: اطلب، والغي القديم، ولو فشل رجّع فاضي من غير ما تموّت الـ stream.`,
            "قفلة الـ pipe.",
            R`قيمة لحد أول نتيجة، والنوع صريح عشان [[of([])]].`,
            "قفلة toSignal.",
            "قفلة."
          ],
          sol: R`مع switchMap (اتشغّل في الـ lab):

[[طلب: lap]] ← [[نتايج "lap"]] ← [[طلب: laptop]] ← [[طلب: lap]] ← [[نتايج "lap"]].

[[l]] و [[la]] مابقوش طلبات خالص (debounce). وطلب [[laptop]] اتبعت بس نتيجته عمرها ما ظهرت: [[lap]] وصلت وهو شغال فاتلغى. ولاحظ إن [[lap]] التانية عدّت distinctUntilChanged لأن اللي قبلها مباشرة كانت [[laptop]].

مع mergeMap: [[طلب: lap]] ← [[نتايج "lap"]] ← [[طلب: laptop]] ← [[طلب: lap]] ← [[نتايج "laptop"]] ← [[نتايج "lap"]]. نتيجة laptop ظهرت رغم إن المستخدم بقى كاتب lap. هنا الترتيب طلع صح بالصدفة لأن كل الطلبات ٤٠٠ms؛ لو laptop اتأخر أكتر، كانت هتظهر آخر حاجة وتغطي النتيجة الصح.`,
          solCode: R`import { Subject, debounceTime, distinctUntilChanged, switchMap, timer, map } from 'rxjs';
const typed$ = new Subject<string>();
const fakeApi = (q: string) => { console.log('  طلب:', q); return timer(400).pipe(map(() => $__btنتايج "$__{q}"$__bt)); };
typed$.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap((q) => fakeApi(q)),
).subscribe((r) => console.log(r));
['l', 'la', 'lap'].forEach((k, i) => setTimeout(() => typed$.next(k), i * 100));
setTimeout(() => typed$.next('laptop'), 800);
setTimeout(() => typed$.next('lap'), 1150);`
        },
        {
          cmd: "async pipe و toSignal",
          title: "تعرض Observable في الـ template من غير subscribe بإيدك",
          desc: R`٣ طرق تستهلك Observable في component من غير ما تنسى الـ unsubscribe:

[[async]] pipe: [[{{ user$ | async }}]] أو [[@for (p of (products$ | async) ?? []; ...)]]. بتعمل subscribe وتعمل unsubscribe لما الـ component يتقفل. ده الشكل اللي هتلاقيه في كل مشروع قديم.

[[toSignal(obs$, { initialValue })]] من [[@angular/core/rxjs-interop]]: بيحوّله لـ signal تستخدمها في الـ template و computed. ده الشكل الحديث.

[[takeUntilDestroyed()]]: لو لازم تعمل subscribe بإيدك (عشان side effect)، حطه في الـ pipe وهيقفل لوحده مع الـ component.

والعكس: [[toObservable(signal)]] لو عندك signal ومحتاج operators.`,
          example: R`@Component({
  selector: 'app-async-demo',
  imports: [AsyncPipe],
  template: $__bt
    @for (p of (products$ | async) ?? []; track p.id) { <p>{{ p.name }}</p> }
    <p>{{ products().length }} منتج - {{ seconds() }} ثانية</p>
  $__bt,
})
export class AsyncDemo {
  private api = inject(ProductsApi);
  products$ = this.api.list();
  products = toSignal(this.api.list(), { initialValue: [] });
  seconds = signal(0);
  constructor() {
    interval(1000).pipe(takeUntilDestroyed()).subscribe(() => this.seconds.update((s) => s + 1));
  }
}`,
          try: R`حط الـ component ده في صفحة، وافتح Network: كام طلب لـ [[/api/products]]؟ ليه؟ بعدين اتنقل لصفحة تانية وارجع، وحط [[console.log]] في الـ subscribe بتاع الـ interval: بيقف لما تخرج؟ جرّب تشيل [[takeUntilDestroyed()]] وكرر.`,
          flag: "script",
          deep: {
            why: R`أكتر bug في كود Angular القديم: [[subscribe]] في [[ngOnInit]] من غير unsubscribe، فكل مرة تفتح الصفحة يتضاف subscriber جديد، وبعد ١٠ مرات فيه ١٠ callbacks شغالين. الطرق التلاتة دي بتربط عمر الـ subscription بعمر الـ component أوتوماتيك.`,
            how: R`[[async]] pipe بتعمل subscribe أول ما الـ template يترسم، وبترجّع [[null]] لحد أول قيمة (عشان كده [[?? []]])، وبتعمل [[markForCheck]] مع كل قيمة جديدة فبتشتغل مع OnPush، وبتعمل unsubscribe في الـ destroy.

كل [[| async]] = subscribe منفصل. لو كتبت [[products$ | async]] في مكانين على HTTP Observable = طلبين. الحل: [[@let products = products$ | async;]] مرة واحدة، أو [[toSignal]].

[[toSignal]] بيعمل subscribe فورًا (لازم في injection context) ويعمل unsubscribe مع الـ destroy. من غير [[initialValue]]، النوع بيبقى [[T | undefined]]. ولو الـ Observable بيطلّع قيمة sync (زي BehaviorSubject) استخدم [[requireSync: true]]. ولو الـ Observable وقع بخطأ، قراية الـ signal بترمي الخطأ.

[[takeUntilDestroyed()]] بيستخدم [[DestroyRef]]: من غير argument لازم injection context (constructor)، وبرا منه اديله [[this.destroyRef]]. وده بديل الـ pattern القديم [[private destroy$ = new Subject<void>()]] مع [[takeUntil(this.destroy$)]] و [[ngOnDestroy]] (المستوى ٣).`,
            when: R`[[toSignal]] في الكود الجديد لأي Observable عايز تعرضه. [[async]] pipe هتفضل تقابلها وتكتبها في مشاريع قديمة. و [[takeUntilDestroyed]] لأي subscribe بإيدك عشان side effect (مثلًا [[valueChanges]] بتحفظ draft).`,
            mistakes: R`[[this.api.list().subscribe(p => this.products = p)]] في component: مع zoneless و OnPush (الافتراضي في 22) الشاشة مش هتتحدّث لأن [[products]] خاصية عادية، غير كده unsubscribe منسي. وتستخدم [[| async]] على نفس الـ HTTP مرتين. و [[toSignal]] جوه method: NG0203. و [[takeUntilDestroyed()]] مش آخر operator فـ operators بعده (زي switchMap) تفضل شغالة.`
          },
          lines: [
            "الـ decorator.",
            "الـ selector.",
            R`[[AsyncPipe]] لازم تتعمل import.`,
            "بداية الـ template.",
            R`[[async]] بترجّع null لحد أول رد، فبنحط [[?? []]].`,
            "من الـ signal ومن الـ interval.",
            "قفلة الـ template.",
            "قفلة الـ decorator.",
            "الكلاس.",
            "الـ API.",
            "Observable خام، الـ async pipe هتعمل subscribe.",
            R`[[toSignal]]: subscribe دلوقتي، و unsubscribe مع الـ destroy.`,
            "signal بتعدّ الثواني.",
            "الـ constructor injection context.",
            R`subscribe بإيدنا، بس [[takeUntilDestroyed]] بيقفله مع الـ component.`,
            "قفلة.",
            "قفلة."
          ],
          sol: R`في Network: طلبين لـ [[/api/products]]، واحد من [[| async]] وواحد من [[toSignal]]، لأن كل واحد عمل subscribe لوحده على Observable بارد. ولو الـ template فيه [[| async]] مرتين، هيبقوا ٣.

مع [[takeUntilDestroyed()]]: الـ log بيقف أول ما تخرج من الصفحة، ولما ترجع بيبدأ من 0. من غيره: بعد ما تخرج الـ log مكمّل، ولما ترجع هتلاقي سطرين كل ثانية (القديم والجديد)، وكل مرة تدخل وتخرج بيزيدوا. ده الـ leak.

ملحوظة من الـ lab: الـ component ده بيعمل طلب HTTP في الـ constructor، ولما التطبيق كان عليه SSR و prerender، الـ build وقع بـ Unable to handle request: '/api/products?q=' لأن الـ URL نسبي ومفيش سيرفر وقت الـ build. ده موضوع درس SSR في المستوى ٣.`
        }
      ]
    },
    {
      t: "الـ state",
      l: 2,
      n: "service بـ signals للأغلب، و NgRx Signal Store لما التطبيق يكبر",
      items: [
        {
          cmd: "store بـ service و signals",
          title: "تعمل store بسيط: service فيها signals خاصة و methods",
          desc: R`في معظم تطبيقات Angular الحديثة، الـ state المشترك مش محتاج مكتبة: service فيها signals [[private]]، وبتطلّعها للقراية بس بـ [[asReadonly()]] و [[computed]]، والتعديل عن طريق methods بس.

ده نفس فكرة Zustand في «تاب React»: store صغير لكل domain (منتجات، سلة، مستخدم). والـ components بتعمل [[inject(ProductsStore)]] وتقرا [[store.items()]] وتنادي [[store.load()]].`,
          example: R`@Service()
export class ProductsStore {
  private api = inject(ProductsApi);
  private readonly _items = signal<Product[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);
  readonly items = this._items.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly cheap = computed(() => this._items().filter((p) => p.price < 100));
  async load() {
    this._loading.set(true);
    this._error.set(null);
    try {
      this._items.set(await firstValueFrom(this.api.list()));
    } catch {
      this._error.set('مقدرناش نجيب المنتجات');
    } finally {
      this._loading.set(false);
    }
  }
}`,
          try: R`استخدم الـ store في صفحة: نادي [[store.load()]] في الـ constructor، واعرض loading و error و items. بعدين زوّد [[remove(id)]] بتشيل المنتج من الشاشة فورًا (optimistic) وتبعت DELETE، ولو فشل ترجّعه.`,
          flag: "script",
          deep: {
            why: R`الـ state اللي بيعيش في component بيموت معاه: تخرج من صفحة المنتجات وترجع، تحمّل من الأول. والـ state اللي كذا component محتاجه (السلة في الهيدر وفي صفحة الدفع) لازم يعيش برا. الـ service singleton بتعيش طول عمر التطبيق. والـ signals الخاصة مع methods بتضمن إن كل تعديل بيعدّي من مكان واحد، فلما يحصل bug تعرف تدوّر فين.`,
            how: R`[[asReadonly()]] بترجّع نفس الـ signal من غير [[set]] و [[update]]، فأي component يحاول [[store.items.set([])]] يطلعله خطأ compile. و [[computed]] للقيم المشتقة، ومتخزنش حاجة ممكن تتحسب.

[[firstValueFrom]] بيحوّل الـ HTTP لـ Promise عشان [[async/await]] أسهل تتقرا هنا من subscribe. والـ [[finally]] بيضمن إن loading يرجع false في الحالتين.

الـ optimistic update: احفظ النسخة القديمة، عدّل الشاشة فورًا، ابعت الطلب، ولو فشل رجّع القديم. نفس فكرة [[optimistic update]] في «تاب React».

ولو محتاج state خاص بصفحة معينة ويتمسح لما تخرج: شيل [[@Service()]] وخليه [[@Injectable()]] وحطه في [[providers: [ProductsStore]]] بتاع الـ component أو الـ route، فكل مرة تفتح الصفحة يتعمل store جديد.`,
            when: "أغلب التطبيقات، وأغلب الـ state. ابدأ بيه، وانقل لـ Signal Store أو NgRx لما يبقى عندك stores كتير محتاجة نفس الشكل (loading/error/entities) أو الفريق كبير ومحتاج قواعد موحدة.",
            mistakes: R`تطلّع الـ signal نفسه public فأي component يعدّل فيه. وتخزن [[cheapCount]] كـ signal وتنسى تحدّثها. وتعمل state لكل حاجة حتى الحاجة اللي component واحد بس محتاجها: خليها في الـ component. وتعمل [[load()]] في كل component بيحتاج المنتجات فيبقى فيه ٤ طلبات: خلي الـ store يعرف إنه حمّل خلاص، أو استخدم httpResource في الـ store.`
          },
          lines: [
            "singleton لكل التطبيق.",
            "الكلاس.",
            "الـ API.",
            R`البيانات، [[private]] ومحدش من برا يعدّلها.`,
            "حالة التحميل.",
            "رسالة الخطأ.",
            R`نفس الـ signal بس للقراية.`,
            "نفس الكلام.",
            "نفس الكلام.",
            "قيمة مشتقة.",
            "التحميل.",
            "ابدأ.",
            "امسح أي خطأ قديم.",
            "حاول.",
            R`[[firstValueFrom]] بتحوّل الـ HTTP لـ Promise.`,
            "لو فشل.",
            "رسالة للمستخدم.",
            "في الحالتين.",
            "خلّص.",
            "قفلة.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`الصفحة بتبين loading وبعدين المنتجات، ولو الـ API واقع الرسالة. ولو خرجت ورجعت، المنتجات بتظهر على طول من الـ store (وممكن تتحدّث تاني لو ناديت load).

الـ remove (اتعمله build في الـ lab، والـ store نفسه عدّى اختبار بـ API وهمي):`,
          solCode: R`async remove(id: number) {
  const before = this._items();
  this._items.update((list) => list.filter((p) => p.id !== id));
  try {
    await firstValueFrom(this.api.remove(id));
  } catch {
    this._items.set(before);
    this._error.set('الحذف فشل، رجّعنا المنتج');
  }
}`
        },
        {
          cmd: "NgRx Signal Store",
          title: "NgRx Signal Store: withState و withComputed و withMethods",
          desc: R`لما التطبيق يكبر وعندك ١٥ store كلهم نفس الشكل، فيه [[@ngrx/signals]]: بتبني الـ store من قطع: [[withState]] للبيانات، و [[withComputed]] للمشتقات، و [[withMethods]] للتعديل بـ [[patchState]]، و [[withHooks]] لـ onInit.

الناتج service عادية بتعمل لها [[inject(CartStore)]]، وكل خاصية في الـ state بتبقى signal: [[store.items()]].

وفي مشاريع كتير أقدم هتلاقي NgRx Store «الكلاسيكي»: actions و reducers و effects و selectors، زي Redux. ده تقيل بس كان المعيار في الشركات الكبيرة، فلو شفت [[createAction]] و [[createReducer]] و [[createEffect]] يبقى ده.`,
          example: R`import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
type CartItem = { id: number; name: string; price: number; qty: number };
export const CartStore = signalStore(
  { providedIn: 'root' },
  withState({ items: [] as CartItem[], coupon: null as string | null }),
  withComputed(({ items }) => ({
    count: computed(() => items().reduce((s, i) => s + i.qty, 0)),
    total: computed(() => items().reduce((s, i) => s + i.price * i.qty, 0)),
  })),
  withMethods((store) => ({
    add(item: CartItem) { patchState(store, (s) => ({ items: [...s.items, item] })); },
    applyCoupon(code: string) { patchState(store, { coupon: code }); },
    clear() { patchState(store, { items: [], coupon: null }); },
  })),
);
// في component: store = inject(CartStore); ← {{ store.total() }}`,
          try: R`سطّب [[npm i @ngrx/signals]] واعمل الـ store. زوّد منتج بـ qty 3 وسعر 10 واطبع [[count()]] و [[total()]]. بعدين زوّد method اسمها [[changeQty(id, qty)]]، و [[withHooks({ onInit(store) { ... } })]] بتقرا السلة من localStorage.`,
          flag: "script",
          deep: {
            why: R`الـ service اليدوي ممتاز لحد ما يبقى عندك stores كتير كل واحد بيكتب loading و error و setter بطريقته. الـ Signal Store بيدي شكل موحد، وقطع تقدر تعيد استخدامها (feature زي [[withEntities]] لـ CRUD، أو feature بتاعتك لـ loading)، و state مش بيتعدّل غير بـ [[patchState]]. وهو أخف بكتير من NgRx Store الكلاسيكي: مفيش actions و reducers لكل حاجة.`,
            how: R`[[signalStore(...)]] بترجّع كلاس (مش instance)، و [[{ providedIn: 'root' }]] بيخليه singleton. من غيرها بتحطه في [[providers]] بتاع component فيبقى خاص بيه.

كل مفتاح في [[withState]] بيبقى signal للقراية بس (deep signals للـ objects). [[patchState(store, partial)]] بيدمج، أو بياخد دالة بتاخد الـ state القديم. والـ state لازم يتعامل immutable، والـ store في dev mode بيعمل freeze عشان يمسك الـ mutation.

كل [[with...]] بتشوف اللي قبلها: [[withComputed]] بتاخد الـ state signals، و [[withMethods]] بتاخد الـ store كله. والنسخة 22 ماشية مع Angular 22 (peer [[@angular/core ^22]]).

للـ async فيه [[rxMethod]] من [[@ngrx/signals/rxjs-interop]] (بتاخد Observable pipeline زي switchMap) أو ببساطة async methods.

والكلاسيكي: component بيعمل [[store.dispatch(addToCart({ item }))]]، والـ reducer بيرجّع state جديد، والـ effect بيسمع للـ action ويكلّم API ويعمل dispatch لـ success أو failure، والـ component بيقرا بـ [[store.select(selectTotal)]] (Observable) أو [[selectSignal]].`,
            when: "تطبيق كبير فيه stores كتير أو فريق محتاج قواعد. لتطبيق صغير أو متوسط، service بـ signals كفاية. والـ NgRx الكلاسيكي: اعرف تقراه وتعدّل فيه لأنه في مشاريع كتير، بس متبدأش بيه مشروع جديد النهارده غالبًا.",
            mistakes: R`تعدّل [[store.items().push(x)]]: ممنوع ومش هيتحس. وتنسى [[providedIn: 'root']] وتفتكره singleton فكل component ياخد store جديد (أو NG0201 لو مش في providers). وتحط كل حاجة في store حتى state الفورم. وفي الانترفيو: «NgRx بيحل إيه؟» single source of truth وتدفق بيانات متوقع وأدوات debug، والتمن boilerplate.`
          },
          lines: [
            R`[[computed]] من Angular.`,
            "القطع من NgRx.",
            "نوع عنصر السلة.",
            "الـ store كلاس بيتبني من قطع.",
            "singleton في الـ root.",
            R`الـ state الأولي، وكل مفتاح بيبقى signal: [[store.items()]].`,
            "قيم مشتقة: بتاخد الـ signals.",
            "مجموع الكميات.",
            "الإجمالي.",
            "قفلة.",
            "الـ methods: بتاخد الـ store.",
            R`[[patchState]] بدالة: state جديد من القديم.`,
            R`[[patchState]] بـ object: بيدمجه.`,
            "reset.",
            "قفلة.",
            "قفلة الـ store."
          ],
          sol: R`بعد [[add({ id: 1, name: 'قلم', price: 10, qty: 3 })]]: [[count()]] بـ 3 و [[total()]] بـ 30، وبعد [[clear()]] الـ [[items()]] فاضية. ده اختبار عدّى في الـ lab على [[@ngrx/signals@22.0.1]] مع Angular 22.2.

الإضافات:`,
          solCode: R`import { withHooks } from '@ngrx/signals';
// جوه withMethods:
changeQty(id: number, qty: number) {
  patchState(store, (s) => ({ items: s.items.map((i) => (i.id === id ? { ...i, qty } : i)) }));
},
// قطعة جديدة في الآخر:
withHooks({
  onInit(store) {
    const saved = localStorage.getItem('cart');
    if (saved) patchState(store, { items: JSON.parse(saved) });
  },
}),`
        }
      ]
    },
    {
      t: "Material و CDK واللغات",
      l: 2,
      n: "مكونات جاهزة من Angular Material، وأدوات CDK، و i18n، و RTL للعربي",
      items: [
        {
          cmd: "Angular Material",
          title: "تستخدم components جاهزة: زراير و form fields و snackbar",
          desc: R`Angular Material مكتبة components رسمية من فريق Angular بتصميم Material 3: زراير، و inputs، و tables، و dialogs، و datepicker، و menus، وكلها accessible وشغالة RTL.

بتتضاف بـ [[ng add @angular/material]]: بيسطّب ويعمل ملف theme ويضيف الخطوط. وكل component بتعمل import للـ module أو الـ component بتاعه في [[imports]].

في الشركات المصرية هتلاقي Material، أو PrimeNG (شائع جدًا في الـ enterprise لأن عنده tables و components كتير جاهزة)، أو Bootstrap.`,
          example: R`@Component({
  selector: 'app-product-form',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule],
  template: $__bt
    <mat-form-field appearance="outline">
      <mat-label>اسم المنتج</mat-label>
      <input matInput [value]="name()" (input)="name.set($any($event.target).value)" />
      <mat-hint>٣ حروف على الأقل</mat-hint>
    </mat-form-field>
    <button matButton="filled" (click)="save()"><mat-icon>save</mat-icon> حفظ</button>
    <button matButton="outlined">إلغاء</button>
  $__bt,
})
export class ProductForm {
  private snack = inject(MatSnackBar);
  name = signal('');
  save() { this.snack.open('اتحفظ', 'تمام', { duration: 2000 }); }
}`,
          try: R`اعمل [[ng add @angular/material]] وبص على الملفات اللي اتغيرت. حط الـ component ده، وبعدين غيّر [[color-scheme: light]] في [[material-theme.scss]] لـ [[dark]]. وفي الآخر اعمل [[MatDialog]] بيسأل «متأكد؟» قبل الحذف.`,
          flag: "script",
          deep: {
            why: "بناء datepicker أو table فيها sort و pagination أو dialog accessible من الصفر بياخد أسابيع، وغالبًا هيبقى فيه مشاكل keyboard و screen reader. Material بيديك ده جاهز ومتختبر، وبنفس نسخة Angular، ومتوافق مع الـ updates.",
            how: R`[[ng add]] (في الـ lab على 22.2) عمل [[src/material-theme.scss]] فيه [[mat.theme((color: (primary: mat.$azure-palette), typography: Roboto, density: 0))]]، وضافه في [[angular.json]] styles، وضاف لينكات Roboto و Material Symbols في [[index.html]].

الـ theme مبني على CSS variables ([[--mat-sys-primary]] و [[--mat-sys-surface]])، فتقدر تستخدمها في CSS بتاعك عشان ألوانك تمشي مع الـ theme، والـ dark mode بيبقى بـ [[color-scheme]].

الزراير في النسخ الحديثة بـ [[matButton="filled"]] و [[matButton="outlined"]] و [[matButton="tonal"]]، وفي الكود القديم هتلاقي [[mat-raised-button]] و [[mat-flat-button]]، ولسه شغالين.

[[MatSnackBar]] و [[MatDialog]] services بتعمل لها inject وتفتح بيها. [[dialog.open(ConfirmDialog, { data })]] بيرجّع ref، و [[afterClosed()]] Observable بالنتيجة.

[[mat-form-field]] مع [[matInput]] بيشتغل مع reactive forms وبيعرض [[<mat-error>]] لوحده لما الحقل invalid و touched.`,
            when: "لوحات تحكم وأنظمة داخلية وأي تطبيق مش محتاج تصميم براند مميز جدًا. لو الديزاين مخصوص خالص، CDK لوحده (الدرس الجاي) + CSS بتاعك، أو Tailwind.",
            mistakes: R`تنسى تعمل import للـ module فالـ tag يظهر كـ HTML عادي من غير شكل، أو NG8001. وتعدّل شكل Material بـ [[::ng-deep]] وselectors داخلية بتتكسر مع كل update: استخدم الـ tokens والـ theme API. وتخلط Material و PrimeNG و Bootstrap في نفس المشروع: bundle تقيل وشكل متلخبط.`
          },
          lines: [
            "الـ decorator.",
            "الـ selector.",
            "كل component من Material بتعمل import للي محتاجه.",
            "بداية الـ template.",
            "حاوية الحقل بشكل outline.",
            "العنوان اللي بيطلع فوق لما تكتب.",
            R`[[matInput]] بيخلي الـ input يشتغل جوه الحاوية.`,
            "سطر مساعدة تحت الحقل.",
            "قفلة.",
            R`زرار filled (الأساسي) وجواه أيقونة.`,
            "زرار outlined.",
            "قفلة الـ template.",
            "قفلة الـ decorator.",
            "الكلاس.",
            "الـ snackbar service.",
            "اسم المنتج.",
            "رسالة صغيرة تحت، بتختفي بعد ثانيتين.",
            "قفلة."
          ],
          sol: R`[[ng add]] بيطبع [[CREATE src/material-theme.scss]] و [[UPDATE angular.json]] و [[UPDATE src/index.html]] و [[UPDATE package.json]] ([[@angular/material]] و [[@angular/cdk]] بنفس نسخة Angular، 22.2 في الـ lab). الحقل بيظهر بإطار، والـ label بيطلع فوق لما تكتب، والزرار بيطلّع snackbar «اتحفظ».

مع [[color-scheme: dark]] الخلفية والألوان كلها بتقلب، و [[light dark]] بيتبع إعدادات الجهاز.

الـ dialog:`,
          solCode: R`@Component({
  imports: [MatDialogModule, MatButtonModule],
  template: $__bt
    <h2 mat-dialog-title>متأكد؟</h2>
    <mat-dialog-content>هتحذف {{ data.name }}</mat-dialog-content>
    <mat-dialog-actions>
      <button matButton [mat-dialog-close]="false">لأ</button>
      <button matButton="filled" [mat-dialog-close]="true">احذف</button>
    </mat-dialog-actions>
  $__bt,
})
export class ConfirmDialog { data = inject<{ name: string }>(MAT_DIALOG_DATA); }
// في الصفحة:
private dialog = inject(MatDialog);
remove(p: Product) {
  this.dialog.open(ConfirmDialog, { data: p }).afterClosed()
    .subscribe((ok) => { if (ok) this.store.remove(p.id); });
}`
        },
        {
          cmd: "CDK",
          title: "CDK: drag and drop و breakpoints و overlay من غير شكل Material",
          desc: R`الـ CDK (Component Dev Kit) هو الأساس اللي Material مبني عليه، بس من غير أي تصميم: سلوكيات جاهزة تركّب عليها شكلك. أشهرهم:

[[@angular/cdk/drag-drop]]: ترتيب list بالسحب أو نقل بين lists (Kanban). و [[@angular/cdk/layout]]: [[BreakpointObserver]] يقولك الشاشة موبايل ولا لأ. و [[@angular/cdk/overlay]]: عناصر عايمة (dropdown و tooltip). و [[@angular/cdk/a11y]]: focus trap و live announcer. و [[@angular/cdk/bidi]]: اتجاه RTL. و [[@angular/cdk/scrolling]]: virtual scroll للستات الطويلة.`,
          example: R`@Component({
  selector: 'app-board',
  imports: [CdkDropList, CdkDrag],
  template: $__bt
    <ul cdkDropList (cdkDropListDropped)="drop($event)" [class.compact]="isHandset()">
      @for (t of tasks(); track t) { <li cdkDrag>{{ t }}</li> }
    </ul>
  $__bt,
})
export class Board {
  tasks = signal(['تصميم', 'تنفيذ', 'اختبار', 'رفع']);
  isHandset = toSignal(
    inject(BreakpointObserver).observe(Breakpoints.Handset).pipe(map((r) => r.matches)),
    { initialValue: false },
  );
  drop(e: CdkDragDrop<string[]>) {
    this.tasks.update((list) => {
      const copy = [...list];
      moveItemInArray(copy, e.previousIndex, e.currentIndex);
      return copy;
    });
  }
}`,
          try: R`حط الـ board واسحب العناصر. صغّر الشاشة (DevTools device mode) وشوف [[isHandset()]] بيتغير. بعدين اعمل عمودين («لسه» و «خلص») وانقل بينهم بـ [[transferArrayItem]] و [[cdkDropListConnectedTo]].`,
          flag: "script",
          deep: {
            why: "السحب والإفلات، والـ dropdown اللي بيتحط صح حتى عند حافة الشاشة، والـ focus trap جوه modal: كلها حاجات شكلها سهلة وتفاصيلها كتير جدًا (touch، و scroll، و keyboard، و screen readers). الـ CDK بيحلهم من غير ما يفرض عليك شكل، فينفع مع تصميم الشركة أو Tailwind.",
            how: R`[[cdkDropList]] حاوية، و [[cdkDrag]] كل عنصر بيتسحب. لما تفلت، بيطلع [[(cdkDropListDropped)]] ومعاه [[previousIndex]] و [[currentIndex]]. الـ CDK مش بيغيّر الـ array بتاعتك: انت اللي بتعيد الترتيب. [[moveItemInArray]] بتعدّل الـ array نفسها (mutable)، عشان كده عملنا نسخة الأول وبعدين رجّعناها في [[update]] علشان الـ signal تحس.

[[BreakpointObserver.observe()]] بيرجّع Observable بيطلّع كل ما الـ media query تتغير، و [[Breakpoints.Handset]] media queries جاهزة. [[toSignal]] بيحوّله signal.

الـ drag-drop بيحط classes زي [[cdk-drag-preview]] و [[cdk-drag-placeholder]] و [[cdk-drag-animating]] تقدر تستايلها.`,
            when: "Kanban و ترتيب قوايم و رفع ملفات بالسحب، وأي layout بيتغير بين موبايل وديسكتوب في الكود مش CSS بس، و dropdowns و tooltips بشكل خاص، و virtual scroll لقوايم فيها آلاف العناصر.",
            mistakes: R`تفتكر إن الـ drop بيغيّر الترتيب لوحده فتستغرب إن العنصر بيرجع مكانه. و [[moveItemInArray(this.tasks(), ...)]] على الـ array اللي جوه الـ signal مباشرة: اتعدّلت بس الـ signal محستش. وتستخدم BreakpointObserver لحاجة CSS media query تحلها أبسط.`
          },
          lines: [
            "الـ decorator.",
            "الـ selector.",
            "directives الـ drag-drop.",
            "بداية الـ template.",
            R`الحاوية، والحدث لما تفلت، و class لو موبايل.`,
            R`كل عنصر بيتسحب. [[track t]] لأن العناصر strings مختلفة.`,
            "قفلة.",
            "قفلة الـ template.",
            "قفلة الـ decorator.",
            "الكلاس.",
            "المهام.",
            R`signal من Observable بتاع الـ breakpoints.`,
            R`[[true]] لو الشاشة موبايل.`,
            "لحد أول قيمة.",
            "قفلة.",
            "لما يفلت.",
            "حدّث الـ signal.",
            "نسخة جديدة.",
            "حرّك العنصر في النسخة.",
            "رجّعها كقيمة جديدة.",
            "قفلة.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`السحب بيشتغل بالماوس واللمس، والعنصر بيتحط مكانه الجديد. ولو شلت [[drop]] (أو نسيت تحدّث الـ signal)، العنصر بيرجع مكانه القديم بعد الإفلات، لأن الـ CDK مش بيلمس بياناتك. [[isHandset()]] بتبقى true في device mode بتاع موبايل.

عمودين:`,
          solCode: R`<div cdkDropList #todoList="cdkDropList" [cdkDropListData]="todo()" [cdkDropListConnectedTo]="[doneList]" (cdkDropListDropped)="drop($event)">
  @for (t of todo(); track t) { <div cdkDrag>{{ t }}</div> }
</div>
<div cdkDropList #doneList="cdkDropList" [cdkDropListData]="done()" [cdkDropListConnectedTo]="[todoList]" (cdkDropListDropped)="drop($event)">
  @for (t of done(); track t) { <div cdkDrag>{{ t }}</div> }
</div>
// الكلاس: todo = signal([...]); done = signal<string[]>([]);
drop(e: CdkDragDrop<string[]>) {
  if (e.previousContainer === e.container) {
    moveItemInArray(e.container.data, e.previousIndex, e.currentIndex);
  } else {
    transferArrayItem(e.previousContainer.data, e.container.data, e.previousIndex, e.currentIndex);
  }
  // الـ arrays اتعدّلت في مكانها، فنسخة جديدة عشان الـ signals تحس
  this.todo.set([...this.todo()]);
  this.done.set([...this.done()]);
}`
        },
        {
          cmd: "i18n",
          title: "تترجم التطبيق بـ i18n و $localize، أو بمكتبة runtime",
          desc: R`Angular فيه ترجمة رسمية ([[@angular/localize]]): بتعلّم النصوص في الـ template بـ [[i18n]]، وفي الكود بـ [[$localize]]، وبتطلّعهم في ملف XLIFF بـ [[ng extract-i18n]]، وبتترجم الملف، و [[ng build --localize]] بيطلّع نسخة كاملة لكل لغة ([[dist/.../ar]] و [[dist/.../en-US]]).

ده سريع جدًا (الترجمة متحطة وقت الـ build)، بس تغيير اللغة = تحميل نسخة تانية من الموقع.

البديل الشائع جدًا في الشركات: مكتبة runtime زي Transloco أو ngx-translate: ملفات JSON وبتبدّل اللغة من غير reload، زي react-i18next في «تاب React».`,
          example: R`ng add @angular/localize
# في الـ template:
<h1 i18n="@@homeTitle">Welcome to our shop</h1>
<p i18n>{count(), plural, =0 {No items} =1 {One item} other {{{count()}} items}}</p>
<button i18n-title title="Save your cart">Save</button>
# في الكود:
alert($localize$__bt:@@cartSaved:Your cart was saved$__bt);
ng extract-i18n --output-path src/locale
cp src/locale/messages.xlf src/locale/messages.ar.xlf
# angular.json جوه المشروع: "i18n": { "sourceLocale": "en-US", "locales": { "ar": "src/locale/messages.ar.xlf" } }
ng build --localize`,
          try: R`اعمل الخطوات دي، وافتح [[messages.ar.xlf]] وزوّد [[<target>...</target>]] بعد كل [[<source>]]، وضيف [[target-language="ar"]] على [[<file>]]. اعمل [[ng build --localize]] وافتح [[dist/shop/browser/ar/index.html]]: إيه اللي اتغير في [[<html>]]؟`,
          deep: {
            why: R`تطبيقات كتير في مصر والخليج لازم تبقى عربي وإنجليزي. لو النصوص مكتوبة في الـ template مباشرة، الترجمة بعدين بتبقى كابوس. التعليم بـ [[i18n]] من الأول بيخلي أي نص قابل للترجمة، والـ plural بيتعامل مع قواعد كل لغة (العربي فيه zero و one و two و few و many و other).`,
            how: R`[[ng add @angular/localize]] بيضيف [[@angular/localize/init]] في الـ polyfills والأنواع في tsconfig. [[ng extract-i18n]] بيقرا كل [[i18n]] و [[$localize]] ويعمل [[messages.xlf]]، وكل رسالة ليها id: من [[@@homeTitle]] لو كتبته (ثابت، أحسن)، أو hash من النص (بيتغير لو غيّرت حرف).

[[ng build --localize]] بيعمل build واحد وبعدين ينسخه لكل لغة ويبدّل النصوص، وبيحط [[lang]] و [[dir]] على [[<html>]] لوحده. في الـ lab: [[dist/shop/browser/ar/index.html]] طلع فيه [[<html lang="ar" dir="rtl">]] والنصوص عربي. والسيرفر (Nginx) بيوجّه [[/ar/]] و [[/en/]] للفولدر الصح، ومحتاج [[baseHref]] لكل لغة (بيتظبط لوحده مع [[--localize]]).

الـ ICU plural [[{count, plural, =0 {...} other {...}}]] بيختار الصيغة حسب الرقم وقواعد اللغة.

[[ng serve]] بيشغّل لغة واحدة؛ لتجربة العربي: [[ng serve --configuration=ar]] بعد ما تعمل configuration فيها [[localize: ["ar"]]].`,
            when: R`الرسمي: لما اللغات معروفة ومش محتاج تبدّل من غير reload، وعايز أسرع أداء و SEO لكل لغة. Transloco/ngx-translate: لما عايز زرار يبدّل اللغة فورًا، أو الترجمات بتيجي من API/CMS، وده اللي هتلاقيه في أغلب المشاريع المصرية.`,
            mistakes: R`تسيب الـ ids تتولّد من النص فأي تعديل إملائي في الإنجليزي يضيّع الترجمة العربي. وتنسى [[target-language]] فالـ build يطلّع تحذير. وتلزق نصوص بـ [[+]] في الكود بدل [[$localize]] بـ placeholders فالترجمة تبقى مستحيلة (ترتيب الكلام بيختلف في العربي). وتترجم وتنسى الـ RTL (الدرس الجاي).`
          },
          lines: [
            R`بيسطّب [[@angular/localize]] ويضيفه في الـ polyfills و tsconfig.`,
            R`نص للترجمة بـ id ثابت [[homeTitle]].`,
            R`plural: الصيغة بتتغير حسب [[count()]].`,
            R`[[i18n-title]] بيترجم الـ attribute [[title]].`,
            R`[[$localize]] للنصوص في الكود، و [[:@@id:]] للـ id.`,
            R`بيطلّع كل الرسايل في [[src/locale/messages.xlf]].`,
            "نسخة للترجمة العربي، هتزوّد فيها targets.",
            R`build لكل لغة في فولدر لوحده.`
          ],
          sol: R`[[ng extract-i18n]] بيطبع [[Extraction Complete. (Messages: 4)]] (في الـ lab)، وفي الملف [[<trans-unit id="homeTitle">]] و [[<trans-unit id="cartSaved">]] وواحد بـ id رقمي طويل للـ plural وواحد للـ title.

بعد [[ng build --localize]]: فيه فولدرين [[ar]] و [[en-US]] جوه [[dist/shop/browser]]، و [[ar/index.html]] فيه [[<html lang="ar" dir="rtl">]]، والعنوان «أهلا بيك في المحل» (اللي كتبته في الـ target). [[dir="rtl"]] اتحط لوحده لأن Angular عارف إن العربي RTL. لو لقيت الإنجليزي في نسخة ar، اتأكد إن فيه [[<target>]] وإن الـ id مطابق.`
        },
        {
          cmd: "RTL",
          title: "تخلي التطبيق يشتغل صح بالعربي: dir و logical CSS و Directionality",
          desc: R`العربي من اليمين للشمال، ومش كفاية تترجم النص: الـ layout كله لازم يتعكس. ٣ حاجات:

[[<html lang="ar" dir="rtl">]]: المتصفح بيعكس الـ flex والـ text-align والـ scrollbars لوحده.

CSS logical properties: [[margin-inline-start]] بدل [[margin-left]]، و [[padding-inline-end]] و [[border-inline-start]] و [[text-align: start]]. دول بيتعكسوا لوحدهم مع الـ dir.

[[Directionality]] من [[@angular/cdk/bidi]]: لو الكود محتاج يعرف الاتجاه (مثلًا اتجاه slider أو animation). و Material و CDK بيقروه لوحدهم.`,
          example: R`@Component({
  selector: 'app-rtl',
  template: $__bt
    <div class="card"><span class="badge">جديد</span> {{ label() }}</div>
    <button (click)="toggle()">{{ lang() === 'ar' ? 'English' : 'عربي' }}</button>
  $__bt,
  styles: $__bt
    .card { padding-inline-start: 16px; border-inline-start: 4px solid teal; text-align: start; }
    .badge { margin-inline-end: 8px; }
  $__bt,
})
export class Rtl {
  private doc = inject(DOCUMENT);
  protected dir = inject(Directionality);
  lang = signal<'ar' | 'en'>('ar');
  label = signal('منتج');
  toggle() {
    this.lang.update((l) => (l === 'ar' ? 'en' : 'ar'));
    this.doc.documentElement.lang = this.lang();
    this.doc.documentElement.dir = this.lang() === 'ar' ? 'rtl' : 'ltr';
  }
}`,
          try: R`حط الـ component ودوس الزرار: الخط الأخضر بيروح فين؟ بعدين غيّر [[border-inline-start]] لـ [[border-left]] وكرر. وافتح أي صفحة فيها Material form field أو menu وقلب الـ dir.`,
          flag: "script",
          deep: {
            why: R`تطبيق عربي بـ [[margin-left]] في كل حتة بيبان «مقلوب»: الأيقونات في الناحية الغلط، والمسافات لازقة في الحرف الغلط. ده من أكتر الحاجات اللي بتبان في تطبيقات البنوك والحكومة المصرية. والـ logical properties بتخليك تكتب CSS مرة واحدة يشتغل للاتجاهين.`,
            how: R`الـ [[dir]] بيتورث: لو على [[<html>]] كل الصفحة بتتأثر، ولو على عنصر ([[<div dir="ltr">]]) بس هو واللي جواه، ومفيد لأرقام أو كود وسط نص عربي.

[[inline]] = الاتجاه اللي النص ماشي فيه (أفقي)، و [[start]] = بداية السطر: يمين في RTL وشمال في LTR. و [[block]] = الرأسي.

[[inject(DOCUMENT)]] بدل [[document]] مباشرة عشان يشتغل مع SSR (على السيرفر فيه document وهمي). و [[DOCUMENT]] بقى يتعمل له import من [[@angular/core]] في النسخ الحديثة (قبلها كان من common).

[[Directionality]] بيقرا [[dir]] من [[<html>]] و [[<body>]] وقت ما يتعمل. عشان يسمع للتغييرات جوه جزء من الصفحة، حط [[dir]] directive بتاع CDK ([[Dir]] من [[@angular/cdk/bidi]]) على العنصر، وده بيطلّع [[dirChange]].

الأيقونات الاتجاهية (سهم رجوع) لازم تتعكس: [[:dir(rtl) .icon-back { transform: scaleX(-1) }]] أو [[[dir=rtl] .icon-back]].`,
            when: R`أي تطبيق هيتعرض بالعربي، حتى لو دلوقتي إنجليزي بس: اكتب logical properties من الأول، مش هتكلّفك حاجة. و [[dir="ltr"]] على الحاجات اللي لازم تفضل LTR: أرقام تليفونات، و IBAN، وكود، وإيميلات.`,
            mistakes: R`[[margin-left]] و [[float: right]] و [[left: 0]] في كل حتة. وتقلب بـ [[transform: scaleX(-1)]] على الصفحة كلها (النص بيتقلب!). وتنسى الأيقونات الاتجاهية. وتقرا [[dir.value]] مرة وتفتكره هيتحدّث لوحده مع تغيير [[document.dir]] من غير الـ [[Dir]] directive.`
          },
          lines: [
            "الـ decorator.",
            "الـ selector.",
            "بداية الـ template.",
            "كارت فيه badge ونص.",
            "زرار بيبدّل اللغة.",
            "قفلة.",
            "الـ CSS.",
            R`[[inline-start]] = يمين في العربي وشمال في الإنجليزي.`,
            R`المسافة بعد الـ badge في اتجاه القراية.`,
            "قفلة.",
            "قفلة.",
            "الكلاس.",
            R`[[DOCUMENT]] بدل [[document]] عشان SSR.`,
            R`[[Directionality]] من الـ CDK.`,
            "اللغة الحالية.",
            "النص.",
            "التبديل.",
            "اقلب اللغة.",
            R`[[lang]] على [[<html>]] (للقارئ الصوتي والخطوط).`,
            R`[[dir]] على [[<html>]]: كل الصفحة بتتعكس.`,
            "قفلة.",
            "قفلة."
          ],
          sol: R`في العربي الخط الأخضر على اليمين والمسافة بين الـ badge والنص على شماله. لما تدوس English، الخط بيروح شمال والمسافة يمين، من غير ولا سطر CSS زيادة.

مع [[border-left]]: الخط بيفضل شمال في الحالتين، فالعربي بيبان غلط (الخط في آخر السطر مش أوله). ده الفرق بين physical و logical.

Material form fields والـ menus بتتعكس هي كمان، لأنها بتقرا الاتجاه. لو menu فتحت في الناحية الغلط بعد التبديل، ده لأن [[Directionality]] اتقرا مرة: حط [[dir]] على عنصر أب في الـ template واربطه بـ signal ([[<div [dir]="lang() === 'ar' ? 'rtl' : 'ltr'">]] مع [[Dir]] في imports).`
        }
      ]
    },
    {
      t: "change detection و SSR والأداء",
      l: 3,
      n: "zoneless و OnPush الافتراضيين في 22، و SSR بـ hydration، وإزاي التطبيق يبقى سريع",
      items: [
        {
          cmd: "zoneless و OnPush",
          title: "الشاشة بتتحدّث إمتى في Angular 22، وليه كود قديم مبيحدّثش",
          desc: R`«change detection» هي إن Angular يشوف البيانات اتغيرت ويحدّث الـ DOM. في Angular 22 حاجتين بقوا افتراضي:

zoneless (من 21): مفيش zone.js بيراقب كل setTimeout و HTTP. Angular بيحدّث لما حاجة «تبلّغه»: signal بيقراها الـ template اتغيرت، أو event في الـ template (click)، أو [[async]] pipe طلّعت قيمة، أو [[markForCheck()]].

OnPush (من 22): الـ component مش بيتفحص غير لو اتعلّم إنه محتاج (بالحاجات دي نفسها، أو input اتغير).

النتيجة العملية: لو غيّرت خاصية عادية جوه setTimeout أو subscribe، الشاشة مش هتتحدّث. استخدم signals.`,
          example: R`@Component({
  selector: 'app-cd',
  template: $__bt<p>عادي: {{ plain }}</p> <p>signal: {{ count() }}</p> <button (click)="click()">دوس</button>$__bt,
})
export class Cd {
  plain = 0;
  count = signal(0);
  private cdr = inject(ChangeDetectorRef);
  click() { this.plain++; }
  later() { setTimeout(() => { this.plain++; }, 10); }
  laterSignal() { setTimeout(() => this.count.update((c) => c + 1), 10); }
  laterMark() { setTimeout(() => { this.plain++; this.cdr.markForCheck(); }, 10); }
}
// الـ component القديم اللي عايز يرجع للسلوك القديم:
// changeDetection: ChangeDetectionStrategy.Eager`,
          try: R`اعمل الـ component وزوّد زراير لـ [[later]] و [[laterSignal]] و [[laterMark]]. اتوقع قبل ما تدوس: الرقم «عادي» هيتغير مع أنهي زرار؟ بعدين دوس [[later]] مرتين وبعدين [[click]]: الرقم بقى كام؟`,
          flag: "script",
          deep: {
            why: R`zone.js كان بيعمل monkey-patch لكل API async في المتصفح، وبعد أي حاجة يفحص شجرة الـ components كلها. ده كان «سحر» مريح بس: تقيل (~٣٠ KB وفحص زيادة)، وبيخلي الـ stack traces صعبة، ومش بيشتغل مع كل APIs (زي بعض مكتبات الطرف التالت). مع signals، Angular عارف بالظبط مين اتغير، فمش محتاج يخمّن.`,
            how: R`كل component view ليه flag «dirty». الحاجات اللي بتعلّمه dirty (وكل الأجداد لحد الـ root): signal اتقرت في الـ template وقيمتها اتغيرت، و event listener في الـ template اشتغل، و input اتغير بالـ reference، و [[markForCheck()]] (و [[async]] pipe بتناديها). بعد كده Angular بيجدول change detection ويفحص الـ views الـ dirty بس (OnPush). مع signals، ممكن يحدّث الـ view اللي اتغيرت بس من غير الأجداد.

فـ [[click()]] بيحدّث الشاشة لأن الـ event من الـ template علّم الـ component. [[later()]] مش بيحدّث: setTimeout مش بيعلّم حاجة، والخاصية عادية. [[laterSignal()]] بيحدّث. و [[laterMark()]] بيحدّث لأنه بلّغ يدوي.

[[ChangeDetectionStrategy.Eager]] (الاسم الجديد لـ Default) بيخلي الـ component يتفحص في كل دورة حتى لو مش dirty. الـ migration بتاع [[ng update]] لـ 22 بيحطه على كل components المشروع القديم عشان متتكسرش. بس Eager مش بيرجّع zone.js: لازم كمان [[provideZoneChangeDetection()]] و zone.js في الـ polyfills لو الكود معتمد على إن setTimeout يحدّث.

[[fixture.detectChanges()]] في الاختبارات القديمة بيفحص الـ fixture يدوي، والحديث [[await fixture.whenStable()]].`,
            when: R`كل كود جديد: signals لأي حاجة بتتعرض، ومتعتمدش على «Angular هيحس لوحده». الكود القديم: سيب [[Eager]] و zone.js لحد ما تحوّل الـ state لـ signals component component.`,
            mistakes: R`[[this.data = res]] جوه [[subscribe]] في component جديد، والشاشة مش بتتحدّث، فتضيف [[setTimeout]] أو [[detectChanges()]] في كل حتة. الحل: signal أو [[toSignal]]. وتعدّل object جوه input ([[this.user.name = 'x']]) وتستنى الابن يتحدّث: OnPush بيقارن الـ reference. وتشيل zone.js من مشروع قديم من غير ما تراجع الـ subscribes.`
          },
          lines: [
            "الـ decorator (مفيش changeDetection، يعني OnPush افتراضي في 22).",
            "الـ selector.",
            "خاصية عادية، و signal، وزرار.",
            "قفلة.",
            "الكلاس.",
            "خاصية عادية: Angular مش بيعرف إمتى تتغير.",
            "signal: Angular بيعرف.",
            R`[[ChangeDetectorRef]] للتبليغ اليدوي.`,
            "event من الـ template: بيعلّم الـ component إنه محتاج يتحدّث.",
            "setTimeout + خاصية عادية: محدش بلّغ.",
            "setTimeout + signal: الـ signal بلّغت.",
            R`setTimeout + [[markForCheck]]: بلّغنا بإيدنا.`,
            "قفلة."
          ],
          sol: R`اتجرّب في الـ lab بالظبط (Vitest و zoneless و OnPush الافتراضي):

[[click]]: «عادي: 1». [[later]]: لسه «عادي: 1» مع إن القيمة الحقيقية بقت 2. [[laterSignal]]: «عادي: 2» و «signal: 1»، لاحظ إن «عادي» اتحدّث هو كمان لأن الـ view كله اترسم تاني لما الـ signal علّمته. [[later]] وبعدين [[laterMark]]: «عادي: 4».

لو دوست [[later]] مرتين وبعدين [[click]]: هيظهر الرقم الحقيقي مرة واحدة (مثلًا من 1 لـ 4). البيانات كانت بتتغير طول الوقت، الشاشة بس اللي مكانتش عارفة. وده بالظبط شكل الـ bug في كود قديم اتنقل لـ zoneless.`
        },
        {
          cmd: "SSR و hydration",
          title: "SSR و prerender و hydration في Angular، ومطبّات الكود اللي بيشتغل على السيرفر",
          desc: R`[[ng new --ssr]] أو [[ng add @angular/ssr]] بيخلي الصفحات تترسم HTML على السيرفر (Node + Express)، فالمستخدم ومحركات البحث يشوفوا محتوى على طول، وبعدين Angular «يصحّى» الـ HTML ده في المتصفح (hydration) بدل ما يرسمه من جديد.

وكل route بتختار له render mode في [[app.routes.server.ts]]: [[Prerender]] (HTML وقت الـ build، زي SSG)، أو [[Server]] (مع كل طلب)، أو [[Client]] (SPA عادي).

والمطب الأساسي: الكود بيشتغل على السيرفر، ومفيش [[window]] ولا [[localStorage]] ولا [[document]] حقيقي.`,
          example: R`ng add @angular/ssr
# app.routes.server.ts
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'products/:id', renderMode: RenderMode.Server },
  { path: 'admin/**', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Server, status: 404 },
];
# component بيلمس المتصفح:
constructor() {
  afterNextRender(() => this.theme.set(localStorage.getItem('theme') ?? 'light'));
}
ng build
NG_ALLOWED_HOSTS=localhost node dist/shop/server/server.mjs`,
          try: R`ضيف SSR لمشروع الـ lab واعمل [[ng build]]. لو فيه component بيقرا [[localStorage]] في field أو constructor، هتشوف الخطأ. صلّحه بـ [[afterNextRender]]. بعدين شغّل السيرفر، وافتح [[view-source:]] على صفحة: المحتوى موجود في الـ HTML؟`,
          deep: {
            why: R`SPA عادي بيبعت [[<app-root></app-root>]] فاضي، والمستخدم يشوف صفحة بيضا لحد ما الـ JS يتحمّل ويشتغل، و crawlers كتير (ومعاينة اللينكات في واتساب وفيسبوك) مش بتشغّل JS. SSR بيحل الاتنين. و hydration بتخلي Angular يعيد استخدام الـ DOM اللي جه من السيرفر بدل ما يمسحه ويرسمه، فمفيش وميض.`,
            how: R`[[ng add @angular/ssr]] (في الـ lab على 22.2) عمل [[src/server.ts]] (Express + [[AngularNodeAppEngine]])، و [[main.server.ts]]، و [[app.config.server.ts]] ([[provideServerRendering(withRoutes(serverRoutes))]])، و [[app.routes.server.ts]]، وضاف [[provideClientHydration()]] في [[app.config.ts]]، و script [[serve:ssr:shop]].

[[provideClientHydration()]] في 22 بيشغّل افتراضيًا: hydration، و HTTP transfer cache (الطلبات اللي اتعملت على السيرفر مش بتتعاد في المتصفح)، و incremental hydration: مع [[@defer (hydrate on viewport)]] الحتة بتترندر على السيرفر بس مش بتصحى (تحمّل JS) غير لما تظهر. الـ migration بتاع 22 بيحط [[withNoIncrementalHydration()]] للمشاريع القديمة.

[[Prerender]] مع route فيه [[:id]] لازم [[getPrerenderParams]] (بترجّع الـ ids)، وإلا الـ build بيقع بـ The 'products/:id' route uses prerendering and includes parameters, but 'getPrerenderParams' is missing. [[status: 404]] بيخلي صفحة NotFound ترجع 404 حقيقي مش 200.

[[afterNextRender]] بيشتغل في المتصفح بس بعد أول رسم، ومكانه أي حاجة محتاجة DOM أو storage. أو [[isPlatformBrowser(inject(PLATFORM_ID))]] لو محتاج if.

السيرفر في الإنتاج بيرفض أي Host مش مسموح (حماية SSRF): لازم [[NG_ALLOWED_HOSTS]] أو [[security.allowedHosts]] في [[angular.json]].

والطلبات على السيرفر محتاجة URL كامل أو API شغال وقت الـ prerender: [[/api/...]] النسبي وقت الـ build وقّع الـ lab بـ Unable to handle request.`,
            when: R`مواقع عامة محتاجة SEO وسرعة أول ظهور: متاجر، ومحتوى، و landing. لوحات تحكم ورا login مالهاش لازمة غالبًا: [[--ssr=false]] أبسط وأرخص. ولو محتاج SEO لصفحات قليلة، [[Prerender]] ليها و [[Client]] للباقي.`,
            mistakes: R`[[localStorage]] أو [[window]] في constructor أو field: [[ReferenceError: localStorage is not defined]] وقت الـ build أو الطلب. و HTML مختلف بين السيرفر والمتصفح (تاريخ [[new Date()]]، أو random، أو محتوى حسب [[window.innerWidth]]): hydration mismatch (NG0500). وتنسى [[NG_ALLOWED_HOSTS]] فالسيرفر يرجّع 400 لكل طلب. وتلمس الـ DOM بـ [[document.querySelector]] بدل الـ template.`
          },
          lines: [
            R`بيضيف [[@angular/ssr]] و express والملفات.`,
            "render mode لكل route.",
            "الرئيسية HTML جاهز وقت الـ build.",
            "صفحة المنتج بتترسم مع كل طلب (الـ ids كتير ومتغيرة).",
            "الأدمن SPA عادي: ورا login ومش محتاج SEO.",
            R`أي حاجة تانية على السيرفر، وبـ status 404 حقيقي.`,
            "قفلة.",
            "في الـ component.",
            R`[[afterNextRender]] بيشتغل في المتصفح بس، فـ localStorage آمنة جواه.`,
            "قفلة.",
            R`بيطلّع [[dist/shop/browser]] و [[dist/shop/server]] وبيعمل prerender.`,
            R`يشغّل سيرفر Express على 4000، و [[NG_ALLOWED_HOSTS]] عشان يقبل الـ Host ده.`
          ],
          sol: R`في الـ lab، الـ build الأول وقع بـ [[ERROR ReferenceError: localStorage is not defined]] من component بيقرا localStorage في field initializer، وده حصل وقت الـ prerender. بعد ما اتنقلت لـ [[afterNextRender]] و [[isPlatformBrowser]] في الـ effect: [[Prerendered 2 static routes.]] و [[Application bundle generation complete]].

لما تشغّل السيرفر من غير [[NG_ALLOWED_HOSTS]]: [[Header "host" with value "localhost:4123" is not allowed]] و status 400. معاه: الصفحة بترجع و view-source فيه [[<h1>أهلا يا سارة</h1>]] والمحتوى كله، و [[ng-server-context="ssg"]] على الـ app-root (يعني prerendered)، و attributes [[ngh]] اللي الـ hydration بتستخدمها. في route من غير [[status: 404]]، صفحة NotFound بترجع 200، ودي مشكلة SEO.`,
          solCode: R`import { Component, PLATFORM_ID, afterNextRender, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
type Theme = 'light' | 'dark';
@Component({ selector: 'app-theme', template: $__bt<button (click)="toggle()">{{ theme() }}</button>$__bt })
export class ThemePicker {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  theme = signal<Theme>('light');                  // قيمة ثابتة: نفس الـ HTML على السيرفر والمتصفح
  constructor() {
    afterNextRender(() => {
      this.theme.set((localStorage.getItem('theme') as Theme) ?? 'light');
    });
    effect(() => {
      if (!this.isBrowser) return;                 // السيرفر مفيهوش localStorage
      localStorage.setItem('theme', this.theme());
    });
  }
  toggle() { this.theme.update((t) => (t === 'light' ? 'dark' : 'light')); }
}`
        },
        {
          cmd: "الأداء",
          title: "تقيس وتحسّن حجم وسرعة تطبيق Angular",
          desc: R`أهم حاجات في الأداء، بالترتيب:

١. حجم أول تحميل: lazy routes، و [[@defer]]، ومتستوردش مكتبة كاملة عشان دالة. [[ng build]] بيحذّرك لو عدّيت الـ budget في [[angular.json]].

٢. الصور: [[NgOptimizedImage]] ([[ngSrc]] مع [[width]] و [[height]] و [[priority]] للـ LCP) بيحط lazy loading و srcset و fetchpriority.

٣. الرسم: signals و OnPush (افتراضي)، و [[track]] صح في [[@for]]، و [[computed]] بدل دوال في الـ template، و virtual scroll للقوايم الطويلة.

وتقيس بـ Angular DevTools (Profiler) و Lighthouse، مش بالإحساس.`,
          example: R`ng build --stats-json
npx esbuild-visualizer --metadata dist/shop/browser-stats.json --open
# angular.json → configurations.production.budgets
{ "type": "initial", "maximumWarning": "500kB", "maximumError": "1MB" }
# الصورة الأساسية في الصفحة:
<img ngSrc="/hero.jpg" width="1200" height="600" priority alt="عروض" />
# الصور التانية:
<img ngSrc="/p/{{ p.id }}.jpg" width="300" height="300" [alt]="p.name" />
# بدل {{ total() }} لو total دالة عادية بتعمل reduce:
total = computed(() => this.items().reduce((s, i) => s + i.price, 0));`,
          try: R`اعمل [[ng build]] على مشروع الـ lab بعد ما ضفت Material و CDK والصفحات: فيه تحذير budget؟ اعمل [[--stats-json]] وافتح الـ visualizer: إيه أكبر حاجة؟ بعدين حوّل صفحة لـ lazy وحتة تقيلة لـ @defer وقارن الـ initial total.`,
          deep: {
            why: R`تطبيقات الـ enterprise بتكبر بهدوء: كل feature بتضيف مكتبة، ومحدش بيبص على الحجم لحد ما موظف في فرع بنت NET بطيء يشتكي إن الـ dashboard بياخد ١٥ ثانية. الـ budgets بتخلي الـ build نفسه يقولك «كبرت» قبل ما المستخدم يقول.`,
            how: R`الـ budget [[initial]] بيقيس الـ JS و CSS اللي لازم يتحمّلوا قبل أول رسم. في الـ lab بعد Material و CDK و localize: [[bundle initial exceeded maximum budget. Budget 500.00 kB was not met by 225.41 kB with a total of 725.41 kB]]: تحذير مش خطأ لحد 1MB. و [[anyComponentStyle]] بيحدد CSS الـ component الواحد.

[[--stats-json]] بيطلّع [[browser-stats.json]] (و [[server-stats.json]] لو فيه SSR)، ودي metafile بتاع esbuild، وأي visualizer لـ esbuild يعرضه كـ treemap (الـ visualizer ده مثال؛ فيه أدوات تانية بنفس الفكرة).

[[NgOptimizedImage]] (من [[@angular/common]]، لازم import) بيطلب [[width]] و [[height]] عشان يمنع layout shift (CLS)، وبيطلّع تحذيرات في dev لو الصورة أكبر بكتير من مكانها أو لو صورة الـ LCP مش عليها [[priority]]. ومع image loader (Cloudinary و imgix وغيرهم) بيعمل srcset بمقاسات.

في الـ template، [[{{ total() }}]] لو [[total]] method عادية بتتنادى مع كل change detection للـ component. لو [[computed]]، بتتحسب لما الداتا تتغير بس.

و Angular DevTools > Profiler بيوريك كل دورة change detection، وأي component خد وقت، وإيه اللي سببها.`,
            when: "قبل كل release: بص على الـ build output. ولما تضيف مكتبة: شوف حجمها (bundlephobia). ولما صفحة تبقى بطيئة: Profiler الأول، وبعدين حلّ اللي ظهر، مش تخمين.",
            mistakes: R`ترفع الـ budget كل ما يتكسر بدل ما تشوف إيه اللي كبّره. و [[import * as _ from 'lodash']] أو moment.js كاملة. و [[<img src>]] عادي للصورة الرئيسية من غير أبعاد فالصفحة تنط. و [[@for]] بـ [[track $index]] على list بتتحدّث من API. ودوال تقيلة في الـ template.`
          },
          lines: [
            R`build ومعاه [[dist/shop/browser-stats.json]] (metafile بتاع esbuild) فيه كل ملف وحجمه.`,
            "treemap للـ bundle في المتصفح.",
            "الـ budget الافتراضي: تحذير عند 500kB وخطأ عند 1MB.",
            R`صورة الـ LCP: [[priority]] بتحمّلها بدري بـ fetchpriority=high ومن غير lazy.`,
            "باقي الصور: lazy تلقائي، والأبعاد بتمنع القفز.",
            "قيمة محسوبة مرة لما الداتا تتغير، مش مع كل رسم."
          ],
          sol: R`في الـ lab: الـ initial total كان حوالي 219 kB لمشروع فاضي، وبعد Material و CDK والـ components كلها في App بقى 725 kB، مع تحذير الـ budget. والـ «Lazy chunk files» فيها بس الصفحات اللي اتعملت lazy (admin-routes و reviews-list). أكبر حاجة في الـ treemap غالبًا [[@angular/core]] و [[@angular/material]] و [[rxjs]].

لما تنقل الحاجات اللي مش في أول شاشة لـ lazy routes و @defer، الـ initial بيقل، والـ lazy chunks بتزيد. لو محصلش فرق: دوّر على import eager للحاجة دي في ملف تاني.`
        }
      ]
    },
    {
      t: "الاختبارات",
      l: 3,
      n: "ng test بـ Vitest (الافتراضي من 21)، و TestBed للـ components، و HttpTestingController",
      items: [
        {
          cmd: "ng test و Vitest",
          title: "تشغّل الاختبارات بـ ng test، وتختبر service بـ TestBed.inject",
          desc: R`من Angular 21 الافتراضي في [[ng new]] هو Vitest بدل Karma و Jasmine، وبيشتغل في Node بـ jsdom (مفيش browser بيفتح). [[ng test]] بيبني الـ specs ويشغّل Vitest.

الـ syntax زي Jest و Jasmine: [[describe]] و [[it]] و [[expect]]، و [[vi.fn()]] للـ mocks. و [[TestBed]] هو اللي بيعمل injector للاختبار: [[TestBed.inject(Cart)]] بيجيب service، و [[providers]] بيبدّل dependencies بنسخ وهمية.

في مشاريع قديمة هتلاقي Karma + Jasmine ([[karma.conf.js]] و [[jasmine.createSpy]])، و [[ng test --runner karma]] لسه موجود.`,
          example: R`ng test
ng test --watch=false
ng test --include src/app/cart
ng test --filter ProductsStore
npm i -D @vitest/coverage-v8 && ng test --watch=false --coverage
# products-store.spec.ts
it('بيحمّل من API وهمي', async () => {
  const list = vi.fn(() => of([{ id: 1, name: 'قلم', price: 10 }]));
  TestBed.configureTestingModule({ providers: [{ provide: ProductsApi, useValue: { list } }] });
  const store = TestBed.inject(ProductsStore);
  await store.load();
  expect(list).toHaveBeenCalledTimes(1);
  expect(store.items()).toHaveLength(1);
  expect(store.loading()).toBe(false);
});`,
          try: R`اكتب اختبار لـ [[Cart]] service: ضيف منتجين وتأكد من [[count()]] و [[total()]]. شغّل [[ng test --watch=false]]. بعدين اكتب اختبار تاني لـ [[ProductsStore]] لما الـ API يرمي خطأ ([[throwError]]): [[error()]] لازم يبقى الرسالة.`,
          deep: {
            why: R`تطبيقات البنوك والـ enterprise بتطلب coverage ومتقدرش تعمل release من غير CI أخضر. واختبارات الـ services (المنطق) أسرع وأثبت من اختبار الشاشة. و DI بيخلي الـ mocking سهل جدًا: بتقول لـ TestBed «لما حد يطلب ProductsApi اديله ده» من غير ما تلمس الكود.`,
            how: R`[[ng test]] بيستخدم builder [[@angular/build:unit-test]]: بيبني الـ specs بنفس esbuild، وبعدين Vitest يشغّلهم. الـ globals ([[describe]] و [[vi]]) جاية من [[vitest/globals]] في [[tsconfig.spec.json]]. [[--browsers chromium]] بيشغّل في browser حقيقي (محتاج باكدج provider زي [[@vitest/browser-playwright]] والـ browsers بتاعة playwright).

[[TestBed]] بيتعمل reset قبل كل [[it]]، فكل اختبار بيبدأ نضيف. [[configureTestingModule({ providers })]] قبل أول [[inject]] أو [[createComponent]].

[[{ provide: ProductsApi, useValue: { list } }]] بيبدّل الـ service كلها. شغال حتى مع [[@Service()]] المتعمل autoProvided. و [[vi.fn]] بيسجّل النداءات، فـ [[toHaveBeenCalledWith('قلم')]].

[[--coverage]] محتاج [[@vitest/coverage-v8]]، ومن غيره [[ng test]] بيقولك Code coverage requires either "@vitest/coverage-v8" or "@vitest/coverage-istanbul" to be installed.

والفرق مع Jasmine: [[jasmine.createSpy]] بقت [[vi.fn]]، و [[spyOn(obj, 'm').and.returnValue(x)]] بقت [[vi.spyOn(obj, 'm').mockReturnValue(x)]]، و [[fakeAsync]]/[[tick]] بتوع zone.js بيتبدلوا بـ [[vi.useFakeTimers()]] أو [[await fixture.whenStable()]].`,
            when: R`اختبر الـ services والـ stores والـ pipes والـ validators دايمًا (سريعة ورخيصة). والـ components اللي فيها منطق (الدرس الجاي). والـ flows الكاملة بـ e2e (Playwright). و [[ng test --watch=false]] في CI.`,
            mistakes: R`تعمل [[TestBed.inject]] الأول وبعدين [[configureTestingModule]]: خطأ إن الـ TestBed اتعمل له instantiate خلاص. وتختبر implementation (اسم method خاصة اتنادت) بدل النتيجة. وتنسى [[await]] قبل async فالاختبار يعدّي وهو مخلصش. وتنقل مشروع من Karma فتلاقي [[fakeAsync]] مش شغالة من غير zone.js.`
          },
          lines: [
            "يشغّل كل الاختبارات في watch mode (بيعيد مع كل حفظ).",
            "مرة واحدة ويخرج: ده اللي في CI.",
            "الملفات في فولدر معين بس.",
            "الاختبارات اللي اسمها بيطابق regex.",
            "coverage محتاج باكدج زيادة.",
            R`[[it]] ممكن تبقى async.`,
            R`دالة وهمية بترجّع Observable ومسجّلة كل نداء.`,
            R`بدّل [[ProductsApi]] بـ object فيه [[list]] بس.`,
            "هات الـ store الحقيقي، وهو هيستخدم الـ API الوهمي.",
            "نفّذ.",
            "الـ API اتنادى مرة.",
            "البيانات وصلت.",
            "والتحميل خلص.",
            "قفلة."
          ],
          sol: R`[[ng test --watch=false]] بيطبع جدول بناء صغير وبعدين ناتج Vitest: [[Test Files  N passed]] و [[Tests  N passed]] والوقت. الاختبار اللي في المثال عدّى في الـ lab. و [[--filter ProductCard]] طلّع [[Tests  2 passed | 21 skipped]].

الاختبارين:`,
          solCode: R`describe('Cart', () => {
  it('بيجمع العدد والإجمالي', () => {
    const cart = TestBed.inject(Cart);
    cart.add({ id: 1, name: 'قلم', price: 10 });
    cart.add({ id: 2, name: 'كشكول', price: 45 });
    expect(cart.count()).toBe(2);
    expect(cart.total()).toBe(55);
  });
});
it('بيحط رسالة لما الـ API يقع', async () => {
  const list = vi.fn(() => throwError(() => new Error('500')));
  TestBed.configureTestingModule({ providers: [{ provide: ProductsApi, useValue: { list } }] });
  const store = TestBed.inject(ProductsStore);
  await store.load();
  expect(store.error()).toBe('مقدرناش نجيب المنتجات');
  expect(store.items()).toEqual([]);
  expect(store.loading()).toBe(false);
});`
        },
        {
          cmd: "TestBed و components",
          title: "تختبر component: setInput و whenStable والـ DOM والـ outputs",
          desc: R`[[TestBed.createComponent(ProductCard)]] بيعمل الـ component ويرجّع [[fixture]]: فيه [[componentInstance]] (الكلاس)، و [[nativeElement]] (الـ DOM)، و [[componentRef.setInput('product', ...)]] عشان تبعت inputs زي ما الأب بيعمل.

بعد أي تغيير: [[await fixture.whenStable()]] بتستنى Angular يحدّث الشاشة. وبعدين تدوّر في الـ DOM بـ [[querySelector]] وتعمل [[click()]] وتتأكد.

الفكرة: اختبر زي المستخدم (اللي ظاهر والضغطات)، مش تفاصيل الكلاس. زي Testing Library في «تاب React».`,
          example: R`describe('ProductCard', () => {
  it('بيعرض الاسم وبيبعت الـ id لما تدوس', async () => {
    const fixture = TestBed.createComponent(ProductCard);
    fixture.componentRef.setInput('product', { id: 7, name: 'قلم', price: 10 });
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('h3')?.textContent).toContain('قلم');
    expect(el.querySelector('p')?.textContent).toBe('10 EGP');
    let emitted: number | undefined;
    fixture.componentInstance.added.subscribe((id) => (emitted = id));
    el.querySelector('button')!.click();
    expect(emitted).toBe(7);
  });
});`,
          try: R`اكتب الاختبار ده، وبعدين اختبار تاني بيعمل [[setInput('currency', 'USD')]] ويتأكد من [[45 USD]]. وبعدين اختبر [[Header]] بـ Cart وهمية فيها [[count: signal(5)]]. وفي الآخر اختبر component فيه [[routerLink]] من غير [[provideRouter([])]] وشوف الخطأ.`,
          deep: {
            why: "الـ components فيها منطق عرض مهم: الرسالة تظهر إمتى، والزرار يتقفل إمتى، والـ output بيطلع بإيه. الاختبار بيضمن إن refactor أو update لـ Angular مكسرش ده، من غير ما تفتح المتصفح وتدوس بإيدك.",
            how: R`[[setInput]] بيمشي في نفس طريق الأب: بيحدّث الـ input signal ويعلّم الـ component dirty. تعيين [[componentInstance.product = ...]] مباشرة مش هينفع مع signal inputs (هي read-only).

[[whenStable()]] بتستنى لحد ما مفيش change detection متجدول ولا pending tasks (زي HTTP أو httpResource). مع zoneless ده الطريقة الموصى بيها بدل [[detectChanges()]]. لو في اختبار الـ HTTP لسه مردّش، [[whenStable]] هتستنى للأبد، فاعمل [[TestBed.tick()]] الأول، وبعدين [[expectOne]] و [[flush]]، وبعدين [[whenStable]] (ده اللي اشتغل في الـ lab مع httpResource).

الـ output بيتعمل له subscribe زي Observable في الاختبار. والـ dependencies بتتبدّل في [[providers]]: [[{ provide: Cart, useValue: { count: signal(5), total: signal(99) } }]]، والـ component مش هيعرف الفرق لأنه بيطلب [[inject(Cart)]].

الـ components اللي بتستخدم الراوتر ([[routerLink]] أو [[ActivatedRoute]]) محتاجة [[provideRouter([])]]، وللتنقل الحقيقي [[RouterTestingHarness]]. وفيه [[@testing-library/angular]] لو عايز [[screen.getByRole]].`,
            when: R`components فيها شروط عرض أو تفاعل أو outputs. الـ components اللي بتعرض بيانات بس من غير منطق: اختبار بسيط إنها بتترسم، أو ولا حاجة.`,
            mistakes: R`[[componentInstance.product = x]] على signal input. وتنسى [[await fixture.whenStable()]] فالـ DOM لسه قديم. وتختبر [[componentInstance.priceLabel()]] بدل النص اللي ظاهر. وتنسى [[provideRouter([])]]: NG0201 No provider found for ActivatedRoute (حصلت في الـ lab).`
          },
          lines: [
            "مجموعة اختبارات.",
            "اختبار async.",
            "اعمل الـ component.",
            "ابعت input زي الأب.",
            "استنى الشاشة تتحدّث.",
            "الـ DOM.",
            "النص ظاهر.",
            R`الـ [[computed]] ظهر صح.`,
            "هنمسك اللي طالع.",
            R`subscribe على الـ output.`,
            "دوس زي المستخدم.",
            "الـ id طلع.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`الاختبارين دول عدّوا في الـ lab بالظبط، بما فيهم [[setInput('currency', 'USD')]] مع منتج سعره 45 والنص [[45 USD]]. واختبار [[Header]] بـ Cart وهمية عدّى والنص فيه [[السلة (5) - 99 جنيه]].

من غير [[provideRouter([])]] في component فيه [[routerLink]]: [[NG0201: No provider found for ActivatedRoute. Source: DynamicTestModule]]. الحل:`,
          solCode: R`TestBed.configureTestingModule({ providers: [provideRouter([])] });
const fixture = TestBed.createComponent(Flow);
await fixture.whenStable();`
        },
        {
          cmd: "HttpTestingController",
          title: "تختبر service بتكلّم API من غير سيرفر",
          desc: R`[[provideHttpClientTesting()]] بيبدّل الـ backend بتاع HttpClient بواحد وهمي، و [[HttpTestingController]] بيخليك تمسك الطلبات وترد عليها:

[[http.expectOne(url)]]: اتأكد إن طلب واحد اتبعت للـ URL ده. [[req.request]]: تشوف الـ method والـ params والـ headers والـ body. [[req.flush(data)]]: رد بالبيانات دي، أو بـ [[{ status: 500 }]]. [[http.verify()]]: اتأكد إن مفيش طلبات زيادة محدش رد عليها.

كده بتختبر إن الـ service بتبعت الطلب الصح وبتتعامل مع الرد صح، ومن غير نت.`,
          example: R`describe('ProductsApi', () => {
  let api: ProductsApi;
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    api = TestBed.inject(ProductsApi);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());
  it('بيبعت GET بالـ q الصح', async () => {
    const promise = firstValueFrom(api.list('قلم'));
    const req = http.expectOne((r) => r.url === '/api/products');
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('q')).toBe('قلم');
    req.flush([{ id: 1, name: 'قلم', price: 10 }]);
    expect(await promise).toEqual([{ id: 1, name: 'قلم', price: 10 }]);
  });
  it('بيطلّع error لما السيرفر يرد 500', async () => {
    const promise = firstValueFrom(api.getOne('9'));
    http.expectOne('/api/products/9').flush('boom', { status: 500, statusText: 'Server Error' });
    await expect(promise).rejects.toMatchObject({ status: 500 });
  });
});`,
          try: R`شغّل الاختبارات دي. بعدين اكتب اختبار للـ [[authInterceptor]]: سجّله بـ [[provideHttpClient(withInterceptors([authInterceptor]))]]، وحط token، واعمل أي GET، واتأكد من الـ header. وجرّب تشيل [[req.flush]] من أي اختبار وشوف [[verify()]] بيقول إيه.`,
          deep: {
            why: R`الـ services اللي بتكلّم API فيها غلطات بتتكرر: URL غلط، أو param ناقص، أو header مش متحط، أو تحويل الرد غلط، أو الخطأ مش متمسوك. الاختبار ده بيمسكهم في ثانية ومن غير backend شغال، وبيشتغل في CI.`,
            how: R`الترتيب مهم: [[provideHttpClient()]] الأول وبعدين [[provideHttpClientTesting()]]. الـ interceptors بتشتغل عادي لأنها قبل الـ backend.

[[firstValueFrom(api.list())]] بيعمل subscribe (فالطلب يتبعت) ويرجّع Promise هتتحل لما نعمل [[flush]]. [[expectOne]] بيقع لو فيه صفر أو أكتر من طلب مطابق، ولو اديته string بيقارن الـ URL كامل بالـ query، عشان كده استخدمنا دالة للـ list لأن فيه [[?q=]].

[[flush(body, { status, statusText })]] بـ status مش 2xx بيخلي الـ Observable يطلّع [[HttpErrorResponse]]. و [[req.error(new ProgressEvent('error'))]] بيحاكي انقطاع النت (status 0).

[[verify()]] في [[afterEach]] بيقع لو فيه طلب اتبعت ومحدش عمل له expect، ودي بتمسك طلبات زيادة مش متوقعة.

وفي الكود القديم هتلاقي [[imports: [HttpClientTestingModule]]] بدل [[provideHttpClientTesting()]]، ونفس الفكرة.`,
            when: "كل service فيها HTTP، وكل interceptor. وللـ components اللي بتجيب بيانات: غالبًا أسهل تبدّل الـ service كلها بـ useValue (الدرس اللي فات) بدل ما تمسك HTTP.",
            mistakes: R`تنسى [[provideHttpClient()]] وتحط [[provideHttpClientTesting()]] لوحده. و [[expectOne('/api/products')]] والطلب فيه query: [[Expected one matching request for criteria "Match URL: /api/products", found none. Requests received are: GET /api/products?q=.]] وتعمل [[expectOne]] قبل ما حد يعمل subscribe. وتنسى [[verify()]] فطلبات زيادة تعدّي من غير ما تحس.`
          },
          lines: [
            "مجموعة.",
            "الـ service.",
            "المتحكم في الطلبات.",
            "قبل كل اختبار.",
            R`HttpClient حقيقي، بس الـ backend وهمي.`,
            "هات الـ service.",
            "وهات المتحكم.",
            "قفلة.",
            "بعد كل اختبار: مفيش طلبات زيادة.",
            "اختبار.",
            R`subscribe (الطلب يتبعت) و Promise للنتيجة.`,
            R`طلب واحد بالـ URL ده (من غير ما نقارن الـ query).`,
            "الـ method.",
            "الـ query param.",
            "رد بالبيانات دي.",
            "الـ service رجّعتها زي ما هي.",
            "قفلة.",
            "اختبار الخطأ.",
            "الطلب.",
            R`رد بـ 500.`,
            R`الـ Promise اترفض بـ [[HttpErrorResponse]] فيه status 500.`,
            "قفلة.",
            "قفلة."
          ],
          sol: R`الاختبارين عدّوا في الـ lab. واختبار الـ interceptor (عدّى برضه):

لو شلت [[req.flush]]: [[verify()]] بيقع بـ [[Expected no open requests, found 1: GET /api/products?q=]] (ده الناتج الحقيقي من الـ lab؛ لاحظ إن [[?q=]] جزء من الـ URL لأن q فاضية). ولو الاختبار بيستنى الـ promise، هيقع بـ timeout قبلها.`,
          solCode: R`it('الـ interceptor بيحط الـ token', () => {
  TestBed.configureTestingModule({
    providers: [provideRouter([]), provideHttpClient(withInterceptors([authInterceptor])), provideHttpClientTesting()],
  });
  TestBed.inject(Auth).token.set('abc');
  TestBed.inject(HttpClient).get('/api/me').subscribe();
  const req = TestBed.inject(HttpTestingController).expectOne('/api/me');
  expect(req.request.headers.get('Authorization')).toBe('Bearer abc');
  req.flush({});
});`
        }
      ]
    },
    {
      t: "الـ build والـ deploy",
      l: 3,
      n: "ng build و environments و base-href، وترفع SPA على Nginx أو Docker",
      items: [
        {
          cmd: "ng build و environments",
          title: "build للإنتاج، و environment لكل بيئة، و base-href",
          desc: R`[[ng build]] بيبني بإعدادات [[production]] افتراضيًا: minify، و tree-shaking، وأسامي ملفات بـ hash، و budgets. الناتج في [[dist/shop/browser]] (و [[dist/shop/server]] لو SSR).

لإعدادات بتختلف بين البيئات (URL الـ API، مفاتيح analytics): [[ng g environments]] بيعمل [[environment.ts]] (الإنتاج) و [[environment.development.ts]]، و [[angular.json]] بيبدّل الملف وقت الـ build بـ [[fileReplacements]].

ولو التطبيق مش على جذر الدومين (زي [[example.com/portal/]])، لازم [[--base-href /portal/]].`,
          example: R`ng g environments
# src/environments/environment.ts
export const environment = { production: true, apiUrl: 'https://api.shop.eg' };
# src/environments/environment.development.ts
export const environment = { production: false, apiUrl: 'http://localhost:3000' };
# في الـ service:
private base = $__bt$__{environment.apiUrl}/products$__bt;
ng build
ng build --configuration development
ng build --base-href /portal/
ls dist/shop/browser`,
          try: R`اعمل الـ environments، واطبع [[environment.apiUrl]] في [[App]]. شغّل [[ng serve]] (development) وبعدين [[ng build]] وافتح الناتج بـ [[npx serve dist/shop/browser]]: القيمة اتغيرت؟ بعدين دوّر على الـ URL جوه [[dist/shop/browser/main-*.js]] بـ grep.`,
          deep: {
            why: "الـ API في التطوير localhost وفي الإنتاج دومين حقيقي، وممكن يبقى فيه staging. لو الـ URL مكتوب في الكود، هتغيّره بإيدك قبل كل رفع وهتنسى. الـ environments بتحل ده وقت الـ build.",
            how: R`[[fileReplacements]] في configuration [[development]] بيقول: «لما تبني development، حط [[environment.development.ts]] مكان [[environment.ts]]». فالكود دايمًا بيعمل [[import { environment } from '../environments/environment']]، و [[ng serve]] (development افتراضيًا) بياخد ملف التطوير، و [[ng build]] (production افتراضيًا) بياخد الأصلي.

القيم دي بتتحط جوه الـ JS وقت الـ build، يعني أي حد يفتح DevTools يشوفها: متحطش فيها أسرار (API keys خاصة، أو passwords). نفس قاعدة [[VITE_]] في «تاب React».

والعيب: لكل بيئة build منفصل. لو عايز build واحد يتنقل بين staging و production (زي Docker image واحدة)، اعمل [[config.json]] في [[public/]] وتقراه وقت التشغيل بـ [[provideAppInitializer(() => ...)]] قبل ما التطبيق يبدأ.

[[--base-href /portal/]] بيغيّر [[<base href>]] في index.html، فالراوتر والـ assets يشتغلوا تحت المسار ده.`,
            when: "URL الـ API، و feature flags بسيطة، ومفاتيح عامة (Google Maps key المقيدة بالدومين). ولو الشركة بتعمل image واحدة لكل البيئات: runtime config.",
            mistakes: R`تحط secret في environment. وتعمل [[import]] من [[environment.development]] مباشرة فالإنتاج ياخد localhost. وتنسى [[--base-href]] فالتطبيق يطلب [[/main.js]] من الجذر وتطلع 404 وصفحة بيضا. وتعدّل [[environment.ts]] وتفتكره اللي شغال في [[ng serve]].`
          },
          lines: [
            R`بيعمل الفولدر والملفين ويضيف [[fileReplacements]] في angular.json.`,
            "الإنتاج (الافتراضي).",
            "التطوير.",
            "الـ service بتقرا من environment، والـ build يختار الملف.",
            "production: minify و hash و budgets.",
            "من غير minify ومع source maps، وبملف التطوير.",
            R`لو التطبيق هيتحط تحت [[/portal/]].`,
            R`[[index.html]] و main و polyfills و styles و [[favicon.ico]] وأي حاجة في [[public/]].`
          ],
          sol: R`[[ng g environments]] في الـ lab طبع [[CREATE src/environments/environment.ts]] و [[CREATE src/environments/environment.development.ts]] و [[UPDATE angular.json]]، والملفين بيبدأوا [[export const environment = {};]] فاضيين، وفي [[angular.json]] تحت [[development]]: [[fileReplacements]] بيبدّل الأول بالتاني.

في [[ng serve]] هتشوف [[http://localhost:3000]]، وفي الـ build [[https://api.shop.eg]]. و [[grep -o "api.shop.eg" dist/shop/browser/main-*.js]] هيلاقيها: القيمة جوه الـ JS، ودي فكرة إنها مش سر.`
        },
        {
          cmd: "deploy",
          title: "ترفع تطبيق Angular: Nginx أو Docker أو static hosting",
          desc: R`تطبيق Angular من غير SSR = ملفات static في [[dist/shop/browser]]. أي سيرفر ملفات يقدمها، بشرط واحد: أي مسار مش ملف لازم يرجّع [[index.html]] (عشان refresh على [[/products/5]] يشتغل)، وده [[try_files]] في Nginx (درس «SPA» في «تاب Nginx»).

والملفات اللي أساميها فيها hash تتكيّش سنة، و [[index.html]] لأ.

مع SSR: محتاج Node شغال ([[node dist/shop/server/server.mjs]]) ورا Nginx كـ reverse proxy، أو platform بتدعم Node.`,
          example: R`# Dockerfile (multi-stage)
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx ng build
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/shop/browser /usr/share/nginx/html
# nginx.conf
server {
  listen 80;
  root /usr/share/nginx/html;
  location / { try_files $uri $uri/ /index.html; }
  location ~* \.(js|css|woff2|png|jpg|svg)$ { expires 1y; add_header Cache-Control "public, immutable"; }
}`,
          try: R`اعمل الـ Dockerfile والـ nginx.conf في مشروع الـ lab، و [[docker build -t shop .]] و [[docker run -p 8080:80 shop]]. افتح [[localhost:8080/products]] واعمل refresh. بعدين شيل سطر [[try_files]] وكرر.`,
          deep: {
            why: R`أشهر مشكلة في أول deploy لأي SPA: كل حاجة شغالة لحد ما حد يعمل refresh أو يفتح لينك مباشر، فيطلع 404 من Nginx لأن مفيش فولدر اسمه products. والكاش الغلط بيخلي المستخدمين عالقين على نسخة قديمة. الدرس ده بيحل الاتنين.`,
            how: R`Multi-stage (درس «multi-stage» في «تاب Docker»): المرحلة الأولى فيها Node و node_modules وبتبني، والتانية nginx فيها الناتج بس، فالـ image النهائية صغيرة ومفيهاش كود المصدر. وده نفس pattern درس «SPA جوه nginx» هناك.

[[try_files $uri $uri/ /index.html]]: جرّب الملف، وبعدين فولدر، وإلا ابعت index.html، والراوتر بتاع Angular في المتصفح يكمّل. [[npm ci]] بيسطّب من الـ lock file بالظبط. والـ image [[node:24]] لأن Angular 22 محتاج Node 22.22.3 أو 24.15 أو أحدث.

الملفات اللي فيها hash ([[main-LVPH3PYS.js]]) آمن تتكيّش للأبد: أي تغيير = اسم جديد. [[index.html]] لازم يتفحص كل مرة (من غير expires طويل) عشان يشاور على الأسامي الجديدة.

وفي CI («تاب GitHub Actions»): [[npm ci]] و [[ng test --watch=false]] و [[ng build]] وبعدين push للـ image أو رفع الفولدر. و static hosting (Netlify و Vercel و Firebase و Cloudflare Pages) بيحتاج نفس قاعدة الـ fallback لـ index.html بإعداداتهم.`,
            when: "Nginx أو Docker لما عندك VPS أو Kubernetes (الشائع في الشركات). Static hosting للمشاريع الصغيرة والـ portfolio. SSR لما محتاج SEO، وده محتاج Node process شغال دايمًا.",
            mistakes: R`تنسى [[try_files ... /index.html]] فالـ refresh يطلع 404. وتكيّش [[index.html]] سنة فالمستخدمين مش بيشوفوا الـ release الجديد. وتنسخ [[dist/shop]] بدل [[dist/shop/browser]] فالموقع يطلع directory listing أو 403. وتبني بـ Node 20 في الـ Dockerfile فالـ CLI يرفض.`
          },
          lines: [
            "مرحلة البناء بـ Node 24.",
            "فولدر الشغل.",
            "الـ package files الأول عشان الكاش (الطبقة دي بتتعاد بس لو الـ dependencies اتغيرت).",
            "تسطيب من الـ lock بالظبط.",
            "باقي الكود.",
            "build للإنتاج.",
            "مرحلة التشغيل: nginx بس.",
            "إعدادات الموقع.",
            R`الناتج بس من المرحلة الأولى، من [[browser]] بالظبط.`,
            "بلوك السيرفر.",
            "بورت 80 جوه الـ container.",
            "فولدر الملفات.",
            R`أي مسار: الملف، وإلا index.html والراوتر يتصرف.`,
            "الملفات الثابتة: كاش سنة لأن أساميها بـ hash.",
            "قفلة."
          ],
          sol: R`مع [[try_files]]: [[localhost:8080/products]] بيفتح، والـ refresh بيرجّع نفس الصفحة. من غيره: الصفحة الرئيسية بتفتح والتنقل بالـ links شغال (لأنه في المتصفح)، بس refresh على [[/products]] بيطلع [[404 Not Found]] من nginx، لأنه بيدوّر على ملف أو فولدر اسمه products.

لو الـ image مش بتتبني: اتأكد من [[.dockerignore]] فيه [[node_modules]] و [[dist]] و [[.angular]]، وإن المسار [[dist/shop/browser]] مطابق لاسم مشروعك في [[angular.json]].`
        }
      ]
    },
    {
      t: "الكود القديم: NgModules و RxJS في كل حتة",
      l: 3,
      n: "تقرا وتعدّل مشاريع Angular 8 لحد 16 اللي في البنوك والشركات، وترقّيها خطوة خطوة",
      items: [
        {
          cmd: "NgModule",
          title: "تقرا @NgModule: declarations و imports و providers و exports",
          desc: R`قبل Angular 14 (وكافتراضي لحد 17)، كل component لازم يبقى «متعرّف» في NgModule. لو اشتغلت في بنك أو شركة كبيرة في مصر، احتمال كبير تلاقي المشروع كده: [[AppModule]] و [[SharedModule]] و [[CoreModule]] و module لكل feature.

[[declarations]]: الـ components والـ directives والـ pipes اللي «بتاعة» الـ module ده. [[imports]]: modules تانية محتاجها (وبتاخد منها اللي عاملينه export). [[exports]]: اللي modules تانية تقدر تستخدمه لما تعمل import للـ module ده. [[providers]]: services. [[bootstrap]]: الـ component الأول (في AppModule بس).

والتشغيل: [[platformBrowserDynamic().bootstrapModule(AppModule)]] بدل [[bootstrapApplication]].`,
          example: R`@NgModule({
  declarations: [AppComponent, OrdersComponent, HighlightDirective, EgpPipe],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
// main.ts
platformBrowserDynamic().bootstrapModule(AppModule).catch((err) => console.error(err));
// feature lazy قديم
{ path: 'orders', loadChildren: () => import('./orders/orders.module').then((m) => m.OrdersModule) }`,
          try: R`في مشروع قديم (أو أي repo على GitHub فيه [[app.module.ts]])، اختار component واتتبّع: متعرّف في أنهي module؟ الـ template بتاعه بيستخدم [[<app-x>]]، الـ x ده جاي منين (declarations بتاعة نفس الـ module، ولا export من module متعمله import)؟ وبعدين حوّل component واحد لـ standalone بإيدك.`,
          deep: {
            why: R`الـ NgModule كان حل لمشكلة: الـ compiler محتاج يعرف الـ template ده مسموحله يستخدم أنهي components. بدل ما كل component يقول، الـ module كان بيجمعهم. المشكلة إنك لما تفتح component مش بتعرف هو شايف إيه غير لما تدوّر في الـ modules، و SharedModule بيكبر لحد ما يبقى فيه كل حاجة ويتعمله import في كل حتة. الـ standalone حل ده، بس ملايين السطور مكتوبة بالشكل القديم ولسه شغالة ومحتاجة حد يصونها.`,
            how: R`الـ component في [[declarations]] بيشوف: كل اللي في declarations بتاعة نفس الـ module، وكل اللي الـ modules المستوردة عاملينه [[exports]]. عشان كده [[*ngIf]] بتشتغل لأن [[BrowserModule]] (أو [[CommonModule]] في feature modules) بيعمل export لـ [[NgIf]].

كل component لازم يتعرّف في module واحد بس، ولو اتنين محتاجينه لازم module تالت يعمل له export. ولو نسيت: NG8001 'app-x' is not a known element، وده أشهر خطأ في Angular القديم.

[[providers]] في module بيتسجّلوا في injector التطبيق (لو eager) أو injector الـ lazy module، ودي كانت مصدر bugs: service في providers بتاع lazy module بتتعمل نسخة تانية غير اللي في الـ root. [[forRoot()]] و [[forChild()]] ([[RouterModule.forRoot(routes)]]) pattern عشان الـ providers تتسجّل مرة واحدة.

[[HttpClientModule]] deprecated دلوقتي (بديله [[provideHttpClient(withInterceptorsFromDi())]])، بس لسه موجود، والـ class interceptors بـ [[HTTP_INTERCEPTORS]] شغالة معاه. وفي الـ lab، module بالشكل ده اتعمله build واختبار على Angular 22 وشغال (الـ components فيها [[standalone: false]]).

وفي Angular 19 الـ [[standalone]] بقى [[true]] افتراضيًا، فالـ components القديمة لازم يتكتب عليها [[standalone: false]] صريح، و [[ng update]] بيعمل ده لوحده.`,
            when: R`لما تشتغل في مشروع موجود: امشي على شكله، وحط الـ components الجديدة standalone (ينفع يتعمل لها import في [[imports]] بتاع أي NgModule عادي). والتحويل الكامل بـ [[ng g @angular/core:standalone]] على ٣ مراحل (درس ng update).`,
            mistakes: R`تحط component في declarations بتاعة موديولين: خطأ compile. وتعمل import لـ [[BrowserModule]] في lazy module (لازم [[CommonModule]]). وتحط service في [[providers]] بتاع lazy module وتستغرب إن الـ state مش مشترك. وفي الانترفيو لو المشروع قديم: «الفرق بين declarations و imports و exports» سؤال ثابت.`
          },
          lines: [
            "الـ decorator بتاع الـ module.",
            R`components و directives و pipes «بتوع» الموديول ده (كلهم [[standalone: false]]).`,
            "modules محتاجينها.",
            R`لازم في AppModule بس (بيسجّل حاجات المتصفح و [[CommonModule]]).`,
            R`HTTP بالشكل القديم (deprecated، بديله [[provideHttpClient]]).`,
            R`الفورمات: بيعمل export لـ [[formGroup]] و [[formControlName]].`,
            R`module فيه [[RouterModule.forRoot(routes)]].`,
            "module مشترك فيه components و pipes عاملهم export.",
            "قفلة.",
            R`interceptor كـ class. [[multi: true]] يعني ضيفه لقايمة، متستبدلش.`,
            "الـ root component.",
            "قفلة.",
            "كلاس فاضي: كل الشغل في الـ decorator.",
            "تشغيل التطبيق من الـ module.",
            "lazy loading بالشكل القديم: module كامل مش routes."
          ],
          sol: R`الإجابة بتختلف حسب المشروع، بس الطريقة: [[grep -rn "OrdersComponent" src/app --include=*.module.ts]] يوريك الـ module اللي فيه declarations. وأي [[<app-x>]] في الـ template: دوّر على [[XComponent]] في declarations نفس الـ module، ولو مش موجود دوّر في exports بتاعة الـ modules اللي في imports (غالبًا SharedModule).

التحويل لـ standalone يدوي:`,
          solCode: R`// قبل: متعرّف في OrdersModule.declarations
@Component({ selector: 'app-order-card', standalone: false, templateUrl: './order-card.component.html' })
export class OrderCardComponent { @Input() order!: Order; }
// بعد: standalone وبيعلن اللي محتاجه
@Component({
  selector: 'app-order-card',
  imports: [CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './order-card.component.html',
})
export class OrderCardComponent { @Input() order!: Order; }
// وفي OrdersModule: شيله من declarations وحطه في imports`
        },
        {
          cmd: "RxJS القديم في component",
          title: "تقرا component قديم: @Input و ngOnInit و subscribe و takeUntil و BehaviorSubject",
          desc: R`ده شكل component «نموذجي» في مشروع Angular 8 لـ 16، وهتقابله كتير:

constructor injection: [[constructor(private ordersService: OrdersService)]]. و [[@Input()]] و [[@Output() x = new EventEmitter()]]. و [[ngOnInit]] فيه [[subscribe]] على [[route.paramMap]] أو service. و [[destroy$]] Subject مع [[takeUntil]] و [[ngOnDestroy]] عشان الـ unsubscribe. و [[BehaviorSubject]] في الـ service كـ state، و [[$]] على كل Observable. والـ template بـ [[*ngIf]] و [[*ngFor]] و [[| async]].

كل ده لسه شغال في Angular 22، بس بشرط: لو الـ component بيغيّر خصايص عادية جوه subscribe، لازم يبقى [[ChangeDetectionStrategy.Eager]] ومعاه zone.js، أو يتحوّل لـ signals.`,
          example: R`@Component({
  selector: 'app-orders',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit, OnDestroy {
  @Input() customerName = '';
  @Output() selected = new EventEmitter<Order>();
  orders: Order[] = [];
  loading = true;
  private destroy$ = new Subject<void>();
  constructor(private ordersService: OrdersService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((p) => p.get('id')),
      switchMap((id) => this.ordersService.byCustomer(id)),
      takeUntil(this.destroy$),
    ).subscribe((list) => { this.orders = list; this.loading = false; });
  }
  trackById(_: number, o: Order) { return o.id; }
  ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }
}
// orders.component.html
<p *ngIf="loading; else list">بيحمّل...</p>
<ng-template #list><li *ngFor="let o of orders; trackBy: trackById">{{ o.id }}</li></ng-template>`,
          try: R`اكتب نسخة حديثة من نفس الـ component: [[input()]] و [[output()]] و [[inject()]]، والـ id جاي كـ input من الراوتر، والطلبات بـ [[httpResource]] أو [[toSignal]]، و [[@if]] و [[@for]]. عدّ السطور قبل وبعد.`,
          flag: "script",
          deep: {
            why: R`في الشغل الحقيقي أغلب وقتك هيبقى في كود مكتوب من سنين: تصلّح bug، أو تضيف حقل، أو ترقّي نسخة. لو مش فاهم ليه [[destroy$]] موجود أو إيه اللي [[takeUntil]] بيعمله، هتكسر حاجة وانت بتعدّل. والفهم ده بيخليك تعرف تحوّل تدريجيًا من غير ما تعيد كتابة كل حاجة.`,
            how: R`[[constructor(private x: X)]] ده parameter properties («تاب TypeScript» فيه درس عنها) + constructor injection: Angular بيقرا أنواع الباراميترات (metadata) ويحقن. شغال لحد النهارده في [[@Component]] و [[@Injectable]] (مش [[@Service]]).

[[takeUntil(this.destroy$)]]: الـ Observable بيكمّل لحد ما [[destroy$]] يطلّع قيمة، و [[ngOnDestroy]] بيعمل [[next()]]. لازم يبقى آخر operator (بعد switchMap)، وإلا الـ inner observable ممكن يفضل شغال. البديل الحديث [[takeUntilDestroyed()]].

[[*ngIf="loading; else list"]] مع [[<ng-template #list>]] = [[@if (loading) {} @else {}]]. و [[*ngFor ... trackBy: trackById]] = [[@for (...; track o.id)]].

مشكلة Angular 22 الحقيقية: الكلاس بيعدّل [[this.orders]] جوه subscribe. مع zone.js و Eager، zone بيحس بنهاية الـ HTTP ويعمل change detection. في الـ lab، الـ component ده على Angular 22 zoneless من غير signals: بعد ما الرد وصل الشاشة فضلت «بيحمّل...» حتى مع Eager، واتحدّثت بس بعد [[markForCheck()]]. عشان كده [[ng update]] لـ 22 بيضيف [[Eager]] للـ components القديمة، والمشاريع القديمة بتفضل على zone.js ([[provideZoneChangeDetection()]]) لحد ما تتحوّل.

و [[BehaviorSubject]] في service ([[private s = new BehaviorSubject<Order | null>(null); selected$ = this.s.asObservable();]]) هو «signal» زمان: بيفتكر آخر قيمة، والـ components بتعمل subscribe أو [[| async]].`,
            when: R`اقراه وافهمه واصلحه بنفس الشكل لو التعديل صغير. ولو هتعيد كتابة component، حوّله للحديث. والـ migrations الجاهزة ([[inject]] و [[signal-input]] و [[outputs]] و [[control-flow]]) بتعمل ٧٠٪ من الشغل (الدرس الجاي).`,
            mistakes: R`تشيل [[takeUntil]] أو [[ngOnDestroy]] وانت بتنضّف فيحصل leak. وتحط [[takeUntil]] قبل [[switchMap]]. وتحوّل مشروع لـ zoneless وهو مليان [[this.x = ...]] جوه subscribe فالشاشات تبطّل تتحدّث في أماكن عشوائية. و subscribe جوه subscribe (nested) بدل switchMap: ده code smell كلاسيكي وممكن تتسأل عليه.`
          },
          lines: [
            "الـ decorator.",
            "الـ selector.",
            R`متعرّف في NgModule (لازم يتكتب صريح من 19).`,
            R`السلوك القديم: اتفحص في كل دورة (الـ migration بتاع 22 بيحطه).`,
            "الـ template في ملف لوحده.",
            "قفلة.",
            R`بيعمل implement للـ hooks كـ interfaces.`,
            R`input بالـ decorator القديم.`,
            R`output بـ [[EventEmitter]] (بيورث من Subject).`,
            "خاصية عادية، مش signal.",
            "نفس الكلام.",
            R`Subject بيطلّع قيمة لما الـ component يتقفل.`,
            R`constructor injection بـ parameter properties.`,
            "أول ما الـ inputs تتحط.",
            "الـ params كـ Observable.",
            "طلّع الـ id.",
            R`لكل id، الغي الطلب القديم واطلب الجديد.`,
            R`اقفل كل حاجة لما [[destroy$]] يطلّع (لازم آخر operator).`,
            "حط النتيجة في خصايص عادية: محتاج zone.js أو markForCheck عشان تظهر.",
            "قفلة.",
            R`[[trackBy]] بالـ id لـ [[*ngFor]].`,
            R`بلّغ [[takeUntil]] واقفل الـ Subject.`,
            "قفلة.",
            R`[[*ngIf]] و [[else]] بيشاور على [[ng-template]].`,
            R`[[*ngFor]] مع [[trackBy]].`
          ],
          sol: R`النسخة الحديثة (حوالي نص الحجم، ومن غير lifecycle hooks ولا unsubscribe يدوي):`,
          solCode: R`@Component({
  selector: 'app-orders',
  imports: [CurrencyPipe],
  template: $__bt
    @if (orders.isLoading()) {
      <p>بيحمّل...</p>
    } @else {
      @for (o of orders.value() ?? []; track o.id) {
        <li (click)="selected.emit(o)">{{ o.id }} - {{ o.total | currency: 'EGP' }}</li>
      }
    }
  $__bt,
})
export class Orders {
  id = input.required<string>();          // من :id بفضل withComponentInputBinding
  customerName = input('');
  selected = output<Order>();
  orders = httpResource<Order[]>(() => $__bt/api/customers/$__{this.id()}/orders$__bt);
}`
        },
        {
          cmd: "ng update و migrations",
          title: "ترقّي مشروع قديم نسخة نسخة، وتستخدم الـ migrations الجاهزة",
          desc: R`[[ng update]] بيرقّي Angular وبيشغّل «migrations» بتعدّل الكود لوحدها (يغيّر imports، ويضيف [[standalone: false]]، ويضيف [[Eager]] في 22...). والقاعدة: major واحدة في المرة: 15 ← 16 ← 17، مش 15 ← 22 مرة واحدة. ودليل كل نقلة على [[angular.dev/update-guide]].

وفيه migrations اختيارية تحوّل الكود للشكل الحديث: [[ng g @angular/core:standalone]]، و [[:control-flow]]، و [[:inject]]، و [[:signal-input-migration]]، و [[:output-migration]]، و [[:signal-queries-migration]]، و [[:route-lazy-loading]]، و [[:service]] (يحوّل Injectable لـ Service في 22).`,
          example: R`git switch -c upgrade-17
ng update
ng update @angular/core@17 @angular/cli@17
ng test --watch=false && ng build
ng g @angular/core:control-flow
ng g @angular/core:standalone
ng g @angular/core:inject
ng g @angular/core:signal-input-migration
ng g @angular/core:output-migration`,
          try: R`في مشروع الـ lab اعمل component بالشكل القديم ([[@Input]] و [[@Output]] و [[constructor(private x: X)]] و [[*ngIf]] في الـ template)، واعمل commit، وبعدين شغّل migrations [[inject]] و [[signal-input-migration]] و [[output-migration]] و [[control-flow]] واحدة واحدة، وبعد كل واحدة [[git diff]].`,
          deep: {
            why: R`Angular بيدعم كل major ١٨ شهر بس. مشروع واقف على 12 من غير security fixes، ومش بيشتغل على Node جديد، وكل مكتبة جديدة مش متوافقة. والشركات بتأجل لأنها خايفة. لو عرفت ترقّي صح، دي مهارة مطلوبة جدًا في السوق المصري، وسؤال انترفيو: «عملت migration قبل كده؟ إزاي؟».`,
            how: R`[[ng update]] من غير arguments بيقولك إيه اللي محتاج يتحدّث. [[ng update @angular/core@17 @angular/cli@17]] بيحدّث الباكدجات ويشغّل الـ migrations الإجبارية للنسخة دي. في 22 مثلًا (من [[migrations.json]] في [[@angular/core]]): إضافة [[ChangeDetectionStrategy.Eager]] لكل components، و [[withXhr()]] لو كنت بتستخدم XHR backend، و [[strictTemplates: false]] لو مش متحط، و [[withNoIncrementalHydration()]] لو مكنتش مفعّلها.

المكتبات التانية (Material و NgRx و PrimeNG) لازم تتحدّث معاه لنفس الـ major: [[ng update @angular/material@17]]. ومكتبة مش بتدعم النسخة الجديدة = عائق لازم تحله الأول.

Node لازم يطابق كل نسخة: 22 محتاج [[^22.22.3 || ^24.15.0 || >=26]]. و TypeScript بيتحدّث معاه (22 على [[~6.0]] في الـ lab).

الـ migrations الاختيارية (schematics في [[@angular/core]]): [[standalone]] بيشتغل على ٣ مراحل (حوّل الـ components، وبعدين شيل الـ NgModules اللي فضيت، وبعدين bootstrapApplication). و [[signal-input-migration]] بيحوّل [[@Input]] لـ [[input()]] ويعدّل كل مكان بيقراه ([[this.x]] ← [[this.x()]]) لو قدر، وبيسيب اللي مش آمن (زي input بيتكتب عليه) مع تعليق.

بعد كل خطوة: build و test وتجربة يدوية، و commit.`,
            when: "ترقية نسخة كل ٦ شهور لـ ١٢ شهر وانت متأخر نسخة واحدة أسهل بكتير من ٥ نسخ مرة واحدة. والـ migrations الاختيارية على جزء من المشروع (فولدر) كل sprint.",
            mistakes: R`تقفز كذا major مرة واحدة فالـ migrations بتاعة النسخ اللي في النص متتشغّلش. وتشغّل migration على المشروع كله من غير git commit قبلها. وتحدّث Angular وتنسى Material أو NgRx. وتعمل [[--force]] عشان peer dependency بتعترض وتكتشف بعدين إن المكتبة مش شغالة.`
          },
          lines: [
            "branch للترقية.",
            "يوريك الباكدجات اللي ليها تحديثات.",
            R`ترقية major واحدة لـ core و cli مع الـ migrations بتاعتها.`,
            "اتأكد إن كله سليم قبل الخطوة الجاية.",
            R`[[*ngIf]] و [[*ngFor]] ← [[@if]] و [[@for]].`,
            "NgModules ← standalone (بيسألك أنهي مرحلة).",
            R`constructor injection ← [[inject()]].`,
            R`[[@Input]] ← [[input()]].`,
            R`[[@Output]] ← [[output()]].`
          ],
          sol: R`اتجرّب في الـ lab على component فيه [[@Input() name]] و [[@Input() tags]] و [[@Output() saved]] و [[constructor(private http: HttpClient)]] و [[*ngIf]] و [[*ngFor]] (واحد بـ trackBy وواحد من غير):

[[inject]]: الـ constructor اتشال وبقى [[private http = inject(HttpClient);]]. [[signal-input-migration]]: طبع [[Migrated 1/2 inputs]]: [[tags]] بقت [[readonly tags = input<string[]>([]);]] والـ template بقى [[tags()]]، لكن [[name]] فضل [[@Input()]]، ومع [[--insert-todos]] كتب فوقه [[TODO: Skipped for migration because: This input is used in a control flow expression (e.g. @if or *ngIf) and migrating would break narrowing currently.]] [[output-migration]]: [[readonly saved = output<string>();]] و Migrated 1 out of 1. [[control-flow]]: [[*ngIf="name"]] بقت [[@if (name) { }]]، و [[*ngFor]] اللي فيها trackBy بقت [[track byTag($index, t)]]، واللي من غيرها بقت [[track t]]، و [[NgIf]] و [[NgFor]] اتشالوا من الـ imports.

يعني الـ migrations مش بتكسر حاجة عشان تكمّل: اللي مش آمن بتسيبه وتقولك ليه. بعد كل واحدة: [[ng build]] و [[ng test --watch=false]].`
        }
      ]
    },
    {
      t: "أسئلة انترفيو",
      l: 3,
      n: "الأسئلة اللي بتتكرر في انترفيوهات Angular، بإجابة تقولها بصوتك في دقيقة",
      items: [
        {
          cmd: "change detection؟",
          title: "change detection في Angular بتشتغل إزاي؟ و OnPush و zone.js و zoneless؟",
          desc: R`الإجابة في دقيقة: «change detection هي إن Angular يقارن القيم في الـ templates بآخر قيم رسمها ويحدّث الـ DOM. زمان zone.js كان بيراقب كل async (clicks و timers و HTTP) وبعد كل واحدة يفحص شجرة الـ components كلها من فوق لتحت. OnPush بيخلي الـ component يتفحص بس لو input اتغير بالـ reference، أو event جواه، أو async pipe، أو markForCheck. ومن Angular 21 الافتراضي zoneless، ومن 22 OnPush افتراضي: Angular بيعرف إن فيه تغيير من الـ signals والـ events بس، فالتحديث أدق وأخف، والكود لازم يستخدم signals للـ state.»`,
          example: R`@Component({ selector: 'app-user-card', template: $__bt{{ user().name }}$__bt })
export class UserCard { user = input.required<User>(); }
// في الأب:
this.user.name = 'علي';                        // mutation: نفس الـ reference، الابن مش هيتحدّث
this.user = { ...this.user, name: 'علي' };      // reference جديد: هيتحدّث
this.user.set({ ...this.user(), name: 'علي' }); // لو الأب شايله في signal`,
          try: R`اشرح بصوتك في دقيقة، وبعدين جاوب على السؤال اللي بعده: «ليه كود قديم بيعمل [[this.data = res]] جوه subscribe اشتغل سنين، ولما اتنقل لـ zoneless بطّل يحدّث الشاشة؟»`,
          flag: "script",
          deep: {
            why: "أكتر سؤال Angular بيتسأل، من junior لـ senior. بيختبر إنك فاهم الـ framework بيشتغل إزاي، ومش بتعمل setTimeout و detectChanges عشوائي لما حاجة متتحدّثش.",
            how: R`نقط لو اتسألت أكتر: zone.js بيعمل monkey-patch لـ APIs المتصفح، و [[NgZone.runOutsideAngular]] كان بيستخدم عشان حاجات كتير (scroll و mousemove) متعملش CD. و [[ExpressionChangedAfterItHasBeenCheckedError]] (NG0100) بيطلع في dev لما قيمة تتغير أثناء الفحص نفسه (مثلًا في [[ngAfterViewInit]])، لأن Angular بيعمل فحص تاني للتأكد. و [[markForCheck()]] بيعلّم الـ component وأجداده dirty، و [[detectChanges()]] بيفحص الـ component ده وأبناءه دلوقتي حالًا. ومع signals، Angular بيقدر يحدّث الـ view اللي قرت الـ signal بس (مش كل الأجداد). و [[ChangeDetectionStrategy.Eager]] هو اسم Default الجديد في 22.`,
            when: R`«OnPush بيشتغل إزاي؟»، و «إمتى تستخدم markForCheck ولا detectChanges؟»، و «إيه ExpressionChangedAfterItHasBeenChecked وإزاي تحلها؟»، و «zoneless يعني إيه ومحتاج إيه من الكود؟»، و «ليه الـ input اللي اتعدّل mutation مش بيظهر في الابن؟».`,
            mistakes: R`«Angular بيعمل virtual DOM زي React»: لأ، Angular بيحوّل الـ template لتعليمات بتحدّث الـ DOM مباشرة وبيقارن قيم الـ bindings، مفيش virtual DOM. و «OnPush يعني الـ component مش بيتحدّث خالص». و «zone.js اتشال خلاص من Angular»: لسه مدعوم ومستخدم في المشاريع القديمة، هو بس مبقاش الافتراضي.`
          },
          lines: [
            "component ابن بياخد user كـ input (OnPush افتراضي).",
            "قفلة.",
            "تعديل جوه نفس الـ object: الـ input شايف نفس الـ reference فمفيش تغيير.",
            "object جديد: الـ input اتغير.",
            "نفس الفكرة بـ signal."
          ],
          sol: R`إجابة السؤال التاني: «مع zone.js، الـ HTTP نفسه كان بيعدّي من zone، فلما الرد يوصل zone تبلّغ Angular يعمل change detection للتطبيق كله، فأي خاصية اتغيرت بتظهر. في zoneless مفيش حد بيبلّغ: Angular بيتحدّث بس لما signal تتغير أو event من الـ template أو async pipe أو markForCheck. الـ subscribe بيغيّر خاصية عادية، فمحدش عارف. الحل: الـ state في signals (أو toSignal)، أو مؤقتًا markForCheck، أو تفضّل على zone.js بـ provideZoneChangeDetection لحد ما تحوّل.» وده حصل فعلًا في الـ lab على component قديم.`
        },
        {
          cmd: "DI hierarchy؟",
          title: "الـ DI في Angular بيدوّر على الـ service فين؟ root و route و component",
          desc: R`الإجابة في دقيقة: «لما component يطلب [[inject(X)]]، Angular بيدوّر في شجرتين بالترتيب: الأول الـ element injectors، يعني providers بتاعة الـ component نفسه، وبعدين أبوه في الـ DOM، لحد الـ root component. لو ملقاش، بيروح للـ environment injectors: injector الـ lazy route لو فيه providers، وبعدين الـ root (providedIn: 'root' و app.config)، وبعدين الـ platform، ولو ملقاش خالص NullInjector بيرمي NG0201. أول واحد يلاقيه بيكسب. فلو حطيت service في providers بتاع component، كل instance من الـ component بياخد نسخة لوحده، ودي بتتدمّر معاه.»`,
          example: R`@Injectable({ providedIn: 'root' }) export class Session {}   // نسخة واحدة للتطبيق
@Injectable() export class FormState {}                      // مش متسجّلة لوحدها
@Component({ selector: 'app-editor', template: '', providers: [FormState] })
export class Editor { state = inject(FormState); }           // نسخة لكل editor
{ path: 'admin', providers: [AdminApi], loadChildren: () => import('./admin/admin.routes').then((m) => m.adminRoutes) }
inject(Logger, { optional: true });                            // null لو مش موجود بدل NG0201
inject(Parent, { skipSelf: true });                            // ابدأ من الأب
{ provide: PaymentGateway, useClass: environment.production ? Paymob : FakeGateway }`,
          try: R`اعمل [[Counter]] بـ [[@Injectable()]] فيه [[n = Math.random()]]، وحطه في providers بتاع component، واعمل اتنين من الـ component: نفس الرقم؟ وبعدين component تاني بيعمل [[inject(Counter, { optional: true })]] من غير providers: بيرجّع إيه؟ واشرح النتيجتين.`,
          flag: "script",
          deep: {
            why: "DI هو قلب Angular، والسؤال ده بيفرّق بين حد بيحفظ providedIn: 'root' وحد فاهم ليه state اتشارك أو متشاركش، وليه service اتعملت مرتين، وإزاي تعمل mock في الاختبار.",
            how: R`نقط أكتر: [[useClass]] و [[useValue]] و [[useFactory]] و [[useExisting]] أشكال الـ provider. و [[InjectionToken<T>]] لقيم مش classes ([[API_URL]] مثلًا). و [[multi: true]] بيجمّع كذا provider في array (زي [[HTTP_INTERCEPTORS]] القديم). و [[viewProviders]] زي providers بس مش ظاهرة للـ content اللي جاي من [[ng-content]]. و [[@Service()]] الجديد في 22 = root singleton افتراضيًا (إلا مع [[autoProvided: false]] فتسجّله انت في providers) ومفيهوش useClass. والـ providers على الـ route بتعمل environment injector للـ route وأبناءه، ومفيد لـ state خاص بقسم. و [[inject()]] لازم injection context، و [[runInInjectionContext(injector, fn)]] لو لازم بره.`,
            when: R`«providedIn: 'root' يعني إيه وليه tree-shakable؟»، و «إيه الفرق بين providers في component وفي app.config؟»، و «إزاي تعمل service مختلفة في الاختبار أو في بيئة معينة؟»، و «إيه InjectionToken؟»، و «ليه ممكن تلاقي نسختين من service المفروض singleton؟» (providers في lazy module أو component).`,
            mistakes: R`«DI يعني singleton». و «الـ service في providers بتاع component بتتشارك مع باقي التطبيق». وتنسى إن الـ element injectors ماشية على شجرة الـ DOM (الأب في الـ template) مش شجرة الـ modules.`
          },
          lines: [
            "في الـ root: نسخة واحدة لكل التطبيق.",
            "من غير providedIn: لازم حد يسجّلها.",
            "component بيسجّلها لنفسه.",
            "كل instance من الـ editor بياخد FormState جديدة، وبتتدمّر معاه.",
            "providers على route: injector للقسم ده بس.",
            "لو مش لاقيه يرجّع null.",
            "يتخطى الـ component نفسه ويدوّر من الأب.",
            "نفس الـ token، تنفيذ مختلف حسب البيئة."
          ],
          sol: R`اتجرّب في الـ lab: اتنين component عليهم [[providers: [Counter]]] أخدوا نسختين مختلفتين ([[a1.c === a2.c]] بـ false)، واتنين بيعملوا inject لـ service في الـ root أخدوا نفس النسخة (true)، والـ component اللي من غير providers و [[optional: true]] رجّعله [[null]].

الشرح: الأول كل component ليه element injector بيسجّل Counter جواه، فأول مكان بيدوّر فيه بيلاقي نسخة خاصة. التاني مفيش في أي injector في الطريق، ولولا optional كان NG0201: No provider found for Counter.`
        },
        {
          cmd: "signals ولا RxJS؟",
          title: "إمتى signals وإمتى RxJS؟ وهل RxJS هيختفي من Angular؟",
          desc: R`الإجابة في دقيقة: «signals للـ state: قيمة ليها قيمة حالية دايمًا، سهلة القراية synchronously، ومتكاملة مع change detection، وبتعمل computed لوحدها. RxJS للـ events والـ async مع الوقت: stream من القيم محتاج debounce و switchMap و retry و combine و cancellation. الاتنين بيكمّلوا بعض: toSignal و toObservable بيوصلوا بينهم. في Angular الحديث: state في signals، و HTTP بسيط بـ httpResource، و streams معقدة بـ RxJS وبعدين toSignal للعرض. RxJS مش هيختفي، بس بقى اختياري أكتر: مش لازم تعرفه عشان تعمل counter.»`,
          example: R`// state: signal
readonly cart = signal<CartItem[]>([]);
readonly total = computed(() => this.cart().reduce((s, i) => s + i.price * i.qty, 0));
// stream معقد: RxJS وبعدين signal للعرض
readonly results = toSignal(
  toObservable(this.query).pipe(debounceTime(300), distinctUntilChanged(), switchMap((q) => this.api.search(q))),
  { initialValue: [] },
);`,
          try: R`اشرح بصوتك، وبعدين قول هتستخدم إيه في كل حالة وليه: (١) اسم المستخدم الحالي، (٢) websocket بيبعت أسعار كل ثانية ومحتاج تعرض آخر سعر، (٣) زرار حفظ مينفعش يتداس مرتين والطلب شغال، (٤) فلتر بيتغير وبيجيب بيانات.`,
          flag: "script",
          deep: {
            why: "السؤال ده بقى أساسي من ٢٠٢٤: بيختبر إنك متابع Angular الحديث، ومش بتقول «RxJS مات» ولا «signals ملهاش لازمة». الإجابة الناضجة إن كل أداة ليها مكان.",
            how: R`نقط أكتر: signal دايمًا ليها قيمة (Observable ممكن ميكونش طلّع حاجة)، وقرايتها synchronous. و signals «glitch-free»: computed مش هتشوف حالة نص-محدّثة. والـ signals push-pull: التغيير بيعلّم dirty والحساب lazy وقت القراية. و RxJS operators زي [[combineLatest]] و [[retry]] و [[exhaustMap]] و [[bufferTime]] ملهمش مقابل مباشر في signals. و [[effect]] مش بديل لـ subscribe في كل حاجة. و [[resource]] و [[httpResource]] بيغطوا حالة «جيب بيانات لما signal تتغير» اللي كانت أشهر استخدام لـ switchMap.`,
            when: R`«هل تستخدم BehaviorSubject للـ state ولا signal؟» (signal في الجديد)، و «ليه Angular عمل signals بدل ما يكمّل بـ RxJS؟» (بساطة، و zoneless، و performance أدق، و learning curve)، و «إزاي تحوّل بينهم؟» (toSignal و toObservable و takeUntilDestroyed).`,
            mistakes: R`«RxJS هيتشال من Angular» (الـ HttpClient والـ router والـ forms لسه بيستخدموه). و «signals بديل RxJS في كل حاجة» ثم تحاول تعمل debounce بـ effect و setTimeout. و «هحط كل حاجة في BehaviorSubject» في كود جديد.`
          },
          lines: [
            "state عادي: signal فيها قيمة حالية دايمًا.",
            "قيمة مشتقة من غير أي subscribe.",
            "stream معقد، والنتيجة النهائية signal للعرض.",
            "signal ← Observable، وبعدين operators الوقت والإلغاء.",
            "قيمة لحد أول رد.",
            "قفلة."
          ],
          sol: R`(١) signal في service: قيمة حالية بسيطة. (٢) RxJS للـ websocket ([[webSocket()]] من rxjs أو Observable)، وبعدين [[toSignal]] لآخر سعر في الشاشة. (٣) RxJS [[exhaustMap]] لو الضغطات stream، أو ببساطة signal [[saving]] والزرار [[[disabled]="saving()"]]، والاتنين إجابات مقبولة لو شرحت. (٤) [[httpResource]] لو مفيش debounce، أو [[toObservable]] + [[debounceTime]] + [[switchMap]] + [[toSignal]] لو فيه.

أهم جملة تقولها: «signals للـ state، و RxJS للـ events والـ async المعقد، و interop بينهم».`
        },
        {
          cmd: "lifecycle hooks؟",
          title: "ترتيب الـ lifecycle hooks، وإيه اللي بدّلهم في Angular الحديث",
          desc: R`الإجابة في دقيقة: «الترتيب: constructor (الـ DI بس، الـ inputs لسه ماتحطتش)، وبعدين ngOnChanges مع كل تغيير في input، وبعدين ngOnInit مرة بعد أول inputs، وبعدين ngDoCheck و ngAfterContentInit/Checked و ngAfterViewInit/Checked لما الـ view والأبناء يترسموا، و ngOnDestroy لما يتشال. في الحديث: input signals و computed بدل ngOnChanges، و effect أو toSignal بدل منطق ngOnInit، و viewChild signal بدل @ViewChild مع ngAfterViewInit، و afterNextRender لأي حاجة محتاجة DOM، و DestroyRef و takeUntilDestroyed بدل ngOnDestroy.»`,
          example: R`export class Life implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  name = input('');
  box = viewChild.required<ElementRef<HTMLInputElement>>('box');
  constructor() {
    inject(DestroyRef).onDestroy(() => console.log('DestroyRef'));
    effect(() => console.log('effect', this.name()));
    afterNextRender(() => this.box().nativeElement.focus());
  }
  ngOnChanges(c: SimpleChanges) { console.log('ngOnChanges', Object.keys(c)); }
  ngOnInit() { console.log('ngOnInit', this.name()); }
  ngAfterViewInit() { console.log('ngAfterViewInit', this.box().nativeElement.tagName); }
  ngOnDestroy() { console.log('ngOnDestroy'); }
}`,
          try: R`حط الـ component ده (template [[<input #box />]]) واعمل له [[setInput('name', 'سارة')]] في اختبار، وبعدين [[setInput('name', 'علي')]]، وبعدين [[fixture.destroy()]]. اكتب الترتيب المتوقع قبل ما تشغّل.`,
          flag: "script",
          deep: {
            why: R`سؤال كلاسيكي في كل انترفيو Angular، ومهم في الشغل: كود بيقرا input في الـ constructor، أو بيلمس [[@ViewChild]] في [[ngOnInit]]، أو بيعمل subscribe من غير ngOnDestroy، كلهم bugs بتيجي من عدم فهم الترتيب.`,
            how: R`نقط أكتر: [[ngOnChanges]] بتتنادى بس لو فيه inputs، وقبل [[ngOnInit]]. و [[ngDoCheck]] بتتنادى مع كل change detection فأي حاجة تقيلة فيها بتبطّأ كل حاجة. و [[ngAfterViewInit]] أول مكان [[@ViewChild]] بيبقى جاهز فيه (أو في [[ngOnInit]] لو [[{ static: true }]]). وتعديل state في [[ngAfterViewInit]] بيطلّع NG0100. و [[afterNextRender]] بيشتغل في المتصفح بس (مش SSR) وبعد ما الـ DOM اتحدّث، و [[afterRenderEffect]] نسخة reactive منه. والـ effect بيشتغل أثناء change detection بعد ما الـ inputs اتحطت، مش في الـ constructor نفسه.`,
            when: R`«الفرق بين constructor و ngOnInit؟» (DI مقابل init بعد الـ inputs)، و «فين تعمل subscribe وفين تلغيه؟»، و «@ViewChild بيبقى جاهز إمتى؟»، و «إيه اللي بدّل ngOnChanges مع signal inputs؟» (computed و effect).`,
            mistakes: R`تقرا input في الـ constructor. وتعمل منطق تقيل أو HTTP في الـ constructor بدل ngOnInit (في الكود القديم). وتنسى إن [[ngOnChanges]] مش بتتنادى لو الـ input اتغير mutation (نفس الـ reference). وتقول إن [[ngOnInit]] بيتنادى مع كل تغيير.`
          },
          lines: [
            "بيعمل implement للـ interfaces عشان الـ compiler يفحص الأسامي.",
            "input signal.",
            R`[[viewChild]] signal: بيبقى جاهز بعد ما الـ view يترسم.`,
            "الـ constructor: DI و effects بس، الـ inputs لسه مش موجودة.",
            R`بديل [[ngOnDestroy]].`,
            R`بيشتغل أول مرة بعد ما الـ inputs تتحط، وتاني مع كل تغيير.`,
            "في المتصفح بس، بعد أول رسم: الـ DOM جاهز.",
            "قفلة.",
            "مع كل تغيير في input (بالـ reference).",
            "مرة، بعد أول ngOnChanges.",
            R`الـ view جاهز، و [[box()]] موجود.`,
            "قبل ما يتشال.",
            "قفلة."
          ],
          sol: R`الترتيب الحقيقي من الـ lab على Angular 22:

[[constructor]] ← [[ngOnChanges name]] ← [[ngOnInit سارة]] ← [[effect سارة]] ← [[ngAfterViewInit INPUT]] ← [[afterNextRender INPUT]] ← (بعد setInput التاني) [[ngOnChanges name]] ← [[effect علي]] ← (بعد destroy) [[ngOnDestroy]] ← [[DestroyRef]].

لاحظ: الـ effect أول مرة اشتغل بعد ngOnInit مش في الـ constructor، و [[ngOnInit]] مااتنداش تاني مع التغيير، و [[afterNextRender]] بعد [[ngAfterViewInit]]، و callbacks الـ DestroyRef بعد [[ngOnDestroy]].`
        },
        {
          cmd: "Angular ولا React؟",
          title: "Angular ولا React؟ وليه الشركات الكبيرة في مصر بتختار Angular",
          desc: R`الإجابة في دقيقة: «React مكتبة للواجهة، وانت بتختار الراوتر والفورمات والـ state والـ fetching من الـ ecosystem، فمرونة كبيرة بس كل مشروع شكله مختلف. Angular framework كامل ورأيه واضح: DI، و router، و forms، و HttpClient، و testing، و i18n، و CLI، كلهم رسميين ومتحدّثين مع بعض كل ٦ شهور. عشان كده الشركات الكبيرة والبنوك بتحبه: أي مطوّر Angular بيفهم أي مشروع Angular، والـ TypeScript والـ DI بيخلوا الكود الكبير منظم وقابل للاختبار. التمن: learning curve أعلى وكلام أكتر. ومع standalone و signals و control flow، الفرق في الكتابة قلّ كتير.»`,
          example: R`// React: الـ state و الـ derived في function component
const [qty, setQty] = useState(1);
const total = price * qty;
// Angular: signal و computed في class
qty = signal(1);
total = computed(() => this.price() * this.qty());
// React: context أو Zustand للمشترك / Angular: service و inject()
const cart = useCartStore();
cart = inject(Cart);`,
          try: R`اكتب جدول صغير لنفسك: ٥ حاجات (routing، forms، HTTP، state مشترك، testing) وقدام كل واحدة اللي بتستخدمه في React (من «تاب React») واللي في Angular. وبعدين جاوب بصوتك: «لو هتبدأ مشروع ERP لشركة فيها ٣٠ مطوّر، تختار إيه وليه؟»`,
          flag: "script",
          deep: {
            why: "بيتسأل كتير خصوصًا لو الـ CV فيه الاتنين، أو الشركة بتفكر تنقل. بيختبر إنك بتفكر في trade-offs مش في «ده أحسن». وفي السوق المصري: إعلانات البنوك وشركات الـ fintech والحكومة والشركات الكبيرة فيها Angular كتير، والـ startups أكتر React.",
            how: R`نقط للمقارنة: الـ rendering: React بـ virtual DOM و re-render للـ component، و Angular بـ compiled templates و change detection (ودلوقتي signals بتحدّث الـ bindings المحددة). الـ templates: JSX (JavaScript كامل) مقابل HTML templates بـ syntax خاص ([[@if]] و [[[prop]]] و [[(event)]]). الـ state: hooks مقابل signals و services. الـ DI: مفيش في React (context أقرب حاجة) و Angular مبني عليه. الـ SSR: Next.js (framework تاني) مقابل [[@angular/ssr]] من نفس الفريق. والتحديثات: Angular بـ [[ng update]] و migrations أوتوماتيك، و React كل مكتبة بترقّيها لوحدها.`,
            when: R`«ليه اخترت Angular في المشروع ده؟»، و «إيه اللي عاجبك ومش عاجبك في Angular؟» (اذكر حاجة حقيقية زي boilerplate NgModules القديم أو RxJS learning curve، وقول إنها اتحلت إزاي)، و «تقدر تشتغل React لو احتجنا؟».`,
            mistakes: R`تهاجم التانية («React فوضى» أو «Angular تقيل وقديم»). وتقارن Angular 2016 بـ React 2026. وتقول «Angular أسرع» أو «React أسرع» من غير سياق: الاتنين كفاية لأغلب التطبيقات، والأداء بيتحدد من الكود.`
          },
          lines: [
            "state في React.",
            "قيمة محسوبة: بتتحسب مع كل render.",
            "state في Angular.",
            "محسوبة و memoized.",
            "store مشترك في React (Zustand).",
            "service مشتركة في Angular."
          ],
          sol: R`الجدول: routing: React Router أو Next ↔ [[@angular/router]]. forms: react-hook-form + zod ↔ reactive أو signal forms. HTTP: fetch + TanStack Query ↔ HttpClient + httpResource. state: Zustand/Redux/context ↔ services بـ signals أو NgRx. testing: Vitest + Testing Library ↔ Vitest + TestBed (والاتنين Vitest دلوقتي).

إجابة الـ ERP: «Angular غالبًا: فريق كبير محتاج شكل واحد، وفورمات كتير (reactive forms قوية)، وصلاحيات و guards، و DI بيسهّل الاختبار والـ mocks، و i18n و RTL رسميين، وترقيات منظمة. React تنفع برضه لو الفريق خبرته فيها وحطينا conventions صارمة من الأول.» المهم تذكر السبب مش الاسم.`
        }
      ]
    }
  ]
});
