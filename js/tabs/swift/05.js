// تكملة تاب swift: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/swift/01.js (شرح حقول الدرس في أوله)
MORE("swift", [
    {
      t: "الأخطاء والتنظيم والذاكرة",
      l: 1,
      n: "throws و try و do/catch و Result، والـ access control، و ARC و weak و retain cycles",
      items: [
        {
          cmd: "الأخطاء throws و do catch",
          title: "تتعامل مع الأخطاء بـ throws و try و do/catch، وإمتى try? و try! و Result",
          desc: R`لما دالة ممكن تفشل لسبب متوقع (ملف مش موجود، JSON بايظ، باسورد ضعيف)، بتعلّمها بـ [[throws]] وبترمي (throw) error. الـ error أي نوع بيتبع protocol [[Error]]، وغالبًا enum.

اللي بينادي دالة [[throws]] لازم يكتب [[try]] قبلها (عشان يبان إن السطر ده ممكن يفشل)، ويتعامل مع الفشل بطريقة من دول:
1. [[do { try ... } catch { ... }]]: بيمسك الخطأ. وجوه [[catch]] فيه متغير جاهز اسمه [[error]]. وتقدر تعمل كذا [[catch]] لكل حالة: [[catch PasswordError.tooShort { }]].
2. [[try?]]: لو فشل يرجّع [[nil]] (والنتيجة بتبقى optional). سهل بس بيضيّع سبب الخطأ.
3. [[try!]]: «متأكد إنها مش هتفشل». لو فشلت = crash. زي [[!]] بالظبط.
4. تخلي دالتك نفسها [[throws]] وتسيب الخطأ يطلع لفوق.

من Swift 6 فيه typed throws: [[throws(PasswordError)]] بيحدد نوع الخطأ بالظبط، فـ [[error]] جوه catch بيبقى من النوع ده مش [[any Error]].

[[Result<Success, Failure>]] enum فيه [[.success(value)]] و [[.failure(error)]]، مفيد لما تخزن نتيجة أو تبعتها لـ closure. وبعد async/await بقى استخدامه أقل.

[[throw]] بيخرج من الدالة فورًا زي [[return]]. و [[defer { }]] كود بيتنفذ عند الخروج من الـ scope مهما حصل (حتى لو اترمى error)، مفيد للتنضيف.`,
          example: R`enum PasswordError: Error {
  case tooShort(min: Int)
  case noDigits
}
func validate(_ password: String) throws(PasswordError) -> String {
  guard password.count >= 8 else {
    throw .tooShort(min: 8)
  }
  guard password.contains(where: \.isNumber) else {
    throw .noDigits
  }
  return "باسورد قوي"
}
for p in ["abc", "abcdefgh", "abcdefg1"] {
  do {
    let result = try validate(p)
    print(p, "→", result)
  } catch .tooShort(let min) {
    print(p, "→ لازم \(min) حروف على الأقل")
  } catch {
    print(p, "→ خطأ:", error)
  }
}
let maybe = try? validate("123")
print(maybe as Any)
let result = Result { try validate("swift2026") }
switch result {
case .success(let msg): print("Result:", msg)
case .failure(let err): print("Result فشل:", err)
}`,
          try: R`اكتب [[let x = validate("abc")]] من غير [[try]] وشوف الخطأ. وبعدين جرّب [[try! validate("abc")]] وشوف الـ crash. وضيف case [[noUppercase]] واكتب لها guard.`,
          flag: "script",
          deep: {
            why: R`في JS ممكن أي دالة ترمي exception ومحدش يعرف. في Swift [[throws]] جزء من توقيع الدالة، و [[try]] إجباري عند النداء، فانت شايف كل سطر ممكن يفشل وانت بتقرا. ومفيش exceptions مخفية.`,
            how: R`الـ errors في Swift مش exceptions تقيلة بـ stack unwinding: هي قيمة بترجع بطريقة خاصة، فالأداء قريب من return عادي. [[catch .tooShort(let min)]] pattern matching زي switch. والـ [[catch]] الأخير من غير pattern بيمسك أي حاجة باقية.

[[Result { try ... }]] initializer بيحوّل نداء throws لـ Result. و [[result.get()]] بيرجّعه throws تاني.

typed throws (Swift 6) مفيدة في الكود الداخلي والمكتبات الصغيرة. أغلب كود Apple لسه بيرمي [[any Error]]، فـ [[throws]] العادي هو الافتراضي المعقول.`,
            when: R`[[throws]] للفشل المتوقع اللي اللي بينادي ممكن يتعامل معاه (validation، شبكة، parsing). [[try?]] لما الفشل مش مهم سببه (قراية cache). [[try!]] تقريبًا أبدًا. والأخطاء البرمجية (bug) مش errors: استخدم [[precondition]] أو [[fatalError]].`,
            mistakes: R`تمسك كل حاجة بـ [[catch {}]] فاضي فالخطأ يختفي ومتعرفش التطبيق مش شغال ليه. وتستخدم [[try?]] في كل حتة فتخسر رسالة الخطأ اللي كانت هتقولك المشكلة. وتعرض [[error]] للمستخدم كما هو ([[noDigits]]): اعمل رسالة مفهومة.`
          },
          teach: R`## البرنامج بيعمل إيه؟

دالة بتراجع باسورد وبترمي error لو قصير أو مفيهوش رقم. وبعدين بنجربها على ٣ باسوردات بـ [[do]]/[[catch]]، ومرة بـ [[try?]]، ومرة بنحوّل النتيجة لـ [[Result]]. الناتج من [[swift main.swift]] على Swift 6.4 في Docker.

---

## ١. نوع الخطأ

~~~swift
enum PasswordError: Error {
  case tooShort(min: Int)
  case noDigits
}
~~~

- أي نوع بيتبع protocol [[Error]] ينفع يترمي. الـ enum أنسب حاجة: كل حالة = سبب.
- [[tooShort(min: Int)]]: associated value، الخطأ شايل معلومة (أقل طول).

---

## ٢. دالة بترمي: [[throws(PasswordError)]]

~~~swift
func validate(_ password: String) throws(PasswordError) -> String {
  guard password.count >= 8 else {
    throw .tooShort(min: 8)
  }
  guard password.contains(where: \.isNumber) else {
    throw .noDigits
  }
  return "باسورد قوي"
}
~~~

- [[throws]] قبل [[->]]: «الدالة دي ممكن تفشل». و [[(PasswordError)]] بعدها (typed throws، من Swift 6): نوع الخطأ بالظبط. لو كتبت [[throws]] بس، ممكن ترمي أي [[Error]].
- [[throw .tooShort(min: 8)]]: بيرمي الخطأ ويخرج من الدالة فورًا، زي [[return]]. والنقطة كفاية لأن النوع معروف من التوقيع.
- [[contains(where: \.isNumber)]]: فيه أي حرف رقم؟ [[\.isNumber]] key path على كل [[Character]].

---

## ٣. [[do]] / [[try]] / [[catch]]

~~~swift
for p in ["abc", "abcdefgh", "abcdefg1"] {
  do {
    let result = try validate(p)
    print(p, "→", result)
  } catch .tooShort(let min) {
    print(p, "→ لازم \(min) حروف على الأقل")
  } catch {
    print(p, "→ خطأ:", error)
  }
}
~~~

- [[do { }]]: بلوك فيه كود ممكن يفشل.
- [[try validate(p)]]: [[try]] إجباري قبل أي دالة [[throws]]. لو فشلت، اللي بعدها في البلوك ميتنفذش، والتنفيذ ينط على [[catch]].
- [[catch .tooShort(let min)]]: catch لحالة معينة، وبيفك القيمة اللي جواها (زي case في switch).
- [[catch]] من غير حاجة: أي خطأ باقي، وجواه اسم جاهز [[error]].

| الباسورد | اللي حصل |
|---|---|
| [[abc]] | 3 حروف: [[tooShort]]، اتمسك في أول catch |
| [[abcdefgh]] | 8 بس مفيش رقم: [[noDigits]]، اتمسك في التاني |
| [[abcdefg1]] | عدّى: [[باسورد قوي]] |

~~~text الناتج
abc → لازم 8 حروف على الأقل
abcdefgh → خطأ: noDigits
abcdefg1 → باسورد قوي
~~~

[[print]] للـ error طبع اسم الحالة [[noDigits]].

---

## ٤. [[try?]]

~~~swift
let maybe = try? validate("123")
print(maybe as Any)
~~~

[[try?]]: لو نجح النتيجة جوه optional، ولو فشل **nil** والخطأ يتنسي. «123» قصير:

~~~text الناتج
nil
~~~

---

## ٥. [[Result]]

~~~swift
let result = Result { try validate("swift2026") }
switch result {
case .success(let msg): print("Result:", msg)
case .failure(let err): print("Result فشل:", err)
}
~~~

- [[Result { try ... }]]: بينفذ الـ closure. لو نجح [[.success(القيمة)]]، لو رمى [[.failure(الخطأ)]]. [[Result]] نفسه enum بحالتين.
- «swift2026» 9 حروف وفيه أرقام: نجح.

~~~text الناتج
Result: باسورد قوي
~~~

---

## ٦. التجربة

**من غير [[try]]** ([[let x = validate("abc")]]):

~~~text الناتج
main.swift:31:9: error: call can throw but is not marked with 'try'
~~~

ومعاه ٣ اقتراحات: [[try]] أو [[try?]] أو [[try!]].

**[[try!]] على باسورد غلط:**

~~~text الناتج
main/main.swift:31: Fatal error: 'try!' expression unexpectedly raised an error: main.PasswordError.tooShort(min: 8)
*** Program crashed: Illegal instruction ...
~~~

[[try!]] = «متأكد إنها مش هتفشل». فشلت، فالبرنامج وقع، والرسالة فيها الخطأ بالكامل: [[main]] اسم الـ module، وبعده النوع والحالة والقيمة.

---

## الخلاصة

| الشكل | لو نجح | لو فشل |
|---|---|---|
| [[do { try f() } catch { }]] | يكمّل | ينط على catch |
| [[try? f()]] | القيمة optional | nil |
| [[try! f()]] | القيمة | **crash** |
| [[Result { try f() }]] | [[.success]] | [[.failure]] |
| [[func g() throws]] + [[try f()]] | يكمّل | الخطأ يطلع لللي نادى g |

و [[throw]] بيخرج فورًا زي [[return]]، و [[try]] إجباري قبل أي دالة [[throws]].`,
          lines: [
            R`enum بيتبع [[Error]] فينفع يترمي.`,
            R`حالة بقيمة مرفقة.`,
            "حالة تانية.",
            "قفلة.",
            R`[[throws(PasswordError)]]: typed throws، الخطأ من النوع ده بس.`,
            "لازم 8 حروف.",
            R`[[throw]] بيخرج فورًا. [[.tooShort]] من غير اسم النوع لأنه معروف.`,
            "قفلة.",
            R`[[\.isNumber]] key path على كل حرف.`,
            "خطأ تاني.",
            "قفلة.",
            "لو عدّى الاتنين.",
            "قفلة الدالة.",
            "بنجرب 3 باسوردات.",
            R`[[do]] بلوك فيه كود ممكن يفشل.`,
            R`[[try]] إجباري قبل الدالة.`,
            "لو نجح.",
            R`[[catch]] لحالة معينة وبنفك القيمة.`,
            "الرسالة.",
            R`[[catch]] لأي حاجة تانية، و [[error]] متغير جاهز.`,
            "الرسالة.",
            "قفلة do/catch.",
            "قفلة الـ loop.",
            R`[[try?]]: لو فشل nil.`,
            "بيطبع nil.",
            R`[[Result { }]] بيحوّل النداء لـ Result.`,
            "switch على الـ Result.",
            "النجاح.",
            "الفشل.",
            "قفلة."
          ],
          sol: R`من غير [[try]]: [[call can throw but is not marked with 'try']].
و [[try!]] على باسورد غلط: [[Fatal error: 'try!' expression unexpectedly raised an error]] ومعاه نوع الخطأ.

ناتج المثال:`,
          solCode: R`abc → لازم 8 حروف على الأقل
abcdefgh → خطأ: noDigits
abcdefg1 → باسورد قوي
nil
Result: باسورد قوي`
        },
        {
          cmd: "access control",
          title: "private و fileprivate و internal و public: مين يقدر يشوف إيه في كودك",
          desc: R`الـ access control بيحدد مين يقدر يستخدم property أو method أو نوع. من الأضيق للأوسع:

1. [[private]]: جوه نفس النوع (ونفس الـ extensions بتاعته في نفس الملف) بس.
2. [[fileprivate]]: أي حاجة في نفس الملف.
3. [[internal]]: أي حاجة في نفس الـ module (التطبيق كله أو الـ package). ده الافتراضي لو مكتبتش حاجة.
4. [[package]]: (Swift 5.9) أي module في نفس الـ Swift package.
5. [[public]]: أي module تاني يقدر يستخدمه، بس مينفعش يورث منه أو يعمل override.
6. [[open]]: زي public وكمان يتورث ويتعمل override (للـ classes).

[[private(set)]] (شفتها قبل كده): القراية بالمستوى العادي والكتابة private. ده أشهر استخدام: الـ state تقدر تتقري من برة بس تتغير من methods النوع بس.

في تطبيق iOS عادي، كل الكود module واحد، فهتستخدم [[private]] كتير و [[internal]] الافتراضي. و [[public]] و [[open]] لما تعمل framework أو Swift package حد تاني هيستخدمه.

وفي SwiftUI القاعدة: [[@State private var]] دايمًا private.`,
          example: R`struct BankAccount {
  let owner: String
  private(set) var balance: Double = 0
  private var history: [String] = []
  init(owner: String) {
    self.owner = owner
  }
  mutating func deposit(_ amount: Double) {
    guard isValid(amount) else { return }
    balance += amount
    history.append("+\(amount)")
  }
  var lastAction: String { history.last ?? "مفيش" }
  private func isValid(_ amount: Double) -> Bool {
    amount > 0
  }
}
var account = BankAccount(owner: "منى")
account.deposit(500)
account.deposit(-20)
print(account.balance, account.lastAction)`,
          try: R`جرّب [[account.balance = 1_000_000]] و [[account.history]] و [[account.isValid(5)]] من برة الـ struct. اقرا الأخطاء. ليه منطقي إن الرصيد ميتغيرش إلا من [[deposit]]؟`,
          flag: "script",
          deep: {
            why: R`الـ access control مش أمان ضد الهاكرز (الكود بيتفك برضه)، ده أمان ضد الأخطاء: لو [[balance]] ينفع يتعدل من أي حتة، مفيش ضمان إن الـ validation اتعمل. لما تقفله، كل التعديلات بتعدي على method واحدة فيها القواعد. وبيخلي الـ API بتاع النوع صغير وواضح: اللي مش private هو اللي المفروض تستخدمه.`,
            how: R`الـ module في Swift = target بيتبني لوحده (التطبيق، framework، package target). [[internal]] الافتراضي معناه كل ملفات التطبيق شايفة بعض من غير import. و [[@testable import MyApp]] في الاختبارات بيفتح الـ internal للاختبار.

لاحظ الـ [[init]] اللي كتبناه: لو الـ struct فيه stored property [[private]] **من غير قيمة افتراضية**، الـ memberwise init الجاهز لازم ياخدها، فبيبقى [[private]] هو كمان، ومحدش برة يقدر يعمل object: [['BankAccount' initializer is inaccessible due to 'private' protection level]]. الحل إنك تكتب [[init]] بنفسك بالمستوى اللي عايزه. أما لو كل الـ properties الـ private ليها قيم افتراضية (زي هنا)، فعلى Swift 6.4 اللي جربنا عليها الـ memberwise init بيسيبها برة وبيفضل internal: مسحنا الـ init والمثال اشتغل بنفس الناتج. (النسخ الأقدم من Swift كانت بتخليه private في الحالتين، فكتابة الـ init بإيدك أضمن لو مشروعك على نسخة أقدم).`,
            when: R`خلي أي حاجة [[private]] لحد ما حاجة برة تحتاجها فعلًا. و [[private(set)]] لأي state ليها قواعد تغيير. و [[public]] بس في الـ packages اللي بتتشارك.`,
            mistakes: R`تسيب كل حاجة internal لأنه الافتراضي، فكل ملف في التطبيق يقدر يعدّل كل حاجة. وتعمل [[@State]] من غير [[private]] فحد يحاول يبعتلها قيمة من برة (مش هتشتغل زي ما يتوقع). وتنسى إن [[private]] بتسمح للـ extension في نفس الملف بس.`
          },
          teach: R`## البرنامج بيعمل إيه؟

حساب بنكي الرصيد بتاعه **يتقري** من أي حتة بس **يتغير** من [[deposit]] بس، والسجل والـ validation مستخبيين جوه. الناتج والأخطاء من [[swift main.swift]] على Swift 6.4 في Docker.

---

## ١. الـ properties ومستوياتها

~~~swift
struct BankAccount {
  let owner: String
  private(set) var balance: Double = 0
  private var history: [String] = []
~~~

| الـ property | مين يقرا | مين يكتب |
|---|---|---|
| [[owner]] (من غير كلمة = [[internal]]) | الكل | محدش ([[let]]) |
| [[private(set) var balance]] | الكل | جوه الـ struct بس |
| [[private var history]] | جوه الـ struct بس | جوه الـ struct بس |

- [[internal]] هو الافتراضي: أي ملف في نفس الـ module (التطبيق كله) شايفه.
- [[= 0]] و [[= []]]: قيم افتراضية، فمش لازم تتبعت وانت بتعمل الحساب.

---

## ٢. الـ [[init]]

~~~swift
  init(owner: String) {
    self.owner = owner
  }
~~~

كتبناه بإيدنا عشان اللي برة يبعت المالك بس، والرصيد يبدأ صفر دايمًا. الـ [[self.owner]] الـ property، و [[owner]] الـ parameter.

> جربنا نمسح الـ init على Swift 6.4: المثال اشتغل بنفس الناتج، لأن الـ memberwise init الجاهز بيسيب الـ properties الـ private اللي ليها قيمة افتراضية برة. لكن لما عملنا struct فيه [[private var history: [String]]] **من غير** قيمة افتراضية، الـ memberwise init لازم ياخدها فبقى private:

~~~text الناتج
main.swift:5:9: error: 'BankAccount' initializer is inaccessible due to 'private' protection level
~~~

---

## ٣. الطريقة الوحيدة للتعديل

~~~swift
  mutating func deposit(_ amount: Double) {
    guard isValid(amount) else { return }
    balance += amount
    history.append("+\(amount)")
  }
~~~

- [[mutating]] لأنها بتعدّل الـ struct.
- [[guard isValid(amount) else { return }]]: لو المبلغ غلط اخرج بهدوء من غير أي تعديل.
- [[balance += amount]] مسموح هنا: احنا **جوه** الـ struct.
- [[history.append("+\(amount)")]]: بنسجل العملية. [[amount]] Double فبيتطبع [[500.0]].

---

## ٤. نافذة صغيرة على الحاجة المخفية

~~~swift
  var lastAction: String { history.last ?? "مفيش" }
  private func isValid(_ amount: Double) -> Bool {
    amount > 0
  }
}
~~~

- [[lastAction]] computed و internal: بتوري آخر عملية بس من السجل، من غير ما تفتح السجل كله.
- [[private func isValid]]: helper داخلي. ده تفصيلة تنفيذ، فمش جزء من الـ API.

---

## ٥. الاستخدام

~~~swift
var account = BankAccount(owner: "منى")
account.deposit(500)
account.deposit(-20)
print(account.balance, account.lastAction)
~~~

- [[deposit(500)]]: عدّى الـ validation: الرصيد 500، والسجل [[["+500.0"]]].
- [[deposit(-20)]]: [[isValid]] رجّعت false، فخرجت من غير تعديل.
- [[account.balance]] القراية مسموحة من برة.

~~~text الناتج
500.0 +500.0
~~~

---

## ٦. التجربة: محاولات من برة

~~~swift
account.balance = 1_000_000
print(account.history)
print(account.isValid(5))
~~~

~~~text الناتج
main.swift:22:9: error: cannot assign to property: 'balance' setter is inaccessible
main.swift:23:15: error: 'history' is inaccessible due to 'private' protection level
main.swift:24:15: error: 'isValid' is inaccessible due to 'private' protection level
~~~

- الأول: الـ **setter** (جزء الكتابة) بتاع [[balance]] private، والقراية لأ.
- التاني والتالت: [[private]] كاملة، حتى القراية ممنوعة. ومع كل واحد [[note: 'history' declared here]] بيشاور على التعريف.

لاحظ إن الكود اللي حاول ده **في نفس الملف**، ومع ذلك اترفض: [[private]] حدودها النوع نفسه (والـ extensions بتاعته في نفس الملف). جربنا نغيّر [[history]] لـ [[fileprivate]]: [[print(account.history)]] اشتغل وطبع [[["+500.0"]]].

---

## الخلاصة

| الكلمة | مين يشوف |
|---|---|
| [[private]] | النوع ده بس (والـ extensions بتاعته في نفس الملف) |
| [[fileprivate]] | أي حاجة في نفس الملف |
| [[internal]] (الافتراضي) | الـ module كله (التطبيق) |
| [[package]] | الـ modules اللي في نفس الـ Swift package |
| [[public]] | أي module تاني (من غير وراثة أو override) |
| [[open]] | أي module، ويورث ويعمل override |
| [[private(set)]] | القراية بالمستوى العادي، والكتابة private |

القاعدة: [[private]] لحد ما حاجة برة تحتاجها فعلًا.`,
          lines: [
            "struct لحساب بنكي.",
            "المالك، ثابت.",
            R`[[private(set)]]: الكل يقرا، التعديل من جوه بس.`,
            R`[[private]]: محدش برة يشوفها خالص.`,
            R`[[init]] مكتوب بإيدنا عشان نتحكم في اللي بيتبعت (تفاصيل الـ memberwise init والـ private في «إزاي»).`,
            "بنحط المالك، والباقي ليه قيم افتراضية.",
            "قفلة.",
            "الطريقة الوحيدة لتزويد الرصيد.",
            "validation قبل أي تعديل.",
            "تعديل مسموح من جوه.",
            "تسجيل في السجل.",
            "قفلة.",
            "computed بتعرض حاجة محدودة من السجل.",
            R`method private: helper داخلي.`,
            "الشرط.",
            "قفلة.",
            "قفلة الـ struct.",
            R`الـ init بتاعنا بياخد [[owner]] بس.`,
            "إيداع سليم.",
            "سالب فهيترفض بهدوء.",
            "بيطبع 500.0 +500.0."
          ],
          sol: R`الأخطاء:
[[account.balance = ...]] ← [[cannot assign to property: 'balance' setter is inaccessible]]
[[account.history]] ← [['history' is inaccessible due to 'private' protection level]]
[[account.isValid(5)]] ← [['isValid' is inaccessible due to 'private' protection level]]

وده منطقي: لو الرصيد يتعدل من برة، ممكن أي حتة في التطبيق تحط رقم سالب أو تنسى تسجل العملية في السجل. كده كل تعديل لازم يعدي على [[deposit]] اللي فيها القواعد.

ناتج المثال: [[500.0 +500.0]]`
        },
        {
          cmd: "ARC و weak و retain cycles",
          title: "Swift بتمسح الـ objects إمتى (ARC)، و retain cycle بيعمل memory leak إزاي، و weak و unowned و [weak self]",
          desc: R`Swift مفيهاش garbage collector زي Java و JS. بدل كده بتستخدم ARC (Automatic Reference Counting): كل object من class ليه عداد بعدد الـ references القوية (strong) اللي ماسكاه. لما العداد يوصل صفر، الـ object بيتمسح فورًا، و [[deinit]] بتاعه بيتنادى. (الـ structs والـ enums مش داخلين في ده، دي values).

المشكلة: retain cycle. لو object A ماسك B بقوة، و B ماسك A بقوة، العداد بتاع الاتنين عمره ما هيوصل صفر حتى لو محدش تاني محتاجهم. ده memory leak: ذاكرة محجوزة لحد ما التطبيق يتقفل.

الحل: واحد من الاتنين يمسك التاني بـ [[weak]] (ضعيف): مش بيزود العداد، ولما الـ object يتمسح الـ reference بيبقى [[nil]] لوحده. عشان كده [[weak]] لازم [[var]] و optional. ([[weak var owner: Person?]]).

[[unowned]]: زي weak مش بيزود العداد، بس مش optional، ولو الـ object اتمسح ووصلت له = crash. استخدمه بس لو متأكد إن الـ object التاني هيعيش أطول.

أشهر مكان للـ cycle: closure متخزن جوه class وبيستخدم [[self]]. الـ class ماسك الـ closure، والـ closure ماسك [[self]]. الحل capture list: [[{ [weak self] in self?.doSomething() }]]. الـ [[[weak self]]] في أول الـ closure بتقول «امسك self ضعيف».`,
          example: R`final class Person {
  let name: String
  var apartment: Apartment?
  init(name: String) { self.name = name }
  deinit { print("\(name) اتمسح") }
}
final class Apartment {
  let number: Int
  weak var tenant: Person?
  init(number: Int) { self.number = number }
  deinit { print("شقة \(number) اتمسحت") }
}
var sara: Person? = Person(name: "سارة")
var flat: Apartment? = Apartment(number: 7)
sara?.apartment = flat
flat?.tenant = sara
sara = nil
flat = nil
final class Ticker {
  var onTick: (() -> Void)?
  var count = 0
  func start() {
    onTick = { [weak self] in
      self?.count += 1
    }
  }
  deinit { print("Ticker اتمسح") }
}
var t: Ticker? = Ticker()
t?.start()
t?.onTick?()
print(t?.count ?? 0)
t = nil`,
          try: R`شيل [[weak]] من [[tenant]] وشغّل: هتلاقي رسايل الـ deinit مطلعتش (leak). رجّعها، وبعدين شيل [[[weak self]]] من الـ closure واكتب [[self.count += 1]]: هل [[Ticker اتمسح]] لسه بتطلع؟`,
          flag: "script",
          deep: {
            why: R`الـ leaks في iOS بتسبب إن التطبيق ياكل ذاكرة كل ما تفتح وتقفل شاشة، ولحد ما النظام يقفله. وأسئلة ARC و [[weak self]] من أشهر أسئلة انترفيو iOS على الإطلاق. ولازم تفهمها حتى لو SwiftUI بيقلل المشكلة، لأن view models والـ closures والـ delegates لسه موجودين.`,
            how: R`ARC بيحط تعليمات retain و release وقت الـ compile، فمفيش garbage collector بيوقف التطبيق، والمسح بيحصل في لحظة معروفة. التمن إن الـ cycles مش بتتكشف لوحدها.

في المثال: [[sara]] ماسكة [[flat]] بقوة، و [[flat.tenant]] ماسك سارة weak. لما [[sara = nil]]، عداد سارة صفر فتتمسح (و [[flat.tenant]] بقت nil لوحدها). وبعدين [[flat = nil]] الشقة تتمسح.

الـ delegates في UIKit دايمًا [[weak var delegate]] لنفس السبب. و [[[weak self]]] بيخلي [[self]] جوه الـ closure optional، عشان كده [[self?.]]. وفيه شكل [[guard let self else { return }]] في أول الـ closure.

أداة Xcode «Debug Memory Graph» بتوريك الـ objects الموجودة في الذاكرة والـ cycles بينهم (درس الـ debugging).`,
            when: R`[[weak]] للـ back-references (ابن بيشاور على أب، delegate)، و [[[weak self]]] في أي closure متخزن جوه class (timers، notifications، completion handlers متخزنة). في closures مش escaping (زي [[map]]) مش محتاجها.`,
            mistakes: R`تحط [[[weak self]]] في كل closure حتى في [[map]] بدون داعي. وتستخدم [[unowned]] عشان تهرب من الـ optional وبعدين تاخد crash. وتفتكر إن SwiftUI views نفسها ممكن تعمل cycle: الـ View struct، المشكلة في الـ classes اللي وراها.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيعمل objects من classes ليها [[deinit]] بيطبع لحظة المسح، عشان **تشوف** ARC بعينك. جزء فيه شخص وشقة بيشاوروا على بعض (و [[weak]] بيمنع الـ cycle)، وجزء فيه object بيخزن closure بيستخدم [[self]] (و [[[weak self]]] بيمنع الـ cycle). الناتج من [[swift main.swift]] على Swift 6.4 في Docker.

---

## ١. [[Person]]: reference قوي و [[deinit]]

~~~swift
final class Person {
  let name: String
  var apartment: Apartment?
  init(name: String) { self.name = name }
  deinit { print("\(name) اتمسح") }
}
~~~

- class لأن ARC للـ classes بس (الـ structs قيم، مفيش عداد).
- [[var apartment: Apartment?]]: reference **قوي** (strong) للشقة. ده الافتراضي لأي property.
- [[deinit { }]]: بيتنادى لوحده لحظة ما عداد الـ references يوصل صفر والـ object يتمسح. مفيش أقواس ولا parameters.

---

## ٢. [[Apartment]]: reference ضعيف

~~~swift
final class Apartment {
  let number: Int
  weak var tenant: Person?
  init(number: Int) { self.number = number }
  deinit { print("شقة \(number) اتمسحت") }
}
~~~

[[weak var tenant: Person?]]:
- [[weak]]: بيشاور على الشخص **من غير ما يزود عداده**.
- لازم [[var]] و optional ([[?]]): لما الشخص يتمسح، Swift بتحط [[nil]] هنا لوحدها.

---

## ٣. نربطهم ونسيبهم

~~~swift
var sara: Person? = Person(name: "سارة")
var flat: Apartment? = Apartment(number: 7)
sara?.apartment = flat
flat?.tenant = sara
sara = nil
flat = nil
~~~

نعد الـ strong references خطوة خطوة:

| الخطوة | عداد سارة | عداد الشقة |
|---|---|---|
| إنشاء الاتنين | 1 ([[sara]]) | 1 ([[flat]]) |
| [[sara?.apartment = flat]] | 1 | 2 |
| [[flat?.tenant = sara]] (weak) | 1 | 2 |
| [[sara = nil]] | **0** ← تتمسح، و [[apartment]] بتاعها بيروح | 1 |
| [[flat = nil]] | | **0** ← تتمسح |

- المتغيرين optional ([[Person?]]) عشان نقدر نحطهم [[nil]]. و [[sara?.]] لأنهم optional.

~~~text الناتج
سارة اتمسح
شقة 7 اتمسحت
~~~

**التجربة: من غير [[weak]]** على [[tenant]]: السطرين دول **مطلعوش خالص**. الشقة كانت ماسكة سارة بقوة، فعداد سارة بعد [[sara = nil]] بقى 1 مش 0، وسارة ماسكة الشقة، فالاتنين فضلوا في الذاكرة ومحدش يقدر يوصلهم. ده retain cycle = memory leak.

---

## ٤. [[Ticker]]: closure جوه class

~~~swift
final class Ticker {
  var onTick: (() -> Void)?
  var count = 0
  func start() {
    onTick = { [weak self] in
      self?.count += 1
    }
  }
  deinit { print("Ticker اتمسح") }
}
~~~

- [[var onTick: (() -> Void)?]]: property شايلة closure (optional). القوسين حوالين نوع الـ closure عشان الـ [[?]] تبقى على الـ closure كله.
- الـ object ماسك الـ closure (strong). ولو الـ closure استخدم [[self]] عادي، هيمسك الـ object (strong) = cycle.
- [[[weak self]]]: اسمها capture list، في أول الـ closure قبل [[in]]. بتقول «امسك self ضعيف». فـ [[self]] جوه بقت optional، عشان كده [[self?.count]].

~~~swift
var t: Ticker? = Ticker()
t?.start()
t?.onTick?()
print(t?.count ?? 0)
t = nil
~~~

- [[t?.onTick?()]]: [[t]] optional، و [[onTick]] نفسه optional، فـ [[?]] قبل [[()]]: «نادي الـ closure لو موجود». count بقى 1.
- [[t = nil]]: مفيش حد تاني ماسك الـ Ticker، فاتمسح.

~~~text الناتج
1
Ticker اتمسح
~~~

**التجربة: من غير [[[weak self]]]** وبـ [[self.count += 1]]: [[Ticker اتمسح]] **مطلعتش**. الـ object ماسك الـ closure في [[onTick]]، والـ closure ماسك الـ object.

~~~text الناتج كله (بالـ weak)
سارة اتمسح
شقة 7 اتمسحت
1
Ticker اتمسح
~~~

---

## الخلاصة

| النوع | بيزود العداد؟ | لو الـ object اتمسح | الشكل |
|---|---|---|---|
| strong (الافتراضي) | أيوه | مش هيتمسح طول ما انت ماسكه | [[var x: T]] |
| [[weak]] | لأ | يبقى [[nil]] لوحده | [[weak var x: T?]] |
| [[unowned]] | لأ | الوصول = **crash** | [[unowned let x: T]] |
| capture list | | | [[{ [weak self] in self?.f() }]] |

الـ cycle = اتنين ماسكين بعض بقوة. اكسره بـ [[weak]] في الاتجاه «الراجع» (الابن للأب، الـ delegate، الـ closure لـ self).`,
          lines: [
            "class (الـ ARC للـ classes بس).",
            "الاسم.",
            R`reference قوي للشقة.`,
            "init.",
            R`[[deinit]] بيتنادى لحظة المسح.`,
            "قفلة.",
            "class الشقة.",
            "رقم الشقة.",
            R`[[weak]]: مش بيزود العداد، و optional لأنه ممكن يبقى nil.`,
            "init.",
            "deinit.",
            "قفلة.",
            R`optional عشان نقدر نخليه nil بعدين.`,
            "شقة.",
            "سارة ماسكة الشقة بقوة.",
            "الشقة ماسكة سارة weak.",
            "مفيش strong reference لسارة، فتتمسح.",
            "والشقة كمان.",
            "class فيه closure متخزن.",
            "property بتشيل closure.",
            "عداد.",
            "method بتجهز الـ closure.",
            R`[[[weak self]]]: الـ closure ماسك self ضعيف.`,
            R`[[self?.]] لأن self بقت optional.`,
            "قفلة الـ closure.",
            "قفلة.",
            "deinit.",
            "قفلة.",
            "object.",
            "بنجهز الـ closure.",
            R`بننادي الـ closure. [[?()]] لأنه optional.`,
            "بيطبع 1.",
            "بيتمسح لأن مفيش cycle."
          ],
          sol: R`ناتج المثال:
[[سارة اتمسح]]
[[شقة 7 اتمسحت]]
[[1]]
[[Ticker اتمسح]]

من غير [[weak]] على [[tenant]]: ولا رسالة deinit بتطلع للتنين، لأن كل واحد ماسك التاني، رغم إن المتغيرين بقوا nil. ده leak.

ومن غير [[[weak self]]]: [[Ticker اتمسح]] مش بتطلع. الـ object ماسك الـ closure في [[onTick]]، والـ closure ماسك الـ object. وده نفس الـ leak بالظبط في view model بيخزن closure.`
        }
      ]
    }
]);
