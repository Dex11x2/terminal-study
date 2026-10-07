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
          teach: R`## الكود ده بيعمل إيه؟

فيه ملفين جنب بعض في نفس الفولدر:

- [[price.go]] (الـ solCode): دالة [[Discount]] بتعمل خصم 10٪ بالكود [[SAVE10]] لو الطلب 100 أو أكتر.
- [[price_test.go]] (المثال): اختبار بيجرّب ٤ حالات عليها.

كل الناتج من [[go test]] جوه [[docker run --rm golang:1.25]] (Go 1.25.14)، بعد [[go mod init example.com/price]].

---

## ١. الكود اللي بيتختبر

~~~go price.go
package price

func Discount(total float64, code string) float64 {
  if code == "SAVE10" && total >= 100 {
    return total * 0.9
  }
  return total
}
~~~

- [[&&]]: «و». الشرطين لازم يتحققوا.
- [[total * 0.9]]: يعني يدفع 90٪، أي خصم 10٪.
- أي حالة تانية: نفس المبلغ.

---

## ٢. ملف الاختبار

~~~go price_test.go
package price

import "testing"

func TestDiscount(t *testing.T) {
~~~

- [[package price]]: **نفس** باكدج الكود، فالاختبار بيشوف [[Discount]] مباشرة من غير import.
- [[testing]]: الباكدج القياسية للاختبارات.
- القواعد اللي [[go test]] بيدوّر بيها:
  - الملف بيخلص بـ [[_test.go]].
  - الدالة بتبدأ بـ [[Test]] وبعدها حرف كبير، وبتاخد [[t *testing.T]] بس.
- [[t]]: من خلاله بتقول «فشل» وبتعمل sub-tests.

---

## ٣. الجدول

~~~go price_test.go
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
~~~

ده سطر واحد طويل، نفكّه:

1. [[struct { name string; total float64; ... }]]: نوع struct **من غير اسم**، معرّف هنا بس.
2. [[[]struct{...}]]: slice منه.
3. [[{ {...}, {...} }]]: القيم على طول. كل [[{"no code", 200, "", 200}]] حالة، والقيم بترتيب الحقول: الاسم، والمبلغ، والكود، والمتوقع.

| الحالة | المدخل | المتوقع | بتختبر إيه |
|---|---|---|---|
| no code | 200، [[""]] | 200 | من غير كود مفيش خصم |
| ten percent | 200، SAVE10 | 180 | الخصم نفسه |
| unknown code | 200، FREE | 200 | كود غلط |
| min order | 50، SAVE10 | 50 | تحت الحد الأدنى |

والفاصلة بعد آخر حالة **لازمة** في Go لما القفلة في سطر لوحدها.

---

## ٤. الـ loop و [[t.Run]]

~~~go price_test.go
  for _, tc := range tests {
    t.Run(tc.name, func(t *testing.T) {
      got := Discount(tc.total, tc.code)
      if got != tc.want {
        t.Errorf("Discount(%v, %q) = %v, want %v", tc.total, tc.code, got, tc.want)
      }
    })
  }
}
~~~

- [[for _, tc := range tests]]: [[_]] الـ index مش محتاجينه، و [[tc]] (test case) الحالة.
- [[t.Run(name, func(t *testing.T) {...})]]: sub-test باسم الحالة. كل واحد بينجح أو يفشل لوحده، وليه [[t]] خاص بيه.
- [[got]] و [[want]]: الأسماء العرفية في Go لـ «اللي طلع» و «اللي متوقع».
- [[t.Errorf]]: سجّل فشل **وكمّل** باقي الحالات.
- [[%v]] أي قيمة، و [[%q]] نص بين علامتين تنصيص، فالكود الفاضي يبان [[""]] مش ولا حاجة.

---

## ٥. التشغيل

### [[go test]]

~~~text الناتج
PASS
ok  	example.com/price	0.003s
~~~

### [[-v]] (verbose): كل اختبار لوحده

~~~text الناتج: go test -v
=== RUN   TestDiscount
=== RUN   TestDiscount/no_code
=== RUN   TestDiscount/ten_percent
=== RUN   TestDiscount/unknown_code
=== RUN   TestDiscount/min_order
--- PASS: TestDiscount (0.00s)
    --- PASS: TestDiscount/no_code (0.00s)
    --- PASS: TestDiscount/ten_percent (0.00s)
    --- PASS: TestDiscount/unknown_code (0.00s)
    --- PASS: TestDiscount/min_order (0.00s)
PASS
ok  	example.com/price	0.003s
~~~

- [[=== RUN]] لما يبدأ، و [[--- PASS]] لما يخلص، والمدة بين القوسين.
- المسافة في [["no code"]] بقت [[_]] في الاسم.

### [[-run]]: اختبار واحد

~~~text الناتج: go test -v -run "TestDiscount/min_order"
=== RUN   TestDiscount
=== RUN   TestDiscount/min_order
--- PASS: TestDiscount (0.00s)
    --- PASS: TestDiscount/min_order (0.00s)
PASS
ok  	example.com/price	0.003s
~~~

### الكاش

شغّلت [[go test .]] مرتين ورا بعض من غير تغيير:

~~~text الناتج
ok  	example.com/price	0.004s
ok  	example.com/price	(cached)
~~~

go test حفظ النتيجة لأن مفيش حاجة اتغيرت. [[-count=1]] بيجبره يشغّل تاني.

---

## ٦. الـ try: نبوّظ الدالة

غيّرت [[total * 0.9]] لـ [[total * 0.95]]:

~~~text الناتج: go test
--- FAIL: TestDiscount (0.00s)
    --- FAIL: TestDiscount/ten_percent (0.00s)
        price_test.go:22: Discount(200, "SAVE10") = 190, want 180
FAIL
exit status 1
FAIL	example.com/price	0.003s
~~~

- الحالة الوحيدة اللي فيها خصم هي اللي فشلت، والتلاتة التانيين عدّوا (مبيظهروش من غير [[-v]]).
- [[price_test.go:22]]: السطر اللي فيه [[t.Errorf]].
- الرسالة لوحدها بتقولك كل حاجة: الدالة، والمدخلات، واللي طلع، واللي متوقع.
- exit code 1، وده اللي بيخلي الـ CI يقف.

### حالة الحد بالظبط

ضفت سطر في الجدول:

~~~go price_test.go
    {"exact min", 100, "SAVE10", 90},
~~~

مع الكود الصح ([[>=]]) عدّت. وجرّبت أغيّر الشرط لـ [[> 100]]:

~~~text الناتج: go test
--- FAIL: TestDiscount (0.00s)
    --- FAIL: TestDiscount/exact_min (0.00s)
        price_test.go:23: Discount(100, "SAVE10") = 100, want 90
FAIL
exit status 1
FAIL	example.com/price	0.003s
~~~

الحالات الحدّية (100 بالظبط) هي اللي بتمسك الغلطات دي، وإضافتها سطر واحد.

### [[-cover]]

~~~text الناتج: go test -cover
PASS
coverage: 100.0% of statements
ok  	example.com/price	0.004s
~~~

كل سطور [[price.go]] اتنفذت مرة على الأقل.

---

## ٧. لما go test مبيشوفش اختباراتك

سمّيت الملف [[price_tests.go]]:

~~~text الناتج
?   	example.com/price	[no test files]
~~~

ورجّعت الاسم وغيّرت الدالة لـ [[testDiscount]] (حرف صغير):

~~~text الناتج
testing: warning: no tests to run
PASS
ok  	example.com/price	0.003s
~~~

**PASS** مع إن مفيش ولا اختبار اتشغّل. عشان كده بص على [[-v]] لما تكتب اختبار جديد.

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [[x_test.go]] + [[func TestXxx(t *testing.T)]] | الشكل اللي go test بيدوّر عليه |
| [[[]struct{...}{ {...}, ... }]] | جدول الحالات |
| [[t.Run(name, func(t *testing.T) {...})]] | sub-test لكل حالة |
| [[t.Errorf]] / [[t.Fatalf]] | فشل وكمّل / فشل ووقّف |
| [[-v]] / [[-run X]] / [[-cover]] / [[-count=1]] | التفاصيل / اختبار معيّن / التغطية / من غير كاش |

- الرسالة: [[F(in) = got, want want]].
- حالة جديدة = سطر جديد في الجدول.`,
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
          teach: R`## الكود ده بيعمل إيه؟

ملفين في فولدر [[api]]:

- [[handlers.go]]: دالة [[NewMux()]] بتبني الـ router وفيه مسار واحد: [[GET /users/{id}]] بيرد JSON لو الـ id بـ 1، و 404 لأي id تاني.
- [[handlers_test.go]]: اختبار بيبعت طلبات للـ router ده **من غير سيرفر ولا بورت**، ويشيك على الـ status والـ body.

الناتج من [[go test]] جوه [[docker run --rm golang:1.25]] (Go 1.25.14)، بعد [[go mod init example.com/shop]] في الفولدر اللي فوق [[api]].

---

## ١. [[NewMux]]: الـ routes في دالة

~~~go handlers.go
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
~~~

- [[*http.ServeMux]]: الدالة بترجّع الـ router. ده أهم قرار في الدرس: لو الـ routes متسجّلة جوه main، الاختبار مش هيعرف يوصلها. هنا main بتنادي [[NewMux()]] وتشغّل، والاختبار بينادي نفس الدالة.
- [[http.StatusNotFound]] = 404.
- [[json.NewEncoder(w).Encode(v)]]: اكتب v كـ JSON في w على طول. و [[map[string]string{"name": "Sara"}]] map صغيرة جاهزة.

---

## ٢. الاختبار: الجدول

~~~go handlers_test.go
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
~~~

- [[mux := NewMux()]]: الـ router الحقيقي، بكل الـ routes.
- كل حالة: المسار، والـ status المتوقع، وجزء لازم يبقى موجود في الـ body.
- [[$__bt"name":"Sara"$__bt]]: raw string عشان فيه [["]].

---

## ٣. الطلب والـ recorder

~~~go handlers_test.go
  for _, tc := range tests {
    t.Run(tc.path, func(t *testing.T) {
      req := httptest.NewRequest(http.MethodGet, tc.path, nil)
      rec := httptest.NewRecorder()
      mux.ServeHTTP(rec, req)
~~~

| السطر | بيعمل إيه |
|---|---|
| [[httptest.NewRequest(method, path, body)]] | [[*http.Request]] جاهز كأنه جاي من الشبكة. [[nil]]: مفيش body |
| [[httptest.NewRecorder()]] | [[*httptest.ResponseRecorder]]: بيحقق [[http.ResponseWriter]]، بس بدل ما يبعت، بيحفظ |
| [[mux.ServeHTTP(rec, req)]] | نفس اللي السيرفر بيعمله مع كل طلب: الـ routing ثم الـ handler |

بعدها الرد كله محفوظ في الـ recorder:

- [[rec.Code]]: الـ status.
- [[rec.Body]]: الـ body، و [[.String()]] بيحوّله نص.
- [[rec.Header()]]: الـ headers.

---

## ٤. الفحص

~~~go handlers_test.go
      if rec.Code != tc.wantStatus {
        t.Fatalf("status = %d, want %d", rec.Code, tc.wantStatus)
      }
      if !strings.Contains(rec.Body.String(), tc.wantBody) {
        t.Errorf("body = %q, want it to contain %q", rec.Body.String(), tc.wantBody)
      }
~~~

- [[t.Fatalf]] للـ status: لو الـ status غلط، فحص الـ body ملوش لازمة، فوقّف الحالة دي.
- [[!strings.Contains(a, b)]]: [[!]] يعني «مش». يعني «لو الـ body مفيهوش المتوقع».

### ليه Contains ومش [[==]]؟

طبعت الـ body الحقيقي بـ [[t.Logf]] (بيطبع في [[-v]] بس):

~~~text الناتج
    sol_test.go:36: code=200 body="{\"name\":\"Sara\"}\n" ct="application/json"
~~~

[[%q]] بيوريك الحاجات المستخبية: [[Encode]] بيحط [[\n]] في الآخر. فمقارنة كاملة بـ [[{"name":"Sara"}]] كانت هتفشل.

---

## ٥. التشغيل

[[./...]] يعني «الفولدر ده وكل اللي تحته».

~~~text الناتج: go test -v ./...
=== RUN   TestGetUser
=== RUN   TestGetUser//users/1
=== RUN   TestGetUser//users/2
--- PASS: TestGetUser (0.00s)
    --- PASS: TestGetUser//users/1 (0.00s)
    --- PASS: TestGetUser//users/2 (0.00s)
PASS
ok  	example.com/shop/api	0.005s
~~~

- [[//users/1]]: [[/]] بين اسم الاختبار والـ sub-test، والتانية أول المسار.
- [[example.com/shop/api]]: اسم الـ module + الفولدر.
- 5 ملّي ثانية للاتنين. مفيش شبكة.

### لو التوقع غلط

غيّرت الحالة التانية تتوقع 200:

~~~text الناتج: go test ./...
--- FAIL: TestGetUser (0.00s)
    --- FAIL: TestGetUser//users/2 (0.00s)
        handlers_test.go:27: status = 404, want 200
FAIL
FAIL	example.com/shop/api	0.005s
FAIL
~~~

---

## ٦. الحل: method من الجدول و Content-Type

~~~go solCode
tests := []struct {
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
}
~~~

- [[method string]] بقى في الجدول، و [[httptest.NewRequest(tc.method, ...)]] بياخده.
- [[http.StatusMethodNotAllowed]] = 405. الـ handler مكتبهوش: الـ mux هو اللي بيرده لما الـ method مش متسجّلة. فالاختبار ده بيختبر الـ routing نفسه.
- [[tc.method+" "+tc.path]]: اسم الـ sub-test.
- [[rec.Header().Get("Content-Type")]]: header من الرد. والفحص للحالة الناجحة بس ([[&&]]).

حطيته في اختبار اسمه [[TestMethods]] جوه نفس الباكدج:

~~~text الناتج: go test -v ./...
=== RUN   TestMethods
=== RUN   TestMethods/GET_/users/1
=== RUN   TestMethods/POST_/users/1
--- PASS: TestMethods (0.00s)
    --- PASS: TestMethods/GET_/users/1 (0.00s)
    --- PASS: TestMethods/POST_/users/1 (0.00s)
~~~

المسافة في الاسم بقت [[_]].

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[func NewMux() *http.ServeMux]] | الـ routes في دالة، main والاختبار يستخدموها |
| [[httptest.NewRequest(m, path, body)]] | طلب جاهز |
| [[httptest.NewRecorder()]] | ResponseWriter بيحفظ الرد |
| [[mux.ServeHTTP(rec, req)]] | نفّذ الـ routing والـ handler |
| [[rec.Code]] / [[rec.Body.String()]] / [[rec.Header().Get(k)]] | الـ status / الـ body / header |

- اختبر الـ mux كله، مش الـ handler لوحده، عشان الـ routing والـ 405 يتختبروا.
- [[Encode]] بيزوّد [[\n]]: قارن بـ Contains أو فك الـ JSON.`,
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
          teach: R`## الكود ده بيعمل إيه؟

دالتين بيعملوا نفس الحاجة: يلزقوا 100 كلمة في نص واحد. واحدة بـ [[+=]] والتانية بـ [[strings.Builder]]. وبعدهم ٢ benchmark بيقيسوا كل واحدة: بتاخد وقت قد إيه، وبتحجز ذاكرة قد إيه.

الأرقام هنا من [[go test -bench]] جوه [[docker run --rm golang:1.25]] (Go 1.25.14) على جهاز AMD Ryzen 9 5900HX (16 logical processor). أرقامك هتختلف، والمهم النسبة بين الاتنين.

---

## ١. الطريقة الأولى: [[+=]]

~~~go join_test.go
func joinPlus(parts []string) string {
  s := ""
  for _, p := range parts {
    s += p
  }
  return s
}
~~~

- [[parts []string]]: slice نصوص.
- [[s += p]]: يعني [[s = s + p]]. النصوص في Go **مبتتغيّرش** (immutable)، فكل [[+=]] بيحجز مكان جديد بطول [[s]] كله + p، وينسخ القديم فيه. يعني اللفّة رقم 50 بتنسخ 98 حرف، والـ 100 بتنسخ 198.

---

## ٢. الطريقة التانية: [[strings.Builder]]

~~~go join_test.go
func joinBuilder(parts []string) string {
  var b strings.Builder
  for _, p := range parts {
    b.WriteString(p)
  }
  return b.String()
}
~~~

- [[var b strings.Builder]]: Builder فاضي جاهز من غير تجهيز (القيمة الصفرية شغالة).
- [[b.WriteString(p)]]: ضيف في buffer جوّاه. لما يتملي بيكبر **للضعف** تقريبًا زي [[append]]، فعدد مرات الحجز قليل.
- [[b.String()]]: النص النهائي، من غير نسخة زيادة.

---

## ٣. المدخل

~~~go join_test.go
var parts = strings.Fields(strings.Repeat("go ", 100))
~~~

من جوه لبرة:

1. [[strings.Repeat("go ", 100)]]: [["go go go ... "]] 100 مرة، 300 حرف.
2. [[strings.Fields(...)]]: قطّعه على المسافات: slice فيها 100 عنصر كل واحد [["go"]].

بره أي دالة ([[var]] على مستوى الباكدج)، فبيتعمل مرة واحدة ومش بيدخل في القياس.

---

## ٤. الـ benchmarks

~~~go join_test.go
func BenchmarkPlus(b *testing.B) {
  for b.Loop() {
    joinPlus(parts)
  }
}
~~~

- الاسم بيبدأ بـ [[Benchmark]] (زي [[Test]] للاختبارات)، والملف [[_test.go]].
- [[b *testing.B]]: B = benchmark. (اسمه [[b]] هنا، ومختلف عن الـ [[b]] بتاع الـ Builder جوه joinBuilder: كل واحد في دالته.)
- [[for b.Loop()]]: لف طول ما الأداة عايزة. بتبدأ بعدد صغير وتزوّد لحد ما القياس ياخد حوالي ثانية، وبعدين تقسم الوقت على عدد اللفّات.

---

## ٥. التشغيل وقراية الأرقام

~~~bash
go test -bench=. -benchmem
~~~

- [[-bench=.]]: شغّل الـ benchmarks اللي اسمها بيطابق الـ regex ده. و [[.]] بتطابق أي حاجة.
- [[-benchmem]]: ضيف أعمدة الذاكرة.

~~~text الناتج
goos: linux
goarch: amd64
pkg: example.com/text
cpu: AMD Ryzen 9 5900HX with Radeon Graphics
BenchmarkPlus-16       	  260221	      4522 ns/op	   10736 B/op	      99 allocs/op
BenchmarkBuilder-16    	 2357856	       525.4 ns/op	     504 B/op	       6 allocs/op
PASS
ok  	example.com/text	2.423s
~~~

| العمود | في Plus | معناه |
|---|---|---|
| [[-16]] | | [[GOMAXPROCS]]: عدد الـ CPUs اللي Go شايفها |
| [[260221]] | | عدد اللفّات اللي الأداة اختارتها |
| [[ns/op]] | 4522 | الوقت لكل نداء بالنانوثانية (جزء من مليار من الثانية). يعني 4.5 ميكروثانية |
| [[B/op]] | 10736 | bytes اتحجزت في كل نداء |
| [[allocs/op]] | 99 | عدد مرات الحجز في كل نداء |

### الأرقام دي جاية منين؟

- **99 allocs** في Plus: لفّة لكل كلمة ناقص الأولى (أول [[+=]] على نص فاضي بيرجّع [["go"]] نفسها من غير حجز).
- **10736 B**: مجموع النسخ المتزايدة: 4 + 6 + 8 ... لحد 200 حرف، تقريبًا 10 آلاف، والزيادة لأن الذاكرة بتتحجز بأحجام ثابتة (size classes).
- **6 allocs** في Builder: الـ buffer بدأ 8 bytes وكبر للضعف: 8 و 16 و 32 و 64 و 128 و 256. ومجموعهم 504، وده بالظبط [[504 B/op]].
- Builder أسرع حوالي **8.6 مرة** هنا (4522 ÷ 525).

### كل ده في 2.4 ثانية؟

ثانية تقريبًا لكل benchmark، زائد البناء.

---

## ٦. الحل: [[b.Grow]]

~~~go solCode
func joinBuilder(parts []string) string {
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
}
~~~

- أول loop بتحسب الطول النهائي: [[len(p)]] طول كل كلمة بالـ bytes، والمجموع 200.
- [[b.Grow(n)]]: احجز مكان لـ n bytes **مرة واحدة** من الأول، فمفيش تكبير بعد كده.

~~~text الناتج: go test -bench=. -benchmem -run="^$"
BenchmarkPlus-16       	  282170	      4600 ns/op	   10736 B/op	      99 allocs/op
BenchmarkBuilder-16    	 2994922	       383.0 ns/op	     208 B/op	       1 allocs/op
~~~

- [[1 allocs/op]]: حجز واحد بس.
- [[208 B/op]] مش 200: Go بيحجز بأحجام جاهزة، وأقرب واحد أكبر من 200 هو 208.
- [[-run="^$"]]: regex مبيطابقش أي اسم ([[^]] بداية و [[$]] نهاية وفاضي بينهم)، فالاختبارات العادية مش هتشتغل.

---

## ٧. [[-count=5]]: الأرقام بتتهز قد إيه؟

~~~text الناتج: go test -bench=Builder -benchmem -count=5
BenchmarkBuilder-16    	 3316180	       417.9 ns/op	     208 B/op	       1 allocs/op
BenchmarkBuilder-16    	 2349795	       504.0 ns/op	     208 B/op	       1 allocs/op
BenchmarkBuilder-16    	 1537080	       767.4 ns/op	     208 B/op	       1 allocs/op
BenchmarkBuilder-16    	 1547250	       787.8 ns/op	     208 B/op	       1 allocs/op
BenchmarkBuilder-16    	 1471884	       838.5 ns/op	     208 B/op	       1 allocs/op
~~~

نفس الكود بالظبط، والوقت راح من 418 لـ 838 ns/op، لأن الجهاز كان شغّال عليه حاجات تانية (Docker والبرامج اللي مفتوحة). لكن [[B/op]] و [[allocs/op]] **ثابتين**: الذاكرة مش بتتأثر بالضوضاء دي. عشان كده:

- قارن الذاكرة بثقة، والوقت بحذر.
- لمقارنة وقت جد: [[-count=10]] لكل نسخة، وأداة [[benchstat]].

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [[func BenchmarkX(b *testing.B)]] + [[for b.Loop()]] | شكل الـ benchmark |
| [[-bench=.]] / [[-benchmem]] / [[-run="^$"]] / [[-count=N]] | شغّلهم / الذاكرة / من غير اختبارات / كرر |
| [[ns/op]] | الوقت لكل نداء، بيتهز مع حمل الجهاز |
| [[B/op]] و [[allocs/op]] | الذاكرة، ثابتة |

- [[+=]] في loop على نصوص: نسخ متزايد. استخدم [[strings.Builder]]، و [[Grow]] لو عارف الطول.
- قيس قبل ما تحسّن وبعده.`,
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

