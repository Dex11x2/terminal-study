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
