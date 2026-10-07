// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "سكربتات وأوامر النظام",
      l: 1,
      n: "سكربت بـ arguments بـ argparse أو typer، وتشغّل أوامر النظام بـ subprocess بأمان",
      items: [
        {
          cmd: "argparse و typer",
          title: "سكربت بياخد arguments و --flags و --help",
          desc: R`بدل ما تعدّل الكود كل مرة تغيّر ملف أو رقم، خلّي السكربت ياخدهم من سطر الأوامر: [[python report.py orders.csv --top 3 -v]]. [[argparse]] في المكتبة الأساسية: بتعرّف الـ arguments، وهو بيعمل الـ parsing والتحويل للأنواع ورسايل الخطأ و [[--help]] لوحده.

و [[typer]] (من نفس صاحب FastAPI) بيعمل نفس الحاجة من الـ type hints بتاعة الدالة، زي ما FastAPI بيعمل الـ API من الـ type hints. محتاج [[pip install typer]]، وبيطلّع help ملوّن.`,
          example: R`import argparse
import sys
from pathlib import Path
def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="تقرير مبيعات من ملف CSV")
    parser.add_argument("src", type=Path, help="ملف الـ CSV")
    parser.add_argument("-o", "--out", type=Path, default=Path("report.json"))
    parser.add_argument("--city", action="append", help="فلتر، وينفع يتكرر")
    parser.add_argument("--top", type=int, default=5, metavar="N")
    parser.add_argument("-v", "--verbose", action="store_true")
    args = parser.parse_args(argv)
    if not 1 <= args.top <= 50:
        parser.error("--top must be between 1 and 50")
    if not args.src.exists():
        print(f"error: {args.src} not found", file=sys.stderr)
        return 2
    if args.verbose:
        print(args)
    print(f"reading {args.src} -> {args.out}, cities={args.city}, top={args.top}")
    return 0
if __name__ == "__main__":
    sys.exit(main())`,
          try: R`شغّل المثال بـ [[-h]]، ومن غير ملف، وبـ [[--top 99]]، وبـ [[--top abc]]، وبـ [[echo $?]] بعد كل واحدة. وبعدين اكتب نفس السكربت بـ typer ([[typer.Typer()]] و [[Annotated]] و [[typer.Option(min=1, max=50)]] و [[typer.Argument(exists=True)]]) وجرّب نفس الحالات.`,
          sol: R`بـ argparse: [[-h]] بيطبع الـ usage والوصف ويخرج بـ 0. من غير ملف: [[error: the following arguments are required: src]] وكود 2. [[--top 99]]: [[error: --top must be between 1 and 50]] وكود 2 (من [[parser.error]]). و [[--top abc]]: [[argument --top: invalid int value: 'abc']] وكود 2، لأن [[type=int]] بيحوّل ويرفض لوحده. وملف مش موجود: الرسالة بتاعتك على stderr وكود 2 من [[return 2]].

بـ typer نفس الحالات بتطلع في مربع [[Error]]، مثلًا [[Invalid value for '--top': 99 is not in the range 1<=x<=50]] و [[File 'nope.csv' does not exist]]، وكود 2 برضه، من غير ولا سطر فحص في الكود. لاحظ إن [[--city]] اللي بيتكرر بقى [[list[str] | None]]، و [[--verbose]] بقى bool flag لأن النوع bool. الغلطة الشائعة إنك تخلّي السكربت يخرج بـ 0 وهو فشل: الـ cron والـ CI والـ [[&&]] في bash بيعتمدوا على الـ exit code.`,
          solCode: R`from pathlib import Path
from typing import Annotated
import typer
app = typer.Typer(help="تقرير مبيعات من ملف CSV")
@app.command()
def report(
    src: Annotated[Path, typer.Argument(exists=True, dir_okay=False, help="ملف الـ CSV")],
    out: Annotated[Path, typer.Option("--out", "-o")] = Path("report.json"),
    city: Annotated[list[str] | None, typer.Option(help="فلتر، وينفع يتكرر")] = None,
    top: Annotated[int, typer.Option(min=1, max=50)] = 5,
    verbose: Annotated[bool, typer.Option("--verbose", "-v")] = False,
) -> None:
    if verbose:
        typer.echo(f"src={src} out={out} city={city} top={top}")
    typer.echo(f"reading {src} -> {out}, cities={city}, top={top}")
if __name__ == "__main__":
    app()`,
          flag: "script",
          deep: {
            why: R`سكربت الـ seed، و import من CSV، وتقرير شهري، و cleanup: كلها بتتشغّل من الترمنال أو cron أو CI، ومحتاجة ملفات وخيارات مختلفة كل مرة. ومن غير arguments الناس بتعدّل الكود قبل كل تشغيل، أو بتقرا [[sys.argv[1]]] من غير أي فحص فتطلع [[IndexError]] بدل رسالة مفهومة.`,
            how: R`[[add_argument("src")]] من غير شرط positional وإجباري. و [[-o]]/[[--out]] option اختياري ليه default. و [[type=Path]] أو [[type=int]] بيحوّل ولو فشل بيطلّع رسالة ويخرج بـ 2. و [[action="store_true"]] flag من غير قيمة، و [[action="append"]] بيجمع التكرار في list، و [[choices=[...]]] قيم محددة، و [[nargs="+"]] واحد أو أكتر. والناتج [[Namespace]] بتوصل لقيمه بـ [[args.top]] (الشرطة في الاسم بتبقى underscore).

[[main(argv=None)]] و [[parse_args(argv)]]: في التشغيل العادي [[argv]] بـ None فبيقرا [[sys.argv]]، وفي الاختبار تبعت list بإيدك ([[main(["orders.csv", "--top", "3"])]]). و [[sys.exit(main())]] بيخلّي الـ return هو الـ exit code. والأخطاء تتطبع على [[sys.stderr]] عشان متختلطش بالـ output لو حد عمل pipe.

typer: كل باراميتر في الدالة من غير default بيبقى argument، واللي ليه default بيبقى option، والنوع بيحدد التحويل والفحص، و [[Annotated[..., typer.Option(...)]]] للتفاصيل. و [[@app.command()]] على كذا دالة بيعمل subcommands زي [[git commit]] و [[git push]].

ومن الترمنال: [[uv run report.py ...]] أو تضيفه في [[[project.scripts]]] في [[pyproject.toml]] فيبقى أمر باسمه بعد التسطيب.`,
            when: R`argparse لسكربت من غير dependencies أو هيتشغّل في مكان مفيهوش venv. typer لأدوات أكبر فيها subcommands ولو المشروع أصلًا فيه dependencies (مشروع FastAPI مثلًا). ولأي سكربت هيعيش أكتر من يوم.`,
            mistakes: R`[[sys.argv[1]]] من غير فحص. و exit code 0 بعد فشل. وطباعة الأخطاء على stdout. وكل الكود على مستوى الملف من غير [[main()]] و [[if __name__ == "__main__"]] فمينفعش تعمله import أو تختبره. و [[type=bool]] في argparse ([[bool("False")]] بـ True! استخدم [[store_true]]).`
          },
          teach: R`## المثال بيعمل إيه؟

سكربت [[report.py]] بياخد اسم ملف CSV من سطر الأوامر، ومعاه خيارات ([[--out]] و [[--city]] و [[--top]] و [[-v]])، ويفحصهم، ويطبع رسالة واضحة ويخرج بـ exit code صح لو حاجة غلط. الشغل الحقيقي (قراية الـ CSV) مش مكتوب، عشان التركيز على الـ arguments. اتشغّل على ويندوز (Python 3.14.3 في Git Bash) وعلى لينكس ([[python:3.13-slim]] في Docker)، وفي نفس الفولدر ملف [[orders.csv]] موجود.

### كلمتين قبل ما نبدأ

| الكلمة | معناها | مثال |
|---|---|---|
| argument | أي كلمة بعد اسم السكربت | [[orders.csv]] و [[--top]] و [[3]] |
| positional | بيتعرف من مكانه، من غير اسم | [[orders.csv]] |
| option | ليه اسم بيبدأ بـ [[--]] (أو [[-]] لاختصار حرف واحد) وبعده قيمة | [[--top 3]] |
| flag | option من غير قيمة: موجود أو لأ | [[-v]] |
| exit code | رقم البرنامج بيرجّعه لما يخلص: 0 نجاح، وغيره فشل | [[echo $?]] في bash |

---

## ١. الـ imports و [[main(argv=None)]]

~~~python
import argparse
import sys
from pathlib import Path
def main(argv: list[str] | None = None) -> int:
~~~

- [[argparse]]: argument parser، في المكتبة الأساسية.
- [[sys]]: عشان [[sys.stderr]] و [[sys.exit]].
- [[argv: list[str] | None = None]]: الباراميتر list of strings **أو** None ([[|]] في type hint معناها «أو»)، والافتراضي None. في التشغيل العادي مش هنبعته، وفي الاختبار نبعت list بإيدنا (تحت).
- [[-> int]]: main بترجّع رقم، وده هيبقى الـ exit code.

---

## ٢. تعريف الـ arguments

~~~python
parser = argparse.ArgumentParser(description="تقرير مبيعات من ملف CSV")
parser.add_argument("src", type=Path, help="ملف الـ CSV")
parser.add_argument("-o", "--out", type=Path, default=Path("report.json"))
parser.add_argument("--city", action="append", help="فلتر، وينفع يتكرر")
parser.add_argument("--top", type=int, default=5, metavar="N")
parser.add_argument("-v", "--verbose", action="store_true")
~~~

| السطر | نوعه | الباراميترات |
|---|---|---|
| [["src"]] | positional، إجباري | [[type=Path]]: النص يتحوّل Path. و [[help]] بيظهر في [[-h]] |
| [["-o", "--out"]] | option باسمين | [[default]] لو محدش كتبه |
| [["--city"]] | option بيتكرر | [[action="append"]]: كل مرة القيمة تتضاف لـ list |
| [["--top"]] | option رقم | [[type=int]] بيحوّل ويرفض اللي مش رقم، و [[metavar="N"]] الاسم اللي يظهر في الـ help بدل [[TOP]] |
| [["-v", "--verbose"]] | flag | [[action="store_true"]]: True لو موجود، و False لو لأ |

الاسم من غير شرطة = positional، وبشرطة = option. واسم الخانة اللي هتقراها بعدين بييجي من الاسم الطويل من غير الشرط: [[args.out]] و [[args.verbose]].

---

## ٣. [[parse_args]] و [[--help]]

~~~python
args = parser.parse_args(argv)
~~~

[[parse_args(None)]] بيقرا [[sys.argv[1:] ]] (الكلمات اللي بعد اسم السكربت). بيفحص، ويحوّل الأنواع، ولو فيه مشكلة بيطبع رسالة ويخرج بـ 2 لوحده. ولو لقى [[-h]] بيطبع الـ help ويخرج بـ 0:

~~~text الناتج: python report.py -h
usage: report.py [-h] [-o OUT] [--city CITY] [--top N] [-v] src

تقرير مبيعات من ملف CSV

positional arguments:
  src            ملف الـ CSV

options:
  -h, --help     show this help message and exit
  -o, --out OUT
  --city CITY    فلتر، وينفع يتكرر
  --top N
  -v, --verbose
~~~

في سطر الـ usage: [[[ ]]] حوالين الحاجة معناها اختيارية، و [[src]] من غير أقواس إجباري. وده كله اتعمل من الـ [[add_argument]] اللي فوق، من غير ما نكتب سطر help بإيدنا.

لو نسيت الملف:

~~~text الناتج: python report.py
usage: report.py [-h] [-o OUT] [--city CITY] [--top N] [-v] src
report.py: error: the following arguments are required: src
~~~

و exit code 2. ولو كتبت حروف بدل رقم:

~~~text الناتج: python report.py orders.csv --top abc
report.py: error: argument --top: invalid int value: 'abc'
~~~

برضه 2، و [[type=int]] هو اللي رفض.

---

## ٤. فحص زيادة: [[parser.error]]

~~~python
if not 1 <= args.top <= 50:
    parser.error("--top must be between 1 and 50")
~~~

- [[1 <= args.top <= 50]]: Python بيسمح بالمقارنة المتسلسلة: «1 أصغر من أو يساوي top، و top أصغر من أو يساوي 50».
- [[parser.error(msg)]]: اطبع الـ usage والرسالة بنفس شكل أخطاء argparse، واخرج بـ 2.

~~~text الناتج: python report.py orders.csv --top 99
usage: report.py [-h] [-o OUT] [--city CITY] [--top N] [-v] src
report.py: error: --top must be between 1 and 50
~~~

---

## ٥. خطأ بإيدك: stderr و [[return 2]]

~~~python
if not args.src.exists():
    print(f"error: {args.src} not found", file=sys.stderr)
    return 2
~~~

- [[args.src]] بقى Path بسبب [[type=Path]]، فـ [[.exists()]] شغالة على طول.
- [[file=sys.stderr]]: اطبع على قناة الأخطاء مش الناتج العادي (stdout). لو حد عمل [[python report.py ... > out.txt]]، الأخطاء هتفضل ظاهرة على الشاشة ومش هتدخل الملف.
- [[return 2]]: الرقم ده هيبقى الـ exit code.

~~~text الناتج: python report.py nope.csv
error: nope.csv not found
~~~

---

## ٦. الشغل، و [[Namespace]]

~~~python
if args.verbose:
    print(args)
print(f"reading {args.src} -> {args.out}, cities={args.city}, top={args.top}")
return 0
~~~

~~~text الناتج: python report.py orders.csv --city Cairo --city Alex --top 3 -v (ويندوز)
Namespace(src=WindowsPath('orders.csv'), out=WindowsPath('report.json'), city=['Cairo', 'Alex'], top=3, verbose=True)
reading orders.csv -> report.json, cities=['Cairo', 'Alex'], top=3
~~~

- [[args]] object من نوع [[Namespace]]: كل argument خانة فيه.
- [[city=['Cairo', 'Alex'] ]]: [[--city]] اتكتب مرتين فبقى list. ولو متكتبش خالص بيبقى [[None]] (جربناه على لينكس: [[cities=None]]).
- [[top=3]] رقم مش [['3']]، و [[out]] خد الـ default.
- على لينكس نفس السطر بيطلع [[PosixPath('orders.csv')]].

---

## ٧. آخر سطرين: [[sys.exit(main())]]

~~~python
if __name__ == "__main__":
    sys.exit(main())
~~~

- الـ if: شغّل main بس لو الملف ده اتشغّل مباشرة (درس «import و packages»).
- [[sys.exit(n)]]: اخرج من البرنامج بالرقم ده. من غيره البرنامج بيخرج بـ 0 دايمًا حتى لو main رجّعت 2.

وعشان main بتاخد [[argv]]، الاختبار بيناديها من غير terminal:

~~~text الناتج: python -c "import report; print(report.main(['orders.csv', '--top', '3']))"
reading orders.csv -> report.json, cities=None, top=3
0
~~~

والـ exit code هو اللي الأدوات التانية بتبص عليه. على لينكس:

~~~bash
python report.py orders.csv --top 99 && echo next-command-ran
echo $?
~~~

~~~text الناتج
report.py: error: --top must be between 1 and 50
2
~~~

[[echo next-command-ran]] متنفّذش لأن [[&&]] بيشغّل اللي بعده بس لو اللي قبله خرج بـ 0. و [[$?]] الـ exit code بتاع آخر أمر. (في PowerShell نفس الرقم في [[$LASTEXITCODE]].)

| الحالة | الناتج | exit |
|---|---|---|
| [[-h]] | الـ help | 0 |
| من غير ملف | [[the following arguments are required: src]] | 2 |
| [[--top abc]] | [[invalid int value: 'abc']] | 2 |
| [[--top 99]] | رسالة [[parser.error]] | 2 |
| ملف مش موجود | رسالتنا على stderr | 2 |
| كله تمام | [[reading ...]] | 0 |

> الفخ: [[type=bool]] في argparse. [[bool("False")]] بتطلع [[True]] (أي نص مش فاضي True)، فـ [[--debug False]] هيبقى True. للـ flags استخدم [[action="store_true"]].

---

## ٨. الحل: نفس السكربت بـ typer

~~~python solCode (أهم سطور)
app = typer.Typer(help="تقرير مبيعات من ملف CSV")
@app.command()
def report(
    src: Annotated[Path, typer.Argument(exists=True, dir_okay=False, help="ملف الـ CSV")],
    out: Annotated[Path, typer.Option("--out", "-o")] = Path("report.json"),
    city: Annotated[list[str] | None, typer.Option(help="فلتر، وينفع يتكرر")] = None,
    top: Annotated[int, typer.Option(min=1, max=50)] = 5,
    verbose: Annotated[bool, typer.Option("--verbose", "-v")] = False,
) -> None:
~~~

typer (اتسطّب في venv محلي، نسخة 0.27.3) بيقرا الدالة نفسها:

- باراميتر **من غير default** ([[src]]) = positional إجباري. و **بـ default** = option.
- [[Annotated[Path, ...] ]]: النوع [[Path]]، ومعاه معلومات زيادة لـ typer. [[Annotated]] من [[typing]]، وبتلزق بيانات على النوع من غير ما تغيّره.
- [[typer.Argument(exists=True, dir_okay=False)]]: typer نفسه يتأكد إن الملف موجود ومش فولدر. ده بدل الـ if اللي كتبناه بإيدنا.
- [[typer.Option(min=1, max=50)]]: بدل [[parser.error]].
- [[list[str] | None]]: النوع list فـ typer يخلّيه يتكرر، زي [[append]].
- [[bool]] بـ default False: يبقى flag لوحده.
- [[app()]] في الآخر بيشغّل كل ده.

~~~text الناتج: python report_typer.py orders.csv --top 99
Usage: report_typer.py [OPTIONS] {src}
Try 'report_typer.py --help' for help.
┌─ Error ─────────────────────────────────────────────────────────────────────┐
│ Invalid value for '--top': 99 is not in the range 1<=x<=50.                 │
└─────────────────────────────────────────────────────────────────────────────┘
~~~

والباقي اتجرّب بنفس الطريقة، وكله exit 2:

| الحالة | رسالة typer |
|---|---|
| من غير ملف | [[Missing argument 'src'.]] |
| [[--top abc]] | [[Invalid value for '--top': 'abc' is not a valid int range.]] |
| [[nope.csv]] | [[Invalid value for 'src': File 'nope.csv' does not exist.]] |

ومع [[--city Cairo --city Alex --top 3 -v]]:

~~~text الناتج
src=orders.csv out=report.json city=['Cairo', 'Alex'] top=3
reading orders.csv -> report.json, cities=['Cairo', 'Alex'], top=3
~~~

و [[--help]] بيطلّع جدول بإطار فيه الـ arguments والـ options والـ defaults و [[[1<=x<=50]]]، وكمان [[--install-completion]] اللي typer بيضيفه لوحده.

---

## الخلاصة

| argparse | typer |
|---|---|
| [[add_argument("src")]] | باراميتر من غير default |
| [[add_argument("--top", type=int, default=5)]] | [[top: int = 5]] |
| [[action="store_true"]] | [[bool = False]] |
| [[action="append"]] | النوع [[list[str]]] والـ default [[None]] |
| فحص بإيدك + [[parser.error]] | [[min=]] و [[max=]] و [[exists=True]] |
| مكتبة أساسية | [[pip install typer]] |

- [[main(argv=None) -> int]] و [[sys.exit(main())]]: قابل للاختبار، والـ exit code صح.
- الأخطاء على stderr، و 2 لـ «استخدام غلط».`,
          lines: [
            "import.",
            "للـ stderr و exit.",
            "المسارات.",
            R`[[argv]] بـ None في التشغيل العادي، و list في الاختبار.`,
            R`الـ parser، والوصف بيظهر في [[--help]].`,
            R`positional: إجباري، و [[type=Path]] بيحوّله.`,
            "option بشكلين وقيمة افتراضية.",
            R`[[append]]: [[--city A --city B]] بيبقوا list.`,
            R`رقم، و [[metavar]] الاسم اللي يظهر في الـ help.`,
            "flag: True لو موجود.",
            R`اقرا [[sys.argv]] أو الـ list اللي اتبعتت.`,
            "فحص زيادة...",
            R`...[[parser.error]] بيطبع الـ usage والرسالة ويخرج بـ 2.`,
            "الملف موجود؟",
            "الخطأ على stderr مش stdout.",
            "exit code غير صفر = فشل.",
            "لو verbose...",
            "اطبع كل الـ arguments.",
            "الشغل الحقيقي.",
            "نجح.",
            "لما يتشغّل مباشرة بس.",
            R`الـ return بتاع main بقى الـ exit code.`
          ]
        },
        {
          cmd: "subprocess",
          title: "تشغّل أمر من Python بأمان: subprocess.run",
          desc: R`[[subprocess.run(["git", "status"], capture_output=True, text=True)]] بيشغّل برنامج تاني ويستنى يخلص، ويرجّع object فيه [[returncode]] و [[stdout]] و [[stderr]]. و [[check=True]] بيرمي [[CalledProcessError]] لو الأمر فشل، و [[timeout=]] بيقفله لو اتأخر.

القاعدة الذهبية: ابعت الأمر list، كل argument عنصر لوحده، ومن غير [[shell=True]]. كده الـ argument بيوصل للبرنامج زي ما هو حتى لو فيه مسافات أو [[;]] أو [[$]]، ومفيش shell يفسّره. [[shell=True]] مع أي قيمة جاية من برّه = command injection.`,
          example: R`import shutil
import subprocess
import sys
r = subprocess.run(["git", "--version"], capture_output=True, text=True, check=True)
print(r.stdout.strip(), r.returncode)
filename = "my file; rm -rf ~.txt"
r = subprocess.run(["ls", "-l", "--", filename], capture_output=True, text=True)
print(r.returncode, r.stderr.strip())
try:
    subprocess.run([sys.executable, "-c", "import sys; sys.exit(3)"], check=True)
except subprocess.CalledProcessError as e:
    print("فشل بكود", e.returncode)
try:
    subprocess.run(["sleep", "5"], timeout=1)
except subprocess.TimeoutExpired:
    print("اتأخر فاتقفل")
if shutil.which("pg_dump") is None:
    print("pg_dump مش متسطّب")
r = subprocess.run(["git", "status", "--short"], capture_output=True, text=True, cwd=".")
print(r.stdout if r.returncode == 0 else "الفولدر ده مش git repo")
# subprocess.run(f"ls {filename}", shell=True)   ممنوع: الـ ; هتشغّل rm -rf`,
          try: R`اكتب [[git_info(repo)]] بترجع dict فيه الـ branch وآخر commit وعدد الملفات المتغيرة، بـ [[git rev-parse --abbrev-ref HEAD]] و [[git log -1 --format=%h %s]] و [[git status --porcelain]]، و [[cwd=repo]] و [[timeout]]. لو git مش متسطّب أو الفولدر مش repo، السكربت يطبع الخطأ على stderr ويخرج بـ 1. جرّبه على repo وعلى [[/tmp]].`,
          sol: R`على repo بيطبع حاجة زي [[{'branch': 'main', 'last': '87185bb آخر رسالة commit', 'dirty': 5}]]. وعلى [[/tmp]]: [[error: fatal: not a git repository (or any of the parent directories): .git]] على stderr و [[echo $?]] بيطلع 1.

لاحظ إن [[--format=%h %s]] عنصر واحد في الـ list مع إن فيه مسافة: مفيش shell يقسّمه، فمش محتاج علامات تنصيص. و [[cwd=repo]] بدل [[os.chdir]] أو [[cd repo && git ...]]، فالسكربت نفسه مبيتنقلش. و [[shutil.which("git")]] قبل النداء بيدّيك رسالة واضحة بدل [[FileNotFoundError]]. والغلطة الشائعة: [[subprocess.run(f"git -C {repo} status", shell=True)]]: يشتغل لحد ما حد يبعت مسار فيه مسافة أو [[;]].`,
          solCode: R`import shutil
import subprocess
import sys
from pathlib import Path
def git(args: list[str], repo: Path) -> str:
    r = subprocess.run(["git", *args], capture_output=True, text=True, cwd=repo, timeout=10)
    if r.returncode != 0:
        raise RuntimeError(r.stderr.strip())
    return r.stdout.strip()
def git_info(repo: Path) -> dict[str, str | int]:
    if shutil.which("git") is None:
        raise RuntimeError("git مش متسطّب")
    return {
        "branch": git(["rev-parse", "--abbrev-ref", "HEAD"], repo),
        "last": git(["log", "-1", "--format=%h %s"], repo),
        "dirty": len(git(["status", "--porcelain"], repo).splitlines()),
    }
if __name__ == "__main__":
    repo = Path(sys.argv[1] if len(sys.argv) > 1 else ".")
    try:
        print(git_info(repo))
    except RuntimeError as e:
        print("error:", e, file=sys.stderr)
        sys.exit(1)`,
          flag: "script",
          deep: {
            why: R`سكربتات الأتمتة كتير بتنادي أدوات: [[pg_dump]] للـ backup، و [[git]] في deploy، و [[ffmpeg]] للفيديو، و [[convert]] للصور. و command injection من [[shell=True]] مع اسم ملف أو input من المستخدم ثغرة حقيقية ومشهورة (تاب «الأمان»).`,
            how: R`مع list، Python بينادي البرنامج مباشرة ([[execve]] على لينكس) وكل عنصر بيوصل argument منفصل. مع [[shell=True]] و string، بيشغّل [[/bin/sh -c "..."]]، فالـ shell بيفسّر [[;]] و [[&&]] و [[$()]] و [[*]] والمسافات. فـ [[filename = "x; rm -rf ~"]] في المثال وصل لـ [[ls]] كاسم ملف غريب، مش كأمر تاني.

[[--]] قبل اسم الملف بيقول للبرنامج «اللي بعد كده مش options»، عشان اسم ملف بيبدأ بـ [[-]] (زي [[-rf]]) ميتفهمش flag.

[[capture_output=True]] بيمسك stdout و stderr بدل ما يطبعوا، و [[text=True]] بيحوّلهم str بدل bytes (وتقدر تحدد [[encoding="utf-8"]]). و [[check=True]] بيرمي لو الكود مش صفر، وإلا لازم تفحص [[returncode]] بنفسك. و [[timeout]] بيقتل الأمر ويرمي [[TimeoutExpired]]. و [[cwd]] الفولدر اللي الأمر يتشغّل فيه، و [[env={**os.environ, "PGPASSWORD": ...}]] لمتغيرات بيئة إضافية (أحسن من تحط الباسورد في الـ args لأنها بتظهر في [[ps]]).

[[sys.executable]] مسار الـ Python الحالي (نفس الـ venv)، استخدمه بدل [["python"]]. ولو محتاج pipe بين أمرين: شغّل الاتنين من Python ومرر الـ stdout، أو فكّر لو فيه مكتبة Python تعمل الشغل نفسه. وفي كود async: [[asyncio.create_subprocess_exec]] بدل [[subprocess.run]] اللي بيقفل الـ loop.`,
            when: R`لما الأداة الخارجية هي الطريقة الصح (pg_dump، git، ffmpeg). لو فيه مكتبة Python بتعمل نفس الشغل ([[shutil.copy]] بدل [[cp]]، و [[pathlib]] بدل [[ls]]، و [[httpx]] بدل [[curl]])، استخدمها: أسرع، ومفيش parsing لـ output نصي، وبتشتغل على ويندوز.`,
            mistakes: R`[[shell=True]] مع f-string فيها input. و [[os.system]] (نفس المشكلة، ومن غير output). ومن غير [[check]] ولا فحص [[returncode]] فالفشل يعدّي. ومن غير [[timeout]] فالسكربت يفضل مستني للأبد. و [[subprocess.run]] جوه route [[async def]] في FastAPI (بيقفل الـ event loop، درس «blocking في async»).`
          },
          teach: R`## المثال بيعمل إيه؟

بيشغّل برامج تانية من جوه Python بـ [[subprocess.run]]: [[git]] و [[ls]] و Python نفسه و [[sleep]]، ويمسك الناتج والـ exit code، ويوريك ٣ طرق الفشل (كود غير صفر، وتأخير، وبرنامج مش موجود)، وإزاي اسم ملف فيه [[;]] مبيقدرش يشغّل أمر تاني. اتشغّل على لينكس ([[python:3.13]] في Docker، فيه git) وعلى ويندوز (PowerShell 7، Python 3.14.3).

> [[ls]] و [[sleep]] برامج لينكس. على ويندوز اشتغلوا هنا بس لأن Git for Windows حاططهم في الـ PATH ([[C:\Program Files\Git\usr\bin\ls.exe]]). على ويندوز من غيره هيطلع [[FileNotFoundError]].

---

## ١. الـ imports

~~~python
import shutil
import subprocess
import sys
~~~

- [[subprocess]]: تشغيل process تاني (برنامج) والكلام معاه. process = برنامج شغال.
- [[shutil]]: أدوات ملفات، ومنها [[which]] (تحت).
- [[sys]]: منه [[sys.executable]].

---

## ٢. أول نداء: [[git --version]]

~~~python
r = subprocess.run(["git", "--version"], capture_output=True, text=True, check=True)
print(r.stdout.strip(), r.returncode)
~~~

~~~text الناتج: لينكس ثم ويندوز
git version 2.47.3 0
git version 2.56.0.windows.1 0
~~~

| الحتة | معناها |
|---|---|
| [[["git", "--version"]]] | الأمر **list**: أول عنصر البرنامج، وكل عنصر بعده argument لوحده |
| [[capture_output=True]] | امسك stdout و stderr في الـ object بدل ما يتطبعوا على الشاشة |
| [[text=True]] | رجّعهم str. من غيره bytes: [[b'1\n']] |
| [[check=True]] | لو الـ exit code مش صفر ارمي exception |

[[run]] بيستنى البرنامج يخلص ويرجّع object من نوع [[CompletedProcess]] فيه:

- [[r.stdout]]: الناتج، وآخره [[\n]]، فبنشيله بـ [[strip()]].
- [[r.returncode]]: الـ exit code، و 0 = نجح.
- [[r.stderr]]: الأخطاء.

---

## ٣. اسم ملف «خطير»

~~~python
filename = "my file; rm -rf ~.txt"
r = subprocess.run(["ls", "-l", "--", filename], capture_output=True, text=True)
print(r.returncode, r.stderr.strip())
~~~

~~~text الناتج
2 ls: cannot access 'my file; rm -rf ~.txt': No such file or directory
~~~

- الاسم فيه مسافات و [[;]] و [[rm -rf ~]]. لو shell شافه، [[;]] معناها «خلّص الأمر ده وابدأ أمر جديد»، و [[rm -rf ~]] بيمسح الـ home كله.
- لكن مع list **مفيش shell خالص**: Python بيشغّل [[ls]] مباشرة وبيدّيه الـ string كلها argument واحد. فـ [[ls]] دوّر على ملف اسمه بالحرف [[my file; rm -rf ~.txt]] وملقاهوش.
- [[--]]: عرف عند أغلب البرامج معناه «اللي بعدي مش options». من غيره اسم ملف زي [[-rf]] بيتفهم flags: [[ls -l -rf]] اشتغل وطلع listing (exit 0)، و [[ls -- -rf]] قال [[cannot access '-rf']].
- [[2]]: الـ exit code بتاع [[ls]] لما الملف مش موجود. ومن غير [[check=True]] مفيش exception، فلازم تبص على [[returncode]] بنفسك.

### نفس الحاجة بـ [[shell=True]] (اتجرّبت في Docker بأمر آمن)

السطر الأخير في المثال متعلّق عليه عشان خطير. جربنا الفكرة بـ [[echo]] بدل [[rm]]:

~~~python
filename = "my file; echo INJECTED"
r = subprocess.run(f"ls {filename}", shell=True, capture_output=True, text=True)
~~~

~~~text الناتج: repr(r.stdout) و repr(r.stderr)
'INJECTED\n' "ls: cannot access 'my': No such file or directory\nls: cannot access 'file': No such file or directory\n"
~~~

الـ shell قسّم على المسافات ([[my]] و [[file]] بقوا ملفين)، وبعدين نفّذ [[echo INJECTED]] كأمر تاني. لو مكانها [[rm -rf ~]] كان اتنفّذ. ده اسمه **command injection**.

---

## ٤. [[check=True]] و [[CalledProcessError]]

~~~python
try:
    subprocess.run([sys.executable, "-c", "import sys; sys.exit(3)"], check=True)
except subprocess.CalledProcessError as e:
    print("فشل بكود", e.returncode)
~~~

~~~text الناتج
فشل بكود 3
~~~

- [[sys.executable]]: المسار الكامل لـ Python اللي شغّال دلوقتي (نفس الـ venv). أضمن من [["python"]] اللي ممكن يلاقي نسخة تانية في الـ PATH.
- [["-c", "import sys; sys.exit(3)"]]: Python صغير بيخرج بكود 3. والـ [[;]] هنا جوه كود Python، مش shell.
- [[check=True]] شاف 3 فرمى [[CalledProcessError]]، و [[e.returncode]] فيه الرقم.

---

## ٥. [[timeout]] و [[TimeoutExpired]]

~~~python
try:
    subprocess.run(["sleep", "5"], timeout=1)
except subprocess.TimeoutExpired:
    print("اتأخر فاتقفل")
~~~

~~~text الناتج
اتأخر فاتقفل
~~~

[[sleep 5]] بيستنى ٥ ثواني. [[timeout=1]]: بعد ثانية Python بيقتل البرنامج ويرمي [[TimeoutExpired]]. السكربت كله على لينكس خلص في [[real 0m1.260s]] مش ٥ ثواني. من غير timeout، أمر واقف (مستني باسورد مثلًا) بيوقّف السكربت للأبد.

---

## ٦. [[shutil.which]]

~~~python
if shutil.which("pg_dump") is None:
    print("pg_dump مش متسطّب")
~~~

~~~text الناتج
pg_dump مش متسطّب
~~~

[[which]] بيدوّر على البرنامج في الـ PATH زي أمر [[which]] في bash: بيرجّع مساره أو [[None]]. لو ناديت برنامج مش موجود مباشرة:

~~~text الناتج: subprocess.run(["nosuchcmd"])
FileNotFoundError: [Errno 2] No such file or directory: 'nosuchcmd'
~~~

فالفحص قبلها بيدّيك رسالة مفهومة بدل الـ exception ده.

---

## ٧. [[cwd]] وفحص [[returncode]] بإيدك

~~~python
r = subprocess.run(["git", "status", "--short"], capture_output=True, text=True, cwd=".")
print(r.stdout if r.returncode == 0 else "الفولدر ده مش git repo")
~~~

- [[cwd]] = current working directory: الفولدر اللي الأمر يتشغّل فيه. [["."]] الفولدر الحالي. السكربت نفسه مبيتنقلش.
- [[--short]]: كل ملف متغير في سطر قصير.
- [[A if cond else B]]: لو الكود صفر اطبع الناتج، وإلا الرسالة.

| مكان التشغيل | الناتج |
|---|---|
| فولدر التجربة (مش repo) | [[الفولدر ده مش git repo]] |
| repo نضيف | سطر فاضي ([[stdout]] فاضي) |
| repo فيه ملف جديد [[a.txt]] | [[?? a.txt]] ([[??]] = ملف git مش متابعه) |

---

## ٨. الحل: [[git_info]]

~~~python solCode (القلب)
def git(args: list[str], repo: Path) -> str:
    r = subprocess.run(["git", *args], capture_output=True, text=True, cwd=repo, timeout=10)
    if r.returncode != 0:
        raise RuntimeError(r.stderr.strip())
    return r.stdout.strip()
~~~

- [[["git", *args]]]: الـ [[*]] بيفرد عناصر الـ list جوه list جديدة: [[*["log", "-1"]]] تبقى [["git", "log", "-1"]].
- لو فشل: [[raise RuntimeError(...)]] برسالة git نفسها.
- [[["log", "-1", "--format=%h %s"]]]: [[-1]] آخر commit بس، و [[%h]] الـ hash القصير و [[%s]] العنوان. فيه مسافة ومع ذلك عنصر واحد من غير تنصيص، لأن مفيش shell يقسّمه.
- [[len(git(["status", "--porcelain"], repo).splitlines())]]: [[--porcelain]] شكل ثابت للسكربتات، سطر لكل ملف متغير، فعدد السطور = عدد الملفات.
- في الـ main: [[except RuntimeError as e]] يطبع على stderr و [[sys.exit(1)]].

~~~text الناتج: لينكس، repo فيه commit و a.txt متعدّل و b.txt جديد
{'branch': 'main', 'last': '3734806 first commit', 'dirty': 2}
~~~

~~~text الناتج: python sol.py /tmp
error: fatal: not a git repository (or any of the parent directories): .git
~~~

و exit 1. وعلى ويندوز نفس الشكل: [[{'branch': 'main', 'last': '85fec8f first commit', 'dirty': 1}]]، وعلى فولدر مش repo نفس رسالة الـ fatal و exit 1.

---

## الخلاصة

| الباراميتر | ليه |
|---|---|
| الأمر list | كل argument بيوصل زي ما هو، ومفيش shell |
| [[capture_output=True, text=True]] | الناتج في [[r.stdout]] و [[r.stderr]] كـ str |
| [[check=True]] | الفشل يبقى [[CalledProcessError]] |
| [[timeout=n]] | [[TimeoutExpired]] بدل ما يقف للأبد |
| [[cwd=folder]] | شغّل في فولدر تاني من غير [[cd]] |
| [[sys.executable]] | نفس Python ونفس الـ venv |
| [[shutil.which(name)]] | البرنامج موجود؟ |

- متكتبش [[shell=True]] مع أي حاجة جاية من برّه، ومتستخدمش [[os.system]].`,
          lines: [
            R`[[which]] للبحث عن برنامج في الـ PATH.`,
            "import.",
            R`[[sys.executable]].`,
            R`list: البرنامج والـ arguments، و [[check=True]] يرمي لو فشل.`,
            "الناتج والكود.",
            "اسم ملف فيه ; و rm: كأنه جاي من المستخدم.",
            R`بيوصل لـ [[ls]] كـ argument واحد، و [[--]] يمنع إنه يتفهم flag.`,
            "ls بيقول الملف مش موجود، ومفيش حاجة اتمسحت.",
            "try.",
            "Python بيخرج بكود 3.",
            R`[[check=True]] حوّل الفشل لـ exception.`,
            "الكود.",
            "try.",
            "أمر بياخد ٥ ثواني.",
            R`[[timeout=1]]: اتقفل ورمى.`,
            "اطبع.",
            "البرنامج متسطّب؟",
            "رسالة واضحة بدل FileNotFoundError.",
            R`[[cwd]]: الفولدر اللي الأمر يتشغّل فيه.`,
            R`افحص [[returncode]] بنفسك لو مش مستخدم check.`
          ]
        }
      ]
    }
]);