ومع [[b.Grow(n)]] (الكود تحت) بتنزل لـ [[1 allocs/op]] و [[208 B/op]]، والوقت بيقل شوية كمان. و [[-count=5]] بيبيّن إن الوقت بيتغيّر بين المرات على نفس الكود (لما الجهاز عليه حمل، ممكن يوصل للضعف)، و B/op و allocs/op ثابتين، عشان كده الفرق الصغير (2٪) محتاج benchstat قبل ما تصدّقه.`,
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
          teach: R`## الكود ده بيعمل إيه؟

دالة [[Reverse]] المفروض تعكس نص، بس مكتوبة غلط عن قصد. وتحتها fuzz test مش بيقول «Reverse("abc") لازم تبقى cba»، بيقول قاعدتين لازم يفضلوا صح مع **أي** نص، وبيسيب Go تولّد نصوص لحد ما تلاقي واحد بيكسرهم.

الناتج من [[go test]] جوه [[docker run --rm golang:1.25]] (Go 1.25.14) على جهاز 16 logical processor.

---

## ١. الـ bug: [[Reverse]] بتعكس bytes

~~~go reverse_test.go
func Reverse(s string) string {
  b := []byte(s)
  for i, j := 0, len(b)-1; i < j; i, j = i+1, j-1 {
    b[i], b[j] = b[j], b[i]
  }
  return string(b)
}
~~~

