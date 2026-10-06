// تكملة تاب python: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/python/01.js (شرح حقول الدرس في أوله)
MORE("python", [
    {
      t: "سكربتات أتمتة كاملة",
      l: 2,
      n: "سكربتات حقيقية من أولها لآخرها: ترتيب Downloads، وتغيير أسماء بالجملة، وملفات مكررة، وتنضيف القديم، وتقرير CSV، ومراقبة مواقع، و backup، وتصغير صور، وإيميل",
      items: [
        {
          cmd: "organize_downloads.py",
          title: "رتّب فولدر Downloads حسب نوع الملف",
          desc: R`أول سكربت أتمتة بيكتبه أغلب الناس: فولدر Downloads فيه مئات الملفات، والسكربت بينقل كل ملف لفولدر حسب نوعه: Images و Documents و Archives و Videos و Installers و Other.

التفاصيل اللي بتفرق بين سكربت لعبة وسكربت تستخدمه بجد: الافتراضي عرض بس ([[--apply]] للنقل)، وملف بنفس الاسم موجود في الفولدر الهدف ميتمسحش (بيبقى [[logo (1).png]])، والملفات اللي لسه بتتحمّل ([[.part]] و [[.crdownload]]) والملفات المخفية بتتساب.`,
          example: R`#!/usr/bin/env python3
"""Sort a folder into subfolders by file type. Dry run unless --apply."""
import argparse
import shutil
from pathlib import Path
GROUPS = {
    "Images": {".jpg", ".jpeg", ".png", ".gif", ".webp", ".heic"},
    "Documents": {".pdf", ".docx", ".xlsx", ".pptx", ".txt", ".csv"},
    "Archives": {".zip", ".rar", ".7z", ".gz", ".tar"},
    "Videos": {".mp4", ".mkv", ".mov"},
    "Installers": {".exe", ".msi", ".deb", ".dmg", ".appimage"},
}
SKIP = {".part", ".crdownload", ".tmp"}
def group_of(p: Path) -> str:
    ext = p.suffix.lower()
    return next((name for name, exts in GROUPS.items() if ext in exts), "Other")
def free_name(target: Path) -> Path:
    candidate, n = target, 1
    while candidate.exists():
        candidate = target.with_name(f"{target.stem} ({n}){target.suffix}")
        n += 1
    return candidate
def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("folder", nargs="?", default="~/Downloads")
    ap.add_argument("--apply", action="store_true", help="really move the files")
    args = ap.parse_args()
    folder = Path(args.folder).expanduser()
    count = 0
    for p in sorted(folder.iterdir()):
        if not p.is_file() or p.name.startswith(".") or p.name.lower() in ("desktop.ini", "thumbs.db") or p.suffix.lower() in SKIP:
            continue
        target = free_name(folder / group_of(p) / p.name)
        print(f"{'move' if args.apply else 'would move'}: {p.name} -> {target.relative_to(folder)}")
        if args.apply:
            target.parent.mkdir(exist_ok=True)
            shutil.move(p, target)
        count += 1
    print(f"{count} files" + ("" if args.apply else " (dry run, add --apply to move them)"))
if __name__ == "__main__":
    main()`,
          try: R`متجربش على Downloads الحقيقي الأول. اعمل فولدر تجربة: [[mkdir -p dl/Images && cd dl && touch cv.pdf "Photo 1.JPG" logo.png setup.exe movie.mkv data.tar.gz notes.TXT song.mp3 big.iso.part .hidden Images/logo.png && cd ..]]. شغّل [[python3 organize_downloads.py dl]]، وبعدين بـ [[--apply]]، وبعدين من غير [[--apply]] تاني. وبعدين ضيف [[.mp3]] لمجموعة جديدة [[Music]]. على ويندوز PowerShell: [[mkdir dl/Images]]، وبعدين جوه dl [[New-Item cv.pdf, "Photo 1.JPG", logo.png, ...]] بنفس الأسماء مفصولة بفواصل.`,
          flag: "script",
          deep: {
            why: "Downloads بيتملي من غير ما تحس، وتدوّر على PDF وسط ٤٠٠ ملف. السكربت ده بيترتب في ثانية، ولو اتجدول (المستوى ٣) يفضل مترتب لوحده.",
            how: R`[[GROUPS]] dict من اسم الفولدر لـ set امتدادات. البحث في set سريع، وإضافة نوع جديد سطر واحد.

[[next((... for ...), "Other")]]: أول مجموعة الامتداد فيها، أو [["Other"]] لو مفيش.

[[free_name]]: طول ما الاسم موجود جرّب [[(1)]] و [[(2)]]، دايمًا من الاسم الأصلي (عشان ميبقاش [[logo (1) (2).png]]).

[[nargs="?"]] الـ positional اختياري وليه default. و [[description=__doc__]] الـ help بياخد الـ docstring.

[[sorted(folder.iterdir())]] بيعمل list الأول، فإنشاء فولدرات جديدة جوه نفس الفولدر وانت بتلف مش بيلخبط اللفة. و [[p.is_file()]] بيسيب الفولدرات (ومنها اللي السكربت عملها).

[[shutil.move]] مش [[rename]]: لو الفولدر الهدف على disk تاني، rename بيفشل و move بينسخ ويمسح. وفي الـ dry run الأسماء محسوبة على الموجود فعلًا، فملفين بنفس الاسم في الفولدر الأصلي مش هيوضحوا هناك (مش ممكن أصلًا في نفس الفولدر).`,
            when: "Downloads و Desktop وفولدر الـ screenshots، وأي فولدر بيستقبل ملفات من برّه.",
            mistakes: R`تشغيله بالـ apply على طول على Downloads الحقيقي. ونقل ملف لسه بيتحمّل فالتحميل يفشل. وتنسى الملفات المخفية: على الماك ولينكس اسمها بيبدأ بنقطة ([[.DS_Store]])، فـ [[startswith(".")]] كفاية. بس على ويندوز «مخفي» ده خاصية في الملف مش نقطة في الاسم، و Downloads فيه [[desktop.ini]] مخفي (اتأكدت على ويندوز 11)، ومن غير سطر الفحص بتاعه كان السكربت هينقله لـ Other ويبوّظ شكل الفولدر في Explorer. والمقارنة بـ [[p.suffix]] من غير [[lower()]].`
          },
          teach: R`## السكربت بيعمل إيه؟

بيلف على الملفات اللي في فولدر واحد، ويعرف نوع كل ملف من امتداده ([[.pdf]] و [[.jpg]] ...)، ويقرر هيروح أنهي فولدر فرعي. ومن غير [[--apply]] بيطبع الخطة بس، ومبيحركش حاجة. هنقراه من فوق لتحت، حتة حتة.

---

## ١. أول سطرين

~~~python
#!/usr/bin/env python3
"""Sort a folder into subfolders by file type. Dry run unless --apply."""
~~~

- السطر الأول اسمه **shebang**: على لينكس والماك بيقول للنظام «شغّل الملف ده بـ [[python3]]»، فتقدر تكتب [[./organize_downloads.py]] بعد [[chmod +x]]. ويندوز بيتجاهله.
- السطر التاني **docstring**: نص بين ٣ علامات تنصيص في أول الملف. Python بيحطه في متغير جاهز اسمه [[__doc__]]، وهنستخدمه تحت كوصف في الـ help.

## ٢. الـ imports

~~~python
import argparse
import shutil
from pathlib import Path
~~~

| الموديول | بنستخدمه في إيه |
|---|---|
| [[argparse]] | يقرا الـ arguments زي [[dl]] و [[--apply]] ويعمل [[--help]] لوحده |
| [[shutil]] | عمليات الملفات الكبيرة، ومنها [[shutil.move]] (النقل) |
| [[Path]] من [[pathlib]] | المسار كـ object: اسمه وامتداده وفولدره من غير ما تقطّع نصوص |

---

## ٣. جدول الأنواع: [[GROUPS]] و [[SKIP]]

~~~python
GROUPS = {
    "Images": {".jpg", ".jpeg", ".png", ".gif", ".webp", ".heic"},
    ...
}
SKIP = {".part", ".crdownload", ".tmp"}
~~~

- [[GROUPS]] **dict**: مفتاح ← قيمة. المفتاح اسم الفولدر ([["Images"]])، والقيمة **set** امتدادات.
- الـ set هي الأقواس المعقوفة من غير [[:]]. مجموعة من غير تكرار، والسؤال [[".png" in {...}]] فيها سريع جدًا.
- الاسم بحروف كابيتال كله ([[GROUPS]]) عُرف في Python معناه «ثابت، محدش يغيّره».
- [[SKIP]] امتدادات ملفات لسه بتتحمّل: [[.part]] (فايرفوكس) و [[.crdownload]] (كروم)، و [[.tmp]] الملفات المؤقتة.

---

## ٤. الدالة [[group_of]]: الملف ده نوعه إيه؟

~~~python
def group_of(p: Path) -> str:
    ext = p.suffix.lower()
    return next((name for name, exts in GROUPS.items() if ext in exts), "Other")
~~~

### [[p: Path]] و [[-> str]]

دي **type hints**: ملاحظة بتقول إن [[p]] من نوع [[Path]] والدالة بترجّع نص. Python مش بيفرضها، بس المحرر بيستفيد منها وبتوضّح الكود.

### [[p.suffix.lower()]]

[[suffix]] الامتداد بالنقطة، وبيبقى **آخر** امتداد بس. جربتها في [[python:3.13-slim]] على Docker:

~~~python
Path("Photo 1.JPG").suffix        # '.JPG'
Path("data.tar.gz").suffix        # '.gz'
Path("data.tar.gz").suffixes      # ['.tar', '.gz']
~~~

و [[.lower()]] بتخلي [[.JPG]] تبقى [[.jpg]]، وإلا مش هتلاقيها في الـ set (الـ set فيها حروف صغيرة بس). وعشان [[data.tar.gz]] امتداده [[.gz]]، بيروح Archives لأن [[.gz]] في المجموعة.

### [[next((...), "Other")]]: نفكها من جوه لبرة

1. [[GROUPS.items()]] بترجّع الأزواج: [[("Images", {...})]] ثم [[("Documents", {...})]] ... 
2. [[for name, exts in ...]] بتفك كل زوج لمتغيرين: [[name]] و [[exts]].
3. [[if ext in exts]] بتسيب بس المجموعة اللي فيها الامتداد.
4. [[name for ...]] جوه أقواس عادية اسمها **generator expression**: «طلّع الأسماء دي واحد واحد لما حد يطلبها».
5. [[next(generator, "Other")]] بتطلب **أول** واحد بس. ولو الـ generator خلص من غير ولا اسم، بترجّع الـ default [["Other"]] بدل ما ترمي error.

~~~text الناتج (جدول صغير فيه Images و Docs)
.pdf  ->  Docs
.mp3  ->  Other
~~~

---

## ٥. الدالة [[free_name]]: متكتبش فوق ملف موجود

~~~python
def free_name(target: Path) -> Path:
    candidate, n = target, 1
    while candidate.exists():
        candidate = target.with_name(f"{target.stem} ({n}){target.suffix}")
        n += 1
    return candidate
~~~

- [[candidate, n = target, 1]] تعيين لمتغيرين في سطر: [[candidate]] يبدأ بالاسم المطلوب و [[n]] بـ 1.
- [[while candidate.exists():]] طول ما فيه ملف بالاسم ده، جرّب اسم تاني.
- [[target.stem]] الاسم من غير الامتداد ([[logo]])، و [[target.suffix]] الامتداد ([[.png]]).
- [[with_name(...)]] نفس الفولدر، اسم جديد. فـ [[Images/logo.png]] بيبقى:

~~~text الناتج
Images/logo (1).png
~~~

- لاحظ إن الاسم الجديد بيتبني من [[target]] الأصلي مش من [[candidate]]، فالتجربة التانية [[logo (2).png]] مش [[logo (1) (2).png]].

---

## ٦. [[main]]: الـ arguments

~~~python
ap = argparse.ArgumentParser(description=__doc__)
ap.add_argument("folder", nargs="?", default="~/Downloads")
ap.add_argument("--apply", action="store_true", help="really move the files")
args = ap.parse_args()
~~~

| الحتة | معناها |
|---|---|
| [[ArgumentParser(description=__doc__)]] | الـ parser، ووصفه هو الـ docstring بتاع أول الملف |
| [["folder"]] | من غير [[--]] يبقى **positional**: بيتكتب لوحده ([[dl]]) |
| [[nargs="?"]] | الـ positional ده اختياري: صفر أو قيمة واحدة |
| [[default="~/Downloads"]] | لو متكتبش، خد ده |
| [["--apply"]] بـ [[action="store_true"]] | **flag**: لو اتكتب قيمته [[True]]، ولو لأ [[False]] |
| [[parse_args()]] | يقرا [[sys.argv]] ويرجّع object: [[args.folder]] و [[args.apply]] |

وده الـ help اللي argparse عمله لوحده:

~~~text python3 organize_downloads.py --help
usage: organize_downloads.py [-h] [--apply] [folder]

Sort a folder into subfolders by file type. Dry run unless --apply.

positional arguments:
  folder

options:
  -h, --help  show this help message and exit
  --apply     really move the files
~~~

### [[Path(args.folder).expanduser()]]

[[~]] معناها الـ home، بس دي حاجة الـ shell بيفهمها، و Python لأ. لما القيمة تيجي من الـ default مفيش shell فكها، فـ [[expanduser()]] بتفكها هي: في الـ container طلعت [[/root/Downloads]]، وعلى ويندوز [[C:\Users\ali\Downloads]].

---

## ٧. اللفة على الملفات

~~~python
for p in sorted(folder.iterdir()):
    if not p.is_file() or p.name.startswith(".") or p.name.lower() in ("desktop.ini", "thumbs.db") or p.suffix.lower() in SKIP:
        continue
~~~

- [[folder.iterdir()]] كل حاجة جوه الفولدر (ملفات وفولدرات)، مستوى واحد بس من غير ما يدخل جوه.
- [[sorted(...)]] بترتبهم وبتعمل منهم list كاملة **قبل** ما اللفة تبدأ. ده مهم لأننا هنعمل فولدرات جديدة جوه نفس الفولدر واحنا بنلف.
- شرط [[continue]] («سيبه وروح للي بعده») فيه ٤ حالات مربوطة بـ [[or]]، أي واحدة تكفي:

| الشرط | بيسيب إيه |
|---|---|
| [[not p.is_file()]] | الفولدرات، ومنها Images اللي موجود |
| [[p.name.startswith(".")]] | الملفات المخفية على لينكس والماك ([[.hidden]]) |
| [[p.name.lower() in ("desktop.ini", "thumbs.db")]] | ملفات ويندوز المخفية |
| [[p.suffix.lower() in SKIP]] | التحميلات اللي لسه مخلصتش ([[big.iso.part]]) |

### المكان الجديد والطباعة

~~~python
target = free_name(folder / group_of(p) / p.name)
print(f"{'move' if args.apply else 'would move'}: {p.name} -> {target.relative_to(folder)}")
~~~

- [[/]] بين Paths معناها «جوه»: [[dl / "Images" / "logo.png"]] = [[dl/Images/logo.png]]، وعلى ويندوز بتطلع بـ [[\]] لوحدها.
- [[f"..."]] **f-string**: أي حاجة بين [[{}]] بتتحسب وتتحط في النص.
- [['move' if args.apply else 'would move']] **conditional expression**: قيمة لو الشرط صح وقيمة لو غلط، في سطر واحد.
- [[target.relative_to(folder)]] المسار من غير أول الفولدر: [[Images/logo (1).png]] بدل المسار كله.

### النقل

~~~python
if args.apply:
    target.parent.mkdir(exist_ok=True)
    shutil.move(p, target)
count += 1
~~~

- [[target.parent]] الفولدر اللي الملف هيتحط فيه، و [[mkdir(exist_ok=True)]] يعمله، ومن غير error لو موجود.
- [[shutil.move]] بيعمل rename لو نفس الديسك، ولو ديسك تاني بينسخ ويمسح.
- [[count += 1]] بره الـ [[if]]: بيعد في الحالتين.

### آخر سطرين

~~~python
print(f"{count} files" + ("" if args.apply else " (dry run, add --apply to move them)"))
if __name__ == "__main__":
    main()
~~~

[[__name__]] بيبقى [["__main__"]] لما الملف يتشغّل مباشرة، وبيبقى اسم الموديول لو حد عمله import. كده الـ import مش بيحرك ملفات.

---

## ٨. التشغيل

جهزت فولدر التجربة اللي في «جرّب» في [[python:3.13-slim]] على Docker:

~~~bash
python3 organize_downloads.py dl
~~~

~~~text الناتج
would move: Photo 1.JPG -> Images/Photo 1.JPG
would move: cv.pdf -> Documents/cv.pdf
would move: data.tar.gz -> Archives/data.tar.gz
would move: logo.png -> Images/logo (1).png
would move: movie.mkv -> Videos/movie.mkv
would move: notes.TXT -> Documents/notes.TXT
would move: setup.exe -> Installers/setup.exe
would move: song.mp3 -> Other/song.mp3
8 files (dry run, add --apply to move them)
~~~

- [[logo (1).png]] لأن [[Images/logo.png]] كان موجود قبل كده.
- [[big.iso.part]] و [[.hidden]] مش في القايمة خالص.
- [[song.mp3]] راح Other لأن [[.mp3]] مش في أي مجموعة.

بعد [[--apply]] نفس السطور بـ [[move:]] و [[8 files]]، و [[ls -R dl]] بقى:

~~~text ls -R dl (مختصر)
dl:            Archives  Documents  Images  Installers  Other  Videos  big.iso.part
dl/Images:     Photo 1.JPG  logo (1).png  logo.png
dl/Documents:  cv.pdf  notes.TXT
~~~

والتشغيل التالت طبع [[0 files (dry run, add --apply to move them)]]: كل الملفات بقت جوه فولدرات، و [[is_file()]] بيسيب الفولدرات.

### على ويندوز

جربته في PowerShell بـ Python 3.14 في venv، ونفس الفولدر ومعاه [[desktop.ini]]:

| الفرق | لينكس | ويندوز |
|---|---|---|
| فاصل المسار | [[Images/logo (1).png]] | [[Images\logo (1).png]] |
| أول سطر | [[Photo 1.JPG]] (الكابيتال قبل الصغير) | [[cv.pdf]] (الترتيب مش حساس للحروف) |
| [[desktop.ini]] | — | اتساب |
| العدد | [[8 files]] | [[8 files]] |

---

## الخلاصة

| السطر | ليه موجود |
|---|---|
| [[p.suffix.lower()]] | [[.JPG]] و [[.jpg]] نفس النوع |
| [[next(..., "Other")]] | أول مجموعة تناسب، أو Other |
| [[free_name]] | ملف موجود ميتكتبش فوقه |
| [[sorted(folder.iterdir())]] | list ثابتة قبل ما الفولدرات الجديدة تتعمل |
| شرط [[continue]] | فولدرات ومخفي وتحميلات ناقصة |
| [[--apply]] | من غيره عرض بس |

والقاعدة اللي هتتكرر في كل سكربتات القسم ده: **أي سكربت بيحرّك أو يمسح ملفات، يبدأ بعرض الخطة، والتنفيذ بـ flag صريح.**`,
          lines: [
            "الوصف، وبيبقى الـ help.",
            "argparse.",
            "shutil.move.",
            "Path.",
            "اسم الفولدر -> الامتدادات:",
            "صور.",
            "مستندات.",
            "ملفات مضغوطة.",
            "فيديو.",
            "برامج.",
            "قفلة.",
            "ملفات لسه بتتحمّل أو مؤقتة: سيبها.",
            "المجموعة بتاعة ملف:",
            "الامتداد بحروف صغيرة.",
            "أول مجموعة فيها الامتداد، أو Other.",
            "اسم مش مستخدم في الفولدر الهدف:",
            "ابدأ بالاسم نفسه.",
            "طول ما هو موجود:",
            "جرّب name (1).ext و name (2).ext...",
            "زوّد العداد.",
            "رجّع أول اسم فاضي.",
            "main:",
            "الـ parser بالـ docstring.",
            "الفولدر اختياري، والافتراضي Downloads.",
            "النقل الحقيقي محتاج --apply.",
            "اقرا.",
            "فك ~.",
            "عداد.",
            "لكل حاجة في الفولدر، مترتبة:",
            "سيب الفولدرات، والمخفي (النقطة على لينكس وماك، و desktop.ini و thumbs.db بتوع ويندوز)، والتحميلات الناقصة.",
            "كمّل.",
            "المكان الجديد باسم مش مستخدم.",
            "اطبع هيعمل إيه أو عمل إيه.",
            "لو --apply:",
            "اعمل فولدر المجموعة.",
            "انقل.",
            "عد.",
            "الملخص.",
            "شغّل main لو اتشغّل مباشرة.",
            "نادي."
          ],
          sol: R`الـ dry run طبع:

[[would move: Photo 1.JPG -> Images/Photo 1.JPG]]
[[would move: cv.pdf -> Documents/cv.pdf]]
[[would move: data.tar.gz -> Archives/data.tar.gz]]
[[would move: logo.png -> Images/logo (1).png]]: فيه [[Images/logo.png]] قديم.
[[would move: movie.mkv -> Videos/movie.mkv]]
[[would move: notes.TXT -> Documents/notes.TXT]]
[[would move: setup.exe -> Installers/setup.exe]]
[[would move: song.mp3 -> Other/song.mp3]]
[[8 files (dry run, add --apply to move them)]]

ومحدش اتحرك. بعد [[--apply]] نفس السطور بـ [[move:]] و [[8 files]]، و [[big.iso.part]] و [[.hidden]] فضلوا مكانهم، و [[Images]] فيه [[logo.png]] و [[logo (1).png]] و [[Photo 1.JPG]]. والتشغيل التالت: [[0 files (dry run, add --apply to move them)]].

وعلى ويندوز نفس الـ 8، بس بترتيب تاني: [[cv.pdf]] الأول و [[Photo 1.JPG]] بعد [[notes.TXT]]، لأن ترتيب المسارات على ويندوز مش حساس لحالة الحروف (على لينكس الحروف الكابيتال قبل الصغيرة). والمسارات بـ [[\]]: [[Images\logo (1).png]]. وحطيت [[desktop.ini]] في فولدر التجربة: اتساب.

[[Music]]: سطر [["Music": {".mp3", ".m4a", ".wav", ".flac"},]] في GROUPS، و song.mp3 بقت [[Music/song.mp3]].`
        },
        {
          cmd: "batch_rename.py",
          title: "غيّر أسماء ملفات كتير مرة واحدة، بـ --dry-run",
          desc: R`صور رحلة بأسماء [[IMG_20260915_143210.JPG]] و [[WhatsApp Image 2026-09-16 at 10.15.jpeg]] عايزها [[2026-09-15_trip_001.jpg]]. السكربت بيطلّع التاريخ من الاسم بـ regex، ويرقّم، ويوحّد الامتداد.

والجزء المهم مش تغيير الاسم، ده الأمان: [[--dry-run]] يعرض الخطة بس، وقبل ما يغيّر أي حاجة بيتأكد إن مفيش اسمين هيبقوا واحد، ومفيش ملف موجود هيتكتب فوقه. يا كله يتغير يا ولا حاجة.`,
          example: R`#!/usr/bin/env python3
"""Rename files to DATE_PREFIX_NNN.ext, e.g. IMG_20260915_1432.JPG -> 2026-09-15_trip_001.jpg"""
import argparse
import re
import sys
from pathlib import Path
DATE = re.compile(r"(20\d{2})-?(\d{2})-?(\d{2})")
def new_name(p: Path, prefix: str, i: int) -> str:
    m = DATE.search(p.stem)
    date = f"{m[1]}-{m[2]}-{m[3]}_" if m else ""
    return f"{date}{prefix}_{i:03d}{p.suffix.lower()}"
def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("folder", type=Path)
    ap.add_argument("--prefix", default="photo")
    ap.add_argument("--glob", default="*", help='which files, e.g. "*.jpg" (default: all)')
    ap.add_argument("--dry-run", action="store_true", help="only print the plan")
    args = ap.parse_args(argv)
    files = sorted(p for p in args.folder.glob(args.glob) if p.is_file() and not p.name.startswith("."))
    plan = [(p, p.with_name(new_name(p, args.prefix, i))) for i, p in enumerate(files, 1)]
    plan = [(old, new) for old, new in plan if old != new]
    targets = [new for _, new in plan]
    sources = {old for old, _ in plan}
    if len(set(targets)) != len(targets):
        print("error: two files would get the same name", file=sys.stderr)
        return 1
    clash = [t for t in targets if t.exists() and t not in sources]
    if clash:
        print(f"error: {clash[0].name} already exists, nothing renamed", file=sys.stderr)
        return 1
    for old, new in plan:
        print(f"{old.name:<28} -> {new.name}")
    if args.dry_run:
        print(f"dry run: {len(plan)} files would be renamed")
        return 0
    temps = [(old.rename(old.with_name(f".renaming-{i}{old.suffix}")), new) for i, (old, new) in enumerate(plan)]
    for tmp, new in temps:
        tmp.rename(new)
    print(f"renamed {len(plan)} files")
    return 0
if __name__ == "__main__":
    sys.exit(main())`,
          try: R`[[mkdir trip && touch trip/IMG_20260915_143210.JPG trip/IMG_20260915_150001.jpg "trip/WhatsApp Image 2026-09-16 at 10.15.jpeg" trip/notes.txt]]. شغّل [[python3 batch_rename.py trip --prefix trip --glob "*.[jJ]*" --dry-run]]، وبعدين من غير --dry-run، وبعدين تاني. وبعدين حالة صعبة: [[mkdir sw && echo A > sw/a.jpg && echo B > sw/photo_001.jpg]] و [[python3 batch_rename.py sw]] واقرا محتوى الملفين بعدها. على ويندوز سطور التجهيز دي شغّلها في Git Bash، أو في PowerShell بـ [[New-Item]] و [[Set-Content]]. جربت السكربت على ويندوز وطلع نفس الخطة ونفس النتيجة في الحالة الصعبة.`,
          flag: "script",
          deep: {
            why: R`تغيير أسماء بالجملة من أخطر الحاجات: اسمين بقوا واحد = ملف اتمسح من غير ولا رسالة، لأن [[rename]] على لينكس وماك بيكتب فوق الموجود. وبعد ما تغيّر ٣٠٠ اسم مفيش undo.`,
            how: R`[[DATE]] بيلقط [[20260915]] و [[2026-09-15]] (الشرطة [[-?]] اختيارية). [[m[1] ]] أول group، و [[{i:03d}]] الرقم بـ 3 خانات ([[001]]) عشان الترتيب بالاسم يفضل صح بعد 9 و 99.

الخطة بتتحسب كلها الأول، والملفات اللي اسمها مش هيتغير بتتشال ([[old != new]])، فالتشغيل التاني مش بيعمل حاجة.

فحصين قبل أي تغيير: الأسماء الجديدة مفيهاش تكرار، ومفيش اسم جديد بيخص ملف موجود بره الخطة. لو أي فحص فشل يخرج بـ 1 من غير ما يلمس حاجة.

مرحلتين: كل ملف الأول بياخد اسم مؤقت ([[.renaming-0.jpg]])، وبعدين كله ياخد اسمه النهائي. ليه؟ لو [[a.jpg]] رايح لـ [[photo_001.jpg]] و [[photo_001.jpg]] رايح لـ [[photo_002.jpg]]، التغيير المباشر بالترتيب هيكتب a فوق photo_001 قبل ما photo_001 يتنقل، والـ B يضيع. و [[Path.rename]] بيرجّع الـ Path الجديد، فالـ list فيها الأسماء المؤقتة.

[[main(argv)]] عشان تختبره (المستوى ٣). و [[--glob "*.[jJ]*"]] كل امتداد بيبدأ بـ j أو J.`,
            when: "صور، وفواتير ممسوحة scan، وحلقات مسلسل، وأي مجموعة ملفات محتاجة أسماء موحدة.",
            mistakes: R`rename جوه الـ loop من غير ما تحسب الخطة كلها. و [[{i}]] من غير أصفار فـ [[photo_10]] ييجي قبل [[photo_2]]. ومن غير [[--dry-run]] على أول تجربة. و glob من غير فلتر فالسكربت يغيّر اسم نفسه لو هو في نفس الفولدر.`
          },
          teach: R`## السكربت بيعمل إيه؟

بياخد ملفات فولدر، ويحسب لكل واحد اسم جديد بالشكل [[DATE_PREFIX_NNN.ext]]. بس قبل ما يغيّر أي حاجة بيحسب **الخطة كلها** ويفحصها، ولو فيها مشكلة بيرفض من غير ما يلمس ولا ملف. هنمشي على الكود بالترتيب.

---

## ١. الـ regex بتاع التاريخ

~~~python
DATE = re.compile(r"(20\d{2})-?(\d{2})-?(\d{2})")
~~~

- [[re]] موديول الـ **regular expressions**: pattern بيدوّر على شكل نص.
- [[r"..."]] **raw string**: الـ [[\]] جواه بيفضل زي ما هو، فـ [[\d]] توصل للـ regex سليمة.
- [[re.compile]] بيجهّز الـ pattern مرة واحدة، وبعدين تستخدمه كتير.

نفك الـ pattern:

| الحتة | معناها |
|---|---|
| [[(20\d{2})]] | [[20]] وبعدها رقمين: السنة. الأقواس **group** رقم 1 |
| [[\d]] | أي رقم من 0 لـ 9، و [[{2}]] مرتين بالظبط |
| [[-?]] | شرطة اختيارية: [[?]] معناها «مرة أو ولا مرة» |
| [[(\d{2})]] | الشهر (group 2)، وبعده اليوم (group 3) |

جربته في [[python:3.13-slim]] على Docker:

~~~text الناتج
'IMG_20260915_143210'                -> ('20260915', '2026', '09', '15')
'WhatsApp Image 2026-09-16 at 10.15' -> ('2026-09-16', '2026', '09', '16')
'notes'                              -> None
~~~

الأول [[m[0] ]] (الحتة كلها اللي اتلقطت)، وبعدين الـ groups. ولو مفيش تاريخ، [[search]] بترجّع [[None]].

---

## ٢. [[new_name]]: الاسم الجديد لملف واحد

~~~python
def new_name(p: Path, prefix: str, i: int) -> str:
    m = DATE.search(p.stem)
    date = f"{m[1]}-{m[2]}-{m[3]}_" if m else ""
    return f"{date}{prefix}_{i:03d}{p.suffix.lower()}"
~~~

- [[p.stem]] الاسم من غير امتداد، فالـ regex ميلقطش حاجة من الامتداد.
- [[search]] بتدوّر في أي حتة من النص (مش من أوله بس زي [[match]]).
- [[m[1] ]] و [[m[2] ]] و [[m[3] ]] السنة والشهر واليوم، ونحطهم بشرط بينهم. و [[if m else ""]]: لو مفيش تاريخ يبقى من غير بادئة تاريخ.
- [[{i:03d}]] رقم صحيح ([[d]]) بعرض 3 خانات، والناقص أصفار ([[0]]): [[7]] بتبقى [[007]] و [[12]] بتبقى [[012]].
- [[p.suffix.lower()]] الامتداد بحروف صغيرة، فـ [[.JPG]] تبقى [[.jpg]].

ليه الأصفار؟ لأن الترتيب بالاسم حرف حرف: من غيرها [[photo_10]] ييجي قبل [[photo_2]].

---

## ٣. الـ arguments

~~~python
def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("folder", type=Path)
    ap.add_argument("--prefix", default="photo")
    ap.add_argument("--glob", default="*", help='which files, e.g. "*.jpg" (default: all)')
    ap.add_argument("--dry-run", action="store_true", help="only print the plan")
    args = ap.parse_args(argv)
~~~

- [[argv: list[str] | None = None]]: الدالة بتاخد list arguments اختيارية. لو [[None]]، [[parse_args]] بيقرا من سطر الأوامر. ولو اختبار بعتلها [[["trip", "--dry-run"] ]] بيقرا منها. كده تقدر تختبرها من غير terminal.
- [[type=Path]] argparse بيحوّل النص لـ [[Path]] لوحده.
- [["--dry-run"]] فيها شرطة، و argparse بيحوّلها لـ [[args.dry_run]] (بـ underscore) لأن الشرطة مينفعش تبقى في اسم متغير.
- الدالة بترجّع [[int]]: الـ exit code (0 نجح، 1 فشل).

---

## ٤. الخطة

~~~python
files = sorted(p for p in args.folder.glob(args.glob) if p.is_file() and not p.name.startswith("."))
plan = [(p, p.with_name(new_name(p, args.prefix, i))) for i, p in enumerate(files, 1)]
plan = [(old, new) for old, new in plan if old != new]
targets = [new for _, new in plan]
sources = {old for old, _ in plan}
~~~

### [[files]]

[[glob(args.glob)]] الملفات اللي اسمها ماشي على الـ pattern ([[*]] = أي حاجة). وبعدين الملفات بس، من غير المخفي، و [[sorted]] بترتبهم عشان الأرقام تمشي بترتيب ثابت.

### [[plan]]: list of tuples

- [[enumerate(files, 1)]] بيدي كل ملف رقم يبدأ من 1: [[(1, 'x'), (2, 'y')]].
- كل عنصر في الخطة **tuple** من اتنين: [[(القديم، الجديد)]].
- [[with_name]] نفس الفولدر، الاسم الجديد.

### السطر التاني

بيشيل أي ملف اسمه الجديد هو هو اسمه القديم. فلو شغّلت السكربت تاني على فولدر اتظبط، الخطة بتبقى فاضية ومحدش بيتلمس.

### [[targets]] و [[sources]]

- [[for _, new in plan]]: الـ [[_]] اسم متغير عادي، والعُرف إنه «مش محتاجه».
- [[targets]] list الأسماء الجديدة، و [[sources]] **set** (أقواس معقوفة) الأسماء القديمة، عشان [[t not in sources]] تحت تبقى سريعة.

---

## ٥. فحصين قبل أي تغيير

~~~python
if len(set(targets)) != len(targets):
    print("error: two files would get the same name", file=sys.stderr)
    return 1
clash = [t for t in targets if t.exists() and t not in sources]
if clash:
    print(f"error: {clash[0].name} already exists, nothing renamed", file=sys.stderr)
    return 1
~~~

### الفحص الأول: اسمين جداد زي بعض؟

[[set(targets)]] بيشيل التكرار. لو طوله أقل من الـ list، يبقى فيه اسم متكرر. مع الشكل ده عمليًا مش هيحصل لأن كل ملف رقمه مختلف، بس لو غيّرت [[new_name]] في يوم (شيلت الرقم مثلًا) هو اللي هيمسكك. و [[file=sys.stderr]] الرسالة تروح لقناة الأخطاء مش للناتج العادي.

### الفحص التاني: هنكتب فوق ملف موجود؟

اسم جديد **موجود فعلًا** و**مش** من الملفات اللي هتتنقل = ملف هيضيع. جربت ملف [[trip_001.png]] موجود و [[--glob "b.png"]]:

~~~text الناتج (exit 1)
error: trip_001.png already exists, nothing renamed
~~~

ليه [[t not in sources]]؟ لأن في حالة [[a.jpg -> photo_001.jpg]] و [[photo_001.jpg -> photo_002.jpg]]، الـ [[photo_001.jpg]] موجود بس هو نفسه هيتنقل، فده مش تعارض.

---

## ٦. العرض والـ dry run

~~~python
for old, new in plan:
    print(f"{old.name:<28} -> {new.name}")
if args.dry_run:
    print(f"dry run: {len(plan)} files would be renamed")
    return 0
~~~

[[{old.name:<28}]]: [[<]] محاذاة شمال، و [[28]] العرض، والباقي مسافات، فالأسهم تبقى تحت بعض. والاسم الأطول من 28 بيتطبع كامل ويزق السهم (زي سطر WhatsApp تحت).

---

## ٧. التغيير على مرحلتين

~~~python
temps = [(old.rename(old.with_name(f".renaming-{i}{old.suffix}")), new) for i, (old, new) in enumerate(plan)]
for tmp, new in temps:
    tmp.rename(new)
~~~

نفك السطر الطويل من جوه لبرة:

1. [[enumerate(plan)]] بيدي كل خطوة رقم من 0، و [[(old, new)]] بيفك الـ tuple.
2. [[old.with_name(f".renaming-{i}{old.suffix}")]] اسم مؤقت مخفي: [[.renaming-0.jpg]].
3. [[old.rename(...)]] بيغيّر الاسم **فعلًا**، وبيرجّع الـ Path الجديد.
4. الـ tuple [[(المؤقت، النهائي)]] بيتحط في [[temps]].

وبعدين اللفة التانية بتنقل كل مؤقت لاسمه النهائي.

### ليه مش [[old.rename(new)]] على طول؟

لأن [[rename]] على لينكس بيكتب فوق الموجود من غير ما يسأل، وعلى ويندوز بيرمي error. جربتهم الاتنين:

~~~text لينكس (Docker)
Path('a').rename('b')   ->  b  (و b بقى فيه A، والـ B ضاع)
~~~

~~~text ويندوز (Python 3.14)
FileExistsError [WinError 183] Cannot create a file when that file already exists: 'a' -> 'b'
~~~

ففي حالة [[a.jpg -> photo_001.jpg]] و [[photo_001.jpg -> photo_002.jpg]]، التغيير المباشر بالترتيب على لينكس كان هيكتب A فوق B. بالمرحلتين: الاتنين بيبقوا مؤقتين الأول، فمفيش حد بيدوس على حد.

---

## ٨. آخر الملف

~~~python
if __name__ == "__main__":
    sys.exit(main())
~~~

[[main()]] بترجّع رقم، و [[sys.exit]] بيخلّيه exit code للبرنامج، فـ [[echo $?]] يقول 0 أو 1.

---

## ٩. التشغيل

في [[python:3.13-slim]] على Docker بفولدر «جرّب»:

~~~bash
python3 batch_rename.py trip --prefix trip --glob "*.[jJ]*" --dry-run
~~~

~~~text الناتج
IMG_20260915_143210.JPG      -> 2026-09-15_trip_001.jpg
IMG_20260915_150001.jpg      -> 2026-09-15_trip_002.jpg
WhatsApp Image 2026-09-16 at 10.15.jpeg -> 2026-09-16_trip_003.jpeg
dry run: 3 files would be renamed
~~~

- [[--glob "*.[jJ]*"]]: [[[jJ] ]] حرف واحد [[j]] أو [[J]]، فاتاخدت الصور و [[notes.txt]] لأ.
- [[ls trip]] بعده: نفس الأسماء القديمة.

من غير [[--dry-run]] نفس الخطة و [[renamed 3 files]]، والتشغيل التالت [[renamed 0 files]]. والحالة الصعبة [[sw]]:

~~~text الناتج
a.jpg                        -> photo_001.jpg
photo_001.jpg                -> photo_002.jpg
renamed 2 files
~~~

و [[photo_001.jpg]] فيه [[A]] و [[photo_002.jpg]] فيه [[B]]. على ويندوز (PowerShell، Python 3.14) نفس الخطط ونفس المحتوى بالظبط.

---

## الخلاصة

| الخطوة | الكود | الهدف |
|---|---|---|
| ١ | [[DATE.search(p.stem)]] | التاريخ من الاسم |
| ٢ | [[{i:03d}]] | ترقيم بيترتب صح |
| ٣ | [[plan]] | الخطة كلها قبل أي تغيير |
| ٤ | [[old != new]] | التشغيل التاني ميعملش حاجة |
| ٥ | الفحصين | تكرار أو كتابة فوق ملف = رفض |
| ٦ | [[--dry-run]] | عرض بس |
| ٧ | المرحلتين | تبديل الأسماء من غير ما ملف يضيع |`,
          lines: [
            "الوصف.",
            "argparse.",
            "re.",
            "sys.",
            "Path.",
            "تاريخ بشرط أو من غير: 20260915 أو 2026-09-15.",
            "الاسم الجديد لملف:",
            "دوّر على تاريخ في الاسم.",
            "لو لقى، حطه في أول الاسم.",
            "التاريخ، والبادئة، والرقم بـ 3 خانات، والامتداد صغير.",
            "main بـ argv عشان الاختبار:",
            "الـ parser.",
            "الفولدر.",
            "البادئة.",
            "أنهي ملفات.",
            "عرض الخطة بس.",
            "اقرا.",
            "الملفات مترتبة، من غير المخفي.",
            "الخطة: (القديم، الجديد) لكل ملف.",
            "شيل اللي اسمه مش هيتغير.",
            "الأسماء الجديدة.",
            "الأسماء القديمة.",
            "فيه اسمين جداد زي بعض؟",
            "ارفض.",
            "اخرج من غير ما تلمس حاجة.",
            "اسم جديد موجود ومش من الملفات اللي هتتغير؟",
            "لو فيه:",
            "ارفض وقول مين.",
            "اخرج.",
            "اعرض الخطة.",
            "القديم -> الجديد.",
            "dry run؟",
            "قول العدد...",
            "...واخرج.",
            "مرحلة 1: كل ملف ياخد اسم مؤقت.",
            "مرحلة 2: من المؤقت للنهائي.",
            "غيّر.",
            "الملخص.",
            "نجح.",
            "لو اتشغّل مباشرة:",
            "شغّل ورجّع الكود."
          ],
          sol: R`الـ dry run:

[[IMG_20260915_143210.JPG      -> 2026-09-15_trip_001.jpg]]
[[IMG_20260915_150001.jpg      -> 2026-09-15_trip_002.jpg]]
[[WhatsApp Image 2026-09-16 at 10.15.jpeg -> 2026-09-16_trip_003.jpeg]]
[[dry run: 3 files would be renamed]]

و [[ls]] بعده نفس الأسماء القديمة. من غير --dry-run نفس الخطة و [[renamed 3 files]]. والتشغيل التالت [[renamed 0 files]] لأن الأسماء بقت صح.

الحالة الصعبة: [[a.jpg -> photo_001.jpg]] و [[photo_001.jpg -> photo_002.jpg]]، وبعدها [[photo_001.jpg]] فيه [[A]] و [[photo_002.jpg]] فيه [[B]]. ولا ملف ضاع. من غير المرحلتين، a كان هيتكتب فوق photo_001 الأول والـ B يروح.

وجربت تعارض حقيقي: ملف [[trip_001.png]] موجود و [[--glob "b.png"]]: [[error: trip_001.png already exists, nothing renamed]] و exit 1.`
        },
        {
          cmd: "find_duplicates.py",
          title: "دوّر على الملفات المكررة بالمحتوى",
          desc: R`نفس الصورة محفوظة 3 مرات بأسماء مختلفة في فولدرات مختلفة. الاسم مش دليل، والحجم مش كفاية. المحتوى هو اللي بيحدد، والطريقة السريعة: hash زي [[sha256]]. ملفين ليهم نفس الـ hash يبقوا نفس المحتوى.

والسكربت بيوفّر وقت: بيجمّع الملفات بالحجم الأول (مجرد [[stat]]، سريع)، ويحسب hash بس للملفات اللي حجمها متكرر. ملف حجمه فريد مستحيل يبقى ليه نسخة.`,
          example: R`#!/usr/bin/env python3
"""List duplicate files under a folder (same content, any name)."""
import hashlib
import sys
from collections import defaultdict
from pathlib import Path
Group = list[Path]
def sha256(path: Path, chunk: int = 1024 * 1024) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        while block := f.read(chunk):
            h.update(block)
    return h.hexdigest()
def find_duplicates(root: Path) -> list[Group]:
    by_size = defaultdict(list)
    for p in root.rglob("*"):
        if p.is_file() and not p.is_symlink():
            by_size[p.stat().st_size].append(p)
    by_hash = defaultdict(list)
    for size, paths in by_size.items():
        if size == 0 or len(paths) < 2:
            continue
        for p in paths:
            by_hash[sha256(p)].append(p)
    return [sorted(group) for group in by_hash.values() if len(group) > 1]
def main(root: Path) -> int:
    groups = find_duplicates(root)
    wasted = 0
    for group in sorted(groups):
        size = group[0].stat().st_size
        wasted += size * (len(group) - 1)
        print(f"{size:,} bytes x{len(group)}")
        for p in group:
            print("   ", p.relative_to(root))
    print(f"{len(groups)} groups, {wasted:,} bytes could be freed")
    return 0
if __name__ == "__main__":
    sys.exit(main(Path(sys.argv[1] if len(sys.argv) > 1 else ".")))`,
          try: R`جهّز: [[mkdir -p pics/2025 pics/backup && head -c 2000000 /dev/urandom > pics/2025/beach.jpg && cp pics/2025/beach.jpg "pics/backup/beach (copy).jpg" && cp pics/2025/beach.jpg pics/IMG_0001.jpg && head -c 2000000 /dev/urandom > pics/2025/other.jpg && echo hello > pics/a.txt && echo hello > pics/backup/a-old.txt && echo world > pics/b.txt && touch pics/empty1 pics/empty2]]. شغّل السكربت على [[pics]]. ليه [[b.txt]] ماظهرش مع إن حجمه زي [[a.txt]]؟ وليه [[empty1]] و [[empty2]] ماظهروش؟ أوامر التجهيز دي bash: على ويندوز شغّلها في Git Bash (فيه head و cp و touch و /dev/urandom)، والسكربت نفسه من أي ترمنال.`,
          flag: "script",
          deep: {
            why: "الصور والفيديوهات المتكررة بتاكل جيجات: backup فوق backup، وتحميل نفس الملف مرتين، ونسخ من الموبايل كذا مرة. والسكربت بيوريك فين وقد إيه قبل ما تمسح بإيدك.",
            how: R`[[hashlib.sha256()]] بياخد bytes على دفعات بـ [[update]] ويطلّع بصمة 64 حرف. أي اختلاف ولو byte واحد بيغيّر البصمة كلها. القراية بـ 1MB في المرة ([[while block := f.read(chunk)]]) عشان فيديو 4GB ميتحمّلش في الذاكرة. ومن Python 3.11 فيه [[hashlib.file_digest(f, "sha256")]] بيعمل نفس اللفة.

[[defaultdict(list)]] بيعمل list فاضية لأي مفتاح جديد، فـ [[append]] على طول.

المرحلتين: [[by_size]] من [[stat()]] بس من غير ما يقرا الملفات. وبعدين hash للمجموعات اللي فيها أكتر من ملف. على آلاف الصور ده الفرق بين ثواني ودقايق.

[[is_symlink()]]: اللينك مش نسخة، ولو اتحسب هيطلع «مكرر» مع الأصل وتمسح الأصل. والملفات الفاضية كلها نفس الـ hash ومالهاش لازمة.

[[Group = list[Path] ]] اسم مختصر للنوع. و [[wasted]] الحجم اللي هيتوفّر لو سبت نسخة واحدة من كل مجموعة.`,
            when: "قبل ما تشتري هارد جديد، أو تنضّف backups قديمة، أو تجمّع صور من كذا جهاز.",
            mistakes: R`مقارنة بالاسم أو بالحجم بس. وتحمّل الملف كله [[read_bytes()]] عشان تعمله hash. و [[md5]] لو الملفات ممكن حد يكون عاملها مخصوص (تصادمات md5 معروفة). والأهم: تزوّد مسح أوتوماتيك. اطبع بس، ولو هتمسح اعمله بـ dry run زي باقي السكربتات.`
          },
          teach: R`## السكربت بيعمل إيه؟

بيلف على كل الملفات تحت فولدر (بأي عمق)، ويطلّع المجموعات اللي **محتواها** واحد حتى لو أسماؤها مختلفة. ومبيمسحش حاجة: بيطبع بس. الفكرة كلها في مرحلتين: الحجم الأول (رخيص)، وبعدين الـ hash (غالي) للي يستاهل بس.

---

## ١. الـ imports واسم النوع

~~~python
import hashlib
import sys
from collections import defaultdict
from pathlib import Path
Group = list[Path]
~~~

| الاسم | بيعمل إيه |
|---|---|
| [[hashlib]] | دوال الـ hash: [[sha256]] و [[md5]] وغيرهم |
| [[sys]] | [[sys.argv]] (الـ arguments) و [[sys.exit]] |
| [[defaultdict]] | dict بيعمل قيمة افتراضية لأي مفتاح جديد |
| [[Path]] | المسارات |

[[Group = list[Path] ]] مش متغير بيانات، ده **اسم مستعار لنوع**: «Group يعني list من Paths». بيخلي [[-> list[Group] ]] تحت أوضح من [[list[list[Path] ] ]].

---

## ٢. يعني إيه hash؟

**hash** دالة بتاخد أي كمية bytes وتطلّع «بصمة» بطول ثابت. [[sha256]] بصمتها 256 bit، بتتكتب 64 حرف hex. نفس المحتوى = نفس البصمة دايمًا، وأي تغيير ولو حرف واحد بيغيّرها كلها. جربت في [[python:3.13-slim]]:

~~~text الناتج
sha256(b"hello\n") = 5891b5b522d5df086d0ff0b110fbd9d21bb4fc7163af34d08286a2e846f6be03
sha256(b"world\n") = e258d248fda94c63753607f7c4494ee0fcbe92f1a76bfdac795c9d84101eb317
sha256(b"")        = e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
~~~

نفس الطول (6 bytes) وبصمة مختلفة خالص. والسطر التالت بصمة الملف **الفاضي**، وهي واحدة لكل الملفات الفاضية، وعشان كده السكربت بيسيبهم.

---

## ٣. الدالة [[sha256]]: بصمة ملف من غير ما تحمّله كله

~~~python
def sha256(path: Path, chunk: int = 1024 * 1024) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        while block := f.read(chunk):
            h.update(block)
    return h.hexdigest()
~~~

- [[chunk: int = 1024 * 1024]] parameter ليه قيمة افتراضية: 1MB (1024 × 1024 byte).
- [[hashlib.sha256()]] object فاضي بتغذّيه bytes على دفعات.
- [[path.open("rb")]]: [[r]] قراية و [[b]] binary، يعني bytes زي ما هي من غير ما Python يحاول يفهمها كنص. و [[with]] بتقفل الملف لوحدها لما تخلص.
- [[while block := f.read(chunk):]] الـ [[:=]] اسمه **walrus operator**: بيحط القيمة في [[block]] وبيرجّعها في نفس الوقت للـ [[while]]. [[f.read]] بترجّع 1MB في كل مرة، ولما الملف يخلص بترجّع [[b""]] الفاضي، وده بيتحسب False فاللفة بتقف.
- [[h.update(block)]] يزوّد الحتة على الحساب.
- [[hexdigest()]] البصمة كنص hex (حروف 0-9 و a-f).

ليه مش [[path.read_bytes()]]؟ لأن فيديو 4GB كان هيتحمّل كله في الـ RAM. بالطريقة دي أقصى حاجة في الذاكرة 1MB.

---

## ٤. الدالة [[find_duplicates]]: المرحلتين

### المرحلة ١: جمّع بالحجم

~~~python
by_size = defaultdict(list)
for p in root.rglob("*"):
    if p.is_file() and not p.is_symlink():
        by_size[p.stat().st_size].append(p)
~~~

- [[defaultdict(list)]]: أول ما تطلب مفتاح مش موجود بيعمله list فاضية، فـ [[append]] تشتغل على طول من غير [[if key not in d]]. مثال:

~~~text الناتج
d[6].append("a.txt"); d[6].append("b.txt")   ->   {6: ['a.txt', 'b.txt']}
~~~

- [[root.rglob("*")]]: الـ [[r]] من recursive، يعني كل حاجة تحت الفولدر بكل المستويات.
- [[is_symlink()]]: الـ symlink مش نسخة، ده سهم بيشاور على الأصل. لو اتحسب، هيطلع «مكرر» مع الأصل.
- [[p.stat().st_size]] الحجم بالـ byte، من غير ما يقرا المحتوى. ده سريع جدًا.

### المرحلة ٢: hash للي حجمه متكرر بس

~~~python
by_hash = defaultdict(list)
for size, paths in by_size.items():
    if size == 0 or len(paths) < 2:
        continue
    for p in paths:
        by_hash[sha256(p)].append(p)
~~~

- [[len(paths) < 2]]: حجم مفيش غير ملف واحد بيه = مستحيل يبقى ليه نسخة، فمش هنقراه أصلًا.
- [[size == 0]]: الملفات الفاضية كلها «متطابقة» ومش فارقة.
- الباقي بيتجمّع بالبصمة.

### النتيجة

~~~python
return [sorted(group) for group in by_hash.values() if len(group) > 1]
~~~

المجموعات اللي فيها أكتر من ملف بس، وكل مجموعة مترتبة.

---

## ٥. [[main]]: الطباعة والحساب

~~~python
for group in sorted(groups):
    size = group[0].stat().st_size
    wasted += size * (len(group) - 1)
    print(f"{size:,} bytes x{len(group)}")
    for p in group:
        print("   ", p.relative_to(root))
print(f"{len(groups)} groups, {wasted:,} bytes could be freed")
~~~

- [[wasted]]: لو سبت نسخة واحدة من كل مجموعة، التانيين هيوفّروا [[الحجم × (العدد - 1)]].
- [[{size:,}]]: الـ [[,]] بتحط فاصل آلاف: [[4000006]] بتبقى [[4,000,006]].
- [[print("   ", ...)]]: [[print]] بتحط مسافة بين الحاجات اللي بتاخدها، فالسطر بيبدأ بمسافات (indent).

وآخر سطر في الملف:

~~~python
sys.exit(main(Path(sys.argv[1] if len(sys.argv) > 1 else ".")))
~~~

[[sys.argv[0] ]] اسم السكربت، و [[sys.argv[1] ]] أول argument. لو مفيش، الفولدر الحالي [["."]].

---

## ٦. التشغيل

جهزت فولدر «جرّب» وشغّلته في [[python:3.13-slim]] على Docker:

~~~bash
python3 find_duplicates.py pics
~~~

~~~text الناتج
2,000,000 bytes x3
    2025/beach.jpg
    IMG_0001.jpg
    backup/beach (copy).jpg
6 bytes x2
    a.txt
    backup/a-old.txt
2 groups, 4,000,006 bytes could be freed
~~~

نقرا الناتج:

| الملف | حصله إيه |
|---|---|
| [[beach.jpg]] ونسختين | نفس الحجم ونفس البصمة: مجموعة x3 |
| [[other.jpg]] | نفس حجم beach (2,000,000) بس بصمة تانية: مش ظاهر |
| [[a.txt]] و [[a-old.txt]] | [[hello]] الاتنين: مجموعة x2 |
| [[b.txt]] | [[world]]، نفس الحجم 6، بصمة تانية: مش ظاهر |
| [[empty1]] و [[empty2]] | [[size == 0]]: اتسابوا |

و [[4,000,006]] = نسختين زيادة من beach (2 × 2,000,000) + نسخة زيادة من a.txt (6).

على ويندوز (أوامر التجهيز في Git Bash، والسكربت بـ Python 3.14) نفس المجموعتين ونفس الأرقام، والمسارات بـ [[\]]، والترتيب جوه أول مجموعة [[2025\beach.jpg]] ثم [[backup\beach (copy).jpg]] ثم [[IMG_0001.jpg]]: مقارنة المسارات على ويندوز مش حساسة لحالة الحروف.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[st_size]] الأول | رخيص، وبيستبعد أغلب الملفات من غير قراية |
| [[sha256]] بعده | المحتوى نفسه هو الحكم |
| القراية بـ 1MB | الملفات الضخمة متملاش الـ RAM |
| [[is_symlink()]] و [[size == 0]] | مش نسخ بجد |
| طباعة بس | المسح قرارك انت |`,
          lines: [
            "الوصف.",
            "hashlib.",
            "sys.",
            "defaultdict.",
            "Path.",
            "اسم للنوع: مجموعة ملفات.",
            "hash لملف:",
            "ابدأ hash.",
            "افتح binary.",
            "اقرا 1MB في المرة لحد ما يخلص:",
            "زوّد على الـ hash.",
            "البصمة كنص.",
            "دوّر على المكرر:",
            "الحجم -> الملفات.",
            "كل الملفات تحت الفولدر:",
            "ملف حقيقي مش لينك:",
            "جمّعه بحجمه.",
            "الـ hash -> الملفات.",
            "لكل حجم:",
            "فاضي أو حجمه فريد؟",
            "مش ممكن يبقى ليه نسخة.",
            "باقي المجموعة:",
            "احسب الـ hash وجمّع.",
            "المجموعات اللي فيها أكتر من ملف بس.",
            "main:",
            "دوّر.",
            "المساحة اللي ممكن تتوفر.",
            "لكل مجموعة:",
            "حجم الملف.",
            "كل النسخ إلا واحدة.",
            "الحجم وعدد النسخ.",
            "لكل نسخة:",
            "مسارها.",
            "الملخص.",
            "نجح.",
            "لو اتشغّل مباشرة:",
            "شغّل على الفولدر من الـ argument أو الحالي."
          ],
          sol: R`الناتج:

[[2,000,000 bytes x3]]
[[    2025/beach.jpg]] و [[    IMG_0001.jpg]] و [[    backup/beach (copy).jpg]]
[[6 bytes x2]]
[[    a.txt]] و [[    backup/a-old.txt]]
[[2 groups, 4,000,006 bytes could be freed]]

[[b.txt]] فيه [[world]] و a.txt فيه [[hello]]، الاتنين 6 bytes، فدخلوا مرحلة الـ hash مع بعض وطلعوا مختلفين. ده بالظبط سبب إن الحجم لوحده مش كفاية. و [[other.jpg]] نفس حجم beach.jpg بالظبط بس محتوى تاني، فبرضه ماظهرش. والملفات الفاضية اتشالت بـ [[size == 0]].

الوقت على الفولدر ده 0.04 ثانية. ولو [[b.txt]] كان حجمه مختلف ماكانش اتعمله hash أصلًا.

وعلى ويندوز (التجهيز في Git Bash) نفس المجموعتين ونفس الأرقام، بس الترتيب جوه أول مجموعة [[2025\beach.jpg]] ثم [[backup\beach (copy).jpg]] ثم [[IMG_0001.jpg]]: الترتيب هناك مش حساس لحالة الحروف، فـ backup قبل IMG.`
        },
        {
          cmd: "clean_old_files.py",
          title: "امسح الملفات الأقدم من N يوم",
          desc: R`logs قديمة، وملفات temp، و backups عدّى عليها شهور: سكربت ياخد الفولدر وعدد الأيام وpattern، ويمسح الملفات اللي آخر تعديل ليها أقدم من كده.

وده سكربت بيمسح، فكل قواعد الأمان: dry run افتراضي و [[--apply]] للمسح، و [[--days]] إجباري (مفيش رقم افتراضي ممكن يبقى غلط)، ورفض الـ home و [[/]]، وملفات بس (مش فولدرات ولا symlinks)، وكل ملف اتمسح يتسجل في الـ log.`,
          example: R`#!/usr/bin/env python3
"""Delete files older than N days. Dry run unless --apply."""
import argparse
import logging
import time
from pathlib import Path
log = logging.getLogger("clean")
def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("folder", type=Path)
    ap.add_argument("--days", type=int, required=True)
    ap.add_argument("--pattern", default="*", help='glob, e.g. "*.log" (default: all files)')
    ap.add_argument("--apply", action="store_true", help="really delete")
    args = ap.parse_args(argv)
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
    folder = args.folder.expanduser().resolve()
    if not folder.is_dir() or folder in (Path("/").resolve(), Path.home().resolve()):
        log.error("refusing to clean %s", folder)
        return 2
    cutoff = time.time() - args.days * 86400
    count = freed = 0
    for p in sorted(folder.rglob(args.pattern)):
        if not p.is_file() or p.is_symlink():
            continue
        st = p.stat()
        if st.st_mtime >= cutoff:
            continue
        if args.apply:
            p.unlink()
        log.info("%s %s (%d bytes)", "deleted" if args.apply else "would delete", p.relative_to(folder), st.st_size)
        count += 1
        freed += st.st_size
    log.info("%d files, %.1f KB %s", count, freed / 1024, "freed" if args.apply else "(dry run, add --apply)")
    return 0
if __name__ == "__main__":
    raise SystemExit(main())`,
          try: R`جهّز ملفات بأعمار مختلفة: [[mkdir -p logs/old && head -c 4096 /dev/urandom > logs/app-2026-08-01.log && touch -d "61 days ago" logs/app-2026-08-01.log && head -c 2048 /dev/urandom > logs/old/worker.log && touch -d "40 days ago" logs/old/worker.log && echo x > logs/app.log && touch -d "40 days ago" logs/keep.txt]]. شغّل [[python3 clean_old_files.py logs --days 30 --pattern "*.log"]]، وبعدين بـ [[--apply]]. وجرّب على [[~]]، ومن غير [[--days]]. على ويندوز شغّل أوامر التجهيز في Git Bash ([[touch -d]] هناك شغال)، وجربتها كده ونفس النتيجة، والمسار بيتطبع [[old\worker.log]] و [[refusing to clean C:\Users\...]].`,
          flag: "script",
          deep: {
            why: R`فولدر logs على السيرفر بيكبر لحد ما الـ disk يتملي والتطبيق يقف ([[No space left on device]]). سكربت متجدول كل ليلة بيمنع ده. وأي غلطة فيه بتمسح حاجات مهمة، فالحماية مش رفاهية.`,
            how: R`[[required=True]] على option: argparse يرفض من غيره. ومفيش default للأيام قصد: الرقم ده لازم حد يفكر فيه.

[[resolve()]] قبل المقارنة عشان [[logs/../..]] أو لينك ميعدّيش. والمقارنة بـ [[Path("/").resolve()]] و [[Path.home().resolve()]] رفض صريح للأماكن اللي مستحيل تبقى قصدك.

[[cutoff = time.time() - days * 86400]]: [[st_mtime]] و [[time.time()]] الاتنين ثواني من 1970، فالمقارنة رقم برقم من غير datetime.

[[--pattern]] بيروح لـ [[rglob]]، فـ [[*.log]] بيدوّر في الفولدرات اللي تحت كمان. و [[is_symlink()]]: لينك جوه logs بيشاور على ملف بره، [[unlink]] بيمسح اللينك بس، بس الأحسن متلمسوش أصلًا.

[[log.info]] لكل ملف: لما حد يسأل «فين الملف الفلاني؟» الـ log فيه الإجابة. و [[raise SystemExit(main())]] هي هي [[sys.exit(main())]] من غير import.`,
            when: R`logs و temp و backups و screenshots و cache. وفي cron بـ [[--apply]] بعد ما الـ dry run اتجرب وطلع اللي متوقعه.`,
            mistakes: R`الـ default بـ apply. ومن غير فحص للفولدر، ومسار جاي من متغير ممكن يبقى فاضي. ومسح فولدرات بـ rmtree بدل ملفات. و [[st_ctime]] بدل [[st_mtime]]. وتجربة pattern جديد بالـ apply على طول.`
          },
          teach: R`## السكربت بيعمل إيه؟

بيدوّر تحت فولدر على الملفات اللي آخر تعديل ليها أقدم من [[--days]] يوم، وبيعرضها، ولو كتبت [[--apply]] بيمسحها. ولأنه بيمسح، نص الكود حماية: رفض أماكن خطيرة، وأيام إجبارية، و log لكل ملف.

---

## ١. الـ imports والـ logger

~~~python
import argparse
import logging
import time
from pathlib import Path
log = logging.getLogger("clean")
~~~

- [[logging]] بديل [[print]] للسكربتات اللي بتشتغل لوحدها: كل سطر معاه الوقت والمستوى ([[INFO]] و [[ERROR]]).
- [[getLogger("clean")]] logger باسم، بنكتب بيه تحت بـ [[log.info]] و [[log.error]].
- [[time]] عشان [[time.time()]]: الوقت دلوقتي.

---

## ٢. الـ arguments

~~~python
ap.add_argument("folder", type=Path)
ap.add_argument("--days", type=int, required=True)
ap.add_argument("--pattern", default="*", help='glob, e.g. "*.log" (default: all files)')
ap.add_argument("--apply", action="store_true", help="really delete")
args = ap.parse_args(argv)
~~~

| الـ argument | معناه |
|---|---|
| [[folder]] بـ [[type=Path]] | الفولدر، و argparse بيحوّله [[Path]] |
| [[--days]] بـ [[type=int]] | عدد الأيام كرقم صحيح (لو كتبت [[abc]] argparse يرفض) |
| [[required=True]] | option إجباري: من غيره argparse يوقف |
| [[--pattern]] | glob للأسماء، الافتراضي [[*]] = كله |
| [[--apply]] | flag، من غيره عرض بس |

جربته من غير [[--days]]:

~~~text الناتج (exit 2)
usage: clean_old_files.py [-h] --days DAYS [--pattern PATTERN] [--apply]
                          folder
clean_old_files.py: error: the following arguments are required: --days
~~~

ليه مفيش default للأيام؟ لأن أي رقم افتراضي ممكن يبقى غلط لفولدر معيّن، فلازم اللي بيشغّل يفكر فيه ويكتبه.

### الـ logging

~~~python
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
~~~

- [[level=logging.INFO]]: اطبع من INFO وطالع (INFO و WARNING و ERROR)، ومن غيرها INFO مش بيظهر.
- [[format]]: شكل السطر. [[%(asctime)s]] الوقت، و [[%(levelname)s]] المستوى، و [[%(message)s]] الرسالة.

---

## ٣. الحماية

~~~python
folder = args.folder.expanduser().resolve()
if not folder.is_dir() or folder in (Path("/").resolve(), Path.home().resolve()):
    log.error("refusing to clean %s", folder)
    return 2
~~~

- [[expanduser()]] تفك [[~]]، و [[resolve()]] تحوّل المسار لمسار كامل حقيقي: بتشيل [[..]] وبتمشي ورا الـ symlinks. فـ [[logs/../..]] بيطلع اسمه الحقيقي قبل المقارنة.
- [[Path("/").resolve()]] أول النظام، و [[Path.home()]] فولدر اليوزر.
- [[folder in (..., ...)]]: هل الفولدر واحد من الاتنين دول؟
- [[log.error("refusing to clean %s", folder)]]: الـ [[%s]] بيتبدل بـ [[folder]]. ده أسلوب logging: القيمة بتتبعت لوحدها ومش بتتدمج إلا لو السطر هيتطبع فعلًا.
- [[return 2]]: الـ 2 عُرف معناه «استخدام غلط» (argparse نفسه بيخرج بـ 2).

جربت [[~]]:

~~~text لينكس (Docker، اليوزر root)
ERROR refusing to clean /root
~~~

~~~text ويندوز
ERROR refusing to clean C:\Users\ali
~~~

والاتنين exit 2.

---

## ٤. الحد الزمني

~~~python
cutoff = time.time() - args.days * 86400
~~~

- [[time.time()]] الوقت دلوقتي بالثواني من أول 1970 (اسمه **Unix time**). في التجربة كان حوالي [[1791308570]].
- [[86400]] ثواني اليوم: 24 × 60 × 60. فـ 30 يوم = [[2592000]] ثانية.
- [[cutoff]] = اللحظة اللي من 30 يوم. أي ملف آخر تعديل ليه قبلها يبقى قديم.

---

## ٥. اللفة

~~~python
count = freed = 0
for p in sorted(folder.rglob(args.pattern)):
    if not p.is_file() or p.is_symlink():
        continue
    st = p.stat()
    if st.st_mtime >= cutoff:
        continue
~~~

- [[count = freed = 0]] متغيرين بنفس القيمة.
- [[rglob(args.pattern)]] بيدوّر بكل المستويات، فـ [[*.log]] لقى [[old/worker.log]] كمان.
- [[is_file()]] و [[is_symlink()]]: ملفات عادية بس، مش فولدرات ولا لينكات.
- [[st = p.stat()]] بيانات الملف مرة واحدة: [[st_mtime]] (**m**odification **time**، آخر تعديل بالثواني من 1970) و [[st_size]] الحجم.
- [[st_mtime >= cutoff]]: الملف اتعدّل بعد الحد، يعني جديد، سيبه.

### المسح والتسجيل

~~~python
if args.apply:
    p.unlink()
log.info("%s %s (%d bytes)", "deleted" if args.apply else "would delete", p.relative_to(folder), st.st_size)
count += 1
freed += st.st_size
~~~

- [[p.unlink()]] بيمسح الملف (اسمها من نظام يونكس: «فك الاسم عن البيانات»).
- [[%d]] رقم صحيح، و [[%s]] نص.
- [[st.st_size]] من الـ [[stat]] اللي اتعمل **قبل** المسح، لأن بعد [[unlink]] الملف مش موجود تسأله.

### الملخص

~~~python
log.info("%d files, %.1f KB %s", count, freed / 1024, "freed" if args.apply else "(dry run, add --apply)")
~~~

[[%.1f]] رقم عشري برقم واحد بعد العلامة، و [[freed / 1024]] من byte لـ KB.

وآخر الملف [[raise SystemExit(main())]]: نفس [[sys.exit(main())]] بالظبط، من غير ما تعمل import لـ [[sys]].

---

## ٦. التشغيل

جهزت فولدر «جرّب» في [[python:3.13-slim]] على Docker ([[touch -d "61 days ago"]] بيغيّر وقت التعديل للماضي):

| الملف | العمر | [[*.log]]؟ |
|---|---|---|
| [[app-2026-08-01.log]] | 61 يوم | آه |
| [[old/worker.log]] | 40 يوم | آه |
| [[app.log]] | جديد | آه |
| [[keep.txt]] | 40 يوم | لأ |

~~~bash
python3 clean_old_files.py logs --days 30 --pattern "*.log"
~~~

~~~text الناتج
2026-10-06 17:42:50,285 INFO would delete app-2026-08-01.log (4096 bytes)
2026-10-06 17:42:50,285 INFO would delete old/worker.log (2048 bytes)
2026-10-06 17:42:50,285 INFO 2 files, 6.0 KB (dry run, add --apply)
~~~

[[6.0 KB]] = (4096 + 2048) / 1024. وبـ [[--apply]] نفس السطور بـ [[deleted]] و [[6.0 KB freed]]، و [[ls -R logs]] بعدها: [[app.log]] و [[keep.txt]] وفولدر [[old]] فاضي (السكربت بيمسح ملفات بس، مش فولدرات).

على ويندوز (التجهيز في Git Bash، والسكربت بـ Python 3.14) نفس الملفين ونفس الأرقام، والمسار [[old\worker.log]].

---

## الخلاصة

| الحماية | الكود |
|---|---|
| عرض قبل المسح | [[--apply]] |
| مفيش رقم أيام افتراضي | [[required=True]] |
| مش الـ home ولا [[/]] | [[resolve()]] + المقارنة |
| ملفات عادية بس | [[is_file()]] و [[not is_symlink()]] |
| أثر لكل ملف | [[log.info]] |

والفكرة نفسها: [[st_mtime]] أقل من [[time.time() - days * 86400]] = قديم.`,
          lines: [
            "الوصف.",
            "argparse.",
            "logging.",
            "time.",
            "Path.",
            "logger.",
            "main بـ argv عشان الاختبار:",
            "الـ parser.",
            "الفولدر.",
            "الأيام، إجباري ومن غير default.",
            "أنهي ملفات.",
            "المسح الحقيقي محتاج --apply.",
            "اقرا.",
            "الـ logging بالوقت.",
            "مسار كامل حقيقي.",
            "مش فولدر، أو هو / أو الـ home؟",
            "ارفض.",
            "2 = استخدام غلط.",
            "الحد: دلوقتي ناقص N يوم بالثواني.",
            "عدادات.",
            "كل اللي ماشي على الـ pattern، بأي عمق:",
            "مش ملف عادي؟",
            "سيبه.",
            "بياناته.",
            "أحدث من الحد؟",
            "سيبه.",
            "لو --apply:",
            "امسح.",
            "سجّل كل ملف.",
            "عد.",
            "اجمع الحجم.",
            "الملخص.",
            "نجح.",
            "لو اتشغّل مباشرة:",
            "شغّل واخرج بالكود."
          ],
          sol: R`الـ dry run:

[[2026-10-01 16:16:08,424 INFO would delete app-2026-08-01.log (4096 bytes)]]
[[2026-10-01 16:16:08,424 INFO would delete old/worker.log (2048 bytes)]]
[[2026-10-01 16:16:08,424 INFO 2 files, 6.0 KB (dry run, add --apply)]]

و [[ls -R logs]] بعده الأربعة موجودين. بـ [[--apply]] نفس السطرين بـ [[deleted]] و [[6.0 KB freed]]، وفضل [[app.log]] (جديد) و [[keep.txt]] (قديم بس مش [[.log]]).

[[~]]: [[ERROR refusing to clean /home/...]] (الـ home بتاعك) و exit 2.
من غير [[--days]]: [[error: the following arguments are required: --days]] و exit 2.`
        },
        {
          cmd: "json_to_csv.py",
          title: "تقرير CSV واحد من فولدر ملفات JSON",
          desc: R`نظام بيطلّع كل طلب في ملف JSON، والمحاسب عايز شيت Excel فيه كل الطلبات. السكربت بيقرا كل ملف، ويطلّع الحقول اللي محتاجها (حتى لو جوه objects متداخلة)، ويحسب الإجمالي، ويكتب CSV واحد بـ [[utf-8-sig]] عشان Excel.

والملف البايظ أو الناقص ميوقّعش التقرير كله: بيتسجّل على stderr ويتساب، وباقي الملفات تكمل.`,
          example: R`#!/usr/bin/env python3
"""Turn a folder of order JSON files into one CSV report (opens fine in Excel)."""
import csv
import json
import sys
from pathlib import Path
FIELDS = ["id", "customer", "city", "items", "total", "file"]
def load(path: Path) -> dict | None:
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, UnicodeDecodeError) as e:
        print(f"skip {path.name}: {e}", file=sys.stderr)
        return None
    customer = data.get("customer") or {}
    items = data.get("items") or []
    return {
        "id": data.get("id"),
        "customer": customer.get("name", ""),
        "city": customer.get("city", ""),
        "items": len(items),
        "total": round(sum(i["price"] * i.get("qty", 1) for i in items), 2),
        "file": path.name,
    }
def main(src: Path, out: Path) -> int:
    rows = [row for p in sorted(src.glob("*.json")) if (row := load(p))]
    rows.sort(key=lambda r: r["total"], reverse=True)
    with out.open("w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=FIELDS)
        writer.writeheader()
        writer.writerows(rows)
    print(f"{len(rows)} orders -> {out}, grand total {sum(r['total'] for r in rows):,.2f}")
    return 0
if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit("usage: json_to_csv.py FOLDER [OUT.csv]")
    sys.exit(main(Path(sys.argv[1]), Path(sys.argv[2] if len(sys.argv) > 2 else "report.csv")))`,
          try: R`اعمل فولدر [[orders]] بالأوامر اللي في الحل (3 طلبات سليمة، واحد منهم من غير city و items فاضية، وملف رابع مقطوع). شغّل [[python3 json_to_csv.py orders]] و [[cat report.csv]]. وبعدين زوّد عمود [[top_sku]] فيه الـ sku الأغلى في الطلب.`,
          flag: "script",
          deep: {
            why: "export من نظام، أو responses API متخزنة، أو ملفات إعدادات لكل جهاز: بيانات JSON متفرقة، والناس عايزاها في جدول. ده من أكتر السكربتات اللي هتكتبها في أي شغل.",
            how: R`[[load]] بترجّع dict جاهز للـ CSV أو [[None]] لو الملف بايظ. فصل القراية عن الكتابة بيخلي كل جزء سهل يتختبر.

[[data.get("customer") or {}]]: لو المفتاح مش موجود أو قيمته [[null]] في الـ JSON، خد dict فاضي، فـ [[.get("name", "")]] بعدها ميقعش. نفس الفكرة لـ items.

[[sum(i["price"] * i.get("qty", 1) for i in items)]]: qty اختيارية وافتراضيها 1. و [[round(..., 2)]] عشان [[0.1 + 0.2]] (ولو فلوس بجد: [[Decimal]]).

[[[row for p in ... if (row := load(p))] ]]: الـ walrus [[:=]] بيحسب load مرة واحدة ويستخدم النتيجة في الشرط وفي الـ list. ولو load رجّعت None الصف بيتشال.

[[utf-8-sig]] عشان Excel (درس «csv و utf-8-sig»). و [[{...:,.2f}]] بفواصل آلاف ورقمين عشريين.`,
            when: "أي تجميع لبيانات من ملفات كتير في جدول واحد.",
            mistakes: R`[[data["customer"]["city"] ]] مباشرة فأول طلب ناقص يوقّع الكل. وملف بايظ يوقف التقرير بدل ما يتساب ويتسجل. و [[utf-8]] بدل [[utf-8-sig]]. والأرقام تفضل floats بكسور طويلة زي [[275.99999999999997]].`
          },
          teach: R`## السكربت بيعمل إيه؟

بيقرا كل ملف [[.json]] في فولدر (كل ملف = طلب واحد)، ويطلّع منه صف واحد فيه الحقول المهمة، ويكتب كل الصفوف في ملف CSV واحد يتفتح في Excel. الملف البايظ بيتساب برسالة، ومش بيوقّع الباقي.

---

## الأول: شكل البيانات اللي داخلة

أوامر «الحل» بتعمل ٤ ملفات. ده واحد منهم:

~~~json
{"id": 1001,
 "customer": {"name": "سارة", "city": "القاهرة"},
 "items": [{"sku": "A1", "price": 120.5, "qty": 2}, {"sku": "B7", "price": 35}]}
~~~

- **object** بين [[{}]] في JSON بيبقى **dict** في Python، و **array** بين قوسين مربعين بيبقى **list**.
- [[customer]] object جوه object (متداخل)، و [[items]] list من objects.
- المنتج التاني من غير [[qty]]، والطلب 1003 من غير [[city]] و [[items]] فاضية، والملف 1004 مقطوع في النص.

---

## ١. الـ imports والأعمدة

~~~python
import csv
import json
import sys
from pathlib import Path
FIELDS = ["id", "customer", "city", "items", "total", "file"]
~~~

[[csv]] للكتابة، و [[json]] للقراية. و [[FIELDS]] أسماء الأعمدة **بالترتيب** اللي هتظهر بيه في الشيت.

---

## ٢. الدالة [[load]]: ملف واحد لصف واحد

~~~python
def load(path: Path) -> dict | None:
~~~

[[dict | None]] معناها «بترجّع dict، أو None». الـ [[|]] هنا «أو» في الأنواع.

### القراية جوه try

~~~python
try:
    data = json.loads(path.read_text(encoding="utf-8"))
except (json.JSONDecodeError, UnicodeDecodeError) as e:
    print(f"skip {path.name}: {e}", file=sys.stderr)
    return None
~~~

نفكها من جوه لبرة:

1. [[path.read_text(encoding="utf-8")]] الملف كنص، وبنحدد الـ encoding صريح (على ويندوز الافتراضي ممكن يبقى حاجة تانية).
2. [[json.loads(...)]]: الـ [[s]] من string، يعني «حوّل النص ده لـ Python». ([[json.load]] من غير s بتاخد ملف مفتوح.)
3. لو النص مش JSON سليم: [[JSONDecodeError]]. ولو الملف مش UTF-8: [[UnicodeDecodeError]]. الاتنين جوه tuple عشان [[except]] واحد يمسكهم.
4. [[as e]] الـ error نفسه، ولما يتطبع بيبقى رسالته.
5. [[file=sys.stderr]] الرسالة على قناة الأخطاء، فـ [[> out.txt]] مش هيبلعها.

### الحقول المتداخلة من غير ما يقع

~~~python
customer = data.get("customer") or {}
items = data.get("items") or []
~~~

- [[data["customer"] ]] بالأقواس المربعة بيرمي [[KeyError]] لو المفتاح مش موجود. [[data.get("customer")]] بيرجّع [[None]] بدل كده.
- [[or {}]]: لو الناتج None (أو الـ JSON فيه [[null]])، خد dict فاضي. فـ [[customer.get("city", "")]] بعدها دايمًا شغالة، وترجّع [[""]] لو مفيش.

~~~text الناتج (جربته في python:3.13-slim)
{"customer": None}.get("customer") or {}   ->   {}
{}.get("name", "")                          ->   ''
~~~

### الصف

~~~python
return {
    "id": data.get("id"),
    "customer": customer.get("name", ""),
    "city": customer.get("city", ""),
    "items": len(items),
    "total": round(sum(i["price"] * i.get("qty", 1) for i in items), 2),
    "file": path.name,
}
~~~

سطر [[total]] من جوه لبرة:

| الحتة | بتعمل إيه |
|---|---|
| [[i.get("qty", 1)]] | الكمية، ولو مش موجودة 1 |
| [[i["price"] * ...]] | سعر المنتج في كميته |
| [[... for i in items]] | لكل منتج (generator) |
| [[sum(...)]] | اجمعهم. على list فاضية بيرجّع 0 |
| [[round(..., 2)]] | رقمين بعد العلامة |

ليه [[round]]؟ الأرقام العشرية في الكمبيوتر مش مظبوطة 100%: [[0.1 + 0.2]] بيطلع [[0.30000000000000004]]، و [[round(..., 2)]] بيرجّعها [[0.3]]. للفلوس بجد استخدم [[Decimal]].

للطلب 1001: [[120.5 × 2 + 35 × 1 = 276.0]].

---

## ٣. [[main]]: الصفوف والكتابة

~~~python
rows = [row for p in sorted(src.glob("*.json")) if (row := load(p))]
~~~

- [[sorted(src.glob("*.json"))]] ملفات الـ JSON بالترتيب.
- [[(row := load(p))]]: الـ walrus بيحسب [[load]] **مرة واحدة**، ويحط النتيجة في [[row]]، ويرجّعها للـ [[if]]. لو [[None]] الشرط بيفشل والصف بيتساب.
- [[row for ...]] الصف نفسه بيدخل الـ list.

~~~python
rows.sort(key=lambda r: r["total"], reverse=True)
~~~

- [[lambda r: r["total"] ]] دالة صغيرة من غير اسم: «من الصف، هات الـ total». [[sort]] بيرتب بالقيمة دي.
- [[reverse=True]] من الأكبر للأصغر.

### الكتابة

~~~python
with out.open("w", newline="", encoding="utf-8-sig") as f:
    writer = csv.DictWriter(f, fieldnames=FIELDS)
    writer.writeheader()
    writer.writerows(rows)
~~~

| الحتة | ليه |
|---|---|
| [["w"]] | كتابة (بيمسح القديم) |
| [[newline=""]] | موديول csv بيكتب نهايات السطور بنفسه. من غيرها على ويندوز بيطلع سطر فاضي بين كل صفين |
| [[utf-8-sig]] | UTF-8 وفي أوله 3 bytes اسمهم **BOM**. Excel بيشوفهم فيعرف إن الملف UTF-8 والعربي يظهر صح |
| [[DictWriter]] | بياخد dicts ويحط كل قيمة في عمودها حسب [[fieldnames]] |
| [[writeheader()]] | سطر العناوين |
| [[writerows(rows)]] | كل الصفوف |

### الملخص

~~~python
print(f"{len(rows)} orders -> {out}, grand total {sum(r['total'] for r in rows):,.2f}")
~~~

[[:,.2f]]: فاصل آلاف ([[,]]) ورقمين عشريين ([[.2f]]): [[1275.99]] بيبقى [[1,275.99]].

### آخر الملف

~~~python
if len(sys.argv) < 2:
    sys.exit("usage: json_to_csv.py FOLDER [OUT.csv]")
sys.exit(main(Path(sys.argv[1]), Path(sys.argv[2] if len(sys.argv) > 2 else "report.csv")))
~~~

[[sys.exit("نص")]] بيطبع النص على stderr ويخرج بـ 1. والملف التاني اختياري، وافتراضيه [[report.csv]].

---

## ٤. التشغيل

في [[python:3.13-slim]] على Docker، بعد أوامر «الحل»:

~~~bash
python3 json_to_csv.py orders
cat report.csv
~~~

~~~text الناتج
skip 1004.json: Expecting value: line 2 column 1 (char 26)
3 orders -> report.csv, grand total 1,275.99
id,customer,city,items,total,file
1002,Omar,Alex,1,999.99,1002.json
1001,سارة,القاهرة,2,276.0,1001.json
1003,Mona,,0,0,1003.json
~~~

- [[1004.json]] اتساب برسالة، والباقي كمل. [[char 26]] لأن الملف كله [[{"id": 1004, "customer": ]] (25 حرف) وبعده سطر جديد، فالملف 26 حرف، والـ JSON خلص عند الحرف رقم 26 (العد من صفر) قبل ما قيمة [[customer]] تيجي.
- [[1003]]: [[city]] فاضية ([[,,]])، و [[items]] صفر، و [[total]] صفر: من غير أي crash.
- الترتيب بالـ total من الأكبر.
- و [[od -c report.csv]] بيوري أول 3 bytes [[357 273 277]] (يعني [[EF BB BF]]): ده الـ BOM.

ومن غير فولدر: [[usage: json_to_csv.py FOLDER [OUT.csv] ]] و exit 1.

### على ويندوز

| عملت الملفات بـ | النتيجة |
|---|---|
| PowerShell 7 ([[pwsh]]) | نفس الناتج بالظبط |
| Windows PowerShell 5.1 | [[skip 1001.json: 'utf-8' codec can't decode byte 0xff in position 0]] لكل الملفات، و [[0 orders]] |

ليه؟ الـ [[>]] في 5.1 بيكتب UTF-16، وأول byte فيه [[0xff]]، فـ [[read_text(encoding="utf-8")]] بيرفضه، والسكربت بيسيب الملف زي ما اتصمم بالظبط بدل ما يقع.

---

## الخلاصة

| المشكلة | الحل في الكود |
|---|---|
| ملف بايظ | [[try/except]] في [[load]] ← skip |
| حقل ناقص أو [[null]] | [[.get(...) or {}]] و [[.get(key, default)]] |
| كسور طويلة | [[round(..., 2)]] |
| العربي في Excel | [[utf-8-sig]] |
| سطور فاضية على ويندوز | [[newline=""]] |`,
          lines: [
            "الوصف.",
            "csv.",
            "json.",
            "sys.",
            "Path.",
            "الأعمدة بالترتيب.",
            "ملف واحد لصف واحد، أو None:",
            "حاول...",
            "...تقرا الـ JSON.",
            "بايظ أو مش utf-8:",
            "سجّله على stderr.",
            "سيبه.",
            "العميل، أو dict فاضي لو مش موجود.",
            "المنتجات، أو list فاضية.",
            "الصف:",
            "رقم الطلب.",
            "اسم العميل.",
            "المدينة.",
            "عدد المنتجات.",
            "الإجمالي: السعر في الكمية (افتراضيها 1).",
            "اسم الملف عشان ترجعله.",
            "قفلة.",
            "main:",
            "الصفوف السليمة بس.",
            "رتّب بالإجمالي من الأكبر.",
            "اكتب بـ BOM عشان Excel.",
            "writer.",
            "العناوين.",
            "الصفوف.",
            "ملخص.",
            "نجح.",
            "لو اتشغّل مباشرة:",
            "مفيش فولدر؟",
            "usage وخروج بـ 1.",
            "شغّل، والملف الافتراضي report.csv."
          ],
          sol: R`الناتج:

[[skip 1004.json: Expecting value: line 2 column 1 (char 26)]] (على stderr)
[[3 orders -> report.csv, grand total 1,275.99]]

و report.csv:

[[id,customer,city,items,total,file]]
[[1002,Omar,Alex,1,999.99,1002.json]]
[[1001,سارة,القاهرة,2,276.0,1001.json]]
[[1003,Mona,,0,0,1003.json]]

الطلب 1003 من غير city و items فاضية طلع صف عادي بدل ما يوقّع السكربت. و [[1001]] = [[120.5 × 2 + 35]].

أوامر الحل شغالة زي ما هي في PowerShell 7 كمان (جربتها وطلع نفس الناتج). بس في Windows PowerShell 5.1 الـ [[>]] بيكتب الملفات UTF-16، فالسكربت هيقول [[skip 1001.json: 'utf-8' codec can't decode byte 0xff in position 0: invalid start byte]] لكل ملف: اعملها من PowerShell 7 أو Git Bash.

[[top_sku]]: ضيفه لـ FIELDS، وفي الـ dict: [["top_sku": max(items, key=lambda i: i["price"])["sku"] if items else ""]]. للطلب 1001 بيطلع [[A1]].`,
          solCode: R`mkdir orders
echo '{"id": 1001, "customer": {"name": "سارة", "city": "القاهرة"}, "items": [{"sku": "A1", "price": 120.5, "qty": 2}, {"sku": "B7", "price": 35}]}' > orders/1001.json
echo '{"id": 1002, "customer": {"name": "Omar", "city": "Alex"}, "items": [{"sku": "C3", "price": 999.99}]}' > orders/1002.json
echo '{"id": 1003, "customer": {"name": "Mona"}, "items": []}' > orders/1003.json
echo '{"id": 1004, "customer": ' > orders/1004.json`
        },
        {
          cmd: "uptime_check.py",
          title: "تشيّك إن مواقعك شغالة",
          desc: R`لستة روابط في [[urls.txt]]، والسكربت بيطلب كل واحد ويطبع [[UP]] والوقت أو [[DOWN]] والسبب، ويخرج بـ 1 لو أي واحد واقع، فـ cron أو CI يعرفوا.

مكتوب بـ [[urllib]] من المكتبة الأساسية بس، فيشتغل على أي سيرفر فيه Python من غير venv ولا pip. ونسخة بتشيّك على ١٠٠ رابط مع بعض في ثانية في درس «concurrent.futures» في المستوى ٣.`,
          example: R`#!/usr/bin/env python3
"""Check a list of URLs; exit 1 if any is down. Standard library only."""
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path
def check(url: str, timeout: float = 5) -> tuple[bool, str]:
    req = urllib.request.Request(url, headers={"User-Agent": "uptime-check/1.0"})
    start = time.perf_counter()
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            ms = (time.perf_counter() - start) * 1000
            return True, f"{r.status} in {ms:.0f} ms"
    except urllib.error.HTTPError as e:
        return False, f"HTTP {e.code}"
    except (urllib.error.URLError, TimeoutError) as e:
        return False, f"error: {getattr(e, 'reason', e)}"
def main(path: Path) -> int:
    lines = path.read_text(encoding="utf-8").splitlines()
    urls = [u.strip() for u in lines if u.strip() and not u.startswith("#")]
    down = 0
    for url in urls:
        ok, info = check(url)
        down += not ok
        print(f"{'UP  ' if ok else 'DOWN'}  {url:<40} {info}")
    print(f"{len(urls) - down}/{len(urls)} up")
    return 1 if down else 0
if __name__ == "__main__":
    sys.exit(main(Path(sys.argv[1] if len(sys.argv) > 1 else "urls.txt")))`,
          try: R`اعمل [[urls.txt]] فيه [[https://example.com]] و [[https://www.python.org/]] و [[https://pypi.org/nope-404]] وسطر [[http://127.0.0.1:1/]] (بورت مقفول) و [[http://no-such-host.invalid/]]، وسطر بيبدأ بـ [[#]]. شغّله و [[echo $?]] (في PowerShell [[$LASTEXITCODE]]). ولو عندك سيرفر محلي بيتأخر، جرّب رابط بيرد بعد 7 ثواني.`,
          flag: "script",
          deep: {
            why: "تعرف إن موقعك واقع من سكربت قبل ما تعرف من عميل زعلان. ومش محتاج خدمة مدفوعة لمشروع صغير: سكربت ٣٠ سطر و cron كل ٥ دقايق.",
            how: R`[[Request(url, headers=...)]]: User-Agent باسم السكربت. مواقع كتير بترفض [[Python-urllib]] الافتراضي بـ 403، وفي logs السيرفر هتعرف الطلبات دي جاية منين.

[[time.perf_counter()]] ساعة لقياس المدة (مش للتاريخ)، أدق من [[time.time()]] ومبتتأثرش لو ساعة الجهاز اتظبطت.

الأخطاء بالترتيب: [[HTTPError]] الأول لأنه ابن [[URLError]] (لو URLError الأول هيمسك الاتنين). HTTPError = السيرفر رد بس بـ 4xx أو 5xx. URLError = مفيش رد: DNS أو connection refused أو timeout في الاتصال. و [[TimeoutError]] لو الاتصال نجح والرد اتأخر. و [[getattr(e, 'reason', e)]] السبب لو موجود.

[[down += not ok]]: [[True]] بـ 1 و [[False]] بـ 0. و [[return 1 if down else 0]] هو اللي يخلي cron يبعتلك إيميل أو CI يبقى أحمر.

[[urls.txt]] مش جوه الكود: تضيف موقع من غير ما تلمس السكربت، والسطور الفاضية والتعليقات بتتساب.`,
            when: "مواقعك و APIs بتاعتك، وأي خدمة بتعتمد عليها. مع cron (المستوى ٣) و notify.py لو عايز إيميل.",
            mistakes: R`من غير timeout: موقع معلّق يعلّق السكربت والتشغيلات اللي بعده. و except واحد [[Exception]] فمش عارف ليه وقع. و exit 0 حتى لو مواقع واقعة. وتشيّك كل دقيقة على موقع حد تاني فيعتبرك هجوم.`
          },
          teach: R`## السكربت بيعمل إيه؟

بيقرا لستة روابط من ملف، ويطلب كل رابط، ويطبع [[UP]] ومدة الرد أو [[DOWN]] والسبب. وفي الآخر بيخرج بـ 1 لو أي رابط واقع. كله من المكتبة الأساسية ([[urllib]])، من غير [[pip install]].

---

## ١. الـ imports

~~~python
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path
~~~

| الموديول | بنستخدم منه |
|---|---|
| [[time]] | [[time.perf_counter()]] لقياس المدة |
| [[urllib.request]] | [[Request]] و [[urlopen]]: يعمل الطلب |
| [[urllib.error]] | أنواع الأخطاء: [[HTTPError]] و [[URLError]] |

---

## ٢. الدالة [[check]]: رابط واحد

~~~python
def check(url: str, timeout: float = 5) -> tuple[bool, str]:
~~~

بترجّع **tuple** من حاجتين: [[True]] أو [[False]] (شغال ولا لأ)، ونص فيه التفاصيل. [[timeout]] افتراضيه 5 ثواني.

### الطلب

~~~python
req = urllib.request.Request(url, headers={"User-Agent": "uptime-check/1.0"})
start = time.perf_counter()
~~~

- [[Request]] بيجهّز الطلب من غير ما يبعته، وبيسمحلك تحط **headers**.
- [[User-Agent]] header بيقول للسيرفر مين اللي بيطلب. الافتراضي بتاع urllib شكله كده (جربته في [[python:3.13-slim]]):

~~~text الناتج
[('User-agent', 'Python-urllib/3.13')]
~~~

مواقع كتير بترفض ده بـ 403، فبنحط اسم السكربت.

- [[time.perf_counter()]] ساعة دقيقة لقياس المدد بس (الرقم نفسه ملوش معنى كتاريخ). بناخد قيمتها قبل وبعد ونطرح.

### الطلب نفسه

~~~python
try:
    with urllib.request.urlopen(req, timeout=timeout) as r:
        ms = (time.perf_counter() - start) * 1000
        return True, f"{r.status} in {ms:.0f} ms"
~~~

- [[urlopen(req, timeout=timeout)]] بيبعت الطلب. ولو السيرفر مردّش في 5 ثواني بيرمي error بدل ما يستنى للأبد.
- [[with ... as r]]: [[r]] الرد، وبيتقفل لوحده في الآخر.
- [[(... - start) * 1000]] المدة بالثواني × 1000 = ملي ثانية. و [[:.0f]] من غير كسور.
- [[r.status]] كود الرد: [[200]] = OK.
- [[return True, f"..."]]: فاصلة بين قيمتين = tuple.

### الأخطاء، والترتيب مهم

~~~python
except urllib.error.HTTPError as e:
    return False, f"HTTP {e.code}"
except (urllib.error.URLError, TimeoutError) as e:
    return False, f"error: {getattr(e, 'reason', e)}"
~~~

| الخطأ | حصل إيه | مثال |
|---|---|---|
| [[HTTPError]] | السيرفر **رد**، بس بكود 4xx أو 5xx | 404 صفحة مش موجودة، 500 السيرفر وقع |
| [[URLError]] | **مفيش رد**: DNS أو connection refused | دومين مش موجود، بورت مقفول |
| [[TimeoutError]] | الاتصال اتعمل والرد اتأخر عن الـ timeout | سيرفر بيرد بعد 7 ثواني |

[[HTTPError]] **ابن** [[URLError]] (subclass):

~~~text الناتج
issubclass(HTTPError, URLError)  ->  True
~~~

فلو [[URLError]] اتكتب الأول، كان هيمسك الـ 404 كمان، ومكناش هنعرف الكود. Python بيجرّب الـ [[except]] بالترتيب وياخد أول واحد يناسب.

[[getattr(e, 'reason', e)]]: هات [[e.reason]] لو موجودة (URLError عنده سبب زي [[Connection refused]])، ولو مش موجودة (TimeoutError) خد الـ error نفسه.

---

## ٣. [[main]]

~~~python
lines = path.read_text(encoding="utf-8").splitlines()
urls = [u.strip() for u in lines if u.strip() and not u.startswith("#")]
~~~

- [[splitlines()]] النص لـ list سطور.
- [[u.strip()]] بيشيل المسافات من الأول والآخر. ولو السطر فاضي بيبقى [[""]]، وده False فبيتساب.
- [[not u.startswith("#")]] بيسيب التعليقات.

~~~python
down = 0
for url in urls:
    ok, info = check(url)
    down += not ok
    print(f"{'UP  ' if ok else 'DOWN'}  {url:<40} {info}")
print(f"{len(urls) - down}/{len(urls)} up")
return 1 if down else 0
~~~

- [[ok, info = check(url)]] بيفك الـ tuple لمتغيرين.
- [[down += not ok]]: في Python [[True]] بيتحسب 1 و [[False]] 0. فلو الرابط واقع ([[ok]] False)، [[not ok]] True، والعداد يزيد 1.
- [['UP  ']] فيها مسافتين زيادة عشان تبقى بطول [['DOWN']] والأعمدة تبقى تحت بعض. و [[{url:<40}]] عرض 40 محاذي شمال.
- [[return 1 if down else 0]]: أي رابط واقع = exit 1. ده اللي cron و CI بيبصوا عليه.

---

## ٤. التشغيل

جربته في [[python:3.13-slim]] على Docker بـ [[urls.txt]] اللي في «جرّب»، ومعاه سيرفر Python صغير على [[127.0.0.1:18732]]: [[/boom]] بيرد 500، و [[/slow]] بيستنى 7 ثواني:

~~~text الناتج
UP    https://example.com                      200 in 240 ms
UP    https://www.python.org/                  200 in 413 ms
DOWN  https://pypi.org/nope-404                HTTP 404
DOWN  http://127.0.0.1:18732/boom              HTTP 500
DOWN  http://127.0.0.1:18732/slow?s=7          error: timed out
DOWN  http://127.0.0.1:1/                      error: [Errno 111] Connection refused
DOWN  http://no-such-host.invalid/             error: [Errno -2] Name or service not known
2/7 up
~~~

و [[echo $?]] طبع [[1]]. نقرا كل سطر DOWN:

| السطر | النوع | المعنى |
|---|---|---|
| [[HTTP 404]] | HTTPError | السيرفر شغال، الصفحة مش موجودة |
| [[HTTP 500]] | HTTPError | السيرفر شغال، التطبيق وقع |
| [[timed out]] | TimeoutError | اتصل، والرد اتأخر أكتر من 5 ثواني |
| [[Connection refused]] | URLError | مفيش حد سامع على البورت ده |
| [[Name or service not known]] | URLError | الدومين مش موجود في الـ DNS |

السطر الفاضي والسطر اللي بيبدأ بـ [[#]] مش ظاهرين. والأرقام ([[240 ms]]) بتتغير كل مرة.

### على ويندوز

جربته بـ Python 3.14 ونفس السيرفر: نفس الـ UP والـ 404 والـ 500 والـ timeout، و [[$LASTEXITCODE]] بـ 1. الفرق في رسايل الشبكة بس، لأنها جاية من نظام التشغيل:

| الحالة | لينكس | ويندوز |
|---|---|---|
| بورت مقفول | [[[Errno 111] Connection refused]] | [[[WinError 10061] No connection could be made because the target machine actively refused it]] |
| دومين مش موجود | [[[Errno -2] Name or service not known]] | [[[Errno 11001] getaddrinfo failed]] |

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[User-Agent]] | مواقع بترفض Python-urllib |
| [[timeout=5]] | موقع معلّق ميعلّقش السكربت |
| [[HTTPError]] قبل [[URLError]] | عشان تعرف الكود |
| [[down += not ok]] | عد الواقع |
| exit 1 | cron و CI يعرفوا |`,
          lines: [
            "الوصف.",
            "sys.",
            "time.",
            "أخطاء urllib.",
            "urllib.",
            "Path.",
            "يشيّك على رابط واحد، ويرجّع (شغال؟، تفاصيل):",
            "الطلب ومعاه User-Agent.",
            "ابدأ العد.",
            "حاول:",
            "اطلب بمهلة.",
            "المدة بالملي ثانية.",
            "شغال.",
            "السيرفر رد بـ 4xx أو 5xx:",
            "واقع، والكود.",
            "مفيش رد خالص:",
            "واقع، والسبب.",
            "main:",
            "سطور الملف.",
            "الروابط، من غير الفاضي والتعليقات.",
            "عداد الواقع.",
            "لكل رابط:",
            "شيّك.",
            "True = 1.",
            "سطر النتيجة.",
            "الملخص.",
            "1 لو أي واحد واقع.",
            "لو اتشغّل مباشرة:",
            "الملف من الـ argument أو urls.txt."
          ],
          sol: R`جربته على لينكس بالروابط اللي في «جرّب»، ومعاهم سيرفر محلي فيه رابط بيرد 500 ورابط بيتأخر 7 ثواني:

[[UP    https://example.com                      200 in 244 ms]]
[[UP    https://www.python.org/                  200 in 297 ms]]
[[DOWN  https://pypi.org/nope-404                HTTP 404]]
[[DOWN  http://127.0.0.1:18732/boom              HTTP 500]]
[[DOWN  http://127.0.0.1:18732/slow?s=7          error: timed out]]
[[DOWN  http://127.0.0.1:1/                      error: [Errno 111] Connection refused]]
[[DOWN  http://no-such-host.invalid/             error: [Errno -2] Name or service not known]]

وآخر سطر [[2/7 up]] و [[echo $?]] بـ 1. وعلى ويندوز الرسايل نفسها مختلفة: [[error: [WinError 10061] No connection could be made because the target machine actively refused it]] للبورت المقفول، و [[error: [Errno 11001] getaddrinfo failed]] للدومين اللي مش موجود. كل نوع فشل ليه رسالة مختلفة، ودي اللي بتقولك تبدأ تدوّر فين: DNS ولا السيرفر واقف ولا التطبيق بيرمي errors.`
        },
        {
          cmd: "backup_zip.py",
          title: "backup لفولدر في zip بالتاريخ، ويفضل آخر N بس",
          desc: R`[[shutil.make_archive]] بيعمل zip (أو tar.gz) لفولدر كامل في سطر. السكربت بيسمّي الملف بالتاريخ والوقت ([[project_2026-10-01_161650.zip]])، وبعدين يمسح القديم ويسيب آخر [[--keep]] نسخ، عشان الـ backups متاكلش الـ disk.

وبيرفض لو فولدر الـ backup جوه الفولدر اللي بيتعمله backup: الـ zip كان هيبقى جوه نفسه.`,
          example: R`#!/usr/bin/env python3
"""Zip a folder to DEST/NAME_YYYY-MM-DD_HHMMSS.zip and keep only the newest N."""
import argparse
import shutil
import sys
from datetime import datetime
from pathlib import Path
def backup(src: Path, dest: Path) -> Path:
    dest.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now().strftime("%Y-%m-%d_%H%M%S")
    base = dest / f"{src.name}_{stamp}"
    return Path(shutil.make_archive(str(base), "zip", root_dir=src.parent, base_dir=src.name))
def prune(dest: Path, name: str, keep: int) -> list[Path]:
    old = sorted(dest.glob(f"{name}_*.zip"))[:-keep]
    for p in old:
        p.unlink()
    return old
def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("src", type=Path)
    ap.add_argument("dest", type=Path)
    ap.add_argument("--keep", type=int, default=7, help="how many backups to keep (default: %(default)s)")
    args = ap.parse_args()
    src = args.src.expanduser().resolve()
    dest = args.dest.expanduser().resolve()
    if not src.is_dir():
        sys.exit(f"error: {src} is not a folder")
    if dest.is_relative_to(src):
        sys.exit("error: dest must not be inside src (the zip would include itself)")
    archive = backup(src, dest)
    print(f"created {archive.name} ({archive.stat().st_size / 1024:.1f} KB)")
    for p in prune(dest, src.name, args.keep):
        print(f"removed old backup {p.name}")
    return 0
if __name__ == "__main__":
    sys.exit(main())`,
          try: R`[[mkdir -p project/src && echo 'print("hi")' > project/src/app.py && head -c 50000 /dev/urandom > project/data.bin]]. شغّل [[python3 backup_zip.py project backups --keep 2]] تلات مرات بينهم ثانية، وبعدين [[ls backups]] و [[python3 -m zipfile -l]] على آخر واحد. وجرّب [[python3 backup_zip.py project project/backups]]. على ويندوز سطر التجهيز ده bash، شغّله في Git Bash (جربته كده وطلع نفس الناتج).`,
          flag: "script",
          deep: {
            why: R`أول مرة الـ disk يبوظ أو حد يمسح فولدر غلط، الـ backup هو الفرق بين «رجّعته في دقيقة» و «ضاع». و backup باسم ثابت بيدوس على اللي قبله، و backups من غير تنضيف بتملا الـ disk في شهر.`,
            how: R`[[make_archive(base, "zip", root_dir, base_dir)]]: [[base]] اسم الملف من غير [[.zip]] (بيضيفه لوحده ويرجّع المسار كامل). [[root_dir]] الفولدر اللي الأرشيف بيبدأ منه، و [[base_dir]] اللي جواه هيتحط. كده الـ zip جواه [[project/...]] مش المسارات الكاملة من [[/home]]. والأنواع: [["zip"]] و [["gztar"]] و [["bztar"]] و [["xztar"]].

[[prune]]: الأسماء فيها التاريخ بـ ISO، فـ [[sorted]] بالاسم = بالتاريخ. و [[[:-keep] ]] كل حاجة إلا آخر keep. لو عندك أقل من keep، [[[:-keep] ]] بترجع فاضية فمحدش بيتمسح.

[[is_relative_to]] (Python 3.9+) بيقول لو المسار جوه مسار تاني، بعد ما الاتنين اتعملهم [[resolve()]].

[[make_archive]] مبيستبعدش حاجات. لو عايز تسيب [[node_modules]] و [[.venv]] و [[.git]]: [[zipfile.ZipFile(path, "w", zipfile.ZIP_DEFLATED)]] ولف بـ [[Path.walk()]] واعمل [[zf.write(file, file.relative_to(root))]] للي عايزه بس.

والـ backup على نفس الـ disk بيحميك من غلطة إيد بس، مش من disk بايظ. انقله لمكان تاني: [[rsync]] أو [[rclone]] أو هارد خارجي.`,
            when: "قبل أي تعديل كبير، وكل ليلة بـ cron لفولدرات مهمة (المشاريع، المستندات، dumps قاعدة البيانات).",
            mistakes: R`الـ dest جوه الـ src. والاسم من غير ثواني فتشغيلتين في نفس الدقيقة يدوسوا على بعض. ومن غير prune. و backup عمره ما اتجرب يترجع: مرة كل فترة افتح واحد بـ [[python -m zipfile -e backup.zip /tmp/restore]] واتأكد إن الملفات سليمة.`
          },
          teach: R`## السكربت بيعمل إيه؟

بيعمل ملف zip لفولدر كامل، اسمه فيه التاريخ والوقت، في فولدر backups. وبعدين بيمسح الـ zips القديمة ويسيب آخر [[--keep]] بس. دالتين صغيرين: [[backup]] و [[prune]]، و [[main]] بيربطهم ويتأكد من المسارات.

---

## ١. الدالة [[backup]]

~~~python
def backup(src: Path, dest: Path) -> Path:
    dest.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now().strftime("%Y-%m-%d_%H%M%S")
    base = dest / f"{src.name}_{stamp}"
    return Path(shutil.make_archive(str(base), "zip", root_dir=src.parent, base_dir=src.name))
~~~

### [[mkdir(parents=True, exist_ok=True)]]

اعمل فولدر الـ backups. [[parents=True]] يعمل الفولدرات اللي فوقه لو ناقصة (زي [[mkdir -p]])، و [[exist_ok=True]] من غير error لو موجود.

### [[strftime]]: الوقت كنص

[[datetime.now()]] الوقت دلوقتي، و [[strftime]] (من **str**ing **f**ormat **time**) بتحوّله نص بالشكل اللي تقوله:

| الكود | معناه | مثال |
|---|---|---|
| [[%Y]] | السنة 4 أرقام | [[2026]] |
| [[%m]] | الشهر رقمين | [[10]] |
| [[%d]] | اليوم رقمين | [[06]] |
| [[%H]] | الساعة 24 ساعة | [[17]] |
| [[%M]] | الدقيقة | [[05]] |
| [[%S]] | الثانية | [[09]] |

فـ [[datetime(2026, 10, 6, 17, 5, 9)]] بقت [[2026-10-06_170509]] (جربتها في [[python:3.13-slim]]). الترتيب ده (سنة ثم شهر ثم يوم) اسمه ISO، وميزته إن الترتيب **بالاسم** = الترتيب **بالوقت**. والثواني موجودة عشان تشغيلتين في نفس الدقيقة ميدوسوش على بعض.

### [[make_archive]] من جوه لبرة

1. [[base = dest / f"{src.name}_{stamp}"]]: [[backups/project_2026-10-06_170509]] من غير [[.zip]]، لأن [[make_archive]] بيضيفه.
2. [[str(base)]]: الدالة دي قديمة وبتاخد نص.
3. [["zip"]] النوع. فيه كمان [["gztar"]] (tar.gz) و [["bztar"]] و [["xztar"]].
4. [[root_dir=src.parent]] و [[base_dir=src.name]]: «ادخل الفولدر اللي فوق project، واضغط project من هناك». كده المسارات جوه الـ zip تبدأ بـ [[project/...]] مش بالمسار الكامل.
5. [[make_archive]] بترجّع مسار الملف اللي عملته كنص، و [[Path(...)]] بيرجّعه Path.

---

## ٢. الدالة [[prune]]

~~~python
def prune(dest: Path, name: str, keep: int) -> list[Path]:
    old = sorted(dest.glob(f"{name}_*.zip"))[:-keep]
    for p in old:
        p.unlink()
    return old
~~~

- [[dest.glob(f"{name}_*.zip")]] الـ backups بتاعة الفولدر ده بس (لو فولدر الـ backups فيه backups لمشاريع تانية، مش هيلمسها).
- [[sorted]] بالاسم = بالتاريخ، الأقدم الأول.
- [[[:-keep] ]] **slice**: «من الأول لحد قبل آخر keep». يعني كل حاجة **إلا** آخر keep:

~~~text الناتج
[1, 2, 3, 4][:-2]   ->   [1, 2]
[1][:-2]            ->   []
~~~

السطر التاني مهم: لو عندك أقل من keep، الـ slice بترجّع فاضية، فمحدش بيتمسح.

- [[p.unlink()]] يمسح، والدالة بترجّع اللي اتمسح عشان [[main]] يطبعه.

> خلي بالك من [[--keep 0]]: [[[:-0] ]] هي [[[:0] ]]، يعني list فاضية، فمش هيمسح حاجة خالص (مش هيمسح كله).

---

## ٣. [[main]]

### الـ arguments

~~~python
ap.add_argument("src", type=Path)
ap.add_argument("dest", type=Path)
ap.add_argument("--keep", type=int, default=7, help="how many backups to keep (default: %(default)s)")
~~~

[[%(default)s]] جوه الـ help بتتبدل بالقيمة الافتراضية لوحدها. ده الـ help الحقيقي:

~~~text python3 backup_zip.py --help
usage: backup_zip.py [-h] [--keep KEEP] src dest

Zip a folder to DEST/NAME_YYYY-MM-DD_HHMMSS.zip and keep only the newest N.

positional arguments:
  src
  dest

options:
  -h, --help   show this help message and exit
  --keep KEEP  how many backups to keep (default: 7)
~~~

### الفحوصات

~~~python
src = args.src.expanduser().resolve()
dest = args.dest.expanduser().resolve()
if not src.is_dir():
    sys.exit(f"error: {src} is not a folder")
if dest.is_relative_to(src):
    sys.exit("error: dest must not be inside src (the zip would include itself)")
~~~

- [[resolve()]] على الاتنين: مسارات كاملة، عشان المقارنة تبقى صح حتى لو كتبت [[./project/../project]].
- [[sys.exit("نص")]] يطبع الرسالة على stderr ويخرج بـ 1.
- [[is_relative_to]] (من Python 3.9): هل المسار ده جوه المسار ده؟

~~~text الناتج
Path('/w/project/backups').is_relative_to('/w/project')   ->   True
Path('/w/backups').is_relative_to('/w/project')           ->   False
~~~

لو الـ backups جوه الفولدر، كل backup جديد كان هيضغط الـ backups اللي قبله جواه، والحجم يتضاعف كل مرة.

### التنفيذ

~~~python
archive = backup(src, dest)
print(f"created {archive.name} ({archive.stat().st_size / 1024:.1f} KB)")
for p in prune(dest, src.name, args.keep):
    print(f"removed old backup {p.name}")
~~~

الحجم بالـ byte ÷ 1024 = KB، و [[:.1f]] رقم عشري واحد.

---

## ٤. التشغيل

في [[python:3.13-slim]] على Docker، تلات مرات بينهم ثانية:

~~~bash
python3 backup_zip.py project backups --keep 2
~~~

~~~text الناتج (التلات مرات)
created project_2026-10-06_174448.zip (49.3 KB)
created project_2026-10-06_174449.zip (49.3 KB)
created project_2026-10-06_174450.zip (49.3 KB)
removed old backup project_2026-10-06_174448.zip
~~~

أول مرتين محدش اتمسح (2 مش أكتر من keep). التالتة بقوا 3، فالأقدم اتمسح. وده اللي جوه آخر واحد:

~~~bash
python3 -m zipfile -l backups/project_2026-10-06_174450.zip
~~~

~~~text الناتج
File Name                                             Modified             Size
project/                                       2026-10-06 17:44:48            0
project/src/                                   2026-10-06 17:44:48            0
project/data.bin                               2026-10-06 17:44:48        50000
project/src/app.py                             2026-10-06 17:44:48           12
~~~

- [[python3 -m zipfile -l]]: موديول zipfile نفسه بيشتغل كأمر، و [[-l]] (list) يعرض المحتوى.
- كله تحت [[project/]]: ده شغل [[root_dir]] و [[base_dir]].
- 49.3 KB والـ [[data.bin]] 50000 byte: البيانات random فالضغط مافرقش تقريبًا. على كود حقيقي بيصغر كتير.

والغلط:

~~~text الناتج
$ python3 backup_zip.py project project/backups
error: dest must not be inside src (the zip would include itself)      (exit 1)
$ python3 backup_zip.py nope backups
error: /w/nope is not a folder                                          (exit 1)
~~~

على ويندوز (التجهيز في Git Bash، والسكربت بـ Python 3.14) نفس الناتج بالظبط، والمسارات جوه الـ zip برضه بـ [[/]] لأن ده شكل zip الرسمي.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[%Y-%m-%d_%H%M%S]] | اسم فريد، وبيترتب بالوقت |
| [[root_dir]] + [[base_dir]] | المسارات جوه الـ zip قصيرة |
| [[[:-keep] ]] | كله إلا آخر keep |
| [[is_relative_to]] | الـ zip ميبقاش جوه نفسه |
| [[sys.exit("...")]] | رسالة و exit 1 |`,
          lines: [
            "الوصف.",
            "argparse.",
            "shutil.",
            "sys.",
            "datetime.",
            "Path.",
            "اعمل الـ zip:",
            "فولدر الـ backups.",
            "الوقت في الاسم.",
            "المسار من غير .zip.",
            "اعمله، وجواه اسم الفولدر بس، ورجّع مساره.",
            "امسح القديم:",
            "كله إلا آخر keep (الترتيب بالاسم = بالتاريخ).",
            "لكل واحد قديم:",
            "امسحه.",
            "رجّع اللي اتمسح.",
            "main:",
            "الـ parser.",
            "الفولدر.",
            "فين الـ backups.",
            "كام نسخة تفضل.",
            "اقرا.",
            "مسار كامل.",
            "مسار كامل.",
            "مش فولدر؟",
            "اخرج.",
            "الـ dest جوه الـ src؟",
            "ارفض.",
            "اعمل الـ backup.",
            "اسمه وحجمه.",
            "نضّف القديم...",
            "...واطبع اللي اتمسح.",
            "نجح.",
            "لو اتشغّل مباشرة:",
            "شغّل."
          ],
          sol: R`التلات مرات:

[[created project_2026-10-01_161650.zip (49.3 KB)]]
[[created project_2026-10-01_161651.zip (49.3 KB)]]
[[created project_2026-10-01_161652.zip (49.3 KB)]]
[[removed old backup project_2026-10-01_161650.zip]]

و [[ls backups]] فيه آخر اتنين بس. و [[python3 -m zipfile -l]] طلّع [[project/]] و [[project/src/]] و [[project/data.bin  50000]] و [[project/src/app.py  12]]: كله تحت [[project/]] مش مسارات كاملة. (البيانات random فالضغط مافرقش، على كود حقيقي الحجم بيقل كتير.)

و [[project/backups]]: [[error: dest must not be inside src (the zip would include itself)]] و exit 1.`
        },
        {
          cmd: "resize_images.py",
          title: "صغّر صور كتير مرة واحدة بـ Pillow",
          desc: R`صور الموبايل 4000×3000 وحجمها 5 ميجا، والموقع أو الإيميل محتاجها 1600 وحجمها مئات الكيلوبايتس. [[Pillow]] ([[pip install Pillow]]) هي مكتبة الصور في Python: تفتح وتلف وتصغّر وتحفظ.

السكربت بيصغّر كل صورة بحيث أطول ضلع ميعديش [[--max]] من غير ما يبوّظ النسبة، ويلف الصورة حسب EXIF (صور الموبايل الطولية)، ويحفظ JPEG في فولدر تاني. والأصل مبيتلمسش. ولو Pillow مش متسطبة بيقولك تسطبها بدل traceback.`,
          example: R`#!/usr/bin/env python3
"""Resize images so the longest side is at most --max px, saved as JPEG in OUT."""
import argparse
import sys
from pathlib import Path
try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Pillow is missing: python -m pip install Pillow")
EXTS = {".jpg", ".jpeg", ".png", ".webp"}
def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("src", type=Path)
    ap.add_argument("out", type=Path)
    ap.add_argument("--max", type=int, default=1600, help="longest side in px (default: %(default)s)")
    ap.add_argument("--quality", type=int, default=85)
    args = ap.parse_args()
    args.out.mkdir(parents=True, exist_ok=True)
    for p in sorted(args.src.iterdir()):
        if p.suffix.lower() not in EXTS:
            continue
        target = args.out / (p.stem + ".jpg")
        with Image.open(p) as im:
            im = ImageOps.exif_transpose(im)
            before = im.size
            im.thumbnail((args.max, args.max))
            if im.mode in ("RGBA", "LA", "P"):
                im = im.convert("RGBA")
                bg = Image.new("RGB", im.size, "white")
                bg.paste(im, mask=im.getchannel("A"))
                im = bg
            im.convert("RGB").save(target, "JPEG", quality=args.quality, optimize=True)
        print(f"{p.name}: {before[0]}x{before[1]} -> {im.size[0]}x{im.size[1]}, "
              f"{p.stat().st_size // 1024} KB -> {target.stat().st_size // 1024} KB")
    return 0
if __name__ == "__main__":
    sys.exit(main())`,
          try: R`حط في فولدر [[photos]] كام صورة من موبايلك (منهم واحدة طولية) و PNG شفاف (لوجو)، وملف txt. [[pip install Pillow]] في venv وشغّل [[python resize_images.py photos small --max 1600]]. افتح الصورة الطولية والـ PNG في [[small]]. وبعدين جرّب [[python3 -S resize_images.py photos small]] (بيشغّل Python من غير المكتبات المتسطبة).`,
          flag: "script",
          deep: {
            why: R`رفع ٢٠٠ صورة لموقع أو إرسالهم بإيميل بحجمهم الأصلي: بطيء وممكن يترفض. وبرنامج صور بيصغّرهم واحدة واحدة. السكربت ثواني.`,
            how: R`[[try: from PIL import ...]] و [[except ImportError]]: الـ dependency اختيارية، فالرسالة بتقول الحل بدل [[ModuleNotFoundError]]. (اسم المكتبة Pillow بس الـ import [[PIL]].)

[[ImageOps.exif_transpose]]: الموبايل بيحفظ الصورة الطولية بالعرض ومعاها علامة EXIF «لفّها». المتصفح بيقرا العلامة، بس لما تصغّر وتحفظ من غيرها الصورة بتطلع نايمة. السطر ده بيلفها فعلًا ويشيل العلامة.

[[thumbnail((max, max))]] بيصغّر في نفس الـ object ويحافظ على النسبة، ومبيكبّرش صورة أصغر من الحد (اللوجو 800×400 فضل زي ما هو).

JPEG مفيهوش شفافية. [[convert("RGB")]] لوحده بيرمي الشفافية وساعات الأماكن الشفافة تطلع سودا. فبنلصق الصورة على خلفية بيضا باستخدام قناة الشفافية [[getchannel("A")]] كـ mask.

[[quality=85, optimize=True]] توازن كويس بين الحجم والجودة. والسطر الطويل مقسوم على سطرين: f-strings جنب بعض جوه الأقواس بيتلزقوا لوحدهم.`,
            when: "صور لموقع أو متجر، ومرفقات إيميل، وأرشيف صور بمساحة أقل. ولو محتاج حاجات أكتر (watermark، قص، WebP) كلها في Pillow.",
            mistakes: R`تحفظ فوق الأصل (لو فيه bug ضاعت الصور). وتنسى exif_transpose فالصور الطولية تنام. و [[im.resize((1600, 1200))]] بمقاس ثابت فالصور الطولية تتمط. و PNG شفاف لـ JPEG من غير خلفية.`
          },
          teach: R`## السكربت بيعمل إيه؟

بيلف على الصور اللي في فولدر، ويصغّر كل واحدة بحيث أطول ضلع ميعديش [[--max]] بكسل، ويحفظها JPEG في فولدر تاني. الأصل مبيتلمسش. وبيحل ٣ مشاكل بتقابل أي حد: الصور الطولية اللي بتنام، والـ PNG الشفاف اللي بيسوّد، و Pillow مش متسطبة.

---

## ١. Pillow: الـ import اللي ممكن يفشل

~~~python
try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Pillow is missing: python -m pip install Pillow")
~~~

- **Pillow** مكتبة الصور في Python، ومش جزء من المكتبة الأساسية: لازم [[pip install Pillow]] (في venv). اسمها في pip [[Pillow]]، بس الـ import [[PIL]] (اسم المكتبة القديمة اللي Pillow كمّلتها).
- [[Image]] للفتح والحفظ والتعديل، و [[ImageOps]] عمليات جاهزة زي اللف.
- لو مش متسطبة، [[import]] بيرمي [[ModuleNotFoundError]]، وده نوع من [[ImportError]] (ابنه)، فالـ except بيمسكه. بدل traceback طويل، السكربت بيطبع الحل ويخرج بـ 1.

جربتها بـ [[python3 -S]]: الـ [[-S]] بتشغّل Python من غير ما يحمّل المكتبات المتسطبة (site-packages)، فكأن Pillow مش موجودة:

~~~text الناتج (exit 1)
Pillow is missing: python -m pip install Pillow
~~~

---

## ٢. الـ arguments

~~~python
EXTS = {".jpg", ".jpeg", ".png", ".webp"}
ap.add_argument("src", type=Path)
ap.add_argument("out", type=Path)
ap.add_argument("--max", type=int, default=1600, help="longest side in px (default: %(default)s)")
ap.add_argument("--quality", type=int, default=85)
~~~

| الـ argument | معناه |
|---|---|
| [[src]] | فولدر الصور الأصلية |
| [[out]] | فولدر الناتج (لازم يبقى غير الأصل) |
| [[--max]] | أطول ضلع بالبكسل، افتراضيه 1600 |
| [[--quality]] | جودة JPEG من 1 لـ 95 تقريبًا، 85 توازن كويس |

و [[args.out.mkdir(parents=True, exist_ok=True)]] يعمل فولدر الناتج.

---

## ٣. اللفة

~~~python
for p in sorted(args.src.iterdir()):
    if p.suffix.lower() not in EXTS:
        continue
    target = args.out / (p.stem + ".jpg")
~~~

- امتداد مش صورة ([[notes.txt]]) بيتساب.
- [[p.stem + ".jpg"]]: نفس الاسم بامتداد [[.jpg]]، فـ [[logo.png]] بيبقى [[logo.jpg]] و [[IMG_0002.JPG]] بيبقى [[IMG_0002.jpg]].

### فتح الصورة

~~~python
with Image.open(p) as im:
    im = ImageOps.exif_transpose(im)
    before = im.size
~~~

**EXIF** معلومات بتتحفظ جوه ملف الصورة: الكاميرا، والتاريخ، و**الاتجاه** (Orientation). الموبايل لما تصوّر طولي ساعات بيحفظ البكسلات بالعرض ويكتب في EXIF «لف 90 درجة» (القيمة 6). المتصفح وبرامج الصور بيقروا العلامة ويلفّوا. بس لو صغّرت وحفظت من غير ما تلف، الصورة الجديدة بتطلع نايمة.

[[ImageOps.exif_transpose(im)]] بيلف البكسلات فعلًا حسب العلامة. عملت صورة تجربة متخزنة 3000×4000 ومعاها Orientation = 6 (في [[python:3.13-slim]] بـ Pillow 12.3.0):

~~~text الناتج
im.size                         ->  (3000, 4000)
im.getexif().get(0x0112)        ->  6
exif_transpose(im).size         ->  (4000, 3000)
~~~

([[0x0112]] رقم خانة Orientation في EXIF.) و [[im.size]] tuple [[(العرض، الطول)]]، وبنحفظه قبل التصغير عشان نطبعه.

### التصغير

~~~python
im.thumbnail((args.max, args.max))
~~~

[[thumbnail]] بيصغّر الصورة **في مكانها** (مش بيرجّع صورة جديدة) بحيث تدخل جوه مربع [[max × max]]، ومن غير ما يغيّر النسبة:

~~~text الناتج
4000x3000  ->  thumbnail((1600, 1600))  ->  1600x1200
~~~

4000 بقت 1600 (÷ 2.5)، و 3000 ÷ 2.5 = 1200. ولو الصورة أصغر من الحد أصلًا، [[thumbnail]] مبيكبّرهاش.

### الشفافية

~~~python
if im.mode in ("RGBA", "LA", "P"):
    im = im.convert("RGBA")
    bg = Image.new("RGB", im.size, "white")
    bg.paste(im, mask=im.getchannel("A"))
    im = bg
~~~

**mode** هو نوع البكسلات:

| الـ mode | معناه |
|---|---|
| [[RGB]] | أحمر وأخضر وأزرق، من غير شفافية |
| [[RGBA]] | نفس الكلام + [[A]] (Alpha): الشفافية |
| [[LA]] | رمادي + شفافية |
| [[P]] | Palette: ألوان محدودة من جدول، وممكن فيها لون شفاف |

JPEG مفيهوش شفافية. لو حوّلت لـ RGB على طول، الأماكن الشفافة بتطلع بلون البكسل المتخزن تحتها، وفي اللوجو بتاعي كان أسود:

~~~text الناتج
logo.png mode RGBA, convert("RGB").getpixel((0, 0))  ->  (0, 0, 0)
~~~

فالحل:

1. [[convert("RGBA")]] يوحّد الـ 3 أنواع لنوع واحد فيه قناة A.
2. [[Image.new("RGB", im.size, "white")]] صورة بيضا بنفس المقاس.
3. [[bg.paste(im, mask=im.getchannel("A"))]] يلصق الصورة على الأبيض، والـ **mask** (قناة الشفافية) بيقول كل بكسل يتلصق قد إيه: المعتم يتلصق كامل، والشفاف ميتلصقش فيفضل أبيض.
4. [[im = bg]] نكمل بالنسخة البيضا.

### الحفظ

~~~python
im.convert("RGB").save(target, "JPEG", quality=args.quality, optimize=True)
~~~

- [[convert("RGB")]] للاحتياط (صورة [[L]] رمادي أو [[CMYK]] مثلًا).
- [["JPEG"]] الصيغة، و [[quality]] الجودة، و [[optimize=True]] بيعمل pass زيادة يصغّر الملف من غير ما يقلل الجودة.

### الطباعة

~~~python
print(f"{p.name}: {before[0]}x{before[1]} -> {im.size[0]}x{im.size[1]}, "
      f"{p.stat().st_size // 1024} KB -> {target.stat().st_size // 1024} KB")
~~~

- [[before[0] ]] العرض و [[before[1] ]] الطول.
- [[//]] قسمة صحيحة: من غير كسور.
- السطر متقسم على سطرين: f-string ورا f-string جوه أقواس [[print]] بيتلزقوا لوحدهم في نص واحد.

---

## ٤. التشغيل

عملت صور تجربة بـ Pillow (بكسلات random، فالضغط أوحش من صور حقيقية): [[IMG_0001.jpg]] عادية 4000×3000، و [[IMG_0002.JPG]] متخزنة طولية بـ Orientation 6، و [[logo.png]] شفاف 800×400 في نصه مستطيل أحمر، و [[notes.txt]]:

~~~bash
python resize_images.py photos small --max 1600
~~~

~~~text الناتج (python:3.13-slim، Pillow 12.3.0)
IMG_0001.jpg: 4000x3000 -> 1600x1200, 13752 KB -> 763 KB
IMG_0002.JPG: 4000x3000 -> 1600x1200, 13755 KB -> 763 KB
logo.png: 800x400 -> 800x400, 1 KB -> 3 KB
~~~

| السطر | نقراه إزاي |
|---|---|
| [[IMG_0002.JPG: 4000x3000]] | المقاس **بعد** [[exif_transpose]]، فاتلفت فعلًا |
| [[logo.png: 800x400 -> 800x400]] | أصغر من 1600، فمكبرش |
| [[1 KB -> 3 KB]] | PNG لونين بيضغط أحسن من JPEG، فالـ JPEG أكبر هنا |
| [[notes.txt]] | مش موجود: اتساب |

وفي [[small/logo.jpg]] بكسل الركن (كان شفاف) [[(255, 255, 255)]] أبيض، والنص [[(200, 30, 30)]] الأحمر.

على ويندوز (Python 3.14 في venv و Pillow) نفس السطور، والأحجام بتفرق كيلو واحد ([[13751 KB]]) لأن البكسلات random. و [[py -S]] طبع نفس رسالة Pillow is missing.

---

## الخلاصة

| المشكلة | الكود |
|---|---|
| Pillow مش متسطبة | [[try/except ImportError]] |
| الصورة الطولية بتنام | [[ImageOps.exif_transpose]] |
| المقاس من غير مط | [[thumbnail((max, max))]] |
| الشفاف بيسوّد | خلفية بيضا + [[paste(..., mask=A)]] |
| الأصل في أمان | فولدر ناتج تاني |`,
          lines: [
            "الوصف.",
            "argparse.",
            "sys.",
            "Path.",
            "حاول تستورد Pillow:",
            "Image للفتح والحفظ، و ImageOps للف.",
            "مش متسطبة:",
            "قول الحل واخرج.",
            "الامتدادات المقبولة.",
            "main:",
            "الـ parser.",
            "فولدر الصور.",
            "فولدر الناتج.",
            "أطول ضلع.",
            "جودة JPEG.",
            "اقرا.",
            "اعمل فولدر الناتج.",
            "لكل ملف:",
            "مش صورة؟",
            "سيبه.",
            "الاسم الجديد بـ .jpg في فولدر الناتج.",
            "افتح الصورة:",
            "لفّها حسب EXIF.",
            "المقاس قبل.",
            "صغّر وحافظ على النسبة.",
            "فيها شفافية؟",
            "وحّد الشكل لـ RGBA.",
            "خلفية بيضا بنفس المقاس.",
            "الصق الصورة عليها، والشفاف يبان أبيض.",
            "كمّل بالنسخة دي.",
            "احفظ JPEG.",
            "المقاس والحجم قبل وبعد...",
            "...(الـ f-string متقسم على سطرين).",
            "نجح.",
            "لو اتشغّل مباشرة:",
            "شغّل."
          ],
          sol: R`جربتها على صور تجربة كبيرة (noise مولّد بـ Pillow، فالضغط أوحش من صور حقيقية):

[[IMG_0001.jpg: 4000x3000 -> 1600x1200, 10914 KB -> 728 KB]]
[[IMG_0002.JPG: 4000x3000 -> 1600x1200, 9564 KB -> 589 KB]]
[[logo.png: 800x400 -> 800x400, 1 KB -> 4 KB]]

[[IMG_0002.JPG]] متخزنة 3000×4000 ومعاها EXIF orientation = 6، فبعد [[exif_transpose]] بقت 4000×3000 بالشكل اللي الموبايل كان بيعرضه. واللوجو ماتكبّرش، وفي [[small/logo.jpg]] بكسل الركن (اللي كان شفاف) طلع [[(255, 255, 255)]] أبيض، والجزء الأحمر [[(200, 30, 30)]]. و [[notes.txt]] اتساب.

[[python3 -S]]: [[Pillow is missing: python -m pip install Pillow]] و exit 1.`
        },
        {
          cmd: "notify.py",
          title: "السكربت يبعتلك إيميل لما يخلص أو يفشل",
          desc: R`سكربت متجدول بالليل محتاج يقولك النتيجة. [[smtplib]] و [[email.message.EmailMessage]] في المكتبة الأساسية بيبعتوا إيميل بعنوان ونص عربي ومرفقات.

الإعدادات (السيرفر والبورت والإيميل والباسورد) من متغيرات البيئة، مش من الكود. ومع Gmail أو Outlook الباسورد مش باسورد حسابك: «App Password» بتعمله من إعدادات الأمان بعد تفعيل التحقق بخطوتين، ومخصوص للسكربت ده، وتقدر تلغيه لوحده.`,
          example: R`#!/usr/bin/env python3
"""Send a short email: notify.py SUBJECT BODY [ATTACHMENT]. Settings come from the environment."""
import mimetypes
import os
import smtplib
import ssl
import sys
from email.message import EmailMessage
from pathlib import Path
def send_mail(subject: str, body: str, attachment: Path | None = None) -> None:
    host = os.environ.get("SMTP_HOST", "smtp.gmail.com")
    port = int(os.environ.get("SMTP_PORT", "587"))
    user = os.environ["SMTP_USER"]
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = user
    msg["To"] = os.environ.get("MAIL_TO", user)
    msg.set_content(body)
    if attachment:
        ctype = mimetypes.guess_type(attachment.name)[0] or "application/octet-stream"
        maintype, subtype = ctype.split("/", 1)
        msg.add_attachment(attachment.read_bytes(), maintype=maintype, subtype=subtype, filename=attachment.name)
    with smtplib.SMTP(host, port, timeout=20) as smtp:
        if os.environ.get("SMTP_TLS", "1") == "1":
            smtp.starttls(context=ssl.create_default_context())
            smtp.login(user, os.environ["SMTP_PASSWORD"])
        smtp.send_message(msg)
if __name__ == "__main__":
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    try:
        send_mail(sys.argv[1], sys.argv[2], Path(sys.argv[3]) if len(sys.argv) > 3 else None)
    except KeyError as e:
        sys.exit(f"error: environment variable {e} is not set")
    except (smtplib.SMTPException, OSError) as e:
        sys.exit(f"error: could not send: {e}")
    print("sent")`,
          try: R`جرّب من غير ما تبعت إيميل حقيقي: [[pip install aiosmtpd]] وفي ترمنال تاني [[python -m aiosmtpd -n -l localhost:8025]] (سيرفر بيطبع أي إيميل يوصله). وبعدين [[SMTP_HOST=localhost SMTP_PORT=8025 SMTP_TLS=0 SMTP_USER=bot@example.com MAIL_TO=you@example.com python3 notify.py "Backup ok: 3 files" "النسخة الاحتياطية خلصت" report.csv]]. وجرّب من غير [[SMTP_USER]]، وبـ [[SMTP_TLS=1]] على نفس السيرفر.

في PowerShell المتغيرات بتتكتب قبلها: [[$env:SMTP_HOST="localhost"; $env:SMTP_PORT="8025"; $env:SMTP_TLS="0"; $env:SMTP_USER="bot@example.com"; $env:MAIL_TO="you@example.com"]] وبعدين [[python notify.py "Backup ok: 3 files" "النسخة الاحتياطية خلصت" report.csv]].`,
          flag: "script",
          deep: {
            why: R`cron بيشغّل الـ backup الساعة 2 بالليل وبيفشل، ومحدش بيعرف لحد ما تحتاج الـ backup. إيميل «فشل» (أو تقرير كل يوم) بيقفل الدايرة.`,
            how: R`[[EmailMessage]]: الـ headers زي dict ([[msg["Subject"] ]])، و [[set_content]] النص (العربي بيتعمله encoding لوحده). و [[add_attachment]] محتاج النوع: [[mimetypes.guess_type("report.csv")]] بيرجّع [[text/csv]].

البورت 587 مع [[starttls()]]: الاتصال يبدأ عادي وبعدين يتشفّر قبل الـ login. و [[ssl.create_default_context()]] بيتأكد من شهادة السيرفر. (فيه كمان بورت 465 بـ [[smtplib.SMTP_SSL]] مشفّر من الأول.) و [[SMTP_TLS=0]] للتجربة المحلية بس، عمره ما يتحط مع سيرفر حقيقي.

[[os.environ["SMTP_USER"] ]] بـ [[[]]] مش get: لو ناقص يرمي [[KeyError]]، والـ except اللي تحت بيحوّله رسالة مفهومة.

[[timeout=20]] عشان سيرفر مش بيرد ميعلّقش السكربت. و [[OSError]] بيمسك connection refused و DNS.

بدائل أبسط من الإيميل: Telegram bot أو Slack أو Discord webhook أو ntfy.sh: كلهم [[requests.post(url, json=...)]] واحد. الإيميل لسه الأنسب لتقارير فيها مرفقات.`,
            when: "آخر أي سكربت متجدول: لو فشل دايمًا، ولو نجح حسب الحاجة. ومتبعتش إيميل كل 5 دقايق.",
            mistakes: R`باسورد حسابك الحقيقي جوه السكربت (أو حتى في .env بدل App Password). و [[SMTP_TLS=0]] على النت. وإيميل في loop لكل ملف فـ Gmail يقفل الحساب كـ spam. والسكربت يفشل لأن الإيميل فشل، والشغل نفسه كان نجح: خلّي الإيميل في try لوحده.`
          },
          teach: R`## السكربت بيعمل إيه؟

بيبعت إيميل فيه عنوان ونص ومرفق اختياري: [[notify.py SUBJECT BODY [ATTACHMENT] ]]. وكل إعدادات السيرفر من متغيرات البيئة، فالباسورد عمره ما بيبقى جوه الكود. وأي فشل بيطلع سطر واحد مفهوم و exit 1.

---

## ١. الـ imports

| الموديول | بيعمل إيه |
|---|---|
| [[mimetypes]] | يخمّن نوع الملف من امتداده ([[report.csv]] ← [[text/csv]]) |
| [[os]] | [[os.environ]]: متغيرات البيئة |
| [[smtplib]] | **SMTP** (Simple Mail Transfer Protocol): البروتوكول اللي الإيميلات بتتبعت بيه |
| [[ssl]] | التشفير والتأكد من شهادة السيرفر |
| [[EmailMessage]] | الإيميل نفسه: headers ونص ومرفقات |

---

## ٢. الإعدادات من البيئة

~~~python
host = os.environ.get("SMTP_HOST", "smtp.gmail.com")
port = int(os.environ.get("SMTP_PORT", "587"))
user = os.environ["SMTP_USER"]
~~~

[[os.environ]] شبه dict فيه متغيرات البيئة كلها، والقيم دايمًا **نصوص**:

| الطريقة | لو المتغير مش موجود |
|---|---|
| [[os.environ.get("SMTP_HOST", "smtp.gmail.com")]] | ياخد الـ default |
| [[os.environ["SMTP_USER"] ]] | يرمي [[KeyError]] |

- [[int(...)]] لأن البورت جاي نص [["587"]] ولازم يبقى رقم.
- [[SMTP_USER]] بالأقواس المربعة قصد: مفيش قيمة افتراضية معقولة لإيميلك، فلو ناقص يبقى غلط ولازم يقف.

---

## ٣. بناء الرسالة

~~~python
msg = EmailMessage()
msg["Subject"] = subject
msg["From"] = user
msg["To"] = os.environ.get("MAIL_TO", user)
msg.set_content(body)
~~~

- الـ headers بتتكتب زي مفاتيح dict.
- [[MAIL_TO]] لو مش موجود، الإيميل بيروح لنفسك.
- [[set_content(body)]] النص. والعربي بيتعمله encoding لوحده ([[charset="utf-8"]] زي ما هنشوف في الناتج).

### المرفق

~~~python
if attachment:
    ctype = mimetypes.guess_type(attachment.name)[0] or "application/octet-stream"
    maintype, subtype = ctype.split("/", 1)
    msg.add_attachment(attachment.read_bytes(), maintype=maintype, subtype=subtype, filename=attachment.name)
~~~

نفكه من جوه لبرة (جربت السطور دي في [[python:3.13-slim]]):

1. [[mimetypes.guess_type("report.csv")]] بترجّع tuple [[('text/csv', None)]]: النوع، والـ encoding (زي gzip). و [[[0] ]] بتاخد النوع بس.
2. امتداد مش معروف بيرجّع [[(None, None)]]، فـ [[or "application/octet-stream"]] = «binary عام».
3. [[split("/", 1)]] بتقسم مرة واحدة على أول [[/]]: [[['text', 'csv'] ]]، وبتتفك لـ [[maintype]] و [[subtype]].
4. [[read_bytes()]] الملف كله كـ bytes، و [[add_attachment]] بيضيفه باسمه، والإيميل بيتحوّل لـ [[multipart/mixed]] (نص + مرفقات).

---

## ٤. الإرسال

~~~python
with smtplib.SMTP(host, port, timeout=20) as smtp:
    if os.environ.get("SMTP_TLS", "1") == "1":
        smtp.starttls(context=ssl.create_default_context())
        smtp.login(user, os.environ["SMTP_PASSWORD"])
    smtp.send_message(msg)
~~~

| السطر | بيعمل إيه |
|---|---|
| [[smtplib.SMTP(host, port, timeout=20)]] | يفتح اتصال بالسيرفر، ولو مردّش في 20 ثانية يرمي error |
| [[with ... as smtp]] | بيقفل الاتصال (QUIT) لوحده في الآخر |
| [[SMTP_TLS]] | افتراضيه [["1"]]: شفّر. [["0"]] للتجربة المحلية بس |
| [[starttls(...)]] | الاتصال بدأ عادي، والأمر ده بيحوّله مشفّر قبل ما الباسورد يتبعت |
| [[ssl.create_default_context()]] | بيتأكد إن شهادة السيرفر سليمة واسمها صح |
| [[login(user, ...SMTP_PASSWORD)]] | الدخول، بالـ App Password |
| [[send_message(msg)]] | يبعت |

البورت [[587]] ده بورت «ابعت عادي وبعدين STARTTLS». فيه كمان [[465]] بيبقى مشفّر من أول لحظة، ومعاه [[smtplib.SMTP_SSL]] بدل [[SMTP]].

---

## ٥. آخر الملف: الأخطاء

~~~python
if len(sys.argv) < 3:
    sys.exit(__doc__)
try:
    send_mail(sys.argv[1], sys.argv[2], Path(sys.argv[3]) if len(sys.argv) > 3 else None)
except KeyError as e:
    sys.exit(f"error: environment variable {e} is not set")
except (smtplib.SMTPException, OSError) as e:
    sys.exit(f"error: could not send: {e}")
print("sent")
~~~

- [[sys.argv]]: [[[0] ]] اسم السكربت، و [[[1] ]] العنوان، و [[[2] ]] النص، و [[[3] ]] المرفق لو موجود. أقل من 3 = الـ docstring كـ usage.
- [[KeyError]] بييجي من [[os.environ["..."] ]]، و [[{e}]] بيطبع اسم المفتاح بعلامات التنصيص.
- [[SMTPException]] أب كل أخطاء smtplib (الباسورد غلط، السيرفر رفض...). و [[OSError]] أخطاء الشبكة: connection refused و DNS و timeout.

---

## ٦. التشغيل من غير إيميل حقيقي

[[aiosmtpd]] سيرفر SMTP صغير بيطبع أي إيميل يوصله بدل ما يبعته. جربت في [[python:3.13-slim]] على Docker، وسطّبته في venv جوه الـ container:

~~~bash
python -m aiosmtpd -n -l localhost:8025 &
SMTP_HOST=localhost SMTP_PORT=8025 SMTP_TLS=0 SMTP_USER=bot@example.com MAIL_TO=you@example.com \
  python3 notify.py "Backup ok: 3 files" "النسخة الاحتياطية خلصت" report.csv
~~~

- [[-n]]: من غير ما يحاول يغيّر اليوزر (setuid)، و [[-l localhost:8025]]: يسمع فين.
- [[VAR=value command]] في bash بيحط المتغيرات للأمر ده بس.

السكربت طبع [[sent]]، والسيرفر طبع (مختصر):

~~~text الناتج
Subject: Backup ok: 3 files
From: bot@example.com
To: you@example.com
Content-Type: multipart/mixed; boundary="===============4172144105231859663=="

Content-Type: text/plain; charset="utf-8"
Content-Transfer-Encoding: 8bit

النسخة الاحتياطية خلصت

Content-Type: text/csv
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename="report.csv"

aWQsdG90YWwKMSw1Cg==
~~~

- [[multipart/mixed]] ومعاها [[boundary]]: نص عشوائي بيفصل الأجزاء.
- المرفق بقى **base64**: طريقة بتكتب أي bytes بحروف عادية عشان تعدّي في الإيميل. [[aWQsdG90YWwKMSw1Cg==]] هو [[id,total]] و [[1,5]].

### حالات الفشل

| جربت | الناتج (exit 1 في الكل) |
|---|---|
| من غير [[SMTP_USER]] | [[error: environment variable 'SMTP_USER' is not set]] |
| [[SMTP_TLS=1]] على aiosmtpd | [[error: could not send: STARTTLS extension not supported by server.]] |
| بورت مقفول | [[error: could not send: [Errno 111] Connection refused]] |
| عنوان بس | الـ docstring |

على ويندوز (PowerShell، Python 3.14 في venv، والمتغيرات بـ [[$env:SMTP_HOST="localhost"]] ...) الإرسال اشتغل والإيميل وصل بنفس الشكل والعربي سليم، والبورت المقفول طلع [[error: could not send: [WinError 10061] No connection could be made because the target machine actively refused it]].

> مع Gmail أو Outlook الحقيقي: [[SMTP_TLS]] سيبه 1، و [[SMTP_PASSWORD]] يبقى App Password. الجزء ده من الـ docs بتاعتهم، مجربتهوش هنا عشان مفيش حساب.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| الإعدادات من [[os.environ]] | الباسورد مش في الكود |
| [[EmailMessage]] + [[add_attachment]] | نص عربي ومرفق صح |
| [[starttls]] قبل [[login]] | الباسورد ميتبعتش مكشوف |
| [[timeout=20]] | سيرفر ميت ميعلّقش السكربت |
| [[except]] بأنواع | كل فشل سطر مفهوم و exit 1 |`,
          lines: [
            "الوصف، وبيتطبع لو الاستخدام غلط.",
            "نوع المرفق من امتداده.",
            "os.environ.",
            "smtplib.",
            "ssl.",
            "sys.",
            "الإيميل نفسه.",
            "Path.",
            "ابعت إيميل:",
            "السيرفر.",
            "البورت.",
            "الإيميل (إجباري).",
            "رسالة جديدة.",
            "العنوان.",
            "من.",
            "لمين (أو لنفسك).",
            "النص.",
            "لو فيه مرفق:",
            "نوعه، أو binary عام.",
            "قسّمه نوع رئيسي وفرعي.",
            "ضيفه بالاسم.",
            "اتصل بمهلة 20 ثانية:",
            "لو TLS (الافتراضي):",
            "شفّر الاتصال وتأكد من الشهادة.",
            "سجّل دخول بالـ App Password.",
            "ابعت.",
            "لو اتشغّل مباشرة:",
            "أقل من عنوان ونص؟",
            "اطبع الـ docstring كـ usage.",
            "حاول:",
            "ابعت، والمرفق لو موجود.",
            "متغير بيئة ناقص:",
            "قول أنهي واحد.",
            "مشكلة SMTP أو شبكة:",
            "قول السبب.",
            "تمام."
          ],
          sol: R`السكربت طبع [[sent]]، وسيرفر aiosmtpd طبع الإيميل:

[[Subject: Backup ok: 3 files]]
[[From: bot@example.com]]
[[To: you@example.com]]
[[Content-Type: multipart/mixed; ...]]
وجواه جزء [[Content-Type: text/plain; charset="utf-8"]] فيه [[النسخة الاحتياطية خلصت]]، وجزء [[Content-Type: text/csv]] و [[Content-Disposition: attachment; filename="report.csv"]].

من غير [[SMTP_USER]]: [[error: environment variable 'SMTP_USER' is not set]] و exit 1.
بـ TLS على السيرفر المحلي: [[error: could not send: STARTTLS extension not supported by server.]]
وبورت مقفول: [[error: could not send: [Errno 111] Connection refused]]، وعلى ويندوز [[error: could not send: [WinError 10061] No connection could be made because the target machine actively refused it]]. (جربت الأربع حالات على لينكس، والإرسال والبورت المقفول على ويندوز كمان.)

كل فشل رسالة سطر واحد و exit 1، فالسكربت اللي بينادي notify.py يقدر يعرف.`
        }
      ]
    }
]);
