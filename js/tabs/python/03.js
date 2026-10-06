// تكملة تاب python: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/python/01.js (شرح حقول الدرس في أوله)
MORE("python", [
    {
      t: "الملفات والفولدرات من سكربت",
      l: 1,
      n: "المسارات نسبةً لإيه، والبحث بـ glob و rglob، و open بـ utf-8 عشان العربي، و shutil للنسخ والنقل والمسح من غير كوارث",
      items: [
        {
          cmd: "Path(__file__).parent",
          title: "المسارات في سكربت: نسبةً لإيه؟",
          desc: R`[[Path("template.md")]] مسار نسبي، يعني نسبةً للفولدر اللي انت واقف فيه ساعة التشغيل، مش الفولدر اللي فيه السكربت. فالسكربت يشتغل لما تشغّله من فولدره ويقع من أي مكان تاني.

الحل: الملفات اللي جنب السكربت توصلها بـ [[Path(__file__).resolve().parent]]، والملفات بتاعة المستخدم بـ [[Path.home()]]، وأي مسار جاي من المستخدم فيه [[~]] تعمله [[expanduser()]].

API بتاع pathlib كله في درس «pathlib» في تاب «Python و FastAPI». هنا السؤال: الملف ده فين؟`,
          example: R`#!/usr/bin/env python3
import sys
from datetime import datetime
from pathlib import Path
HERE = Path(__file__).resolve().parent
NOTES = Path.home() / "notes"
template = HERE / "template.md"
NOTES.mkdir(parents=True, exist_ok=True)
today = NOTES / f"{datetime.now():%Y-%m-%d}.md"
if not today.exists():
    header = template.read_text(encoding="utf-8") if template.exists() else "# Notes\n"
    today.write_text(header, encoding="utf-8")
text = " ".join(sys.argv[1:]) or "(empty)"
with today.open("a", encoding="utf-8") as f:
    f.write(f"- {datetime.now():%H:%M} {text}\n")
print(f"{today} ({len(today.read_text(encoding='utf-8').splitlines())} lines)")`,
          try: R`حط السكربت في فولدر [[scripts]] وجنبه [[template.md]] فيه [[# يوميات]] وسطر فاضي. شغّله مرة من جوه الفولدر بـ [[python3 note.py خلصت درس pathlib]]، ومرة من [[/tmp]] بالمسار الكامل (على ويندوز من أي فولدر تاني، زي [[cd $env:TEMP]]). وبعدين اعمل سكربت فيه [[print(Path("template.md").exists(), Path.cwd())]] وشغّله من [[/tmp]].`,
          flag: "script",
          deep: {
            why: R`أول ما السكربت يتشغّل من cron أو Task Scheduler أو من فولدر تاني، كل المسارات النسبية بتشاور على مكان غلط: cron بيبدأ في الـ home، و Task Scheduler ممكن يبدأ في [[C:\Windows\System32]]. والنتيجة [[FileNotFoundError]] أو، أسوأ، ملفات بتتكتب في مكان محدش بيبص فيه.`,
            how: R`[[__file__]] مسار السكربت زي ما اتكتب في الأمر (ممكن يبقى نسبي). [[resolve()]] بيخليه كامل وبيفك الـ symlinks، فلو عامل لينك للسكربت في [[~/.local/bin]]، [[parent]] هيشاور على الفولدر الحقيقي اللي فيه الـ template.

[[Path.home()]] الـ home على أي نظام ([[/home/sara]] أو [[C:\Users\sara]]). و [[/]] بيبني المسار: [[Path.home() / "notes"]].

[[mkdir(parents=True, exist_ok=True)]] زي [[mkdir -p]]: يعمل الفولدرات اللي فوقه، ومايعترضش لو موجود.

[[f"{datetime.now():%Y-%m-%d}.md"]]: الـ f-string بيقبل شكل التاريخ بعد [[:]]، فاسم الملف بيبقى [[2026-10-01.md]].

الفتح بـ [["a"]] (append) بيضيف في آخر الملف من غير ما يمسح اللي فيه.`,
            when: "أي سكربت بيقرا ملف جنبه (إعدادات، template، بيانات)، أو بيكتب في مكان ثابت، أو هيتجدول.",
            mistakes: R`[[Path("~/notes")]] من غير [[expanduser()]]: Python مش بيفك [[~]]، فـ [[mkdir]] بيعمل فولدر اسمه حرفيًا [[~]] جوه الفولدر الحالي. جربتها فعلًا واتعمل [[./~/notes]]. وخطر تمسحه بـ [[rm -rf ~]] فتمسح الـ home كله، امسحه بـ [[rm -r ./~]]. وتاني غلطة: [[os.chdir]] في نص السكربت عشان «تصلّح» المسارات، فكل مسار نسبي بعدها بيتغير معناه.`
          },
          teach: R`## السكربت ده بيعمل إيه؟

دفتر يوميات صغير: كل مرة تشغّله بكلام، بيضيف سطر بالوقت في ملف اسمه تاريخ النهارده جوه [[~/notes]]. أول مرة في اليوم بيبدأ الملف من [[template.md]] اللي **جنب السكربت**. فيه ٣ أنواع مسارات: جنب السكربت، وفي الـ home، ونسبي. اتشغّل على لينكس ([[docker run --rm python:3.13]] بيوزر اسمه sara) وعلى ويندوز في PowerShell 7 (والـ home اتحوّل لفولدر تجربة عشان ميتعملش حاجة في الـ home الحقيقي).

---

## ١. المسارات التلاتة

~~~python note.py
HERE = Path(__file__).resolve().parent
NOTES = Path.home() / "notes"
template = HERE / "template.md"
~~~

### [[HERE = Path(__file__).resolve().parent]]

من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[__file__]] | متغير جاهز فيه مسار ملف السكربت نفسه |
| [[Path(...)]] | حوّله Path عشان نستخدم دواله |
| [[.resolve()]] | خليه مسار كامل حقيقي: يفك [[..]] والـ symlinks |
| [[.parent]] | الفولدر اللي فوقه، يعني الفولدر اللي فيه السكربت |

الأسماء الكبيرة ([[HERE]] و [[NOTES]]) عرف في Python لثوابت مش هتتغير.

حطيت في [[where.py]] جنب السكربت ٤ سطور: [[Path("template.md").exists()]] و [[Path.cwd()]]، وبعدين [[__file__]] و [[resolve()]] و [[parent]]، وشغّلته من [[/tmp]]:

~~~text الناتج: cd /tmp && python3 ~/scripts/where.py
False /tmp
/home/sara/scripts/where.py
/home/sara/scripts/where.py
/home/sara/scripts
~~~

- [[Path.cwd()]] (**c**urrent **w**orking **d**irectory) طلع [[/tmp]]: الفولدر اللي **انت** واقف فيه. و [[Path("template.md")]] النسبي دوّر هناك فطلع [[False]].
- [[__file__]] طلع المسار الكامل للسكربت، فـ [[parent]] هو [[/home/sara/scripts]] مهما كنت واقف فين.

وليه [[resolve()]] لو [[__file__]] كامل أصلًا؟ عشان الـ symlink. عملت لينك [[~/.local/bin/where]] بيشاور على السكربت وشغّلته (المرة دي كـ root، فالـ home هو [[/root]]):

~~~text الناتج
False /tmp
/root/.local/bin/where
/root/scripts/where.py
/root/scripts
~~~

[[__file__]] كان مسار اللينك، و [[resolve()]] وصل للملف الحقيقي، فـ [[parent]] جاب الفولدر اللي فيه الـ template فعلًا.

### [[NOTES = Path.home() / "notes"]]

[[Path.home()]] فولدر اليوزر على أي نظام ([[/home/sara]] أو [[C:\Users\ali]]). و [[/]] بين Path ونص مش قسمة، ده «ركّب المسار»: [[/home/sara/notes]]. وعلى ويندوز بيستخدم [[\]] لوحده.

---

## ٢. الفولدر والملف

~~~python note.py
NOTES.mkdir(parents=True, exist_ok=True)
today = NOTES / f"{datetime.now():%Y-%m-%d}.md"
~~~

- [[mkdir]] يعمل الفولدر. [[parents=True]] يعمل اللي فوقه لو ناقص، و [[exist_ok=True]] مايعترضش لو موجود. زي [[mkdir -p]].
- [[datetime.now()]] الوقت دلوقتي. وبعد [[:]] في الـ f-string شكل التاريخ: [[%Y-%m-%d]] = [[2026-10-06]]. فالملف [[notes/2026-10-06.md]].

---

## ٣. أول مرة في اليوم

~~~python note.py
if not today.exists():
    header = template.read_text(encoding="utf-8") if template.exists() else "# Notes\n"
    today.write_text(header, encoding="utf-8")
~~~

لو ملف النهارده مش موجود: اقرا الـ template لو موجود، غير كده عنوان افتراضي، واكتبه في الملف الجديد. [[write_text]] بيعمل الملف ويكتب فيه مرة واحدة.

---

## ٤. ضيف السطر

~~~python note.py
text = " ".join(sys.argv[1:]) or "(empty)"
with today.open("a", encoding="utf-8") as f:
    f.write(f"- {datetime.now():%H:%M} {text}\n")
print(f"{today} ({len(today.read_text(encoding='utf-8').splitlines())} lines)")
~~~

- [[" ".join(sys.argv[1:])]]: الكلمات اللي بعد اسم السكربت متوصّلة بمسافة، فتكتب من غير quotes. ولو مفيش كلام: [["(empty)"]].
- [[open("a")]]: **a**ppend، اكتب في الآخر من غير ما تمسح. و [[\n]] سطر جديد لازم بإيدك.
- [[%H:%M]] الساعة والدقيقة.
- السطر الأخير: [[splitlines()]] بيقسّم النص لسطور، و [[len]] عددهم.

---

## ٥. التشغيل من ٣ أماكن

~~~text الناتج
cd ~/scripts && python3 note.py خلصت درس pathlib  →  /home/sara/notes/2026-10-06.md (3 lines)
cd /tmp && python3 ~/scripts/note.py from /tmp     →  /home/sara/notes/2026-10-06.md (4 lines)
python3 ~/scripts/note.py                          →  /home/sara/notes/2026-10-06.md (5 lines)
~~~

~~~text ~/notes/2026-10-06.md
# يوميات

- 17:58 خلصت درس pathlib
- 17:58 from /tmp
- 17:58 (empty)
~~~

نفس الملف في التلاتة، والـ template اتقرا صح حتى من [[/tmp]]. (3 lines في الأول: العنوان، والسطر الفاضي، وأول ملاحظة.) وعلى ويندوز من [[$env:TEMP]] نفس الكلام: [[...\home\notes\2026-10-06.md (4 lines)]]، والعربي سليم.

---

## ٦. [[~]] و [[expanduser()]]

~~~text الناتج: print(Path.home(), Path("~/notes"), Path("~/notes").expanduser())
/home/sara ~/notes /home/sara/notes
~~~

Python مش بيفك [[~]] لوحده، دي شغلة الشيل. فلو المسار جاي من config أو من input، اعمله [[expanduser()]].

---

## الخلاصة

| عايز | استخدم |
|---|---|
| ملف جنب السكربت | [[Path(__file__).resolve().parent / "name"]] |
| ملف في فولدر اليوزر | [[Path.home() / "name"]] |
| مسار من المستخدم فيه [[~]] | [[Path(x).expanduser()]] |
| الفولدر اللي واقف فيه دلوقتي | [[Path.cwd()]]، ومش مضمون في cron |

- المسار النسبي نسبةً لـ [[cwd]]، مش لمكان السكربت.`,
          lines: [
            "sys.",
            "التاريخ والوقت.",
            "Path.",
            "الفولدر اللي فيه السكربت نفسه، مهما كان مكان التشغيل.",
            "فولدر في الـ home على أي نظام.",
            "ملف جنب السكربت.",
            "اعمل الفولدر لو مش موجود.",
            "ملف النهارده: notes/2026-10-01.md.",
            "أول مرة النهارده؟",
            "خد الـ template لو موجود، أو عنوان افتراضي.",
            "اكتبه.",
            "الكلام اللي بعد اسم السكربت.",
            "افتح للإضافة في الآخر.",
            "سطر بالوقت والكلام.",
            "اطبع المسار وعدد السطور."
          ],
          sol: R`شغّلته بـ HOME مؤقت. المرة الأولى من جوه الفولدر: [[.../notes/2026-10-01.md (3 lines)]]، والتانية من [[/tmp]] بالمسار الكامل: [[(4 lines)]]، والاتنين في نفس الملف:

[[# يوميات]]
(سطر فاضي)
[[- 16:13 خلصت درس pathlib]]
[[- 16:13 from /tmp]]

يعني الـ template اتقرا صح حتى من [[/tmp]] لأن [[HERE]] مبني من [[__file__]].

والسكربت التاني من [[/tmp]] طبع [[False /tmp]]: [[Path("template.md")]] دوّر في [[/tmp]] مش جنب السكربت. وده نفس اللي هيحصل في cron.

وجربته على ويندوز كمان، من جوه الفولدر ومن [[$env:TEMP]]: نفس النتيجة، والملف اتعمل في [[C:\Users\...\notes\2026-10-02.md]] بالعربي سليم.`
        },
        {
          cmd: "glob و rglob",
          title: "لف على ملفات فولدر واختار اللي محتاجه",
          desc: R`تلات طرق تلف بيهم على فولدر:

[[folder.iterdir()]] كل اللي جوه الفولدر مباشرة (ملفات وفولدرات).
[[folder.glob("*.md")]] اللي اسمه ماشي على pattern في الفولدر ده بس.
[[folder.rglob("*.md")]] نفس الـ pattern في الفولدر وكل اللي تحته.

ومن أي Path تاخد [[name]] و [[stem]] و [[suffix]] و [[parent]]، ومن [[stat()]] الحجم ووقت التعديل. ده أساس أي سكربت بيرتّب أو ينضّف أو يعد.`,
          example: R`import sys
from collections import Counter
from pathlib import Path
root = Path(sys.argv[1] if len(sys.argv) > 1 else ".").expanduser()
files = [p for p in root.rglob("*") if p.is_file() and ".git" not in p.parts]
by_ext = Counter(p.suffix.lower() or "(none)" for p in files)
for ext, n in by_ext.most_common(4):
    print(f"{ext:<8}{n:>4}")
biggest = sorted(files, key=lambda p: p.stat().st_size, reverse=True)[:3]
for p in biggest:
    print(f"{p.stat().st_size:>9,}  {p.relative_to(root)}")
print(sorted(p.name for p in root.glob("*.md")))
print(sorted(p.name for p in root.rglob("*.md")))
print(sorted(p.name for p in root.iterdir()))
p = root / "img" / "x.PNG"
print(p.name, p.stem, p.suffix, p.parent.name, p.suffix.lower() == ".png")`,
          try: R`اعمل مشروع تجربة: [[mkdir -p proj/src proj/docs proj/img proj/.git]] و [[touch proj/src/a.py proj/src/b.py proj/src/c.py proj/docs/README.md proj/NOTES.md proj/img/x.PNG proj/img/y.png proj/img/z.jpg proj/Makefile]] وشغّل السكربت عليه. وبعدين اكتب سكربت يطبع الملفات اللي اتعدلت في آخر 24 ساعة بس، من غير ما يدخل [[.git]] و [[node_modules]] و [[.venv]] أصلًا.

على ويندوز PowerShell: [[mkdir proj/src, proj/docs, proj/img, proj/.git]]، و [[New-Item]] بنفس أسماء الملفات مفصولة بفواصل بدل touch، وبدل [[touch -d "3 days ago" f]]: [[(Get-Item f).LastWriteTime = (Get-Date).AddDays(-3)]].`,
          flag: "script",
          deep: {
            why: "«انقل كل الصور»، «امسح الـ logs القديمة»، «اعد ملفات كل نوع»، «هات أكبر ١٠ ملفات»: كلها بتبدأ بلفة على فولدر واختيار ملفات.",
            how: R`الـ patterns: [[*]] أي حروف، و [[?]] حرف واحد، و [[[0-9] ]] حرف من مجموعة. و [[rglob("*.md")]] هو نفسه [[glob("**/*.md")]].

الترتيب اللي بيطلعوا بيه مش مضمون، فاعمل [[sorted]] لو هتطبع أو تنقل. والتلاتة generators: لو هتنقل أو تمسح جوه نفس الفولدر وانت بتلف، حوّلهم list الأول.

pathlib مش زي الشيل: [[glob("*")]] بيجيب الملفات المخفية كمان ([[.git]] و [[.venv]])، عشان كده [[".git" not in p.parts]]. و [[p.parts]] هي أجزاء المسار كـ tuple.

[[suffix]] آخر امتداد بس: [[a.tar.gz]] امتداده [[.gz]]، و [[suffixes]] بيدّيك [[['.tar', '.gz'] ]]، و [[.bashrc]] امتداده فاضي. و [[Counter]] بيعد (درس «collections» في تاب «Python و FastAPI»).

لفولدرات ضخمة زي node_modules: [[rglob]] بيدخل جوه كل حاجة وبعدين انت بتفلتر، وده بطيء. [[root.walk()]] (من Python 3.12، وقبلها [[os.walk]]) بيدّيك الفولدرات في كل مستوى، ولو شلت منها اسم مش هيدخله أصلًا: [[dirnames[:] = [d for d in dirnames if d not in SKIP] ]].`,
            when: "أي سكربت بيشتغل على مجموعة ملفات.",
            mistakes: R`[[p.suffix == ".jpg"]] فـ [[photo.JPG]] تتنسي: دايمًا [[lower()]]. و [[rglob]] على فولدر فيه node_modules أو .venv فياخد دقايق. و [[iterdir()]] وانت بتنقل ملفات لفولدرات جوه نفس الفولدر من غير [[sorted]] أو list. وعلى لينكس الـ glob حساس لحالة الحروف وعلى ويندوز لأ، فنفس السكربت بيجيب نتايج مختلفة.`
          },
          teach: R`## السكربت ده بيعمل إيه؟

بيعمل «جرد» لفولدر مشروع: كام ملف من كل امتداد، وأكبر ٣ ملفات، وبعدين يقارن التلات طرق اللي بتلف بيهم على فولدر ([[glob]] و [[rglob]] و [[iterdir]])، وفي الآخر يفك اسم ملف لأجزائه. اتشغّل على مشروع التجربة اللي في «جرّب» (ومعاه ملف جوه [[.git]]، وحجم في 3 ملفات بـ [[head -c]]) على لينكس ([[docker run --rm python:3.13]]) وعلى ويندوز في PowerShell 7.

~~~text شكل المشروع
proj/
  .git/config
  Makefile
  NOTES.md
  docs/README.md
  img/x.PNG   (50,000 byte)
  img/y.png
  img/z.jpg   (120,000 byte)
  src/a.py    (3,000 byte)
  src/b.py
  src/c.py
~~~

---

## ١. الفولدر وكل ملفاته

~~~python scan.py
root = Path(sys.argv[1] if len(sys.argv) > 1 else ".").expanduser()
files = [p for p in root.rglob("*") if p.is_file() and ".git" not in p.parts]
~~~

- [[.expanduser()]]: لو المسار فيه [[~]] فكّها (Python مش بيفكها لوحده).
- [[root.rglob("*")]]: كل حاجة في الفولدر **وكل اللي تحته** بأي عمق. **r** = recursive.
- [[p.is_file()]]: ملفات بس، من غير الفولدرات.
- [[p.parts]]: أجزاء المسار كـ tuple: [[Path("proj/img/x.PNG").parts]] = [[('proj', 'img', 'x.PNG')]]. فـ [[".git" not in p.parts]] يعني «مش جوه فولدر اسمه .git». لازم، لأن [[rglob("*")]] بيجيب الملفات المخفية كمان (عكس الشيل).

---

## ٢. العد بـ [[Counter]]

~~~python scan.py
by_ext = Counter(p.suffix.lower() or "(none)" for p in files)
for ext, n in by_ext.most_common(4):
    print(f"{ext:<8}{n:>4}")
~~~

- [[p.suffix]]: الامتداد بالنقطة ([[.PNG]]). و [[.lower()]] عشان [[.PNG]] و [[.png]] يتعدّوا واحد.
- [[or "(none)"]]: ملف زي [[Makefile]] امتداده نص فاضي، فنسمّيه [[(none)]].
- [[Counter(...)]] من [[collections]]: بيعد كل قيمة اتكررت كام مرة.
- [[.most_common(4)]]: أكتر ٤، كل واحد [[(القيمة، العدد)]].

~~~text الناتج
.py        3
.md        2
.png       2
(none)     1
~~~

---

## ٣. أكبر ٣

~~~python scan.py
biggest = sorted(files, key=lambda p: p.stat().st_size, reverse=True)[:3]
for p in biggest:
    print(f"{p.stat().st_size:>9,}  {p.relative_to(root)}")
~~~

- رتّب بالحجم من الأكبر، وخد أول ٣.
- [[:>9,]]: يمين بعرض 9 وفواصل آلاف.
- [[p.relative_to(root)]]: المسار من غير [[proj/]] في أوله.

~~~text الناتج (لينكس)
  120,000  img/z.jpg
   50,000  img/x.PNG
    3,000  src/a.py
~~~

وعلى ويندوز نفس الأرقام بس [[img\z.jpg]].

---

## ٤. التلات طرق جنب بعض

~~~python scan.py
print(sorted(p.name for p in root.glob("*.md")))
print(sorted(p.name for p in root.rglob("*.md")))
print(sorted(p.name for p in root.iterdir()))
~~~

~~~text الناتج
['NOTES.md']
['NOTES.md', 'README.md']
['.git', 'Makefile', 'NOTES.md', 'docs', 'img', 'src']
~~~

| الطريقة | بتدوّر فين | بتجيب إيه |
|---|---|---|
| [[glob("*.md")]] | الفولدر ده بس | اللي ماشي على الـ pattern |
| [[rglob("*.md")]] | الفولدر وكل اللي تحته | اللي ماشي على الـ pattern |
| [[iterdir()]] | الفولدر ده بس | كل حاجة، ملفات وفولدرات، و [[.git]] كمان |

الـ pattern: [[*]] أي عدد حروف، و [[?]] حرف واحد. و [[rglob("*.md")]] هو نفسه [[glob("**/*.md")]] ([[**]] = أي عدد فولدرات)، وجربتها وطلّعت نفس اللستة.

و [[sorted]] ليه؟ لأن الترتيب اللي بيطلعوا بيه حسب النظام ومش مضمون.

### حالة الحروف

[[rglob("*.MD")]] بحروف كبيرة: على لينكس رجّع [[[] ]] (فاضية)، وعلى ويندوز رجّع [[['NOTES.md', 'README.md'] ]]. لينكس بيفرّق بين الكبير والصغير وويندوز لأ.

---

## ٥. أجزاء الاسم

~~~python scan.py
p = root / "img" / "x.PNG"
print(p.name, p.stem, p.suffix, p.parent.name, p.suffix.lower() == ".png")
~~~

~~~text الناتج
x.PNG x .PNG img True
~~~

| الخاصية | القيمة | معناها |
|---|---|---|
| [[name]] | [[x.PNG]] | الاسم كامل |
| [[stem]] | [[x]] | من غير الامتداد |
| [[suffix]] | [[.PNG]] | الامتداد زي ما هو |
| [[parent.name]] | [[img]] | اسم الفولدر اللي فوقه |

و [[suffix]] آخر امتداد بس: [[a.tar.gz]] امتداده [[.gz]]، و [[suffixes]] رجّع [[['.tar', '.gz'] ]]، و [[.bashrc]] امتداده [['']] (النقطة في الأول مش امتداد).

---

## ٦. الحل: آخر 24 ساعة من غير الفولدرات التقيلة

~~~python solCode
SKIP = {".git", "node_modules", ".venv", "__pycache__"}
cutoff = time.time() - 24 * 3600
recent = []
for dirpath, dirnames, filenames in root.walk():
    dirnames[:] = [d for d in dirnames if d not in SKIP]
    for name in filenames:
        p = dirpath / name
        if p.stat().st_mtime >= cutoff:
            recent.append(p)
~~~

- [[{...}]] بأسماء بس = **set**: لستة من غير تكرار، والسؤال [[in]] فيها سريع.
- [[time.time()]]: الوقت دلوقتي بالثواني، و [[24 * 3600]] عدد ثواني اليوم. فـ [[cutoff]] = «من 24 ساعة».
- [[root.walk()]] (من Python 3.12): بيلف فولدر فولدر، ولكل واحد بيدّيك ٣ حاجات: [[dirpath]] مساره، و [[dirnames]] أسماء الفولدرات اللي جواه، و [[filenames]] أسماء الملفات.
- [[dirnames[:] = [...] ]]: ده سر الحل. [[[:] ]] معناها «غيّر محتوى اللستة نفسها» مش «اعمل لستة جديدة»، و [[walk]] بيدخل بعد كده **بس** في الفولدرات اللي فضلت فيها. فـ node_modules مش بيتلف عليه أصلًا، مش بيتلف وبعدين يتفلتر.
- [[st_mtime >= cutoff]]: اتعدّل بعد الحد ده.

ضفت [[node_modules]] و [[.venv]] فيهم ملفات جديدة، وخليت 4 ملفات قديمة بـ [[touch -d "3 days ago"]]:

~~~text الناتج (لينكس)
img/x.PNG
img/z.jpg
NOTES.md
img/y.png
src/a.py
5 files changed in the last 24h
~~~

ولا ملف من node_modules ولا .venv. وعلى ويندوز بـ [[(Get-Item f).LastWriteTime = (Get-Date).AddDays(-3)]] على ملف واحد بس، طلع 8 ملفات من 9، والقديم مش منهم.

---

## الخلاصة

- [[iterdir]] كل اللي جوه مباشرة، و [[glob]] بـ pattern هنا، و [[rglob]] بـ pattern في كل اللي تحته.
- كلهم بيجيبوا المخفي: استبعد [[.git]] بإيدك.
- [[suffix.lower()]] دايمًا، والحروف الكبيرة بتفرق على لينكس بس.
- فولدرات ضخمة؟ [[walk()]] وشيل اللي مش عايزه من [[dirnames]].`,
          lines: [
            "sys.",
            "Counter للعد.",
            "Path.",
            "الفولدر من الـ argument، وفك ~ لو موجودة.",
            "كل الملفات بأي عمق، من غير اللي جوه .git.",
            "عد كل امتداد (بحروف صغيرة).",
            "أكتر 4 امتدادات:",
            "الامتداد والعدد.",
            "أكبر 3 ملفات.",
            "لكل واحد:",
            "الحجم بفواصل، والمسار نسبةً للفولدر.",
            "glob: في الفولدر ده بس.",
            "rglob: في كل اللي تحته.",
            "iterdir: كل اللي جواه مباشرة.",
            "Path لملف واحد.",
            "الاسم، ومن غير امتداد، والامتداد، والفولدر اللي فوقه."
          ],
          sol: R`على المشروع ده (وحطيت حجم في a.py و x.PNG و z.jpg):

[[.py        3]] و [[.md        2]] و [[.png       2]] و [[(none)     1]] (الـ Makefile)
[[  120,000  img/z.jpg]] و [[   50,000  img/x.PNG]] و [[    3,000  src/a.py]]
[[['NOTES.md'] ]] من glob، و [[['NOTES.md', 'README.md'] ]] من rglob
[[['.git', 'Makefile', 'NOTES.md', 'docs', 'img', 'src'] ]] من iterdir، لاحظ [[.git]] ظاهر.
[[x.PNG x .PNG img True]]

وحل التمرين تحت بـ [[Path.walk()]]. على نفس المشروع ومعاه [[node_modules]] و [[.venv]] (فيهم ملفات جديدة) وملفات اتعدلت من 3 أيام بـ [[touch -d "3 days ago"]]، طبع الخمسة دول: [[img/x.PNG]] و [[img/z.jpg]] و [[NOTES.md]] و [[img/y.png]] و [[src/a.py]] (مترتبين بوقت التعديل، والملفات اتعملت في نفس الثانية تقريبًا، فالترتيب عندك ممكن يختلف) وبعدين [[5 files changed in the last 24h]]، ومادخلش node_modules ولا .venv خالص. لو عندك Python أقدم من 3.12: [[os.walk(root)]] بنفس الشكل بس [[dirpath]] بيبقى string.

وعلى ويندوز نفس الأرقام، بس المسارات بـ [[\]] ([[img\z.jpg]])، و [[rglob("*.MD")]] لقى [[NOTES.md]] و [[README.md]] لأن ويندوز مش حساس لحالة الحروف، وعلى لينكس نفس السطر رجّع لستة فاضية.`,
          solCode: R`import sys
import time
from pathlib import Path
SKIP = {".git", "node_modules", ".venv", "__pycache__"}
root = Path(sys.argv[1] if len(sys.argv) > 1 else ".").expanduser()
cutoff = time.time() - 24 * 3600
recent = []
for dirpath, dirnames, filenames in root.walk():
    dirnames[:] = [d for d in dirnames if d not in SKIP]
    for name in filenames:
        p = dirpath / name
        if p.stat().st_mtime >= cutoff:
            recent.append(p)
for p in sorted(recent, key=lambda p: p.stat().st_mtime, reverse=True):
    print(p.relative_to(root))
print(f"{len(recent)} files changed in the last 24h")`
        },
        {
          cmd: "open() و encoding=\"utf-8\"",
          title: "اقرا واكتب ملفات نصية والعربي ميبوظش",
          desc: R`[[with open(path, "w", encoding="utf-8") as f:]] بيفتح الملف، و [[with]] بيقفله لوحده حتى لو حصل error. الـ mode: [["r"]] قراية (الافتراضي)، و [["w"]] كتابة بتمسح القديم، و [["a"]] إضافة في الآخر، و [["x"]] كتابة بس لو الملف مش موجود، و [["rb"]] و [["wb"]] للملفات الـ binary.

وأهم حاجة في الدرس: [[encoding="utf-8"]] دايمًا. من غيرها Python بيستخدم encoding الجهاز، وده utf-8 على لينكس وماك، بس على ويندوز بيبقى الـ code page بتاع الجهاز: [[cp1256]] على ويندوز عربي، و [[cp1252]] على ويندوز إنجليزي (وده مبيعرفش يكتب عربي أصلًا). فنفس السكربت يكتب عربي سليم عندك ويطلّع رموز غريبة أو يقع عند زميلك.`,
          example: R`from pathlib import Path
p = Path("ar.txt")
with open(p, "w", encoding="utf-8") as f:
    f.write("السلام عليكم\n")
    f.write("سطر تاني\n")
with open(p, "a", encoding="utf-8") as f:
    print("سطر بـ print", file=f)
with open(p, encoding="utf-8") as f:
    for n, line in enumerate(f, 1):
        print(n, line.rstrip("\n"))
print(p.read_bytes()[:8])
print(p.read_text(encoding="cp1256")[:12])
with open("once.txt", "x", encoding="utf-8") as f:
    f.write("created once\n")`,
          try: R`شغّله مرتين وشوف الفرق. وبعدين جرّب اللي بيحصل لما الناتج يتكتب بـ encoding مش UTF-8 (ده اللي بيحصل على ويندوز لما تعمل redirect لملف): [[PYTHONIOENCODING=cp1252 python3 -c 'print("سلام")']]. في PowerShell: [[$env:PYTHONIOENCODING="cp1252"; python -c "print('سلام')"]] وبعدها [[Remove-Item Env:PYTHONIOENCODING]]. وفي الآخر اعمل ملف فيه BOM زي اللي Notepad و Excel بيعملوه: [[python -c "open('bom.txt','wb').write(b'\xef\xbb\xbfname\n')"]] (نفس السطر شغال في bash و PowerShell) واقراه بـ [[encoding="utf-8"]] وبـ [[encoding="utf-8-sig"]] واطبع [[repr]].`,
          flag: "script",
          deep: {
            why: R`أشهر مشكلة في سكربتات بتتعامل مع عربي: ملف بيتفتح فيطلع [[ط§ظ„ط³ظ„ط§ظ…]] بدل «السلام»، أو السكربت يقع بـ [[UnicodeDecodeError]] أو [[UnicodeEncodeError]] على جهاز ويندوز. والسبب دايمًا ملف اتكتب بـ encoding واتقرا بـ encoding تاني.`,
            how: R`الملف على الديسك bytes. الـ encoding هو اللي بيحوّل الحروف لـ bytes وبالعكس، و utf-8 بيكتب الحرف العربي في 2 bytes ([[b'\xd8\xa7\xd9\x84...']] في المثال).

لو قريت bytes الـ utf-8 بـ [[cp1256]] (encoding ويندوز العربي القديم) مفيش error، بس كل حرف بيتقري حرفين غلط: [[ط§ظ„ط³ظ„ط§ظ…]]. لو شفت الشكل ده في أي مكان، اعرف إن utf-8 اتقرا كـ cp1256.

الافتراضي من غير encoding هو [[locale.getpreferredencoding()]]. والحلول على ويندوز: اكتب encoding في كل open، أو شغّل بـ [[python -X utf8]]، أو اعمل متغير البيئة [[PYTHONUTF8=1]]. و PEP 686 بيخلي UTF-8 mode هو الافتراضي من Python 3.15 (اتأكدت على 3.15 RC: [[sys.flags.utf8_mode]] بقى 1 لوحده، وعلى 3.13 كان 0)، بس النسخة اللي على أجهزة الناس غالبًا أقدم، فاكتبها.

ولو ويندوز عندك مفعّل فيه «Beta: Use Unicode UTF-8 for worldwide language support» من إعدادات اللغة، الافتراضي بيبقى UTF-8 من غير حاجة. جهازي كده: [[python -X utf8=0 -c "import locale; print(locale.getencoding())"]] طبع [[cp65001]] (يعني UTF-8). متعتمدش على ده برضه: جهاز زميلك غالبًا مش كده.

[[utf-8-sig]]: Notepad القديم و Excel بيحطوا 3 bytes في أول الملف (BOM). [[utf-8]] بيقراهم حرف [[\ufeff]] فأول كلمة في الملف تبقى [['\ufeffname']] مش [['name']]، و [[utf-8-sig]] بيشيلهم.

[[errors="replace"]] بيحط [[�]] مكان أي byte مش مفهوم بدل ما يقع، مفيد لـ logs ملخبطة.

وضع النص بيحوّل [[\r\n]] لـ [[\n]] وانت بتقرا، وعلى ويندوز بيكتب [[\n]] كـ [[\r\n]]. والملفات الكبيرة: لف على [[f]] سطر سطر زي المثال بدل [[read()]].`,
            when: "كل open وكل read_text و write_text. مفيش استثناء.",
            mistakes: R`[["w"]] على ملف موجود بيمسح محتواه من غير ما يسأل، فلو قصدك تضيف استخدم [["a"]]، ولو مش عايز تدوس على حاجة استخدم [["x"]]. و [[f.write]] مش بيحط سطر جديد لوحده. وتقرا ملف 2GB بـ [[read_text()]] فالذاكرة تخلص. ومتنساش إن [[print]] ليه encoding هو كمان: على ويندوز الكونسول نفسه UTF-8، بس لما تعمل [[python script.py > out.txt]] الناتج بيتكتب بالـ code page بتاع الجهاز، فسكربت بيطبع عربي ممكن يقع بـ UnicodeEncodeError (زي اللي في «جرّب»). الحل [[PYTHONUTF8=1]] أو [[python -X utf8]].`
          },
          teach: R`## السكربت ده بيعمل إيه؟

بيكتب ملف فيه عربي، ويضيف عليه، ويقراه سطر سطر، وبعدين يوريك الملف «من جوه» (bytes)، ويوريك شكل الغلطة المشهورة لما ملف UTF-8 يتقري بـ encoding غلط، وفي الآخر يجرّب mode بيرفض يكتب فوق ملف موجود. اتشغّل مرتين على لينكس ([[docker run --rm python:3.13]]) وعلى ويندوز في PowerShell 7 (Python 3.14)، والناتج واحد.

---

## ١. اكتب: [["w"]]

~~~python op.py
from pathlib import Path
p = Path("ar.txt")
with open(p, "w", encoding="utf-8") as f:
    f.write("السلام عليكم\n")
    f.write("سطر تاني\n")
~~~

| الحتة | معناها |
|---|---|
| [[open(p, "w", ...)]] | افتح الملف. التاني هو الـ **mode**: [["w"]] = write. لو الملف مش موجود يتعمل، ولو موجود **يتمسح محتواه** |
| [[encoding="utf-8"]] | حوّل الحروف لـ bytes بطريقة UTF-8 |
| [[with ... as f:]] | سمّي الملف المفتوح [[f]]، واقفله أول ما البلوك يخلص حتى لو حصل error |
| [[f.write(...)]] | اكتب النص زي ما هو. مش بيزوّد سطر جديد، عشان كده [[\n]] بإيدك |

---

## ٢. ضيف: [["a"]]

~~~python op.py
with open(p, "a", encoding="utf-8") as f:
    print("سطر بـ print", file=f)
~~~

[["a"]] = append: اكتب في **الآخر** من غير ما تمسح. و [[print(..., file=f)]] بيكتب في الملف بدل الشاشة، وبيزوّد [[\n]] لوحده.

---

## ٣. اقرا سطر سطر

~~~python op.py
with open(p, encoding="utf-8") as f:
    for n, line in enumerate(f, 1):
        print(n, line.rstrip("\n"))
~~~

- من غير mode = [["r"]] (قراية).
- [[for line in f]]: الملف المفتوح بيتلف عليه سطر سطر، من غير ما يتحمّل كله في الذاكرة.
- [[enumerate(f, 1)]]: بيدّي كل عنصر ومعاه رقم، يبدأ من 1. جربت [[list(enumerate(["a","b"], 1))]] وطلع [[[(1, 'a'), (2, 'b')] ]].
- [[line.rstrip("\n")]]: كل سطر جاي ومعاه [[\n]] في آخره، و [[rstrip]] (**r**ight strip) بيشيله من اليمين، عشان print متطبعش سطر فاضي زيادة.

~~~text الناتج
1 السلام عليكم
2 سطر تاني
3 سطر بـ print
~~~

---

## ٤. الملف من جوه: bytes

~~~python op.py
print(p.read_bytes()[:8])
~~~

[[read_bytes()]] بيقرا الملف من غير أي encoding، و [[[:8] ]] أول 8 bytes:

~~~text الناتج
b'\xd8\xa7\xd9\x84\xd8\xb3\xd9\x84'
~~~

[[b'...']] يعني bytes، و [[\xd8]] byte واحد مكتوب بالـ hex. الـ 8 دول هم أول ٤ حروف بس ([[السل]]): UTF-8 بيكتب كل حرف عربي في **2 bytes**. [[ا]] = [[\xd8\xa7]]، و [[ل]] = [[\xd9\x84]]. عشان كده [[len("السلام".encode())]] طلع 12 مش 6.

والملف كله على لينكس 58 byte، وعلى ويندوز 61. الفرق 3 = عدد السطور: في وضع النص ويندوز بيكتب كل [[\n]] كـ [[\r\n]] (شفت الـ bytes [[13 10]] في آخر أول سطر)، ولما تقرا بيرجّعها [[\n]].

---

## ٥. نفس الـ bytes بـ encoding غلط

~~~python op.py
print(p.read_text(encoding="cp1256")[:12])
~~~

[[cp1256]] الـ encoding القديم بتاع ويندوز العربي. هو بيعتبر كل byte حرف لوحده، فكل حرف عربي (2 bytes) بيطلع حرفين غلط:

~~~text الناتج
ط§ظ„ط³ظ„ط§ظ…
~~~

مفيش error، وده الخطير. لو شفت الشكل ده ([[ط§ظ„]]...) في أي مكان، اعرف على طول: **ملف UTF-8 اتقرا كـ cp1256**.

---

## ٦. [["x"]]: اعمل بس لو مش موجود

~~~python op.py
with open("once.txt", "x", encoding="utf-8") as f:
    f.write("created once\n")
~~~

أول تشغيل عمل الملف. التاني وقع:

~~~text الناتج (آخر سطر)
FileExistsError: [Errno 17] File exists: 'once.txt'
~~~

ولاحظ إن [[ar.txt]] فضل ٣ سطور مش ٦ (طلع [[3 ar.txt]] من [[wc -l]])، لأن [["w"]] مسحه في أول كل تشغيل.

| الـ mode | الملف مش موجود | الملف موجود |
|---|---|---|
| [["r"]] | [[FileNotFoundError]] | يقرا |
| [["w"]] | يعمله | **يمسحه** ويكتب |
| [["a"]] | يعمله | يكتب في الآخر |
| [["x"]] | يعمله | [[FileExistsError]] |
| [["rb"]] / [["wb"]] | زي r و w بس bytes من غير encoding | |

---

## ٧. اللي في «جرّب»

### الطباعة بـ encoding مش UTF-8

[[PYTHONIOENCODING]] متغير بيئة بيحدد encoding الـ print. بـ [[cp1252]] (ويندوز الإنجليزي، ومفيهوش حروف عربي أصلًا):

~~~text الناتج (لينكس و PowerShell 7)
UnicodeEncodeError: 'charmap' codec can't encode characters in position 0-3: character maps to <undefined>
~~~

[[position 0-3]] هي الأربع حروف بتوع «سلام».

### الـ BOM

~~~text الناتج
encoding="utf-8"      →  '﻿name\n'
encoding="utf-8-sig"  →  'name\n'
~~~

الـ 3 bytes [[\xef\xbb\xbf]] (اسمهم BOM) Notepad القديم و Excel بيحطوهم في أول الملف. [[utf-8]] بيقراهم حرف خفي [[﻿]] لازق في أول كلمة، و [[utf-8-sig]] بيشيلهم.

### الـ encoding الافتراضي على الجهاز ده

[[python -c "import locale; print(locale.getencoding())"]] على ويندوز ده طلع [[cp65001]] (يعني UTF-8) لأن إعداد «Beta: Use Unicode UTF-8» مفعّل. على أغلب أجهزة ويندوز التانية هيطلع [[cp1256]] أو [[cp1252]]. عشان كده اكتب [[encoding="utf-8"]] دايمًا ومتعتمدش على الجهاز.

---

## الخلاصة

- الملف bytes، والـ encoding هو اللي بيحوّل. اكتب [[encoding="utf-8"]] في **كل** open و read_text و write_text.
- [[ط§ظ„]] = UTF-8 اتقرا بـ cp1256. و [[﻿]] في أول كلمة = BOM، استخدم [[utf-8-sig]].
- [["w"]] بيمسح، و [["a"]] بيضيف، و [["x"]] بيحمي.`,
          lines: [
            "Path.",
            "الملف.",
            "افتح للكتابة (بيمسح أي محتوى قديم).",
            "اكتب سطر، و \\n لازم بإيدك.",
            "سطر تاني.",
            "افتح للإضافة في الآخر.",
            "print تقدر تكتب في ملف.",
            "افتح للقراية.",
            "لف سطر سطر ومعاه رقمه من 1.",
            "اطبع من غير الـ \\n اللي في آخر السطر.",
            "أول 8 bytes زي ما هي على الديسك.",
            "نفس الملف لو اتقرا بـ cp1256 (encoding ويندوز العربي).",
            "x: اكتب بس لو الملف مش موجود.",
            "اكتب."
          ],
          sol: R`أول مرة (نفس الناتج بالظبط على أوبونتو وعلى ويندوز بـ Python 3.14):

[[1 السلام عليكم]] و [[2 سطر تاني]] و [[3 سطر بـ print]]
[[b'\xd8\xa7\xd9\x84\xd8\xb3\xd9\x84']]
[[ط§ظ„ط³ظ„ط§ظ…]]

تاني مرة بيطبع نفس الكلام وبعدين يقع: [[FileExistsError: [Errno 17] File exists: 'once.txt']]. ده بالظبط فايدة [["x"]]. (و ar.txt رجع 3 سطور مش 6، لأن [["w"]] مسحه في الأول.)

[[PYTHONIOENCODING=cp1252]]: [[UnicodeEncodeError: 'charmap' codec can't encode characters in position 0-3: character maps to <undefined>]]. وده نفس اللي بيحصل لو كتبت عربي بـ [[write_text(..., encoding="cp1252")]].

والـ BOM: [[utf-8]] رجّع [['\ufeffname\n']] و [[utf-8-sig]] رجّع [['name\n']]. لو قريت CSV جاي من Excel بـ utf-8 بس، أول عمود هيبقى اسمه [['\ufeffname']] و [[row["name"] ]] هيطلع KeyError.`
        },
        {
          cmd: "shutil copy و move و rmtree",
          title: "انسخ وانقل وامسح فولدرات من غير كوارث",
          desc: R`[[shutil]] للعمليات اللي pathlib مبيعملهاش: [[copy2]] ينسخ ملف ومعاه وقت التعديل، و [[copytree]] ينسخ فولدر كامل (و [[ignore_patterns]] يستبعد حاجات)، و [[move]] ينقل ملف أو فولدر، و [[rmtree]] يمسح فولدر بكل اللي جواه.

[[rmtree]] مفيهوش سلة محذوفات ولا سؤال. فأي سكربت بيمسح لازم يتأكد إن المسار جوه المكان المسموح، قبل ما يمسح.`,
          example: R`import shutil
import sys
from pathlib import Path
src = Path("project")
shutil.copy2(src / "app.py", src / "app.py.bak")
shutil.copytree(src, "backup/project", dirs_exist_ok=True, ignore=shutil.ignore_patterns(".venv", "__pycache__", "*.bak"))
shutil.move(src / "app.py.bak", "backup/app.py.bak")
print(sorted(str(p) for p in Path("backup").rglob("*")))
def safe_rmtree(target: Path, base: Path) -> None:
    target, base = target.resolve(), base.resolve()
    if target == base or base not in target.parents:
        sys.exit(f"refusing to delete {target}: not inside {base}")
    shutil.rmtree(target)
    print("deleted", target.relative_to(base.parent))
safe_rmtree(Path("backup/project"), Path("backup"))
print(f"{shutil.disk_usage('.').free / 2**30:.1f} GB free")
safe_rmtree(Path("backup/../.."), Path("backup"))`,
          try: R`جهّز: [[mkdir -p project/__pycache__ project/.venv/lib && echo 'print(1)' > project/app.py]] (في PowerShell: [[mkdir project/__pycache__, project/.venv/lib]] وبعدين [['print(1)' | Set-Content project/app.py]]). شغّل السكربت. وبعدين اكتب [[echo NEW > project/app.py]] وشغّله تاني وبص على [[backup/app.py.bak]]. وجرّب في Python: [[Path("")]] بيطلع إيه، و [[Path("").resolve()]].`,
          flag: "script danger",
          deep: {
            why: "سكربت backup أو تنضيف فيه rmtree على متغير غلط ممكن يمسح مشروعك أو الـ home كله في ثانية، ومفيش undo. الحماية لازم تبقى في الكود نفسه، مش في إنك «هتاخد بالك».",
            how: R`[[copy2]] زي [[cp -p]]: المحتوى ووقت التعديل والصلاحيات. و [[copy]] المحتوى والصلاحيات بس. لو الهدف فولدر، الملف بيتنسخ جواه.

[[copytree(src, dst)]] بيرفض لو dst موجود، إلا مع [[dirs_exist_ok=True]] (بيكتب فوق الملفات اللي بنفس الاسم). و [[ignore_patterns]] بأسماء أو patterns.

[[move]]: لو نفس الـ disk بيعمل rename سريع، ولو disk تاني بينسخ ويمسح. ولو الهدف ملف موجود بيكتب فوقه من غير ما يسأل، وده اللي هتشوفه في التمرين.

[[safe_rmtree]]: [[resolve()]] الأول عشان [[..]] والـ symlinks يتفكوا ونقارن المسار الحقيقي. وبعدين [[base in target.parents]] يعني الهدف جوه base فعلًا، و [[target == base]] يمنع مسح base نفسه. [[backup/../..]] شكلها جوه backup بس هي فعلًا فوقه بفولدرين.

[[rmtree]] على ويندوز بيقع على ملفات read-only (زي اللي جوه [[.git/objects]]) بـ [[PermissionError]]، والحل [[onexc]] (Python 3.12+) تشيل read-only وتجرّب تاني. ولو عايز سلة محذوفات بجد: مكتبة [[send2trash]].

[[disk_usage]] بيرجّع total و used و free بالبايت، مفيد تتأكد إن فيه مساحة قبل backup كبير.`,
            when: "backup وتنضيف ونقل مشاريع. وأي rmtree، من غير استثناء، يبقى وراه فحص زي safe_rmtree ووضع dry-run.",
            mistakes: R`[[shutil.rmtree(Path(folder))]] و [[folder]] طلع فاضي: [[Path("")]] هو [[.]]، يعني الفولدر الحالي كله. ومسار جاي من config أو argument من غير فحص. و [[move]] فوق ملف موجود. و [[copytree]] لفولدر جوه نفسه (backup جوه project) فيلف لحد ما المساحة تخلص.`
          },
          teach: R`## السكربت ده بيعمل إيه؟

بيعمل backup صغير لفولدر [[project]]: ينسخ ملف، وينسخ الفولدر كله من غير الحاجات اللي ملهاش لازمة، وينقل ملف، وبعدين يمسح فولدر **بعد ما يتأكد إنه في المكان المسموح**، وفي الآخر يحاول يمسح مسار بره المسموح فيرفض. اتشغّل في فولدر [[lab]] جواه [[project/app.py]] و [[project/__pycache__]] و [[project/.venv/lib]]، على لينكس ([[docker run --rm python:3.13]]) وعلى ويندوز في PowerShell 7.

---

## ١. [[shutil.copy2]]: انسخ ملف

~~~python sh.py
src = Path("project")
shutil.copy2(src / "app.py", src / "app.py.bak")
~~~

[[shutil]] من **shell utilities**: العمليات اللي بتعملها في الشيل بـ cp و mv و rm. و [[copy2]] بينسخ المحتوى **ووقت التعديل** والصلاحيات. خليت [[app.py]] تاريخه [[2026-09-01 12:00]]، والنسخة طلعت بنفس التاريخ. ([[shutil.copy]] من غير 2 كان هيدّيها وقت النسخ.)

---

## ٢. [[shutil.copytree]]: انسخ فولدر كامل

~~~python sh.py
shutil.copytree(src, "backup/project", dirs_exist_ok=True, ignore=shutil.ignore_patterns(".venv", "__pycache__", "*.bak"))
~~~

| الحتة | معناها |
|---|---|
| [[copytree(src, "backup/project")]] | انسخ الفولدر بكل اللي جواه، واعمل [[backup/]] لو مش موجود |
| [[dirs_exist_ok=True]] | لو الهدف موجود كمّل واكتب فوق الملفات اللي بنفس الاسم. من غيره بيقع بـ [[FileExistsError]] تاني مرة |
| [[ignore=shutil.ignore_patterns(...)]] | متنسخش أي حاجة اسمها ماشي على الـ patterns دي |
| [[".venv"]] و [["__pycache__"]] | فولدرات بتتعمل من تاني، ملهاش لازمة في backup |
| [["*.bak"]] | أي ملف آخره [[.bak]]، فالنسخة اللي لسه عاملينها متتنسخش مرتين |

---

## ٣. [[shutil.move]]: انقل

~~~python sh.py
shutil.move(src / "app.py.bak", "backup/app.py.bak")
print(sorted(str(p) for p in Path("backup").rglob("*")))
~~~

[[move]] زي [[mv]]: لو نفس الديسك بيغيّر الاسم بس (سريع)، ولو ديسك تاني بينسخ ويمسح الأصل. والسطر التاني بيطبع كل اللي في backup:

~~~text الناتج (لينكس)
['backup/app.py.bak', 'backup/project', 'backup/project/app.py']
~~~

مفيش [[.venv]] ولا [[__pycache__]] ولا [[.bak]] جوه [[backup/project]]. وعلى ويندوز نفس اللستة بـ [[\\]] ([[backup\\project]]): ده شكل طباعة الـ list، والمسار فيه [[\]] واحدة.

### فخ: move بيكتب فوق من غير ما يسأل

غيّرت [[app.py]] لـ [[NEW]] وشغّلت السكربت تاني، و [[cat backup/app.py.bak]] طلع:

~~~text الناتج
NEW
~~~

النسخة القديمة راحت من غير ولا كلمة.

---

## ٤. [[safe_rmtree]]: المسح بحماية

~~~python sh.py
def safe_rmtree(target: Path, base: Path) -> None:
    target, base = target.resolve(), base.resolve()
    if target == base or base not in target.parents:
        sys.exit(f"refusing to delete {target}: not inside {base}")
    shutil.rmtree(target)
    print("deleted", target.relative_to(base.parent))
~~~

[[shutil.rmtree]] (**r**e**m**ove **tree**) بيمسح فولدر بكل اللي جواه، من غير سلة محذوفات ومن غير سؤال. عشان كده الدالة دي بتفحص الأول:

### الخطوة ١: [[resolve()]]

حوّل الاتنين لمسار كامل حقيقي، فـ [[..]] والـ symlinks يتفكّوا. من غيرها [[backup/../..]] شكلها بتبدأ بـ [[backup]].

~~~text الناتج: Path("backup/../..").resolve() و Path("backup").resolve()
/home/sara  /home/sara/lab/backup
~~~

### الخطوة ٢: [[target.parents]]

[[parents]] كل الفولدرات اللي فوق المسار، لحد الجذر:

~~~text الناتج: Path("/home/sara/lab/backup/project").parents
['/home/sara/lab/backup', '/home/sara/lab', '/home/sara', '/home', '/']
~~~

فـ [[base in target.parents]] يعني «base واحد من الفولدرات اللي فوق الهدف»، يعني الهدف **جوه** base. لـ [[backup/project]] ده True. ولـ [[/home/sara]] طلع False.

### الخطوة ٣: [[target == base]]

يمنع مسح base نفسه (base مش من الـ parents بتاعته، بس نكتبها صريحة).

لو أي شرط اتكسر: [[sys.exit]] برسالة و exit 1 قبل ما [[rmtree]] يتنادى.

### التشغيل

~~~text الناتج (لينكس)
deleted backup/project
929.9 GB free
refusing to delete /home/sara: not inside /home/sara/lab/backup
~~~

و exit 1. [[relative_to(base.parent)]] بيطبع المسار من عند [[lab]]، عشان السطر يبقى قصير.

---

## ٥. [[shutil.disk_usage]]

~~~python sh.py
print(f"{shutil.disk_usage('.').free / 2**30:.1f} GB free")
~~~

[[disk_usage]] بيرجّع 3 أرقام بالـ byte:

~~~text الناتج: print(shutil.disk_usage("."))
usage(total=1081101176832, used=27657986048, free=998450835456)
~~~

[[2**30]] يعني 2 أُس 30 = [[1073741824]] = 1 GB، فالقسمة بتحوّل لجيجا. (الرقم في لينكس هنا كبير لأنه ديسك الماكينة الافتراضية بتاعة Docker، وعلى ويندوز طلع الفاضي في درايف C.)

---

## ٦. ليه الحماية دي مش رفاهية: [[Path("")]]

~~~text الناتج
Path("")                        →  PosixPath('.')    (وعلى ويندوز WindowsPath('.'))
Path("").resolve() == Path.cwd() →  True
~~~

لو متغير جه فاضي من config أو argument، [[shutil.rmtree(Path(""))]] هيمسح **الفولدر اللي انت فيه**. الفحص بعد [[resolve()]] بيمسك ده.

---

## الخلاصة

| الدالة | زي | ملاحظة |
|---|---|---|
| [[copy2]] | [[cp -p]] | بوقت التعديل |
| [[copytree]] | [[cp -r]] | [[dirs_exist_ok]] و [[ignore_patterns]] |
| [[move]] | [[mv]] | بيكتب فوق من غير سؤال |
| [[rmtree]] | [[rm -rf]] | مفيش undo |
| [[disk_usage]] | [[df]] | بالـ byte |

- أي [[rmtree]] يسبقه [[resolve()]] وفحص إن الهدف جوه base.`,
          lines: [
            "shutil.",
            "sys للخروج.",
            "Path.",
            "الفولدر الأصلي.",
            "نسخة من ملف ومعاها وقت التعديل.",
            "انسخ الفولدر كله من غير .venv و __pycache__ و .bak.",
            "انقل ملف.",
            "اطبع اللي اتنسخ.",
            "دالة مسح بحماية:",
            "المسار الحقيقي للاتنين (من غير .. ولا symlinks).",
            "لو الهدف هو base نفسه أو بره base:",
            "ارفض واخرج.",
            "امسح الفولدر بكل اللي فيه.",
            "اطبع اللي اتمسح.",
            "مسح مسموح: جوه backup.",
            "المساحة الفاضية بالـ GB.",
            "مسح مرفوض: المسار ده فوق backup."
          ],
          sol: R`أول تشغيل، وانا واقف في [[/home/sara/lab]] (الفولدر اللي فيه [[project]]):

[[['backup/app.py.bak', 'backup/project', 'backup/project/app.py'] ]]: من غير .venv ولا __pycache__.
[[deleted backup/project]]
[[69.3 GB free]] (الرقم على حسب جهازك)
[[refusing to delete /home/sara: not inside /home/sara/lab/backup]] و exit 1. [[backup/../..]] طلعت الفولدر اللي فوق lab نفسه، والفحص مسكها.

وعلى ويندوز نفس النتيجة بـ [[\]]: [[['backup\\app.py.bak', 'backup\\project', ...] ]] و [[deleted backup\project]] و [[refusing to delete C:\Users\sara: not inside C:\Users\sara\lab\backup]].

بعد [[echo NEW > project/app.py]] والتشغيل التاني: [[cat backup/app.py.bak]] طلع [[NEW]]. الـ move كتب فوق النسخة القديمة من غير ولا كلمة. لو النسخ القديمة مهمة، حط تاريخ في الاسم (درس «datetime وأسماء الملفات» في المستوى ٢) أو افحص [[exists()]] الأول.

و [[Path("")]] طلع [[PosixPath('.')]] (وعلى ويندوز [[WindowsPath('.')]])، و [[Path("").resolve() == Path.cwd()]] طلع [[True]]. يعني [[rmtree(Path(""))]] بيمسح الفولدر اللي انت فيه. عشان كده الفحص بيتعمل على المسار بعد resolve.`
        }
      ]
    }
]);