- [[[]byte(s)]]: النص كـ bytes. في UTF-8 الحرف الإنجليزي byte واحد، والعربي 2، والإيموجي 4.
- [[for i, j := 0, len(b)-1; i < j; i, j = i+1, j-1]]: loop بمؤشرين: [[i]] من الأول و [[j]] من الآخر، يقرّبوا من بعض لحد ما يتقابلوا.
- السطر اللي جوّا بيبدّل [[b[i]]] و [[b[j]]] في سطر واحد: Go بتحسب الطرف اليمين كله الأول، وبعدين تكتب في الشمال.

مع [["hello"]] شغالة تمام. بس حرف من 2 bytes هيتعكس بالـ bytes بتوعه، فيبقى bytes ملهاش معنى.

---

## ٢. الـ imports

~~~go reverse_test.go
import (
  "testing"
  "unicode/utf8"
)
~~~

[[unicode/utf8]] فيها [[utf8.ValidString(s)]]: هل الـ bytes دي UTF-8 سليم؟

---

## ٣. الـ fuzz test

~~~go reverse_test.go
func FuzzReverse(f *testing.F) {
  f.Add("hello")
  f.Add("Go 1.25")
~~~

- الاسم بيبدأ بـ [[Fuzz]]، وبياخد [[f *testing.F]] (F = fuzz).
- [[f.Add(...)]]: **seeds**، أمثلة بداية. الـ fuzzer بيبدأ منها ويغيّر فيها (يزوّد bytes، يشيل، يبدّل). ونوع اللي في Add لازم يطابق الـ parameter تحت (string هنا).

~~~go reverse_test.go
  f.Fuzz(func(t *testing.T, s string) {
    if !utf8.ValidString(s) {
      t.Skip()
    }
~~~

- [[f.Fuzz(func(t *testing.T, s string) {...})]]: الدالة دي بتتنادى مع كل مدخل، و [[s]] هو المدخل.
- لو المدخل نفسه مش UTF-8 سليم، [[t.Skip()]]: اتخطاه، مش ذنب Reverse.

### القاعدتين (properties)

~~~go reverse_test.go
    rev := Reverse(s)
    if !utf8.ValidString(rev) {
      t.Errorf("Reverse(%q) = %q is not valid UTF-8", s, rev)
    }
    if Reverse(rev) != s {
      t.Errorf("double reverse changed %q", s)
    }
  })
}
~~~

