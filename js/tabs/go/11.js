// تكملة تاب go: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/go/01.js (شرح حقول الدرس في أوله)
MORE("go", [
    {
      t: "الانترفيو ومشروع كامل",
      l: 3,
      n: "الأسئلة اللي بتتسأل في انترفيوهات Go بإجاباتها، ومشروع REST API كامل بيجمع كل اللي فات",
      items: [
        {
          cmd: "أسئلة انترفيو Go",
          title: "أسئلة انترفيو Go المشهورة: slices و maps و nil و goroutines و channels",
          desc: R`أسئلة انترفيو Go غالبًا بتيجي من نفس المواضيع. المثال تحت فيه ٥ أسئلة «الكود ده بيطبع إيه؟»، وتحت إجابات مختصرة لأشهر الأسئلة النظرية:

• goroutine ولا thread؟ الـ goroutine بيديرها الـ runtime بتاع Go، وبتبدأ بـ stack صغير (حوالي 2KB) بيكبر لو احتاج، وكتير منها بتتوزع على عدد قليل من threads نظام التشغيل (M:N scheduling). فتقدر تشغّل مئات الآلاف.
• buffered ولا unbuffered channel؟ unbuffered: الإرسال بيستنى لحد ما حد يستقبل (تزامن). buffered: بيستنى بس لما تتملي.
• channel مقفولة أو nil: الاستقبال من مقفولة بيرجّع القيمة الصفرية فورًا، والإرسال عليها panic، و close مرتين panic. والإرسال أو الاستقبال على nil channel بيستنى للأبد.
• slice جوّاها إيه؟ pointer لـ array و len و cap. وأكتر من slice ممكن يشاوروا على نفس الـ array، فـ append على واحدة ممكن يكتب في التانية.
• map و goroutines: مش آمن للكتابة المتزامنة، والـ runtime بيوقف البرنامج بـ [[concurrent map writes]]. الحل Mutex أو [[sync.Map]].
• make ولا new؟ [[make]] للـ slices والـ maps والـ channels بس، وبترجّع قيمة جاهزة للاستخدام. [[new(T)]] لأي نوع، وبترجّع [[*T]] لقيمة صفرية.
• value ولا pointer receiver؟ pointer لو بتعدّل أو الـ struct كبير أو فيه Mutex، ووحّدهم في النوع الواحد.
• interface و nil: interface فيه typed nil pointer مش بيساوي nil.
• defer: بيتنفذ بالعكس (LIFO)، والـ arguments بتتحسب وقت كتابة defer.
• goroutine leak إيه وإزاي تمنعه؟ goroutine مستنية حاجة مش هتحصل. الحل: context للإلغاء، و buffered channels للنتايج، وكل goroutine ليها طريقة واضحة تخلص بيها.
• الـ GC في Go: concurrent mark-and-sweep، بيشتغل جنب البرنامج ووقفاته قصيرة جدًا (غالبًا أقل من ملّي ثانية). وبتتحكم فيه بـ [[GOGC]] و [[GOMEMLIMIT]].
• errors ولا exceptions؟ الـ errors قيم بترجع من الدوال، وبتتغلّف بـ [[%w]] وبتتسأل بـ errors.Is و As. و panic للحاجات المستحيلة بس.`,
          example: R`package main

import "fmt"

type T struct{}

func (T) String() string { return "T" }

func main() {
  // ١. slices بتشارك نفس الـ array
  s := make([]int, 3, 10)
  a := append(s, 4)
  b := append(s, 5)
  fmt.Println(a[3], b[3])

  // ٢. nil map: القراية تمام
  var m map[string]int
  fmt.Println(m["x"], len(m))

  // ٣. interface فيه nil pointer
  var p *T
  var st fmt.Stringer = p
  fmt.Println(st == nil)

  // ٤. range بيدّي نسخة
  x := []int{1, 2, 3}
  for _, v := range x {
    v *= 10
    _ = v
  }
  fmt.Println(x)

  // ٥. defer بالعكس، والقيمة بتتحسب وقت ما تكتبه
  for i := range 3 {
    defer fmt.Print(i, " ")
  }
}`,
          try: R`قبل ما تشغّل: اكتب على ورقة كل سطر هيطبع إيه وليه. وبعدين شغّل وقارن. وبعدين جاوب بصوت عالي (زي الانترفيو) على: «لو عندك 10,000 URL عايز تعملهم fetch بأسرع وقت من غير ما توقع الـ API، هتعمل إيه؟».`,
          flag: "script",
          deep: {
            why: R`انترفيوهات Go بتختبر إنك فاهم إزاي اللغة بتشتغل من جوّا، مش إنك حافظ syntax. الأسئلة دي بالذات بتتسأل لأن كل واحد فيها بيسبب bug حقيقي في الإنتاج لو مش فاهمه.`,
            how: R`١: s طولها 3 والـ cap بتاعها 10، فالـ append الأول كتب 4 في الخانة 3 من نفس الـ array، والتاني كتب 5 في نفس الخانة. a و b الاتنين بيشاوروا عليها: [[5 5]].

٢: nil map بيرجّع الصفر في القراية: [[0 0]]. الكتابة هي اللي بتعمل panic.

٣: st جوّاه النوع [[*T]] وقيمة nil: [[false]].

٤: v نسخة، فـ x متغيّرش: [[[1 2 3]]]. ([[_ = v]] مش لازم: جرّبت من غيره والكود اتبنى عادي و go vet مقالش حاجة. هو بس بيوضّح إن قيمة v الجديدة مش مستخدمة.)

٥: الـ defers بتتنفذ لما main تخلص بالعكس: [[2 1 0]].

وسؤال الـ 10,000 URL: الإجابة الكويسة فيها: errgroup أو worker pool بحد (مثلًا 20)، و http.Client واحد بـ timeout، و context بمهلة كلية بيتلغي مع أول error لو ده المطلوب (أو تجمع الأخطاء لو لأ)، و retry بـ backoff للـ 5xx بس، واحترام الـ rate limit (429 و Retry-After).`,
            when: R`قبل أي انترفيو Go. وكمان كـ checklist وانت بتعمل code review: الحاجات دي هي اللي بتعدّي من غير ما حد يلاحظ.`,
            mistakes: R`تحفظ إجابات من غير ما تجرّب الكود بنفسك. وتقول «goroutines أسرع من threads» من غير ما تشرح ليه (أخف في الذاكرة والـ scheduling، مش أسرع في الحساب). وتقول «Go مفيهاش OOP» (فيها: structs و methods و interfaces و composition، بس مفيش inheritance).`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

٥ أسئلة «الكود ده بيطبع إيه؟» من أشهر أسئلة انترفيو Go، في برنامج واحد. كل سؤال فخ بيعدّي على ناس كتير. قبل ما تقرا الشرح، خمّن الناتج بنفسك.

الناتج من [[go run .]] جوه [[docker run --rm golang:1.25]] (Go 1.25.14):

~~~text الناتج
5 5
0 0
false
[1 2 3]
2 1 0 
~~~

---

## الأول: النوع [[T]]

~~~go main.go
type T struct{}

func (T) String() string { return "T" }
~~~

- [[struct{}]]: struct فاضي، مفيهوش حقول.
- [[func (T) String() string]]: method اسمها [[String]] على T. الـ receiver من غير اسم لأننا مش محتاجينه.
- أي نوع عنده [[String() string]] بيحقق الـ interface اللي اسمه [[fmt.Stringer]]. ومعنى كده إن [[T]] و [[*T]] الاتنين بيحققوه (الـ pointer بياخد methods الـ value).

---

## ١. slices بتشارك نفس الـ array

~~~go main.go
  s := make([]int, 3, 10)
  a := append(s, 4)
  b := append(s, 5)
  fmt.Println(a[3], b[3])
~~~

- [[make([]int, 3, 10)]]: slice طولها (len) 3، وسعتها (cap) 10. يعني array تحتها فيها 10 خانات، والـ slice شايفة أول 3 بس.
- [[append(s, 4)]]: فيه مكان (3 < 10)، فـ append **مبتعملش array جديدة**: بتكتب 4 في الخانة 3 من نفس الـ array، وترجّع slice جديدة طولها 4.
- [[append(s, 5)]]: [[s]] نفسها لسه طولها 3، فبتكتب 5 في **نفس الخانة 3** فوق الـ 4.
- [[a]] و [[b]] بيشاوروا على نفس الـ array:

~~~text الناتج
5 5
~~~

طبعت الأطوال عشان تبان:

~~~text الناتج: len(s), cap(s), len(a), cap(a)
3 10 4 10
~~~

الدرس: الـ slice = pointer لـ array + len + cap. ولو عايز نسخة مستقلة استخدم [[slices.Clone]] أو [[copy]].

---

## ٢. nil map: القراية تمام

~~~go main.go
  var m map[string]int
  fmt.Println(m["x"], len(m))
~~~

- [[var m map[string]int]]: map متعرّفة من غير [[make]]، قيمتها nil.
- القراية من nil map بترجّع القيمة الصفرية (0)، و [[len]] بيرجّع 0. مفيش panic:

~~~text الناتج
0 0
~~~

لكن الكتابة:

~~~text الناتج: m["x"] = 1
panic: assignment to entry in nil map
~~~

---

## ٣. interface فيه nil pointer

~~~go main.go
  var p *T
  var st fmt.Stringer = p
  fmt.Println(st == nil)
~~~

- [[var p *T]]: pointer قيمته nil.
- [[var st fmt.Stringer = p]]: حطيناه في interface. الـ interface من جوّا حاجتين: **النوع** و **القيمة**. هنا النوع [[*T]] والقيمة nil.
- [[st == nil]] بتبقى true بس لو الاتنين فاضيين. والنوع مش فاضي:

~~~text الناتج
false
~~~

وده سبب bug مشهور: دالة بترجّع [[error]]، وجواها بترجّع pointer لنوع error بتاعك قيمته nil، فاللي نادى بيلاقي [[err != nil]].

---

## ٤. range بيدّي نسخة

~~~go main.go
  x := []int{1, 2, 3}
  for _, v := range x {
    v *= 10
    _ = v
  }
  fmt.Println(x)
~~~

- [[v]] **نسخة** من العنصر، مش العنصر نفسه. [[v *= 10]] بيغيّر النسخة بس.
- [[_ = v]]: مالهاش أي أثر. جرّبت أشيلها: الكود اتبنى وطبع نفس الناتج، و go vet مقالش حاجة. موجودة بس عشان توضّح إن القيمة الجديدة مش مستخدمة.

~~~text الناتج
[1 2 3]
~~~

عشان تعدّل فعلًا: [[x[i] *= 10]] بالـ index.

---

## ٥. defer بالعكس

~~~go main.go
  for i := range 3 {
    defer fmt.Print(i, " ")
  }
}
~~~

- كل لفّة بتسجّل [[fmt.Print(i, " ")]] تتنفذ لما main **تخلص**.
- الـ arguments ([[i]]) بتتحسب **وقت كتابة defer**: 0 ثم 1 ثم 2.
- التنفيذ بالعكس (LIFO: آخر واحد دخل أول واحد يطلع):

~~~text الناتج
2 1 0 
~~~

فيه مسافة بعد الـ 0 من [[" "]]، ومفيش سطر جديد في الآخر.

---

## ٦. الحل: سؤال الـ 10,000 URL

~~~go solCode
func fetchAll(ctx context.Context, urls []string) ([]int, error) {
  client := &http.Client{Timeout: 10 * time.Second}
  statuses := make([]int, len(urls))
  g, ctx := errgroup.WithContext(ctx)
  g.SetLimit(20)
  for i, u := range urls {
    g.Go(func() error {
      req, err := http.NewRequestWithContext(ctx, http.MethodGet, u, nil)
      if err != nil {
        return err
      }
      resp, err := client.Do(req)
      if err != nil {
        return fmt.Errorf("fetch %s: %w", u, err)
      }
      resp.Body.Close()
      statuses[i] = resp.StatusCode
      return nil
    })
  }
  return statuses, g.Wait()
}
~~~

كل حتة فيه من درس سابق:

| الحتة | الدرس | ليه |
|---|---|---|
| [[&http.Client{Timeout: 10 * time.Second}]] | http.Client | client واحد بمهلة |
| [[make([]int, len(urls))]] + [[statuses[i] =]] | worker pool | نتايج بالترتيب ومن غير race |
| [[errgroup.WithContext]] + [[SetLimit(20)]] | worker pool | 20 بس في نفس الوقت، وإلغاء مع أول error |
| [[NewRequestWithContext(ctx, ...)]] | http.Client | الإلغاء يوصل للطلب |
| [[resp.Body.Close()]] | http.Client | الاتصال يرجع للـ pool |

جرّبتها على سيرفر [[httptest]] فيه [[/missing]] بيرد 404:

~~~text الناتج: 3 URLs
[200 404 200] <nil>
~~~

الـ 404 مش error هنا: الطلب نجح والـ status اتسجّل، والقرار بعدين.

وزوّدت URL لبورت مقفول ([[127.0.0.1:1]]):

~~~text الناتج: 4 URLs
[0 0 0 0] fetch http://127.0.0.1:1/down: Get "http://127.0.0.1:1/down": dial tcp 127.0.0.1:1: connect: connection refused
~~~

الاتصال المرفوض رجع بسرعة، فـ errgroup لغى الـ ctx، والطلبات التانية اتلغت قبل ما تخلص، فكل الخانات فضلت 0. و [[g.Wait()]] رجّع أول error بس. لو عايز كل اللي ينجح ينجح، متستخدمش WithContext، واجمع الأخطاء.

---

## الخلاصة

| السؤال | الإجابة | السبب |
|---|---|---|
| ١ | [[5 5]] | append في نفس الـ array لما فيه cap |
| ٢ | [[0 0]] | قراية nil map تمام، الكتابة panic |
| ٣ | [[false]] | الـ interface فيه نوع |
| ٤ | [[[1 2 3]]] | [[v]] نسخة |
| ٥ | [[2 1 0]] | defer بالعكس، والقيمة وقت الكتابة |

- جرّب كل سؤال بنفسك بدل ما تحفظه.`,
          lines: [
            "باكدج main.",
            "import fmt.",
            "نوع فاضي.",
            R`[[String]] على T.`,
            "main.",
            "len 3 و cap 10.",
            "بيكتب في الخانة 3 من نفس الـ array.",
            "بيكتب فوقها.",
            "5 5.",
            "nil map.",
            "0 0.",
            "pointer بـ nil.",
            "جوّا interface.",
            "false.",
            "slice.",
            "v نسخة.",
            "تعديل النسخة.",
            "مش لازم، للتوضيح بس.",
            "قفلة.",
            "[1 2 3].",
            "3 defers.",
            "بتتنفذ في الآخر بالعكس.",
            "قفلة.",
            "هنا بيطبع: 2 1 0."
          ],
          sol: R`الناتج:
[[5 5]]
[[0 0]]
[[false]]
[[[1 2 3]]]
[[2 1 0 ]]

وإجابة سؤال الـ 10,000 URL في كود (تحت): errgroup بحد 20، و client بمهلة، وكل goroutine بتكتب نتيجتها في خانتها.`,
          solCode: R`func fetchAll(ctx context.Context, urls []string) ([]int, error) {
  client := &http.Client{Timeout: 10 * time.Second}
  statuses := make([]int, len(urls))
  g, ctx := errgroup.WithContext(ctx)
  g.SetLimit(20)
  for i, u := range urls {
    g.Go(func() error {
      req, err := http.NewRequestWithContext(ctx, http.MethodGet, u, nil)
      if err != nil {
        return err
      }
      resp, err := client.Do(req)
      if err != nil {
        return fmt.Errorf("fetch %s: %w", u, err)
      }
      resp.Body.Close()
      statuses[i] = resp.StatusCode
      return nil
    })
  }
  return statuses, g.Wait()
}`
        },
        {
          cmd: "مشروع: REST API لمهام",
          title: "مشروع كامل: REST API للمهام بالمكتبة القياسية، من الـ routing للـ validation",
          desc: R`ده ملف واحد بيجمع اللي اتعلمته في API حقيقي صغير لإدارة مهام (tasks):
• [[GET /tasks]]: كل المهام مترتبة.
• [[POST /tasks]] بـ [[{"title": "..."}]]: مهمة جديدة (201).
• [[GET /tasks/{id}]]: مهمة واحدة (404 لو مش موجودة).
• [[PATCH /tasks/{id}/done]]: علّمها خلصت.

الأجزاء:
• [[Store]]: التخزين في الذاكرة (map)، ومحمي بـ [[sync.RWMutex]] لأن كل request في goroutine. [[RLock]] للقراية (كذا واحد مع بعض) و [[Lock]] للكتابة. وبيرجّع [[ErrNotFound]] (sentinel error).
• [[API]]: struct فيه الـ dependencies (الـ store). الـ handlers methods عليه، فمفيش global variables.
• [[writeJSON]] و [[writeError]]: helpers عشان كل الردود يبقى شكلها واحد، والـ errors تبقى [[{"error": "..."}]].
• الـ validation: body بحد أقصى 1MB، و JSON سليم، و title مش فاضي ومش أطول من 200 بايت. 400 للـ JSON البايظ، و 422 للبيانات اللي مش مقبولة.
• [[Routes()]] بترجّع الـ handler، فالاختبار يقدر يستخدمه بـ httptest من غير ما يشغّل سيرفر.
• [[taskFromPath]]: بتاخد دالة ([[a.store.Get]] أو [[a.store.MarkDone]]) عشان منكررش قراية الـ id ومعالجة الـ errors. [[a.store.Get]] هنا اسمها method value: method مربوطة بالـ store بتاعها وبتتبعت كدالة عادية.

[[1<<20]] = 1,048,576 بايت = 1MB. و [[a.ID - b.ID]] في SortFunc: سالب لو a قبل b.

الخطوة الجاية بعد ما يشتغل: الإغلاق النضيف و slog middleware (من الدروس اللي فاتت)، وتبدّل الـ Store بـ Postgres من غير ما تلمس الـ handlers (لو خليت API ياخد interface).`,
          example: R`package main

import (
  "encoding/json"
  "errors"
  "log/slog"
  "net/http"
  "os"
  "slices"
  "strconv"
  "strings"
  "sync"
  "time"
)

type Task struct {
  ID        int       $__btjson:"id"$__bt
  Title     string    $__btjson:"title"$__bt
  Done      bool      $__btjson:"done"$__bt
  CreatedAt time.Time $__btjson:"created_at"$__bt
}

var ErrNotFound = errors.New("task not found")

type Store struct {
  mu     sync.RWMutex
  nextID int
  tasks  map[int]Task
}

func NewStore() *Store {
  return &Store{nextID: 1, tasks: make(map[int]Task)}
}

func (s *Store) Create(title string) Task {
  s.mu.Lock()
  defer s.mu.Unlock()
  t := Task{ID: s.nextID, Title: title, CreatedAt: time.Now().UTC()}
  s.tasks[t.ID] = t
  s.nextID++
  return t
}

func (s *Store) Get(id int) (Task, error) {
  s.mu.RLock()
  defer s.mu.RUnlock()
  t, ok := s.tasks[id]
  if !ok {
    return Task{}, ErrNotFound
  }
  return t, nil
}

func (s *Store) MarkDone(id int) (Task, error) {
  s.mu.Lock()
  defer s.mu.Unlock()
  t, ok := s.tasks[id]
  if !ok {
    return Task{}, ErrNotFound
  }
  t.Done = true
  s.tasks[id] = t
  return t, nil
}

func (s *Store) List() []Task {
  s.mu.RLock()
  defer s.mu.RUnlock()
  out := make([]Task, 0, len(s.tasks))
  for _, t := range s.tasks {
    out = append(out, t)
  }
  slices.SortFunc(out, func(a, b Task) int { return a.ID - b.ID })
  return out
}

type API struct {
  store *Store
}

func writeJSON(w http.ResponseWriter, status int, v any) {
  w.Header().Set("Content-Type", "application/json")
  w.WriteHeader(status)
  json.NewEncoder(w).Encode(v)
}

func writeError(w http.ResponseWriter, status int, msg string) {
  writeJSON(w, status, map[string]string{"error": msg})
}

func (a *API) list(w http.ResponseWriter, r *http.Request) {
  writeJSON(w, http.StatusOK, a.store.List())
}

func (a *API) create(w http.ResponseWriter, r *http.Request) {
  var in struct {
    Title string $__btjson:"title"$__bt
  }
  r.Body = http.MaxBytesReader(w, r.Body, 1<<20)
  if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
    writeError(w, http.StatusBadRequest, "invalid JSON")
    return
  }
  in.Title = strings.TrimSpace(in.Title)
  if in.Title == "" || len(in.Title) > 200 {
    writeError(w, http.StatusUnprocessableEntity, "title is required (max 200 bytes)")
    return
  }
  writeJSON(w, http.StatusCreated, a.store.Create(in.Title))
}

func (a *API) taskFromPath(w http.ResponseWriter, r *http.Request, f func(int) (Task, error)) {
  id, err := strconv.Atoi(r.PathValue("id"))
  if err != nil {
    writeError(w, http.StatusBadRequest, "id must be a number")
    return
  }
  t, err := f(id)
  switch {
  case errors.Is(err, ErrNotFound):
    writeError(w, http.StatusNotFound, err.Error())
  case err != nil:
    writeError(w, http.StatusInternalServerError, "internal error")
  default:
    writeJSON(w, http.StatusOK, t)
  }
}

func (a *API) Routes() http.Handler {
  mux := http.NewServeMux()
  mux.HandleFunc("GET /tasks", a.list)
  mux.HandleFunc("POST /tasks", a.create)
  mux.HandleFunc("GET /tasks/{id}", func(w http.ResponseWriter, r *http.Request) {
    a.taskFromPath(w, r, a.store.Get)
  })
  mux.HandleFunc("PATCH /tasks/{id}/done", func(w http.ResponseWriter, r *http.Request) {
    a.taskFromPath(w, r, a.store.MarkDone)
  })
  return mux
}

func main() {
  api := &API{store: NewStore()}
  addr := ":8080"
  if v := os.Getenv("ADDR"); v != "" {
    addr = v
  }
  srv := &http.Server{Addr: addr, Handler: api.Routes(), ReadHeaderTimeout: 5 * time.Second}
  slog.Info("listening", "addr", addr)
  if err := srv.ListenAndServe(); err != nil {
    slog.Error("server stopped", "err", err)
    os.Exit(1)
  }
}`,
          try: R`اعمل [[lab/go/tasks]] و [[go mod init example.com/tasks]] واحفظ الملف وشغّله. جرّب:
[[curl -s -X POST localhost:8080/tasks -d '{"title":"اتعلم Go"}']]
[[curl -s localhost:8080/tasks]]
[[curl -s -X PATCH localhost:8080/tasks/1/done]]
[[curl -s -i localhost:8080/tasks/99]]
[[curl -s -i -X POST localhost:8080/tasks -d '{"title":"  "}']]
[[curl -s -i -X POST localhost:8080/tasks -d 'not json']]
وبعدين اكتب [[main_test.go]] بيختبر السيناريو كله بـ httptest، وشغّله بـ [[go test -race -v]]. وكمّل: ضيف [[DELETE /tasks/{id}]]، والإغلاق النضيف، و logging middleware بـ slog.`,
          flag: "script",
          deep: {
            why: R`الدروس لوحدها بتعلّمك الأجزاء. المشروع بيوريك الأجزاء بتتركّب إزاي: الـ Mutex في مكانه عشان الـ handlers شغالة بالتوازي، والـ sentinel error بيتحوّل لـ 404، والـ helpers بتوحّد الردود، والتصميم بيخلي الاختبار سهل. ده نفس شكل الـ APIs الحقيقية بس من غير داتابيز.`,
            how: R`الطلب بيمشي كده: ServeMux بيطابق [["POST /tasks"]] وينادي [[a.create]]. create بتحط حد للـ body، وتعمل decode لـ struct من غير اسم فيه title بس (فمحدش يقدر يبعت id أو done)، وتنضّف وتتحقق، وبعدين [[Store.Create]] بتاخد القفل وتضيف وترجّع.

ليه RWMutex؟ لأن List و Get بيتنادوا أكتر من Create، و RLock بيسمح لكذا قراية مع بعض.

List بتنسخ المهام في slice جديدة وترتّبها: الـ map مش مترتب، ومينفعش نرجّع الـ map نفسه لأن حد بره ممكن يقراه وحد جوّا بيكتب (race).

[[time.Now().UTC()]]: خزّن الأوقات UTC دايمًا، وحوّل للتوقيت المحلي في العرض بس.

لو ضفت [[DisallowUnknownFields]] للـ decoder، أي مفتاح زيادة هيرجّع 400.

الـ status codes: 201 للإنشاء، و 400 للطلب البايظ (JSON أو id مش رقم)، و 404 للمش موجود، و 405 لوحدها من الـ mux، و 422 للبيانات اللي مش مقبولة، و 500 لأي حاجة مش متوقعة.

[[len(in.Title) > 200]] بتعد بايتات. لو عايز 200 حرف عربي استخدم [[utf8.RuneCountInString]] (درس النصوص).`,
            when: R`نقطة بداية لأي API صغير، أو ك template تبني عليه: بدّل Store بـ Postgres (database/sql)، وضيف auth middleware، و config من env، و Dockerfile، و CI بيشغّل [[go vet]] و [[go test -race]].`,
            mistakes: R`map من غير Mutex مع handlers بتشتغل بالتوازي (go test -race هيمسكها). وترجّع الـ map الداخلي أو slice بتشاور عليه. وتنسى return بعد writeError. ورسايل errors داخلية للعميل (stack traces أو SQL). و 200 لكل حاجة حتى الأخطاء.`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

API كامل لإدارة مهام، في ملف واحد ومن غير أي مكتبة خارجية. بيتكوّن من ٣ طبقات:

| الطبقة | الكود | مسؤولة عن |
|---|---|---|
| البيانات | [[Task]] و [[Store]] | التخزين في الذاكرة، محمي بقفل |
| HTTP | [[API]] و الـ handlers و [[writeJSON]] | قراية الطلب، والتحقق، وكتابة الرد |
| التشغيل | [[main]] | توصيل الحاجات ببعض وتشغيل السيرفر |

كل الناتج من [[go build]] وتشغيل الـ binary جوه [[docker run --rm golang:1.25]] (Go 1.25.14)، بعد [[go mod init example.com/tasks]]، و curl من نفس الـ container.

---

## ١. الـ imports

~~~go main.go
import (
  "encoding/json"
  "errors"
  "log/slog"
  "net/http"
  "os"
  "slices"
  "strconv"
  "strings"
  "sync"
  "time"
)
~~~

كلها من المكتبة القياسية وكلها شفناها: [[slices]] للترتيب، و [[strings]] لـ [[TrimSpace]]، و [[sync]] للقفل، و [[log/slog]] للوج.

---

## ٢. [[Task]] و [[ErrNotFound]]

~~~go main.go
type Task struct {
  ID        int       $__btjson:"id"$__bt
  Title     string    $__btjson:"title"$__bt
  Done      bool      $__btjson:"done"$__bt
  CreatedAt time.Time $__btjson:"created_at"$__bt
}

var ErrNotFound = errors.New("task not found")
~~~

- الـ tags بتخلي الـ JSON بأسماء صغيرة و snake_case.
- [[ErrNotFound]]: **sentinel error**، قيمة error ثابتة متعرّفة مرة واحدة. الـ store بيرجّعها، والـ handler بيسأل عليها بـ [[errors.Is]] ويحوّلها 404. فالـ store ميعرفش حاجة عن HTTP.

---

## ٣. [[Store]]: الـ map والقفل

~~~go main.go
type Store struct {
  mu     sync.RWMutex
  nextID int
  tasks  map[int]Task
}

func NewStore() *Store {
  return &Store{nextID: 1, tasks: make(map[int]Task)}
}
~~~

- [[sync.RWMutex]]: قفل بنوعين: [[Lock]] للكتابة (واحد بس، وكل الباقي يستنى)، و [[RLock]] للقراية (كذا واحد مع بعض، طول ما محدش بيكتب).
- ليه قفل أصلًا؟ السيرفر بيشغّل كل طلب في goroutine، فطلبين ممكن يكتبوا في الـ map في نفس اللحظة.
- [[NewStore]]: constructor. الـ map لازم [[make]]، لأن الكتابة في nil map بتعمل panic. و [[nextID: 1]] عشان أول مهمة تبقى 1.

### الكتابة: [[Create]] و [[MarkDone]]

~~~go main.go
func (s *Store) Create(title string) Task {
  s.mu.Lock()
  defer s.mu.Unlock()
  t := Task{ID: s.nextID, Title: title, CreatedAt: time.Now().UTC()}
  s.tasks[t.ID] = t
  s.nextID++
  return t
}
~~~

- [[s.mu.Lock()]] ثم [[defer s.mu.Unlock()]]: اقفل، وافتح لما الدالة تخلص بأي طريقة.
- [[time.Now().UTC()]]: الوقت بتوقيت UTC. خزّن دايمًا UTC، وحوّل للمحلي في العرض بس.
- [[s.nextID++]]: زوّد العدّاد للمهمة الجاية. القراية والزيادة جوّا القفل، فمستحيل مهمتين ياخدوا نفس الـ id.

~~~go main.go
func (s *Store) MarkDone(id int) (Task, error) {
  s.mu.Lock()
  defer s.mu.Unlock()
  t, ok := s.tasks[id]
  if !ok {
    return Task{}, ErrNotFound
  }
  t.Done = true
  s.tasks[id] = t
  return t, nil
}
~~~

- [[t, ok := s.tasks[id]]]: «comma ok». [[ok]] بـ false لو الـ id مش موجود.
- [[Task{}]]: struct فاضي نرجّعه مع الـ error.
- [[t.Done = true]] ثم [[s.tasks[id] = t]]: الـ map فيها **قيم** مش pointers، فـ [[t]] نسخة. لازم نرجّعها في الـ map بعد التعديل.

### القراية: [[Get]] و [[List]]

[[Get]] زي MarkDone بالظبط، بس بـ [[RLock]] ومن غير تعديل.

~~~go main.go
func (s *Store) List() []Task {
  s.mu.RLock()
  defer s.mu.RUnlock()
  out := make([]Task, 0, len(s.tasks))
  for _, t := range s.tasks {
    out = append(out, t)
  }
  slices.SortFunc(out, func(a, b Task) int { return a.ID - b.ID })
  return out
}
~~~

- [[make([]Task, 0, len(s.tasks))]]: slice فاضية (len 0) بمساحة محجوزة لكل المهام، فالـ append مش هيحجز تاني.
- بننسخ في slice جديدة لسببين: الـ map ملهاش ترتيب ثابت، ولو رجّعنا الـ map نفسه حد بره هيقراه وحد جوّا بيكتب فيه.
- [[slices.SortFunc(out, cmp)]]: رتّب بدالة مقارنة. [[a.ID - b.ID]] سالب لو a قبل b، وصفر لو زي بعض، وموجب لو بعده.

---

## ٤. [[API]] والـ helpers

~~~go main.go
type API struct {
  store *Store
}

func writeJSON(w http.ResponseWriter, status int, v any) {
  w.Header().Set("Content-Type", "application/json")
  w.WriteHeader(status)
  json.NewEncoder(w).Encode(v)
}

func writeError(w http.ResponseWriter, status int, msg string) {
  writeJSON(w, status, map[string]string{"error": msg})
}
~~~

- [[API]]: struct فيه اللي الـ handlers محتاجاه (الـ store). الـ handlers methods عليه بدل global variables، فالاختبار يقدر يعمل API بـ store جديد.
- [[writeJSON]]: الترتيب الصح من أول درس (header ثم status ثم body) في مكان واحد. و [[v any]]: أي قيمة.
- [[writeError]]: كل الأخطاء بنفس الشكل [[{"error": "..."}]]، فالفرونت إند يقراهم بطريقة واحدة.

---

## ٥. الـ handlers

### [[list]]

~~~go main.go
func (a *API) list(w http.ResponseWriter, r *http.Request) {
  writeJSON(w, http.StatusOK, a.store.List())
}
~~~

### [[create]]: الـ validation

~~~go main.go
func (a *API) create(w http.ResponseWriter, r *http.Request) {
  var in struct {
    Title string $__btjson:"title"$__bt
  }
  r.Body = http.MaxBytesReader(w, r.Body, 1<<20)
  if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
    writeError(w, http.StatusBadRequest, "invalid JSON")
    return
  }
  in.Title = strings.TrimSpace(in.Title)
  if in.Title == "" || len(in.Title) > 200 {
    writeError(w, http.StatusUnprocessableEntity, "title is required (max 200 bytes)")
    return
  }
  writeJSON(w, http.StatusCreated, a.store.Create(in.Title))
}
~~~

| الخطوة | الكود | لو فشلت |
|---|---|---|
| struct من غير اسم فيه title بس | [[var in struct{ Title string ... }]] | اليوزر ميقدرش يبعت id أو done |
| حد للحجم | [[http.MaxBytesReader(w, r.Body, 1<<20)]] | [[1<<20]] = 1 shifted 20 مرة = 1,048,576 byte = 1MB |
| JSON سليم | [[Decode(&in)]] | 400 |
| شيل المسافات | [[strings.TrimSpace]] | [["  "]] تبقى [[""]] |
| مش فاضي ومش طويل | [[in.Title == ""]] أو [[len(in.Title) > 200]] | 422 |
| خزّن ورد | [[a.store.Create]] + 201 | |

- [[||]] في الكود: «أو».
- [[http.StatusUnprocessableEntity]] = 422: الـ JSON سليم بس المحتوى مش مقبول. والفرق ده بيساعد اللي بيستخدم الـ API يعرف الغلط فين.
- [[len]] بتعد **bytes**: 200 byte = حوالي 100 حرف عربي.

### [[taskFromPath]]: handler واحد لاتنين

~~~go main.go
func (a *API) taskFromPath(w http.ResponseWriter, r *http.Request, f func(int) (Task, error)) {
  id, err := strconv.Atoi(r.PathValue("id"))
  if err != nil {
    writeError(w, http.StatusBadRequest, "id must be a number")
    return
  }
  t, err := f(id)
  switch {
  case errors.Is(err, ErrNotFound):
    writeError(w, http.StatusNotFound, err.Error())
  case err != nil:
    writeError(w, http.StatusInternalServerError, "internal error")
  default:
    writeJSON(w, http.StatusOK, t)
  }
}
~~~

- [[f func(int) (Task, error)]]: parameter نوعه **دالة**: بتاخد int وترجّع Task و error. [[Get]] و [[MarkDone]] الاتنين بالشكل ده.
- [[switch { case ...: }]] من غير قيمة بعد switch: كل case شرط، وأول واحد صح بيتنفذ.
- [[err.Error()]]: نص الـ error ([["task not found"]]). وفي الـ 500 مش بنبعت التفاصيل الداخلية لليوزر.

---

## ٦. [[Routes]]

~~~go main.go
func (a *API) Routes() http.Handler {
  mux := http.NewServeMux()
  mux.HandleFunc("GET /tasks", a.list)
  mux.HandleFunc("POST /tasks", a.create)
  mux.HandleFunc("GET /tasks/{id}", func(w http.ResponseWriter, r *http.Request) {
    a.taskFromPath(w, r, a.store.Get)
  })
  mux.HandleFunc("PATCH /tasks/{id}/done", func(w http.ResponseWriter, r *http.Request) {
    a.taskFromPath(w, r, a.store.MarkDone)
  })
  return mux
}
~~~

- [[a.list]] من غير [[()]]: **method value**، الـ method مربوطة بـ [[a]] وبتتبعت كدالة عادية. ونفس الكلام في [[a.store.Get]].
- بترجّع [[http.Handler]]، فـ main والاختبار الاتنين بيستخدموها.

---

## ٧. [[main]]

~~~go main.go
  api := &API{store: NewStore()}
  addr := ":8080"
  if v := os.Getenv("ADDR"); v != "" {
    addr = v
  }
  srv := &http.Server{Addr: addr, Handler: api.Routes(), ReadHeaderTimeout: 5 * time.Second}
  slog.Info("listening", "addr", addr)
  if err := srv.ListenAndServe(); err != nil {
    slog.Error("server stopped", "err", err)
    os.Exit(1)
  }
~~~

- [[&API{store: NewStore()}]]: هنا بس الـ dependencies بتتوصّل ببعض.
- [[ADDR]] من env لو موجود.
- [[http.Server]] بـ [[ReadHeaderTimeout]] (درس الإغلاق النضيف).

~~~text لوج السيرفر
2026/10/07 17:09:32 INFO listening addr=:8080
~~~

---

## ٨. التجربة بـ curl

[[-d '...']]: ابعت body. و curl بيحط [[POST]] لوحده لما فيه [[-d]]، بس [[-X POST]] بيوضّح.

### إنشاء

~~~text الناتج: curl -s -i -X POST localhost:8080/tasks -d '{"title":"اتعلم Go"}'
HTTP/1.1 201 Created
Content-Type: application/json
Date: Wed, 07 Oct 2026 17:09:33 GMT
Content-Length: 92

{"id":1,"title":"اتعلم Go","done":false,"created_at":"2026-10-07T17:09:33.281549561Z"}
~~~

### قايمة، وخلّصها

~~~text الناتج: curl -s localhost:8080/tasks ثم PATCH .../tasks/1/done
[{"id":1,"title":"اتعلم Go","done":false,"created_at":"2026-10-07T17:09:33.281549561Z"}]
{"id":1,"title":"اتعلم Go","done":true,"created_at":"2026-10-07T17:09:33.281549561Z"}
~~~

القايمة بين [[[ ]]] لأنها slice.

### الأخطاء

| الطلب | الرد |
|---|---|
| [[GET /tasks/99]] | [[404 Not Found]] و [[{"error":"task not found"}]] |
| [[POST]] بـ [[{"title":"  "}]] | [[422 Unprocessable Entity]] و [[{"error":"title is required (max 200 bytes)"}]] |
| [[POST]] بـ [[not json]] | [[400 Bad Request]] و [[{"error":"invalid JSON"}]] |
| [[GET /tasks/abc]] | [[400 Bad Request]] (id مش رقم) |
| [[DELETE /tasks/1]] | [[405 Method Not Allowed]] و [[Allow: GET, HEAD]] من الـ mux لوحده |

---

## ٩. الاختبار (الـ solCode)

~~~go main_test.go
func do(t *testing.T, h http.Handler, method, path, body string) *httptest.ResponseRecorder {
  t.Helper()
  rec := httptest.NewRecorder()
  h.ServeHTTP(rec, httptest.NewRequest(method, path, strings.NewReader(body)))
  return rec
}
~~~

- [[do]]: helper بيبعت طلب ويرجّع الـ recorder، عشان منكررش 3 سطور في كل خطوة.
- [[t.Helper()]]: لو اختبار فشل جوّا helper، Go بتطبع رقم السطر اللي **نادى** الـ helper مش السطر جوّاه.

~~~go main_test.go
  h := (&API{store: NewStore()}).Routes()
~~~

API جديد بـ store فاضي لكل اختبار. الأقواس حوالين [[&API{...}]] عشان [[.Routes()]] تتنادى على الـ pointer.

بعدها السيناريو: create (لازم 201، و [[task.ID]] بـ 1 و [[Done]] بـ false بعد ما نفك الـ JSON)، ثم PATCH (الـ body فيه [[$__bt"done":true$__bt]])، ثم 404، ثم 422.

- [[if rec := do(...); cond]]: if بجملة قصيرة، و [[rec]] الجديدة دي بتغطّي اللي فوق جوّا الـ if بس.

~~~text الناتج: go test -race -v
=== RUN   TestTasksFlow
--- PASS: TestTasksFlow (0.00s)
PASS
ok  	example.com/tasks	1.020s
~~~

[[-race]] بيشغّل الـ race detector: بيراقب كل قراية وكتابة في الذاكرة ويقولك لو اتنين goroutines لمسوا نفس المكان من غير قفل.

### نتأكد إن القفل لازم

شلت [[Lock]] و [[Unlock]] من [[Create]]، وكتبت اختبار بيبعت 50 POST بالتوازي بـ [[wg.Go]]:

~~~text الناتج: go test -race (مختصر)
==================
WARNING: DATA RACE
Read at 0x00c000016f78 by goroutine 11:
  example.com/tasks.(*Store).Create()
      /w/tasksrace/main.go:36 +0x1c4
...
Previous write at 0x00c000016f78 by goroutine 59:
  example.com/tasks.(*Store).Create()
      /w/tasksrace/main.go:38 +0x2e6
...
fatal error: concurrent map writes
...
FAIL	example.com/tasks	0.030s
~~~

- السطر 36 بيقرا [[s.nextID]] والسطر 38 بيكتبه، من goroutines مختلفة.
- [[fatal error: concurrent map writes]]: الـ runtime نفسه بيكتشف كتابتين في نفس الـ map ويقفل البرنامج كله. ودي حصلت حتى من غير [[-race]].

ورجّعت القفل: نفس الاختبار عدّى بـ [[-race]] من غير ولا تحذير.

### الحجم في Docker

بنيت المشروع بالـ Dockerfile بتاع درس scratch (حطيت [[main.go]] في [[cmd/api]]):

~~~text الناتج: docker images
IMAGE                       ID             DISK USAGE   CONTENT SIZE   EXTRA
teach-go0507-tasks:latest   594658898fcf       8.93MB          2.7MB
~~~

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[sync.RWMutex]] في Store | كل طلب في goroutine |
| [[ErrNotFound]] + [[errors.Is]] | الـ store ميعرفش HTTP، والـ handler يحوّل لـ 404 |
| [[List]] بترجّع نسخة مترتبة | الـ map مش مترتب ومينفعش يطلع بره القفل |
| [[writeJSON]] و [[writeError]] | كل الردود بشكل واحد |
| [[MaxBytesReader]] + [[TrimSpace]] + فحص الطول | 400 للبايظ، و 422 للمش مقبول |
| [[taskFromPath(w, r, a.store.Get)]] | method value بتشيل التكرار |
| [[Routes() http.Handler]] | الاختبار بـ httptest من غير سيرفر |
| [[go test -race]] | يمسك القفل الناقص |`,
          lines: [
            "باكدج main.",
            "imports.",
            "JSON.",
            "errors.",
            "لوج.",
            "HTTP.",
            "env.",
            "الترتيب.",
            "تحويل الـ id.",
            "TrimSpace.",
            "RWMutex.",
            "الأوقات.",
            "قفلة.",
            "المهمة.",
            R`[[id]] في JSON.`,
            "العنوان.",
            "خلصت ولا لأ.",
            "وقت الإنشاء، snake_case في JSON.",
            "قفلة.",
            "sentinel error للمش موجود.",
            "التخزين.",
            "قفل: كتير يقروا، أو واحد يكتب.",
            "الـ id الجاي.",
            "المهام بالـ id.",
            "قفلة.",
            "constructor: الـ map لازم make.",
            "يبدأ من 1.",
            "قفلة.",
            "إضافة.",
            "قفل كتابة.",
            "افتح في الآخر.",
            "مهمة جديدة بالـ id الجاي ووقت UTC.",
            "خزّن.",
            "زوّد العدّاد.",
            "رجّعها.",
            "قفلة.",
            "قراية واحدة.",
            "قفل قراية: كذا واحد مع بعض.",
            "افتح.",
            "comma ok.",
            "مش موجودة...",
            "...sentinel error.",
            "قفلة.",
            "موجودة.",
            "قفلة.",
            "تعليم إنها خلصت.",
            "قفل كتابة.",
            "افتح.",
            "اقرا.",
            "مش موجودة...",
            "...error.",
            "قفلة.",
            "عدّل النسخة...",
            "...ورجّعها في الـ map (القيمة struct مش pointer).",
            "رجّع.",
            "قفلة.",
            "الكل.",
            "قفل قراية.",
            "افتح.",
            "slice جديدة بالمساحة الصح.",
            "انسخ من الـ map...",
            "...ضيف.",
            "قفلة.",
            "رتّب بالـ id.",
            "رجّع النسخة (مش الـ map نفسه).",
            "قفلة.",
            "الـ API struct: فيه الـ dependencies.",
            "الـ store.",
            "قفلة.",
            "helper لأي رد JSON.",
            "header.",
            "status.",
            "body.",
            "قفلة.",
            "helper للأخطاء بشكل ثابت.",
            R`[[{"error": "..."}]].`,
            "قفلة.",
            "GET /tasks.",
            "200 والقايمة.",
            "قفلة.",
            "POST /tasks.",
            "struct من غير اسم فيه اللي مسموح بيه بس...",
            "...title.",
            "قفلة.",
            "حد أقصى 1MB للـ body.",
            "decode.",
            "JSON بايظ: 400.",
            "اخرج.",
            "قفلة.",
            "شيل المسافات.",
            "فاضي أو طويل؟",
            "422.",
            "اخرج.",
            "قفلة.",
            "201 والمهمة الجديدة.",
            "قفلة.",
            "helper للمسارات اللي فيها id: بياخد دالة الـ store.",
            "id من المسار.",
            "مش رقم...",
            "...400.",
            "اخرج.",
            "قفلة.",
            "نادي الدالة اللي جت (Get أو MarkDone).",
            "حوّل الـ error لـ status.",
            "مش موجودة...",
            "...404.",
            "أي error تاني...",
            "...500 من غير تفاصيل داخلية.",
            "تمام...",
            "...200.",
            "قفلة.",
            "قفلة.",
            "الـ routes في مكان واحد.",
            "router.",
            "قايمة.",
            "إنشاء.",
            "واحدة: بتبعت a.store.Get كدالة.",
            "method value.",
            "قفلة.",
            "تعليم: نفس الـ helper بـ MarkDone.",
            "method value.",
            "قفلة.",
            "رجّع.",
            "قفلة.",
            "main.",
            "وصّل الـ dependencies.",
            "البورت الافتراضي.",
            "أو من env.",
            "استخدمه.",
            "قفلة.",
            "سيرفر بـ timeout للـ headers.",
            "لوج.",
            "شغّل.",
            "وقف بـ error.",
            "اقفل.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`الردود:
[[{"id":1,"title":"اتعلم Go","done":false,"created_at":"2026-10-01T12:00:00.123456Z"}]] (بـ 201)
[[[{"id":1,"title":"اتعلم Go","done":false,...}]]]
[[{"id":1,"title":"اتعلم Go","done":true,...}]]
[[HTTP/1.1 404 Not Found]] و [[{"error":"task not found"}]]
[[HTTP/1.1 422 Unprocessable Entity]] و [[{"error":"title is required (max 200 bytes)"}]]
[[HTTP/1.1 400 Bad Request]] و [[{"error":"invalid JSON"}]]

والاختبار (الكود تحت) بيمشي السيناريو: create ثم get ثم done ثم 404. [[go test -race -v]] بيطلع [[--- PASS: TestTasksFlow]] من غير أي race. لو جرّبت تشيل الـ Lock من Create وتعمل اختبار بيبعت 50 create بالتوازي، [[-race]] هيمسكها.`,
          solCode: R`// ملف: main_test.go
package main

import (
  "encoding/json"
  "net/http"
  "net/http/httptest"
  "strings"
  "testing"
)

func do(t *testing.T, h http.Handler, method, path, body string) *httptest.ResponseRecorder {
  t.Helper()
  rec := httptest.NewRecorder()
  h.ServeHTTP(rec, httptest.NewRequest(method, path, strings.NewReader(body)))
  return rec
}

func TestTasksFlow(t *testing.T) {
  h := (&API{store: NewStore()}).Routes()

  rec := do(t, h, "POST", "/tasks", $__bt{"title":"learn go"}$__bt)
  if rec.Code != http.StatusCreated {
    t.Fatalf("create: status %d", rec.Code)
  }
  var task Task
  if err := json.NewDecoder(rec.Body).Decode(&task); err != nil {
    t.Fatal(err)
  }
  if task.ID != 1 || task.Done {
    t.Fatalf("unexpected task %+v", task)
  }

  if rec := do(t, h, "PATCH", "/tasks/1/done", ""); !strings.Contains(rec.Body.String(), $__bt"done":true$__bt) {
    t.Errorf("done: body %s", rec.Body.String())
  }
  if rec := do(t, h, "GET", "/tasks/99", ""); rec.Code != http.StatusNotFound {
    t.Errorf("missing: status %d", rec.Code)
  }
  if rec := do(t, h, "POST", "/tasks", $__bt{"title":"  "}$__bt); rec.Code != http.StatusUnprocessableEntity {
    t.Errorf("empty title: status %d", rec.Code)
  }
}`
        }
      ]
    }
]);
