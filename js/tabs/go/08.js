// تكملة تاب go: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/go/01.js (شرح حقول الدرس في أوله)
MORE("go", [
    {
      t: "الويب بالمكتبة القياسية",
      l: 2,
      n: "سيرفر net/http و routing بـ \"GET /users/{id}\"، و JSON بالـ struct tags، و middleware، و HTTP client بمهلة، و database/sql مع Postgres، وهيكل مشروع وإعدادات من env",
      items: [
        {
          cmd: "بناء خادم ويب REST API بـ net/http",
          title: "سيرفر HTTP بالمكتبة القياسية: Handler و ResponseWriter و Request",
          desc: R`[[net/http]] فيها سيرفر HTTP كامل ومستخدم في الإنتاج من غير أي مكتبة خارجية. الفكرة كلها في دالة شكلها:
[[func(w http.ResponseWriter, r *http.Request)]]
• [[r]] (pointer لـ Request): الطلب. فيه [[r.Method]] و [[r.URL.Path]] و [[r.URL.Query().Get("name")]] و [[r.Header]] و [[r.Body]] و [[r.Context()]].
• [[w]] (ResponseWriter): بتكتب فيه الرد. [[w.Header().Set(...)]] للـ headers، و [[w.WriteHeader(201)]] للـ status، و [[w.Write]] أو [[fmt.Fprintf(w, ...)]] للـ body. ولازم الترتيب ده: headers ثم status ثم body.

[[http.NewServeMux()]] بيعمل router: [[mux.HandleFunc("/hello", hello)]] بيربط مسار بدالة. و [[http.ListenAndServe(":8080", mux)]] بيشغّل السيرفر على البورت ويفضل شغال لحد ما يحصل error.

السيرفر بيشغّل كل request في goroutine لوحده، فطلب بطيء مش بيعطّل الباقيين. بس ده معناه إن أي داتا مشتركة بين الـ handlers (map في الذاكرة مثلًا) محتاجة Mutex.

[[log.Fatal(err)]] بيطبع الـ error ويقفل البرنامج بـ exit code 1، و ListenAndServe مش بترجع غير بـ error (زي البورت مستخدم).`,
          example: R`package main

import (
  "fmt"
  "log"
  "net/http"
)

func hello(w http.ResponseWriter, r *http.Request) {
  name := r.URL.Query().Get("name")
  if name == "" {
    name = "يا عالم"
  }
  fmt.Fprintf(w, "أهلًا %s\n", name)
}

func health(w http.ResponseWriter, r *http.Request) {
  w.Header().Set("Content-Type", "application/json")
  w.WriteHeader(http.StatusOK)
  w.Write([]byte($__bt{"status":"ok"}$__bt + "\n"))
}

func main() {
  mux := http.NewServeMux()
  mux.HandleFunc("/hello", hello)
  mux.HandleFunc("/health", health)

  log.Println("listening on http://localhost:8080")
  log.Fatal(http.ListenAndServe(":8080", mux))
}`,
          try: R`شغّله وجرّب من ترمنال تاني: [[curl localhost:8080/hello]] و [[curl "localhost:8080/hello?name=Sara"]] و [[curl -i localhost:8080/health]] و [[curl -i localhost:8080/nothing]] و [[curl -i -X DELETE localhost:8080/hello]]. لاحظ آخر واحد: هل السيرفر فرّق بين GET و DELETE؟ وبعدين شغّل نسخة تانية من البرنامج وهو شغال.`,
          flag: "script",
          deep: {
            why: R`في Node محتاج Express، وفي Python محتاج FastAPI أو Flask. في Go المكتبة القياسية كفاية لـ APIs حقيقية، وكتير من الشركات بتكتب الـ backend بيها من غير framework. ولو استخدمت framework بعدين، أغلبهم مبنيين فوق نفس الـ Handler ده.`,
            how: R`[[http.Handler]] interface فيه method واحدة: [[ServeHTTP(w, r)]]. [[mux.HandleFunc]] بياخد دالة عادية ويحوّلها لـ Handler. والـ mux نفسه Handler، فـ ListenAndServe بتاخده.

لو مكتبتش [[WriteHeader]]، أول Write بيبعت 200 لوحده. ولو كتبت header بعد ما بدأت تكتب body، مش هيتبعت (الـ headers خلاص راحت).

[[http.StatusOK]] = 200. الثوابت دي أوضح من الأرقام.

المسار [["/hello"]] بيطابق [[/hello]] بس، لكن المسار اللي بيخلص بـ [[/]] (زي [["/static/"]]) بيطابق كل اللي تحته. والمسار [["/"]] بيطابق أي حاجة مفيش ليها مسار تاني، وده فخ قديم. والـ mux هنا مش بيفرّق بين GET و POST: ده في الدرس الجاي.

[[http.ListenAndServe]] مع nil بدل mux بيستخدم [[http.DefaultServeMux]] (global). في كود حقيقي اعمل mux بتاعك.`,
            when: R`أي HTTP API أو webhook أو health check. وللإنتاج محتاج كمان timeouts على السيرفر وإغلاق نضيف (المستوى ٣)، لأن ListenAndServe الافتراضي مفيهوش timeouts.`,
            mistakes: R`[[w.Header().Set]] بعد [[w.Write]]: الـ header مش بيوصل. و [[WriteHeader]] مرتين: [[http: superfluous response.WriteHeader call]] في اللوج. وتنسى إن كل request في goroutine فتعدّل map مشترك من غير قفل. وتسيب return بعد [[http.Error]] فالكود يكمّل يكتب.`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

سيرفر HTTP صغير فيه مسارين: [[/hello]] بيرد بتحية (وبياخد اسم من الـ URL لو موجود)، و [[/health]] بيرد بـ JSON صغير يقول إن السيرفر شغال. مفيش أي مكتبة خارجية: كله من [[net/http]].

كل الناتج هنا من [[go run .]] جوه [[docker run --rm golang:1.25]] (Go 1.25.14 على لينكس)، و curl من ترمنال تاني في نفس الـ container.

---

## ١. الـ imports

~~~go main.go
import (
  "fmt"
  "log"
  "net/http"
)
~~~

- [[fmt]]: الطباعة. هنستخدم منها [[fmt.Fprintf]] اللي بتكتب في أي Writer، مش الشاشة بس.
- [[log]]: زي fmt بس كل سطر قبله التاريخ والوقت، وبيكتب على stderr. ومنها [[log.Fatal]].
- [[net/http]]: السيرفر والـ router والـ status codes.

---

## ٢. أول handler: [[hello]]

~~~go main.go
func hello(w http.ResponseWriter, r *http.Request) {
  name := r.URL.Query().Get("name")
  if name == "" {
    name = "يا عالم"
  }
  fmt.Fprintf(w, "أهلًا %s\n", name)
}
~~~

### شكل الدالة

أي handler في Go لازم يبقى بالشكل ده بالظبط: بياخد حاجتين ومبيرجّعش حاجة.

| الـ parameter | النوع | هو إيه |
|---|---|---|
| [[w]] | [[http.ResponseWriter]] | الرد اللي هيرجع لليوزر. انت **بتكتب** فيه |
| [[r]] | [[*http.Request]] | الطلب اللي جه. انت **بتقرا** منه |

النجمة في [[*http.Request]] معناها pointer: السيرفر بيدّيك عنوان الطلب مش نسخة منه (درس الـ pointers).

### [[r.URL.Query().Get("name")]] من جوه لبرة

1. [[r.URL]]: الـ URL اللي اليوزر طلبه، متفكك لأجزاء.
2. [[.Query()]]: الجزء اللي بعد [[?]] (اسمه query string)، متحوّل لـ map. يعني [[?name=Sara&age=20]] تبقى name و age.
3. [[.Get("name")]]: قيمة name. ولو مش موجودة بترجّع [[""]] (نص فاضي)، مش error.

عشان كده الـ [[if name == ""]] بتحط قيمة افتراضية.

### [[fmt.Fprintf(w, ...)]]

الـ F في أول الاسم معناها File، يعني «اكتب في الحاجة دي» بدل الشاشة. و [[w]] بيحقق الـ interface اللي اسمه [[io.Writer]] (درس io.Reader و io.Writer)، فـ Fprintf تقدر تكتب فيه. و [[%s]] بتتبدّل بالـ name.

مكتبناش status: أول كتابة في الـ body بتبعت [[200 OK]] لوحدها.

---

## ٣. التاني: [[health]]

~~~go main.go
func health(w http.ResponseWriter, r *http.Request) {
  w.Header().Set("Content-Type", "application/json")
  w.WriteHeader(http.StatusOK)
  w.Write([]byte($__bt{"status":"ok"}$__bt + "\n"))
}
~~~

هنا بنكتب الرد على ٣ خطوات، **وبالترتيب ده لازم**:

1. [[w.Header().Set("Content-Type", "application/json")]]: [[Header()]] بترجّع الـ headers اللي لسه متبعتتش، و [[Set]] بتحط واحد. [[Content-Type]] بيقول للي بيقرا الرد «ده JSON».
2. [[w.WriteHeader(http.StatusOK)]]: ابعت سطر الـ status. [[http.StatusOK]] ثابت قيمته 200، أوضح من كتابة الرقم.
3. [[w.Write(...)]]: الـ body. [[Write]] بتاخد [[[]byte]] (bytes) مش string، فبنحوّل بـ [[[]byte(...)]].

والنص [[$__bt{"status":"ok"}$__bt]] بين backticks: ده **raw string** في Go، اللي جوّاه بيتاخد زي ما هو، فمش محتاجين نعمل escape للـ [["]]. وبنزوّد [["\n"]] عادي بـ [[+]] عشان سطر جديد.

### ليه الترتيب مهم؟

أول ما الـ body يبدأ يتبعت، الـ status والـ headers بيكونوا راحوا خلاص. جرّبت handler بيكتب الـ body الأول وبعدين يحط header ويعمل [[WriteHeader(201)]]:

~~~text الناتج: curl -si
HTTP/1.1 200 OK
Date: Wed, 07 Oct 2026 16:39:21 GMT
Content-Length: 5
Content-Type: text/plain; charset=utf-8

body
~~~

~~~text لوج السيرفر
2026/10/07 16:39:21 http: superfluous response.WriteHeader call from main.main.func1 (main.go:13)
~~~

الـ status فضل 200، والـ header الجديد ([[X-Late]]) مظهرش خالص، والسيرفر كتب تحذير [[superfluous]] (يعني «زيادة ملهوش لازمة»).

---

## ٤. [[main]]: الـ router وتشغيل السيرفر

~~~go main.go
func main() {
  mux := http.NewServeMux()
  mux.HandleFunc("/hello", hello)
  mux.HandleFunc("/health", health)

  log.Println("listening on http://localhost:8080")
  log.Fatal(http.ListenAndServe(":8080", mux))
}
~~~

- [[http.NewServeMux()]]: بيعمل router فاضي. mux اختصار multiplexer، يعني حاجة بتوزّع: كل طلب يروح للـ handler بتاع مساره.
- [[mux.HandleFunc("/hello", hello)]]: اربط المسار [[/hello]] بالدالة [[hello]]. لاحظ إننا بنبعت اسم الدالة من غير [[()]]: بنديله الدالة نفسها عشان ينادهيا هو بعدين، مش نتيجتها.
- [[log.Println(...)]]: سطر بالوقت، عشان تعرف إن السيرفر قام.

### [[log.Fatal(http.ListenAndServe(":8080", mux))]] من جوه لبرة

1. [[":8080"]]: العنوان. مفيش IP قبل الـ [[:]]، فمعناه «كل الـ interfaces على البورت 8080».
2. [[http.ListenAndServe(addr, mux)]]: افتح البورت واستقبل الطلبات ووزّعها على الـ mux. الدالة دي **مبترجعش** طول ما السيرفر شغال. بترجع بس لو حصل error.
3. [[log.Fatal(err)]]: اطبع الـ error واخرج بـ exit code 1.

وكل طلب السيرفر بيشغّله في goroutine لوحده، فطلب بطيء مش بيوقّف الباقي.

---

## ٥. التجربة بـ curl

شغّلت السيرفر:

~~~text الناتج: go run .
2026/10/07 16:39:09 listening on http://localhost:8080
~~~

ومن ترمنال تاني:

~~~bash
curl localhost:8080/hello
curl "localhost:8080/hello?name=Sara"
~~~

~~~text الناتج
أهلًا يا عالم
أهلًا Sara
~~~

الـ URL التاني بين علامتين تنصيص لأن [[?]] و [[&]] ليهم معنى في الـ shell.

### [[-i]]: وريني الـ headers

[[-i]] (include) بتخلّي curl يطبع سطر الـ status والـ headers قبل الـ body:

~~~text الناتج: curl -i localhost:8080/health
HTTP/1.1 200 OK
Content-Type: application/json
Date: Wed, 07 Oct 2026 16:39:10 GMT
Content-Length: 16

{"status":"ok"}
~~~

- [[Content-Type]] هو اللي حطيناه.
- [[Date]] و [[Content-Length]] السيرفر حطهم لوحده. و 16 = 15 حرف في [[{"status":"ok"}]] + السطر الجديد.

### مسار مش موجود

~~~text الناتج: curl -i localhost:8080/nothing
HTTP/1.1 404 Not Found
Content-Type: text/plain; charset=utf-8
X-Content-Type-Options: nosniff
Date: Wed, 07 Oct 2026 16:39:10 GMT
Content-Length: 19

404 page not found
~~~

الـ mux رد 404 لوحده.

### [[-X DELETE]]: method تانية

[[-X]] بتحدد الـ HTTP method (الافتراضي GET):

~~~text الناتج: curl -i -X DELETE localhost:8080/hello
HTTP/1.1 200 OK
Date: Wed, 07 Oct 2026 16:39:10 GMT
Content-Length: 25
Content-Type: text/plain; charset=utf-8

أهلًا يا عالم
~~~

ردّ عادي! الـ pattern [["/hello"]] من غير method بيقبل أي method. والدرس الجاي بيعلّمك [["GET /hello"]].

ولاحظ حاجتين:
- [[Content-Length: 25]] مع إن النص ١٣ حرف: لأن الحروف العربي كل واحد بـ 2 bytes في UTF-8، والطول بالـ bytes.
- [[Content-Type: text/plain; charset=utf-8]]: احنا محطيناش Content-Type، فالسيرفر بص على أول bytes من الرد وخمّن النوع لوحده.

### نسخة تانية والبورت مشغول

~~~text الناتج
2026/10/07 16:39:10 listening on http://localhost:8080
2026/10/07 16:39:10 listen tcp :8080: bind: address already in use
exit status 1
~~~

[[ListenAndServe]] رجعت على طول بـ error، و [[log.Fatal]] طبعته وخرجت بـ 1. و [[exit status 1]] ده [[go run]] اللي بيطبعه.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[func(w http.ResponseWriter, r *http.Request)]] | شكل أي handler |
| [[r.URL.Query().Get("x")]] | قيمة من الـ query string، أو [[""]] |
| [[w.Header().Set(k, v)]] | header، قبل أي كتابة |
| [[w.WriteHeader(code)]] | الـ status، مرة واحدة وقبل الـ body |
| [[w.Write]] / [[fmt.Fprintf(w, ...)]] | الـ body، وأول كتابة بتبعت 200 لو مكتبتش status |
| [[http.NewServeMux()]] + [[HandleFunc]] | router يربط المسارات بالدوال |
| [[log.Fatal(http.ListenAndServe(":8080", mux))]] | شغّل، ولو وقع اطبع واخرج |

- الترتيب: headers ثم status ثم body.
- [["/hello"]] من غير method بيقبل GET و DELETE وأي حاجة.
- كل طلب في goroutine، فأي داتا مشتركة محتاجة Mutex.`,
          lines: [
            "باكدج main.",
            "imports.",
            "fmt.",
            R`[[log]]: طباعة بوقت، و Fatal.`,
            "net/http.",
            "قفلة.",
            "handler: بياخد الرد والطلب.",
            R`query string: [[?name=...]]، و "" لو مش موجود.`,
            "لو مفيش اسم...",
            "...قيمة افتراضية.",
            "قفلة.",
            R`اكتب في الرد (w Writer)، والـ status 200 لوحده.`,
            "قفلة.",
            "handler تاني.",
            "header قبل أي حاجة.",
            "status صريح.",
            R`الـ body: [[[]byte]] من نص.`,
            "قفلة.",
            "main.",
            "router.",
            "اربط المسار بالدالة.",
            "مسار تاني.",
            "رسالة بوقت.",
            "شغّل السيرفر، ولو رجع يبقى error فاقفل.",
            "قفلة."
          ],
          sol: R`[[curl localhost:8080/hello]]: [[أهلًا يا عالم]]. ومع [[?name=Sara]]: [[أهلًا Sara]].

[[curl -i localhost:8080/health]]:
[[HTTP/1.1 200 OK]]
[[Content-Type: application/json]]
و [[{"status":"ok"}]].

[[/nothing]]: [[HTTP/1.1 404 Not Found]] و [[404 page not found]].

و [[-X DELETE]] على /hello: بيرد [[أهلًا يا عالم]] عادي بـ 200. الـ mux بالشكل ده مش بيفرّق بين الـ methods، والدرس الجاي بيحل ده.

والنسخة التانية بتقع على طول: [[listen tcp :8080: bind: address already in use]] و exit status 1.`
        },
        {
          cmd: "ServeMux و PathValue",
          title: "الـ routing من Go 1.22: \"GET /users/{id}\" و r.PathValue",
          desc: R`من Go 1.22 الـ ServeMux بقى بيفهم method وparameters في المسار، فبقى كفاية لأغلب الـ APIs من غير router خارجي:
• [[mux.HandleFunc("GET /users", list)]]: GET بس. ([[GET]] كمان بيطابق HEAD.)
• [[mux.HandleFunc("POST /users", create)]]: نفس المسار بـ method تاني، handler تاني.
• [["GET /users/{id}"]]: [[{id}]] جزء متغيّر، وبتقراه بـ [[r.PathValue("id")]] (string دايمًا، فحوّله).
• [["GET /files/{path...}"]]: الـ [[...]] في آخر اسم معناها «الباقي كله»، حتى لو فيه [[/]].
• [["GET /{$}"]]: [[{$}]] معناها «المسار ده بالظبط»، فـ [[/]] تطابق الصفحة الرئيسية بس مش كل حاجة.

ولو حد طلب method مش موجودة لمسار موجود، الـ mux بيرد [[405 Method Not Allowed]] مع header [[Allow]] فيه المسموح. والمسار مش موجود: 404.

ولو مسارين ممكن يطابقوا نفس الطلب، الأكثر تحديدًا بيكسب ([[/users/new]] قبل [[/users/{id}]]).

[[http.Error(w, "msg", code)]] بتكتب رسالة نصية بالـ status في سطر. وبعدها لازم [[return]].

وبنستخدم دوال من غير اسم كـ handlers مباشرة لأن المثال صغير. في المشروع الحقيقي بتبقى methods على struct فيه الـ dependencies (شوف درس المشروع في المستوى ٣).`,
          example: R`package main

import (
  "fmt"
  "log"
  "net/http"
  "strconv"
)

func main() {
  mux := http.NewServeMux()

  mux.HandleFunc("GET /users", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "list users")
  })
  mux.HandleFunc("POST /users", func(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusCreated)
    fmt.Fprintln(w, "created")
  })
  mux.HandleFunc("GET /users/{id}", func(w http.ResponseWriter, r *http.Request) {
    id, err := strconv.Atoi(r.PathValue("id"))
    if err != nil {
      http.Error(w, "id must be a number", http.StatusBadRequest)
      return
    }
    fmt.Fprintf(w, "user %d\n", id)
  })
  mux.HandleFunc("GET /files/{path...}", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "file:", r.PathValue("path"))
  })
  mux.HandleFunc("GET /{$}", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "home")
  })

  log.Fatal(http.ListenAndServe(":8080", mux))
}`,
          try: R`جرّب بـ curl: [[curl localhost:8080/users/42]] و [[curl localhost:8080/users/abc]] و [[curl -i -X DELETE localhost:8080/users]] و [[curl localhost:8080/files/a/b/c.txt]] و [[curl -i localhost:8080/]] و [[curl -i localhost:8080/xyz]]. وبعدين ضيف [["DELETE /users/{id}"]] بيرد 204 من غير body.`,
          flag: "script",
          deep: {
            why: R`قبل 1.22 كنت محتاج gorilla/mux أو chi عشان حاجة بسيطة زي [[/users/{id}]] أو التفريق بين GET و POST، أو تكتب switch على [[r.Method]] في كل handler. دلوقتي المكتبة القياسية بتعمل ده، وده بيقلل الـ dependencies.`,
            how: R`الـ pattern شكله [[[METHOD ][HOST]/PATH]]. المسافة بين الـ method والمسار مهمة (مسافة واحدة).

