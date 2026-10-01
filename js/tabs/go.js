// تاب Go (Golang)
// نفس شكل الدروس اللي في js.js (الشرح فوق الملف ده هناك). أمثلة Go هنا كود حقيقي بيتعمله compile:
// التعليقات فيه بـ // زي Go بالظبط، والـ indentation مسافتين (go fmt بيحوّلها tabs لما تحفظ).
// ولو محتاج backtick جوه R`...` (struct tags أو raw strings) اكتبه $__bt.

TAB("go", {
  label: "Go (Golang)",
  prompt: "$ ",
  lab: R`go version
mkdir -p lab/go/hello && cd lab/go/hello
go mod init example.com/hello
go run .`,
  labText: "اعمل فولدر lab/go، وجوّاه فولدر لكل تجربة فيه go mod init مرة واحدة وملف main.go، وشغّله بـ go run . ولو مش عايز تسطّب Go على جهازك، Docker كفاية: docker run --rm -it -v \"$PWD\":/src -w /src golang:1.25 go run .",
  levels: {
    "1": ["اللغة من الصفر", "التسطيب و go mod، والمتغيرات والأنواع والنص العربي، و for و switch والدوال، و slices و maps و structs والـ pointers، والأخطاء و defer والباكدجات"],
    "2": ["اللغة بجد والويب", "interfaces و generics، و goroutines و channels و select و Mutex و context، وسيرفر net/http بالـ routing و JSON و middleware، والـ HTTP client وقاعدة البيانات وهيكل المشروع"],
    "3": ["الإنتاج", "الاختبارات و httptest و benchmarks و fuzzing و pprof، و slog والإغلاق النضيف و Docker والـ cross-compile، و worker pools والفريموركات، وأسئلة الانترفيو ومشروع API كامل"]
  },
  categories: [
    {
      t: "البداية: التسطيب وأول برنامج",
      l: 1,
      n: "تسطّب Go، وتعمل module، وتشغّل وتبني أول برنامج، وتخلّي الأدوات تظبط الكود وتراجعه",
      items: [
        {
          cmd: "go version",
          title: "تسطّب Go وتتأكد إنها شغالة",
          desc: R`Go لغة compiled: الكود بيتحوّل لملف تنفيذي (binary) قبل ما يشتغل، مش بيتقري سطر سطر وقت التشغيل زي Python أو JavaScript. وكل الأدوات اللي هتحتاجها (الـ compiler، والـ formatter، والاختبارات، وتنزيل المكتبات) جاية في أمر واحد اسمه [[go]].

التسطيب:
• لينكس: نزّل الأرشيف من [[go.dev/dl]] وفكّه في [[/usr/local/go]]، وضيف [[/usr/local/go/bin]] للـ PATH. نسخة apt غالبًا قديمة.
• ماك: [[brew install go]] أو ملف الـ pkg من نفس الموقع.
• ويندوز: ملف الـ msi من نفس الموقع، أو جوه WSL زي لينكس بالظبط.
• من غير تسطيب خالص: [[docker run --rm golang:1.25 go version]].

[[go version]] بيقولك النسخة والنظام. و [[go env]] بيطبع إعدادات الأداة، وأهمها [[GOPATH]] (افتراضيًا [[~/go]]): فيه كاش المكتبات اللي بتنزل ([[~/go/pkg/mod]]) والبرامج اللي بتسطّبها بـ [[go install]] ([[~/go/bin]]).

Go بتطلع نسخة كبيرة كل ٦ شهور تقريبًا (فبراير وأغسطس). وفيه وعد اسمه Go 1 compatibility: الكود اللي اتكتب لـ Go 1.0 سنة 2012 لسه بيتعمله compile النهارده، فالترقية عادةً آمنة. الدروس هنا محتاجة Go 1.22 أو أحدث، والأمثلة اتجربت على 1.25.`,
          example: R`# لينكس: امسح أي نسخة قديمة وفك الأرشيف اللي نزّلته من go.dev/dl
sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go1.25.1.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' >> ~/.bashrc && source ~/.bashrc
go version
go env GOPATH GOOS GOARCH
go help`,
          try: R`سطّب Go (أو استخدم صورة Docker) واكتب [[go version]] و [[go env GOPATH GOOS GOARCH]]. وبعدين اكتب [[go help]]، اختار أمر مش عارفه، واقرا شرحه بـ [[go help <الأمر>]] (مثلًا [[go help mod]]).`,
          deep: {
            why: R`في لغات تانية بتسطّب compiler، وبعدين package manager، وبعدين formatter، وبعدين test runner، وكل فريق بيختار مجموعة مختلفة. في Go كل ده جوه [[go]] نفسه، فأي مشروع Go تفتحه هتلاقي نفس الأوامر: [[go build]] و [[go test]] و [[go fmt]]. وده من أسباب إن الشركات بتختارها للسيرفرات وأدوات الـ DevOps (Docker و Kubernetes و Terraform مكتوبين بيها).`,
            how: R`[[GOROOT]] هو مكان Go نفسها ([[/usr/local/go]])، ومش محتاج تغيّره. [[GOPATH]] مكان شغلك انت: الكاش والأدوات. زمان كان لازم كودك يبقى جوه GOPATH، من أيام go modules (Go 1.11) ده مبقاش مطلوب، والمشروع ممكن يبقى في أي فولدر.

[[GOOS]] و [[GOARCH]] النظام والمعالج اللي هتبني ليهم (زي [[linux]] و [[amd64]]). هترجعلهم في درس الـ cross-compile.

ولو فتحت مشروع مكتوب في go.mod بتاعه نسخة أحدث من اللي عندك، أداة go بتنزّل الـ toolchain المطلوبة لوحدها (ده الإعداد [[GOTOOLCHAIN=auto]]، من Go 1.21). فمش لازم تجري تحدّث كل ما مشروع يطلب نسخة جديدة.`,
            when: R`أول مرة على أي جهاز. وفي CI بتستخدم صورة [[golang:1.25]] أو [[actions/setup-go]] بنسخة محددة، وعلى السيرفر غالبًا مش محتاج Go أصلًا: بتنسخ الـ binary بس.`,
            mistakes: R`تنسى تضيف [[/usr/local/go/bin]] للـ PATH فيطلعلك [[go: command not found]]. وتفك الأرشيف فوق نسخة قديمة من غير [[rm -rf]] فتتخلط ملفات النسختين وتطلع errors غريبة (التوثيق الرسمي محذّر من ده بالاسم). وتسطّب من apt نسخة قديمة فحاجات زي [[for i := range 10]] متشتغلش (محتاجة 1.22).`
          },
          lines: [
            R`بيمسح نسخة Go القديمة لو موجودة، ويفك الأرشيف في [[/usr/local]] فيبقى عندك [[/usr/local/go]]. ([[&&]] معناها: نفّذ اللي بعدها بس لو اللي قبلها نجح.)`,
            R`بيضيف فولدر أمر go وفولدر الأدوات اللي هتسطّبها ([[~/go/bin]]) للـ PATH، في [[.bashrc]] عشان يفضل في كل ترمنال جديد.`,
            R`بيطبع النسخة والنظام والمعالج.`,
            R`بيطبع ٣ إعدادات بس من [[go env]] بدل القايمة كلها.`,
            R`قايمة كل أوامر go مع سطر شرح لكل واحد.`
          ],
          sol: R`[[go version]] بيطبع حاجة زي [[go version go1.25.1 linux/amd64]] (على ماك M1 أو أحدث: [[darwin/arm64]]، وعلى ويندوز [[windows/amd64]]).

و [[go env GOPATH GOOS GOARCH]] بيطبع ٣ سطور:
[[/home/you/go]]
[[linux]]
[[amd64]]

لو طلعلك [[command not found]] افتح ترمنال جديد (أو [[source ~/.bashrc]]) واتأكد إن [[/usr/local/go/bin]] في [[echo $PATH]].`
        },
        {
          cmd: "مقدمة Go وكتابة أول برنامج",
          title: "أول برنامج: package main و import و func main",
          desc: R`Go اتعملت في Google سنة 2009 (Robert Griesemer و Rob Pike و Ken Thompson) عشان مشكلة محددة: سيرفرات كبيرة، وفرق كبيرة، وكود الـ C++ بياخد وقت طويل في الـ compile وصعب يتقري. فالهدف كان لغة بسيطة (فيها 25 كلمة محجوزة بس)، الـ compile فيها سريع، وفيها أدوات للتزامن (concurrency) جوه اللغة نفسها. النتيجة لغة مملة بشكل مقصود: الكود بتاع أي حد شبه كود أي حد تاني.

أي برنامج Go بيبدأ كده:
• [[package main]]: كل ملف Go جزء من باكدج. الباكدج اللي اسمها [[main]] بالذات معناها «ده برنامج بيتشغّل»، مش مكتبة.
• [[import "fmt"]]: الباكدجات اللي الملف محتاجها. [[fmt]] للطباعة والتنسيق، و [[os]] للتعامل مع نظام التشغيل. ولو أكتر من واحدة بتتكتب جوه [[import ( ... )]].
• [[func main() { ... }]]: نقطة البداية. [[func]] كلمة تعريف الدالة، والأقواس [[()]] فيها الـ parameters (هنا مفيش)، والأقواس المعووجة [[{ }]] فيها جسم الدالة. البرنامج بيخلص لما main تخلص.

وجوه main:
• [[name := "يا عالم"]]: [[:=]] بتعرّف متغير جديد وتديله قيمة في خطوة واحدة، والنوع (هنا string) بيتستنتج من القيمة.
• [[os.Args]]: الكلام اللي كتبته بعد اسم البرنامج في الترمنال. [[os.Args[0]]] اسم البرنامج نفسه، فأول كلمة بعده في [[os.Args[1]]].
• [[fmt.Println]]: بيطبع القيم بمسافة بينها وسطر جديد في الآخر. الحرف الكبير في [[Println]] معناه إنها exported (متاحة بره باكدج fmt)، وده قانون في Go هتشوفه كتير.

مفيش [[;]] في آخر السطور: الـ compiler بيحطها لوحده. وعشان كده [[{]] لازم تيجي في نفس سطر [[func]] أو [[if]]، مش في سطر لوحدها.`,
          example: R`package main

import (
  "fmt"
  "os"
)

// البرنامج بيبدأ من main
func main() {
  name := "يا عالم"
  // لو كتبت اسم بعد البرنامج في الترمنال نستخدمه
  if len(os.Args) > 1 {
    name = os.Args[1]
  }
  fmt.Println("أهلًا", name)
}`,
          try: R`اعمل فولدر [[lab/go/hello]]، وجوّاه [[go mod init example.com/hello]]، واحفظ الكود في [[main.go]]. شغّله بـ [[go run .]] وبعدين بـ [[go run . سارة]]. وبعدين جرّب ٣ أخطاء واقرا رسالة الـ compiler في كل مرة: (١) انقل [[{]] بتاعة main لسطر لوحدها، (٢) ضيف [[import "strings"]] من غير ما تستخدمها، (٣) اكتب [[age := 30]] جوه main من غير ما تستخدمه.`,
          flag: "script",
          deep: {
            why: R`Go بقت لغة الـ cloud: Docker و Kubernetes و Terraform و Prometheus و Caddy مكتوبين بيها، وشركات كتير بتكتب بيها الـ backend والـ microservices. السبب مش إنها «أسرع لغة» (C و Rust و C++ أسرع في حاجات كتير)، السبب إنها توازن كويس: سريعة كفاية، والـ binary واحد سهل تنشره، والتزامن سهل، وأي مبرمج جديد يقرا الكود بسرعة.`,
            how: R`[[go run .]] بيعمل compile للباكدج اللي في الفولدر ده في مكان مؤقت ويشغّلها. الكلام اللي بعد [[.]] بيروح للبرنامج في [[os.Args]].

الـ compiler صارم في حاجتين هتقابلهم من أول يوم: import مش مستخدم ([["strings" imported and not used]]) ومتغير متعرّف ومش مستخدم ([[declared and not used: age]]) الاتنين errors مش تحذيرات. الفكرة إن الكود الميت ميتراكمش. وأداة [[goimports]] أو إضافة Go في VS Code بتضيف وتشيل الـ imports لوحدها وانت بتحفظ.

[[len(os.Args)]]: [[len]] دالة مبنية في اللغة بترجع الطول.`,
            when: "كل برنامج بيتشغّل (سيرفر، أداة CLI، worker) فيه package main و func main واحدة بس. المكتبات (اللي بتعملها import) بيبقى اسم الباكدج بتاعها حاجة تانية ومفيهاش main.",
            mistakes: R`تكتب [[{]] في سطر لوحدها زي C# أو Java فيطلعلك [[syntax error: unexpected semicolon or newline before {]]. وتسمّي الباكدج حاجة غير main وتحاول تشغّلها فيقولك [[package command-line-arguments is not a main package]]. وتستخدم [[go run main.go]] وانت عندك أكتر من ملف: هيشوف الملف ده بس، فاستخدم [[go run .]].`
          },
          lines: [
            R`الملف ده جزء من الباكدج [[main]]: يعني برنامج بيتشغّل، مش مكتبة.`,
            R`بداية قايمة الـ imports بين قوسين.`,
            R`[[fmt]]: الطباعة والتنسيق.`,
            R`[[os]]: التعامل مع النظام، وهنا عشان [[os.Args]].`,
            "قفلة الـ imports.",
            R`تعريف دالة [[main]]: نقطة البداية. [[{]] لازم في نفس السطر.`,
            R`متغير جديد بـ [[:=]]، ونوعه string من القيمة.`,
            R`[[if]] من غير أقواس حوالين الشرط، بس [[{ }]] إجبارية. لو فيه كلمة بعد اسم البرنامج...`,
            R`...غيّر قيمة name بـ [[=]] (متغير موجود قبل كده، فمش [[:=]]).`,
            "قفلة الـ if.",
            "اطبع الترحيب: Println بتحط مسافة بين القيم وسطر جديد في الآخر.",
            "قفلة main: البرنامج بيخلص هنا."
          ],
          sol: R`[[go run .]] بيطبع [[أهلًا يا عالم]]، و [[go run . سارة]] بيطبع [[أهلًا سارة]].

والأخطاء التلاتة:
(١) [[{]] في سطر لوحدها: [[./main.go:10:1: syntax error: unexpected semicolon or newline before {]]. السبب إن الـ compiler حط [[;]] لوحده في آخر سطر [[func main()]].
(٢) [[./main.go:6:3: "strings" imported and not used]].
(٣) [[./main.go:10:3: declared and not used: age]].

الأرقام (السطر والعمود) هتختلف حسب مكان التعديل عندك. ولاحظ إن الـ compile بيقف، يعني البرنامج مش بيشتغل خالص لحد ما تصلّح.`
        },
        {
          cmd: "go mod init",
          title: "كل مشروع Go هو module: go.mod و go.sum",
          desc: R`الـ module هو المشروع: فولدر فيه ملف [[go.mod]] بيقول اسم المشروع ونسخة Go والمكتبات اللي محتاجها. أي فولدر تحته (من غير go.mod تاني) جزء من نفس الـ module.

[[go mod init example.com/hello]] بيعمل go.mod. الاسم ده اسمه module path، وهو اللي هيتكتب في أي import من المشروع. لو المشروع هيترفع على GitHub خليه [[github.com/اسمك/المشروع]] عشان الناس تقدر تعمله import. لو لعب محلي أي اسم يمشي.

[[go get github.com/google/uuid@latest]] بينزّل مكتبة ويسجّلها في go.mod. و [[go mod tidy]] أهم أمر فيهم: بيقرا الـ imports في كودك، يضيف الناقص، ويشيل اللي مبقاش مستخدم. اتعوّد تشغّله بعد ما تضيف أو تشيل import.

[[go.sum]] فيه hash (بصمة) لكل نسخة مكتبة نزلت. Go بتقارن بيه كل مرة، فلو حد غيّر محتوى نسخة بعد ما اتنشرت، البناء يقع بدل ما يسحب كود متغيّر. go.mod و go.sum الاتنين يترفعوا على git، ومحدش بيعدّل go.sum بإيده.`,
          example: R`mkdir hello && cd hello
go mod init example.com/hello
cat go.mod
go get github.com/google/uuid@latest
go mod tidy
go list -m all`,
          try: R`في فولدر جديد اعمل [[go mod init example.com/hello]]، واكتب main.go بيطبع [[uuid.NewString()]] (import [["github.com/google/uuid"]]). شغّله بـ [[go run .]] قبل ما تعمل أي حاجة تانية واقرا الـ error. بعدها [[go mod tidy]] وشغّل تاني، وافتح go.mod و go.sum وشوف اتغيّروا إزاي.`,
          deep: {
            why: R`قبل modules (Go 1.11، سنة 2018) كان كل الكود لازم يبقى جوه فولدر واحد اسمه GOPATH، ومكانش فيه طريقة رسمية تقول «المشروع ده محتاج نسخة كذا من المكتبة». go.mod حل ده: كل مشروع بيحدد نسخه، والبناء بيطلع نفس النتيجة على أي جهاز.`,
            how: R`go.mod بيبقى فيه سطر [[module]] (الاسم)، وسطر [[go 1.25.14]] (أقل نسخة Go المشروع محتاجها، و go mod init بيكتب نسختك)، وبلوك [[require]] بالمكتبات ونسخها. المكتبات اللي مكتبتك بتحتاجها (مش انت مباشرة) بيتكتب جنبها [[// indirect]].

Go بتستخدم طريقة اسمها Minimal Version Selection: بتختار أقل نسخة بتحقق كل المتطلبات، مش آخر نسخة نزلت. فلو محدش غيّر go.mod، البناء النهارده زي البناء بعد سنة، من غير lock file منفصل زي package-lock.

المكتبات بتنزل من [[proxy.golang.org]] (كاش عام)، والبصمات بتتراجع على [[sum.golang.org]]. ولو المكتبة وصلت v2 أو أكتر، رقم النسخة بيبقى جزء من المسار: [[github.com/jackc/pgx/v5]].

[[go list -m all]] بيعرض كل المكتبات اللي داخلة في البناء بنسخها. و [[go mod why <مكتبة>]] بيقولك مين جايبها.`,
            when: R`مرة واحدة في أول المشروع ([[go mod init]])، و [[go get]] لما تضيف مكتبة أو تحدّثها ([[go get -u ./...]] تحدّث الكل)، و [[go mod tidy]] قبل كل commit فيه تغيير في الـ imports.`,
            mistakes: R`تعمل [[go mod init]] في فولدر الـ home أو فولدر فوق المشروع فكل حاجة تحته تبقى module واحد. وتنسى [[go mod tidy]] فالـ CI يقع بـ [[missing go.sum entry]]. وتعدّل go.sum بإيدك أو تحطه في [[.gitignore]]. وتكتب import بمسار مش مطابق للـ module path (تكتب [[hello/internal/x]] والـ module اسمه [[example.com/hello]]).`
          },
          lines: [
            R`فولدر جديد للمشروع وتدخله.`,
            R`بيعمل go.mod باسم الـ module.`,
            R`تشوف محتواه: سطر [[module]] وسطر [[go]] بالنسخة.`,
            R`بينزّل مكتبة uuid ويسجّلها في go.mod (ولسه محدش بيستخدمها، فهتتعلّم [[// indirect]]).`,
            R`بيرتّب go.mod و go.sum على حسب الـ imports الحقيقية في الكود.`,
            "كل الـ modules الداخلة في البناء بنسخها."
          ],
          sol: R`[[go run .]] قبل tidy بيقول:
[[main.go:5:2: no required module provides package github.com/google/uuid; to add it:]]
[[	go get github.com/google/uuid]]

بعد [[go mod tidy]] الـ go.mod بيبقى كده (النسخ ممكن تبقى أحدث عندك):
[[module example.com/hello]]
[[go 1.25.14]] (نسخة Go اللي عملت بيها init)
[[require github.com/google/uuid v1.6.0]]

و go.sum فيه سطرين للمكتبة: واحد لمحتواها كله وواحد لملف go.mod بتاعها ([[/go.mod]] في آخره). و [[go run .]] بيطبع UUID جديد كل مرة زي [[3f2b8c1e-9a4d-4c6b-8e7f-2d1a0b9c8e7f]].`,
          solCode: R`package main

import (
  "fmt"

  "github.com/google/uuid"
)

func main() {
  fmt.Println(uuid.NewString())
}`
        },
        {
          cmd: "go run و go build",
          title: "go run للتجربة، و go build للملف اللي هتشغّله على السيرفر",
          desc: R`[[go run .]] بيعمل compile في فولدر مؤقت، يشغّل، ويمسح الناتج. مناسب وانت بتكتب وبتجرّب. النقطة [[.]] معناها «الباكدج اللي في الفولدر ده» (كل ملفات .go فيه)، وده أحسن من [[go run main.go]] لأن الأخيرة بتشوف ملف واحد بس.

[[go build -o app .]] بيطلع ملف تنفيذي اسمه app. الملف ده لوحده كفاية: مش محتاج Go على السيرفر، ولا node_modules، ولا runtime متسطب. بتنسخه وتشغّله. ده من أكبر أسباب انتشار Go في أدوات السيرفرات والـ CLI.

[[go install]] بيبني ويحط الملف في [[~/go/bin]]، ومع [[@latest]] بيسطّب أدوات من النت مباشرة.

و [[-ldflags="-s -w"]] بيشيل معلومات الـ debug من الملف فيصغر حجمه (بس الـ stack traces بتفضل شغالة). و [[-X]] جوه ldflags بيحط قيمة في متغير وقت البناء، زي رقم النسخة.`,
          example: R`go run .
go run . --port 9090
go build -o app .
./app
ls -lh app
go build -ldflags="-s -w -X main.version=1.0.0" -o app .
go install golang.org/x/tools/cmd/goimports@latest`,
          try: R`اعمل برنامج بيطبع [[os.Args]] وفيه [[var version = "dev"]] بيطبعه برضه. جرّب [[go run . a b c]]، وبعدين [[go build -o app .]] وشغّل [[./app a b]]، وبعدين ابنيه بـ [[-ldflags="-s -w -X main.version=1.0.0"]] وقارن الحجم بـ [[ls -lh]] وشوف version اتغيّرت.`,
          deep: {
            why: R`في Node أو Python النشر معناه تنقل الكود وتسطّب runtime ومكتبات على السيرفر. في Go بتنقل ملف واحد. ده بيبسّط Docker (صورة فيها الملف بس)، وبيخلي أدوات CLI زي [[gh]] و [[kubectl]] و [[terraform]] تتوزّع كملف واحد تنزّله وتشغّله.`,
            how: R`الـ compile في Go سريع نسبيًا لأن اللغة متصممة عشان كده: مفيش header files، والـ imports اللي مش مستخدمة ممنوعة، وكل باكدج بتتبني مرة وتتحفظ في build cache ([[go env GOCACHE]]). فالمرة التانية بتبني اللي اتغيّر بس.

الـ binary فيه الـ runtime بتاع Go (الـ garbage collector والـ scheduler بتاع الـ goroutines)، عشان كده hello world حجمه حوالي ٢ ميجا مش كام كيلو زي C.

الكلام اللي بعد [[go run .]] بيروح للبرنامج مش لأداة go، فـ [[--port 9090]] هتلاقيها في [[os.Args]] (أو تقراها بالباكدج [[flag]]).`,
            when: R`[[go run]] وانت بتطوّر. [[go build]] للنشر وفي Dockerfile وفي CI. [[go install pkg@version]] لتسطيب أدوات (linters، مولّدات كود).`,
            mistakes: R`ترفع الـ binary على git: حطه في [[.gitignore]]. وتبني على ماك وتنسخ الملف لسيرفر لينكس فيطلع [[exec format error]] (الحل في درس [[GOOS و GOARCH]]). وتستخدم [[go run main.go]] في مشروع فيه أكتر من ملف فيطلع [[undefined: helper]] رغم إن الدالة موجودة في ملف تاني.`
          },
          lines: [
            "compile وتشغيل الباكدج اللي في الفولدر ده، من غير ما يسيب ملف.",
            R`نفس الكلام، و [[--port 9090]] بتروح للبرنامج في [[os.Args]].`,
            R`بناء ملف تنفيذي اسمه app ([[-o]] اسم الناتج).`,
            "تشغيله مباشرة: مش محتاج go خالص.",
            "حجمه.",
            R`بناء أصغر من غير معلومات debug، و [[-X]] بيحط 1.0.0 في متغير version بتاع باكدج main.`,
            R`بيبني الأداة ويحطها في [[~/go/bin]].`
          ],
          sol: R`[[go run . a b c]] بيطبع حاجة زي [[[/tmp/go-build1234/b001/exe/hello a b c] dev]]: أول عنصر مسار مؤقت لأن go run بني في فولدر مؤقت. و [[./app a b]] بيطبع [[[./app a b] dev]].

الحجم: hello world عادي حوالي 2.2M، ومع [[-s -w]] حوالي 1.5M. وبعد [[-X main.version=1.0.0]] البرنامج بيطبع [[1.0.0]] بدل [[dev]].

شرط [[-X]]: المتغير لازم يبقى [[var]] من نوع string على مستوى الباكدج (مش [[const]] ومش جوه دالة)، وإلا القيمة مش هتتغيّر ومن غير أي error.`,
          solCode: R`package main

import (
  "fmt"
  "os"
)

var version = "dev"

func main() {
  fmt.Println(os.Args, version)
}`
        },
        {
          cmd: "go fmt و go vet",
          title: "go fmt و go vet: أدوات بتظبط شكل الكود وتمسك أخطاء قبل التشغيل",
          desc: R`في Go مفيش نقاش على شكل الكود: [[gofmt]] بيحدد شكل واحد (tabs للـ indentation، ومكان الأقواس، والمسافات، ومحاذاة الحقول). [[go fmt ./...]] بيعيد كتابة الملفات بالشكل ده. و [[./...]] معناها «الفولدر ده وكل الفولدرات اللي تحته». إضافة Go في VS Code (أو أي محرر) بتعمل ده لوحدها مع كل حفظ.

[[go vet ./...]] بيدوّر على أخطاء الـ compiler مش بيمسكها: [[Printf]] بنوع أو عدد قيم مش مطابق للـ %، أو نسخ Mutex، أو struct tag مكتوب غلط، أو كود بعد return مش هيتنفذ. [[go test]] بيشغّل جزء منه لوحده.

[[gofmt -l .]] بيقولك أسماء الملفات اللي شكلها مش مظبوط من غير ما يغيّرها (مفيد في CI)، و [[gofmt -d]] بيوريك الفرق.

وللمراجعة الأعمق: [[staticcheck]] أو [[golangci-lint]] (بيجمع linters كتير في أمر واحد) في CI.`,
          example: R`go fmt ./...
go vet ./...
gofmt -l .
gofmt -d main.go
go install honnef.co/go/tools/cmd/staticcheck@latest
staticcheck ./...`,
          try: R`اكتب [[fmt.Printf("%d\n", "text")]] في main.go وشغّل [[go run .]] وبعدين [[go vet .]]. وبعدين بوّظ الـ indentation بإيدك (مسافات عشوائية) وشغّل [[gofmt -d main.go]] وبعدين [[go fmt ./...]].`,
          deep: {
            why: R`الـ code review بيضيع وقت كتير على المسافات ومكان الأقواس. gofmt شال الموضوع ده من الأساس: كل كود Go في العالم شكله واحد، فتقرا أي مكتبة كأنك انت كاتبها. و vet بيمسك أخطاء حقيقية بتعدّي من الـ compiler وبتطلع في الإنتاج.`,
            how: R`[[go fmt]] بيشغّل [[gofmt -l -w]] على ملفات الباكدجات. [[goimports]] نفس الكلام وكمان بيرتّب الـ imports ويضيف الناقص (اختاره في إعدادات المحرر).

[[go vet]] مجموعة analyzers: [[printf]] (الـ verbs والقيم)، و [[copylocks]] (نسخ Mutex بالقيمة)، و [[structtag]]، و [[unreachable]]، و [[lostcancel]] (context.WithCancel من غير cancel)، وغيرهم. مش بيطلع إنذارات كتير على الفاضي، فلو طلّع حاجة صدّقه.`,
            when: R`fmt مع كل حفظ. vet و staticcheck في CI على كل pull request، والـ CI يقع لو [[gofmt -l .]] طلّع أي ملف.`,
            mistakes: R`تعطّل format on save لأن «شكلي أحسن». وتتجاهل vet لأن البرنامج اشتغل: [[Printf("%d", "text")]] بتشتغل وتطبع [[%!d(string=text)]] بدل ما تقع، فالغلطة بتعدّي لحد ما يوزر يشوفها.`
          },
          lines: [
            "بيظبط شكل كل ملفات .go في المشروع ويكتبها.",
            "بيدوّر على أخطاء منطقية شائعة في كل الباكدجات.",
            "أسماء الملفات اللي شكلها مش مظبوط بس، من غير تعديل.",
            "الفرق اللي gofmt هيعمله في الملف، بصيغة diff.",
            "تسطيب staticcheck.",
            "مراجعة أعمق: كود مش مستخدم، و APIs قديمة، وأخطاء شائعة."
          ],
          sol: R`[[go run .]] بيشتغل عادي وبيطبع [[%!d(string=text)]]، يعني الغلطة بتعدّي من الـ compiler. و [[go vet .]] بيمسكها:
[[./main.go:6:15: fmt.Printf format %d has arg "text" of wrong type string]] (رقم السطر والعمود حسب ملفك)

و [[gofmt -d main.go]] بيطبع diff بسطور [[-]] (الشكل الحالي) و [[+]] (الشكل الصح)، وبعد [[go fmt ./...]] الملف بيتظبط و [[gofmt -l .]] ميطبعش حاجة.`
        }
      ]
    },
    {
      t: "المتغيرات والأنواع والنصوص",
      l: 1,
      n: "var و := والقيمة الصفرية، والثوابت و iota، والتحويل بين الأنواع، والنص العربي جوه string، والطباعة بـ fmt",
      items: [
        {
          cmd: "var و :=",
          title: "تعرّف متغير إزاي: var و := والقيمة الصفرية",
          desc: R`Go لغة statically typed: كل متغير ليه نوع ثابت بيتحدد وقت الـ compile ومبيتغيرش. لو المتغير int مينفعش تحط فيه نص بعدين.

٣ طرق للتعريف:
• [[var count int]]: متغير من نوع int من غير قيمة، فبياخد القيمة الصفرية (zero value): [[0]] للأرقام، و [[""]] للنص، و [[false]] للـ bool، و [[nil]] للـ pointers والـ slices والـ maps. مفيش في Go متغير «مش متعرّف» أو فيه زبالة من الذاكرة.
• [[var name = "Sara"]]: النوع بيتستنتج من القيمة (string).
• [[name := "Sara"]]: نفس اللي فوق بس أقصر، ودي اللي هتكتبها أغلب الوقت. [[:=]] معناها «عرّف متغير جديد وحط فيه القيمة»، وبتشتغل جوه الدوال بس. بره الدوال (على مستوى الباكدج) لازم [[var]].

و [[=]] لوحدها تعيين قيمة جديدة لمتغير موجود قبل كده.

ممكن تعرّف أكتر من متغير مرة واحدة: [[a, b := 1, 2]]. والتبديل بينهم [[a, b = b, a]] من غير متغير مؤقت.

و [[_]] (الشرطة السفلية) اسمها blank identifier: مكان ترمي فيه قيمة مش محتاجها. ليه محتاجينه؟ لأن Go مش هتسيبك تعرّف متغير ومتستخدموش، وفيه دوال بترجّع أكتر من قيمة وانت عايز واحدة بس منهم.`,
          example: R`package main

import "fmt"

// على مستوى الباكدج لازم var، و := مش مسموحة هنا
var appName = "store"

func main() {
  var count int
  var price float64
  var name string
  var ok bool
  fmt.Println(count, price, name == "", ok)

  city := "Cairo"
  qty, total := 3, 4.5
  // := مع متغير واحد جديد على الأقل (extra)، و qty بيتعاد تعيينه
  qty, extra := 5, true
  city = "Giza"
  fmt.Println(appName, city, qty, total, extra)

  a, b := 1, 2
  a, b = b, a
  // Println بترجّع قيمتين (عدد البايتات و error)، والأولى مش محتاجينها
  _, err := fmt.Println("a =", a, "b =", b)
  fmt.Println(err)
}`,
          try: R`جرّب ٣ حاجات واقرا رسالة الـ compiler: (١) انقل [[city := "Cairo"]] بره main. (٢) اكتب [[city := "Alex"]] تاني تحت الأولى في نفس main. (٣) اكتب [[count = "ten"]].`,
          flag: "script",
          deep: {
            why: R`القيمة الصفرية بتشيل نوع كامل من الـ bugs: مفيش «undefined» زي JavaScript ولا قيمة عشوائية زي C. والـ struct اللي كل حقوله ليها قيمة صفرية مفيدة بيبقى جاهز للاستخدام من غير constructor، وده مبدأ في Go اسمه «make the zero value useful» (زي [[sync.Mutex]] و [[strings.Builder]] و [[bytes.Buffer]]: بتعرّفهم وتستخدمهم على طول).`,
            how: R`[[:=]] لازم يكون على الشمال متغير واحد جديد على الأقل. لو كلهم موجودين يطلع error، ولو فيه واحد جديد التانيين بيتعاد تعيينهم (زي qty في المثال). ده بيخليك تكتب [[n, err := ...]] وبعدها [[m, err := ...]] من غير ما تخترع اسم جديد للـ error كل مرة.

الفخ: [[:=]] جوه block جديد ([[if]] أو [[for]] أو [[{ }]]) بيعمل متغير جديد بنفس الاسم يغطّي اللي بره (shadowing)، والتعديل عليه مش بيوصل للمتغير الخارجي:
[[if ok { err := save() }]] هنا err الخارجي متغيّرش.

[[fmt.Println]] لما تديله [[name == ""]] بيطبع نتيجة المقارنة (true). ولو طبعت name الفاضي نفسه مش هتشوف حاجة، عشان كده قارنّاه.`,
            when: R`[[:=]] جوه الدوال في ٩٠٪ من الوقت. [[var x T]] لما عايز القيمة الصفرية صراحةً ([[var wg sync.WaitGroup]])، أو النوع مختلف عن اللي هيتستنتج ([[var ratio float64 = 1]]). و [[var]] على مستوى الباكدج للقيم المشتركة (وقللها: global state بيصعّب الاختبار).`,
            mistakes: R`[[x := 1]] بره دالة: [[syntax error: non-declaration statement outside function body]]. و [[:=]] تاني لنفس الاسم في نفس الـ scope: [[no new variables on left side of :=]]. والـ shadowing جوه if أو for وتفتكر إنك عدّلت المتغير اللي بره. ومتغير معرّف ومش مستخدم: [[declared and not used]].`
          },
          lines: [
            R`باكدج main.`,
            R`import لباكدج واحدة ممكن من غير أقواس.`,
            R`متغير على مستوى الباكدج بـ [[var]]، نوعه string من القيمة.`,
            "main.",
            R`int من غير قيمة: صفر.`,
            R`float64 (رقم عشري): صفر برضه.`,
            R`string فاضي [[""]].`,
            R`bool: false.`,
            "اطبع القيم الصفرية (ومقارنة النص الفاضي عشان يبان).",
            R`متغير جديد بـ [[:=]].`,
            "متغيرين جداد في سطر واحد: int و float64.",
            R`extra جديد، فـ [[:=]] مسموحة، و qty اتغيّر لـ 5.`,
            R`تعيين قيمة جديدة لمتغير موجود بـ [[=]].`,
            "اطبعهم.",
            "متغيرين جداد.",
            "تبديل القيم في سطر واحد.",
            R`[[_]] بترمي القيمة الأولى، و err جديد.`,
            R`[[<nil>]] يعني مفيش error.`,
            "قفلة main."
          ],
          sol: R`الناتج:
[[0 0 true false]]
[[store Giza 5 4.5 true]]
[[a = 2 b = 1]]
[[<nil>]]

والأخطاء التلاتة:
(١) [[syntax error: non-declaration statement outside function body]]: بره الدوال لازم [[var city = "Cairo"]].
(٢) [[no new variables on left side of :=]]: city موجود، فاكتب [[city = "Alex"]].
(٣) [[cannot use "ten" (untyped string constant) as int value in assignment]]: count نوعه int ومينفعش يتغيّر.`
        },
        {
          cmd: "const و iota",
          title: "الثوابت و iota: قيم مبتتغيرش، و enum من غير كلمة enum",
          desc: R`[[const]] قيمة معروفة وقت الـ compile ومبتتغيرش: أرقام، ونصوص، و bool. مينفعش const يبقى slice أو map أو نتيجة دالة بتشتغل وقت التشغيل.

الثوابت في Go بتبقى «untyped» لحد ما تستخدمها: [[const timeout = 5 * time.Second]] بتشتغل كـ [[time.Duration]]، و [[const big = 1 << 40]] رقم كبير من غير ما تحدد نوعه. [[<<]] معناها shift لليسار: [[1 << 10]] يعني 1 مضروب في 2 عشر مرات = 1024.

Go مفيهاش كلمة [[enum]]. البديل: نوع جديد ([[type Status int]]) وبلوك const فيه [[iota]]. [[iota]] عدّاد بيبدأ من 0 في أول سطر في البلوك ويزيد واحد مع كل سطر. والسطور اللي من غير قيمة بتكرر نفس التعبير اللي فوقها بـ iota الجديدة.

[[type Status int]] بيعمل نوع جديد أساسه int. الفايدة إن الدالة اللي بتاخد Status مش هتقبل أي int بالغلط من غير تحويل صريح.`,
          example: R`package main

import (
  "fmt"
  "time"
)

const appName = "orders"
const timeout = 5 * time.Second

type Status int

// iota بتبدأ من 0 وتزيد واحد مع كل سطر
const (
  Pending Status = iota
  Paid
  Shipped
  Cancelled
)

// _ بترمي أول قيمة (صفر)، والسطور اللي بعدها بتكرر نفس المعادلة
const (
  _  = iota
  KB = 1 << (10 * iota)
  MB
  GB
)

func main() {
  fmt.Println(appName, timeout)
  fmt.Println(Pending, Paid, Shipped, Cancelled)
  s := Shipped
  fmt.Println(s == 2, KB, MB, GB)
}`,
          try: R`ضيف method اسمها [[String()]] على Status بترجّع اسم الحالة ([["pending"]] و [["paid"]]...)، واطبع [[fmt.Println(Paid)]]. هتلاقي fmt استخدمها لوحدها. (الـ methods هتتشرح بالتفصيل في درس الـ structs، الشكل: [[func (s Status) String() string { ... }]].)`,
          flag: "script",
          deep: {
            why: R`الأرقام السحرية (status == 2) مبتتقريش وسهل تغلط فيها. الثوابت بأسماء بتوضّح المعنى، والنوع الخاص (Status) بيخلي الـ compiler يمنعك تبعت رقم عشوائي لدالة مستنية حالة.`,
            how: R`[[iota]] بتتصفّر مع كل بلوك [[const ( )]] جديد. وفي البلوك التاني [[KB = 1 << (10 * iota)]]: iota هنا 1 فـ [[1 << 10]] = 1024، وسطر MB من غير قيمة فبيكرر المعادلة بـ iota = 2 يعني [[1 << 20]]، وهكذا.

[[fmt.Println(Paid)]] بيطبع 1 لأن Status أساسه int. لو عرّفت [[String() string]] على النوع، fmt بيشوف إنه بيحقق الـ interface اسمه [[fmt.Stringer]] ويطبع الاسم. وفيه أداة رسمية [[stringer]] بتولّد الدالة دي لوحدها ([[go generate]]).

[[timeout]] بيتطبع [[5s]] لأن [[time.Duration]] عنده String() جاهزة.`,
            when: R`حالات الطلب، والأدوار (admin و user)، والأحجام والحدود (MaxUploadSize)، وأي رقم ثابت ليه معنى.`,
            mistakes: R`تحفظ قيمة iota (رقم) في الداتابيز، وبعدين تضيف حالة في نص البلوك فكل الأرقام اللي بعدها تتزحلق وداتا قديمة تتقري غلط. لو القيمة هتتخزن أو تتبعت في API، استخدم نصوص ([[const Paid Status = "paid"]] مع [[type Status string]]) أو أرقام صريحة. وكمان القيمة الصفرية للـ Status هي أول ثابت (Pending)، فـ struct جديد مش متحددله حالة هيبقى Pending من غير قصد. لو ده مشكلة خلي أول قيمة [[Unknown]].`
          },
          lines: [
            "باكدج main.",
            "imports.",
            "fmt.",
            R`time، عشان [[time.Second]].`,
            "قفلة.",
            "ثابت نصي.",
            R`ثابت مدة: 5 ثواني من نوع [[time.Duration]].`,
            R`نوع جديد اسمه Status أساسه int.`,
            "بلوك ثوابت.",
            R`Pending = 0 ونوعه Status.`,
            "Paid = 1 بنفس النوع (السطر بيكرر اللي فوقه).",
            "Shipped = 2.",
            "Cancelled = 3.",
            "قفلة البلوك.",
            "بلوك تاني: iota بتبدأ من صفر تاني.",
            R`القيمة 0 بنرميها في [[_]].`,
            R`iota = 1، فـ [[1 << 10]] = 1024.`,
            R`iota = 2، فـ [[1 << 20]].`,
            R`iota = 3، فـ [[1 << 30]].`,
            "قفلة.",
            "main.",
            R`[[5s]]: Duration بتطبع نفسها بشكل مقروء.`,
            "الأرقام اللي iota ادتها.",
            "متغير من نوع Status.",
            R`مقارنة بـ 2 مسموحة (2 ثابت untyped)، والأحجام بالبايت.`,
            "قفلة main."
          ],
          sol: R`الناتج:
[[orders 5s]]
[[0 1 2 3]]
[[true 1024 1048576 1073741824]]

ومع الـ String() method (الكود تحت)، [[fmt.Println(Paid)]] بتطبع [[paid]] بدل 1، و [[fmt.Println(Status(9))]] بتطبع [[Status(9)]]. لاحظ إننا مستخدمناش [[fmt.Sprint(s)]] جوه String نفسها: ده هينادي String تاني وتالت لحد ما البرنامج يقع (stack overflow)، فبنحوّله int الأول.`,
          solCode: R`func (s Status) String() string {
  switch s {
  case Pending:
    return "pending"
  case Paid:
    return "paid"
  case Shipped:
    return "shipped"
  case Cancelled:
    return "cancelled"
  }
  return fmt.Sprintf("Status(%d)", int(s))
}`
        },
        {
          cmd: "الأنواع والتحويل",
          title: "الأنواع الأساسية والتحويل بينها: Go مبتحوّلش لوحدها",
          desc: R`الأنواع اللي هتستخدمها كل يوم:
• [[int]]: رقم صحيح، 64 bit على الأجهزة العادية. وفيه [[int8]] و [[int16]] و [[int32]] و [[int64]] بأحجام محددة، و [[uint]] للموجب بس.
• [[float64]]: رقم عشري (و [[float32]] أقل دقة).
• [[bool]]: true أو false.
• [[string]]: نص.
• [[byte]] (اسم تاني لـ uint8) و [[rune]] (اسم تاني لـ int32): هنشرحهم في درس النصوص.

Go مبتحوّلش بين الأنواع لوحدها أبدًا. [[qty * price]] لو qty int و price float64 = compile error. لازم تحوّل بإيدك: [[T(x)]]، يعني [[float64(qty)]] أو [[int(price)]]. والتحويل من float لـ int بيقطع الكسر (مش بيقرّب).

الأرقام والنصوص بالذات بتتحوّل بالباكدج [[strconv]]:
• [[strconv.Atoi("42")]]: نص لـ int، وبترجّع قيمتين: الرقم و error (لو النص مش رقم).
• [[strconv.Itoa(42)]]: int لنص.
• [[strconv.ParseFloat("3.75", 64)]] و [[strconv.ParseBool("true")]].

القسمة بين int و int بترجّع int: [[7/2]] = 3. و [[%]] باقي القسمة.`,
          example: R`package main

import (
  "fmt"
  "strconv"
)

func main() {
  qty := 3
  price := 19.5
  total := float64(qty) * price
  fmt.Println(total)
  fmt.Println(int(price), 7/2, 7.0/2, 7%2)

  n, err := strconv.Atoi("42")
  fmt.Println(n+1, err)
  _, err = strconv.Atoi("42abc")
  fmt.Println(err)

  s := strconv.Itoa(99) + " جنيه"
  f, _ := strconv.ParseFloat("3.75", 64)
  fmt.Println(s, f*2)

  // int8 أكبر قيمة فيه 127، والزيادة بتلف للسالب من غير error
  var small int8 = 127
  small++
  fmt.Println(small)
}`,
          try: R`اكتب [[fmt.Println(string(65))]] و [[fmt.Println(strconv.Itoa(65))]] وقارن. وبعدين شغّل [[go vet .]] على السطر الأول. وجرّب [[total := qty * price]] من غير تحويل واقرا الـ error.`,
          flag: "script",
          deep: {
            why: R`التحويل التلقائي في لغات تانية مصدر bugs مشهور: [["5" + 1]] في JavaScript بقت [["51"]]. Go بتخليك تكتب التحويل صريح، فتشوف بعينك إن فيه كسر هيتقطع أو رقم ممكن يلف.`,
            how: R`[[int(price)]] = 19 (قطع مش تقريب، والتقريب [[math.Round]]). وخلي بالك: [[int(9.99)]] على رقم ثابت مكتوب في الكود compile error ([[cannot convert 9.99 (untyped float constant) to type int]])، لأن الـ compiler شايف إن الكسر هيضيع. على متغير بيعدّي وبيقطع. و [[7.0/2]] = 3.5 لأن 7.0 ثابت عشري فالعملية بقت float.

الـ overflow في Go مش error: int8 أكبر قيمة فيه 127، فـ [[127 + 1]] بتلف لـ -128 بصمت. نفس الكلام مع int64 بس عند رقم ضخم. للفلوس متستخدمش float64 (الكسور العشرية مش بتتخزن بالظبط: [[0.1 + 0.2]] مش 0.3 بالظبط)، خزّن قروش في int64 أو استخدم مكتبة decimal.

[[string(65)]] بيرجّع [["A"]] (الحرف اللي رقمه 65) مش [["65"]]، ودي غلطة مشهورة لدرجة إن [[go vet]] بيمسكها: [[conversion from untyped int to string yields a string of one rune, not a string of digits]].

[[strconv.Atoi]] بترجّع error فيه اسم الدالة والنص اللي فشل، فاقرأه.`,
            when: R`[[strconv]] كل ما تقرا رقم من نص: query string و env vars و CSV و os.Args. و [[float64(x)]] لما تخلط int مع عشري في حساب.`,
            mistakes: R`[[string(n)]] وانت عايز الرقم كنص (استخدم [[strconv.Itoa]] أو [[fmt.Sprint]]). وتتجاهل الـ error بتاع Atoi فيرجع 0 وتكمّل كأن اليوزر كتب صفر. وتحسب فلوس بـ float64.`
          },
          lines: [
            "باكدج main.",
            "imports.",
            "fmt.",
            R`strconv: التحويل بين النصوص والأرقام.`,
            "قفلة.",
            "main.",
            "int.",
            "float64.",
            R`[[float64(qty)]] تحويل صريح، من غيره compile error.`,
            "58.5.",
            R`19 (قطع الكسر من 19.5)، و 3 (قسمة int)، و 3.5، و 1 (باقي القسمة).`,
            R`نص لرقم: الرقم و error.`,
            R`43 و [[<nil>]].`,
            R`نص مش رقم: الرقم بنرميه ([[_]]) والـ error فيه السبب. [[=]] لأن err موجود.`,
            "اطبع الـ error.",
            R`رقم لنص، و [[+]] بين نصين بتلزقهم.`,
            R`نص لـ float64 (الـ 64 هي الدقة).`,
            R`[[99 جنيه 7.5]].`,
            R`int8 بأكبر قيمة.`,
            R`[[++]] بتزوّد واحد.`,
            "-128: لفّ.",
            "قفلة."
          ],
          sol: R`الناتج:
[[58.5]]
[[19 3 3.5 1]]
[[43 <nil>]]
[[strconv.Atoi: parsing "42abc": invalid syntax]]
[[99 جنيه 7.5]]
[[-128]]

وفي التجربة: [[string(65)]] بتطبع [[A]] و [[strconv.Itoa(65)]] بتطبع [[65]]. و [[go vet .]] بيقول [[conversion from untyped int to string yields a string of one rune, not a string of digits]]. و [[qty * price]] من غير تحويل: [[invalid operation: qty * price (mismatched types int and float64)]].`
        },
        {
          cmd: "string و rune و byte",
          title: "النص العربي جوه string: بايتات و runes و UTF-8",
          desc: R`الـ string في Go سلسلة بايتات مبتتغيرش (immutable)، وغالبًا متشفرة UTF-8. في UTF-8 الحرف الإنجليزي بايت واحد، والحرف العربي بايتين، والإيموجي ٤. عشان كده:
• [[len("سلام")]] = 8 مش 4: [[len]] بتعد بايتات مش حروف.
• [[s[0]]] بيرجّع أول بايت (رقم من نوع byte)، مش أول حرف.

الحرف الواحد (Unicode code point) اسمه [[rune]] وبيتكتب بين علامتين مفردتين: [['س']]. وعشان تمشي على الحروف مش البايتات:
• [[for i, r := range s]]: r هو الحرف (rune)، و i مكانه بالبايت.
• [[utf8.RuneCountInString(s)]]: عدد الحروف.
• [[[]rune(s)]]: يحوّل النص لقايمة حروف، فتقدر تقص بالحروف.

الباكدج [[strings]] فيها كل اللي هتحتاجه: [[Contains]] و [[HasPrefix]] و [[Split]] و [[Fields]] (تقسيم على المسافات) و [[Join]] و [[TrimSpace]] و [[ReplaceAll]] و [[ToUpper]].

ولو هتبني نص كبير في loop استخدم [[strings.Builder]] بدل [[+=]]، لأن كل [[+=]] بيعمل نسخة جديدة من النص كله.

والنص ممكن يتكتب بين backticks: ده raw string، مفيهوش [[\n]] ولا escaping، وبيمتد على أكتر من سطر. مفيد للـ JSON والـ SQL والـ regex.`,
          example: R`package main

import (
  "fmt"
  "strings"
  "unicode/utf8"
)

func main() {
  s := "سلام Go"
  fmt.Println(len(s), utf8.RuneCountInString(s))
  fmt.Println(s[0], s[len(s)-1], string(s[len(s)-1]))

  for i, r := range "سلا" {
    fmt.Println(i, string(r), r)
  }

  runes := []rune(s)
  fmt.Println(string(runes[:4]))

  fmt.Println(strings.Contains(s, "Go"), strings.ToUpper("go"))
  words := strings.Fields("  Go   سهلة   وسريعة ")
  fmt.Println(len(words), strings.Join(words, "-"))

  query := $__btSELECT name
FROM users$__bt
  fmt.Println(strings.Count(query, "\n"))
}`,
          try: R`اكتب دالة [[reverse(s string) string]] بتعكس نص. جرّبها الأول بالبايتات ([[[]byte(s)]]) على [["سلام"]] وشوف النتيجة، وبعدين بالـ runes ([[[]rune(s)]]).`,
          flag: "script",
          deep: {
            why: R`أي برنامج بيتعامل مع يوزرز عرب هيقابل ده: تحدد طول اسم بـ len فتلاقي «محمد» 8، أو تقص أول 10 حروف من عنوان بالبايتات فتقطع حرف في النص ويطلع [[�]] على الشاشة. لو فهمت الفرق بين byte و rune المشاكل دي بتختفي.`,
            how: R`[[s[0]]] = 216: أول بايت من حرف «س» (الحرف ده في UTF-8 بايتين: 216 و 179). و [[s[len(s)-1]]] = 111 وده حرف o، و [[string(byte)]] بيحوّله نص.

[[range]] على string بيفك UTF-8 لوحده: المرة الأولى i = 0 و r = 'س' (رقمه 1587)، والتانية i = 2 لأن «س» خد بايتين، وهكذا. لو النص فيه بايتات مش UTF-8 صح، range بيرجّع الحرف [[U+FFFD]] (�).

[[[]rune(s)]] بيعمل نسخة جديدة كلها runes (كل واحدة ٤ بايت)، فمتستخدمهاش في loop على نص ضخم من غير داعي.

ملحوظة: الـ rune مش دايمًا «حرف» زي ما العين بتشوفه: إيموجي العلم أو الحرف بالتشكيل ممكن يبقى أكتر من rune. للحالات دي فيه مكتبة [[golang.org/x/text]].`,
            when: R`[[len]] لما تحسب حجم بالبايت (حدود الداتابيز، الـ body). [[utf8.RuneCountInString]] لما تتحقق من طول اسم أو تعليق. [[range]] أو [[[]rune]] لما تقص أو تعكس أو تمشي حرف حرف.`,
            mistakes: R`[[len(name) > 50]] كتحقق على عدد الحروف، فالاسم العربي يتقبل نصه بس. وتقص [[s[:10]]] على نص عربي فيطلع حرف مكسور. وتبني نص بـ [[+=]] في loop على آلاف العناصر. وتكتب [["c"]] وانت عايز rune: [["c"]] string و [['c']] rune.`
          },
          lines: [
            "باكدج main.",
            "imports.",
            "fmt.",
            "strings: دوال النصوص.",
            R`unicode/utf8: عدّ الحروف وفحص الـ UTF-8.`,
            "قفلة.",
            "main.",
            "نص فيه عربي وإنجليزي.",
            R`11 بايت (4 حروف عربي × 2 + مسافة + G + o) و 7 حروف.`,
            R`أول بايت (216)، وآخر بايت (111)، وآخر بايت كنص (o).`,
            R`range على نص: i مكان البايت و r الحرف (rune).`,
            "اطبع المكان والحرف ورقمه في Unicode.",
            "قفلة الـ for.",
            "حوّل النص لـ runes.",
            "أول 4 حروف صح: سلام.",
            "فيه Go؟ وتحويل لحروف كبيرة.",
            "قسّم على أي عدد مسافات وشيل اللي في الأطراف.",
            R`3 كلمات، ووصّلهم بـ [[-]].`,
            R`raw string بين backticks على سطرين.`,
            "كمّلة الـ raw string.",
            R`فيه سطر جديد واحد جواه.`,
            "قفلة."
          ],
          sol: R`الناتج:
[[11 7]]
[[216 111 o]]
[[0 س 1587]]
[[2 ل 1604]]
[[4 ا 1575]]
[[سلام]]
[[true GO]]
[[3 Go-سهلة-وسريعة]]
[[1]]

والـ reverse بالبايتات على [["سلام"]] بيطلع حاجة زي [[�٧؄ٳ�]]: حروف غلط وعلامات [[�]]، لأنه قلب ترتيب البايتات جوه كل حرف فبقت بايتات ملهاش معنى في UTF-8. بالـ runes بيطلع [[مالس]] صح (الكود تحت).`,
          solCode: R`func reverse(s string) string {
  r := []rune(s)
  for i, j := 0, len(r)-1; i < j; i, j = i+1, j-1 {
    r[i], r[j] = r[j], r[i]
  }
  return string(r)
}`
        },
        {
          cmd: "fmt و Printf",
          title: "fmt: تطبع أي قيمة وتعرف نوعها (%v و %+v و %T و %q)",
          desc: R`الباكدج [[fmt]] فيها ٣ عائلات:
• [[Print]] و [[Println]] و [[Printf]]: بتطبع على الشاشة (stdout).
• [[Sprint]] و [[Sprintln]] و [[Sprintf]]: نفس الكلام بس بترجّع string بدل ما تطبع.
• [[Fprint]] و [[Fprintln]] و [[Fprintf]]: بتكتب في أي مكان تديهولها (ملف، أو [[os.Stderr]]، أو رد HTTP).
وفيه [[fmt.Errorf]]: زي Sprintf بس بترجّع error.

[[Printf]] بتاخد قالب فيه verbs بتبدأ بـ [[%]]، وكل verb بيتبدّل بقيمة بالترتيب:
• [[%v]]: القيمة بشكلها الافتراضي (أي نوع). و [[%+v]] مع أسماء حقول الـ struct، و [[%#v]] بشكل كود Go.
• [[%T]]: نوع القيمة، مفيد جدًا وانت بتدوّر على bug.
• [[%d]] رقم صحيح، و [[%s]] نص، و [[%q]] نص بين علامات تنصيص (بيبيّن المسافات والـ [[\n]] المستخبية)، و [[%t]] bool.
• [[%f]] عشري، و [[%.2f]] برقمين بعد العلامة.
• العرض: [[%6d]] (6 خانات، والمسافات على الشمال)، و [[%-6s]] (المسافات على اليمين)، و [[%03d]] (أصفار).
• [[%x]] hex، و [[%b]] binary، و [[%%]] علامة % نفسها.

[[Printf]] مش بتضيف سطر جديد، فبتكتب [[\n]] في الآخر. و [[Println]] بتضيفه لوحدها.

في المثال فيه struct ([[type User struct]])، ده نوع فيه حقول بأسماء، وهيتشرح بالتفصيل في درس الـ structs.`,
          example: R`package main

import (
  "fmt"
  "os"
)

type User struct {
  Name string
  Age  int
}

func main() {
  u := User{Name: "Sara", Age: 25}
  fmt.Printf("%v\n", u)
  fmt.Printf("%+v\n", u)
  fmt.Printf("%#v\n", u)
  fmt.Printf("%T %T %T\n", u, 3.5, []string{})
  fmt.Printf("%q %d %t\n", "hi ", 42, true)
  fmt.Printf("[%6.2f] [%-6s] [%6s] [%03d]\n", 3.14159, "go", "go", 7)
  fmt.Printf("%x %X %b %%\n", 255, 255, 5)
  msg := fmt.Sprintf("%s عندها %d سنة", u.Name, u.Age)
  fmt.Println(msg)
  fmt.Fprintln(os.Stderr, "ده بيروح على stderr")
}`,
          try: R`اطبع جدول فاتورة بـ Printf: ٣ منتجات، كل سطر فيه الاسم بعرض 10 على اليمين ([[%-10s]])، والكمية بعرض 3، والسعر بعرض 8 برقمين عشريين، وسطر أخير بالإجمالي. وبعدين شغّل البرنامج بـ [[go run . 2>/dev/null]] وشوف سطر stderr اختفى.`,
          flag: "script",
          deep: {
            why: R`[[%v]] و [[%T]] و [[%+v]] هما أسرع أدوات debug في Go: تطبع القيمة ونوعها وأسماء حقولها في سطر. و [[%q]] بتكشف المسافات الزيادة والـ [[\n]] في نص جاي من يوزر أو من ملف، ودي سبب مقارنات كتير بتفشل من غير سبب واضح.`,
            how: R`لو النوع عنده [[String() string]] (يعني بيحقق [[fmt.Stringer]])، الـ [[%v]] و [[%s]] و Println بيستخدموها. ولو عنده [[Error() string]] بيستخدموها قبلها.

لو الـ verb مش مناسب للقيمة، fmt مش بتقع: بتطبع [[%!d(string=hi)]]. وعدد قيم أقل من الـ verbs: [[%!d(MISSING)]]. وأكتر: [[%!(EXTRA int=5)]]. go vet بيمسك الحالات دي قبل التشغيل.

[[os.Stdout]] و [[os.Stderr]] الاتنين بيظهروا في الترمنال، بس الـ shell بيفرّق بينهم: [[> file]] بتحوّل stdout بس، و [[2> file]] بتحوّل stderr. فالرسايل والأخطاء على stderr، والناتج الحقيقي على stdout، عشان اللي بيستخدم برنامجك في pipe ([[|]]) ياخد الناتج نضيف.`,
            when: R`[[Println]] للطباعة السريعة. [[Printf]] للتنسيق. [[Sprintf]] لبناء نص (رسالة، مفتاح كاش). [[Errorf]] للأخطاء. و [[Fprintf(w, ...)]] لما تكتب في ملف أو رد HTTP. وفي السيرفر الحقيقي اللوج بـ [[log/slog]] (المستوى ٣) مش fmt.`,
            mistakes: R`تنسى [[\n]] في آخر Printf فالسطور تلزق في بعض. وتستخدم [[%d]] مع float أو [[%s]] مع int. وتستخدم [[Println]] بقالب فيه [[%s]]: Println مبتفهمش الـ verbs وهتطبعها زي ما هي.`
          },
          lines: [
            "باكدج main.",
            "imports.",
            "fmt.",
            R`os، عشان [[os.Stderr]].`,
            "قفلة.",
            "نوع struct فيه حقلين.",
            "حقل الاسم.",
            "حقل السن.",
            "قفلة الـ struct.",
            "main.",
            "قيمة من النوع User.",
            R`[[{Sara 25}]].`,
            R`[[{Name:Sara Age:25}]].`,
            R`[[main.User{Name:"Sara", Age:25}]].`,
            R`الأنواع: [[main.User float64 []string]].`,
            R`[[%q]] بتبيّن المسافة اللي في الآخر.`,
            "عرض ودقة ومحاذاة وأصفار.",
            R`hex صغير وكبير، و binary، وعلامة %.`,
            "Sprintf بترجّع النص بدل ما تطبعه.",
            "اطبعه.",
            "اطبع على stderr مش stdout.",
            "قفلة."
          ],
          sol: R`الناتج:
[[{Sara 25}]]
[[{Name:Sara Age:25}]]
[[main.User{Name:"Sara", Age:25}]]
[[main.User float64 []string]]
[["hi " 42 true]]
[[[  3.14] [go    ] [    go] [007]]]
[[ff FF 101 %]]
[[Sara عندها 25 سنة]]
[[ده بيروح على stderr]]

ومع [[2>/dev/null]] آخر سطر بيختفي لأنه على stderr. والفاتورة (الكود تحت) بتطلع أعمدة متظبطة:
[[قهوة         2    45.50]]
[[شاي          1    20.00]]
[[الإجمالي         216.75]]
لاحظ إن العربي ممكن يبان مش متظبط في بعض الترمنالات لأن العرض بيتحسب بالـ runes، والخط بيرسم الحروف بعرض مختلف.`,
          solCode: R`items := []struct {
  name  string
  qty   int
  price float64
}{{"قهوة", 2, 45.5}, {"شاي", 1, 20}, {"كيك", 3, 35.25}}
total := 0.0
for _, it := range items {
  fmt.Printf("%-10s %3d %8.2f\n", it.name, it.qty, it.price)
  total += float64(it.qty) * it.price
}
fmt.Printf("%-10s %12.2f\n", "الإجمالي", total)`
        }
      ]
    },
    {
      t: "التحكم والدوال",
      l: 1,
      n: "if بجملة تمهيدية، و for الـ loop الوحيدة، و switch من غير break، والدوال اللي بترجّع أكتر من قيمة، والـ closures",
      items: [
        {
          cmd: "if و for",
          title: "if بجملة تمهيدية، و for هي الـ loop الوحيدة في Go",
          desc: R`[[if]] في Go من غير أقواس حوالين الشرط، والـ [[{ }]] إجبارية حتى لو سطر واحد. والشرط لازم يبقى bool فعلًا: [[if count]] مش مسموحة، اكتب [[if count > 0]].

و if ممكن يبقى فيها جملة تمهيدية قبل الشرط مفصولة بـ [[;]]:
[[if n, err := strconv.Atoi(s); err != nil { ... }]]
المتغيرات n و err موجودة جوه الـ if والـ else بتوعها بس، وده بيخلي الكود نضيف ومفيش متغيرات سايبة. [[!=]] معناها «لا يساوي».

Go فيها loop واحدة بس: [[for]]، وبتتكتب بكذا شكل:
• الكلاسيكي: [[for i := 0; i < 3; i++ { }]]. [[i++]] بتزوّد واحد.
• زي while: [[for balance > 30 { }]].
• للأبد: [[for { }]] وتخرج بـ [[break]] أو [[return]].
• [[for i, v := range items { }]]: على slice أو map أو string أو channel. i المكان و v القيمة، ولو مش عايز المكان: [[for _, v := range items]].
• على رقم (Go 1.22+): [[for i := range 10]] من 0 لـ 9.

[[continue]] بتنط للّفة اللي بعدها، و [[break]] بتخرج من الـ loop.`,
          example: R`package main

import (
  "fmt"
  "strconv"
)

func main() {
  if n, err := strconv.Atoi("15"); err != nil {
    fmt.Println("مش رقم:", err)
  } else if n%2 == 0 {
    fmt.Println(n, "زوجي")
  } else {
    fmt.Println(n, "فردي")
  }

  for i := 0; i < 3; i++ {
    fmt.Print(i, " ")
  }
  fmt.Println()

  balance := 100
  for balance > 30 {
    balance -= 40
  }
  fmt.Println("balance:", balance)

  prices := []int{50, 0, 120, 300, 80}
  for i, p := range prices {
    if p == 0 {
      continue
    }
    if p > 200 {
      break
    }
    fmt.Println(i, p)
  }

  for i := range 3 {
    fmt.Print(i*i, " ")
  }
  fmt.Println()
}`,
          try: R`اكتب FizzBuzz: من 1 لـ 15، اطبع Fizz لو الرقم بيقبل القسمة على 3، و Buzz على 5، و FizzBuzz على الاتنين، وإلا الرقم نفسه. وبعدين اكتب loop تدوّر على أول رقم في [[[]int{3, 8, 12, 7}]] أكبر من 10 وتطبعه وتخرج.`,
          flag: "script",
          deep: {
            why: R`loop واحدة بأشكال مختلفة أسهل من while و do-while و for و foreach. والجملة التمهيدية في if هي اللي بتخلي نمط [[if err := f(); err != nil]] مقروء في كل كود Go.`,
            how: R`[[range]] على slice بيدّيك نسخة من كل عنصر في v، فلو عدّلت v العنصر الأصلي مش بيتغيّر. لو عايز تعدّل اكتب [[items[i] = ...]].

من Go 1.22 كل لفّة في الـ loop ليها متغير i جديد. قبل كده كان متغير واحد بيتعاد استخدامه، وده كان بيعمل bug مشهور مع الـ goroutines والـ closures (كلهم يشوفوا آخر قيمة). لو شغال على مشروع go.mod بتاعه أقدم من 1.22 السلوك القديم لسه موجود.

[[break]] جوه switch أو select جوه for بيخرج من الـ switch بس مش الـ for. للخروج من الـ for حط label: [[outer: for ... { ... break outer }]].

[[fmt.Print]] زي Println بس من غير سطر جديد، وبتحط مسافة بين القيم بس لو الاتنين مش نصوص.`,
            when: R`[[for range]] على أي مجموعة. الكلاسيكي لما محتاج تتحكم في الخطوة أو الاتجاه. [[for {}]] للـ workers والسيرفرات اللي بتستنى شغل.`,
            mistakes: R`تحط أقواس [[if (x > 0)]]: بتشتغل بس go fmt بيشيلها. تعدّل v جوه range وتستغرب إن الـ slice متغيّرش. و [[break]] جوه switch جوه for وانت فاكر إنه خرج من الـ for. و [[for i := 0; i < len(s); i++]] وانت بتمسح من s جوه الـ loop.`
          },
          lines: [
            "باكدج main.",
            "imports.",
            "fmt.",
            "strconv.",
            "قفلة.",
            "main.",
            R`جملة تمهيدية بتحوّل النص، وبعد [[;]] الشرط: لو فيه error.`,
            "مش هيتنفذ: 15 رقم.",
            R`[[%]] باقي القسمة: زوجي لو الباقي صفر.`,
            "مش هنا.",
            R`[[else]]: لا ده ولا ده.`,
            "15 فردي.",
            "قفلة. n و err مش موجودين بعد السطر ده.",
            R`الشكل الكلاسيكي: بداية؛ شرط؛ خطوة.`,
            R`[[Print]] من غير سطر جديد.`,
            "قفلة.",
            "سطر جديد.",
            "رصيد.",
            "زي while: طول ما الشرط صح.",
            R`[[-=]] اطرح وخزّن: 100 ثم 60 ثم 20.`,
            "قفلة.",
            "20.",
            "slice أرقام.",
            "range: المكان والقيمة.",
            "لو صفر...",
            "...نط للّفة اللي بعدها.",
            "قفلة.",
            "لو أكبر من 200...",
            "...اخرج من الـ loop كلها (فـ 80 مش هيتطبع).",
            "قفلة.",
            "اطبع.",
            "قفلة الـ range.",
            "range على رقم: 0 و 1 و 2.",
            "اطبع المربع.",
            "قفلة.",
            "سطر جديد.",
            "قفلة main."
          ],
          sol: R`الناتج:
[[15 فردي]]
[[0 1 2 ]]
[[balance: 20]]
[[0 50]]
[[2 120]]
[[0 1 4 ]]

لاحظ إن 300 وقّفت الـ loop فـ 80 مطبعتش. وفي FizzBuzz (الكود تحت) الترتيب مهم: شرط الـ 15 الأول، وإلا 15 هتطلع Fizz بس. والتاني بيطبع [[12]].`,
          solCode: R`for i := 1; i <= 15; i++ {
  switch {
  case i%15 == 0:
    fmt.Println("FizzBuzz")
  case i%3 == 0:
    fmt.Println("Fizz")
  case i%5 == 0:
    fmt.Println("Buzz")
  default:
    fmt.Println(i)
  }
}

for _, n := range []int{3, 8, 12, 7} {
  if n > 10 {
    fmt.Println(n)
    break
  }
}`
        },
        {
          cmd: "switch",
          title: "switch في Go: كل case بيخرج لوحده، ومن غير قيمة بيبقى بديل if-else",
          desc: R`[[switch]] في Go أبسط من C و JavaScript:
• كل [[case]] بيخرج لوحده بعد ما يخلص، فمفيش [[break]] تنساها.
• أكتر من قيمة في نفس الـ case بفاصلة: [[case "fri", "sat":]].
• [[default]] لو ولا case نفع.
• [[switch]] من غير قيمة خالص بيقيّم كل case كشرط bool، وده أنضف من سلسلة [[else if]] طويلة.
• ممكن جملة تمهيدية زي if: [[switch x := f(); x { ... }]].

ولو عايز تكمّل للـ case اللي بعده بقصد فيه كلمة [[fallthrough]]، بس نادرًا ما هتحتاجها.

وفيه نوع تالت اسمه type switch ([[switch v := x.(type)]]) هتشوفه في درس الـ interfaces.`,
          example: R`package main

import "fmt"

func grade(score int) string {
  switch {
  case score >= 85:
    return "امتياز"
  case score >= 65:
    return "جيد"
  case score >= 50:
    return "مقبول"
  default:
    return "راسب"
  }
}

func httpClass(code int) string {
  switch code / 100 {
  case 2:
    return "success"
  case 3:
    return "redirect"
  case 4, 5:
    return "error"
  }
  return "unknown"
}

func main() {
  day := "fri"
  switch day {
  case "fri", "sat":
    fmt.Println("أجازة")
  case "sun":
    fmt.Println("أول الأسبوع")
  default:
    fmt.Println("يوم شغل")
  }

  fmt.Println(grade(90), grade(70), grade(10))
  fmt.Println(httpClass(201), httpClass(404), httpClass(503), httpClass(100))
}`,
          try: R`اكتب دالة [[shipping(total int, city string) int]]: لو الطلب 1000 أو أكتر يبقى 0، ولو المدينة "cairo" أو "giza" يبقى 30، وغير كده 60. اكتبها بـ switch من غير قيمة، وجرّبها على [[(1200, "aswan")]] و [[(300, "giza")]] و [[(300, "aswan")]].`,
          flag: "script",
          deep: {
            why: R`أشهر bug في switch بتاع C و JS إنك تنسى break فالـ case اللي بعده يتنفذ. Go عكست الافتراض: الخروج هو الطبيعي، والكمّلة لازم تطلبها بكلمة صريحة.`,
            how: R`الـ cases بتتقيّم من فوق لتحت، وأول واحد يطابق بيكسب. في grade الترتيب مهم: لو حطيت [[score >= 50]] الأول، الـ 90 هتطلع «مقبول».

[[switch code / 100]]: التعبير بيتحسب مرة واحدة (404 / 100 = 4 لأنها قسمة int) وبعدين يتقارن بكل case.

في httpClass لو مفيش case طابق ومفيش default، الـ switch بيخلص من غير ما يعمل حاجة والكود بيكمّل لـ [[return "unknown"]]. والدالة اللي بترجّع قيمة لازم يبقى فيه return في كل طريق، وإلا [[missing return]].

[[fallthrough]] بتنفّذ جسم الـ case اللي بعده من غير ما تفحص شرطه، ولازم تبقى آخر سطر في الـ case.`,
            when: R`switch بقيمة لما بتقارن متغير واحد بقيم ثابتة (أيام، أنواع رسايل، أكواد). switch من غير قيمة لما الشروط نطاقات أو مختلفة. و if-else لو هما فرعين بس.`,
            mistakes: R`تكتب [[break]] في آخر كل case من عادة C (مش غلط بس مالوش لازمة). وترتيب cases غلط (الأوسع قبل الأضيق). وتستخدم [[break]] جوه switch جوه for وانت عايز تخرج من الـ for: محتاج label.`
          },
          lines: [
            "باكدج main.",
            "import fmt.",
            "دالة بتاخد int وترجّع string.",
            "switch من غير قيمة: كل case شرط.",
            "الأعلى الأول.",
            "return بتخرج من الدالة كلها.",
            "شرط تاني.",
            "جيد.",
            "تالت.",
            "مقبول.",
            "ولا حاجة نفعت.",
            "راسب.",
            "قفلة الـ switch.",
            "قفلة الدالة.",
            "دالة تانية.",
            R`switch على قيمة محسوبة: 404 / 100 = 4.`,
            "2xx.",
            "نجاح.",
            "3xx.",
            "تحويل.",
            "قيمتين في نفس الـ case.",
            "خطأ.",
            "قفلة: من غير default.",
            "لو ولا case طابق.",
            "قفلة.",
            "main.",
            "اليوم.",
            "switch على قيمة نصية.",
            "الجمعة أو السبت.",
            "بيتنفذ، والـ switch بيخلص هنا من غير break.",
            "الأحد.",
            "مش هنا.",
            "أي يوم تاني.",
            "مش هنا.",
            "قفلة.",
            "امتياز جيد راسب.",
            "success error error unknown.",
            "قفلة."
          ],
          sol: R`الناتج:
[[أجازة]]
[[امتياز جيد راسب]]
[[success error error unknown]]

و shipping (الكود تحت) بترجّع 0 و 30 و 60. شرط الـ 1000 لازم ييجي الأول، وإلا طلب الجيزة بـ 1200 هيدفع 30 وهو المفروض مجاني.`,
          solCode: R`func shipping(total int, city string) int {
  switch {
  case total >= 1000:
    return 0
  case city == "cairo", city == "giza":
    return 30
  default:
    return 60
  }
}`
        },
        {
          cmd: "الدوال والقيم المتعددة",
          title: "الدوال: أكتر من قيمة راجعة، و named returns، و ...variadic",
          desc: R`الدالة بتتكتب: [[func name(params) returnType { ... }]]. ولو كذا parameter من نفس النوع تكتب النوع مرة: [[func add(a, b int) int]].

الدالة ممكن ترجّع أكتر من قيمة، وده من أهم حاجات Go: [[func divmod(a, b int) (int, int)]]، والمستدعي بياخدهم [[q, r := divmod(17, 5)]]. وأشهر استخدام: القيمة ومعاها error [[(User, error)]]. ولو مش عايز واحدة منهم: [[_]].

Named results: ممكن تسمّي القيم الراجعة [[(lo, hi int)]]، فبيبقوا متغيرات جاهزة بقيمتها الصفرية جوه الدالة، و [[return]] لوحدها بترجّعهم. مفيدة في الدوال القصيرة والتوثيق، بس في الدوال الطويلة بتلخبط.

Variadic: [[func sum(nums ...int)]]. الـ [[...]] قبل النوع معناها «أي عدد من القيم»، وجوه الدالة nums بيبقى slice. ولو عندك slice جاهزة وعايز تبعتها: [[sum(xs...)]] بالـ [[...]] بعدها. [[fmt.Println]] نفسها variadic.

الدوال في Go قيم: تتحط في متغير، وتتبعت لدالة تانية كـ parameter. النوع بيتكتب [[func(int) int]].

وكل الـ parameters بتتبعت بالقيمة (نسخة)، فلو الدالة غيّرت int جالها، المتغير الأصلي مش بيتغيّر. (الـ pointers في درسها.)

[[min]] و [[max]] دوال مبنية في اللغة من Go 1.21.`,
          example: R`package main

import "fmt"

func add(a, b int) int {
  return a + b
}

func divmod(a, b int) (int, int) {
  return a / b, a % b
}

// named results: lo و hi متغيرات جاهزة، و return لوحدها بترجّعهم
func minMax(nums []int) (lo, hi int) {
  lo, hi = nums[0], nums[0]
  for _, n := range nums {
    lo = min(lo, n)
    hi = max(hi, n)
  }
  return
}

func sum(nums ...int) int {
  total := 0
  for _, n := range nums {
    total += n
  }
  return total
}

func apply(n int, f func(int) int) int {
  return f(n)
}

func main() {
  fmt.Println(add(2, 3))
  q, r := divmod(17, 5)
  fmt.Println(q, r)
  lo, hi := minMax([]int{7, 2, 9, 4})
  fmt.Println(lo, hi)
  xs := []int{1, 2, 3}
  fmt.Println(sum(), sum(5, 5), sum(xs...))
  double := func(x int) int { return x * 2 }
  fmt.Println(apply(21, double))
}`,
          try: R`اكتب دالة [[stats(nums ...float64) (avg float64, count int)]] بترجّع المتوسط والعدد، ولو مفيش أرقام ترجّع (0, 0) من غير ما تقسم على صفر. جرّبها بـ [[stats()]] و [[stats(2, 4, 9)]] و [[stats(prices...)]].`,
          flag: "script",
          deep: {
            why: R`أكتر من قيمة راجعة هي اللي خلّت Go تستغنى عن الـ exceptions: الدالة بترجّع النتيجة والـ error جنب بعض، والمستدعي لازم يتعامل مع الاتنين قدام عينه.`,
            how: R`[[minMax]] بتفترض إن الـ slice فيها عنصر واحد على الأقل: [[nums[0]]] على slice فاضية بيعمل panic ([[index out of range]]). في كود حقيقي افحص الطول الأول.

[[double := func(x int) int { return x * 2 }]] دالة من غير اسم (anonymous function) محطوطة في متغير. و [[apply]] بتاخد أي دالة بنفس الشكل [[func(int) int]].

الـ variadic لازم يبقى آخر parameter. و [[sum(xs...)]] مش بتنسخ الـ slice، بتبعتها هي نفسها، فلو الدالة عدّلت عنصر فيها هيتعدّل عندك.

Go مفيهاش default parameters ولا function overloading (دالتين بنفس الاسم). البديل: أسماء مختلفة ([[NewServer]] و [[NewServerWithTLS]])، أو struct للإعدادات، أو variadic options.`,
            when: R`[[(T, error)]] لأي حاجة ممكن تفشل. named results للدوال القصيرة أو لما تحتاج تعدّل القيمة الراجعة في defer (درس defer). variadic لدوال زي sum و log و append. دوال كـ parameters لـ callbacks و middleware و sort.`,
            mistakes: R`ترجّع [[(error, T)]] بالعكس: العرف إن الـ error آخر واحد. وتستخدم named results مع [[return]] لوحدها في دالة ٥٠ سطر فمحدش يعرف إيه اللي راجع. وتبعت slice لـ variadic من غير [[...]] فيطلع [[cannot use xs (variable of type []int) as int value]].`
          },
          lines: [
            "باكدج main.",
            "import fmt.",
            "دالة بتاخد int اتنين وترجّع int.",
            "رجّع المجموع.",
            "قفلة.",
            R`بترجّع قيمتين: [[(int, int)]].`,
            "خارج القسمة والباقي.",
            "قفلة.",
            R`named results: lo و hi.`,
            "ابدأ بأول عنصر في الاتنين.",
            "لف على الأرقام.",
            R`[[min]] مبنية في اللغة.`,
            R`و [[max]].`,
            "قفلة.",
            "return لوحدها: بترجّع lo و hi.",
            "قفلة.",
            R`variadic: [[...int]] يعني أي عدد، و nums جوّا slice.`,
            "مجموع.",
            "لف.",
            "زوّد.",
            "قفلة.",
            "رجّعه.",
            "قفلة.",
            R`بتاخد رقم ودالة شكلها [[func(int) int]].`,
            "نادي الدالة اللي جت.",
            "قفلة.",
            "main.",
            "5.",
            "استقبل القيمتين.",
            "3 و 2.",
            "slice literal مباشرة.",
            "2 و 9.",
            "slice جاهزة.",
            R`من غير قيم (0)، وقيمتين (10)، وslice بـ [[...]] (6).`,
            "دالة من غير اسم في متغير.",
            "ابعتها لـ apply: 42.",
            "قفلة."
          ],
          sol: R`الناتج:
[[5]]
[[3 2]]
[[2 9]]
[[0 10 6]]
[[42]]

و stats (الكود تحت): [[stats()]] بترجّع [[0 0]]، و [[stats(2, 4, 9)]] بترجّع [[5 3]]. لاحظ [[float64(count)]]: مينفعش تقسم float64 على int من غير تحويل.`,
          solCode: R`func stats(nums ...float64) (avg float64, count int) {
  count = len(nums)
  if count == 0 {
    return 0, 0
  }
  total := 0.0
  for _, n := range nums {
    total += n
  }
  return total / float64(count), count
}`
        },
        {
          cmd: "closures",
          title: "الـ closure: دالة فاكرة المتغيرات اللي اتعملت جنبها",
          desc: R`الدالة اللي من غير اسم (function literal) لما تستخدم متغير من بره نفسها، بتمسكه هو نفسه مش نسخة منه. ده اسمه closure: الدالة والمتغيرات اللي «قافلة» عليها.

في المثال [[counter()]] بترجّع دالة. كل مرة تنادي الدالة الراجعة، بتزوّد نفس المتغير [[count]] اللي اتعمل جوه counter، رغم إن counter نفسها خلصت من بدري. ولو ناديت counter تاني بتعمل count جديد خالص.

النوع الراجع [[func() int]] معناه «دالة مبتاخدش حاجة وبترجّع int».

الـ closures في كل حتة في Go: الـ goroutines ([[go func() { ... }()]])، و defer، و الـ middleware في الـ HTTP، والـ sort ([[slices.SortFunc(users, func(a, b User) int { ... })]]).

والـ [[append]] في المثال بتضيف عنصر لآخر slice (هتتشرح في درس الـ slices).`,
          example: R`package main

import "fmt"

func counter() func() int {
  count := 0
  return func() int {
    count++
    return count
  }
}

func main() {
  next := counter()
  fmt.Println(next(), next(), next())
  other := counter()
  fmt.Println(other())

  // من Go 1.22 كل لفّة ليها i جديدة، فكل دالة فاكرة رقمها
  var printers []func()
  for i := range 3 {
    printers = append(printers, func() { fmt.Print(i, " ") })
  }
  for _, p := range printers {
    p()
  }
  fmt.Println()

  total := 0
  add := func(n int) { total += n }
  add(10)
  add(5)
  fmt.Println(total)
}`,
          try: R`اكتب دالة [[makeMultiplier(factor int) func(int) int]] بترجّع دالة بتضرب في factor. اعمل [[double]] و [[triple]] منها واطبع [[double(5)]] و [[triple(5)]]. وبعدين اكتب [[memo]]: دالة بتحسب مربع الرقم وبتحفظ النتايج في map جوّا closure، وتطبع «من الكاش» لو الرقم اتحسب قبل كده.`,
          flag: "script",
          deep: {
            why: R`الـ closure بيخليك تربط داتا بسلوك من غير ما تعمل struct: عدّاد، أو إعدادات middleware، أو كاش صغير. وهتحتاج تفهمه عشان تفهم ليه goroutine جوه loop بيشوف قيمة معينة.`,
            how: R`لما الدالة الداخلية تستخدم [[count]]، الـ compiler بيلاحظ إن count لازم يعيش بعد ما counter تخلص، فبيحطه في الـ heap بدل الـ stack (ده اسمه escape analysis، وبيحصل لوحده). انت مش محتاج تعمل حاجة.

حكاية الـ loop: قبل Go 1.22 الـ [[i]] كان متغير واحد لكل اللفّات، فالتلات دوال كانوا بيطبعوا [[3 3 3]] (آخر قيمة). من 1.22 كل لفّة ليها نسختها فبيطبعوا [[0 1 2]]. ده بيعتمد على سطر [[go]] في go.mod، فمشروع قديم مكتوب فيه [[go 1.21]] لسه بالسلوك القديم. لو شغال على كود قديم هتلاقي [[i := i]] جوه الـ loop: ده كان الحل قبل كده.

[[add := func(n int) { total += n }]] بتعدّل total الخارجي نفسه، مش نسخة.`,
            when: R`factories بتطلّع دوال بإعدادات (makeMultiplier، middleware بياخد config). عدّادات و generators. callbacks للـ sort والـ filter. والـ goroutines.`,
            mistakes: R`goroutines كتير بتعدّل نفس المتغير اللي ماسكه closure من غير Mutex: data race (المستوى ٢). ومشروع على [[go 1.21]] أو أقدم بيطبع [[3 3 3]]. وتتوقع إن الـ closure واخد نسخة من القيمة وقت ما اتعمل: هو ماسك المتغير نفسه، فلو المتغير اتغيّر بعدين الدالة هتشوف القيمة الجديدة.`
          },
          lines: [
            "باكدج main.",
            "import fmt.",
            R`counter بترجّع دالة نوعها [[func() int]].`,
            "متغير محلي.",
            "رجّع دالة من غير اسم...",
            "...بتزوّد count نفسه (مش نسخة)...",
            "...وترجّعه.",
            "قفلة الدالة الداخلية.",
            "قفلة counter.",
            "main.",
            "next فاكرة count بتاعها.",
            "1 2 3: نفس المتغير بيزيد.",
            "counter جديدة = count جديد.",
            "1.",
            R`slice من الدوال.`,
            "loop على 0 و 1 و 2.",
            "ضيف دالة بتطبع i بتاع اللفّة دي.",
            "قفلة.",
            "نادي كل الدوال.",
            "كل واحدة بتطبع رقمها.",
            "قفلة.",
            "سطر جديد.",
            "متغير عادي.",
            "closure بتعدّل total اللي بره.",
            "10.",
            "15.",
            "15.",
            "قفلة."
          ],
          sol: R`الناتج:
[[1 2 3]]
[[1]]
[[0 1 2 ]]
[[15]]

والحل (الكود تحت): [[double(5)]] = 10 و [[triple(5)]] = 15. وفي memo أول [[square(4)]] بتحسب وترجّع 16، والتانية بتطبع «من الكاش» قبل ما ترجّع 16.`,
          solCode: R`func makeMultiplier(factor int) func(int) int {
  return func(n int) int { return n * factor }
}

func memo() func(int) int {
  cache := map[int]int{}
  return func(n int) int {
    if v, ok := cache[n]; ok {
      fmt.Println("من الكاش")
      return v
    }
    cache[n] = n * n
    return cache[n]
  }
}`
        }
      ]
    },
    {
      t: "البيانات: slices و maps و structs و pointers",
      l: 1,
      n: "array و slice وإزاي بيكبروا، والفخ بتاع الذاكرة المشتركة، و map، والـ pointers، و struct و methods، و embedding بدل الوراثة",
      items: [
        {
          cmd: "المصفوفات والـ Slices والـ Maps في Go",
          title: "array و slice: الفرق بينهم، و len و cap و append",
          desc: R`[[[3]int]] ده array: حجمه ثابت وجزء من النوع نفسه ([[[3]int]] و [[[4]int]] نوعين مختلفين). ولما تعمل [[b := a]] بيتنسخ كله. عشان كده نادرًا ما هتستخدمه مباشرة.

[[[]int]] (من غير رقم) ده slice، واللي هتستخدمه في ٩٩٪ من الوقت. الـ slice «شبّاك» على array مستخبي تحت (backing array)، وجوّاه ٣ حاجات: pointer لأول عنصر، و [[len]] (عدد العناصر اللي فيه)، و [[cap]] (المساحة المتاحة في الـ array اللي تحت من أول الشبّاك).

بتعمل slice بكذا طريقة:
• [[[]string{"a", "b"}]]: بقيم. الأقواس [[{ }]] هنا معناها «القيم الأولية»، مش block كود.
• [[make([]int, 0, 10)]]: فاضية (len 0) بمساحة 10 (cap). لو عارف الحجم تقريبًا ده بيوفّر.
• [[var s []int]]: nil slice، و len بتاعها 0، و append عليها شغالة عادي.

[[append(s, x)]] بتضيف في الآخر وبترجّع slice جديدة، فلازم تكتب [[s = append(s, x)]]. لو فيه مساحة (len < cap) بتكتب في نفس الـ array. لو مفيش بتعمل array أكبر (تقريبًا الضعف للصغيرة) وتنسخ القديم فيه.

القص: [[s[1:3]]] من العنصر 1 لحد قبل 3. و [[s[:2]]] من الأول، و [[s[3:]]] لحد الآخر.`,
          example: R`package main

import "fmt"

func main() {
  // array: الحجم جزء من النوع، والتعيين بينسخ كله
  arr := [3]int{10, 20, 30}
  copyArr := arr
  copyArr[0] = 99
  fmt.Println(arr, copyArr, len(arr))

  var s []int
  fmt.Println(s == nil, len(s), cap(s))
  for i := range 5 {
    s = append(s, i*10)
    fmt.Println(len(s), cap(s))
  }
  fmt.Println(s, s[1:3], s[:2], s[3:])

  names := make([]string, 0, 10)
  names = append(names, "Ali", "Sara")
  fmt.Println(names, len(names), cap(names))
}`,
          try: R`اعمل slice بـ [[make([]int, 3)]] (من غير cap) واعمل append لـ 1 عليها، واطبعها. هتلاقي إيه في أولها؟ وبعدين جرّب [[s[5]]] على slice طولها 3 واقرا رسالة الـ panic.`,
          flag: "script",
          deep: {
            why: R`الـ slice هي أكتر نوع بيانات هتستخدمه في Go: نتايج query، وقايمة طلبات، وأسطر ملف. ولو مش فاهم len و cap و append هتقع في أخطاء غريبة: عناصر بتتغيّر لوحدها، أو أصفار في أول القايمة.`,
            how: R`الـ slice header نفسه (pointer و len و cap) حجمه صغير (24 بايت)، وده اللي بيتنسخ لما تبعت slice لدالة، مش العناصر. فالدالة تقدر تعدّل [[s[0]]] وتشوف التعديل بره، بس لو عملت append جوّاها والـ array اتغيّر، اللي بره مش هيشوف العنصر الجديد. عشان كده الدوال اللي بتضيف بترجّع الـ slice.

الـ cap في المثال بيبقى 1 ثم 2 ثم 4 ثم 4 ثم 8: لما المساحة تخلص، append بتعمل array ضعف الحجم. للـ slices الكبيرة (فوق 256 عنصر) النمو بيقل تدريجيًا لحد حوالي 1.25 مرة.

[[make([]int, 3)]] بتعمل slice فيها 3 أصفار (len = 3)، فـ append بتضيف بعدهم: [[[0 0 0 1]]]. لو عايز فاضية بمساحة: [[make([]int, 0, 3)]].

الوصول لعنصر بره الطول بيعمل panic: [[index out of range [5] with length 3]]. Go بتشيك على الحدود دايمًا، فمفيش قراية ذاكرة غلط زي C.`,
            when: R`slice لأي قايمة. array لما الحجم ثابت ومعروف (مفتاح تشفير [[[32]byte]]، أو إحداثيات). و [[make]] مع cap لما تعرف العدد تقريبًا (مثلًا بتحوّل 1000 صف لـ 1000 struct).`,
            mistakes: R`تكتب [[append(s, x)]] من غير [[s =]]: الـ compiler بيرفضها ([[append(s, x) (value of type []int) is not used]])، بس [[t := append(s, x)]] وبعدين تكمّل على s بتعدّي وتلخبطك. و [[make([]int, n)]] وبعدين append فتلاقي n أصفار في الأول. وتفترض إن الدالة اللي عملت append على slice جاتلها غيّرت الـ slice الأصلية.`
          },
          lines: [
            "باكدج main.",
            "import fmt.",
            "main.",
            R`array من 3 أرقام. [[{ }]] هنا القيم الأولية.`,
            "تعيين = نسخة كاملة.",
            "التعديل على النسخة بس.",
            "الأصلي متغيّرش.",
            R`nil slice: موجودة ومفيهاش حاجة.`,
            "true 0 0.",
            "5 لفّات.",
            "ضيف في الآخر، وخزّن النتيجة في s.",
            "len و cap بعد كل إضافة.",
            "قفلة.",
            R`الكل، ومن 1 لقبل 3، وأول اتنين، ومن 3 للآخر.`,
            R`فاضية بمساحة 10.`,
            R`append بتاخد أكتر من قيمة.`,
            "2 عنصر ومساحة 10.",
            "قفلة."
          ],
          sol: R`الناتج:
[[[10 20 30] [99 20 30] 3]]
[[true 0 0]]
[[1 1]]
[[2 2]]
[[3 4]]
[[4 4]]
[[5 8]]
[[[0 10 20 30 40] [10 20] [0 10] [30 40]]]
[[[Ali Sara] 2 10]]

وفي التجربة: [[make([]int, 3)]] + append بتطلع [[[0 0 0 1]]]، و [[s[5]]] بتعمل [[panic: runtime error: index out of range [5] with length 3]] والبرنامج بيقع ومعاه رقم السطر.`
        },
        {
          cmd: "copy و slices",
          title: "slice من slice بيشاركوا نفس الذاكرة: copy والباكدج slices",
          desc: R`أهم فخ في الـ slices: [[b := a[1:3]]] مش نسخة. b شبّاك على نفس الـ array بتاع a، فلو غيّرت [[b[0]]] هتلاقي [[a[1]]] اتغيّر.

والأسوأ: [[append]] على b. لو b فيها مساحة (cap أكبر من len) هتكتب العنصر الجديد فوق عنصر موجود في a من غير ما تحس.

الحلول:
• [[copy(dst, src)]]: بتنسخ العناصر من src لـ dst (لحد أصغر طول فيهم) وترجّع عدد اللي اتنسخ. dst لازم تبقى محجوزة بالطول الصح ([[make([]int, len(src))]]).
• [[slices.Clone(s)]]: نسخة مستقلة في سطر.
• [[s[low:high:max]]]: القص بـ 3 أرقام بيحدد الـ cap، فأي append بعدها بتعمل array جديد.

الباكدج [[slices]] (من Go 1.21) فيها اللي كنت بتكتبه بإيدك: [[slices.Sort]] و [[slices.Contains]] و [[slices.Index]] و [[slices.Max]] و [[slices.Reverse]] و [[slices.Equal]] (عشان [[==]] مش شغالة بين slices) و [[slices.SortFunc]] بدالة مقارنة.`,
          example: R`package main

import (
  "fmt"
  "slices"
)

func main() {
  a := []int{1, 2, 3, 4, 5}
  b := a[1:3]
  b[0] = 99
  fmt.Println(a, b, len(b), cap(b))

  // b فيها مساحة، فالـ append بتكتب فوق a[3]
  b = append(b, 77)
  fmt.Println(a)

  c := make([]int, len(a))
  n := copy(c, a)
  c[0] = -1
  fmt.Println(n, a[0], c[0])

  d := slices.Clone(a[:2])
  d = append(d, 1000)
  fmt.Println(a, d)

  nums := []int{5, 2, 8, 1}
  slices.Sort(nums)
  fmt.Println(nums, slices.Contains(nums, 8), slices.Index(nums, 5), slices.Max(nums))
}`,
          try: R`اكتب دالة [[removeAt(s []int, i int) []int]] بتشيل عنصر من مكانه. جرّبها على [[a := []int{1, 2, 3, 4}]] بـ [[r := removeAt(a, 1)]] واطبع a و r. هتلاقي a اتغيّرت. صلّحها بحيث a متتلمسش، وبعدين قارن بـ [[slices.Delete]].`,
          flag: "script",
          deep: {
            why: R`الـ bug ده بيحصل في الكود الحقيقي: دالة بتاخد جزء من slice وتضيف عليه، فداتا في مكان تاني تتغيّر. مفيش error ومفيش crash، بس رقم غلط في تقرير. لو فهمت الصورة (كلهم شبابيك على نفس الـ array) هتعرف إمتى تنسخ.`,
            how: R`a عندها array من 5 عناصر. [[b := a[1:3]]] بيبدأ من العنصر 1، فـ len = 2 و cap = 4 (من 1 لآخر الـ array). [[b = append(b, 77)]] لقت مساحة، فكتبت في الخانة اللي بعد b، اللي هي [[a[3]]].

[[slices.Clone(a[:2])]] عملت array جديد بالظبط على قد العنصرين، فأي append بعدها بتعمل array تالت، و a مش بتتأثر.

[[slices.Sort]] بترتّب في مكانها (in place) ومبترجّعش حاجة. [[slices.Index]] بترجّع -1 لو مش موجود. و [[slices.Max]] بتعمل panic على slice فاضية.

لاحظ إن الـ string برضه بيتقص بنفس الطريقة ([[s[2:5]]]) بس مفيش مشكلة هنا لأن الـ strings مبتتغيرش.`,
            when: R`انسخ ([[slices.Clone]] أو copy) لما تخزّن slice جاتلك من بره في struct، أو ترجّع جزء من داتا داخلية لحد بره، أو تعمل append على جزء مقصوص. واستخدم باكدج slices بدل ما تكتب loops للبحث والترتيب.`,
            mistakes: R`[[copy(dst, src)]] و dst طولها 0 ([[var dst []int]] أو [[make([]int, 0, n)]]): بتنسخ صفر عناصر. و [[a == b]] بين slices: compile error، استخدم [[slices.Equal]]. وتحتفظ بـ slice صغيرة مقصوصة من slice ضخمة (ملف 100 ميجا): الـ array الكبير كله بيفضل في الذاكرة طول ما الصغيرة عايشة، فانسخها.`
          },
          lines: [
            "باكدج main.",
            "imports.",
            "fmt.",
            R`[[slices]]: دوال جاهزة للـ slices.`,
            "قفلة.",
            "main.",
            "slice فيها 5.",
            "شبّاك على العنصرين 1 و 2، مش نسخة.",
            "التعديل بيوصل لـ a.",
            R`a بقت [[[1 99 3 4 5]]]، و len(b) = 2 و cap(b) = 4.`,
            "append لقت مساحة...",
            R`...فـ a بقت [[[1 99 3 77 5]]].`,
            R`slice بنفس الطول.`,
            "انسخ العناصر، و n عددهم.",
            "عدّل النسخة.",
            "5 و 1 و -1: الأصل متغيّرش.",
            "نسخة مستقلة من أول اتنين.",
            "append عليها مش بتلمس a.",
            "اطبعهم.",
            "slice أرقام.",
            "رتّبها في مكانها.",
            R`[[[1 2 5 8]]]، و true، و 2، و 8.`,
            "قفلة."
          ],
          sol: R`الناتج:
[[[1 99 3 4 5] [99 3] 2 4]]
[[[1 99 3 77 5]]]
[[5 1 -1]]
[[[1 99 3 77 5] [1 99 1000]]]
[[[1 2 5 8] true 2 8]]

[[removeAt]] بالشكل الساذج [[append(s[:i], s[i+1:]...)]] بيرجّع [[[1 3 4]]] بس a بتبقى [[[1 3 4 4]]]: الـ append كتبت فوق الـ array بتاع a. الحل إنك تعمل slice جديدة (الكود تحت). و [[slices.Delete(a, 1, 2)]] كمان بتعدّل a في مكانها (بتزق العناصر وبتصفّر الخانة الأخيرة)، فاستخدمها لما تكون عايز ده.`,
          solCode: R`func removeAt(s []int, i int) []int {
  out := make([]int, 0, len(s)-1)
  out = append(out, s[:i]...)
  return append(out, s[i+1:]...)
}`
        },
        {
          cmd: "maps",
          title: "map: مفتاح وقيمة، و comma ok، والترتيب اللي بيتغيّر كل مرة",
          desc: R`[[map[string]int]] جدول مفتاح وقيمة: المفتاح string والقيمة int. البحث والإضافة والمسح سريعين في المتوسط مهما كبر الـ map.

• [[m := map[string]int{"apple": 5}]] بقيم، أو [[make(map[string]int)]] فاضي.
• [[m["mango"] = 12]] إضافة أو تعديل.
• [[m["kiwi"]]] لمفتاح مش موجود مش error: بيرجّع القيمة الصفرية (0).
• عشان تفرّق بين «مش موجود» و «موجود وقيمته صفر»: [[v, ok := m["kiwi"]]]. ok بتبقى false لو مش موجود. ده اسمه «comma ok».
• [[delete(m, key)]] و [[len(m)]].
• [[for k, v := range m]]: الترتيب عشوائي ومتعمّد يتغيّر من تشغيل للتاني، عشان محدش يعتمد عليه. لو محتاج ترتيب: رتّب المفاتيح الأول [[slices.Sorted(maps.Keys(m))]] (Go 1.23+).

المفتاح لازم يبقى نوع ينفع يتقارن بـ [[==]]: string و int و bool و struct فيه الأنواع دي. slice أو map مينفعوش يبقوا مفتاح.

والـ map اللي متعرّف بـ [[var m map[string]int]] من غير make بيبقى nil: القراية منه شغالة وبترجّع صفر، بس الكتابة فيه بتعمل panic.`,
          example: R`package main

import (
  "fmt"
  "maps"
  "slices"
)

func main() {
  stock := map[string]int{"apple": 5, "banana": 0}
  stock["mango"] = 12
  stock["apple"] += 3

  fmt.Println(stock["apple"], stock["kiwi"])
  qty, ok := stock["banana"]
  fmt.Println(qty, ok)
  if _, ok := stock["kiwi"]; !ok {
    fmt.Println("kiwi مش موجود")
  }

  delete(stock, "banana")
  fmt.Println(len(stock))

  for _, k := range slices.Sorted(maps.Keys(stock)) {
    fmt.Println(k, stock[k])
  }

  counts := make(map[string]int)
  for _, w := range []string{"go", "is", "go"} {
    counts[w]++
  }
  fmt.Println(counts)

  var empty map[string]int
  fmt.Println(empty["x"], len(empty))
}`,
          try: R`اكتب [[empty["x"] = 1]] في آخر main وشغّل واقرا الـ panic. وبعدين اكتب برنامج بياخد جملة ويطبع كل كلمة وعدد مرات ظهورها، مترتبين من الأكتر للأقل (استخدم [[strings.Fields]] و [[slices.SortFunc]]).`,
          flag: "script",
          deep: {
            why: R`الـ map هو الكاش، والعدّاد، والـ index السريع (بدل ما تلف على slice كلها تدوّر على user بالـ id)، وإزالة التكرار. هتستخدمه في كل برنامج تقريبًا.`,
            how: R`[[stock["kiwi"]]] بيرجّع 0، و [[stock["banana"]]] بيرجّع 0 برضه. من غير comma ok مش هتعرف تفرّق. [[!ok]]: الـ [[!]] معناها «مش».

[[counts[w]++]] شغالة من غير ما تشيك: لو المفتاح مش موجود القيمة صفر، فبتبقى 1.

[[fmt.Println]] بتطبع الـ map بمفاتيح مترتبة (عشان الناتج يبقى ثابت)، بس [[range]] مش بيرتّب.

الـ map بيتبعت للدوال كمرجع: لو الدالة عدّلت فيه، التعديل بيبان بره.

الـ map مش آمن مع أكتر من goroutine بيكتبوا في نفس الوقت: الـ runtime بيكتشف ده ويوقف البرنامج كله بـ [[fatal error: concurrent map writes]]. الحل Mutex (المستوى ٢) أو [[sync.Map]] في حالات معينة.

ولو القيمة struct مينفعش تعدّل حقل جوّاه مباشرة: [[m["a"].Count++]] compile error. اقرا القيمة في متغير، عدّلها، ورجّعها، أو خلي القيمة pointer [[map[string]*Item]].`,
            when: R`بحث سريع بالمفتاح (users بالـ id)، وعدّ التكرار، وإزالة التكرار ([[map[string]bool]] أو [[map[string]struct{}]] اللي مبياخدش مساحة للقيمة)، والتجميع (group by).`,
            mistakes: R`تكتب في nil map: [[panic: assignment to entry in nil map]] (حصلت كتير في structs فيها map محدش عمله make). وتعتمد على ترتيب range فالاختبار ينجح مرة ويفشل مرة. وتعمل [[if m[k] == 0]] وانت تقصد «مش موجود». وتكتب في map من أكتر من goroutine.`
          },
          lines: [
            "باكدج main.",
            "imports.",
            "fmt.",
            R`[[maps]]: دوال للـ maps.`,
            "slices، عشان الترتيب.",
            "قفلة.",
            "main.",
            "map بقيمتين أوليين.",
            "إضافة مفتاح جديد.",
            R`تعديل: [[+=]] على القيمة الموجودة (5 + 3).`,
            "8، و kiwi مش موجود فبيرجّع 0 من غير error.",
            "comma ok: القيمة وهل موجود.",
            "0 true: موجود وقيمته صفر.",
            "comma ok في جملة تمهيدية، و ok هنا false.",
            "اطبع.",
            "قفلة.",
            "امسح مفتاح.",
            "2: apple و mango.",
            "المفاتيح مترتبة أبجديًا.",
            "اطبع المفتاح والقيمة.",
            "قفلة.",
            "map فاضي بـ make.",
            "لف على الكلمات.",
            "زوّد العدّاد: المفتاح الجديد بيبدأ من صفر.",
            "قفلة.",
            R`[[map[go:2 is:1]]].`,
            "nil map: متعرّف من غير make.",
            "القراية منه شغالة: 0 0.",
            "قفلة."
          ],
          sol: R`الناتج:
[[8 0]]
[[0 true]]
[[kiwi مش موجود]]
[[2]]
[[apple 8]]
[[mango 12]]
[[map[go:2 is:1]]]
[[0 0]]

و [[empty["x"] = 1]] بتعمل [[panic: assignment to entry in nil map]]. الحل [[empty = make(map[string]int)]] قبلها.

وعدّ الكلمات (الكود تحت): بنحط المفاتيح في slice ونرتّبها بـ [[slices.SortFunc]] بدالة بترجّع رقم سالب لو a قبل b. [[cmp.Compare(counts[b], counts[a])]] بالعكس عشان الأكبر الأول. والكلمات اللي ليها نفس العدد (go و is) ترتيبها بينهم مش ثابت، ولو عايزه ثابت قارن بالكلمة نفسها لما العدد يتساوى.`,
          solCode: R`counts := map[string]int{}
for _, w := range strings.Fields("go is simple and go is fast") {
  counts[w]++
}
words := slices.Collect(maps.Keys(counts))
slices.SortFunc(words, func(a, b string) int {
  return cmp.Compare(counts[b], counts[a])
})
for _, w := range words {
  fmt.Println(w, counts[w])
}`
        },
        {
          cmd: "& و * (pointers)",
          title: "الـ pointer: & بتجيب العنوان و * بتوصل للقيمة",
          desc: R`Go بتبعت كل حاجة للدوال بالقيمة: الدالة بتاخد نسخة. فلو [[doubleValue(x)]] غيّرت n جوّاها، x بره مش هيتغيّر.

الـ pointer متغير فيه عنوان متغير تاني في الذاكرة بدل القيمة نفسها:
• [[&x]]: «عنوان x». النتيجة نوعها [[*int]] (pointer لـ int).
• [[*p]]: «القيمة اللي في العنوان ده». بتقرا منها وتكتب فيها: [[*p = 100]] بتغيّر x نفسه.
• [[*int]] في تعريف النوع معناها «pointer لـ int». نفس الرمز [[*]] بمعنيين: في النوع «pointer لـ»، وقدام متغير «القيمة اللي بيشاور عليها».

القيمة الصفرية للـ pointer هي [[nil]] (مش بيشاور على حاجة). لو عملت [[*p]] و p بـ nil البرنامج بيقع بـ [[nil pointer dereference]].

مع الـ structs مش محتاج تكتب [[(*p).Name]]: [[p.Name]] بتشتغل لوحدها.

ومفيش في Go حسابات على العناوين ([[p + 1]]) زي C، فالـ pointers آمنة. وترجيع [[&c]] لمتغير محلي من دالة آمن تمامًا: الـ compiler بيلاحظ وبيحطه في مكان بيعيش بعد الدالة (escape analysis).`,
          example: R`package main

import "fmt"

func doubleValue(n int) {
  n *= 2
}

func doublePointer(n *int) {
  *n *= 2
}

func newCounter() *int {
  c := 0
  return &c
}

func main() {
  x := 10
  doubleValue(x)
  fmt.Println(x)
  doublePointer(&x)
  fmt.Println(x)

  p := &x
  *p = 100
  fmt.Println(x, *p, p != nil)

  c := newCounter()
  *c++
  fmt.Println(*c)

  var missing *int
  fmt.Println(missing == nil)
}`,
          try: R`اكتب [[swap(a, b *int)]] بتبدّل قيمتين، وجرّبها على متغيرين. وبعدين اكتب [[fmt.Println(*missing)]] في آخر main واقرا الـ panic كله، خصوصًا السطر اللي فيه [[main.go]].`,
          flag: "script",
          deep: {
            why: R`هتقابل الـ pointers في Go كل يوم: [[*http.Request]] و [[*sql.DB]] و [[json.Unmarshal(data, &v)]] و methods بتعدّل الـ struct. ومن غير ما تفهم & و * مش هتفهم ليه التعديل وصل في مكان ومش وصل في مكان تاني.`,
            how: R`[[n *= 2]] معناها [[n = n * 2]]. في doubleValue الـ n نسخة، ففي doublePointer الـ n عنوان، و [[*n *= 2]] بتضرب القيمة اللي في العنوان.

[[p := &x]]: p نوعها [[*int]]. [[*p = 100]] كتبت في x. و [[p != nil]] true لأنها بتشاور على حاجة.

[[*c++]] بتزوّد القيمة اللي c بيشاور عليها (مش العنوان).

الـ pointer مش أسرع دايمًا: نسخ struct صغير (كام حقل) غالبًا أرخص من pointer، لأن الـ pointer ممكن يخلي المتغير يروح الـ heap ويزوّد شغل الـ garbage collector. القاعدة: pointer لما محتاج تعدّل، أو الـ struct كبير، أو محتاج «مفيش قيمة» (nil).

[[new(int)]] بيعمل int جديد بصفر ويرجّع عنوانه، زي [[c := 0; return &c]].`,
            when: R`لما الدالة لازم تعدّل حاجة جاتلها (Unmarshal و Scan بياخدوا pointers للسبب ده). و structs كبيرة أو فيها Mutex. و حقل اختياري في JSON ([[*string]] عشان تفرّق بين "" و مش موجود). والـ slices والـ maps مش محتاجين pointer عشان تعدّل عناصرهم.`,
            mistakes: R`[[*p]] و p بـ nil: [[panic: runtime error: invalid memory address or nil pointer dereference]]، وأشهر سبب: struct جاي من دالة رجّعت [[nil, err]] وانت متشيكتش على err. وتنسى & في [[json.Unmarshal(data, v)]] فيطلع [[json: Unmarshal(non-pointer main.User)]]. وتعمل pointer لكل حاجة «عشان السرعة».`
          },
          lines: [
            "باكدج main.",
            "import fmt.",
            "بتاخد نسخة من الرقم.",
            "بتعدّل النسخة بس.",
            "قفلة.",
            R`بتاخد عنوان: [[*int]] = pointer لـ int.`,
            R`[[*n]]: القيمة اللي في العنوان، اضربها في 2.`,
            "قفلة.",
            "بترجّع pointer.",
            "متغير محلي.",
            R`رجّع عنوانه بـ [[&]]: آمن في Go.`,
            "قفلة.",
            "main.",
            "x = 10.",
            "بعتنا نسخة...",
            "...فـ x لسه 10.",
            R`بعتنا العنوان بـ [[&x]]...`,
            "...فـ x بقى 20.",
            "p بيشاور على x.",
            "الكتابة في العنوان = الكتابة في x.",
            "100 100 true.",
            "pointer لعدّاد جديد.",
            "زوّد القيمة اللي بيشاور عليها.",
            "1.",
            R`pointer من غير قيمة: [[nil]].`,
            "true.",
            "قفلة."
          ],
          sol: R`الناتج:
[[10]]
[[20]]
[[100 100 true]]
[[1]]
[[true]]

[[swap]] (الكود تحت) بتبدّل القيمتين في السطر [[*a, *b = *b, *a]]، وبتتنادى [[swap(&x, &y)]].

و [[*missing]] بتطبع:
[[panic: runtime error: invalid memory address or nil pointer dereference]]
[[[signal SIGSEGV: segmentation violation code=... addr=0x0 pc=...]]]
وتحت [[goroutine 1 [running]:]] و [[main.main()]] وسطر زي [[/src/main.go:30 +0x...]]: ده رقم السطر اللي وقع. اقرا الـ stack trace من فوق لتحت ودوّر على أول سطر من ملفاتك انت.`,
          solCode: R`func swap(a, b *int) {
  *a, *b = *b, *a
}

x, y := 1, 2
swap(&x, &y)
fmt.Println(x, y)`
        },
        {
          cmd: "الـ Structs والـ Methods والـ Pointers",
          title: "struct و methods: value receiver ولا pointer receiver؟",
          desc: R`Go مفيهاش classes. بدلها [[struct]]: نوع بيجمع حقول بأسماء، و methods: دوال مربوطة بالنوع.

[[type User struct { Name string; Score int }]]. الحقل اللي اسمه بيبدأ بحرف كبير exported (متاح بره الباكدج، وده اللي encoding/json بيشوفه)، والصغير خاص بالباكدج.

بتعمل قيمة بـ [[User{Name: "Sara", Score: 10}]] (الحقول اللي متكتبتش بتاخد القيمة الصفرية). ولو عايز pointer على طول: [[&User{...}]].

الـ method دالة قبل اسمها receiver بين قوسين:
• [[func (u User) Label() string]]: value receiver. u نسخة، وأي تعديل عليها بيضيع.
• [[func (u *User) AddPoints(n int)]]: pointer receiver. u بيشاور على الـ struct الأصلي، فالتعديل بيوصل.

Go مفيهاش constructors. العرف دالة اسمها [[NewUser(...)]] بترجّع [[*User]] جاهز، لو فيه حاجة لازم تتجهز (map أو قيم افتراضية).

ولو عندك [[u]] قيمة عادية وناديت [[u.AddPoints(5)]]، Go بتكتبها لوحدها [[(&u).AddPoints(5)]].`,
          example: R`package main

import "fmt"

type User struct {
  Name  string
  Email string
  Score int
}

func NewUser(name, email string) *User {
  return &User{Name: name, Email: email}
}

func (u User) Label() string {
  return fmt.Sprintf("%s (%d)", u.Name, u.Score)
}

func (u *User) AddPoints(pts int) {
  u.Score += pts
}

// value receiver: u نسخة، فالتصفير ده مش هيوصل
func (u User) ResetWrong() {
  u.Score = 0
}

func main() {
  u := User{Name: "Sara", Email: "sara@example.com", Score: 10}
  u.AddPoints(5)
  u.ResetWrong()
  fmt.Println(u.Label())

  p := NewUser("Ali", "ali@example.com")
  p.AddPoints(3)
  fmt.Println(p.Label(), p.Email)

  var empty User
  fmt.Printf("%+v\n", empty)
}`,
          try: R`ضيف struct اسمه [[Cart]] فيه [[Items []Item]] (و Item فيه Name و Price و Qty)، و method [[Add(item Item)]] بتضيف، و [[Total() float64]] بتحسب الإجمالي. قرّر أنهي فيهم pointer receiver وليه. وبعدين خلي Add value receiver وشوف إيه اللي هيحصل.`,
          flag: "script",
          deep: {
            why: R`الـ struct هو الطريقة اللي بتوصف بيها أي حاجة في البرنامج: User و Order و Config و Server. وقرار value ولا pointer receiver بيحدد إذا كانت الـ method بتعدّل ولا لأ، وده أكتر سؤال بيتسأل في انترفيوهات Go.`,
            how: R`[[u.ResetWrong()]] خدت نسخة من u وصفّرتها، والنسخة اتمسحت لما الدالة خلصت، فـ u لسه 15. go vet مش بيمسك ده، فخلي بالك.

[[NewUser]] بترجّع [[&User{...}]]: عنوان struct جديد. و [[p.AddPoints(3)]] و [[p.Label()]] الاتنين شغالين على pointer: Go بتعمل [[*p]] لوحدها للـ value receiver.

القواعد اللي الناس ماشية عليها:
• لو أي method بتعدّل، خلي كل الـ methods pointer receivers (التوحيد بيمنع لخبطة الـ interfaces بعدين).
• struct فيه [[sync.Mutex]] لازم pointer receiver (نسخ الـ Mutex بيكسره، و go vet بيمسك ده).
• struct صغير ومبيتغيرش (زي [[time.Time]] أو نقطة x و y) value receiver تمام.

[[%+v]] على struct فاضي: [[{Name: Email: Score:0}]] (النصوص الفاضية مش باينة).`,
            when: R`pointer receiver: أي method بتعدّل، أو الـ struct كبير، أو فيه Mutex أو حاجة مينفعش تتنسخ. value receiver: أنواع صغيرة immutable. و [[NewX]] لما الـ struct محتاج تجهيز (map أو قيم افتراضية أو validation).`,
            mistakes: R`تعدّل في value receiver وتستغرب إن التعديل ضاع. وتخلط: نص الـ methods value ونصها pointer. وتعمل [[NewUser]] للـ structs اللي القيمة الصفرية بتاعتها جاهزة أصلًا. وتنسى تعمل make للـ map اللي جوه struct فيقع في أول كتابة.`
          },
          lines: [
            "باكدج main.",
            "import fmt.",
            "تعريف نوع struct اسمه User.",
            "حقل exported (حرف كبير).",
            "حقل تاني.",
            "حقل رقم.",
            "قفلة.",
            R`constructor بالعرف: بترجّع [[*User]].`,
            R`[[&User{...}]]: struct جديد وعنوانه. Score صفر لأنه متكتبش.`,
            "قفلة.",
            R`method بـ value receiver: [[(u User)]].`,
            "بترجّع نص فيه الاسم والنقاط.",
            "قفلة.",
            R`method بـ pointer receiver: [[(u *User)]].`,
            R`بتعدّل الـ struct الأصلي ([[u.Score]] = [[(*u).Score]]).`,
            "قفلة.",
            "value receiver بيحاول يعدّل.",
            "بيصفّر نسخة.",
            "قفلة.",
            "main.",
            "struct literal بأسماء الحقول.",
            R`Go بتحوّلها [[(&u).AddPoints(5)]]: Score بقى 15.`,
            "مش هتأثر.",
            R`[[Sara (15)]].`,
            "pointer من الـ constructor.",
            "3 نقاط.",
            R`[[Ali (3) ali@example.com]].`,
            "struct بالقيم الصفرية.",
            R`[[%+v]] بأسماء الحقول.`,
            "قفلة."
          ],
          sol: R`الناتج:
[[Sara (15)]]
[[Ali (3) ali@example.com]]
[[{Name: Email: Score:0}]]

في الـ Cart (الكود تحت): [[Add]] لازم pointer receiver لأنها بتعمل append على Items، و [[Total]] ممكن تبقى value بس الأحسن تبقى pointer عشان التوحيد. لو خليت Add value receiver: الإضافة بتحصل على نسخة، فـ [[Total()]] هترجّع 0 والـ Items فاضية.`,
          solCode: R`type Item struct {
  Name  string
  Price float64
  Qty   int
}

type Cart struct {
  Items []Item
}

func (c *Cart) Add(it Item) {
  c.Items = append(c.Items, it)
}

func (c *Cart) Total() float64 {
  total := 0.0
  for _, it := range c.Items {
    total += it.Price * float64(it.Qty)
  }
  return total
}`
        },
        {
          cmd: "embedding",
          title: "embedding: تحط struct جوه struct بدل الوراثة",
          desc: R`Go مفيهاش وراثة (inheritance). بدلها embedding: تحط نوع جوه struct من غير اسم حقل:
[[type Admin struct { User; Level int }]]

النتيجة: حقول و methods الـ User بتطلع لمستوى Admin (promoted). تكتب [[a.Name]] و [[a.Greet()]] بدل [[a.User.Name]]. والطريق الطويل لسه موجود.

لو Admin عرّف method بنفس الاسم ([[Greet]])، بتاعته هي اللي بتتنادى، وتقدر توصل للأصلية بـ [[a.User.Greet()]].

بس ده مش وراثة: Admin مش User. مينفعش تبعت Admin لدالة مستنية User. اللي يخليه يتعامل كأنه حاجة تانية هو الـ interfaces (المستوى ٢): لو Admin عنده الـ methods المطلوبة، بيحقق الـ interface.

وبتلاقي embedding كتير في المكتبة القياسية: struct فيه [[sync.Mutex]] embedded فتكتب [[c.Lock()]] على طول، أو interfaces بتتجمع من بعض ([[io.ReadWriter]] = Reader + Writer).`,
          example: R`package main

import "fmt"

type Audit struct {
  CreatedBy string
}

func (a Audit) Describe() string {
  return "created by " + a.CreatedBy
}

type User struct {
  Name string
}

func (u User) Greet() string {
  return "أهلًا " + u.Name
}

type Admin struct {
  User
  Audit
  Level int
}

// Admin بيغطّي Greet بتاعة User، ولسه يقدر يناديها
func (a Admin) Greet() string {
  return a.User.Greet() + " (admin)"
}

func main() {
  a := Admin{
    User:  User{Name: "Mona"},
    Audit: Audit{CreatedBy: "system"},
    Level: 2,
  }
  fmt.Println(a.Name, a.Level)
  fmt.Println(a.Greet())
  fmt.Println(a.User.Greet())
  fmt.Println(a.Describe())
}`,
          try: R`ضيف لـ Audit method اسمها [[Greet()]] كمان، وشيل Greet بتاعة Admin. شغّل واقرا الـ error. وبعدين اكتب دالة [[welcome(u User)]] وجرّب تبعتلها [[a]] ثم [[a.User]].`,
          flag: "script",
          deep: {
            why: R`الوراثة العميقة (A يورث B يورث C) بتعمل كود صعب تتبعه وتغيّره. Go اختارت composition: تبني النوع من أجزاء صغيرة، وكل جزء ليه شغلانة واضحة، والـ interfaces هي اللي بتوحّد السلوك.`,
            how: R`الحقل الـ embedded اسمه هو اسم النوع: [[a.User]] و [[a.Audit]]. عشان كده في الـ literal بتكتب [[User: User{...}]].

لما Go تدوّر على [[a.Greet]] بتبدأ من Admin نفسه، ولو ملقتش تنزل مستوى (User و Audit). لو لقت نفس الاسم في نوعين على نفس المستوى، ومفيش واحد في Admin نفسه يحسم، بيبقى ambiguous: الـ compiler بيرفض الاستدعاء ([[ambiguous selector a.Greet]]) بس مش بيرفض التعريف.

الـ method اللي اتطلعت لفوق لسه الـ receiver بتاعها User، مش Admin. فلو User.Greet نادت method تانية، هتنادي بتاعة User حتى لو Admin عامل واحدة بنفس الاسم. ده الفرق الأساسي عن الوراثة (مفيش virtual methods).

الفاصلة في آخر كل سطر في الـ literal اللي على أكتر من سطر إجبارية (حتى آخر واحد)، عشان الـ compiler بيحط [[;]] لوحده في آخر السطر.`,
            when: R`تشارك حقول وسلوك بين أنواع (timestamps، audit، id). تحط Mutex جوه struct. تلف نوع موجود وتغيّر method واحدة (زي ResponseWriter في الـ middleware، المستوى ٢).`,
            mistakes: R`تفكّر فيها كوراثة وتبعت Admin لدالة مستنية User: [[cannot use a (variable of struct type Admin) as User value]]. وتعمل embed لـ pointer ([[*User]]) وتنسى تديله قيمة فأول وصول يعمل nil pointer panic. وتعمل embed لـ Mutex في struct exported فأي حد بره يقدر يعمل Lock عليه.`
          },
          lines: [
            "باكدج main.",
            "import fmt.",
            "struct صغير لمعلومات الإنشاء.",
            "حقل.",
            "قفلة.",
            "method على Audit.",
            "بترجّع وصف.",
            "قفلة.",
            "struct للمستخدم.",
            "حقل الاسم.",
            "قفلة.",
            "method على User.",
            "ترحيب.",
            "قفلة.",
            "Admin مبني من أجزاء.",
            "User embedded: من غير اسم حقل.",
            "Audit embedded.",
            "حقل عادي.",
            "قفلة.",
            "Admin بيعرّف Greet بتاعته.",
            "بينادي الأصلية ويضيف عليها.",
            "قفلة.",
            "main.",
            "literal على أكتر من سطر.",
            "اسم الحقل الـ embedded = اسم النوع.",
            "نفس الكلام.",
            "والفاصلة في آخر كل سطر إجبارية.",
            "قفلة.",
            R`[[a.Name]] طالع من User.`,
            "بتاعة Admin.",
            "الأصلية بتاعة User.",
            "طالعة من Audit.",
            "قفلة."
          ],
          sol: R`الناتج:
[[Mona 2]]
[[أهلًا Mona (admin)]]
[[أهلًا Mona]]
[[created by system]]

لما Audit و User الاتنين عندهم Greet ومفيش واحدة في Admin: [[a.Greet()]] بيطلع [[ambiguous selector a.Greet]]. الـ compiler مش بيختار بالنيابة عنك، فلازم تكتب [[a.User.Greet()]] أو تعرّف Greet على Admin.

و [[welcome(a)]] بيطلع [[cannot use a (variable of struct type Admin) as User value in argument to welcome]]، و [[welcome(a.User)]] شغالة. يعني Admin مش User.`
        }
      ]
    },
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
    },
    {
      t: "التزامن: goroutines و channels و context",
      l: 2,
      n: "تشغّل شغل بالتوازي بكلمة go وتستناه، وتبعت داتا بين الـ goroutines بالـ channels و select، وتحمي الداتا المشتركة بـ Mutex، وتلغي الشغل بـ context",
      items: [
        {
          cmd: "الـ Goroutines والتزامن الخارق",
          title: "goroutine: تشغّل دالة بالتوازي بكلمة go، وتستناها بـ WaitGroup",
          desc: R`[[go f()]] بتشغّل f في goroutine جديدة وبترجع على طول من غير ما تستنى. الـ goroutine «thread خفيف» بيديره الـ runtime بتاع Go مش نظام التشغيل: بيبدأ بـ stack صغير (حوالي 2KB وبيكبر لو احتاج)، فتقدر تشغّل آلاف أو مئات الآلاف منهم من غير مشكلة. الـ threads العادية في نظام التشغيل أتقل بكتير.

الـ runtime بيوزّع الـ goroutines على عدد threads قد عدد أنوية المعالج ([[GOMAXPROCS]]). ولما goroutine تستنى شبكة أو ملف أو sleep، الـ scheduler بيشغّل غيرها مكانها.

أهم قاعدة: لما main تخلص البرنامج كله بيقفل، حتى لو فيه goroutines لسه شغالة. فلازم تستناهم. أبسط طريقة [[sync.WaitGroup]]:
• [[wg.Add(1)]] قبل ما تشغّل كل goroutine.
• [[defer wg.Done()]] جوّاها: «خلصت».
• [[wg.Wait()]]: استنى لحد ما العدّاد يرجع صفر.
ومن Go 1.25 فيه اختصار: [[wg.Go(func() { ... })]] بيعمل الـ ٣ دول لوحده.

[[go func() { ... }()]]: دالة من غير اسم بتتشغّل goroutine. الـ [[()]] في الآخر بتناديها.

المثال بيعمل ٣ «طلبات» كل واحد بياخد وقت مختلف. بالتوازي الوقت الكلي = أطول واحد (300ms)، مش مجموعهم (600ms).`,
          example: R`package main

import (
  "fmt"
  "sync"
  "time"
)

func fetch(name string, d time.Duration) string {
  time.Sleep(d)
  return name + " done"
}

func main() {
  start := time.Now()
  jobs := map[string]time.Duration{
    "users":  300 * time.Millisecond,
    "orders": 200 * time.Millisecond,
    "stock":  100 * time.Millisecond,
  }

  var wg sync.WaitGroup
  for name, d := range jobs {
    wg.Add(1)
    go func() {
      defer wg.Done()
      fmt.Println(fetch(name, d))
    }()
  }
  wg.Wait()

  elapsed := time.Since(start).Round(100 * time.Millisecond)
  fmt.Println("total:", elapsed)
}`,
          try: R`شيل [[wg.Wait()]] وشغّل: هيطبع إيه؟ وبعدين رجّعه، وغيّر الـ loop تستخدم [[wg.Go(func() { ... })]] بدل Add و Done (محتاج Go 1.25). وبعدين شغّل 100,000 goroutine كل واحدة بتعمل sleep ثانية، واطبع الوقت الكلي.`,
          flag: "script",
          deep: {
            why: R`السيرفرات أغلب وقتها مستنية: داتابيز، أو API تاني، أو ملف. الـ goroutines بتخليك تكتب كود عادي من فوق لتحت (مش callbacks ولا async/await) والـ runtime هو اللي بيشغّل غيره وانت مستني. سيرفر net/http بيشغّل كل request في goroutine لوحده عشان كده.`,
            how: R`[[time.Sleep(d)]] بيوقّف الـ goroutine دي بس مش البرنامج. و [[time.Since(start)]] المدة من start، و [[Round]] بيقرّبها عشان الرقم يبقى نضيف.

ترتيب الطباعة هنا ثابت تقريبًا لأن المدد مختلفة (stock الأول). لكن من غير sleeps مختلفة الترتيب بين الـ goroutines مش مضمون خالص.

الـ closure جوه الـ loop بيستخدم name و d. من Go 1.22 كل لفّة ليها متغيرات جديدة فكل goroutine بتشوف بتاعتها. قبل كده كانوا كلهم ممكن يشوفوا آخر قيمة.

[[wg.Add(1)]] لازم قبل [[go]] مش جوّا الـ goroutine: لو جوّاها ممكن main توصل لـ Wait قبل ما الـ goroutine تلحق تعمل Add، فـ Wait ترجع على طول.

الـ goroutine مبترجّعش قيمة. عشان ترجّع نتيجة استخدم channel (الدرس الجاي) أو اكتب في slice في مكان مختلف لكل goroutine.`,
            when: R`شغل مستقل ممكن يمشي مع بعض: تنادي ٣ APIs مرة واحدة، أو تعالج صور، أو worker في الخلفية بيبعت إيميلات. مش لكل حاجة: لو الشغل صغير جدًا، تكلفة إنشاء الـ goroutine والتنسيق ممكن تبقى أكبر منه.`,
            mistakes: R`main تخلص قبل الـ goroutines فالشغل يضيع من غير error. و [[time.Sleep]] كطريقة للاستنا (هشة: الجهاز البطيء هيفشل). و [[wg.Add]] جوّا الـ goroutine. وتبعت WaitGroup لدالة بالقيمة بدل pointer ([[wg *sync.WaitGroup]]) فـ Done بتشتغل على نسخة و Wait تعلّق للأبد (go vet بيمسكها). و goroutine leak: goroutine مستنية حاجة مش هتيجي أبدًا فبتفضل عايشة.`
          },
          lines: [
            "باكدج main.",
            "imports.",
            "fmt.",
            R`[[sync]]: WaitGroup و Mutex.`,
            "time.",
            "قفلة.",
            "دالة بتمثّل طلب بطيء.",
            "استنى المدة (الـ goroutine دي بس).",
            "رجّع النتيجة.",
            "قفلة.",
            "main.",
            "وقت البداية.",
            "٣ شغلانات بمدد مختلفة.",
            "300ms.",
            "200ms.",
            "100ms.",
            "قفلة.",
            R`WaitGroup بالقيمة الصفرية: جاهز.`,
            "لف.",
            "سجّل goroutine جاية، قبل go.",
            R`شغّل دالة من غير اسم في goroutine: السطر ده بيرجع على طول.`,
            "لما تخلص قول Done مهما حصل.",
            "اعمل الشغل واطبع.",
            R`قفلة الدالة، و [[()]] بتناديها.`,
            "قفلة الـ loop.",
            "استنى لحد ما كلهم يخلصوا.",
            "المدة الكلية مقرّبة.",
            "300ms مش 600ms.",
            "قفلة."
          ],
          sol: R`الناتج:
[[stock done]]
[[orders done]]
[[users done]]
[[total: 300ms]]

من غير [[wg.Wait()]]: بيطبع [[total: 0s]] بس، والـ goroutines بتتقفل مع البرنامج قبل ما تطبع.

بـ [[wg.Go]] (الكود تحت) نفس الناتج بسطور أقل. و 100,000 goroutine بـ sleep ثانية بيخلصوا في حوالي ثانية وشوية (1.3s في تجربتي)، والذاكرة بتزيد كام مية ميجا بالكتير، لأن كل goroutine بتبدأ بـ stack صغير. نفس العدد من threads نظام التشغيل كان هيبقى أتقل بكتير.`,
          solCode: R`var wg sync.WaitGroup
for name, d := range jobs {
  wg.Go(func() {
    fmt.Println(fetch(name, d))
  })
}
wg.Wait()

start := time.Now()
var wg2 sync.WaitGroup
for range 100_000 {
  wg2.Go(func() { time.Sleep(time.Second) })
}
wg2.Wait()
fmt.Println(time.Since(start))`
        },
        {
          cmd: "القنوات Channels والتواصل بين الـ Goroutines",
          title: "channel: أنبوبة بتبعت داتا بين goroutines بأمان، و close و range",
          desc: R`الـ channel أنبوبة ليها نوع: [[ch := make(chan int)]] بتنقل ints. والسهم [[<-]] بيوضّح اتجاه الداتا:
• [[ch <- 5]]: ابعت 5 في الـ channel.
• [[v := <-ch]]: استقبل قيمة من الـ channel.

نوعين:
• unbuffered ([[make(chan int)]]): الإرسال بيستنى لحد ما حد يستقبل، والاستقبال بيستنى لحد ما حد يبعت. يعني الاتنين بيتقابلوا في نفس اللحظة، وده بيزامن الـ goroutines.
• buffered ([[make(chan string, 2)]]): فيها مكان لـ 2. الإرسال مش بيستنى غير لما تتملي.

[[close(ch)]]: «مفيش حاجة تانية جاية». بعدها:
• [[for v := range ch]] بتاخد كل اللي فاضل وتخرج لوحدها.
• [[v, ok := <-ch]]: ok بـ false لما الـ channel مقفولة وفاضية، و v بالقيمة الصفرية.
• الإرسال على channel مقفولة بيعمل panic. عشان كده اللي بيقفل هو اللي بيبعت.

اتجاه في النوع: [[chan<- int]] «للإرسال بس»، و [[<-chan int]] «للاستقبال بس». بتحطهم في parameters الدوال عشان الـ compiler يمنع الغلط.

الشعار المشهور في Go: «Don't communicate by sharing memory; share memory by communicating». بدل ما كذا goroutine يعدّلوا متغير واحد بأقفال، ابعت الداتا في channel وواحد بس يملكها في كل لحظة.`,
          example: R`package main

import "fmt"

func produce(n int, out chan<- int) {
  for i := 1; i <= n; i++ {
    out <- i
  }
  close(out)
}

func square(in <-chan int, out chan<- int) {
  for v := range in {
    out <- v * v
  }
  close(out)
}

func main() {
  nums := make(chan int)
  squares := make(chan int)
  go produce(4, nums)
  go square(nums, squares)
  for s := range squares {
    fmt.Print(s, " ")
  }
  fmt.Println()

  buf := make(chan string, 2)
  buf <- "a"
  buf <- "b"
  fmt.Println(len(buf), cap(buf))
  close(buf)
  fmt.Println(<-buf, <-buf)
  v, ok := <-buf
  fmt.Printf("%q %v\n", v, ok)
}`,
          try: R`شيل [[close(out)]] من square وشغّل واقرا الرسالة. وبعدين اكتب في main [[ch := make(chan int)]] ثم [[ch <- 1]] على طول (من غير goroutine تستقبل). وبعدين ضيف مرحلة تالتة للـ pipeline: [[sum(in <-chan int) int]] بتجمع المربعات.`,
          flag: "script",
          deep: {
            why: R`الـ channels بتحل مشكلتين مع بعض: نقل الداتا بين goroutines، والتزامن (مين يستنى مين). الـ pipeline في المثال (produce ثم square ثم main) بيشتغل كل مرحلة بالتوازي مع التانية، وكل قيمة بتعدّي من مرحلة للي بعدها من غير أي lock.`,
            how: R`main و produce و square شغالين مع بعض. produce بتبعت 1 وتستنى لحد ما square تاخده (unbuffered). square بتربّعه وتبعته وتستنى main. main بتطبعه. وهكذا.

لما produce تخلص بتقفل nums، فالـ range في square يخلص، فتقفل squares، فالـ range في main يخلص. السلسلة دي بتقفل نفسها بالترتيب.

[[len(buf)]] عدد اللي جوّا دلوقتي، و [[cap(buf)]] السعة.

Deadlock: لو كل الـ goroutines مستنية ومفيش حد هيتحرك، الـ runtime بيكتشف ده ويوقف البرنامج بـ [[fatal error: all goroutines are asleep - deadlock!]]. بس ده بيحصل لو كل الـ goroutines واقفة. في سيرفر فيه goroutines تانية شغالة، الـ goroutine اللي علّقت هتفضل معلّقة بصمت (leak).

جدول لازم تحفظه:
• إرسال أو استقبال على nil channel: بيستنى للأبد.
• استقبال من channel مقفولة: القيمة الصفرية فورًا.
• إرسال على مقفولة: panic.
• close لـ channel مقفولة: panic.`,
            when: R`pipelines، و worker pools (المستوى ٣)، وإشارات ([[done chan struct{}]])، ونتايج goroutines. لكن لو كل اللي محتاجه عدّاد أو map مشترك، Mutex أبسط (الدرس الجاي). مش كل حاجة لازم channel.`,
            mistakes: R`تنسى close فالـ range يستنى للأبد. والمستقبِل هو اللي بيقفل فالمرسل يعمل panic. و unbuffered channel في نفس الـ goroutine (إرسال من غير مستقبل): deadlock. و buffered channel كبيرة عشان «تحل» deadlock: بتأجله بس.`
          },
          lines: [
            "باكدج main.",
            "import fmt.",
            R`[[chan<- int]]: الدالة تقدر تبعت بس.`,
            "من 1 لـ n.",
            R`ابعت، واستنى لحد ما حد ياخد.`,
            "قفلة.",
            "خلصنا: اقفل عشان اللي بيستقبل يعرف.",
            "قفلة.",
            R`بتستقبل من in ([[<-chan]]) وتبعت في out.`,
            "خد لحد ما in تتقفل.",
            "ابعت المربع.",
            "قفلة.",
            "اقفل out.",
            "قفلة.",
            "main.",
            "channel للأرقام (unbuffered).",
            "channel للمربعات.",
            "المرحلة الأولى في goroutine.",
            "المرحلة التانية في goroutine.",
            "main هي المرحلة الأخيرة: خد لحد ما تتقفل.",
            "اطبع.",
            "قفلة.",
            "سطر جديد.",
            "buffered بسعة 2.",
            "مش بتستنى: فيه مكان.",
            "ولا دي.",
            "2 جوّا، والسعة 2.",
            "اقفل: مفيش إرسال تاني.",
            "اللي جوّا لسه بيتقري: a b.",
            "فاضية ومقفولة.",
            R`[[""]] و false.`,
            "قفلة."
          ],
          sol: R`الناتج:
[[1 4 9 16 ]]
[[2 2]]
[[a b]]
[["" false]]

من غير [[close(out)]] في square: المربعات بتتطبع، وبعدين:
[[fatal error: all goroutines are asleep - deadlock!]]
main مستنية في range على squares، ومحدش هيبعت ولا هيقفل.

و [[ch <- 1]] من غير مستقبل: نفس الـ deadlock على طول، لأن unbuffered بتستنى حد ياخد.

والمرحلة التالتة (الكود تحت) بترجّع [[30]] (1 + 4 + 9 + 16).`,
          solCode: R`func sum(in <-chan int) int {
  total := 0
  for v := range in {
    total += v
  }
  return total
}

nums := make(chan int)
squares := make(chan int)
go produce(4, nums)
go square(nums, squares)
fmt.Println(sum(squares))`
        },
        {
          cmd: "select",
          title: "select: تستنى أكتر من channel مع بعض، و timeout، وإرسال من غير ما تستنى",
          desc: R`[[select]] زي switch بس للـ channels: كل [[case]] عملية إرسال أو استقبال، والـ select بيستنى لحد ما واحدة منهم تبقى جاهزة وينفّذها. لو أكتر من واحدة جاهزة بيختار عشوائي.

أشهر استخدامات:
• timeout: [[case <-time.After(200 * time.Millisecond):]]. [[time.After]] بترجّع channel بيوصلها قيمة بعد المدة. فاللي يوصل الأول يكسب: الرد ولا الوقت.
• [[default]]: لو ولا case جاهز دلوقتي، نفّذ default على طول من غير استنا. كده تعمل إرسال «لو فيه مكان، وإلا ارمي».
• loop بـ select جوّاها: worker بيسمع على كذا channel (شغل، أو ticker، أو إشارة قفل).

[[time.NewTicker(d)]] بيبعت في [[ticker.C]] كل d. لازم [[ticker.Stop()]] لما تخلص.

وفي المثال slowAPI بتعمل channel بسعة 1. ليه؟ لو الـ timeout كسب ومحدش استقبل، الـ goroutine اللي جوّاها هتبعت في الـ buffer وتخلص. لو كانت unbuffered كانت هتفضل مستنية حد يستقبل للأبد (goroutine leak).`,
          example: R`package main

import (
  "fmt"
  "time"
)

func slowAPI(d time.Duration) <-chan string {
  ch := make(chan string, 1)
  go func() {
    time.Sleep(d)
    ch <- fmt.Sprintf("response after %v", d)
  }()
  return ch
}

func main() {
  select {
  case res := <-slowAPI(50 * time.Millisecond):
    fmt.Println(res)
  case <-time.After(200 * time.Millisecond):
    fmt.Println("timeout")
  }

  select {
  case res := <-slowAPI(time.Second):
    fmt.Println(res)
  case <-time.After(200 * time.Millisecond):
    fmt.Println("timeout")
  }

  jobs := make(chan int, 1)
  for i := range 3 {
    select {
    case jobs <- i:
      fmt.Println("queued", i)
    default:
      fmt.Println("queue full, dropped", i)
    }
  }

  ticker := time.NewTicker(30 * time.Millisecond)
  defer ticker.Stop()
  done := time.After(100 * time.Millisecond)
  ticks := 0
  for {
    select {
    case <-ticker.C:
      ticks++
    case <-done:
      fmt.Println("ticks:", ticks)
      return
    }
  }
}`,
          try: R`اكتب دالة [[firstOf(mirrors ...time.Duration) string]] بتنادي slowAPI لكل mirror بالتوازي وترجّع أول رد يوصل (أسرع سيرفر يكسب)، مع timeout كلي 500ms. جرّبها بـ [[firstOf(300*time.Millisecond, 80*time.Millisecond, 200*time.Millisecond)]].`,
          flag: "script",
          deep: {
            why: R`في السيرفر مينفعش تستنى للأبد: API تاني وقع، أو الداتابيز علّقت. من غير timeout الطلبات بتتراكم والسيرفر بيقع. و select هي الأداة اللي بتخليك تقول «استنى ده، أو ده، أو الوقت يخلص، أو الطلب يتلغي»، وده نفس اللي context بيعمله من جوّا (الدرس الجاي).`,
            how: R`في select التاني الـ API بتاخد ثانية والـ timeout 200ms، فالـ timeout كسب. الـ goroutine اللي جوه slowAPI لسه شغالة، وبعد ثانية هتبعت في الـ buffer وتخلص لوحدها، لكن البرنامج هيكون قفل قبلها.

[[case jobs <- i]] مع default: أول مرة فيه مكان (السعة 1)، التانية والتالتة الـ buffer مليان فـ default اتنفذت. ده نمط «load shedding»: لو الطابور مليان ارفض بدل ما تعلّق.

في الـ loop الأخيرة: ticker كل 30ms و done بعد 100ms، فالـ ticks بتطلع 3 تقريبًا (30 و 60 و 90). [[return]] بتخرج من main كلها. [[break]] هنا كانت هتخرج من الـ select بس.

[[time.After]] في loop طويلة بيعمل timer جديد كل لفّة. من Go 1.23 الـ timers اللي محدش ماسكها بتتنضّف لوحدها، بس [[time.NewTimer]] مع Reset لسه أوضح في الـ loops.`,
            when: R`timeouts على أي استنا، وإلغاء ([[case <-ctx.Done():]])، و workers بتسمع على أكتر من مصدر، وإرسال أو استقبال من غير استنا (default).`,
            mistakes: R`[[break]] جوه select جوه for وانت عايز تخرج من الـ for (محتاج label أو return). و select من غير default ومن غير timeout على channel ممكن متجيش: علّقة. و unbuffered channel في goroutine ممكن محدش يستقبل منها بعد الـ timeout: leak. و default في loop من غير أي استنا: الـ CPU بيوصل 100٪.`
          },
          lines: [
            "باكدج main.",
            "imports.",
            "fmt.",
            "time.",
            "قفلة.",
            "بترجّع channel للاستقبال بس.",
            "سعة 1: عشان الـ goroutine متعلّقش لو محدش استقبل.",
            "goroutine بتعمل الشغل.",
            "استنى (كأنها API بطيئة).",
            "ابعت الرد.",
            "قفلة.",
            "رجّع الـ channel على طول.",
            "قفلة.",
            "main.",
            "select: استنى أول واحد يجهز.",
            "الرد (50ms)...",
            "...وصل الأول.",
            "أو الوقت (200ms).",
            "مش هنا.",
            "قفلة.",
            "تاني، بس الـ API بطيئة.",
            "ثانية...",
            "مش هنا.",
            "200ms كسبت.",
            "timeout.",
            "قفلة.",
            "طابور بسعة 1.",
            "3 محاولات.",
            "select فيه إرسال و default.",
            "لو فيه مكان...",
            "...اتحط.",
            "لو مفيش: من غير استنا.",
            "ارمي.",
            "قفلة.",
            "قفلة.",
            "ticker كل 30ms.",
            "وقّفه في الآخر.",
            "إشارة بعد 100ms.",
            "عدّاد.",
            "loop للأبد.",
            "select في كل لفّة.",
            "tick...",
            "...عدّ.",
            "الوقت خلص...",
            "اطبع.",
            "اخرج من main.",
            "قفلة الـ select.",
            "قفلة الـ for.",
            "قفلة."
          ],
          sol: R`الناتج:
[[response after 50ms]]
[[timeout]]
[[queued 0]]
[[queue full, dropped 1]]
[[queue full, dropped 2]]
[[ticks: 3]]

(الـ ticks ممكن تطلع 2 أو 3 على جهاز مشغول، لأن الأوقات قريبة من بعض.)

firstOf (الكود تحت) بترجّع [[response after 80ms]]. السر إن كل الـ channels بسعة 1، فالـ goroutines التانية بتبعت وتخلص حتى لو محدش استقبل منها.`,
          solCode: R`func firstOf(mirrors ...time.Duration) string {
  results := make(chan string, len(mirrors))
  for _, d := range mirrors {
    go func() { results <- <-slowAPI(d) }()
  }
  select {
  case r := <-results:
    return r
  case <-time.After(500 * time.Millisecond):
    return "timeout"
  }
}`
        },
        {
          cmd: "التزامن الآمن بـ WaitGroup و Mutex",
          title: "data race: لما أكتر من goroutine يعدّلوا نفس المتغير، والحل Mutex أو atomic و go run -race",
          desc: R`لو أكتر من goroutine بيقروا ويكتبوا نفس المتغير في نفس الوقت، ومفيش تنسيق بينهم، ده data race. [[counter++]] شكلها خطوة واحدة بس هي ٣: اقرا، زوّد، اكتب. لو اتنين قروا نفس القيمة مع بعض، الاتنين هيكتبوا نفس النتيجة وزيادة هتضيع. والنتيجة بتتغيّر من تشغيل للتاني، وده أصعب نوع bugs.

الحلول:
• [[sync.Mutex]]: قفل. [[mu.Lock()]] قبل ما تلمس الداتا، و [[mu.Unlock()]] بعدها. goroutine واحدة بس تقدر تبقى جوّا في كل لحظة، والباقي بيستنى. والعرف [[defer mu.Unlock()]] بعد Lock على طول.
• [[sync.RWMutex]]: نفس الفكرة بس قرّايين كتير مع بعض ([[RLock]])، وكاتب واحد لوحده ([[Lock]]). مفيد لو القراية أكتر بكتير من الكتابة.
• [[sync/atomic]]: لعدّاد أو flag بسيط: [[atomic.Int64]] و [[Add]] و [[Load]]. أسرع من Mutex بس لعملية واحدة بس.
• أو متشاركش أصلًا: channel وصاحب واحد للداتا.

والعرف: الـ Mutex يبقى حقل جوه الـ struct اللي بيحميه، فوق الحقول اللي بيحميها، والـ methods pointer receivers (نسخ Mutex بيكسره).

وأهم أداة: [[go run -race .]] (أو [[go test -race]]): بتراقب البرنامج وهو شغال، ولو لقت race بتطبع السطرين اللي عملوه. شغّلها في الاختبارات دايمًا.`,
          example: R`package main

import (
  "fmt"
  "sync"
  "sync/atomic"
)

type Counter struct {
  mu sync.Mutex
  m  map[string]int
}

func (c *Counter) Inc(key string) {
  c.mu.Lock()
  defer c.mu.Unlock()
  c.m[key]++
}

func main() {
  var wg sync.WaitGroup
  unsafeTotal := 0
  var atomicTotal atomic.Int64
  c := Counter{m: make(map[string]int)}

  for range 1000 {
    wg.Add(1)
    go func() {
      defer wg.Done()
      // data race: أكتر من goroutine بيكتبوا من غير قفل
      unsafeTotal++
      atomicTotal.Add(1)
      c.Inc("visits")
    }()
  }
  wg.Wait()

  fmt.Println("unsafe:", unsafeTotal)
  fmt.Println("atomic:", atomicTotal.Load())
  fmt.Println("mutex:", c.m["visits"])
}`,
          try: R`شغّل [[go run .]] كذا مرة وراقب رقم unsafe، وبعدين [[go run -race .]] واقرا التقرير. وبعدين امسح سطر unsafeTotal وشغّل -race تاني. وأخيرًا شيل [[c.mu.Lock()]] و [[defer c.mu.Unlock()]] من Inc وشغّل [[go run .]] من غير -race.`,
          flag: "script",
          deep: {
            why: R`الـ race بيعدّي في الاختبار على جهازك ويظهر في الإنتاج تحت ضغط: رصيد غلط، أو عدّاد ناقص، أو map بيوقّع السيرفر كله. والكود شكله سليم. عشان كده Go عاملة race detector جوّا الأدوات، وفرق كتير بيشغّلوا كل الاختبارات بـ -race في CI.`,
            how: R`[[unsafeTotal]] ممكن يطلع 1000 أحيانًا وأقل أحيانًا، حسب التوقيت وعدد الأنوية. وده بالظبط اللي بيخلي الـ race خطير: مش بيبان كل مرة.

[[-race]] بيبني البرنامج بتعليمات زيادة بتسجّل كل قراية وكتابة في الذاكرة ومين عملها، فلو اتنين goroutine لمسوا نفس المكان (وواحد منهم بيكتب) من غير ما يكون بينهم تزامن، بيطبع [[WARNING: DATA RACE]] ومكان الاتنين، وبيخرج بـ exit code 66. بيبطّأ البرنامج (٢ لـ ٢٠ مرة) ويزوّد الذاكرة، فمش للإنتاج، بس بيمسك الـ races اللي حصلت فعلًا وهو شغال، مش اللي ممكن تحصل.

الـ map بالذات: الكتابة فيه من أكتر من goroutine من غير قفل الـ runtime بيكتشفها غالبًا ويوقف البرنامج كله بـ [[fatal error: concurrent map writes]]، ودي مش panic تتمسك بـ recover.

[[atomic.Int64]] (من Go 1.19) نوع جاهز بقيمة صفرية مفيدة، أحسن من [[atomic.AddInt64(&x, 1)]] القديمة.`,
            when: R`Mutex لأي داتا مشتركة فيها أكتر من حقل أو عملية مركّبة (map، أو رصيد مع سجل). RWMutex لكاش قرايته كتير. atomic لعدّاد أو flag واحد. و -race في كل [[go test]] في CI.`,
            mistakes: R`تنسى Unlock في return بدري (استخدم defer). و Lock مرتين في نفس الـ goroutine (Mutex في Go مش reentrant): deadlock. وتنسخ struct فيه Mutex (value receiver): go vet بيقول [[passes lock by value]]. وتقفل وانت بتعمل حاجة بطيئة (HTTP call) فكل حاجة تستنى. وتفتكر إن القراية بس مش محتاجة قفل: قراية مع كتابة = race برضه.`
          },
          lines: [
            "باكدج main.",
            "imports.",
            "fmt.",
            "sync.",
            R`[[sync/atomic]]: عمليات ذرّية.`,
            "قفلة.",
            "struct فيه الـ Mutex والداتا اللي بيحميها.",
            "القفل: قيمته الصفرية جاهزة.",
            "map مشترك.",
            "قفلة.",
            "pointer receiver: عشان منتنسخش القفل.",
            "اقفل.",
            "افتح لما الدالة تخلص.",
            "عدّل وانت لوحدك.",
            "قفلة.",
            "main.",
            "WaitGroup.",
            "عدّاد عادي من غير حماية.",
            R`عدّاد atomic.`,
            "Counter بالـ map جاهز.",
            "1000 لفّة.",
            "سجّل.",
            "goroutine.",
            "Done في الآخر.",
            R`race: [[++]] = اقرا + زوّد + اكتب، ومش محمية.`,
            "زيادة ذرّية: آمنة.",
            "زيادة بقفل: آمنة.",
            "قفلة الـ goroutine.",
            "قفلة الـ loop.",
            "استنى الكل.",
            "ممكن أقل من 1000.",
            "1000 دايمًا.",
            "1000 دايمًا.",
            "قفلة."
          ],
          sol: R`[[go run .]] بيطبع حاجة زي:
[[unsafe: 987]]
[[atomic: 1000]]
[[mutex: 1000]]
والرقم الأول بيتغيّر من مرة للتانية (وممكن يطلع 1000 أحيانًا، وده اللي بيخلّي الـ race يعدّي من غير ما حد يلاحظ).

[[go run -race .]] بيطبع [[WARNING: DATA RACE]] وتحتها [[Read at ... by goroutine 8:]] و [[Previous write at ... by goroutine 7:]] وكل واحدة فيها [[main.main.func1()]] ورقم سطر [[unsafeTotal++]]. وفي الآخر [[Found 2 data race(s)]] (العدد بيختلف من تشغيل للتاني) و [[exit status 66]].

بعد ما تمسح unsafeTotal: -race مش بيطبع حاجة. ومن غير القفل في Inc: غالبًا [[fatal error: concurrent map writes]] والبرنامج كله بيقع.`
        },
        {
          cmd: "context",
          title: "context: تلغي شغل أو تحطله مهلة، وتعدّيه من الـ handler لحد الداتابيز",
          desc: R`[[context.Context]] قيمة بتتعدّى كأول parameter لأي دالة بتعمل حاجة ممكن تطوّل (شبكة، داتابيز، شغل تقيل)، والعرف إن اسمه [[ctx]]. وظيفته يقول للدالة «بطّل، محدش مستني النتيجة دي».

بتعمله:
• [[context.Background()]]: الأصل الفاضي، في main أو الاختبارات.
• [[context.WithTimeout(parent, 100*time.Millisecond)]]: بيتلغي لوحده بعد المدة.
• [[context.WithCancel(parent)]]: بيتلغي لما تنادي cancel.
الاتنين بيرجّعوا ctx جديد و [[cancel]]، و [[defer cancel()]] لازم دايمًا عشان الـ timer والموارد تتنضّف.

جوه الدالة:
• [[<-ctx.Done()]]: channel بتتقفل لما الـ ctx يتلغي، فتستخدمها في select.
• [[ctx.Err()]]: السبب: [[context.DeadlineExceeded]] (المهلة خلصت) أو [[context.Canceled]] (حد ألغى).

والأهم: الـ ctx بيتعدّى لتحت. في السيرفر كل request معاه [[r.Context()]]، وده بيتلغي لوحده لو اليوزر قفل الاتصال. فلو عدّيته للداتابيز ([[db.QueryContext(ctx, ...)]]) وللـ HTTP client، الـ query نفسها هتتلغي بدل ما تكمّل على الفاضي.

ولو parent اتلغي، كل اللي اتعمل منه بيتلغي معاه.`,
          example: R`package main

import (
  "context"
  "errors"
  "fmt"
  "time"
)

// بتمثّل query بتاخد وقت، وبتسمع للإلغاء
func query(ctx context.Context, d time.Duration) (string, error) {
  select {
  case <-time.After(d):
    return "rows", nil
  case <-ctx.Done():
    return "", fmt.Errorf("query: %w", ctx.Err())
  }
}

func main() {
  ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
  defer cancel()

  res, err := query(ctx, 20*time.Millisecond)
  fmt.Println(res, err)

  _, err = query(ctx, time.Second)
  fmt.Println(err, errors.Is(err, context.DeadlineExceeded))

  ctx2, cancel2 := context.WithCancel(context.Background())
  go func() {
    time.Sleep(30 * time.Millisecond)
    cancel2()
  }()
  _, err = query(ctx2, time.Second)
  fmt.Println(err)
}`,
          try: R`اعمل handler في سيرفر بيعمل [[query(r.Context(), 5*time.Second)]]، وافتح الرابط بـ [[curl]] واضغط Ctrl+C بعد ثانية. اطبع الـ error في السيرفر: هتلاقي [[context canceled]] على طول، مش بعد 5 ثواني. (السيرفر في الدروس الجاية، والكود تحت.)`,
          flag: "script",
          deep: {
            why: R`من غير context: يوزر بيقفل الصفحة، والسيرفر بيكمّل query بتاخد 10 ثواني و ٣ API calls على الفاضي. اضرب ده في ألف يوزر بيعملوا refresh وقت الضغط، وتلاقي السيرفر بيقع من شغل محدش مستنيه. context بيوقّف السلسلة كلها مرة واحدة.`,
            how: R`الـ ctx الأول مهلته 100ms. الـ query الأولى بتخلص في 20ms فنجحت. التانية محتاجة ثانية، فالـ ctx اتلغي عند 100ms (من وقت إنشاءه)، و [[ctx.Err()]] رجّع DeadlineExceeded، والتغليف بـ [[%w]] خلّى errors.Is تلاقيه.

ctx2 بيتلغي بعد 30ms من goroutine تانية، فالـ Err بقى Canceled.

الـ context مش بيوقّف الكود لوحده: الدالة لازم تسمع ([[ctx.Done()]] في select، أو تعدّيه لمكتبة بتسمع زي database/sql و net/http). لو عندك loop تقيلة، شيك [[ctx.Err() != nil]] كل كام لفّة.

[[context.WithValue]] بيحط قيمة في الـ ctx (زي request id أو اليوزر من الـ auth middleware)، بس للحاجات اللي بتعدّي الطبقات وبتخص الـ request، مش كطريقة تبعت parameters.

go vet بيمسك [[the cancel function is not used on all paths]] لو نسيت cancel.`,
            when: R`أي دالة بتعمل I/O أو ممكن تطوّل: خلي أول parameter [[ctx context.Context]]. في handlers استخدم [[r.Context()]]. في main و workers استخدم [[signal.NotifyContext]] (المستوى ٣) عشان Ctrl+C يلغي كل حاجة.`,
            mistakes: R`تنسى [[defer cancel()]]. وتخزّن ctx في struct بدل ما تعدّيه كـ parameter. وتستخدم [[context.Background()]] جوه handler بدل [[r.Context()]] فالإلغاء ميوصلش. وتحط كل حاجة في WithValue. وتبعت nil كـ ctx (استخدم [[context.TODO()]] لو لسه مش عارف).`
          },
          lines: [
            "باكدج main.",
            "imports.",
            "context.",
            "errors.",
            "fmt.",
            "time.",
            "قفلة.",
            R`[[ctx]] أول parameter بالعرف.`,
            "استنى اللي يحصل الأول.",
            "الشغل خلص.",
            "نتيجة.",
            "أو اتلغى.",
            R`رجّع السبب ملفوف بـ [[%w]].`,
            "قفلة.",
            "قفلة.",
            "main.",
            "ctx بمهلة 100ms من دلوقتي.",
            R`لازم: بينضّف الـ timer حتى لو خلصنا بدري.`,
            "query سريعة (20ms).",
            R`[[rows <nil>]].`,
            "query محتاجة ثانية بنفس الـ ctx.",
            "المهلة خلصت: DeadlineExceeded.",
            "ctx بيتلغي بإيدنا.",
            "goroutine...",
            "...تستنى 30ms...",
            "...وتلغي.",
            "قفلة.",
            "query طويلة.",
            R`[[query: context canceled]].`,
            "قفلة."
          ],
          sol: R`الناتج:
[[rows <nil>]]
[[query: context deadline exceeded true]]
[[query: context canceled]]

وفي السيرفر (الكود تحت): أول ما تضغط Ctrl+C في curl، السيرفر بيطبع [[client gone: query: context canceled]] على طول. لو كنت عدّيت [[context.Background()]] بدل [[r.Context()]] كان هيكمّل 5 ثواني ويكتب رد لحد مش موجود.`,
          solCode: R`http.HandleFunc("/report", func(w http.ResponseWriter, r *http.Request) {
  res, err := query(r.Context(), 5*time.Second)
  if err != nil {
    log.Println("client gone:", err)
    return
  }
  fmt.Fprintln(w, res)
})
log.Fatal(http.ListenAndServe(":8080", nil))`
        }
      ]
    },
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
    },
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
    },
    {
      t: "الإنتاج: لوج وإغلاق ونشر",
      l: 3,
      n: "لوج JSON بـ log/slog، وإغلاق نضيف للسيرفر مع SIGTERM، وصورة Docker صغيرة، والبناء لأنظمة تانية، و worker pools و errgroup، وإمتى تحتاج Gin أو chi",
      items: [
        {
          cmd: "log/slog",
          title: "log/slog: لوج structured بمستويات، JSON في الإنتاج",
          desc: R`[[log]] العادية بتطبع سطر نص. في الإنتاج اللوج بيروح لأداة (Loki أو Datadog أو CloudWatch) بتدوّر فيه، والنص الحر صعب تفلتره. [[log/slog]] (Go 1.21+) في المكتبة القياسية وبيكتب structured logs: رسالة ثابتة ومعاها مفاتيح وقيم.

[[slog.Info("server started", "addr", ":8080")]]: الرسالة، وبعدها أزواج مفتاح وقيمة.

المستويات: [[Debug]] و [[Info]] و [[Warn]] و [[Error]]. الافتراضي Info، يعني Debug مش بيظهر إلا لو غيّرت المستوى.

الـ handler بيحدد الشكل:
• [[slog.NewTextHandler]]: [[key=value]]، مريح وانت بتطوّر.
• [[slog.NewJSONHandler]]: سطر JSON لكل لوج، للإنتاج.
وبتعمل logger بـ [[slog.New(handler)]]، و [[slog.SetDefault(logger)]] بيخلي [[slog.Info]] (و log العادية كمان) تستخدمه.

[[logger.With("request_id", "r-42")]] بيرجّع logger فيه المفاتيح دي في كل سطر. بتعمله في أول الـ request وتعدّيه، فكل لوجات الطلب ده تتربط ببعض.

و [[slog.String("k", v)]] و [[slog.Int(...)]] بديل أسرع وأوضح من الأزواج السايبة، و go vet بيشيك إن الأزواج مكتملة.

[[&slog.HandlerOptions{Level: slog.LevelDebug}]]: pointer لـ struct إعدادات.`,
          example: R`package main

import (
  "log/slog"
  "os"
)

func main() {
  logger := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelDebug}))
  slog.SetDefault(logger)

  slog.Info("server started", "addr", ":8080", "env", "prod")
  slog.Debug("cache warmed", "items", 120)

  reqLog := logger.With("request_id", "r-42", "user_id", 7)
  reqLog.Warn("slow query", "ms", 950)
  reqLog.Error("payment failed", slog.String("provider", "paymob"), slog.Int("status", 502))

  text := slog.New(slog.NewTextHandler(os.Stdout, nil))
  text.Info("human readable", "port", 8080)
  text.Debug("hidden by default")
}`,
          try: R`خلي مستوى اللوج ييجي من env: [[LOG_LEVEL=debug]] يطلّع Debug، وأي حاجة تانية Info (استخدم [[slog.LevelVar]] أو [[level.UnmarshalText]]). وبعدين شغّل البرنامج واعمل pipe لـ [[jq]]: [[go run . | jq -c 'select(.level == "ERROR")']].`,
          flag: "script",
          deep: {
            why: R`لما حاجة تقع الساعة ٣ الفجر، اللوج هو كل اللي عندك. structured logs بتخليك تسأل «كل الـ errors لـ user_id 7 في آخر ساعة» أو «كل الطلبات اللي أخدت أكتر من ثانية»، بدل grep على نص كل واحد كاتبه بشكل.`,
            how: R`[[slog.Info]] (الـ default) و [[logger.Info]] نفس الكلام بعد SetDefault. الـ With بيعمل نسخة، والأصلي مبيتغيّرش.

JSONHandler بيطبع [[time]] و [[level]] و [[msg]] وبعدين المفاتيح بتاعتك. الوقت بصيغة RFC 3339 بدقة ميكرو/نانو ثانية.

لو مفتاح من غير قيمة ([[slog.Info("x", "k")]])، بيطلع [[!BADKEY]]. و go vet بيمسك ده.

في السيرفر، الـ middleware بيعمل request ID ([[crypto/rand]] أو header جاي من الـ load balancer)، ويعمل [[logger.With("request_id", id)]] ويحطه في الـ context، والـ handlers تاخده من هناك. فيه مكتبات بتعمل ده، أو تكتبه في ٢٠ سطر.

متطبعش أسرار (باسوردات، توكنز، أرقام كروت) في اللوج. ممكن تعمل type عنده method [[LogValue()]] بترجّع [["REDACTED"]].

الأداء: slog سريع كفاية لأغلب السيرفرات. لو محتاج أسرع، zap و zerolog موجودين، وفيه handlers بتربطهم بـ slog.`,
            when: R`في أي سيرفر أو worker: JSON في الإنتاج و Text محليًا (اختار حسب env). مستوى Debug في التطوير، و Info في الإنتاج. و log العادية أو fmt تمام لأدوات CLI الصغيرة.`,
            mistakes: R`رسايل متغيّرة ([[slog.Info("user " + id + " logged in")]]) بدل رسالة ثابتة ومفاتيح: مش هتعرف تجمّعها. ولوج Error لنفس الغلطة في كل طبقة. وتسجيل body الطلبات كله (أسرار وحجم). و [[fmt.Println]] جنب slog فاللوج يبقى نص JSON ونص مش JSON.`
          },
          lines: [
            "باكدج main.",
            "imports.",
            R`[[log/slog]].`,
            "os.",
            "قفلة.",
            "main.",
            "logger بـ JSON على stdout، ومستوى Debug.",
            "خليه الافتراضي.",
            "Info بمفتاحين.",
            "Debug: ظاهر لأننا وطّينا المستوى.",
            "logger فيه مفاتيح ثابتة لكل سطر.",
            "Warn.",
            R`Error بـ [[slog.String]] و [[slog.Int]].`,
            R`logger نصي بالإعدادات الافتراضية ([[nil]]).`,
            R`[[key=value]].`,
            "مش هيظهر: الافتراضي Info.",
            "قفلة."
          ],
          sol: R`الناتج (الأوقات هتختلف):
[[{"time":"2026-10-01T12:00:00.123Z","level":"INFO","msg":"server started","addr":":8080","env":"prod"}]]
[[{"time":"...","level":"DEBUG","msg":"cache warmed","items":120}]]
[[{"time":"...","level":"WARN","msg":"slow query","request_id":"r-42","user_id":7,"ms":950}]]
[[{"time":"...","level":"ERROR","msg":"payment failed","request_id":"r-42","user_id":7,"provider":"paymob","status":502}]]
[[time=2026-10-01T12:00:00.124Z level=INFO msg="human readable" port=8080]]

السطر الأخير (Debug) مطلعش. و jq بيطلّع سطر الـ ERROR بس. ومستوى اللوج من env في الكود تحت.`,
          solCode: R`var level slog.Level
if err := level.UnmarshalText([]byte(os.Getenv("LOG_LEVEL"))); err != nil {
  level = slog.LevelInfo
}
logger := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: level}))
slog.SetDefault(logger)
slog.Debug("visible only with LOG_LEVEL=debug")`
        },
        {
          cmd: "signal.NotifyContext و Shutdown",
          title: "إغلاق نضيف: السيرفر يخلّص الطلبات الشغالة قبل ما يقفل مع SIGTERM",
          desc: R`لما Docker أو Kubernetes أو systemd عايزين يقفلوا البرنامج (deploy جديد مثلًا) بيبعتوا [[SIGTERM]]، وبعد مهلة (10 ثواني في Docker افتراضيًا) بيبعتوا [[SIGKILL]] اللي بيقتل فورًا. ومن غير ما تتعامل مع SIGTERM، Go بتقفل على طول، والطلبات اللي في النص بتتقطع.

الخطوات:
1. [[ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)]]: ctx بيتلغي لما توصل إشارة (Ctrl+C هي [[os.Interrupt]]).
2. [[http.Server]] بإعدادات بدل [[http.ListenAndServe]] المختصرة، وشغّله في goroutine.
3. [[<-ctx.Done()]]: main بتستنى الإشارة.
4. [[srv.Shutdown(ctx)]] بمهلة: بيقفل الـ listener (مفيش طلبات جديدة)، ويستنى الطلبات الشغالة تخلص، أو المهلة تخلص.

و [[ListenAndServe]] بترجّع [[http.ErrServerClosed]] بعد Shutdown، ودي مش error حقيقي، عشان كده بنتجاهلها بـ [[errors.Is]].

ونفس الـ struct بيحل مشكلة تانية: الـ timeouts. [[http.ListenAndServe]] المختصرة مفيهاش أي timeout، فعميل بطيء (أو هجوم slowloris) يقدر يمسك اتصالات للأبد. [[ReadHeaderTimeout]] بالذات مهم.`,
          example: R`package main

import (
  "context"
  "errors"
  "log/slog"
  "net/http"
  "os"
  "os/signal"
  "syscall"
  "time"
)

func main() {
  ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
  defer stop()

  mux := http.NewServeMux()
  mux.HandleFunc("GET /slow", func(w http.ResponseWriter, r *http.Request) {
    time.Sleep(3 * time.Second)
    w.Write([]byte("finished\n"))
  })

  srv := &http.Server{
    Addr:              ":8080",
    Handler:           mux,
    ReadHeaderTimeout: 5 * time.Second,
    ReadTimeout:       10 * time.Second,
    WriteTimeout:      15 * time.Second,
    IdleTimeout:       60 * time.Second,
  }

  go func() {
    slog.Info("listening", "addr", srv.Addr)
    if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
      slog.Error("server failed", "err", err)
      os.Exit(1)
    }
  }()

  <-ctx.Done()
  slog.Info("shutting down")
  shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
  defer cancel()
  if err := srv.Shutdown(shutdownCtx); err != nil {
    slog.Error("forced shutdown", "err", err)
  }
  slog.Info("bye")
}`,
          try: R`شغّله، وفي ترمنال تاني [[curl localhost:8080/slow]]، وبسرعة (قبل 3 ثواني) ارجع للأول واضغط Ctrl+C. الـ curl خد الرد ولا اتقطع؟ وبعدين جرّب نفس الكلام بنسخة بـ [[http.ListenAndServe]] العادية من غير Shutdown. وجرّب [[kill -TERM <pid>]] بدل Ctrl+C.`,
          flag: "script",
          deep: {
            why: R`كل deploy بيقفل النسخة القديمة. من غير graceful shutdown كل deploy بيقطع طلبات في النص: دفع اتخصم ومتسجّلش، أو upload اتقطع، أو أخطاء 502 في الـ dashboards كل ما حد يعمل deploy.`,
            how: R`[[signal.NotifyContext]] (Go 1.16+) بيجمع [[signal.Notify]] مع context: أول إشارة بتلغي الـ ctx. و [[stop()]] بيرجّع السلوك العادي، فإشارة تانية (Ctrl+C مرتين) بتقفل على طول.

[[Shutdown]] بيقفل الـ listeners، وبعدين يقفل الاتصالات اللي فاضية، ويستنى اللي شغالة تخلص. لو [[shutdownCtx]] خلص قبلها بيرجّع [[context deadline exceeded]] والطلبات دي بتتقطع. خلي المهلة دي أقل من مهلة الـ orchestrator (Docker 10 ثواني، و Kubernetes [[terminationGracePeriodSeconds]] افتراضيًا 30).

Shutdown مش بيلغي الـ handlers اللي شغالة. لو handler بيعمل حاجة طويلة لازم يسمع لـ [[r.Context()]]، أو تدّي السيرفر [[BaseContext]] بيتلغي مع الإشارة.

الـ timeouts:
• [[ReadHeaderTimeout]]: وقت قراية الـ headers (ضد slowloris).
• [[ReadTimeout]]: الطلب كله بالـ body.
• [[WriteTimeout]]: من آخر الـ headers لحد ما الرد يخلص. لو عندك streaming أو SSE، ده هيقطعه.
• [[IdleTimeout]]: اتصال keep-alive فاضي.

[[os.Exit(1)]] جوه الـ goroutine: لو السيرفر مقدرش يبدأ أصلًا (البورت مشغول) مفيش لازمة نستنى إشارة. وخلي بالك إن os.Exit مش بينفّذ الـ defers.

وبعد Shutdown اقفل باقي الحاجات بالترتيب: workers، وبعدين الداتابيز ([[db.Close()]]).`,
            when: R`أي سيرفر أو worker هيشتغل في Docker أو Kubernetes أو systemd، يعني تقريبًا كل حاجة في الإنتاج. وفي Docker: [[ENTRYPOINT ["/api"]]] بصيغة الـ array عشان الإشارة توصل للبرنامج نفسه مش لـ shell.`,
            mistakes: R`[[http.ListenAndServe]] من غير timeouts في الإنتاج. وتعامل [[ErrServerClosed]] كـ error فاللوج كل deploy يقول server failed. ومهلة Shutdown أطول من مهلة Docker فييجي SIGKILL في النص. و [[CMD npm start]]-style: shell في النص بيبلع SIGTERM. وتنسى إن الـ goroutines الخلفية بتاعتك محتاجة تسمع للـ ctx كمان.`
          },
          lines: [
            "باكدج main.",
            "imports.",
            "context.",
            "errors.",
            "log/slog.",
            "net/http.",
            "os.",
            R`[[os/signal]]: الإشارات.`,
            R`[[syscall]]: عشان SIGTERM.`,
            "time.",
            "قفلة.",
            "main.",
            "ctx بيتلغي مع Ctrl+C أو SIGTERM.",
            "رجّع السلوك العادي في الآخر.",
            "router.",
            "endpoint بياخد 3 ثواني.",
            "شغل طويل.",
            "رد.",
            "قفلة.",
            R`[[http.Server]] بإعدادات.`,
            "البورت.",
            "الـ router.",
            "ضد العملاء البطيئين.",
            "الطلب كله.",
            "الرد كله.",
            "اتصال فاضي.",
            "قفلة.",
            "السيرفر في goroutine عشان main تفضل فاضية تستنى.",
            "لوج.",
            R`شغّل، و [[ErrServerClosed]] بعد Shutdown مش error.`,
            "error حقيقي (البورت مشغول مثلًا).",
            "اقفل.",
            "قفلة.",
            "قفلة الـ goroutine.",
            "استنى الإشارة.",
            "لوج.",
            "مهلة 10 ثواني للإغلاق.",
            "نضّف.",
            "وقّف الطلبات الجديدة واستنى الشغالة.",
            "المهلة خلصت والطلبات لسه شغالة.",
            "قفلة.",
            "خلاص.",
            "قفلة."
          ],
          sol: R`مع Ctrl+C والـ curl شغال: السيرفر بيطبع [[2026/10/01 12:00:02 INFO shutting down]]، والـ curl بيكمّل ويطبع [[finished]] بعد ما الـ 3 ثواني يخلصوا، وبعدها [[INFO bye]] والبرنامج يقفل. (slog من غير SetDefault بيطبع بشكل log العادي.) أي curl جديد بعد Ctrl+C بيطلع [[curl: (7) Failed to connect to localhost port 8080]].

مع النسخة العادية: Ctrl+C بيقفل فورًا والـ curl بيطبع [[curl: (52) Empty reply from server]].

و [[kill -TERM <pid>]] بيعمل نفس اللي Ctrl+C عمله، وده اللي Docker بيبعته مع [[docker stop]].`
        },
        {
          cmd: "تحزيم تطبيق Go في Docker بـ Scratch بحجم 15 ميجا",
          title: "Docker multi-stage: صورة صغيرة فيها الـ binary بس (scratch أو distroless)",
          desc: R`صورة [[golang:1.25]] حجمها حوالي 800MB لأن فيها الـ compiler وكل الأدوات. البرنامج المبني مش محتاج ده كله، فبنستخدم multi-stage build:
1. مرحلة build: من صورة golang، تنزّل المكتبات وتبني الـ binary.
2. مرحلة التشغيل: صورة فاضية تقريبًا، وتنسخ فيها الـ binary بس من المرحلة الأولى.

[[CGO_ENABLED=0]]: يبني binary مش معتمد على مكتبة C بتاعة النظام (glibc)، فيشتغل في صورة مفيهاش أي حاجة. أغلب برامج Go مش محتاجة cgo، لكن مكتبات معينة (زي go-sqlite3) محتاجاه.

مرحلة التشغيل اختيارين:
• [[scratch]]: فاضية خالص. مفيش shell ولا ls ولا شهادات SSL ولا timezones. عشان كده لازم تنسخ [[ca-certificates.crt]] بنفسك، وإلا أي HTTPS call هيفشل.
• [[gcr.io/distroless/static-debian12:nonroot]]: فيها الشهادات و timezones ويوزر nonroot، ومفيهاش shell. أسهل وآمنة، وده الاختيار اللي ناس كتير بتبدأ بيه.

النتيجة صورة حجمها قد الـ binary تقريبًا (بين 5 و 20 ميجا لأغلب الـ APIs)، بتتنزّل بسرعة، ومفيهاش برامج ممكن تتستغل.

وترتيب الـ COPY مهم: go.mod و go.sum الأول ثم [[go mod download]]، فالـ layer ده يتكاش ومش بيتعاد غير لما الـ dependencies تتغيّر.`,
          example: R`# مرحلة 1: البناء
FROM golang:1.25 AS build
WORKDIR /src
COPY go.mod go.sum* ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -trimpath -ldflags="-s -w" -o /out/api ./cmd/api

# مرحلة 2: التشغيل (فاضية، ونسخنا فيها الشهادات والـ binary بس)
FROM scratch
COPY --from=build /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=build /out/api /api
USER 65534:65534
EXPOSE 8080
ENTRYPOINT ["/api"]`,
          try: R`في مشروعك (فيه [[cmd/api]])، احفظ ده كـ [[Dockerfile]] وضيف [[.dockerignore]] فيه [[.git]] و [[bin/]]. شغّل [[docker build -t my-go-api .]] ثم [[docker images my-go-api]]. وبعدين [[docker run --rm -p 8080:8080 my-go-api]]. وجرّب تدخل جوّاها بـ [[docker run --rm -it --entrypoint sh my-go-api]]: إيه اللي حصل؟ وبعدين شيل سطر الشهادات وخلّي البرنامج يعمل [[http.Get("https://go.dev")]].`,
          flag: "script",
          deep: {
            why: R`صورة صغيرة يعني pull أسرع في كل deploy و autoscaling، وتخزين أرخص، والأهم: سطح هجوم أصغر. صورة فيها shell و apt و curl بتدّي أي حد استغل ثغرة في برنامجك أدوات جاهزة. scratch مفيهاش أي حاجة غير برنامجك.`,
            how: R`[[-trimpath]] بيشيل مسارات جهازك من الـ binary (أنضف وبيخلي البناء يتكرر). [[-ldflags="-s -w"]] بيشيل معلومات الـ debug فيصغر الحجم حوالي الربع.

[[./cmd/api]]: بيبني الباكدج اللي في الفولدر ده (الهيكل من درس هيكل المشروع).

[[USER 65534:65534]]: يوزر nobody، عشان البرنامج ميشتغلش root. scratch مفيهاش ملف [[/etc/passwd]] فبنكتب الرقم. distroless:nonroot فيها يوزر جاهز.

[[ENTRYPOINT ["/api"]]] بصيغة الـ array: البرنامج بيبقى PID 1 مباشرة ويستقبل SIGTERM (درس الإغلاق النضيف). الصيغة النصية ([[ENTRYPOINT /api]]) بتحتاج shell، والـ scratch مفيهاش shell أصلًا.

Timezones: لو بتستخدم [[time.LoadLocation("Africa/Cairo")]] في scratch هتفشل. الحل [[import _ "time/tzdata"]] في main (بيضيف حوالي 450KB للـ binary)، أو distroless.

لو محتاج shell للـ debugging مؤقتًا: [[distroless/static-debian12:debug]] فيها busybox، أو [[docker debug]].`,
            when: R`أي خدمة Go بتنشرها بـ Docker. scratch لو عايز أصغر حاجة ومستعد تتعامل مع الشهادات والـ timezones، و distroless static لو عايز الافتراضيات الآمنة من غير تفكير. و alpine لو محتاج shell وأدوات جوه الـ container (أكبر شوية).`,
            mistakes: R`تنسى الشهادات في scratch: [[x509: certificate signed by unknown authority]] في أول HTTPS call. وتبني بـ cgo (الافتراضي في بعض الحالات) وتنسخ لـ scratch: [[exec /api: no such file or directory]] رغم إن الملف موجود (الحقيقة: الـ dynamic linker مش موجود). و [[COPY . .]] قبل [[go mod download]] فالكاش يضيع مع كل تعديل. و [[COPY go.mod go.sum ./]] في مشروع مفيهوش مكتبات: go.sum مش موجود فالبناء يقع بـ [["/go.sum": not found]]، وعشان كده المثال كاتب [[go.sum*]]. ومفيش [[.dockerignore]] فالـ .git كله بيتبعت للـ build.`
          },
          lines: [
            R`مرحلة البناء من صورة Go الرسمية، واسمها [[build]].`,
            "فولدر الشغل.",
            R`ملفات الـ dependencies الأول (عشان الكاش). الـ [[*]] عشان مشروع من غير مكتبات مفيهوش go.sum.`,
            "نزّل المكتبات: layer بيتكاش لحد ما go.mod يتغيّر.",
            "باقي الكود.",
            "ابني binary مستقل عن C، من غير مسارات جهازك ومعلومات debug.",
            R`مرحلة التشغيل: [[scratch]] فاضية خالص.`,
            "انسخ شهادات SSL من مرحلة البناء، عشان HTTPS يشتغل.",
            "انسخ الـ binary بس.",
            "شغّل كيوزر nobody مش root.",
            "توثيق إن البرنامج بيسمع على 8080.",
            "البرنامج نفسه هو العملية الأساسية (PID 1)."
          ],
          sol: R`[[docker images my-go-api]] بيقول حجم حوالي [[8.9MB]] (في خانة SIZE، أو DISK USAGE في نسخ Docker الجديدة) لمشروع المهام اللي في آخر المستوى ده. API بالمكتبة القياسية بيبقى بين 5 و 10 ميجا، والحجم بيزيد مع المكتبات. قارنه بصورة [[golang:1.25]] نفسها (حوالي 800MB).

[[--entrypoint sh]]: [[exec: "sh": executable file not found in $PATH]]. مفيش shell، وده مقصود. (ولو كتبت [[docker run my-go-api sh]] من غير --entrypoint، كلمة sh هتروح كـ argument للـ /api نفسه والسيرفر هيشتغل عادي، لأن ENTRYPOINT ثابت والكلام اللي بعد اسم الصورة بيتضاف بعده.)

ومن غير سطر الشهادات: [[Get "https://go.dev": tls: failed to verify certificate: x509: certificate signed by unknown authority]].`
        },
        {
          cmd: "GOOS و GOARCH",
          title: "cross-compile: تبني لويندوز وماك ولينكس ARM من نفس الجهاز",
          desc: R`Go بتبني لأي نظام ومعالج من أي جهاز، من غير أدوات زيادة. كل اللي بتغيّره متغيرين environment قبل [[go build]]:
• [[GOOS]]: النظام: [[linux]] و [[darwin]] (ماك) و [[windows]] و [[freebsd]]...
• [[GOARCH]]: المعالج: [[amd64]] (Intel و AMD العادي) و [[arm64]] (ماك M1 وما بعده، و Raspberry Pi 4 و 5، وسيرفرات AWS Graviton).

[[GOOS=linux GOARCH=arm64 go build -o app .]]: الكتابة دي في bash بتحط المتغيرات للأمر ده بس.

[[go tool dist list]] بيعرض كل التركيبات المدعومة.

الـ cross-compile بسيط طول ما مفيش cgo. لما GOOS أو GOARCH مختلفين عن جهازك، Go بتقفل cgo لوحدها، فلو مكتبة محتاجاه البناء هيفشل أو هيطلع ناقص.

ولو فيه كود خاص بنظام معين: ملف اسمه [[file_windows.go]] بيدخل البناء على ويندوز بس، و [[file_linux.go]] على لينكس بس. أو سطر [[//go:build linux]] في أول الملف.

و [[-X main.version=...]] بيحط رقم النسخة في الـ binary وقت البناء (من درس go build)، ومفيد مع الإصدارات.`,
          example: R`go tool dist list | grep -E '^(linux|darwin|windows)/'
GOOS=linux GOARCH=amd64 go build -o dist/app-linux-amd64 .
GOOS=linux GOARCH=arm64 go build -o dist/app-linux-arm64 .
GOOS=darwin GOARCH=arm64 go build -o dist/app-macos-arm64 .
GOOS=windows GOARCH=amd64 go build -ldflags="-X main.version=1.2.0" -o dist/app.exe .
file dist/*`,
          try: R`ابني برنامج hello لـ ٣ أنظمة وشوف [[file dist/*]]. وبعدين جرّب تشغّل نسخة الـ arm64 على جهاز amd64 (أو العكس) واقرا الـ error. ولو عندك Raspberry Pi أو سيرفر arm64، انسخ الملف بـ scp وشغّله.`,
          deep: {
            why: R`أداة CLI بتنزل لويندوز وماك ولينكس، أو سيرفر arm64 أرخص على AWS، أو Raspberry Pi: كلهم من جهازك في ثواني، من غير VM ولا جهاز لكل نظام. ده من أسباب إن أدوات زي gh و terraform و kubectl مكتوبة بـ Go.`,
            how: R`الـ compiler بتاع Go نفسه بيعرف يطلّع كود لكل المعالجات، والمكتبة القياسية مكتوبة لكل الأنظمة، فمش محتاج toolchain مختلف زي C.

[[file]] بيقرا أول بايتات الملف ويقولك نوعه: [[ELF 64-bit LSB executable, ARM aarch64]] للينكس arm64، و [[Mach-O 64-bit arm64 executable]] للماك، و [[PE32+ executable ... x86-64]] لويندوز.

[[grep -E '^(linux|darwin|windows)/']]: regex بيفلتر السطور اللي بتبدأ بالأنظمة دي.

Docker بيبني لأكتر من معالج بـ [[docker buildx build --platform linux/amd64,linux/arm64]]، ومع Go الأسرع إنك تخلي مرحلة البناء تشتغل على معالج جهازك وتعمل cross-compile بـ [[TARGETOS]] و [[TARGETARCH]] بدل emulation.

[[GoReleaser]] أداة بتعمل كل ده (بناء لكل الأنظمة، وأرشيفات، و checksums، و GitHub Release) من ملف إعدادات واحد.`,
            when: R`إصدار أدوات CLI، والنشر على سيرفرات arm64، والأجهزة الصغيرة، والبناء على ماك لسيرفر لينكس (لو مش بتستخدم Docker).`,
            mistakes: R`تبني على ماك M1 وتنسخ لسيرفر لينكس: [[cannot execute binary file: Exec format error]]. وتعتمد على مكتبة فيها cgo ([[go-sqlite3]]) وتعمل cross-compile فيفشل (البديل [[modernc.org/sqlite]] بـ Go صافي). وتنسى [[.exe]] في اسم ملف ويندوز.`
          },
          lines: [
            "التركيبات المدعومة للأنظمة التلاتة بس.",
            "لينكس على Intel/AMD.",
            "لينكس على ARM (Graviton و Raspberry Pi).",
            "ماك M1 وما بعده.",
            R`ويندوز، ومعاه رقم النسخة بـ [[-X]].`,
            "نوع كل ملف اتبنى."
          ],
          sol: R`[[file dist/*]]:
[[dist/app-linux-amd64: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), statically linked, ...]]
[[dist/app-linux-arm64: ELF 64-bit LSB executable, ARM aarch64, version 1 (SYSV), statically linked, ...]]
[[dist/app-macos-arm64: Mach-O 64-bit arm64 executable, ...]]
[[dist/app.exe: PE32+ executable (console) x86-64, for MS Windows, ...]]

تشغيل نسخة arm64 على جهاز amd64: [[cannot execute binary file: Exec format error]] (أو [[exec format error]] في Docker). يعني الملف سليم بس لمعالج تاني.`
        },
        {
          cmd: "worker pool و errgroup",
          title: "worker pool و errgroup: تحدد عدد الشغل المتوازي وتوقف عند أول error",
          desc: R`[[go f()]] لكل عنصر في قايمة فيها 100 ألف عنصر معناه 100 ألف طلب على الداتابيز أو API في نفس اللحظة: هتوقعها أو هتتعمل rate limit. الحل إنك تحدد العدد.

Worker pool بالـ channels:
• channel للشغل [[jobs]] و channel للنتايج [[results]].
• N goroutines (workers) كل واحد بيعمل [[for id := range jobs]].
• goroutine بتبعت الشغل وتقفل jobs لما تخلص.
• goroutine بتستنى الـ workers ([[wg.Wait()]]) وتقفل results، فالـ range على results يخلص.

[[errgroup]] (من [[golang.org/x/sync/errgroup]]، مكتبة رسمية من فريق Go بس مش في القياسية) بيعمل ده بشكل أبسط لما كل اللي محتاجه «شغّل دول بالتوازي، واستنى، ورجّعلي أول error»:
• [[g, ctx := errgroup.WithContext(ctx)]]: لو أي واحد رجّع error، الـ ctx بيتلغي فالباقيين يقدروا يوقفوا.
• [[g.SetLimit(2)]]: اتنين بس في نفس الوقت. [[g.Go]] بيستنى لو العدد كامل.
• [[g.Go(func() error { ... })]] لكل شغلانة، و [[g.Wait()]] بيرجّع أول error.

والـ [[case <-time.After(...):]] الفاضي في المثال معناه «استنى المدة ومتعملش حاجة»، فالكود يكمّل بعد الـ select.`,
          example: R`package main

import (
  "context"
  "fmt"
  "sync"
  "time"

  "golang.org/x/sync/errgroup"
)

func resize(id int) int {
  time.Sleep(20 * time.Millisecond)
  return id * 10
}

func pool(ids []int, workers int) []int {
  jobs := make(chan int)
  results := make(chan int)
  var wg sync.WaitGroup
  for range workers {
    wg.Add(1)
    go func() {
      defer wg.Done()
      for id := range jobs {
        results <- resize(id)
      }
    }()
  }
  go func() {
    for _, id := range ids {
      jobs <- id
    }
    close(jobs)
  }()
  go func() {
    wg.Wait()
    close(results)
  }()
  var out []int
  for r := range results {
    out = append(out, r)
  }
  return out
}

func fetchAll(ctx context.Context, urls []string) error {
  g, ctx := errgroup.WithContext(ctx)
  g.SetLimit(2)
  for _, u := range urls {
    g.Go(func() error {
      select {
      case <-ctx.Done():
        return ctx.Err()
      case <-time.After(10 * time.Millisecond):
      }
      if u == "bad" {
        return fmt.Errorf("fetch %s: status 500", u)
      }
      return nil
    })
  }
  return g.Wait()
}

func main() {
  start := time.Now()
  res := pool([]int{1, 2, 3, 4, 5, 6, 7, 8}, 4)
  fmt.Println(len(res), time.Since(start).Round(10*time.Millisecond))
  fmt.Println(fetchAll(context.Background(), []string{"a", "bad", "c"}))
}`,
          try: R`[[go get golang.org/x/sync/errgroup]] وشغّل. (لو go get قالك [[requires go >= 1.26.0]] يبقى آخر نسخة من المكتبة محتاجة Go أحدث من اللي عندك: حدّث Go، أو اختار نسخة أقدم بـ [[go get golang.org/x/sync@v0.17.0]].) وبعدين غيّر عدد الـ workers لـ 1 ثم 8 وقارن الوقت. وبعدين خلي pool ترجّع النتايج بنفس ترتيب المدخلات (تلميح: ابعت المكان مع الـ id، واكتب في [[out[i]]] على slice محجوزة بالطول).`,
          flag: "script",
          deep: {
            why: R`الـ concurrency من غير حد بيكسّر الحاجات اللي بتكلّمها: الداتابيز ليها حد اتصالات، والـ APIs ليها rate limit، والذاكرة ليها حد. والـ worker pool و errgroup هما النمطين اللي هتلاقيهم في كل كود Go بيعالج دفعات (batch): رفع ملفات، وإرسال إشعارات، و import داتا.`,
            how: R`في pool: 8 شغلانات و 4 workers وكل شغلانة 20ms، فالوقت حوالي 40ms (دفعتين). مع worker واحد 160ms.

الترتيب في results مش مضمون: كل worker بيخلّص في وقت مختلف.

ليه goroutine منفصلة بتعمل [[wg.Wait()]] ثم [[close(results)]]؟ لأن main مشغولة بتقرا results. لو main عملت Wait الأول، الـ workers هيعلّقوا وهما بيبعتوا في results ومحدش بيقرا: deadlock.

في fetchAll، [[u]] جوه الـ closure آمن لأن من Go 1.22 كل لفّة ليها نسختها. الـ "bad" بيرجّع error، فـ errgroup بيلغي الـ ctx، و "c" لو لسه مستنية هتشوف [[ctx.Done()]] وترجع بدري. و [[g.Wait()]] بيرجّع أول error بس.

لو محتاج النتايج من errgroup: اعمل slice بطول المدخلات قبل الـ loop، وكل goroutine تكتب في [[results[i]]] بتاعها: مفيش race لأن كل واحدة بتكتب في خانة مختلفة.`,
            when: R`worker pool لما الشغل جاي من مصدر مستمر (queue أو ملف ضخم) أو محتاج workers طويلة العمر. errgroup لما عندك قايمة محددة وعايز «كلهم ينجحوا أو أوقف». و [[SetLimit]] أو [[semaphore]] لما تحتاج حد بس من غير pool كامل.`,
            mistakes: R`goroutine لكل عنصر من غير حد. وتنسى [[close(jobs)]] فالـ workers يستنوا للأبد. وتقفل results من worker (أكتر من worker هيقفلوها: panic). و main تعمل wg.Wait قبل ما تقرا النتايج: deadlock. و errgroup من غير WithContext فالـ goroutines التانية متعرفش إن فيه فشل.`
          },
          lines: [
            "باكدج main.",
            "imports.",
            "context.",
            "fmt.",
            "sync.",
            "time.",
            "مكتبة رسمية بره القياسية.",
            "قفلة.",
            "شغلانة بتاخد وقت.",
            "20ms.",
            "النتيجة.",
            "قفلة.",
            R`worker pool بعدد workers.`,
            "channel الشغل.",
            "channel النتايج.",
            "WaitGroup للـ workers.",
            R`N worker.`,
            "سجّل.",
            "worker...",
            "...Done لما يخلص.",
            "خد شغل لحد ما jobs تتقفل...",
            "...واعمله وابعت النتيجة.",
            "قفلة.",
            "قفلة الـ worker.",
            "قفلة الـ loop.",
            "goroutine بتبعت الشغل...",
            "...لكل id...",
            "...ابعت.",
            "قفلة.",
            "مفيش شغل تاني.",
            "قفلة.",
            "goroutine بتستنى الـ workers...",
            "...لما كلهم يخلصوا...",
            "...اقفل النتايج.",
            "قفلة.",
            "اجمع.",
            "لحد ما results تتقفل.",
            "ضيف.",
            "قفلة.",
            "رجّع.",
            "قفلة.",
            "نفس الفكرة بـ errgroup.",
            "group و ctx بيتلغي مع أول error.",
            "اتنين بس في نفس الوقت.",
            "لكل URL...",
            "...شغّل (بيستنى لو فيه اتنين شغالين).",
            "استنى...",
            "...الإلغاء...",
            "...ورجّع سببه...",
            "...أو 10ms ومتعملش حاجة.",
            "قفلة.",
            "لو bad...",
            "...error.",
            "قفلة.",
            "نجاح.",
            "قفلة.",
            "قفلة.",
            "استنى ورجّع أول error.",
            "قفلة.",
            "main.",
            "الوقت.",
            "8 شغلانات، 4 workers.",
            "8 نتايج في حوالي 40ms.",
            "أول error.",
            "قفلة."
          ],
          sol: R`الناتج:
[[8 40ms]]
[[fetch bad: status 500]]

بـ worker واحد: [[8 160ms]]، وبـ 8: [[8 20ms]]. الوقت بيقل مع الـ workers لحد ما يبقى عددهم قد عدد الشغل (أو قد الحد اللي الخدمة التانية تستحمله).

pool بالترتيب (الكود تحت): بنبعت [[job{i, id}]]، والـ worker بيكتب في [[out[j.i]]]. مفيش race لأن كل worker بيكتب في خانة مختلفة، والنتيجة [[[10 20 30 40 50 60 70 80]]].`,
          solCode: R`type job struct{ i, id int }

func orderedPool(ids []int, workers int) []int {
  out := make([]int, len(ids))
  jobs := make(chan job)
  var wg sync.WaitGroup
  for range workers {
    wg.Go(func() {
      for j := range jobs {
        out[j.i] = resize(j.id)
      }
    })
  }
  for i, id := range ids {
    jobs <- job{i, id}
  }
  close(jobs)
  wg.Wait()
  return out
}`
        },
        {
          cmd: "Gin و Echo و chi",
          title: "Gin و chi: إمتى تحتاج framework، وإمتى net/http كفاية",
          desc: R`من Go 1.22 الـ [[net/http]] فيها routing بالـ methods والـ parameters، فأغلب الـ APIs تقدر تتكتب من غير framework. بس فيه مكتبات مشهورة هتقابلها في الشغل:

• [[chi]]: router صغير متوافق 100٪ مع net/http (الـ handlers هي هي [[func(w, r)]]). بيضيف groups ([[r.Route("/api/v1", ...)]]) و middleware لكل group ومجموعة middlewares جاهزة (RequestID و Logger و Recoverer و Timeout). لو بدأت بالقياسي وكبرت، chi أسهل نقلة.
• [[Gin]]: أشهر framework. الـ handler شكله مختلف: [[func(c *gin.Context)]]، و [[c.Param("id")]] و [[c.JSON(200, gin.H{...})]] و [[c.ShouldBindJSON(&in)]] مع validation بالـ tags. أسرع في الكتابة، بس كودك بيبقى مربوط بيه.
• [[Echo]] و [[Fiber]]: شبه Gin. Fiber مبني على fasthttp مش net/http، فمش متوافق مع middlewares المكتبة القياسية.

إمتى تختار إيه؟
• مشروع جديد أو فريق صغير: القياسي، وبعدين chi لو احتجت groups.
• فريق متعود على Gin، أو مشروع موجود بيه: Gin تمام.
• محتاج Fiber لأداء استثنائي: نادرًا، وقيس الأول (الداتابيز غالبًا هي البطء مش الـ router).

الفكرة المهمة: اللي بتتعلمه في net/http (Handler و middleware و context و httptest) هو الأساس اللي كلهم مبنيين عليه.

[[gin.H]] مجرد اسم مختصر لـ [[map[string]any]].`,
          example: R`package main

import (
  "log"
  "net/http"

  "github.com/go-chi/chi/v5"
  "github.com/go-chi/chi/v5/middleware"
)

func main() {
  r := chi.NewRouter()
  r.Use(middleware.RequestID)
  r.Use(middleware.Logger)
  r.Use(middleware.Recoverer)

  r.Route("/api/v1", func(r chi.Router) {
    r.Get("/users/{id}", func(w http.ResponseWriter, r *http.Request) {
      w.Write([]byte("user " + chi.URLParam(r, "id") + "\n"))
    })
  })

  log.Fatal(http.ListenAndServe(":8080", r))
}`,
          try: R`[[go get github.com/go-chi/chi/v5]] وشغّل وجرّب [[curl localhost:8080/api/v1/users/7]] وبص على اللوج. وبعدين اكتب نفس الـ endpoint بـ Gin (الحل تحت) و [[go get github.com/gin-gonic/gin]]، ورجّع JSON بدل النص. وقارن حجم الـ binary في الحالتين بـ [[go build]] و [[ls -lh]].`,
          flag: "script",
          deep: {
            why: R`هتقابل Gin في أغلب إعلانات الشغل والمشاريع الموجودة، فلازم تقراه وتكتبه. بس الفهم الحقيقي في net/http، وده اللي بيخليك تنقل بين أي framework في يوم، وتعرف تكتب سيرفر من غير أي حاجة لو احتجت.`,
            how: R`[[r.Use]] بيضيف middleware لكل اللي جوّا الـ router ده. و [[r.Route]] بيعمل sub-router ليه prefix، وممكن يبقى له middlewares خاصة بيه ([[r.With(auth).Get(...)]]).

[[chi.URLParam(r, "id")]] هو المقابل لـ [[r.PathValue("id")]]. والـ middlewares بتاعة chi شكلها [[func(http.Handler) http.Handler]]، نفس اللي كتبناه في درس الـ middleware، فتقدر تخلطهم.

في Gin [[gin.Default()]] بيضيف Logger و Recovery لوحده. و [[c.ShouldBindJSON(&in)]] بيعمل decode و validation بالـ tags ([[binding:"required,email"]]) في سطر. [[r.Run(":8080")]] بيشغّل [[http.ListenAndServe]] من جوّا. وللإنتاج اعمل [[http.Server]] بـ timeouts وادّيله [[Handler: r]] زي درس الإغلاق النضيف.

الحجم: Gin بيسحب dependencies أكتر بكتير من chi (validator و json و msgpack...)، فالـ binary أكبر بعدة ميجا.`,
            when: R`القياسي: أي API جديد. chi: لما الـ routes تكتر ومحتاج groups و middlewares لكل جزء، وعايز تفضل على net/http. Gin: لو الفريق أو المشروع عليه، أو عايز binding و validation جاهزين.`,
            mistakes: R`تختار framework قبل ما تعرف net/http فتتلخبط لما تحتاج حاجة الـ framework مش عاملها. و [[r.Run]] في الإنتاج من غير timeouts. و Fiber عشان «الأسرع» وبعدين تكتشف إن مكتبات كتير مش شغالة معاه. وتخلط Gin context ([[*gin.Context]]) مع [[context.Context]]: استخدم [[c.Request.Context()]] للإلغاء.`
          },
          lines: [
            "باكدج main.",
            "imports.",
            "log.",
            "net/http.",
            "chi.",
            "الـ middlewares الجاهزة بتاعة chi.",
            "قفلة.",
            "main.",
            "router.",
            "request ID لكل طلب.",
            "لوج لكل طلب.",
            "recover من الـ panic ويرد 500.",
            R`group بـ prefix [[/api/v1]].`,
            "GET بـ parameter.",
            R`[[chi.URLParam]] زي [[r.PathValue]].`,
            "قفلة.",
            "قفلة الـ group.",
            R`الـ router نفسه [[http.Handler]]، فـ ListenAndServe بتاخده.`,
            "قفلة."
          ],
          sol: R`[[curl localhost:8080/api/v1/users/7]]: [[user 7]]، واللوج بتاع chi:
[[2026/10/01 12:00:00 [host/abc-000001] "GET http://localhost:8080/api/v1/users/7 HTTP/1.1" from 127.0.0.1:51234 - 200 7B in 20.1µs]]

بـ Gin (الكود تحت): [[{"id":"7"}]]، و Gin بيطبع تحذير [[[WARNING] Running in "debug" mode]] لحد ما تحط [[GIN_MODE=release]]. وحجم الـ binary بـ Gin أكبر بشكل ملحوظ من chi (حوالي الضعف لبرنامج بالحجم ده).`,
          solCode: R`package main

import (
  "net/http"

  "github.com/gin-gonic/gin"
)

func main() {
  r := gin.Default()
  r.GET("/api/v1/users/:id", func(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{"id": c.Param("id")})
  })
  r.Run(":8080")
}`
        }
      ]
    },
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

