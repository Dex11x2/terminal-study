// تكملة تاب angular: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/angular/01.js (شرح حقول الدرس في أوله)
MORE("angular", [
    {
      t: "services و pipes و directives",
      l: 1,
      n: "منطق مشترك في service بـ inject()، وتنسيق بـ pipe، وسلوك على عنصر بـ directive",
      items: [
        {
          cmd: "services و inject()",
          title: "service بتشيل المنطق والبيانات المشتركة، و inject() بتجيبها",
          desc: R`الـ service كلاس بيشيل حاجة مش مكانها component: بيانات مشتركة (السلة، المستخدم الحالي)، أو كلام مع API، أو منطق. أي component يطلبها بـ [[inject(Cart)]]، و Angular بيديله نفس النسخة (singleton).

في Angular 22 فيه decorator جديد [[@Service()]] بيعمل كده. وفي كل الكود قبله، وفي ٩٠٪ من اللي هتقابله في الشغل: [[@Injectable({ providedIn: 'root' })]]. الاتنين بيعملوا singleton على مستوى التطبيق.

ده اسمه Dependency Injection: الـ component مش بيعمل [[new Cart()]]، بيطلبها، و Angular هو اللي يعملها ويديها.`,
          example: R`import { Component, Service, computed, inject, signal } from '@angular/core';
@Service()
export class Cart {
  private readonly items = signal<Product[]>([]);
  readonly count = computed(() => this.items().length);
  readonly total = computed(() => this.items().reduce((s, p) => s + p.price, 0));
  add(p: Product) { this.items.update((list) => [...list, p]); }
}
@Component({
  selector: 'app-header',
  template: $__bt<span>السلة ({{ cart.count() }}) - {{ cart.total() }} جنيه</span>$__bt,
})
export class Header {
  protected readonly cart = inject(Cart);
}`,
          try: R`حط [[Header]] فوق في [[App]]، وفي [[ProductCard]] (أو في App) اعمل field [[cart = inject(Cart)]] وخلي زرار «أضف للسلة» ينادي [[cart.add(...)]] (مش [[inject(Cart)]] جوه الـ click handler نفسه: ده NG0203). شوف الهيدر بيتحدّث مع إن مفيش input بينهم. بعدين غيّر [[@Service()]] لـ [[@Injectable({ providedIn: 'root' })]] وتأكد إن مفيش فرق.`,
          flag: "script",
          deep: {
            why: R`لو كل component بيعمل [[new Cart()]]، كل واحد هيبقى عنده سلة لوحده. ولو بتعدّي السلة input ورا input من App لحد الهيدر والكارت، هتعدّيها في ١٠ components مالهمش دعوة. الـ service المشتركة بتحل ده. و DI بيخلي الاختبار سهل: في التست تقدر تقول «لما حد يطلب Cart، اديله نسخة وهمية».`,
            how: R`[[inject(Cart)]] بتسأل الـ injector: عندك Cart؟ لو [[@Service()]] أو [[providedIn: 'root']]، الـ root injector بيعملها أول مرة حد يطلبها ويحتفظ بيها لآخر التطبيق. ولو محدش طلبها خالص، بتتشال من الـ bundle (tree-shakable).

[[inject()]] لازم تتنادى في injection context: field initializer، أو constructor، أو دالة factory. مينفعش في click handler.

الفرق بين الاتنين: [[@Service()]] معمول أساسًا لـ singleton في الـ root بيستخدم [[inject()]]، ومش بيدعم constructor injection ولا [[useClass]] وغيرها (ولو عايزه في providers بتاع component بتكتب [[@Service({ autoProvided: false })]]). [[@Injectable]] أعم: ينفع تحطه في providers بتاع component أو route، وينفع [[constructor(private http: HttpClient)]] (الشكل القديم اللي هتلاقيه في كل مكان، ولسه شغال).

وفي الـ service اللي فوق: الـ signal [[private]] والتعديل من [[add]] بس، و [[count]] و [[total]] للقراية. كده محدش من برا يقدر يلخبط البيانات.`,
            when: R`أي state مشترك بين أكتر من component، وأي كلام مع API، وأي منطق مش خاص بالعرض (حسابات، صلاحيات، تنسيقات). والـ component يفضل مسؤول عن العرض والتفاعل بس.`,
            mistakes: R`[[new Cart()]] جوه component: نسخة لوحدها، ومش هتتحقن فيها dependencies. و [[inject()]] جوه دالة بتتنادي بعدين: NG0203 inject() must be called from an injection context. وتحط الـ service في [[providers: [Cart]]] بتاع component وانت عايز singleton: كل component بياخد نسخة جديدة (ده مفيد أحيانًا، وهتشوفه في سؤال DI hierarchy في الانترفيو). وتعمل [[items]] public فأي حد يعمل [[cart.items.set([])]].`
          },
          teach: R`## الفكرة: كلاس واحد بيشيل السلة، وأي component يطلبه ياخد نفس النسخة

المثال حتتين: الـ service ([[Cart]]) والـ component اللي بيقرا منها ([[Header]]). عشان نشوف المشاركة، زوّدنا component تالت [[Adder]] فيه زرارين بيضيفوا للسلة، وحطينا الاتنين في صفحة واحدة. اتشغّل في [[ng serve]] (Angular 22.2) واتفحص في Chrome. (ونوع [[Product]] متعرّف فوق زي درس [[input()]].)

---

## ١. [[@Service()]]

~~~text svc.ts
import { Component, Service, computed, inject, signal } from '@angular/core';
@Service()
export class Cart {
~~~

[[@Service()]] بيقول لـ Angular: «الكلاس ده service، اعمل منه نسخة واحدة للتطبيق كله لما حد يطلبه». النسخة الواحدة دي اسمها **singleton**.

---

## ٢. جوه الـ service

~~~text svc.ts
private readonly items = signal<Product[]>([]);
readonly count = computed(() => this.items().length);
readonly total = computed(() => this.items().reduce((s, p) => s + p.price, 0));
add(p: Product) { this.items.update((list) => [...list, p]); }
~~~

| السطر | ليه كده |
|---|---|
| [[private readonly items]] | [[private]]: محدش برا الكلاس يقدر يقرا أو يعدّل [[items]] مباشرة |
| [[readonly count = computed(...)]] | عدد العناصر، للقراية بس |
| [[readonly total = computed(...)]] | مجموع الأسعار بـ [[reduce]] من 0 |
| [[add(p)]] | الطريقة **الوحيدة** للتعديل، وبـ array جديدة ([[...list]]) |

الفكرة: البيانات مقفول عليها، وفيه باب واحد للتعديل. فلو السلة باظت، بتدوّر في [[add]] بس.

---

## ٣. [[inject(Cart)]]

~~~text svc.ts
export class Header {
  protected readonly cart = inject(Cart);
}
~~~

[[inject(Cart)]] معناها: «يا Angular، هاتلي الـ Cart». أول مرة حد يطلبها Angular بيعملها، وكل مرة بعد كده بيرجّع **نفس** النسخة. الـ component مبيعملش [[new Cart()]] بنفسه، وده اسمه Dependency Injection.

والـ template بيقرا منها مباشرة:

~~~text template
<span>السلة ({{ cart.count() }}) - {{ cart.total() }} جنيه</span>
~~~

---

## ٤. التجربة: component تاني بيضيف

~~~text svc.ts
export class Adder {
  protected readonly cart = inject(Cart);
}
// template: <button (click)="cart.add({ id: 1, name: 'قلم', price: 10 })">أضف قلم</button>
~~~

ودوسنا الزراير:

~~~text الناتج (Chrome)
start: السلة (0) - 0 جنيه
after قلم: السلة (1) - 10 جنيه
after كشكول: السلة (2) - 55 جنيه
~~~

[[Header]] و [[Adder]] مفيش بينهم input ولا output. الاتنين طلبوا [[Cart]] فأخدوا نفس النسخة، و [[Adder]] غيّر الـ signal اللي [[Header]] بيقرا منها، فاتحدّث لوحده. و 10 + 45 = 55.

---

## ٥. [[inject()]] فين بالظبط؟

[[inject]] بتشتغل بس في **injection context**: field في الكلاس (زي فوق)، أو الـ constructor. جرّبنا نناديها جوه دالة الـ click:

~~~text svc.ts
late() { inject(Cart).add({ id: 1, name: 'قلم', price: 10 }); }
~~~

~~~text الـ Console
ERROR RuntimeError: NG0203: The $__bt_Cart$__bt token injection failed. $__btinject()$__bt function must be called from an injection context such as a constructor, a factory function, a field initializer, or a function used with $__btrunInInjectionContext$__bt.
~~~

والسلة فضلت (0). الحل: [[cart = inject(Cart)]] كـ field، وفي الدالة [[this.cart.add(...)]].

---

## ٦. [[@Injectable({ providedIn: 'root' })]]

بدّلنا [[@Service()]] بالشكل اللي هتلاقيه في كل الكود اللي قبل Angular 22:

~~~text svc.ts
@Injectable({ providedIn: 'root' })
export class Cart { ... }
~~~

نفس الناتج بالظبط ([[السلة (2) - 55 جنيه]]). [[providedIn: 'root']] معناها «سجّلها في الـ root injector»، يعني نسخة واحدة للتطبيق.

### الفرق: constructor injection

زوّدنا [[constructor(private http: HttpClient) {}]] لـ [[Cart]] وهي [[@Service()]]:

~~~text ng build
X [ERROR] NG2028: @Service class cannot use constructor dependency injection. Use the $__btinject$__bt function instead.
~~~

مع [[@Injectable]] نفس الـ constructor شغال، وده الشكل القديم اللي هتقراه كتير.

| | [[@Service()]] | [[@Injectable({ providedIn: 'root' })]] |
|---|---|---|
| نسخة واحدة للتطبيق | أيوه | أيوه |
| [[inject()]] جواها | أيوه | أيوه |
| [[constructor(private x: X)]] | لأ: NG2028 | أيوه |
| من إمتى | Angular 22 | من زمان، في كل مشروع |

---

## الخلاصة

| الحاجة | الشكل |
|---|---|
| service للتطبيق كله | [[@Service()]] (أو [[@Injectable({ providedIn: 'root' })]]) |
| تجيبها | [[cart = inject(Cart)]] كـ field |
| البيانات | [[private]] signal، وتعرض [[computed]] للقراية |
| التعديل | دوال في الـ service بس |
| [[inject]] برا field أو constructor | NG0203 |`,
          lines: [
            R`[[Service]] الجديد و [[inject]] والـ signals.`,
            "service متاحة لكل التطبيق كنسخة واحدة.",
            "الكلاس.",
            R`البيانات [[private]]: محدش من برا يعدّلها مباشرة.`,
            "العدد محسوب.",
            "والإجمالي محسوب.",
            "الطريقة الوحيدة للتعديل، وبشكل immutable.",
            "قفلة.",
            "component بيستخدمها.",
            "الـ selector.",
            "بيقرا من الـ service مباشرة في الـ template.",
            "قفلة.",
            "الكلاس.",
            R`[[inject]] بتجيب نفس النسخة اللي عند أي حد تاني.`,
            "قفلة."
          ],
          sol: R`لما تدوس «أضف للسلة» في أي حتة، الهيدر بيتحدّث: «السلة (1) - 10 جنيه» وبعدين «السلة (2) - 55 جنيه». مفيش input ولا output بين الهيدر والكارت، الاتنين طلبوا نفس النسخة من [[Cart]]، والهيدر بيقرا signals فبيتحدّث لوحده. وده اتأكد في الـ lab باختبار: بعد إضافة منتجين بسعر 10 و 45، [[count()]] رجعت 2 و [[total()]] رجعت 55.

بعد ما تبدّل لـ [[@Injectable({ providedIn: 'root' })]] (ومتنساش [[import { Injectable }]]) السلوك نفسه بالظبط. الفرق هيبان بس لو حاولت [[constructor(private http: HttpClient)]]: مع [[@Service()]] الـ build بيقع بـ [[NG2028: @Service class cannot use constructor dependency injection]]، ومع [[@Injectable]] شغال.`
        },
        {
          cmd: "pipes",
          title: "تنسّق القيم في الـ template بـ | date و currency و pipe بتاعتك",
          desc: R`الـ pipe دالة بتنسّق قيمة للعرض في الـ template: [[{{ price | currency: 'EGP' }}]] و [[{{ createdAt | date: 'd MMM y' }}]] و [[{{ name | uppercase }}]]. مش بتغيّر البيانات، بتغيّر شكلها وهي بتتعرض.

الجاهزين في [[@angular/common]]: [[DatePipe]] و [[CurrencyPipe]] و [[DecimalPipe]] و [[PercentPipe]] و [[UpperCasePipe]] و [[JsonPipe]] و [[AsyncPipe]] (بتاعة الـ Observables، في درس RxJS). ولازم تحطهم في [[imports]].

وتقدر تعمل pipe بتاعتك بـ [[@Pipe]] و [[transform()]].`,
          example: R`import { Component, Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
@Pipe({ name: 'egp' })
export class EgpPipe implements PipeTransform {
  private fmt = new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' });
  transform(value: number | null | undefined): string {
    return value == null ? '—' : this.fmt.format(value);
  }
}
@Component({
  selector: 'app-price',
  imports: [CurrencyPipe, DatePipe, UpperCasePipe, EgpPipe],
  template: $__bt
    <p>{{ price | currency: 'EGP' : 'symbol' : '1.0-2' }}</p>
    <p>{{ createdAt | date: 'd MMM y' }}</p>
    <p>{{ name | uppercase }}</p>
    <p>{{ price | egp }}</p>
  $__bt,
})
export class Price {
  price = 1250.5;
  createdAt = new Date(2026, 8, 30);
  name = 'angular';
}`,
          try: R`اعرض الـ component وقارن سطر الـ currency بسطر الـ egp. بعدين اعمل pipe اسمها [[timeAgo]] بتاخد Date وترجع «من X دقيقة» بـ [[Intl.RelativeTimeFormat('ar')]] (فيه درس عنه في «تاب JavaScript»).`,
          flag: "script",
          deep: {
            why: R`التنسيق بيتكرر في كل مكان: تاريخ وفلوس وأرقام. لو بتعمله في الكلاس، هتعمل خاصية زيادة لكل قيمة (priceLabel و dateLabel...). الـ pipe بتخلي التنسيق في الـ template حيث مكانه، وبتتكتب مرة وتتستخدم في كل حتة.`,
            how: R`الـ pipe «pure» افتراضيًا: Angular بينادي [[transform]] بس لما القيمة الداخلة تتغير (بالـ reference). ده بيخليها أسرع من دالة عادية في الـ template ([[{{ format(price) }}]] بتتنادى في كل change detection).

عشان كده لو بعت array وعدّلت فيها بـ push، الـ pure pipe مش هتحس. [[pure: false]] بتخليها تتنادى كل مرة، وده مكلّف، والأحسن تغيّر البيانات immutable.

الـ pipes بتتسلسل: [[{{ date | date: 'short' | uppercase }}]]. والـ arguments بعد [[:]].

الـ [[DatePipe]] و [[CurrencyPipe]] بيستخدموا الـ locale بتاع التطبيق (الافتراضي en-US). عشان تنسيق عربي محتاج [[registerLocaleData]] للعربي و [[LOCALE_ID]]، أو [[Intl]] مباشرة زي الـ egp هنا، وده أبسط.`,
            when: R`أي تنسيق للعرض بس: تواريخ وفلوس ونسب واختصار نص. لو القيمة المنسّقة محتاجها في الكود (هتبعتها API مثلًا)، اعملها في service أو computed مش pipe.`,
            mistakes: R`تنسى تعمل import للـ pipe في الـ component: NG8004 No pipe found with name 'currency'. وتعمل pipe بتعمل HTTP أو حسابات تقيلة. وتستخدم [[pure: false]] عشان «مش بتتحدّث»، والمشكلة الحقيقية إنك بتعدّل البيانات mutable. وتفتكر إن [[currency: 'EGP']] هيطلع بالعربي: هيطلع [[EGP1,250.50]] لأن الـ locale إنجليزي.`
          },
          teach: R`## الفكرة: [[|]] في الـ template معناها «عدّي القيمة على دالة تنسيق»

~~~text شكل الـ pipe
{{ price | currency : 'EGP' : 'symbol' : '1.0-2' }}
   القيمة   اسم الـ pipe   argument 1   argument 2   argument 3
~~~

القيمة على الشمال، و [[|]] (pipe)، واسم الـ pipe، وبعد كل [[:]] argument. البيانات نفسها مش بتتغير، الشكل بس اللي بيتعرض. المثال اتشغّل في [[ng serve]] (Angular 22.2) واتقرا النص من Chrome.

---

## ١. الـ imports

~~~text price.ts
import { Component, Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
~~~

[[Pipe]] و [[PipeTransform]] عشان نعمل pipe بتاعتنا. والـ pipes الجاهزة في [[@angular/common]]، وكل واحدة كلاس بتعمله import.

---

## ٢. الـ pipe بتاعتنا: [[EgpPipe]]

~~~text price.ts
@Pipe({ name: 'egp' })
export class EgpPipe implements PipeTransform {
  private fmt = new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' });
  transform(value: number | null | undefined): string {
    return value == null ? '—' : this.fmt.format(value);
  }
}
~~~

| السطر | معناه |
|---|---|
| [[@Pipe({ name: 'egp' })]] | الاسم اللي هيتكتب بعد [[|]] في الـ template |
| [[implements PipeTransform]] | وعد لـ TypeScript إن الكلاس فيه دالة [[transform]]، ولو نسيتها يعترض |
| [[new Intl.NumberFormat('ar-EG', ...)]] | منسّق أرقام جاهز في المتصفح: لغة عربي مصر، وشكل عملة، والعملة جنيه. بنعمله مرة واحدة كـ field مش مع كل نداء |
| [[transform(value)]] | Angular بيناديها بالقيمة اللي على شمال [[|]]، واللي ترجّعه هو اللي بيظهر |
| [[number | null | undefined]] | القيمة ممكن تبقى رقم أو فاضية |
| [[value == null]] | الـ [[==]] (مش [[===]]) بتمسك [[null]] و [[undefined]] الاتنين |
| [[? '—' : this.fmt.format(value)]] | لو فاضية رجّع شرطة، وإلا نسّق |

---

## ٣. الـ component

~~~text price.ts
imports: [CurrencyPipe, DatePipe, UpperCasePipe, EgpPipe],
~~~

كل pipe بتتكتب في الـ template لازم تبقى هنا، الجاهزة وبتاعتك.

### السطور الأربعة والناتج

~~~text الناتج (Chrome)
EGP1,250.5
30 Sep 2026
ANGULAR
‏١٬٢٥٠٫٥٠ ج.م.‏
~~~

### ١: [[price | currency: 'EGP' : 'symbol' : '1.0-2']]

| الـ argument | معناه |
|---|---|
| [['EGP']] | كود العملة |
| [['symbol']] | اعرض رمز العملة (لو ليها رمز في الـ locale، وإلا الكود) |
| [['1.0-2']] | الصيغة: رقم صحيح واحد على الأقل، ومن 0 لـ 2 رقم بعد العلامة |

فـ 1250.5 طلعت [[EGP1,250.5]]: رقم واحد بعد العلامة لأن الحد الأدنى 0. ومن غير [['1.0-2']]، بس [[currency: 'EGP']]، طلعت [[EGP1,250.50]] (رقمين دايمًا). والشكل إنجليزي لأن locale التطبيق الافتراضي [[en-US]].

### ٢: [[createdAt | date: 'd MMM y']]

[[new Date(2026, 8, 30)]]: الشهور في JavaScript من 0، فـ 8 = سبتمبر. والصيغة: [[d]] اليوم، و [[MMM]] اسم الشهر مختصر، و [[y]] السنة. النتيجة [[30 Sep 2026]].

### ٣: [[name | uppercase]]

[[angular]] بقت [[ANGULAR]].

### ٤: [[price | egp]]

[[‏١٬٢٥٠٫٥٠ ج.م.‏]]: أرقام عربية، و [[٬]] فاصل الآلاف، و [[٫]] العلامة العشرية. وفيه حروف مخفية: طبعنا أكواد الحروف في Node ولقينا أول حرف وآخر حرف [[200f]]، ودي علامة RLM (Right-to-Left Mark) بتظبط اتجاه النص، وبعد الرقم [[a0]] مسافة مبتتقسمش.

وجرّبنا كمان [[{{ nothing | egp }}]] و [[nothing = null]]: طلعت [[—]].

---

## ٤. لو نسيت الـ import

شلنا [[CurrencyPipe]] من [[imports]]:

~~~text ng build
X [ERROR] NG8004: No pipe found with name 'currency'.
To fix this, import the "CurrencyPipe" class from "@angular/common" and add it to the "imports" array of the component.

      26 │     <p>{{ price | currency: 'EGP' : 'symbol' : '1.0-2' }}</p>
         ╵                   ~~~~~~~~
~~~

الرسالة بتقولك الحل بالاسم.

---

## ٥. الـ solCode: [[timeAgo]]

~~~text time-ago.ts
private rtf = new Intl.RelativeTimeFormat('ar', { numeric: 'auto' });
transform(date: Date | string | null): string {
  if (!date) return '';
  const minutes = Math.round((new Date(date).getTime() - Date.now()) / 60000);
  if (Math.abs(minutes) < 60) return this.rtf.format(minutes, 'minute');
  const hours = Math.round(minutes / 60);
  if (Math.abs(hours) < 24) return this.rtf.format(hours, 'hour');
  return this.rtf.format(Math.round(hours / 24), 'day');
}
~~~

- [[Intl.RelativeTimeFormat]] بتكتب «قبل X» أو «بعد X». و [[numeric: 'auto']] بتخليها تقول «أمس» بدل «قبل يوم واحد».
- [[getTime() - Date.now()]]: الفرق بالملي ثانية، سالب لو التاريخ فات. ونقسم على 60000 (ملي ثانية في الدقيقة).
- [[Math.abs]] القيمة من غير إشارة، فأقل من 60 دقيقة نكتب بالدقايق، وأقل من 24 ساعة بالساعات، وإلا بالأيام.

جرّبناها بأربع تواريخ في Chrome:

~~~text الناتج (Chrome)
قبل 5 دقائق
قبل 3 ساعات
أمس
قبل 4 أيام
~~~

الأرقام إنجليزي لأن [['ar']] لوحدها في Chrome بتستخدمها، عكس [['ar-EG']] في الـ egp.

---

## الخلاصة

| الحاجة | الشكل |
|---|---|
| تستخدم pipe | [[{{ x | name: arg1 : arg2 }}]] |
| الجاهزة | [[currency]] و [[date]] و [[uppercase]] و [[number]] و [[percent]] و [[json]] من [[@angular/common]] |
| بتاعتك | [[@Pipe({ name })]] و [[transform(value)]] |
| لازم | كل pipe في [[imports]]، وإلا NG8004 |
| تنسيق عربي | [[Intl]] بـ [['ar-EG']]، أو locale عربي للتطبيق |`,
          lines: [
            R`[[Pipe]] و [[PipeTransform]] عشان نعمل pipe.`,
            "الـ pipes الجاهزة.",
            R`اسمها في الـ template هيبقى [[egp]].`,
            R`[[PipeTransform]] بيضمن إن فيه [[transform]].`,
            R`[[Intl]] بتاع المتصفح بينسّق بالعربي. بنعمله مرة واحدة مش في كل نداء.`,
            R`[[transform]] بتاخد القيمة وترجع النص.`,
            R`لو null أو undefined نرجع شرطة، وإلا ننسّق.`,
            "قفلة.",
            "قفلة الكلاس.",
            "component بيستخدمهم.",
            "الـ selector.",
            "لازم import لكل pipe، الجاهزة وبتاعتك.",
            "بداية الـ template.",
            R`currency بالـ EGP، وبالرمز، ومن 0 لـ 2 رقم عشري.`,
            "تاريخ بصيغة مختصرة.",
            "حروف كبيرة.",
            "الـ pipe بتاعتنا.",
            "قفلة الـ template.",
            "قفلة الـ decorator.",
            "الكلاس.",
            "رقم عادي.",
            R`30 سبتمبر 2026 (الشهور من 0 في [[Date]]).`,
            "نص.",
            "قفلة."
          ],
          sol: R`هتشوف: [[EGP1,250.5]]، و [[30 Sep 2026]]، و [[ANGULAR]]، و [[‏١٬٢٥٠٫٥٠ ج.م.‏]]. الأخير اتجرّب في الـ lab بالظبط (فيه علامات اتجاه RTL مخفية حوالين النص). الفرق إن [[CurrencyPipe]] بتستخدم locale التطبيق (en-US)، والـ egp بتستخدم [[ar-EG]] مباشرة.

الـ timeAgo:`,
          solCode: R`import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'timeAgo' })
export class TimeAgoPipe implements PipeTransform {
  private rtf = new Intl.RelativeTimeFormat('ar', { numeric: 'auto' });
  transform(date: Date | string | null): string {
    if (!date) return '';
    const minutes = Math.round((new Date(date).getTime() - Date.now()) / 60000);
    if (Math.abs(minutes) < 60) return this.rtf.format(minutes, 'minute');
    const hours = Math.round(minutes / 60);
    if (Math.abs(hours) < 24) return this.rtf.format(hours, 'hour');
    return this.rtf.format(Math.round(hours / 24), 'day');
  }
}
// {{ order.createdAt | timeAgo }}  ← «قبل 5 دقائق» أو «أمس»`
        },
        {
          cmd: "directives",
          title: "directive بتضيف سلوك لأي عنصر موجود",
          desc: R`الـ component عنصر جديد ليه template. الـ directive مالهاش template: بتتحط على عنصر موجود وتضيف له سلوك أو شكل. [[<p appHighlight>]] مثلًا بتلوّن أي عنصر لما الماوس يعدّي عليه.

بتتعمل بـ [[@Directive({ selector: '[appHighlight]' })]]، والأقواس المربعة في الـ selector معناها «أي عنصر عليه attribute بالاسم ده». وبتسمع للأحداث وتغيّر الـ attributes والـ styles عن طريق [[host]].

[[routerLink]] و [[formControlName]] و [[ngModel]] كلهم directives.`,
          example: R`import { Directive, input, signal } from '@angular/core';
@Directive({
  selector: '[appHighlight]',
  host: {
    '(mouseenter)': 'hover.set(true)',
    '(mouseleave)': 'hover.set(false)',
    '[style.background-color]': 'hover() ? (color() || "yellow") : null',
  },
})
export class Highlight {
  color = input('', { alias: 'appHighlight' });
  protected hover = signal(false);
}
// <p appHighlight>أصفر</p>   <p appHighlight="lightblue">أزرق</p>`,
          try: R`حط الـ directive في [[imports]] وجرّبها على [[p]] و [[button]] و [[li]]. بعدين اعمل directive تانية [[appAutofocus]] بتعمل focus للـ input أول ما يظهر (استخدم [[inject(ElementRef)]] و [[afterNextRender]]).`,
          flag: "script",
          deep: {
            why: "فيه سلوكيات بتتكرر على عناصر كتير مختلفة: tooltip، و autofocus، و «اقفل لما تدوس برا»، و صلاحيات تخبّي زرار. لو كتبتها في كل component هتتكرر، ولو عملتها component هتضطر تغلّف العنصر. الـ directive بتتحط كـ attribute على أي عنصر من غير ما تغيّر شكل الـ HTML.",
            how: R`الـ [[host]] في الـ decorator بيربط أحداث وخصايص على العنصر اللي الـ directive عليه: [[(mouseenter)]] حدث، و [[[style.background-color]]] binding. ده الشكل الحديث؛ في الكود القديم هتلاقي [[@HostListener('mouseenter')]] و [[@HostBinding('style.backgroundColor')]] وهما نفس الفكرة.

[[input('', { alias: 'appHighlight' })]] بتخلي قيمة الـ attribute نفسه هي الـ input: [[appHighlight="lightblue"]]. ولو كتبته من غير قيمة، القيمة بتبقى نص فاضي، عشان كده الـ [[||]].

لو محتاج العنصر نفسه: [[private el = inject(ElementRef<HTMLElement>)]] وبعدين [[this.el.nativeElement]]، بس متلمسش الـ DOM غير بعد ما يترسم ([[afterNextRender]]) وخد بالك إنه مش موجود في SSR.

فيه كمان structural directives (زي [[*ngIf]] القديمة) بتغيّر الـ DOM نفسه، بس مع @if و @for بقى نادر إنك تكتب واحدة.`,
            when: R`سلوك مستقل عن شكل العنصر وبيتكرر: tooltip، و autofocus، و click outside، و «اعرض لو عنده صلاحية». لو محتاج template (HTML جديد)، اعمل component.`,
            mistakes: R`تنسى الأقواس المربعة في الـ selector فيبقى selector لـ tag اسمه appHighlight. وتعدّل [[nativeElement.style]] مباشرة بدل host binding: شغال، بس بيتخانق مع Angular وبيبوّظ SSR. وتنسى import للـ directive فالـ attribute يتجاهل بهدوء من غير أي خطأ، لأن attribute مجهول مسموح في HTML.`
          },
          teach: R`## الفكرة: كلاس بيتلزق على عنصر موجود من خلال attribute

[[Highlight]] مالهاش HTML خاص بيها. بتتكتب كـ attribute على أي عنصر ([[<p appHighlight>]])، وتسمع لأحداثه وتغيّر شكله. اتشغّلت هي و [[Autofocus]] بتاعة الـ solCode في [[ng serve]] (Angular 22.2)، والماوس اتحرك فعلًا في Chrome بـ Playwright.

---

## ١. [[@Directive]] و [[selector: '[appHighlight]']]

~~~text dir.ts
import { Directive, input, signal } from '@angular/core';
@Directive({
  selector: '[appHighlight]',
~~~

- [[@Directive]] زي [[@Component]] من غير [[template]] ولا [[styles]].
- الـ selector ده CSS selector: [[[appHighlight]]] بالأقواس المربعة = «أي عنصر عليه attribute اسمه appHighlight». من غير الأقواس، [[appHighlight]] كان هيبقى اسم tag.
- [[app]] الـ prefix بتاع المشروع، زي [[app-]] في الـ components.

---

## ٢. [[host]]: روابط على العنصر نفسه

~~~text dir.ts
host: {
  '(mouseenter)': 'hover.set(true)',
  '(mouseleave)': 'hover.set(false)',
  '[style.background-color]': 'hover() ? (color() || "yellow") : null',
},
~~~

الـ host هو العنصر اللي الـ directive عليه. والمفاتيح نفس رموز الـ template بالظبط:

| المفتاح | معناه |
|---|---|
| [['(mouseenter)']] | حدث: الماوس دخل العنصر، فنفّذ [[hover.set(true)]] |
| [['(mouseleave)']] | حدث: الماوس خرج |
| [['[style.background-color]']] | binding: لون الخلفية = الـ expression |

والـ expression الأخير من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[color() || "yellow"]] | اللون اللي اتكتب في الـ attribute، ولو نص فاضي خد yellow. الـ [[||]] بتاخد التاني لو الأول falsy |
| [[hover() ? (...) : null]] | لو الماوس فوقه حط اللون، وإلا [[null]]، و [[null]] معناها «شيل الـ style» |

---

## ٣. الكلاس

~~~text dir.ts
export class Highlight {
  color = input('', { alias: 'appHighlight' });
  protected hover = signal(false);
}
~~~

- [[input('', { alias: 'appHighlight' })]]: input قيمته الافتراضية نص فاضي، واسمه من برا [[appHighlight]]، يعني نفس اسم الـ attribute. فـ [[appHighlight="lightblue"]] بتشغّل الـ directive **وبتبعت** اللون في نفس الوقت. وجوه الكلاس اسمه [[color]] عشان يبقى مفهوم.
- [[hover]] signal بتقول الماوس فوقه ولا لأ.

---

## ٤. الناتج

~~~text template
<p appHighlight>أصفر</p>   <p appHighlight="lightblue">أزرق</p>
<button appHighlight="pink">زرار</button>
~~~

~~~text الناتج (Chrome)
before:   <p apphighlight="">أصفر</p>                                         bg=rgba(0, 0, 0, 0)
hover p1: <p apphighlight="" style="background-color: yellow;">أصفر</p>      bg=rgb(255, 255, 0)
hover p2: <p apphighlight="lightblue" style="background-color: lightblue;">  bg=rgb(173, 216, 230)
hover b:  <button apphighlight="pink" style="background-color: pink;">        bg=rgb(255, 192, 203)
leave p2: <p apphighlight="lightblue" style="">أزرق</p>                       bg=rgba(0, 0, 0, 0)
~~~

- الأول من غير قيمة: [[apphighlight=""]] نص فاضي، فأخد yellow.
- [[rgba(0, 0, 0, 0)]] معناها شفاف، يعني مفيش خلفية.
- اشتغلت على [[button]] زي [[p]]: الـ selector مش مربوط بنوع عنصر.
- بعد ما الماوس خرج، [[style=""]]: الـ [[null]] شالت اللون.

(المتصفح بيكتب أسامي الـ attributes small، عشان كده [[apphighlight]].)

### من غير import

عملنا component تاني فيه [[<p appHighlight>]] ومحطيناش [[Highlight]] في [[imports]]: الـ build عدّى من غير ولا تحذير، والماوس عدّى والخلفية فضلت [[rgba(0, 0, 0, 0)]]. الـ attribute اتساب كـ HTML عادي.

---

## ٥. الـ solCode: [[Autofocus]]

~~~text autofocus.ts
@Directive({ selector: '[appAutofocus]' })
export class Autofocus {
  private el = inject<ElementRef<HTMLInputElement>>(ElementRef);
  constructor() {
    afterNextRender(() => this.el.nativeElement.focus());
  }
}
~~~

| السطر | معناه |
|---|---|
| [[inject(ElementRef)]] | هات غلاف العنصر اللي الـ directive عليه |
| [[<ElementRef<HTMLInputElement>>]] | النوع: الغلاف ده جواه input، فـ TypeScript يعرف إن فيه [[focus()]] |
| [[afterNextRender(() => ...)]] | نفّذ ده مرة بعد ما Angular يرسم الصفحة، لأن الـ focus على عنصر لسه مش في الصفحة مبيشتغلش. ومش بيشتغل على السيرفر في SSR |
| [[this.el.nativeElement]] | عنصر الـ DOM الحقيقي |

~~~text الناتج (Chrome)
focused: <input appautofocus="" placeholder="دوّر...">
~~~

[[document.activeElement]] (العنصر اللي عليه الـ focus) طلع الـ input بتاعنا.

---

## الخلاصة

| الحاجة | الشكل |
|---|---|
| directive | [[@Directive({ selector: '[appX]' })]] بالأقواس المربعة |
| حدث على العنصر | [[host: { '(mouseenter)': 'f()' }]] |
| خاصية على العنصر | [[host: { '[style.color]': 'expr' }]] |
| قيمة من الـ attribute نفسه | [[input('', { alias: 'appX' })]] |
| العنصر نفسه | [[inject(ElementRef)]] جوه [[afterNextRender]] |
| نسيت الـ import | مفيش خطأ، ومفيش تأثير |`,
          lines: [
            "المطلوب من core.",
            "directive مش component: مفيش template.",
            "بتشتغل على أي عنصر عليه attribute اسمه appHighlight.",
            "روابط على العنصر نفسه.",
            "الماوس دخل.",
            "الماوس خرج.",
            "لون الخلفية لو الماوس فوقه، وإلا مفيش.",
            "قفلة الـ host.",
            "قفلة الـ decorator.",
            "الكلاس.",
            "قيمة الـ attribute نفسه هي اللون.",
            "حالة الـ hover.",
            "قفلة."
          ],
          sol: R`الـ [[p]] الأول بيبقى أصفر لما الماوس يعدّي، والتاني أزرق فاتح، وبيرجعوا لما الماوس يخرج. بتشتغل على أي عنصر لأن الـ selector attribute مش tag. لو مفيش أي تأثير، اتأكد إن [[Highlight]] في [[imports]]: Angular مش هيطلّع خطأ لو نسيته.

الـ autofocus:`,
          solCode: R`import { Directive, ElementRef, afterNextRender, inject } from '@angular/core';
@Directive({ selector: '[appAutofocus]' })
export class Autofocus {
  private el = inject<ElementRef<HTMLInputElement>>(ElementRef);
  constructor() {
    afterNextRender(() => this.el.nativeElement.focus());
  }
}
// <input appAutofocus placeholder="دوّر..." />`
        }
      ]
    }
]);
