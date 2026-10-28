// تكملة تاب python: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/python/01.js (شرح حقول الدرس في أوله)
MORE("python", [
    {
      t: "مشروع: حزمة Python فيها أمر",
      l: 3,
      time: R`حوالي ساعتين`,
      goal: [
        R`تعمل حزمة لها [[pyproject.toml]]، وتسطّبها بحيث تبقى **أمر** بتكتبه باسمه.`,
        R`تكتب واجهة [[argparse]] فيها أنواع وخيارات متنافية ومساعدة متولّدة.`,
        R`تفصل المنطق عن الواجهة، فالمنطق يتختبر من غير ملفات.`,
        R`تعرف إيه اللي بيتحط في الحزمة بالظبط قبل ما توزّعها.`,
      ],
      use: {
        prog: R`فصل [[core]] عن [[cli]] هو الفرق بين كود يتختبر وكود لازم تشغّله عشان تشوفه. والاختبارات اللي محتاجة ملفات بتبقى بطيئة وهشّة.`,
        work: R`الأداة اللي بتتسطّب في [[venv]] وبتتنادى باسمها بتبقى جزء من شغلك. واللي بتتنادى بـ [[python path/to/script.py]] بتتنسى.`,
        cs: R`الـ entry point إعلان: «الاسم ده يشاور على الدالة دي». وأداة التسطيب بتولّد الملف التنفيذي منه. نفس فكرة [[bin]] في npm.`,
      },
      lab: R`mkdir -p ~/lab/plab && cd ~/lab/plab && python -m venv .venv`,
      projects: [
        { t: R`زوّد تنسيق CSV للخرج`, what: R`[[--out csv]] بتطبع الملخص كـ CSV بدل النص، عشان تقدر تحطه في ملف وتفتحه. استخدم [[csv.DictWriter]] على [[sys.stdout]]. من درس ٣.` },
        { t: R`اقرا JSONL كمان`, what: R`الأداة بتقرا CSV. خليها تقرا JSONL برضه حسب الامتداد أو حسب [[--format]]. ساعتها هتشتغل على ناتج مشاريعك التانية (مراقبة PowerShell، و [[jl]] في Node). من دروس ٢ و ٣.` },
        { t: R`اختبارات للواجهة كمان`, what: R`[[main]] بتاخد [[argv]] كـ parameter عشان كده: [[main(["x.csv", "-q"])]]. اكتب اختبارات بتنادي [[main]] مباشرة وبتتأكد من كود الخروج. من درس ٤.` },
        { t: R`شغّلها من غير تسطيب`, what: R`[[pipx run <الحزمة>]] أو [[uvx <الحزمة>]] بتشغّل أداة من غير ما تسطّبها في بيئتك. جرّبها على أداة معروفة وشوف الفرق.` },
      ],
      n: R`هنبني [[tally]]: أداة بتقرا ملف CSV وبتلخّصه — عدد الصفوف، وتوزيع عمود، وإحصاءات عمود رقمي. أربع خطوات، من ملف لحزمة فيها أمر`,
      items: [
        {
          cmd: "مشروع — venv و pyproject والأمر",
          title: "من ملف لحزمة اسمها بيتكتب في الترمنال",
          learn: R`تعمل بيئة معزولة، وتعرّف الحزمة في [[pyproject.toml]]، وتسطّبها بشكل قابل للتعديل.`,
          out: R`[[tally sales.csv]] بدل [[python src/tally/cli.py sales.csv]].`,
          use: {
            prog: R`[[project.scripts]] بتعلن «الاسم ده يشاور على الدالة دي»، وأداة التسطيب بتولّد الملف التنفيذي. نفس [[bin]] في npm.`,
            work: R`الـ venv بتخلي كل مشروع بمكتباته. ومن غيرها، مشروعين محتاجين نسختين من نفس المكتبة بيتخانقوا.`,
            cs: R`العزل: كل بيئة ليها [[sys.prefix]] خاص بيها، والـ interpreter بيدوّر على المكتبات جواها. تجريد بسيط بيحل مشكلة قديمة.`,
          },
          desc: R`الأداة اللي هنبنيها اسمها [[tally]]: بتقرا CSV وبتلخّصه.

وأول خطوتين مش كود:

**البيئة المعزولة.** [[python -m venv .venv]] بتعمل نسخة معزولة من Python في فولدر. وأي تسطيب جواها مش بيأثر على باقي الجهاز. وتتأكد إنك جواها بـ:

[[sys.prefix != sys.base_prefix]]

لو [[True]]، انت جوه venv.

**[[pyproject.toml]]** هو ملف تعريف المشروع المعياري. وفيه تلات أقسام:

[[[build-system]]] مين هيبني الحزمة ([[setuptools]] أو [[hatchling]] أو [[flit]]).
[[[project]]] الاسم والنسخة والوصف وأقل نسخة Python.
[[[project.scripts]]] **الحتة اللي بتحوّلها لأمر**: [[tally = "tally.cli:main"]] معناها «الأمر [[tally]] بينادي الدالة [[main]] في [[tally/cli.py]]».

وبعدين [[pip install -e .]]: بتسطّب المشروع **قابل للتعديل** — يعني بتربط الكود بدل ما تنسخه. فالتعديل بيبان على طول، زي [[npm link]] بالظبط.

وبنستخدم **src layout**: الكود في [[src/tally/]] مش في [[tally/]] مباشرة. والسبب إنه بيمنع Python من إنه يلاقي الحزمة بالصدفة من المجلد الحالي — فاللي بتختبره هو **المتسطّب** مش الملفات اللي جنبك.`,
          example: R`# pyproject.toml
[build-system]
requires = ["setuptools>=68"]
build-backend = "setuptools.build_meta"

[project]
name = "tally"
version = "1.0.0"
description = "أداة سطر أوامر بتلخّص ملفات CSV"
requires-python = ">=3.11"
license = "MIT"

[project.scripts]
tally = "tally.cli:main"

[tool.setuptools.packages.find]
where = ["src"]`,
          lines: [
            R`مين هيبني الحزمة.`,
            R`الأداة اللي هتبني.`,
            R`والدالة اللي هتتنادى فيها.`,
            R`معلومات المشروع.`,
            R`الاسم. ده اللي بيتكتب في [[pip install]].`,
            R`النسخة.`,
            R`بتظهر في [[--help]] وفي بيانات الحزمة.`,
            R`أقل نسخة Python.`,
            R`الرخصة.`,
            R`**القسم اللي بيحوّلها لأمر**.`,
            R`[[الأمر = "الوحدة:الدالة"]]. والدالة لازم تبقى موجودة فعلًا.`,
            R`إعدادات setuptools.`,
            R`الكود في [[src/]] — بيمنع Python يلاقي الحزمة بالصدفة.`,
          ],
          try: R`اعمل الهيكل و [[pyproject.toml]]، وبعدين [[python -m venv .venv]] و [[.venv/Scripts/python -m pip install -e .]]. وبعدين شوف [[.venv/Scripts/]] وهتلاقي ملف باسم الأمر.`,
          flag: "script",
          mac: ["diff", R`المسارات مختلفة: على الماك ولينكس الـ venv بتحط الملفات في [[.venv/bin/]] مش [[.venv/Scripts/]]، والتفعيل [[source .venv/bin/activate]] بدل [[.venv\Scripts\activate]]. و[[python3]] بدل [[python]].`],
          deep: {
            why: R`الأداة اللي محتاجة مسار كامل مش أداة. والمشروع من غير [[venv]] بيكسر مشروع تاني أول ما تحتاج نسخة مختلفة من مكتبة.`,
            how: R`**الـ venv** بتعمل فولدر فيه: نسخة (أو رابط) من الـ interpreter، و [[site-packages]] فاضي، وملف [[pyvenv.cfg]] فيه مسار الـ Python الأصلي.

ولما تشغّل الـ Python اللي جواها، [[sys.prefix]] بتبقى الفولدر ده، و [[sys.base_prefix]] بتبقى الأصلي. والفرق بينهم هو اللي بيقولك إنك جوه بيئة.

و **التفعيل ([[activate]]) مش إجباري**: هو بس بيضيف [[.venv/bin]] لأول الـ PATH عشان تكتب [[python]] بدل [[.venv/bin/python]]. والنداء بالمسار الكامل بيشتغل من غير تفعيل خالص — وده أوضح في السكربتات.

**[[pyproject.toml]]** حل محل [[setup.py]] و [[setup.cfg]]. والـ [[[build-system]]] هو اللي بيخلي أي أداة ([[pip]] أو [[build]] أو [[uv]]) تعرف تبني المشروع من غير ما تعرف setuptools.

**[[project.scripts]]** بتتحوّل لـ entry point في بيانات الحزمة. وشفت ده في الـ wheel:

~~~text entry_points.txt
[console_scripts]
tally = tally.cli:main
~~~

وأداة التسطيب بتقرا ده وبتولّد ملف تنفيذي في [[bin]] أو [[Scripts]] بينادي الدالة.

**و [[-e]] (editable)**: بتحط رابط للمشروع بدل نسخة. وشفت إن التعديل بيبان على طول من غير إعادة تسطيب.

**و src layout**: من غيره، لو انت واقف في جذر المشروع، [[import tally]] هتاخد الفولدر اللي جنبك — حتى لو التسطيب مكسور. ومع [[src/]]، الاستيراد لازم يجي من المتسطّب. يعني اختباراتك بتختبر اللي هيتوزّع فعلًا.

وده كمان بيخلي الـ wheel أنضف: شفت إن الملفات اللي دخلت الحزمة هي الـ ٣ ملفات بتوع [[src/tally/]] بس — [[sales.csv]] و [[tests/]] متدخلوش.`,
            when: R`أي مشروع Python هتشتغل عليه أكتر من مرة. والـ venv من أول يوم.`,
            mistakes: R`تسطّب في Python العام بدل الـ venv. أو تنسى [[-e]] فتضطر تعيد التسطيب مع كل تعديل. أو تستخدم flat layout وتختبر الملفات اللي جنبك بدل المتسطّب. أو تكتب [[tally = "cli:main"]] من غير اسم الحزمة.`
          },
          teach: R`## الأداة اللي هنبنيها

~~~text sales.csv
city,product,amount
القاهرة,لابتوب,15000
الإسكندرية,ماوس,250
القاهرة,كيبورد,800
الجيزة,لابتوب,16500
القاهرة,ماوس,,
الإسكندرية,شاشة,4200
~~~

~~~text والناتج المطلوب
الصفوف: 6

توزيع city:
  القاهرة      3
  الإسكندرية   2
  الجيزة       1
~~~

---

## ١. الهيكل: src layout

~~~text
plab/
  pyproject.toml
  src/
    tally/
      __init__.py
      core.py       المنطق — من غير طباعة ولا ملفات
      cli.py        الواجهة
  tests/
    test_core.py
~~~

**ليه [[src/]]؟** من غيره، لو انت واقف في جذر المشروع، [[import tally]] هتاخد الفولدر اللي جنبك — **حتى لو التسطيب مكسور**. ومع [[src/]]، الاستيراد لازم يجي من المتسطّب.

يعني اختباراتك بتختبر اللي هيتوزّع فعلًا.

---

## ٢. البيئة المعزولة

~~~bash Python 3.14
python -m venv .venv
~~~

~~~bash وتتأكد إنك جواها
.venv/Scripts/python -c "import sys; print(sys.prefix != sys.base_prefix)"
~~~

~~~text الناتج (اتشغّل فعلًا)
C:\...\plab\.venv\Scripts\python.exe
prefix مختلف؟ True
~~~

| | معناها |
|---|---|
| [[sys.prefix]] | مجلد البيئة الحالية |
| [[sys.base_prefix]] | Python الأصلي |
| مختلفين | **انت جوه venv** |

> **التفعيل ([[activate]]) مش إجباري.** هو بس بيضيف [[.venv/bin]] لأول الـ PATH. والنداء بالمسار الكامل شغال من غيره — وده أوضح في السكربتات والـ CI.

---

## ٣. [[pyproject.toml]]

~~~toml
[build-system]
requires = ["setuptools>=68"]
build-backend = "setuptools.build_meta"

[project]
name = "tally"
version = "1.0.0"
requires-python = ">=3.11"
license = "MIT"

[project.scripts]
tally = "tally.cli:main"

[tool.setuptools.packages.find]
where = ["src"]
~~~

**[[[project.scripts]]] هو السطر اللي بيحوّلها لأمر:**

~~~text
tally = "tally.cli:main"
  ↑         ↑        ↑
الاسم في   الوحدة   الدالة
الترمنال
~~~

---

## ٤. التسطيب القابل للتعديل

~~~bash
.venv/Scripts/python -m pip install -e .
~~~

~~~text واللي اتعمل (اتشغّل فعلًا)
.venv/Scripts/tally.exe
~~~

~~~text وبيشتغل
$ .venv/Scripts/tally sales.csv -g city
الصفوف: 6

توزيع city:
  القاهرة      3
  الإسكندرية   2
  الجيزة       1

$ .venv/Scripts/tally --version
tally 1.0.0
~~~

**و [[-e]] معناها رابط مش نسخة.** جرّبت: عدّلت [[الصفوف:]] لـ [[عدد الصفوف:]] في الكود، وشغّلت الأمر من غير أي إعادة تسطيب:

~~~text اتشغّل فعلًا
عدد الصفوف: 6
~~~

ظهر على طول. نفس [[npm link]] بالظبط.

---

## ٥. والفرق عن npm

| | npm | Python |
|---|---|---|
| ملف التعريف | [[package.json]] | [[pyproject.toml]] |
| الأمر | [[bin]] | [[project.scripts]] |
| الربط للتطوير | [[npm link]] | [[pip install -e .]] |
| العزل | [[node_modules]] محلي | [[venv]] |

الفرق الكبير إن Node بيعزل **لكل مشروع تلقائيًا**، و Python محتاج منك تعمل البيئة.

---

## الخلاصة

- [[venv]] من أول يوم، والتفعيل مش إجباري.
- [[sys.prefix != sys.base_prefix]] بتقولك انت جوه بيئة.
- [[project.scripts]] بتحوّل الحزمة لأمر.
- [[-e]] رابط مش نسخة.
- src layout بيخليك تختبر المتسطّب مش الملفات اللي جنبك.`,
          sol: R`التسطيب والأمر بناتجهم الحقيقي، والدليل إن [[-e]] رابط مش نسخة.`,
          solCode: R`python -m venv .venv
.venv/Scripts/python -m pip install -e .

# اللي اتعمل (اتشغّل فعلًا على Python 3.14.3):
# .venv/Scripts/tally.exe

.venv/Scripts/tally sales.csv -g city
# الصفوف: 6
#
# توزيع city:
#   القاهرة      3
#   الإسكندرية   2
#   الجيزة       1

.venv/Scripts/tally --version
# tally 1.0.0

# وبعد تعديل "الصفوف:" لـ "عدد الصفوف:" في الكود، من غير إعادة تسطيب:
# عدد الصفوف: 6`
        },

        {
          cmd: "مشروع — argparse بعمق",
          title: "أنواع وخيارات متنافية ومساعدة بتتولّد لوحدها",
          learn: R`تبني واجهة فيها positional اختياري وخيارات بأنواع ومجموعة متنافية.`,
          out: R`[[tally sales.csv -g city -v amount --json]] بتشتغل، و [[--json -q]] بترفض.`,
          use: {
            prog: R`[[argparse]] بتولّد المساعدة من التعريف نفسه. فالمساعدة مستحيل تبقى قديمة — زي [[SYNTAX]] في PowerShell بالظبط.`,
            work: R`الخيارات المتنافية لازم تترفض بوضوح، مش تتجاهل في صمت. والمستخدم لازم يعرف إيه اللي غلط.`,
            cs: R`تحويل النص لنوع ([[type=Path]]) عند الحدود هو الـ parse-don't-validate: بتحوّل مرة واحدة في المدخل، وباقي الكود بيشتغل على النوع الصح.`,
          },
          desc: R`[[argparse]] في المكتبة القياسية، وبتعمل أكتر من اللي الناس بتستخدمه منها.

**الأساس:**

[[add_argument("file")]] positional إجباري.
[[add_argument("file", nargs="?")]] positional **اختياري** — ودي اللي بتخلي الأداة تقرا من stdin لو مفيش ملف.
[[add_argument("-g", "--group")]] خيار بقيمة.
[[add_argument("--json", action="store_true")]] مفتاح.

**والحاجات اللي بتفرق:**

[[type=Path]] بتحوّل النص لـ [[Path]] **عند المدخل**. فباقي الكود بيشتغل على النوع الصح من غير تحويل في كل مكان.
[[metavar="عمود"]] بتغيّر الاسم اللي بيظهر في المساعدة — [[-g عمود]] أوضح من [[-g GROUP]].
[[add_mutually_exclusive_group()]] بتمنع خيارين يتكتبوا سوا. وبتظهر في سطر الاستخدام كـ [[--json | -q]].
[[action="version"]] بتعمل [[--version]] جاهزة.
[[epilog]] بتحط مثال تحت المساعدة.

**والمهم:** [[argparse]] بتطبع الخطأ وبتخرج بكود **٢** لوحدها. فمش محتاج تتعامل مع الأخطاء دي.

**ونصيحة في التصميم:** خلي [[main]] تاخد [[argv]] كـ parameter بقيمة افتراضية [[None]]. ساعتها تقدر تختبرها بـ [[main(["x.csv", "-q"])]] من غير ما تلعب في [[sys.argv]].`,
          example: R`def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        prog="tally",
        description="بتلخّص ملف CSV: عدد الصفوف، وتوزيع عمود، وإحصاءات عمود رقمي.",
        epilog="مثال:  tally sales.csv -g city -v amount",
    )
    p.add_argument("file", nargs="?", type=Path,
                   help="ملف CSV. لو مكتبتوش، بيقرا من stdin.")
    p.add_argument("-g", "--group", metavar="عمود",
                   help="العمود اللي هنحسب توزيعه")
    p.add_argument("-v", "--value", metavar="عمود",
                   help="العمود الرقمي اللي هنحسب إحصاءاته")
    p.add_argument("--encoding", default="utf-8-sig",
                   help="ترميز الملف (الافتراضي utf-8-sig)")
    out = p.add_mutually_exclusive_group()
    out.add_argument("--json", action="store_true", help="اطبع JSON")
    out.add_argument("-q", "--quiet", action="store_true", help="اطبع عدد الصفوف بس")
    p.add_argument("--version", action="version", version=f"%(prog)s {__version__}")
    return p


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    ...
    return 0 if rows else 1`,
          lines: [
            R`دالة لوحدها عشان تقدر تختبرها.`,
            R`بداية التعريف.`,
            R`الاسم اللي بيظهر في المساعدة.`,
            R`سطر الوصف فوق.`,
            R`مثال تحت المساعدة. حاجة بسيطة بتفرق جدًا.`,
            R`قفلة النداء.`,
            R`[[nargs="?"]] بتخليه **اختياري** (ودي اللي بتسمح بالقراية من stdin)، و [[type=Path]] بتحوّل عند المدخل.`,
            R`المساعدة بتاعته.`,
            R`خيار بقيمة. و [[metavar]] بتغيّر الاسم في المساعدة: [[-g عمود]] بدل [[-g GROUP]].`,
            R`المساعدة.`,
            R`خيار تاني بنفس الشكل.`,
            R`المساعدة.`,
            R`الترميز، بقيمة افتراضية.`,
            R`[[utf-8-sig]] بتتعامل مع الـ BOM اللي Excel بيحطه.`,
            R`**مجموعة متنافية**: واحد منهم بس.`,
            R`الأول.`,
            R`والتاني. ومحاولة كتابة الاتنين بتترفض بكود ٢.`,
            R`[[--version]] جاهزة. و [[%(prog)s]] بتتبدّل باسم البرنامج.`,
            R`بنرجّع الـ parser.`,
            R`**[[argv=None]]**: ساعتها تقدر تختبر [[main]] من غير ما تلعب في [[sys.argv]].`,
            R`التحليل. و [[None]] معناها «خد من [[sys.argv]]».`,
            R`باقي الكود.`,
            R`كود خروج معبّر: صفر لو فيه صفوف.`,
          ],
          try: R`شغّل [[tally --help]] واقرا سطر الاستخدام — هتلاقي [[[--json | -q]]]. وبعدين جرّب [[tally sales.csv --json -q]] وشوف الرسالة وكود الخروج.`,
          flag: "script",
          mac: ["both", R`[[argparse]] من المكتبة القياسية، نفس السلوك في كل الأنظمة.`],
          deep: {
            why: R`المساعدة اللي بتتكتب بإيدك بتبقى قديمة. واللي بتتولّد من التعريف مستحيل تبقى كده.`,
            how: R`[[argparse]] بتولّد: سطر الاستخدام، وقايمة الخيارات، و [[-h]]. وكلهم من نفس التعريف.

**[[nargs]]** ليها قيم:

| القيمة | معناها |
|---|---|
| [["?"]] | **صفر أو واحد** |
| [["*"]] | صفر أو أكتر → قايمة |
| [["+"]] | واحد أو أكتر → قايمة (وبتفشل لو مفيش) |
| رقم | العدد ده بالظبط |

**[[type]]** بتاخد أي دالة بتاخد نص وترجّع قيمة: [[int]] و [[float]] و [[Path]] و [[json.loads]]. ولو رمت، [[argparse]] بتطبع رسالة واضحة وتخرج بـ ٢.

وتقدر تكتب واحدة بنفسك:

~~~text
def positive(s):
    v = int(s)
    if v <= 0: raise argparse.ArgumentTypeError("لازم رقم موجب")
    return v
~~~

**[[action]]** ليها قيم كتير: [["store_true"]] و [["store_false"]] و [["append"]] (بتجمّع التكرار في قايمة) و [["count"]] (بتعد التكرار — زي [[-vvv]]) و [["version"]].

**و [[choices=["csv","json"]]]** بتقصر القيم، و [[argparse]] بتعرضها في المساعدة وبترفض غيرها.

**والـ subcommands**: [[subparsers = p.add_subparsers(dest="cmd")]] بتدّيك أوامر فرعية زي [[git commit]] و [[git push]]. وكل واحد ليه [[add_argument]] بتاعه. (ودي الحاجة اللي [[parseArgs]] في Node مفيهاش — درس node.)

**و [[argv=None]]** في [[main]]: [[parse_args(None)]] بتقرا من [[sys.argv]]، و [[parse_args(["a","-q"])]] بتقرا من القايمة. فالأداة تبقى قابلة للاختبار من غير أي حيلة.

**وعن [[utf-8-sig]]**: Excel بيحفظ CSV بـ BOM في أوله. و [[utf-8]] العادية بتقراه كحرف غريب في أول عمود، فاسم العمود بيبقى [[\ufeffcity]] بدل [[city]]. و [[utf-8-sig]] بتشيله.`,
            when: R`أي أداة سطر أوامر بـ Python.`,
            mistakes: R`تكتب المساعدة بإيدك بدل ما تسيب [[argparse]] تولّدها. أو تنسى [[nargs="?"]] فالأداة ترفض تشتغل من غير ملف. أو تخلي [[main]] تقرا [[sys.argv]] مباشرة فتبقى صعبة الاختبار. أو تستخدم [[utf-8]] مع ملفات Excel.`
          },
          teach: R`## المساعدة بتتولّد، مش بتتكتب

~~~bash اتشغّل فعلًا · Python 3.14
tally --help
~~~

~~~text
usage: tally [-h] [-g عمود] [-v عمود] [--encoding ENCODING] [--json | -q]
             [--version]
             [file]

بتلخّص ملف CSV: عدد الصفوف، وتوزيع عمود، وإحصاءات عمود رقمي.

positional arguments:
  file                 ملف CSV. لو مكتبتوش، بيقرا من stdin.

options:
  -h, --help           show this help message and exit
  -g, --group عمود     العمود اللي هنحسب توزيعه
~~~

تلات حاجات في الناتج ده اتولّدوا لوحدهم:

- **[[[file]]]** بين أقواس مربعة — لأن [[nargs="?"]].
- **[[[--json | -q]]]** — من المجموعة المتنافية.
- **[[-g عمود]]** — من [[metavar]]، بدل [[-g GROUP]].

---

## ١. [[nargs="?"]] بتخلي الملف اختياري

~~~python
p.add_argument("file", nargs="?", type=Path, help="...")
~~~

ودي اللي بتسمح بالاتنين:

~~~text اتشغّلوا فعلًا
$ tally sales.csv -q
6

$ cat sales.csv | tally -q
6
~~~

| [[nargs]] | معناها |
|---|---|
| [["?"]] | **صفر أو واحد** |
| [["*"]] | صفر أو أكتر → قايمة |
| [["+"]] | واحد أو أكتر → قايمة |
| رقم | العدد ده بالظبط |

---

## ٢. [[type]] بتحوّل عند الحدود

~~~python
p.add_argument("file", type=Path)
~~~

بعدها [[args.file]] تبقى [[Path]] مش نص. فباقي الكود بيستخدم [[.open()]] و [[.exists()]] على طول.

وبتاخد أي دالة بتاخد نص وترجّع قيمة: [[int]] و [[float]] و [[Path]] و [[json.loads]].

~~~python ونوع من عندك
def positive(s):
    v = int(s)
    if v <= 0:
        raise argparse.ArgumentTypeError("لازم رقم موجب")
    return v
~~~

ولو رمت، [[argparse]] بتطبع رسالة واضحة وتخرج بـ **٢** لوحدها.

---

## ٣. المجموعة المتنافية

~~~python
out = p.add_mutually_exclusive_group()
out.add_argument("--json", action="store_true")
out.add_argument("-q", "--quiet", action="store_true")
~~~

~~~text اتشغّل فعلًا
$ tally sales.csv --json -q
usage: tally [-h] [-g عمود] [-v عمود] [--encoding ENCODING] [--json | -q]
             [--version]
             [file]
tally: error: argument -q/--quiet: not allowed with argument --json

$ echo $?
2
~~~

**[[argparse]] بتطبع الخطأ وتخرج بـ ٢ لوحدها.** مش محتاج تتعامل مع ده.

---

## ٤. [[action]] فيها أكتر من [[store_true]]

| القيمة | بتعمل إيه |
|---|---|
| [["store_true"]] | مفتاح |
| [["append"]] | التكرار بيتجمّع في قايمة |
| [["count"]] | بتعد التكرار — زي [[-vvv]] |
| [["version"]] | [[--version]] جاهزة |

~~~python
p.add_argument("--version", action="version", version=f"%(prog)s {__version__}")
~~~

~~~text اتشغّل فعلًا
$ tally --version
tally 1.0.0
~~~

[[%(prog)s]] بتتبدّل باسم البرنامج.

---

## ٥. والـ subcommands

~~~python
sub = p.add_subparsers(dest="cmd", required=True)
show = sub.add_parser("show", help="اعرض")
show.add_argument("-n", type=int, default=10)
~~~

بتدّيك [[tally show -n 5]] و [[tally export ...]]. ودي الحاجة اللي [[parseArgs]] في Node مفيهاش (درس node).

---

## ٦. [[argv]] كـ parameter: قابلية الاختبار

~~~python
def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
~~~

| النداء | بيقرا من |
|---|---|
| [[main()]] | [[sys.argv]] |
| [[main(["x.csv", "-q"])]] | القايمة دي |

فتقدر تختبر الواجهة من غير أي حيلة في [[sys.argv]].

---

## ٧. وفخ Excel: [[utf-8-sig]]

~~~python
p.add_argument("--encoding", default="utf-8-sig")
~~~

Excel بيحفظ CSV بـ **BOM** في أوله. ومع [[utf-8]] العادية، اسم أول عمود بيبقى [[\ufeffcity]] بدل [[city]] — فـ [[-g city]] متلاقيش حاجة.

و [[utf-8-sig]] بتشيل الـ BOM لو موجود، وبتشتغل عادي لو مش موجود. فخليها الافتراضية.

---

## الخلاصة

- المساعدة بتتولّد من التعريف — متكتبهاش.
- [[nargs="?"]] عشان stdin.
- [[type]] بتحوّل عند الحدود.
- المجموعة المتنافية بترفض وبتخرج بـ ٢ لوحدها.
- [[argv=None]] في [[main]] عشان الاختبار.
- [[utf-8-sig]] الافتراضية مع CSV.`,
          sol: R`سطر الاستخدام المتولّد، ورفض الخيارين المتنافيين.`,
          solCode: R`tally --help
# usage: tally [-h] [-g عمود] [-v عمود] [--encoding ENCODING] [--json | -q]
#              [--version]
#              [file]
#
#   [file]          بين أقواس  ← من nargs="?"
#   [--json | -q]              ← من المجموعة المتنافية
#   -g عمود                    ← من metavar

tally sales.csv --json -q
# tally: error: argument -q/--quiet: not allowed with argument --json
# كود الخروج: 2

tally --version
# tally 1.0.0

# (اتشغّلوا فعلًا على Python 3.14.3)`
        },

        {
          cmd: "مشروع — المنطق منفصل عن الواجهة",
          title: "core بيرجّع dict، و cli بيقرا ويطبع",
          learn: R`تفصل الحساب عن القراية والطباعة، فالحساب يتختبر لوحده.`,
          out: R`دالة [[summarize]] بتتختبر بقايمة في الذاكرة، من غير أي ملف.`,
          use: {
            prog: R`الدالة النقية (بتاخد مدخلات وبترجّع مخرجات، من غير أثر جانبي) أسهل في الاختبار بمراحل. والاختبار اللي محتاج ملفات بيبقى بطيء وهشّ.`,
            work: R`لما تحتاج تضيف تنسيق خرج جديد، بتلمس [[cli]] بس. ولما تحتاج تضيف إحصائية، بتلمس [[core]] بس.`,
            cs: R`الـ hexagonal architecture في أبسط صورة: المنطق في النص، والمدخلات والمخرجات على الحواف.`,
          },
          desc: R`الأداة فيها ملفين، والتقسيم بينهم هو أهم قرار في المشروع:

**[[core.py]]** فيه [[summarize(rows, group, value)]]. بتاخد قايمة قواميس وبترجّع قاموس. **مفيش فيها [[print]] ولا [[open]] ولا [[sys]]**.

**[[cli.py]]** فيه القراية والطباعة والأخطاء.

والفايدة بتبان في الاختبار: [[summarize]] بتتختبر بقايمة مكتوبة بإيدك، في أجزاء من الثانية، من غير ملفات مؤقتة ولا تنضيف.

**وفي [[cli.py]]، القراية:**

[[csv.DictReader]] بتقرا كل صف كـ dict مفاتيحه أسماء الأعمدة. وبتاخد أي iterable من السطور — سواء ملف أو [[sys.stdin]]. فنفس الكود بيقرا من الاتنين.

**و [[newline=""]] في [[open]]** ضرورية مع [[csv]]: الوحدة بتتعامل مع نهايات السطور بنفسها، ومن غيرها الصفوف اللي فيها نصوص بأسطر بتتكسر.

**والأخطاء** بتتمسك بالنوع، وكل واحد برسالة بتقول الحل:

[[FileNotFoundError]] الملف مش موجود.
[[UnicodeDecodeError]] الترميز غلط — والرسالة بتقترح [[--encoding cp1256]].
[[OSError]] أي مشكلة تانية في الملف.

وكود الخروج بيفرّق: **٢** لمشكلة في المدخلات، و**١** لو الملف فاضي، و**٠** لو تمام.`,
          example: R`# src/tally/core.py — مفيش print ولا open
Row = dict[str, str]

def summarize(rows: list[Row], group: str | None = None,
              value: str | None = None) -> dict:
    out: dict = {"rows": len(rows)}
    if group:
        counts = Counter(r.get(group, "") for r in rows)
        out["group"] = group
        out["counts"] = dict(counts.most_common())
    if value:
        nums, bad = [], 0
        for r in rows:
            try:
                nums.append(float(r.get(value, "")))
            except (TypeError, ValueError):
                bad += 1
        out["value"] = value
        out["numeric"] = len(nums)
        out["skipped"] = bad
        if nums:
            out["sum"] = round(sum(nums), 4)
            out["mean"] = round(mean(nums), 4)
            out["median"] = round(median(nums), 4)
    return out`,
          lines: [
            R`اسم مختصر لشكل الصف. وبيمنع كمان تكرار [[dict[str, str]]] في كل مكان.`,
            R`بتاخد صفوف وبترجّع قاموس. **مفيش [[print]] ولا [[open]]**.`,
            R`باقي الـ parameters.`,
            R`الناتج، وأول حاجة فيه العدد.`,
            R`فيه عمود للتوزيع؟`,
            R`[[Counter]] بتعد. و [[r.get(group, "")]] بترجّع نص فاضي لو العمود مش موجود — بدل ما ترمي.`,
            R`اسم العمود في الناتج.`,
            R`[[most_common()]] بترتّب من الأكتر للأقل.`,
            R`فيه عمود رقمي؟`,
            R`الأرقام اللي عدّت، وعدد اللي فشل.`,
            R`على كل صف.`,
            R`بنحاول نحوّل.`,
            R`والناجح بيتضاف.`,
            R`**بنمسك النوعين**: [[ValueError]] للنص المش رقم، و [[TypeError]] لو القيمة [[None]].`,
            R`والفاشل بيتعدّ. **مبيوقّفش الحساب.**`,
            R`اسم العمود.`,
            R`كام رقم عدّى.`,
            R`وكام اتخطّى — ودي اللي بتقول للمستخدم إن فيه بيانات مش نضيفة.`,
            R`فيه أرقام أصلًا؟`,
            R`المجموع. و [[round]] عشان أخطاء العشرية متظهرش.`,
            R`المتوسط.`,
            R`الوسيط — بيقاوم القيم الشاذة أحسن من المتوسط.`,
            R`والناتج.`,
          ],
          try: R`افتح [[python]] واعمل [[from tally.core import summarize]] وناديها بقايمة قواميس كتبتها بإيدك. وبعدين جرّب عمود مش موجود وشوف [[skipped]] بتطلع كام.`,
          flag: "script",
          mac: ["both", R`نفس الكود. و [[newline=""]] في [[open]] مهمة في كل الأنظمة مع [[csv]].`],
          deep: {
            why: R`الدالة اللي بتطبع مينفعش تتختبر غير بالتقاط الطباعة. واللي بتقرا ملف محتاجة ملف. والاتنين بيخلوا الاختبارات بطيئة وهشّة.`,
            how: R`**[[csv.DictReader]]** بتاخد أي iterable بيرجّع سطور. فـ [[open(...)]] و [[sys.stdin]] الاتنين بيشتغلوا. وبترجّع dict لكل صف، مفاتيحه من أول سطر.

ولو فيه صف فيه أعمدة أقل، القيم الناقصة بتبقى [[None]] — وعشان كده بنمسك [[TypeError]] مع [[ValueError]] في [[float()]].

**[[newline=""]]**: وحدة [[csv]] بتتعامل مع نهايات السطور بنفسها لأن القيمة الواحدة ممكن تكون فيها سطر جديد (نص بين علامات تنصيص). ولو سبت Python يترجمها، الصفوف دي بتتكسر. والتوثيق بيقول ده صريح.

**[[Counter]]** من [[collections]]: dict بيعد. و [[.most_common()]] بترجّع أزواج مرتبة من الأكتر للأقل. و [[.most_common(3)]] بترجّع أكتر تلاتة.

**[[statistics]]**: [[mean]] و [[median]] من المكتبة القياسية. و [[median]] بتقاوم القيم الشاذة: صف فيه [[999999]] بيحرّك المتوسط كتير والوسيط شوية.

**وعن [[round]]**: [[0.1 + 0.2]] بتدّي [[0.30000000000000004]]. و [[round(x, 4)]] بتخفيها في العرض. ولو محتاج دقة حقيقية في الفلوس، [[decimal.Decimal]] هي الصح — بس دي قصة تانية.

**وأنواع الأخطاء في [[cli]]**: الترتيب مهم. [[UnicodeDecodeError]] نوع فرعي من [[ValueError]] مش من [[OSError]]، و [[FileNotFoundError]] نوع فرعي من [[OSError]]. فلو كتبت [[except OSError]] الأول، [[FileNotFoundError]] هتتمسك فيها ومش هتوصل للرسالة المخصصة.

**ورسالة الخطأ المفيدة** بتقول الحل: [[جرّب --encoding cp1256]] أحسن من [[UnicodeDecodeError]] لوحدها.`,
            when: R`أي أداة فيها حساب. والتقسيم من أول سطر، مش بعدين.`,
            mistakes: R`تحط [[print]] في [[core]] فتضطر تلتقط الطباعة في الاختبار. أو تنسى [[newline=""]] فالصفوف اللي فيها أسطر تتكسر. أو تمسك [[OSError]] قبل [[FileNotFoundError]] فتخسر الرسالة المخصصة. أو ترمي على أول صف غلط بدل ما تعدّه.`
          },
          teach: R`## التقسيم

~~~text
core.py   المنطق     بياخد قايمة، بيرجّع dict، **مفيش print ولا open**
cli.py    الواجهة    بيقرا، وبيطبع، وبيتعامل مع الأخطاء
~~~

والفايدة في الاختبار:

~~~python اختبار من غير أي ملف
from tally.core import summarize

ROWS = [{"city": "القاهرة", "amount": "100"},
        {"city": "القاهرة", "amount": "200"},
        {"city": "الجيزة",  "amount": "غلط"}]

summarize(ROWS, group="city")["counts"]   # {"القاهرة": 2, "الجيزة": 1}
~~~

مفيش ملفات مؤقتة، ولا تنضيف، ولا التقاط للطباعة.

---

## ١. القراية: مصدر واحد لمصدرين

~~~python cli.py
def read_rows(path: Path | None, encoding: str) -> list[Row]:
    if path is None:
        return list(csv.DictReader(sys.stdin))
    with path.open(newline="", encoding=encoding) as f:
        return list(csv.DictReader(f))
~~~

[[csv.DictReader]] بتاخد **أي** iterable بيرجّع سطور. فالملف و [[sys.stdin]] الاتنين بيشتغلوا.

~~~text اتشغّلوا فعلًا
$ tally sales.csv -q
6
$ cat sales.csv | tally -q
6
~~~

> **[[newline=""]] مش اختيارية مع [[csv]].** الوحدة بتتعامل مع نهايات السطور بنفسها، لأن القيمة الواحدة ممكن تكون فيها سطر جديد (نص بين علامات تنصيص). ومن غيرها الصفوف دي بتتكسر.

---

## ٢. الصف الغلط بيتعدّ، ميوقّفش

~~~python core.py
try:
    nums.append(float(r.get(value, "")))
except (TypeError, ValueError):
    bad += 1
~~~

~~~text اتشغّل فعلًا — والملف فيه صف amount فاضي
إحصاءات amount:
  أرقام: 5   اتخطّى: 1
  المجموع    36750.0
  المتوسط    7350.0
  الوسيط     4200.0
  الأصغر     250.0
  الأكبر     16500.0
~~~

**[[اتخطّى: 1]]** بتقول للمستخدم إن فيه بيانات مش نضيفة — من غير ما الأداة تقع.

> وبنمسك النوعين: [[ValueError]] للنص المش رقم، و [[TypeError]] لو القيمة [[None]] (صف ناقص أعمدة).

---

## ٣. والوسيط مش زي المتوسط

| | بيتأثر بالقيم الشاذة |
|---|---|
| [[mean]] | **أيوه** |
| [[median]] | شوية |

في البيانات دي: المتوسط [[7350]] والوسيط [[4200]]. والفرق ده بسبب الـ [[16500]] و [[15000]]. ولو عايز تعرف «الصفقة العادية»، الوسيط بيقول أكتر.

---

## ٤. الأخطاء: الترتيب مهم

~~~python cli.py
try:
    rows = read_rows(args.file, args.encoding)
except FileNotFoundError:
    print(f"خطأ: الملف مش موجود: {args.file}", file=sys.stderr)
    return 2
except UnicodeDecodeError as e:
    print(f"خطأ: الترميز غلط ({e.encoding}). جرّب --encoding cp1256", file=sys.stderr)
    return 2
except OSError as e:
    print(f"خطأ: {e}", file=sys.stderr)
    return 2
~~~

~~~text اتشغّلوا فعلًا
$ tally nope.csv
خطأ: الملف مش موجود: nope.csv
كود: 2

$ tally cp1256.csv
خطأ: الترميز غلط (utf-8). جرّب --encoding cp1256
كود: 2

$ tally cp1256.csv --encoding cp1256 -q
1
~~~

**لاحظ إن الرسالة بتقول الحل**، مش بس المشكلة.

> و [[FileNotFoundError]] نوع فرعي من [[OSError]]. فلو كتبت [[except OSError]] **الأول**، الرسالة المخصصة مش هتشتغل أبدًا. **الأخص قبل الأعم.**

---

## ٥. و [[>&2]] بتاعة Python

~~~python
print("...", file=sys.stderr)
~~~

الأخطاء على [[stderr]] عشان [[tally x.csv > out.txt]] يحط الناتج في الملف والخطأ على الشاشة.

---

## الخلاصة

- [[core]] بياخد ويرجّع، و [[cli]] بيقرا ويطبع.
- [[csv.DictReader]] بتقرا من ملف أو من stdin بنفس الكود.
- [[newline=""]] مش اختيارية.
- الصف الغلط يتعدّ ويتقال، ميوقّفش.
- الأخص قبل الأعم في [[except]].
- الرسالة تقول الحل.`,
          sol: R`الإحصاءات بالناتج الحقيقي، والأخطاء التلاتة برسايلهم.`,
          solCode: R`tally sales.csv -g city -v amount
# الصفوف: 6
#
# توزيع city:
#   القاهرة      3
#   الإسكندرية   2
#   الجيزة       1
#
# إحصاءات amount:
#   أرقام: 5   اتخطّى: 1
#   المجموع    36750.0
#   المتوسط    7350.0
#   الوسيط     4200.0

tally nope.csv
# خطأ: الملف مش موجود: nope.csv      (كود 2)

tally cp1256.csv
# خطأ: الترميز غلط (utf-8). جرّب --encoding cp1256      (كود 2)

tally cp1256.csv --encoding cp1256 -q
# 1

# (اتشغّلوا فعلًا على Python 3.14.3)`
        },

        {
          cmd: "مشروع — اختبارات وتغليف",
          title: "unittest المدمج، وإيه اللي بيدخل الحزمة",
          learn: R`تكتب اختبارات بالمدمج، وتبني wheel وتشوف جواها إيه.`,
          out: R`٥ اختبارات بتعدّي، وحزمة فيها اللي بيشتغل بس.`,
          use: {
            prog: R`[[unittest]] في المكتبة القياسية. فتقدر تكتب اختبارات في أي مشروع من غير أي تسطيب.`,
            work: R`الحزمة اللي فيها ملفات مش المفروض تتوزّع بتكبر، وأحيانًا بتسرّب. وفحصها بياخد ثانية.`,
            cs: R`الاختبار بيوصّف السلوك المتوقَّع بشكل تنفيذي. وهو التوثيق الوحيد اللي بيفشل لما يبقى كداب.`,
          },
          desc: R`فاضل حاجتين.

**الاختبارات.** [[unittest]] في المكتبة القياسية — مفيش تسطيب. بتكتب كلاس بيورث [[unittest.TestCase]]، وكل ميثود اسمها بيبدأ بـ [[test_]] بتبقى اختبار.

و [[python -m unittest discover -s tests -v]] بتلاقيهم وتشغّلهم.

ولأن [[core]] منفصل (درس ٣)، الاختبارات بتتكتب بقايمة في الذاكرة — من غير ملفات ولا تنضيف.

ومهم تختبر **الحالات الحدّية**: قايمة فاضية، وعمود مش موجود، وقيمة مش رقم. دي اللي بتكسر في الواقع.

**والتغليف.** [[pip wheel .]] بتبني الحزمة، و [[wheel]] ده ملف ZIP. فتقدر تفتحه وتشوف جواه إيه:

~~~text
tally/__init__.py
tally/cli.py
tally/core.py
tally-1.0.0.dist-info/METADATA
tally-1.0.0.dist-info/entry_points.txt
~~~

وجوه [[entry_points.txt]] هتلاقي السطر اللي بيحوّلها لأمر:

~~~text
[console_scripts]
tally = tally.cli:main
~~~

**ولاحظ إن [[sales.csv]] و [[tests/]] مدخلوش.** والسبب إن الـ **src layout** بيحدد مكان الحزمة: [[where = ["src"]]]. فأي حاجة بره [[src/]] مش بتتحط. وده الفرق العملي بين الـ layout ده والـ flat layout.`,
          example: R`# tests/test_core.py
import unittest
from tally.core import summarize

ROWS = [
    {"city": "القاهرة", "amount": "100"},
    {"city": "القاهرة", "amount": "200"},
    {"city": "الجيزة",  "amount": "غلط"},
]


class TestSummarize(unittest.TestCase):
    def test_counts_rows(self):
        self.assertEqual(summarize(ROWS)["rows"], 3)

    def test_groups(self):
        out = summarize(ROWS, group="city")
        self.assertEqual(out["counts"], {"القاهرة": 2, "الجيزة": 1})

    def test_skips_non_numeric(self):
        out = summarize(ROWS, value="amount")
        self.assertEqual(out["numeric"], 2)
        self.assertEqual(out["skipped"], 1)

    def test_empty(self):
        out = summarize([], group="city", value="amount")
        self.assertEqual(out["rows"], 0)
        self.assertNotIn("sum", out)

    def test_missing_column(self):
        out = summarize(ROWS, value="nope")
        self.assertEqual(out["skipped"], 3)`,
          lines: [
            R`من المكتبة القياسية.`,
            R`بنستورد من الحزمة المتسطّبة، مش بمسار نسبي.`,
            R`بيانات الاختبار، مكتوبة بإيدنا.`,
            R`صف سليم.`,
            R`صف تاني في نفس المدينة.`,
            R`وصف فيه قيمة مش رقم.`,
            R`قفلة.`,
            R`الكلاس لازم يورث [[TestCase]].`,
            R`أي ميثود اسمها بيبدأ بـ [[test_]] بتبقى اختبار.`,
            R`أبسط حاجة: العدد.`,
            R`اختبار التوزيع.`,
            R`بنحسب.`,
            R`وبنقارن بالقاموس كله مرة واحدة.`,
            R`**الحالة المهمة**: القيمة المش رقم.`,
            R`بنحسب.`,
            R`اتنين عدّوا.`,
            R`وواحد اتخطّى. **ودي اللي بتثبت إن الأداة مبتقعش.**`,
            R`الحالة الحدّية: قايمة فاضية.`,
            R`بنحسب.`,
            R`العدد صفر.`,
            R`**و [[sum]] مش موجودة أصلًا** — مش صفر. والفرق مهم.`,
            R`عمود مش موجود خالص.`,
            R`بنحسب.`,
            R`كل الصفوف اتخطّت.`,
          ],
          try: R`شغّل [[python -m unittest discover -s tests -v]]. وبعدين غيّر رقم في اختبار وشوف الفشل شكله إيه. وبعدين ابني wheel وافتحها وشوف جواها إيه.`,
          flag: "script",
          mac: ["both", R`[[unittest]] من المكتبة القياسية، نفس السلوك. والـ wheel ملف ZIP على كل الأنظمة.`],
          deep: {
            why: R`الاختبار بيخليك تعدّل من غير خوف. ومن غيره كل تعديل مقامرة. والحزمة اللي فيها ملفات زيادة بتكبر وأحيانًا بتسرّب.`,
            how: R`**[[unittest]] مقابل [[pytest]]**: [[unittest]] في المكتبة القياسية و [[pytest]] محتاج تسطيب. و [[pytest]] أقصر في الكتابة ([[assert x == y]] بدل [[self.assertEqual]])، وفيه fixtures و parametrize. و[[pytest]] بيشغّل اختبارات [[unittest]] كمان — فتقدر تبدأ بالمدمج وتنقل بعدين.

**الـ assertions المفيدة**: [[assertEqual]] و [[assertIn]] / [[assertNotIn]] و [[assertRaises]] و [[assertAlmostEqual]] (للأرقام العشرية) و [[assertCountEqual]] (نفس العناصر بأي ترتيب).

**[[discover]]** بتدوّر على ملفات [[test*.py]]. و [[-s]] بتحدد المجلد، و [[-v]] بتعرض اسم كل اختبار.

**ولاحظ إن الاختبار بيستورد [[from tally.core import summarize]]** — من الحزمة المتسطّبة، مش بمسار نسبي. ودي بتشتغل لأن [[pip install -e .]] اتعملت. وده بالظبط اللي الـ src layout بيضمنه: اللي بتختبره هو المتسطّب.

**والـ wheel**: ملف ZIP فيه الكود و [[dist-info/]]. وتقدر تفتحه:

~~~text
python -c "import zipfile,glob; print(zipfile.ZipFile(glob.glob('dist/*.whl')[0]).namelist())"
~~~

و [[METADATA]] فيه الاسم والنسخة والوصف. و [[entry_points.txt]] فيه الأوامر.

**وحجم الحزمة**: طلعت **3679 بايت**. والصغر ده مش صدفة — ده لأن [[where = ["src"]]] بيحدد إيه اللي يدخل.

**وللنشر**: [[python -m build]] (محتاج [[pip install build]]) بتبني sdist و wheel سوا. و [[twine upload dist/*]] بتنشر على PyPI. والمعاينة: [[twine check dist/*]].`,
            when: R`الاختبارات من أول دالة. وفحص الحزمة قبل أي توزيع.`,
            mistakes: R`تختبر الحالة السعيدة بس. أو تنسى الحالة الفاضية. أو تستورد بمسار نسبي بدل الحزمة المتسطّبة. أو توزّع حزمة من غير ما تبص جواها.`
          },
          teach: R`## ١. [[unittest]]: مفيش تسطيب

~~~python tests/test_core.py
import unittest
from tally.core import summarize

class TestSummarize(unittest.TestCase):
    def test_counts_rows(self):
        self.assertEqual(summarize(ROWS)["rows"], 3)
~~~

~~~bash
python -m unittest discover -s tests -v
~~~

~~~text الناتج (اتشغّل فعلًا · Python 3.14)
test_counts_rows (test_core.TestSummarize.test_counts_rows) ... ok
test_empty (test_core.TestSummarize.test_empty) ... ok
test_groups (test_core.TestSummarize.test_groups) ... ok
test_missing_column (test_core.TestSummarize.test_missing_column) ... ok
test_skips_non_numeric (test_core.TestSummarize.test_skips_non_numeric) ... ok

----------------------------------------------------------------------
Ran 5 tests in 0.000s

OK
~~~

**صفر ثانية** — لأن [[core]] مفيهوش ملفات (درس ٣).

---

## ٢. اختبر الحالات الحدّية، مش السعيدة بس

| الاختبار | بيثبت إيه |
|---|---|
| [[test_counts_rows]] | الأساسي |
| [[test_groups]] | التوزيع |
| [[test_skips_non_numeric]] | **القيمة الغلط بتتعدّ مش بتوقّع** |
| [[test_empty]] | قايمة فاضية متكسرش |
| [[test_missing_column]] | عمود مش موجود |

~~~python والتفصيلة دي مهمة
def test_empty(self):
    out = summarize([], group="city", value="amount")
    self.assertEqual(out["rows"], 0)
    self.assertNotIn("sum", out)      # مش موجودة أصلًا، مش صفر
~~~

الفرق بين «المجموع صفر» و«مفيش مجموع» حقيقي: الأولى بتقول إن فيه بيانات مجموعها صفر.

---

## ٣. الاستيراد من المتسطّب

~~~python
from tally.core import summarize
~~~

**مش** [[from ../src/tally/core import ...]]. ودي بتشتغل لأن [[pip install -e .]] اتعملت.

وده بالظبط اللي الـ src layout بيضمنه (درس ١): **اللي بتختبره هو اللي هيتوزّع**.

---

## ٤. [[unittest]] ولا [[pytest]]؟

| | [[unittest]] | [[pytest]] |
|---|---|---|
| تسطيب | **مفيش** | لازم |
| الكتابة | [[self.assertEqual(a, b)]] | [[assert a == b]] |
| fixtures و parametrize | محدود | **قوي** |

و [[pytest]] بيشغّل اختبارات [[unittest]] كمان. فابدأ بالمدمج، وانقل لما تحتاج.

---

## ٥. الحزمة: افتحها وشوف

~~~bash
python -m pip wheel . -w dist --no-deps
~~~

~~~text اللي جواها (اتشغّل فعلًا)
tally/__init__.py
tally/cli.py
tally/core.py
tally-1.0.0.dist-info/METADATA
tally-1.0.0.dist-info/RECORD
tally-1.0.0.dist-info/WHEEL
tally-1.0.0.dist-info/entry_points.txt
tally-1.0.0.dist-info/top_level.txt
~~~

**[[sales.csv]] و [[tests/]] مدخلوش.** والسبب:

~~~toml
[tool.setuptools.packages.find]
where = ["src"]
~~~

أي حاجة بره [[src/]] مش بتتحط. ودي فايدة عملية للـ src layout، غير اللي اتقال في درس ١.

وحجم الحزمة كلها: **3679 بايت**.

---

## ٦. والسطر اللي بيحوّلها لأمر

~~~text entry_points.txt (اتشغّل فعلًا)
[console_scripts]
tally = tally.cli:main
~~~

~~~text ومن METADATA
Metadata-Version: 2.4
Name: tally
Version: 1.0.0
Summary: أداة سطر أوامر بتلخّص ملفات CSV
License-Expression: MIT
Requires-Python: >=3.11
~~~

كل ده اتولّد من [[pyproject.toml]].

---

## ٧. وللنشر

~~~bash
pip install build twine
python -m build          # بتبني sdist و wheel
twine check dist/*       # معاينة
twine upload dist/*      # نشر على PyPI
~~~

---

## الخلاصة

- [[unittest]] مدمج — ابدأ بيه.
- اختبر الفاضي والناقص والغلط، مش السعيد بس.
- استورد من المتسطّب، مش بمسار نسبي.
- الـ wheel ملف ZIP — افتحه قبل ما توزّع.
- [[where = ["src"]]] بيحدد إيه اللي يدخل.`,
          sol: R`الاختبارات الخمسة بناتجها، ومحتوى الحزمة — ولاحظ إن [[sales.csv]] و [[tests/]] مش فيها.`,
          solCode: R`python -m unittest discover -s tests -v
# test_counts_rows ... ok
# test_empty ... ok
# test_groups ... ok
# test_missing_column ... ok
# test_skips_non_numeric ... ok
# ----------------------------------------------------------------------
# Ran 5 tests in 0.000s
# OK

python -m pip wheel . -w dist --no-deps
# واللي جوه الـ wheel:
#   tally/__init__.py
#   tally/cli.py
#   tally/core.py
#   tally-1.0.0.dist-info/METADATA
#   tally-1.0.0.dist-info/entry_points.txt
#   ...
# (sales.csv و tests/ مدخلوش — بسبب where = ["src"])
#
# entry_points.txt:
#   [console_scripts]
#   tally = tally.cli:main
#
# وحجم الـ wheel: 3679 بايت

# (اتشغّلوا فعلًا على Python 3.14.3)`
        }
      ]
    }
]);
