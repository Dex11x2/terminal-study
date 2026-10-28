// تكملة تاب apis: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/apis/01.js (شرح حقول الدرس في أوله)
MORE("apis", [
    {
      t: "GraphQL أعمق: operations وأخطاء و pagination وحماية",
      l: 2,
      n: "تكملة لقسم «GraphQL»: variables و fragments، والأخطاء والـ null، و connections بـ cursor، و N+1 متقاس على Postgres، وحدود التكلفة و persisted queries، والمقارنة بـ REST و tRPC",
      items: [
        {
          cmd: "variables و fragments",
          title: "query بـ variables و input و enum و fragment",
          desc: R`الـ query الحقيقي مبيتكتبش فيه القيم: بيبقى ليه اسم ([[query PostPage]])، و variables بنوعها ([[$id: ID!]])، والقيم بتتبعت لوحدها في [[variables]]. السيرفر بيتأكد من الأنواع قبل ما أي resolver يشتغل، والـ query نفسه نص ثابت ينفع يتخزن ويتعمله hash.

وفيه أدوات تانية في نفس اللغة: [[input]] (object كـ argument) و [[enum]] (قيم محددة)، و aliases (نفس الحقل مرتين باسمين)، و fragments (مجموعة حقول بتتكرر)، و [[@include(if:)]] (حقل بشرط).`,
          example: R`const typeDefs = /* GraphQL */ $__bt
  enum PostStatus { DRAFT PUBLISHED }
  type Post { id: ID! title: String! status: PostStatus! author: User! }
  input CreatePostInput { title: String!, status: PostStatus = DRAFT }
  type Query { posts(status: PostStatus): [Post!]!  post(id: ID!): Post }
  type Mutation { createPost(input: CreatePostInput!): Post! }
$__bt;
const PostPage = /* GraphQL */ $__bt
  query PostPage($id: ID!, $withAuthor: Boolean = false) {
    post(id: $id) { ...PostCard author @include(if: $withAuthor) { name } }
    drafts: posts(status: DRAFT) { ...PostCard }
  }
  fragment PostCard on Post { id title status }
$__bt;
const res = await fetch("/graphql", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ query: PostPage, operationName: "PostPage", variables: { id: "10", withAuthor: true } }),
});
const { data, errors } = await res.json();`,
          try: R`اعمل السيرفر ده بـ GraphQL Yoga و arrays في الذاكرة (منشورين وكاتبين)، وابعت [[PostPage]] بـ curl. وبعدين: ابعت [[id: null]]، و mutation بـ [[status: "ARCHIVED"]]، و mutation من غير [[status]] (شوف القيمة الافتراضية)، و query بـ GET، و mutation بـ GET. سجّل الـ status code لكل واحد بـ [[curl -w ' [%{http_code}]']].`,
          flag: "script",
          deep: {
            why: R`لو بتبني الـ query بـ string concatenation ([[$__bt{ post(id: "$__{id}") }$__bt]]) فانت عملت injection بإيدك، وكل query مختلف فمفيش كاش ولا persisted queries ولا إحصائيات لكل operation. والـ variables بتخلي الـ query نص ثابت والقيم بس هي اللي بتتغير، زي prepared statements في SQL بالظبط.`,
            how: R`الـ operation: [[query]] أو [[mutation]] (أو [[subscription]])، وبعدها اسم. الاسم مش إجباري بس مهم: بيظهر في الـ logs والـ tracing، و [[operationName]] بيختار أنهي operation يتنفذ لو المستند فيه أكتر من واحد.

الـ variables: [[$id: ID!]] يعني variable اسمه [[id]] نوعه [[ID]] ومش null. و [[= false]] قيمة افتراضية. السيرفر بيقارن الـ variables بالـ schema **قبل** التنفيذ (validation)، فـ [[null]] لـ [[ID!]] أو [[ARCHIVED]] لـ enum مش فيه القيمة دي بيترفض من غير ما أي resolver يتنادى.

[[input]]: نوع مخصوص للـ arguments بس (مينفعش يبقى نتيجة). بيجمع حقول الـ mutation في object واحد، ويقبل قيم افتراضية ([[status: PostStatus = DRAFT]]). ده أحسن من ١٠ arguments منفصلين لأنك تقدر تضيف حقل اختياري من غير ما تكسر العملاء.

[[enum]]: قيم محددة، بتتكتب من غير quotes جوه الـ query ([[status: DRAFT]]) وكنص في الـ variables ([[{ "status": "DRAFT" }]]).

alias: [[drafts: posts(status: DRAFT)]] بيرجّع نتيجة [[posts]] تحت اسم [[drafts]]. من غيره مينفعش تطلب نفس الحقل مرتين بـ arguments مختلفة.

fragment: [[fragment PostCard on Post { id title status }]] مجموعة حقول على نوع، وبتستخدمها بـ [[...PostCard]]. في React بيبقى كل component معاه الـ fragment بتاعه (الحقول اللي هو محتاجها)، والصفحة بتجمعهم.

[[@include(if: $withAuthor)]]: directive، الحقل بيتطلب لو الشرط true بس. وعكسه [[@skip(if:)]].

GET و POST: الـ queries ينفع تتبعت GET ([[?query=...&variables=...]])، وده بيخليها تتكاش في المتصفح أو CDN. الـ mutations POST بس، والسبب نفسه في REST: GET لازم يبقى safe (تاب APIs المستوى ١، درس «safe و idempotent»).`,
            when: "دايمًا. كل query في الفرونت ليه اسم و variables، ومفيش قيم بتتلزق جوه النص. والأدوات (GraphQL Codegen مثلًا) بتولّد الأنواع في TypeScript من الـ operations دي.",
            mistakes: R`قيم جوه نص الـ query بـ template string. و operations من غير أسماء (الـ logs كلها «anonymous»). و arguments كتير منفصلة بدل [[input]]. وفاكر إن [[status: String]] زي enum (أي نص بيعدّي، والغلطة بتظهر في القاعدة). و mutation بـ GET (Yoga بيرفضها بـ 405، بس سيرفرات تانية ممكن لأ). و fragment واحد ضخم بيستخدمه كل مكان، فبترجع للـ overfetching اللي GraphQL جه يحله.`
          },
          teach: R`## الفكرة: الـ query نص ثابت، والقيم لوحدها

اتجرّب على ويندوز 11: Node 24.22.1 و [[graphql-yoga]] 6.0.1 و [[graphql]] 16.14.2، سيرفر لوحده ([[createServer(yoga)]] على بورت 7501) و arrays في الذاكرة: منشور 10 ([[PUBLISHED]]، كاتبه Mona) ومنشور 11 ([[DRAFT]]، كاتبه Omar). والطلبات بـ curl من Git Bash.

---

## ١. الـ schema

~~~graphql
  enum PostStatus { DRAFT PUBLISHED }
  input CreatePostInput { title: String!, status: PostStatus = DRAFT }
  type Query { posts(status: PostStatus): [Post!]!  post(id: ID!): Post }
~~~

- [[enum PostStatus]]: الحالة واحدة من الاتنين دول بس.
- [[input CreatePostInput]]: argument على شكل object. [[status]] ليه قيمة افتراضية [[DRAFT]].
- [[posts(status: PostStatus)]]: argument اختياري (مفيش [[!]]).
- [[post(id: ID!): Post]]: النتيجة [[Post]] من غير [[!]]، يعني ممكن ترجع null لو مش موجود.

## ٢. الـ operation

~~~graphql
  query PostPage($id: ID!, $withAuthor: Boolean = false) {
~~~

- [[query]]: قراية. [[PostPage]]: الاسم.
- [[$id: ID!]]: لازم يتبعت ومش null. [[$withAuthor: Boolean = false]]: اختياري.

~~~graphql
    post(id: $id) { ...PostCard author @include(if: $withAuthor) { name } }
    drafts: posts(status: DRAFT) { ...PostCard }
  }
  fragment PostCard on Post { id title status }
~~~

- [[post(id: $id)]]: الـ variable بيتحط مكان القيمة.
- [[...PostCard]]: «حط هنا حقول الـ fragment» (التلات نقط اسمها spread، زي JavaScript).
- [[author @include(if: $withAuthor)]]: الكاتب يتطلب لو [[withAuthor]] بـ true بس.
- [[drafts:]]: alias، النتيجة هتيجي تحت [[drafts]] مش [[posts]].
- [[status: DRAFT]]: قيمة enum من غير quotes.

## ٣. الطلب

~~~ts
  body: JSON.stringify({ query: PostPage, operationName: "PostPage", variables: { id: "10", withAuthor: true } }),
~~~

تلات حاجات: النص، واسم الـ operation، والقيم. ونفس الكلام بـ curl (الـ JSON في ملف [[q1.json]]):

~~~bash
curl -s localhost:7501/graphql -H 'content-type: application/json' --data @q1.json
~~~

~~~text الناتج
{"data":{"post":{"id":"10","title":"Hello GraphQL","status":"PUBLISHED","author":{"name":"Mona"}},"drafts":[{"id":"11","title":"Draft notes","status":"DRAFT"}]}}
~~~

الرد نفس شكل الـ query: [[post]] بحقول الـ fragment ومعاه [[author]] (لأن [[withAuthor]] true)، و [[drafts]] باسم الـ alias. ولو بعتنا [[withAuthor: false]]، [[author]] مش هيظهر خالص (مش null: مش موجود).

---

## ٤. الـ validation قبل التنفيذ

| الطلب | الرد | الـ status |
|---|---|---|
| [[variables: { id: null }]] | [[Variable "$id" of non-null type "ID!" must not be null.]] | 400 |
| [[status: "ARCHIVED"]] | [[Value "ARCHIVED" does not exist in "PostStatus" enum.]] | 400 |
| [[{ posts { price } }]] | [[Cannot query field "price" on type "Post".]] كود [[GRAPHQL_VALIDATION_FAILED]] | 200 |
| نفس اللي فوق ومعاه [[accept: application/graphql-response+json]] | نفس الرسالة | 400 |

ولا resolver اتنادى في أي واحد فيهم. ولاحظ السطرين الأخيرين: الـ status بيتغير حسب الـ [[accept]] header. ده من spec اسمه «GraphQL over HTTP»: مع [[application/graphql-response+json]] الطلب اللي مش valid بياخد 4xx. ومع [[application/json]] القديم، Yoga بيرد 200 (عشان عملاء قدام كانوا بيعتبروا أي حاجة غير 200 فشل في الشبكة). أخطاء الـ variables طلعت 400 في الحالتين.

## ٥. الـ mutation والقيمة الافتراضية

~~~text الناتج
{"data":{"createPost":{"id":"12","title":"Cursor pagination","status":"DRAFT"}}}
~~~

بعتنا [[title]] بس، و [[status]] اتحط [[DRAFT]] من الـ [[input]].

## ٦. GET و POST

~~~bash
curl -s -i -G localhost:7501/graphql --data-urlencode 'query={ posts { id } }'
curl -s -i -G localhost:7501/graphql --data-urlencode 'query=mutation { createPost(input:{title:"via GET"}) { id } }'
~~~

- [[-G]]: ابعت البيانات في الـ URL كـ GET. [[--data-urlencode]]: اعمل encoding للمسافات والأقواس.

~~~text الناتج
HTTP/1.1 200 OK
{"data":{"posts":[{"id":"10"},{"id":"11"},{"id":"12"}]}}

HTTP/1.1 405 Method Not Allowed
Allow: POST
{"errors":[{"message":"Can only perform a mutation operation from a POST request.","extensions":{"code":"BAD_REQUEST"}}]}
~~~

الـ query بـ GET اشتغل، والـ mutation اترفض بـ 405 و [[Allow: POST]].

---

## الخلاصة

| الأداة | بتعمل إيه |
|---|---|
| [[query Name($v: Type!)]] | operation باسم و variables بأنواع |
| [[variables]] في الـ JSON | القيم لوحدها، والنص ثابت |
| [[input]] | object كـ argument، بقيم افتراضية |
| [[enum]] | قيم محددة، والغلط يترفض قبل التنفيذ |
| [[alias:]] | نفس الحقل مرتين باسمين |
| [[fragment X on T]] + [[...X]] | حقول بتتكرر في مكان واحد |
| [[@include(if:)]] و [[@skip(if:)]] | حقل بشرط |

- queries بـ GET تنفع تتكاش، و mutations بـ POST بس.
- [[application/graphql-response+json]] بيخلي الطلب الغلط يرجع 4xx بدل 200.`,
          lines: [
            "الـ schema:",
            "enum: الحالة واحدة من الاتنين.",
            "المنشور وحالته وكاتبه.",
            "input للـ mutation، و status افتراضيها DRAFT.",
            "قايمة منشورات بفلتر اختياري، ومنشور واحد ممكن يبقى null.",
            "mutation بياخد input.",
            "قفلة الـ schema.",
            "الـ operation كنص ثابت:",
            "query باسم، و variable إجباري وواحد اختياري.",
            "منشور بالـ id، بحقول الـ fragment، والكاتب لو withAuthor بـ true.",
            "نفس حقل posts تاني باسم drafts (alias).",
            "قفلة الـ query.",
            "fragment: الحقول اللي بتتكرر.",
            "قفلة النص.",
            "ابعت للـ endpoint:",
            "POST.",
            "الـ body JSON.",
            "النص، واسم الـ operation، والقيم لوحدها.",
            "قفلة.",
            "الرد: data أو errors أو الاتنين."
          ],
          sol: R`اتجرّب على ويندوز 11 بـ graphql-yoga 6.0.1 و graphql 16.14.2:

- [[PostPage]]: [[{"data":{"post":{"id":"10","title":"Hello GraphQL","status":"PUBLISHED","author":{"name":"Mona"}},"drafts":[{"id":"11",...,"status":"DRAFT"}]}}]].
- [[id: null]]: 400، [[must not be null]].
- [[ARCHIVED]]: 400، [[does not exist in "PostStatus" enum]].
- mutation من غير status: [[{"status":"DRAFT"}]] (القيمة الافتراضية).
- query بـ GET: 200. mutation بـ GET: 405 و [[Allow: POST]].`,
          solCode: R`curl -s -w ' [%{http_code}]' localhost:7501/graphql -H 'content-type: application/json' \
  -d '{"query":"query($id: ID!){ post(id:$id){ title } }","variables":{"id":null}}'
# {"errors":[{"message":"Variable \"$id\" of non-null type \"ID!\" must not be null.",...}]} [400]
curl -s -i -G localhost:7501/graphql --data-urlencode 'query=mutation { createPost(input:{title:"via GET"}) { id } }'
# HTTP/1.1 405 Method Not Allowed`
        },
        {
          cmd: "أخطاء GraphQL و null",
          title: "رد فيه data و errors مع بعض، والـ null بيطلع لفوق",
          desc: R`في GraphQL الرد ممكن يبقى نصه ناجح ونصه فاشل: [[data]] فيها اللي اتجاب، و [[errors]] فيها كل خطأ ومعاه [[path]] (مكانه بالظبط). الحقل اللي وقع بيبقى [[null]]، ولو نوعه مش بيقبل null ([[User!]])، الـ null بيطلع للأب، ولو الأب كمان [[!]] يطلع للي فوقه، لحد ما يلاقي حاجة تقبل null، أو [[data]] كلها تبقى [[null]].

وفيه نوعين أخطاء: غير متوقعة (القاعدة وقعت) دي Yoga بيخبي رسالتها ([[Unexpected error.]])، ومتوقعة من الـ business (عنوان قصير) دي الأحسن ترجع كـ نوع في الـ schema ([[union]])، مش في [[errors]].`,
          example: R`import { GraphQLError } from "graphql";
const typeDefs = /* GraphQL */ $__bt
  type Post { id: ID! title: String! author: User! authorOrNull: User views: Int! }
  type Query { posts: [Post!]!  postsSafe: [Post]! }
  type ValidationError { field: String! message: String! }
  type CreatePostSuccess { post: Post! }
  union CreatePostResult = CreatePostSuccess | ValidationError
  type Mutation { createPost(title: String!): CreatePostResult! }
$__bt;
const authorOf = (p: Post) => {
  const u = users.get(p.authorId);
  if (!u) throw new GraphQLError($__btauthor $__{p.authorId} not found$__bt, { extensions: { code: "NOT_FOUND" } });
  return u;
};
const resolvers = {
  Post: {
    author: authorOf,
    authorOrNull: authorOf,
    views: () => { throw new Error("connect ECONNREFUSED 10.0.0.5:6379"); },
  },
  CreatePostResult: { __resolveType: (r: object) => ("post" in r ? "CreatePostSuccess" : "ValidationError") },
  Mutation: {
    createPost: (_: unknown, { title }: { title: string }) =>
      title.length < 3 ? { field: "title", message: "at least 3 characters" } : { post: savePost(title) },
  },
};
const yoga = createYoga({ schema: createSchema({ typeDefs, resolvers }), maskedErrors: true });`,
          try: R`حط منشورين، واحد منهم كاتبه مش موجود ([[authorId: "99"]]). اطلب [[{ posts { title authorOrNull { name } } }]]، وبعدين [[author]] بدل [[authorOrNull]]، وبعدين [[postsSafe]] بـ [[author]]. قارن [[data]] في التلاتة. واطلب [[views]] وشوف الرسالة اللي وصلت للعميل واللي اتسجلت في الـ log. وآخر حاجة ابعت [[createPost(title: "ab")]] واطلب [[__typename]].`,
          flag: "script",
          deep: {
            why: R`في REST الـ endpoint يا نجح يا فشل. في GraphQL query واحد ممكن يجمع ١٠ حاجات من ٥ مصادر، ولو واحدة وقعت مش عايز الصفحة كلها تقع. بس لو مفهمتش الـ null propagation، حقل واحد [[!]] في مكان غلط يخلي خطأ صغير (صورة الكاتب) يمسح الصفحة كلها ([[data: null]]).

وأخطاء القاعدة والـ stack traces فيها IPs وأسماء جداول وأحيانًا باسوردات. لو طلعت للعميل، ده تسريب معلومات.`,
            how: R`الـ null propagation: لما resolver يرمي، GraphQL بيحط [[null]] مكان الحقل ويضيف خطأ في [[errors]] بالـ [[path]] (زي [[path: ["posts", 1, "author"] ]]: الحقل [[author]] في العنصر رقم ١ في [[posts]]). لو نوع الحقل [[User!]]، مينفعش null، فالأب ([[Post]] رقم ١) يبقى null. لو العنصر نفسه [[Post!]] جوه [[[Post!]!]]، القايمة كلها null، وهي كمان [[!]]، فـ [[data]] كلها null. القاعدة: الـ null بيطلع لحد أول مكان بيقبله.

فالقرار في الـ schema: [[!]] على الحاجات اللي مستحيل تبقى null فعلًا (id، title)، ومن غيره على العلاقات اللي ممكن تفشل لوحدها (حاجة جاية من service تاني). و [[[Post]!]] (القايمة موجودة، والعناصر ممكن null) بتخلي عنصر واحد يقع من غير ما القايمة كلها تقع.

الـ masking: Yoga افتراضيًا ([[maskedErrors: true]]) بيحوّل أي error مش [[GraphQLError]] لـ [[Unexpected error.]] بكود [[INTERNAL_SERVER_ERROR]]، والرسالة الأصلية بتروح الـ log بس. ولو رميت [[GraphQLError]] بنفسك، رسالته و [[extensions]] بتوصل للعميل كما هي. ملحوظة: Yoga 6 مبقاش بيصدّر [[createGraphQLError]]، فاستخدم [[new GraphQLError()]] من مكتبة [[graphql]].

[[extensions.code]]: الفرونت بيقرر بالكود مش بالرسالة ([[UNAUTHENTICATED]] يروح لـ login، و [[NOT_FOUND]] يعرض صفحة 404).

الأخطاء المتوقعة كنوع: [[union CreatePostResult = CreatePostSuccess | ValidationError]]. الـ mutation دايمًا بيرجع حاجة، والعميل بيسأل [[__typename]] ويستخدم [[... on ValidationError]] (inline fragment: الحقول دي لو النوع ده). الميزة: الخطأ ليه شكل في الـ schema (field و message)، والأدوات بتولّد أنواع ليه، والعميل مجبر يتعامل معاه. و [[__resolveType]] بيقول لـ GraphQL الـ object ده من أنهي نوع.`,
            when: R`[[GraphQLError]] بـ [[code]] للحاجات اللي مش جزء من الـ business (مش مسجّل، مش لاقي، rate limit). و [[union]] لنتايج الـ mutations اللي اليوزر ممكن يغلط فيها (validation، رصيد مش كفاية، اسم متاخد). والـ masking سيبه شغال دايمًا.`,
            mistakes: R`[[!]] على كل حاجة «عشان الأنواع في TypeScript تبقى أنضف»، وأول خطأ في حقل فرعي يمسح الصفحة. و [[maskedErrors: false]] في الإنتاج. والفرونت بيفحص [[errors]] بس ويتجاهل [[data]] الجزئية (أو العكس: بيعرض [[data]] ومش واخد باله إن فيه null بسبب خطأ). وتعتمد على نص الرسالة بدل [[extensions.code]]. و validation errors في [[errors]] من غير [[field]]، فالفورم ميعرفش يعلّم أنهي خانة.`
          },
          teach: R`## الفكرة: كل حقل بيفشل لوحده، والـ [[!]] بيقرر الخسارة قد إيه

اتجرّب على ويندوز 11: Node 24.22.1 و graphql-yoga 6.0.1 و graphql 16.14.2. منشورين: [[1]] كاتبه Mona موجود، و [[2]] ([[orphan]]) كاتبه [[99]] مش موجود. وكل الطلبات بـ curl.

---

## ١. الـ schema وأنواع الـ null

~~~graphql
  type Post { id: ID! title: String! author: User! authorOrNull: User views: Int! }
  type Query { posts: [Post!]!  postsSafe: [Post]! }
~~~

| الحقل | يقبل null؟ |
|---|---|
| [[author: User!]] | لأ |
| [[authorOrNull: User]] | أيوه |
| [[posts: [Post!]!]] | القايمة لأ، وكل عنصر لأ |
| [[postsSafe: [Post]!]] | القايمة لأ، بس العنصر أيوه |

[[authorOf]] بيرمي [[GraphQLError]] بكود [[NOT_FOUND]] لو الكاتب مش موجود، والاتنين [[author]] و [[authorOrNull]] بيستخدموه.

## ٢. حقل بيقبل null

~~~text { posts { title authorOrNull { name } } }
{"errors":[{"message":"author 99 not found","locations":[{"line":1,"column":17}],"path":["posts",1,"authorOrNull"],"extensions":{"code":"NOT_FOUND"}}],
 "data":{"posts":[{"title":"ok","authorOrNull":{"name":"Mona"}},{"title":"orphan","authorOrNull":null}]}}
~~~

- [[path]]: [[posts]] ← العنصر رقم [[1]] (العد من صفر، يعني التاني) ← [[authorOrNull]].
- [[locations]]: السطر والعمود في نص الـ query.
- الخسارة: حقل واحد بقى null، والباقي كله وصل.

## ٣. نفس الخطأ بس الحقل [[!]]

~~~text { posts { title author { name } } }
{"errors":[{"message":"author 99 not found",...,"path":["posts",1,"author"],...}],"data":null}
~~~

[[author]] مينفعش null ← المنشور [[1]] null ← بس [[Post!]] مينفعش ← القايمة null ← بس [[!]] برضه ← [[data: null]]. خطأ في كاتب منشور واحد مسح المنشور الكويس كمان.

## ٤. قايمة عناصرها بتقبل null

~~~text { postsSafe { title author { name } } }
{"errors":[{...,"path":["postsSafe",1,"author"],...}],"data":{"postsSafe":[{"title":"ok","author":{"name":"Mona"}},null]}}
~~~

الـ null وقف عند العنصر: [[[Post]!]] بيقبل عنصر null. المنشور الأول وصل.

---

## ٥. الـ masking

~~~ts
    views: () => { throw new Error("connect ECONNREFUSED 10.0.0.5:6379"); },
~~~

في التجربة رسالة الـ error كان فيها كمان [[password=devpass]]، عشان نشوف هتطلع ولا لأ:

~~~text اللي وصل للعميل
{"errors":[{"message":"Unexpected error.","locations":[{"line":1,"column":11}],"path":["posts",0,"views"],"extensions":{"code":"INTERNAL_SERVER_ERROR"}}],"data":null}
~~~

~~~text اللي اتسجل في الـ log (Yoga بـ logging مفتوح)
ERR
  requestId: "3e65ca39-..."
  err: {
    message: "connect ECONNREFUSED 10.0.0.5:6379 (redis password=devpass)"
~~~

العميل شاف [[Unexpected error.]] بس، والتفاصيل في الـ log ومعاها [[requestId]] تربط بيه شكوى اليوزر بالسطر ده. و [[data: null]] هنا لأن [[views: Int!]] جوه [[[Post!]!]]، نفس سلسلة الـ null اللي فوق.

---

## ٦. الأخطاء المتوقعة كنوع: [[union]]

~~~graphql
  type ValidationError { field: String! message: String! }
  type CreatePostSuccess { post: Post! }
  union CreatePostResult = CreatePostSuccess | ValidationError
~~~

[[union]]: النتيجة يا ده يا ده. و [[__resolveType]] بيقرر:

~~~ts
  CreatePostResult: { __resolveType: (r: object) => ("post" in r ? "CreatePostSuccess" : "ValidationError") },
~~~

[[("post" in r)]]: الـ object فيه حقل [[post]]؟ يبقى نجاح.

والطلب:

~~~graphql
mutation {
  createPost(title: "ab") {
    __typename
    ... on CreatePostSuccess { post { id } }
    ... on ValidationError { field message }
  }
}
~~~

- [[__typename]]: حقل موجود في كل نوع، بيرجّع اسم النوع.
- [[... on X { }]]: inline fragment: الحقول دي لو النتيجة من النوع ده.

~~~text الناتج
title "Hello": {"data":{"createPost":{"__typename":"CreatePostSuccess","post":{"id":"3","title":"Hello"}}}}
title "ab":    {"data":{"createPost":{"__typename":"ValidationError","field":"title","message":"at least 3 characters"}}}
~~~

مفيش [[errors]] خالص: الـ validation جزء عادي من الرد، والفورم يعرف أنهي خانة من [[field]].

---

## الخلاصة

| الحالة | الطريقة |
|---|---|
| حقل ممكن يفشل لوحده | من غير [[!]] |
| قايمة ومش عايز عنصر واحد يوقعها | [[[T]!]] |
| مش مسجّل، مش موجود | [[GraphQLError]] + [[extensions.code]] |
| validation و business errors | [[union]] + [[__typename]] |
| خطأ مش متوقع | سيبه للـ masking، وشوفه في الـ log |

- الـ null بيطلع لحد أول مكان بيقبله، و [[!]] زيادة ممكن تخليه يوصل لـ [[data: null]].
- [[path]] بيقولك الخطأ فين بالظبط، و [[code]] بيقول للفرونت يعمل إيه.`,
          lines: [
            "الخطأ الرسمي اللي رسالته بتوصل للعميل.",
            "الـ schema:",
            "منشور: author مش بيقبل null، و authorOrNull بيقبل، و views رقم إجباري.",
            "قايمة عناصرها إجبارية، وقايمة عناصرها ممكن null.",
            "نوع لخطأ validation.",
            "نوع للنجاح.",
            "النتيجة يا ده يا ده.",
            "الـ mutation بيرجّع الـ union دايمًا.",
            "قفلة الـ schema.",
            "هات الكاتب:",
            "دوّر عليه.",
            "مش موجود: خطأ بكود NOT_FOUND يوصل للعميل.",
            "رجّعه.",
            "قفلة.",
            "الـ resolvers:",
            "حقول المنشور:",
            "الكاتب (لو فشل، الـ null يطلع للأب).",
            "نفس الدالة، بس الحقل بيقبل null.",
            "خطأ مش متوقع: Yoga هيخبي رسالته.",
            "قفلة.",
            "النتيجة من أنهي نوع: فيها post يبقى نجاح.",
            "الـ mutations:",
            "إنشاء منشور:",
            "عنوان قصير: رجّع ValidationError كبيانات، غير كده النجاح.",
            "قفلة.",
            "قفلة.",
            "السيرفر، والـ masking شغال (ده الافتراضي)."
          ],
          sol: R`اتجرّب على ويندوز 11 (graphql-yoga 6.0.1):

- [[authorOrNull]]: [[data.posts[1].authorOrNull = null]]، وخطأ [[path]] بتاعه [[posts › 1 › authorOrNull]].
- [[author]]: [[data: null]] كلها، نفس الخطأ.
- [[postsSafe]] بـ [[author]]: العنصر الأول وصل والتاني [[null]].
- [[views]]: العميل شاف [[Unexpected error.]] و [[INTERNAL_SERVER_ERROR]] بس، والـ log فيه الرسالة الأصلية.
- [[createPost(title: "ab")]]: [[{"__typename":"ValidationError","field":"title","message":"at least 3 characters"}]] من غير [[errors]].`,
          solCode: R`curl -s localhost:7502/graphql -H 'content-type: application/json' \
  -d '{"query":"{ posts { title author { name } } }"}'
# {"errors":[{"message":"author 99 not found",...,"path":["posts",1,"author"],"extensions":{"code":"NOT_FOUND"}}],"data":null}`
        },
        {
          cmd: "connections و cursors",
          title: "pagination بشكل Connection: edges و pageInfo و after",
          desc: R`الشكل المتعارف عليه للقوايم في GraphQL اسمه Connection (من Relay): بدل ما [[posts]] ترجّع array، بترجّع [[edges]] (كل عنصر [[node]] ومعاه [[cursor]] بتاعه) و [[pageInfo]] فيها [[hasNextPage]] و [[endCursor]]. الصفحة الجاية: [[posts(first: 10, after: endCursor)]].

جوه السيرفر ده نفس الـ keyset pagination بتاع REST (درس «cursor pagination»): الـ cursor بيشاور على آخر صف، والاستعلام [[WHERE id < $1 ORDER BY id DESC LIMIT first + 1]]. الصف الزيادة بيقولك فيه صفحة جاية ولا لأ.`,
          example: R`const typeDefs = /* GraphQL */ $__bt
  type PostEdge { cursor: String! node: Post! }
  type PageInfo { hasNextPage: Boolean! endCursor: String }
  type PostConnection { edges: [PostEdge!]! pageInfo: PageInfo! }
  type Query { posts(first: Int = 10, after: String): PostConnection! }
$__bt;
const encode = (id: number) => Buffer.from(JSON.stringify({ id })).toString("base64url");
function decode(cursor: string): number {
  try { const { id } = JSON.parse(Buffer.from(cursor, "base64url").toString()); if (Number.isInteger(id)) return id; } catch {}
  throw new GraphQLError("invalid cursor", { extensions: { code: "BAD_USER_INPUT" } });
}
const resolvers = {
  Query: {
    posts: async (_: unknown, { first, after }: { first: number; after?: string }) => {
      if (first < 1 || first > 50) throw new GraphQLError("first must be 1..50", { extensions: { code: "BAD_USER_INPUT" } });
      const afterId = after ? decode(after) : null;
      const { rows } = await pool.query(
        "select id, title from posts where status = 'PUBLISHED' and ($1::int is null or id < $1) order by id desc limit $2",
        [afterId, first + 1]);
      const page = rows.slice(0, first);
      const edges = page.map((p) => ({ cursor: encode(p.id), node: p }));
      return { edges, pageInfo: { hasNextPage: rows.length > first, endCursor: edges.at(-1)?.cursor ?? null } };
    },
  },
};`,
          try: R`شغّل Postgres في Docker، واعمل جدول [[posts]] فيه ١٠٠٠ صف (كل عاشر واحد [[DRAFT]]). اطلب [[posts(first: 3)]]، وخد [[endCursor]] واطلب الصفحة اللي بعدها. فك الـ cursor بـ [[Buffer.from(c, "base64url").toString()]] وشوف جواه إيه. وبعدين ابعت [[after: "abc"]] و [[first: 500]]، وشغّل [[EXPLAIN ANALYZE]] على الاستعلام.`,
          flag: "script",
          deep: {
            why: R`لو [[posts(offset: 1000, limit: 10)]]: القاعدة بتعدّي ١٠٠٠ صف وترميهم في كل صفحة، ولو حد أضاف منشور وانت بتقلّب، هتشوف عنصر مرتين أو تفوّت عنصر (درس «offset pagination»). والـ Connection شكل واحد كل القوايم في الـ API بتمشي عليه، والمكتبات (Relay و Apollo Client و urql) فاهماه وبتعمل «load more» لوحدها.`,
            how: R`الـ cursor «opaque»: العميل مش المفروض يفهم جواه إيه، بس يرجّعه زي ما هو. هنا JSON صغير ([[{"id":997}]]) معمول له base64url (base64 من غير [[+]] و [[/]] و [[=]]، فينفع في URL). ده **مش** تشفير: أي حد يقدر يفكه ويغيّره، عشان كده [[decode]] بيتأكد إنه رقم صحيح، وأي حاجة تانية ← [[BAD_USER_INPUT]]. ولو مش عايز العميل يعدّل فيه، اعمله HMAC.

[[first + 1]]: بتطلب صف زيادة. لو رجع، يبقى فيه صفحة جاية ([[hasNextPage: true]])، وبتشيله قبل ما ترجّع. ده أرخص من [[count(*)]].

[[$1::int is null or id < $1]]: نفس الاستعلام للصفحة الأولى ([[after]] مش موجود، [[$1]] بـ null) والصفحات التانية. [[::int]] بيقول لـ Postgres نوع الـ parameter، عشان من غيرها مش هيعرف نوع null.

الترتيب لازم يبقى على حاجة فريدة. هنا [[id]]. لو بترتب بـ [[created_at]]، اتنين ممكن يبقوا نفس الوقت، فالـ cursor يبقى [[(created_at, id)]] والشرط [[(created_at, id) < ($1, $2)]] (row comparison في Postgres)، و index على العمودين.

الـ index: [[EXPLAIN]] بيوري [[Index Scan Backward using posts_pkey]]: Postgres بيمشي على الـ primary key من الآخر، ويقف بعد ما يلاقي ٤ صفوف. مش بيقرا الجدول كله، فالصفحة رقم ١ زي الصفحة رقم ١٠٠ في السرعة.

Relay spec فيه كمان [[last]] و [[before]] (رجوع لورا) و [[hasPreviousPage]] و [[startCursor]]. ضيفهم لو الواجهة محتاجاهم بس. و [[totalCount]] حقل منفصل اختياري، لأن [[count(*)]] على جدول كبير غالي، فيتحسب بس لو العميل طلبه (resolver لوحده على [[PostConnection]]).`,
            when: "أي قايمة ممكن تكبر (منشورات، تعليقات، طلبات، إشعارات) في GraphQL API. القوايم الصغيرة الثابتة (تصنيفات، أدوار) array عادي كفاية.",
            mistakes: R`[[first]] من غير حد أقصى (حد يطلب مليون). و cursor فيه offset ([[{"offset":1000}]]): نفس مشاكل offset بشكل تاني. وترتيب على عمود مش فريد من غير tiebreaker، فعناصر بتتكرر أو تضيع بين الصفحات. و [[count(*)]] في كل طلب عشان [[hasNextPage]]. وتفك الـ cursor من غير validation (crash أو SQL غريب). وتنسى إن الفلتر ([[status]]) لازم يبقى نفسه في كل الصفحات.`
          },
          teach: R`## الفكرة: قايمة + مكانك فيها

العميل بيطلب «أول ٣»، وياخد معاهم «علامة» عند آخر واحد. المرة الجاية بيقول «٣ بعد العلامة دي». العلامة هي الـ cursor.

اتجرّب على ويندوز 11: Node 24.22.1 و graphql-yoga 6.0.1 و pg 8.23.1، و Postgres 16.13 في container ([[postgres:16-alpine]]). جدول [[posts]] فيه ١٠٠٠ صف: [[id]] من ١ لـ ١٠٠٠، وكل رقم بيقبل القسمة على ١٠ [[DRAFT]] والباقي [[PUBLISHED]].

---

## ١. أنواع الـ Connection

~~~graphql
  type PostEdge { cursor: String! node: Post! }
  type PageInfo { hasNextPage: Boolean! endCursor: String }
  type PostConnection { edges: [PostEdge!]! pageInfo: PageInfo! }
  type Query { posts(first: Int = 10, after: String): PostConnection! }
~~~

- [[edge]]: «حافة» بتوصل للعنصر: [[node]] (العنصر نفسه) و [[cursor]] (مكانه).
- [[endCursor: String]] من غير [[!]]: لو الصفحة فاضية مفيش آخر عنصر.
- [[first]] و [[after]]: الأسماء دي من Relay spec، والمكتبات مستنياها بالظبط.

## ٢. الـ cursor

~~~ts
const encode = (id: number) => Buffer.from(JSON.stringify({ id })).toString("base64url");
~~~

[[{id: 997}]] ← نص [[{"id":997}]] ← بايتات ([[Buffer.from]]) ← base64url:

~~~text الناتج
cursor: eyJpZCI6OTk3fQ   decoded: {"id":997}
~~~

~~~ts
function decode(cursor: string): number {
  try { const { id } = JSON.parse(Buffer.from(cursor, "base64url").toString()); if (Number.isInteger(id)) return id; } catch {}
  throw new GraphQLError("invalid cursor", { extensions: { code: "BAD_USER_INPUT" } });
}
~~~

- العكس: base64url ← بايتات ← نص ← JSON ← [[{ id }]] (destructuring: خد الحقل [[id]]).
- [[Number.isInteger(id)]]: لازم رقم صحيح، مش نص ولا [[1.5]].
- [[catch {}]]: الـ JSON بايظ؟ متعملش حاجة وكمّل للسطر اللي بعده: الـ throw.

## ٣. الـ resolver

~~~ts
      if (first < 1 || first > 50) throw new GraphQLError("first must be 1..50", { extensions: { code: "BAD_USER_INPUT" } });
      const afterId = after ? decode(after) : null;
~~~

حد للحجم، وبعدين: فيه [[after]]؟ فكّه. مفيش؟ [[null]] (الصفحة الأولى).

~~~sql
select id, title from posts
where status = 'PUBLISHED' and ($1::int is null or id < $1)
order by id desc limit $2
~~~

- [[$1]] = [[afterId]]، و [[$2]] = [[first + 1]].
- [[id < $1]]: اللي بعد الـ cursor (أصغر، لأن الترتيب تنازلي).

~~~ts
      const page = rows.slice(0, first);
      const edges = page.map((p) => ({ cursor: encode(p.id), node: p }));
      return { edges, pageInfo: { hasNextPage: rows.length > first, endCursor: edges.at(-1)?.cursor ?? null } };
~~~

- [[slice(0, first)]]: شيل الصف الزيادة.
- [[rows.length > first]]: الصف الزيادة رجع؟ يبقى فيه صفحة جاية.
- [[edges.at(-1)]]: آخر عنصر ([[-1]] = من الآخر). [[?.cursor ?? null]]: لو مفيش عناصر، null.

---

## ٤. التجربة

~~~graphql
query Feed($first: Int, $after: String) {
  posts(first: $first, after: $after) { edges { cursor node { id title } } pageInfo { hasNextPage endCursor } }
}
~~~

~~~text الصفحة الأولى (first: 3)
{"data":{"posts":{"edges":[{"cursor":"eyJpZCI6OTk5fQ","node":{"id":"999","title":"post 999"}},
  {"cursor":"eyJpZCI6OTk4fQ","node":{"id":"998",...}},{"cursor":"eyJpZCI6OTk3fQ","node":{"id":"997",...}}],
  "pageInfo":{"hasNextPage":true,"endCursor":"eyJpZCI6OTk3fQ"}}}}
~~~

بدأت من 999 مش 1000، لأن 1000 [[DRAFT]].

~~~text الصفحة التانية (after: eyJpZCI6OTk3fQ)
page2 ids 996,995,994 {"hasNextPage":true,"endCursor":"eyJpZCI6OTk0fQ"}
~~~

~~~text آخر صفحة (after = cursor لـ id 4)
["3","2","1"] {"hasNextPage":false,"endCursor":"eyJpZCI6MX0"}
~~~

[[hasNextPage: false]]: طلبنا ٤ ورجع ٣ بس.

~~~text cursor بايظ، و first كبير
{"errors":[{"message":"invalid cursor",...,"path":["posts"],"extensions":{"code":"BAD_USER_INPUT"}}],"data":null}
{"errors":[{"message":"first must be 1..50",...,"extensions":{"code":"BAD_USER_INPUT"}}],"data":null}
~~~

## ٥. القاعدة بتعمل إيه

~~~text EXPLAIN ANALYZE ... where status = 'PUBLISHED' and id < 500 order by id desc limit 4
Limit  (cost=0.28..0.54 rows=4 width=12) (actual time=0.026..0.027 rows=4 loops=1)
  ->  Index Scan Backward using posts_pkey on posts  (cost=0.28..30.25 rows=449 width=12) (actual time=0.024..0.026 rows=4 loops=1)
        Index Cond: (id < 500)
        Filter: (status = 'PUBLISHED'::text)
Execution Time: 0.067 ms
~~~

- [[Index Scan Backward using posts_pkey]]: ماشي على الـ primary key من الكبير للصغير.
- [[Index Cond: (id < 500)]]: بيبدأ من عند الـ cursor على طول.
- [[rows=4]] و [[0.067 ms]]: قرا ٤ صفوف بس ووقف. ونفس الكلام لو الـ cursor عند 5 أو عند 999.

> جربنا نفس الجدول في container جديد ونفّذنا [[EXPLAIN]] على طول بعد الـ [[INSERT]]: طلع [[Seq Scan on posts]] و [[Sort]] (قرا ٤٥٠ صف ورتّبهم)، لأن Postgres لسه معندوش إحصائيات عن الجدول. بعد [[ANALYZE posts]] رجع [[Index Scan Backward]]. فبعد ما تملا جدول تجربة، اعمل [[ANALYZE]] قبل ما تحكم على الـ plan.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[edges { cursor node }]] + [[pageInfo]] | الشكل اللي المكتبات فاهماه |
| cursor = base64url لـ [[{"id":...}]] | العميل يرجّعه زي ما هو |
| [[decode]] بـ validation | الـ cursor مش سر وممكن يتلعب فيه |
| [[limit first + 1]] | [[hasNextPage]] من غير [[count(*)]] |
| [[id < $1]] على index | كل صفحة نفس السرعة |
| حد لـ [[first]] | محدش يطلب مليون |`,
          lines: [
            "أنواع الـ Connection:",
            "حافة: الـ cursor والعنصر.",
            "فيه صفحة جاية؟ وآخر cursor.",
            "الصفحة: الحواف ومعلومات الصفحة.",
            "القايمة بقت Connection وبتاخد first و after.",
            "قفلة الـ schema.",
            "الـ cursor: JSON صغير فيه الـ id معمول له base64url.",
            "فك الـ cursor:",
            "حاول تفكه، ولو طلع رقم صحيح رجّعه.",
            "غير كده: خطأ BAD_USER_INPUT.",
            "قفلة.",
            "الـ resolvers:",
            "الـ queries:",
            "القايمة:",
            "حد للحجم.",
            "فيه after؟ فكّه، مفيش يبقى الصفحة الأولى.",
            "الاستعلام:",
            "اللي بعد الـ cursor بس، بالترتيب، وصف زيادة.",
            "القيم: الـ id و first + 1.",
            "شيل الصف الزيادة.",
            "كل صف: cursor و node.",
            "رجّع الحواف، و hasNextPage من الصف الزيادة، و endCursor آخر واحد.",
            "قفلة.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`اتجرّب على ويندوز 11 بـ Postgres 16.13 في Docker:

- الصفحة الأولى: 999 و 998 و 997 (1000 [[DRAFT]])، و [[endCursor: "eyJpZCI6OTk3fQ"]] = [[{"id":997}]].
- الصفحة التانية: 996 و 995 و 994.
- [[after: "abc"]] و [[first: 500]]: [[BAD_USER_INPUT]] و [[data: null]].
- [[EXPLAIN ANALYZE]] (بعد [[ANALYZE posts]]): [[Index Scan Backward using posts_pkey]]، ٤ صفوف بس. من غير [[ANALYZE]] على جدول لسه متملي: [[Seq Scan]] و [[Sort]].

لو الصفحة التانية فيها عنصر من الأولى: الشرط [[<=]] بدل [[<]]. ولو [[hasNextPage]] دايمًا [[false]]: بتطلب [[first]] مش [[first + 1]].`,
          solCode: R`docker run -d --name lab-pg -e POSTGRES_PASSWORD=devpass -p 5491:5432 postgres:16-alpine
docker exec -i lab-pg psql -U postgres -c "create table posts (id int primary key, author_id int, title text, status text)"
docker exec -i lab-pg psql -U postgres -c "insert into posts select i, 1 + i % 40, 'post '||i, case when i%10=0 then 'DRAFT' else 'PUBLISHED' end from generate_series(1,1000) i"
docker exec -i lab-pg psql -U postgres -c "analyze posts"
docker exec -i lab-pg psql -U postgres -c "explain analyze select id, title from posts where status = 'PUBLISHED' and id < 500 order by id desc limit 4"
docker rm -f -v lab-pg`
        },
        {
          cmd: "N+1 على Postgres",
          title: "عدّ الاستعلامات بجد، و «آخر ٣ لكل كاتب» في استعلام واحد",
          desc: R`درس «DataLoader و N+1» شرح الفكرة. هنا بنقيسها على Postgres حقيقي: query فيه ٣ مستويات ([[posts]] ← [[author]] ← [[latestPosts]]) عمل ١٠١ استعلام من غير loaders، و ٣ بس بيهم.

والحتة اللي الـ loader العادي مبيحلهاش: «آخر ٣ منشورات **لكل** كاتب». [[LIMIT]] على استعلام واحد بيتطبق على المجموع. الحل [[CROSS JOIN LATERAL]]: Postgres بيشغّل الاستعلام الصغير مرة لكل كاتب جوه نفس الاستعلام، ومعاه [[unnest($1::int[])]] بيحوّل الـ ids لجدول.`,
          example: R`function makeLoaders(ctx: Ctx) {
  return {
    user: new DataLoader(async (ids: readonly number[]) => {
      const rows = await ctx.sql("select id, name from users where id = any($1)", [ids]);
      const byId = new Map(rows.map((u) => [u.id, u]));
      return ids.map((id) => byId.get(id) ?? new Error($__btuser $__{id} not found$__bt));
    }),
    latestPosts: new DataLoader(async (authorIds: readonly number[]) => {
      const rows = await ctx.sql(
        $__btselect a.author_id, p.id, p.title from unnest($1::int[]) as a(author_id)
         cross join lateral (select id, title from posts where author_id = a.author_id order by id desc limit 3) p$__bt,
        [authorIds]);
      return authorIds.map((id) => rows.filter((r) => r.author_id === id));
    }),
  };
}
const yoga = createYoga<{}, Ctx>({
  schema,
  context: () => {
    const ctx = { stats: { queries: 0 } } as Ctx;
    ctx.sql = async (text, params) => { ctx.stats.queries++; return (await pool.query(text, params)).rows; };
    ctx.loaders = makeLoaders(ctx);
    return ctx;
  },
  plugins: [{ onExecute: () => ({ onExecuteDone: ({ args }) => log.info({ queries: (args.contextValue as Ctx).stats.queries }, "graphql done") }) }],
});`,
          try: R`في Postgres اعمل [[users]] (٤٠ صف) و [[posts]] (١٠٠٠ صف، و index على [[(author_id, id desc)]]). اكتب الـ resolvers مرة بـ [[ctx.sql]] مباشرة ([[Post.author]] بـ [[where id = $1]] و [[User.latestPosts]] بـ [[limit 3]])، ومرة بالـ loaders. ابعت [[{ posts(first: 50) { title author { name latestPosts { title } } } }]] مرتين لكل نسخة، وقارن عدد الاستعلامات والوقت. وتأكد إن الرد نفسه زي بعضه.`,
          flag: "script",
          deep: {
            why: R`على جهازك القاعدة على بعد ٠.٢ مللي ثانية، فـ ١٠١ استعلام بيبانوا «سريعين». في الإنتاج القاعدة على سيرفر تاني (١ لـ ٢ مللي ثانية لكل رحلة)، والـ pool فيه ١٠ اتصالات، فالطلب ده لوحده ممكن ياخد ١٠٠ مللي ثانية وزيادة ويحجز الـ pool كله على حساب الطلبات التانية. والـ query ده (قايمة، كاتب، آخر منشوراته) شكل عادي جدًا في أي feed.`,
            how: R`العدّ: [[ctx.sql]] wrapper حوالين [[pool.query]] بيزوّد عداد في الـ context. الـ context بيتعمل جديد لكل طلب، فالعداد لكل طلب. ملحوظة: Yoga بيدمج الـ object اللي بترجّعه من [[context]] في object تاني، فلو العداد رقم عادي ([[ctx.queries++]]) الـ closure هيزوّد نسخة والـ plugin يقرا نسخة تانية (جربناها وطلعت 0). عشان كده [[stats]] object: الاتنين بيشاوروا على نفس الـ object.

الـ plugin: [[onExecute]] بيتنادى قبل التنفيذ، وبيرجّع [[onExecuteDone]] اللي بيتنادى بعد ما كل الـ resolvers تخلص. [[args.contextValue]] هو الـ context بتاع الطلب. في الإنتاج بتبعت الرقم ده لـ metrics أو تحطه على الـ span في OpenTelemetry.

[[= any($1)]]: [[$1]] array، و [[any]] بتقارن بأي عنصر فيه. ده أحسن من بناء [[IN ($1, $2, ...)]] بإيدك: استعلام واحد ثابت مهما كان عدد الـ ids، فـ Postgres بيكاش الـ plan.

[[unnest($1::int[]) as a(author_id)]]: بيحوّل الـ array لجدول مؤقت بعمود اسمه [[author_id]]، صف لكل كاتب. [[::int[]]]: نوع الـ parameter array أرقام.

[[cross join lateral (...) p]]: [[LATERAL]] معناها الاستعلام اللي جوه الأقواس يقدر يشوف أعمدة اللي قبله ([[a.author_id]]). فـ Postgres لكل صف في [[a]] بيشغّل [[select ... where author_id = a.author_id order by id desc limit 3]] (على الـ index، ٣ صفوف بس)، ويجمع النتايج. يعني «top-N لكل مجموعة» في رحلة واحدة. البديل window function ([[row_number() over (partition by author_id order by id desc)]] وبعدين [[where rn <= 3]])، بس ده بيقرا كل منشورات الكتّاب دول قبل ما يفلتر.

[[rows.filter]]: بيقسّم النتيجة لكل كاتب بنفس ترتيب [[authorIds]] (شرط DataLoader). مع آلاف الصفوف اعمل Map بدل filter جوه map.

ليه ٣ بالظبط؟ استعلام للمنشورات، واحد لكل الكتّاب المختلفين (٤٠ id في [[any]])، وواحد لـ «آخر ٣» لكل الكتّاب دول. ده عدد المستويات في الـ query، مش عدد الصفوف.`,
            when: R`أي resolver على علاقة تحت قايمة. ولو الـ ORM عندك بيعمل batching لوحده (Prisma بيجمع [[findUnique]] في نفس الـ tick)، لسه لازم تقيس، وتعمل «top-N لكل مجموعة» بـ SQL بإيدك لأن ده مش هيتعمل لوحده.`,
            mistakes: R`تقيس على قاعدة فاضية أو على localhost وتقول «مش مشكلة». وعداد رقم في الـ context بدل object (يطلع صفر دايمًا مع Yoga). و [[limit]] جوه batch عادي بدل LATERAL (أول كاتب ياخد الـ ٣ والباقي مياخدوش حاجة). ومفيش index على [[(author_id, id desc)]] فالـ LATERAL بيعمل scan لكل كاتب. وتنسى [[::int[]]] فـ Postgres يرمي خطأ نوع.`
          },
          teach: R`## الفكرة: عدّ، وبعدين صلّح

اتجرّب على ويندوز 11: Node 24.22.1 و graphql-yoga 6.0.1 و dataloader 2.2.3 و pg 8.23.1، و Postgres 16.13 في container. [[users]] فيه ٤٠ كاتب، و [[posts]] فيه ١٠٠٠ منشور موزعين عليهم، و index على [[posts (author_id, id desc)]]. الـ schema:

~~~graphql
type User { id: ID! name: String! latestPosts: [Post!]! }
type Post { id: ID! title: String! author: User! }
type Query { posts(first: Int = 10): [Post!]! }
~~~

والـ query:

~~~graphql
{ posts(first: 50) { title author { name latestPosts { title } } } }
~~~

---

## ١. العداد في الـ context

~~~ts
  context: () => {
    const ctx = { stats: { queries: 0 } } as Ctx;
    ctx.sql = async (text, params) => { ctx.stats.queries++; return (await pool.query(text, params)).rows; };
    ctx.loaders = makeLoaders(ctx);
    return ctx;
  },
~~~

- كل طلب ليه [[ctx]] جديد، فيه عداد و [[sql]] و loaders.
- [[as Ctx]]: بنقول لـ TypeScript «ده هيبقى Ctx» (لسه ناقصه [[sql]] و [[loaders]] في السطر ده).
- [[ctx.sql]]: كل استعلام بيعدّي من هنا، يزوّد العداد ويرجّع [[rows]].
- [[makeLoaders(ctx)]]: الـ loaders بتستخدم [[ctx.sql]] فبتتعد هي كمان.

> جربناها الأول بـ [[{ queries: 0 }]] و [[ctx.queries++]] والـ plugin طبع [[SQL queries: 0]] مع إن الرد كان صح. السبب إن Yoga بيدمج الـ context في object جديد، فالرقم اتنسخ. الـ [[stats]] object بيتشارك بالـ reference.

## ٢. الـ plugin اللي بيطبع العدد

~~~ts
  plugins: [{ onExecute: () => ({ onExecuteDone: ({ args }) => log.info({ queries: (args.contextValue as Ctx).stats.queries }, "graphql done") }) }],
~~~

plugin هو object فيه hooks. [[onExecute]] قبل التنفيذ، وبيرجّع [[onExecuteDone]] بعده. في التجربة كان [[console.log]].

---

## ٣. من غير loaders

~~~ts
Post: { author: (p, _, ctx) => ctx.sql("select id, name from users where id = $1", [p.author_id]).then((r) => r[0]) },
User: { latestPosts: (u, _, ctx) => ctx.sql("select id, title from posts where author_id = $1 order by id desc limit 3", [u.id]) },
~~~

~~~text الناتج (مرتين ورا بعض)
SQL queries: 101
run 1: 108ms
SQL queries: 101
run 2: 29ms
~~~

١ للمنشورات + ٥٠ كاتب (واحد لكل منشور، حتى لو نفس الكاتب) + ٥٠ «آخر ٣» = ١٠١. والـ ٥٠ منشور دول كتّابهم ٤٠ بس، يعني ١٠ استعلامات منهم مكررة بالظبط.

## ٤. loader الكتّاب

~~~ts
    user: new DataLoader(async (ids: readonly number[]) => {
      const rows = await ctx.sql("select id, name from users where id = any($1)", [ids]);
      const byId = new Map(rows.map((u) => [u.id, u]));
      return ids.map((id) => byId.get(id) ?? new Error($__btuser $__{id} not found$__bt));
    }),
~~~

- [[readonly number[]]]: DataLoader بيدّيك array متقدرش تعدّل فيه.
- [[id = any($1)]]: [[$1]] هو الـ array كله ([[pg]] بيحوّل array الـ JavaScript لـ array في Postgres).
- الـ Map والـ [[ids.map]]: نفس الترتيب ونفس الطول (اتشرحت في «DataLoader و N+1»).
- والـ resolver بقى [[ctx.loaders.user.load(p.author_id)]].

## ٥. loader «آخر ٣ لكل كاتب»

~~~sql
select a.author_id, p.id, p.title
from unnest($1::int[]) as a(author_id)
cross join lateral (
  select id, title from posts where author_id = a.author_id order by id desc limit 3
) p
~~~

من جوه لبرة:

| الحتة | بتعمل إيه |
|---|---|
| [[$1::int[]]] | الـ ids كـ array أرقام، زي [[{1,8,15,...}]] |
| [[unnest(...) as a(author_id)]] | array ← جدول، صف لكل كاتب، والعمود اسمه [[author_id]] |
| [[(select ... where author_id = a.author_id ... limit 3)]] | آخر ٣ للكاتب ده بس |
| [[lateral]] | يسمح للاستعلام اللي جوه يشوف [[a.author_id]] |
| [[cross join]] | كل كاتب مع منشوراته (٣ صفوف أو أقل) |

~~~ts
      return authorIds.map((id) => rows.filter((r) => r.author_id === id));
~~~

لكل كاتب بنفس الترتيب: منشوراته من النتيجة.

---

## ٦. بالـ loaders

~~~text الناتج (مرتين ورا بعض)
SQL queries: 3
run 1: 78ms
SQL queries: 3
run 2: 13ms
~~~

| | من غير loaders | بالـ loaders |
|---|---|---|
| استعلامات | 101 | 3 |
| الوقت (تاني مرة) | 29ms | 13ms |
| أول منشور في الرد | [[post 1000]]، كاتبه [[user1]]، وآخر ٣ ليه [[post 1000]] و [[post 960]] و [[post 920]] | نفس الرد بالظبط |

- ٣ = عدد المستويات: منشورات، كتّاب (٤٠ id في استعلام)، «آخر ٣» لكل الـ ٤٠ في استعلام.
- الوقت هنا والقاعدة على نفس الجهاز (رحلة أقل من مللي ثانية). كل رحلة زيادة في الإنتاج بتتضرب في ٩٨.
- أول مرة أبطأ في الحالتين: اتصالات الـ pool لسه بتتفتح.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[ctx.sql]] بعداد في [[stats]] | تعرف كل طلب عمل كام استعلام |
| [[onExecuteDone]] | تطبع/تبعت الرقم بعد التنفيذ |
| [[= any($1)]] | batch بـ استعلام ثابت |
| [[unnest]] + [[cross join lateral]] + [[limit]] | top-N لكل مجموعة في رحلة واحدة |
| loaders جوه الـ context | كاش لكل طلب، والعداد شغال |

- عدد الاستعلامات لازم يبقى قد عدد مستويات الـ query، مش قد عدد الصفوف.`,
          lines: [
            "الـ loaders لكل طلب، وبتستخدم ctx.sql عشان تتعد:",
            "رجّع:",
            "loader الكتّاب:",
            "كل الـ ids في استعلام واحد بـ any.",
            "Map من الـ id للصف.",
            "نفس ترتيب وطول الـ ids، والمفقود Error.",
            "قفلة.",
            "loader «آخر ٣ لكل كاتب»:",
            "استعلام واحد:",
            "الـ ids كجدول...",
            "...ولكل كاتب آخر ٣ منشورات بـ LATERAL.",
            "القيمة: array الـ ids.",
            "قسّم النتيجة لكل كاتب بنفس الترتيب.",
            "قفلة.",
            "قفلة.",
            "قفلة.",
            "السيرفر:",
            "الـ schema.",
            "context جديد لكل طلب:",
            "العداد جوه object (Yoga بيدمج الـ context فالرقم العادي بيتنسخ).",
            "كل استعلام بيعدّي من هنا ويزوّد العداد.",
            "الـ loaders بتاعة الطلب ده.",
            "رجّعه.",
            "قفلة.",
            "plugin بيسجّل عدد الاستعلامات بعد ما التنفيذ يخلص.",
            "قفلة."
          ],
          sol: R`اتجرّب على ويندوز 11 بـ Postgres 16.13 في Docker (٤٠ كاتب و ١٠٠٠ منشور، والـ ٥٠ منشور الأخيرين كتّابهم ٤٠):

- من غير loaders: [[SQL queries: 101]] في المرتين، والوقت 108 ثم 29 مللي ثانية.
- بالـ loaders: [[SQL queries: 3]]، والوقت 78 ثم 13 مللي ثانية.
- الرد نفسه زي بعضه: أول منشور [[post 1000]] وكاتبه [[user1]] وآخر ٣ ليه [[post 1000]] و [[post 960]] و [[post 920]].

والـ solCode على الكتّاب 1 و 8 و 15 رجّع ٩ صفوف: [[1 | 1000]] و [[1 | 960]] و [[1 | 920]]، و [[8 | 961]] و [[8 | 921]] و [[8 | 881]]، و [[15 | 962]] و [[15 | 922]] و [[15 | 882]].

لو العدد طلع 0: العداد رقم في الـ context مش object. ولو الـ loaders عملت أكتر من ٣: فيه [[await]] جوه loop في resolver، أو الـ loaders معمولة برا الـ context.`,
          solCode: R`create index on posts (author_id, id desc);
select a.author_id, p.id, p.title
from unnest(array[1, 8, 15]::int[]) as a(author_id)
cross join lateral (select id, title from posts where author_id = a.author_id order by id desc limit 3) p;`
        },
        {
          cmd: "cost limit و persisted queries",
          title: "حدود للـ aliases والتكلفة، و introspection مقفول، و queries مسجلة بس",
          desc: R`حد العمق (درس «auth في resolvers») لوحده مش كفاية: query عمقه ٣ بس فيه ١٠٠ alias لنفس الحقل التقيل بيعدّي. فبتحط حدود تانية من GraphQL Armor: عدد الـ aliases، وعدد الـ tokens، وتكلفة محسوبة لكل query.

وأقوى حماية لـ API الفرونت بتاعك بس: persisted queries. وقت الـ build بتسجّل كل query الفرونت بيستخدمه بالـ hash بتاعه، والسيرفر في الإنتاج بيقبل الـ hash بس ويرفض أي نص query. ومعاها introspection مقفول، فمحدش يعرف الـ schema ولا يبعت query من عنده.`,
          example: R`import { createHash } from "node:crypto";
import { maxAliasesPlugin } from "@escape.tech/graphql-armor-max-aliases";
import { costLimitPlugin } from "@escape.tech/graphql-armor-cost-limit";
import { maxDepthPlugin } from "@escape.tech/graphql-armor-max-depth";
import { maxTokensPlugin } from "@escape.tech/graphql-armor-max-tokens";
import { useDisableIntrospection } from "@graphql-yoga/plugin-disable-introspection";
import { usePersistedOperations } from "@graphql-yoga/plugin-persisted-operations";
const sha256 = (s: string) => createHash("sha256").update(s).digest("hex");
const store = new Map(operationsFromBuild.map((q) => [sha256(q), q]));
const isProd = process.env.NODE_ENV === "production";
export const yoga = createYoga({
  schema,
  graphiql: !isProd,
  plugins: [
    maxDepthPlugin({ n: 6 }),
    maxAliasesPlugin({ n: 5 }),
    maxTokensPlugin({ n: 1000 }),
    costLimitPlugin({ maxCost: 100, objectCost: 2, scalarCost: 1, depthCostFactor: 1.5 }),
    ...(isProd ? [useDisableIntrospection(), usePersistedOperations({ getPersistedOperation: (hash: string) => store.get(hash) ?? null })] : []),
  ],
});`,
          try: R`شغّل نسختين من السيرفر: واحدة عادي (7505) وواحدة بـ [[NODE_ENV=production]] (7506)، و [[operationsFromBuild]] فيها query واحد بس: [[query Feed { posts(first: 10) { id title author { name } } }]]. على نسخة التطوير ابعت query فيه ١٠٠ alias، و query عمقه ٧، وتلات aliases لـ query تقيل. وعلى نسخة الإنتاج ابعت [[__schema]]، و query عادي، والـ hash بتاع Feed بـ POST وبـ GET، و hash مش موجود.`,
          flag: "script",
          deep: {
            why: R`endpoint الـ GraphQL بيقبل أي query أي حد يكتبه، وده معناه إن أي حد يقدر يكتب أتقل query ممكن على الـ schema بتاعتك ويبعته ١٠٠ مرة في الثانية. الـ rate limit بعدد الطلبات مش بيحميك: طلب واحد ممكن يساوي ١٠٠٠ طلب عادي. والـ introspection بيدّي المهاجم خريطة كاملة (كل الأنواع، والحقول، وكل mutation حتى اللي الفرونت مش بيستخدمها).`,
            how: R`الـ plugins كلها بتشتغل وقت الـ validation، يعني بعد ما الـ query يتفك (parse) وقبل ما أي resolver يتنادى. فالرفض بيكلف تقريبًا ولا حاجة.

[[maxAliasesPlugin]]: عدد الـ aliases في الـ query كله. من غيره [[a1: posts { ... } a2: posts { ... } ...]] بيضاعف الشغل وهو لسه عمقه ٢.

[[maxTokensPlugin]]: عدد الـ tokens (الكلمات والأقواس) في النص. بيوقف queries ضخمة قبل حتى ما تتفك كاملة.

[[costLimitPlugin]]: بيدّي كل حقل تكلفة: object (زي [[author]]) بـ [[objectCost]]، و scalar (زي [[title]]) بـ [[scalarCost]]، وكل ما الحقل يبقى أعمق التكلفة بتتضرب في [[depthCostFactor]]. والمجموع لو عدّى [[maxCost]] الـ query بيترفض. **مهم:** التكلفة دي ثابتة من شكل الـ query، ومش عارفة القايمة هترجع كام عنصر. query تكلفته 66 رجّع 31500 بايت في التجربة. عشان كده لازم كمان حد لـ [[first]] في كل resolver قايمة (درس «connections و cursors»). وفيه spec اسمه GraphQL Cost Directives فيه [[@cost]] و [[@listSize]] بتعرّف فيها حجم القوايم، ومدعوم في بعض الـ gateways (من الـ docs، متجربش هنا).

[[useDisableIntrospection]]: أي query فيه [[__schema]] أو [[__type]] بيترفض. الفرونت مش محتاج introspection وقت التشغيل: الأنواع بتتولد وقت الـ build من ملف الـ schema.

[[usePersistedOperations]]: العميل بيبعت [[extensions.persistedQuery.sha256Hash]] بدل [[query]]. السيرفر بينادي [[getPersistedOperation(hash)]]: لو رجع نص، بيتنفذ. لو [[null]]: [[PersistedQueryNotFound]]. ولو العميل بعت [[query]] نص: [[PersistedQueryOnly]]، لأن [[allowArbitraryOperations]] افتراضيًا false. والـ store بيتبني وقت الـ build: أداة زي GraphQL Codegen (client preset) بتطلّع ملف JSON فيه كل operations الفرونت بالـ hash، والسيرفر بيقراه وقت التشغيل.

ميزة جانبية: الطلب بقى صغير ([[hash]] بدل نص طويل)، و GET بالـ hash بيتكاش في CDN زي أي GET.

الترتيب في الإنتاج: persisted operations قفلت الباب على أي query من برا. الحدود التانية لسه مفيدة لو فيه عملاء تانيين (API عام) أو لو حد غلط في الفرونت.`,
            when: R`persisted queries + introspection مقفول: أي GraphQL API الفرونت بتاعك بس اللي بيستخدمه (أغلب الحالات). API عام لمطوّرين تانيين (زي GitHub): مينفعش persisted (هما بيكتبوا queries)، فالحماية cost limit بقوايم محسوبة و rate limit بالتكلفة مش بعدد الطلبات.`,
            mistakes: R`حد عمق بس وتفتكر انت محمي. و cost limit من غير حد لـ [[first]] (التكلفة مش شايفة الأحجام). و introspection مقفول وتفتكره حماية لوحده (أسماء الحقول بتتعرف من الفرونت نفسه أو من رسايل «Did you mean...»). و persisted queries بـ [[allowArbitraryOperations: true]] «مؤقتًا» وتنساها. و store الـ hashes من الإنتاج القديم بعد deploy جديد (الفرونت الجديد يبعت hash مش موجود): انشر الـ store قبل أو مع الفرونت.`
          },
          teach: R`## الفكرة: ارفض قبل ما تنفّذ

كل الحدود دي بتشتغل على **نص** الـ query قبل التنفيذ. والـ persisted queries بتقفل الموضوع من أوله: مفيش نص من برا خالص.

اتجرّب على ويندوز 11: Node 24.22.1 و graphql-yoga 6.0.1 و graphql 16.14.2، و GraphQL Armor (max-depth 2.4.2 و max-aliases 2.6.2 و max-tokens 2.5.1 و cost-limit 2.4.3)، و [[@graphql-yoga/plugin-disable-introspection]] 3.0.1 و [[plugin-persisted-operations]] 4.0.1. الـ schema [[User { posts }]] و [[Post { author }]]، وكل قايمة بترجع ١٠ عناصر. نسخة تطوير على 7505 ونسخة [[NODE_ENV=production]] على 7506.

> plugins الـ Armor بتطلب [[graphql]] 16 (في الـ dependencies بتاعتها [[^16.10.0]])، و Yoga 6 بيقبل 16 أو 17، فخليك على 16 لحد ما تتأكد.

---

## ١. الـ store

~~~ts
const sha256 = (s: string) => createHash("sha256").update(s).digest("hex");
const store = new Map(operationsFromBuild.map((q) => [sha256(q), q]));
~~~

- [[createHash("sha256").update(s).digest("hex")]]: SHA-256 للنص كـ hex (٦٤ حرف).
- [[operationsFromBuild]]: array بكل نصوص الـ operations اللي الفرونت بيستخدمها (في التجربة: [[Feed]] بس). الـ Map: hash ← نص.

نفس الـ hash بـ Git Bash:

~~~bash
printf '%s' "query Feed { posts(first: 10) { id title author { name } } }" | sha256sum
~~~

أول ١٦ حرف طلعوا [[17cb0b1084a77d6e]] من الاتنين. لازم النص **بالظبط** نفسه: مسافة زيادة = hash تاني.

## ٢. الحدود

~~~ts
    maxDepthPlugin({ n: 6 }),
    maxAliasesPlugin({ n: 5 }),
    maxTokensPlugin({ n: 1000 }),
    costLimitPlugin({ maxCost: 100, objectCost: 2, scalarCost: 1, depthCostFactor: 1.5 }),
~~~

~~~text ١٠٠ alias ([[p0: posts { id } p1: posts { id } ...]])
{"errors":[{"message":"Syntax Error: Aliases limit of 5 exceeded, found 100."}]} [200]
~~~

~~~text عمق ٧
{"errors":[{"message":"Syntax Error: Query depth limit of 6 exceeded, found 7."}]} [200]
~~~

(الـ plugins دي بترمي الخطأ كـ syntax error، عشان كده الرسالة بتبدأ بـ [[Syntax Error:]] والـ status 200.)

التكلفة: شغّلنا السيرفر بـ [[maxCost: 1]] عشان الرسالة تقول التكلفة الحقيقية لكل query:

| الـ query | التكلفة |
|---|---|
| [[{ posts { id title author { name } } }]] | 10.25 |
| [[posts]] ← [[author]] ← [[posts]] ← [[author]] ← [[posts]] (عمق ٥، بكل الحقول) | 65.94 |
| تلات aliases ([[a:]] و [[b:]] و [[c:]]) كل واحد عمق ٤ | 121.88 |

وبـ [[maxCost: 100]]:

~~~text الناتج
عمق ٥:          [200] 31500B   (عدّى، ورجّع 31500 بايت: ١٠ × ١٠ × ١٠ منشور)
تلات aliases:   {"errors":[{"message":"Syntax Error: Query Cost limit of 100 exceeded, found 121.875."}]}
~~~

لاحظ: التكلفة 66 رجّعت ألف منشور. الـ plugin بيعدّ الحقول في النص، ومش عارف إن [[posts]] بترجع ١٠ (أو ١٠٠٠). الحماية من الأحجام هي حد [[first]] في الـ resolvers.

## ٣. الإنتاج: introspection و persisted

~~~ts
    ...(isProd ? [useDisableIntrospection(), usePersistedOperations({ getPersistedOperation: (hash: string) => store.get(hash) ?? null })] : []),
~~~

- [[...(cond ? [a, b] : [])]]: لو إنتاج، فك الـ array جوه قايمة الـ plugins، غير كده فك array فاضي (ولا حاجة).
- [[getPersistedOperation]]: hash ← نص أو [[null]].

~~~text الناتج على نسخة الإنتاج
{ __schema { types { name } } }          {"errors":[{"message":"PersistedQueryOnly","extensions":{"code":"CANNOT_SEND_PQ_ID_AND_BODY"}}]}
{ posts { id } }                         {"errors":[{"message":"PersistedQueryOnly","extensions":{"code":"CANNOT_SEND_PQ_ID_AND_BODY"}}]}
hash بتاع Feed (POST)                   {"data":{"posts":[{"id":"0","title":"t0","author":{"name":"Mona"}},...
hash بتاع Feed (GET)                    {"data":{"posts":[{"id":"0","title":"t0","author":{"name":"Mona"}},...
hash "0000"                              {"errors":[{"message":"PersistedQueryNotFound","extensions":{"code":"PERSISTED_QUERY_NOT_IN_LIST"}}]}
~~~

- أي نص query اترفض بـ [[PersistedQueryOnly]] قبل ما يوصل حتى للـ introspection plugin. و introspection على نسخة التطوير رجّع كل الأنواع ([[User]] و [[Post]] و [[__Schema]] ...).
- الـ hash الصح اشتغل بـ POST وبـ GET.

شكل الطلب بالـ hash:

~~~bash
curl -s localhost:7506/graphql -H 'content-type: application/json' \
  -d '{"extensions":{"persistedQuery":{"version":1,"sha256Hash":"17cb0b10...(٦٤ حرف)"}}}'
curl -s -G localhost:7506/graphql --data-urlencode 'extensions={"persistedQuery":{"version":1,"sha256Hash":"17cb0b10..."}}'
~~~

مفيش [[query]] خالص: [[extensions.persistedQuery]] فيها النسخة والـ hash.

---

## الخلاصة

| الحماية | بتمنع إيه | متى |
|---|---|---|
| [[maxDepthPlugin]] | queries متداخلة | دايمًا |
| [[maxAliasesPlugin]] | نفس الحقل ١٠٠ مرة | دايمًا |
| [[maxTokensPlugin]] | نص ضخم | دايمًا |
| [[costLimitPlugin]] | queries عريضة وعميقة | دايمًا، ومعاها حد [[first]] |
| [[useDisableIntrospection]] | خريطة الـ schema | الإنتاج |
| [[usePersistedOperations]] | أي query مش من الفرونت | الإنتاج، لو الفرونت بتاعك بس |

- الحدود بتشتغل قبل الـ resolvers، فالرفض رخيص.
- التكلفة الثابتة مش شايفة أحجام القوايم.`,
          lines: [
            "SHA-256 من Node.",
            "حد عدد الـ aliases.",
            "حد التكلفة.",
            "حد العمق.",
            "حد عدد الـ tokens.",
            "قفل الـ introspection.",
            "persisted operations.",
            "دالة hash للنص (hex).",
            "hash ← نص لكل operation اتولّد وقت الـ build.",
            "إنتاج ولا تطوير.",
            "السيرفر:",
            "الـ schema.",
            "GraphiQL في التطوير بس.",
            "الـ plugins:",
            "عمق أقصاه ٦.",
            "٥ aliases بالكتير.",
            "١٠٠٠ token بالكتير.",
            "تكلفة أقصاها ١٠٠: object بـ ٢، و scalar بـ ١، وكل مستوى يضرب في ١.٥.",
            "في الإنتاج بس: introspection مقفول، ومفيش غير الـ hashes المسجلة.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`اتجرّب على ويندوز 11 (graphql-yoga 6.0.1 و GraphQL Armor):

- ١٠٠ alias: [[Aliases limit of 5 exceeded, found 100.]]
- عمق ٧: [[Query depth limit of 6 exceeded, found 7.]]
- تلات aliases تقيلة: [[Query Cost limit of 100 exceeded, found 121.875.]]، والـ query العميق لوحده (تكلفة 65.94) عدّى ورجّع 31500 بايت.
- الإنتاج: [[__schema]] و [[{ posts { id } }]] اترفضوا بـ [[PersistedQueryOnly]]، والـ hash بتاع Feed اشتغل بـ POST و GET، و hash مش موجود: [[PersistedQueryNotFound]].`,
          solCode: R`H=$(printf '%s' "query Feed { posts(first: 10) { id title author { name } } }" | sha256sum | cut -d' ' -f1)
curl -s localhost:7506/graphql -H 'content-type: application/json' \
  -d "{\"extensions\":{\"persistedQuery\":{\"version\":1,\"sha256Hash\":\"$H\"}}}"`
        },
        {
          cmd: "REST ولا GraphQL ولا tRPC",
          title: "تختار شكل الـ API بصراحة",
          desc: R`REST: كل resource ليه URL، والـ HTTP نفسه (methods و status codes و cache) شغال معاك، وأي عميل في أي لغة يفهمه. GraphQL: endpoint واحد والعميل بيختار الحقول، ومفيد لما عملاء كتير مختلفين بيطلبوا أشكال مختلفة من نفس البيانات، بس بيجيب معاه N+1 وحدود التكلفة والكاش. tRPC: دوال TypeScript بتتنادى من الفرونت والأنواع بتوصل لوحدها، بس الاتنين لازم TypeScript وفي نفس الـ repo.

مفيش واحد أحسن دايمًا. السؤال: مين العملاء، ومين بيكتبهم، ومحتاج كاش HTTP قد إيه.`,
          example: R`// REST
const post = await (await fetch("/api/posts/10?include=author")).json();
// GraphQL
const { data } = await gql(PostPage, { id: "10", withAuthor: true });
// tRPC
const post = await trpc.postById.query({ id: "10" });`,
          try: R`خد شاشة واحدة من مشروعك (صفحة منشور فيها الكاتب وآخر ٣ تعليقات) واكتب الطلبات اللي محتاجاها بالتلاتة على ورقة: كام طلب؟ مين بيقرر الحقول؟ الرد بيتكاش في CDN إزاي؟ لو حقل اتشال من السيرفر، العميل بيعرف إمتى (وقت الـ build ولا لما يقع في الإنتاج)؟ وبعدين قرر واكتب السبب في سطرين.`,
          deep: {
            why: R`الاختيار ده بيحدد شكل الكود في الفرونت والباك لسنين، وتغييره بعدين مكلف. وناس كتير بتختار GraphQL «عشان مودرن» لـ API عميله الوحيد صفحة React واحدة، فيدفعوا تمن N+1 والحماية والكاش من غير ما يستفيدوا من المرونة. وناس تانية بتختار tRPC وبعدين يحتاجوا تطبيق موبايل native أو شريك خارجي، فيكتبوا REST جنبه.`,
            how: R`الكاش: REST بـ GET و [[ETag]] و [[Cache-Control]] (تاب APIs المستوى ١، «ETag و Cache-Control») بيتكاش في المتصفح والـ CDN من غير أي كود. GraphQL غالبًا POST، فمفيش كاش HTTP، والكاش بيتنقل للعميل (Apollo Client و urql بيعملوا normalized cache). ولو عايز CDN: persisted queries بـ GET (درس «cost limit و persisted queries»: الـ hash اشتغل بـ GET). tRPC بيبعت الـ queries بـ GET، فممكن تحط headers للكاش، بس الـ batching بيجمع كذا procedure في URL واحد.

الأخطاء: REST بالـ status code (404 و 409 و 422) والأدوات كلها (monitoring، retries) فاهماه. GraphQL الرد غالبًا 200 وفيه [[errors]] (درس «أخطاء GraphQL و null»: حتى الـ validation errors بـ 200 مع [[application/json]])، فالـ monitoring لازم يقرا الـ body. tRPC بيرجّع status codes حسب [[TRPCError]] code.

العقد والأنواع: REST بـ OpenAPI و codegen (درس «Swagger UI و openapi-typescript»). GraphQL الـ schema هي العقد، و codegen من الـ operations. tRPC من غير عقد مكتوب: نوع الـ router نفسه. ده أسرع في monorepo، بس مفيش عقد لحد برا TypeScript.

الأداء: GraphQL بيقلل الـ overfetching وعدد الرحلات للعميل، بس الشغل بيتنقل للسيرفر (resolvers و DataLoader، درس «N+1 على Postgres»: ١٠١ استعلام لـ ٣). REST بـ [[?include=]] أو [[?fields=]] بيحل جزء كبير من ده في الحالات البسيطة.

الأمان: REST بتحمي كل endpoint، و rate limit بعدد الطلبات. GraphQL محتاج حماية على مستوى الحقل، وحدود عمق وتكلفة، وغالبًا persisted queries. tRPC زي REST (كل procedure endpoint)، بس سهل تنسى إنه API عام على الإنترنت مش «دالة داخلية».

حاجات تانية: رفع الملفات أسهل بكتير في REST (multipart عادي أو presigned URL). والـ versioning: REST بـ [[/v2]] أو headers، و GraphQL بيضيف حقول ويعمل [[@deprecated]] للقديمة من غير versions.`,
            when: R`API عام لمطوّرين تانيين أو عملاء بلغات مختلفة: REST (و OpenAPI). فرونت واحد + باك TypeScript في نفس الـ repo وفريق صغير: tRPC. عملاء كتير (web و iOS و Android و شركاء) بيطلبوا أشكال مختلفة من بيانات مترابطة، أو gateway بيجمع كذا service: GraphQL. وفيه مشاريع كتير بتجمع: REST للعام و tRPC أو GraphQL للفرونت.`,
            mistakes: R`تختار GraphQL لـ CRUD بسيط بعميل واحد. وتحط tRPC في API هيستخدمه موبايل native أو شريك. وتفتكر GraphQL بيحل الأداء لوحده (المشكلة اتنقلت للسيرفر). وتقارن على «الحجم على السلك» بس: الفرق الحقيقي في الكاش والأخطاء والعقد ومين العملاء. وتغيّر شكل الـ API في نص المشروع من غير سبب قوي.`
          },
          teach: R`## الفكرة: التلاتة بيحلوا نفس المشكلة لعملاء مختلفين

الدرس ده مقارنة مفيهاش كود جديد يتشغّل: الأرقام اللي فيه جاية من الدروس اللي فاتت في القسم ده (اتشغّلت على ويندوز 11 بـ Node 24.22.1)، وتفاصيل tRPC من درس «tRPC» ومن الـ docs الرسمية (tRPC 11).

---

## ١. نفس الشاشة بالتلاتة

~~~ts
const post = await (await fetch("/api/posts/10?include=author")).json();
~~~

REST: URL للـ resource، و [[?include=author]] بيقول «هات الكاتب معاه» (اختيار شائع، مش standard). الرد شكله ثابت يحدده السيرفر.

~~~ts
const { data } = await gql(PostPage, { id: "10", withAuthor: true });
~~~

GraphQL: [[PostPage]] الـ operation من درس «variables و fragments»، و [[gql]] أي دالة بتعمل POST لـ [[/graphql]]. العميل بيحدد الحقول.

~~~ts
const post = await trpc.postById.query({ id: "10" });
~~~

tRPC: نداء دالة. [[trpc]] client معمول بـ [[createTRPCClient<AppRouter>]]، والنوع بتاع [[post]] جاي من السيرفر نفسه.

---

## ٢. المقارنة

| | REST | GraphQL | tRPC |
|---|---|---|---|
| العملاء | أي لغة | أي لغة (بمكتبة أو [[fetch]]) | TypeScript، ونفس الـ repo عمليًا |
| مين يحدد الحقول | السيرفر | العميل | السيرفر |
| العقد | OpenAPI (بتكتبه أو بيتولّد) | الـ schema | نوع الـ router |
| كاش HTTP/CDN | جاهز بـ GET | محتاج persisted GET | GET للـ queries |
| الأخطاء | status codes | 200 + [[errors]] غالبًا | status من [[TRPCError]] |
| N+1 | في الكود بتاعك | الوضع الافتراضي لو مخدتش بالك | في الكود بتاعك |
| الحماية من query تقيل | مش موجودة كمشكلة | عمق و aliases وتكلفة و persisted | مش موجودة كمشكلة |
| رفع ملفات | سهل | مش مريح | ممكن، مش أفضل حاجة فيه |
| versioning | [[/v2]] أو header | حقول جديدة و [[@deprecated]] | مع الكود (الاتنين بيتنشروا مع بعض) |

---

## ٣. أسئلة القرار

1. **فيه عملاء مش TypeScript أو برا الـ repo** (موبايل native، شركاء، API عام)؟ لو أيوه: tRPC خرج. REST أو GraphQL.
2. **العملاء محتاجين أشكال مختلفة جدًا من نفس البيانات المترابطة**، أو عندك كذا service عايز تجمعهم في endpoint؟ GraphQL بيستاهل تمنه.
3. **الكاش في CDN مهم** (محتوى عام، ترافيك كبير)؟ REST أسهل. GraphQL بس بـ persisted GET.
4. **فريق صغير، Next أو monorepo، والفرونت هو العميل الوحيد**؟ tRPC أسرع حاجة في الكتابة.
5. لسه مش متأكد؟ REST بـ OpenAPI: أي حد يفهمه، وتقدر تضيف GraphQL أو tRPC جنبه بعدين لعميل معين.

---

## الخلاصة

- REST: الـ HTTP بيشتغل معاك (كاش، status، أي عميل).
- GraphQL: مرونة للعميل، وتمنها على السيرفر (N+1، حدود، كاش).
- tRPC: أسرع تجربة لما الاتنين TypeScript في مكان واحد، ومش لـ API عام.
- مشاريع كتير بتجمع اتنين: REST للعام، وواحد من التانيين للفرونت.`,
          lines: [
            "REST: GET للـ resource، والكاتب معاه بـ include.",
            "GraphQL: operation باسم و variables، والعميل اختار الحقول.",
            "tRPC: نداء procedure كأنها دالة، والنوع جاي من السيرفر."
          ],
          sol: R`مفيش إجابة واحدة. مثال لقرار مكتوب صح: «الفرونت Next والباك في نفس الـ repo، ومفيش موبايل في الخطة: tRPC. لو جه شريك خارجي هنعمله REST بـ OpenAPI جنبه.» أو: «عندنا web و iOS و Android بيعرضوا نفس البيانات بأشكال مختلفة: GraphQL، ومعاه DataLoader و persisted queries من أول يوم.»

اللي ميعدّيش: «GraphQL عشان أحدث» أو «REST عشان متعودين» من غير ما ترد على أسئلة العملاء والكاش.`
        }
      ]
    }
]);
