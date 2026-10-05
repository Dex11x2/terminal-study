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

لما تحوّله لـ class من غير حماية وتشغّل بـ Swift 6 mode، الـ compiler بيرفض: الـ tasks كلها عايزة توصل لنفس الـ object وهو مش Sendable. في [[main.swift]] الرسالة بالظبط:
[[non-sendable type 'BankAccount' in implicitly asynchronous access to main actor-isolated let 'account' cannot cross actor boundary]]
(الـ [[account]] هنا top-level، فهو على الـ MainActor). ولو نفس الكود جوه دالة والـ object متغير محلي، الرسالة بتبقى [[passing closure as a 'sending' parameter risks causing data races...]]. نفس المشكلة بصياغتين.

ولو قريت [[account.balance]] والـ actor رجع actor من غير [[await]]: [[actor-isolated property 'balance' can not be referenced from a nonisolated context]] (أو [[expression is 'async' but is not marked with 'await']] حسب المكان).`
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

الـ package ده اتبنى واتختبر فعلًا على Linux بـ [[swift build]] و [[swift test]] (Swift 6.0).`,
            when: R`أي مكتبة خارجية: SPM أول اختيار. وابدأ تقسيم تطبيقك لـ packages محلية لما المشروع يكبر أو لما فيه أكتر من مطوّر (Networking و DesignSystem و Features).`,
            mistakes: R`تحط [[branch: "main"]] بدل version فكل build ممكن ياخد كود مختلف. ومترفعش [[Package.resolved]] على git. وتضيف مكتبة ضخمة لحاجة بسيطة (Alamofire لطلب GET واحد بدل URLSession). وتنسى [[public]] على الحاجات اللي التطبيق محتاجها من الـ package فيطلع [[cannot find 'x' in scope]].`
          },
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
    },
    {
      t: "الاختبارات والـ debugging",
      l: 3,
      n: "Swift Testing بـ @Test و #expect، و XCTest القديم، والـ breakpoints و LLDB، و Instruments و Memory Graph",
      items: [
        {
          cmd: "Swift Testing",
          title: "تكتب unit tests بـ Swift Testing: @Test و #expect و #require والـ arguments، وإيه الفرق عن XCTest",
          desc: R`Swift Testing هو framework الاختبارات الجديد من Apple (من Xcode 16 و Swift 6، وشغال على Linux و Windows كمان). بيحل محل XCTest في الـ unit tests الجديدة، والاتنين ممكن يعيشوا في نفس المشروع.

الأساسيات:
• [[import Testing]] و [[@testable import MyApp]] (الـ [[@testable]] بيفتحلك الحاجات اللي [[internal]] في التطبيق).
• [[@Test func something() { }]]: اختبار. ممكن يبقى [[async]] و [[throws]]، وممكن جوه struct (الـ struct بيبقى suite، وبيتعمل من جديد لكل test، فمفيش state بتتسرب بين الاختبارات).
• [[@Test("وصف بالعربي")]]: اسم يظهر في التقرير.
• [[#expect(a == b)]]: لو غلط بيسجل فشل ويكمّل. والرسالة بتوريك القيم الحقيقية: [[(applyDiscount(...) → 150.0) == 160]].
• [[try #require(x)]]: لو فشل بيوقف الاختبار ده. ومع optional بيفكه: [[let first = try #require(items.first)]].
• [[#expect(throws: SomeError.x) { try f() }]]: بيتأكد إن الكود رمى الخطأ ده.
• [[@Test(arguments: [...])]]: نفس الاختبار على قيم كتير، وكل قيمة بتظهر لوحدها في التقرير.
• [[@Suite]] و tags و [[.disabled("سبب")]] للتنظيم.

XCTest (القديم، وهتلاقيه في كل مشروع موجود): [[final class PriceTests: XCTestCase]]، وكل method اسمها لازم يبدأ بـ [[test]]، و [[XCTAssertEqual(a, b)]] و [[XCTAssertTrue]] و [[XCTAssertThrowsError]] و [[XCTUnwrap]]. ولسه هو الوحيد للـ UI tests ([[XCUIApplication]]) واختبارات الأداء.

التشغيل: في Xcode [[Cmd+U]]، أو الماسة جنب الاختبار. ومن الترمنال [[swift test]] للـ packages، أو [[xcodebuild test -scheme MyApp -destination 'platform=iOS Simulator,name=iPhone 16']] للتطبيقات (حط اسم أي simulator موجود عندك).

إيه اللي تختبره؟ الـ logic: الحسابات، والـ validation، والـ view models (بـ fake services)، وفك الـ JSON. مش لازم تختبر إن [[Text]] بيعرض نص.`,
          example: R`import Testing
@testable import PriceKit

struct PriceTests {
  @Test func discountReducesPrice() {
    #expect(applyDiscount(200, percent: 25) == 150)
  }
  @Test("خصم أكبر من 100% بيرمي error")
  func invalidPercentThrows() {
    #expect(throws: PriceError.invalidPercent(150)) {
      try checkedDiscount(100, percent: 150)
    }
  }
  @Test(arguments: [(100.0, 10.0, 90.0), (50, 50, 25), (80, 0, 80)])
  func manyDiscounts(price: Double, percent: Double, expected: Double) {
    #expect(applyDiscount(price, percent: percent) == expected)
  }
  @Test func bucketsAreSorted() throws {
    let buckets = priceBuckets([30, 10, 20])
    let first = try #require(buckets.first)
    #expect(first == [10, 20])
  }
}`,
          try: R`في الـ package بتاع درس SPM حط الملف ده في [[Tests/PriceKitTests/PriceTests.swift]] وشغّل [[swift test]]. وبعدين غيّر [[== 150]] لـ [[== 160]] واقرا رسالة الفشل. وأخيرًا اكتب test للـ [[PostsViewModel]] من درس MVVM بـ fake service بيفشل، وتأكد إن الحالة بقت [[.failed]].`,
          flag: "script",
          deep: {
            why: R`الاختبارات هي اللي بتخليك تعدّل في كود عمره سنة من غير ما تخاف. وفي الشركات، الـ pull request من غير tests لـ logic جديد غالبًا مش هيتقبل. وفي الانترفيو، «إزاي بتختبر view model بيكلم API؟» سؤال شبه ثابت، والإجابة: protocol + fake + unit test.`,
            how: R`[[@Test]] و [[#expect]] macros: الـ [[#expect]] بيفك الـ expression وقت الـ compile، فلما يفشل يقدر يطبع قيمة كل جزء (مش بس «false»). والاختبارات بتشتغل بالتوازي افتراضيًا (على عكس XCTest)، وده سبب إن الـ suite struct بيتعمل لكل test، وسبب إن الـ shared state بين الاختبارات خطر.

[[@Test(arguments:)]] مع array من tuples: كل tuple بيتفك على الـ parameters بالترتيب. و [[(50, 50, 25)]] بتتقري Double لأن أول tuple حدد النوع.

الـ package ده ([[PriceKit]] بالاختبارات دي واختبارات الـ view model) اتجرب بـ [[swift test]] على Linux بـ Swift 6.0: 6 اختبارات عدّوا.`,
            when: R`unit tests لأي logic جديد، وخصوصًا الـ bugs: قبل ما تصلّح bug اكتب test بيفشل بسببه، وبعدين صلّح. وUI tests (XCTest) قليلة ولأهم سيناريو بس (login، والشراء)، لأنها بطيئة وبتتكسر بسهولة.`,
            mistakes: R`تختبر تفاصيل التنفيذ بدل السلوك (إن method اتنادت 3 مرات). واختبارات بتكلم API حقيقي فتفشل لما النت يقع. واختبارات معتمدة على ترتيب التشغيل أو على state مشتركة (Swift Testing بيشغّل بالتوازي فهتظهر عشوائيًا). وتستخدم [[#expect]] على optional ثم تكمل عليه بدل [[#require]].`
          },
          lines: [
            R`[[Testing]]: الـ framework الجديد.`,
            R`[[@testable]]: يفتح الـ internal في PriceKit للاختبار.`,
            "struct = suite، وبيتعمل من جديد لكل test.",
            R`[[@Test]] على function: ده اختبار.`,
            R`[[#expect]]: لو غلط بيسجل فشل بالقيم الحقيقية.`,
            "قفلة.",
            R`[[@Test("...")]] باسم بيظهر في التقرير.`,
            "الـ function.",
            R`[[#expect(throws:)]]: لازم يرمي الخطأ ده بالظبط.`,
            "الكود اللي المفروض يرمي.",
            "قفلة.",
            "قفلة.",
            R`[[arguments:]] 3 حالات، كل tuple بيتفك على الـ parameters.`,
            "3 parameters بالترتيب.",
            "نفس الـ expect لكل حالة.",
            "قفلة.",
            R`[[throws]] عشان [[#require]] ممكن يرمي.`,
            "دالة من الـ package.",
            R`[[#require]]: يفك الـ optional، ولو nil يوقف الاختبار.`,
            "مقارنة arrays.",
            "قفلة.",
            "قفلة الـ suite."
          ],
          sol: R`[[swift test]] بيطبع حاجة زي:
[[✔ Test discountReducesPrice() passed after 0.001 seconds.]]
[[◇ Passing 3 arguments price → 80.0, percent → 0.0, expected → 80.0 to manyDiscounts(price:percent:expected:)]]
[[✔ Test run with 4 tests passed after 0.004 seconds.]]

ولما تغيرها لـ 160:
[[✘ Test discountReducesPrice() recorded an issue at PriceTests.swift:6:5: Expectation failed: (applyDiscount(200, percent: 25) → 150.0) == (160 → 160.0)]]
لاحظ إنه بيوريك القيمة الحقيقية (150) من غير ما تضيف print.

اختبار الـ view model (اتجرب وعدّى):`,
          solCode: R`@MainActor
struct PostsViewModelTests {
  @Test func showsErrorWhenOffline() async {
    let viewModel = PostsViewModel(service: FakePostsService(shouldFail: true))
    await viewModel.load()
    guard case .failed(let message) = viewModel.phase else {
      Issue.record("كان المفروض الحالة تبقى failed")
      return
    }
    #expect(message.contains("النت"))
  }
}`
        },
        {
          cmd: "الـ debugging و Instruments",
          title: "تلاقي الـ bug بـ breakpoints و LLDB (po و p و bt)، وتلاقي البطء والـ leaks بـ Instruments و Memory Graph",
          desc: R`[[print]] كويس في الأول، بس بعد شوية هتحتاج أدوات Xcode:

1. Breakpoints: دوس على رقم السطر في Xcode فيظهر سهم أزرق. لما التطبيق يوصل للسطر ده يقف، وتقدر تشوف كل المتغيرات في الـ Variables View تحت. وتمشي سطر سطر: Step Over ([[F6]])، و Step Into ([[F7]]) جوه الدالة، و Continue ([[Ctrl+Cmd+Y]]).
   • breakpoint بشرط: كليك يمين ← Edit Breakpoint ← Condition ([[items.count == 0]]): يقف بس لما الشرط يتحقق.
   • breakpoint بيطبع من غير ما يقف: Action ← Log Message، وعلّم «Automatically continue». ده [[print]] من غير ما تعدّل الكود.
   • Exception و Swift Error breakpoints (من تاب الـ Breakpoints): يوقف لحظة ما error يترمي، حتى لو اتمسك.

2. LLDB console (تحت لما البرنامج واقف):
   • [[po x]]: اطبع الـ object بوصفه. • [[p x]]: اطبع القيمة (في Xcode الحديث [[p]] بقى ذكي وبيختار). • [[v]]: كل المتغيرات المحلية بسرعة. • [[bt]]: الـ backtrace (مين نادى مين لحد هنا). • [[expr x = 5]]: غيّر قيمة وانت واقف وكمّل. • [[c]]: كمّل.

3. لما التطبيق يقع: Xcode بيقف على السطر وبيكتب السبب (زي [[Unexpectedly found nil]] أو [[Index out of range]]). اقرا الـ backtrace في الـ Debug Navigator من فوق لتحت لحد أول سطر من كودك.

4. Debug View Hierarchy (زرار الطبقات تحت): بيوريك الشاشة 3D وكل View فين، مفيد لما حاجة مش ظاهرة.

5. Debug Memory Graph (زرار التلات دواير): بيوريك كل الـ objects اللي في الذاكرة، وعلامة بنفسجي على الـ leaks. لو قفلت شاشة ولسه الـ view model بتاعها موجود = leak (غالبًا [[[weak self]]] ناقصة).

6. Instruments (Product ← Profile أو [[Cmd+I]]): أداة قياس على build الـ Release:
   • Time Profiler: الكود بيقضي وقته فين (لما التطبيق بطيء أو بيتقطع).
   • Allocations و Leaks: الذاكرة بتزيد ليه.
   • SwiftUI instrument: أنهي Views بيتعاد حساب body بتاعها كتير.
   • Network: الطلبات ومدتها.

وفي الـ SwiftUI: [[let _ = Self._printChanges()]] جوه [[body]] (للـ debugging بس) بيطبع إيه اللي خلّى الـ View يتحسب تاني.`,
          example: R`# اكتبهم في الـ console تحت لما البرنامج يقف على breakpoint
po viewModel.phase
p posts.count
v
bt
expr viewModel.searchText = "swift"
c
# breakpoint بشرط من الـ console بدل الماوس
breakpoint set --file PostsViewModel.swift --line 30 --condition 'posts.isEmpty'
# من الترمنال: قوالب Instruments المتاحة على جهازك
xcrun xctrace list templates`,
          try: R`حط breakpoint في [[load()]] بتاعة الـ view model، وشغّل، ولما يقف اكتب [[po phase]] و [[bt]]. وبعدين اعمل leak مقصود (شيل [[[weak self]]] من closure متخزن في class)، وافتح وقفل الشاشة كذا مرة، وافتح Debug Memory Graph ودوّر على الـ objects المتكررة.`,
          flag: "console",
          deep: {
            why: R`الفرق بين junior و mid غالبًا مش في كتابة الكود، في سرعة إيجاد المشكلة. اللي بيعرف breakpoint بشرط و [[bt]] و Memory Graph بيحل في 10 دقايق اللي غيره بيقعد فيه يوم بـ [[print]].`,
            how: R`LLDB هو الـ debugger اللي تحت Xcode. لما البرنامج يقف على breakpoint، LLDB يقدر يقرا ذاكرة البرنامج ويشغّل كود Swift جواه ([[expr]]). [[po]] بينادي [[description]] (أو [[debugDescription]]) على الـ object، و [[v]] (اختصار [[frame variable]]) بيقرا الذاكرة مباشرة من غير ما يشغّل كود، فأسرع وأأمن.

Instruments بيشتغل بالـ sampling: كل ميلي ثانية بياخد صورة من الـ stack بتاع كل thread، وبعدين بيجمّع: الدالة اللي ظهرت في أغلب الصور هي اللي واكلة الوقت. عشان كده لازم Release build على جهاز حقيقي لو أمكن: الـ Debug build والـ Simulator أرقامهم مش حقيقية.

[[xcrun xctrace]] الـ command line بتاع Instruments، مفيد في CI.`,
            when: R`breakpoints لأي bug منطقي (القيمة غلط فين؟). Memory Graph بعد أي feature فيها closures أو delegates. Time Profiler لما حد يقولك «بطيء» قبل ما تخمّن. و SwiftUI instrument لما الـ scrolling بيتقطع.`,
            mistakes: R`تقيس الأداء على Debug build. وتسيب [[print]] كتير في كود الإنتاج (استخدم [[Logger]] من [[os]] بدلها). وتتجاهل الـ warnings البنفسجي (Runtime Issues) في Xcode: غالبًا تحديث UI من thread غلط أو مشكلة SwiftUI. وتحسن أداء حتة من غير ما تقيس فتطلع مش هي المشكلة.`
          },
          lines: [
            R`[[po]]: اطبع وصف الـ object.`,
            R`[[p]]: اطبع القيمة.`,
            R`[[v]]: كل المتغيرات المحلية.`,
            R`[[bt]]: backtrace، مين نادى مين.`,
            R`[[expr]]: غيّر قيمة وانت واقف.`,
            R`[[c]]: كمّل التشغيل.`,
            "breakpoint بيقف بس لو القايمة فاضية.",
            R`في الترمنال: [[xctrace]] بيعرض قوالب Instruments زي Time Profiler و Leaks.`
          ],
          sol: R`لما يقف في [[load()]]: [[po phase]] بيطبع حاجة زي [[PostsViewModel.Phase.idle]] (أو [[.loading]] حسب مكان الـ breakpoint)، و [[bt]] بيوريك السلسلة من [[load()]] لفوق لحد كود SwiftUI اللي نادى [[.task]].

وفي الـ leak: بعد ما تفتح وتقفل الشاشة 3 مرات، Memory Graph هيوريك 3 نسخ من الـ class بتاعك لسه عايشة وعلامة تحذير بنفسجي، ولو دوست على واحدة هتشوف السهم من الـ closure للـ object والعكس: ده الـ retain cycle. رجّع [[[weak self]]] وكرر: لازم ميفضلش غير اللي مفتوح.`
        }
      ]
    },
    {
      t: "النشر على App Store والشغل",
      l: 3,
      n: "التوقيع والـ provisioning، و archive و TestFlight والرفع، ومراجعة Apple والـ privacy manifest، وسوق iOS والانترفيو، ومشروع التخرج",
      items: [
        {
          cmd: "التوقيع و provisioning",
          title: "Apple Developer Program والتوقيع: certificate و App ID و provisioning profile، و Automatic Signing بيعمل إيه",
          desc: R`iOS مش بيشغّل أي تطبيق غير موقّع من Apple. والتوقيع ده سبب أغلب أخطاء «مش راضي يتبني على الموبايل» أو «مش راضي يترفع». المكونات:

1. الحساب:
   • Apple ID مجاني: تقدر تشغّل على موبايلك الشخصي، بس التطبيق بيتلغي بعد 7 أيام ولازم تثبته تاني، وفيه capabilities مش متاحة (زي push notifications). كفاية للتعلم.
   • Apple Developer Program: اشتراك سنوي (حوالي 99 دولار في أغلب البلاد، والسعر المحلي بيختلف). لازم عشان TestFlight والمتجر. ينفع كفرد (اسمك الشخصي بيظهر كبائع) أو كشركة (محتاج رقم D-U-N-S للشركة).

2. Certificate: شهادة بتثبت إنك انت. فيه Development (للتشغيل على أجهزة) و Distribution (للمتجر). المفتاح الخاص بتاعها بيتخزن في الـ Keychain على الماك اللي عملها.

3. App ID: الـ Bundle ID متسجل عند Apple، ومعاه الـ capabilities (Push، و Sign in with Apple، و iCloud، و App Groups).

4. Provisioning Profile: ملف بيربط: الشهادة + الـ App ID + (للـ development) الأجهزة المسموحة. بيتحط جوه التطبيق.

5. Entitlements: الصلاحيات الخاصة اللي التطبيق طالبها (ملف [[.entitlements]])، ولازم تبقى موجودة في الـ profile.

Automatic Signing (Signing & Capabilities ← Automatically manage signing ← اختار Team): Xcode بيعمل كل ده لوحده ويجدده. استخدمه في الأول ودايمًا في المشاريع الصغيرة. الـ Manual signing بيظهر في الشركات الكبيرة والـ CI، وهناك أدوات زي [[fastlane match]] بتخزن الشهادات متشفرة في repo عشان الفريق كله يستخدم نفس الشهادة.

الأوامر تحت بتساعدك تشوف «إيه اللي موجود فعلًا» لما حاجة تبوظ.`,
          example: R`# الشهادات اللي على الماك وتقدر توقّع بيها
security find-identity -v -p codesigning
# الـ profiles اللي Xcode نزّلها (Xcode 16 وما بعده)
ls ~/Library/Developer/Xcode/UserData/Provisioning\ Profiles
# اقرا profile: الـ App ID والـ entitlements والأجهزة وتاريخ الانتهاء
security cms -D -i profile.mobileprovision
# اتأكد إن التطبيق المتبني موقّع، وبإيه
codesign -dv --verbose=4 build/Tasks.app
# الـ entitlements اللي جوه التطبيق فعلًا
codesign -d --entitlements - build/Tasks.app`,
          try: R`في مشروعك: Signing & Capabilities ← فعّل Automatically manage signing واختار الـ Team بتاعك (حتى لو Personal Team)، وشغّل على موبايلك. لو أول مرة، الموبايل هيطلب تفعّل Developer Mode وتثق في المطوّر من Settings ← General ← VPN & Device Management. بعدها شغّل [[security find-identity -v -p codesigning]] وشوف الشهادة اللي اتعملت.`,
          deep: {
            why: R`التوقيع هو اللي بيضمن إن التطبيق جاي من المطوّر ده ومحدش عدّله، وإن الصلاحيات الحساسة (push، و iCloud، و Apple Pay) Apple وافقت عليها. وبالنسبة لك: لما الـ build يفشل بـ «No profiles for 'com.x' were found» أو «Provisioning profile doesn't include the entitlement»، لازم تعرف تقرا المشكلة دي بدل ما تجرب عشوائي.`,
            how: R`وقت الـ build، Xcode بيحط الـ profile جوه الـ app bundle ([[embedded.mobileprovision]])، وبيوقّع كل ملف تنفيذي بالمفتاح الخاص بتاع الشهادة. الجهاز عند التثبيت بيتأكد: التوقيع سليم، والشهادة في الـ profile، والـ Bundle ID مطابق، والجهاز ده في القايمة (للـ development)، والـ entitlements كلها مسموحة في الـ profile.

[[security cms -D -i]] بيفك الـ profile (هو plist موقّع) ويطبعه، فتشوف [[ExpirationDate]] و [[Entitlements]] و [[ProvisionedDevices]]. و [[codesign -dv]] بيوريك الـ Authority (مين وقّع) والـ TeamIdentifier.

في Xcode قبل 16 الـ profiles كانت في [[~/Library/MobileDevice/Provisioning Profiles]].`,
            when: R`أول مرة تشغّل على جهاز حقيقي، ولما تضيف capability جديدة (push مثلًا)، ولما تجهز CI بيبني ويرفع. والمشاكل بتحصل غالبًا لما الشهادة تخلص (سنة) أو لما حد في الفريق يعمل شهادة جديدة ويلغي القديمة.`,
            mistakes: R`تمسح شهادة Distribution من موقع Apple عشان «تنضف» فكل الـ profiles المربوطة بيها تبوظ. وتعمل شهادة على ماك ومتعملش export للمفتاح الخاص (ملف .p12) فلما الماك يتغير تبقى مش قادر توقّع. وتغيّر الـ Bundle ID بعد ما عملت الـ App ID و App Store Connect. وتفعّل capability في Xcode ومش موجودة في حسابك (زي push بحساب مجاني).`
          },
          lines: [
            R`[[security find-identity]]: الشهادات الصالحة للتوقيع. هتلاقي «Apple Development: اسمك (ID)».`,
            R`[[ls]] على فولدر الـ profiles. [[\ ]] عشان المسافة في الاسم.`,
            R`[[security cms -D]]: يفك الـ profile ويطبعه plist مقروء.`,
            R`[[codesign -dv]]: مين وقّع التطبيق، و Team ID، ونوع التوقيع.`,
            R`[[--entitlements -]]: يطبع الصلاحيات اللي جوه التطبيق.`
          ],
          sol: R`[[security find-identity -v -p codesigning]] هيطبع حاجة زي:
[[1) 3F2A...9C "Apple Development: Sara Ahmed (AB12CD34EF)"]]
[[1 valid identities found]]

ولو التشغيل على الموبايل فشل برسالة «Untrusted Developer»، روح Settings ← General ← VPN & Device Management ← اختار حسابك ← Trust. ولو مظهرلكش Developer Mode: Settings ← Privacy & Security ← Developer Mode (بيظهر بعد أول محاولة تشغيل من Xcode) وفعّله والموبايل هيعمل restart.`
        },
        {
          cmd: "النشر على متجر App Store و TestFlight",
          title: "ترفع تطبيقك: version و build number، و Archive، و TestFlight للتجربة، وبعدين Submit for Review",
          desc: R`الخطوات من أول مرة:
1. App Store Connect ([[appstoreconnect.apple.com]]): My Apps ← New App. اختار الـ Bundle ID، والاسم (لازم يبقى مش محجوز)، و SKU (أي كود داخلي).
2. في Xcode: رقمين مهمين في General:
   • Version (مثلًا [[1.0.0]]): اللي المستخدم بيشوفه.
   • Build (مثلًا [[1]] ثم [[2]] ...): لازم يزيد مع كل رفع لنفس الـ version. لو رفعت build رقمه موجود هيترفض.
3. اختار [[Any iOS Device (arm64)]] بدل الـ Simulator، و Product ← Archive. لما يخلص بيفتح الـ Organizer.
4. Distribute App ← App Store Connect ← Upload. Xcode بيوقّع بشهادة Distribution وبيرفع. أو من الترمنال بـ [[xcodebuild]] (تحت) وده اللي بيتعمل في CI مع [[fastlane]] أو Xcode Cloud.
5. بعد ما الـ build يخلص processing (دقايق لساعة)، بيظهر في TestFlight:
   • Internal testing: لحد 100 حد من فريقك في App Store Connect، من غير مراجعة.
   • External testing: لحد 10,000 tester بإيميل أو لينك عام، وأول build من كل version بيعدّي على مراجعة سريعة (Beta App Review).
   • الـ build في TestFlight بيفضل متاح 90 يوم.
   • الـ testers بينزّلوا تطبيق TestFlight من المتجر ويقبلوا الدعوة.
6. لما تبقى جاهز: في صفحة الـ version في App Store Connect املا الوصف، والكلمات المفتاحية، و screenshots (المقاسات المطلوبة بتتحدد في الصفحة)، والـ Privacy Policy URL، وبيانات الـ App Privacy (إيه الداتا اللي بتجمعها)، والفئة العمرية، واختار الـ build، و Submit for Review.

المراجعة غالبًا بتخلص في يوم أو اتنين. ولو اترفض، الرسالة بتقولك رقم الـ guideline (درس المراجعة الجاي)، وترد من Resolution Center أو تصلّح وترفع build جديد.

Apple بتطلب كل سنة (غالبًا في الربيع) إن الرفع يبقى بـ Xcode و SDK حديثين، فلازم تحدّث Xcode بانتظام. شوف صفحة Upcoming Requirements على موقع Apple Developer.`,
          example: R`# 1) زوّد رقم الـ build (محتاج Versioning System = Apple Generic في Build Settings)
agvtool next-version -all
# 2) archive لنسخة Release لأي جهاز iOS
xcodebuild archive -scheme Tasks -configuration Release -destination 'generic/platform=iOS' -archivePath build/Tasks.xcarchive
# 3) export ورفع: ExportOptions.plist فيه method = app-store-connect و destination = upload
xcodebuild -exportArchive -archivePath build/Tasks.xcarchive -exportOptionsPlist ExportOptions.plist -exportPath build/export -allowProvisioningUpdates`,
          try: R`(محتاج Apple Developer Program) اعمل التطبيق في App Store Connect، وزوّد الـ build، واعمل Archive من Xcode وارفعه بـ Distribute App. استنى الإيميل بتاع processing، وضيف نفسك internal tester في TestFlight، ونزّل التطبيق على موبايلك من تطبيق TestFlight. لو لسه مشتركتش: اعمل Archive بس واتفرج على الـ Organizer وأحجام التطبيق.`,
          deep: {
            why: R`التطبيق اللي على المتجر أو على الأقل على TestFlight هو أقوى حاجة في الـ CV بتاعك: بيقول إنك عديت كل السكة مش بس كتبت كود. و TestFlight بيخليك تجرب مع ناس حقيقية وتلاقي crashes قبل المستخدمين.`,
            how: R`الـ Archive بيبني Release (optimized) لكل المعالجات المطلوبة ويحفظ معاه ملفات الـ debug symbols ([[dSYM]])، ودي اللي بتخلي تقارير الـ crash تتقري بأسماء الدوال (في Xcode ← Organizer ← Crashes، أو في Firebase Crashlytics).

عند الرفع، App Store Connect بيعمل فحص أوتوماتيكي (APIs ممنوعة، والـ privacy manifest، والأيقونات، والتوقيع). ولما التطبيق يتنشر، المتجر بيعمل App Thinning: كل جهاز بينزّل الأجزاء اللي محتاجها بس.

[[agvtool next-version -all]] بيزود [[CURRENT_PROJECT_VERSION]]. و [[-allowProvisioningUpdates]] بيسمح لـ xcodebuild يعمل أو يحدّث الـ profiles لوحده باستخدام الحساب اللي في Xcode (أو بـ App Store Connect API key في CI).

[[altool]] القديم اتشال من حاجات كتير (زي الـ notarization)، فالأحسن تستخدم Xcode أو [[xcodebuild -exportArchive]] أو تطبيق Transporter أو fastlane.`,
            when: R`TestFlight من أول ما التطبيق يبقى ليه شكل، مش في الآخر. واعمل CI (Xcode Cloud أو GitHub Actions بـ macOS runner + fastlane) لما الرفع اليدوي يبقى أكتر من مرة في الأسبوع.`,
            mistakes: R`ترفع build بنفس الرقم. وتنسى ترفع الـ dSYMs لأداة الـ crashes فالتقارير تبقى أرقام. وتستنى لآخر يوم قبل ما تبدأ أول رفع (أول مرة فيها مفاجآت: اسم محجوز، وشهادات، و screenshots). وتعمل Submit من غير demo account والتطبيق فيه login: الـ reviewer مش هيعرف يدخل وهيرفض (Guideline 2.1).`
          },
          lines: [
            R`[[agvtool]]: بيزود الـ build number في كل الـ targets.`,
            R`[[xcodebuild archive]]: build Release لأي جهاز iOS ويحفظه في [[.xcarchive]].`,
            R`[[-exportArchive]]: يوقّع للمتجر ويرفع لـ App Store Connect حسب الـ ExportOptions.plist.`
          ],
          sol: R`بعد الرفع، Xcode (أو xcodebuild) بيكتب [[Upload succeeded]]، وبعد شوية بيوصلك إيميل [[The following build has completed processing]] من App Store Connect. في تاب TestFlight هتلاقي الـ build، ولو طلب منك Export Compliance (التشفير) جاوب (التطبيقات اللي بتستخدم HTTPS بس غالبًا معفية، وتقدر تحط [[ITSAppUsesNonExemptEncryption = NO]] في Info.plist عشان السؤال ميتكررش). بعدها تضيف نفسك internal tester والتطبيق يظهر في TestFlight على الموبايل.

ExportOptions.plist أبسط شكل ليه:`,
          solCode: R`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>method</key>
  <string>app-store-connect</string>
  <key>destination</key>
  <string>upload</string>
  <key>signingStyle</key>
  <string>automatic</string>
</dict>
</plist>`
        },
        {
          cmd: "مراجعة App Store والخصوصية",
          title: "تعدّي مراجعة Apple: أشهر أسباب الرفض، ورسايل الصلاحيات، و privacy manifest و required reason APIs",
          desc: R`كل تطبيق وكل تحديث بيتراجع من بني آدمين في Apple حسب App Review Guidelines. أشهر أسباب الرفض:

• 2.1 App Completeness: التطبيق بيقع، أو فيه أزرار مش شغالة، أو محتوى تجريبي (Lorem ipsum)، أو مفيش demo account لتطبيق فيه login.
• 4.2 Minimum Functionality: تطبيق هو موقع جوه WebView من غير قيمة إضافية حقيقية.
• 5.1.1 Data Collection: بتطلب صلاحية من غير سبب واضح، أو بتجبر المستخدم يعمل حساب لحاجة مش محتاجة حساب. ولو التطبيق فيه إنشاء حساب، لازم يبقى فيه مسح حساب من جوه التطبيق.
• 4.8 Login Services: لو بتستخدم login من طرف تالت (Google أو Facebook) كطريقة أساسية، لازم تقدّم كمان اختيار login بيحافظ على الخصوصية زي Sign in with Apple (فيه استثناءات، اقراها).
• 3.1.1 In-App Purchase: المحتوى الرقمي (اشتراكات، ومزايا جوه التطبيق) لازم يتباع بـ In-App Purchase. الحاجات الحقيقية (أكل، وتوصيل، وخدمات) بأي وسيلة دفع. والقواعد دي بتختلف حسب البلد وبتتغير بسبب قضايا وقوانين، فاقرا النسخة الحالية.
• 2.3 Accurate Metadata: screenshots مش من التطبيق، أو وصف بيوعد بحاجات مش موجودة.

الصلاحيات: أي وصول للكاميرا أو الصور أو الموقع أو الميكروفون أو جهات الاتصال لازم مفتاح في Info.plist زي [[NSCameraUsageDescription]] فيه سبب واضح ومحدد («عشان تصوّر الفاتورة وتضيفها للمصروف»). من غيره التطبيق بيقع لحظة الطلب، وبسبب ضعيف بيترفض.

Privacy manifest ([[PrivacyInfo.xcprivacy]]): ملف (من 2024) بيوصف:
1. هل التطبيق بيعمل tracking ([[NSPrivacyTracking]]) ودومينات التتبع.
2. الداتا اللي بتجمعها ([[NSPrivacyCollectedDataTypes]]).
3. «Required reason APIs» ([[NSPrivacyAccessedAPITypes]]): APIs ممكن تتستخدم في الـ fingerprinting، وأي استخدام ليها لازم سبب من قايمة Apple بكود. منها: [[UserDefaults]] (السبب [[CA92.1]] = قراية وكتابة داتا التطبيق نفسه)، وتواريخ الملفات، و system boot time، ومساحة الديسك. والـ SDKs المشهورة (Firebase وغيرها) لازم يبقى معاها manifest بتاعها.

App Privacy في App Store Connect («الـ nutrition label»): بتجاوب أسئلة عن الداتا اللي بتتجمع وبتظهر في صفحة التطبيق. لازم تبقى متطابقة مع الحقيقة ومع الـ SDKs. ولو بتتبع المستخدم عبر تطبيقات تانية لازم App Tracking Transparency ([[ATTrackingManager]]).`,
          example: R`<?xml version="1.0" encoding="UTF-8"?>
<plist version="1.0">
<dict>
  <key>NSPrivacyTracking</key>
  <false/>
  <key>NSPrivacyAccessedAPITypes</key>
  <array>
    <dict>
      <key>NSPrivacyAccessedAPIType</key>
      <string>NSPrivacyAccessedAPICategoryUserDefaults</string>
      <key>NSPrivacyAccessedAPITypeReasons</key>
      <array>
        <string>CA92.1</string>
      </array>
    </dict>
  </array>
  <key>NSPrivacyCollectedDataTypes</key>
  <array/>
</dict>
</plist>`,
          try: R`في مشروعك: File ← New ← File ← App Privacy واعمل [[PrivacyInfo.xcprivacy]]، وضيف UserDefaults بالسبب CA92.1 (لو بتستخدم [[@AppStorage]]). وبعدين ضيف [[NSCameraUsageDescription]] في تاب Info برسالة بالعربي. وأخيرًا اقرا sections 2.1 و 4.2 و 5.1.1 من App Review Guidelines على موقع Apple (مش طويلين).`,
          flag: "script",
          deep: {
            why: R`الرفض بيأخر الإطلاق أيام وممكن أسابيع، وده بيبوظ مواعيد مع عملاء. أغلب أسباب الرفض معروفة ومكررة، فلو راجعتها قبل الرفع بتوفر دورة كاملة. وتطبيقات المبتدئين بتترفض أكتر حاجة على 2.1 (crash أو مفيش demo account) و 4.2 (WebView).`,
            how: R`عند الرفع، App Store Connect بيجمّع الـ privacy manifests من التطبيق وكل الـ SDKs في تقرير، ولو استخدمت required reason API من غير ما تعلن عنه بيوصلك إيميل بالمشكلة (وممكن الرفع يترفض). والـ manifest نفسه plist: [[key]] واسم، وبعده القيمة ([[false]] و [[string]] و [[array]] و [[dict]]).

المراجع بيشغّل التطبيق على جهاز حقيقي، بيجرب السيناريوهات الأساسية، وبيقارن الـ metadata بالتطبيق، وبيشيك الصلاحيات ورسايلها. ولو فيه حاجات مش واضحة (هاردوير معين، حساب) اكتبها في App Review Information.`,
            when: R`اقرا الـ guidelines قبل ما تبدأ التطبيق مش قبل الرفع (فكرة التطبيق نفسها ممكن تبقى ضد 4.2 أو 3.1.1). وراجع الـ privacy manifest كل ما تضيف SDK أو API جديد.`,
            mistakes: R`رسالة صلاحية عامة زي «التطبيق محتاج الكاميرا». وتجبر المستخدم يدّي الموقع عشان يفتح التطبيق. وتنسى مسح الحساب. وتضيف SDK إعلانات أو analytics ومتحدّثش الـ App Privacy. وتتعامل مع الرفض بزعل بدل ما ترد بهدوء في Resolution Center وتوضح أو تصلّح.`
          },
          lines: [
            "رأس ملف XML.",
            "الـ plist.",
            "dictionary رئيسي.",
            "مفتاح: هل بتعمل tracking؟",
            "لأ.",
            R`مفتاح: الـ required reason APIs اللي بتستخدمها.`,
            "array.",
            "API واحد.",
            "نوعه:",
            R`UserDefaults (يعني [[@AppStorage]] كمان).`,
            "الأسباب:",
            "array أسباب.",
            R`[[CA92.1]]: بقرا وبكتب داتا خاصة بالتطبيق نفسه بس.`,
            "قفلة الأسباب.",
            "قفلة الـ API.",
            "قفلة الـ array.",
            "مفتاح: الداتا اللي بتتجمع.",
            "فاضية: مش بنجمع حاجة.",
            "قفلة الـ dict.",
            "قفلة الـ plist."
          ],
          sol: R`الـ [[PrivacyInfo.xcprivacy]] لما Xcode يعمله بيفتح بمحرر جدول، وتقدر تفتحه كـ Source Code (كليك يمين ← Open As ← Source Code) فتلاقيه زي المثال.

رسالة الكاميرا في تاب Info: [[Privacy - Camera Usage Description]] = «عشان تصوّر الفاتورة وتضيفها للمصروف من غير ما تكتبها بإيدك». وده بيظهر للمستخدم في نافذة الإذن.

ملخص الـ sections:
• 2.1: التطبيق لازم يبقى كامل وشغال، ومعاه demo account لو فيه login.
• 4.2: لازم يقدّم قيمة أكتر من موقع ملفوف.
• 5.1.1: اطلب الداتا اللي محتاجها بس، وبسبب واضح، ومسح الحساب لازم يبقى متاح.`
        },
        {
          cmd: "سوق iOS والانترفيو",
          title: "سوق شغل iOS في مصر والخليج وريموت، وأشهر أسئلة انترفيو Swift و SwiftUI",
          desc: R`صورة صريحة للسوق (2025 و 2026):
• في مصر، وظايف Native iOS أقل عددًا من Android ومن Flutter، لأن شركات كتير بتعمل التطبيقين بـ Flutter أو React Native عشان التكلفة. بس المنافسة على iOS كمان أقل، والشركات الكبيرة (بنوك، fintech، توصيل، شركات بتشتغل لعملاء برة) لسه بتطلب Native، والمرتبات غالبًا أعلى شوية من المتوسط لنفس الخبرة.
• في الخليج (السعودية والإمارات)، الطلب على iOS Native أعلى بسبب نسبة مستخدمي iPhone العالية والتطبيقات الحكومية والبنكية.
• الريموت والفريلانس: موجود بس تنافسي جدًا. اللي بيكسب فيه: تطبيقات منشورة فعلًا، و GitHub نضيف، وإنجليزي كويس.
• العائق الحقيقي: الماك. بدونه مش هتعرف تشتغل iOS، فحسبها في خطتك.

الإعلانات بتطلب عادةً: Swift و SwiftUI و UIKit (الاتنين)، و MVVM أو Clean Architecture، و async/await و Combine (في الكود القديم)، و Core Data أو SwiftData، و REST و JSON، و Git، و unit tests، وخبرة رفع على المتجر. ولو تعرف Kotlin أو Flutter بجانبها ده ميزة.

أسئلة انترفيو بتتكرر (جاوبها بصوت عالي لحد ما تبقى سلسة):
1. struct ولا class؟ value vs reference، وإمتى تستخدم كل واحد.
2. Optional إيه، وطرق فكه، وليه [[!]] خطر.
3. ARC و retain cycle و [[weak]] و [[unowned]] و [[[weak self]]] (وممكن يديك كود يسألك فيه leak ولا لأ).
4. [[@State]] و [[@Binding]] و [[@Observable]] و [[@Environment]]: مين يملك الداتا.
5. إيه اللي بيحصل لما الـ state تتغير في SwiftUI؟ (body بيتحسب تاني، و diffing).
6. async/await vs completion handlers، و [[actor]] و [[@MainActor]] و [[Sendable]] و data races.
7. [[some]] vs [[any]].
8. protocol-oriented programming و protocol extensions.
9. إزاي تختبر view model بيكلم API؟ (protocol + fake).
10. الفرق بين [[escaping]] و non-escaping closure.
11. App lifecycle و ScenePhase، وإزاي التطبيق بيتصرف في الخلفية.
12. إزاي هتعمل pagination أو image caching أو offline mode؟ (أسئلة design).

وفيه غالبًا تاسك عملي (take-home): شاشة بتجيب داتا من API وتعرضها في List بتفاصيل، مع loading و error، وأحيانًا بحث وcache. ده بالظبط اللي اتعلمته في المستوى التاني + MVVM والاختبارات.

المثال تحت سؤال «اكتب الناتج» مشهور. حاول تتوقعه قبل ما تشغّله.`,
          example: R`final class Screen {
  let name: String
  var onClose: (() -> Void)?
  init(name: String) { self.name = name }
  deinit { print("\(name) اتمسحت") }
}
struct Score {
  var value = 0
}
var a = Score()
var b = a
b.value = 10
print(a.value, b.value)
func openHome() {
  let home = Screen(name: "home")
  home.onClose = { [weak home] in
    print("قفلنا \(home?.name ?? "-")")
  }
  home.onClose?()
}
func openProfile() {
  let profile = Screen(name: "profile")
  profile.onClose = {
    print("قفلنا \(profile.name)")
  }
  profile.onClose?()
}
openHome()
openProfile()
print("خلصنا")`,
          try: R`قبل ما تشغّل: اكتب على ورقة الناتج سطر سطر، وقول هل [[profile اتمسحت]] هتظهر ولا لأ وليه. وبعدين شغّل بـ [[swift main.swift]] وقارن، وصلّح [[openProfile]] بحيث السطر ده يظهر. وأخيرًا جاوب على أول 6 أسئلة من القايمة بصوت عالي، دقيقتين لكل سؤال.`,
          flag: "script",
          deep: {
            why: R`الانترفيو مش بيقيس إنك حفظت تعريفات، بيقيس إنك تقدر تتوقع الكود هيعمل إيه وتشرح ليه. الأسئلة اللي فوق متكررة لدرجة إن عدم الإجابة عليها بيوقف المقابلة بدري، والإجابة الكويسة عليها بتفتح كلام عن خبرتك.`,
            how: R`السؤال ده بيختبر 3 حاجات:
1. [[Score]] struct، فـ [[b]] نسخة مستقلة: [[0 10]].
2. [[openHome]]: الـ closure ماسك [[home]] weak، فمفيش cycle. لما الدالة تخلص الثابت [[home]] بيختفي، ومفيش حد ماسك الشاشة بقوة، فـ deinit بيشتغل: [[home اتمسحت]].
3. [[openProfile]]: الـ closure بيستخدم [[profile]] من غير capture list، فبيمسكه بقوة. والـ object ماسك الـ closure في [[onClose]]. يعني cycle، ولما الدالة تخلص الاتنين بيفضلوا ماسكين بعض في الذاكرة ومحدش يقدر يوصلهم: leak. عشان كده [[profile اتمسحت]] مش بتظهر خالص.

الحل: [[{ [weak profile] in print(profile?.name ?? "-") }]]، أو [[[unowned profile]]] لو متأكد إن الـ closure مش هيتنادى بعد ما الشاشة تتمسح. ونفس الكلام بالظبط مع [[self]] جوه class: [[[weak self]]].

تفصيلة بتفرق في الانترفيو: لو الـ closure بيستخدم [[var]] (مش [[let]])، هو بيمسك المتغير نفسه مش القيمة. فلو عملت [[profile = nil]] بعد كده الـ cycle بيتكسر. عشان كده الأسئلة دي بتيجي غالبًا بـ [[let]] أو بـ [[self]].`,
            when: R`ذاكر الأسئلة دي قبل أي انترفيو iOS، واعمل مشروع take-home لنفسك قبلها (القايمة والتفاصيل والـ API) في 4 ساعات كتمرين.`,
            mistakes: R`تحفظ إجابات من غير ما تقدر تكتب كود يثبتها. وتقول «SwiftUI بس» لما يسألوك عن UIKit: قول إنك فاهم المفاهيم ومستعد تتعلمه. وتعمل take-home من غير error handling ولا tests ولا README: دي الحاجات اللي بتفرق. وتبعت CV فيه «iOS Developer» من غير لينك لتطبيق أو repo.`
          },
          lines: [
            "class شاشة.",
            "الاسم.",
            "closure متخزن.",
            "init.",
            "deinit بيطبع لما تتمسح.",
            "قفلة.",
            "struct.",
            "قيمة.",
            "قفلة.",
            "نسخة أولى.",
            R`[[b]] نسخة مستقلة.`,
            "بنعدّل النسخة.",
            "0 و 10.",
            "دالة بتفتح شاشة.",
            R`ثابت محلي.`,
            R`closure ماسك [[home]] weak.`,
            "بيطبع الاسم لو موجود.",
            "قفلة.",
            "بننادي الـ closure.",
            "قفلة: هنا home بتتمسح.",
            "دالة تانية.",
            "ثابت محلي.",
            R`closure بيستخدم [[profile]] من غير capture list: strong.`,
            "بيطبع الاسم.",
            "قفلة.",
            "بننادي الـ closure.",
            "قفلة: profile مش بتتمسح (cycle).",
            "بننادي الأولى.",
            "بننادي التانية.",
            "آخر سطر."
          ],
          sol: R`الناتج الحقيقي (اتجرب بـ [[swift main.swift]]):
[[0 10]]
[[قفلنا home]]
[[home اتمسحت]]
[[قفلنا profile]]
[[خلصنا]]

[[profile اتمسحت]] مظهرتش: retain cycle بين الشاشة والـ closure. بعد التصليح الناتج بيبقى فيه [[profile اتمسحت]] بعد [[قفلنا profile]] على طول:`,
          solCode: R`func openProfile() {
  let profile = Screen(name: "profile")
  profile.onClose = { [weak profile] in
    print("قفلنا \(profile?.name ?? "-")")
  }
  profile.onClose?()
}`
        },
        {
          cmd: "مشروع التخرج",
          title: "مشروع التخرج: تطبيق عادات يومية بـ SwiftUI و SwiftData و API و اختبارات، ترفعه على TestFlight",
          desc: R`المشروع ده بيجمع كل التاب في تطبيق واحد يتحط في الـ CV. اسمه مثلًا «عاداتي»: المستخدم بيضيف عادات يومية (قراية، رياضة، شرب مية) ويعلّم عليها كل يوم، ويشوف الـ streak بتاعه.

المتطلبات (اعمل checklist واشطب):
1. اللغة والبنية: Swift 6 language mode (أو إعدادات Xcode 26 الجديدة) من غير أخطاء concurrency. أقل نسخة iOS 18.
2. البيانات: SwiftData بـ [[@Model]] للـ [[Habit]] و [[CheckIn]] (علاقة one-to-many بـ cascade delete).
3. الشاشات: [[TabView]] بتلات تابات (العادات، الإحصائيات، الإعدادات)، كل واحد فيه [[NavigationStack]]. شاشة تفاصيل لكل عادة، و sheet لإضافة عادة بـ [[Form]] و validation.
4. الحالة: view model بـ [[@Observable]] و [[@MainActor]] للشاشة اللي فيها logic (الإحصائيات وحساب الـ streak)، و [[@AppStorage]] للإعدادات (المظهر، وساعة التذكير).
5. النت: شاشة «اقتباس اليوم» بتجيب من API مجاني بـ [[URLSession]] و Codable، بحالات loading و error و retry.
6. الجودة: Swift Testing لحساب الـ streak (يوم فاضي بيقطع السلسلة، والتغيير بين الأيام بالـ timezone) وللـ view model بـ fake service. ومفيش [[!]] في كود التطبيق إلا في URL ثابت.
7. الـ UX: Dark Mode، و Dynamic Type (جرّب أكبر خط)، و RTL، و VoiceOver labels على الأيقونات، و [[ContentUnavailableView]] لما مفيش عادات.
8. النشر: privacy manifest، وأيقونة، و TestFlight (لو عندك Developer Program)، و README فيه screenshots وشرح المعمارية وإزاي تشغّل الاختبارات.

ابدأ بالأصغر: model و List وإضافة ومسح (يوم). بعدين الـ streak والاختبارات (يوم). بعدين التابات والإحصائيات (يوم). بعدين الـ API والتلميع (يوم). ورفع (نص يوم). وكل خطوة commit.

مستوى أعلى لو خلصت: Widget بـ WidgetKit بيعرض الـ streak، وإشعار تذكير محلي بـ [[UserNotifications]]، و App Intents عشان Siri و Shortcuts. ودي حاجات بتفرق في الانترفيو لأنها مش في كل الكورسات.`,
          example: R`import SwiftUI
import SwiftData

@main
struct HabitsApp: App {
  @AppStorage("theme") private var theme = "system"
  var body: some Scene {
    WindowGroup {
      TabView {
        Tab("العادات", systemImage: "checklist") {
          NavigationStack { HabitsScreen() }
        }
        Tab("الإحصائيات", systemImage: "chart.bar") {
          NavigationStack { StatsScreen() }
        }
        Tab("الإعدادات", systemImage: "gear") {
          NavigationStack { SettingsScreen() }
        }
      }
      .preferredColorScheme(theme == "dark" ? .dark : theme == "light" ? .light : nil)
    }
    .modelContainer(for: [Habit.self, CheckIn.self])
  }
}`,
          try: R`ابدأ بالـ models: [[Habit]] (اسم، وأيقونة SF Symbol، وتاريخ الإنشاء، و [[@Relationship(deleteRule: .cascade) var checkIns: [CheckIn] = []]]) و [[CheckIn]] (تاريخ). وبعدين اكتب دالة [[streak(for dates: [Date], today: Date) -> Int]] واختبرها بـ Swift Testing قبل ما تعمل أي شاشة.`,
          flag: "script",
          deep: {
            why: R`الكورسات بتعلّمك كل حاجة لوحدها، بس الشغل الحقيقي هو إنك تربطهم: SwiftData مع view model مع navigation مع اختبارات مع رفع. والمشروع اللي بيعدي كل ده ومنشور على TestFlight أو المتجر بيتكلم عنك في الانترفيو أكتر من أي شهادة.`,
            how: R`الـ [[App]] بيجهز الحاجات المشتركة: الـ [[modelContainer]] لكل الـ models، والمظهر من [[@AppStorage]]. و [[Tab]] (iOS 18) هو الطريقة الجديدة لكتابة التابات، وكل تاب جواه [[NavigationStack]] بتاعه عشان كل تاب يحتفظ بمكانه لما تتنقل بينهم. (لو هتدعم iOS 17 استخدم [[.tabItem { Label(...) }]] على كل شاشة).

حساب الـ streak هو أصعب logic في المشروع: لازم تتعامل مع الأيام مش الساعات ([[Calendar.current.startOfDay(for:)]] و [[isDate(_:inSameDayAs:)]])، ومع يوم النهارده لو لسه متعلمش. عشان كده بنقول اكتبه دالة pure ومعاها اختبارات الأول.

[[HabitsScreen]] و [[StatsScreen]] و [[SettingsScreen]] انت اللي هتكتبهم من دروس المستوى التاني.`,
            when: R`بعد ما تخلص المستويين الأول والتاني ودروس MVVM والاختبارات. وخليه في repo على GitHub من أول يوم.`,
            mistakes: R`تبدأ بالتصميم والألوان قبل الـ model والـ logic. وتعمل 10 features بنص جودة بدل 5 كاملين. ومتكتبش README. وتنسى تجرب Dark Mode و الخط الكبير. وتحط كل الكود في [[ContentView.swift]].`
          },
          lines: [
            "SwiftUI.",
            "SwiftData.",
            "نقطة البداية.",
            "الـ App.",
            R`المظهر من [[@AppStorage]].`,
            "body.",
            "الشباك.",
            R`[[TabView]]: التابات تحت.`,
            R`[[Tab]] (iOS 18): عنوان وأيقونة.`,
            R`كل تاب ليه [[NavigationStack]] بتاعه.`,
            "قفلة.",
            "تاب الإحصائيات.",
            "شاشته.",
            "قفلة.",
            "تاب الإعدادات.",
            "شاشته.",
            "قفلة.",
            "قفلة TabView.",
            R`المظهر حسب الإعداد، و [[nil]] = زي النظام.`,
            "قفلة WindowGroup.",
            "الداتابيز للـ models الاتنين.",
            "قفلة body.",
            "قفلة."
          ],
          sol: R`الـ models ودالة الـ streak واختباراتها (الدالة pure فتقدر تجربها على Linux كمان من غير SwiftData):`,
          solCode: R`@Model
final class Habit {
  var name: String
  var symbol: String
  var createdAt: Date
  @Relationship(deleteRule: .cascade) var checkIns: [CheckIn] = []
  init(name: String, symbol: String = "star", createdAt: Date = .now) {
    self.name = name
    self.symbol = symbol
    self.createdAt = createdAt
  }
}

@Model
final class CheckIn {
  var date: Date
  init(date: Date = .now) { self.date = date }
}

func streak(for dates: [Date], today: Date, calendar: Calendar = .current) -> Int {
  let days = Set(dates.map { calendar.startOfDay(for: $0) })
  var day = calendar.startOfDay(for: today)
  // لو النهارده لسه متعلمش، نبدأ العد من امبارح
  if !days.contains(day) {
    day = calendar.date(byAdding: .day, value: -1, to: day)!
  }
  var count = 0
  while days.contains(day) {
    count += 1
    day = calendar.date(byAdding: .day, value: -1, to: day)!
  }
  return count
}

@Test func streakCountsConsecutiveDays() {
  var cal = Calendar(identifier: .gregorian)
  cal.timeZone = TimeZone(identifier: "Africa/Cairo")!
  let today = cal.date(from: DateComponents(year: 2026, month: 5, day: 10, hour: 9))!
  let days = [0, 1, 2, 4].map { cal.date(byAdding: .day, value: -$0, to: today)! }
  #expect(streak(for: days, today: today, calendar: cal) == 3)
  #expect(streak(for: Array(days.dropFirst()), today: today, calendar: cal) == 2)
  #expect(streak(for: [], today: today, calendar: cal) == 0)
}`
        }
      ]
    }
]);
