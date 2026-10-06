// تكملة تاب python: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/python/01.js (شرح حقول الدرس في أوله)
MORE("python", [
    {
      t: "سكربتات محترمة",
      l: 3,
      n: "السكربت يتسطّب كأمر، أو يشيل الـ dependencies بتاعته جواه، ويتجدول، ويستحمل الأخطاء، ويشتغل بالتوازي، ويتختبر، وتعرف امتى Python أصلًا",
      items: [
        {
          cmd: "[project.scripts] و pipx",
          title: "حوّل سكربتاتك لأوامر بتتسطّب",
          desc: R`لما يبقى عندك كذا سكربت ليهم dependencies، نسخهم في [[~/.local/bin]] مش كفاية: كل واحد محتاج venv. الحل تعملهم package صغيرة بـ [[pyproject.toml]]، وقسم [[[project.scripts] ]] بيقول «الأمر [[tidy]] = الدالة [[main]] في الموديول ده».

وبعدين [[pipx install .]] (أو [[uv tool install .]]) بيعمل venv مخصوص للأدوات دي، ويسطّب الـ dependencies جواه، ويحط الأوامر في [[~/.local/bin]]. تكتب [[tidy]] من أي مكان، ومن غير ما تفعّل حاجة.`,
          example: R`[project]
name = "tidy-tools"
version = "0.1.0"
description = "My file automation scripts"
requires-python = ">=3.10"
dependencies = []

[project.scripts]
tidy = "tidy_tools.organize:main"
dupes = "tidy_tools.dupes:main"

[build-system]
requires = ["setuptools>=68"]
build-backend = "setuptools.build_meta"`,
          try: R`اعمل الشكل ده: [[tidy-tools/pyproject.toml]] (المثال) و [[tidy-tools/src/tidy_tools/__init__.py]] فاضي، وانسخ [[organize_downloads.py]] لـ [[src/tidy_tools/organize.py]]، واعمل [[dupes.py]] فيه [[main()]] بسيطة. سطّبه بـ [[pip install -e ./tidy-tools]] في venv وجرّب [[tidy --help]]. وبعدين [[pipx install ./tidy-tools]] وشوف [[pipx list]]. وبعدين ضيف أمر [[hi]] مكتوب بـ click.`,
          flag: "script",
          deep: {
            why: R`سكربت في فولدر بتشغّله بـ [[~/scripts/.venv/bin/python ~/scripts/organize.py]] محدش بيفتكره. أمر اسمه [[tidy]] موجود في كل ترمنال، وبيتسطّب على جهاز جديد بأمر واحد من git، وكل dependencies بتاعته معزولة.`,
            how: R`[[[project] ]]: الاسم والنسخة والـ dependencies ([[dependencies = ["click>=8"] ]] مثلًا). و [[requires-python]] بيمنع التسطيب على Python أقدم.

[[[project.scripts] ]]: كل سطر [[اسم_الأمر = "الموديول:الدالة"]]. وقت التسطيب بيتعمل ملف صغير في [[bin]] (أو [[.exe]] على ويندوز) بيعمل import للدالة وينادي [[sys.exit(main())]]. يعني main اللي بترجّع رقم بقت exit code لوحدها، و [[if __name__ == "__main__"]] مش ضرورية هنا (سيبها عشان التشغيل المباشر).

[[[build-system] ]]: مين بيبني الـ package. setuptools بيلاقي [[src/tidy_tools]] لوحده. (و [[uv init --package]] بيعمل كل ده بـ build backend بتاعه.)

[[pip install -e .]] (editable): التعديل في الكود بيظهر على طول من غير تسطيب تاني. مناسب وانت بتطوّر. [[pipx install .]] نسخة ثابتة في venv لوحدها: بعد أي تعديل [[pipx install --force .]] أو [[pipx install --editable .]] من الأول.

الدالة ممكن تبقى مكتوبة بـ argparse أو click أو typer. click: [[@click.command()]] و [[@click.argument("name")]] و [[@click.option("--shout", is_flag=True)]] فوق دالة، والسطر [[hi = "tidy_tools.hello:cli"]]. و typer: [[app = typer.Typer()]] والسطر يشاور على [[app]] (درس «argparse و typer» في تاب «Python و FastAPI»). الاتنين بيعملوا الـ help والتحقق من الأنواع، و click هو اللي typer مبني عليه.`,
            when: "أدواتك الشخصية اللي بتستخدمها كل يوم، وأدوات للفريق (يسطّبوها من git: [[pipx install git+https://github.com/you/tidy-tools]]).",
            mistakes: R`[[sudo pip install .]] على النظام (درس «externally-managed-environment»). واسم الأمر زي أمر موجود ([[test]] أو [[find]]) فيغطّي عليه. وتعدّل الكود وتنسى إن pipx عنده نسخة قديمة. وملفات الكود بره [[src/tidy_tools]] فمتدخلش في الـ package وتطلع [[ModuleNotFoundError]] بعد التسطيب بس.`
          },
          teach: R`## الفكرة في سطرين

المثال ملف [[pyproject.toml]]، وده مش كود بيتشغّل، ده **وصف** للـ package: اسمها إيه، ومحتاجة إيه، وفيها أنهي أوامر. وأي أداة تسطيب ([[pip]] أو [[pipx]] أو [[uv]]) بتقراه وتعمل الباقي. الملف مكتوب بلغة اسمها **TOML** (اختصار Tom's Obvious Minimal Language): أقسام اسمها بين قوسين مربعين زي [[[project] ]]، وتحت كل قسم سطور [[مفتاح = قيمة]].

---

## ١. شكل الفولدر اللي الملف ده بيوصفه

~~~text شكل المشروع
tidy-tools/
├── pyproject.toml          المثال
└── src/
    └── tidy_tools/         اسم الـ package في Python (بـ _ مش -)
        ├── __init__.py     فاضي: بيقول «الفولدر ده package»
        ├── organize.py     فيه def main()
        └── dupes.py        فيه def main()
~~~

ليه [[src/]]؟ ده اسمه **src layout**: الكود جوه فولدر فرعي، فمتقدرش تعمل [[import tidy_tools]] بالغلط من الفولدر الحالي من غير تسطيب. يعني لو اشتغل عندك، هيشتغل عند غيرك. و [[setuptools]] بيدوّر في [[src/]] لوحده.

---

## ٢. قسم [[[project] ]]: بيانات الـ package

~~~toml
[project]
name = "tidy-tools"
version = "0.1.0"
description = "My file automation scripts"
requires-python = ">=3.10"
dependencies = []
~~~

| السطر | معناه |
|---|---|
| [[name]] | الاسم اللي بيظهر في [[pip list]] و [[pipx list]]. ممكن فيه [[-]]، مش لازم يبقى زي اسم الفولدر |
| [[version]] | النسخة، والعادة شكل [[major.minor.patch]] |
| [[description]] | سطر وصف، بيظهر في [[pip show]] تحت [[Summary]] |
| [[requires-python]] | [[>=3.10]] يعني «3.10 أو أحدث». pip بيرفض التسطيب على Python أقدم بدل ما الكود يقع بعدين |
| [[dependencies]] | list المكتبات اللي محتاجها، بنفس شكل [[pip install]]: [[["click>=8"] ]]. هنا فاضية [[[] ]] لأن السكربتين بالمكتبة الأساسية بس |

جربت [[pip show tidy-tools]] بعد التسطيب في [[python:3.13-slim]]:

~~~text الناتج
Name: tidy-tools
Version: 0.1.0
Summary: My file automation scripts
~~~

---

## ٣. قسم [[[project.scripts] ]]: ده قلب الدرس

~~~toml
[project.scripts]
tidy = "tidy_tools.organize:main"
dupes = "tidy_tools.dupes:main"
~~~

النقطة في [[project.scripts]] معناها «قسم [[scripts]] جوه [[project]]». وكل سطر بيتقري كده:

~~~text تفكيك السطر
tidy   =   "tidy_tools.organize   :   main"
اسم الأمر   الموديول (فولدر.ملف)   :   الدالة اللي هتتنادى
~~~

- الشمال: اسم الأمر اللي هتكتبه في الترمنال.
- [[tidy_tools.organize]]: الملف [[src/tidy_tools/organize.py]]، بنفس كتابة [[import]] (نقطة بدل [[/]] ومن غير [[.py]]).
- [[:main]]: النقطتين بتفصل الموديول عن اسم الدالة جواه.

### التسطيب بيعمل إيه بالسطر ده؟

بيعمل ملف صغير اسمه [[tidy]] في فولدر [[bin]] بتاع الـ venv (وعلى ويندوز [[tidy.exe]] في [[Scripts]]). ده الملف اللي اتعمل فعلًا لما سطّبت في [[python:3.13-slim]] (عرضته بـ [[cat /venv/bin/tidy]]):

~~~python
#!/venv/bin/python
import sys
from tidy_tools.organize import main
if __name__ == '__main__':
    sys.argv[0] = sys.argv[0].removesuffix('.exe')
    sys.exit(main())
~~~

- السطر الأول (الـ shebang) بيشاور على Python بتاع الـ venv بالمسار الكامل. عشان كده الأمر شغال من غير [[activate]]: هو أصلًا عارف يروح لأنهي Python.
- [[from tidy_tools.organize import main]]: نفس الكلام اللي كتبته في السطر.
- [[sys.exit(main())]]: اللي [[main]] بترجّعه بيبقى الـ exit code. ترجّع [[0]] = نجح، [[2]] = استخدام غلط. ولو رجّعت [[None]] (زي [[organize.py]] اللي [[main]] فيه [[-> None]]) الـ exit code بيبقى [[0]].

### جرّبته

~~~bash
python -m venv /venv
/venv/bin/pip install -q -e ./tidy-tools
ls /venv/bin | grep -E "tidy|dupes"
/venv/bin/tidy --help
~~~

~~~text الناتج (python:3.13-slim)
dupes
tidy
usage: tidy [-h] [--apply] [folder]

Sort a folder into subfolders by file type. Dry run unless --apply.

positional arguments:
  folder

options:
  -h, --help  show this help message and exit
  --apply     really move the files
~~~

[[-q]] = quiet (اطبع أقل)، و [[-e]] = editable: الـ venv بيشاور على الكود في مكانه بدل ما ينسخه، فأي تعديل في [[organize.py]] بيبان على طول. اتأكدت: [[tidy_tools.organize.__file__]] طلع [[/w/tidy-tools/src/tidy_tools/organize.py]]، يعني الملف الأصلي نفسه.

---

## ٤. قسم [[[build-system] ]]: مين بيبني

~~~toml
[build-system]
requires = ["setuptools>=68"]
build-backend = "setuptools.build_meta"
~~~

pip نفسه مش بيعرف يحوّل الفولدر لـ package. بيقرا القسم ده وبيسلّم الشغلانة لأداة تانية اسمها **build backend**:

- [[requires]]: الأدوات اللي لازم تتسطّب (في بيئة مؤقتة) عشان البنا يتم. هنا [[setuptools]] نسخة 68 أو أحدث.
- [[build-backend]]: اسم الموديول اللي pip هينادي عليه. [[setuptools.build_meta]] هو الواجهة الرسمية بتاعة setuptools.

---

## ٥. [[pipx install]]: نفس الكلام من غير venv بإيدك

~~~bash
pipx install ./tidy-tools
pipx list
~~~

~~~text الناتج (python:3.13-slim، pipx متسطّب جوه الـ container)
installing tidy-tools from spec '/w/tidy-tools'...
⚠️  Note: '/root/.local/bin' is not on your PATH environment variable. ...
done! ✨ 🌟 ✨
  installed package tidy-tools 0.1.0, installed using Python 3.13.16
  These apps are now available
    - dupes
    - tidy
~~~

pipx عمل venv مخصوص للـ package دي لوحدها (في [[~/.local/share/pipx/venvs]])، وحط [[tidy]] و [[dupes]] في [[~/.local/bin]]. والتحذير معناه إن الفولدر ده مش في الـ PATH جوه الـ container، فـ [[pipx ensurepath]] بيضيفه. على جهازك العادي غالبًا مش هيظهر.

---

## ٦. الـ solCode: أمر [[hi]] بـ click

~~~python
import click

@click.command()
@click.argument("name")
@click.option("--shout", is_flag=True, help="uppercase")
def cli(name: str, shout: bool) -> None:
    """Say hello."""
    msg = f"hello {name}"
    click.echo(msg.upper() if shout else msg)
~~~

- [[@]] قبل اسم = **decorator**: دالة بتلف الدالة اللي تحتها وتزوّد عليها. التلاتة هنا بيتقروا من تحت لفوق، بس النتيجة: [[cli]] بقت أمر ترمنال.
- [[@click.command()]]: حوّل [[cli]] لأمر. ومن غير الـ decorator ده [[cli]] دالة عادية محتاجة arguments.
- [[@click.argument("name")]]: argument إجباري بالترتيب، وبيتبعت للدالة في [[name]].
- [[@click.option("--shout", is_flag=True, ...)]]: option اختياري. [[is_flag=True]] يعني مالوش قيمة: موجود = [[True]]، مش موجود = [[False]]. و [[help]] النص اللي بيظهر في [[--help]].
- [["""Say hello."""]]: الـ docstring بقى وصف الأمر في [[--help]].
- [[click.echo]] زي [[print]] بس بيتعامل أحسن مع الـ encoding والـ pipes.
- [[msg.upper() if shout else msg]]: لو [[shout]] حروف كبيرة، غير كده زي ما هي.

وفي [[pyproject.toml]] زوّدت سطرين: [[dependencies = ["click>=8"] ]] و [[hi = "tidy_tools.hello:cli"]] (هنا الدالة اسمها [[cli]] مش [[main]]). ونتيجة التشغيل في [[python:3.13-slim]]:

~~~text الناتج
$ hi Sara --shout
HELLO SARA
$ hi Sara
hello Sara
$ hi
Usage: hi [OPTIONS] NAME
Try 'hi --help' for help.

Error: Missing argument 'NAME'.
$ echo $?
2
$ hi --help
Usage: hi [OPTIONS] NAME

  Say hello.

Options:
  --shout  uppercase
  --help   Show this message and exit.
~~~

و [[pip list]] بعدها فيه [[click 8.5.0]]: اتسطّب لوحده لأنه مكتوب في [[dependencies]].

---

## ٧. على ويندوز

جربته في venv بـ Python 3.14: [[pip install -e]] عمل [[tidy.exe]] و [[dupes.exe]] و [[hi.exe]] في [[venv\Scripts]]، و [[hi.exe Sara --shout]] طبع [[HELLO SARA]]. الفرق الوحيد: سطر الـ usage في [[tidy --help]] بقى فيه المسار الكامل:

~~~text الناتج (Windows، Python 3.14)
usage: python.exe C:\Users\ali\...\venvw\Scripts\tidy
       [-h] [--apply] [folder]
~~~

ده سلوك جديد في argparse بتاع 3.14 (بيكتب إزاي البرنامج اتشغّل). الحل لو عايز الاسم ثابت: [[argparse.ArgumentParser(prog="tidy")]].

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[[project] ]] | الاسم والنسخة والمكتبات وأقل Python |
| [[[project.scripts] ]] | [[الأمر = "موديول:دالة"]]، والتسطيب بيعمل ملف في [[bin]] أو [[Scripts]] |
| [[[build-system] ]] | مين بيبني الـ package (هنا setuptools) |
| [[pip install -e .]] | جوه venv، والتعديلات بتبان على طول، مناسب وانت بتطوّر |
| [[pipx install .]] | venv لوحده للأداة، والأوامر في [[~/.local/bin]]، نسخة ثابتة لحد ما تسطّب تاني |`,
          lines: [
            "بيانات الـ package:",
            "الاسم (بيظهر في pip و pipx).",
            "النسخة.",
            "وصف.",
            "أقل Python.",
            "المكتبات اللي محتاجها (هنا ولا حاجة).",
            "الأوامر:",
            "tidy = دالة main في tidy_tools/organize.py.",
            "أمر تاني من نفس الـ package.",
            "مين بيبني:",
            "setuptools.",
            "الـ backend بتاعه."
          ],
          sol: R`جربته على أوبونتو 24.04. بعد [[pip install -e ./tidy-tools]] في venv، فولدر [[venv/bin]] بقى فيه [[tidy]] و [[dupes]]، و [[tidy --help]] طبع [[usage: tidy [-h] [--apply] [folder]]]، و [[dupes /tmp]] طبع [[scanning /tmp]] و exit 0. والملف [[venv/bin/tidy]] نفسه 8 سطور، أهمهم [[from tidy_tools.organize import main]] و [[sys.exit(main())]].

[[pipx install ./tidy-tools]]:

[[installed package tidy-tools 0.1.0, installed using Python 3.12.3]]
[[These apps are now globally available]] و [[- dupes]] و [[- tidy]]

و [[uv tool install ./tidy-tools]] طلّع [[Installed 2 executables: dupes, tidy]]. ولما [[~/.local/bin]] مكانش في الـ PATH حذّرني: [[warning: ... is not on your PATH ... or uv tool update-shell]]، و [[uv tool update-shell]] بيحلها.

وعلى ويندوز [[pip install -e]] عمل [[tidy.exe]] و [[dupes.exe]] في [[venv\Scripts]] وشغالين. بس مع Python 3.14 سطر الـ usage بقى [[usage: python.exe C:\...\venv\Scripts\tidy [-h] [--apply] [folder]]]: argparse في 3.14 بقى يكتب إزاي البرنامج اتشغّل. الأمر شغال عادي، ولو عايز الاسم ثابت اكتب [[argparse.ArgumentParser(prog="tidy", ...)]].

والأمر [[hi]] بـ click (الكود تحت): [[hi Sara --shout]] طبع [[HELLO SARA]]، و [[hi]] من غير اسم: [[Error: Missing argument 'NAME'.]] و exit 2. و click اتسطّب لوحده لأنه في dependencies.`,
          solCode: R`# src/tidy_tools/hello.py
import click

@click.command()
@click.argument("name")
@click.option("--shout", is_flag=True, help="uppercase")
def cli(name: str, shout: bool) -> None:
    """Say hello."""
    msg = f"hello {name}"
    click.echo(msg.upper() if shout else msg)

# وفي pyproject.toml:
#   dependencies = ["click>=8"]
#   [project.scripts]
#   hi = "tidy_tools.hello:cli"`
        },
        {
          cmd: "# /// script",
          title: "سكربت ملف واحد شايل الـ dependencies بتاعته",
          desc: R`سكربت محتاج [[requests]] و [[rich]]: لازم venv و pip install قبل ما يشتغل، والمكتبات مكتوبة في مكان تاني. PEP 723 بيحطهم جوه السكربت نفسه في تعليق بشكل معيّن: [[# /// script]] و [[# dependencies = [...] ]] و [[# ///]].

[[uv run script.py]] بيقرا التعليق ده، ويعمل بيئة مؤقتة فيها المكتبات (ويحفظها في cache للمرة الجاية)، ويشغّل. ملف واحد تبعته لحد، يشغّله بأمر واحد. و [[pipx run script.py]] بيفهم نفس الشكل.`,
          example: R`#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = [
#   "requests<3",
#   "rich",
# ]
# ///
import sys
import requests
from rich.console import Console
from rich.table import Table
packages = sys.argv[1:] or ["requests", "fastapi", "pytest"]
table = Table(title="Latest on PyPI")
table.add_column("package")
table.add_column("version", justify="right")
for name in packages:
    r = requests.get(f"https://pypi.org/pypi/{name}/json", timeout=10)
    table.add_row(name, r.json()["info"]["version"] if r.ok else f"HTTP {r.status_code}")
Console().print(table)`,
          try: R`سطّب uv ([[pipx install uv]] أو من موقعه). شغّل [[uv run pypi_versions.py]] مرتين بـ [[time]]. وبعدين [[chmod +x pypi_versions.py]] و [[./pypi_versions.py typer no-such-pkg-xyz-123]]. وجرّب [[uv init --script new_tool.py]] و [[uv add --script new_tool.py httpx]] وبص على أول الملف.`,
          flag: "script",
          deep: {
            why: R`السكربت الصغير اللي محتاج مكتبة واحدة كان بيعمل واحدة من اتنين: يا تسطّب المكتبة على النظام (ممنوع على أوبونتو الجديد، درس «externally-managed-environment»)، يا venv لكل سكربت. PEP 723 بيخلي السكربت مكتفي بنفسه.`,
            how: R`البلوك لازم يبدأ بـ [[# /// script]] بالظبط وينتهي بـ [[# ///]]، وكل سطر بينهم بيبدأ بـ [[#]]. اللي جواه TOML: [[requires-python]] و [[dependencies]] بنفس شكل pyproject.toml. ولأنهم تعليقات، Python العادي بيتجاهلهم.

[[uv run]] أول مرة بيحمّل المكتبات وبيحفظها في cache، والمرات اللي بعدها مش بتحمّل حاجة (الوقت الباقي هو طلبات السكربت نفسه). ولو [[requires-python]] أحدث من الموجود عندك، uv ممكن يحمّل Python نفسه.

[[#!/usr/bin/env -S uv run --script]]: [[-S]] بيخلي env يقسم الكلام لأكتر من argument (من غيرها env بيدوّر على برنامج اسمه [["uv run --script"]] كله). بعد chmod، [[./pypi_versions.py]] بيشتغل كأي أمر.

[[uv add --script file.py httpx]] بيضيف المكتبة للبلوك (ويعمله لو مش موجود)، و [[uv init --script]] بيعمل ملف جديد بالبلوك فاضي. و [[uv lock --script]] بيثبّت النسخ بالظبط في ملف lock جنبه لو عايزه يشتغل بنفس النسخ بعد سنة.

[[r.ok]] بدل [[raise_for_status]] هنا لأن package مش موجودة نتيجة عادية في الجدول مش error.`,
            when: "سكربت ملف واحد محتاج مكتبة أو اتنين، بتشاركه مع حد أو بتشغّله على أكتر من جهاز. لو بقى كذا ملف، اعمله package (الدرس اللي فات).",
            mistakes: R`البلوك مش في أول الملف أو فيه سطر من غير [[#]] فيتجاهل من غير error، والسكربت يقع بـ [[ModuleNotFoundError]]. و [[python3 script.py]] على أمل إنه يسطّب: Python مبيقراش البلوك. والـ shebang من غير [[-S]].`
          },
          teach: R`## السكربت بيعمل إيه؟

بياخد أسماء packages من الترمنال (أو ٣ افتراضيين)، ويسأل PyPI (المخزن اللي [[pip]] بيحمّل منه) عن آخر نسخة لكل واحدة، ويطبعهم في جدول. وبيحتاج مكتبتين مش في Python الأساسي: [[requests]] للطلبات و [[rich]] للجدول. والجديد في الدرس إن المكتبتين مكتوبين **جوه السكربت نفسه**.

---

## ١. الـ shebang

~~~python
#!/usr/bin/env -S uv run --script
~~~

أول سطر بيبدأ بـ [[#!]] (اسمه shebang) بيقول للينكس والماك «شغّل الملف ده بالبرنامج ده» لما تكتب [[./pypi_versions.py]]. ونفكّه:

| الحتة | معناها |
|---|---|
| [[/usr/bin/env]] | برنامج بيدوّر على الأمر اللي بعده في الـ PATH (بدل ما تكتب مسار uv الكامل) |
| [[-S]] | split: قسّم الكلام اللي بعدي على المسافات لأكتر من argument |
| [[uv run --script]] | البرنامج اللي هيشغّل الملف، و [[--script]] معناها «اعتبره سكربت PEP 723» |

من غير [[-S]]، الكيرنل بيبعت كل اللي بعد [[env]] كـ argument **واحد**، فـ env يدوّر على برنامج اسمه حرفيًا [["uv run --script"]] بالمسافات، ومش هيلاقيه. وعلى ويندوز السطر ده مجرد تعليق، وبتشغّل بـ [[uv run pypi_versions.py]].

---

## ٢. بلوك PEP 723

~~~python
# /// script
# requires-python = ">=3.11"
# dependencies = [
#   "requests<3",
#   "rich",
# ]
# ///
~~~

PEP (اختصار Python Enhancement Proposal) وثيقة رسمية بتضيف حاجة لـ Python، و 723 رقمها. القواعد:

- يبدأ بـ [[# /// script]] بالظبط، وينتهي بـ [[# ///]].
- كل سطر بينهم بيبدأ بـ [[#]]، فـ Python العادي شايفهم تعليقات ومبيعملش بيهم حاجة.
- اللي بعد [[#]] هو TOML، بنفس شكل [[pyproject.toml]] (الدرس اللي فات).
- [[requires-python = ">=3.11"]]: أقل نسخة. لو اللي عندك أقدم، uv ممكن يحمّل نسخة مناسبة.
- [[dependencies]]: [["requests<3"]] يعني أي نسخة أقل من 3 (عشان تغيير كبير في نسخة 3 ميكسرش السكربت)، و [["rich"]] أي نسخة.

---

## ٣. الكود نفسه

~~~python
import sys
import requests
from rich.console import Console
from rich.table import Table
packages = sys.argv[1:] or ["requests", "fastapi", "pytest"]
~~~

- [[sys.argv]] list الكلام اللي اتكتب في الترمنال، وأوله اسم السكربت. [[sys.argv[1:] ]] كل اللي بعد الاسم.
- [[or]]: لو الـ list فاضية (مكتبتش أسماء) فهي false، فبياخد اللي بعد [[or]]. يعني «الأسماء، أو اللستة دي».
- [[Console]] الحتة اللي بتطبع بألوان في rich، و [[Table]] الجدول.

~~~python
table = Table(title="Latest on PyPI")
table.add_column("package")
table.add_column("version", justify="right")
~~~

جدول بعنوان، وعمودين. [[justify="right"]] بيخلي الأرقام محاذية يمين عشان النقط تيجي تحت بعض.

~~~python
for name in packages:
    r = requests.get(f"https://pypi.org/pypi/{name}/json", timeout=10)
    table.add_row(name, r.json()["info"]["version"] if r.ok else f"HTTP {r.status_code}")
Console().print(table)
~~~

- [[f"...{name}..."]]: f-string، [[{name}]] بيتبدّل بقيمة المتغير. فالرابط بيبقى [[https://pypi.org/pypi/requests/json]]: PyPI بيرجّع بيانات أي package كـ JSON على الشكل ده.
- [[timeout=10]]: لو مفيش رد في 10 ثواني ارمي error بدل ما تستنى للأبد.
- [[r.ok]]: [[True]] لو الكود أقل من 400. ولو الـ package مش موجودة PyPI بيرد 404، و [[r.ok]] بـ [[False]]، فبنكتب [[HTTP 404]] في الجدول بدل ما السكربت يقع.
- [[r.json()["info"]["version"] ]]: حوّل الرد لـ dict، وخد منه [[info]]، ومنها [[version]].
- [[A if شرط else B]]: لو الشرط صح A، غير كده B، في سطر واحد.
- [[Console().print(table)]]: اطبع الجدول.

---

## ٤. تشغيله بـ uv

جربته في [[python:3.13-slim]] (uv 0.12.23 متسطّب بـ pip جوه الـ container):

~~~bash
time uv run pypi_versions.py
~~~

~~~text الناتج (أول مرة)
Downloading pygments (1.2MiB)
 Downloaded pygments
Installed 9 packages in 27ms
    Latest on PyPI
┏━━━━━━━━━━┳━━━━━━━━━┓
┃ package  ┃ version ┃
┡━━━━━━━━━━╇━━━━━━━━━┩
│ requests │  2.34.2 │
│ fastapi  │ 0.142.2 │
│ pytest   │   9.1.1 │
└──────────┴─────────┘

real	0m4.057s
~~~

ليه ٩ مش ٢؟ [[requests]] و [[rich]] نفسهم محتاجين مكتبات تانية (زي [[urllib3]] و [[idna]] و [[pygments]] اللي بيلوّن)، و uv سطّبهم كلهم. و [[time]] قبل أي أمر بيطبع مدته: [[real]] الوقت الحقيقي اللي عدّى.

المرة التانية: نفس الجدول من غير ولا سطر تحميل، و [[real 0m1.077s]]. البيئة اتحفظت في الـ cache بتاع uv، واللي فاضل هو التلات طلبات لـ PyPI.

---

## ٥. كأمر لوحده

~~~bash
chmod +x pypi_versions.py
./pypi_versions.py typer no-such-pkg-xyz-123
~~~

[[chmod +x]] بيدّي الملف صلاحية التشغيل (x = execute)، و [[./]] يعني «الملف اللي في الفولدر ده». الـ shebang اشتغل:

~~~text الناتج
          Latest on PyPI
┏━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━┓
┃ package             ┃  version ┃
┡━━━━━━━━━━━━━━━━━━━━━╇━━━━━━━━━━┩
│ typer               │   0.27.3 │
│ no-such-pkg-xyz-123 │ HTTP 404 │
└─────────────────────┴──────────┘
~~~

---

## ٦. uv بيكتب البلوك بداله

~~~bash
uv init --script new_tool.py
uv add --script new_tool.py httpx
head -8 new_tool.py
~~~

~~~text الناتج
# /// script
# requires-python = ">=3.13"
# dependencies = [
#     "httpx>=0.28.1",
# ]
# ///
~~~

[[uv init --script]] عمل ملف جديد بالبلوك (و [[requires-python]] = نسخة Python اللي عندك)، و [[uv add --script]] زوّد [[httpx]] بأقل نسخة هي آخر نسخة وقتها.

---

## ٧. والدليل إن Python العادي مبيقراش البلوك

~~~bash
python3 pypi_versions.py
~~~

~~~text الناتج (نفس الـ container النضيف)
    import requests
ModuleNotFoundError: No module named 'requests'
~~~

البلوك مجرد تعليقات. اللي بيفهمه أدوات زي [[uv run]] و [[pipx run]].

### على ويندوز

جربته في PowerShell بـ uv متسطّب في venv: أول مرة [[Installed 9 packages]] وطلع نفس الجدول (بإطار رفيع بدل التقيل)، في 8.8 ثانية، والتانية 1.5 ثانية. والـ shebang و [[chmod]] مالهمش لازمة هناك.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[#!/usr/bin/env -S uv run --script]] | على لينكس وماك: [[./script.py]] يتشغّل بـ uv |
| [[# /// script]] ... [[# ///]] | المكتبات ونسخة Python جوه السكربت، كتعليقات |
| [[uv run script.py]] | يقرا البلوك، يعمل بيئة (ويحفظها cache)، يشغّل |
| [[uv add --script f.py pkg]] | يضيف مكتبة للبلوك من غير ما تكتبه بإيدك |
| [[python3 script.py]] | بيتجاهل البلوك، فالمكتبات لازم تبقى متسطبة |`,
          lines: [
            "sys.",
            "من الـ dependencies.",
            "rich للعرض.",
            "جدول.",
            "الأسماء من الـ arguments أو لستة افتراضية.",
            "جدول بعنوان.",
            "عمود.",
            "عمود على اليمين.",
            "لكل package:",
            "اسأل PyPI.",
            "النسخة، أو الـ status لو مش موجودة.",
            "اطبع الجدول."
          ],
          sol: R`جربته بـ uv 0.12 على لينكس بعد [[uv cache clean]]. أول [[uv run]] كتب [[Downloading pygments (1.2MiB)]] و [[Installed 9 packages in 33ms]] وبعدين الجدول:

[[│ requests │  2.34.2 │]]
[[│ fastapi  │ 0.142.2 │]]
[[│ pytest   │   9.1.1 │]]

في 4.6 ثانية. التانية 1.6 ثانية، ومحمّلتش حاجة؛ الباقي هو التلات طلبات لـ PyPI. (النسخ هتبقى أحدث عندك.)

[[./pypi_versions.py typer no-such-pkg-xyz-123]] اشتغل من الـ shebang وطلع [[typer 0.27.2]] و [[no-such-pkg-xyz-123  HTTP 404]].

[[uv init --script new_tool.py]] عمل ملف أوله [[# /// script]] و [[# requires-python = ">=3.13"]] (نسخة Python اللي عندي، عندك هتبقى نسختك) و [[# dependencies = []]] ودالة main. وبعد [[uv add --script new_tool.py httpx]] بقى [[#     "httpx>=0.28.1",]] جوه dependencies.

و [[pipx run pypi_versions.py requests]] على أوبونتو 24.04 (pipx 1.4.3) فهم البلوك وطبع الجدول. أما [[python3 pypi_versions.py]] على نفس الجهاز النضيف فوقع بـ [[ModuleNotFoundError: No module named 'requests']]: Python العادي مبيقراش البلوك.

على ويندوز الـ shebang و chmod مالهمش لازمة: [[uv run pypi_versions.py]] بس.`
        },
        {
          cmd: "cron و Task Scheduler",
          title: "شغّل السكربت لوحده كل يوم",
          desc: R`على لينكس (والسيرفرات) [[cron]]: سطر في [[crontab -e]] فيه الميعاد (دقيقة، ساعة، يوم في الشهر، شهر، يوم في الأسبوع) والأمر. على ويندوز Task Scheduler، ومن الترمنال [[schtasks]]. على ماك cron شغال، والطريقة الرسمية launchd.

وأهم حاجة: البيئة اللي cron بيشغّل فيها فقيرة جدًا. مفيش venv متفعّل، والـ PATH قصير، ومفيش [[~/.bashrc]]، والفولدر الحالي هو الـ home. فكل حاجة بمسار كامل، والناتج والأخطاء يتكتبوا في ملف.`,
          example: R`# Linux (and WSL):
crontab -e
# كل يوم الساعة 2 بالليل:
0 2 * * * cd /home/sara/scripts && .venv/bin/python backup_zip.py /home/sara/projects /home/sara/backups >> logs/backup.log 2>&1
# كل 5 دقايق، ومتبدأش نسخة تانية لو اللي قبلها لسه شغالة:
*/5 * * * * /usr/bin/flock -n /tmp/uptime.lock /usr/bin/python3 /home/sara/scripts/uptime_check.py /home/sara/scripts/urls.txt >> /home/sara/scripts/logs/uptime.log 2>&1
crontab -l
journalctl -u cron -n 20
# Windows (PowerShell):
schtasks /Create /TN "Backup" /SC DAILY /ST 02:00 /TR "C:\Users\sara\scripts\.venv\Scripts\python.exe C:\Users\sara\scripts\backup_zip.py C:\Users\sara\Documents D:\backups"
schtasks /Query /TN "Backup" /V /FO LIST
schtasks /Run /TN "Backup"`,
          try: R`حاكي بيئة cron من غير ما تستنى: من الـ home شغّل [[env -i HOME=$HOME PATH=/usr/bin:/bin /bin/sh -c "python3 uptime_check.py urls.txt"]] وشوف الرسالة. وبعدين نفس الأمر بـ [[cd /full/path && ...]]. وجرّب الـ lock: [[flock -n /tmp/u.lock sleep 30 &]] وبعدها على طول [[flock -n /tmp/u.lock echo second; echo $?]]. ولو عايز cron بجد: سطر [[* * * * * date >> /tmp/cron-test.txt]] واستنى دقيقتين. ده كله لينكس (و WSL)؛ على ويندوز جرّب أوامر schtasks اللي في المثال على سكربت تجربة، وامسح الـ task بعدها بـ [[schtasks /Delete /TN "Backup" /F]].`,
          deep: {
            why: R`سكربت الـ backup والتنضيف ومراقبة المواقع فايدتهم إنهم يشتغلوا من غير ما تفتكر. وأغلب مشاكل «السكربت شغال لما أشغّله وبيفشل في cron» سببها واحد: البيئة مختلفة.`,
            how: R`الميعاد: [[0 2 * * *]] الدقيقة 0 الساعة 2 كل يوم. [[*/5 * * * *]] كل 5 دقايق. [[0 9 * * 1-5]] 9 الصبح من الاتنين للجمعة. [[0 3 1 * *]] أول كل شهر. الموقع crontab.guru بيشرح أي سطر.

[[cd /home/sara/scripts && ...]]: كده المسارات النسبية جوه الأمر وجوه السكربت شغالة. و [[.venv/bin/python]] مباشرة بدل activate (cron مش بيقرا activate). والـ [[python3]] و [[flock]] بمسارهم الكامل.

[[>> log 2>&1]]: الـ stdout والـ stderr الاتنين في ملف. من غيرها الناتج بيتبعت إيميل محلي محدش بيقراه، أو بيضيع.

[[flock -n file]]: لو نسخة قديمة لسه شغالة وماسكة الـ lock، الجديدة بتخرج على طول بـ 1 بدل ما تشتغل جنبها (uptime كل 5 دقايق وموقع معلّق = نسخ بتتراكم).

متغيرات البيئة: cron مبيقراش [[~/.bashrc]]، فالأسرار في [[.env]] جنب السكربت (درس «os.environ و .env») أو سطر [[API_TOKEN=...]] فوق في الـ crontab.

[[journalctl -u cron]] بيوريك cron شغّل إيه وإمتى (على بعض التوزيعات اسم الخدمة [[crond]]، أو [[grep CRON /var/log/syslog]]).

ويندوز: [[/SC DAILY /ST 02:00]] كل يوم 2 بالليل، و [[/TR]] الأمر بمسارات كاملة. الـ task بيبدأ في [[C:\Windows\System32]] لو ماحددتش «Start in» من الواجهة، عشان كده المسارات كاملة أو [[Path(__file__)]] جوه السكربت. و [[pythonw.exe]] بدل [[python.exe]] لو مش عايز شباك أسود يظهر، بس ساعتها مفيش console فلازم logging لملف. ولو الجهاز مقفول ساعة الميعاد، من الواجهة فعّل «Run task as soon as possible after a scheduled start is missed».

وليه مش [[while True: ... time.sleep(3600)]]؟ لو السكربت وقع أو الجهاز عمل restart محدش بيشغّله تاني، والذاكرة محجوزة طول الوقت. الـ scheduler بيشغّل نسخة نضيفة كل مرة. ولو محتاج حاجة شغالة على طول فعلًا، خليها service بـ systemd (تاب «VPS»). وعلى السيرفرات الحديثة systemd timers بديل لـ cron فيه logs أحسن.`,
            when: "أي سكربت المفروض يشتغل في ميعاد: backup بالليل، تنضيف كل أسبوع، مراقبة كل 5 دقايق، تقرير أول الشهر.",
            mistakes: R`[[%]] في crontab معناها سطر جديد، فـ [[date +%Y]] لازم تبقى [[date +\%Y]]. ومسارات نسبية أو [[python]] من غير مسار. ومن غير [[>> log 2>&1]] فمتعرفش ليه فشل. وسكربت فيه [[input()]] فيقع بـ EOFError. وتعدّل crontab بإيدك في [[/var/spool/cron]] بدل [[crontab -e]].`
          },
          teach: R`## الفكرة

**cron** برنامج شغال في الخلفية على لينكس طول الوقت، كل دقيقة بيبص في جداول المستخدمين ويشغّل اللي ميعاده جه. والجدول ده اسمه **crontab** (cron table)، وكل سطر فيه = ميعاد + أمر. وعلى ويندوز نفس الشغلانة بيعملها Task Scheduler، وأمره من الترمنال [[schtasks]].

---

## ١. [[crontab -e]]

[[-e]] = edit: بيفتح الـ crontab بتاعك في editor (أول مرة بيسألك تختار nano أو vim). ولما تحفظ وتقفل، [[crontab]] بيفحص الملف ويسلّمه لـ cron. ومتعدّلش الملف بإيدك في [[/var/spool/cron]]: كده مفيش فحص.

---

## ٢. سطر الـ backup: الميعاد

~~~text
0 2 * * * cd /home/sara/scripts && .venv/bin/python backup_zip.py ... >> logs/backup.log 2>&1
~~~

أول ٥ خانات هما الميعاد، بالترتيب ده:

~~~text الخانات الخمسة
0     2     *          *      *
دقيقة  ساعة  يوم الشهر  الشهر  يوم الأسبوع
0-59  0-23  1-31       1-12   0-7 (0 و 7 = الأحد)
~~~

[[*]] يعني «أي قيمة». فـ [[0 2 * * *]] = الدقيقة 0 من الساعة 2، أي يوم، أي شهر = **كل يوم 2:00 بالليل**. وأمثلة تانية:

| السطر | معناه |
|---|---|
| [[*/5 * * * *]] | [[*/5]] = كل 5: الدقيقة 0 و 5 و 10... يعني كل 5 دقايق |
| [[0 9 * * 1-5]] | 9 الصبح، من الاتنين (1) للجمعة (5) |
| [[0 3 1 * *]] | 3 الفجر يوم 1 في كل شهر |

---

## ٣. سطر الـ backup: الأمر

نفكّه بالترتيب اللي الـ shell بينفّذه بيه:

### [[cd /home/sara/scripts &&]]

cron بيشغّل الأمر من الـ home بتاعك. [[cd]] بينقلك لفولدر السكربت الأول، فأي مسار نسبي بعد كده ([[.venv/...]] و [[backup_zip.py]] و [[logs/...]]) بيتحسب من هناك. و [[&&]] يعني «لو اللي قبلي نجح بس»: لو الفولدر مش موجود، مفيش حاجة تتشغّل في مكان غلط.

### [[.venv/bin/python backup_zip.py ...]]

Python بتاع الـ venv **مباشرة**. مفيش [[source .venv/bin/activate]] لأن activate بس بيغيّر الـ PATH عشان [[python]] يشاور على ده، فنكتب المسار وخلاص. وبعده السكربت والـ arguments بتوعه (الفولدر اللي هيتعمله backup، ومكان الـ zip).

### [[>> logs/backup.log 2>&1]]

| الحتة | معناها |
|---|---|
| [[>>]] | ضيف الـ stdout (الناتج العادي) في آخر الملف (مش [[>]] اللي بيمسح القديم) |
| [[2>]] | الـ stderr، وده رقمه 2 (الأخطاء والـ traceback) |
| [[&1]] | «لنفس المكان اللي 1 (الـ stdout) رايح له» |

فالاتنين بيتكتبوا في الـ log. ومن غيرها الأخطاء بتضيع ومتعرفش السكربت فشل ليه.

---

## ٤. السطر التاني: [[flock]]

~~~text
*/5 * * * * /usr/bin/flock -n /tmp/uptime.lock /usr/bin/python3 /home/sara/scripts/uptime_check.py /home/sara/scripts/urls.txt >> /home/sara/scripts/logs/uptime.log 2>&1
~~~

- كل حاجة بمسار كامل، حتى [[python3]] و [[flock]]. ([[command -v flock python3]] على أوبونتو طلع [[/usr/bin/flock]] و [[/usr/bin/python3]].)
- [[flock -n /tmp/uptime.lock COMMAND]]: flock بيمسك «قفل» على الملف ده ويشغّل الأمر، وبيسيب القفل لما الأمر يخلص. ولو حد تاني ماسك القفل، [[-n]] (non-blocking) بيخليه يخرج على طول بـ 1 بدل ما يستنى.

ليه؟ لو موقع معلّق والسكربت أخد 7 دقايق، cron هيشغّل نسخة تانية بعد 5 دقايق والأولى لسه شغالة، والنسخ تتراكم. جربت القفل في [[ubuntu:24.04]]:

~~~bash
flock -n /tmp/u.lock sleep 30 &
flock -n /tmp/u.lock echo second; echo "exit $?"
~~~

~~~text الناتج
exit 1
~~~

الأولى مسكت القفل ونايمة 30 ثانية ([[&]] شغّلها في الخلفية)، فالتانية خرجت بـ 1 ومطبعتش [[second]] خالص. و [[$?]] = الـ exit code بتاع آخر أمر.

---

## ٥. ليه المسارات الكاملة؟ جرّب بيئة cron بنفسك

cron بيشغّل بـ PATH قصير ومن غير [[~/.bashrc]]. تقدر تحاكي ده بـ [[env -i]] (i = ignore environment: ابدأ من غير ولا متغير) وتدّيه بس اللي cron بيدّيه:

~~~bash
cd /tmp
env -i HOME=/home/sara PATH=/usr/bin:/bin /bin/sh -c "python3 uptime_check.py urls.txt"
echo "exit $?"
~~~

~~~text الناتج (ubuntu:24.04)
python3: can't open file '/tmp/uptime_check.py': [Errno 2] No such file or directory
exit 2
~~~

المسار النسبي اتحسب من الفولدر الحالي، مش من فولدر السكربت. ونفس الأمر بـ [[cd]] الأول:

~~~bash
env -i HOME=/home/sara PATH=/usr/bin:/bin /bin/sh -c "cd /home/sara/scripts && /usr/bin/python3 uptime_check.py urls.txt >> logs/uptime.log 2>&1"
cat /home/sara/scripts/logs/uptime.log
~~~

~~~text الناتج
UP    http://127.0.0.1:8001/health             200 in 19 ms
1/1 up
~~~

و [[env -i PATH=/usr/bin:/bin sh -c 'echo $PATH']] طبع [[/usr/bin:/bin]] بس. فأي أمر في [[~/.local/bin]] (زي uv أو pipx) cron مش هيلاقيه إلا بمساره الكامل.

---

## ٦. cron بجد، ومشكلة [[%]]

في نفس الـ container سطّبت cron وحطيت السطور دي بـ [[crontab -u sara]]، واستنيت دقيقة:

~~~text crontab
* * * * * date >> /tmp/cron-test.txt
* * * * * date +%Y >> /tmp/c1.txt
* * * * * date +\%Y >> /tmp/c2.txt
~~~

~~~text الناتج بعد 70 ثانية
$ ls /tmp/*.txt
/tmp/c2.txt
/tmp/cron-test.txt
$ cat /tmp/cron-test.txt /tmp/c2.txt
Tue Oct  6 17:45:02 UTC 2026
2026
~~~

[[c1.txt]] متعملش أصلًا: في crontab علامة [[%]] معناها «سطر جديد»، فالأمر اتقطع عند [[date +]]. لازم تكتبها [[\%]].

---

## ٧. [[crontab -l]] و [[journalctl]]

- [[crontab -l]] (l = list): اعرض الـ crontab بتاعك من غير ما تفتحه. جربته وطبع نفس السطور اللي حطيتها.
- [[journalctl -u cron -n 20]]: [[journalctl]] بيقرا logs الـ systemd، و [[-u cron]] (u = unit) logs خدمة cron بس، و [[-n 20]] آخر 20 سطر. هتلاقي سطر [[CMD (...)]] لكل مرة cron شغّل حاجة. ده متجرّبش هنا لأن الـ container مفيهوش systemd؛ شكل السطر في الـ sol من سيرفر أوبونتو.

---

## ٨. ويندوز: [[schtasks]]

~~~powershell
schtasks /Create /TN "Backup" /SC DAILY /ST 02:00 /TR "C:\Users\sara\scripts\.venv\Scripts\python.exe C:\Users\sara\scripts\backup_zip.py C:\Users\sara\Documents D:\backups"
~~~

| الحتة | معناها |
|---|---|
| [[/Create]] | اعمل task جديدة |
| [[/TN "Backup"]] | Task Name: اسمها |
| [[/SC DAILY]] | Schedule: كل يوم. وفيه كمان [[MINUTE]] و [[HOURLY]] و [[WEEKLY]] و [[MONTHLY]] و [[ONCE]] و [[ONSTART]] و [[ONLOGON]] (من [[schtasks /Create /?]]) |
| [[/ST 02:00]] | Start Time: الساعة كام |
| [[/TR "..."]] | Task Run: الأمر نفسه، بـ Python الـ venv والسكربت بمسارات كاملة |

والمسارات الكاملة هنا مهمة أكتر: الـ task بتبدأ في [[C:\Windows\System32]].

~~~powershell
schtasks /Query /TN "Backup" /V /FO LIST
~~~

[[/Query]] اعرض، و [[/V]] verbose (كل التفاصيل)، و [[/FO LIST]] (Format) كل خانة في سطر. الـ task دي مش هتتعمل على الجهاز هنا (ممنوع نسيب حاجة متجدولة)، فجربت الأمر على task موجودة في ويندوز أصلًا، وده جزء من الناتج:

~~~text الناتج (Windows 11، على \Microsoft\Windows\Defrag\ScheduledDefrag)
Next Run Time:                        N/A
Last Run Time:                        10/3/2026 8:13:30 PM
Last Result:                          0
Task To Run:                          %windir%\system32\defrag.exe -c -h -o -$
~~~

| الخانة | معناها |
|---|---|
| [[Next Run Time]] | الميعاد الجاي |
| [[Last Run Time]] | آخر مرة اشتغلت |
| [[Last Result]] | الـ exit code بتاع آخر تشغيل: [[0]] نجح. و [[267011]] يعني لسه ما اشتغلتش خالص |
| [[Task To Run]] | الأمر اللي في [[/TR]] |

و [[schtasks /Run /TN "Backup"]] بيشغّلها دلوقتي من غير ما تستنى الميعاد، عشان تتأكد إنها شغالة. ولو الاسم مش موجود، [[/Query]] بيطبع [[ERROR: The system cannot find the file specified.]] و exit 1 (جربتها باسم مش موجود). ونتيجة الـ Create والـ Run الحقيقية في الـ sol.

---

## الخلاصة

| | لينكس (cron) | ويندوز (schtasks) |
|---|---|---|
| اعمل / عدّل | [[crontab -e]] | [[schtasks /Create ...]] |
| اعرض | [[crontab -l]] | [[schtasks /Query /TN ... /V /FO LIST]] |
| شغّل دلوقتي | انسخ الأمر وشغّله من [[env -i]] | [[schtasks /Run /TN ...]] |
| حصل إيه | [[journalctl -u cron]] + log السكربت | [[Last Result]] + log السكربت |
| امسح | امسح السطر في [[crontab -e]] | [[schtasks /Delete /TN ... /F]] |

وفي الاتنين: مسارات كاملة، Python الـ venv مباشرة، والناتج والأخطاء في ملف log.`,
          lines: [
            "افتح الـ crontab بتاعك في editor.",
            "2 بالليل كل يوم: ادخل الفولدر، وشغّل بـ Python بتاع الـ venv، والناتج والأخطاء في log.",
            "كل 5 دقايق، و flock يمنع نسختين في نفس الوقت.",
            "اعرض الـ crontab.",
            "cron شغّل إيه وإمتى (آخر 20 سطر).",
            "ويندوز: task كل يوم 2 بالليل بمسارات كاملة.",
            "تفاصيل الـ task وآخر نتيجة.",
            "شغّله دلوقتي تجربة."
          ],
          sol: R`[[env -i ... python3 uptime_check.py urls.txt]] (شغّلته من [[/tmp]]): [[python3: can't open file '/tmp/uptime_check.py': [Errno 2] No such file or directory]] و exit 2. ده بالظبط اللي cron هيعمله: الفولدر الحالي مش فولدر السكربت.

بالـ [[cd /full/path && /usr/bin/python3 uptime_check.py urls.txt >> logs/uptime.log 2>&1]]: exit 0 والـ log فيه [[UP    http://127.0.0.1:18732/health ... 200 in 36 ms]] و [[1/1 up]].

و [[env -i PATH=/usr/bin:/bin sh -c 'echo $PATH']] طبع [[/usr/bin:/bin]] بس: أي حاجة في [[~/.local/bin]] أو [[/usr/local/bin]] (زي uv) مش هتتلاقي.

الـ lock: التاني خرج على طول، ومطبعش [[second]]، و [[$?]] بـ 1.

وجربت cron بجد في container أوبونتو 24.04: سطر [[* * * * * date >> /tmp/cron-test.txt]] كتب التاريخ بعد أقل من دقيقة. وسطر فيه [[date +%Y >> /tmp/c1.txt]] مكتبش أي ملف خالص (الـ [[%]] قطع السطر)، و [[date +\%Y >> /tmp/c2.txt]] كتب [[2026]].

[[journalctl -u cron -n 20]] على سيرفر أوبونتو بيطلّع سطور زي [[CRON[489168]: (sara) CMD (/usr/bin/python3 /home/sara/scripts/uptime_check.py ...)]]: يعني cron شغّل الأمر فعلًا، وأي مشكلة بعد كده هتلاقيها في الـ log بتاع السكربت نفسه. (ده ماتجربش هنا: الـ container مفيهوش systemd.)

و schtasks جربته على ويندوز 11 من غير Admin، بـ task اسمها تجربة ومسحتها بعدها بـ [[schtasks /Delete /TN "..." /F]]. [[/Create]] طبع [[SUCCESS: The scheduled task "..." has successfully been created.]]. [[/Query /V /FO LIST]] طبع [[Next Run Time]] بكرة الساعة 2:00، و [[Last Result: 267011]] (يعني لسه مااشتغلتش). [[/Run]] شغّلها، والـ zip اتعمل في فولدر الـ backups، و [[Last Result]] بقى [[0]].`
        },
        {
          cmd: "retry و backoff",
          title: "سكربت يستحمل النت الوحش والأخطاء المؤقتة",
          desc: R`سكربت بيكلم الشبكة هيقابل أخطاء مؤقتة: السيرفر رجّع 503 لأنه مشغول، أو الاتصال قطع ثانية. محاولة كمان بعد شوية غالبًا بتنجح. بس مش كل خطأ يستاهل محاولة تانية: 404 أو 401 هيفضلوا زي ما هما.

الشكل الصح: retry للأخطاء المؤقتة بس (5xx و 429 ومشاكل الاتصال)، والانتظار بيتضاعف كل مرة (backoff) ومعاه شوية عشوائية (jitter)، وعدد محاولات محدود. ولو كله فشل، رسالة واضحة و exit code غير صفر.`,
          example: R`#!/usr/bin/env python3
"""Download a URL with retries on temporary errors: fetch_retry.py URL"""
import logging
import random
import sys
import time
import urllib.error
import urllib.request
log = logging.getLogger("fetch")
def is_transient(e: Exception) -> bool:
    if isinstance(e, urllib.error.HTTPError):
        return e.code >= 500 or e.code == 429
    return isinstance(e, (urllib.error.URLError, TimeoutError, ConnectionError))
def retry(fn, attempts: int = 4, base: float = 0.5):
    for i in range(1, attempts + 1):
        try:
            return fn()
        except Exception as e:
            if not is_transient(e) or i == attempts:
                raise
            delay = base * 2 ** (i - 1) + random.uniform(0, base)
            log.warning("attempt %d/%d failed (%s), retrying in %.1fs", i, attempts, e, delay)
            time.sleep(delay)
def fetch(url: str) -> bytes:
    with urllib.request.urlopen(url, timeout=5) as r:
        return r.read()
def main() -> int:
    logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
    if len(sys.argv) != 2:
        log.error("usage: fetch_retry.py URL")
        return 2
    try:
        data = retry(lambda: fetch(sys.argv[1]))
    except KeyboardInterrupt:
        log.warning("interrupted")
        return 130
    except Exception as e:
        log.error("giving up: %s", e)
        return 1
    print(f"got {len(data)} bytes")
    return 0
if __name__ == "__main__":
    sys.exit(main())`,
          try: R`محتاج سيرفر بيفشل ساعات. اعمل [[flaky.py]] بـ [[http.server]] بيرجّع 503 لأول طلبين و 200 للتالت، و 404 على [[/missing]] و 500 دايمًا على [[/boom]] (الكود في الحل). شغّل [[python3 fetch_retry.py http://localhost:8001/flaky]]، وبعدين على [[/missing]] و [[/boom]]، وبعد كل واحدة [[echo $?]] (في PowerShell [[$LASTEXITCODE]]). على ويندوز اكتب [[127.0.0.1]] بدل [[localhost]]: السيرفر سامع على 127.0.0.1 بس، وويندوز بيجرب [[::1]] الأول، فكل طلب لـ localhost كان بياخد ثانيتين زيادة (قستها: 2.3 ثانية بدل 0.3).`,
          flag: "script",
          deep: {
            why: "سكربت بيقع كل ما الـ API يتأخر ثانية بيصحّيك بالليل على الفاضي. وسكربت بيعيد للأبد على 404 بيضيّع وقت ويضايق السيرفر. والتوازن بينهم بيتكتب مرة واحدة ويتستخدم في كل سكربت.",
            how: R`[[is_transient]]: [[HTTPError]] لازم يتفحص الأول لأنه ابن [[URLError]]. 5xx = مشكلة عند السيرفر ممكن تروح. 429 = «بطّل» وغالبًا بعدها ينفع. أي 4xx تاني = طلبك غلط ومش هيصلح نفسه.

[[retry(fn)]] بتاخد دالة من غير arguments وتناديها. عشان كده [[lambda: fetch(url)]]: الـ lambda بتأجّل النداء لجوه retry.

[[raise]] من غير حاجة جوه except بيرمي نفس الخطأ بالـ traceback بتاعه. فالخطأ الدايم بيطلع على طول، وآخر محاولة بتطلع زي ما هي.

[[base * 2 ** (i - 1)]]: 0.5 ثم 1 ثم 2 ثانية. ولو ١٠٠ سكربت فشلوا في نفس اللحظة، كلهم هيرجعوا في نفس اللحظة ويوقّعوا السيرفر تاني. [[random.uniform(0, base)]] بيفرّقهم.

[[except KeyboardInterrupt]] لوحده: Ctrl+C مش [[Exception]] (هو [[BaseException]])، فـ retry مش بيمسكه ومش بيعيد، والسكربت بيخرج بـ 130 على طول.

[[except Exception]] على مستوى main بس: آخر خط. بيكتب السبب ويرجّع 1 بدل traceback. جوه الكود امسك الأخطاء اللي تعرف تعمل فيها حاجة بس.

مكتبات جاهزة: [[tenacity]] (decorator [[@retry]] بإعدادات كتير)، و [[urllib3.Retry]] مع requests. بس الـ ٢٠ سطر دول بيوضحوا اللي جوه أي واحدة فيهم. وفي تاب «Python و FastAPI» درس «decorators» فيه retry كـ decorator.`,
            when: "أي سكربت بيكلم شبكة أو API أو قاعدة بيانات بعيدة، وخصوصًا المتجدول.",
            mistakes: R`retry على كل exception (حتى bugs في كودك وأخطاء 401). ومن غير حد للمحاولات. وانتظار ثابت من غير jitter. و [[except:]] فاضي بيمسك Ctrl+C فالسكربت ميرضاش يقف. و retry على طلب POST بيعمل حاجة (دفع، إرسال) فتتعمل مرتين: ده محتاج idempotency key مش retry.`
          },
          teach: R`## السكربت بيعمل إيه؟

بيحمّل رابط واحد. لو الطلب فشل بخطأ **مؤقت** بيستنى شوية ويحاول تاني (لحد ٤ محاولات)، والانتظار بيكبر كل مرة. ولو الخطأ **دايم** (زي 404) بيقف على طول. وفي الآخر بيرجّع exit code يقول حصل إيه. هنفكّه دالة دالة.

---

## ١. الـ imports والـ logger

~~~python
import logging
import random
import sys
import time
import urllib.error
import urllib.request
log = logging.getLogger("fetch")
~~~

| الموديول | ليه |
|---|---|
| [[logging]] | رسايل بمستوى ([[WARNING]] و [[ERROR]]) بدل [[print]] |
| [[random]] | رقم عشوائي للـ jitter (تحت) |
| [[time]] | [[time.sleep]] للانتظار |
| [[urllib.request]] و [[urllib.error]] | الطلب نفسه وأنواع أخطاءه، من المكتبة الأساسية |

[[logging.getLogger("fetch")]] بيعمل logger باسم. كل الرسايل هتطلع منه.

---

## ٢. [[is_transient]]: الخطأ ده مؤقت؟

~~~python
def is_transient(e: Exception) -> bool:
    if isinstance(e, urllib.error.HTTPError):
        return e.code >= 500 or e.code == 429
    return isinstance(e, (urllib.error.URLError, TimeoutError, ConnectionError))
~~~

- [[isinstance(e, X)]]: هل [[e]] من نوع [[X]] (أو ابن ليه)؟ ولو حطيت tuple [[(A, B, C)]] يبقى «أي واحد فيهم».
- [[HTTPError]]: السيرفر رد بكود غلط. [[e.code]] الرقم:

| الكود | معناه | نعيد؟ |
|---|---|---|
| 500 لـ 599 | مشكلة عند السيرفر (وقع، مشغول، بيعمل restart) | أيوه |
| 429 | Too Many Requests: «بطّل شوية» | أيوه |
| 404، 401، 403... | طلبك نفسه غلط | لأ، هيفضل غلط |

- لو مش HTTPError: [[URLError]] (مفيش رد خالص: بورت مقفول أو DNS)، و [[TimeoutError]] و [[ConnectionError]] (الاتصال قطع) كلهم مؤقتين.

### ليه HTTPError يتفحص الأول؟

لأنه **ابن** [[URLError]]. جربت [[HTTPError.__mro__]] (ترتيب الآباء) في Python 3.13:

~~~text الناتج
(<class 'urllib.error.HTTPError'>, <class 'urllib.error.URLError'>, <class 'OSError'>, <class 'Exception'>, ...)
~~~

فلو بدأنا بـ [[isinstance(e, URLError)]] كان الـ 404 هيطلع True ويتعاد.

---

## ٣. [[retry]]: قلب السكربت

~~~python
def retry(fn, attempts: int = 4, base: float = 0.5):
    for i in range(1, attempts + 1):
        try:
            return fn()
        except Exception as e:
            if not is_transient(e) or i == attempts:
                raise
            delay = base * 2 ** (i - 1) + random.uniform(0, base)
            log.warning("attempt %d/%d failed (%s), retrying in %.1fs", i, attempts, e, delay)
            time.sleep(delay)
~~~

### [[fn]]: دالة مش نتيجة

[[retry]] بتاخد **دالة** وتناديها بنفسها كل محاولة: [[fn()]]. لو بعتنالها نتيجة الطلب، الطلب يكون اتعمل مرة واحدة خلاص ومفيش حاجة تتعاد.

### [[for i in range(1, attempts + 1)]]

[[range(1, 5)]] بيدّي 1 و 2 و 3 و 4 (الرقم التاني مش داخل). فـ [[i]] رقم المحاولة.

### [[return fn()]]

لو نجحت، [[return]] بيخرج من الدالة كلها (والـ loop معاها) بالنتيجة.

### [[if not is_transient(e) or i == attempts: raise]]

[[raise]] لوحدها جوه [[except]] = ارمي **نفس** الخطأ تاني زي ما هو. فبنستسلم في حالتين: الخطأ دايم، أو دي آخر محاولة.

### الانتظار: [[base * 2 ** (i - 1) + random.uniform(0, base)]]

[[**]] أُس. فالجزء الأول:

~~~text الناتج
[0.5, 1.0, 2.0]
~~~

(جربت [[[0.5*2**(i-1) for i in range(1,4)] ]] في Python.)

الانتظار بيتضاعف، وده اسمه **exponential backoff**: لو السيرفر تعبان، كل مرة بندّيله وقت أطول.

و [[random.uniform(0, base)]] رقم عشوائي بين 0 و 0.5، وده اسمه **jitter**. ليه؟ لو ١٠٠ نسخة من السكربت فشلوا في نفس اللحظة، من غيره هيرجعوا كلهم في نفس اللحظة تاني. العشوائية بتفرّقهم.

### [[log.warning("... %d/%d ... %.1fs", i, attempts, e, delay)]]

logging بياخد القالب والقيم لوحدهم: [[%d]] رقم صحيح، و [[%s]] نص (هنا الخطأ)، و [[%.1fs]] رقم برقم عشري واحد وبعده حرف [[s]] (ثانية).

---

## ٤. [[fetch]]: الطلب

~~~python
def fetch(url: str) -> bytes:
    with urllib.request.urlopen(url, timeout=5) as r:
        return r.read()
~~~

[[urlopen]] بيبعت GET، و [[timeout=5]] بيرمي [[TimeoutError]] لو مفيش رد في 5 ثواني (وده مؤقت فيتعاد). [[r.read()]] الرد كـ [[bytes]]. ولو الكود 4xx أو 5xx، [[urlopen]] نفسه بيرمي [[HTTPError]].

---

## ٥. [[main]]

~~~python
logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
if len(sys.argv) != 2:
    log.error("usage: fetch_retry.py URL")
    return 2
~~~

[[basicConfig]] بيجهّز الطباعة: من [[INFO]] وطالع، وكل سطر = المستوى + الرسالة. و [[sys.argv]] لازم يبقى فيه حاجتين: اسم السكربت والـ URL. غير كده [[2]] (الرقم المتعارف عليه لـ «استخدام غلط»).

~~~python
try:
    data = retry(lambda: fetch(sys.argv[1]))
~~~

[[lambda: fetch(...)]] دالة صغيرة من غير اسم ومن غير arguments، بتنادي [[fetch]] **لما حد يناديها**. ده اللي [[retry]] محتاجه: حاجة تناديها كذا مرة.

~~~python
except KeyboardInterrupt:
    log.warning("interrupted")
    return 130
except Exception as e:
    log.error("giving up: %s", e)
    return 1
print(f"got {len(data)} bytes")
return 0
~~~

- [[KeyboardInterrupt]] (Ctrl+C) مش ابن [[Exception]]. [[KeyboardInterrupt.__mro__]] طلع [[(KeyboardInterrupt, BaseException, object)]]. فـ [[except Exception]] جوه [[retry]] مش بيمسكه، ومش بيعيد، والسكربت بيقف على طول بـ 130 (128 + رقم إشارة SIGINT وهو 2، العرف في لينكس).
- [[except Exception]]: أي فشل نهائي، سطر واحد بالسبب بدل traceback، و exit 1.
- نجح: عدد الـ bytes، و exit 0.

و [[sys.exit(main())]] في الآخر بيحوّل الرقم اللي [[main]] رجّعته لـ exit code.

---

## ٦. الـ solCode: سيرفر بيفشل بمزاجه

~~~python
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
hits = {}
class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        hits[self.path] = hits.get(self.path, 0) + 1
~~~

- [[http.server]] سيرفر HTTP في المكتبة الأساسية. [[BaseHTTPRequestHandler]] كلاس بنورث منه ([[class Handler(...)]])، و [[do_GET]] بتتنادى مع كل طلب GET.
- [[hits]] dict بيعدّ كل مسار اتطلب كام مرة. [[hits.get(path, 0)]] = القيمة، أو 0 لو أول مرة.

~~~python
if self.path == "/flaky":
    code = 200 if hits[self.path] % 3 == 0 else 503
else:
    code = {"/missing": 404, "/boom": 500}.get(self.path, 200)
~~~

- [[%]] باقي القسمة: الطلب التالت والسادس... باقيهم 0 فـ 200، والباقي 503. يعني [[/flaky]] بيفشل مرتين وينجح التالتة.
- dict فيه الأكواد، و [[.get(path, 200)]] أي مسار تاني 200.

~~~python
body = f"{self.path} {code}\n".encode()
self.send_response(code)
self.send_header("Content-Length", str(len(body)))
self.end_headers()
self.wfile.write(body)
~~~

[[.encode()]] النص لـ bytes. وبعدين الرد بالترتيب: سطر الحالة، والـ header (حجم الرد)، ونهاية الـ headers، والـ body. [[/flaky 200\n]] = 11 byte، وده [[got 11 bytes]] اللي هتشوفه.

~~~python
ThreadingHTTPServer(("127.0.0.1", 8001), Handler).serve_forever()
~~~

اسمع على [[127.0.0.1]] بورت 8001، ورد على كل طلب بـ [[Handler]]، ومتقفش. و [[Threading]] يعني كل طلب في thread لوحده.

---

## ٧. التشغيل

جربته في [[python:3.13-slim]] والسيرفر شغال في الخلفية:

~~~text /flaky: فشل مرتين ونجح
WARNING attempt 1/4 failed (HTTP Error 503: Service Unavailable), retrying in 0.5s
WARNING attempt 2/4 failed (HTTP Error 503: Service Unavailable), retrying in 1.3s
got 11 bytes
exit 0
~~~

0.5 = 0.5 + jitter صغير، و 1.3 = 1 + 0.3 jitter.

~~~text /missing: 404 دايم
ERROR giving up: HTTP Error 404: Not Found
exit 1
~~~

~~~text /boom: 500 كل مرة
WARNING attempt 1/4 failed (HTTP Error 500: Internal Server Error), retrying in 0.7s
WARNING attempt 2/4 failed (HTTP Error 500: Internal Server Error), retrying in 1.5s
WARNING attempt 3/4 failed (HTTP Error 500: Internal Server Error), retrying in 2.3s
ERROR giving up: HTTP Error 500: Internal Server Error
exit 1
~~~

٣ تحذيرات مش ٤: المحاولة الرابعة هي الأخيرة، فبتعمل [[raise]] على طول من غير انتظار. وعلى بورت مقفول ([[http://127.0.0.1:1/]]) نفس الشكل بـ [[<urlopen error [Errno 111] Connection refused>]]: ده [[URLError]] فمؤقت.

ومن غير URL: [[ERROR usage: fetch_retry.py URL]] و exit 2. ولما بعتّ Ctrl+C بعد ثانية ([[timeout --preserve-status -s INT 1 ...]] بيبعت نفس الإشارة):

~~~text الناتج
WARNING attempt 1/4 failed (<urlopen error [Errno 111] Connection refused>), retrying in 0.6s
WARNING interrupted
exit 130
~~~

وعلى ويندوز (Python 3.14، PowerShell، بـ [[127.0.0.1]]) نفس النتايج ونفس الـ exit codes بالظبط في [[$LASTEXITCODE]]، والأرقام بس اختلفت بسبب الـ jitter.

---

## الخلاصة

| الحالة | السكربت بيعمل إيه | exit |
|---|---|---|
| نجح (حتى بعد محاولات) | [[got N bytes]] | 0 |
| 404 / 401 / 403 | يقف من أول مرة | 1 |
| 5xx / 429 / مفيش اتصال | يعيد بانتظار 0.5 ثم 1 ثم 2 + jitter، وبعد 4 يستسلم | 1 |
| Ctrl+C | يقف على طول | 130 |
| من غير URL | usage | 2 |`,
          lines: [
            "الوصف.",
            "logging.",
            "random للـ jitter.",
            "sys.",
            "time.sleep.",
            "أخطاء urllib.",
            "urllib.",
            "logger.",
            "الخطأ ده مؤقت؟",
            "السيرفر رد بكود:",
            "5xx أو 429 بس.",
            "أو مشكلة اتصال أو timeout.",
            "نادي fn لحد attempts مرة:",
            "لكل محاولة:",
            "حاول...",
            "...ولو نجحت رجّع النتيجة.",
            "فشلت:",
            "دايم، أو آخر محاولة؟",
            "ارميه زي ما هو.",
            "الانتظار: 0.5 ثم 1 ثم 2، ومعاه عشوائية.",
            "سجّل.",
            "استنى.",
            "الطلب نفسه:",
            "بمهلة.",
            "رجّع المحتوى.",
            "main:",
            "logging.",
            "مفيش URL؟",
            "usage.",
            "2.",
            "حاول:",
            "الطلب جوه retry.",
            "Ctrl+C:",
            "سجّل.",
            "130.",
            "أي فشل نهائي:",
            "السبب في سطر.",
            "1.",
            "النتيجة.",
            "نجح.",
            "لو اتشغّل مباشرة:",
            "شغّل."
          ],
          sol: R`[[/flaky]]:

[[WARNING attempt 1/4 failed (HTTP Error 503: Service Unavailable), retrying in 0.6s]]
[[WARNING attempt 2/4 failed (HTTP Error 503: Service Unavailable), retrying in 1.1s]]
[[got 11 bytes]] و exit 0.

[[/missing]]: [[ERROR giving up: HTTP Error 404: Not Found]] على طول من غير ولا محاولة، و exit 1.

[[/boom]]: 3 تحذيرات (0.7 ثم 1.2 ثم 2.1 ثانية تقريبًا، الأرقام بتختلف بسبب الـ jitter) وبعدين [[ERROR giving up: HTTP Error 500: Internal Server Error]] و exit 1.

ومن غير URL: [[ERROR usage: fetch_retry.py URL]] و exit 2.`,
          solCode: R`# flaky.py: python3 flaky.py  (localhost:8001)
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
hits = {}
class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        hits[self.path] = hits.get(self.path, 0) + 1
        if self.path == "/flaky":
            code = 200 if hits[self.path] % 3 == 0 else 503
        else:
            code = {"/missing": 404, "/boom": 500}.get(self.path, 200)
        body = f"{self.path} {code}\n".encode()
        self.send_response(code)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)
ThreadingHTTPServer(("127.0.0.1", 8001), Handler).serve_forever()`
        },
        {
          cmd: "concurrent.futures",
          title: "١٠٠ رابط في ثواني بدل دقايق",
          desc: R`uptime_check.py بيشيّك على الروابط واحد ورا التاني. لو كل رابط بياخد ثانية، ١٠٠ رابط = دقيقة ونص، والسكربت طول الوقت ده مستني الشبكة مش بيشتغل.

[[ThreadPoolExecutor]] بيشغّل نفس الدالة على كذا حاجة في نفس الوقت في threads. للشغل اللي معظمه انتظار (طلبات HTTP، تحميل، قراية ملفات من شبكة) ده بيقسم الوقت على عدد الـ workers تقريبًا، من غير ما تغيّر الدالة نفسها ولا تكتب async.`,
          example: R`import sys
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
def check(url: str) -> tuple[str, str]:
    try:
        with urllib.request.urlopen(url, timeout=5) as r:
            return url, str(r.status)
    except Exception as e:
        return url, f"error: {type(e).__name__}"
lines = Path(sys.argv[1]).read_text(encoding="utf-8").splitlines()
urls = [u.strip() for u in lines if u.strip()]
start = time.perf_counter()
with ThreadPoolExecutor(max_workers=10) as pool:
    futures = [pool.submit(check, u) for u in urls]
    for fut in as_completed(futures):
        url, status = fut.result()
        print(f"{status:<18}{url}")
print(f"threads: {len(urls)} urls in {time.perf_counter() - start:.2f}s")
start = time.perf_counter()
results = [check(u) for u in urls]
print(f"one by one: {time.perf_counter() - start:.2f}s")
with ThreadPoolExecutor(max_workers=10) as pool:
    print([status for _, status in pool.map(check, urls)][:4])`,
          try: R`محتاج روابط بطيئة: سيرفر محلي فيه [[/slow]] بيستنى ثانية قبل ما يرد (عدّل [[flaky.py]] من الدرس اللي فات: [[import time]] في أوله، و [[time.sleep(1)]] لو [[self.path.startswith("/slow")]]). اعمل urls.txt فيه 10 روابط [[http://127.0.0.1:8001/slow?n=1]] لـ [[/slow?n=10]] ورابط 404 ([[/missing]]) ورابط على بورت مقفول ([[http://127.0.0.1:1/]]). شغّل وقارن الوقتين. وبعدين غيّر [[max_workers]] لـ 2 وشوف.`,
          flag: "script",
          deep: {
            why: "مراقبة ٢٠٠ موقع، أو تحميل ٥٠٠ صورة، أو تشيّك على ١٠٠٠ رابط في sitemap: نفس الكود بالـ threads بيخلص في جزء من الوقت.",
            how: R`[[pool.submit(check, u)]] بيبعت الشغلانة لـ worker ويرجّع [[Future]] على طول (وعد بنتيجة). و [[as_completed(futures)]] بيدّيك كل future أول ما يخلص، فالنتايج بتظهر بترتيب الخلصان مش ترتيب الـ list. [[fut.result()]] بيرجّع اللي الدالة رجّعته، أو يرمي الـ exception اللي حصل جواها.

[[pool.map(check, urls)]] أبسط: النتايج بنفس ترتيب الـ urls. بس لو واحد بطيء، اللي بعده يستنوه في العرض.

[[with ThreadPoolExecutor(...)]]: آخر الـ with بيستنى كل الشغل يخلص ويقفل الـ threads.

[[check]] بترجّع النتيجة حتى لو فشلت (بدل ما ترمي)، فرابط واقع مش بيضيّع باقي النتايج.

ليه threads بتنفع رغم الـ GIL؟ الـ GIL بيمنع اتنين يشغّلوا كود Python في نفس اللحظة، بس وهو مستني الشبكة بيسيب الـ GIL. فالانتظار بيتعمل بالتوازي. لحسابات تقيلة على الـ CPU (ضغط صور كتير مثلًا) [[ProcessPoolExecutor]] بنفس الشكل. التفاصيل في درس «ThreadPoolExecutor و ProcessPoolExecutor» و «الـ GIL» في تاب «Python و FastAPI».

[[max_workers]]: كتير مش أحسن. 10 لـ 20 لطلبات HTTP عادة كفاية، وأكتر من كده ممكن السيرفر التاني يعتبره هجوم أو يرد بـ 429.`,
            when: "شغل كتير مستقل عن بعض ومعظمه انتظار I/O: طلبات، تحميل، ping، استعلامات بعيدة.",
            mistakes: R`threads بتكتب في نفس الملف أو نفس الـ list من غير ترتيب (رجّع النتيجة من الدالة والـ main thread هو اللي يكتب، زي المثال). و [[max_workers=500]] على موقع واحد. و exception جوه الـ thread بيختفي لو منادتش [[fut.result()]]. واستخدامه لحسابات CPU ومتوقع سرعة.`
          },
          teach: R`## السكربت بيعمل إيه؟

بيقرا روابط من ملف، ويشيّك عليها **مرتين**: مرة بـ 10 threads في نفس الوقت، ومرة واحد ورا التاني، ويطبع وقت كل طريقة عشان تشوف الفرق بعينك. وفي الآخر نفس الشغل بـ [[pool.map]] عشان تشوف الفرق في الترتيب.

---

## ١. الـ imports

~~~python
import sys
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
~~~

[[concurrent.futures]] موديول في المكتبة الأساسية لتشغيل شغل بالتوازي. منه حاجتين: [[ThreadPoolExecutor]] (مجموعة threads جاهزة تاخد شغل) و [[as_completed]] (هاتلي النتايج أول ما تخلص). و **thread** يعني خط تنفيذ جوه نفس البرنامج: كذا thread بيشتغلوا مع بعض ويشوفوا نفس المتغيرات.

---

## ٢. [[check]]: رابط واحد

~~~python
def check(url: str) -> tuple[str, str]:
    try:
        with urllib.request.urlopen(url, timeout=5) as r:
            return url, str(r.status)
    except Exception as e:
        return url, f"error: {type(e).__name__}"
~~~

- [[-> tuple[str, str] ]]: بترجّع حاجتين نص: الرابط والحالة.
- [[urlopen(url, timeout=5)]] يطلب الرابط ويستنى 5 ثواني بالكتير. و [[r.status]] الكود ([[200]])، و [[str(...)]] حوّله نص.
- أي فشل: [[type(e).__name__]] اسم نوع الخطأ بس ([[HTTPError]] أو [[URLError]]) بدل الرسالة الطويلة.

النقطة المهمة: الدالة **مبترميش** خطأ أبدًا، دايمًا بترجّع نتيجة. فرابط واقع مش بيوقف الباقي.

---

## ٣. قراية الروابط وبداية العد

~~~python
lines = Path(sys.argv[1]).read_text(encoding="utf-8").splitlines()
urls = [u.strip() for u in lines if u.strip()]
start = time.perf_counter()
~~~

- [[sys.argv[1] ]] اسم الملف من الترمنال. [[read_text]] يقراه كله، و [[splitlines()]] يقسّمه سطور.
- [[[u.strip() for u in lines if u.strip()] ]]: list comprehension: لكل سطر شيل المسافات، وسيب السطر الفاضي ([[""]] بيتحسب false).
- [[time.perf_counter()]] ساعة دقيقة لقياس المدد. ناخدها قبل وبعد ونطرح.

---

## ٤. الـ threads

~~~python
with ThreadPoolExecutor(max_workers=10) as pool:
    futures = [pool.submit(check, u) for u in urls]
    for fut in as_completed(futures):
        url, status = fut.result()
        print(f"{status:<18}{url}")
~~~

### [[ThreadPoolExecutor(max_workers=10)]]

اعمل 10 threads (workers) مستنيين شغل. و [[with]]: لما البلوك يخلص، استنى كل الشغل يخلص واقفل الـ threads.

### [[pool.submit(check, u)]]

«ادّي [[check(u)]] لأي worker فاضي». لاحظ إننا بنبعت الدالة والـ argument منفصلين، مش [[check(u)]]: لو كتبناها كده كانت هتتنفّذ هنا على طول في الـ thread الأساسي.

[[submit]] مبيستناش. بيرجّع على طول حاجة اسمها **Future**: «وصل» إن فيه نتيجة جاية. فالسطر ده بيبعت الـ 12 رابط في لحظة، و [[futures]] list فيها 12 Future.

### [[as_completed(futures)]]

بيدّيك الـ futures **بترتيب الخلصان**: أول واحد خلص، بعده اللي بعده... مش بترتيب الـ list.

### [[fut.result()]]

اللي [[check]] رجّعته. ولو [[check]] كانت رمت exception، [[result()]] كان هيرميه هنا. و [[url, status = ...]] بيفك الـ tuple.

### [[f"{status:<18}{url}"]]

[[:<18]] = اكتب [[status]] في 18 حرف محاذي شمال، فالروابط تيجي تحت بعض في عمود.

~~~python
print(f"threads: {len(urls)} urls in {time.perf_counter() - start:.2f}s")
~~~

[[:.2f]] رقمين بعد العلامة العشرية.

---

## ٥. نفس الشغل من غير threads

~~~python
start = time.perf_counter()
results = [check(u) for u in urls]
print(f"one by one: {time.perf_counter() - start:.2f}s")
~~~

list comprehension عادية: [[check]] على كل رابط، واحد يخلص وبعدين اللي بعده.

---

## ٦. [[pool.map]]: أبسط، والترتيب ثابت

~~~python
with ThreadPoolExecutor(max_workers=10) as pool:
    print([status for _, status in pool.map(check, urls)][:4])
~~~

- [[pool.map(check, urls)]] زي [[map]] العادية بس بالتوازي: [[check]] على كل رابط، والنتايج **بنفس ترتيب** [[urls]].
- [[for _, status in ...]]: كل نتيجة tuple، و [[_]] اسم متعارف عليه لـ «حاجة مش محتاجها» (الرابط هنا).
- [[[:4] ]]: أول 4 بس.

---

## ٧. التشغيل

السيرفر: [[flaky.py]] من الدرس اللي فات، وزودت عليه [[import time]] و [[if self.path.startswith("/slow"): time.sleep(1)]]. و [[urls.txt]]: 10 روابط [[/slow?n=1]] لـ [[/slow?n=10]]، و [[/missing]] (404)، و [[http://127.0.0.1:1/]] (بورت مقفول). جربته في [[python:3.13-slim]]:

~~~text الناتج
200               http://127.0.0.1:8001/slow?n=3
200               http://127.0.0.1:8001/slow?n=6
200               http://127.0.0.1:8001/slow?n=4
200               http://127.0.0.1:8001/slow?n=1
200               http://127.0.0.1:8001/slow?n=9
200               http://127.0.0.1:8001/slow?n=2
200               http://127.0.0.1:8001/slow?n=5
200               http://127.0.0.1:8001/slow?n=7
200               http://127.0.0.1:8001/slow?n=8
error: HTTPError  http://127.0.0.1:8001/missing
error: URLError   http://127.0.0.1:1/
200               http://127.0.0.1:8001/slow?n=10
threads: 12 urls in 1.02s
one by one: 10.01s
['200', '200', '200', '200']
~~~

### نقرا الأرقام

- **الترتيب ملخبط**: الـ 10 روابط البطيئة خلصوا كلهم تقريبًا في نفس الثانية، وأي واحد سبق بكسور من الثانية بيطلع الأول. شغّله تاني والترتيب يتغير.
- **ليه الـ 404 والبورت المقفول طلعوا متأخر وهم أسرع حاجة؟** الـ 12 رابط و 10 workers بس. أول 10 اتبعتوا (البطيئين)، و [[/missing]] و [[127.0.0.1:1]] استنوا في الطابور لحد ما worker فضي بعد ثانية.
- **1.02 مقابل 10.01 ثانية**: 10 روابط كل واحد ثانية. واحد ورا التاني = 10 ثواني. 10 مع بعض = ثانية واحدة (والـ 404 والمقفول بياخدوا ملي ثواني).
- **map**: [[n=1]] لـ [[n=4]] بالترتيب، كلهم 200.

وبـ [[max_workers=2]]: [[threads: 12 urls in 5.02s]]. 10 روابط بطيئة ÷ 2 في المرة = 5 دفعات × ثانية.

### ليه threads بتنفع هنا؟

Python فيه **GIL** (Global Interpreter Lock): thread واحد بس بيشغّل كود Python في اللحظة الواحدة. بس الـ thread وهو مستني رد الشبكة بيسيب الـ GIL، فالـ 10 بيستنوا مع بعض. ولو الشغل حسابات على الـ CPU، الـ threads مش هتسرّع؛ استخدم [[ProcessPoolExecutor]] بنفس الشكل.

### على ويندوز

جربته بـ Python 3.14 في PowerShell: [[threads: 12 urls in 3.15s]] و [[one by one: 12.12s]]. الزيادة كلها من [[127.0.0.1:1]]: ويندوز بيستنى حوالي ثانيتين قبل ما يقول إن البورت مقفول ([[WinError 10061]])، ولينكس بيرد في لحظة. وده كمان سبب إن الرابط ده طلع آخر واحد خالص.

---

## الخلاصة

| | [[submit]] + [[as_completed]] | [[pool.map]] |
|---|---|---|
| ترتيب النتايج | بترتيب الخلصان | بنفس ترتيب المدخلات |
| بتشوف النتيجة إمتى | أول ما كل واحد يخلص | بالترتيب، فواحد بطيء بيأخّر اللي بعده في العرض |
| الأخطاء | [[fut.result()]] بيرميها | بتترمي وانت بتلف على النتايج |

والوقت تقريبًا = (عدد الروابط ÷ [[max_workers]]) × مدة الرابط، طالما الشغل انتظار شبكة مش حسابات.`,
          lines: [
            "sys.",
            "time.",
            "urllib.",
            "الـ pool، و as_completed للنتايج أول ما تخلص.",
            "Path.",
            "شيّك على رابط، ورجّع (الرابط، الحالة):",
            "حاول...",
            "...بمهلة.",
            "الـ status.",
            "أي فشل:",
            "رجّعه كنتيجة بدل ما ترمي.",
            "سطور الملف.",
            "الروابط.",
            "ابدأ العد.",
            "10 workers:",
            "ابعت كل الروابط.",
            "كل واحد أول ما يخلص:",
            "النتيجة.",
            "اطبعها.",
            "الوقت بالـ threads.",
            "ابدأ العد تاني.",
            "نفس الشغل واحد ورا واحد.",
            "الوقت.",
            "map: نفس الترتيب.",
            "أول 4 نتايج."
          ],
          sol: R`جربته على لينكس: 10 روابط كل واحد بياخد ثانية، ورابط 404، ورابط على بورت مقفول.

النتايج طلعت بترتيب الخلصان: [[error: URLError]] و [[error: HTTPError]] طلعوا في النص مش في الآخر، و [[n=4]] طلع قبل [[n=1]]. والترتيب بيتغير من تشغيل للتاني.

[[threads: 12 urls in 1.04s]]
[[one by one: 10.02s]]
[[['200', '200', '200', '200'] ]] من map بنفس ترتيب الملف.

بـ [[max_workers=2]] الوقت بقى 5.03 ثانية: 10 روابط على 2 في نفس الوقت. يعني الوقت تقريبًا (عدد الروابط البطيئة ÷ workers) × مدة الواحد.

وعلى ويندوز: [[threads: 12 urls in 3.17s]] و [[one by one: 12.03s]]. الفرق كله من البورت المقفول: ويندوز بيستنى حوالي ثانيتين قبل ما يقول [[WinError 10061]] (لينكس بيرد في لحظة)، فالرابط ده لوحده بقى أبطأ من أي رابط slow.`
        },
        {
          cmd: "pytest لسكربت",
          title: "اختبر السكربت بملفات مؤقتة",
          desc: R`سكربت بيمسح ملفات لازم يتختبر قبل ما يتجدول. [[pytest]] مع [[tmp_path]]: كل اختبار بياخد فولدر مؤقت فاضي، تعمل فيه ملفات بأعمار مختلفة، وتنادي [[main([...])]] بالـ arguments كـ list، وتتأكد مين اتمسح ومين فضل والـ exit code كام.

ده سبب إن السكربتات في الدروس اللي فاتت مكتوبة بـ [[main(argv=None)]] بترجّع رقم: الاختبار بينادي نفس الدالة اللي الترمنال بيناديها. أساسيات pytest في دروس «pytest» و «tmp_path» و «monkeypatch» في نفس التاب ده.`,
          example: R`# tests/test_clean_old_files.py
import logging
import os
import time
from pathlib import Path
import pytest
from clean_old_files import main
def make(path: Path, days_old: float) -> Path:
    path.write_text("x", encoding="utf-8")
    t = time.time() - days_old * 86400
    os.utime(path, (t, t))
    return path
def test_dry_run_deletes_nothing(tmp_path, caplog):
    caplog.set_level(logging.INFO)
    old = make(tmp_path / "old.log", 40)
    assert main([str(tmp_path), "--days", "30"]) == 0
    assert old.exists()
    assert "would delete old.log" in caplog.text
def test_apply_deletes_only_old(tmp_path):
    (tmp_path / "sub").mkdir()
    old = make(tmp_path / "sub" / "old.log", 40)
    new = make(tmp_path / "new.log", 1)
    assert main([str(tmp_path), "--days", "30", "--apply"]) == 0
    assert not old.exists()
    assert new.exists()
def test_refuses_home(tmp_path, monkeypatch):
    monkeypatch.setattr(Path, "home", lambda: tmp_path)
    make(tmp_path / "old.log", 40)
    assert main([str(tmp_path), "--days", "1", "--apply"]) == 2
    assert (tmp_path / "old.log").exists()
def test_days_must_be_a_number(capsys):
    with pytest.raises(SystemExit) as exc:
        main(["/tmp", "--days", "abc"])
    assert exc.value.code == 2
    assert "invalid int value: 'abc'" in capsys.readouterr().err`,
          try: R`حط [[clean_old_files.py]] (درس «clean_old_files.py») في فولدر، وجنبه [[tests/test_clean_old_files.py]]. شغّل [[python -m pytest -q]]. وبعدين جرّب [[pytest -q]] لوحده. وبعدين امسح سطر [[caplog.set_level(logging.INFO)]] وشغّل تاني واقرا الفشل.`,
          flag: "script",
          deep: {
            why: R`سكربت المسح لو فيه bug في الشرط ([[>]] بدل [[<]]) هيمسح الملفات الجديدة بدل القديمة. اختبار ٥ سطور بيمسك ده على فولدر مؤقت، مش على السيرفر.`,
            how: R`[[from clean_old_files import main]]: ده السبب الحقيقي لـ [[if __name__ == "__main__"]]. الـ import مش بيشغّل حاجة.

[[tmp_path]] فولدر جديد لكل اختبار، و pytest بيمسحه بعدين (درس «tmp_path»). و [[os.utime(path, (t, t))]] بيغيّر وقت الوصول والتعديل، فتعمل ملف «عمره 40 يوم» في ثانية.

[[caplog]] بيمسك رسايل الـ logging. ليه [[set_level]]؟ السكربت بيعمل [[basicConfig(level=INFO)]]، بس pytest بيكون حاط handler على الـ root logger قبلها، و basicConfig مبيعملش حاجة لو فيه handlers. فالمستوى بيفضل WARNING والـ INFO مبيوصلش. [[caplog.set_level(logging.INFO)]] بيحل ده.

[[monkeypatch.setattr(Path, "home", lambda: tmp_path)]]: بدّلنا [[Path.home]] نفسها للاختبار ده، فالـ tmp_path بقى «الـ home» والسكربت لازم يرفض (درس «monkeypatch»). ليه مش [[monkeypatch.setenv("HOME", ...)]]؟ [[Path.home()]] بيقرا HOME على لينكس وماك بس، وعلى ويندوز بيقرا USERPROFILE. جربت نسخة HOME على ويندوز: الاختبار وقع بـ [[assert 0 == 2]] والسكربت مسح الملف اللي في tmp_path فعلًا. تبديل الدالة نفسها شغال على الاتنين.

[[pytest.raises(SystemExit)]]: argparse بيعمل [[sys.exit(2)]] على أي غلط، ده بيرمي SystemExit و [[exc.value.code]] هو الرقم. و [[capsys]] بيمسك stdout و stderr.

[[python -m pytest]] بيحط الفولدر الحالي في sys.path، فـ [[import clean_old_files]] بيلاقيه. [[pytest]] لوحده بيحط فولدر tests بس، فيطلع ModuleNotFoundError. الحل الدايم [[pythonpath = .]] في pytest.ini (درس «pytest.ini»).`,
            when: "أي سكربت بيمسح أو ينقل أو يغيّر أسماء، قبل ما يتجدول أو يتسلّم لحد. وكل ما تصلّح bug ضيف اختبار بيمسكه.",
            mistakes: R`اختبار على فولدرات حقيقية ([[~/Downloads]]). ومسارات ثابتة زي [[/tmp/test]] فاختبارين يدوسوا على بعض. وسكربت كله على مستوى الملف فمينفعش يتعمله import. و [[sys.exit]] جوه الدوال الصغيرة بدل return فكل اختبار محتاج pytest.raises.`
          },
          teach: R`## الملف ده بيعمل إيه؟

ملف اختبارات لسكربت [[clean_old_files.py]] (درس «clean_old_files.py»: بيمسح الملفات الأقدم من N يوم). فيه 4 اختبارات، كل واحد دالة اسمها بيبدأ بـ [[test_]]، و pytest بيلاقيهم وينادي كل واحدة لوحدها. والفكرة: نعمل ملفات **مزيفة بأعمار مزيفة** في فولدر مؤقت، وننادي [[main]] بنفسنا، ونتأكد من النتيجة.

---

## ١. الـ imports

~~~python
import logging
import os
import time
from pathlib import Path
import pytest
from clean_old_files import main
~~~

- [[os]] عشان [[os.utime]] (تحت)، و [[time]] عشان الوقت الحالي، و [[logging]] عشان مستوى الرسايل.
- [[import pytest]]: محتاجينه بس عشان [[pytest.raises]]. الاختبارات نفسها مش محتاجة import عشان تشتغل.
- [[from clean_old_files import main]]: نفس الدالة اللي الترمنال بيناديها. والـ import مش بيشغّل السكربت لأن آخره [[if __name__ == "__main__":]]: الشرط ده False وقت الـ import.

---

## ٢. الدالة المساعدة [[make]]

~~~python
def make(path: Path, days_old: float) -> Path:
    path.write_text("x", encoding="utf-8")
    t = time.time() - days_old * 86400
    os.utime(path, (t, t))
    return path
~~~

- [[write_text("x")]]: اعمل الملف وفيه حرف واحد.
- [[time.time()]] الوقت دلوقتي بالثواني من 1/1/1970 (رقم زي [[1791308859.31]]). و [[86400]] = 24 × 60 × 60 = ثواني اليوم. فـ 40 يوم = [[3456000]] ثانية، والطرح بيدّي «الوقت من 40 يوم».
- [[os.utime(path, (t, t))]]: غيّر وقتين الملف: الأول آخر قراية (atime)، والتاني آخر تعديل (mtime). والسكربت بيبص على الـ mtime، فالملف بقى «عمره 40 يوم» في لحظة.

---

## ٣. الاختبار الأول: الـ dry run مبيمسحش

~~~python
def test_dry_run_deletes_nothing(tmp_path, caplog):
    caplog.set_level(logging.INFO)
    old = make(tmp_path / "old.log", 40)
    assert main([str(tmp_path), "--days", "30"]) == 0
    assert old.exists()
    assert "would delete old.log" in caplog.text
~~~

### الـ arguments بتوع الدالة = fixtures

pytest بيبص على أسماء الـ parameters ويبعت حاجات جاهزة اسمها **fixtures**:

| الاسم | pytest بيبعت إيه |
|---|---|
| [[tmp_path]] | [[Path]] لفولدر جديد فاضي، مخصوص للاختبار ده |
| [[caplog]] | بيمسك رسايل الـ logging، و [[caplog.text]] كلها كنص |
| [[monkeypatch]] | يبدّل حاجة مؤقتًا وبيرجّعها بعد الاختبار |
| [[capsys]] | بيمسك اللي اتطبع على stdout و stderr |

### السطور

- [[caplog.set_level(logging.INFO)]]: خلّي رسايل INFO توصل. السكربت بيعمل [[basicConfig(level=INFO)]]، بس pytest حاطط handler قبله، و [[basicConfig]] مبيعملش حاجة لو فيه handler. فالمستوى بيفضل WARNING، ورسالة [[would delete]] (وهي INFO) مش هتتمسك.
- [[tmp_path / "old.log"]]: [[/]] مع Path بيركّب مسار.
- [[main([str(tmp_path), "--days", "30"])]]: بنبعت الـ arguments كـ list نصوص، بالظبط زي ما argparse كان هياخدها من الترمنال. و [[str()]] لأنها لازم تبقى نصوص.
- [[assert X]]: لو X مش True الاختبار يفشل، و pytest يوريك القيم. فالاختبار ده بيتأكد من 3 حاجات: رجّع 0، والملف لسه موجود، والـ log قال إنه **كان** هيمسحه.

---

## ٤. التاني: [[--apply]] بيمسح القديم بس

~~~python
def test_apply_deletes_only_old(tmp_path):
    (tmp_path / "sub").mkdir()
    old = make(tmp_path / "sub" / "old.log", 40)
    new = make(tmp_path / "new.log", 1)
    assert main([str(tmp_path), "--days", "30", "--apply"]) == 0
    assert not old.exists()
    assert new.exists()
~~~

ملف قديم جوه فولدر فرعي (عشان نتأكد إن [[rglob]] بيدخل جوه)، وملف عمره يوم بره. بعد [[--apply]]: القديم اتمسح ([[not old.exists()]])، والجديد فضل. ده بالظبط الاختبار اللي هيمسك لو حد كتب [[>]] بدل [[<]] في الشرط.

---

## ٥. التالت: بيرفض يمسح في الـ home

~~~python
def test_refuses_home(tmp_path, monkeypatch):
    monkeypatch.setattr(Path, "home", lambda: tmp_path)
    make(tmp_path / "old.log", 40)
    assert main([str(tmp_path), "--days", "1", "--apply"]) == 2
    assert (tmp_path / "old.log").exists()
~~~

إزاي نختبر «بيرفض الـ home» من غير ما نلمس الـ home الحقيقي؟ نكدب عليه:

- [[monkeypatch.setattr(Path, "home", ...)]]: بدّل [[Path.home]] بدالة تانية لحد ما الاختبار يخلص.
- [[lambda: tmp_path]]: دالة من غير arguments بترجّع [[tmp_path]]. فـ [[Path.home()]] جوه السكربت بقت ترجّع الفولدر المؤقت.

فلما ندّي السكربت [[tmp_path]]، هو شايفه الـ home ولازم يرجّع [[2]] ومايمسحش حاجة. ليه مش [[monkeypatch.setenv("HOME", ...)]]؟ لأن [[Path.home()]] على ويندوز بيقرا [[USERPROFILE]] مش [[HOME]]، فالاختبار هيعدّي على لينكس ويفشل على ويندوز (الـ sol فيه التجربة). تبديل الدالة نفسها شغال على الاتنين.

---

## ٦. الرابع: [[--days]] لازم يبقى رقم

~~~python
def test_days_must_be_a_number(capsys):
    with pytest.raises(SystemExit) as exc:
        main(["/tmp", "--days", "abc"])
    assert exc.value.code == 2
    assert "invalid int value: 'abc'" in capsys.readouterr().err
~~~

- argparse لما يلاقي غلط بيطبع رسالة على stderr ويعمل [[sys.exit(2)]]، وده بيرمي exception اسمه [[SystemExit]]. من غير حاجة تمسكه، pytest نفسه كان هيقف.
- [[with pytest.raises(SystemExit) as exc:]]: «الكود اللي جوه **لازم** يرمي SystemExit». لو مرماش، الاختبار يفشل. و [[exc.value]] الـ exception نفسه، و [[.code]] رقم الخروج.
- [[capsys.readouterr().err]]: كل اللي اتطبع على stderr. والرسالة شكلها كده (جربت نفس الـ argparse في Python 3.14):

~~~text الناتج
usage: -c [-h] [--days DAYS]
-c: error: argument --days: invalid int value: 'abc'
~~~

و [[/tmp]] هنا مش مهم إنه موجود: argparse بيقع قبل ما السكربت يبص على الفولدر.

---

## ٧. التشغيل

~~~text شكل الفولدر
clean_old_files.py
tests/
    test_clean_old_files.py
~~~

جربته في [[python:3.13-slim]] بعد [[pip install pytest]] جوه الـ container:

~~~bash
python -m pytest -v
~~~

~~~text الناتج
tests/test_clean_old_files.py::test_dry_run_deletes_nothing PASSED       [ 25%]
tests/test_clean_old_files.py::test_apply_deletes_only_old PASSED        [ 50%]
tests/test_clean_old_files.py::test_refuses_home PASSED                  [ 75%]
tests/test_clean_old_files.py::test_days_must_be_a_number PASSED         [100%]
~~~

و [[-q]] (quiet) بدل [[-v]] (verbose) بيطبع نقطة لكل اختبار عدّى: [[....]] و [[4 passed in 0.03s]]. وعلى ويندوز في venv بـ Python 3.14: نفس [[4 passed]].

### [[python -m pytest]] مش [[pytest]]

~~~text الناتج بـ pytest -q لوحده
E   ModuleNotFoundError: No module named 'clean_old_files'
!!!!!!!!!!!!!!!!!!!! Interrupted: 1 error during collection !!!!!!!!!!!!!!!!!!!!
~~~

[[python -m]] بيشغّل pytest كموديول، وده بيضيف الفولدر الحالي لأماكن الـ import، فـ [[clean_old_files]] بيتلاقي. و [[pytest]] لوحده بيضيف فولدر [[tests]] بس.

### من غير [[caplog.set_level]]

~~~text الناتج
>       assert "would delete old.log" in caplog.text
E       AssertionError: assert 'would delete old.log' in ''
1 failed, 3 passed in 0.05s
~~~

[[>]] السطر اللي فشل، و [[E]] السبب: [[caplog.text]] فاضي [['']]. ده اللي شرحناه في الخطوة ٣.

---

## الخلاصة

| الأداة | بتعمل إيه في الاختبارات دي |
|---|---|
| [[tmp_path]] | فولدر مؤقت لكل اختبار، فمفيش ملف حقيقي بيتلمس |
| [[os.utime]] | يخلي ملف جديد «قديم» |
| [[main([...])]] | ننادي السكربت من غير ترمنال |
| [[caplog]] + [[set_level]] | نقرا رسايل الـ logging |
| [[monkeypatch.setattr]] | نخلي [[Path.home()]] ترجّع اللي احنا عايزينه |
| [[pytest.raises(SystemExit)]] + [[capsys]] | نختبر إن argparse رفض ورسالته صح |`,
          lines: [
            "logging للـ caplog.",
            "os.utime.",
            "time.",
            "Path.",
            "pytest.",
            "نفس main اللي الترمنال بيناديها.",
            "مساعد: ملف بعمر معيّن:",
            "اكتبه.",
            "الوقت من N يوم.",
            "خلّي وقت التعديل كده.",
            "رجّعه.",
            "الـ dry run مبيمسحش:",
            "خلّي رسايل INFO توصل للـ caplog.",
            "ملف عمره 40 يوم.",
            "من غير --apply، ونجح.",
            "لسه موجود.",
            "والـ log قال هيمسحه.",
            "الـ apply بيمسح القديم بس:",
            "فولدر فرعي.",
            "قديم جواه.",
            "جديد بره.",
            "بـ --apply.",
            "القديم اتمسح.",
            "الجديد فضل.",
            "بيرفض الـ home:",
            "خلّي Path.home() ترجّع tmp_path (على كل الأنظمة).",
            "ملف قديم.",
            "لازم يرجع 2...",
            "...ومحدش اتمسح.",
            "أيام مش رقم:",
            "argparse بيخرج...",
            "...بـ main بأيام غلط.",
            "بكود 2.",
            "والرسالة على stderr."
          ],
          sol: R`[[python -m pytest -q]]: [[....]] و [[4 passed in 0.05s]]. جربته على أوبونتو (Python 3.12) وفي Python 3.13 وعلى ويندوز (3.14)، والأربعة عدّوا على التلاتة.

[[pytest -q]] لوحده: [[ModuleNotFoundError: No module named 'clean_old_files']] و [[Interrupted: 1 error during collection]]. pytest حط فولدر tests في sys.path مش الفولدر اللي فوقه.

ومن غير [[caplog.set_level]]:

[[>       assert "would delete old.log" in caplog.text]]
[[E       AssertionError: assert 'would delete old.log' in '']]

الـ caplog فاضي خالص، مع إن السكربت لما بيتشغّل من الترمنال بيطبع السطر ده. ده الفرق بين بيئة الاختبار وبيئة التشغيل، والاختبار مسكه.`
        },
        {
          cmd: "bash ولا Python ولا PowerShell",
          title: "تكتب السكربت بإيه؟",
          desc: R`نفس المهمة ممكن تتكتب بالتلاتة. القاعدة العملية:

bash لما المهمة توصيل أوامر موجودة ببعض في سطور قليلة، على لينكس أو سيرفر: [[find]] و [[grep]] و [[rsync]] و [[docker]].

PowerShell لما الشغل على ويندوز نفسه: الـ registry والخدمات والمستخدمين و Office و Active Directory. وبيرجّع objects مش نص.

Python لما فيه منطق (شروط وحسابات وبيانات JSON أو CSV أو API)، أو لازم يشتغل على ويندوز ولينكس وماك من نفس الكود، أو السكربت هيكبر ويتختبر.`,
          example: R`python -c "import collections, pathlib; print(collections.Counter(p.suffix.lower() for p in pathlib.Path('.').rglob('*.*') if p.is_file() and '.git' not in p.parts).most_common(5))"
# Linux و Mac:
find . -type f -name '*.*' -not -path './.git/*' | sed 's/.*\.//' | sort | uniq -c | sort -rn | head -5
# Windows (PowerShell):
Get-ChildItem -Recurse -File | Group-Object Extension | Sort-Object Count -Descending | Select-Object -First 5 Count, Name`,
          try: R`شغّل التلاتة على نفس الفولدر (الـ proj بتاع درس «glob و rglob»، وفيه [[x.PNG]] و [[y.png]] و Makefile و .git). PowerShell على لينكس وماك اسمه [[pwsh]]. قارن النتايج: مين عدّ PNG و png مع بعض؟ ومين دخل .git؟ ومين عدّ Makefile؟`,
          deep: {
            why: "كل لغة فيها حاجات سهلة جدًا وحاجات مؤلمة. سكربت bash فيه JSON و if متداخلة و arrays بيبقى صعب يتقري ويتصلّح. وسكربت Python بيعمل pipe بين ٤ أوامر نظام بيبقى أطول من اللازم.",
            how: R`bash: كل حاجة نص، والأوامر بتتوصّل بـ [[|]]. سريع تكتب فيه سطر، بس المسافات في أسماء الملفات والـ quoting و [[set -euo pipefail]] بيوقعوا ناس كتير، ومفيش data structures حقيقية. وعلى ويندوز محتاج WSL أو Git Bash.

PowerShell: الأوامر بترجّع objects ليها خصائص ([[Count]] و [[Name]] و [[Length]])، فمفيش parsing لنص. موجود على كل ويندوز، و [[pwsh]] بيشتغل على لينكس وماك. بس أغلب السيرفرات مفيهاش، والـ syntax غريب على اللي جاي من لغات تانية.

Python: نفس الكود على أي نظام، ومكتبات لكل حاجة (HTTP و Excel و صور و قواعد بيانات)، واختبارات بـ pytest. بس محتاج Python متسطّب، و venv لو فيه مكتبات، والسطر الواحد أطول.

الفروق اللي هتظهر في التمرين: الـ glob في Python و Get-ChildItem فيهم اختلافات في المخفي وحالة الحروف عن find. ده بالظبط نوع التفاصيل اللي بتفرق في سكربت تنضيف.

قاعدة سريعة: لو سكربت bash عدّى 30 سطر، أو فيه parsing لـ JSON، أو if جوه loop جوه if، اكتبه Python. ولو سكربت Python أغلبه [[subprocess.run]] ورا بعض، فكّر في bash.`,
            when: "قبل ما تبدأ أي سكربت جديد. ومع الفريق: اختار اللي الناس اللي هتصلّحه بعدك تعرفه.",
            mistakes: R`bash لـ JSON معقد (استخدم [[jq]] على الأقل، أو Python). وPython عشان تعمل [[ls | grep]]. و PowerShell على سيرفر لينكس عشان «متعود عليه» فكل اللي بعدك يحتاجوا يسطّبوه. وتنسى إن [[sed -i]] على ماك غير لينكس (درس bash).`
          },
          teach: R`## المثال بيعمل إيه؟

نفس المهمة بـ ٣ لغات: **عدّ الملفات حسب الامتداد** في الفولدر الحالي وكل اللي تحته، واطبع أكتر 5. هنفك كل سطر، وبعدين نقارن النتايج على نفس الفولدر، لأن الاختلافات الصغيرة بينهم هي الدرس.

الفولدر اللي جربت عليه (زي درس «glob و rglob»):

~~~text شكل proj
src/a.py  src/b.py  src/c.py
docs/README.md  NOTES.md
img/x.PNG  img/y.png  img/z.jpg
Makefile
.git/config
~~~

---

## ١. Python: سطر واحد بـ [[-c]]

~~~bash
python -c "import collections, pathlib; print(collections.Counter(p.suffix.lower() for p in pathlib.Path('.').rglob('*.*') if p.is_file() and '.git' not in p.parts).most_common(5))"
~~~

[[-c]] = command: شغّل الكود اللي بين علامتي التنصيص بدل ملف. و [[;]] بتفصل بين جملتين في سطر واحد. نفكّه من جوه لبرة:

### [[pathlib.Path('.').rglob('*.*')]]

[[Path('.')]] الفولدر الحالي. و [[rglob]] (r = recursive) بيدوّر فيه وفي كل اللي تحته. و [['*.*']] أي اسم فيه نقطة، يعني ليه امتداد. فـ [[Makefile]] مش هيطلع.

### [[if p.is_file() and '.git' not in p.parts]]

- [[is_file()]]: ملفات بس، مش فولدرات (فولدر اسمه [[v1.2]] كان هيطلع).
- [[p.parts]] المسار متقطّع لحتت: [[Path('.git/config').parts]] = [[('.git', 'config')]]. فلو أي حتة اسمها [[.git]] نسيب الملف.

### [[p.suffix.lower()]]

[[suffix]] الامتداد بالنقطة. جربت: [[Path('img/x.PNG').suffix]] = [[.PNG]]، و [[Path('Makefile').suffix]] = [['']]، و [[Path('a.tar.gz').suffix]] = [[.gz]] (آخر امتداد بس). و [[lower()]] حروف صغيرة، فـ [[.PNG]] و [[.png]] يتعدّوا مع بعض.

### [[collections.Counter(...)]]

[[Counter]] بياخد أي حاجة تتلف عليها ويعدّ كل قيمة اتكررت كام مرة. واللي جوه القوسين **generator expression**: زي list comprehension من غير القوسين المربعين، بيطلّع القيم واحدة واحدة من غير ما يعمل list.

### [[.most_common(5)]]

أكتر 5 كـ list من [[(القيمة، العدد)]]:

~~~text الناتج (python:3.13-slim، وعلى ويندوز Python 3.14 نفس الناتج)
[('.py', 3), ('.md', 2), ('.png', 2), ('.jpg', 1)]
~~~

٤ بس لأن مفيش غير ٤ امتدادات.

---

## ٢. bash: ٦ أوامر في pipe

~~~bash
find . -type f -name '*.*' -not -path './.git/*' | sed 's/.*\.//' | sort | uniq -c | sort -rn | head -5
~~~

[[|]] (pipe) بيوصّل ناتج الأمر اللي قبله كمدخل للي بعده. نمشي عليهم واحد واحد ونشوف الناتج بعد كل خطوة (في [[python:3.13-slim]]):

### [[find . -type f -name '*.*' -not -path './.git/*']]

| الحتة | معناها |
|---|---|
| [[.]] | ابدأ من الفولدر الحالي، وادخل كل اللي تحته |
| [[-type f]] | ملفات بس (f = file) |
| [[-name '*.*']] | اسمها فيه نقطة |
| [[-not -path './.git/*']] | ومسارها مش جوه [[.git]] |

~~~text الناتج
./NOTES.md
./img/y.png
./img/x.PNG
./img/z.jpg
./docs/README.md
./src/a.py
./src/c.py
./src/b.py
~~~

### [[sed 's/.*\.//']]

[[s/قديم/جديد/]] = استبدل. والقديم هنا regex: [[.*]] أي حاجة، و [[\.]] نقطة حقيقية (من غير [[\]] النقطة معناها «أي حرف»). و [[.*]] طمّاع، بياخد أطول حتة، فبيوصل لآخر نقطة. والجديد فاضي، فكل حاجة لحد آخر نقطة بتتشال ويفضل الامتداد:

~~~text الناتج
md
png
PNG
jpg
md
py
py
py
~~~

### [[sort | uniq -c]]

[[uniq]] بيدمج السطور المتكررة **اللي جنب بعض بس**، عشان كده [[sort]] قبله لازم. و [[-c]] (count) يكتب العدد قدام كل واحد:

~~~text الناتج
      1 PNG
      1 jpg
      2 md
      1 png
      3 py
~~~

### [[sort -rn | head -5]]

[[-n]] رتّب كأرقام (مش نص: من غيرها [[10]] تيجي قبل [[9]])، و [[-r]] من الكبير للصغير. و [[head -5]] أول 5 سطور:

~~~text الناتج
      3 py
      2 md
      1 png
      1 jpg
      1 PNG
~~~

[[PNG]] و [[png]] اتعدّوا لوحدهم: كل الأوامر دي حساسة لحالة الحروف.

---

## ٣. PowerShell: objects مش نص

~~~powershell
Get-ChildItem -Recurse -File | Group-Object Extension | Sort-Object Count -Descending | Select-Object -First 5 Count, Name
~~~

| الأمر | بيعمل إيه |
|---|---|
| [[Get-ChildItem -Recurse -File]] | كل الملفات هنا وتحت (زي [[find -type f]]). بيرجّع object لكل ملف، فيه خاصية [[Extension]] جاهزة |
| [[Group-Object Extension]] | جمّع الملفات اللي ليها نفس [[Extension]]. كل مجموعة ليها [[Count]] و [[Name]] |
| [[Sort-Object Count -Descending]] | رتّب بالعدد من الكبير للصغير |
| [[Select-Object -First 5 Count, Name]] | أول 5، والعمودين دول بس |

مفيش [[sed]] ولا قص نص: الامتداد خاصية في الـ object. جربته في PowerShell 7 على ويندوز، و [[.git]] معمول بـ [[git init]]:

~~~text الناتج
Count Name
----- ----
    3 .py
    2 .md
    2 .PNG
    1
    1 .jpg
~~~

- [[2 .PNG]]: [[Group-Object]] مش حساس لحالة الحروف، فجمع الاتنين، والاسم اتاخد من أول واحد قابله ([[x.PNG]]).
- السطر اللي اسمه فاضي ده [[Makefile]]: مالوش امتداد، فـ [[Extension]] فاضية، و PowerShell عدّه (مفيش شرط [[*.*]] هنا).
- [[.git]] مدخلش: [[Get-ChildItem]] من غير [[-Force]] بيسيب الحاجات المخفية، و [[git init]] بيعمل [[.git]] مخفي ([[(Get-Item -Force .git).Attributes]] طلع [[Hidden, Directory]]).

وفي Windows PowerShell 5.1 نفس الأرقام، بس الترتيب بين [[.PNG]] و [[.md]] (الاتنين 2) اتبدّل: [[Sort-Object]] مش بيضمن ترتيب المتساويين.

---

## ٤. المقارنة

| | Python | bash | PowerShell |
|---|---|---|---|
| [[PNG]] و [[png]] | مع بعض ([[lower()]]) | لوحدهم | مع بعض |
| [[Makefile]] | مش محسوب | مش محسوب | محسوب (اسم فاضي) |
| [[.git]] | متشال بشرط | متشال بـ [[-not -path]] | متشال لأنه مخفي (لو مخفي فعلًا) |
| بيشتغل فين | أي نظام عليه Python | لينكس وماك (وويندوز بـ WSL أو Git Bash) | ويندوز، و [[pwsh]] على لينكس وماك |

التلاتة «صح»، بس كل واحد ليه افتراضات. ولو [[.git]] اتعمل بـ [[mkdir]] على ويندوز مش هيبقى مخفي، و PowerShell هيدخله (التفاصيل في الـ sol).

---

## الخلاصة

- **bash**: لما الشغل توصيل أوامر جاهزة ببعض. كل حاجة نص، وكل خطوة بتقص وتلزق سطور.
- **PowerShell**: على ويندوز، والأوامر بترجّع objects ليها خصائص، فمفيش قص نص.
- **Python**: لما فيه منطق أو بيانات، أو لازم نفس الكود يشتغل على كل الأنظمة، أو السكربت هيكبر ويتختبر.`,
          lines: [
            "Python (على أي نظام): Counter على امتداد كل ملف (بحروف صغيرة) بره .git، أكتر 5.",
            "bash: الملفات اللي ليها امتداد بره .git، خد الامتداد، عد، رتّب، أول 5.",
            "PowerShell: كل الملفات، جمّع بالامتداد، رتّب بالعدد، أول 5."
          ],
          sol: R`على نفس الفولدر، وفيه ملف [[.git/config]]:

bash (لينكس): [[3 py]] و [[2 md]] و [[1 png]] و [[1 jpg]] و [[1 PNG]]: حساس لحالة الحروف، فـ PNG و png اتعدوا لوحدهم. والـ Makefile مالوش امتداد فماتعدّش.

PowerShell (ويندوز): [[3 .py]] و [[2 .md]] و [[2 .PNG]] و [[1]] (اسم فاضي = Makefile) و [[1 .jpg]]. [[Group-Object]] مش حساس لحالة الحروف فجمع PNG و png، وعدّ Makefile بامتداد فاضي. وساب [[.git]] لأن [[Get-ChildItem]] من غير [[-Force]] مبيدخلش الحاجات المخفية. بس خد بالك: على ويندوز «مخفي» خاصية في الفولدر مش نقطة في الاسم. [[.git]] اللي [[git init]] بيعمله مخفي (اتأكدت)، أما اللي عملته بـ [[mkdir]] في درس glob مش مخفي، و Get-ChildItem دخله وعدّ [[config]] كملف من غير امتداد، فالسطر الفاضي بقى [[2]]. على لينكس وماك ([[pwsh]]) أي اسم بيبدأ بنقطة مخفي.

Python: [[[('.py', 3), ('.md', 2), ('.png', 2), ('.jpg', 1)] ]]: الـ [[lower()]] جمع الاتنين، و [[rglob('*.*')]] ساب Makefile، و [[.git]] اتشال بالشرط.

التلاتة صح، بس كل واحد ليه افتراضات مختلفة. وده سبب إنك تختبر سكربت التنضيف على فولدر تجربة الأول، أيًا كانت اللغة.`
        }
      ]
    }
]);