1. نص سليم معكوس لازم يفضل سليم.
2. العكس مرتين يرجّع الأصل.

مش محتاجين نعرف النتيجة الصح لكل مدخل: القواعد دي صح لأي نص.

---

## ٤. [[go test]] العادي: الـ seeds بس

~~~text الناتج: go test -v
=== RUN   FuzzReverse
=== RUN   FuzzReverse/seed#0
=== RUN   FuzzReverse/seed#1
--- PASS: FuzzReverse (0.00s)
    --- PASS: FuzzReverse/seed#0 (0.00s)
    --- PASS: FuzzReverse/seed#1 (0.00s)
PASS
ok  	example.com/text	0.005s
~~~

عدّى، لأن الـ seeds إنجليزي، والـ bytes = الحروف.

---

## ٥. [[go test -fuzz]]: دوّر

~~~bash
go test -fuzz=FuzzReverse -fuzztime=30s
~~~

- [[-fuzz=FuzzReverse]]: اسم الـ fuzz test (واحد بس).
- [[-fuzztime=30s]]: أقصى مدة. من غيرها بيفضل شغال لحد ما يلاقي حاجة أو تضغط Ctrl+C.

~~~text الناتج
fuzz: elapsed: 0s, gathering baseline coverage: 0/2 completed
fuzz: elapsed: 0s, gathering baseline coverage: 2/2 completed, now fuzzing with 16 workers
fuzz: minimizing 34-byte failing input file
fuzz: elapsed: 0s, minimizing
--- FAIL: FuzzReverse (0.18s)
    --- FAIL: FuzzReverse (0.00s)
        reverse_test.go:27: Reverse("ܱ") = "\xb1\xdc" is not valid UTF-8
    
    Failing input written to testdata/fuzz/FuzzReverse/65ffe8f5edc5049a
    To re-run:
    go test -run=FuzzReverse/65ffe8f5edc5049a
