// تكملة تاب ts: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ts/01.js (شرح حقول الدرس في أوله)
MORE("ts", [
    {
      t: "Classes في TS",
      l: 2,
      n: "private و protected و #private، و parameter properties، و abstract و implements، و override، و decorators وإزاي NestJS بيستخدمها",
      items: [
        {
          cmd: "public و private و protected",
          title: "private بتاعة TS ولا #private بتاعة JS: مين بيحمي بجد؟",
          desc: R`الـ class في TS هو نفس الـ class بتاع JS (شوف درس [[class]] في «تاب JavaScript»)، وفوقه كلمات بتحدد مين يوصل لكل خاصية: [[public]] (الافتراضي، أي حد)، و [[private]] (كود جوه الكلاس ده بس)، و [[protected]] (الكلاس ده والكلاسات اللي بتورث منه).

المهم: [[private]] و [[protected]] أنواع، يعني بيتمسحوا زي أي نوع. الفحص بيحصل وقت الكتابة بس، ووقت التشغيل الخاصية عادية خالص: بتظهر في [[JSON.stringify]] وأي حد يقدر يقراها بـ [[as any]]. أما [[#secret]] فده private حقيقي من JS نفسه، والـ runtime هو اللي بيمنع.`,
          example: R`class Account {
  public owner: string;
  private pin: string;
  protected balance = 0;
  #secret = "s3cr3t";
  constructor(owner: string, pin: string) {
    this.owner = owner;
    this.pin = pin;
  }
  check(pin: string) { return pin === this.pin; }
}
class Savings extends Account {
  addInterest() { this.balance *= 1.1; }
}
const acc = new Account("sara", "1234");
acc.owner;
acc.pin; // خطأ: Property 'pin' is private and only accessible within class 'Account'
acc.balance; // خطأ: Property 'balance' is protected ...
acc.#secret; // خطأ: Property '#secret' is not accessible outside class 'Account'
console.log((acc as any).pin);    // "1234"
console.log(acc["pin"]);          // "1234"، ومن غير أي خطأ
console.log(JSON.stringify(acc)); // {"owner":"sara","pin":"1234","balance":0}`,
          try: R`شيل السطور التلاتة اللي فيها خطأ وشغّل الملف ([[npx tsc --strict]] وبعدين [[node]] على الناتج، أو [[npx tsx]]). بعدها غيّر [[private pin]] لـ [[#pin]] (ومعاها كل [[this.pin]] لـ [[this.#pin]]) وشغّل تاني: آخر ٣ سطور بقوا بيطبعوا إيه؟ وجرّب تكتب method في [[Savings]] بترجّع [[this.#pin]].`,
          flag: "script",
          deep: {
            why: R`أي كلاس ليه جزء «واجهة» بتتنادى من برّه، وجزء تفاصيل داخلية لو حد اعتمد عليها هتكسره أول ما تغيّرها. الـ modifiers بتقول ده بوضوح، والمحرر بيخفي الحاجات الـ private من الـ autocomplete. وده سؤال انترفيو ثابت: «الفرق بين private و #private؟».`,
            how: R`[[private pin]] بيخلي TS يرفض [[acc.pin]] برّه الكلاس بخطأ TS2341، و [[protected]] بيرفضها برّه الكلاس والكلاسات الوارثة (TS2445). بس في الـ JS الناتج مفيش أي أثر: الخاصية عادية على الـ object. وفيه باب خلفي معروف ومقصود: [[acc["pin"]]] بالأقواس المربعة TS بيسمح بيها من غير خطأ، وكمان [[as any]].

[[#pin]] حاجة تانية: ده جزء من JS نفسه (ES2022). الـ engine بيخزّنها برّه الخصايص العادية، فمش بتظهر في [[Object.keys]] ولا [[JSON.stringify]] ولا [[acc["#pin"]]]، والوصول ليها برّه الكلاس SyntaxError في JS و TS18013 في TS. ولو الـ target أقدم من ES2022، TS بيحوّلها لـ WeakMap عشان يحافظ على نفس الحماية.

فرق تاني: [[#pin]] مش بتتورث للوصول. [[Savings]] مش شايفة [[#pin]] بتاعة الأب خالص، زي [[private]] بالظبط. لو عايز الابن يوصل، يبقى [[protected]] (ودي ملهاش مقابل في JS).

وفي الحالتين الـ private حسب الكلاس مش حسب الـ object: method في [[Account]] تقدر تقرا [[other.#pin]] من instance تاني من نفس الكلاس.`,
            when: R`[[private]] كفاية لكود التطبيق العادي (services و controllers)، وهو اللي هتلاقيه في NestJS وأغلب الكود. [[#private]] لما الحماية لازم تبقى حقيقية: مكتبة بتنشرها، أو حاجة حساسة مش عايزها تطلع في log أو response. و [[protected]] بس لما فيه وراثة فعلًا.`,
            mistakes: R`تفتكر إن [[private]] بيخبي البيانات: [[res.json(user)]] هيطلّع الـ [[passwordHash]] الـ private عادي. وتخلط بين الاتنين في نفس الكلاس ([[private #x]] ممنوعة أصلًا). وتعمل [[protected]] لكل حاجة «احتياطي» فالكلاسات الوارثة تعتمد على تفاصيل الأب. وفي الانترفيو: «TS private بيتفحص وقت الكتابة بس وبيتمسح، و #private بيتفحص وقت التشغيل من الـ engine».`
          },
          teach: R`## الفكرة في سطر

TS بيضيف ٣ كلمات قبل خصايص الكلاس: [[public]] و [[private]] و [[protected]]، والتلاتة **فحص وقت الكتابة بس**. أما [[#name]] فدي من JS نفسها، والـ engine هو اللي بيمنع الوصول وقت التشغيل.

الأخطاء تحت من [[npx tsc --strict --noEmit]] (TypeScript 6.0.3 على ويندوز 11، ونفس الأكواد على 7.0.2)، والتشغيل بـ [[tsc]] وبعدين [[node]] على Node 24.

---

## ١. الكلاس سطر سطر

~~~text app.ts
class Account {
  public owner: string;
  private pin: string;
  protected balance = 0;
  #secret = "s3cr3t";
  constructor(owner: string, pin: string) {
    this.owner = owner;
    this.pin = pin;
  }
  check(pin: string) { return pin === this.pin; }
}
~~~

| السطر | مين يوصل |
|---|---|
| [[public owner: string;]] | أي حد (ده الافتراضي لو مكتبتش حاجة) |
| [[private pin: string;]] | الكود اللي جوه [[Account]] بس |
| [[protected balance = 0;]] | [[Account]] والكلاسات اللي بتورث منه |
| [[#secret = "s3cr3t";]] | جوه [[Account]] بس، وبحماية حقيقية |

- [[owner: string;]] من غير قيمة اسمها field declaration: بتعلن إن الخاصية موجودة ونوعها إيه.
- [[balance = 0]] من غير نوع: TS استنتج [[number]].
- الـ [[constructor]] بيتنفّذ مع [[new]]، و [[this]] هو الـ object الجديد.
- [[check]] بتقارن من جوه الكلاس، فمسموح لها تقرا [[this.pin]].

---

## ٢. الوراثة و [[protected]]

~~~text app.ts
class Savings extends Account {
  addInterest() { this.balance *= 1.1; }
}
~~~

[[extends]] معناها [[Savings]] بتورث كل حاجة من [[Account]]. و [[this.balance *= 1.1]] (يعني [[this.balance = this.balance * 1.1]]) مسموحة لأن [[balance]] protected.

---

## ٣. من برّه الكلاس: ٣ أخطاء

~~~text app.ts
const acc = new Account("sara", "1234");
acc.owner;
acc.pin;
acc.balance;
acc.#secret;
~~~

~~~text خطأ tsc
l12.ts(17,5): error TS2341: Property 'pin' is private and only accessible within class 'Account'.
l12.ts(18,5): error TS2445: Property 'balance' is protected and only accessible within class 'Account' and its subclasses.
l12.ts(19,5): error TS18013: Property '#secret' is not accessible outside class 'Account' because it has a private identifier.
~~~

والفرق إن [[acc.#secret]] ممنوعة من JS نفسها كمان. جرّبنا في Node من غير TS خالص:

~~~text الناتج (node -e)
SyntaxError: Private field '#s' must be declared in an enclosing class
~~~

---

## ٤. وقت التشغيل: [[private]] اتمسحت

شلنا السطور التلاتة الغلط، وده الـ JS اللي tsc طلّعه بـ [[--target es2022]]:

~~~text out/l12r.js (جزء منه)
class Account {
    owner;
    pin;
    balance = 0;
    #secret = "s3cr3t";
    ...
console.log(acc.pin); // "1234"
~~~

- [[public]] و [[private]] و [[protected]] اختفوا: [[pin]] بقت خاصية عادية.
- [[(acc as any).pin]] بقت [[acc.pin]]، لأن [[as any]] برضه بتتمسح.
- [[#secret]] فضلت زي ما هي، لأنها JS.

~~~text الناتج (node out/l12r.js)
1234
1234
{"owner":"sara","pin":"1234","balance":0}
~~~

١. [[(acc as any).pin]]: [[as any]] سكّتت TS، والقيمة موجودة.
٢. [[acc["pin"]]]: الأقواس المربعة باب خلفي TS بيسيبه مفتوح عن قصد، من غير أي خطأ.
٣. [[JSON.stringify]]: الـ pin طلعت في الـ JSON، و [[#secret]] لأ.

> ولو [[--target es2021]] أو أقدم، tsc بيحوّل [[#secret]] لـ [[WeakMap]] اسمها [[_Account_secret]] عشان يحافظ على نفس الحماية: [[_Account_secret.set(this, "s3cr3t")]].

---

## ٥. الـ solCode: [[#pin]] بدل [[private pin]]

~~~text الناتج (npx tsx)
undefined
{"owner":"sara","balance":0}
true
~~~

الـ pin مبقتش موجودة كخاصية عادية خالص: [[as any]] مش لاقيها، والـ JSON مفيهوش، و [[check]] لسه شغالة من جوه. ولو فكّينا السطر المتعلّق [[leak()]] وجرّبنا [[acc["pin"]]]:

~~~text خطأ tsc
error TS18013: Property '#pin' is not accessible outside class 'Account' because it has a private identifier.
error TS2551: Property 'pin' does not exist on type 'Account'. Did you mean '#pin'?
~~~

الأول: الابن [[Savings]] مش شايف [[#pin]] بتاعة الأب. والتاني: مفيش خاصية اسمها [[pin]] أصلًا. (TS 7.0.2 بيطبع في الرسالة التانية اسم داخلي غريب بدل [['#pin']]، والكود نفسه TS2551.)

---

## الخلاصة

| | [[private x]] | [[#x]] |
|---|---|---|
| مين بيمنع | TS وقت الكتابة | الـ engine وقت التشغيل |
| في الـ JS الناتج | خاصية عادية | private field |
| [[as any]] و [[obj["x"]]] | بيوصلوا للقيمة | مفيش وصول |
| [[JSON.stringify]] | بتظهر | مبتظهرش |
| الابن يوصل؟ | لأ (استخدم protected) | لأ |`,
          lines: [
            "بداية الكلاس.",
            R`[[public]] هو الافتراضي، كتابته اختيارية بس بتوضّح.`,
            R`[[private]]: كود الكلاس ده بس (فحص TS).`,
            R`[[protected]]: الكلاس ده والكلاسات اللي بتورث منه.`,
            R`private حقيقي من JS نفسه، بيتفحص وقت التشغيل.`,
            "الـ constructor بياخد القيم...",
            "...ويحطها في الخصايص.",
            R`جوه الكلاس عادي نقرا [[pin]].`,
            "قفلة.",
            R`method بتقارن من غير ما تكشف [[pin]] نفسه.`,
            "قفلة الكلاس.",
            "كلاس بيورث.",
            R`[[protected]] متاحة هنا لأنه ابن.`,
            "قفلة.",
            "instance.",
            "public: مسموح.",
            R`private: TS بيرفض (TS2341).`,
            R`protected: TS بيرفض برّه الكلاس والأبناء (TS2445).`,
            R`[[#]]: TS بيرفض، والـ JS نفسه كان هيرمي SyntaxError.`,
            R`بس [[private]] مش حماية وقت التشغيل: [[as any]] بتوصل للقيمة.`,
            R`وحتى من غير as: الأقواس المربعة باب خلفي مسموح في TS.`,
            R`والخاصية الـ private بتطلع في JSON، أما [[#secret]] لأ.`
          ],
          sol: R`بعد ما تشيل السطور الغلط، الناتج مع [[private pin]]: [[1234]] مرتين، وبعدين [[{"owner":"sara","pin":"1234","balance":0}]]. يعني private مخبية الـ pin عن TS بس.

بعد ما تحوّلها لـ [[#pin]]: [[npx tsc --strict]] هيرفض [[acc["pin"]]] بـ Property 'pin' does not exist on type 'Account'. Did you mean '#pin'? (TS2551)، لأن مفيش خاصية اسمها pin أصلًا، فشيل السطر ده. والباقي بيطبع [[undefined]] وبعدين [[{"owner":"sara","balance":0}]]: الـ pin اختفى من الـ JSON. والـ method اللي في [[Savings]] بترجّع [[this.#pin]] بتطلّع TS18013: الابن مش شايف [[#pin]] بتاعة الأب. (ونفس الكلام مع [[private pin]]: الابن بياخد TS2341، لأن private مش protected.)

الغلط الشائع: تفتكر إن [[(acc as any).pin]] هيطلع undefined مع [[private]]. لأ، private بتتمسح.`,
          solCode: R`class Account {
  public owner: string;
  #pin: string;
  protected balance = 0;
  constructor(owner: string, pin: string) {
    this.owner = owner;
    this.#pin = pin;
  }
  check(pin: string) { return pin === this.#pin; }
}
class Savings extends Account {
  addInterest() { this.balance *= 1.1; }
  // leak() { return this.#pin; } // خطأ TS18013: الابن مش شايفها
}
const acc = new Account("sara", "1234");
console.log((acc as any).pin);    // undefined
console.log(JSON.stringify(acc)); // {"owner":"sara","balance":0}
console.log(acc.check("1234"));   // true`
        },
        {
          cmd: "parameter properties و readonly",
          title: "تعرّف الخاصية وتملاها من الـ constructor في سطر واحد",
          desc: R`لو كتبت [[public]] أو [[private]] أو [[protected]] أو [[readonly]] قبل باراميتر في الـ constructor، TS بيعمل خاصية بنفس الاسم ويحط فيها القيمة لوحده. ده اسمه parameter property، وبيوفّر تلات سطور لكل خاصية: التعريف، والباراميتر، و [[this.x = x]].

و [[readonly]] على خاصية معناها تتكتب مرة واحدة: في تعريفها أو في الـ constructor، وبعد كده لأ، حتى من جوه الكلاس. ودي فحص TS بس، زي private.`,
          example: R`class Money {
  constructor(
    public readonly amount: number,
    public readonly currency: "EGP" | "USD",
  ) {}
  add(other: Money): Money {
    if (other.currency !== this.currency) throw new Error("عملات مختلفة");
    return new Money(this.amount + other.amount, this.currency);
  }
}
const total = new Money(100, "EGP").add(new Money(50, "EGP"));
console.log(total.amount); // 150
total.amount = 0; // خطأ: Cannot assign to 'amount' because it is a read-only property
class Config {
  readonly port: number;
  constructor() {
    this.port = Number(process.env.PORT ?? 3000);
  }
  bump() { this.port++; } // خطأ: برّه الـ constructor حتى جوه الكلاس
}`,
          try: R`اكتب [[class Product]] بـ parameter properties: [[id]] رقم [[public readonly]]، و [[name]] [[public]] عادي، و [[price]] [[private]]. وضيف method اسمها [[priceWithVat()]] بترجّع السعر × 1.14 مقرّب. غيّر الاسم من برّه، وجرّب تغيّر [[id]] وتقرا [[price]] من برّه، واطبع [[JSON.stringify]] للمنتج.`,
          flag: "script",
          deep: {
            why: R`كلاسات الـ services في الباك (وأي حاجة فيها dependency injection زي NestJS) constructor بتاعها مليان dependencies. من غير parameter properties كل dependency بتتكتب ٣ مرات. ومع [[readonly]] بتضمن إن محدش يبدّل الـ repository أو القيمة بعد ما الـ object اتعمل.`,
            how: R`[[constructor(public readonly amount: number)]] بيتحول في الـ JS لخاصية [[amount]] و [[this.amount = amount]] أول سطر في الـ constructor (وبعد [[super()]] لو فيه وراثة). يعني ده من الحاجات القليلة في TS اللي بتطلّع كود حقيقي مش أنواع بس، زي [[enum]].

وعشان كده مبيشتغلش مع [[node file.ts]] (type stripping)، و [[erasableSyntaxOnly]] في tsconfig بيرفضه بخطأ TS1294. ولو مشروعك ماشي على الطريقة دي، اكتب الخاصية والتعيين بإيدك. tsx و Vite و tsc بيفهموه عادي.

[[readonly]] بيتفحص بـ TS2540، ومش [[Object.freeze]]: وقت التشغيل الخاصية عادية وممكن تتغير لو حد عدّى الأنواع. وبيمنع إعادة التعيين بس مش التعديل جوه: [[readonly items: string[]]] بيسمح بـ [[this.items.push()]]، فلو عايز الليستة نفسها متتغيرش [[readonly string[]]].

وخاصية عادية من غير قيمة أولية ومش بتتملى في الـ constructor بتطلّع خطأ TS2564 مع [[strict]] ([[strictPropertyInitialization]]). الحل: قيمة أولية، أو تملاها في الـ constructor، أو [[name!: string]] لو حاجة تانية بتملاها (زي ORM أو framework).`,
            when: R`parameter properties في services و controllers والكلاسات اللي constructor بتاعها بياخد dependencies. و [[readonly]] على أي خاصية مش المفروض تتغير: ids، و dependencies، و value objects زي [[Money]].`,
            mistakes: R`تنسى الـ modifier ([[constructor(amount: number)]]) فمفيش خاصية بتتعمل، و [[this.amount]] يطلع خطأ. وتفتكر إن [[readonly]] بيجمّد الـ object. وتحط [[!]] على كل خاصية عشان TS2564 يسكت. وتستخدم parameter properties في مشروع شغال على [[node file.ts]] مباشرة فيقع. وفي الانترفيو: «parameter properties مش erasable، ليه ده مهم دلوقتي؟» بسبب type stripping و [[erasableSyntaxOnly]].`
          },
          teach: R`## الفكرة في سطر

لو حطيت [[public]] أو [[private]] أو [[protected]] أو [[readonly]] قبل باراميتر في الـ constructor، TS بيعمل خاصية بنفس الاسم ويملاها لوحده. و [[readonly]] بتمنع أي تعيين بعد الـ constructor.

الأخطاء تحت من [[npx tsc --strict --noEmit]] (TypeScript 6.0.3 على ويندوز 11، ونفسها على 7.0.2)، والتشغيل بـ [[tsc]] ثم [[node]]، وبـ [[npx tsx]]، وبـ [[node]] مباشرة على Node 24.

---

## ١. [[Money]]: الـ constructor الفاضي

~~~text app.ts
class Money {
  constructor(
    public readonly amount: number,
    public readonly currency: "EGP" | "USD",
  ) {}
~~~

نفك [[public readonly amount: number]]:

| الحتة | معناها |
|---|---|
| [[public]] | اعمل خاصية عامة بنفس اسم الباراميتر |
| [[readonly]] | ومحدش يغيّرها بعد الـ constructor |
| [[amount: number]] | اسم الباراميتر ونوعه |

و [[{}]] جسم الـ constructor فاضي، لأن TS هو اللي هيكتب التعيين. ده الـ JS اللي طلع فعلًا:

~~~text out/l13.js (أول الكلاس)
class Money {
    amount;
    currency;
    constructor(amount, currency) {
        this.amount = amount;
        this.currency = currency;
    }
~~~

يعني السطرين بقوا ٦ سطور JS حقيقية. وده معناه إن parameter properties **مش أنواع بس**: بتطلّع كود.

> الفاصلة بعد آخر باراميتر ([[currency: ...,]]) اسمها trailing comma، ومسموحة.

---

## ٢. [[add]]: بترجّع object جديد

~~~text app.ts
  add(other: Money): Money {
    if (other.currency !== this.currency) throw new Error("عملات مختلفة");
    return new Money(this.amount + other.amount, this.currency);
  }
}
const total = new Money(100, "EGP").add(new Money(50, "EGP"));
console.log(total.amount);
~~~

- [[other: Money]]: الباراميتر نوعه الكلاس نفسه.
- [[!==]]: «مش بيساوي» من غير تحويل أنواع.
- مش بنعدّل [[this.amount]] (ممنوع، readonly)، بنعمل [[new Money]] بالمجموع. الـ objects اللي متتغيرش دي اسمها value objects.

~~~text الناتج (node out/l13.js)
150
~~~

---

## ٣. أخطاء [[readonly]]

~~~text app.ts
total.amount = 0;
~~~

~~~text خطأ tsc
l13.ts(13,7): error TS2540: Cannot assign to 'amount' because it is a read-only property.
~~~

---

## ٤. [[Config]]: readonly من غير parameter property

~~~text app.ts
class Config {
  readonly port: number;
  constructor() {
    this.port = Number(process.env.PORT ?? 3000);
  }
  bump() { this.port++; }
}
~~~

- [[readonly port: number;]] تعريف عادي من غير قيمة.
- [[process.env.PORT ?? 3000]]: [[??]] (nullish coalescing) معناها «لو الشمال null أو undefined، خد اليمين».
- [[Number(...)]] بيحوّل النص لرقم، لأن متغيرات البيئة دايمًا نصوص.
- التعيين جوه الـ constructor مسموح، أما [[this.port++]] في method تانية لأ:

~~~text خطأ tsc
l13.ts(19,17): error TS2540: Cannot assign to 'port' because it is a read-only property.
~~~

ولو نسيت تملا الخاصية خالص في الـ constructor (جرّبنا [[class C { name: string; }]]):

~~~text خطأ tsc
error TS2564: Property 'name' has no initializer and is not definitely assigned in the constructor.
~~~

---

## ٥. مين بيفهم parameter properties؟

لأنها بتطلّع كود، مش كل أداة بتقبلها. جرّبنا نفس الملف بـ ٣ طرق:

| الأداة | النتيجة |
|---|---|
| [[tsc]] ثم [[node]] | شغال: [[150]] |
| [[npx tsx]] (esbuild) | شغال |
| [[node l13.ts]] (type stripping في Node 24) | SyntaxError |

~~~text الناتج (node l13.ts)
SyntaxError [ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX]: TypeScript parameter property is not supported in strip-only mode
~~~

Node بيشيل الأنواع بس (strip-only)، ومش بيكتب كود ناقص. والإعداد [[--erasableSyntaxOnly]] في tsc بيمسك ده بدري:

~~~text خطأ tsc
l13.ts(3,5): error TS1294: This syntax is not allowed when 'erasableSyntaxOnly' is enabled.
l13.ts(4,5): error TS1294: This syntax is not allowed when 'erasableSyntaxOnly' is enabled.
~~~

---

## ٦. حل التجربة: [[Product]]

~~~text الناتج (npx tsx)
1140
{"id":1,"name":"كيبورد ميكانيكال","price":1000}
~~~

- [[Math.round(this.price * 1.14)]]: ضريبة ١٤٪ ومقرّبة لأقرب رقم صحيح.
- [[price]] private بس طلعت في الـ JSON (فحص TS بس).

ولما فكّينا السطرين المتعلّقين:

~~~text خطأ tsc
error TS2540: Cannot assign to 'id' because it is a read-only property.
error TS2341: Property 'price' is private and only accessible within class 'Product'.
~~~

ولو نسيت الـ modifier ([[constructor(amount: number) {}]]) مفيش خاصية بتتعمل، و [[this.amount]] بتطلّع TS2339 (Property 'amount' does not exist).

---

## الخلاصة

| تكتب | الخاصية | تتغير بعدين؟ |
|---|---|---|
| [[constructor(public x: T)]] | عامة واتملت لوحدها | آه |
| [[constructor(private readonly x: T)]] | private واتملت لوحدها | لأ |
| [[constructor(x: T)]] | مفيش خاصية خالص | |
| [[readonly x: T;]] + تعيين في الـ constructor | عادية | لأ |`,
          lines: [
            "كلاس لقيمة فلوس.",
            "الـ constructor...",
            R`[[public readonly]] قبل الباراميتر: خاصية اتعملت واتملت لوحدها ومتتغيرش.`,
            "نفس الكلام، والنوع union من عملتين.",
            R`جسم الـ constructor فاضي: TS هو اللي هيكتب [[this.amount = amount]].`,
            R`method بترجّع [[Money]] جديد بدل ما تعدّل (عشان readonly).`,
            "متجمعش عملتين مختلفين.",
            "instance جديد بالمجموع.",
            "قفلة.",
            "قفلة الكلاس.",
            "جمع قيمتين.",
            "150.",
            R`[[readonly]]: TS2540 من برّه.`,
            "كلاس تاني بـ readonly عادي من غير parameter property.",
            "تعريف من غير قيمة...",
            "...ولازم تتملى في الـ constructor (وإلا TS2564).",
            "التعيين الوحيد المسموح.",
            "قفلة.",
            "حتى جوه الكلاس: TS2540 برّه الـ constructor.",
            "قفلة الكلاس."
          ],
          sol: R`[[priceWithVat()]] لسعر 1000 بترجّع [[1140]]، والـ JSON بيطلع [[{"id":1,"name":"كيبورد ميكانيكال","price":1000}]]: الـ [[price]] الـ private بتطلع عادي، لأن private فحص TS بس.

و [[p.id = 2]] بيطلّع TS2540 (Cannot assign to 'id' because it is a read-only property)، و [[p.price]] بيطلّع TS2341 (Property 'price' is private). أما [[p.name = ...]] مفيهوش مشكلة.

لو نسيت الـ modifier قبل [[price]] (كتبت [[price: number]] بس)، مش هتبقى خاصية أصلًا، و [[this.price]] جوه [[priceWithVat]] هيطلّع Property 'price' does not exist.`,
          solCode: R`class Product {
  constructor(
    public readonly id: number,
    public name: string,
    private price: number,
  ) {}
  priceWithVat(): number {
    return Math.round(this.price * 1.14);
  }
}
const p = new Product(1, "كيبورد", 1000);
p.name = "كيبورد ميكانيكال";
console.log(p.priceWithVat());   // 1140
console.log(JSON.stringify(p));  // {"id":1,"name":"كيبورد ميكانيكال","price":1000}
// p.id = 2;   // خطأ TS2540
// p.price;    // خطأ TS2341`
        },
        {
          cmd: "abstract و implements",
          title: "interface ولا abstract class: عقد بس، ولا عقد ومعاه كود؟",
          desc: R`[[class X implements Notifier]] بيخلي TS يتأكد إن الكلاس فيه كل اللي الـ interface طالبه. ده فحص بس: مبيورّثش أي كود، ومبيطلّعش حاجة في الـ JS.

[[abstract class]] كلاس مينفعش تعمل منه [[new]]، معمول عشان حد يورث منه. ممكن يبقى فيه كود حقيقي مشترك، و members معلّمة [[abstract]] من غير كود، وأي ابن لازم يكتبها.

الفرق المختصر: الـ interface عقد بس، وتقدر تطبّق كذا واحد. والـ abstract class عقد ومعاه كود مشترك، وتورث من واحد بس.`,
          example: R`interface Notifier {
  send(to: string, text: string): Promise<void>;
}
abstract class BaseNotifier implements Notifier {
  abstract readonly channel: string;
  protected abstract deliver(to: string, text: string): Promise<void>;
  async send(to: string, text: string) {
    console.log($__bt[$__{this.channel}] → $__{to}$__bt);
    await this.deliver(to, text);
  }
}
class SmsNotifier extends BaseNotifier {
  readonly channel = "sms";
  protected async deliver(to: string, text: string) {
    console.log("SMS:", text);
  }
}
class FakeNotifier implements Notifier {
  sent: string[] = [];
  async send(to: string, text: string) { this.sent.push(text); }
}
const n: Notifier = new SmsNotifier();
await n.send("+2010...", "كود التفعيل 4821");
new BaseNotifier(); // خطأ: Cannot create an instance of an abstract class
class EmailNotifier extends BaseNotifier {} // خطأ: missing implementations for 'channel', 'deliver'`,
          try: R`كمّل [[EmailNotifier]] صح (channel بـ [["email"]] و deliver بتطبع). واكتب [[async function notifyAll(list: Notifier[], to: string, text: string)]] بتبعت لكلهم مع بعض، وجرّبها مرة على SMS و Email، ومرة على [[FakeNotifier]] واطبع [[sent]]. وبعدين امسح الأنواع من باراميترات [[send]] في [[FakeNotifier]] وشوف [[implements]] بيدّيها أنواع ولا لأ.`,
          flag: "script",
          deep: {
            why: R`كود الباك مليان «حاجة واحدة وليها كذا تنفيذ»: إشعارات SMS و Email و Push، وتخزين ملفات local و S3، ودفع بـ Stripe أو Paymob. لو باقي الكود بيعتمد على الـ interface بس، تقدر تبدّل التنفيذ أو تحط fake في الاختبارات من غير ما تلمس حاجة. وده أساس الـ dependency injection اللي NestJS قايم عليه.`,
            how: R`[[implements]] مبيغيّرش نوع الكلاس ولا بيضيف حاجة: بيعمل فحص إن الكلاس assignable للـ interface. ولأن TS structural، [[FakeNotifier]] كان هيتقبل مكان [[Notifier]] حتى من غير [[implements]]. الفايدة إن الخطأ بيطلع عند تعريف الكلاس، مش في مكان بعيد بتستخدمه فيه.

ومهم: [[implements]] مبيدّيش أنواع لباراميترات الـ methods. [[send(to, text)]] في كلاس بيطبّق Notifier الباراميترات فيها implicit any (TS7006 مع strict). لازم تكتب الأنواع تاني.

[[abstract class]] بيفضل موجود في الـ JS ككلاس عادي (كلمة abstract بس هي اللي بتتمسح)، فتقدر تحط فيه كود مشترك زي [[send]] اللي بيطبع وبعدين ينادي [[deliver]]. ده نمط اسمه template method: الأب بيحدد الخطوات، والابن بيملا الخطوة اللي بتختلف. و [[new BaseNotifier()]] بيطلّع TS2511، وابن ناقصه member بيطلّع TS2654.

والـ interface بيتمسح خالص، فمينفعش [[x instanceof Notifier]]. الـ abstract class ينفع معاه instanceof، وده من أسباب إن NestJS بيستخدم abstract class كـ token للـ DI (قيمة موجودة وقت التشغيل) لما عايز «interface» يتحقن.`,
            when: R`interface لما عايز عقد بس (وده الأغلب، وأسهل في الاختبارات). abstract class لما فيه كود مشترك حقيقي بين كل التنفيذات، أو محتاج قيمة وقت التشغيل (instanceof أو DI token). ولو الكود المشترك صغير، composition (تبعت الـ helper كـ dependency) غالبًا أبسط من الوراثة.`,
            mistakes: R`تعمل abstract class وكل members فيه abstract ومفيهوش كود: ده interface بشكل أتقل. وتفتكر إن [[implements]] بيورّث كود أو أنواع للباراميترات. وتحاول [[instanceof]] على interface. وفي الانترفيو: «interface vs abstract class» الإجابة: عقد بس (وتطبّق كذا واحد، وبيتمسح) مقابل عقد وكود مشترك (وراثة من واحد، وموجود وقت التشغيل).`
          },
          teach: R`## الفكرة في سطر

[[interface]] عقد: «أي حاجة من النوع ده لازم يبقى فيها كذا». [[implements]] بيخلي TS يتأكد إن الكلاس ماشي مع العقد. و [[abstract class]] عقد ومعاه كود مشترك، ومينفعش تعمل منه [[new]].

الأخطاء تحت من [[npx tsc --strict --noEmit]] (TypeScript 6.0.3 على ويندوز 11، ونفسها على 7.0.2)، والتشغيل بـ [[npx tsx]] على Node 24 (الملف ES module عشان [[await]] برّه الدوال).

---

## ١. العقد

~~~text app.ts
interface Notifier {
  send(to: string, text: string): Promise<void>;
}
~~~

- [[send(...)]] من غير جسم: توقيع بس.
- [[Promise<void>]]: الدالة async ومبترجعش قيمة ليها معنى.

---

## ٢. [[BaseNotifier]]: abstract class

~~~text app.ts
abstract class BaseNotifier implements Notifier {
  abstract readonly channel: string;
  protected abstract deliver(to: string, text: string): Promise<void>;
  async send(to: string, text: string) {
    console.log($__bt[$__{this.channel}] → $__{to}$__bt);
    await this.deliver(to, text);
  }
}
~~~

| السطر | معناه |
|---|---|
| [[abstract class]] | مينفعش [[new BaseNotifier()]]، معمول للوراثة |
| [[implements Notifier]] | TS يتأكد إن فيه [[send]] بنفس التوقيع |
| [[abstract readonly channel]] | خاصية من غير قيمة: كل ابن لازم يحددها |
| [[protected abstract deliver(...)]] | method من غير كود: كل ابن لازم يكتبها، ومتتنادَاش من برّه |
| [[async send(...)]] | كود حقيقي مشترك بين كل الأبناء |

[[send]] بتطبع القناة وبعدين تنادي [[deliver]] بتاعة الابن. يعني الأب حدد الخطوات، والابن بيملا الخطوة اللي بتختلف (template method).

---

## ٣. ابن حقيقي

~~~text app.ts
class SmsNotifier extends BaseNotifier {
  readonly channel = "sms";
  protected async deliver(to: string, text: string) {
    console.log("SMS:", text);
  }
}
~~~

كتب الحاجتين الـ abstract، فبقى كلاس عادي ينفع [[new]] منه.

---

## ٤. كلاس من غير وراثة خالص

~~~text app.ts
class FakeNotifier implements Notifier {
  sent: string[] = [];
  async send(to: string, text: string) { this.sent.push(text); }
}
~~~

بيطبّق نفس العقد بطريقة تانية: بيحفظ الرسايل في array بدل ما يبعتها. ده اللي بتحطه في الاختبارات.

---

## ٥. الاستخدام

~~~text app.ts
const n: Notifier = new SmsNotifier();
await n.send("+2010...", "كود التفعيل 4821");
~~~

[[n]] نوعه الـ interface، فأي تنفيذ ينفع يتحط فيه.

~~~text الناتج (npx tsx)
[sms] → +2010...
SMS: كود التفعيل 4821
~~~

---

## ٦. السطرين الغلط

~~~text خطأ tsc
l14.ts(24,1): error TS2511: Cannot create an instance of an abstract class.
l14.ts(25,7): error TS2654: Non-abstract class 'EmailNotifier' is missing implementations for the following members of 'BaseNotifier': 'channel', 'deliver'.
~~~

---

## ٧. وقت التشغيل

~~~text out/l14.js (أول جزء)
class BaseNotifier {
    async send(to, text) {
        console.log($__bt[$__{this.channel}] → $__{to}$__bt);
        await this.deliver(to, text);
    }
}
~~~

- الـ [[interface]] اختفى خالص، و [[implements]] كمان.
- [[abstract]] اتشالت، والـ members الـ abstract مالهاش أي أثر، بس الكلاس نفسه فضل موجود.

عشان كده [[x instanceof Notifier]] مستحيل:

~~~text خطأ tsc
error TS2693: 'Notifier' only refers to a type, but is being used as a value here.
~~~

أما [[x instanceof BaseNotifier]] شغالة، لأنه كلاس حقيقي.

---

## ٨. [[implements]] مبيدّيش أنواع

جرّبنا نكتب [[async send(to, text) {}]] من غير أنواع في كلاس [[implements Notifier]]:

~~~text خطأ tsc
error TS7006: Parameter 'to' implicitly has an 'any' type.
error TS7006: Parameter 'text' implicitly has an 'any' type.
~~~

وجرّبنا نوع غلط [[async send(to: number) {}]]:

~~~text خطأ tsc
error TS2416: Property 'send' in type 'G' is not assignable to the same property in base type 'Notifier'.
~~~

يعني [[implements]] بيفحص بس، والأنواع لازم تكتبها تاني.

---

## ٩. حل التجربة: [[notifyAll]]

~~~text app.ts
async function notifyAll(list: Notifier[], to: string, text: string) {
  await Promise.all(list.map((n) => n.send(to, text)));
}
~~~

- [[list.map(...)]] بينادي [[send]] على كل واحد ويرجّع array من Promises.
- [[Promise.all]] بيستنى الكل يخلص مع بعض.

~~~text الناتج (npx tsx)
[sms] → sara
SMS: طلبك اتشحن
[email] → sara
EMAIL: sara طلبك اتشحن
[ 'omar: test' ]
~~~

ليه SMS خلصت طباعتها قبل ما email تبدأ؟ لأن [[send]] بتنادي [[deliver]] على طول، و [[deliver]] بتطبع قبل أي انتظار حقيقي، فكل [[send]] بتطبع سطرينها وهي لسه جوه [[map]].

---

## الخلاصة

| | interface | abstract class |
|---|---|---|
| فيه كود؟ | لأ | آه، وممكن members abstract |
| في الـ JS | بيختفي | كلاس عادي |
| [[instanceof]] | مستحيل | شغال |
| كام واحد | [[implements A, B]] | [[extends]] واحد بس |
| [[new]] منه | مش قيمة أصلًا | TS2511 |`,
          lines: [
            "العقد: أي notifier لازم يبقى فيه send.",
            "التوقيع بس من غير كود.",
            "قفلة.",
            R`[[abstract]]: مينفعش [[new]] منه، و [[implements]] بيتأكد إنه ماشي مع العقد.`,
            R`خاصية abstract: كل ابن لازم يحددها.`,
            R`method abstract و protected: الابن يكتبها، ومحدش ينادي عليها من برّه.`,
            "كود حقيقي مشترك بين كل الأبناء...",
            "...بيطبع القناة (اللي الابن حددها)...",
            "...وينادي الخطوة اللي بتختلف.",
            "قفلة.",
            "قفلة الكلاس.",
            "ابن حقيقي.",
            "حدد القناة.",
            "وكتب الخطوة الناقصة.",
            "بيبعت SMS (هنا بيطبع بس).",
            "قفلة.",
            "قفلة الكلاس.",
            R`كلاس تاني خالص بيطبّق نفس العقد من غير وراثة: مفيد في الاختبارات.`,
            "بيحفظ الرسايل بدل ما يبعتها.",
            R`[[implements]] مبيدّيش أنواع للباراميترات، فلازم تكتبها.`,
            "قفلة.",
            R`المتغير نوعه الـ interface، فأي تنفيذ ينفع.`,
            R`بيطبع [[[sms] → +2010...]] وبعدين الرسالة.`,
            "TS2511: مينفعش instance من abstract.",
            "TS2654: الابن لازم يكتب كل الـ abstract members."
          ],
          sol: R`[[notifyAll]] على SMS و Email بيطبع ٤ سطور: [[[sms] → sara]] و [[SMS: طلبك اتشحن]] و [[[email] → sara]] و [[EMAIL: sara طلبك اتشحن]] (الترتيب ده لأن [[send]] بتنادي [[deliver]] على طول، والاتنين بيطبعوا قبل أي انتظار حقيقي، فكل send بتخلص طباعتها قبل ما اللي بعدها تبدأ). ومع [[FakeNotifier]] مفيش حاجة بتتطبع، و [[fake.sent]] بيطلع [[[ 'omar: test' ]]].

ولما تمسح الأنواع من [[send(to, text)]] في [[FakeNotifier]]: [[tsc --strict]] بيطلّع TS7006 (Parameter 'to' implicitly has an 'any' type). يعني [[implements]] بيفحص بس، ومبيدّيش أنواع.`,
          solCode: R`// ... Notifier و BaseNotifier و SmsNotifier زي المثال
class EmailNotifier extends BaseNotifier {
  readonly channel = "email";
  protected async deliver(to: string, text: string) {
    console.log("EMAIL:", to, text);
  }
}
class FakeNotifier implements Notifier {
  sent: string[] = [];
  async send(to: string, text: string) {
    this.sent.push($__bt$__{to}: $__{text}$__bt);
  }
}
async function notifyAll(list: Notifier[], to: string, text: string) {
  await Promise.all(list.map((n) => n.send(to, text)));
}
await notifyAll([new SmsNotifier(), new EmailNotifier()], "sara", "طلبك اتشحن");
const fake = new FakeNotifier();
await notifyAll([fake], "omar", "test");
console.log(fake.sent); // [ 'omar: test' ]`
        },
        {
          cmd: "override",
          title: "تتأكد إن الـ method اللي بتكتبها في الابن بتغيّر method موجودة فعلًا في الأب",
          desc: R`[[override]] قبل method أو خاصية في الابن بتقول: «دي بتغيّر حاجة موجودة في الأب». لو مفيش حاجة بالاسم ده في الأب (غلطة إملائية، أو حد غيّر اسمها في الأب)، TS بيطلّع خطأ.

ومع [[noImplicitOverride]] في tsconfig بيبقى العكس كمان: أي member بيغيّر حاجة في الأب لازم يتكتب قبله [[override]]، فمفيش override بيحصل من غير ما تقصد. الوراثة نفسها ([[extends]] و [[super]]) في درس «extends و super» في «تاب JavaScript».`,
          example: R`class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
  toJSON() { return { status: this.status, message: this.message }; }
}
class NotFoundError extends HttpError {
  override name = "NotFoundError";
  constructor(what: string) {
    super(404, $__bt$__{what} مش موجود$__bt);
  }
  override toJSON() {
    return { ...super.toJSON(), hint: "اتأكد من الـ id" };
  }
  override toJSONN() { return {}; } // خطأ TS4117: مفيش toJSONN في الأب، Did you mean 'toJSON'?
}
const err = new NotFoundError("المنتج");
console.log(err.name, JSON.stringify(err));
// NotFoundError {"status":404,"message":"المنتج مش موجود","hint":"اتأكد من الـ id"}`,
          try: R`شيل السطر الغلط، وشغّل [[npx tsc --strict --noImplicitOverride]]. بعدين امسح كلمة [[override]] من السطرين وشغّل تاني. وأخيرًا رجّعها، وغيّر اسم [[toJSON]] في [[HttpError]] بس لـ [[toBody]] (من غير ما تلمس الابن): إيه اللي حصل، وكان هيحصل إيه لو مفيش [[override]]؟`,
          flag: "script",
          deep: {
            why: R`الوراثة فيها bug صامت كلاسيكي: الأب اتغيّر اسم method فيه، أو انت كتبت الاسم غلط في الابن، فالابن بقى بيعرّف method جديدة محدش بينادي عليها، والسلوك القديم رجع من غير أي خطأ. [[override]] بيحوّل ده لخطأ compile.`,
            how: R`[[override]] (من TS 4.3) فحص بس وبيتمسح. لو مكتوب على member مش موجود في الأب: TS4113، أو TS4117 لما يلاقي اسم قريب ويقترحه ([[Did you mean 'toJSON'?]]).

[[noImplicitOverride]] مش جزء من [[strict]]، لازم تشغّله لوحده. معاه، أي member بيغيّر حاجة في الأب من غير [[override]] بيطلّع TS4114 (This member must have an 'override' modifier). ده بيشمل الخصايص كمان: [[name]] هنا بتغيّر [[Error.prototype.name]]، فلازم [[override]].

وبيشتغل مع [[abstract]]: لما الابن يكتب member كان abstract في الأب، [[override]] مسموح بس مش إجباري حتى مع noImplicitOverride، لأن مفيش كود بيتغيّر.

و [[super.toJSON()]] بينادي نسخة الأب، فتضيف عليها بدل ما تكتبها من الأول.`,
            when: R`شغّل [[noImplicitOverride]] في أي مشروع فيه وراثة (errors مخصصة، أو كلاسات framework زي NestJS، أو أي base class). تكلفته صفر.`,
            mistakes: R`تفتكر إن [[noImplicitOverride]] جوه [[strict]]. وتفتكر إن [[override]] بيعمل حاجة وقت التشغيل: الـ override بيحصل بسبب الـ prototype chain سواء كتبتها ولا لأ. وفي الانترفيو: «إيه اللي بيحصل لو الأب غيّر اسم method والابن كان عاملها override؟» من غير الكلمة: ولا خطأ، والابن بقى فيه method يتيمة. معاها: خطأ compile.`
          },
          teach: R`## الفكرة في سطر

[[override]] قبل member في الابن معناها «أنا بغيّر حاجة موجودة في الأب»، و TS بيتأكد إنها موجودة فعلًا. ومع [[noImplicitOverride]] بيبقى إجباري: أي member بيغيّر حاجة في الأب لازم الكلمة قبله.

الأخطاء تحت من [[npx tsc --strict --noEmit]] (TypeScript 6.0.3 على ويندوز 11، ونفس الأكواد على 7.0.2)، والتشغيل بـ [[npx tsx]] على Node 24.

---

## ١. الأب: [[HttpError]]

~~~text app.ts
class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
  toJSON() { return { status: this.status, message: this.message }; }
}
~~~

- [[extends Error]]: بيورث من [[Error]] بتاع JS، فعنده [[message]] و [[name]] و [[stack]].
- [[public status: number]]: parameter property (الدرس اللي فات)، و [[message]] من غير modifier فده باراميتر عادي.
- [[super(message)]]: بينادي constructor الأب ([[Error]]) عشان يحط الرسالة. ولازم يتنادي قبل أي [[this]].
- [[toJSON()]]: لو object فيه method بالاسم ده، [[JSON.stringify]] بينادي عليها ويحوّل ناتجها بدل الـ object. ومن غيرها، [[JSON.stringify(new Error("x"))]] بيطلّع [[{}]] (جرّبناها في Node)، لأن [[message]] مش enumerable.

---

## ٢. الابن: [[NotFoundError]]

~~~text app.ts
class NotFoundError extends HttpError {
  override name = "NotFoundError";
  constructor(what: string) {
    super(404, $__bt$__{what} مش موجود$__bt);
  }
  override toJSON() {
    return { ...super.toJSON(), hint: "اتأكد من الـ id" };
  }
}
~~~

| السطر | معناه |
|---|---|
| [[override name = ...]] | [[name]] موجودة في [[Error]]، فدي بتغيّرها |
| [[super(404, ...)]] | constructor الأب: status و message |
| [[override toJSON()]] | بتغيّر [[toJSON]] بتاعة [[HttpError]] |
| [[super.toJSON()]] | بتنادي نسخة الأب |
| [[{ ...super.toJSON(), hint }]] | بتنسخ ناتج الأب وتزوّد [[hint]] |

~~~text app.ts
const err = new NotFoundError("المنتج");
console.log(err.name, JSON.stringify(err));
~~~

~~~text الناتج (npx tsx)
NotFoundError {"status":404,"message":"المنتج مش موجود","hint":"اتأكد من الـ id"}
~~~

---

## ٣. الغلطة الإملائية

~~~text app.ts
  override toJSONN() { return {}; }
~~~

~~~text خطأ tsc
error TS4117: This member cannot have an 'override' modifier because it is not declared in the base class 'HttpError'. Did you mean 'toJSON'?
~~~

TS4117 لما يلاقي اسم قريب ويقترحه، و TS4113 لما ميلاقيش.

---

## ٤. [[--noImplicitOverride]]: من غير الكلمة

شلنا [[override]] من السطرين:

~~~text خطأ tsc (مع --noImplicitOverride)
l15a.ts(8,3): error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'HttpError'.
l15a.ts(12,3): error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'HttpError'.
~~~

ونفس الملف بـ [[--strict]] بس عدّى من غير أخطاء: [[noImplicitOverride]] **مش** جزء من [[strict]]، لازم تشغّله لوحده.

---

## ٥. التجربة: الأب غيّر الاسم

غيّرنا [[toJSON]] في [[HttpError]] لـ [[toBody]]:

~~~text خطأ tsc (مع override)
l15b.ts(12,12): error TS4113: This member cannot have an 'override' modifier because it is not declared in the base class 'HttpError'.
l15b.ts(13,23): error TS2339: Property 'toJSON' does not exist on type 'HttpError'.
~~~

ومن غير [[override]]؟ هنا لسه فيه TS2339 لأن الابن بينادي [[super.toJSON()]]. بس جرّبنا ابن بيكتب [[toJSON]] بتاعته من غير [[super]] ([[return { status: this.status, hint: ... }]]): tsc عدّى بصفر أخطاء، والناتج:

~~~text الناتج (npx tsx)
NotFoundError {"status":404,"hint":"اتأكد من الـ id"}
~~~

الابن بقى عنده method «يتيمة» ملهاش علاقة بالأب، ومحدش قالك. ده بالظبط اللي [[override]] بيمنعه.

---

## الخلاصة

| الموقف | من غير override | مع override | مع noImplicitOverride |
|---|---|---|---|
| ابن بيغيّر member موجود | عادي | عادي | لازم الكلمة (TS4114) |
| اسم غلط أو الأب غيّر الاسم | بيعدّي بصمت | TS4113 أو TS4117 | TS4113 أو TS4117 |

و [[override]] بتتمسح من الـ JS: الـ override نفسه بيحصل بالـ prototype chain سواء كتبتها ولا لأ.`,
          lines: [
            "error أساسي بـ status (parameter property).",
            "constructor.",
            R`لازم [[super()]] قبل ما [[this]] يتستخدم.`,
            "قفلة.",
            R`[[JSON.stringify]] بينادي [[toJSON]] لو موجودة.`,
            "قفلة الكلاس.",
            "ابن متخصص.",
            R`[[name]] موجودة في [[Error]]، فالكلمة لازمة مع noImplicitOverride.`,
            "constructor بياخد اسم الحاجة.",
            "بيبني الرسالة وينادي الأب.",
            "قفلة.",
            R`بيغيّر [[toJSON]] بتاعة الأب، و TS متأكد إنها موجودة.`,
            R`بياخد نسخة الأب بـ [[super]] ويضيف عليها.`,
            "قفلة.",
            R`غلطة إملائية: [[override]] مسك إن مفيش حاجة بالاسم ده في الأب.`,
            "قفلة الكلاس.",
            "instance.",
            R`الاسم اتغير، و [[toJSON]] بتاعة الابن هي اللي اشتغلت.`
          ],
          sol: R`لما تمسح [[override]] وتشغّل بـ [[--noImplicitOverride]]: خطأين TS4114 (This member must have an 'override' modifier because it overrides a member in the base class 'HttpError')، واحد على [[name]] وواحد على [[toJSON]].

ولما ترجّعها وتغيّر اسم الأب لـ [[toBody]]: [[override toJSON()]] في الابن بيطلّع TS4113 (This member cannot have an 'override' modifier because it is not declared in the base class 'HttpError')، ومعاه TS2339 على [[super.toJSON()]] لأنها مبقتش موجودة. يعني الـ compiler قالك فورًا إن الابن بقى بيغيّر حاجة مش موجودة. ومن غير [[override]] الـ TS2339 بس هو اللي كان هيفضل، وده لأن الابن هنا بينادي [[super.toJSON()]]. لو الابن كاتب [[toJSON]] كاملة من غير [[super]]، الكود كان هيعدّي عادي، والابن بقى بيعرّف [[toJSON]] جديدة، وJSON هيطبع نسخة الابن، وأي كود كان بينادي [[toBody]] هيشتغل بنسخة الأب ومن غير الـ hint، ومحدش هيعرف.`
        },
        {
          cmd: "decorators",
          title: "دالة بتلف method أو class وتغيّر سلوكها: decorators بتاعة TC39",
          desc: R`الـ decorator دالة بتتكتب فوق class أو method أو field بـ [[@]]: [[@logged]]. بتستلم الحاجة اللي عليها، وتقدر ترجّع بديل ليها (مثلًا method ملفوفة بتطبع log قبل ما تنادي الأصلية).

من TS 5.0، [[@decorator]] من غير أي إعدادات معناها decorators الرسمية بتاعة JS (اقتراح TC39 في المرحلة ٣). كل decorator بياخد باراميترين: الحاجة نفسها، و [[context]] فيه اسمها ونوعها و [[addInitializer]]. وده غير النسخة القديمة [[experimentalDecorators]] اللي NestJS لسه عليها (الدرس الجاي)، والاتنين مش متوافقين.

ومهم: Node (جرّبت على 22 و 24) لسه مبيشغّلش decorators لوحده، فـ TS لازم يحوّلها: [[target]] يبقى [[es2022]] أو أقل. [[tsc --init]] بيحط [[esnext]]، ومعاه الـ [[@]] بتفضل زي ما هي في الـ JS و Node يقع بـ SyntaxError.`,
          example: R`type Method<This, Args extends unknown[], R> = (this: This, ...args: Args) => R;
function logged<This, Args extends unknown[], R>(
  target: Method<This, Args, R>,
  context: ClassMethodDecoratorContext<This, Method<This, Args, R>>,
) {
  const name = String(context.name);
  return function (this: This, ...args: Args): R {
    console.log($__bt→ $__{name}($__{args.join(", ")})$__bt);
    return target.call(this, ...args);
  };
}
function bound(_target: unknown, context: ClassMethodDecoratorContext) {
  context.addInitializer(function (this: any) {
    this[context.name] = this[context.name].bind(this);
  });
}
class Cart {
  total = 0;
  @logged
  add(price: number) {
    this.total += price;
    return this.total;
  }
  @bound
  reset() {
    this.total = 0;
  }
}
const cart = new Cart();
cart.add(50);    // → add(50)
const { reset } = cart;
reset();         // من غير bound: TypeError، لأن this بقت undefined
console.log(cart.total); // 0`,
          try: R`اكتب decorator اسمه [[@measure]] بيطبع الوقت اللي الـ method أخدته بـ [[performance.now()]]، ويشتغل صح مع method عادية ومع method [[async]] (لو الناتج Promise استنى يخلص قبل ما تطبع). جرّبه على method بتجمع مليون رقم، و method async فيها [[setTimeout]] 120ms. وبعدين غيّر [[--target]] لـ [[esnext]] وشغّل الناتج بـ node.`,
          flag: "script",
          deep: {
            why: R`فيه منطق بيتكرر حوالين methods كتير ومالوش علاقة بشغلها: log، وقياس وقت، و cache، و retry، وصلاحيات. الـ decorator بيخليك تكتبه مرة وتحطه بسطر فوق أي method بدل ما تنسخه جوه كل واحدة. وده اللي frameworks زي NestJS و Angular و TypeORM بانيين عليه شكلهم كله.`,
            how: R`method decorator بيتنادي مرة واحدة وقت تعريف الكلاس (مش مع كل نداء)، وبياخد الـ method الأصلية و context. لو رجّع دالة، هي اللي بتتحط مكان الأصلية على الـ prototype. عشان كده [[logged]] بترجّع wrapper بينادي [[target.call(this, ...args)]].

[[context.addInitializer]] بيسجّل دالة بتشتغل مع كل instance جديد، ودي اللي [[bound]] بيستخدمها عشان يربط [[this]] (مشكلة this لما تفصل method اتشرحت في «تاب JavaScript»).

فيه أنواع context لكل حاجة: [[ClassMethodDecoratorContext]] و [[ClassFieldDecoratorContext]] و [[ClassDecoratorContext]] و [[ClassAccessorDecoratorContext]]، والأخيرة مع كلمة جديدة [[accessor]] ([[@observed accessor count = 0]]) بتعمل getter و setter تقدر تلفهم.

وفيه [[context.metadata]] (من TS 5.2) تحط فيه بيانات تقراها بعدين من [[Class[Symbol.metadata]]]، بس محتاج [[Symbol.metadata]] يكون موجود: على Node 22 و 24 مش موجود، و [[context.metadata]] بيطلع undefined لحد ما تعمل polyfill ([[Symbol.metadata ??= Symbol("Symbol.metadata")]]).

والفرق الكبير عن القديم: الرسمية مفيهاش parameter decorators (زي [[@Body()]] على باراميتر)، ومفيهاش [[emitDecoratorMetadata]]. ومش كل الأدوات بتحوّلها: tsc و esbuild (tsx و Vite) بيحوّلوها، بس [[node file.ts]] (type stripping) لأ.`,
            when: R`منطق مشترك حوالين methods في كلاسات انت كاتبها (log و cache و retry و measure) لو المشروع أصلًا class-based. لو الكود functions عادية، higher-order function ([[withLog(fn)]]) أبسط ومش محتاجة أي إعداد. ولو شغال في NestJS أو Angular، انت ماشي على نظامهم، مش على الرسمية.`,
            mistakes: R`تشغّل [[target: esnext]] (افتراضي [[tsc --init]]) وتستغرب SyntaxError عند [[@]]. وتخلط بين الـ API القديم [[(target, key, descriptor)]] والجديد [[(value, context)]] فتنسخ decorator من مقال قديم ميشتغلش. وتنسى [[this]] في الـ wrapper ([[target(...args)]] بدل [[target.call(this, ...args)]]) فالـ method تفقد الـ instance. و wrapper لـ method async بيعمل [[result.finally(...)]] ويسيبه: لو الـ Promise اترفضت هيبقى عندك unhandled rejection زيادة، استخدم [[result.then(done, done)]]. وفي الانترفيو: «الـ decorator بيتنادي إمتى؟» مرة واحدة وقت تعريف الكلاس، مش مع كل نداء.`
          },
          teach: R`## الفكرة في سطر

الـ decorator دالة عادية بتكتب اسمها بعد [[@]] فوق method (أو class أو field). وقت تعريف الكلاس، JS بينادي الدالة دي مرة واحدة ويديها الـ method الأصلية، ولو رجّعت دالة جديدة، الجديدة هي اللي بتتحط مكانها.

جرّبنا على ويندوز 11 بـ TypeScript 6.0.3: [[tsc --strict --target es2022 --module nodenext]] وبعدين [[node]] على Node 24، ونفس النتيجة مع TS 7.0.2 (بيحوّل الـ decorators لـ es2022 عادي).

---

## ١. نوع مساعد

~~~text app.ts
type Method<This, Args extends unknown[], R> = (this: This, ...args: Args) => R;
~~~

نوع لأي method بـ ٣ باراميترات نوع:

| الباراميتر | معناه |
|---|---|
| [[This]] | نوع [[this]] جوه الـ method (الـ instance) |
| [[Args extends unknown[]]] | tuple الباراميترات، ولازم يبقى array |
| [[R]] | نوع الرجوع |

و [[(this: This, ...)]]: [[this]] كأول باراميتر حاجة خاصة بـ TS، بتحدد نوع [[this]] بس ومش باراميتر حقيقي (بيتمسح).

---

## ٢. [[logged]]: decorator بيرجّع wrapper

~~~text app.ts
function logged<This, Args extends unknown[], R>(
  target: Method<This, Args, R>,
  context: ClassMethodDecoratorContext<This, Method<This, Args, R>>,
) {
  const name = String(context.name);
  return function (this: This, ...args: Args): R {
    console.log($__bt→ $__{name}($__{args.join(", ")})$__bt);
    return target.call(this, ...args);
  };
}
~~~

### الباراميترين

- [[target]]: الـ method الأصلية نفسها (الدالة [[add]]).
- [[context]]: object فيه معلومات عنها: [[name]] (اسمها)، و [[kind]] ([["method"]])، و [[static]] و [[private]]، و [[addInitializer]]. ونوعه [[ClassMethodDecoratorContext]] جاي من مكتبة TS نفسها.

### الجسم

1. [[String(context.name)]]: الاسم ممكن يبقى string أو symbol، فبنحوّله نص.
2. [[return function (...) {...}]]: الدالة اللي هتتحط مكان [[add]] على الـ prototype.
3. [[args.join(", ")]]: الـ arguments مفصولة بفاصلة.
4. [[target.call(this, ...args)]]: نادي الأصلية بنفس [[this]] ونفس الـ arguments. [[call]] أول argument فيه هو قيمة [[this]].

> لازم [[function]] مش arrow function، عشان [[this]] يبقى الـ instance اللي نادى. الـ arrow بتاخد [[this]] من برّه.

---

## ٣. [[bound]]: decorator مبيرجّعش حاجة

~~~text app.ts
function bound(_target: unknown, context: ClassMethodDecoratorContext) {
  context.addInitializer(function (this: any) {
    this[context.name] = this[context.name].bind(this);
  });
}
~~~

- [[_target]]: الـ [[_]] في أول الاسم عرف معناه «مش هستخدمه».
- مبيرجّعش حاجة، فالـ method الأصلية بتفضل زي ما هي.
- [[context.addInitializer(fn)]]: سجّل [[fn]] تشتغل مع **كل** [[new Cart()]].
- [[this[context.name].bind(this)]]: نسخة من [[reset]] [[this]] بتاعها متثبّت على الـ instance، ومتحطوطة على الـ instance نفسه.

---

## ٤. الكلاس

~~~text app.ts
class Cart {
  total = 0;
  @logged
  add(price: number) {
    this.total += price;
    return this.total;
  }
  @bound
  reset() {
    this.total = 0;
  }
}
~~~

[[@logged]] لازقة فوق [[add]] على طول. ولاحظ إن مفيش أقواس: [[@logged]] مش [[@logged()]]، لأن [[logged]] نفسها هي الـ decorator.

---

## ٥. التشغيل

~~~text app.ts
const cart = new Cart();
cart.add(50);
const { reset } = cart;
reset();
console.log(cart.total);
~~~

- [[const { reset } = cart]] (destructuring): بياخد الـ method في متغير لوحده، فنداها مبقاش [[cart.reset()]]. وده بالظبط اللي بيحصل لما تبعت method كـ callback.

~~~text الناتج (tsc --target es2022 ثم node)
→ add(50)
0
~~~

ولما شلنا [[@bound]] وشغلنا تاني:

~~~text الناتج (npx tsx)
→ add(50)
TypeError: Cannot set properties of undefined (setting 'total')
~~~

جوه الكلاسات JS شغال strict mode، فـ [[this]] في نداء منفصل [[undefined]].

---

## ٦. ليه [[--target es2022]]؟

Node 24 لسه مبيفهمش [[@]]. بـ [[es2022]]، tsc بيحوّلها لكود عادي: helper اسمه [[__esDecorate]] و [[__runInitializers]] في أول الملف (حوالي ٣٠ سطر). أما بـ [[--target esnext]] (اللي [[tsc --init]] بيحطه):

~~~text الناتج (node على ناتج esnext)
    @logged
    ^
SyntaxError: Invalid or unexpected token
~~~

tsc ساب [[@logged]] زي ما هي في الـ JS، و Node وقع. ونفس الحاجة مع [[node app.ts]] مباشرة (type stripping). أما [[npx tsx]] شغال لأن esbuild بيحوّلها.

---

## ٧. حل التجربة: [[@measure]]

الفكرة الجديدة في الـ solCode:

~~~text measure.ts (الجزء المهم)
const start = performance.now();
const result = target.call(this, ...args);
const done = () => console.log($__bt$__{name}: $__{(performance.now() - start).toFixed(0)}ms$__bt);
if (result instanceof Promise) result.then(done, done);
else done();
return result;
~~~

- [[performance.now()]]: الوقت بالمللي ثانية بدقة عالية.
- لو الـ method async، [[result]] Promise لسه مخلصتش، فبنطبع لما تخلص ([[then(done, done)]]: في النجاح وفي الفشل).
- [[return result]]: نرجّع الأصلي زي ما هو.

~~~text الناتج (tsc --target es2022 ثم node)
sum: 5ms
499999500000
slow: 121ms
تمام
~~~

[[499999500000]] مجموع الأرقام من 0 لـ 999,999. و [[121ms]] لأن [[setTimeout]] 120 بيستنى **على الأقل** 120. والأرقام بتختلف حسب الجهاز.

---

## الخلاصة

| | معناه |
|---|---|
| بيتنادي إمتى | مرة واحدة وقت تعريف الكلاس |
| بياخد | [[(value, context)]] |
| لو رجّع دالة | بتتحط مكان الـ method |
| [[context.addInitializer]] | كود مع كل instance جديد |
| tsc | لازم [[target]] es2022 أو أقل عشان Node يشغّله |`,
          lines: [
            "نوع مساعد لأي method: this وباراميترات ونوع رجوع.",
            R`decorator generic عشان يحافظ على نوع الـ method اللي بيلفها.`,
            "الباراميتر الأول: الـ method الأصلية.",
            R`التاني: [[context]]، فيه الاسم و [[kind]] و [[addInitializer]].`,
            "بداية الجسم.",
            "اسم الـ method من الـ context.",
            R`بيرجّع دالة جديدة هتتحط مكان الأصلية.`,
            "log قبل النداء.",
            R`ينادي الأصلية بنفس [[this]] ونفس الـ arguments.`,
            "قفلة الـ wrapper.",
            "قفلة الـ decorator.",
            R`decorator تاني مش بيرجّع حاجة، فالـ method بتفضل زي ما هي.`,
            R`[[addInitializer]]: كود بيشتغل مع كل [[new Cart()]].`,
            R`بيحط على الـ instance نسخة مربوطة بـ [[bind]].`,
            "قفلة.",
            "قفلة.",
            "الكلاس.",
            "field عادي.",
            R`الـ decorator فوق الـ method على طول.`,
            "method عادية.",
            "تعديل.",
            "رجوع.",
            "قفلة.",
            R`[[@bound]] على reset.`,
            "method.",
            "تصفير.",
            "قفلة.",
            "قفلة الكلاس.",
            "instance.",
            R`بيطبع [[→ add(50)]] قبل ما يجمع.`,
            R`فصلنا الـ method عن الـ object.`,
            R`اشتغلت صح لأن [[bound]] ربطها.`,
            "0."
          ],
          sol: R`الناتج شكله كده (الأرقام بتختلف حسب الجهاز): [[sum: 5ms]] وبعدين [[499999500000]]، وبعدين [[slow: 121ms]] وبعدين [[تمام]]. المهم إن وقت [[slow]] حوالي 120ms أو أكتر: لو طلعلك 0ms يبقى طبعت الوقت أول ما الـ Promise اترجعت، مش لما خلصت.

الحيلة: لو الناتج [[instanceof Promise]]، اطبع في [[then]]. واستخدم [[result.then(done, done)]] مش [[result.finally(done)]]، لأن finally بترجّع Promise جديدة ولو الأصلية اترفضت، الجديدة دي كمان هتترفض ومحدش ماسكها. ورجّع [[result]] الأصلي زي ما هو عشان اللي بينادي يعمل await و catch عادي.

ومع [[--target esnext]]: tsc بيعدّي من غير أخطاء، بس [[node]] على الناتج بيقع بـ [[SyntaxError: Invalid or unexpected token]] عند [[@measure]]، لأن TS ساب الـ decorator زي ما هو و Node مبيفهموش.`,
          solCode: R`function measure<This, Args extends unknown[], R>(
  target: (this: This, ...args: Args) => R,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => R>,
) {
  const name = String(context.name);
  return function (this: This, ...args: Args): R {
    const start = performance.now();
    const result = target.call(this, ...args);
    const done = () => console.log($__bt$__{name}: $__{(performance.now() - start).toFixed(0)}ms$__bt);
    if (result instanceof Promise) result.then(done, done);
    else done();
    return result;
  };
}
class Reports {
  @measure
  sum(n: number) {
    let s = 0;
    for (let i = 0; i < n; i++) s += i;
    return s;
  }
  @measure
  async slow() {
    await new Promise((r) => setTimeout(r, 120));
    return "تمام";
  }
}
const r = new Reports();
console.log(r.sum(1_000_000));
console.log(await r.slow());
// npx tsc --strict --target es2022 --module nodenext --types node measure.ts && node measure.js`
        },
        {
          cmd: "experimentalDecorators و NestJS",
          title: "NestJS بيعرف يحقن الـ dependencies من نوع الباراميتر إزاي؟",
          desc: R`NestJS (زي Angular و TypeORM) مبني على النسخة القديمة من الـ decorators: [[experimentalDecorators]] مع [[emitDecoratorMetadata]] في tsconfig. ولحد NestJS 12، التمبلت بتاع [[nest new]] لسه بيحط الاتنين.

الخيار التاني هو السر: TS بيكتب في الـ JS أنواع باراميترات الـ constructor كقيم ([[design:paramtypes]]). فلما تكتب [[constructor(private readonly db: Db)]]، Nest بيقرا الـ metadata، يلاقي [[Db]]، يعمل منه instance (أو ياخد الموجود)، ويبعته. ده الـ dependency injection. المثال بيبني نسخة صغيرة من الفكرة دي بـ [[reflect-metadata]].

وفي Nest الشكل كده: [[@Controller("users")]] على الكلاس، و [[@Get(":id")]] على الـ method، و [[@Param("id")]] و [[@Body()]] على الباراميترات، و [[@Injectable()]] على الـ service. التفاصيل في «تاب Backend بـ Node».`,
          example: R`// npm i reflect-metadata
// npx tsc --strict --target es2023 --module nodenext --types node --experimentalDecorators --emitDecoratorMetadata di.ts
import "reflect-metadata";
type Ctor<T = unknown> = new (...args: any[]) => T;
function Injectable(): ClassDecorator {
  return () => {};
}
function resolve<T>(cls: Ctor<T>): T {
  const deps: Ctor[] = Reflect.getMetadata("design:paramtypes", cls) ?? [];
  return new cls(...deps.map((d) => resolve(d)));
}
@Injectable()
class Db {
  query(sql: string) { return [{ id: 1, sql }]; }
}
@Injectable()
class UsersService {
  constructor(private readonly db: Db) {}
  findAll() { return this.db.query("select * from users"); }
}
const users = resolve(UsersService);
console.log(users.findAll()); // [ { id: 1, sql: 'select * from users' } ]`,
          try: R`شغّل المثال بـ tsc بالإعدادات اللي في التعليق وبعدين [[node di.js]]. بعدها شغّله بـ [[npx tsx di.ts]] وقارن. وأخيرًا ضيف [[@Injectable() class Mailer]] الـ constructor بتاعه بياخد [[UsersService]] و [[Db]]، وفيه method [[welcomeAll()]] بترجّع [[welcome #1]] لكل user، واطلبه بـ [[resolve(Mailer)]].`,
          flag: "script",
          deep: {
            why: R`NestJS من أكتر الـ backends المطلوبة في إعلانات الشغل، وشكله مختلف تمامًا عن Express: كل حاجة كلاس عليه decorators، ومحدش بيعمل [[new]] بإيده. لو مش فاهم إن ده كله TS metadata وقت الـ build، الأخطاء زي «Nest can't resolve dependencies of UsersService (?)» هتبان سحر.`,
            how: R`مع [[experimentalDecorators]]، الـ decorators بتشتغل بالتوقيع القديم: class decorator بياخد الـ constructor، و method decorator بياخد [[(target, key, descriptor)]]، وفيه parameter decorators ([[@Body()]] و [[@Inject(TOKEN)]]) اللي الرسمية معندهاش خالص. وده السبب الأساسي إن Nest فاضل عليها.

ومع [[emitDecoratorMetadata]]، على أي كلاس أو method عليها decorator، TS بيضيف في الـ JS نداء زي [[__metadata("design:paramtypes", [Db])]]. يعني نوع اتحول لقيمة وقت التشغيل، وده الاستثناء الوحيد تقريبًا لقاعدة «الأنواع بتتمسح». وبيشتغل بس لو النوع كلاس (قيمة موجودة): لو الباراميتر interface أو union، الـ metadata بتبقى [[Object]] ومفيش حاجة تتحقن. عشان كده Nest بيستخدم كلاسات أو [[@Inject("TOKEN")]].

[[reflect-metadata]] polyfill بيضيف [[Reflect.getMetadata]]، و Nest بيستورده لوحده. والـ [[resolve]] في المثال بيعمل instance جديد كل مرة، أما Nest بيعمل instance واحد لكل provider (singleton) جوه الـ module ويعيد استخدامه.

الـ metadata بيكتبها tsc بس (و SWC لو شغلت الخيار ده فيه). esbuild (tsx و Vite) مبيكتبهاش، فـ [[resolve]] بيلاقي مفيش dependencies ويعمل [[new UsersService()]] من غير Db.

واتنين في tsconfig بتاع Nest لازم تعرفهم: [[strictPropertyInitialization: false]] (عشان DTOs زي [[class CreateUserDto { name: string }]] من غير constructor)، و [[target]] ES2023 مش esnext.`,
            when: R`في مشروع NestJS أو Angular أو TypeORM: سيب الإعدادات زي ما التمبلت عاملها ومتحاولش تحوّل للرسمية. في كود جديد مش مربوط بـ framework منهم: الرسمية (الدرس اللي فات)، أو من غير decorators خالص.`,
            mistakes: R`تشغّل Nest بـ tsx أو esbuild فيطلع [[Cannot read properties of undefined]] على dependency، أو Nest يقول can't resolve. وتكتب [[import type { Db }]] أو النوع interface فالـ metadata تبقى Function أو Object بدل الكلاس (جرّبتها بـ [[import type]] وطلعت [[[Function: Function]]]). ودوائر: A محتاج B و B محتاج A، والحل في Nest [[forwardRef]]. وتنسخ decorator رسمي في مشروع شغال بـ [[experimentalDecorators]] أو العكس. وفي الانترفيو: «إزاي Nest بيعرف يحقن من غير ما تقوله؟» الإجابة: [[emitDecoratorMetadata]] بيكتب أنواع الـ constructor كـ [[design:paramtypes]]، و Nest بيقراها بـ [[reflect-metadata]].`
          },
          teach: R`## الفكرة في سطر

مع [[emitDecoratorMetadata]]، tsc بيكتب في الـ JS أنواع باراميترات الـ constructor كقيم حقيقية. الـ DI container (زي NestJS) بيقرا الليستة دي، ويبني كل dependency، ويبعتها للـ constructor لوحده. المثال بيبني container صغير بالفكرة دي.

جرّبنا على ويندوز 11 بـ TypeScript 6.0.3 و [[reflect-metadata]] و Node 24، بالأمر اللي في تعليق المثال. ونفس الناتج مع TS 7.0.2 (بيدعم [[experimentalDecorators]] و [[emitDecoratorMetadata]]).

---

## ١. أمر الـ compile

~~~bash
npx tsc --strict --target es2023 --module nodenext --types node --experimentalDecorators --emitDecoratorMetadata di.ts
~~~

| الخيار | معناه |
|---|---|
| [[--target es2023]] | اكتب JS بمستوى ES2023 |
| [[--module nodenext]] | الـ imports بنظام Node الحديث (ESM لأن package.json فيه [["type": "module"]]) |
| [[--types node]] | ضيف أنواع Node |
| [[--experimentalDecorators]] | الـ decorators القديمة، مش الرسمية |
| [[--emitDecoratorMetadata]] | اكتب أنواع الباراميترات في الـ JS |

---

## ٢. السطور الأولى

~~~text di.ts
import "reflect-metadata";
type Ctor<T = unknown> = new (...args: any[]) => T;
function Injectable(): ClassDecorator {
  return () => {};
}
~~~

- [[import "reflect-metadata"]]: import من غير أسماء، معناه «شغّل الملف ده بس». بيضيف [[Reflect.getMetadata]] على [[Reflect]] الموجود في JS (polyfill).
- [[Ctor<T>]]: نوع «أي حاجة ينفع تعمل منها [[new]]» وبترجع T. و [[T = unknown]] قيمة افتراضية للنوع.
- [[Injectable()]]: **factory** بيرجّع decorator، عشان كده بنكتب [[@Injectable()]] بأقواس (زي Nest). و [[ClassDecorator]] نوع الـ decorators القديمة للكلاسات.
- الـ decorator نفسه [[() => {}]] مبيعملش حاجة! وجوده بس هو اللي بيخلي tsc يكتب الـ metadata للكلاس ده.

---

## ٣. الـ container: [[resolve]]

~~~text di.ts
function resolve<T>(cls: Ctor<T>): T {
  const deps: Ctor[] = Reflect.getMetadata("design:paramtypes", cls) ?? [];
  return new cls(...deps.map((d) => resolve(d)));
}
~~~

1. [[Reflect.getMetadata("design:paramtypes", cls)]]: هات ليستة أنواع باراميترات الـ constructor بتاع [[cls]].
2. [[?? []]]: لو مفيش، خد array فاضي.
3. [[deps.map((d) => resolve(d))]]: ابني كل dependency بنفس الدالة (recursion: الدالة بتنادي نفسها)، فلو هي كمان ليها dependencies هتتبني.
4. [[new cls(...)]]: اعمل الكلاس وابعتله الكل بالترتيب.

---

## ٤. الكلاسين

~~~text di.ts
@Injectable()
class Db {
  query(sql: string) { return [{ id: 1, sql }]; }
}
@Injectable()
class UsersService {
  constructor(private readonly db: Db) {}
  findAll() { return this.db.query("select * from users"); }
}
~~~

[[private readonly db: Db]] parameter property. والمهم: النوع [[Db]] **كلاس**، يعني قيمة موجودة وقت التشغيل.

---

## ٥. اللي tsc كتبه فعلًا

~~~text di.js (آخر الملف)
let UsersService = class UsersService {
    db;
    constructor(db) {
        this.db = db;
    }
    findAll() { return this.db.query("select * from users"); }
};
UsersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Db])
], UsersService);
~~~

السطر [[__metadata("design:paramtypes", [Db])]] هو السر كله: النوع [[Db]] اللي كان مكتوب بعد [[:]] بقى قيمة في الـ JS. وده الاستثناء الكبير لقاعدة «الأنواع بتتمسح».

---

## ٦. التشغيل

~~~text di.ts
const users = resolve(UsersService);
console.log(users.findAll());
~~~

~~~text الناتج (node di.js)
[ { id: 1, sql: 'select * from users' } ]
~~~

محدش كتب [[new Db()]]: [[resolve]] قرا [[[Db]]] وبناها.

ونفس الملف بـ [[npx tsx di.ts]]:

~~~text الناتج (npx tsx)
TypeError: Cannot read properties of undefined (reading 'query')
~~~

esbuild (اللي جوه tsx) مبيكتبش [[design:paramtypes]]، فـ [[resolve]] لقى ليستة فاضية وعمل [[new UsersService()]] من غير Db.

---

## ٧. حل التجربة: [[Mailer]]

~~~text الناتج (node di2.js)
[ 'welcome #1' ]
[ [class UsersService], [class Db] ]
~~~

السطر التاني هو الـ metadata اللي tsc كتبها لـ [[Mailer]]: الكلاسين بالترتيب. و [[resolve]] بنى [[UsersService]] (ومعاها [[Db]] جديدة)، وبنى [[Db]] تانية لـ [[Mailer]]. Nest كان هيدّي الاتنين نفس الـ [[Db]] (singleton).

---

## الخلاصة

| الأداة | بتكتب design:paramtypes؟ | Nest يشتغل؟ |
|---|---|---|
| tsc مع [[emitDecoratorMetadata]] | آه | آه |
| tsx و Vite (esbuild) | لأ | الـ dependencies بتيجي undefined |
| SWC | لو فعّلت الخيار ده فيه | آه |

ولو النوع interface أو اتعمل [[import type]]، الـ metadata مبتبقاش الكلاس، و Nest ميعرفش يحقن.`,
          lines: [
            R`polyfill بيضيف [[Reflect.getMetadata]] و [[Reflect.defineMetadata]].`,
            R`نوع «أي كلاس ينفع يتعمل منه [[new]]».`,
            R`decorator بالتوقيع القديم، زي [[@Injectable()]] في Nest.`,
            R`مبيعملش حاجة: وجوده بس بيخلي TS يكتب metadata الكلاس.`,
            "قفلة.",
            "الـ container بتاعنا: بيبني أي كلاس بالـ dependencies بتاعته.",
            R`بيقرا أنواع باراميترات الـ constructor اللي TS كتبها كقيم.`,
            "يبني كل dependency (بنفس الطريقة) ويبعتهم للـ constructor.",
            "قفلة.",
            "decorator على الكلاس.",
            R`dependency مفيهاش dependencies.`,
            "بترجّع داتا وهمية.",
            "قفلة.",
            "service تانية.",
            "بتعتمد على Db...",
            R`[[private readonly db: Db]]: parameter property، و TS كتب [[Db]] في الـ metadata.`,
            R`بتستخدم الـ db اللي اتحقن.`,
            "قفلة.",
            R`محدش كتب [[new Db()]]: الـ container هو اللي عملها.`,
            R`بيطبع الصف، يعني [[db]] اتحقن صح.`
          ],
          sol: R`بـ tsc و node: بيطبع [[[ { id: 1, sql: 'select * from users' } ]]].

بـ [[npx tsx di.ts]]: [[TypeError: Cannot read properties of undefined (reading 'query')]]. esbuild مكتبش [[design:paramtypes]]، فـ [[resolve]] لقى ليستة فاضية وعمل [[new UsersService()]] من غير Db. ده بالظبط اللي بيحصل لو شغلت Nest بأداة مبتكتبش decorator metadata.

و [[resolve(Mailer).welcomeAll()]] بيطبع [[[ 'welcome #1' ]]]، و [[Reflect.getMetadata("design:paramtypes", Mailer)]] بيطلع [[[ [class UsersService], [class Db] ]]]: الـ container بنى UsersService (ومعاها Db) وبنى Db تانية لـ Mailer. في Nest كانوا هيبقوا نفس الـ Db (singleton).`,
          solCode: R`// نفس المثال، وتحت UsersService:
@Injectable()
class Mailer {
  constructor(private readonly users: UsersService, private readonly db: Db) {}
  welcomeAll() {
    return this.users.findAll().map((u) => $__btwelcome #$__{u.id}$__bt);
  }
}
console.log(resolve(Mailer).welcomeAll());                      // [ 'welcome #1' ]
console.log(Reflect.getMetadata("design:paramtypes", Mailer));  // [ [class UsersService], [class Db] ]`
        },
        {
          cmd: "generic classes",
          title: "كلاس واحد يشتغل مع أي نوع ويفضل فاكره",
          desc: R`زي الدوال الـ generic (درس [[generics]])، الكلاس ممكن ياخد باراميتر نوع: [[class TtlCache<K, V>]]. كل instance بيتثبّت على نوع: [[new TtlCache<number, User>()]]، وبعد كده كل الـ methods عارفة إن المفتاح number والقيمة User.

وتقدر تحط constraint زي الدوال: [[class Repository<T extends { id: number }>]].`,
          example: R`class TtlCache<K, V> {
  #store = new Map<K, { value: V; expires: number }>();
  constructor(private readonly ttlMs: number) {}
  set(key: K, value: V): void {
    this.#store.set(key, { value, expires: Date.now() + this.ttlMs });
  }
  get(key: K): V | undefined {
    const hit = this.#store.get(key);
    if (!hit || hit.expires < Date.now()) return undefined;
    return hit.value;
  }
}
type User = { id: number; name: string };
const users = new TtlCache<number, User>(60_000);
users.set(1, { id: 1, name: "sara" });
console.log(users.get(1)?.name); // "sara"
users.set("1", { id: 1, name: "sara" }); // خطأ: string مش number
const loose = new TtlCache(1000); // K و V بقوا unknown
loose.set("x", 5);                // أي حاجة تعدّي`,
          try: R`اكتب [[class Repository<T extends { id: number }>]] فيه [[add(item)]] و [[findById(id)]] و [[all()]] على [[Map]] private. جرّبه على [[User]] وعلى [[Product]] ([[id]] و [[title]] و [[price]]). وبعدين جرّب [[new Repository<string>()]] و [[users.add({ id: 2 })]].`,
          flag: "script",
          deep: {
            why: R`الـ repositories والـ caches والـ queues والـ stores شكلها واحد مهما كان نوع الداتا. من غير generics يا تكتب كلاس لكل نوع، يا تستخدم [[any]] وتخسر الفحص. والـ SDKs مليانة الشكل ده ([[new Map<K, V>]] نفسه كلاس generic).`,
            how: R`باراميتر النوع بيتحدد مع [[new]]: يا تكتبه صريح [[new TtlCache<number, User>(...)]]، يا TS يستنتجه من arguments الـ constructor. في [[TtlCache]] الـ constructor بياخد [[ttlMs]] بس، فمفيش حاجة يستنتج منها K و V، فبيبقوا [[unknown]] وأي حاجة تعدّي. عشان كده اكتبهم لما الـ constructor مبيكشفهمش.

الـ static members مينفعش تستخدم باراميترات النوع ([[static empty: T]] بيطلّع TS2302)، لأن الـ static واحد للكلاس كله، والـ T بتختلف مع كل instance.

والـ generics بتتمسح زي أي نوع: [[new TtlCache<number, User>()]] و [[new TtlCache<string, Product>()]] نفس الكلاس وقت التشغيل، فمينفعش تسأل الـ instance «انت T بتاعك إيه؟».

وتقدر تحط default: [[class Page<T = unknown>]]، و constraint زي الدوال بالظبط.`,
            when: R`كلاسات «حاوية» لداتا: cache، و repository، و event emitter بأنواع events، و result wrapper. لو الكلاس بيتعامل مع نوع واحد بس، متعملوش generic.`,
            mistakes: R`[[new Cache()]] من غير أنواع فكله unknown (أو any في كود قديم). و generic كلاس بـ ٤ باراميترات محدش فاهمها. وتفتكر إنك تقدر تعمل [[new T()]] جوه الكلاس: T نوع ومش موجود وقت التشغيل، لازم تبعت الكلاس نفسه كباراميتر ([[ctor: new () => T]]).`
          },
          teach: R`## الفكرة في سطر

الكلاس ممكن ياخد باراميترات نوع بين [[< >]] بعد اسمه، زي الدوال الـ generic. كل instance بيتثبّت على أنواع معينة، وكل الـ methods بتعرفها.

الأنواع والأخطاء تحت من TypeScript 6.0.3 على ويندوز 11 ([[npx tsc --strict --noEmit]])، والتشغيل بـ [[npx tsx]] على Node 24.

---

## ١. التعريف

~~~text app.ts
class TtlCache<K, V> {
  #store = new Map<K, { value: V; expires: number }>();
  constructor(private readonly ttlMs: number) {}
~~~

| الحتة | معناها |
|---|---|
| [[TtlCache<K, V>]] | الكلاس بياخد نوعين: K للمفتاح و V للقيمة |
| [[#store]] | private field حقيقي (درس public و private) |
| [[new Map<K, ...>()]] | Map مفاتيحه K، وقيمه object فيه القيمة ووقت انتهائها |
| [[private readonly ttlMs]] | parameter property: مدة الصلاحية بالمللي ثانية |

TTL اختصار Time To Live: القيمة بتعيش قد إيه في الـ cache.

---

## ٢. [[set]] و [[get]]

~~~text app.ts
  set(key: K, value: V): void {
    this.#store.set(key, { value, expires: Date.now() + this.ttlMs });
  }
  get(key: K): V | undefined {
    const hit = this.#store.get(key);
    if (!hit || hit.expires < Date.now()) return undefined;
    return hit.value;
  }
}
~~~

- [[Date.now()]]: الوقت الحالي بالمللي ثانية، فـ [[expires]] = دلوقتي + المدة.
- [[V | undefined]]: يا القيمة، يا مفيش (المفتاح مش موجود أو انتهى).
- [[!hit || hit.expires < Date.now()]]: «مش موجود، **أو** وقته عدّى».

---

## ٣. instance بأنواع صريحة

~~~text app.ts
type User = { id: number; name: string };
const users = new TtlCache<number, User>(60_000);
users.set(1, { id: 1, name: "sara" });
console.log(users.get(1)?.name);
~~~

- [[<number, User>]] بعد اسم الكلاس مع [[new]]: K = number و V = User.
- [[60_000]]: الـ [[_]] جوه الرقم فاصل للقراية بس، يعني 60000 (دقيقة).
- [[?.]] (optional chaining): لو [[get]] رجعت undefined، متكمّلش واطلع undefined بدل crash.

~~~text الناتج (الأنواع)
const users: TtlCache<number, User>
const g: User | undefined          (users.get(1))
~~~

~~~text الناتج (npx tsx)
sara
~~~

ومفتاح من نوع غلط:

~~~text خطأ tsc
users.set("1", { id: 1, name: "sara" });
error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
~~~

---

## ٤. من غير أنواع: [[unknown]]

~~~text app.ts
const loose = new TtlCache(1000);
loose.set("x", 5);
~~~

~~~text الناتج (النوع)
const loose: TtlCache<unknown, unknown>
~~~

TS بيستنتج الأنواع من arguments الـ constructor، والـ constructor هنا بياخد [[ttlMs]] بس، ومفيهوش أي حاجة عن K أو V. فبقوا [[unknown]]، وأي حاجة بتعدّي. ولو طبعت [[loose.get("x")]] هتاخد [[5]]، بس نوعها [[unknown]] ومش هتعرف تعمل بيها حاجة من غير فحص.

---

## ٥. حاجات ممنوعة

جرّبنا:

~~~text app.ts
class Box<T> { static empty: T; }
class Mk<T> { make() { return new T(); } }
~~~

~~~text خطأ tsc
error TS2302: Static members cannot reference class type parameters.
error TS2693: 'T' only refers to a type, but is being used as a value here.
~~~

- الـ [[static]] واحد للكلاس كله، و T بتختلف من instance للتاني.
- T نوع بيتمسح، فمفيش حاجة اسمها T وقت التشغيل تعمل منها [[new]].

---

## ٦. حل التجربة: [[Repository<T extends { id: number }>]]

[[extends { id: number }]] constraint: «أي T، بشرط يبقى فيها [[id]] رقم». ده اللي بيسمح بـ [[item.id]] جوه [[add]].

~~~text الناتج (npx tsx)
sara
[ 350 ]
~~~

- [[[...this.#items.values()]]]: [[values()]] بترجع iterator، و [[[...]]] بيحوّله array.

والأخطاء:

~~~text خطأ tsc (TS 6.0.3)
error TS2344: Type 'string' does not satisfy the constraint '{ id: number; }'.
error TS2345: Argument of type '{ id: number; }' is not assignable to parameter of type 'User'.
  Property 'name' is missing in type '{ id: number; }' but required in type 'User'.
error TS2339: Property 'id' does not exist on type 'T'.
~~~

١. [[new Repository<string>()]]: string ملهاش id.
٢. [[users.add({ id: 2 })]]: الـ repository ده بتاع User، و [[name]] ناقصة. (TS 7.0.2 بيطلّع هنا TS2741 على طول: Property 'name' is missing...)
٣. [[class R2<T>]] من غير constraint: TS ميعرفش إن T فيها id.

---

## الخلاصة

| تكتب | النتيجة |
|---|---|
| [[class C<T>]] | باراميتر نوع للكلاس كله |
| [[new C<User>()]] | instance ثابت على User |
| [[new C()]] من غير arguments توضّح | T بيبقى unknown |
| [[class C<T extends X>]] | T لازم يبقى فيه شكل X |
| [[static x: T]] أو [[new T()]] | ممنوع |`,
          lines: [
            R`كلاس بنوعين: المفتاح [[K]] والقيمة [[V]].`,
            R`[[Map]] private بنفس الأنواع، وكل قيمة معاها وقت انتهاء.`,
            "parameter property: مدة الصلاحية.",
            R`[[set]] بياخد K و V بس.`,
            "بيخزن القيمة ووقت انتهائها.",
            "قفلة.",
            R`[[get]] بترجّع V أو undefined.`,
            "بيدوّر.",
            "مش موجود أو انتهى: undefined.",
            "القيمة بنوعها V.",
            "قفلة.",
            "قفلة الكلاس.",
            "نوع.",
            "instance ثابت على number و User.",
            "مسموح.",
            R`TS عارف إن الناتج User، فـ [[name]] بتكمّل.`,
            R`المفتاح لازم number: TS2345.`,
            R`من غير أنواع ومن غير arguments توضّحها: K و V بقوا [[unknown]].`,
            "فأي نوع مقبول، والفحص راح."
          ],
          sol: R`الناتج [[sara]] وبعدين [[[ 350 ]]]. و [[users.findById(1)]] نوعها [[User | undefined]]، فلازم [[?.]] أو فحص.

و [[new Repository<string>()]] بيطلّع TS2344 (Type 'string' does not satisfy the constraint '{ id: number; }')، و [[users.add({ id: 2 })]] بيطلّع TS2345 وتحته Property 'name' is missing (و TS 7 بيطلّعها TS2741 على طول): الـ repository فاكر إنه بتاع User.

ولو كتبت الكلاس من غير constraint ([[class Repository<T>]])، [[item.id]] جوه [[add]] هتطلّع Property 'id' does not exist on type 'T'. الـ constraint هو اللي بيقول لـ TS إن أي T فيها id.`,
          solCode: R`class Repository<T extends { id: number }> {
  #items = new Map<number, T>();
  add(item: T): T {
    this.#items.set(item.id, item);
    return item;
  }
  findById(id: number): T | undefined {
    return this.#items.get(id);
  }
  all(): T[] {
    return [...this.#items.values()];
  }
}
type User = { id: number; name: string };
type Product = { id: number; title: string; price: number };
const users = new Repository<User>();
users.add({ id: 1, name: "sara" });
console.log(users.findById(1)?.name);           // sara
const products = new Repository<Product>();
products.add({ id: 7, title: "ماوس", price: 350 });
console.log(products.all().map((p) => p.price)); // [ 350 ]`
        }
      ]
    }
]);