الأولوية: لو pattern أكثر تحديدًا من التاني (كل حاجة بيطابقها التاني بيطابقها هو)، هو اللي بيكسب، مهما كان ترتيب التسجيل. ولو اتنين متعارضين ومفيش واحد أكثر تحديدًا، [[HandleFunc]] بيعمل panic وقت التسجيل، فتعرف بدري.

[[r.PathValue("id")]] بيرجّع "" لو الاسم مش في الـ pattern. والقيمة متفكوكة من الـ URL encoding.

[[http.StatusCreated]] = 201، و [[http.StatusBadRequest]] = 400، و [[http.StatusNoContent]] = 204.

ولو go.mod بتاعك فيه سطر [[go]] أقدم من 1.22، الـ mux بيرجع للسلوك القديم (مش بيفهم methods ولا {}). ده إعداد اسمه [[GODEBUG=httpmuxgo121]].`,
            when: R`أي REST API عادي. لو محتاج groups بـ middleware مختلفة لكل جزء، أو regex في المسارات، chi بتسهّل ده (المستوى ٣)، بس ابدأ بالقياسي.`,
            mistakes: R`تنسى المسافة: [["GET/users"]]. وتنسى [[return]] بعد [[http.Error]] فالكود يكمّل ويكتب رد تاني. و [["GET /"]] من غير [[{$}]] فبتمسك أي مسار مش متعرّف وترد عليه بالصفحة الرئيسية بدل 404. ومشروع go.mod بتاعه قديم فالـ patterns متشتغلش.`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

نفس سيرفر الدرس اللي فات، بس الـ patterns بقت فيها **method** ([[GET]] و [[POST]]) و **أجزاء متغيّرة** ([[{id}]]). فيه ٥ مسارات:

| الـ pattern | بيطابق إيه |
|---|---|
| [["GET /users"]] | GET على [[/users]] بالظبط |
| [["POST /users"]] | POST على نفس المسار، handler تاني |
| [["GET /users/{id}"]] | [[/users/42]] و [[/users/abc]] و أي حاجة مكان {id} |
| [["GET /files/{path...}"]] | [[/files/]] وأي حاجة بعدها، حتى لو فيها [[/]] |
| [["GET /{$}"]] | [[/]] بس |

الناتج من [[go build]] وتشغيل الـ binary جوه [[docker run --rm golang:1.25]] (Go 1.25.14)، و curl من نفس الـ container.

---

## ١. import جديد: [[strconv]]

~~~go main.go
import (
  "fmt"
  "log"
  "net/http"
  "strconv"
)
~~~

[[strconv]] (string conversion) فيها دوال تحوّل من نص لأرقام وبالعكس. هنحتاجها لأن الـ id اللي في المسار بيجي نص.

---

## ٢. الـ handlers كدوال من غير اسم

~~~go main.go
  mux.HandleFunc("GET /users", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "list users")
  })
~~~

بدل ما نعرّف [[func listUsers(...)]] فوق ونبعت اسمها، بنكتب الدالة نفسها مكان الـ parameter. ده اسمه **function literal** (دالة من غير اسم). نفس الشكل بالظبط: [[(w http.ResponseWriter, r *http.Request)]]. والـ [[})]] في الآخر: [[}]] بتقفل الدالة و [[)]] بتقفل [[HandleFunc(]].

### [["GET /users"]]

- الكلمة الأولى method، وبعدها **مسافة واحدة**، وبعدها المسار.
- [[GET]] بيطابق [[HEAD]] كمان (HEAD زي GET بس من غير body). جرّبت [[curl -I]] (اللي بيبعت HEAD):

~~~text الناتج: curl -sI localhost:8080/users
HTTP/1.1 200 OK
Date: Wed, 07 Oct 2026 16:41:05 GMT
Content-Length: 11
Content-Type: text/plain; charset=utf-8
~~~

[[Content-Length: 11]] طول [[list users]] + السطر الجديد، بس الـ body نفسه متبعتش.

- [[fmt.Fprintln(w, ...)]]: زي Fprintf بس من غير قالب، وبتزوّد سطر جديد في الآخر.

---

## ٣. نفس المسار بـ method تانية

~~~go main.go
  mux.HandleFunc("POST /users", func(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusCreated)
    fmt.Fprintln(w, "created")
  })
~~~

[[http.StatusCreated]] = 201، الكود المعتاد لما حاجة جديدة تتعمل.

~~~text الناتج: curl -i -X POST localhost:8080/users
HTTP/1.1 201 Created
Date: Wed, 07 Oct 2026 16:41:05 GMT
Content-Length: 8
Content-Type: text/plain; charset=utf-8

created
~~~

### method مش متسجّلة: 405

~~~text الناتج: curl -i -X DELETE localhost:8080/users
HTTP/1.1 405 Method Not Allowed
Allow: GET, HEAD, POST
Content-Type: text/plain; charset=utf-8
X-Content-Type-Options: nosniff
Date: Wed, 07 Oct 2026 16:41:05 GMT
Content-Length: 19

Method Not Allowed
~~~

المسار موجود بس مش بـ DELETE، فالـ mux رد 405 لوحده، وحط header [[Allow]] بالـ methods المسموحة. HEAD موجودة فيه لأن GET بتغطيها.

---

## ٤. [[{id}]] و [[r.PathValue]]

~~~go main.go
  mux.HandleFunc("GET /users/{id}", func(w http.ResponseWriter, r *http.Request) {
    id, err := strconv.Atoi(r.PathValue("id"))
    if err != nil {
      http.Error(w, "id must be a number", http.StatusBadRequest)
      return
    }
    fmt.Fprintf(w, "user %d\n", id)
  })
~~~

### من جوه لبرة

1. [[{id}]] في الـ pattern: جزء واحد من المسار (من غير [[/]]) اسمه id.
2. [[r.PathValue("id")]]: قيمته، **نص دايمًا**. في [[/users/42]] بترجّع [["42"]].
3. [[strconv.Atoi(...)]]: Atoi = ASCII to integer. بتحوّل [["42"]] لـ 42، وبترجّع error لو النص مش رقم.
4. [[id, err :=]]: الدالة بترجّع قيمتين، فبنستلمهم الاتنين.

### لو مش رقم

- [[http.Error(w, msg, code)]]: سطر واحد بيحط [[Content-Type: text/plain]] ويكتب الـ status والرسالة.
- [[http.StatusBadRequest]] = 400: «الطلب نفسه غلط».
- [[return]]: **لازم**. [[http.Error]] مش بتوقف الدالة، فمن غيرها الكود هيكمّل ويكتب [[user 0]] بعد رسالة الغلط.
- [[%d]] في Fprintf: رقم صحيح.

~~~text الناتج: curl -i localhost:8080/users/42
HTTP/1.1 200 OK
Date: Wed, 07 Oct 2026 16:41:05 GMT
Content-Length: 8
Content-Type: text/plain; charset=utf-8

user 42
~~~

~~~text الناتج: curl -i localhost:8080/users/abc
HTTP/1.1 400 Bad Request
Content-Type: text/plain; charset=utf-8
X-Content-Type-Options: nosniff
Date: Wed, 07 Oct 2026 16:41:05 GMT
Content-Length: 20

id must be a number
~~~

[[X-Content-Type-Options: nosniff]] بيحطها [[http.Error]] عشان المتصفح ميحاولش يخمّن نوع الرد.

### القيمة متفكوكة من الـ URL encoding

جرّبت بـ [[httptest]] (سيرفر جوه البرنامج من غير بورت، هتشوفه في المستوى ٣) طلب [[/users/a%20b]] ([[%20]] هي المسافة في الـ URL):

~~~text الناتج
/users/a%20b -> 200 id="a b"
~~~

---

## ٥. الأكثر تحديدًا بيكسب

لو سجّلت [["GET /users/new"]] جنب [["GET /users/{id}"]]، الطلب [[/users/new]] بيطابق الاتنين. Go بيختار [[/users/new]] لأنه **أكثر تحديدًا**: أي حاجة بيطابقها هو بيطابقها {id}، والعكس لأ. والترتيب اللي سجّلت بيه مش فارق:

~~~text الناتج
/users/new -> 200 new form
/users/7 -> 200 id="7"
~~~

ولو اتنين بيتقاطعوا ومفيش واحد أكثر تحديدًا، [[HandleFunc]] بيعمل panic وقت التسجيل، قبل ما السيرفر يقوم:

~~~text الناتج: GET /users/{id} و GET /{name}/1
panic: pattern "GET /{name}/1" (registered at /w/l2c/main.go:9) conflicts with pattern "GET /users/{id}" (registered at /w/l2c/main.go:8):
	GET /{name}/1 and GET /users/{id} both match some paths, like "/users/1".
	But neither is more specific than the other.
	GET /{name}/1 matches "/name/1", but GET /users/{id} doesn't.
~~~

---

## ٦. [[{path...}]]: الباقي كله

~~~go main.go
  mux.HandleFunc("GET /files/{path...}", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "file:", r.PathValue("path"))
  })
~~~

[[{id}]] العادية بتاخد جزء واحد بس. الـ [[...]] بعد الاسم (ومسموحة في آخر الـ pattern بس) معناها «كل اللي باقي»:

~~~text الناتج: curl localhost:8080/files/a/b/c.txt
file: a/b/c.txt
~~~

[[Fprintln]] بتحط مسافة بين [["file:"]] والقيمة لوحدها.

---

## ٧. [[{$}]]: الصفحة الرئيسية بس

~~~go main.go
  mux.HandleFunc("GET /{$}", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "home")
  })
~~~

أي pattern بيخلص بـ [[/]] بيطابق كل اللي تحته. يعني [["GET /"]] لوحدها بتطابق **أي مسار**. و [[{$}]] معناها «المسار يخلص هنا»:

~~~text الناتج
curl localhost:8080/       ->  home
curl -i localhost:8080/xyz ->  HTTP/1.1 404 Not Found ... 404 page not found
~~~

شلت [[{$}]] وخليتها [["GET /"]] وجرّبت تاني:

~~~text الناتج: curl localhost:8080/xyz
home
~~~

المسار الغلط بقى بيرد بالصفحة الرئيسية بـ 200 بدل 404.

---

## ٨. الحل: DELETE بـ 204

~~~go solCode
mux.HandleFunc("DELETE /users/{id}", func(w http.ResponseWriter, r *http.Request) {
  log.Println("delete", r.PathValue("id"))
  w.WriteHeader(http.StatusNoContent)
})
~~~

- [[http.StatusNoContent]] = 204: «تمام، ومفيش body». فبنكتب الـ status بس.
- [[log.Println]]: سطر في لوج السيرفر.

~~~text الناتج: curl -i -X DELETE localhost:8080/users/42
HTTP/1.1 204 No Content
Date: Wed, 07 Oct 2026 16:41:14 GMT
~~~

~~~text لوج السيرفر
2026/10/07 16:41:14 delete 42
~~~

و [[Allow]] بتاعة [[/users/42]] بقت فيها DELETE:

~~~text الناتج: curl -i -X PUT localhost:8080/users/42
HTTP/1.1 405 Method Not Allowed
Allow: DELETE, GET, HEAD
~~~

---

## ٩. فخّين بيعدّوا من غير error

### نسيت المسافة: [["GET/users/new"]]

مفيش error ولا panic. Go بيفهم [[GET]] على إنه **اسم host** (الـ pattern ممكن يبدأ بدومين)، فالمسار ده عمره ما هيطابق طلب على localhost، والطلب بيروح لـ {id}:

~~~text الناتج
/users/new -> 200 id="new"
~~~

### go.mod قديم

نفس البرنامج، بس غيّرت سطر [[go 1.25]] في go.mod لـ [[go 1.21]]:

~~~text الناتج
/users/new -> 404 404 page not found
/users/7 -> 404 404 page not found
~~~

الـ mux رجع للسلوك القديم، فـ [["GET /users/{id}"]] بقت مسار حرفي مش بيطابق حاجة. السطر ده في go.mod بيتحط لوحده من [[go mod init]] بنسخة Go اللي عندك.

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [["GET /path"]] | method + مسافة واحدة + مسار. GET بتغطي HEAD |
| [[{id}]] + [[r.PathValue("id")]] | جزء متغيّر، بيرجع نص |
| [[{path...}]] | كل الباقي، حتى بالـ [[/]] |
| [[{$}]] | المسار بالظبط، مش كل اللي تحته |
| method غلط | 405 + header [[Allow]] لوحده |
| [[http.Error(w, msg, code)]] + [[return]] | رد خطأ نصي، ولازم return بعده |

- الأكثر تحديدًا بيكسب، والتعارض بيعمل panic وقت التسجيل.
- لازم [[go 1.22]] أو أحدث في go.mod.`,
          lines: [
            "باكدج main.",
            "imports.",
            "fmt.",
            "log.",
            "net/http.",
            "strconv.",
            "قفلة.",
            "main.",
            "router.",
            "GET على /users بس.",
            "قايمة.",
            "قفلة.",
            "POST على نفس المسار: handler تاني.",
            "201 Created.",
            "body.",
            "قفلة.",
            R`[[{id}]]: جزء متغيّر.`,
            R`[[r.PathValue("id")]] نص، فحوّله رقم.`,
            "مش رقم...",
            "...400 برسالة.",
            "ولازم return.",
            "قفلة.",
            "رد.",
            "قفلة.",
            R`[[{path...}]]: كل الباقي من المسار.`,
            R`ممكن يبقى فيه [[/]].`,
            "قفلة.",
            R`[[{$}]]: [[/]] بالظبط بس.`,
            "الرئيسية.",
            "قفلة.",
            "شغّل.",
            "قفلة."
          ],
          sol: R`[[/users/42]]: [[user 42]]. و [[/users/abc]]: [[id must be a number]] بـ 400.

[[-X DELETE /users]]:
[[HTTP/1.1 405 Method Not Allowed]]
[[Allow: GET, HEAD, POST]]
والـ mux عمل ده لوحده.

[[/files/a/b/c.txt]]: [[file: a/b/c.txt]]. و [[/]]: [[home]]. و [[/xyz]]: [[404 page not found]] (من غير [[{$}]] كانت هترد home).

والـ DELETE (الكود تحت) بترد [[HTTP/1.1 204 No Content]] من غير body، و [[Allow]] بتاعة [[/users/42]] بقت فيها DELETE.`,
          solCode: R`mux.HandleFunc("DELETE /users/{id}", func(w http.ResponseWriter, r *http.Request) {
  log.Println("delete", r.PathValue("id"))
  w.WriteHeader(http.StatusNoContent)
})`
        },
        {
          cmd: "encoding/json",
          title: "JSON: الـ struct tags، و Marshal و Unmarshal، وتقرا body الطلب بأمان",
          desc: R`[[encoding/json]] بتحوّل struct لـ JSON وبالعكس:
• [[json.Marshal(v)]]: من struct لـ [[[]byte]] فيها JSON.
• [[json.Unmarshal(data, &v)]]: من JSON لـ struct. بتاخد pointer عشان تملاه.
• [[json.NewEncoder(w).Encode(v)]] و [[json.NewDecoder(r).Decode(&v)]]: نفس الكلام بس مباشرة على Writer و Reader (الرد والطلب في HTTP).

الـ struct tags: كلام بين backticks بعد نوع الحقل بيقول لـ json تتعامل معاه إزاي:
• [[json:"id"]]: اسم المفتاح في JSON (بدل ID).
• [[json:"tags,omitempty"]]: متطلّعوش لو فاضي (nil أو صفر أو "").
• [[json:"-"]]: متطلّعوش خالص (باسورد، حاجات داخلية).
• [[omitzero]] (Go 1.24+): زي omitempty بس بيفهم القيمة الصفرية للـ structs زي [[time.Time]].

قانون مهم: json بتشوف الحقول exported بس (حرف كبير). الحقل [[secret]] بحرف صغير مش هيتطلع ولا هيتقري أبدًا.

ولما تقرا body من يوزر:
• [[dec.DisallowUnknownFields()]]: ارفض أي مفتاح مش في الـ struct (بيمسك الأخطاء الإملائية زي nmae).
• [[http.MaxBytesReader]]: حد أقصى للحجم، عشان محدش يبعتلك جيجا.`,
          example: R`package main

import (
  "encoding/json"
  "fmt"
  "strings"
)

type Product struct {
  ID       int      $__btjson:"id"$__bt
  Name     string   $__btjson:"name"$__bt
  Price    float64  $__btjson:"price"$__bt
  Tags     []string $__btjson:"tags,omitempty"$__bt
  Internal string   $__btjson:"-"$__bt
  secret   string
}

func main() {
  p := Product{ID: 1, Name: "كيبورد", Price: 750, Internal: "x", secret: "y"}
  b, err := json.Marshal(p)
  if err != nil {
    panic(err)
  }
  fmt.Println(string(b))

  var in Product
  err = json.Unmarshal([]byte($__bt{"id":2,"name":"ماوس","price":199.5,"tags":["usb"]}$__bt), &in)
  fmt.Printf("%+v %v\n", in, err)

  dec := json.NewDecoder(strings.NewReader($__bt{"id":3,"nmae":"typo"}$__bt))
  dec.DisallowUnknownFields()
  var bad Product
  fmt.Println(dec.Decode(&bad))

  pretty, _ := json.MarshalIndent(map[string]any{"ok": true, "count": 2}, "", "  ")
  fmt.Println(string(pretty))
}`,
          try: R`ضيف حقل [[CreatedAt time.Time]] بـ tag [[json:"created_at"]] واطبع الـ JSON. وبعدين جرّب Unmarshal لـ [[{"id":"7"}]] (الـ id نص) واقرا الـ error. وبعدين ابعت [[{"price":-5}]] وفكّر: مين المسؤول يرفض السعر السالب؟`,
          flag: "script",
          deep: {
            why: R`كل API بتاخد وترجّع JSON. والـ tags بتفصل شكل الـ JSON (snake_case زي الفرونت إند عايز) عن أسماء Go (PascalCase عشان exported)، وبتمنع تسريب حقول زي password_hash بـ [[json:"-"]].`,
            how: R`json بتقرا الـ tags وقت التشغيل بالـ reflection. Unmarshal بتطابق المفاتيح من غير ما تفرّق بين الحروف الكبيرة والصغيرة ([["NAME"]] تملا Name)، وبتتجاهل المفاتيح اللي مش في الـ struct إلا لو DisallowUnknownFields.

المفاتيح الناقصة في JSON بتسيب الحقل بقيمته الصفرية، فمش هتعرف تفرّق بين «مبعتش price» و «بعت 0». لو الفرق مهم استخدم pointer [[*float64]]: nil يبقى مبعتش.

[[MarshalIndent(v, "", "  ")]]: JSON منسّق بمسافتين. والـ map بيتطلع بمفاتيح مترتبة.

json مش بتعمل validation: السعر السالب هيتقري عادي. التحقق شغلك انت بعد الـ decode (if بسيطة، أو مكتبة زي go-playground/validator).

وفيه [[encoding/json/v2]] تجريبية في Go 1.25 (بـ [[GOEXPERIMENT=jsonv2]])، أسرع وأصرم، بس الـ v1 هو اللي في كل الكود دلوقتي.`,
            when: R`Encoder و Decoder مع HTTP مباشرة (من غير ما تقرا الـ body كله الأول). Marshal و Unmarshal لما الداتا في الذاكرة أصلًا (من ملف أو Redis). DisallowUnknownFields و MaxBytesReader لأي body جاي من بره.`,
            mistakes: R`حقول بحرف صغير فالـ JSON يطلع [[{}]]. وتنسى [[&]] في Unmarshal. ومسافة في الـ tag ([[json: "id"]]): بيتجاهله، و go vet بيمسكها. وتتجاهل الـ error بتاع Decode فـ struct فاضي يتحفظ في الداتابيز. وترجّع struct الداتابيز نفسه فيه PasswordHash من غير [[json:"-"]].`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

٤ تجارب على [[encoding/json]] ورا بعض:

1. struct لـ JSON بـ [[json.Marshal]]، ونشوف الـ tags بتغيّر إيه.
2. JSON لـ struct بـ [[json.Unmarshal]].
3. Decoder بيرفض مفتاح مكتوب غلط.
4. JSON منسّق من map.

الناتج من [[go run .]] جوه [[docker run --rm golang:1.25]] (Go 1.25.14).

---

## ١. الـ imports

~~~go main.go
import (
  "encoding/json"
  "fmt"
  "strings"
)
~~~

- [[encoding/json]]: التحويل من وإلى JSON.
- [[strings]]: هنستخدم منها [[strings.NewReader]] اللي بتحوّل نص لـ [[io.Reader]]، عشان نمثّل body طلب.

---

## ٢. الـ struct والـ tags

~~~go main.go
type Product struct {
  ID       int      $__btjson:"id"$__bt
  Name     string   $__btjson:"name"$__bt
  Price    float64  $__btjson:"price"$__bt
  Tags     []string $__btjson:"tags,omitempty"$__bt
  Internal string   $__btjson:"-"$__bt
  secret   string
}
~~~

كل سطر: اسم الحقل، ونوعه، وبعدين **tag** بين backticks. الـ tag نص عادي Go بيلزقه في الحقل، ومكتبة json بتقراه وقت التشغيل.

| الحقل | الـ tag | النتيجة في JSON |
|---|---|---|
| [[ID int]] | [[json:"id"]] | المفتاح اسمه [[id]] بدل [[ID]] |
| [[Price float64]] | [[json:"price"]] | [[float64]] رقم بكسور |
| [[Tags []string]] | [[json:"tags,omitempty"]] | [[[]string]] قايمة نصوص، و [[omitempty]] يعني «لو فاضية متطلعهاش» |
| [[Internal string]] | [[json:"-"]] | [[-]] يعني «متطلعهوش خالص» |
| [[secret string]] | مفيش | حرف صغير = unexported، و json **مش شايفاه** أصلًا |

الشكل: [[json:"اسم,اختيارات"]]، من غير أي مسافة بعد [[json:]].

---

## ٣. [[json.Marshal]]: من struct لـ JSON

~~~go main.go
  p := Product{ID: 1, Name: "كيبورد", Price: 750, Internal: "x", secret: "y"}
  b, err := json.Marshal(p)
  if err != nil {
    panic(err)
  }
  fmt.Println(string(b))
~~~

- [[Product{ID: 1, ...}]]: struct literal بأسماء الحقول. Tags مش متكتوبة، فهي nil.
- [[json.Marshal(p)]]: بترجّع [[[]byte]] فيها الـ JSON، و error. الـ error نادر مع struct عادي (بيحصل مع حاجات زي channel أو دالة جوه الـ struct).
- [[panic(err)]]: وقّف البرنامج. هنا مقبول لأنه مثال.
- [[string(b)]]: حوّل الـ bytes لنص عشان نطبعه.

~~~text الناتج
{"id":1,"name":"كيبورد","price":750}
~~~

- [[tags]] اختفت: nil، و omitempty.
- [[Internal]] اختفى: [[json:"-"]].
- [[secret]] اختفى: حرف صغير.
- [[750]] من غير [[.0]]: JSON مفيهوش فرق بين int و float.

---

## ٤. [[json.Unmarshal]]: من JSON لـ struct

~~~go main.go
  var in Product
  err = json.Unmarshal([]byte($__bt{"id":2,"name":"ماوس","price":199.5,"tags":["usb"]}$__bt), &in)
  fmt.Printf("%+v %v\n", in, err)
~~~

- [[var in Product]]: struct فاضي، كل حقوله بقيمتها الصفرية.
- [[[]byte(...)]]: Unmarshal بتاخد bytes، فبنحوّل النص. والنص raw string بين backticks عشان الـ [["]] جوّاه.
- [[&in]]: **عنوان** in. Unmarshal محتاجة pointer عشان تكتب في المتغير نفسه، مش في نسخة منه.
- [[err =]] من غير [[:]]: err متعرّف فوق.
- [[%+v]]: اطبع الـ struct **بأسماء الحقول**. و [[%v]] للـ error.

~~~text الناتج
{ID:2 Name:ماوس Price:199.5 Tags:[usb] Internal: secret:} <nil>
~~~

[[Internal:]] و [[secret:]] فاضيين: الأول عليه [[-]] والتاني مش ظاهر لـ json. و [[<nil>]] يعني مفيش error.

### لو نسيت الـ [[&]]

~~~text الناتج: json.Unmarshal(data, q)
json: Unmarshal(non-pointer main.Product)
~~~

وكمان [[go vet]] بيمسكها قبل التشغيل:

~~~text الناتج: go vet .
./main.go:31:29: call of Unmarshal passes non-pointer as second argument
~~~

---

## ٥. Decoder بيرفض المفاتيح الغريبة

~~~go main.go
  dec := json.NewDecoder(strings.NewReader($__bt{"id":3,"nmae":"typo"}$__bt))
  dec.DisallowUnknownFields()
  var bad Product
  fmt.Println(dec.Decode(&bad))
~~~

- [[json.NewDecoder(r)]]: Decoder بيقرا من أي [[io.Reader]]. في السيرفر الـ Reader ده هو [[r.Body]]، وهنا نص بيمثّله.
- [[dec.DisallowUnknownFields()]]: أي مفتاح مش في الـ struct يبقى error. من غيرها [[nmae]] كانت هتتجاهل بهدوء، والـ Name هيفضل فاضي.
- [[dec.Decode(&bad)]]: اقرا JSON واحد واملا bad. بترجّع error بس.

~~~text الناتج
json: unknown field "nmae"
~~~

### ومن غير DisallowUnknownFields؟

json بتتجاهل الغريب، وبتطابق المفاتيح من غير ما تفرّق بين الكبير والصغير، ومبتعملش validation. جرّبت [[{"price":-5,"NAME":"caps"}]] بـ Unmarshal:

~~~text الناتج: err، Price، Name
<nil> -5 caps
~~~

[[NAME]] ملت Name، والسعر السالب اتقبل عادي. رفض السعر السالب شغلك انت بعد الـ decode، بـ if.

### الحجم: [[http.MaxBytesReader]]

في السيرفر بتلف الـ body قبل الـ Decoder:

~~~go main.go
r.Body = http.MaxBytesReader(w, r.Body, 20)
~~~

جرّبتها بـ 20 byte حد أقصى، على body صغير وbody أطول:

~~~text الناتج
200 map[a:1]
400 http: request body too large
~~~

---

## ٦. [[json.MarshalIndent]]: JSON منسّق

~~~go main.go
  pretty, _ := json.MarshalIndent(map[string]any{"ok": true, "count": 2}, "", "  ")
  fmt.Println(string(pretty))
~~~

- [[map[string]any]]: map مفاتيحها نص وقيمها أي نوع. سريعة لما مش عايز تعمل struct.
- [[, _]]: الـ error مش مهم هنا، فبنرميه في [[_]].
- [[""]]: prefix قبل كل سطر (مفيش). و [["  "]]: الـ indent، مسافتين.

~~~text الناتج
{
  "count": 2,
  "ok": true
}
~~~

[[count]] طلع قبل [[ok]] مع إننا كتبناه بعده: json بترتّب مفاتيح الـ map أبجديًا، فالناتج ثابت كل مرة.

---

## ٧. التجربة: [[time.Time]] ونوع غلط

ضفت [[CreatedAt time.Time $__btjson:"created_at"$__bt]]:

~~~text الناتج
{"id":1,"name":"x","price":0,"created_at":"2026-10-01T12:00:00Z"}
~~~

الوقت بيتطلع نص بصيغة RFC 3339، و [[Z]] يعني UTC.

و [[{"id":"7"}]] (الـ id نص مش رقم):

~~~text الناتج
json: cannot unmarshal string into Go struct field Product.id of type int
~~~

### omitempty مع time.Time: استخدم omitzero

[[omitempty]] مبتعتبرش struct «فاضي» أبدًا، فـ time.Time الصفري بيطلع. [[omitzero]] (من Go 1.24) بتفهمه. struct فيه الاتنين، والوقتين فاضيين:

~~~text الناتج
{"a":"0001-01-01T00:00:00Z"}
~~~

[[a]] (omitempty) طلع بتاريخ سنة 1، و [[b]] (omitzero) اختفى.

---

## ٨. غلطة الـ tag بمسافة

[[$__btjson: "id"$__bt]] (مسافة بعد النقطتين): json بتتجاهل الـ tag كله:

~~~text الناتج
{"ID":1}
~~~

المفتاح رجع [[ID]]. و go vet بيمسكها:

~~~text الناتج: go vet .
./main.go:9:3: struct field tag $__btjson: "id"$__bt not compatible with reflect.StructTag.Get: bad syntax for struct tag value
~~~

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[json.Marshal(v)]] | struct لـ [[[]byte]] |
| [[json.Unmarshal(data, &v)]] | JSON لـ struct، ولازم [[&]] |
| [[json.NewDecoder(r).Decode(&v)]] | من Reader (body الطلب) |
| [[DisallowUnknownFields()]] | ارفض المفاتيح الغريبة |
| [[http.MaxBytesReader]] | حد أقصى لحجم الـ body |
| [[json:"name"]] / [[omitempty]] / [[omitzero]] / [[-]] | الاسم / شيله لو فاضي / شيله لو صفر (يفهم structs) / متطلعهوش |

- json شايفة الحقول بحرف كبير بس.
- json مبتعملش validation: السعر السالب بيعدّي.
- [[go vet]] بيمسك الـ [[&]] الناقصة والـ tag البايظ.`,
          lines: [
            "باكدج main.",
            "imports.",
            "encoding/json.",
            "fmt.",
            "strings.",
            "قفلة.",
            "struct بتاع منتج.",
            R`الـ tag: المفتاح في JSON اسمه id.`,
            "name.",
            "price.",
            "لو فاضية متطلعش.",
            "متطلعش خالص.",
            "حرف صغير: json مش شايفاه أصلًا.",
            "قفلة.",
            "main.",
            "قيمة.",
            R`struct لـ JSON في [[[]byte]].`,
            "لو فشل (نادرًا مع structs عادية).",
            "اقفل.",
            "قفلة.",
            "حوّل البايتات لنص واطبع.",
            "struct فاضي هيتملي.",
            R`JSON لـ struct، و [[&in]] عشان يتملي.`,
            "شوف اللي اتملى.",
            "Decoder على Reader (زي body الطلب).",
            "ارفض أي مفتاح مش معروف.",
            "struct.",
            "هيرجّع error.",
            R`JSON منسّق من map.`,
            "اطبع.",
            "قفلة."
          ],
          sol: R`الناتج:
[[{"id":1,"name":"كيبورد","price":750}]]
[[{ID:2 Name:ماوس Price:199.5 Tags:[usb] Internal: secret:} <nil>]]
[[json: unknown field "nmae"]]
[[{]]
[[  "count": 2,]]
[[  "ok": true]]
[[}]]

لاحظ: tags اختفت لأنها فاضية (omitempty)، و Internal و secret مش موجودين.

[[CreatedAt]] بيتطلع [["created_at":"2026-10-01T12:00:00Z"]] (صيغة RFC 3339). و [[{"id":"7"}]] بيطلع [[json: cannot unmarshal string into Go struct field Product.id of type int]]. والسعر السالب بيتقري عادي: الـ validation شغل الـ handler بعد الـ decode.`
        },
        {
          cmd: "middleware",
          title: "middleware: دالة بتلف الـ handler عشان تضيف logging أو auth أو recover",
          desc: R`الـ middleware في Go مش مفهوم خاص بـ framework، هو دالة شكلها:
[[func(next http.Handler) http.Handler]]
بتاخد handler وترجّع handler جديد بيعمل حاجة قبل أو بعد ما ينادي [[next.ServeHTTP(w, r)]]، أو ميناديهوش خالص (لو اليوزر مش مسموحله).

[[http.HandlerFunc(func(w, r) { ... })]] بتحوّل دالة عادية لـ Handler. ده اللي بيخلي الـ middleware يرجّع closure فيها next.

وبتلفهم حوالين بعض: [[logging(requireKey(key, handler))]]. الطلب بيدخل من بره لجوّا: logging الأول، ثم requireKey، ثم الـ handler. وممكن تلف الـ mux كله فيبقى على كل المسارات، أو مسار واحد بس.

مشكلة صغيرة: الـ ResponseWriter مش بيقولك الـ status اللي اتكتب. الحل struct بيعمل embed للـ ResponseWriter (فبيحقق نفس الـ interface) ويغطّي [[WriteHeader]] بس عشان يسجّل الكود. ده نفس embedding اللي في المستوى ١.

أشهر middlewares: logging، و recover من الـ panic، و auth، و CORS، و request ID، و timeout، و rate limiting.`,
          example: R`package main

import (
  "log"
  "net/http"
  "time"
)

type statusRecorder struct {
  http.ResponseWriter
  status int
}

func (s *statusRecorder) WriteHeader(code int) {
  s.status = code
  s.ResponseWriter.WriteHeader(code)
}

func logging(next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    start := time.Now()
    rec := &statusRecorder{ResponseWriter: w, status: http.StatusOK}
    next.ServeHTTP(rec, r)
    log.Printf("%s %s %d %v", r.Method, r.URL.Path, rec.status, time.Since(start))
  })
}

func requireKey(key string, next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    if r.Header.Get("X-API-Key") != key {
      http.Error(w, "unauthorized", http.StatusUnauthorized)
      return
    }
    next.ServeHTTP(w, r)
  })
}

