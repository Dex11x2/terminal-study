// تكملة تاب angular: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/angular/01.js (شرح حقول الدرس في أوله)
MORE("angular", [
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
    }
]);
