// تكملة تاب apis: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/apis/01.js (شرح حقول الدرس في أوله)
MORE("apis", [
    {
      t: "GraphQL",
      l: 2,
      n: "endpoint واحد والعميل بيطلب الحقول اللي عايزها بالظبط. قوي، بس ليه مشاكل مش موجودة في REST: N+1، والصلاحيات على مستوى الحقل، والاستعلامات العميقة",
      items: [
        {
          cmd: "GraphQL ولا REST",
          title: "إمتى GraphQL يستاهل وإمتى REST أبسط",
          desc: R`في GraphQL فيه endpoint واحد ([[POST /graphql]])، والعميل بيبعت query بيوصف شكل الرد اللي عايزه بالظبط: المنشورات، ومع كل منشور اسم الكاتب، ومن غير أي حقل تاني. والسيرفر عنده schema فيها كل الأنواع والعلاقات.

في REST نفس الشاشة ممكن تحتاج ٣ طلبات ([[/posts]] وبعدين [[/users/:id]] لكل كاتب)، أو endpoint مخصوص للشاشة. GraphQL بيحل ده، بس بياخد منك حاجات REST بيدّيهالك ببلاش: كاش HTTP، و status codes واضحة، وبساطة.`,
          example: R`query FeedPage($first: Int!) {
  posts(first: $first) {
    id
    title
    author {
      name
      avatarUrl
    }
  }
  me {
    name
    unreadCount
  }
}`,
          try: R`خد شاشة من مشروعك بتعمل أكتر من طلب REST، واكتبلها query واحد بالشكل ده. وبعدين عدّ: كام طلب في REST، وكام حقل بيرجع ومش بيتعرض (over-fetching).`,
          flag: "script",
          deep: {
            why: "الموبايل على شبكة بطيئة بيدفع تمن كل طلب زيادة وكل حقل مش محتاجه. ولما عندك عملاء كتير (ويب، وموبايل، وشركاء) كل واحد عايز شكل مختلف من نفس البيانات، إما تعمل endpoint لكل واحد، أو تديهم لغة يطلبوا بيها. GraphQL هو اللغة دي.",
            how: R`الـ query بيتبعت كـ JSON: [[{"query": "...", "variables": {"first": 10}}]]. السيرفر بيتحقق منه مقابل الـ schema قبل ما ينفّذ (حقل مش موجود = error فورًا)، وبعدين ينفّذ resolver لكل حقل. والرد JSON بنفس شكل الـ query بالظبط، جوه [[data]]، ومعاه [[errors]] لو فيه.

الأنواع التلاتة: [[query]] للقراية، و [[mutation]] للكتابة، و [[subscription]] للتحديثات live (غالبًا على WebSocket أو SSE).

اللي بتكسبه: طلب واحد للشاشة، ومفيش over-fetching، و schema typed بيتولّد منها types للعميل (GraphQL Codegen)، وأدوات بتكمّلك الحقول وانت بتكتب، وإضافة حقول من غير versions.

اللي بتخسره: كاش HTTP. كله POST على نفس الـ URL، فالـ CDN والمتصفح مش فاهمين حاجة. الحل كاش في العميل (Apollo Client و urql بيعملوا normalized cache)، أو persisted queries بـ GET. والـ status codes: GraphQL غالبًا بيرجّع 200 حتى مع أخطاء في [[errors]]، والمراقبة لازم تبص جوه الـ body. والأمان والأداء بقوا أصعب: العميل يقدر يطلب query عميق جدًا أو كبير جدًا، وكل حقل ممكن يعمل استعلام للقاعدة (N+1)، والصلاحيات لازم تبقى لكل حقل مش لكل endpoint. الدروس الجاية في الكاتيجوري دي بتحل التلاتة.

فيه بدايل وسط: REST بـ [[?fields=id,title]] و [[?include=author]] (زي JSON:API)، أو BFF لكل عميل (تاب «Next.js»، درس [[BFF]])، أو tRPC لو الفرونت والباك TypeScript في نفس الـ repo (المستوى ٣).`,
            when: "عملاء كتير بأشكال مختلفة، وبيانات فيها علاقات كتير (graph فعلًا)، وفريق فرونت كبير عايز يتحرك من غير ما يستنى الباك. و REST لـ API عام بسيط، أو CRUD، أو لما الكاش على CDN مهم، أو فريق صغير.",
            mistakes: R`تختار GraphQL عشان «أحدث» لمشروع CRUD فيه عميل واحد، فتدفع التعقيد من غير المكسب. وتسيب الـ introspection والـ playground مفتوحين في الإنتاج على API داخلي. وتفتكر إن مفيش versioning خالص: شيل حقل لسه حد بيستخدمه بيكسره برضه، والحل [[@deprecated]] وتتابع مين لسه بيطلبه. وفخ انترفيو: «GraphQL أسرع من REST؟»، مش بالضرورة. بيقلل عدد الطلبات والحجم، بس ممكن يبقى أبطأ على السيرفر من غير DataLoader وكاش.`
          },
          teach: R`## الفكرة: العميل بيرسم شكل الرد

المثال مش كود سيرفر. ده **query** بلغة GraphQL: العميل بيكتب الحقول اللي عايزها متداخلة، والسيرفر بيرجّع JSON بنفس الشكل بالظبط. شاشة الـ feed كلها (المنشورات وكتّابها والمستخدم الحالي) في طلب واحد.

اتجرّب على ويندوز 11: GraphQL Yoga 5.24 و graphql 16.14 على Node 24.19، بـ schema صغيرة فيها الأنواع اللي الـ query محتاجها، و ٥٠ منشور و ١٠ مستخدمين في الذاكرة، وعدّاد بيسجّل كل استعلام «للقاعدة». الطلب اتبعت لـ [[yoga.fetch]] (نفس الـ handler اللي بيتركب في Express، من غير شبكة) بـ [[first: 3]].

---

## ١. السطر الأول

~~~graphql
query FeedPage($first: Int!) {
~~~

| الحتة | معناها |
|---|---|
| [[query]] | نوع العملية: قراية. (التانيين: [[mutation]] للكتابة و [[subscription]] للتحديثات live) |
| [[FeedPage]] | اسم اختياري للعملية. بيظهر في الـ logs وأدوات المراقبة، فبتعرف أنهي شاشة بعتت الطلب البطيء |
| [[($first: Int!)]] | متغير. [[$]] قبل الاسم، و [[Int]] نوعه، و [[!]] = إجباري |

ليه متغير مش [[posts(first: 3)]] مكتوبة جوه؟ عشان نص الـ query يفضل ثابت (يتكاش، ويتسجّل كـ persisted query)، والقيم تتبعت لوحدها في [[variables]]، ومن غير ما تلزق نصوص بإيدك (زي SQL injection بس في GraphQL).

## ٢. الحقول

~~~graphql
  posts(first: $first) {
    id
    title
    author {
      name
      avatarUrl
    }
  }
~~~

- [[posts(first: $first)]]: حقل بياخد argument، والقيمة من المتغير.
- [[{ ... }]] بعد حقل = «من الـ object ده هات الحقول دي». [[posts]] list، فالحقول بتتطلب **لكل** منشور.
- [[author { name avatarUrl }]]: علاقة. من كل منشور هات كاتبه، ومن الكاتب حقلين بس.
- مفيش فواصل بين الحقول: السطر الجديد أو المسافة كفاية.

~~~graphql
  me {
    name
    unreadCount
  }
}
~~~

حقل تاني في **نفس** الطلب، ملوش علاقة بالمنشورات. ده اللي بيوفّر الطلب التاني في REST.

---

## ٣. اللي بيتبعت فعلًا

طلب HTTP واحد: [[POST /graphql]] و body JSON فيه النص والمتغيرات:

~~~text الناتج (الـ body، مقصوص في النص)
{"query":"query FeedPage($first: Int!) {\n  posts(first: $fi...variables":{"first":3},"operationName":"FeedPage"}
~~~

[[operationName]] بيقول أنهي عملية تتنفّذ لو النص فيه أكتر من واحدة.

## ٤. الرد

~~~text الناتج (status 200، ومقسوم على سطور عشان يتقري)
{ "data": { "me": { "name": "User 3", "unreadCount": 2 },
  "posts": [ { "id": "50", "title": "Post 50", "author": { "name": "User 10", "avatarUrl": "/a/u10.png" } },
             { "id": "49", "title": "Post 49", "author": { "name": "User 9", "avatarUrl": "/a/u9.png" } },
             { "id": "48", "title": "Post 48", "author": { "name": "User 8", "avatarUrl": "/a/u8.png" } } ] } }
~~~

- كل حاجة جوه [[data]].
- نفس الحقول اللي اتطلبت بس. المستخدم عنده [[email]] و [[role]] في البيانات، ومطلعوش.

### بس الطلبات راحت فين؟

العدّاد سجّل اللي حصل على السيرفر (الـ [[author]] resolver هنا بيجيب كل كاتب لوحده):

~~~text الناتج
db queries: 5 [
  'SELECT posts LIMIT 3',
  'SELECT user WHERE id = u3',
  'SELECT user WHERE id = u10',
  'SELECT user WHERE id = u9',
  'SELECT user WHERE id = u8'
]
~~~

طلب HTTP واحد، بس ٥ استعلامات: واحد للمنشورات، وواحد لـ [[me]]، وواحد **لكل منشور**. الطلبات الكتير اتنقلت من الشبكة للسيرفر. ده الـ N+1، ودرس [[DataLoader و N+1]] بيحله.

## ٥. حقل غلط

~~~text الناتج (titel بدل title، ومقسوم على سطور)
200 { "errors": [ { "message": "Cannot query field \"titel\" on type \"Post\". Did you mean \"title\"?",
  "locations": [ { "line": 1, "column": 58 } ], "extensions": { "code": "GRAPHQL_VALIDATION_FAILED" } } ] }
db queries: 0 []
~~~

- السيرفر فحص الـ query مقابل الـ schema **قبل** التنفيذ: صفر استعلامات.
- [[locations]]: السطر والعمود في نص الـ query.
- والـ status **200** مع إن فيه خطأ. ده من أشهر الفروق عن REST: المراقبة لازم تبص على [[errors]] جوه الـ body (درس [[schema و resolvers]] فيه إمتى بيرجع 400).

---

## الخلاصة

| REST | GraphQL |
|---|---|
| [[GET /posts]] + [[GET /me]] + [[GET /users/:id]] لكل كاتب | [[POST /graphql]] واحد |
| السيرفر بيحدد شكل الرد | العميل بيكتب الحقول |
| حقول زيادة بتيجي (over-fetching) | اللي اتطلب بس |
| كاش HTTP و CDN ببلاش | كله POST على URL واحد، فالكاش في العميل |
| 404 و 422 واضحين | غالبًا 200، والأخطاء في [[errors]] |
| N+1 لو كتبت loop غلط | N+1 الوضع الافتراضي لو مفيش DataLoader |

- [[query Name($var: Type!)]]: اسم للمراقبة، والقيم في [[variables]].
- الأقواس المعقوفة = اختار حقول من الـ object ده.
- طلب واحد على الشبكة مش معناه استعلام واحد على القاعدة.`,
          lines: [
            "query ليه اسم (مفيد في الـ logs) وبياخد متغير first نوعه Int إجباري.",
            "هات المنشورات بالعدد ده...",
            "...الـ id...",
            "...والعنوان...",
            "...والكاتب (علاقة: resolver تاني)...",
            "...اسمه...",
            "...وصورته. ومفيش إيميل ولا أي حقل تاني، مطلبتهوش.",
            "قفلة الكاتب.",
            "قفلة المنشورات.",
            "وفي نفس الطلب: المستخدم الحالي...",
            "...اسمه...",
            "...وعدد الإشعارات.",
            "قفلة.",
            "قفلة: ده كله طلب HTTP واحد."
          ],
          sol: R`مثال شائع: صفحة الـ feed في REST بتعمل [[GET /posts]] و [[GET /me]]، وبعدين [[GET /users/:id]] لكل كاتب مش معروف. يعني ١٢ طلب لـ ١٠ منشورات بكتّاب مختلفين، والـ user object فيه ١٥ حقل والشاشة بتعرض ٢. نفس الشاشة بـ GraphQL طلب واحد، والرد فيه الحقول الـ ٧ بالظبط.

بس لاحظ إن الطلبات دي لسه موجودة، بس اتنقلت للسيرفر: الـ resolver بتاع [[author]] هيتنادى ١٠ مرات. ده الـ N+1، ودرس [[DataLoader و N+1]] بيحله. ولو لقيت إن الشاشة أصلًا بتعمل طلب أو اتنين، فـ GraphQL مش هيكسبك كتير هنا.`
        },
        {
          cmd: "schema و resolvers",
          title: "اعمل سيرفر GraphQL بـ Yoga جوه Express",
          desc: R`الـ schema بتكتبها بلغة SDL: الأنواع وحقولها، و [[Query]] و [[Mutation]] كنقط دخول. والـ resolvers دوال: لكل حقل محتاج منطق، دالة بترجّع قيمته. كل resolver بياخد ٤ حاجات: الـ parent (الـ object اللي فوقه)، والـ args، والـ context (مشترك للطلب كله: المستخدم، والقاعدة)، و info.

GraphQL Yoga سيرفر خفيف مبني على Web APIs، ويتركّب جوه Express أو Next أو لوحده. و Apollo Server بديل مشهور بنفس الفكرة.`,
          example: R`import { createYoga, createSchema } from "graphql-yoga";
const typeDefs = /* GraphQL */ $__bt
  type User { id: ID! name: String! email: String posts: [Post!]! }
  type Post { id: ID! title: String! author: User! }
  type Query { posts(first: Int = 10): [Post!]! me: User }
  type Mutation { createPost(title: String!): Post! }
$__bt;
const resolvers = {
  Query: {
    posts: (_parent, args: { first: number }) => db.post.findMany({ take: Math.min(args.first, 50), orderBy: { id: "desc" } }),
    me: (_parent, _args, ctx: Ctx) => ctx.user,
  },
  Post: { author: (post, _args, ctx: Ctx) => ctx.loaders.user.load(post.authorId) },
  User: { posts: (user) => db.post.findMany({ where: { authorId: user.id }, take: 20 }) },
  Mutation: { createPost: (_p, args: { title: string }, ctx: Ctx) => db.post.create({ data: { title: args.title, authorId: requireUser(ctx).id } }) },
};
export const yoga = createYoga<{ req: express.Request }>({
  schema: createSchema({ typeDefs, resolvers }),
  graphqlEndpoint: "/graphql",
  graphiql: process.env.NODE_ENV !== "production",
  context: async ({ req }) => ({ user: await userFromRequest(req), loaders: makeLoaders() }),
});
app.use(yoga.graphqlEndpoint, yoga);`,
          try: R`سطّب [[npm i graphql@16 graphql-yoga]]، واعمل السيرفر ده بـ array في الذاكرة بدل db. افتح [[localhost:3000/graphql]] (GraphiQL) واكتب query للمنشورات مع اسم الكاتب. وبعدين اطلب حقل مش موجود زي [[posts { price }]] وشوف الخطأ، وابعت نفس الـ query بـ [[curl -X POST localhost:3000/graphql -H 'content-type: application/json' -d '{"query":"{ posts { title } }"}']].`,
          flag: "script",
          deep: {
            why: "الـ schema هي العقد بين الفرونت والباك، زي OpenAPI بالظبط بس جوه السيرفر نفسه. والـ resolvers بتخليك تفكّر في كل حقل لوحده: مين بيجيبه، ومين مسموحله يشوفه، وبيكلّف كام.",
            how: R`SDL: [[!]] يعني مش null. [[[Post!]!]] يعني list مش null، وكل عنصر فيها مش null. [[ID]] نص بيمثل id. والـ args بقيم افتراضية زي [[first: Int = 10]].

إزاي التنفيذ بيمشي: GraphQL بيبدأ من [[Query.posts]]، وياخد النتيجة (array منشورات)، ولكل منشور ولكل حقل مطلوب يدوّر على resolver. لو مفيش resolver للحقل (زي [[title]])، بياخد [[post.title]] من الـ object على طول (default resolver). عشان كده بتكتب resolvers بس للحقول اللي محتاجة منطق: علاقات، أو حقول محسوبة، أو صلاحيات.

الـ context: بيتعمل مرة لكل طلب. فيه المستخدم (من الكوكي أو التوكن) والـ loaders (الدرس الجاي). ولازم يتعمل جديد لكل طلب، مش global، وإلا بيانات مستخدم تتسرب لطلب تاني.

[[createYoga]] بيرجّع handler بيفهم Express و Node و Fetch API. [[graphqlEndpoint]] لازم يبقى نفس المسار اللي ركّبته عليه. و [[graphiql]] صفحة تجرّب منها الـ queries، مقفولة في الإنتاج هنا.

نسخة graphql: مكتبة [[graphql]] نزلت منها 17، بس plugins كتير (منها اللي في درس الـ auth) لسه بتطلب 16، واتنين نسخ من graphql في نفس المشروع بيعملوا أخطاء غريبة. عشان كده [[graphql@16]] دلوقتي، وراجع الـ peerDependencies قبل ما ترقّي.

Apollo Server: نفس الـ typeDefs والـ resolvers بالظبط، والفرق في طريقة التركيب ([[expressMiddleware]]) والـ plugins. والـ resolvers مش مربوطة بالسيرفر، فالنقل بينهم سهل.

وفيه طريقة تانية: code-first (زي Pothos) بتكتب الـ schema بـ TypeScript والـ SDL بيتولّد منها، فالأنواع في الـ resolvers مضبوطة لوحدها.`,
            when: "لما قررت GraphQL (الدرس اللي فات). وخلّي الـ resolvers رفيعة: بتنادي services، زي الـ controllers في REST.",
            mistakes: R`context واحد global لكل الطلبات. و [[take]] من غير حد في resolvers القوايم (العميل يطلب [[first: 100000]]). ومنطق الـ business كله جوه الـ resolvers فمتقدرش تستخدمه من REST أو job. وترجّع أخطاء القاعدة كما هي في [[errors]] (Yoga بيخفيها افتراضيًا، في التطوير والإنتاج، ويبعت [[Unexpected error.]] بكود [[INTERNAL_SERVER_ERROR]]، إلا لو رميت [[GraphQLError]] بنفسك. لو قفلت الـ masking بـ [[maskedErrors: false]] رسايل القاعدة بتطلع للعميل).`
          },
          teach: R`## الفكرة: schema بتقول «إيه الموجود»، و resolvers بتقول «هاته منين»

المثال ٣ حتت: [[typeDefs]] نص بلغة SDL بيوصف الأنواع ونقط الدخول، و [[resolvers]] object بنفس الشكل فيه دالة لكل حقل محتاج منطق، و [[createYoga]] بيجمعهم في handler بيتركب في Express على [[/graphql]].

اتجرّب على ويندوز 11: graphql-yoga 5.24.2 و graphql 16.14.2 و Express 5.2.1 على Node 24.19 (بورت ٦٠٠٥)، والكود زي المثال بالظبط. [[db]] object في الذاكرة بنفس شكل دوال Prisma (٥٠ منشور و ١٠ مستخدمين) وبيسجّل كل استعلام، و [[userFromRequest]] بيقرا توكن تجربة [[Bearer tok-u3]]، و [[makeLoaders]] هو اللي في الدرس الجاي، و [[requireUser]] اللي في درس الـ auth. اتشغّل بـ [[node --import tsx]] (بيشيل الأنواع من غير ما يفحصها).

---

## ١. الـ schema بـ SDL

~~~ts
import { createYoga, createSchema } from "graphql-yoga";
const typeDefs = /* GraphQL */ $__bt
~~~

SDL (Schema Definition Language) نص عادي جوه template string. التعليق [[/* GraphQL */]] مالوش أي تأثير في التشغيل: المحررات بتشوفه فتلوّن النص كـ GraphQL.

~~~graphql
  type User { id: ID! name: String! email: String posts: [Post!]! }
  type Post { id: ID! title: String! author: User! }
~~~

| الكتابة | معناها |
|---|---|
| [[type User { ... }]] | نوع object وحقوله |
| [[ID]] | نص بيمثّل id (بيرجع في JSON كـ string) |
| [[String!]] | نص، و [[!]] = مستحيل يبقى null |
| [[email: String]] | من غير [[!]]: ممكن null (درس الـ auth بيستغل ده) |
| [[[Post!]!]] | list مش null، وكل عنصر فيها مش null |
| [[author: User!]] | علاقة: حقل نوعه object تاني |

~~~graphql
  type Query { posts(first: Int = 10): [Post!]! me: User }
  type Mutation { createPost(title: String!): Post! }
~~~

[[Query]] و [[Mutation]] أنواع خاصة: حقولهم هي نقط الدخول اللي العميل يبدأ منها. [[first: Int = 10]] argument بقيمة افتراضية. و [[me: User]] ممكن null (مش عامل login).

---

## ٢. الـ resolvers

كل resolver دالة بتاخد لحد ٤ حاجات بالترتيب:

| الترتيب | الاسم | فيه إيه |
|---|---|---|
| ١ | parent | الـ object اللي الحقل ده جواه (للـ Query: مفيش) |
| ٢ | args | الـ arguments ([[first]] و [[title]]) |
| ٣ | context | مشترك للطلب كله: المستخدم والـ loaders |
| ٤ | info | معلومات عن الـ query نفسه (نادرًا) |

الـ [[_]] قبل الاسم ([[_parent]] و [[_args]]) اتفاق معناه «موجود عشان الترتيب بس، مش مستخدم».

~~~ts
  Query: {
    posts: (_parent, args: { first: number }) => db.post.findMany({ take: Math.min(args.first, 50), orderBy: { id: "desc" } }),
    me: (_parent, _args, ctx: Ctx) => ctx.user,
  },
~~~

- [[Math.min(args.first, 50)]]: مهما العميل طلب، ٥٠ بالكتير. طلبنا [[posts(first: 100000)]]: رجع ٥٠ منشور، و log القاعدة [[SELECT posts LIMIT 50]].
- [[me]] بيرجّع المستخدم من الـ context. من غير توكن: [[{"data":{"me":null}}]].
- الـ resolver يقدر يرجّع قيمة أو Promise، و GraphQL بيستنى.

~~~ts
  Post: { author: (post, _args, ctx: Ctx) => ctx.loaders.user.load(post.authorId) },
  User: { posts: (user) => db.post.findMany({ where: { authorId: user.id }, take: 20 }) },
~~~

هنا الـ parent بيتستخدم: [[post]] هو المنشور اللي جه من [[Query.posts]]، فنعرف [[authorId]] بتاعه. ومفيش resolver لـ [[title]] ولا [[name]]: الـ **default resolver** بياخد [[post.title]] من الـ object على طول.

~~~ts
  Mutation: { createPost: (_p, args: { title: string }, ctx: Ctx) => db.post.create({ data: { title: args.title, authorId: requireUser(ctx).id } }) },
~~~

[[authorId]] جاي من المستخدم اللي عامل login، **مش** من الـ args. لو العميل يقدر يبعت [[authorId]]، يقدر ينشر باسم أي حد.

---

## ٣. السيرفر

~~~ts
export const yoga = createYoga<{ req: express.Request }>({
  schema: createSchema({ typeDefs, resolvers }),
  graphqlEndpoint: "/graphql",
  graphiql: process.env.NODE_ENV !== "production",
  context: async ({ req }) => ({ user: await userFromRequest(req), loaders: makeLoaders() }),
});
app.use(yoga.graphqlEndpoint, yoga);
~~~

- [[<{ req: express.Request }>]]: بيقول لـ TypeScript إن الـ context الأولي فيه [[req]] بتاع Express، فـ [[({ req })]] تحت يبقى ليه نوع.
- [[createSchema]]: بيربط الـ SDL بالـ resolvers. ولو كتبت resolver لحقل مش في الـ schema بيرمي وقت التشغيل: [[Query.b defined in resolvers, but not in schema]].
- [[graphqlEndpoint]]: لازم يبقى نفس المسار في [[app.use]].
- [[graphiql]]: صفحة تجرّب فيها الـ queries. الافتراضي في Yoga **مفتوحة** حتى في الإنتاج، عشان كده بنقفلها بإيدنا. في التطوير، [[GET /graphql]] من المتصفح رجّع صفحة [[<title>Yoga GraphiQL</title>]].
- [[context]]: دالة بتتنادى **مع كل طلب**، فكل طلب له مستخدمه و loaders جديدة.

---

## ٤. التجربة

~~~bash
curl -s -X POST localhost:6005/graphql -H 'content-type: application/json' -d '{"query":"{ posts(first: 2) { title author { name } } }"}'
~~~

~~~text الناتج
{"data":{"posts":[{"title":"Post 50","author":{"name":"User 10"}},{"title":"Post 49","author":{"name":"User 9"}}]}}
~~~

~~~text الناتج (الاستعلامات اللي اتعملت)
["SELECT posts LIMIT 2","SELECT users WHERE id IN (u10,u9)"]
~~~

استعلامين بس: الـ loader جمع الكاتبين في استعلام واحد. لكن لو طلبت كمان [[author { posts { id } }]]، [[User.posts]] (اللي بيكلم القاعدة مباشرة) عمل استعلام **لكل كاتب**:

~~~text الناتج (posts(first: 3) مع author.posts)
["SELECT posts LIMIT 3","SELECT users WHERE id IN (u10,u9,u8)","SELECT posts WHERE {\"authorId\":\"u10\"} LIMIT 20","SELECT posts WHERE {\"authorId\":\"u9\"} LIMIT 20","SELECT posts WHERE {\"authorId\":\"u8\"} LIMIT 20"]
~~~

الحل في الدرس الجاي ([[postsByAuthor]]).

### حقل مش موجود

~~~text الناتج
HTTP/1.1 200 OK
{"errors":[{"message":"Cannot query field \"price\" on type \"Post\".","locations":[{"line":1,"column":11}],"extensions":{"code":"GRAPHQL_VALIDATION_FAILED"}}]}
~~~

ونفس الطلب بـ [[-H 'accept: application/graphql-response+json']]:

~~~text الناتج
HTTP/1.1 400 Bad Request
Content-Type: application/graphql-response+json; charset=utf-8
~~~

مواصفة GraphQL over HTTP: لو العميل بيقبل النوع الجديد ده، الـ validation error بيرجع 400. مع [[application/json]] العادي بيفضل 200.

### الـ mutation

~~~text الناتج (من غير توكن، ثم بـ Bearer tok-u3)
HTTP/1.1 401 Unauthorized
{"errors":[{"message":"Login required","locations":[{"line":1,"column":12}],"path":["createPost"],"extensions":{"code":"UNAUTHENTICATED"}}],"data":null}

{"data":{"createPost":{"id":"51","title":"hi","author":{"name":"User 3"}}}}
~~~

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[typeDefs]] (SDL) | الأنواع، و [[!]] للـ non-null، و [[Query]] / [[Mutation]] نقط الدخول |
| [[resolvers]] | دالة لكل حقل محتاج منطق: [[(parent, args, ctx, info)]] |
| default resolver | أي حقل من غير resolver بيتاخد من الـ object نفسه |
| [[context]] | جديد لكل طلب: المستخدم والـ loaders |
| [[graphiql]] | مفتوح افتراضيًا، فاقفله في الإنتاج |

- حد أقصى لكل قايمة جوه الـ resolver ([[Math.min]]).
- اللي بيحدد الملكية ([[authorId]]) ييجي من الـ context مش من الـ args.
- أي resolver لعلاقة بيكلم القاعدة مباشرة = N+1.`,
          lines: [
            "السيرفر ودالة بناء الـ schema.",
            "الـ schema بـ SDL (التعليق بيخلي المحرر يلوّنها).",
            "المستخدم: الإيميل ممكن يبقى null (هنخفيه عن الغريب في درس الـ auth).",
            "المنشور وكاتبه.",
            "نقط الدخول للقراية: المنشورات (افتراضي ١٠)، والمستخدم الحالي.",
            "نقطة دخول للكتابة.",
            "قفلة الـ SDL.",
            "الـ resolvers بنفس شكل الـ schema.",
            "القراية:",
            "المنشورات بحد أقصى ٥٠ مهما طلب العميل.",
            "المستخدم الحالي من الـ context.",
            "قفلة.",
            "كاتب المنشور: من الـ loader مش استعلام لكل منشور (الدرس الجاي).",
            "منشورات المستخدم بحد.",
            "إنشاء منشور: لازم يكون مسجّل، والكاتب هو المستخدم الحالي مش حاجة جاية من الـ args.",
            "قفلة.",
            "اعمل السيرفر.",
            "الـ schema من الأنواع والـ resolvers.",
            "المسار.",
            "GraphiQL في التطوير بس.",
            "context جديد لكل طلب: المستخدم و loaders جديدة.",
            "قفلة.",
            "ركّبه في Express."
          ],
          sol: R`الـ query [[{ posts(first: 2) { title author { name } } }]] بيرجّع [[{"data":{"posts":[{"title":"...","author":{"name":"..."}}, ...]}}]]: نفس شكل الـ query بالظبط.

طلب حقل مش موجود بيرجّع قبل أي تنفيذ، ومن غير ما أي resolver يشتغل: [[{"errors":[{"message":"Cannot query field \"price\" on type \"Post\".","extensions":{"code":"GRAPHQL_VALIDATION_FAILED"}}]}]]. ولاحظ إن الـ status بيفضل 200 مع curl العادي: GraphQL over HTTP بيرجّع 200 مع [[application/json]]، و 4xx بس لو العميل طلب [[Accept: application/graphql-response+json]]. عشان كده المراقبة لازم تبص على [[errors]] جوه الـ body.

لو شفت [[Unexpected error]] أو خطأ فيه [[Cannot use GraphQLSchema from another module or realm]]، غالبًا عندك نسختين من [[graphql]] (شغّل [[npm ls graphql]]). ولو [[author]] رجع null وهو [[User!]]، الخطأ بيطلع في [[errors]] ([[Cannot return null for non-nullable field Post.author.]] في log السيرفر، و [[Unexpected error.]] للعميل)، و GraphQL بيطلّع الـ null لأقرب حقل يقبل null. هنا [[posts]] نوعها [[[Post!]!]]، فمفيش ولا حقل في الطريق يقبل null، و [[data]] كلها بتبقى [[null]]. لو القايمة كانت [[[Post]!]]، المنشور ده بس اللي هيبقى null والباقي يرجع عادي.`
        },
        {
          cmd: "DataLoader و N+1",
          title: "اجمع استعلامات الـ resolvers في استعلام واحد",
          desc: R`لو طلبت ٥٠ منشور ومع كل واحد الكاتب، resolver الـ [[author]] بيتنادى ٥٠ مرة، وكل مرة استعلام: ٥١ استعلام لطلب واحد. ده الـ N+1.

DataLoader بيحل ده: كل [[load(id)]] في نفس الـ tick بيتجمّع، وفي الآخر بيتنادى batch function واحدة بكل الـ ids، يعني استعلام واحد [[WHERE id IN (...)]]. وكمان بيعمل كاش للطلب: نفس الـ id مرتين = مرة واحدة.`,
          example: R`import DataLoader from "dataloader";
export function makeLoaders() {
  return {
    user: new DataLoader<string, User>(async (ids) => {
      const rows = await db.user.findMany({ where: { id: { in: [...ids] } } });
      const byId = new Map(rows.map((u) => [u.id, u]));
      return ids.map((id) => byId.get(id) ?? new Error($__btUser $__{id} not found$__bt));
    }),
    postsByAuthor: new DataLoader<string, Post[]>(async (authorIds) => {
      const rows = await db.post.findMany({ where: { authorId: { in: [...authorIds] } }, orderBy: { id: "desc" } });
      return authorIds.map((id) => rows.filter((p) => p.authorId === id));
    }),
  };
}`,
          try: R`عدّ الاستعلامات: زوّد عداد في كل نداء للقاعدة (أو شغّل Prisma بـ [[log: ["query"]]]). اطلب [[{ posts(first: 50) { title author { name } } }]] مرة والـ author resolver بيعمل [[db.user.findUnique]] مباشرة، ومرة بالـ loader. قارن العددين.`,
          flag: "script",
          deep: {
            why: "الـ N+1 هو أشهر مشكلة أداء في GraphQL، ومبيبانش في التطوير: ١٠ منشورات = ١١ استعلام سريعين على جهازك. في الإنتاج ١٠٠ منشور وكل واحد فيه تعليقات وكل تعليق ليه كاتب، والطلب الواحد بقى آلاف الاستعلامات.",
            how: R`DataLoader بيستغل طريقة شغل الـ event loop. الـ resolvers بتاعة الـ ٥٠ منشور بتتنادى ورا بعض في نفس الدورة، وكل واحد بيعمل [[load(id)]] ويرجّع Promise. DataLoader بيستنى لآخر الدورة الحالية، وبعدين ينادي الـ batch function مرة واحدة بكل الـ ids.

قاعدتين للـ batch function: ترجّع array بنفس طول الـ ids، وبنفس ترتيبهم. القاعدة مش بترجّع الصفوف بترتيب [[IN]]، وممكن متلاقيش بعضها. عشان كده الـ Map والـ [[ids.map]]. ولو id مش موجود، رجّع Error في مكانه (أو null لو الحقل بيقبل null)، مش تشيله من الـ array، وإلا كل النتايج اللي بعده هتتزحلق لـ ids غلط.

الكاش: DataLoader بيحفظ كل Promise بالـ id، فنفس الكاتب لـ ٢٠ منشور = id واحد في الاستعلام. والكاش ده لازم يعيش طول الطلب بس. عشان كده [[makeLoaders()]] بتتنادى في الـ context لكل طلب. لو عملته global، مستخدم هيشوف بيانات قديمة، أو بيانات اتجابت بصلاحيات مستخدم تاني.

علاقة one-to-many ([[postsByAuthor]]): الـ batch بيجيب كل منشورات كل الكتّاب في استعلام، ويقسّمها. خلي بالك: [[take]] هنا بيبقى على المجموع مش لكل كاتب، فلو محتاج «آخر ٥ لكل كاتب» محتاج SQL أذكى (window function أو LATERAL).

إزاي تعرف إن عندك N+1؟ شغّل log الاستعلامات وعدّها لكل طلب GraphQL، أو tracing (OpenTelemetry) بيوريك الاستعلامات تحت كل طلب. وفيه أدوات بتعمل تحذير لو عدد الاستعلامات عدّى حد.

ونفس المشكلة موجودة في REST برضه: loop بيعمل استعلام لكل عنصر (تاب «بناء مشروع كامل»، درس [[indexes و N+1]]). بس GraphQL بيخليها الوضع الافتراضي لو مخدتش بالك.`,
            when: "أي resolver لعلاقة (كاتب، أو تعليقات، أو منتج في طلب) بيتنادى جوه قايمة. عمليًا: أي resolver بيعمل [[findUnique]] بـ id جاي من الـ parent.",
            mistakes: R`loader global بكاش بيعيش للأبد. والـ batch function بترجّع الصفوف بترتيب القاعدة مش بترتيب الـ ids (bug بيطلّع كاتب غلط لمنشور، ومبيبانش غير لما الترتيب يختلف). وتشيل الـ ids اللي ملهاش صفوف فالطول يختلف و DataLoader يرمي error. و [[await]] جوه loop في resolver واحد ([[for (const id of ids) await loader.load(id)]]) فكل load في دورة لوحدها ومفيش تجميع: استخدم [[loader.loadMany(ids)]] أو [[Promise.all]].`
          },
          teach: R`## الفكرة: «استنى شوية، وهات الكل مرة واحدة»

بدل ما كل resolver يكلم القاعدة لوحده، بيقول للـ loader [[load(id)]] وياخد Promise. الـ loader بيجمع كل الـ ids اللي اتطلبت في نفس اللحظة، وبينادي دالة واحدة (batch function) بيهم كلهم، يعني استعلام [[IN]] واحد. المثال فيه loaderين: مستخدم بالـ id، ومنشورات كل كاتب.

اتجرّب على ويندوز 11: dataloader 2.2.3 و graphql-yoga 5.24.2 على Node 24.19. [[db]] object في الذاكرة بنفس شكل Prisma (٥٠ منشور بين ١٠ كتّاب) وبيسجّل كل استعلام. الـ queries اتبعتت لـ [[yoga.fetch]] (نفس الـ handler من غير شبكة)، و [[makeLoaders()]] بالظبط زي المثال وبيتنادى في الـ context.

---

## ١. [[makeLoaders]] دالة مش object

~~~ts
import DataLoader from "dataloader";
export function makeLoaders() {
  return {
~~~

كل نداء بيرجّع loaders **جديدة**. بتتنادى في الـ context، يعني مرة لكل طلب، والكاش بيموت مع آخر الطلب.

## ٢. loader المستخدمين

~~~ts
    user: new DataLoader<string, User>(async (ids) => {
~~~

- [[<string, User>]]: الـ key نص (id)، والقيمة [[User]].
- الدالة اللي جوه هي الـ batch function. [[ids]] array فيها كل الـ ids اللي اتطلبت في الدورة دي (من غير تكرار).

~~~ts
      const rows = await db.user.findMany({ where: { id: { in: [...ids] } } });
~~~

استعلام واحد: [[WHERE id IN (...)]]. و [[[...ids]]]: نسخة عادية من الـ array (الـ [[ids]] اللي DataLoader بيديه نوعه [[readonly]]).

~~~ts
      const byId = new Map(rows.map((u) => [u.id, u]));
      return ids.map((id) => byId.get(id) ?? new Error($__btUser $__{id} not found$__bt));
    }),
~~~

- [[rows.map((u) => [u.id, u])]]: كل صف يبقى زوج [[[id, user]]]، و [[new Map(...)]] بيعمل منهم lookup سريع.
- [[ids.map]]: الناتج **بنفس ترتيب وطول** [[ids]]. ده شرط DataLoader: العنصر رقم ٣ في الناتج هو رد الـ id رقم ٣.
- [[??]] (nullish coalescing): لو [[byId.get(id)]] رجع [[undefined]]، خد اللي بعده. هنا [[Error]] في مكان الـ id اللي ملوش صف.

## ٣. loader منشورات الكاتب (one-to-many)

~~~ts
    postsByAuthor: new DataLoader<string, Post[]>(async (authorIds) => {
      const rows = await db.post.findMany({ where: { authorId: { in: [...authorIds] } }, orderBy: { id: "desc" } });
      return authorIds.map((id) => rows.filter((p) => p.authorId === id));
    }),
~~~

القيمة هنا [[Post[]]] (array). استعلام واحد لكل الكتّاب، وبعدين [[filter]] بيقسّم: لكل كاتب منشوراته. والكاتب اللي ملوش منشورات بياخد [[[]]] فاضية، مش Error.

---

## ٤. العدّ: من غير loader ومعاه

نفس الـ query [[{ posts(first: 50) { title author { name } } }]] بـ ٣ أشكال للـ [[author]] resolver:

~~~text الناتج
direct findUnique     queries: 51 | SELECT posts LIMIT 50 ; SELECT user WHERE id = u10 ; SELECT user WHERE id = u9 ...
loader                queries:  2 | SELECT posts LIMIT 50 ; SELECT users WHERE id IN (u10,u9,u8,u7,u6,u5,u4,u3,u2,u1)
new loader per call   queries: 51 | SELECT posts LIMIT 50 ; SELECT users WHERE id IN (u10) ; SELECT users WHERE id IN (u9) ...
~~~

- **من غير loader**: ١ + ٥٠ = ٥١، مع إن فيه ١٠ كتّاب بس (كل كاتب اتجاب ٥ مرات).
- **بالـ loader**: ٢. والـ [[IN]] فيه ١٠ ids بس: الكاش شال التكرار.
- **loader جديد في كل resolver** ([[makeLoaders().user.load(...)]] جوه الـ resolver): ٥١ تاني. كل loader شاف id واحد، فمفيش حاجة يجمعها. لازم loader واحد مشترك للطلب كله، وده ليه مكانه الـ context.

### إزاي بيجمع؟

الـ ٥٠ resolver بيتنادوا ورا بعض في نفس الدورة، وكل [[load]] بيرجّع Promise من غير ما يكلم القاعدة. DataLoader بيأجّل الـ batch لحد ما الكود الحالي يخلص (آخر الدورة)، وبعدين بينادي الـ batch function مرة بكل اللي اتجمع.

### الـ one-to-many

[[{ posts(first: 3) { author { posts { id } } } }]]:

~~~text الناتج
posts per author (direct)   queries: 5 | SELECT posts LIMIT 3 ; SELECT users WHERE id IN (u10,u9,u8) ; SELECT posts WHERE {"authorId":"u10"} ...
posts per author (loader)   queries: 3 | SELECT posts LIMIT 3 ; SELECT users WHERE id IN (u10,u9,u8) ; SELECT posts WHERE {"authorId":{"in":["u10","u9","u8"]}}
~~~

---

## ٥. الترتيب والـ id المفقود

~~~ts
const L = makeLoaders();
await Promise.allSettled([L.user.load("u3"), L.user.load("u1"), L.user.load("u99"), L.user.load("u3")]);
~~~

~~~text الناتج
User 3 | User 1 | Error: User u99 not found | User 3 | queries: [ 'SELECT users WHERE id IN (u3,u1,u99)' ]
~~~

- كل واحد خد بتاعه بالترتيب.
- [[u99]] بس هو اللي فشل، والباقي اشتغل عادي.
- [[u3]] اتطلب مرتين واتجاب مرة (الكاش).
- [[Promise.allSettled]] بيستنى الكل حتى لو فيه واحد فشل (عكس [[Promise.all]]).

### لو الـ batch function رجّعت [[rows]] على طول

~~~ts
const bad = new DataLoader(async (ids) => await db.user.findMany({ where: { id: { in: [...ids] } } }));
await Promise.all([bad.load("u3"), bad.load("u1")]);
~~~

~~~text الناتج
[ 'User 1', 'User 3' ]
~~~

طلبنا u3 ثم u1، ورجع العكس: القاعدة رجّعت الصفوف بترتيبها هي. منشور هيظهر باسم كاتب غلط، **من غير أي error**.

ولو فيه id مش موجود، الطول بيختلف و DataLoader بيرفض:

~~~text الناتج
DataLoader must be constructed with a function which accepts Array<key> and returns Promise<Array<value>>, but the function did not return a Promise of an Array of the same length as the Array of keys
~~~

---

## ٦. [[await]] جوه loop

~~~ts
for (const id of ["u1", "u2", "u3"]) await L2.user.load(id);
await L3.user.loadMany(["u1", "u2", "u3"]);
~~~

~~~text الناتج
await in loop: [ 'SELECT users WHERE id IN (u1)', 'SELECT users WHERE id IN (u2)', 'SELECT users WHERE id IN (u3)' ]
loadMany: [ 'SELECT users WHERE id IN (u1,u2,u3)' ]
~~~

الـ [[await]] بيستنى الـ batch يخلص قبل ما الـ load اللي بعده يتنادى، فكل واحد في دورة لوحده. [[loadMany]] (أو [[Promise.all]]) بيطلبهم كلهم مع بعض.

---

## الخلاصة

| الحالة | عدد الاستعلامات (٥٠ منشور، ١٠ كتّاب) |
|---|---|
| resolver بيكلم القاعدة مباشرة | ٥١ |
| loader مشترك في الـ context | ٢ |
| loader جديد جوه كل resolver | ٥١ |

- الـ batch function: نفس **طول** و**ترتيب** الـ ids، و Error (أو null) مكان المفقود.
- [[makeLoaders()]] في الـ context: loader لكل طلب، مش global ومش جوه الـ resolver.
- [[loadMany]] أو [[Promise.all]] بدل [[await]] في loop.`,
          lines: [
            "المكتبة.",
            "بتتنادى لكل طلب في الـ context، فالكاش بيعيش طول الطلب ده بس.",
            "الـ loaders:",
            "loader للمستخدمين بالـ id. الدالة دي بتتنادى مرة واحدة بكل الـ ids اللي اتطلبت في نفس الدورة.",
            "استعلام واحد: WHERE id IN (...).",
            "Map بالـ id عشان نرتّب.",
            "رجّع بنفس ترتيب وطول الـ ids، و Error مكان أي id ملوش صف.",
            "قفلة.",
            "loader لعلاقة one-to-many: منشورات كل كاتب.",
            "استعلام واحد لكل الكتّاب.",
            "قسّمهم: لكل كاتب array بمنشوراته (ممكن تبقى فاضية).",
            "قفلة.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`لـ ٥٠ منشور بين ١٠ كتّاب: من غير loader العداد بيطلع ٥١ (استعلام للمنشورات و ٥٠ للكتّاب، حتى لو الكاتب متكرر). بالـ loader بيطلع ٢: المنشورات، واستعلام [[IN]] واحد فيه ١٠ ids بس (الكاش شال التكرار).

لو لقيته لسه كبير بالـ loader: يا الـ loader بيتعمل جوه الـ resolver نفسه (كل نداء loader جديد، فمفيش تجميع)، يا فيه [[await]] جوه loop. ولو ظهر كاتب غلط على منشور: الـ batch function بترجّع [[rows]] بترتيب القاعدة بدل [[ids.map]].`
        },
        {
          cmd: "auth في resolvers",
          title: "مين يشوف أنهي حقل، وحد للاستعلامات العميقة",
          desc: R`في REST بتحمي endpoint. في GraphQL فيه endpoint واحد، والبيانات نفسها بتتوصل من طرق كتير: الإيميل ممكن يوصله من [[me]] أو من [[post.author]] أو من [[comment.author]]. فالصلاحية لازم تبقى على الحقل أو النوع نفسه، مش على الـ query.

وكمان العميل ممكن يكتب query متداخل ١٠ مستويات (منشور، كاتبه، منشوراته، كاتبها...) يوقّع السيرفر. الحل حد أقصى للعمق والحجم.`,
          example: R`import { createYoga, createGraphQLError } from "graphql-yoga";
import { maxDepthPlugin } from "@escape.tech/graphql-armor-max-depth";
export function requireUser(ctx: Ctx) {
  if (!ctx.user) throw createGraphQLError("Login required", { extensions: { code: "UNAUTHENTICATED", http: { status: 401 } } });
  return ctx.user;
}
const resolvers = {
  User: {
    email: (user: User, _a: unknown, ctx: Ctx) => (ctx.user?.id === user.id || ctx.user?.role === "admin" ? user.email : null),
  },
  Mutation: {
    deletePost: async (_p: unknown, args: { id: string }, ctx: Ctx) => {
      const me = requireUser(ctx);
      const { count } = await db.post.deleteMany({ where: { id: args.id, ...(me.role === "admin" ? {} : { authorId: me.id }) } });
      if (count === 0) throw createGraphQLError("Post not found", { extensions: { code: "NOT_FOUND" } });
      return true;
    },
  },
};
export const yoga = createYoga({ schema, context, plugins: [maxDepthPlugin({ n: 6 })], graphiql: false });`,
          try: R`اطلب [[{ posts { author { name email } } }]] من غير توكن، وبتوكن الكاتب نفسه، وبتوكن admin: الإيميل يظهر في الحالتين الأخيرتين بس. وبعدين ابعت query عمقه ٧ ([[posts { author { posts { author { posts { author { name } } } } } }]]) وشوف الرد.`,
          flag: "script",
          deep: {
            why: "BOPLA (تاب APIs المستوى ١، درس [[OWASP API Top 10]]) أسهل بكتير في GraphQL: حد يكتشف إن [[author]] بيرجّع [[email]] و [[phone]]، ويلف على كل المنشورات ويجمع بيانات كل الكتّاب. والـ introspection بيوريله كل الحقول الموجودة. والاستعلام العميق هجوم DoS بسطر واحد.",
            how: R`المستخدم بيتعرف مرة في الـ context (من الكوكي أو التوكن)، وكل resolver يقرر بنفسه. [[requireUser]] helper بيرمي لو مش مسجّل. [[createGraphQLError]] بيعمل خطأ بـ [[extensions.code]] العميل يقدر يتعامل معاه (UNAUTHENTICATED يروح لـ login، و FORBIDDEN يعرض رسالة). و [[http.status]] في الـ extensions بيخلي Yoga يرجّع 401 بدل 200.

صلاحية على الحقل ([[User.email]]): الـ resolver بيرجّع null للغريب. ده ليه الحقل في الـ schema [[String]] مش [[String!]]، عشان null مسموح. البديل إنك ترمي error، بس ده بيبوّظ باقي الرد لو الحقل مش بيقبل null.

صلاحية في الـ mutation: شرط الملكية جوه الاستعلام نفسه، زي REST بالظبط (BOLA). والـ admin استثناء واضح.

لو القواعد كترت، فيه مكتبات بتحطها في مكان واحد (graphql-shield)، أو directives في الـ schema زي [[@auth(requires: ADMIN)]]. المهم إنها تبقى على مستوى الحقل والنوع.

حدود الاستعلام: [[maxDepthPlugin]] بيرفض أي query أعمق من الحد قبل التنفيذ. وفيه plugins تانية من نفس المجموعة (GraphQL Armor): حد لعدد الحقول، وحد لعدد الـ aliases (العميل ممكن يطلب نفس الحقل ١٠٠٠ مرة بأسماء مختلفة في طلب واحد)، و cost limit بيدّي كل حقل «تكلفة» ويرفض لو المجموع عدّى. ومع الحدود دي: حد لـ [[first]] في كل قايمة، و rate limit على الـ endpoint، و timeout.

الـ introspection: بيوري الـ schema كلها لأي حد. في API داخلي (الفرونت بتاعك بس) اقفله في الإنتاج. وأقوى حماية هنا persisted queries: السيرفر بيقبل بس queries اتسجلت وقت الـ build، فمحدش يقدر يبعت query مكتوب بإيده.`,
            when: "من أول resolver بيرجّع بيانات مستخدم. والحدود من أول ما الـ endpoint يبقى على الإنترنت.",
            mistakes: R`تحمي [[Query.me]] وتنسى إن نفس الـ User بيوصل من [[post.author]] من غير حماية. والصلاحية في directive على الـ Query بس، والحقول المتداخلة مكشوفة. ورسايل خطأ بتفرّق بين «مش موجود» و «مش بتاعك». و introspection و GraphiQL مفتوحين في الإنتاج. ومفيش أي حد للعمق أو الحجم، أو حد للعمق بس والـ aliases مفتوحة.`
          },
          teach: R`## الفكرة: الحماية على الحقل نفسه، وحد للعمق

في GraphQL مفيش endpoint لكل حاجة تحميه. نفس الـ [[User]] بيوصل من [[me]] ومن [[post.author]] ومن أي علاقة تانية. فالمثال بيحط الصلاحية في الـ resolver بتاع الحقل ([[User.email]])، وشرط الملكية جوه استعلام المسح، و plugin بيرفض أي query أعمق من ٦ قبل ما يتنفّذ.

اتجرّب على ويندوز 11: graphql-yoga 5.24.2 و graphql 16.14.2 و [[@escape.tech/graphql-armor-max-depth]] 2.4.2 على Node 24.19. الـ schema هي بتاعة درس [[schema و resolvers]] ومعاها [[deletePost(id: ID!): Boolean!]]، والـ resolvers زي المثال بالظبط، و [[db]] في الذاكرة بشكل Prisma: ٥٠ منشور، والمنشور رقم n كاتبه [[u((n-1)%10+1)]]، و [[u10]] هو الـ admin. التوكن [[Bearer tok-u9]] يعني «أنا u9». الطلبات اتبعتت لـ [[yoga.fetch]].

---

## ١. الـ imports

~~~ts
import { createYoga, createGraphQLError } from "graphql-yoga";
import { maxDepthPlugin } from "@escape.tech/graphql-armor-max-depth";
~~~

- [[createGraphQLError]]: بيعمل خطأ GraphQL برسالة و [[extensions]] (معلومات زيادة بتوصل للعميل زي ما هي).
- [[maxDepthPlugin]]: من مجموعة GraphQL Armor. بيحسب عمق الـ query ويرفضه لو عدّى الحد.

## ٢. [[requireUser]]

~~~ts
export function requireUser(ctx: Ctx) {
  if (!ctx.user) throw createGraphQLError("Login required", { extensions: { code: "UNAUTHENTICATED", http: { status: 401 } } });
  return ctx.user;
}
~~~

- مش مسجّل؟ ارمي. لو مسجّل رجّعه، فتكتب [[const me = requireUser(ctx)]] في سطر واحد.
- [[extensions.code]]: العميل بيبص عليه مش على الرسالة. [[UNAUTHENTICATED]] = روح لصفحة الـ login.
- [[http: { status: 401 }]]: خاصة بـ Yoga. بتغيّر الـ HTTP status نفسه، وبتتشال من الـ extensions قبل ما الرد يتبعت:

~~~text الناتج (deletePost من غير توكن)
401 {"errors":[{"message":"Login required","locations":[{"line":1,"column":12}],"path":["deletePost"],"extensions":{"code":"UNAUTHENTICATED"}}],"data":null}
~~~

## ٣. صلاحية على الحقل: [[User.email]]

~~~ts
  User: {
    email: (user: User, _a: unknown, ctx: Ctx) => (ctx.user?.id === user.id || ctx.user?.role === "admin" ? user.email : null),
  },
~~~

- [[user]] (الـ parent): المستخدم اللي بنعرضه. [[ctx.user]]: اللي بيسأل.
- [[?.]]: لو [[ctx.user]] null (مش مسجّل)، النتيجة [[undefined]] بدل ما يرمي.
- [[a || b ? x : y]]: لو صاحب الإيميل **أو** admin، رجّع الإيميل، غير كده [[null]].
- الحقل في الـ schema [[email: String]] من غير [[!]]، عشان null مسموح.

ولأنه على نوع [[User]]، بيشتغل في **أي** مكان User يظهر فيه. جربنا [[{ posts(first: 3) { id author { id name email } } }]] (المنشورات ٥٠ و ٤٩ و ٤٨، كتّابهم u10 و u9 و u8):

~~~text الناتج (من غير توكن)
"author":{"id":"u10","name":"User 10","email":null}
"author":{"id":"u9","name":"User 9","email":null}
"author":{"id":"u8","name":"User 8","email":null}
~~~

~~~text الناتج (بتوكن u9)
"author":{"id":"u10","name":"User 10","email":null}
"author":{"id":"u9","name":"User 9","email":"user9@example.com"}
"author":{"id":"u8","name":"User 8","email":null}
~~~

~~~text الناتج (بتوكن u10، الـ admin)
"author":{"id":"u10","name":"User 10","email":"user10@example.com"}
"author":{"id":"u9","name":"User 9","email":"user9@example.com"}
"author":{"id":"u8","name":"User 8","email":"user8@example.com"}
~~~

## ٤. صلاحية في الـ mutation

~~~ts
    deletePost: async (_p: unknown, args: { id: string }, ctx: Ctx) => {
      const me = requireUser(ctx);
      const { count } = await db.post.deleteMany({ where: { id: args.id, ...(me.role === "admin" ? {} : { authorId: me.id }) } });
~~~

السطر التاني من جوه لبرة:

1. [[me.role === "admin" ? {} : { authorId: me.id }]]: الأدمن مالوش شرط زيادة، أي حد تاني شرطه إن المنشور بتاعه.
2. [[...(...)]] (spread): افرد الـ object ده جوه الـ [[where]]. يعني للمستخدم العادي [[where: { id, authorId }]]، وللأدمن [[where: { id }]].
3. [[deleteMany]] بيرجّع [[{ count }]] زي [[updateMany]] في درس OWASP.

~~~ts
      if (count === 0) throw createGraphQLError("Post not found", { extensions: { code: "NOT_FOUND" } });
      return true;
~~~

~~~text الناتج
delete other's post (u2)   200 {"errors":[{"message":"Post not found",...,"extensions":{"code":"NOT_FOUND"}}],"data":null}
delete missing (u2)        200 {"errors":[{"message":"Post not found",...,"extensions":{"code":"NOT_FOUND"}}],"data":null}
delete own post (u1)       200 {"data":{"deletePost":true}}
admin deletes post 2       200 {"data":{"deletePost":true}}
~~~

منشور حد تاني ومنشور مش موجود: **نفس الرد**. ومن غير [[http.status]] الـ status بيفضل 200.

---

## ٥. حد العمق

~~~ts
export const yoga = createYoga({ schema, context, plugins: [maxDepthPlugin({ n: 6 })], graphiql: false });
~~~

- [[plugins]]: إضافات بتشتغل في مراحل الطلب. الـ plugin ده بيشتغل في الـ validation، قبل أي resolver.
- [[n: 6]]: أقصى عمق. كل مستوى حقول جوه [[{ }]] بيزوّد واحد.

~~~text الناتج (عمق ٧: posts > author > posts > author > posts > author > name)
200 {"errors":[{"message":"Syntax Error: Query depth limit of 6 exceeded, found 7."}]}
~~~

ونفس الشكل بعمق ٦ (آخر حقل [[id]] بدل [[author { name }]]) اتنفّذ عادي. لاحظ إن الـ query ده لوحده، بـ [[first: 1]]، رجّع ٢٥ منشور متداخل: كل مستوى بيضرب في اللي قبله، وده ليه العمق خطر.

### اللي الحد ده **مبيمسكوش**

~~~text الناتج (اختبارات زيادة على نفس السيرفر)
introspection   200 {"data":{"__schema":{"queryType":{"fields":[{"name":"posts"},{"name":"me"}]},"mutationType":{"fields":[{"name":"deletePost"}]}}}}
500 aliases     200 response bytes: 288900
~~~

- **introspection** مفتوح: أي حد يقدر يشوف كل الحقول والـ mutations.
- **aliases**: [[a0: posts(first: 50) { id } a1: posts(...) ...]] ٥٠٠ مرة. العمق ٢ بس، فعدّى، والرد ٢٨٩ ألف بايت من طلب واحد. محتاج حد للـ aliases أو cost limit (plugins تانية من GraphQL Armor).

و [[graphiql: false]]: [[GET /graphql]] من المتصفح رجّع [[406]] بدل صفحة GraphiQL.

---

## الخلاصة

| الحتة | بتقفل إيه |
|---|---|
| [[requireUser(ctx)]] + [[http.status 401]] | أي حاجة محتاجة login |
| resolver على [[User.email]] بيرجّع null | BOPLA: الإيميل من أي طريق يوصل للـ User |
| شرط [[authorId]] جوه [[deleteMany]] | BOLA، والأدمن استثناء واضح |
| [[NOT_FOUND]] واحد للحالتين | محدش يعرف إن المنشور موجود |
| [[maxDepthPlugin({ n: 6 })]] | الـ queries العميقة، قبل التنفيذ |
| [[graphiql: false]] | مفيش playground في الإنتاج |

- الصلاحية على **النوع والحقل**، مش على [[Query.me]] بس.
- حد العمق لوحده مش كفاية: aliases و introspection وحد لـ [[first]] و rate limit.`,
          lines: [
            "السيرفر، و helper لأخطاء GraphQL بكود ومعلومات زيادة.",
            "plugin بيرفض الـ queries العميقة (من GraphQL Armor).",
            "helper: لازم يكون مسجّل.",
            "مش مسجّل؟ خطأ بكود UNAUTHENTICATED و HTTP 401.",
            "رجّع المستخدم.",
            "قفلة.",
            "الـ resolvers:",
            "على نوع User، في أي مكان يظهر فيه:",
            "الإيميل لصاحبه أو للأدمن بس، وغير كده null. الحماية على الحقل مش على الـ query.",
            "قفلة.",
            "الكتابة:",
            "مسح منشور:",
            "لازم مسجّل.",
            "امسح بشرط الملكية جوه الاستعلام (الأدمن يمسح أي حاجة).",
            "مش موجود أو مش بتاعه: نفس الرد في الحالتين.",
            "تم.",
            "قفلة.",
            "قفلة.",
            "قفلة.",
            "السيرفر: حد أقصى للعمق ٦، ومن غير GraphiQL في الإنتاج."
          ],
          sol: R`من غير توكن: كل [[email]] بـ [[null]]. بتوكن الكاتب: الإيميل بتاعه بس اللي يظهر، والباقي null. بتوكن admin: كلهم يظهروا.

الـ query العميق بيرجّع من غير أي تنفيذ: [[{"errors":[{"message":"Syntax Error: Query depth limit of 6 exceeded, found 7."}]}]]. لو شفت [[Unexpected error]] بدل الرسالة دي، غالبًا الـ plugin شغال بنسخة graphql مختلفة عن Yoga ([[npm ls graphql]] هيوريك نسختين)، وده اللي حصل معانا مع graphql 17: الـ plugin لسه بيطلب 16.

وجرّب [[deletePost]] على منشور حد تاني بتوكن مستخدم عادي: لازم [[NOT_FOUND]]، مش [[FORBIDDEN]].`
        }
      ]
    }
]);