func main() {
  mux := http.NewServeMux()
  mux.HandleFunc("GET /public", func(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("public\n"))
  })
  admin := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("admin area\n"))
  })
  mux.Handle("GET /admin", requireKey("dev-secret", admin))

  log.Fatal(http.ListenAndServe(":8080", logging(mux)))
}`,
          try: R`جرّب [[curl localhost:8080/public]] و [[curl -i localhost:8080/admin]] و [[curl -H "X-API-Key: dev-secret" localhost:8080/admin]] وبص على لوج السيرفر. وبعدين اكتب middleware [[recoverer]] بيمسك أي panic في handler ويرد 500 بدل ما الاتصال يتقفل، وجرّبه بـ handler بيعمل [[panic("boom")]].`,
          flag: "script",
          deep: {
            why: R`حاجات زي اللوج والـ auth لازم تحصل لكل الطلبات (أو مجموعة منهم). من غير middleware هتكررها في أول كل handler وهتنساها في واحد. الـ middleware بيحطها في مكان واحد، والـ handlers تفضل فيها البيزنس بس.`,
            how: R`[[rec := &statusRecorder{...}]] بيبتدي بـ 200 لأن لو الـ handler كتب body من غير WriteHeader، ده الـ status الحقيقي. وبنبعت rec بدل w لـ next، فأي WriteHeader بيعدّي علينا الأول.

