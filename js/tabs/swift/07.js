// تكملة تاب swift: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/swift/01.js (شرح حقول الدرس في أوله)
MORE("swift", [
    {
      t: "الحالة والتنقل والفورمز",
      l: 2,
      n: "@State و @Binding و $، و @Observable و @Bindable و @Environment، و NavigationStack، و sheet و alert، و Form و TextField",
      items: [
        {
          cmd: "إدارة الحالة بـ State و Binding",
          title: "@State بتخلي الـ View يفتكر قيمة ويتحدث لما تتغير، و @Binding و $ بيدوا ابن حق يعدّلها",
          desc: R`الـ View struct، والـ struct بيتعمل من جديد كل شوية، فمينفعش يخزن قيمة بتتغير في [[var]] عادي. الحل [[@State]]: بتقول لـ SwiftUI «خزّنلي القيمة دي برة الـ struct، ولما تتغير احسب الـ [[body]] تاني». [[@State private var count = 0]]. ودايمًا [[private]] لأنها ملك الـ View ده بس.

الـ [[@State]] و [[@Binding]] اسمهم property wrappers: الـ [[@]] قبل الاسم بتلف الـ property بنوع بيضيف سلوك (هنا: التخزين والتحديث).

[[@Binding]]: لما View ابن محتاج يعدّل state بتاعة الأب. الابن مش بيملك القيمة، هو ماسك «وصلة» ليها: [[@Binding var value: Int]]. والأب بيبعت الوصلة بـ [[$]] قبل الاسم: [[StepperRow(value: $count)]].

الـ [[$]] قبل اسم state بيدّيك [[Binding]] (قراية وكتابة) بدل القيمة نفسها (قراية بس). وده اللي بتبعته لكل الـ controls اللي بتعدّل: [[Toggle("...", isOn: $isOn)]] و [[TextField("...", text: $name)]] و [[Slider(value: $volume)]].

القاعدة: كل قيمة ليها مالك واحد (source of truth). المالك عنده [[@State]]، واللي محتاج يقرا بس بياخد [[let]] عادي، واللي محتاج يعدّل بياخد [[@Binding]].

[[@State]] للقيم البسيطة المحلية في View واحد (رقم، نص، Bool، struct صغير). ولما الداتا تكبر أو تتشارك بين شاشات، هتستخدم [[@Observable]] (الدرس الجاي).`,
          example: R`import SwiftUI

struct CounterScreen: View {
  @State private var count = 0
  @State private var notify = false
  var body: some View {
    VStack(spacing: 16) {
      Text("العدد: \(count)")
        .font(.largeTitle)
      Button("زوّد") {
        count += 1
      }
      .buttonStyle(.borderedProminent)
      StepperRow(value: $count)
      Toggle("إشعارات", isOn: $notify)
      if notify {
        Text("هنبعتلك لما العدد يوصل 10")
      }
    }
    .padding()
  }
}

struct StepperRow: View {
  @Binding var value: Int
  var body: some View {
    HStack(spacing: 24) {
      Button("−") { value -= 1 }
        .disabled(value == 0)
      Text("\(value)")
      Button("+") { value += 1 }
    }
    .font(.title)
  }
}`,
          try: R`غيّر [[@Binding var value]] في [[StepperRow]] لـ [[let value: Int]] وابعتله [[count]] من غير [[$]]. هتلاقي إيه؟ وبعدين ضيف [[TextField("اسمك", text: $name)]] بـ [[@State private var name = ""]] و [[Text("أهلًا \(name)")]] بيتحدث مع كل حرف.`,
          flag: "script",
          deep: {
            why: R`ده قلب SwiftUI: الواجهة = دالة من الحالة. انت مش بتحدث النص بإيدك لما العدد يزيد، انت بتغيّر [[count]] بس، و SwiftUI بتعرف مين معتمد عليه وتحدثه. ومع [[@Binding]] الابن والأب شايفين نفس القيمة، فمستحيل الاتنين يبقوا مختلفين.`,
            how: R`[[@State]] بيخزن القيمة في storage خاص بـ SwiftUI مربوط بمكان الـ View في الشجرة، مش في الـ struct. لما الـ struct يتعمل من جديد، بيتوصل بنفس الـ storage. وده سبب إن الـ [[@State]] بيتعمل initialize مرة واحدة بس: القيمة اللي في التعريف بتتستخدم أول مرة بس.

[[$count]] بيرجّع [[Binding<Int>]]: struct فيه getter و setter بيقروا ويكتبوا في الـ storage الأصلي. و [[@Binding]] بيلف [[Binding]] ده، فـ [[value += 1]] بتكتب في [[count]] بتاع الأب.

لما [[notify]] تبقى true، الـ [[if]] جوه [[body]] بيضيف الـ Text، ولما ترجع false بيشيله. ده الـ conditional rendering في SwiftUI.`,
            when: R`[[@State]] لحالة الـ UI المحلية: النص اللي بيتكتب، زرار شغال ولا لأ، sheet ظاهر ولا لأ، التاب المختار. و [[@Binding]] لما تقسّم View كبير لأجزاء وجزء محتاج يعدّل حالة الأب.`,
            mistakes: R`تعمل [[@State]] مش [[private]] وتبعتله قيمة من الأب، وتستغرب إنها مبتتحدثش لما الأب يتغير (الـ State بيتعمل مرة واحدة بس). وتعمل [[@State]] في الابن وفي الأب لنفس القيمة: كده بقى عندك نسختين مختلفتين، والصح [[@Binding]] في الابن. وتحط class عادي في [[@State]] وتستنى التحديث: لازم يبقى [[@Observable]].`
          },
          teach: R`## الكود ده بيعمل إيه؟

شاشة عدّاد: رقم كبير، وزرار «زوّد»، وتحتهم صف فيه [[−]] والرقم و [[+]] (View ابن منفصل اسمه [[StepperRow]])، و Toggle للإشعارات بيظهر نص لما يتفتح. الزرارين والصف كلهم بيغيّروا **نفس** العدد.

> [[@State]] و [[@Binding]] و [[Button]] و [[Toggle]] SwiftUI على الماك بس، فسلوك الشاشة هنا من docs بتاعة Apple. اللي اتجرّب بجد في Swift 6.4 على لينكس: خطأ الـ compiler بتاع [[let]]، و stand-in صغير لـ [[Binding]] (نوع عملناه بإيدنا بنفس الفكرة، مش SwiftUI الحقيقية) عشان تشوف إزاي الابن بيكتب في قيمة الأب.

---

## ١. [[@State private var count = 0]]

~~~swift
struct CounterScreen: View {
  @State private var count = 0
  @State private var notify = false
~~~

- الـ View struct، و SwiftUI بترميه وتعمله من جديد كل شوية. فلو [[count]] كان [[var]] عادي هيرجع صفر كل مرة.
- [[@State]] property wrapper (الـ [[@]] بتلف الـ property بنوع بيزود سلوك): القيمة بتتخزن **برة** الـ struct في مكان SwiftUI ماسكاه، ولما تتغير SwiftUI بتحسب [[body]] تاني.
- [[private]]: القيمة ملك الشاشة دي بس، محدش من برة يبعتها.
- [[= 0]] القيمة الأولى، وبتتستخدم أول مرة بس.

---

## ٢. قراية الـ state والزرار

~~~swift
      Text("العدد: \(count)")
        .font(.largeTitle)
      Button("زوّد") {
        count += 1
      }
      .buttonStyle(.borderedProminent)
~~~

- [[\(count)]] جوه النص: string interpolation، بيحط قيمة [[count]] في النص. ولأن [[body]] قرا [[count]]، SwiftUI عارفة إن النص ده لازم يتحدث لما [[count]] يتغير.
- [[Button("زوّد") { ... }]]: العنوان، وبعده trailing closure (closure بعد القوسين) بيتنفذ عند الضغط.
- [[count += 1]]: انت بتغيّر الداتا بس، مش بتلمس النص. SwiftUI بتعيد حساب [[body]] فالنص يتحدث.
- [[.borderedProminent]]: زرار بخلفية ملونة.

---

## ٣. [[$count]]: وصلة للابن

~~~swift
      StepperRow(value: $count)
      Toggle("إشعارات", isOn: $notify)
~~~

- [[count]] لوحده = القيمة (قراية بس).
- [[$count]] = [[Binding<Int>]]: «وصلة» فيها طريقة تقرا القيمة وطريقة تكتبها. فالابن يقدر يعدّلها.
- [[Toggle]] كمان محتاج يكتب (لما المستخدم يقلبه)، فبياخد [[$notify]].

إزاي الوصلة دي شغالة؟ عملنا نسخة بسيطة منها في Swift عادي:

~~~swift
struct Binding<Value> {
  let get: () -> Value
  let set: (Value) -> Void
  var wrappedValue: Value {
    get { get() }
    nonmutating set { set(newValue) }
  }
}
final class Storage { var count = 0 }
let storage = Storage()
let countBinding = Binding(get: { storage.count }, set: { storage.count = $0 })
countBinding.wrappedValue += 1
countBinding.wrappedValue += 1
print("count في الـ storage:", storage.count)
~~~

~~~text الناتج (Swift 6.4، لينكس)
count في الـ storage: 2
~~~

- [[Storage]] هنا بيمثل المكان اللي [[@State]] شايل فيه القيمة.
- الـ Binding نفسه مش شايل رقم. هو closure بيقرا ([[get]]) و closure بيكتب ([[set]]) في الـ storage الأصلي.
- [[nonmutating set]]: الكتابة مش بتغيّر الـ Binding نفسه، بتغيّر الـ storage اللي بيشاور عليه. وعشان كده الابن يقدر يكتب حتى لو الـ Binding [[let]].

---

## ٤. الـ [[if]] جوه [[body]]

~~~swift
      if notify {
        Text("هنبعتلك لما العدد يوصل 10")
      }
~~~

لما [[notify]] تبقى [[true]] النص بيتضاف للشاشة، ولما ترجع [[false]] بيتشال. مفيش [[isHidden]] زي UIKit: الشاشة دايمًا بتتوصف من الحالة الحالية.

---

## ٥. الابن: [[@Binding var value: Int]]

~~~swift
struct StepperRow: View {
  @Binding var value: Int
  var body: some View {
    HStack(spacing: 24) {
      Button("−") { value -= 1 }
        .disabled(value == 0)
      Text("\(value)")
      Button("+") { value += 1 }
    }
    .font(.title)
  }
}
~~~

- [[@Binding]]: الابن **مش** مالك القيمة، ماسك وصلة ليها. [[value += 1]] بتكتب في [[count]] بتاع الأب، فالرقم الكبير فوق بيتحدث هو كمان.
- [[.disabled(value == 0)]]: الزرار مقفول لو القيمة صفر. [[==]] مقارنة بترجّع Bool.
- [[.font(.title)]] على الـ HStack: بتنزل للتلات حاجات اللي جواه.

---

## ٦. الـ try: لو خليته [[let]]

لو غيّرت [[@Binding var value]] لـ [[let value: Int]]، الابن بقى بياخد نسخة من الرقم مش وصلة. جربنا نفس السطر في Swift عادي:

~~~swift
struct StepperRow {
  let value: Int
  func dec() { value -= 1 }
}
~~~

~~~text الناتج (Swift 6.4، لينكس)
letmut.swift:3:22: error: left side of mutating operator isn't mutable: 'value' is a 'let' constant
~~~

يعني «الحاجة اللي على شمال [[-=]] مينفعش تتغير، [[value]] ثابت». نفس الرسالة اللي في الـ sol.

---

## الخلاصة

| اللي محتاجه | تكتب إيه |
|---|---|
| View مالك قيمة بتتغير | [[@State private var x = ...]] |
| ابن بيقرا بس | [[let x: Int]] وتبعتله [[x]] |
| ابن بيعدّل قيمة الأب | [[@Binding var x: Int]] وتبعتله [[$x]] |
| control بيكتب (Toggle، TextField) | [[$x]] |

- كل قيمة ليها مالك واحد بس (source of truth). متعملش [[@State]] للقيمة نفسها في الأب والابن.
- [[$]] قبل اسم state = Binding (قراية وكتابة).`,
          lines: [
            "SwiftUI.",
            "الشاشة.",
            R`[[@State]]: SwiftUI بتخزن العدد وتحدث الشاشة لما يتغير.`,
            "state تانية.",
            "body.",
            "عمود.",
            "بيقرا الـ state.",
            "خط كبير.",
            R`[[Button]] بعنوان، والـ closure اللي بيتنفذ عند الضغط (trailing closure).`,
            "تغيير الـ state بيعيد حساب body.",
            "قفلة الـ closure.",
            "زرار بخلفية ملونة.",
            R`[[$count]]: Binding للابن عشان يعدّل.`,
            R`[[Toggle]] محتاج Binding لـ Bool.`,
            R`[[if]] جوه body: بيظهر بس لو notify صح.`,
            "النص.",
            "قفلة if.",
            "قفلة VStack.",
            "مسافة.",
            "قفلة body.",
            "قفلة الـ struct.",
            "View ابن.",
            R`[[@Binding]]: مش مالك القيمة، ماسك وصلة ليها.`,
            "body.",
            "صف.",
            "بيقلل.",
            "مقفول لو صفر.",
            "بيعرض القيمة.",
            R`بيزود، والتعديل بيوصل لـ [[count]] بتاع الأب.`,
            "قفلة HStack.",
            "خط كبير للصف.",
            "قفلة body.",
            "قفلة الـ struct."
          ],
          sol: R`بـ [[let value: Int]] الأزرار نفسها مش هتترجم: [[value -= 1]] بيطلع [[left side of mutating operator isn't mutable: 'value' is a 'let' constant]]. ولو شيلت الأزرار وسبت العرض بس، هيشتغل: الأب بيبعت القيمة والابن بيعرضها ويتحدث لما الأب يتغير، بس مش هيقدر يعدّل. عشان كده [[let]] للقراية و [[@Binding]] للتعديل.

الـ TextField:`,
          solCode: R`@State private var name = ""

// جوه الـ VStack
TextField("اسمك", text: $name)
  .textFieldStyle(.roundedBorder)
Text("أهلًا \(name)")`
        },
        {
          cmd: "@Observable و @Environment",
          title: "تشارك داتا بين شاشات بـ @Observable class، وتوزعها بـ @Environment، وتعمل bindings منها بـ @Bindable",
          desc: R`[[@State]] كويس لقيمة صغيرة في View واحد. بس لو عندك داتا أكبر (سلة مشتريات، المستخدم الحالي، إعدادات) كذا شاشة محتاجاها، بتعملها [[class]] وتعلّمها بـ [[@Observable]] (iOS 17 وما بعده، من framework اسمه Observation).

[[@Observable]] macro بيخلي SwiftUI تتابع كل property: أي View قرا [[store.items]] في الـ body بتاعه هيتحدث لما [[items]] تتغير، والـ Views اللي مقرتش [[items]] مش هتتحدث. مش محتاج تعلّم كل property بحاجة.

3 حاجات تعرفها:
1. مين يملك الـ object: الـ View اللي بيعمله بيحطه في [[@State]]: [[@State private var store = CartStore()]]. كده بيتعمل مرة واحدة ويعيش طول عمر الـ View.
2. توزيعه: [[.environment(store)]] على View بيحطه لكل الأولاد تحته. وأي ابن بياخده بـ [[@Environment(CartStore.self) private var store]] من غير ما يتبعت من شاشة لشاشة.
3. bindings: لو View استلم الـ object وعايز يعمل [[TextField]] مربوط بـ property فيه، بيستخدم [[@Bindable var profile: Profile]] وبعدين [[$profile.name]]. ولو جاي من environment: [[@Bindable var store = store]] جوه الـ body.

الكود القديم (قبل iOS 17، ولسه موجود في مشاريع كتير هتشتغل عليها): [[ObservableObject]] و [[@Published]] على كل property، و [[@StateObject]] و [[@ObservedObject]] و [[@EnvironmentObject]]. لو هتدعم iOS 16 أو بتشتغل على كود قديم هتقابلهم. الكود الجديد: [[@Observable]].`,
          example: R`import SwiftUI

@Observable
final class CartStore {
  var items: [String] = []
  var couponCode = ""
  var total: Int { items.count * 50 }
  func add(_ item: String) {
    items.append(item)
  }
}

struct ShopScreen: View {
  @State private var store = CartStore()
  var body: some View {
    VStack(spacing: 16) {
      Button("ضيف قلم") { store.add("قلم") }
      CartSummary()
      CouponField(store: store)
    }
    .environment(store)
    .padding()
  }
}

struct CartSummary: View {
  @Environment(CartStore.self) private var store
  var body: some View {
    Text("\(store.items.count) منتج بـ \(store.total) جنيه")
  }
}

struct CouponField: View {
  @Bindable var store: CartStore
  var body: some View {
    TextField("كود الخصم", text: $store.couponCode)
      .textFieldStyle(.roundedBorder)
  }
}`,
          try: R`ضيف View تالت اسمه [[CartBadge]] بياخد الـ store من الـ environment ويعرض العدد بس في دايرة حمرا. وجرّب تشيل [[.environment(store)]]: إيه اللي هيحصل لما الشاشة تفتح؟`,
          flag: "script",
          deep: {
            why: R`من غير مكان مشترك للداتا هتلاقي نفسك بتبعت نفس الـ object من شاشة لشاشة لشاشة (prop drilling)، أو كل شاشة عندها نسخة مختلفة. [[@Observable]] + environment بيحلوا الاتنين. وأحسن من [[ObservableObject]] القديم في الأداء: القديم كان بيحدث أي View بيراقب الـ object لما أي [[@Published]] تتغير، والجديد بيحدث بس اللي قرا الـ property اللي اتغيرت.`,
            how: R`الـ macro [[@Observable]] بيعيد كتابة كل stored property بحيث القراية تسجل «مين قرا»، والكتابة تبلغ اللي قروا. SwiftUI وهي بتحسب [[body]] بتسجل كل property اتقرت، فلما واحدة تتغير بتعيد حساب الـ Views دي بس. والـ computed [[total]] بيتراقب من خلال [[items]] اللي بيقراها.

لازم [[class]] (مش struct) لأن كل الشاشات لازم تشوف نفس الـ object. و [[@State]] هنا مش بيراقب (المراقبة من [[@Observable]])، هو بس بيضمن إن الـ object ميتعملش من جديد كل ما الـ View يتعمل.

[[@Environment(CartStore.self)]]: لو الـ object مش موجود في الـ environment التطبيق بيقع وقت التشغيل برسالة إن مفيش Observable من النوع ده. وفيه شكل optional: [[@Environment(CartStore.self) private var store: CartStore?]].`,
            when: R`[[@Observable]] لأي state مشتركة أو فيها logic: view models، والـ stores، والمستخدم الحالي، والإعدادات. وحطه في environment لما Views كتير بعيدة عن بعض محتاجاه. ولو View واحد بس محتاجه، ابعته كـ parameter عادي أوضح.`,
            mistakes: R`تعمل [[let store = CartStore()]] جوه الـ View من غير [[@State]] (أو كـ default parameter): كل مرة الـ View يتعمل هيتعمل store جديد والداتا تضيع. وتنسى [[.environment(store)]] على الأب (أو على الـ Preview) فيقع. وتخلط القديم بالجديد: [[@StateObject]] مع [[@Observable]] class مش هيشتغل صح.`
          },
          teach: R`## الكود ده بيعمل إيه؟

سلة مشتريات ([[CartStore]]) بتتشارك بين ٣ Views: الشاشة الأب بتعملها وفيها زرار «ضيف قلم»، و [[CartSummary]] بيعرض العدد والإجمالي وبياخد السلة من الـ environment، و [[CouponField]] فيه خانة كود خصم مربوطة بخانة جوه السلة.

> الـ Views و [[@Environment]] و [[@Bindable]] SwiftUI على الماك بس، فدول من docs بتاعة Apple. لكن [[@Observable]] نفسه من framework اسمه **Observation** وده موجود في Swift على لينكس، فجربنا [[CartStore]] بجد في Swift 6.4 (Docker) وشفنا إمتى الـ «View» بيتبلّغ إن حاجة اتغيرت.

---

## ١. الـ class: [[@Observable final class CartStore]]

~~~swift
@Observable
final class CartStore {
  var items: [String] = []
  var couponCode = ""
  var total: Int { items.count * 50 }
  func add(_ item: String) {
    items.append(item)
  }
}
~~~

- [[@Observable]]: macro (كود بيتولد وقت الـ compile) بيعيد كتابة كل [[var]] مخزّن بحيث: القراية بتسجّل «مين قرا»، والكتابة بتبلّغ اللي قروا.
- [[final class]]: class (مش struct) عشان كل الشاشات تشاور على **نفس** الـ object. و [[final]] = محدش يورث منه.
- [[var items]]: array نصوص ([[String]]) بتبدأ فاضية.
- [[var total: Int { ... }]]: computed property: مش متخزنة، بتتحسب كل ما حد يقراها (٥٠ جنيه لكل منتج). ولأنها بتقرا [[items]]، أي حد قرا [[total]] بيتسجّل كأنه قرا [[items]].
- [[func add(_ item:)]]: الـ [[_]] معناها «من غير label وانت بتنادي»: [[store.add("قلم")]].

### جربناه من غير SwiftUI

[[withObservationTracking]] هي الدالة اللي SwiftUI بتستخدم نفس فكرتها وهي بتحسب [[body]]: بتشغّل الكود الأول وتسجّل اللي اتقرا، ولما حاجة منهم تتغير بتنادي [[onChange]] مرة واحدة.

~~~swift
import Observation

let store = CartStore()
withObservationTracking {
  print("الـ summary قرا:", store.items.count, store.total)
} onChange: {
  print("items اتغيرت، الـ summary محتاج يتحسب تاني")
}
store.couponCode = "SAVE10"
print("غيّرنا couponCode بس")
store.add("قلم")
print("بعد add:", store.items, store.total)
~~~

~~~text الناتج (Swift 6.4، لينكس)
الـ summary قرا: 0 0
غيّرنا couponCode بس
items اتغيرت، الـ summary محتاج يتحسب تاني
بعد add: ["قلم"] 50
~~~

نقرا الناتج:

1. الكود الأول قرا [[items]] و [[total]] (و [[total]] بيقرا [[items]]).
2. تغيير [[couponCode]] **مبلّغش** حد: الـ «summary» مقراهاش. وده الفرق عن [[ObservableObject]] القديم اللي كان بيحدث أي View بيراقب الـ object مع أي تغيير.
3. [[add]] غيّرت [[items]]، فـ [[onChange]] اتنادت. ده اللي بيخلي [[CartSummary]] يتحسب تاني.

---

## ٢. المالك: [[@State private var store = CartStore()]]

~~~swift
struct ShopScreen: View {
  @State private var store = CartStore()
  var body: some View {
    VStack(spacing: 16) {
      Button("ضيف قلم") { store.add("قلم") }
      CartSummary()
      CouponField(store: store)
    }
    .environment(store)
    .padding()
  }
}
~~~

- [[@State]] هنا مش هو اللي بيراقب (المراقبة من [[@Observable]]). وظيفته إن الـ object يتعمل **مرة واحدة** ويفضل عايش، حتى لو الـ struct اتعمل من جديد.
- [[CartSummary()]] من غير parameters: هياخد السلة من الـ environment.
- [[CouponField(store: store)]]: هنا بنبعتها parameter عادي.
- [[.environment(store)]]: بيحط الـ object في الـ environment، فأي View **تحت** الـ VStack يقدر ياخده.

---

## ٣. [[@Environment(CartStore.self)]]

~~~swift
struct CartSummary: View {
  @Environment(CartStore.self) private var store
  var body: some View {
    Text("\(store.items.count) منتج بـ \(store.total) جنيه")
  }
}
~~~

- [[CartStore.self]]: النوع نفسه كقيمة (مش object منه). يعني «هات من الـ environment الـ object اللي نوعه CartStore».
- الـ [[body]] بيقرا [[items]] و [[total]]، فده بالظبط اللي شفناه في التجربة: هيتحدث مع [[add]]، ومش هيتحدث مع كتابة كود الخصم.
- لو نسيت [[.environment(store)]] فوق، التطبيق بيقع وقت التشغيل (حسب docs بتاعة Apple)، لأن مفيش object من النوع ده.

---

## ٤. [[@Bindable]] و [[$store.couponCode]]

~~~swift
struct CouponField: View {
  @Bindable var store: CartStore
  var body: some View {
    TextField("كود الخصم", text: $store.couponCode)
      .textFieldStyle(.roundedBorder)
  }
}
~~~

- [[TextField]] محتاج Binding عشان يكتب. بس [[store]] object عادي مش [[@State]]، فمفيش [[$]].
- [[@Bindable]] بيدّيك [[$store.couponCode]]: Binding لخانة جوه الـ object. كل حرف بيتكتب بيروح لـ [[store.couponCode]].
- [[.roundedBorder]]: خانة بإطار مدور.

---

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| [[@Observable]] | الـ class بيتراقب خانة خانة |
| [[@State]] على الـ object | يتعمل مرة واحدة ويفضل عايش |
| [[.environment(obj)]] | يحطه لكل اللي تحت |
| [[@Environment(T.self)]] | ياخده من فوق |
| [[@Bindable]] | يعمل [[$obj.field]] |

- الـ View بيتحدث بس لما خانة **قراها** تتغير.
- القديم ([[ObservableObject]] و [[@Published]] و [[@StateObject]]) هتقابله في مشاريع قديمة، بس متخلطهوش مع [[@Observable]].`,
          lines: [
            "SwiftUI (بتجيب Observation معاها).",
            R`[[@Observable]]: SwiftUI هتتابع كل property في الـ class.`,
            R`[[class]] عشان كل الشاشات تشوف نفس الـ object.`,
            "المنتجات.",
            "كود الخصم.",
            "computed، بيتراقب من خلال items.",
            "method بتعدّل.",
            "تغيير بيوصل لكل View قرا items.",
            "قفلة.",
            "قفلة الـ class.",
            "الشاشة الأب.",
            R`[[@State]]: الـ View ده مالك الـ store ومش هيتعمل من جديد.`,
            "body.",
            "عمود.",
            "زرار بيضيف.",
            "View بياخد الـ store من الـ environment.",
            "View بياخده كـ parameter.",
            "قفلة VStack.",
            R`[[.environment(store)]] بيحطه لكل اللي تحت.`,
            "مسافة.",
            "قفلة body.",
            "قفلة.",
            "View الملخص.",
            R`[[@Environment(CartStore.self)]]: هات الـ object من النوع ده.`,
            "body.",
            "بيقرا items و total، فهيتحدث لما يتغيروا.",
            "قفلة body.",
            "قفلة.",
            "View كود الخصم.",
            R`[[@Bindable]]: عشان نقدر نعمل [[$store.couponCode]].`,
            "body.",
            R`[[$store.couponCode]] Binding لـ property جوه الـ object.`,
            "شكل الخانة.",
            "قفلة body.",
            "قفلة."
          ],
          sol: R`من غير [[.environment(store)]]: الشاشة بتقع أول ما [[CartSummary]] يتعرض، برسالة معناها إن مفيش object من نوع [[CartStore]] في الـ environment. وده نفس اللي بيحصل في الـ Preview لو نسيت تحطه هناك.

الـ badge:`,
          solCode: R`struct CartBadge: View {
  @Environment(CartStore.self) private var store
  var body: some View {
    Text("\(store.items.count)")
      .font(.caption.bold())
      .foregroundStyle(.white)
      .frame(width: 24, height: 24)
      .background(.red, in: .circle)
  }
}

#Preview {
  CartBadge()
    .environment(CartStore())
}`
        },
        {
          cmd: "NavigationStack والتنقل",
          title: "تتنقل بين الشاشات بـ NavigationStack و NavigationLink(value:) و navigationDestination، وترجع بالكود",
          desc: R`[[NavigationStack]] بيعمل شريط فوق وبيسمح بالدخول لشاشات جوه بعض (push) والرجوع بزرار Back أو بالسحب من الطرف.

الطريقة الحديثة (iOS 16 وما بعده) بتفصل «رايح فين» عن «الشاشة شكلها إيه»:
1. [[NavigationLink(value: product) { Text(product.name) }]]: لما يتضغط بيحط [[product]] في الـ stack.
2. [[.navigationDestination(for: Product.self) { product in ProductDetail(product: product) }]]: بيقول «أي قيمة من النوع ده، اعرضها بالشاشة دي». بيتحط مرة واحدة جوه الـ NavigationStack (مش جوه List أو ForEach lazy).

القيمة لازم تبقى [[Hashable]] (Swift بتعملها لوحدها للـ struct لو كل properties بتاعته Hashable).

تتحكم في التنقل من الكود: اربط الـ stack بـ path: [[NavigationStack(path: $path)]] و [[@State private var path: [Product] = []]]. [[path.append(p)]] بتفتح شاشة، و [[path.removeLast()]] بترجع واحدة، و [[path.removeAll()]] بترجع للأول. ولو الشاشات من أنواع مختلفة استخدم [[NavigationPath]].

[[.navigationTitle("...")]] بيتحط على المحتوى اللي جوه الـ stack (مش على الـ stack نفسه). و [[.toolbar { }]] لأزرار الشريط.

[[NavigationView]] القديم deprecated، متستخدموش في كود جديد. وللـ iPad والماك فيه [[NavigationSplitView]] (عمودين أو تلاتة).`,
          example: R`import SwiftUI

struct Product: Identifiable, Hashable {
  let id: Int
  let name: String
  let price: Int
}

struct ProductsScreen: View {
  let products = [
    Product(id: 1, name: "سماعة", price: 450),
    Product(id: 2, name: "شاحن", price: 200),
  ]
  @State private var path: [Product] = []
  var body: some View {
    NavigationStack(path: $path) {
      List(products) { product in
        NavigationLink(value: product) {
          Text(product.name)
        }
      }
      .navigationTitle("المنتجات")
      .navigationDestination(for: Product.self) { product in
        ProductDetail(product: product) {
          path.removeAll()
        }
      }
    }
  }
}

struct ProductDetail: View {
  let product: Product
  let onBuy: () -> Void
  var body: some View {
    VStack(spacing: 16) {
      Text("\(product.price) جنيه").font(.largeTitle)
      Button("اشتري وارجع للقايمة", action: onBuy)
    }
    .navigationTitle(product.name)
    .navigationBarTitleDisplayMode(.inline)
  }
}`,
          try: R`ضيف في [[ProductDetail]] زرار «منتجات مشابهة» بيعمل [[NavigationLink(value:)]] لمنتج تاني، وادخل 3 شاشات جوه بعض، وبعدين اضغط «اشتري وارجع للقايمة». وبعدين ضيف زرار في [[.toolbar]] بتاع القايمة بيفتح أرخص منتج بـ [[path.append]].`,
          flag: "script",
          deep: {
            why: R`فصل الـ value عن الـ destination بيخلي التنقل داتا عادية: تقدر تحفظ الـ path وترجّعه، وتفتح شاشة جوه من deep link أو إشعار ([[path = [product]]])، وتختبر التنقل من غير UI. الطريقة القديمة ([[NavigationLink(destination:)]]) كانت بتعمل الشاشة الجاية مقدمًا لكل صف وصعب تتحكم فيها.`,
            how: R`الـ NavigationStack بيقرا الـ path: كل عنصر فيه = شاشة متكومة. الضغط على [[NavigationLink(value:)]] بيضيف القيمة للـ path (لو مربوط) أو لـ path داخلي. و [[navigationDestination]] بيحوّل كل قيمة لـ View.

الزرار بيبعت للشاشة الجاية closure [[onBuy]] بدل ما يبعتلها الـ path نفسه، فـ [[ProductDetail]] مش محتاج يعرف حاجة عن التنقل. و [[Button("...", action: onBuy)]] بياخد الـ closure مباشرة.

[[.navigationBarTitleDisplayMode(.inline)]] بيخلي العنوان صغير في النص بدل الكبير.`,
            when: R`[[NavigationStack]] لأي تطبيق فيه قايمة وتفاصيل. وفي التطبيقات اللي فيها tabs، كل تاب ليه NavigationStack بتاعه جوه [[TabView]] (مش العكس). و [[NavigationSplitView]] لو هتدعم iPad بشكل كويس.`,
            mistakes: R`تحط [[NavigationStack]] جوه كل شاشة فيتكوم شريطين فوق بعض: واحد بس في أعلى الشجرة. وتحط [[navigationDestination]] جوه [[List]] أو [[ForEach]] فيطلع تحذير ومش بيشتغل صح. وتنسى [[Hashable]] على النوع. وتحط [[.navigationTitle]] على الـ NavigationStack من برة فمبيظهرش.`
          },
          teach: R`## الكود ده بيعمل إيه؟

قايمة منتجات (سماعة وشاحن). لما تدوس على منتج بتدخل شاشة تفاصيله، وفيها زرار «اشتري وارجع للقايمة» بيرجّعك لأول شاشة مرة واحدة مهما كنت داخل كام شاشة جوه بعض.

> [[NavigationStack]] و [[NavigationLink]] و [[navigationDestination]] SwiftUI على الماك بس، فسلوك التنقل هنا من docs بتاعة Apple. اللي اتجرّب بجد في Swift 6.4 على لينكس: الـ [[Product]] و [[Hashable]] والـ [[path]] كـ array عادية ([[append]] و [[removeLast]] و [[removeAll]]) و [[min(by:)]] من الـ solCode. ودي بالظبط الفكرة: التنقل هنا مجرد array.

---

## ١. القيمة اللي بنتنقل بيها: [[Product]]

~~~swift
struct Product: Identifiable, Hashable {
  let id: Int
  let name: String
  let price: Int
}
~~~

- [[Identifiable]]: عشان [[List(products)]] تعرف كل صف.
- [[Hashable]]: النوع ينفع يتحسب له hash (رقم بيلخّصه) ويتقارن بـ [[==]]. الـ NavigationStack محتاجه عشان يتابع القيم اللي في الـ path. Swift بتعمله لوحدها لأن كل الخانات [[Int]] و [[String]] (وهما Hashable).

جربنا:

~~~swift
print(products[0] == Product(id: 1, name: "سماعة", price: 450))
print(Set(products).count)
~~~

~~~text الناتج (Swift 6.4، لينكس)
true
2
~~~

ولو شلت [[Hashable]] وحاولت تحطه في [[Set]] (اللي محتاج Hashable زي الـ path):

~~~text الناتج
error: type 'Product' does not conform to protocol 'Hashable'
~~~

---

## ٢. الـ path

~~~swift
  @State private var path: [Product] = []
~~~

array فاضية من المنتجات = الشاشات المفتوحة فوق القايمة. فاضية = انت على القايمة. فيها منتج = شاشة تفاصيل واحدة مفتوحة. [[@State]] عشان لما تتغير الشاشة تتحدث.

ده اللي بيحصل للـ path نفسه (array عادية) لما تدخل وترجع:

~~~swift
path.append(products[0])
path.append(products[1])
print(path.map(\.name))
path.removeLast()
print(path.map(\.name))
path.removeAll()
print(path.count)
~~~

~~~text الناتج
["سماعة", "شاحن"]
["سماعة"]
0
~~~

| العملية | في التطبيق |
|---|---|
| [[path.append(p)]] | فتح شاشة جديدة فوق |
| [[path.removeLast()]] | رجوع شاشة (زي Back) |
| [[path.removeAll()]] | رجوع للقايمة على طول |

---

## ٣. [[NavigationStack(path: $path)]] و [[List]]

~~~swift
    NavigationStack(path: $path) {
      List(products) { product in
        NavigationLink(value: product) {
          Text(product.name)
        }
      }
      .navigationTitle("المنتجات")
~~~

- [[NavigationStack]]: بيعمل شريط العنوان فوق ويسمح بالدخول والرجوع.
- [[path: $path]]: [[$]] = Binding، فالـ stack بيقرا الـ path ويكتب فيه (لما تدوس Back بيشيل آخر عنصر لوحده).
- [[List(products) { product in ... }]]: صف لكل منتج.
- [[NavigationLink(value: product)]]: صف بيتداس. لما يتداس بيعمل [[path.append(product)]]. هو مش عارف الشاشة الجاية شكلها إيه، بيحط قيمة بس.
- [[.navigationTitle("المنتجات")]] على الـ List (المحتوى اللي جوه الـ stack)، مش على الـ stack نفسه.

---

## ٤. [[navigationDestination]]: القيمة دي تتعرض إزاي

~~~swift
      .navigationDestination(for: Product.self) { product in
        ProductDetail(product: product) {
          path.removeAll()
        }
      }
    }
~~~

- [[for: Product.self]]: «أي [[Product]] يتحط في الـ path». [[.self]] = النوع نفسه.
- الـ closure بياخد المنتج ويرجّع الشاشة.
- [[ProductDetail(product:) { ... }]]: الـ closure الأخير trailing closure بيتبعت لـ [[onBuy]]. جواه [[path.removeAll()]] فبيرجع للقايمة.
- بيتحط مرة واحدة على حاجة جوه الـ stack، مش جوه [[ForEach]] أو الصفوف.

---

## ٥. شاشة التفاصيل

~~~swift
struct ProductDetail: View {
  let product: Product
  let onBuy: () -> Void
  var body: some View {
    VStack(spacing: 16) {
      Text("\(product.price) جنيه").font(.largeTitle)
      Button("اشتري وارجع للقايمة", action: onBuy)
    }
    .navigationTitle(product.name)
    .navigationBarTitleDisplayMode(.inline)
  }
}
~~~

- [[() -> Void]]: نوع دالة مش بتاخد حاجة ([[()]]) ومش بترجّع حاجة ([[Void]]). الشاشة دي مش عارفة حاجة عن الـ path، بتنادي [[onBuy]] بس.
- [[Button("...", action: onBuy)]]: بنبعت الدالة للزرار مباشرة بدل [[{ onBuy() }]].
- [[.navigationBarTitleDisplayMode(.inline)]]: عنوان صغير في نص الشريط بدل الكبير.

---

## ٦. الـ solCode: أرخص منتج

~~~swift
if let cheapest = products.min(by: { $0.price < $1.price }) {
  path.append(cheapest)
}
~~~

[[min(by:)]] بيدور على أصغر عنصر، والـ closure بيقول «إمتى [[$0]] أصغر من [[$1]]»: لما سعره أقل. وبيرجّع optional لأن الـ array ممكن تبقى فاضية، فبنفكه بـ [[if let]].

~~~text الناتج
["شاحن"]
~~~

الشاحن (٢٠٠) أرخص من السماعة (٤٥٠)، فالـ path بقى فيه الشاحن = شاشة تفاصيله مفتوحة. و [[.toolbar { }]] بيحط الزرار في الشريط فوق.

## الخلاصة

- [[NavigationLink(value:)]] بيحط قيمة، و [[navigationDestination(for:)]] بيقول تتعرض إزاي.
- الـ path array عادية: تفتح وترجع بالكود بـ [[append]] و [[removeLast]] و [[removeAll]].
- القيمة لازم [[Hashable]]، و NavigationStack واحد بس في أعلى الشجرة.`,
          lines: [
            "SwiftUI.",
            R`[[Hashable]] لازم عشان القيمة تتحط في الـ path.`,
            "id.",
            "الاسم.",
            "السعر.",
            "قفلة.",
            "شاشة القايمة.",
            "داتا ثابتة للتجربة.",
            "منتج.",
            "منتج.",
            "قفلة.",
            R`الـ path: الشاشات المفتوحة حاليًا.`,
            "body.",
            R`[[NavigationStack]] مربوط بالـ path.`,
            "قايمة.",
            R`[[NavigationLink(value:)]]: الضغط بيحط المنتج في الـ path.`,
            "شكل الصف.",
            "قفلة الـ link.",
            "قفلة الـ List.",
            R`العنوان على المحتوى.`,
            R`أي [[Product]] في الـ path يتعرض بالشاشة دي.`,
            R`شاشة التفاصيل، ومعاها closure.`,
            R`[[removeAll]] بيرجع لأول شاشة.`,
            "قفلة الـ closure.",
            "قفلة navigationDestination.",
            "قفلة NavigationStack.",
            "قفلة body.",
            "قفلة.",
            "شاشة التفاصيل.",
            "المنتج.",
            R`closure من الأب، نوعه [[() -> Void]].`,
            "body.",
            "عمود.",
            "السعر بخط كبير.",
            R`[[action: onBuy]] بيبعت الـ closure للزرار مباشرة.`,
            "قفلة.",
            "العنوان اسم المنتج.",
            "عنوان صغير في النص.",
            "قفلة body.",
            "قفلة."
          ],
          sol: R`لما تدخل 3 شاشات وتضغط «اشتري وارجع للقايمة»، [[path.removeAll()]] بيفضّي الـ path فبترجع للقايمة مرة واحدة بـ animation.

الإضافات:`,
          solCode: R`// في ProductDetail جوه VStack (محتاج products أو منتج تاني يتبعت)
NavigationLink("منتج مشابه", value: Product(id: 3, name: "كابل", price: 80))

// في ProductsScreen على الـ List
.toolbar {
  Button("الأرخص") {
    if let cheapest = products.min(by: { $0.price < $1.price }) {
      path.append(cheapest)
    }
  }
}`
        },
        {
          cmd: "sheet و alert",
          title: "تفتح شاشة من تحت بـ sheet، وتسأل المستخدم بـ alert و confirmationDialog، وتقفل بـ dismiss",
          desc: R`في SwiftUI مفيش «افتح الـ sheet دلوقتي». بدل كده بتربط الـ sheet بـ state: [[.sheet(isPresented: $showSheet) { AboutView() }]]. لما [[showSheet]] تبقى true بيظهر، ولما المستخدم يقفله بالسحب SwiftUI بترجّعها false لوحدها (عشان كده Binding).

• [[.sheet(item: $selectedItem) { item in ... }]]: بيظهر لما الـ optional يبقى فيه قيمة، وبيدّيك القيمة. أحسن لما الـ sheet بيعرض عنصر معين. (النوع لازم Identifiable).
• [[.fullScreenCover]]: زي sheet بس الشاشة كلها.
• [[.presentationDetents([.medium, .large])]] على محتوى الـ sheet: نص شاشة أو كاملة.

[[.alert("العنوان", isPresented: $show) { أزرار } message: { Text(...) }]]: رسالة في النص. الأزرار [[Button]] عادية، و [[role: .destructive]] بيخليه أحمر، و [[role: .cancel]] زرار الإلغاء. وأي زرار بيقفل الـ alert لوحده.

[[.confirmationDialog]]: اختيارات بتطلع من تحت (action sheet)، للقرارات اللي ليها أكتر من اختيار.

جوه الشاشة اللي اتفتحت: [[@Environment(\.dismiss) private var dismiss]] وبعدين [[dismiss()]] بيقفلها (sheet أو شاشة navigation). الـ [[\.dismiss]] key path لقيمة جاهزة في الـ environment.`,
          example: R`import SwiftUI

struct Note: Identifiable {
  let id = UUID()
  let title: String
}

struct SettingsScreen: View {
  @State private var showAbout = false
  @State private var confirmDelete = false
  @State private var openedNote: Note?
  var body: some View {
    VStack(spacing: 20) {
      Button("عن التطبيق") { showAbout = true }
      Button("افتح ملاحظة") { openedNote = Note(title: "أفكار") }
      Button("امسح الحساب", role: .destructive) { confirmDelete = true }
    }
    .sheet(isPresented: $showAbout) {
      AboutSheet()
        .presentationDetents([.medium])
    }
    .sheet(item: $openedNote) { note in
      Text("ملاحظة: \(note.title)")
    }
    .alert("متأكد؟", isPresented: $confirmDelete) {
      Button("امسح", role: .destructive) { print("بنمسح") }
      Button("إلغاء", role: .cancel) { }
    } message: {
      Text("مش هتقدر ترجّع الحساب بعد المسح.")
    }
  }
}

struct AboutSheet: View {
  @Environment(\.dismiss) private var dismiss
  var body: some View {
    VStack(spacing: 12) {
      Text("مهامي 1.0").font(.title)
      Button("قفل") { dismiss() }
    }
  }
}`,
          try: R`ضيف [[.confirmationDialog]] بيظهر لما تضغط «شارك» وفيه اختيارين: «انسخ اللينك» و «ابعت إيميل». وبعدين ضيف [[.interactiveDismissDisabled()]] على [[AboutSheet]] وجرّب تقفله بالسحب.`,
          flag: "script",
          deep: {
            why: R`ربط العرض بـ state بيشيل مشاكل زي «الـ alert اتفتح مرتين» أو «الـ sheet اتقفل بس الكود فاكره مفتوح». الحالة هي الحقيقة الوحيدة، والسحب لتحت بيحدثها لوحده.`,
            how: R`[[.sheet(isPresented:)]] بيراقب الـ Binding: true = اعرض، false = اقفل. ولما المستخدم يسحب، SwiftUI بتكتب false في الـ Binding. ونفس الكلام في [[item:]] بتكتب nil.

[[openedNote]] نوعه [[Note?]] من غير قيمة أولية: الـ [[var]] الـ optional بيبدأ بـ nil لوحده.

لاحظ إن الـ alert ليه trailing closures اتنين: الأزرار، وبعدين [[message:]] بـ label. ده اسمه multiple trailing closures: أول closure من غير label وكل اللي بعده بالـ label بتاعه.`,
            when: R`sheet لمهمة جانبية (إضافة عنصر، إعدادات، تفاصيل سريعة). fullScreenCover لحاجة لازم تخلص (onboarding، كاميرا). alert للتأكيد أو الأخطاء المهمة بس. confirmationDialog لما فيه أكتر من اختيار. ومتستخدمش alert لكل حاجة: مزعج.`,
            mistakes: R`تحط أكتر من [[.alert]] على نفس الـ View في نسخ قديمة من iOS فواحد بس يشتغل (حطهم على Views مختلفة أو استخدم item). وتعمل [[showSheet = true]] وجوه الـ sheet مفيش طريقة يقفل غير السحب. وتمرر داتا للـ sheet من state تانية بتتحدث متأخر: استخدم [[sheet(item:)]].`
          },
          teach: R`## الكود ده بيعمل إيه؟

شاشة إعدادات فيها ٣ زراير: «عن التطبيق» بيفتح sheet من تحت بنص الشاشة، و «افتح ملاحظة» بيفتح sheet بيعرض ملاحظة معينة، و «امسح الحساب» بيطلع alert بيسأل «متأكد؟». وجوه الـ sheet الأول زرار «قفل» بيقفله.

> [[.sheet]] و [[.alert]] و [[dismiss]] SwiftUI على الماك بس، فالسلوك هنا من docs بتاعة Apple. اللي اتجرّب بجد في Swift 6.4 على لينكس: الـ optional اللي بيبدأ بـ [[nil]]، و stand-in صغير (دالة عملناها بإيدنا مش SwiftUI) يوضح شكل الـ multiple trailing closures اللي في الـ alert.

---

## ١. [[Note: Identifiable]]

~~~swift
struct Note: Identifiable {
  let id = UUID()
  let title: String
}
~~~

[[sheet(item:)]] محتاج النوع [[Identifiable]]: لو القيمة اتغيرت لقيمة تانية بـ id مختلف، SwiftUI بتقفل الـ sheet وتفتح واحد جديد.

---

## ٢. ٣ states، واحدة لكل حاجة بتتعرض

~~~swift
  @State private var showAbout = false
  @State private var confirmDelete = false
  @State private var openedNote: Note?
~~~

- [[showAbout]] و [[confirmDelete]]: Bool. [[true]] = ظاهر.
- [[openedNote: Note?]]: الـ [[?]] = optional، يا فيه [[Note]] يا [[nil]]. ومن غير قيمة أولية، الـ [[var]] الـ optional بيبدأ [[nil]] لوحده:

~~~swift
var openedNote: Note?
print(openedNote as Any)
openedNote = Note(title: "أفكار")
print(openedNote?.title ?? "nil")
~~~

~~~text الناتج (Swift 6.4، لينكس)
nil
أفكار
~~~

([[?.]] optional chaining: لو [[nil]] النتيجة [[nil]]. و [[??]] قيمة بديلة لو [[nil]].)

---

## ٣. الزراير بتغيّر state بس

~~~swift
      Button("عن التطبيق") { showAbout = true }
      Button("افتح ملاحظة") { openedNote = Note(title: "أفكار") }
      Button("امسح الحساب", role: .destructive) { confirmDelete = true }
~~~

مفيش «افتح الـ sheet». الزرار بيغيّر الحالة، و SwiftUI بتشوف الحالة وتعرض. و [[role: .destructive]] بيلوّن الزرار أحمر عشان يبان إنه خطر.

---

## ٤. [[.sheet(isPresented:)]]

~~~swift
    .sheet(isPresented: $showAbout) {
      AboutSheet()
        .presentationDetents([.medium])
    }
~~~

- [[$showAbout]]: Binding، لأن SwiftUI محتاجة **تكتب** فيه: لما المستخدم يقفل الـ sheet بالسحب لتحت، بترجّعه [[false]] لوحدها.
- [[.presentationDetents([.medium])]]: الـ sheet يقف عند نص الشاشة. ولو حطيت [[.medium]] و [[.large]] الاتنين في الـ array، بيخليه يتسحب بين النص والكامل.

---

## ٥. [[.sheet(item:)]]

~~~swift
    .sheet(item: $openedNote) { note in
      Text("ملاحظة: \(note.title)")
    }
~~~

بيظهر لما [[openedNote]] يبقى فيه قيمة، وبيدّيك القيمة نفسها ([[note]]) من غير فك optional. ولما يتقفل، SwiftUI بترجّع [[openedNote]] لـ [[nil]].

---

## ٦. [[.alert]] و الـ multiple trailing closures

~~~swift
    .alert("متأكد؟", isPresented: $confirmDelete) {
      Button("امسح", role: .destructive) { print("بنمسح") }
      Button("إلغاء", role: .cancel) { }
    } message: {
      Text("مش هتقدر ترجّع الحساب بعد المسح.")
    }
~~~

- أول قوسين معقوفين: الأزرار. [[role: .cancel]] = زرار الإلغاء (iOS بيحطه في مكانه القياسي). أي زرار بيقفل الـ alert لوحده.
- [[message:]] بعد قفلة الأزرار: closure تاني بعد الأول، بالـ label بتاعه. ده اسمه **multiple trailing closures**: أول واحد من غير label، وكل اللي بعده بالـ label.

نفس الشكل بالظبط في دالة Swift عادية عملناها:

~~~swift
func alert(_ title: String, actions: () -> Void, message: () -> String) {
  print("alert:", title, "-", message())
  actions()
}
alert("متأكد؟") {
  print("الأزرار هنا")
} message: {
  "مش هتقدر ترجّع الحساب بعد المسح."
}
~~~

~~~text الناتج (Swift 6.4، لينكس)
alert: متأكد؟ - مش هتقدر ترجّع الحساب بعد المسح.
الأزرار هنا
~~~

---

## ٧. القفل من جوه: [[@Environment(\.dismiss)]]

~~~swift
struct AboutSheet: View {
  @Environment(\.dismiss) private var dismiss
  var body: some View {
    VStack(spacing: 12) {
      Text("مهامي 1.0").font(.title)
      Button("قفل") { dismiss() }
    }
  }
}
~~~

- [[\.dismiss]]: key path لقيمة جاهزة في الـ environment، وهي «اقفل الشاشة اللي أنا فيها».
- [[dismiss()]]: بنناديها زي دالة، فالـ sheet يتقفل و [[showAbout]] ترجع [[false]].

---

## ٨. الـ try والـ solCode

[[.confirmationDialog("شارك التطبيق", isPresented: $showShare, titleVisibility: .visible)]]: اختيارات بتطلع من تحت. [[titleVisibility: .visible]] بيظهر العنوان (الافتراضي ممكن يخبيه). و [[.interactiveDismissDisabled()]] بيمنع القفل بالسحب.

| الحاجة | مربوطة بـ | بتظهر لما |
|---|---|---|
| [[.sheet(isPresented:)]] | Bool | [[true]] |
| [[.sheet(item:)]] | Optional | فيه قيمة |
| [[.alert]] | Bool | [[true]] |
| [[.confirmationDialog]] | Bool | [[true]] |
| [[dismiss()]] | من جوه الشاشة | بيقفلها |

## الخلاصة

- العرض مربوط بـ state، والقفل بالسحب بيحدّث الـ state لوحده (عشان كده Binding).
- [[sheet(item:)]] لما الـ sheet بيعرض عنصر معين.
- [[role: .destructive]] للخطر و [[role: .cancel]] للإلغاء.`,
          lines: [
            "SwiftUI.",
            R`[[Identifiable]] عشان [[sheet(item:)]].`,
            "id.",
            "العنوان.",
            "قفلة.",
            "الشاشة.",
            "state للـ sheet.",
            "state للـ alert.",
            R`optional: nil = الـ sheet مقفول.`,
            "body.",
            "عمود.",
            "بيفتح الـ sheet الأول.",
            R`بيحط قيمة فيفتح [[sheet(item:)]].`,
            R`[[role: .destructive]]: لون أحمر.`,
            "قفلة.",
            R`[[.sheet(isPresented:)]] مربوط بـ Bool.`,
            "محتوى الـ sheet.",
            "نص شاشة.",
            "قفلة.",
            R`[[.sheet(item:)]]: بيدّينا الملاحظة.`,
            "محتوى بالقيمة.",
            "قفلة.",
            R`[[.alert]] بعنوان ومربوط بـ Bool.`,
            "زرار أحمر.",
            R`[[.cancel]]: زرار الإلغاء.`,
            R`[[message:]] تاني trailing closure.`,
            "نص الرسالة.",
            "قفلة.",
            "قفلة body.",
            "قفلة.",
            "الـ sheet.",
            R`[[\.dismiss]] من الـ environment.`,
            "body.",
            "عمود.",
            "نص.",
            R`[[dismiss()]] بيقفل الـ sheet.`,
            "قفلة.",
            "قفلة body.",
            "قفلة."
          ],
          sol: R`مع [[.interactiveDismissDisabled()]] السحب لتحت بيرجّع الـ sheet مكانه، والطريقة الوحيدة للقفل زرار «قفل». مفيد لما المستخدم بيكتب حاجة ومش عايزه يخسرها بالغلط.

الـ confirmationDialog:`,
          solCode: R`@State private var showShare = false

// جوه VStack
Button("شارك") { showShare = true }

// على الـ VStack
.confirmationDialog("شارك التطبيق", isPresented: $showShare, titleVisibility: .visible) {
  Button("انسخ اللينك") { print("copy") }
  Button("ابعت إيميل") { print("mail") }
}`
        },
        {
          cmd: "Form و TextField",
          title: "تعمل فورم بـ Form و TextField و Toggle و Picker و Stepper، وتتحقق من المدخلات قبل الإرسال",
          desc: R`[[Form]] حاوية بتدّي المدخلات شكل الإعدادات بتاع iOS. جواها:
• [[TextField("الاسم", text: $name)]]: نص. و [[SecureField]] للباسورد. و [[TextField(..., axis: .vertical)]] لنص على كذا سطر.
• [[Toggle("...", isOn: $flag)]]: Bool.
• [[Picker("الباقة", selection: $plan) { ... }]]: اختيار من قايمة. كل اختيار [[Text("...").tag(قيمة)]]، والـ tag لازم من نفس نوع الـ selection. أو [[ForEach]] على enum بيتبع [[CaseIterable]].
• [[Stepper("...", value: $n, in: 1...10)]]: زرارين + و −.
• [[DatePicker]] للتواريخ.
• [[Section("عنوان") { }]] بيقسم الفورم.

modifiers مهمة للـ TextField:
• [[.keyboardType(.emailAddress)]] أو [[.numberPad]]: نوع الكيبورد.
• [[.textInputAutocapitalization(.never)]] و [[.autocorrectionDisabled()]]: للإيميل والـ username.
• [[.textContentType(.emailAddress)]]: بيساعد الـ AutoFill.
• [[.onSubmit { }]]: لما يدوس Enter.

الـ validation: computed property [[isValid]] بتشيك كل الشروط، و [[.disabled(!isValid)]] على زرار الإرسال. و [[@FocusState]] بيتحكم في الخانة اللي عليها الكيبورد.`,
          example: R`import SwiftUI

enum Plan: String, CaseIterable, Identifiable {
  case free = "مجانية", pro = "برو"
  var id: Self { self }
}

struct SignUpForm: View {
  @State private var name = ""
  @State private var email = ""
  @State private var age = 18
  @State private var plan = Plan.free
  @State private var acceptsTerms = false
  private var isValid: Bool {
    !name.trimmingCharacters(in: .whitespaces).isEmpty
      && email.contains("@") && acceptsTerms
  }
  var body: some View {
    Form {
      Section("بياناتك") {
        TextField("الاسم", text: $name)
          .textContentType(.name)
        TextField("الإيميل", text: $email)
          .keyboardType(.emailAddress)
          .textInputAutocapitalization(.never)
          .autocorrectionDisabled()
        Stepper("السن: \(age)", value: $age, in: 13...100)
      }
      Section("الاشتراك") {
        Picker("الباقة", selection: $plan) {
          ForEach(Plan.allCases) { Text($0.rawValue).tag($0) }
        }
        Toggle("موافق على الشروط", isOn: $acceptsTerms)
      }
      Button("سجّل") { print(name, email, age, plan) }
        .disabled(!isValid)
    }
  }
}`,
          try: R`ضيف [[SecureField("الباسورد", text: $password)]] وخلي [[isValid]] يطلب 8 حروف على الأقل. وبعدين اعرض تحت الخانة رسالة حمرا «الإيميل شكله غلط» لو الإيميل مش فاضي ومفيهوش [[@]].`,
          flag: "script",
          deep: {
            why: R`أي تطبيق فيه تسجيل أو إعدادات أو إضافة داتا = فورم. و [[Form]] بيدّيك الشكل القياسي اللي المستخدم متعود عليه في الإعدادات، مع accessibility و Dynamic Type جاهزين. والـ validation في computed property بيخلي الزرار دايمًا متطابق مع حالة المدخلات.`,
            how: R`كل control بياخد Binding، فالكتابة بتحدث الـ state على طول، والـ [[isValid]] بتتحسب من جديد مع كل حرف لأن body بيتحسب تاني.

الـ enum بيتبع [[Identifiable]] بـ [[var id: Self { self }]] عشان [[ForEach(Plan.allCases)]] يشتغل. والـ raw value هنا نص عربي بيتعرض. و [[.tag($0)]] بيربط كل صف بقيمة من نوع [[Plan]] زي الـ selection.

[[trimmingCharacters(in: .whitespaces)]] بتشيل المسافات من الأطراف عشان «   » ميتحسبش اسم. والـ [[&&]] في أول السطر التاني كمّلة للـ expression اللي فوق.`,
            when: R`[[Form]] للإعدادات والتسجيل وإضافة عنصر. ولو التصميم مخصوص جدًا (شاشة login بتصميم براند)، اعمل VStack بـ TextFields بستايل بتاعك.`,
            mistakes: R`تتحقق من الإيميل بـ [[contains("@")]] بس وتفتكر ده كفاية: ده فلتر مبدئي، والتحقق الحقيقي من السيرفر. وتنسى [[.textInputAutocapitalization(.never)]] فالإيميل يبدأ بحرف كابيتال. وتستخدم [[TextField]] للباسورد. وتنسى إن الـ tag لازم يبقى نفس نوع الـ selection بالظبط ([[Plan]] مش [[String]]) وإلا الاختيار مش هيتغير.`
          },
          teach: R`## الكود ده بيعمل إيه؟

فورم تسجيل بشكل إعدادات iOS: اسم وإيميل وسن (بزرارين + و −)، واختيار باقة (مجانية أو برو)، وموافقة على الشروط، وزرار «سجّل» مقفول لحد ما الاسم يبقى مش فاضي والإيميل فيه [[@]] والموافقة متعلّمة.

> [[Form]] و [[TextField]] و [[Picker]] و [[Stepper]] والـ modifiers بتاعة الكيبورد SwiftUI على الماك بس، فشكلهم من docs بتاعة Apple. اللي اتجرّب بجد في Swift 6.4 على لينكس: الـ enum [[Plan]] و [[allCases]]، وشرط [[isValid]] بـ [[trimmingCharacters]] (حطيناه في دالة عادية عشان نجربه من غير View).

---

## ١. الباقات: [[enum Plan]]

~~~swift
enum Plan: String, CaseIterable, Identifiable {
  case free = "مجانية", pro = "برو"
  var id: Self { self }
}
~~~

- [[: String]]: كل حالة ليها raw value نص. [[free]] قيمتها [[مجانية]]، وده اللي هيتعرض.
- [[CaseIterable]]: Swift بتعمل [[Plan.allCases]] لوحدها: array فيها كل الحالات.
- [[Identifiable]] بـ [[var id: Self { self }]]: الـ id هو الحالة نفسها ([[Self]] = [[Plan]]). محتاجينه عشان [[ForEach]].
- [[case free = ..., pro = ...]]: حالتين في سطر واحد بفاصلة.

~~~swift
print(Plan.allCases)
print(Plan.allCases.map(\.rawValue))
print(Plan.pro.id)
~~~

~~~text الناتج (Swift 6.4، لينكس)
[form.Plan.free, form.Plan.pro]
["مجانية", "برو"]
pro
~~~

([[form.]] في الأول اسم الملف [[form.swift]]، لأن Swift بتعتبر الملف module.)

---

## ٢. الـ state: خانة لكل مدخل

~~~swift
  @State private var name = ""
  @State private var email = ""
  @State private var age = 18
  @State private var plan = Plan.free
  @State private var acceptsTerms = false
~~~

كل control في الفورم هيكتب في واحدة منهم عن طريق Binding ([[$name]] وهكذا). والنوع بيتستنتج من القيمة الأولى: [[""]] نص، و [[18]] Int، و [[Plan.free]] Plan.

---

## ٣. [[isValid]]: الفورم سليم؟

~~~swift
  private var isValid: Bool {
    !name.trimmingCharacters(in: .whitespaces).isEmpty
      && email.contains("@") && acceptsTerms
  }
~~~

computed property بتتحسب كل ما [[body]] يتحسب، يعني مع كل حرف. من جوه لبرة:

1. [[name.trimmingCharacters(in: .whitespaces)]]: بتشيل المسافات من الأول والآخر. [[.whitespaces]] = المسافات والـ tab.
2. [[.isEmpty]]: فاضي؟
3. [[!]] قبل الكل: «مش» فاضي.
4. [[&&]]: «و». السطر التاني بيكمّل نفس الـ expression.
5. [[email.contains("@")]]: فيه [[@]]؟

جربنا نفس الشرط على ٣ حالات:

~~~swift
print(isValid(name: "   ", email: "a@b.com", acceptsTerms: true))
print(isValid(name: "سارة", email: "sara.com", acceptsTerms: true))
print(isValid(name: " سارة ", email: "sara@x.com", acceptsTerms: true))
print("[" + "  سارة  ".trimmingCharacters(in: .whitespaces) + "]")
~~~

~~~text الناتج (Swift 6.4، لينكس)
false
false
true
[سارة]
~~~

اسم كله مسافات = [[false]]، وإيميل من غير [[@]] = [[false]]، وأي مسافات حوالين اسم حقيقي بتتشال.

---

## ٤. [[Form]] و [[Section]] و [[TextField]]

~~~swift
    Form {
      Section("بياناتك") {
        TextField("الاسم", text: $name)
          .textContentType(.name)
        TextField("الإيميل", text: $email)
          .keyboardType(.emailAddress)
          .textInputAutocapitalization(.never)
          .autocorrectionDisabled()
~~~

- [[Form]]: حاوية بتدّي اللي جواها شكل الإعدادات (صفوف في مربعات).
- [[TextField("الاسم", text: $name)]]: النص الأول placeholder (بيظهر رمادي والخانة فاضية)، و [[$name]] Binding: كل حرف بيتكتب في [[name]].
- [[.textContentType(.name)]]: بيقول للنظام إن دي خانة اسم، فالـ AutoFill يقترح اسمك.
- [[.keyboardType(.emailAddress)]]: كيبورد فيه [[@]] و [[.]] ظاهرين.
- [[.textInputAutocapitalization(.never)]]: متكبّرش أول حرف. و [[.autocorrectionDisabled()]]: متصححش الكلام. الاتنين مهمين للإيميل.

---

## ٥. [[Stepper]]

~~~swift
        Stepper("السن: \(age)", value: $age, in: 13...100)
~~~

زرارين − و +. [[value: $age]] بيكتب في [[age]]. و [[in: 13...100]] range: مش هينزل تحت ١٣ ولا يطلع فوق ١٠٠ ([[...]] = range مقفول بالطرفين).

---

## ٦. [[Picker]] و [[.tag]]

~~~swift
      Section("الاشتراك") {
        Picker("الباقة", selection: $plan) {
          ForEach(Plan.allCases) { Text($0.rawValue).tag($0) }
        }
        Toggle("موافق على الشروط", isOn: $acceptsTerms)
      }
~~~

- [[selection: $plan]]: الاختيار بيتكتب في [[plan]].
- [[ForEach(Plan.allCases)]]: صف لكل باقة. [[$0]] = الباقة الحالية.
- [[Text($0.rawValue)]]: النص العربي.
- [[.tag($0)]]: «لو الصف ده اتختار، حط القيمة دي في الـ selection». لازم من **نفس نوع** [[plan]] بالظبط ([[Plan]] مش [[String]])، وإلا الاختيار مش هيتغير.

---

## ٧. زرار الإرسال

~~~swift
      Button("سجّل") { print(name, email, age, plan) }
        .disabled(!isValid)
~~~

[[.disabled(!isValid)]]: مقفول طول ما الفورم مش سليم. ولأن [[isValid]] بتتحسب مع كل تغيير، الزرار بيتفتح لوحده أول ما آخر شرط يتحقق.

---

## ٨. الـ solCode

- [[SecureField]]: زي TextField بس بيخبي الحروف. و [[.textContentType(.newPassword)]] بيخلي iOS يقترح باسورد قوي.
- [[&& password.count >= 8]]: شرط زيادة في [[isValid]].
- [[if !email.isEmpty && !email.contains("@")]]: الرسالة الحمرا تظهر بس لو المستخدم كتب حاجة وهي غلط، مش والخانة لسه فاضية.

| الـ control | بياخد | بيكتب في |
|---|---|---|
| [[TextField]] | [[text: $x]] | String |
| [[Toggle]] | [[isOn: $x]] | Bool |
| [[Stepper]] | [[value: $x, in:]] | رقم |
| [[Picker]] | [[selection: $x]] + [[.tag]] | أي نوع Hashable |

## الخلاصة

- كل control مربوط بـ [[@State]] عن طريق [[$]].
- الـ validation في computed property واحدة، والزرار [[.disabled(!isValid)]].
- [[contains("@")]] فلتر مبدئي بس، والتحقق الحقيقي من السيرفر.`,
          lines: [
            "SwiftUI.",
            R`enum للباقات، [[CaseIterable]] عشان [[allCases]] و [[Identifiable]] عشان ForEach.`,
            "الحالات والنص العربي كـ raw value.",
            R`الـ id هو القيمة نفسها. [[Self]] = Plan.`,
            "قفلة.",
            "الفورم.",
            "state لكل خانة.",
            "الإيميل.",
            "السن.",
            "الباقة.",
            "الموافقة.",
            R`computed: الفورم سليم ولا لأ.`,
            "الاسم مش فاضي بعد شيل المسافات.",
            R`و الإيميل فيه [[@]] و موافق.`,
            "قفلة.",
            "body.",
            R`[[Form]]: شكل الإعدادات.`,
            "قسم بعنوان.",
            R`خانة نص مربوطة بـ [[$name]].`,
            "للـ AutoFill.",
            "خانة الإيميل.",
            "كيبورد فيه @.",
            "من غير حروف كابيتال.",
            "من غير تصحيح تلقائي.",
            R`[[Stepper]] من 13 لـ 100.`,
            "قفلة القسم.",
            "قسم تاني.",
            R`[[Picker]] مربوط بـ [[$plan]].`,
            R`صف لكل باقة، و [[.tag]] بنفس نوع الـ selection.`,
            "قفلة الـ Picker.",
            "Toggle.",
            "قفلة القسم.",
            "زرار الإرسال.",
            R`مقفول لحد ما الفورم يبقى سليم.`,
            "قفلة Form.",
            "قفلة body.",
            "قفلة."
          ],
          sol: R`الإضافات:`,
          solCode: R`@State private var password = ""

private var isValid: Bool {
  !name.trimmingCharacters(in: .whitespaces).isEmpty
    && email.contains("@") && acceptsTerms
    && password.count >= 8
}

// جوه Section("بياناتك") تحت خانة الإيميل
if !email.isEmpty && !email.contains("@") {
  Text("الإيميل شكله غلط")
    .font(.caption)
    .foregroundStyle(.red)
}
SecureField("الباسورد (8 حروف على الأقل)", text: $password)
  .textContentType(.newPassword)`
        }
      ]
    }
]);
