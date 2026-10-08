// تكملة تاب sweng: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/sweng/01.js (شرح حقول الدرس في أوله)
MORE("sweng", [
    {
      t: "البساطة",
      l: 1,
      n: "متكررش نفسك، بس متجرّدش بدري، ومتبنيش حاجة محدش طلبها",
      items: [
        {
          cmd: "DRY",
          title: "نفس المنطق مكتوب في كذا مكان",
          desc: R`DRY (Don't Repeat Yourself) معناها إن كل قاعدة في البيزنس ليها مكان واحد بس في الكود. لو قاعدة الخصم مكتوبة في ٤ أماكن، يوم ما تتغير هتعدّل ٣ وتنسى الرابع. بس مش «أي سطرين شبه بعض ادمجهم»: القاعدة العملية rule of three، تالت مرة تشوف التكرار اطلّع دالة.

والسؤال الصح: الحتتين دول بيتغيروا مع بعض لنفس السبب؟ لو آه، دي معلومة واحدة ادمجها. لو شبه بعض بالصدفة، سيبهم.`,
          example: R`type Coupon = { type: "percent"; percent: number } | { type: "fixed"; amount: number };

// قبل: نفس الحسبة متنسخة في ٣ أماكن في service الطلبات
// if (coupon.type === "percent") discount = (total * coupon.percent) / 100;
// else discount = Math.min(coupon.amount, total);

function couponDiscount(coupon: Coupon, total: number): number {
  const raw = coupon.type === "percent" ? (total * coupon.percent) / 100 : coupon.amount;
  return Math.min(Math.max(raw, 0), total);
}

console.log(couponDiscount({ type: "percent", percent: 10 }, 500)); // 50
console.log(couponDiscount({ type: "fixed", amount: 800 }, 500)); // 500
console.log(couponDiscount({ type: "percent", percent: 150 }, 500)); // 500`,
          try: R`دوّر في مشروع عندك على حسبة متكررة (خصم، أو تنسيق تاريخ، أو تنسيق سعر بالعملة). اطلّعها في دالة واحدة، واكتب لها ٣ اختبارات vitest (حالة عادية، وحالة حدّية زي الصفر، وحالة غلط)، واستبدل كل النسخ بالنداء عليها.`,
          flag: "script",
          deep: {
            why: R`التكرار مش مشكلة شكل. المشكلة إن القاعدة الواحدة بقى ليها أكتر من نسخة، والنسخ بتختلف مع الوقت. في مشروع حقيقي كانت حسبة خصم الكوبون متنسخة في أكتر من مكان في service الطلبات، وكل نسخة فيها نفس الـ bugs: خصم النسبة مش متقفّل على الإجمالي، والشرط بيعتبر الكوبون نسبة لو خانة النسبة فيها أي قيمة حتى لو نوعه ثابت. تصليح الـ bug محتاج تلاقي كل النسخ الأول.`,
            how: R`DRY عن المعرفة مش عن النص. اتنين validation لـ email في الـ signup وفي الـ profile: دي نفس القاعدة، فتبقى schema واحدة (zod مثلًا) تستخدمها في الاتنين وفي الفرونت كمان. أما [[price * 0.14]] في الضريبة و [[score * 0.14]] في ترتيب المنتجات: نفس الرقم بالصدفة، ولو دمجتهم، يوم ما الضريبة تتغير ترتيب المنتجات هيبوظ.

الـ rule of three (مشهورة من كتاب Refactoring لـ Martin Fowler): أول مرة اكتب، تاني مرة استحمل التكرار وخد بالك، تالت مرة اطلّع دالة. لأن بعد ٣ أمثلة بتعرف إيه الثابت وإيه اللي بيتغير، فالدالة هتطلع صح. لو طلّعتها من أول نسختين، بتخمّن.

والـ abstraction الغلط أسوأ من التكرار. Sandi Metz قالتها: «duplication is far cheaper than the wrong abstraction». الدالة المشتركة اللي بدأت بسيطة، وكل مكان محتاج حاجة مختلفة فبيضيفلها parameter و if، لحد ما تبقى [[formatPrice(value, true, false, 'short', null)]] ومحدش فاهمها. الحل ساعتها إنك ترجّع التكرار (inline) وتعيد التقسيم صح.

وDRY مش في الدوال بس: الأنواع اطلّعها من الـ schema (Prisma بيولّد types، و zod بـ [[z.infer]]) بدل ما تكتبها مرتين، والإعدادات في مكان واحد مش hardcoded في ٣ ملفات.`,
            when: "لما قاعدة بيزنس (خصم، أو صلاحية، أو validation، أو حسبة) تتكتب مرتين. ولما تصلّح bug وتكتشف إنه موجود في نسخة تانية.",
            mistakes: R`تدمج حاجتين شبه بعض بالصدفة فتربطهم ببعض من غير داعي. وتعمل abstraction من أول نسختين، فتبقى دالة فيها flags لكل حالة. ونسخ نفس الـ service بين مشاريع كاملة وكل نسخة بتتعدّل لوحدها: لو ده بيتكرر، الكود المشترك يستاهل package أو monorepo (تاب «فحص الكود»). وفي انترفيو لو اتسألت عن DRY، اذكر الوش التاني (الـ wrong abstraction)، ده اللي بيفرّقك عن اللي حافظ التعريف.`
          },
          teach: R`## الفكرة

حسبة خصم الكوبون كانت متنسخة في ٣ أماكن. المثال بيحطها في دالة واحدة، وبيضيف فيها قاعدة كانت ناقصة في النسخ القديمة: الخصم عمره ما يبقى سالب ولا أكبر من الطلب. هنفك الدالة، وبعدين نشغّل اختبارات الحل بـ Vitest. اتشغّل بـ [[npx tsx]] على Node 24.19 و Vitest 5.0 على ويندوز.

---

## ١. نوع الكوبون

~~~text main.ts
type Coupon = { type: "percent"; percent: number } | { type: "fixed"; amount: number };
~~~

الكوبون شكلين، والـ [[|]] بينهم معناها «يا ده يا ده»:

| [[type]] | الخانة التانية | معناها |
|---|---|---|
| [["percent"]] | [[percent]] | نسبة من الإجمالي |
| [["fixed"]] | [[amount]] | مبلغ ثابت |

الخانة [[type]] اسمها **discriminant** (اللي بيفرّق): لما تفحص [[coupon.type === "percent"]]، TypeScript بيعرف إن الخانة الموجودة [[percent]] مش [[amount]]. ولو خلطت بين الشكلين:

~~~text الناتج: npx tsc --noEmit --strict
demo/d1.ts(7,36): error TS2353: Object literal may only specify known properties, and 'percent' does not exist in type '{ type: "fixed"; amount: number; }'.
~~~

---

## ٢. الحسبة الخام

~~~text main.ts
const raw = coupon.type === "percent" ? (total * coupon.percent) / 100 : coupon.amount;
~~~

ده ternary: [[شرط ? قيمة لو آه : قيمة لو لأ]].

- لو نسبة: [[(total * coupon.percent) / 100]]. ١٠٪ من ٥٠٠ = ٥٠٠ × ١٠ ÷ ١٠٠ = ٥٠.
- لو مبلغ ثابت: [[coupon.amount]] زي ما هو.

اسمها [[raw]] (خام) لأنها لسه ممكن تبقى غلط: سالبة أو أكبر من الطلب.

---

## ٣. القاعدة اللي كانت ناقصة

~~~text main.ts
return Math.min(Math.max(raw, 0), total);
~~~

نفكها من جوه لبرة:

1. [[Math.max(raw, 0)]]: بترجّع الأكبر من الاتنين. لو [[raw]] سالب، الناتج صفر. يعني أقل خصم صفر.
2. [[Math.min(..., total)]]: بترجّع الأصغر. لو الخصم أكبر من الطلب، الناتج هو الطلب نفسه. يعني أقصى خصم إن الطلب يبقى ببلاش.

الحتة دي اسمها clamp (حصر الرقم بين حدين). ولأنها في الدالة الوحيدة، كل مكان في المشروع بقى بيستفيد منها.

---

## ٤. الناتج

~~~text الناتج: npx tsx main.ts
50
500
500
~~~

| النداء | الحساب | الناتج |
|---|---|---|
| ١٠٪ على ٥٠٠ | ٥٠ | [[50]] |
| ثابت ٨٠٠ على ٥٠٠ | ٨٠٠ أكبر من الطلب، فـ [[min]] رجّعت ٥٠٠ | [[500]] |
| ١٥٠٪ على ٥٠٠ | ٧٥٠، و [[min]] رجّعت ٥٠٠ | [[500]] |

وجرّبنا كوبون ثابت بـ [[-20]]: الناتج [[0]]، لأن [[max]] منعت الخصم السالب (اللي كان هيزوّد السعر).

---

## ٥. حل التمرين: [[formatPrice]] واختباراتها

الحل ملفين:

~~~text price.ts
const egp = new Intl.NumberFormat("en-EG", { style: "currency", currency: "EGP" });

export function formatPrice(cents: number): string {
  if (!Number.isFinite(cents) || cents < 0) throw new RangeError(...);
  return egp.format(cents / 100);
}
~~~

- [[Intl.NumberFormat]]: أداة جاهزة في JavaScript بتنسّق الأرقام حسب لغة وبلد. [["en-EG"]] أرقام إنجليزي بطريقة مصر، و [[style: "currency"]] مع [[currency: "EGP"]] بتحط العملة. بنعملها مرة واحدة برا الدالة بدل ما تتعمل في كل نداء.
- [[Number.isFinite(cents)]]: رقم حقيقي؟ بترجّع [[false]] لـ [[NaN]] و [[Infinity]].
- [[RangeError]]: نوع خطأ جاهز معناه «القيمة برا المدى المسموح».
- [[cents / 100]]: السعر متخزّن بالقرش، فبنحوّله جنيه وقت العرض بس.

والاختبارات في [[price.test.ts]]:

- [[describe("formatPrice", ...)]]: بتجمّع الاختبارات تحت اسم واحد.
- [[it("...", () => {...})]]: اختبار واحد بوصف بيقول بيتأكد من إيه.
- [[expect(x).toBe(y)]]: لازم [[x]] يساوي [[y]] بالظبط.
- [[expect(() => formatPrice(-1)).toThrow(RangeError)]]: بنبعت دالة مش النداء نفسه، عشان Vitest هو اللي ينادي ويمسك الخطأ. لو كتبت [[expect(formatPrice(-1))]] الخطأ هيترمي قبل ما [[expect]] تشتغل والاختبار يقع.

~~~text الناتج: npx vitest run --reporter=verbose
 ✓ dry/price.test.ts > formatPrice > formats a normal price 2ms
 ✓ dry/price.test.ts > formatPrice > handles zero 0ms
 ✓ dry/price.test.ts > formatPrice > rejects negative and NaN 1ms
 Test Files  1 passed (1)
      Tests  3 passed (3)
~~~

### الفخ: مسافة مش مسافة

جرّبنا نكتب الـ expected بمسافة عادية بعد [[EGP]]:

~~~text الناتج: npx vitest run
AssertionError: expected 'EGP 1,250.50' to be 'EGP 1,250.50' // Object.is equality
Expected: "EGP 1,250.50"
Received: "EGP 1,250.50"
~~~

الاتنين شكلهم واحد، بس [[Intl]] بيحط **non-breaking space** (حرف كوده a0 بالـ hex، مسافة بتمنع السطر يتكسر عندها) مش مسافة عادية (كودها 20). عشان كده الحل كاتب الحرف ده بكوده في الـ expected.

---

## الخلاصة

- كل قاعدة بيزنس ليها مكان واحد: لو اتغيرت، بتتغير هناك بس.
- اطلّع الدالة تالت مرة تشوف التكرار (rule of three)، مش من أول نسختين.
- اسأل: الحتتين بيتغيروا مع بعض لنفس السبب؟ لو لأ، سيبهم متكررين.
- الدالة المشتركة مع ٣ اختبارات (عادي، وحدّي، وغلط) أأمن من ٣ نسخ.`,
          lines: [
            "الكوبون يا نسبة يا مبلغ ثابت. [[type]] بيحدد الشكل (discriminated union).",
            "الدالة الوحيدة في المشروع اللي تعرف تحسب خصم كوبون.",
            "النسبة تتحسب من الإجمالي، والثابت زي ما هو.",
            "الخصم عمره ما يبقى سالب ولا أكبر من الإجمالي. القاعدة دي بقت في مكان واحد.",
            "قفلة.",
            "١٠٪ من ٥٠٠: 50.",
            "كوبون ٨٠٠ على طلب ٥٠٠: الخصم 500 مش 800.",
            "كوبون غلط ١٥٠٪: برضه 500. النسخ القديمة كانت هتطلّع خصم أكبر من الطلب."
          ],
          sol: R`الـ ٣ اختبارات خضرا، والنسخ القديمة كلها بقت [[formatPrice(...)]]. وأهم خطوة بعد الاستبدال: ابحث تاني عن شكل النسخ القديمة (مثلًا [[toFixed(2)]] أو [[ج.م]]) واتأكد إن مفيش ولا واحدة فاضلة، وإلا هتصلّح bug في مكان وينفضل في التاني.

الفخ اللي هتقع فيه غالبًا في أول اختبار: [[expected 'EGP 1,250.50' to be 'EGP 1,250.50']]، والاتنين شكلهم واحد بالظبط! [[Intl.NumberFormat]] بيحط non-breaking space ([[ ]]) بعد العملة مش مسافة عادية. الحل إنك تكتبها في الـ expected زي الحل، أو تقارن بـ [[toMatch(/1,250\.50/)]].

وحالة الغلط (سالب أو [[NaN]]) مهمة: من غيرها الفاتورة هتطبع [[EGPNaN]] وانت مش واخد بالك. ولو لقيت إن النسختين «شبه بعض» بس بيختلفوا في قاعدة بيزنس (سعر للعميل بالضريبة وسعر للمورد من غير)، متجمّعهمش بـ boolean parameter: دول حاجتين مختلفتين بالصدفة شبه بعض، والتكرار هنا أرخص من abstraction غلط.`,
          solCode: R`// price.ts
const egp = new Intl.NumberFormat("en-EG", { style: "currency", currency: "EGP" });

export function formatPrice(cents: number): string {
  if (!Number.isFinite(cents) || cents < 0) throw new RangeError($__btinvalid price: $__{cents}$__bt);
  return egp.format(cents / 100);
}

// price.test.ts
import { describe, it, expect } from "vitest";
import { formatPrice } from "./price";

describe("formatPrice", () => {
  it("formats a normal price", () => {
    expect(formatPrice(125050)).toBe("EGP\u00a01,250.50");
  });
  it("handles zero", () => {
    expect(formatPrice(0)).toBe("EGP\u00a00.00");
  });
  it("rejects negative and NaN", () => {
    expect(() => formatPrice(-1)).toThrow(RangeError);
    expect(() => formatPrice(NaN)).toThrow("invalid price");
  });
});`
        },
        {
          cmd: "KISS و YAGNI",
          title: "أبسط حل يشتغل، ومتبنيش حاجة محدش طلبها",
          desc: R`KISS (Keep It Simple): اختار أبسط حل يحل المشكلة اللي قدامك، والكود «الذكي» اللي محتاج ١٠ دقايق تفهمه أسوأ من ٥ سطور عادية. و YAGNI (You Aren't Gonna Need It): متبنيش حاجة عشان «يمكن نحتاجها بعدين»، لأن أغلب «بعدين» ده مبيجيش، واللي بيجي بيجي بشكل مختلف عن اللي خمّنته.

الاتنين مع بعض: ابني المطلوب النهارده بأبسط شكل، واكتبه نضيف كفاية إنه يتغير بسهولة لما الطلب الجديد يوصل.`,
          example: R`// KISS، قبل: "ذكي" ومحدش يفهمه من غير ورقة وقلم
const isWeekendClever = (d: Date) => ((0b1100000 >> d.getDay()) & 1) === 1;

// KISS، بعد: الجمعة والسبت (getDay: الأحد 0 ... السبت 6)
const WEEKEND_DAYS = [5, 6];
const isWeekend = (d: Date) => WEEKEND_DAYS.includes(d.getDay());

// YAGNI: عملة واحدة في التطبيق؟ يبقى formatter واحد، مش نظام عملات "للمستقبل"
const egp = new Intl.NumberFormat("en-EG", { style: "currency", currency: "EGP" });
const formatPrice = (amount: number) => egp.format(amount);

const friday = new Date(2026, 8, 25);
console.log(isWeekendClever(friday), isWeekend(friday), formatPrice(1250.5)); // true true EGP 1,250.50`,
          try: R`دوّر في مشروعك على حاجة اتبنت «للمستقبل»: interface ليها implementation واحد، أو parameter كل اللي بينادوه بيبعتوله نفس القيمة، أو إعداد محدش غيّره. شيلها وبسّط، وشوف كام سطر راح من غير ما أي حاجة تبوظ.`,
          flag: "script",
          deep: {
            why: "كل سطر بتكتبه لازم حد يقراه ويختبره ويصونه ويفهمه قبل ما يعدّل جنبه. الحاجات اللي اتبنت «احتياطي» بتتكلف دلوقتي (وقت، وتعقيد، و bugs) عشان فايدة ممكن متجيش. والكود المعقد بيبطّأ كل تعديل بعد كده، مش التعديل الأول بس.",
            how: R`YAGNI (من Extreme Programming) مش ضد التصميم الكويس. الفرق بين «قرار بيسهّل التغيير» و «ميزة لسه محدش طلبها»: إنك تفصل حسبة الضريبة في دالة لوحدها ده تصميم كويس ومش مكلّف. إنك تبني نظام ضرايب بيدعم ٣٠ دولة وعميلك في دولة واحدة ده YAGNI.

علامات إنك بتبني للمستقبل: interface ليها implementation واحد ومفيش خطة لتاني، أو parameter كل اللي بينادوه بيبعتوا نفس القيمة، أو config لحاجة محدش بيغيّرها، أو «framework» داخلي لحاجة بتتعمل مرتين.

و KISS معناها كمان: استخدم اللي موجود في اللغة بدل ما تكتبه. [[Intl.NumberFormat]] بدل دالة تنسيق أرقام بتكتبها بإيدك، و [[structuredClone]] بدل deep copy يدوي. والكود الواضح اللي أطول بسطرين أحسن من السطر «الذكي»: الـ bitmask في المثال شغال، بس اللي هيقراه لازم يحوّل الرقم لـ binary في دماغه.

والفكرة مش إنك متفكرش في المستقبل. فكّر فيه، واكتب الكود بحيث يبقى سهل تغيّره (دوال صغيرة واختبارات)، بس متبنيهوش قبل ما ييجي.`,
            when: "مع كل قرار تصميم. اسأل: مين طلب ده؟ وإيه اللي هيحصل لو ما عملتوش النهارده؟ لو الإجابة «مفيش حاجة، هنعمله لما نحتاجه»، يبقى استنى.",
            mistakes: R`تفهم YAGNI إنها «متكتبش اختبارات» أو «متفصلش الكود»: دي حاجات بتسهّل التغيير، مش ميزات زيادة. وتعمل microservices لمشروع فيه مطوّر واحد و ١٠٠ مستخدم، و monolith مترتب أبسط بكتير (تاب «بناء مشروع كامل»). وفي الناحية التانية: تتجاهل قرارات صعب تغيّرها بعدين، زي إن الفلوس تتخزن بالقروش، أو إن الـ IDs تبقى UUID لو هتعمل sync بين أجهزة. دي قرارات أول يوم مش YAGNI.`
          },
          teach: R`## الفكرة

المثال فيه دالتين بيجاوبوا نفس السؤال («اليوم ده إجازة؟»): واحدة «ذكية» بالـ bits، وواحدة عادية. وبعدهم مثال YAGNI: formatter واحد بدل نظام عملات محدش طلبه. هنفك النسخة الذكية عشان تشوف قد إيه محتاجة شغل في الدماغ، وبعدين البسيطة. اتشغّل بـ [[npx tsx]] على Node 24.19 (ويندوز).

---

## ١. النسخة «الذكية»

~~~text main.ts
const isWeekendClever = (d: Date) => ((0b1100000 >> d.getDay()) & 1) === 1;
~~~

عشان تفهم السطر ده لازم تعدّي على ٤ خطوات:

### [[d.getDay()]]

بترجّع رقم اليوم في الأسبوع: الأحد [[0]]، والاتنين [[1]]، لحد السبت [[6]].

### [[0b1100000]]

رقم مكتوب بالـ binary (الـ [[0b]] في الأول معناها binary). قيمته:

~~~text الناتج: console.log(0b1100000, (0b1100000).toString(2))
96 1100000
~~~

اقرا الـ bits من اليمين، كل خانة يوم: الخانة ٥ (الجمعة) و ٦ (السبت) فيهم [[1]]، والباقي [[0]].

### [[>> d.getDay()]]

[[>>]] بتزق الـ bits يمين بعدد اليوم، فخانة اليوم ده تيجي في الآخر. مع الجمعة ([[5]]): [[96 >> 5]] = [[3]] (يعني [[11]] بالـ binary).

### [[& 1]] و [[=== 1]]

[[&]] (AND على مستوى الـ bits) مع [[1]] بتسيب آخر bit بس. [[3 & 1]] = [[1]]، فالجمعة إجازة. ومع الأربع ([[3]]): [[96 >> 3]] = ١٢، و [[12 & 1]] = [[0]].

~~~text الناتج: لكل الأيام من الأحد للسبت
[ false, false, false, false, false, true, true ]
~~~

الكود صح، بس ٤ خطوات حسابية عشان تعرف إن الإجازة الجمعة والسبت. ولو الإجازة اتغيرت، لازم تحسب الرقم الجديد بإيدك.

---

## ٢. النسخة البسيطة

~~~text main.ts
const WEEKEND_DAYS = [5, 6];
const isWeekend = (d: Date) => WEEKEND_DAYS.includes(d.getDay());
~~~

- [[WEEKEND_DAYS]]: array فيها رقمين، والتعليق فوقها بيقول [[getDay]] بيعدّ إزاي.
- [[includes]]: الرقم موجود في الـ array؟ بترجّع [[true]] أو [[false]].

نفس النتيجة، وبتتقري في ثانية، وتغييرها (مثلًا الإجازة سبت وحد) هو تعديل الـ array بس.

---

## ٣. YAGNI: formatter واحد

~~~text main.ts
const egp = new Intl.NumberFormat("en-EG", { style: "currency", currency: "EGP" });
const formatPrice = (amount: number) => egp.format(amount);
~~~

- [[Intl.NumberFormat]]: موجود في اللغة، فمش محتاج تكتب تنسيق الأرقام والفواصل بإيدك (ده KISS كمان).
- مفيش parameter للعملة، لأن التطبيق فيه عملة واحدة. يوم ما عملة تانية تيجي فعلًا، تضيفه ساعتها.

---

## ٤. الناتج

~~~text main.ts
const friday = new Date(2026, 8, 25);
~~~

[[new Date(سنة, شهر, يوم)]]: الشهور بتبدأ من صفر، فـ [[8]] يعني سبتمبر:

~~~text الناتج: friday.getDay(), friday.toDateString()
5 Fri Sep 25 2026
~~~

~~~text الناتج: npx tsx main.ts
true true EGP 1,250.50
~~~

الدالتين قالوا [[true]] (الجمعة إجازة)، والسعر اتنسّق بالفاصلة ورقمين عشريين.

---

## ٥. حل التمرين

القديم: [[interface PriceFormatter]] ليها class واحد بس ([[DefaultPriceFormatter]])، ونداء [[formatter.format(total, "EGP")]] اتكرر ٢٣ مرة وكله بنفس العملة. الجديد سطرين:

~~~text sol.ts
const egp = new Intl.NumberFormat("en-EG", { style: "currency", currency: "EGP" });
export const formatPrice = (amount: number) => egp.format(amount);
~~~

[[export]] عشان باقي الملفات تعمل [[import]].

~~~text الناتج: npx tsx sol.ts
EGP 99.50
~~~

---

## الخلاصة

| المبدأ | السؤال اللي تسأله |
|---|---|
| KISS | فيه طريقة أوضح تحل نفس المشكلة؟ |
| YAGNI | حد طلب ده النهارده؟ ولو احتجناه بعدين، إضافته صعبة؟ |

- الكود الواضح الأطول بسطرين أحسن من السطر الذكي اللي محتاج ورقة وقلم.
- استخدم اللي في اللغة ([[Intl]] و [[includes]]) بدل ما تكتبه.
- interface ليها implementation واحد، و parameter كل الناس بتبعتله نفس القيمة: علامات YAGNI.`,
          lines: [
            "بيشتغل، بس لازم تحوّل الرقم لـ binary في دماغك عشان تعرف إنه الجمعة والسبت.",
            "الأيام بأسماء واضحة في array.",
            "نفس النتيجة، ويتقري من أول نظرة.",
            "formatter جاهز في اللغة نفسها ([[Intl]])، بدل دالة تنسيق مكتوبة باليد.",
            "دالة صغيرة للتطبيق كله. لو يوم ما اتضافت عملة، تبقى parameter ساعتها.",
            "يوم جمعة للتجربة (الشهور في Date بتبدأ من 0، فـ 8 يعني سبتمبر).",
            "بيطبع [[true true]] والسعر متنسّق بالعملة."
          ],
          sol: R`اللي بيتلاقي كتير: [[interface PriceFormatter]] ليها class واحد بس، أو parameter [[currency]] كل الـ ٢٣ نداء بيبعتوا فيه [[EGP]]، أو [[options]] object محدش بيبعت فيه غير القيم الافتراضية. في الحل التلاتة بقوا دالة واحدة سطر واحد، و [[formatPrice(99.5)]] بترجع [[EGP 99.50]].

بعد الحذف شغّل [[tsc --noEmit]] والاختبارات: لو كله أخضر يبقى الحاجة دي ماكانتش بتعمل حاجة. و [[git diff --stat]] هيوريك كام سطر راح، وعادةً بيبقى أكتر من المتوقع.

متشيلش interface عليها اتنين implementations حقيقيين (in-memory للاختبارات و Prisma للإنتاج مثلًا): دي مستخدمة فعلًا ومش YAGNI. والسؤال اللي تسأله لنفسك (وتقوله في الانترفيو): «لو احتجتها بعدين، إضافتها هتبقى صعبة؟». لو الإجابة refactor ساعة، شيلها دلوقتي. الاستثناء: الحاجات الغالية تتغير بعدين، زي شكل الـ public API أو الـ database schema.`,
          solCode: R`// قبل: interface ليها implementation واحد، و parameter كل الناس بتبعتله "EGP"
// interface PriceFormatter { format(amount: number, currency: string): string }
// class DefaultPriceFormatter implements PriceFormatter { format(a, c) { ... } }
// const formatter: PriceFormatter = new DefaultPriceFormatter();
// formatter.format(total, "EGP");  // 23 نداء، كلهم "EGP"

// بعد: دالة واحدة، ولما عملة تانية تيجي فعلًا نضيف الـ parameter وقتها
const egp = new Intl.NumberFormat("en-EG", { style: "currency", currency: "EGP" });
export const formatPrice = (amount: number) => egp.format(amount);

console.log(formatPrice(99.5)); // EGP 99.50`
        }
      ]
    },
    {
      t: "الأخطاء",
      l: 1,
      n: "اقع بدري وبصوت عالي، وسمّي كل نوع خطأ، ومتبلعش خطأ أبدًا",
      items: [
        {
          cmd: "fail fast",
          title: "ارفض الداتا الغلط أول ما تدخل",
          desc: R`fail fast معناها: أول ما تكتشف إن فيه حاجة غلط، وقّف وقول بوضوح. متكمّلش بداتا غلط على أمل إنها تعدّي، لأنها هتقع بعدين في مكان بعيد وبرسالة ملهاش علاقة بالسبب.

وأهم مكان ليه هو الحدود (boundaries): الـ request اللي جاي من برا، والـ env variables وقت التشغيل، والرد من API خارجي. افحصهم عند الباب، وجوه الكود ثق في الأنواع.`,
          example: R`function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error($__btMissing env var $__{name}$__bt);
  return value;
}

type Transfer = { from: string; to: string; amount: number };
function parseTransfer(body: unknown): Transfer {
  const b = (body ?? {}) as Partial<Transfer>;
  if (typeof b.from !== "string" || typeof b.to !== "string") throw new TypeError("from/to required");
  if (typeof b.amount !== "number" || b.amount <= 0) throw new RangeError("amount must be > 0");
  return { from: b.from, to: b.to, amount: b.amount };
}

process.env.PAYMENT_KEY = "YOUR_KEY";
console.log(requireEnv("PAYMENT_KEY")); // YOUR_KEY
console.log(parseTransfer({ from: "a", to: "b", amount: -5 })); // RangeError: amount must be > 0`,
          try: R`في مشروع Express أو Next عندك، اعمل ملف [[env.ts]] بيقرا كل الـ env variables المطلوبة بـ [[requireEnv]] ويصدّرهم. امسح متغير من [[.env]] وشغّل: لازم التطبيق يقع وهو بيقوم برسالة فيها الاسم، مش بعد ساعة في أول request.`,
          flag: "script",
          deep: {
            why: R`الغلط اللي بيتكتشف متأخر غالي. [[undefined]] دخل من الـ request، وعدّى على ٣ دوال، واتخزن في الداتابيز، وبعد أسبوع صفحة التقارير وقعت بـ [[Cannot read properties of undefined]]. دلوقتي انت بتدوّر على السبب في كود ملوش ذنب. لو كان اترفض عند الباب، كنت هتعرف في نفس اللحظة ومن الرسالة نفسها.`,
            how: R`الفكرة: التحقق عند الحدود، والثقة جوه. الـ body في Express نوعه الحقيقي [[unknown]] مهما كتبت type، لأن TypeScript مبيشتغلش وقت التشغيل ومش هيمنع حد يبعت أي JSON. عشان كده الدالة اللي بتستقبله لازم تفحصه وتطلّع نوع مضمون.

عمليًا بتستخدم مكتبة schema زي zod بدل الـ if اليدوية: [[z.object({ amount: z.number().positive() })]] و [[schema.parse(body)]] بترمي خطأ فيه كل الخانات الغلط، وبتطلّعلك النوع من الـ schema نفسها بـ [[z.infer]] (التفاصيل في تاب «Backend بـ Node»). المثال هنا يدوي عشان تشوف اللي بيحصل جوه.

الـ env variables: اقراهم مرة وقت التشغيل وافحصهم كلهم، فالتطبيق يرفض يقوم لو ناقصه حاجة. أحسن ما يقوم «سليم» ويقع أول ما حد يدفع.

والـ assertions جوه الكود ([[if (!order) throw new Error('order must exist here')]]) للحالات اللي «مستحيل» تحصل: لو حصلت يبقى فيه bug، والأحسن تعرف فورًا بدل ما الكود يكمّل بحالة غلط.

وfail fast مش معناها إن السيرفر كله يقع مع أي خطأ: الـ request الغلط بيترفض بـ 400 والسيرفر يفضل شغال. اللي بيقع بدري هو العملية الغلط، مش السيستم.`,
            when: "أي داتا جاية من برا الكود بتاعك: request body و query، و env، ورد من API خارجي، وملفات بيرفعها المستخدم، وداتا من localStorage.",
            mistakes: R`تستخدم [[as Transfer]] على الـ body وتفتكره فحص: [[as]] بيقول لـ TypeScript «صدّقني» ومبيفحصش حاجة. وقيم افتراضية بتخبّي المشكلة: [[process.env.JWT_SECRET || 'dev-secret']] في الإنتاج معناها إن السيرفر شغال بسر معروف لأي حد قرا الكود، ودي ثغرة. و [[try/catch]] حوالين كل حاجة بيرجّع null، فالخطأ يتحوّل لـ null ماشي في الكود ويقع بعدين برضه.`
          },
          teach: R`## الفكرة

المثال فيه دالتين بيقفوا على «الباب»: [[requireEnv]] بتفحص إعداد لازم يبقى موجود، و [[parseTransfer]] بتفحص داتا جاية من برّه. الاتنين لو لقوا حاجة غلط بيرموا خطأ فورًا برسالة بتقول السبب. اتشغّل بـ [[npx tsx]] على Node 24.19 (ويندوز، في Git Bash عشان نحط env variables قبل الأمر).

---

## ١. [[requireEnv]]

~~~text main.ts
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error($__bt...$__bt);
  return value;
}
~~~

- [[process.env]]: object في Node فيه كل الـ environment variables (متغيرات البيئة، الإعدادات اللي بتتحط برّه الكود زي مفتاح الدفع ورابط الداتابيز).
- [[process.env[name]]]: الأقواس المربعة بتقرا خانة اسمها جوه متغير. ونوعها في TypeScript [[string | undefined]]، لأن المتغير ممكن ميكونش موجود.
- [[if (!value) throw ...]]: لو مش موجود (أو فاضي [[""]])، اقع حالًا. والرسالة جواها اسم المتغير بالـ template string ([[$__{name}]] جوه علامات backtick).
- [[return value]] بنوع [[string]]: بعد الـ guard، TypeScript عارف إن [[undefined]] اتشالت، فاللي بينادي الدالة بياخد [[string]] مضمون ومحتاجش يفحص تاني.

جرّبناها على متغير مش موجود:

~~~text الناتج
Missing env var NOPE_X
~~~

---

## ٢. [[parseTransfer]]: الداتا من برّه نوعها [[unknown]]

~~~text main.ts
type Transfer = { from: string; to: string; amount: number };
function parseTransfer(body: unknown): Transfer {
  const b = (body ?? {}) as Partial<Transfer>;
~~~

- [[body: unknown]]: الـ request body جاي من أي حد، فمش مضمون فيه أي حاجة. [[unknown]] بيجبرك تفحص قبل ما تستخدم (عكس [[any]] اللي بيقفل الفحص).
- [[body ?? {}]]: الـ [[??]] معناها «لو اللي على الشمال [[null]] أو [[undefined]]، خد اللي على اليمين». فلو مفيش body نبدأ بـ object فاضي بدل ما نقع على [[null.from]].
- [[as Partial<Transfer>]]: [[as]] بتقول لـ TypeScript «اعتبره كذا». و [[Partial]] بتخلي كل خانات [[Transfer]] اختيارية، يعني «ممكن تكون موجودة وممكن لأ»، وده الصح لأننا لسه مفحصناش.

~~~text main.ts
  if (typeof b.from !== "string" || typeof b.to !== "string") throw new TypeError("from/to required");
  if (typeof b.amount !== "number" || b.amount <= 0) throw new RangeError("amount must be > 0");
  return { from: b.from, to: b.to, amount: b.amount };
}
~~~

- [[typeof x !== "string"]]: [[typeof]] بترجّع نوع القيمة وقت التشغيل كنص ([["string"]] و [["number"]] ...). ده فحص حقيقي بيشتغل في JavaScript، مش مجرد نوع بيتمسح.
- [[TypeError]] و [[RangeError]]: أنواع أخطاء جاهزة: الأول «النوع غلط»، والتاني «القيمة برّه المسموح».
- السطر الأخير بيبني [[Transfer]] جديد من الخانات اللي اتفحصت، فأي خانة زيادة في الـ body بتتشال.

جرّبناها على ٣ أشكال body:

~~~text الناتج
TypeError: from/to required
RangeError: amount must be > 0
{ from: 'a', to: 'b', amount: 100 }
~~~

| الـ body | اللي حصل |
|---|---|
| [[null]] | بقى [[{}]]، ومفيهوش [[from]]: [[TypeError]] |
| [[amount: "100"]] (نص) | [[typeof]] طلع [["string"]]: [[RangeError]] |
| [[amount: 100]] | عدّى ورجع [[Transfer]] سليم |

لاحظ التانية: من غير الفحص، [["100"]] كانت هتعدّي، وبعدين [[balance - "100"]] هتشتغل صح بالصدفة و [[balance + "100"]] هتلزق نصوص. الغلطة هتظهر بعيد عن مكانها.

---

## ٣. آخر ٣ سطور

~~~text الناتج: npx tsx main.ts
YOUR_KEY
RangeError: amount must be > 0
    at parseTransfer (main.ts:11:60)
~~~

السطر الأول حط قيمة في [[PAYMENT_KEY]] فـ [[requireEnv]] رجعتها. والتاني بعت [[amount: -5]]، فالبرنامج وقع بـ [[RangeError]] قبل ما أي فلوس تتحرك. والـ stack (السطر اللي بيبدأ بـ [[at]]) بيقول الخطأ اترمى فين بالظبط: السطر ١١ العمود ٦٠ في [[parseTransfer]] (المسار الكامل للملف اتقصّر هنا).

---

## ٤. حل التمرين: [[env.ts]]

~~~text env.ts
export const env = {
  DATABASE_URL: requireEnv("DATABASE_URL"),
  JWT_SECRET: requireEnv("JWT_SECRET"),
  PORT: Number(process.env.PORT ?? 3000),
};
~~~

- [[export const env]]: object واحد فيه كل الإعدادات، بيتحسب **مرة واحدة** أول ما الملف يتعمله import.
- [[PORT]]: مش لازم، فله قيمة افتراضية بـ [[??]]. و [[Number(...)]] لأن أي env variable دايمًا نص.

و [[server.ts]] أول سطر فيه [[import { env } from "./env"]]. شغّلناه مرتين:

~~~bash
DATABASE_URL=x JWT_SECRET=y npx tsx server.ts
~~~

~~~text الناتج
listening on 3000
~~~

~~~bash
DATABASE_URL=x npx tsx server.ts
~~~

~~~text الناتج
Error: Missing env var JWT_SECRET
~~~

و exit code كان [[1]]. يعني الـ deploy هيفشل وهو بيقوم، والرسالة فيها اسم المتغير الناقص، بدل ما التطبيق يقوم «سليم» ويقع في أول login. (الصيغة [[NAME=value command]] بتحط المتغير للأمر ده بس، في bash و Git Bash. في PowerShell: [[$env:NAME="value"]] في سطر قبله.)

---

## الخلاصة

- افحص عند الحدود: env variables وقت التشغيل، والـ request body، والرد من API خارجي.
- الداتا من برّه نوعها [[unknown]]، وتتفحص بـ [[typeof]] (أو zod) قبل ما تبقى نوع مضمون.
- الخطأ يترمي فورًا برسالة فيها السبب، مش بعدين في مكان بعيد.
- اقرا الـ env كلها مرة واحدة وقت التشغيل، مش جوه دالة بتتنادى مع كل request.`,
          lines: [
            "دالة بتجيب env variable ولازم تلاقيه.",
            "اقرا القيمة.",
            "مش موجودة؟ اقع حالًا واكتب اسم المتغير الناقص.",
            "رجّعها string مضمون، مش [[string | undefined]].",
            "قفلة.",
            "شكل التحويل اللي جوه الكود هيثق فيه.",
            "الـ body جاي من برا فنوعه [[unknown]]: مفيش أي حاجة مضمونة.",
            "بنقراه كـ Partial عشان نفحص كل خانة، ولو null نبدأ بـ object فاضي.",
            "من أو لـ مش string؟ ارفض.",
            "المبلغ مش رقم، أو صفر، أو سالب؟ ارفض.",
            "من هنا ورايح الداتا مضمونة، ونوعها [[Transfer]].",
            "قفلة.",
            "للتجربة بس: حط قيمة في الـ env.",
            "بيطبع [[YOUR_KEY]].",
            "بيقع بـ [[RangeError]] قبل ما أي فلوس تتحرك."
          ],
          sol: R`لما كل المتغيرات موجودة هتشوف [[listening on 3000]]. ولما تمسح [[JWT_SECRET]] من [[.env]]، التطبيق يقع وهو بيقوم، قبل ما يسمع على أي port، بـ [[Error: Missing env var JWT_SECRET]] و exit code 1. ده المطلوب: الـ deploy يفشل فورًا والرسالة فيها اسم المتغير.

الشرط إن [[env.ts]] يتعمله import في أول الـ server، وإن باقي الكود يقرا [[env.JWT_SECRET]] مش [[process.env.JWT_SECRET]]. ابحث عن [[process.env]] في المشروع: أي مكان فاضل برا [[env.ts]] هو متغير مش متفحوص. ولو بتقرا [[.env]] بـ dotenv لازم [[import "dotenv/config"]] يبقى قبل [[env.ts]]، أو شغّل بـ [[node --env-file=.env]].

الغلط الشائع: تنادي [[requireEnv]] جوه دالة بتشتغل وقت الـ request (جوه [[signToken()]] مثلًا)، فالتطبيق يقوم عادي ويقع في أول login. وكمان [[process.env.PORT]] دايمًا string، فلو محتاج رقم حوّله وافحص إنه مش [[NaN]]. ولو المشروع فيه Zod، [[z.object({...}).parse(process.env)]] بيعمل نفس الفكرة لكل المتغيرات مرة واحدة وبيطلّع كل الناقص في رسالة واحدة.`,
          solCode: R`// env.ts
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error($__btMissing env var $__{name}$__bt);
  return value;
}

export const env = {
  DATABASE_URL: requireEnv("DATABASE_URL"),
  JWT_SECRET: requireEnv("JWT_SECRET"),
  PORT: Number(process.env.PORT ?? 3000),
};

// server.ts
import { env } from "./env"; // أول import: لو ناقص حاجة، التطبيق يقع هنا قبل ما يسمع على أي port
console.log($__btlistening on $__{env.PORT}$__bt);`
        },
        {
          cmd: "custom errors",
          title: "كل نوع خطأ ليه اسم ومعاملة",
          desc: R`بدل [[throw new Error('not found')]] وبعدين تقارن نص الرسالة، اعمل class لكل نوع خطأ مهم ([[NotFoundError]] و [[ValidationError]] و [[PaymentDeclinedError]])، وفرّق بينهم بـ [[instanceof]]. وفي مكان واحد (error handler) بتحوّل كل نوع لـ status code، والـ services متعرفش حاجة عن HTTP.`,
          example: R`class AppError extends Error {
  status = 500;
}
class NotFoundError extends AppError {
  override status = 404;
  override name = "NotFoundError";
}

function toHttp(err: unknown): { status: number; body: string } {
  if (err instanceof AppError) return { status: err.status, body: err.message };
  console.error(err);
  return { status: 500, body: "Internal error" };
}
console.log(toHttp(new NotFoundError("Order 7 not found"))); // { status: 404, body: 'Order 7 not found' }
console.log(toHttp(new TypeError("x is undefined")).status); // 500`,
          try: R`في مشروع Express عندك، اعمل [[AppError]] و [[NotFoundError]] و [[ValidationError]]، واكتب error middleware واحد بـ ٤ parameters [[(err, req, res, next)]] بيعمل زي [[toHttp]] ويتحط آخر حاجة. امسح كل [[res.status(404)]] المتفرقة في الـ controllers وخلّي الـ service ترمي [[NotFoundError]].`,
          flag: "script",
          deep: {
            why: R`لو كل الأخطاء [[Error]] عادي، مفيش طريقة تفرّق بينهم غير إنك تقرا الرسالة: [[if (e.message.includes('not found'))]]، ويوم ما حد يغيّر الرسالة أو يترجمها، الكود ده يبوظ من غير ما حد ياخد باله. وكمان الـ service بتبقى مضطرة ترد HTTP بنفسها، فمينفعش تناديها من cron job أو script.`,
            how: R`في JavaScript تقدر ترمي أي حاجة ([[throw 'oops']])، بس ارمي دايمًا Error أو class وارث منه، عشان يبقى معاه [[stack]] يقولك الخطأ حصل فين.

[[instanceof]] بيمشي على سلسلة الـ prototype: [[NotFoundError]] هو [[AppError]] وهو [[Error]]. فالـ catch يقدر يمسك نوع معين، أو كل أخطاء التطبيق مرة واحدة زي [[toHttp]].

التقسيم المهم نوعين: أخطاء متوقعة (operational) زي مش موجود، أو داتا غلط، أو الدفع اترفض، أو API خارجي واقع. دي جزء من البيزنس، ليها status ورسالة للمستخدم. وأخطاء مش متوقعة (bugs) زي [[TypeError]] من [[undefined]]: دي 500 برسالة عامة، والتفاصيل في اللوج بس، لأن الـ stack فيه مسارات ملفات وممكن أسرار.

في Express، الـ error middleware بياخد ٤ parameters وبيتحط بعد كل الـ routes، وفي Express 5 أي promise بترفض في handler بتوصله لوحدها من غير [[next(err)]] يدوي (التفاصيل في تاب «Backend بـ Node»). وعلى الفرونت، Next فيه [[error.tsx]] و React فيه error boundaries لنفس الفكرة.

وفيه أسلوب تاني للأخطاء المتوقعة: متعملش throw خالص، ورجّعها كقيمة ([[Result]]): نوع يا نجاح يا فشل، والـ TypeScript يجبر اللي بينادي يفحص الاتنين (تاب TypeScript، درس «generic types و defaults»).`,
            when: "أول ما يبقى عندك أكتر من نوع خطأ ليه معاملة مختلفة: 404 و 400 و 409 و 402. وفي أي مكتبة أو SDK بتكتبه، عشان اللي بيستخدمه يمسك أخطاءك بالنوع.",
            mistakes: R`ترجّع [[err.message]] أو [[err.stack]] للمستخدم في كل الأخطاء، فتسرّب تفاصيل السيرفر. وتعمل [[catch (e) { throw new Error('failed') }]] فتضيّع النوع والـ stack الأصلي (الحل [[cause]]، في الدرس الجاي). و [[instanceof]] بيفشل لو فيه نسختين من نفس المكتبة في [[node_modules]]، لأن كل نسخة ليها class مختلف. ومع [[strict]] في tsconfig، الـ [[e]] في الـ catch نوعها [[unknown]]، فافحصها بـ [[instanceof]] قبل ما تقرا [[e.message]].`
          },
          teach: R`## الفكرة

بدل ما كل الأخطاء تبقى [[Error]] وتفرّق بينهم بنص الرسالة، كل نوع خطأ مهم بقى class ليه اسم و status. ودالة واحدة ([[toHttp]]) بتحوّل أي خطأ لرد HTTP. هنفك الـ classes، ونشوف [[instanceof]] بيعرف إيه، وبعدين نشغّل سيرفر Express الحل ونضربه بـ curl. اتشغّل بـ [[npx tsx]] على Node 24.19 و Express 5.2 على ويندوز.

---

## ١. الأب: [[AppError]]

~~~text main.ts
class AppError extends Error {
  status = 500;
}
~~~

- [[class ... extends Error]]: class جديد بيورث كل حاجة من [[Error]] الجاهز في JavaScript: الرسالة ([[message]]) والاسم ([[name]]) والـ [[stack]] (السطور اللي بتقول الخطأ حصل فين).
- [[status = 500]]: خانة زيادة بتاعتنا. أي خطأ معروف في التطبيق معاه status، والافتراضي 500 (خطأ في السيرفر).

---

## ٢. الابن: [[NotFoundError]]

~~~text main.ts
class NotFoundError extends AppError {
  override status = 404;
  override name = "NotFoundError";
}
~~~

- [[extends AppError]]: بيورث من الأب، فهو [[AppError]] وهو [[Error]] في نفس الوقت.
- [[override]]: كلمة TypeScript بتقول «أنا قاصد أغيّر خانة موجودة في الأب». لو الإعداد [[noImplicitOverride]] شغال ونسيتها:

~~~text الناتج: npx tsc --noEmit --noImplicitOverride
ce3.ts(2,21): error TS4114: This member must have an 'override' modifier because it overrides a member in the base class 'A'.
~~~

وفايدتها: لو حد غيّر اسم الخانة في الأب، الابن يطلع خطأ بدل ما يعمل خانة جديدة في صمت.
- [[name = "NotFoundError"]]: من غيرها الاسم بيفضل [["Error"]]:

~~~text الناتج
NotFoundError Order 7 not found 404 | Error
~~~

الأول [[NotFoundError]] فيه [[name]]، والتاني class تاني من غير [[name]] فطلع اسمه [[Error]]، وده اللي هيظهر في اللوج.

---

## ٣. [[instanceof]]: هل الخطأ ده من النوع ده؟

~~~text الناتج: e instanceof NotFoundError, AppError, Error, و new TypeError("x") instanceof AppError
true true true false
~~~

[[instanceof]] بيمشي على سلسلة الوراثة: [[NotFoundError]] هو [[AppError]] وهو [[Error]]. أما [[TypeError]] (خطأ جاهز في JS) فمش من عيلتنا، فالإجابة [[false]]. ودي اللي [[toHttp]] بتعتمد عليها.

---

## ٤. [[toHttp]]: مكان واحد بيحوّل لـ HTTP

~~~text main.ts
function toHttp(err: unknown): { status: number; body: string } {
  if (err instanceof AppError) return { status: err.status, body: err.message };
  console.error(err);
  return { status: 500, body: "Internal error" };
}
~~~

- [[err: unknown]]: في JavaScript أي حاجة ممكن تترمي (حتى نص أو رقم)، فالنوع الصح [[unknown]]. وبعد [[instanceof AppError]]، TypeScript بيعرف إن [[err.status]] موجودة.
- لو خطأ معروف: رجّع الـ status والرسالة بتاعته.
- غير كده ده bug: [[console.error]] بيسجّل التفاصيل كلها في اللوج، والمستخدم ياخد رسالة عامة. الـ stack فيه مسارات ملفات، ومينفعش يوصل للمستخدم.

~~~text الناتج: npx tsx main.ts
{ status: 404, body: 'Order 7 not found' }
TypeError: x is undefined
    at <anonymous> (main.ts:15:20)
500
~~~

السطر الأول خطأ معروف. والتاني والتالت هما [[console.error]] (الـ stack اتقصّر هنا)، والرابع الـ status اللي رجع: [[500]].

---

## ٥. حل التمرين: Express

الحل فيه ٣ أجزاء:

### الـ service بترمي ومتعرفش HTTP

~~~text sol.ts
function getOrder(id: string) {
  if (!/^\d+$/.test(id)) throw new ValidationError(...);
  const order = orders.get(id);
  if (!order) throw new NotFoundError(...);
  return order;
}
~~~

- [[/^\d+$/]]: regex معناه «أرقام بس من أول النص لآخره». [[^]] البداية، و [[\d]] رقم، و [[+]] واحد أو أكتر، و [[$]] النهاية. و [[.test(id)]] بترجّع [[true]] لو النص ماشي على النمط.
- [[orders.get(id)]]: [[orders]] هنا [[Map]] (جدول مفتاح وقيمة)، و [[get]] بترجّع [[undefined]] لو المفتاح مش موجود.
- [[ValidationError]] بـ status [[422]] (Unprocessable Entity: الطلب مفهوم بس الداتا غلط).

### الـ route سطر واحد

[[res.json(getOrder(req.params.id))]]: [[req.params.id]] هو الجزء [[:id]] من الرابط. مفيش ولا [[res.status(404)]]. لو [[getOrder]] رمت، Express 5 بيوصّل الخطأ للـ error middleware لوحده.

### الـ error middleware

~~~text sol.ts
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => { ... });
~~~

- **٤ parameters**: Express بيعرف إن دي error middleware من عددهم، حتى لو [[_next]] مش مستخدم. الـ [[_]] في أول الاسم عادة بتقول «مش مستخدم».
- متسجّل **بعد** كل الـ routes.
- جواها نفس منطق [[toHttp]]، بس بيرد بـ [[res.status(...).json(...)]].

شغّلنا السيرفر (على port تاني عشان منتخانقش مع حاجة شغالة) وضربناه بـ curl:

~~~text الناتج: curl -i لكل رابط
/orders/7    HTTP/1.1 200 OK                     {"id":"7","total":250}
/orders/99   HTTP/1.1 404 Not Found              {"error":"NotFoundError","message":"Order 99 not found"}
/orders/abc  HTTP/1.1 422 Unprocessable Entity   {"error":"ValidationError","message":"Invalid order id: abc"}
/boom        HTTP/1.1 500 Internal Server Error  {"error":"InternalError","message":"Internal error"}
~~~

و [[TypeError: x is undefined]] بالـ stack كامل ظهر في ترمنال السيرفر بس، مش في الرد.

---

## الخلاصة

| النوع | status | الرسالة للمستخدم |
|---|---|---|
| [[ValidationError]] | 422 | رسالته |
| [[NotFoundError]] | 404 | رسالته |
| أي حاجة تانية (bug) | 500 | [[Internal error]]، والتفاصيل في اللوج |

- class لكل نوع خطأ مهم، بـ [[name]] و [[status]]، وفرّق بـ [[instanceof]] مش بنص الرسالة.
- الـ services بترمي، ومكان واحد بس بيحوّل لـ HTTP.
- error middleware في Express: ٤ parameters وآخر حاجة.`,
          lines: [
            "أساس كل أخطاء التطبيق اللي احنا عارفينها.",
            "كل خطأ معروف معاه status، والافتراضي 500.",
            "قفلة.",
            "خطأ «مش موجود» بيورث من الأساس.",
            "الـ status بتاعه 404. [[override]] بتقول إننا قاصدين نغيّر قيمة موجودة في الأب.",
            "الاسم بيظهر في اللوج والـ stack بدل Error عادي.",
            "قفلة.",
            "المكان الوحيد اللي بيحوّل الأخطاء لـ HTTP. النوع [[unknown]] لأن أي حاجة ممكن تترمي في JavaScript.",
            "خطأ من أخطاءنا؟ رجّع الـ status والرسالة بتاعته.",
            "أي حاجة تانية bug مش متوقع: التفاصيل تتسجل في اللوج...",
            "...والمستخدم ياخد 500 برسالة عامة.",
            "قفلة.",
            "بيطبع 404 والرسالة.",
            "خطأ مش بتاعنا: 500، وتفاصيله في اللوج بس."
          ],
          sol: R`بـ curl هتشوف: [[/orders/7]] بـ 200، و [[/orders/99]] بـ 404 و [[Order 99 not found]]، و [[/orders/abc]] بـ 422، و [[/boom]] بـ 500 ورسالة عامة [[Internal error]] (والتفاصيل الحقيقية في console السيرفر بس). والـ route نفسه سطر واحد ومفيهوش ولا [[res.status]].

لو الـ middleware مش بيتنادى و Express بيرد بصفحة HTML فيها stack trace، يبقى واحد من ٣: الـ middleware متسجّل قبل الـ routes مش بعدها، أو ليه ٣ parameters بس (Express بيعرف الـ error middleware من إن ليه ٤، حتى لو [[_next]] مش مستخدم)، أو الخطأ اترمى من callback برا الـ handler (زي [[setTimeout]]) فمحدش مسكه.

في Express 5 الـ async handler اللي بيرمي بيوصل للـ middleware لوحده. في Express 4 لازم [[next(err)]] أو try/catch، وإلا الطلب بيفضل معلّق. ومتنساش [[name]] في كل class: من غيره [[err.name]] بيبقى [[Error]] في الـ logs وفي الرد.`,
          solCode: R`import express, { type Request, type Response, type NextFunction } from "express";

class AppError extends Error {
  status = 500;
}
class NotFoundError extends AppError {
  override status = 404;
  override name = "NotFoundError";
}
class ValidationError extends AppError {
  override status = 422;
  override name = "ValidationError";
}

// الـ service بترمي، ومتعرفش حاجة عن HTTP
const orders = new Map([["7", { id: "7", total: 250 }]]);
function getOrder(id: string) {
  if (!/^\d+$/.test(id)) throw new ValidationError($__btInvalid order id: $__{id}$__bt);
  const order = orders.get(id);
  if (!order) throw new NotFoundError($__btOrder $__{id} not found$__bt);
  return order;
}

const app = express();
app.get("/orders/:id", (req, res) => {
  res.json(getOrder(req.params.id)); // مفيش res.status(404) هنا خالص
});
app.get("/boom", () => {
  throw new TypeError("x is undefined");
});

// آخر حاجة، و ٤ parameters عشان Express يعرف إنه error middleware
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) return res.status(err.status).json({ error: err.name, message: err.message });
  console.error(err);
  res.status(500).json({ error: "InternalError", message: "Internal error" });
});

app.listen(3000, () => console.log("http://localhost:3000"));`
        },
        {
          cmd: "catch {}",
          title: "خطأ اتبلع ومحدش عرف إنه حصل",
          desc: R`[[catch {}]] الفاضي بيقول «لو حصل أي خطأ، اعمل نفسك مشفتش». الكود يكمّل كأن كل حاجة تمام، والنتيجة داتا ناقصة أو عملية متعملتش ومحدش يعرف ليه. في الـ catch يا تعالج الخطأ فعلًا، يا تضيف معلومة وترميه تاني بـ [[cause]]، يا متعملش catch خالص وسيبه يطلع للي فوق.`,
          example: R`// قبل: لو الـ JSON بايظ، الإعدادات بتبقى undefined ومحدش يعرف ليه
// let config; try { config = JSON.parse(text); } catch {}

function parseConfig(text: string): { port: number } {
  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error("config.json is not valid JSON", { cause: err });
  }
}

try {
  parseConfig("{ port: 3000 }");
} catch (err) {
  const e = err as Error;
  console.log(e.message, "| cause:", (e.cause as Error).message);
}`,
          try: R`دوّر في مشروعك على [[catch {}]] و [[catch (e) {}]] و [[.catch(() => {})]]. لكل واحد قرّر: أعالجه، ولا أسجّله وأكمّل بقيمة بديلة، ولا أشيل الـ catch خالص. واكتب في كل catch فضل سطر «ليه».`,
          flag: "script",
          deep: {
            why: R`الخطأ اللي اتبلع أصعب bug ممكن تدوّر عليه، لأن مفيش أي أثر: لا لوج، ولا رسالة، ولا exit code. الـ feature ببساطة مش شغالة. وفي مشروع حقيقي (تطبيق desktop) كان إنشاء فولدر اللوجات وكتابة لوج الجلسة جوه [[catch {}]] فاضية، فلو الصلاحيات غلط، التطبيق بيشتغل عادي واللوجات مبتتكتبش خالص، ومحدش هيكتشف ده غير يوم ما يحتاجها.`,
            how: R`عندك ٤ اختيارات بس، واختار واحد بوعي:

١. متعملش catch. سيب الخطأ يطلع لحد مكان عارف يعمل حاجة (الـ error handler في Express، أو error boundary في React). ده الصح في أغلب الحالات.

٢. ضيف سياق وارمي تاني: [[throw new Error('failed to load user 42', { cause: err })]]. الـ [[cause]] (من ES2022) بيحفظ الخطأ الأصلي بالـ stack بتاعه، و Node بيطبع الاتنين لما الخطأ يوصل للآخر من غير ما حد يمسكه.

٣. عالج فعلًا: retry لطلب شبكة فشل، أو قيمة بديلة مقصودة («الـ theme في localStorage بايظة؟ استخدم الافتراضي»)، بس سجّلها بـ [[console.warn]].

٤. تجاهل مقصود ومكتوب: حالات قليلة التجاهل فيها صح (تقفل اتصال مقفول أصلًا، أو [[localStorage]] بيرمي في private browsing). اكتب تعليق بيقول ليه، عشان اللي بعدك يعرف إنه قرار مش كسل.

والـ promises نفس الكلام: [[.catch(() => {})]] بلع، و promise من غير [[await]] ولا catch ممكن ترفض وتقفل Node كله ([[unhandledRejection]]). وقاعدة [[no-floating-promises]] في typescript-eslint بتمسك ده (تاب «فحص الكود»).`,
            when: "كل مرة تكتب catch، اسأل: أنهي اختيار من الأربعة؟ ولو مش عارف، سيبه يطلع.",
            mistakes: R`[[catch (e) { console.log(e) }]] وتكمّل عادي: ده بلع بشياكة، السطر بيتوه في اللوج والكود بيكمّل بحالة غلط. و [[catch (e) { throw new Error('something went wrong') }]] من غير cause، فالـ stack الأصلي ضاع. و [[return null]] في الـ catch، فاللي نادى مش عارف null معناها «مش موجود» ولا «حصل خطأ». وفي انترفيو لو اتسألت «بتتعامل مع الأخطاء إزاي؟»، قول: الأخطاء المتوقعة ليها أنواع ومعاملة، والمش متوقعة بتطلع لـ handler واحد بيسجّلها ويرد رد عام، ومفيش catch فاضي.`
          },
          teach: R`## الفكرة

هنشوف الأول الـ catch الفاضي بيعمل إيه بالظبط، وبعدين نفك [[parseConfig]] اللي بتضيف معلومة وترمي الخطأ تاني من غير ما تضيّع الأصلي. اتشغّل بـ [[npx tsx]] على Node 24.19 (ويندوز).

---

## ١. الـ catch الفاضي (القديم)

~~~text قبل
let config; try { config = JSON.parse(text); } catch {}
~~~

- [[try { ... }]]: جرّب الكود ده.
- [[catch {}]]: لو رمى خطأ، نفّذ اللي بين القوسين... واللي بين القوسين فاضي. يعني «ولا كأن حاجة حصلت».

جرّبناه على نص مش JSON سليم ([[{ port: 3000 }]] المفتاح فيه من غير علامات تنصيص):

~~~text الناتج
config: undefined | port: undefined
Cannot read properties of undefined (reading 'port')
~~~

السطر الأول: الكود كمّل عادي و [[config]] فاضل [[undefined]]. والتاني: أول مكان حاول يقرا [[config.port]] وقع برسالة عن [[undefined]]، ومفيهاش أي كلمة عن JSON. السبب الحقيقي اتبلع.

---

## ٢. [[parseConfig]]: امسك، ضيف معلومة، وارمي

~~~text main.ts
function parseConfig(text: string): { port: number } {
  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error("config.json is not valid JSON", { cause: err });
  }
}
~~~

- [[JSON.parse(text)]]: بيحوّل نص JSON لـ object، ولو النص غلط بيرمي [[SyntaxError]].
- [[catch (err)]]: المرة دي ماسكين الخطأ في متغير اسمه [[err]].
- [[throw new Error("...", { cause: err })]]: خطأ جديد برسالة بتقول **إيه اللي فشل من وجهة نظرنا** (ملف الإعدادات بايظ)، والخطأ الأصلي محفوظ جواه في [[cause]] (موجود من ES2022، و Node 16.9 وما بعده).

لو الخطأ ده وصل للآخر من غير ما حد يمسكه، Node بيطبع الاتنين:

~~~text الناتج: parseConfig("{ port: 3000 }") من غير try
Error: config.json is not valid JSON
    ... 2 lines matching cause stack trace ...
  [cause]: SyntaxError: Expected property name or '}' in JSON at position 2 (line 1 column 3)
      at JSON.parse (<anonymous>)
~~~

رسالتنا فوق، والسبب الأصلي تحت في [[[cause]]] بالـ stack بتاعه. ومع JSON سليم ([[{"port": 3000}]]) الدالة رجّعت [[{ port: 3000 }]] عادي.

---

## ٣. المكان اللي فعلًا عارف يعمل حاجة

~~~text main.ts
try {
  parseConfig("{ port: 3000 }");
} catch (err) {
  const e = err as Error;
  console.log(e.message, "| cause:", (e.cause as Error).message);
}
~~~

- [[err as Error]]: نوع [[err]] في الـ catch هو [[unknown]] (أي حاجة ممكن تترمي)، فبنقول لـ TypeScript «اعتبره Error».
- [[e.cause as Error]]: نفس الكلام للـ cause، ونوعه [[unknown]] برضه.

~~~text الناتج: npx tsx main.ts
config.json is not valid JSON | cause: Expected property name or '}' in JSON at position 2 (line 1 column 3)
~~~

[[position 2]] يعني الحرف رقم ٢ من الصفر: [[{]] و مسافة وبعدين [[p]]. JSON كان مستني [["]] قبل اسم المفتاح.

---

## ٤. حل التمرين: ٣ قرارات

| القرار | الدالة في الحل | الـ catch بيعمل إيه |
|---|---|---|
| قيمة بديلة | [[readCachedTheme]] | [[console.warn]] وترجّع [["light"]] |
| تعالج خطأ متوقع | [[findCoupon]] | لو [["404"]] ترجّع [[null]]، أي حاجة تانية [[throw err]] |
| تشيل الـ catch | الدفع | مفيش catch، الخطأ يوصل للـ error middleware |

حاجات جديدة في الحل:

- [[JSON.parse(raw ?? "null")?.theme ?? "light"]]: لو [[raw]] بـ [[null]] نعمل parse لـ [["null"]]. و [[?.]] (optional chaining) بتقرا [[theme]] لو اللي قبلها مش [[null]]، غير كده بترجّع [[undefined]] من غير ما تقع. و [[?? "light"]] الافتراضي.
- [[err instanceof Error && err.message === "404"]]: بنفحص **نوع** الخطأ قبل ما نعالجه. ده الفرق بين المعالجة والبلع.
- [[throw err]]: أي خطأ تاني يطلع للي فوق زي ما هو.

~~~text الناتج: npx tsx sol.ts
bad theme cache, using default: Expected property name or '}' in JSON at position 1 (line 1 column 2)
light
discount: null
rethrown: ECONNRESET
~~~

الـ cache البايظ [[{broken]] اتسجّل كتحذير ورجع الافتراضي. والكوبون الغلط بقى «مفيش خصم». وانقطاع الشبكة ([[ECONNRESET]]) معدّاش كـ «كوبون غلط»، اترمى تاني ومسكه الـ [[.catch]] اللي برّه.

---

## الخلاصة

- [[catch {}]] بيخلي الكود يكمّل بداتا غلط، والخطأ يظهر بعدين في مكان ملوش علاقة.
- في كل catch قرار: تعالج (وتفحص النوع)، أو تضيف معلومة وترمي بـ [[cause]]، أو متعملش catch خالص.
- [[catch (e) { console.log(e) }]] لسه بلع: الكود بيكمّل كأن كل حاجة تمام.
- التجاهل المقصود يتكتب فوقه تعليق «ليه».`,
          lines: [
            "دالة بتقرا الإعدادات من نص.",
            "جرّب.",
            "لو الـ JSON سليم، رجّعه.",
            "لو باظ، امسك الخطأ...",
            "...وارمي خطأ جديد بيقول إيه اللي فشل من وجهة نظرنا، والأصلي جواه في [[cause]]، فمفيش حاجة ضاعت.",
            "قفلة الـ catch.",
            "قفلة الدالة.",
            "هنا بنجرّب JSON غلط (المفتاح من غير علامات تنصيص).",
            "النداء.",
            "هنا المكان اللي فعلًا عارف يعمل إيه بالخطأ.",
            "[[err]] نوعها [[unknown]]، فبنقول إنها Error.",
            "الرسالة بتاعتنا، وبعدها السبب الأصلي من [[JSON.parse]].",
            "قفلة."
          ],
          sol: R`كل catch فاضي هيطلع واحد من ٣ قرارات، وده شكلهم في الحل: (١) قيمة بديلة: cache أو localStorage بايظ، تسجّل [[console.warn]] وترجّع default، والناتج [[bad theme cache, using default: ...]] ثم [[light]]. (٢) تعالجه: خطأ متوقع ليه معنى (كوبون مش موجود يعني [[null]])، بس بتفحص نوعه وترمي أي حاجة تانية، فالناتج [[discount: null]] للـ 404 و [[rethrown: ECONNRESET]] لقطع الشبكة. (٣) تشيله: الـ catch كان بيخبّي فشل لازم يوقف العملية، زي فشل الدفع.

المقياس: بعد التمرين مفيش catch في المشروع من غير قرار من التلاتة، وكل واحد فوقه سطر «ليه».

الغلط الشائع: تحوّل [[catch {}]] لـ [[catch (e) { console.log(e) }]] وتعتبره خلص. ده لسه بلع: الكود بيكمّل كأن كل حاجة تمام، بس بقى فيه سطر في log محدش بيقراه. والغلط التاني إن الـ catch في (٢) يلقط كل حاجة من غير ما يفحص، فانقطاع النت يظهر للمستخدم «الكوبون غلط».`,
          solCode: R`// ١) أسجّل وأكمّل بقيمة بديلة: الـ cache مش ضروري، لو باظ نجيب من المصدر
function readCachedTheme(raw: string | null): string {
  try {
    return JSON.parse(raw ?? "null")?.theme ?? "light";
  } catch (err) {
    // ليه: localStorage ممكن يبقى فيه نسخة قديمة بايظة، والـ default كفاية
    console.warn("bad theme cache, using default:", (err as Error).message);
    return "light";
  }
}

// ٢) أعالجه: خطأ متوقع ليه معنى في البيزنس
async function findCoupon(code: string, load: (c: string) => Promise<number>): Promise<number | null> {
  try {
    return await load(code);
  } catch (err) {
    // ليه: الـ API بترجع 404 للكوبون الغلط، ودي مش مشكلة، ده «مفيش خصم»
    if (err instanceof Error && err.message === "404") return null;
    throw err; // أي حاجة تانية (شبكة، 500) مش شغلتي هنا
  }
}

// ٣) أشيل الـ catch خالص: كان بيبلع خطأ لازم يوقف العملية
// قبل: try { await chargeCard(order) } catch {}  ← الطلب بيتشحن من غير فلوس
// بعد: await chargeCard(order);  والـ error middleware هو اللي يرد

console.log(readCachedTheme("{broken"));
findCoupon("NOPE", async () => { throw new Error("404"); }).then((d) => console.log("discount:", d));
findCoupon("X", async () => { throw new Error("ECONNRESET"); }).catch((e) => console.log("rethrown:", e.message));`
        }
      ]
    }
]);
