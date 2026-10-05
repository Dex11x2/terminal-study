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
    }
  ]
});
