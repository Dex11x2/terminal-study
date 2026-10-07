// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
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
          teach: R`## المثال بيعمل إيه؟

بيعمل فولدرات [[data/reports/2026]]، ويكتب فيها ملف CSV صغير، ويسأله عن اسمه وحجمه، ويقراه، ويدوّر على كل ملفات الـ CSV، ويغيّر اسمه، وفي الآخر يمسحه. كل ده بـ object واحد اسمه [[Path]]. اتشغّل كملف [[ex.py]] على ويندوز (Python 3.14.3) وعلى لينكس ([[docker run --rm python:3.13-slim]])، والنواتج كانت مختلفة في حاجتين مهمين هتشوفهم.

---

## ١. [[from pathlib import Path]]

[[pathlib]] module في المكتبة الأساسية (مش محتاج pip)، و [[Path]] هو النوع اللي بيمثّل مسار. على ويندوز بيبقى [[WindowsPath]] وعلى لينكس [[PosixPath]]، و Python بيختار لوحده:

~~~text الناتج: print(repr(f)) على ويندوز
WindowsPath('data/reports/2026/sales.csv')
~~~

---

## ٢. بناء المسار بـ [[/]]

~~~python
base = Path("data")
reports = base / "reports" / "2026"
~~~

- [[Path("data")]]: مسار **نسبي**، يعني نسبةً للفولدر اللي انت واقف فيه في الترمنال وقت التشغيل (مش فولدر السكربت).
- [[/]] هنا مش قسمة. [[Path]] معرّف العلامة دي (الـ method اللي اسمها [[__truediv__]]) إنها «ضيف جزء للمسار». فـ [[base / "reports" / "2026"]] بيتنفّذ من الشمال: [[data]] ثم [[data/reports]] ثم [[data/reports/2026]].
- Python بيحط الفاصل الصح للنظام: [[\]] على ويندوز و [[/]] على لينكس. ولو جرّبت تجمع بـ [[+]]:

~~~text الناتج: Path("data") + "/x"
TypeError: unsupported operand type(s) for +: 'WindowsPath' and 'str'
~~~

---

## ٣. [[reports.mkdir(parents=True, exist_ok=True)]]

[[mkdir]] = make directory. الباراميترين:

| الباراميتر | من غيره | معاه |
|---|---|---|
| [[parents=True]] | [[FileNotFoundError]] لو [[data]] أو [[reports]] مش موجودين | بيعمل كل الفولدرات اللي فوق |
| [[exist_ok=True]] | [[FileExistsError]] لو الفولدر موجود | بيعدّي بهدوء |

الاتنين مع بعض = [[mkdir -p]] في bash. فالسكربت ينفع يتشغّل مرة واتنين وعشرة.

---

## ٤. [[f.write_text(..., encoding="utf-8")]]

~~~python
f = reports / "sales.csv"
f.write_text("id,total\n1,150\n", encoding="utf-8")
~~~

- [[f]] لسه مسار بس، الملف مش موجود. [[write_text]] بيفتح الملف، يكتب النص، ويقفله، في سطر واحد. ولو الملف موجود بيمسح اللي فيه.
- [[\n]] = سطر جديد. فالنص ده سطرين: [[id,total]] و [[1,150]].
- [[encoding="utf-8"]]: إزاي الحروف تتحوّل bytes. من غيره ويندوز ممكن يستخدم encoding قديم والعربي يبوظ.

---

## ٥. الطباعة وأجزاء الاسم

~~~python
print(f)
print(f.name, f.stem, f.suffix, f.parent.name)
~~~

~~~text الناتج: ويندوز ثم لينكس
data\reports\2026\sales.csv
data/reports/2026/sales.csv
~~~

التعليق في المثال مكتوب بشكل لينكس. على ويندوز نفس المسار بيتطبع بـ [[\]]، والكود نفسه مش محتاج يتغير.

~~~text الناتج (الاتنين)
sales.csv sales .csv 2026
~~~

| الخاصية | القيمة | معناها |
|---|---|---|
| [[name]] | [[sales.csv]] | آخر جزء كامل |
| [[stem]] | [[sales]] | الاسم من غير الامتداد |
| [[suffix]] | [[.csv]] | الامتداد بالنقطة |
| [[parent]] | [[data/reports/2026]] | الفولدر اللي فوقه (Path كمان) |
| [[parent.name]] | [[2026]] | اسم الفولدر اللي فوقه |

دي خصائص من غير [[()]] لأنها قيم جاهزة مش أفعال. وخلي بالك: [[Path("a.tar.gz").suffix]] بيدّي [[.gz]] بس، و [[.suffixes]] بيدّي [[['.tar', '.gz'] ]] (جربناها).

---

## ٦. [[exists()]] و [[is_file()]] و [[stat().st_size]]

~~~text الناتج: ويندوز ثم لينكس
True True 17
True True 15
~~~

- [[exists()]]: المسار موجود؟ و [[is_file()]]: موجود **وملف** (مش فولدر)؟ دول بأقواس لأنهم بيسألوا الديسك.
- [[stat()]] بيرجّع معلومات الملف من النظام، و [[st_size]] الحجم بالـ byte.

**ليه ١٧ على ويندوز و ١٥ على لينكس؟** النص فيه ١٣ حرف و ٢ [[\n]] = ١٥. على ويندوز [[write_text]] بيفتح الملف في text mode، فبيحوّل كل [[\n]] لـ [[\r\n]] (نهاية السطر بتاعة ويندوز)، فكل سطر زاد byte: ١٥ + ٢ = ١٧. ولو عايز [[\n]] على كل الأنظمة: [[write_text(..., newline="\n")]] (3.10+).

---

## ٧. [[read_text().splitlines()]]

~~~text الناتج (الاتنين)
['id,total', '1,150']
~~~

[[read_text]] بيقرا الملف كله string، وفي القراية [[\r\n]] بترجع [[\n]] لوحدها، فالناتج واحد على النظامين. و [[splitlines()]] بيقسّمه list سطور ومن غير علامة السطر الجديد.

---

## ٨. [[rglob]] و [[relative_to]]

~~~python
for p in sorted(base.rglob("*.csv")):
    print(p.relative_to(base))
~~~

- [[rglob("*.csv")]]: r = recursive، دوّر تحت [[data]] بأي عمق على أي اسم آخره [[.csv]]. و [[*]] يعني «أي حروف». و [[glob]] من غير r بيدوّر في الفولدر نفسه بس.
- [[rglob]] بيرجّع generator (بيطلّع النتايج واحدة واحدة)، و [[sorted]] بيجمعهم ويرتّبهم عشان الترتيب يبقى ثابت.
- [[relative_to(base)]]: شيل [[data]] من أول المسار.

~~~text الناتج: ويندوز ثم لينكس
reports\2026\sales.csv
reports/2026/sales.csv
~~~

---

## ٩. [[with_suffix]] و [[rename]]

~~~python
backup = f.with_suffix(".bak")
f.rename(backup)
~~~

- [[with_suffix(".bak")]]: Path **جديد** بنفس المسار وامتداد تاني: [[data\reports\2026\sales.bak]]. [[f]] نفسه مبيتغيرش (الـ Path immutable)، ولا الملف على الديسك اتلمس.
- [[f.rename(backup)]]: هنا بس الملف على الديسك اتنقل للاسم الجديد.

---

## ١٠. [[Path.cwd()]] و [[Path.home()]]

~~~text الناتج: ويندوز ثم لينكس
C:\Users\ali\...\l3\data C:\Users\ali
/s/l3/data /root
~~~

- [[cwd]] = current working directory: الفولدر اللي انت شغّال منه. و [[home]] فولدر اليوزر. ودول بيتنادوا على [[Path]] نفسه مش على مسار.
- في Docker اليوزر [[root]]، فالـ home هو [[/root]].

---

## ١١. [[Path(__file__).resolve().parent]]

~~~python
here = Path(__file__).resolve().parent
config = here / "config.toml"
~~~

نفكّها من جوه لبرة:

1. [[__file__]]: متغير Python بيحطه في كل ملف، فيه مسار الملف ده نفسه.
2. [[Path(...)]]: حوّله Path.
3. [[.resolve()]]: خليه مسار كامل (من أول [[C:\]] أو [[/]]) وفك أي [[..]] أو link.
4. [[.parent]]: الفولدر اللي فيه الملف.

جربناه في ملف [[here.py]] وشغّلناه من فولدره ومن الفولدر اللي فوقه، والناتج واحد في الحالتين:

~~~text الناتج
C:\Users\ali\...\l3
C:\Users\ali\...\l3\config.toml
~~~

ده الفرق المهم عن [[Path("data")]]: اللي بيبدأ بـ [[__file__]] مرتبط بمكان السكربت، و [[Path("data")]] مرتبط بمكان التشغيل. فملف إعدادات جنب السكربت يتجاب بالطريقة دي.

---

## ١٢. [[backup.unlink(missing_ok=True)]]

[[unlink]] = امسح الملف. و [[missing_ok=True]] = «لو مش موجود متعملش [[FileNotFoundError]]». الفولدرات [[data/reports/2026]] بتفضل موجودة فاضية.

---

## ١٣. الحل: [[organize]]

~~~python solCode (القلب)
GROUPS = {".pdf": "docs", ".txt": "docs", ".jpg": "images", ".png": "images"}
for p in sorted(folder.iterdir()):
    if not p.is_file():
        continue
    group = GROUPS.get(p.suffix.lower(), "other")
    target = folder / group / p.name
~~~

- [[GROUPS]]: dict من الامتداد لاسم الفولدر. والاسم كابيتال عرف معناه «ثابت».
- [[iterdir()]]: كل اللي جوه الفولدر مباشرة (ملفات وفولدرات). و [[sorted]] بيحوّله list الأول، عشان احنا هننقل ملفات جوه نفس الفولدر وإحنا بنلف عليه.
- [[if not p.is_file(): continue]]: سيب الفولدرات (زي [[docs]] بعد ما تتعمل).
- [[p.suffix.lower()]]: [[.JPG]] تبقى [[.jpg]].
- [[GROUPS.get(key, "other")]]: لو الامتداد مش في الـ dict رجّع [["other"]] بدل [[KeyError]].
- [[mkdir(exist_ok=True)]] و [[p.rename(target)]] بيتنفّذوا بس لو [[dry_run]] بـ False.
- [[moved.get(group, 0) + 1]]: عدّاد لكل مجموعة يبدأ من صفر.

~~~text الناتج (ويندوز، بعد touch للـ ٥ ملفات)
[dry-run] archive.tar.gz -> other/
[dry-run] cv.pdf -> docs/
[dry-run] logo.png -> images/
[dry-run] notes.txt -> docs/
[dry-run] photo.JPG -> images/
{'other': 1, 'docs': 2, 'images': 2}
archive.tar.gz -> other/
...
{'other': 1, 'docs': 2, 'images': 2}
['docs\\cv.pdf', 'docs\\notes.txt', 'images\\logo.png', 'images\\photo.JPG', 'other\\archive.tar.gz']
~~~

[[archive.tar.gz]] راح other لأن الـ suffix بتاعه [[.gz]]. والسطر الأخير على لينكس طلع [['docs/cv.pdf', ...]]، وعلى ويندوز [['docs\\cv.pdf']]: الـ [[\\]] دي [[\]] واحدة، بس Python بيكتبها مرتين لما يطبع string جوه list.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تبني مسار | [[base / "a" / "b.csv"]] |
| فولدر بكل اللي فوقه | [[mkdir(parents=True, exist_ok=True)]] |
| تكتب وتقرا ملف صغير | [[write_text(s, encoding="utf-8")]] و [[read_text(encoding="utf-8")]] |
| أجزاء الاسم | [[name]] و [[stem]] و [[suffix]] و [[parent]] |
| تدوّر | [[glob]] (الفولدر ده) و [[rglob]] (بأي عمق) |
| تغيّر الاسم أو تمسح | [[rename]] و [[unlink(missing_ok=True)]] |
| ملف جنب السكربت | [[Path(__file__).resolve().parent / "x"]] |

- [[Path("x")]] نسبي لمكان التشغيل، مش لمكان السكربت.
- نفس الكود بيشتغل على ويندوز ولينكس، بس الطباعة بتبان بفاصل النظام، و [[write_text]] على ويندوز بيكتب [[\r\n]].`,
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
          teach: R`## المثال بيعمل إيه؟

بياخد ملف [[orders.csv]] فيه ٣ طلبات، ويقراه، ويحوّل الأرقام، ويكتبه JSON، ويرجع يقراه، ويطلّع طلبات القاهرة في CSV جديد، ويكتب ملف JSON Lines، وفي الآخر يوريك المشكلة الوحيدة اللي هتقابلها مع JSON: التواريخ. اتشغّل على ويندوز (Python 3.14.3) وعلى لينكس ([[python:3.13-slim]] في Docker) على الملف ده:

~~~text orders.csv
id,name,city,total
1,Sara,Cairo,150.5
2,Omar,Alex,80
3,"Ali, Jr.",Cairo,45
~~~

CSV = Comma-Separated Values: أول سطر أسماء الأعمدة (header)، وكل سطر بعده صف، والقيم بينها فاصلة. ولو القيمة نفسها فيها فاصلة ([[Ali, Jr.]]) بتتحط بين علامتين تنصيص.

---

## ١. الـ imports

~~~python
import csv
import json
from datetime import date
from pathlib import Path
~~~

الأربعة من المكتبة الأساسية: [[csv]] لقراية وكتابة CSV، و [[json]] للـ JSON، و [[date]] نوع التاريخ (هنحتاجه في الآخر)، و [[Path]] للملفات (الدرس اللي فات).

---

## ٢. القراية: [[csv.DictReader]]

~~~python
with open("orders.csv", newline="", encoding="utf-8") as f:
    rows = list(csv.DictReader(f))
print(rows[2])
~~~

- [[open("orders.csv", ...)]]: افتح الملف للقراية (الافتراضي). و [[with ... as f:]] بيقفله لوحده أول ما البلوك يخلص.
- [[newline=""]]: «متلمسش نهايات السطور، سيبها للـ csv module». الـ module بيفهم [[\r\n]] و [[\n]] لوحده، وبيعرف يقرا قيمة فيها سطر جديد جوه التنصيص.
- [[csv.DictReader(f)]]: بيقرا أول سطر كأسماء أعمدة، وكل سطر بعده بيطلّعه dict مفاتيحه الأسماء دي.
- [[list(...)]]: الـ reader بيقرا سطر سطر وقت ما تطلب، فلو استنيت لبعد الـ [[with]] الملف هيبقى مقفول. [[list]] بيقرا الكل دلوقتي.
- [[rows[2] ]]: العنصر التالت (العدّ من صفر).

~~~text الناتج
{'id': '3', 'name': 'Ali, Jr.', 'city': 'Cairo', 'total': '45'}
~~~

حاجتين: الاسم اللي فيه فاصلة اتقري قيمة واحدة صح، و **كل القيم strings**: [['3']] و [['45']] مش أرقام. CSV مفيهوش أنواع، كله نص. ولو قسّمت السطر بإيدك:

~~~text الناتج: '3,"Ali, Jr.",Cairo,45'.split(',')
['3', '"Ali', ' Jr."', 'Cairo', '45']
~~~

خمس قيم بدل أربعة، وده سبب إنك متقسّمش CSV بـ [[split]] أبدًا.

---

## ٣. تحويل الأنواع

~~~python
for r in rows:
    r["id"] = int(r["id"])
    r["total"] = float(r["total"])
~~~

- [[int("3")]] بيحوّل النص لرقم صحيح، و [[float("150.5")]] لرقم عشري.
- [[r["id"] = ...]]: بيغيّر القيمة جوه نفس الـ dict، فالـ [[rows]] نفسها اتعدّلت.

ليه لازم؟ لأن المقارنة بين strings بتمشي حرف حرف: [['10' > '9']] طلعت [[False]] لأن [['1']] أصغر من [['9']].

---

## ٤. الكتابة JSON: [[json.dumps]]

~~~python
Path("orders.json").write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")
~~~

من جوه لبرة:

1. [[json.dumps(rows, ...)]]: dumps = dump **s**tring، بيحوّل الـ list of dicts لـ string بصيغة JSON.
2. [[indent=2]]: كل مستوى بمسافتين وكل خانة في سطر، عشان يتقري. من غيره كله سطر واحد.
3. [[ensure_ascii=False]]: سيب الحروف غير الإنجليزي زي ما هي:

~~~text الناتج: json.dumps({'name': 'سارة'}) ثم مع ensure_ascii=False
{"name": "سارة"}
{"name": "سارة"}
~~~

4. [[write_text(..., encoding="utf-8")]]: اكتب الـ string في ملف.

~~~text orders.json (أوله)
[
  {
    "id": 1,
    "name": "Sara",
    "city": "Cairo",
    "total": 150.5
  },
~~~

لاحظ: [[1]] و [[150.5]] من غير تنصيص، يعني أرقام، لأننا حوّلناهم. والـ quotes بقت [["]] (JSON مبيقبلش [[']]).

---

## ٥. القراية من JSON والفلترة

~~~python
data = json.loads(Path("orders.json").read_text(encoding="utf-8"))
cairo = [o for o in data if o["city"] == "Cairo"]
~~~

- [[json.loads]]: load **s**tring، العكس: من string JSON لـ list و dicts.
- [[[o for o in data if ...] ]]: list comprehension: «كل [[o]] في [[data]] لو مدينته Cairo». الناتج طلبين (1 و 3).

| JSON | Python |
|---|---|
| object [[{}]] | dict |
| array [[[]]] | list |
| string | str |
| number | int أو float |
| [[true]] / [[false]] / [[null]] | [[True]] / [[False]] / [[None]] |

---

## ٦. الكتابة CSV: [[csv.DictWriter]]

~~~python
with open("cairo.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["id", "name", "total"], extrasaction="ignore")
    writer.writeheader()
    writer.writerows(cairo)
~~~

- [["w"]]: افتح للكتابة (ويمسح القديم).
- [[newline=""]] هنا أهم: الـ csv module بيكتب [[\r\n]] في آخر كل صف (ده المعيار). لو نسيته على ويندوز، Python هيحوّل الـ [[\n]] اللي فيها لـ [[\r\n]] تاني. جربناها: الملف طلع [[b'a,b\r\r\n1,2\r\r\n']]، وExcel بيشوف سطر فاضي بين كل صفين.
- [[fieldnames]]: الأعمدة وترتيبها.
- [[extrasaction="ignore"]]: الـ dicts فيها [[city]] وهو مش في [[fieldnames]]. الافتراضي [["raise"]] يعني [[ValueError]]، و [["ignore"]] بيسيبه.
- [[writeheader()]] سطر الأسماء، و [[writerows(cairo)]] كل الصفوف.

~~~text cairo.csv (بـ cat -A: ^M هي \r و $ آخر السطر)
id,name,total^M$
1,Sara,150.5^M$
3,"Ali, Jr.",45.0^M$
~~~

الـ writer حط التنصيص لوحده حوالين [[Ali, Jr.]]. و [[45]] بقت [[45.0]] لأنها بقت float في الخطوة ٣.

---

## ٧. JSON Lines: [[events.jsonl]]

~~~python
with open("events.jsonl", "w", encoding="utf-8") as f:
    for o in data:
        f.write(json.dumps({"order": o["id"], "city": o["city"]}) + "\n")
~~~

لكل طلب: dict صغير، يتحوّل string JSON، ونضيف [["\n"]] في الآخر. فكل سطر JSON كامل لوحده:

~~~text events.jsonl
{"order": 1, "city": "Cairo"}
{"order": 2, "city": "Alex"}
{"order": 3, "city": "Cairo"}
~~~

الميزة: تقدر تضيف سطر في الآخر وتقرا سطر سطر من غير ما تحمّل الملف كله، عشان كده اللوجات بتتكتب كده.

---

## ٨. التواريخ و [[default=str]]

~~~python
payload = {"day": date(2026, 9, 29), "count": len(data)}
print(json.dumps(payload, default=str))
json.dumps(payload)
~~~

- [[date(2026, 9, 29)]]: object تاريخ. و [[len(data)]] = 3.
- [[default=str]]: «أي نوع مش عارف تكتبه JSON، ناديله [[str()]]». و [[str(date(2026, 9, 29))]] = [['2026-09-29']].

~~~text الناتج
{"day": "2026-09-29", "count": 3}
~~~

ومن غير [[default]]:

~~~text الناتج: ويندوز (3.14)، آخر سطور
TypeError: Object of type date is not JSON serializable
when serializing dict item 'day'
~~~

JSON مفيهوش نوع تاريخ، فـ Python بيرفض بدل ما يخمّن. والسطر التاني ([[when serializing dict item 'day']]) جديد في 3.14 وبيقولك الخانة اللي عملت المشكلة؛ على لينكس بـ 3.13 طلع السطر الأول بس.

---

## ٩. الحل: ملخص لكل مدينة

~~~python solCode (القلب)
for row in csv.DictReader(f):
    city = row["city"].strip()
    s = by_city.setdefault(city, {"city": city, "orders": 0, "total": 0.0})
    s["orders"] += 1
    s["total"] = round(s["total"] + float(row["total"]), 2)
return sorted(by_city.values(), key=lambda s: s["total"], reverse=True)
~~~

- [[strip()]]: بيشيل المسافات من الأطراف، فـ [[" Cairo"]] تبقى [["Cairo"]].
- [[setdefault(key, default)]]: لو المفتاح موجود رجّع قيمته، ولو لأ حط الـ default ورجّعه. فأول مرة المدينة تتعمل بأصفار، وبعد كده بنزوّد على نفس الـ dict.
- [[round(..., 2)]]: [[0.1 + 0.2]] بتطلع [[0.30000000000000004]] (الـ float بيتخزن binary ومش كل الكسور العشرية ليها تمثيل مظبوط)، فبنقرّب بعد كل جمع.
- [[sorted(..., key=lambda s: s["total"], reverse=True)]]: رتّب بالإجمالي، و [[reverse=True]] من الكبير للصغير. و [[lambda s: s["total"]]] دالة صغيرة من غير اسم بترجّع الخانة اللي نرتّب بيها.

~~~text الناتج (ملف فيه " Cairo" بمسافة في الصف التالت)
[{'city': 'Cairo', 'orders': 2, 'total': 195.5}, {'city': 'Alex', 'orders': 1, 'total': 80.0}]
city,orders,total
Cairo,2,195.5
Alex,1,80.0
~~~

---

## الخلاصة

| عايز | استخدم |
|---|---|
| تقرا CSV | [[csv.DictReader(f)]] والملف مفتوح بـ [[newline=""]] و [[encoding="utf-8"]] |
| تكتب CSV | [[csv.DictWriter(f, fieldnames=[...])]] و [[writeheader()]] و [[writerows()]] |
| من وإلى string JSON | [[json.loads]] و [[json.dumps]] |
| من وإلى ملف مفتوح | [[json.load(f)]] و [[json.dump(obj, f)]] |
| عربي مقروء ومنظّم | [[ensure_ascii=False, indent=2]] |
| تاريخ جوه JSON | حوّله بنفسك أو [[default=str]] |

- كل قيمة من CSV string: حوّلها بـ [[int]] و [[float]] بنفسك.
- متقسّمش CSV بـ [[split(",")]].`,
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

