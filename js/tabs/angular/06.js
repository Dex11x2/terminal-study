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
    }
]);
