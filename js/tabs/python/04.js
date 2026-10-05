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
    },
    {
      t: "Python على السيرفر",
      l: 3,
      n: "صورة Docker خفيفة، و uvicorn ورا nginx، والاختبارات جوه compose",
      items: [
        {
          cmd: "uvicorn --proxy-headers",
          title: "FastAPI في الإنتاج ورا nginx",
          desc: "في الإنتاج uvicorn بيشتغل جوه container ورا nginx. [[--host 0.0.0.0]] عشان يبقى باين بره الـ container، و [[--proxy-headers]] (شغال افتراضيًا، وكتابته توضيح) مع [[--forwarded-allow-ips]] عشان يصدّق الـ headers اللي nginx بيبعتها ويعرف IP المستخدم الحقيقي وإن الطلب كان https. ومن غير [[--reload]].",
          example: R`uvicorn app.main:app --host 0.0.0.0 --port 8080 --proxy-headers --forwarded-allow-ips "*"
uvicorn app.main:app --host 0.0.0.0 --port 8080 --workers 2 --proxy-headers --forwarded-allow-ips "*"
# Linux (and WSL):
ss -tlnp | grep 8080
# Windows (PowerShell):
Get-NetTCPConnection -LocalPort 8080 -State Listen`,
          try: "اعمل endpoint بيرجّع [[request.client.host]] و [[request.url.scheme]]، واطلبه من ورا nginx مرة بـ [[--forwarded-allow-ips \"*\"]] ومرة من غيرها وقارن.",
          deep: {
            why: "من غير الإعدادات دي: كل الطلبات شكلها جاية من IP بتاع nginx (فالـ rate limit بيقفل على الكل مرة واحدة)، والـ redirects بتطلع [[http://]] والموقع https.",
            how: R`[[--host 0.0.0.0]]: جوه الـ container، [[127.0.0.1]] معناها الـ container نفسه بس، فـ nginx (في container تاني) مش هيوصل.

nginx بيبعت [[X-Forwarded-For]] (IP المستخدم) و [[X-Forwarded-Proto]] (https). [[--proxy-headers]] بيخلي uvicorn يستخدمهم، فـ [[request.client.host]] يبقى IP المستخدم، والـ URLs اللي FastAPI بيولّدها تبقى https. وهو شغال افتراضيًا أصلًا ([[--no-proxy-headers]] يقفله)، بس بيصدّق بس اللي في [[--forwarded-allow-ips]].

[[--forwarded-allow-ips]]: مين مسموحله يبعت الـ headers دي. الافتراضي 127.0.0.1 (و ::1) بس، و nginx في container تاني ليه IP تاني فبيتجاهل. [[*]] معناها صدّق أي حد، ودي آمنة بس لو البورت ده مش مفتوح للإنترنت (nginx هو الوحيد اللي يوصله، زي [[expose]] في compose أو [[127.0.0.1:8080:8080]]).

[[--workers 2]] عمليتين منفصلتين، كل واحدة بذاكرتها. لتطبيق async، عدد قليل كفاية.

[[ss -tlnp]] بيتأكد إنه سامع على [[0.0.0.0:8080]] مش [[127.0.0.1:8080]].`,
            when: "أي FastAPI في الإنتاج ورا nginx أو أي reverse proxy.",
            mistakes: R`[[--forwarded-allow-ips "*"]] والبورت منشور على [[0.0.0.0:8080]] في compose: أي حد يكلّم البورت مباشرة ويبعت [[X-Forwarded-For]] مزيف ويعدّي الـ rate limit أو الـ allowlist. و [[--host 127.0.0.1]] جوه container فيطلع 502 من nginx.`
          },
          lines: [
            "شغّل على كل الواجهات، وصدّق headers الـ proxy.",
            "نفس الكلام بعمليتين.",
            "اتأكد إنه سامع على 0.0.0.0.",
            "نفس السؤال على ويندوز: مين سامع على 8080 وعلى أنهي عنوان."
          ],
          sol: R`جربتها في container بـ endpoint بيرجّع [[{"client": ..., "scheme": ...}]] وبعت الطلب بـ [[X-Forwarded-For: 203.0.113.7]] و [[X-Forwarded-Proto: https]] زي ما nginx بيعمل:

مع [[--forwarded-allow-ips "*"]]: [[{"client":"203.0.113.7","scheme":"https"}]]، يعني IP المستخدم الحقيقي و https.
من غيرها، والطلب جاي من IP الـ container نفسه على شبكة Docker مش من 127.0.0.1 (زي nginx في container تاني): [[{"client":"172.17.0.3","scheme":"http"}]]، يعني IP البروكسي و http، و uvicorn تجاهل الـ headers.

و [[ss -tlnp | grep 8080]] بيطبع سطر زي [[LISTEN 0  5  0.0.0.0:8080  0.0.0.0:*  users:(("python3",pid=5145,fd=3))]].

المفاجأة: لو nginx على نفس الجهاز وبيكلّم [[127.0.0.1:8080]] مش هتلاقي فرق، لأن uvicorn بيثق في [[127.0.0.1]] افتراضيًا. وده خطر لو البورت مفتوح للنت ومعاك [[*]]: أي حد يقدر يزوّر [[X-Forwarded-For]]، فخلي البورت على 127.0.0.1 أو شبكة Docker داخلية.`,
          solCode: R`from fastapi import FastAPI, Request

app = FastAPI()

@app.get("/whoami")
def whoami(request: Request):
    return {"client": request.client.host, "scheme": request.url.scheme}`
        },
        {
          cmd: "Dockerfile",
          title: "صورة Python خفيفة وآمنة",
          desc: "صورة [[python:3.12-slim]] صغيرة، و [[PYTHONUNBUFFERED=1]] عشان اللوج يطلع على طول في docker logs، و [[pip --no-cache-dir]] من غير كاش جوه الصورة، والتطبيق بيشتغل بيوزر عادي مش root.",
          example: R`FROM python:3.12-slim
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 PIP_DISABLE_PIP_VERSION_CHECK=1
RUN apt-get update && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN useradd -m -u 10001 app
COPY --chown=app:app . .
USER app
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s CMD curl -fsS http://127.0.0.1:8080/health || exit 1
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080", "--proxy-headers", "--forwarded-allow-ips", "*"]`,
          try: "ابني الصورة وشوف حجمها بـ [[docker images]]. وبعدين [[docker compose exec app whoami]] المفروض يقول app مش root.",
          flag: "script",
          deep: {
            why: "صورة Python الكاملة حوالي جيجا، واللوج مش بيظهر، والتطبيق بيشتغل root. لو حد لقى ثغرة في الكود، هيبقى root جوه الـ container.",
            how: R`[[slim]] دبيان متقلّص (حوالي ١٥٠ ميجا بدل جيجا). alpine أصغر بس بـ musl، ومكتبات زي numpy و pandas و asyncpg ساعات بتتبني من الصفر عليها (دقايق طويلة)، فـ slim أأمن.

[[PYTHONUNBUFFERED=1]]: Python بيخزّن الـ print لما مش شايف ترمنال، فاللوج بيتأخر أو يضيع لو الـ container وقع. ده بيطلّعه فورًا. [[PYTHONDONTWRITEBYTECODE]] من غير ملفات .pyc.

[[--no-install-recommends]] و [[rm -rf /var/lib/apt/lists/*]] في نفس الـ RUN: من غير الحاجات الإضافية وقوايم apt. و curl عشان الـ HEALTHCHECK.

الترتيب: requirements.txt الأول و pip install، وبعدين الكود. تعديل في الكود بيعيد آخر طبقات بس، والمكتبات من الكاش.

[[useradd -u 10001]] يوزر عادي، و [[COPY --chown]] بينسخ الملفات ملكه من غير طبقة chown تانية تكرر حجم الملفات. [[USER app]] من هنا ورايح كل حاجة بتشتغل بيه.

[[CMD]] بصيغة JSON (exec form) عشان uvicorn ياخد SIGTERM مباشرة ويقفل بهدوء مع [[docker stop]].

وملف [[.dockerignore]] جنبه لازم: [[.venv]] و [[__pycache__]] و [[.env]] و [[.git]].`,
            when: "أي خدمة Python هتشتغل في Docker.",
            mistakes: R`[[COPY . .]] قبل pip install: أي تعديل في الكود بيعيد تسطيب كل المكتبات. ومن غير .dockerignore الـ [[.venv]] بتاعك (ولو من ويندوز كمان) بيتنسخ جوه الصورة ويلخبط. ومن غير PYTHONUNBUFFERED تلاقي [[docker logs]] فاضي وتفتكر التطبيق مش شغال.`
          },
          lines: [
            "صورة Python صغيرة.",
            "لوج فوري، ومن غير .pyc، ومن غير رسالة تحديث pip.",
            "curl بس، من غير الإضافات...",
            "...وامسح قوايم apt في نفس الطبقة.",
            "فولدر التطبيق.",
            "المكتبات الأول (عشان الكاش).",
            "سطّبها من غير كاش pip.",
            "يوزر عادي.",
            "انسخ الكود ملك اليوزر ده.",
            "شغّل بيه مش root.",
            "البورت (توثيق).",
            "فحص صحة كل ٣٠ ثانية.",
            "شغّل uvicorn للإنتاج."
          ],
          sol: R`بنيتها بـ requirements فيه [[fastapi==0.115.5]] و [[uvicorn[standard]==0.32.1]] و app فيه [[/health]]: [[docker images]] طلّع الصورة [[262MB]]، والـ base [[python:3.12-slim]] لوحدها [[191MB]] (ده رقم Docker Desktop، وبيعد الطبقات المضغوطة والمفكوكة مع بعض؛ المضغوط اللي بينزل من النت حوالي 46 ميجا بس). لو طلعت قرب الجيجا، غالبًا نسيت [[.dockerignore]] فـ [[.venv]] و [[.git]] اتنسخوا جوه الصورة، أو استخدمت [[python:3.12]] مش slim.

[[docker compose exec app whoami]] طبع [[app]]. لو طبع [[root]] يبقى سطر [[USER app]] مش موجود أو الـ service بيستخدم صورة قديمة (اعمل [[docker compose up -d --build]]). وبعد حوالي 40 ثانية [[docker ps]] ورّاني [[Up 49 seconds (healthy)]]. لو [[(unhealthy)]] شوف [[docker inspect --format '{{json .State.Health}}' <id>]]: غالبًا مفيش route اسمه [[/health]].

وخد بالك: [[WORKDIR /app]] بيعمل الفولدر ملك root، و [[COPY --chown]] بيغيّر الملفات اللي جواه بس، فالتطبيق مايقدرش يعمل ملف جديد في [[/app]] نفسه. اللي يكتب ملفات يكتبها في volume أو فولدر انت عامله وعامل له chown.`
        },
        {
          cmd: "docker compose run --rm --no-deps",
          title: "الاختبارات جوه الـ container",
          desc: "[[docker compose run --rm app pytest]] بيعمل container مؤقت من نفس الصورة بنفس الإعدادات، ويشغّل الاختبارات، ويتمسح. [[--no-deps]] من غير ما يقوّم القاعدة والخدمات التانية. و [[exec -T]] يشغّل أمر جوه container شغال فعلًا.",
          example: R`docker compose run --rm --no-deps app python -m pytest -q
docker compose run --rm app python -m pytest -q -x
docker compose exec -T app python -m app.seed data/foods.csv
docker compose exec -T app python -m app.backlog --dry-run
docker compose run --rm -e LOG_LEVEL=debug app python -m app.check`,
          try: "شغّل الاختبارات بـ run --rm --no-deps، وبعدين [[docker ps -a]] واتأكد إنه مفيش containers فاضلة.",
          deep: {
            why: "الاختبارات على جهازك محتاجة venv متفعّل ونسخة Python معيّنة. جوه الـ container هي نفس Python ونفس المكتبات اللي في الإنتاج بالظبط.",
            how: R`[[run]] بيعمل container جديد من تعريف الخدمة (الصورة والـ env والـ volumes)، بس بيشغّل الأمر اللي كتبته بدل الـ CMD. [[--rm]] يمسحه لما يخلص.

[[--no-deps]]: من غيرها compose بيقوّم كل اللي في [[depends_on]] (postgres مثلًا) الأول. لاختبارات الوحدات اللي مش محتاجة قاعدة، ده وقت على الفاضي. لاختبارات الـ integration شيله.

[[exec]] بيدخل container شغال فعلًا. [[-T]] من غير terminal: لازمة في السكربتات والـ Makefile و CI، وإلا يطلع [[the input device is not a TTY]].

[[-e]] بيزوّد متغير بيئة للتشغيل ده بس.

الصورة لازم يبقى فيها فولدر tests. لو الـ .dockerignore بيستبعده عشان الإنتاج، اعمل bind mount في compose للتطوير.

ومش هتحتاج venv على جهازك خالص، لأن الـ container هو البيئة.`,
            when: "مشروع شغال بـ compose. وفي CI عشان يختبر نفس الصورة اللي هتنزل.",
            mistakes: R`[[run]] من غير [[--rm]]: containers واقفة بتتراكم ([[docker ps -a]]). و [[exec]] من غير [[-T]] في CI. والأخطر: اختبارات بتمسح وتعمل بيانات تتشغّل بـ exec على سيرفر الإنتاج فتمسح بيانات حقيقية. في مشروع حقيقي أمر [[make test]] كان بيشغّل pytest على الجهاز ومحتاج venv متفعّل، فكان بيفشل عند أي حد جديد لحد ما اتنقل جوه compose.`
          },
          lines: [
            "الاختبارات في container مؤقت، من غير ما تقوّم القاعدة.",
            "الاختبارات مع القاعدة والخدمات التانية.",
            "شغّل سكربت جوه الـ container الشغال (من غير terminal). app.seed هنا اسم موديول في مشروعك.",
            "سكربت تاني في وضع العرض بس.",
            "تشغيل بمتغير بيئة إضافي."
          ],
          sol: R`جربتها على الصورة بتاعة درس Dockerfile، ومعاها service اسمها db (postgres) في [[depends_on]]، وفولدر tests فيه اختبار لـ [[/health]]. الأمر الأول طبع ناتج pytest العادي، [[1 passed]]، والـ exit code بتاعه هو بتاع pytest (0 لو كله نجح). [[--no-deps]] معناها إنه مابيشغّلش الـ db ولا أي service في [[depends_on]]، فلو اختباراتك محتاجة قاعدة بيانات هتفشل بـ connection refused، وساعتها شيل [[--no-deps]].

ومع الـ Dockerfile ده طلع تحذير [[PytestCacheWarning: could not create cache path /app/.pytest_cache ... Permission denied]]: الاختبارات عدّت، بس pytest مش قادر يكتب الكاش لأن [[/app]] ملك root والتطبيق شغال بيوزر app. [[python -m pytest -q -p no:cacheprovider]] بيشيله.

و [[exec -T app python -m app.seed data/foods.csv]] و [[-e LOG_LEVEL=debug]] اشتغلوا على موديولات تجربة عملتها بنفس الأسماء: الأول وصّل [[data/foods.csv]] للسكربت، والتاني السكربت شاف [[LOG_LEVEL = debug]]. [[--no-deps]] معناها إنه مابيشغّلش الـ db ولا أي service في [[depends_on]]، فلو اختباراتك محتاجة قاعدة بيانات هتفشل بـ connection refused، وساعتها شيل [[--no-deps]].

[[docker ps -a]] بعدها مورّانيش أي container من نوع [[project-app-run-a1b2c3]]، لأن [[--rm]] مسحه، ومورّانيش الـ db كمان بسبب [[--no-deps]]. لو لقيت واحد [[Exited]] يبقى شغّلت مرة من غير [[--rm]]، امسحه بـ [[docker rm]] أو [[docker container prune]].`
        }
      ]
    }
]);
