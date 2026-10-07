// تكملة تاب angular: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/angular/01.js (شرح حقول الدرس في أوله)
MORE("angular", [
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
          teach: R`## الفكرة: الإجابة في جملة، والمثال يثبتها

السؤال عن «Angular بيعرف إمتى يحدّث الشاشة». المثال بيوري أشهر حالة بتتسأل: component ابن OnPush بياخد object كـ input، والأب بيغيّر الـ object بـ ٣ طرق. اتجرّب كاختبار Vitest في مشروع Angular 22.2.1 على ويندوز ([[ng test --watch=false --reporters verbose]] عشان [[console.log]] يظهر).

---

## ١. الابن

~~~text user-card.ts
@Component({ selector: 'app-user-card', template: $__bt{{ user().name }}$__bt })
export class UserCard { user = input.required<User>(); }
~~~

- مفيش [[changeDetection]]، يعني OnPush (افتراضي 22).
- [[input.required<User>()]]: input لازم يتبعت، ونوعه [[User]] ([[{ name: string }]]).
- [[{{ user().name }}]]: اقرا الـ signal وبعدين الخانة.

OnPush معناه: الـ component ده يتفحص بس لما يتعلّم dirty: input اتغير **بالـ reference** (يعني object تاني في الذاكرة، مش نفس الـ object بعد تعديله)، أو event في الـ template بتاعه، أو signal بيقراها اتغيرت، أو [[markForCheck()]].

## ٢. الأب: ٣ طرق للتغيير

في الـ lab عملنا أب فيه ابنين: الأول بياخد [[[user]="user"]] (خاصية عادية)، والتاني [[[user]="userSig()"]] (signal)، والأب نفسه بيعرض [[{{ user.name }}]]، وكل سطر من المثال في method بتتنادى من زرار:

~~~text parent.ts
mutate()  { this.user.name = 'علي'; }
replace() { this.user = { ...this.user, name: 'علي' }; }
setSig()  { this.userSig.set({ ...this.userSig(), name: 'علي' }); }
~~~

- [[this.user.name = 'علي']]: mutation، عدّلت جوه نفس الـ object.
- [[{ ...this.user, name: 'علي' }]]: [[...]] spread بينسخ كل الخانات في object **جديد**، وبعدين [[name]] بتتكتب فوق القديمة.
- [[this.userSig.set({ ...this.userSig(), name: 'علي' })]]: نفس الفكرة، بس القيمة الجديدة بتتحط في signal.

## ٣. الناتج

~~~text الناتج (ng test --reporters verbose)
البداية    الأب: سارة | الابن: سارة | ابن الـ signal: سارة
mutate     الأب: علي | الابن: سارة | ابن الـ signal: سارة
replace    الأب: علي | الابن: علي | ابن الـ signal: سارة
signal     الأب: علي | الابن: علي | ابن الـ signal: علي
 ✓  shop  src/app/interview/cd.spec.ts > OnPush و الـ reference > mutation ثم reference جديد ثم signal 59ms
~~~

1. **mutate**: الضغطة event في template الأب، فالأب اتفحص وعرض «علي». بس Angular قارن الـ input بتاع الابن: نفس الـ object (نفس الـ reference) = مفيش تغيير، فالابن OnPush متفحصش وفضل «سارة». البيانات والشاشة مختلفين.
2. **replace**: object جديد، الـ input اتغير، الابن اتعلّم واتحدّث.
3. **signal**: الـ signal اتغيرت والابن التاني بيقراها من خلال الـ input، فاتحدّث.

---

## ٤. نقطة بتتسأل: NG0100

جرّبنا component بيغيّر قيمة في [[ngAfterViewInit]]، يعني بعد ما الـ view اتفحص:

~~~text الناتج
Error: NG0100: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: 'أ'. Current value: 'ب'. Expression location: _X component.
~~~

في dev mode، Angular بيعمل فحص تاني بعد الأول بس عشان يتأكد إن مفيش حاجة اتغيرت أثناء الفحص. لو لقى فرق يرمي الخطأ ده. الحل: متغيّرش state في [[ngAfterViewInit]]؛ احسبها قبل كده، أو استخدم [[computed]] أو [[afterNextRender]].

---

## ٥. الإجابة اللي تقولها، متقسّمة

| الجزء | الجملة |
|---|---|
| التعريف | مقارنة الـ bindings بآخر قيم وتحديث الـ DOM |
| zone.js | بيراقب كل async وبعدها يفحص الشجرة كلها من فوق |
| OnPush | الـ component يتفحص بس لو input اتغير بالـ reference، أو event جواه، أو async pipe، أو markForCheck، أو signal |
| zoneless (21) و OnPush (22) | Angular بيعرف من signals والـ events بس، والـ state لازم يبقى signals |
| [[markForCheck()]] | علّم الـ component وأجداده، والفحص في الدورة الجاية |
| [[detectChanges()]] | افحص الـ component ده وأبناءه دلوقتي |

## الخلاصة

- mutation على input = الابن OnPush مش هيشوفها. object جديد أو signal.
- مفيش virtual DOM في Angular: compiled templates بتحدّث الـ DOM مباشرة.
- NG0100 = قيمة اتغيرت أثناء الفحص نفسه، بيظهر في dev بس.`,
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
          teach: R`## الفكرة: كل [[inject]] رحلة بحث، وأول injector يلاقي الحاجة بيكسب

المثال ٨ سطور، كل سطر بيوري مكان مختلف ممكن الـ service تتسجّل فيه، أو طريقة مختلفة للطلب. اتجرّب كاختبارات Vitest في مشروع Angular 22.2.1 على ويندوز ([[ng test --watch=false --reporters verbose]])، ما عدا سطر الـ route والـ [[useClass]] حسب البيئة (من الـ docs، ومتجرّبين في دروس الراوتر والـ environments).

---

## ١. [[@Injectable({ providedIn: 'root' }) export class Session {}]]

- [[@Injectable]]: الكلاس ده ينفع يتعمل له inject وهو نفسه يعمل inject.
- [[providedIn: 'root']]: سجّله في الـ root injector، نسخة واحدة للتطبيق كله، **ولو** محدش استخدمه بيتشال من الـ bundle (tree-shakable).

## ٢. [[@Injectable() export class FormState {}]]

من غير [[providedIn]]: مش متسجّل في أي حتة. لو حد طلبه ومحدش حطه في [[providers]]، خطأ. جرّبنا component بيعمل [[inject(Counter)]] ومفيش حد سجّله:

~~~text الناتج
NG0201: No provider found for $__bt_Counter$__bt. Source: DynamicTestModule.
Serialized Error: { code: -201, ngErrorCode: -201, ngErrorMessage: 'No provider found for $__bt_Counter$__bt.', ngTokenPath: [ '_Counter' ] }
~~~

([[_Counter]] بـ underscore لأن الـ build بيغيّر أسامي الكلاسات شوية؛ [[ngTokenPath]] بيوريك سلسلة الـ dependencies اللي وصلت للمشكلة.)

## ٣. [[FormState]] في [[providers]] بتاع component

~~~text
@Component({ selector: 'app-editor', template: '', providers: [FormState] })
export class Editor { state = inject(FormState); }
~~~

[[providers]] في الـ component بيعمل له **element injector** خاص بيه. فكل instance من [[Editor]] بياخد [[FormState]] جديدة، وبتتدمّر لما الـ editor يتشال.

في الـ lab: [[Counter]] فيه [[n = Math.random()]]، وعملنا component [[A]] بـ [[Counter]] في [[providers]] مرتين، وكمان بيعمل inject لـ [[Session]] اللي في الـ root:

~~~text الناتج
a1.c.n = 0.2874  a2.c.n = 0.8277
a1.c === a2.c : false | a1.s === a2.s : true
~~~

[[===]] هنا بيقارن هل هما **نفس الـ object**. الـ Counter نسختين، والـ Session واحدة.

## ٤. providers على route

~~~text
{ path: 'admin', providers: [AdminApi], loadChildren: () => import('./admin/admin.routes').then((m) => m.adminRoutes) }
~~~

الـ route بيعمل **environment injector** لنفسه ولكل الـ routes اللي تحته. [[AdminApi]] نسخة واحدة لقسم الأدمن كله، ومش موجودة بره. ([[loadChildren]] هنا بيحمّل array routes من ملف، مش module.)

## ٥. [[inject(Logger, { optional: true })]]

لو مفيش provider، رجّع [[null]] بدل NG0201:

~~~text الناتج (component B من غير providers)
B: optional Counter = null | optional Logger = null
~~~

## ٦. [[inject(Parent, { skipSelf: true })]]

ابدأ البحث من **الأب**، واتخطّى الـ injector بتاع الـ component نفسه. جرّبنا [[Host]] عليه [[Counter]] في [[providers]]، وجواه ابنين: [[Child]] من غير providers، و [[Child2]] عليه [[Counter]] في [[providers]]، وكل ابن بيعمل [[inject(Counter)]] و [[inject(Counter, { skipSelf: true })]]:

~~~text الناتج
child: mine === host.c true | parent === host.c true
child2: mine === host.c false | parent === host.c true
~~~

- [[Child]] ملوش provider، فالاتنين وصلوا لنسخة الأب.
- [[Child2]] ليه نسخته ([[mine]] مختلفة)، و [[skipSelf]] اتخطّاها ووصل لنسخة الأب.

والبحث بيمشي على شجرة الـ **template** (مين جوه template مين)، مش ترتيب الملفات.

## ٧. [[{ provide: PaymentGateway, useClass: environment.production ? Paymob : FakeGateway }]]

- [[provide]]: الـ token اللي الناس بتطلبه.
- [[useClass]]: الكلاس اللي هيتعمل منه instance فعلًا.
- [[cond ? a : b]]: لو production خد [[Paymob]]، وإلا [[FakeGateway]].

الكود اللي بيعمل [[inject(PaymentGateway)]] مش عارف ولا مهتم أنهي واحدة جاتله. وده نفس اللي بتعمله في الاختبار بـ [[useValue]].

---

## ترتيب البحث

| الترتيب | الـ injector | بييجي منين |
|---|---|---|
| ١ | element injector بتاع الـ component نفسه | [[providers]] في [[@Component]] |
| ٢ | element injectors بتاعة الآباء في الـ template | [[providers]] بتاعتهم |
| ٣ | environment injector بتاع الـ route | [[providers]] على الـ route |
| ٤ | root | [[providedIn: 'root']] و [[app.config.ts]] |
| ٥ | platform | حاجات Angular نفسه |
| ٦ | NullInjector | يرمي NG0201 (أو null مع [[optional]]) |

## الخلاصة

- DI مش معناه singleton: النسخة على قد الـ injector اللي سجّلها.
- [[providers]] في component = نسخة لكل instance وبتموت معاه.
- [[optional]] بيرجّع null، و [[skipSelf]] بيبدأ من الأب.
- الـ token واحد والتنفيذ بيتغير ([[useClass]] و [[useValue]] و [[useFactory]]).`,
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
          teach: R`## الفكرة: نفس الـ component فيه الأداتين، كل واحدة في مكانها

المثال جزئين: سلة مشتريات كـ **state** (signal و computed)، وبحث كـ **stream** من الكتابة محتاج استنى وإلغاء (RxJS)، والنتيجة بترجع signal عشان الـ template يعرضها. اتجرّب كاختبار Vitest في component حقيقي على Angular 22.2.1 (ويندوز)، والـ API وهمي بيرجّع نتيجتين بعد 50ms وبيسجّل كل نداء.

---

## ١. الـ state: [[signal]]

~~~text
readonly cart = signal<CartItem[]>([]);
~~~

- [[readonly]]: الخاصية نفسها متتبدلش بـ [[=]] (لكن قيمتها بتتغير بـ [[set]] و [[update]]).
- [[signal<CartItem[]>([])]]: signal نوعها array من [[CartItem]]، وقيمتها الأولى array فاضية. ليها قيمة **دايمًا**، وبتتقري synchronously بـ [[cart()]].

## ٢. القيمة المشتقة: [[computed]]

~~~text
readonly total = computed(() => this.cart().reduce((s, i) => s + i.price * i.qty, 0));
~~~

- [[this.cart()]]: القراية دي بتسجّل إن [[total]] معتمد على [[cart]].
- [[reduce((s, i) => s + i.price * i.qty, 0)]]: المجموع، كل عنصر سعره × الكمية، بداية من 0.
- مفيش subscribe ولا unsubscribe: لما [[cart]] تتغير، [[total]] بيتعلّم إنه قديم ويتحسب تاني أول ما حد يقراه.

~~~text الناتج
أول ما اتعمل: total = 0 | results = []
بعد set: total = 75
~~~

[[set]] بقلم سعره 10 وكميته 3، وكشكول بـ 45 وكميته 1: 30 + 45 = 75، وقرينا [[total()]] على طول بعد [[set]] من غير ما نستنى حاجة.

## ٣. الـ stream: RxJS جوه، signal بره

~~~text
readonly results = toSignal(
  toObservable(this.query).pipe(debounceTime(300), distinctUntilChanged(), switchMap((q) => this.api.search(q))),
  { initialValue: [] },
);
~~~

نفكّه من جوه لبرة، بنفس ترتيب ما القيمة بتعدّي:

### الخطوة ١: [[toObservable(this.query)]]

[[query]] signal فيها نص البحث. [[toObservable]] (من [[@angular/core/rxjs-interop]]) بيحوّلها Observable بيطلّع قيمة كل ما الـ signal تتغير. (لازم يتنادى في injection context، زي field في component.)

### الخطوة ٢: [[debounceTime(300)]]

استنى 300ms من غير تغيير قبل ما تعدّي القيمة. لو جت قيمة جديدة قبلها، القديمة بتتلغي والعدّاد يبدأ من الأول.

### الخطوة ٣: [[distinctUntilChanged()]]

متعدّيش القيمة لو هي نفس اللي فاتت (كتب حرف ومسحه).

### الخطوة ٤: [[switchMap((q) => this.api.search(q))]]

لكل كلمة، اطلب من الـ API، ولو جت كلمة جديدة والطلب القديم لسه شغال الغيه.

### الخطوة ٥: [[toSignal(..., { initialValue: [] })]]

اعمل subscribe على الـ Observable، وحط آخر قيمة في signal. [[initialValue]] القيمة لحد أول رد، فـ [[results()]] مش بترجّع [[undefined]] أبدًا. والـ subscribe بيتقفل لوحده مع الـ component.

### اللي حصل

كتبنا «ق» ثم «قل» ثم «قلم» بفرق 50ms:

~~~text الناتج
بعد ٣ كتابات سريعة: api.calls = []
بعد 450ms: api.calls = ["قلم"] | results = ["قلم-1","قلم-2"]
الشاشة: 75 | قلم-1,قلم-2
~~~

[[debounceTime]] بلع أول تلات قيم (والنص الفاضي اللي في الأول كمان)، والـ API اتنادى **مرة واحدة** بالكلمة الأخيرة، والشاشة (اللي بتقرا [[total()]] و [[results()]]) اتحدّثت من غير ولا [[subscribe]] في كودنا.

---

## ٤. ليه مش signals بس، أو RxJS بس؟

| الحاجة | signals | RxJS |
|---|---|---|
| قيمة حالية دايمًا | أيوه | Observable ممكن ميكونش طلّع حاجة |
| القراية | [[x()]] synchronous | subscribe |
| قيمة مشتقة | [[computed]] | [[map]] + [[combineLatest]] |
| استنى/debounce | مفيش | [[debounceTime]] |
| الغي القديم | مفيش (إلا [[resource]]) | [[switchMap]] |
| تجاهل ضغطات وهو شغال | مفيش | [[exhaustMap]] |
| retry | مفيش | [[retry]] |
| change detection | متكاملة (zoneless) | محتاج [[async]] pipe أو [[toSignal]] |

## الخلاصة

- signals للـ state، و RxJS للـ events والـ async مع الوقت.
- [[toObservable]] و [[toSignal]] هما الكوبري، و [[httpResource]] بيغطي «هات بيانات لما signal تتغير» من غير RxJS.
- الجملة اللي تقولها: «signals للـ state، و RxJS للـ events والـ async المعقد، و interop بينهم».`,
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
          teach: R`## الفكرة: component بيكتب في log كل ما مرحلة تحصل

الكلاس فيه الـ hooks القديمة كلها ([[ngOnChanges]] و [[ngOnInit]] و [[ngAfterViewInit]] و [[ngOnDestroy]]) والبدايل الحديثة ([[effect]] و [[afterNextRender]] و [[DestroyRef]]) جنب بعض، فتشوف مين بيشتغل إمتى. اتجرّب كاختبار Vitest على Angular 22.2.1 (ويندوز): template [[<input #box />]]، و [[setInput('name', 'سارة')]]، وبعدين [[setInput('name', 'علي')]]، وبعدين [[fixture.destroy()]]. بدل [[console.log]] كل hook بيضيف سطر لـ array، وطبعناها في الآخر.

---

## ١. التعريف

~~~text
export class Life implements OnChanges, OnInit, AfterViewInit, OnDestroy {
~~~

[[implements]] بيخلي TypeScript يتأكد إن الأسامي مكتوبة صح ([[ngOnInit]] مش [[ngOninit]]). Angular نفسه بينادي الـ hook لو موجود حتى من غير [[implements]].

## ٢. الخصايص

~~~text
  name = input('');
  box = viewChild.required<ElementRef<HTMLInputElement>>('box');
~~~

- [[input('')]]: input signal.
- [[viewChild.required<...>('box')]]: signal بترجّع العنصر اللي عليه [[#box]] في الـ template. [[ElementRef<HTMLInputElement>]] غلاف حوالين عنصر الـ DOM، والعنصر نفسه في [[.nativeElement]]. و [[required]] يعني «لازم يكون موجود»، فالنوع مش فيه [[undefined]].

## ٣. الـ constructor

~~~text
  constructor() {
    inject(DestroyRef).onDestroy(() => console.log('DestroyRef'));
    effect(() => console.log('effect', this.name()));
    afterNextRender(() => this.box().nativeElement.focus());
  }
~~~

الـ constructor هو الـ **injection context**: المكان اللي [[inject]] و [[effect]] و [[afterNextRender]] مسموحين فيه. الـ inputs لسه متحطتش هنا.

- [[inject(DestroyRef).onDestroy(fn)]]: سجّل دالة تشتغل لما الـ component يتدمّر. بديل [[ngOnDestroy]]، وميزته إنه ينفع يتسجّل من أي دالة مساعدة.
- [[effect(fn)]]: شغّل الدالة، وأعد تشغيلها كل ما signal قرتها تتغير (هنا [[name()]]). **مش** بتشتغل في الـ constructor نفسه؛ بتتجدول.
- [[afterNextRender(fn)]]: مرة واحدة، بعد ما الـ DOM يترسم، في المتصفح بس. فـ [[focus()]] هنا آمن.

## ٤. الـ hooks القديمة

~~~text
  ngOnChanges(c: SimpleChanges) { console.log('ngOnChanges', Object.keys(c)); }
  ngOnInit() { console.log('ngOnInit', this.name()); }
  ngAfterViewInit() { console.log('ngAfterViewInit', this.box().nativeElement.tagName); }
  ngOnDestroy() { console.log('ngOnDestroy'); }
~~~

- [[ngOnChanges(c: SimpleChanges)]]: مع كل تغيير في input. [[c]] object مفاتيحه أسامي الـ inputs اللي اتغيرت، وكل واحد فيه [[previousValue]] و [[currentValue]] و [[firstChange]]. و [[Object.keys(c)]] بيطلّع الأسامي.
- [[ngOnInit]]: مرة واحدة، بعد أول [[ngOnChanges]].
- [[ngAfterViewInit]]: مرة، بعد ما الـ template والأبناء اترسموا. [[tagName]] اسم الـ tag بحروف كبيرة.
- [[ngOnDestroy]]: قبل ما يتشال.

---

## ٥. الترتيب الحقيقي

~~~text الناتج (ng test --reporters verbose)
constructor
ngOnChanges name firstChange=true
ngOnInit سارة
effect سارة
ngAfterViewInit INPUT
afterNextRender INPUT focused=true
--- setInput علي
ngOnChanges name firstChange=false
effect علي
--- destroy
ngOnDestroy
DestroyRef
~~~

اقراه كده:

1. [[constructor]] الأول، والـ inputs فاضية.
2. [[ngOnChanges]] بـ [[firstChange=true]]، وبعده [[ngOnInit]] والـ input بقى «سارة».
3. الـ [[effect]] اتنفّذ **بعد** [[ngOnInit]]، أثناء أول change detection، مش في الـ constructor.
4. [[ngAfterViewInit]] ثم [[afterNextRender]]، و [[focused=true]] يعني الـ focus اشتغل فعلًا.
5. بعد التغيير: [[ngOnChanges]] تاني ([[firstChange=false]]) و [[effect]] تاني، و [[ngOnInit]] **متنداش** تاني.
6. عند الـ destroy: [[ngOnDestroy]] قبل callbacks الـ [[DestroyRef]].

### ملحوظة على [[viewChild]]

جرّبنا نقرا [[this.box()]] في [[ngOnInit]] والاختبار عدّى. الـ [[<input #box>]] ثابت في الـ template (مش جوه [[@if]] أو [[@for]])، فـ Angular بيحله بدري. لو العنصر جوه [[@if]]، مش هيبقى موجود قبل ما الـ view يترسم، والمكان المضمون [[ngAfterViewInit]] أو [[afterNextRender]] أو [[computed]]/[[effect]] بيقرا الـ signal.

---

## ٦. القديم والبديل

| القديم | بيعمل إيه | الحديث |
|---|---|---|
| [[constructor]] | DI بس | نفسه، مع [[inject()]] |
| [[ngOnChanges]] | رد فعل على تغيير input | [[computed]] أو [[effect]] بيقروا الـ input signal |
| [[ngOnInit]] | init بعد الـ inputs | [[effect]] أو [[toSignal]] أو [[resource]] |
| [[ngAfterViewInit]] + [[@ViewChild]] | الوصول للـ DOM | [[viewChild()]] + [[afterNextRender]] |
| [[ngOnDestroy]] | تنضيف | [[DestroyRef.onDestroy]] و [[takeUntilDestroyed()]] |

## الخلاصة

- الترتيب: constructor ← ngOnChanges ← ngOnInit ← (effect) ← ngAfterViewInit ← afterNextRender ← ... ← ngOnDestroy ← DestroyRef.
- [[ngOnInit]] مرة واحدة؛ [[ngOnChanges]] و [[effect]] مع كل تغيير.
- الـ inputs مش موجودة في الـ constructor.`,
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
          teach: R`## الفكرة: نفس الحاجة بالاتنين، سطر قصاد سطر

السؤال مش «مين أحسن». المثال بيكتب ٣ حاجات بالاتنين: state، وقيمة محسوبة منه، و state مشترك بين components. لو قريت السطور جنب بعض هتلاقي الفكرة واحدة والفرق في **مين بيشيل الحاجة وإمتى بيعيد الحساب**.

اتجرّب على ويندوز و Node 24: جزء React بـ React 19.3 و zustand 5.0.15 ([[renderToString]] في Node)، وجزء Angular كـ component في اختبار Vitest على Angular 22.2.1.

---

## ١. الـ state

~~~text React
const [qty, setQty] = useState(1);
~~~

~~~text Angular
qty = signal(1);
~~~

- React: [[useState(1)]] جوه function component بيرجّع القيمة ودالة تغيّرها. القيمة **متغير عادي** في الـ render ده، و [[setQty(2)]] بيخلي React تنادي الدالة كلها تاني.
- Angular: [[signal(1)]] field في الكلاس. الكلاس بيتعمل مرة واحدة، والقيمة بتتقري بـ [[qty()]] وتتغير بـ [[qty.set(2)]].

## ٢. القيمة المحسوبة

~~~text React
const total = price * qty;
~~~

~~~text Angular
total = computed(() => this.price() * this.qty());
~~~

- React: سطر عادي بيتحسب مع **كل render**. لو الحساب تقيل، [[useMemo]].
- Angular: [[computed]] بيحفظ النتيجة (memoized) ومش بيعيد الحساب غير لما [[price]] أو [[qty]] تتغير. و [[this.]] لأننا جوه كلاس.

### الناتج

~~~text الناتج (React، renderToString مع price=45)
<p>qty=1 total=45</p>
~~~

~~~text الناتج (Angular، قبل وبعد qty.set(2))
qty=1 total=45 cart=1
qty=2 total=90 cart=1
~~~

## ٣. الـ state المشترك

~~~text React
const cart = useCartStore();
~~~

~~~text Angular
cart = inject(Cart);
~~~

- React: مفيش DI. [[useCartStore]] hook عملته مكتبة Zustand بـ [[create(...)]]، وأي component بيناديه بياخد نفس الـ store (في الـ lab ضفنا منتج والـ store بقى فيه [[store items: 1]]). البديل الرسمي: Context.
- Angular: [[Cart]] service بـ [[providedIn: 'root']]، و [[inject(Cart)]] بيجيب نفس النسخة لأي component. وفي الاختبار نبدّلها بـ [[useValue]] من غير ما نلمس الـ component. ([[cart=1]] في الناتج فوق هو [[cart.count()]] بعد ما ضفنا منتج.)

---

## ٤. المقارنة اللي تقولها

| | React | Angular |
|---|---|---|
| النوع | مكتبة UI، والباقي من الـ ecosystem | framework كامل من فريق واحد |
| الـ templates | JSX (JavaScript) | HTML بـ syntax خاص ([[@if]] و [[[prop]="x"]] و [[(event)]]) |
| الرسم | الـ component بيتنادى تاني، ومقارنة virtual DOM | compiled templates، و signals بتحدّث الـ bindings اللي اتغيرت |
| الـ state | hooks | signals و services |
| مشترك | Context أو Zustand/Redux | services و DI |
| routing و forms و HTTP | مكتبات تختارها | [[@angular/router]] و forms و HttpClient رسميين |
| SSR | Next.js (framework تاني) | [[@angular/ssr]] |
| الترقية | كل مكتبة لوحدها | [[ng update]] و migrations |
| الاختبار | Vitest + Testing Library | Vitest + TestBed |

## الخلاصة

- الفكرة واحدة (state ومشتق ومشترك)، والفرق: function بتتنادى تاني vs كلاس فيه signals.
- قول trade-offs: React مرونة واختيارات، Angular شكل واحد لفريق كبير وترقيات منظمة.
- متهاجمش التانية، ومتقارنش Angular 2016 بـ React 2026.`,
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
