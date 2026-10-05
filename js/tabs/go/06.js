// تكملة تاب go: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/go/01.js (شرح حقول الدرس في أوله)
MORE("go", [
    {
      t: "الاختبار والأداء",
      l: 3,
      n: "go test و table-driven tests، واختبار الـ handlers بـ httptest، و benchmarks بالأرقام، و fuzzing بيدوّر على الـ bugs لوحده، و pprof يقولك الوقت بيروح فين",
      items: [
        {
          cmd: "الاختبارات والـ Benchmarks بـ go test",
          title: "go test: اختبارات table-driven و t.Run",
          desc: R`الاختبارات في Go جوه الأداة نفسها، من غير مكتبة:
• الملف اسمه بيخلص بـ [[_test.go]] وجنب الكود في نفس الفولدر ونفس الباكدج: [[price.go]] و [[price_test.go]]. الملفات دي مش بتدخل في البناء العادي.
• الدالة اسمها بيبدأ بـ [[Test]] وبتاخد [[t *testing.T]].
• [[t.Errorf(...)]]: سجّل فشل وكمّل. [[t.Fatalf(...)]]: سجّل فشل ووقّف الاختبار ده.
• [[go test ./...]] يشغّل كل الاختبارات، و [[-v]] يطبع كل واحد، و [[-run Discount]] يشغّل اللي اسمها فيه Discount.

الشكل اللي هتلاقيه في كل كود Go اسمه table-driven: slice من حالات (الاسم والمدخلات والمتوقع)، و loop بتجرّب كلها. لو عايز تضيف حالة، تضيف سطر.

[[[]struct{ ... }{ {...}, {...} }]]: slice من struct من غير اسم، معرّف ومليان في نفس المكان.

[[t.Run(name, func(t *testing.T) { ... })]] بيعمل sub-test لكل حالة: بتتطبع لوحدها، وتقدر تشغّل واحدة بس ([[-run 'TestDiscount/min_order']]، والمسافات في الاسم بتبقى [[_]]).

والرسالة العرفية: [[Discount(200, "SAVE10") = 190, want 180]]: الدالة والمدخلات واللي طلع واللي متوقع، فتفهم من غير ما تفتح الكود.

المثال ملف الاختبار. الكود اللي بيتختبر (price.go) في الحل تحت.`,
          example: R`// ملف: price_test.go (جنب price.go في نفس الباكدج)
package price

import "testing"

func TestDiscount(t *testing.T) {
  tests := []struct {
    name  string
    total float64
    code  string
    want  float64
  }{
    {"no code", 200, "", 200},
    {"ten percent", 200, "SAVE10", 180},
    {"unknown code", 200, "FREE", 200},
    {"min order", 50, "SAVE10", 50},
  }
  for _, tc := range tests {
    t.Run(tc.name, func(t *testing.T) {
      got := Discount(tc.total, tc.code)
      if got != tc.want {
        t.Errorf("Discount(%v, %q) = %v, want %v", tc.total, tc.code, got, tc.want)
      }
    })
  }
}`,
          try: R`اعمل فولدر فيه [[go mod init example.com/price]] و price.go (من الحل) و price_test.go. شغّل [[go test -v]]. وبعدين بوّظ Discount (خليها [[total * 0.95]]) وشغّل تاني واقرا الرسايل. وبعدين ضيف حالة [[{"exact min", 100, "SAVE10", 90}]] وشغّل [[go test -cover]].`,
          flag: "script",
          deep: {
            why: R`الاختبار هو اللي بيخليك تغيّر الكود وانت مطمّن. وفي Go الاختبار رخيص جدًا: مفيش إعداد ولا مكتبة، و [[go test ./...]] بيشتغل في أي مشروع. والـ table-driven بيخلي إضافة حالة حدّية (صفر، سالب، حد بالظبط) سطر واحد.`,
            how: R`[[go test]] بيبني باكدج اختبار فيها ملفات _test.go مع الكود، ويشغّل كل [[TestXxx]]. لو أي واحد عمل Errorf أو Fatalf الباكدج بتفشل و exit code بيبقى 1، وده اللي الـ CI بيعتمد عليه.

[[Errorf]] ولا [[Fatalf]]؟ Errorf لو الاختبار يقدر يكمّل ويلاقي مشاكل تانية. Fatalf لو اللي جاي مالوش معنى (مثلًا الـ error مش nil فالقيمة مش هتتفحص).

الاختبار في نفس الباكدج ([[package price]]) بيشوف الحاجات الخاصة. ولو عايز تختبر من بره زي ما المستخدم بيشوف، اكتب [[package price_test]] واعمل import.

[[go test -cover]] بيقولك نسبة السطور اللي اتنفذت، و [[-coverprofile=c.out]] ثم [[go tool cover -html=c.out]] بيوريك أنهي سطور متجربتش.

[[t.Parallel()]] في أول الاختبار بيخليه يشتغل بالتوازي مع غيره. و [[go test -race ./...]] لازم في CI. و [[go test -count=1]] بيمنع الكاش (go test بيحفظ نتيجة الاختبارات اللي متغيرتش).

وفي ملفات [[testdata/]] بتحط ملفات تجربة، والأداة بتتجاهل الفولدر ده في البناء.`,
            when: R`كل دالة فيها منطق (حسابات، تحقق، تحويل). table-driven لما فيه أكتر من حالة. الدوال اللي بتكلّم داتابيز أو شبكة: اختبرها بـ interface و fake، أو بداتابيز حقيقية في Docker لاختبارات الـ integration.`,
            mistakes: R`ملف اسمه [[price_tests.go]] أو [[test_price.go]]: go test مش هيشوفه. ودالة [[testDiscount]] بحرف صغير: مش هتتشغّل. ورسالة [[t.Error("wrong")]] من غير القيم. واختبارات بتعتمد على بعض أو على الترتيب. ومقارنة floats بـ [[==]] بعد حسابات كتير (استخدم فرق صغير).`
          },
          lines: [
            "باكدج price: نفس باكدج الكود.",
            R`[[testing]] من المكتبة القياسية.`,
            R`اسمها يبدأ بـ Test، وبتاخد [[*testing.T]].`,
            "slice من حالات، كل حالة struct من غير اسم...",
            "...اسم الحالة.",
            "المدخل الأول.",
            "المدخل التاني.",
            "المتوقع.",
            R`قفلة النوع، و [[{]] بداية القيم.`,
            "حالة: من غير كود.",
            "خصم 10٪.",
            "كود مش معروف.",
            "تحت الحد الأدنى.",
            "قفلة.",
            "لف على الحالات.",
            "sub-test باسم الحالة.",
            "نادي الدالة.",
            "مختلف عن المتوقع؟",
            "الرسالة: الدالة والمدخلات واللي طلع واللي متوقع.",
            "قفلة.",
            "قفلة الـ sub-test.",
            "قفلة الـ loop.",
            "قفلة."
          ],
          sol: R`[[go test -v]]:
[[=== RUN   TestDiscount]]
[[=== RUN   TestDiscount/no_code]]
[[...]]
[[--- PASS: TestDiscount (0.00s)]]
[[    --- PASS: TestDiscount/no_code (0.00s)]]
[[    --- PASS: TestDiscount/ten_percent (0.00s)]]
[[    --- PASS: TestDiscount/unknown_code (0.00s)]]
[[    --- PASS: TestDiscount/min_order (0.00s)]]
[[PASS]]
[[ok  	example.com/price	0.002s]]

مع [[total * 0.95]]: [[--- FAIL: TestDiscount/ten_percent]] و [[price_test.go:22: Discount(200, "SAVE10") = 190, want 180]] و [[FAIL]] في الآخر. الحالات التانية لسه PASS.

حالة [[exact min]] بتعدّي لأن الشرط [[>= 100]]. لو كنت كاتب [[> 100]] الاختبار ده هو اللي كان هيمسكها. و [[-cover]] بيطبع [[coverage: 100.0% of statements]].`,
          solCode: R`// ملف: price.go
package price

func Discount(total float64, code string) float64 {
  if code == "SAVE10" && total >= 100 {
    return total * 0.9
  }
  return total
}`
        },
        {
          cmd: "httptest",
          title: "تختبر الـ handlers من غير ما تشغّل سيرفر: httptest",
          desc: R`[[net/http/httptest]] بيخليك تختبر handler كأنه سيرفر حقيقي، بس جوه الاختبار ومن غير بورت ولا شبكة:
• [[httptest.NewRequest(method, path, body)]]: طلب جاهز.
• [[httptest.NewRecorder()]]: [[ResponseWriter]] بيسجّل الرد: [[rec.Code]] (الـ status) و [[rec.Body]] و [[rec.Header()]].
• [[mux.ServeHTTP(rec, req)]]: نفّذ الطلب على الـ router أو الـ handler.

فبتشيك على الـ status والـ body والـ headers. ولأنك بتمرر الـ mux كله، الـ routing (المسار والـ method والـ PathValue) بيتختبر كمان.

وفيه [[httptest.NewServer(handler)]] (اللي استخدمناه في درس http.Client): سيرفر حقيقي على بورت عشوائي، مفيد لما بتختبر client بيكلّم API.

الشكل المهم: الكود بيعمل دالة [[NewMux()]] (أو [[Routes()]]) بترجّع الـ handler، و main بتشغّلها، والاختبار بيناديها. لو الـ routes متسجلة جوه main مباشرة مش هتعرف تختبرها.

في المثال ملفين في نفس الباكدج: الـ handler والاختبار. وفي الاختبار [[t.Fatalf]] على الـ status: لو الـ status غلط ملوش لازمة نفحص الـ body.`,
          example: R`// ملف: handlers.go
package api

import (
  "encoding/json"
  "net/http"
)

func NewMux() *http.ServeMux {
  mux := http.NewServeMux()
  mux.HandleFunc("GET /users/{id}", func(w http.ResponseWriter, r *http.Request) {
    if r.PathValue("id") != "1" {
      http.Error(w, "not found", http.StatusNotFound)
      return
    }
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]string{"name": "Sara"})
  })
  return mux
}

// ملف: handlers_test.go
package api

import (
  "net/http"
  "net/http/httptest"
  "strings"
  "testing"
)

func TestGetUser(t *testing.T) {
  mux := NewMux()
  tests := []struct {
    path       string
    wantStatus int
    wantBody   string
  }{
    {"/users/1", http.StatusOK, $__bt"name":"Sara"$__bt},
    {"/users/2", http.StatusNotFound, "not found"},
  }
  for _, tc := range tests {
    t.Run(tc.path, func(t *testing.T) {
      req := httptest.NewRequest(http.MethodGet, tc.path, nil)
      rec := httptest.NewRecorder()
      mux.ServeHTTP(rec, req)
      if rec.Code != tc.wantStatus {
        t.Fatalf("status = %d, want %d", rec.Code, tc.wantStatus)
      }
      if !strings.Contains(rec.Body.String(), tc.wantBody) {
        t.Errorf("body = %q, want it to contain %q", rec.Body.String(), tc.wantBody)
      }
    })
  }
}`,
          try: R`اعمل الملفين في فولدر [[api]] وشغّل [[go test -v ./...]]. وبعدين ضيف حالة لـ [[POST /users/1]] متوقع منها 405 (محتاج تغيّر NewRequest تاخد الـ method من الجدول). وحالة بتشيك إن [[Content-Type]] بتاع الرد الناجح [[application/json]].`,
          flag: "script",
          deep: {
            why: R`الـ handlers هي حدود السيرفر: هنا الـ status codes والـ JSON والـ validation، وهنا أغلب الـ bugs اللي اليوزر بيشوفها. httptest بيخليك تختبرها في ملّي ثانية من غير ما تشغّل سيرفر ولا Postman، فتشغّلها مع كل تغيير.`,
            how: R`[[NewRequest]] بيعمل [[*http.Request]] جاهز للـ handler (مش للإرسال على الشبكة)، وبيعمل panic لو المسار بايظ، ودا مقبول في الاختبار. للـ body: [[strings.NewReader($__bt{"title":"x"}$__bt)]].

[[ResponseRecorder]] بيحقق [[http.ResponseWriter]]، وبيبدأ بـ Code = 200.

[[json.NewEncoder(w).Encode]] بيحط [[\n]] في آخر الـ JSON، عشان كده بنستخدم [[strings.Contains]] مش مقارنة كاملة. للمقارنة الدقيقة، فك الـ JSON في struct وقارن الحقول.

لو الـ handler محتاج داتابيز، خلي الـ API struct ياخد interface (زي [[UserStore]])، وفي الاختبار اديله fake في الذاكرة. ده بالظبط سبب «accept interfaces» من درس الـ interfaces.

والاختبار بيمر على الـ middleware كمان لو لفّيت الـ mux بيه في NewMux.`,
            when: R`كل endpoint: الحالة الناجحة، والمدخلات الغلط (400)، والمش موجود (404)، والممنوع (401 و 403)، والـ method الغلط. و httptest.NewServer لما بتختبر client أو حاجة محتاجة URL حقيقي.`,
            mistakes: R`تسجّل الـ routes في main فمتعرفش تختبرها. وتختبر الـ handler لوحده وتسيب الـ routing (المسار غلط في الإنتاج). وتقارن JSON كنص كامل فيفشل بسبب [[\n]] أو ترتيب. وتنسى [[return]] بعد Fatalf في goroutine تانية (Fatalf لازم تتنادى من goroutine الاختبار نفسه).`
          },
          lines: [
            "باكدج api.",
            "imports.",
            "encoding/json.",
            "net/http.",
            "قفلة.",
            "دالة بترجّع الـ router: main والاختبار الاتنين بيستخدموها.",
            "router.",
            "مسار بـ id.",
            "أي id غير 1...",
            "...404.",
            "اخرج.",
            "قفلة.",
            "header.",
            R`JSON: [[{"name":"Sara"}]].`,
            "قفلة الـ handler.",
            "رجّع.",
            "قفلة.",
            "ملف الاختبار: نفس الباكدج.",
            "imports.",
            "net/http.",
            "httptest.",
            "strings.",
            "testing.",
            "قفلة.",
            "اختبار.",
            "الـ router الحقيقي.",
            "جدول حالات...",
            "...المسار.",
            "الـ status المتوقع.",
            "جزء من الـ body المتوقع.",
            "بداية القيم.",
            R`موجود: 200، والـ body فيه الاسم (raw string عشان علامات التنصيص).`,
            "مش موجود: 404.",
            "قفلة.",
            "لف.",
            "sub-test باسم المسار.",
            "طلب GET.",
            "recorder يسجّل الرد.",
            "نفّذ: routing و handler.",
            "الـ status غلط؟",
            "وقّف هنا.",
            "قفلة.",
            "الـ body فيه المتوقع؟",
            R`لو لأ، رسالة بـ [[%q]].`,
            "قفلة.",
            "قفلة الـ sub-test.",
            "قفلة الـ loop.",
            "قفلة."
          ],
          sol: R`[[go test -v ./...]]:
[[--- PASS: TestGetUser (0.00s)]]
[[    --- PASS: TestGetUser//users/1 (0.00s)]]
[[    --- PASS: TestGetUser//users/2 (0.00s)]]
(الـ [[//]] لأن اسم الـ sub-test بيبدأ بـ [[/]].)

الحالات الجديدة (الكود تحت): الجدول بقى فيه method، و [[POST /users/1]] بيرجّع 405 لأن الـ mux بيرد لوحده. والـ Content-Type بيتشيك بـ [[rec.Header().Get("Content-Type")]].`,
          solCode: R`tests := []struct {
  method     string
  path       string
  wantStatus int
}{
  {http.MethodGet, "/users/1", http.StatusOK},
  {http.MethodPost, "/users/1", http.StatusMethodNotAllowed},
}
for _, tc := range tests {
  t.Run(tc.method+" "+tc.path, func(t *testing.T) {
    rec := httptest.NewRecorder()
    mux.ServeHTTP(rec, httptest.NewRequest(tc.method, tc.path, nil))
    if rec.Code != tc.wantStatus {
      t.Fatalf("status = %d, want %d", rec.Code, tc.wantStatus)
    }
    if tc.wantStatus == http.StatusOK && rec.Header().Get("Content-Type") != "application/json" {
      t.Errorf("content-type = %q", rec.Header().Get("Content-Type"))
    }
  })
}`
        },
        {
          cmd: "go test -bench",
          title: "benchmark: تقيس السرعة والذاكرة بالأرقام بدل التخمين",
          desc: R`الـ benchmark دالة في ملف [[_test.go]] اسمها بيبدأ بـ [[Benchmark]] وبتاخد [[b *testing.B]]. جوّاها loop بتعمل الحاجة اللي عايز تقيسها:
[[for b.Loop() { ... }]]
[[b.Loop()]] (Go 1.24+) بيلف عدد مرات كفاية عشان القياس يبقى ثابت، وبيمنع الـ compiler يشيل الكود اللي جوّا لو نتيجته مش مستخدمة. في كود أقدم هتلاقي [[for i := 0; i < b.N; i++]].

[[go test -bench=. -benchmem]]:
• [[-bench=.]]: شغّل كل الـ benchmarks ([[.]] regex بيطابق أي اسم). الاختبارات العادية بتشتغل كمان، فممكن تضيف [[-run=^$]] عشان تتجاهلها.
• [[-benchmem]]: كمان الذاكرة: [[B/op]] (بايتات لكل عملية) و [[allocs/op]] (عدد مرات حجز ذاكرة).

والناتج: [[BenchmarkPlus-8   ...   12345 ns/op   ...]]: الـ 8 عدد الأنوية، و ns/op الوقت لكل عملية بالنانوثانية.

المثال بيقارن طريقتين يبنوا نص من 100 كلمة: [[+=]] و [[strings.Builder]]. الـ [[+=]] بيعمل نص جديد وينسخ كل اللي قبله في كل لفّة.`,
          example: R`// ملف: join_test.go
package text

import (
  "strings"
  "testing"
)

func joinPlus(parts []string) string {
  s := ""
  for _, p := range parts {
    s += p
  }
  return s
}

func joinBuilder(parts []string) string {
  var b strings.Builder
  for _, p := range parts {
    b.WriteString(p)
  }
  return b.String()
}

var parts = strings.Fields(strings.Repeat("go ", 100))

func BenchmarkPlus(b *testing.B) {
  for b.Loop() {
    joinPlus(parts)
  }
}

func BenchmarkBuilder(b *testing.B) {
  for b.Loop() {
    joinBuilder(parts)
  }
}`,
          try: R`شغّل [[go test -bench=. -benchmem]] واكتب الأرقام. وبعدين حسّن joinBuilder بـ [[b.Grow(...)]] (احجز المساحة مرة واحدة) وقيس تاني. وأخيرًا جرّب [[-count=5]] وشوف الأرقام بتتغيّر قد إيه بين المرات.`,
          flag: "script",
          deep: {
            why: R`الإحساس بالسرعة غالبًا غلط: الكود اللي «شكله أسرع» ممكن يبقى أبطأ، والتحسين اللي أخد يوم ممكن يوفّر 1٪. الـ benchmark بيدّيك رقم، و [[allocs/op]] بالذات بيوضّح ضغط الـ garbage collector، اللي غالبًا هو السبب الحقيقي في بطء السيرفرات تحت الحمل.`,
            how: R`[[b.Loop()]] بيشغّل الجسم مرة الأول للتسخين، وبعدين يزوّد العدد لحد ما الوقت الكلي يوصل ثانية تقريبًا ([[-benchtime=3s]] تغيّرها)، ويقسم.

الفرق في المثال: [[s += p]] كل لفّة بتعمل string جديد بطول كل اللي فات، فـ 100 كلمة = حوالي 100 حجز ذاكرة ونسخ متزايد. الـ Builder بيكبر الـ buffer بالضعف (زي append)، فعدد الحجوزات قليل. و [[b.Grow(n)]] بيحجز مرة واحدة من الأول، فـ 1 alloc بس.

الأرقام بتختلف بين الأجهزة وبين المرات. عشان تقارن نسختين صح: شغّل كل نسخة [[-count=10]] واحفظ الناتج في ملف، وقارن بأداة [[benchstat]] (من [[golang.org/x/perf]])، بتقولك الفرق حقيقي ولا عشوائي.

و [[b.ReportAllocs()]] جوه الـ benchmark نفسه زي [[-benchmem]] بس دايمًا.`,
            when: R`قبل وبعد أي تحسين أداء، على الكود اللي pprof قالك إنه تقيل (الدرس الجاي). مش على كل دالة: لو الدالة بتتنادى مرة في الطلب وبتاخد ميكروثانية، مش هي المشكلة.`,
            mistakes: R`تقيس على لابتوب شغال عليه ١٠ برامج. وتحسّن من غير ما تقيس الأول. وتحط تجهيز تقيل جوه الـ loop (لو لازم، [[b.ResetTimer()]] بعده، أو خليه بره [[b.Loop]]). ونتيجة الدالة مش مستخدمة مع [[b.N]] القديمة فالـ compiler يشيلها ويطلعلك [[0.3 ns/op]] مش حقيقي.`
          },
          lines: [
            "باكدج text.",
            "imports.",
            "strings.",
            "testing.",
            "قفلة.",
            R`الطريقة الأولى: [[+=]].`,
            "نص فاضي.",
            "لف.",
            "كل لفّة: نص جديد ونسخ كل اللي فات.",
            "قفلة.",
            "رجّع.",
            "قفلة.",
            "الطريقة التانية: Builder.",
            "Builder بالقيمة الصفرية.",
            "لف.",
            "ضيف في الـ buffer.",
            "قفلة.",
            "النص النهائي.",
            "قفلة.",
            R`مدخل ثابت: 100 كلمة "go".`,
            R`benchmark: اسمه بيبدأ بـ Benchmark، وبياخد [[*testing.B]].`,
            "لف لحد ما القياس يثبت.",
            "الحاجة اللي بنقيسها.",
            "قفلة.",
            "قفلة.",
            "التاني.",
            "لف.",
            "Builder.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`ناتج على لابتوب 4 أنوية (الأرقام عندك هتختلف):
[[BenchmarkPlus-4      	   93231	     13284 ns/op	   10736 B/op	      99 allocs/op]]
[[BenchmarkBuilder-4   	 1188517	      1050 ns/op	     504 B/op	       6 allocs/op]]

الـ Builder أسرع أكتر من ١٠ مرات وبيحجز ذاكرة أقل بكتير: 99 حجز للـ [[+=]] (واحد لكل كلمة تقريبًا) و 6 للـ Builder.

ومع [[b.Grow(n)]] (الكود تحت) بتنزل لـ [[1 allocs/op]] و [[208 B/op]]، والوقت بيقل شوية كمان. و [[-count=5]] بيبيّن إن الأرقام بتتغيّر كام في المية بين المرات، عشان كده الفرق الصغير (2٪) محتاج benchstat قبل ما تصدّقه.`,
          solCode: R`func joinBuilder(parts []string) string {
  n := 0
  for _, p := range parts {
    n += len(p)
  }
  var b strings.Builder
  b.Grow(n)
  for _, p := range parts {
    b.WriteString(p)
  }
  return b.String()
}`
        },
        {
          cmd: "go test -fuzz",
          title: "fuzzing: Go بتولّد مدخلات عشوائية وتدوّر على اللي بيكسّر الكود",
          desc: R`الاختبار العادي بيجرّب الحالات اللي انت فكّرت فيها. الـ fuzzing بيولّد آلاف المدخلات لوحده (نصوص غريبة، بايتات، أرقام حدّية) ويدوّر على واحد يخلّي الكود يقع أو يكسر قاعدة انت كاتبها.

• الدالة اسمها بيبدأ بـ [[Fuzz]] وبتاخد [[f *testing.F]].
• [[f.Add("hello")]]: أمثلة بداية (seed corpus). الـ fuzzer بيبدأ منها ويعدّل فيها.
• [[f.Fuzz(func(t *testing.T, s string) { ... })]]: الاختبار نفسه، بيتنادى بكل مدخل.

جوّاه مش بتقول «النتيجة لازم تبقى كذا» (مش عارف المدخل)، بتقول قواعد لازم تفضل صح مع أي مدخل (properties): «العكس مرتين يرجّع الأصل»، أو «الـ decode بعد الـ encode يرجّع نفس الداتا»، أو «الدالة متعملش panic».

• [[go test]] العادي بيشغّل الـ seeds بس، كاختبار عادي.
• [[go test -fuzz=FuzzReverse -fuzztime=10s]]: يولّد مدخلات لمدة 10 ثواني. لو لقى مدخل بيكسّر، بيحفظه في [[testdata/fuzz/FuzzReverse/]] فيبقى جزء من الاختبارات العادية بعد كده.

المثال فيه Reverse مكتوبة غلط عن قصد (بتعكس بايتات)، والـ fuzzer هيلاقي إن نص UTF-8 سليم بيطلع بايظ. و [[t.Skip()]] بيتخطى المدخلات اللي مش UTF-8 أصلًا.`,
          example: R`// ملف: reverse_test.go
package text

import (
  "testing"
  "unicode/utf8"
)

// غلط عن قصد: بتعكس البايتات مش الحروف
func Reverse(s string) string {
  b := []byte(s)
  for i, j := 0, len(b)-1; i < j; i, j = i+1, j-1 {
    b[i], b[j] = b[j], b[i]
  }
  return string(b)
}

func FuzzReverse(f *testing.F) {
  f.Add("hello")
  f.Add("Go 1.25")
  f.Fuzz(func(t *testing.T, s string) {
    if !utf8.ValidString(s) {
      t.Skip()
    }
    rev := Reverse(s)
    if !utf8.ValidString(rev) {
      t.Errorf("Reverse(%q) = %q is not valid UTF-8", s, rev)
    }
    if Reverse(rev) != s {
      t.Errorf("double reverse changed %q", s)
    }
  })
}`,
          try: R`شغّل [[go test]] (هيعدّي: الـ seeds إنجليزي). وبعدين [[go test -fuzz=FuzzReverse -fuzztime=30s]] واستنى. بص على الملف اللي اتعمل في [[testdata/fuzz/FuzzReverse/]]، وشغّل [[go test]] العادي تاني. وبعدين صلّح Reverse بالـ runes.`,
          flag: "script",
          deep: {
            why: R`الـ bugs الخطيرة غالبًا في المدخلات اللي محدش فكّر فيها: حرف عربي، أو نص فاضي، أو بايت 0xff، أو رقم سالب ضخم. أي parser أو decoder أو validation بياخد input من يوزر هدف ممتاز للـ fuzzing، والمكتبة القياسية نفسها لقت bugs كتير بالطريقة دي.`,
            how: R`الـ fuzzer مش عشوائي بالكامل: بيراقب الـ code coverage، ولما مدخل يوصل لفرع جديد في الكود بيحفظه ويعدّل عليه. عشان كده بيلاقي حرف متعدد البايتات بسرعة.

الأنواع المسموحة في f.Fuzz: string و [[[]byte]] والأرقام و bool. ممكن أكتر من parameter: [[func(t *testing.T, a int, s string)]].

لما يلاقي مشكلة بيطبع [[Failing input written to testdata/fuzz/FuzzReverse/<hash>]] والأمر اللي يعيد التجربة ([[go test -run=FuzzReverse/<hash>]]). الملف ده ارفعه على git: بقى regression test.

الـ fuzzing بيشتغل على كل الأنوية وبياخد CPU كتير، فمش بتشغّله في كل CI run. الأشهر: [[go test]] العادي في CI (بيشغّل الـ seeds والحالات المحفوظة)، و fuzzing طويل من وقت للتاني أو في job منفصل.`,
            when: R`parsers (JSON و CSV و بروتوكولات)، و encoders و decoders، و validation، وأي كود بيلمس بايتات أو نصوص من بره. مش مفيد قوي لكود بيكلّم داتابيز أو شبكة.`,
            mistakes: R`property ضعيفة ([[if rev == "" ...]]) فمش بيلاقي حاجة. وتمسح ملفات testdata/fuzz فالـ bug يرجع من غير ما حد يلاحظ. وتشغّل [[-fuzz]] من غير [[-fuzztime]] في CI فيفضل شغال للأبد. وتحط أكتر من Fuzz في نفس الأمر ([[-fuzz]] بياخد واحد بس).`
          },
          lines: [
            "باكدج text.",
            "imports.",
            "testing.",
            R`[[unicode/utf8]]: فحص صحة UTF-8.`,
            "قفلة.",
            "دالة العكس (الغلط).",
            "حوّل لبايتات.",
            "مؤشرين من الطرفين لحد ما يتقابلوا.",
            "بدّل.",
            "قفلة.",
            "رجّع نص.",
            "قفلة.",
            R`fuzz test: بيبدأ بـ Fuzz، وبياخد [[*testing.F]].`,
            "seed أول.",
            "seed تاني.",
            "الاختبار: بياخد مدخل متولّد s.",
            "لو المدخل نفسه مش UTF-8...",
            "...اتخطاه.",
            "قفلة.",
            "اعكس.",
            "قاعدة ١: النتيجة لازم تبقى UTF-8 سليم.",
            "سجّل الفشل بالمدخل.",
            "قفلة.",
            "قاعدة ٢: العكس مرتين يرجّع الأصل.",
            "سجّل.",
            "قفلة.",
            "قفلة الـ f.Fuzz.",
            "قفلة."
          ],
          sol: R`[[go test]] بيعدّي: [[ok]].

[[go test -fuzz=FuzzReverse -fuzztime=30s]] بيلاقي مشكلة في أقل من ثانية تقريبًا:
[[--- FAIL: FuzzReverse (0.30s)]]
[[    --- FAIL: FuzzReverse (0.00s)]]
[[        reverse_test.go:27: Reverse("ӷ") = "\xb7\xd3" is not valid UTF-8]]
[[    Failing input written to testdata/fuzz/FuzzReverse/080887cd586c9b0f]]
(الحرف اللي هيلاقيه هيختلف.)

بعدها [[go test]] العادي بيفشل كمان لأنه بيشغّل الملف المحفوظ. وبعد الإصلاح بالـ runes (الكود تحت) الاتنين بيعدّوا.`,
          solCode: R`func Reverse(s string) string {
  r := []rune(s)
  for i, j := 0, len(r)-1; i < j; i, j = i+1, j-1 {
    r[i], r[j] = r[j], r[i]
  }
  return string(r)
}`
        },
        {
          cmd: "pprof",
          title: "pprof: تعرف السيرفر بيصرف الـ CPU والذاكرة فين",
          desc: R`لما السيرفر يبقى بطيء أو الذاكرة بتزيد، متخمّنش. [[pprof]] بياخد عينات من البرنامج وهو شغال ويقولك أنهي دوال واكلة الوقت أو الذاكرة.

أسهل طريقة في سيرفر: [[import _ "net/http/pprof"]] (بـ [[_]]: بيسجّل endpoints تحت [[/debug/pprof/]] في [[http.DefaultServeMux]]). وتشغّل سيرفر تاني صغير على بورت داخلي ([[localhost:6060]]) بالـ DefaultServeMux، بعيد عن الـ API بتاعك.

وبعدين من الترمنال:
• [[go tool pprof -top "http://localhost:6060/debug/pprof/profile?seconds=10"]]: بياخد CPU profile لمدة 10 ثواني (اعمل حمل على السيرفر في الوقت ده) ويطبع أكتر الدوال.
• [[go tool pprof -http=:8081 <نفس الرابط>]]: واجهة في المتصفح فيها flame graph.
• [[/debug/pprof/heap]]: الذاكرة. و [[/debug/pprof/goroutine?debug=1]]: كل الـ goroutines وهي واقفة فين (ممتاز لاكتشاف الـ leaks).

ومن غير سيرفر: [[go test -bench=. -cpuprofile=cpu.out]] ثم [[go tool pprof cpu.out]].

[[500_000_000]]: الـ [[_]] جوه الرقم فاصل للقراية بس، زي 500,000,000.`,
          example: R`package main

import (
  "log"
  "net/http"
  _ "net/http/pprof"
)

func main() {
  // سيرفر داخلي لـ pprof على localhost بس
  go func() {
    log.Println(http.ListenAndServe("localhost:6060", nil))
  }()

  mux := http.NewServeMux()
  mux.HandleFunc("GET /work", func(w http.ResponseWriter, r *http.Request) {
    sum := 0
    for i := range 500_000_000 {
      sum += i % 7
    }
    log.Println("sum", sum)
    w.Write([]byte("done\n"))
  })
  log.Fatal(http.ListenAndServe(":8080", mux))
}`,
          try: R`شغّله، ومن ترمنال تاني اعمل حمل: [[for i in $(seq 20); do curl -s localhost:8080/work; done]]، وفي ترمنال تالت وفي نفس الوقت: [[go tool pprof -top "http://localhost:6060/debug/pprof/profile?seconds=5"]]. الدالة اللي فوق خالص اسمها إيه؟ وبعدين افتح [[http://localhost:6060/debug/pprof/goroutine?debug=1]] في المتصفح.`,
          flag: "script",
          deep: {
            why: R`في الإنتاج المشاكل بتبقى «الـ CPU 90٪» أو «الذاكرة بتزيد لحد ما الـ container يتقتل». من غير profile هتغيّر حاجات عشوائي. pprof بيقولك بالظبط الدالة والسطر، وتقدر تاخده من سيرفر شغال من غير ما توقفه.`,
            how: R`الـ CPU profile بيوقف البرنامج حوالي 100 مرة في الثانية ويسجّل الـ stack، فالدوال اللي بتظهر كتير هي اللي واكلة الوقت. التأثير على الأداء صغير، عشان كده ينفع في الإنتاج (بحذر).

في [[-top]] فيه عمودين مهمين: [[flat]] (الوقت جوّا الدالة نفسها) و [[cum]] (هي واللي بتناديه). هنا الـ handler هيبقى فوق في الاتنين.

الـ heap profile بيوريك الحجوزات: [[inuse_space]] (اللي لسه عايش، للـ memory leaks) و [[alloc_space]] (كل اللي اتحجز، لضغط الـ GC).

endpoints الـ pprof بتكشف تفاصيل داخلية عن البرنامج، فعمرها ما تتعرض للنت: [[localhost]] أو بورت داخلي مقفول بالـ firewall. لو سجّلتها على نفس الـ mux العام بالغلط، أي حد يقدر يشوفها أو يعمل profile يتقل السيرفر.

[[log.Println("sum", sum)]] عشان الـ compiler ميشيلش الـ loop لأن النتيجة مش مستخدمة.

وفيه كمان [[go tool trace]] للمشاكل اللي سببها الانتظار والتزامن مش الحساب، و continuous profiling (Pyroscope أو Grafana) بيسجّل profiles طول الوقت.`,
            when: R`لما تشوف CPU عالي، أو latency زادت، أو الذاكرة بتطلع ومش بتنزل، أو عدد الـ goroutines بيزيد. وقبل ما تكتب أي تحسين أداء: profile الأول، وبعدين benchmark للجزء ده.`,
            mistakes: R`تعرض [[/debug/pprof]] على البورت العام. وتاخد CPU profile والسيرفر فاضي فمتلاقيش حاجة (لازم حمل وقت الـ profile). وتحسّن الدالة اللي «شكلها» تقيلة بدل اللي الـ profile قال عليها. وتنسى إن الـ import بـ [[_]] بيسجّل على DefaultServeMux بس، فلو السيرفر الداخلي بتاعك بـ mux تاني مش هتلاقي الـ endpoints.`
          },
          lines: [
            "باكدج main.",
            "imports.",
            "log.",
            "net/http.",
            R`بـ [[_]]: بيسجّل [[/debug/pprof/]] على DefaultServeMux.`,
            "قفلة.",
            "main.",
            "goroutine للسيرفر الداخلي...",
            R`...على localhost:6060 بالـ DefaultServeMux ([[nil]]).`,
            "قفلة.",
            "الـ API العام بـ mux منفصل.",
            "endpoint تقيل عن قصد.",
            "مجموع.",
            R`500 مليون لفّة (ربع ثانية تقريبًا)، و [[_]] فاصل للقراية.`,
            "حساب.",
            "قفلة.",
            "استخدم النتيجة.",
            "رد.",
            "قفلة.",
            "السيرفر العام على 8080.",
            "قفلة."
          ],
          sol: R`[[go tool pprof -top]] بيطبع حاجة زي:
[[Type: cpu]]
[[Duration: 5s, Total samples = 4.71s (94.17%)]]
[[      flat  flat%   sum%        cum   cum%]]
[[     4.70s 99.79% 99.79%      4.70s 99.79%  main.main.func2]]
[[         0     0% 99.79%      4.70s 99.79%  net/http.(*ServeMux).ServeHTTP]]
[[         0     0% 99.79%      4.70s 99.79%  net/http.(*conn).serve]]
(الأرقام عندك هتختلف. ولو طلع [[Total samples = 0]] يبقى مكنش فيه حمل وقت الـ profile.)
[[main.main.func2]] هو الـ handler (الدالة التانية من غير اسم جوه main)، وده اللي واكل الوقت كله.

وصفحة [[goroutine?debug=1]] بتوريك كل goroutine شغالة ومستنية فين: هتلاقي اللي مستنيين اتصالات في [[net/http.(*conn).serve]] والـ loop بتاعة الـ listener. لو العدد ده بيزيد ومش بينزل مع الوقت، عندك goroutine leak.`
        }
      ]
    }
]);
