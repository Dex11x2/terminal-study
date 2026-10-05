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

[[resolves]] و [[rejects]] بيستنوا الـ Promise ويطبّقوا الـ matcher على القيمة أو الخطأ، وبيرجعوا Promise، فلازم [[await]]. في vitest 5 لو نسيت الـ await الاختبار بيقع برسالة «Promise returned by expect(actual).rejects.toThrow() was not awaited». في jest والنسخ القديمة، ممكن يعدّي في صمت.

و [[.not]] قبل أي matcher بيعكسه.`,
            when: "toBe للأرقام والنصوص والـ boolean. toEqual لأي object أو array راجع من دالة. toMatchObject لما يهمك حقول معينة. toThrow لكود sync بيرمي، و rejects لأي async.",
            mistakes: R`[[expect(fn()).toThrow()]] من غير arrow، فالاختبار يقع بـ [[Error: qty must be positive]] نفسه وتفتكر إن الكود بايظ. وتنسى [[await]] قبل [[expect(...).rejects]] في jest فيعدّي دايمًا. و [[toEqual]] على object فيه [[Date]] أو id عشوائي، فيقع كل مرة: استخدم [[toMatchObject]] أو [[expect.any(String)]]. و [[toThrow()]] من غير رسالة، فيعدّي لو الكود رمى أي خطأ حتى TypeError من typo: حدد الرسالة.`
          },
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

من غير await (vitest 5): بيقع برسالة [[Promise returned by $__btexpect(actual).rejects.toThrow()$__bt was not awaited]]. vitest بيمسكها ليك. في jest أو vitest قديم، نفس الغلطة كانت ممكن تعدّي أخضر حتى لو الـ Promise اتحل بدل ما يترفض. فالعادة: أي [[resolves]] أو [[rejects]] قبله [[await]]، دايمًا.`,
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
            mistakes: R`متغير في الـ factory قبل ما يتعرّف (الـ hoisting). ومسار مختلف عن اللي الكود بيستخدمه ([["./payments"]] في الاختبار و [["@/lib/payments"]] في الكود)، فالـ mock مبيتطبقش والاختبار يكلم البوابة بجد. ومن غير mockReset، فـ [[toHaveBeenCalledTimes(1)]] يلاقي 3 من الاختبارات اللي فاتت. وتعمل mock لكل module في المشروع، فالاختبار بيعدّي والكود بايظ لأن كل حاجة حقيقية اتشالت: mock للحدود الخارجية بس (شبكة، وداتابيز، ووقت).`
          },
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
    },
    {
      t: "Git hooks: الفحص قبل كل commit",
      l: 2,
      n: "husky بيشغّل الفحص لوحده، و lint-staged على الملفات المتغيرة بس، و commitlint على الرسالة",
      items: [
        {
          cmd: "husky",
          title: "hooks تتفعّل عند أي حد يسطّب المشروع",
          desc: R`Git بيشغّل سكربتات اسمها hooks في لحظات معينة: قبل الـ commit، وبعد ما تكتب الرسالة، وقبل الـ push. المشكلة إن فولدر [[.git/hooks]] مبيترفعش.

husky بيحط الـ hooks في فولدر [[.husky]] جوه المشروع، وسكربت [[prepare]] بيفعّلهم أوتوماتيك بعد أي install.`,
          example: R`npm i -D husky
npx husky init
cat .husky/pre-commit
npm pkg get scripts.prepare
git config core.hooksPath`,
          try: R`في مشروع الـ lab اعمل [[husky init]]، واكتب في [[.husky/pre-commit]] سطر [[npm test]]، واعمل commit وشوف الاختبارات بتشتغل قبله.`,
          deep: {
            why: "لو الفحص معتمد إن كل واحد «يفتكر» يشغّل lint قبل الـ commit، محدش هيفتكر. الـ hook بيخلي الفحص يحصل لوحده، والـ commit يترفض لو فشل.",
            how: R`Git لما ييجي يعمل commit، بيدوّر في فولدر الـ hooks على ملف اسمه [[pre-commit]]. لو موجود يشغّله، ولو رجع exit code مش صفر الـ commit يتلغي. وفيه hooks تانية: [[commit-msg]] (بياخد ملف الرسالة)، و [[pre-push]].

الفولدر الافتراضي [[.git/hooks]]، وده جوه [[.git]] فمبيترفعش ولا بينزل مع clone. husky بيغيّر إعداد [[core.hooksPath]] يشاور على [[.husky/_]]، وجواه ملفات صغيرة بتنادي الـ hooks بتاعتك اللي في [[.husky/]]، ودي ملفات عادية في المشروع بتترفع.

[[husky init]] بيعمل تلات حاجات: فولدر [[.husky]]، وملف [[.husky/pre-commit]] فيه [[npm test]]، وسكربت [["prepare": "husky"]] في package.json.

و [[prepare]] سكربت خاص: npm و pnpm بيشغّلوه لوحدهم بعد [[install]]. فأي حد يعمل clone و install، الـ hooks تتفعّل عنده من غير ما يعمل حاجة. و [[git config core.hooksPath]] بيقولك اتفعّلت فعلًا ولا لأ (المفروض يطبع [[.husky/_]]).`,
            when: "أي مشروع فيه lint أو اختبارات، خصوصًا لو عليه أكتر من شخص.",
            mistakes: R`تسطّب husky ومتعملش install بعدها (أو عملته بـ [[--ignore-scripts]])، فـ prepare مشتغلش و [[core.hooksPath]] فاضي. وفي Docker بـ [[npm ci --omit=dev]]، الـ prepare بيحاول يشغّل husky وهو مش متسطّب فالـ install يقع: خلّي السكربت [[husky || true]]. ([[HUSKY=0]] بيقفل husky لو متسطّب، زي CI، بس مبيمنعش «husky: not found».) والـ hooks تبقى تقيلة (اختبارات المشروع كله قبل كل commit) فالناس تتخطّاها: خلّي pre-commit سريع (lint-staged)، والتقيل في pre-push أو CI.`
          },
          lines: [
            "سطّب husky كـ dev dependency.",
            "جهّز husky: فولدر .husky، و hook اسمه pre-commit، وسكربت prepare.",
            "شوف الـ hook هيشغّل إيه (أول مرة فيه npm test).",
            "اتأكد إن سكربت prepare اتضاف، وده اللي بيفعّل الـ hooks بعد كل install.",
            "اتأكد إن Git بقى بيدوّر على الـ hooks في .husky/_."
          ],
          sol: R`[[npx husky init]] بيعمل فولدر [[.husky]] فيه [[pre-commit]] وفولدر داخلي [[_]]، وبيضيف [["prepare": "husky"]] للـ scripts، وبيظبط [[git config core.hooksPath]] على [[.husky/_]]. و [[cat .husky/pre-commit]] بيطبع [[npm test]] جاهز (مش محتاج تكتبه).

لما تعمل commit، قبل الرسالة بتاعة git هتشوف [[> vitest run]] ونتيجة الاختبارات. ولو كسرت اختبار: [[husky - pre-commit script failed (code 1)]] والـ commit مش بيتعمل ([[git log]] زي ما هو).

لو الـ hook ما اشتغلش: [[git config core.hooksPath]] فاضي، يعني الـ init اتعمل في فولدر مش هو root الـ repo أو قبل [[git init]]. شغّل [[npm run prepare]]. ولو قال [[.git can't be found]] يبقى الفولدر مش git repo أصلًا.`
        },
        {
          cmd: ".husky/pre-commit و commit-msg",
          title: "ملفات الـ hooks نفسها",
          desc: R`كل hook ملف بالاسم بالظبط ([[pre-commit]] أو [[commit-msg]] أو [[pre-push]]) جوه [[.husky/]]، وفيه أوامر shell عادية.

لو الملف مش موجود، مفيش حاجة بتحصل ومفيش رسالة تقولك. فبعد الإعداد جرّب commit غلط واتأكد إنه اترفض.`,
          example: R`echo "npx lint-staged" > .husky/pre-commit
echo 'npx --no -- commitlint --edit "$1"' > .husky/commit-msg
echo "npm test" > .husky/pre-push
ls -la .husky
git add .husky
git commit --allow-empty -m "bad message"`,
          try: "اعمل الـ hooks التلاتة، وجرّب commit برسالة عشوائية: لازم يترفض. لو عدّى، فيه ملف ناقص.",
          deep: {
            why: "الـ hooks بتفشل بصمت. لو الملف مش موجود أو مكتوب غلط، Git بيعمل الـ commit عادي، وانت فاكر إن كل حاجة بتتفحص.",
            how: R`Git بيشغّل الملف اللي اسمه بالظبط زي الـ hook، من غير امتداد. [[pre-commit]] قبل ما يعمل الـ commit. [[commit-msg]] بعد ما تكتب الرسالة، وبيدّيله مسار ملف فيه الرسالة كأول argument، وده [["$1"]]. و [[pre-push]] قبل ما يرفع.

الملف بيتشغّل بـ sh حتى على ويندوز (Git for Windows جاي معاه sh). فالأوامر لازم تبقى shell، والملف لازم يبقى UTF-8 ونهاية سطوره LF.

[[npx --no -- commitlint]]: [[--no]] معناها «لو مش متسطّب متنزّلهوش من النت»، فلو حد نسي install يقع على طول بدل ما يستنى تحميل.

[[--allow-empty]] بيعمل commit من غير تعديلات، مفيد تجرّب بيه الـ hooks من غير ما تلمس ملفات. لو الـ commit عدّى برسالة زي [[bad message]]، يبقى [[commit-msg]] مش شغال.`,
            when: "مرة واحدة بعد husky init، ومع كل hook جديد. والتجربة بالـ commit الغلط بعد أي تعديل في الإعداد.",
            mistakes: R`في مشروع حقيقي كان husky و lint-staged و commitlint متسطّبين ومتظبطين، بس فولدر [[.husky]] مكانش فيه غير [[_]] (اللي husky بيولّده)، ومفيش [[pre-commit]] ولا [[commit-msg]]. يعني ولا hook اشتغل، والإعدادات كلها كانت ميتة ومحدش لاحظ. وكمان: لو كتبت الملف بـ [[echo >]] من Windows PowerShell 5.1، بيتحفظ UTF-16 والـ hook يبوظ بخطأ غريب، فاكتبه من Git Bash أو VS Code. ونسيان [[git add .husky]]، فالـ hooks شغالة عندك انت بس.`
          },
          lines: [
            "قبل كل commit: شغّل lint-staged على الملفات المتجهزة.",
            "بعد ما تكتب الرسالة: افحصها بـ commitlint. [[$1]] مسار ملف الرسالة.",
            "قبل كل push: شغّل الاختبارات.",
            "اتأكد إن الملفات موجودة فعلًا، مش فولدر _ لوحده.",
            "ضيفهم لـ Git عشان يوصلوا لباقي الفريق.",
            "جرّب commit برسالة غلط ومن غير تعديلات. المفروض يترفض."
          ],
          sol: R`[[git commit --allow-empty -m "bad message"]] بيترفض بـ:

[[✖ subject may not be empty [subject-empty]]] و [[✖ type may not be empty [type-empty]]] و [[found 2 problems, 0 warnings]]، وبعدها [[husky - commit-msg script failed (code 1)]]. الـ pre-commit قبلها بتقول [[lint-staged could not find any staged files.]] وتعدّي، لأن الـ commit فاضي.

لو الرسالة عدّت، دور على الناقص: غالبًا [[commitlint.config.js]] مش موجود (ساعتها commitlint بيقع بـ [[Please add rules to your commitlint.config.js]])، أو الباكدجات [[@commitlint/cli]] و [[@commitlint/config-conventional]] مش متسطبة. ولو الـ config بـ [[export default]] والمشروع مش [["type": "module"]] سمّيه [[commitlint.config.mjs]]. ولو [[ls -la .husky]] مفيهوش [[commit-msg]]، يبقى الـ echo اتعمل في فولدر تاني.`
        },
        {
          cmd: "lint-staged",
          title: "افحص الملفات المتغيرة بس",
          desc: R`lint-staged بياخد الملفات اللي عملتلها [[git add]] بس، ويشغّل عليها الأوامر حسب نوعها. فالـ pre-commit ياخد ثانيتين بدل دقيقة.

ولو [[--fix]] أو [[--write]] عدّلوا حاجة، التعديل بيدخل الـ commit لوحده.`,
          example: R`"lint-staged": {
  "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md,yml,yaml}": ["prettier --write"]
}`,
          try: R`بوّظ المسافات في ملفين، اعمل add لواحد بس وبعدين commit: هتلاقي prettier ظبط الملف اللي في الـ commit بس، والتاني زي ما هو.`,
          flag: "script",
          deep: {
            why: "eslint و prettier على المشروع كله ممكن ياخدوا دقيقة. لو كل commit بيستنى دقيقة، الناس هتتخطّى الـ hook. وكمان ملوش لازمة تفحص ملفات متلمستش.",
            how: R`لما [[npx lint-staged]] يشتغل (عادةً من [[.husky/pre-commit]]):

بيسأل Git عن الملفات المتجهزة (staged)، ويقارنها بالـ patterns: كل ملف [[.ts]] يروح للأوامر بتاعة [[*.{ts,tsx,js,jsx}]]. بيشغّل الأوامر بالترتيب، وبيحط أسماء الملفات في آخر كل أمر، فـ [[eslint --fix]] بيبقى فعليًا [[eslint --fix src/a.ts src/b.ts]].

قبل ما يبدأ بيعمل نسخة احتياطية (stash) من حالتك، ولو أي أمر فشل بيرجّع كل حاجة زي ما كانت والـ commit يتلغي. ولو نجح والأوامر عدّلت الملفات، بيعمل [[git add]] للتعديلات لوحده. والتعديلات اللي في نفس الملف ومش متجهزة (عملت add لجزء بس) بيحافظ عليها ومش بيدخّلها الـ commit.

الأوامر اللي بتقبل أسماء ملفات بس هي اللي تنفع هنا. [[tsc --noEmit]] بيفحص المشروع كله بـ tsconfig، ولو بعتّله ملفات بيتجاهل الـ tsconfig، فمكانه CI أو pre-push.`,
            when: "في pre-commit لأي مشروع فيه eslint أو prettier.",
            mistakes: R`تحط [[tsc]] أو [[vitest run]] في lint-staged، فيطلع خطأ غريب أو يتجاهل الإعدادات لأن الملفات اتبعتت كـ arguments. واعتبار lint-staged كفاية: هو بيفحص الملفات المتغيرة بس، فملف تاني اتكسر بسبب تعديلك مش هيبان. عشان كده CI لازم يفحص المشروع كله برضه.`
          },
          lines: [
            "الإعدادات في package.json تحت اسم lint-staged.",
            "ملفات الكود: صلّح بـ eslint وبعدين نسّق بـ prettier، على الملفات المتجهزة بس.",
            "باقي الملفات (JSON و Markdown و YAML): نسّقها بس.",
            "نهاية الإعدادات."
          ],
          sol: R`في التجربة: [[src/a.ts]] و [[src/b.ts]] الاتنين فيهم [[export const a=1]] من غير مسافات، و [[git add src/a.ts]] بس. الـ commit طبع [[✔ eslint --fix]] و [[✔ prettier --write]] و [[Done running tasks for staged files!]]، والـ commit اتعمل.

[[git show HEAD:src/a.ts]] بيطلّع [[export const a = 1;]] متنسّق. و [[cat src/b.ts]] لسه [[export const b=2]]، و [[git status]] بيوريه [[?? src/b.ts]]. ودي الفكرة: lint-staged بيلمس اللي في الـ commit بس، فمش بيقلب commit صغير لتعديل في مية ملف.

لو [[b.ts]] اتظبط كمان، يبقى الـ hook فيه [[prettier --write .]] بدل [[npx lint-staged]]. ولو eslint رجّع error مش قابل للإصلاح (زي متغير مش مستخدم)، lint-staged بيرجّع ملفاتك زي ما كانت والـ commit مش بيتعمل، ودا صح.`
        },
        {
          cmd: "commitlint",
          title: "رسالة الـ commit بصيغة ثابتة",
          desc: R`Conventional Commits صيغة للرسالة: [[type(scope): subject]]. الـ type من قايمة ثابتة ([[feat]] ميزة، و [[fix]] تصليح، و [[chore]] و [[docs]] و [[refactor]] و [[test]] و [[ci]])، والـ scope الجزء اللي اتغير.

commitlint بيرفض أي رسالة مش ماشية على الصيغة، من [[commit-msg]] hook.`,
          example: R`npm i -D @commitlint/cli @commitlint/config-conventional
echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
echo "fixed stuff" | npx commitlint
git commit -m "feat(cart): add coupon field"
git commit -m "fix(auth): refresh token before expiry"
git commit -m "chore(deps): bump vite"
git commit -m "feat(api)!: rename /users to /members"`,
          try: R`جرّب [[echo "update" | npx commitlint]] واقرا الأخطاء، وبعدين صلّح الرسالة لحد ما تعدّي.`,
          deep: {
            why: "[[git log]] مليان «update» و «fix» و «asdf» ملوش أي فايدة. بصيغة ثابتة، تقرا التاريخ بسرعة وتعرف كل commit بيعمل إيه من أول كلمة، وأدوات تقدر تطلّع changelog ورقم النسخة الجاية لوحدها.",
            how: R`الصيغة: [[type(scope): subject]]، وبعدها سطر فاضي، وبعدين body اختياري.

[[feat]] ميزة جديدة. [[fix]] تصليح bug. [[refactor]] تغيير في الكود من غير ما السلوك يتغير. [[docs]] توثيق. [[test]] اختبارات. [[chore]] صيانة (مكتبات، إعدادات). [[ci]] ملفات CI. [[style]] تنسيق بس.

و [[!]] بعد الـ type (أو سطر [[BREAKING CHANGE:]] في الـ body) معناها تغيير بيكسر الاستخدام القديم.

وده مش ديكور: أدوات زي semantic-release و changesets بتقرا التاريخ: [[fix]] يزوّد رقم الـ patch (من 1.2.3 لـ 1.2.4)، و [[feat]] الـ minor (لـ 1.3.0)، و [[!]] الـ major (لـ 2.0.0)، وبتكتب الـ changelog لوحدها.

commitlint بيقرا [[commitlint.config.js]]، و [[config-conventional]] فيها القواعد القياسية. وتقدر تقفل قاعدة: [[rules: { 'subject-case': [0] }]] (الصفر معناه off). ومن [[.husky/commit-msg]] بيقرا ملف الرسالة بـ [[--edit "$1"]]، ومن الترمنال تبعتله الرسالة بـ pipe تجرّب.`,
            when: "من أول commit في المشروع. ولو فريق، اكتبوا قايمة الـ scopes المسموحة في CONTRIBUTING أو في rules.",
            mistakes: R`تفعّل commitlint وتنسى ملف [[.husky/commit-msg]]، فمحدش بيتفحص (دي بالظبط المشكلة اللي في الدرس اللي فات). ورسالة أول commit بعد الإعداد نفسها لازم تعدّي: [[chore: add git hooks]] مش [[add hooks]]. وقاعدة [[subject-case]] الافتراضية بترفض subject مكتوب زي جملة بحرف كابيتال (Add coupon field)، فإما تكتب صغير أو تقفل القاعدة. ولو كتبت ملف الإعداد بـ echo من Windows PowerShell 5.1 بيتحفظ UTF-16 ومبيتقريش.`
          },
          lines: [
            "سطّب commitlint والقواعد القياسية.",
            "اعمل ملف الإعداد اللي بيقول استخدم Conventional Commits.",
            "جرّب رسالة من غير hook: هيرفضها ويقولك ليه.",
            "ميزة جديدة في جزء الـ cart.",
            "تصليح bug في جزء الـ auth.",
            "صيانة: تحديث مكتبة.",
            "[[!]] معناها تغيير بيكسر اللي بيستخدم الـ API القديم."
          ],
          sol: R`[[echo "update" | npx commitlint]] بيطلّع:

[[✖ subject may not be empty [subject-empty]]] و [[✖ type may not be empty [type-empty]]]. الكلمة لوحدها اتفهمت كأنها مش على الشكل [[type: subject]] خالص.

ومحاولة زي [[Fix: Update login.]] بتطلّع ٤ أخطاء: [[type must be lower-case]] و [[type must be one of [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test]]] و [[subject must not be sentence-case]] و [[subject may not end with full stop]]. الإصلاح: [[fix: update login]] أو أحسن [[fix(auth): refresh token before expiry]]، وساعتها commitlint مش بيطبع حاجة ويخرج بـ 0.

عشان تتأكد: [[echo $?]] بعد كل محاولة. الغلط الشائع إنك تنسى المسافة بعد النقطتين ([[fix:update]])، أو تكتب type مش في القايمة زي [[feature]] أو [[update]].`
        },
        {
          cmd: "HUSKY=0 و --no-verify",
          title: "تخطّى الـ hooks في الطوارئ",
          desc: R`[[--no-verify]] بيخلي Git ميشغّلش [[pre-commit]] و [[commit-msg]] للـ commit ده بس. و [[HUSKY=0]] بيقفل كل hooks husky للأمر ده، مفيد مع rebase اللي بيعمل commits كتير.

و [[HUSKY=2]] بيطبع كل سطر في الـ hook وهو بيتنفّذ، عشان تعرف بيقع فين.`,
          example: R`git commit --no-verify -m "wip: save before switching"
HUSKY=0 git commit -m "wip"
HUSKY=0 git rebase -i HEAD~5
HUSKY=2 git commit -m "fix: debug hook"
git push --no-verify`,
          try: R`اعمل pre-commit بيقع دايمًا ([[exit 1]])، وجرّب commit عادي (هيترفض)، وبعدين بـ [[--no-verify]]، وبعدين بـ [[HUSKY=2]] وشوف السطور بتتطبع.`,
          deep: {
            why: "مرات محتاج تحفظ شغل نص نص بسرعة قبل ما تنقل branch، أو rebase بيعيد عشرين commit وكل واحد بيشغّل lint. ومرات الـ hook نفسه بايظ ومش عارف ليه.",
            how: R`[[--no-verify]] فلاج في Git نفسه، فبيشتغل مع أي hooks مش husky بس. في [[commit]] بيتخطّى [[pre-commit]] و [[commit-msg]]، وفي [[push]] بيتخطّى [[pre-push]].

[[HUSKY=0]] متغير بيئة husky بيقراه في أول كل hook ويخرج على طول. ميزته إنه بيغطّي أي أمر Git بيعمل commits كتير (rebase و cherry-pick و merge). والشكل [[VAR=value command]] بتاع bash و Git Bash. في PowerShell: [[$env:HUSKY=0]] وبعدين الأمر، وبعدها رجّعه.

[[HUSKY=2]] بيشغّل الـ hook بـ [[sh -x]]، فكل سطر بيتطبع قبل ما يتنفّذ.

والمهم: التخطّي على جهازك بس. الـ CI بيشغّل نفس الفحوصات على المشروع كله، فاللي هربت منه هنا هيقع هناك.`,
            when: "commit مؤقت (wip) هتعمله squash بعدين. rebase طويل. hook بايظ وعايز تصلّحه. مش عشان «الـ lint زهّقني».",
            mistakes: R`تتعوّد على [[--no-verify]] فالـ hooks تبقى ملهاش لازمة، والـ CI يقع بعد ما رفعت. و [[$env:HUSKY=0]] في PowerShell وتنسى ترجّعه، فالـ hooks تفضل مقفولة لحد ما تقفل الترمنال.`
          },
          lines: [
            "commit من غير pre-commit و commit-msg، للمرة دي بس.",
            "نفس الفكرة بمتغير husky (bash و Git Bash).",
            "rebase طويل من غير ما كل commit يشغّل الـ hooks.",
            "شغّل الـ hook واطبع كل سطر فيه عشان تعرف بيقع فين.",
            "push من غير pre-push."
          ],
          sol: R`مع [[.husky/pre-commit]] فيه [[echo "pre-commit: blocked"; exit 1]]:

الـ commit العادي: [[pre-commit: blocked]] و [[husky - pre-commit script failed (code 1)]] ومفيش commit. بـ [[--no-verify]]: الـ commit اتعمل على طول، والـ hook ما اشتغلش خالص (مفيش blocked). بـ [[HUSKY=2]]: husky بيطبع كل سطر بينفّذه بـ [[+]] قبله، زي [[+ sh -e .husky/pre-commit]] و [[+ c=1]] و [[+ echo husky - pre-commit script failed (code 1)]]، فتشوف الـ PATH اللي استخدمه والـ exit code، والـ commit برضه بيترفض.

وخلي بالك إن [[HUSKY=0]] و [[--no-verify]] بيعدّوا كل الـ hooks، ومنهم [[commit-msg]]: جرّبت [[HUSKY=0 git commit -m "anything"]] واتقبلت رغم إنها مش conventional. عشان كده الـ CI لازم يعيد نفس الفحوص، الـ hooks سهل تتعدّى. ورجّع الـ pre-commit الأصلي بعد التجربة.`
        }
      ]
    },
    {
      t: "CI والـ monorepo",
      l: 3,
      n: "نفس الفحوصات على كل PR، بالترتيب الصح، على كل الباكدجات، وبسرعة",
      items: [
        {
          cmd: "ترتيب الفحص في CI",
          title: "كل الفحوصات على كل PR بالترتيب",
          desc: R`workflow واحد بيشغّل الفحوصات بالترتيب: الشكل، وبعدين lint، وبعدين الأنواع، وبعدين الاختبارات، وبعدين build. كل خطوة أرخص وأسرع من اللي بعدها، فالغلط البسيط يقع في ثواني بدل ما تستنى الاختبارات.

و [[pull_request]] من غير branches معناها أي PR على أي branch يتفحص.`,
          example: R`name: CI
on:
  push:
    branches: [main]
  pull_request:
concurrency:
  group: ci-$__{{ github.ref }}
  cancel-in-progress: true
permissions:
  contents: read
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: pnpm/action-setup@v6
      - uses: actions/setup-node@v7
        with:
          node-version: 24
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm format:check
      - run: pnpm lint
      - run: pnpm typecheck
      - run: pnpm test
      - run: pnpm build`,
          try: "حط الملف في repo التجربة، واعمل PR فيه ملف مش متنسّق، وشوف إنه وقع في خطوة format في ثواني من غير ما يوصل للاختبارات.",
          flag: "script",
          deep: {
            why: "الـ hooks على جهازك ممكن تتخطّى، أو حد ميكونش عمل install، أو lint-staged فحص الملفات المتغيرة بس. CI هو الحارس الأخير: بيفحص المشروع كله على ماكينة نضيفة، والـ PR ميدخلش main إلا وهو أخضر.",
            how: R`الترتيب مقصود. prettier بياخد ثواني، و eslint أقل من دقيقة، و tsc حوالي دقيقة، والاختبارات ممكن دقايق، والـ build الأتقل. أي خطوة تقع، اللي بعدها مبتشتغلش، فالفشل الرخيص بيبان بسرعة ومبتضيّعش دقايق Actions.

وكل خطوة بتنادي سكربت من package.json ([[pnpm lint]])، مش الأمر نفسه. فالأمر مكتوب في مكان واحد، وهو هو اللي بتشغّله على جهازك. وفي monorepo السكربتات دي في الجذر بتنادي [[pnpm -r]] (الدرس الجاي)، فالـ CI مش محتاج يعرف أسماء الباكدجات.

[[pnpm/action-setup]] بيسطّب pnpm بالنسخة اللي في حقل [[packageManager]] في package.json، ولازم ييجي قبل [[setup-node]] عشان [[cache: pnpm]] محتاج pnpm موجود. و [[--frozen-lockfile]] بيرفض يعدّل [[pnpm-lock.yaml]]: لو package.json اتغير والـ lock لأ، يقع، بدل ما يسطّب نسخ مختلفة عن اللي عندك.

[[concurrency]] بيلغي الـ run القديم لو عملت push جديد على نفس الـ branch، و [[permissions]] بيدّي الـ job أقل صلاحية محتاجها. (الاتنين مشروحين في تاب GitHub Actions.)`,
            when: "أي repo عليه أكتر من شخص أو فيه deploy أوتوماتيك. وخلّي الـ PR ميتدمجش غير لما CI يبقى أخضر (branch protection من إعدادات GitHub).",
            mistakes: R`في مشروع حقيقي كان [[pnpm/action-setup]] مكتوب فيه [[version: 10]] وكمان [[packageManager]] في package.json، ولو الاتنين اختلفوا الـ action بيقع: سيب واحد بس، والأحسن packageManager. ونفس المشروع كان الـ CONTRIBUTING فيه إن الـ PRs بتروح لـ dev، والـ CI شغال على PRs لـ main بس، فكل PRs الـ dev كانت بتدخل من غير فحص، ومكانش فيه concurrency ولا permissions. وفي مشروع تاني [[setup-node]] من غير [[cache: pnpm]]، فكل run بينزّل المكتبات من الأول.`
          },
          lines: [
            "اسم الـ workflow.",
            "بيشتغل إمتى:",
            "مع كل push...",
            "...على main.",
            "ومع أي PR على أي branch.",
            "لو جه push جديد...",
            "...على نفس الـ branch (المجموعة باسم الـ ref)...",
            "...الغي الـ run القديم.",
            "صلاحيات الـ token:",
            "قراية الكود بس.",
            "المهام.",
            "مهمة واحدة اسمها quality.",
            "على ماكينة أوبونتو نضيفة.",
            "الخطوات بالترتيب، وأي واحدة تقع بتوقف اللي بعدها.",
            "هات الكود.",
            "سطّب pnpm بالنسخة اللي في packageManager. لازم قبل setup-node.",
            "سطّب Node...",
            "بالإعدادات دي:",
            "نسخة 24.",
            "وكاش لمكتبات pnpm بين الـ runs.",
            "سطّب بالظبط اللي في الـ lock، ويقع لو الـ lock مش متحدّث.",
            "الشكل (prettier --check): ثواني.",
            "eslint على المشروع كله، وأي warning يوقّع.",
            "الأنواع (tsc --noEmit).",
            "الاختبارات مرة واحدة.",
            "الـ build في الآخر لأنه الأتقل."
          ],
          sol: R`في الـ PR اللي فيه ملف مش متنسّق، الـ job [[quality]] بيقع في step [[Run pnpm format:check]] بعد ثواني من [[pnpm install]]، واللوج فيه [[[warn] src/x.ts]] و [[Code style issues found in the above file.]] و [[Process completed with exit code 1.]]. الـ steps اللي بعدها (lint و typecheck و test و build) بتظهر رمادي، ما اشتغلتش. والـ PR عليه X أحمر جنب [[CI / quality]].

الفكرة: الأسرع والأرخص الأول. مفيش داعي تستنى الـ build دقيقتين عشان تعرف إن فيه مسافة غلط.

مشاكل هتقابلها أول مرة: [[pnpm/action-setup]] بيقع بـ error إنه مش لاقي نسخة pnpm لو package.json مفيهوش [["packageManager": "pnpm@..."]] ولا [[with: version]]. و [[--frozen-lockfile]] بيقع لو [[pnpm-lock.yaml]] مش متحدّث مع package.json، ودا مقصود. والملف نفسه تقدر تفحصه قبل الـ push بـ [[actionlint]]. ولو الـ PR ما شغّلش الـ workflow خالص، الملف مش على الـ branch أو [[pull_request]] ناقصة.`
        },
        {
          cmd: "pnpm -r و --filter",
          title: "شغّل الفحص على كل الباكدجات أو بعضها",
          desc: R`في monorepo (apps/web و apps/api و packages/shared)، [[pnpm -r run X]] بيشغّل السكربت X في كل باكدج عنده، بترتيب الاعتماد.

و [[--filter]] بيحدد مين: باكدج بالاسم، أو فولدر، أو «اللي اتغير من main بس».`,
          example: R`pnpm -r run typecheck
pnpm -r --if-present run test
pnpm --filter @myapp/web run lint
pnpm --filter "./apps/**" run build
pnpm --filter "...[origin/main]" run test
pnpm --filter @myapp/web... run build
npm run test --workspaces --if-present`,
          try: R`في monorepo تجربة فيه باكدجين، عدّل واحد بس واعمل commit، وشغّل [[pnpm --filter "...[HEAD~1]" run test]] ولاحظ مين اتشغّل.`,
          deep: {
            why: "lint و tsc والاختبارات كل باكدج ليه بتوعه (tsconfig مختلف، و eslint مختلف). في CI محتاج تشغّلهم كلهم بأمر واحد، وعلى جهازك محتاج تشغّل اللي بتشتغل فيه بس.",
            how: R`pnpm بيعرف الباكدجات من [[pnpm-workspace.yaml]] (مثلًا [[apps/*]] و [[packages/*]]).

[[-r]] (recursive) بيلف على كل الباكدجات ويشغّل السكربت في كل واحد عنده. والترتيب topological: لو web بيعتمد على shared، shared بيخلص الأول، ودي مهمة للـ build. والباكدجات المستقلة بتشتغل بالتوازي.

[[--filter]] بيختار:
[[--filter @myapp/web]] باكدج بالاسم (الاسم اللي في package.json بتاعه، مش اسم الفولدر).
[[--filter "./apps/**"]] كل اللي تحت فولدر.
[[--filter @myapp/web...]] الباكدج ده وكل اللي هو معتمد عليه (عشان تبني shared قبل web).
[[--filter "...[origin/main]"]] الباكدجات اللي فيها ملفات اتغيرت من main، ومعاها كل اللي بيعتمد عليها. ده اللي بيخلي CI في monorepo كبير سريع: عدّلت shared؟ اختبر shared و web و api. عدّلت web بس؟ web بس.

والشكل المعتاد: السكربتات في package.json الجذر تبقى [["typecheck": "pnpm -r run typecheck"]]، فانت و CI بتكتبوا [[pnpm typecheck]] وخلاص.

و npm workspaces فيه نفس الفكرة بـ [[--workspaces]] و [[-w]] (في تاب Node).`,
            when: "أي monorepo. [[-r]] في CI وفي سكربتات الجذر. [[--filter]] على جهازك وانت شغال في تطبيق واحد، وفي CI لو المشروع كبر والفحص الكامل بقى بطيء.",
            mistakes: R`[["...[origin/main]"]] في CI من غير ما الـ checkout يجيب التاريخ: [[actions/checkout]] افتراضيًا بيجيب آخر commit بس، فـ pnpm ميلاقيش origin/main، فمحتاج [[fetch-depth: 0]]. وتنسى إن [[-r]] مبيشغّلش سكربت الجذر نفسه. وباكدج جديدة ملهاش سكربت typecheck، فمحدش بيفحصها وانت فاكر إن [[-r]] غطّى الكل.`
          },
          lines: [
            "شغّل typecheck في كل باكدج عنده السكربت ده، بترتيب الاعتماد.",
            "test في كل باكدج، ومتقعش لو مفيش ولا واحد عنده السكربت.",
            "lint في باكدج web بس، بالاسم اللي في package.json بتاعها.",
            "build لكل الباكدجات اللي تحت apps.",
            "الاختبارات للباكدجات اللي اتغيرت من main واللي بيعتمد عليها بس.",
            "ابني web ومعاها كل الباكدجات اللي هي معتمدة عليها.",
            "نفس فكرة [[-r]] في npm workspaces."
          ],
          sol: R`في monorepo فيه [[@myapp/web]] و [[@myapp/api]]، وعدّلت web بس: [[pnpm --filter "...[HEAD~1]" run test]] شغّل [[testing web]] بس، و [[pnpm -r run test]] شغّل الاتنين.

بعد ما خليت api يعتمد على web ([["@myapp/web": "workspace:*"]]) وعدّلت web تاني: نفس الأمر شغّل web و api الاتنين، لأن الـ [[...]] قبل القوس معناها «واللي بيعتمدوا عليه». أما [[--filter "[HEAD~1]"]] من غير النقط شغّل web بس. دا الفرق اللي بيحميك: تغيير في باكدج مشتركة لازم يختبر التطبيقات اللي بتستخدمها.

لو ما اشتغلش حاجة خالص ([[No projects matched the filters]])، يبقى التعديل لسه مش في commit (الفلتر بيقارن commits) أو الملف اللي عدلته بره أي باكدج. ولو كل حاجة اشتغلت، اتأكد إنك كتبت الـ filter بين علامات تنصيص عشان الـ shell ما يلعبش في الأقواس.`
        },
        {
          cmd: "git diff --exit-code",
          title: "اتأكد إن الملفات المتولّدة متحدّثة",
          desc: R`فيه ملفات بتتولّد بأمر ومحفوظة في Git: types الداتابيز، أو client الـ API. لو حد غيّر المصدر ونسي يولّد تاني، الملف المحفوظ بيبقى كدّاب.

في CI بتولّد تاني وتقول [[git diff --exit-code]]: لو فيه أي فرق، يرجع 1 والـ CI يقع.`,
          example: R`supabase gen types typescript --project-id "$PROJECT_REF" > lib/database.types.ts
git diff --exit-code lib/database.types.ts
git diff --exit-code --stat
git status --porcelain
test -z "$(git status --porcelain)" || { git status --short; exit 1; }`,
          try: R`في repo التجربة عدّل ملف متابَع وشغّل [[git diff --exit-code; echo $?]]: هيطبع 1. رجّعه بـ [[git restore]] وجرّب تاني: 0.`,
          deep: {
            why: "مثال: [[database.types.ts]] متولّد من الداتابيز. حد ضاف عمود بـ migration ومعملش gen types، فالكود بيستخدم types قديمة، و tsc بيعدّي لأن الملف القديم متسق مع نفسه، والغلط يبان في الإنتاج. الفحص ده بيمسك «نسيت تولّد».",
            how: R`[[git diff]] عادةً بيطبع الفرق ويرجع 0 دايمًا. [[--exit-code]] بيخليه يرجع 1 لو فيه أي فرق، فيبقى شرط في سكربت أو CI. (و [[--quiet]] نفس الحاجة من غير طباعة.)

الفكرة: CI عنده نسخة نضيفة من الـ repo. بيشغّل نفس أمر التوليد اللي المفروض انت شغّلته. لو الناتج نفس الملف المحفوظ بالظبط، [[git diff]] فاضي والخطوة تعدّي. لو مختلف، يطبع الفرق (فتعرف إيه اللي ناقص) ويقع.

بس خد بالك: [[git diff]] بيشوف الملفات المتابعة بس. لو التوليد عمل ملف جديد خالص، مش هيبان. [[git status --porcelain]] بيطبع أي تغيير بما فيه الملفات الجديدة، بشكل ثابت معمول للسكربتات، و [[test -z]] بيتأكد إنه فاضي.

ونفس الفكرة تنفع لأي حاجة بتتولّد: types من الداتابيز، و client من OpenAPI، وحتى [[prettier --write]] في CI (لو غيّر حاجة يبقى حد مشغّلهوش). والـ lock ليه فحصه الخاص: [[--frozen-lockfile]].`,
            when: "أي ملف متولّد ومحفوظ في Git. في CI بعد خطوة التوليد، أو في pre-push.",
            mistakes: R`الناتج يطلع مختلف بين جهازك و CI لأسباب ملهاش دعوة بالمحتوى: نسخة CLI مختلفة بتطبع بترتيب مختلف، أو CRLF على ويندوز. ثبّت نسخة الأداة، وخلّي الملف LF ([[.gitattributes]]). وتولّد من الداتابيز البعيدة في CI فتحتاج توكن ([[SUPABASE_ACCESS_TOKEN]] في secrets)، والأسهل تولّد من داتابيز محلية فيها نفس الـ migrations ([[--local]]). وتنسى إن [[git diff]] مبيشوفش الملفات الجديدة.`
          },
          lines: [
            "ولّد الـ types من الداتابيز واكتبها فوق الملف المحفوظ.",
            "لو الملف اختلف عن اللي في Git، اطبع الفرق وارجع 1.",
            "نفسه للمشروع كله، بس اطبع أسماء الملفات وعدد السطور.",
            "كل التغييرات حتى الملفات الجديدة، بشكل ثابت للسكربتات.",
            "لو فيه أي تغيير، اعرضه واقفل بفشل."
          ],
          sol: R`بعد ما تعدّل ملف متابَع: [[git diff --exit-code; echo $?]] بيطبع الـ diff وبعده [[1]]. بعد [[git restore الملف]]: مفيش diff، و [[0]].

دي كل الفكرة في CI: الـ exit code غير صفر بيوقف الـ step لوحده، فمش محتاج if.

خلي بالك من حالتين: ملف جديد مش متضاف في git مش بيظهر في [[git diff]] خالص (هيطلع 0)، فعشان كده آخر سطر في المثال بيستخدم [[git status --porcelain]] اللي بيوريه بـ [[??]]. وتعديل عملت له [[git add]] مش بيظهر في [[git diff]] من غير [[--cached]]. لو عايز الاتنين: [[git diff HEAD --exit-code]].`,
          solCode: R`echo "// changed" >> src/sum.ts
git diff --exit-code; echo $?
git restore src/sum.ts
git diff --exit-code; echo $?`
        },
        {
          cmd: "فحص أسرع",
          title: "خلّي الفحص ياخد ثواني مش دقايق",
          desc: R`كل أداة فيها كاش: [[eslint --cache]] و [[prettier --cache]] بيتخطّوا الملفات اللي متغيرتش من آخر مرة، و [[tsc --incremental]] بيفتكر اللي فحصه. و vitest بيقدر يشغّل الاختبارات اللي ليها علاقة بالملفات المتغيرة بس.

والفحص السريع هو اللي الناس بتسيبه شغال.`,
          example: R`npx eslint . --cache --cache-location node_modules/.cache/eslint/
npx prettier --check . --cache
npx tsc --noEmit --incremental --tsBuildInfoFile node_modules/.cache/tsbuildinfo
npx vitest run --changed origin/main
npx vitest related src/cart/total.ts --run
time npm run check`,
          try: R`شغّل [[time npx eslint .]] مرتين، وبعدين بـ [[--cache]] مرتين، وقارن المرة التانية في الحالتين.`,
          deep: {
            why: "لما [[npm run check]] ياخد ٣ دقايق، محدش بيشغّله قبل الـ push، والـ hooks بتتخطّى، و CI بيبقى أول مكان الغلط بيبان فيه. كل ثانية بتوفّرها بتخلي الفحص يحصل فعلًا.",
            how: R`الكاش في الأدوات دي نفس الفكرة: بيحفظ بصمة كل ملف (hash أو وقت التعديل) ونتيجته. المرة الجاية، الملف اللي بصمته متغيرتش ياخد النتيجة القديمة من غير فحص. في مشروع فيه ألف ملف وانت عدّلت ٣، الفرق ضخم.

[[eslint --cache]] بيكتب ملف الكاش في [[.eslintcache]] أو المكان اللي تحدده بـ [[--cache-location]]. و [[prettier --cache]] بيحفظ في [[node_modules/.cache/prettier]].

[[tsc --incremental]] بيكتب ملف [[.tsbuildinfo]] فيه شجرة الاعتماد بين الملفات، فالمرة الجاية بيفحص الملفات اللي اتغيرت واللي بتعتمد عليها بس.

[[vitest run --changed origin/main]] بيشغّل الاختبارات اللي بتستورد (مباشر أو بالتسلسل) ملفات اتغيرت من main. و [[vitest related file]] نفس الفكرة لملف معين، ومن غير [[--run]] بيقعد watch.

الكاش في [[node_modules/.cache]] عشان يبقى متجاهَل في Git من غير إعداد زيادة. وفي CI تقدر تحفظ الفولدر ده بين الـ runs بـ [[actions/cache]].

وباقي السرعة من التنظيم: الخطوات الرخيصة الأول، و lint-staged قبل الـ commit بدل المشروع كله، والتقيل (الاختبارات الكاملة و e2e) في CI أو pre-push.`,
            when: "أول ما الفحص يعدّي ٢٠ أو ٣٠ ثانية على جهازك. و [[--changed]] في CI للـ PRs في مشروع كبير، مع فحص كامل على main.",
            mistakes: R`ملف كاش جوه المشروع ومش في [[.gitignore]] فيدخل commit (زي [[.eslintcache]]). و [[vitest --changed]] كفحص وحيد: اختبار بيعتمد على ملف JSON أو على الداتابيز مش هيتحسب «متأثر» ومش هيتشغّل، فخلّي فحص كامل على main أو كل ليلة. و [[--changed origin/main]] في CI من غير [[fetch-depth: 0]]، فمفيش origin/main أصلًا.`
          },
          lines: [
            "lint بكاش: الملفات اللي متغيرتش مش بتتفحص تاني.",
            "نفسه لـ prettier.",
            "tsc يفتكر اللي فحصه في ملف، ويفحص المتغير واللي بيعتمد عليه بس.",
            "الاختبارات اللي ليها علاقة بملفات اتغيرت من main بس.",
            "الاختبارات اللي بتلمس الملف ده، مرة واحدة من غير watch.",
            "قيس الفحص كله بياخد كام ثانية."
          ],
          sol: R`على مشروع صغير الفرق صغير: عندي [[npx eslint .]] أخد 1394ms و 1356ms، و [[--cache]] أخد 1284ms أول مرة و 1029ms التانية. أغلب الوقت هنا تشغيل Node وتحميل الـ config، مش فحص الملفات. و [[--cache]] عمل ملف [[.eslintcache]] في root المشروع (حطه في [[.gitignore]]، أو استخدم [[--cache-location]] زي المثال).

على مشروع حقيقي فيه مئات الملفات، وخصوصًا مع قواعد typescript-eslint اللي محتاجة الأنواع، المرة التانية بـ cache بتنزل من ثواني كتير لثانية أو اتنين، لأن ESLint بيفحص الملفات اللي اتغيرت بس.

الأخطاء الشائعة: تقارن أول مرة بـ cache بأول مرة من غيره فمتلاقيش فرق، لأن الـ cache بيتبني في الأولى. أو تعمل cache في CI من غير ما تحفظ الفولدر بين الـ runs ([[actions/cache]])، فكل run بيبدأ من الصفر.`
        }
      ]
    }
]);