٤: v نسخة، فـ x متغيّرش: [[[1 2 3]]]. ([[_ = v]] عشان الـ compiler ميشتكيش إن v متغيّر ومش مستخدم بعد التعديل.)

٥: الـ defers بتتنفذ لما main تخلص بالعكس: [[2 1 0]].

وسؤال الـ 10,000 URL: الإجابة الكويسة فيها: errgroup أو worker pool بحد (مثلًا 20)، و http.Client واحد بـ timeout، و context بمهلة كلية بيتلغي مع أول error لو ده المطلوب (أو تجمع الأخطاء لو لأ)، و retry بـ backoff للـ 5xx بس، واحترام الـ rate limit (429 و Retry-After).`,
            when: R`قبل أي انترفيو Go. وكمان كـ checklist وانت بتعمل code review: الحاجات دي هي اللي بتعدّي من غير ما حد يلاحظ.`,
            mistakes: R`تحفظ إجابات من غير ما تجرّب الكود بنفسك. وتقول «goroutines أسرع من threads» من غير ما تشرح ليه (أخف في الذاكرة والـ scheduling، مش أسرع في الحساب). وتقول «Go مفيهاش OOP» (فيها: structs و methods و interfaces و composition، بس مفيش inheritance).`
          },
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
            "عشان الـ compiler.",
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
  ]
});
