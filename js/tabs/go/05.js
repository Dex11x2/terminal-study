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