FAIL
exit status 1
FAIL	example.com/text	0.201s
~~~

نقرا السطور:

| السطر | معناه |
|---|---|
| [[gathering baseline coverage]] | شغّل الـ seeds الأول وشاف أنهي أجزاء من الكود اتنفذت |
| [[fuzzing with 16 workers]] | process لكل CPU، كلهم بيولّدوا مدخلات |
| [[minimizing 34-byte failing input]] | لقى مدخل 34 byte بيكسّر، فبيصغّره لأصغر شكل لسه بيكسّر |
| [[Reverse("ܱ") = "\xb1\xdc"]] | المدخل بعد التصغير: حرف واحد (سرياني) من 2 bytes |
| [[Failing input written to ...]] | اتحفظ في ملف |

### ليه [["\xb1\xdc"]]؟

الحرف [[ܱ]] في UTF-8 هو الـ bytes [[dc b1]]. Reverse قلبتهم [[b1 dc]]، و [[b1]] مينفعش يبدأ حرف في UTF-8، فالنتيجة بايظة. و [[%q]] بيطبع الـ bytes البايظة بشكل [[\x]] + رقم hex عشان تشوفها.

ولقاه في أقل من ثانية لأن الـ fuzzer بيراقب الـ coverage: أي مدخل يوصل لكود جديد بيركّز عليه.

