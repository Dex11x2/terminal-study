// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "ملفات وداتا وتواريخ",
      l: 1,
      time: R`حوالي ١٠ ساعات (٥ دروس)`,
      goal: [
        R`تبني وتقرا وتكتب مسارات وملفات بـ [[pathlib]] على ويندوز ولينكس بنفس الكود، وتختار الـ encoding الصح وتقرا [[UnicodeDecodeError]] وتعرف منها الملف اتكتب بإيه.`,
        R`تنسخ وتنقل وتمسح وتضغط فولدرات بـ [[shutil]]، وتشتغل في فولدرات مؤقتة، وتكتب الملفات المهمة كتابة atomic متسيبش ملف نصه مكتوب.`,
        R`تقرا وتكتب CSV (بفاصلة جوه الاسم، و BOM بتاع Excel، وفاصل [[;]]) و JSON و JSON Lines، وتحوّل الأنواع بنفسك، وتعدّي على ملف ملايين صفوف بذاكرة ثابتة.`,
        R`تخزّن الوقت aware بـ UTC وتعرضه بساعة القاهرة، وتحسب حدود اليوم والشهر صح، وتتعامل مع ليلة تغيير الساعة.`,
        R`تكتب regex للـ validation والاستخراج والـ masking، وتتجنّب فخ [[\d]] مع الأرقام العربي و الـ patterns اللي ممكن توقّف السيرفر.`,
      ],
      use: {
        prog: R`أي سكربت أو API بيقرا ملف ويكتب ملف ويتعامل مع وقت. الأخطاء هنا (encoding، توقيت، ملف نصه مكتوب) بتظهر عند اليوزر مش عندك، فلازم تعرفها قبله.`,
        work: R`تقرير المبيعات بيتحسب بيوم القاهرة مش UTC، والـ CSV جاي من Excel بـ BOM، واللوج فيه أرقام موبايل لازم تتخبّى، وملف الإعدادات لازم يفضل سليم لو السيرفر اتعمله restart في نص الكتابة.`,
        cs: R`الـ encoding جدول من حروف لـ bytes (UTF-8 متغير الطول)، و [[os.replace]] بيعتمد على إن تغيير الاسم atomic في نظام الملفات، والـ regex engine بتاع Python backtracking وده سبب الـ ReDoS الأُسّي.`,
      },
      projects: [
        { lvl: 'صغير', t: R`منظّم فولدر التحميلات`, what: R`[[organize.py FOLDER --dry-run]] بينقل كل ملف لفولدر حسب امتداده ([[images]] و [[docs]] و [[archives]] و [[other]])، ويتجاهل الملفات المخفية و [[desktop.ini]]، ويطبع اللي هيعمله قبل ما يعمله. من دروس pathlib و shutil.`, done: R`[[--dry-run]] بيطبع الخطة ومبيحرّكش ولا ملف، ومن غيره بينقل، والتشغيل التاني مبيعملش حاجة، وملف بنفس الاسم في الوجهة بياخد [[ (2)]] في اسمه بدل ما يكتب فوقه، واتجرّب على فولدر نسخة في [[TemporaryDirectory]].` },
        { lvl: 'صغير', t: R`ساعة بكذا مدينة`, what: R`[[clock.py]] بيطبع الوقت دلوقتي في القاهرة ودبي ولندن ونيويورك، والفرق عن UTC لكل واحدة، وهل فيه توقيت صيفي شغال ولا لأ ([[dst()]]). من درس datetime و zoneinfo.`, done: R`الأربع مدن بأوقات صح (قارنتها بموقع ساعة)، والفرق مطبوع زي [[+02:00]]، ولو غيّرت التاريخ لـ ١ أغسطس بيبان التوقيت الصيفي في القاهرة ولندن ونيويورك.` },
        { lvl: 'متوسط', t: R`محوّل CSV ⇄ JSON بأمان`, what: R`[[convert.py in.csv out.json]] والعكس: بيكتشف الفاصل والـ BOM، ويحوّل الأرقام والتواريخ ISO، ويكتب الناتج بـ [[write_atomic]]، ويطبع الصفوف البايظة برقمها. من دروس csv و json و shutil و pathlib.`, done: R`ملف من Excel بـ [[;]] و BOM بيطلع JSON نضيف، والعكس بيرجّع CSV بيتفتح عربي سليم في Excel ([[utf-8-sig]])، وكسر البرنامج بـ Ctrl+C في النص مبيسيبش ملف ناقص، و ٥ اختبارات pytest بـ [[tmp_path]] بتعدّي.` },
        { lvl: 'متوسط', t: R`محلّل لوجات nginx`, what: R`[[logstats.py access.log]] بيقرا سطر سطر بـ regex بـ named groups، ويطلّع أكتر ١٠ مسارات و IPs، ونسبة الـ 4xx والـ 5xx لكل ساعة **بتوقيت القاهرة**، ويكتب ملخص JSON. من دروس re و datetime و csv و json.`, done: R`على ملف ١٠٠ ألف سطر (ولّدته بنفسك) بيخلص والذاكرة ثابتة (قستها بـ [[tracemalloc]] أقل من ١٠ ميجا)، والسطور البايظة بتتعدّ وبتتساب، والساعات صح بعد التحويل من [[+0000]] للقاهرة، والـ pattern مكتوب بـ [[re.VERBOSE]].` },
        { lvl: 'كبير', t: R`باك أب يومي بيتأكد من نفسه`, what: R`[[backup.py --config backup.json]]: الإعدادات (فولدرات المصدر، والوجهة، وعدد النسخ، و patterns للاستثناء) من JSON، وبيعمل zip باسم فيه التاريخ بتوقيت القاهرة، ويتأكد من المساحة قبل ما يبدأ، ويكتب [[manifest.json]] فيه كل ملف ومساره النسبي وحجمه ووقت تعديله ([[stat()]])، ويحتفظ بآخر N ويمسح الأقدم، ويسجّل كل خطوة في [[backup.jsonl]] بوقت UTC، وبيخرج بكود ١ لو أي حاجة فشلت. وأمر [[--verify]] بيفك آخر zip في فولدر مؤقت ويقارن بالـ manifest. من كل دروس الوحدة.`, done: R`٧ تشغيلات بيسيبوا N نسخ بس، و [[--verify]] بيقول «سليم» على نسخة سليمة، وبيطبع اسم الملف لو مسحت ملف من الـ zip أو حجمه مش زي الـ manifest، و zip بايظ بيطلع رسالة [[BadZipFile]] مفهومة، والإعدادات البايظة (JSON غلط أو مسار مش موجود) بتطلع رسالة واضحة وكود ١ من غير traceback، واللوج JSON Lines صالح سطر سطر، و ١٠ اختبارات pytest بـ [[tmp_path]] بتعدّي، والكود اتشغّل على ويندوز ولينكس ([[docker run python:3.13-slim]]).`, ext: R`زوّد backup تزايدي (الملفات اللي اتغيّرت من آخر مرة بس، بالمقارنة بالـ manifest)، وجدولة يومية (Task Scheduler أو cron من تابات الترمنال)، وإشعار لو فشل.` },
        { lvl: 'فكرة', t: R`أداة لداتا بتعاني منها انت`, what: R`فكّر في ملف بتتعامل معاه بإيدك كل أسبوع (كشف بنك CSV، أو تصدير من برنامج، أو لوج) وابني أداة بتنضفه وتلخصه وتطلّع الحاجة اللي بتدوّر عليها. انت بتحدد الشكل والمخرجات.`, done: R`الأداة بتشتغل على ٣ ملفات حقيقية مختلفة من غير تعديل، وبتتعامل مع العربي والتواريخ والأرقام بالفواصل، ووفّرت عليك وقت تقدر تقيسه (كام دقيقة كل أسبوع).`, ext: R`لما توصل لـ FastAPI اعملها endpoint بيستقبل الملف ويرجّع الملخص، ولما توصل لـ «سكربتات وأوامر النظام» اعملها CLI بـ typer.` },
      ],
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
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** لـ [[Path("C:/data/archive/report.tar.gz")]]، اكتب من الذاكرة قيمة [[name]] و [[stem]] و [[suffix]] و [[suffixes]] و [[parent.name]] و [[with_suffix(".zip")]]، وبعدين اطبعهم.`, done: R`الست قيم طابقوا: [[report.tar.gz]] و [[report.tar]] و [[.gz]] و [[['.tar', '.gz']]] و [[archive]] و [[report.tar.zip]] (مش [[report.zip]]: [[with_suffix]] بيغيّر آخر امتداد بس).` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** سكربت في [[C:\tools\find.py]] فيه [[print(Path("cfg.toml").resolve())]] و [[print((Path(__file__).parent / "cfg.toml").resolve())]]. لو شغّلته من [[C:\Users\you]] بـ [[python C:\tools\find.py]]، كل سطر هيطبع إيه؟`, done: R`الأول [[C:\Users\you\cfg.toml]] (من الفولدر الحالي) والتاني [[C:\tools\cfg.toml]] (جنب السكربت)، وجرّبتها بفولدرين حقيقيين وطابقت.` },
            { lvl: 'تطبيق', t: R`**صلّح:** السكربت ده بيقع على ويندوز وبيكتب ملف بايظ عند زميلك: [[out = "reports/" + name + ".txt"; open(out, "w").write(text)]] و [[name]] ممكن تيجي [["  sales/Q1 "]]. صلّحه بـ [[pathlib]]: نضّف الاسم من المسافات و [[/]] و [[\]]، واعمل الفولدر لو ناقص، واكتب بـ UTF-8.`, done: R`[[name = "  sales/Q1 "]] بيكتب [[reports/sales_Q1.txt]] مش فولدر جديد اسمه [[sales]]، والتشغيل مرتين مبيرميش، والملف بيتفتح عربي سليم، وتشغيله بـ [[-X warn_default_encoding]] مبيطلّعش [[EncodingWarning]].` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** فولدر فيه ٣ CSV: واحد UTF-8، وواحد UTF-8 بـ BOM (من Excel)، وواحد [[cp1256]] (اعملهم بنفسك بـ [[write_text]]). اكتب [[read_any(path)]] بتجرّب [[utf-8-sig]] الأول وبعدين [[cp1256]] وترجّع النص والـ encoding اللي نجح.`, done: R`التلات ملفات بيرجعوا نفس النص العربي بالظبط، والـ encoding المرجّع [[utf-8-sig]] للأولين و [[cp1256]] للتالت، وأول عمود في التلاتة اسمه [[name]] مش [[\ufeffname]]، وملف bytes عشوائية بيرمي error واضح بدل ما يرجّع نص بايظ.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[du.py]] بتاخد فولدر وتطبع أكبر ١٠ ملفات تحته بالحجم (بـ KB) ومساراتها نسبةً للفولدر، وإجمالي الحجم لكل امتداد. استخدم [[rglob]] و [[stat]] و [[relative_to]]، واتجاهل الملفات اللي مقدرتش تقراها.`, done: R`على فولدر مشروع حقيقي بيطبع ١٠ سطور مترتبة تنازلي ومجموع لكل امتداد، والمجموع الكلي قريب من خصائص الفولدر في الويندوز، وملف بتمسحه وهو بيلف (أو بدون صلاحية) مبيوقّعش السكربت.` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** لـ [[organize]] بتاعة الحل، اكتب ٤ اختبارات pytest بـ fixture [[tmp_path]]: ملفات بامتدادات مختلفة، وملف من غير امتداد، وتشغيل مرتين ورا بعض، وملف بنفس الاسم موجود قبل كده في فولدر الوجهة.`, done: R`[[pytest -q]] بيقول [[4 passed]]، ومفيش ولا ملف اتعمل برّه [[tmp_path]] (اتأكدت إن فولدرك الحقيقي متلمسش)، والحالة الأخيرة بتقول إيه اللي المفروض يحصل (يتساب أو يتغير اسمه) والاختبار بيثبته.` },
          ],
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

## ١٤. الـ encoding: ليه [[encoding="utf-8"]] في كل سطر

الملف على الديسك bytes. الـ encoding هو القاموس اللي بيحوّل النص لـ bytes والعكس. لو كتبت بقاموس وقريت بقاموس تاني، العربي يبوظ:

~~~python
from pathlib import Path
p = Path("names.txt")
p.write_text("سارة\nعمر\n", encoding="cp1256")
print(p.read_bytes()[:4])
p.read_text(encoding="utf-8")
~~~

~~~text الناتج (Python 3.14 ويندوز)
b'\xd3\xc7\xd1\xc9'
UnicodeDecodeError: 'utf-8' codec can't decode byte 0xd3 in position 0: invalid continuation byte
~~~