[[r.Header.Get("X-API-Key")]] بيقرا header (مش بيفرّق في الحروف الكبيرة والصغيرة في الاسم).

[[mux.Handle]] (مش HandleFunc) بياخد Handler جاهز، وده اللي requireKey بيرجّعه.

السيرفر نفسه بيعمل recover للـ panic في الـ handler عشان السيرفر ميقعش، بس بيقفل الاتصال من غير رد ويطبع stack trace. الـ recoverer بتاعك بيرد 500 مرتب ويسجّل بطريقتك.

ولو الـ statusRecorder محتاج يدعم [[http.Flusher]] (streaming)، فيه [[http.NewResponseController]] (Go 1.20+) بيتعامل مع ده.

المفتاح هنا مكتوب في الكود للتجربة بس. في الحقيقة بييجي من env (درس هيكل المشروع)، ومقارنة الأسرار بتبقى بـ [[subtle.ConstantTimeCompare]] عشان timing attacks.`,
            when: R`logging و recover و request ID على كل حاجة. auth على مجموعة مسارات. CORS لو فيه فرونت إند على دومين تاني. timeout بـ [[http.TimeoutHandler]].`,
            mistakes: R`تنسى [[return]] بعد رفض الطلب فالـ handler يتنفذ برضه. وترتيب غلط: auth قبل logging فالطلبات المرفوضة متتسجّلش. وتكتب header بعد ما الـ handler كتب الـ body. وتحط أسرار في الكود.`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

سيرفر فيه مسارين: [[/public]] مفتوح لأي حد، و [[/admin]] محتاج header فيه مفتاح. وفيه ٢ middleware:

- [[logging]]: ملفوف حوالين الـ mux كله، بيكتب سطر لكل طلب فيه الـ method والمسار والـ status والمدة.
- [[requireKey]]: ملفوف حوالين [[/admin]] بس، بيرفض الطلب لو المفتاح غلط.

الناتج من [[go build]] وتشغيل الـ binary جوه [[docker run --rm golang:1.25]] (Go 1.25.14)، و curl من نفس الـ container.

---

## ١. [[statusRecorder]]: نعرف الـ status اللي اتكتب

~~~go main.go
type statusRecorder struct {
  http.ResponseWriter
  status int
}
~~~

المشكلة: [[http.ResponseWriter]] interface فيه [[Header()]] و [[Write]] و [[WriteHeader]]، ومفيش فيه حاجة ترجّعلك «الـ status كان كام». فبنعمل struct بيلف الأصلي.

- [[http.ResponseWriter]] من غير اسم حقل: ده **embedding**. كل methods الأصلي بقت methods للـ struct ده تلقائيًا، فـ [[*statusRecorder]] بيحقق الـ interface [[http.ResponseWriter]] وينفع يتبعت مكانه.
- [[status int]]: هنا هنحفظ الكود.

~~~go main.go
func (s *statusRecorder) WriteHeader(code int) {
  s.status = code
  s.ResponseWriter.WriteHeader(code)
}
~~~

- [[(s *statusRecorder)]]: الـ receiver، يعني دي method على [[*statusRecorder]]. pointer عشان نعدّل [[s.status]] في الأصل مش في نسخة.
- بنعرّف [[WriteHeader]] بنفس الاسم، فهي اللي بتتنادى بدل بتاعة الأصلي (بنغطّيها). [[Header]] و [[Write]] لسه بتوع الأصلي.
- [[s.ResponseWriter.WriteHeader(code)]]: الحقل المتضمّن اسمه اسم نوعه، فبكده بننادي الأصلية عشان الـ status يتبعت فعلًا.

---

## ٢. [[logging]]: شكل الـ middleware

~~~go main.go
func logging(next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    start := time.Now()
    rec := &statusRecorder{ResponseWriter: w, status: http.StatusOK}
    next.ServeHTTP(rec, r)
    log.Printf("%s %s %d %v", r.Method, r.URL.Path, rec.status, time.Since(start))
  })
}
~~~

### التوقيع: [[func(next http.Handler) http.Handler]]

- [[http.Handler]] interface فيه method واحدة: [[ServeHTTP(w, r)]]. الـ mux نفسه Handler.
- [[logging]] بتاخد Handler (اللي جوّا، اسمه [[next]]) وترجّع Handler جديد.

### [[http.HandlerFunc(func(...) {...})]]

[[http.HandlerFunc]] **نوع** مش دالة: هو «دالة بشكل handler»، وليه method [[ServeHTTP]] بتنادي الدالة نفسها. فلما نكتب [[http.HandlerFunc(...)]] حوالين دالة، بنحوّلها (type conversion) لحاجة بتحقق [[http.Handler]].

والدالة الداخلية **closure**: شايفة [[next]] من بره حتى بعد ما [[logging]] رجعت.

### جوّا: قبل، نادي، بعد

1. [[start := time.Now()]]: الوقت قبل الطلب.
2. [[rec := &statusRecorder{ResponseWriter: w, status: http.StatusOK}]]: لف الـ writer الأصلي. بنبدأ بـ 200 لأن الـ handler لو كتب body من غير WriteHeader، الـ status الحقيقي 200 و WriteHeader بتاعتنا مش هتتنادى.
3. [[next.ServeHTTP(rec, r)]]: شغّل اللي جوّا، وادّيله [[rec]] بدل [[w]]، فأي [[WriteHeader]] تعدّي علينا.
4. [[log.Printf(...)]]: بعد ما خلص. [[%s]] نص، و [[%d]] رقم، و [[%v]] أي قيمة. و [[time.Since(start)]] المدة من start لحد دلوقتي، بتتطبع زي [[4.709µs]] (µs = microsecond، جزء من مليون من الثانية).

---

## ٣. [[requireKey]]: middleware بياخد إعداد

~~~go main.go
func requireKey(key string, next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    if r.Header.Get("X-API-Key") != key {
      http.Error(w, "unauthorized", http.StatusUnauthorized)
      return
    }
    next.ServeHTTP(w, r)
  })
}
~~~

- [[key string]]: المفتاح الصح، والـ closure شايفاه.
- [[r.Header.Get("X-API-Key")]]: قيمة الـ header، أو [[""]] لو مش موجود. اسم الـ header مش بيفرّق بين الكبير والصغير.
- [[http.StatusUnauthorized]] = 401.
- [[return]] من غير ما ننادي next: الطلب **وقف هنا**، والـ handler الحقيقي متنفذش.
- المفتاح صح: [[next.ServeHTTP(w, r)]] كمّل.

---

## ٤. [[main]]: اللف

~~~go main.go
  mux := http.NewServeMux()
  mux.HandleFunc("GET /public", func(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("public\n"))
  })
  admin := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("admin area\n"))
  })
  mux.Handle("GET /admin", requireKey("dev-secret", admin))

  log.Fatal(http.ListenAndServe(":8080", logging(mux)))
~~~

- [[admin := http.HandlerFunc(...)]]: نفس التحويل، عشان requireKey عايزة Handler.
- [[mux.Handle]] (مش HandleFunc): بتاخد Handler جاهز. ده اللي [[requireKey(...)]] بترجّعه.
- [[logging(mux)]]: بنبعت للسيرفر الـ mux **ملفوف**. فالترتيب لطلب [[/admin]]:

~~~text مسار الطلب
logging  ->  mux  ->  requireKey  ->  admin
~~~

---

## ٥. التجربة

~~~bash
curl localhost:8080/public
curl -i localhost:8080/admin
curl -H "X-API-Key: dev-secret" localhost:8080/admin
~~~

[[-H]] بتضيف header للطلب.

~~~text الناتج
public
HTTP/1.1 401 Unauthorized
Content-Type: text/plain; charset=utf-8
X-Content-Type-Options: nosniff
Date: Wed, 07 Oct 2026 16:43:29 GMT
Content-Length: 13

unauthorized
admin area
~~~

وجرّبت [[x-api-key]] بحروف صغيرة: [[admin area]] برضه. وطلب لمسار مش موجود ([[/nope]]):

~~~text لوج السيرفر
2026/10/07 16:43:29 GET /public 200 4.709µs
2026/10/07 16:43:29 GET /admin 401 26.972µs
2026/10/07 16:43:29 GET /admin 200 13.486µs
2026/10/07 16:43:29 GET /admin 200 4.609µs
2026/10/07 16:43:29 GET /nope 404 9.408µs
~~~

الـ 401 والـ 404 اتسجّلوا صح: [[http.Error]] بتنادي [[WriteHeader]]، فعدّت على الـ recorder. والمدد بالـ microseconds لأن الطلب محلي ومفيهوش شغل.

---

## ٦. الحل: [[recoverer]]

### الأول: panic من غير recoverer

ضفت مسار بيعمل [[panic("boom")]]. السيرفر **مبيقعش** (بيعمل recover لوحده)، بس بيقفل الاتصال من غير أي رد:

~~~text الناتج: curl -i localhost:8080/boom
curl: (52) Empty reply from server
~~~

~~~text لوج السيرفر (أول السطور)
2026/10/07 16:46:04 http: panic serving [::1]:59162: boom
goroutine 8 [running]:
net/http.(*conn).serve.func1()
	/usr/local/go/src/net/http/server.go:1933 +0xd3
...
~~~

ولاحظ إن سطر الـ logging بتاعنا متكتبش، لأن الـ panic طلعت من [[next.ServeHTTP]] قبل ما نوصل لـ [[log.Printf]].

### الكود

~~~go solCode
func recoverer(next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    defer func() {
      if err := recover(); err != nil {
        log.Printf("panic: %v", err)
        http.Error(w, "internal error", http.StatusInternalServerError)
      }
    }()
    next.ServeHTTP(w, r)
  })
}

mux.HandleFunc("GET /boom", func(w http.ResponseWriter, r *http.Request) {
  panic("boom")
})
log.Fatal(http.ListenAndServe(":8080", logging(recoverer(mux))))
~~~

- [[defer func() { ... }()]]: دالة من غير اسم بتتنفذ لما الدالة اللي حواليها تخلص، **حتى لو بـ panic**. والـ [[()]] في الآخر بتناديها (الـ defer بياخد نداء).
- [[recover()]]: جوه defer بس، بتوقف الـ panic وترجّع القيمة اللي اتعملها panic ([["boom"]]). لو مفيش panic بترجّع nil.
- [[if err := recover(); err != nil]]: if بجملة قصيرة قبلها: عرّف err وبعدين اختبره.
- [[http.StatusInternalServerError]] = 500.
- [[logging(recoverer(mux))]]: الـ recoverer **جوّا** logging.

~~~text الناتج: curl -i localhost:8080/boom
HTTP/1.1 500 Internal Server Error
Content-Type: text/plain; charset=utf-8
X-Content-Type-Options: nosniff
Date: Wed, 07 Oct 2026 16:46:03 GMT
Content-Length: 15

internal error
~~~

~~~text لوج السيرفر
2026/10/07 16:46:03 panic: boom
2026/10/07 16:46:03 GET /boom 500 208.368µs
~~~

السطرين بالترتيب ده لأن الـ recoverer جوّا: هو كتب الـ panic ورد 500، ورجع لـ logging عادي، فـ logging سجّلت 500. لو كانت [[recoverer(logging(mux))]]، الـ panic كانت هتعدّي من logging من غير سطر، زي ما شفنا فوق.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[func(next http.Handler) http.Handler]] | شكل أي middleware |
| [[http.HandlerFunc(fn)]] | حوّل دالة لـ Handler |
| [[next.ServeHTTP(w, r)]] | كمّل للي جوّا، ومن غيرها الطلب بيقف |
| struct بـ embedding + [[WriteHeader]] | تعرف الـ status اللي اتكتب |
| [[mux.Handle]] | سجّل Handler جاهز (ملفوف) |
| [[defer]] + [[recover()]] | امسك الـ panic ورد 500 |

- اللي بره بيشتغل الأول: [[logging(recoverer(mux))]] = logging ثم recoverer ثم mux.
- [[return]] بعد الرفض، وإلا الـ handler يتنفذ برضه.`,
          lines: [
            "باكدج main.",
            "imports.",
            "log.",
            "net/http.",
            "time.",
            "قفلة.",
            "struct بيلف الـ ResponseWriter.",
            "embedded: كل methods الأصلي متاحة، فبيحقق نفس الـ interface.",
            "هنا هنسجّل الـ status.",
            "قفلة.",
            "بنغطّي WriteHeader بس.",
            "سجّل الكود.",
            "وعدّيه للأصلي.",
            "قفلة.",
            R`middleware: بياخد Handler ويرجّع Handler.`,
            "handler جديد من closure.",
            "قبل: الوقت.",
            "لف الـ writer، و 200 افتراضي.",
            "نادي اللي جوّا.",
            "بعد: سطر لوج فيه الـ method والمسار والـ status والمدة.",
            "قفلة.",
            "قفلة.",
            "middleware بياخد إعداد (المفتاح) والـ handler.",
            "handler جديد.",
            "لو المفتاح غلط...",
            "...401.",
            "ومتكمّلش.",
            "قفلة.",
            "تمام: كمّل.",
            "قفلة.",
            "قفلة.",
            "main.",
            "router.",
            "مسار مفتوح.",
            "رد.",
            "قفلة.",
            "handler الأدمن.",
            "رد.",
            "قفلة.",
            R`[[Handle]] بياخد Handler، ملفوف بالـ auth.`,
            "الـ logging حوالين الـ mux كله.",
            "قفلة."
          ],
          sol: R`[[/public]]: [[public]]. و [[/admin]] من غير مفتاح: [[HTTP/1.1 401 Unauthorized]] و [[unauthorized]]. وبالمفتاح: [[admin area]].

ولوج السيرفر:
[[2026/10/01 12:00:00 GET /public 200 41.2µs]]
[[2026/10/01 12:00:03 GET /admin 401 25.8µs]]
[[2026/10/01 12:00:07 GET /admin 200 19.1µs]]

الـ recoverer (الكود تحت) بيخلي [[/boom]] ترد [[500 Internal Server Error]] و [[internal error]]، وفي اللوج [[panic: boom]]. حطه بره الـ logging أو جوّاه؟ لو جوّا logging، الـ 500 هتتسجّل في سطر اللوج، وده اللي غالبًا انت عايزه.`,
          solCode: R`func recoverer(next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    defer func() {
      if err := recover(); err != nil {
        log.Printf("panic: %v", err)
        http.Error(w, "internal error", http.StatusInternalServerError)
      }
    }()
    next.ServeHTTP(w, r)
  })
}

mux.HandleFunc("GET /boom", func(w http.ResponseWriter, r *http.Request) {
  panic("boom")
})
log.Fatal(http.ListenAndServe(":8080", logging(recoverer(mux))))`
        },
        {
          cmd: "http.Client",
          title: "تكلّم API تاني: http.Client بمهلة، وتقفل الـ body، وتشيك على الـ status",
          desc: R`[[http.Get(url)]] أسهل طريقة، بس بتستخدم [[http.DefaultClient]] اللي مفيهوش timeout خالص: لو السيرفر التاني علّق، الـ goroutine بتاعتك هتعلّق للأبد. في الكود الحقيقي:
• اعمل client واحد بمهلة واستخدمه في كل حتة: [[client := &http.Client{Timeout: 5 * time.Second}]]. الـ client آمن مع أكتر من goroutine، وبيعيد استخدام الاتصالات (connection pool)، فمتعملش واحد جديد لكل طلب.
• [[http.NewRequestWithContext(ctx, method, url, body)]]: الطلب بالـ context، فلو الـ request الأصلي اتلغي، الطلب ده يتلغي.
• [[resp, err := client.Do(req)]]: الـ err هنا معناه إن الطلب مكملش (شبكة، DNS، timeout). لكن 404 أو 500 مش err! لازم تشيك [[resp.StatusCode]] بنفسك.
• [[defer resp.Body.Close()]] دايمًا بعد ما تتأكد إن err بـ nil، وإلا الاتصال مش بيرجع للـ pool.

[[httptest.NewServer]] بيشغّل سيرفر حقيقي على بورت عشوائي جوه البرنامج، وبنستخدمه هنا عشان نمثّل الـ API التاني من غير نت. هتقابله تاني في الاختبارات (المستوى ٣).`,
          example: R`package main

import (
  "context"
  "encoding/json"
  "fmt"
  "net/http"
  "net/http/httptest"
  "time"
)

type Rate struct {
  Base string  $__btjson:"base"$__bt
  EGP  float64 $__btjson:"egp"$__bt
}

func getRate(ctx context.Context, client *http.Client, url string) (Rate, error) {
  var rate Rate
  req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
  if err != nil {
    return rate, err
  }
  resp, err := client.Do(req)
  if err != nil {
    return rate, fmt.Errorf("get rate: %w", err)
  }
  defer resp.Body.Close()
  if resp.StatusCode != http.StatusOK {
    return rate, fmt.Errorf("get rate: unexpected status %d", resp.StatusCode)
  }
  err = json.NewDecoder(resp.Body).Decode(&rate)
  return rate, err
}

func main() {
  // سيرفر وهمي جوه البرنامج بيمثّل الـ API التاني
  api := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    if r.URL.Path == "/broken" {
      http.Error(w, "boom", http.StatusInternalServerError)
      return
    }
    w.Write([]byte($__bt{"base":"USD","egp":48.5}$__bt))
  }))
  defer api.Close()

  client := &http.Client{Timeout: 5 * time.Second}
  rate, err := getRate(context.Background(), client, api.URL)
  fmt.Println(rate, err)

  _, err = getRate(context.Background(), client, api.URL+"/broken")
  fmt.Println(err)
}`,
          try: R`خلي الـ handler الوهمي يعمل [[time.Sleep(2 * time.Second)]]، وغيّر الـ client لـ [[Timeout: 500 * time.Millisecond]] وشغّل. وبعدين رجّع الـ Timeout 5 ثواني بس ادّي getRate ctx بـ [[context.WithTimeout(..., 300*time.Millisecond)]]. أنهي واحد كسب؟`,
          flag: "script",
          deep: {
            why: R`أغلب الـ backends بتكلّم خدمات تانية: بوابة دفع، أو SMS، أو microservice. ولما خدمة منهم تبطّأ، الـ client من غير timeout بيخلي السيرفر بتاعك يعلّق معاها، وده بيوقّع خدمات كتير ورا بعض (cascading failure). المهلة وفحص الـ status بيخلّوا الفشل يبان بسرعة وبوضوح.`,
            how: R`[[client.Timeout]] بيغطّي الطلب كله: الاتصال، والإرسال، وقراية الـ body. والـ context بيضيف حد تاني، وأقصر واحد فيهم هو اللي بيكسب.

[[api.URL]] حاجة زي [[http://127.0.0.1:41234]] بورت مختلف كل مرة.

[[http.MethodGet]] = [["GET"]]. والـ body في NewRequest [[nil]] لـ GET، و [[bytes.NewReader(jsonBytes)]] أو [[strings.NewReader]] لـ POST، ومعاه [[req.Header.Set("Content-Type", "application/json")]].

لو مقريتش الـ body لآخره قبل Close، الاتصال ممكن ميرجعش للـ pool. لو مش محتاج الـ body (status غلط مثلًا)، [[io.Copy(io.Discard, resp.Body)]] قبل الـ Close.

[[fmt.Println(rate)]] بيطبع struct من غير أسماء الحقول: [[{USD 48.5}]].`,
            when: R`أي طلب لخدمة بره. ولخدمات مهمة ضيف retry بـ backoff للأخطاء المؤقتة (5xx، timeout) بس مش لـ 4xx، وخلّي العملية idempotent قبل ما تعيدها (متعيدش دفع مرتين).`,
            mistakes: R`[[http.Get]] من غير timeout في سيرفر. وتنسى [[resp.Body.Close()]] فالاتصالات تخلص بعد شوية. و [[defer resp.Body.Close()]] قبل [[if err != nil]]: resp بـ nil فـ panic. وتعتبر 500 نجاح لأن err بـ nil. و client جديد لكل طلب.`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

دالة [[getRate]] بتطلب سعر الدولار من API تاني، وبتعمل كل اللي لازم يتعمل مع أي طلب HTTP بره: context، ومهلة، وتقفل الـ body، وتشيك على الـ status، وتفك الـ JSON. وعشان منعتمدش على النت، الـ «API التاني» سيرفر وهمي جوه نفس البرنامج.

الناتج من [[go run .]] جوه [[docker run --rm golang:1.25]] (Go 1.25.14).

---

## ١. الـ imports والـ struct

~~~go main.go
import (
  "context"
  "encoding/json"
  "fmt"
  "net/http"
  "net/http/httptest"
  "time"
)

type Rate struct {
  Base string  $__btjson:"base"$__bt
  EGP  float64 $__btjson:"egp"$__bt
}
~~~

- [[net/http/httptest]]: أدوات للاختبار، منها سيرفر حقيقي على بورت عشوائي.
- [[Rate]]: شكل الرد اللي جاي من الـ API، بالـ tags اللي شفناها في درس JSON.

---

## ٢. [[getRate]] خطوة خطوة

~~~go main.go
func getRate(ctx context.Context, client *http.Client, url string) (Rate, error) {
  var rate Rate
~~~

- بتاخد [[ctx]] (عشان الإلغاء)، و [[client]] (واحد مشترك بيتبعت من بره، مش بتعمل جديد)، و [[url]].
- بترجّع [[Rate]] و [[error]]. و [[var rate Rate]] قيمة صفرية بنرجّعها مع أي error.

### الخطوة ١: اعمل الطلب

~~~go main.go
  req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
  if err != nil {
    return rate, err
  }
~~~

- [[http.NewRequestWithContext(ctx, method, url, body)]]: بتجهّز الطلب بس، **مش بتبعته**. والـ ctx بيتربط بيه، فلو اتلغي الطلب يتلغي.
- [[http.MethodGet]] ثابت قيمته [["GET"]].
- [[nil]]: مفيش body، لأن GET.
- الـ error هنا معناه إن الطلب نفسه بايظ (URL مش مفهوم مثلًا).

### الخطوة ٢: ابعت

~~~go main.go
  resp, err := client.Do(req)
  if err != nil {
    return rate, fmt.Errorf("get rate: %w", err)
  }
~~~

- [[client.Do(req)]]: ابعت واستنى الـ headers بتاعة الرد. بترجّع [[*http.Response]].
- [[err]] هنا معناه إن مفيش رد **خالص**: الشبكة وقعت، أو DNS، أو المهلة خلصت، أو الـ ctx اتلغي.
- [[fmt.Errorf("get rate: %w", err)]]: نزوّد سياق ونلف الـ error الأصلي بـ [[%w]] (درس الأخطاء).

### الخطوة ٣: اقفل الـ body

~~~go main.go
  defer resp.Body.Close()
~~~

- [[resp.Body]] stream بيتقرا من الاتصال. لازم يتقفل عشان الاتصال يرجع للـ pool ويتستخدم تاني.
- [[defer]]: لما الدالة تخلص بأي طريقة.
- **بعد** [[if err != nil]] مش قبلها: لو فيه error، [[resp]] بـ nil. جرّبت أحطها قبل الـ if، وطلبت بورت مقفول:

~~~text الناتج
panic: runtime error: invalid memory address or nil pointer dereference
[signal SIGSEGV: segmentation violation code=0x1 addr=0x40 pc=0x6278a5]

goroutine 1 [running]:
main.main()
	/w/l5d/main.go:11 +0xa5
exit status 2
~~~

### الخطوة ٤: الـ status

~~~go main.go
  if resp.StatusCode != http.StatusOK {
    return rate, fmt.Errorf("get rate: unexpected status %d", resp.StatusCode)
  }
~~~

أهم سطر في الدرس: **404 و 500 مش errors في [[client.Do]]**. السيرفر رد، يبقى الطلب نجح من ناحية الشبكة. فلازم تشيك [[resp.StatusCode]] بنفسك.

### الخطوة ٥: فك الـ JSON

~~~go main.go
  err = json.NewDecoder(resp.Body).Decode(&rate)
  return rate, err
}
~~~

الـ Decoder بيقرا من الـ body مباشرة، من غير ما نقراه كله في الذاكرة الأول.

---

## ٣. السيرفر الوهمي

~~~go main.go
  api := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    if r.URL.Path == "/broken" {
      http.Error(w, "boom", http.StatusInternalServerError)
      return
    }
    w.Write([]byte($__bt{"base":"USD","egp":48.5}$__bt))
  }))
  defer api.Close()