> الحرف اللي هيلاقيه عندك هيختلف، المدخلات عشوائية.

---

## ٦. الملف المحفوظ

~~~text الناتج: cat testdata/fuzz/FuzzReverse/65ffe8f5edc5049a
go test fuzz v1
string("ܱ")
~~~

ملف نصي صغير فيه المدخل. ومن دلوقتي [[go test]] **العادي** بيشغّله مع الـ seeds:

~~~text الناتج: go test -v
=== RUN   FuzzReverse
=== RUN   FuzzReverse/seed#0
=== RUN   FuzzReverse/seed#1
=== RUN   FuzzReverse/65ffe8f5edc5049a
    reverse_test.go:27: Reverse("ܱ") = "\xb1\xdc" is not valid UTF-8
--- FAIL: FuzzReverse (0.01s)
    --- PASS: FuzzReverse/seed#0 (0.00s)
    --- PASS: FuzzReverse/seed#1 (0.00s)
    --- FAIL: FuzzReverse/65ffe8f5edc5049a (0.00s)
FAIL
exit status 1
FAIL	example.com/text	0.010s
~~~

ارفع فولدر [[testdata/]] على git: بقى regression test، والـ bug ده مش هيرجع من غير ما حد يعرف.

---

## ٧. الحل: اعكس [[rune]]s

~~~go solCode
func Reverse(s string) string {
  r := []rune(s)
  for i, j := 0, len(r)-1; i < j; i, j = i+1, j-1 {
    r[i], r[j] = r[j], r[i]
  }
  return string(r)
}
~~~

