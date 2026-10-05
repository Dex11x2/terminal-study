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
            mistakes: R`[[defer f.Close()]] قبل [[if err != nil]]: لو الفتح فشل f بـ nil والـ Close بتعمل panic. و defer جوه loop بتفتح آلاف الملفات (مش بيتقفلوا غير في الآخر): حط جسم الـ loop في دالة. و panic بدل error لأخطاء عادية زي input غلط. و recover في كل حتة فتخبّي bugs حقيقية. وتتجاهل الـ error بتاع Close لملف بتكتب فيه (ممكن الكتابة تفشل وقت القفل).`
          },
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
    },
    {
      t: "interfaces و generics",
      l: 2,
      n: "interface بيتحقق لوحده من غير implements، و io.Reader و io.Writer، و any والـ type switch، وفخ الـ nil interface، و generics بـ constraints",
      items: [
        {
          cmd: "الواجهات Interfaces والـ Duck Typing",
          title: "interface: أي نوع عنده الـ methods المطلوبة بيحققه لوحده، من غير implements",
          desc: R`الـ interface في Go قايمة methods: [[type Notifier interface { Notify(to, msg string) error }]]. أي نوع عنده method بنفس الاسم والشكل بالظبط بيحقق الـ interface لوحده (implicitly). مفيش كلمة [[implements]]، والنوع ممكن ميعرفش أصلًا إن الـ interface موجود.

ده بيخلي الدالة تقول «أنا محتاجة أي حاجة تعرف تبعت إشعار» بدل «أنا محتاجة Email بالذات»: [[func notifyAll(ns []Notifier, ...)]] بتشتغل مع Email و SMS وأي نوع تعمله بكرة.

قواعد بيمشي عليها كود Go:
• الـ interfaces صغيرة: method أو اتنين. أشهرهم في المكتبة القياسية [[io.Reader]] و [[io.Writer]] و [[fmt.Stringer]] و [[error]]، وكلهم method واحدة.
• الـ interface بيتعرّف عند اللي بيستخدمه، مش عند اللي بيحققه. الـ service اللي محتاجة تحفظ users تعرّف [[UserStore]] بالـ methods اللي هي محتاجاها بس.
• «accept interfaces, return structs»: الدوال بتاخد interfaces (مرونة) وبترجّع أنواع حقيقية.

و [[var _ Notifier = SMS{}]]: سطر بيتأكد وقت الـ compile إن SMS بيحقق Notifier. لو حد غيّر توقيع Notify، الـ compile يقع هنا بدل ما يقع في مكان بعيد.`,
          example: R`package main

import (
  "fmt"
  "strings"
)

type Notifier interface {
  Notify(to, msg string) error
}

type Email struct {
  From string
}

func (e Email) Notify(to, msg string) error {
  fmt.Printf("email %s -> %s: %s\n", e.From, to, msg)
  return nil
}

type SMS struct{}

func (SMS) Notify(to, msg string) error {
  if !strings.HasPrefix(to, "+20") {
    return fmt.Errorf("sms: unsupported number %s", to)
  }
  fmt.Println("sms ->", to+":", msg)
  return nil
}

// فحص وقت الـ compile إن SMS بيحقق Notifier
var _ Notifier = SMS{}

func notifyAll(ns []Notifier, to, msg string) {
  for _, n := range ns {
    if err := n.Notify(to, msg); err != nil {
      fmt.Println("failed:", err)
    }
  }
}

func main() {
  all := []Notifier{Email{From: "shop@example.com"}, SMS{}}
  notifyAll(all, "+201001234567", "طلبك اتشحن")
  notifyAll([]Notifier{SMS{}}, "+44700", "hi")
}`,
          try: R`اعمل نوع تالت [[Fake]] فيه [[Sent []string]] ودالة Notify بتضيف الرسالة في Sent بدل ما تبعت (pointer receiver). ابعته لـ notifyAll كـ [[&Fake{}]] واطبع Sent بعدها. وبعدين جرّب تبعته من غير [[&]] واقرا الـ error.`,
          flag: "script",
          deep: {
            why: R`الـ interfaces هي اللي بتخلي كود Go قابل للاختبار والتبديل: الـ service بتاخد [[UserStore]] (interface)، فالإنتاج يديها Postgres، والاختبار يديها fake في الذاكرة، من غير mocking framework ومن غير ما Postgres يعرف إن فيه interface أصلًا.`,
            how: R`قيمة الـ interface جوّاها حاجتين: النوع الحقيقي، والقيمة. [[n.Notify(...)]] بتنادي method النوع الحقيقي وقت التشغيل.

[[func (SMS) Notify]]: receiver من غير اسم لأننا مش محتاجينه (SMS مفيهوش حقول).

مين بيحقق إيه مع الـ pointers: لو الـ method على [[*Fake]] (pointer receiver)، يبقى [[*Fake]] بس اللي بيحقق الـ interface، مش [[Fake]]. ولو على [[Fake]] (value)، الاتنين بيحققوه. عشان كده [[notifyAll([]Notifier{Fake{}})]] بيطلع error: [[Fake does not implement Notifier (method Notify has pointer receiver)]].

[[!strings.HasPrefix(to, "+20")]]: الرقم مش بيبدأ بكود مصر.`,
            when: R`لما يبقى عندك أكتر من تنفيذ حقيقي (إشعارات، تخزين، دفع)، أو محتاج fake للاختبار. متعملش interface لكل struct «يمكن نحتاجه»: اعمله لما يبقى فيه مستخدم محتاجه.`,
            mistakes: R`interface بـ 15 method على شكل الـ struct (زي Java): مستحيل تعمله fake، وكل حاجة مربوطة بيه. وتعرّف الـ interface جنب التنفيذ بدل جنب المستخدم. وتنسى إن pointer receiver معناه إن القيمة العادية مش بتحقق الـ interface.`
          },
          lines: [
            "باكدج main.",
            "imports.",
            "fmt.",
            "strings.",
            "قفلة.",
            "تعريف interface اسمه Notifier.",
            "method واحدة: بتاخد رقم ورسالة وترجّع error.",
            "قفلة.",
            "نوع أول.",
            "حقل المرسِل.",
            "قفلة.",
            "Email عنده Notify بنفس الشكل بالظبط، فبقى Notifier لوحده.",
            "اطبع بدل ما نبعت فعلًا.",
            "نجاح.",
            "قفلة.",
            R`نوع تاني من غير حقول: [[struct{}]].`,
            "receiver من غير اسم.",
            "لو الرقم مش مصري...",
            "...رجّع error.",
            "قفلة.",
            "اطبع.",
            "نجاح.",
            "قفلة.",
            R`[[_]]: متغير مش هنستخدمه، بس السطر بيتأكد إن SMS بيحقق Notifier.`,
            R`بتاخد slice من أي Notifiers.`,
            "لف.",
            "نادي Notify بتاعة النوع الحقيقي، وشيك على الـ error.",
            "اطبع الفشل.",
            "قفلة.",
            "قفلة.",
            "قفلة.",
            "main.",
            "نوعين مختلفين في نفس الـ slice.",
            "الاتنين يبعتوا.",
            "SMS هيرفض.",
            "قفلة."
          ],
          sol: R`الناتج:
[[email shop@example.com -> +201001234567: طلبك اتشحن]]
[[sms -> +201001234567: طلبك اتشحن]]
[[failed: sms: unsupported number +44700]]

الـ Fake (الكود تحت) بعد [[notifyAll([]Notifier{f}, "+20100", "test")]] بيطبع [[[test]]]. ومن غير [[&]]:
[[cannot use Fake{} (value of struct type Fake) as Notifier value in array or slice literal: Fake does not implement Notifier (method Notify has pointer receiver)]]

ده نفس الـ fake اللي هتستخدمه في الاختبارات: بدل ما تبعت SMS حقيقي، تشيك إن الرسالة اتسجّلت.`,
          solCode: R`type Fake struct {
  Sent []string
}

func (f *Fake) Notify(to, msg string) error {
  f.Sent = append(f.Sent, msg)
  return nil
}

f := &Fake{}
notifyAll([]Notifier{f}, "+20100", "test")
fmt.Println(f.Sent)`
        },
        {
          cmd: "io.Reader و io.Writer",
          title: "io.Reader و io.Writer: أصغر interfaces وأكتر حاجة بتتستخدم في Go",
          desc: R`[[io.Reader]] فيه method واحدة: [[Read(p []byte) (n int, err error)]]: «املالي الـ buffer ده وقولّي ملّيت كام بايت». ولما الداتا تخلص بترجّع [[io.EOF]].
[[io.Writer]] فيه [[Write(p []byte) (n int, err error)]]: «اكتب البايتات دي».

ليه مهمين؟ لأن نص المكتبة القياسية بيتكلم بيهم. الحاجات دي كلها Readers: ملف ([[*os.File]])، و body الطلب في HTTP، و [[strings.NewReader]]، واتصال شبكة، وملف مضغوط بيتفك. والحاجات دي كلها Writers: ملف، و [[os.Stdout]]، و [[http.ResponseWriter]]، و [[strings.Builder]]، و [[bytes.Buffer]]، و hash.

فلو كتبت دالة بتاخد [[io.Reader]]، هتشتغل مع كل ده من غير تعديل، وتختبرها بـ [[strings.NewReader("...")]] من غير ملفات.

أدوات بتشتغل عليهم:
• [[bufio.Scanner]]: يقرا سطر سطر (أو كلمة كلمة).
• [[io.Copy(dst, src)]]: ينقل من Reader لـ Writer على دفعات من غير ما يحمّل الكل في الذاكرة.
• [[fmt.Fprintf(w, ...)]]: يكتب نص منسّق في أي Writer.
• [[io.ReadAll(r)]]: يقرا كله (للحاجات الصغيرة بس).

[[&sb]]: بنبعت عنوان الـ Builder لأن Write method بتاعته على pointer receiver.`,
          example: R`package main

import (
  "bufio"
  "bytes"
  "fmt"
  "io"
  "os"
  "strings"
)

type upperWriter struct {
  w io.Writer
}

// أي نوع عنده Write بالشكل ده بقى io.Writer
func (u upperWriter) Write(p []byte) (int, error) {
  _, err := u.w.Write(bytes.ToUpper(p))
  return len(p), err
}

func countLines(r io.Reader) (int, error) {
  sc := bufio.NewScanner(r)
  n := 0
  for sc.Scan() {
    n++
  }
  return n, sc.Err()
}

func main() {
  n, err := countLines(strings.NewReader("a\nb\nc\n"))
  fmt.Println(n, err)

  var sb strings.Builder
  fmt.Fprintf(&sb, "total=%d", n)
  fmt.Println(sb.String())

  out := upperWriter{w: os.Stdout}
  fmt.Fprintln(out, "hello from go")
  if _, err := io.Copy(out, strings.NewReader("copied\n")); err != nil {
    fmt.Println(err)
  }
}`,
          try: R`اكتب برنامج بيقرا من [[os.Stdin]] ويطبع عدد السطور، وشغّله بـ [[cat main.go | go run .]]. لاحظ إن countLines نفسها متغيّرتش. وبعدين احسب SHA-256 لملف من غير ما تقراه كله: [[h := sha256.New()]] ثم [[io.Copy(h, f)]] ثم [[fmt.Printf("%x\n", h.Sum(nil))]]، وقارن بـ [[sha256sum main.go]].`,
          flag: "script",
          deep: {
            why: R`ملف 5 جيجا مينفعش تقراه كله في الذاكرة. الـ Reader والـ Writer بيخلّوا الداتا تمشي على دفعات (streaming): من الملف للـ hash، أو من الطلب للـ S3، أو من الداتابيز للرد، والذاكرة ثابتة مهما كبر الحجم. وده نفس الكود اللي بيشتغل على نص صغير في الاختبار.`,
            how: R`[[bufio.NewScanner(r)]] بيقرا من r على دفعات وبيقسّم سطور. [[sc.Scan()]] بترجّع true طول ما فيه سطر، و [[sc.Err()]] بعد الـ loop بيقولك لو وقفت بسبب error مش نهاية الداتا. أقصى طول سطر افتراضي 64KB، ولو أكبر لازم [[sc.Buffer(...)]].

upperWriter مثال على «تلف» Writer: بتاخد Writer وتعدّل البايتات قبل ما تعدّيها. نفس الفكرة في gzip.NewWriter و middleware بيعدّ البايتات. والعقد بتاع Write: ترجّع عدد البايتات اللي اتكتبت من p، و error لو أقل من [[len(p)]].

[[io.Copy]] بيستخدم buffer بـ 32KB ويلف: Read ثم Write لحد io.EOF، ومبيرجّعش io.EOF كـ error (ده النهاية الطبيعية).`,
            when: R`أي دالة بتعالج داتا (parse، hash، تحويل، رفع): خليها تاخد [[io.Reader]] وتكتب في [[io.Writer]] بدل ما تاخد اسم ملف أو [[[]byte]]. كده تشتغل مع الملفات والشبكة والاختبار.`,
            mistakes: R`[[io.ReadAll]] على حاجة ممكن تبقى ضخمة (upload من يوزر): استخدم [[io.LimitReader]] أو [[http.MaxBytesReader]]. وتنسى [[sc.Err()]] بعد الـ Scan loop فتفتكر إن الملف خلص وهو وقف بسبب error. وتعامل [[io.EOF]] كـ error حقيقي.`
          },
          lines: [
            "باكدج main.",
            "imports.",
            R`[[bufio]]: قراية بـ buffer وسطر سطر.`,
            R`[[bytes]]: زي strings بس على [[[]byte]].`,
            "fmt.",
            R`[[io]]: الـ interfaces والأدوات.`,
            "os.",
            "strings.",
            "قفلة.",
            "نوع بيلف Writer تاني.",
            "الـ Writer اللي هنكتب فيه في الآخر.",
            "قفلة.",
            "Write: حوّل لحروف كبيرة واكتب في اللي جوّا.",
            "اكتب، وخد الـ error.",
            R`رجّع [[len(p)]]: كتبنا كل اللي جالنا.`,
            "قفلة.",
            R`بتاخد أي [[io.Reader]].`,
            "Scanner بيقسّم سطور.",
            "عدّاد.",
            "طول ما فيه سطر...",
            "...زوّد.",
            "قفلة.",
            "العدد، والـ error لو حصل.",
            "قفلة.",
            "main.",
            "نص في الذاكرة كـ Reader: من غير ملف.",
            "3 و nil.",
            R`[[strings.Builder]]: Writer بيجمّع نص.`,
            R`[[Fprintf]] بتكتب فيه، و [[&sb]] عنوانه.`,
            "اطبع اللي اتجمّع.",
            R`upperWriter فوق [[os.Stdout]].`,
            "Fprintln في أي Writer.",
            R`[[io.Copy]] من Reader لـ Writer.`,
            "لو فشل.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`الناتج:
[[3 <nil>]]
[[total=3]]
[[HELLO FROM GO]]
[[COPIED]]

[[cat main.go | go run .]] بيطبع عدد سطور الملف (الكود تحت)، و countLines هي هي: بس بعتنالها [[os.Stdin]] بدل strings.NewReader.

والـ hash بيطلع نفس الرقم اللي [[sha256sum main.go]] بيطلّعه (64 حرف hex). الملف بيتقري على دفعات 32KB، فلو كان 5 جيجا الذاكرة مش هتزيد.`,
          solCode: R`n, err := countLines(os.Stdin)
fmt.Println(n, err)

f, err := os.Open("main.go")
if err != nil {
  log.Fatal(err)
}
defer f.Close()
h := sha256.New()
if _, err := io.Copy(h, f); err != nil {
  log.Fatal(err)
}
fmt.Printf("%x\n", h.Sum(nil))`
        },
        {
          cmd: "any و type switch",
          title: "any والـ type assertion والـ type switch: تعرف إيه اللي جوّا الـ interface",
          desc: R`[[any]] اسم تاني لـ [[interface{}]]: interface من غير methods، فكل الأنواع بتحققه. يعني متغير من نوع any ممكن يشيل أي حاجة: int أو string أو struct. [[fmt.Println]] بتاخد [[...any]] عشان كده بتطبع أي حاجة.

بس عشان تعمل حاجة بالقيمة لازم ترجّعها لنوعها:
• type assertion: [[n := v.(int)]]: «أنا متأكد إن جوّاه int». لو مش int البرنامج بيعمل panic.
• بالشكل الآمن (comma ok): [[n, ok := v.(int)]]. لو مش int، ok بـ false و n بالقيمة الصفرية، ومفيش panic.
• type switch: [[switch x := v.(type) { case int: ... case string: ... }]]. جوه كل case الـ x بيبقى من النوع ده. والـ case ممكن يبقى interface كمان ([[case fmt.Stringer:]]).

وفيه حاجة لازم تعرفها: [[json.Unmarshal]] في [[map[string]any]] بيحوّل كل الأرقام لـ [[float64]]، والـ arrays لـ [[[]any]]، والـ objects لـ [[map[string]any]].

الـ backticks حوالين الـ JSON في المثال raw string: مش محتاج تعمل escape لعلامات التنصيص اللي جوّاه.`,
          example: R`package main

import (
  "encoding/json"
  "fmt"
)

func describe(v any) string {
  switch x := v.(type) {
  case nil:
    return "nil"
  case int:
    return fmt.Sprintf("int %d", x)
  case string:
    return fmt.Sprintf("string of %d bytes", len(x))
  case []any:
    return fmt.Sprintf("list of %d", len(x))
  case fmt.Stringer:
    return "stringer " + x.String()
  default:
    return fmt.Sprintf("other %T", x)
  }
}

func main() {
  var v any = 42
  n, ok := v.(int)
  fmt.Println(n, ok)
  s, ok := v.(string)
  fmt.Printf("%q %v\n", s, ok)

  fmt.Println(describe(7), describe("سلام"), describe(nil), describe(3.5))

  var data map[string]any
  raw := $__bt{"name":"Sara","age":25,"tags":["a","b"]}$__bt
  if err := json.Unmarshal([]byte(raw), &data); err != nil {
    panic(err)
  }
  fmt.Println(describe(data["age"]), describe(data["tags"]))
}`,
          try: R`اكتب [[s := v.(string)]] (من غير ok) واقرا الـ panic. وبعدين ضيف لـ describe case لـ [[float64]]، وجرّب [[describe(time.Second)]]: هيدخل أنهي case وليه؟`,
          flag: "script",
          deep: {
            why: R`أحيانًا مش عارف النوع وقت الكتابة: JSON شكله مش ثابت، أو رسايل من queue بأنواع مختلفة، أو دالة بتاخد options متنوعة. type switch هو الطريقة الآمنة إنك تتعامل مع ده، بدل ما البرنامج يقع.`,
            how: R`الترتيب في type switch مهم: أول case يطابق بيكسب. [[time.Duration]] أساسه int64 (مش int)، فمش هيدخل [[case int]]، بس عنده [[String()]] فهيدخل [[case fmt.Stringer]] ويطلع [[stringer 1s]].

[[case nil]] بيطابق لو الـ interface نفسه nil. وفي [[default]] الـ x بيفضل نوعه any.

الأرقام في JSON بتبقى float64 لأن JSON مفيهوش فرق بين int و float. فـ [[data["age"].(int)]] هيعمل panic. لو محتاج أرقام صحيحة استخدم struct بحقل int (الأحسن)، أو [[decoder.UseNumber()]].

قبل generics (Go 1.18) كان any بيتستخدم كتير عشان تكتب كود لأكتر من نوع. دلوقتي لو الأنواع معروفة وقت الكتابة، generics أحسن لأن الـ compiler بيشيك عليها (درس generics).`,
            when: R`JSON مش معروف شكله، وقيم في context، و type switch على أنواع errors أو رسايل. لكن لو تقدر تعرّف struct أو interface بـ methods، ده أحسن دايمًا: any بيشيل الحماية بتاعة الـ compiler.`,
            mistakes: R`[[v.(T)]] من غير ok على قيمة جاية من بره فالسيرفر يقع. و [[map[string]any]] في كل حتة بدل struct، فتلاقي نفسك بتعمل assertions في كل سطر. وتتوقع int من JSON وهو float64.`
          },
          lines: [
            "باكدج main.",
            "imports.",
            "encoding/json.",
            "fmt.",
            "قفلة.",
            R`بتاخد [[any]]: أي قيمة.`,
            R`type switch: x جوه كل case بنوع الـ case.`,
            "الـ interface فاضي.",
            "nil.",
            "int.",
            "x هنا int.",
            "string.",
            "x هنا string، فـ len شغالة.",
            R`slice من any (زي arrays الـ JSON).`,
            "طولها.",
            "أي نوع عنده String() (interface).",
            "نادي String.",
            "أي حاجة تانية.",
            R`[[%T]] بيطبع النوع.`,
            "قفلة الـ switch.",
            "قفلة.",
            "main.",
            "any جوّاه int.",
            "assertion آمن (comma ok): n نوعه int.",
            R`[[42 true]].`,
            "مش string: القيمة الصفرية و false، من غير panic.",
            R`[[%q]] بيبيّن إن النص فاضي.`,
            R`int 7، و string of 8 bytes، و nil، و other float64.`,
            "map بقيم any.",
            "JSON في raw string.",
            R`فك الـ JSON في الـ map، و [[&data]] عشان Unmarshal يملاه.`,
            "لو فشل.",
            "قفلة.",
            R`age بقى float64، و tags بقت [[[]any]].`,
            "قفلة."
          ],
          sol: R`الناتج:
[[42 true]]
[["" false]]
[[int 7 string of 8 bytes nil other float64]]
[[other float64 list of 2]]

[[s := v.(string)]] من غير ok: [[panic: interface conversion: interface {} is int, not string]].

و [[describe(time.Second)]] بيرجّع [[stringer 1s]]: Duration مش int (أساسه int64، ونوعه نوع تاني أصلًا)، بس عنده String() فطابق [[fmt.Stringer]]. ولو حطيت [[case float64]] قبل default، [[describe(3.5)]] و [[data["age"]]] هيدخلوه.`
        },
        {
          cmd: "nil interface",
          title: "interface جوّاه nil pointer مش بيساوي nil: أشهر فخ في Go",
          desc: R`قيمة الـ interface جوّاها حاجتين: النوع والقيمة. الـ interface بيساوي [[nil]] بس لو الاتنين فاضيين.

لو عملت [[var e *MyErr]] (pointer بـ nil) ورجّعته كـ [[error]]، الـ error اللي راجع جوّاه: النوع [[*MyErr]] والقيمة nil. النوع مش فاضي، فـ [[err != nil]] بتبقى true، والمستدعي هيفتكر إن فيه error وهو مفيش.

ده بيحصل في كود حقيقي لما دالة بتعرّف متغير من نوع الـ error الخاص بيها وترجّعه في الآخر «عادي». الحل بسيط: الدالة اللي بترجّع [[error]] ترجّع [[nil]] صريحة في حالة النجاح، مش متغير من نوع خاص.

[[func (*MyErr) Error() string { return "my error" }]]: method في سطر واحد، والـ receiver من غير اسم.

و [[(*MyErr)(nil)]] معناها «nil من النوع [[*MyErr]]»: تحويل nil لنوع معيّن عشان نقارن بيه.`,
          example: R`package main

import (
  "errors"
  "fmt"
)

type MyErr struct{}

func (*MyErr) Error() string { return "my error" }

// غلط: بترجّع متغير من نوع *MyErr حتى لو nil
func validateBad(ok bool) error {
  var e *MyErr
  if !ok {
    e = &MyErr{}
  }
  return e
}

// صح: nil صريحة لما مفيش error
func validateGood(ok bool) error {
  if !ok {
    return &MyErr{}
  }
  return nil
}

func main() {
  err := validateBad(true)
  fmt.Println(err == nil)
  fmt.Printf("%T %v\n", err, err == (*MyErr)(nil))

  fmt.Println(validateGood(true) == nil)

  var target *MyErr
  fmt.Println(errors.As(validateGood(false), &target))
}`,
          try: R`نادي [[validateBad(true)]] واكتب [[if err != nil { fmt.Println("فيه error:", err) }]]. هيطبع إيه؟ وبعدين جرّب نفس الفكرة مع interface تاني: [[var s fmt.Stringer]] واديله [[(*time.Location)(nil)]] وشوف [[s == nil]].`,
          flag: "script",
          deep: {
            why: R`ده من أشهر أسئلة انترفيو Go، ومن أصعب الـ bugs لو مكنتش تعرفه: كل حاجة شغالة صح، بس الـ handler بيرجّع 500 «my error» لطلبات ناجحة، أو بيعمل panic لما يحاول يقرا الـ error.`,
            how: R`لما بترجّع e من دالة نوعها الراجع [[error]]، Go بتحوّل [[*MyErr]] لـ error: بتحط النوع ([[*MyErr]]) والقيمة (nil) في الـ interface. المقارنة [[err == nil]] بتسأل «النوع والقيمة الاتنين فاضيين؟» والإجابة لأ.

[[%T]] بيطبع [[*main.MyErr]]: النوع موجود. و [[err == (*MyErr)(nil)]] true: القيمة nil من النوع ده.

ولو حد نادى [[err.Error()]] هنا مش هيقع، لأن Error() مبتقراش أي حقل. لو كانت بتقرا [[e.Field]] كانت هتعمل nil pointer panic.

[[go vet]] مش بيمسك الحالة دي. أدوات زي [[nilness]] في staticcheck أو [[nilaway]] بتحاول.`,
            when: R`خليك فاكرها في أي دالة بترجّع interface (error بالذات): رجّع [[nil]] صريحة. ولو بتبني error بالتدريج ([[var errs []error]])، رجّع [[errors.Join(errs...)]] اللي بترجّع nil لو مفيش.`,
            mistakes: R`[[var err *MyErr; ...; return err]]. ودالة نوعها الراجع [[*MyErr]] (مش error)، والمستدعي بيحطها في [[err error]]: نفس المشكلة. و [[if err != nil]] على interface ميعرفش إنه ممكن يبقى typed nil.`
          },
          lines: [
            "باكدج main.",
            "imports.",
            "errors.",
            "fmt.",
            "قفلة.",
            "نوع error خاص.",
            R`[[*MyErr]] بيحقق error. method في سطر.`,
            R`نوع الراجع [[error]] (interface).`,
            R`متغير [[*MyErr]] قيمته nil.`,
            "لو فشل...",
            "...حط فيه قيمة.",
            "قفلة.",
            R`بيرجّع e حتى لو nil: الـ interface هيبقى فيه نوع.`,
            "قفلة.",
            "النسخة الصح.",
            "فشل...",
            "...رجّع error حقيقي.",
            "قفلة.",
            R`نجاح: [[nil]] صريحة.`,
            "قفلة.",
            "main.",
            "نجاح بالدالة الغلط.",
            "false!",
            R`النوع موجود ([[*main.MyErr]])، والقيمة nil (true).`,
            "النسخة الصح: true.",
            "متغير للـ As.",
            "errors.As لقى النوع: true.",
            "قفلة."
          ],
          sol: R`الناتج:
[[false]]
[[*main.MyErr true]]
[[true]]
[[true]]

[[if err != nil]] مع validateBad(true) بتطبع [[فيه error: my error]] رغم إن مفيش error. والحل تغيّر validateBad تبقى زي validateGood.

و [[s == nil]] مع [[(*time.Location)(nil)]] بتطلع false برضه: نفس الفكرة مع أي interface، مش error بس.`
        },
        {
          cmd: "generics",
          title: "generics: دالة أو نوع واحد لأكتر من نوع، بـ [T any] و constraints",
          desc: R`من Go 1.18 الدالة تقدر تاخد type parameters بين أقواس مربعة قبل الـ parameters العادية:
[[func MaxOf[T cmp.Ordered](items []T) T]]
T هنا «أي نوع يحقق cmp.Ordered» (أرقام ونصوص: أي حاجة ينفع معاها [[<]] و [[>]]). والـ compiler بيستنتج T من القيم: [[MaxOf([]float64{...})]] من غير ما تكتب [[MaxOf[float64]]].

الـ constraint (القيد) هو interface بيحدد الـ T يقدر يعمل إيه:
• [[any]]: أي نوع، بس مش هتقدر تعمل عليه غير حاجات عامة (تخزّن، ترجّع، تبعت).
• [[comparable]]: أي نوع ينفع معاه [[==]] و [[!=]] (مطلوب لمفاتيح الـ map).
• [[cmp.Ordered]]: الأرقام والنصوص.
• interface انت تعمله بقايمة أنواع: [[~int | ~int64 | ~float64]]. الـ [[|]] معناها «أو»، والـ [[~]] معناها «النوع ده أو أي نوع أساسه هو» (يعني [[type Money int64]] يدخل في [[~int64]]).

والأنواع كمان ممكن تبقى generic: [[type Stack[T any] struct { items []T }]]، وبتستخدمه [[Stack[string]]].

[[var zero T]] أسهل طريقة تجيب القيمة الصفرية لأي T (عشان ترجّعها لما مفيش قيمة).

المكتبة القياسية مليانة generics دلوقتي: [[slices]] و [[maps]] و [[cmp]] و [[sync.OnceValue]].`,
          example: R`package main

import (
  "cmp"
  "fmt"
)

func Map[T, U any](items []T, f func(T) U) []U {
  out := make([]U, 0, len(items))
  for _, it := range items {
    out = append(out, f(it))
  }
  return out
}

func MaxOf[T cmp.Ordered](items []T) T {
  best := items[0]
  for _, it := range items[1:] {
    if it > best {
      best = it
    }
  }
  return best
}

func Index[T comparable](items []T, target T) int {
  for i, it := range items {
    if it == target {
      return i
    }
  }
  return -1
}

type Number interface {
  ~int | ~int64 | ~float64
}

func Sum[T Number](nums ...T) T {
  var total T
  for _, n := range nums {
    total += n
  }
  return total
}

type Stack[T any] struct {
  items []T
}

func (s *Stack[T]) Push(v T) { s.items = append(s.items, v) }

func (s *Stack[T]) Pop() (T, bool) {
  var zero T
  if len(s.items) == 0 {
    return zero, false
  }
  v := s.items[len(s.items)-1]
  s.items = s.items[:len(s.items)-1]
  return v, true
}

func main() {
  squares := Map([]int{1, 2, 3}, func(n int) string { return fmt.Sprint(n * n) })
  fmt.Println(squares, len(squares[2]))
  fmt.Println(MaxOf([]float64{2.5, 9.1, 4}), MaxOf([]string{"b", "z", "a"}))
  fmt.Println(Index([]string{"go", "js"}, "js"), Sum(1.5, 2.5), Sum[int]())

  var s Stack[string]
  s.Push("a")
  s.Push("b")
  v, ok := s.Pop()
  fmt.Println(v, ok, len(s.items))
}`,
          try: R`اكتب [[Filter[T any](items []T, keep func(T) bool) []T]] وجرّبها تطلّع الأرقام الزوجية من [[[]int{1, 2, 3, 4}]] والكلمات اللي أطول من 2 من [[[]string{"go", "rust", "c"}]]. وبعدين جرّب [[MaxOf([]bool{true, false})]] واقرا الـ error.`,
          flag: "script",
          deep: {
            why: R`قبل generics كنت بتكتب نفس الدالة لـ int ولـ float64 ولـ string، أو تستخدم any وتخسر حماية الـ compiler وتعمل assertions. generics بتخليك تكتب الكود مرة، والـ compiler لسه بيمنعك تبعت نوع غلط.`,
            how: R`[[Map[T, U any]]]: نوعين، T للداخل و U للخارج. Go بتستنتجهم من الـ slice ومن الدالة اللي بعتها.

[[items[1:]]] من التاني للآخر. و MaxOf بتعمل panic على slice فاضية (زي [[slices.Max]]).

[[Sum[int]()]]: هنا لازم تكتب النوع لأن مفيش قيم يستنتج منها.

الـ methods على النوع الـ generic بتكتب [[(s *Stack[T])]]. بس الـ methods نفسها مينفعش ياخدوا type parameters جديدة غير بتاعة النوع.

[[fmt.Sprint(n * n)]] بيحوّل الرقم لنص (زي Println من غير طباعة).

جوه الـ generic الـ compiler بيسمحلك بس بالعمليات اللي الـ constraint بيضمنها: [[+=]] شغالة في Sum لأن كل أنواع Number بتدعم الجمع، لكن [[>]] مش هتشتغل على T any.`,
            when: R`دوال على collections (Map و Filter و GroupBy)، و data structures (Stack و Queue و Cache و Set)، و helpers زي [[Ptr[T any](v T) *T]]. لكن متعملش interface أو struct generic لأي حاجة: لو الكود بيشتغل بـ interface عادي بـ methods (زي io.Reader) خليه كده. القاعدة: لو لقيت نفسك بتكتب نفس الكود لأكتر من نوع، ساعتها generics.`,
            mistakes: R`تستخدم generics في كل حتة فالكود يبقى صعب القراية. و [[T any]] وانت محتاج [[==]] (لازم comparable). وتنسى [[~]] فالأنواع المعرّفة ([[type Money int64]]) متدخلش. ونوع غلط زي [[MaxOf([]bool{...})]] بيطلع [[bool does not satisfy cmp.Ordered]].`
          },
          lines: [
            "باكدج main.",
            "imports.",
            R`[[cmp]]: فيها cmp.Ordered و cmp.Compare.`,
            "fmt.",
            "قفلة.",
            R`نوعين: T للداخل و U للناتج، وبتاخد دالة من T لـ U.`,
            "slice بالمساحة الصح.",
            "لف.",
            "طبّق الدالة وضيف.",
            "قفلة.",
            "رجّع.",
            "قفلة.",
            R`T لازم يحقق [[cmp.Ordered]] (ينفع معاه >).`,
            "ابدأ بالأول.",
            "لف على الباقي.",
            R`[[>]] مسموحة بسبب الـ constraint.`,
            "خزّن الأكبر.",
            "قفلة.",
            "قفلة.",
            "رجّع.",
            "قفلة.",
            R`[[comparable]]: ينفع معاه ==.`,
            "لف.",
            "قارن.",
            "رجّع المكان.",
            "قفلة.",
            "قفلة.",
            "مش موجود.",
            "قفلة.",
            "constraint انت عامله: قايمة أنواع.",
            R`[[~]]: النوع أو أي نوع أساسه هو، و [[|]] أو.`,
            "قفلة.",
            "بتاخد أي عدد من أي Number.",
            R`القيمة الصفرية لـ T.`,
            "لف.",
            R`[[+=]] مسموحة: كل الأنواع دي بتتجمع.`,
            "قفلة.",
            "رجّع.",
            "قفلة.",
            R`نوع generic: [[Stack[T]]].`,
            "slice من T.",
            "قفلة.",
            "Push في سطر.",
            "Pop بترجّع القيمة و ok.",
            "القيمة الصفرية لـ T.",
            "لو فاضية...",
            "...رجّع الصفرية و false.",
            "قفلة.",
            "آخر عنصر.",
            "شيله.",
            "رجّعه.",
            "قفلة.",
            "main.",
            "T = int و U = string، اتستنتجوا لوحدهم.",
            R`[[[1 4 9]]]، و طول "9" = 1.`,
            "T = float64 ثم string.",
            "1، و 4، و 0 (النوع مكتوب لأن مفيش قيم).",
            "Stack من strings.",
            "حط a.",
            "حط b.",
            "طلّع آخر واحد.",
            "b true 1.",
            "قفلة."
          ],
          sol: R`الناتج:
[[[1 4 9] 1]]
[[9.1 z]]
[[1 4 0]]
[[b true 1]]

Filter (الكود تحت) بترجّع [[[2 4]]] و [[[rust]]]. و [[MaxOf([]bool{true, false})]] بيطلع:
[[bool does not satisfy cmp.Ordered (bool missing in ~int | ~int8 | ... | ~string)]]
(الرسالة الحقيقية فيها القايمة كلها). يعني الـ compiler منعك قبل التشغيل، وده الفرق عن any.`,
          solCode: R`func Filter[T any](items []T, keep func(T) bool) []T {
  var out []T
  for _, it := range items {
    if keep(it) {
      out = append(out, it)
    }
  }
  return out
}

evens := Filter([]int{1, 2, 3, 4}, func(n int) bool { return n%2 == 0 })
long := Filter([]string{"go", "rust", "c"}, func(s string) bool { return len(s) > 2 })
fmt.Println(evens, long)`
        }
      ]
    }
]);