~~~

- [[httptest.NewServer(handler)]]: بيشغّل سيرفر HTTP حقيقي على [[127.0.0.1]] وبورت فاضي يختاره النظام. وعنوانه في [[api.URL]]، زي [[http://127.0.0.1:43997]].
- الـ handler: [[/broken]] بيرد 500، وأي مسار تاني بيرد JSON.
- [[defer api.Close()]]: اقفل السيرفر في آخر main.

---

## ٤. الـ client والطلبين

~~~go main.go
  client := &http.Client{Timeout: 5 * time.Second}
  rate, err := getRate(context.Background(), client, api.URL)
  fmt.Println(rate, err)

  _, err = getRate(context.Background(), client, api.URL+"/broken")
  fmt.Println(err)
~~~

- [[&http.Client{Timeout: 5 * time.Second}]]: client بمهلة ٥ ثواني على الطلب كله (الاتصال والإرسال وقراية الرد). الـ [[&]] لأن الـ client بيتعدّى ويتشارك كـ pointer.
- [[http.DefaultClient]] اللي بيستخدمه [[http.Get]] مهلته صفر، يعني **مفيش مهلة**:

~~~text الناتج: fmt.Println(http.DefaultClient.Timeout)
0s
~~~

- [[context.Background()]]: ctx فاضي مبيتلغيش.
- [[api.URL+"/broken"]]: نفس العنوان + المسار.

~~~text الناتج
{USD 48.5} <nil>
get rate: unexpected status 500
~~~

- [[{USD 48.5}]]: [[Println]] بتطبع الـ struct من غير أسماء الحقول.
- التاني: [[client.Do]] رجّع err بـ nil، والـ 500 اتمسك عند فحص الـ status.

---

## ٥. التجربة: مين يكسب، المهلة ولا الـ ctx؟

### الـ API بطيء والـ client مهلته 500ms

خليت الـ handler يعمل [[time.Sleep(2 * time.Second)]] قبل ما يرد، و [[Timeout: 500 * time.Millisecond]]:

~~~text الناتج
{ 0} get rate: Get "http://127.0.0.1:43997": context deadline exceeded (Client.Timeout exceeded while awaiting headers)
get rate: unexpected status 500
~~~

- [[{ 0}]]: الـ Rate الفاضي (نص فاضي و 0).
- الـ error بيقول بالظبط إيه اللي حصل: [[Client.Timeout exceeded while awaiting headers]]، يعني المهلة خلصت والرد لسه مبدأش.
- السطر التاني زي ما هو: [[/broken]] بيرد قبل الـ sleep.

### المهلة 5 ثواني بس الـ ctx 300ms

~~~go main.go
  ctx, cancel := context.WithTimeout(context.Background(), 300*time.Millisecond)
  defer cancel()
  rate, err := getRate(ctx, client, api.URL)
~~~

~~~text الناتج
{ 0} get rate: Get "http://127.0.0.1:34861": context deadline exceeded
get rate: unexpected status 500
~~~

الـ ctx كسب لأنه أقصر، والرسالة من غير [[Client.Timeout]]. الحدّين شغالين مع بعض، وأقصر واحد هو اللي بيطبّق. والبورت مختلف لأن httptest بيختار بورت جديد كل تشغيل.

---

## الخلاصة

| الخطوة | الكود | ليه |
|---|---|---|
| ١ | [[http.NewRequestWithContext(ctx, ...)]] | الإلغاء يوصل للطلب |
| ٢ | [[client.Do(req)]] | err = مفيش رد خالص |
| ٣ | [[defer resp.Body.Close()]] | بعد فحص err، والاتصال يرجع للـ pool |
| ٤ | [[resp.StatusCode != http.StatusOK]] | 404 و 500 مش err |
| ٥ | [[json.NewDecoder(resp.Body).Decode(&v)]] | فك الرد |

- client واحد بمهلة لكل البرنامج، مش [[http.Get]] ولا client لكل طلب.
- [[Client.Timeout]] والـ ctx الاتنين شغالين، والأقصر بيكسب.`,
          lines: [
            "باكدج main.",
            "imports.",
            "context.",
            "encoding/json.",
            "fmt.",
            "net/http.",
            R`[[httptest]]: سيرفر وهمي للتجربة والاختبار.`,
            "time.",
            "قفلة.",
            "شكل الرد.",
            "base.",
            "egp.",
            "قفلة.",
            "بتاخد ctx و client و url.",
            "القيمة اللي هترجع.",
            "اعمل الطلب بالـ context.",
            "URL بايظ مثلًا.",
            "رجّع.",
            "قفلة.",
            "ابعت.",
            "شبكة، أو timeout، أو إلغاء.",
            "غلّف ورجّع.",
            "قفلة.",
            R`اقفل الـ body، بعد ما اتأكدنا إن resp مش nil.`,
            R`err بـ nil مش معناها 200!`,
            "status غلط = error.",
            "قفلة.",
            "فك الـ JSON مباشرة من الـ body.",
            "رجّع.",
            "قفلة.",
            "main.",
            "سيرفر حقيقي على بورت عشوائي.",
            "مسار بيفشل...",
            "...500.",
            "اخرج.",
            "قفلة.",
            "الرد العادي.",
            "قفلة.",
            "اقفله في الآخر.",
            "client واحد بمهلة.",
            "طلب ناجح.",
            R`[[{USD 48.5} <nil>]].`,
            "طلب للمسار البايظ.",
            "الـ error بتاعنا.",
            "قفلة."
          ],
          sol: R`الناتج:
[[{USD 48.5} <nil>]]
[[get rate: unexpected status 500]]

مع sleep ثانيتين و Timeout 500ms: [[get rate: Get "http://127.0.0.1:41234": context deadline exceeded (Client.Timeout exceeded while awaiting headers)]] (البورت هيختلف).

ومع ctx بـ 300ms و Timeout 5 ثواني: الـ ctx كسب لأنه أقصر: [[get rate: Get "http://127.0.0.1:41234": context deadline exceeded]]. الاتنين بيوقّفوا الطلب، وأقصر حد هو اللي بيطبّق.`
        },
        {
          cmd: "database/sql و pgx",
          title: "قاعدة البيانات: database/sql مع driver الـ Postgres (pgx)",
          desc: R`[[database/sql]] في المكتبة القياسية: واجهة واحدة لأي داتابيز، والـ driver بيتسطّب لوحده. لـ PostgreSQL أشهر driver هو [[pgx]]:
[[go get github.com/jackc/pgx/v5]]
وبتعمله import بـ [[_]] عشان يسجّل نفسه بس: [[import _ "github.com/jackc/pgx/v5/stdlib"]].

• [[sql.Open("pgx", url)]]: بيرجّع [[*sql.DB]]. ده مش اتصال واحد، ده pool بيدير الاتصالات وآمن مع goroutines كتير. بتعمله مرة واحدة في main وتعدّيه.
• [[db.PingContext(ctx)]]: Open مش بيتصل فعلًا، فـ Ping بيتأكد إن الداتابيز موجودة.
• [[db.QueryRowContext(ctx, sql, args...).Scan(&a, &b)]]: صف واحد. لو مفيش صفوف: [[sql.ErrNoRows]].
• [[db.QueryContext]]: صفوف كتير: [[for rows.Next() { rows.Scan(...) }]] ثم [[rows.Err()]]، و [[defer rows.Close()]].
• [[db.ExecContext]]: INSERT و UPDATE و DELETE من غير نتايج.

والقيم دايمًا كـ parameters: [[$1]] و [[$2]] في Postgres (و [[?]] في MySQL). عمرك ما تلزق قيمة جاية من يوزر في نص الـ SQL بـ Sprintf: ده SQL injection.

[[Scan(&u.ID, &u.Email)]] بياخد pointers بنفس ترتيب الأعمدة في الـ SELECT.

المثال محتاج Postgres شغال و [[DATABASE_URL]]. أسهل طريقة في الـ try.`,
          example: R`package main

import (
  "context"
  "database/sql"
  "errors"
  "fmt"
  "log"
  "os"
  "time"

  _ "github.com/jackc/pgx/v5/stdlib"
)

type User struct {
  ID    int64
  Email string
}

func findUser(ctx context.Context, db *sql.DB, id int64) (User, error) {
  var u User
  err := db.QueryRowContext(ctx, "SELECT id, email FROM users WHERE id = $1", id).Scan(&u.ID, &u.Email)
  if errors.Is(err, sql.ErrNoRows) {
    return u, fmt.Errorf("user %d: not found", id)
  }
  return u, err
}

func main() {
  db, err := sql.Open("pgx", os.Getenv("DATABASE_URL"))
  if err != nil {
    log.Fatal(err)
  }
  defer db.Close()
  db.SetMaxOpenConns(10)
  db.SetConnMaxIdleTime(5 * time.Minute)

  ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
  defer cancel()
  if err := db.PingContext(ctx); err != nil {
    log.Fatal("db not reachable: ", err)
  }

  var id int64
  err = db.QueryRowContext(ctx, "INSERT INTO users (email) VALUES ($1) RETURNING id", "sara@example.com").Scan(&id)
  if err != nil {
    log.Fatal(err)
  }

  rows, err := db.QueryContext(ctx, "SELECT id, email FROM users ORDER BY id")
  if err != nil {
    log.Fatal(err)
  }
  defer rows.Close()
  for rows.Next() {
    var u User
    if err := rows.Scan(&u.ID, &u.Email); err != nil {
      log.Fatal(err)
    }
    fmt.Println(u.ID, u.Email)
  }
  if err := rows.Err(); err != nil {
    log.Fatal(err)
  }

  fmt.Println(findUser(ctx, db, 9999))
}`,
          try: R`شغّل Postgres في Docker: [[docker run -d --name pg -e POSTGRES_PASSWORD=pass -p 5432:5432 postgres:17]]. اعمل الجدول: [[docker exec -it pg psql -U postgres -c "CREATE TABLE users (id bigserial PRIMARY KEY, email text UNIQUE NOT NULL)"]]. وبعدين [[go get github.com/jackc/pgx/v5]] وشغّل بـ [[DATABASE_URL=postgres://postgres:pass@localhost:5432/postgres go run .]] مرتين. التانية هتقع ليه؟`,
          flag: "script",
          deep: {
            why: R`تقريبًا كل backend فيه داتابيز. و database/sql بتديك pool و context و prepared statements جاهزين، وأي مكتبة فوقها (sqlc و sqlx و GORM) بتستخدم نفس الأساس، فلو فهمته هتفهمهم.`,
            how: R`الـ pool: [[SetMaxOpenConns(10)]] أقصى عدد اتصالات مفتوحة (Postgres نفسه ليه حد، فلو عندك ١٠ نسخ من السيرفر كل واحدة 100 اتصال هتخلّص الحد). و [[SetConnMaxIdleTime]] بيقفل الاتصالات اللي مستخدمتش من مدة.

[[Scan]] بيحوّل أنواع Postgres لأنواع Go: bigint لـ int64، و text لـ string، و timestamptz لـ time.Time. والعمود اللي ممكن يبقى NULL لازم [[sql.NullString]] أو [[*string]]، وإلا Scan هيرجّع error.

[[rows.Close()]] بترجّع الاتصال للـ pool، ومن غيرها الاتصالات بتخلص. و [[rows.Err()]] بيقولك لو الـ loop وقفت بسبب error مش نهاية الصفوف.

[[RETURNING id]] في Postgres بترجّع الـ id الجديد في نفس الـ INSERT، فبنستخدم QueryRow مش Exec.

لو محتاج الأداء الأعلى أو features خاصة بـ Postgres (COPY، و LISTEN/NOTIFY)، فيه [[pgxpool]] (الـ API بتاع pgx مباشرة من غير database/sql). وأدوات زي [[sqlc]] بتكتب كود Go من ملفات SQL، فتبقى عندك type safety من غير ORM.

Transactions: [[tx, err := db.BeginTx(ctx, nil)]] ثم [[defer tx.Rollback()]] ثم الشغل ثم [[tx.Commit()]]. الـ Rollback بعد Commit مش بيعمل حاجة.`,
            when: R`database/sql + pgx لمشاريع Postgres العادية. sqlc لو عايز SQL مكتوب بإيدك مع أنواع جاهزة. GORM أو ent لو الفريق عايز ORM. وفي كل الحالات: [[...Context]] دايمًا عشان الإلغاء يوصل.`,
            mistakes: R`[[fmt.Sprintf("... WHERE email = '%s'", email)]]: SQL injection. و sql.Open لكل request بدل مرة واحدة. وتنسى [[rows.Close()]] أو [[rows.Err()]]. و Scan لعمود NULL في string. وتعامل [[sql.ErrNoRows]] كـ 500 بدل 404. والـ driver import من غير [[_]] فيطلع [[imported and not used]]، أو تنساه خالص فيطلع [[sql: unknown driver "pgx"]].`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

بيتصل بـ PostgreSQL، ويضيف يوزر، ويقرا كل اليوزرز، ويدوّر على يوزر مش موجود. يعني الأشكال الأربعة اللي هتكتبها كل يوم: اتصال، و INSERT، و SELECT لصفوف كتير، و SELECT لصف واحد.

جرّبته جوه [[docker run --rm golang:1.25]] (Go 1.25.14، و pgx v5.11.0)، مع Postgres 16 في container تاني على network خاصة، والجدول اتعمل بنفس أمر الـ try:

~~~bash
docker exec pg psql -U postgres -c "CREATE TABLE users (id bigserial PRIMARY KEY, email text UNIQUE NOT NULL)"
~~~

- [[bigserial]]: رقم بيزيد لوحده (1، 2، 3...)، و [[PRIMARY KEY]] مميّز لكل صف.
- [[UNIQUE NOT NULL]]: الإيميل مينفعش يتكرر ولا يبقى فاضي.

---

## ١. الـ imports والـ driver

~~~go main.go
import (
  "context"
  "database/sql"
  "errors"
  "fmt"
  "log"
  "os"
  "time"

  _ "github.com/jackc/pgx/v5/stdlib"
)
~~~

- [[database/sql]]: الواجهة القياسية. هي مبتعرفش تكلّم أي داتابيز لوحدها.
- السطر الفاضي: العرف إن المكتبات القياسية في مجموعة والخارجية في مجموعة.
- [[_ "github.com/jackc/pgx/v5/stdlib"]]: الـ driver. الـ [[_]] (blank import) معناها «اعمل import عشان الـ init بتاعته تشتغل، ومش هستخدم منه حاجة بالاسم». والـ init دي بتسجّل الـ driver باسم [["pgx"]] جوه database/sql.

قبلها لازم:

~~~bash
go get github.com/jackc/pgx/v5
~~~

~~~text الناتج (آخر سطور)
go: added github.com/jackc/pgservicefile v0.0.0-20240606120523-5a60cdf6a761
go: added github.com/jackc/pgx/v5 v5.11.0
go: added golang.org/x/text v0.29.0
~~~

### لو نسيت الـ import

~~~text الناتج
sql: unknown driver "pgx" (forgotten import?)
~~~

---

## ٢. [[findUser]]: صف واحد

~~~go main.go
func findUser(ctx context.Context, db *sql.DB, id int64) (User, error) {
  var u User
  err := db.QueryRowContext(ctx, "SELECT id, email FROM users WHERE id = $1", id).Scan(&u.ID, &u.Email)
  if errors.Is(err, sql.ErrNoRows) {
    return u, fmt.Errorf("user %d: not found", id)
  }
  return u, err
}
~~~

### السطر الطويل من جوه لبرة

1. [[db.QueryRowContext(ctx, query, args...)]]: نفّذ query متوقع منه صف واحد. الـ ctx عشان الإلغاء.
2. [["... WHERE id = $1"]]: [[$1]] **مكان فاضي** (placeholder). Postgres بياخد الـ SQL لوحده والقيمة لوحدها، فمستحيل القيمة تتفهم كـ SQL.
3. [[id]]: القيمة اللي هتروح مكان [[$1]]. ولو فيه [[$2]] القيمة التانية بعدها.
4. [[.Scan(&u.ID, &u.Email)]]: انسخ الأعمدة في المتغيرات دي **بنفس ترتيب الـ SELECT**. pointers ([[&]]) عشان Scan تكتب فيهم.

### [[sql.ErrNoRows]]

لو مفيش صف، Scan بترجّع [[sql.ErrNoRows]]. ده مش غلط في السيستم، ده «مش موجود»، فبنحوّله لرسالة واضحة. والـ handler بعدين يرد 404 مش 500.

---

## ٣. [[sql.Open]] والـ pool

~~~go main.go
  db, err := sql.Open("pgx", os.Getenv("DATABASE_URL"))
  if err != nil {
    log.Fatal(err)
  }
  defer db.Close()
  db.SetMaxOpenConns(10)
  db.SetConnMaxIdleTime(5 * time.Minute)
~~~

- [[sql.Open("pgx", url)]]: [["pgx"]] اسم الـ driver اللي اتسجّل. وبيرجّع [[*sql.DB]]، وده **pool** اتصالات مش اتصال واحد. بيتعمل مرة واحدة ويتشارك.
- [[os.Getenv("DATABASE_URL")]]: الرابط من env. شكله [[postgres://user:password@host:port/dbname]].
- Open **مبيتصلش**. بيتأكد إن الإعدادات مفهومة بس.
- [[SetMaxOpenConns(10)]]: أقصى ١٠ اتصالات مفتوحة في نفس الوقت.
- [[SetConnMaxIdleTime(5 * time.Minute)]]: اتصال مستخدمش ٥ دقايق يتقفل.

---

## ٤. [[PingContext]]: اتصل بجد

~~~go main.go
  ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
  defer cancel()
  if err := db.PingContext(ctx); err != nil {
    log.Fatal("db not reachable: ", err)
  }
~~~

- ctx بمهلة ٣ ثواني لكل الشغل اللي بعده.
- [[PingContext]]: افتح اتصال فعلًا. لو الداتابيز مش موجودة نعرف هنا، في أول ثانية.

جرّبت من غير [[DATABASE_URL]]:

~~~text الناتج
2026/10/07 16:48:20 db not reachable: failed to connect to $__btuser=root database=$__bt: /tmp/.s.PGSQL.5432 (/tmp): dial error: dial unix /tmp/.s.PGSQL.5432: connect: no such file or directory
exit status 1
~~~

الرابط فاضي، فـ pgx استخدم الافتراضي: اسم يوزر النظام ([[root]] جوه الـ container) وملف socket محلي مش موجود.

وبباسورد غلط:

~~~text الناتج
2026/10/07 16:48:20 db not reachable: failed to connect to $__btuser=postgres database=postgres$__bt:
	172.18.0.3:5432 (teach-go0507-pg): tls error: server refused TLS connection
	172.18.0.3:5432 (teach-go0507-pg): failed SASL auth: FATAL: password authentication failed for user "postgres" (SQLSTATE 28P01)
exit status 1
~~~

pgx جرّب TLS الأول (السيرفر رفض، عادي في container محلي) وبعدين من غيره، والباسورد هو اللي فشل.

---

## ٥. INSERT مع [[RETURNING]]

~~~go main.go
  var id int64
  err = db.QueryRowContext(ctx, "INSERT INTO users (email) VALUES ($1) RETURNING id", "sara@example.com").Scan(&id)
  if err != nil {
    log.Fatal(err)
  }
~~~

- [[RETURNING id]]: Postgres بيرجّع الـ id اللي اتعمل في نفس الأمر، كأنه SELECT. عشان كده [[QueryRowContext]] + Scan، مش [[ExecContext]].
- الإيميل كـ parameter [[$1]] برضه.

---

## ٦. صفوف كتير: [[QueryContext]]

~~~go main.go
  rows, err := db.QueryContext(ctx, "SELECT id, email FROM users ORDER BY id")
  if err != nil {
    log.Fatal(err)
  }
  defer rows.Close()
  for rows.Next() {
    var u User
    if err := rows.Scan(&u.ID, &u.Email); err != nil {
      log.Fatal(err)
    }
    fmt.Println(u.ID, u.Email)
  }
  if err := rows.Err(); err != nil {
    log.Fatal(err)
  }
~~~

| السطر | ليه |
|---|---|
| [[rows, err := db.QueryContext(...)]] | [[*sql.Rows]]: مؤشر على النتايج، ماسك اتصال |
| [[defer rows.Close()]] | يرجّع الاتصال للـ pool. من غيره الاتصالات بتخلص |
| [[for rows.Next()]] | روح للصف الجاي. بترجّع false لما الصفوف تخلص **أو** يحصل error |
| [[rows.Scan(...)]] | انسخ الصف الحالي |
| [[rows.Err()]] | بعد الـ loop: هل وقفنا عشان خلصنا ولا عشان error؟ |

---

## ٧. التشغيل

~~~bash
DATABASE_URL=postgres://postgres:pass@localhost:5432/postgres go run .
~~~

[[VAR=value command]] في bash بتحط المتغير للأمر ده بس.

~~~text الناتج: أول مرة
1 sara@example.com
{0 } user 9999: not found
~~~

- السطر الأول من الـ loop.
- التاني: [[fmt.Println(findUser(...))]] بتطبع القيمتين اللي رجعوا: [[User]] الفاضي [[{0 }]] (0 ونص فاضي) والـ error.

~~~text الناتج: تاني مرة
2026/10/07 16:48:20 ERROR: duplicate key value violates unique constraint "users_email_key" (SQLSTATE 23505)
exit status 1
~~~

الإيميل عليه UNIQUE، فالـ INSERT التاني فشل. [[users_email_key]] الاسم اللي Postgres اداه للـ constraint لوحده، و [[23505]] كود «unique violation».

### تمسكه بالكود

~~~go main.go
var pgErr *pgconn.PgError
if errors.As(err, &pgErr) {
  fmt.Println("code:", pgErr.Code, "constraint:", pgErr.ConstraintName)
}
~~~

~~~text الناتج
code: 23505 constraint: users_email_key
~~~

[[pgconn]] من [[github.com/jackc/pgx/v5/pgconn]]. ولو الكود 23505 ترد 409 Conflict بدل 500.

---

## ٨. NULL

عمود ممكن يبقى NULL مينفعش يتعمله Scan في string:

~~~text الناتج: SELECT NULL::text في string
sql: Scan error on column index 0, name "text": converting NULL to string is unsupported
~~~

الحل [[sql.NullString]]: فيها [[Valid]] (هل فيه قيمة) و [[String]]:

~~~text الناتج: Scan(&ns)، ns.Valid، ns.String == ""
<nil> false true
~~~

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[_ "github.com/jackc/pgx/v5/stdlib"]] | يسجّل الـ driver [["pgx"]] |
| [[sql.Open]] | pool، مرة واحدة، ومبيتصلش |
| [[PingContext]] | اتصل بجد وافشل بدري |
| [[QueryRowContext(...).Scan(&a, &b)]] | صف واحد، و [[sql.ErrNoRows]] لو مفيش |
| [[QueryContext]] + [[rows.Next]] + [[rows.Err]] + [[rows.Close]] | صفوف كتير |
| [[ExecContext]] | INSERT و UPDATE و DELETE من غير نتايج |
| [[$1]] و [[$2]] | القيم دايمًا parameters، عمرها ما تتلزق بـ Sprintf |

- Scan بنفس ترتيب أعمدة الـ SELECT، و NULL محتاج [[sql.NullString]] أو pointer.`,
          lines: [
            "باكدج main.",
            "imports.",
            "context.",
            R`[[database/sql]]: الواجهة القياسية.`,
            "errors.",
            "fmt.",
            "log.",
            "os، عشان env.",
            "time.",
            R`الـ driver بـ [[_]]: بيسجّل نفسه باسم "pgx" وخلاص.`,
            "قفلة.",
            "struct للصف.",
            "id.",
            "email.",
            "قفلة.",
            R`بتاخد ctx والـ pool.`,
            "صف فاضي.",
            R`صف واحد بـ [[$1]]، و Scan في الحقول بالترتيب.`,
            "مفيش صف؟",
            "error واضح (الـ handler يحوّله 404).",
            "قفلة.",
            "أي error تاني أو nil.",
            "قفلة.",
            "main.",
            "اعمل الـ pool (لسه متصلش).",
            "إعدادات غلط.",
            "اقفل.",
            "قفلة.",
            "اقفل الـ pool في الآخر.",
            "حد أقصى للاتصالات.",
            "اقفل الاتصالات القاعدة كتير.",
            "مهلة لكل الشغل ده.",
            "نضّف.",
            "اتصل فعلًا واتأكد.",
            "لو مش موجودة اقفل.",
            "قفلة.",
            "هنا الـ id الجديد.",
            R`INSERT مع [[RETURNING id]]، والقيمة كـ parameter.`,
            "لو فشل (email مكرر مثلًا).",
            "اقفل.",
            "قفلة.",
            "صفوف كتير.",
            "لو فشل.",
            "اقفل.",
            "قفلة.",
            "رجّع الاتصال للـ pool في الآخر.",
            "لف على الصفوف.",
            "متغير لكل صف.",
            "انسخ الأعمدة.",
            "لو فشل.",
            "قفلة.",
            "اطبع.",
            "قفلة الـ loop.",
            "هل الـ loop وقفت بسبب error؟",
            "اقفل.",
            "قفلة.",
            "id مش موجود.",
            "قفلة."
          ],
          sol: R`أول تشغيل:
[[1 sara@example.com]]
[[{0 } user 9999: not found]]

التشغيل التاني بيقع:
[[ERROR: duplicate key value violates unique constraint "users_email_key" (SQLSTATE 23505)]]
لأن email عليه UNIQUE. في كود حقيقي بتمسك ده بـ [[errors.As(err, &pgErr)]] (النوع [[*pgconn.PgError]]) وتشيك [[pgErr.Code == "23505"]] وترد 409 Conflict بدل 500.

ولو نسيت DATABASE_URL: [[db not reachable: failed to connect to ...]]، وده بالظبط سبب الـ Ping: تعرف من أول ثانية بدل أول request.`
        },
        {
          cmd: "هيكل المشروع و env",
          title: "هيكل مشروع Go حقيقي: cmd/ و internal/، والإعدادات من env",
          desc: R`مفيش هيكل إجباري في Go، والمشروع الصغير ممكن يبقى main.go و go.mod وخلاص. لما يكبر، الشكل اللي أغلب المشاريع ماشية عليه:
• [[cmd/api/main.go]]: نقطة البداية لكل برنامج (لو عندك api و worker و cli، كل واحد فولدر). main قصيرة: تقرا الـ config، تعمل الـ dependencies، وتشغّل.
• [[internal/]]: كل كودك. مقسّم حسب المسؤولية: [[internal/config]] و [[internal/store]] (الداتابيز) و [[internal/http]] (handlers و middleware) و [[internal/order]] (البيزنس).
• [[migrations/]]: ملفات SQL.
• في الجذر: go.mod و go.sum و Dockerfile و Makefile و README.

وبتشغّله بـ [[go run ./cmd/api]]، وتبنيه بـ [[go build -o bin/api ./cmd/api]].

الإعدادات من environment variables (من مبادئ 12-factor): نفس الـ binary بيشتغل على جهازك وفي staging وفي الإنتاج، والفرق في الـ env بس. والأسرار (باسورد الداتابيز، API keys) عمرها ما تتكتب في الكود.
• [[os.Getenv("KEY")]]: القيمة أو "" لو مش موجود.
• [[os.LookupEnv("KEY")]]: القيمة و ok، فتفرّق بين «مش موجود» و «موجود وفاضي».

والأحسن تقرا الإعدادات كلها مرة واحدة في أول البرنامج في struct، وتتحقق منها، وتقع على طول لو حاجة مطلوبة ناقصة (fail fast)، بدل ما تكتشف ده في أول request.

[[time.ParseDuration("5s")]] بيفهم [[300ms]] و [[5s]] و [[2m]] و [[1h30m]].`,
          example: R`// ملف: internal/config/config.go
package config

import (
  "errors"
  "fmt"
  "os"
  "strconv"
  "time"
)

type Config struct {
  Addr        string
  DatabaseURL string
  Timeout     time.Duration
  Debug       bool
}

func getenv(key, fallback string) string {
  if v, ok := os.LookupEnv(key); ok {
    return v
  }
  return fallback
}

func Load() (Config, error) {
  cfg := Config{
    Addr:        getenv("ADDR", ":8080"),
    DatabaseURL: os.Getenv("DATABASE_URL"),
  }
  if cfg.DatabaseURL == "" {
    return cfg, errors.New("DATABASE_URL is required")
  }
  t, err := time.ParseDuration(getenv("TIMEOUT", "5s"))
  if err != nil {
    return cfg, fmt.Errorf("TIMEOUT: %w", err)
  }
  cfg.Timeout = t
  cfg.Debug, err = strconv.ParseBool(getenv("DEBUG", "false"))
  if err != nil {
    return cfg, fmt.Errorf("DEBUG: %w", err)
  }
  return cfg, nil
}`,
          try: R`اعمل المشروع بالهيكل ده: [[cmd/api/main.go]] بيعمل [[config.Load()]] ويطبع الـ config بـ [[%+v]] أو يقع بـ [[log.Fatal]] لو فيه error. جرّب: [[go run ./cmd/api]]، وبعدين [[DATABASE_URL=postgres://x go run ./cmd/api]]، وبعدين [[DATABASE_URL=x TIMEOUT=abc go run ./cmd/api]].`,
          flag: "script",
          deep: {
            why: R`الهيكل المتفق عليه بيخلي أي مبرمج Go يفتح مشروعك ويعرف فين الـ main وفين البيزنس. و internal بيمنع مشاريع تانية تعتمد على تفاصيلك. والـ env بيفصل الكود عن البيئة والأسرار، وده اللي Docker و Kubernetes ومنصات الـ deploy متوقعينه.`,
            how: R`[[getenv(key, fallback)]] helper صغير: لو المتغير موجود (حتى لو فاضي) خد قيمته، وإلا الافتراضية.

[[cfg.Debug, err = strconv.ParseBool(...)]]: بنعيد استخدام err بـ [[=]] لأنه موجود من فوق. وParseBool بتفهم [[true]] و [[1]] و [[t]] و [[false]] و [[0]].

الـ config بيترجع كقيمة (مش global) ويتعدّى للي محتاجه: [[store.New(cfg.DatabaseURL)]] و [[server.New(cfg, store)]]. ده اسمه dependency injection يدوي، ومش محتاج framework في Go: main هي اللي بتوصّل كل حاجة ببعض.

ملف [[.env]] للتطوير المحلي: Go مبتقراهوش لوحدها. يا إما [[set -a; source .env; set +a]] قبل التشغيل، أو مكتبة زي [[godotenv]]، أو Docker Compose بيقراه. والـ .env في [[.gitignore]] دايمًا.

ولو الإعدادات كتير، مكتبات زي [[caarlos0/env]] بتملا الـ struct من tags. بس الكود اليدوي ده كفاية لأغلب المشاريع.`,
            when: R`أول ما المشروع يبقى فيه أكتر من ملفين أو أكتر من برنامج. وأي قيمة بتتغيّر بين البيئات (عناوين، بورتات، مفاتيح، مهلات، مستوى اللوج) تبقى env.`,
            mistakes: R`[[pkg/]] و [[internal/]] و [[src/]] و ١٠ فولدرات لمشروع فيه ٣ ملفات. و [[os.Getenv]] متفرّقة في كل الكود بدل مكان واحد. وأسرار في الكود أو في git. وقيم مطلوبة ناقصة والسيرفر يشتغل عادي ويقع في أول request. وتسمية الباكدجات [[models]] و [[controllers]] و [[services]] (أسلوب MVC): في Go الأشهر التقسيم حسب الموضوع ([[order]] و [[user]]).`
          },
          teach: R`## الكود ده بيعمل إيه؟

باكدج اسمها [[config]] فيها دالة واحدة مهمة: [[Load()]]. بتقرا كل إعدادات البرنامج من environment variables مرة واحدة، وتحطها في struct، وترجّع error واضح لو حاجة ناقصة أو غلط. والـ main (في الـ solCode) بتناديها وتقع على طول لو فيه مشكلة.

جرّبت الهيكل كامل جوه [[docker run --rm golang:1.25]] (Go 1.25.14):

~~~text الملفات
go.mod                         module example.com/shop
cmd/api/main.go                package main (الـ solCode)
internal/config/config.go      package config (المثال)
~~~

---

## ١. اسم الباكدج والـ imports

~~~go internal/config/config.go
package config

import (
  "errors"
  "fmt"
  "os"
  "strconv"
  "time"
)
~~~

- [[package config]]: نفس اسم الفولدر. ده العرف، ومن بره هتتنادى [[config.Load()]].
- [[errors]]: لـ [[errors.New]]. و [[os]]: لقراية الـ env. و [[strconv]]: لتحويل [["true"]] لـ bool. و [[time]]: للمدد.

---

## ٢. الـ struct

~~~go internal/config/config.go
type Config struct {
  Addr        string
  DatabaseURL string
  Timeout     time.Duration
  Debug       bool
}
~~~

كل إعداد حقل، بنوعه الحقيقي مش string: [[time.Duration]] للمدة و [[bool]] للـ debug. فالتحويل بيحصل مرة واحدة هنا، وباقي الكود بياخد قيم جاهزة. والحقول بحرف كبير عشان main تشوفها.

---

## ٣. [[getenv]]: القيمة أو الافتراضي

~~~go internal/config/config.go
func getenv(key, fallback string) string {
  if v, ok := os.LookupEnv(key); ok {
    return v
  }
  return fallback
}
~~~

- [[key, fallback string]]: الاتنين string، فبنكتب النوع مرة.
- [[os.LookupEnv(key)]]: بترجّع القيمة و [[ok]]: true لو المتغير **موجود**، حتى لو قيمته فاضية.
- [[if v, ok := ...; ok]]: عرّف v و ok، وبعدين اختبر ok. والمتغيرين عايشين جوه الـ if بس.
- [[getenv]] بحرف صغير: داخلية في الباكدج، main مش شايفاها.

الفرق عن [[os.Getenv]]: Getenv بترجّع [[""]] للمتغير المش موجود وللفاضي، فمش هتعرف تفرّق. جرّبت [[ADDR=]] (موجود وفاضي): الـ Addr بقى فاضي مش [[:8080]] (تحت).

---

## ٤. [[Load]] خطوة خطوة

### القيم النصية

~~~go internal/config/config.go
func Load() (Config, error) {
  cfg := Config{
    Addr:        getenv("ADDR", ":8080"),
    DatabaseURL: os.Getenv("DATABASE_URL"),
  }
  if cfg.DatabaseURL == "" {
    return cfg, errors.New("DATABASE_URL is required")
  }
~~~

- [[Load]] بحرف كبير: exported.
- [[ADDR]] ليه افتراضي. [[DATABASE_URL]] مطلوب، فمفيش افتراضي.
- [[errors.New("...")]]: error جديد بنص ثابت. والرسالة بتقول بالظبط إيه الناقص.

### المدة

~~~go internal/config/config.go
  t, err := time.ParseDuration(getenv("TIMEOUT", "5s"))
  if err != nil {
    return cfg, fmt.Errorf("TIMEOUT: %w", err)
  }
  cfg.Timeout = t
~~~

- [[time.ParseDuration]] بتفهم أرقام بوحدة: [[ms]] و [[s]] و [[m]] و [[h]]، ومجمّعة زي [[1h30m]].
- الـ error بيتلف بـ [[%w]] واسم المتغير قدامه، عشان اللي بيشغّل يعرف يصلّح إيه.

### الـ bool

~~~go internal/config/config.go
  cfg.Debug, err = strconv.ParseBool(getenv("DEBUG", "false"))
  if err != nil {
    return cfg, fmt.Errorf("DEBUG: %w", err)
  }
  return cfg, nil
}
~~~

- [[cfg.Debug, err =]]: بنكتب في الحقل مباشرة، و err موجود من فوق فـ [[=]] مش [[:=]] (مينفعش [[:=]] مع حقل struct أصلًا).
- [[strconv.ParseBool]] بتقبل [[1]] و [[t]] و [[T]] و [[TRUE]] و [[true]] و [[True]]، ونفسهم لـ false. أي حاجة تانية error.
- [[return cfg, nil]]: كله تمام.

---

## ٥. الـ main (الـ solCode)

~~~go cmd/api/main.go
package main

import (
  "fmt"
  "log"

  "example.com/shop/internal/config"
)

func main() {
  cfg, err := config.Load()
  if err != nil {
    log.Fatal("config: ", err)
  }
  fmt.Printf("%+v\n", cfg)
}
~~~

- [["example.com/shop/internal/config"]]: اسم الـ module من go.mod + مسار الفولدر.
- [[log.Fatal("config: ", err)]]: اطبع واخرج بـ 1. ده الـ **fail fast**: السيرفر ميقومش أصلًا بإعدادات ناقصة.
- [[%+v]]: الـ struct بأسماء الحقول.

اتعمل الـ go.mod بـ:

~~~bash
go mod init example.com/shop
~~~

---

## ٦. التشغيل

[[go run ./cmd/api]]: [[./]] يعني فولدر جوه المشروع، مش ملف.

~~~text الناتج: go run ./cmd/api
2026/10/07 16:49:21 config: DATABASE_URL is required
exit status 1
~~~

~~~text الناتج: DATABASE_URL=postgres://x go run ./cmd/api
{Addr::8080 DatabaseURL:postgres://x Timeout:5s Debug:false}
~~~

[[Addr::8080]] شكلها غريب: [[Addr:]] اسم الحقل، و [[:8080]] القيمة.

~~~text الناتج: DATABASE_URL=x TIMEOUT=abc go run ./cmd/api
2026/10/07 16:49:21 config: TIMEOUT: time: invalid duration "abc"
exit status 1
~~~

الرسالة ٣ طبقات: [[config:]] من main، و [[TIMEOUT:]] من Load، والباقي من ParseDuration.

~~~text الناتج: DATABASE_URL=x DEBUG=yes go run ./cmd/api
2026/10/07 16:49:21 config: DEBUG: strconv.ParseBool: parsing "yes": invalid syntax
exit status 1
~~~

[[yes]] مش من القيم المقبولة.

~~~text الناتج: DATABASE_URL=x DEBUG=1 TIMEOUT=1h30m ADDR= go run ./cmd/api
{Addr: DatabaseURL:x Timeout:1h30m0s Debug:true}
~~~

- [[1h30m0s]]: الـ Duration بيتطبع بالشكل الكامل.
- [[Addr:]] فاضي: ADDR **موجود** وقيمته فاضية، فـ LookupEnv قالت ok.

### الـ build

~~~bash
go build -o bin/api ./cmd/api
~~~

[[-o bin/api]]: اسم ومكان الملف الناتج. طلع binary واحد حجمه حوالي 2.4 ميجا (2409315 bytes).

---

## ٧. [[internal/]] محمي فعلًا

عملت module تاني ([[example.com/other]]) بيعمل import لـ [[example.com/shop/internal/config]]:

~~~text الناتج: go build .
package example.com/other
	main.go:3:8: use of internal package example.com/shop/internal/config not allowed
~~~

أي حاجة تحت [[internal/]] متتستوردش إلا من جوه الفولدر اللي فوقه. فتقدر تغيّر فيها براحتك من غير ما تكسر حد.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[cmd/api/main.go]] | نقطة البداية، قصيرة |
| [[internal/...]] | كودك، محدش بره يستورده |
| [[os.LookupEnv]] | القيمة + هل موجود |
| [[time.ParseDuration]] / [[strconv.ParseBool]] | نص لـ Duration / bool |
| [[config.Load()]] مرة في أول main | كل الإعدادات في struct، و error واضح |
| [[log.Fatal]] لو فيه error | fail fast |

- الأسرار في env، مش في الكود ولا git.
- الرسالة تقول اسم المتغير الغلط.`,
          lines: [
            R`باكدج [[config]]: نفس اسم الفولدر.`,
            "imports.",
            "errors.",
            "fmt.",
            "os.",
            "strconv.",
            "time.",
            "قفلة.",
            "كل الإعدادات في struct واحد.",
            "عنوان السيرفر.",
            "رابط الداتابيز.",
            "مهلة.",
            "وضع الـ debug.",
            "قفلة.",
            "helper: القيمة أو الافتراضية.",
            R`[[LookupEnv]]: موجود ولا لأ.`,
            "موجود: رجّعه.",
            "قفلة.",
            "مش موجود: الافتراضي.",
            "قفلة.",
            R`[[Load]] exported: main بتناديها.`,
            "struct بالقيم.",
            "افتراضي :8080.",
            "مطلوب، من غير افتراضي.",
            "قفلة.",
            "ناقص؟",
            "اقفل بدري برسالة واضحة.",
            "قفلة.",
            R`[[5s]] لـ time.Duration.`,
            "قيمة غلط؟",
            "قول أنهي متغير.",
            "قفلة.",
            "خزّن.",
            "نص لـ bool.",
            "غلط؟",
            "قول أنهي متغير.",
            "قفلة.",
            "تمام.",
            "قفلة."
          ],
          sol: R`[[go run ./cmd/api]] من غير DATABASE_URL:
[[2026/10/01 12:00:00 config: DATABASE_URL is required]] و [[exit status 1]].

[[DATABASE_URL=postgres://x go run ./cmd/api]]:
[[{Addr::8080 DatabaseURL:postgres://x Timeout:5s Debug:false}]]

و [[TIMEOUT=abc]]:
[[config: TIMEOUT: time: invalid duration "abc"]].

والـ main (الكود تحت) قصيرة: بتحمّل وتقع لو فيه مشكلة. هنا الـ module اسمه [[example.com/shop]].`,
          solCode: R`// ملف: cmd/api/main.go
package main

import (
  "fmt"
  "log"

  "example.com/shop/internal/config"
)

func main() {
  cfg, err := config.Load()
  if err != nil {
    log.Fatal("config: ", err)
  }
  fmt.Printf("%+v\n", cfg)
}`
        }
      ]
    }
]);