السطر الوحيد اللي اتغيّر بجد: [[[]rune(s)]] بدل [[[]byte(s)]]. الـ [[rune]] هو الحرف نفسه (Unicode code point) مهما كان عدد الـ bytes بتوعه، فبنعكس حروف مش bytes. و [[string(r)]] بيرجّعهم UTF-8 صح.

~~~text الناتج: go test -v
--- PASS: FuzzReverse (0.01s)
    --- PASS: FuzzReverse/seed#0 (0.00s)
    --- PASS: FuzzReverse/seed#1 (0.00s)
    --- PASS: FuzzReverse/65ffe8f5edc5049a (0.00s)
PASS
ok  	example.com/text	0.009s
~~~

~~~text الناتج: go test -fuzz=FuzzReverse -fuzztime=10s (آخر السطور)
fuzz: elapsed: 6s, execs: 336908 (47481/sec), new interesting: 26 (total: 38)
fuzz: elapsed: 9s, execs: 366179 (9759/sec), new interesting: 27 (total: 39)
fuzz: elapsed: 11s, execs: 371483 (2482/sec), new interesting: 27 (total: 39)
PASS
ok  	example.com/text	11.171s
~~~

- [[execs]]: عدد المدخلات اللي اتجربت (أكتر من 370 ألف في 10 ثواني).
- [[new interesting]]: مدخلات وصلت لكود جديد، فاتحفظت في كاش الـ fuzzer (مش في testdata) عشان المرة الجاية.

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [[func FuzzX(f *testing.F)]] | شكل الـ fuzz test |
| [[f.Add(seed)]] | أمثلة بداية |
| [[f.Fuzz(func(t *testing.T, s string) {...})]] | الاختبار، بيتنادى مع كل مدخل |
| [[t.Skip()]] | اتخطى المدخل ده |
| [[go test]] | seeds + الملفات المحفوظة بس |
| [[go test -fuzz=X -fuzztime=30s]] | ولّد مدخلات لمدة محددة |
| [[testdata/fuzz/X/]] | المدخلات اللي كسرت، ترفعها على git |

- اكتب قواعد (properties) مش نتايج: «سليم يفضل سليم»، «مرتين يرجّع الأصل».
- [[[]byte]] للـ bytes و [[[]rune]] للحروف.`,
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
          teach: R`## البرنامج ده بيعمل إيه؟

سيرفرين في نفس البرنامج:

- [[:8080]]: الـ API العام، فيه endpoint واحد [[/work]] تقيل عن قصد (loop بـ 500 مليون لفّة).
- [[localhost:6060]]: سيرفر داخلي فيه صفحات pprof، اللي بتقولك البرنامج بيصرف وقته فين.

جرّبته جوه [[docker run --rm golang:1.25]] (Go 1.25.14)، والحمل بـ curl و [[go tool pprof]] من نفس الـ container.

---

## ١. الـ import بـ [[_]]

~~~go main.go
import (
  "log"
  "net/http"
  _ "net/http/pprof"
)
~~~

[[_ "net/http/pprof"]]: blank import. احنا مش هنستخدم منها أي اسم، بس الـ [[init()]] بتاعتها بتشتغل أول ما البرنامج يقوم، وبتسجّل مسارات [[/debug/pprof/...]] على [[http.DefaultServeMux]]: الـ router الـ global اللي Go عاملهولك جاهز.

---

## ٢. السيرفر الداخلي

~~~go main.go
  go func() {
    log.Println(http.ListenAndServe("localhost:6060", nil))
  }()
~~~

- [[go func() {...}()]]: شغّل الدالة دي في goroutine لوحدها، لأن [[ListenAndServe]] مبترجعش، ولو اتنادت عادي main هتقف عندها ومش هتوصل للسيرفر التاني.
- [[nil]] مكان الـ mux: يعني «استخدم [[http.DefaultServeMux]]»، اللي فيه مسارات pprof.
- [[localhost:6060]]: مش [[:6060]]. كده السيرفر بيسمع على localhost بس، ومحدش من بره الجهاز يوصله.
- [[log.Println]] مش [[log.Fatal]]: لو السيرفر الداخلي وقع، اكتب وكمّل، متوقعش الـ API.

---

## ٣. الـ API العام بـ mux منفصل

~~~go main.go
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
~~~

- [[mux]] بتاعنا مش الـ DefaultServeMux، فمسارات pprof **مش** عليه:

~~~text الناتج: curl -i localhost:8080/debug/pprof/
HTTP/1.1 404 Not Found
~~~

- [[for i := range 500_000_000]]: من Go 1.22 تقدر تعمل range على رقم: i من 0 لـ 499,999,999. والـ [[_]] جوه الرقم للقراية بس.
- [[i % 7]]: باقي القسمة على 7 (من 0 لـ 6).
- [[log.Println("sum", sum)]]: بنستخدم النتيجة عشان الـ compiler ميشيلش الـ loop.

~~~text لوج السيرفر
2026/10/07 16:55:27 sum 1499999994
~~~

الطلب الواحد أخد حوالي 370ms (قسته بـ [[date +%s%N]] قبل وبعد curl).

---

## ٤. خد CPU profile وفيه حمل

الـ profile بيسجّل اللي بيحصل **وقت أخده بس**. لو السيرفر فاضي مش هيلاقي حاجة. فشغّلت ٢٠ طلب في الخلفية:

~~~bash
for i in $(seq 20); do curl -s localhost:8080/work; done
~~~

