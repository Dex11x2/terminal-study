// تكملة تاب python: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/python/01.js (شرح حقول الدرس في أوله)
MORE("python", [
    {
      t: "أدوات السكربتات",
      l: 2,
      n: "argparse آمن افتراضيًا، و JSON و CSV و YAML و XML، والتواريخ في أسماء الملفات، و logging، و subprocess، و .env، و HTTP، و re",
      items: [
        {
          cmd: "argparse --dry-run",
          title: "options و --help، والسكربت آمن افتراضيًا",
          desc: R`أول ما السكربت ياخد أكتر من argument أو فيه options، [[sys.argv]] بإيدك بيبقى لخبطة. [[argparse]] في المكتبة الأساسية: بتعرّف الـ arguments، وهو يعمل التحويل للأنواع ورسايل الخطأ و [[--help]].

والقاعدة في أي سكربت بيمسح أو ينقل أو يعدّل: الافتراضي إنه يطبع هيعمل إيه بس (dry run)، والتنفيذ الحقيقي محتاج flag صريح زي [[--apply]]. غلطة في الأمر تبقى سطور على الشاشة مش ملفات ضاعت.

كل خيارات argparse ومعاها typer في درس «argparse و typer» في تاب «Python و FastAPI».`,
          example: R`import argparse
from pathlib import Path
def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    p = argparse.ArgumentParser(
        description="Delete temp files in a folder.",
        epilog="example: %(prog)s ~/Downloads --days 30 --apply",
        allow_abbrev=False,
    )
    p.add_argument("folder", type=Path, help="the folder to clean")
    p.add_argument("--days", type=int, default=30, help="older than N days (default: %(default)s)")
    p.add_argument("--ext", nargs="+", default=[".tmp"], help="extensions to match")
    mode = p.add_mutually_exclusive_group()
    mode.add_argument("--dry-run", action="store_true", help="only print what would happen (default)")
    mode.add_argument("--apply", action="store_true", help="really delete")
    p.add_argument("-v", "--verbose", action="count", default=0)
    return p.parse_args(argv)
args = parse_args()
print(args)
print("APPLY" if args.apply else "DRY RUN", args.folder.expanduser(), args.days, args.ext, args.verbose)`,
          try: R`سمّيه [[cli.py]] وجرّب: [[-h]]، و [[~/Downloads]] لوحده، و [[lab --ext .log .tmp -vv --apply]]، و [[lab --dry-run --apply]]، ومن غير فولدر، و [[lab --app]]. وبعد كل واحدة [[echo $?]] (في PowerShell [[$LASTEXITCODE]]). وبعدين شيل سطر [[allow_abbrev=False]] وجرّب [[lab --app]] تاني.`,
          flag: "script",
          deep: {
            why: R`سكربت بيمسح ومفيش فيه dry run: أول تجربة على فولدر غلط هي آخر تجربة. ومن غير [[--help]] محدش (ولا انت بعد شهر) فاكر السكربت بياخد إيه.`,
            how: R`[[add_argument("folder")]] من غير شرط = positional وإجباري. و [[type=Path]] و [[type=int]] بيحوّلوا، ولو التحويل فشل بيطبع رسالة ويخرج بـ 2.

[[nargs="+"]] واحد أو أكتر في list. و [[action="count"]] بيعد: [[-vv]] بـ 2. و [[%(default)s]] في الـ help بيتبدل بالقيمة الافتراضية، و [[%(prog)s]] باسم السكربت، و [[epilog]] بيظهر في آخر الـ help (حط فيه مثال).

[[add_mutually_exclusive_group()]]: [[--dry-run]] و [[--apply]] مع بعض error. والـ dry run هو الافتراضي لأن الكود بيسأل [[args.apply]] بس، و [[--dry-run]] موجود عشان اللي متعود يكتبه.

[[allow_abbrev=False]]: argparse افتراضيًا بيقبل أي اختصار مش ملخبط، فـ [[--app]] بتتفهم [[--apply]]. في سكربت بيمسح ده مش عايزه.

الشرطة في الاسم بتبقى underscore: [[--dry-run]] تبقى [[args.dry_run]]. و [[parse_args(argv)]] مع [[argv=None]] بيقرا [[sys.argv]]، وفي الاختبار تبعت list.`,
            when: "أي سكربت فيه أكتر من argument، أو بيعمل حاجة مش بترجع.",
            mistakes: R`الافتراضي تنفيذ وفيه [[--dry-run]] اختياري: هتنسى تكتبه مرة. و [[type=bool]] ([[bool("False")]] بـ True، استخدم [[store_true]]). و [[type=Path]] مش بيفك [[~]] لو المستخدم كتبها بين quotes ([["~/Downloads"]] بتوصل زي ما هي)، فاعمل [[expanduser()]] زي آخر سطر.`
          },
          teach: R`## السكربت ده بيعمل إيه؟

السكربت لسه مش بيمسح حاجة. هو بيعرّف **إيه اللي يتكتب بعد اسمه في الترمنال** (الـ arguments)، ويقراه، ويطبعه. ده الجزء اللي كل سكربت أتمتة بيبدأ بيه، والمسح الحقيقي بييجي بعدين في دروس «سكربتات أتمتة كاملة».

اتشغّل على ويندوز (Python 3.14 في venv) وعلى لينكس ([[docker run --rm python:3.13-slim]]) وطلع نفس الكلام، إلا مسار الـ home.

---

## ١. الاستيراد والدالة

~~~python cli.py
import argparse
from pathlib import Path
def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
~~~

- [[argparse]] موديول في المكتبة الأساسية (مش محتاج pip). اسمه من **argument parser**: حاجة بتفك الكلام اللي بعد اسم السكربت.
- [[Path]] من [[pathlib]]: نوع بيمثّل مسار ملف أو فولدر.
- [[def parse_args(argv: ...)]] دالة. الكلام بعد [[:]] و [[->]] اسمه **type hints**: مجرد توضيح للي بيقرا. [[list[str] | None]] يعني «يا list نصوص يا None»، و [[= None]] القيمة الافتراضية. والدالة بترجّع [[argparse.Namespace]].

ليه دالة ومش كود على طول؟ عشان في الاختبار تبعتلها list بنفسك ([[parse_args(["lab", "--apply"])]]) من غير ما تشغّل السكربت من الترمنال.

---

## ٢. الـ parser نفسه

~~~python cli.py
    p = argparse.ArgumentParser(
        description="Delete temp files in a folder.",
        epilog="example: %(prog)s ~/Downloads --days 30 --apply",
        allow_abbrev=False,
    )
~~~

[[ArgumentParser]] بيعمل object فاضي هنضيف عليه الـ arguments واحد واحد، وسمّيناه [[p]].

| الخيار | معناه |
|---|---|
| [[description]] | سطر بيظهر فوق في [[--help]] |
| [[epilog]] | كلام بيظهر في **آخر** الـ help. حط فيه مثال جاهز |
| [[%(prog)s]] | argparse بيبدّله باسم السكربت ([[cli.py]]). [[%(...)s]] شكل التنسيق القديم في Python |
| [[allow_abbrev=False]] | امنع الاختصارات (هنشوف ليه في الآخر) |

---

## ٣. الـ arguments واحد واحد

### الفولدر: positional

~~~python cli.py
    p.add_argument("folder", type=Path, help="the folder to clean")
~~~

اسم من غير [[--]] قدامه يعني **positional**: بيتاخد من مكانه، وإجباري. و [[type=Path]] معناه «حوّل النص اللي اتكتب لـ Path». و [[help]] الشرح اللي بيظهر في [[-h]].

### الأيام: option برقم

~~~python cli.py
    p.add_argument("--days", type=int, default=30, help="older than N days (default: %(default)s)")
~~~

[[--days]] بشرطتين يعني **option**: اختياري، وتكتبه بالاسم. [[type=int]] يحوّل [["30"]] لرقم [[30]]. و [[%(default)s]] بيتبدّل في الـ help بالقيمة الافتراضية. ولو اتكتب حاجة مش رقم:

~~~text الناتج: python cli.py lab --days abc
cli.py: error: argument --days: invalid int value: 'abc'
~~~

### الامتدادات: أكتر من قيمة

~~~python cli.py
    p.add_argument("--ext", nargs="+", default=[".tmp"], help="extensions to match")
~~~

[[nargs]] يعني **number of args**. و [[+]] يعني «واحد أو أكتر»، فـ [[--ext .log .tmp]] بيطلع [['.log', '.tmp'] ]] في list.

### dry run أو apply: واحد بس

~~~python cli.py
    mode = p.add_mutually_exclusive_group()
    mode.add_argument("--dry-run", action="store_true", help="only print what would happen (default)")
    mode.add_argument("--apply", action="store_true", help="really delete")
~~~

- **mutually exclusive** يعني «مينفعش الاتنين مع بعض». أي argument بيتضاف على [[mode]] بدل [[p]] بيدخل المجموعة دي.
- [[action="store_true"]] يعني flag من غير قيمة: لو اتكتب بيبقى [[True]]، لو لأ [[False]].

الأمان هنا: الكود تحت بيسأل عن [[args.apply]] **بس**. فلو نسيت تكتب أي حاجة، السكربت بيعرض بس. والتنفيذ محتاج إنك تكتب [[--apply]] بإيدك.

### verbose: عدّاد

~~~python cli.py
    p.add_argument("-v", "--verbose", action="count", default=0)
    return p.parse_args(argv)
~~~

[[-v]] اسم قصير و [[--verbose]] اسم طويل لنفس الحاجة. [[action="count"]] بيعدّ: [[-v]] بـ 1 و [[-vv]] بـ 2.

[[p.parse_args(argv)]] هو اللي بيقرا فعلًا. ولما [[argv]] يبقى [[None]]، بيقرا [[sys.argv]] (اللي اتكتب في الترمنال). والنتيجة [[Namespace]]: object كل argument فيه خانة بنفس الاسم، والشرطة بتبقى underscore ([[--dry-run]] تبقى [[args.dry_run]]).

---

## ٤. آخر ٣ سطور

~~~python cli.py
args = parse_args()
print(args)
print("APPLY" if args.apply else "DRY RUN", args.folder.expanduser(), args.days, args.ext, args.verbose)
~~~

- [[print(args)]] بيوريك الـ Namespace كله، مفيد وانت بتجرّب.
- [[X if condition else Y]] اسمها **conditional expression**: لو [[args.apply]] صح اطبع [["APPLY"]]، وإلا [["DRY RUN"]].
- [[expanduser()]] بيحوّل [[~]] في أول المسار لفولدر اليوزر.

---

## ٥. التشغيل

### [[-h]]

~~~text الناتج: python cli.py -h
usage: cli.py [-h] [--days DAYS] [--ext EXT [EXT ...]] [--dry-run | --apply]
              [-v]
              folder

Delete temp files in a folder.

positional arguments:
  folder               the folder to clean

options:
  -h, --help           show this help message and exit
  --days DAYS          older than N days (default: 30)
  --ext EXT [EXT ...]  extensions to match
  --dry-run            only print what would happen (default)
  --apply              really delete
  -v, --verbose

example: cli.py ~/Downloads --days 30 --apply
~~~

ده كله argparse عمله لوحده: [[[--dry-run | --apply] ]] الخط العمودي معناه «واحد من الاتنين». واللي بين أقواس مربعة اختياري، و [[folder]] من غير أقواس إجباري. و [[-h]] اتضاف من غير ما نكتبه.

### تشغيل عادي

~~~text الناتج على لينكس: python cli.py ~/Downloads
Namespace(folder=PosixPath('/root/Downloads'), days=30, ext=['.tmp'], dry_run=False, apply=False, verbose=0)
DRY RUN /root/Downloads 30 ['.tmp'] 0
~~~

على لينكس الـ shell نفسه فك [[~]] قبل ما Python يشوفها (والـ home في الكونتينر [[/root]]). وعلى ويندوز الموضوع بيفرق حسب الترمنال: PowerShell 7 فكّها برضه، لكن Windows PowerShell 5.1 و CMD بعتوها زي ما هي، وكمان PowerShell 7 لو كتبتها بين علامات تنصيص [["~/Downloads"]]:

~~~text الناتج على ويندوز (powershell 5.1 أو cmd)
Namespace(folder=WindowsPath('~/Downloads'), days=30, ext=['.tmp'], dry_run=False, apply=False, verbose=0)
DRY RUN C:\Users\ali\Downloads 30 ['.tmp'] 0
~~~

الـ Namespace فيه [[~]] حرفيًا، و [[expanduser()]] في السطر الأخير هو اللي حوّلها. من غيره السكربت هيدوّر على فولدر اسمه [[~]].

### كل الحالات

| الأمر | الناتج | exit code |
|---|---|---|
| [[lab --ext .log .tmp -vv --apply]] | [[APPLY lab 30 ['.log', '.tmp'] 2]] | 0 |
| [[lab --dry-run --apply]] | [[error: argument --apply: not allowed with argument --dry-run]] | 2 |
| من غير فولدر | [[error: the following arguments are required: folder]] | 2 |
| [[lab --app]] | [[error: unrecognized arguments: --app]] | 2 |

الـ exit code [[2]] هو اللي argparse بيخرج بيه في أي غلطة في الاستخدام، وقبلها بيطبع سطر الـ usage. تشوفه بـ [[echo $?]] في bash أو [[$LASTEXITCODE]] في PowerShell.

### ليه [[allow_abbrev=False]]؟

لما شلنا السطر ده وجرّبنا [[lab --app]]:

~~~text الناتج
Namespace(folder=PosixPath('lab'), days=30, ext=['.tmp'], dry_run=False, apply=True, verbose=0)
APPLY lab 30 ['.tmp'] 0
~~~

argparse افتراضيًا بيقبل أي بداية لاسم option طالما مش ملخبطة مع غيره، فـ [[--app]] بقت [[--apply]]. في سكربت بيمسح، حرف غلط شغّل المسح.

---

## الخلاصة

- positional من غير [[--]] وإجباري، و option بـ [[--]] واختياري. و [[type=]] بيحوّل، و [[nargs="+"]] لأكتر من قيمة، و [[store_true]] لـ flag، و [[count]] لـ [[-vv]].
- الوضع الآمن هو الافتراضي: الكود بيسأل عن [[--apply]] بس، و [[--dry-run]] و [[--apply]] في mutually exclusive group.
- [[allow_abbrev=False]] في أي سكربت بيعمل حاجة مش بترجع.
- أي غلطة في الاستخدام: رسالة و exit 2، من غير ما تكتب سطر.
- [[expanduser()]] على أي مسار جاي من اليوزر، لأن CMD و PowerShell 5.1 (وأي مسار بين علامات تنصيص) مش بيفكّوا [[~]].`,
          lines: [
            "argparse.",
            "Path.",
            "دالة بترجّع الـ arguments بعد ما تتفحص.",
            "الـ parser:",
            "الوصف بيظهر فوق في --help.",
            "مثال بيظهر تحت في --help.",
            "ممنوع الاختصارات (--app مش هتبقى --apply).",
            "قفلة الـ parser.",
            "positional إجباري، بيتحوّل Path.",
            "رقم بقيمة افتراضية بتظهر في الـ help.",
            "واحد أو أكتر في list.",
            "مجموعة: واحد بس من اللي جواها.",
            "عرض بس (وده الافتراضي أصلًا).",
            "تنفيذ حقيقي.",
            "-v و -vv و -vvv بتتعد.",
            "اقرا sys.argv أو الـ list اللي اتبعتت.",
            "نادي.",
            "اطبع كل حاجة اتقرت.",
            "الوضع والقيم."
          ],
          sol: R`[[-h]] طبع الـ usage، وفيه [[[--dry-run | --apply] ]] بالشكل ده عشان الاتنين في group واحد، وتحته الوصف والـ options و [[--days DAYS  older than N days (default: 30)]] وفي الآخر [[example: cli.py ~/Downloads --days 30 --apply]]، و exit 0.

[[~/Downloads]] لوحده: [[DRY RUN /home/sara/Downloads 30 ['.tmp'] 0]] (الـ home بتاعك).
[[lab --ext .log .tmp -vv --apply]]: [[APPLY lab 30 ['.log', '.tmp'] 2]].
[[--dry-run --apply]]: [[error: argument --apply: not allowed with argument --dry-run]] و exit 2.
من غير فولدر: [[error: the following arguments are required: folder]] و 2.
[[--app]]: [[error: unrecognized arguments: --app]] و 2.

ومن غير [[allow_abbrev=False]]، [[lab --app]] طلع [[APPLY lab 30 ['.tmp'] 0]]: اختصار نص كلمة شغّل وضع المسح.`
        },
        {
          cmd: "json.load و json.dump",
          title: "ملف إعدادات وملف حالة بـ JSON",
          desc: R`سكربتات كتير محتاجة حاجتين: ملف إعدادات بيقراه (الفولدرات، عدد الأيام)، وملف حالة بيفتكر فيه حاجة من المرة اللي فاتت (آخر ID اتعالج، عدد مرات التشغيل، آخر backup).

[[json.loads(text)]] من نص لـ dict و list، و [[json.dumps(obj)]] بالعكس. و [[ensure_ascii=False]] عشان العربي يتكتب عربي، و [[indent=2]] عشان الملف يتقري.

وملف الحالة بيتكتب في ملف مؤقت وبعدين [[os.replace]]، عشان لو السكربت اتقفل في نص الكتابة، الملف القديم يفضل سليم.`,
          example: R`import json
import os
import sys
from pathlib import Path
CONFIG = Path("config.json")
STATE = Path("state.json")
try:
    config = json.loads(CONFIG.read_text(encoding="utf-8"))
except json.JSONDecodeError as e:
    sys.exit(f"error: {CONFIG}: {e.msg} (line {e.lineno}, column {e.colno})")
print(config["folders"], config.get("keep_days", 7), config["owner"])
state = json.loads(STATE.read_text(encoding="utf-8")) if STATE.exists() else {"runs": 0}
state["runs"] += 1
state["last_owner"] = config["owner"]
tmp = STATE.with_suffix(".tmp")
tmp.write_text(json.dumps(state, ensure_ascii=False, indent=2), encoding="utf-8")
os.replace(tmp, STATE)
print(STATE.read_text(encoding="utf-8"))`,
          try: R`اعمل [[config.json]] فيه [[{"folders": ["~/Downloads", "~/Desktop"], "keep_days": 30, "owner": "سارة"}]]. شغّل السكربت مرتين وبص على [[state.json]]. وبعدين حط فاصلة زيادة بعد [[30]] وشغّله. وفي الآخر جرّب في Python [[json.dumps({"o": "سارة"})]] من غير [[ensure_ascii=False]]، و [[json.loads(json.dumps({1: "a"}))]].`,
          flag: "script",
          deep: {
            why: R`سكربت بيعالج طلبات جديدة كل ساعة لازم يعرف وقف فين المرة اللي فاتت، وإلا هيعالج نفس الحاجات تاني. ولو ملف الحالة اتكتب نصه وبعدين الكهربا قطعت أو حد عمل Ctrl+C، التشغيل الجاي هيقع بـ [[JSONDecodeError]] ومحدش فاكر كان واقف فين.`,
            how: R`[[read_text]] ثم [[json.loads]] هي نفسها [[json.load(f)]] على ملف مفتوح، اختار اللي يريحك.

[[e.msg]] و [[e.lineno]] و [[e.colno]] في [[JSONDecodeError]] بيقولوا الغلط فين بالظبط، فالرسالة تبقى مفيدة بدل traceback.

[[config.get("keep_days", 7)]] قيمة افتراضية لو المفتاح مش موجود، و [[config["owner"] ]] لو لازم يبقى موجود (يقع بـ KeyError لو ناقص، وده مقصود).

الكتابة الآمنة: [[os.replace(tmp, STATE)]] بيستبدل الملف في خطوة واحدة (atomic) طالما الاتنين على نفس الـ disk، وبيشتغل على ويندوز كمان حتى لو STATE موجود (عكس [[os.rename]] على ويندوز). فأي حد بيقرا الملف بيلاقي يا القديم كامل يا الجديد كامل.

JSON مفيهوش تعليقات ولا فاصلة بعد آخر عنصر، فلو الملف هيعدّله بني آدم، TOML أنسب للإعدادات: [[tomllib.loads()]] في المكتبة الأساسية من Python 3.11 (قراية بس). أو YAML (الدرس الجاي).`,
            when: "إعدادات بسيطة، وحالة السكربت بين مرة والتانية، وأي بيانات رايحة أو جاية من API.",
            mistakes: R`[[STATE.write_text(...)]] على الملف نفسه مباشرة. ومفاتيح أرقام: JSON بيحوّلها نصوص، فـ [[state[1] ]] بقت [[state["1"] ]] بعد أول حفظ. و [[datetime]] في الـ dict: [[TypeError: Object of type datetime is not JSON serializable]]، خزّنه [[isoformat()]]. وسكربتين شغالين في نفس الوقت بيكتبوا نفس ملف الحالة (درس cron فيه [[flock]] للحالة دي).`
          },
          teach: R`## السكربت ده بيعمل إيه؟

بيقرا ملفين: [[config.json]] (إعدادات انت كاتبها بإيدك) و [[state.json]] (حالة السكربت بيكتبها لنفسه). كل تشغيلة بتزوّد عدّاد في ملف الحالة وتحفظه بطريقة آمنة. فيه ٣ أفكار: نقرا JSON ونطلع رسالة واضحة لو بايظ، ونفتكر حاجة بين تشغيلة والتانية، ونكتب الملف من غير ما نبوّظه لو السكربت اتقفل في النص.

اتشغّل على ويندوز (Python 3.14) وعلى لينكس ([[python:3.13-slim]]) وطلع نفس الناتج.

---

## ١. يعني إيه JSON؟

**JSON** (JavaScript Object Notation) شكل نصي للبيانات: [[{ }]] فيها مفاتيح وقيم، والأقواس المربعة list. ملف الإعدادات اللي هنجرّب بيه:

~~~text config.json
{
  "folders": ["~/Downloads", "~/Desktop"],
  "keep_days": 30,
  "owner": "سارة"
}
~~~

ولما Python يقراه بيبقى [[dict]] جواه [[list]] و [[int]] و [[str]].

---

## ٢. الاستيراد والأسماء

~~~python state.py
import json
import os
import sys
from pathlib import Path
CONFIG = Path("config.json")
STATE = Path("state.json")
~~~

- [[json]] بيحوّل من نص لـ dict والعكس. [[os]] عشان [[os.replace]]، و [[sys]] عشان [[sys.exit]].
- [[CONFIG]] و [[STATE]] بحروف كبيرة: عُرف في Python معناه «ثابت، مش هيتغير». ودول مسارات **نسبية**، يعني بتتحسب من الفولدر اللي انت واقف فيه وانت بتشغّل.

---

## ٣. قراية الإعدادات، والغلط بمكانه

~~~python state.py
try:
    config = json.loads(CONFIG.read_text(encoding="utf-8"))
except json.JSONDecodeError as e:
    sys.exit(f"error: {CONFIG}: {e.msg} (line {e.lineno}, column {e.colno})")
~~~

من جوه لبرة:

1. [[CONFIG.read_text(encoding="utf-8")]] اقرا الملف كله كنص. و [[encoding="utf-8"]] لازم عشان العربي (ويندوز من غيرها ممكن يقرا بـ encoding تاني).
2. [[json.loads(...)]] الـ [[s]] في الآخر يعني **string**: من نص لـ dict.
3. [[try / except json.JSONDecodeError as e]] لو النص مش JSON سليم، Python بيرمي الـ exception ده، و [[as e]] بيحطه في متغير.
4. [[e.msg]] و [[e.lineno]] و [[e.colno]] الرسالة ورقم السطر ورقم العمود.
5. [[sys.exit("نص")]] بيطبع النص على stderr ويخرج بـ exit code 1.

جرّبنا نحط فاصلتين بعد [[30]]:

~~~text الناتج
error: config.json: Expecting property name enclosed in double quotes (line 3, column 19)
~~~

سطر واحد بيقولك فين بالظبط، بدل traceback طويل. و exit code بـ 1.

ولو الملف مش موجود أصلًا؟ ده مش [[JSONDecodeError]]، فبيطلع traceback عادي آخره:

~~~text الناتج
FileNotFoundError: [Errno 2] No such file or directory: 'config.json'
~~~

> على ويندوز: لو عملت الملف بـ [[Set-Content -Encoding utf8]] في Windows PowerShell 5.1، الملف بيبدأ بـ BOM (٣ bytes مخفية، درس CSV الجاي بيشرحها)، و [[json.loads]] بيرفضه: [[Unexpected UTF-8 BOM (decode using utf-8-sig)]]. PowerShell 7 مش بيحطها. لو هتقرا ملفات ممكن تيجي بـ BOM، اقرا بـ [[encoding="utf-8-sig"]].

---

## ٤. استخدام القيم

~~~python state.py
print(config["folders"], config.get("keep_days", 7), config["owner"])
~~~

| الطريقة | لو المفتاح مش موجود |
|---|---|
| [[config["owner"] ]] | [[KeyError]] والسكربت يقع. استخدمها للإجباري |
| [[config.get("keep_days", 7)]] | يرجّع [[7]]. استخدمها للاختياري |

~~~text الناتج
['~/Downloads', '~/Desktop'] 30 سارة
~~~

لاحظ إن [[~]] فضلت زي ما هي: JSON مش بيعرف حاجة عن المسارات، فلو هتستخدمها اعمل [[Path(f).expanduser()]].

---

## ٥. الحالة: أول مرة أو مرة جديدة

~~~python state.py
state = json.loads(STATE.read_text(encoding="utf-8")) if STATE.exists() else {"runs": 0}
state["runs"] += 1
state["last_owner"] = config["owner"]
~~~

- [[A if STATE.exists() else B]]: لو الملف موجود اقراه، لو لأ ابدأ بـ dict فيه [[runs]] بصفر.
- [[+= 1]] زوّد واحد. و [[state["last_owner"] = ...]] حط مفتاح جديد (أو غيّر القديم).

---

## ٦. الكتابة الآمنة

~~~python state.py
tmp = STATE.with_suffix(".tmp")
tmp.write_text(json.dumps(state, ensure_ascii=False, indent=2), encoding="utf-8")
os.replace(tmp, STATE)
~~~

### الخطوة ١: [[with_suffix(".tmp")]]

بيغيّر الامتداد: [[state.json]] بقت [[state.tmp]] في نفس الفولدر.

### الخطوة ٢: [[json.dumps(...)]]

العكس: من dict لنص. ومعاه خيارين:

- [[ensure_ascii=False]]: سيب العربي عربي. من غيره:

~~~text الناتج: json.dumps({"o": "سارة"})
{"o": "سارة"}
~~~

ده JSON صح، بس كل حرف عربي اتكتب كوده ([[س]] هو [[س]])، فالملف مش مقروء لبني آدم.

- [[indent=2]]: كل مفتاح في سطر بمسافتين، بدل سطر واحد طويل.

### الخطوة ٣: [[os.replace(tmp, STATE)]]

بيحط الملف المؤقت مكان القديم **في خطوة واحدة** (اسمها atomic). ليه مش نكتب في [[state.json]] على طول؟ لأن لو السكربت اتقفل وهو بيكتب (Ctrl+C، الكهربا)، الملف هيبقى نصه مكتوب، والتشغيلة الجاية تقع بـ [[JSONDecodeError]]. كده يا القديم كامل يا الجديد كامل. و [[os.replace]] بيشتغل على ويندوز حتى لو الملف موجود، عكس [[os.rename]].

---

## ٧. التشغيل مرتين

~~~text الناتج: أول مرة
['~/Downloads', '~/Desktop'] 30 سارة
{
  "runs": 1,
  "last_owner": "سارة"
}
~~~

~~~text الناتج: تاني مرة
['~/Downloads', '~/Desktop'] 30 سارة
{
  "runs": 2,
  "last_owner": "سارة"
}
~~~

السكربت افتكر إنه اشتغل قبل كده. وفي الفولدر بعدها [[config.json]] و [[state.json]] بس، الملف المؤقت مش موجود لأن [[os.replace]] نقله.

---

## ٨. مفاجأتين في JSON

~~~text الناتج: json.loads(json.dumps({1: "a"}))
{'1': 'a'}
~~~

مفاتيح JSON نصوص دايمًا، فالرقم [[1]] رجع [['1']].

~~~text الناتج: datetime جوه json.dumps
TypeError: Object of type datetime is not JSON serializable
~~~

JSON يعرف نصوص وأرقام و true/false و null و list و object بس. خزّن التاريخ نص بـ [[isoformat()]].

---

## الخلاصة

| الدالة | من | لـ |
|---|---|---|
| [[json.loads(text)]] | نص | dict / list |
| [[json.dumps(obj)]] | dict / list | نص |
| [[json.load(f)]] و [[json.dump(obj, f)]] | نفس الكلام على ملف مفتوح | |

- امسك [[JSONDecodeError]] واطبع [[msg]] و [[lineno]] و [[colno]].
- [[.get(key, default)]] للاختياري، و [[["key"] ]] للإجباري.
- [[ensure_ascii=False, indent=2]] لأي ملف هيتقري.
- ملف الحالة: اكتب في ملف مؤقت وبعدين [[os.replace]].`,
          lines: [
            "json.",
            "os.replace.",
            "sys.exit.",
            "Path.",
            "ملف الإعدادات (بيعدّله بني آدم).",
            "ملف الحالة (بيكتبه السكربت).",
            "حاول...",
            "...تقرا الإعدادات.",
            "لو الـ JSON بايظ:",
            "رسالة بمكان الغلط بالظبط.",
            "مفتاح إجباري، ومفتاح بقيمة افتراضية.",
            "الحالة القديمة، أو حالة جديدة أول مرة.",
            "عدّل.",
            "عدّل.",
            "ملف مؤقت جنبه.",
            "اكتب فيه كله.",
            "استبدل القديم بالجديد في خطوة واحدة.",
            "اطبع النتيجة."
          ],
          sol: R`أول مرة: [[['~/Downloads', '~/Desktop'] 30 سارة]] وبعدين state.json فيه [["runs": 1]] و [["last_owner": "سارة"]] بالعربي. تاني مرة [["runs": 2]].

بالفاصلة الزيادة: [[error: config.json: Expecting property name enclosed in double quotes (line 3, column 19)]] و exit 1 (عندي الملف كان متقسم على سطور، فالسطر والعمود بيشاوروا على الفاصلة التانية).

[[json.dumps({"o": "سارة"})]] من غير ensure_ascii طلع [[{"o": "\u0633\u0627\u0631\u0629"}]]: صح و JSON سليم، بس مش مقروء في الملف.

و [[json.loads(json.dumps({1: "a"}))]] رجّع [[{'1': 'a'}]]: المفتاح بقى نص. لاحظ إن [["~/Downloads"]] فضلت زي ما هي، فاعمل [[Path(f).expanduser()]] قبل ما تستخدمها.`
        },
        {
          cmd: "csv و utf-8-sig",
          title: "CSV يتفتح في Excel والعربي سليم",
          desc: R`[[csv.DictWriter]] بيكتب list of dicts كـ CSV، و [[csv.DictReader]] بيقرا كل صف dict بأسماء الأعمدة. وافتح دايمًا بـ [[newline=""]] (الموديول هو اللي بيظبط نهايات السطور).

مشكلة Excel على ويندوز: لو الملف utf-8 عادي، بيعرض العربي حروف غريبة. الحل [[encoding="utf-8-sig"]] وانت بتكتب: بيحط 3 bytes في أول الملف (BOM) Excel بيعرف منهم إنه utf-8. وبرضه [[utf-8-sig]] وانت بتقرا أي CSV جاي من Excel.

وExcel في إعدادات أوروبية بيصدّر بـ [[;]] بدل [[,]] وبفاصلة عشرية [[150,5]]. [[csv.Sniffer]] بيعرف الفاصل لوحده. أساسيات csv و json في درس «csv و json» في تاب «Python و FastAPI».`,
          example: R`import csv
rows = [
    {"name": "سارة", "city": "القاهرة", "total": 150.5},
    {"name": "Ali, Jr.", "city": "Alex", "total": 80},
]
with open("report.csv", "w", newline="", encoding="utf-8-sig") as f:
    w = csv.DictWriter(f, fieldnames=["name", "city", "total"])
    w.writeheader()
    w.writerows(rows)
with open("report.csv", newline="", encoding="utf-8") as f:
    print(list(next(csv.DictReader(f))))
with open("report.csv", newline="", encoding="utf-8-sig") as f:
    for row in csv.DictReader(f):
        print(row["name"], float(row["total"]))
with open("excel_export.csv", newline="", encoding="utf-8-sig") as f:
    dialect = csv.Sniffer().sniff(f.read(2048), delimiters=",;\t")
    f.seek(0)
    for row in csv.DictReader(f, dialect=dialect):
        print(dialect.delimiter, row["name"], float(row["total"].replace(",", ".")))`,
          try: R`اعمل ملف زي اللي Excel بيصدّره: [[printf '\xef\xbb\xbfname;city;total\r\nسارة;القاهرة;150,5\r\nOmar;Alex;80\r\n' > excel_export.csv]] وشغّل السكربت. وبعدين [[xxd report.csv | head -2]] وشوف أول 3 bytes. على ويندوز PowerShell مفيش printf ولا xxd: اعمل الملف بـ [[python -c "open('excel_export.csv','wb').write('\ufeffname;city;total\r\nسارة;القاهرة;150,5\r\nOmar;Alex;80\r\n'.encode())"]]، وبص على الـ bytes بـ [[Format-Hex report.csv | Select-Object -First 2]]. ولو عندك Excel أو LibreOffice، افتح report.csv، وبعدين اكتبه بـ [[utf-8]] بدل [[utf-8-sig]] وافتحه تاني.`,
          flag: "script",
          deep: {
            why: "أغلب الناس اللي هيستلموا تقرير السكربت هيفتحوه في Excel. لو العربي طلع رموز أو كل الأعمدة في عمود واحد، التقرير ملوش لازمة مهما كانت الأرقام صح.",
            how: R`الـ BOM هو الحرف [[U+FEFF]] ومكتوب utf-8 كـ [[EF BB BF]]. Excel على ويندوز بيشوفه فيقرا الملف utf-8، ومن غيره بيقرا بـ encoding ويندوز فيطلع العربي [[Ø³Ø§Ø±Ø©]] وما شابه. باقي البرامج (Python و LibreOffice و Google Sheets) بتفهم الاتنين.

لما تقرا ملف فيه BOM بـ [[utf-8]] بس، أول عمود اسمه بيبقى [['\ufeffname']] (الحرف ده مش بيبان لما تطبعه عادي، بيبان في repr)، و [[row["name"] ]] يطلع KeyError وانت شايف الاسم صح بعينك. [[utf-8-sig]] في القراية بيشيل الـ BOM لو موجود ومش بيعمل حاجة لو مش موجود، فاستخدمه دايمًا للقراية.

[[newline=""]]: الـ csv بيكتب [[\r\n]] في آخر كل صف (ده المعيار)، ومن غير [[newline=""]] على ويندوز بيبقى [[\r\r\n]] فيظهر سطر فاضي بين كل صفين.

الاسم اللي فيه فاصلة [["Ali, Jr."]] بيتكتب بين علامات تنصيص لوحده. ده سبب إنك متقسمش CSV بـ [[split(",")]].

[[Sniffer().sniff(sample, delimiters=",;\t")]] بيخمّن الفاصل من أول جزء، و [[f.seek(0)]] يرجّع لأول الملف. كل القيم بتيجي نصوص، فـ [[float()]]، و [[replace(",", ".")]] للفاصلة العشرية الأوروبية.`,
            when: "أي تقرير رايح لبني آدم. ولو محتاج تنسيق وألوان وأكتر من شيت، مكتبة [[openpyxl]] بتكتب xlsx بجد.",
            mistakes: R`[[encoding="utf-8"]] للتقرير فالعربي يبوظ في Excel. وتقرا ملف Excel بـ [[utf-8]] فيطلع KeyError على أول عمود. وتنسى [[newline=""]]. و [[DictWriter]] بيرمي [[ValueError: dict contains fields not in fieldnames]] لو صف فيه مفتاح زيادة، و [[extrasaction="ignore"]] بيتجاهله.`
          },
          teach: R`## السكربت ده بيعمل إيه؟

٤ أجزاء: بيكتب تقرير [[report.csv]] بطريقة Excel يفتحها والعربي سليم، وبعدين يقراه غلط مرة عشان تشوف المشكلة، وصح مرة، وفي الآخر يقرا ملف جاي من Excel أوروبي الفاصل فيه [[;]].

**CSV** يعني Comma-Separated Values: جدول في ملف نص، كل صف سطر، والأعمدة بينها فاصلة.

اتشغّل على لينكس ([[python:3.13-slim]]) وعلى ويندوز (Python 3.14) بنفس الناتج حرف بحرف.

---

## ١. البيانات

~~~python csv_report.py
import csv
rows = [
    {"name": "سارة", "city": "القاهرة", "total": 150.5},
    {"name": "Ali, Jr.", "city": "Alex", "total": 80},
]
~~~

list فيها dict لكل صف. والاسم التاني فيه فاصلة قصد، عشان نشوف هتتكتب إزاي.

---

## ٢. الكتابة

~~~python csv_report.py
with open("report.csv", "w", newline="", encoding="utf-8-sig") as f:
    w = csv.DictWriter(f, fieldnames=["name", "city", "total"])
    w.writeheader()
    w.writerows(rows)
~~~

### [[open(...)]] بالـ ٣ خيارات

- [[with ... as f]] افتح الملف، ولما البلوك يخلص اقفله لوحدك حتى لو حصل error.
- [["w"]] كتابة (بيمسح أي حاجة قديمة في الملف).
- [[newline=""]]: سيب نهايات السطور للـ csv نفسه. الموديول بيكتب [[\r\n]] في آخر كل صف (ده المعيار)، ولو سبت Python يحوّل كمان، على ويندوز بيطلع [[\r\r\n]]. جرّبناها على ويندوز من غير [[newline=""]]:

~~~text الناتج: محتوى الملف بالـ bytes
b'a,b\r\r\nc,d\r\r\n'
~~~

وده اللي بيخلي Excel يعرض سطر فاضي بين كل صفين.

- [[encoding="utf-8-sig"]]: [[sig]] اختصار **signature**. بيكتب ٣ bytes في أول الملف اسمهم **BOM** (Byte Order Mark): [[EF BB BF]]. Excel على ويندوز بيشوفهم فيعرف إن الملف utf-8.

### [[csv.DictWriter]]

[[DictWriter]] بياخد dicts ويكتبها صفوف. و [[fieldnames]] أسماء الأعمدة **بالترتيب** اللي هتتكتب بيه. [[writeheader()]] سطر العناوين، و [[writerows(rows)]] كل الصفوف مرة واحدة.

### الملف طلع إزاي؟

على لينكس بـ [[cat -A]] (بيوري الحروف المخفية: [[^M]] هي [[\r]] و [[$]] آخر السطر، و [[M-oM-;M-?]] هي الـ BOM):

~~~text الناتج
M-oM-;M-?name,city,total^M$
...,150.5^M$
"Ali, Jr.",Alex,80^M$
~~~

([[...]] مكان الحروف العربية، [[cat -A]] بيعرضها رموز.) لاحظ [["Ali, Jr."]]: الـ csv حطها بين علامات تنصيص لوحده عشان الفاصلة اللي جواها متتفهمش عمود جديد. وده سبب إنك عمرك ما تقسم سطر CSV بـ [[split(",")]].

وعلى ويندوز بـ [[Format-Hex report.csv]]:

~~~text الناتج
0000000000000000 EF BB BF 6E 61 6D 65 2C 63 69 74 79 2C 74 6F 74 ï»¿name,city,tot
0000000000000010 61 6C 0D 0A D8 B3 D8 A7 D8 B1 D8 A9 2C D8 A7 D9 al��Ø³Ø§Ø±Ø©,Ø§Ù
~~~

[[EF BB BF]] الـ BOM، و [[6E 61 6D 65]] هي [[name]]، و [[0D 0A]] هي [[\r\n]]. والعمود اللي على اليمين بيعرض كل byte كحرف لوحده، فالـ BOM بقى [[ï»¿]] و [[سارة]] بقت [[Ø³Ø§Ø±Ø©]]. ده **بالظبط** اللي Excel بيعرضه لو الملف من غير BOM: بيقرا كل byte كحرف لوحده بدل ما يقرا كل ٢ bytes كحرف عربي واحد.

---

## ٣. القراية الغلط

~~~python csv_report.py
with open("report.csv", newline="", encoding="utf-8") as f:
    print(list(next(csv.DictReader(f))))
~~~

- [[csv.DictReader(f)]] بيقرا أول سطر كأسماء أعمدة، وكل سطر بعده dict.
- [[next(...)]] هات أول صف بس. و [[list(dict)]] بترجّع المفاتيح.

~~~text الناتج
['﻿name', 'city', 'total']
~~~

قرينا بـ [[utf-8]] العادي، فالـ BOM فضل لازق في أول اسم عمود: [[﻿]] هو الحرف ده. ولو طبعته عادي مش هيبان، فهتكتب [[row["name"] ]] وتاخد [[KeyError: 'name']] وانت شايف الاسم صح.

---

## ٤. القراية الصح

~~~python csv_report.py
with open("report.csv", newline="", encoding="utf-8-sig") as f:
    for row in csv.DictReader(f):
        print(row["name"], float(row["total"]))
~~~

[[utf-8-sig]] في القراية بيشيل الـ BOM لو موجود، ومش بيعمل حاجة لو مش موجود. و [[float(...)]] لأن **كل** القيم من CSV نصوص، حتى الأرقام.

~~~text الناتج
سارة 150.5
Ali, Jr. 80.0
~~~

---

## ٥. ملف جاي من Excel أوروبي

في إعدادات أوروبية Excel بيفصل بـ [[;]] والفاصلة العشرية [[,]]. عملنا ملف زيه:

~~~bash
printf '\xef\xbb\xbfname;city;total\r\nسارة;القاهرة;150,5\r\nOmar;Alex;80\r\n' > excel_export.csv
~~~

~~~powershell
python -c "open('excel_export.csv','wb').write('﻿name;city;total\r\nسارة;القاهرة;150,5\r\nOmar;Alex;80\r\n'.encode())"
~~~

~~~python csv_report.py
with open("excel_export.csv", newline="", encoding="utf-8-sig") as f:
    dialect = csv.Sniffer().sniff(f.read(2048), delimiters=",;\t")
    f.seek(0)
    for row in csv.DictReader(f, dialect=dialect):
        print(dialect.delimiter, row["name"], float(row["total"].replace(",", ".")))
~~~

1. [[f.read(2048)]] اقرا أول 2048 حرف كعيّنة.
2. [[csv.Sniffer().sniff(sample, delimiters=",;\t")]] **sniff** يعني «يشم»: بيخمّن شكل الملف من العيّنة، واحنا قلناله الفاصل واحد من دول ([[\t]] يعني tab). بيرجّع **dialect**: وصف للملف فيه [[delimiter]] (الفاصل).
3. [[f.seek(0)]] القراية حرّكت مكاننا في الملف، فارجع لأوله.
4. [[DictReader(f, dialect=dialect)]] اقرا بالشكل اللي اتعرف.
5. [[replace(",", ".")]] حوّل [[150,5]] لـ [[150.5]] قبل [[float]].

~~~text الناتج
; سارة 150.5
; Omar 80.0
~~~

---

## الخلاصة

| الموقف | الـ encoding |
|---|---|
| بتكتب تقرير هيتفتح في Excel | [[utf-8-sig]] |
| بتقرا أي CSV (خصوصًا من Excel) | [[utf-8-sig]] |
| ملف لبرنامج تاني مش Excel | [[utf-8]] |

- [[newline=""]] في كل [[open]] للـ csv، قراية وكتابة.
- القيم نصوص: [[float()]] و [[int()]] بنفسك.
- الفاصلة جوه قيمة بتتحط بين علامات تنصيص لوحدها، فمتقسمش بـ [[split]].
- [[DictWriter]] بيرمي [[ValueError: dict contains fields not in fieldnames: 'b']] لو صف فيه مفتاح مش في [[fieldnames]] (اتجرّبت).`,
          lines: [
            "csv.",
            "الصفوف:",
            "dict لكل صف.",
            "اسم فيه فاصلة.",
            "قفلة الـ list.",
            "اكتب بـ BOM عشان Excel.",
            "writer بأسماء الأعمدة بالترتيب.",
            "سطر العناوين.",
            "كل الصفوف.",
            "اقراه بـ utf-8 بس...",
            "...واطبع أسماء الأعمدة.",
            "اقراه صح بـ utf-8-sig.",
            "كل صف dict.",
            "القيم نصوص، فحوّل الرقم.",
            "ملف جاي من Excel أوروبي.",
            "خمّن الفاصل من أول 2KB.",
            "ارجع لأول الملف.",
            "اقرا بالفاصل اللي اتعرف.",
            "الفاصل والاسم والرقم بعد ما الفاصلة العشرية بقت نقطة."
          ],
          sol: R`الناتج:

[[['\ufeffname', 'city', 'total'] ]]: ده اللي بيحصل لو قريت بـ utf-8 بس.
[[سارة 150.5]] و [[Ali, Jr. 80.0]]: بـ utf-8-sig كله تمام.
[[; سارة 150.5]] و [[; Omar 80.0]]: الـ Sniffer عرف إن الفاصل [[;]].

و [[xxd]] بيبدأ بـ [[efbb bf6e 616d 65]] يعني BOM وبعده [[name]]. وآخر الصفوف [[0d0a]] يعني [[\r\n]]. وعلى ويندوز [[Format-Hex]] طلّع نفس الـ bytes: [[EF BB BF 6E 61 6D 65]]، والسكربت طبع نفس السطور بالظبط.

الملف بـ BOM بيتفتح في Excel على ويندوز والعربي سليم والأعمدة متقسمة. من غير BOM، Excel بيقراه بـ encoding ويندوز فالعربي يطلع رموز. (ده سلوك Excel المعروف، وأنا جربت هنا الـ bytes والقراية بـ Python بس.)`
        },
        {
          cmd: "yaml.safe_load و ElementTree",
          title: "ملفات YAML و XML",
          desc: R`YAML شائع في ملفات الإعدادات (Docker Compose و GitHub Actions و Kubernetes) لأنه مقروء وفيه تعليقات. في Python محتاج [[pip install pyyaml]]، وبتقرا بـ [[yaml.safe_load]] دايمًا، مش [[yaml.load]].

XML لسه موجود في sitemaps و RSS وملفات Office وأنظمة قديمة. [[xml.etree.ElementTree]] في المكتبة الأساسية: [[ET.parse]] يقرا، و [[findall]] و [[findtext]] يدوّروا. ولو الملف فيه namespace ([[xmlns=...]]) لازم تديله الـ namespace وانت بتدوّر، وإلا مش هيلاقي حاجة.`,
          example: R`import xml.etree.ElementTree as ET
from pathlib import Path
import yaml
cfg = yaml.safe_load(Path("sites.yaml").read_text(encoding="utf-8"))
for site in cfg["sites"]:
    print(site["name"], site["url"], site.get("timeout", cfg["defaults"]["timeout"]))
print(cfg["country"], cfg["version"])
Path("out.yaml").write_text(yaml.safe_dump(cfg, allow_unicode=True, sort_keys=False), encoding="utf-8")
NS = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
root = ET.parse("sitemap.xml").getroot()
print(root.tag)
for url in root.findall("sm:url", NS):
    print(url.findtext("sm:loc", namespaces=NS), url.findtext("sm:lastmod", default="-", namespaces=NS))
print(len(root.findall("url")))`,
          try: R`اعمل الملفين بالأوامر اللي في أول الحل (فيهم [[country: NO]] و [[version: 1.10]] قصد)، وسطّب [[pyyaml]] في venv، وشغّل السكربت. وبعدين جرّب [[yaml.safe_load("on: yes\nzip: 012\n")]] وصلّح [[country]] و [[version]] في الملف عشان يطلعوا نصوص. أوامر الحل bash ([[cat > file <<'EOF']])، فعلى ويندوز اعمل الملفين في VS Code والصق اللي بين سطر [[cat]] وسطر [[EOF]].`,
          flag: "script",
          deep: {
            why: R`إعدادات السكربت لما بتكبر (مواقع، جداول، مستخدمين) بتبقى أسهل في YAML. و XML بيقابلك لما تسحب sitemap موقع عشان تشيّك على روابطه، أو تقرا export من نظام قديم.`,
            how: R`[[safe_load]] بيطلّع dict و list و str و int و float و bool و None بس. [[yaml.load]] من غير Loader بقى error في PyYAML 6، والـ Loader الكامل ممكن ينفّذ كود Python من الملف ([[!!python/object/apply:os.system]])، فممنوع على أي ملف مش انت كاتبه.

مفاجآت YAML (PyYAML بيتبع YAML 1.1): [[NO]] و [[no]] و [[off]] بقوا [[False]] (كود النرويج اتقرا False). [[on: yes]] بقى [[{True: True}]]، حتى المفتاح. [[1.10]] بقى رقم [[1.1]]. و [[012]] بقى [[10]] (octal). الحل: أي نص ممكن يتلخبط حطه بين علامات تنصيص [["NO"]] و [["1.10"]].

[[safe_dump(..., allow_unicode=True, sort_keys=False)]]: العربي يفضل عربي والترتيب زي ما هو. بس التعليقات بتضيع، ولو محتاج تعدّل ملف YAML وتحافظ على تعليقاته استخدم [[ruamel.yaml]].

XML: الـ namespace بيبقى جزء من اسم الـ tag: [[{http://www.sitemaps.org/schemas/sitemap/0.9}urlset]]. فإما تكتب الاسم كامل، أو تعمل dict [[NS]] وتستخدم [[sm:url]]. و [[findtext]] بيرجّع النص أو [[default]] لو مش موجود. وللملفات الضخمة [[ET.iterparse]] بيقرا جزء جزء.

وXML جاي من برّه (رفعه مستخدم، أو من API مش بتاعك): استخدم [[defusedxml]]، لأن ElementTree نفسه مكتوب في التوثيق إنه مش آمن ضد ملفات معمولة مخصوص.`,
            when: "YAML لإعدادات فيها مستويات وقوائم وبيعدّلها ناس. XML لما المصدر نفسه XML.",
            mistakes: R`[[yaml.load]] على ملف من برّه. وقيم زي [[NO]] و [[on]] و [[1.10]] وأرقام تليفونات تبدأ بصفر من غير quotes. وتدوّر بـ [[findall("url")]] في ملف فيه namespace فيرجع list فاضية من غير أي error.`
          },
          teach: R`## السكربت ده بيعمل إيه؟

نصّه الأول بيقرا ملف إعدادات YAML فيه لستة مواقع ويطبعها، وبيكتبه تاني. ونصّه التاني بيقرا sitemap (ملف XML بروابط صفحات موقع) ويطلّع منه الروابط. الملفين بيتعملوا بأوامر الحل.

اتشغّل على لينكس ([[python:3.13-slim]] و [[pip install pyyaml]] جوه الكونتينر) وعلى ويندوز (Python 3.14 في venv)، و PyYAML 6.0.3 في الاتنين، وطلع نفس الناتج.

---

## ١. الملفين

### YAML

**YAML** شكل للإعدادات مبني على المسافات بدل الأقواس:

~~~text sites.yaml
# sites to check
defaults:
  timeout: 5
sites:
  - name: الموقع الرئيسي
    url: https://example.com
  - name: api
    url: https://api.example.com/health
    timeout: 10
country: NO
version: 1.10
~~~

- [[#]] تعليق (JSON مفيهوش ده).
- [[key: value]] مفتاح وقيمة، والمسافات في أول السطر بتقول مين جوه مين: [[timeout]] جوه [[defaults]].
- [[- ]] في أول السطر عنصر في list. فـ [[sites]] list فيها ٢ dict.
- [[country: NO]] و [[version: 1.10]] مكتوبين كده قصد، هنشوف ليه.

### XML

~~~text sitemap.xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://example.com/</loc><lastmod>2026-09-30</lastmod></url>
  <url><loc>https://example.com/about</loc><lastmod>2026-08-01</lastmod></url>
  <url><loc>https://example.com/blog/python</loc></url>
</urlset>
~~~

**XML** كل حاجة فيه **tag** بيفتح [[<url>]] ويقفل [[</url>]]. و [[xmlns="..."]] اسمها **namespace** (اختصار XML namespace): اسم عالمي للـ tags دي عشان ميتلخبطوش مع tags تانية بنفس الاسم. وهي سبب أشهر مشكلة في الدرس. والرابط التالت مفيهوش [[lastmod]] قصد.

---

## ٢. الاستيراد

~~~python data_files.py
import xml.etree.ElementTree as ET
from pathlib import Path
import yaml
~~~

- [[xml.etree.ElementTree]] في المكتبة الأساسية، و [[as ET]] اسم أقصر. **ElementTree** يعني الملف بيتقري كشجرة: عنصر جواه عناصر.
- [[yaml]] مش في المكتبة الأساسية. اسم الموديول [[yaml]] بس الـ package اسمها [[pyyaml]]، فـ [[pip install pyyaml]] في venv.

---

## ٣. قراية YAML

~~~python data_files.py
cfg = yaml.safe_load(Path("sites.yaml").read_text(encoding="utf-8"))
for site in cfg["sites"]:
    print(site["name"], site["url"], site.get("timeout", cfg["defaults"]["timeout"]))
~~~

- [[yaml.safe_load(text)]] من نص YAML لـ dict. كلمة **safe** معناها إنه بيطلّع أنواع بسيطة بس (dict و list ونص ورقم و bool و None)، ومش بينفّذ أي حاجة. [[yaml.load]] بالـ Loader الكامل ممكن ينفّذ كود Python مكتوب في الملف، ومن غير Loader أصلًا بقى error:

~~~text الناتج: yaml.load("a: 1")
TypeError: load() missing 1 required positional argument: 'Loader'
~~~

- [[for site in cfg["sites"]:]] لف على الـ list، و [[site]] كل مرة dict موقع.
- [[site.get("timeout", cfg["defaults"]["timeout"])]] الـ timeout بتاع الموقع لو موجود، وإلا القيمة من [[defaults]].

~~~text الناتج
الموقع الرئيسي https://example.com 5
api https://api.example.com/health 10
~~~

الأول ملوش timeout فخد 5، والتاني عنده 10.

---

## ٤. مفاجآت YAML

~~~python data_files.py
print(cfg["country"], cfg["version"])
~~~

~~~text الناتج
False 1.1
~~~

[[NO]] (كود النرويج) بقت [[False]]، و [[1.10]] بقت الرقم [[1.1]]. السبب إن PyYAML ماشي على YAML 1.1، وفيها [[yes]] و [[no]] و [[on]] و [[off]] كلهم bool، وأي حاجة شكلها رقم بتبقى رقم. جرّبنا كمان:

~~~text الناتج: yaml.safe_load("on: yes\nzip: 012\n")
{True: True, 'zip': 10}
~~~

حتى المفتاح [[on]] بقى [[True]]. و [[012]] اتقرت **octal** (نظام العد بالتمانية): 1×8 + 2 = 10. ورقم تليفون زي [[0101]] من غير علامات تنصيص طلع [[65]].

الحل: علامات تنصيص حوالين أي نص ممكن يتلخبط:

~~~text الناتج: country: "NO" و version: "1.10"
{'country': 'NO', 'version': '1.10'}
~~~

---

## ٥. كتابة YAML

~~~python data_files.py
Path("out.yaml").write_text(yaml.safe_dump(cfg, allow_unicode=True, sort_keys=False), encoding="utf-8")
~~~

[[safe_dump]] العكس: من dict لنص YAML. [[allow_unicode=True]] العربي يتكتب عربي، و [[sort_keys=False]] المفاتيح بنفس ترتيبها بدل ما تترتب أبجدي.

~~~text out.yaml
defaults:
  timeout: 5
sites:
- name: الموقع الرئيسي
  url: https://example.com
- name: api
  url: https://api.example.com/health
  timeout: 10
country: false
version: 1.1
~~~

لاحظ ٣ حاجات: التعليق [[# sites to check]] ضاع (PyYAML مش بيحتفظ بالتعليقات)، و [[NO]] بقت [[false]] للأبد، و [[1.10]] بقت [[1.1]].

---

## ٦. قراية XML

~~~python data_files.py
NS = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
root = ET.parse("sitemap.xml").getroot()
print(root.tag)
~~~

- [[NS]] dict بيدّي الـ namespace الطويل اسم قصير [[sm]] (من sitemap). الاسم ده انت اللي بتختاره.
- [[ET.parse("sitemap.xml")]] اقرا الملف كشجرة، و [[.getroot()]] هات العنصر اللي برة خالص ([[urlset]]).
- [[root.tag]] اسم الـ tag:

~~~text الناتج
{http://www.sitemaps.org/schemas/sitemap/0.9}urlset
~~~

ده المهم: ElementTree بيلزق الـ namespace في اسم كل tag بين [[{ }]]. فالاسم الحقيقي مش [[urlset]].

### الروابط

~~~python data_files.py
for url in root.findall("sm:url", NS):
    print(url.findtext("sm:loc", namespaces=NS), url.findtext("sm:lastmod", default="-", namespaces=NS))
~~~

- [[findall("sm:url", NS)]] هات كل العناصر اللي اسمها [[url]] **جوه الـ namespace ده** (المستوى اللي تحت root بس). [[sm:]] بتتبدل بالرابط من [[NS]].
- [[findtext("sm:loc", namespaces=NS)]] هات **النص** اللي جوه أول [[loc]]. و [[default="-"]] لو مش موجود.

~~~text الناتج
https://example.com/ 2026-09-30
https://example.com/about 2026-08-01
https://example.com/blog/python -
~~~

### ومن غير namespace؟

~~~python data_files.py
print(len(root.findall("url")))
~~~

~~~text الناتج
0
~~~

ولا error ولا تحذير، list فاضية بس. ده أكتر غلط بيضيّع وقت مع XML.

---

## الخلاصة

| | YAML | XML |
|---|---|---|
| المكتبة | [[pyyaml]] (pip) | [[xml.etree.ElementTree]] (أساسية) |
| القراية | [[yaml.safe_load(text)]] | [[ET.parse(file).getroot()]] |
| الدوَران | dict و list عادي | [[findall]] و [[findtext]] بالـ namespace |
| الكتابة | [[safe_dump(..., allow_unicode=True, sort_keys=False)]] | [[ET.ElementTree(root).write(...)]] |

- [[safe_load]] دايمًا، عمرك ما [[load]] على ملف مش انت كاتبه.
- أي نص ممكن يتفهم bool أو رقم ([[NO]] و [[on]] و [[1.10]] و [[012]]) حطه بين علامات تنصيص.
- XML فيه [[xmlns]]؟ اديله الـ namespace في كل [[find]]. و XML جاي من برّه استخدم [[defusedxml]].`,
          lines: [
            "XML في المكتبة الأساسية.",
            "Path.",
            "pip install pyyaml.",
            "اقرا YAML لـ dict بأمان.",
            "لف على القائمة:",
            "قيمة الموقع أو الافتراضية من الملف.",
            "قيم شكلها نص وطلعت حاجة تانية.",
            "اكتب YAML تاني، والعربي عربي والترتيب زي ما هو.",
            "الـ namespace اللي في الـ sitemap.",
            "اقرا الملف وخد العنصر الرئيسي.",
            "اسم الـ tag كامل بالـ namespace.",
            "كل url، بالـ namespace.",
            "الرابط، وتاريخ التعديل أو - لو مش موجود.",
            "من غير namespace: ولا واحد."
          ],
          sol: R`الناتج:

[[الموقع الرئيسي https://example.com 5]]
[[api https://api.example.com/health 10]]
[[False 1.1]]: الـ [[NO]] بقت False والـ [[1.10]] بقت 1.1.
[[{http://www.sitemaps.org/schemas/sitemap/0.9}urlset]]
[[https://example.com/ 2026-09-30]] و [[https://example.com/about 2026-08-01]] و [[https://example.com/blog/python -]]
[[0]]: من غير namespace مالقاش ولا url.

و [[yaml.safe_load("on: yes\nzip: 012\n")]] رجّع [[{True: True, 'zip': 10}]]. ومع [[country: "NO"]] و [[version: "1.10"]] رجعوا [['NO']] و [['1.10']]. و [[yaml.load("a: 1")]] من غير Loader: [[TypeError: load() missing 1 required positional argument: 'Loader']].`,
          solCode: R`cat > sites.yaml <<'EOF'
# sites to check
defaults:
  timeout: 5
sites:
  - name: الموقع الرئيسي
    url: https://example.com
  - name: api
    url: https://api.example.com/health
    timeout: 10
country: NO
version: 1.10
EOF
cat > sitemap.xml <<'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://example.com/</loc><lastmod>2026-09-30</lastmod></url>
  <url><loc>https://example.com/about</loc><lastmod>2026-08-01</lastmod></url>
  <url><loc>https://example.com/blog/python</loc></url>
</urlset>
EOF`
        },
        {
          cmd: "datetime وأسماء الملفات",
          title: "التاريخ في أسماء الملفات، وعمر الملف بالأيام",
          desc: R`سكربتات الأتمتة بتستخدم التاريخ في حاجتين: أسماء ملفات ([[backup_2026-10-01_161416.zip]]) عشان ميدوسوش على بعض ويترتبوا لوحدهم، وحسابات ([[الملف ده عمره كام يوم؟]]، [[امسح اللي أقدم من 30 يوم]]).

[[strftime]] من تاريخ لنص بالشكل اللي انت عايزه، و [[strptime]] من نص لتاريخ، و [[timedelta]] فرق بين تاريخين، و [[datetime.fromtimestamp(p.stat().st_mtime)]] وقت آخر تعديل في ملف. المناطق الزمنية و zoneinfo في درس «datetime و zoneinfo» في تاب «Python و FastAPI».`,
          example: R`from datetime import datetime, timedelta
from pathlib import Path
now = datetime.now()
print(now.strftime("%Y-%m-%d_%H%M%S"))
print(f"backup_{now:%Y%m%d}.zip")
for p in sorted(Path(".").glob("*.csv")):
    mtime = datetime.fromtimestamp(p.stat().st_mtime)
    age = now - mtime
    print(p.name, mtime.isoformat(" ", timespec="seconds"), f"{age.days} days old")
cutoff = now - timedelta(days=30)
print("cutoff:", cutoff.date())
names = ["log_2026-09-30.txt", "log_2026-10-01.txt", "log_2026-01-15.txt"]
print(sorted(names))
day = datetime.strptime("log_2026-09-30.txt", "log_%Y-%m-%d.txt").date()
print(day, day.strftime("%A"), (now.date() - day).days)
print(sorted(["5-10-2026", "30-9-2026", "1-1-2027"]))`,
          try: R`اعمل ملف قديم بـ [[touch -d "45 days ago" old_report.csv]] (في PowerShell: [[New-Item old_report.csv]] وبعدين [[(Get-Item old_report.csv).LastWriteTime = (Get-Date).AddDays(-45)]]) وشغّل السكربت. وبعدين اكتب دالة [[latest_backup(folder)]] بترجّع أحدث [[backup_*.zip]] من الاسم نفسه (مش من وقت التعديل)، وجرّبها على [[backup_2026-09-29.zip]] و [[backup_2026-10-01.zip]] و [[backup_2026-09-30.zip]].`,
          flag: "script",
          deep: {
            why: R`backup باسم ثابت بيدوس على اللي قبله. واسم زي [[30-9-2026]] مبيترتبش صح. و «أقدم من 30 يوم» محتاجة تاريخ الملف مش تاريخ النهارده بس.`,
            how: R`الشكل [[%Y-%m-%d]] (ISO) هو الوحيد اللي ترتيب الأسماء فيه هو ترتيب التواريخ، عشان السنة الأول والأرقام بأصفار ([[09]] مش [[9]]). فـ [[sorted(names)]] و [[ls]] بيرتّبوه صح من غير أي parsing.

[[%H%M%S]] من غير [[:]] لأن ويندوز مبيقبلش [[:]] في اسم الملف. والأسوأ إن Python على NTFS مش بيطلّع error: الملف بيتعمل باسم مقصوص لحد الـ [[:]] والباقي بيروح alternate data stream مخفي.

[[st_mtime]] ثواني من 1970 (Unix timestamp)، و [[fromtimestamp]] بيحوّلها لتوقيت جهازك. و [[now - mtime]] بيطلّع [[timedelta]]، و [[.days]] الأيام الكاملة (بيقرّب لتحت)، و [[total_seconds()]] للدقة. على لينكس [[st_ctime]] مش وقت الإنشاء (ده وقت تغيير الصلاحيات أو الاسم).

[[strptime]] لازم الشكل يطابق بالظبط وإلا [[ValueError]]، فاعمله في try لو الأسماء ممكن تبقى مختلفة. و [[%A]] اسم اليوم بلغة الجهاز.

[[datetime.now()]] بتوقيت الجهاز ومن غير timezone. على سيرفر (غالبًا UTC) وجهازك (القاهرة) نفس السكربت هيطلّع أسماء مختلفة، فلو ده مهم استخدم [[datetime.now(timezone.utc)]] في كل حتة.`,
            when: "أي ملف السكربت بيعمله أكتر من مرة (backup، تقرير، log)، وأي تنضيف بالعمر.",
            mistakes: R`[[%m]] (شهر) و [[%M]] (دقيقة) و [[%d]] و [[%D]]. و [[datetime.now().strftime("%Y-%m-%d %H:%M")]] في اسم ملف على ويندوز. وتقارن datetime فيه timezone بواحد من غير: [[TypeError: can't compare offset-naive and offset-aware datetimes]]. وأسماء بتنسيق [[d-m-Y]] فالترتيب يبوظ.`
          },
          teach: R`## السكربت ده بيعمل إيه؟

بيعمل ٣ حاجات بالتواريخ: يطلّع اسم ملف فيه الوقت، ويحسب عمر كل ملف CSV في الفولدر بالأيام، ويقرا التاريخ من اسم ملف. وفي الآخر بيوريك ليه شكل التاريخ في الاسم بيفرق.

اتشغّل يوم 6 أكتوبر 2026 على لينكس ([[python:3.13-slim]]، الساعة UTC) وعلى ويندوز (Python 3.14، بتوقيت القاهرة)، وقبلها عملنا ملف [[old_report.csv]] عمره ٤٥ يوم:

~~~bash
touch -d "45 days ago" old_report.csv
~~~

~~~powershell
New-Item old_report.csv
(Get-Item old_report.csv).LastWriteTime = (Get-Date).AddDays(-45)
~~~

[[touch -d]] بيغيّر وقت التعديل لتاريخ انت بتقوله. وفي PowerShell بنغيّر خانة [[LastWriteTime]] بإيدنا: [[(Get-Date).AddDays(-45)]] يعني «النهارده ناقص ٤٥ يوم».

---

## ١. الاستيراد والوقت دلوقتي

~~~python dates.py
from datetime import datetime, timedelta
from pathlib import Path
now = datetime.now()
~~~

- [[datetime]] (الموديول) جواه نوع اسمه برضه [[datetime]]: تاريخ ووقت مع بعض. و [[timedelta]] **مدة**: فرق بين وقتين (delta يعني فرق).
- [[datetime.now()]] الوقت دلوقتي بتوقيت الجهاز.

---

## ٢. من تاريخ لنص: [[strftime]]

~~~python dates.py
print(now.strftime("%Y-%m-%d_%H%M%S"))
print(f"backup_{now:%Y%m%d}.zip")
~~~

[[strftime]] اختصار **string format time**: حوّل الوقت لنص بالشكل ده. وكل [[%]] وبعدها حرف بتتبدل بحتة من التاريخ:

| الرمز | معناه | مثال |
|---|---|---|
| [[%Y]] | السنة ٤ أرقام | [[2026]] |
| [[%m]] | الشهر برقمين (month) | [[10]] |
| [[%d]] | اليوم برقمين (day) | [[06]] |
| [[%H]] | الساعة من 00 لـ 23 (hour) | [[17]] |
| [[%M]] | الدقيقة (minute)، **مش** الشهر | [[39]] |
| [[%S]] | الثانية (second) | [[25]] |
| [[%A]] | اسم اليوم | [[Tuesday]] |

وفي f-string تقدر تكتب نفس الرموز بعد [[:]] جوه الأقواس: [[{now:%Y%m%d}]].

~~~text الناتج على لينكس
2026-10-06_173925
backup_20261006.zip
~~~

### ليه مفيش [[:]] بين الساعة والدقيقة؟

لأن ويندوز مش بيقبل [[:]] في اسم الملف. وجرّبنا [[open("2026-10-06 20:39.txt", "w")]] من Python على ويندوز: **مطلعش error**، بس الملف اللي اتعمل اسمه [[2026-10-06 20]] بس، والباقي راح في حاجة مخفية اسمها **alternate data stream** خاصة بـ NTFS:

~~~text الناتج: Get-Item "2026-10-06 20" -Stream *
Stream Length
------ ------
:$DATA      0
39.txt      0
~~~

يعني ملف باسم ناقص وبياناتك في مكان محدش هيدوّر فيه. فممنوع [[:]] في أي اسم ملف.

---

## ٣. عمر كل ملف

~~~python dates.py
for p in sorted(Path(".").glob("*.csv")):
    mtime = datetime.fromtimestamp(p.stat().st_mtime)
    age = now - mtime
    print(p.name, mtime.isoformat(" ", timespec="seconds"), f"{age.days} days old")
~~~

من جوه لبرة:

1. [[Path(".").glob("*.csv")]] كل ملفات CSV في الفولدر الحالي ([[.]])، و [[sorted]] رتبهم بالاسم.
2. [[p.stat()]] معلومات الملف من النظام، و [[.st_mtime]] **modification time**: وقت آخر تعديل، كرقم ثواني من أول 1970 (اسمه Unix timestamp). عندنا كان [[1787420365.0]].
3. [[datetime.fromtimestamp(...)]] حوّل الرقم ده لـ datetime بتوقيت الجهاز.
4. [[now - mtime]] طرح وقتين بيطلّع [[timedelta]]. مثلًا:

~~~text الناتج: repr لفرق وقتين
datetime.timedelta(days=44, seconds=82800)
~~~

ده ٤٤ يوم و ٢٣ ساعة. و [[.days]] بياخد الأيام الكاملة بس ([[44]] هنا)، و [[total_seconds()]] لو عايز الدقة.

5. [[isoformat(" ", timespec="seconds")]] شكل ISO مقروء، بمسافة بين التاريخ والوقت بدل [[T]]، ومن غير كسور الثانية.

~~~text الناتج
old_report.csv 2026-08-22 17:39:25 45 days old
~~~

---

## ٤. تاريخ من ٣٠ يوم

~~~python dates.py
cutoff = now - timedelta(days=30)
print("cutoff:", cutoff.date())
~~~

[[timedelta(days=30)]] مدة ٣٠ يوم، وطرحها من [[now]] بيدّي تاريخ. و [[.date()]] اليوم بس من غير الساعة. ده اللي سكربت التنضيف هيقارن بيه: أي ملف [[mtime]] بتاعه أقدم من [[cutoff]] يتمسح.

~~~text الناتج
cutoff: 2026-09-06
~~~

---

## ٥. ليه الشكل [[YYYY-MM-DD]]؟

~~~python dates.py
names = ["log_2026-09-30.txt", "log_2026-10-01.txt", "log_2026-01-15.txt"]
print(sorted(names))
~~~

~~~text الناتج
['log_2026-01-15.txt', 'log_2026-09-30.txt', 'log_2026-10-01.txt']
~~~

[[sorted]] بيرتّب النصوص حرف حرف، مش كتواريخ. ومع ذلك طلعوا صح، لأن السنة الأول وبعدها الشهر وبعدها اليوم، وكل رقم بصفر قدامه ([[09]] مش [[9]]). الشكل ده اسمه **ISO 8601**. وقارن بآخر سطر في المثال:

~~~python dates.py
print(sorted(["5-10-2026", "30-9-2026", "1-1-2027"]))
~~~

~~~text الناتج
['1-1-2027', '30-9-2026', '5-10-2026']
~~~

سنة 2027 جت الأول، لأن [[1]] أصغر من [[3]] و [[5]] كحروف.

---

## ٦. من نص لتاريخ: [[strptime]]

~~~python dates.py
day = datetime.strptime("log_2026-09-30.txt", "log_%Y-%m-%d.txt").date()
print(day, day.strftime("%A"), (now.date() - day).days)
~~~

[[strptime]] اختصار **string parse time**: العكس. بتديله النص والشكل، والشكل لازم يطابق النص **كله** بالظبط، بما فيه [[log_]] و [[.txt]].

~~~text الناتج
2026-09-30 Wednesday 6
~~~

التاريخ، واسم اليوم ([[%A]]، وبيطلع بلغة إعدادات الجهاز)، وفات كام يوم. ولو الاسم مش ماشي على الشكل:

~~~text الناتج
ValueError: time data 'log_30-9-2026.txt' does not match format 'log_%Y-%m-%d.txt'
~~~

---

## ٧. الحل: أحدث backup من الاسم

~~~python latest.py
def latest_backup(folder: Path) -> Path | None:
    dated = []
    for p in folder.glob("backup_*.zip"):
        try:
            dated.append((datetime.strptime(p.name, "backup_%Y-%m-%d.zip"), p))
        except ValueError:
            continue
    return max(dated)[1] if dated else None
~~~

- [[dated]] list فيها tuples: [[(التاريخ، الملف)]].
- [[try / except ValueError: continue]] أي ملف اسمه مش على الشكل ([[backup_latest.zip]] مثلًا) يتجاهل بدل ما يوقّع السكربت.
- [[max(dated)]] بيقارن الـ tuples بأول عنصر (التاريخ)، و [[max(dated)[1] ]] ياخد الملف. و [[if dated else None]] عشان [[max]] على list فاضية بيرمي error.

عملنا [[backup_2026-09-29.zip]] و [[backup_2026-10-01.zip]] و [[backup_2026-09-30.zip]] و [[backup_latest.zip]]:

~~~text الناتج
backups/backup_2026-10-01.zip
~~~

(على ويندوز [[backups\backup_2026-10-01.zip]].) والتاريخ من الاسم أضمن من [[st_mtime]]، لأن النسخ أو التحميل بيغيّر وقت التعديل.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| تاريخ ← نص | [[strftime("%Y-%m-%d")]] أو [[f"{now:%Y-%m-%d}"]] |
| نص ← تاريخ | [[strptime(text, "%Y-%m-%d")]] |
| مدة | [[timedelta(days=30)]]، وطرح تاريخين بيطلّعها |
| وقت تعديل ملف | [[datetime.fromtimestamp(p.stat().st_mtime)]] |

- في أسماء الملفات: [[%Y-%m-%d]] (أو [[%Y%m%d]]) دايمًا، ومن غير [[:]].
- [[%m]] شهر و [[%M]] دقيقة.
- [[.days]] أيام كاملة بس.`,
          lines: [
            "datetime و timedelta.",
            "Path.",
            "الوقت دلوقتي.",
            "شكل مناسب لاسم ملف، من غير :.",
            "نفس الفكرة جوه f-string.",
            "لكل ملف csv:",
            "وقت آخر تعديل كتاريخ.",
            "عمره.",
            "الاسم، والوقت مقروء، والعمر بالأيام.",
            "تاريخ من 30 يوم.",
            "اليوم بس من غير وقت.",
            "أسماء بتاريخ ISO.",
            "ترتيب النصوص = ترتيب التواريخ.",
            "طلّع التاريخ من الاسم.",
            "التاريخ، واسم اليوم، وكام يوم فات.",
            "ترتيب d-m-Y بايظ."
          ],
          sol: R`النهارده 1 أكتوبر 2026، فطلع:

[[2026-10-01_161416]] و [[backup_20261001.zip]]
[[old_report.csv 2026-08-17 16:14:16 45 days old]]
[[cutoff: 2026-09-01]]
[[['log_2026-01-15.txt', 'log_2026-09-30.txt', 'log_2026-10-01.txt'] ]]: مترتبين صح.
[[2026-09-30 Wednesday 1]]
[[['1-1-2027', '30-9-2026', '5-10-2026'] ]]: سنة 2027 جت الأول. ده سبب ISO.

[[latest_backup]] (تحت) رجّعت [[backup_2026-10-01.zip]]. من الاسم أضمن من [[st_mtime]]، لأن النسخ أو الـ download بيغيّر وقت التعديل. وملف اسمه مش ماشي على الشكل بيتجاهل بدل ما يوقّع السكربت.`,
          solCode: R`from datetime import datetime
from pathlib import Path
def latest_backup(folder: Path) -> Path | None:
    dated = []
    for p in folder.glob("backup_*.zip"):
        try:
            dated.append((datetime.strptime(p.name, "backup_%Y-%m-%d.zip"), p))
        except ValueError:
            continue
    return max(dated)[1] if dated else None
print(latest_backup(Path("backups")))`
        },
        {
          cmd: "logging بدل print",
          title: "سجل للسكربت: على الشاشة وفي ملف",
          desc: R`[[print]] للنتيجة اللي السكربت معمول عشانها. أي حاجة تانية (بدأ إمتى، عمل إيه، تحذير، error) تروح [[logging]]: كل سطر بوقته ومستواه، يتطبع على stderr، ويتكتب في ملف كمان، وتقدر تخفّي التفاصيل أو تظهرها بـ [[-v]] من غير ما تمسح سطر.

المستويات بالترتيب: [[DEBUG]] و [[INFO]] و [[WARNING]] و [[ERROR]] و [[CRITICAL]]. اللي تحت المستوى المختار مش بيظهر.`,
          example: R`import logging
import sys
log = logging.getLogger("cleaner")
def setup_logging(verbose: bool, logfile: str = "cleaner.log") -> None:
    logging.basicConfig(
        level=logging.DEBUG if verbose else logging.INFO,
        format="%(asctime)s %(levelname)-7s %(name)s: %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
        handlers=[logging.StreamHandler(), logging.FileHandler(logfile, encoding="utf-8")],
    )
setup_logging(verbose="-v" in sys.argv)
log.debug("scanning %s", "/tmp/lab")
log.info("deleted %d files, freed %.1f MB", 12, 48.31)
log.warning("skipped %s: permission denied", "secret.txt")
try:
    total = 10 / 0
except ZeroDivisionError:
    log.exception("failed to compute the ratio")
print("done")`,
          try: R`شغّله بـ [[python3 logs.py 2>/dev/null]] وشوف إيه اللي فضل. وبعدين [[python3 logs.py -v 2>&1 >/dev/null]]. وبعدين [[wc -l cleaner.log]] و [[head -3 cleaner.log]]. شغّله كمان مرة وشوف الملف كبر ولا اتمسح.

في PowerShell: [[python logs.py 2>$null]]، وبعدين [[python logs.py -v > $null]] (الـ stderr بيفضل على الشاشة لوحده)، وبعدين [[(Get-Content cleaner.log).Count]] و [[Get-Content cleaner.log -TotalCount 3]].`,
          flag: "script",
          deep: {
            why: R`سكربت متجدول بيشتغل الساعة 2 بالليل وانت نايم. لما يفشل، مفيش غير الـ log تعرف منه حصل إيه وإمتى. و print من غير وقت ولا مستوى، ومتلخبط مع النتيجة، ولازم تمسحه قبل ما تسلّم.`,
            how: R`[[logging.getLogger("cleaner")]] logger باسم بيظهر في كل سطر (في مشروع فيه موديولات [[getLogger(__name__)]]).

[[basicConfig]] بيظبط الـ root logger مرة واحدة: المستوى، وشكل السطر ([[%(asctime)s]] الوقت، و [[%(levelname)-7s]] المستوى بعرض 7، و [[%(message)s]] الرسالة)، والـ handlers: [[StreamHandler()]] بيكتب على stderr افتراضيًا، و [[FileHandler]] في ملف بيضيف عليه ([["a"]]) مش بيمسحه.

[[log.info("deleted %d files", 12)]] بالـ %-formatting مش f-string: الرسالة مش بتتبني أصلًا لو المستوى مقفول، والأدوات اللي بتجمّع logs بتعرف تجمّع الرسايل المتشابهة.

[[log.exception()]] جوه except بيكتب ERROR ومعاه الـ traceback كامل. ده أهم سطر في أي سكربت متجدول.

ملف log بيكبر للأبد، فـ [[logging.handlers.RotatingFileHandler(path, maxBytes=5_000_000, backupCount=3)]] بيقسمه. أو في cron سيب الـ log على stderr واعمل redirect لملف ([[>> log 2>&1]]) وخلّي logrotate يقسمه.`,
            when: "أي سكربت بيتجدول أو بيشتغل أكتر من دقيقة. و print للنتيجة اللي حد هيقراها أو هيعملها pipe.",
            mistakes: R`[[basicConfig]] بيشتغل أول مرة بس: لو أي import عمل logging قبله، الإعداد بتاعك بيتجاهل (فيه [[force=True]]). و [[log.error(e)]] بدل [[log.exception]] فالـ traceback يضيع. و f-string فيها بيانات كبيرة في [[log.debug]] بتتبني حتى والـ debug مقفول. وباسوردات أو tokens في الـ log.`
          },
          teach: R`## السكربت ده بيعمل إيه؟

بيجهّز **logging** مرة واحدة، وبعدين يكتب ٤ رسايل بمستويات مختلفة ومعاهم error حقيقي بالـ traceback، وفي الآخر يطبع النتيجة بـ [[print]]. الفكرة: الرسايل اللي للمتابعة تروح مكان، والنتيجة تروح مكان تاني.

اتشغّل على لينكس ([[python:3.13-slim]]) وعلى ويندوز (Python 3.14) بنفس السطور.

---

## ١. مكانين للكلام: stdout و stderr

أي برنامج عنده مخرجين:

| المخرج | رقمه | بيروح فيه |
|---|---|---|
| **stdout** (standard output) | 1 | النتيجة: [[print]] |
| **stderr** (standard error) | 2 | الأخطاء والمتابعة: [[logging]] افتراضيًا |

الاتنين بيظهروا على الشاشة، بس تقدر تفصلهم بالـ redirect، وده اللي هنجرّبه.

---

## ٢. الـ logger

~~~python logs.py
import logging
import sys
log = logging.getLogger("cleaner")
~~~

[[getLogger("cleaner")]] بيجيب **logger** باسم. الاسم بيظهر في كل سطر، فلو عندك كذا موديول تعرف السطر جه منين. في مشروع فيه ملفات كتير بيكتبوا [[getLogger(__name__)]]، و [[__name__]] اسم الموديول نفسه.

---

## ٣. الإعداد

~~~python logs.py
def setup_logging(verbose: bool, logfile: str = "cleaner.log") -> None:
    logging.basicConfig(
        level=logging.DEBUG if verbose else logging.INFO,
        format="%(asctime)s %(levelname)-7s %(name)s: %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
        handlers=[logging.StreamHandler(), logging.FileHandler(logfile, encoding="utf-8")],
    )
~~~

[[basicConfig]] بيظبط الـ **root logger** (الأب اللي كل الـ loggers بتبعتله رسايلها). خيار خيار:

### [[level]]

المستويات بالترتيب من الأقل للأخطر، وكل واحد ليه رقم:

| المستوى | الرقم | إمتى |
|---|---|---|
| [[DEBUG]] | 10 | تفاصيل للي بيصلّح |
| [[INFO]] | 20 | السكربت عمل إيه |
| [[WARNING]] | 30 | حاجة غريبة بس كمّل |
| [[ERROR]] | 40 | حاجة فشلت |
| [[CRITICAL]] | 50 | السكربت مش هيكمل |

أي رسالة تحت المستوى المختار بتتجاهل. فـ [[DEBUG if verbose else INFO]] معناه: من غير [[-v]] الـ DEBUG مستخبي.

### [[format]]

كل [[%(...)s]] بتتبدل بحاجة:

- [[%(asctime)s]] الوقت.
- [[%(levelname)-7s]] اسم المستوى، و [[-7]] يعني «اكتبه في 7 خانات من الشمال»، فـ [[INFO]] بيتكمّل مسافات و [[WARNING]] مالي الـ 7. كده الرسايل بتبدأ كلها في نفس العمود.
- [[%(name)s]] اسم الـ logger ([[cleaner]]).
- [[%(message)s]] الرسالة نفسها.

و [[datefmt]] شكل الوقت بنفس رموز [[strftime]] (درس التواريخ).

### [[handlers]]

**handler** يعني «الرسالة تروح فين». حطينا اتنين، فكل رسالة بتتكتب مرتين:

- [[StreamHandler()]] على stderr (ده الافتراضي بتاعه).
- [[FileHandler(logfile, encoding="utf-8")]] في ملف. بيفتحه بـ [["a"]] (append)، يعني بيضيف في الآخر ومش بيمسح القديم.

---

## ٤. الرسايل

~~~python logs.py
setup_logging(verbose="-v" in sys.argv)
log.debug("scanning %s", "/tmp/lab")
log.info("deleted %d files, freed %.1f MB", 12, 48.31)
log.warning("skipped %s: permission denied", "secret.txt")
~~~

- [["-v" in sys.argv]] هل [[-v]] اتكتبت بعد اسم السكربت؟ بيرجّع True أو False. (في سكربت حقيقي خليها من argparse، الدرس الأول.)
- كل مستوى ليه دالة بنفس الاسم: [[log.debug]] و [[log.info]] و [[log.warning]].
- [[%s]] نص، و [[%d]] رقم صحيح، و [[%.1f]] رقم عشري برقم واحد بعد العلامة ([[48.31]] بقت [[48.3]]). القيم بتتبعت **بعد** الرسالة مش جوه f-string، و logging بيركّبها بس لو الرسالة هتظهر فعلًا.

---

## ٥. الـ error بالـ traceback

~~~python logs.py
try:
    total = 10 / 0
except ZeroDivisionError:
    log.exception("failed to compute the ratio")
print("done")
~~~

القسمة على صفر بترمي [[ZeroDivisionError]]. و [[log.exception(...)]] جوه [[except]] بيكتب الرسالة بمستوى ERROR **ومعاها** الـ traceback كامل (الـ traceback هو السطور اللي بتقولك الغلط حصل في أنهي ملف وأنهي سطر). وبعدها السكربت بيكمّل عادي لأننا مسكنا الـ exception.

---

## ٦. التشغيل

### عادي

~~~text الناتج: python logs.py
2026-10-06 17:39:44 INFO    cleaner: deleted 12 files, freed 48.3 MB
2026-10-06 17:39:44 WARNING cleaner: skipped secret.txt: permission denied
2026-10-06 17:39:44 ERROR   cleaner: failed to compute the ratio
Traceback (most recent call last):
  File "/w/logs.py", line 16, in <module>
    total = 10 / 0
            ~~~^~~
ZeroDivisionError: division by zero
done
~~~

مفيش DEBUG لأن المستوى INFO. والسطر [[~~~^~~]] Python 3.11+ بيحطه تحت الحتة اللي وقعت بالظبط.

### النتيجة بس

~~~bash
python3 logs.py 2>/dev/null
~~~

~~~text الناتج
done
~~~

[[2>]] يعني «حوّل المخرج رقم 2 (stderr)»، و [[/dev/null]] مكان بيرمي أي حاجة تتكتب فيه. فالـ logging كله اختفى من الشاشة وفضلت النتيجة. وفي PowerShell نفس الفكرة: [[python logs.py 2>$null]]، و [[$null]] هو مكان الرمي.

### المتابعة بس، ومعاها DEBUG

~~~bash
python3 logs.py -v 2>&1 >/dev/null
~~~

بيتقري من الشمال لليمين: [[2>&1]] «ابعت stderr مكان ما stdout رايح دلوقتي» (الشاشة)، وبعدين [[>/dev/null]] «وحوّل stdout نفسه للرمي». النتيجة: الـ logging على الشاشة، و [[done]] اختفت.

~~~text الناتج
2026-10-06 17:39:44 DEBUG   cleaner: scanning /tmp/lab
2026-10-06 17:39:44 INFO    cleaner: deleted 12 files, freed 48.3 MB
2026-10-06 17:39:44 WARNING cleaner: skipped secret.txt: permission denied
2026-10-06 17:39:44 ERROR   cleaner: failed to compute the ratio
Traceback (most recent call last):
...
ZeroDivisionError: division by zero
~~~

وفي PowerShell أسهل: [[python logs.py -v > $null]] بيرمي stdout بس، و stderr بيفضل على الشاشة لوحده.

### الملف

~~~text الناتج: wc -l cleaner.log ثم head -3 cleaner.log
25 cleaner.log
2026-10-06 17:39:44 INFO    cleaner: deleted 12 files, freed 48.3 MB
2026-10-06 17:39:44 WARNING cleaner: skipped secret.txt: permission denied
2026-10-06 17:39:44 ERROR   cleaner: failed to compute the ratio
~~~

ليه 25؟ على لينكس شغّلناه ٣ مرات: مرتين عادي (٣ رسايل + ٥ سطور traceback = 8) ومرة بـ [[-v]] (9). 8 + 8 + 9 = 25. وعلى ويندوز بعد مرتين ([[(Get-Content cleaner.log).Count]]) طلع 17 = 8 + 9. الملف بيكبر مع كل تشغيلة ومش بيتمسح، فسكربت متجدول محتاج rotation ([[RotatingFileHandler]]).

---

## الخلاصة

| | [[print]] | [[logging]] |
|---|---|---|
| بيروح فين | stdout | stderr (وملف لو حطيت FileHandler) |
| فيه وقت ومستوى | لأ | أيوه |
| تخفيه من غير ما تمسح سطر | لأ | بالـ level |
| استخدمه لـ | النتيجة | كل حاجة تانية |

- الإعداد مرة واحدة في أول السكربت بـ [[basicConfig]].
- [[log.info("x=%d", n)]] مش f-string.
- [[log.exception]] جوه [[except]] عشان الـ traceback يتسجّل.`,
          lines: [
            "logging.",
            "sys.",
            "logger باسم السكربت.",
            "الإعداد في مكان واحد:",
            "الإعداد الأساسي:",
            "DEBUG لو -v، وإلا INFO.",
            "شكل كل سطر.",
            "شكل الوقت.",
            "اكتب على stderr وفي ملف.",
            "قفلة.",
            "-v موجودة؟",
            "تفاصيل، بتظهر مع -v بس.",
            "معلومة عادية.",
            "تحذير.",
            "حاول...",
            "...حاجة هتقع.",
            "مسكتها:",
            "ERROR ومعاه الـ traceback كامل.",
            "النتيجة على stdout."
          ],
          sol: R`[[2>/dev/null]]: الشاشة عليها [[done]] بس. كل الـ logging راح stderr واتشال.

[[-v 2>&1 >/dev/null]] (stderr بس، و stdout اتشال):

[[2026-10-01 16:14:22 DEBUG   cleaner: scanning /tmp/lab]]
[[2026-10-01 16:14:22 INFO    cleaner: deleted 12 files, freed 48.3 MB]]
[[2026-10-01 16:14:22 WARNING cleaner: skipped secret.txt: permission denied]]
[[2026-10-01 16:14:22 ERROR   cleaner: failed to compute the ratio]]
[[Traceback (most recent call last):]] لحد [[ZeroDivisionError: division by zero]]

والملف بعد المرتين كان 17 سطر: المرة الأولى من غير DEBUG، والتانية بيه، والاتنين فيهم الـ traceback. يعني الملف بيكبر مع كل تشغيل ومش بيتمسح.`
        },
        {
          cmd: "subprocess.run في سكربت",
          title: "سكربت بيشغّل أوامر: git pull لكل المشاريع",
          desc: R`ساعات الأداة الصح موجودة بالفعل كأمر: [[git]] و [[pg_dump]] و [[ffmpeg]] و [[rsync]]. السكربت بيلف ويشغّلها بـ [[subprocess.run]] ويقرا النتيجة.

القواعد: الأمر list ([[["git", "-C", path, "pull"] ]]) مش string، ومن غير [[shell=True]]. و [[capture_output=True, text=True]] عشان تقرا الناتج. و [[timeout]] عشان أمر معلّق ميعلّقش السكربت كله. وتفحص [[returncode]].

التفاصيل والأمان (command injection) في درس «subprocess» في تاب «Python و FastAPI». هنا سكربت حقيقي بيعمل pull لكل المشاريع في فولدر.`,
          example: R`import shutil
import subprocess
import sys
from pathlib import Path
root = Path(sys.argv[1] if len(sys.argv) > 1 else "~/code").expanduser()
if shutil.which("git") is None:
    sys.exit("error: git is not installed")
failed = []
for repo in sorted(p.parent for p in root.glob("*/.git")):
    r = subprocess.run(
        ["git", "-C", str(repo), "pull", "--ff-only"],
        capture_output=True, text=True, timeout=120,
    )
    out = (r.stdout if r.returncode == 0 else r.stderr).strip().splitlines()
    print(f"{repo.name:<10}{'ok' if r.returncode == 0 else 'FAILED':<8}{out[-1] if out else ''}")
    if r.returncode != 0:
        failed.append(repo.name)
if failed:
    sys.exit(f"failed: {', '.join(failed)}")`,
          try: R`جهّز repos تجربة بالأوامر اللي في الحل وشغّله مرتين. وبعدين عدّله: قبل الـ pull يشغّل [[git status --porcelain]]، ولو فيه تغييرات مش متعملها commit يطبع [[SKIP]] وعدد الملفات ومايعملش pull للـ repo ده.`,
          flag: "script",
          deep: {
            why: "عندك ١٥ مشروع على الجهاز أو السيرفر، وعايز تحدّثهم كلهم الصبح وتعرف مين فشل. بإيدك: cd و git pull ١٥ مرة. بالسكربت: أمر واحد وملخص.",
            how: R`[[root.glob("*/.git")]] بيلاقي كل فولدر جواه [[.git]] في مستوى واحد، و [[.parent]] الفولدر نفسه.

[[git -C path]] بيشغّل git كأنه واقف في الفولدر ده، من غير ما السكربت يعمل cd. (أو [[cwd=repo]] في subprocess.run، نفس النتيجة.)

[[--ff-only]]: pull ينجح بس لو مفيش تعارض. لو فيه commits عندك وعلى السيرفر، يفشل بدل ما يعمل merge commit أو يفتح editor يستنى حد يكتب رسالة.

[[timeout=120]]: لو git وقف يسأل عن باسورد هيقف للأبد. الأحسن كمان تمنعه يسأل: [[env={**os.environ, "GIT_TERMINAL_PROMPT": "0"}]] فيفشل على طول برسالة.

stdout و stderr منفصلين: git بيكتب الأخطاء على stderr، فالسطر الأخير من الصح بيوضح اللي حصل.

لو هتحلل الناتج نفسه (مش تعرضه بس)، استخدم الأشكال المعمولة للبرامج زي [[--porcelain]] و [[--format]]، مش الرسايل اللي للبني آدمين: دي بتتغير بين النسخ وبتتترجم حسب لغة الجهاز.`,
            when: "لما الأداة الخارجية هي الطريقة الصح. لو فيه مكتبة Python بتعمل الحاجة (shutil بدل cp، و pathlib بدل find، و requests بدل curl)، استخدمها.",
            mistakes: R`[[subprocess.run(f"cd {repo} && git pull", shell=True)]]: فولدر فيه مسافة أو [[;]] في اسمه وكارثة. وتتجاهل [[returncode]] فالسكربت يقول تمام. وتقرا رسايل git بالإنجليزي على جهاز لغته عربي. ومن غير timeout على أمر بيكلم الشبكة.`
          },
          teach: R`## السكربت ده بيعمل إيه؟

بيدوّر على كل المشاريع (git repos) جوه فولدر واحد، ويعمل [[git pull]] لكل واحد، ويطبع سطر لكل مشروع: نجح ولا فشل وآخر رسالة من git. ولو أي واحد فشل يخرج بـ exit code 1 ومعاه أسماءهم. يعني Python هنا مش بيعمل الشغل بنفسه، هو بيشغّل برنامج تاني ([[git]]) ويقرا رده.

اتشغّل على لينكس ([[python:3.13-slim]] و git 2.47) وعلى ويندوز (Python 3.14 و git 2.56)، بنفس السطور.

---

## قبل ما نبدأ: التجهيز (من الحل)

عشان نجرّب من غير ما نلمس مشاريع حقيقية، عملنا في فولدر تجربة ٢ repos «سيرفر» ونسخة من كل واحد:

~~~bash
for r in api shop; do git init -q -b main origin/$r && git -C origin/$r commit -q --allow-empty -m init && git clone -q origin/$r code/$r; done
git -C origin/api commit -q --allow-empty -m "fix login"
git -C origin/shop commit -q --allow-empty -m new && git -C code/shop commit -q --allow-empty -m local
mkdir code/notes
~~~

- [[git init -q -b main origin/api]] repo جديد اسم الـ branch فيه [[main]]، و [[-q]] (quiet) من غير كلام.
- [[commit --allow-empty]] commit من غير ملفات، أسرع طريقة نعمل تاريخ.
- [[git clone origin/api code/api]] نسخة. وبكده [[origin/api]] بيمثّل السيرفر و [[code/api]] جهازك.
- بعدها: [[api]] على «السيرفر» فيه commit جديد، فالـ pull هيمشي. و [[shop]] فيه commit هنا و commit هناك (اسمها **diverged**)، فالـ pull هيفشل. و [[notes]] فولدر عادي مش repo.

---

## ١. الفولدر، والتأكد إن git موجود

~~~python pull_all.py
import shutil
import subprocess
import sys
from pathlib import Path
root = Path(sys.argv[1] if len(sys.argv) > 1 else "~/code").expanduser()
if shutil.which("git") is None:
    sys.exit("error: git is not installed")
failed = []
~~~

- [[sys.argv[1] if len(sys.argv) > 1 else "~/code"]]: لو اتكتب فولدر بعد اسم السكربت خده، وإلا [[~/code]]. و [[expanduser()]] يفك [[~]].
- [[shutil.which("git")]] بيدوّر على البرنامج في الـ PATH زي ما الترمنال بيدوّر، ويرجّع مساره أو [[None]]. من غير الفحص ده، لو git مش متسطّب هتاخد:

~~~text الناتج: subprocess.run(["nosuchcmd"])
FileNotFoundError: [Errno 2] No such file or directory: 'nosuchcmd'
~~~

- [[failed = [] ]] list هنجمّع فيها أسماء اللي فشلوا.

---

## ٢. لقيان الـ repos

~~~python pull_all.py
for repo in sorted(p.parent for p in root.glob("*/.git")):
~~~

من جوه لبرة:

1. [[root.glob("*/.git")]] أي [[.git]] جوه أي فولدر في مستوى واحد. كل repo فيه فولدر [[.git]] مخفي.
2. [[p.parent]] الفولدر اللي فوقه: [[code/api/.git]] بيبقى [[code/api]].
3. [[(... for p in ...)]] جوه [[sorted()]] اسمه **generator expression**: لف واعمل الحاجة دي لكل عنصر. و [[sorted]] بالترتيب الأبجدي.

[[notes]] مفيهوش [[.git]] فمش هيظهر خالص.

---

## ٣. تشغيل git

~~~python pull_all.py
    r = subprocess.run(
        ["git", "-C", str(repo), "pull", "--ff-only"],
        capture_output=True, text=True, timeout=120,
    )
~~~

### الأمر نفسه: list

كل كلمة في الأمر عنصر لوحده. لو اسم الفولدر فيه مسافة أو [[;]]، بيوصل لـ git كاسم واحد وخلاص، لأن مفيش shell في النص بيفسّر الكلام. ([[str(repo)]] لأن subprocess محتاج نصوص.)

- [[git -C path]] شغّل git كأنك واقف في الفولدر ده، من غير [[cd]].
- [[pull --ff-only]] **ff** يعني fast-forward: اسحب بس لو التحديث ماشي على خط واحد. لو فيه تعارض افشل، بدل ما git يعمل merge أو يفتح editor ويستنى حد يكتب.

### الخيارات

| الخيار | معناه |
|---|---|
| [[capture_output=True]] | امسك stdout و stderr في [[r.stdout]] و [[r.stderr]] بدل ما يتطبعوا |
| [[text=True]] | رجّعهم نص مش bytes |
| [[timeout=120]] | لو مخلصش في 120 ثانية، اقفله وارمي [[TimeoutExpired]] |

الـ timeout جرّبناه على [[sleep 5]] بـ timeout ثانية:

~~~text الناتج
subprocess.TimeoutExpired: Command '['sleep', '5']' timed out after 1 seconds
~~~

### إيه اللي رجع؟

[[r]] اسمه [[CompletedProcess]]، وفيه [[returncode]] (0 نجاح، وأي رقم تاني فشل). جرّبنا على [[shop]] لوحده:

~~~text الناتج: r.returncode و r.stdout و r.stderr
128
''
hint: Diverging branches can't be fast-forwarded, you need to either:
...
fatal: Not possible to fast-forward, aborting.
~~~

git رجّع 128، و stdout فاضي، والكلام كله في stderr، وآخر سطر هو الخلاصة.

---

## ٤. سطر لكل repo

~~~python pull_all.py
    out = (r.stdout if r.returncode == 0 else r.stderr).strip().splitlines()
    print(f"{repo.name:<10}{'ok' if r.returncode == 0 else 'FAILED':<8}{out[-1] if out else ''}")
    if r.returncode != 0:
        failed.append(repo.name)
~~~

- [[(A if ok else B)]] خد stdout لو نجح، stderr لو فشل. [[.strip()]] شيل المسافات والسطور الفاضية من الأول والآخر، و [[.splitlines()]] قسّم سطور.
- [[{repo.name:<10}]] جوه f-string: [[<10]] يعني «اكتبه في 10 خانات من الشمال». كده العواميد بتبقى تحت بعض.
- [[out[-1] if out else '']] آخر سطر، أو ولا حاجة لو مفيش سطور ([[out[-1] ]] على list فاضية بيرمي IndexError).

---

## ٥. الخروج

~~~python pull_all.py
if failed:
    sys.exit(f"failed: {', '.join(failed)}")
~~~

[[', '.join(failed)]] بيلزق الأسماء بفاصلة. و [[sys.exit("نص")]] بيطبعه على stderr ويخرج بـ 1، فـ cron أو CI يعرفوا إن فيه حاجة فشلت.

---

## ٦. التشغيل

~~~text الناتج: python pull_all.py code (أول مرة)
api       ok      Fast-forward
shop      FAILED  fatal: Not possible to fast-forward, aborting.
failed: shop
~~~

و exit code 1. التشغيلة التانية [[api]] بقى [[Already up to date.]] و shop لسه FAILED.

> في Docker سطر [[failed: shop]] ظهر **قبل** باقي السطور. السبب إن stdout لما ميبقاش terminal بيتجمّع (buffered) ويتكتب في الآخر، و stderr بيتكتب على طول. في ترمنال عادي الترتيب مظبوط. ولو هتعمل pipe وعايز الترتيب: [[python -u]] أو [[print(..., flush=True)]].

---

## ٧. الحل: تخطّي اللي فيه تغييرات

~~~python pull_all.py
def git(repo: Path, *args: str) -> subprocess.CompletedProcess:
    return subprocess.run(["git", "-C", str(repo), *args], capture_output=True, text=True, timeout=120)
~~~

- [[*args]] في تعريف الدالة: اقبل أي عدد arguments واحطهم في tuple. و [[*args]] جوه الـ list: افرد العناصر مكانها. فـ [[git(repo, "pull", "--ff-only")]] بيبقى [[["git", "-C", "...", "pull", "--ff-only"] ]].

~~~python pull_all.py
    changed = git(repo, "status", "--porcelain").stdout.splitlines()
    if changed:
        print(f"{repo.name:<10}{'SKIP':<8}{len(changed)} uncommitted changes")
        continue
~~~

[[git status --porcelain]] شكل ثابت للبرامج: سطر لكل ملف متغير، ولا حاجة لو نضيف. عملنا ملف جديد في api فطلع:

~~~text الناتج: git status --porcelain
?? new.txt
~~~

([[??]] يعني ملف git مش متابعه.) فـ [[changed]] فيه سطر، والسكربت يطبع SKIP و [[continue]] (روح للـ repo اللي بعده):

~~~text الناتج
api       SKIP    1 uncommitted changes
shop      FAILED  fatal: Not possible to fast-forward, aborting.
failed: shop
~~~

و [[git log --oneline]] في api أكّد إن الـ commit الجديد ماتسحبش.

---

## الخلاصة

| القاعدة | ليه |
|---|---|
| الأمر list، من غير [[shell=True]] | أسماء فيها مسافات أو [[;]] متبوّظش ولا تتنفّذ |
| [[shutil.which]] الأول | رسالة واضحة بدل FileNotFoundError |
| [[capture_output=True, text=True]] | تقرا الرد كنص |
| [[timeout]] | أمر معلّق ميعلّقش السكربت |
| افحص [[returncode]] | subprocess مش بيرمي error لوحده لما البرنامج يفشل |
| [[--porcelain]] و [[--ff-only]] | ناتج ثابت للبرامج، ومن غير أسئلة |`,
          lines: [
            "عشان تتأكد إن git موجود.",
            "subprocess.",
            "sys.",
            "Path.",
            "الفولدر اللي فيه المشاريع.",
            "git مش متسطّب؟",
            "رسالة واضحة بدل FileNotFoundError.",
            "المشاريع اللي فشلت.",
            "كل فولدر جواه .git:",
            "شغّل:",
            "list: البرنامج وكل argument لوحده.",
            "امسك الناتج كنص، وأقصى وقت دقيقتين.",
            "قفلة.",
            "سطور stdout لو نجح، أو stderr لو فشل.",
            "الاسم والحالة وآخر سطر.",
            "فشل؟",
            "سجّله.",
            "لو فيه فشل:",
            "اخرج بـ 1 ومعاك أسماءهم."
          ],
          sol: R`بعد ما جهزت repo اسمه [[api]] فيه commit جديد على الـ origin، و [[shop]] فيه commit هنا و commit هناك (diverged)، و [[notes]] فولدر عادي:

[[api       ok      Fast-forward]]
[[shop      FAILED  fatal: Not possible to fast-forward, aborting.]]
[[failed: shop]] و exit 1.

المرة التانية [[api]] بقى [[Already up to date.]] و shop لسه FAILED. و [[notes]] ماظهرش لأنه مش repo.

بعد التعديل، ومع ملف جديد في api و commit جديد على الـ origin:

[[api       SKIP    1 uncommitted changes]]
[[shop      FAILED  fatal: Not possible to fast-forward, aborting.]]

و [[git log]] في api اتأكدت إنه ماتحدّثش. (جربته على لينكس بـ git 2.47، وعلى ويندوز بالتجهيز بتاع PowerShell اللي في الحل وطلع نفس السطور.)`,
          solCode: R`# setup (في فولدر تجربة):
#   for r in api shop; do git init -q -b main origin/$r && git -C origin/$r commit -q --allow-empty -m init && git clone -q origin/$r code/$r; done
#   git -C origin/api commit -q --allow-empty -m "fix login"
#   git -C origin/shop commit -q --allow-empty -m new && git -C code/shop commit -q --allow-empty -m local
# نفس التجهيز في PowerShell:
#   foreach ($r in "api", "shop") { git init -q -b main origin/$r; git -C origin/$r commit -q --allow-empty -m init; git clone -q origin/$r code/$r }
#   git -C origin/api commit -q --allow-empty -m "fix login"
#   git -C origin/shop commit -q --allow-empty -m new; git -C code/shop commit -q --allow-empty -m local
import shutil
import subprocess
import sys
from pathlib import Path
def git(repo: Path, *args: str) -> subprocess.CompletedProcess:
    return subprocess.run(["git", "-C", str(repo), *args], capture_output=True, text=True, timeout=120)
root = Path(sys.argv[1] if len(sys.argv) > 1 else "~/code").expanduser()
if shutil.which("git") is None:
    sys.exit("error: git is not installed")
failed = []
for repo in sorted(p.parent for p in root.glob("*/.git")):
    changed = git(repo, "status", "--porcelain").stdout.splitlines()
    if changed:
        print(f"{repo.name:<10}{'SKIP':<8}{len(changed)} uncommitted changes")
        continue
    r = git(repo, "pull", "--ff-only")
    out = (r.stdout if r.returncode == 0 else r.stderr).strip().splitlines()
    print(f"{repo.name:<10}{'ok' if r.returncode == 0 else 'FAILED':<8}{out[-1] if out else ''}")
    if r.returncode != 0:
        failed.append(repo.name)
if failed:
    sys.exit(f"failed: {', '.join(failed)}")`
        },
        {
          cmd: "os.environ و .env",
          title: "الأسرار والإعدادات من البيئة مش من الكود",
          desc: R`توكن API أو باسورد إيميل مكتوب جوه السكربت هيوصل git، وهيتبعت لأي حد بتبعتله السكربت. المكان الصح متغيرات البيئة: [[os.environ.get("API_TOKEN")]].

وعشان متكتبش [[export]] كل مرة، ملف [[.env]] جنب السكربت فيه [[API_TOKEN=...]]، ومكتبة [[python-dotenv]] بتحمّله في [[os.environ]] بسطر واحد. والملف ده في [[.gitignore]] دايمًا.`,
          example: R`import os
import sys
from dotenv import load_dotenv
load_dotenv()
API_URL = os.environ.get("API_URL", "http://localhost:8000")
DEBUG = os.environ.get("DEBUG", "0").lower() in ("1", "true", "yes")
TIMEOUT = float(os.environ.get("TIMEOUT", "10"))
token = os.environ.get("API_TOKEN")
if not token:
    sys.exit("error: API_TOKEN is not set (put it in .env or export it)")
print(API_URL, DEBUG, TIMEOUT, token[:4] + "...")`,
          try: R`[[pip install python-dotenv]] في venv، واعمل [[.env]] فيه [[API_URL=https://api.example.com]] و [[API_TOKEN=sk_live_abc123]] و [[DEBUG=true]]. شغّل السكربت. وبعدين [[API_URL=http://staging DEBUG=0 python envs.py]]. وبعدين غيّر اسم [[.env]] وشغّله. ورجّعه وشغّل السكربت من فولدر تاني بمساره الكامل. وفي الآخر [[DEBUG=false python3 -c 'import os; print(bool(os.environ["DEBUG"]))']].

الـ [[NAME=value command]] ده شكل bash. في PowerShell مفيش متغير لأمر واحد: [[$env:API_URL="http://staging"; $env:DEBUG="0"; python envs.py]]، وبعدها [[Remove-Item Env:API_URL, Env:DEBUG]] عشان ميفضلوش في الترمنال ده.`,
          flag: "script",
          deep: {
            why: R`نفس السكربت بيشتغل على جهازك (API تجربة) وعلى السيرفر (API حقيقي) من غير ما تعدّل سطر، والأسرار عمرها ما تدخل git. وأي حد بيقرا الكود يعرف السكربت محتاج إيه من الأسماء.`,
            how: R`[[os.environ]] dict فيه متغيرات البيئة، والقيم كلها نصوص. [[get(name, default)]] للاختياري، والإجباري تفحصه في الأول وتخرج برسالة واضحة بدل [[KeyError]] في نص الشغل.

الـ bool: [[bool("false")]] بـ True لأن أي نص مش فاضي True. فلازم تقارن بقايمة زي المثال. والأرقام [[int()]] أو [[float()]].

[[load_dotenv()]] بيدوّر على [[.env]] من فولدر السكربت ولفوق، وبيحمّل اللي فيه في [[os.environ]]. وأي متغير موجود فعلًا في البيئة بيكسب على اللي في الملف (إلا لو [[override=True]])، فتقدر تغيّر قيمة لتشغيلة واحدة من الترمنال.

[[.env]] في .gitignore، وجنبه [[.env.example]] فيه الأسماء من غير القيم وده اللي يدخل git.

من غير dotenv: لينكس وماك [[export API_TOKEN=...]] أو [[API_TOKEN=... python3 script.py]] لتشغيلة واحدة. PowerShell [[$env:API_TOKEN="..."]]. CMD [[set API_TOKEN=...]].

لتطبيقات أكبر (FastAPI مثلًا) [[pydantic-settings]] بيقرا ويتحقق من الأنواع (درس «pydantic-settings» في تاب «Python و FastAPI»).`,
            when: "أي توكن أو باسورد أو URL بيختلف بين جهازك والسيرفر.",
            mistakes: R`commit لـ [[.env]] (ولو اتعمل، غيّر التوكن نفسه، مسحه من git مش كفاية). وطباعة التوكن كامل في log. و [[bool(os.environ["DEBUG"])]]. وسكربت في cron مش لاقي المتغيرات لأنها في [[~/.bashrc]]، و cron مبيقراهوش.`
          },
          teach: R`## السكربت ده بيعمل إيه؟

بيقرا ٤ إعدادات من **متغيرات البيئة** (environment variables) بدل ما تكون مكتوبة في الكود: عنوان API، و DEBUG، و timeout، وتوكن سرّي. ولو التوكن مش موجود يخرج برسالة واضحة. وملف [[.env]] جنب السكربت بيملا المتغيرات دي لوحده.

اتشغّل على لينكس ([[python:3.13-slim]]) وعلى ويندوز (Python 3.14)، و python-dotenv 1.2.4 في الاتنين.

---

## ١. يعني إيه متغيرات البيئة؟

كل برنامج بيشتغل معاه لستة [[NAME=value]] جاية من الترمنال اللي شغّله: [[PATH]] و [[HOME]] و [[USERNAME]] وغيرهم. وتقدر تزوّد عليها. الميزة إن نفس السكربت بيشتغل بقيم مختلفة على جهازك وعلى السيرفر من غير ما تغيّر سطر، والأسرار مش في الكود فمش هتوصل git.

---

## ٢. ملف [[.env]]

~~~text .env
API_URL=https://api.example.com
API_TOKEN=sk_live_abc123
DEBUG=true
~~~

سطر لكل متغير، من غير مسافات حوالين [[=]]. الملف ده لازم في [[.gitignore]].

---

## ٣. التحميل

~~~python envs.py
import os
import sys
from dotenv import load_dotenv
load_dotenv()
~~~

- [[os]] فيه [[os.environ]]: المتغيرات كلها كـ dict تقريبًا (نوعه [[os._Environ]]).
- [[dotenv]] من package اسمها [[python-dotenv]] ([[pip install python-dotenv]] في venv). الاسمين مختلفين، زي pyyaml.
- [[load_dotenv()]] بيدوّر على [[.env]] **جنب الملف اللي ناداه** وبعدين الفولدرات اللي فوقه، ويحط اللي فيه في [[os.environ]]. وأي متغير موجود فعلًا بيكسب على الملف.

---

## ٤. قراية كل نوع

### نص اختياري

~~~python envs.py
API_URL = os.environ.get("API_URL", "http://localhost:8000")
~~~

[[.get(name, default)]] لو المتغير مش موجود رجّع القيمة التانية. ولو كتبت [[os.environ["NOPE"] ]] لمتغير مش موجود:

~~~text الناتج
KeyError: 'NOPE'
~~~

### bool

~~~python envs.py
DEBUG = os.environ.get("DEBUG", "0").lower() in ("1", "true", "yes")
~~~

كل القيم في البيئة **نصوص**. فـ [[.lower()]] حروف صغيرة ([[TRUE]] تبقى [[true]])، و [[in (...)]] هل هي واحدة من دول؟ ليه مش [[bool(...)]] على طول؟ جرّبنا:

~~~bash
DEBUG=false python3 -c 'import os; print(bool(os.environ["DEBUG"]))'
~~~

~~~text الناتج
True
~~~

[[bool]] على أي نص مش فاضي بيدّي True، حتى [["false"]].

### رقم

~~~python envs.py
TIMEOUT = float(os.environ.get("TIMEOUT", "10"))
~~~

[[float()]] حوّل النص لرقم. ولو حد كتب [[TIMEOUT=abc]]:

~~~text الناتج
ValueError: could not convert string to float: 'abc'
~~~

### سرّ إجباري

~~~python envs.py
token = os.environ.get("API_TOKEN")
if not token:
    sys.exit("error: API_TOKEN is not set (put it in .env or export it)")
print(API_URL, DEBUG, TIMEOUT, token[:4] + "...")
~~~

- [[.get]] من غير default بترجّع [[None]] لو مش موجود. و [[not token]] صح لو [[None]] أو نص فاضي.
- الفحص في **أول** السكربت، فيفشل قبل ما يعمل أي حاجة، ورسالته بتقولك تحطه فين.
- [[token[:4] ]] أول ٤ حروف بس (اسمها **slicing**). التوكن عمره ما يتطبع كامل.

---

## ٥. التشغيل

| الحالة | الناتج |
|---|---|
| [[.env]] موجود | [[https://api.example.com True 10.0 sk_l...]] |
| متغيرات من الترمنال فوق الـ .env | [[http://staging False 10.0 sk_l...]] |
| من غير [[.env]] | [[error: API_TOKEN is not set (put it in .env or export it)]] و exit 1 |
| من فولدر تاني بالمسار الكامل | زي السطر الأول |

### متغير لتشغيلة واحدة

في bash تحطه قبل الأمر على طول، وبيخص الأمر ده بس:

~~~bash
API_URL=http://staging DEBUG=0 python envs.py
~~~

في PowerShell مفيش الشكل ده، فبتحطه في الترمنال وتشيله بعدين:

~~~powershell
$env:API_URL="http://staging"; $env:DEBUG="0"; python envs.py
Remove-Item Env:API_URL, Env:DEBUG
~~~

[[$env:NAME]] متغير بيئة في الجلسة دي بس، و [[Env:]] «الدرايف» بتاع المتغيرات، فـ [[Remove-Item]] بيمسحهم منه. على ويندوز طلع نفس الأربع حالات.

وفي الحالتين المتغير اللي في الترمنال **كسب** على اللي في [[.env]]، لأن [[load_dotenv]] مش بيغيّر متغير موجود (إلا لو [[override=True]]).

### من فولدر تاني

شغّلناه من [[/]] بـ [[python /w/proj/envs.py]] و [[.env]] جوه [[/w/proj]]: لقاه، لأن [[load_dotenv]] بيدوّر جنب السكربت مش في الفولدر الحالي.

---

## الخلاصة

| النوع | الطريقة |
|---|---|
| نص اختياري | [[os.environ.get("X", "default")]] |
| bool | [[.lower() in ("1", "true", "yes")]]، مش [[bool()]] |
| رقم | [[int()]] أو [[float()]] |
| إجباري | [[get]] وافحصه في الأول و [[sys.exit]] برسالة |

- [[.env]] في [[.gitignore]]، وجنبه [[.env.example]] بالأسماء من غير القيم.
- متغيرات الترمنال بتكسب على [[.env]].
- cron مش بيقرا [[~/.bashrc]]، فخلّي السكربت يقرا [[.env]] جنبه.`,
          lines: [
            "os.",
            "sys.",
            "pip install python-dotenv.",
            "حمّل .env في os.environ.",
            "اختياري بقيمة افتراضية.",
            "bool من نص.",
            "رقم من نص.",
            "إجباري:",
            "مش موجود؟",
            "اخرج برسالة بتقول تحطه فين.",
            "اطبع، والتوكن مقصوص."
          ],
          sol: R`الناتج بالترتيب:

[[https://api.example.com True 10.0 sk_l...]]: من .env.
[[http://staging False 10.0 sk_l...]]: متغيرات الترمنال كسبت على .env.
من غير .env: [[error: API_TOKEN is not set (put it in .env or export it)]] و exit 1.
من فولدر تاني بالمسار الكامل: نفس السطر الأول. [[load_dotenv]] دوّر جنب السكربت مش في الفولدر الحالي.

و [[bool(os.environ["DEBUG"])]] مع [[DEBUG=false]] طبع [[True]].`,
          solCode: R`# .env  (ضيفه في .gitignore)
API_URL=https://api.example.com
API_TOKEN=sk_live_abc123
DEBUG=true`
        },
        {
          cmd: "requests و urllib مع timeout",
          title: "HTTP من سكربت: JSON وتحميل ملفات",
          desc: R`سكربتات كتير بتكلم الإنترنت: تجيب JSON من API، أو تحمّل ملف، أو تشيّك إن موقع شغال. فيه طريقتين:

[[urllib.request]] في المكتبة الأساسية، فالسكربت بيشتغل على أي سيرفر من غير pip.
[[requests]] ([[pip install requests]]) أسهل بكتير: [[r.json()]] و [[raise_for_status()]] و [[stream=True]] للملفات الكبيرة.

وفي الاتنين: [[timeout]] دايمًا. من غيره، سيرفر مش بيرد هيخلي السكربت مستني للأبد.`,
          example: R`import json
import urllib.error
import urllib.request
from pathlib import Path
import requests
BASE = "http://localhost:8000"
with urllib.request.urlopen(f"{BASE}/data.json", timeout=5) as r:
    print(r.status, json.load(r))
try:
    urllib.request.urlopen(f"{BASE}/missing", timeout=5)
except urllib.error.HTTPError as e:
    print("urllib:", e.code, e.reason)
r = requests.get(f"{BASE}/data.json", timeout=5)
r.raise_for_status()
print(r.status_code, r.json()["name"], r.headers["Content-Type"])
r = requests.get(f"{BASE}/missing", timeout=5)
print(r.status_code, r.ok)
with requests.get(f"{BASE}/big.bin", stream=True, timeout=(3, 30)) as r:
    r.raise_for_status()
    with open("big.bin", "wb") as f:
        for chunk in r.iter_content(chunk_size=64 * 1024):
            f.write(chunk)
print("downloaded", f"{Path('big.bin').stat().st_size:,}", "bytes")
try:
    requests.get("http://10.255.255.1", timeout=2)
except requests.RequestException as e:
    print("failed:", type(e).__name__)`,
          try: R`جهّز سيرفر محلي: [[mkdir www && echo '{"name": "terminal-study", "version": 3}' > www/data.json && head -c 3000000 /dev/urandom > www/big.bin]] وبعدين [[python3 -m http.server 8000 --directory www]] في ترمنال تاني (درس «python -m http.server»). سطّب requests في venv وشغّل السكربت، وقيس وقته بـ [[time]].

على ويندوز PowerShell: [[mkdir www]]، و [['{"name": "terminal-study", "version": 3}' | Set-Content www/data.json]]، و [[python -c "open('www/big.bin','wb').write(bytes(3000000))"]] (3 مليون byte أصفار)، والوقت بـ [[Measure-Command { python fetch.py }]] (fetch.py اسم السكربت عندك).`,
          flag: "script",
          deep: {
            why: R`سكربت بيسحب أسعار أو بيانات كل ساعة، وفي مرة السيرفر التاني علّق: من غير timeout السكربت بيفضل مستني، والتشغيلة اللي بعدها بتبدأ جنبه، وبعد يومين عندك ٤٨ نسخة معلّقة.`,
            how: R`urllib: [[urlopen]] بيرجّع response بتقرا منه، و [[json.load(r)]] بيقرا ويحوّل. وأي status من 400 لفوق بيرمي [[HTTPError]] (فيه [[code]] و [[reason]])، ومشاكل الاتصال (DNS، connection refused) بترمي [[URLError]].

requests: مش بيرمي على 404 لوحده. [[r.ok]] و [[r.status_code]] تفحصهم بنفسك، أو [[raise_for_status()]] يرمي [[HTTPError]]. و [[r.json()]] بيرمي لو الرد مش JSON (صفحة error بـ HTML مثلًا).

[[timeout=5]] في requests مش «أقصى وقت للطلب كله»: ده وقت الاتصال، ووقت أقصى بين أي حتتين بيانات. و [[timeout=(3, 30)]] اتصال 3 ثواني وقراية 30. ومن غير timeout خالص، requests بيستنى للأبد.

[[stream=True]] و [[iter_content]]: الملف بيتكتب حتة حتة (64KB هنا) بدل ما 3GB يتحمّلوا في الذاكرة.

[[requests.RequestException]] أبو كل الأخطاء (Timeout و ConnectionError و HTTPError)، فـ except واحد بيمسكهم.

ولو هتبعت طلبات كتير لنفس الموقع: [[requests.Session()]] بيعيد استخدام الاتصال وبيحط headers مشتركة. ولو محتاج async أو HTTP/2، [[httpx]] (درس «httpx.AsyncClient» في تاب «Python و FastAPI»). والمحاولات التانية لما الطلب يفشل في درس «retry و backoff» في المستوى ٣.`,
            when: "urllib لسكربت صغير على سيرفر من غير venv. requests لأي حاجة أكبر من طلب أو اتنين.",
            mistakes: R`من غير timeout. و [[r.json()]] من غير ما تشيّك الـ status. و [[r.content]] لملف كبير فالذاكرة تخلص. ومواقع بترفض User-Agent بتاع urllib الافتراضي ([[Python-urllib/3.12]]) بـ 403، فحط User-Agent واضح باسم السكربت. وعلى ويندوز: سيرفر سامع على [[127.0.0.1]] بس (زي [[--bind 127.0.0.1]]) وانت بتكلّم [[localhost]]، ويندوز بيجرب [[::1]] الأول ويستنى ثانيتين قبل ما يرجع لـ 127.0.0.1، في كل طلب.`
          },
          teach: R`## السكربت ده بيعمل إيه؟

بيكلّم سيرفر محلي بطريقتين: [[urllib]] اللي جاية مع Python، و [[requests]] اللي بتتسطّب. بيجيب JSON، ويطلب صفحة مش موجودة عشان نشوف كل طريقة بتتصرف إزاي، ويحمّل ملف 3MB حتة حتة، وفي الآخر يكلّم عنوان مش بيرد عشان نشوف الـ timeout.

اتشغّل على لينكس ([[python:3.13-slim]]، requests 2.34.2) وعلى ويندوز (Python 3.14)، بنفس الست سطور.

---

## ١. السيرفر المحلي

~~~bash
mkdir www && echo '{"name": "terminal-study", "version": 3}' > www/data.json && head -c 3000000 /dev/urandom > www/big.bin
python3 -m http.server 8000 --directory www
~~~

- [[head -c 3000000 /dev/urandom]] أول 3 مليون byte من [[/dev/urandom]] (مصدر bytes عشوائية في لينكس): ملف كبير للتجربة.
- [[python3 -m http.server 8000 --directory www]] سيرفر بيعرض ملفات فولدر [[www]] على بورت 8000. بيفضل شغال، فشغّله في ترمنال تاني.

على ويندوز: [[python -c "open('www/big.bin','wb').write(bytes(3000000))"]]، و [[bytes(3000000)]] يعني 3 مليون byte كلهم صفر.

---

## ٢. الاستيراد

~~~python fetch.py
import json
import urllib.error
import urllib.request
from pathlib import Path
import requests
BASE = "http://localhost:8000"
~~~

[[urllib.request]] للطلبات و [[urllib.error]] لأخطاءها، الاتنين في المكتبة الأساسية. و [[requests]] محتاجة [[pip install requests]] في venv. و [[BASE]] عنوان السيرفر في مكان واحد.

---

## ٣. urllib: JSON

~~~python fetch.py
with urllib.request.urlopen(f"{BASE}/data.json", timeout=5) as r:
    print(r.status, json.load(r))
~~~

- [[urlopen(url, timeout=5)]] ابعت طلب GET، ولو مفيش رد في 5 ثواني ارمي error.
- [[with ... as r]] الاتصال يتقفل لوحده في الآخر.
- [[r.status]] كود الرد: **200** يعني تمام. و [[json.load(r)]] اقرا الرد وحوّله dict.

~~~text الناتج
200 {'name': 'terminal-study', 'version': 3}
~~~

---

## ٤. urllib: صفحة مش موجودة

~~~python fetch.py
try:
    urllib.request.urlopen(f"{BASE}/missing", timeout=5)
except urllib.error.HTTPError as e:
    print("urllib:", e.code, e.reason)
~~~

urllib بيرمي [[HTTPError]] لأي كود من 400 لفوق. **404** يعني مش موجود. و [[e.code]] الرقم و [[e.reason]] الكلام.

~~~text الناتج
urllib: 404 File not found
~~~

ولو السيرفر نفسه مش شغال، الخطأ بيبقى [[URLError]] مش [[HTTPError]]:

~~~text الناتج: urlopen على بورت مفيهوش حاجة
URLError [Errno 111] Connection refused
~~~

---

## ٥. requests: نفس الطلب

~~~python fetch.py
r = requests.get(f"{BASE}/data.json", timeout=5)
r.raise_for_status()
print(r.status_code, r.json()["name"], r.headers["Content-Type"])
~~~

- [[requests.get(url, timeout=5)]] طلب GET.
- [[raise_for_status()]] ارمي [[HTTPError]] لو الكود 400 أو أكتر، ومتعملش حاجة لو تمام.
- [[r.status_code]] الكود، و [[r.json()]] الرد كـ dict على طول، و [[r.headers]] الـ headers (معلومات عن الرد)، و [[Content-Type]] نوع المحتوى.

~~~text الناتج
200 terminal-study application/json
~~~

---

## ٦. requests: صفحة مش موجودة

~~~python fetch.py
r = requests.get(f"{BASE}/missing", timeout=5)
print(r.status_code, r.ok)
~~~

~~~text الناتج
404 False
~~~

الفرق المهم: requests **مش** بيرمي على 404. [[r.ok]] بـ False وبس، والسكربت هيكمّل لو مفحصتش. ولو ناديت [[raise_for_status()]]:

~~~text الناتج
404 Client Error: File not found for url: http://localhost:8000/missing
~~~

ولو ناديت [[r.json()]] على صفحة الـ error (اللي هي HTML) بيرمي [[JSONDecodeError]].

---

## ٧. تحميل ملف كبير

~~~python fetch.py
with requests.get(f"{BASE}/big.bin", stream=True, timeout=(3, 30)) as r:
    r.raise_for_status()
    with open("big.bin", "wb") as f:
        for chunk in r.iter_content(chunk_size=64 * 1024):
            f.write(chunk)
print("downloaded", f"{Path('big.bin').stat().st_size:,}", "bytes")
~~~

- [[stream=True]] متحمّلش الرد كله في الذاكرة دلوقتي.
- [[timeout=(3, 30)]] tuple: 3 ثواني للاتصال، و 30 ثانية أقصى سكوت بين أي حتتين بيانات (مش مدة التحميل كله).
- [[open("big.bin", "wb")]] [[w]] كتابة و [[b]] binary (bytes مش نص).
- [[iter_content(chunk_size=64 * 1024)]] هات الرد حتة حتة، كل حتة 64KB، واكتبها على طول. كده ملف 3GB مش هياكل 3GB رام.
- [[{...:,}]] في f-string بيحط فاصلة كل ٣ أرقام.

~~~text الناتج
downloaded 3,000,000 bytes
~~~

---

## ٨. عنوان مش بيرد

~~~python fetch.py
try:
    requests.get("http://10.255.255.1", timeout=2)
except requests.RequestException as e:
    print("failed:", type(e).__name__)
~~~

[[10.255.255.1]] عنوان في شبكة خاصة مفيش حاجة بترد عليه، فالطلب بيستنى. و [[timeout=2]] بيقطعه بعد ثانيتين. و [[RequestException]] الأب بتاع كل أخطاء requests، و [[type(e).__name__]] اسم الخطأ الفعلي:

~~~text الناتج
failed: ConnectTimeout
~~~

ولو بورت مقفول على جهازك (مش عنوان ساكت) بيطلع [[ConnectionError]] على طول من غير ما يستنى.

---

## ٩. الوقت

على لينكس [[time python fetch.py]] طلع [[real 0m2.185s]]: تقريبًا كله الـ timeout بتاع آخر طلب. وعلى ويندوز [[Measure-Command]] طلع 2.56 ثانية.

> وعلى ويندوز لما شغّلنا السيرفر بـ [[--bind 127.0.0.1]] (IPv4 بس) والسكربت بيكلّم [[localhost]]، الوقت بقى 12.5 ثانية: ويندوز بيجرّب [[::1]] (IPv6) الأول ويستنى ثانيتين قبل ما يرجع لـ [[127.0.0.1]]، في كل طلب من الخمسة. الحل تكتب [[127.0.0.1]] في [[BASE]] أو تسيب السيرفر على الافتراضي.

---

## الخلاصة

| | urllib | requests |
|---|---|---|
| التسطيب | مع Python | [[pip install requests]] |
| 404 | بيرمي [[HTTPError]] | مش بيرمي: [[r.ok]] أو [[raise_for_status()]] |
| JSON | [[json.load(r)]] | [[r.json()]] |
| ملف كبير | [[shutil.copyfileobj(r, f)]] | [[stream=True]] و [[iter_content]] |
| كل الأخطاء | [[URLError]] (و HTTPError ابنه) | [[RequestException]] |

- [[timeout]] في **كل** طلب، في الاتنين.
- [[raise_for_status()]] قبل ما تقرا الرد.`,
          lines: [
            "json.",
            "أخطاء urllib.",
            "urllib.",
            "Path.",
            "pip install requests.",
            "عنوان السيرفر.",
            "اطلب، ومهلة 5 ثواني.",
            "الـ status والـ JSON.",
            "حاول...",
            "...تطلب صفحة مش موجودة.",
            "urllib بيرمي على 404:",
            "الكود والسبب.",
            "نفس الطلب بـ requests.",
            "ارمي لو status غلط.",
            "الـ status، وحقل من الـ JSON، وheader.",
            "404 بـ requests...",
            "...مش بيرمي، بتفحص بنفسك.",
            "تحميل ملف كبير حتة حتة، اتصال 3 ثواني وقراية 30.",
            "ارمي لو status غلط.",
            "افتح ملف binary.",
            "لف على الحتت (64KB).",
            "اكتب.",
            "حجم اللي اتحمّل.",
            "حاول...",
            "...تكلم IP مش بيرد.",
            "أي خطأ في requests:",
            "اسم الخطأ."
          ],
          sol: R`الناتج:

[[200 {'name': 'terminal-study', 'version': 3}]]
[[urllib: 404 File not found]]
[[200 terminal-study application/json]]
[[404 False]]
[[downloaded 3,000,000 bytes]]
[[failed: ConnectTimeout]]

و [[time]] قال حوالي 2.2 ثانية، تقريبًا كلهم الـ timeout بتاع آخر طلب. من غير [[timeout=2]] كان هيستنى لحد ما النظام نفسه يستسلم (دقيقتين أو أكتر على لينكس).

وعلى ويندوز نفس الست سطور بالظبط في 2.3 ثانية والسيرفر سامع على IPv6 ([[--bind ::1]]). بس لما شغّلته بـ [[--bind 127.0.0.1]] والسكربت بيكلّم [[localhost]]، الوقت بقى 12.5 ثانية: كل طلب من الخمسة خد ثانيتين زيادة (شوف «غلطات شائعة»).

لو طلع [[ConnectionError]] أو [[Connection refused]] في أول طلب، السيرفر المحلي مش شغال أو على بورت تاني. ولو [[ModuleNotFoundError: No module named 'requests']] يبقى الـ venv مش متفعّل.`
        },
        {
          cmd: "re في السكربتات",
          title: "طلّع أرقام وإيميلات من ملفات بـ regex",
          desc: R`[[re]] بيدوّر على أشكال في النص: أرقام تليفونات، إيميلات، تواريخ، أكواد. في السكربتات استخدامه الأشهر إنك تطلّع حاجة من ملفات كتير، أو تنضّف نص.

الطريقة اللي بتشتغل مع بيانات حقيقية: خطوتين. regex واسع يلقط كل حاجة شكلها رقم، وبعدين دالة تنضّف (تشيل المسافات والشرط) وتتأكد بـ regex صارم. regex واحد عملاق بيحاول يعمل الاتنين بيبقى صعب يتقري وبيفوّت حالات.

أساسيات re (groups و findall و sub) في درس «re» في تاب «Python و FastAPI».`,
          example: R`import re
import sys
from pathlib import Path
CANDIDATE = re.compile(r"\+?\d[\d\s-]{8,15}\d")
MOBILE = re.compile(r"01[0125]\d{8}")
EMAIL = re.compile(r"[\w.+-]+@[\w-]+(?:\.[\w-]+)+")
def normalize(raw: str) -> str | None:
    digits = re.sub(r"\D", "", raw)
    if digits.startswith("20"):
        digits = "0" + digits[2:]
    return digits if MOBILE.fullmatch(digits) else None
phones, emails = set(), set()
for path in sorted(Path(sys.argv[1] if len(sys.argv) > 1 else ".").rglob("*.txt")):
    text = path.read_text(encoding="utf-8", errors="replace")
    phones.update(p for p in map(normalize, CANDIDATE.findall(text)) if p)
    emails.update(e.lower() for e in EMAIL.findall(text))
print(sorted(phones))
print(sorted(emails))
print(re.sub(r"\s+", " ", "  كلام    فيه   مسافات  ").strip())`,
          try: R`اعمل فولدر [[inbox]] فيه ملفين: الأول فيه [[01012345678]] و [[Sara.Ali@Example.com]] و [[+20 112 345 6789]]، والتاني فيه [[omar@shop.eg]] و [[0122-555-1234]] و [[0101234]] (ناقص) و [[12345678901234]] (طويل) و [[010 1234 5678]] (نفس أول رقم بمسافات). شغّل السكربت. وبعدين عدّله يطبع كل رقم ومعاه أسماء الملفات اللي ظهر فيها.`,
          flag: "script",
          deep: {
            why: R`عندك ٢٠٠ رسالة أو ملف export من نظام قديم وعايز لستة أرقام العملاء من غير تكرار. الأرقام مكتوبة بكل الأشكال: بمسافات، بشرط، بـ +20، من غير. بإيدك ساعات، والسكربت ثانية.`,
            how: R`[[r"..."]] raw string: الـ [[\d]] توصل لـ re زي ما هي من غير ما Python يفهمها escape. اكتب كل الـ patterns كده.

[[re.compile]] مرة واحدة بره الـ loop، واسم واضح للـ pattern.

[[CANDIDATE]]: [[\+?]] علامة + اختيارية، و [[\d]] رقم، و [[[\d\s-]{8,15}]] من 8 لـ 15 رقم أو مسافة أو شرطة، وآخره رقم. واسع قصد.

[[normalize]]: [[re.sub(r"\D", "", raw)]] بيشيل أي حاجة مش رقم. لو بادئ بـ [[20]] (كود مصر) بيبقى [[0]]. و [[MOBILE.fullmatch]] لازم النص كله يطابق: [[01]] وبعدها [[0]] أو [[1]] أو [[2]] أو [[5]] وبعدها 8 أرقام بالظبط. أي حاجة تانية None.

[[findall]] من غير groups بيرجّع النص اللي طابق كله. لو فيه groups بيرجّع الـ groups بس، فـ [[(?:...)]] group مش بيتحسب، زي ما في EMAIL.

[[set]] بيشيل التكرار لوحده، و [[e.lower()]] عشان [[Sara@X.com]] و [[sara@x.com]] واحد.

[[\s+]] أي عدد مسافات أو tabs أو سطور، و [[re.sub]] بيبدّلهم بمسافة واحدة.`,
            when: "تطلّع أو تتأكد من أشكال في نص. ولو الملف ليه شكل معروف (JSON و CSV و HTML)، استخدم الـ parser بتاعه مش regex.",
            mistakes: R`[["\d"]] من غير r. والنقطة من غير escape في الإيميل ([[.]] يعني أي حرف). و [[search]] بدل [[fullmatch]] في التحقق فـ [[0101234567899999]] يعدّي. و [[.*]] greedy بياكل أكتر من اللازم. و regex للـ HTML.`
          },
          teach: R`## السكربت ده بيعمل إيه؟

بيلف على كل ملفات [[.txt]] في فولدر (وجوه الفولدرات اللي جواه)، ويطلّع منها أرقام الموبايل المصرية والإيميلات، من غير تكرار ومترتبة. والأرقام مكتوبة بأشكال كتير، فالسكربت بيوحّدها على شكل واحد.

**regex** (regular expression) لغة صغيرة توصف بيها **شكل** نص: «حرفين وبعدهم ٨ أرقام» مثلًا. و [[re]] موديول Python ليها.

اتشغّل على لينكس ([[python:3.13-slim]]) وعلى ويندوز (Python 3.14) بنفس الناتج.

---

## ١. ملفات التجربة

~~~text inbox/msg1.txt
كلمني على 01012345678 أو ابعت Sara.Ali@Example.com
أو +20 112 345 6789
~~~

~~~text inbox/msg2.txt
omar@shop.eg
رقمي 0122-555-1234 والقديم 0101234
كود 12345678901234
و 010 1234 5678
~~~

فيهم رقم ناقص ([[0101234]])، ورقم طويل مش موبايل، ونفس أول رقم مكتوب بمسافات.

---

## ٢. الـ patterns التلاتة

~~~python extract.py
import re
import sys
from pathlib import Path
CANDIDATE = re.compile(r"\+?\d[\d\s-]{8,15}\d")
MOBILE = re.compile(r"01[0125]\d{8}")
EMAIL = re.compile(r"[\w.+-]+@[\w-]+(?:\.[\w-]+)+")
~~~

### الأول: [[r"..."]]

[[r]] قبل النص يعني **raw string**: الـ backslash يفضل backslash. من غيرها Python بيحاول يفهم [[\d]] كـ escape، و 3.12+ بيطلع تحذير:

~~~text الناتج
SyntaxWarning: invalid escape sequence '\d'
~~~

والأخطر [[\b]]: في نص عادي بقت حرف تاني خالص ([['\x08']] حرف الـ backspace)، وفي raw string فضلت [['\\b']] اللي re محتاجها.

### [[re.compile]]

بيحوّل الـ pattern لـ object جاهز مرة واحدة بره الـ loop، وبيديله اسم يوضح هو بيدوّر على إيه.

### [[CANDIDATE]]: واسع قصد

| الحتة | معناها |
|---|---|
| [[\+?]] | علامة [[+]] (بالـ backslash عشان [[+]] لوحدها ليها معنى في regex)، و [[?]] يعني اختيارية |
| [[\d]] | رقم واحد (digit) |
| [[[\d\s-]{8,15}]] | من 8 لـ 15 حرف، كل واحد يا رقم يا مسافة ([[\s]]) يا شرطة |
| [[\d]] | ويخلص برقم |

يعني «أي حاجة شكلها رقم تليفون». جرّبنا [[findall]] بيه لوحده:

~~~text الناتج
['01012345678', '+20 112 345 6789']
['0122-555-1234', '12345678901234', '010 1234 5678']
~~~

الملف الأول والتاني. لاحظ إن [[0101234]] مالقطهوش أصلًا (أقصر من 10)، والطويل اتلقط وهيترفض بعدين.

### [[MOBILE]]: صارم

[[01]] وبعدها حرف واحد من [[[0125] ]] (الأقواس المربعة يعني «واحد من دول»: فودافون واتصالات وأورنج و WE)، وبعدها [[\d{8}]] يعني 8 أرقام بالظبط. المجموع 11 رقم.

### [[EMAIL]]

- [[[\w.+-]+]] حرف أو أكتر ([[+]] بعد الأقواس يعني «مرة أو أكتر») من الحروف والأرقام و [[_]] ([[\w]]) والنقطة و [[+]] و [[-]].
- [[@]] نفسها.
- [[[\w-]+]] اسم الدومين.
- [[(?:\.[\w-]+)+]] نقطة وبعدها كلمة، مرة أو أكتر ([[.com]] أو [[.co.uk]]). [[\.]] نقطة حقيقية، لأن [[.]] لوحدها يعني «أي حرف». و [[(?:...)]] group **مش بيتلقط**: بيجمّع بس.

ليه [[?:]] مهمة؟ لأن [[findall]] لو الـ pattern فيه group عادي بيرجّع الـ group بس:

~~~text الناتج: على a@b.co.uk
['.uk']                 بـ (...)
['a@b.co.uk']           بـ (?:...)
~~~

---

## ٣. التنضيف

~~~python extract.py
def normalize(raw: str) -> str | None:
    digits = re.sub(r"\D", "", raw)
    if digits.startswith("20"):
        digits = "0" + digits[2:]
    return digits if MOBILE.fullmatch(digits) else None
~~~

1. [[re.sub(pattern, replacement, text)]] بدّل كل حاجة بتطابق. و [[\D]] (D كبيرة) عكس [[\d]]: أي حاجة **مش** رقم. فبنشيل المسافات والشرط و [[+]]:

~~~text الناتج: re.sub(r"\D", "", "+20 112 345 6789")
201123456789
~~~

2. بيبدأ بـ [[20]] (كود مصر)؟ شيله و حط [[0]]: [[digits[2:] ]] يعني من الحرف التالت للآخر. فبقى [[01123456789]].
3. [[MOBILE.fullmatch(digits)]] النص **كله** لازم يطابق. الفرق عن [[search]] (يدوّر جوه النص):

~~~text الناتج: على 0101234567899999
search:     <re.Match object; span=(0, 11), match='01012345678'>
fullmatch:  None
~~~

[[search]] لقى أول 11 رقم وقال تمام، و [[fullmatch]] رفض الرقم الطويل. في التحقق دايمًا [[fullmatch]].

---

## ٤. اللفة على الملفات

~~~python extract.py
phones, emails = set(), set()
for path in sorted(Path(sys.argv[1] if len(sys.argv) > 1 else ".").rglob("*.txt")):
    text = path.read_text(encoding="utf-8", errors="replace")
    phones.update(p for p in map(normalize, CANDIDATE.findall(text)) if p)
    emails.update(e.lower() for e in EMAIL.findall(text))
~~~

- [[set()]] مجموعة: مفيهاش تكرار. لو ضفت نفس الرقم مرتين بيفضل مرة.
- [[rglob("*.txt")]] الـ [[r]] يعني **recursive**: جوه الفولدرات اللي جواه كمان.
- [[errors="replace"]] لو فيه byte مش utf-8 سليم، حط مكانه علامة بدل ما السكربت يقع.
- السطر الطويل من جوه لبرة: [[CANDIDATE.findall(text)]] كل المرشحين، و [[map(normalize, ...)]] نادي normalize على كل واحد، و [[p for p in ... if p]] سيب اللي مش None، و [[phones.update(...)]] ضيفهم للـ set.
- [[e.lower()]] عشان [[Sara.Ali@Example.com]] و [[sara.ali@example.com]] يتحسبوا واحد.

---

## ٥. النتيجة

~~~python extract.py
print(sorted(phones))
print(sorted(emails))
print(re.sub(r"\s+", " ", "  كلام    فيه   مسافات  ").strip())
~~~

~~~text الناتج: python extract.py inbox
['01012345678', '01123456789', '01225551234']
['omar@shop.eg', 'sara.ali@example.com']
كلام فيه مسافات
~~~

| اللي في الملف | بقى | ليه |
|---|---|---|
| [[01012345678]] | [[01012345678]] | سليم |
| [[+20 112 345 6789]] | [[01123456789]] | المسافات اتشالت و 20 بقت 0 |
| [[0122-555-1234]] | [[01225551234]] | الشرط اتشالت |
| [[010 1234 5678]] | (تكرار) | نفس أول رقم، والـ set شالته |
| [[0101234]] | مرفوض | مااتلقطش أصلًا (قصير) |
| [[12345678901234]] | مرفوض | [[fullmatch]] رفضه |

والسطر الأخير: [[\s+]] أي عدد مسافات ورا بعض بقى مسافة واحدة، و [[strip()]] شال اللي في الأول والآخر.

---

## ٦. الحل: كل رقم في أنهي ملفات

~~~python extract.py
found = defaultdict(set)
...
    for p in filter(None, map(normalize, CANDIDATE.findall(text))):
        found[p].add(path.name)
for phone, files in sorted(found.items()):
    print(phone, ", ".join(sorted(files)))
~~~

- [[defaultdict(set)]] من [[collections]]: dict لو طلبت منه مفتاح مش موجود بيعمله set فاضي لوحده، فـ [[found[p].add(...)]] بتشتغل من أول مرة.
- [[filter(None, ...)]] سيب اللي مش فاضي ومش None، نفس فكرة [[if p]].
- [[found.items()]] أزواج (الرقم، الملفات).

~~~text الناتج
01012345678 msg1.txt, msg2.txt
01123456789 msg1.txt
01225551234 msg2.txt
~~~

---

## الخلاصة

| الرمز | معناه |
|---|---|
| [[\d]] و [[\D]] | رقم، ومش رقم |
| [[\s]] و [[\w]] | مسافة، وحرف أو رقم أو [[_]] |
| [[?]] و [[+]] و [[{8,15}]] | مرة أو لأ، مرة أو أكتر، من 8 لـ 15 |
| [[[...] ]] | حرف واحد من اللي جوه |
| [[(?:...)]] | تجميع من غير ما يتلقط |
| [[\.]] و [[\+]] | النقطة و + نفسهم |

- [[r"..."]] لكل pattern، و [[re.compile]] بره الـ loop.
- خطوتين: regex واسع يلقط، ودالة تنضّف وتتحقق بـ [[fullmatch]].
- [[findall]] بيرجّع الـ groups لو فيه groups، فاستخدم [[(?:...)]].`,
          lines: [
            "re.",
            "sys.",
            "Path.",
            "واسع: أي حاجة شكلها رقم تليفون.",
            "صارم: موبايل مصري 11 رقم.",
            "إيميل (والـ group مش بيتلقط).",
            "نضّف واتأكد:",
            "سيب الأرقام بس.",
            "لو بادئ بكود مصر...",
            "...خليه يبدأ بـ 0.",
            "رجّعه لو صح، وإلا None.",
            "sets عشان التكرار.",
            "كل ملفات txt:",
            "اقرا، وأي byte بايظ يتبدل.",
            "كل المرشحين، نضّفهم، وسيب الصح بس.",
            "الإيميلات بحروف صغيرة.",
            "الأرقام مترتبة.",
            "الإيميلات مترتبة.",
            "مسافات كتير بقت واحدة."
          ],
          sol: R`الناتج:

[[['01012345678', '01123456789', '01225551234'] ]]
[[['omar@shop.eg', 'sara.ali@example.com'] ]]
[[كلام فيه مسافات]]

[[+20 112 345 6789]] بقى [[01123456789]]، و [[0122-555-1234]] بقى [[01225551234]]، و [[010 1234 5678]] اتشال كتكرار. والناقص والطويل اترفضوا في [[fullmatch]].

حل التعديل: بدل set، [[found = defaultdict(set)]] وجوه الـ loop [[found[p].add(path.name)]]. وطلع:

[[01012345678 msg1.txt, msg2.txt]]
[[01123456789 msg1.txt]]
[[01225551234 msg2.txt]]`,
          solCode: R`import re
import sys
from collections import defaultdict
from pathlib import Path
CANDIDATE = re.compile(r"\+?\d[\d\s-]{8,15}\d")
MOBILE = re.compile(r"01[0125]\d{8}")
def normalize(raw: str) -> str | None:
    digits = re.sub(r"\D", "", raw)
    if digits.startswith("20"):
        digits = "0" + digits[2:]
    return digits if MOBILE.fullmatch(digits) else None
found = defaultdict(set)
for path in sorted(Path(sys.argv[1] if len(sys.argv) > 1 else ".").rglob("*.txt")):
    text = path.read_text(encoding="utf-8", errors="replace")
    for p in filter(None, map(normalize, CANDIDATE.findall(text))):
        found[p].add(path.name)
for phone, files in sorted(found.items()):
    print(phone, ", ".join(sorted(files)))`
        }
      ]
    }
]);