- [[cp1256]] ده encoding ويندوز العربي القديم: كل حرف بايت واحد ([[س]] = [[0xd3]]). و UTF-8 بيكتب الحرف العربي في ٢ بايت، فلما قرا [[0xd3]] استنى بايت تاني معين ملقاهوش.
- **الرسالة بتقولك**: الـ codec اللي حاولت بيه ([[utf-8]])، والبايت اللي مقدرش يفهمه، ومكانه. لو شفت [[0xff 0xfe]] في أول ملف، ده UTF-16 (اللي [[Out-File]] في PowerShell 5.1 بيكتبه).
- [[errors="replace"]] بيكمّل ويحط [[�]] مكان أي بايت مش مفهوم (اتجرّب: «سارة» طلعت [[����]]). مفيد عشان تقرا لوج بايظ، بس **مش** حل: الداتا ضاعت. الحل إنك تعرف الـ encoding الصح ([[encoding="cp1256"]] رجّعت [[['سارة', 'عمر']]]).

**ليه متسيبش الـ default؟** من غير [[encoding=]]، [[open]] و [[read_text]] بيستخدموا [[locale.getencoding()]]. على الجهاز اللي اتجرّب عليه طلعت [[cp65001]] (UTF-8، لأن إعداد «Beta: Use Unicode UTF-8» في ويندوز متفعّل)، وعلى أغلب أجهزة ويندوز بالإعداد الافتراضي بتبقى [[cp1252]] أو [[cp1256]] (من وثائق Python). يعني نفس السكربت شغال عندك وبايظ عند زميلك. Python بيقدر يحذّرك:

~~~text الناتج: python -X warn_default_encoding -c "open('names.txt').close()"
<string>:1: EncodingWarning: 'encoding' argument not specified
~~~

و [[python -X utf8]] (أو [[PYTHONUTF8=1]]) بيخلي الـ default UTF-8 في كل حاجة، و PEP 686 بيخليه الافتراضي من Python 3.15 (من الوثائق). لحد ما كل الأجهزة تبقى كده، اكتب [[encoding="utf-8"]].

### Excel و الـ BOM: [[utf-8-sig]]

~~~python
x = Path("excel.csv")
x.write_text("name,city\nسارة,القاهرة\n", encoding="utf-8-sig")
print(x.read_bytes()[:3])
print(repr(x.read_text(encoding="utf-8")[:5]), repr(x.read_text(encoding="utf-8-sig")[:5]))
~~~

~~~text الناتج
b'\xef\xbb\xbf'
'\ufeffname' 'name,'
~~~

