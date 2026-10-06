// تكملة تاب quality: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/quality/01.js (شرح حقول الدرس في أوله)
MORE("quality", [
    {
      t: "تكتب اختبار",
      l: 2,
      n: "vitest من جوه: expect، و mocks للإيميل والدفع، ووقت مزيّف، واختبار بيقع لسبب واحد",
      items: [
        {
          cmd: "خريطة الاختبارات",
          title: "الاختبارات في الموقع: تبدأ منين وتروح فين",
          desc: R`الاختبارات مش حاجة واحدة. فيه خمس محطات في الموقع، وكل واحدة بتبني على اللي قبلها:

١. هنا، «تاب فحص الكود» المستوى التاني (الفئة دي): unit tests بـ vitest. دالة أو service لوحدها، بـ mocks للإيميل والدفع والوقت.

٢. «تاب Backend بـ Node» المستوى التالت: integration tests بـ supertest. طلب HTTP حقيقي على الـ API وداتابيز اختبار، من غير متصفح.

٣. «تاب React» المستوى التالت: Testing Library و MSW. الـ component بيترسم وتدوس عليه زي اليوزر، والـ API متزيّف على مستوى الشبكة.

٤. «تاب فحص الكود» المستوى التالت: Playwright e2e. التطبيق كله في متصفح حقيقي: login ودفع من أولهم لآخرهم.

٥. «تاب هندسة البرمجيات» المستوى التالت: TDD وأنواع الاختبارات، يعني إمتى تكتب الاختبار قبل الكود، وأنهي نوع لأنهي حاجة.`,
          example: R`"scripts": {
  "test": "vitest run",
  "test:watch": "vitest",
  "test:api": "vitest run tests/api",
  "test:e2e": "playwright test",
  "test:all": "npm run test && npm run test:e2e"
}`,
          try: R`خد مشروع عندك (أو متجر بسيط فيه login وسلة ودفع) واكتب في ورقة: ٣ حاجات تستاهل unit test، وحاجة واحدة integration، و flow واحد بس e2e. وبعدين ضيف السكربتات دي لـ package.json.`,
          flag: "script",
          deep: {
            why: "اللي بيبدأ اختبارات بيقع في واحدة من اتنين: يكتب e2e لكل حاجة فالـ CI ياخد نص ساعة ويقع من غير سبب واضح، أو يكتب unit tests بس فكل دالة سليمة لوحدها والتطبيق بايظ لما يتجمّع. الخريطة بتقولك كل نوع بيمسك إيه وبتكتبه فين.",
            how: R`الفكرة المشهورة اسمها هرم الاختبارات: تحت unit كتير (رخيصة، بتاخد ملي ثانية، ولما تقع بتقولك السطر بالظبط)، وفي النص integration أقل (API مع داتابيز، أبطأ بس بيمسك غلط الـ SQL والـ middleware)، وفوق e2e قليل جدًا (دقايق، وأحيانًا flaky، بس الوحيد اللي بيقول «اليوزر يقدر يدفع»).

vitest بيشغّل الأولى والتانية والتالتة (supertest و Testing Library شغالين جوه vitest)، و Playwright ليه runner لوحده ([[playwright test]]) لأنه بيشغّل متصفح.

والسكربتات بتفصلهم عشان تشغّل السريع وانت شغال ([[test:watch]])، والكل قبل الـ merge. وفي CI، [[test]] في الـ job الأساسي، و [[test:e2e]] في job لوحده لأنه محتاج متصفحات وسيرفر (المستوى ٣).`,
            when: "أول ما تفكر «أبدأ أكتب اختبارات». وفي كل feature جديدة: اسأل أنهي جزء unit، وهل فيه flow حرج يستاهل e2e.",
            mistakes: R`تبدأ بـ e2e لأنه «بيختبر كل حاجة»، فأول ما الزرار يتغير اسمه يقع عشرين اختبار. أو تعمل mock لكل حاجة في الـ integration test، فيبقى unit test متنكّر ومبيمسكش غلط الـ SQL. وفي الانترفيو: سؤال «بتختبر إزاي؟» إجابته الهرم ده بأمثلة من مشروعك، مش «بكتب tests».`
          },
          teach: R`## الفكرة: كل نوع اختبار ليه أمر

المثال حتة من [[package.json]]: خمس سكربتات، كل واحد بيشغّل نوع اختبارات. الفكرة مش الأوامر نفسها، الفكرة إنك تفصل السريع عن البطيء عشان تشغّل كل واحد في وقته. كل اللي تحت اتشغّل على ويندوز 11 (Node 24.19، vitest 5.0.3) في مشروع تجربة فيه ٢٨ اختبار unit.

---

## ١. يعني إيه [["scripts"]]؟

[["scripts"]] خانة في [[package.json]]: اسم على الشمال، وأمر على اليمين. لما تكتب [[npm run test]]، npm بيدوّر على [["test"]] وينفّذ اللي قصاده، وبيضيف [[node_modules/.bin]] للـ PATH، فـ [[vitest]] بيشتغل من غير [[npx]].

| السطر | بيشغّل إيه |
|---|---|
| [["test": "vitest run"]] | كل اختبارات vitest مرة واحدة ويقفل |
| [["test:watch": "vitest"]] | نفسه بس بيفضل فاتح ويعيد مع كل حفظ |
| [["test:api": "vitest run tests/api"]] | الملفات اللي مسارها فيه [[tests/api]] بس |
| [["test:e2e": "playwright test"]] | Playwright، runner تاني خالص |
| [["test:all": "npm run test && npm run test:e2e"]] | الاتنين ورا بعض |

والنقطتين في [[test:api]] مجرد جزء من الاسم، عُرف عشان السكربتات اللي من نفس العيلة تبقى جنب بعض.

---

## ٢. [[npm run test]]

~~~powershell
npm run test
~~~

~~~text الناتج
> vt@1.0.0 test
> vitest run

 RUN  v5.0.3 C:/Users/ali/shop

 Test Files  10 passed (10)
      Tests  28 passed (28)
   Start at  20:09:03
   Duration  468ms (transform 53%, import 28%, tests 11%, worker 8%)
~~~

- أول سطرين npm بيطبعهم: اسم المشروع ونسخته، والأمر اللي هيتنفّذ.
- [[RUN v5.0.3]] نسخة vitest، وبعدها فولدر المشروع.
- [[Test Files 10]] عدد الملفات، و [[Tests 28]] عدد الاختبارات جواها.
- [[Duration 468ms]]: ٢٨ اختبار في نص ثانية. ده اللي بيخلي unit tests تتشغّل مع كل حفظ.

و [[test]] اسم خاص: [[npm test]] (من غير run) بيشغّله برضه.

### [[vitest]] من غير [[run]]

[[npm run test:watch]] بيشغّل [[vitest]] لوحده، وده في الترمنال بيفضل مستني ويعيد الاختبارات المتأثرة لما تحفظ ملف. تخرج بـ [[q]] أو Ctrl+C. (لو مفيش ترمنال، زي CI، vitest بيشتغل مرة ويقفل لوحده.)

---

## ٣. [[npm run test:api]]

الكلمة بعد [[vitest run]] فلتر على مسار الملف. في مشروع التجربة مفيش فولدر [[tests/api]] لسه:

~~~text الناتج
> vt@1.0.0 test:api
> vitest run tests/api

No test files found, exiting with code 1
filter: tests/api
include: **/*.{test,spec}.?(c|m)[jt]s?(x)
exclude:  **/node_modules/**, **/.git/**
~~~

- [[filter]] الكلمة اللي كتبتها.
- [[include]] الشكل اللي vitest بيدوّر عليه: أي ملف اسمه [[.test]] أو [[.spec]] وآخره [[ts]] أو [[js]] (و [[tsx]] و [[mjs]] وأخواتهم).
- [[exiting with code 1]]: مفيش ملفات = فشل. ده كويس، لأن CI مش هيعدّي أخضر وهو مختبرش حاجة.

---

## ٤. [[npm run test:all]] و [[&&]]

[[&&]] معناها «شغّل اللي بعدي **لو** اللي قبلي نجح» (exit code صفر). فلو الـ unit tests وقعت، Playwright مش هيبدأ أصلًا، ومش هتستنى دقايق على حاجة معروف إنها بايظة.

في مشروع التجربة الـ unit عدّت، و Playwright مش متسطّب:

~~~text الناتج
 Test Files  10 passed (10)
      Tests  28 passed (28)

> vt@1.0.0 test:e2e
> playwright test

'playwright' is not recognized as an internal or external command,
operable program or batch file.
~~~

السطر الأخير رسالة cmd (npm على ويندوز بيشغّل السكربتات بـ cmd)، يعني الأمر مش موجود. Playwright بيتسطّب في المستوى التالت من التاب ده.

---

## ٥. الهرم: مين بيختبر إيه

| النوع | بيختبر | الأداة | الوقت | فين في الموقع |
|---|---|---|---|---|
| unit | دالة أو service لوحدها | vitest | ملي ثواني | هنا |
| integration | API حقيقي وداتابيز اختبار | vitest و supertest | ثواني | تاب Backend بـ Node |
| component | component بيترسم وتدوس عليه | Testing Library و MSW | ثواني | تاب React |
| e2e | التطبيق كله في متصفح | Playwright | دقايق | المستوى التالت هنا |

تحت كتير وفوق قليل: كل ما تطلع لفوق الاختبار بيمسك مشاكل أكبر، بس أبطأ وأصعب تعرف منه السطر اللي باظ.

---

## الخلاصة

- السكربتات بتفصل السريع ([[test]]) عن البطيء ([[test:e2e]])، والاسم بعد [[vitest run]] فلتر على مسار الملف.
- [[vitest run]] مرة واحدة (CI والـ hooks)، و [[vitest]] لوحده watch وانت شغال.
- «مفيش ملفات» عند vitest فشل (exit 1)، و [[&&]] بيوقف السلسلة عند أول فشل.`,
          lines: [
            "بداية السكربتات في package.json.",
            "unit و integration مرة واحدة واقفل (للـ CI والـ hooks).",
            "نفسه بس watch وانت شغال.",
            "اختبارات الـ API بس (supertest، في «تاب Backend بـ Node»).",
            "Playwright في متصفح حقيقي (المستوى التالت هنا).",
            "الكل بالترتيب: السريع الأول، ولو وقع ميكمّلش للبطيء.",
            "نهاية السكربتات."
          ],
          sol: R`مثال لمتجر فيه login وسلة ودفع:

unit: [[cartTotal]] (مجموع وخصم وكمية سالبة)، و [[checkout]] مع بوابة دفع متزيّفة (نجح، اترفض، سلة فاضية)، و [[isExpired]] للـ token بوقت مزيّف.

integration: [[POST /api/orders]] بـ supertest وداتابيز اختبار: من غير login يرجع 401، ومع login يعمل order فعلًا في الجدول.

e2e: واحد بس: login، وضيف منتج، وادفع، وشوف «تم الطلب». ده الـ flow اللي لو وقع الشركة بتخسر فلوس.

الغلط الشائع: تحط «الـ navbar بيظهر» كـ e2e. ده unit أو component test، والـ e2e خليه للي بيعدّي على كذا صفحة وسيرفر وداتابيز.`
        },
        {
          cmd: "describe و it و expect",
          title: "أول ملف اختبار حقيقي لـ service",
          desc: R`ملف الاختبار اسمه زي الملف اللي بيختبره وآخره [[.test.ts]]: [[cart.ts]] جنبه [[cart.test.ts]]. جواه [[describe]] مجموعة، و [[it]] اختبار واحد باسم بيقول السلوك، و [[expect(actual).toBe(expected)]] الشرط.

كل اختبار تلات خطوات: arrange (جهّز المدخلات)، و act (نادي الدالة مرة واحدة)، و assert (اتأكد من الناتج).

الدالة هنا [[cartTotal(items, coupon?)]]: بتجمع [[price * qty]]، والكوبون [[SAVE10]] بيخصم ١٠٪.`,
          example: R`import { describe, it, expect } from "vitest";
import { cartTotal } from "./cart";

describe("cartTotal", () => {
  it("sums price times qty", () => {
    // arrange
    const items = [{ price: 100, qty: 2 }, { price: 50, qty: 1 }];
    // act
    const total = cartTotal(items);
    // assert
    expect(total).toBe(250);
  });

  it("applies the SAVE10 coupon", () => {
    expect(cartTotal([{ price: 200, qty: 1 }], "SAVE10")).toBe(180);
  });
});`,
          try: R`اكتب [[src/cart.ts]] بنفسك: الدالة بتجمع [[price * qty]]، و [[SAVE10]] بيخصم ١٠٪ ويقرّب ([[Math.round]])، وترمي [[Error("qty must be positive")]] لو أي كمية صفر أو أقل. حط الاختبار ده جنبه وشغّل [[npx vitest run]]. ضيف اختبار لسلة فاضية، وبعدين بوّظ الخصم عمدًا ([[0.8]] بدل [[0.9]]) واقرا رسالة الفشل.`,
          flag: "script",
          deep: {
            why: "من غير اختبار، كل تعديل في [[cartTotal]] معناه تفتح المتصفح وتضيف منتجات وتحسب بإيدك. الاختبار بيعمل ده في ملي ثانية مع كل حفظ، ولما حد يغيّر الخصم بعد ست شهور، الاختبار هو اللي يقوله «انت كسرت SAVE10» قبل العميل.",
            how: R`vitest بيلاقي أي ملف [[*.test.ts]] ويشغّله. [[describe]] مجرد تجميع: الاسم بيتحط قبل اسم كل اختبار في التقرير ([[cartTotal > sums price times qty]])، وتقدر تحط جواه [[beforeEach]] يخص المجموعة دي بس.

[[it]] (أو [[test]]، نفس الحاجة) بياخد اسم ودالة. الاسم جملة بتوصف السلوك، مش اسم الدالة: لما يقع تقرا «applies the SAVE10 coupon» وتعرف إيه اللي باظ من غير ما تفتح الملف.

[[expect(x)]] بيرجع object فيه matchers. [[toBe]] بيقارن بـ [[Object.is]]، يعني قيمة مطابقة للأرقام والنصوص. لو الشرط وقع، بيرمي خطأ فيه Expected و Received وسهم على السطر، والاختبار يبقى أحمر، والباقي يكمّل عادي.

الـ arrange / act / assert مش syntax، ده ترتيب: كل التجهيز فوق، ونداء واحد، وبعدين الشروط. لو لقيت نفسك بتعمل act تاني بعد assert، غالبًا ده اختبارين.

والـ import من [[vitest]] صريح. فيه إعداد [[globals: true]] بيخليهم متاحين من غير import (زي jest)، بس الصريح أوضح و TypeScript بيفهمه من غير إعداد.`,
            when: "لأي دالة فيها منطق: حسابات، و validation، وتحويل بيانات، وقرارات (if). دي أرخص اختبارات وأكترها فايدة. والـ services اللي بتكلم داتابيز أو API، بتختبر منطقها بـ mocks (الدروس الجاية).",
            mistakes: R`اسم زي [[it("test 1")]] أو [[it("works")]]، فلما يقع مش عارف إيه اللي باظ. واختبار بيعيد نفس الحسبة اللي في الكود ([[expect(total).toBe(items[0].price * items[0].qty + ...)]]) فلو المعادلة غلط الاختبار غلط زيها: اكتب الرقم المتوقع بإيدك (250). ومفيش ولا [[expect]] في الاختبار، فبيعدّي دايمًا. وتختبر الحالة السعيدة بس وتنسى الحدود: سلة فاضية، وكمية صفر، وكوبون غلط.`
          },
          teach: R`## الفكرة: ملف بيستعمل الكود ويتأكد من النتيجة

ملف الاختبار ملف TypeScript عادي: بيعمل import للدالة، ويناديها بمدخلات انت عارف نتيجتها، ويقول لـ vitest «النتيجة لازم تبقى كذا». هنفكّه سطر سطر، وبعدين نشغّله ونبوّظ الكود عمدًا ونقرا الفشل. اتشغّل على ويندوز 11 بـ vitest 5.0.3.

---

## ١. سطور الـ import

~~~text cart.test.ts (أول سطرين)
import { describe, it, expect } from "vitest";
import { cartTotal } from "./cart";
~~~

- [[import { ... } from "..."]] هات حاجات بالاسم من ملف أو مكتبة. الأقواس [[{ }]] معناها «الأسامي دي بالظبط» (named imports).
- [["vitest"]] من غير [[./]] يعني مكتبة من [[node_modules]].
- [["./cart"]] بـ [[./]] يعني ملف جنبي اسمه [[cart.ts]]. الامتداد مش لازم، vitest بيكمّله.

---

## ٢. [[describe("cartTotal", () => { ... })]]

[[describe]] بياخد حاجتين: اسم، ودالة جواها الاختبارات. [[() => { ... }]] اسمها arrow function: دالة من غير اسم، [[()]] معناها مش بتاخد حاجة، و [[=>]] بعدها جسم الدالة.

[[describe]] مش بيختبر حاجة، هو بيجمّع: اسمه بيتحط قبل اسم كل اختبار جواه في التقرير.

---

## ٣. [[it("sums price times qty", () => { ... })]]

[[it]] اختبار واحد (و [[test]] اسم تاني لنفس الحاجة). الاسم بيتقرا كجملة: «it sums price times qty»، يعني «هي بتجمع السعر في الكمية».

جواه التلات خطوات:

| الخطوة | السطر | بيعمل إيه |
|---|---|---|
| arrange | [[const items = [{ price: 100, qty: 2 }, { price: 50, qty: 1 }];]] | سلة فيها منتجين |
| act | [[const total = cartTotal(items);]] | نداء واحد للدالة |
| assert | [[expect(total).toBe(250);]] | النتيجة لازم ٢٥٠ |

- [[[ ... ]]] array، و [[{ price: 100, qty: 2 }]] object فيه خانتين.
- [[const]] متغير مش هيتغير.
- والحسبة: ١٠٠ × ٢ + ٥٠ × ١ = ٢٥٠. الرقم مكتوب بإيدك، مش محسوب بنفس معادلة الكود.

### [[expect(total).toBe(250)]]

[[expect(x)]] بيرجّع object فيه دوال مقارنة اسمها matchers. [[toBe]] بيقارن بـ [[Object.is]]: نفس القيمة بالظبط. لو مختلفة، بيرمي خطأ والاختبار يبقى أحمر.

### الاختبار التاني في سطر

~~~text
expect(cartTotal([{ price: 200, qty: 1 }], "SAVE10")).toBe(180);
~~~

نفس التلات خطوات متداخلين: السلة جوه النداء، والنداء جوه [[expect]]. [["SAVE10"]] الـ argument التاني (الكوبون)، و ٢٠٠ ناقص ١٠٪ = ١٨٠.

---

## ٤. التشغيل

~~~powershell
npx vitest run --reporter=verbose
~~~

[[npx]] بيشغّل [[vitest]] من [[node_modules/.bin]] بتاع المشروع. [[run]] مرة واحدة، و [[--reporter=verbose]] بيطبع اسم كل اختبار (من غيره vitest 5 بيطبع الأعداد بس لما كله يعدّي):

~~~text الناتج
 ✓ src/cart.test.ts > cartTotal > sums price times qty 2ms
 ✓ src/cart.test.ts > cartTotal > applies the SAVE10 coupon 0ms
 ✓ src/cart.test.ts > cartTotal > returns 0 for an empty cart 0ms

 Test Files  1 passed (1)
      Tests  3 passed (3)
~~~

شايف [[cartTotal > sums price times qty]]؟ ده اسم الـ describe وبعده اسم الـ it. التالت هو اختبار السلة الفاضية اللي في الحل.

---

## ٥. نبوّظ الخصم عمدًا

غيّرت [[0.9]] لـ [[0.8]] في [[cart.ts]]:

~~~text الناتج
 ❯ src/cart.test.ts (3 tests | 1 failed) 8ms
   ❯ cartTotal (3)
     × applies the SAVE10 coupon 5ms

 FAIL  src/cart.test.ts > cartTotal > applies the SAVE10 coupon
AssertionError: expected 160 to be 180 // Object.is equality

- Expected
+ Received

- 180
+ 160

 ❯ src/cart.test.ts:15:59
     14|   it("applies the SAVE10 coupon", () => {
     15|     expect(cartTotal([{ price: 200, qty: 1 }], "SAVE10")).toBe(180);
       |                                                           ^

 Test Files  1 failed (1)
      Tests  1 failed | 2 passed (3)
~~~

نقراه من فوق:

| الحتة | معناها |
|---|---|
| [[×]] قبل الاسم | الاختبار ده وقع |
| [[expected 160 to be 180]] | الكود رجّع ١٦٠، والمتوقع ١٨٠ |
| [[// Object.is equality]] | نوع المقارنة (ده [[toBe]]) |
| [[- Expected]] / [[+ Received]] | المتوقع بـ [[-]] واللي جه فعلًا بـ [[+]] |
| [[cart.test.ts:15:59]] | الملف، والسطر ١٥، والعمود ٥٩، والسهم [[^]] تحته |
| [[1 failed / 2 passed]] | الباقيين عدّوا، كل اختبار مستقل |

ورقم الخروج ١، فلو ده في CI الـ step بيقع.

---

## ٦. الكود اللي في الحل

~~~text src/cart.ts
export type Item = { price: number; qty: number };

export function cartTotal(items: Item[], coupon?: string): number {
  for (const i of items) if (i.qty <= 0) throw new Error("qty must be positive");
  const sum = items.reduce((s, i) => s + i.price * i.qty, 0);
  return coupon === "SAVE10" ? Math.round(sum * 0.9) : sum;
}
~~~

- [[export type Item]] شكل المنتج: خانتين أرقام. [[export]] عشان الملفات التانية تشوفه.
- [[items: Item[]]] array من [[Item]]. و [[coupon?: string]]: علامة [[?]] معناها اختياري، ممكن متتبعتش.
- [[for (const i of items)]] لف على كل منتج، و [[throw new Error(...)]] اوقف وارمي خطأ لو الكمية صفر أو أقل.
- [[items.reduce((s, i) => s + i.price * i.qty, 0)]] بيبدأ من [[0]]، ومع كل منتج يزوّد السعر في الكمية على المجموع [[s]].
- [[شرط ? لو_صح : لو_غلط]] اسمه ternary: لو الكوبون SAVE10 رجّع المجموع × ٠.٩ مقرّب ([[Math.round]])، وإلا المجموع زي ما هو.

---

## الخلاصة

- [[describe]] بيجمّع، و [[it]] اختبار واحد باسم بيوصف السلوك، و [[expect(x).toBe(y)]] الشرط.
- arrange ثم act ثم assert، والرقم المتوقع مكتوب بإيدك.
- اقرا الفشل: الاسم بيقول إيه اللي باظ، و Expected/Received بيقولوا قد إيه، والسهم بيقول فين.
- بوّظ الكود مرة واتأكد إن الاختبار بيقع، وإلا ممكن يكون مبيختبرش حاجة.`,
          lines: [
            "هات الدوال من vitest صريح.",
            "هات الدالة اللي هتختبرها.",
            "مجموعة اختبارات لـ cartTotal.",
            "اختبار واحد، واسمه جملة بتقول السلوك.",
            "arrange: جهّز سلة فيها منتجين.",
            "act: نادي الدالة مرة واحدة.",
            "assert: الناتج لازم يبقى 250 بالظبط.",
            "نهاية الاختبار الأول.",
            "اختبار تاني للكوبون.",
            "ممكن الخطوات التلاتة في سطر لو الاختبار صغير.",
            "نهاية الاختبار التاني.",
            "نهاية المجموعة."
          ],
          sol: R`لما الكل سليم: [[Test Files 1 passed]] و [[Tests 3 passed]].

ولما تبوّظ الخصم، vitest بيطبع [[FAIL src/cart.test.ts > cartTotal > applies the SAVE10 coupon]] وتحته [[expected 160 to be 180 // Object.is equality]] وسهم على سطر الـ expect. يعني الاسم قالك إيه اللي باظ، والرقمين قالولك قد إيه. التانيين فضلوا أخضر لأن كل اختبار مستقل.

لو الاختبار عدّى وانت بوّظت الكود، راجع إنك حافظ الملف اللي الاختبار بيعمله import، وإن الرقم المتوقع مكتوب بإيدك مش محسوب.`,
          solCode: R`// src/cart.ts
export type Item = { price: number; qty: number };

export function cartTotal(items: Item[], coupon?: string): number {
  for (const i of items) if (i.qty <= 0) throw new Error("qty must be positive");
  const sum = items.reduce((s, i) => s + i.price * i.qty, 0);
  return coupon === "SAVE10" ? Math.round(sum * 0.9) : sum;
}

// src/cart.test.ts (ضيف ده جوه describe)
it("returns 0 for an empty cart", () => {
  expect(cartTotal([])).toBe(0);
});`
        },
        {
          cmd: "toEqual و toThrow و rejects",
          title: "تقارن إزاي: قيمة، ولا object، ولا خطأ، ولا Promise",
          desc: R`[[toBe]] للقيم البسيطة (أرقام ونصوص). [[toEqual]] للـ objects والـ arrays: بيقارن المحتوى مش المكان في الذاكرة. [[toMatchObject]] لو يهمك جزء من الـ object بس.

الأخطاء: [[toThrow]] لازم تدّيله دالة مش النداء نفسه. والـ Promise: [[await expect(p).resolves]] أو [[.rejects]]، والـ await إجباري.

[[findUser(id)]] هنا async: بترجع اليوزر، أو بترمي [[user 99 not found]].`,
          example: R`import { it, expect } from "vitest";
import { cartTotal } from "./cart";
import { findUser } from "./users";

it("matchers", async () => {
  expect(cartTotal([])).toBe(0);
  expect({ id: 1, tags: ["a"] }).toEqual({ id: 1, tags: ["a"] });
  expect({ id: 1, tags: ["a"] }).not.toBe({ id: 1, tags: ["a"] });
  expect(0.1 + 0.2).toBeCloseTo(0.3);
  expect(await findUser(1)).toMatchObject({ name: "Sara" });
  expect(() => cartTotal([{ price: 10, qty: 0 }])).toThrow("qty must be positive");
  await expect(findUser(1)).resolves.toHaveProperty("id", 1);
  await expect(findUser(99)).rejects.toThrow(/not found/);
});`,
          try: R`اعمل [[src/users.ts]] اللي في الحل وشغّل المثال. وبعدين جرّب الغلطتين المشهورتين كل واحدة لوحدها: شيل الـ arrow من سطر toThrow ([[expect(cartTotal(...)).toThrow()]])، وشيل [[await]] من سطر rejects. شوف كل واحدة بتطلّع إيه.`,
          flag: "script",
          deep: {
            why: "أغلب الاختبارات «اللي بتعدّي وهي غلط» سببها matcher غلط: [[toBe]] على object فيقع من غير سبب، أو [[toThrow]] على نداء فالخطأ يطلع قبل ما expect يشوفه، أو Promise من غير await فالاختبار يخلص قبل الشرط.",
            how: R`[[toBe]] بيستخدم [[Object.is]]: نفس القيمة للأنواع البسيطة، ونفس المرجع للـ objects. اتنين objects شكلهم واحد بس اتعملوا مرتين، ده مش [[toBe]]. عشان كده [[toEqual]]: بيلف على الخصائص بالتكرار ويقارن المحتوى. (و [[toStrictEqual]] أشد: بيفرّق بين خاصية قيمتها undefined وخاصية مش موجودة، وبين class و object عادي.)

[[toMatchObject]] بيتأكد إن الخصائص اللي كتبتها موجودة بنفس القيم، ويتجاهل الباقي. مفيد مع الـ user اللي فيه [[createdAt]] ومش عايز الاختبار يقع لما حد يضيف حقل.

[[toBeCloseTo]] للأرقام العشرية، لأن [[0.1 + 0.2]] مش 0.3 بالظبط في JavaScript.

[[toThrow]] محتاج يشغّل الكود بنفسه جوه try/catch، فلازم تدّيله دالة [[() => ...]]. لو كتبت النداء على طول، الخطأ بيطلع وانت لسه بتجهّز الـ arguments لـ expect، والاختبار يقع بالخطأ نفسه. وبياخد نص (جزء من الرسالة) أو regex أو class الخطأ.

[[resolves]] و [[rejects]] بيستنوا الـ Promise ويطبّقوا الـ matcher على القيمة أو الخطأ، وبيرجعوا Promise، فلازم [[await]]. في vitest 5 لو نسيت الـ await الاختبار بيقع برسالة «Promise returned by expect(actual).rejects.toThrow(expected) was not awaited». في jest والنسخ القديمة، ممكن يعدّي في صمت.

و [[.not]] قبل أي matcher بيعكسه.`,
            when: "toBe للأرقام والنصوص والـ boolean. toEqual لأي object أو array راجع من دالة. toMatchObject لما يهمك حقول معينة. toThrow لكود sync بيرمي، و rejects لأي async.",
            mistakes: R`[[expect(fn()).toThrow()]] من غير arrow، فالاختبار يقع بـ [[Error: qty must be positive]] نفسه وتفتكر إن الكود بايظ. وتنسى [[await]] قبل [[expect(...).rejects]] في jest فيعدّي دايمًا. و [[toEqual]] على object فيه [[Date]] أو id عشوائي، فيقع كل مرة: استخدم [[toMatchObject]] أو [[expect.any(String)]]. و [[toThrow()]] من غير رسالة، فيعدّي لو الكود رمى أي خطأ حتى TypeError من typo: حدد الرسالة.`
          },
          teach: R`## الفكرة: كل نوع قيمة ليه matcher

الاختبار كله اختبار واحد فيه ٨ شروط، كل سطر بيوري matcher مختلف. هنمشي عليهم سطر سطر، وبعدين نشغّل الغلطات المشهورة واحدة واحدة ونقرا vitest قال إيه. كله اتشغّل على ويندوز 11 بـ vitest 5.0.3، والدالة [[findUser]] من الحل.

---

## ١. [[it("matchers", async () => { ... })]]

كلمة [[async]] قبل الـ arrow بتخلي الدالة ترجع Promise، وبتسمح نكتب [[await]] جواها. [[await]] معناها «استنى الـ Promise دي تخلص وهات قيمتها». و vitest بيستنى الـ Promise بتاعة الاختبار نفسه قبل ما يقول عدّى ولا لأ.

---

## ٢. القيم البسيطة: [[toBe]]

~~~text
expect(cartTotal([])).toBe(0);
~~~

سلة فاضية ترجع [[0]]. [[toBe]] للأرقام والنصوص و true/false.

---

## ٣. الـ objects: [[toEqual]] ضد [[toBe]]

~~~text
expect({ id: 1, tags: ["a"] }).toEqual({ id: 1, tags: ["a"] });
expect({ id: 1, tags: ["a"] }).not.toBe({ id: 1, tags: ["a"] });
~~~

كل [[{ ... }]] بيعمل object **جديد** في الذاكرة. اتنين شكلهم واحد بس هما حاجتين منفصلتين. [[toEqual]] بيلف على الخانات ويقارن المحتوى فبيعدّي. [[toBe]] بيسأل «ده نفس الـ object؟» فبيقع. و [[.not]] قبل أي matcher بتعكسه، فالسطر التاني بيعدّي.

لو كتبت [[toBe]] على objects من غير [[not]]:

~~~text الناتج
AssertionError: expected { id: 1, tags: [ 'a' ] } to be { id: 1, tags: [ 'a' ] } // Object.is equality

If it should pass with deep equality, replace "toBe" with "toStrictEqual"

Expected: { id: 1, tags: [ 'a' ] }
Received: serializes to the same string
~~~

[[serializes to the same string]] يعني «شكلهم واحد لما يتطبعوا»، و vitest نفسه بيقترح تغيّر الـ matcher.

---

## ٤. الأرقام العشرية: [[toBeCloseTo]]

~~~powershell
node -e "console.log(0.1 + 0.2)"
~~~

~~~text الناتج
0.30000000000000004
~~~

الكمبيوتر بيخزّن الأرقام العشرية بالـ binary، و 0.1 مالهاش تمثيل مظبوط فيه، فيفضل فرق صغير جدًا. [[toBe(0.3)]] بيقع:

~~~text الناتج
AssertionError: expected 0.30000000000000004 to be 0.3 // Object.is equality
~~~

[[toBeCloseTo(0.3)]] بيقبل الفرق لحد خانتين عشريتين افتراضيًا. (وفي الفلوس الأحسن تشتغل بالقروش كأرقام صحيحة.)

---

## ٥. جزء من object: [[toMatchObject]]

~~~text
expect(await findUser(1)).toMatchObject({ name: "Sara" });
~~~

[[await findUser(1)]] بيرجّع [[{ id: 1, name: "Sara", createdAt: ... }]]. [[toMatchObject]] بيتأكد من الخانات اللي كتبتها بس. لو استخدمت [[toEqual({ id: 1, name: "Sara" })]]:

~~~text الناتج
AssertionError: expected { id: 1, name: 'Sara', …(1) } to deeply equal { id: 1, name: 'Sara' }

  {
+   "createdAt": 2026-01-01T00:00:00.000Z,
    "id": 1,
    "name": "Sara",
  }
~~~

[[…(1)]] يعني فيه خانة كمان مش ظاهرة، وسطر [[+ createdAt]] هي الزيادة اللي وقّعت المقارنة.

---

## ٦. الأخطاء: [[toThrow]] ومعاه arrow

~~~text
expect(() => cartTotal([{ price: 10, qty: 0 }])).toThrow("qty must be positive");
~~~

[[() => cartTotal(...)]] دالة **لسه متنادتش**. [[toThrow]] بيناديها هو جوه try/catch ويمسك الخطأ، وبعدين يتأكد إن الرسالة فيها النص ده.

من غير الـ arrow، [[cartTotal]] بتتنادى الأول عشان نجهّز الـ argument بتاع [[expect]]، فالخطأ بيطلع قبل ما [[toThrow]] يشتغل:

~~~text الناتج
 FAIL  src/m2.test.ts > no arrow
Error: qty must be positive
 ❯ cartTotal src/cart.ts:4:48
~~~

لاحظ إن السهم على [[cart.ts]] مش على الاختبار، وإن الرسالة [[Error]] مش [[AssertionError]]: ده الخطأ نفسه طالع برا.

---

## ٧. الـ Promise: [[resolves]] و [[rejects]]

~~~text
await expect(findUser(1)).resolves.toHaveProperty("id", 1);
await expect(findUser(99)).rejects.toThrow(/not found/);
~~~

- [[findUser(1)]] من غير await: احنا بندّي [[expect]] الـ Promise نفسها.
- [[.resolves]] استنى الـ Promise تنجح وطبّق الـ matcher على قيمتها. [[toHaveProperty("id", 1)]] فيها خانة [[id]] قيمتها ١.
- [[.rejects]] استنى الـ Promise **تترفض** وطبّق الـ matcher على الخطأ. [[/not found/]] بين شرطتين regex: الرسالة فيها «not found» في أي حتة.
- [[await]] قبل [[expect]] إجباري، لأن [[resolves]] و [[rejects]] بيرجّعوا Promise.

لو نسيت [[await]]:

~~~text الناتج
 FAIL  src/m2.test.ts > no await
Error: Promise returned by $__btexpect(actual).rejects.toThrow(expected)$__bt was not awaited. This assertion is asynchronous and must be awaited; otherwise, it is not guaranteed to complete before the test finishes:

await expect(actual).rejects.toThrow(expected)
~~~

vitest 5 بيمسك الغلطة دي ويقولك الشكل الصح. في jest أو نسخ vitest قديمة، الاختبار ممكن يخلص قبل الشرط ويعدّي أخضر.

---

## ٨. الناتج لما كله صح

~~~text الناتج
 Test Files  1 passed (1)
      Tests  1 passed (1)
~~~

اختبار واحد بس، فلو أي شرط وقع، اللي بعده مش هيتشغّل. ده مقبول هنا لأن الهدف عرض الـ matchers، بس في الشغل الحقيقي كل سلوك ليه [[it]].

---

## الملخص

| القيمة | الـ matcher |
|---|---|
| رقم أو نص أو boolean | [[toBe]] |
| object أو array | [[toEqual]] (أو [[toStrictEqual]] أشد) |
| جزء من object | [[toMatchObject]] |
| رقم عشري | [[toBeCloseTo]] |
| دالة sync بترمي | [[expect(() => fn()).toThrow("...")]] |
| Promise بتنجح | [[await expect(p).resolves...]] |
| Promise بتترفض | [[await expect(p).rejects.toThrow(...)]] |

## الخلاصة

- [[toBe]] بيقارن المرجع للـ objects، فاستخدم [[toEqual]].
- [[toThrow]] عايز دالة، مش نتيجة نداء.
- [[resolves]] و [[rejects]] من غير [[await]] غلط، دايمًا.`,
          lines: [
            "هات it و expect.",
            "الدالة الـ sync.",
            "الدالة الـ async.",
            "اختبار async عشان نقدر نستخدم await جواه.",
            "toBe: الرقم بالظبط.",
            "toEqual: نفس المحتوى حتى لو objects مختلفين.",
            "والدليل: toBe بيقارن المرجع، فاتنين objects متشابهين مش toBe.",
            "الأرقام العشرية: قريب من 0.3 كفاية.",
            "toMatchObject: الحقل ده موجود بالقيمة دي، والباقي مش مهم.",
            "toThrow: ادّيله دالة يشغّلها هو، ورسالة الخطأ المتوقعة.",
            "resolves: استنى الـ Promise واختبر القيمة. والـ await إجباري.",
            "rejects: الـ Promise لازم يترفض بخطأ رسالته فيها not found.",
            "نهاية الاختبار."
          ],
          sol: R`المثال كله أخضر: [[Tests 1 passed]].

من غير الـ arrow: الاختبار بيقع بـ [[Error: qty must be positive]] والسهم على سطر [[cart.ts]] نفسه، مش على expect. الخطأ طلع قبل ما toThrow يشتغل أصلًا. الحل [[expect(() => cartTotal(...)).toThrow(...)]].

من غير await (vitest 5): بيقع برسالة [[Promise returned by $__btexpect(actual).rejects.toThrow(expected)$__bt was not awaited]]. vitest بيمسكها ليك. في jest أو vitest قديم، نفس الغلطة كانت ممكن تعدّي أخضر حتى لو الـ Promise اتحل بدل ما يترفض. فالعادة: أي [[resolves]] أو [[rejects]] قبله [[await]]، دايمًا.`,
          solCode: R`// src/users.ts
export type User = { id: number; name: string; createdAt: Date };
const db = new Map<number, User>([[1, { id: 1, name: "Sara", createdAt: new Date("2026-01-01") }]]);

export async function findUser(id: number): Promise<User> {
  const u = db.get(id);
  if (!u) throw new Error("user " + id + " not found");
  return u;
}`
        },
        {
          cmd: "vi.fn و vi.spyOn",
          title: "تتأكد إن الإيميل اتبعت من غير ما يتبعت",
          desc: R`[[vi.fn()]] دالة مزيّفة بتسجّل كل مرة اتنادت فيها وبإيه. تدّيها للكود بدل الحقيقية، وبعدين تسأل: [[toHaveBeenCalledWith(...)]] و [[toHaveBeenCalledTimes(1)]].

[[vi.spyOn(obj, "method")]] بيلف method موجودة في object حقيقي، وتقدر تغيّر اللي بترجعه، و [[mockRestore()]] يرجّعها زي ما كانت.

[[signup(email, mailer)]] هنا بتتأكد من الإيميل، وتعمل user، وتنادي [[mailer.send(email, "Welcome to MyApp")]].`,
          example: R`import { it, expect, vi } from "vitest";
import { signup } from "./signup";

it("sends a welcome email", async () => {
  const mailer = { send: vi.fn().mockResolvedValue(undefined) };
  const user = await signup("sara@example.com", mailer);
  expect(mailer.send).toHaveBeenCalledTimes(1);
  expect(mailer.send).toHaveBeenCalledWith("sara@example.com", expect.stringContaining("Welcome"));
  expect(user.email).toBe("sara@example.com");
});

it("does not email an invalid address", async () => {
  const mailer = { send: vi.fn() };
  await expect(signup("nope", mailer)).rejects.toThrow("invalid email");
  expect(mailer.send).not.toHaveBeenCalled();
});

it("spyOn replaces one method on a real object", async () => {
  const realMailer = { async send(_to: string, _subject: string): Promise<void> { throw new Error("real network!"); } };
  const spy = vi.spyOn(realMailer, "send").mockResolvedValue(undefined);
  await signup("a@b.co", realMailer);
  expect(spy).toHaveBeenCalledOnce();
  spy.mockRestore();
});`,
          try: R`اعمل [[src/signup.ts]] اللي في الحل، وشغّل المثال. وبعدين ضيف اختبار رابع: مزوّد الإيميل واقع ([[mockRejectedValue(new Error("SMTP 421"))]])، و signup لازم يرمي نفس الخطأ.`,
          flag: "script",
          deep: {
            why: "مش عايز كل مرة الاختبارات تشتغل يتبعت إيميل حقيقي لـ sara@example.com، ولا عايز الاختبار يقع لأن النت قاطع. بس عايز تتأكد إن الكود «حاول يبعت» للعنوان الصح، ومحاولش يبعت لإيميل غلط. الـ mock بيفصل منطقك عن العالم برا.",
            how: R`[[vi.fn()]] بترجع دالة فيها [[.mock.calls]] (array بكل نداء و arguments بتاعه) و [[.mock.results]]. الـ matchers زي [[toHaveBeenCalledWith]] بيقروا منها. ومن غير تحديد بترجع undefined، وتغيّر ده بـ:
[[mockReturnValue(x)]] قيمة ثابتة، و [[mockResolvedValue(x)]] Promise بتتحل بـ x، و [[mockRejectedValue(err)]] Promise بتترفض، و [[mockImplementation(fn)]] منطق كامل. ونسخ [[...Once]] منهم للنداء الجاي بس.

[[expect.stringContaining("Welcome")]] و [[expect.any(String)]] asymmetric matchers: بتحطها مكان argument عشان تقول «أي نص فيه Welcome». كده الاختبار ميقعش لو حد عدّل الـ subject لـ «Welcome to MyApp!».

الطريقة الأنضف إن الـ service ياخد الـ mailer كـ argument (dependency injection)، فالاختبار يدّيله [[{ send: vi.fn() }]] ببساطة. ولو الكود بيستخدم object حقيقي مش بياخده من برا، [[vi.spyOn]] بيبدّل method واحدة فيه: من غير [[mockResolvedValue]] بيسجّل النداء ويشغّل الأصلية، ومعاه بيبدّلها. و [[mockRestore]] (أو [[restoreMocks: true]] في الإعدادات) يرجّع الأصل عشان ميأثرش على اختبار تاني.

و [[toHaveBeenCalledOnce()]] اختصار لـ [[toHaveBeenCalledTimes(1)]]. و [[not.toHaveBeenCalled()]] بيأكد إن حاجة محصلتش، ودي مهمة زي إنها حصلت.`,
            when: "أي side effect: إيميل، و SMS، و push notification، و log مهم، و analytics، و webhook. تأكد إنه اتنادى بالبيانات الصح، ومتشغّلوش.",
            mistakes: R`تعمل mock للدالة اللي بتختبرها نفسها، فبتختبر الـ mock. وتكتب [[toHaveBeenCalledWith("sara@example.com", "Welcome to MyApp")]] بالنص كامل، فأي تعديل في الكلام يكسر الاختبار: اختبر اللي يهم (العنوان) وخلّي الباقي [[expect.any(String)]]. و spy من غير restore، فالاختبار اللي بعده بيلاقي [[console.error]] أو [[Date.now]] لسه متزيّف. وفي الانترفيو: الفرق بين mock و stub و spy؟ stub بيرجّع قيمة ثابتة، و spy بيسجّل النداءات، و mock الاتنين ومعاهم شروط. vi.fn بيعمل التلاتة.`
          },
          teach: R`## الفكرة: دالة مزيّفة بتفتكر هي اتنادت إزاي

[[signup]] بتبعت إيميل. في الاختبار مش عايزين إيميل يتبعت بجد، بس عايزين نعرف «حاولت تبعت؟ لمين؟». [[vi.fn()]] بتعمل دالة فاضية بتسجّل كل نداء. اتشغّل على ويندوز 11 بـ vitest 5.0.3، و [[signup.ts]] من الحل.

---

## ١. [[import { it, expect, vi } from "vitest"]]

[[vi]] object فيه كل أدوات التزييف: [[vi.fn]] و [[vi.spyOn]] و [[vi.mock]] والوقت المزيّف. (الاسم من vitest، زي [[jest]] في jest.)

---

## ٢. الاختبار الأول: الإيميل اتبعت صح

### [[const mailer = { send: vi.fn().mockResolvedValue(undefined) };]]

من جوه لبرا:

1. [[vi.fn()]] دالة مزيّفة. من غير أي إعداد بترجع [[undefined]].
2. [[.mockResolvedValue(undefined)]] خليها ترجع Promise بتنجح بقيمة [[undefined]]، زي [[send]] الحقيقية اللي بترجع [[Promise<void>]].
3. [[{ send: ... }]] object شكله زي الـ [[Mailer]] اللي [[signup]] مستنياه.

### [[const user = await signup("sara@example.com", mailer);]]

بندّي [[signup]] الـ mailer المزيّف بدل الحقيقي. ده اسمه dependency injection: الدالة بتاخد اللي محتاجاه كـ argument، فالاختبار يقدر يبدّله.

### بنسأل الدالة المزيّفة

~~~text
expect(mailer.send).toHaveBeenCalledTimes(1);
expect(mailer.send).toHaveBeenCalledWith("sara@example.com", expect.stringContaining("Welcome"));
expect(user.email).toBe("sara@example.com");
~~~

- [[toHaveBeenCalledTimes(1)]] اتنادت مرة واحدة بالظبط.
- [[toHaveBeenCalledWith(a, b)]] اتنادت (مرة على الأقل) بالـ arguments دي.
- [[expect.stringContaining("Welcome")]] مش قيمة، ده شرط بيتحط مكان argument: «أي نص فيه Welcome». اسمه asymmetric matcher.

### الدالة المزيّفة شايلة إيه؟

كل [[vi.fn]] فيها [[.mock.calls]] و [[.mock.results]]. طبعتهم بـ [[console.log]] جوه الاختبار:

~~~powershell
npx vitest run src/calls.test.ts --silent=false
~~~

~~~text الناتج
stdout | src/calls.test.ts > calls
[ [ 'sara@example.com', 'Welcome to MyApp' ] ]
[ { type: 'return', value: Promise { undefined } } ]
~~~

- [[calls]] array فيه نداء واحد، والنداء array بالـ arguments بتاعته.
- [[results]] اللي رجع من كل نداء: Promise بـ undefined.
- [[--silent=false]]: في vitest 5 الـ [[console.log]] بتاع الاختبارات اللي بتعدّي مش بيظهر افتراضيًا. جرّبتها من غيره وماطلعش حاجة.

ولو الشرط مش مطابق، vitest بيطبع النداءات اللي حصلت فعلًا. جرّبت [[toHaveBeenCalledWith("sara@example.com", "Hello")]]:

~~~text الناتج
AssertionError: expected "vi.fn()" to be called with arguments: [ 'sara@example.com', 'Hello' ]

Received:

  1st vi.fn() call:

  [
    "sara@example.com",
-   "Hello",
+   "Welcome to MyApp",
  ]

Number of calls: 1
~~~

---

## ٣. الاختبار التاني: مفيش إيميل لعنوان غلط

~~~text
const mailer = { send: vi.fn() };
await expect(signup("nope", mailer)).rejects.toThrow("invalid email");
expect(mailer.send).not.toHaveBeenCalled();
~~~

[["nope"]] مفيهوش [[@]] فـ [[signup]] بترمي قبل ما تنادي [[send]]. و [[not.toHaveBeenCalled()]] بيأكد إن الحاجة **محصلتش**، ودي مهمة زي إنها حصلت.

---

## ٤. الاختبار التالت: [[vi.spyOn]] على object حقيقي

~~~text
const realMailer = { async send(_to: string, _subject: string): Promise<void> { throw new Error("real network!"); } };
const spy = vi.spyOn(realMailer, "send").mockResolvedValue(undefined);
await signup("a@b.co", realMailer);
expect(spy).toHaveBeenCalledOnce();
spy.mockRestore();
~~~

- [[realMailer]] بيمثّل mailer حقيقي: لو اتنادى بيرمي [[real network!]]، فلو الاختبار عدّى نبقى متأكدين إنه ماتنادتش.
- الشرطة في [[_to]] و [[_subject]] عُرف معناه «مش هستخدمه».
- [[vi.spyOn(obj, "send")]] بيلف الـ method دي بجاسوس بيسجّل النداءات، و [[.mockResolvedValue(undefined)]] بيبدّل اللي بتعمله.
- [[toHaveBeenCalledOnce()]] = [[toHaveBeenCalledTimes(1)]].
- [[spy.mockRestore()]] بيرجّع الـ method الأصلية.

من غير [[mockResolvedValue]]، الـ spy بيسجّل وبيشغّل الأصلية برضه:

~~~text الناتج
 FAIL  src/s2.test.ts > spy without mock calls real
Error: real network!
 ❯ Object.send src/s2.test.ts:9:89
 ❯ signup src/signup.ts:6:16
~~~

---

## ٥. الاختبار الرابع (التجربة): المزوّد واقع

~~~text
const mailer = { send: vi.fn().mockRejectedValue(new Error("SMTP 421")) };
await expect(signup("sara@example.com", mailer)).rejects.toThrow("SMTP 421");
~~~

[[mockRejectedValue]] بيرجّع Promise بتترفض. [[await mailer.send]] جوه signup بيرمي، والخطأ بيطلع لبرا. الأربعة مع بعض:

~~~text الناتج
 Test Files  1 passed (1)
      Tests  4 passed (4)
~~~

والغلطة المشهورة [[mockReturnValue(new Error("SMTP 421"))]]: الدالة بترجّع object خطأ عادي ومبترميش، فـ signup بتكمّل:

~~~text الناتج
AssertionError: promise resolved "{ …(2) }" instead of rejecting

- Expected
+ Received

- Error {
-   "message": "rejected promise",
+ {
+   "email": "sara@example.com",
+   "id": "b0cf1537-a901-4ec6-bd82-0a56dce22354",
  }
~~~

[[promise resolved instead of rejecting]]: الـ Promise نجحت ورجّعت اليوزر (بالـ id اللي [[crypto.randomUUID()]] عمله)، والاختبار كان مستني رفض.

---

## ملخص أوامر الـ mock

| الأمر | الدالة المزيّفة بترجّع |
|---|---|
| [[vi.fn()]] | [[undefined]] |
| [[mockReturnValue(x)]] | [[x]] على طول |
| [[mockResolvedValue(x)]] | Promise بتنجح بـ [[x]] |
| [[mockRejectedValue(err)]] | Promise بتترفض بـ [[err]] |
| [[mockImplementation(fn)]] | اللي [[fn]] بترجّعه |
| أي واحد فيهم + [[Once]] | للنداء الجاي بس |

## الخلاصة

- [[vi.fn]] للحاجة اللي بتدّيها للكود، و [[vi.spyOn]] لـ method في object موجود، ورجّعه بـ [[mockRestore]].
- اختبر اللي يهم بالظبط (العنوان)، والباقي [[expect.stringContaining]] أو [[expect.any(String)]].
- [[not.toHaveBeenCalled()]] بيثبت إن الـ side effect محصلش.
- الخطأ في async بيتعمل بـ [[mockRejectedValue]] مش [[mockReturnValue(new Error)]].`,
          lines: [
            "vi فيه كل أدوات الـ mocking.",
            "الـ service اللي بنختبره.",
            "اختبار الحالة العادية.",
            "mailer مزيّف: send دالة بتسجّل النداءات وبترجع Promise بيتحل.",
            "act: سجّل يوزر وادّيله الـ mailer المزيّف.",
            "اتنادى مرة واحدة بالظبط.",
            "للعنوان ده، والـ subject أي نص فيه Welcome.",
            "والـ user راجع بالإيميل الصح.",
            "نهاية الاختبار.",
            "اختبار إن مفيش إيميل بيتبعت لعنوان غلط.",
            "mailer مزيّف تاني، نضيف.",
            "signup لازم يرفض.",
            "والأهم: send متنادتش خالص.",
            "نهاية الاختبار.",
            "لو الكود بيستخدم object حقيقي.",
            "mailer حقيقي بيكلم النت (هنا بيرمي خطأ عشان نتأكد إنه ماتنادتش).",
            "spyOn بيبدّل send بس، ويخليها ترجع Promise بيتحل.",
            "دلوقتي signup بينادي الـ spy مش الأصلية.",
            "اتنادت مرة.",
            "رجّع الـ method الأصلية.",
            "نهاية الاختبار."
          ],
          sol: R`الاختبار الرابع بيعدّي أخضر: [[Tests 4 passed]]. [[mockRejectedValue]] خلّت send ترجع Promise بيترفض، و [[await mailer.send]] جوه signup رمى الخطأ لبرا، و [[rejects.toThrow("SMTP 421")]] مسكه.

ده بيأكد سلوك مهم: لو الإيميل فشل، signup بيفشل (أو، لو قررت إن التسجيل يكمّل، تغيّر الكود والاختبار يبقى [[resolves]]). في الحالتين الاختبار بيوثّق القرار.

الغلط الشائع: [[mockReturnValue(new Error(...))]]، فالدالة بترجع object خطأ عادي ومبترميش، والاختبار يقع بـ «promise resolved instead of rejecting».`,
          solCode: R`// src/signup.ts
export type Mailer = { send(to: string, subject: string): Promise<void> };

export async function signup(email: string, mailer: Mailer) {
  if (!email.includes("@")) throw new Error("invalid email");
  const user = { id: crypto.randomUUID(), email };
  await mailer.send(email, "Welcome to MyApp");
  return user;
}

// الاختبار الرابع
it("fails if the mail provider is down", async () => {
  const mailer = { send: vi.fn().mockRejectedValue(new Error("SMTP 421")) };
  await expect(signup("sara@example.com", mailer)).rejects.toThrow("SMTP 421");
});`
        },
        {
          cmd: "vi.mock",
          title: "تبدّل module كامل: عميل بوابة الدفع",
          desc: R`لما الكود بيعمل [[import { charge } from "./payments"]] جوه الملف ومش بياخده كـ argument، مش هتقدر تدّيله fake. [[vi.mock("./payments", factory)]] بيبدّل الـ module كله لأي حد يعمله import في الاختبار ده.

[[vi.mocked(charge)]] بيقول لـ TypeScript إنها mock، فتقدر تنادي [[mockResolvedValue]] عليها.

وخد بالك: [[vi.mock]] بيتنقل لأول الملف قبل الـ imports (hoisting)، فمينفعش يستخدم متغير متعرّف تحت.`,
          example: R`import { describe, it, expect, vi, beforeEach } from "vitest";
import { checkout } from "./checkout";
import { charge } from "./payments";

vi.mock("./payments", () => ({ charge: vi.fn() }));

beforeEach(() => {
  vi.mocked(charge).mockReset();
});

describe("checkout", () => {
  it("returns the payment id when the charge succeeds", async () => {
    vi.mocked(charge).mockResolvedValue({ id: "ch_1", status: "succeeded" });
    await expect(checkout(2500, "tok_visa")).resolves.toEqual({ ok: true, paymentId: "ch_1" });
    expect(charge).toHaveBeenCalledWith(2500, "tok_visa");
  });

  it("reports a declined card", async () => {
    vi.mocked(charge).mockResolvedValue({ id: "ch_2", status: "failed" });
    expect(await checkout(2500, "tok_declined")).toEqual({ ok: false, reason: "card_declined" });
  });

  it("never charges an empty cart", async () => {
    await expect(checkout(0, "tok_visa")).rejects.toThrow("empty cart");
    expect(charge).not.toHaveBeenCalled();
  });
});`,
          try: R`اعمل [[payments.ts]] و [[checkout.ts]] اللي في الحل وشغّل المثال. وبعدين جرّب الغلطة المشهورة: اعمل [[const chargeMock = vi.fn()]] فوق [[vi.mock]] واستخدمه جوه الـ factory. اقرا الخطأ، وصلّحه بـ [[vi.hoisted]].`,
          flag: "script",
          deep: {
            why: "مش عايز الاختبار يخصم فلوس من كارت حقيقي، ولا يعتمد على إن sandbox بوابة الدفع شغال، ولا ياخد ٣ ثواني عشان طلب HTTP. وعايز تجرّب حالات صعب تعملها بجد: كارت اترفض، أو البوابة رجعت خطأ. الـ mock بيخليك تتحكم في الرد.",
            how: R`vitest بيحوّل ملف الاختبار قبل ما يشغّله: أي [[vi.mock]] بيتنقل لأول الملف، قبل الـ imports. فلما [[checkout.ts]] يعمل [[import { charge } from "./payments"]]، بياخد النسخة المزيّفة. والمسار في [[vi.mock]] نسبة لملف الاختبار، ولازم يطابق نفس الـ module اللي الكود بيعمله import.

الـ factory بترجع الـ exports الجديدة. [[{ charge: vi.fn() }]] معناها الـ module كله بقى فيه charge مزيّفة بس. ولو محتاج باقي الـ exports الحقيقية: [[vi.mock(path, async (importOriginal) => ({ ...(await importOriginal()), charge: vi.fn() }))]]. ومن غير factory خالص، vitest بيعمل auto-mock: كل دالة بتبقى vi.fn فاضية.

عشان الـ hoisting، الـ factory بتشتغل قبل أي سطر تاني في الملف. لو استخدمت جواها [[const chargeMock]] متعرّف تحت، هتاخد [[ReferenceError: Cannot access 'chargeMock' before initialization]]. الحل [[vi.hoisted]]: [[const { chargeMock } = vi.hoisted(() => ({ chargeMock: vi.fn() }))]] بيتنقل هو كمان لفوق. والأبسط زي المثال: اعمل import للدالة نفسها واستخدم [[vi.mocked]].

وفي vitest 5، [[vi.mock]] و [[vi.hoisted]] لازم يبقوا في أعلى مستوى في الملف. لو كتبتهم جوه [[it]] أو [[describe]]، الملف كله بيقع بخطأ «defined outside of the module's top level scope». ولو فعلًا محتاج mock مختلف في اختبار واحد، فيه [[vi.doMock]] (مبيتنقلش) مع dynamic import.

[[beforeEach]] مع [[mockReset]] بيمسح النداءات والقيم اللي اتحددت، فكل اختبار يبدأ نضيف، و [[not.toHaveBeenCalled]] في الاختبار التالت ميتأثرش بالأولين.`,
            when: "SDK خارجي بيتعمل import مباشر: الدفع، والإيميل، والتخزين (S3)، و Redis. ولو انت اللي كاتب الكود، الأسهل إن الـ service ياخد الـ client كـ argument وتستخدم vi.fn عادي. vi.mock للكود اللي مش هتغيّر شكله.",
            mistakes: R`متغير في الـ factory قبل ما يتعرّف (الـ hoisting). ومسار مختلف عن اللي الكود بيستخدمه ([["./payments"]] في الاختبار و [["@/lib/payments"]] في الكود)، فالـ mock مبيتطبقش والاختبار يكلم البوابة بجد. ومن غير mockReset، القيمة اللي اختبار حددها ([[mockResolvedValue]]) بتفضل للي بعده: vitest 5 بيمسح النداءات بس لوحده ([[clearMocks: true]] افتراضي)، فاختبار ممكن يعدّي بنجاح دفع سابه اختبار قبله. (وفي jest، من غير reset، [[toHaveBeenCalledTimes(1)]] كمان بيلاقي نداءات الاختبارات اللي فاتت.) وتعمل mock لكل module في المشروع، فالاختبار بيعدّي والكود بايظ لأن كل حاجة حقيقية اتشالت: mock للحدود الخارجية بس (شبكة، وداتابيز، ووقت).`
          },
          teach: R`## الفكرة: نبدّل ملف كامل قبل ما حد يستورده

[[checkout.ts]] جواه [[import { charge } from "./payments"]]، و [[charge]] بتكلم بوابة الدفع على النت. مفيش argument نبعت منه fake، فبنقول لـ vitest: «أي حد في الاختبار ده يطلب [[./payments]]، ادّيله النسخة دي». اتشغّل على ويندوز 11 بـ vitest 5.0.3، والملفات من الحل.

---

## ١. ليه أصلًا؟ من غير mock

اختبار بينادي [[checkout]] على طول:

~~~text الناتج
 FAIL  src/nomock.test.ts > real network
TypeError: fetch failed
Caused by: Error: getaddrinfo ENOTFOUND api.payments.example

 Test Files  1 failed (1)
   Duration  467ms (tests 75%, ...)
~~~

[[getaddrinfo ENOTFOUND]] يعني الجهاز ملقاش عنوان IP للدومين ده (هنا الدومين وهمي). مع بوابة حقيقية كان هيخصم فلوس، أو يقع لو النت قاطع. ولاحظ إن ده لوحده أخد أكتر من ٢٠٠ ملي ثانية، والاختبارات المزيّفة بتاخد صفر.

---

## ٢. السطور فوق

~~~text checkout.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { checkout } from "./checkout";
import { charge } from "./payments";

vi.mock("./payments", () => ({ charge: vi.fn() }));
~~~

### [[vi.mock("./payments", factory)]]

- [["./payments"]] المسار **نسبة لملف الاختبار**، ولازم يوصل لنفس الملف اللي [[checkout.ts]] بيستورده.
- الـ factory دالة بترجّع الـ exports الجديدة. [[() => ({ ... })]]: الأقواس حوالين الـ [[{ }]] معناها «رجّع الـ object ده»، من غيرها JavaScript هيفتكرها جسم دالة.
- [[{ charge: vi.fn() }]] الملف كله بقى فيه [[charge]] واحدة مزيّفة بس.

### الـ hoisting

vitest بيعدّل ملف الاختبار قبل ما يشغّله: أي [[vi.mock]] بيتنقل **لأول الملف**، قبل الـ imports. فلما [[import { checkout }]] يشتغل و [[checkout.ts]] يطلب [[./payments]]، بياخد المزيّف. وسطر [[import { charge } from "./payments"]] في الاختبار بياخد نفس الـ [[vi.fn]]، فنقدر نتحكم فيها.

---

## ٣. [[beforeEach]] و [[vi.mocked]]

~~~text
beforeEach(() => {
  vi.mocked(charge).mockReset();
});
~~~

- [[beforeEach(fn)]] شغّل الدالة دي قبل كل اختبار.
- [[vi.mocked(charge)]] مبيعملش حاجة وقت التشغيل. هو بيقول لـ TypeScript «دي mock»، فيسمحلك تكتب [[.mockResolvedValue]] من غير خطأ أنواع.
- [[mockReset()]] بيمسح النداءات **والقيمة اللي اتحددت**، فكل اختبار يبدأ بـ [[charge]] بترجّع undefined.

### هو ضروري؟ جرّبت من غيره

vitest 5 عنده إعداد [[clearMocks: true]] افتراضيًا (لقيته في defaults بتاعته): بيمسح **النداءات** بين الاختبارات لوحده، بس **مش** القيمة اللي حددتها. اختبار أول حدد نجاح، واختبار تاني محددش حاجة:

~~~text الناتج
stdout | src/leak.test.ts > second test sets nothing
calls: 0
stdout | src/leak.test.ts > second test sets nothing
{ ok: true, paymentId: 'ch_1' }
~~~

[[calls: 0]] النداءات اتمسحت، بس [[checkout]] لسه بيرجّع [[ch_1]] من الاختبار اللي فات. ده بالظبط اللي [[mockReset]] بيمنعه: اختبار بيعدّي بقيمة سابها غيره.

---

## ٤. الاختبارات التلاتة

| الاختبار | الـ mock بيرجّع | المتوقع |
|---|---|---|
| succeeds | [[{ id: "ch_1", status: "succeeded" }]] | [[{ ok: true, paymentId: "ch_1" }]]، و [[charge]] اتنادت بـ [[(2500, "tok_visa")]] |
| declined | [[{ id: "ch_2", status: "failed" }]] | [[{ ok: false, reason: "card_declined" }]] |
| empty cart | مش محدد | يرفض بـ [[empty cart]] و [[charge]] متتناديش |

- [[2500]] المبلغ بالقروش (٢٥ جنيه/دولار)، عشان منتعاملش مع كسور.
- [["tok_visa"]] token الكارت: البوابات مش بتاخد رقم الكارت نفسه، بتاخد token متولّد في المتصفح.
- [[checkout]] في حالة الرفض **بترجّع** نتيجة مش بترمي، عشان كده [[toEqual]] مش [[rejects]].

~~~text الناتج
 Test Files  1 passed (1)
      Tests  3 passed (3)
~~~

---

## ٥. الغلطة المشهورة: متغير جوه الـ factory

~~~text hoistbad.test.ts
const chargeMock = vi.fn();
vi.mock("./payments", () => ({ charge: chargeMock }));
~~~

~~~text الناتج
 FAIL  src/hoistbad.test.ts [ src/hoistbad.test.ts ]
Error: [vitest] There was an error when mocking a module. If you are using "vi.mock" factory, make sure there are no top level variables inside, since this call is hoisted to top of the file.
 ❯ src/checkout.ts:1:1
Caused by: ReferenceError: Cannot access 'chargeMock' before initialization

 Test Files  1 failed (1)
      Tests  no tests
~~~

[[vi.mock]] اتنقل لفوق، فالـ factory اشتغلت لما [[checkout.ts]] عمل import (السهم على [[checkout.ts:1:1]])، وساعتها [[const chargeMock]] لسه متعرّفش. و [[no tests]]: الملف وقع قبل أي اختبار.

### الحل: [[vi.hoisted]]

~~~text
const { chargeMock } = vi.hoisted(() => ({ chargeMock: vi.fn() }));
vi.mock("./payments", () => ({ charge: chargeMock }));
~~~

[[vi.hoisted]] بيتنقل لفوق هو كمان، **قبل** [[vi.mock]]، والدالة بترجّع object نفكّه بـ [[const { chargeMock } =]]. النتيجة [[Tests 1 passed]].

### [[vi.mock]] جوه [[it]]

~~~text الناتج
Error: 1 call in "src/inside.test.ts" was defined outside of the module's top level scope:
- vi.mock("./payments") at src/inside.test.ts:4:3
Although it appears nested, it will be hoisted and executed before anything in this file. Move it to the top level to reflect its actual execution order.
~~~

vitest 5 بيرفض الملف كله، لأن شكل الكود بيكدب: باين إنه جوه اختبار وهو بيشتغل قبل كل حاجة.

---

## ٦. الكود الحقيقي اللي اتبدّل

- [[payments.ts]]: [[fetch]] بـ [[POST]] على البوابة، و [[JSON.stringify]] بيحوّل الـ object لنص يتبعت، و [[res.json()]] بيقرا الرد.
- [[checkout.ts]]: يرمي لو المبلغ صفر أو أقل، ينادي [[charge]]، ولو [[status]] مش [[succeeded]] يرجّع [[ok: false]]. و [[as const]] بيخلي TypeScript يعرف إن [[ok]] قيمتها [[false]] بالظبط مش أي boolean.

---

## الخلاصة

- [[vi.mock(path, factory)]] بيبدّل ملف كامل، وبيتنقل لأول الملف لوحده.
- متغير جوه الـ factory لازم ييجي من [[vi.hoisted]]، و [[vi.mock]] مكانه أعلى الملف مش جوه [[it]].
- [[vi.mocked]] للأنواع بس، و [[mockReset]] في [[beforeEach]] عشان القيم متتسرّبش بين الاختبارات (vitest 5 بيمسح النداءات لوحده، مش القيم).`,
          lines: [
            "vi و beforeEach جنب الباقي.",
            "الكود اللي بنختبره (جواه import لـ charge).",
            "هات charge نفسها، وهي هتبقى المزيّفة.",
            "بدّل module الدفع كله: charge بقت vi.fn. السطر ده بيتنقل لأول الملف.",
            "قبل كل اختبار...",
            "امسح النداءات والقيم القديمة.",
            "نهاية beforeEach.",
            "مجموعة checkout.",
            "الحالة الناجحة.",
            "المرة دي البوابة ترد بنجاح.",
            "checkout يرجّع ok و id الدفع.",
            "واتأكد إنه بعت المبلغ والكارت الصح.",
            "نهاية الاختبار.",
            "الكارت اترفض.",
            "البوابة ترد failed.",
            "checkout يرجّع ok: false والسبب، من غير ما يرمي.",
            "نهاية الاختبار.",
            "السلة فاضية.",
            "لازم يرفض قبل ما يكلم البوابة.",
            "ومفيش أي محاولة دفع.",
            "نهاية الاختبار.",
            "نهاية المجموعة."
          ],
          sol: R`المثال: [[Tests 3 passed]].

بالمتغير اللي فوق، الملف كله بيقع قبل أي اختبار: [[There was an error when mocking a module... since this call is hoisted to top of the file]] وتحتها [[Caused by: ReferenceError: Cannot access 'chargeMock' before initialization]]. السبب إن [[vi.mock]] اتنقل لفوق الـ const.

الحل: [[vi.hoisted]] بيعمل المتغير في نفس المكان اللي vi.mock اتنقل له. بعدها [[Tests 1 passed]].

ولو حطيت [[vi.mock]] جوه [[it]]، vitest 5 بيرفض برسالة «1 call ... was defined outside of the module's top level scope».`,
          solCode: R`// src/payments.ts: العميل الحقيقي (بيكلم النت)
export async function charge(amountCents: number, token: string): Promise<{ id: string; status: "succeeded" | "failed" }> {
  const res = await fetch("https://api.payments.example/v1/charges", {
    method: "POST",
    body: JSON.stringify({ amount: amountCents, source: token }),
  });
  return res.json() as Promise<{ id: string; status: "succeeded" | "failed" }>;
}

// src/checkout.ts
import { charge } from "./payments";

export async function checkout(totalCents: number, cardToken: string) {
  if (totalCents <= 0) throw new Error("empty cart");
  const payment = await charge(totalCents, cardToken);
  if (payment.status !== "succeeded") return { ok: false as const, reason: "card_declined" };
  return { ok: true as const, paymentId: payment.id };
}

// src/hoist.test.ts: التصليح بـ vi.hoisted
import { it, expect, vi } from "vitest";
import { checkout } from "./checkout";

const { chargeMock } = vi.hoisted(() => ({ chargeMock: vi.fn() }));
vi.mock("./payments", () => ({ charge: chargeMock }));

it("works with vi.hoisted", async () => {
  chargeMock.mockResolvedValue({ id: "c", status: "succeeded" });
  expect((await checkout(1, "t")).ok).toBe(true);
});`
        },
        {
          cmd: "vi.useFakeTimers",
          title: "كود فيه Date.now و setTimeout",
          desc: R`[[vi.useFakeTimers()]] بيبدّل الساعة: [[Date.now]] و [[new Date()]] و [[setTimeout]] و [[setInterval]] بقوا تحت إيدك. [[vi.setSystemTime(date)]] يثبّت الوقت، و [[vi.advanceTimersByTime(ms)]] يقدّم الساعة وينفّذ أي timer وقته جه.

فاختبار «الـ token بيخلص بعد ربع ساعة» بياخد ملي ثانية مش ربع ساعة.

وفي [[afterEach]] ارجع للوقت الحقيقي بـ [[vi.useRealTimers()]].`,
          example: R`import { it, expect, vi, beforeEach, afterEach } from "vitest";
import { isExpired, debounce } from "./time";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-09-01T10:00:00Z"));
});
afterEach(() => {
  vi.useRealTimers();
});

it("a token expires after 15 minutes", () => {
  const expiresAt = Date.now() + 15 * 60_000;
  expect(isExpired(expiresAt)).toBe(false);
  vi.advanceTimersByTime(15 * 60_000);
  expect(isExpired(expiresAt)).toBe(true);
});

it("debounce calls once with the last value", () => {
  const search = vi.fn();
  const onType = debounce(search, 300);
  onType("r"); onType("re"); onType("react");
  expect(search).not.toHaveBeenCalled();
  vi.advanceTimersByTime(300);
  expect(search).toHaveBeenCalledOnce();
  expect(search).toHaveBeenCalledWith("react");
});`,
          try: R`اكتب [[greeting()]] بترجع [["Good morning"]] قبل الساعة ١٢ و [["Good evening"]] بعدها (من [[new Date().getHours()]]). اختبرها في تلات أوقات: ٩ الصبح، و [[11:59:59]]، و ١٢ بالظبط.`,
          flag: "script",
          deep: {
            why: "كود الوقت أصعب حاجة تختبرها بجد: اختبار بيعدّي الصبح ويقع بالليل، أو بيستنى [[setTimeout]] ٥ ثواني فالاختبارات تبقى بطيئة، أو بيقع يوم ٢٩ فبراير بس. الوقت المزيّف بيخلي النتيجة نفسها كل مرة وعلى أي جهاز.",
            how: R`[[vi.useFakeTimers()]] بيحط نسخ مزيّفة من [[setTimeout]] و [[setInterval]] و [[Date]] وأخواتهم (بنفس مكتبة sinon الـ fake timers). الساعة مبتتحركش لوحدها. انت اللي بتحركها:

[[vi.advanceTimersByTime(ms)]] بيقدّم الساعة ms وينفّذ كل timer وقته جه بالترتيب. و [[vi.runAllTimers()]] بينفّذ كل اللي مستني. و [[vi.advanceTimersToNextTimer()]] لأقرب واحد بس.

[[vi.setSystemTime]] بيحدد [[Date.now()]] من غير ما يشغّل timers. وتقدر تعمل الاتنين مرة واحدة: [[vi.useFakeTimers({ now: new Date("...") })]].

لو الكود فيه [[await]] بين الـ timers (retry بيستنى ثانية وبعدين fetch)، استخدم النسخ الـ async: [[await vi.advanceTimersByTimeAsync(1000)]]، لأنها بتسيب الـ Promises تخلص بين كل timer والتاني.

و [[afterEach(() => vi.useRealTimers())]] مهم: من غيره الاختبار اللي بعده (أو مكتبة بتستخدم setTimeout) هتلاقي الساعة واقفة وتعلّق لحد الـ timeout.

والتاريخ في المثال فيه [[Z]] (UTC) عشان [[toISOString]] يطلع نفس الناتج على أي جهاز. أما [[getHours()]] فبيرجع الساعة المحلية للجهاز، فاختبار زي greeting يكتب الوقت من غير Z.`,
            when: "أي كود فيه: انتهاء صلاحية (token، و OTP، و كوبون)، و debounce و throttle، و retry مع انتظار، و cron، و «منذ ٥ دقايق»، و rate limit بنافذة وقت.",
            mistakes: R`تنسى [[useRealTimers]] فاختبارات تانية تعلّق. وتستخدم [[advanceTimersByTime]] مع كود فيه await، فالـ callback التاني مبيتنفّذش لأن الـ Promise لسه مخلصتش: النسخة Async. وتعمل [[await new Promise(r => setTimeout(r, 300))]] في اختبار والـ timers مزيّفة، فبيعلّق للأبد. واختبار بيستخدم [[new Date()]] الحقيقي ويقارن بتاريخ ثابت، فيعدّي النهارده ويقع بكرة.`
          },
          teach: R`## الفكرة: ساعة انت اللي بتحرّكها

الكود اللي بيقرا الوقت أو بيستنى timer نتيجته بتتغير حسب إمتى شغّلته. [[vi.useFakeTimers()]] بيبدّل الساعة بساعة واقفة، وانت بتقدّمها بإيدك. كله اتشغّل على ويندوز 11 بـ vitest 5.0.3، والدوال من الحل.

---

## ١. [[beforeEach]]: ساعة مزيّفة ووقت ثابت

~~~text
beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-09-01T10:00:00Z"));
});
~~~

- [[vi.useFakeTimers()]] بيبدّل [[setTimeout]] و [[setInterval]] و [[Date]] بنسخ مزيّفة. الساعة مبتتحركش لوحدها.
- [[vi.setSystemTime(...)]] بيثبّت «دلوقتي» على لحظة معروفة.
- [["2026-09-01T10:00:00Z"]] شكل ISO: التاريخ، و [[T]] فاصل، والساعة. و [[Z]] معناها UTC (توقيت جرينتش)، فاللحظة واحدة على أي جهاز في أي بلد.

---

## ٢. [[afterEach]]: رجّع الساعة

~~~text
afterEach(() => {
  vi.useRealTimers();
});
~~~

لو نسيته، أي اختبار بعده بيستنى timer حقيقي هيعلّق. جرّبت اختبار بيعمل [[await new Promise((r) => setTimeout(r, 300))]] والساعة مزيّفة:

~~~text الناتج
 ❯ src/hang.test.ts (1 test | 1 failed) 5016ms
   × waits with fake timers 5015ms

 FAIL  src/hang.test.ts > waits with fake timers
Error: Test timed out in 5000ms.
If this is a long-running test, pass a timeout value as the last argument or configure it globally with "testTimeout".
~~~

الـ ٣٠٠ ملي ثانية عمرها ما خلصت لأن محدش قدّم الساعة، و vitest قفل الاختبار بعد [[5000ms]] (الـ timeout الافتراضي).

---

## ٣. اختبار انتهاء الـ token

~~~text
const expiresAt = Date.now() + 15 * 60_000;
expect(isExpired(expiresAt)).toBe(false);
vi.advanceTimersByTime(15 * 60_000);
expect(isExpired(expiresAt)).toBe(true);
~~~

### [[Date.now()]] و [[60_000]]

[[Date.now()]] بيرجّع الوقت كرقم: عدد الملي ثواني من أول ١٩٧٠ UTC. و [[60_000]] هو ٦٠٠٠٠ (ملي ثانية = دقيقة)، والشرطة [[_]] مجرد فاصل للقراية زي الفاصلة في ٦٠,٠٠٠. فـ [[15 * 60_000]] = ٩٠٠٠٠٠ = ربع ساعة.

طبعت القيم جوه الاختبار ([[--silent=false]]):

~~~text الناتج
1788256800000 2026-09-01T10:00:00.000Z 1788257700000
2026-09-01T10:15:00.000Z
~~~

- أول رقم [[Date.now()]] = اللحظة المثبّتة بالظبط، والتالت [[expiresAt]] أكبر منه بـ ٩٠٠٠٠٠.
- السطر التاني بعد [[vi.advanceTimersByTime(15 * 60_000)]]: الساعة بقت ١٠:١٥، في ملي ثانية حقيقية.

و [[isExpired]] في الحل: [[Date.now() >= expiresAt]]، فبالظبط عند ١٠:١٥ بقت [[true]].

---

## ٤. اختبار الـ debounce

debounce يعني «استنى لحد ما اليوزر يبطّل، ونادي مرة واحدة بآخر قيمة». زي البحث وانت بتكتب: مش عايز طلب لكل حرف.

~~~text
const search = vi.fn();
const onType = debounce(search, 300);
onType("r"); onType("re"); onType("react");
expect(search).not.toHaveBeenCalled();
vi.advanceTimersByTime(300);
expect(search).toHaveBeenCalledOnce();
expect(search).toHaveBeenCalledWith("react");
~~~

- [[search]] [[vi.fn]] عشان نعرف اتنادت كام مرة وبإيه.
- [[debounce(search, 300)]] بيرجّع دالة جديدة [[onType]].
- تلات نداءات ورا بعض في نفس اللحظة (الساعة واقفة)، و [[;]] بتفصل بين الأوامر في نفس السطر.
- لسه مفيش نداء، لأن الـ timer مستني ٣٠٠.

جرّبت أقدّم ٢٩٩ الأول:

~~~text الناتج
after 299: 0
~~~

ولما قدّمت ١ كمان اتنادت مرة واحدة بـ [[react]]. يعني الـ timer بيتنفّذ لما وقته **يجي بالظبط**، مش قبله.

### الـ debounce نفسه (من الحل)

~~~text src/time.ts
export function debounce<A extends unknown[]>(fn: (...args: A) => void, ms: number) {
  let t: ReturnType<typeof setTimeout> | undefined;
  return (...args: A) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}
~~~

- [[<A extends unknown[]>]] generic: [[A]] نوع الـ arguments بتاعة [[fn]]، فـ [[onType]] بتاخد نفس الأنواع.
- [[...args]] كل الـ arguments في array، و [[fn(...args)]] بيفردهم تاني.
- [[ReturnType<typeof setTimeout>]] نوع اللي [[setTimeout]] بترجّعه (رقم في المتصفح، object في Node).
- كل نداء: [[clearTimeout(t)]] يلغي الـ timer القديم، و [[setTimeout]] يبدأ واحد جديد. فآخر واحد بس هو اللي بيكمّل.

---

## ٥. التجربة: [[greeting()]] في تلات أوقات

~~~text src/greeting.test.ts
it.each([
  ["2026-09-01T09:00:00", "Good morning"],
  ["2026-09-01T11:59:59", "Good morning"],
  ["2026-09-01T12:00:00", "Good evening"],
])("at %s says %s", (time, expected) => {
  vi.useFakeTimers({ now: new Date(time) });
  expect(greeting()).toBe(expected);
});
~~~

- [[it.each]] نفس الاختبار لكل صف ([[test.each]] الدرس الجاي). [[%s]] بيتبدّل بقيم الصف بالترتيب.
- [[vi.useFakeTimers({ now })]] الساعة المزيّفة والوقت في سطر واحد.
- الوقت **من غير [[Z]]**: [[getHours()]] بيرجّع الساعة المحلية، فالتاريخ لازم يتفهم محلي برضه. لو كتبت [[Z]] على جهاز توقيته مصر (UTC+3 في الصيف)، [[12:00Z]] تبقى ٣ العصر محلي والحالة الحدّية تضيع.

~~~text الناتج (--reporter=verbose)
 ✓ src/greeting.test.ts > at 2026-09-01T09:00:00 says Good morning 4ms
 ✓ src/greeting.test.ts > at 2026-09-01T11:59:59 says Good morning 0ms
 ✓ src/greeting.test.ts > at 2026-09-01T12:00:00 says Good evening 0ms
~~~

[[11:59:59]] و [[12:00:00]] الحدود: لو حد كتب [[<=]] مكان [[<]]، الاختبار التالت هيقع.

---

## الملخص

| الأمر | بيعمل إيه |
|---|---|
| [[vi.useFakeTimers()]] | ساعة واقفة بدل الحقيقية |
| [[vi.setSystemTime(d)]] | «دلوقتي» = [[d]]، من غير تشغيل timers |
| [[vi.advanceTimersByTime(ms)]] | قدّم الساعة ونفّذ اللي وقته جه |
| [[vi.advanceTimersByTimeAsync(ms)]] | نفسه وبيسيب الـ Promises تخلص بين الـ timers |
| [[vi.runAllTimers()]] | نفّذ كل اللي مستني |
| [[vi.useRealTimers()]] | رجّع الساعة الحقيقية |

## الخلاصة

- الوقت المزيّف بيخلي اختبار الوقت يعدّي في ملي ثانية وبنفس النتيجة كل مرة.
- [[useRealTimers]] في [[afterEach]] دايمًا، وإلا اللي بعده يعلّق ٥ ثواني ويقع.
- [[Z]] لما الكود بيقارن لحظات، ومن غير [[Z]] لما الكود بيقرا الساعة المحلية.`,
          lines: [
            "هات أدوات الوقت والـ hooks.",
            "الدالتين اللي بنختبرهم.",
            "قبل كل اختبار...",
            "ساعة مزيّفة بدل الحقيقية.",
            "وثبّت الوقت على لحظة معروفة (UTC).",
            "نهاية beforeEach.",
            "بعد كل اختبار...",
            "ارجع للساعة الحقيقية عشان محدش تاني يتأثر.",
            "نهاية afterEach.",
            "اختبار انتهاء الـ token.",
            "بيخلص بعد ربع ساعة من الوقت المثبّت.",
            "دلوقتي لسه صالح.",
            "قدّم الساعة ربع ساعة في ملي ثانية.",
            "دلوقتي خلص.",
            "نهاية الاختبار.",
            "اختبار الـ debounce.",
            "الدالة الحقيقية اللي بتتنادى بعد ما اليوزر يبطّل كتابة.",
            "لفّها بـ debounce ٣٠٠ ملي ثانية.",
            "اليوزر كتب ٣ حروف ورا بعض بسرعة.",
            "لسه متنادتش (الـ timer مستني).",
            "قدّم الساعة ٣٠٠.",
            "اتنادت مرة واحدة بس.",
            "بآخر قيمة.",
            "نهاية الاختبار."
          ],
          sol: R`[[Tests 3 passed]] ومع [[--reporter=verbose]] تشوف الاسم متولّد لكل حالة: [[at 2026-09-01T09:00:00 says Good morning]] وهكذا.

الحالة المهمة [[11:59:59]] و [[12:00:00]]: دي الحدود، وهي اللي بتمسك [[<=]] مكان [[<]]. والوقت مكتوب من غير [[Z]] لأن [[getHours()]] بيرجع الساعة المحلية للجهاز، فالنتيجة ثابتة على أي timezone.

لو الاختبار بيعدّي ساعة ويقع ساعة، يبقى نسيت [[useFakeTimers]] والكود بيقرا الساعة الحقيقية.`,
          solCode: R`// src/greeting.ts
export function greeting(): string {
  return new Date().getHours() < 12 ? "Good morning" : "Good evening";
}

// src/greeting.test.ts
import { it, expect, vi, afterEach } from "vitest";
import { greeting } from "./greeting";

afterEach(() => vi.useRealTimers());

it.each([
  ["2026-09-01T09:00:00", "Good morning"],
  ["2026-09-01T11:59:59", "Good morning"],
  ["2026-09-01T12:00:00", "Good evening"],
])("at %s says %s", (time, expected) => {
  vi.useFakeTimers({ now: new Date(time) });
  expect(greeting()).toBe(expected);
});

// src/time.ts: الدالتين اللي في المثال
export function isExpired(expiresAt: number): boolean {
  return Date.now() >= expiresAt;
}

export function debounce<A extends unknown[]>(fn: (...args: A) => void, ms: number) {
  let t: ReturnType<typeof setTimeout> | undefined;
  return (...args: A) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}`
        },
        {
          cmd: "test.each و beforeEach",
          title: "جدول حالات، وكل اختبار يبدأ نضيف",
          desc: R`[[it.each([...])]] بيشغّل نفس الاختبار على كل صف في جدول، وكل صف بيبقى اختبار لوحده باسمه. بدل ما تنسخ نفس الاختبار ٥ مرات.

[[beforeEach]] بيشتغل قبل كل اختبار: اعمل فيه object جديد، فكل اختبار يبدأ من الصفر ومفيش واحد بيسيب حاجة للتاني. و [[afterEach]] للتنضيف بعده.

و [[beforeAll]] / [[afterAll]] مرة واحدة للملف كله: لحاجة تقيلة زي فتح اتصال داتابيز.`,
          example: R`import { describe, it, expect, beforeEach } from "vitest";
import { discount, CouponStore } from "./coupon";

describe("discount", () => {
  it.each([
    { code: "SAVE10", total: 300, expected: 30 },
    { code: "FLAT50", total: 300, expected: 50 },
    { code: "FLAT50", total: 20, expected: 20 },
    { code: "BOGUS", total: 300, expected: 0 },
  ])("$code on $total gives $expected", ({ code, total, expected }) => {
    expect(discount(code, total)).toBe(expected);
  });
});

describe("CouponStore", () => {
  let store: CouponStore;
  beforeEach(() => {
    store = new CouponStore();
  });

  it("lets a user redeem a code once", () => {
    store.redeem("SAVE10", "u1");
    expect(() => store.redeem("SAVE10", "u1")).toThrow("already used");
  });

  it("starts clean in every test", () => {
    expect(() => store.redeem("SAVE10", "u1")).not.toThrow();
  });
});`,
          try: R`شغّل المثال بـ [[--reporter=verbose]] وشوف أسماء الحالات. وبعدين بوّظ العزل: شيل [[beforeEach]] واكتب [[const store = new CouponStore()]] مرة واحدة. شغّل الملف كله، وبعدين الاختبار التاني لوحده بـ [[-t "starts clean"]].`,
          flag: "script",
          deep: {
            why: "أسوأ اختبار هو اللي بيعدّي لوحده ويقع مع الباقي، أو العكس: بيعتمد على داتا سابها اختبار قبله. ده بيخلي الفشل عشوائي حسب الترتيب، والناس تبطّل تثق في الاختبارات. العزل (كل اختبار يجهّز حاجته بنفسه) بيحل ده. والجدول بيخليك تضيف حالة حدّية في سطر بدل ما تتكسل.",
            how: R`[[it.each(table)(name, fn)]]: الجدول array. لو كل صف object، الاسم يقدر يستخدم [[$code]] و [[$total]] من الـ object، والدالة بتاخد الصف كـ argument واحد تفكّه. ولو كل صف array ([[["SAVE10", 300, 30]]])، الاسم بيستخدم [[%s]] و [[%i]] بالترتيب، والدالة بتاخد العناصر كـ arguments منفصلة. وفيه [[describe.each]] لو عايز مجموعة كاملة لكل صف.

[[beforeEach]] جوه [[describe]] بيخص المجموعة دي بس. الترتيب: كل الـ beforeEach من برا لجوا، والاختبار، وبعدين الـ afterEach من جوا لبرا.

الـ [[let]] برا والتعيين جوه beforeEach: كده كل اختبار بياخد [[CouponStore]] جديد. لو [[const]] برا، كل الاختبارات بتشارك نفس الـ object، والتاني بيلاقي الكوبون مستخدم من الأول.

للداتابيز: [[beforeAll]] يفتح الاتصال، و [[afterAll]] يقفله (وإلا الـ process ميقفلش)، و [[beforeEach]] يمسح الجداول أو يبدأ transaction، و [[afterEach]] يرجّعها. (ده بالتفصيل في «تاب Backend بـ Node» المستوى التالت.)

و vitest بيشغّل الملفات بالتوازي، بس الاختبارات جوه الملف الواحد بالترتيب. فالعزل بين الملفات بيجي لوحده، وجوه الملف مسؤوليتك.`,
            when: "each: دالة ليها مدخلات كتير ومخرج (خصم، و validation، و parsing، و format تاريخ). beforeEach: أي object فيه state أو mock بيتسجّل عليه نداءات.",
            mistakes: R`state مشترك (const برا) فالاختبارات تعتمد على الترتيب، و [[-t]] يعدّي والملف كله يقع. و each بجدول ٤٠ صف بيختبر نفس الحاجة، فالتقرير طويل ومفيش فايدة زيادة: اختار الحدود (صفر، وأقل من الخصم، وأكبر، وقيمة غلط). و [[beforeAll]] لحاجة بتتغير (زي array) بدل beforeEach. وتحط منطق if جوه الـ each ([[if (code === "BOGUS") ...]]): لو محتاج if، يبقى دول اختبارين مختلفين.`
          },
          teach: R`## الفكرة: جدول بدل نسخ، وبداية نضيفة لكل اختبار

الملف فيه مجموعتين: [[discount]] بـ [[it.each]] (اختبار واحد بيتكرر على ٤ صفوف)، و [[CouponStore]] بـ [[beforeEach]] (كل اختبار بياخد store جديد). اتشغّل على ويندوز 11 بـ vitest 5.0.3، والكود من الحل.

---

## ١. [[it.each([...])(name, fn)]]

لاحظ الشكل: قوسين ورا بعض. [[it.each(table)]] بيرجّع دالة، والدالة دي بتاخد الاسم والاختبار.

~~~text
it.each([
  { code: "SAVE10", total: 300, expected: 30 },
  { code: "FLAT50", total: 300, expected: 50 },
  { code: "FLAT50", total: 20, expected: 20 },
  { code: "BOGUS", total: 300, expected: 0 },
])("$code on $total gives $expected", ({ code, total, expected }) => {
  expect(discount(code, total)).toBe(expected);
});
~~~

- الجدول array، وكل صف object فيه المدخلات والنتيجة المتوقعة.
- [["$code on $total gives $expected"]]: كل [[$اسم]] بيتبدّل بالخانة اللي بنفس الاسم في الصف. (دي مش [[$]] بتاعة PowerShell، دي جوه نص JavaScript.)
- [[({ code, total, expected }) =>]] الدالة بتاخد الصف كله، والأقواس [[{ }]] بتفكّه لتلات متغيرات (destructuring).

### ليه الصفوف دي بالذات؟

| الصف | الحسبة في [[discount]] | بيختبر |
|---|---|---|
| SAVE10 على ٣٠٠ | [[Math.round(300 * 0.1)]] = ٣٠ | الخصم بالنسبة |
| FLAT50 على ٣٠٠ | [[Math.min(50, 300)]] = ٥٠ | الخصم الثابت |
| FLAT50 على ٢٠ | [[Math.min(50, 20)]] = ٢٠ | الخصم ميعدّيش الإجمالي |
| BOGUS على ٣٠٠ | ولا [[if]] اتحقق = ٠ | كود غلط |

كل صف حالة مختلفة، مش نفس الحالة بأرقام تانية.

~~~powershell
npx vitest run src/coupon.test.ts --reporter=verbose
~~~

~~~text الناتج
 ✓ src/coupon.test.ts > discount > SAVE10 on 300 gives 30 2ms
 ✓ src/coupon.test.ts > discount > FLAT50 on 300 gives 50 0ms
 ✓ src/coupon.test.ts > discount > FLAT50 on 20 gives 20 0ms
 ✓ src/coupon.test.ts > discount > BOGUS on 300 gives 0 0ms
 ✓ src/coupon.test.ts > CouponStore > lets a user redeem a code once 2ms
 ✓ src/coupon.test.ts > CouponStore > starts clean in every test 0ms

 Test Files  1 passed (1)
      Tests  6 passed (6)
~~~

كل صف بقى اختبار لوحده باسمه، فلو واحد وقع تعرف أنهي حالة من غير ما تفتح الملف.

### الصفوف كـ arrays

جرّبت الشكل التاني:

~~~text
it.each([
  ["SAVE10", 300, 30],
  ["BOGUS", 300, 0],
])("%s on %i gives %i", (code, total, expected) => { ... });
~~~

~~~text الناتج
 ✓ src/order.test.ts > SAVE10 on 300 gives 30 1ms
 ✓ src/order.test.ts > BOGUS on 300 gives 0 0ms
~~~

[[%s]] نص و [[%i]] رقم صحيح، بالترتيب. والدالة بتاخد العناصر كـ arguments منفصلة. شكل الـ objects أوضح لما الخانات كتير.

---

## ٢. [[CouponStore]] و [[beforeEach]]

~~~text
describe("CouponStore", () => {
  let store: CouponStore;
  beforeEach(() => {
    store = new CouponStore();
  });
  ...
});
~~~

- [[let store: CouponStore;]] متغير متعرّف بس فاضي. [[let]] مش [[const]] لأننا هنعيّن فيه قيمة جديدة كل مرة.
- [[beforeEach]] جوه الـ describe: بيشتغل قبل كل اختبار **في المجموعة دي بس**.
- [[new CouponStore()]] object جديد من الـ class، جواه [[Set]] فاضي.

والـ class (من الحل): [[redeem]] بيعمل مفتاح [["u1:SAVE10"]]، لو موجود في الـ [[Set]] يرمي [[already used]]، ولو لأ يضيفه. ([[Set]] مجموعة مبتكرّرش قيم، و [[has]] بيسأل «موجود؟».)

### الاختبارين

- الأول بيستخدم الكوبون، والمرة التانية لازم ترمي.
- التاني بيستخدم **نفس الكوبون لنفس اليوزر** ولازم ميرميش. ده بيعدّي بس لو الـ store جديد.

---

## ٣. التجربة: نشيل [[beforeEach]]

بدّلت السطرين بـ [[const store = new CouponStore();]] مرة واحدة:

~~~text الناتج
 ❯ src/coupon2.test.ts (6 tests | 1 failed) 11ms
   ❯ CouponStore (2)
     × starts clean in every test 6ms

 FAIL  src/coupon2.test.ts > CouponStore > starts clean in every test
AssertionError: expected [Function] to not throw an error but 'Error: already used' was thrown

 Test Files  1 failed (1)
      Tests  1 failed | 5 passed (6)
~~~

الاختبار التاني لقى [["u1:SAVE10"]] في الـ store من الاختبار الأول. وبعدين شغّلته لوحده:

~~~powershell
npx vitest run src/coupon2.test.ts -t "starts clean"
~~~

~~~text الناتج
 Test Files  1 passed (1)
      Tests  1 passed | 5 skipped (6)
~~~

[[-t]] بيشغّل الاختبارات اللي اسمها فيه النص ده، والباقي [[skipped]]. نفس الاختبار عدّى لوحده ووقع مع غيره: دي علامة state مشترك.

---

## ٤. الترتيب: مين بيشتغل إمتى

حطيت [[console.log]] في كل hook، و describe فيه اختبارين جوه ملف فيه hooks برا:

~~~text الناتج (من غير سطور اختبارات each اللي في نفس الملف)
beforeAll
  outer beforeEach
    inner beforeEach
      t1
    inner afterEach
  outer afterEach
  outer beforeEach
    inner beforeEach
      t2
    inner afterEach
  outer afterEach
afterAll
~~~

| الـ hook | بيشتغل | مثال |
|---|---|---|
| [[beforeAll]] | مرة قبل كل الملف (أو الـ describe) | افتح اتصال داتابيز |
| [[beforeEach]] | قبل كل اختبار، من برا لجوا | object جديد، امسح الجداول |
| [[afterEach]] | بعد كل اختبار، من جوا لبرا | رجّع الساعة، امسح mocks |
| [[afterAll]] | مرة في الآخر | اقفل الاتصال |

---

## الخلاصة

- [[it.each]] لحالات مختلفة لنفس الدالة، والاسم بياخد قيم الصف ([[$code]] أو [[%s]]).
- [[let]] برا و [[new]] جوه [[beforeEach]]: كل اختبار بيبدأ من الصفر.
- اختبار بيعدّي بـ [[-t]] لوحده ويقع مع الملف = حاجة مشتركة بين الاختبارات.`,
          lines: [
            "beforeEach جنب الباقي.",
            "الدالة والـ class اللي بنختبرهم.",
            "مجموعة discount.",
            "جدول حالات، كل صف object.",
            "الخصم بالنسبة.",
            "الخصم الثابت.",
            "الخصم الثابت أكبر من الإجمالي: ميعدّيش الإجمالي.",
            "كود غلط: صفر.",
            "اسم كل حالة من قيم الصف، والدالة بتاخد الصف.",
            "نفس الشرط لكل صف.",
            "نهاية each.",
            "نهاية المجموعة.",
            "مجموعة CouponStore.",
            "متغير هيتملى قبل كل اختبار.",
            "قبل كل اختبار في المجموعة دي...",
            "store جديد فاضي.",
            "نهاية beforeEach.",
            "اختبار: الكوبون مرة واحدة لكل يوزر.",
            "أول مرة تعدّي.",
            "التانية ترمي.",
            "نهاية الاختبار.",
            "اختبار بيثبت إن مفيش حاجة فاضلة من اللي قبله.",
            "نفس الكوبون ونفس اليوزر، ومفيش خطأ لأن الـ store جديد.",
            "نهاية الاختبار.",
            "نهاية المجموعة."
          ],
          sol: R`الأصلي: ٦ اختبارات أخضر، والأسماء زي [[SAVE10 on 300 gives 30]] و [[FLAT50 on 20 gives 20]].

من غير beforeEach: الملف كله [[Tests 1 failed | 5 passed]]، والواقع [[starts clean in every test]] لأن الاختبار اللي قبله استخدم الكوبون في نفس الـ store. ومع [[-t "starts clean"]] لوحده: [[1 passed | 5 skipped]]. نفس الاختبار عدّى لوحده ووقع مع غيره، ودي علامة state مشترك.

الحل مش إنك ترتّب الاختبارات. الحل إن كل اختبار يعمل حاجته بنفسه (beforeEach).`,
          solCode: R`// src/coupon.ts
export function discount(code: string, total: number): number {
  if (code === "SAVE10") return Math.round(total * 0.1);
  if (code === "FLAT50") return Math.min(50, total);
  return 0;
}

export class CouponStore {
  private used = new Set<string>();
  redeem(code: string, userId: string) {
    const key = userId + ":" + code;
    if (this.used.has(key)) throw new Error("already used");
    this.used.add(key);
  }
}`
        },
        {
          cmd: "اختبار كويس",
          title: "إيه اللي يخلي الاختبار يستاهل",
          desc: R`الاختبار الكويس بيختبر السلوك (إيه اللي بيحصل) مش التنفيذ (إزاي بيحصل). لو غيّرت الكود من جوه والنتيجة هي هي، الاختبار المفروض يفضل أخضر.

وليه سبب واحد يقع: اسمه بيقول حاجة واحدة، ولما يقع تعرف إيه اللي باظ من غير ما تفتح الكود.

الأول هنا بيختبر التنفيذ (نادى [[randomUUID]] مرة)، والتاني بيختبر السلوك (كل يوزر ليه id مختلف).`,
          example: R`import { it, expect, vi } from "vitest";
import { signup } from "./signup";

// هش: بيختبر إزاي
it("calls randomUUID once", async () => {
  const spy = vi.spyOn(crypto, "randomUUID");
  await signup("a@b.co", { send: vi.fn() });
  expect(spy).toHaveBeenCalledTimes(1);
});

// كويس: بيختبر إيه
it("gives each new user a different id", async () => {
  const mailer = { send: vi.fn() };
  const a = await signup("a@b.co", mailer);
  const b = await signup("b@b.co", mailer);
  expect(a.id).not.toBe(b.id);
});`,
          try: R`الاختبار ده بيقع لو غيّرت نص الإيميل، أو طريقة الـ id، أو رسالة الخطأ، واسمه مبيقولش أنهي. قسّمه لاختبارات كل واحد بيختبر سلوك واحد: [[it("signup works", async () => { const mailer = { send: vi.fn() }; const user = await signup("a@b.co", mailer); expect(user.id).toHaveLength(36); expect(mailer.send).toHaveBeenCalledWith("a@b.co", "Welcome to MyApp"); await expect(signup("bad", mailer)).rejects.toThrow(); })]]`,
          flag: "script",
          deep: {
            why: "اختبارات بتختبر التنفيذ بتقع كل مرة تعمل refactor، حتى لو الكود لسه صح. فالناس بتبطّل تعمل refactor، أو بتعدّل الاختبار أوتوماتيك لحد ما يعدّي من غير ما تفكر، وساعتها الاختبار ملوش قيمة. الاختبار المفروض يقع لما السلوك يبوظ بس.",
            how: R`اسأل: «لو حد كتب الدالة دي من الأول بطريقة تانية تمامًا وبنفس السلوك، الاختبار هيعدّي؟» لو لأ، انت بتختبر التنفيذ.

علامات اختبار التنفيذ: spy على دالة داخلية أو private، وعدد مرات نداء حاجة جوه الكود مش side effect خارجي، و snapshot لـ object كبير فيه كل التفاصيل، و mock لكل dependency لحد ما الاختبار بقى نسخة من الكود.

الـ mock مقبول على الحدود: الإيميل اتبعت؟ الدفع اتطلب بالمبلغ الصح؟ دي سلوك الـ service من برا. بس «نادى randomUUID» ده تفصيلة، ولو غيّرتها لـ [[nanoid]] مفيش حاجة باظت.

وسبب واحد للفشل: اختبار بـ ٥ expects عن ٣ حاجات مختلفة، أول expect يقع والباقي ميتشغّلش، فمتعرفش لو فيه حاجة تانية بايظة. اختبار لكل سلوك، واسم بيقوله. أكتر من expect عادي لو كلهم بيوصفوا نفس النتيجة (الـ user راجع بالإيميل الصح والـ id موجود).

وباقي الصفات: سريع (ملي ثواني، من غير شبكة)، ومستقل (مبيعتمدش على ترتيب)، وثابت (نفس النتيجة كل مرة، من غير وقت حقيقي أو random)، ومقروء (تفهم الحالة من غير ما تقرا الكود).

وقبل ما تثق في اختبار جديد، بوّظ الكود عمدًا وشوفه بيقع. اختبار عمره ما وقع ممكن يكون مبيختبرش حاجة.`,
            when: "مع كل اختبار بتكتبه، وفي الـ code review: لو شفت اختبار بيعمل spy على private method، أو بيقع مع كل refactor، اسأل بيختبر إيه.",
            mistakes: R`coverage ١٠٠٪ كهدف، فتكتب اختبارات بتنادي كل سطر ومبتتأكدش من حاجة. و [[toMatchSnapshot()]] على كل حاجة، والناس تعمل [[-u]] من غير ما تبص. واختبار عمره ما وقع. وفي الانترفيو: «إيه اللي يخلي الاختبار هش؟» الإجابة: مربوط بالتنفيذ، أو بيعتمد على وقت أو ترتيب أو شبكة. و «امتى تعمل mock؟» على الحدود الخارجية بس.`
          },
          teach: R`## الفكرة: نختبر «إيه» مش «إزاي»

الاختبارين في المثال الاتنين بيعدّوا النهارده. الفرق بيبان لما حد يغيّر الكود من جوه والسلوك يفضل هو هو. هنشغّلهم، وبعدين نعمل refactor حقيقي ونشوف مين وقع. اتشغّل على ويندوز 11 بـ vitest 5.0.3، و [[signup]] من درس [[vi.fn و vi.spyOn]].

---

## ١. الاختبار الهش

~~~text
it("calls randomUUID once", async () => {
  const spy = vi.spyOn(crypto, "randomUUID");
  await signup("a@b.co", { send: vi.fn() });
  expect(spy).toHaveBeenCalledTimes(1);
});
~~~

- [[crypto]] object جاهز في Node والمتصفح، و [[crypto.randomUUID()]] بيعمل id عشوائي زي [[b0cf1537-a901-4ec6-bd82-0a56dce22354]].
- [[vi.spyOn(crypto, "randomUUID")]] بيتجسس عليها من غير ما يبدّلها، فبتشتغل عادي وبتتسجّل.
- [[{ send: vi.fn() }]] mailer مزيّف مكتوب جوه النداء على طول.
- الشرط: [[randomUUID]] اتنادت مرة.

السؤال: اليوزر يفرق معاه [[randomUUID]] اتنادت ولا لأ؟ لأ. ده **إزاي** الكود بيعمل الـ id.

## ٢. الاختبار الكويس

~~~text
it("gives each new user a different id", async () => {
  const mailer = { send: vi.fn() };
  const a = await signup("a@b.co", mailer);
  const b = await signup("b@b.co", mailer);
  expect(a.id).not.toBe(b.id);
});
~~~

يوزرين، والشرط إن الـ id مختلف. ده **إيه** اللي لازم يحصل: كل يوزر ليه id خاص بيه، بأي طريقة.

~~~text الناتج (--reporter=verbose)
 ✓ src/good.test.ts > calls randomUUID once 6ms
 ✓ src/good.test.ts > gives each new user a different id 1ms
~~~

---

## ٣. الـ refactor: id بعدّاد بدل [[randomUUID]]

غيّرت سطرين في [[signup.ts]]، والسلوك لسه صح (كل يوزر ليه id مختلف):

~~~text src/signup.ts (بعد التعديل)
let n = 0;
...
  const user = { id: "u" + (++n), email };
~~~

[[++n]] زوّد [[n]] واحد ورجّع القيمة الجديدة، فالـ ids بقت [[u1]] و [[u2]]...

~~~text الناتج
 ❯ src/good.test.ts (2 tests | 1 failed) 11ms
   × calls randomUUID once 8ms

 FAIL  src/good.test.ts > calls randomUUID once
AssertionError: expected "randomUUID" to be called 1 times, but got 0 times

 Test Files  1 failed | 1 passed (2)
      Tests  1 failed | 4 passed (5)
~~~

الاختبار الهش وقع ([[got 0 times]]) والكود سليم، والاختبار الكويس وتلاتة الحل فضلوا أخضر. ده اسمه false alarm: الاختبار بيصرخ ومفيش مشكلة، ومع الوقت الناس بتبطّل تصدّقه. (ورجّعت الملف زي ما كان بعد التجربة.)

---

## ٤. الحل: تلات اختبارات، كل واحد سلوك

~~~text الناتج (--reporter=verbose)
 ✓ src/good2.test.ts > signup > gives every new user a different id 6ms
 ✓ src/good2.test.ts > signup > sends the welcome email to the address that signed up 1ms
 ✓ src/good2.test.ts > signup > rejects an invalid email without sending anything 2ms
~~~

| الاختبار الأصلي في التجربة | الحل | ليه |
|---|---|---|
| [[expect(user.id).toHaveLength(36)]] | [[a.id]] مش زي [[b.id]] | الطول تفصيلة، والسلوك إنه فريد |
| [[toHaveBeenCalledWith("a@b.co", "Welcome to MyApp")]] | [[toHaveBeenCalledWith("a@b.co", expect.any(String))]] | العنوان هو المهم، والنص بيتغير |
| [[rejects.toThrow()]] من غير رسالة | [[rejects.toThrow("invalid email")]] و [[not.toHaveBeenCalled()]] | أي خطأ كان هيعدّي، حتى typo |
| كله في [[it("signup works")]] | ٣ أسامي | لما يقع تعرف أنهي سلوك |

[[expect.any(String)]] معناها «أي نص». و [[toHaveLength(36)]] كانت هتقع مع الـ refactor اللي فوق برضه ([["u1"]] طوله ٢).

---

## ٥. أسئلة تسألها لأي اختبار

| السؤال | لو الإجابة لأ |
|---|---|
| لو حد كتب الدالة من الأول بنفس السلوك، هيعدّي؟ | بيختبر التنفيذ |
| اسمه بيقول هيقع ليه؟ | قسّمه |
| بيدّي نفس النتيجة كل مرة وعلى أي جهاز؟ | فيه وقت أو random أو شبكة حقيقية |
| بيعدّي لوحده ومع الباقي؟ | فيه state مشترك |
| وقع مرة لما بوّظت الكود؟ | ممكن مبيختبرش حاجة |

---

## الخلاصة

- اختبر اللي بيبان من برا: الرجوع، والأخطاء، والـ side effects على الحدود (إيميل، دفع).
- spy على تفصيلة جوه الكود = اختبار بيقع مع كل refactor.
- اختبار واحد = سلوك واحد = سبب واحد يقع بيه.`,
          lines: [
            "هات it و expect و vi.",
            "الـ service.",
            "اختبار مربوط بالتنفيذ.",
            "بيتجسس على دالة داخلية.",
            "بيسجّل يوزر.",
            "ويتأكد إنها اتنادت مرة. لو غيّرتها لـ nanoid يقع والكود سليم.",
            "نهاية الاختبار.",
            "اختبار بيوصف السلوك من برا.",
            "mailer مزيّف.",
            "يوزر أول.",
            "يوزر تاني.",
            "اللي يهمنا فعلًا: كل واحد ليه id مختلف.",
            "نهاية الاختبار."
          ],
          sol: R`تلات اختبارات، كل واحد بسلوك واحد، واسمه جملة: [[gives every new user a different id]] و [[sends the welcome email to the address that signed up]] و [[rejects an invalid email without sending anything]]. النتيجة [[Tests 3 passed]].

لاحظ إن [[toHaveLength(36)]] اتشالت: طول الـ id تفصيلة تنفيذ، والسلوك إنه فريد. والـ subject بقى [[expect.any(String)]] لأن المهم العنوان. والاختبار التالت زاد حاجة كانت ناقصة: إن مفيش إيميل اتبعت للعنوان الغلط.

دلوقتي لو حد غيّر نص الترحيب، مفيش حاجة بتقع. ولو حد كسر الـ validation، اختبار واحد بيقع واسمه بيقول إيه.`,
          solCode: R`import { describe, it, expect, vi } from "vitest";
import { signup } from "./signup";

describe("signup", () => {
  it("gives every new user a different id", async () => {
    const mailer = { send: vi.fn() };
    const a = await signup("a@b.co", mailer);
    const b = await signup("b@b.co", mailer);
    expect(a.id).not.toBe(b.id);
  });

  it("sends the welcome email to the address that signed up", async () => {
    const mailer = { send: vi.fn() };
    await signup("a@b.co", mailer);
    expect(mailer.send).toHaveBeenCalledWith("a@b.co", expect.any(String));
  });

  it("rejects an invalid email without sending anything", async () => {
    const mailer = { send: vi.fn() };
    await expect(signup("bad", mailer)).rejects.toThrow("invalid email");
    expect(mailer.send).not.toHaveBeenCalled();
  });
});`
        }
      ]
    }
]);
