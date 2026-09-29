// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("python", {
  label: "Python",
  prompt: "(venv) $ ",
  lab: R`mkdir -p ~/lab/py && cd ~/lab/py
python3 -m venv .venv
source .venv/bin/activate`,
  labText: "كل مشروع Python ليه venv خاص بيه. على ويندوز التفعيل بـ .venv\\Scripts\\Activate.ps1 بدل source.",
  levels: {"1":["البداية","تشغيل Python، و venv، و pip و requirements"],"2":["المتوسط","الاختبارات بـ pytest، و FastAPI بـ uvicorn"],"3":["المتقدم","Python جوه Docker وعلى السيرفر"]},
  categories: [
    {
      t: "البيئة والمكتبات",
      l: 1,
      n: "كل مشروع في venv خاص بيه، والمكتبات بنسخ ثابتة",
      items: [
        {
          cmd: "python3 -m venv .venv",
          title: "بيئة معزولة لكل مشروع",
          desc: R`الـ venv فولدر جوه المشروع فيه Python ومكتبات خاصة بالمشروع ده بس. فمشروع محتاج FastAPI نسخة قديمة ومشروع تاني محتاج الجديدة، كل واحد في حاله.

[[activate]] بيخلي [[python]] و [[pip]] في الترمنال ده يشاوروا على الـ venv، وبيظهر [[(.venv)]] في أول السطر. و [[deactivate]] يرجّعك.`,
          example: R`python3 -m venv .venv
source .venv/bin/activate
which python
deactivate
# ويندوز PowerShell:
.venv\Scripts\Activate.ps1
# ويندوز CMD:
.venv\Scripts\activate.bat`,
          try: "اعمل venv في فولدر تجربة، وفعّله، وشوف [[which python]] (أو [[where python]] على ويندوز) بيشاور على جوه .venv.",
          deep: {
            why: "من غير venv كل المكتبات بتتسطّب في Python بتاع النظام: المشاريع بتدوس على بعض، وعلى أوبونتو الجديد pip أصلًا بيرفض.",
            how: R`[[python3 -m venv .venv]] بيعمل فولدر [[.venv]] فيه لينك لـ Python، و pip، وفولدر site-packages فاضي للمكتبات.

[[activate]] مش سحر: بيحط [[.venv/bin]] (أو [[.venv\Scripts]] على ويندوز) في أول الـ PATH، فأول python يلاقيه الشيل هو اللي جوه الـ venv. عشان كده التفعيل للترمنال ده بس، وأي ترمنال جديد محتاج تفعيل تاني.

مش لازم تفعّل أصلًا: [[.venv/bin/python app.py]] بيشتغل بمكتبات الـ venv على طول. ودي الطريقة الصح في cron و systemd.

على ويندوز [[py -m venv .venv]] لو [[python3]] فتح Microsoft Store. ولو PowerShell رفض يشغّل Activate.ps1 بسبب execution policy: [[Set-ExecutionPolicy -Scope CurrentUser RemoteSigned]] مرة واحدة.

على أوبونتو لو طلع [[ensurepip is not available]]: [[sudo apt install python3-venv]].

و [[.venv/]] يتحط في .gitignore: كل واحد يعمل الـ venv بتاعه ويسطّب من requirements.txt.`,
            when: "أول حاجة في أي مشروع Python، قبل أي pip install.",
            mistakes: "commit لفولدر .venv. وتنقل فولدر المشروع لمكان تاني فالـ venv يبوظ (جواه مسارات ثابتة): امسحه واعمله تاني. وتنسى التفعيل فـ pip يسطّب في مكان تاني وتلاقي [[ModuleNotFoundError]]."
          },
          lines: [
            "اعمل venv في فولدر .venv.",
            "فعّله (لينكس وماك).",
            "اتأكد إن python بقى اللي جوه .venv.",
            "ارجع للـ Python العادي.",
            "التفعيل في PowerShell.",
            "التفعيل في CMD."
          ]
        },
        {
          cmd: "pip install -r requirements.txt",
          title: "سطّب مكتبات المشروع",
          desc: "[[requirements.txt]] لستة المكتبات اللي المشروع محتاجها، مكتبة في كل سطر. [[pip install -r]] بيسطّبهم كلهم مرة واحدة جوه الـ venv. و [[pip list]] و [[pip show]] بيوروك اللي متسطّب.",
          example: R`python -m pip install --upgrade pip
pip install -r requirements.txt
pip install httpx
pip list
pip show fastapi
pip uninstall -y httpx`,
          try: "اعمل requirements.txt فيه [[requests==2.32.3]]، وسطّبه في venv جديد، وشوف [[pip show requests]] بيقول إيه.",
          deep: {
            why: "حد عمل clone للمشروع (أو السيرفر) محتاج نفس المكتبات بالظبط. بدل ما يخمّن، أمر واحد من ملف.",
            how: R`[[python -m pip]] أضمن من [[pip]] لوحده: بيستخدم pip بتاع الـ python ده بالظبط، مش pip تاني في الـ PATH بيسطّب في Python غيره.

[[pip install -r requirements.txt]] بيقرا الملف سطر سطر: [[fastapi==0.115.5]] نسخة بالظبط، و [[uvicorn[standard]==0.32.1]] الأقواس دي «extras» يعني المكتبة ومعاها إضافات اختيارية. السطور اللي بتبدأ بـ # تعليقات.

[[pip show]] بيطبع النسخة والمكان والمكتبات اللي معتمد عليها. [[pip uninstall]] بيشيل المكتبة بس، مش اللي هي سحبتها معاها.

مصدر تاني للمكتبات: torch العادي بنسخة GPU حجمها جيجات. في مشروع حقيقي على سيرفر من غير كارت شاشة الحل كان [[pip install -r requirements-local.txt --extra-index-url https://download.pytorch.org/whl/cpu]]: بيدوّر في مصدر PyTorch كمان جنب PyPI ويجيب نسخة CPU الأصغر بكتير.`,
            when: "بعد clone، وبعد ما حد يضيف مكتبة، وفي الـ Dockerfile.",
            mistakes: "[[pip install]] لمكتبة جديدة وتنسى تضيفها لـ requirements.txt: شغالة عندك وبتقع على السيرفر بـ ModuleNotFoundError. و [[pip]] بيشاور على Python غير اللي بتشغّل بيه (خصوصًا من غير venv)."
          },
          lines: [
            "حدّث pip نفسه.",
            "سطّب كل مكتبات المشروع.",
            "سطّب مكتبة واحدة.",
            "كل اللي متسطّب ونسخه.",
            "تفاصيل مكتبة.",
            "شيل مكتبة من غير ما يسأل."
          ]
        },
        {
          cmd: "pip freeze",
          title: "ثبّت النسخ اللي اتجربت",
          desc: "[[pip freeze]] بيطبع كل المكتبات المتسطّبة بنسخها بالظبط ([[name==1.2.3]]). النسخ الثابتة في requirements.txt بتضمن إن السيرفر يسطّب نفس اللي اتجرّب عندك، مش نسخة نزلت امبارح وكسرت حاجة.",
          example: R`pip freeze
pip freeze > requirements-new.txt
diff requirements.txt requirements-new.txt
pip list --outdated`,
          try: "في venv فيه مكتبة واحدة زي fastapi، شغّل [[pip freeze]] وشوف كام مكتبة طلعت (هي والمكتبات اللي بتعتمد عليها).",
          deep: {
            why: "requirements فيها [[fastapi]] من غير نسخة: النهارده تسطّب نسخة، وبعد شهر على السيرفر تسطّب أحدث فيها تغيير كاسر. الـ build نفسه بقى مختلف من غير ما تغيّر سطر.",
            how: R`[[pip freeze]] بيطبع كل اللي في الـ venv بـ [[==]]، ومعاها المكتبات اللي اتسحبت كـ dependencies (starlette و pydantic مع fastapi مثلًا).

[[>]] بيحط الناتج في ملف. هنا في ملف جديد عشان تقارنه بالقديم بـ [[diff]] قبل ما تستبدل، بدل ما تدوس على requirements.txt من غير ما تشوف إيه اتغير.

طريقتين للتثبيت: تكتب المكتبات الأساسية بإيدك بـ [[==]] (زي ما مشروع حقيقي كان عامل: [[fastapi==0.115.5]] و [[uvicorn[standard]==0.32.1]] و [[asyncpg==0.30.0]]). أو تستخدم pip-tools: ملف [[requirements.in]] فيه الأساسي، و [[pip-compile]] يطلّع requirements.txt بكل حاجة مثبّتة.

[[pip list --outdated]] بيوريك اللي ليه نسخ أحدث. التحديث قرار: تزوّد النسخة، تشغّل الاختبارات، و commit.`,
            when: "أي مشروع هيشتغل على سيرفر أو عند حد تاني.",
            mistakes: R`[[pip freeze]] من غير venv فيطلع مئات مكتبات النظام. و freeze فيه مكتبات جرّبتها ومش محتاجها (ipython مثلًا) فالـ image تتقل. و freeze على ويندوز فيه مكتبة ويندوز بس (زي pywin32) فالتسطيب يفشل على لينكس: شيلها أو اكتب [[; sys_platform == "win32"]] جنبها.`
          },
          lines: [
            "كل المكتبات بنسخها بالظبط.",
            "احفظها في ملف جديد.",
            "قارن بالقديم قبل ما تستبدل.",
            "المكتبات اللي ليها نسخ أحدث."
          ]
        },
        {
          cmd: "externally-managed-environment",
          title: "pip رافض يسطّب على أوبونتو",
          desc: R`على أوبونتو 24.04 (ودبيان 12) [[pip install]] بره venv بيقولك [[error: externally-managed-environment]]. ده مش عطل: Python بتاع النظام بيعتمد عليه apt، و pip ممنوع يلعب فيه.

الحل: مكتبات المشروع في venv. وأدوات الترمنال اللي عايزها في كل حتة (httpie و yt-dlp و ruff) بـ [[pipx]].`,
          example: R`pip install requests
# error: externally-managed-environment
sudo apt install python3-venv pipx
python3 -m venv .venv && . .venv/bin/activate && pip install requests
pipx install httpie
pipx ensurepath
pipx list`,
          try: "على سيرفر التجربة (أوبونتو 24.04) جرّب [[pip install requests]] وشوف الرسالة، وبعدين سطّب [[httpie]] بـ pipx وجرّب [[http example.com]].",
          deep: {
            why: "أول مرة على سيرفر جديد: [[pip install]] ويطلع error طويل. واللي بيقرا أول نتيجة في جوجل بيعمل [[--break-system-packages]] ويكسر حاجات في النظام بعد شهر.",
            how: R`ده PEP 668: التوزيعة بتحط ملف اسمه [[EXTERNALLY-MANAGED]] جنب Python بتاع النظام، و pip لما يشوفه بيرفض يسطّب بره venv. السبب إن أدوات في النظام مكتوبة بـ Python ومعتمدة على نسخ معيّنة جاية من apt، و pip لو غيّرها ممكن يكسرها.

التلات حلول الصح:

مكتبات لمشروع: venv، ودي الحالة الأغلب.

أداة ترمنال: [[pipx install httpie]] بيعمل venv مخصوص للأداة دي بس، وبيحط الأمر في [[~/.local/bin]]. [[pipx ensurepath]] بيضيف الفولدر ده للـ PATH (افتح ترمنال جديد بعدها). و [[pipx upgrade-all]] يحدّث الكل.

مكتبة لسكربت نظام: من apt، زي [[sudo apt install python3-requests]].

وفي Docker: صورة [[python:3.12-slim]] مش متأثرة لأن Python فيها مش من apt. بس لو بتبني على [[ubuntu:24.04]] وتسطّب Python من apt، هتقابل نفس الرسالة جوه الـ Dockerfile.`,
            when: "أي أوبونتو أو دبيان جديد.",
            mistakes: "[[sudo pip install]]: بيكتب فوق مكتبات apt ويكسر أدوات النظام. و [[--break-system-packages]] على سيرفر إنتاج، الاسم نفسه بيقولك هيعمل إيه."
          },
          lines: [
            "بره venv على أوبونتو 24.04: هيرفض.",
            "سطّب venv و pipx من apt.",
            "الحل لمكتبات المشروع: venv.",
            "الحل لأداة ترمنال: venv خاص بيها أوتوماتيك.",
            "ضيف فولدر أدوات pipx للـ PATH.",
            "الأدوات المتسطّبة بـ pipx."
          ]
        }
      ]
    },
    {
      t: "Python كأداة",
      l: 1,
      n: "سيرفر static في ثانية، وموديولات جاهزة بتشتغل كأوامر",
      items: [
        {
          cmd: "python -m http.server",
          title: "سيرفر static في ثانية",
          desc: "[[python -m http.server]] بيقدّم ملفات الفولدر الحالي على [[http://localhost:8000]]. مفيد تجرّب موقع static، وضروري لـ PWA: الـ service worker والـ manifest مش بيشتغلوا لو فتحت index.html بدبل كليك (file://).",
          example: R`python -m http.server 8000
python -m http.server 8000 --bind 127.0.0.1
python -m http.server 8000 --directory dist
# تجربة PWA: افتح http://localhost:8000 و DevTools > Application
npx playwright screenshot --viewport-size "390,844" --full-page http://localhost:8000 shot-mobile.png`,
          try: "اعمل index.html بسيط، وشغّل السيرفر، وافتحه من المتصفح. وبعدين افتح نفس الملف بدبل كليك وقارن في Console.",
          deep: {
            why: "موقع ملف واحد أو build جاهز محتاج يتفتح من سيرفر مش من file://، لأن المتصفح بيمنع حاجات كتير من file://: الـ fetch، و ES modules، والـ service worker.",
            how: R`[[http.server]] موديول جاهز في Python: بيقدّم الملفات زي ما هي، مع index.html تلقائي، وبيطبع كل طلب في الترمنال. Ctrl+C يقفله.

[[--bind 127.0.0.1]]: الافتراضي بيسمع على كل الواجهات، يعني أي حد على نفس الـ Wi-Fi يقدر يقرا الملفات. و [[--directory]] يقدّم فولدر من غير ما تدخله.

PWA: المتصفح بيسمح بالـ service worker على https أو على localhost بس. فالسيرفر ده على localhost كفاية للتجربة: DevTools ثم Application تشوف الـ Manifest والـ Service Workers وزرار التثبيت.

[[playwright screenshot]] من ترمنال تاني بياخد صورة للصفحة بمقاس موبايل أو ديسكتوب ([[--viewport-size "1440,900"]])، فتقارن المقاسات من غير ما تكبّر وتصغّر المتصفح بإيدك.

ده للتجربة بس. مش سيرفر إنتاج: بطيء ومفيهوش أي حماية.`,
            when: "تجربة موقع static أو build أو PWA بسرعة. أو تنقل ملف لجهاز على نفس الشبكة.",
            mistakes: R`في مشروع حقيقي الـ sw.js كان cache-first لكل حاجة، فأي تعديل في index.html مكانش بيظهر للزوار لحد ما اسم الكاش اتغير ([[const CACHE = 'myapp-v2']]). وعلى جهازك: DevTools ثم Application ثم Service Workers ثم Unregister. وكان الـ manifest بيشاور على [[icon-192.png]] و [[icon-512.png]] مش موجودين، فالـ Console مليان 404 وزرار التثبيت مش بيظهر. وتشغيله في فولدر الـ home على شبكة عامة من غير [[--bind]] بيكشف ملفاتك.`
          },
          lines: [
            "قدّم الفولدر الحالي على بورت 8000.",
            "على جهازك بس، محدش من الشبكة.",
            "قدّم فولدر dist من غير ما تدخله.",
            "صورة للصفحة بمقاس موبايل، بطولها كلها."
          ]
        },
        {
          cmd: "python -m",
          title: "شغّل موديول كأمر",
          desc: "[[python -m name]] بيشغّل موديول باسمه مش بمسار ملف. Python فيه موديولات جاهزة بتشتغل كأوامر (json.tool و http.server و venv و pip). وكود مشروعك نفسه: [[python -m app.seed]] بيشغّل [[app/seed.py]] كجزء من الباكدج، فالـ imports بتشتغل صح.",
          example: R`curl -sS https://api.example.com/health | python3 -m json.tool
python3 -m json.tool --no-ensure-ascii data.json
python -m app.seed data/foods.csv --dry-run
python -m pip --version
python -c "import sys; print(sys.version)"`,
          try: "اعمل فولدر app فيه [[__init__.py]] فاضي و seed.py بيعمل [[from app import config]]. شغّله بـ [[python app/seed.py]] (هيفشل) وبعدين بـ [[python -m app.seed]] (هيشتغل).",
          deep: {
            why: "[[python app/seed.py]] بيطلع [[ModuleNotFoundError: No module named 'app']] مع إن الفولدر قدامك. و JSON من API مكتوب في سطر واحد طويل مش مقروء ومفيش jq.",
            how: R`[[-m]] بيدوّر على الموديول في sys.path زي import بالظبط، وبيشغّله كبرنامج.

[[json.tool]] بينسّق JSON جاي من pipe أو ملف بمسافات. [[--no-ensure-ascii]] بيعرض العربي حروف بدل [[\u0627]]. ولو الـ JSON بايظ بيقولك السطر والعمود.

كود المشروع: لما تشغّل [[python app/seed.py]]، Python بيحط فولدر [[app/]] نفسه في sys.path، فـ [[from app.db import ...]] مش بيلاقي باكدج اسمها app. أما [[python -m app.seed]] من جذر المشروع بيحط الجذر في sys.path، فـ app باكدج عادية والـ imports النسبية ([[from .db import]]) بتشتغل.

وجوه Docker نفس الفكرة: [[docker compose exec -T app python -m app.seed ...]].

نمط مفيد من مشروع حقيقي: كل أداة تشغيل (seed، تنضيف، تقارير) الافتراضي بتاعها بيطبع بس اللي هيعمله، والتنفيذ الفعلي محتاج فلاج صريح زي [[--apply]] أو [[--post]]. غلطة في الأمر تبقى عرض مش كارثة. و argparse بيعمل الفلاجات دي و [[--help]] لوحده.

[[-c]] بيشغّل سطر Python من الترمنال على طول.`,
            when: "أي سكربت جوه باكدج. وتنسيق JSON سريع من غير jq.",
            mistakes: "ملف في مشروعك اسمه [[json.py]] أو [[http.py]] أو [[email.py]]: بيغطي على موديول Python الأصلي وتطلع errors ملهاش معنى. و [[python -m app/seed.py]] بمسار: -m بياخد اسم بنقط ومن غير .py."
          },
          lines: [
            "نسّق JSON جاي من API.",
            "نسّق ملف، والعربي يفضل عربي.",
            "شغّل ملف من مشروعك كجزء من الباكدج (عرض بس).",
            "pip بتاع الـ python ده بالظبط.",
            "سطر Python من الترمنال."
          ]
        }
      ]
    },
    {
      t: "الاختبارات و FastAPI",
      l: 2,
      n: "pytest للاختبارات، و uvicorn يشغّل API وانت بتطوّر، و Python جوه سكربتات bash",
      items: [
        {
          cmd: "pytest",
          title: "شغّل الاختبارات",
          desc: "[[pytest]] بيدوّر على ملفات [[test_*.py]] والدوال اللي بتبدأ بـ [[test_]] ويشغّلها. [[-q]] ناتج مختصر، و [[-x]] يقف عند أول فشل، و [[-k]] يختار اختبارات بالاسم.",
          example: R`pip install pytest
pytest -q
pytest -x
pytest -k "login and not slow"
pytest tests/test_api.py::test_health -v
python -m pytest -q --lf`,
          try: "اكتب [[def test_add(): assert 1 + 1 == 3]] في [[tests/test_math.py]] وشغّل pytest، وشوف إزاي بيوريك القيمتين. وبعدين صلّحه.",
          deep: {
            why: "بتعدّل دالة وعايز تعرف إنك مكسرتش حاجة تانية. pytest بيشغّل كل الاختبارات في ثواني ويقولك بالظبط إيه اللي وقع.",
            how: R`الاختبار دالة عادية فيها [[assert]]. لو الشرط غلط، pytest بيعرض القيمتين والفرق بينهم، من غير ما تكتب رسايل.

[[-q]] سطر واحد بالنقط والنتيجة. [[-v]] اسم كل اختبار. [[-x]] أول فشل يوقف (مفيد لما فيه ٥٠ فشل من نفس السبب). [[-s]] يطبع الـ print.

[[-k]] تعبير على أسماء الاختبارات: [["login and not slow"]]. والـ node id [[file::function]] يشغّل اختبار واحد بعينه.

[[--lf]] (last failed) يشغّل اللي فشل المرة اللي فاتت بس. وانت بتصلّح، دي بتوفّر وقت كتير.

[[python -m pytest]] بدل [[pytest]]: بيحط الفولدر الحالي في sys.path، فـ [[from app.main import app]] بيشتغل من غير إعدادات. في مشروع حقيقي أمر الاختبار كان [[cd app && python -m pytest tests -q]].

الـ exit code مش صفر لو أي اختبار فشل، فـ CI بيتعلّم أحمر لوحده. و [[conftest.py]] فيه الـ fixtures اللي بتتشارك بين الملفات (قاعدة بيانات تجربة، client للـ API).`,
            when: "قبل كل commit. وفي CI.",
            mistakes: "pytest من Python بره الـ venv فيطلع [[No module named fastapi]]. واختبارات بتعتمد على بعض أو على بيانات فضلت من run قبلها، فبتنجح مع بعض وتفشل لوحدها."
          },
          lines: [
            "سطّب pytest في الـ venv.",
            "شغّل الكل بناتج مختصر.",
            "وقّف عند أول فشل.",
            "الاختبارات اللي اسمها فيه login ومش slow.",
            "اختبار واحد بعينه بالتفصيل.",
            "اللي فشل المرة اللي فاتت بس."
          ]
        },
        {
          cmd: "pytest.ini",
          title: "إعدادات pytest في ملف",
          desc: "بدل ما تكتب نفس الفلاجات كل مرة: [[pytest.ini]] في جذر المشروع. بيقول فين الاختبارات، ويحط المشروع في مسار الاستيراد، ويشغّل الدوال async، ويسجّل الـ markers.",
          example: R`[pytest]
pythonpath = .
testpaths = tests
addopts = -q --strict-markers
asyncio_mode = auto
markers =
    slow: tests that take more than a second`,
          try: "حط الملف ده، وعلّم اختبار بـ [[@pytest.mark.slow]]، وشغّل [[pytest -m \"not slow\"]]. وبعدين اكتب [[@pytest.mark.slwo]] غلط وشوف --strict-markers بيمسكها.",
          flag: "script",
          deep: {
            why: "ImportError في الاختبارات لأن pytest مش شايف الباكدج، واختبارات async مش بتشتغل، وكل واحد في الفريق بيشغّل بفلاجات مختلفة. ملف واحد بيحل التلاتة.",
            how: R`pytest بيدوّر على pytest.ini في الفولدر الحالي واللي فوقه، والفولدر اللي فيه الملف بيبقى الـ rootdir.

[[pythonpath = .]] بيضيف جذر المشروع لـ sys.path، فـ [[from app.main import app]] يشتغل مهما شغّلت pytest منين.

[[testpaths = tests]] بيدوّر في tests بس، مش في .venv و node_modules.

[[addopts]] فلاجات بتتضاف لكل تشغيل. [[--strict-markers]] أي marker مش متسجّل يبقى error بدل ما يتجاهل بهدوء.

[[asyncio_mode = auto]] (من مكتبة pytest-asyncio) بيخلي [[async def test_...]] تشتغل من غير decorator على كل واحدة. مفيد مع FastAPI و asyncpg.

[[markers]] تسجيل للعلامات، وبعدين [[pytest -m "not slow"]] يشغّل السريع بس.

نفس الإعدادات ممكن تتحط في [[pyproject.toml]] تحت [[[tool.pytest.ini_options] ]].`,
            when: "أول ما يبقى عندك فولدر tests.",
            mistakes: "asyncio_mode من غير ما تسطّب pytest-asyncio: pytest بيحذّر بـ Unknown config option، والاختبارات async بتفشل (في النسخ قبل pytest 8.4 كانت بتتخطى بتحذير بس). وإعدادات في pytest.ini و pyproject.toml الاتنين: pytest.ini بيكسب والتاني بيتجاهل من غير ما يقولك."
          },
          lines: [
            "قسم إعدادات pytest.",
            "جذر المشروع في مسار الاستيراد.",
            "دوّر على الاختبارات في tests بس.",
            "فلاجات لكل تشغيل: مختصر، و markers متسجّلة بس.",
            "الدوال async تشتغل لوحدها (pytest-asyncio).",
            "العلامات المسموحة:",
            "slow للاختبارات البطيئة."
          ]
        },
        {
          cmd: "uvicorn --reload",
          title: "شغّل FastAPI وانت بتطوّر",
          desc: "FastAPI مكتبة بتكتب بيها الـ API، و [[uvicorn]] السيرفر اللي بيشغّلها. [[uvicorn app.main:app --reload]] يعني: في ملف [[app/main.py]] فيه متغير اسمه [[app]]، شغّله، وأعد التشغيل لوحدك مع كل حفظ.",
          example: R`pip install "fastapi==0.115.5" "uvicorn[standard]==0.32.1"
uvicorn app.main:app --reload
uvicorn app.main:app --reload --port 8001
curl -s localhost:8000/health
# التوثيق التفاعلي: http://localhost:8000/docs`,
          try: "اعمل [[app/main.py]] فيه [[app = FastAPI()]] و endpoint [[/health]] بيرجّع [[{\"ok\": True}]]. شغّله، وعدّل الرد واحفظ، وشوف uvicorn بيعيد لوحده.",
          deep: {
            why: "كل تعديل تقفل السيرفر وتفتحه تاني: بطيء ومملّ. و --reload بيعمل ده لوحده، و FastAPI بيديك صفحة تجرّب فيها الـ API من غير Postman.",
            how: R`أصغر تطبيق: [[from fastapi import FastAPI]] وبعدين [[app = FastAPI()]] وبعدين دالة فوقها [[@app.get("/health")]] بترجّع dict، و FastAPI بيحوّله JSON.

[[app.main:app]]: قبل النقطتين مسار الموديول بنقط (app/main.py)، وبعدها اسم المتغير جوه الملف.

[[--reload]] بيراقب ملفات .py، وأول ما تحفظ بيعيد تشغيل السيرفر. [[uvicorn[standard] ]] بيجيب معاه watchfiles (مراقبة أسرع) و uvloop و httptools (أداء أحسن).

الافتراضي [[127.0.0.1:8000]]: جهازك بس. من موبايل أو من ويندوز لـ WSL محتاج [[--host 0.0.0.0]].

[[/docs]] صفحة Swagger بتتولد لوحدها من الكود: كل endpoint وبياناته وزرار Try it out.`,
            when: "وانت بتطوّر API بـ FastAPI.",
            mistakes: "[[--reload]] في الإنتاج: بيراقب الملفات على الفاضي وبيعيد التشغيل لو حاجة اتغيرت. وتشغّله من فولدر غلط فيطلع [[Could not import module \"app.main\"]]: شغّله من جذر المشروع. والبورت مشغول بسيرفر قديم فيطلع [[Address already in use]]."
          },
          lines: [
            "سطّب FastAPI و uvicorn بنسخ ثابتة.",
            "شغّل مع إعادة تشغيل تلقائية مع كل حفظ.",
            "على بورت تاني.",
            "جرّب endpoint."
          ]
        },
        {
          cmd: "python3 - <<'PY'",
          title: "Python جوه سكربت bash",
          desc: "في سكربت bash محتاج تكتب JSON من متغيرات بيئة. بـ echo هيبوظ مع أول علامة تنصيص في القيمة. [[python3 -]] بيقرا البرنامج من الـ stdin، والـ heredoc بيدّيهوله، و [[json.dump]] بيعمل JSON سليم دايمًا.",
          example: R`OUT=creds.json
python3 - "$OUT" <<'PY'
import json, os, sys
creds = [{"name": "internal", "value": "Bearer " + os.environ["INTERNAL_TOKEN"]}]
json.dump(creds, open(sys.argv[1], "w"), indent=2)
PY`,
          try: "اعمل [[export INTERNAL_TOKEN='ab\"c']] (فيها علامة تنصيص) وشغّل السكربت، وشوف الـ JSON سليم. وجرّب تعمله بـ echo وشوف الفرق.",
          flag: "script",
          deep: {
            why: "JSON بـ [[echo \"{\\\"token\\\": \\\"$TOKEN\\\"}\"]] بيبوظ لو التوكن فيه علامة تنصيص أو backslash أو سطر جديد. Python بيعمل escape صح لوحده.",
            how: R`[[python3 -]]: الشرطة معناها «اقرا الكود من الـ stdin». وأي حاجة بعدها ([["$OUT"]]) بتوصل لـ [[sys.argv[1] ]].

[[<<'PY']] heredoc: كل السطور لحد سطر [[PY]] بتروح للـ stdin. علامات التنصيص حوالين PY مهمة: الشيل مش هيفك أي [[$]] جوه، فالكود بيوصل Python زي ما كتبته بالظبط.

المتغيرات بتعدّي بطريقتين: argument ([[sys.argv]]) أو متغير بيئة ([[os.environ]]). المتغير لازم يبقى [[export]]، وإلا Python مش هيشوفه.

[[json.dump(..., indent=2)]] بيكتب JSON منسّق وبيعمل escape لأي حرف محتاجه.

البديل من غير Python: [[jq -n --arg t "$TOKEN" '{value: $t}']]، بس Python غالبًا موجود على أي سيرفر.`,
            when: "سكربت bash محتاج يبني JSON أو يعمل حسبة أو يقرا YAML، والـ bash لوحده هيبقى معقد.",
            mistakes: R`[[<<PY]] من غير علامات تنصيص: الشيل بيفك [[$]] جوه كود Python ويبوّظه. والمتغير مش متعمله export فيطلع [[KeyError: 'INTERNAL_TOKEN']]. وسطور الكود جوه الـ heredoc متزاحة بمسافات عشان «شكلها أحلى» فيطلع [[IndentationError]]: Python محتاج الكود يبدأ من أول السطر.`
          },
          lines: [
            "اسم الملف اللي هيتكتب.",
            "شغّل Python من الـ stdin، وادّيله اسم الملف كـ argument.",
            "المكتبات.",
            "البيانات، والتوكن من متغير بيئة.",
            "اكتبها JSON سليم في الملف.",
            "نهاية كود Python."
          ]
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
ss -tlnp | grep 8080`,
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
            "اتأكد إنه سامع على 0.0.0.0."
          ]
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
          ]
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
            "شغّل سكربت جوه الـ container الشغال (من غير terminal).",
            "سكربت تاني في وضع العرض بس.",
            "تشغيل بمتغير بيئة إضافي."
          ]
        }
      ]
    }
  ]
});
