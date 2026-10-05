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
    }
  ]
});