القاعدة: جوه البرنامج وفي القاعدة كل حاجة aware بـ UTC ([[datetime.now(UTC)]]، و [[timestamptz]] في Postgres). وبس وقت العرض حوّل لتوقيت المستخدم بـ [[astimezone(ZoneInfo("Africa/Cairo"))]]. و [[zoneinfo]] في المكتبة الأساسية من 3.9 وبيقرا قاعدة التوقيتات بتاعة النظام، فبيعرف التوقيت الصيفي لوحده. وويندوز مفيهوش القاعدة دي، فهناك لازم [[pip install tzdata]] في الـ venv، وإلا [[ZoneInfoNotFoundError]].`,
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

ZoneInfo بيقرا [[/usr/share/zoneinfo]]. في Docker images الصغيرة (slim و alpine) ممكن متكونش موجودة، فـ [[ZoneInfoNotFoundError]]: سطّب [[tzdata]] من pip أو apt. وعلى ويندوز مفيش قاعدة توقيتات من النظام خالص، فـ [[tzdata]] من pip لازم في أي مشروع بيستخدم ZoneInfo. وفي ساعة التغيير فيه أوقات بتتكرر (فصل الشتا) والـ [[fold]] بيفرّق بينهم.`,
            when: R`UTC aware في كل حتة جوه الكود والقاعدة والـ APIs. التوقيت المحلي بس في العرض، أو لما «اليوم» نفسه ليه معنى محلي (تقرير يومي، مواعيد عمل، حجز). ولو المستخدمين في أكتر من بلد، خزّن timezone كل مستخدم ([["Africa/Cairo"]]) واستخدمه في العرض. وفي JS نفس القاعدة (تاب JavaScript درس «UTC و Intl.DateTimeFormat»).`,
            mistakes: R`[[datetime.now()]] على السيرفر. و [[+ timedelta(hours=2)]] كتوقيت مصر (بيبوظ نص السنة). و [[replace(tzinfo=...)]] للتحويل. وتقارن تاريخ UTC بتاريخ محلي. و [[timestamp]] من غير timezone في Postgres. وتخزّن الوقت كـ string بشكل محلي ([["30/09/2026 12:30 AM"]]) مش ISO.`
          },
          teach: R`## المثال بيعمل إيه؟

بيعمل أوقات بـ UTC، ويحوّلها لتوقيت القاهرة وبالعكس، ويوريك إن الفرق +3 في الصيف و +2 في الشتا، ويقرا وقت من نص ISO، ويحسب بداية اليوم، وفي الآخر يوريك الـ TypeError اللي بيحميك من خلط النوعين. اتشغّل على ويندوز (Python 3.14.3 في venv فيه [[tzdata]]) وعلى لينكس ([[python:3.13-slim]] في Docker)، والنواتج واحدة غير أول سطر (الوقت الحالي).

> على ويندوز من غير [[tzdata]]، أول سطر [[ZoneInfo("Africa/Cairo")]] بيقع: [[ZoneInfoNotFoundError: 'No time zone found with key Africa/Cairo']]. لينكس فيه القاعدة في [[/usr/share/zoneinfo]]، وويندوز لأ، فلازم [[pip install tzdata]] (أو [[uv add tzdata]]).

---

## ١. الـ imports والمنطقة الزمنية

~~~python
from datetime import UTC, date, datetime, timedelta
from zoneinfo import ZoneInfo
CAIRO = ZoneInfo("Africa/Cairo")
~~~

| الاسم | هو إيه |
|---|---|
| [[datetime]] | تاريخ ووقت مع بعض: 2026-09-29 21:30 |
| [[date]] | تاريخ بس: 2026-09-29 |
| [[timedelta]] | مدة: ٣٠ يوم، ٣ ساعات |
| [[UTC]] | المنطقة الزمنية UTC (موجود من 3.11، قبلها [[timezone.utc]]) |
| [[ZoneInfo("Africa/Cairo")]] | منطقة القاهرة بكل قواعدها: إمتى +2 وإمتى +3 |

- UTC = Coordinated Universal Time: الساعة المرجعية للعالم كله، ملهاش توقيت صيفي.
- [["Africa/Cairo"]] اسم من قاعدة اسمها IANA tz database (أو tzdata)، فيها تاريخ كل التغييرات في توقيت كل بلد. والـ [[tzdata]] اللي اتسطّب هنا نسخة [[2026e]].
- [[CAIRO]] بحروف كبيرة: عرف للثوابت.

---

## ٢. aware و naive

~~~python
now = datetime.now(UTC)
print(now.isoformat())
naive = datetime.now()
print(naive.tzinfo)
~~~

~~~text الناتج
2026-10-07T09:07:44.241526+00:00
None
~~~

- [[datetime.now(UTC)]]: الوقت دلوقتي، **ومعاه** إنه UTC. ده اسمه **aware** (عارف هو توقيت إيه).
- [[isoformat()]]: يكتبه بصيغة ISO 8601: التاريخ، وبعدين [[T]] تفصل الوقت، والثواني بكسورها (microseconds)، وفي الآخر [[+00:00]] يعني «فرق صفر عن UTC». ده الشكل اللي تبعته في JSON.
- [[datetime.now()]] من غير حاجة: وقت الجهاز، من غير أي معلومة عن المنطقة. ده **naive**، و [[tzinfo]] بتاعه [[None]]. الرقم نفسه بيختلف حسب الجهاز: على لاب توب في مصر ساعة مصر، وجوه Docker كان UTC. فنفس الكود بيدّي أوقات مختلفة على جهازك وعلى السيرفر.

---

## ٣. [[astimezone]]: نفس اللحظة بساعة تانية

~~~python
created = datetime(2026, 9, 29, 21, 30, tzinfo=UTC)
local = created.astimezone(CAIRO)
print(local)
print(local.strftime("%d/%m/%Y %I:%M %p"))
~~~

~~~text الناتج
2026-09-30 00:30:00+03:00
30/09/2026 12:30 AM
~~~

- [[datetime(2026, 9, 29, 21, 30, tzinfo=UTC)]]: سنة، شهر، يوم، ساعة، دقيقة، و [[tzinfo=UTC]] بيقول إن الساعة دي UTC.
- [[astimezone(CAIRO)]]: «نفس اللحظة دي، الساعة كام في القاهرة؟». سبتمبر صيفي، فـ +3: 21:30 + 3 = 00:30 **يوم 30**. التاريخ نفسه اتغير، وده سبب إن «طلبات النهارده» بتطلع غلط لو عدّيت بتاريخ UTC.
- [[strftime]] = string format time: حوّله نص بالشكل اللي تحدده:

| الرمز | معناه | هنا |
|---|---|---|
| [[%d]] | اليوم برقمين | 30 |
| [[%m]] | الشهر برقمين | 09 |
| [[%Y]] | السنة كاملة | 2026 |
| [[%I]] | الساعة من 01 لـ 12 | 12 |
| [[%M]] | الدقيقة | 30 |
| [[%p]] | AM أو PM | AM |

([[%H]] الساعة من 00 لـ 23.) خلي بالك: [[%M]] كابيتال دقيقة و [[%m]] صغيرة شهر.

> الغلط المشهور [[replace(tzinfo=CAIRO)]] بدل [[astimezone]]. جربناه على نفس [[created]]: طلع [[2026-09-29 21:30:00+03:00]]، يعني لزق «القاهرة» على نفس الساعة، ودي لحظة تانية خالص (18:30 UTC، فرق ٣ ساعات).

---

## ٤. الصيف والشتا

~~~python
winter = datetime(2026, 1, 15, 12, tzinfo=UTC).astimezone(CAIRO)
print(winter.utcoffset())
~~~

~~~text الناتج
2:00:00
~~~

[[utcoffset()]] الفرق عن UTC كـ timedelta: ساعتين في يناير. لفّينا على كل ساعات 2026 ودورنا إمتى الفرق بيتغير:

~~~text الناتج
change at 2026-04-23 22:00:00+00:00 -> 2026-04-24 01:00:00+03:00
change at 2026-10-29 21:00:00+00:00 -> 2026-10-29 23:00:00+02:00
~~~

يعني الساعة بتتقدم أول يوم 24 أبريل (جمعة) وبترجع آخر يوم 29 أكتوبر (خميس). [[ZoneInfo]] عارف ده لوحده، و [[timedelta(hours=3)]] الثابتة هتغلط نص السنة.

---

## ٥. من القاهرة لـ UTC

~~~python
meeting = datetime(2026, 10, 5, 10, 0, tzinfo=CAIRO)
print(meeting.astimezone(UTC))
~~~

~~~text الناتج
2026-10-05 07:00:00+00:00
~~~

ميعاد الساعة 10 الصبح بتوقيت القاهرة. مع [[ZoneInfo]] ينفع تحطه في [[tzinfo=]] على طول، وهو بيحسب الفرق الصح لليوم ده (5 أكتوبر لسه صيفي، +3). والعكس بـ [[astimezone(UTC)]]: ده اللي يتخزن في القاعدة.

---

## ٦. [[fromisoformat]] و [[timedelta]]

~~~python
parsed = datetime.fromisoformat("2026-09-29T10:00:00Z")
print(parsed.tzinfo, parsed + timedelta(days=30))
~~~

~~~text الناتج
UTC 2026-10-29 10:00:00+00:00
~~~

- [[fromisoformat]]: العكس بتاع [[isoformat]]، بيقرا النص. و [[Z]] في الآخر (اختصار Zulu) يعني UTC، فالناتج aware. (قراية [[Z]] اتضافت في 3.11.) ولو النص من غير [[Z]] ولا [[+03:00]]، الناتج naive: [["2026-09-29T10:00:00"]] طلع [[2026-09-29 10:00:00]] من غير offset.
- [[+ timedelta(days=30)]]: زوّد ٣٠ يوم.

---

## ٧. بداية اليوم في القاهرة كـ UTC

~~~python
day_start = datetime.combine(local.date(), datetime.min.time(), tzinfo=CAIRO).astimezone(UTC)
~~~

من جوه لبرة:

1. [[local.date()]]: التاريخ بس من [[local]]: [[2026-09-30]].
2. [[datetime.min.time()]]: الساعة صفر ([[00:00:00]]). ونفس القيمة اسمها [[time.min]] (اللي في الحل).
3. [[datetime.combine(date, time, tzinfo=CAIRO)]]: ركّب تاريخ وساعة في datetime واحد بتوقيت القاهرة: [[2026-09-30 00:00+03:00]].
4. [[.astimezone(UTC)]]: نفس اللحظة بـ UTC.

~~~text الناتج
2026-09-29 21:00:00+00:00
~~~

يوم 30 في القاهرة بيبدأ الساعة 9 بالليل يوم 29 بـ UTC. ده الرقم اللي تحطه في [[WHERE created_at >= ...]].

---

## ٨. الفرق بين تاريخين، والمقارنة الممنوعة

~~~text الناتج: print(date(2026, 12, 25) - date(2026, 9, 29))
87 days, 0:00:00
~~~

طرح تاريخين بيرجّع [[timedelta]]، وده شكل طباعته: أيام، وبعدين ساعات:دقايق:ثواني. ولو عايز الرقم بس: [[.days]].

~~~text الناتج: naive < now
TypeError: can't compare offset-naive and offset-aware datetimes
~~~

offset-naive = من غير فرق عن UTC، و offset-aware = معاه. Python بيرفض يقارنهم لأنه مش عارف [[naive]] ده ساعة أنهي بلد. ده حماية: لو شفت الخطأ ده يبقى فيه وقت naive داخل الكود، دوّر عليه.

---

## ٩. الحل: طلبات يوم في القاهرة

~~~python solCode (القلب)
def cairo_day_range(d: date) -> tuple[datetime, datetime]:
    start = datetime.combine(d, time.min, tzinfo=CAIRO)
    end = datetime.combine(d + timedelta(days=1), time.min, tzinfo=CAIRO)
    return start.astimezone(UTC), end.astimezone(UTC)
start, end = cairo_day_range(date(2026, 9, 30))
todays = [o for o in orders if start <= datetime.fromisoformat(o) < end]
~~~

- البداية نص ليل اليوم، والنهاية نص ليل **اليوم اللي بعده**، والاتنين بيتحوّلوا UTC.
- [[-> tuple[datetime, datetime] ]]: الدالة بترجّع اتنين، و [[start, end = ...]] بيفكّهم.
- [[start <= t < end]]: الفترة مقفولة من الأول ومفتوحة من الآخر، فطلب الساعة 21:00:00 بالظبط بيتحسب في يوم واحد بس.

~~~text الناتج (ويندوز ولينكس)
2026-09-29 21:00:00+00:00 2026-09-30 21:00:00+00:00
3 ['2026-09-29T21:00:00Z', '2026-09-30T12:00:00Z', '2026-09-30T20:59:59Z']
['2026-09-29', '2026-09-30', '2026-09-30', '2026-09-30', '2026-10-01']
~~~

السطر الأخير: كل طلب اتحوّل لتوقيت القاهرة وخدنا تاريخه بس ([[.date().isoformat()]]). الطلب [[2026-09-30T21:00:00Z]] تاريخه UTC يوم 30، بس في القاهرة بقى يوم 1 أكتوبر.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| الوقت دلوقتي للتخزين | [[datetime.now(UTC)]] |
| نفس اللحظة بتوقيت تاني | [[dt.astimezone(ZoneInfo("Africa/Cairo"))]] |
| ميعاد مكتوب بتوقيت القاهرة | [[datetime(..., tzinfo=CAIRO)]] |
| نص ISO ← datetime ← نص ISO | [[fromisoformat]] و [[isoformat]] |
| شكل للعرض | [[strftime("%d/%m/%Y %I:%M %p")]] |
| بداية يوم محلي | [[datetime.combine(d, time.min, tzinfo=CAIRO)]] |

- متستخدمش [[datetime.now()]] من غير UTC، ولا [[replace(tzinfo=...)]] للتحويل، ولا [[timedelta(hours=3)]] كتوقيت مصر.
- على ويندوز سطّب [[tzdata]].`,
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
          teach: R`## المثال بيعمل إيه؟

١٠ استخدامات لـ [[re]] ورا بعض: فحص رقم موبايل وتاريخ، واستخراج أجزاء من سطر لوج، ولقط كل الأرقام من نص، وتنجيمها، وتقسيم بفواصل مختلفة، وعمل slug، والفرق بين الطماع والكسول، و [[escape]]. اتشغّل على ويندوز (Python 3.14.3) وعلى لينكس ([[python:3.13-slim]] في Docker) وطلع نفس الناتج.

لغة الـ regex نفسها ([[\d]] و [[+]] و [[[...]]] و groups) مشروحة بالتفصيل في تاب JavaScript، فهنا هنركّز على إزاي Python بيناديها، ونشرح الرموز بسرعة أول ما تظهر.

---

## ١. [[re.compile]] و [[match]]

~~~python
import re
PHONE = re.compile(r"^01[0125]\d{8}$")
print(bool(PHONE.match("01012345678")), bool(PHONE.match("0101234567")))
~~~

~~~text الناتج
True False
~~~

### الـ pattern حتة حتة

| الحتة | معناها |
|---|---|
| [[^]] | أول الـ string |
| [[01]] | الحرفين دول بالظبط |
| [[[0125]]] | حرف واحد من دول: 0 أو 1 أو 2 أو 5 |
| [[\d]] | رقم (digit) |
| [[{8}]] | اللي قبلي ٨ مرات بالظبط |
| [[$]] | آخر الـ string |

يعني ١١ رقم: 01 وبعدين 0 أو 1 أو 2 أو 5 وبعدين ٨ أرقام. الرقم التاني فيه ١٠ أرقام بس فـ False.

### [[r"..."]]

[[r]] قبل التنصيص = **raw string**: الـ backslash يفضل backslash. من غيرها Python نفسه بيحاول يفهم [[\d]] كـ escape قبل ما توصل للـ regex. جربنا [[re.findall("\d", "a1")]] من غير r:

~~~text الناتج
SyntaxWarning: "\d" is an invalid escape sequence. Such sequences will not work in the future. Did you mean "\\d"? A raw string is also an option.
['1']
~~~

اشتغلت المرة دي بالصدفة، بس [["\b"]] مثلًا بتبقى حرف backspace مش word boundary من غير ما يقولك.

### [[compile]] و [[match]] و [[bool]]

- [[re.compile]]: حوّل الـ pattern لـ object مرة واحدة، وبعدين استخدمه كتير.
- [[.match(s)]]: جرّب من **أول** الـ string. بيرجّع match object لو نجح، أو [[None]].
- [[bool(...)]]: match object يبقى True و None يبقى False.

> [[$]] في Python بيقبل [[\n]] واحدة في الآخر: [[PHONE.match("01012345678\n")]] طلعت True. عشان كده الـ deep بيقول للـ validation استخدم [[fullmatch]].

---

## ٢. [[re.fullmatch]]

~~~python
print(re.fullmatch(r"\d{4}-\d{2}-\d{2}", "2026-09-29") is not None)
~~~

~~~text الناتج
True
~~~

[[fullmatch]] = الـ string **كلها** لازم تطابق، فمش محتاج [[^]] و [[$]]. والـ pattern: ٤ أرقام، شرطة، رقمين، شرطة، رقمين. و [[is not None]] بيقول «لقى تطابق؟». وجربنا [[re.fullmatch(r"\d+", "12\n")]]: طلعت [[None]]، يعني الـ newline اتمسكت.

| الدالة | بتدوّر فين |
|---|---|
| [[re.match]] | من أول الـ string (والباقي مش مهم) |
| [[re.fullmatch]] | الـ string كلها |
| [[re.search]] | أي حتة |

---

## ٣. [[re.search]] و named groups: سطر لوج

~~~python
line = '10.0.0.7 - - [29/Sep/2026:10:00:01 +0000] "GET /api/users HTTP/1.1" 500 12'
m = re.search(r'"(?P<method>[A-Z]+) (?P<path>\S+) [^"]*" (?P<status>\d{3})', line)
if m:
    print(m["method"], m["path"], int(m["status"]))
~~~

الـ string بـ [[']] من برّه عشان جواها [["]]. والـ pattern:

| الحتة | معناها | مسكت |
|---|---|---|
| [["]] | علامة التنصيص اللي قبل GET | |
| [[(?P<method>[A-Z]+)]] | group اسمه method: حرف كبير أو أكتر ([[+]] = مرة أو أكتر) | [[GET]] |
| مسافة | | |
| [[(?P<path>\S+)]] | group اسمه path: أي حاجة مش مسافة ([[\S]]) | [[/api/users]] |
| [[ [^"]*"]] | مسافة، وبعدين أي حاجة مش [["]] صفر مرة أو أكتر ([[*]])، وبعدين [["]] | [[ HTTP/1.1"]] |
| [[(?P<status>\d{3})]] | group اسمه status: ٣ أرقام | [[500]] |

- [[(...)]] = group: بيمسك الجزء ده عشان تاخده بعدين. و [[?P<name>]] بيدّيه اسم. الـ P دي خاصة بـ Python: صيغة JavaScript [[(?<name>...)]] جربناها في Python وطلعت [[error: unknown extension ?<n at position 1]].
- [[re.search]]: الـ pattern مش في أول السطر (أوله IP)، فـ [[match]] كانت هترجع None.
- [[if m:]]: لو مفيش تطابق [[m]] بـ None، و [[None["method"]]] بيرمي TypeError.
- [[m["method"]]]: قيمة الـ group بالاسم. ونفس الحاجة [[m.group("method")]]، وبالرقم [[m[1]]]، و [[m.group(0)]] التطابق كله.
- [[int(m["status"])]]: كل اللي بيطلع من regex strings.

~~~text الناتج
GET /api/users 500
~~~

---

## ٤. [[findall]] و [[sub]]

~~~python
text = "كلمني على 01012345678 أو 01298765432"
print(re.findall(r"01\d{9}", text))
print(re.sub(r"(01\d)\d{5}(\d{3})", r"\1*****\2", text))
~~~

~~~text الناتج
['01012345678', '01298765432']
كلمني على 010*****678 أو 012*****432
~~~

- [[findall]]: كل التطابقات في list of strings.
- [[re.sub(pattern, replacement, text)]]: استبدل كل تطابق. الـ pattern فيه groupين: [[(01\d)]] أول ٣ أرقام، و [[(\d{3})]] آخر ٣، و [[\d{5}]] اللي في النص من غير group. والاستبدال [[\1]] يعني «حط اللي group 1 مسكه»، وبعدين ٥ نجوم، وبعدين [[\2]]. والاستبدال نفسه raw string كمان عشان [[\1]].

> فخ [[findall]]: لو الـ pattern فيه groups بيرجّع الـ groups مش التطابق كله. [[re.findall(r"(01\d)\d{8}", ...)]] على نفس الرقمين طلّعت [[['010', '012'] ]] بس.

---

## ٥. [[re.split]] و slug

~~~python
print(re.split(r"\s*[,;]\s*", "tea , coffee;juice"))
slug = re.sub(r"[^a-z0-9]+", "-", "Hello, FastAPI World!".lower()).strip("-")
~~~

~~~text الناتج
['tea', 'coffee', 'juice']
hello-fastapi-world
~~~

- [[\s*[,;]\s*]]: مسافات (أي عدد)، وبعدين فاصلة أو semicolon، وبعدين مسافات. فالفاصل بيتشال هو والمسافات اللي حواليه.
- الـ slug من جوه لبرة: [[.lower()]] الأول ([["hello, fastapi world!"]])، وبعدين [[[^a-z0-9]+]] (الـ [[^]] **جوه** القوسين معناها «مش»: أي حاجة مش حرف صغير أو رقم، مرة أو أكتر) تبقى شرطة واحدة: [["hello-fastapi-world-"]]، وبعدين [[.strip("-")]] بيشيل الشرط من الطرفين.

---

## ٦. طماع وكسول

~~~text الناتج: re.findall(r"<.+?>", "<b>hi</b>") و re.findall(r"<.+>", "<b>hi</b>")
['<b>', '</b>'] ['<b>hi</b>']
~~~

- [[.]] أي حرف، و [[.+]] **طماعة** (greedy): بتاخد أكتر حاجة ممكنة، فمن أول [[<]] لآخر [[>]] في السطر كله.
- [[.+?]] **كسولة** (lazy): الـ [[?]] بعد [[+]] بتقول «أقل حاجة ممكنة»، فبتقف عند أول [[>]].

---

## ٧. [[re.escape]]

~~~text الناتج: print(re.escape("price (EGP)?"))
price\ \(EGP\)\?
~~~

بيحط [[\]] قبل أي رمز ليه معنى في الـ regex ([[(]] و [[)]] و [[?]] والمسافة)، فالنص يتدوّر عليه زي ما هو. استخدمه لما تحط كلام من المستخدم جوه pattern.

---

## ٨. الحل: لوج بـ named groups

~~~python solCode (الـ pattern)
LINE = re.compile(r'^(?P<ip>\S+) .*?"(?P<method>[A-Z]+) (?P<path>[^ ?"]+)\S* [^"]*" (?P<status>\d{3}) ')
~~~

| الحتة | بتمسك |
|---|---|
| [[^(?P<ip>\S+)]] | أول كلمة في السطر: الـ IP |
| [[ .*?"]] | أي حاجة لحد أول [["]] (كسولة عشان متعدّيش للتانية) |
| [[(?P<method>[A-Z]+)]] | GET أو POST |
| [[(?P<path>[^ ?"]+)]] | الـ path لحد مسافة أو [[?]] أو [["]]: من غير query string |
| [[\S*]] | الـ query string لو موجودة ([[?page=2]])، بيبلعها من غير ما يمسكها |
| [[ [^"]*" ]] | ما بعد الـ path لحد [["]] |
| [[(?P<status>\d{3})]] | الـ status |

و [[m.groupdict()]] على السطر التالت:

~~~text الناتج
{'ip': '10.0.0.7', 'method': 'GET', 'path': '/api/users', 'status': '502'}
~~~

والـ loop: [[if not m:]] عدّ السطر في [[skipped]] و [[continue]]، ولو الـ status بيبدأ بـ 5 زوّد عدّاد الـ path.

~~~text الناتج
{'/api/users': 2} skipped: 1
~~~

---

## الخلاصة

| الدالة | بترجّع |
|---|---|
| [[re.match]] / [[re.search]] / [[re.fullmatch]] | match object أو [[None]] |
| [[re.findall]] | list strings (أو الـ groups لو فيه groups) |
| [[re.sub(p, repl, s)]] | string جديدة، و [[\1]] بيرجّع group |
| [[re.split(p, s)]] | list |
| [[re.compile(p)]] | pattern جاهز بنفس الدوال |

- دايمًا [[r"..."]]، ودايمًا [[if m:]] قبل الـ groups.
- [[(?P<name>...)]] بـ P في Python، و [[.*?]] لما [[.*]] تبلع زيادة.`,
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
    }
]);
