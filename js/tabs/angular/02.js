// تكملة تاب angular: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/angular/01.js (شرح حقول الدرس في أوله)
MORE("angular", [
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
          teach: R`## الفكرة: كل كلام الـ API في كلاس واحد

المثال فيه حاجتين: service اسمها [[ProductsApi]] فيها ٤ methods، كل واحدة بتمثّل endpoint في الـ API، وسطر في component بيستخدم واحدة منهم. اتجرّب في مشروع Angular 22.2 جديد ([[ng new]]) على Windows و Node 24، مع API صغير بـ Node على port 5966 وراه proxy، والصفحة اتفتحت في Chrome headless.

---

## ١. الكلاس نفسه

~~~ts products-api.ts
@Service()
export class ProductsApi {
  private http = inject(HttpClient);
  private base = '/api/products';
~~~

### [[@Service()]]

الـ decorator ده (من [[@angular/core]]، جديد في 22) بيقول لـ Angular: «الكلاس ده service، اعمل منه نسخة واحدة (singleton) لكل التطبيق، وأي حد يطلبه بـ [[inject]] ياخدها». ده نفس اللي [[@Injectable({ providedIn: 'root' })]] بيعمله في الكود الأقدم، وهتلاقي الاتنين.

### [[private http = inject(HttpClient)]]

- [[inject(HttpClient)]]: «هات الـ [[HttpClient]] من الـ DI». [[HttpClient]] بييجي من [[@angular/common/http]].
- [[private]]: محدش من برا الكلاس يقدر يوصل لـ [[http]]. الـ components بتنادي الـ methods بس.

ومش محتاج تسجّل حاجة في [[app.config.ts]]: المشروع اللي اتجرّب فيه مكانش فيه [[provideHttpClient()]] خالص، والطلبات اشتغلت. ولما بصّينا على نوع الطلب في Chrome طلع [[fetch]] مش [[xhr]]، لأن 22 بيستخدم [[fetch]] من جوه.

### [[private base = '/api/products']]

الـ URL الأساسي في مكان واحد. وهو **نسبي** (من غير [[http://...]])، يعني بيروح لنفس السيرفر اللي الصفحة جاية منه، وفي التطوير الـ proxy بيوجّهه للـ backend (تحت).

---

## ٢. الـ methods الأربعة

~~~ts
list(q = '') { return this.http.get<Product[]>(this.base, { params: { q } }); }
getOne(id: string) { return this.http.get<Product>($__bt$__{this.base}/$__{id}$__bt); }
create(body: Omit<Product, 'id'>) { return this.http.post<Product>(this.base, body); }
remove(id: number) { return this.http.delete<void>($__bt$__{this.base}/$__{id}$__bt); }
~~~

| الجزء | معناه |
|---|---|
| [[list(q = '')]] | parameter اسمه [[q]] وقيمته الافتراضية نص فاضي لو مبعتوش |
| [[get<Product[]>]] | طلب GET، و [[<Product[]>]] (generic) بيقول للـ compiler «الرد array من [[Product]]» |
| [[{ params: { q } }]] | بيضيف [[?q=...]] للـ URL ويعمله encode. و [[{ q }]] اختصار [[{ q: q }]] |
| [[$__bt$__{this.base}/$__{id}$__bt]] | template string: [[/api/products/3]] |
| [[Omit<Product, 'id'>]] | نوع [[Product]] من غير [[id]]، لأن السيرفر هو اللي بيعمل الـ id |
| [[post<Product>(url, body)]] | طلب POST، والـ [[body]] بيتحوّل JSON لوحده |
| [[delete<void>]] | طلب DELETE، و [[void]] يعني مفيش رد نستناه |

و [[Product]] نوع عادي معمول في ملف تاني: [[type Product = { id: number; name: string; price: number }]].

> الـ generic [[<Product[]>]] **وعد** للـ compiler مش فحص. لو السيرفر رجّع شكل تاني، مفيش خطأ وقت التشغيل.

وكل method **بترجّع** الطلب ومش بتبعته. اللي بيرجع Observable: وصفة للطلب، مش الطلب نفسه.

---

## ٣. السطر اللي في الـ component

~~~ts
products = toSignal(inject(ProductsApi).list(), { initialValue: [] });
~~~

من جوه لبرة:

1. [[inject(ProductsApi)]]: هات الـ service.
2. [[.list()]]: اعمل Observable لطلب [[GET /api/products?q=]]. لسه مفيش طلب.
3. [[toSignal(...)]] (من [[@angular/core/rxjs-interop]]): بيعمل [[subscribe]]، ودي اللحظة اللي الطلب بيخرج فيها، وبيحط كل قيمة توصل في signal.
4. [[{ initialValue: [] }]]: قيمة الـ signal لحد ما الرد ييجي، عشان الـ template يلاقي array فاضية مش [[undefined]].

ولما الـ template عمل [[@for (p of products(); track p.id)]]، ده اللي حصل:

~~~text Network و الصفحة (Chrome)
[req] GET /api/products?q=
[res] 200 GET /api/products?q=

قلم - 10
كشكول - 45
مسطرة - 15
لابتوب - 25000
شنطة لابتوب - 900
~~~

طلب واحد بالظبط، و [[?q=]] موجودة فاضية لأن [[q]] قيمته [['']].

---

## ٤. التجربة: create من غير subscribe

عملنا زرارين، الأول بينادي [[this.api.create({ name: 'أستيكة', price: 5 })]] بس، والتاني نفس السطر ومعاه [[.subscribe(...)]]:

~~~text الناتج (Chrome)
--- click noSub
--- click withSub
[req] POST /api/products
[res] 201 POST /api/products
[console.log] created {"id":7,"name":"أستيكة","price":5}
~~~

الزرار الأول **مطلعش ولا طلب**. التاني طلّع POST والسيرفر رد بـ 201 (Created) والمنتج الجديد بالـ id بتاعه.

---

## ٥. لما الطلب يفشل

جرّبنا [[getOne('99')]] (مش موجود) وطلب لسيرفر مش موجود:

~~~text الناتج (Chrome)
error HttpErrorResponse 404 Not Found {"message":"not found"} Http failure response for http://localhost:5965/api/products/99: 404 Not Found
error 0 Http failure response for http://localhost:1/x: 0 undefined
~~~

- أي status مش 2xx بيوصل في callback الـ [[error]] كـ [[HttpErrorResponse]]: فيه [[status]] (404)، و [[error]] (جسم الرد اللي السيرفر بعته)، و [[message]].
- [[status]] بـ 0 يعني مفيش رد خالص: السيرفر مش موجود، أو النت، أو CORS.

---

## ٦. الـ proxy

الـ URLs في الكود نسبية، والـ backend على port تاني. ملف [[proxy.conf.json]] في جذر المشروع:

~~~json proxy.conf.json
{ "/api": { "target": "http://localhost:5966", "secure": false } }
~~~

وبعدين [[ng serve --proxy-config proxy.conf.json]]: أي طلب بيبدأ بـ [[/api]] الـ dev server بيبعته لـ 5966. المتصفح شايف إن كله من نفس الـ origin، فمفيش CORS.

---

## الخلاصة

| الحاجة | اللي يفضل في دماغك |
|---|---|
| الـ service | method لكل endpoint، بترجّع Observable |
| [[get<T>]] | وعد بالنوع، مش فحص |
| الطلب بيتبعت إمتى | لما حد يعمل subscribe ([[toSignal]] أو [[async]] أو [[.subscribe()]] أو [[firstValueFrom]]) |
| الخطأ | [[HttpErrorResponse]]، و [[status: 0]] = مفيش رد |
| التسجيل | مش محتاج في 22، إلا لو هتضيف interceptors |`,
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
          teach: R`## الفكرة: دالة بتقف في نص الطريق

أي طلب بيطلع من [[HttpClient]] بيعدّي على الـ interceptors بالترتيب قبل ما يروح للسيرفر، والرد بيرجع عليهم بالعكس. المثال فيه interceptor بيعمل حاجتين: يحط الـ token على الطلب، ولو الرد 401 يودّي المستخدم لصفحة الدخول. اتجرّب في مشروع Angular 22.2 مع API صغير بـ Node فيه endpoint اسمه [[/api/secret]] بيرد 200 لو الـ header [[Authorization: Bearer abc]]، و 401 غير كده.

---

## ١. التعريف

~~~ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {
~~~

- [[HttpInterceptorFn]]: نوع من [[@angular/common/http]] معناه «دالة بتاخد [[req]] و [[next]] وبترجّع Observable بالرد».
- [[req]]: الطلب ([[HttpRequest]]): فيه [[method]] و [[url]] و [[headers]] و [[body]].
- [[next]]: «كمّل السلسلة». [[next(req)]] بيسلّم الطلب للـ interceptor اللي بعده، أو للسيرفر لو ده آخر واحد، وبيرجّع Observable بالرد.

---

## ٢. أول سطرين: [[inject]] في البداية

~~~ts
const token = inject(Auth).token();
const router = inject(Router);
~~~

- [[Auth]] service عندنا فيها [[token = signal<string | null>(null)]]، و [[.token()]] بتقرا قيمتها دلوقتي.
- [[inject(Router)]] هنا فوق، مش جوه الـ [[catchError]] تحت. ليه؟ [[inject]] بيشتغل بس وقت ما Angular بينادي الدالة (ده اسمه injection context). الـ [[catchError]] بيتنفذ بعدين لما الرد يرجع، والـ context ده خلص.

جرّبنا نكتب [[inject(Router).navigate(...)]] جوه الـ [[catchError]] بدل [[router.navigate]]، والطلب اللي رجع 401 وصل للـ component بالخطأ ده:

~~~text الناتج (Chrome console)
component error NG0203: The $__btRouter$__bt token injection failed. $__btinject()$__bt function must be called from an injection context such as a constructor, a factory function, a field initializer, or a function used with $__btrunInInjectionContext$__bt.
~~~

---

## ٣. نسخة من الطلب بالـ header

~~~ts
const authReq = token ? req.clone({ setHeaders: { Authorization: $__btBearer $__{token}$__bt } }) : req;
~~~

- [[condition ? a : b]]: لو فيه token خد [[a]]، غير كده [[b]].
- [[req.clone({...})]]: الطلب **immutable** (متقدرش تعدّله)، فبتعمل نسخة جديدة بالتعديلات.
- [[setHeaders]]: ضيف (أو بدّل) headers في النسخة.
- [[Bearer <token>]]: الشكل المتعارف عليه للـ header ده (Bearer = «اللي شايل الـ token»).

---

## ٤. ابعت، واتفرّج على الرد

~~~ts
return next(authReq).pipe(
  catchError((err: HttpErrorResponse) => {
    if (err.status === 401) router.navigate(['/login']);
    return throwError(() => err);
  }),
);
~~~

- [[next(authReq)]]: ابعت النسخة اللي فيها الـ header.
- [[.pipe(catchError(...))]]: لو الرد خطأ، الدالة دي تشتغل ([[pipe]] و [[catchError]] شرحهم في درس «pipe و operators»).
- [[err.status === 401]]: 401 = Unauthorized، الـ token مش موجود أو انتهى. [[router.navigate(['/login'])]] بيودّي لصفحة الدخول.
- [[return throwError(() => err)]]: ارمي نفس الخطأ تاني، عشان اللي طلب الطلب يعرف إنه فشل. [[catchError]] لازم يرجّع Observable، و [[throwError]] بيعمل Observable بيطلّع الخطأ ده.

---

## ٥. التسجيل في [[app.config.ts]]

~~~ts
provideHttpClient(withInterceptors([authInterceptor, loggingInterceptor]))
~~~

جوه الـ [[providers]]. الترتيب في الـ array هو ترتيب مرور الطلب: [[authInterceptor]] الأول، وبعده [[loggingInterceptor]] (اللي في الـ solCode)، وبعدين السيرفر.

---

## ٦. اللي حصل فعلًا

component فيه زرارين: واحد بيعمل [[token.set('abc')]] والتاني [[token.set(null)]]، والاتنين بيطلبوا [[GET /api/secret]]:

~~~text الناتج (Chrome، Network و console)
--- token abc
[req] GET /api/secret Authorization: Bearer abc
[res] 200 GET /api/secret
component got {"secret":42}
GET /api/secret - 11ms
--- no token
[req] GET /api/secret
[res] 401 GET /api/secret
GET /api/secret - 16ms
component error 401
URL now: http://localhost:5965/login | h1: صفحة الدخول
~~~

- مع الـ token: الـ header اتحط لوحده، والـ component ميعرفش عنه حاجة.
- من غير token: السيرفر رد 401، فالـ interceptor نقلنا لـ [[/login]]، **و** الـ component برضه وصله الخطأ بـ 401 بسبب [[throwError]].
- سطر [[GET /api/secret - 11ms]] ده من الـ logging interceptor.

---

## ٧. الـ solCode: logging interceptor

~~~ts
export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const started = performance.now();
  return next(req).pipe(
    finalize(() => {
      const ms = Math.round(performance.now() - started);
      console.log($__bt$__{req.method} $__{req.urlWithParams} - $__{ms}ms$__bt);
    }),
  );
};
~~~

- [[performance.now()]]: الوقت بالـ milliseconds بدقة عالية. بنحفظه قبل الطلب.
- [[finalize(fn)]]: operator من rxjs بيشغّل [[fn]] لما الـ Observable يخلص بأي طريقة: نجح، أو وقع، أو اتلغى. فالـ log بيطلع في الحالتين، زي ما شفنا فوق مع 200 ومع 401.
- [[Math.round(...)]]: قرّب الفرق لرقم صحيح.
- [[req.urlWithParams]]: الـ URL ومعاه الـ query ([[?q=...]])، عكس [[req.url]].

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[(req, next) => ...]] | الطلب، و [[next]] بيكمّل السلسلة |
| [[inject]] في أول سطر | جوه [[catchError]] بيدي NG0203 |
| [[req.clone({ setHeaders })]] | الطلب immutable |
| [[throwError(() => err)]] | متبلعش الخطأ، اللي طلب لازم يعرف |
| [[withInterceptors([a, b])]] | الطلب بيعدّي على [[a]] وبعدين [[b]]، والرد بالعكس |`,
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
          teach: R`## الفكرة: طلب GET بيتصرّف زي signal

[[httpResource]] بياخد دالة بترجّع URL، ويرجّعلك object كل حاجة فيه signal: البيانات، وهل بيحمّل، والخطأ. ولو الـ URL اتغير (لأن signal جواه اتغيرت)، بيلغي القديم ويطلب الجديد لوحده. اتجرّب في Angular 22.2 على Windows، مع API بـ Node بيتأخر 600ms في الرد عشان نلحق نشوف الحالات، والصفحة في Chrome headless.

---

## ١. الكلاس الأول (عشان الـ template بيقرا منه)

~~~ts
export class Live {
  id = input.required<string>();
  product = httpResource<Product>(() => $__bt/api/products/$__{this.id()}$__bt);
}
~~~

### [[id = input.required<string>()]]

[[input]] signal بتيجي من برا (درس «input() و output()»)، و [[.required]] يعني لازم تتبعت. هنا جاية من الـ URL: الـ route [[live/:id]] ومعاها [[withComponentInputBinding()]] في [[provideRouter]]، فالـ [[:id]] بيتحط في الـ input اللي اسمه [[id]] لوحده (درس «route params»).

### [[httpResource<Product>(() => ...)]]

- [[httpResource]] من [[@angular/common/http]]، و [[<Product>]] نوع الرد.
- الـ argument **دالة** مش string. جواها [[this.id()]]، فـ Angular بيسجّل إن الدالة دي معتمدة على [[id]]. كل ما [[id]] يتغير، الدالة تتنادى تاني، فيطلع URL جديد وطلب جديد.
- لازم يتكتب كـ field (أو في الـ constructor)، يعني injection context، زي [[inject]].

---

## ٢. الـ signals اللي في [[product]]

| الـ signal | بيرجّع |
|---|---|
| [[status()]] | [[idle]] أو [[loading]] أو [[reloading]] أو [[resolved]] أو [[error]] |
| [[isLoading()]] | [[true]] في [[loading]] و [[reloading]] |
| [[error()]] | الخطأ ([[HttpErrorResponse]]) أو [[undefined]] |
| [[hasValue()]] | فيه بيانات ينفع تتقرا؟ |
| [[value()]] | البيانات نفسها |
| [[reload()]] | مش signal: method بتعيد الطلب |

---

## ٣. الـ template

~~~html
@if (product.isLoading()) {
  <p>بيحمّل...</p>
} @else if (product.error()) {
  <p>حصلت مشكلة</p>
} @else if (product.hasValue()) {
  <h1>{{ product.value().name }}</h1>
}
<button (click)="product.reload()">حدّث</button>
~~~

- الترتيب مقصود: بيحمّل؟ وإلا فيه خطأ؟ وإلا فيه قيمة؟ ([[@if]] و [[@else if]] من درس «@if و @switch».)
- [[hasValue()]] قبل [[value()]] لأن [[value()]] **بترمي exception** لو الـ resource في حالة خطأ (تحت).
- [[(click)="product.reload()"]]: اطلب تاني بنفس الـ URL.

---

## ٤. اللي حصل فعلًا

قرينا [[status()]] من الـ component بـ [[ng.getComponent]] (أداة بتبقى موجودة في المتصفح في dev mode):

~~~text الناتج: فتحنا /live/3
t=0     status: loading  | text: بيحمّل... / حدّث
[res] 200 GET /api/products/3
after   status: resolved | text: مسطرة / حدّث
~~~

~~~text الناتج: دوسنا «حدّث»
[req] GET /api/products/3
reload  status: reloading | isLoading: true | text: بيحمّل... / حدّث
[res] 200 GET /api/products/3
~~~

لاحظ إن في [[reloading]] الـ [[isLoading()]] برضه [[true]]، فالمثال بيخبّي «مسطرة» ويكتب «بيحمّل...» لحد ما الرد ييجي. لو عايز القيمة القديمة تفضل ظاهرة وانت بتحدّث، اعرض البيانات بـ [[hasValue()]] الأول، وحط مؤشر التحميل جنبها.

### الـ try: اتنقل بسرعة

روحنا [[/live/1]] وبعد 100ms [[/live/2]] (نفس الـ component، الـ input بس اللي اتغير):

~~~text الناتج (Network)
[req] GET /api/products/1
[req] GET /api/products/2
[failed] GET /api/products/1 net::ERR_ABORTED
[res] 200 GET /api/products/2
status: resolved | text: كشكول
~~~

طلب 1 اتلغى فعلًا في المتصفح ([[ERR_ABORTED]]، وفي DevTools بيبان «(canceled)»)، وده اللي بيمنع رد قديم يوصل بعد الجديد ويكتب فوقه.

### منتج مش موجود

~~~text الناتج: /live/4
[res] 404 GET /api/products/4
status: error | text: حصلت مشكلة / حدّث | error().status: 404
value() in error state: THROWS: Resource is currently in an error state (see Error.cause for details): Http failure response for http://localhost:5965/api/products/4: 404 Not Found
~~~

وده سبب [[hasValue()]]: [[value()]] في حالة الخطأ بترمي.

### الدالة بترجّع [[undefined]]

نسخة تانية الدالة فيها [[() => this.id() ? $__bt/api/products/$__{this.id()}$__bt : undefined]] و [[id]] فاضي:

~~~text الناتج
status: idle hasValue: false
~~~

ومفيش ولا طلب في Network. [[undefined]] معناها «لسه متطلبش».

---

## الخلاصة

| | |
|---|---|
| الـ argument | دالة، وأي signal جواها بتعيد الطلب لما تتغير |
| الطلب القديم | بيتلغي لوحده ([[ERR_ABORTED]]) |
| [[status()]] | [[idle]] → [[loading]] → [[resolved]] أو [[error]]، و [[reloading]] مع [[reload()]] |
| [[value()]] | بترمي في [[error]]، فافحص [[hasValue()]] الأول |
| للقراية بس | الـ POST والـ DELETE من [[HttpClient]] في event handler |`,
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
          teach: R`## الفكرة: الفورم متعرّفة في الكلاس، والـ template بيتربط بيها

في الـ reactive forms انت بتبني الفورم في TypeScript: object فيه حقل لكل input ومعاه شروطه. والـ template مش بيعرّف حاجة، بيقول بس «الـ input ده تبع الحقل الفلاني». اتجرّب في Angular 22.2 على Windows، والفورم اتملت واتضغط عليها بـ Playwright في Chrome headless.

---

## ١. الكلاس: بناء الفورم

~~~ts
private fb = inject(NonNullableFormBuilder);
form = this.fb.group({
  email: this.fb.control('', [Validators.required, Validators.email]),
  password: this.fb.control('', [Validators.required, Validators.minLength(8)]),
  remember: this.fb.control(false),
});
~~~

### [[NonNullableFormBuilder]]

builder (أداة بتختصر الكتابة) من [[@angular/forms]]. بدل [[new FormGroup({ email: new FormControl('', ...) })]] بتكتب [[fb.group]] و [[fb.control]]. وكلمة NonNullable معناها إن [[reset()]] بيرجّع كل حقل لقيمته الأولى مش [[null]].

### [[fb.group({...})]] و [[fb.control(...)]]

- [[group]] بيعمل [[FormGroup]]: مجموعة حقول بأسامي، هنا [[email]] و [[password]] و [[remember]].
- [[control('', [...])]] بيعمل [[FormControl]]: أول argument القيمة الأولى ([['']] نص فاضي، أو [[false]])، والتاني array من الـ validators.
- النوع بيتستنتج من القيمة الأولى: [[email]] نوعه [[FormControl<string>]] و [[remember]] نوعه [[FormControl<boolean>]].

### الـ [[Validators]]

| الـ validator | بيعترض لما | الخطأ اللي بيطلع |
|---|---|---|
| [[Validators.required]] | الحقل فاضي | [[{"required":true}]] |
| [[Validators.email]] | النص مش بشكل إيميل (والفاضي مش بيعترض عليه) | [[{"email":true}]] |
| [[Validators.minLength(8)]] | أقل من ٨ حروف | [[{"minlength":{"requiredLength":8,"actualLength":3}}]] |

الأخطاء دي اتطبعت فعلًا من [[form.controls.email.errors]] و [[form.controls.password.errors]].

---

## ٢. الـ template: الربط

~~~html
<form [formGroup]="form" (ngSubmit)="submit()">
  <input formControlName="email" type="email" />
~~~

- [[imports: [ReactiveFormsModule]]] في الـ decorator: فيه الـ directives [[formGroup]] و [[formControlName]]. من غيره الـ build بيقع:

~~~text الناتج (ng build من غير ReactiveFormsModule)
X [ERROR] NG8002: Can't bind to 'formGroup' since it isn't a known property of 'form'.
    src/app/l/l04-login.ts:8:10:
      8 │     <form [formGroup]="form" (ngSubmit)="submit()">
~~~

- [[[formGroup]="form"]]: الـ [[<form>]] ده هو الـ [[FormGroup]] اللي اسمه [[form]] في الكلاس. الأقواس المربعة = property binding.
- [[(ngSubmit)="submit()"]]: لما الفورم تتبعت (Enter أو زرار جواها)، نادي [[submit()]]، ومن غير ما الصفحة تعمل reload.
- [[formControlName="email"]]: الـ input ده مربوط بالحقل [[email]] في الاتجاهين: اللي بيتكتب بيروح للـ control، و [[setValue]] من الكود بيظهر في الـ input.

### رسالة الخطأ

~~~html
@if (form.controls.email.touched && form.controls.email.hasError('email')) {
  <small>الإيميل شكله غلط</small>
}
~~~

- [[form.controls.email]]: الـ control نفسه.
- [[touched]]: المستخدم دخل الحقل وخرج منه. من غيرها الرسالة تظهر قبل ما يكتب حاجة.
- [[hasError('email')]]: فيه خطأ اسمه [[email]] في [[errors]]؟

### الـ checkbox والزرار

- [[<input type="checkbox" formControlName="remember" />]]: مع checkbox القيمة [[true]] أو [[false]].
- [[[disabled]="form.pending"]]: [[pending]] بتبقى [[true]] بس وفيه async validator شغال (بيسأل السيرفر مثلًا). هنا مفيش، فالزرار دايمًا مفتوح.

---

## ٣. [[submit()]]

~~~ts
submit() {
  if (this.form.invalid) { this.form.markAllAsTouched(); return; }
  console.log(this.form.getRawValue());
}
~~~

- [[form.invalid]]: أي حقل فيه خطأ؟
- [[markAllAsTouched()]]: اعتبر كل الحقول اتلمست، فكل رسايل الخطأ اللي شرطها [[touched]] تظهر. و [[return]] يوقف.
- [[getRawValue()]]: كل القيم كـ object بأنواعها.

---

## ٤. اللي حصل فعلًا

~~~text الناتج (Chrome)
start classes email: ng-untouched ng-pristine ng-invalid
--- submit empty
email errors: {"required":true} touched: true
--- type abc + blur
text: الإيميل شكله غلط  محتاج 8 حروف، كتبت 3  افتكرني  دخول
classes email: ng-invalid ng-touched ng-dirty
--- valid
[console.log] {email: ali@example.com, password: 12345678, remember: true}
--- reset
{"email":"","password":"","remember":false}
~~~

- في الأول الـ input عليه classes حطها Angular: [[ng-untouched]] (ملمسش)، و [[ng-pristine]] (متكتبش فيه)، و [[ng-invalid]] (فاضي و required). تقدر تلوّن بيها: [[input.ng-invalid.ng-touched { border-color: red }]].
- لما دوسنا «دخول» والفورم فاضية: [[touched]] بقت [[true]]، بس رسالة «الإيميل شكله غلط» **مظهرتش**، لأن الخطأ [[required]] مش [[email]]. لو عايز رسالة للفاضي، زوّد [[@if]] لـ [[hasError('required')]].
- بعد ما كتبنا [[abc]] وخرجنا: الـ classes بقت [[ng-invalid ng-touched ng-dirty]] والرسالتين ظهروا (التانية من الـ solCode).
- [[reset()]] رجّع [[email]] لـ [['']] مش [[null]]، بفضل [[NonNullableFormBuilder]].

---

## ٥. الـ solCode: رسالة الطول

~~~html
@if (form.controls.password.touched && form.controls.password.errors?.['minlength']; as e) {
  <small>محتاج {{ e.requiredLength }} حروف، كتبت {{ e.actualLength }}</small>
}
~~~

- [[errors?.['minlength']]]: [[?.]] لأن [[errors]] بتبقى [[null]] لما مفيش أخطاء، و [[['minlength']]] (حروف صغيرة) هو اسم الخطأ اللي [[Validators.minLength]] بيطلّعه.
- [[; as e]]: احفظ نتيجة الشرط (الـ object [[{ requiredLength, actualLength }]]) في متغير اسمه [[e]] تستخدمه جوه.
- النتيجة: «محتاج 8 حروف، كتبت 3».

---

## الخلاصة

| الحاجة | فين |
|---|---|
| الحقول والـ validators | في الكلاس: [[fb.group]] و [[fb.control]] |
| الربط | [[[formGroup]]] على الفورم و [[formControlName]] على كل input، و [[ReactiveFormsModule]] في imports |
| الأخطاء | [[errors]] و [[hasError()]]، وتظهر بعد [[touched]] |
| الإرسال | [[(ngSubmit)]]، ولو invalid اعمل [[markAllAsTouched()]] |
| [[reset()]] | بيرجّع القيم الأولى مع [[NonNullableFormBuilder]] |`,
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
          teach: R`## الفكرة: ٣ حاجات في مثال واحد

المثال فورم طلب فيه: validator بتاعنا لرقم الموبايل المصري، و [[FormArray]] لأصناف بتتضاف بزرار، وحقل نوعه مكتوب صريح لأنه ممكن يبقى [[null]]. المرة دي الفورم مكتوبة بـ [[new FormGroup]] و [[new FormControl]] مباشرة من غير builder. اتجرّب في Angular 22.2 على Windows، والقيم اتقرت من الفورم في Chrome headless.

---

## ١. الـ validator بتاعك

~~~ts
function egyptianPhone(c: AbstractControl<string>): ValidationErrors | null {
  return /^01[0125]\d{8}$/.test(c.value) ? null : { phone: true };
}
~~~

- الـ validator مجرد دالة: بتاخد الـ control وترجّع [[null]] لو تمام، أو object بالخطأ لو مش تمام.
- [[AbstractControl<string>]]: أي control قيمته string. [[AbstractControl]] هو الأب لـ [[FormControl]] و [[FormGroup]] و [[FormArray]].
- [[ValidationErrors | null]]: نوع الرجوع. [[ValidationErrors]] يعني object أي مفاتيح فيه.
- [[{ phone: true }]]: اسم الخطأ [[phone]]، وده اللي [[hasError('phone')]] بيدوّر عليه.

### الـ regex: [[/^01[0125]\d{8}$/]]

| الحتة | معناها |
|---|---|
| [[^]] | بداية النص |
| [[01]] | لازم يبدأ بـ 01 |
| [[[0125]]] | رقم واحد من دول: 0 أو 1 أو 2 أو 5 (010 و 011 و 012 و 015) |
| [[\d{8}]] | ٨ أرقام ([[\d]] = digit) |
| [[$]] | آخر النص، فمفيش حاجة زيادة |

و [[.test(c.value)]] بيرجّع [[true]] أو [[false]].

---

## ٢. الفورم

~~~ts
form = new FormGroup({
  phone: new FormControl('', { nonNullable: true, validators: [Validators.required, egyptianPhone] }),
  items: new FormArray([new FormControl('', { nonNullable: true })]),
  notes: new FormControl<string | null>(null),
});
~~~

### [[phone]]

- [[new FormControl('', {...})]]: القيمة الأولى [['']]، والإعدادات في object.
- [[nonNullable: true]]: النوع [[FormControl<string>]] (من غيرها [[string | null]])، و [[reset()]] بيرجّعه [['']].
- [[validators: [...]]]: الـ validator بتاعنا جنب [[required]] عادي. بنمرر الدالة نفسها [[egyptianPhone]] من غير [[()]].

### [[items]]

[[new FormArray([...])]]: array من controls، بيبدأ بـ control واحد فاضي. ده اللي هنضيف عليه.

### [[notes]]

[[new FormControl<string | null>(null)]]: لو كتبت [[new FormControl(null)]] بس، TypeScript هيستنتج النوع [[null]] وبس، ومش هتعرف تحط فيه نص. فبتكتب النوع صريح بين [[< >]].

### [[addItem()]]

~~~ts
addItem() { this.form.controls.items.push(new FormControl('', { nonNullable: true })); }
~~~

[[form.controls.items]] هو الـ [[FormArray]]، و [[.push(...)]] بيضيف control جديد. ده **غير** [[items.value.push]] اللي بيعدّل array عادية ملهاش علاقة بالفورم.

---

## ٣. الـ template

~~~html
<form [formGroup]="form">
  <input formControlName="phone" />
  <div formArrayName="items">
    @for (item of form.controls.items.controls; track $index) { <input [formControl]="item" /> }
  </div>
  <button type="button" (click)="addItem()">صنف كمان</button>
</form>
~~~

- [[formArrayName="items"]]: «ادخل جوه الـ array اللي اسمها [[items]]».
- [[form.controls.items.controls]]: الـ controls اللي جوه الـ array، ونلف عليهم بـ [[@for]].
- [[track $index]]: الـ controls ملهاش id، فبنتابع بالترتيب.
- [[[formControl]="item"]]: اربط الـ input ده بالـ control object نفسه (مش بالاسم زي [[formControlName]]).
- [[type="button"]]: أي [[<button>]] جوه [[<form>]] نوعه الافتراضي [[submit]]. من غيرها، الضغطة هتعمل submit.

---

## ٤. اللي حصل فعلًا

~~~text الناتج (Chrome)
empty phone errors: {"required":true,"phone":true}
'0101234567' hasError('phone'): true
'01312345678' hasError('phone'): true
'01012345678' valid: true
~~~

- الفاضي فيه خطأين مع بعض: [[required]]، و [[phone]] لأن الـ regex مش بيقبل نص فاضي.
- ١٠ أرقام: غلط. و 013: غلط لأن 3 مش في [[[0125]]]. و ١١ رقم بـ 010: صح.

بعد ضغطتين على «صنف كمان»: الـ inputs بقوا ٤ (موبايل + ٣ أصناف)، وكتبنا «كشكول» في التاني:

~~~text الناتج
inputs before: 2
inputs after 2 clicks: 4
["","كشكول",""]
~~~

### [[value]] و [[getRawValue()]]

قفلنا حقل [[notes]] بـ [[disable()]]:

~~~text الناتج
value:       {"phone":"01012345678","items":["","قلم",""],"notes":null}
notes disabled -> value: {"phone":"01012345678","items":["","قلم",""]}
getRawValue: {"phone":"01012345678","items":["","قلم",""],"notes":null}
after reset: {"phone":"","items":["","",""],"notes":null}
~~~

- [[value]] بيشيل أي حقل disabled، عشان كده نوعه [[Partial<...>]] (كل حاجة ممكن تبقى [[undefined]]).
- [[getRawValue()]] فيه كل الحقول.
- [[reset()]] بيفضّي القيم بس **مش** بيشيل الأصناف اللي اتضافت: لسه ٣.

### الـ try: الـ compiler

~~~ts
const x: number = o.form.value.phone;
~~~

~~~text الناتج (ng build)
X [ERROR] TS2322: Type 'string | undefined' is not assignable to type 'number'.
  Type 'undefined' is not assignable to type 'number'.
~~~

الـ compiler عارف إن [[phone]] نص، وكمان إنه ممكن يبقى [[undefined]] (بسبب الـ Partial). ده كله من غير ما تكتب نوع واحد بإيدك.

---

## الخلاصة

| الحاجة | اللي يفضل في دماغك |
|---|---|
| validator بتاعك | دالة: [[null]] = تمام، object = اسم الخطأ |
| [[nonNullable: true]] | النوع من غير [[null]]، و [[reset()]] للقيمة الأولى |
| [[FormArray]] | [[.push(control)]] للإضافة، و [[formArrayName]] + [[[formControl]]] في الـ template |
| [[value]] | من غير الحقول الـ disabled، ونوعه Partial |
| [[getRawValue()]] | كل حاجة، وده اللي غالبًا تبعته للـ API |`,
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
          teach: R`## الفكرة: بياناتك signal، والفورم «شجرة» فوقها

في الـ signal forms مفيش [[FormGroup]] ولا [[FormControl]]. بتعمل signal عادية فيها البيانات، و [[form()]] بيبني فوقها حقل لكل مفتاح، وكل حقل عنده حالة (valid و touched و errors) كلها signals. الكتابة في الـ input بتغيّر الـ signal مباشرة، والعكس. اتجرّب في Angular 22.2 على Windows ([[@angular/forms/signals]] جاية مع [[@angular/forms]]، مفيش install زيادة)، والفورم اتملت بـ Playwright في Chrome headless.

---

## ١. الـ import

~~~ts
import { FormField, email, form, minLength, required, submit } from '@angular/forms/signals';
~~~

| الاسم | هو إيه |
|---|---|
| [[form]] | الدالة اللي بتبني الفورم من signal |
| [[required]] و [[email]] و [[minLength]] | قواعد validation بتتحط في الـ schema |
| [[submit]] | دالة بتتعامل مع الإرسال |
| [[FormField]] | الـ directive اللي اسمها [[[formField]]] في الـ template |

---

## ٢. الكلاس

~~~ts
model = signal({ email: '', password: '' });
f = form(this.model, (p) => {
  required(p.email, { message: 'الإيميل مطلوب' });
  email(p.email, { message: 'الإيميل شكله غلط' });
  minLength(p.password, 8, { message: '٨ حروف على الأقل' });
});
~~~

### [[model = signal({...})]]

البيانات نفسها، signal عادية (درس «signal و computed»). دي «مصدر الحقيقة»: الفورم بتقرا منها وتكتب فيها، مش بتعمل نسخة.

### [[form(this.model, (p) => {...})]]

- أول argument: الـ signal.
- التاني: دالة اسمها **schema**، بتتنادى مرة واحدة عشان تسجّل القواعد. الـ [[p]] (path) شكله زي الـ model: [[p.email]] و [[p.password]]، وبيستخدم بس عشان تقول «القاعدة دي على الحقل ده».
- النتيجة [[f]]: شجرة حقول (FieldTree). [[f.email]] حقل الإيميل، و [[f.password]] حقل الباسورد.

### القواعد

- [[required(p.email, { message })]]: لازم يتملا، والرسالة اللي هتظهر.
- [[email(p.email, ...)]]: لازم شكل إيميل. والفاضي مش بيعترض عليه (ده شغل [[required]]).
- [[minLength(p.password, 8, ...)]]: ٨ حروف على الأقل.

---

## ٣. الحقل والـ state بتاعه: [[f.email]] ولا [[f.email()]]؟

| تكتب | تاخد |
|---|---|
| [[f.email]] | الحقل نفسه، وده اللي بتديه لـ [[[formField]]] |
| [[f.email()]] | الـ state بتاعه: object فيه signals |
| [[f.email().value()]] | القيمة دلوقتي |
| [[f.email().touched()]] و [[invalid()]] و [[errors()]] | الحالة |
| [[f()]] | state الفورم كلها: [[valid()]] و [[submitting()]] |

[[f.email().value]] من غير [[()]] نوعه function (اتأكدنا بـ [[typeof]] في المتصفح)، يعني signal لسه مقريتهاش.

---

## ٤. الـ template

~~~html
<input type="email" [formField]="f.email" />
@if (f.email().touched() && f.email().invalid()) {
  @for (e of f.email().errors(); track e.kind) { <small>{{ e.message }}</small> }
}
<input type="password" [formField]="f.password" />
<button (click)="save()" [disabled]="f().submitting()">سجّل</button>
~~~

- [[[formField]="f.email"]]: اربط الـ input ده بحقل الإيميل في الاتجاهين، وحدّث [[touched]] لما يخرج منه. محتاج [[FormField]] في [[imports]].
- [[errors()]]: array، كل عنصر فيه [[kind]] (نوع الخطأ: [['required']] أو [['email']] أو [['minLength']]) و [[message]]. ونلف عليها بـ [[@for]] ونتابع بـ [[kind]].
- [[f().submitting()]]: [[true]] طول ما الـ action بتاع [[submit]] شغال، فالزرار يتقفل وميتضغطش مرتين.

---

## ٥. [[save()]] و [[submit]]

~~~ts
async save() {
  await submit(this.f, async () => {
    console.log('هنبعت', this.model());
    return undefined;
  });
}
~~~

- [[submit(this.f, action)]]: بيعمل touched لكل الحقول (فالأخطاء تظهر)، ولو الفورم valid بينادي الـ [[action]].
- الـ action [[async]]: هنا بتعمل log، وفي الحقيقة بتبعت للسيرفر.
- [[return undefined]]: «مفيش أخطاء من السيرفر». لو رجّعت أخطاء، بتتحط على الحقول.

---

## ٦. اللي حصل فعلًا

~~~text الناتج (Chrome)
start valid: false | email errors: [{"kind":"required","message":"الإيميل مطلوب"}]
--- click سجّل (empty)
touched: true | smalls: [ 'الإيميل مطلوب' ]
--- type "bad"
model: { "email": "bad", "password": "" } | errors: [{"kind":"email","message":"الإيميل شكله غلط"}]
--- click املا (model.set)
input value: a@b.com | valid: true
--- click سجّل (valid)
[console.log] هنبعت {email: a@b.com, password: 12345678}
~~~

- في الأول: خطأ [[required]] بس، من غير [[email]]، لأن الحقل فاضي.
- «سجّل» والفورم فاضية: [[submit]] عمل touched، فالرسالة ظهرت، والـ action متناداش (مفيش «هنبعت»).
- كتبنا [[bad]] في الـ input: الـ [[model()]] نفسه بقى فيه [[bad]] (الـ try: [[{{ model() | json }}]] محتاج [[JsonPipe]] في imports)، والخطأ اتغير لـ [[email]].
- زرار بيعمل [[model.set({ email: 'a@b.com', password: '12345678' })]]: الـ input اتملا لوحده، والفورم بقت valid.
- «سجّل» تاني: الـ action اشتغل.

---

## ٧. الـ solCode: حقل التأكيد

~~~ts
validate(p.confirm, ({ value, valueOf }) =>
  value() === valueOf(p.password) ? undefined : { kind: 'mismatch', message: 'مش زي كلمة السر' },
);
~~~

- [[validate(path, fn)]]: قاعدة بتاعتك. الدالة بتاخد context، وبنفك منه حاجتين:
  - [[value]]: signal بقيمة الحقل ده ([[confirm]]).
  - [[valueOf(p.password)]]: قيمة حقل تاني.
- لو متساويين [[undefined]] (مفيش خطأ)، غير كده object فيه [[kind]] و [[message]].

~~~text الناتج
confirm errors: [{"kind":"mismatch","message":"مش زي كلمة السر"}] valid: false
after fix: [] valid: true
~~~

---

## الخلاصة

| الحاجة | reactive forms | signal forms |
|---|---|---|
| البيانات | جوه الـ controls | signal بتاعتك |
| بناء الفورم | [[fb.group]] | [[form(model, schema)]] |
| الربط | [[formControlName]] | [[[formField]]] |
| الحالة | [[control.touched]] | [[f.email().touched()]] |
| الإرسال | [[(ngSubmit)]] + [[markAllAsTouched]] | [[submit(f, action)]] |`,
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
          teach: R`## الفكرة: نعمل Observable بإيدنا ونشوف إمتى بيشتغل

المثال مش Angular: TypeScript عادي بيستخدم مكتبة [[rxjs]] (اللي متسطّبة مع أي مشروع Angular). بيعمل Observable بإيده عشان نشوف ٣ حاجات: إنه مش بيبدأ غير مع [[subscribe]]، وإن كل subscriber ليه تشغيلة لوحده، وإن اللي مش بيخلص لازم يتقفل بـ [[unsubscribe]]. اتشغّل على Windows بـ [[node scripts/rx1.mts]] جوه مشروع Angular 22.2 (Node 24 بيشغّل TypeScript مباشرة لما الامتداد [[.mts]]، وبيشيل الأنواع وبس) و [[rxjs]] 7.8.2.

---

## ١. الـ import

~~~ts
import { Observable, interval } from 'rxjs';
~~~

- [[Observable]]: الكلاس اللي بنعمل منه stream.
- [[interval]]: دالة جاهزة بتعمل Observable بيطلّع [[0]] و [[1]] و [[2]]... كل فترة، ومش بيخلص أبدًا.

---

## ٢. Observable بإيدنا

~~~ts
const nums$ = new Observable<number>((sub) => {
  console.log('بدأ');
  sub.next(1);
  sub.next(2);
  sub.complete();
});
~~~

- [[nums$]]: العُرف إن اسم أي Observable بيخلص بـ [[$]] (stream). مجرد اسم، مش syntax.
- [[new Observable<number>(...)]]: Observable بيطلّع أرقام. الدالة اللي جواه بتتحفظ ومبتشتغلش دلوقتي.
- [[sub]]: الـ subscriber، أي حد عمل subscribe. بنكلّمه بـ ٣ methods:

| الـ method | معناها |
|---|---|
| [[sub.next(1)]] | ابعت قيمة |
| [[sub.complete()]] | خلصت، مفيش قيم تاني |
| [[sub.error(err)]] | حصل خطأ (وده كمان بيقفل) |

---

## ٣. subscribe مرتين

~~~ts
console.log('قبل subscribe');
nums$.subscribe({ next: (v) => console.log('وصل', v), complete: () => console.log('خلص') });
nums$.subscribe((v) => console.log('التاني', v));
~~~

- الـ subscribe الأول بياخد object فيه الـ callbacks اللي محتاجها بس: [[next]] لكل قيمة و [[complete]] للنهاية (ومحطيناش [[error]]).
- التاني بياخد دالة واحدة، وده اختصار لـ [[{ next: ... }]].

~~~text الناتج (node scripts/rx1.mts)
قبل subscribe
بدأ
وصل 1
وصل 2
خلص
بدأ
التاني 1
التاني 2
~~~

- «قبل subscribe» الأول، رغم إن الـ Observable اتعمل قبلها. ده معنى **lazy**: الدالة مبتشتغلش غير مع [[subscribe]].
- «بدأ» اتطبعت **مرتين**: كل subscribe شغّل الدالة من الأول. ده اسمه **cold** Observable. وده بالظبط ليه [[http.get()]] بيبعت طلب جديد مع كل subscribe.
- كل ده sync: القيم وصلت فورًا لأن [[next]] اتنادت على طول.

---

## ٤. Observable مش بيخلص

~~~ts
const sub = interval(500).subscribe((n) => console.log('tick', n));
setTimeout(() => sub.unsubscribe(), 1600);
~~~

- [[interval(500)]]: رقم كل 500ms (نص ثانية).
- [[subscribe]] بيرجّع [[Subscription]]، حفظناه في [[sub]] عشان نقدر نقفله.
- [[setTimeout(fn, 1600)]]: بعد 1.6 ثانية، [[sub.unsubscribe()]] يوقف الاشتراك.

~~~text الناتج (تكملة)
tick 0
tick 1
tick 2
~~~

٣ ticks بس: عند 500 و 1000 و 1500، والـ unsubscribe عند 1600 قبل الرابعة (2000). وبعدها البرنامج خلص لوحده، لأن مفيش حاجة شغالة.

### الـ try: من غير [[unsubscribe]]

شلنا السطر الأخير وشغّلناه في Git Bash بـ [[timeout 3 node scripts/rx1b.mts]] ([[timeout 3]] بيقفله بعد ٣ ثواني):

~~~text الناتج (آخر ٤ سطور)
tick 1
tick 2
tick 3
tick 4
~~~

مبيقفش لوحده خالص، ولولا الـ timeout كان هيفضل شغال (Ctrl+C). في component، ده معناه callback شغال بعد ما الصفحة اتقفلت: memory leak.

---

## الخلاصة

| | Promise | Observable |
|---|---|---|
| بيبدأ إمتى | أول ما يتعمل (eager) | مع [[subscribe]] بس (lazy) |
| كام قيمة | واحدة | أي عدد |
| كذا حد بيستناه | نفس النتيجة | كل subscriber تشغيلة لوحده (cold) |
| الإلغاء | مفيش | [[unsubscribe()]] |
| النهاية | resolve أو reject | [[complete]] أو [[error]]، أو أبدًا ([[interval]]) |`,
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
          teach: R`## الفكرة: خط إنتاج القيم بتعدّي عليه

[[pipe]] بياخد operators ويركّبهم ورا بعض: كل قيمة طالعة من الـ Observable بتعدّي على الأول، وبعدين التاني، وهكذا، واللي يوصل للآخر هو اللي الـ subscriber بيشوفه. المثال فيه ٣ أجزاء: فلترة وتحويل، ومسك خطأ، وتحويل Observable لـ Promise. اتشغّل على Windows بـ [[node scripts/rx2.mts]] جوه مشروع Angular 22.2 ([[rxjs]] 7.8.2). والـ solCode اتجرّب في التطبيق نفسه مع API بـ Node.

---

## ١. الـ import

~~~ts
import { from, of, filter, map, tap, catchError, throwError, firstValueFrom } from 'rxjs';
~~~

كله من [[rxjs]] مباشرة. نوعين:

| النوع | الأسامي | بيعمل إيه |
|---|---|---|
| بيعمل Observable | [[from]] و [[of]] و [[throwError]] | نقطة البداية |
| operators | [[filter]] و [[map]] و [[tap]] و [[catchError]] | بيتحطوا جوه [[pipe]] |
| بيحوّل لـ Promise | [[firstValueFrom]] | عشان [[await]] |

---

## ٢. الجزء الأول: فلترة وتحويل

~~~ts
from([5, 12, 30, 7]).pipe(
  filter((n) => n > 6),
  map((n) => n * 2),
  tap((n) => console.log('tap', n)),
).subscribe((n) => console.log('النتيجة', n));
~~~

### [[from([5, 12, 30, 7])]]

بيعمل Observable بيطلّع عناصر الـ array واحد واحد، وبعدين complete.

### الـ operators بالترتيب

1. [[filter((n) => n > 6)]]: عدّي اللي الشرط بتاعه [[true]] بس. الـ 5 بتقف هنا.
2. [[map((n) => n * 2)]]: بدّل كل قيمة بنتيجة الدالة. زي [[Array.map]] بالظبط.
3. [[tap((n) => console.log('tap', n))]]: اعمل حاجة جانبية (هنا log) وسيب القيمة زي ما هي.

### القيم وهي بتعدّي

| القيمة | بعد [[filter]] | بعد [[map]] | اللي بيتطبع |
|---|---|---|---|
| 5 | وقفت | | |
| 12 | 12 | 24 | tap 24، النتيجة 24 |
| 30 | 30 | 60 | tap 60، النتيجة 60 |
| 7 | 7 | 14 | tap 14، النتيجة 14 |

~~~text الناتج (node scripts/rx2.mts)
tap 24
النتيجة 24
tap 60
النتيجة 60
tap 14
النتيجة 14
~~~

لاحظ الترتيب: «tap 24» وبعدها على طول «النتيجة 24»، مش كل الـ taps الأول. كل قيمة بتعدّي الخط **كله** قبل ما اللي بعدها تبدأ.

---

## ٣. الجزء التاني: مسك الخطأ

~~~ts
throwError(() => new Error('السيرفر وقع')).pipe(
  catchError((e) => of('بديل: ' + e.message)),
).subscribe((v) => console.log(v));
~~~

- [[throwError(() => new Error(...))]]: Observable مبيطلّعش قيم، بيطلّع خطأ على طول. بياخد دالة بترجّع الخطأ (مش الخطأ نفسه).
- [[catchError((e) => ...)]]: لو وصل خطأ، نادي الدالة دي بيه. ولازم ترجّع **Observable** يكمّل مكان القديم.
- [[of('بديل: ' + e.message)]]: [[of]] بيعمل Observable من القيم اللي بتديهاله، هنا قيمة واحدة.

~~~text الناتج
بديل: السيرفر وقع
~~~

الـ subscriber استلم القيمة البديلة في [[next]] عادي، ومعرفش إن حصل خطأ أصلًا.

---

## ٤. الجزء التالت: [[firstValueFrom]]

~~~ts
const first = await firstValueFrom(of('أ', 'ب', 'ج'));
console.log('أول قيمة:', first);
~~~

- [[of('أ', 'ب', 'ج')]]: ٣ قيم.
- [[firstValueFrom(...)]]: بيعمل subscribe، ياخد أول قيمة، يعمل unsubscribe، ويرجّعها في Promise.
- [[await]]: استنى الـ Promise. ([[await]] برا أي دالة ده top-level await، شغال لأن [[.mts]] ملف ES module.)

~~~text الناتج
أول قيمة: أ
~~~

---

## ٥. الـ solCode: service بتظبط شكل الرد

~~~ts
type ApiResponse = { data: Product[]; total: number };
list() {
  return this.http.get<ApiResponse>('/api/products').pipe(
    map((res) => res.data),
    catchError((err) => {
      console.error('products failed', err);
      return of([] as Product[]);
    }),
  );
}
~~~

- [[type ApiResponse]]: شكل الرد اللي جاي: المنتجات جوه [[data]]، وجنبها [[total]].
- [[map((res) => res.data)]]: الـ component عايز الـ array بس، فبنطلّعها هنا مرة واحدة.
- [[catchError]]: لو الطلب فشل، سجّل الخطأ ورجّع array فاضية. و [[as Product[]]] عشان TypeScript يعرف إن [[[]]] دي array منتجات مش [[never[]]].

جرّبناها على endpoint بيرجّع الشكل ده، وعلى واحد بيرجّع 500:

~~~text الناتج (Chrome)
[res] 200 GET /api/wrapped
ok: 5 products, first = {"id":1,"name":"قلم","price":10}
[res] 500 GET /api/broken
products failed 500
broken: []
~~~

الـ component في الحالتين استلم array، ومحتاجش يعرف حاجة عن [[data]] ولا عن الخطأ.

---

## الخلاصة

| الـ operator | بيعمل إيه | بيرجّع |
|---|---|---|
| [[filter(fn)]] | يعدّي اللي [[fn]] بتاعه true | نفس القيم أو أقل |
| [[map(fn)]] | يبدّل كل قيمة | قيم جديدة |
| [[tap(fn)]] | side effect (log) | نفس القيم من غير تغيير |
| [[catchError(fn)]] | يمسك الخطأ | Observable بديل ([[of(...)]] أو [[throwError]]) |
| [[firstValueFrom(obs$)]] | مش operator | Promise بأول قيمة |`,
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
          teach: R`## الفكرة: من حروف بتتكتب لطلبات قليلة ومرتبة

المستخدم بيكتب حرف حرف، وكل حرف تغيير. الـ pipe في المثال بيحوّل الحروف دي لطلبات API بـ ٣ قواعد: استنى لما يبطّل كتابة، ومتطلبش نفس الكلمة مرتين ورا بعض، ولو جت كلمة جديدة الغي طلب القديمة. اتجرّب مرتين: الـ component في Angular 22.2 على Windows مع API بـ Node بيتأخر 500ms في الرد والكتابة بـ Playwright في Chrome headless، والـ solCode بـ [[node scripts/rx3.mts]].

---

## ١. الـ template

~~~html
<input [formControl]="q" placeholder="دوّر..." />
@for (p of results(); track p.id) { <p>{{ p.name }}</p> }
~~~

- [[[formControl]="q"]]: input مربوط بـ control لوحده من غير [[<form>]] (ده سبب [[ReactiveFormsModule]] في imports).
- [[results()]]: signal فيها المنتجات. كل اللي تحت هدفه يملا الـ signal دي.

---

## ٢. الـ control

~~~ts
private api = inject(ProductsApi);
q = new FormControl('', { nonNullable: true });
~~~

[[ProductsApi]] هي الـ service من درس HttpClient، و [[list(q)]] بتعمل [[GET /api/products?q=...]]. و [[q]] نوعه [[FormControl<string>]].

---

## ٣. الـ pipe من فوق لتحت

~~~ts
results = toSignal(
  this.q.valueChanges.pipe(
    debounceTime(300),
    map((s) => s.trim()),
    distinctUntilChanged(),
    switchMap((s) => (s.length < 2 ? of([]) : this.api.list(s).pipe(catchError(() => of([]))))),
  ),
  { initialValue: [] as Product[] },
);
~~~

### [[this.q.valueChanges]]

Observable من الـ control بيطلّع القيمة الجديدة مع كل تغيير: «ل»، «لا»، «لاب».

### [[debounceTime(300)]]

مع كل قيمة بيبدأ عدّاد 300ms. لو جت قيمة تانية قبل ما العدّاد يخلص، يرمي القديمة ويبدأ من الأول. فاللي بيعدّي بس القيمة اللي بعدها سكوت 300ms.

### [[map((s) => s.trim())]]

[[trim()]] بيشيل المسافات من الأول والآخر، فـ «لاب » تبقى «لاب».

### [[distinctUntilChanged()]]

لو القيمة زي اللي **قبلها مباشرة**، متعدّيهاش.

### [[switchMap(...)]]

ده قلب الموضوع. بياخد كل كلمة ويرجّع Observable (الطلب)، ويعمل subscribe عليه، والقيم اللي طالعة منه هي اللي بتكمّل. ولو كلمة جديدة وصلت والطلب القديم لسه شغال، بيعمل unsubscribe منه، و [[HttpClient]] بيلغي الطلب في المتصفح فعلًا.

وجواه:

- [[s.length < 2 ? of([]) : ...]]: أقل من حرفين؟ رجّع array فاضية من غير طلب.
- [[this.api.list(s).pipe(catchError(() => of([])))]]: اطلب، ولو فشل رجّع فاضية. الـ [[catchError]] هنا **جوه** الـ switchMap على الطلب نفسه، فالخطأ بيقفل الطلب ده بس. لو كان برا، أول خطأ كان هيقفل الـ stream كله والبحث يبطّل يشتغل.

### [[toSignal(..., { initialValue: [] as Product[] })]]

بيعمل subscribe على الـ pipe كله ويحط النتايج في signal. و [[as Product[]]] لأن [[of([])]] نوعه array فاضية، فبنقول لـ TypeScript إن النوع [[Product[]]].

---

## ٤. اللي حصل فعلًا

Chrome بيعمل encode للعربي في الـ URL ([[%D9%84%D8%A7%D8%A8]])، فكتبناه هنا مفكوك:

~~~text الناتج (Chrome)، والسطور العربي وصف اللي عملناه
t=0ms     كتبنا ل ثم لا ثم لاب (100ms بين كل حرف)
[req] GET /api/products?q=لاب
[res] 200 GET /api/products?q=لاب
t=1351ms  results: [ 'لابتوب', 'شنطة لابتوب' ]
t=1367ms  زوّدنا مسافة
          (مفيش طلب)
t=1876ms  شلنا المسافة وكتبنا توب، وبعد 350ms مسحنا ٣ حروف (رجعنا لـ لاب)
[req] GET /api/products?q=لابتوب
[req] GET /api/products?q=لاب
[failed] GET /api/products?q=لابتوب net::ERR_ABORTED
[res] 200 GET /api/products?q=لاب
t=3597ms  results: [ 'لابتوب', 'شنطة لابتوب' ]
t=4119ms  خلّيناها ل (حرف واحد): results: []
~~~

| اللي حصل | مين عمله |
|---|---|
| ٣ حروف = طلب واحد | [[debounceTime]] |
| المسافة مطلعتش طلب | [[trim]] خلّاها «لاب» تاني، و [[distinctUntilChanged]] وقفها |
| طلب «لابتوب» اتلغى ([[ERR_ABORTED]]) | [[switchMap]] لما وصلت «لاب» |
| «ل» فضّت النتايج من غير طلب | [[s.length < 2]] |

---

## ٥. الـ solCode: نفس الكلام من غير Angular

~~~ts
const typed$ = new Subject<string>();
const fakeApi = (q: string) => { console.log('  طلب:', q); return timer(400).pipe(map(() => $__btنتايج "$__{q}"$__bt)); };
~~~

- [[Subject]]: Observable تقدر تبعتله قيم من برا بـ [[typed$.next('l')]]. هنا بيمثّل الـ input.
- [[fakeApi]]: «طلب» وهمي: بيطبع إنه اتبعت، و [[timer(400)]] بيطلّع قيمة بعد 400ms، و [[map]] بيحوّلها لنص النتيجة.

~~~ts
typed$.pipe(debounceTime(300), distinctUntilChanged(), switchMap((q) => fakeApi(q))).subscribe((r) => console.log(r));
['l', 'la', 'lap'].forEach((k, i) => setTimeout(() => typed$.next(k), i * 100));
setTimeout(() => typed$.next('laptop'), 800);
setTimeout(() => typed$.next('lap'), 1150);
~~~

(في الـ solCode الـ pipe مكتوب على كذا سطر، هنا اتلم في سطر.) [[forEach((k, i) => ...)]] بيبعت [[l]] عند 0 و [[la]] عند 100 و [[lap]] عند 200.

~~~text الناتج (node scripts/rx3.mts)
  طلب: lap
نتايج "lap"
  طلب: laptop
  طلب: lap
نتايج "lap"
~~~

الخط الزمني:

| الوقت (ms) | اللي حصل |
|---|---|
| 0، 100، 200 | l و la و lap. الـ debounce بيعيد العد كل مرة |
| 500 | سكوت 300ms بعد lap: «طلب: lap» |
| 900 | «نتايج lap» (400ms بعد الطلب) |
| 800 → 1100 | laptop، وسكوت 300ms: «طلب: laptop» |
| 1150 → 1450 | lap، وسكوت: «طلب: lap»، فـ switchMap يلغي laptop (كان هيخلص عند 1500) |
| 1850 | «نتايج lap» |

ونفس الكود بـ [[mergeMap]] بدل [[switchMap]]:

~~~text الناتج (mergeMap)
  طلب: lap
نتايج "lap"
  طلب: laptop
  طلب: lap
نتايج "laptop"
نتايج "lap"
~~~

[[mergeMap]] مش بيلغي حاجة: نتيجة laptop ظهرت رغم إن المستخدم كان كتب lap خلاص.

---

## الخلاصة

| الـ operator | السؤال اللي بيجاوبه |
|---|---|
| [[debounceTime(300)]] | خلّص كتابة؟ |
| [[distinctUntilChanged()]] | الكلمة اتغيرت فعلًا؟ |
| [[switchMap]] | فيه طلب قديم؟ الغيه وابعت الجديد |
| [[catchError]] جوه الـ switchMap | الطلب فشل؟ كمّل البحث عادي |
| [[mergeMap]] / [[concatMap]] / [[exhaustMap]] | كلهم شغالين / بالدور / تجاهل الجديد لحد ما القديم يخلص |`,
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
          teach: R`## الفكرة: ٣ طرق، وكلهم بيقفلوا لوحدهم

المثال component واحد بيستخدم الطرق التلاتة: [[async]] pipe في الـ template، و [[toSignal]] في الكلاس، و [[subscribe]] بإيدك ومعاه [[takeUntilDestroyed()]]. والهدف واحد: الـ subscription يموت لما الـ component يموت. اتجرّب في Angular 22.2 على Windows، مع API بـ Node، في Chrome headless، واتنقلنا بين الصفحات بالراوتر.

---

## ١. الـ decorator والـ template

~~~ts
imports: [AsyncPipe],
~~~

[[AsyncPipe]] من [[@angular/common]]، ومن غيرها [[| async]] مش هيتعرف.

~~~html
@for (p of (products$ | async) ?? []; track p.id) { <p>{{ p.name }}</p> }
<p>{{ products().length }} منتج - {{ seconds() }} ثانية</p>
~~~

### [[(products$ | async) ?? []]] من جوه لبرة

1. [[products$]]: Observable خام من الكلاس.
2. [[| async]]: pipe بتعمل subscribe عليه، وترجّع آخر قيمة وصلت. ولحد أول قيمة بترجّع [[null]].
3. [[?? []]]: الـ nullish operator: لو اللي على الشمال [[null]] أو [[undefined]]، خد [[[]]]. من غيره [[@for]] هيلف على [[null]].
4. الأقواس حوالين [[products$ | async]] عشان الـ pipe يتنفذ الأول.

### السطر التاني

[[products()]] و [[seconds()]] signals عادية بتتقرا بـ [[()]].

---

## ٢. الكلاس

~~~ts
private api = inject(ProductsApi);
products$ = this.api.list();
products = toSignal(this.api.list(), { initialValue: [] });
seconds = signal(0);
~~~

- [[products$ = this.api.list()]]: Observable للطلب، ولسه مفيش طلب. الـ [[async]] pipe هي اللي هتعمل subscribe.
- [[toSignal(this.api.list(), { initialValue: [] })]]: من [[@angular/core/rxjs-interop]]. بيعمل subscribe **دلوقتي** (عشان كده لازم يتكتب كـ field أو في الـ constructor)، ويحط القيمة في signal، ويعمل unsubscribe لما الـ component يتقفل. و [[initialValue]] قيمة الـ signal لحد الرد.

### الـ constructor

~~~ts
constructor() {
  interval(1000).pipe(takeUntilDestroyed()).subscribe(() => this.seconds.update((s) => s + 1));
}
~~~

- [[interval(1000)]]: رقم كل ثانية، ومش بيخلص لوحده أبدًا.
- [[takeUntilDestroyed()]]: operator من [[@angular/core/rxjs-interop]]. بيقفل الـ stream لما الـ component يتعمله destroy. من غير argument لازم يتكتب في injection context (الـ constructor مثلًا)، لأنه بيعمل [[inject(DestroyRef)]] من جوه.
- [[this.seconds.update((s) => s + 1)]]: زوّد العدّاد واحد.

---

## ٣. اللي حصل فعلًا

زوّدنا [[console.log('tick', ...)]] جوه الـ subscribe زي ما الـ try بيقول:

~~~text الناتج (Chrome): فتحنا /async
[req] GET /api/products?q=
[req] GET /api/products?q=
[res] 200 GET /api/products?q=
tick 1
[res] 200 GET /api/products?q=
tick 2
TEXT: قلم / كشكول / مسطرة / لابتوب / شنطة لابتوب / 5 منتج - 2 ثانية
--- leave to /login
--- back to /async
[req] GET /api/products?q=
[req] GET /api/products?q=
tick 1
~~~

- **طلبين** مش واحد: [[| async]] عمل subscribe، و [[toSignal]] عمل subscribe تاني. الـ HTTP Observable «cold»، فكل subscribe = طلب. ولو كتبت [[| async]] مرتين في الـ template يبقوا ٣.
- لما خرجنا لـ [[/login]]: الـ ticks **وقفت**. [[takeUntilDestroyed]] قفل الـ interval.
- لما رجعنا: component جديد، والعدّاد بدأ من 1، وطلبين جداد.

### من غير [[takeUntilDestroyed()]]

component تاني نفس الـ interval بس من غير الـ operator:

~~~text الناتج (Chrome): /leak
leak tick 1
leak tick 2
--- leave to /login
leak tick 3
leak tick 4
--- back to /leak
leak tick 5
leak tick 1
leak tick 6
leak tick 2
leak tick 7
~~~

الـ component القديم اتقفل من الشاشة، بس الـ interval بتاعه لسه شغال (3 و 4 وهو برا الصفحة). ولما رجعنا بقى فيه اتنين: القديم (5 و 6 و 7) والجديد (1 و 2). ده الـ memory leak، وبيكبر مع كل دخول وخروج.

---

## ٤. ليه مش [[subscribe]] وتحط في property؟

جرّبنا الشكل اللي في الكود القديم:

~~~ts
products: Product[] = [];
constructor() { inject(ProductsApi).list().subscribe((p) => { this.products = p; console.log('subscribe got', p.length); }); }
~~~

مع template فيه [[{{ products.length }} منتج]]:

~~~text الناتج (Chrome)
subscribe got 5
TEXT: 0 منتج
~~~

البيانات وصلت، والشاشة فضلت «0 منتج». Angular 22 من غير zone.js (zoneless)، فمحدش بيقول للشاشة تتحدّث لما property عادية تتغير. الـ signal ([[toSignal]]) والـ [[async]] pipe الاتنين بيبلّغوا Angular، فالشاشة بتتحدّث.

---

## الخلاصة

| الطريقة | بتعمل subscribe إمتى | بتقفل إمتى | تستخدمها إمتى |
|---|---|---|---|
| الـ [[async]] pipe في الـ template | لما الـ template يترسم | مع الـ destroy | كود قديم، أو template بسيط |
| [[toSignal(obs$, { initialValue })]] | فورًا (injection context) | مع الـ destroy | الكود الجديد: signal تقراها في أي حتة |
| [[.pipe(takeUntilDestroyed()).subscribe(...)]] | انت | مع الـ destroy | side effect (حفظ، log) مش عرض |
| [[toObservable(signal)]] | | | العكس: signal محتاج operators |

وكل subscribe على HTTP Observable = طلب جديد.`,
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
          teach: R`## الفكرة: signals مقفولة، وباب واحد للتعديل

الـ store هنا مش مكتبة: service عادية فيها signals [[private]] محدش من برا يقدر يغيّرها، ونسخ منها للقراية بس، و methods هي الطريقة الوحيدة للتعديل. اتجرّب في Angular 22.2 على Windows: صفحة بتعمل [[store.load()]] في الـ constructor وبتعرض الحالة، مع API بـ Node بيتأخر 500ms في الـ GET، في Chrome headless.

---

## ١. الـ service

~~~ts
@Service()
export class ProductsStore {
  private api = inject(ProductsApi);
~~~

[[@Service()]] = singleton لكل التطبيق (درس HttpClient). ده المهم هنا: أي component يعمل [[inject(ProductsStore)]] بياخد **نفس** النسخة، فالبيانات مشتركة وبتعيش بعد ما الصفحة تتقفل.

---

## ٢. الـ state الخاص

~~~ts
private readonly _items = signal<Product[]>([]);
private readonly _loading = signal(false);
private readonly _error = signal<string | null>(null);
~~~

| الكلمة | معناها |
|---|---|
| [[private]] | مش متاح برا الكلاس |
| [[readonly]] | المتغير نفسه ميتبدلش بـ signal تانية (القيمة اللي جوه بتتغير عادي بـ [[set]]) |
| [[_items]] | الـ [[_]] في الأول عُرف معناه «داخلي» |
| [[signal<Product[]>([])]] | النوع صريح لأن [[[]]] لوحدها مفيهاش نوع |
| [[_error]] | نوعه نص أو [[null]] (مفيش خطأ) |

---

## ٣. اللي بيطلع للناس

~~~ts
readonly items = this._items.asReadonly();
readonly loading = this._loading.asReadonly();
readonly error = this._error.asReadonly();
readonly cheap = computed(() => this._items().filter((p) => p.price < 100));
~~~

- [[asReadonly()]]: بترجّع نفس الـ signal (نفس القيمة، وبتتحدّث معاها) بس نوعها [[Signal]] مش [[WritableSignal]]، يعني مفيهاش [[set]] ولا [[update]]. جرّبنا [[store.items.set([])]] من برا:

~~~text الناتج (ng build)
X [ERROR] TS2339: Property 'set' does not exist on type 'Signal<Product[]>'.
~~~

- [[computed(...)]]: قيمة مشتقة: المنتجات اللي سعرها أقل من 100. بتتحسب لوحدها كل ما [[_items]] تتغير، ومحدش بيخزنها.

---

## ٤. [[load()]]

~~~ts
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
~~~

1. [[async]]: الدالة فيها [[await]]، وبترجّع Promise.
2. loading بـ [[true]]، وامسح أي خطأ قديم.
3. [[firstValueFrom(this.api.list())]]: حوّل الطلب (Observable) لـ Promise، و [[await]] يستنى الرد. ([[firstValueFrom]] بيعمل subscribe، فالطلب بيتبعت هنا.)
4. [[try]] / [[catch]]: لو الطلب فشل (أي status مش 2xx)، الـ Promise بيرفض فنوصل للـ [[catch]] ونحط رسالة.
5. [[finally]]: بيتنفذ في الحالتين، فـ loading ترجع [[false]] دايمًا.

### اللي حصل في الصفحة

~~~text الناتج (Chrome)
t=100ms : بيحمّل... / رخيص: 0
[res] 200 GET /api/products?q=
t=900ms : قلم / كشكول / مسطرة / لابتوب / شنطة لابتوب / رخيص: 3
~~~

و «رخيص: 3» من [[cheap]]: قلم (10) وكشكول (45) ومسطرة (15).

---

## ٥. الـ solCode: [[remove]] بـ optimistic update

~~~ts
async remove(id: number) {
  const before = this._items();
  this._items.update((list) => list.filter((p) => p.id !== id));
  try {
    await firstValueFrom(this.api.remove(id));
  } catch {
    this._items.set(before);
    this._error.set('الحذف فشل، رجّعنا المنتج');
  }
}
~~~

- [[const before = this._items()]]: احفظ القايمة الحالية.
- [[update((list) => list.filter((p) => p.id !== id))]]: شيل المنتج من الشاشة **فورًا** قبل ما السيرفر يرد. [[filter]] بترجّع array جديدة، فالـ signal بتحس بالتغيير.
- لو الـ DELETE فشل: رجّع القايمة القديمة ([[set(before)]]) وقول للمستخدم.

~~~text الناتج (Chrome)
--- remove(1)
[res] 204 DELETE /api/products/1
بعدها: كشكول / مسطرة / لابتوب / شنطة لابتوب / رخيص: 2
--- remove(99) (السيرفر بيرد 404)
[res] 404 DELETE /api/products/99
بعدها: الحذف فشل، رجّعنا المنتج / كشكول / مسطرة / لابتوب / شنطة لابتوب / وهمي / رخيص: 3
~~~

(عشان نجرّب الفشل حطينا منتج «وهمي» بـ id 99 في القايمة والسيرفر ميعرفوش. والسيرفر المحلي رد في أقل من 15ms، فلما قرينا الصفحة كان الرجوع حصل خلاص.)

### خرجنا ورجعنا

~~~text الناتج
back t=50ms: بيحمّل... / كشكول / مسطرة / لابتوب / شنطة لابتوب / وهمي / رخيص: 3
~~~

المنتجات ظاهرة **فورًا** لأن الـ store عايش برا الصفحة. و «بيحمّل...» لأن الـ constructor نادى [[load()]] تاني.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[private _items = signal(...)]] | التعديل من جوه الـ store بس |
| [[items = _items.asReadonly()]] | القراية لأي حد، و [[set]] عليها خطأ compile |
| [[computed]] | أي قيمة ممكن تتحسب متتخزنش |
| methods | باب واحد لكل تعديل، فتعرف تدوّر فين |
| [[firstValueFrom]] + [[try/catch/finally]] | الطلب بـ async/await، و loading ترجع false دايمًا |
| optimistic | عدّل الشاشة الأول، ورجّع القديم لو فشل |`,
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

كل مفتاح في [[withState]] بيبقى signal للقراية بس (deep signals للـ objects). [[patchState(store, partial)]] بيدمج، أو بياخد دالة بتاخد الـ state القديم. والـ state لازم يتعامل immutable: [[store.items().push(x)]] مش بيرمي خطأ (اتجرّب على [[@ngrx/signals]] 22.0.1)، بس الـ signals مبتحسش، فالـ computed زي [[count()]] بتفضل بالقيمة القديمة والشاشة متتحدّثش.

كل [[with...]] بتشوف اللي قبلها: [[withComputed]] بتاخد الـ state signals، و [[withMethods]] بتاخد الـ store كله. والنسخة 22 ماشية مع Angular 22 (peer [[@angular/core ^22]]).

للـ async فيه [[rxMethod]] من [[@ngrx/signals/rxjs-interop]] (بتاخد Observable pipeline زي switchMap) أو ببساطة async methods.

والكلاسيكي: component بيعمل [[store.dispatch(addToCart({ item }))]]، والـ reducer بيرجّع state جديد، والـ effect بيسمع للـ action ويكلّم API ويعمل dispatch لـ success أو failure، والـ component بيقرا بـ [[store.select(selectTotal)]] (Observable) أو [[selectSignal]].`,
            when: "تطبيق كبير فيه stores كتير أو فريق محتاج قواعد. لتطبيق صغير أو متوسط، service بـ signals كفاية. والـ NgRx الكلاسيكي: اعرف تقراه وتعدّل فيه لأنه في مشاريع كتير، بس متبدأش بيه مشروع جديد النهارده غالبًا.",
            mistakes: R`تعدّل [[store.items().push(x)]]: ممنوع ومش هيتحس. وتنسى [[providedIn: 'root']] وتفتكره singleton فكل component ياخد store جديد (أو NG0201 لو مش في providers). وتحط كل حاجة في store حتى state الفورم. وفي الانترفيو: «NgRx بيحل إيه؟» single source of truth وتدفق بيانات متوقع وأدوات debug، والتمن boilerplate.`
          },
          teach: R`## الفكرة: store بيتبني من قطع

نفس فكرة الدرس اللي فات (state مقفول، وقراية بـ signals، وتعديل من methods)، بس بدل ما تكتب الكلاس بإيدك، [[signalStore]] بياخد قطع ويركّبهم: قطعة للبيانات، وقطعة للحسابات، وقطعة للـ methods. اتجرّب على Angular 22.2 و [[@ngrx/signals]] 22.0.1 ([[npm i @ngrx/signals]]) على Windows، والـ store اتنادى من component في Chrome headless.

---

## ١. الـ imports والنوع

~~~ts
import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
type CartItem = { id: number; name: string; price: number; qty: number };
~~~

- [[computed]] من Angular نفسها، مش من NgRx.
- من [[@ngrx/signals]]: [[signalStore]] اللي بيبني، و ٣ قطع [[with...]]، و [[patchState]] اللي بيعدّل.
- [[CartItem]]: شكل عنصر في السلة: [[qty]] = quantity، الكمية.

---

## ٢. [[signalStore(...)]]

~~~ts
export const CartStore = signalStore(
  { providedIn: 'root' },
  ...
);
~~~

- [[signalStore]] بترجّع **كلاس**، مش object. عشان كده الاسم بحرف كبير، وبتعمل [[inject(CartStore)]] زي أي service.
- [[{ providedIn: 'root' }]]: نسخة واحدة لكل التطبيق. من غيره لازم تحطه في [[providers]] بتاع component أو route.
- وبعده القطع بالترتيب، وكل قطعة بتشوف اللي قبلها.

---

## ٣. القطعة الأولى: [[withState]]

~~~ts
withState({ items: [] as CartItem[], coupon: null as string | null }),
~~~

الـ state الأولي. كل مفتاح بيبقى signal للقراية بس على الـ store: [[store.items()]] و [[store.coupon()]].

ليه [[as]]؟ النوع بيتستنتج من القيمة: [[[]]] لوحدها ملهاش نوع عنصر، و [[null]] لوحدها نوعها [[null]] بس. فبنقول لـ TypeScript النوع الحقيقي.

---

## ٤. القطعة التانية: [[withComputed]]

~~~ts
withComputed(({ items }) => ({
  count: computed(() => items().reduce((s, i) => s + i.qty, 0)),
  total: computed(() => items().reduce((s, i) => s + i.price * i.qty, 0)),
})),
~~~

- بتاخد دالة، والدالة بتاخد الـ store لحد دلوقتي. [[({ items })]] destructuring: خد [[items]] منه بس.
- بترجّع object، وكل مفتاح فيه بيتضاف للـ store: [[store.count()]] و [[store.total()]].
- [[reduce((s, i) => s + i.qty, 0)]]: لف على العناصر وجمّع. [[s]] المجموع لحد دلوقتي (بيبدأ [[0]])، و [[i]] العنصر الحالي. في [[total]] بنجمع السعر × الكمية.

---

## ٥. القطعة التالتة: [[withMethods]]

~~~ts
withMethods((store) => ({
  add(item: CartItem) { patchState(store, (s) => ({ items: [...s.items, item] })); },
  applyCoupon(code: string) { patchState(store, { coupon: code }); },
  clear() { patchState(store, { items: [], coupon: null }); },
})),
~~~

[[patchState(store, ...)]] هو الطريقة الوحيدة لتعديل الـ state، وليه شكلين:

| الشكل | مثال | معناه |
|---|---|---|
| object | [[patchState(store, { coupon: code })]] | ادمج ده في الـ state (الباقي زي ما هو) |
| دالة | [[patchState(store, (s) => ({ items: [...s.items, item] }))]] | [[s]] الـ state الحالي، ورجّع الجزء الجديد |

و [[[...s.items, item]]]: array **جديدة** فيها القديم والعنصر الجديد. مش [[push]].

---

## ٦. اللي حصل فعلًا

component بينادي الـ methods ويطبع بعد كل واحدة:

~~~text الناتج (Chrome console)
start           | items: [] | count: 0 | total: 0 | coupon: null
add قلم         | items: [{"id":1,"name":"قلم","price":10,"qty":3}] | count: 3 | total: 30
add كشكول       | count: 4 | total: 75
changeQty(1, 5) | count: 6 | total: 95
applyCoupon     | coupon: EID10
clear           | items: [] | count: 0 | total: 0 | coupon: null
keys on store: items, coupon, count, total, add, applyCoupon, clear, changeQty
~~~

(اختصرنا الـ items في السطور الوسطانية.) قلم ٣ × ١٠ = ٣٠، وكشكول ٤٥ يبقى ٧٥. وآخر سطر بيوريك إن الـ store في الآخر object فيه كل حاجة: الـ state والـ computed والـ methods.

### وجرّبنا [[push]]

~~~ts
s.items().push({ id: 9 });
~~~

~~~text الناتج
push worked, no error | items().length: 3 | count(): 6
~~~

مفيش خطأ، والـ array بقى فيها ٣ عناصر، بس [[count()]] لسه 6: الـ signal محستش، فالـ computed محسبتش تاني. ده سبب إن التعديل لازم يبقى بـ [[patchState]] و array جديدة.

---

## ٧. الـ solCode

### [[changeQty]] (جوه [[withMethods]])

~~~ts
changeQty(id: number, qty: number) {
  patchState(store, (s) => ({ items: s.items.map((i) => (i.id === id ? { ...i, qty } : i)) }));
},
~~~

- [[s.items.map(...)]]: array جديدة.
- [[i.id === id ? { ...i, qty } : i]]: العنصر المطلوب يتعمل منه نسخة ([[...i]]) بالكمية الجديدة ([[qty]] اختصار [[qty: qty]])، والباقي زي ما هو.

### [[withHooks]] (قطعة جديدة في الآخر)

~~~ts
withHooks({
  onInit(store) {
    const saved = localStorage.getItem('cart');
    if (saved) patchState(store, { items: JSON.parse(saved) });
  },
}),
~~~

- [[onInit]] بيتنادى مرة لما الـ store يتعمل (أول [[inject]]).
- [[localStorage.getItem('cart')]]: نص محفوظ في المتصفح أو [[null]]، و [[JSON.parse]] بيرجّعه array.

حطينا في [[localStorage]] سلة فيها قلم بكمية 5 وعملنا reload:

~~~text الناتج (بعد reload)
start | items: [{"id":1,"name":"قلم","price":10,"qty":5}] | count: 5 | total: 50
~~~

السلة رجعت قبل أي حاجة تانية.

---

## الخلاصة

| القطعة | بتضيف للـ store | بتشوف |
|---|---|---|
| [[withState]] | signal لكل مفتاح | |
| [[withComputed]] | signals محسوبة | الـ state |
| [[withMethods]] | methods بتعدّل بـ [[patchState]] | الـ store كله |
| [[withHooks]] | [[onInit]] و [[onDestroy]] | الـ store كله |

والتعديل دايمًا بـ [[patchState]] وقيم جديدة، مش [[push]] ولا تعديل object موجود.`,
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
            how: R`[[ng add]] (في الـ lab على 22.2) عمل [[src/material-theme.scss]] فيه [[mat.theme((color: (primary: mat.$azure-palette, tertiary: mat.$blue-palette), typography: Roboto, density: 0))]]، وضافه في [[angular.json]] styles، وضاف لينكات Roboto و Material Symbols في [[index.html]].

الـ theme مبني على CSS variables ([[--mat-sys-primary]] و [[--mat-sys-surface]])، فتقدر تستخدمها في CSS بتاعك عشان ألوانك تمشي مع الـ theme، والـ dark mode بيبقى بـ [[color-scheme]].

الزراير في النسخ الحديثة بـ [[matButton="filled"]] و [[matButton="outlined"]] و [[matButton="tonal"]]، وفي الكود القديم هتلاقي [[mat-raised-button]] و [[mat-flat-button]]، ولسه شغالين.

[[MatSnackBar]] و [[MatDialog]] services بتعمل لها inject وتفتح بيها. [[dialog.open(ConfirmDialog, { data })]] بيرجّع ref، و [[afterClosed()]] Observable بالنتيجة.

[[mat-form-field]] مع [[matInput]] بيشتغل مع reactive forms وبيعرض [[<mat-error>]] لوحده لما الحقل invalid و touched.`,
            when: "لوحات تحكم وأنظمة داخلية وأي تطبيق مش محتاج تصميم براند مميز جدًا. لو الديزاين مخصوص خالص، CDK لوحده (الدرس الجاي) + CSS بتاعك، أو Tailwind.",
            mistakes: R`تنسى تعمل import للـ module فالـ tag يظهر كـ HTML عادي من غير شكل، أو NG8001. وتعدّل شكل Material بـ [[::ng-deep]] وselectors داخلية بتتكسر مع كل update: استخدم الـ tokens والـ theme API. وتخلط Material و PrimeNG و Bootstrap في نفس المشروع: bundle تقيل وشكل متلخبط.`
          },
          teach: R`## الفكرة: components جاهزة بتتعمل import زي أي component

Angular Material مكتبة components رسمية. بتسطّبها مرة بـ [[ng add]]، وبعدها أي component محتاج حاجة منها بيعمل import للـ module بتاعها في [[imports]] ويستخدم الـ tags والـ attributes بتاعتها. اتجرّب على Angular 22.2 و [[@angular/material]] 22.2.2 على Windows، والصفحة في Chrome headless.

---

## ١. [[ng add @angular/material]]

~~~powershell
npx ng add @angular/material --skip-confirmation
~~~

([[--skip-confirmation]] عشان ميسألش «تسطّب؟». من غيرها بيسألك وتقول Y.)

~~~text الناتج (آخره)
› Found compatible package version: 22.2.2.
UPDATE package.json (847 bytes)
✔ Packages installed successfully.
CREATE src/material-theme.scss (1179 bytes)
UPDATE angular.json (2012 bytes)
UPDATE src/index.html (647 bytes)
~~~

| الملف | اتعمل فيه إيه |
|---|---|
| [[package.json]] | [[@angular/material]] و [[@angular/cdk]] بنفس نسخة Angular |
| [[src/material-theme.scss]] | الـ theme (تحت) |
| [[angular.json]] | ضاف الملف ده لـ [[styles]]: [[["src/material-theme.scss", "src/styles.css"]]] |
| [[src/index.html]] | لينكات خط Roboto وأيقونات Material Symbols من Google Fonts |

### الـ theme

~~~text src/material-theme.scss (مختصر)
html {
  @include mat.theme((
    color: (primary: mat.$azure-palette, tertiary: mat.$blue-palette),
    typography: Roboto,
    density: 0,
  ));
}
body {
  color-scheme: light;
  background-color: var(--mat-sys-surface);
  color: var(--mat-sys-on-surface);
}
~~~

- [[mat.theme(...)]]: Sass mixin بيطلّع CSS variables لكل الألوان والخطوط، اسمها [[--mat-sys-...]].
- [[primary]]: اللون الأساسي (أزرق azure). و [[density: 0]]: المسافات العادية (أرقام سالبة = أضيق).
- [[color-scheme: light]]: الوضع الفاتح. والـ variables نفسها مكتوبة بـ [[light-dark(...)]]: قرينا [[--mat-sys-primary]] في المتصفح وطلعت [[light-dark(#005cbb, #abc7ff)]]، يعني لون للفاتح ولون للغامق، والمتصفح بيختار حسب [[color-scheme]].

---

## ٢. الـ component

~~~ts
imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule],
~~~

كل حاجة ليها module من مسار لوحده: [[@angular/material/button]] و [[/form-field]] و [[/input]] و [[/icon]]. فالـ bundle بياخد اللي استخدمته بس.

### حقل الإدخال

~~~html
<mat-form-field appearance="outline">
  <mat-label>اسم المنتج</mat-label>
  <input matInput [value]="name()" (input)="name.set($any($event.target).value)" />
  <mat-hint>٣ حروف على الأقل</mat-hint>
</mat-form-field>
~~~

- [[<mat-form-field appearance="outline">]]: الحاوية: إطار حوالين الحقل. ([[fill]] شكل تاني بخلفية.)
- [[<mat-label>]]: العنوان: جوه الحقل وهو فاضي، وبيطلع فوق على الإطار لما تكتب.
- [[matInput]]: attribute بيخلي الـ input العادي يشتغل جوه الحاوية.
- [[[value]="name()"]] و [[(input)="name.set(...)"]]: ربط يدوي بالـ signal. [[$event.target]] العنصر اللي حصل عليه الحدث، و [[$any(...)]] بيقول للـ template compiler «متفحصش النوع هنا» عشان [[.value]] مش موجودة على [[EventTarget]].
- [[<mat-hint>]]: سطر مساعدة تحت الحقل.

### الزراير

~~~html
<button matButton="filled" (click)="save()"><mat-icon>save</mat-icon> حفظ</button>
<button matButton="outlined">إلغاء</button>
~~~

- [[matButton="filled"]]: زرار مليان بلون الـ primary (الأساسي في الصفحة). [[outlined]]: إطار بس.
- [[<mat-icon>save</mat-icon>]]: الأيقونة بالاسم، من خط Material Symbols اللي [[ng add]] ضافه.

### الـ snackbar

~~~ts
private snack = inject(MatSnackBar);
save() { this.snack.open('اتحفظ', 'تمام', { duration: 2000 }); }
~~~

[[MatSnackBar]] service (مش tag). [[open(رسالة, زرار, إعدادات)]]، و [[duration: 2000]] = تختفي بعد ثانيتين.

---

## ٣. اللي حصل فعلًا

~~~text الناتج (Chrome)
form-field classes: mat-form-field-appearance-outline
after typing: mat-form-field-appearance-outline mat-focused
buttons: ... mdc-button--unelevated mat-mdc-unelevated-button || ... mdc-button--outlined mat-mdc-outlined-button
body bg (light): rgb(250, 249, 253)
snackbar: اتحفظ / تمام
snackbar after 2.7s count: 0
~~~

- Material بيحط classes لوحده على العناصر حسب الحالة ([[mat-focused]] لما الحقل عليه الـ focus).
- الـ snackbar ظهر بالرسالة والزرار، واختفى بعد المدة.

### الـ try: الوضع الغامق

غيّرنا [[color-scheme: light]] لـ [[dark]] في [[material-theme.scss]]:

~~~text الناتج
light:  body bg: rgb(250, 249, 253) | color: rgb(26, 27, 31)
dark:   body bg: rgb(18, 19, 22)    | color: rgb(227, 226, 230)
~~~

سطر واحد قلب الخلفية والنص وكل ألوان Material، لأنهم كلهم [[light-dark(...)]].

---

## ٤. الـ solCode: dialog «متأكد؟»

~~~html
<h2 mat-dialog-title>متأكد؟</h2>
<mat-dialog-content>هتحذف {{ data.name }}</mat-dialog-content>
<mat-dialog-actions>
  <button matButton [mat-dialog-close]="false">لأ</button>
  <button matButton="filled" [mat-dialog-close]="true">احذف</button>
</mat-dialog-actions>
~~~

- component عادي بيتفتح جوه dialog. [[mat-dialog-title]] و [[mat-dialog-content]] و [[mat-dialog-actions]] أماكن العنوان والمحتوى والزراير.
- [[[mat-dialog-close]="true"]]: الضغطة تقفل الـ dialog وترجّع [[true]] لمين فتحه.
- [[data = inject<{ name: string }>(MAT_DIALOG_DATA)]]: البيانات اللي اتبعتت للـ dialog.

~~~ts
this.dialog.open(ConfirmDialog, { data: p }).afterClosed()
  .subscribe((ok) => { if (ok) this.store.remove(p.id); });
~~~

- [[dialog.open(Component, { data })]]: افتح وابعت [[p]].
- [[afterClosed()]]: Observable بيطلّع النتيجة لما يتقفل.

~~~text الناتج (Chrome)
dialog: متأكد؟ / هتحذف كشكول / لأ / احذف
احذف  → afterClosed: true      → store.remove(2)
لأ    → afterClosed: false
Esc   → afterClosed: undefined
~~~

لاحظ إن [[Esc]] (أو الضغط برا الـ dialog) بيرجّع [[undefined]]، فـ [[if (ok)]] بيعامله زي «لأ». ده سبب إننا مكتبناش [[ok !== false]].

---

## الخلاصة

| الحاجة | إزاي |
|---|---|
| التسطيب | [[ng add @angular/material]]: package و theme و خطوط |
| استخدام component | import الـ module في [[imports]] بتاع الـ component |
| الألوان | CSS variables [[--mat-sys-*]]، و [[color-scheme]] للفاتح والغامق |
| زراير | [[matButton="filled"]] و [[outlined]] و [[tonal]] |
| snackbar و dialog | services بـ [[inject]]، و [[afterClosed()]] بالنتيجة |`,
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
          teach: R`## الفكرة: سلوك جاهز من غير شكل

المثال قايمة مهام بتترتب بالسحب (من [[@angular/cdk/drag-drop]])، وبتاخد class زيادة لما الشاشة موبايل (من [[@angular/cdk/layout]]). الـ CDK بيدّيك السلوك بس: الشكل كله CSS بتاعك. اتجرّب على Angular 22.2 و [[@angular/cdk]] 22.2.2 (اتسطّب مع Material) على Windows، والسحب اتعمل بالماوس بـ Playwright في Chrome headless.

---

## ١. الـ imports

~~~ts
imports: [CdkDropList, CdkDrag],
~~~

directives standalone من [[@angular/cdk/drag-drop]]: [[CdkDropList]] للحاوية و [[CdkDrag]] للعنصر اللي بيتسحب. ومن نفس المسار [[CdkDragDrop]] (نوع الحدث) و [[moveItemInArray]] و [[transferArrayItem]] (دوال مساعدة).

---

## ٢. الـ template

~~~html
<ul cdkDropList (cdkDropListDropped)="drop($event)" [class.compact]="isHandset()">
  @for (t of tasks(); track t) { <li cdkDrag>{{ t }}</li> }
</ul>
~~~

- [[cdkDropList]]: الـ [[<ul>]] بقى حاوية تقدر تفلت فيها.
- [[(cdkDropListDropped)="drop($event)"]]: لما تفلت عنصر، نادي [[drop]] ومعاه تفاصيل الحدث.
- [[[class.compact]="isHandset()"]]: حط class اسمه [[compact]] لو [[isHandset()]] بـ [[true]].
- [[cdkDrag]]: الـ [[<li>]] بقى بيتسحب.
- [[track t]]: النصوص نفسها مختلفة، فتنفع كـ مفتاح.

---

## ٣. الـ breakpoint

~~~ts
isHandset = toSignal(
  inject(BreakpointObserver).observe(Breakpoints.Handset).pipe(map((r) => r.matches)),
  { initialValue: false },
);
~~~

من جوه لبرة:

1. [[inject(BreakpointObserver)]]: service من [[@angular/cdk/layout]].
2. [[.observe(Breakpoints.Handset)]]: Observable بيطلّع نتيجة كل ما الشاشة تدخل أو تخرج من الـ media query. [[Breakpoints.Handset]] media queries جاهزة لمقاسات الموبايل.
3. [[.pipe(map((r) => r.matches))]]: النتيجة object، وإحنا عايزين [[matches]] بس ([[true]] / [[false]]).
4. [[toSignal(..., { initialValue: false })]]: حوّله signal.

~~~text الناتج (Chrome)
desktop 1280px: ul class = "cdk-drop-list"
phone 390px portrait: ul class = "cdk-drop-list compact"
~~~

و [[cdk-drop-list]] ده class الـ CDK حطه لوحده على الحاوية.

---

## ٤. [[drop]]

~~~ts
drop(e: CdkDragDrop<string[]>) {
  this.tasks.update((list) => {
    const copy = [...list];
    moveItemInArray(copy, e.previousIndex, e.currentIndex);
    return copy;
  });
}
~~~

- [[CdkDragDrop<string[]>]]: نوع الحدث، و [[string[]]] نوع بيانات الحاوية. أهم حاجتين فيه [[previousIndex]] (العنصر كان فين) و [[currentIndex]] (اتفلت فين).
- [[[...list]]]: نسخة من الـ array.
- [[moveItemInArray(copy, from, to)]]: بتنقل العنصر **جوه نفس الـ array** (بتعدّلها مكانها). عشان كده بنديها النسخة.
- [[return copy]]: الـ array الجديدة هي القيمة الجديدة للـ signal، فالشاشة تتحدّث.

سحبنا «تصميم» (الأول) ونزّلناه على التالت:

~~~text الناتج (Chrome)
dropped previousIndex=0 currentIndex=2
after drag: [ 'تنفيذ', 'اختبار', 'تصميم', 'رفع' ]
~~~

### من غير [[drop]]

خلّينا [[drop]] متعملش حاجة وسحبنا تاني:

~~~text الناتج
while dragging: [ 'تصميم', 'تنفيذ', 'اختبار', 'رفع' ] | preview exists: 1 | placeholder: 1
after drop:     [ 'تصميم', 'تنفيذ', 'اختبار', 'رفع' ]
~~~

وانت بتسحب، الـ CDK بيعمل نسخة عايمة بتمشي مع الماوس (class [[cdk-drag-preview]]) ومكان فاضي في القايمة ([[cdk-drag-placeholder]]). بس لما تفلت، العنصر بيرجع مكانه، لأن الـ CDK **مش بيلمس بياناتك**: الترتيب الحقيقي هو اللي في الـ signal.

---

## ٥. الـ solCode: عمودين

~~~html
<div cdkDropList #todoList="cdkDropList" [cdkDropListData]="todo()" [cdkDropListConnectedTo]="[doneList]" (cdkDropListDropped)="drop($event)">
~~~

- [[#todoList="cdkDropList"]]: template reference variable: اسم للـ directive نفسه عشان العمود التاني يشاور عليه.
- [[[cdkDropListData]="todo()"]]: الـ array بتاعة العمود ده، وبتوصل في الحدث كـ [[e.container.data]].
- [[[cdkDropListConnectedTo]="[doneList]"]]: مسموح تسحب من هنا لـ [[doneList]]. والعمود التاني متوصل بـ [[todoList]].

~~~ts
drop(e: CdkDragDrop<string[]>) {
  if (e.previousContainer === e.container) {
    moveItemInArray(e.container.data, e.previousIndex, e.currentIndex);
  } else {
    transferArrayItem(e.previousContainer.data, e.container.data, e.previousIndex, e.currentIndex);
  }
  this.todo.set([...this.todo()]);
  this.done.set([...this.done()]);
}
~~~

- نفس العمود؟ رتّب. عمود تاني؟ [[transferArrayItem(من, إلى, from, to)]] بتشيل العنصر من array وتحطه في التانية.
- الدالتين بيعدّلوا الـ arrays اللي **جوه** الـ signals مكانها، والـ signals مبتحسش. فالسطرين الأخيرين بيحطوا نسخة جديدة في كل signal.

~~~text الناتج (Chrome)
start               todo=["تصميم","تنفيذ","اختبار"] done=[]
after تنفيذ -> done  todo=["تصميم","اختبار"] done=["تنفيذ"]
after تصميم -> done  todo=["اختبار"] done=["تنفيذ","تصميم"]
~~~

---

## الخلاصة

| الحاجة | اللي يفضل في دماغك |
|---|---|
| [[cdkDropList]] + [[cdkDrag]] | حاوية وعناصر بتتسحب |
| [[(cdkDropListDropped)]] | انت اللي بترتب البيانات، الـ CDK بيقولك من فين لفين بس |
| [[moveItemInArray]] و [[transferArrayItem]] | بيعدّلوا الـ array مكانها، فادّي الـ signal array جديدة |
| [[BreakpointObserver.observe(...)]] | Observable بـ [[matches]]، و [[toSignal]] يحوّله |
| الشكل | CSS بتاعك، و classes زي [[cdk-drag-preview]] و [[cdk-drag-placeholder]] |`,
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
          teach: R`## الفكرة: علّم، طلّع، ترجم، ابني

الترجمة الرسمية في Angular ٤ خطوات: بتعلّم النصوص اللي محتاجة ترجمة، والـ CLI بيطلّعها في ملف، وانت (أو المترجم) بتكتب جنب كل نص ترجمته، وبعدين الـ build بيطلّع نسخة كاملة من الموقع لكل لغة. المثال فيه الخطوات دي بالترتيب. اتجرّب كله على Windows في مشروع Angular 22.2 ([[@angular/localize]] 22.2.1)، والنسختين اتفتحوا في Chrome headless من سيرفر static صغير.

---

## ١. [[ng add @angular/localize]]

~~~text الناتج (آخره)
› Found compatible package version: 22.2.1.
UPDATE src/main.ts (273 bytes)
UPDATE tsconfig.app.json (445 bytes)
UPDATE tsconfig.spec.json (451 bytes)
UPDATE angular.json (2019 bytes)
~~~

| الملف | اتضاف فيه |
|---|---|
| [[angular.json]] | [["polyfills": ["@angular/localize/init"]]]: الكود اللي بيعرّف [[$localize]] وقت التشغيل |
| [[tsconfig.app.json]] | [["types": ["@angular/localize"]]]: عشان TypeScript يعرف [[$localize]] |
| [[src/main.ts]] | سطر [[/// <reference types="@angular/localize" />]] للسبب نفسه |

---

## ٢. تعليم النصوص

~~~html
<h1 i18n="@@homeTitle">Welcome to our shop</h1>
<p i18n>{count(), plural, =0 {No items} =1 {One item} other {{{count()}} items}}</p>
<button i18n-title title="Save your cart">Save</button>
~~~

### [[i18n="@@homeTitle"]]

[[i18n]] (= internationalization: i وبعدها ١٨ حرف وبعدها n) attribute بيقول «النص اللي جوه العنصر ده للترجمة». و [[@@homeTitle]] id ثابت انت اختاره. من غيره الـ id بيتعمل من النص نفسه (hash)، فلو غيّرت حرف في الإنجليزي الـ id يتغير والترجمة تضيع.

### الـ plural (ICU)

~~~text شكل الـ ICU message
{count(), plural, =0 {No items} =1 {One item} other {{{count()}} items}}
 └ القيمة  └ النوع  └ الحالات: =رقم بالظبط، أو فئة زي other
~~~

- [[count()]]: الرقم اللي بنختار على أساسه (signal في الكلاس).
- [[=0 {...}]] و [[=1 {...}]]: نص لرقم معين.
- [[other {...}]]: أي رقم تاني. و [[{{count()}}]] جواه interpolation عادي.

### [[i18n-title]]

[[i18n-]] وبعده اسم attribute: ترجم الـ attribute ده. هنا [[title]] (النص اللي بيظهر لما الماوس يقف على الزرار). كلمة «Save» نفسها مش متعلّمة، فهتفضل إنجليزي.

### في الكود: [[$localize]]

~~~ts
alert($localize$__bt:@@cartSaved:Your cart was saved$__bt);
~~~

[[$localize]] tagged template (دالة بتتكتب قبل الـ backtick على طول). [[:@@cartSaved:]] في الأول هو الـ id، والباقي النص.

---

## ٣. [[ng extract-i18n --output-path src/locale]]

~~~text الناتج
Application bundle generation complete. [3.744 seconds]
Extraction Complete. (Messages: 4)
~~~

بيعمل build عشان يلاقي كل الرسايل، ويكتبهم في [[src/locale/messages.xlf]] (XLIFF: صيغة XML للترجمة):

~~~xml src/locale/messages.xlf (مختصر)
<file source-language="en-US" datatype="plaintext" original="ng2.template">
  <trans-unit id="homeTitle" datatype="html">
    <source>Welcome to our shop</source>
  </trans-unit>
  <trans-unit id="6358580996267558411" datatype="html">
    <source>{VAR_PLURAL, plural, =0 {No items} =1 {One item} other {<x id="INTERPOLATION"/> items}}</source>
  </trans-unit>
  <trans-unit id="3928037272347022963" datatype="html">
    <source>Save your cart</source>
  </trans-unit>
  <trans-unit id="cartSaved" datatype="html">
~~~

- ٤ رسايل: العنوان، والـ plural، والـ title، واللي في الكود.
- اللي ليهم [[@@]] الـ id بتاعهم اسمك ([[homeTitle]] و [[cartSaved]])، والباقي رقم طويل (hash).
- في الـ plural الـ [[count()]] بقى [[VAR_PLURAL]]، والـ interpolation بقى [[<x id="INTERPOLATION"/>]]: placeholders المترجم بيسيبهم زي ما هم.

---

## ٤. الترجمة

~~~powershell
cp src/locale/messages.xlf src/locale/messages.ar.xlf
~~~

([[cp]] في PowerShell اسم تاني لـ [[Copy-Item]]، وفي bash أمر أصلي.) وفي النسخة العربي:

1. [[target-language="ar"]] على [[<file>]].
2. [[<target>...</target>]] بعد كل [[<source>]]:

~~~xml messages.ar.xlf (الإضافات)
<source>Welcome to our shop</source>
<target>أهلا بيك في المحل</target>

<target>{VAR_PLURAL, plural, =0 {مفيش حاجة} =1 {حاجة واحدة} =2 {حاجتين} few {<x id="INTERPOLATION"/> حاجات} other {<x id="INTERPOLATION"/> حاجة}}</target>
~~~

العربي في الـ plural ليه فئات زيادة: [[few]] (من 3 لـ 10) و [[many]] (من 11 لـ 99)، فالترجمة ممكن يبقى فيها حالات مش في الإنجليزي.

---

## ٥. [[angular.json]]

~~~json جوه "projects": { "shop": { ... } }
"i18n": { "sourceLocale": "en-US", "locales": { "ar": "src/locale/messages.ar.xlf" } }
~~~

- [[sourceLocale]]: لغة النصوص المكتوبة في الكود.
- [[locales]]: كل لغة وملف ترجمتها.

---

## ٦. [[ng build --localize]]

بيعمل build مرة، وبعدين ينسخ الناتج لكل لغة ويحط الترجمة مكان النص. قرينا الملفات اللي طلعت:

~~~text الناتج
folders: ar en-US
ar     <html lang="ar" dir="rtl">      <base href="/ar/">
en-US  <html lang="en-US" dir="ltr">   <base href="/en-US/">
~~~

- فولدر لكل لغة جوه [[browser]].
- [[lang]] و [[dir]] اتحطوا لوحدهم، و Angular عارف إن العربي RTL.
- [[base href]] اتظبط لكل لغة، فالسيرفر يوجّه [[/ar/]] لفولدر [[ar]].

وفتحنا الصفحة في النسختين ودوسنا على [[+]] لحد 11، والزرار اللي فيه [[$localize]]:

~~~text الناتج (Chrome)
[en-US] h1: Welcome to our shop | title: Save your cart
[en-US] plural: 0 -> No items | 1 -> One item | 2 -> 2 items | 3 -> 3 items | 11 -> 11 items
  [en-US] alert: Your cart was saved
[ar] h1: أهلا بيك في المحل | title: احفظ السلة
[ar] plural: 0 -> مفيش حاجة | 1 -> حاجة واحدة | 2 -> حاجتين | 3 -> 3 حاجات | 11 -> 11 حاجة
  [ar] alert: السلة اتحفظت
~~~

- 3 اختارت [[few]] (حاجات)، و 11 مكانش ليها [[many]] في ترجمتنا فراحت لـ [[other]] (حاجة). ده الـ plural بقواعد اللغة.
- مفيش أي كود اتغير بين النسختين: الترجمة اتحطت وقت الـ build.

---

## الخلاصة

| الخطوة | الأمر / العلامة |
|---|---|
| تسطيب | [[ng add @angular/localize]] |
| تعليم في الـ template | [[i18n="@@id"]] و [[i18n-title]] و ICU plural |
| تعليم في الكود | [[$localize]] مع [[:@@id:]] |
| طلّع الرسايل | [[ng extract-i18n --output-path src/locale]] |
| ترجم | نسخة [[.ar.xlf]] فيها [[target-language]] و [[<target>]] |
| ابني | [[i18n]] في [[angular.json]]، و [[ng build --localize]]: فولدر لكل لغة |`,
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
          teach: R`## الفكرة: CSS بيتكلم عن «البداية» و«النهاية» مش «شمال» و«يمين»

المثال كارت عليه خط ملوّن في أول السطر، و badge جنبه مسافة، وزرار بيقلب الصفحة بين عربي وإنجليزي. الـ CSS مكتوب بـ logical properties، فنفس السطور بتشتغل في الاتجاهين. اتجرّب على Angular 22.2 على Windows في Chrome headless (عرض الصفحة 600px)، وقرينا الـ CSS المحسوب ومكان العناصر بعد كل ضغطة.

---

## ١. الـ template

~~~html
<div class="card"><span class="badge">جديد</span> {{ label() }}</div>
<button (click)="toggle()">{{ lang() === 'ar' ? 'English' : 'عربي' }}</button>
~~~

- الكارت: badge مكتوب فيه «جديد»، وبعده النص من [[label()]].
- الزرار: لو اللغة [[ar]] اكتب «English» (اللي هتروحله)، غير كده «عربي».

---

## ٢. الـ styles

~~~text styles
.card { padding-inline-start: 16px; border-inline-start: 4px solid teal; text-align: start; }
.badge { margin-inline-end: 8px; }
~~~

### الكلمات

| الكلمة | معناها |
|---|---|
| [[inline]] | الاتجاه اللي السطر ماشي فيه (أفقي في العربي والإنجليزي) |
| [[block]] | الاتجاه التاني (رأسي): السطور تحت بعض |
| [[start]] | أول السطر: يمين في RTL، وشمال في LTR |
| [[end]] | آخر السطر: شمال في RTL، ويمين في LTR |

فـ [[padding-inline-start: 16px]] = مسافة جوه الكارت من ناحية أول السطر. و [[border-inline-start]] = خط من ناحية أول السطر. و [[margin-inline-end]] على الـ badge = مسافة بعده في اتجاه القراية. و [[text-align: start]] = ابدأ الكلام من أول السطر.

RTL = right to left (من اليمين للشمال)، و LTR = left to right.

---

## ٣. الكلاس

~~~ts
private doc = inject(DOCUMENT);
protected dir = inject(Directionality);
lang = signal<'ar' | 'en'>('ar');
label = signal('منتج');
~~~

- [[inject(DOCUMENT)]]: الـ [[document]] بتاع الصفحة، من [[@angular/core]]. ليه مش [[document]] مباشرة؟ لأن مع SSR الكود بيشتغل على السيرفر ومفيش [[document]] حقيقي، و Angular بيدّيك واحد بديل.
- [[inject(Directionality)]]: من [[@angular/cdk/bidi]] (bidi = bidirectional، الاتجاهين). بيقولك الاتجاه في [[dir.value]].
- [[signal<'ar' | 'en'>('ar')]]: النوع قيمتين بس، فلو كتبت [['fr']] الـ compiler يعترض.

### [[toggle()]]

~~~ts
this.lang.update((l) => (l === 'ar' ? 'en' : 'ar'));
this.doc.documentElement.lang = this.lang();
this.doc.documentElement.dir = this.lang() === 'ar' ? 'rtl' : 'ltr';
~~~

- اقلب اللغة.
- [[documentElement]] هو عنصر [[<html>]]. [[lang]] عليه بيقول للمتصفح والقارئ الصوتي اللغة إيه، و [[dir]] بيقلب اتجاه الصفحة كلها.

---

## ٤. اللي حصل فعلًا

~~~text الناتج (Chrome، الـ CSS المحسوب)
AR : dir=rtl | border-left=0px  border-right=4px | padding-left=0px  padding-right=16px | badge margin-left=8px margin-right=0px | badge x=560
EN : dir=ltr | border-left=4px  border-right=0px | padding-left=16px padding-right=0px  | badge margin-left=0px margin-right=8px | badge x=43
~~~

- في العربي الخط والمسافة طلعوا **يمين**، والـ badge في أقصى اليمين (x=560 من 600) والمسافة على شماله.
- بعد الضغطة نفس الـ CSS طلّع الخط **شمال**، والـ badge في الشمال والمسافة على يمينه.
- ولا سطر CSS اتغير. المتصفح هو اللي ترجم [[start]] و [[end]] حسب [[dir]].

### الـ try: [[border-left]] بدل [[border-inline-start]]

~~~text الناتج
EN border-left: border-left=4px border-right=0px
AR border-left: border-left=4px border-right=0px
~~~

الخط فضل شمال في الحالتين، يعني في العربي بقى في **آخر** السطر. ده الفرق بين physical (شمال/يمين ثابت) و logical (أول/آخر السطر).

### [[Directionality]] بيقرا مرة واحدة

~~~text الناتج: dir.value
<html> من غير dir وقت التشغيل          dir.value = ltr  (وفضلت ltr بعد كل toggle)
<html dir="rtl"> وقت التشغيل            dir.value = rtl
بعد toggle (html dir=ltr)               dir.value = rtl
~~~

[[Directionality]] بيقرا [[dir]] من [[<body>]] أو [[<html>]] مرة لما يتعمل، ومش بيسمع لتغييرات بعدها. عشان كده لو بتبدّل الاتجاه وانت شغال، حط الـ directive [[Dir]] ([[[dir]="..."]]) على عنصر أب في الـ template، وده اللي Material و CDK اللي جواه بيسمعوله.

---

## الخلاصة

| بدل | استخدم |
|---|---|
| [[margin-left]] / [[margin-right]] | [[margin-inline-start]] / [[margin-inline-end]] |
| [[padding-left]] | [[padding-inline-start]] |
| [[border-left]] | [[border-inline-start]] |
| [[text-align: left]] | [[text-align: start]] |
| [[document]] | [[inject(DOCUMENT)]] |
| [[dir]] على [[<html>]] | بيقلب الصفحة كلها، و [[Directionality]] بيقراه مرة |`,
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
    }
]);
