// تكملة تاب angular: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/angular/01.js (شرح حقول الدرس في أوله)
MORE("angular", [
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
          teach: R`## الفكرة: أوامر تشغيل، واختبار واحد بيبدّل الـ API بواحد وهمي

المثال جزئين: ٥ أوامر بتشغّل الاختبارات بأشكال مختلفة، وبعدين اختبار لـ [[ProductsStore]]: store بيجيب المنتجات من [[ProductsApi]]، واحنا عايزين نختبره **من غير** سيرفر. اتجرّب على ويندوز في مشروع [[ng new shop]] بـ Angular 22.2.1، و Vitest 5.0.3 (اللي [[ng new]] حطه)، و Node 24.

الـ store اللي بنختبره (عملناه في الـ lab بالشكل ده):

~~~text products-store.ts
export class ProductsStore {
  private api = inject(ProductsApi);
  items = signal<Item[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  async load() {
    this.loading.set(true);
    this.error.set(null);
    try {
      this.items.set(await firstValueFrom(this.api.list()));
    } catch {
      this.error.set('مقدرناش نجيب المنتجات');
    } finally {
      this.loading.set(false);
    }
  }
}
~~~

[[firstValueFrom]] (من rxjs) بيحوّل Observable لـ Promise بأول قيمة، فينفع [[await]]. و [[try/catch/finally]]: جرّب، ولو حصل خطأ اعمل كذا، وفي الحالتين في الآخر اقفل الـ loading.

---

## ١. الأوامر

### [[ng test]]

بيبني ملفات [[*.spec.ts]] بـ esbuild ويشغّلها بـ Vitest في Node، مع [[jsdom]] (DOM وهمي مكتوب بـ JavaScript، فمفيش متصفح بيفتح). من غير flags بيفضل شغال ويعيد مع كل حفظ (watch mode) لو انت في ترمنال تفاعلي.

### [[ng test --watch=false]]

مرة واحدة ويخرج، و exit code بيقول نجح ولا لأ (0 أو 1). ده اللي في CI. أول تشغيل في الـ lab وقع، لأن اختبار [[app.spec.ts]] اللي [[ng new]] بيعمله بيدوّر على [[<h1>]] فيه «Hello, shop»، واحنا غيّرنا الصفحة:

~~~text الناتج (exit=1)
 ❯  shop  src/app/app.spec.ts (2 tests | 1 failed) 69ms
   ❯ App (2)
     × should render title 15ms

 FAIL   shop  src/app/app.spec.ts > App > should render title
AssertionError: the given combination of arguments (undefined and string) is invalid for this assertion. ...
 ❯ src/app/app.spec.ts:22:55
     22|     expect(compiled.querySelector('h1')?.textContent).toContain('Hello…

 Test Files  1 failed | 2 passed (3)
      Tests  1 failed | 4 passed (5)
~~~

اقراها: [[querySelector('h1')]] رجّع [[null]]، فـ [[?.textContent]] بقت [[undefined]]، و [[toContain]] مينفعش على [[undefined]]. و [[22:55]] = السطر 22 والعمود 55. وفي الآخر: كام ملف وكام اختبار عدّى ووقع.

### [[ng test --include src/app/cart]]

[[--include]] بياخد glob أو فولدر أو ملف. الفولدر = كل الـ specs اللي جواه:

~~~text الناتج
 Test Files  1 passed (1)
      Tests  1 passed (1)
~~~

### [[ng test --filter ProductsStore]]

[[--filter]] regex بيتطابق مع **أسامي** الاختبارات ([[describe]] + [[it]])، مش الملفات. الملفات التانية بتتعد skipped:

~~~text الناتج
 Test Files  1 passed | 2 skipped (3)
      Tests  2 passed | 3 skipped (5)
~~~

### [[npm i -D @vitest/coverage-v8 && ng test --watch=false --coverage]]

- [[npm i -D]]: سطّب كـ devDependency (للتطوير بس).
- [[&&]]: شغّل التاني بس لو الأول نجح.
- [[--coverage]]: احسب كام في المية من الكود اتنفّذ أثناء الاختبارات. v8 هو محرك JavaScript نفسه بيعدّ.

من غير الباكدج:

~~~text الناتج (exit=1)
The following packages are required but were not found:
  - Code coverage requires either "@vitest/coverage-v8" or "@vitest/coverage-istanbul" to be installed.
~~~

وبعد التسطيب:

~~~text الناتج (مختصر)
 % Coverage report from v8
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
  products-api.ts  |   42.85 |       50 |       0 |      25 | 6-8
Statements   : 90% ( 36/40 )
Branches     : 84.61% ( 22/26 )
Functions    : 77.77% ( 7/9 )
Lines        : 86.95% ( 20/23 )
~~~

| العمود | معناه |
|---|---|
| Stmts | الجمل اللي اتنفّذت |
| Branch | كل فرع في [[if]] و [[??]] و [[? :]] اتجرّب؟ |
| Funcs | الدوال اللي اتنادت ولو مرة |
| Uncovered Line #s | السطور اللي محدش وصلها |

[[products-api.ts]] 0٪ دوال لأننا بدّلناه بنسخة وهمية، فالحقيقي متنداش. ده الدرس الجاي (HttpTestingController).

---

## ٢. الاختبار سطر سطر

~~~text products-store.spec.ts
it('بيحمّل من API وهمي', async () => {
~~~

[[it(name, fn)]]: اختبار واحد. الاسم بيظهر في التقرير، و [[async]] عشان هنعمل [[await]] جواه. و [[describe]] و [[it]] و [[expect]] و [[vi]] globals من غير import، لأن [[tsconfig.spec.json]] فيه [[vitest/globals]] تحت [[types]].

~~~text
  const list = vi.fn(() => of([{ id: 1, name: 'قلم', price: 10 }]));
~~~

- [[vi.fn(impl)]]: دالة وهمية (mock). بتنفّذ الـ impl اللي اديتهولها، **وبتسجّل** كل نداء (كام مرة وبإيه).
- [[of(x)]]: من rxjs، Observable بيطلّع [[x]] مرة ويخلص. يعني بيمثّل رد HTTP جه.

~~~text
  TestBed.configureTestingModule({ providers: [{ provide: ProductsApi, useValue: { list } }] });
~~~

[[TestBed]] بيعمل injector مخصوص للاختبار. والـ provider ده معناه: «أي حد يطلب [[ProductsApi]]، اديله الـ object ده بدل الحقيقي». و [[{ list }]] اختصار [[{ list: list }]]. الـ store مش هيعرف الفرق لأنه بيعمل [[inject(ProductsApi)]] ويستخدم [[list()]] بس.

~~~text
  const store = TestBed.inject(ProductsStore);
  await store.load();
~~~

هات الـ store الحقيقي (هو اللي بنختبره)، وشغّل [[load()]] واستنى تخلص.

~~~text
  expect(list).toHaveBeenCalledTimes(1);
  expect(store.items()).toHaveLength(1);
  expect(store.loading()).toBe(false);
});
~~~

- [[toHaveBeenCalledTimes(1)]]: الـ API اتنادى مرة واحدة بالظبط (مش صفر ولا مرتين).
- [[toHaveLength(1)]]: الـ array فيها عنصر واحد.
- [[toBe(false)]]: مقارنة بـ [[===]].

~~~text الناتج
 Test Files  1 passed | 2 skipped (3)
      Tests  2 passed | 3 skipped (5)
~~~

(ده مع [[--filter ProductsStore]]، والاختبارين هما ده واختبار الخطأ اللي في الحل.)

---

## ٣. الترتيب: configure قبل inject

[[TestBed]] بيتعمل reset قبل كل [[it]]، بس جوه الـ [[it]] الواحد أول [[inject]] بيقفل الإعدادات. جرّبنا العكس:

~~~text الناتج
 FAIL   shop  src/app/oops.spec.ts > الترتيب الغلط
Error: Cannot configure the test module when the test module has already been instantiated. Make sure you are not using $__btinject$__bt before $__btTestBed.configureTestingModule$__bt.
~~~

---

## ٤. اختبار الخطأ (في الحل)

الفرق الوحيد: [[vi.fn(() => throwError(() => new Error('500')))]]. [[throwError(factory)]] Observable بيطلّع خطأ على طول، فـ [[firstValueFrom]] بيرمي، و [[catch]] في الـ store بيحط الرسالة. والاختبار بيتأكد من [[error()]] و [[items()]] فاضية ([[toEqual([])]] مقارنة بالمحتوى، لأن [[toBe]] كان هيقارن الـ reference) و [[loading()]] رجعت [[false]]. عدّى في الـ lab مع اختبار [[Cart]].

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[ng test]] | Vitest في watch mode |
| [[--watch=false]] | مرة واحدة، للـ CI |
| [[--include <path>]] | ملفات أو فولدر معين |
| [[--filter <regex>]] | اختبارات أساميها بتطابق |
| [[--coverage]] | نسبة التغطية، محتاج [[@vitest/coverage-v8]] |

- [[vi.fn]] = دالة وهمية بتسجّل النداءات.
- [[{ provide: X, useValue: fake }]] = بدّل dependency من غير ما تلمس الكود.
- [[configureTestingModule]] الأول، بعدين [[TestBed.inject]].
- من Jasmine: [[jasmine.createSpy]] ← [[vi.fn]]، و [[and.returnValue]] ← [[mockReturnValue]].`,
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
          teach: R`## الفكرة: نعمل الـ component ونتعامل معاه زي المستخدم

الاختبار بيعمل [[ProductCard]] لوحده، يبعتله منتج كـ input، يستنى الشاشة، يقرا النص اللي ظاهر، ويدوس الزرار ويشوف الـ output طلع بإيه. اتجرّب بـ [[ng test --watch=false]] (Vitest 5.0.3 و jsdom) في مشروع Angular 22.2.1 على ويندوز.

الـ component اللي بنختبره:

~~~text product-card.ts
@Component({
  selector: 'app-product-card',
  template: $__bt<h3>{{ product().name }}</h3><p>{{ priceLabel() }}</p><button (click)="added.emit(product().id)">ضيف</button>$__bt,
})
export class ProductCard {
  product = input.required<Item>();
  currency = input('EGP');
  added = output<number>();
  priceLabel = computed(() => $__bt$__{this.product().price} $__{this.currency()}$__bt);
}
~~~

[[input.required<Item>()]] input لازم الأب يبعته، و [[input('EGP')]] اختياري وقيمته الافتراضية EGP، و [[output<number>()]] حدث بيطلع رقم.

---

## ١. [[describe]] و [[it]]

~~~text
describe('ProductCard', () => {
  it('بيعرض الاسم وبيبعت الـ id لما تدوس', async () => {
~~~

[[describe]] بيجمّع اختبارات تحت اسم واحد، و [[it]] اختبار واحد. [[async]] لأننا هنستنى الشاشة بـ [[await]].

## ٢. [[TestBed.createComponent(ProductCard)]]

~~~text
    const fixture = TestBed.createComponent(ProductCard);
~~~

بيعمل الـ component جوه DOM وهمي ويرجّع [[fixture]] (يعني «التركيبة» اللي ماسكة الـ component):

| من الـ fixture | هو إيه |
|---|---|
| [[fixture.componentInstance]] | object الكلاس نفسه ([[added]] و [[product]]...) |
| [[fixture.nativeElement]] | عنصر الـ DOM بتاعه ([[<app-product-card>]]) |
| [[fixture.componentRef]] | handle بيعمل حاجات زي [[setInput]] |
| [[fixture.whenStable()]] | Promise بتخلص لما Angular يخلص تحديث الشاشة |

## ٣. [[setInput]]

~~~text
    fixture.componentRef.setInput('product', { id: 7, name: 'قلم', price: 10 });
~~~

بيبعت input بالاسم، بنفس الطريق اللي الأب بيستخدمه لما يكتب [[[product]="p"]]: بيحدّث الـ input signal ويعلّم الـ component dirty.

ليه مش [[componentInstance.product = ...]]؟ لأن [[product]] هنا signal مش قيمة. جرّبناها:

~~~text الناتج (ng test)
X [ERROR] TS2353: Object literal may only specify known properties, and 'id' does not exist in type 'InputSignal<Item>'.
~~~

الـ build نفسه وقع. ولو غشّيت TypeScript بـ [[as any]] الاختبار بيقع بـ [[TypeError: ctx.product is not a function]]، لأن الـ template بينادي [[product()]] وانت حطيت object مكان الدالة.

## ٤. [[await fixture.whenStable()]]

~~~text
    await fixture.whenStable();
~~~

استنى لحد ما مفيش change detection متجدول ولا شغل pending. جرّبنا نقرا الـ DOM **قبلها**:

~~~text الناتج (اختبار قبل whenStable)
Expected: "?"
Received: "<h3></h3><p></p><button>ضيف</button>"
~~~

الـ [[<h3>]] و [[<p>]] فاضيين: الـ component اتعمل بس الـ bindings لسه متحسبتش. عشان كده [[whenStable]] قبل أي قراية. (في الكود القديم هتلاقي [[fixture.detectChanges()]]، وده بيفحص فورًا بشكل synchronous.)

## ٥. نقرا الـ DOM

~~~text
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('h3')?.textContent).toContain('قلم');
    expect(el.querySelector('p')?.textContent).toBe('10 EGP');
~~~

- [[: HTMLElement]]: بنقول لـ TypeScript نوعه، فيكمّل لنا [[querySelector]].
- [[querySelector('h3')]]: أول [[<h3>]]، أو [[null]].
- [[?.]]: optional chaining، لو اللي قبلها [[null]] رجّع [[undefined]] بدل ما يرمي خطأ.
- [[toContain]]: النص فيه الكلمة. و [[toBe('10 EGP')]]: النص بالظبط، وده بيأكد إن الـ [[computed]] اشتغل بالعملة الافتراضية.

## ٦. الـ output والضغطة

~~~text
    let emitted: number | undefined;
    fixture.componentInstance.added.subscribe((id) => (emitted = id));
    el.querySelector('button')!.click();
    expect(emitted).toBe(7);
~~~

- [[number | undefined]]: النوع رقم أو لسه مفيش.
- [[added.subscribe(fn)]]: الـ output بيقبل subscribe زي Observable. كل مرة يطلع قيمة، بنحطها في [[emitted]].
- [[!]] بعد [[querySelector('button')]]: non-null assertion، «أنا متأكد إنه مش null».
- [[.click()]]: ضغطة حقيقية على العنصر، فـ [[(click)]] في الـ template بيشتغل و [[added.emit(7)]].

~~~text الناتج (ng test --watch=false --filter "بيبعت الـ id")
 Test Files  1 passed (1)
      Tests  1 passed | 4 skipped (5)
~~~

---

## ٧. اللي في التجربة

### [[setInput('currency', 'USD')]]

نفس الاختبار مع منتج 45 و [[setInput('currency', 'USD')]]، والنص بقى [[45 USD]]. عدّى.

### [[Header]] بـ Cart وهمية

~~~text header.spec.ts
TestBed.configureTestingModule({ providers: [{ provide: Cart, useValue: { count: signal(5), total: signal(99) } }] });
const fixture = TestBed.createComponent(Header);
await fixture.whenStable();
expect(fixture.nativeElement.textContent).toContain('السلة (5) - 99 جنيه');
~~~

الـ [[Header]] بيعمل [[inject(Cart)]] ويقرا [[count()]] و [[total()]]. بدّلنا الـ Cart بـ object فيه signals ثابتة، فالـ Header عرض الأرقام اللي احنا اخترناها. عدّى.

### component فيه [[routerLink]] من غير راوتر

~~~text الناتج
 FAIL   shop  src/app/products/product-card.spec.ts > Flow > من غير provideRouter
ɵNotFound: NG0201: No provider found for $__btActivatedRoute$__bt. Source: DynamicTestModule. Find more at https://v22.angular.dev/errors/NG0201
 ❯ NullInjector.get ...
 ❯ NodeInjectorFactory.RouterLink_Factory [as factory] ng:/RouterLink/ɵfac.js:5:92
~~~

اقرا الـ stack من تحت لفوق: [[RouterLink]] اتعمل، وطلب [[ActivatedRoute]]، ووصل الطلب لـ [[NullInjector]] (آخر injector، اللي معناه «مفيش حد سجّله»). و [[DynamicTestModule]] هو الـ module اللي TestBed بيعمله. الحل في الـ sol: [[provideRouter([])]]، وبعدها الـ [[<a>]] طلع فيه [[href="/products/1"]].

~~~text الناتج (الملف كله)
 Test Files  1 failed (1)
      Tests  1 failed | 5 passed (6)
~~~

---

## الخلاصة

| الخطوة | الكود |
|---|---|
| اعمل الـ component | [[TestBed.createComponent(X)]] |
| ابعت input | [[fixture.componentRef.setInput('name', value)]] |
| استنى الشاشة | [[await fixture.whenStable()]] |
| اقرا اللي ظاهر | [[fixture.nativeElement.querySelector(...)]] |
| اسمع output | [[componentInstance.out.subscribe(...)]] |
| دوس | [[element.click()]] |
| بدّل service | [[{ provide, useValue }]] في [[providers]] |
| فيه routerLink | [[provideRouter([])]] |`,
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
            mistakes: R`تعكس الترتيب ([[provideHttpClientTesting()]] قبل [[provideHttpClient()]]): الـ backend الحقيقي بيكسب، و [[expectOne]] يقول found none. و [[expectOne('/api/products')]] والطلب فيه query: [[Expected one matching request for criteria "Match URL: /api/products", found none. Requests received are: GET /api/products?q=.]] وتعمل [[expectOne]] قبل ما حد يعمل subscribe. وتنسى [[verify()]] فطلبات زيادة تعدّي من غير ما تحس.`
          },
          teach: R`## الفكرة: الـ service بتبعت طلب حقيقي، بس لـ backend وهمي احنا ماسكينه

[[HttpClient]] مش بيكلّم النت بنفسه. بيسلّم الطلب لحاجة اسمها [[HttpBackend]] (في المتصفح fetch أو XHR). [[provideHttpClientTesting()]] بيحط مكانه backend وهمي بيحفظ الطلبات في قايمة ومبيردش، و [[HttpTestingController]] هو اللي بيخليك تدوّر في القايمة دي وترد بإيدك. اتجرّب بـ [[ng test --watch=false]] (Vitest 5.0.3) على Angular 22.2.1 في ويندوز.

الـ service اللي بنختبرها:

~~~text products-api.ts
export class ProductsApi {
  private http = inject(HttpClient);
  list(q = '') { return this.http.get<Item[]>('/api/products', { params: { q } }); }
  getOne(id: string) { return this.http.get<Item>($__bt/api/products/$__{id}$__bt); }
}
~~~

[[{ params: { q } }]] بيضيف [[?q=...]] للـ URL. و [[q = '']] قيمة افتراضية لو محدش بعت.

---

## ١. التجهيز قبل كل اختبار

~~~text products-api.spec.ts
describe('ProductsApi', () => {
  let api: ProductsApi;
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    api = TestBed.inject(ProductsApi);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => http.verify());
~~~

- [[let api: ProductsApi;]]: متغير برّه الاختبارات عشان كلهم يشوفوه، وبيتملى في [[beforeEach]].
- [[beforeEach(fn)]]: شغّل ده قبل **كل** [[it]]، فكل اختبار ياخد TestBed نضيف.
- [[provideHttpClient()]]: سجّل HttpClient ومعاه الـ backend الحقيقي.
- [[provideHttpClientTesting()]]: بدّل الـ backend بالوهمي. لازم **بعده**: آخر provider لنفس الحاجة هو اللي بيكسب.
- [[afterEach(() => http.verify())]]: بعد كل اختبار، اتأكد إن مفيش طلب اتبعت ومحدش رد عليه.

جرّبنا نعكس الترتيب ([[provideHttpClientTesting(), provideHttpClient()]]):

~~~text الناتج
Error: Expected one matching request for criteria "Match by function: ", found none.
~~~

الطلب راح للـ backend الحقيقي، فالوهمي ملقاش حاجة.

---

## ٢. اختبار الطلب الصح

~~~text
  it('بيبعت GET بالـ q الصح', async () => {
    const promise = firstValueFrom(api.list('قلم'));
~~~

[[api.list()]] بيرجّع Observable، والطلب **مش بيتبعت** غير لما حد يعمل subscribe. [[firstValueFrom]] بيعمل subscribe (فالطلب يروح للـ backend الوهمي ويستنى)، ويرجّع Promise هتتحل بأول قيمة. ومفيش [[await]] هنا، لأن الرد لسه مجاش.

~~~text
    const req = http.expectOne((r) => r.url === '/api/products');
~~~

[[expectOne(criteria)]]: «لازم يكون فيه طلب واحد بالظبط بيطابق». لو صفر أو أكتر من واحد، الاختبار يقع. ويرجّع [[TestRequest]] نمسك بيه الطلب.

الـ criteria هنا دالة: [[r.url]] هو الـ URL **من غير** الـ params. ليه مش string؟ لأن الـ string بيتقارن بالـ URL كامل بالـ query. جرّبناها:

~~~text الناتج (expectOne('/api/products') مع list('قلم'))
Error: Expected one matching request for criteria "Match URL: /api/products", found none. Requests received are: GET /api/products?q=%D9%82%D9%84%D9%85.
~~~

[[%D9%82%D9%84%D9%85]] هي كلمة «قلم» بعد URL encoding: كل حرف عربي بيتكتب bytes الـ UTF-8 بتاعته بـ [[%]].

~~~text
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('q')).toBe('قلم');
~~~

[[req.request]] هو الـ [[HttpRequest]] اللي اتبعت: [[method]] و [[url]] و [[params]] و [[headers]] و [[body]]. و [[params.get('q')]] بيرجّع القيمة قبل الـ encoding.

~~~text
    req.flush([{ id: 1, name: 'قلم', price: 10 }]);
    expect(await promise).toEqual([{ id: 1, name: 'قلم', price: 10 }]);
  });
~~~

[[flush(body)]]: رد على الطلب بالـ body ده وبـ status 200. الـ Observable يطلّع القيمة، والـ Promise تتحل، و [[toEqual]] يقارن المحتوى.

---

## ٣. اختبار الخطأ

~~~text
  it('بيطلّع error لما السيرفر يرد 500', async () => {
    const promise = firstValueFrom(api.getOne('9'));
    http.expectOne('/api/products/9').flush('boom', { status: 500, statusText: 'Server Error' });
    await expect(promise).rejects.toMatchObject({ status: 500 });
  });
~~~

- [[expectOne('/api/products/9')]]: هنا string ينفع لأن مفيش query.
- [[flush('boom', { status: 500, statusText: 'Server Error' })]]: رد بـ body نصي و status 500. أي status مش 2xx بيخلي HttpClient يطلّع [[HttpErrorResponse]] كخطأ.
- [[expect(promise).rejects]]: استنى الـ Promise وتوقع إنها **اترفضت**. و [[toMatchObject({ status: 500 })]]: الخطأ object فيه [[status]] بـ 500 على الأقل (باقي الخانات مش مهمة).
- [[await]] قبل [[expect]] مهم: من غيره الاختبار يخلص قبل ما الـ Promise تتحل.

~~~text الناتج (الملف كله)
 Test Files  1 passed (1)
      Tests  3 passed (3)
~~~

(التالت هو اختبار الـ interceptor اللي في الحل.)

### انقطاع النت: [[req.error(...)]]

~~~text
expectOne('/api/products/1').error(new ProgressEvent('error'))
~~~

~~~text الناتج (status و message بتوع الخطأ)
0 | Http failure response for /api/products/1: 0
~~~

status 0 معناها الطلب موصلش لسيرفر أصلًا.

---

## ٤. [[verify()]] لما تنسى ترد

شلنا الـ [[flush]] من اختبار [[list()]] من غير q:

~~~text الناتج
Error: Expected no open requests, found 1: GET /api/products?q=
~~~

الطلب فاضل مفتوح، و [[verify()]] بيمسكه ويقولك هو إيه بالظبط.

---

## ٥. اختبار الـ interceptor (التجربة)

الـ [[authInterceptor]] في الـ lab بيقرا [[Auth.token()]] ويضيف [[Authorization: Bearer ...]]، وبيعمل [[inject(Router)]] عشان يودّي لـ [[/login]] لو الرد 401، عشان كده الاختبار محتاج [[provideRouter([])]]. والاختبار بيسجّله بـ [[provideHttpClient(withInterceptors([authInterceptor]))]]، وبيتأكد من [[req.request.headers.get('Authorization')]]. عدّى. الـ interceptors بتشتغل عادي في الاختبار لأنها قبل الـ backend في السلسلة.

---

## الخلاصة

| الأداة | بتعمل إيه |
|---|---|
| [[provideHttpClientTesting()]] | backend وهمي، بعد [[provideHttpClient()]] |
| [[expectOne(url أو fn)]] | طلب واحد بالظبط بيطابق؛ الـ string بيقارن الـ query كمان |
| [[req.request]] | الـ method والـ params والـ headers والـ body |
| [[req.flush(body, { status })]] | رد نجاح أو خطأ |
| [[req.error(new ProgressEvent('error'))]] | النت قطع، status 0 |
| [[verify()]] | مفيش طلبات من غير رد |

- الطلب مش بيتبعت من غير subscribe ([[firstValueFrom]] بيعمله).
- في الكود القديم: [[HttpClientTestingModule]] في [[imports]] بدل [[provideHttpClientTesting()]].`,
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
          teach: R`## الفكرة: ملفين بنفس الشكل، والـ build يختار واحد

الكود دايمًا بيعمل import من [[environment.ts]]. وقت الـ build، لو الإعداد development، Angular بيحط [[environment.development.ts]] مكانه. فنفس السطر في الـ service بيطلع [[localhost]] وانت بتطوّر، والدومين الحقيقي في الإنتاج. اتجرّب على ويندوز في مشروع [[ng new shop --ssr]] (Angular CLI 22.2.2، Node 24).

---

## ١. [[ng g environments]]

[[g]] اختصار [[generate]]، و [[environments]] اسم الـ schematic:

~~~text الناتج
CREATE src/environments/environment.ts (31 bytes)
CREATE src/environments/environment.development.ts (31 bytes)
UPDATE angular.json (2438 bytes)
~~~

الملفين بيتعملوا فاضيين:

~~~text environment.ts و environment.development.ts
export const environment = {};
~~~

والتعديل في [[angular.json]] تحت [[build.configurations.development]]:

~~~text angular.json
"fileReplacements": [
  {
    "replace": "src/environments/environment.ts",
    "with": "src/environments/environment.development.ts"
  }
]
~~~

يعني: «في الـ build بتاع development، اقرا الملف التاني مكان الأول». مفيش [[fileReplacements]] في production، فالإنتاج بياخد [[environment.ts]] زي ما هو.

---

## ٢. الملفين

~~~text src/environments/environment.ts
export const environment = { production: true, apiUrl: 'https://api.shop.eg' };
~~~

~~~text src/environments/environment.development.ts
export const environment = { production: false, apiUrl: 'http://localhost:3000' };
~~~

- [[export const environment]]: نفس الاسم في الاتنين، عشان أي import يشتغل مع أي واحد.
- [[production]] و [[apiUrl]]: انت اللي بتختار الخانات. لازم نفس الخانات في الملفين، وإلا TypeScript هيشتكي في build منهم.

## ٣. الاستخدام

~~~text home.ts (في الـ lab)
import { environment } from '../../environments/environment';
...
base = $__bt$__{environment.apiUrl}/products$__bt;
~~~

- الـ import دايمًا من [[environment]] (من غير [[.development]]).
- [[$__bt...$__{x}...$__bt]]: template literal، نص بيتحط جواه قيمة. فالنتيجة [[https://api.shop.eg/products]] أو [[http://localhost:3000/products]].

ومش لازم service: في الـ lab طبعناها في الصفحة الرئيسية كـ [[API: {{ base }}]] عشان نشوفها.

---

## ٤. الـ builds

### [[ng serve]] (development)

~~~text الناتج (Chrome، http://localhost:5970/)
API: http://localhost:3000/products
~~~

> مطب حصل في الـ lab: أول مرة طلعت [[https://api.shop.eg]] في [[ng serve]]، لأن السيرفر كان شغال من قبل [[ng g environments]]. التعديلات على [[angular.json]] مش بتتقري وهو شغال؛ لازم تقفله وتشغّله تاني.

### [[ng build]] (production)

~~~text الناتج
Initial chunk files  | Names            |  Raw size | Estimated transfer size
main-HNMGDDAD.js     | main             | 257.55 kB |                ...
~~~

دوّرنا جوه الـ JS بـ [[grep]]:

~~~bash
grep -o "api.shop.eg" dist/shop/browser/main-*.js
grep -c "localhost:3000" dist/shop/browser/main-*.js
~~~

~~~text الناتج
api.shop.eg
0
~~~

- [[grep -o]]: اطبع الجزء اللي طابق بس. [[grep -c]]: عدّ السطور اللي طابقت.
- [[main-*.js]]: الـ [[*]] بيطابق الـ hash اللي في الاسم.

القيمة جوه الـ JS كنص عادي، وملف التطوير مدخلش أصلًا (0). ده معناه إن أي حد يفتح DevTools يقرا أي حاجة في environment: **متحطش أسرار**.

### [[ng build --configuration development]]

~~~text الناتج
main.js              | main             |   1.53 MB |
styles.css           | styles           |  95 bytes |
                     | Initial total    |   1.53 MB
~~~

- [[--configuration development]] (أو [[-c development]]): استخدم الإعدادات دي بدل production.
- من غير minify: ١.٥٣ ميجا بدل ٢٥٧ كيلو.
- أسامي من غير hash ([[main.js]])، ومعاها [[main.js.map]] (source map: بيربط الكود المتجمّع بملفاتك الأصلية عشان الـ debugger).
- و [[grep -c "localhost:3000"]] هنا طلع 1.

### [[ng build --base-href /portal/]]

~~~text الناتج
index.html: <base href="/portal/">
index.csr.html: <base href="/portal/">
~~~

[[<base href>]] هو المسار اللي المتصفح بيحل عليه أي رابط نسبي ([[main-*.js]] و [[favicon.ico]])، والراوتر بيعتبره بداية التطبيق. فلو التطبيق متحط تحت [[example.com/portal/]]، الملفات بتتطلب من [[/portal/main-...js]] مش من الجذر.

> مطب ويندوز: في Git Bash، [[/portal/]] اتحوّلت لوحدها لـ [[C:/Program Files/Git/portal]] (Git Bash بيحوّل أي argument شكله مسار لينكس)، والـ prerender وقع بـ [[Request for: http://localhost:60095/Program%20Files/Git/portal was aborted]]. شغّله من PowerShell أو CMD، أو في Git Bash اكتب [[MSYS_NO_PATHCONV=1]] قبل الأمر.

---

## ٥. [[ls dist/shop/browser]]

~~~text الناتج (PowerShell، بعد ng build)
p
favicon.ico         15086
hero.jpg            5036
index.csr.html      449
index.html          1056
main-HNMGDDAD.js    257555
styles-5INURTSO.css 0
~~~

- [[favicon.ico]] و [[hero.jpg]] و [[p/]]: اتنسخوا من [[public/]] زي ما هم.
- [[main-HNMGDDAD.js]]: كل الـ JS (Angular 22 zoneless، فمفيش [[polyfills-*.js]]).
- [[styles-5INURTSO.css]]: صفر لأن [[styles.css]] فاضي.
- [[index.csr.html]]: موجود عشان المشروع ده SSR. في مشروع من غير SSR هتلاقي [[index.html]] بس.

---

## الخلاصة

| الأمر | الـ configuration | ملف الـ environment | الحجم |
|---|---|---|---|
| [[ng serve]] | development | [[environment.development.ts]] | من غير minify |
| [[ng build]] | production | [[environment.ts]] | minify و hash (257 kB) |
| [[ng build -c development]] | development | [[environment.development.ts]] | 1.53 MB + source maps |

- import دايمًا من [[environment]]، والـ build هو اللي يبدّل.
- القيم بتتكتب جوه الـ JS: مفيش أسرار.
- [[--base-href]] لو التطبيق مش على جذر الدومين.
- غيّرت [[angular.json]]؟ أعد تشغيل [[ng serve]].`,
          lines: [
            R`بيعمل الفولدر والملفين ويضيف [[fileReplacements]] في angular.json.`,
            "الإنتاج (الافتراضي).",
            "التطوير.",
            "الـ service بتقرا من environment، والـ build يختار الملف.",
            "production: minify و hash و budgets.",
            "من غير minify ومع source maps، وبملف التطوير.",
            R`لو التطبيق هيتحط تحت [[/portal/]].`,
            R`[[index.html]] و [[main-*.js]] و [[styles-*.css]] و [[favicon.ico]] وأي حاجة في [[public/]] (مفيش polyfills من غير zone.js).`
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
            mistakes: R`تنسى [[try_files ... /index.html]] فالـ refresh يطلع 404. وتكيّش [[index.html]] سنة فالمستخدمين مش بيشوفوا الـ release الجديد. وتنسخ [[dist/shop]] بدل [[dist/shop/browser]] فالموقع يطلع صفحة «Welcome to nginx!» الافتراضية (الـ index.html بتاع الـ image لسه مكانه، وتطبيقك بقى في فولدر [[browser/]] جواه). وتبني بـ Node 20 في الـ Dockerfile فالـ CLI يرفض.`
          },
          teach: R`## الفكرة: مرحلة تبني، ومرحلة تقدّم الملفات

الـ Dockerfile فيه مرحلتين: الأولى فيها Node بتسطّب الباكدجات وتعمل [[ng build]]، والتانية nginx بس، بتاخد الناتج من الأولى. وملف [[nginx.conf]] فيه سطرين مهمين: «أي مسار مش ملف رجّع [[index.html]]»، و «الملفات اللي أساميها فيها hash اتكيّشت سنة».

اتجرّب كده على ويندوز (Docker 29): مشروع Angular 22 من غير SSR اسمه [[shop]]. أوامر المرحلة الأولى ([[npm ci]] و [[npx ng build]]) اتشغّلت في container [[node:22-alpine]] (Node 22.23.3، ونسخة مسموحة لـ Angular 22)، والمرحلة التانية اتبنت فعلًا بـ [[docker build]] من [[nginx:alpine]] واتجرّبت بـ curl و Chrome headless. الـ multi-stage كامل بـ [[node:24-alpine]] متبناش هنا بـ [[docker build]] عشان ميسيبش build cache على الجهاز.

---

## ١. المرحلة الأولى: البناء

~~~text Dockerfile
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx ng build
~~~

- [[FROM node:24-alpine AS build]]: ابدأ من image فيها Node 24 على Alpine (توزيعة لينكس صغيرة جدًا). [[AS build]] اسم للمرحلة دي عشان نرجعلها بعدين.
- [[WORKDIR /app]]: اعمل الفولدر وادخله، وكل اللي بعده بيتنفّذ فيه.
- [[COPY package*.json ./]]: انسخ [[package.json]] و [[package-lock.json]] بس ([[*]] أي حاجة). ليه لوحدهم الأول؟ Docker بيعمل cache لكل خطوة، ولو الملفين متغيروش، خطوة [[npm ci]] اللي بعدها بتتاخد من الكاش بدل ما تنزّل كل حاجة تاني مع كل تعديل في الكود.
- [[RUN npm ci]]: [[ci]] = clean install: بيمسح أي [[node_modules]] ويسطّب **بالظبط** النسخ اللي في [[package-lock.json]]، وبيقع لو الـ lock مش متوافق مع [[package.json]]. مناسب للـ CI والـ Docker لأن كل build بيطلع نفس الحاجة.
- [[COPY . .]]: باقي الكود. و [[.dockerignore]] (فيه [[node_modules]] و [[dist]] و [[.angular]]) بيمنع نسخ الحاجات التقيلة دي من جهازك.
- [[RUN npx ng build]]: build للإنتاج. [[npx]] بيشغّل الـ [[ng]] اللي في [[node_modules]] المشروع.

ناتج الـ build جوه الـ container:

~~~text الناتج (node:22-alpine)
main-YPSMQIZX.js    | main          | 221.19 kB |                60.49 kB
styles-5INURTSO.css | styles        |   0 bytes |                 0 bytes
                    | Initial total | 221.19 kB |                60.49 kB
Application bundle generation complete. [6.201 seconds]
Output location: /app/dist/shop
~~~

(نفس الكود على ويندوز طلع [[main-Z65EQ5PH.js]]؛ الحجم واحد بس الـ hash اختلف بين البيئتين، فمتعتمدش إن اسم الملف هيبقى ثابت بين الأجهزة.)

## ٢. المرحلة التانية: التشغيل

~~~text Dockerfile
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/shop/browser /usr/share/nginx/html
~~~

- [[FROM nginx:alpine]]: image جديدة خالص. كل اللي في المرحلة الأولى (Node و node_modules والكود) مش هيبقى فيها.
- [[COPY nginx.conf /etc/nginx/conf.d/default.conf]]: إعداداتنا مكان الإعداد الافتراضي.
- [[COPY --from=build ...]]: انسخ من المرحلة اللي اسمها [[build]]، مش من جهازك. والمصدر [[dist/shop/browser]] بالظبط.
- [[/usr/share/nginx/html]]: الفولدر اللي nginx بيقدّم منه.

### لو نسخت [[dist/shop]] بدل [[dist/shop/browser]]

جرّبناها:

~~~text الناتج (curl http://localhost:8089/)
<title>Welcome to nginx!</title>
...
<h1>Welcome to nginx!</h1>
~~~

~~~text ls /usr/share/nginx/html
3rdpartylicenses.txt
50x.html
browser
index.html
~~~

الـ [[index.html]] ده بتاع nginx نفسه، وتطبيقك بقى في [[browser/]] جواه.

---

## ٣. [[nginx.conf]]

~~~text nginx.conf
server {
  listen 80;
  root /usr/share/nginx/html;
  location / { try_files $uri $uri/ /index.html; }
  location ~* \.(js|css|woff2|png|jpg|svg)$ { expires 1y; add_header Cache-Control "public, immutable"; }
}
~~~

- [[server { ... }]]: موقع واحد.
- [[listen 80]]: البورت جوه الـ container.
- [[root]]: الملفات بتتدوّر هنا.
- [[location / { ... }]]: القاعدة لأي مسار.

### [[try_files $uri $uri/ /index.html]]

[[$uri]] متغير nginx فيه المسار المطلوب ([[/products/5]] مثلًا). الترتيب:

1. فيه ملف اسمه كده؟ قدّمه.
2. [[$uri/]]: فيه فولدر اسمه كده؟
3. مفيش؟ قدّم [[/index.html]]، والراوتر بتاع Angular في المتصفح يقرا الـ URL ويعرض الصفحة الصح.

بنينا الـ image وشغّلناها على بورت 8089:

~~~bash
docker build -t shop .
docker run -p 8089:80 shop
~~~

[[-t]] اسم للـ image (في الـ lab سميناها [[teach-angular03-shop]] ومسحناها في الآخر)، و [[-p 8089:80]] بورت 8089 على جهازك يوصل لـ 80 جوه (التجربة بتقول 8080؛ أي بورت فاضي ينفع).

~~~text الناتج (curl)
/ -> 200 text/html
/products/5 -> 200 text/html
/img -> 200 text/html
/main-YPSMQIZX.js -> 200 application/javascript
/nope.js -> 404 text/html
/favicon.ico -> 200 image/x-icon
~~~

[[/products/5]] رجّع 200 و HTML (هو [[index.html]])، وفي Chrome headless الصفحة عرضت [[منتج رقم 5]]. و [[/nope.js]] 404 لأن القاعدة التانية (الملفات) مفيهاش [[try_files]]، وده صح: ملف JS مش موجود لازم يبقى 404 مش HTML.

### من غير [[try_files]]

خليناها [[location / { }]]:

~~~text الناتج (Chrome headless)
/            200 أهلا يا سارة
/products/5  404 404 Not Found nginx/1.31.6
~~~

الرئيسية شغالة لأن [[index.html]] ملف موجود فعلًا، لكن [[/products/5]] nginx دوّر على ملف أو فولدر بالاسم ده وملقاش.

### الكاش: [[location ~* \.(js|css|...)$]]

- [[~*]]: regex من غير ما يفرق بين capital و small.
- [[\.(js|css|woff2|png|jpg|svg)$]]: المسار بيخلص بنقطة وواحد من الامتدادات دي. [[\.]] نقطة حقيقية، و [[|]] «أو»، و [[$]] آخر المسار.
- [[expires 1y]]: الكاش سنة.
- [[add_header Cache-Control "public, immutable"]]: أي كاش يشيله، ومتسألش السيرفر تاني عليه خالص.

الـ headers الحقيقية:

~~~text الناتج (curl -I main-YPSMQIZX.js)
Expires: Thu, 07 Oct 2027 18:39:11 GMT
Cache-Control: max-age=31536000
Cache-Control: public, immutable
~~~

[[31536000]] = ثواني السنة (365 × 24 × 60 × 60). و [[expires]] هو اللي حط أول Cache-Control، والتاني من [[add_header]]. و [[index.html]] مفيهوش أي منهم (بس [[Last-Modified]])، فالمتصفح بيسأل عليه كل مرة ويشوف أسامي الملفات الجديدة بعد أي release.

---

## الخلاصة

| السطر | ليه |
|---|---|
| [[AS build]] + [[COPY --from=build]] | الـ image النهائية nginx والملفات بس |
| [[COPY package*.json]] قبل [[npm ci]] | كاش التسطيب بيفضل لحد ما الـ dependencies تتغير |
| [[npm ci]] | نفس النسخ اللي في الـ lock بالظبط |
| [[dist/shop/browser]] | مش [[dist/shop]]، وإلا «Welcome to nginx!» |
| [[try_files ... /index.html]] | الـ refresh واللينكات المباشرة متطلعش 404 |
| [[expires 1y]] للملفات بـ hash | أي تغيير = اسم جديد، فآمن |
| [[index.html]] من غير كاش طويل | عشان يشاور على الأسامي الجديدة |`,
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
    }
]);
