// تكملة تاب angular: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/angular/01.js (شرح حقول الدرس في أوله)
MORE("angular", [
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
]);