- Excel على ويندوز مبيعرفش إن CSV ده UTF-8 إلا لو أوله ٣ بايتات علامة اسمها BOM ([[EF BB BF]])، ومن غيرها العربي بيظهر حروف غريبة. [[utf-8-sig]] في الكتابة بيحطها.
- وفي القراية: ملف جاي من Excel أوله BOM، ولو قريته بـ [[utf-8]] أول عمود اسمه بقى [[\ufeffname]] مش [[name]]، و [[row["name"]]] بترمي [[KeyError]] وانت شايف الاسم صح. [[utf-8-sig]] في القراية بيشيلها لو موجودة وبيعدّي لو مش موجودة، فهو الآمن لأي CSV جاي من برّه.

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
            R`[[Path]] الـ class اللي بيمثّل مسار (فولدر أو ملف) كـ object مش string. على ويندوز بيبقى [[WindowsPath]] وعلى لينكس [[PosixPath]] لوحده، فنفس الكود بيشتغل على الاتنين من غير ما تفكر في [[\]] و [[/]].`,
            R`[[Path("data")]] مسار **نسبي**: بيتحسب من الفولدر الحالي اللي شغّلت منه (مش فولدر السكربت). لو شغّلت من فولدر تاني هيشاور على [[data]] تانية؛ ولو عايز جنب السكربت استخدم [[Path(__file__)]] (سطر ١٦).`,
            R`[[/]] بين [[Path]] و string بيبني مسار جديد بالفاصل الصح للنظام: [[data\reports\2026]] على ويندوز و [[data/reports/2026]] على لينكس. أأمن من [[base + "/reports"]] اللي بيكسر على الأنظمة التانية أو بيعمل [[//]].`,
            R`[[mkdir]] بيعمل الفولدر. [[parents=True]] بيعمل اللي فوقه لو ناقصين (زي [[mkdir -p]])، ومن غيره [[FileNotFoundError]] لو [[data]] مش موجودة. و [[exist_ok=True]] بيعدّي بهدوء لو موجود، ومن غيره التشغيل التاني يرمي [[FileExistsError]].`,
            R`[[f]] مسار ملف لسه مش موجود: [[Path]] مجرد عنوان، والملف بيتعمل لما تكتب فيه. ممكن تبني مسارات لحاجات مش موجودة عادي ومفيش error.`,
            R`[[write_text]] بتفتح وتكتب وتقفل في سطر واحد، وبتكتب فوق المحتوى القديم لو موجود. و [[encoding="utf-8"]] **دايمًا**: من غيرها Python بيستخدم encoding الجهاز، وعلى ويندوز ممكن تبقى [[cp1252]] أو [[cp1256]] والعربي يبوظ (قسم الـ encoding في الشرح).`,
            R`[[print(f)]] بيطبع المسار بشكل النظام: [[data\reports\2026\sales.csv]] على ويندوز. ولو محتاج دايمًا [[/]] (في URL أو JSON) استخدم [[f.as_posix()]].`,
            R`أجزاء الاسم من غير قص strings: [[name]] الاسم كامل ([[sales.csv]])، و [[stem]] من غير آخر امتداد ([[sales]])، و [[suffix]] الامتداد بالنقطة ([[.csv]])، و [[parent]] الفولدر اللي فوقه كـ [[Path]] و [[.name]] بتاعه [[2026]]. ولـ [[a.tar.gz]] الـ [[suffix]] بـ [[.gz]] و [[suffixes]] بـ [[['.tar', '.gz']]].`,
            R`[[exists()]] موجود (ملف أو فولدر)، و [[is_file()]] ملف بالذات، و [[stat().st_size]] الحجم بالبايت ([[15]] هنا: كل حرف ASCII بايت، والسطرين فيهم [[\n]]). و [[stat()]] على مسار مش موجود بترمي [[FileNotFoundError]]، فاسأل [[exists()]] الأول لو مش متأكد.`,
            R`[[read_text]] بيقرا الملف كله كـ string (بنفس الـ encoding اللي اتكتب بيه)، و [[splitlines()]] بيقسّمه سطور من غير [[\n]] في الآخر وبيفهم [[\r\n]] كمان. الناتج [[['id,total', '1,150']]]. ولملف كبير لف عليه سطر سطر بـ [[with f.open() as fh: for line in fh]] بدل ما تحمّله كله.`,
            R`[[rglob("*.csv")]] بيدوّر في [[data]] وكل الفولدرات اللي جواه بأي عمق (r = recursive)، و [[glob]] من غير r في الفولدر ده بس. و [[sorted]] لأن الترتيب اللي بيرجع بيه مش مضمون ويختلف بين الأنظمة.`,
            R`[[relative_to(base)]] بيشيل [[data]] من أول المسار فيطلع [[reports\2026\sales.csv]]. مفيد في اللوج والتقارير. ولو المسار مش تحت [[base]] أصلًا بيرمي [[ValueError]]؛ ومن 3.12 [[is_relative_to]] بتسأل الأول.`,
            R`[[with_suffix(".bak")]] بيرجّع [[Path]] **جديد** بامتداد تاني ([[sales.bak]])، والأصلي ولا الملف بيتغيروا: لسه مفيش أي حاجة اتعملت على الديسك. وفيه [[with_name]] و [[with_stem]] لتغيير الاسم.`,
            R`[[rename]] بينقل الملف فعلًا على الديسك للاسم الجديد. على ويندوز بيرمي [[FileExistsError]] لو الاسم الجديد موجود، وعلى لينكس بيكتب فوقه بصمت. لو عايز نفس السلوك في الاتنين ([[اكتب فوقه]]) استخدم [[replace]].`,
            R`[[Path.cwd()]] الفولدر الحالي (اللي شغّلت منه)، و [[Path.home()]] فولدر اليوزر ([[C:\Users\you]] أو [[/home/you]]). على ويندوز [[home()]] بيقرا [[USERPROFILE]] مش [[HOME]]، فتغيير [[HOME]] في اختبار مبيغيّرهاش.`,
            R`[[__file__]] مسار الملف ده نفسه، و [[resolve()]] بيحوّله مسار كامل (ويفك [[..]] والـ symlinks)، و [[parent]] الفولدر اللي فيه. ده الطريق الصح تلاقي ملفات جنب السكربت مهما كان المكان اللي شغّلت منه. (في الـ REPL مفيش [[__file__]] و [[NameError]].)`,
            R`[[config.toml]] جنب السكربت بالظبط، فلو حد شغّل [[python C:\tools\x.py]] من فولدر تاني لسه هيلاقيه. ومجرد بناء المسار مبيقراش الملف؛ القراية بـ [[read_text]] أو [[tomllib]].`,
            R`[[unlink]] بيمسح ملف (مش فولدر: الفولدر الفاضي [[rmdir()]] والمليان [[shutil.rmtree]] في الدرس الجاي). و [[missing_ok=True]] بيعدّي لو الملف مش موجود، فالسكربت ينفع يتشغّل مرتين ورا بعض من غير [[FileNotFoundError]].`,
          ]
        },
        {
          cmd: "shutil و tempfile",
          title: "نسخ ونقل ومسح فولدرات، وكتابة ملف من غير ما يبوظ لو حصلت مشكلة",
          learn: R`تنسخ وتنقل وتمسح وتضغط فولدرات بـ [[shutil]]، وتشتغل في فولدر مؤقت بيتمسح لوحده، وتكتب ملف إعدادات بطريقة متسيبهوش نصه مكتوب لو البرنامج وقع.`,
          out: R`دالة [[write_atomic]] تستخدمها في أي سكربت بيحفظ حالة، وباك أب بيلف على آخر ٣ نسخ.`,
          use: {
            prog: R`أي أداة بتحفظ إعدادات أو cache أو حالة (state) محتاجة كتابة آمنة: لو الكهربا قطعت وانت بتكتب، [[open(p, "w")]] بيسيب ملف فاضي والأداة متقومش تاني.`,
            work: R`سكربتات الباك أب والنشر والتنضيف كلها [[copytree]] و [[move]] و [[rmtree]]، و [[TemporaryDirectory]] هي اللي بتخلي الاختبارات متوسّخش جهازك.`,
          },
          desc: R`[[pathlib]] بيتعامل مع ملف واحد. [[shutil]] (shell utilities) للعمليات الكبيرة: [[copy2]] ينسخ ملف بتاريخه، و [[copytree]] ينسخ فولدر كامل، و [[move]] ينقل، و [[rmtree]] يمسح فولدر بكل اللي فيه، و [[make_archive]] يعمل zip، و [[disk_usage]] المساحة الفاضية. و [[tempfile]] بيعمل ملفات وفولدرات مؤقتة بأسامي مش هتتصادم وبتتمسح لوحدها.

والأهم: **الكتابة الآمنة (atomic write)**. [[open(p, "w")]] بيفضّي الملف **قبل** ما يكتب، فلو البرنامج وقع في النص الملف بيفضل فاضي. الحل: تكتب في ملف مؤقت جنبه، وبعدين [[os.replace]] بيبدّل الاتنين في خطوة واحدة، فالملف يا إما القديم كامل يا إما الجديد كامل.`,
          example: R`import json
import os
import shutil
import tempfile
from pathlib import Path
def write_atomic(path: Path, text: str) -> None:
    fd, tmp = tempfile.mkstemp(dir=path.parent, prefix=path.name, suffix=".tmp")
    try:
        with os.fdopen(fd, "w", encoding="utf-8", newline="") as f:
            f.write(text)
            f.flush()
            os.fsync(f.fileno())
        os.replace(tmp, path)
    except BaseException:
        Path(tmp).unlink(missing_ok=True)
        raise
with tempfile.TemporaryDirectory(prefix="shop-") as d:
    root = Path(d)
    src = root / "data"
    src.mkdir()
    (src / "orders.json").write_text('{"count": 1}', encoding="utf-8")
    write_atomic(src / "orders.json", json.dumps({"count": 2}))
    print((src / "orders.json").read_text(encoding="utf-8"))
    shutil.copy2(src / "orders.json", root / "orders.bak")
    shutil.copytree(src, root / "backup" / "data", dirs_exist_ok=True)
    shutil.move(root / "orders.bak", root / "backup" / "orders.bak")
    print(sorted(p.relative_to(root).as_posix() for p in root.rglob("*")))
    archive = shutil.make_archive(str(root / "backup"), "zip", root / "backup")
    print(Path(archive).name, Path(archive).stat().st_size > 0)
    shutil.rmtree(root / "backup")
    print((root / "backup").exists())
    total, used, free = shutil.disk_usage(root)
    print(f"free: {free // 2**30} GiB")
print(root.exists())`,
          try: R`اكتب [[save_with_backups(path, data, keep=3)]]: قبل ما تكتب JSON جديد، الملف الحالي يتنسخ [[settings.json.1]]، والقديم [[.1]] يبقى [[.2]]، و [[.2]] يبقى [[.3]]، وأقدم من كده يتمسح. والكتابة نفسها بـ [[write_atomic]]. احفظ ٥ نسخ ورا بعض ([[{"version": 1}]] لحد ٥) في فولدر مؤقت واطبع الملفات ونسخة كل واحد.`,
          sol: R`المتوقع: [[['settings.json', 'settings.json.1', 'settings.json.2', 'settings.json.3']]] ونسخهم [[[5, 4, 3, 2]]]: النسخة ١ اتمسحت لأننا بنحتفظ بـ ٣ باك أب بس.

الترتيب في اللف مهم: بنبدأ من الأقدم ([[.2]] لـ [[.3]]) لحد الأحدث ([[.1]] لـ [[.2]])، ولو بدأت من [[.1]] هتكتب فوق [[.2]] قبل ما تنقله. و [[os.replace]] بيكتب فوق [[.3]] لو موجود، فالأقدم بيتمسح لوحده من غير [[unlink]]. و [[copy2]] (مش [[move]]) للنسخة [[.1]] عشان الملف الأصلي يفضل موجود لحد ما [[write_atomic]] تبدّله، فلو الكتابة فشلت لسه عندك الحالي والباك أب. اتشغّل بـ Python 3.14 على ويندوز.`,
          solCode: R`import json
import os
import shutil
import tempfile
from pathlib import Path
def write_atomic(path: Path, text: str) -> None:
    fd, tmp = tempfile.mkstemp(dir=path.parent, prefix=path.name, suffix=".tmp")
    try:
        with os.fdopen(fd, "w", encoding="utf-8", newline="") as f:
            f.write(text)
            f.flush()
            os.fsync(f.fileno())
        os.replace(tmp, path)
    except BaseException:
        Path(tmp).unlink(missing_ok=True)
        raise
def save_with_backups(path: Path, data: dict, keep: int = 3) -> list[str]:
    if path.exists():
        for i in range(keep - 1, 0, -1):
            older = path.with_name(f"{path.name}.{i}")
            if older.exists():
                os.replace(older, path.with_name(f"{path.name}.{i + 1}"))
        shutil.copy2(path, path.with_name(f"{path.name}.1"))
    write_atomic(path, json.dumps(data, ensure_ascii=False))
    return sorted(p.name for p in path.parent.glob(path.name + "*"))
with tempfile.TemporaryDirectory() as d:
    cfg = Path(d) / "settings.json"
    for n in range(1, 6):
        files = save_with_backups(cfg, {"version": n})
    print(files)
    print([json.loads((Path(d) / f).read_text(encoding="utf-8"))["version"] for f in files])`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** اكتب من الذاكرة الدالة اللي بتعمل كل حاجة: نسخ ملف بتاريخه، ونسخ فولدر لفولدر موجود، ونقل، ومسح فولدر مليان، وzip، ومساحة الديسك، وفولدر مؤقت بيتمسح لوحده. وجنب كل واحدة: بترمي إيه لو المصدر مش موجود؟`, done: R`السبع أسامي صح ([[copy2]] و [[copytree(..., dirs_exist_ok=True)]] و [[move]] و [[rmtree]] و [[make_archive]] و [[disk_usage]] و [[TemporaryDirectory]])، وجرّبت ٣ منهم على مسار مش موجود وكتبت إن الخطأ [[FileNotFoundError]].` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** ملف [[cfg.json]] فيه [[{"ok": true}]]. الكود: [[with open(p, "w", encoding="utf-8") as f: f.write(make_text())]] و [[make_text]] بترمي exception. إيه اللي في الملف بعدها؟ وإيه اللي فيه لو استخدمت [[write_atomic(p, make_text())]]؟`, done: R`الأول الملف **فاضي** (نص فاضي [['']]، لأن [[open "w"]] فضّاه قبل الكتابة)، والتاني لسه [[{"ok": true}]] ومفيش ملف [[.tmp]] فاضل في الفولدر. شغّلت الاتنين وطابقوا.` },
            { lvl: 'تطبيق', t: R`**صلّح:** [[shutil.copytree("src", "backup")]] بيشتغل أول مرة وبيقع التانية. اقرا الرسالة، وصلّحه بطريقتين: واحدة بتكمّل فوق الموجود، وواحدة بتعمل فولدر باسم فيه التاريخ والوقت.`, done: R`الرسالة [[FileExistsError]] ومكتوبة عندك بنصها، والطريقة الأولى [[dirs_exist_ok=True]] بتعدّي في التشغيل التاني، والتانية بتعمل [[backup-2026-10-30_1530]] جديد كل مرة، والاتنين اتشغّلوا ٣ مرات من غير error.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[backup.py SRC DEST]]: بيعمل zip لـ SRC باسم فيه التاريخ في DEST، ويتأكد إن فيه مساحة ([[disk_usage]]) أكبر من حجم المصدر مرتين قبل ما يبدأ، ويشيل أي zip أقدم من آخر ٥، ويطبع حجم الـ zip الجديد.`, done: R`٧ تشغيلات بيسيبوا ٥ zips بس (الأحدث)، ومصدر مش موجود بيطلع رسالة وكود خروج ١ من غير traceback، ولو غيّرت شرط المساحة لرقم مستحيل بيرفض يبدأ ومبيعملش zip ناقص.` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** لـ [[write_atomic]]، اكتب اختبار pytest بيتأكد إن الملف القديم بيفضل سليم لو الكتابة فشلت: استخدم [[monkeypatch.setattr(os, "replace", ...)]] بدالة بترمي [[OSError]]، واتأكد كمان إن مفيش [[.tmp]] فاضل.`, done: R`[[pytest -q]] بيقول [[2 passed]] (اختبار النجاح واختبار الفشل)، ولو شلت سطر [[unlink]] من [[except]] اختبار الـ [[.tmp]] بيقع.` },
            { lvl: 'تحدي', t: R`**الفرق بين الأنظمة:** على ويندوز، افتح [[cfg.json]] بـ [[open]] وسيبه مفتوح، وجرّب [[write_atomic]] عليه. وبعدين في [[docker run --rm python:3.13-slim]] جرّب نفس الحاجة. وبعدين ملف read-only جوه فولدر وجرّب [[rmtree]] في الاتنين.`, done: R`ويندوز: [[PermissionError]] ([[WinError 5]]) في الحالتين، ولينكس: الاتنين عدّوا. وكتبت [[onexc]] بتشيل الـ read-only وتعيد المسح على ويندوز، و [[retry]] صغير لـ [[os.replace]] لو الملف مفتوح ثواني.` },
          ],
          deep: {
            why: R`أشهر سبب إن أداة «متقومش تاني» هو ملف إعدادات أو state اتكتب نصه: البرنامج وقع، أو اتعمله kill، أو الديسك اتملا وهو بيكتب. والكتابة الآمنة سطرين زيادة. و [[rmtree]] و [[move]] أخطر أمرين في أي سكربت تنضيف، ولازم تعرف بيعملوا إيه بالظبط قبل ما تشغّلهم على مسار جاي من argument.`,
            how: R`[[tempfile.mkstemp]] بيعمل ملف باسم عشوائي **مش موجود قبل كده** (فمفيش سكربتين يتصادموا) وبيرجّع file descriptor (رقم بيمثّل الملف المفتوح عند النظام) والمسار. و [[dir=path.parent]] مهم: الملف المؤقت لازم يبقى على **نفس الديسك**، لأن [[os.replace]] بين ديسكين مش atomic وممكن يرمي [[OSError]] (cross-device link) على لينكس.

[[os.fdopen(fd, "w", ...)]] بيحوّل الرقم لـ file object عادي. و [[flush()]] بيبعت اللي في buffer بتاع Python للنظام، و [[os.fsync]] بيطلب من النظام يكتبه على الديسك فعلًا مش يسيبه في الكاش، فلو الكهربا قطعت بعد [[replace]] الداتا موجودة.

[[os.replace(src, dst)]] بيغيّر الاسم ويكتب فوق [[dst]] في عملية واحدة (على لينكس [[rename]] atomic بالمعايير، وعلى ويندوز [[MoveFileEx]] بـ replace)، يعني أي حد بيقرا الملف هيلاقي القديم كامل أو الجديد كامل. وعلى ويندوز بيرمي [[PermissionError]] لو برنامج تاني فاتح الملف (اتجرّب: [[WinError 5]])، وعلى لينكس بيعدّي.

[[except BaseException]] (مش [[Exception]]) عشان حتى [[KeyboardInterrupt]] (Ctrl+C) يمسح الملف المؤقت، وبعدين [[raise]] من غير حاجة بيرمي نفس الخطأ تاني فاللي نادى يعرف.

[[shutil.copy]] بينسخ المحتوى والصلاحيات بس، و [[copy2]] بينسخ كمان وقت التعديل (اتجرّب: [[copy]] غيّر الـ mtime و [[copy2]] حافظ عليه)، وده بيفرق في أدوات مزامنة بتقارن بالوقت. و [[copytree]] بيرمي [[FileExistsError]] لو الوجهة موجودة إلا مع [[dirs_exist_ok=True]] (3.8+). و [[move]] بيعمل [[rename]] لو نفس الديسك، وإلا copy وبعدين delete.

[[rmtree]] على ويندوز بيقع على ملف read-only بـ [[PermissionError]] (اتجرّب)، وعلى لينكس بيمسحه عادي لأن المسح بيعتمد على صلاحية الفولدر مش الملف. و [[onexc]] (3.12+، بدل [[onerror]] القديم) دالة بتتنادى على كل فشل، فتقدر تشيل الـ read-only وتعيد.`,
            when: R`[[write_atomic]] لأي ملف البرنامج بيعتمد عليه عشان يقوم (إعدادات، state، cache index، lock). و [[TemporaryDirectory]] في كل اختبار أو سكربت بيحتاج يجهّز ملفات ويرميها (و pytest عنده [[tmp_path]] جاهز). و [[rmtree]] بس على مسار انت عامله أو اتأكدت منه.`,
            mistakes: R`[[rmtree(Path(arg))]] على argument من غير فحص: [[arg]] فاضي يبقى [[Path("")]] = الفولدر الحالي. و الملف المؤقت في [[/tmp]] والهدف على ديسك تاني فـ [[os.replace]] بيقع. و [[NamedTemporaryFile]] بتفتحه تاني على ويندوز وهو لسه مفتوح ([[PermissionError]]؛ استخدم [[delete_on_close=False]] من 3.12 أو [[mkstemp]]). و [[make_archive("backup.zip", ...)]] بيعمل [[backup.zip.zip]] لأنه بيزوّد الامتداد لوحده.`
          },
          teach: R`## المثال بيعمل إيه؟

بيشتغل جوه فولدر مؤقت بيتمسح لوحده في الآخر، فمش هيلمس أي حاجة على جهازك: بيكتب ملف JSON بطريقة آمنة، وبعدين ينسخ وينقل ويعمل zip ويمسح فولدرات، ويطبع المساحة الفاضية. اتشغّل بـ Python 3.14 على ويندوز ١١، وحالات الفشل اتجرّبت كمان في [[python:3.13-slim]] بيوزر عادي ([[-u nobody]]).

---

## ١. ليه [[open(p, "w")]] مش آمن

~~~python
p.write_text('{"ok": true}', encoding="utf-8")
try:
    with open(p, "w", encoding="utf-8") as f:
        f.write(bad_text())
except Boom: pass
print("naive:", repr(p.read_text(encoding="utf-8")))
~~~

~~~text الناتج (اتشغّل فعلًا)
naive: ''
~~~

[[bad_text()]] بترمي قبل ما حاجة تتكتب (كأن الديسك اتملا أو البرنامج وقع وهو بيجهز الداتا). بس [[open(p, "w")]] كان **فضّى الملف خلاص** أول ما اتفتح. النتيجة ملف فاضي، والبرنامج المرة الجاية هيقرا [['']] و [[json.loads]] هترمي [[JSONDecodeError]] ومش هيقوم.

---

## ٢. [[write_atomic]]: الكتابة الآمنة

~~~python
def write_atomic(path: Path, text: str) -> None:
    fd, tmp = tempfile.mkstemp(dir=path.parent, prefix=path.name, suffix=".tmp")
    try:
        with os.fdopen(fd, "w", encoding="utf-8", newline="") as f:
            f.write(text)
            f.flush()
            os.fsync(f.fileno())
        os.replace(tmp, path)
    except BaseException:
        Path(tmp).unlink(missing_ok=True)
        raise
~~~

| الخطوة | بتعمل إيه | ليه |
|---|---|---|
| [[mkstemp(dir=path.parent, ...)]] | ملف جديد باسم عشوائي زي [[orders.json8k2j.tmp]] جنب الأصلي | نفس الديسك عشان [[replace]] يبقى atomic، واسم عشوائي عشان سكربتين ميكتبوش في نفس المؤقت |
| [[os.fdopen(fd, "w", encoding=..., newline="")]] | بيفتح الملف المؤقت للكتابة كـ file object | [[mkstemp]] بيرجّع رقم (file descriptor) مش object، و [[newline=""]] عشان [[\n]] تفضل [[\n]] على ويندوز |
| [[f.flush()]] ثم [[os.fsync]] | من buffer بتاع Python للنظام، ومن النظام للديسك | من غيرهم الداتا ممكن تبقى في الذاكرة لسه لما الكهربا تقطع |
| [[os.replace(tmp, path)]] | المؤقت ياخد اسم الأصلي ويكتب فوقه في خطوة واحدة | اللي بيقرا يلاقي القديم كامل أو الجديد كامل، مفيش حاجة في النص |
| [[except BaseException]] + [[unlink]] + [[raise]] | لو أي حاجة فشلت (حتى Ctrl+C) امسح المؤقت وارمي نفس الخطأ | متسيبش ملفات [[.tmp]] متكوّمة، واللي نادى يعرف إن الحفظ فشل |

ونفس التجربة بيها:

~~~text الناتج: write_atomic(p, bad_text())
atomic: '{"ok": true}' ['cfg.json']
~~~

الملف القديم سليم، ومفيش [[.tmp]] فاضل في الفولدر.

---

## ٣. [[TemporaryDirectory]]

~~~python
with tempfile.TemporaryDirectory(prefix="shop-") as d:
    root = Path(d)
~~~

- بيعمل فولدر جديد في فولدر المؤقت بتاع النظام ([[%TEMP%]] على ويندوز، [[/tmp]] على لينكس) باسم زي [[shop-x8f2k1a]]. و [[d]] string، فبنحوّله [[Path]].
- لما الـ [[with]] يخلص (حتى لو حصل exception) الفولدر **وكل اللي فيه** بيتمسح. عشان كده آخر سطر في المثال [[print(root.exists())]] بيطبع [[False]].

---

## ٤. النسخ والنقل

~~~python
shutil.copy2(src / "orders.json", root / "orders.bak")
shutil.copytree(src, root / "backup" / "data", dirs_exist_ok=True)
shutil.move(root / "orders.bak", root / "backup" / "orders.bak")
print(sorted(p.relative_to(root).as_posix() for p in root.rglob("*")))
~~~

~~~text الناتج
['backup', 'backup/data', 'backup/data/orders.json', 'backup/orders.bak', 'data', 'data/orders.json']
~~~

- [[copy2]] بينسخ المحتوى ووقت التعديل. و [[copy]] بينسخ المحتوى والصلاحيات بس: جرّبت ملف تاريخه ٢٠٠١، [[copy]] خلى النسخة بتاريخ النهارده و [[copy2]] حافظ على ٢٠٠١.
- [[copytree]] بيعمل [[backup]] و [[backup/data]] لوحده (زي [[parents=True]]). و [[dirs_exist_ok=True]] عشان التشغيل التاني ميرميش [[FileExistsError]].
- [[move]] بيشيل [[orders.bak]] من مكانه. على نفس الديسك ده [[rename]] سريع، وبين ديسكين بينسخ ويمسح.
- [[as_posix()]] عشان المسارات تطبع بـ [[/]] على ويندوز كمان.

---

## ٥. zip والمسح والمساحة

~~~python
archive = shutil.make_archive(str(root / "backup"), "zip", root / "backup")
print(Path(archive).name, Path(archive).stat().st_size > 0)
shutil.rmtree(root / "backup")
print((root / "backup").exists())
total, used, free = shutil.disk_usage(root)
print(f"free: {free // 2**30} GiB")
~~~

~~~text الناتج
backup.zip True
False
free: 32 GiB
~~~

- [[make_archive(base, "zip", root_dir)]]: [[base]] الاسم **من غير امتداد** (بيزوّد [[.zip]] لوحده)، و [[root_dir]] الفولدر اللي جواه هيتضغط. ورجّع المسار الكامل للـ zip.
- [[rmtree]] مسح [[backup]] بكل اللي فيه، **من غير سلة مهملات ومن غير تأكيد**. على مسار انت عامله بس.
- [[disk_usage]] بيرجّع tuple (الكلي، المستخدم، الفاضي) بالبايت، و [[// 2**30]] قسمة صحيحة على جيجا. رقم المساحة على جهازك هيختلف.

---

## ٦. ويندوز ولينكس مش زي بعض

| الحالة | ويندوز ١١ (3.14) | لينكس ([[python:3.13-slim]] بيوزر عادي) |
|---|---|---|
| [[os.replace]] على ملف برنامج تاني فاتحه | [[PermissionError: [WinError 5] Access is denied]] | بيعدّي، واللي فاتحه بيكمّل يقرا النسخة القديمة |
| [[rmtree]] على فولدر فيه ملف read-only | [[PermissionError]]، ولازم [[onexc]] تشيل الـ read-only | بيعدّي، المسح بيعتمد على صلاحية الفولدر |
| [[Path.rename]] على اسم موجود | [[FileExistsError]] | بيكتب فوقه |

والحل لـ read-only على ويندوز:

~~~python
def onexc(func, path, exc):
    os.chmod(path, stat.S_IWRITE)
    func(path)
shutil.rmtree(ro, onexc=onexc)
~~~

[[func]] الدالة اللي فشلت ([[os.unlink]] مثلًا)، و [[path]] المسار، و [[exc]] الخطأ. بنشيل الـ read-only ونعيد نفس الدالة. ([[onexc]] من 3.12؛ الكود القديم بيستخدم [[onerror]] بشكل مختلف.)

---

## ٧. الحل: باك أب بيلف على آخر ٣

~~~text الناتج (اتشغّل فعلًا)
['settings.json', 'settings.json.1', 'settings.json.2', 'settings.json.3']
[5, 4, 3, 2]
~~~

٥ مرات حفظ، والنتيجة الحالي (٥) و ٣ باك أب (٤ و ٣ و ٢)، والنسخة ١ اتمسحت لما [[os.replace]] كتب فوق [[.3]].

---

## الخلاصة

- [[open(p, "w")]] بيفضّي الملف الأول؛ للملفات المهمة: مؤقت جنبه + [[fsync]] + [[os.replace]].
- [[TemporaryDirectory]] للشغل المؤقت والاختبارات، وبيتمسح حتى لو حصل exception.
- [[copy2]] بالتاريخ، و [[copytree(..., dirs_exist_ok=True)]] للتشغيل المتكرر، و [[make_archive]] من غير امتداد في الاسم.
- [[rmtree]] من غير رجعة، وعلى ويندوز read-only محتاج [[onexc]]، والملف المفتوح بيمنع [[replace]].`,
          lines: [
            R`[[json]] عشان نحوّل dict لنص JSON قبل الكتابة. الدرس الجاي ([[csv و json]]) بيشرحه بالتفصيل.`,
            R`[[os]] فيه الحاجات اللي بتكلّم النظام مباشرة: [[os.replace]] و [[os.fsync]] و [[os.fdopen]]. [[pathlib]] مفيهوش [[fsync]].`,
            R`[[shutil]] (shell utilities) للعمليات على فولدرات كاملة: نسخ ونقل ومسح وضغط ومساحة الديسك.`,
            R`[[tempfile]] بيعمل ملفات وفولدرات مؤقتة بأسامي عشوائية مش هتتصادم مع حاجة موجودة، وبيعرف فولدر المؤقت بتاع كل نظام.`,
            R`[[Path]] من الدرس اللي فات، لكل المسارات.`,
            R`[[write_atomic]] بتاخد المسار والنص وبتضمن إن الملف عمره ما هيبقى نصه مكتوب: يا القديم كامل يا الجديد كامل. [[-> None]] لأنها بتكتب بس.`,
            R`[[mkstemp]] بيعمل ملف فاضي **جديد** وبيرجّع اتنين: [[fd]] (رقم الملف المفتوح عند النظام) و [[tmp]] (مساره). [[dir=path.parent]] بيحطه جنب الملف الأصلي على نفس الديسك، و [[prefix]] و [[suffix]] بيخلّوا اسمه زي [[orders.json8k2j.tmp]] فتعرف هو تبع مين لو لقيته.`,
            R`[[try]] عشان لو أي خطوة جوه فشلت نروح للـ [[except]] نمسح المؤقت. من غيره كل فشل بيسيب ملف [[.tmp]] في الفولدر.`,
            R`[[os.fdopen]] بيحوّل الرقم [[fd]] لـ file object عادي تكتب فيه بـ [[write]]. [[encoding="utf-8"]] للعربي، و [[newline=""]] عشان Python ميحوّلش [[\n]] لـ [[\r\n]] على ويندوز. والـ [[with]] بيقفل الملف في الآخر.`,
            R`بيكتب النص كله في الملف **المؤقت**. الملف الأصلي لسه زي ما هو تمامًا، فلو حصل أي حاجة هنا محدش خسر حاجة.`,
            R`[[flush()]] بيفضّي الـ buffer بتاع Python ويبعت اللي فيه للنظام. من غيره جزء من النص ممكن يبقى لسه في ذاكرة البرنامج.`,
            R`[[os.fsync]] بيطلب من النظام يكتب الملف على الديسك فعلًا مش يسيبه في كاش الذاكرة. [[f.fileno()]] بيرجّع رقم الملف اللي [[fsync]] محتاجاه. ده اللي بيحمي من قطع الكهربا بعد [[replace]].`,
            R`[[os.replace]] بيدّي المؤقت اسم الأصلي ويكتب فوقه في عملية واحدة. هي اللحظة الوحيدة اللي الملف بيتغيّر فيها، وبتحصل كلها أو مبتحصلش خالص. على ويندوز بترمي [[PermissionError]] لو برنامج تاني فاتح الملف.`,
            R`[[BaseException]] بيمسك كل حاجة حتى [[KeyboardInterrupt]] (Ctrl+C) و [[SystemExit]]، مش [[Exception]] بس، عشان المؤقت يتمسح في أي حالة.`,
            R`بيمسح الملف المؤقت. [[missing_ok=True]] لأن لو [[replace]] كانت نجحت قبل ما يحصل الخطأ، المؤقت مبقاش موجود باسمه.`,
            R`[[raise]] من غير حاجة بعدها بيرمي **نفس** الخطأ تاني. احنا نضّفنا بس، والقرار للي نادى: يطبع رسالة، أو يحاول تاني.`,
            R`[[TemporaryDirectory]] بيعمل فولدر مؤقت اسمه بيبدأ بـ [[shop-]] في [[%TEMP%]] أو [[/tmp]]، و [[d]] مساره كـ string. ولما الـ [[with]] يخلص بيتمسح بكل اللي فيه، حتى لو حصل exception.`,
            R`بنحوّل المسار لـ [[Path]] عشان نستخدم [[/]] و [[rglob]] عليه.`,
            R`مسار فولدر [[data]] جوه الفولدر المؤقت. لسه مش موجود على الديسك.`,
            R`[[mkdir()]] من غير [[parents]] كفاية هنا لأن [[root]] موجود. ده المصدر اللي هننسخه.`,
            R`ملف JSON قديم فيه [[count: 1]]، عشان نشوف [[write_atomic]] بتبدّله. العلامات المفردة حوالين النص عشان الـ JSON جواه فيه علامات مزدوجة.`,
            R`[[json.dumps]] بيحوّل الـ dict لنص JSON، و [[write_atomic]] بتكتبه فوق القديم بالطريقة الآمنة.`,
            R`بيطبع [[{"count": 2}]]: الملف اتبدّل بالنسخة الجديدة كاملة.`,
            R`[[copy2]] بينسخ ملف واحد ومعاه وقت التعديل. الوجهة هنا اسم ملف، ولو كانت فولدر موجود كان هيحط النسخة جواه بنفس الاسم.`,
            R`[[copytree]] بينسخ الفولدر بكل اللي فيه، وبيعمل [[backup]] و [[backup/data]] لو مش موجودين. [[dirs_exist_ok=True]] بيخليه يكمّل لو الوجهة موجودة بدل [[FileExistsError]]، فالسكربت ينفع يتشغّل كل يوم.`,
            R`[[move]] بينقل [[orders.bak]] جوه [[backup]]. بعده الملف مبقاش موجود في مكانه القديم.`,
            R`[[rglob("*")]] كل حاجة تحت [[root]]، و [[relative_to]] يشيل المسار المؤقت الطويل، و [[as_posix()]] يطبع بـ [[/]] حتى على ويندوز، و [[sorted]] عشان الترتيب ثابت. الناتج ٦ مسارات.`,
            R`[[make_archive]] بياخد الاسم من غير امتداد ([[backup]]) ويزوّد [[.zip]] لوحده، و [[root_dir]] الفولدر اللي هيتضغط محتواه. بيرجّع المسار الكامل للـ zip. [[str(...)]] لأن الباراميتر الأول اسم مش [[Path]].`,
            R`بيطبع [[backup.zip True]]: الاسم، والحجم أكبر من صفر يعني فيه محتوى.`,
            R`[[rmtree]] بيمسح الفولدر بكل اللي فيه، من غير تأكيد ومن غير سلة مهملات. على ويندوز بيقع لو فيه ملف read-only (قسم ٦).`,
            R`بيطبع [[False]]: الفولدر اتمسح فعلًا.`,
            R`[[disk_usage]] بيرجّع ٣ أرقام بالبايت (الكلي، المستخدم، الفاضي) للديسك اللي عليه المسار ده، وبنفكهم في ٣ أسامي.`,
            R`[[2**30]] = جيجا بايت (١٠٧٣٧٤١٨٢٤)، و [[//]] قسمة من غير كسور. على الجهاز اللي اتجرّب عليه [[free: 32 GiB]]، وعندك هيطلع رقم تاني.`,
            R`برّه الـ [[with]]: الفولدر المؤقت اتمسح لوحده، فبيطبع [[False]]. ولا ملف من اللي فوق فاضل على الجهاز.`,
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
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** من غير ما تبص، اكتب: الفرق بين [[dumps]] و [[dump]] و [[loads]] و [[load]]، وليه [[newline=""]] مع [[csv]]، وإيه اللي [[ensure_ascii=False]] و [[indent]] و [[default=str]] بيعملوه، وأنواع JSON الست ومقابلها في Python.`, done: R`كل إجابة فيها مثال جربته في الـ REPL، منهم [[json.dumps("سارة")]] (اللي بتطلع [["\u0633..."]] من غير [[ensure_ascii=False]]) و [[json.loads("[1, 2.5, true, null]")]].` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** إيه ناتج [[json.loads(json.dumps({1: (1, 2), "d": None}))]]؟ وإيه ناتج [[json.dumps({"x": {1, 2}})]]؟ اكتبهم قبل ما تشغّل.`, done: R`الأول [[{'1': [1, 2], 'd': None}]] (المفتاح بقى string والـ tuple بقت list)، والتاني [[TypeError: Object of type set is not JSON serializable]]، وطابقوا التشغيل.` },
            { lvl: 'تطبيق', t: R`**صلّح:** الكود ده [[for line in open("orders.csv"): id, name, city, total = line.split(",")]] بيقع على صف [["Ali, Jr."]] وبيطبع إجمالي غلط. اكتب السبب بالظبط (رسالة الخطأ)، وصلّحه بـ [[csv.DictReader]] و [[newline=""]] و [[encoding]].`, done: R`قبل التصليح الرسالة [[ValueError: too many values to unpack (expected 4, got 5)]]، وبعده كل الصفوف بتتقري و [[Ali, Jr.]] اسم واحد، و [[total]] اتحوّل [[float]] والإجمالي صح.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** ملف [[events.jsonl]] فيه ١٠ سطور ([[{"ts": "...", "user": "...", "action": "login"}]]) منهم سطر بايظ (JSON ناقص قوس) وسطر فاضي. اقراه سطر سطر وطلّع عدد كل [[action]] لكل يوزر، واكتب السطور البايظة برقمها في [[errors.log]].`, done: R`الملخص فيه كل اليوزرز وعدد كل action صح، والسطر البايظ في [[errors.log]] برقمه ورسالة [[JSONDecodeError]] (زي [[Expecting ',' delimiter]])، والسطر الفاضي اتساب من غير ما يتحسب خطأ، والبرنامج مقفش.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[csv2json.py IN OUT]] بيحوّل CSV لـ JSON: بيكتشف الفاصل بـ [[Sniffer]]، ويقرا بـ [[utf-8-sig]]، ويحوّل أي خانة شكلها رقم لـ [[int]] أو [[float]]، والخانة الفاضية [[None]]، ويكتب بـ [[ensure_ascii=False]] و [[indent=2]].`, done: R`ملف بـ [[,]] وملف بـ [[;]] وملف من Excel (BOM) التلاتة بيطلعوا JSON صح بعناوين نضيفة، و [[""]] بقت [[null]]، و [[007]] (كود) بقت ... (قررت وكتبت ليه: رقم ولا نص)، والعربي مقروء في الملف.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** اعمل CSV مليون صف، وقيس بـ [[tracemalloc]] و [[time.perf_counter]]: (١) [[list(DictReader)]] (٢) لفة على [[DictReader]] (٣) لفة على [[csv.reader]] (lists مش dicts). اطلع إجمالي عمود في كل واحدة.`, done: R`جدول بـ ٦ أرقام (ذاكرة ووقت لكل طريقة) من جهازك، والإجمالي واحد في التلاتة، وكاتب أنهي أسرع وأنهي أخف وبكام مرة، و [[csv.reader]] أسرع من [[DictReader]] في القياس بتاعك (أو كاتب ليه لأ).` },
          ],
          deep: {
            why: R`«العميل بعت Excel، حمّله في النظام» و «طلّع تقرير CSV للمحاسب» و «حوّل ملف JSON من API قديم»: من أكتر المهام اللي هتتطلب منك، وأغلبها سكربت ٢٠ سطر لو عارف الـ csv و json صح، وساعات كتير ضايعة لو بتقسّم بـ split بإيدك.`,
            how: R`[[newline=""]] لأن الـ csv module بيتعامل مع نهايات السطور بنفسه (وبيكتب [[\r\n]] افتراضيًا زي المعيار)، ومن غيره هتلاقي سطور فاضية بين الصفوف على ويندوز، والقيم اللي فيها newline تبوظ. و Excel بيحب [[encoding="utf-8-sig"]] (فيه BOM) عشان يفتح العربي صح؛ لو الملف جاي من Excel وأول عمود اسمه [[\ufeffid]]، ده السبب.

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
| object [[{}]] | dict، والمفاتيح **لازم** strings: [[json.dumps({1: "a"})]] بتطلّع [[{"1": "a"}]] ولما ترجع المفتاح بقى [["1"]] |
| array [[[]]] | list، و tuple بتتكتب array وبترجع list |
| string | str |
| number | int لو مفيش كسور، و float لو فيه |
| [[true]] / [[false]] / [[null]] | [[True]] / [[False]] / [[None]]، بحروف صغيرة في JSON |

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

## ١٠. ملف كبير: سطر سطر من غير ما تحمّله كله

[[list(csv.DictReader(f))]] بيحط الملف كله في الذاكرة كـ dicts، والـ dict أكبر بكتير من السطر. قيست ملف ٢٠٠ ألف صف:

~~~python
tracemalloc.start()
with open(p, newline="", encoding="utf-8") as f:
    rows = list(csv.DictReader(f))
total = sum(int(r["total"]) for r in rows)
print("list:", round(tracemalloc.get_traced_memory()[1] / 2**20, 1), "MB peak")
tracemalloc.stop(); del rows
tracemalloc.start()
with open(p, newline="", encoding="utf-8") as f:
    total2 = sum(int(r["total"]) for r in csv.DictReader(f))
print("stream:", round(tracemalloc.get_traced_memory()[1] / 2**20, 2), "MB peak", total == total2)
~~~

~~~text الناتج (اتشغّل فعلًا، Python 3.14)
3.2 MB on disk
list: 62.7 MB peak
stream: 0.17 MB peak True
~~~

- ملف ٣.٢ ميجا على الديسك بقى **٦٢.٧ ميجا** في الذاكرة كـ list of dicts (حوالي ٢٠ ضعف). ملف ١ جيجا بنفس الطريقة كان هيحتاج حوالي ٢٠ جيجا رام.
- [[sum(... for r in csv.DictReader(f))]] بيقرا صف، يجمعه، ويرميه، فالذاكرة فضلت أقل من ربع ميجا، ونفس الإجمالي ([[True]]).
- القاعدة: لو هتعدّي على الداتا مرة واحدة (جمع، فلتر، كتابة لملف تاني)، لف جوه الـ [[with]]. ولو محتاج ترتّب أو تقارن بين صفوف بعيدة عن بعض، حمّل اللي محتاجه بس (عمودين مش الكل).

---

## ١١. فاصل [[;]] و [[Sniffer]]

Excel في إعدادات لغات كتير (منها اللي الفاصلة العشرية فيها [[,]]) بيحفظ CSV بـ [[;]]:

~~~python
p.write_text("id;name;total\n1;سارة;150,5\n", encoding="utf-8")
with open(p, newline="", encoding="utf-8") as f:
    print(list(csv.DictReader(f, delimiter=";")))
with open(p, newline="", encoding="utf-8") as f:
    print(csv.Sniffer().sniff(f.read(1024)).delimiter)
~~~

~~~text الناتج
[{'id': '1', 'name': 'سارة', 'total': '150,5'}]
;
~~~

- [[delimiter=";"]] بيقول للـ reader الفاصل إيه. من غيره كل سطر كان هيبقى خانة واحدة اسمها [[id;name;total]].
- [[Sniffer().sniff(sample)]] بيخمّن الفاصل من أول ١٠٢٤ حرف. مفيد لملفات جاية من ناس مختلفة، بس خمين: اتأكد من النتيجة.
- و [[150,5]] لسه نص فيه فاصلة عشرية. [[float("150,5")]] بترمي [[ValueError]]؛ لازم [[replace(",", ".")]] الأول.

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
            R`[[csv]] موديول المكتبة القياسية لقراية وكتابة CSV صح: بيفهم الفاصلة جوه علامات تنصيص، والسطر الجديد جوه خانة، ونهايات السطور [[\r\n]]. ده كله اللي [[line.split(",")]] بإيدك بيبوّظه.`,
            R`[[json]] للتحويل بين Python و JSON: [[dumps]] و [[loads]] للنصوص، و [[dump]] و [[load]] لملفات مفتوحة. مفيش حاجة تتسطّب.`,
            R`[[date]] عشان نوري إن JSON مبيعرفش التواريخ لوحده (آخر سطرين في المثال) ونصلّحها بـ [[default=str]].`,
            R`[[Path]] لـ [[write_text]] و [[read_text]] في سطر واحد بدل [[with open]] كاملة لما بتكتب أو بتقرا الملف كله مرة واحدة.`,
            R`[[newline=""]] بيسيب نهايات السطور للـ csv module، ومن غيره قيمة فيها سطر جديد جوه التنصيص ممكن تتقري غلط. و [[encoding="utf-8"]] للعربي (ولو الملف جاي من Excel استخدم [[utf-8-sig]]، درس pathlib). والـ [[with]] بيقفل الملف لوحده.`,
            R`[[DictReader]] بيقرا أول سطر كأسماء أعمدة، وكل سطر بعده dict بالأسماء دي. و [[list(...)]] بيقرا الكل **دلوقتي**، لأن الـ reader بيقرا وقت ما تطلب، وبعد الـ [[with]] الملف هيتقفل. لملف كبير لف عليه جوه الـ [[with]] بدل [[list]] (قسم «ملف كبير» في الشرح).`,
            R`بيطبع الصف التالت: [[Ali, Jr.]] اتقري خانة واحدة رغم الفاصلة، لأن الملف حاطط الاسم بين علامات تنصيص. و**كل** القيم strings ([['3']] و [['45']]): CSV مفيهوش أنواع.`,
            R`بنلف على الصفوف عشان نحوّل الأنواع بإيدنا. [[r]] dict، والتعديل عليه بيعدّل الصف جوه [[rows]] نفسها (نفس الـ object).`,
            R`[[int(r["id"])]] بيحوّل الـ id لرقم. لو الخانة فاضية أو فيها حروف بيرمي [[ValueError: invalid literal for int() with base 10: '']]؛ في داتا حقيقية لف السطر ده بـ [[try]] وسجّل رقم الصف.`,
            R`[[float]] للإجمالي عشان فيه كسور ([[150.5]]). من غير التحويل [["150.5" + "45"]] هتبقى [["150.545"]] (لزق strings) مش جمع. ولو فلوس حقيقية: [[Decimal]] أو قروش [[int]].`,
            R`[[json.dumps]] بيحوّل الليستة لنص JSON. [[ensure_ascii=False]] بيكتب العربي زي ما هو بدل [[\u0633\u0627...]]، و [[indent=2]] بيعمل مسافتين لكل مستوى عشان الملف يتقري. و [[write_text]] بيكتبه بـ UTF-8.`,
            R`[[json.loads]] (load string) بيحوّل النص لـ list of dicts تاني. والأرقام رجعت أرقام ([[3]] مش [['3']]) لأن JSON بيعرف الأنواع، عكس CSV.`,
            R`list comprehension بيفلتر الطلبات اللي مدينتها القاهرة بالظبط. [[==]] بيقارن حرف حرف، فـ [[" Cairo"]] (بمسافة) مش هتطابق؛ نضّف بـ [[strip()]] وقت القراية لو الداتا جاية من بني آدمين.`,
            R`[[open(..., "w", newline="")]] للكتابة. [[newline=""]] هنا أهم من القراية: من غيرها على ويندوز كل سطر بيتكتب [[\r\r\n]] وExcel بيعرض سطر فاضي بين كل صفين.`,
            R`[[DictWriter]] بيكتب dicts كصفوف. [[fieldnames]] الأعمدة وترتيبها في الملف. و [[extrasaction="ignore"]] بيتجاهل أي مفتاح زيادة في الـ dict ([[city]] هنا)؛ ومن غيره الافتراضي [[raise]] وبيرمي [[ValueError: dict contains fields not in fieldnames: 'city']].`,
            R`[[writeheader()]] بيكتب سطر العناوين ([[id,name,total]]) من [[fieldnames]]. لو نسيته الملف هيبقى من غير أسامي أعمدة و [[DictReader]] هيعتبر أول طلب هو العناوين.`,
            R`[[writerows]] بيكتب كل الصفوف مرة واحدة، وبيحط علامات تنصيص لوحده حوالين [[Ali, Jr.]] عشان الفاصلة متتلخبطش.`,
            R`ملف JSON Lines ([[.jsonl]]): كل سطر object JSON كامل لوحده. شكل اللوج والأحداث، لأنك بتزوّد سطر من غير ما تقرا الملف كله، وملف بايظ في آخر سطر مبيبوّظش الباقي.`,
            R`بنلف على الطلبات ونكتب سطر لكل واحد. مع ملف [[.jsonl]] حقيقي كبير، القراية كمان سطر سطر بـ [[for line in f: json.loads(line)]].`,
            R`[[json.dumps]] من غير [[indent]] عشان الـ object كله يبقى في سطر واحد، و [[+ "\n"]] بيقفل السطر. لو [[indent]] اتحط، الـ object هيتقسم على كذا سطر والملف مبقاش JSON Lines.`,
            R`dict فيه [[date]]: نوع Python مالوش مقابل في JSON (JSON فيه نصوص وأرقام و true/false/null وبس).`,
            R`[[default=str]] بيتنادى على أي قيمة [[json]] مش عارفها، و [[str(date)]] بيدّي ISO [[2026-09-29]]. الناتج [[{"day": "2026-09-29", "count": 3}]]. ولما تقرا، التاريخ هيرجع string ومحتاج [[date.fromisoformat]].`,
            R`من غير [[default]]: [[TypeError: Object of type date is not JSON serializable]]. ونفس الخطأ مع [[datetime]] و [[Decimal]] و [[set]] و objects بتاعتك.`,
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
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** من الذاكرة: الفرق بين naive و aware وإزاي تعرف ده من ده، وأنهي واحد بتخزّنه، وإيه اللي [[astimezone]] بتعمله بالظبط (بتغيّر اللحظة ولا العرض؟)، وإزاي تقرا [["2026-09-29T10:00:00Z"]].`, done: R`كاتب: aware فيه [[tzinfo]] و naive [[None]]، وتخزّن aware UTC، و [[astimezone]] نفس اللحظة بعرض تاني ([[a == a.astimezone(CAIRO)]] بـ [[True]] جربتها)، و [[fromisoformat]] بيقرا الـ [[Z]] من 3.11.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** طلب اتعمل [[datetime(2026, 7, 31, 22, 15, tzinfo=UTC)]]. هيظهر في تقرير القاهرة يوم كام وساعة كام؟ وفي شهر إيه؟ وطلب [[datetime(2026, 12, 31, 22, 15, tzinfo=UTC)]]؟`, done: R`الأول [[2026-08-01 01:15]] (أغسطس مش يوليو، +3 صيفي)، والتاني [[2027-01-01 00:15]] (سنة جديدة، +2 شتوي)، وشغّلتهم وطابقوا، وكاتب ليه التقرير الشهري لازم يتحسب بحدود الشهر في القاهرة.` },
            { lvl: 'تطبيق', t: R`**صلّح:** دالة [[is_expired(token_created)]] فيها [[return datetime.now() - token_created > timedelta(hours=24)]] و [[token_created]] جاي من الداتابيز aware بـ UTC. بترمي إيه؟ صلّحها، وبعدين اكتب نسخة بتحسب بساعة القاهرة وجرّبها على توكن اتعمل ١٢ الضهر يوم ٢٩ أكتوبر: انتهى الساعة كام بالحيطة؟`, done: R`الأصلية بترمي [[TypeError: can't subtract offset-naive and offset-aware datetimes]]، والمصلّحة بـ [[datetime.now(UTC)]]، والتوكن ده بينتهي [[11:00]] بساعة القاهرة يوم ٣٠ (مش ١٢)، وكاتب ليه.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** لستة ١٠ طلبات بأوقات UTC (كـ ISO strings بـ [[Z]]) حوالين نص الليل وحوالين ليلة ٢٩/٣٠ أكتوبر. اكتب [[daily_report(orders, tz)]] بترجّع dict من التاريخ المحلي لعدد الطلبات ومجموعها، وجرّبها بـ [[Africa/Cairo]] و [[UTC]] و [[Asia/Riyadh]].`, done: R`نفس الطلبات بتتوزع على أيام مختلفة حسب المنطقة (وكاتب طلب واحد على الأقل يومه اتغيّر)، والمجموع الكلي واحد في التلاتة، والطلب اللي الساعة [[21:30Z]] يوم ٢٩ أكتوبر في يوم ٢٩ في القاهرة (الساعة [[23:30]] بعد الرجوع للشتوي).` },
            { lvl: 'تطبيق', t: R`**ابني:** [[parse_user_time(text, tz)]] بتقبل [["30/09/2026 21:30"]] و [["2026-09-30 21:30"]] و [["2026-09-30T18:30:00Z"]]، وترجّع aware UTC. لو النص من غير منطقة بتعتبره بـ [[tz]]، ولو الساعة مش موجودة (يوم الصيفي) بترمي [[ValueError]] بدل ما تنقلها بصمت.`, done: R`التلات أشكال بيرجعوا [[2026-09-30 18:30:00+00:00]]، و [["24/04/2026 00:30"]] بالقاهرة بترمي [[ValueError]] (اكتشفتها بإنك بتلف على UTC وترجع وتقارن الساعة)، ونص بايظ بيرمي [[ValueError]] برسالة فيها الأشكال المقبولة.` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** لـ [[daily_report]]، اكتب اختبارات pytest بـ [[@pytest.mark.parametrize]] لـ ٦ حالات: نص الليل بالظبط، ودقيقة قبله، وليلة رجوع الشتوي (الساعة المتكررة)، وأول يوم في الصيفي، ورأس السنة، ولستة فاضية.`, done: R`[[pytest -q]] بيقول [[6 passed]]، وكل حالة فيها التاريخ المتوقع مكتوب بإيدك مش محسوب بنفس الكود، ولو شلت [[astimezone(tz)]] من الدالة ٣ اختبارات على الأقل بيقعوا.` },
          ],
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

## ١٠. يوم تغيير الساعة: ساعة مش موجودة، وساعة بتتكرر

في ٢٠٢٦ مصر دخلت الصيفي يوم ٢٤ أبريل (الساعة ١٢ بالليل بقت ١)، ورجعت الشتوي ليلة ٢٩ على ٣٠ أكتوبر (الساعة ١٢ بالليل رجعت ١١). اتحسبت من [[tzdata]] 2026.4 بلف على الأيام ومقارنة [[utcoffset()]]:

~~~python
C = ZoneInfo("Africa/Cairo")
x = datetime(2026, 4, 24, 0, 30, tzinfo=C)
print(x, x.astimezone(UTC).astimezone(C))
y0 = datetime(2026, 10, 29, 23, 30, tzinfo=C)
y1 = y0.replace(fold=1)
print(y0.utcoffset(), y1.utcoffset(), y0.astimezone(UTC), y1.astimezone(UTC))
~~~

~~~text الناتج (Python 3.14 + tzdata 2026.4)
2026-04-24 00:30:00+02:00 2026-04-24 01:30:00+03:00
3:00:00 2:00:00 2026-10-29 20:30:00+00:00 2026-10-29 21:30:00+00:00
~~~

- [[00:30]] يوم ٢٤ أبريل **مش موجودة** (الساعة نطت من ١٢ لـ ١). Python مبيرميش error: بيفترض offset قبل التغيير (+2)، ولما تلف بيها على UTC وترجع تطلع [[01:30]]. يعني ميعاد اتحجز الساعة دي هيتنقل ساعة لوحده.
- [[23:30]] يوم ٢٩ أكتوبر **بتحصل مرتين**. [[fold=0]] (الافتراضي) = المرة الأولى (+3، [[20:30]] UTC)، و [[fold=1]] = التانية (+2، [[21:30]] UTC). لو سجّلت حدث بساعة محلية بس، مش هتعرف أنهي فيهم.
- وده بالظبط ليه بتخزّن UTC: في UTC مفيش ساعة ناقصة ولا متكررة.

### الحساب بساعة الحيطة مش بالوقت الحقيقي

~~~python
a = datetime(2026, 10, 29, 12, tzinfo=C)
print(a + timedelta(days=1), (a + timedelta(days=1)) - a)
print((a.astimezone(UTC) + timedelta(hours=24)).astimezone(C))
~~~

~~~text الناتج
2026-10-30 12:00:00+02:00 1 day, 0:00:00
2026-10-30 11:00:00+02:00
~~~

- [[+ timedelta(days=1)]] على datetime بمنطقة بيزوّد يوم **على الساعة اللي على الحيطة**: ١٢ الضهر بكرة. بس الوقت اللي عدّى فعلًا **٢٥ ساعة** (عشان الساعة رجعت)، والطرح بين اتنين في نفس المنطقة كدب وقال [[1 day]].
- لو محتاج مدة حقيقية (انتهاء توكن بعد ٢٤ ساعة، rate limit) احسب في UTC: طلعت [[11:00]] بساعة القاهرة.
- والقاعدة: «نفس الميعاد بكرة» (تذكير الساعة ٩ كل يوم) حسابه بالمنطقة المحلية، و «بعد ٢٤ ساعة» حسابه بـ UTC.

---

## ١١. من نص لتاريخ، ومن تاريخ لرقم

~~~python
print(datetime.strptime("29/09/2026 21:30", "%d/%m/%Y %H:%M"))
datetime.strptime("2026-09-29", "%d/%m/%Y")
~~~

~~~text الناتج
2026-09-29 21:30:00
ValueError: time data '2026-09-29' does not match format '%d/%m/%Y'
~~~

- [[strptime]] (string parse time) عكس [[strftime]]: بتاخد النص والشكل اللي هو مكتوب بيه. والناتج **naive** دايمًا؛ ضيف المنطقة بإيدك ([[.replace(tzinfo=CAIRO)]]) لو انت عارفها. ولو النص ISO، [[fromisoformat]] أسرع وأدق.
- [[timestamp()]] بيحوّل لثواني من ١ يناير ١٩٧٠ UTC: [[datetime(2026, 9, 29, 21, 30, tzinfo=UTC).timestamp()]] = [[1790717400.0]]، و [[datetime.fromtimestamp(ts, UTC)]] بترجّعه. **متنساش** [[UTC]] في [[fromtimestamp]]، وإلا بيرجع naive بساعة الجهاز.
- لقياس وقت عملية: [[time.monotonic()]] أو [[time.perf_counter()]] مش [[datetime.now()]]. ساعة الجهاز ممكن تتظبط (NTP) في نص القياس وترجع لورا، والـ monotonic عمرها ما بترجع.
- [[date(2026, 9, 29).weekday()]] بـ [[1]] (الاتنين صفر) و [[isoweekday()]] بـ [[2]] (الاتنين ١)، واليوم [[Tuesday]]. و [[calendar.monthrange(2026, 2)]] بترجّع [[(calendar.SUNDAY, 28)]] في 3.14 (أول يوم في الشهر، وعدد أيامه)؛ قبل 3.12 كان أول عنصر رقم [[6]]. و [[date(2026, 1, 31) + timedelta(days=30)]] بيدّي [[2026-03-02]] مش «آخر فبراير»، فالشهور محتاجة حساب بإيدك أو مكتبة.

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
            R`[[datetime]] تاريخ ووقت، و [[date]] تاريخ بس، و [[timedelta]] مدة (أيام وثواني) تجمعها أو تطرحها، و [[UTC]] (3.11+، نفس [[timezone.utc]]) المنطقة الزمنية العالمية اللي مفيهاش توقيت صيفي.`,
            R`[[ZoneInfo]] بيقرا قاعدة توقيتات IANA (اللي فيها كل تغييرات التوقيت الصيفي لكل بلد عبر السنين). على لينكس والماك من النظام، وعلى ويندوز من package اسمها [[tzdata]] (لو مش متسطّبة: [[ZoneInfoNotFoundError: 'No time zone found with key Africa/Cairo']]، والحل [[pip install tzdata]]).`,
            R`[[ZoneInfo("Africa/Cairo")]] بالاسم مش بالرقم ([[+2]])، لأن الاسم بيعرف إن مصر +2 في الشتا و +3 في الصيف (من 2023)، وتاريخ كل تغيير. اكتبها بحروف كبيرة في أول كل كلمة زي ما هي.`,
            R`[[datetime.now(UTC)]] الوقت دلوقتي **aware**: معاه المنطقة الزمنية. ده الشكل اللي تخزّنه في الداتابيز وتبعته في API، لأنه نفس اللحظة لأي حد في أي بلد.`,
            R`[[isoformat()]] بيطلّع ISO 8601: [[2026-09-29T09:15:00.123456+00:00]]. الـ [[T]] بين التاريخ والوقت، و [[+00:00]] المنطقة. ده الشكل اللي أي لغة تانية (JavaScript و Go و SQL) بتفهمه من غير غموض.`,
            R`[[datetime.now()]] من غير منطقة = **naive**: ساعة الجهاز اللي شغّال عليه الكود. نفس السطر على سيرفر في فرانكفورت وعلى لابتوبك في القاهرة بيدّي رقمين مختلفين، ومفيش حاجة في الـ object تقول ده توقيت مين.`,
            R`[[tzinfo]] بـ [[None]]: ده التعريف الرسمي لـ naive. أي مقارنة بينه وبين aware بترمي [[TypeError]] (آخر سطر)، فـ Python بيمنعك تقارن حاجتين مش عارف يربطهم.`,
            R`[[datetime(2026, 9, 29, 21, 30, tzinfo=UTC)]] لحظة محددة: ٩:٣٠ بالليل بتوقيت UTC يوم ٢٩. الترتيب سنة، شهر، يوم، ساعة، دقيقة، و [[tzinfo=]] بيخليها aware.`,
            R`[[astimezone(CAIRO)]] بيرجّع **نفس اللحظة** بساعة القاهرة. مش بيغيّر الوقت الحقيقي، بيغيّر طريقة العرض بس: [[created == local]] بـ [[True]].`,
            R`[[2026-09-30 00:30:00+03:00]]: سبتمبر صيف فالقاهرة +3، فـ ٩:٣٠ UTC بقت ١٢:٣٠ بعد نص الليل، و**اليوم بقى ٣٠ مش ٢٩**. ده سبب أشهر bug في التقارير: طلب يتحسب في يوم غلط لما تاخد [[.date()]] من UTC.`,
            R`[[strftime]] بيحوّل لنص للعرض بالشكل اللي تختاره: [[%d]] اليوم برقمين، و [[%m]] الشهر، و [[%Y]] السنة ٤ أرقام، و [[%I]] الساعة ١٢، و [[%M]] الدقايق، و [[%p]] [[AM]] أو [[PM]]. الناتج [[30/09/2026 12:30 AM]]. للعرض بس؛ للتخزين [[isoformat]].`,
            R`نفس الساعة (١٢ الضهر UTC) بس في يناير، عشان نشوف التوقيت الشتوي. [[astimezone]] في نفس السطر بيحوّلها للقاهرة على طول.`,
            R`[[utcoffset()]] الفرق عن UTC في اللحظة دي: [[2:00:00]] في الشتا مقابل [[3:00:00]] في الصيف. عشان كده متخزّنش «+3» كرقم ثابت؛ [[ZoneInfo]] بيحسبه لكل تاريخ.`,
            R`ميعاد مكتوب بساعة القاهرة ([[tzinfo=CAIRO]]): ١٠ الصبح يوم ٥ أكتوبر. ده الشكل اللي اليوزر بيدخله في فورم. ومع [[ZoneInfo]] كتابة [[tzinfo=]] في الـ constructor صح (مع [[pytz]] القديمة كانت غلط مشهورة).`,
            R`حوّله لـ UTC للتخزين: [[07:00:00+00:00]] لأن أكتوبر لسه صيفي (+3). لو اليوزر حجز ميعاد بعد ٣٠ أكتوبر، نفس الـ ١٠ الصبح هتبقى [[08:00]] UTC.`,
            R`[[fromisoformat]] بيقرا نص ISO. من 3.11 بيقبل [[Z]] في الآخر (يعني UTC، الشكل اللي JavaScript بيبعته)، وقبل 3.11 كان بيرمي [[ValueError: Invalid isoformat string]].`,
            R`[[parsed.tzinfo]] بيطبع [[UTC]] (aware). و [[+ timedelta(days=30)]] بيزوّد ٣٠ يوم بالظبط ([[2026-10-29 10:00:00+00:00]]). لـ «شهر» بالمعنى الحسابي (نفس اليوم الشهر الجاي) [[timedelta]] مبيعرفش، لأن الشهور مش زي بعض.`,
            R`بداية يوم ٣٠ في القاهرة كـ UTC: [[local.date()]] التاريخ بس، و [[datetime.min.time()]] الساعة [[00:00]]، و [[combine]] بيلزقهم مع [[tzinfo=CAIRO]]، وبعدين [[astimezone(UTC)]]. ده اللي تحطه في [[WHERE created_at >= ...]] عشان تجيب «طلبات النهارده في القاهرة».`,
            R`[[2026-09-29 21:00:00+00:00]]: بداية يوم ٣٠ في القاهرة هي ٩ بالليل يوم ٢٩ UTC. يعني الطلب بتاع ٩:٣٠ (سطر ٨) تبع يوم ٣٠ في التقرير المصري، رغم إن UTC بيقول ٢٩.`,
            R`طرح [[date]] من [[date]] بيدّي [[timedelta]]: [[87 days, 0:00:00]]. و [[.days]] عليها بيدّي [[87]] كرقم. الكريسماس بعد ٨٧ يوم من ٢٩ سبتمبر.`,
            R`[[naive < now]] بترمي [[TypeError: can't compare offset-naive and offset-aware datetimes]]: Python مش هيخمّن الـ naive ده توقيت إيه. الحل يبقى كل حاجة aware من الأول، ولو جالك naive من مكتبة قديمة: [[naive.replace(tzinfo=CAIRO)]] لو انت **عارف** إنه بتوقيت القاهرة.`,
          ]
        },
        {
          cmd: "re",
          title: "regex في Python: search و findall و sub و groups",
          desc: R`[[re]] مكتبة الـ regex في Python. نفس اللغة اللي اتشرحت في تاب JavaScript (درس «regex: classes و quantifiers» ودرس «groups و flags»)، والفروق في طريقة النداء: [[re.search]] أول تطابق في أي حتة، و [[re.match]] من أول الـ string بس، و [[re.fullmatch]] الـ string كلها، و [[re.findall]] كل التطابقات، و [[re.sub]] استبدال، و [[re.split]] تقسيم.

واكتب الـ pattern دايمًا raw string: [[r"\d+"]]، عشان الـ backslash يوصل للـ regex زي ما هو. ولو هتستخدم نفس الـ pattern كتير: [[re.compile]] مرة واحدة.`,
          example: R`import re
PHONE = re.compile(r"^01[0125][0-9]{8}$")
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
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** من الذاكرة اكتب معنى: [[^]] و [[$]] و [[\d]] و [[\w]] و [[\s]] و [[\S]] و [[[^...]]] و [[{2,4}]] و [[+?]] و [[(?P<x>...)]] و [[(?:...)]] و [[(?=...)]]، والفرق بين [[match]] و [[search]] و [[fullmatch]].`, done: R`الـ ١٢ صح لما قارنتهم بالدرس، ولكل واحد سطر جربته في الـ REPL، منهم [[re.fullmatch(r"\d+", "١٢")]] اللي بترجّع match (وكاتب ليه).` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اكتب ناتج: [[re.findall(r"(\d+)-(\d+)", "1-2 and 30-40")]]، و [[re.findall(r"\d+-\d+", "1-2 and 30-40")]]، و [[re.split(r"(,)", "a,b")]]، و [[re.sub(r"a*", "-", "baac")]].`, done: R`طابقوا التشغيل: [[[('1', '2'), ('30', '40')]]] ثم [[['1-2', '30-40']]] ثم [[['a', ',', 'b']]] ثم [[-b--c-]]، وكاتب ليه الأخير فيه شرط زيادة (تطابق فاضي).` },
            { lvl: 'تطبيق', t: R`**صلّح:** validation الإيميل ده [[re.match(r"\w+@\w+\.com", email)]] بيقبل [["sara@shop.com.evil"]] وبيرفض [["sara.ali@shop.co"]]. صلّحه بـ [[fullmatch]] وبـ pattern أوسع شوية، واكتب ٦ حالات اختبار (٣ مقبولين و ٣ مرفوضين).`, done: R`الست حالات بتطلع صح، و [[fullmatch]] بترفض أي حاجة زيادة في الآخر، وكاتب في تعليق إن regex الإيميل الكامل مستحيل عمليًا والتأكيد الحقيقي إيميل تفعيل.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** ملف لوج nginx فيه ٢٠ سطر (اعمله بنفسك بنفس شكل المثال، منهم ٣ سطور مش بالشكل ده). طلّع بـ named groups: أكتر ٣ مسارات طلبًا، ونسبة الـ 5xx، وأكتر IP عمل 404، والسطور اللي متطابقتش برقمها.`, done: R`الأرقام بتطابق عدّك بإيدك على الملف، والسطور الـ ٣ البايظة متطبعة برقمها ومتحسبتش، والـ pattern مكتوب بـ [[re.VERBOSE]] وكل حتة جنبها تعليق.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[mask_pii(text)]] بتخبّي في أي نص: أرقام الموبايل المصري (عربي أو إنجليزي) لـ [[010*****678]]، والإيميلات لـ [[s***@shop.com]]، وأرقام البطاقات ١٦ رقم (بمسافات أو شرط أو من غيرها) لآخر ٤ بس. استخدم [[sub]] بدالة.`, done: R`نص فيه ٨ حالات مختلفة بيطلع كله متخبي صح، والرقم بالأرقام العربي اتخبّى برضه، والنص العادي اللي فيه أرقام قصيرة (سعر [[150]]) متلمسش.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** قيس [[^(a+)+$]] و [[^(a|aa)+$]] و [[^a+$]] على [["a" * n + "!"]] لـ [[n]] من ١٠ لـ ٢٦ خطوة ٢، وارسم (أو اكتب) جدول. وبعدين اكتب حماية: دالة [[safe_match(p, s, max_len=100)]].`, done: R`جدول فيه الأوقات الحقيقية للتلاتة، والاتنين الأولانيين بيكبروا بسرعة (أُسّي) والتالت ثابت تقريبًا، و [[safe_match]] بترفض أي نص أطول من [[max_len]] قبل ما تنادي الـ regex.` },
          ],
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
PHONE = re.compile(r"^01[0125][0-9]{8}$")
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
| [[[0-9]]] | رقم واحد من ٠ لـ ٩ الإنجليزي بس. (النسخة القديمة من الدرس كانت [[\d]]، ودي بتقبل الأرقام العربي كمان: [[010١٢٣٤٥٦٧٨]] كان بيعدّي كرقم موبايل. قسم «[[\d]] والأرقام العربي» تحت) |
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
| [[re.search]] | أول تطابق في أي حتة في الـ string، ومش لازم من أولها |

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
| [[(?P<status>\d{3})]] | الـ status: ٣ أرقام في group اسمه [[status]]، و [[int(m["status"])]] بتحوّله رقم |

و [[m.groupdict()]] على السطر التالت:

~~~text الناتج
{'ip': '10.0.0.7', 'method': 'GET', 'path': '/api/users', 'status': '502'}
~~~

والـ loop: [[if not m:]] عدّ السطر في [[skipped]] و [[continue]]، ولو الـ status بيبدأ بـ 5 زوّد عدّاد الـ path.

~~~text الناتج
{'/api/users': 2} skipped: 1
~~~

---

## ٩. [[\d]] والأرقام العربي

~~~python
print(re.fullmatch(r"\d{3}", "٠١٢") is not None, re.fullmatch(r"\d{3}", "٠١٢", re.ASCII) is not None, re.fullmatch(r"[0-9]{3}", "٠١٢"))
print(bool(re.compile(r"^01[0125]\d{8}$").match("010١٢٣٤٥٦٧٨")))
print(int("٠١٢"))
~~~

~~~text الناتج (Python 3.14)
True False None
True
12
~~~

- في Python 3 الـ patterns على [[str]] Unicode، فـ [[\d]] = أي رقم في أي لغة: العربي ([[٠-٩]])، والفارسي، والهندي. و [[\w]] بتقبل الحروف العربي، و [[\s]] بتقبل مسافات Unicode.
- يعني [[^01[0125]\d{8}$]] (النسخة الأولى من مثال الدرس ده) كانت بتقبل رقم **نصه عربي** ([[010١٢٣٤٥٦٧٨]] طلعت [[True]])، وده هيدخل الداتابيز كده، والبحث بـ [[01012345678]] مش هيلاقيه. عشان كده المثال اتغيّر لـ [[[0-9]{8}]].
- الحلول: [[[0-9]]] صريحة، أو flag [[re.ASCII]] (أو [[(?a)]] في أول الـ pattern) بيخلي [[\d]] و [[\w]] و [[\s]] ASCII بس. ولو عايز **تقبل** الأرقام العربي وتخزنها موحّدة: سيب [[\d]] وحوّل بعد كده، و [[int("٠١٢")]] بيدّي [[12]] لوحده.

---

## ١٠. [[re.VERBOSE]] و lookahead و [[sub]] بدالة

~~~python
LOG = re.compile(r"""
    (?P<ip>\d+\.\d+\.\d+\.\d+)   # IP
    \s.*?"(?P<method>[A-Z]+)      # method
    \s(?P<path>\S+)               # path
""", re.VERBOSE)
print(LOG.search('10.0.0.7 - - [x] "GET /a HTTP/1.1" 200').groupdict())
pw = re.compile(r"^(?=.*[A-Z])(?=.*\d).{8,}$")
print([bool(pw.match(s)) for s in ["abcdefgh", "Abcdefg1", "Ab1"]])
print(re.sub(r"(?P<d>\d+)", lambda m: str(int(m["d"]) * 2), "3 apples, 10 pears"))
~~~

~~~text الناتج
{'ip': '10.0.0.7', 'method': 'GET', 'path': '/a'}
[False, True, False]
6 apples, 20 pears
~~~

- [[re.VERBOSE]] (أو [[re.X]]) بيتجاهل المسافات والسطور الجديدة جوه الـ pattern وبيقبل تعليقات [[#]]. فالـ regex الطويل يتكتب سطر لكل حتة ومعاه شرحه. ولو محتاج مسافة حقيقية اكتبها [[\s]] أو [[\ ]].
- [[(?=...)]] **lookahead**: «لازم اللي بعدي يطابق ده» من غير ما يستهلك حروف. [[(?=.*[A-Z])]] فيه حرف كبير في أي مكان، و [[(?=.*\d)]] فيه رقم، و [[.{8,}]] ٨ حروف على الأقل. الشروط التلاتة على نفس النص من نفس النقطة. والعكس [[(?!...)]] «لازم ميطابقش».
- [[sub]] بدالة بدل نص: الدالة بتاخد الـ match وترجّع البديل، فتقدر تحسب (ضربنا كل رقم في ٢).

---

## ١١. regex ممكن يوقّف السيرفر (ReDoS)

~~~python
bad = re.compile(r"^(a+)+$")
for n in (18, 20, 22, 24):
    s = "a" * n + "!"
    t = time.perf_counter(); bad.match(s); print(n, round(time.perf_counter() - t, 3))
~~~

~~~text الناتج (اتقاس فعلًا، Python 3.14 ويندوز، بالثواني)
18 0.011
20 0.043
22 0.154
24 0.611
~~~

- [[(a+)+]] (تكرار جوه تكرار) لما النص **ميطابقش** في الآخر ([[!]])، الـ engine بيجرّب كل طرق تقسيم الـ [[a]] بين الـ groups قبل ما يستسلم. كل حرفين زيادة الوقت بيتضرب في ٤ تقريبًا: ٣٠ حرف كانوا هيبقوا حوالي ٤٠ ثانية، و ٤٠ حرف ساعات.
- لو الـ pattern ده بيتحقق من input يوزر في API، طلب واحد فيه ٤٠ حرف بيقفل worker. ده اسمه ReDoS (regular expression denial of service).
- [[^a+$]] بيعمل نفس المعنى وخلص في [[0.00009]] ثانية على ١٠ آلاف حرف. القاعدة: متحطش [[+]] أو [[*]] جوه group عليه [[+]] أو [[*]]، وحط حد لطول الـ input قبل الـ regex ([[len(s) <= 100]]).

## الخلاصة

| الدالة | بترجّع |
|---|---|
| [[re.match]] / [[re.search]] / [[re.fullmatch]] | match object أو [[None]] |
| [[re.findall]] | list strings (أو الـ groups لو فيه groups) |
| [[re.sub(p, repl, s)]] | string جديدة، و [[\1]] بيرجّع group |
| [[re.split(p, s)]] | list من الحتت اللي بين التطابقات (والـ groups معاها لو الـ pattern فيه أقواس) |
| [[re.compile(p)]] | pattern جاهز بنفس الدوال |

- دايمًا [[r"..."]]، ودايمًا [[if m:]] قبل الـ groups.
- [[(?P<name>...)]] بـ P في Python، و [[.*?]] لما [[.*]] تبلع زيادة.`,
          lines: [
            R`[[re]] موديول الـ regular expressions في المكتبة القياسية: لغة صغيرة بتوصف «شكل» النص (رقم موبايل، تاريخ، سطر لوج) بدل ما تكتب [[if]] على كل حرف.`,
            R`[[re.compile]] بيحوّل الـ pattern لـ object جاهز مرة واحدة، و [[PHONE]] بحروف كبيرة لأنه ثابت. [[r"..."]] raw string عشان الـ backslash يوصل للـ regex زي ما هو. والـ pattern: [[^]] أول النص، و [[01]]، وبعدين رقم من [[0125]]، وبعدين [[[0-9]{8}]] ٨ أرقام إنجليزي بالظبط، و [[$]] الآخر. [[[0-9]]] مش [[\d]] عشان [[\d]] بتقبل [[٠١٢]] العربي.`,
            R`[[match]] بيطابق من **أول** النص، وبيرجّع match object لو نجح أو [[None]] لو لأ، و [[bool]] بيحوّلهم [[True]]/[[False]]. الرقم التاني ١٠ أرقام بس، فـ [[{8}]] مش هتكمل. الناتج [[True False]].`,
            R`[[fullmatch]] لازم النص **كله** يطابق من أوله لآخره، ومش محتاج [[^]] و [[$]]. ده الصح للـ validation، لأن [[$]] مع [[match]] بيقبل [[\n]] في الآخر. و [[is not None]] أوضح من [[bool]] لما بترجع match object.`,
            R`سطر لوج بشكل nginx/Apache الحقيقي: IP، وشرطتين (identity و user)، والوقت بين [[[ ]]]، والطلب بين علامات تنصيص، والـ status، والحجم. علامات التنصيص المفردة برّه عشان النص جواه فيه مزدوجة.`,
            R`[[re.search]] بيدوّر على أول تطابق في **أي حتة**. [[(?P<name>...)]] named group: بيمسك الحتة دي وبيدّيها اسم. [[[A-Z]+]] حروف كبيرة (GET)، و [[\S+]] أي حاجة مش مسافة (المسار)، و [[[^"]*]] أي حاجة لحد علامة التنصيص، و [[\d{3}]] الـ status.`,
            R`[[search]] بترجّع [[None]] لو السطر مش بالشكل ده (سطر فاضي، أو سطر من برنامج تاني). من غير [[if m]]، [[m["method"]]] على [[None]] بترمي [[TypeError: 'NoneType' object is not subscriptable]].`,
            R`[[m["method"]]] بيجيب الـ group بالاسم (زي [[m.group("method")]]). كل الـ groups strings، فـ [[int(m["status"])]] عشان تقارن بـ [[>= 500]]. الناتج [[GET /api/users 500]]. و [[m.groupdict()]] بيرجّعهم كلهم dict.`,
            R`نص فيه رقمين موبايل وسط كلام عربي، عشان نوري [[findall]] و [[sub]]. الـ regex بيشتغل على العربي عادي لأن Python strings Unicode.`,
            R`[[findall]] بيرجّع **كل** التطابقات في list strings: [[['01012345678', '01298765432']]]. ولو الـ pattern فيه groups، بيرجّع الـ groups بس مش التطابق كله (فخ مشهور؛ استخدم [[(?:...)]] لو عايز أقواس من غير group).`,
            R`[[sub]] بيستبدل كل تطابق. الـ pattern بيمسك أول ٣ أرقام في group ١، ويبلع ٥ أرقام من غير ما يمسكهم، ويمسك آخر ٣ في group ٢. والبديل [[\1*****\2]] بيرجّع الـ groups ويحط نجوم مكان الوسط: [[010*****678]]. ده masking قبل ما تكتب رقم في لوج.`,
            R`[[split]] بـ regex: [[\s*]] صفر مسافات أو أكتر، و [[[,;]]] فاصلة أو semicolon، و [[\s*]] تاني. فـ [["tea , coffee;juice"]] بتتقسم صح [[['tea', 'coffee', 'juice']]]، عكس [[str.split(",")]] اللي كانت هتسيب [["coffee;juice"]] حتة واحدة ومسافات.`,
            R`slug للـ URL: [[lower()]] الأول، وبعدين [[[^a-z0-9]+]] أي حاجة **مش** حرف صغير أو رقم (الـ [[^]] جوه [[[ ]]] معناها «مش») واحد أو أكتر ورا بعض تبقى شرطة واحدة، و [[strip("-")]] يشيل الشرط من الطرفين. العربي هيتشال كله؛ لعناوين عربي استخدم [[\w]] بدل [[a-z0-9]].`,
            R`بيطبع [[hello-fastapi-world]]: [[", "]] و [[" "]] و [["!"]] بقوا شرط، والشرطة اللي في الآخر (من [["!"]]) اتشالت بـ [[strip]].`,
            R`[[.+?]] **كسولة** (lazy): بتاخد أقل حاجة ممكنة، فبتطلع [[['<b>', '</b>']]]. و [[.+]] **طماعة** (greedy): بتاخد أكبر حاجة ممكنة لحد آخر [[>]]، فبتطلع [[['<b>hi</b>']]] حتة واحدة. والـ [[?]] بعد أي [[*]] أو [[+]] بتحوّلها كسولة.`,
            R`[[re.escape]] بيحط backslash قبل أي رمز ليه معنى في regex ([[(]] و [[)]] و [[?]] و [[.]])، فيطلع [[price\ \(EGP\)\?]]. لازم مع أي نص جاي من يوزر هتحطه جوه pattern، وإلا [[(]] من غير قفلة بترمي [[re.error: missing ), unterminated subpattern]].`,
          ]
        }
      ]
    }
]);
