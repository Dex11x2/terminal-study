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
          teach: R`## الفكرة: ٤ أزرار، وكلهم بيزوّدوا رقم

الـ component في المثال فيه رقمين معروضين: [[plain]] (خاصية عادية) و [[count]] (signal). وكل method بتزوّد واحد منهم بطريقة مختلفة. السؤال في كل مرة: **مين قال لـ Angular إن الشاشة محتاجة تتحدّث؟** لو محدش قال، الرقم بيتغير في الذاكرة والشاشة بتفضل زي ما هي.

اتجرّب في مشروع [[ng new shop --ssr]] جديد (Angular CLI 22.2.2 و Angular 22.2.1 على Node 24، ويندوز)، والـ component على route [[/cd]]، وبعد كل ضغطة قرينا الـ DOM من Chrome headless بـ playwright-core.

---

## ١. الـ decorator والـ template

~~~text cd.ts
@Component({
  selector: 'app-cd',
  template: $__bt<p>عادي: {{ plain }}</p> <p>signal: {{ count() }}</p> <button (click)="click()">دوس</button>$__bt,
})
~~~

- [[@Component({...})]]: decorator، يعني دالة بتتحط فوق الكلاس بـ [[@]] وبتقول لـ Angular «الكلاس ده component، ودي إعداداته».
- [[selector: 'app-cd']]: اسم الـ tag اللي هيظهر في الـ HTML ([[<app-cd>]]).
- [[template]]: الـ HTML بتاع الـ component، مكتوب بين backticks عشان يبقى أكتر من سطر لو احتجنا.
- [[{{ plain }}]]: interpolation، اعرض قيمة الخاصية [[plain]] كنص.
- [[{{ count() }}]]: الـ signal بتتقري بالأقواس [[()]]. القراية دي هي اللي بتخلي Angular «يربط» الـ template بالـ signal.
- [[(click)="click()"]]: event binding، لما الزرار يتضغط نادي الـ method [[click()]].

ولاحظ إن مفيش [[changeDetection]] مكتوب. في Angular 22 ده معناه **OnPush**. اتأكدنا من الـ enum نفسه في [[node_modules/@angular/core]]:

~~~text ChangeDetectionStrategy في Angular 22.2
OnPush = 0     // NOTE: OnPush is enabled by default.
Eager = 1
Default = 1    // @deprecated Use Eager instead.
~~~

يعني [[Eager]] و [[Default]] نفس الرقم، و [[Default]] اسم قديم هيتشال.

---

## ٢. الخصايص

~~~text cd.ts
plain = 0;
count = signal(0);
private cdr = inject(ChangeDetectorRef);
~~~

| السطر | هو إيه | Angular يعرف إنه اتغير؟ |
|---|---|---|
| [[plain = 0]] | رقم عادي في الكلاس | لأ. ده متغير JavaScript، محدش بيراقبه |
| [[count = signal(0)]] | signal قيمتها الأولى 0 | أيوه: أي [[set]] أو [[update]] بيبلّغ الـ templates اللي قرتها |
| [[inject(ChangeDetectorRef)]] | يجيب أداة التحكم في الـ change detection بتاعة الـ component ده | — |

[[inject()]] بيطلب حاجة من الـ DI (زي constructor injection بس من غير constructor)، و [[ChangeDetectorRef]] (ref = reference) هو الـ handle اللي بنقول بيه لـ Angular «علّمني dirty». و [[private]] يعني الـ template والكلاسات التانية متشوفهوش.

---

## ٣. الـ ٤ methods واحدة واحدة

### [[click() { this.plain++; }]]

بيزوّد الخاصية العادية. بس الـ method دي اتنادت من [[(click)]] في الـ template، و Angular بيلف كل event listener في الـ template بحاجة بتعلّم الـ view إنه dirty (محتاج يتفحص). فبعد الضغطة الشاشة بتتحدّث.

### [[later() { setTimeout(() => { this.plain++; }, 10); }]]

[[setTimeout(fn, 10)]] بيشغّل الدالة بعد ١٠ ملّي ثانية. جواها نفس الـ [[this.plain++]]. بس دلوقتي محدش بلّغ: مفيش zone.js (Angular 22 zoneless)، ومفيش signal، والـ event خلص من بدري. فالقيمة بتتغير والشاشة لأ.

### [[laterSignal() { setTimeout(() => this.count.update((c) => c + 1), 10); }]]

[[update((c) => c + 1)]] بياخد القيمة الحالية [[c]] ويرجّع الجديدة. لأن الـ template قرا [[count()]]، الـ signal بتعلّم الـ view dirty وتجدول change detection لوحدها، حتى من جوه setTimeout.

### [[laterMark() { setTimeout(() => { this.plain++; this.cdr.markForCheck(); }, 10); }]]

نفس [[later]]، بس بعد الزيادة بننادي [[markForCheck()]]: «علّم الـ component ده وكل أجداده dirty، وجدول فحص». ده التبليغ اليدوي.

---

## ٤. الناتج الحقيقي

ضغطات ورا بعض على نفس الصفحة، وبعد كل ضغطة ١٠٠ms وبعدين قرينا الـ [[<p>]]:

~~~text الناتج (Chrome headless، /cd)
initial                عادي: 0 | signal: 0
click                  عادي: 1 | signal: 0
later                  عادي: 1 | signal: 0
laterSignal            عادي: 2 | signal: 1
later                  عادي: 2 | signal: 1
laterMark              عادي: 4 | signal: 1
~~~

اقراها كده:

1. [[click]]: event من الـ template، فالـ 1 ظهر.
2. [[later]]: القيمة بقت 2، والشاشة لسه 1.
3. [[laterSignal]]: الـ signal علّمت الـ view، فالـ view **كله** اترسم تاني: [[signal: 1]] ظهرت، و «عادي» ظهرت 2 معاها (القيمة اللي كانت مستخبية).
4. [[later]] تاني: القيمة 3 والشاشة 2.
5. [[laterMark]]: زوّد لـ 4 وبلّغ، فظهرت 4 مرة واحدة.

### ليه الشاشة «متأخرة خطوة» مع [[later]]؟

جرّبنا [[click]] ثم [[later]] مرتين ثم [[click]]، وقرينا القيمة الحقيقية من DevTools بـ [[ng.getComponent(...)]] (متاحة في dev mode بس):

~~~text الناتج (Chrome headless)
click      عادي: 1   plain الحقيقي = 1
later      عادي: 1   plain الحقيقي = 2
later      عادي: 2   plain الحقيقي = 3
click      عادي: 4   plain الحقيقي = 4
~~~

الزرار اللي بينادي [[later()]] نفسه عليه [[(click)]] في الـ template، فالضغطة بتعمل change detection **فورًا**، قبل ما الـ setTimeout يزوّد. فالشاشة بتعرض الزيادة اللي فاتت، والجديدة بتستنى أي تبليغ جاي. ده بالظبط شكل الـ bug في كود قديم: الرقم «بيتحدّث متأخر» أو لما تدوس أي حاجة تانية.

---

## ٥. السطرين اللي في الآخر: [[ChangeDetectionStrategy.Eager]]

~~~text
// changeDetection: ChangeDetectionStrategy.Eager
~~~

ده بيرجّع السلوك القديم: الـ component يتفحص في **كل** دورة change detection حتى لو مش dirty. بس خلي بالك: Eager مش بيعمل الدورة، هو بس مبيتخطّاش الـ component لما الدورة تحصل. جرّبنا نسخة من نفس الـ component بـ [[changeDetection: ChangeDetectionStrategy.Eager]] على [[/cd-eager]]:

~~~text الناتج (نسخة Eager)
click      عادي: 1   plain الحقيقي = 1
later      عادي: 1   plain الحقيقي = 2
later      عادي: 2   plain الحقيقي = 3
click      عادي: 4   plain الحقيقي = 4
~~~

نفس النتيجة بالظبط. عشان setTimeout يحدّث لوحده لازم zone.js يرجع: [[provideZoneChangeDetection()]] في الـ providers و [[zone.js]] في الـ polyfills.

---

## الخلاصة

| اللي غيّر القيمة | مين بلّغ | الشاشة اتحدّثت؟ |
|---|---|---|
| event في الـ template ([[(click)]]) | Angular نفسه | أيوه |
| setTimeout + خاصية عادية | محدش | لأ، لحد أي تبليغ جاي |
| setTimeout + signal | الـ signal | أيوه |
| setTimeout + [[markForCheck()]] | انت | أيوه |

- في Angular 22: zoneless من 21 و OnPush من 22 افتراضي.
- [[Eager]] = الاسم الجديد لـ [[Default]]، ومش بيرجّع zone.js.
- أي حاجة بتتعرض وبتتغير من async (timer أو HTTP أو websocket): خليها signal.`,
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

