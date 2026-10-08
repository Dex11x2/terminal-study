// تكملة تاب swift: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/swift/01.js (شرح حقول الدرس في أوله)
MORE("swift", [
    {
      t: "الشروط والـ loops والدوال",
      l: 1,
      n: "if و guard، و switch بالـ pattern matching، و for و ranges، والدوال بالـ argument labels و inout",
      items: [
        {
          cmd: "if و guard",
          title: "if و else في Swift، و guard اللي بيخرج بدري لو الشرط مش متحقق",
          desc: R`[[if]] زي أي لغة، بس من غير أقواس حوالين الشرط، والأقواس المعووجة [[{ }]] إجبارية حتى لو سطر واحد. والشرط لازم يبقى [[Bool]] فعلًا: [[if count]] و count رقم = خطأ (مفيش truthy و falsy زي JS).

[[guard]] عكس [[if]] في الشكل: [[guard شرط else { اخرج }]]. يعني «لازم الشرط ده يبقى صح، ولو مش صح اخرج من هنا». والـ [[else]] لازم يخرج فعلًا: [[return]] أو [[throw]] أو [[break]] أو [[continue]]، والـ compiler بيتأكد من ده.

ليه guard؟ عشان تكتب «الحالات الغلط» فوق وتخرج بدري (early exit)، والكود المهم يفضل على الشمال من غير ما يتدفن جوه if جوه if. هتشوفه أكتر مع الـ optionals في [[guard let]].

ومن Swift 5.9، [[if]] و [[switch]] ينفع يبقوا expression يرجّعوا قيمة: [[let x = if cond { "a" } else { "b" }]].`,
          example: R`func checkOrder(quantity: Int, inStock: Int) -> String {
  // guard: لو الكمية غلط اخرج على طول
  guard quantity > 0 else {
    return "الكمية لازم تبقى أكبر من صفر"
  }
  guard quantity <= inStock else {
    return "المتاح \(inStock) بس"
  }
  if quantity >= 10 {
    return "تمام، وليك خصم جملة"
  } else if quantity >= 5 {
    return "تمام، وليك شحن مجاني"
  } else {
    return "تمام"
  }
}
print(checkOrder(quantity: 0, inStock: 20))
print(checkOrder(quantity: 7, inStock: 20))
print(checkOrder(quantity: 30, inStock: 20))
// if كـ expression بترجّع قيمة
let stock = 3
let badge = if stock == 0 { "خلصان" } else if stock < 5 { "قرب يخلص" } else { "متاح" }
print(badge)`,
          try: R`احذف [[return]] من جوه أول [[guard]] (سيب الـ else فاضي) وشوف الـ compiler بيقول إيه. وبعدين اكتب دالة [[canVote(age: Int) -> Bool]] فيها [[guard]] بيرفض السن السالب.`,
          flag: "script",
          deep: {
            why: R`الـ pyramid of doom (if جوه if جوه if) بيصعّب القراية. مع [[guard]] كل شرط لازم بيتكتب في سطر وبيخرج لو مش متحقق، والقارئ بيعرف إن أي حاجة تحت الـ guards دي الشروط بتاعتها متحققة.`,
            how: R`الـ compiler بيعمل تحليل: لو [[else]] بتاع [[guard]] ممكن يكمّل لتحت من غير خروج، ده خطأ compile ([['guard' body must not fall through]]). وده ضمان حقيقي مش مجرد style.

الـ [[if]] expression: كل فرع لازم يرجّع قيمة من نفس النوع، ولازم يبقى فيه [[else]] في الآخر.`,
            when: R`[[guard]] في أول الدالة للـ validation والـ preconditions، و [[if]] للتفرع العادي في النص. ولو بتقارن قيمة واحدة بحالات كتير [[switch]] أحسن (الدرس الجاي).`,
            mistakes: R`تكتب [[guard]] بشرط معكوس في دماغك: [[guard x > 0]] معناها «لازم x أكبر من صفر» مش «لو x أكبر من صفر اخرج». وتنسى إن [[else]] بتاع guard لازم يخرج. وتحط أقواس حوالين الشرط بحكم العادة: شغالة بس مش style Swift.`
          },
          teach: R`## البرنامج بيعمل إيه؟

دالة بتراجع طلب شراء: ترفض الكمية الغلط والكمية الأكبر من المخزون بـ [[guard]]، وبعدين تختار رسالة بـ [[if]]. وفي الآخر [[if]] بيرجّع قيمة على طول. الناتج من [[swift main.swift]] على Swift 6.4 في Docker.

---

## ١. توقيع الدالة

~~~swift
func checkOrder(quantity: Int, inStock: Int) -> String {
~~~

- [[func]] بتعرّف دالة، واسمها [[checkOrder]].
- جوه القوسين parameters: كل واحد [[الاسم: النوع]].
- [[-> String]]: السهم معناه «بترجّع»، والدالة دي بترجّع نص. (الدوال ليها درس كامل).

---

## ٢. أول [[guard]]

~~~swift
  guard quantity > 0 else {
    return "الكمية لازم تبقى أكبر من صفر"
  }
~~~

اقراها كده: «**لازم** [[quantity > 0]]، **وإلا** نفّذ اللي في [[else]]».
- لو الشرط صح: Swift بتعدّي البلوك كله وتكمّل تحت.
- لو غلط: تدخل [[else]]، و [[return]] بيرجّع الرسالة ويخرج من الدالة فورًا.

والـ [[else]] إجباري، ولازم يخرج. شلنا [[return]] (التجربة):

~~~text الناتج
main.swift:4:3: error: 'guard' body must not fall through, consider using a 'return' or 'throw' to exit the scope
~~~

fall through يعني «يكمّل لتحت». الـ compiler بيرفض لأن الكود اللي تحت الـ guard مكتوب على أساس إن الشرط متحقق.

---

## ٣. تاني [[guard]] و interpolation

~~~swift
  guard quantity <= inStock else {
    return "المتاح \(inStock) بس"
  }
~~~

[[<=]] «أصغر من أو يساوي». ولو الكمية أكبر من المخزون بنرجّع رسالة فيها الرقم بـ [[\(inStock)]].

---

## ٤. [[if]] / [[else if]] / [[else]]

~~~swift
  if quantity >= 10 {
    return "تمام، وليك خصم جملة"
  } else if quantity >= 5 {
    return "تمام، وليك شحن مجاني"
  } else {
    return "تمام"
  }
~~~

- مفيش أقواس حوالين الشرط، والـ [[{ }]] إجبارية.
- الشروط بتتجرب بالترتيب، وأول واحد صح بيتنفذ والباقي يتساب. عشان كده [[>= 10]] الأول: لو بدأنا بـ [[>= 5]] كان الـ 30 هيدخله.
- الوصول هنا معناه إن الـ guards الاتنين عدّوا.

---

## ٥. النداءات التلاتة

~~~swift
print(checkOrder(quantity: 0, inStock: 20))
print(checkOrder(quantity: 7, inStock: 20))
print(checkOrder(quantity: 30, inStock: 20))
~~~

| النداء | وقف فين | الرسالة |
|---|---|---|
| 0 | أول guard (0 مش أكبر من 0) | الكمية لازم تبقى أكبر من صفر |
| 7 | عدّى الـ guards، [[else if]] (7 ≥ 5) | تمام، وليك شحن مجاني |
| 30 | تاني guard (30 > 20) | المتاح 20 بس |

---

## ٦. [[if]] كـ expression

~~~swift
let stock = 3
let badge = if stock == 0 { "خلصان" } else if stock < 5 { "قرب يخلص" } else { "متاح" }
print(badge)
~~~

من Swift 5.9: الـ [[if]] نفسه بيطلّع قيمة، فبنحطها في [[badge]] على طول. كل فرع فيه قيمة واحدة من نفس النوع، والـ [[else]] الأخير لازم. 3 مش صفر وأقل من 5: **قرب يخلص**.

~~~text الناتج كله
الكمية لازم تبقى أكبر من صفر
تمام، وليك شحن مجاني
المتاح 20 بس
قرب يخلص
~~~

---

## ٧. حل التجربة: [[canVote]]

~~~swift
func canVote(age: Int) -> Bool {
  guard age >= 0 else {
    print("سن غلط: \(age)")
    return false
  }
  return age >= 18
}
print(canVote(age: -3), canVote(age: 16), canVote(age: 30))
~~~

~~~text الناتج
سن غلط: -3
false false true
~~~

- الـ guard فيه سطرين: يطبع، وبعدين [[return false]]. لو شلت الـ return هيطلع نفس خطأ [['guard' body must not fall through]] (جربناه).
- [[return age >= 18]]: المقارنة نفسها [[Bool]]، فبنرجّعها على طول من غير if.
- [[سن غلط: -3]] اتطبع **قبل** سطر النتايج، لأن [[print]] بيحسب الـ arguments التلاتة الأول (وأولهم بيطبع)، وبعدين يطبعهم.

---

## الخلاصة

| | [[if]] | [[guard]] |
|---|---|---|
| المعنى | لو كذا اعمل كذا | لازم كذا، وإلا اخرج |
| البلوك بيتنفذ لما | الشرط صح | الشرط غلط |
| الخروج | اختياري | إجباري ([[return]] / [[throw]] / [[break]] / [[continue]]) |
| مكانه | أي حتة | أول الدالة غالبًا (early exit) |`,
          lines: [
            R`دالة بتاخد رقمين وبترجّع [[String]]. [[->]] معناها «بترجّع» (تفاصيل الدوال في درس الدوال).`,
            R`[[guard]]: لازم الكمية أكبر من صفر، وإلا ادخل الـ else.`,
            R`[[return]] بيخرج من الدالة. لازم الـ else يخرج.`,
            "قفلة الـ guard.",
            "guard تاني على المخزون.",
            R`رسالة فيها interpolation.`,
            "قفلة.",
            "هنا متأكدين إن الكمية سليمة. if عادي.",
            "فرع الجملة.",
            R`[[else if]] شرط تاني.`,
            "فرع الشحن المجاني.",
            R`[[else]] لأي حاجة غير كده.`,
            "الحالة العادية.",
            "قفلة الـ if.",
            "قفلة الدالة.",
            "بيطلع رسالة الكمية الغلط من أول guard.",
            "بيطلع شحن مجاني.",
            "بيطلع رسالة المخزون من تاني guard.",
            "ثابت للمخزون.",
            R`[[if]] بترجّع قيمة بتتحط في [[badge]] على طول.`,
            "بيطبع قرب يخلص."
          ],
          sol: R`الـ guard من غير خروج بيطلّع: [['guard' body must not fall through, consider using a 'return' or 'throw' to exit the scope]].

ناتج المثال: [[الكمية لازم تبقى أكبر من صفر]] ثم [[تمام، وليك شحن مجاني]] ثم [[المتاح 20 بس]] ثم [[قرب يخلص]].

حل الدالة:`,
          solCode: R`func canVote(age: Int) -> Bool {
  guard age >= 0 else {
    print("سن غلط: \(age)")
    return false
  }
  return age >= 18
}
print(canVote(age: -3), canVote(age: 16), canVote(age: 30))
// سن غلط: -3
// false false true`
        },
        {
          cmd: "switch والـ pattern matching",
          title: "switch في Swift: لازم يغطي كل الحالات، ومن غير break، وبيطابق ranges و tuples و where",
          desc: R`[[switch]] في Swift أقوى بكتير من C و JS:
1. لازم يبقى exhaustive: يغطي كل القيم الممكنة. مع [[Int]] أو [[String]] ده معناه لازم [[default]]. مع الـ enums بتاعتك (هتشوفها بعدين) ممكن تغطي كل الحالات من غير default، والـ compiler بيقولك لو نسيت حالة.
2. مفيش fallthrough تلقائي: كل [[case]] بيخلص لوحده، فمش محتاج [[break]].
3. الـ case الواحد ممكن يبقى فيه كذا قيمة: [[case "a", "e", "i":]].
4. بيطابق ranges: [[case 90...100:]].
5. بيطابق tuples: [[case (0, 0):]]، و [[_]] معناها «أي قيمة، مش فارقة».
6. بيربط قيم بأسماء [[case let (x, y):]] ويضيف شرط بـ [[where]].

[[...]] (تلات نقط) اسمه closed range: من وإلى بالاتنين. و [[..<]] اسمه half-open range: من، لحد قبل الرقم التاني. يعني [[1...3]] = 1 و 2 و 3، و [[1..<3]] = 1 و 2 بس. هتستخدمهم كتير في الـ loops.

و [[_]] (underscore) في Swift معناها دايمًا «مش محتاج القيمة دي»: في switch، وفي loops، وفي أسماء parameters (درس الدوال).`,
          example: R`func grade(_ score: Int) -> String {
  switch score {
  case 90...100: return "امتياز"
  case 75..<90: return "جيد جدًا"
  case 50..<75: return "مقبول"
  case 0..<50: return "راسب"
  default: return "درجة غلط"
  }
}
print(grade(95), grade(75), grade(30), grade(120))
let point = (3, 0)
switch point {
case (0, 0):
  print("في نقطة الأصل")
case (_, 0):
  print("على محور x")
case let (x, y) where x == y:
  print("على القطر: \(x)")
default:
  print("في حتة تانية")
}
let command = "stop"
let message = switch command {
case "start", "run": "بنشغّل"
case "stop": "بنوقف"
default: "أمر مش معروف"
}
print(message)`,
          try: R`امسح [[default]] من دالة [[grade]] وشوف الخطأ. وبعدين اكتب switch على [[(isLoggedIn, isAdmin)]] (tuple من Bool) بيطبع رسالة لكل حالة من الأربعة من غير default.`,
          flag: "script",
          deep: {
            why: R`أكتر bug مشهور في switch بتاع C هو نسيان [[break]] فالكود بيكمّل في الـ case اللي بعده. Swift قلبت الافتراضي: مفيش كمّلة إلا لو كتبت [[fallthrough]] صريح. والـ exhaustiveness معناها إنك لما تضيف حالة جديدة لـ enum، كل switch في المشروع مش مغطيها هيطلع خطأ، فمش هتنسى مكان.`,
            how: R`الـ switch بيجرب الـ cases بالترتيب ويدخل أول واحد يطابق. المطابقة بتستخدم عملية [[~=]]: للـ range بتسأل [[range.contains(value)]]، وللقيم العادية [[==]]. عشان كده تقدر تطابق أي نوع [[Equatable]].

[[case let (x, y)]] بتطابق أي tuple وبتحط القيم في x و y، و [[where]] بيضيف شرط إضافي. والـ switch expression (Swift 5.9): كل case فيه قيمة واحدة بترجع.`,
            when: R`كل ما تقارن قيمة واحدة بأكتر من حالتين، ودايمًا مع الـ enums. في SwiftUI هتلاقيه جوه [[body]] كتير عشان تعرض شاشة حسب الحالة (loading و error و loaded).`,
            mistakes: R`تحط [[default]] مع enum بتاعك وانت مغطي كل الحالات: كده لما تضيف حالة جديدة الـ compiler مش هينبهك. وتكتب [[case 1...5]] وانت قصدك [[1..<5]]. وتعمل [[1...0]] (البداية أكبر من النهاية): البرنامج بيقع وقت التشغيل.`
          },
          teach: R`## البرنامج بيعمل إيه؟

٣ استخدامات لـ [[switch]]: تحويل درجة لتقدير بالـ ranges، وتحديد مكان نقطة بالـ tuples، واختيار رسالة من أمر نصي بـ switch بيرجّع قيمة. الناتج من [[swift main.swift]] على Swift 6.4 في Docker.

---

## ١. [[grade]]: switch على ranges

~~~swift
func grade(_ score: Int) -> String {
  switch score {
  case 90...100: return "امتياز"
  case 75..<90: return "جيد جدًا"
  case 50..<75: return "مقبول"
  case 0..<50: return "راسب"
  default: return "درجة غلط"
  }
}
~~~

- [[_ score]]: الـ [[_]] قبل الاسم معناها إن اللي بينادي مش بيكتب label: [[grade(95)]] مش [[grade(score: 95)]].
- [[switch score { }]]: قارن [[score]] بالـ cases بالترتيب، وادخل أول واحد يطابق.
- [[case 90...100:]]: [[...]] closed range، الطرفين داخلين: 90 لحد 100.
- [[case 75..<90:]]: [[..<]] half-open، الأول داخل والآخر لأ: 75 لحد 89.
- مفيش [[break]]: كل case بيخلص لوحده.
- [[default:]] لأي حاجة مطابقتش. ليه إجباري؟ لأن [[Int]] فيه قيم سالبة وأكبر من 100، والـ switch لازم يغطي **كل** القيم. شلناه (التجربة):

~~~text الناتج
main.swift:2:3: error: switch must be exhaustive
~~~

ومعاه [[note: add a default clause]].

~~~swift
print(grade(95), grade(75), grade(30), grade(120))
~~~

~~~text الناتج
امتياز جيد جدًا راسب درجة غلط
~~~

75 دخلت «جيد جدًا» لأن [[75..<90]] بيبدأ بـ 75. و 120 مفيش range فيه، فـ default.

---

## ٢. switch على tuple

~~~swift
let point = (3, 0)
switch point {
case (0, 0):
  print("في نقطة الأصل")
case (_, 0):
  print("على محور x")
case let (x, y) where x == y:
  print("على القطر: \(x)")
default:
  print("في حتة تانية")
}
~~~

- [[(3, 0)]] tuple: قيمتين متجمعين في قيمة واحدة من غير ما تعمل نوع.
- [[case (0, 0):]] الاتنين لازم صفر. 3 مش صفر: مش هو.
- [[case (_, 0):]] الـ [[_]] = «أي قيمة، مش فارقة»، والتانية لازم صفر. ✓ فبيطبع **على محور x** ويخرج.
- [[case let (x, y) where x == y:]] [[let]] بتحط القيمتين في اسمين جداد، و [[where]] بتزود شرط. بيطابق (2, 2) مثلًا.
- الـ case بيبدأ تحته سطر جديد عادي، والـ indentation مش مهم للـ compiler.

**ملاحظة من التشغيل:** لأن [[point]] ثابت قيمته معروفة، الـ compiler بيطلّع ٣ تحذيرات [[warning: will never be executed]] على الـ cases اللي عمرها ما هتتنفذ، ومعاها [[note: condition always evaluates to false]]. البرنامج بيشتغل عادي، والتحذيرات دي بتختفي لو القيمة جاية وقت التشغيل.

---

## ٣. switch بيرجّع قيمة

~~~swift
let command = "stop"
let message = switch command {
case "start", "run": "بنشغّل"
case "stop": "بنوقف"
default: "أمر مش معروف"
}
print(message)
~~~

- [[let message = switch ...]]: من Swift 5.9 الـ switch expression، كل case فيه قيمة واحدة (من غير [[return]]) بتتحط في [[message]].
- [[case "start", "run":]]: case واحد بقيمتين، الفاصلة معناها «أو».
- مع [[String]] الـ default لازم برضه (النصوص مالهاش آخر).

~~~text الناتج كله
امتياز جيد جدًا راسب درجة غلط
على محور x
بنوقف
~~~

---

## ٤. حل التجربة: switch كامل من غير default

~~~swift
let isLoggedIn = true, isAdmin = false
switch (isLoggedIn, isAdmin) {
case (true, true): print("أهلًا يا أدمن")
case (true, false): print("أهلًا")
case (false, true): print("حالة غريبة: أدمن مش عامل login")
case (false, false): print("سجّل دخول الأول")
}
~~~

~~~text الناتج
أهلًا
~~~

[[Bool]] ليه قيمتين، فالـ tuple من اتنين Bool ليه 2 × 2 = 4 حالات بالظبط. لما غطيتهم كلهم، الـ compiler عرف إن الـ switch exhaustive ومطلبش [[default]].

---

## الخلاصة

| الـ pattern | بيطابق |
|---|---|
| [[case 5:]] | القيمة دي بالظبط |
| [[case "a", "b":]] | أي واحدة منهم |
| [[case 1...5:]] | من 1 لـ 5 والاتنين داخلين |
| [[case 1..<5:]] | من 1 لـ 4 |
| [[case (_, 0):]] | tuple تانيه صفر |
| [[case let (x, y) where ...:]] | يربط أسماء ويضيف شرط |
| [[default:]] | أي حاجة باقية |

لازم يغطي كل القيم، ومفيش [[break]].`,
          lines: [
            R`[[_]] قبل [[score]] معناها إن اللي بينادي مش بيكتب اسم الـ parameter: [[grade(95)]].`,
            R`[[switch]] على الدرجة.`,
            R`[[90...100]] من 90 لـ 100 والاتنين داخلين.`,
            R`[[75..<90]] من 75 لـ 89.`,
            "50 لـ 74.",
            "0 لـ 49.",
            R`[[default]] لازم عشان Int ليه قيم تانية كتير.`,
            "قفلة الـ switch.",
            "قفلة الدالة.",
            "أربع نتايج.",
            R`tuple فيه رقمين.`,
            "switch على الـ tuple.",
            "الاتنين صفر بالظبط.",
            "بيطبع لو النقطة (0, 0).",
            R`[[_]] أي x، بس y صفر.`,
            "بيطبع لو y صفر.",
            R`يربط القيمتين بأسماء، و [[where]] شرط زيادة.`,
            R`بيستخدم [[x]] اللي اتربطت.`,
            "أي حاجة تانية.",
            "بيطبع لو مفيش حاجة طابقت.",
            "قفلة.",
            "نص الأمر.",
            R`switch كـ expression، القيمة بتتحط في [[message]].`,
            R`case فيه قيمتين.`,
            "case واحد.",
            "default بقيمة.",
            "قفلة.",
            "بيطبع بنوقف."
          ],
          sol: R`من غير default: [[switch must be exhaustive]] ومعاه اقتراح [[add a default clause]].

ناتج المثال: [[امتياز جيد جدًا راسب درجة غلط]]، ثم [[على محور x]]، ثم [[بنوقف]].

حل التمرين: الـ tuple من اتنين Bool ليه 4 حالات بالظبط، فلو غطيتهم الـ compiler بيعرف إن الـ switch كامل.`,
          solCode: R`let isLoggedIn = true, isAdmin = false
switch (isLoggedIn, isAdmin) {
case (true, true): print("أهلًا يا أدمن")
case (true, false): print("أهلًا")
case (false, true): print("حالة غريبة: أدمن مش عامل login")
case (false, false): print("سجّل دخول الأول")
}
// أهلًا`
        },
        {
          cmd: "for و while و ranges",
          title: "for-in على range أو array، و ..< و ... و stride، و while و repeat",
          desc: R`[[for item in collection]] هو الـ loop الأساسي. بيلف على أي حاجة تتلف عليها: range، أو array، أو dictionary، أو string (حرف حرف).

[[for i in 0..<5]] = 0 لحد 4 (خمس مرات). و [[for i in 1...5]] = 1 لحد 5. ولو مش محتاج الرقم نفسه: [[for _ in 1...3]].

[[stride(from:to:by:)]] للخطوات: [[stride(from: 0, to: 10, by: 2)]] = 0 و 2 و 4 و 6 و 8 (من غير 10)، و [[through:]] بدل [[to:]] بتدخّل الآخر. وينفع بخطوة سالبة عشان تعد لورا. و [[.reversed()]] على range كمان بيعد لورا.

[[.enumerated()]] بتديك الرقم والعنصر مع بعض: [[for (i, name) in names.enumerated()]].

[[while شرط { }]] بيلف طول ما الشرط صح. و [[repeat { } while شرط]] بيتنفذ مرة على الأقل قبل ما يشيك. و [[break]] بيخرج من الـ loop، و [[continue]] بيعدّي للفة اللي بعدها.

مفيش [[for (i = 0; i < n; i++)]] بتاعة C في Swift.`,
          example: R`for i in 1...3 {
  print("لفة \(i)")
}
let names = ["سارة", "علي", "منى"]
for (index, name) in names.enumerated() {
  print("\(index + 1). \(name)")
}
for n in stride(from: 10, through: 0, by: -5) {
  print(n, terminator: " ")
}
print()
var sum = 0
for n in 1...100 where n % 2 == 0 {
  sum += n
}
print("مجموع الزوجي:", sum)
var attempts = 0
while attempts < 5 {
  attempts += 1
  if attempts == 2 { continue }
  if attempts == 4 { break }
  print("محاولة \(attempts)")
}`,
          try: R`اطبع جدول ضرب 7 من 1 لـ 10 بـ [[for]]. وبعدين اعمل loop على [[names]] بيطبع الأسماء بالعكس من غير ما تعمل array جديدة بإيدك (فكّر في [[reversed()]]).`,
          flag: "script",
          deep: {
            why: R`الـ loop على collection مباشرة بيشيل أشهر bugs الـ index (off-by-one و index برة الحدود). و [[..<]] متصمم عشان [[0..<array.count]] تمشي بالظبط على كل الـ indexes من غير -1.`,
            how: R`[[for-in]] بيشتغل مع أي نوع بيتبع protocol اسمه [[Sequence]]: بيطلب منه iterator وينادي [[next()]] لحد ما يرجّع nil. الـ ranges نفسها نوع ([[ClosedRange]] و [[Range]]) مش array، فـ [[1...1_000_000]] مبتاخدش ذاكرة.

[[where]] في الـ for بيعدّي العناصر اللي مش محققة الشرط، زي [[continue]] في الأول. والـ [[_]] في الأرقام زي [[1_000_000]] مجرد فاصل للقراية.`,
            when: R`[[for-in]] في 90% من الحالات. [[while]] لما مش عارف عدد اللفات (قراية لحد ما الداتا تخلص، retry لحد ما ينجح). و [[repeat-while]] نادرًا (منيو لازم يظهر مرة على الأقل).`,
            mistakes: R`تكتب [[0...names.count]] بدل [[..<]] فتقرا عنصر برة المصفوفة والبرنامج يقع بـ [[Index out of range]]. وأحسن من الاتنين: [[for name in names]] أو [[names.indices]]. وتغيّر array وانت بتلف عليها وتستنى إن الـ loop يشوف التغيير: الـ for بيلف على نسخة.`
          },
          teach: R`## البرنامج بيعمل إيه؟

٥ loops صغيرين: لفة على range، ولفة على array بالرقم، وعد تنازلي بـ [[stride]]، وجمع الأرقام الزوجية بـ [[where]]، و [[while]] فيه [[continue]] و [[break]]. الناتج من [[swift main.swift]] على Swift 6.4 في Docker.

---

## ١. [[for i in 1...3]]

~~~swift
for i in 1...3 {
  print("لفة \(i)")
}
~~~

- [[for ... in ...]]: «لكل عنصر في ده». 
- [[i]] اسم بتختاره، وفي كل لفة بياخد القيمة اللي عليها الدور. وهو ثابت جوه اللفة (زي [[let]]).
- [[1...3]] = 1 و 2 و 3.

~~~text الناتج
لفة 1
لفة 2
لفة 3
~~~

---

## ٢. [[enumerated()]]: الرقم والعنصر

~~~swift
let names = ["سارة", "علي", "منى"]
for (index, name) in names.enumerated() {
  print("\(index + 1). \(name)")
}
~~~

- [[[...]]] array (قايمة). درس Array جاي.
- [[names.enumerated()]] بتدّي كل عنصر مع رقمه كـ tuple: (0, "سارة") و (1, "علي") و (2, "منى").
- [[(index, name)]] بيفك الـ tuple في اسمين.
- الترقيم بيبدأ من **0**، عشان كده [[index + 1]].

~~~text الناتج
1. سارة
2. علي
3. منى
~~~

---

## ٣. [[stride]]: عد بخطوة

~~~swift
for n in stride(from: 10, through: 0, by: -5) {
  print(n, terminator: " ")
}
print()
~~~

- [[stride(from: 10, through: 0, by: -5)]]: ابدأ من 10، وزوّد -5 كل مرة، لحد 0 **وداخل** ([[through]]). لو كتبت [[to: 0]] الصفر مكانش هيدخل.
- [[terminator: " "]]: [[print]] عادةً بتختم بسطر جديد، وهنا قلنالها تختم بمسافة، فالأرقام جنب بعض.
- [[print()]] فاضية: بتطبع السطر الجديد اللي استغنينا عنه.

~~~text الناتج
10 5 0 
~~~

---

## ٤. [[where]] في الـ for

~~~swift
var sum = 0
for n in 1...100 where n % 2 == 0 {
  sum += n
}
print("مجموع الزوجي:", sum)
~~~

- [[where n % 2 == 0]]: اللفة بتتنفذ بس للأرقام اللي باقي قسمتها على 2 صفر (الزوجي).
- 2 + 4 + ... + 100: خمسين رقم، متوسطهم 51، فالمجموع 50 × 51 = **2550**.

~~~text الناتج
مجموع الزوجي: 2550
~~~

---

## ٥. [[while]] و [[continue]] و [[break]]

~~~swift
var attempts = 0
while attempts < 5 {
  attempts += 1
  if attempts == 2 { continue }
  if attempts == 4 { break }
  print("محاولة \(attempts)")
}
~~~

[[while شرط]] بيلف طول ما الشرط صح، ومش عارف عدد اللفات مقدمًا.

| attempts | اللي حصل |
|---|---|
| 1 | طبع «محاولة 1» |
| 2 | [[continue]]: سيب باقي اللفة وارجع للشرط |
| 3 | طبع «محاولة 3» |
| 4 | [[break]]: اخرج من الـ loop كله |

~~~text الناتج
محاولة 1
محاولة 3
~~~

لاحظ إن [[attempts += 1]] في **أول** اللفة. لو كانت في الآخر، الـ [[continue]] كان هيرجع قبلها و attempts هتفضل 2 للأبد (infinite loop).

---

## ٦. حل التجربة

~~~swift
for i in 1...10 {
  print("7 × \(i) = \(7 * i)")
}
for name in names.reversed() {
  print(name)
}
~~~

~~~text الناتج (اتشغّل بعد المثال عشان names موجودة)
7 × 1 = 7
7 × 2 = 14
...
7 × 10 = 70
منى
علي
سارة
~~~

[[names.reversed()]] بترجّع نفس العناصر بالعكس من غير ما تغيّر [[names]] نفسها.

---

## الخلاصة

| الكود | بيلف على |
|---|---|
| [[for i in 0..<n]] | 0 لحد n-1 |
| [[for i in 1...n]] | 1 لحد n |
| [[for _ in 1...3]] | 3 مرات من غير ما تحتاج الرقم |
| [[for (i, x) in a.enumerated()]] | الرقم (من 0) والعنصر |
| [[stride(from:through:by:)]] | بخطوة، والآخر داخل ([[to:]] من غيره) |
| [[for ... where شرط]] | العناصر اللي بتحقق الشرط بس |
| [[while شرط]] | طول ما الشرط صح |

و [[continue]] = اللفة الجاية، و [[break]] = اخرج خالص.`,
          lines: [
            R`من 1 لـ 3 والتلاتة داخلين.`,
            "بيطبع رقم اللفة.",
            "قفلة.",
            "array فيها 3 أسماء.",
            R`[[enumerated()]] بتدي (رقم، عنصر). الرقم بيبدأ من 0.`,
            "بنزود 1 عشان الترقيم يبدأ من 1.",
            "قفلة.",
            R`من 10 لـ 0 بخطوة -5، و [[through]] بتدخّل الصفر.`,
            R`[[terminator: " "]] بدل السطر الجديد، فالأرقام تطلع جنب بعض.`,
            "قفلة.",
            R`[[print()]] فاضية بتنزل سطر.`,
            "مجموع بيبدأ من صفر.",
            R`[[where]] بياخد الزوجي بس.`,
            "بنجمع.",
            "قفلة.",
            R`[[print]] بقيمتين.`,
            "عداد المحاولات.",
            "while طول ما أقل من 5.",
            "بنزود الأول.",
            R`[[continue]]: سيب باقي اللفة دي.`,
            R`[[break]]: اخرج من الـ loop كله.`,
            "بيطبع المحاولة.",
            "قفلة."
          ],
          sol: R`ناتج المثال: [[لفة 1]] و [[لفة 2]] و [[لفة 3]]، ثم [[1. سارة]] و [[2. علي]] و [[3. منى]]، ثم [[10 5 0]]، ثم [[مجموع الزوجي: 2550]]، ثم [[محاولة 1]] و [[محاولة 3]] (2 اتعدّت بـ continue، و 4 خرجت بـ break).

حل التمرين:`,
          solCode: R`for i in 1...10 {
  print("7 × \(i) = \(7 * i)")
}
for name in names.reversed() {
  print(name)
}
// منى
// علي
// سارة`
        },
        {
          cmd: "الدوال و argument labels",
          title: "تكتب دالة بـ func و ->، وتفهم argument labels و _ والقيم الافتراضية و inout و &",
          desc: R`[[func name(param: Type) -> ReturnType { }]]. السهم [[->]] بيقول نوع القيمة اللي الدالة بترجّعها. ولو مش بترجّع حاجة بتشيل [[->]] خالص.

أهم حاجة غريبة في Swift: الـ argument labels. لما تنادي الدالة بتكتب اسم كل parameter: [[greet(name: "سارة")]]. والهدف إن الاستدعاء يتقري كجملة إنجليزي.
• ممكن تدّي الـ parameter اسمين: واحد للي بينادي وواحد جوه الدالة: [[func send(to user: String)]]. بتناديها [[send(to: "علي")]] وجوه الدالة اسمها [[user]].
• [[_]] كـ label معناها «من غير اسم وانت بتنادي»: [[func square(_ n: Int)]] بتتنادى [[square(4)]].

القيم الافتراضية: [[func greet(name: String, excited: Bool = false)]]، ممكن تنادي من غير [[excited]].

[[inout]]: الـ parameters عادةً ثوابت جوه الدالة (زي [[let]]). لو عايز الدالة تعدّل متغير بتاع اللي بينادي، تكتب [[inout]] قبل النوع، وانت بتنادي تحط [[&]] قبل المتغير: [[addBonus(to: &salary)]]. الـ [[&]] تذكير واضح إن المتغير ده هيتغير.

الدالة ممكن ترجّع tuple فيه أكتر من قيمة بأسماء: [[-> (min: Int, max: Int)]].

ولو جسم الدالة expression واحد، ممكن تشيل [[return]].`,
          example: R`func greet(name: String, excited: Bool = false) -> String {
  excited ? "أهلًا يا \(name)!!" : "أهلًا يا \(name)"
}
print(greet(name: "سارة"))
print(greet(name: "علي", excited: true))
// label برة (to) واسم جوه (user)
func send(_ message: String, to user: String) {
  print("بنبعت «\(message)» لـ \(user)")
}
send("اجتماع الساعة 3", to: "منى")
// inout: الدالة بتعدّل متغير اللي بينادي
func addBonus(to salary: inout Int, percent: Int) {
  salary += salary * percent / 100
}
var mySalary = 10_000
addBonus(to: &mySalary, percent: 15)
print(mySalary)
// ترجيع أكتر من قيمة في tuple
func minMax(_ numbers: [Int]) -> (min: Int, max: Int) {
  var lo = numbers[0], hi = numbers[0]
  for n in numbers {
    lo = min(lo, n)
    hi = max(hi, n)
  }
  return (lo, hi)
}
let range = minMax([4, 9, 1, 7])
print(range.min, range.max)`,
          try: R`اكتب دالة [[func price(_ base: Double, discount: Double = 0) -> Double]] بترجّع السعر بعد الخصم، ونادِها مرة بخصم ومرة من غيره. وبعدين نادي [[addBonus]] من غير [[&]] واقرا الخطأ.`,
          flag: "script",
          deep: {
            why: R`الـ labels جاية من Objective-C، وفكرتها إن [[move(from: a, to: b)]] أوضح من [[move(a, b)]] (مين اللي من ومين اللي لـ؟). وده بيأثر على تصميم الـ APIs كلها في iOS: هتلاقي [[insert(_:at:)]] و [[index(of:)]] و [[sheet(isPresented:content:)]].`,
            how: R`اسم الدالة الكامل بيشمل الـ labels: [[send(_:to:)]] و [[greet(name:excited:)]]، فممكن يبقى فيه دالتين بنفس الاسم وlabels مختلفة (overloading).

[[inout]] بيشتغل بـ copy-in copy-out: القيمة بتتنسخ جوه، والدالة بتشتغل عليها، ولما ترجع النسخة بتتكتب في المتغير الأصلي. عشان كده لازم [[var]] (مينفعش [[let]] ولا literal). والـ [[&]] هنا مش pointer زي C، ده بس علامة inout.

[[min]] و [[max]] دوال جاهزة في Swift. و [[[Int]]] يعني array من Int (درس الـ collections).`,
            when: R`labels: سيب الافتراضي (label = اسم الـ parameter) في أغلب الحالات، واستخدم [[_]] لما أول argument واضح من اسم الدالة ([[print(x)]] و [[square(4)]])، وlabel برة مختلف لما بيخلي الجملة أوضح ([[to:]] و [[from:]] و [[with:]]). و [[inout]] نادرًا: أغلب الوقت رجّع قيمة جديدة أوضح.`,
            mistakes: R`تنادي من غير label فيطلع [[missing argument label 'name:' in call]]. وتحاول تعدّل parameter عادي جوه الدالة ([[cannot assign to value: 'x' is a 'let' constant]]). وتستخدم [[numbers[0]]] من غير ما تتأكد إن الـ array مش فاضية: لو فاضية البرنامج يقع. (الحل الأنظف [[numbers.min()]] اللي بيرجّع optional).`
          },
          teach: R`## البرنامج بيعمل إيه؟

٤ دوال، كل واحدة بتوريك حاجة: قيمة افتراضية، و labels مختلفة برة وجوه، و [[inout]] اللي بتعدّل متغير بتاع اللي بينادي، ودالة بترجّع قيمتين في tuple. الناتج من [[swift main.swift]] على Swift 6.4 في Docker.

---

## ١. [[greet]]: قيمة افتراضية ومن غير [[return]]

~~~swift
func greet(name: String, excited: Bool = false) -> String {
  excited ? "أهلًا يا \(name)!!" : "أهلًا يا \(name)"
}
print(greet(name: "سارة"))
print(greet(name: "علي", excited: true))
~~~

| الحتة | معناها |
|---|---|
| [[func greet]] | دالة اسمها greet |
| [[name: String]] | parameter اسمه name ونوعه String، وهو نفسه الـ label وانت بتنادي |
| [[excited: Bool = false]] | [[= false]] قيمة افتراضية: ينفع متبعتهوش |
| [[-> String]] | بترجّع String |

- جسم الدالة expression واحد (ternary)، فـ Swift بترجّعه لوحدها من غير [[return]].
- النداء الأول من غير [[excited]] فبقت false. التاني بعتناها true.

~~~text الناتج
أهلًا يا سارة
أهلًا يا علي!!
~~~

---

## ٢. [[send]]: [[_]] و label برة غير الاسم جوه

~~~swift
func send(_ message: String, to user: String) {
  print("بنبعت «\(message)» لـ \(user)")
}
send("اجتماع الساعة 3", to: "منى")
~~~

كل parameter ممكن يبقى ليه اسمين: **label** (اللي بيتكتب في النداء) و**اسم** (اللي بتستخدمه جوه الدالة):

| الـ parameter | الـ label | الاسم جوه |
|---|---|---|
| [[_ message]] | مفيش ([[_]]) | [[message]] |
| [[to user]] | [[to]] | [[user]] |

فالنداء بيتقري جملة: [[send("...", to: "منى")]]، وجوه الدالة [[user]] أوضح من [[to]]. ومفيش [[->]] لأن الدالة مبترجعش حاجة (نوعها الحقيقي [[Void]]).

~~~text الناتج
بنبعت «اجتماع الساعة 3» لـ منى
~~~

---

## ٣. [[inout]] و [[&]]

~~~swift
func addBonus(to salary: inout Int, percent: Int) {
  salary += salary * percent / 100
}
var mySalary = 10_000
addBonus(to: &mySalary, percent: 15)
print(mySalary)
~~~

- الـ parameters العادية ثوابت جوه الدالة. [[inout]] قبل النوع بتقول: «الدالة هتعدّل القيمة، والتعديل يرجع للمتغير الأصلي».
- الحساب بالترتيب من الشمال: [[10000 * 15]] = 150000، [[/ 100]] = 1500، فـ [[salary += 1500]] = 11500. (لو كتبت [[percent / 100]] الأول، 15 / 100 في Int = صفر!)
- [[10_000]]: الـ [[_]] جوه الرقم للقراية بس = 10000.
- [[&mySalary]]: الـ [[&]] إجباري وانت بتنادي، عشان أي حد يقرا السطر يعرف إن المتغير ده هيتغير. ولازم [[var]].

~~~text الناتج
11500
~~~

ومن غير [[&]] (التجربة):

~~~text الناتج
main.swift:16:14: error: passing value of type 'Int' to an inout parameter requires explicit '&'
~~~

---

## ٤. [[minMax]]: ترجيع tuple بأسماء

~~~swift
func minMax(_ numbers: [Int]) -> (min: Int, max: Int) {
  var lo = numbers[0], hi = numbers[0]
  for n in numbers {
    lo = min(lo, n)
    hi = max(hi, n)
  }
  return (lo, hi)
}
let range = minMax([4, 9, 1, 7])
print(range.min, range.max)
~~~

- [[[Int]]]: array من Int.
- [[-> (min: Int, max: Int)]]: بترجّع tuple فيه قيمتين ليهم أسماء.
- [[numbers[0]]]: أول عنصر (الترقيم من 0). بنبدأ بيه الاتنين.
- [[min(lo, n)]] و [[max(hi, n)]]: دوال جاهزة بترجّع الأصغر والأكبر.
- [[return (lo, hi)]] والقيم بتتحط في [[min]] و [[max]] بالترتيب، وبعدين بنقراها [[range.min]].

| n | lo | hi |
|---|---|---|
| 4 | 4 | 4 |
| 9 | 4 | 9 |
| 1 | 1 | 9 |
| 7 | 1 | 9 |

~~~text الناتج
1 9
~~~

> لو بعتّ array فاضية، [[numbers[0]]] بيوقّع البرنامج. الأمان: [[numbers.min()]] اللي بترجّع optional.

---

## ٥. حل التجربة

~~~swift
func price(_ base: Double, discount: Double = 0) -> Double {
  base - base * discount / 100
}
print(price(200))
print(price(200, discount: 25))
~~~

~~~text الناتج
200.0
150.0
~~~

200 - 200 × 25 / 100 = 200 - 50 = 150. والناتج فيه [[.0]] لأنه Double.

---

## الخلاصة

| الشكل | النداء |
|---|---|
| [[func f(x: Int)]] | [[f(x: 1)]] |
| [[func f(_ x: Int)]] | [[f(1)]] |
| [[func f(to x: Int)]] | [[f(to: 1)]] وجوه الدالة [[x]] |
| [[func f(x: Int = 0)]] | [[f()]] أو [[f(x: 5)]] |
| [[func f(x: inout Int)]] | [[f(x: &v)]] و v لازم [[var]] |
| [[-> (a: Int, b: Int)]] | [[r.a]] و [[r.b]] |`,
          lines: [
            R`دالة بـ parameter عادي وواحد بقيمة افتراضية، وبترجّع [[String]].`,
            R`expression واحد، فمش محتاجين [[return]].`,
            "قفلة.",
            R`من غير [[excited]]، فبتاخد false.`,
            "بالـ parameter التاني.",
            R`[[_]] أول parameter من غير label، والتاني label برة [[to]] واسم جوه [[user]].`,
            R`جوه الدالة بنستخدم [[user]] مش [[to]].`,
            "قفلة.",
            "الاستدعاء بيتقري كجملة.",
            R`[[inout]] معناها إن التعديل هيرجع للمتغير الأصلي.`,
            "بنزود النسبة.",
            "قفلة.",
            R`[[var]] لازم. و [[10_000]] = 10000.`,
            R`[[&]] قبل المتغير إجباري مع inout.`,
            "بقى 11500.",
            R`بتاخد array وبترجّع tuple فيه min و max بأسماء.`,
            "أول عنصر بداية للاتنين.",
            "بنلف على الأرقام.",
            R`[[min]] دالة جاهزة.`,
            R`[[max]] دالة جاهزة.`,
            "قفلة.",
            "بنرجّع الـ tuple.",
            "قفلة.",
            "بنحفظ النتيجة.",
            "بنوصل للقيم بالأسماء."
          ],
          sol: R`من غير [[&]]: [[passing value of type 'Int' to an inout parameter requires explicit '&']].

ناتج المثال: [[أهلًا يا سارة]]، [[أهلًا يا علي!!]]، [[بنبعت «اجتماع الساعة 3» لـ منى]]، [[11500]]، [[1 9]].

حل الدالة:`,
          solCode: R`func price(_ base: Double, discount: Double = 0) -> Double {
  base - base * discount / 100
}
print(price(200))
print(price(200, discount: 25))
// 200.0
// 150.0`
        }
      ]
    }
]);
