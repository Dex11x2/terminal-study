// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "Modules والمشروع",
      l: 1,
      n: "import بيدوّر فين، و __name__، وشكل المشروع، و pyproject.toml و uv",
      items: [
        {
          cmd: "import و packages",
          title: "import بيلاقي الملف إزاي، وإيه __name__؟",
          desc: R`كل ملف .py هو module، والفولدر اللي فيه ملفات (ومعاه [[__init__.py]]) package. و [[from app.db import pool]] بيدوّر على [[app/db.py]] في [[sys.path]]، وأول مكان فيه فولدر السكربت اللي شغّلته (أو الفولدر الحالي مع [[python -m]]).

الـ module بيتنفّذ مرة واحدة أول ما حد يعمله import، وبعدين بيتخزن في [[sys.modules]]. و [[if __name__ == "__main__":]] بيشغّل كود لما الملف يتشغّل مباشرة بس، مش لما يتعمله import. وتفاصيل [[python -m]] في تاب Python.`,
          example: R`# app/
#   __init__.py
#   main.py
#   config.py
#   db.py
#   routers/__init__.py
#   routers/users.py
# app/routers/users.py:
from fastapi import APIRouter
from app.db import get_pool
from ..config import settings
router = APIRouter()
def main() -> None:
    print("seeding...", settings.env)
if __name__ == "__main__":
    main()`,
          try: R`اعمل ملف [[a.py]] فيه [[print(__name__)]]، وشغّله مباشرة ([[python a.py]])، وبعدين من ملف تاني اعمل [[import a]]. شوف الاسم اتغير لإيه.`,
          flag: "script",
          deep: {
            why: R`[[ModuleNotFoundError: No module named 'app']] و circular imports من أكتر الأخطاء اللي بتضيّع وقت في مشاريع FastAPI، وسببهم دايمًا إنك مش فاهم Python بيدوّر فين.`,
            how: R`[[import x]] بيدوّر في [[sys.modules]] الأول (لو اتعمله import قبل كده بيرجعه على طول)، وبعدين في [[sys.path]] بالترتيب: فولدر السكربت (أو الفولدر الحالي مع [[-m]])، وبعدين [[PYTHONPATH]]، وبعدين المكتبة الأساسية و site-packages بتاعة الـ venv.

الـ import بينفّذ الـ module كله من فوق لتحت. فأي كود على المستوى الأعلى (اتصال بقاعدة، قراية ملف) بيشتغل أول ما حد يعمل import. عشان كده الحاجات التقيلة مكانها [[lifespan]] أو دالة، مش على مستوى الملف.

[[from ..config import settings]] import نسبي: نقطة يعني نفس الـ package، ونقطتين اللي فوقه. بيشتغل بس لو الملف اتحمّل كجزء من package (بـ [[-m]] أو import)، مش لو شغّلته كسكربت مباشرة.

الـ circular import: [[a.py]] بيعمل import من [[b.py]] و [[b.py]] بيعمل import من [[a.py]]، فواحد فيهم بيتقري وهو لسه متنفّذش كله ([[ImportError: cannot import name ... (most likely due to a circular import)]]). الحل: انقل الحاجة المشتركة لـ module تالت، أو اعمل الـ import جوه الدالة.

و [[__init__.py]] بقى اختياري من Python 3.3 (namespace packages)، بس خليه موجود: الأدوات (pytest و mypy) بتتعامل أحسن مع packages عادية.`,
            when: R`من أول يوم في أي مشروع أكبر من ملف واحد. شغّل دايمًا من جذر المشروع بـ [[python -m app.x]] أو [[fastapi dev]]، واستخدم imports مطلقة من اسم الـ package ([[from app.db import ...]]).`,
            mistakes: R`ملف اسمه [[fastapi.py]] أو [[redis.py]] أو [[json.py]] في مشروعك: بيغطي على المكتبة الحقيقية. و [[from module import *]]: مش عارف الأسماء جاية منين. و [[sys.path.append("..")]] عشان تصلّح import: بيشتغل عندك ويقع على السيرفر.`
          },
          lines: [
            "مكتبة من الـ venv.",
            "import مطلق من جذر المشروع: الأوضح.",
            "import نسبي: config.py في الـ package اللي فوق.",
            "متغير على مستوى الـ module: بيتعمل مرة واحدة مع أول import.",
            "دالة.",
            "الجسم.",
            R`الملف اتشغّل مباشرة ([[python -m app.routers.users]])؟`,
            "يبقى شغّل main. لو اتعمله import، ده مش هيشتغل."
          ],
          sol: R`[[python a.py]] بيطبع [[__main__]]، و [[python b.py]] (اللي فيه [[import a]]) بيطبع [[a]]. الملف اللي بتشغّله مباشرة اسمه دايمًا [[__main__]]، وأي ملف بيتعمله import بياخد اسم الـ module بتاعه (ولو جوه package هيبقى [[app.routers.users]] مثلًا).

ده بالظبط اللي بيخلي [[if __name__ == "__main__":]] تشتغل: الكود اللي جواها بيتنفذ لما تشغّل الملف بس، مش لما حد يعمله import. ولو عملت [[import a]] مرتين في نفس البرنامج هتلاقي الطباعة مرة واحدة بس، لأن Python بيحفظ الـ module في [[sys.modules]] وبيرجّعه من غير ما يشغّله تاني.`
        },
        {
          cmd: "uv و pyproject.toml",
          title: "مشروع Python حديث: pyproject.toml و uv",
          desc: R`[[pyproject.toml]] ملف المشروع الحديث: اسمه، ونسخة Python، والمكتبات، وإعدادات الأدوات (ruff و pytest و mypy و FastAPI) في ملف واحد. و [[uv]] (من Astral) أداة واحدة بتعمل شغل venv و pip و pip-tools مع بعض وأسرع بكتير: [[uv add]] بتضيف المكتبة للملف وتسطّبها وتحدّث [[uv.lock]].

venv و pip و requirements.txt بالتفصيل في تاب Python، ولسه شغالين تمام؛ و uv بديل بقى منتشر جدًا، وتوثيق FastAPI نفسه بيستخدمه.`,
          example: R`curl -LsSf https://astral.sh/uv/install.sh | sh
uv init shop-api && cd shop-api
uv python pin 3.14
uv add "fastapi[standard]" asyncpg redis
uv add --dev pytest ruff mypy
uv run fastapi dev main.py
uv sync --locked
uv export --no-hashes > requirements.txt`,
          try: R`اعمل مشروع بـ [[uv init]]، وضيف fastapi، وافتح [[pyproject.toml]] و [[uv.lock]] وشوف اتكتب فيهم إيه. وبعدين امسح [[.venv]] خالص واعمل [[uv sync]] وشوف الوقت.`,
          deep: {
            why: "requirements.txt من غير lock بيطلّع نسخ مختلفة كل مرة، و pip-tools أداة زيادة، والـ venv بيتعمل بإيدك، ونسخة Python نفسها حكاية تانية (pyenv). uv بيجمعهم في أداة واحدة، وأسرع ١٠ لـ ١٠٠ مرة من pip لأنه مكتوب بـ Rust وبيعمل cache ذكي.",
            how: R`[[uv init]] بيعمل [[pyproject.toml]] و [[.python-version]] و [[main.py]]. و [[uv add pkg]] بيكتب المكتبة في [[dependencies]] بنطاق نسخ ([[>=]] آخر نسخة)، ويحل كل الـ dependencies ويكتب النسخ بالظبط في [[uv.lock]]، ويسطّب في [[.venv]]. و [[--dev]] بيحطها في مجموعة dev، ومش هتتسطّب في الإنتاج لو قلت [[--no-dev]].

[[uv run cmd]] بيتأكد إن الـ venv متزامن مع الـ lock وبعدين يشغّل الأمر جواه، فمش محتاج activate. و [[uv python pin]] بيحدد نسخة Python، و uv بينزّلها لو مش موجودة.

[[uv sync --locked]] في CI و Docker: بيسطّب من الـ lock بالظبط، ويفشل لو [[pyproject.toml]] اتغير والـ lock محدّثش. وفي الـ Dockerfile الترتيب زي pip: انسخ [[pyproject.toml]] و [[uv.lock]] الأول، و [[uv sync --locked --no-dev]]، وبعدين الكود (الـ Dockerfile الكامل بـ pip في تاب Python).

و [[uv export]] بيطلّع requirements.txt لو أداة أو منصة لسه محتاجاه.

وإعدادات الأدوات في نفس الملف: [[[tool.ruff]]] و [[[tool.pytest.ini_options]]] و [[[tool.fastapi]]].`,
            when: "أي مشروع جديد. ولو المشروع قايم على pip و requirements.txt وشغال، مفيش داعي تغيّر النهارده.",
            mistakes: R`تعمل commit لـ [[pyproject.toml]] من غير [[uv.lock]] (الـ lock لازم يتعمله commit في التطبيقات). وتخلط [[pip install]] جوه venv بتاع uv فالـ lock ميعرفش عنها حاجة. وتنسى [[--locked]] في CI فالـ lock يتحدّث هناك في صمت.`
          },
          lines: [
            "سطّب uv (مرة واحدة على الجهاز).",
            R`مشروع جديد فيه [[pyproject.toml]]، وادخل فيه.`,
            R`ثبّت نسخة Python في [[.python-version]]، و uv بينزّلها لو مش موجودة.`,
            "ضيف مكتبات: بتتكتب في pyproject، وتتقفل في uv.lock، وتتسطّب في .venv.",
            "أدوات التطوير في مجموعة لوحدها.",
            "شغّل جوه الـ venv من غير activate (بعد ما تكتب التطبيق في main.py).",
            "سطّب من الـ lock بالظبط، ويفشل لو مش متزامن: لـ CI و Docker.",
            "requirements.txt لو حاجة لسه محتاجاه."
          ],
          sol: R`بعد [[uv init shop-api]] و [[uv add "fastapi[standard]"]] هتلاقي في [[pyproject.toml]] قسم [[[project]]] فيه [[name]] و [[version]] و [[requires-python]] (على حسب نسخة Python اللي uv لقاها أو اللي عملتلها pin) و [[dependencies = ["fastapi[standard]>=0.1xx.x"]]]، يعني uv كتب اللي إنت طلبته بس بحد أدنى. أما [[uv.lock]] فطويل جدًا: فيه كل الـ packages (الـ dependencies وdependencies بتاعتها، حوالي ٥٠ واحدة لـ fastapi[standard])، كل واحدة بنسختها الدقيقة ورابط تحميلها و [[hash]] بتاعها.

وبعد [[rm -rf .venv]] و [[uv sync]] الوقت هيبقى صغير جدًا (في تجربتنا أقل من ثانية)، لأن uv بيجيب الـ packages من الـ cache بتاعه ويعمل links بدل ما ينزّل وينسخ. الفرق ده هو سبب إن الناس نقلت من pip. ولو [[uv sync]] أخد وقت طويل، يبقى الـ cache فاضي (أول مرة على الجهاز) أو في CI من غير cache. والـ [[pyproject.toml]] بتكتبه إنت، والـ [[uv.lock]] uv بيكتبه، والاتنين يتعملهم commit.`
        }
      ]
    },
    {
      t: "ملفات وداتا وتواريخ",
      l: 1,
      n: "pathlib للمسارات، و csv و json من ملف لملف، و datetime بتوقيت صح، و re للنصوص",
      items: [
        {
          cmd: "pathlib",
          title: "المسارات والملفات بـ pathlib بدل os.path",
          desc: R`[[pathlib.Path]] بيمثّل مسار كـ object: تبنيه بـ [[/]] ([[base / "reports" / "sales.csv"]])، وتسأله [[exists()]] و [[is_file()]]، وتاخد منه [[name]] و [[stem]] و [[suffix]] و [[parent]]، وتقرا وتكتب بـ [[read_text]] و [[write_text]]، وتدوّر بـ [[glob]] و [[rglob]].

وبيشتغل صح على لينكس وويندوز وماك من غير ما تفكر في [[/]] ولا [[\]]. الطريقة القديمة ([[os.path.join]] و [[os.listdir]]) لسه شغالة وهتشوفها في كود قديم، بس الجديد بيتكتب بـ pathlib.`,
          example: R`from pathlib import Path
base = Path("data")
reports = base / "reports" / "2026"
reports.mkdir(parents=True, exist_ok=True)
f = reports / "sales.csv"
f.write_text("id,total\n1,150\n", encoding="utf-8")
print(f)                                        # data/reports/2026/sales.csv
print(f.name, f.stem, f.suffix, f.parent.name)  # sales.csv sales .csv 2026
print(f.exists(), f.is_file(), f.stat().st_size)
print(f.read_text(encoding="utf-8").splitlines())
for p in sorted(base.rglob("*.csv")):
    print(p.relative_to(base))
backup = f.with_suffix(".bak")
f.rename(backup)
print(Path.cwd() / "data", Path.home())
here = Path(__file__).resolve().parent
config = here / "config.toml"
backup.unlink(missing_ok=True)`,
          try: R`اعمل فولدر [[inbox]] فيه ملفات فاضية ([[touch inbox/cv.pdf inbox/photo.JPG inbox/logo.png inbox/notes.txt inbox/archive.tar.gz]]). اكتب [[organize(folder, dry_run=True)]] بتنقل كل ملف لفولدر فرعي حسب الامتداد (docs للـ pdf و txt، و images للـ jpg و png، و other للباقي)، وفي وضع الـ dry run تطبع بس هتعمل إيه. وترجع dict بعدد الملفات في كل مجموعة.`,
          sol: R`الـ dry run بيطبع [[[dry-run] cv.pdf -> docs/]] وأخواتها ومبيحركش حاجة، والتشغيل الحقيقي بيطلّع نفس السطور من غير البادئة، والنتيجة [[{'other': 1, 'docs': 2, 'images': 2}]]، والملفات في [[docs/cv.pdf]] و [[images/photo.JPG]] و [[other/archive.tar.gz]] إلخ.

٣ نقط بيقع فيها الناس: [[photo.JPG]] امتداده كبير، فلازم [[p.suffix.lower()]] وإلا هيروح other. و [[archive.tar.gz]] الـ suffix بتاعه [[.gz]] بس (لو محتاج الاتنين: [[p.suffixes]]). و [[sorted(folder.iterdir())]] مش [[folder.iterdir()]] مباشرة وانت بتنقل جوه نفس الفولدر، لأنك بتعدّل الفولدر وانت بتلف عليه، و [[if not p.is_file(): continue]] عشان متنقلش الفولدرات اللي عملتها. والـ dry run عادة لازم تبقى الافتراضي في أي سكربت بينقل أو يمسح.`,
          solCode: R`from pathlib import Path
GROUPS = {".pdf": "docs", ".txt": "docs", ".jpg": "images", ".png": "images"}
def organize(folder: Path, dry_run: bool = True) -> dict[str, int]:
    moved: dict[str, int] = {}
    for p in sorted(folder.iterdir()):
        if not p.is_file():
            continue
        group = GROUPS.get(p.suffix.lower(), "other")
        target = folder / group / p.name
        print(("[dry-run] " if dry_run else "") + f"{p.name} -> {group}/")
        if not dry_run:
            target.parent.mkdir(exist_ok=True)
            p.rename(target)
        moved[group] = moved.get(group, 0) + 1
    return moved
print(organize(Path("inbox")))
print(organize(Path("inbox"), dry_run=False))
print(sorted(str(p.relative_to("inbox")) for p in Path("inbox").rglob("*") if p.is_file()))`,
          flag: "script",
          deep: {
            why: R`سكربتات الأتمتة كلها ملفات: نظّف فولدر، اجمع تقارير، انقل صور، اقرا إعدادات. وكود زي [[os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data")]] بقى [[Path(__file__).resolve().parent.parent / "data"]]: أقصر وأوضح وأقل غلط.`,
            how: R`[[Path("data")]] نسبي للفولدر الحالي (اللي شغّلت منه الأمر، مش فولدر السكربت). عشان توصل لملف جنب السكربت نفسه: [[Path(__file__).resolve().parent]]. و [[Path.cwd()]] و [[Path.home()]] للفولدر الحالي والـ home.

[[/]] بيبني المسار ([[Path]] عرّف [[__truediv__]]، درس «dunder methods»). و [[mkdir(parents=True, exist_ok=True)]] زي [[mkdir -p]]. و [[with_suffix]] و [[with_name]] بيرجّعوا Path جديد (الـ Path immutable). و [[rename]] بينقل، و [[unlink(missing_ok=True)]] بيمسح من غير ما يرمي لو مش موجود، و [[shutil.copy]] و [[shutil.rmtree]] للنسخ ومسح فولدر كامل.

[[glob("*.csv")]] في الفولدر ده بس، و [[rglob("*.csv")]] في كل اللي تحته. والاتنين generators، فلو هتعدّل وانت بتلف، حوّلهم list الأول. و [[relative_to]] بيطلّع المسار نسبةً لفولدر.

[[read_text]] و [[write_text]] للملفات الصغيرة (بيقروا الملف كله مرة واحدة). للملفات الكبيرة: [[with p.open(encoding="utf-8") as f: for line in f]] (درس «generators و yield»). و [[encoding="utf-8"]] دايمًا عشان ويندوز.`,
            when: R`أي كود بيلمس ملفات أو فولدرات. و FastAPI نفسه بيقبل [[Path]] في [[FileResponse]] و [[StaticFiles]]. والملفات اللي المستخدم بيرفعها: اسم الملف من الـ request مينفعش يتحط في مسار مباشرة (path traversal: [[../../etc/passwd]])، اعمل اسم جديد بـ uuid.`,
            mistakes: R`مسارات نسبية في سكربت بيتشغّل من cron أو من فولدر تاني (بيدوّر في مكان غلط). و [[str + "/" + str]] بدل [[/]]. و [[p.suffix == ".jpg"]] من غير [[lower()]]. و [[rmtree]] على متغير ممكن يبقى فاضي أو [[/]]. وتنسى [[encoding]] فالعربي يبوظ على ويندوز.`
          },
          lines: [
            "import.",
            R`مسار نسبي للفولدر الحالي.`,
            R`[[/]] بيبني المسار: data/reports/2026.`,
            R`زي [[mkdir -p]]: اعمل الفولدرات اللي فوقه، ومتعترضش لو موجود.`,
            "مسار ملف.",
            "اكتب نص في الملف (وبيتقفل لوحده).",
            "بيطبع المسار.",
            R`الاسم، ومن غير امتداد، والامتداد، واسم الفولدر اللي فوقه.`,
            "موجود؟ ملف؟ والحجم بالبايت.",
            "اقرا الملف كله وقسّمه سطور.",
            R`[[rglob]]: كل ملفات الـ csv تحت data بأي عمق.`,
            "المسار نسبةً لـ data.",
            "Path جديد بامتداد تاني (الأصلي مبيتغيرش).",
            "انقل/غيّر الاسم.",
            "الفولدر الحالي والـ home.",
            "الفولدر اللي فيه السكربت نفسه، مهما كان مكان التشغيل.",
            "ملف جنب السكربت.",
            "امسح، ومترميش لو مش موجود."
          ]
        },
        {
          cmd: "csv و json",
          title: "من CSV لـ JSON وبالعكس: من ملف لملف",
          desc: R`[[csv.DictReader]] بيقرا كل صف كـ dict بأسماء الأعمدة من أول سطر، و [[csv.DictWriter]] بيكتب list of dicts. وافتح ملفات الـ CSV دايمًا بـ [[newline=""]] و [[encoding="utf-8"]]. وكل القيم اللي بتيجي من CSV strings، فحوّل الأرقام بنفسك.

و [[json.loads]] و [[json.dumps]] بيحوّلوا بين string و dict/list، و [[json.load]] و [[json.dump]] نفس الكلام مع ملف مفتوح. و [[ensure_ascii=False]] عشان العربي يتكتب عربي مش [[\u0633]]، و [[indent=2]] للقراية.`,
          example: R`import csv
import json
from datetime import date
from pathlib import Path
with open("orders.csv", newline="", encoding="utf-8") as f:
    rows = list(csv.DictReader(f))
print(rows[2])                        # {'id': '3', 'name': 'Ali, Jr.', 'city': 'Cairo', 'total': '45'}
for r in rows:
    r["id"] = int(r["id"])
    r["total"] = float(r["total"])
Path("orders.json").write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")
data = json.loads(Path("orders.json").read_text(encoding="utf-8"))
cairo = [o for o in data if o["city"] == "Cairo"]
with open("cairo.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["id", "name", "total"], extrasaction="ignore")
    writer.writeheader()
    writer.writerows(cairo)
with open("events.jsonl", "w", encoding="utf-8") as f:
    for o in data:
        f.write(json.dumps({"order": o["id"], "city": o["city"]}) + "\n")
payload = {"day": date(2026, 9, 29), "count": len(data)}
print(json.dumps(payload, default=str))   # {"day": "2026-09-29", "count": 3}
json.dumps(payload)                       # TypeError: Object of type date is not JSON serializable`,
          try: R`من نفس [[orders.csv]] (أعمدة id و name و city و total)، اعمل ملخص لكل مدينة: عدد الطلبات والإجمالي، مترتب بالإجمالي تنازلي. اكتبه في [[summary.json]] و [[summary.csv]]. خلي في الـ CSV صف فيه فاصلة جوه الاسم ([["Ali, Jr."]]) وصف المدينة فيه مسافة زيادة ([[ Cairo]]).`,
          sol: R`مع الـ ٣ صفوف: [[[{'city': 'Cairo', 'orders': 2, 'total': 195.5}, {'city': 'Alex', 'orders': 1, 'total': 80.0}]]]، والـ [[summary.csv]] فيه [[city,orders,total]] وبعدين [[Cairo,2,195.5]] و [[Alex,1,80.0]].

الاسم اللي فيه فاصلة بيتقري صح لأن CSV بيحطه بين علامات تنصيص ([["Ali, Jr."]])، ودي بالظبط اللي بتبوظ لو قسّمت السطر بـ [[line.split(",")]] بإيدك. و [[row["city"].strip()]] عشان [[" Cairo"]] و [["Cairo"]] ميبقوش مدينتين. و [[float(row["total"])]] لازم، وإلا [["150.5" + "45"]] هيبقى string. و [[round]] بعد كل جمع عشان أخطاء الـ float ([[0.1 + 0.2]])، ولو دي فلوس حقيقية استخدم [[Decimal]] أو قروش كـ int. و [[setdefault]] بيعمل الـ dict الفاضي أول مرة بس.`,
          solCode: R`import csv
import json
from pathlib import Path
def summarize(src: Path) -> list[dict]:
    by_city: dict[str, dict] = {}
    with src.open(newline="", encoding="utf-8") as f:
        for row in csv.DictReader(f):
            city = row["city"].strip()
            s = by_city.setdefault(city, {"city": city, "orders": 0, "total": 0.0})
            s["orders"] += 1
            s["total"] = round(s["total"] + float(row["total"]), 2)
    return sorted(by_city.values(), key=lambda s: s["total"], reverse=True)
summary = summarize(Path("orders.csv"))
Path("summary.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
with open("summary.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=["city", "orders", "total"])
    w.writeheader()
    w.writerows(summary)
print(summary)
print(Path("summary.csv").read_text(encoding="utf-8"))`,
          flag: "script",
          deep: {
            why: R`«العميل بعت Excel، حمّله في النظام» و «طلّع تقرير CSV للمحاسب» و «حوّل ملف JSON من API قديم»: من أكتر المهام اللي هتتطلب منك، وأغلبها سكربت ٢٠ سطر لو عارف الـ csv و json صح، وساعات كتير ضايعة لو بتقسّم بـ split بإيدك.`,
            how: R`[[newline=""]] لأن الـ csv module بيتعامل مع نهايات السطور بنفسه (وبيكتب [[\r\n]] افتراضيًا زي المعيار)، ومن غيره هتلاقي سطور فاضية بين الصفوف على ويندوز، والقيم اللي فيها newline تبوظ. و Excel بيحب [[encoding="utf-8-sig"]] (فيه BOM) عشان يفتح العربي صح؛ لو الملف جاي من Excel وأول عمود اسمه [[﻿id]]، ده السبب.

[[DictWriter(fieldnames=...)]] بيحدد الأعمدة وترتيبها، و [[extrasaction="ignore"]] بيتجاهل المفاتيح الزيادة بدل ما يرمي [[ValueError]].

JSON وأنواع Python: object ↔ dict، و array ↔ list، و string ↔ str، و number ↔ int/float، و true/false/null ↔ True/False/None. وأي حاجة تانية ([[datetime]] و [[Decimal]] و [[set]] و [[UUID]]) بترمي [[TypeError: Object of type date is not JSON serializable]]. الحل السريع [[default=str]]، والحل الصح إنك تحوّلها بنفسك أو تسيب Pydantic يعمل ده ([[model_dump(mode="json")]]، المستوى ٢).

JSON Lines ([[.jsonl]]): كل سطر JSON لوحده، فتقدر تكتب وتقرا سطر سطر من غير ما تحمّل الملف كله. ده الشكل المعتاد للّوج والـ exports الكبيرة.`,
            when: R`csv لأي داتا جدولية بتتبادل مع ناس أو Excel. json للإعدادات والـ APIs والداتا المتداخلة. jsonl للّوج والملفات الكبيرة. ولو محتاج تحليل (group by و join و pivot) على ملفات كبيرة: pandas أو polars، بس الأساس ده الأول.`,
            mistakes: R`[[line.split(",")]] بدل الـ csv module (أي فاصلة جوه قيمة بتبوظ كل حاجة). ونسيان [[newline=""]]. ونسيان إن كل القيم strings ([["10" > "9"]] False!). و [[json.dumps]] من غير [[ensure_ascii=False]] والعربي يطلع [[\u....]]. و [[default=str]] على كل حاجة من غير ما تفكر، فـ Decimal يطلع string والطرف التاني يستنى رقم.`
          },
          lines: [
            "import csv.",
            "import json.",
            "للتاريخ.",
            "المسارات.",
            R`افتح الـ CSV بـ [[newline=""]] و utf-8.`,
            R`كل صف dict، و [[list]] عشان نقرا الكل قبل ما الملف يتقفل.`,
            "الاسم اللي فيه فاصلة اتقري صح، وكل القيم strings.",
            "لف على الصفوف.",
            "حوّل id لرقم بنفسك.",
            "والإجمالي.",
            R`اكتب JSON: [[ensure_ascii=False]] للعربي و [[indent=2]] للقراية.`,
            R`[[loads]]: من string لـ list of dicts.`,
            "فلتر.",
            "افتح ملف CSV للكتابة.",
            R`الأعمدة وترتيبها، و [[extrasaction="ignore"]] بيتجاهل city.`,
            "سطر العناوين.",
            "كل الصفوف مرة واحدة.",
            "ملف JSON Lines.",
            "لف على الطلبات.",
            "كل سطر JSON كامل لوحده.",
            R`dict فيه [[date]].`,
            R`[[default=str]]: أي نوع مش معروف يتحول string.`,
            R`من غيره: [[TypeError]].`
          ]
        },
        {
          cmd: "datetime و zoneinfo",
          title: "تواريخ بتوقيت صح: خزّن UTC واعرض بتوقيت القاهرة",
          desc: R`فيه نوعين [[datetime]]: naive (ملوش timezone، [[tzinfo]] بـ None) و aware (عارف هو توقيت إيه). الـ naive هو مصدر أغلب bugs الوقت: [[datetime.now()]] بيرجع وقت السيرفر، والسيرفر ممكن يبقى UTC والمستخدم في القاهرة.

القاعدة: جوه البرنامج وفي القاعدة كل حاجة aware بـ UTC ([[datetime.now(UTC)]]، و [[timestamptz]] في Postgres). وبس وقت العرض حوّل لتوقيت المستخدم بـ [[astimezone(ZoneInfo("Africa/Cairo"))]]. و [[zoneinfo]] في المكتبة الأساسية من 3.9 وبيقرا قاعدة التوقيتات بتاعة النظام، فبيعرف التوقيت الصيفي لوحده.`,
          example: R`from datetime import UTC, date, datetime, timedelta
from zoneinfo import ZoneInfo
CAIRO = ZoneInfo("Africa/Cairo")
now = datetime.now(UTC)
print(now.isoformat())                         # 2026-09-29T09:15:00.123456+00:00
naive = datetime.now()
print(naive.tzinfo)                            # None: مش عارف هو توقيت إيه
created = datetime(2026, 9, 29, 21, 30, tzinfo=UTC)
local = created.astimezone(CAIRO)
print(local)                                   # 2026-09-30 00:30:00+03:00: اليوم اتغير!
print(local.strftime("%d/%m/%Y %I:%M %p"))     # 30/09/2026 12:30 AM
winter = datetime(2026, 1, 15, 12, tzinfo=UTC).astimezone(CAIRO)
print(winter.utcoffset())                      # 2:00:00: الشتا +2 والصيف +3
meeting = datetime(2026, 10, 5, 10, 0, tzinfo=CAIRO)
print(meeting.astimezone(UTC))                 # 2026-10-05 07:00:00+00:00
parsed = datetime.fromisoformat("2026-09-29T10:00:00Z")
print(parsed.tzinfo, parsed + timedelta(days=30))
day_start = datetime.combine(local.date(), datetime.min.time(), tzinfo=CAIRO).astimezone(UTC)
print(day_start)                               # 2026-09-29 21:00:00+00:00
print(date(2026, 12, 25) - date(2026, 9, 29))  # 87 days, 0:00:00
naive < now                                    # TypeError: can't compare offset-naive and offset-aware datetimes`,
          try: R`عندك طلبات بأوقات UTC: [["2026-09-29T20:59:00Z"]] و [["2026-09-29T21:00:00Z"]] و [["2026-09-30T12:00:00Z"]] و [["2026-09-30T20:59:59Z"]] و [["2026-09-30T21:00:00Z"]]. اكتب [[cairo_day_range(d)]] بترجع بداية ونهاية يوم بتوقيت القاهرة كـ UTC، واستخدمها تعد «طلبات يوم 30 سبتمبر» زي ما المحل في القاهرة شايفها. وبعدين اطبع التاريخ المحلي لكل طلب.`,
          sol: R`يوم 30 سبتمبر في القاهرة (التوقيت الصيفي، +3) من [[2026-09-29 21:00:00+00:00]] لحد [[2026-09-30 21:00:00+00:00]]، فالطلبات [[3]]: التاني والتالت والرابع. والتواريخ المحلية: [[['2026-09-29', '2026-09-30', '2026-09-30', '2026-09-30', '2026-10-01']]].

الغلط المشهور إنك تعد بتاريخ UTC ([[o.startswith("2026-09-30")]])، فتطلع ٢ بس: الطلب اللي الساعة 9 بالليل UTC (12 بعد نص الليل في القاهرة) هيتحسب على اليوم اللي قبله. والفترة نصها مفتوح ([[start <= t < end]]) عشان مفيش طلب يتحسب في يومين. ومتحسبش الفرق بإيدك ([[timedelta(hours=3)]])، لأن مصر بترجع +2 في الشتا: من 2023 التوقيت الصيفي من آخر جمعة في أبريل لآخر خميس في أكتوبر (في 2026 من 24 أبريل لـ 29 أكتوبر)، و [[ZoneInfo]] بيعرف ده لوحده من قاعدة tzdata.`,
          solCode: R`from datetime import UTC, date, datetime, time, timedelta
from zoneinfo import ZoneInfo
CAIRO = ZoneInfo("Africa/Cairo")
orders = ["2026-09-29T20:59:00Z", "2026-09-29T21:00:00Z", "2026-09-30T12:00:00Z",
          "2026-09-30T20:59:59Z", "2026-09-30T21:00:00Z"]
def cairo_day_range(d: date) -> tuple[datetime, datetime]:
    start = datetime.combine(d, time.min, tzinfo=CAIRO)
    end = datetime.combine(d + timedelta(days=1), time.min, tzinfo=CAIRO)
    return start.astimezone(UTC), end.astimezone(UTC)
start, end = cairo_day_range(date(2026, 9, 30))
print(start, end)
todays = [o for o in orders if start <= datetime.fromisoformat(o) < end]
print(len(todays), todays)
by_local_day = [datetime.fromisoformat(o).astimezone(CAIRO).date().isoformat() for o in orders]
print(by_local_day)`,
          flag: "script",
          deep: {
            why: R`«طلبات النهارده» و «الكوبون ينتهي آخر اليوم» و «الحجز الساعة 10»: كلهم وقت، وكلهم بيبوظوا لو السيرفر في منطقة زمنية والمستخدم في منطقة تانية، أو لما التوقيت الصيفي يبدأ. والـ bugs دي بتظهر مرتين في السنة أو لعميل في بلد تاني، فبتبقى صعبة جدًا تلاقيها.`,
            how: R`[[datetime.now(UTC)]] aware، و [[datetime.now()]] و [[datetime.utcnow()]] naive (الأخيرة deprecated من 3.12 لأنها بترجع وقت UTC من غير ما تقول إنه UTC). و [[UTC]] اختصار لـ [[timezone.utc]] من 3.11.

[[astimezone(tz)]] بيحوّل نفس اللحظة لتوقيت تاني: الساعة بتتغير واللحظة زي ما هي. أما [[replace(tzinfo=tz)]] فبيلزق timezone على نفس الساعة، ودي لحظة تانية خالص، فمتستخدمهاش للتحويل. و [[datetime(..., tzinfo=CAIRO)]] صح مع ZoneInfo (بعكس pytz القديمة).

[[fromisoformat]] بيقرا ISO 8601 بما فيها [[Z]] (من 3.11)، و [[isoformat()]] بيكتبها: ده الشكل اللي تبعته في JSON. و [[strftime]] للعرض ([[%d/%m/%Y %I:%M %p]])، و [[strptime]] للقراية بشكل معين.

[[timedelta]] للفروق والإضافة. و [[date - date]] بيرجع timedelta. والمقارنة بين naive و aware بترمي [[TypeError]]، ودي حماية مفيدة.

ZoneInfo بيقرا [[/usr/share/zoneinfo]]. في Docker images الصغيرة (slim و alpine) ممكن متكونش موجودة، فـ [[ZoneInfoNotFoundError]]: سطّب [[tzdata]] من pip أو apt. وفي ساعة التغيير فيه أوقات بتتكرر (فصل الشتا) والـ [[fold]] بيفرّق بينهم.`,
            when: R`UTC aware في كل حتة جوه الكود والقاعدة والـ APIs. التوقيت المحلي بس في العرض، أو لما «اليوم» نفسه ليه معنى محلي (تقرير يومي، مواعيد عمل، حجز). ولو المستخدمين في أكتر من بلد، خزّن timezone كل مستخدم ([["Africa/Cairo"]]) واستخدمه في العرض. وفي JS نفس القاعدة (تاب JavaScript درس «UTC و Intl.DateTimeFormat»).`,
            mistakes: R`[[datetime.now()]] على السيرفر. و [[+ timedelta(hours=2)]] كتوقيت مصر (بيبوظ نص السنة). و [[replace(tzinfo=...)]] للتحويل. وتقارن تاريخ UTC بتاريخ محلي. و [[timestamp]] من غير timezone في Postgres. وتخزّن الوقت كـ string بشكل محلي ([["30/09/2026 12:30 AM"]]) مش ISO.`
          },
          lines: [
            R`[[UTC]] (3.11+) و [[date]] و [[timedelta]].`,
            "قاعدة التوقيتات.",
            "توقيت القاهرة، بالتوقيت الصيفي.",
            "الوقت دلوقتي aware بـ UTC: ده اللي تخزّنه.",
            R`ISO 8601 بـ [[+00:00]]: الشكل اللي تبعته في JSON.`,
            "naive: وقت السيرفر من غير timezone.",
            "None: مفيش حاجة تقول ده توقيت إيه.",
            "طلب اتعمل 9:30 بالليل UTC.",
            "نفس اللحظة بتوقيت القاهرة.",
            "بقى 12:30 بعد نص الليل، يوم 30 مش 29.",
            "للعرض.",
            "تاريخ في الشتا.",
            "الفرق +2، مش +3.",
            "ميعاد مكتوب بتوقيت القاهرة.",
            "حوّله لـ UTC للتخزين.",
            R`اقرا ISO، و [[Z]] يعني UTC.`,
            "aware، والإضافة بـ timedelta.",
            "بداية يوم 30 في القاهرة، كـ UTC: للاستعلام من القاعدة.",
            "9 بالليل يوم 29 UTC.",
            "الفرق بين تاريخين.",
            "naive و aware مينفعش يتقارنوا: TypeError."
          ]
        },
        {
          cmd: "re",
          title: "regex في Python: search و findall و sub و groups",
          desc: R`[[re]] مكتبة الـ regex في Python. نفس اللغة اللي اتشرحت في تاب JavaScript (درس «regex: classes و quantifiers» ودرس «groups و flags»)، والفروق في طريقة النداء: [[re.search]] أول تطابق في أي حتة، و [[re.match]] من أول الـ string بس، و [[re.fullmatch]] الـ string كلها، و [[re.findall]] كل التطابقات، و [[re.sub]] استبدال، و [[re.split]] تقسيم.

واكتب الـ pattern دايمًا raw string: [[r"\d+"]]، عشان الـ backslash يوصل للـ regex زي ما هو. ولو هتستخدم نفس الـ pattern كتير: [[re.compile]] مرة واحدة.`,
          example: R`import re
PHONE = re.compile(r"^01[0125]\d{8}$")
print(bool(PHONE.match("01012345678")), bool(PHONE.match("0101234567")))   # True False
print(re.fullmatch(r"\d{4}-\d{2}-\d{2}", "2026-09-29") is not None)        # True
line = '10.0.0.7 - - [29/Sep/2026:10:00:01 +0000] "GET /api/users HTTP/1.1" 500 12'
m = re.search(r'"(?P<method>[A-Z]+) (?P<path>\S+) [^"]*" (?P<status>\d{3})', line)
if m:
    print(m["method"], m["path"], int(m["status"]))                        # GET /api/users 500
text = "كلمني على 01012345678 أو 01298765432"
print(re.findall(r"01\d{9}", text))
print(re.sub(r"(01\d)\d{5}(\d{3})", r"\1*****\2", text))
print(re.split(r"\s*[,;]\s*", "tea , coffee;juice"))                     # ['tea', 'coffee', 'juice']
slug = re.sub(r"[^a-z0-9]+", "-", "Hello, FastAPI World!".lower()).strip("-")
print(slug)                                                                 # hello-fastapi-world
print(re.findall(r"<.+?>", "<b>hi</b>"), re.findall(r"<.+>", "<b>hi</b>"))
print(re.escape("price (EGP)?"))`,
          try: R`عندك سطور لوج بالشكل اللي في المثال (IP وبعدين التاريخ وبعدين [["GET /path HTTP/1.1"]] وبعدين الـ status). اكتب pattern بـ named groups يطلّع الـ IP والـ method والـ path (من غير query string) والـ status، وعدّ أخطاء الـ 5xx لكل path، وعدّ السطور اللي مطابقتش بدل ما توقّع البرنامج. خلي في الداتا [[/api/users?page=2]] وسطر بايظ.`,
          sol: R`الناتج: [[{'/api/users': 2} skipped: 1]]. الطلبين على [[/api/users]] و [[/api/users?page=2]] اتحسبوا path واحد لأن الـ group بتاع الـ path [[[^ ?"]+]] بيقف عند [[?]]، والسطر البايظ اتعد في [[skipped]] بدل ما [[m["status"]]] ترمي [[TypeError: 'NoneType' object is not subscriptable]].

دي أشهر غلطة مع [[re]]: [[search]] و [[match]] بيرجعوا [[None]] لو مفيش تطابق، فلازم [[if m:]] قبل ما تستخدم الـ groups. والتانية [[.*]] الطماعة: [[".*"]] على السطر كله ممكن تبلع من أول علامة تنصيص لآخر واحدة، فاستخدم [[.*?]] أو class محدد زي [[[^"]*]]. ولاحظ إن [[m["status"]]] string، فلو هتقارن بأرقام حوّلها [[int]].`,
          solCode: R`import re
LOG = """10.0.0.7 - - [29/Sep/2026:10:00:01 +0000] "GET /api/users HTTP/1.1" 500 12
10.0.0.8 - - [29/Sep/2026:10:00:02 +0000] "POST /api/orders HTTP/1.1" 201 88
10.0.0.7 - - [29/Sep/2026:10:00:03 +0000] "GET /api/users?page=2 HTTP/1.1" 502 0
bad line here
10.0.0.9 - - [29/Sep/2026:10:00:04 +0000] "GET /health HTTP/1.1" 200 2"""
LINE = re.compile(r'^(?P<ip>\S+) .*?"(?P<method>[A-Z]+) (?P<path>[^ ?"]+)\S* [^"]*" (?P<status>\d{3}) ')
errors: dict[str, int] = {}
skipped = 0
for line in LOG.splitlines():
    m = LINE.match(line)
    if not m:
        skipped += 1
        continue
    if m["status"].startswith("5"):
        errors[m["path"]] = errors.get(m["path"], 0) + 1
print(errors, "skipped:", skipped)`,
          flag: "script",
          deep: {
            why: R`تحليل لوج، وتنضيف داتا جاية من CSV، وفحص شكل رقم تليفون أو كود، و slug من عنوان: كلها regex. و Pydantic نفسه بيقبل [[pattern=]] في [[Field]] (المستوى ٢) بنفس الصيغة.`,
            how: R`[[re.match]] بيطابق من أول الـ string بس (مش لازم لآخرها)، و [[re.fullmatch]] لازم الـ string كلها تطابق: ده اللي عايزه في الـ validation بدل [[^...$]]، لأن [[$]] في Python بيقبل newline في الآخر ([[re.match(r"^\d+$", "12\n")]] بتنجح!).

الـ match object: [[m.group(1)]] أو [[m["name"]]] للـ named group [[(?P<name>...)]] (في JS الصيغة [[(?<name>...)]] من غير P، و Python بيرفضها بـ [[unknown extension]]، فافتكر الـ P). و [[m.groupdict()]] dict بكل الـ named groups.

[[findall]] بيرجع list strings، ولو فيه groups بيرجع الـ groups مش التطابق كله (فخ مشهور). و [[finditer]] بيرجع match objects واحد واحد. و [[sub]] بيقبل [[\1]] في الاستبدال، أو دالة بتاخد الـ match وترجع النص.

الـ flags: [[re.IGNORECASE]] و [[re.MULTILINE]] ([[^]] و [[$]] لكل سطر) و [[re.VERBOSE]] (تكتب الـ pattern على كذا سطر بتعليقات). و [[\d]] في Python بيطابق الأرقام العربية ([[٣]]) كمان لأن الـ strings Unicode؛ لو عايز 0-9 بس: [[[0-9]]] أو [[re.ASCII]].

[[re.escape(s)]] لما بتحط input من المستخدم جوه pattern، عشان [[(]] و [[?]] ميتفهموش كـ regex.`,
            when: R`نمط في نص: فحص شكل، استخراج، استبدال. لكن لو فيه أداة متخصصة استخدمها: [[str.startswith]] و [[in]] و [[split]] للحاجات البسيطة، و [[json]] و [[csv]] و [[urllib.parse]] و [[email.utils]] للصيغ المعروفة، و HTML parser للـ HTML. وتاب JavaScript فيه درس «إمتى regex غلط» بنفس الكلام.`,
            mistakes: R`pattern من غير [[r""]] ([["\d"]] بتطلّع SyntaxWarning، و [["\b"]] بتبقى backspace مش word boundary). و [[re.match]] وانت قصدك search أو fullmatch. ونسيان [[if m:]]. و [[.*]] طماعة. و regex للإيميل طوله ٣ سطور (فحص بسيط + إيميل تأكيد أحسن). و regex متداخل زي [[(a+)+]] على input من المستخدم: ممكن ياخد وقت أُسّي (ReDoS).`
          },
          lines: [
            "import.",
            R`[[compile]] مرة واحدة: موبايل مصري ١١ رقم يبدأ بـ 010 أو 011 أو 012 أو 015.`,
            R`[[match]] بيرجع match object أو None، و [[bool]] بيحوّله.`,
            R`[[fullmatch]]: الـ string كلها لازم تطابق.`,
            "سطر لوج.",
            R`[[search]] في أي حتة، و [[(?P<name>...)]] named groups.`,
            R`لازم [[if m]]: لو مفيش تطابق m بـ None.`,
            R`[[m["name"]]] بيجيب الـ group، والناتج strings فحوّل الرقم.`,
            "نص فيه رقمين.",
            R`[[findall]]: كل التطابقات في list.`,
            R`[[sub]] بـ groups: [[\1]] و [[\2]] بيرجّعوا اللي اتمسك، والنص بينجّم الوسط.`,
            R`[[split]] بـ regex: فاصلة أو semicolon بمسافات أو من غير.`,
            "slug: أي حاجة مش حرف أو رقم تبقى شرطة، وشيل الشرط من الأطراف.",
            "hello-fastapi-world.",
            R`[[.+?]] كسولة: أقصر تطابق. و [[.+]] طماعة: بلعت الكل.`,
            R`[[escape]]: لما بتحط نص من المستخدم جوه pattern.`
          ]
        }
      ]
    },
    {
      t: "collections و itertools و functools",
      l: 1,
      n: "أدوات جاهزة في المكتبة الأساسية بتوفّر عليك loops و dicts بتكتبها بإيدك",
      items: [
        {
          cmd: "collections",
          title: "Counter و defaultdict و deque و namedtuple",
          desc: R`[[collections]] فيها أنواع جاهزة لمشاكل بتتكرر: [[Counter]] للعد (dict قيمه أعداد، و [[most_common]])، و [[defaultdict]] للتجميع (المفتاح الجديد بياخد قيمة افتراضية لوحده)، و [[deque]] طابور سريع من الناحيتين وممكن يبقى بحد أقصى ([[maxlen]])، و [[namedtuple]] tuple بأسماء.

درس «dict» فرّج على Counter و defaultdict بسرعة؛ هنا بالتفصيل ومعاهم deque اللي هو أساس أي طابور أو «آخر N حاجة».`,
          example: R`from collections import Counter, defaultdict, deque, namedtuple
words = "tea coffee tea juice tea coffee".split()
c = Counter(words)
print(c.most_common(2))                        # [('tea', 3), ('coffee', 2)]
print(c["water"])                              # 0: مفيش KeyError
c.update(["water", "tea"])
print(c + Counter(juice=4), c.total())
orders = [("Cairo", "sara"), ("Alex", "omar"), ("Cairo", "ali")]
by_city = defaultdict(list)
for city, user in orders:
    by_city[city].append(user)
print(dict(by_city))                           # {'Cairo': ['sara', 'ali'], 'Alex': ['omar']}
tree = defaultdict(lambda: defaultdict(int))
tree["Cairo"]["tea"] += 2
recent = deque(maxlen=3)
for page in ["/", "/a", "/b", "/c"]:
    recent.append(page)
print(recent)                                  # deque(['/a', '/b', '/c'], maxlen=3)
queue = deque(["job1", "job2"])
queue.appendleft("urgent")
print(queue.popleft(), queue.pop())            # urgent job2
Point = namedtuple("Point", ["lat", "lng"])
p = Point(30.04, 31.23)
print(p.lat, p)`,
          try: R`(١) من list عناوين IP، طلّع أكتر اتنين بيبعتوا طلبات بسطر واحد. (٢) اكتب rate limiter بسيط: [[allow(ip, now)]] بترجع True لو الـ IP ده بعت أقل من ٣ طلبات في آخر ١٠ ثواني، بـ [[defaultdict(deque)]]. جرّبها على IP واحد في الأوقات [[0, 1, 2, 3, 9.9, 10.5, 11]].`,
          sol: R`(١) [[Counter(ips).most_common(2)]] بترجع [[[('1.1.1.1', 3), ('2.2.2.2', 2)]]].

(٢) المتوقع [[[True, True, True, False, False, True, True]]]: أول ٣ مسموحين، و 3 و 9.9 مرفوضين (لسه فيه ٣ في آخر ١٠ ثواني)، وعند 10.5 الطلب اللي كان عند 0 خرج من الشباك فيتسمح، وعند 11 اللي عند 1 خرج. و IP تاني ليه deque لوحده فأول طلب ليه True.

الـ [[deque]] هنا بيدّيك [[popleft()]] بـ O(1)؛ لو استخدمت list و [[pop(0)]] كل شيل بيزق العناصر كلها. ولاحظ إن الطلب المرفوض مبيتسجّلش، وإلا الـ IP اللي بيضرب باستمرار هيفضل مقفول للأبد. والنسخة دي في الذاكرة، فمع كذا worker كل واحد شايف عدّ مختلف؛ النسخة الحقيقية في Redis (درس «redis rate limit» في المستوى ٣).`,
          solCode: R`from collections import Counter, defaultdict, deque
ips = ["1.1.1.1", "2.2.2.2", "1.1.1.1", "3.3.3.3", "1.1.1.1", "2.2.2.2"]
print(Counter(ips).most_common(2))
LIMIT, WINDOW = 3, 10.0
hits: defaultdict[str, deque[float]] = defaultdict(deque)
def allow(ip: str, now: float) -> bool:
    q = hits[ip]
    while q and q[0] <= now - WINDOW:
        q.popleft()
    if len(q) >= LIMIT:
        return False
    q.append(now)
    return True
print([allow("1.1.1.1", t) for t in [0, 1, 2, 3, 9.9, 10.5, 11]])
print(allow("2.2.2.2", 3))`,
          flag: "script",
          deep: {
            why: R`عدّ الكلمات، وتجميع الطلبات حسب المستخدم، و «آخر ١٠٠ سطر لوج»، و BFS في الـ graphs، و طابور jobs: كلها بتتكتب بإيدك بـ dict و if و list، وبتطلع أطول وأبطأ. وفي انترفيوهات الـ DSA، [[Counter]] و [[deque]] بيختصروا نص الحل.`,
            how: R`[[Counter]] dict عادي بس [[c["x"]]] بترجع 0 لو مش موجود (من غير ما تضيف المفتاح). وبيتجمع ويتطرح ([[c1 + c2]] و [[c1 - c2]] وبيشيل الصفر والسالب)، و [[update]] بتزوّد، و [[total()]] (3.10+) مجموع العدّ.

[[defaultdict(factory)]]: لما تطلب مفتاح مش موجود بينادي الـ factory ([[list]] أو [[int]] أو [[set]] أو lambda) ويحط الناتج. خلي بالك: مجرد القراية [[d["x"]]] بتضيف المفتاح، فلو عايز تسأل «موجود؟» استخدم [[in]]. و [[dict(d)]] قبل ما ترجعه من API عشان يبقى dict عادي.

[[deque]]: [[append]] و [[appendleft]] و [[pop]] و [[popleft]] كلهم O(1)، بعكس [[list.insert(0)]] و [[list.pop(0)]] اللي O(n). و [[maxlen]] بيشيل من الناحية التانية لوحده لما يتملى. والوصول بالـ index في النص O(n)، فمش بديل للـ list في كل حاجة.

[[namedtuple]] tuple immutable بأسماء، خفيف وبيتفك زي tuple. للكود الجديد غالبًا [[dataclass(frozen=True)]] أو [[typing.NamedTuple]] (نفس الفكرة بـ type hints) أوضح.`,
            when: R`Counter لأي عدّ. defaultdict لأي «group by» في الذاكرة. deque لأي طابور، أو «آخر N»، أو BFS. وللطابور بين threads: [[queue.Queue]]، وبين coroutines: [[asyncio.Queue]].`,
            mistakes: R`[[list.pop(0)]] في loop على list كبيرة (O(n²)). و [[defaultdict]] وتفتكر إن [[if d[k]:]] مش هتضيف مفتاح. وترجع defaultdict في JSON response وتستغرب من الـ type. و [[Counter]] بتاع حروف لما انت قصدك كلمات ([[Counter("hello world")]] بيعد الحروف؛ محتاج [[.split()]]).`
          },
          lines: [
            "import الأربعة.",
            "list كلمات.",
            "عدّ في سطر.",
            "أكتر اتنين.",
            "مفتاح مش موجود: صفر، ومن غير KeyError.",
            "زوّد عدّ.",
            R`[[+]] بين Counters، و [[total()]] المجموع.`,
            "أزواج (مدينة، مستخدم).",
            "أي مدينة جديدة بتبدأ بـ list فاضية.",
            "لف.",
            R`من غير [[if city not in by_city]].`,
            R`[[dict()]] عشان يتطبع ويترجع كـ dict عادي.`,
            R`متداخل: مدينة ← صنف ← عدد.`,
            "المفتاحين اتعملوا لوحدهم.",
            R`طابور بحد أقصى ٣.`,
            "٤ صفحات.",
            "لما يتملى، الأقدم بيطلع لوحده.",
            "آخر ٣ بس.",
            "طابور عادي.",
            "ضيف في الأول: O(1).",
            R`[[popleft]] و [[pop]]: من الناحيتين O(1).`,
            "namedtuple: tuple بأسماء.",
            "object.",
            "بالاسم، والطباعة واضحة."
          ]
        },
        {
          cmd: "itertools",
          title: "itertools: chain و batched و groupby و pairwise",
          desc: R`[[itertools]] أدوات بتشتغل على أي iterable وبترجع iterators (lazy، مبتحسبش غير لما تطلب): [[chain]] بيوصّل كذا حاجة ورا بعض، و [[batched]] (3.12+) بيقسّم لحتت بحجم ثابت، و [[pairwise]] أزواج متتالية، و [[accumulate]] مجموع متراكم، و [[product]] كل التوافيق، و [[count]] عدّاد مالوش آخر، و [[islice]] قطع من iterator، و [[groupby]] تجميع للعناصر المتجاورة.`,
          example: R`from itertools import accumulate, batched, chain, count, groupby, islice, pairwise, product
from operator import itemgetter
print(list(chain([1, 2], (3, 4), range(5, 7))))       # [1, 2, 3, 4, 5, 6]
print(list(batched(range(7), 3)))                     # [(0, 1, 2), (3, 4, 5), (6,)]
print(list(pairwise([100, 120, 90])))                 # [(100, 120), (120, 90)]
print(list(accumulate([100, -30, 50])))               # [100, 70, 120]: رصيد متراكم
print(list(product(["S", "M"], ["red", "blue"])))
ids = count(start=1000)
print(next(ids), next(ids))                           # 1000 1001
print(list(islice(ids, 3)))                           # [1002, 1003, 1004]
sales = [("Alex", 80), ("Cairo", 150), ("Cairo", 45), ("Alex", 20)]
sales.sort(key=itemgetter(0))
for city, group in groupby(sales, key=itemgetter(0)):
    print(city, sum(amount for _, amount in group))   # Alex 100 ثم Cairo 195`,
          try: R`(١) عندك قراءات حرارة [[[20, 21, 25, 24, 30, 29, 29]]]: طلّع التغيير بين كل قراية واللي بعدها وأكبر زيادة بـ [[pairwise]]. (٢) [[groupby]] على تواريخ [[["2026-09-01", "2026-09-01", "2026-09-02", "2026-09-01"]]] مرة من غير ترتيب ومرة بعد [[sorted]]، وقارن. (٣) قسّم [[range(1, 11)]] لدفعات من ٤ كأنك بتعمل INSERT على دفعات.`,
          sol: R`(١) [[[1, 4, -1, 6, -1, 0]]] وأكبر زيادة [[6]]. (٢) من غير ترتيب: [[[('2026-09-01', 2), ('2026-09-02', 1), ('2026-09-01', 1)]]]، اليوم الأول ظهر مرتين! وبعد [[sorted]]: [[[('2026-09-01', 3), ('2026-09-02', 1)]]]. (٣) [[(1, 2, 3, 4)]] و [[(5, 6, 7, 8)]] و [[(9, 10)]]: آخر دفعة أصغر، وده طبيعي.

الـ groupby هو الفخ المشهور: بيجمّع العناصر المتجاورة بس (زي [[uniq]] في bash)، فلازم ترتّب بنفس الـ key الأول. ولو مش عايز ترتّب، [[defaultdict(list)]] أسهل. والـ [[g]] اللي بيرجع من groupby بيتستهلك أول ما تتحرك للمجموعة اللي بعدها، عشان كده [[len(list(g))]] جوه نفس اللفة.`,
          solCode: R`from itertools import batched, groupby, pairwise
readings = [20, 21, 25, 24, 30, 29, 29]
changes = [b - a for a, b in pairwise(readings)]
print(changes, max(changes))
days = ["2026-09-01", "2026-09-01", "2026-09-02", "2026-09-01"]
print([(d, len(list(g))) for d, g in groupby(days)])
print([(d, len(list(g))) for d, g in groupby(sorted(days))])
ids = list(range(1, 11))
for chunk in batched(ids, 4):
    print("INSERT batch:", chunk)`,
          flag: "script",
          deep: {
            why: R`دفعات لـ API بيقبل ١٠٠ عنصر في الطلب، و «الفرق عن امبارح»، و «رصيد بعد كل عملية»، و «كل مقاسات ×كل ألوان»: كلها loops فيها indexes و off-by-one. و itertools بيقولها في كلمة، ومن غير ما يحمّل الداتا كلها في الذاكرة.`,
            how: R`كل دوال itertools بترجع iterators: بتتلف عليها مرة واحدة ومبتحسبش حاجة غير لما تطلب. فـ [[count()]] مالوش آخر ومينفعش تعمل منه list، بس ينفع مع [[islice]] أو [[zip]] أو [[next]].

[[batched(it, n)]] بيرجع tuples، ومن 3.13 فيه [[strict=True]] بيرمي لو آخر دفعة ناقصة. و [[pairwise]] (3.10+) زي [[zip(a, a[1:])]] بس لأي iterable. و [[accumulate]] الافتراضي جمع، وتقدر تديله دالة ([[accumulate(xs, max)]] أعلى قيمة لحد دلوقتي).

[[groupby(it, key)]] بيرجع أزواج (المفتاح، iterator للمجموعة)، وبيعمل مجموعة جديدة كل ما الـ key يتغير عن اللي قبله. و [[operator.itemgetter(0)]] دالة جاهزة بتساوي [[lambda x: x[0]]].

وفيه كمان [[combinations]] و [[permutations]] (مفيدين في DSA)، و [[zip_longest]]، و [[takewhile]]/[[dropwhile]]، و [[tee]].`,
            when: R`لما الـ loop بتاعك بيعمل حاجة ليها اسم في itertools. بس متعملش سلسلة ٥ دوال متداخلة عشان تبان شاطر؛ لو loop عادي أوضح، اكتبه loop.`,
            mistakes: R`[[groupby]] من غير ترتيب. وتلف على iterator مرتين (التانية فاضية). و [[list(count())]] (بيلف للأبد). وتحتفظ بمجموعة من groupby لبعدين ([[groups = list(groupby(...))]]) فتلاقي المجموعات فاضية.`
          },
          lines: [
            "الأدوات.",
            R`[[itemgetter(0)]] = [[lambda x: x[0]]].`,
            "وصّل كذا iterable ورا بعض.",
            "دفعات بحجم ٣، والأخيرة أصغر.",
            "أزواج متتالية: مفيد للفروق.",
            "مجموع متراكم.",
            "كل التوافيق: مقاسات × ألوان.",
            "عدّاد مالوش آخر يبدأ من 1000.",
            R`[[next]] بتاخد القيمة الجاية.`,
            R`[[islice]] بتاخد ٣ من iterator مالوش آخر.`,
            "مبيعات.",
            R`رتّب بالمدينة الأول: [[groupby]] بيجمّع المتجاور بس.`,
            "لف على كل مجموعة.",
            "اجمع مبيعات المجموعة."
          ]
        },
        {
          cmd: "functools",
          title: "lru_cache و partial و cached_property و reduce",
          desc: R`[[functools]] أدوات للدوال: [[@lru_cache]] بيحفظ ناتج الدالة لكل مجموعة باراميترات (memoization)، و [[partial]] بيثبّت باراميترات في دالة ويرجّع دالة جديدة، و [[@cached_property]] خاصية بتتحسب مرة واحدة لكل object، و [[reduce]] بيطبّق دالة على عناصر بالتراكم، و [[wraps]] اللي شفناه في درس «decorators».`,
          example: R`import time
from functools import cached_property, lru_cache, partial, reduce
@lru_cache(maxsize=256)
def exchange_rate(currency: str) -> float:
    time.sleep(0.5)
    return {"USD": 48.5, "EUR": 56.9}[currency]
exchange_rate("USD")
exchange_rate("USD")
print(exchange_rate.cache_info())      # CacheInfo(hits=1, misses=1, maxsize=256, currsize=1)
exchange_rate.cache_clear()
def price_with_tax(amount: float, rate: float) -> float:
    return round(amount * (1 + rate), 2)
egypt_vat = partial(price_with_tax, rate=0.14)
print(egypt_vat(100), list(map(egypt_vat, [10, 20])))   # 114.0 [11.4, 22.8]
print_err = partial(print, "ERROR:", sep=" | ")
print_err("disk full")                                 # ERROR: | disk full
print(reduce(lambda acc, x: acc * x, [1, 2, 3, 4], 1))  # 24
class Report:
    def __init__(self, rows: list[int]):
        self.rows = rows
    @cached_property
    def total(self) -> int:
        print("بحسب...")
        return sum(self.rows)
r = Report([1, 2, 3])
print(r.total, r.total)                                 # بحسب... مرة واحدة ثم 6 6
exchange_rate(["USD"])                                  # TypeError: unhashable type: 'list'`,
          try: R`(١) اكتب [[ways(n)]] عدد طرق طلوع سلم n درجة بخطوة أو خطوتين ([[ways(n-1) + ways(n-2)]]) بـ [[@lru_cache(maxsize=None)]] واطبع [[ways(80)]] وعدد النداءات الفعلية و [[cache_info()]]. جرّب تشيل الـ cache على [[ways(35)]] وقارن الوقت. (٢) من دالة [[fmt(amount, currency, decimals=2)]] اعمل [[egp]] و [[usd]] بـ [[partial]]، و [[usd]] من غير كسور.`,
          sol: R`(١) [[ways(80)]] = [[37889062373143906]] في أجزاء من الثانية، والدالة اتنفّذت [[81]] مرة بس (مرة لكل n من 0 لـ 80)، و [[cache_info()]] بيقول [[hits=78, misses=81]]. من غير الـ cache، [[ways(35)]] لوحدها بتعمل حوالي ٣٠ مليون نداء وبتاخد ثواني، و [[ways(80)]] مش هتخلص. ده الفرق بين O(n) و O(2^n)، ونفس فكرة الـ dynamic programming في تاب DSA.

(٢) [[egp(12500.5)]] = [[12,500.50 EGP]]، و [[usd(99.6)]] = [[100 USD]]، و [[egp(3, decimals=0)]] = [[3 EGP]]: الباراميتر اللي partial ثبّته بالاسم ينفع يتغير وقت النداء. الغلطة الشائعة: [[partial(fmt, "EGP")]] بالمكان، فالـ EGP تروح لـ [[amount]] مش [[currency]].`,
          solCode: R`import time
from functools import lru_cache, partial
calls = 0
@lru_cache(maxsize=None)
def ways(n: int) -> int:
    global calls
    calls += 1
    if n <= 1:
        return 1
    return ways(n - 1) + ways(n - 2)
start = time.perf_counter()
print(ways(80), calls, f"{time.perf_counter() - start:.4f}s")
print(ways.cache_info())
def fmt(amount: float, currency: str, decimals: int = 2) -> str:
    return f"{amount:,.{decimals}f} {currency}"
egp = partial(fmt, currency="EGP")
usd = partial(fmt, currency="USD", decimals=0)
print(egp(12500.5), usd(99.6), egp(3, decimals=0))`,
          flag: "script",
          deep: {
            why: R`[[lru_cache]] بيحوّل حسبة متكررة غالية (إعدادات، سعر صرف، recursion) لـ lookup. و [[partial]] بتلاقيه في كود callbacks ومع [[map]] ومع [[run_in_executor]] اللي مبيقبلش keyword arguments. و [[@lru_cache]] على [[get_settings]] هو الـ pattern الرسمي في FastAPI (درس «pydantic-settings»).`,
            how: R`[[@lru_cache(maxsize=256)]] بيعمل dict من الباراميترات للناتج، ولما يتملى بيشيل الأقدم استخدامًا (Least Recently Used). [[maxsize=None]] أو [[@cache]] (3.9+) من غير حد. والباراميترات لازم hashable (مفيش list ولا dict)، و [[f(1)]] و [[f(x=1)]] بيتخزنوا كمفتاحين مختلفين. و [[cache_info()]] و [[cache_clear()]] للمتابعة والمسح.

الـ cache ده في ذاكرة الـ process: مفيش TTL (القيمة مبتنتهيش)، ومش مشترك بين الـ workers، وبيتمسح لما الـ process يقفل. للداتا اللي بتتغير: Redis (المستوى ٣). ولو الدالة async، [[lru_cache]] هيخزّن الـ coroutine نفسه مش الناتج، والنداء التاني هيقع بـ [[cannot reuse already awaited coroutine]]، فمينفعش.

[[partial(f, *args, **kwargs)]] بيرجع callable لما تناديه بيضيف الباراميترات المتثبتة. و [[cached_property]] بتحسب أول مرة وتحط الناتج في [[__dict__]] بتاع الـ object، فبعد كده بتتقري كخاصية عادية (ومش شغالة مع [[slots=True]]).

[[reduce(f, items, initial)]] بتطبّق [[f(acc, x)]] على كل عنصر. غالبًا [[sum]] و [[max]] و [[math.prod]] و loop أوضح منها، وده سبب إنها اتنقلت من الـ built-ins لـ functools.`,
            when: R`[[lru_cache]] لدوال pure (نفس الباراميترات = نفس الناتج دايمًا) وغالية. [[cached_property]] لحسبة تقيلة على object مبيتغيرش. [[partial]] لما تحتاج تبعت دالة بباراميترات متثبتة لحد تاني.`,
            mistakes: R`[[lru_cache]] على دالة بتقرا من القاعدة أو الوقت (الداتا القديمة تفضل راجعة). وعلى method ([[self]] بيبقى جزء من المفتاح والـ object مبيتمسحش من الذاكرة). وعلى دالة async. وباراميتر list: [[TypeError: unhashable type: 'list']]. و [[maxsize=None]] على دالة باراميتراتها جاية من المستخدمين (الذاكرة بتكبر من غير حد).`
          },
          lines: [
            "للتأخير.",
            "الأدوات.",
            "cache بحد أقصى ٢٥٦ قيمة.",
            "دالة غالية (كأنها بتنادي API).",
            "نص ثانية.",
            "القيمة.",
            "أول مرة: بتتحسب (miss).",
            "تاني مرة: من الـ cache على طول (hit).",
            "إحصائيات الـ cache.",
            "امسح الـ cache (لما الداتا تتغير).",
            "دالة عامة.",
            "الحسبة.",
            R`[[partial]]: نسخة منها الـ rate فيها متثبت.`,
            "بتتنادى بباراميتر واحد، وتنفع مع map.",
            R`[[partial]] على [[print]] نفسها.`,
            "بتطبع بالبادئة والفاصل.",
            R`[[reduce]]: حاصل ضرب بالتراكم (وفيه [[math.prod]] أوضح).`,
            "class.",
            "الـ init.",
            "خزّن.",
            "خاصية بتتحسب أول مرة بس.",
            "method.",
            "علامة إن الحسبة حصلت.",
            "الحسبة.",
            "object.",
            "بحسب... مرة واحدة، وبعدين 6 و 6.",
            R`list مش hashable: [[lru_cache]] بيرمي.`
          ]
        }
      ]
    },
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
