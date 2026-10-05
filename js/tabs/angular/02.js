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
    }
]);
