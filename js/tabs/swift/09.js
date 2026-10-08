// تكملة تاب swift: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/swift/01.js (شرح حقول الدرس في أوله)
MORE("swift", [
    {
      t: "المعمارية والـ concurrency والـ packages",
      l: 3,
      n: "MVVM بـ @Observable من غير مبالغة، والـ actors و @MainActor و Sendable، وأخطاء Swift 6 وحلها، و Swift Package Manager",
      items: [
        {
          cmd: "MVVM بـ Observable",
          title: "MVVM في SwiftUI بأمانة: view model بـ @Observable و @MainActor، و service protocol عشان تختبر من غير نت",
          desc: R`MVVM = Model (الداتا: structs زي [[Post]]) + View (الـ SwiftUI view) + ViewModel (class فيه state الشاشة والـ logic: التحميل، والفلترة، والـ validation).

الشكل الحديث:
• الـ ViewModel: [[@MainActor @Observable final class]]. [[@MainActor]] عشان الـ state بتاعته بتتعرض في الـ UI فلازم تتعدل على الـ main thread (الدرس الجاي).
• الـ View بيملكه في [[@State]]، ويبدأ التحميل في [[.task]]، ويعمل bindings بـ [[$viewModel.searchText]].
• الـ ViewModel مش بيكلم [[URLSession]] مباشرة: بياخد service من نوع protocol ([[any PostsService]]). في التطبيق بتبعت الحقيقي، وفي الاختبارات بتبعت fake بيرجّع داتا ثابتة أو بيرمي error. ده اسمه dependency injection.

بأمانة، عشان هتسمع آراء كتير:
1. MVVM مش إجباري في SwiftUI. فيه ناس (ومنهم أمثلة Apple نفسها) بتحط الـ state في [[@Observable]] models والـ Views على طول من غير view model لكل شاشة، وفيه architectures تانية زي TCA (The Composable Architecture) في شركات معينة.
2. view model لشاشة فيها [[Text]] و [[Toggle]] = تعقيد ملوش لازمة.
3. فايدته الحقيقية: الشاشات اللي فيها logic (تحميل وحالات وفلترة وvalidation): الـ View بيبقى عرض بس، والـ logic بيتختبر بـ unit tests من غير UI ومن غير نت.
4. في الانترفيوهات المصرية والخليجية هيسألوك عنه كتير، فلازم تعرف تشرحه وتعرف عيوبه.

[[_viewModel = State(initialValue: ...)]] في الـ init: الـ [[_]] قبل اسم property wrapper بيوصلك للـ wrapper نفسه (الـ [[State]]) مش للقيمة. ده الطريقة لتجهيز [[@State]] بقيمة جاية من الـ init.`,
          example: R`import SwiftUI

struct Post: Decodable, Identifiable, Sendable {
  let id: Int
  let title: String
}

protocol PostsService: Sendable {
  func fetchPosts() async throws -> [Post]
}

@MainActor
@Observable
final class PostsViewModel {
  enum Phase {
    case idle, loading, loaded([Post]), failed(String)
  }
  private(set) var phase = Phase.idle
  var searchText = ""
  private let service: any PostsService
  init(service: any PostsService) {
    self.service = service
  }
  var visiblePosts: [Post] {
    guard case .loaded(let posts) = phase else { return [] }
    if searchText.isEmpty { return posts }
    return posts.filter { $0.title.localizedCaseInsensitiveContains(searchText) }
  }
  func load() async {
    phase = .loading
    do {
      phase = .loaded(try await service.fetchPosts())
    } catch {
      phase = .failed("مقدرناش نحمّل البوستات، اتأكد من النت")
    }
  }
}

struct PostsListScreen: View {
  @State private var viewModel: PostsViewModel
  init(service: any PostsService) {
    _viewModel = State(initialValue: PostsViewModel(service: service))
  }
  var body: some View {
    NavigationStack {
      List(viewModel.visiblePosts) { Text($0.title) }
        .searchable(text: $viewModel.searchText)
        .overlay {
          if case .failed(let message) = viewModel.phase {
            ContentUnavailableView(message, systemImage: "wifi.slash")
          }
        }
        .navigationTitle("البوستات")
    }
    .task { await viewModel.load() }
  }
}`,
          try: R`اعمل [[struct FakePostsService: PostsService]] فيه [[posts]] و [[shouldFail]]، واستخدمه في [[#Preview]] مرة بداتا ومرة بفشل. وبعدين (بعد درس الاختبارات) اكتب test بيتأكد إن البحث بـ [["swift"]] بيرجّع البوست الصح.`,
          flag: "script",
          deep: {
            why: R`لما الـ logic جوه الـ View، الطريقة الوحيدة تتأكد إنه شغال إنك تشغّل التطبيق وتدوس بإيدك، وكل ما تعدّل حاجة تعيد. لما يبقى في view model بياخد service، تقدر تختبر «لو النت فصل الرسالة تظهر» و «البحث بيفلتر صح» في جزء من الثانية. وده بالظبط اللي الشركات بتدور عليه في كود المتقدمين.`,
            how: R`[[@Observable]] بيخلي الـ View يتحدث لما [[phase]] أو [[searchText]] يتغيروا. [[visiblePosts]] computed فبتتحسب من الاتنين، ومفيش state مكررة. و [[private(set)]] على [[phase]]: الـ View يقرا بس، والتغيير من [[load()]] بس.

[[guard case .loaded(let posts) = phase]]: pattern matching على enum جوه guard. و [[localizedCaseInsensitiveContains]] من Foundation: بحث من غير فرق حروف كبيرة وصغيرة.

[[any PostsService]] existential: ممكن يبقى أي نوع بيتبع الـ protocol. والـ protocol [[Sendable]] لأن الـ service ممكن يتنادى من أكتر من task. و [[$viewModel.searchText]]: الـ [[$]] على [[@State]] بيدّي Binding للـ object، والـ [[.searchText]] بيدّي Binding للـ property.

الكود ده (الـ view model والـ fake والاختبارات) اتجرب فعلًا بـ [[swift test]] على Linux بعد ما اتشال الجزء بتاع SwiftUI، لأن الـ view model مش معتمد على UI. وده دليل على الفصل الصح.`,
            when: R`view model للشاشات اللي فيها تحميل وحالات وlogic. لشاشات العرض البسيطة، View بـ [[@State]] كفاية. والـ services (API و storage) protocols من الأول لو ناوي تختبر.`,
            mistakes: R`view model بيعمل [[import SwiftUI]] ويرجّع [[Color]] و [[Font]]: كده مربوط بالـ UI ومش هتقدر تختبره براحة. ونسيان [[@MainActor]] فتطلع تحذيرات Swift 6 أو تحديث UI من thread تاني. وview model واحد ضخم لكل التطبيق (God object). ونسخ نفس الداتا في الـ View والـ view model.`
          },
          teach: R`## الكود ده بيعمل إيه؟

شاشة بوستات بخانة بحث، متقسمة ٣ حتت:

| الحتة | النوع | شغلتها |
|---|---|---|
| Model | [[struct Post]] | الداتا بس |
| ViewModel | [[PostsViewModel]] | الحالة (بتحمّل، خلصت، فشلت) والبحث والتحميل |
| View | [[PostsListScreen]] | بيعرض اللي في الـ view model بس |

والـ view model مش بيكلم النت بنفسه: بياخد «service» من برة، فتقدر تديله واحد حقيقي في التطبيق وواحد مزيف (fake) في الاختبار.

### اتجرّب فين؟

الـ view model مفيهوش أي حاجة من SwiftUI، فخدناه زي ما هو (مع [[import Observation]] بدل [[import SwiftUI]]) في Swift package على Swift 6.4 في Docker (لينكس)، واختبرناه بـ [[swift test]] بالـ fake اللي في الـ solCode. الـ View ([[List]] و [[.searchable]] و [[.overlay]] و [[#Preview]]) SwiftUI على الماك بس، فدول من docs بتاعة Apple.

---

## ١. الـ Model والـ service

~~~swift
struct Post: Decodable, Identifiable, Sendable {
  let id: Int
  let title: String
}

protocol PostsService: Sendable {
  func fetchPosts() async throws -> [Post]
}
~~~

- [[Post]]: [[Decodable]] عشان ييجي من JSON، و [[Identifiable]] عشان [[List]]، و [[Sendable]] عشان يتنقل بين الـ tasks بأمان (الدرس الجاي).
- [[protocol PostsService]]: «عقد»: أي نوع عايز يبقى service لازم يكون عنده [[fetchPosts()]]. الـ view model هيعرف الـ protocol بس، مش النوع الحقيقي.

---

## ٢. الـ view model: التعريف

~~~swift
@MainActor
@Observable
final class PostsViewModel {
  enum Phase {
    case idle, loading, loaded([Post]), failed(String)
  }
  private(set) var phase = Phase.idle
  var searchText = ""
  private let service: any PostsService
  init(service: any PostsService) {
    self.service = service
  }
~~~

- [[@MainActor]]: كل الكود ده بيشتغل على الـ main thread، لأن [[phase]] بتتعرض في الشاشة.
- [[@Observable]]: الـ View بيتحدث لما [[phase]] أو [[searchText]] تتغير.
- [[enum Phase]]: ٤ حالات. [[idle]] = لسه مبدأناش.
- [[private(set)]]: أي حد يقرا [[phase]]، بس التعديل من جوه الـ class بس.
- [[any PostsService]]: «أي نوع بيتبع الـ protocol». ده **dependency injection**: الـ service بيتحقن من برة في الـ [[init]].

---

## ٣. [[visiblePosts]]: البحث

~~~swift
  var visiblePosts: [Post] {
    guard case .loaded(let posts) = phase else { return [] }
    if searchText.isEmpty { return posts }
    return posts.filter { $0.title.localizedCaseInsensitiveContains(searchText) }
  }
~~~

- computed: بتتحسب من [[phase]] و [[searchText]]، فمفيش نسخة تانية من البوستات ممكن تختلف.
- [[guard case .loaded(let posts) = phase else { return [] }]]: لو الحالة مش [[loaded]] رجّع فاضي، ولو هي، طلّع البوستات في [[posts]].
- [[localizedCaseInsensitiveContains]]: فيه النص ده من غير فرق بين الحروف الكبيرة والصغيرة. فـ [["swift"]] بتلاقي [["SwiftUI"]].

---

## ٤. [[load()]]

~~~swift
  func load() async {
    phase = .loading
    do {
      phase = .loaded(try await service.fetchPosts())
    } catch {
      phase = .failed("مقدرناش نحمّل البوستات، اتأكد من النت")
    }
  }
}
~~~

[[loading]] الأول، وبعدين يا [[loaded]] يا [[failed]] برسالة مفهومة بالعربي (مش [[error]] الخام).

---

## ٥. الـ View (من docs بتاعة Apple)

~~~swift
struct PostsListScreen: View {
  @State private var viewModel: PostsViewModel
  init(service: any PostsService) {
    _viewModel = State(initialValue: PostsViewModel(service: service))
  }
~~~

- [[@State]] بيملك الـ view model عشان يتعمل مرة واحدة.
- [[_viewModel]]: الـ [[_]] قبل اسم property wrapper بيوصلك للـ wrapper نفسه ([[State]]) مش للقيمة. كده بنجهز الـ [[@State]] بقيمة جاية من الـ [[init]].

~~~swift
      List(viewModel.visiblePosts) { Text($0.title) }
        .searchable(text: $viewModel.searchText)
        .overlay {
          if case .failed(let message) = viewModel.phase {
            ContentUnavailableView(message, systemImage: "wifi.slash")
          }
        }
        .navigationTitle("البوستات")
    }
    .task { await viewModel.load() }
~~~

- [[.searchable(text:)]]: خانة بحث في الشريط، مربوطة بـ [[searchText]]. و [[$viewModel.searchText]]: Binding لخانة جوه الـ object.
- [[.overlay { }]]: حاجة فوق القايمة. [[if case .failed(let message) = ...]] زي [[guard case]] بس بـ [[if]].
- [[.task]]: يحمّل لما الشاشة تظهر.

لاحظ: الـ View مفيهوش ولا [[if]] للبحث ولا [[do]]/[[catch]]. كله في الـ view model.

---

## ٦. الـ solCode: fake service واختبار

~~~swift
struct FakePostsService: PostsService {
  var posts: [Post] = []
  var shouldFail = false
  func fetchPosts() async throws -> [Post] {
    if shouldFail { throw URLError(.notConnectedToInternet) }
    return posts
  }
}
~~~

service مزيف: بيرجّع البوستات اللي تديهاله، أو يرمي خطأ «مفيش نت» ([[URLError(.notConnectedToInternet)]]) لو [[shouldFail]]. والـ [[#Preview]] مرة بداتا ومرة بفشل بيعرضوا الشاشة في الحالتين من غير نت حقيقي.

والاختبار:

~~~swift
@MainActor
@Test func searchFilters() async {
  let fake = FakePostsService(posts: [Post(id: 1, title: "SwiftUI"), Post(id: 2, title: "Kotlin")])
  let viewModel = PostsViewModel(service: fake)
  await viewModel.load()
  viewModel.searchText = "swift"
  #expect(viewModel.visiblePosts.map(\.id) == [1])
}
~~~

شغّلناه مع اختبار تاني بيتأكد إن الحالة بتبقى [[failed]] بـ [[shouldFail: true]] (اللي في درس Swift Testing):

~~~text الناتج من swift test (Swift 6.4، لينكس، مختصر)
✔ Test searchFilters() passed after 0.001 seconds.
✔ Test showsErrorWhenOffline() passed after 0.002 seconds.
~~~

البحث والفشل اتختبروا في جزء من الثانية من غير شاشة ومن غير نت.

## الخلاصة

- الـ View يعرض، والـ view model يقرر، والـ service يجيب الداتا.
- الـ service protocol يتحقن في الـ [[init]]، فتبدّله بـ fake في الاختبار والـ Preview.
- MVVM مفيد للشاشات اللي فيها logic، ومش لازم لكل شاشة.`,
          lines: [
            "SwiftUI.",
            R`الـ Model: struct، و [[Sendable]] عشان يتنقل بين tasks بأمان.`,
            "id.",
            "title.",
            "قفلة.",
            R`protocol للـ service: الحقيقي والـ fake الاتنين هيتبعوه.`,
            "الدالة الوحيدة المطلوبة.",
            "قفلة.",
            R`[[@MainActor]]: كل الكود ده على الـ main thread.`,
            R`[[@Observable]]: الـ View بيتحدث لما الـ state تتغير.`,
            "الـ ViewModel.",
            "حالات الشاشة.",
            "الحالات في سطر.",
            "قفلة.",
            R`[[private(set)]]: الـ View يقرا بس.`,
            "نص البحث، الـ View بيكتب فيه.",
            R`الـ service من برة (dependency injection).`,
            "init.",
            "بنحفظه.",
            "قفلة.",
            "computed: البوستات اللي هتتعرض.",
            R`[[guard case]]: لو مش loaded رجّع فاضي.`,
            "من غير بحث رجّع الكل.",
            "فلترة.",
            "قفلة.",
            R`[[load]]: الـ logic كله هنا مش في الـ View.`,
            "بنحمّل.",
            "do.",
            "النتيجة.",
            "catch.",
            "رسالة مفهومة للمستخدم.",
            "قفلة.",
            "قفلة الدالة.",
            "قفلة الـ class.",
            "الـ View.",
            R`[[@State]] بيملك الـ view model.`,
            "init بياخد الـ service.",
            R`[[_viewModel]]: الـ State wrapper نفسه، بنجهزه بالقيمة.`,
            "قفلة.",
            "body.",
            "NavigationStack.",
            "قايمة من الـ computed.",
            R`[[.searchable]]: خانة بحث مربوطة بالـ view model.`,
            R`[[.overlay]]: حاجة فوق القايمة.`,
            R`[[if case]]: لو الحالة failed.`,
            "شاشة الخطأ.",
            "قفلة if.",
            "قفلة overlay.",
            "العنوان.",
            "قفلة NavigationStack.",
            "التحميل لما الشاشة تظهر.",
            "قفلة body.",
            "قفلة."
          ],
          sol: R`الـ fake والـ Previews:`,
          solCode: R`struct FakePostsService: PostsService {
  var posts: [Post] = []
  var shouldFail = false
  func fetchPosts() async throws -> [Post] {
    if shouldFail { throw URLError(.notConnectedToInternet) }
    return posts
  }
}

#Preview("بداتا") {
  PostsListScreen(service: FakePostsService(posts: [
    Post(id: 1, title: "SwiftUI من الصفر"),
    Post(id: 2, title: "Kotlin و Compose"),
  ]))
}

#Preview("من غير نت") {
  PostsListScreen(service: FakePostsService(shouldFail: true))
}

// والاختبار (درس Swift Testing):
@MainActor
@Test func searchFilters() async {
  let fake = FakePostsService(posts: [Post(id: 1, title: "SwiftUI"), Post(id: 2, title: "Kotlin")])
  let viewModel = PostsViewModel(service: fake)
  await viewModel.load()
  viewModel.searchText = "swift"
  #expect(viewModel.visiblePosts.map(\.id) == [1])
}`
        },
        {
          cmd: "actors و MainActor و Sendable",
          title: "data race يعني إيه، وتمنعه بـ actor، و @MainActor للـ UI، و Sendable للقيم اللي بتتنقل بين الـ tasks",
          desc: R`data race: اتنين tasks بيعدّلوا نفس المتغير في نفس اللحظة من threads مختلفة. النتيجة: قيم غلط أو crash عشوائي صعب جدًا تلاقيه لأنه مش بيحصل كل مرة. Swift 6 بتمنع ده وقت الـ compile.

3 أدوات:
1. [[actor]]: زي class، بس بيضمن إن task واحد بس يلمس الـ state بتاعته في نفس الوقت. اللي برة لازم يكلمه بـ [[await]] ([[await account.deposit(5)]]) لأنه ممكن يستنى دوره. جوه الـ actor بتكتب كود عادي من غير locks.
2. [[@MainActor]]: actor خاص هو الـ main thread. أي class أو function عليها [[@MainActor]] بتشتغل على الـ main thread، وده إجباري لأي حاجة بتلمس الـ UI. الـ Views في SwiftUI كلها [[@MainActor]] أصلًا. والـ view models بتتعلم بيه.
3. [[Sendable]]: protocol بيقول «النوع ده آمن يتنقل بين tasks». الـ structs والـ enums اللي كل properties بتاعتها Sendable بتبقى Sendable لوحدها (في نفس الـ module). الـ class يبقى Sendable بس لو [[final]] وكل properties [[let]] من أنواع Sendable. والـ actors Sendable دايمًا.

[[nonisolated]]: method جوه actor مش محتاجة الحماية (مش بتلمس state متغيرة) فمش محتاجة [[await]].

ملحوظة عن Swift 6.2 و Xcode 26: المشاريع الجديدة بقت بتيجي بإعداد «Default Actor Isolation = MainActor»، يعني كل الكود افتراضيًا على الـ main thread إلا اللي تقول غير كده، و [[@concurrent]] عشان تبعت دالة تشتغل في الخلفية صراحة. ده بيقلل الأخطاء جدًا للتطبيقات العادية. لو مشروعك قديم أو package، الافتراضي القديم لسه موجود (nonisolated)، فاعرف الاتنين.`,
          example: R`actor BankAccount {
  private(set) var balance = 0
  func deposit(_ amount: Int) {
    balance += amount
  }
}
struct Transfer: Sendable {
  let id: Int
  let amount: Int
}
@MainActor
final class DashboardModel {
  var status = "مستني"
  func refresh(using account: BankAccount) async {
    status = "بيحدث..."
    let total = await account.balance
    status = "الرصيد: \(total)"
  }
}
let account = BankAccount()
let transfers = (1...1000).map { Transfer(id: $0, amount: 1) }
await withTaskGroup(of: Void.self) { group in
  for t in transfers {
    group.addTask {
      await account.deposit(t.amount)
    }
  }
}
print(await account.balance)
let model = DashboardModel()
await model.refresh(using: account)
print(model.status)`,
          try: R`غيّر [[actor BankAccount]] لـ [[final class BankAccount]] وشيل الـ [[await]] اللي قبل [[account.deposit]] وشغّل بـ [[swift -swift-version 6 main.swift]]. اقرا الخطأ. وبعدين جرّب تقرا [[account.balance]] من غير [[await]] والـ actor رجع actor.`,
          flag: "script",
          deep: {
            why: R`الـ crashes العشوائية من data races كانت من أصعب الـ bugs في iOS: بتحصل عند مستخدم واحد من ألف، ومش بتحصل عندك. Swift 6 حولتها لأخطاء compile: لو الكود ممكن يعمل race، مش هيترجم. التمن إنك لازم تفهم الـ actors و Sendable، وده سبب إن الموضوع ده بقى من أهم أسئلة انترفيو iOS.`,
            how: R`كل actor ليه «صندوق بريد»: الطلبات بتقف في طابور وبتتنفذ واحد واحد، فمفيش اتنين بيعدّلوا [[balance]] في نفس الوقت. الـ 1000 task اتنفذوا بالتوازي بس كل [[deposit]] اتنفذ لوحده، فالنتيجة 1000 بالظبط. لو كان class عادي في Swift 5 من غير حماية، الرقم ممكن كان يطلع أقل.

[[await account.balance]]: قراية property من actor تاني محتاجة [[await]]. وجوه [[refresh]] (اللي على الـ MainActor)، الـ [[await]] بيسيب الـ main thread فاضي وهو مستني، وبيرجع عليه لما الرد ييجي، فـ [[status]] بيتعدل على الـ main thread دايمًا.

Reentrancy: جوه actor، عند كل [[await]] ممكن task تاني يدخل ويغيّر الـ state. فمتفترضش إن القيمة اللي قريتها قبل [[await]] لسه زي ما هي بعده.

الكود ده بيشتغل على Linux بـ [[swift main.swift]] وبـ [[swift -swift-version 6 main.swift]] من غير أي تحذير.`,
            when: R`[[@MainActor]] على أي view model وأي حاجة بتلمس UI. [[actor]] لـ state مشتركة بتتعدل من أماكن كتير (cache للصور، token manager بيعمل refresh مرة واحدة، عداد). و [[Sendable]] على كل الـ models اللي بتعدّي بين الشبكة والـ UI.`,
            mistakes: R`تحط [[@MainActor]] على service الشبكة كله فتعمل parsing تقيل على الـ main thread. وتعمل كل حاجة actor «احتياطي» فكل سطر يبقى [[await]]. وتستخدم [[@unchecked Sendable]] أو [[nonisolated(unsafe)]] عشان تسكّت الـ compiler من غير ما تفهم المشكلة. وتنسى الـ reentrancy فتعمل نفس الطلب مرتين.`
          },
          teach: R`## البرنامج بيعمل إيه؟

حساب بنكي ([[BankAccount]]) بيستقبل ١٠٠٠ إيداع بجنيه واحد **في نفس الوقت** من ١٠٠٠ task. لو الحماية غلط، إيداعين ممكن يقروا نفس الرصيد ويكتبوا فوق بعض فيضيع جنيه (ده الـ data race). وبعدين view model على الـ main thread بيقرا الرصيد ويحدّث حالته.

الناتج والأخطاء هنا من [[swift -swift-version 6 main.swift]] على Swift 6.4 في Docker (لينكس). الكود Swift عادي، فبيشتغل زي ما هو. ([[-swift-version 6]] = شغّل بقواعد Swift 6 الصارمة، فمشاكل الـ concurrency بتبقى errors.)

---

## ١. [[actor BankAccount]]

~~~swift
actor BankAccount {
  private(set) var balance = 0
  func deposit(_ amount: Int) {
    balance += amount
  }
}
~~~

- [[actor]]: زي [[class]] (reference type)، بس بيضمن إن task **واحد بس** يلمس الـ state بتاعته في اللحظة الواحدة. الطلبات بتقف في طابور وتتنفذ واحد واحد.
- [[private(set)]]: القراية من برة مسموحة، الكتابة من جوه بس.
- [[deposit]] كود عادي من غير locks: الـ actor هو اللي بيحمي.

---

## ٢. [[struct Transfer: Sendable]]

~~~swift
struct Transfer: Sendable {
  let id: Int
  let amount: Int
}
~~~

[[Sendable]] = «آمن يتنقل من task لـ task». struct خاناته كلها [[let]] من أنواع Sendable ([[Int]]) آمن طبيعي، لأن كل task بياخد نسخة.

---

## ٣. [[@MainActor final class DashboardModel]]

~~~swift
@MainActor
final class DashboardModel {
  var status = "مستني"
  func refresh(using account: BankAccount) async {
    status = "بيحدث..."
    let total = await account.balance
    status = "الرصيد: \(total)"
  }
}
~~~

- [[@MainActor]]: الـ class كله على الـ main thread (اللي بيرسم الشاشة). ده المكان الصح لأي state بتتعرض.
- [[await account.balance]]: حتى **قراية** property من actor تاني محتاجة [[await]]، لأننا ممكن نستنى دورنا في الطابور. وانت مستني، الـ main thread فاضي يرسم.
- بعد الـ [[await]] بنرجع على الـ main thread، فـ [[status]] بيتعدل في مكانه الصح.

---

## ٤. ١٠٠٠ إيداع مع بعض

~~~swift
let account = BankAccount()
let transfers = (1...1000).map { Transfer(id: $0, amount: 1) }
await withTaskGroup(of: Void.self) { group in
  for t in transfers {
    group.addTask {
      await account.deposit(t.amount)
    }
  }
}
print(await account.balance)
~~~

- [[(1...1000).map { ... }]]: ١٠٠٠ تحويل، [[$0]] رقم التحويل.
- [[withTaskGroup(of: Void.self)]]: مجموعة tasks مش بترجّع حاجة ([[Void]]).
- [[group.addTask { }]]: task جديد لكل تحويل، وكلهم بيشتغلوا بالتوازي.
- [[await account.deposit(...)]]: كل واحد بيقف في طابور الـ actor.
- الـ group مش بيخلص غير لما الـ ١٠٠٠ يخلصوا.

---

## ٥. الـ view model

~~~swift
let model = DashboardModel()
await model.refresh(using: account)
print(model.status)
~~~

~~~text الناتج (Swift 6.4، لينكس، بـ -swift-version 6)
1000
الرصيد: 1000
~~~

١٠٠٠ بالظبط كل مرة: ولا إيداع ضاع.

---

## ٦. الـ try: نشيل الحماية

### لو [[final class]] بدل [[actor]] ومن غير [[await]]

~~~text الناتج (Swift 6.4، بـ -swift-version 6)
main.swift:25:7: error: non-Sendable type 'BankAccount' of let 'account' cannot exit main actor-isolated context
main.swift:25:7: error: main actor-isolated let 'account' cannot be accessed from outside of the actor
main.swift:29:7: warning: no 'async' operations occur within 'await' expression
~~~

نقراها:

1. [[account]] متعرّف في الـ top-level بتاع [[main.swift]]، وده بيبقى على الـ MainActor.
2. الـ tasks اللي في الـ group شغالة **برة** الـ MainActor، وعايزة توصل لـ object من نوع مش Sendable. الـ compiler بيرفض: ده بالظبط الـ data race.
3. الـ warning: [[await account.balance]] بقى ملوش لازمة لأن الـ class مش actor.

### لو قريت [[account.balance]] من غير [[await]] والـ actor زي ما هو

~~~text الناتج
main.swift:29:15: error: actor-isolated property 'balance' cannot be accessed from outside of the actor
~~~

يعني: الخانة دي جوه الـ actor، ومن برة لازم [[await]].

---

## الخلاصة

| الأداة | بتعمل إيه | إمتى |
|---|---|---|
| [[actor]] | task واحد بس جوه في نفس الوقت | state مشتركة بتتعدل من أماكن كتير |
| [[@MainActor]] | الكود على الـ main thread | أي حاجة بتلمس الـ UI، والـ view models |
| [[Sendable]] | النوع آمن يتنقل بين tasks | الـ models اللي بتعدّي بين الشبكة والشاشة |
| [[await]] على actor | استنى دورك من غير ما تقفل الـ thread | أي نداء أو قراية من برة الـ actor |

- Swift 6 بتحوّل الـ data races لأخطاء compile، فالـ bug مش بيوصل للمستخدم.
- عند كل [[await]] جوه actor، task تاني ممكن يدخل ويغيّر الـ state (reentrancy).`,
          lines: [
            R`[[actor]]: task واحد بس جواه في نفس الوقت.`,
            R`[[private(set)]]: التعديل من جوه بس.`,
            "method عادية من غير locks.",
            "التعديل آمن.",
            "قفلة.",
            "قفلة.",
            R`[[Sendable]]: آمن يتنقل بين tasks.`,
            "let.",
            "let.",
            "قفلة.",
            R`[[@MainActor]]: الـ class ده كله على الـ main thread.`,
            "view model.",
            "state بتتعرض في الـ UI.",
            "async method.",
            "تعديل على الـ main thread.",
            R`[[await]]: قراية من actor تاني، وبنستنى من غير ما نقفل الـ main thread.`,
            "رجعنا على الـ main thread ونعدّل.",
            "قفلة.",
            "قفلة.",
            "actor واحد.",
            "1000 تحويل.",
            "task group.",
            "لكل تحويل.",
            "task موازي.",
            R`[[await]] على الـ actor: بيقف في الطابور.`,
            "قفلة.",
            "قفلة.",
            "قفلة.",
            "1000 بالظبط.",
            "الـ view model.",
            "التحديث.",
            "الحالة الأخيرة."
          ],
          sol: R`ناتج المثال: [[1000]] ثم [[الرصيد: 1000]].

لما تحوّله لـ class من غير حماية وتشغّل بـ Swift 6 mode، الـ compiler بيرفض: الـ tasks كلها عايزة توصل لنفس الـ object وهو مش Sendable. في [[main.swift]] على Swift 6.4 الرسايل بالظبط:
[[non-Sendable type 'BankAccount' of let 'account' cannot exit main actor-isolated context]]
[[main actor-isolated let 'account' cannot be accessed from outside of the actor]]
(الـ [[account]] هنا top-level، فهو على الـ MainActor. ونسخ Swift 6 الأقدم كانت بتكتبها [[... cannot cross actor boundary]]). ولو نفس الكود جوه دالة والـ object متغير محلي، الرسالة بتبقى [[passing closure as a 'sending' parameter risks causing data races...]]. نفس المشكلة بصياغات مختلفة.

ولو قريت [[account.balance]] والـ actor رجع actor من غير [[await]]: [[actor-isolated property 'balance' cannot be accessed from outside of the actor]] على Swift 6.4 (النسخ الأقدم: [[... can not be referenced from a nonisolated context]]، أو [[expression is 'async' but is not marked with 'await']] حسب المكان).`
        },
        {
          cmd: "Swift 6 strict concurrency",
          title: "أشهر أخطاء Swift 6 strict concurrency وحلها: static var، و class مش Sendable، والـ UI من برة الـ MainActor",
          desc: R`Swift 6 language mode بيحوّل تحذيرات الـ concurrency لأخطاء. ولو بتنقل مشروع قديم هتلاقي عشرات. الخبر الحلو: أغلبهم من 4 أنواع وحلهم معروف.

1. [[static property 'x' is not concurrency-safe because it is nonisolated global shared mutable state]]: عندك [[static var]] أو global [[var]] ممكن أي thread يعدّله. الحل بالترتيب: خليه [[let]] لو مش بيتغير، أو [[@MainActor static var]] لو بيتغير من الـ UI، أو حطه جوه actor. و [[nonisolated(unsafe)]] آخر حل لو متأكد إن مفيش race.

2. [[stored property 'x' of 'Sendable'-conforming class is mutable]] أو [[non-sendable type]]: نوع بيتنقل بين tasks ومش آمن. الحل: حوّله لـ struct، أو خلي properties الـ class كلها [[let]] و [[final]]، أو حوّله لـ actor.

3. [[passing closure as a 'sending' parameter risks causing data races]]: closure بيمسك object مش Sendable وبيتبعت لـ task تاني. الحل: ابعت قيم Sendable بدل الـ object، أو خلي الـ object actor.

4. [[main actor-isolated property 'x' can not be mutated from a nonisolated context]]: بتعدّل UI state من كود مش على الـ main actor. الحل: [[@MainActor]] على الـ class أو الدالة، أو [[await MainActor.run { }]].

الخطة الواقعية لنقل مشروع: من Build Settings ابدأ بـ [[Strict Concurrency Checking = Complete]] وانت لسه على Swift 5 mode (تحذيرات بس)، صلّحهم module module، وبعدين حوّل الـ [[Swift Language Version]] لـ 6. وفي Package.swift: [[swiftLanguageModes: [.v6]]] (أو [[.v5]] لو لسه مش جاهز).

والمثال تحت كله بيترجم في Swift 6 mode من غير أخطاء (اتجرب بـ [[swift -swift-version 6]])، وكل جزء فيه هو «الحل» لنوع من الأخطاء دي.`,
          example: R`struct Config {
  // كانت static var: خطأ 1. الحل let
  static let baseURL = "https://api.example.com"
  // لو لازم تتغير: اربطها بالـ MainActor
  @MainActor static var showDebugMenu = false
}
// struct كل properties بتاعته Sendable: آمن
struct Order: Sendable {
  let id: Int
  let total: Double
}
// class Sendable: لازم final وكل حاجة let
final class AppInfo: Sendable {
  let version: String
  init(version: String) { self.version = version }
}
// state متغيرة مشتركة بين tasks: actor
actor BigOrdersCounter {
  private(set) var count = 0
  func record() { count += 1 }
}
func countBigOrders(_ orders: [Order]) async -> Int {
  let counter = BigOrdersCounter()
  await withTaskGroup(of: Void.self) { group in
    for order in orders where order.total > 100 {
      group.addTask { await counter.record() }
    }
  }
  return await counter.count
}
let orders = [Order(id: 1, total: 50), Order(id: 2, total: 150), Order(id: 3, total: 300)]
print(await countBigOrders(orders))
Config.showDebugMenu = true
print(Config.baseURL, Config.showDebugMenu, AppInfo(version: "1.2").version)`,
          try: R`اعمل الحاجات دي واحدة واحدة وشغّل بـ [[swift -swift-version 6 main.swift]]: غيّر [[static let baseURL]] لـ [[static var]]. غيّر [[let version]] لـ [[var version]]. غيّر [[actor BigOrdersCounter]] لـ [[final class]]. اكتب رسالة كل خطأ وحلّه.`,
          flag: "script",
          deep: {
            why: R`الشركات بتنقل مشاريعها لـ Swift 6 دلوقتي، والمطوّر اللي يفهم الأخطاء دي ويحلها صح (مش بـ [[@unchecked Sendable]] في كل حتة) مطلوب جدًا. وكمان الأخطاء دي بتطلع فعلًا bugs حقيقية كانت مستخبية.`,
            how: R`الـ compiler بيعمل تحليل «isolation»: كل متغير ودالة إما مربوطة بـ actor معين (MainActor أو actor بتاعك) أو nonisolated. وكل ما قيمة بتعدّي من isolation لـ isolation تاني، لازم تبقى Sendable أو يثبت إنها «disconnected» (محدش تاني ماسكها، وده region-based isolation من Swift 6).

المتغيرات اللي في الـ top-level بتاع [[main.swift]] (زي [[orders]]) بتبقى [[@MainActor]] لوحدها، وعشان كده قدرنا نعدّل [[Config.showDebugMenu]] من هناك من غير [[await]].

[[@MainActor static var]]: القراية والكتابة لازم من الـ MainActor، ومن برة لازم [[await]].`,
            when: R`كل مشروع جديد ابدأه Swift 6 (أو بالإعدادات الجديدة بتاعة Xcode 26 اللي بتخلي الافتراضي MainActor). والمشاريع القديمة نقلها تدريجي بـ Strict Concurrency Checking الأول.`,
            mistakes: R`[[@unchecked Sendable]] على كل class عشان الخطأ يختفي: كده رجعت الـ races بس مستخبية. و [[nonisolated(unsafe)]] على كل [[static var]]. و [[@MainActor]] على كل حاجة في التطبيق بما فيها الـ parsing التقيل. وتحوّل الـ language mode لـ 6 مرة واحدة في مشروع كبير فيطلعلك 400 خطأ.`
          },
          teach: R`## البرنامج بيعمل إيه؟

كل حتة في الكود ده هي **الحل** لخطأ من أخطاء Swift 6 المشهورة: إعدادات [[static]]، و struct و class آمنين يتنقلوا بين tasks، و actor بيعد الطلبات اللي فوق ١٠٠ جنيه من tasks شغالة بالتوازي. وفي الآخر بيطبع النتيجة والإعدادات.

كل الناتج والأخطاء هنا من [[swift -swift-version 6 main.swift]] على Swift 6.4 في Docker (لينكس). ([[-swift-version 6]] = Swift 6 language mode، اللي فيه مشاكل الـ concurrency errors مش تحذيرات.) إعدادات Xcode (Build Settings) من docs بتاعة Apple.

---

## ١. [[Config]]: الـ static

~~~swift
struct Config {
  // كانت static var: خطأ 1. الحل let
  static let baseURL = "https://api.example.com"
  // لو لازم تتغير: اربطها بالـ MainActor
  @MainActor static var showDebugMenu = false
}
~~~

- [[static]]: الخانة على النوع نفسه مش على كل object، يعني نسخة واحدة في البرنامج كله، وأي thread يقدر يوصلها.
- [[static let]]: ثابت. محدش يقدر يغيّره، فمفيش race. ده أول حل.
- [[@MainActor static var]]: متغير، بس مربوط بالـ main thread، فالقراية والكتابة بتحصل من هناك بس.

جربنا نرجّع [[baseURL]] لـ [[static var]] (أول خطوة في الـ try):

~~~text الناتج
main.swift:3:14: error: static property 'baseURL' is not concurrency-safe because it is nonisolated global shared mutable state
~~~

نفكها: «الخانة دي مش آمنة، لأنها (nonisolated) مش مربوطة بأي actor، و (global shared) متشاركة في البرنامج كله، و (mutable) بتتغير».

---

## ٢. [[Order]]: struct Sendable

~~~swift
// struct كل properties بتاعته Sendable: آمن
struct Order: Sendable {
  let id: Int
  let total: Double
}
~~~

struct = value type: كل task بياخد نسخته. وخاناته [[Int]] و [[Double]] (Sendable)، فالـ struct كله Sendable.

---

## ٣. [[AppInfo]]: class Sendable

~~~swift
// class Sendable: لازم final وكل حاجة let
final class AppInfo: Sendable {
  let version: String
  init(version: String) { self.version = version }
}
~~~

الـ class reference type: كل الـ tasks بتشاور على **نفس** الـ object. فعشان يبقى Sendable لازم: [[final]] (محدش يورث ويزود خانة متغيرة)، وكل خاناته [[let]] من أنواع Sendable.

لو [[let version]] بقت [[var version]] (الخطوة التانية في الـ try):

~~~text الناتج
main.swift:14:7: error: stored property 'version' of 'Sendable'-conforming class 'AppInfo' is mutable
~~~

---

## ٤. [[BigOrdersCounter]]: actor

~~~swift
// state متغيرة مشتركة بين tasks: actor
actor BigOrdersCounter {
  private(set) var count = 0
  func record() { count += 1 }
}
~~~

عداد بيتعدل من tasks كتير في نفس الوقت = لازم actor (task واحد جوه في المرة).

---

## ٥. [[countBigOrders]]

~~~swift
func countBigOrders(_ orders: [Order]) async -> Int {
  let counter = BigOrdersCounter()
  await withTaskGroup(of: Void.self) { group in
    for order in orders where order.total > 100 {
      group.addTask { await counter.record() }
    }
  }
  return await counter.count
}
~~~

- [[for order in orders where order.total > 100]]: loop بشرط: الطلبات اللي فوق ١٠٠ بس.
- [[group.addTask { await counter.record() }]]: task لكل طلب كبير. الـ closure بيمسك [[counter]] (actor، Sendable دايمًا)، فآمن.
- [[return await counter.count]]: قراية من الـ actor بـ [[await]].

لو الـ actor بقى [[final class]] (الخطوة التالتة):

~~~text الناتج
main.swift:26:23: warning: no 'async' operations occur within 'await' expression
main.swift:26:13: error: passing closure as a 'sending' parameter risks causing data races between code in the current isolation context and concurrent execution of the closure
~~~

- الـ warning: [[await]] على method class عادي ملوش لازمة.
- الـ error: الـ closure (اللي بيتبعت لـ task تاني، [['sending']]) ماسك object مش Sendable، وكل الـ tasks هتعدّل فيه مع بعض.

---

## ٦. الـ top-level

~~~swift
let orders = [Order(id: 1, total: 50), Order(id: 2, total: 150), Order(id: 3, total: 300)]
print(await countBigOrders(orders))
Config.showDebugMenu = true
print(Config.baseURL, Config.showDebugMenu, AppInfo(version: "1.2").version)
~~~

الكود اللي في الـ top-level بتاع [[main.swift]] بيبقى على الـ MainActor لوحده، فـ [[Config.showDebugMenu = true]] مسموحة من غير [[await]].

~~~text الناتج (Swift 6.4، بـ -swift-version 6)
2
https://api.example.com true 1.2
~~~

[[2]] = الطلبين اللي ١٥٠ و ٣٠٠.

---

## ٧. الخطأ الرابع: UI من برة الـ MainActor

مش في المثال، فجربناه لوحده:

~~~swift
@MainActor
final class ScreenModel {
  var title = ""
}
func update(_ model: ScreenModel) {
  model.title = "x"
}
~~~

~~~text الناتج
model.swift:6:9: error: main actor-isolated property 'title' can not be mutated from a nonisolated context
~~~

[[update]] مش على الـ MainActor، فمينفعش تعدّل خانة مربوطة بيه. الحل: [[@MainActor]] على الدالة، أو [[await MainActor.run { model.title = "y" }]] من دالة async (جربناها وعدّت من غير أخطاء).

## الخلاصة

| الخطأ | الحل بالترتيب |
|---|---|
| [[static property ... is not concurrency-safe]] | [[let]]، أو [[@MainActor]]، أو actor |
| [[stored property ... of 'Sendable'-conforming class ... is mutable]] | [[let]]، أو struct، أو actor |
| [[passing closure as a 'sending' parameter ...]] | ابعت قيم Sendable، أو خلي الـ object actor |
| [[main actor-isolated property ... can not be mutated ...]] | [[@MainActor]] أو [[MainActor.run]] |

- [[@unchecked Sendable]] و [[nonisolated(unsafe)]] بيسكّتوا الـ compiler بس، مش بيحلوا المشكلة.`,
          lines: [
            "struct للإعدادات.",
            R`[[static let]]: ثابت، فآمن من أي thread.`,
            R`[[@MainActor static var]]: متغير، بس مربوط بالـ main thread.`,
            "قفلة.",
            R`struct [[Sendable]].`,
            "let.",
            "let.",
            "قفلة.",
            R`class [[Sendable]]: [[final]] وكل حاجة [[let]].`,
            "let.",
            "init.",
            "قفلة.",
            R`[[actor]] للـ state المتغيرة.`,
            "عداد.",
            "التعديل جوه الـ actor.",
            "قفلة.",
            "دالة async.",
            "actor جديد.",
            "task group.",
            R`[[where]] الطلبات الكبيرة بس.`,
            R`كل task بيكلم الـ actor بـ [[await]]. [[order]] Sendable فآمن يتمسك.`,
            "قفلة.",
            "قفلة.",
            "النتيجة.",
            "قفلة.",
            "3 طلبات.",
            "بيطبع 2.",
            R`top-level على الـ MainActor، فمسموح نعدّل.`,
            "بيطبع القيم."
          ],
          sol: R`ناتج المثال: [[2]] ثم [[https://api.example.com true 1.2]].

الأخطاء (بـ [[swift -swift-version 6 main.swift]]، كل تغيير لوحده):
• [[static var baseURL]] ← [[static property 'baseURL' is not concurrency-safe because it is nonisolated global shared mutable state]]. الحل [[let]] أو [[@MainActor]].
• [[var version]] في class Sendable ← [[stored property 'version' of 'Sendable'-conforming class 'AppInfo' is mutable]]. الحل [[let]]، أو struct، أو actor.
• [[final class BigOrdersCounter]] بدل actor ← الـ [[await]] على [[record()]] بقى ملوش لازمة (تحذير)، والـ tasks بتمسك object مش Sendable فبيطلع [[passing closure as a 'sending' parameter risks causing data races...]]. الحل يرجع actor.`
        },
        {
          cmd: "Swift Package Manager",
          title: "تضيف مكتبة لمشروعك بـ Swift Package Manager، وتقسّم كودك لـ packages بـ Package.swift",
          desc: R`Swift Package Manager (SPM) هو مدير المكتبات الرسمي لـ Swift، ومدمج في Xcode وفي الـ toolchain على Linux و Windows. (زمان كان فيه CocoaPods و Carthage. CocoaPods لسه موجود في مشاريع قديمة كتير، بس فريقه أعلن إن الـ trunk بتاعه هيتقفل للنشر الجديد ويبقى read-only في أواخر 2026، فالجديد كله SPM).

إضافة مكتبة لتطبيق في Xcode: File ← Add Package Dependencies ← حط لينك الـ GitHub ← اختار الـ version rule (Up to Next Major غالبًا) ← اختار الـ target. Xcode بيكتب الـ versions المحددة في [[Package.resolved]]، وده لازم يترفع على git عشان الفريق كله ياخد نفس النسخ.

عمل package بتاعك: [[Package.swift]] بيوصف:
• [[name]] و [[platforms]] (أقل نسخ OS).
• [[products]]: اللي الناس تقدر تستخدمه ([[.library]] أو [[.executable]]).
• [[dependencies]]: مكتبات تانية بلينك ونسخة.
• [[targets]]: كل target فولدر في [[Sources/]]، و [[.testTarget]] فولدر في [[Tests/]].

أول سطر [[// swift-tools-version: 6.0]] مش تعليق عادي: إجباري، وبيحدد نسخة SPM اللي بتقرا الملف (ومعاها الـ language mode الافتراضي).

ليه تقسّم تطبيقك لـ packages محلية (modularization)؟ build أسرع لأن كل module بيتبني لوحده، وحدود واضحة ([[public]] بس اللي يطلع برة)، واختبارات أسرع من غير simulator. التطبيقات الكبيرة في الشركات بتبقى عبارة عن app target صغير + 10 أو 20 package محلي.

الأوامر: [[swift build]] و [[swift test]] و [[swift package update]] (يحدّث النسخ في حدود القواعد) و [[swift package resolve]].`,
          example: R`// swift-tools-version: 6.0
import PackageDescription

let package = Package(
  name: "PriceKit",
  platforms: [.iOS(.v17), .macOS(.v14)],
  products: [
    .library(name: "PriceKit", targets: ["PriceKit"]),
  ],
  dependencies: [
    .package(url: "https://github.com/apple/swift-algorithms", from: "1.2.0"),
  ],
  targets: [
    .target(
      name: "PriceKit",
      dependencies: [.product(name: "Algorithms", package: "swift-algorithms")]
    ),
    .testTarget(name: "PriceKitTests", dependencies: ["PriceKit"]),
  ]
)`,
          try: R`اعمل [[swift package init --type library --name PriceKit]]، وحط الـ Package.swift ده، واكتب في [[Sources/PriceKit/Price.swift]] دالة [[public func applyDiscount(_ price: Double, percent: Double) -> Double]]، وكمان دالة بتستخدم [[chunks(ofCount:)]] من swift-algorithms. وشغّل [[swift build]]. (ده بيشتغل على Linux كمان).`,
          flag: "script",
          deep: {
            why: R`مفيش تطبيق حقيقي من غير مكتبات: Firebase، و Kingfisher للصور، و Alamofire عند البعض، و Lottie للـ animations. ولازم تعرف تضيفها وتثبّت نسخها. والـ modularization بقت سؤال انترفيو للـ seniors: «إزاي تقسم تطبيق كبير؟».`,
            how: R`SPM بيحل شجرة الـ dependencies: بيجيب كل مكتبة بالـ git tag المناسب للقاعدة ([[from: "1.2.0"]] يعني أي 1.x.x من 1.2.0 لفوق، semantic versioning)، وبيكتب النسخ النهائية في [[Package.resolved]]. وبعدين بيبني كل target كـ module منفصل.

[[.product(name:package:)]] بيقول «من الـ package اسمه swift-algorithms، استخدم الـ product اسمه Algorithms». والـ test target بيعتمد على الـ target بتاعك باسمه. و [[platforms]] بيمنع استخدام الـ package على نسخ أقدم.

الـ package ده اتبنى واتختبر فعلًا على Linux بـ [[swift build]] و [[swift test]] (Swift 6.0، واتجرب تاني على Swift 6.4).`,
            when: R`أي مكتبة خارجية: SPM أول اختيار. وابدأ تقسيم تطبيقك لـ packages محلية لما المشروع يكبر أو لما فيه أكتر من مطوّر (Networking و DesignSystem و Features).`,
            mistakes: R`تحط [[branch: "main"]] بدل version فكل build ممكن ياخد كود مختلف. ومترفعش [[Package.resolved]] على git. وتضيف مكتبة ضخمة لحاجة بسيطة (Alamofire لطلب GET واحد بدل URLSession). وتنسى [[public]] على الحاجات اللي التطبيق محتاجها من الـ package فيطلع [[cannot find 'x' in scope]].`
          },
          teach: R`## الملف ده بيعمل إيه؟

ده [[Package.swift]]: الوصف بتاع package اسمه [[PriceKit]]. بيقول: اسمه إيه، وشغال على أنهي أنظمة، وبيطلع للناس إيه (library)، ومحتاج مكتبة خارجية ([[swift-algorithms]] من Apple)، وفيه target كود و target اختبارات.

كل الناتج هنا من [[swift package init]] و [[swift build]] و [[swift test]] على Swift 6.4 في Docker (لينكس)، بنفس الـ [[Package.swift]] ده والكود اللي في الـ solCode. خطوات Xcode (Add Package Dependencies) من docs بتاعة Apple.

---

## ١. البداية: [[swift package init]]

~~~bash
swift package init --type library --name PriceKit
~~~

- [[--type library]]: مكتبة (مش برنامج بيتشغّل). و [[--name PriceKit]] اسمها.

~~~text الناتج (Swift 6.4، لينكس)
Creating library package: PriceKit
Creating Package.swift
Creating .gitignore
Creating Sources
Creating Sources/PriceKit/PriceKit.swift
Creating Tests/
Creating Tests/PriceKitTests/
Creating Tests/PriceKitTests/PriceKitTests.swift
~~~

الشكل ده هو اللي SPM بيدور عليه: كل target فولدر باسمه في [[Sources/]]، والاختبارات في [[Tests/]].

---

## ٢. أول سطر: [[// swift-tools-version: 6.0]]

~~~swift
// swift-tools-version: 6.0
import PackageDescription
~~~

- شكله تعليق، بس **إجباري** وبيتقري: أقل نسخة SPM تقدر تقرا الملف، ومعاها الـ language mode الافتراضي (٦.٠ = Swift 6 mode). الـ init على Swift 6.4 كتب [[6.4]]، واحنا نزّلناه لـ [[6.0]] عشان أي حد عنده Swift 6.0 أو أحدث يبنيه.
- [[import PackageDescription]]: المكتبة اللي فيها [[Package]] و [[.target]] وغيرهم.

---

## ٣. [[Package(...)]]

~~~swift
let package = Package(
  name: "PriceKit",
  platforms: [.iOS(.v17), .macOS(.v14)],
~~~

- [[let package]]: SPM بيدور على ثابت بالاسم ده بالظبط.
- [[platforms]]: أقل iOS 17 وأقل macOS 14. على لينكس الإعداد ده ملوش تأثير.

---

## ٤. [[products]]: اللي بيطلع للناس

~~~swift
  products: [
    .library(name: "PriceKit", targets: ["PriceKit"]),
  ],
~~~

library اسمها [[PriceKit]] معمولة من الـ target اللي اسمه [[PriceKit]]. ده اللي تطبيق تاني هيكتبه في الـ dependencies بتاعته.

---

## ٥. [[dependencies]]: مكتبات خارجية

~~~swift
  dependencies: [
    .package(url: "https://github.com/apple/swift-algorithms", from: "1.2.0"),
  ],
~~~

- [[url]]: لينك الـ git repo.
- [[from: "1.2.0"]]: semantic versioning (major.minor.patch): أي نسخة من 1.2.0 لحد قبل 2.0.0. الـ major بيتغير لما فيه تغيير بيكسر الكود، فـ SPM مش بيعدّيه لوحده.

---

## ٦. [[targets]]

~~~swift
  targets: [
    .target(
      name: "PriceKit",
      dependencies: [.product(name: "Algorithms", package: "swift-algorithms")]
    ),
    .testTarget(name: "PriceKitTests", dependencies: ["PriceKit"]),
  ]
)
~~~

- [[.target(name: "PriceKit")]]: الكود في [[Sources/PriceKit/]]، وبيتبني module اسمه [[PriceKit]].
- [[.product(name: "Algorithms", package: "swift-algorithms")]]: من الـ package اللي اسمه [[swift-algorithms]] (آخر جزء من الـ URL)، خد الـ product اللي اسمه [[Algorithms]]. وده اللي بتكتبه في الكود: [[import Algorithms]].
- [[.testTarget]]: الاختبارات في [[Tests/PriceKitTests/]]، ومعتمدة على [[PriceKit]] باسمه.

---

## ٧. [[swift build]]

~~~text الناتج (أول مرة، مختصر)
Fetching https://github.com/apple/swift-algorithms
Fetched https://github.com/apple/swift-algorithms (3.05s)
Computed https://github.com/apple/swift-algorithms at 1.2.1 (4.43s)
Fetching https://github.com/apple/swift-numerics.git
Computed https://github.com/apple/swift-numerics.git at 1.1.1 (3.19s)
Working copy of https://github.com/apple/swift-algorithms resolved at 1.2.1
...
Build complete! (8.20 secs)
~~~

نقراه:

1. نزّل swift-algorithms، واختار **1.2.1** (أحدث نسخة بتحقق [[from: "1.2.0"]]).
2. swift-algorithms نفسها محتاجة swift-numerics، فنزّلها كمان (transitive dependency).
3. بنى كل target كـ module لوحده.

والنسخ اللي اختارها اتكتبت في [[Package.resolved]]:

~~~text Package.resolved (جزء منه)
"identity" : "swift-algorithms",
"location" : "https://github.com/apple/swift-algorithms",
"state" : {
  "revision" : "87e50f483c54e6efd60e885f7f5aa946cee68023",
  "version" : "1.2.1"
}
~~~

[[revision]] = الـ commit بالظبط. ارفع الملف ده على git، فكل الفريق والـ CI يبنوا بنفس النسخ.

---

## ٨. الـ solCode: كود الـ target

~~~swift
import Algorithms

public enum PriceError: Error, Equatable {
  case invalidPercent(Double)
}

public func applyDiscount(_ price: Double, percent: Double) -> Double {
  price - price * percent / 100
}
~~~

- [[public]]: من غيرها الدالة [[internal]]، يعني مش هتبان للتطبيق اللي بيستخدم الـ package ([[cannot find 'applyDiscount' in scope]]).
- [[Equatable]] على الـ error عشان الاختبار يقارنه بـ [[==]].
- [[checkedDiscount]] بيرمي لو النسبة برة [[0...100]].
- [[prices.sorted().chunks(ofCount: 2).map(Array.init)]]: رتّب، وقسّم مجموعات كل واحدة ٢ ([[chunks(ofCount:)]] من swift-algorithms)، وحوّل كل مجموعة لـ array. فـ [[[30, 10, 20]]] بتبقى [[[[10, 20], [30]]]] (الاختبار في درس Swift Testing اتأكد من أول مجموعة).

وبالكود ده والاختبارات بتاعة درس Swift Testing، [[swift test]] على Swift 6.4 طلّع: [[Test run with 6 tests in 2 suites passed]].

| الأمر | بيعمل إيه |
|---|---|
| [[swift package init]] | يعمل الهيكل |
| [[swift build]] | يجيب الـ dependencies ويبني |
| [[swift test]] | يبني ويشغّل الاختبارات |
| [[swift package update]] | يحدّث النسخ في حدود القواعد |
| [[swift package resolve]] | يجيب النسخ اللي في [[Package.resolved]] |

## الخلاصة

- [[Package.swift]] = اسم + منصات + products + dependencies + targets.
- [[from:]] بيثبّت الـ major، و [[Package.resolved]] بيثبّت النسخة بالظبط، فارفعه.
- اللي عايزه يطلع برة الـ package لازم [[public]].`,
          lines: [
            R`[[PackageDescription]]: الـ API بتاع وصف الـ package.`,
            R`[[Package(...)]] الوصف كله.`,
            "اسم الـ package.",
            "أقل نسخ iOS و macOS.",
            "اللي بيطلع للناس.",
            R`[[.library]] اسمها PriceKit من الـ target ده.`,
            "قفلة.",
            "المكتبات الخارجية.",
            R`لينك ونسخة: [[from]] = أي 1.x من 1.2.0.`,
            "قفلة.",
            "الـ targets.",
            R`[[.target]]: كود في [[Sources/PriceKit]].`,
            "اسمه.",
            R`بيعتمد على product [[Algorithms]].`,
            "قفلة.",
            R`[[.testTarget]]: اختبارات في [[Tests/PriceKitTests]].`,
            "قفلة الـ targets.",
            "قفلة الـ Package."
          ],
          sol: R`[[swift build]] أول مرة بيعمل [[Fetching https://github.com/apple/swift-algorithms]] و swift-numerics (dependency بتاعتها)، وبعدين بيبني و [[Build complete!]]. وهتلاقي [[Package.resolved]] اتعمل.

الكود اللي اتجرب:`,
          solCode: R`// Sources/PriceKit/Price.swift
import Algorithms

public enum PriceError: Error, Equatable {
  case invalidPercent(Double)
}

public func applyDiscount(_ price: Double, percent: Double) -> Double {
  price - price * percent / 100
}

public func checkedDiscount(_ price: Double, percent: Double) throws -> Double {
  guard (0...100).contains(percent) else {
    throw PriceError.invalidPercent(percent)
  }
  return applyDiscount(price, percent: percent)
}

// chunks(ofCount:) من swift-algorithms
public func priceBuckets(_ prices: [Double]) -> [[Double]] {
  prices.sorted().chunks(ofCount: 2).map(Array.init)
}`
        }
      ]
    }
]);