لو بدأت بـ [[click]] (1) ودوست [[later]] مرتين وبعدين [[click]]: الشاشة بتعرض 1 ثم 1 ثم 2 ثم 4، يعني متأخرة خطوة، لأن زرار [[later]] نفسه event من الـ template فبيحدّث الشاشة قبل ما الـ setTimeout يزوّد، والـ [[click]] الأخير بيظهّر الرقم الحقيقي مرة واحدة. البيانات كانت بتتغير طول الوقت، الشاشة بس اللي مكانتش عارفة. وده بالظبط شكل الـ bug في كود قديم اتنقل لـ zoneless.`
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
          teach: R`## الفكرة: نفس التطبيق بيشتغل مرتين

مع SSR (Server-Side Rendering) الـ component بيتنفّذ **مرة على السيرفر** (Node) عشان يطلع HTML جاهز، و**مرة في المتصفح** عشان يصحّى الـ HTML ده ويخليه يتفاعل (ده الـ hydration). المثال فيه ٣ حتت: ملف بيقول كل route يترسم فين وإمتى، و component بيلمس [[localStorage]] بطريقة آمنة، وأوامر الـ build والتشغيل.

اتجرّب على ويندوز بـ Angular CLI 22.2.2 (Angular 22.2.1) و Node 24: مشروع [[ng new shop --ssr]] (نفس الملفات اللي [[ng add @angular/ssr]] بيضيفها لمشروع موجود)، وفيه routes: الرئيسية و [[products/:id]] و [[admin/**]] و [[theme]].

---

## ١. [[ng add @angular/ssr]]

[[ng add]] بيسطّب باكدج ويشغّل الـ schematic بتاعها، يعني كود بيعدّل مشروعك لوحده. هنا بيضيف [[@angular/ssr]] و [[@angular/platform-server]] و [[express]] في [[package.json]]، وبيعمل الملفات دي:

| الملف | هو إيه |
|---|---|
| [[src/server.ts]] | سيرفر Express: بيقدّم الملفات الثابتة، وأي طلب تاني بيبعته لـ [[AngularNodeAppEngine]] يرسمه |
| [[src/main.server.ts]] | نقطة البداية على السيرفر (زي [[main.ts]] في المتصفح) |
| [[src/app/app.config.server.ts]] | [[provideServerRendering(withRoutes(serverRoutes))]] متدمجة مع إعدادات المتصفح |
| [[src/app/app.routes.server.ts]] | الـ render mode لكل route (تحت) |

وبيضيف [[provideClientHydration()]] في [[app.config.ts]]، وفي [[angular.json]] [[outputMode: "server"]] و [[security.allowedHosts]] (array فاضية)، وفي [[package.json]] الـ script [[serve:ssr:shop]] = [[node dist/shop/server/server.mjs]].

---

## ٢. [[app.routes.server.ts]]

~~~text app.routes.server.ts
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'products/:id', renderMode: RenderMode.Server },
  { path: 'admin/**', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Server, status: 404 },
];
~~~

- [[: ServerRoute[] =]]: النوع (TypeScript) معناه array من إعدادات routes للسيرفر، و [[export const]] عشان [[app.config.server.ts]] يستورده.
- [[path]]: نفس شكل الـ paths في [[app.routes.ts]]. [[:id]] parameter، و [[**]] أي حاجة.
- [[renderMode]]: هيترسم إمتى وفين:

| الـ mode | الـ HTML بيتعمل إمتى | مناسب لـ |
|---|---|---|
| [[RenderMode.Prerender]] | مرة واحدة وقت [[ng build]] وبيتحفظ ملف (زي SSG = Static Site Generation) | صفحات ثابتة: الرئيسية، من نحن |
| [[RenderMode.Server]] | مع كل طلب، على السيرفر | بيانات بتتغير أو ids كتير |
| [[RenderMode.Client]] | مش بيترسم على السيرفر: [[<app-root>]] فاضي والمتصفح يرسم | صفحات ورا login |

- [[status: 404]]: الـ HTTP status اللي السيرفر يرجّعه للـ route ده.

### الناتج الحقيقي لكل route

شغّلنا السيرفر وطلبنا كل route وطبعنا الـ status والـ [[<app-root>]]:

~~~text الناتج (PowerShell، Invoke-WebRequest)
/  -> 200
   <app-root ng-version="22.2.1" ngh="1" ng-server-context="ssg"><router-outlet></router-outlet><app-home ngh="0"><h1>أهلا يا سارة</h1><p>دي الصفحة الرئيسية</p></app-home><!----></app-root>
/products/5  -> 200
   <app-root ng-version="22.2.1" ngh="1" ng-server-context="ssr"><router-outlet></router-outlet><app-product ngh="0"><h2>منتج رقم 5</h2></app-product><!----></app-root>
/admin/users  -> 200
   <app-root></app-root>
/nope  -> 404
   <app-root ng-version="22.2.1" ngh="1" ng-server-context="ssr"><router-outlet></router-outlet><app-not-found ngh="0"><h2>الصفحة مش موجودة</h2></app-not-found><!----></app-root>
~~~

- [[ng-server-context="ssg"]]: الصفحة دي جت من ملف اتعمل وقت الـ build (Prerender). [["ssr"]]: اترسمت دلوقتي مع الطلب.
- [[ngh]] (ng hydration): أرقام بتربط كل view في الـ HTML بالـ component بتاعه، عشان المتصفح يصحّيه من غير ما يرسمه تاني.
- [[/admin/users]]: [[<app-root>]] فاضي، لأنه Client.
- [[/nope]]: محتوى NotFound **و** status 404 حقيقي، فـ Google مش هتعتبرها صفحة.

### مطب: [[**]] بيمسك أي route مش مكتوب فوقه

عندنا route [[theme]] في [[app.routes.ts]] بس مش مكتوب في [[serverRoutes]]:

~~~text الناتج
/theme  -> 404
   <app-root ... ng-server-context="ssr"><router-outlet></router-outlet><app-theme ngh="0"><button jsaction="click:;">light</button></app-theme>...
~~~

الصفحة اترسمت صح، بس رجعت **404** لأن [[**]] اللي عليه [[status: 404]] مسكها. يعني لو هتستخدم السطر ده، اكتب كل route حقيقي فوقه (أو [[{ path: 'theme', renderMode: RenderMode.Server }]] لكل واحد).

### [[Prerender]] مع parameter

لو غيّرنا [[products/:id]] لـ [[RenderMode.Prerender]]، الـ build بيقع:

~~~text الناتج (ng build)
[ERROR] The 'products/:id' route uses prerendering and includes parameters, but 'getPrerenderParams' is missing. Please define 'getPrerenderParams' function for this route in your server routing configuration or specify a different 'renderMode'.
~~~

منطقي: وقت الـ build هو ميعرفش يعمل HTML لأنهي ids. [[getPrerenderParams]] دالة async بترجّع array من الـ params، كل عنصر زي [[{ id: '1' }]].

---

## ٣. الـ component اللي بيلمس المتصفح

~~~text theme.ts
constructor() {
  afterNextRender(() => this.theme.set(localStorage.getItem('theme') ?? 'light'));
}
~~~

### الأول: ليه مينفعش نقرا [[localStorage]] على طول؟

جرّبنا component في الصفحة الرئيسية (Prerender) بيقرا في field:

~~~text home.ts (الغلط)
theme = signal(localStorage.getItem('theme') ?? 'light');
~~~

~~~text الناتج (ng build)
ERROR ReferenceError: localStorage is not defined
    at <instance_members_initializer> (.../main.server.mjs:49:477)
...
Prerendered 0 static routes.
Application bundle generation failed.
X [ERROR] An error occurred while prerendering route '/'.
Error: The content returned was empty.
~~~

[[localStorage]] و [[window]] و [[document]] حاجات في المتصفح بس. Node مفيهوش، والـ prerender بيشغّل الكلاس في Node وقت الـ build. و [[<instance_members_initializer>]] يعني الخطأ حصل وهو بيحسب قيم الـ fields.

### الحل: [[afterNextRender(() => ...)]]

- [[afterNextRender]]: بيسجّل دالة تشتغل **مرة واحدة**، بعد أول مرة الـ DOM يترسم، **وفي المتصفح بس**. على السيرفر بيتجاهلها خالص.
- [[localStorage.getItem('theme')]]: بيرجّع القيمة المحفوظة أو [[null]] لو مفيش.
- [[?? 'light']]: nullish coalescing، «لو اللي على الشمال [[null]] أو [[undefined]]، خد اللي على اليمين».
- [[this.theme.set(...)]]: نحط القيمة في الـ signal فالشاشة تتحدّث.

والـ signal بتبدأ بـ [[signal('light')]] ثابتة، عشان الـ HTML اللي جه من السيرفر يطابق أول رسم في المتصفح. لو بدأت بقيمة من المتصفح، هيبقى فيه اختلاف بين الاتنين (hydration mismatch، NG0500).

البديل لو محتاج [[if]] في نص الكود: [[isPlatformBrowser(inject(PLATFORM_ID))]] بيرجّع [[true]] في المتصفح و [[false]] على السيرفر.

### جرّبناه في Chrome

ضغطنا الزرار (بقى dark)، وبعدين reload، وراقبنا كل [[getItem]] و [[setItem]]:

~~~text الناتج (Chrome headless على سيرفر الـ SSR)
  console: getItem theme -> null
  console: setItem theme light
button = light
  console: setItem theme dark
after click = dark
--- reload
  console: getItem theme -> dark
  console: setItem theme dark
after reload = dark
~~~

ده بعد الحل اللي في الـ sol. أول نسخة كان فيها [[effect]] بيكتب في localStorage بشرط [[isPlatformBrowser]] بس، فطلع كده:

~~~text الناتج (النسخة الغلط)
--- reload
  console: setItem theme light
  console: getItem theme -> light
after reload = light
~~~

الـ [[effect]] أول تشغيل ليه جه **قبل** [[afterNextRender]]، فكتب [[light]] فوق [[dark]] قبل ما حد يقراها. عشان كده الحل بيستنى signal اسمها [[loaded]] بتبقى [[true]] جوه [[afterNextRender]].

---

## ٤. الـ build والتشغيل

~~~powershell
ng build
~~~

~~~text الناتج (مختصر)
Browser bundles
main-WYZ7BUUG.js     | main             | 239.33 kB |                66.36 kB
Server bundles
server.mjs           | server           | 920.52 kB |
main.server.mjs      | main.server      | 521.58 kB |
polyfills.server.mjs | polyfills.server | 235.58 kB |
Prerendered 1 static route.
Application bundle generation complete. [6.530 seconds]
~~~

والفولدر [[dist/shop]] بقى فيه:

~~~text dist/shop
browser/
  index.csr.html   الـ HTML الفاضي (csr = client-side rendering) للـ routes اللي Client
  index.html       الرئيسية prerendered
  main-WYZ7BUUG.js
server/
  server.mjs       سيرفر Express متجمّع في ملف
  main.server.mjs
prerendered-routes.json
~~~

[[.mjs]] يعني JavaScript module (ES modules) لـ Node.

### التشغيل

~~~bash
NG_ALLOWED_HOSTS=localhost node dist/shop/server/server.mjs
~~~

- [[NG_ALLOWED_HOSTS=localhost]]: في bash، متغير بيئة قبل الأمر بيتحط للأمر ده بس. بيقول للسيرفر يقبل الطلبات اللي الـ [[Host]] header بتاعها [[localhost]].
- [[node dist/shop/server/server.mjs]]: شغّل السيرفر. البورت [[4000]] افتراضيًا، أو قيمة [[PORT]].

في PowerShell نفس الحاجة: [[$env:NG_ALLOWED_HOSTS = "localhost"]] وبعدين [[node dist/shop/server/server.mjs]]. وده اللي حصل من غيره (بـ [[PORT=4123]]):

~~~text الناتج (من غير NG_ALLOWED_HOSTS)
Node Express server listening on http://localhost:4123
ERROR: Bad Request ("http://localhost:4123/theme").
Header "host" with value "localhost:4123" is not allowed.

For more information, see https://angular.dev/best-practices/security#preventing-server-side-request-forgery-ssrf
~~~

والمتصفح بياخد status 400. ده حماية من SSRF (Server-Side Request Forgery): السيرفر بيبني URLs من الـ Host اللي جاله، فلو قبل أي Host، حد ممكن يخليه يكلّم سيرفرات تانية. الحل الدائم: [[security.allowedHosts]] في [[angular.json]] بالدومين الحقيقي.

---

## الخلاصة

| الحاجة | الشكل |
|---|---|
| render mode لكل route | [[app.routes.server.ts]]: Prerender و Server و Client |
| route بـ [[:id]] و Prerender | لازم [[getPrerenderParams]] |
| صفحة 404 حقيقية | [[status: 404]] على [[**]]، واكتب كل route حقيقي فوقه |
| localStorage و window | جوه [[afterNextRender]]، أو [[isPlatformBrowser]] |
| القيمة الأولى للـ state | ثابتة، نفس السيرفر والمتصفح |
| تشغيل السيرفر | [[NG_ALLOWED_HOSTS]] أو [[allowedHosts]]، وإلا 400 |`,
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
          sol: R`في الـ lab، الـ build الأول وقع بـ [[ERROR ReferenceError: localStorage is not defined]] من component بيقرا localStorage في field initializer، وده حصل وقت الـ prerender. بعد ما القراية اتنقلت لـ [[afterNextRender]]: [[Prerendered 2 static routes.]] و [[Application bundle generation complete]].

وخلي بالك من الترتيب: الـ effect أول تشغيل ليه بييجي **قبل** [[afterNextRender]]. لو الـ effect بيكتب في localStorage من غير شرط، هيكتب [[light]] فوق القيمة المحفوظة قبل ما تتقري، والثيم هيرجع light مع كل reload (ده اللي حصل في الـ lab مع شرط [[isPlatformBrowser]] لوحده). عشان كده الحل تحت بيستنى [[loaded]].

لما تشغّل السيرفر من غير [[NG_ALLOWED_HOSTS]]: [[Header "host" with value "localhost:4123" is not allowed]] و status 400. معاه: الصفحة بترجع و view-source فيه [[<h1>أهلا يا سارة</h1>]] والمحتوى كله، و [[ng-server-context="ssg"]] على الـ app-root (يعني prerendered)، و attributes [[ngh]] اللي الـ hydration بتستخدمها. في route من غير [[status: 404]]، صفحة NotFound بترجع 200، ودي مشكلة SEO.`,
          solCode: R`import { Component, afterNextRender, effect, signal } from '@angular/core';
type Theme = 'light' | 'dark';
@Component({ selector: 'app-theme', template: $__bt<button (click)="toggle()">{{ theme() }}</button>$__bt })
export class ThemePicker {
  theme = signal<Theme>('light');                  // قيمة ثابتة: نفس الـ HTML على السيرفر والمتصفح
  private loaded = signal(false);                  // بتبقى true في المتصفح بس، بعد ما نقرا القيمة المحفوظة
  constructor() {
    afterNextRender(() => {
      this.theme.set((localStorage.getItem('theme') as Theme) ?? 'light');
      this.loaded.set(true);
    });
    effect(() => {
      if (!this.loaded()) return;                  // متكتبش قبل ما تقرا، والسيرفر مبيوصلش هنا أصلًا
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
          teach: R`## الفكرة: قيس الأول، وبعدين صلّح

المثال فيه ٤ حاجات: أمرين يقيسوا حجم الـ bundle ويرسموه، و budget يخلي الـ build يزعق لو الحجم كبر، وصور بـ [[NgOptimizedImage]]، وقيمة محسوبة بـ [[computed]]. كله اتجرّب على ويندوز في مشروع [[ng new shop --ssr]] (Angular 22.2.1، Node 24)، والصور اتفحصت في Chrome headless على [[ng serve]].

---

## ١. [[ng build --stats-json]]

~~~powershell
ng build --stats-json
~~~

- [[ng build]]: build للإنتاج (minify و tree-shaking وأسامي بـ hash).
- [[--stats-json]]: كمان اكتب ملف فيه كل ملف دخل الـ bundle وحجمه. ده الـ **metafile** بتاع esbuild (الأداة اللي Angular بيبني بيها).

الملفات الجديدة جنب [[browser/]] و [[server/]] في [[dist/shop]]:

~~~text الناتج
browser-stats.json  232105
server-stats.json   381185
~~~

([[server-stats.json]] موجود لأن المشروع فيه SSR.) الملف JSON فيه [[inputs]] (كل ملف مصدر) و [[outputs]] (كل ملف طالع، وجواه [[bytesInOutput]] لكل ملف مصدر دخل فيه). جمّعنا الأرقام دي حسب الباكدج بـ script Node صغير على [[main-*.js]]:

~~~text الناتج (main-U7AVTX4X.js = 239318 byte)
   @angular/core                116.8 kB
   @angular/router              69.6 kB
   rxjs                         15.4 kB
   @angular/common              12.8 kB
   @angular/platform-browser    12.6 kB
   src (كودك)                   4.2 kB
   tslib                        1.9 kB
~~~

يعني في مشروع شبه فاضي، كودك ٤ كيلو بس والباقي Angular نفسه. ده الطبيعي، والسؤال المهم: إيه اللي بيزيد لما تضيف features.

## ٢. [[npx esbuild-visualizer --metadata ... --open]]

~~~powershell
npx esbuild-visualizer --metadata dist/shop/browser-stats.json --open
~~~

- [[npx]]: شغّل أداة من npm من غير ما تسطّبها في المشروع.
- [[esbuild-visualizer]]: بتقرا الـ metafile وتعمل صفحة HTML فيها treemap: كل مستطيل ملف، ومساحته على قد حجمه.
- [[--metadata]]: الملف اللي هتقراه.
- [[--open]]: افتح الصفحة في المتصفح. من غيره بيكتب [[stats.html]] بس (وده اللي عملناه: ملف ١٧٤ كيلو)، و [[--filename]] بيغيّر اسمه.

في الـ treemap هتلاقي نفس الترتيب اللي فوق: [[@angular/core]] أكبر مستطيل، وبعده [[@angular/router]].

---

## ٣. الـ budget في [[angular.json]]

~~~text angular.json → configurations.production.budgets
{ "type": "initial", "maximumWarning": "500kB", "maximumError": "1MB" }
~~~

- [[type: "initial"]]: الـ JS والـ CSS اللي لازم يتحمّلوا قبل أول رسم (مش الـ lazy chunks).
- [[maximumWarning]]: لو عدّاه، تحذير والـ build يكمل.
- [[maximumError]]: لو عدّاه، الـ build يفشل (exit code 1)، فالـ CI يقف.

ده الافتراضي في [[ng new]]، ومعاه budget تاني [[anyComponentStyle]] (CSS أي component لوحده: تحذير 4kB وخطأ 8kB).

### جرّبناه

الـ initial عندنا ٢٥٧ كيلو، فنزّلنا الحدود مؤقتًا عشان نشوف الشكل. تحذير عند 200kB:

~~~text الناتج (exit=0)
Initial total    | 257.40 kB |                71.64 kB
▲ [WARNING] bundle initial exceeded maximum budget. Budget 200.00 kB was not met by 57.40 kB with a total of 257.40 kB.
~~~

وخطأ عند 230kB:

~~~text الناتج (exit=1)
X [ERROR] bundle initial exceeded maximum budget. Budget 230.00 kB was not met by 27.40 kB with a total of 257.40 kB.
~~~

اقرا الجملة: الحد 200، وانت زايد عنه 57.40، والإجمالي 257.40. والعمود التاني [[Estimated transfer size]] (71.64 kB) هو الحجم بعد الضغط (gzip) اللي فعلًا بيعدّي على النت. الـ budget بيقيس الـ raw size.

---

## ٤. الصور: [[NgOptimizedImage]]

~~~text images.ts (template)
<img ngSrc="/hero.jpg" width="1200" height="600" priority alt="عروض" />
<img ngSrc="/p/{{ p.id }}.jpg" width="300" height="300" [alt]="p.name" />
~~~

الـ directive ده من [[@angular/common]]، فلازم تحطه في [[imports]] بتاع الـ component. وبيشتغل لما تكتب [[ngSrc]] بدل [[src]].

- [[ngSrc="/hero.jpg"]]: مسار الصورة. الـ directive هو اللي بيحط [[src]] الحقيقي.
- [[width="1200" height="600"]]: المقاس الأصلي للصورة. المتصفح بيحجز المكان قبل ما الصورة توصل، فالصفحة متنطش (CLS = Cumulative Layout Shift).
- [[priority]]: الصورة دي أهم حاجة في أول شاشة، حمّلها بدري.
- [[/p/{{ p.id }}.jpg]]: interpolation جوه المسار، كل منتج صورته.
- [[[alt]="p.name"]]: property binding، الـ [[alt]] من بيانات المنتج.

### الـ HTML اللي طلع في المتصفح

~~~text الناتج (Chrome headless)
<img ngsrc="/hero.jpg" width="1200" height="600" priority="" alt="عروض" loading="eager" fetchpriority="high" decoding="sync" ng-img="true" src="/hero.jpg">
<img width="300" height="300" alt="قلم" loading="lazy" fetchpriority="auto" decoding="auto" ng-img="true" src="/p/1.jpg">
~~~

| الـ attribute | مع [[priority]] | من غيره |
|---|---|---|
| [[loading]] | [[eager]]: حمّلها على طول | [[lazy]]: لما تقرّب تظهر |
| [[fetchpriority]] | [[high]]: قبل باقي الحاجات | [[auto]] |
| [[decoding]] | [[sync]] | [[auto]] |

### لما تنسى حاجة (dev mode)

شيلنا [[priority]] من الصورة الكبيرة:

~~~text الناتج (console)
NG02955: The NgOptimizedImage directive (activated on an <img> element with the $__btngSrc="http://localhost:5970/hero.jpg"$__bt) has detected that this image is the Largest Contentful Paint (LCP) element but was not marked "priority". This image should be marked "priority" in order to prioritize its loading. To fix this, add the "priority" attribute.
~~~

LCP = Largest Contentful Paint، أكبر عنصر بيظهر في أول شاشة، وجوجل بتقيس سرعة الصفحة بيه. وشيلنا [[width]] و [[height]]:

~~~text الناتج (console)
ERROR RuntimeError: NG02954: The NgOptimizedImage directive (activated on an <img> element with the $__btngSrc="/hero.jpg"$__bt) has detected that these required attributes are missing: "width", "height". ... or turn on "fill" mode with the $__btfill$__bt attribute.
~~~

ده خطأ مش تحذير. ولو مش عارف المقاس (صورة بتملا الـ container)، استخدم [[fill]].

---

## ٥. [[computed]] بدل دالة في الـ template

~~~text images.ts
total = computed(() => this.items().reduce((s, i) => s + i.price, 0));
~~~

- [[this.items()]]: نقرا الـ signal اللي فيها المنتجات. القراية دي بتسجّل إن [[total]] معتمد عليها.
- [[.reduce((s, i) => s + i.price, 0)]]: يلف على الـ array، [[s]] المجموع لحد دلوقتي (بيبدأ [[0]])، و [[i]] العنصر الحالي، ويرجّع المجموع الجديد.
- [[computed(...)]]: يحسب مرة، ويحفظ النتيجة، ومش بيعيد الحساب غير لما [[items]] تتغير.

والـ template بيقرا [[{{ total() }}]]. مع ٣ منتجات أسعارهم 10 و 45 و 5:

~~~text الناتج
الإجمالي: 60
~~~

لو [[total()]] كانت method عادية، كانت هتتنادى مع كل change detection للـ component، حتى لو المنتجات زي ما هي.

---

## ٦. جرّبنا lazy على صفحة الصور

حوّلنا route [[img]] لـ [[loadComponent: () => import('./pages/images').then((m) => m.Images)]]:

~~~text الناتج (ng build)
Initial chunk files  | Names            |  Raw size | Estimated transfer size
chunk-HWQSHOQ3.js    | -                | 161.43 kB |                48.18 kB
main-RAJEJ5AV.js     | main             |  96.64 kB |                25.13 kB
                     | Initial total    | 258.06 kB |                73.31 kB

Lazy chunk files     | Names            |  Raw size | Estimated transfer size
chunk-3VVGXBAP.js    | images           |   1.00 kB |                 1.00 kB
~~~

الـ initial مقلّش (257.40 → 258.06)، لأن الصفحة نفسها ١ كيلو والكود اللي بتستخدمه موجود أصلًا في [[@angular/common]] اللي التطبيق كله محتاجه. الدرس: lazy بيفرق لما الصفحة بتسحب مكتبة تقيلة لوحدها (charts، editor، Material dialogs)، مش لما الصفحة صغيرة. عشان كده قيس بعد كل تغيير.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| تعرف إيه اللي مكبّر الـ bundle | [[ng build --stats-json]] + visualizer |
| الـ build يزعق لو الحجم زاد | [[budgets]] في [[angular.json]] (warning ثم error) |
| صورة أول شاشة تحمّل بسرعة | [[ngSrc]] + [[width]] + [[height]] + [[priority]] |
| باقي الصور lazy من غير layout shift | [[ngSrc]] + [[width]] + [[height]] |
| قيمة مشتقة في الـ template | [[computed]] مش method |
| حجم أول تحميل أقل | lazy routes و [[@defer]] للحاجات التقيلة، وقيس |`,
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
    }
]);
