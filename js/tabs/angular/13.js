// تكملة تاب angular: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/angular/01.js (شرح حقول الدرس في أوله)
MORE("angular", [
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
          teach: R`## الفكرة: الـ module هو «قايمة» بتقول مين يشوف مين

في الكود القديم، الـ component مش بيقول هو محتاج إيه. الـ [[@NgModule]] هو اللي بيجمّع components ويقول: دول «بتوعي» ([[declarations]])، ودول modules تانية محتاجهم ([[imports]])، ودي services ([[providers]])، وده أول component يترسم ([[bootstrap]]). المثال هو [[AppModule]] نموذجي، و [[main.ts]] اللي بيشغّله، و route lazy بالشكل القديم.

اتجرّب كما هو على ويندوز بـ Angular 22.2.1 و Node 24: مشروع فيه [[AppModule]] ده بالظبط، و [[SharedModule]] فيه [[CardComponent]]، و [[OrdersModule]] lazy، وكل الـ components بـ [[standalone: false]]. [[ng build]] نجح، و [[ng serve --port 5970]] اتفتح في Chrome headless.

---

## ١. [[@NgModule({...})]]

~~~text app.module.ts
@NgModule({
  declarations: [AppComponent, OrdersComponent, HighlightDirective, EgpPipe],
~~~

### [[declarations]]

الـ components والـ directives والـ pipes اللي **الـ module ده صاحبها**. كل واحد فيهم:

- لازم يكون [[standalone: false]] (من Angular 19 الافتراضي [[true]]).
- يتعرّف في module **واحد بس**.
- يشوف كل اللي في [[declarations]] نفس الـ module، وكل اللي الـ modules المستوردة عاملينه [[exports]].

جرّبنا نشيل [[standalone: false]] من [[EgpPipe]]:

~~~text الناتج (ng build)
X [ERROR] NG6008: Pipe EgpPipe is standalone, and cannot be declared in an NgModule. Did you mean to import it instead?
~~~

يعني الـ standalone بيتحط في [[imports]] مش [[declarations]].

~~~text
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
  ],
~~~

### [[imports]]

modules تانية، والـ module ده بياخد منها اللي هي عاملاه [[exports]]:

| الـ module | بيدّي إيه |
|---|---|
| [[BrowserModule]] | تشغيل التطبيق في المتصفح، وبيعمل export لـ [[CommonModule]] ([[*ngIf]] و [[*ngFor]] والـ pipes). في AppModule بس |
| [[HttpClientModule]] | [[HttpClient]] بالشكل القديم (deprecated، بديله [[provideHttpClient()]]) |
| [[ReactiveFormsModule]] | [[formControl]] و [[formGroup]] و [[formControlName]] |
| [[AppRoutingModule]] | module فيه [[RouterModule.forRoot(routes)]] وبيعمل export لـ [[RouterModule]] ([[routerLink]] و [[<router-outlet>]]) |
| [[SharedModule]] | الحاجات المشتركة اللي عاملها export (عندنا [[app-card]]) |

جرّبنا نشيل [[SharedModule]] من الـ imports، و [[OrdersComponent]] بيستخدم [[<app-card>]]:

~~~text الناتج (ng build)
X [ERROR] NG8001: 'app-card' is not a known element:
1. If 'app-card' is an Angular component, then verify that it is part of this module.
2. If 'app-card' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.

    src/app/orders.component.ts:3:67:
      3 │ ... false, template: $__bt<app-card title="الإجمالي"><p>{{ 1500...
~~~

ده أشهر خطأ في Angular القديم. الحل دايمًا: الـ component ده متعرّف فين، والـ module بتاعه بيعمل له export، ومستورد في الـ module اللي بيستخدمه؟

~~~text
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
~~~

### [[providers]]

services للـ injector بتاع الـ module. الـ provider ده:

- [[provide: HTTP_INTERCEPTORS]]: الـ token (المفتاح) اللي HttpClient بيدوّر عليه.
- [[useClass: AuthInterceptor]]: اعمل instance من الكلاس ده. [[AuthInterceptor]] كلاس فيه [[intercept(req, next)]] بيرجّع [[next.handle(req.clone(...))]].
- [[multi: true]]: الـ token ده قايمة؛ **ضيف** على اللي فيها متستبدلش. من غيره كل interceptor جديد كان هيمسح اللي قبله.

~~~text
  bootstrap: [AppComponent],
})
export class AppModule {}
~~~

- [[bootstrap]]: الـ component اللي يترسم مكان [[<app-root>]] في [[index.html]]. في AppModule بس.
- [[export class AppModule {}]]: كلاس فاضي، كل الشغل في الـ decorator.

---

## ٢. [[main.ts]]

~~~text main.ts
platformBrowserDynamic().bootstrapModule(AppModule).catch((err) => console.error(err));
~~~

- [[platformBrowserDynamic()]]: بيعمل «platform» المتصفح (أول injector خالص).
- [[.bootstrapModule(AppModule)]]: اقرا الـ module، واعمل الـ injector بتاعه، وارسم الـ [[bootstrap]] component. بيرجّع Promise.
- [[.catch(...)]]: لو التشغيل فشل اطبع الخطأ.

في Angular 22 الباكدج [[@angular/platform-browser-dynamic]] مش بيتسطّب في [[ng new]]؛ سطّبناه ([[npm i @angular/platform-browser-dynamic@22.2.1]]) عشان الكود ده يشتغل، و [[platformBrowserDynamic]] نفسها عليها [[@deprecated Use the 'platformBrowser' function instead from '@angular/platform-browser']]. يعني في مشروع قديم هتلاقيها، والـ migration بيحوّلها لـ [[platformBrowser()]] أو [[bootstrapApplication]].

## ٣. الـ lazy route القديم

~~~text app-routing.module.ts
{ path: 'orders', loadChildren: () => import('./orders/orders.module').then((m) => m.OrdersModule) }
~~~

- [[loadChildren]]: الـ route ده هيتحمّل لما حد يروحله.
- [[import('./orders/orders.module')]]: dynamic import، بيحمّل الملف وقت التشغيل ويرجّع Promise.
- [[.then((m) => m.OrdersModule)]]: من الملف خد الكلاس [[OrdersModule]].

و [[OrdersModule]] جواه [[RouterModule.forChild([...])]] بالـ routes بتاعته، و [[CommonModule]] (مش [[BrowserModule]]).

~~~text الناتج (ng build)
Initial chunk files | Names         |  Raw size | Estimated transfer size
chunk-F62DSN4J.js   | -             | 277.50 kB |                74.66 kB
main-ULAOAYUM.js    | main          |  31.13 kB |                 7.68 kB
                    | Initial total | 308.63 kB |                82.33 kB
Lazy chunk files    | Names         |  Raw size | Estimated transfer size
chunk-66QOEGYB.js   | orders-module | 865 bytes |               865 bytes
~~~

[[orders-module]] بقى ملف لوحده.

### في المتصفح

~~~text الناتج (Chrome headless، ng serve)
/ : طلبات قديمةالطلبات (lazy)الإجمالي1500 جنيهبحث: قلم
h1 background: yellow
after typing: بحث: كشكول
/orders : قايمة الطلبات (lazy module)طلب 1طلب 2طلب 3
~~~

كل حاجة في الـ module اشتغلت: [[appHighlight]] لوّن الـ h1، و [[egp]] pipe كتب «1500 جنيه»، و [[<app-card>]] من SharedModule، و [[formControl]] من ReactiveFormsModule، وضغطة اللينك حمّلت الـ lazy module.

---

## ٤. التحويل لـ standalone (الحل)

الـ component القديم بيتغير في حاجتين: [[standalone: false]] بيتشال، و [[imports]] بتتكتب **في الـ component نفسه** بالحاجات اللي الـ template بيستخدمها:

- [[CurrencyPipe]] لـ [[| currency]]، و [[DatePipe]] لـ [[| date]]، و [[RouterLink]] لـ [[routerLink]].

وفي الـ module: يتشال من [[declarations]] ويتحط في [[imports]]. جرّبناه على [[OrderCardComponent]] جوه [[OrdersModule]] اللي لسه NgModule:

~~~text الناتج (/orders)
قايمة الطلبات (lazy module)#1 EGP250.00 2026-10-01 #2 EGP99.50 2026-10-05
~~~

يعني الـ standalone والـ NgModules بيعيشوا مع بعض عادي، وده اللي بيخلي التحويل يتعمل component component.

---

## الخلاصة

| الخانة | فيها إيه | الغلطة المشهورة |
|---|---|---|
| [[declarations]] | components و directives و pipes بتوع الـ module ([[standalone: false]]) | standalone هنا: NG6008 |
| [[imports]] | modules تانية (أو standalone components) | ناسي module: NG8001 |
| [[exports]] | اللي modules تانية تقدر تستخدمه | ناسي export: NG8001 برضه |
| [[providers]] | services، و [[multi: true]] للقوايم | service في lazy module = نسخة تانية |
| [[bootstrap]] | الـ root component | في AppModule بس |`,
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
          teach: R`## الفكرة: component بيجيب طلبات عميل، بالشكل اللي هتلاقيه في أي مشروع قديم

الـ component بياخد الـ id من الـ URL، يطلب طلبات العميل من service، يحطها في خاصية عادية، ويعرضها. وبيلغي الاشتراك لما يتقفل. كل سطر فيه حاجة اتغيرت في Angular الحديث، فهنفكّه ونقول البديل.

اتجرّب كما هو على ويندوز في مشروع NgModule بـ Angular 22.2.1 (نفس مشروع درس NgModule)، والـ component على route [[customers/:id]]، والـ service بترجّع طلبين بعد 300ms ([[of([...]).pipe(delay(300))]] بدل HTTP)، وقرينا الشاشة من Chrome headless.

---

## ١. الـ decorator

~~~text orders.component.ts
@Component({
  selector: 'app-orders',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './orders.component.html',
})
~~~

- [[standalone: false]]: متعرّف في [[declarations]] بتاعة NgModule. من 19 لازم يتكتب صريح.
- [[changeDetection: ChangeDetectionStrategy.Eager]]: اتفحص مع كل دورة change detection (الاسم القديم [[Default]]). الـ migration بتاع 22 بيحطه على كل component قديم.
- [[templateUrl]]: الـ template في ملف [[.html]] جنبه بدل ما يكون string.

## ٢. الكلاس والخصايص

~~~text
export class OrdersComponent implements OnInit, OnDestroy {
  @Input() customerName = '';
  @Output() selected = new EventEmitter<Order>();
  orders: Order[] = [];
  loading = true;
  private destroy$ = new Subject<void>();
~~~

| السطر | هو إيه | البديل الحديث |
|---|---|---|
| [[implements OnInit, OnDestroy]] | وعد لـ TypeScript إن الكلاس فيه [[ngOnInit]] و [[ngOnDestroy]] (لو غلطت في الاسم يطلع خطأ) | — |
| [[@Input() customerName = '']] | input بالـ decorator، قيمة عادية | [[customerName = input('')]] |
| [[@Output() selected = new EventEmitter<Order>()]] | حدث، و [[EventEmitter]] بيورث من [[Subject]] بتاع rxjs | [[selected = output<Order>()]] |
| [[orders: Order[] = [];]] و [[loading = true]] | خصايص عادية: Angular ميعرفش إمتى تتغير | signals |
| [[destroy$ = new Subject<void>()]] | Subject بيطلّع إشارة لما الـ component يتقفل. [[$]] في الآخر عُرف لأي Observable، و [[<void>]] يعني مفيش قيمة جوه الإشارة | [[takeUntilDestroyed()]] |

## ٣. الـ constructor

~~~text
  constructor(private ordersService: OrdersService, private route: ActivatedRoute) {}
~~~

ده سطرين في سطر:

1. **constructor injection**: Angular بيقرا نوع كل باراميتر ([[OrdersService]] و [[ActivatedRoute]]) ويبعتلك الـ instance.
2. **parameter properties**: كلمة [[private]] قبل الباراميتر بتخلي TypeScript يعمل خاصية بنفس الاسم ويحط فيها القيمة، فتقدر تكتب [[this.ordersService]] في أي method.

الحديث: [[private ordersService = inject(OrdersService);]].

## ٤. [[ngOnInit]] والـ pipe: من جوه لبرة

~~~text
  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((p) => p.get('id')),
      switchMap((id) => this.ordersService.byCustomer(id)),
      takeUntil(this.destroy$),
    ).subscribe((list) => { this.orders = list; this.loading = false; });
  }
~~~

[[ngOnInit]] بيتنادى مرة بعد أول ما الـ inputs تتحط. و [[: void]] يعني مبترجعش حاجة. والـ pipe بيمشي بالترتيب:

### الخطوة ١: [[this.route.paramMap]]

Observable بيطلّع الـ params بتاعة الـ route الحالي، ويطلّع تاني لو الـ URL اتغير وانت في نفس الصفحة ([[/customers/7]] ← [[/customers/8]]).

### الخطوة ٢: [[map((p) => p.get('id'))]]

حوّل كل [[ParamMap]] للـ id بس: [[p.get('id')]] بيرجّع [[string]] أو [[null]]. فبقى عندنا [["7"]].

### الخطوة ٣: [[switchMap((id) => this.ordersService.byCustomer(id))]]

لكل id، اعمل subscribe على طلب جديد. ولو جه id جديد والطلب القديم لسه مخلصش، **الغي القديم** ([[switch]]). فمفيش رد قديم يكتب فوق رد جديد. في الـ lab الـ service طبعت:

~~~text الناتج (console)
byCustomer 7
~~~

### الخطوة ٤: [[takeUntil(this.destroy$)]]

كمّل لحد ما [[destroy$]] يطلّع قيمة، وبعدين اقفل الاشتراك كله. **لازم آخر operator**: لو حطيته قبل [[switchMap]]، هيقفل الجزء اللي قبله بس، والطلب الداخلي ممكن يفضل شغال.

### الخطوة ٥: [[.subscribe((list) => { ... })]]

ابدأ السلسلة كلها، ولما توصل قائمة حطها في [[this.orders]] واقفل [[loading]].

## ٥. [[trackById]] و [[ngOnDestroy]]

~~~text
  trackById(_: number, o: Order) { return o.id; }
  ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }
~~~

- [[trackById]]: الـ [[*ngFor]] بيناديها لكل عنصر بـ (index، العنصر). [[_]] اسم باراميتر مش هنستخدمه. وبترجّع الـ id، فـ Angular يعرف إن العنصر ده هو هو حتى لو الـ array اتعملت من جديد.
- [[ngOnDestroy]]: قبل ما الـ component يتشال. [[next()]] بيطلّع الإشارة اللي [[takeUntil]] مستنيها، و [[complete()]] بيقفل الـ Subject نفسه.

## ٦. الـ template

~~~text orders.component.html
<p *ngIf="loading; else list">بيحمّل...</p>
<ng-template #list><li *ngFor="let o of orders; trackBy: trackById">{{ o.id }}</li></ng-template>
~~~

- [[*ngIf="loading; else list"]]: لو [[loading]] اعرض الـ [[<p>]]، وإلا اعرض الـ template اللي اسمه [[list]]. الـ [[*]] معناها إن الـ directive بيتحكم في العنصر نفسه (يحطه أو يشيله).
- [[<ng-template #list>]]: حتة HTML مش بتترسم لوحدها، و [[#list]] اسم (template reference variable) عشان [[else]] تشاور عليه.
- [[*ngFor="let o of orders; trackBy: trackById"]]: كرر الـ [[<li>]] لكل [[o]] في [[orders]].

الحديث: [[@if (loading) { ... } @else { ... }]] و [[@for (o of orders; track o.id)]].

---

## ٧. اللي حصل فعلًا في Angular 22

### zoneless (الافتراضي)

~~~text الناتج (Chrome headless، /customers/7)
t≈100ms: بيحمّل...
t≈1000ms: بيحمّل...
t≈2000ms: بيحمّل...
القيم الحقيقية: {"loading":false,"orders":2}
~~~

الرد وصل والقيم اتغيرت ([[ng.getComponent]] في DevTools بيوري الحقيقي)، والشاشة فضلت «بيحمّل...» للأبد، حتى مع [[Eager]]. محدش بلّغ Angular: مفيش signal ولا event من الـ template.

### مع [[markForCheck()]]

ضفنا [[private cdr: ChangeDetectorRef]] في الـ constructor و [[this.cdr.markForCheck()]] في آخر الـ subscribe:

~~~text الناتج
t≈100ms: بيحمّل...
t≈1000ms: 101102
~~~

### مع zone.js

سطّبنا [[zone.js]] (0.16.3) وحطيناه في [[polyfills]] في [[angular.json]]، وجرّبنا 3 حاجات:

1. [[provideZoneChangeDetection()]] في [[providers]] بتاع AppModule: **مااشتغلش**. الـ docs بتاعة الدالة بتقول إن في تطبيق NgModule لازم تتبعت لـ [[bootstrapModule]]:

~~~text main.ts
platformBrowserDynamic()
  .bootstrapModule(AppModule, { applicationProviders: [provideZoneChangeDetection()] })
~~~

2. بعد كده [[NgZone]] بقى حقيقي (طبعنا [[NgZone = NgZone Zone loaded = function]])، **ولسه** الشاشة «بيحمّل...». السبب: [[AppComponent]] (الأب) مكتوبش عليه حاجة، فهو OnPush (افتراضي 22). الـ tick بتاع zone بيلاقي الأب مش dirty فبيتخطاه هو وكل اللي تحته، فالـ [[Eager]] اللي على الابن ملوش لازمة.
3. لما حطينا [[Eager]] على [[AppComponent]] كمان:

~~~text الناتج
t≈100ms: بيحمّل...
t≈1000ms: 101102
~~~

عشان كده الـ migration بتاع 22 بيحط [[Eager]] على **كل** components المشروع القديم مش واحد بس.

---

## ٨. النسخة الحديثة (الحل)

جرّبناها على route [[v2/customers/:id]] مع [[bindToComponentInputs: true]] (نسخة [[withComponentInputBinding()]] في [[RouterModule.forRoot]]):

~~~text الناتج
t≈100ms: 101 - EGP250.00102 - EGP99.00
القيم الحقيقية: {"isLoading":false,"value":[{"id":101,"total":250},{"id":102,"total":99}]}
~~~

| القديم | الحديث |
|---|---|
| [[paramMap]] + [[map]] | [[id = input.required<string>()]] من الراوتر |
| [[switchMap]] + subscribe | [[httpResource(() => url)]]: بيعيد الطلب لوحده لما [[id()]] يتغير، وبيلغي القديم |
| [[orders]] و [[loading]] خصايص | [[orders.value()]] و [[orders.isLoading()]] signals |
| [[destroy$]] و [[takeUntil]] و [[ngOnDestroy]] | مفيش: الـ resource بيتقفل مع الـ component |
| [[*ngIf]] و [[*ngFor]] و [[trackBy]] | [[@if]] و [[@for (...; track o.id)]] |

## الخلاصة

- اقرا الـ pipe من فوق لتحت: [[paramMap]] ← [[map]] ← [[switchMap]] ← [[takeUntil]] (آخر واحد دايمًا) ← [[subscribe]].
- [[this.x = ...]] جوه subscribe في Angular 22 zoneless = الشاشة مش هتتحدّث.
- zone.js في تطبيق NgModule: [[applicationProviders]] في [[bootstrapModule]]، و [[Eager]] على الـ components كلها مش واحد.
- الحل الدائم: signals.`,
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
          teach: R`## الفكرة: branch، وخطوة واحدة، واختبار، و commit، وكرر

[[ng update]] بيعمل حاجتين: يحدّث الباكدجات، ويشغّل **migrations** (كود بيعدّل كودك لوحده عشان يمشي مع النسخة الجديدة). والـ migrations الاختيارية ([[ng g @angular/core:...]]) بتحوّل الكود القديم للشكل الحديث. المثال ترتيب الشغل نفسه.

اتجرّب على ويندوز بـ Angular CLI 22.2.2 في مشروع NgModule (نفس مشروع الدروس اللي فاتت، ومعمول له [[git init]])، على component اسمه [[TagEditorComponent]] مكتوب بالشكل القديم:

~~~text tag-editor.component.ts (قبل)
@Component({
  selector: 'app-tag-editor',
  imports: [NgIf, NgFor],
  template: $__bt
    <h3 *ngIf="name">{{ name }}</h3>
    <span *ngFor="let t of tags; trackBy: byTag">{{ t }}</span>
    <i *ngFor="let t of tags">{{ t }}</i>
    <button (click)="save()">حفظ</button>
  $__bt,
})
export class TagEditorComponent {
  @Input() name = '';
  @Input() tags: string[] = [];
  @Output() saved = new EventEmitter<string>();
  constructor(private http: HttpClient) {}
  byTag(_: number, t: string) { return t; }
  save() { this.http.post('/api/tags', this.tags).subscribe(() => this.saved.emit(this.name)); }
}
~~~

ترقية 15 ← 17 نفسها متجرّبتش هنا (المشروع على 22، وكان محتاج مشروع قديم حقيقي)؛ الكلام عنها من دليل [[angular.dev/update-guide]] ومن [[migrations.json]].

---

## ١. [[git switch -c upgrade-17]]

[[git switch]] بيروح لـ branch، و [[-c]] (create) بيعمله الأول. كل الترقية تحصل هنا، ولو باظت ترجع لـ main وكأن مفيش حاجة حصلت.

## ٢. [[ng update]] من غير arguments

بيقرا [[package.json]] ويقولك أنهي باكدجات Angular ليها نسخ أحدث وإيه الأمر اللي يرقّيها. على مشروعنا (كله 22.2):

~~~text الناتج
Using package manager: npm
Collecting installed dependencies...
Found 23 dependencies.
We analyzed your package.json and everything seems to be in order. Good work!
~~~

## ٣. [[ng update @angular/core@17 @angular/cli@17]]

- [[@angular/core@17]]: الباكدج و [[@]] النسخة. الاتنين مع بعض لأن الـ CLI والـ core لازم نفس الـ major.
- بيحدّث الاتنين في [[package.json]] ويسطّب، وبعدين يشغّل كل migration مكتوبة للنسخة دي.

الـ migrations دي متسجّلة في [[node_modules/@angular/core/schematics/migrations.json]]. قريناها في 22.2:

~~~text الناتج (migrations بتاعة 22.0.0)
22.0.0 change-detection-eager - Adds $__btChangeDetectionStrategy.Eager$__bt to all components.
22.0.0 http-xhr-backend - Adds 'withXhr' to 'provideHttpClient' function calls when the 'HttpXhrBackend' is used.
22.0.0 strict-templates-default - Adds 'strictTemplates: false' in tsconfig.json when not set.
22.0.0 can-match-snapshot-required - Adds the required third argument to canMatch callsites.
22.0.0 incremental-hydration - Adds withNoIncrementalHydration() opt out to provideClientHydration() when incremental hydration is not enable...
22.0.0 strict-safe-navigation-narrow - Disables the 'nullishCoalescingNotNullable & optionalChainNotNullable extended diagnostics.
22.0.0 model-output - Migrate broken duplicate outputs
22.0.0 safe-optional-chaining - Wraps optional chaining expressions in $safeNavigationMigration().
~~~

كلها بتحافظ على السلوك القديم (Eager بدل OnPush الجديد، و strictTemplates مقفول) عشان التطبيق ميتكسرش. لو قفزت من 15 لـ 22 مرة واحدة، migrations 16 و 17 و 18... مش هتتشغّل.

## ٤. [[ng test --watch=false && ng build]]

[[&&]]: الـ build بيشتغل بس لو الاختبارات عدّت. لو الاتنين نجحوا: commit، وبعدين النسخة اللي بعدها.

---

## ٥. الـ migrations الاختيارية

كل واحدة [[ng g @angular/core:<اسم>]]، وكلها بتقبل [[--path]] عشان تشتغل على فولدر أو ملف بس. وبعد كل واحدة عملنا [[git diff]] و commit. (ولو فيه [[.prettierrc]] في المشروع، الـ migration بتنسّق الملفات اللي عدّلتها بيه؛ أول مرة من غيره الملف اتنسّق بـ double quotes.)

### [[ng g @angular/core:inject]]

~~~text git diff
-import { Component, EventEmitter, Input, Output } from '@angular/core';
+import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
 export class TagEditorComponent {
+  private http = inject(HttpClient);
+
   @Input() name = '';
-  constructor(private http: HttpClient) {}
~~~

الـ constructor اتشال، والـ dependency بقت field بـ [[inject()]]، ونفس الاسم والـ [[private]].

### [[ng g @angular/core:signal-input-migration --insert-todos]]

~~~text الناتج
    Successfully migrated to signal inputs 🎉
      -> Migrated 1/2 inputs.
~~~

~~~text git diff
-    <span *ngFor="let t of tags; trackBy: byTag">{{ t }}</span>
-    <i *ngFor="let t of tags">{{ t }}</i>
+    <span *ngFor="let t of tags(); trackBy: byTag">{{ t }}</span>
+    <i *ngFor="let t of tags()">{{ t }}</i>
+  // TODO: Skipped for migration because:
+  //  This input is used in a control flow expression (e.g. $__bt@if$__bt or $__bt*ngIf$__bt)
+  //  and migrating would break narrowing currently.
   @Input() name = '';
-  @Input() tags: string[] = [];
+  readonly tags = input<string[]>([]);
-    this.http.post('/api/tags', this.tags).subscribe(...)
+    this.http.post('/api/tags', this.tags()).subscribe(...)
~~~

- [[tags]] اتحوّلت، وكل مكان بيقراها (في الـ template وفي [[save()]]) بقى [[tags()]].
- [[name]] اتسابت: مستخدمة في [[*ngIf]]، وتحويلها لـ signal كان هيبوّظ «narrowing» (إن TypeScript يفهم جوه الـ if إن القيمة مش فاضية).
- [[--insert-todos]]: اكتب تعليق TODO فوق كل حاجة اتسابت وليه.

### [[ng g @angular/core:output-migration]]

~~~text الناتج
    Successfully migrated to outputs as functions 🎉
      -> Migrated 1 out of 1 detected outputs (100.00 %).
~~~

~~~text git diff
-import { Component, EventEmitter, Input, Output, inject, input } from '@angular/core';
+import { Component, Input, inject, input, output } from '@angular/core';
-  @Output() saved = new EventEmitter<string>();
+  readonly saved = output<string>();
~~~

و [[this.saved.emit(...)]] فضلت زي ما هي، لأن [[output()]] فيها [[emit]] برضه. والـ imports اللي مبقتش مستخدمة اتشالت.

### [[ng g @angular/core:control-flow]]

~~~text git diff
-import { NgFor, NgIf } from '@angular/common';
-  imports: [NgIf, NgFor],
+  imports: [],
-    <h3 *ngIf="name">{{ name }}</h3>
-    <span *ngFor="let t of tags(); trackBy: byTag">{{ t }}</span>
-    <i *ngFor="let t of tags()">{{ t }}</i>
+    @if (name) {
+      <h3>{{ name }}</h3>
+    }
+    @for (t of tags(); track byTag($index, t)) {
+      <span>{{ t }}</span>
+    }
+    @for (t of tags(); track t) {
+      <i>{{ t }}</i>
+    }
~~~

- [[trackBy: byTag]] بقت [[track byTag($index, t)]]: نفس الدالة بنفس الباراميترات.
- الـ [[*ngFor]] اللي مكانش ليه trackBy خد [[track t]] (العنصر نفسه).
- [[NgIf]] و [[NgFor]] مبقوش لازمين فاتشالوا.

وعلى ملف [[.html]] تاني فيه [[else]]:

~~~text git diff
-<p *ngIf="loading; else list">بيحمّل...</p>
-<ng-template #list><li *ngFor="let o of orders; trackBy: trackById">{{ o.id }}</li></ng-template>
+@if (loading) {
+  <p>بيحمّل...</p>
+} @else {
+  @for (o of orders; track trackById($index, o)) {
+    <li>{{ o.id }}</li>
+  }
+}
~~~

### [[ng g @angular/core:standalone]]

بيسأل عن [[--mode]]، وده من [[--help]]:

~~~text الناتج
--mode  [choices: "convert-to-standalone", "prune-ng-modules", "standalone-bootstrap"] [default: "convert-to-standalone"]
~~~

يعني ٣ مراحل بالترتيب: حوّل الـ components، وبعدين امسح الـ NgModules اللي فضيت، وبعدين غيّر [[main.ts]] لـ [[bootstrapApplication]]. شغّلنا الأولى على المشروع كله:

~~~text git diff (orders.component.ts)
-@Component({ selector: 'app-orders', standalone: false, template: $__bt<app-card ...$__bt })
+@Component({
+  selector: 'app-orders',
+  template: $__bt...$__bt,
+  imports: [CardComponent, ReactiveFormsModule, EgpPipe],
+})
~~~

~~~text git diff (app.module.ts)
-  declarations: [AppComponent, OrdersComponent, HighlightDirective, EgpPipe, CustomerOrdersComponent],
+  declarations: [AppComponent],
+    OrdersComponent,
+    HighlightDirective,
+    EgpPipe,
+    CustomerOrdersComponent,
~~~

الـ migration عرف إن [[OrdersComponent]] بيستخدم [[app-card]] و [[formControl]] و [[egp]] فحط كل واحد في [[imports]] بتاعه، ونقلهم في AppModule من [[declarations]] لـ [[imports]]. و [[ng build]] بعدها نجح.

---

## الخلاصة

| الخطوة | الأمر |
|---|---|
| branch | [[git switch -c upgrade-N]] |
| شوف المتاح | [[ng update]] |
| major واحدة | [[ng update @angular/core@N @angular/cli@N]] (و Material و NgRx لنفس N) |
| اتأكد | [[ng test --watch=false && ng build]]، وبعدين commit |
| constructor ← [[inject()]] | [[ng g @angular/core:inject]] |
| [[@Input]] ← [[input()]] | [[:signal-input-migration --insert-todos]] |
| [[@Output]] ← [[output()]] | [[:output-migration]] |
| [[*ngIf]]/[[*ngFor]] ← [[@if]]/[[@for]] | [[:control-flow]] |
| NgModules ← standalone | [[:standalone]] بالـ ٣ modes بالترتيب |

- الـ migrations مش بتكسر حاجة عشان تكمّل: اللي مش آمن بتسيبه وتقول ليه.
- استخدم [[--path]] عشان تحوّل فولدر فولدر.`,
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
    }
]);
