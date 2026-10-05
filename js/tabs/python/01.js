// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   teach    اختياري: «الشرح خطوة بخطوة»: markdown صغير (## و ### و ~~~lang عنوان ... ~~~ و جداول | و - و 1. و > و ---). القواعد في README
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
//   check    اختياري: تمرين بيتصحح لوحده في الصفحة
//            JS:  { lang: "js", starter, tests: R`test("..", () => expect(x).toBe(y))`, solution }
//            SQL: { lang: "sql", setup: R`CREATE TABLE ...; INSERT ...`, starter, expect: [[...صفوف]] أو expectSql: R`استعلام مرجعي`, solution, ordered }
//            solution حل مرجعي مش بيظهر، و npm run check بيتأكد إنه بيعدّي الاختبارات. المتاح في tests: test و expect(x).toBe/toEqual/toThrow/toBeTruthy/toBeFalsy
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("python", {
  label: "Python",
  prompt: "(venv) $ ",
  lab: R`mkdir -p ~/lab/py && cd ~/lab/py
python3 -m venv .venv
source .venv/bin/activate`,
  labText: "كل مشروع Python ليه venv خاص بيه. على ويندوز التفعيل بـ .venv\\Scripts\\Activate.ps1 بدل source.",
  levels: {"1":["البداية","تشغيل Python، و venv و pip، وأول سكربت: تشغيله، والـ arguments والـ exit codes، والملفات والفولدرات بـ pathlib و shutil"],"2":["المتوسط","pytest بالتفصيل، والـ debugging، و FastAPI بـ uvicorn، وأدوات السكربتات (argparse و JSON و CSV و YAML و logging و subprocess و HTTP و re)، وسكربتات أتمتة كاملة"],"3":["المتقدم","Python جوه Docker وعلى السيرفر، وسكربتات محترمة: تتسطّب كأمر، وتتجدول، وتستحمل الأخطاء، وتشتغل بالتوازي، وتتختبر"]},
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
          example: R`# Linux و Mac:
python3 -m venv .venv
source .venv/bin/activate
which python
deactivate
# Windows (PowerShell):
py -m venv .venv
.venv\Scripts\Activate.ps1
(Get-Command python).Source
deactivate
# Windows (CMD):
py -m venv .venv
.venv\Scripts\activate.bat
where python
deactivate`,
          try: "اعمل venv في فولدر تجربة، وفعّله، وشوف [[which python]] بيشاور على جوه .venv. على ويندوز: [[(Get-Command python).Source]] في PowerShell، أو [[where python]] في CMD.",
          deep: {
            why: "من غير venv كل المكتبات بتتسطّب في Python بتاع النظام: المشاريع بتدوس على بعض، وعلى أوبونتو الجديد pip أصلًا بيرفض.",
            how: R`[[python3 -m venv .venv]] بيعمل فولدر [[.venv]] فيه لينك لـ Python، و pip، وفولدر site-packages فاضي للمكتبات.

[[activate]] مش سحر: بيحط [[.venv/bin]] (أو [[.venv\Scripts]] على ويندوز) في أول الـ PATH، فأول python يلاقيه الشيل هو اللي جوه الـ venv. عشان كده التفعيل للترمنال ده بس، وأي ترمنال جديد محتاج تفعيل تاني.

مش لازم تفعّل أصلًا: [[.venv/bin/python app.py]] بيشتغل بمكتبات الـ venv على طول. ودي الطريقة الصح في cron و systemd.

على ويندوز [[py]] هو الـ launcher اللي بييجي مع Python من python.org، ولو مش موجود عندك اكتب [[python -m venv .venv]]. ولو PowerShell رفض يشغّل Activate.ps1 بسبب execution policy: [[Set-ExecutionPolicy -Scope CurrentUser RemoteSigned]] مرة واحدة.

ومتكتبش [[where python]] في PowerShell: [[where]] هناك اختصار لـ [[Where-Object]]، فمش بيطبع حاجة ولا بيطلع error. استخدم [[(Get-Command python).Source]] أو [[where.exe python]].

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
            "نفس الحاجة على ويندوز بالـ launcher [[py]].",
            "التفعيل في PowerShell.",
            "مسار python اللي هيشتغل (بديل which في PowerShell).",
            "ارجع للـ Python العادي.",
            "نفس الحاجة في CMD.",
            "التفعيل في CMD.",
            "كل python في الـ PATH، والأول هو اللي هيشتغل.",
            "ارجع."
          ],
          sol: R`جربتها على أوبونتو 24.04: بعد [[source .venv/bin/activate]] الـ prompt بقى يبدأ بـ [[(.venv)]]، و [[which python]] طبع [[/home/sara/lab/.venv/bin/python]]. وبعد [[deactivate]] الـ [[(.venv)]] اختفى، و [[which python]] مطبعش حاجة خالص، لأن على أوبونتو مفيش [[python]] بره الـ venv (اسمه [[python3]] بس).

وعلى ويندوز 11 بـ Python 3.14: [[(Get-Command python).Source]] طبع [[...\lab\.venv\Scripts\python.exe]]، و [[where python]] في CMD طبع 3 سطور أولهم [[...\.venv\Scripts\python.exe]]. و [[where python]] في PowerShell مطبعش أي حاجة (ده Where-Object).

لو [[which python]] لسه بيشاور بره .venv بعد التفعيل، يبقى انت شغّلت [[bash activate]] أو [[./activate]] بدل [[source]] (دي بتفعّل في shell فرعي وتقفل). وعلى PowerShell لو طلع [[running scripts is disabled on this system]] شغّل [[Set-ExecutionPolicy -Scope CurrentUser RemoteSigned]] مرة واحدة.`
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
          ],
          sol: R`جربتها في venv جديد: [[pip install -r requirements.txt]] سطّب requests ومعاها ٤ مكتبات بتعتمد عليها. و [[pip show requests]] طلّع (أهم السطور):

[[Name: requests]] و [[Version: 2.32.3]] و [[Location: /home/sara/lab/.venv/lib/python3.12/site-packages]] (ده على أوبونتو 24.04، وعلى ويندوز بيبقى [[...\.venv\Lib\site-packages]]) و [[Requires: certifi, charset-normalizer, idna, urllib3]] و [[Required-by:]] فاضية.

الـ Location هو اللي يأكدلك إنها اتسطبت جوه الـ venv مش على النظام. و Requires بتقولك ليه [[pip list]] طلّع مكتبات انت ماكتبتهاش. لو الـ Location طلع بره .venv (زي [[/usr/lib/python3/dist-packages]] أو [[~/.local]]) يبقى نسيت تفعّل الـ venv.`
        },
        {
          cmd: "pip freeze",
          title: "ثبّت النسخ اللي اتجربت",
          desc: "[[pip freeze]] بيطبع كل المكتبات المتسطّبة بنسخها بالظبط ([[name==1.2.3]]). النسخ الثابتة في requirements.txt بتضمن إن السيرفر يسطّب نفس اللي اتجرّب عندك، مش نسخة نزلت امبارح وكسرت حاجة.",
          example: R`pip freeze
pip freeze > requirements-new.txt
pip list --outdated
# Linux و Mac:
diff requirements.txt requirements-new.txt
# Windows (PowerShell):
Compare-Object (Get-Content requirements.txt) (Get-Content requirements-new.txt)`,
          try: "في venv فيه مكتبة واحدة زي fastapi، شغّل [[pip freeze]] وشوف كام مكتبة طلعت (هي والمكتبات اللي بتعتمد عليها).",
          deep: {
            why: "requirements فيها [[fastapi]] من غير نسخة: النهارده تسطّب نسخة، وبعد شهر على السيرفر تسطّب أحدث فيها تغيير كاسر. الـ build نفسه بقى مختلف من غير ما تغيّر سطر.",
            how: R`[[pip freeze]] بيطبع كل اللي في الـ venv بـ [[==]]، ومعاها المكتبات اللي اتسحبت كـ dependencies (starlette و pydantic مع fastapi مثلًا).

[[>]] بيحط الناتج في ملف. هنا في ملف جديد عشان تقارنه بالقديم بـ [[diff]] قبل ما تستبدل، بدل ما تدوس على requirements.txt من غير ما تشوف إيه اتغير.

طريقتين للتثبيت: تكتب المكتبات الأساسية بإيدك بـ [[==]] (زي ما مشروع حقيقي كان عامل: [[fastapi==0.115.5]] و [[uvicorn[standard]==0.32.1]] و [[asyncpg==0.30.0]]). أو تستخدم pip-tools: ملف [[requirements.in]] فيه الأساسي، و [[pip-compile]] يطلّع requirements.txt بكل حاجة مثبّتة.

[[pip list --outdated]] بيوريك اللي ليه نسخ أحدث. التحديث قرار: تزوّد النسخة، تشغّل الاختبارات، و commit.`,
            when: "أي مشروع هيشتغل على سيرفر أو عند حد تاني.",
            mistakes: R`[[pip freeze]] من غير venv فيطلع مئات مكتبات النظام. و freeze فيه مكتبات جرّبتها ومش محتاجها (ipython مثلًا) فالـ image تتقل. و freeze على ويندوز فيه مكتبة ويندوز بس (زي pywin32) فالتسطيب يفشل على لينكس: شيلها أو اكتب [[; sys_platform == "win32"]] جنبها. وفي Windows PowerShell 5.1 الـ [[>]] بيكتب الملف UTF-16: pip بيقراه عادي (جربتها)، بس git بيعتبره ملف binary والـ diff بتاعه مش بيتقري، فاعمله من PowerShell 7 أو CMD.`
          },
          lines: [
            "كل المكتبات بنسخها بالظبط.",
            "احفظها في ملف جديد.",
            "المكتبات اللي ليها نسخ أحدث.",
            "قارن بالقديم قبل ما تستبدل.",
            "نفس المقارنة في PowerShell. [[diff]] هناك اختصار لـ Compare-Object، ولو اديته اسمين ملفات بيقارن الاسمين نفسهم مش اللي جواهم، عشان كده Get-Content. وفي CMD: [[fc requirements.txt requirements-new.txt]]."
          ],
          sol: R`في venv نضيف سطّبت فيه [[fastapi]] بس، [[pip freeze]] طلّع ١١ سطر، كلهم بالشكل [[name==version]]: [[fastapi==...]] و [[starlette]] و [[pydantic]] و [[pydantic_core]] و [[anyio]] و [[idna]] و [[typing_extensions]] وغيرهم. الرقم بالظبط بيتغير مع نسخة fastapi، المهم إنه أكتر بكتير من واحد.

ده الفرق بين freeze و requirements اللي كتبتها بإيدك: freeze بيثبّت كل شجرة المكتبات بنسخها الحالية، فلما حد تاني يسطّب ياخد نفس الحاجات بالظبط. ولو لقيت فيه عشرات المكتبات اللي مالهاش علاقة (jupyter وغيره)، يبقى انت شغّلته على Python النظام أو venv قديم مش على venv المشروع.

وعلى ويندوز جربت [[diff req.txt req-new.txt]] في PowerShell: طبع [[req-new.txt =>]] و [[req.txt <=]]، يعني قارن الأسماء بس. بـ [[Compare-Object (Get-Content ...) (Get-Content ...)]] طلّع السطور المختلفة فعلًا.`
        },
        {
          cmd: "externally-managed-environment",
          title: "pip رافض يسطّب على أوبونتو",
          desc: R`على أوبونتو 24.04 (ودبيان 12) [[pip install]] بره venv بيقولك [[error: externally-managed-environment]]. ده مش عطل: Python بتاع النظام بيعتمد عليه apt، و pip ممنوع يلعب فيه.

الحل: مكتبات المشروع في venv. وأدوات الترمنال اللي عايزها في كل حتة (httpie و yt-dlp و ruff) بـ [[pipx]].

على ويندوز مش هتقابل الرسالة دي: Python بتاع python.org مفيهوش الملف اللي بيعمل الحماية دي (اتأكدت على Python 3.14)، فـ pip بره venv بيسطّب على Python بتاع الجهاز كله من غير ما يعترض. ده مش معناه إنه صح: برضه venv لكل مشروع.`,
          example: R`# Linux (and WSL):
pip install requests
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
          ],
          sol: R`على أوبونتو 24.04 [[pip install requests]] بيرفض ويطلّع:

[[error: externally-managed-environment]]
[[× This environment is externally managed]]
[[╰─> To install Python packages system-wide, try apt install python3-xyz ...]]

وكمل بيقترح venv أو pipx. ده مش bug: أوبونتو بيحمي Python بتاع النظام من إنك تكسر أدوات زي apt. (جربتها على python3.12 بتاع أوبونتو 24.04 وطلعت نفس الرسالة بالظبط. ولو pip نفسه مش متسطب، سطّبه الأول بـ [[sudo apt install python3-pip]].)

بعد [[pipx install httpie]] و [[pipx ensurepath]] (وافتح ترمنال جديد)، [[pipx list]] طبع [[package httpie 3.2.4, installed using Python 3.12.3]] والأوامر [[http]] و [[httpie]] و [[https]]. و [[http example.com]] طبع [[HTTP/1.1 200 OK]] والـ headers ملونة وبعدها الـ HTML. لو طلع [[http: command not found]] يبقى الـ PATH لسه ما اتحدّثش. والغلط اللي متعملوش: [[--break-system-packages]] أو [[sudo pip install]].`
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

[[playwright screenshot]] من ترمنال تاني بياخد صورة للصفحة بمقاس موبايل أو ديسكتوب ([[--viewport-size "1440,900"]])، فتقارن المقاسات من غير ما تكبّر وتصغّر المتصفح بإيدك. أول مرة بيطلب منك تنزّل المتصفح نفسه: [[npx playwright install chromium]].

ده للتجربة بس. مش سيرفر إنتاج: بطيء ومفيهوش أي حماية.`,
            when: "تجربة موقع static أو build أو PWA بسرعة. أو تنقل ملف لجهاز على نفس الشبكة.",
            mistakes: R`في مشروع حقيقي الـ sw.js كان cache-first لكل حاجة، فأي تعديل في index.html مكانش بيظهر للزوار لحد ما اسم الكاش اتغير ([[const CACHE = 'myapp-v2']]). وعلى جهازك: DevTools ثم Application ثم Service Workers ثم Unregister. وكان الـ manifest بيشاور على [[icon-192.png]] و [[icon-512.png]] مش موجودين، فالـ Console مليان 404 وزرار التثبيت مش بيظهر. وتشغيله في فولدر الـ home على شبكة عامة من غير [[--bind]] بيكشف ملفاتك.`
          },
          lines: [
            "قدّم الفولدر الحالي على بورت 8000.",
            "على جهازك بس، محدش من الشبكة.",
            "قدّم فولدر dist من غير ما تدخله.",
            "صورة للصفحة بمقاس موبايل، بطولها كلها."
          ],
          sol: R`السيرفر بيطبع [[Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...]]، ومع [[--bind 127.0.0.1]] [[Serving HTTP on 127.0.0.1 port 8000 (http://127.0.0.1:8000/) ...]]، ومع كل طلب سطر زي [[127.0.0.1 - - [02/Oct/2026 17:42:23] "GET / HTTP/1.1" 200 -]]. (جربتها على لينكس وويندوز بـ [[--bind 127.0.0.1]].)

لو الـ index.html عادي خالص (HTML و CSS بس) مش هتلاقي فرق في Console بين الاتنين. الفرق بيظهر أول ما تستخدم [[<script type="module">]] أو fetch. جربت صفحة بتعمل [[import]] من [[./m.js]]: بالدبل كليك Console طلّع [[Access to script at 'file:///.../m.js' from origin 'null' has been blocked by CORS policy]]، ومن [[http://localhost:8000]] اشتغلت عادي.

على لينكس لو البورت مشغول بيطلع [[OSError: [Errno 98] Address already in use]]، غيّر البورت. على ويندوز مفيش الـ error ده: شغّلت سيرفرين على نفس البورت والتاني قال [[Serving HTTP]] عادي، فلو الصفحة مش بتتحدّث اتأكد إن مفيش سيرفر قديم شغال في ترمنال تاني. و [[0.0.0.0]] اللي بيطبعه معناها «كل الواجهات» مش عنوان تفتحه، افتح [[localhost]].

و [[npx playwright screenshot ...]] جربته على السيرفر ده: طبع [[Navigating to ...]] و [[Capturing screenshot into shot-mobile.png]]. ولو طلع [[Executable doesn't exist]] يبقى لسه منزّلتش المتصفح ([[npx playwright install chromium]]).`
        },
        {
          cmd: "python -m",
          title: "شغّل موديول كأمر",
          desc: "[[python -m name]] بيشغّل موديول باسمه مش بمسار ملف. Python فيه موديولات جاهزة بتشتغل كأوامر (json.tool و http.server و venv و pip). وكود مشروعك نفسه: [[python -m app.seed]] بيشغّل [[app/seed.py]] كجزء من الباكدج، فالـ imports بتشتغل صح.",
          example: R`curl -sS https://api.github.com/users/octocat | python3 -m json.tool
python3 -m json.tool --no-ensure-ascii data.json
python -m app.seed
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
            "نسّق JSON جاي من API. (في Windows PowerShell 5.1 اكتب [[curl.exe]]، لأن [[curl]] هناك اختصار لأمر تاني.)",
            "نسّق ملف، والعربي يفضل عربي.",
            "شغّل app/seed.py كجزء من الباكدج، من الفولدر اللي فيه app/ (زي التجربة).",
            "pip بتاع الـ python ده بالظبط.",
            "سطر Python من الترمنال."
          ],
          sol: R`جربتها بالظبط على أوبونتو وعلى ويندوز (PowerShell): [[python app/seed.py]] فشل بـ [[ModuleNotFoundError: No module named 'app']]، و [[python -m app.seed]] من نفس الفولدر (اللي فيه [[app/]]) اشتغل وطبع [[seed ok: demo]].

السبب: لما تشغّل ملف بمساره، Python بيحط فولدر الملف نفسه ([[app/]]) في [[sys.path]]، فمش شايف حاجة اسمها [[app]] جواه. مع [[-m]] بيحط الفولدر الحالي، فـ [[app]] بقى package يتعمله import.

لو [[-m]] كمان فشل بنفس الغلطة، يبقى انت واقف جوه [[app/]] نفسه مش في الفولدر اللي فوقه، أو ناسي [[__init__.py]] أحيانًا، أو كتبت [[app/seed]] أو [[app.seed.py]] بدل [[app.seed]].`,
          solCode: R`# Linux و Mac:
mkdir -p app && touch app/__init__.py
echo 'NAME = "demo"' > app/config.py
printf 'from app import config\nprint("seed ok:", config.NAME)\n' > app/seed.py
python app/seed.py     # ModuleNotFoundError: No module named 'app'
python -m app.seed     # seed ok: demo
# Windows (PowerShell):
mkdir app
New-Item app\__init__.py
'NAME = "demo"' | Set-Content app\config.py
"from app import config$__btnprint('seed ok:', config.NAME)" | Set-Content app\seed.py
python app\seed.py     # ModuleNotFoundError: No module named 'app'
python -m app.seed     # seed ok: demo`
        }
      ]
    },
    {
      t: "أول سكربت Python",
      l: 1,
      n: "تكتب ملف .py وتشغّله على أي نظام، ياخد arguments أو يسأل، يطبع تقرير مترتب، ويرجّع exit code صح",
      items: [
        {
          cmd: "python3 script.py",
          title: "شغّل أول سكربت",
          desc: R`السكربت ملف نصي عادي امتداده [[.py]] فيه أوامر Python، بيتنفّذ من أول سطر لآخر سطر. بتكتبه في أي editor وتشغّله من الترمنال بـ [[python3 hello.py]]، وأي كلام بعد اسم الملف بيوصل للسكربت في [[sys.argv]].

اسم الأمر بيختلف حسب النظام: على لينكس وماك [[python3]] (و [[python]] ساعات مش موجود خالص). على ويندوز [[python]] أو [[py]]، و [[py]] ده launcher بيختار النسخة لو عندك أكتر من واحدة.

اللغة نفسها (المتغيرات و if و loops والدوال و classes) في تاب «Python و FastAPI». هنا بنركّز على إزاي تكتب سكربت بيعمل شغل حقيقي على جهازك أو على السيرفر.`,
          example: R`# Linux و Mac:
python3 --version
python3 hello.py
python3 hello.py Sara
python3 -i hello.py
# Windows (PowerShell):
py --version
py --list
py hello.py Sara
py -3.14 hello.py`,
          try: R`اعمل [[hello.py]] فيه 4 سطور: [[import sys]]، و [[name = sys.argv[1] if len(sys.argv) > 1 else "world"]]، و [[print(f"hello {name}")]]، و [[print("python", sys.version.split()[0], "from", sys.executable)]]. شغّله من غير اسم وباسم، وبعدين بـ [[python3 -i hello.py]] واكتب [[name]] بعد ما يخلص. وجرّب تشغّله وانت واقف في فولدر تاني.`,
          deep: {
            why: "أي حاجة بتعملها بإيدك أكتر من مرتين (تنقل ملفات، تجمع أرقام من شيتات، تشيّك على موقع) تتكتب سكربت مرة وتتشغّل بأمر واحد. والسكربت بيتحفظ في git، ويتجدول، وحد تاني يقدر يشغّله.",
            how: R`[[python3 hello.py]]: Python بيقرا الملف كله، يحوّله bytecode، وينفّذه من فوق لتحت. مفيش دالة main إجبارية زي C أو Java، أول سطر على مستوى الملف هو أول حاجة بتتنفّذ.

[[sys.executable]] بيقولك أنهي Python بالظبط اللي شغّال. لو الـ venv متفعّل هتلاقيه جوه [[.venv]]، ودي أسرع طريقة تعرف المكتبات هتيجي منين.

ويندوز: Python من python.org بيسطّب [[py]] (الـ installer العادي، و «Python install manager» اللي python.org بيرشّحه من 3.14). [[py]] لوحده بيشغّل أحدث نسخة، و [[py -3.14]] نسخة معيّنة لو متسطبة، و [[py --list]] بيعرض النسخ المتسطّبة. ولو الـ venv متفعّل، [[py]] بيشغّل Python بتاع الـ venv. ولو كتبت [[python]] واتفتح Microsoft Store أو طلع [[Python was not found]]، ده alias من ويندوز نفسه ومعناه إن Python مش متسطب: يا تسطّبه من python.org، يا تقفل الـ alias من Settings ثم Apps ثم Advanced app settings ثم App execution aliases.

[[python3 -i hello.py]] بيشغّل السكربت وبعدين يفتح الـ REPL ومعاك كل المتغيرات اللي اتعملت. مفيد تبص على النتيجة أو تجرّب دالة من غير ما تعدّل الملف.`,
            when: "أي مهمة بتتكرر. ولو المهمة سطر واحد بيوصّل أوامر موجودة، bash أو PowerShell ممكن يبقوا أقصر (درس «bash ولا Python ولا PowerShell» في المستوى ٣).",
            mistakes: R`تكتب [[hello.py]] لوحده في الترمنال فيطلع [[command not found]] (محتاج [[python3 hello.py]] أو shebang، الدرس الجاي). وتشغّله من فولدر تاني فيطلع [[python3: can't open file '/tmp/hello.py': [Errno 2] No such file or directory]]: المسار نسبي للفولدر اللي انت واقف فيه. وتسمّي السكربت [[random.py]] أو [[email.py]] أو [[csv.py]] فيغطّي على موديول Python الأصلي (درس «python -m»).`
          },
          lines: [
            "نسخة Python.",
            "شغّل السكربت.",
            "شغّله وابعتله كلمة توصل في sys.argv.",
            "شغّله، وبعد ما يخلص افتح REPL ومعاك متغيراته.",
            "الـ launcher بتاع ويندوز ونسخة Python اللي هيشغّلها.",
            "النسخ المتسطّبة على الجهاز.",
            "نفس التشغيل بالـ launcher.",
            "شغّل بنسخة معيّنة (لازم تكون متسطبة، و [[py --list]] بيقولك عندك إيه)."
          ],
          sol: R`الناتج عندي على أوبونتو 24.04:

[[python3 hello.py]] طبع [[hello world]] وتحتها [[python 3.12.3 from /usr/bin/python3]].
[[python3 hello.py Sara]] طبع [[hello Sara]].
[[python3 -i hello.py]] طبع نفس السطرين وبعدين [[>>>]]، و [[name]] رجّع [['world']]. اخرج بـ [[exit()]] أو Ctrl+D.

وعلى ويندوز 11: [[py --list]] طبع [[-V:3.14[-64] *   Python 3.14.3]]، و [[py hello.py Sara]] طبع [[hello Sara]] وتحتها [[python 3.14.3 from C:\Users\...\python.exe]]. ولما فعّلت venv وشغّلت [[py hello.py]]، المسار بقى [[...\.venv\Scripts\python.exe]].

ولما شغّلته من فولدر تاني بنفس الاسم طلع [[can't open file ... No such file or directory]]: يا تدخل الفولدر بـ cd، يا تكتب المسار كامل.

لو [[sys.executable]] طلع بره الـ venv وانت فاكره متفعّل، يبقى التفعيل اتعمل في ترمنال تاني.`,
          solCode: R`import sys
name = sys.argv[1] if len(sys.argv) > 1 else "world"
print(f"hello {name}")
print("python", sys.version.split()[0], "from", sys.executable)`
        },
        {
          cmd: "#!/usr/bin/env python3",
          title: "سكربت يتشغّل باسمه زي أي أمر",
          desc: R`على لينكس وماك تقدر تشغّل السكربت بـ [[./hello.py]] من غير ما تكتب python3، بشرطين: أول سطر فيه shebang [[#!/usr/bin/env python3]] بيقول للنظام يشغّل الملف بإيه، والملف عليه صلاحية تنفيذ بـ [[chmod +x]].

ولو حطيته من غير [[.py]] في فولدر موجود في الـ PATH (زي [[~/.local/bin]]) يبقى أمر تكتبه من أي مكان، زي [[ls]] و [[git]].

على ويندوز النظام مبيقراش السطر ده، بس الـ launcher [[py]] بيقراه، و Python نفسه بيعتبره تعليق عادي.`,
          example: R`# Linux و Mac:
head -1 hello.py
chmod +x hello.py
./hello.py Sara
mkdir -p ~/.local/bin
cp hello.py ~/.local/bin/hello
hello Ali
# لو طلع command not found:
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
# Windows (PowerShell):
py hello.py Sara`,
          try: R`حط [[#!/usr/bin/env python3]] أول سطر في [[hello.py]]. شغّله بـ [[./hello.py]] قبل [[chmod +x]] وبعدها. وبعدين اعمل نسخة بنهايات سطور ويندوز: [[printf '#!/usr/bin/env python3\r\nprint("hi")\r\n' > crlf.py]] و [[chmod +x crlf.py]] وشغّلها واقرا الرسالة.`,
          deep: {
            why: "الأدوات اللي بتستخدمها كل يوم (backup، تنضيف، تقرير) أسهل لما تبقى أوامر باسمها، من غير ما تفتكر السكربت في أنهي فولدر.",
            how: R`لما تكتب [[./hello.py Sara]]، الـ kernel بيقرا أول حرفين في الملف، يلاقيهم [[#!]]، فبيشغّل [[/usr/bin/env python3 ./hello.py Sara]]. و [[env]] بيدوّر على [[python3]] في الـ PATH، فلو الـ venv متفعّل هياخد Python بتاع الـ venv.

ولو عايز السكربت يستخدم venv معيّن دايمًا (عشان مكتباته)، اكتب المسار كامل: [[#!/home/sara/tools/.venv/bin/python]]. ده أضمن من env في cron، لأن cron مش بيفعّل حاجة.

[[chmod +x]] بيدّي صلاحية التنفيذ. و [[~/.local/bin]] على أوبونتو بيتضاف للـ PATH لوحده من [[~/.profile]] لو الفولدر موجود ساعة الـ login، فلو لسه عامله افتح session جديدة أو ضيفه بإيدك زي آخر سطر في المثال. وعلى ماك الشيل zsh، فالسطر يروح [[~/.zshrc]].

ويندوز: مفيش chmod ولا [[./hello.py]]. [[py hello.py]] بيقرا الـ shebang ويفهم [[#!/usr/bin/env python3]] كـ «أحدث Python 3» (جربتها بـ Python 3.14). ولو الـ installer ربط ملفات [[.py]] بالـ launcher (الـ installer القديم من python.org بيعمل كده)، [[hello.py Sara]] بيشتغل في CMD لوحده. على جهازي «Python install manager» و [[assoc .py]] قال [[File association not found for extension .py]]، فالأضمن [[py hello.py]].`,
            when: "سكربت بتستخدمه كتير على لينكس أو ماك أو سيرفر. ولو ليه مكتبات خارجية، الأحسن تسطّبه كأمر بجد (درس «[project.scripts] و pipx» في المستوى ٣).",
            mistakes: R`ملف متكتب على ويندوز بنهايات CRLF: الـ shebang بيبقى [[python3\r]] والنظام مش لاقيه. وأي حاجة قبل [[#!]] (حتى سطر فاضي أو BOM) بتلغيه. و [[#!/usr/bin/python]] على أوبونتو الجديد مفيش [[python]] أصلًا. ونسيان chmod بيطلع [[Permission denied]]، ومن غير shebang خالص bash بيحاول يقرا الملف كأنه سكربت bash.`
          },
          lines: [
            "اتأكد إن أول سطر هو الـ shebang.",
            "صلاحية تنفيذ.",
            "شغّله باسمه من الفولدر الحالي.",
            "فولدر للأوامر بتاعتك.",
            "انسخه هناك من غير .py.",
            "بقى أمر من أي مكان.",
            "ضيف الفولدر للـ PATH لو مش موجود (وافتح ترمنال جديد).",
            "على ويندوز: [[py]] بيقرا الـ shebang ويشغّل بيه، و chmod مالوش لازمة هناك."
          ],
          sol: R`جربتها على أوبونتو 24.04. قبل [[chmod +x]]: [[bash: ./hello.py: Permission denied]] (exit 126). وبعدها [[./hello.py Sara]] طبع [[hello Sara]]، و [[hello Ali]] من [[~/.local/bin]] طبع [[hello Ali]].

ملف الـ CRLF طلّع سطرين:

[[/usr/bin/env: ‘python3\r’: No such file or directory]]
[[/usr/bin/env: use -[v]S to pass options in shebang lines]]

والـ exit code كان 127. السطر التاني تخمين من env وملوش علاقة بمشكلتنا. الـ [[\r]] اللي في الآخر بقى جزء من اسم البرنامج. الحل: [[sed -i 's/\r$//' crlf.py]] أو [[dos2unix crlf.py]]، أو في VS Code دوس على [[CRLF]] تحت على اليمين وخليها [[LF]] واحفظ.

وجرّبت ملف من غير shebang فيه [[print(1)]] بس: bash حاول يقراه وطلع [[./nosb: line 1: syntax error near unexpected token $__bt1']].`
        },
        {
          cmd: "if __name__ == \"__main__\":",
          title: "هيكل كل سكربت: main و __name__",
          desc: R`بدل ما تكتب الكود كله على مستوى الملف، حطه في دوال، ودالة [[main]] بترجّع رقم، وفي الآخر:

[[if __name__ == "__main__":]] وتحتها [[sys.exit(main(sys.argv[1:]))]]

كده الملف بيشتغل لما تشغّله مباشرة، ولما ملف تاني (أو اختبار) يعمله import ياخد الدوال من غير ما يشغّل حاجة. والرقم اللي main بترجّعه بيبقى الـ exit code. ده نفس الهيكل في كل سكربت في باقي الدروس.`,
          example: R`#!/usr/bin/env python3
"""Count lines in text files: python3 count_lines.py FILE..."""
import sys
from pathlib import Path

def count_lines(path: Path) -> int:
    with path.open(encoding="utf-8") as f:
        return sum(1 for _ in f)

def main(argv: list[str]) -> int:
    if not argv:
        print("usage: count_lines.py FILE...", file=sys.stderr)
        return 2
    total = 0
    for name in argv:
        n = count_lines(Path(name))
        print(f"{n:>6}  {name}")
        total += n
    print(f"{total:>6}  total")
    return 0

if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))`,
          try: R`اعمل [[a.txt]] فيه 3 سطور و [[b.txt]] فيه سطرين. شغّل [[python3 count_lines.py a.txt b.txt]]، ومن غير ملفات، وعلى ملف مش موجود، وبعد كل واحدة [[echo $?]] (في PowerShell [[$LASTEXITCODE]]، لأن [[$?]] هناك True أو False بس). وبعدين [[python3 -c "import count_lines; print(count_lines.count_lines(__import__('pathlib').Path('a.txt')))"]]. وفي الآخر عدّله: الملف المش موجود يطبع رسالة على stderr والسكربت يكمّل الباقي، ويخرج بـ 1 لو أي ملف فشل.`,
          flag: "script",
          deep: {
            why: "سكربت مكتوب كله على مستوى الملف بيشتغل أول ما حد يعمله import، فمينفعش تستخدم دالة منه في سكربت تاني ولا تختبره بـ pytest. ومن غير exit code صح، cron و CI و && في bash فاكرين إنه نجح وهو فشل.",
            how: R`كل ملف Python ليه متغير [[__name__]]. الملف اللي بتشغّله مباشرة اسمه [["__main__"]]، والملف اللي بيتعمله import اسمه هو اسم الموديول ([["count_lines"]]). فالـ if دي معناها «اشتغل بس لو أنا البرنامج الرئيسي». (التفاصيل في درس «import و packages» في تاب «Python و FastAPI».)

[[main(argv)]] بتاخد الـ arguments كـ list بدل ما تقرا [[sys.argv]] جوه، فالاختبار يقدر يبعت [[main(["a.txt"])]] بإيده. و [[sys.argv[1:] ]] بيشيل اسم السكربت نفسه.

[[sys.exit(main(...))]]: الرقم اللي main رجّعته بقى exit code البرنامج. 0 نجاح، و 2 العرف بتاعه «استخدام غلط» (argparse بيستخدمه)، و 1 أي فشل تاني.

الـ docstring في أول الملف بيوصف السكربت، وبيبقى في [[__doc__]] فتقدر تطبعه كـ usage. و [[sum(1 for _ in f)]] بيعد السطور من غير ما يحمّل الملف كله في الذاكرة.`,
            when: "أي سكربت أطول من ١٠ سطور، أو هيتجدول، أو هيتختبر.",
            mistakes: R`[[main()]] لوحدها من غير [[sys.exit]]: الـ exit code بيبقى 0 دايمًا مهما main رجّعت. و [[if __name__ == "main":]] من غير الـ underscores: مفيش error، والسكربت مش بيعمل أي حاجة خالص. ومتغيرات بتتعمل جوه الـ if وبتستخدمها الدوال: بتشتغل لما تشغّله، وتقع بـ [[NameError]] لما تعمله import.`
          },
          lines: [
            "وصف السكربت (docstring).",
            "sys للـ argv و stderr و exit.",
            "Path للملفات.",
            "دالة بتعد سطور ملف واحد.",
            "افتح الملف بـ utf-8.",
            "عد السطور واحد واحد من غير ما تحمّل الملف كله.",
            "main بتاخد الـ arguments كـ list وبترجّع exit code.",
            "مفيش ملفات؟",
            "رسالة الاستخدام على stderr.",
            "2 = استخدام غلط.",
            "المجموع.",
            "لكل ملف:",
            "عد سطوره.",
            "اطبع العدد بعرض 6 على اليمين.",
            "زوّد المجموع.",
            "سطر المجموع.",
            "نجح.",
            "لو الملف ده اتشغّل مباشرة (مش import):",
            "شغّل main ورجّع رقمها كـ exit code."
          ],
          sol: R`[[python3 count_lines.py a.txt b.txt]] طبع [[     3  a.txt]] و [[     2  b.txt]] و [[     5  total]]، و [[echo $?]] طلع 0. من غير ملفات: [[usage: count_lines.py FILE...]] و exit 2. وعلى [[nope.txt]]: traceback آخره [[FileNotFoundError: [Errno 2] No such file or directory: 'nope.txt']] و exit 1 (أي exception محدش مسكه بيخرج بـ 1).

والـ import طبع [[3]] بس: الدالة اشتغلت، و main ماتشغّلتش لأن [[__name__]] كان [["count_lines"]].

بعد التعديل (تحت)، [[python3 count_lines.py a.txt nope.txt b.txt]] طبع:

[[     3  a.txt]]
[[skip nope.txt: [Errno 2] No such file or directory: 'nope.txt']]
[[     2  b.txt]]
[[     5  total]]

و exit 1. وجرّبت فولدر بدل ملف: على لينكس [[skip .: [Errno 21] Is a directory: '.']]، وعلى ويندوز [[skip .: [Errno 13] Permission denied: '.']]، يعني exception مختلف خالص (PermissionError). وملف binary: [[skip bin.dat: 'utf-8' codec can't decode byte 0xbb in position 0: invalid start byte]]. عشان كده الـ except بيمسك [[OSError]]، ودي أبو FileNotFoundError و IsADirectoryError و PermissionError، ومعاها UnicodeDecodeError. لو كتبت الأسماء واحد واحد ونسيت PermissionError، السكربت هيقع على ويندوز بس.`,
          solCode: R`def main(argv: list[str]) -> int:
    if not argv:
        print("usage: count_lines.py FILE...", file=sys.stderr)
        return 2
    total, failed = 0, 0
    for name in argv:
        try:
            n = count_lines(Path(name))
        except (OSError, UnicodeDecodeError) as e:
            print(f"skip {name}: {e}", file=sys.stderr)
            failed += 1
            continue
        print(f"{n:>6}  {name}")
        total += n
    print(f"{total:>6}  total")
    return 1 if failed else 0`
        },
        {
          cmd: "input() و sys.argv",
          title: "السكربت ياخد بيانات: arguments ولا سؤال",
          desc: R`طريقتين يوصل بيهم كلام للسكربت:

[[sys.argv]]: list فيها اسم السكربت وبعده كل كلمة كتبتها في الأمر، كلهم strings. ده اللي بيشتغل في cron والأتمتة لأن مفيش حد يرد.

[[input("سؤال: ")]]: بيطبع السؤال ويستنى المستخدم يكتب ويدوس Enter، وبيرجّع اللي اتكتب string. مناسب لسكربت بيشغّله إنسان، خصوصًا سؤال تأكيد قبل حاجة خطيرة.

والأرقام بتيجي نصوص في الحالتين، فلازم [[int()]] وتمسك الغلط.`,
          example: R`import sys
print(sys.argv)
args = sys.argv[1:]
folder = args[0] if args else input("folder: ").strip() or "."
try:
    days = int(input("older than how many days? [30] ") or "30")
except ValueError:
    sys.exit("error: days must be a number")
answer = input(f"delete files older than {days} days in {folder}? [y/N] ")
if answer.strip().lower() not in ("y", "yes"):
    sys.exit("cancelled")
print(f"ok: cleaning {folder}, days={days}")`,
          try: R`شغّله بـ [[python3 ask.py ~/Downloads "two words"]]، ومن غير arguments، واكتب [[ten]] بدل رقم. وبعدين من غير terminal خالص: [[python3 ask.py lab < /dev/null]] (على ويندوز PowerShell مفيش [[<]]، اكتب [[$null | python ask.py lab]]، وفي CMD [[python ask.py lab < NUL]]). وفي فولدر فيه ملفات txt جرّب [[python3 ask.py lab *.txt]] وبص على أول سطر.`,
          flag: "script",
          deep: {
            why: R`سكربت فيه المسار مكتوب جوه الكود لازم تعدّله قبل كل تشغيل. و [[sys.argv[1] ]] من غير فحص بيطلع [[IndexError]] للي بيستخدمه. والسؤال قبل المسح بيحميك من غلطة إيد.`,
            how: R`[[sys.argv[0] ]] اسم السكربت، والباقي الكلمات بالترتيب. اللي بيقسّم الكلام ويفك [[~]] و [[*]] هو الشيل مش Python: [["two words"]] وصلت عنصر واحد، و [[~/Downloads]] وصلت [[/home/sara/Downloads]]، و [[*.txt]] وصلت أسماء الملفات. على ويندوز CMD و PowerShell مبيفكوش [[*]]، فالسكربت بيستلم [[*.txt]] زي ما هي، والحل [[Path(".").glob(pattern)]] جوه Python. و [[~]]: PowerShell 7 بيفكها ([[C:\Users\sara/Downloads]] بشرطة مايلة لقدام في الآخر)، و PowerShell 5.1 و CMD بيبعتوها زي ما هي، فلو السكربت بياخد مسار اعمل [[expanduser()]] جواه.

[[input()]] بيرجّع السطر من غير الـ Enter، و [[or "30"]] بتدّي قيمة افتراضية لو داس Enter على طول. و [[sys.exit("msg")]] بيطبع الرسالة على stderr ويخرج بـ 1.

لو مفيش حد يرد (cron، أو [[< /dev/null]]، أو pipe خلص) [[input()]] بيرمي [[EOFError]]. وللباسوردات [[getpass.getpass()]] بدل input عشان متظهرش على الشاشة.

ولو الـ arguments بقت أكتر من واحد أو اتنين، أو فيها options، استخدم argparse (درس «argparse --dry-run» في المستوى ٢).`,
            when: "sys.argv لأي سكربت هيتشغّل من سكربت تاني أو cron. و input لسؤال تأكيد أو قيمة ناسيها المستخدم، ومش في سكربت هيتجدول.",
            mistakes: R`[[input]] في سكربت متجدول فيقع بـ [[EOFError]] كل ليلة. و [[days = input(...)]] وبعدين [[days * 86400]] فيطلع النص متكرر 86400 مرة بدل رقم. والتأكيد الافتراضي بيبقى «أيوه» ([[Y/n]]) لحاجة بتمسح: خلّي Enter معناه لأ.`
          },
          lines: [
            "sys.",
            "اطبع اللي وصل فعلًا.",
            "من غير اسم السكربت.",
            "أول argument، ولو مفيش اسأل، ولو داس Enter خليه الفولدر الحالي.",
            "حاول...",
            "...تحوّل الرد لرقم، و Enter لوحده = 30.",
            "مكتوب كلام مش رقم:",
            "اخرج برسالة على stderr وكود 1.",
            "سؤال تأكيد.",
            "أي رد غير y أو yes يبقى لأ.",
            "اخرج من غير ما تعمل حاجة.",
            "كمّل."
          ],
          sol: R`[[python3 ask.py ~/Downloads "two words"]] طبع حاجة زي [[['ask.py', '/home/sara/Downloads', 'two words']]] (الشيل فك [[~]] والـ quotes خلّت الكلمتين عنصر واحد)، وبعدين سأل عن الأيام والتأكيد.

[[ten]] مكان الرقم: [[error: days must be a number]] و exit 1.

[[< /dev/null]]: السؤال اتطبع، وبعدين [[EOFError: EOF when reading a line]] و exit 1. ده بالظبط اللي هيحصل لو السكربت اتشغّل من cron.

و [[python3 ask.py lab *.txt]] في فولدر فيه [[a.txt]] و [[b.txt]]: [[['ask.py', 'lab', 'a.txt', 'b.txt']]]، يعني Python عمره ما شاف النجمة. ولو حطيتها بين quotes ([["*.txt"]]) هتوصل [['*.txt']] زي ما هي.

وعلى ويندوز PowerShell 7: [[~/Downloads]] وصلت [['C:\\Users\\sara/Downloads']] (الـ [[\\]] ده شكل الطباعة بس، المسار فيه شرطة واحدة)، و [[*.txt]] وصلت [['*.txt']] زي ما هي. و [[$null | python ask.py lab]] وقع بنفس [[EOFError: EOF when reading a line]].`
        },
        {
          cmd: "sys.exit و exit codes",
          title: "السكربت يقول نجح ولا فشل",
          desc: R`كل برنامج بيخلص بيرجّع رقم: 0 يعني نجح، وأي رقم تاني يعني فشل. الشيل بيحطه في [[$?]]، و [[&&]] بيكمّل بس لو 0، و cron و CI و Task Scheduler بيعتمدوا عليه.

[[sys.exit(2)]] بيخرج بالرقم ده. و [[sys.exit("رسالة")]] بيطبع الرسالة على stderr ويخرج بـ 1. وأي exception محدش مسكه بيخرج بـ 1 كمان.

والأخطاء تتطبع على stderr ([[print(..., file=sys.stderr)]]) مش stdout، عشان لو حد عمل [[> out.txt]] ميلاقيش رسالة الخطأ وسط البيانات.`,
          example: R`import json
import sys
from pathlib import Path
path = Path(sys.argv[1] if len(sys.argv) > 1 else "config.json")
if not path.exists():
    print(f"error: {path} not found", file=sys.stderr)
    sys.exit(2)
try:
    config = json.loads(path.read_text(encoding="utf-8"))
except json.JSONDecodeError as e:
    sys.exit(f"error: {path} is not valid JSON: {e}")
missing = [k for k in ("db_url", "backup_dir") if k not in config]
if missing:
    sys.exit(f"error: missing keys: {', '.join(missing)}")
print("config ok")`,
          try: R`سمّيه [[check_config.py]] وشغّله في ٤ حالات وبعد كل واحدة [[echo $?]]: من غير config.json، وبـ [[{"db_url": "x",}]] (فاصلة زيادة)، وبـ [[{"db_url": "x"}]]، وبـ [[{"db_url": "x", "backup_dir": "/b"}]]. وفي الأخيرة جرّب [[python3 check_config.py && echo deploying]] (الـ [[&&]] شغالة في bash و PowerShell 7، مش في 5.1). وجرّب [[python3 check_config.py nope.json > out.txt 2> err.txt]] وشوف كل ملف فيه إيه.`,
          flag: "script",
          deep: {
            why: R`سكربت backup فشل وطبع error بس خرج بـ 0: cron مش هيبعتلك حاجة، و [[backup.py && upload.py]] هيرفع نسخة بايظة، و CI هيبقى أخضر. الـ exit code هو الطريقة الوحيدة اللي البرامج التانية بتفهم بيها اللي حصل.`,
            how: R`[[sys.exit(n)]] بيرمي [[SystemExit]]، و Python وهو بيقفل بياخد الرقم منه. عشان كده [[finally]] و [[with]] بيكمّلوا شغلهم قبل الخروج.

القيم: [[sys.exit()]] أو [[sys.exit(None)]] = 0. رقم = الرقم ده (على لينكس وماك النظام بياخد آخر 8 bits بس، فـ [[sys.exit(256)]] بيطلع 0! وعلى ويندوز بيفضل 256). نص = يتطبع على stderr والكود 1. و [[sys.exit(True)]] = 1.

العرف: 0 نجاح، 1 فشل عام، 2 استخدام غلط (argparse بيخرج بيه)، و 130 لو اتقفل بـ Ctrl+C على لينكس وماك (Python بيعمل كده لوحده لو [[KeyboardInterrupt]] ماتمسكش). على ويندوز Ctrl+C بيدّي رقم ويندوز خاص: [[-1073741510]] (يعني [[0xC000013A]]).

تقرا الكود: bash [[echo $?]]، و PowerShell [[$LASTEXITCODE]] (مش [[$?]]، دي هناك True أو False بس)، و CMD [[echo %ERRORLEVEL%]].

[[f"{', '.join(missing)}"]]: علامات تنصيص مختلفة جوه الـ f-string. قبل Python 3.12 كان لازم، لأن نفس النوع كان بيقفل الـ f-string. من 3.12 مسموح، بس المختلف أوضح وبيشتغل على أي نسخة.`,
            when: "كل سكربت. وخصوصًا اللي بيتجدول، أو بيتنادى من سكربت تاني، أو بيتحط في CI أو pre-commit.",
            mistakes: R`[[except Exception: print(e)]] من غير خروج بكود غلط: الفشل بقى نجاح. و [[exit()]] بدل [[sys.exit()]]: دي معمولة للـ REPL ومش مضمونة تبقى موجودة (مع [[python -S]] مثلًا). والرسايل كلها على stdout فتبوظ أي pipe أو ملف.`
          },
          lines: [
            "json.",
            "sys.",
            "Path.",
            "الملف من الـ argument أو config.json.",
            "مش موجود؟",
            "الرسالة على stderr...",
            "...واخرج بـ 2.",
            "حاول...",
            "...تقرا الملف كـ JSON.",
            "لو JSON بايظ:",
            "اطبع السبب واخرج بـ 1 في سطر واحد.",
            "المفاتيح الناقصة.",
            "لو فيه ناقص:",
            "اخرج بـ 1 وقول إيه الناقص.",
            "كله تمام، والخروج 0 لوحده."
          ],
          sol: R`النتايج بالترتيب:

من غير ملف: [[error: config.json not found]] و [[$?]] = 2.
الفاصلة الزيادة على Python 3.13 وأحدث: [[error: config.json is not valid JSON: Illegal trailing comma before end of object: line 1 column 15 (char 14)]] و 1. وعلى 3.12 (اللي على أوبونتو 24.04) نفس الحالة طلّعت رسالة أقل وضوحًا: [[Expecting property name enclosed in double quotes: line 1 column 16 (char 15)]].
مفتاح ناقص: [[error: missing keys: backup_dir]] و 1.
سليم: [[config ok]] وبعدها [[deploying]] و 0.

ومع [[> out.txt 2> err.txt]] على ملف مش موجود: الشاشة فاضية، و [[out.txt]] فاضي، و [[err.txt]] فيه سطر الخطأ. لو كنت طبعت الخطأ بـ print عادي كان راح في out.txt.

وجربت كمان على لينكس: Ctrl+C على سكربت شغال خرج بـ 130، و [[sys.exit(256)]] خرج بـ 0 مش 256. وعلى ويندوز [[sys.exit(256)]] طلّع [[$LASTEXITCODE]] = 256، و KeyboardInterrupt طلّع [[-1073741510]].`
        },
        {
          cmd: "print و f-strings للتقارير",
          title: "تقرير مترتب في الترمنال",
          desc: R`أغلب السكربتات آخرها تقرير: عدد الملفات، المساحة، اللي نجح واللي فشل. الـ f-string بيظبط العرض والمحاذاة: [[{name:<26}]] على الشمال بعرض 26، و [[{size:>10}]] على اليمين، و [[{n:,}]] بفواصل الآلاف، و [[{ratio:.1%}]] كنسبة مئوية.

وأي حاجة مش جزء من التقرير نفسه (debug، تحذيرات) تروح stderr، فلو حد عمل [[> report.txt]] ياخد التقرير نضيف. أساسيات الـ f-strings في درس «f-strings» في تاب «Python و FastAPI».`,
          example: R`import sys
from pathlib import Path
def human(n: float) -> str:
    for unit in ("B", "KB", "MB", "GB"):
        if n < 1024:
            return f"{n:.0f} {unit}" if unit == "B" else f"{n:.1f} {unit}"
        n /= 1024
    return f"{n:.1f} TB"
folder = Path(sys.argv[1] if len(sys.argv) > 1 else ".")
rows = sorted(((p.name, p.stat().st_size) for p in folder.iterdir() if p.is_file()), key=lambda r: r[1], reverse=True)
total = sum(size for _, size in rows)
print(f"{'file':<26}{'size':>10}{'share':>8}")
print("-" * 44)
for name, size in rows[:5]:
    short = name if len(name) <= 24 else name[:21] + "..."
    print(f"{short:<26}{human(size):>10}{(size / total if total else 0):>8.1%}")
print("-" * 44)
print(f"{len(rows)} files, {total:,} bytes ({human(total)})")
print(f"{total=} {len(rows)=}", file=sys.stderr)`,
          try: R`شغّله على فولدر فيه ملفات بأحجام مختلفة، وبعدين [[python3 report.py > r.txt]] وشوف إيه اللي ظهر على الشاشة وإيه اللي راح في الملف. وبعدين غيّر عمود النسبة لعمود فيه تاريخ آخر تعديل بالشكل [[2026-09-20 10:30]].`,
          flag: "script",
          deep: {
            why: "تقرير متلزّق ([[video.mp4 2507812]]) محدش بيقراه. أعمدة مترتبة وأحجام مقروءة بتخلي الواحد يشوف المشكلة في ثانية.",
            how: R`جوه [[{}]]: القيمة، وبعد [[:]] الشكل. [[<]] شمال، [[>]] يمين، [[^]] نص، والرقم العرض. [[.1f]] رقم عشري واحد، و [[,]] فواصل آلاف، و [[.1%]] بيضرب في 100 ويحط [[%]]. وتقدر تحط تعبير كامل بين قوسين: [[{(size / total if total else 0):>8.1%}]] عشان فولدر ملفاته كلها فاضية ميقسمش على صفر.

[[{total=}]] (من Python 3.8) بيطبع الاسم والقيمة: [[total=2854563]]. مفيد للـ debug السريع.

[[human()]] بتقسم على 1024 لحد ما الرقم يبقى أصغر من 1024. و [[sorted(..., key=lambda r: r[1], reverse=True)]] بيرتّب بالحجم من الأكبر. و [[rows[:5] ]] أول 5 بس.

ولشريط تقدّم في سكربت طويل: [[print(f"\r{i}/{n}", end="", flush=True)]]: [[\r]] بيرجع لأول السطر، و [[end=""]] من غير سطر جديد، و [[flush=True]] يظهر حالًا.`,
            when: "آخر أي سكربت بيلف على حاجات كتير: ملفات، روابط، صفوف.",
            mistakes: R`العربي في أعمدة مترتبة: الترمنال بيعرضه من اليمين للشمال وعرض الحروف بيختلف، فالمحاذاة بتبوظ. خلّي الأعمدة اللي محتاجة محاذاة بالإنجليزي أو حط العربي في آخر عمود. وأسماء طويلة بتزق باقي السطر: قصّها زي [[short]]. والـ debug بـ print على stdout بيوسّخ الملف.`
          },
          lines: [
            "sys.",
            "Path.",
            "دالة بتحوّل البايتات لحجم مقروء.",
            "جرّب كل وحدة بالترتيب:",
            "لو الرقم بقى أصغر من 1024...",
            "...رجّعه بالوحدة دي (البايت من غير كسور).",
            "قسّم وجرّب الوحدة الأكبر.",
            "أكبر من كده.",
            "الفولدر من الـ argument أو الحالي.",
            "(الاسم، الحجم) لكل ملف، مترتبين من الأكبر.",
            "المجموع.",
            "عناوين الأعمدة بنفس العرض.",
            "خط.",
            "أكبر 5:",
            "قصّ الاسم الطويل.",
            "صف: شمال، يمين، نسبة مئوية (ومن غير قسمة على صفر).",
            "خط.",
            "الملخص بفواصل الآلاف.",
            "سطر debug على stderr."
          ],
          sol: R`على فولدر فيه فيديو وصورة و pdf وملفات صغيرة طلع:

[[file                            size   share]]
[[video_lecture.mp4             2.4 MB   87.6%]]
[[photo.jpg                   332.0 KB   11.9%]]
[[notes.pdf                    11.7 KB    0.4%]]
[[a very long file name...       900 B    0.0%]]
[[7 files, 2,854,563 bytes (2.7 MB)]]

ومع [[> r.txt]]: الشاشة فضل عليها سطر واحد بس [[total=2854563 len(rows)=8]] (8 لأن r.txt نفسه اتعمل قبل ما السكربت يبدأ)، والتقرير كله راح في الملف.

بعد ما بدّلت النسبة بالتاريخ (الكود تحت):

[[file                            size          modified]]
[[photo.jpg                   332.0 KB  2026-09-20 10:30]]

[[datetime.fromtimestamp(st.st_mtime)]] بيحوّل الوقت من ثواني لتاريخ بتوقيت جهازك، و [[strftime]] بيكتبه بالشكل اللي عايزه.`,
          solCode: R`import sys
from datetime import datetime
from pathlib import Path
def human(n: float) -> str:
    for unit in ("B", "KB", "MB", "GB"):
        if n < 1024:
            return f"{n:.0f} {unit}" if unit == "B" else f"{n:.1f} {unit}"
        n /= 1024
    return f"{n:.1f} TB"
folder = Path(sys.argv[1] if len(sys.argv) > 1 else ".")
files = sorted((p for p in folder.iterdir() if p.is_file()), key=lambda p: p.stat().st_size, reverse=True)
print(f"{'file':<26}{'size':>10}{'modified':>18}")
print("-" * 54)
for p in files[:5]:
    st = p.stat()
    name = p.name if len(p.name) <= 24 else p.name[:21] + "..."
    modified = datetime.fromtimestamp(st.st_mtime).strftime("%Y-%m-%d %H:%M")
    print(f"{name:<26}{human(st.st_size):>10}{modified:>18}")
print("-" * 54)
print(f"{len(files)} files, {human(sum(p.stat().st_size for p in files))}")`
        }
      ]
    },
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
  ]
});
