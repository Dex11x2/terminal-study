// تكملة تاب sweng: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/sweng/01.js (شرح حقول الدرس في أوله)
MORE("sweng", [
    {
      t: "الاختبارات بالـ TDD",
      l: 3,
      n: "red ثم green ثم refactor، واختبار لكل bug، وتختبر السلوك مش التفاصيل، وتوزّع الاختبارات صح",
      items: [
        {
          cmd: "red green refactor",
          title: "تكتب الاختبار الأول، وتشوفه بيفشل، وبعدين الكود",
          desc: R`TDD (Test-Driven Development) دورة صغيرة بتتكرر كل كام دقيقة: red: اكتب اختبار واحد لسلوك لسه مش موجود، وشغّله وشوفه بيفشل. green: اكتب أقل كود يخليه يعدّي، حتى لو شكله وحش. refactor: نضّف الكود والاختبارات خضرا. وبعدين الاختبار اللي بعده.

المثال ميزة الكوبون بعد ٤ دورات، والاختبارات بالترتيب اللي اتكتبت بيه. كل اختبار زوّد سلوك واحد، والكود كبر خطوة خطوة معاه. والخطوات نفسها مكتوبة في «إزاي».`,
          example: R`import { describe, it, expect } from "vitest";

type Coupon = { kind: "percent" | "fixed"; value: number; minOrder?: number };

export function applyCoupon(subtotal: number, coupon: Coupon): number {
  if (coupon.minOrder !== undefined && subtotal < coupon.minOrder) throw new Error("MIN_ORDER_NOT_MET");
  const discount = coupon.kind === "percent" ? (subtotal * coupon.value) / 100 : coupon.value;
  return Math.max(0, subtotal - discount);
}

describe("applyCoupon", () => {
  it("percent coupon takes a percentage off", () => {
    expect(applyCoupon(200, { kind: "percent", value: 10 })).toBe(180);
  });
  it("fixed coupon takes a fixed amount off", () => {
    expect(applyCoupon(200, { kind: "fixed", value: 50 })).toBe(150);
  });
  it("never goes below zero", () => {
    expect(applyCoupon(30, { kind: "fixed", value: 50 })).toBe(0);
  });
  it("rejects orders under the minimum", () => {
    expect(() => applyCoupon(99, { kind: "fixed", value: 20, minOrder: 100 })).toThrow("MIN_ORDER_NOT_MET");
  });
});`,
          try: R`كمّل الميزة بالـ TDD: الكوبون ليه تاريخ انتهاء [[expiresAt]]. شغّل [[npx vitest]] (بيفضل شغال ويعيد مع كل حفظ). اكتب الاختبار الأول بس ([[rejects an expired coupon]]) وشوفه أحمر، وبعدين أقل كود يخضّره، وبعدين اختبار «قبل الانتهاء بثانية شغال»، وبعدين «كوبون من غير تاريخ مبينتهيش». ممنوع تكتب سطر في [[applyCoupon]] من غير اختبار أحمر بيطلبه. وخلّي الوقت parameter عشان الاختبار ميعتمدش على النهارده.`,
          sol: R`أول اختبار أحمر، والرسالة غالبًا [[expected [Function] to throw an error]] لأن الدالة لسه مبترميش. أقل كود يخضّره: [[if (coupon.expiresAt && now >= coupon.expiresAt) throw new Error('COUPON_EXPIRED')]]، و [[now]] parameter تالت قيمته الافتراضية [[new Date()]]، فالكود اللي بينادي الدالة ماتغيرش والاختبار بيبعت وقت ثابت.

الاختبار التاني («قبل الانتهاء بثانية») غالبًا هيطلع أخضر من أول مرة. ده عادي ومعناه إن الكود اللي فات غطّاه، بس اتأكد إنه فعلًا بيختبر حاجة: غيّر [[>=]] لـ [[>]] مؤقتًا وشوف مين يحمرّ. لو ولا اختبار احمرّ، يبقى الحد نفسه (لحظة الانتهاء بالظبط) مش متغطي، وده اللي الاختبار التاني في الحل بيغطيه.

والترتيب مهم: الانتهاء قبل الحد الأدنى، عشان الكوبون المنتهي يقول «منتهي» حتى لو الطلب صغير. ده قرار بيزنس، والاختبار بقى بيوثّقه. الغلط الشائع إنك تستخدم [[new Date()]] جوه الدالة وتختبر بكوبون [[expiresAt: new Date('2020-01-01')]]، فالاختبار بيعدّي النهارده بس «الكوبون الصالح» في الاختبار هيبقى منتهي يوم ما تاريخه يعدّي.`,
          solCode: R`import { it, expect } from "vitest";

type Coupon = { kind: "percent" | "fixed"; value: number; minOrder?: number; expiresAt?: Date };

export function applyCoupon(subtotal: number, coupon: Coupon, now = new Date()): number {
  if (coupon.expiresAt && now >= coupon.expiresAt) throw new Error("COUPON_EXPIRED");
  if (coupon.minOrder !== undefined && subtotal < coupon.minOrder) throw new Error("MIN_ORDER_NOT_MET");
  const discount = coupon.kind === "percent" ? (subtotal * coupon.value) / 100 : coupon.value;
  return Math.max(0, subtotal - discount);
}

const endOfSept = new Date("2026-09-30T21:00:00Z");
const coupon: Coupon = { kind: "fixed", value: 50, expiresAt: endOfSept };

it("accepts the coupon before it expires", () => {
  expect(applyCoupon(200, coupon, new Date("2026-09-30T20:59:59Z"))).toBe(150);
});
it("rejects the coupon at the expiry moment and after", () => {
  expect(() => applyCoupon(200, coupon, endOfSept)).toThrow("COUPON_EXPIRED");
});
it("coupons without expiresAt never expire", () => {
  expect(applyCoupon(200, { kind: "fixed", value: 50 }, new Date("2099-01-01"))).toBe(150);
});`,
          flag: "script",
          deep: {
            why: R`لما تكتب الاختبار الأول، بتضطر تقرر شكل الدالة من ناحية اللي هيستخدمها (الاسم، والـ parameters، وبترجع إيه وبترمي إيه) قبل ما تغرق في التفاصيل. والاختبار اللي شفته أحمر قبل ما يخضر اختبار انت متأكد إنه بيختبر حاجة. أما الاختبار اللي اتكتب بعد الكود وعدّى من أول مرة، ممكن يكون بيعدّي مهما حصل (نسيت [[await]]، أو بتقارن الحاجة بنفسها). وفي الآخر بيطلعلك كود كل سطر فيه وراه اختبار.`,
            how: R`الدورات اللي طلّعت المثال:

١. red: اختبار الـ percent. الدالة مش موجودة، فالملف مش بيشتغل. green: [[return subtotal * 0.9]]. أيوه، hardcoded. ده بيأكد إن الاختبار والتوصيل شغالين.

٢. red: اختبار الـ fixed ([[expected 180 to be 150]]). دلوقتي الكود مضطر يفرّق بين النوعين ويستخدم [[coupon.value]] بجد. green: الـ ternary. refactor: اسم [[discount]] للنتيجة.

٣. red: ٣٠ بكوبون ٥٠ طلّع [[-20]]. green: [[Math.max(0, ...)]].

٤. red: الحد الأدنى ([[expected [Function] to throw an error]]). green: الـ if في الأول.

الفكرة في خطوة ١ اسمها «fake it till you make it»: الاختبار التاني هو اللي بيجبرك تعمم (triangulation). وده بيمنعك تكتب كود لحالات محدش طلبها.

عمليًا: [[npx vitest]] من غير [[run]] بيشتغل في وضع watch، فكل حفظ بيعيد الاختبارات المتأثرة في أقل من ثانية، ودي اللي بتخلي الدورة كل دقيقتين ممكنة. وكتابة الاختبارات نفسها ([[describe]] و [[expect]] و mocks) في تاب «فحص الكود»، درس «vitest».`,
            when: "أحسن حاجة للمنطق اللي ليه قواعد واضحة: الأسعار والخصومات والصلاحيات والتحقق والـ parsing، وأي bug fix (الدرس الجاي). وأقل فايدة في UI لسه بتجرّب شكله، أو لما بتستكشف API جديد ومش عارف هيرجّع إيه: جرّب الأول، وبعدين اكتب الاختبارات، أو ارمي التجربة وابدأ بـ TDD.",
            mistakes: R`تكتب ١٠ اختبارات مرة واحدة وبعدين الكود: دي مش TDD، ده مجرد اختبارات الأول، وبتضيّع الدورة الصغيرة. وتنط الـ refactor لأن «الاختبارات خضرا خلاص»، فالكود بيفضل بحالة الـ green الأولى الوحشة. ومتشوفش الاختبار أحمر، فمش عارف إنه ممكن يفشل أصلًا. وفي الانترفيو لو اتسألت «بتعمل TDD؟»: الإجابة الصادقة أحسن من «دايمًا». قول إنك بتستخدمها للمنطق وللـ bug fixes، واشرح red ثم green ثم refactor بمثال زي ده.`
          },
          teach: R`## الفكرة

المثال هو الشكل النهائي بعد ٤ دورات TDD. هنا هنرجع بالزمن ونعيد الدورات الأربعة فعلًا: كل مرة نضيف اختبار واحد، ونشغّل ونشوف الأحمر برسالته الحقيقية، ونكتب أقل كود يخضّره. اتشغّل بـ Vitest 5.0 على Node 24.19، ويندوز.

---

## ١. الأسماء الأول

| الكلمة | معناها |
|---|---|
| red | اختبار لسلوك مش موجود، وبيفشل |
| green | أقل كود يخلي الاختبار يعدّي |
| refactor | تنضيف والاختبارات خضرا |
| [[describe]] | مجموعة اختبارات تحت اسم واحد |
| [[it("...", () => {...})]] | اختبار واحد، والاسم جملة بتوصف السلوك |
| [[expect(x).toBe(y)]] | [[x]] لازم يساوي [[y]] بالظبط |

ونوع الكوبون:

~~~text coupon.test.ts
type Coupon = { kind: "percent" | "fixed"; value: number; minOrder?: number };
~~~

[[kind]] نسبة أو مبلغ ثابت، و [[value]] القيمة، و [[minOrder?]] حد أدنى اختياري للطلب.

---

## ٢. الدورة ١: النسبة

**red**: اكتب الاختبار بس، والدالة مش موجودة:

~~~text coupon.test.ts
it("percent coupon takes a percentage off", () => {
  expect(applyCoupon(200, { kind: "percent", value: 10 })).toBe(180);
});
~~~

~~~text الناتج: npx vitest run
× percent coupon takes a percentage off
ReferenceError: applyCoupon is not defined
~~~

**green**: أقل كود ممكن، حتى لو «غش»:

~~~text coupon.test.ts
function applyCoupon(subtotal: number, coupon: Coupon): number { return subtotal * 0.9; }
~~~

~~~text الناتج
Tests  1 passed (1)
~~~

أيوه الـ ١٠٪ مكتوبة بإيدنا. ده اسمه «fake it till you make it»: الخطوة دي بتأكد إن الاختبار والتوصيل شغالين، والاختبار الجاي هو اللي هيجبرنا نعمم.

---

## ٣. الدورة ٢: المبلغ الثابت

**red**:

~~~text coupon.test.ts
it("fixed coupon takes a fixed amount off", () => {
  expect(applyCoupon(200, { kind: "fixed", value: 50 })).toBe(150);
});
~~~

~~~text الناتج
× fixed coupon takes a fixed amount off
AssertionError: expected 180 to be 150 // Object.is equality
Tests  1 failed | 1 passed (2)
~~~

الكود المكتوب بإيدنا طلّع ١٨٠ لأي كوبون. دلوقتي مضطرين نفرّق بين النوعين ونستخدم [[coupon.value]] بجد (ده اسمه triangulation: مثالين بيجبروك على الحل العام).

**green** و **refactor**:

~~~text coupon.test.ts
const discount = coupon.kind === "percent" ? (subtotal * coupon.value) / 100 : coupon.value;
return subtotal - discount;
~~~

الـ ternary: لو نسبة، [[الإجمالي × النسبة ÷ ١٠٠]]، غير كده المبلغ زي ما هو. والاسم [[discount]] جه في خطوة الـ refactor.

~~~text الناتج
Tests  2 passed (2)
~~~

---

## ٤. الدورة ٣: مينزلش تحت صفر

**red**: كوبون ٥٠ على طلب ٣٠:

~~~text الناتج
× never goes below zero
AssertionError: expected -20 to be +0 // Object.is equality
Tests  1 failed | 2 passed (3)
~~~

([[+0]] هي طريقة Vitest في كتابة الصفر.)

**green**: [[return Math.max(0, subtotal - discount);]]. [[Math.max]] بترجّع الأكبر، فأي رقم سالب يبقى صفر.

---

## ٥. الدورة ٤: الحد الأدنى

**red**:

~~~text coupon.test.ts
it("rejects orders under the minimum", () => {
  expect(() => applyCoupon(99, { kind: "fixed", value: 20, minOrder: 100 })).toThrow("MIN_ORDER_NOT_MET");
});
~~~

لاحظ [[() => applyCoupon(...)]]: بنبعت **دالة** لـ [[expect]] مش النتيجة، عشان Vitest هو اللي ينادي ويمسك الخطأ. و [[toThrow("...")]] بتتأكد إن الرسالة فيها النص ده.

~~~text الناتج
× rejects orders under the minimum
AssertionError: expected [Function] to throw an error
Tests  1 failed | 3 passed (4)
~~~

**green**: سطر في أول الدالة:

~~~text coupon.test.ts
if (coupon.minOrder !== undefined && subtotal < coupon.minOrder) throw new Error("MIN_ORDER_NOT_MET");
~~~

[[!== undefined]] مش [[if (coupon.minOrder)]]، عشان حد أدنى [[0]] ميتعاملش كأنه مش موجود.

~~~text الناتج: npx vitest run --reporter=verbose
 ✓ applyCoupon > percent coupon takes a percentage off
 ✓ applyCoupon > fixed coupon takes a fixed amount off
 ✓ applyCoupon > never goes below zero
 ✓ applyCoupon > rejects orders under the minimum
      Tests  4 passed (4)
~~~

وده بالظبط المثال. كل سطر في الدالة موجود عشان اختبار طلبه.

---

## ٦. حل التمرين: تاريخ الانتهاء

~~~text sol.test.ts
export function applyCoupon(subtotal: number, coupon: Coupon, now = new Date()): number {
  if (coupon.expiresAt && now >= coupon.expiresAt) throw new Error("COUPON_EXPIRED");
~~~

- [[now = new Date()]]: الوقت parameter بقيمة افتراضية. الكود اللي بينادي مش محتاج يتغير، والاختبار بيبعت وقت ثابت فميعتمدش على النهارده.
- [[now >= coupon.expiresAt]]: مقارنة تاريخين بـ [[>=]] بتشتغل لأن JavaScript بيحوّلهم لأرقام (ms من ١٩٧٠).
- السطر ده **قبل** سطر الحد الأدنى: الكوبون المنتهي يقول «منتهي» حتى لو الطلب صغير.
- [["2026-09-30T21:00:00Z"]]: الـ [[Z]] في الآخر معناها UTC. وده نص الليل بتوقيت القاهرة (UTC+3 في الصيف).

~~~text الناتج: npx vitest run --reporter=verbose
 ✓ accepts the coupon before it expires
 ✓ rejects the coupon at the expiry moment and after
 ✓ coupons without expiresAt never expire
      Tests  3 passed (3)
~~~

### الاختبار بيختبر حاجة فعلًا؟

غيّرنا [[>=]] لـ [[>]] عمدًا:

~~~text الناتج
× rejects the coupon at the expiry moment and after
AssertionError: expected [Function] to throw an error
Tests  1 failed | 2 passed (3)
~~~

الاختبار التاني مسك الغلطة، لأنه بيختبر لحظة الانتهاء بالظبط. لو محدش احمرّ، كان الحد ده مش متغطي.

---

## الخلاصة

| الدورة | الأحمر قال | الأخضر زوّد |
|---|---|---|
| ١ | [[applyCoupon is not defined]] | [[return subtotal * 0.9]] |
| ٢ | [[expected 180 to be 150]] | فرق بين النوعين |
| ٣ | [[expected -20 to be +0]] | [[Math.max(0, ...)]] |
| ٤ | [[expected [Function] to throw an error]] | الحد الأدنى |

- اختبار واحد في المرة، وشوفه أحمر قبل ما تكتب الكود.
- أقل كود يخضّره، والاختبار الجاي هو اللي يجبرك تعمم.
- [[npx vitest]] من غير [[run]] بيعيد الاختبارات مع كل حفظ، فالدورة بتاخد دقيقة أو اتنين.`,
          lines: [
            "vitest.",
            "شكل الكوبون: نسبة أو مبلغ، وحد أدنى اختياري.",
            "الدالة بعد ٤ دورات.",
            "الدورة ٤: الطلب أقل من الحد الأدنى؟ ارمي.",
            "الدورة ٢: الخصم نسبة ولا مبلغ ثابت.",
            "الدورة ٣: الإجمالي مينزلش تحت صفر.",
            "قفلة.",
            "الاختبارات بالترتيب اللي اتكتبت بيه.",
            "الدورة ١: أول سلوك.",
            "٢٠٠ بخصم ١٠٪ = ١٨٠.",
            "قفلة.",
            "الدورة ٢: ده اللي أجبر الكود يفرّق بين النوعين.",
            "٢٠٠ ناقص ٥٠.",
            "قفلة.",
            "الدورة ٣: حالة حدّية.",
            "كوبون ٥٠ على طلب ٣٠: صفر، مش سالب.",
            "قفلة.",
            "الدورة ٤: قاعدة بيزنس جديدة.",
            "[[toThrow]] محتاج دالة ([[() =>]]) عشان vitest هو اللي يناديها ويمسك الخطأ.",
            "قفلة.",
            "قفلة."
          ]
        },
        {
          cmd: "regression test",
          title: "كل bug بيتصلّح معاه اختبار يمنعه يرجع",
          desc: R`الـ regression test اختبار بيعيد الـ bug بالظبط، واتكتب قبل التصليح. الترتيب: اكتب الاختبار، وشوفه أحمر (يعني فعلًا مسك الـ bug)، وبعدين صلّح، وشوفه أخضر. واسمه فيه رقم الـ issue، فاللي يقراه بعد سنة يعرف جه منين.

والفكرة إن كل bug اتصلّح يفضل متصلّح: لو حد رجّع نفس الغلطة بعد ٦ شهور وهو بيعمل refactor، الـ CI هيقوله قبل ما يوصل للعميل.`,
          example: R`import { it, expect } from "vitest";

// الـ bug #142: «كوبون FLAT50 مش بيشتغل على طلب 200 بالظبط، والإعلان بيقول من 200»
export function applyFlat50(subtotal: number): number {
  return subtotal >= 200 ? subtotal - 50 : subtotal;
}

it("FLAT50 applies at exactly 200 (bug #142)", () => {
  expect(applyFlat50(200)).toBe(150);
});
it("FLAT50 does not apply under 200", () => {
  expect(applyFlat50(199.99)).toBe(199.99);
});`,
          try: R`خد آخر bug صلّحته في مشروعك (أو اعمل واحد: غيّر [[>=]] لـ [[>]] في المثال). اكتب اختبار بيعيده، وتأكد إنه أحمر على الكود القديم: [[git stash]] للتصليح، شغّل الاختبار، وبعدين [[git stash pop]] وشغّله تاني. واعمل commit فيه الاتنين بعنوان زي [[fix(coupon): FLAT50 applies at 200 (#142)]].`,
          sol: R`على الكود القديم ([[>]]) الاختبار الأول يقع بـ [[expected 200 to be 150]]، وبعد التصليح الاتنين خضر. الاختبار التاني مهم زي الأول: بيثبّت الحد من الناحية التانية، عشان محدش «يصلّح» الـ bug بإنه يشيل الشرط خالص.

لو الاختبار بتاعك كان أخضر على الكود القديم، يبقى مش بيعيد الـ bug، ولازم تغيّره. وده بالظبط سبب إنك تشوفه أحمر الأول. ولو الـ bug كان في مكان صعب يتختبر (الدالة جواها داتابيز أو وقت)، أول خطوة إنك تطلّع الحتة دي لدالة تتختبر (دروس «pure functions» و «dependency injection»).

والـ commit الواحد اللي فيه الاختبار والتصليح بيخلي أي حد يعمل revert للتصليح يلاقي الاختبار بيقع قدامه.`,
          flag: "script",
          deep: {
            why: R`الـ bugs مش بتتوزع بالعدل: الأماكن اللي فيها bug مرة غالبًا فيها منطق صعب أو حدود ملخبطة، فبترجع تبوظ تاني. والـ bug اللي رجع بعد ما اتقفل أسوأ من الأول، لأن العميل بيفقد الثقة، والفريق بيدوّر على حاجة كانوا فاكرينها اتحلت. والاختبار بيحوّل التصليح من «افتكروا متعملوش كده تاني» لحاجة الـ CI بيفرضها.`,
            how: R`الخطوات:

١. اعيد الـ bug يدويًا، وافهم المدخل بالظبط اللي بيعمله (هنا ٢٠٠ بالظبط).

٢. اكتب الاختبار بأصغر مدخل بيعيده، والاسم فيه الـ issue: [[(bug #142)]].

٣. شغّله وشوفه أحمر. الرسالة لازم تبقى نفس المشكلة اللي العميل شافها (١٥٠ متوقع، ٢٠٠ طلع)، مش خطأ تاني زي import غلط.

٤. صلّح أقل حاجة، وشوفه أخضر، وشغّل كل الاختبارات عشان التصليح ميكسرش حاجة تانية.

٥. اسأل: فيه حالات شبهها؟ ٢٠٠ بالظبط بتقول إن الحدود عمومًا ممكن تكون غلط، فبص على باقي الحدود في نفس الملف (الشحن المجاني من ٥٠٠؟).

ومستوى الاختبار يبقى على قد الـ bug: bug في حسبة يبقى unit test. bug في شكل الـ response يبقى integration test على الـ API. bug إن الزرار مبيظهرش على الموبايل يبقى e2e (تاب «فحص الكود»). والدرس الجاي بيشرح إزاي تختار.`,
            when: "كل bug fix، من غير استثناء تقريبًا. الاستثناء الوحيد اللي ممكن تقبله: bug في config أو نص، والتصليح نفسه أوضح من أي اختبار. وحتى دي، فكّر: ينفع lint rule أو فحص في CI يمسكها؟",
            mistakes: R`تكتب الاختبار بعد التصليح ومتشغّلوش على القديم، فمش عارف إذا كان بيمسك الـ bug أصلًا. وتسمّيه [[test 142]] أو [[fix works]]: الاسم لازم يقول السلوك الصح، والرقم معلومة زيادة. وتختبر الحالة اللي حصلت بس (٢٠٠) وتنسى الناحية التانية (١٩٩.٩٩). وفي الانترفيو لو اتسألت «بتعمل إيه لما تصلّح bug؟»: اعيده، واكتب اختبار أحمر، وصلّح، وتأكد إن الاختبار أخضر والباقي سليم، وشوف لو فيه حالات شبهه.`
          },
          teach: R`## الفكرة

العميل قال إن كوبون FLAT50 مش بيشتغل على طلب ٢٠٠ بالظبط. المثال هو التصليح ومعاه اختبارين: واحد بيعيد الـ bug بالظبط، وواحد بيثبّت الحد من الناحية التانية. هنفك الكود، وبعدين نثبت إن الاختبار فعلًا بيمسك الـ bug: نشغّله على الكود القديم (أحمر) وعلى التصليح (أخضر). اتشغّل بـ Vitest 5.0 و Git في repo تجريبي على ويندوز (Node 24.19).

---

## ١. الدالة بعد التصليح

~~~text flat50.test.ts
export function applyFlat50(subtotal: number): number {
  return subtotal >= 200 ? subtotal - 50 : subtotal;
}
~~~

- [[شرط ? قيمة : قيمة]]: ternary، يعني if صغيرة بترجّع قيمة.
- [[>= 200]]: «٢٠٠ أو أكتر». الكود القديم كان [[> 200]] («أكتر من ٢٠٠»)، فـ ٢٠٠ بالظبط مكانتش بتاخد خصم، والإعلان بيقول «من ٢٠٠». الـ bug كله حرف واحد.

---

## ٢. الاختبارين

~~~text flat50.test.ts
it("FLAT50 applies at exactly 200 (bug #142)", () => {
  expect(applyFlat50(200)).toBe(150);
});
it("FLAT50 does not apply under 200", () => {
  expect(applyFlat50(199.99)).toBe(199.99);
});
~~~

- الاسم الأول بيقول **السلوك الصح** ورقم الـ issue ([[#142]])، فاللي يقراه بعد سنة يعرف جه منين.
- [[200]]: أصغر مدخل بيعيد الـ bug، الحد بالظبط.
- الاختبار التاني بيثبّت الناحية التانية: أقل من ٢٠٠ بقرش مفيش خصم. من غيره، حد ممكن «يصلّح» الـ bug بإنه يشيل الشرط خالص، والاختبار الأول هيفضل أخضر.

---

## ٣. نثبت إن الاختبار بيمسك الـ bug

في repo تجريبي: commit فيه الكود القديم ([[> 200]])، وبعدين التصليح في الـ working tree من غير commit.

~~~text الناتج: npx vitest run (بالتصليح)
 ✓ FLAT50 applies at exactly 200 (bug #142)
 ✓ FLAT50 does not apply under 200
      Tests  2 passed (2)
~~~

[[git stash]] بيشيل التعديلات اللي لسه متعملهاش commit ويحفظها على جنب، فالملف يرجع للكود القديم:

~~~bash
git stash
npx vitest run
~~~

~~~text الناتج
 × FLAT50 applies at exactly 200 (bug #142)
 ✓ FLAT50 does not apply under 200
AssertionError: expected 200 to be 150 // Object.is equality
      Tests  1 failed | 1 passed (2)
~~~

الرسالة هي نفس اللي العميل شافه: متوقع ١٥٠ وطلع ٢٠٠. ده اللي بيأكد إن الاختبار بيعيد الـ bug ده بالذات، مش خطأ تاني زي import غلط. وبعدين:

~~~bash
git stash pop
~~~

[[pop]] بيرجّع التعديلات اللي اتحفظت، والاختبارات ترجع خضرا.

---

## ٤. الـ commit

~~~bash
git commit -am "fix(coupon): FLAT50 applies at 200 (#142)"
~~~

- [[-a]]: ضيف كل الملفات المتتبعة اللي اتغيرت. و [[-m]]: الرسالة.
- [[fix(coupon):]]: نوع التغيير ومكانه (Conventional Commits، تاب Git).
- التصليح والاختبار في commit واحد: لو حد عمل revert للتصليح بعدين، الاختبار هيقع قدامه في الـ CI.

---

## الخلاصة

| الخطوة | ليه |
|---|---|
| اكتب الاختبار قبل التصليح | عشان يسجّل الـ bug مش التصليح |
| شوفه أحمر على الكود القديم | لو أخضر، يبقى مش بيعيد الـ bug |
| صلّح وشوفه أخضر | وشغّل كل الاختبارات |
| اختبار للحد من الناحية التانية | يمنع «تصليح» بيشيل الشرط |
| commit واحد فيه الاتنين | الـ revert يتمسك |

- كل bug اتصلّح يفضل متصلّح، لأن الـ CI بيشغّل اختباره على كل PR.
- مستوى الاختبار على قد الـ bug: حسبة يبقى unit، شكل الـ response يبقى integration، UI يبقى e2e.`,
          lines: [
            "vitest.",
            "الدالة بعد التصليح: [[>=]] بدل [[>]].",
            "٢٠٠ أو أكتر؟ اخصم ٥٠.",
            "قفلة.",
            "الـ regression test: الاسم بيقول السلوك الصح، ورقم الـ issue.",
            "٢٠٠ بالظبط لازم تبقى ١٥٠. على الكود القديم كانت بتطلع ٢٠٠.",
            "قفلة.",
            "الحد من الناحية التانية، عشان التصليح ميعدّيش الشرط خالص.",
            "أقل من ٢٠٠ بقرش: مفيش خصم.",
            "قفلة."
          ]
        },
        {
          cmd: "اختبر السلوك",
          title: "اختبار بيقع لما تغيّر الكود مع إن مفيش حاجة باظت",
          desc: R`الاختبار الكويس بيقع لما السلوك يبوظ، ومبيقعش لما تغيّر التفاصيل. عشان كده بيختبر اللي حد من برا شايفه: الـ return، والخطأ اللي اترمى، واللي اتبعت برا (إيميل أو request أو صف في الداتابيز). ومش بيختبر الخانات الـ private، ولا إن دالة داخلية اتنادت، ولا ترتيب الخطوات جوه.

والـ mocks نفس القاعدة: mock للحدود (الإيميل، والدفع، والـ API الخارجي)، مش للدوال بتاعتك. ولما تعمل mock، اتأكد من اللي راح للحد ده (اتبعت لمين وفيه إيه)، مش من إن حاجة جوه اتنادت.`,
          example: R`import { it, expect, vi } from "vitest";

class Cart {
  private lines = new Map<string, { price: number; qty: number }>();
  add(sku: string, price: number) {
    const qty = (this.lines.get(sku)?.qty ?? 0) + 1;
    this.lines.set(sku, { price, qty });
  }
  total() {
    return [...this.lines.values()].reduce((sum, l) => sum + l.price * l.qty, 0);
  }
}
async function checkout(cart: Cart, email: string, send: (to: string, text: string) => Promise<void>) {
  await send(email, $__btYour total is $__{cart.total()} EGP$__bt);
}

// هش: expect((cart as any).lines.length).toBe(2)
// كان بيعدّي لما lines كانت array، ووقع لما بقت Map، مع إن السلوك مااتغيرش

it("adding the same item twice doubles the total", () => {
  const cart = new Cart();
  cart.add("book", 100);
  cart.add("book", 100);
  expect(cart.total()).toBe(200);
});

it("emails the total on checkout", async () => {
  const cart = new Cart();
  cart.add("book", 100);
  const send = vi.fn(async () => {});
  await checkout(cart, "you@example.com", send);
  expect(send).toHaveBeenCalledWith("you@example.com", "Your total is 100 EGP");
});`,
          try: R`افتح اختبارات مشروعك ودوّر على ٣ علامات: [[as any]] أو أقواس زي [[obj['secret'].size]] عشان توصل لحاجة private، و [[vi.spyOn]] على method من نفس الـ class اللي بتختبرها، و [[toHaveBeenCalledTimes]] على دالة داخلية. لكل واحد اكتب: السلوك اللي المستخدم شايفه هنا إيه؟ وأعد كتابة واحد بحيث يختبره. وبعدين اعمل refactor صغير جوه الكود (غيّر array لـ Map مثلًا) وشوف الاختبار الجديد لسه أخضر.`,
          sol: R`اللي هتلاقيه غالبًا اختبار زي [[expect(service['cache'].size).toBe(1)]] أو [[expect(taxSpy).toHaveBeenCalled()]]. السؤال لكل واحد: «ليه ده مهم للي بيستخدم الكود؟». الـ cache مهم لأن النداء التاني ميروحش للـ API تاني، فالاختبار الصح: نادِ مرتين، واتأكد إن الـ fetch الـ mock (الحد) اتنادى مرة واحدة. و [[calculateTax]] مهمة لأن الإجمالي فيه ضريبة، فالاختبار الصح: [[expect(total).toBe(114)]].

بعد الـ refactor الجوّاني، الاختبار الجديد لازم يفضل أخضر من غير ما تلمسه. لو احتجت تعدّله، يبقى لسه بيعرف تفاصيل. والعكس برضه: اكسر السلوك عمدًا (اشيل الضريبة) وتأكد إنه احمرّ.

الغلط اللي بيحصل في الاتجاه التاني: تبطّل تستخدم mocks خالص وتبعت إيميلات حقيقية من الاختبارات. الـ mock للحدود صح ومطلوب، و [[toHaveBeenCalledWith]] على الـ mailer بيختبر سلوك فعلًا: «العميل وصله إيميل فيه الإجمالي».`,
          flag: "script",
          deep: {
            why: R`الاختبارات المفروض تخليك تغيّر الكود بثقة. الاختبار اللي بيعرف التفاصيل بيعمل العكس: كل refactor بيحمّر ٢٠ اختبار مع إن مفيش حاجة باظت، فالفريق بيتعلم يعدّل الاختبارات أوتوماتيك لحد ما تخضر، ويوم ما يبقى فيه bug حقيقي بيعدّلوه برضه. ده أسوأ من إن مفيش اختبارات، لأنه بيدّيك ثقة مزيفة وبيبطّأك.`,
            how: R`اسأل: «لو حد بيستخدم الـ module ده من برا، إيه اللي يفرق معاه؟». دي الحاجات اللي بتختبرها:

الـ return أو الخطأ اللي اترمى، زي [[cart.total()]].

الـ state اللي باينة من برا عن طريق الـ API العام، مش عن طريق خانات private.

الـ side effects عند الحدود: الإيميل اتبعت لمين وفيه إيه، والـ request راح لأنهي URL، والصف اتكتب في الداتابيز. هنا الـ mock ([[vi.fn()]]) مكانه، و [[toHaveBeenCalledWith]] بيتأكد من اللي عدّى الحد.

وفي React نفس الفكرة بالظبط: Testing Library بتخليك تدوّر بالنص والـ role ([[getByRole('button', { name: 'Apply' })]]) زي المستخدم، مش بالـ state ولا بأسماء الـ components (تاب React، في الاختبارات).

والـ snapshots اللي بتسجّل HTML كامل من التفاصيل برضه: أي تغيير في class بيحمّرها. استخدمها لمخرج صغير مستقر، مش كبديل عن assertions.`,
            when: "مع كل اختبار بتكتبه. وأهم ما يكون لما بتكتب اختبارات لكود هيتعمله refactor قريب، زي درس «refactor بأمان»: هناك الاختبار لازم يعدّي من غير تعديل.",
            mistakes: R`تعمل mock لكل dependency حتى الدوال الـ pure بتاعتك، فالاختبار بيختبر إن الـ mocks بتكلم بعض. وتعمل [[export]] لدالة داخلية أو تخلي خانة public «عشان الاختبار». و ١٠ assertions على كل خطوة جوه بدل assertion واحد على النتيجة. وفي الانترفيو، سؤال «إيه الفرق بين mock و stub و fake؟» بيتسأل كتير: الـ stub بيرجّع قيمة ثابتة، والـ fake implementation حقيقي بس بسيط (الـ repo في الذاكرة)، والـ mock بيسجّل النداءات عشان تتأكد منها. والإجابة الأقوى إنك تزوّد: «وبستخدم الـ mock عند الحدود بس».`
          },
          teach: R`## الفكرة

المثال فيه كارت جواه [[Map]] (كانت array واتغيرت في refactor)، ودالة checkout بتبعت إيميل. واختبارين: واحد بيختبر الإجمالي (سلوك)، وواحد بيختبر الإيميل اللي خرج (حد). هنفك الكود، وبعدين نشغّل الاختبار «الهش» المتعلّق في المثال ونشوفه بيقع مع إن مفيش حاجة باظت. اتشغّل بـ Vitest 5.0 على Node 24.19، ويندوز.

---

## ١. الكارت

~~~text cart.test.ts
class Cart {
  private lines = new Map<string, { price: number; qty: number }>();
  add(sku: string, price: number) {
    const qty = (this.lines.get(sku)?.qty ?? 0) + 1;
    this.lines.set(sku, { price, qty });
  }
  total() {
    return [...this.lines.values()].reduce((sum, l) => sum + l.price * l.qty, 0);
  }
}
~~~

- [[private lines]]: [[private]] معناها محدش برّه الـ class المفروض يلمسها. دي تفاصيل.
- [[new Map<string, {...}>()]]: [[Map]] جدول مفتاح وقيمة. المفتاح [[sku]] (كود المنتج، Stock Keeping Unit)، والقيمة السعر والكمية.
- [[this.lines.get(sku)?.qty ?? 0]]: هات السطر بتاع المنتج، و [[?.]] لو مش موجود ترجّع [[undefined]] من غير ما تقع، و [[?? 0]] تخليها صفر. وبعدين [[+ 1]].
- [[[...this.lines.values()]]]: [[values()]] بترجّع القيم، والـ spread بيحوّلهم array عشان نقدر نعمل [[reduce]].

---

## ٢. الـ checkout: الحد

~~~text cart.test.ts
async function checkout(cart: Cart, email: string, send: (to: string, text: string) => Promise<void>) {
  await send(email, $__btYour total is $__{cart.total()} EGP$__bt);
}
~~~

[[send]] جاية من برّه (dependency injection). ده **الحد**: المكان اللي الكود بتاعنا بيكلّم العالم منه (الإيميل). هنا بس الـ mock له لازمة.

---

## ٣. الاختبار الهش

~~~text المتعلّق في المثال
expect((cart as any).lines.length).toBe(2)
~~~

- [[cart as any]]: بيقفل فحص TypeScript عشان يوصل للخانة الـ private.
- بيعدّ السطور بـ [[.length]]. ده كان شغال لما [[lines]] كانت array:

~~~text الناتج: نسخة الـ array
Tests  1 passed (1)
~~~

وبعد ما بقت [[Map]] (والسلوك هو هو):

~~~text الناتج: نسخة الـ Map
× brittle: peeks at private lines
AssertionError: expected undefined to be 2 // Object.is equality
~~~

[[Map]] مفيهاش [[length]] (فيها [[size]])، فطلع [[undefined]]. الاختبار وقع، والكارت لسه بيحسب صح. ده اختبار بيوقّف أي refactor من غير ما يحمي أي حاجة.

---

## ٤. اختبار السلوك

~~~text cart.test.ts
it("adding the same item twice doubles the total", () => {
  const cart = new Cart();
  cart.add("book", 100);
  cart.add("book", 100);
  expect(cart.total()).toBe(200);
});
~~~

بيستخدم الـ API العام بس ([[add]] و [[total]])، زي ما أي كود تاني بيستخدم الكارت. والاسم جملة بيفهمها أي حد في الفريق. عدّى مع الـ array ومع الـ Map من غير ما يتعدّل.

---

## ٥. اختبار الحد بـ mock

~~~text cart.test.ts
const send = vi.fn(async () => {});
await checkout(cart, "you@example.com", send);
expect(send).toHaveBeenCalledWith("you@example.com", "Your total is 100 EGP");
~~~

- [[vi.fn(...)]]: بيعمل دالة مزيفة (mock) بتسجّل كل نداء ليها وبالـ arguments اللي جت.
- [[toHaveBeenCalledWith(...)]]: الدالة اتنادت بالقيم دي بالظبط. ده بيختبر اللي **عدّى الحد**: الإيميل راح لمين وفيه إيه.

~~~text الناتج: npx vitest run --reporter=verbose
 ✓ beh/cart.test.ts > adding the same item twice doubles the total 3ms
 ✓ beh/cart.test.ts > emails the total on checkout 2ms
      Tests  2 passed (2)
~~~

ولو الرسالة اتغيرت (جرّبنا نتوقع [[USD]])، Vitest بيوريك الفرق بالظبط:

~~~text الناتج
AssertionError: expected "vi.fn()" to be called with arguments: [ 'you@example.com', …(1) ]
Received:
  1st vi.fn() call:
  [
    "you@example.com",
-   "Your total is 100 USD",
+   "Your total is 100 EGP",
  ]
Number of calls: 1
~~~

[[-]] المتوقع، و [[+]] اللي حصل فعلًا.

---

## الخلاصة

| اختبر | متختبرش |
|---|---|
| الـ return ([[cart.total()]]) | الخانات الـ private ([[lines]]) |
| الخطأ اللي اترمى | إن دالة داخلية اتنادت |
| اللي عدّى الحد (الإيميل، الـ request) | ترتيب الخطوات جوه |

- الاختبار الكويس بيقع لما السلوك يبوظ، ومبيقعش لما التفاصيل تتغير.
- mock للحدود بس (إيميل، دفع، API خارجي)، واتأكد من اللي راح له.
- [[as any]] في اختبار عشان توصل لحاجة private علامة إن الاختبار بيعرف تفاصيل.`,
          lines: [
            "vitest، و [[vi]] للـ mock.",
            "الكارت.",
            "التفاصيل الداخلية: Map. كانت array، واتغيرت في refactor.",
            "إضافة صنف.",
            "لو موجود زوّد الكمية، لو لأ ابدأ من ١.",
            "احفظ.",
            "قفلة.",
            "الإجمالي: ده السلوك اللي حد من برا شايفه.",
            "اجمع السعر في الكمية.",
            "قفلة.",
            "قفلة الـ class.",
            "الـ checkout بيستلم دالة الإرسال (الحد) من برا.",
            "بيبعت الإجمالي للعميل.",
            "قفلة.",
            "اختبار سلوك: الاسم نفسه جملة بيفهمها أي حد في الفريق.",
            "كارت جديد.",
            "نفس الكتاب...",
            "...مرتين.",
            "بنختبر الإجمالي، مش شكل الـ Map. الاختبار ده عدّى قبل الـ refactor وبعده من غير تعديل.",
            "قفلة.",
            "اختبار الحد: الإيميل.",
            "كارت.",
            "صنف واحد.",
            "mock للإرسال بس، مش لحاجة جوه الكارت.",
            "نفّذ.",
            "اتأكد من اللي عدّى الحد: لمين، وفيه إيه بالظبط.",
            "قفلة."
          ]
        },
        {
          cmd: "هرم الاختبارات",
          title: "كام اختبار unit وكام integration وكام e2e",
          desc: R`فيه ٣ مستويات: unit بيختبر دالة أو module لوحده في جزء من الثانية، و integration بيختبر أكتر من حتة مع بعض (الـ route والـ service وداتابيز حقيقية)، و e2e بيفتح متصفح ويعمل اللي المستخدم بيعمله. كل ما تطلع لفوق، الاختبار بيثبت أكتر إن الحاجة شغالة، بس أبطأ وأصعب يتصلّح لما يقع.

الهرم (pyramid) بيقول: unit كتير، و integration أقل، و e2e قليل. والـ trophy (من Kent C. Dodds) بيقول: التقل في الـ integration، لأنه أقرب لاستخدام حقيقي ولسه سريع. الاتنين متفقين إن e2e للمسارات المهمة بس.

الدرس ده عن التوزيع. إزاي تكتب كل نوع في تاب «فحص الكود» (vitest و coverage و Playwright).`,
          example: R`# unit: كتير وسريع، للمنطق (الخصم والتحقق والتحويل)
npx vitest run src/lib
# integration: الـ API مع داتابيز اختبار حقيقية
npx vitest run tests/api
# e2e: قليل، للمسارات اللي لو وقعت الشركة بتخسر فلوس
npx playwright test tests/e2e/checkout.spec.ts
# كله في CI على كل PR
npm test`,
          try: R`عِد الاختبارات في مشروعك بكل نوع ([[npx vitest list]] بيطبع أسماء الاختبارات من غير ما يشغّلها، أو عِد الملفات في كل فولدر). وبعدين اكتب أهم ٣ مسارات في التطبيق (مثلًا: تسجيل، وإضافة للكارت، ودفع). لكل مسار: فيه اختبار بيغطيه؟ في أنهي مستوى؟ ولو اتكسر النهارده، أنهي اختبار هيقع؟`,
          sol: R`النتيجة الشائعة في مشاريع الجونيورز واحدة من اتنين: صفر اختبارات، أو unit tests كتير على utils ومفيش ولا اختبار على المسار اللي بيجيب فلوس. التوزيع المعقول لتطبيق ويب عادي: unit للمنطق اللي فيه قواعد (الأسعار، والصلاحيات)، و integration لكل endpoint مهم (بيرد صح، وبيرفض الغلط، وبيكتب في الداتابيز)، و e2e واحد أو اتنين للمسار الأساسي من أوله لآخره.

لو لقيت مسار مهم ولا اختبار بيغطيه، ابدأ بـ integration test عليه (مش e2e)، لأنه أسرع في الكتابة والتشغيل وبيمسك أغلب المشاكل. وضيف e2e لو الـ bug اللي خايف منه في الـ UI نفسه أو في التوصيل بين الفرونت والباك.

والغلط الشائع إنك تحكم بالـ coverage: ٩٠٪ coverage ممكن تبقى كلها في utils، والـ checkout صفر. الـ coverage بيقول السطر اتنفذ، مش إنه اتختبر صح.`,
          deep: {
            why: R`كل اختبار ليه تكلفة (وقت كتابة، ووقت تشغيل في كل PR، وصيانة) وليه قيمة (ثقة إن الحاجة شغالة). الـ e2e قيمته عالية بس تكلفته أعلى: بطيء، ولو وقع ممكن السبب في أي حتة، وأحيانًا بيقع من غير سبب (flaky). الـ unit رخيص جدًا بس ممكن كل الـ units تعدّي والتطبيق مش شغال لأن التوصيل بينهم غلط. التوزيع الصح بيدّيك أكبر ثقة بأقل تكلفة.`,
            how: R`الفرق بين المستويات هو «إيه الحقيقي وإيه المزيف»:

unit: كل الحدود مزيفة (fakes و mocks)، والكود بتاعك بس هو الحقيقي. بيقولك: المنطق صح. مكانه: الدوال الـ pure، والـ services بـ fakes زي درس «dependency injection».

integration: الكود بتاعك والداتابيز حقيقيين، والحاجات الخارجية (الإيميل والدفع) مزيفة. بيقولك: الـ route والـ validation والـ query شغالين مع بعض. الداتابيز غالبًا Postgres في Docker، أو schema منفصلة، وبتتنضف قبل كل اختبار. وللـ Express فيه supertest، ولـ Next بتنادي الـ route handler مباشرة.

e2e: كل حاجة حقيقية ما عدا الخدمات الخارجية (sandbox للدفع). بيقولك: المستخدم يقدر يخلّص المسار. Playwright بيفتح متصفح حقيقي.

والـ trophy بيضيف تحت الكل static analysis: TypeScript و ESLint بيمسكوا كمية bugs من غير ولا اختبار (تاب «فحص الكود»).

وسؤال «أكتب اختبار في أنهي مستوى؟» إجابته: أقل مستوى يقدر يمسك الـ bug اللي خايف منه. حسبة خصم: unit. الـ endpoint بيرجع 400 للداتا الغلط: integration. الزرار مستخبي ورا الـ keyboard على الموبايل: e2e.`,
            when: "لما تبدأ مشروع (قرر الأدوات والفولدرات بدري)، ولما الـ CI يبقى بطيء (غالبًا e2e كتير بيختبر حاجات unit يقدر يختبرها)، ولما bugs بتعدّي من الاختبارات للإنتاج (غالبًا مفيش integration).",
            mistakes: R`e2e لكل حالة validation (١٠ اختبارات بتفتح متصفح عشان تجرّب ١٠ إيميلات غلط)، والصح integration أو unit، و e2e واحد للحالة السعيدة. و integration tests بتشارك داتابيز من غير ما تنضفها، فبتعدّي لوحدها وتقع مع بعض. وتتجاهل الاختبار الـ flaky بـ retry لحد ما يعدّي: ده بيخبّي race condition حقيقي ساعات. وفي الانترفيو لو اتسألت «unit ولا integration ولا e2e؟»: متختارش واحد، اشرح التكلفة والثقة، وإنك بتختار أقل مستوى يمسك الـ bug.`
          },
          teach: R`## الفكرة

الأوامر في المثال بتشغّل كل مستوى من الاختبارات لوحده. عشان نشوف الفرق بعينينا عملنا مشروع صغير فيه دالة سعر (unit) و endpoint بيستخدمها (integration)، وشغّلنا أول أمرين. اتشغّل بـ Vitest 5.0 و Express 5.2 على Node 24.19، ويندوز. أمر Playwright من الـ docs الرسمية (مشغّلناهوش هنا لأنه بينزّل متصفحات).

---

## ١. الـ ٣ مستويات

| المستوى | بيختبر إيه | الحقيقي | المزيف | السرعة |
|---|---|---|---|---|
| unit | دالة أو module لوحده | الكود بتاعك بس | كل الحدود | جزء من الثانية |
| integration | كذا حتة مع بعض: route و service وداتابيز | الكود والداتابيز | الإيميل والدفع | ثواني |
| e2e | اللي المستخدم بيعمله في متصفح | كل حاجة | خدمات برّه (sandbox) | دقايق |

كل ما تطلع لفوق: ثقة أكتر إن الحاجة شغالة فعلًا، بس أبطأ، ولما يقع أصعب تعرف السبب.

---

## ٢. [[npx vitest run src/lib]]: unit

- [[npx]]: شغّل أداة متسطّبة في المشروع.
- [[vitest run]]: شغّل الاختبارات مرة واحدة واخرج (من غير [[run]] بيفضل شغال ويعيد مع كل حفظ).
- [[src/lib]]: شغّل بس الاختبارات اللي مسارها فيه الكلام ده (فلتر).

الاختبار هنا على دالة pure بتزوّد ضريبة ١٤٪:

~~~text الناتج
 ✓ src/lib/pricing.test.ts > adds 14% VAT 1ms
 ✓ src/lib/pricing.test.ts > rounds to the nearest cent 0ms
      Tests  2 passed (2)
   Duration  184ms
~~~

[[1ms]] و [[0ms]] للاختبار الواحد: تقدر يبقى عندك مئات منهم ويخلصوا في ثواني.

---

## ٣. [[npx vitest run tests/api]]: integration

الاختبار هنا بيشغّل سيرفر Express حقيقي على port فاضي ([[app.listen(0)]]: الـ 0 معناه «أي port فاضي»)، ويبعت requests حقيقية بـ [[fetch]]:

~~~text الناتج
 ✓ tests/api/price.test.ts > POST /api/price returns the total with VAT 205ms
 ✓ tests/api/price.test.ts > POST /api/price rejects bad input with 400 4ms
      Tests  2 passed (2)
   Duration  501ms
~~~

لاحظ أول اختبار أخد [[205ms]]: الـ routing والـ JSON parsing والـ validation كلهم اشتغلوا مع بعض. ده اللي الـ unit test مش هيمسكه: لو حد نسي [[express.json()]]، الدالة نفسها سليمة والـ endpoint بايظ. وفي مشروع حقيقي فيه كمان داتابيز اختبار (Postgres في Docker مثلًا) بتتنضف قبل كل اختبار.

---

## ٤. [[npx playwright test tests/e2e/checkout.spec.ts]]: e2e

(من docs Playwright.) [[playwright test]] بيفتح متصفح حقيقي (Chromium و Firefox و WebKit حسب الإعداد)، ويعمل اللي المستخدم بيعمله: يضغط ويكتب ويستنى. الملف [[.spec.ts]] واحد بس هنا: مسار الـ checkout، لأنه لو وقع الشركة بتخسر فلوس. أول مرة لازم [[npx playwright install]] عشان ينزّل المتصفحات.

---

## ٥. [[npm test]]: كله في CI

[[npm test]] بيشغّل الـ script اللي اسمه [[test]] في [[package.json]]، وده اللي بيجمع المستويات. والـ CI بيشغّله على كل PR.

وعشان تعدّ الاختبارات اللي عندك من غير ما تشغّلها:

~~~text الناتج: npx vitest list
src/lib/pricing.test.ts > adds 14% VAT
src/lib/pricing.test.ts > rounds to the nearest cent
tests/api/price.test.ts > POST /api/price returns the total with VAT
tests/api/price.test.ts > POST /api/price rejects bad input with 400
~~~

---

## ٦. الهرم ولا الـ trophy؟

| الشكل | التقل فين |
|---|---|
| pyramid | unit كتير، integration أقل، e2e قليل |
| trophy (Kent C. Dodds) | static analysis تحت الكل (TypeScript و ESLint)، والتقل في الـ integration |

الاتنين متفقين إن e2e للمسارات المهمة بس.

---

## الخلاصة

- اكتب الاختبار في **أقل مستوى يقدر يمسك الـ bug** اللي خايف منه: حسبة يبقى unit، endpoint بيرد صح يبقى integration، زرار مستخبي على الموبايل يبقى e2e.
- مسار مهم من غير ولا اختبار؟ ابدأ بـ integration عليه.
- الـ coverage بيقول السطر اتنفذ، مش إنه اتختبر صح.`,
          lines: [
            "الـ unit tests للدوال والـ services: بتخلص في ثواني حتى لو مئات.",
            "الـ integration tests: بتبعت requests للـ API وبتكتب في داتابيز اختبار.",
            "الـ e2e بـ Playwright: متصفح حقيقي، للـ checkout بس هنا.",
            "الـ CI بيشغّل الكل. و [[test]] في [[package.json]] بيجمعهم."
          ]
        }
      ]
    }
]);