وفي نفس الوقت:

~~~bash
go tool pprof -top "http://localhost:6060/debug/pprof/profile?seconds=5"
~~~

- [[go tool pprof]]: الأداة اللي بتقرا الـ profiles، جاية مع Go.
- [[-top]]: اطبع جدول بأتقل الدوال في الترمنال (من غيرها بتفتح shell تفاعلي).
- [[/debug/pprof/profile?seconds=5]]: CPU profile لمدة 5 ثواني.

~~~text الناتج
Fetching profile over HTTP from http://localhost:6060/debug/pprof/profile?seconds=5
Saved profile in /root/pprof/pprof.t5.samples.cpu.001.pb.gz
File: t5
Build ID: a4dcfadff4c3ab381e1f2c5bde877513a019ecbf
Type: cpu
Time: 2026-10-07 16:55:29 UTC
Duration: 5.12s, Total samples = 4.86s (94.94%)
Showing nodes accounting for 4.84s, 99.59% of 4.86s total
Dropped 1 node (cum <= 0.02s)
      flat  flat%   sum%        cum   cum%
     4.84s 99.59% 99.59%      4.86s   100%  main.main.func2
         0     0% 99.59%      4.86s   100%  net/http.(*ServeMux).ServeHTTP
         0     0% 99.59%      4.86s   100%  net/http.(*conn).serve
         0     0% 99.59%      4.86s   100%  net/http.HandlerFunc.ServeHTTP
         0     0% 99.59%      4.86s   100%  net/http.serverHandler.ServeHTTP
~~~

### نقرا الأرقام

- [[Saved profile in ...]]: الملف اتحفظ، فتقدر تفتحه تاني بعدين بـ [[go tool pprof <الملف>]] من غير ما تعيد الحمل.
- [[File: t5]]: اسم الـ binary (اسم الفولدر).
- [[Duration: 5.12s, Total samples = 4.86s (94.94%)]]: الـ profile أخد 5 ثواني، والبرنامج كان بيستخدم CPU 4.86 ثانية منهم، يعني core واحد تقريبًا طول الوقت (الطلبات ورا بعض، واحد ورا واحد).

| العمود | معناه |
|---|---|
| [[flat]] | الوقت جوّا الدالة نفسها |
| [[flat%]] | نفس الرقم كنسبة من الكل |
| [[sum%]] | مجموع flat% للسطر ده واللي فوقه |
| [[cum]] | cumulative: الدالة + كل اللي بتناديه |
| [[cum%]] | كنسبة |

### مين [[main.main.func2]]؟

الدوال اللي من غير اسم Go بتسميها بمكانها: جوه [[main.main]]، رقم 2. الأولى ([[func1]]) هي الـ goroutine بتاعة السيرفر الداخلي، والتانية الـ handler بتاع [[/work]]. وهي [[flat]] 99.59%: الوقت كله جوّاها.

ودوال [[net/http]] تحتها [[flat]] صفر و [[cum]] 100%: مبتعملش حاجة تقيلة بنفسها، بس هي اللي نادت الـ handler.

---

## ٥. الـ goroutines

~~~bash
curl "localhost:6060/debug/pprof/goroutine?debug=1"
~~~

[[debug=1]]: نص مقروء بدل ملف binary.

~~~text الناتج (أول سطر وجزء من goroutine)
goroutine profile: total 6
...
1 @ 0x445b39 0x485b9b 0x66cf36 0x626e49 0x628cc7 0x62fcee 0x625265 0x4845e1
#	0x66cf35	main.main.func2+0x35			/w/t5/main.go:19
#	0x626e48	net/http.HandlerFunc.ServeHTTP+0x28	/usr/local/go/src/net/http/server.go:2322
#	0x628cc6	net/http.(*ServeMux).ServeHTTP+0x1c6	/usr/local/go/src/net/http/server.go:2861
...
~~~

- [[total 6]]: 6 goroutines شغالة دلوقتي.
- كل مجموعة: [[1 @]] يعني «goroutine واحدة واقفة في المكان ده»، وتحتها الـ stack: مين نادى مين، والملف والسطر.
- اللي فوق: الـ handler في [[main.go:19]] (سطر الـ [[sum += i % 7]]). وفي الباقي: الـ listener واقف في [[Accept]] مستني اتصالات، وواحدة واقفة في [[pprof.Index]] (اللي بتجاوب الطلب ده نفسه).

لو رقم [[total]] بيزيد مع الوقت ومبينزلش، عندك goroutines اتعملت ومبتخلصش (goroutine leak)، والصفحة دي بتقولك هي واقفة فين.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[_ "net/http/pprof"]] | تسجّل [[/debug/pprof/]] على DefaultServeMux |
| [[http.ListenAndServe("localhost:6060", nil)]] في goroutine | سيرفر داخلي بالـ DefaultServeMux |
| mux منفصل للـ API | pprof ميبقاش على البورت العام |
| [[go tool pprof -top ".../profile?seconds=5"]] | CPU profile وأتقل الدوال |
| [[flat]] / [[cum]] | جوّا الدالة / هي واللي تحتها |
| [[/debug/pprof/goroutine?debug=1]] | كل الـ goroutines وواقفة فين |

- خد الـ profile **وفيه حمل**.
- حسّن الدالة اللي فوق في الـ profile، مش اللي «شكلها» تقيلة.`,
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
