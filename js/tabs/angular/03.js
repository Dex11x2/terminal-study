// تكملة تاب angular: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/angular/01.js (شرح حقول الدرس في أوله)
MORE("angular", [
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
          teach: R`## الفكرة: علبة بتقراها كدالة، وقيمة محسوبة بتعرف بتعتمد على مين

المثال مش component: ملف TypeScript عادي، عشان تشوف إن الـ signals شغالة لوحدها. اتشغّل جوه مشروع Angular 22.2 بـ [[node scripts/signals.ts]] على Node 24.19 (Node 24 بيشيل الأنواع ويشغّل TS على طول).

---

## ١. [[signal(100)]]

~~~text signals.ts
import { signal, computed } from '@angular/core';
const price = signal(100);
const qty = signal(2);
~~~

[[signal(100)]] بترجّع signal قيمتها 100. والـ signal نفسها **دالة**:

| تعمل إيه | تكتب |
|---|---|
| تقرا | [[price()]] |
| تحط قيمة جديدة | [[price.set(80)]] |
| قيمة جديدة من القديمة | [[price.update(p => p * 0.9)]] |

اتأكدنا: [[typeof]] للـ signal طلع [[function]]، و [[String(signal)]] طلع [[[Signal: 5]]].

---

## ٢. [[computed(() => price() * qty())]]

~~~text signals.ts
const total = computed(() => price() * qty());
console.log(total()); // 200
~~~

[[computed]] بتاخد دالة. أول ما حد يقرا [[total()]]، بتشغّل الدالة، وأي signal اتقرت جواها ([[price]] و [[qty]]) بتتسجّل كـ **dependency**. انت مكتبتش القايمة دي في أي حتة: اتعرفت من القراية نفسها.

~~~text الناتج
200
~~~

---

## ٣. [[set]] وبعدين قراية

~~~text signals.ts
qty.set(3);
console.log(total()); // 300
~~~

[[qty]] اتغيرت، فـ [[total]] اتعلّمت إنها محتاجة تتحسب، واتحسبت لما قريناها: 100 × 3 = 300.

---

## ٤. [[update]]

~~~text signals.ts
price.update((p) => p * 0.9);
console.log(total()); // 270
~~~

[[update]] بتديك القيمة الحالية [[p]] (100) وبتاخد اللي ترجّعه (90). و 90 × 3 = 270.

~~~text الناتج
300
270
~~~

---

## ٥. signal لـ array

~~~text signals.ts
const items = signal<string[]>([]);
items.update((list) => [...list, 'قلم']);
console.log(items()); // [ 'قلم' ]
~~~

- [[<string[]>]]: النوع مكتوب بإيدك، لأن [[[]]] لوحدها TypeScript ميعرفش هي array من إيه.
- [[[...list, 'قلم']]]: الـ [[...]] اسمها spread: بتفرد عناصر [[list]] القديمة جوه array **جديدة**، وبعدها [['قلم']].

~~~text الناتج
[ 'قلم' ]
~~~

> ومع أول تشغيل Node بيطلّع تحذير [[MODULE_TYPELESS_PACKAGE_JSON]]: يعني [[package.json]] مفيهوش [["type": "module"]] فـ Node خمّن إن الملف ES module. تحذير بس، والناتج سليم.

---

## ٦. ليه الـ array لازم تبقى جديدة؟ (التجربة والـ solCode)

~~~text sol.ts
const items = signal<string[]>(['قلم']);
const n = computed(() => items().length);
console.log(n()); // 1
items().push('كشكول');
console.log(n(), items());
items.update((l) => [...l, 'قلم رصاص']);
console.log(n()); // 3
~~~

~~~text الناتج
1
1 [ 'قلم', 'كشكول' ]
3
~~~

السطر التاني هو المهم: الـ array فيها عنصرين فعلًا، بس [[n()]] لسه 1. السبب إن [[items().push]] عدّلت **نفس** الـ array من جوه، والـ signal محدش قالها حاجة، فـ [[n]] رجّعت النتيجة المتخزنة. ومع [[update]] بـ array جديدة، الـ signal قارنت الجديدة بالقديمة بـ [[Object.is]] ولقتهم مختلفين، فـ [[n]] اتحسبت: 3.

---

## ٧. [[computed]] كسولة ومتخزنة

جرّبنا عدّاد جوه الـ computed يعدّ كام مرة اتحسبت:

~~~text extra.ts
let runs = 0;
const a = signal(1);
const b = computed(() => { runs++; return a() * 2; });
~~~

~~~text الناتج
runs before read: 0
runs after 3 reads: 1
runs after set(same): 1
runs after set(5), no read: 1
10 runs: 2
~~~

| السطر | المعنى |
|---|---|
| [[before read: 0]] | lazy: محدش قراها، فمتحسبتش |
| [[after 3 reads: 1]] | memoized: ٣ قرايات وحساب واحد |
| [[set(same): 1]] | [[a.set(1)]] والقيمة 1 أصلًا، فمحدش اتبلّغ |
| [[set(5), no read: 1]] | اتغيرت بس محدش قرا، فلسه متحسبتش |
| [[10 runs: 2]] | أول قراية بعد التغيير: اتحسبت، 5 × 2 = 10 |

---

## الخلاصة

| الحاجة | الشكل |
|---|---|
| قيمة بتتغير | [[x = signal(0)]] وتقراها [[x()]] |
| تغيير | [[x.set(5)]] أو [[x.update(v => v + 1)]] |
| قيمة محسوبة | [[computed(() => a() * b())]]، للقراية بس |
| array أو object | دايمًا قيمة جديدة: [[[...list, x]]]، مش [[push]] |
| [[computed]] | بتتحسب لما حد يقراها وحاجة اتغيرت، والنتيجة بتتخزن |`,
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
          teach: R`## الفكرة: effect بتنفّذ كود برا Angular، و linkedSignal قيمة افتراضية تقدر تغيّرها

component فيه حاجتين مستقلين: theme بيتحفظ في المتصفح (ده شغل [[effect]])، واختيار شحن ليه default (ده شغل [[linkedSignal]]). اتشغّل في [[ng serve]] (Angular 22.2) واتفحص في Chrome، وضفنا زرارين الـ solCode للـ template، وسطر [[console.log]] جوه الـ effect عشان نشوف هي بتشتغل إمتى.

---

## ١. [[type Theme = 'light' | 'dark']]

نوع اسمه [[Theme]] قيمته يا [['light']] يا [['dark']] بس (الخط الرأسي معناه «أو»). أي قيمة تانية TypeScript يرفضها.

---

## ٢. الـ theme من localStorage

~~~text settings.ts
theme = signal<Theme>((localStorage.getItem('theme') as Theme) ?? 'light');
~~~

من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[localStorage.getItem('theme')]] | اقرا القيمة المحفوظة في المتصفح بالمفتاح ده. لو مفيش: [[null]] |
| [[as Theme]] | قول لـ TypeScript «اعتبرها Theme» (الـ getItem بترجّع [[string]] أو [[null]]) |
| [[?? 'light']] | لو اللي على الشمال [[null]] أو [[undefined]]، خد [['light']] |
| [[signal<Theme>(...)]] | signal بالقيمة دي |

---

## ٣. الـ [[effect]]

~~~text settings.ts
constructor() {
  effect(() => {
    localStorage.setItem('theme', this.theme());
    document.documentElement.dataset['theme'] = this.theme();
  });
}
~~~

- [[effect]] بتاخد دالة وبتشغّلها مرة في الأول، وتاني كل ما signal اتقرت جواها تتغير. هنا بتقرا [[this.theme()]]، فدي الـ dependency.
- [[localStorage.setItem]] بتحفظ القيمة في المتصفح، فتفضل بعد الـ refresh.
- [[document.documentElement]] هو عنصر [[<html>]]، و [[dataset['theme']]] بيحط عليه [[data-theme="..."]]، فالـ CSS يقدر يكتب [[[data-theme=dark] body {...}]].
- ليه في الـ constructor؟ لأن [[effect]] لازم تتعمل في **injection context** (constructor أو field initializer)، عشان Angular يربطها بعمر الـ component ويقفلها لما يتشال.

### الناتج بالضغطات

~~~text الناتج (Chrome)
effect ran with light
start        | btn: light | ls: light | html data-theme: light
effect ran with dark
click 1      | btn: dark  | ls: dark  | html data-theme: dark
effect ran with dark
after reload | btn: dark  | ls: dark  | html data-theme: dark
effect ran with light
click 2      | btn: light | ls: light | html data-theme: light
~~~

- الـ effect اشتغلت أول ما الـ component اتعمل، وبعد كل ضغطة.
- بعد الـ reload: الـ signal بدأت [[dark]] لأنها قرت من localStorage.

### الـ effect مش بتشتغل مع كل set

دوسنا الزرار ٣ مرات ورا بعض في نفس اللحظة (light ← dark ← light ← dark):

~~~text الناتج (Chrome)
effect ran with dark
after 3 clicks | btn: dark | ls: dark
~~~

الـ effect اشتغلت **مرة واحدة** بآخر قيمة. الـ effects بتتجدول وتشتغل بعدين، مش جوه الـ [[set]] نفسه.

### لو عملتها برا الـ constructor

حطينا [[effect(...)]] جوه [[toggle()]] ودوسنا:

~~~text الـ Console
ERROR RuntimeError: NG0203: effect() can only be used within an injection context such as a constructor, a factory function, a field initializer, or a function used with $__btrunInInjectionContext$__bt.
~~~

---

## ٤. [[toggle()]]

~~~text settings.ts
toggle() { this.theme.update((t) => (t === 'light' ? 'dark' : 'light')); }
~~~

[[a ? b : c]] اسمها ternary: لو الشرط صح خد [[b]]، وإلا [[c]]. يعني لو light بقت dark، والعكس.

---

## ٥. [[linkedSignal]]

~~~text settings.ts
options = signal(['شحن عادي', 'شحن سريع']);
shipping = linkedSignal(() => this.options()[0]);
~~~

[[linkedSignal]] بتحسب قيمتها من دالة زي [[computed]] (هنا أول عنصر في [[options]])، بس ينفع تعمل لها [[set]] زي [[signal]]. والزرارين من الـ solCode:

~~~text template
<button (click)="shipping.set('شحن سريع')">اختار السريع</button>
<button (click)="options.set(['استلام من الفرع'])">غيّر القايمة</button>
~~~

~~~text الناتج (Chrome)
start          | p: شحن عادي
shipping.set   | p: شحن سريع
options.set    | p: استلام من الفرع
~~~

| الخطوة | ليه |
|---|---|
| [[شحن عادي]] | الـ default: [[options()[0]]] |
| [[شحن سريع]] | [[set]] كتب فوق المحسوب (المستخدم اختار) |
| [[استلام من الفرع]] | [[options]] اتغيرت، فاتحسبت من جديد والاختيار القديم اتمسح |

### المقارنة

| | ينفع [[set]]؟ | بتتحسب تاني لما المصدر يتغير؟ |
|---|---|---|
| [[signal]] | أيوه | لأ، مالهاش مصدر |
| [[computed]] | لأ | أيوه |
| [[linkedSignal]] | أيوه | أيوه، وبتمسح الـ set |

---

## الخلاصة

| الأداة | استخدمها لـ |
|---|---|
| [[effect(() => ...)]] | تبعت قيمة لبرا Angular: localStorage، و DOM خارجي، و log. في الـ constructor بس |
| [[computed]] | تحسب قيمة من قيمة (مش effect) |
| [[linkedSignal(() => ...)]] | اختيار افتراضي المستخدم يغيّره، ويرجع للـ default لما المصدر يتغير |`,
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
          teach: R`## الفكرة: [[if]] و [[switch]] بتوع JavaScript، بس جوه الـ HTML وقبلهم [[@]]

المثال template بس. شغّلناه جوه component الـ solCode ([[Account]]) في [[ng serve]] (Angular 22.2)، ودوسنا الزراير في Chrome وطبعنا اللي اترسم بعد كل ضغطة.

---

## ١. [[@if (user(); as u)]]

~~~text template
@if (user(); as u) {
  <p>أهلا {{ u.name }}</p>
}
~~~

- [[@if (شرط) { ... }]]: لو الشرط truthy، ارسم اللي بين القوسين المعرّجين. ولو falsy ([[null]] و [[false]] و [[0]] و [['']])، متعملهوش خالص.
- [[user()]] بتقرا الـ signal: يا [[null]] يا [[{ name: 'سارة' }]].
- [[; as u]]: احفظ القيمة دي في متغير اسمه [[u]] جوه البلوك. فبدل [[user()!.name]] بتكتب [[u.name]]، و TypeScript عارف إن [[u]] جوه البلوك مش [[null]].

---

## ٢. [[@else if]] و [[@else]]

~~~text template
} @else if (loading()) {
  <p>بيحمّل...</p>
} @else {
  <a routerLink="/login">سجّل دخول</a>
}
~~~

زي JavaScript: لو الأول مش متحقق جرّب التاني، ولو مفيش ولا واحد خد [[@else]]. واحد بس من التلاتة بيترسم.

---

## ٣. [[@switch]]

~~~text template
@switch (order().status) {
  @case ('pending') { <span>مستني التأكيد</span> }
  @case ('shipped') { <span>في الطريق</span> }
  @default { <span>اتسلّم</span> }
}
~~~

- [[@switch (قيمة)]]: القيمة اللي هنقارن بيها، هنا [[order().status]].
- [[@case ('pending')]]: لو القيمة [[===]] النص ده. المقارنة صارمة: نفس النوع ونفس القيمة.
- [[@default]]: أي قيمة مش في الـ cases.
- مفيش [[break]]: كل [[@case]] بلوك لوحده، ومفيش وقوع للي بعده زي JS.

---

## ٤. الناتج مع كل ضغطة

الـ state في الأول: [[user]] = [[null]]، و [[loading]] = [[true]]، و [[order]] = [[shipped]].

~~~text الناتج (Chrome، من غير الزراير)
start          | <p>بيحمّل...</p><span>في الطريق</span>
loading=false  | <a routerlink="/login" href="/login">سجّل دخول</a><span>في الطريق</span>
user=سارة      | <p>أهلا سارة</p><span>في الطريق</span>
delivered      | <p>أهلا سارة</p><span>اتسلّم</span>
~~~

| الخطوة | ليه ده اللي ظهر |
|---|---|
| start | [[user()]] null، و [[loading()]] true |
| loading=false | الاتنين falsy، فـ [[@else]] |
| user=سارة | [[user()]] بقى object، فأول فرع |
| delivered | [[delivered]] مش [[pending]] ولا [[shipped]]، فـ [[@default]] |

لاحظ إن العنصر القديم **اتشال** من الـ DOM، مش استخبى. مفيش [[<p>بيحمّل...</p>]] مخفي في أي حتة.

### الـ [[href]] جه منين؟

[[routerLink]] directive من [[RouterLink]]، وهي اللي حطت [[href="/login"]]. شلنا [[RouterLink]] من [[imports]]:

~~~text الناتج (Chrome)
<a routerlink="/login">سجّل دخول</a>
~~~

الـ build عدّى من غير ولا تحذير (attribute مجهول مسموح في HTML)، بس اللينك بقى من غير [[href]] ومش بيودّي في حتة.

---

## ٥. [[{{ user().name }}]] برا الـ @if

~~~text ng build
X [ERROR] TS2531: Object is possibly 'null'.

      20 │     <p>{{ user().name }}</p>
         ╵                  ~~~~
~~~

الـ compiler بيفحص الـ template بقواعد TypeScript (strict templates): [[user()]] ممكن تبقى [[null]]، فـ [[.name]] ممكن تقع. جوه [[@if (user(); as u)]] المشكلة مش موجودة. وبرّاه: [[{{ user()?.name }}]] (الـ [[?.]] بترجّع [[undefined]] بدل ما تقع).

---

## الخلاصة

| عايز | اكتب |
|---|---|
| حاجة بشرط | [[@if (cond) { ... }]] |
| وإلا | [[@else if (x) { ... }]] و [[@else { ... }]] |
| تحفظ القيمة | [[@if (user(); as u)]] |
| قيمة ليها حالات | [[@switch (x) { @case ('a') { ... } @default { ... } }]] |
| القديم | [[*ngIf]] و [[[ngSwitch]]]: نفس الفكرة |`,
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
          teach: R`## الفكرة: [[for...of]] جوه الـ template، ومعاه مفتاح لكل عنصر

المثال template بس. شغّلناه في component فيه:

~~~text list.ts
products = signal<Product[]>([
  { id: 1, name: 'قلم', price: 10 },
  { id: 2, name: 'كشكول', price: 45 },
  { id: 3, name: 'مسطرة', price: 15 },
]);
cartTotal = computed(() => this.products().reduce((s, p) => s + p.price, 0));
~~~

[[reduce]] بتلف على الـ array وتجمع: [[s]] المجموع لحد دلوقتي (بيبدأ من [[0]])، و [[p]] المنتج الحالي. اتشغّل في [[ng serve]] (Angular 22.2) واتفحص في Chrome.

---

## ١. سطر الـ [[@for]]

~~~text template
@for (p of products(); track p.id; let i = $index, last = $last) {
~~~

٣ حتت مفصولة بـ [[;]]:

| الحتة | معناها |
|---|---|
| [[p of products()]] | لف على الـ array، والعنصر الحالي اسمه [[p]] |
| [[track p.id]] | المفتاح اللي Angular يعرف بيه العنصر: الـ id |
| [[let i = $index, last = $last]] | خد متغيرات جاهزة بأسامي أقصر |

المتغيرات الجاهزة كلها بتبدأ بـ [[$]]:

| المتغير | قيمته |
|---|---|
| [[$index]] | رقم العنصر، من 0 |
| [[$first]] / [[$last]] | هل ده الأول / الأخير |
| [[$even]] / [[$odd]] | زوجي / فردي (للجداول المقلّمة) |
| [[$count]] | عدد العناصر |

---

## ٢. جسم الـ loop

~~~text template
<li [class.last]="last">{{ i + 1 }}. {{ p.name }}</li>
~~~

- [[[class.last]="last"]]: class اسمه [[last]] على آخر عنصر بس.
- [[{{ i + 1 }}]]: الـ index بيبدأ من 0، فبنزوّد 1 عشان الترقيم يبدأ من 1.

---

## ٣. [[@empty]]

~~~text template
} @empty {
  <li>مفيش منتجات</li>
}
~~~

بيترسم بس لو الـ array فاضية. من غيره هتحتاج [[@if (products().length === 0)]] منفصلة.

---

## ٤. [[@let]]

~~~text template
@let total = cartTotal();
<p>الإجمالي: {{ total }} جنيه</p>
~~~

[[@let]] بتعمل متغير جوه الـ template. هنا مش فارقة كتير، لكن لما تستخدم القيمة ٣ و ٤ مرات بتكتبها مرة. وآخرها [[;]] لازم.

---

## ٥. الناتج

~~~text الناتج (Chrome)
<li>1. قلم</li><li>2. كشكول</li><li class="last">3. مسطرة</li>
الإجمالي: 70 جنيه
~~~

10 + 45 + 15 = 70. وبعد زرار بيعمل [[products.set([])]]:

~~~text الناتج (Chrome)
<li>مفيش منتجات</li>
الإجمالي: 0 جنيه
~~~

الإجمالي 0 لأن [[reduce]] بدأت من [[0]] ومفيش عناصر.

---

## ٦. من غير [[track]]

~~~text ng build
X [ERROR] NG5002: @for loop must have a "track" expression

      7 │   @for (p of products(); let i = $index, last = $last) {
        ╵   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~

إجباري، والـ build بيقع.

---

## ٧. [[track p.id]] ولا [[track $index]]؟ التجربة

عملنا قايمتين بنفس المنتجات، وجوه كل [[li]] حقل [[<input>]]. كتبنا «ملاحظة على كشكول» في حقل الكشكول في القايمتين، وبعدين حذفنا أول منتج (القلم) من الاتنين:

~~~text الناتج (Chrome)
track p.id     كشكول [ملاحظة على كشكول] / مسطرة []
track $index   كشكول [] / مسطرة [ملاحظة على كشكول]
~~~

(اللي بين [[[ ]]] هو المكتوب في الحقل.)

- مع [[track p.id]]: Angular عرف إن عنصر الـ id 1 اتشال، فشال الـ [[li]] بتاعه، والكشكول فضل بنفس عنصره ونفس الحقل.
- مع [[track $index]]: المفتاح هو المكان. بعد الحذف المكان 0 والمكان 1 لسه موجودين والمكان 2 اختفى، فـ Angular شال **آخر** [[li]]، وحدّث النص في الباقي. الحقل اللي كان في المكان 1 فضل في المكان 1، اللي بقى فيه المسطرة.

عشان كده [[track]] بحاجة ثابتة للعنصر نفسه، زي الـ id.

---

## الخلاصة

| الحاجة | الشكل |
|---|---|
| تلف | [[@for (p of list(); track p.id) { ... }]] |
| لو فاضية | [[} @empty { ... }]] |
| الـ index وغيره | [[let i = $index, last = $last]] |
| متغير في الـ template | [[@let total = cartTotal();]] |
| [[track]] | إجباري: [[p.id]] للـ objects، و [[p]] للـ strings، و [[$index]] للقوايم الثابتة بس |`,
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
          try: R`اعمل component [[Reviews]] وحطه جوه @defer زي المثال. اعمل [[ng build]] وبص على جدول «Lazy chunk files»: فيه chunk جديد؟ وبعدين شغّل [[ng serve --no-hmr]] وافتح Network وانزل لتحت، وشوف إمتى الـ chunk بيتحمّل.`,
          deep: {
            why: R`الصفحة فيها حاجات تقيلة المستخدم ممكن ميوصلهاش: تقييمات تحت خالص، و chart، و editor، وخريطة. لو كلهم في الـ bundle الأساسي، أول تحميل بيبطأ عشان حاجات محدش شافها. @defer بيخلي الأساسي خفيف، والباقي ييجي وقت الحاجة. ده بيحسّن LCP و INP.`,
            how: R`الـ compiler بيشوف الـ components اللي جوه @defer، ولو شروطها اتحققت بيطلّعها في chunk لوحدها ويحط مكانها dynamic import. الشروط: تكون standalone، ومتكونش مستخدمة eager في أي حتة تانية في نفس الـ template، ومتعرّفة في ملف لوحدها. لو [[Reviews]] متعرّف في نفس ملف الـ component اللي بيستخدمه، أو مستخدم برا الـ @defer كمان، مش هيتقسم وهيتحمّل مع الصفحة عادي (من غير أي خطأ).

[[on viewport]] بيستخدم IntersectionObserver على الـ placeholder، فالـ [[@placeholder]] لازم يبقى فيه عنصر واحد. [[@loading (minimum 300ms)]] بيمنع وميض لو التحميل سريع، و [[after 100ms]] يأخر ظهوره.

وفيه [[prefetch on idle]]: حمّل الملف بدري بس متعرضوش غير على الشرط.

ومع SSR: المحتوى جوه @defer مش بيترندر على السيرفر (بيطلع الـ placeholder)، إلا مع incremental hydration بـ [[hydrate on viewport]] (المستوى ٣).`,
            when: "حاجات تقيلة أو تحت في الصفحة أو ورا تفاعل: تعليقات، و charts، و rich editors، و dialogs كبيرة، وخرايط. مش للحاجة اللي فوق في أول الشاشة (above the fold): هتعمل layout shift وتبطّأ الـ LCP.",
            mistakes: R`تحط @defer على component متعرّف في نفس الملف أو مستخدم برا كمان في نفس الـ template، فمبيتقسمش وتفتكر إنه شغال. اتأكد من «Lazy chunk files» في [[ng build]]. و [[on viewport]] مع placeholder فيه أكتر من عنصر أو فاضي: خطأ أو مش بيشتغل. و @defer على الـ hero أو العنوان الرئيسي: الصفحة بتنط. وتنسى إن محتواه مش بيتقرا في SSR فالـ SEO مش هيشوفه.`
          },
          teach: R`## الفكرة: «الحتة دي في ملف لوحده، وهاتها لما تظهر»

المثال template لصفحة منتج، وتحت فيها تقييمات تقيلة. شغّلناه في Angular 22.2: [[Reviews]] في ملف لوحده ([[reviews.ts]])، و [[ProductPage]] فيها عنوان وبعده [[div]] طوله 2000px عشان التقييمات تبقى تحت برا الشاشة. واتفحص في [[ng build]] وفي Chrome.

---

## ١. [[@defer (on viewport) { ... }]]

~~~text template
@defer (on viewport) {
  <app-reviews [productId]="id" />
}
~~~

- [[@defer]]: اللي جوه البلوك (هنا component [[Reviews]]) يتحط في ملف JS منفصل، ومايتحمّلش مع الصفحة.
- [[(on viewport)]]: الشرط اللي بيبدأ التحميل: لما الـ placeholder يدخل الجزء الظاهر من الشاشة (الـ viewport).

الشروط التانية بنفس الشكل:

| الشرط | يبدأ التحميل لما |
|---|---|
| [[on idle]] | المتصفح يفضى (الافتراضي لو مكتبتش حاجة) |
| [[on viewport]] | الـ placeholder يظهر في الشاشة |
| [[on interaction]] | المستخدم يدوس أو يكتب في الـ placeholder |
| [[on hover]] | الماوس يعدّي عليه |
| [[on timer(2s)]] | بعد ثانيتين |
| [[when cond()]] | expression يبقى true |

---

## ٢. البلوكات اللي معاه

~~~text template
} @placeholder {
  <p>التقييمات هتظهر لما تنزل لتحت</p>
} @loading (minimum 300ms) {
  <p>بيحمّل التقييمات...</p>
} @error {
  <p>التقييمات مش راضية تحمّل</p>
}
~~~

| البلوك | بيظهر إمتى |
|---|---|
| [[@placeholder]] | من الأول لحد ما الشرط يتحقق. ومع [[on viewport]] هو العنصر اللي بيتراقب، فلازم يبقى فيه عنصر واحد |
| [[@loading (minimum 300ms)]] | وهو بيحمّل، ولو ظهر يفضل ٣٠٠ms على الأقل عشان ميعملش وميض |
| [[@error]] | لو الملف فشل يتحمّل (النت فصل مثلًا) |

---

## ٣. [[ng build]]: الملف اتعمل فعلًا؟

~~~text الناتج
Initial chunk files | Names         |  Raw size | Estimated transfer size
main-PI7AMDJ2.js    | main          | 239.05 kB |                65.35 kB

Lazy chunk files    | Names         |  Raw size | Estimated transfer size
chunk-7y-Jrvaw.js   | reviews       | 519 bytes |               519 bytes
~~~

(في المشروع ده كان فيه chunks تانية لصفحات lazy، شلناها من الناتج.)

**Lazy chunk files** = الملفات اللي مش بتتحمّل في الأول. وسطر [[reviews]] هو الـ component بتاعنا: 519 bytes بقوا برا [[main]].

### لو [[Reviews]] في نفس الملف

نقلنا كلاس [[Reviews]] جوه [[product-page.ts]] نفسه وعملنا build تاني: سطر [[reviews]] اختفى من Lazy chunk files، ومفيش ولا خطأ ولا تحذير. الـ component اتحمّل مع الصفحة عادي. عشان كده بص على الجدول دايمًا، متفترضش.

---

## ٤. في المتصفح: إمتى بيتحمّل؟

### الأول: [[ng serve]] العادي

~~~text الـ Console
NG0751: Angular has detected that this application contains $__bt@defer$__bt blocks and the hot module replacement (HMR) mode is enabled. All $__bt@defer$__bt block dependencies will be loaded eagerly.
~~~

الـ HMR (تحديث الصفحة من غير reload وانت بتعدّل) شغال افتراضيًا في [[ng serve]]، ومعاه Angular بيحمّل كل الـ @defer من الأول. فعشان تشوف السلوك الحقيقي:

~~~powershell
ng serve --no-hmr
~~~

### بـ [[--no-hmr]]

فتحنا الصفحة (شاشة 800×600)، واستنينا، وبعدين نزلنا لتحت. الأرقام ملي ثانية من أول ما فتحنا:

~~~text الناتج (Chrome)
+1214ms before scroll: المنتج  التقييمات هتظهر لما تنزل لتحت
+1231ms request chunk-SWTK6G6R.js
+1322ms المنتج  بيحمّل التقييمات...
+1428ms المنتج  بيحمّل التقييمات...
+1535ms المنتج  منتج 5: ممتاز ★★★★★  كويس ★★★★
~~~

| الوقت | اللي حصل |
|---|---|
| لحد 1214 | الـ placeholder بس، والملف **ماتطلبش** |
| 1231 | نزلنا، الـ placeholder دخل الشاشة، فالملف اتطلب |
| 1322 لـ 1428 | الـ [[@loading]] ظاهر |
| 1535 | التقييمات ظهرت، و [[productId]] وصل 5 |

الـ loading فضل حوالي ٣٠٠ms مع إن الملف صغير وجه في ثواني: ده الـ [[minimum 300ms]].

---

## الخلاصة

| الحاجة | الشكل |
|---|---|
| أجّل حتة | [[@defer (on viewport) { <app-x /> }]] |
| قبل التحميل | [[@placeholder { عنصر واحد }]] |
| وهو بيحمّل | [[@loading (minimum 300ms) { ... }]] |
| لو فشل | [[@error { ... }]] |
| شروط التقسيم | component في ملف لوحده، ومش مستخدم برا الـ @defer |
| اتأكد | «Lazy chunk files» في [[ng build]]، و [[ng serve --no-hmr]] للتجربة |`,
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

في Network (مع [[--no-hmr]]): الـ chunk مش بيتحمّل مع الصفحة، وبيتحمّل أول ما «التقييمات هتظهر...» تدخل الشاشة، وبعدها «بيحمّل التقييمات...» لمدة ٣٠٠ms على الأقل، وبعدين التقييمات. لو الـ placeholder ظاهر من الأول (الصفحة قصيرة)، هيتحمّل على طول، وده سلوك صح.

ولو شغّال [[ng serve]] عادي، هتلاقي في الـ console [[NG0751]]: الـ HMR (التحديث من غير reload) شغال افتراضيًا، ومعاه Angular بيحمّل كل الـ @defer eager، فالـ chunk هيتحمّل مع الصفحة. ده في التطوير بس، والـ build مش متأثر.`
        }
      ]
    }
]);
