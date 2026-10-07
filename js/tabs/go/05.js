// تكملة تاب go: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/go/01.js (شرح حقول الدرس في أوله)
MORE("go", [
    {
      t: "الأخطاء و defer والباكدجات",
      l: 1,
      n: "الـ error كقيمة و if err != nil، وتغليف الأخطاء بـ %w و errors.Is و errors.As، و defer و panic و recover، وتقسيم المشروع لباكدجات",
      items: [
        {
          cmd: "معالجة الأخطاء الصريحة بـ if err != nil",
          title: "الـ error في Go قيمة عادية بترجع من الدالة: if err != nil",
          desc: R`Go مفيهاش exceptions و try/catch. الدالة اللي ممكن تفشل بترجّع error كآخر قيمة: [[func parsePort(s string) (int, error)]]. لو نجحت بترجّع النتيجة و [[nil]] (مفيش error). لو فشلت بترجّع القيمة الصفرية و error بيشرح السبب.

والمستدعي بيشيك على طول:
[[port, err := parsePort(s)]]
[[if err != nil { return err }]]
ده أشهر سطرين في Go، وهتكتبهم كتير.

[[error]] نفسه interface صغير جدًا: أي نوع عنده method [[Error() string]] يبقى error. وبتعمل error بطريقتين:
• [[errors.New("port is empty")]]: رسالة ثابتة.
• [[fmt.Errorf("port %d out of range", n)]]: رسالة فيها قيم. ولو فيه error جاي من تحت وعايز تحافظ عليه جوه الجديد استخدم [[%w]] (الدرس الجاي بيشرحه).

العرف في الرسايل: حروف صغيرة ومن غير نقطة في الآخر، لأنها بتتلزق في رسايل تانية: [[open config.json: no such file or directory]].

و [[continue]] في المثال بتنط لأول الـ loop من غير ما تكمّل اللفّة.`,
          example: R`package main

import (
  "errors"
  "fmt"
  "os"
  "strconv"
)

func parsePort(s string) (int, error) {
  if s == "" {
    return 0, errors.New("port is empty")
  }
  n, err := strconv.Atoi(s)
  if err != nil {
    return 0, fmt.Errorf("port %q is not a number: %w", s, err)
  }
  if n < 1 || n > 65535 {
    return 0, fmt.Errorf("port %d out of range", n)
  }
  return n, nil
}

func main() {
  for _, in := range []string{"8080", "", "abc", "70000"} {
    port, err := parsePort(in)
    if err != nil {
      fmt.Println("error:", err)
      continue
    }
    fmt.Println("ok:", port)
  }

  if _, err := os.ReadFile("missing.txt"); err != nil {
    fmt.Println(err)
  }
}`,
          try: R`اكتب دالة [[loadAge(s string) (int, error)]] بترجّع error لو النص فاضي، أو مش رقم، أو الرقم أقل من 0 أو أكبر من 130. وفي main لف على [[[]string{"25", "", "abc", "-3", "200"}]] واطبع النتيجة أو الـ error. وبعدين جرّب تتجاهل الـ error ([[age, _ := loadAge("abc")]]) واطبع age.`,
          flag: "script",
          deep: {
            why: R`في لغات الـ exceptions أي سطر ممكن يرمي، ومش باين من شكل الكود مين بيرمي إيه. في Go الفشل جزء من توقيع الدالة، والمسار الغلط مكتوب قدامك بنفس وضوح المسار الصح. الكود بيطول شوية، بس لما حاجة تقع في الإنتاج بتعرف فين وليه.`,
            how: R`[[||]] معناها «أو»: لو الرقم أقل من 1 أو أكبر من 65535.

لاحظ إن parsePort بترجّع [[0]] مع الـ error: القيمة الصفرية. المستدعي مش المفروض يستخدم القيمة لو فيه error، والعرف ده بيمشي عليه كل كود Go.

في السيرفر الحقيقي، كل طبقة بتضيف سياق وترجّع لفوق: الـ repository بيقول [[query user 42: connection refused]]، والـ service بتضيف [[get profile: ...]]، والـ handler في الآخر بيقرر: يرجّع 500 ويسجّل اللوج. الطبقات اللي في النص متطبعش الـ error بنفسها، عشان ميتسجّلش ٣ مرات.

[[os.ReadFile]] بيرجّع error نوعه [[*fs.PathError]] رسالته فيها العملية والمسار والسبب. هتعرف تسأل عن نوعه في الدرس الجاي.`,
            when: R`أي دالة ممكن تفشل لسبب برة إيدك: ملف، أو شبكة، أو داتابيز، أو input من يوزر، أو تحويل. الدوال اللي مستحيل تفشل (حساب بسيط) مترجّعش error.`,
            mistakes: R`[[result, _ := f()]]: بترمي الـ error فالبرنامج يكمّل بقيمة صفرية كأنها صح. و [[log.Fatal(err)]] جوه دالة عميقة (بيقفل البرنامج كله، وده قرار main بس). وتطبع الـ error وترجّعه كمان فيتسجّل مرتين. ورسايل بحروف كبيرة ونقطة: [[Failed to open file.]]، فلما تتلزق تبقى [[load: Failed to open file.: ...]].`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

دالة [[parsePort]] بتحوّل نص لرقم بورت، وبترجّع error لو النص فاضي أو مش رقم أو بره المدى. و main بتجرّبها على ٤ مدخلات، وفي الآخر بتقرا ملف مش موجود عشان تشوف error جاي من المكتبة القياسية نفسها. كل الناتج تحت من [[go run .]] في [[golang:1.25]] (Go 1.25.14) على لينكس.

---

## ١. الـ imports

~~~go main.go
import (
  "errors"
  "fmt"
  "os"
  "strconv"
)
~~~

| الباكدج | بنستخدم منها إيه |
|---|---|
| [[errors]] | [[errors.New]]: يعمل error برسالة ثابتة |
| [[fmt]] | الطباعة، و [[fmt.Errorf]]: يعمل error برسالة فيها قيم |
| [[os]] | التعامل مع نظام التشغيل، وهنا [[os.ReadFile]] |
| [[strconv]] | اختصار string conversion: تحويل بين نصوص وأرقام |

---

## ٢. التوقيع: [[(int, error)]]

~~~go main.go
func parsePort(s string) (int, error) {
~~~

- [[s string]]: الدالة بتاخد نص.
- [[(int, error)]]: بترجّع **قيمتين**: الرقم، و error. الأقواس لازمة لما يبقى فيه أكتر من قيمة راجعة.
- الـ error **دايمًا الأخير**. ده عرف كل كود Go، ومن غيره الكود بيبان غريب لأي حد بيقراه.

### الـ [[error]] ده إيه أصلًا؟

نوع جاهز في اللغة (مش محتاج import)، وهو interface فيه method واحدة:

~~~go
type error interface {
  Error() string
}
~~~

يعني أي نوع عنده [[Error() string]] يبقى error. والقيمة الصفرية بتاعته [[nil]] = «مفيش error». جرّبت [[var e error]] واطبعتها:

~~~text الناتج
true <nil>
~~~

[[e == nil]] طلعت true، و Println بتكتب الـ nil كده: [[<nil>]].

---

## ٣. أول فحص: النص فاضي

~~~go main.go
  if s == "" {
    return 0, errors.New("port is empty")
  }
~~~

- [[""]] نص فاضي.
- [[return 0, errors.New(...)]]: لازم نرجّع **القيمتين**. الرقم ملوش معنى هنا، فبنرجّع القيمة الصفرية [[0]]، والمستدعي المفروض ميبصّش عليه طول ما فيه error.
- [[errors.New("port is empty")]]: error جديد رسالته ثابتة. حروف صغيرة ومن غير نقطة في الآخر، لأن الرسالة غالبًا هتتلزق جوه رسالة أكبر.

---

## ٤. التحويل: [[strconv.Atoi]]

~~~go main.go
  n, err := strconv.Atoi(s)
  if err != nil {
    return 0, fmt.Errorf("port %q is not a number: %w", s, err)
  }
~~~

### [[strconv.Atoi(s)]]

[[Atoi]] اختصار ASCII to integer: بتحوّل [["8080"]] لـ [[8080]]. ولاحظ إنها هي كمان بترجّع [[(int, error)]]: نفس النمط في المكتبة القياسية كلها. و [[:=]] بيعرّف المتغيرين [[n]] و [[err]] مرة واحدة.

ولو النص مش رقم، الـ error اللي راجع نوعه [[*strconv.NumError]] (طبعته بـ [[%T]])، ورسالته:

~~~text رسالة err لما s = "abc"
strconv.Atoi: parsing "abc": invalid syntax
~~~

### [[if err != nil]]

«لو فيه error». [[!=]] معناها «مش بيساوي». ده السطر اللي هتكتبه بعد كل نداء ممكن يفشل.

### [[fmt.Errorf("port %q is not a number: %w", s, err)]]

[[Errorf]] زي [[Sprintf]] بالظبط بس بترجّع error بدل نص. والعلامات اللي فيها:

- [[%q]]: بتحط النص بين علامات تنصيص: [["abc"]]. مفيدة في رسايل الأخطاء عشان لو النص فاضي أو فيه مسافات تبان.
- [[%w]]: w من wrap. بتحط رسالة [[err]] مكانها، **وكمان** بتحفظ الـ error الأصلي جوه الجديد عشان حد فوق يقدر يسأل عنه (الدرس الجاي).

فالرسالة النهائية = سياقنا + رسالة Atoi:

~~~text الناتج لـ "abc"
error: port "abc" is not a number: strconv.Atoi: parsing "abc": invalid syntax
~~~

---

## ٥. المدى

~~~go main.go
  if n < 1 || n > 65535 {
    return 0, fmt.Errorf("port %d out of range", n)
  }
  return n, nil
~~~

- [[||]] = «أو»: لو أقل من 1 **أو** أكبر من 65535.
- ليه 65535؟ رقم البورت بيتخزن في 16 bit، يعني 2 أُس 16 = 65536 قيمة (من 0 لـ 65535)، والبورت 0 مش بيتستخدم كرقم حقيقي، فالمدى من 1 لـ 65535.
- [[%d]]: رقم صحيح (decimal).
- [[return n, nil]]: النجاح = القيمة و [[nil]] (مفيش error).

---

## ٦. main: الـ loop

~~~go main.go
  for _, in := range []string{"8080", "", "abc", "70000"} {
    port, err := parsePort(in)
    if err != nil {
      fmt.Println("error:", err)
      continue
    }
    fmt.Println("ok:", port)
  }
~~~

- [[[]string{...}]]: slice من ٤ نصوص اتعملت في مكانها.
- [[range]] بيدي في كل لفّة الـ index والقيمة. الـ index مش محتاجينه فبنكتب [[_]]، والقيمة في [[in]].
- [[port, err := parsePort(in)]]: بنستقبل القيمتين.
- [[fmt.Println("error:", err)]]: Println لما تاخد error بتنادي [[err.Error()]] لوحدها وتطبع الرسالة.
- [[continue]]: سيب باقي اللفّة دي وروح للّي بعدها. فسطر [["ok:"]] مش هيتطبع لما فيه error.

| المدخل | وقف عند | الناتج |
|---|---|---|
| [["8080"]] | عدّى كل الفحوص | [[ok: 8080]] |
| [[""]] | الفحص الأول | [[error: port is empty]] |
| [["abc"]] | Atoi | [[error: port "abc" is not a number: ...]] |
| [["70000"]] | المدى | [[error: port 70000 out of range]] |

---

## ٧. [[if]] بجملة تمهيدية

~~~go main.go
  if _, err := os.ReadFile("missing.txt"); err != nil {
    fmt.Println(err)
  }
~~~

- الـ [[if]] في Go ممكن يبقى قبله جملة تتنفذ الأول، وبينهم [[;]]. والمتغيرات اللي اتعرّفت فيها ([[err]] هنا) عايشة جوه الـ if بس.
- [[os.ReadFile]] بترجّع [[([]byte, error)]]: محتوى الملف كبايتات، و error. المحتوى مش محتاجينه فـ [[_]].
- الملف مش موجود، فالـ error رسالته فيها ٣ حاجات: العملية ([[open]])، والمسار، والسبب من نظام التشغيل.

~~~text الناتج
open missing.txt: no such file or directory
~~~

نوع الـ error ده [[*fs.PathError]]، وفي الدرس الجاي هتعرف تطلّع منه المسار لوحده.

### الناتج كله

~~~text go run .
ok: 8080
error: port is empty
error: port "abc" is not a number: strconv.Atoi: parsing "abc": invalid syntax
error: port 70000 out of range
open missing.txt: no such file or directory
~~~

---

## ٨. الحل: [[loadAge]]

~~~go solCode
func loadAge(s string) (int, error) {
  if s == "" {
    return 0, errors.New("age is empty")
  }
  n, err := strconv.Atoi(s)
  if err != nil {
    return 0, fmt.Errorf("age %q: %w", s, err)
  }
  if n < 0 || n > 130 {
    return 0, fmt.Errorf("age %d out of range", n)
  }
  return n, nil
}
~~~

نفس شكل parsePort بالظبط، والفرق في الرسايل والمدى (من 0 لـ 130). حطيتها في برنامج بنفس الـ loop على [[[]string{"25", "", "abc", "-3", "200"}]]، وبعدها [[age, _ := loadAge("abc")]] و [[fmt.Println(age)]]:

~~~text الناتج
ok: 25
error: age is empty
error: age "abc": strconv.Atoi: parsing "abc": invalid syntax
error: age -3 out of range
error: age 200 out of range
0
~~~

- [["-3"]]: Atoi بتفهم السالب عادي، فعدّت التحويل ووقعت في المدى.
- آخر سطر [[0]]: الـ [[_]] رمت الـ error، فالبرنامج كمّل بالقيمة الصفرية كأن السن صفر. مفيش أي تحذير، وده بالظبط الـ bug اللي [[if err != nil]] بتمنعه.

---

## الخلاصة

| الفكرة | المعنى |
|---|---|
| [[(T, error)]] | الدالة اللي ممكن تفشل بترجّع error كآخر قيمة |
| [[nil]] | مفيش error |
| [[errors.New]] | error برسالة ثابتة |
| [[fmt.Errorf]] + [[%w]] | error برسالة فيها قيم، ومحتفظ بالأصلي |
| [[if err != nil]] | شيك على طول بعد النداء |
| فشل | رجّع القيمة الصفرية مع الـ error |

- متستخدمش القيمة لو فيه error، ومترميش الـ error بـ [[_]] إلا لو متأكد إنه مش مهم.
- الرسايل بحروف صغيرة ومن غير نقطة، لأنها بتتلزق في بعض: [[open missing.txt: no such file or directory]].`,
          lines: [
            "باكدج main.",
            "imports.",
            R`[[errors]]: عشان [[errors.New]].`,
            "fmt.",
            "os، لقراية الملفات.",
            "strconv.",
            "قفلة.",
            R`بترجّع الرقم و error، والـ error دايمًا الأخير.`,
            "لو فاضي...",
            R`...رجّع صفر و error برسالة ثابتة.`,
            "قفلة.",
            "حاول تحوّل.",
            "فشل التحويل؟",
            R`رجّع error فيه السياق، و [[%w]] بيحفظ الـ error الأصلي جوّاه.`,
            "قفلة.",
            R`[[||]] = أو: بره المدى؟`,
            "error فيه الرقم.",
            "قفلة.",
            R`نجاح: الرقم و [[nil]].`,
            "قفلة.",
            "main.",
            "لف على ٤ مدخلات.",
            "نادي واستقبل القيمتين.",
            "الفحص المشهور.",
            "اطبع الـ error.",
            "روح للّفة اللي بعدها.",
            "قفلة.",
            "نجاح.",
            "قفلة الـ for.",
            R`نفس النمط بجملة تمهيدية: البيانات مش محتاجينها ([[_]]).`,
            R`رسالة الـ error بتاع os.`,
            "قفلة.",
            "قفلة main."
          ],
          sol: R`الناتج:
[[ok: 8080]]
[[error: port is empty]]
[[error: port "abc" is not a number: strconv.Atoi: parsing "abc": invalid syntax]]
[[error: port 70000 out of range]]
[[open missing.txt: no such file or directory]]

وفي loadAge (الكود تحت): [["25"]] بترجّع 25، والباقيين errors. ولما تتجاهل الـ error ([[age, _ := loadAge("abc")]]) هتطبع [[0]] كأن اليوزر عنده صفر سنة. ده بالظبط الـ bug اللي if err != nil بتمنعه.`,
          solCode: R`func loadAge(s string) (int, error) {
  if s == "" {
    return 0, errors.New("age is empty")
  }
  n, err := strconv.Atoi(s)
  if err != nil {
    return 0, fmt.Errorf("age %q: %w", s, err)
  }
  if n < 0 || n > 130 {
    return 0, fmt.Errorf("age %d out of range", n)
  }
  return n, nil
}`
        },
        {
          cmd: "errors.Is و errors.As",
          title: "تغلّف الخطأ بـ %w وتسأل عنه بـ errors.Is و errors.As",
          desc: R`لما error يطلع من تحت وانت بترجّعه لفوق، بتضيف سياق: [[fmt.Errorf("find user %d: %w", id, err)]]. الـ [[%w]] (wrap) بيحط الـ error الأصلي جوّا الجديد، فالرسالة فيها الاتنين، والأصلي لسه موجود لو حد عايز يسأل عنه.

وبعدين فيه سؤالين:
• هل الـ error ده (أو أي حاجة ملفوفة جوّاه) هو error معيّن؟ [[errors.Is(err, ErrNotFound)]]. ErrNotFound هنا sentinel error: متغير exported ثابت معمول بـ [[errors.New]]، والعرف إن اسمه يبدأ بـ Err. زي [[sql.ErrNoRows]] و [[io.EOF]] و [[os.ErrNotExist]].
• هل جوّاه error من نوع معيّن؟ ولو آه هاته عشان أقرا حقوله: [[errors.As(err, &target)]]. ده لما الـ error نوع خاص (struct) فيه معلومات زيادة، زي اسم الحقل الغلط.

ليه مش [[err == ErrNotFound]]؟ لأن بعد التغليف الـ err بقى error جديد، فالمقارنة المباشرة بتفشل. Is و As بيفكّوا الطبقات لحد ما يلاقوا.

و [[%v]] بدل [[%w]] بيحط الرسالة بس من غير الأصلي (لما مش عايز اللي فوق يعتمد على تفاصيلك الداخلية).`,
          example: R`package main

import (
  "errors"
  "fmt"
)

var ErrNotFound = errors.New("not found")

type ValidationError struct {
  Field string
}

func (e *ValidationError) Error() string {
  return "invalid " + e.Field
}

func findUser(id int) (string, error) {
  switch {
  case id <= 0:
    return "", &ValidationError{Field: "id"}
  case id > 100:
    return "", fmt.Errorf("find user %d: %w", id, ErrNotFound)
  }
  return "Sara", nil
}

func main() {
  for _, id := range []int{7, 500, -1} {
    name, err := findUser(id)
    var vErr *ValidationError
    switch {
    case err == nil:
      fmt.Println("found", name)
    case errors.Is(err, ErrNotFound):
      fmt.Println("404:", err)
    case errors.As(err, &vErr):
      fmt.Println("400: field", vErr.Field)
    default:
      fmt.Println("500:", err)
    }
  }
  wrapped := fmt.Errorf("x: %w", ErrNotFound)
  fmt.Println(wrapped == ErrNotFound, errors.Unwrap(wrapped) == ErrNotFound)
}`,
          try: R`غيّر [[%w]] لـ [[%v]] في findUser وشغّل: id 500 هيروح فين؟ وبعدين اقرا ملف مش موجود بـ [[os.ReadFile]] وغلّف الـ error بـ [[fmt.Errorf("load config: %w", err)]]، وشيك بـ [[errors.Is(err, fs.ErrNotExist)]] واطبع المسار بـ [[errors.As]] لـ [[*fs.PathError]].`,
          flag: "script",
          deep: {
            why: R`السيرفر محتاج يفرّق: «اليوزر مش موجود» يبقى 404، و «البيانات غلط» 400، وأي حاجة تانية 500. من غير Is و As هتقارن نصوص الرسايل ([[strings.Contains(err.Error(), "not found")]])، وده بيتكسر أول ما حد يعدّل رسالة.`,
            how: R`[[fmt.Errorf]] مع [[%w]] بيرجّع error عنده method [[Unwrap() error]]. [[errors.Is]] بيقارن بالـ error، ولو مش هو يعمل Unwrap ويقارن تاني، لحد ما يخلص. [[errors.As]] نفس الفكرة بس بيقارن بالنوع، ولو لقاه بيحطه في المتغير اللي بعتّ عنوانه ([[&vErr]])، عشان كده لازم pointer لمتغير من النوع.

ValidationError بيحقق error لأن [[*ValidationError]] عنده [[Error() string]]، فبنرجّع [[&ValidationError{...}]] (pointer)، وبنعرّف vErr كـ [[*ValidationError]] عشان As يطابق.

[[errors.Join(err1, err2)]] بيجمع أكتر من error في واحد، و Is و As بيدوّروا في الكل. ومن Go 1.20 ممكن أكتر من [[%w]] في نفس Errorf.

[[wrapped == ErrNotFound]] false لأنه error تاني، و [[errors.Unwrap]] بيفك طبقة واحدة بس.`,
            when: R`[[errors.Is]] مع sentinel errors بتاعتك أو بتاعة المكتبات ([[sql.ErrNoRows]] و [[context.DeadlineExceeded]] و [[io.EOF]] و [[fs.ErrNotExist]]). [[errors.As]] لما محتاج تفاصيل من نوع خاص ([[*fs.PathError]] و [[*json.SyntaxError]] و [[*pgconn.PgError]] عشان كود الـ constraint). [[%w]] وانت بترجّع لفوق جوه نفس المشروع.`,
            mistakes: R`[[err == sql.ErrNoRows]] بعد ما حد في النص غلّف الـ error. و [[errors.As(err, vErr)]] من غير [[&]] (بيعمل panic، و go vet بيمسكها). و [[%v]] وانت عايز اللي فوق يعمل Is. وتقارن رسايل الـ errors بالنصوص.`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

دالة [[findUser]] بترجّع ٣ أنواع نتايج: نجاح، أو error «مش موجود» ملفوف بسياق، أو error من نوع خاص فيه اسم الحقل الغلط. و main بتفرز الـ error زي ما سيرفر حقيقي بيعمل: 404 ولا 400 ولا 500. الناتج من [[go run .]] في [[golang:1.25]] على لينكس.

---

## ١. sentinel error

~~~go main.go
var ErrNotFound = errors.New("not found")
~~~

- [[var]] على مستوى الباكدج (بره أي دالة): متغير واحد بيعيش طول البرنامج.
- sentinel يعني «حارس» أو علامة: error ثابت بنقارن بيه. الاسم بحرف كبير (exported، يعني الباكدجات التانية تشوفه) ويبدأ بـ [[Err]]. أمثلة من المكتبة القياسية: [[io.EOF]] و [[sql.ErrNoRows]] و [[fs.ErrNotExist]].

---

## ٢. error بنوع خاص

~~~go main.go
type ValidationError struct {
  Field string
}

func (e *ValidationError) Error() string {
  return "invalid " + e.Field
}
~~~

- [[ValidationError]] struct فيه معلومة زيادة: اسم الحقل.
- [[func (e *ValidationError) Error() string]]: method على [[*ValidationError]] (pointer receiver). الـ [[*]] معناها pointer للنوع. ومن ساعة ما بقى عنده [[Error() string]] بقى بيحقق interface الـ [[error]].
- عشان الـ method على الـ pointer، اللي بيحقق error هو [[*ValidationError]] مش [[ValidationError]]. فهنرجّعه دايمًا بـ [[&]].

---

## ٣. [[findUser]]

~~~go main.go
func findUser(id int) (string, error) {
  switch {
  case id <= 0:
    return "", &ValidationError{Field: "id"}
  case id > 100:
    return "", fmt.Errorf("find user %d: %w", id, ErrNotFound)
  }
  return "Sara", nil
}
~~~

- [[switch {]] من غير قيمة: كل [[case]] شرط لوحده، وأول واحد يبقى true بيتنفذ (زي سلسلة if/else if).
- [[&ValidationError{Field: "id"}]]: [[&]] بتاخد عنوان struct جديد، يعني pointer. ده اللي بيحقق error.
- [[fmt.Errorf("find user %d: %w", id, ErrNotFound)]]: error جديد رسالته [[find user 500: not found]]، و [[%w]] حطت ErrNotFound **جوّاه**. يعني الـ error الراجع بقى طبقتين: السياق بره، و ErrNotFound جوّا.

---

## ٤. main: الفرز

~~~go main.go
  for _, id := range []int{7, 500, -1} {
    name, err := findUser(id)
    var vErr *ValidationError
    switch {
    case err == nil:
      fmt.Println("found", name)
    case errors.Is(err, ErrNotFound):
      fmt.Println("404:", err)
    case errors.As(err, &vErr):
      fmt.Println("400: field", vErr.Field)
    default:
      fmt.Println("500:", err)
    }
  }
~~~

### [[var vErr *ValidationError]]

متغير فاضي (قيمته nil) من النوع اللي هندوّر عليه. [[errors.As]] هتملاه لو لقت.

### [[errors.Is(err, ErrNotFound)]]

بتسأل: «الـ err ده هو ErrNotFound، أو فيه ErrNotFound ملفوف جوّاه؟». بتقارن، ولو مش هو بتفك طبقة وتقارن تاني، لحد ما الطبقات تخلص. مع id 500 لقته في الطبقة التانية، فـ true.

### [[errors.As(err, &vErr)]]

بتسأل: «فيه جوّا الـ err ده حاجة **نوعها** [[*ValidationError]]؟» ولو لقت، بتحطها في vErr وترجّع true. و [[&vErr]] عنوان المتغير، عشان As تقدر تكتب فيه (لو بعتّ vErr نفسه هتبعت نسخة فاضية ملهاش لازمة).

بعدها [[vErr.Field]] بقى فيه [["id"]]: ده اللي Is مكانتش هتقدر تديهولك.

### [[default]]

أي error تاني مش عارفينه = 500. مع البيانات دي مش هيتنفذ، بس في سيرفر حقيقي ده مكان «حاجة بايظة عندنا».

| id | findUser رجّعت | الـ case | الناتج |
|---|---|---|---|
| 7 | [["Sara", nil]] | [[err == nil]] | [[found Sara]] |
| 500 | ErrNotFound ملفوف | [[errors.Is]] | [[404: find user 500: not found]] |
| -1 | [[*ValidationError]] | [[errors.As]] | [[400: field id]] |

---

## ٥. ليه مش [[==]]؟

~~~go main.go
  wrapped := fmt.Errorf("x: %w", ErrNotFound)
  fmt.Println(wrapped == ErrNotFound, errors.Unwrap(wrapped) == ErrNotFound)
~~~

- [[wrapped == ErrNotFound]]: false. wrapped error **جديد** (الطبقة اللي بره)، مش ErrNotFound نفسه.
- [[errors.Unwrap(wrapped)]]: بتفك طبقة واحدة بس وترجّع اللي جوّا، فالمقارنة true.

~~~text الناتج كله
found Sara
404: find user 500: not found
400: field id
false true
~~~

---

## ٦. التجربة: [[%v]] بدل [[%w]]

غيّرت [[%w]] لـ [[%v]] في findUser بس:

~~~text الناتج
found Sara
500: find user 500: not found
400: field id
false true
~~~

الرسالة هي هي حرف بحرف، بس id 500 راح لـ 500 بدل 404: [[%v]] بتحط **نص** الرسالة بس، فالـ error مبقاش جوّاه ErrNotFound، و Is مش لاقياه. (آخر سطر متغيّرش لأن wrapped لسه معمولة بـ [[%w]].)

### ولو نسيت [[&]] في As؟

كتبت [[errors.As(err, vErr)]]. [[go vet]] مسكها:

~~~text go vet .
./main.go:37:10: second argument to errors.As must be a non-nil pointer to either a type that implements error, or to any interface type
~~~

ولو شغّلت من غير vet، البرنامج اشتغل لحد ما وصل للسطر ده ووقع:

~~~text go run .
found Sara
404: find user 500: not found
panic: errors: target must be a non-nil pointer
~~~

---

## ٧. الحل: ملف مش موجود

~~~go solCode
_, err := os.ReadFile("config.json")
if err != nil {
  err = fmt.Errorf("load config: %w", err)
}
fmt.Println(err)
fmt.Println(errors.Is(err, fs.ErrNotExist))
var pathErr *fs.PathError
if errors.As(err, &pathErr) {
  fmt.Println(pathErr.Op, pathErr.Path)
}
~~~

- محتاج imports: [[errors]] و [[fmt]] و [[io/fs]] و [[os]]. [[io/fs]] (fs = file system) فيها الأنواع والـ errors المشتركة للملفات.
- [[err = fmt.Errorf(..., err)]]: بنغلّف الـ error في نفس المتغير ([[=]] مش [[:=]] لأنه متعرّف قبل كده).
- [[errors.Is(err, fs.ErrNotExist)]]: الـ error الأصلي بتاع os بيقول إنه «مش موجود»، حتى من تحت طبقتنا.
- [[*fs.PathError]]: النوع اللي os بترجّعه لأخطاء الملفات، فيه [[Op]] (العملية) و [[Path]] (المسار) و [[Err]] (السبب).

~~~text الناتج
load config: open config.json: no such file or directory
true
open config.json
~~~

---

## الخلاصة

| الأداة | بتسأل إيه | بترجّع |
|---|---|---|
| [[%w]] في Errorf | (بتغلّف) | error جديد جوّاه الأصلي |
| [[errors.Is(err, X)]] | هل X موجود في أي طبقة؟ | bool |
| [[errors.As(err, &v)]] | هل فيه error من نوع v؟ | bool، وبتملا v |
| [[errors.Unwrap(err)]] | (بتفك طبقة واحدة) | اللي جوّا أو nil |

- [[==]] بتفشل بعد أي تغليف. استخدم Is.
- As محتاجة **عنوان** متغير ([[&vErr]])، و go vet بيمسكها لو نسيت.
- [[%v]] لما مش عايز اللي فوق يعتمد على الـ error الداخلي، و [[%w]] لما عايزه يقدر يسأل عنه.`,
          lines: [
            "باكدج main.",
            "imports.",
            "errors.",
            "fmt.",
            "قفلة.",
            R`sentinel error: متغير ثابت exported اسمه بيبدأ بـ Err.`,
            "error بنوع خاص فيه معلومة زيادة.",
            "اسم الحقل الغلط.",
            "قفلة.",
            R`[[Error() string]] على [[*ValidationError]]، فبقى يحقق interface الـ error.`,
            "الرسالة.",
            "قفلة.",
            "دالة بحث.",
            "switch من غير قيمة.",
            "id غلط...",
            R`...رجّع pointer لـ ValidationError.`,
            "id كبير...",
            R`...غلّف ErrNotFound بـ [[%w]] مع سياق.`,
            "قفلة.",
            "نجاح.",
            "قفلة.",
            "main.",
            "٣ حالات.",
            "نادي.",
            R`متغير فاضي من النوع اللي هنسأل عنه بـ As.`,
            "switch على الحالات.",
            "مفيش error.",
            "اطبع.",
            "هل جوّاه ErrNotFound؟ (بيفك التغليف)",
            "يبقى 404.",
            R`هل جوّاه [[*ValidationError]]؟ لو آه حطه في vErr.`,
            "يبقى 400، واقرا الحقل.",
            "أي حاجة تانية.",
            "500.",
            "قفلة الـ switch.",
            "قفلة الـ for.",
            "غلّف يدوي.",
            R`المقارنة المباشرة false، و Unwrap بيفك طبقة فـ true.`,
            "قفلة."
          ],
          sol: R`الناتج:
[[found Sara]]
[[404: find user 500: not found]]
[[400: field id]]
[[false true]]

ومع [[%v]] بدل [[%w]] الرسالة نفسها مبتتغيّرش، بس id 500 بيروح لـ [[500: find user 500: not found]] لأن ErrNotFound مبقاش ملفوف جوّاه، فـ Is مش لاقياه.

ومع الملف: [[errors.Is(err, fs.ErrNotExist)]] بترجّع true رغم التغليف، و As بتديك [[pathErr.Op]] = [[open]] و [[pathErr.Path]] = اسم الملف (الكود تحت).`,
          solCode: R`_, err := os.ReadFile("config.json")
if err != nil {
  err = fmt.Errorf("load config: %w", err)
}
fmt.Println(err)
fmt.Println(errors.Is(err, fs.ErrNotExist))
var pathErr *fs.PathError
if errors.As(err, &pathErr) {
  fmt.Println(pathErr.Op, pathErr.Path)
}`
        },
        {
          cmd: "defer و panic و recover",
          title: "defer بيأجّل التنفيذ لآخر الدالة، و panic للأخطاء اللي مش المفروض تحصل",
          desc: R`[[defer f()]] بيأجّل تنفيذ f لحد ما الدالة اللي هو فيها تخلص، بأي طريقة: return عادي، أو return بدري من نص الدالة، أو حتى panic. أشهر استخدام: تقفل حاجة فتحتها، والسطر جنب الفتح على طول:
[[f, err := os.Open(path)]]
[[if err != nil { return err }]]
[[defer f.Close()]]

لو فيه أكتر من defer بيتنفذوا بالعكس (آخر واحد اتسجّل يتنفذ الأول)، زي كومة أطباق.

[[panic]] بيوقف الدالة الحالية ويطلع لفوق ينفّذ الـ defers لحد ما البرنامج يقع ويطبع stack trace. Go نفسها بتعمل panic في حاجات زي index بره الحدود، أو nil pointer، أو قسمة int على صفر. وانت تستخدمه بس لحاجة «مستحيل تحصل لو الكود صح»، مش لأخطاء عادية (دي error).

[[recover()]] جوه دالة defer بيمسك الـ panic ويرجّع قيمته، والبرنامج يكمّل. بيتستخدم في حدود معينة: السيرفر بيعمل recover لكل request عشان request واحد بايظ ميوقعش السيرفر كله.

و [[os.WriteFile(name, data, 0o644)]]: [[0o644]] صلاحيات الملف بالـ octal (صاحبه يقرا ويكتب، والباقي يقرا بس).`,
          example: R`package main

import (
  "fmt"
  "os"
)

func readStart(path string) error {
  f, err := os.Open(path)
  if err != nil {
    return err
  }
  defer f.Close()
  buf := make([]byte, 16)
  n, err := f.Read(buf)
  if err != nil {
    return err
  }
  fmt.Printf("%q\n", buf[:n])
  return nil
}

// named results عشان الـ defer يقدر يغيّر err اللي راجع
func safeDivide(a, b int) (result int, err error) {
  defer func() {
    if r := recover(); r != nil {
      err = fmt.Errorf("recovered: %v", r)
    }
  }()
  return a / b, nil
}

func main() {
  for i := range 3 {
    defer fmt.Println("defer", i)
  }
  if err := os.WriteFile("note.txt", []byte("hello defer\n"), 0o644); err != nil {
    panic(err)
  }
  fmt.Println(readStart("note.txt") == nil)
  fmt.Println(safeDivide(10, 2))
  fmt.Println(safeDivide(1, 0))
}`,
          try: R`شيل الـ defer اللي فيه recover من safeDivide وشغّل: البرنامج هيقع، وهل الـ «defer 0 و 1 و 2» اتطبعوا؟ وبعدين اكتب [[x := 1]] و [[defer fmt.Println("x =", x)]] و [[x = 2]]: هيطبع كام؟`,
          flag: "script",
          deep: {
            why: R`من غير defer لازم تفتكر تقفل الملف قبل كل return، ولو الدالة فيها ٥ returns هتنسى واحدة، والملفات أو الاتصالات المفتوحة هتتراكم لحد ما السيرفر يقع بـ [[too many open files]]. defer بيخلي القفل جنب الفتح ومضمون يحصل.`,
            how: R`الـ arguments بتاعة الـ defer بتتحسب وقت ما تكتب defer، مش وقت التنفيذ. فـ [[defer fmt.Println("x =", x)]] بتطبع القيمة اللي كانت وقتها. لو عايز القيمة الأخيرة استخدم closure: [[defer func() { fmt.Println(x) }()]].

[[recover]] بيشتغل بس جوه دالة defer مباشرة. وبيرجّع nil لو مفيش panic. في safeDivide الـ results ليها أسماء، فالـ defer بيعدّل err بعد الـ return وقبل ما القيمة توصل للمستدعي. [[a / b]] لما b متغير بصفر بيعمل panic ([[integer divide by zero]]).

الـ defer اللي جوه loop بيتنفذ لما الدالة كلها تخلص، مش آخر كل لفّة. في main الـ 3 defers بيتنفذوا بعد آخر سطر، بالعكس.

[[buf[:n]]]: f.Read بيقرا لحد 16 بايت ويرجّع عددهم في n، فبنطبع اللي اتقري بس.`,
            when: R`defer: قفل ملفات واتصالات و rows ([[defer rows.Close()]])، و Unlock بعد Lock، و cancel بعد context.WithTimeout، و timing ([[defer log(time.Since(start))]]). panic: حالة مستحيلة أو config ناقص وقت التشغيل الأول (زي الدوال اللي اسمها Must). recover: في middleware السيرفر وحدود الـ goroutines.`,
            mistakes: R`[[defer f.Close()]] قبل [[if err != nil]]: لو الفتح فشل f بـ nil. مع [[*os.File]] الـ Close بترجّع [[invalid argument]] بس، لكن [[defer resp.Body.Close()]] قبل الفحص بتعمل panic (nil pointer) لأن [[resp.Body]] بيتقري وقت التسجيل. و defer جوه loop بتفتح آلاف الملفات (مش بيتقفلوا غير في الآخر): حط جسم الـ loop في دالة. و panic بدل error لأخطاء عادية زي input غلط. و recover في كل حتة فتخبّي bugs حقيقية. وتتجاهل الـ error بتاع Close لملف بتكتب فيه (ممكن الكتابة تفشل وقت القفل).`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

٣ حاجات: دالة بتفتح ملف وتقفله بـ [[defer]]، ودالة قسمة بتمسك الـ panic بـ [[recover]] وتحوّله error، و ٣ defers في main عشان تشوف ترتيب تنفيذهم. الناتج من [[go run .]] في [[golang:1.25]] على لينكس.

---

## ١. [[readStart]]: افتح، أجّل القفل، اقرا

~~~go main.go
func readStart(path string) error {
  f, err := os.Open(path)
  if err != nil {
    return err
  }
  defer f.Close()
  buf := make([]byte, 16)
  n, err := f.Read(buf)
  if err != nil {
    return err
  }
  fmt.Printf("%q\n", buf[:n])
  return nil
}
~~~

### [[os.Open(path)]]

بتفتح الملف للقراية وبترجّع [[*os.File]] (pointer لملف مفتوح) و error. لو فشلت بنرجع على طول: مفيش ملف اتفتح عشان نقفله.

### [[defer f.Close()]]

[[defer]] معناها «أجّل»: سجّل النداء ده، ونفّذه لما الدالة دي تخلص، بأي طريقة خرجت: [[return nil]] في الآخر، أو [[return err]] من النص، أو panic. فالقفل مكتوب جنب الفتح، ومضمون يحصل.

ولازم ييجي **بعد** [[if err != nil]]. لو الفتح فشل، f بيبقى nil. مع [[*os.File]] بالذات الـ Close على nil مش بتقع، بترجّع error بس (جرّبت: [[invalid argument]]). لكن مع أنواع تانية بتقع. جرّبت [[resp, err := http.Get(...)]] على بورت مقفول وبعدها [[defer resp.Body.Close()]] قبل الفحص:

~~~text الناتج
panic: runtime error: invalid memory address or nil pointer dereference
~~~

ولاحظ إنها وقعت **على سطر الـ defer نفسه**، مش في الآخر: [[resp.Body]] بيتحسب وقت التسجيل (تحت هتعرف ليه). و [[go vet]] مسك الغلطة دي: [[using resp before checking for errors]].

### [[make([]byte, 16)]] و [[f.Read(buf)]]

- [[make([]byte, 16)]]: slice من 16 بايت فاضيين: ده الـ buffer اللي هنقرا فيه.
- [[f.Read(buf)]]: بتملا الـ buffer من الملف لحد 16 بايت، وبترجّع [[n]] = عدد البايتات اللي اتقرت فعلًا. الملف فيه 12 بايت بس ([[hello defer]] + سطر جديد)، فـ n = 12.
- [[buf[:n]]]: أول n بايت بس. من غيرها هتطبع الـ 4 بايتات الفاضية كمان.
- [[%q]]: بيطبع بين علامات تنصيص، وبيكتب السطر الجديد كـ [[\n]] بدل ما ينزل سطر، فتشوف المحتوى بالظبط.

~~~text الناتج
"hello defer\n"
~~~

---

## ٢. [[safeDivide]]: panic و recover

~~~go main.go
// named results عشان الـ defer يقدر يغيّر err اللي راجع
func safeDivide(a, b int) (result int, err error) {
  defer func() {
    if r := recover(); r != nil {
      err = fmt.Errorf("recovered: %v", r)
    }
  }()
  return a / b, nil
}
~~~

### [[(result int, err error)]]: named results

القيم الراجعة ليها **أسامي**، يعني متغيرات موجودة جوه الدالة من أولها. ده المهم هنا: الـ defer بيتنفذ **بعد** الـ return وقبل ما القيمة توصل للي نادى، فلو غيّر [[err]] التغيير بيوصل.

### [[defer func() { ... }()]]

- [[func() { ... }]]: دالة من غير اسم.
- [[()]] في الآخر: نادي الدالة دي. والـ defer اللي قبلها بيأجّل النداء ده لآخر safeDivide.

### [[recover()]]

- لو فيه panic شغال، [[recover()]] بتوقفه وترجّع القيمة اللي اتعمل بيها panic، والبرنامج بيكمّل عادي.
- لو مفيش panic بترجّع [[nil]]، فالـ if مش بيتنفذ.
- بتشتغل بس جوه دالة defer. لو ناديتها في نص الكود العادي بترجّع nil ومش بتعمل حاجة.
- [[if r := recover(); r != nil]]: نفس شكل الـ if بجملة تمهيدية.

### [[return a / b, nil]]

- [[10 / 2]]: عادي، فـ [[5 <nil>]].
- [[1 / 0]]: قسمة int على صفر = panic من Go نفسها: [[runtime error: integer divide by zero]]. الـ defer بيمسكه، ويحطه في err. و result بيفضل قيمته الصفرية 0.

~~~text الناتج
5 <nil>
0 recovered: runtime error: integer divide by zero
~~~

[[fmt.Println(safeDivide(10, 2))]]: لما دالة بترجّع أكتر من قيمة، ينفع تبعتهم كلهم لـ Println مرة واحدة.

---

## ٣. main: ترتيب الـ defers

~~~go main.go
  for i := range 3 {
    defer fmt.Println("defer", i)
  }
~~~

- [[range 3]]: لف على 0 و 1 و 2 (من Go 1.22).
- كل لفّة بتسجّل defer، بس **مفيش حاجة بتتطبع دلوقتي**. الـ defers بتاعة main بتستنى لحد ما main كلها تخلص.
- بيتنفذوا **بالعكس**: آخر واحد اتسجّل أول واحد يتنفذ (LIFO = Last In First Out)، زي كومة أطباق.

~~~go main.go
  if err := os.WriteFile("note.txt", []byte("hello defer\n"), 0o644); err != nil {
    panic(err)
  }
~~~

- [[os.WriteFile(name, data, perm)]]: بتعمل الملف (أو تمسح اللي فيه) وتكتب البايتات.
- [[[]byte("...")]]: تحويل نص لبايتات، لأن WriteFile بتاخد [[[]byte]].
- [[0o644]]: الصلاحيات بالـ octal ([[0o]] = رقم بنظام 8). 6 لصاحب الملف = قراية وكتابة، و 4 للجروب وللباقي = قراية بس. بعد التشغيل [[ls -l note.txt]] طلّع [[-rw-r--r--]].
- [[panic(err)]]: لو منقدرش نكتب ملف التجربة ملوش لازمة نكمّل. ده في main بس، مش في دالة مكتبة.

~~~go main.go
  fmt.Println(readStart("note.txt") == nil)
  fmt.Println(safeDivide(10, 2))
  fmt.Println(safeDivide(1, 0))
}
~~~

~~~text الناتج كله
"hello defer\n"
true
5 <nil>
0 recovered: runtime error: integer divide by zero
defer 2
defer 1
defer 0
~~~

الـ ٣ defers آخر حاجة، ومعكوسين.

---

## ٤. التجربة: من غير recover

شلت الـ defer اللي فيه recover من safeDivide، وبنيت البرنامج وشغّلته:

~~~text الناتج
"hello defer\n"
true
5 <nil>
defer 2
defer 1
defer 0
panic: runtime error: integer divide by zero

goroutine 1 [running]:
main.safeDivide(...)
    /w/t3a/main.go:25
main.main()
    /w/t3a/main.go:37 +0x1a5
exit=2   ← من echo exit=$? بعد التشغيل
~~~

- الـ panic طلع من safeDivide لـ main، و main نفّذت الـ defers بتاعتها وهي طالعة، فـ «defer 2 و 1 و 0» اتطبعوا **قبل** رسالة الـ panic.
- بعدين البرنامج وقع وطبع الـ stack trace: مين نادى مين، والملف ورقم السطر (الأرقام هنا للنسخة اللي اتشال منها 5 سطور).
- الـ exit code بقى 2 (نجاح البرنامج = 0).

## ٥. التجربة: الـ arguments بتتحسب إمتى؟

~~~go main.go
x := 1
defer fmt.Println("x =", x)
defer func() { fmt.Println("closure x =", x) }()
x = 2
~~~

~~~text الناتج
closure x = 2
x = 1
~~~

- [[defer fmt.Println("x =", x)]]: الـ arguments ([[x]] هنا) **بتتحسب وقت التسجيل**، فاتخزّن 1.
- الـ closure مش واخدة arguments، هي بتقرا x نفسه وقت التنفيذ، فشافت 2.
- والـ closure اتطبعت الأول لأنها اتسجّلت آخر واحدة.

---

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| [[defer f()]] | نفّذ f لما الدالة تخلص، بأي طريقة |
| أكتر من defer | بالعكس: آخر واحد الأول |
| arguments الـ defer | بتتحسب وقت كتابة الـ defer |
| [[panic(v)]] | وقّف الدالة، ونفّذ الـ defers وانت طالع، ولو محدش مسكه البرنامج يقع (exit 2) |
| [[recover()]] | جوه defer بس: يمسك الـ panic ويرجّع قيمته |
| named results | تخلي الـ defer يقدر يغيّر القيمة الراجعة |

- [[defer Close]] بعد فحص الـ error مش قبله.
- panic للحاجات المستحيلة، و error لأي فشل متوقع.`,
          lines: [
            "باكدج main.",
            "imports.",
            "fmt.",
            "os.",
            "قفلة.",
            "دالة بتقرا أول الملف.",
            "افتح.",
            "لو فشل...",
            "...ارجع على طول (مفيش حاجة نقفلها).",
            "قفلة.",
            R`سجّل القفل: هيتنفذ لما الدالة تخلص، مهما خرجت إزاي.`,
            "buffer بـ 16 بايت.",
            "اقرا، و n عدد البايتات اللي اتقرت.",
            "لو فشل...",
            R`...ارجع، والـ defer هيقفل الملف.`,
            "قفلة.",
            "اطبع اللي اتقري بين علامات تنصيص.",
            R`نجاح، والـ defer برضه هيقفل.`,
            "قفلة.",
            "قسمة بتمسك الـ panic.",
            "defer لدالة من غير اسم...",
            R`...[[recover()]] بيمسك الـ panic لو حصل.`,
            R`حوّله لـ error وغيّر القيمة الراجعة.`,
            "قفلة.",
            R`[[()]] في الآخر: نادي الدالة دي (متأجلة).`,
            "لو b صفر هنا panic.",
            "قفلة.",
            "main.",
            "3 defers في loop...",
            "...هيتنفذوا بالعكس في آخر main.",
            "قفلة.",
            R`اكتب ملف تجربة، و [[0o644]] صلاحياته.`,
            "مينفعش نكمّل من غيره.",
            "قفلة.",
            "اقرا أوله.",
            "5 و nil.",
            "0 و error فيه الـ panic.",
            "قفلة، وبعدها الـ defers."
          ],
          sol: R`الناتج:
[["hello defer\n"]]
[[true]]
[[5 <nil>]]
[[0 recovered: runtime error: integer divide by zero]]
[[defer 2]]
[[defer 1]]
[[defer 0]]

من غير recover: البرنامج بيطبع [[panic: runtime error: integer divide by zero]] والـ stack trace، وقبلها بيطبع [[defer 2]] و [[defer 1]] و [[defer 0]]: الـ panic بينفّذ الـ defers وهو طالع. والـ exit code بيبقى 2.

و [[x]]: بيطبع [[x = 1]] لأن قيمة x اتحسبت وقت ما سجّلت الـ defer.`
        },
        {
          cmd: "packages و exported names",
          title: "الباكدجات: الحرف الكبير يعني exported، و internal/ للي جوه المشروع بس",
          desc: R`الباكدج = فولدر. كل ملفات .go في نفس الفولدر لازم يبقى أول سطر فيهم نفس [[package name]]، وبيشوفوا بعض من غير import. والعرف إن اسم الباكدج هو اسم الفولدر، كلمة واحدة بحروف صغيرة: [[price]] و [[config]] و [[store]] (مش [[priceUtils]] ولا [[common]]).

الـ import بيبقى بالمسار الكامل: module path + الفولدر: [["example.com/shop/internal/price"]]. وبتستخدم الحاجات باسم الباكدج: [[price.WithVAT(100)]].

مفيش [[public]] و [[private]] في Go. القانون: اسم بيبدأ بحرف كبير (دالة، نوع، متغير، ثابت، حقل struct، method) يبقى exported ومتاح بره الباكدج. بحرف صغير يبقى للباكدج نفسها بس. في المثال [[round]] خاصة: main مش هتشوفها.

فولدر اسمه [[internal]] ليه معنى خاص: الباكدجات اللي جوّاه مينفعش حد يعملها import من بره الـ module (أو من بره الفولدر اللي فوق internal). فبتحط فيه كودك اللي مش عايز حد يعتمد عليه.

وممنوع import cycle: لو a بتعمل import لـ b، يبقى b متعملش import لـ a. لو حصل، الحاجة المشتركة تروح في باكدج تالتة.

والمثال تحت ملفين في فولدرين، وكل واحد مكتوب اسمه فوقه.`,
          example: R`// ملف: internal/price/price.go
package price

import "fmt"

const VAT = 0.14

func WithVAT(amount float64) float64 {
  return round(amount * (1 + VAT))
}

// حرف صغير: محدش بره الباكدج يقدر يناديها
func round(x float64) float64 {
  return float64(int(x*100+0.5)) / 100
}

func Format(amount float64) string {
  return fmt.Sprintf("%.2f EGP", amount)
}

// ملف: main.go (في أول المشروع، و go.mod فيه module example.com/shop)
package main

import (
  "fmt"

  "example.com/shop/internal/price"
)

func main() {
  total := price.WithVAT(100)
  fmt.Println(price.Format(total), price.VAT)
}`,
          try: R`اعمل المشروع ده بإيدك: [[go mod init example.com/shop]]، والفولدر [[internal/price]]، والملفين. شغّل [[go run .]]. وبعدين جرّب تنادي [[price.round(1.234)]] من main واقرا الـ error. وبعدين ضيف ملف تاني في نفس الفولدر [[internal/price/discount.go]] فيه دالة [[Discount]] بتستخدم round من غير import.`,
          flag: "script",
          deep: {
            why: R`لما المشروع يكبر محتاج تقسّمه: كل باكدج مسؤولة عن حاجة واحدة وبتكشف أقل حاجة ممكنة. قانون الحرف الكبير بيخلي ده باين من الاسم نفسه من غير كلمات زيادة، و internal بيمنع حد بره يعتمد على تفاصيلك فتقدر تغيّرها براحتك.`,
            how: R`الـ import بيتكتب في مجموعات مفصولة بسطر فاضي: المكتبة القياسية الأول، وبعدين الباقي. goimports بيرتّبهم كده لوحده.

[[func init() { ... }]] دالة خاصة بتتنفذ لوحدها مرة واحدة لما الباكدج تتحمّل، قبل main. استخدمها بحذر: بتخلي الكود يعمل حاجات من غير ما حد يطلبها.

[[import _ "pkg"]] (بـ [[_]]) معناها «حمّل الباكدج عشان init بتاعتها بس»، زي drivers الداتابيز (المستوى ٢).

ولو اسمين باكدج متشابهين: [[import pricev2 "example.com/shop/internal/price/v2"]] تدي اسم تاني.

[[round]] هنا بتقرّب لأقرب قرش بطريقة بسيطة تنفع للأرقام الموجبة. في كود حقيقي استخدم [[math.Round]].`,
            when: R`باكدج لكل مسؤولية واضحة (config و store و http handlers و domain). internal لكل حاجة مش API عام. ومتقسمش بدري: مشروع صغير ممكن يفضل باكدج main واحدة بملفات كتير، وده طبيعي في Go.`,
            mistakes: R`باكدج اسمها [[utils]] أو [[helpers]] بتبقى مكب لكل حاجة. واسم مكرر: [[price.PriceWithVAT]] (الأحسن [[price.WithVAT]] لأن اسم الباكدج بيتقري معاه). ودوال exported من غير ما تحتاج. و import cycle: [[import cycle not allowed]]. وحقول struct بحرف صغير وتستغرب إن JSON مش بيطلّعها.`
          },
          teach: R`## المثال ده إيه؟

مشروع صغير من باكدجين: [[price]] في فولدر [[internal/price]] بتحسب الضريبة، و [[main]] في أول المشروع بتستخدمها. المثال ملفين مش ملف واحد، فمينفعش تنسخه كله في [[main.go]]. كل الناتج تحت من [[golang:1.25]] على لينكس.

---

## ١. شكل الفولدرات

~~~text شجرة المشروع
shop/
  go.mod                  module example.com/shop
  main.go                 package main
  internal/
    price/
      price.go            package price
~~~

عملته كده:

~~~bash
mkdir -p shop/internal/price && cd shop
go mod init example.com/shop
~~~

~~~text الناتج
go: creating new go.mod: module example.com/shop
~~~

- [[go mod init]] بيعمل [[go.mod]]، وأول سطر فيه اسم الـ module: [[module example.com/shop]]. الاسم ده هو أول جزء في مسار أي import من المشروع.
- [[example.com/shop]] اسم وهمي. لو المشروع على GitHub العرف إن الاسم يبقى مسار الريبو، زي [[github.com/ali/shop]].

---

## ٢. [[internal/price/price.go]]

~~~go internal/price/price.go
package price

import "fmt"

const VAT = 0.14
~~~

- [[package price]]: أول سطر في أي ملف Go: الملف ده تبع باكدج اسمها price. ونفس اسم الفولدر.
- [[const VAT = 0.14]]: ثابت بحرف كبير، يعني **exported**: أي باكدج بتعمل import لـ price تقدر تقول [[price.VAT]]. (VAT = Value Added Tax، ضريبة القيمة المضافة، 14% في مصر.)

~~~go internal/price/price.go
func WithVAT(amount float64) float64 {
  return round(amount * (1 + VAT))
}
~~~

- [[WithVAT]] حرف كبير: exported.
- [[amount * (1 + VAT)]]: المبلغ × 1.14.
- [[round(...)]] من غير [[price.]] قبلها: جوه نفس الباكدج بتنادي الحاجات باسمها على طول.

~~~go internal/price/price.go
// حرف صغير: محدش بره الباكدج يقدر يناديها
func round(x float64) float64 {
  return float64(int(x*100+0.5)) / 100
}
~~~

[[round]] بحرف صغير: **unexported**، خاصة بالباكدج. والسطر بيقرّب لأقرب رقمين بعد العلامة. نفكّه من جوه لبرة على [[x = 113.99999999999999]] (ده [[100 * 1.14]] فعلًا في الـ float، مش 114 بالظبط، لأن 1.14 مش بتتكتب بالظبط في الـ binary). الأرقام دي طبعتها بـ Println في نفس الـ container:

| الخطوة | الجزء | النتيجة |
|---|---|---|
| ١ | [[x*100]] | 11399.999999999998 |
| ٢ | [[+0.5]] | 11400.499999999998 |
| ٣ | [[int(...)]] | 11400 (بيقطع الكسر) |
| ٤ | [[float64(...)]] | يرجّعه float |
| ٥ | [[/ 100]] | 114 |

الـ [[+0.5]] قبل القطع هي اللي بتخلي 0.5 فأكتر تطلع لفوق. وده بيصح للأرقام الموجبة بس، وفي كود حقيقي استخدم [[math.Round]].

~~~go internal/price/price.go
func Format(amount float64) string {
  return fmt.Sprintf("%.2f EGP", amount)
}
~~~

- [[Sprintf]] زي Printf بس بترجّع النص بدل ما تطبعه.
- [[%.2f]]: رقم عشري برقمين بعد العلامة بالظبط، فـ 114 تبقى [[114.00]].

---

## ٣. [[main.go]]

~~~go main.go
package main

import (
  "fmt"

  "example.com/shop/internal/price"
)

func main() {
  total := price.WithVAT(100)
  fmt.Println(price.Format(total), price.VAT)
}
~~~

- [["example.com/shop/internal/price"]]: مسار الـ import = اسم الـ module + مسار الفولدر. ده مسار **فولدر**، مش ملف.
- السطر الفاضي بين [["fmt"]] والمسار التاني: العرف إن المكتبة القياسية مجموعة، وباكدجات المشروع مجموعة تانية.
- [[price.WithVAT(100)]]: اسم الباكدج (آخر جزء في المسار) + نقطة + الاسم الـ exported.

~~~bash
go vet ./... && go run .
~~~

- [[./...]]: الفولدر الحالي وكل اللي تحته.
- [[go run .]]: [[.]] = الباكدج اللي في الفولدر الحالي (main).

~~~text الناتج
114.00 EGP 0.14
~~~

---

## ٤. التجارب

### نادي [[price.round]] من main

~~~text go build .
./main.go:12:21: name round not exported by package price
~~~

الدالة موجودة والـ compiler شايفها، بس الحرف الصغير مخليها ممنوعة بره price.

### ملف تاني في نفس الباكدج

~~~go internal/price/discount.go
package price

func Discount(amount, percent float64) float64 {
  return round(amount * (1 - percent/100))
}
~~~

- [[package price]]: نفس الباكدج، فـ round متاحة من غير import.
- [[amount, percent float64]]: لما parameters ورا بعض نوعهم واحد بتكتب النوع مرة.
- [[1 - percent/100]]: خصم 10% = × 0.9.

ضفت [[fmt.Println(price.Discount(200, 10))]] في main:

~~~text الناتج
114.00 EGP 0.14
180
~~~

### اسم باكدج غلط في نفس الفولدر

لو discount.go أوله [[package discount]]:

~~~text go build .
main.go:6:3: found packages discount (discount.go) and price (price.go) in /w/shop3/internal/price
~~~

فولدر واحد = باكدج واحدة.

### module تاني بيحاول يعمل import لـ internal

عملت module اسمه [[example.com/other]] بيعمل import لـ [["example.com/shop/internal/price"]] (وربطته بـ shop بسطر [[replace]] في go.mod):

~~~text go build .
package example.com/other
    main.go:6:3: use of internal package example.com/shop/internal/price not allowed
~~~

[[internal]] معناها: بس الكود اللي جوه الفولدر اللي فوق internal (هنا shop كله) يقدر يستخدمها.

### import cycle

باكدج a بتعمل import لـ b، و b بتعمل import لـ a:

~~~text go build ./...
package cyc/a
    imports cyc/b from a.go
    imports cyc/a from b.go: import cycle not allowed
~~~

---

## الخلاصة

| القاعدة | المعنى |
|---|---|
| فولدر = باكدج | كل الملفات فيه نفس [[package]]، وبيشوفوا بعض من غير import |
| مسار الـ import | اسم الـ module من go.mod + الفولدر |
| حرف كبير | exported: متاح بره الباكدج |
| حرف صغير | للباكدج نفسها بس |
| [[internal/]] | ممنوع import من بره الفولدر اللي فوقه |
| import cycle | ممنوع: الحاجة المشتركة تروح باكدج تالتة |

- الاسم بيتقري مع الباكدج: [[price.WithVAT]] مش [[price.PriceWithVAT]].`,
          lines: [
            R`الملف ده في باكدج [[price]]: نفس اسم الفولدر.`,
            "import fmt.",
            R`ثابت exported: [[price.VAT]] من بره.`,
            "دالة exported.",
            "بتنادي round: نفس الباكدج فمش محتاجة اسم.",
            "قفلة.",
            "دالة خاصة (حرف صغير).",
            "بتقرّب لرقمين بعد العلامة.",
            "قفلة.",
            "دالة exported تانية.",
            "نص منسّق بالعملة.",
            "قفلة.",
            "الملف التاني: باكدج main.",
            "imports.",
            "المكتبة القياسية الأول.",
            "باكدجات المشروع بالمسار الكامل: module path + الفولدر.",
            "قفلة.",
            "main.",
            R`[[اسم_الباكدج.الدالة]].`,
            R`[[114.00 EGP 0.14]].`,
            "قفلة."
          ],
          sol: R`[[go run .]] بيطبع [[114.00 EGP 0.14]].

[[price.round(1.234)]] من main بيطلع [[name round not exported by package price]]: الدالة موجودة، بس الحرف الصغير مخليها مش متشافة بره الباكدج.

والملف التالت (الكود تحت) أول سطر فيه [[package price]]، ويقدر ينادي round على طول. ولو كتبت فيه [[package discount]] بالغلط: [[found packages discount (discount.go) and price (price.go) in .../internal/price]].

ولو مشروع تاني (module تاني) حاول يعمل import لـ [[example.com/shop/internal/price]]: [[use of internal package example.com/shop/internal/price not allowed]].`,
          solCode: R`// ملف: internal/price/discount.go
package price

func Discount(amount, percent float64) float64 {
  return round(amount * (1 - percent/100))
}`
        }
      ]
    }
]);
