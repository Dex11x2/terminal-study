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
          ],
          sol: R`بعد [[source .venv/bin/activate]] الـ prompt بيبدأ بـ [[(.venv)]]، و [[which python]] بيرجع مسار جوه الفولدر، عندي طلع [[/tmp/claude-0/python-sol/.venv/bin/python]]. على ويندوز [[where python]] بيطبع أكتر من سطر، وأولهم لازم يبقى [[...\.venv\Scripts\python.exe]].

بعد [[deactivate]] الـ [[(.venv)]] بيختفي و [[which python]] يرجع لـ [[/usr/bin/python3]] أو مايلاقيش [[python]] خالص على أوبونتو (هناك اسمه [[python3]] بس).

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

[[Name: requests]] و [[Version: 2.32.3]] و [[Location: .../.venv/lib/python3.11/site-packages]] و [[Requires: certifi, charset-normalizer, idna, urllib3]] و [[Required-by:]] فاضية.

الـ Location هو اللي يأكدلك إنها اتسطبت جوه الـ venv مش على النظام. و Requires بتقولك ليه [[pip list]] طلّع مكتبات انت ماكتبتهاش. لو الـ Location طلع بره .venv (زي [[/usr/lib/python3/dist-packages]] أو [[~/.local]]) يبقى نسيت تفعّل الـ venv.`
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
          ],
          sol: R`في venv نضيف سطّبت فيه [[fastapi]] بس، [[pip freeze]] طلّع ١١ سطر، كلهم بالشكل [[name==version]]: [[fastapi==...]] و [[starlette]] و [[pydantic]] و [[pydantic_core]] و [[anyio]] و [[idna]] و [[typing_extensions]] وغيرهم. الرقم بالظبط بيتغير مع نسخة fastapi، المهم إنه أكتر بكتير من واحد.

ده الفرق بين freeze و requirements اللي كتبتها بإيدك: freeze بيثبّت كل شجرة المكتبات بنسخها الحالية، فلما حد تاني يسطّب ياخد نفس الحاجات بالظبط. ولو لقيت فيه عشرات المكتبات اللي مالهاش علاقة (jupyter وغيره)، يبقى انت شغّلته على Python النظام أو venv قديم مش على venv المشروع.`
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
          ],
          sol: R`على أوبونتو 24.04 [[pip install requests]] بيرفض ويطلّع:

[[error: externally-managed-environment]]
[[× This environment is externally managed]]
[[╰─> To install Python packages system-wide, try apt install python3-xyz ...]]

وكمل بيقترح venv أو pipx. ده مش bug: أوبونتو بيحمي Python بتاع النظام من إنك تكسر أدوات زي apt. (جربتها على python3.12 بتاع النظام وطلعت نفس الرسالة.)

بعد [[pipx install httpie]] و [[pipx ensurepath]] (وافتح ترمنال جديد)، [[pipx list]] هيوريك [[package httpie ...]] والأوامر [[http]] و [[https]]. و [[http example.com]] هيطبع [[HTTP/1.1 200 OK]] والـ headers ملونة وبعدها الـ HTML. لو طلع [[http: command not found]] يبقى الـ PATH لسه ما اتحدّثش. والغلط اللي متعملوش: [[--break-system-packages]] أو [[sudo pip install]].`
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
          ],
          sol: R`السيرفر بيطبع [[Serving HTTP on 127.0.0.1 port 8000 (http://127.0.0.1:8000/) ...]] ومع كل طلب سطر زي [[127.0.0.1 - - [30/Sep/2026 05:09:02] "GET / HTTP/1.1" 200 -]].

لو الـ index.html عادي خالص (HTML و CSS بس) مش هتلاقي فرق في Console بين الاتنين. الفرق بيظهر أول ما تستخدم [[<script type="module">]] أو fetch. جربت صفحة بتعمل [[import]] من [[./m.js]]: بالدبل كليك Console طلّع [[Access to script at 'file:///.../m.js' from origin 'null' has been blocked by CORS policy]]، ومن [[http://localhost:8000]] اشتغلت عادي.

لو طلع [[OSError: [Errno 98] Address already in use]] غيّر البورت. ولو فتحت [[http://0.0.0.0:8000]] وما اشتغلش على ويندوز، استخدم [[localhost]].`
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
          ],
          sol: R`جربتها بالظبط: [[python app/seed.py]] فشل بـ [[ModuleNotFoundError: No module named 'app']]، و [[python -m app.seed]] من نفس الفولدر (اللي فيه [[app/]]) اشتغل وطبع [[seed ok: demo]].

السبب: لما تشغّل ملف بمساره، Python بيحط فولدر الملف نفسه ([[app/]]) في [[sys.path]]، فمش شايف حاجة اسمها [[app]] جواه. مع [[-m]] بيحط الفولدر الحالي، فـ [[app]] بقى package يتعمله import.

لو [[-m]] كمان فشل بنفس الغلطة، يبقى انت واقف جوه [[app/]] نفسه مش في الفولدر اللي فوقه، أو ناسي [[__init__.py]] أحيانًا، أو كتبت [[app/seed]] أو [[app.seed.py]] بدل [[app.seed]].`,
          solCode: R`mkdir -p app && touch app/__init__.py
echo 'NAME = "demo"' > app/config.py
printf 'from app import config\nprint("seed ok:", config.NAME)\n' > app/seed.py
python app/seed.py     # ModuleNotFoundError: No module named 'app'
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
          example: R`python3 --version
python3 hello.py
python3 hello.py Sara
# ويندوز:
py --version
py --list
py -3.12 hello.py
python3 -i hello.py`,
          try: R`اعمل [[hello.py]] فيه 4 سطور: [[import sys]]، و [[name = sys.argv[1] if len(sys.argv) > 1 else "world"]]، و [[print(f"hello {name}")]]، و [[print("python", sys.version.split()[0], "from", sys.executable)]]. شغّله من غير اسم وباسم، وبعدين بـ [[python3 -i hello.py]] واكتب [[name]] بعد ما يخلص. وجرّب تشغّله وانت واقف في فولدر تاني.`,
          deep: {
            why: "أي حاجة بتعملها بإيدك أكتر من مرتين (تنقل ملفات، تجمع أرقام من شيتات، تشيّك على موقع) تتكتب سكربت مرة وتتشغّل بأمر واحد. والسكربت بيتحفظ في git، ويتجدول، وحد تاني يقدر يشغّله.",
            how: R`[[python3 hello.py]]: Python بيقرا الملف كله، يحوّله bytecode، وينفّذه من فوق لتحت. مفيش دالة main إجبارية زي C أو Java، أول سطر على مستوى الملف هو أول حاجة بتتنفّذ.

[[sys.executable]] بيقولك أنهي Python بالظبط اللي شغّال. لو الـ venv متفعّل هتلاقيه جوه [[.venv]]، ودي أسرع طريقة تعرف المكتبات هتيجي منين.

ويندوز: الـ installer بتاع python.org بيسطّب [[py]]. [[py]] لوحده بيشغّل أحدث نسخة، و [[py -3.12]] نسخة معيّنة، و [[py --list]] بيعرض النسخ المتسطّبة. ولو كتبت [[python]] واتفتح Microsoft Store، ده alias من ويندوز نفسه: يا تسطّب Python من python.org، يا تقفل الـ alias من Settings ثم Apps ثم App execution aliases.

[[python3 -i hello.py]] بيشغّل السكربت وبعدين يفتح الـ REPL ومعاك كل المتغيرات اللي اتعملت. مفيد تبص على النتيجة أو تجرّب دالة من غير ما تعدّل الملف.`,
            when: "أي مهمة بتتكرر. ولو المهمة سطر واحد بيوصّل أوامر موجودة، bash أو PowerShell ممكن يبقوا أقصر (درس «bash ولا Python ولا PowerShell» في المستوى ٣).",
            mistakes: R`تكتب [[hello.py]] لوحده في الترمنال فيطلع [[command not found]] (محتاج [[python3 hello.py]] أو shebang، الدرس الجاي). وتشغّله من فولدر تاني فيطلع [[python3: can't open file '/tmp/hello.py': [Errno 2] No such file or directory]]: المسار نسبي للفولدر اللي انت واقف فيه. وتسمّي السكربت [[random.py]] أو [[email.py]] أو [[csv.py]] فيغطّي على موديول Python الأصلي (درس «python -m»).`
          },
          lines: [
            "نسخة Python.",
            "شغّل السكربت.",
            "شغّله وابعتله كلمة توصل في sys.argv.",
            "الـ launcher بتاع ويندوز.",
            "النسخ المتسطّبة على الجهاز.",
            "شغّل بنسخة معيّنة.",
            "شغّله، وبعد ما يخلص افتح REPL ومعاك متغيراته."
          ],
          sol: R`الناتج عندي:

[[python3 hello.py]] طبع [[hello world]] وتحتها [[python 3.12.3 from /usr/bin/python3]].
[[python3 hello.py Sara]] طبع [[hello Sara]].
[[python3 -i hello.py]] طبع نفس السطرين وبعدين [[>>>]]، و [[name]] رجّع [['world']]. اخرج بـ [[exit()]] أو Ctrl+D.

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
          example: R`head -1 hello.py
chmod +x hello.py
./hello.py Sara
mkdir -p ~/.local/bin
cp hello.py ~/.local/bin/hello
hello Ali
# لو طلع command not found:
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc`,
          try: R`حط [[#!/usr/bin/env python3]] أول سطر في [[hello.py]]. شغّله بـ [[./hello.py]] قبل [[chmod +x]] وبعدها. وبعدين اعمل نسخة بنهايات سطور ويندوز: [[printf '#!/usr/bin/env python3\r\nprint("hi")\r\n' > crlf.py]] و [[chmod +x crlf.py]] وشغّلها واقرا الرسالة.`,
          deep: {
            why: "الأدوات اللي بتستخدمها كل يوم (backup، تنضيف، تقرير) أسهل لما تبقى أوامر باسمها، من غير ما تفتكر السكربت في أنهي فولدر.",
            how: R`لما تكتب [[./hello.py Sara]]، الـ kernel بيقرا أول حرفين في الملف، يلاقيهم [[#!]]، فبيشغّل [[/usr/bin/env python3 ./hello.py Sara]]. و [[env]] بيدوّر على [[python3]] في الـ PATH، فلو الـ venv متفعّل هياخد Python بتاع الـ venv.

ولو عايز السكربت يستخدم venv معيّن دايمًا (عشان مكتباته)، اكتب المسار كامل: [[#!/home/sara/tools/.venv/bin/python]]. ده أضمن من env في cron، لأن cron مش بيفعّل حاجة.

[[chmod +x]] بيدّي صلاحية التنفيذ. و [[~/.local/bin]] على أوبونتو بيتضاف للـ PATH لوحده من [[~/.profile]] لو الفولدر موجود ساعة الـ login، فلو لسه عامله افتح session جديدة أو ضيفه بإيدك زي آخر سطر في المثال. وعلى ماك الشيل zsh، فالسطر يروح [[~/.zshrc]].

ويندوز: ملفات [[.py]] مربوطة بالـ launcher، فـ [[hello.py Sara]] بيشتغل في CMD لو الامتداد في [[PATHEXT]]. والـ launcher بيفهم [[#!/usr/bin/env python3]] كـ «أحدث Python 3».`,
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
            "ضيف الفولدر للـ PATH لو مش موجود (وافتح ترمنال جديد)."
          ],
          sol: R`قبل [[chmod +x]]: [[bash: ./hello.py: Permission denied]]. وبعدها [[./hello.py Sara]] طبع [[hello Sara]]، و [[hello Ali]] من [[~/.local/bin]] طبع [[hello Ali]].

ملف الـ CRLF طلّع:

[[/usr/bin/env: ‘python3\r’: No such file or directory]]

والـ exit code كان 127. الـ [[\r]] اللي في الآخر بقى جزء من اسم البرنامج. الحل: [[sed -i 's/\r$//' crlf.py]] أو [[dos2unix crlf.py]]، أو في VS Code دوس على [[CRLF]] تحت على اليمين وخليها [[LF]] واحفظ.

وجرّبت ملف من غير shebang فيه [[print(1)]] بس: bash حاول يقراه وطلع [[syntax error near unexpected token $__bt1'$__bt]].`
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
          try: R`اعمل [[a.txt]] فيه 3 سطور و [[b.txt]] فيه سطرين. شغّل [[python3 count_lines.py a.txt b.txt]]، ومن غير ملفات، وعلى ملف مش موجود، وبعد كل واحدة [[echo $?]]. وبعدين [[python3 -c "import count_lines; print(count_lines.count_lines(__import__('pathlib').Path('a.txt')))"]]. وفي الآخر عدّله: الملف المش موجود يطبع رسالة على stderr والسكربت يكمّل الباقي، ويخرج بـ 1 لو أي ملف فشل.`,
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

و exit 1. وجرّبت فولدر بدل ملف: [[skip .: [Errno 21] Is a directory: '.']]، وملف binary: [[skip bin.dat: 'utf-8' codec can't decode byte 0xbb in position 0: invalid start byte]]. عشان كده الـ except فيه التلاتة.`,
          solCode: R`def main(argv: list[str]) -> int:
    if not argv:
        print("usage: count_lines.py FILE...", file=sys.stderr)
        return 2
    total, failed = 0, 0
    for name in argv:
        try:
            n = count_lines(Path(name))
        except (FileNotFoundError, IsADirectoryError, UnicodeDecodeError) as e:
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
          try: R`شغّله بـ [[python3 ask.py ~/Downloads "two words"]]، ومن غير arguments، واكتب [[ten]] بدل رقم. وبعدين من غير terminal خالص: [[python3 ask.py lab < /dev/null]]. وفي فولدر فيه ملفات txt جرّب [[python3 ask.py lab *.txt]] وبص على أول سطر.`,
          flag: "script",
          deep: {
            why: R`سكربت فيه المسار مكتوب جوه الكود لازم تعدّله قبل كل تشغيل. و [[sys.argv[1] ]] من غير فحص بيطلع [[IndexError]] للي بيستخدمه. والسؤال قبل المسح بيحميك من غلطة إيد.`,
            how: R`[[sys.argv[0] ]] اسم السكربت، والباقي الكلمات بالترتيب. اللي بيقسّم الكلام ويفك [[~]] و [[*]] هو الشيل مش Python: [["two words"]] وصلت عنصر واحد، و [[~/Downloads]] وصلت [[/home/sara/Downloads]]، و [[*.txt]] وصلت أسماء الملفات. على ويندوز CMD و PowerShell مبيفكوش [[*]]، فالسكربت بيستلم [[*.txt]] زي ما هي، والحل [[Path(".").glob(pattern)]] جوه Python.

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

و [[python3 ask.py lab *.txt]] في فولدر فيه [[a.txt]] و [[b.txt]]: [[['ask.py', 'lab', 'a.txt', 'b.txt']]]، يعني Python عمره ما شاف النجمة. ولو حطيتها بين quotes ([["*.txt"]]) هتوصل [['*.txt']] زي ما هي.`
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
          try: R`سمّيه [[check_config.py]] وشغّله في ٤ حالات وبعد كل واحدة [[echo $?]]: من غير config.json، وبـ [[{"db_url": "x",}]] (فاصلة زيادة)، وبـ [[{"db_url": "x"}]]، وبـ [[{"db_url": "x", "backup_dir": "/b"}]]. وفي الأخيرة جرّب [[python3 check_config.py && echo deploying]]. وجرّب [[python3 check_config.py nope.json > out.txt 2> err.txt]] وشوف كل ملف فيه إيه.`,
          flag: "script",
          deep: {
            why: R`سكربت backup فشل وطبع error بس خرج بـ 0: cron مش هيبعتلك حاجة، و [[backup.py && upload.py]] هيرفع نسخة بايظة، و CI هيبقى أخضر. الـ exit code هو الطريقة الوحيدة اللي البرامج التانية بتفهم بيها اللي حصل.`,
            how: R`[[sys.exit(n)]] بيرمي [[SystemExit]]، و Python وهو بيقفل بياخد الرقم منه. عشان كده [[finally]] و [[with]] بيكمّلوا شغلهم قبل الخروج.

القيم: [[sys.exit()]] أو [[sys.exit(None)]] = 0. رقم = الرقم ده (بس النظام بياخد آخر 8 bits، فـ [[sys.exit(256)]] بيطلع 0!). نص = يتطبع على stderr والكود 1. و [[sys.exit(True)]] = 1.

العرف: 0 نجاح، 1 فشل عام، 2 استخدام غلط (argparse بيخرج بيه)، و 130 لو اتقفل بـ Ctrl+C (Python بيعمل كده لوحده لو [[KeyboardInterrupt]] ماتمسكش).

تقرا الكود: bash [[echo $?]]، و PowerShell [[$LASTEXITCODE]]، و CMD [[echo %ERRORLEVEL%]].

[[f"{', '.join(missing)}"]]: علامات تنصيص مختلفة جوه الـ f-string عشان متقفلهاش.`,
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
الفاصلة الزيادة: [[error: config.json is not valid JSON: Expecting property name enclosed in double quotes: line 1 column 16 (char 15)]] و 1.
مفتاح ناقص: [[error: missing keys: backup_dir]] و 1.
سليم: [[config ok]] وبعدها [[deploying...]] و 0.

ومع [[> out.txt 2> err.txt]] على ملف مش موجود: الشاشة فاضية، و [[out.txt]] فاضي، و [[err.txt]] فيه سطر الخطأ. لو كنت طبعت الخطأ بـ print عادي كان راح في out.txt.

وجربت كمان: Ctrl+C (أو [[kill -INT]]) على سكربت شغال خرج بـ 130، و [[sys.exit(256)]] خرج بـ 0 مش 256.`
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
          try: R`حط السكربت في فولدر [[scripts]] وجنبه [[template.md]] فيه [[# يوميات]] وسطر فاضي. شغّله مرة من جوه الفولدر بـ [[python3 note.py خلصت درس pathlib]]، ومرة من [[/tmp]] بالمسار الكامل. وبعدين اعمل سكربت فيه [[print(Path("template.md").exists(), Path.cwd())]] وشغّله من [[/tmp]].`,
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

والسكربت التاني من [[/tmp]] طبع [[False /tmp]]: [[Path("template.md")]] دوّر في [[/tmp]] مش جنب السكربت. وده نفس اللي هيحصل في cron.`
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
          try: R`اعمل مشروع تجربة: [[mkdir -p proj/src proj/docs proj/img proj/.git]] و [[touch proj/src/a.py proj/src/b.py proj/src/c.py proj/docs/README.md proj/NOTES.md proj/img/x.PNG proj/img/y.png proj/img/z.jpg proj/Makefile]] وشغّل السكربت عليه. وبعدين اكتب سكربت يطبع الملفات اللي اتعدلت في آخر 24 ساعة بس، من غير ما يدخل [[.git]] و [[node_modules]] و [[.venv]] أصلًا.`,
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

وحل التمرين تحت بـ [[Path.walk()]]. على نفس المشروع ومعاه [[node_modules]] و [[.venv]] (فيهم ملفات جديدة) وملفات اتعدلت من 3 أيام بـ [[touch -d "3 days ago"]]، طبع [[src/a.py]] و [[img/z.jpg]] و [[img/x.PNG]] و [[NOTES.md]] و [[img/y.png]] وبعدين [[5 files changed in the last 24h]]، ومادخلش node_modules ولا .venv خالص. لو عندك Python أقدم من 3.12: [[os.walk(root)]] بنفس الشكل بس [[dirpath]] بيبقى string.`,
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

وأهم حاجة في الدرس: [[encoding="utf-8"]] دايمًا. من غيرها Python بيستخدم encoding الجهاز، وده utf-8 على لينكس وماك بس ممكن يبقى [[cp1256]] على ويندوز عربي، فنفس السكربت يكتب عربي سليم عندك ويطلّع رموز غريبة عند زميلك.`,
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
          try: R`شغّله مرتين وشوف الفرق. وبعدين جرّب اللي بيحصل على ويندوز قديم لما تعمل redirect لملف: [[PYTHONIOENCODING=cp1252 python3 -c 'print("سلام")']]. وفي الآخر اعمل ملف فيه BOM زي اللي Notepad و Excel بيعملوه: [[printf '\xef\xbb\xbfname\n' > bom.txt]] واقراه بـ [[encoding="utf-8"]] وبـ [[encoding="utf-8-sig"]] واطبع [[repr]].`,
          flag: "script",
          deep: {
            why: R`أشهر مشكلة في سكربتات بتتعامل مع عربي: ملف بيتفتح فيطلع [[ط§ظ„ط³ظ„ط§ظ…]] بدل «السلام»، أو السكربت يقع بـ [[UnicodeDecodeError]] أو [[UnicodeEncodeError]] على جهاز ويندوز. والسبب دايمًا ملف اتكتب بـ encoding واتقرا بـ encoding تاني.`,
            how: R`الملف على الديسك bytes. الـ encoding هو اللي بيحوّل الحروف لـ bytes وبالعكس، و utf-8 بيكتب الحرف العربي في 2 bytes ([[b'\xd8\xa7\xd9\x84...']] في المثال).

لو قريت bytes الـ utf-8 بـ [[cp1256]] (encoding ويندوز العربي القديم) مفيش error، بس كل حرف بيتقري حرفين غلط: [[ط§ظ„ط³ظ„ط§ظ…]]. لو شفت الشكل ده في أي مكان، اعرف إن utf-8 اتقرا كـ cp1256.

الافتراضي من غير encoding هو [[locale.getpreferredencoding()]]. والحلول على ويندوز: اكتب encoding في كل open، أو شغّل بـ [[python -X utf8]]، أو اعمل متغير البيئة [[PYTHONUTF8=1]]. و PEP 686 بيخلي UTF-8 هو الافتراضي من Python 3.15، بس متعتمدش على ده واكتبها.

[[utf-8-sig]]: Notepad القديم و Excel بيحطوا 3 bytes في أول الملف (BOM). [[utf-8]] بيقراهم حرف [[\ufeff]] فأول كلمة في الملف تبقى [['\ufeffname']] مش [['name']]، و [[utf-8-sig]] بيشيلهم.

[[errors="replace"]] بيحط [[�]] مكان أي byte مش مفهوم بدل ما يقع، مفيد لـ logs ملخبطة.

وضع النص بيحوّل [[\r\n]] لـ [[\n]] وانت بتقرا، وعلى ويندوز بيكتب [[\n]] كـ [[\r\n]]. والملفات الكبيرة: لف على [[f]] سطر سطر زي المثال بدل [[read()]].`,
            when: "كل open وكل read_text و write_text. مفيش استثناء.",
            mistakes: R`[["w"]] على ملف موجود بيمسح محتواه من غير ما يسأل، فلو قصدك تضيف استخدم [["a"]]، ولو مش عايز تدوس على حاجة استخدم [["x"]]. و [[f.write]] مش بيحط سطر جديد لوحده. وتقرا ملف 2GB بـ [[read_text()]] فالذاكرة تخلص. ومتنساش إن [[print]] للترمنال ليه encoding هو كمان: من غير UTF-8 mode على ويندوز قديم، [[python script.py > out.txt]] فيه عربي ممكن يقع.`
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
            "نفس الملف لو اتقرا بـ encoding ويندوز العربي القديم.",
            "x: اكتب بس لو الملف مش موجود.",
            "اكتب."
          ],
          sol: R`أول مرة:

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
          try: R`جهّز: [[mkdir -p project/__pycache__ project/.venv/lib && echo 'print(1)' > project/app.py]]. شغّل السكربت. وبعدين اكتب [[echo NEW > project/app.py]] وشغّله تاني وبص على [[backup/app.py.bak]]. وجرّب في Python: [[Path("")]] بيطلع إيه، و [[Path("").resolve()]].`,
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
          sol: R`أول تشغيل:

[[['backup/app.py.bak', 'backup/project', 'backup/project/app.py'] ]]: من غير .venv ولا __pycache__.
[[deleted backup/project]]
[[69.3 GB free]] (الرقم على حسب جهازك)
[[refusing to delete /home/sara/project: not inside /home/sara/project/backup]] و exit 1.

بعد [[echo NEW > project/app.py]] والتشغيل التاني: [[cat backup/app.py.bak]] طلع [[NEW]]. الـ move كتب فوق النسخة القديمة من غير ولا كلمة. لو النسخ القديمة مهمة، حط تاريخ في الاسم (درس «datetime وأسماء الملفات» في المستوى ٢) أو افحص [[exists()]] الأول.

و [[Path("")]] طلع [[PosixPath('.')]]، و [[Path("").resolve() == Path.cwd()]] طلع [[True]]. يعني [[rmtree(Path(""))]] بيمسح الفولدر اللي انت فيه. عشان كده الفحص بيتعمل على المسار بعد resolve.`
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
          ],
          sol: R`[[pytest]] بيطبع [[F]] وتحته حاجة زي:

[[>   def test_add(): assert 1 + 1 == 3]]
[[E   assert (1 + 1) == 3]]
[[FAILED tests/test_math.py::test_add - assert (1 + 1) == 3]]
[[1 failed in 0.02s]]

السطر اللي بيبدأ بـ [[E]] هو المفيد: pytest بيعيد كتابة الـ [[assert]] العادي عشان يوريك الطرفين. مع متغيرات بيكتبلك قيمهم، زي [[assert 2 == 3]] ومعاها [[where 2 = add(1, 1)]]. بعد ما تصلّحه لـ [[== 2]] هتلاقي [[.]] و [[1 passed]].

لو طلع [[no tests ran]] يبقى اسم الملف أو الدالة مش بيبدأ بـ [[test_]]. ولو [[pytest: command not found]] يبقى الـ venv مش متفعل، استخدم [[python -m pytest]].`
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
          ],
          sol: R`مع اختبارين واحد منهم [[@pytest.mark.slow]]، [[pytest -m "not slow"]] بيطلّع [[1 passed, 1 deselected]]. ولما كتبت [[@pytest.mark.slwo]] وقفت الـ collection كلها بـ:

[[ERROR tests/test_math.py - Failed: 'slwo' not found in $__btmarkers$__bt configuration option]]
[[Interrupted: 1 error during collection]]

من غير [[--strict-markers]] كان هيعدّي بـ warning بس، والاختبار «البطيء» هيفضل شغال في كل مرة من غير ما تاخد بالك. وخد بالك من حاجتين: سطر [[asyncio_mode = auto]] بيطلّع [[PytestConfigWarning: Unknown config option: asyncio_mode]] لو [[pytest-asyncio]] مش متسطبة. ولو عدّلت ملف الاختبار وشغّلت pytest على طول والنتيجة ما اتغيرتش، امسح [[__pycache__]] وجرّب تاني.`
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
          ],
          sol: R`[[curl -s localhost:8000/health]] بيرجع [[{"ok":true}]] (JSON بيكتب [[true]] مش [[True]]). لما تعدّل الرد وتحفظ، اللوج بيطبع:

[[WARNING:  WatchFiles detected changes in 'app/main.py'. Reloading...]]
وبعدها [[Started server process [...]]] و [[Application startup complete.]]

والـ curl التاني بيرجع الرد الجديد. جربتها وده اللي حصل بالظبط.

لو ما عملش reload: انت شغّله من غير [[--reload]]، أو الملف بره الفولدر اللي بيراقبه (أول سطر في اللوج [[Will watch for changes in these directories]]). ولو طلع [[Error loading ASGI app. Could not import module "app.main"]] يبقى انت مش واقف في الفولدر اللي فيه [[app/]]. وافتح [[/docs]] هتلاقي [[/health]] ظاهر لوحده.`,
          solCode: R`# app/main.py  (plus an empty app/__init__.py)
from fastapi import FastAPI

app = FastAPI()

@app.get("/health")
def health():
    return {"ok": True}`
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
          ],
          sol: R`جربتها بـ [[INTERNAL_TOKEN='ab"c']] والـ [[creds.json]] طلع سليم، و [[json.dump]] هرّب علامة التنصيص لوحده:

[[    "value": "Bearer ab\"c"]]

و [[python3 -m json.tool creds.json]] قراه من غير مشاكل. أما بـ echo:

[[echo "[{\"name\":\"internal\",\"value\":\"Bearer $INTERNAL_TOKEN\"}]" > bad.json]]

طلع [[[{"name":"internal","value":"Bearer ab"c"}]]] وده JSON مكسور، و json.tool قال [[Expecting ',' delimiter: line 1 column 40]].

وعلامات التنصيص حوالين [[<<'PY']] مهمة: بتمنع bash إنه يغيّر [[$]] أو [[$__bt]] جوه كود Python. ولو نسيت تعمل [[export]] هيطلع [[KeyError: 'INTERNAL_TOKEN']].`
        }
      ]
    },
    {
      t: "pytest بالتفصيل",
      l: 2,
      n: "fixtures و conftest.py، و parametrize، و tmp_path، و monkeypatch و mock، واختبار FastAPI، و coverage",
      items: [
        {
          cmd: "@pytest.fixture",
          title: "تجهيز وتنضيف مشترك بين الاختبارات",
          desc: R`الـ fixture دالة عليها [[@pytest.fixture]] بتجهّز حاجة الاختبار محتاجها (اتصال بقاعدة، client، ملف). الاختبار بيطلبها بإنه يكتب اسمها كباراميتر، و pytest بيناديها ويدّيله الناتج.

لو فيها [[yield]]: اللي قبله تجهيز، واللي بعده تنضيف بيشتغل بعد الاختبار حتى لو وقع. و [[scope]] بيحدد بتتعمل كام مرة: لكل اختبار (الافتراضي)، ولا مرة للملف، ولا مرة للتشغيل كله. والـ fixtures المشتركة بتتحط في [[conftest.py]] فكل ملفات الاختبار تشوفها من غير import.`,
          example: R`# tests/conftest.py
import sqlite3
import pytest
@pytest.fixture(scope="session")
def db_url(tmp_path_factory):
    return str(tmp_path_factory.mktemp("data") / "test.db")
@pytest.fixture
def db(db_url):
    conn = sqlite3.connect(db_url)
    conn.execute("CREATE TABLE IF NOT EXISTS users (name TEXT)")
    yield conn
    conn.execute("DELETE FROM users")
    conn.commit()
    conn.close()
# tests/test_users.py
def test_add_user(db):
    db.execute("INSERT INTO users VALUES ('sara')")
    assert db.execute("SELECT count(*) FROM users").fetchone()[0] == 1
def test_starts_empty(db):
    assert db.execute("SELECT count(*) FROM users").fetchone()[0] == 0`,
          try: R`حط الملفين وشغّل [[pytest tests/test_users.py --setup-show]] وشوف امتى كل fixture بيتعمل ويتقفل. وبعدين غيّر [[@pytest.fixture]] اللي فوق [[db]] لـ [[@pytest.fixture(scope="module")]] وشغّل تاني: اختبار واحد هيقع. ليه؟`,
          flag: "script",
          deep: {
            why: "من غير fixtures كل اختبار بيبدأ بعشر سطور تجهيز متكررة، وبينسى يقفل الاتصال أو يمسح البيانات، فالاختبار التاني بيلاقي زبالة الأول. الـ fixture بيحط التجهيز والتنضيف في مكان واحد، والاختبار يفضل فيه السطرين اللي بيختبروا بس.",
            how: R`pytest بيقرا أسماء باراميترات الاختبار، ولكل اسم بيدوّر على fixture بنفس الاسم: في نفس الملف، وبعدين في [[conftest.py]] في نفس الفولدر، وبعدين في conftest.py في الفولدرات اللي فوقه، وبعدين الـ fixtures الجاهزة (زي [[tmp_path]] و [[monkeypatch]] و [[capsys]]) واللي جاية من plugins. والـ fixture نفسه ممكن يطلب fixtures تانية بنفس الطريقة: [[db]] هنا طالب [[db_url]].

[[yield]] بيقسم الدالة نصين: الجزء اللي قبله setup، والقيمة اللي بعد yield هي اللي بتوصل للاختبار، والجزء اللي بعده teardown. الـ teardown بيشتغل حتى لو الاختبار فشل، زي finally.

[[scope]]: [[function]] (الافتراضي) نسخة جديدة لكل اختبار. [[module]] مرة لكل ملف. [[session]] مرة للتشغيل كله: مناسب للحاجات الغالية اللي مبتتغيرش (مسار القاعدة، container Postgres، الـ app). القاعدة: fixture ممكن يطلب fixture في نفس الـ scope أو أوسع، مش أضيق. session مينفعش يطلب fixture بـ function scope، و pytest بيقولك [[ScopeMismatch]].

[[autouse=True]] بيخلي الـ fixture يشتغل لكل اختبار من غير ما حد يطلبه (هتشوفه في درس monkeypatch بيمنع الشبكة).

[[--setup-show]] بيطبع كل SETUP و TEARDOWN والحرف جنبه ([[S]] session و [[F]] function). و [[pytest --fixtures]] بيطبع كل الـ fixtures المتاحة ومكانها.`,
            when: "أي تجهيز بيتكرر في أكتر من اختبار: قاعدة، client للـ API، ملفات، مستخدم جاهز. وكل حاجة محتاجة تتقفل أو تتمسح بعد الاختبار.",
            mistakes: R`scope أوسع من اللازم لحاجة بتتغير: الاختبارات بتنجح لوحدها وتفشل مع بعض أو بالعكس، حسب الترتيب. و [[return]] بدل [[yield]] فالتنضيف اللي بعده مبيتنفذش أصلًا. ونداء الـ fixture كدالة عادية [[db()]] من جوه الاختبار: pytest بيرفض ويقولك fixtures مش معمولة تتنادى مباشرة. وفي الانترفيو: «إيه الفرق بين fixture و setUp في unittest؟» الإجابة: الـ fixture بيتطلب بالاسم فكل اختبار ياخد اللي محتاجه بس، وبيتركّب (fixture يطلب fixture)، وليه scope، والتنضيف جنب التجهيز بـ yield.`
          },
          lines: [
            "SQLite جاية مع Python، مناسبة للمثال.",
            "pytest.",
            "fixture بيتعمل مرة واحدة للتشغيل كله.",
            R`بيطلب [[tmp_path_factory]] (fixture جاهز للـ session scope).`,
            "مسار ملف القاعدة في فولدر مؤقت.",
            "fixture لكل اختبار (الافتراضي).",
            "بيطلب db_url، فـ pytest بيجهّزه الأول.",
            "افتح اتصال.",
            "اعمل الجدول لو مش موجود.",
            "ادّي الاتصال للاختبار، واستنى لحد ما يخلص.",
            "بعد الاختبار: امسح اللي اتكتب...",
            "...واحفظ المسح...",
            "...واقفل الاتصال.",
            "اختبار بيطلب db بالاسم.",
            "ضيف صف.",
            "في صف واحد.",
            "اختبار تاني بيطلب db.",
            "المفروض يبدأ فاضي لأن التنضيف اشتغل."
          ],
          sol: R`[[--setup-show]] بيطبع حاجة زي: [[SETUP S db_url]] مرة واحدة في الأول، وبعدين لكل اختبار [[SETUP F db]] ثم الاختبار ثم [[TEARDOWN F db]]، وفي الآخر [[TEARDOWN S db_url]]. يعني db اتعمل واتقفل مرتين، و db_url مرة. (لو عندك plugins زي pytest-asyncio هتلاقي fixtures زيادة في الناتج، عادي.)

بـ [[scope="module"]]: [[test_starts_empty]] بيقع بـ [[assert 1 == 0]]. الـ fixture بقى بيتعمل مرة واحدة للملف، فالتنضيف (DELETE) مش بيشتغل غير بعد آخر اختبار في الملف، والتاني شايف الصف اللي الأول ضافه. ولو غيّرت ترتيب الاختبارين الاتنين هينجحوا، ودي أخطر حاجة: اختبارات نتيجتها بتعتمد على الترتيب.

الحل: ارجع للـ function scope للحاجة اللي بتتغير. ولو التجهيز غالي فعلًا، خلّي الغالي (الاتصال نفسه) session، وخلّي التنضيف (rollback أو DELETE) في fixture تاني بـ function scope، زي ما db_url و db متقسمين هنا.`,
          solCode: R`# tests/conftest.py: الغالي مرة واحدة، والتنضيف لكل اختبار
import sqlite3
import pytest

@pytest.fixture(scope="session")
def conn(tmp_path_factory):
    c = sqlite3.connect(tmp_path_factory.mktemp("data") / "test.db")
    c.execute("CREATE TABLE IF NOT EXISTS users (name TEXT)")
    yield c
    c.close()

@pytest.fixture
def db(conn):
    yield conn
    conn.rollback()
    conn.execute("DELETE FROM users")
    conn.commit()`
        },
        {
          cmd: "@pytest.mark.parametrize",
          title: "اختبار واحد على جدول حالات",
          desc: R`بدل ما تكتب نفس الاختبار خمس مرات بأرقام مختلفة: [[@pytest.mark.parametrize]] بياخد أسماء الباراميترات ولستة حالات، و pytest بيشغّل الاختبار مرة لكل حالة، وكل مرة بتظهر كاختبار منفصل باسم الحالة.

و [[pytest.raises]] بيختبر إن الكود رمى exception معيّن، و [[match]] بيتأكد من الرسالة.`,
          example: R`import pytest
from app.pricing import final_price
@pytest.mark.parametrize(
    ("price", "coupon", "expected"),
    [
        (200, None, 200),
        (200, "SAVE10", 180),
        (0, "SAVE10", 0),
        pytest.param(200, "save10", 180, id="lowercase-coupon"),
    ],
)
def test_final_price(price, coupon, expected):
    assert final_price(price, coupon) == expected
@pytest.mark.parametrize("price", [-1, -100])
def test_negative_price_rejected(price):
    with pytest.raises(ValueError, match="negative"):
        final_price(price, None)`,
          try: R`اكتب [[app/pricing.py]] فيه [[final_price]] بتقارن [[coupon == "SAVE10"]] بس، وشغّل [[pytest -v]]. شوف مين وقع واسمه إيه. صلّح الدالة، وضيف حالة [[(99, "SAVE10", 89)]] وتأكد إنها بتعدّي.`,
          flag: "script",
          deep: {
            why: "الأخطاء بتستخبى في الحالات الطرفية: صفر، سالب، حروف صغيرة، قيمة فاضية. لو كل حالة محتاجة اختبار كامل هتكتب اتنين وتزهق. الجدول بيخلي إضافة حالة سطر واحد، وبيوريك في النتيجة أنهي حالة بالظبط وقعت.",
            how: R`أول argument أسماء الباراميترات (tuple أو string فيه أسماء مفصولة بفاصلة)، والتاني لستة، كل عنصر فيها tuple بنفس الترتيب. pytest بيعمل اختبار لكل عنصر، والـ id التلقائي من القيم: [[test_final_price[200-SAVE10-180] ]].

[[pytest.param(..., id="...")]] بيدّي الحالة اسم مقروء، وتقدر تضيف [[marks=pytest.mark.xfail]] لحالة معروف إنها بايظة لسه. و [[pytest -k lowercase]] يشغّل الحالة دي لوحدها.

لو حطيت أكتر من parametrize فوق بعض، pytest بيعمل كل التوافيق (2 × 3 = 6 اختبارات).

[[with pytest.raises(ValueError, match="negative")]]: لو الكود جوه الـ with مرماش ValueError، الاختبار بيفشل بـ [[DID NOT RAISE]]. و [[match]] regex بيتدوّر عليه في رسالة الـ exception. ولو محتاج الـ exception نفسه: [[with pytest.raises(ValueError) as exc:]] وبعدين [[exc.value]].

وتقدر تعمل parametrize لـ fixture كمان: [[@pytest.fixture(params=["sqlite", "postgres"])]] وجواه [[request.param]]، فكل الاختبارات اللي بتطلبه تتشغّل مرتين.`,
            when: "أي دالة ليها مدخلات ومخرجات واضحة: حسابات، validation، parsing، تحويل تواريخ. وأي bug اتصلّح: ضيفه كحالة في الجدول عشان ميرجعش.",
            mistakes: R`اختبار فيه [[for]] على الحالات بدل parametrize: أول حالة تقع بتوقف الباقي، ومش هتعرف غير أول غلطة. وحساب الـ expected بنفس المعادلة اللي في الكود ([[price * 0.9]]): لو المعادلة غلط الاختبار هيعدّي. اكتب الرقم بإيدك. و [[pytest.raises(Exception)]] عام أوي: هيعدّي حتى لو الكود وقع بـ TypeError من غلطة تانية خالص.`
          },
          lines: [
            "pytest.",
            "الدالة اللي بنختبرها.",
            "اختبار واحد على جدول حالات:",
            "أسماء الباراميترات.",
            "الحالات:",
            "من غير كوبون.",
            "كوبون صح: خصم ١٠٪.",
            "حالة طرفية: سعر صفر.",
            "حالة ليها اسم مقروء في الناتج.",
            "نهاية اللستة.",
            "نهاية الـ decorator.",
            "الاختبار بياخد الباراميترات.",
            "المقارنة.",
            "جدول بباراميتر واحد.",
            "اختبار إن السعر السالب مرفوض.",
            "لازم يرمي ValueError ورسالتها فيها negative.",
            "النداء اللي المفروض يرمي."
          ],
          sol: R`بالمقارنة الحرفية، [[pytest -v]] بيطلّع خمسة PASSED وواحد [[FAILED tests/test_pricing.py::test_final_price[lowercase-coupon] ]]، والرسالة [[assert 200 == 180]]. الاسم اللي انت ادّيته للحالة هو اللي باين، فعرفت المشكلة من غير ما تفتح الكود: الكوبون بحروف صغيرة مش متعرف عليه.

التصليح: قارن بعد [[.upper()]]، ومن غير ما تقع لو الكوبون [[None]]. بعدها الستة PASSED، والحالة الجديدة [[99]] تطلع [[89]] (لأن [[round(89.1)]] = 89).

لو ضفت الحالة الجديدة وكتبت expected [[89.1]] هتقع: الدالة بتقرّب لرقم صحيح. وده بالظبط اللي الجدول بيكشفه: قرار (نقرّب ولا لأ) لازم يبقى مكتوب في اختبار.`,
          solCode: R`# app/pricing.py
def final_price(price: int, coupon: str | None) -> int:
    if price < 0:
        raise ValueError("price can't be negative")
    if coupon and coupon.upper() == "SAVE10":
        return round(price * 0.9)
    return price

# في tests/test_pricing.py ضيف للّستة:
#     (99, "SAVE10", 89),`
        },
        {
          cmd: "tmp_path",
          title: "اختبار بيكتب ويقرا ملفات",
          desc: R`[[tmp_path]] fixture جاهز في pytest: بيدّيك فولدر فاضي جديد (كـ [[pathlib.Path]]) لكل اختبار. تكتب فيه وتقرا منه براحتك، ومش هتلمس ملفات المشروع الحقيقية ولا اختبار يشوف ملفات التاني.

ولو محتاج فولدر واحد مشترك لكذا اختبار (session scope)، في [[tmp_path_factory]].`,
          example: R`import json
from app.config import load_config
def test_reads_config(tmp_path):
    cfg = tmp_path / "config.json"
    cfg.write_text(json.dumps({"port": 9000}), encoding="utf-8")
    assert load_config(cfg) == {"port": 9000, "debug": False}
def test_missing_file_uses_defaults(tmp_path):
    assert load_config(tmp_path / "nope.json") == {"port": 8000, "debug": False}`,
          try: R`اكتب [[save_report(rows, out_dir)]] بتكتب [[report.csv]] فيه [[name,price]] وصف لكل عنصر وترجّع مسار الملف. اختبرها بـ tmp_path، واطبع [[tmp_path]] وشغّل بـ [[pytest -s]] عشان تشوف الفولدر ده فين.`,
          flag: "script",
          deep: {
            why: R`اختبار بيكتب في [[./output]] أو [[/tmp/report.csv]]: اختبارين بيكتبوا نفس الملف في نفس الوقت (مع pytest-xdist) فيبوظوا بعض، وملف فاضل من run قديم بيخلي الاختبار يعدّي غلط، وممكن تمسح ملف حقيقي بالغلط. tmp_path بيحل التلاتة.`,
            how: R`pytest بيعمل فولدر أساسي ([[/tmp/pytest-of-USER/pytest-N/]] على لينكس)، وجواه فولدر لكل اختبار باسمه ([[test_reads_config0]]). وبيحتفظ بآخر ٣ تشغيلات بس ويمسح الأقدم، فلو اختبار وقع تقدر تفتح الفولدر وتشوف الملفات اللي كان كاتبها.

[[tmp_path]] من نوع [[pathlib.Path]]: [[/]] بيركّب المسارات، و [[write_text]] و [[read_text]] و [[mkdir]] و [[exists]] جاهزين. ادّي الدالة بتاعتك [[Path]] مش string متركّب، وخلّيها تقبل المسار كباراميتر بدل ما تكون مثبتاه جواها: ده اللي بيخليها قابلة للاختبار أصلًا.

[[--basetemp=DIR]] بيغيّر المكان (وبيمسحه في أول كل تشغيل، فمتدّيهوش فولدر فيه حاجة مهمة).

fixtures جاهزة قريبة: [[capsys]] بيمسك الـ print ([[capsys.readouterr().out]])، و [[caplog]] بيمسك رسايل logging، و [[monkeypatch.chdir(tmp_path)]] لو الكود بيكتب في الفولدر الحالي.`,
            when: "أي كود بيقرا أو يكتب ملفات: config، تقارير CSV، رفع صور، cache على الديسك.",
            mistakes: R`دالة بتكتب في مسار ثابت جواها ([[open("report.csv", "w")]]) فمتقدرش تختبرها غير بإنك تكتب في فولدر المشروع. و [[open()]] من غير [[encoding="utf-8"]]: بيعدّي على لينكس ويقع على ويندوز مع العربي. واستخدام الـ [[tempfile]] بإيدك من غير تنضيف.`
          },
          lines: [
            "json.",
            "الدالة اللي بتقرا ملف الإعدادات.",
            "الاختبار بيطلب tmp_path.",
            "مسار ملف جوه الفولدر المؤقت.",
            "اكتب فيه JSON.",
            "القيم اللي في الملف غطّت الافتراضي، والباقي افتراضي.",
            "اختبار تاني بفولدر مؤقت تاني.",
            "ملف مش موجود: يرجع الافتراضي من غير ما يقع."
          ],
          sol: R`الاختبار بيعدّي، و [[-s]] بيطبع مسار زي [[/tmp/pytest-of-USER/pytest-6/test_save_report0]]. افتحه بعد التشغيل هتلاقي report.csv لسه موجود (pytest بيسيب آخر ٣ تشغيلات).

الـ CSV المتوقع بالظبط: [[name,price]] ثم [[pen,5]] ثم [[cup,12]]. ولاحظ إن [[csv.DictReader]] بيرجّع كل القيم strings ([["12"]] مش [[12]])، فلو قارنت بـ int هيقع.

الغلطة الشائعة: [[open(out, "w")]] من غير [[newline=""]]: على ويندوز بيطلع سطر فاضي بين كل صف والتاني ([[\r\r\n]]). والتانية: الدالة بتكتب في [["report.csv"]] ثابت، فالاختبار مبيلاقيش الملف في tmp_path.`,
          solCode: R`# app/report_csv.py
import csv
from pathlib import Path

def save_report(rows: list[dict], out_dir: Path) -> Path:
    out = out_dir / "report.csv"
    with out.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["name", "price"])
        w.writeheader()
        w.writerows(rows)
    return out

# tests/test_report_csv.py
import csv
from app.report_csv import save_report

def test_save_report(tmp_path):
    print(tmp_path)
    out = save_report([{"name": "pen", "price": 5}, {"name": "cup", "price": 12}], tmp_path)
    assert out == tmp_path / "report.csv"
    assert out.read_text(encoding="utf-8").splitlines() == ["name,price", "pen,5", "cup,12"]
    with out.open(encoding="utf-8") as f:
        assert list(csv.DictReader(f))[1] == {"name": "cup", "price": "12"}`
        },
        {
          cmd: "monkeypatch",
          title: "تغيّر متغير بيئة أو دالة للاختبار ده بس",
          desc: R`[[monkeypatch]] fixture جاهز بيغيّر حاجات مؤقتًا: [[setenv]] و [[delenv]] لمتغيرات البيئة، و [[setattr]] يبدّل دالة أو قيمة في module أو object، و [[chdir]] يغيّر الفولدر الحالي. وبعد الاختبار كل حاجة بترجع زي ما كانت لوحدها، حتى لو الاختبار وقع.

بيه تعزل الحاجات اللي بتتغير لوحدها: الوقت، والبيئة، والشبكة.`,
          example: R`# tests/conftest.py
import pytest
@pytest.fixture(autouse=True)
def no_network(monkeypatch):
    def guard(*args, **kwargs):
        raise RuntimeError("network call in a test!")
    monkeypatch.setattr("socket.socket.connect", guard)
# tests/test_env_time.py
from app import clock, settings
def test_debug_from_env(monkeypatch):
    monkeypatch.setenv("APP_DEBUG", "1")
    assert settings.is_debug() is True
def test_debug_off_by_default(monkeypatch):
    monkeypatch.delenv("APP_DEBUG", raising=False)
    assert settings.is_debug() is False
def test_greeting_morning(monkeypatch):
    monkeypatch.setattr(clock, "current_hour", lambda: 9)
    assert clock.greeting() == "صباح الخير"`,
          try: R`اعمل [[app/settings.py]] بيقرا [[APP_DEBUG]] جوه [[is_debug()]] والاختبارات تعدّي. وبعدين غيّره يقرا المتغير مرة واحدة في أول الملف ([[DEBUG = os.environ.get("APP_DEBUG") == "1"]]) و [[is_debug]] ترجّع [[DEBUG]]، وشغّل تاني. مين وقع وليه؟ وصلّح الاختبار من غير ما ترجّع الكود.`,
          flag: "script",
          deep: {
            why: R`الكود اللي بيعتمد على [[datetime.now()]] أو [[os.environ]] أو API خارجي نتيجته بتتغير: الاختبار يعدّي الصبح ويقع بالليل، أو يعدّي عندك ويقع في CI عشان متغير مش موجود هناك. ولو غيّرت [[os.environ]] بإيدك من غير ترجيع، الاختبارات اللي بعده بتتأثر.`,
            how: R`كل عملية في monkeypatch بتتسجّل، وبعد الاختبار بيعمل undo بالعكس. [[setenv("APP_DEBUG", "1")]] بيحط القيمة (لازم string)، و [[delenv(..., raising=False)]] بيشيله ومش بيقع لو مش موجود أصلًا.

[[setattr(clock, "current_hour", lambda: 9)]] بيبدّل الاسم [[current_hour]] جوه الـ module [[clock]]. ولأن [[greeting()]] بتدوّر على [[current_hour]] في الـ module بتاعها وقت ما تتنادى، هتلاقي النسخة المزيّفة. ده أبسط وأأمن من إنك تزيّف [[datetime]] نفسه: خلّي الوقت ييجي من دالة صغيرة بتاعتك، وزيّفها هي. (وفيه مكتبات زي time-machine و freezegun لو محتاج توقّف الساعة للكود كله.)

والصيغة بـ string: [[setattr("socket.socket.connect", guard)]] بيعمل import للمسار ويبدّل آخر اسم. هنا بتبدّل [[connect]] لكل socket، فأي اختبار بيحاول يكلّم الشبكة (httpx أو requests أو asyncpg) بيقع فورًا برسالة واضحة. و [[autouse=True]] بيطبّقه على كل الاختبارات من غير ما حد يطلبه. [[TestClient]] بتاع FastAPI مش بيفتح socket، فمش بيتأثر. (ولو عايز ده جاهز بإعدادات أكتر، فيه plugin اسمه pytest-socket.)

[[monkeypatch.chdir(tmp_path)]] لكود بيكتب في الفولدر الحالي، و [[monkeypatch.setitem(d, key, value)]] لـ dict زي الإعدادات.`,
            when: "متغيرات البيئة، والوقت، والفولدر الحالي، ومنع الشبكة في كل الاختبارات. ولتبديل دالة بسيطة بقيمة ثابتة. ولو محتاج تتأكد الدالة اتنادت بإيه، استخدم mock (الدرس الجاي).",
            mistakes: R`قيمة بتتقري وقت الـ import (ثابت في أول الملف): [[setenv]] بعد كده مبيأثرش لأن القيمة اتحسبت خلاص، وده السؤال اللي في «جرّب». و [[setattr]] على المكان الغلط (نفس فكرة «patch في المكان اللي بيتقري منه» في الدرس الجاي). و [[os.environ["X"] = "1"]] بإيدك في اختبار: بيفضل لكل الاختبارات اللي بعده. و [[setenv("PORT", 8000)]] برقم مش string.`
          },
          lines: [
            "pytest.",
            "fixture بيشتغل لكل اختبار لوحده.",
            "بيطلب monkeypatch.",
            "دالة بدل connect...",
            "...بتقع برسالة واضحة.",
            "أي اتصال شبكة في أي اختبار هيقع.",
            "الموديولات اللي بنختبرها.",
            "اختبار متغير البيئة.",
            "APP_DEBUG=1 للاختبار ده بس.",
            "الكود شايفه.",
            "الحالة العكسية.",
            "اتأكد إن المتغير مش موجود حتى لو موجود عندك.",
            "الافتراضي False.",
            "اختبار بيعتمد على الساعة.",
            "الساعة ٩ الصبح دايمًا في الاختبار ده.",
            "النتيجة ثابتة مهما شغّلته امتى."
          ],
          sol: R`بعد التغيير: [[test_debug_from_env]] بيقع بـ [[assert False is True]]. الـ [[DEBUG]] اتحسب مرة واحدة لما pytest عمل import لـ settings (قبل أي اختبار)، والمتغير ساعتها مكانش موجود. [[setenv]] بعد كده غيّر [[os.environ]] بس، والثابت فضل False.

التصليح من غير ما ترجّع الكود: بدّل الثابت نفسه بـ [[monkeypatch.setattr(settings, "DEBUG", True)]].

وده درس تصميم: الكود اللي بيقرا البيئة وقت ما يتنادى (أو من object إعدادات بيتعمل بدالة، زي pydantic-settings مع [[get_settings]] في «تاب Python و FastAPI») أسهل بكتير في الاختبار من ثوابت وقت الـ import.`,
          solCode: R`# app/settings.py (القراية وقت الـ import)
import os

DEBUG = os.environ.get("APP_DEBUG") == "1"

def is_debug() -> bool:
    return DEBUG

# tests/test_settings.py
from app import settings

def test_debug_on(monkeypatch):
    monkeypatch.setattr(settings, "DEBUG", True)
    assert settings.is_debug() is True`
        },
        {
          cmd: "unittest.mock.patch",
          title: "تزيّف API خارجي وتتأكد اتنادى بإيه",
          desc: R`[[unittest.mock]] جاية مع Python. [[Mock]] object بيقبل أي نداء ويسجّله، وتحدد هو يرجّع إيه ([[return_value]]) أو يرمي إيه ([[side_effect]]). و [[patch("module.name")]] بيبدّل اسم بـ Mock جوه with، وبعدها بيرجّعه.

القاعدة الأهم: اعمل patch في المكان اللي الاسم بيتقري منه، مش المكان اللي اتعرّف فيه. لو [[app/report.py]] فيه [[from app.weather import fetch_temp]]، يبقى تعمل patch لـ [[app.report.fetch_temp]].`,
          example: R`from unittest.mock import Mock, patch
import httpx
import pytest
from app.report import daily_report
from app.weather import fetch_temp
def test_report_hot():
    with patch("app.report.fetch_temp", return_value=40) as fake:
        assert daily_report("Aswan") == "Aswan: 40°C حر"
    fake.assert_called_once_with("Aswan")
def test_fetch_temp_parses_json():
    resp = Mock(spec=httpx.Response)
    resp.json.return_value = {"temp": 22.5}
    with patch("app.weather.httpx.get", return_value=resp) as get:
        assert fetch_temp("Cairo") == 22.5
    get.assert_called_once_with("https://api.example.com/weather/Cairo", timeout=5)
def test_timeout_bubbles_up():
    with patch("app.report.fetch_temp", side_effect=httpx.ReadTimeout("slow")):
        with pytest.raises(httpx.ReadTimeout):
            daily_report("Cairo")`,
          try: R`اعمل [[app/weather.py]] فيه [[fetch_temp]] بتنادي [[httpx.get]]، و [[app/report.py]] فيه [[from app.weather import fetch_temp]] و [[daily_report]]. شغّل الاختبارات. وبعدين في [[test_report_hot]] غيّر المسار لـ [["app.weather.fetch_temp"]] وشغّل تاني. إيه اللي حصل وليه؟`,
          flag: "script",
          deep: {
            why: "اختبار بيكلّم API حقيقي: بطيء، وبيقع لما النت يقطع أو الـ API يغيّر بياناته، وممكن يبعت SMS أو يخصم فلوس بجد. والحالات المهمة (timeout، 500، رد غريب) صعب تخلّي الـ API الحقيقي يعملها وقت ما انت عايز. الـ mock بيخليك تتحكم في الرد، وتتأكد إن الكود بتاعك بعت الطلب الصح.",
            how: R`[[from app.weather import fetch_temp]] جوه report.py بيعمل اسم جديد [[fetch_temp]] في الـ namespace بتاع [[app.report]] بيشاور على نفس الدالة. [[patch("app.weather.fetch_temp")]] بيغيّر الاسم في weather بس، و report لسه ماسك الدالة الأصلية. عشان كده بتعمل patch لـ [[app.report.fetch_temp]]: الاسم اللي daily_report بتدوّر عليه فعلًا. ولو report كان كاتب [[import app.weather]] وبينادي [[app.weather.fetch_temp()]]، ساعتها الـ patch يبقى في [[app.weather]]. ونفس الفكرة في [[app.weather.httpx.get]]: الاسم httpx جوه weather.

[[return_value]] القيمة اللي النداء بيرجّعها. [[side_effect]] لو exception بيترمي، ولو لستة بيرجّع عنصر مع كل نداء (مفيد لـ retry: أول مرة timeout وتاني مرة نجاح)، ولو دالة بتتنادى بنفس الباراميترات.

[[Mock(spec=httpx.Response)]] بيسمح بس بالأسماء اللي موجودة فعلًا في Response، فلو كتبت [[resp.jsn()]] غلط هيقع بدل ما يرجّع Mock تاني بهدوء. وفي patch نفس الفكرة بـ [[autospec=True]]: بيتأكد كمان من عدد الباراميترات. وفيه [[patch.object(report, "fetch_temp", ...)]] لو عندك الـ module نفسه.

التأكيدات: [[assert_called_once_with(...)]]، و [[assert_not_called()]]، و [[call_args]] و [[call_count]] لو عايز تبص بنفسك. ولدوال async فيه [[AsyncMock]] (و patch بيستخدمه لوحده لو الدالة الأصلية async).

وفيه plugin اسمه pytest-mock بيدّيك fixture [[mocker]]: [[mocker.patch("app.report.fetch_temp", return_value=40)]] من غير with، وبيترجع لوحده بعد الاختبار.`,
            when: R`حدود النظام بس: HTTP لخدمات تانية، إيميل و SMS، بوابات دفع، الوقت. متعملش mock لكودك الداخلي كله، ولا للقاعدة بتاعتك: اختبر الـ SQL على Postgres حقيقي في Docker. ولـ HTTP كتير فيه كمان مكتبة respx اللي بتزيّف httpx على مستوى الطلبات.`,
            mistakes: R`patch في مكان التعريف بدل مكان الاستخدام: الـ mock مبيتناداش والكود الحقيقي يشتغل (وده أشهر سؤال عن mock في الانترفيو). و [[fake.called_once_with("Aswan")]] من غير assert في الأول: ده مجرد attribute على الـ Mock بيرجّع Mock تاني، فالسطر بيعدّي دايمًا ومش بيختبر حاجة. (Python بيرمي AttributeError لو الاسم بيبدأ بـ assert ومكتوب غلط زي [[assert_called_once_wiht]]، بس مش لو نسيت assert خالص.) واختبارات كلها mocks بتختبر إن الكود بينادي الـ mocks بس، فتعدّي والكود بايظ.`
          },
          lines: [
            "Mock و patch من المكتبة الجاهزة.",
            "httpx (عشان نوع الـ Response والـ exceptions).",
            "pytest.",
            "الدالة اللي بتستخدم fetch_temp.",
            "الدالة اللي بتكلّم الـ API.",
            "اختبار التقرير من غير شبكة.",
            R`بدّل [[fetch_temp]] في المكان اللي report بيقراه منه، وخلّيها ترجّع 40.`,
            "40 أكبر من 35 فلازم يقول حر.",
            "واتنادت مرة واحدة بالمدينة الصح.",
            "اختبار الـ parsing نفسه.",
            "رد وهمي بنفس شكل httpx.Response.",
            "الـ json بتاعه يرجّع ده.",
            "بدّل httpx.get زي ما weather شايفه.",
            "الدالة استخرجت الرقم صح.",
            "والطلب اتبعت على الـ URL الصح وبـ timeout.",
            "اختبار الخطأ.",
            "الـ API بيعمل timeout.",
            "التقرير مش بيبلع الخطأ...",
            "...بيطلّعه للي فوقه."
          ],
          sol: R`بالمسار الصح التلاتة بيعدّوا.

بـ [["app.weather.fetch_temp"]]: [[daily_report]] لسه بتنادي الدالة الأصلية لأن [[app.report]] عنده اسم خاص بيه اتربط وقت الـ import. فالنتيجة واحدة من اتنين: لو عندك fixture منع الشبكة من درس monkeypatch، الاختبار بيقع بـ [[RuntimeError: network call in a test!]]. ومن غيره، بيحاول يكلّم [[api.example.com]] بجد ويقع بـ [[httpx.ConnectError]] أو 404، أو أسوأ: يعدّي لو الـ API الحقيقي رجّع رقم.

القاعدة: شوف الملف اللي فيه الكود اللي بتختبره، والاسم مكتوب فيه إزاي. [[from x import f]] يبقى patch لـ [[yourmodule.f]]. و [[import x]] ثم [[x.f()]] يبقى patch لـ [[x.f]].

و [[patch.object]] مع [[autospec=True]] بيعمل نفس الحاجة وبيتأكد كمان إن النداء بعدد باراميترات صح.`,
          solCode: R`from unittest.mock import patch
from app import report

def test_report_hot():
    with patch.object(report, "fetch_temp", return_value=40, autospec=True) as fake:
        assert report.daily_report("Aswan") == "Aswan: 40°C حر"
    fake.assert_called_once_with("Aswan")`
        },
        {
          cmd: "TestClient و conftest",
          title: "اختبارات FastAPI من غير سيرفر ولا قاعدة حقيقية",
          desc: R`كل اللي فات بيتجمع هنا: fixture في [[conftest.py]] بيبدّل الـ dependency بتاعة التخزين بـ dict فاضي لكل اختبار عن طريق [[app.dependency_overrides]]، ويفتح [[TestClient]] بـ with، ويشيل الـ overrides في التنضيف. والاختبار يطلب [[client]] و [[store]] ويشتغل.

وللاختبارات async: [[httpx.AsyncClient]] مع [[ASGITransport]]. شرح TestClient و dependency_overrides نفسهم في درس [[dependency_overrides]] في «تاب Python و FastAPI». هنا إزاي تنظّمهم كـ fixtures.`,
          example: R`# tests/conftest.py
import pytest
from fastapi.testclient import TestClient
from app.main import app, get_store
@pytest.fixture
def store():
    return {}
@pytest.fixture
def client(store):
    app.dependency_overrides[get_store] = lambda: store
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()
# tests/test_items.py
import httpx
import pytest
from app.main import app
def test_create_then_get(client, store):
    r = client.post("/items", json={"name": "pen", "price": 5})
    assert r.status_code == 201
    assert store == {1: {"name": "pen", "price": 5}}
    assert client.get("/items/1").json() == {"name": "pen", "price": 5}
@pytest.mark.asyncio
async def test_health_async():
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as ac:
        r = await ac.get("/health")
    assert r.json() == {"ok": True}`,
          try: R`اعمل [[app/main.py]] فيه [[get_store()]] بترجّع dict عالمي، و [[POST /items]] و [[GET /items/{item_id}]] بيستخدموها بـ Depends. سطّب [[pytest-asyncio]]. ضيف اختبار إن [[price: "abc"]] بيرجّع 422 والـ store فاضل فاضي، واختبار إن [[GET /items/99]] بيرجّع 404. وبعدين شيل override الـ store وشغّل [[pytest -k create_then_get]] لوحده، وبعدين الملف كله بعد ما تضيف اختبار تاني بيعمل POST قبله.`,
          flag: "script",
          deep: {
            why: "لو كل اختبار بيعمل TestClient ويبدّل الـ dependencies بإيده، هتنسى clear مرة، والـ override يفضل لباقي الاختبارات ويعدّيها غلط. الـ fixtures بتخلي ده مكتوب مرة واحدة وصح. ولو الـ store عالمي من غير override، اختبار بيسيب بيانات للي بعده.",
            how: R`[[store]] fixture بيرجّع dict جديد لكل اختبار. و [[client]] بيطلبه، ويحط [[lambda: store]] مكان [[get_store]]، فكل route بياخد الـ dict ده. والاختبار بيطلب الاتنين، فيقدر يبص جوه [[store]] بعد الـ request ويتأكد الـ route كتب إيه بالظبط، مش بس الرد.

[[with TestClient(app)]] بيشغّل الـ lifespan (startup و shutdown)، والـ yield جوه with يعني الـ client مفتوح طول الاختبار. بعد الاختبار: with بتقفل، وبعدين [[clear()]].

[[TestClient]] متزامن: بيشغّل التطبيق في thread بـ event loop خاص بيه، فالاختبار نفسه [[def]] عادي. لما الاختبار نفسه محتاج [[await]] (يكلّم قاعدة async مثلًا)، استخدم [[httpx.AsyncClient]] بـ [[ASGITransport(app=app)]]: بيكلّم التطبيق مباشرة من غير شبكة، و [[base_url]] أي حاجة. والاختبار async محتاج plugin: [[@pytest.mark.asyncio]] من pytest-asyncio (أو [[asyncio_mode = auto]] في pytest.ini من غير الـ decorator)، أو [[@pytest.mark.anyio]] من anyio اللي جاي مع FastAPI. و ASGITransport مش بيشغّل الـ lifespan.

في نسخ Starlette الحديثة ممكن تشوف تحذير إن TestClient عايز [[httpx2]] بدل httpx. الاختبارات شغالة، والتحذير بيروح لو سطّبته.

والقاعدة الحقيقية: fixture بـ session scope بيعمل الـ pool على Postgres اختبار، وfixture لكل اختبار بيفتح transaction ويعمل rollback في الآخر.`,
            when: "أي مشروع FastAPI، من أول endpoint. الـ fixtures دي بتتنسخ من مشروع للتاني تقريبًا زي ما هي.",
            mistakes: R`fixture الـ client بـ session scope والـ store بـ function: pytest يقولك ScopeMismatch، ولو خلّيت الاتنين session الاختبارات تشوف بيانات بعض. و [[return TestClient(app)]] بدل [[with ... yield]] فالـ lifespan مبيشتغلش والـ clear مالهاش مكان. واختبار async من غير plugin: pytest بيقولك [[async def functions are not natively supported]] ويفشله. واختبار بيتأكد من status_code بس: 201 بيطلع حتى لو اتكتب في الـ store حاجة غلط.`
          },
          lines: [
            "pytest.",
            "client بيكلّم التطبيق من غير سيرفر.",
            "التطبيق والـ dependency اللي هنبدّلها.",
            "fixture...",
            "...للتخزين:",
            "dict جديد فاضي لكل اختبار.",
            "fixture للـ client...",
            "...بيطلب store.",
            "أي route محتاج get_store ياخد الـ dict ده.",
            "افتح الـ client (والـ lifespan يشتغل).",
            "ادّيه للاختبار.",
            "بعد الاختبار: شيل التبديل.",
            "httpx للنسخة async.",
            "pytest.",
            "التطبيق.",
            "الاختبار بيطلب الاتنين بالاسم.",
            "اعمل عنصر.",
            "اتعمل.",
            "واتكتب في الـ store بالظبط كده.",
            "واترجع صح.",
            "اختبار async (pytest-asyncio).",
            "دالة الاختبار async.",
            "transport بيكلّم التطبيق مباشرة.",
            "client async.",
            "await على الطلب.",
            "الرد."
          ],
          sol: R`الاختبارين الجداد بيعدّوا: [[price: "abc"]] بيرجّع 422 و [[detail[0]["loc"] ]] = [[["body", "price"] ]]، والـ store فاضل [[{}]] لأن FastAPI رفض قبل ما الدالة تتنادى. و [[/items/99]] بيرجّع 404.

من غير override الـ store: الاختبارات بتكتب في الـ dict العالمي. لو شغّلت [[test_create_then_get]] لوحده بيعدّي، ومع اختبار تاني بيضيف عنصر قبله، الـ id بيبقى 2 مش 1 و [[store == {1: ...}]] بيقع. نتيجة بتعتمد على الترتيب: رجّع الـ override.

لو الاختبار async قال [[async def functions are not natively supported]]: pytest-asyncio مش متسطّب أو الـ mark ناقص.`,
          solCode: R`# tests/test_items_errors.py
def test_invalid_price_422(client, store):
    r = client.post("/items", json={"name": "pen", "price": "abc"})
    assert r.status_code == 422
    assert r.json()["detail"][0]["loc"] == ["body", "price"]
    assert store == {}

def test_missing_item_404(client):
    assert client.get("/items/99").status_code == 404

# app/main.py (الأجزاء المهمة)
from fastapi import Depends, FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()
_STORE: dict[int, dict] = {}

def get_store() -> dict[int, dict]:
    return _STORE

class Item(BaseModel):
    name: str
    price: int

@app.post("/items", status_code=201)
def create_item(item: Item, store: dict = Depends(get_store)):
    new_id = len(store) + 1
    store[new_id] = item.model_dump()
    return {"id": new_id, **store[new_id]}

@app.get("/items/{item_id}")
def get_item(item_id: int, store: dict = Depends(get_store)):
    if item_id not in store:
        raise HTTPException(404, "item not found")
    return store[item_id]`
        },
        {
          cmd: "pytest --cov",
          title: "أنهي سطور الاختبارات مش بتعدّي عليها",
          desc: R`[[pytest-cov]] بيشغّل الاختبارات ويقيس كل سطر في الكود اتنفذ ولا لأ. [[--cov-report=term-missing]] بيطبع النسبة لكل ملف وأرقام السطور اللي محدش جربها. و [[--cov-fail-under]] بيفشّل التشغيل لو النسبة قلّت عن رقم، فتحطه في CI.

ولو بتستخدم uv: [[uv add --dev pytest pytest-cov]] و [[uv run pytest]] (uv نفسه في درس [[uv و pyproject.toml]] في «تاب Python و FastAPI»).`,
          example: R`pip install pytest-cov
pytest --cov=app --cov-report=term-missing
pytest --cov=app --cov-branch --cov-fail-under=90
pytest --cov=app --cov-report=html
xdg-open htmlcov/index.html
uv add --dev pytest pytest-cov
uv run pytest --cov=app --cov-report=term-missing`,
          try: R`شغّل [[pytest --cov=app --cov-branch --cov-report=term-missing]] على المشروع، وشوف الأرقام في عمود Missing. اكتب اختبارات للسطور دي لحد ما [[--cov-fail-under=100]] تعدّي. وبعدين اسأل نفسك: أنهي اختبار منهم فعلًا بيحمي من bug؟`,
          deep: {
            why: "بتفتكر إن الاختبارات مغطية الكود، وبعدين bug يطلع في فرع else محدش جربه قبل كده. التقرير بيوريك بالأرقام فين المناطق اللي محدش بيختبرها، خصوصًا مسارات الأخطاء.",
            how: R`[[--cov=app]] بيقيس الباكدج app بس، مش الاختبارات ولا المكتبات. الجدول فيه لكل ملف: Stmts (السطور)، و Miss (اللي متنفذتش)، و Cover، و Missing (أرقامها).

[[--cov-branch]] بيقيس الفروع كمان: [[if x:]] من غير else اتجرب لما x صح بس؟ السطر متغطي بس الفرع التاني لأ. بيزوّد عمودين Branch و BrPart، و [[4->6]] في Missing يعني النط من سطر 4 لـ 6 مجاش أبدًا.

[[--cov-fail-under=90]] لو المجموع أقل من 90٪: رسالة [[FAIL Required test coverage of 90% not reached]] والـ exit code مش صفر، فـ CI يبقى أحمر.

[[--cov-report=html]] بيعمل [[htmlcov/]] فيه كل ملف ملوّن: أخضر اتنفذ وأحمر لأ. أسهل بكتير من أرقام السطور. ضيف htmlcov و [[.coverage]] لـ .gitignore.

الإعدادات تتحط في [[pyproject.toml]] تحت [[[tool.coverage.run] ]] ([[branch = true]] و [[source = ["app"] ]]) و [[[tool.coverage.report] ]] ([[fail_under]] و [[show_missing]] و [[exclude_also]] لسطور زي [[if TYPE_CHECKING:]]). و [[# pragma: no cover]] جنب سطر بيستبعده.

pytest-cov بيستخدم مكتبة coverage تحت. من pytest-cov 7 قياس الـ subprocesses محتاج إعداد في coverage نفسها ([[patch = ["subprocess"] ]] تحت [[[tool.coverage.run] ]]) بدل ما كان تلقائي.`,
            when: "في CI على كل PR، بحد أدنى معقول ميقلّش. ومحليًا بـ html لما تكتب اختبارات لجزء جديد وعايز تعرف نسيت إيه.",
            mistakes: R`تطارد ١٠٠٪: تكتب اختبارات بتنادي الكود من غير assert حقيقي عشان الرقم يطلع. التغطية بتقولك السطر اتنفذ، مش إن نتيجته اتفحصت. رقم عالي مش معناه اختبارات كويسة، ورقم واطي معناه أكيد في حاجات مش مختبرة. و [[--cov]] من غير اسم الباكدج فيقيس كل حاجة ويطلع رقم مضلل. وفي الانترفيو: «الـ coverage ٩٥٪ يبقى الكود سليم؟» لأ، ووضّح ليه (branch coverage، وجودة الـ asserts، والحالات الطرفية، وmutation testing كفكرة).`
          },
          lines: [
            "سطّب الـ plugin.",
            "النسبة لكل ملف وأرقام السطور الناقصة.",
            "قيس الفروع كمان، وافشل لو أقل من ٩٠٪.",
            "تقرير HTML ملوّن.",
            "افتحه (على ماك open، وعلى ويندوز start).",
            "نفس الكلام بـ uv: مكتبات dev.",
            "وتشغيلها جوه الـ venv بتاع uv."
          ],
          sol: R`على مشروع الدروس اللي فاتت، الجدول بيطلع حاجة زي: [[app/clock.py 80% Missing 4]] (الـ [[current_hour]] الحقيقية، لأن كل الاختبارات مزيّفاها)، و [[app/main.py 95% Missing 8]] (الـ [[get_store]] الحقيقية، لأن الـ override بيبدّلها دايمًا). ومع [[--cov-branch]] ممكن يظهر فرع [[مساء الخير]] في greeting مش متجرب.

بعد الاختبارات اللي في الحل: [[Required test coverage of 100% reached]].

والإجابة على السؤال: اختبار [[greeting]] بالليل مفيد فعلًا (فرع حقيقي في المنطق). اختبار إن [[get_store()]] بترجّع dict مش بيحمي من حاجة تقريبًا، كتبناه عشان الرقم بس. في مشروع حقيقي الأحسن تستثني السطر ده، أو تغطيه باختبار integration حقيقي من غير override.`,
          solCode: R`# tests/test_cov_gaps.py
from datetime import datetime
from app import clock
from app.main import get_store

def test_current_hour_is_real_hour():
    assert clock.current_hour() == datetime.now().hour

def test_greeting_evening(monkeypatch):
    monkeypatch.setattr(clock, "current_hour", lambda: 20)
    assert clock.greeting() == "مساء الخير"

def test_real_store_is_a_dict():
    assert isinstance(get_store(), dict)`
        }
      ]
    },
    {
      t: "الـ debugging في Python",
      l: 2,
      n: "breakpoint() و أوامر pdb، و post-mortem بعد الـ exception، و debugpy في VS Code و Docker",
      items: [
        {
          cmd: "breakpoint()",
          title: "توقّف البرنامج وتبص جواه",
          desc: R`[[breakpoint()]] في أي سطر بيوقّف البرنامج هناك ويفتح [[pdb]] في الترمنال: تطبع أي متغير، وتمشي سطر سطر، وتدخل جوه الدوال. أسرع من print في كل حتة لأنك بتسأل البرنامج وهو واقف بدل ما تخمّن تطبع إيه وتعيد التشغيل.

الأوامر الأساسية: [[p x]] اطبع، و [[n]] السطر اللي بعده، و [[s]] ادخل جوه الدالة، و [[c]] كمّل، و [[ll]] اعرض الدالة، و [[q]] اخرج.`,
          example: R`def average(nums):
    total = 0
    for i in range(1, len(nums)):
        total += nums[i]
    breakpoint()
    return total / len(nums)
print(average([10, 20, 30]))`,
          try: R`احفظ الكود في [[average.py]] وشغّله بـ [[python average.py]]. المفروض المتوسط 20. لما يقف عند [[(Pdb)]] اكتب [[p total, len(nums)]] و [[ll]]، ولاقي الغلطة. وبعدين شيل الـ breakpoint وحط واحد جوه الـ for، واستخدم [[n]] و [[p i, nums[i] ]] كذا مرة و [[c]].`,
          flag: "script",
          deep: {
            why: "print debugging بيتحول لعشرين print، تشيلهم وتنسى واحد في الكود اللي نزل. والـ debugger بيوريك كل حاجة في اللحظة دي: كل المتغيرات، ومين نادى مين، وتقدر تجرّب تعبير على القيم الحقيقية قبل ما تعدّل الكود.",
            how: R`[[breakpoint()]] (من Python 3.7) بتنادي [[pdb.set_trace()]] بشكل افتراضي. من Python 3.13 البرنامج بيقف عند سطر الـ [[breakpoint()]] نفسه، وبيطبع [[> file.py(5)average()]] و [[-> breakpoint()]] (السهم هو السطر الحالي). في النسخ الأقدم كان بيقف على السطر اللي بعدها ([[-> return ...]]).

الأوامر:

[[p expr]] و [[pp expr]] (منسّق للـ dict الكبيرة). وأي تعبير Python بتكتبه مباشرة بيتنفذ، بس لو اسم المتغير زي أمر (زي [[n]] أو [[c]]) اكتب [[p n]] أو [[!n]].

[[n]] (next) نفّذ السطر وروح اللي بعده من غير ما تدخل الدوال. [[s]] (step) ادخل جوه الدالة اللي في السطر. [[r]] (return) كمّل لحد ما الدالة الحالية ترجع. [[c]] (continue) كمّل لحد breakpoint تاني أو النهاية. [[unt N]] كمّل لحد سطر N (مفيد تخرج من loop).

[[l]] و [[ll]] اعرض الكود (ll الدالة كلها). [[w]] (where) الـ stack: مين نادى مين. [[u]] و [[d]] اطلع وانزل في الـ stack تبص على متغيرات الدالة اللي نادت.

[[b file.py:20]] breakpoint جديد من غير ما تعدّل الكود، و [[b 20, x > 100]] مشروط. [[display expr]] يطبع التعبير كل ما يتغير. [[interact]] يفتح REPL كامل بالمتغيرات. [[q]] يخرج (والبرنامج بيقف).

[[PYTHONBREAKPOINT=0]] بيعطّل كل الـ breakpoint() من غير ما تمسحهم، و [[PYTHONBREAKPOINT=ipdb.set_trace]] يستخدم debugger تاني.

مع pytest: [[breakpoint()]] جوه اختبار شغالة عادي (pytest بيقفل الـ capture لوحده). ومع uvicorn: بتقف في الترمنال اللي شغّال فيه السيرفر والـ request مستني.`,
            when: "لما النتيجة غلط ومش عارف ليه، وعدد القيم اللي محتاج تشوفها أكتر من print أو اتنين. أو عايز تفهم كود مش بتاعك بتتبعه سطر سطر.",
            mistakes: R`تنسى [[breakpoint()]] في الكود وتعمل commit: السيرفر أو الـ CI يقف مستني input للأبد. (ruff بيمسكها بقاعدة T100.) و breakpoint جوه container شغال في الخلفية: مفيش ترمنال تكتب فيه، استخدم debugpy. ومتغير اسمه [[c]] أو [[n]] وتكتب اسمه فـ pdb ينفّذ الأمر بدل ما يطبعه.`
          },
          lines: [
            "دالة المتوسط (فيها غلطة).",
            "المجموع يبدأ صفر.",
            "لف على العناصر...",
            "...وجمّعها.",
            "وقّف هنا وافتح pdb.",
            "رجّع المتوسط.",
            "شغّل على [10, 20, 30]."
          ],
          sol: R`البرنامج بيطبع [[16.666666666666668]] مش 20. عند [[(Pdb)]]، [[p total, len(nums)]] بيطبع [[(50, 3)]]: المجموع 50 مش 60، فالقسمة سليمة والجمع هو الغلط. [[ll]] بيعرض الدالة وسهم [[->]] عند سطر الـ [[breakpoint()]] (في Python 3.13 وأحدث؛ الأقدم كان بيوقف السهم عند الـ return).

وبالـ breakpoint جوه الـ for: أول وقفة [[p i, nums[i] ]] بيطبع [[(1, 20)]]، يعني أول عنصر (10) اتفوّت خالص. الغلطة [[range(1, len(nums))]]، وصحها [[range(len(nums))]]، والأحسن من غير index أصلًا: [[sum(nums)]].

لو كتبت [[n]] عشان تطبع متغير اسمه n، pdb بينفّذ next. اكتب [[p n]].`,
          solCode: R`def average(nums):
    if not nums:
        raise ValueError("empty list")
    return sum(nums) / len(nums)

print(average([10, 20, 30]))  # 20.0`
        },
        {
          cmd: "python -m pdb",
          title: "تفتح الـ debugger مكان الـ exception بعد ما يقع",
          desc: R`post-mortem: البرنامج وقع بـ exception، وعايز تبص على المتغيرات في اللحظة اللي وقع فيها بالظبط من غير ما تعرف تحط breakpoint فين. [[python -m pdb -c continue]] بيشغّل السكربت، ولو وقع بيفتح pdb في السطر اللي رمى الـ exception.

ومع pytest: [[--pdb]] بيفتح pdb عند أول اختبار يفشل، و [[--trace]] بيوقف في أول كل اختبار.`,
          example: R`python -m pdb -c continue seed.py data.csv
pytest -x --pdb
pytest --trace tests/test_pricing.py::test_negative_price_rejected
python -i seed.py data.csv
PYTHONBREAKPOINT=0 python seed.py data.csv`,
          try: R`اعمل [[data.csv]] فيه [[pen,5]] و [[book,12]] و [[cup,ten]]، و [[seed.py]] بيقرا الملف بـ [[csv.reader]] ويحوّل العمود التاني بـ [[int()]]. شغّله عادي وشوف الـ traceback، وبعدين بـ [[python -m pdb -c continue]]، واكتب [[p row]] و [[w]]. وصلّح الـ seed يقول رقم السطر البايظ بدل ما يقع.`,
          deep: {
            why: "الـ traceback بيقولك السطر، بس مش بيقولك القيم: أنهي صف من ١٠ آلاف صف في الـ CSV كان بايظ؟ post-mortem بيوقّفك في اللحظة دي بالظبط، بكل المتغيرات زي ما هي.",
            how: R`[[python -m pdb script.py args]] بيوقف قبل أول سطر. و [[-c continue]] بيدّيله أمر [[c]] أول ما يفتح، فالبرنامج يمشي عادي، ولو حصل exception مش متمسك بيطبعه ويقولك [[Entering post mortem debugging]] ويفتح pdb عند السطر اللي رماه. من هناك [[p]] و [[w]] و [[u]] و [[d]] زي الدرس اللي فات. ([[c]] أو [[s]] بعدها بيعيد تشغيل البرنامج من الأول، و [[q]] يخرج.)

[[python -i script.py]]: بعد ما السكربت يخلص أو يقع، بيفتح Python REPL بكل المتغيرات العالمية. ولو وقع، اكتب [[import pdb; pdb.pm()]] يفتح post-mortem على آخر exception.

[[pytest --pdb]] بيفتح pdb عند أي فشل (assert أو exception) جوه الاختبار نفسه، و [[-x]] معاه عشان يقف عند أول واحد بدل ما يفتح pdb لكل فشل. [[--trace]] بيوقف في أول كل اختبار مختار، كأنك حاطط breakpoint() في أوله.

[[PYTHONBREAKPOINT=0]] بيعطّل الـ breakpoint() اللي في الكود للتشغيل ده، مفيد لو نسيت واحد وعايز تشغّل بسرعة.

وفي كود: [[pdb.post_mortem(exc.__traceback__)]] جوه except بيفتح pdb على exception مسكته. ومن Python 3.14 فيه [[python -m pdb -p PID]] يتصل ببرنامج شغال فعلًا (لسه جديد، اتأكد من نسختك).`,
            when: "سكربت أو job وقع وعايز تعرف ليه في دقيقة. واختبار بيفشل ورسالة الـ assert مش كفاية.",
            mistakes: R`[[--pdb]] في CI أو مع [[-n auto]] (pytest-xdist): مفيش ترمنال تفاعلي، فبيعلّق أو يتجاهل. و [[c]] بعد post-mortem وتستغرب إن البرنامج بدأ من الأول. وتصلّح بإنك تحط try/except بيبلع الخطأ ويكمّل بهدوء: الأحسن تقول الصف البايظ فين وتقرر (تتخطاه وتسجّله، أو توقف).`
          },
          lines: [
            "شغّل، ولو وقع افتح pdb مكان الـ exception.",
            "افتح pdb عند أول اختبار يفشل.",
            "وقّف في أول الاختبار ده وامشي سطر سطر.",
            R`بعد ما يقع افتح REPL، واكتب [[import pdb; pdb.pm()]].`,
            "شغّل من غير ما يقف عند أي breakpoint() في الكود."
          ],
          sol: R`التشغيل العادي بيقع بـ [[ValueError: invalid literal for int() with base 10: 'ten']] وسطر [[int(row[1])]]، من غير ما يقولك أنهي صف.

بـ pdb: بيطبع نفس الـ traceback وبعده [[Uncaught exception. Entering post mortem debugging]] و [[> seed.py(3)parse()]]. [[p row]] بيطبع [[['cup', 'ten'] ]]، و [[w]] بيوريك الـ stack: الـ module (سطر الـ list comprehension) نادى parse. (من Python 3.12 الـ comprehension مبقاش ليه frame لوحده في الـ stack.)

التصليح: [[enumerate(..., start=1)]] عشان رقم السطر، وتمسك [[ValueError]] وترمي رسالة واضحة فيها السطر والقيمة (أو تسجّل الصف وتكمّل لو ده المطلوب). من غير ما تبلع الخطأ بصمت.`,
          solCode: R`import csv
import sys

def parse(row: list[str], line: int) -> dict:
    try:
        return {"name": row[0], "price": int(row[1])}
    except (ValueError, IndexError) as e:
        raise ValueError(f"line {line}: bad row {row!r}") from e

with open(sys.argv[1], newline="", encoding="utf-8") as f:
    rows = [parse(r, n) for n, r in enumerate(csv.reader(f), start=1)]
print(len(rows), "rows")
# ValueError: line 3: bad row ['cup', 'ten']`
        },
        {
          cmd: "debugpy و launch.json",
          title: "breakpoints في VS Code لـ FastAPI والاختبارات و Docker",
          desc: R`[[debugpy]] هو الـ debugger اللي VS Code بيستخدمه لـ Python (من خلال إضافة Python Debugger). بتحط نقطة حمرا جنب السطر (F9)، وتشغّل من Run and Debug (F5)، والبرنامج يقف هناك وتشوف Variables و Call Stack و Watch.

[[.vscode/launch.json]] بيحدد إزاي يشغّل: uvicorn كـ module، أو pytest على الملف المفتوح، أو يتصل (attach) بـ debugpy شغال جوه container.`,
          example: R`{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "FastAPI",
      "type": "debugpy",
      "request": "launch",
      "module": "uvicorn",
      "args": ["app.main:app", "--reload", "--port", "8000"],
      "justMyCode": true
    },
    {
      "name": "pytest: this file",
      "type": "debugpy",
      "request": "launch",
      "module": "pytest",
      "args": ["$__{file}", "-x", "-q"]
    },
    {
      "name": "Attach to Docker",
      "type": "debugpy",
      "request": "attach",
      "connect": { "host": "localhost", "port": 5678 },
      "pathMappings": [{ "localRoot": "$__{workspaceFolder}", "remoteRoot": "/app" }]
    }
  ]
}`,
          try: R`حط الملف في [[.vscode/launch.json]]، واختار الـ interpreter بتاع الـ venv (Ctrl+Shift+P ثم Python: Select Interpreter). حط breakpoint في [[create_item]] وشغّل «FastAPI» بـ F5، وابعت POST من [[/docs]]. الـ request هيفضل مستني: بص على [[item]] في Variables واضغط F10 كذا مرة. وبعدين شغّل «pytest: this file» وانت فاتح ملف اختبار فيه breakpoint.`,
          flag: "script",
          deep: {
            why: "pdb في الترمنال كويس، بس لما تبقى الدوال كتير والـ objects كبيرة، إنك تشوف كل المتغيرات مفتوحة قدامك وتدوس على أي frame في الـ stack أسرع بكتير. والأهم: التطبيق جوه Docker مفيهوش ترمنال تكتب فيه لـ pdb، و debugpy بيخليك تتصل بيه من VS Code.",
            how: R`[[type: "debugpy"]] هو النوع الحالي (الإعدادات القديمة كانت [["python"]] وبقى deprecated). [[request: "launch"]] يعني VS Code هو اللي يشغّل البرنامج، و [[module]] زي [[python -m uvicorn]]. و [[args]] بيتبعتوا بعده. وبيستخدم الـ interpreter اللي اخترته، فلازم يبقى بتاع الـ venv.

[[--reload]] بيشغّل السيرفر في subprocess، و debugpy بيتصل بالـ subprocesses لوحده (الإعداد [[subProcess]] افتراضيًا true)، فالـ breakpoints شغالة حتى بعد reload.

[[justMyCode: true]] (الافتراضي) بيخلي F11 مبيدخلش جوه كود FastAPI و Starlette، وبيوقف بس على breakpoints في كودك. خليه false لو عايز تفهم المكتبة من جوه.

[[$__{file}]] الملف المفتوح دلوقتي، و [[$__{workspaceFolder}]] فولدر المشروع. وتقدر تضيف [["env": {"APP_DEBUG": "1"}]] أو [["envFile": "$__{workspaceFolder}/.env"]]. (وتبويب Testing في VS Code فيه زرار Debug Test جنب كل اختبار من غير launch.json أصلًا.)

Docker: التطبيق جوه container بيشتغل بـ [[python -m debugpy --listen 0.0.0.0:5678 -m uvicorn app.main:app --host 0.0.0.0 --port 8080]]، والبورت [[127.0.0.1:5678:5678]] في compose. [[--wait-for-client]] يخليه ميبدأش لحد ما تتصل (لو محتاج توقف على كود الـ startup). و [[request: "attach"]] بيتصل بيه. [[pathMappings]] بيقول إن [[/app]] جوه الـ container هو فولدر المشروع عندك، وإلا الـ breakpoints مش هتقف لأن المسارات مختلفة.`,
            when: "bug في FastAPI بيعدّي على كذا dependency ودالة. وأي تطبيق جوه Docker أو على سيرفر تاني (عن طريق SSH tunnel). وأول مرة تقرا كود مشروع وعايز تمشي ورا request من أوله لآخره.",
            mistakes: R`[[--listen 0.0.0.0:5678]] والبورت منشور على [[0.0.0.0]] في compose أو على سيرفر: أي حد يوصل للبورت ده يقدر ينفّذ كود على التطبيق. خليه [[127.0.0.1:5678:5678]] وللسيرفر استخدم SSH tunnel، ومتسيبوش في إعدادات الإنتاج أبدًا. و pathMappings غلط أو ناقص: VS Code يقول متصل والـ breakpoints رمادي ومبتقفش. والـ interpreter مش بتاع الـ venv فيطلع [[No module named uvicorn]].`
          },
          lines: [
            "بداية الملف.",
            "نسخة صيغة الملف.",
            "لستة طرق التشغيل (بتظهر في Run and Debug).",
            "الأولى:",
            "اسمها في القايمة.",
            "debugger بتاع Python.",
            "VS Code يشغّل البرنامج بنفسه.",
            "زي python -m uvicorn.",
            "مسار التطبيق وإعادة التشغيل مع الحفظ.",
            "وقّف في كودك بس، مش في المكتبات.",
            "نهايتها.",
            "التانية:",
            "الاسم.",
            "نفس الـ debugger.",
            "تشغيل.",
            "زي python -m pytest.",
            "على الملف المفتوح، ووقف عند أول فشل.",
            "نهايتها.",
            "التالتة:",
            "الاسم.",
            "نفس الـ debugger.",
            "اتصل ببرنامج شغال بالفعل بدل ما تشغّله.",
            "debugpy سامع على البورت ده (منشور من الـ container).",
            "فولدر المشروع عندك = /app جوه الـ container.",
            "نهايتها.",
            "نهاية اللستة.",
            "نهاية الملف."
          ],
          sol: R`لما تبعت POST من [[/docs]]، VS Code بيقف على السطر وبيعلّمه أصفر، وصفحة الـ docs تفضل «Loading» لحد ما تكمّل (F5). في Variables هتلاقي [[item]] من نوع [[Item]] بالقيم اللي بعتها، و [[store]]. و F10 بيمشي سطر سطر، و Call Stack بيوريك كود Starlette و FastAPI اللي نادى الدالة (باهت لأن justMyCode).

مع «pytest: this file» الـ breakpoint جوه الاختبار أو جوه الكود اللي الاختبار بيناديه بيقف بنفس الشكل.

لو الـ breakpoint رمادي ومبيقفش: الـ interpreter مش بتاع الـ venv، أو الملف اللي حاطط فيه النقطة مش هو اللي بيتنفذ. ولـ Docker الغلطة المعتادة pathMappings. وتحذير [[frozen modules]] اللي ممكن يطلع في الترمنال مش مشكلة في الغالب.

الحل تحت: الـ compose اللي بيشغّل التطبيق بـ debugpy للتطوير بس، ويتصل بيه «Attach to Docker».`,
          solCode: R`# compose.debug.yaml (للتطوير بس)
# docker compose -f compose.yaml -f compose.debug.yaml up
services:
  app:
# debugpy لازم يبقى متسطّب في الصورة (requirements-dev.txt مثلًا)
    command: ["python", "-m", "debugpy", "--listen", "0.0.0.0:5678",
              "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080", "--reload"]
    ports:
      - "127.0.0.1:5678:5678"
    volumes:
      - ./:/app`
        }
      ]
    },
    {
      t: "أدوات السكربتات",
      l: 2,
      n: "argparse آمن افتراضيًا، و JSON و CSV و YAML و XML، والتواريخ في أسماء الملفات، و logging، و subprocess، و .env، و HTTP، و re",
      items: [
        {
          cmd: "argparse --dry-run",
          title: "options و --help، والسكربت آمن افتراضيًا",
          desc: R`أول ما السكربت ياخد أكتر من argument أو فيه options، [[sys.argv]] بإيدك بيبقى لخبطة. [[argparse]] في المكتبة الأساسية: بتعرّف الـ arguments، وهو يعمل التحويل للأنواع ورسايل الخطأ و [[--help]].

والقاعدة في أي سكربت بيمسح أو ينقل أو يعدّل: الافتراضي إنه يطبع هيعمل إيه بس (dry run)، والتنفيذ الحقيقي محتاج flag صريح زي [[--apply]]. غلطة في الأمر تبقى سطور على الشاشة مش ملفات ضاعت.

كل خيارات argparse ومعاها typer في درس «argparse و typer» في تاب «Python و FastAPI».`,
          example: R`import argparse
from pathlib import Path
def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    p = argparse.ArgumentParser(
        description="Delete temp files in a folder.",
        epilog="example: %(prog)s ~/Downloads --days 30 --apply",
        allow_abbrev=False,
    )
    p.add_argument("folder", type=Path, help="the folder to clean")
    p.add_argument("--days", type=int, default=30, help="older than N days (default: %(default)s)")
    p.add_argument("--ext", nargs="+", default=[".tmp"], help="extensions to match")
    mode = p.add_mutually_exclusive_group()
    mode.add_argument("--dry-run", action="store_true", help="only print what would happen (default)")
    mode.add_argument("--apply", action="store_true", help="really delete")
    p.add_argument("-v", "--verbose", action="count", default=0)
    return p.parse_args(argv)
args = parse_args()
print(args)
print("APPLY" if args.apply else "DRY RUN", args.folder.expanduser(), args.days, args.ext, args.verbose)`,
          try: R`سمّيه [[cli.py]] وجرّب: [[-h]]، و [[~/Downloads]] لوحده، و [[lab --ext .log .tmp -vv --apply]]، و [[lab --dry-run --apply]]، ومن غير فولدر، و [[lab --app]]. وبعد كل واحدة [[echo $?]]. وبعدين شيل سطر [[allow_abbrev=False]] وجرّب [[lab --app]] تاني.`,
          flag: "script",
          deep: {
            why: R`سكربت بيمسح ومفيش فيه dry run: أول تجربة على فولدر غلط هي آخر تجربة. ومن غير [[--help]] محدش (ولا انت بعد شهر) فاكر السكربت بياخد إيه.`,
            how: R`[[add_argument("folder")]] من غير شرط = positional وإجباري. و [[type=Path]] و [[type=int]] بيحوّلوا، ولو التحويل فشل بيطبع رسالة ويخرج بـ 2.

[[nargs="+"]] واحد أو أكتر في list. و [[action="count"]] بيعد: [[-vv]] بـ 2. و [[%(default)s]] في الـ help بيتبدل بالقيمة الافتراضية، و [[%(prog)s]] باسم السكربت، و [[epilog]] بيظهر في آخر الـ help (حط فيه مثال).

[[add_mutually_exclusive_group()]]: [[--dry-run]] و [[--apply]] مع بعض error. والـ dry run هو الافتراضي لأن الكود بيسأل [[args.apply]] بس، و [[--dry-run]] موجود عشان اللي متعود يكتبه.

[[allow_abbrev=False]]: argparse افتراضيًا بيقبل أي اختصار مش ملخبط، فـ [[--app]] بتتفهم [[--apply]]. في سكربت بيمسح ده مش عايزه.

الشرطة في الاسم بتبقى underscore: [[--dry-run]] تبقى [[args.dry_run]]. و [[parse_args(argv)]] مع [[argv=None]] بيقرا [[sys.argv]]، وفي الاختبار تبعت list.`,
            when: "أي سكربت فيه أكتر من argument، أو بيعمل حاجة مش بترجع.",
            mistakes: R`الافتراضي تنفيذ وفيه [[--dry-run]] اختياري: هتنسى تكتبه مرة. و [[type=bool]] ([[bool("False")]] بـ True، استخدم [[store_true]]). و [[type=Path]] مش بيفك [[~]] لو المستخدم كتبها بين quotes ([["~/Downloads"]] بتوصل زي ما هي)، فاعمل [[expanduser()]] زي آخر سطر.`
          },
          lines: [
            "argparse.",
            "Path.",
            "دالة بترجّع الـ arguments بعد ما تتفحص.",
            "الـ parser:",
            "الوصف بيظهر فوق في --help.",
            "مثال بيظهر تحت في --help.",
            "ممنوع الاختصارات (--app مش هتبقى --apply).",
            "قفلة الـ parser.",
            "positional إجباري، بيتحوّل Path.",
            "رقم بقيمة افتراضية بتظهر في الـ help.",
            "واحد أو أكتر في list.",
            "مجموعة: واحد بس من اللي جواها.",
            "عرض بس (وده الافتراضي أصلًا).",
            "تنفيذ حقيقي.",
            "-v و -vv و -vvv بتتعد.",
            "اقرا sys.argv أو الـ list اللي اتبعتت.",
            "نادي.",
            "اطبع كل حاجة اتقرت.",
            "الوضع والقيم."
          ],
          sol: R`[[-h]] طبع الـ usage، وفيه [[[--dry-run | --apply] ]] بالشكل ده عشان الاتنين في group واحد، وتحته الوصف والـ options و [[--days DAYS  older than N days (default: 30)]] وفي الآخر [[example: cli.py ~/Downloads --days 30 --apply]]، و exit 0.

[[~/Downloads]] لوحده: [[DRY RUN /home/sara/Downloads 30 ['.tmp'] 0]] (الـ home بتاعك).
[[lab --ext .log .tmp -vv --apply]]: [[APPLY lab 30 ['.log', '.tmp'] 2]].
[[--dry-run --apply]]: [[error: argument --apply: not allowed with argument --dry-run]] و exit 2.
من غير فولدر: [[error: the following arguments are required: folder]] و 2.
[[--app]]: [[error: unrecognized arguments: --app]] و 2.

ومن غير [[allow_abbrev=False]]، [[lab --app]] طلع [[APPLY lab 30 ['.tmp'] 0]]: اختصار نص كلمة شغّل وضع المسح.`
        },
        {
          cmd: "json.load و json.dump",
          title: "ملف إعدادات وملف حالة بـ JSON",
          desc: R`سكربتات كتير محتاجة حاجتين: ملف إعدادات بيقراه (الفولدرات، عدد الأيام)، وملف حالة بيفتكر فيه حاجة من المرة اللي فاتت (آخر ID اتعالج، عدد مرات التشغيل، آخر backup).

[[json.loads(text)]] من نص لـ dict و list، و [[json.dumps(obj)]] بالعكس. و [[ensure_ascii=False]] عشان العربي يتكتب عربي، و [[indent=2]] عشان الملف يتقري.

وملف الحالة بيتكتب في ملف مؤقت وبعدين [[os.replace]]، عشان لو السكربت اتقفل في نص الكتابة، الملف القديم يفضل سليم.`,
          example: R`import json
import os
import sys
from pathlib import Path
CONFIG = Path("config.json")
STATE = Path("state.json")
try:
    config = json.loads(CONFIG.read_text(encoding="utf-8"))
except json.JSONDecodeError as e:
    sys.exit(f"error: {CONFIG}: {e.msg} (line {e.lineno}, column {e.colno})")
print(config["folders"], config.get("keep_days", 7), config["owner"])
state = json.loads(STATE.read_text(encoding="utf-8")) if STATE.exists() else {"runs": 0}
state["runs"] += 1
state["last_owner"] = config["owner"]
tmp = STATE.with_suffix(".tmp")
tmp.write_text(json.dumps(state, ensure_ascii=False, indent=2), encoding="utf-8")
os.replace(tmp, STATE)
print(STATE.read_text(encoding="utf-8"))`,
          try: R`اعمل [[config.json]] فيه [[{"folders": ["~/Downloads", "~/Desktop"], "keep_days": 30, "owner": "سارة"}]]. شغّل السكربت مرتين وبص على [[state.json]]. وبعدين حط فاصلة زيادة بعد [[30]] وشغّله. وفي الآخر جرّب في Python [[json.dumps({"o": "سارة"})]] من غير [[ensure_ascii=False]]، و [[json.loads(json.dumps({1: "a"}))]].`,
          flag: "script",
          deep: {
            why: R`سكربت بيعالج طلبات جديدة كل ساعة لازم يعرف وقف فين المرة اللي فاتت، وإلا هيعالج نفس الحاجات تاني. ولو ملف الحالة اتكتب نصه وبعدين الكهربا قطعت أو حد عمل Ctrl+C، التشغيل الجاي هيقع بـ [[JSONDecodeError]] ومحدش فاكر كان واقف فين.`,
            how: R`[[read_text]] ثم [[json.loads]] هي نفسها [[json.load(f)]] على ملف مفتوح، اختار اللي يريحك.

[[e.msg]] و [[e.lineno]] و [[e.colno]] في [[JSONDecodeError]] بيقولوا الغلط فين بالظبط، فالرسالة تبقى مفيدة بدل traceback.

[[config.get("keep_days", 7)]] قيمة افتراضية لو المفتاح مش موجود، و [[config["owner"] ]] لو لازم يبقى موجود (يقع بـ KeyError لو ناقص، وده مقصود).

الكتابة الآمنة: [[os.replace(tmp, STATE)]] بيستبدل الملف في خطوة واحدة (atomic) طالما الاتنين على نفس الـ disk، وبيشتغل على ويندوز كمان حتى لو STATE موجود (عكس [[os.rename]] على ويندوز). فأي حد بيقرا الملف بيلاقي يا القديم كامل يا الجديد كامل.

JSON مفيهوش تعليقات ولا فاصلة بعد آخر عنصر، فلو الملف هيعدّله بني آدم، TOML أنسب للإعدادات: [[tomllib.loads()]] في المكتبة الأساسية من Python 3.11 (قراية بس). أو YAML (الدرس الجاي).`,
            when: "إعدادات بسيطة، وحالة السكربت بين مرة والتانية، وأي بيانات رايحة أو جاية من API.",
            mistakes: R`[[STATE.write_text(...)]] على الملف نفسه مباشرة. ومفاتيح أرقام: JSON بيحوّلها نصوص، فـ [[state[1] ]] بقت [[state["1"] ]] بعد أول حفظ. و [[datetime]] في الـ dict: [[TypeError: Object of type datetime is not JSON serializable]]، خزّنه [[isoformat()]]. وسكربتين شغالين في نفس الوقت بيكتبوا نفس ملف الحالة (درس cron فيه [[flock]] للحالة دي).`
          },
          lines: [
            "json.",
            "os.replace.",
            "sys.exit.",
            "Path.",
            "ملف الإعدادات (بيعدّله بني آدم).",
            "ملف الحالة (بيكتبه السكربت).",
            "حاول...",
            "...تقرا الإعدادات.",
            "لو الـ JSON بايظ:",
            "رسالة بمكان الغلط بالظبط.",
            "مفتاح إجباري، ومفتاح بقيمة افتراضية.",
            "الحالة القديمة، أو حالة جديدة أول مرة.",
            "عدّل.",
            "عدّل.",
            "ملف مؤقت جنبه.",
            "اكتب فيه كله.",
            "استبدل القديم بالجديد في خطوة واحدة.",
            "اطبع النتيجة."
          ],
          sol: R`أول مرة: [[['~/Downloads', '~/Desktop'] 30 سارة]] وبعدين state.json فيه [["runs": 1]] و [["last_owner": "سارة"]] بالعربي. تاني مرة [["runs": 2]].

بالفاصلة الزيادة: [[error: config.json: Expecting property name enclosed in double quotes (line 3, column 19)]] و exit 1 (عندي الملف كان متقسم على سطور، فالسطر والعمود بيشاوروا على الفاصلة التانية).

[[json.dumps({"o": "سارة"})]] من غير ensure_ascii طلع [[{"o": "سارة"}]]: صح و JSON سليم، بس مش مقروء في الملف.

و [[json.loads(json.dumps({1: "a"}))]] رجّع [[{'1': 'a'}]]: المفتاح بقى نص. لاحظ إن [["~/Downloads"]] فضلت زي ما هي، فاعمل [[Path(f).expanduser()]] قبل ما تستخدمها.`
        },
        {
          cmd: "csv و utf-8-sig",
          title: "CSV يتفتح في Excel والعربي سليم",
          desc: R`[[csv.DictWriter]] بيكتب list of dicts كـ CSV، و [[csv.DictReader]] بيقرا كل صف dict بأسماء الأعمدة. وافتح دايمًا بـ [[newline=""]] (الموديول هو اللي بيظبط نهايات السطور).

مشكلة Excel على ويندوز: لو الملف utf-8 عادي، بيعرض العربي حروف غريبة. الحل [[encoding="utf-8-sig"]] وانت بتكتب: بيحط 3 bytes في أول الملف (BOM) Excel بيعرف منهم إنه utf-8. وبرضه [[utf-8-sig]] وانت بتقرا أي CSV جاي من Excel.

وExcel في إعدادات أوروبية بيصدّر بـ [[;]] بدل [[,]] وبفاصلة عشرية [[150,5]]. [[csv.Sniffer]] بيعرف الفاصل لوحده. أساسيات csv و json في درس «csv و json» في تاب «Python و FastAPI».`,
          example: R`import csv
rows = [
    {"name": "سارة", "city": "القاهرة", "total": 150.5},
    {"name": "Ali, Jr.", "city": "Alex", "total": 80},
]
with open("report.csv", "w", newline="", encoding="utf-8-sig") as f:
    w = csv.DictWriter(f, fieldnames=["name", "city", "total"])
    w.writeheader()
    w.writerows(rows)
with open("report.csv", newline="", encoding="utf-8") as f:
    print(list(next(csv.DictReader(f))))
with open("report.csv", newline="", encoding="utf-8-sig") as f:
    for row in csv.DictReader(f):
        print(row["name"], float(row["total"]))
with open("excel_export.csv", newline="", encoding="utf-8-sig") as f:
    dialect = csv.Sniffer().sniff(f.read(2048), delimiters=",;\t")
    f.seek(0)
    for row in csv.DictReader(f, dialect=dialect):
        print(dialect.delimiter, row["name"], float(row["total"].replace(",", ".")))`,
          try: R`اعمل ملف زي اللي Excel بيصدّره: [[printf '\xef\xbb\xbfname;city;total\r\nسارة;القاهرة;150,5\r\nOmar;Alex;80\r\n' > excel_export.csv]] وشغّل السكربت. وبعدين [[xxd report.csv | head -2]] وشوف أول 3 bytes. ولو عندك Excel أو LibreOffice، افتح report.csv، وبعدين اكتبه بـ [[utf-8]] بدل [[utf-8-sig]] وافتحه تاني.`,
          flag: "script",
          deep: {
            why: "أغلب الناس اللي هيستلموا تقرير السكربت هيفتحوه في Excel. لو العربي طلع رموز أو كل الأعمدة في عمود واحد، التقرير ملوش لازمة مهما كانت الأرقام صح.",
            how: R`الـ BOM هو الحرف [[U+FEFF]] ومكتوب utf-8 كـ [[EF BB BF]]. Excel على ويندوز بيشوفه فيقرا الملف utf-8، ومن غيره بيقرا بـ encoding ويندوز فيطلع العربي [[Ø³Ø§Ø±Ø©]] وما شابه. باقي البرامج (Python و LibreOffice و Google Sheets) بتفهم الاتنين.

لما تقرا ملف فيه BOM بـ [[utf-8]] بس، أول عمود اسمه بيبقى [['﻿name']]، و [[row["name"] ]] يطلع KeyError وانت شايف الاسم صح بعينك. [[utf-8-sig]] في القراية بيشيل الـ BOM لو موجود ومش بيعمل حاجة لو مش موجود، فاستخدمه دايمًا للقراية.

[[newline=""]]: الـ csv بيكتب [[\r\n]] في آخر كل صف (ده المعيار)، ومن غير [[newline=""]] على ويندوز بيبقى [[\r\r\n]] فيظهر سطر فاضي بين كل صفين.

الاسم اللي فيه فاصلة [["Ali, Jr."]] بيتكتب بين علامات تنصيص لوحده. ده سبب إنك متقسمش CSV بـ [[split(",")]].

[[Sniffer().sniff(sample, delimiters=",;\t")]] بيخمّن الفاصل من أول جزء، و [[f.seek(0)]] يرجّع لأول الملف. كل القيم بتيجي نصوص، فـ [[float()]]، و [[replace(",", ".")]] للفاصلة العشرية الأوروبية.`,
            when: "أي تقرير رايح لبني آدم. ولو محتاج تنسيق وألوان وأكتر من شيت، مكتبة [[openpyxl]] بتكتب xlsx بجد.",
            mistakes: R`[[encoding="utf-8"]] للتقرير فالعربي يبوظ في Excel. وتقرا ملف Excel بـ [[utf-8]] فيطلع KeyError على أول عمود. وتنسى [[newline=""]]. و [[DictWriter]] بيرمي [[ValueError: dict contains fields not in fieldnames]] لو صف فيه مفتاح زيادة، و [[extrasaction="ignore"]] بيتجاهله.`
          },
          lines: [
            "csv.",
            "الصفوف:",
            "dict لكل صف.",
            "اسم فيه فاصلة.",
            "قفلة الـ list.",
            "اكتب بـ BOM عشان Excel.",
            "writer بأسماء الأعمدة بالترتيب.",
            "سطر العناوين.",
            "كل الصفوف.",
            "اقراه بـ utf-8 بس...",
            "...واطبع أسماء الأعمدة.",
            "اقراه صح بـ utf-8-sig.",
            "كل صف dict.",
            "القيم نصوص، فحوّل الرقم.",
            "ملف جاي من Excel أوروبي.",
            "خمّن الفاصل من أول 2KB.",
            "ارجع لأول الملف.",
            "اقرا بالفاصل اللي اتعرف.",
            "الفاصل والاسم والرقم بعد ما الفاصلة العشرية بقت نقطة."
          ],
          sol: R`الناتج:

[[['﻿name', 'city', 'total'] ]]: ده اللي بيحصل لو قريت بـ utf-8 بس.
[[سارة 150.5]] و [[Ali, Jr. 80.0]]: بـ utf-8-sig كله تمام.
[[; سارة 150.5]] و [[; Omar 80.0]]: الـ Sniffer عرف إن الفاصل [[;]].

و [[xxd]] بيبدأ بـ [[efbb bf6e 616d 65]] يعني BOM وبعده [[name]]. وآخر الصفوف [[0d0a]] يعني [[\r\n]].

الملف بـ BOM بيتفتح في Excel على ويندوز والعربي سليم والأعمدة متقسمة. من غير BOM، Excel بيقراه بـ encoding ويندوز فالعربي يطلع رموز. (ده سلوك Excel المعروف، وأنا جربت هنا الـ bytes والقراية بـ Python بس.)`
        },
        {
          cmd: "yaml.safe_load و ElementTree",
          title: "ملفات YAML و XML",
          desc: R`YAML شائع في ملفات الإعدادات (Docker Compose و GitHub Actions و Kubernetes) لأنه مقروء وفيه تعليقات. في Python محتاج [[pip install pyyaml]]، وبتقرا بـ [[yaml.safe_load]] دايمًا، مش [[yaml.load]].

XML لسه موجود في sitemaps و RSS وملفات Office وأنظمة قديمة. [[xml.etree.ElementTree]] في المكتبة الأساسية: [[ET.parse]] يقرا، و [[findall]] و [[findtext]] يدوّروا. ولو الملف فيه namespace ([[xmlns=...]]) لازم تديله الـ namespace وانت بتدوّر، وإلا مش هيلاقي حاجة.`,
          example: R`import xml.etree.ElementTree as ET
from pathlib import Path
import yaml
cfg = yaml.safe_load(Path("sites.yaml").read_text(encoding="utf-8"))
for site in cfg["sites"]:
    print(site["name"], site["url"], site.get("timeout", cfg["defaults"]["timeout"]))
print(cfg["country"], cfg["version"])
Path("out.yaml").write_text(yaml.safe_dump(cfg, allow_unicode=True, sort_keys=False), encoding="utf-8")
NS = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
root = ET.parse("sitemap.xml").getroot()
print(root.tag)
for url in root.findall("sm:url", NS):
    print(url.findtext("sm:loc", namespaces=NS), url.findtext("sm:lastmod", default="-", namespaces=NS))
print(len(root.findall("url")))`,
          try: R`اعمل الملفين بالأوامر اللي في أول الحل (فيهم [[country: NO]] و [[version: 1.10]] قصد)، وسطّب [[pyyaml]] في venv، وشغّل السكربت. وبعدين جرّب [[yaml.safe_load("on: yes\nzip: 012\n")]] وصلّح [[country]] و [[version]] في الملف عشان يطلعوا نصوص.`,
          flag: "script",
          deep: {
            why: R`إعدادات السكربت لما بتكبر (مواقع، جداول، مستخدمين) بتبقى أسهل في YAML. و XML بيقابلك لما تسحب sitemap موقع عشان تشيّك على روابطه، أو تقرا export من نظام قديم.`,
            how: R`[[safe_load]] بيطلّع dict و list و str و int و float و bool و None بس. [[yaml.load]] من غير Loader بقى error في PyYAML 6، والـ Loader الكامل ممكن ينفّذ كود Python من الملف ([[!!python/object/apply:os.system]])، فممنوع على أي ملف مش انت كاتبه.

مفاجآت YAML (PyYAML بيتبع YAML 1.1): [[NO]] و [[no]] و [[off]] بقوا [[False]] (كود النرويج اتقرا False). [[on: yes]] بقى [[{True: True}]]، حتى المفتاح. [[1.10]] بقى رقم [[1.1]]. و [[012]] بقى [[10]] (octal). الحل: أي نص ممكن يتلخبط حطه بين علامات تنصيص [["NO"]] و [["1.10"]].

[[safe_dump(..., allow_unicode=True, sort_keys=False)]]: العربي يفضل عربي والترتيب زي ما هو. بس التعليقات بتضيع، ولو محتاج تعدّل ملف YAML وتحافظ على تعليقاته استخدم [[ruamel.yaml]].

XML: الـ namespace بيبقى جزء من اسم الـ tag: [[{http://www.sitemaps.org/schemas/sitemap/0.9}urlset]]. فإما تكتب الاسم كامل، أو تعمل dict [[NS]] وتستخدم [[sm:url]]. و [[findtext]] بيرجّع النص أو [[default]] لو مش موجود. وللملفات الضخمة [[ET.iterparse]] بيقرا جزء جزء.

وXML جاي من برّه (رفعه مستخدم، أو من API مش بتاعك): استخدم [[defusedxml]]، لأن ElementTree نفسه مكتوب في التوثيق إنه مش آمن ضد ملفات معمولة مخصوص.`,
            when: "YAML لإعدادات فيها مستويات وقوائم وبيعدّلها ناس. XML لما المصدر نفسه XML.",
            mistakes: R`[[yaml.load]] على ملف من برّه. وقيم زي [[NO]] و [[on]] و [[1.10]] وأرقام تليفونات تبدأ بصفر من غير quotes. وتدوّر بـ [[findall("url")]] في ملف فيه namespace فيرجع list فاضية من غير أي error.`
          },
          lines: [
            "XML في المكتبة الأساسية.",
            "Path.",
            "pip install pyyaml.",
            "اقرا YAML لـ dict بأمان.",
            "لف على القائمة:",
            "قيمة الموقع أو الافتراضية من الملف.",
            "قيم شكلها نص وطلعت حاجة تانية.",
            "اكتب YAML تاني، والعربي عربي والترتيب زي ما هو.",
            "الـ namespace اللي في الـ sitemap.",
            "اقرا الملف وخد العنصر الرئيسي.",
            "اسم الـ tag كامل بالـ namespace.",
            "كل url، بالـ namespace.",
            "الرابط، وتاريخ التعديل أو - لو مش موجود.",
            "من غير namespace: ولا واحد."
          ],
          sol: R`الناتج:

[[الموقع الرئيسي https://example.com 5]]
[[api https://api.example.com/health 10]]
[[False 1.1]]: الـ [[NO]] بقت False والـ [[1.10]] بقت 1.1.
[[{http://www.sitemaps.org/schemas/sitemap/0.9}urlset]]
[[https://example.com/ 2026-09-30]] و [[https://example.com/about 2026-08-01]] و [[https://example.com/blog/python -]]
[[0]]: من غير namespace مالقاش ولا url.

و [[yaml.safe_load("on: yes\nzip: 012\n")]] رجّع [[{True: True, 'zip': 10}]]. ومع [[country: "NO"]] و [[version: "1.10"]] رجعوا [['NO']] و [['1.10']]. و [[yaml.load("a: 1")]] من غير Loader: [[TypeError: load() missing 1 required positional argument: 'Loader']].`,
          solCode: R`cat > sites.yaml <<'EOF'
# sites to check
defaults:
  timeout: 5
sites:
  - name: الموقع الرئيسي
    url: https://example.com
  - name: api
    url: https://api.example.com/health
    timeout: 10
country: NO
version: 1.10
EOF
cat > sitemap.xml <<'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://example.com/</loc><lastmod>2026-09-30</lastmod></url>
  <url><loc>https://example.com/about</loc><lastmod>2026-08-01</lastmod></url>
  <url><loc>https://example.com/blog/python</loc></url>
</urlset>
EOF`
        },
        {
          cmd: "datetime وأسماء الملفات",
          title: "التاريخ في أسماء الملفات، وعمر الملف بالأيام",
          desc: R`سكربتات الأتمتة بتستخدم التاريخ في حاجتين: أسماء ملفات ([[backup_2026-10-01_161416.zip]]) عشان ميدوسوش على بعض ويترتبوا لوحدهم، وحسابات ([[الملف ده عمره كام يوم؟]]، [[امسح اللي أقدم من 30 يوم]]).

[[strftime]] من تاريخ لنص بالشكل اللي انت عايزه، و [[strptime]] من نص لتاريخ، و [[timedelta]] فرق بين تاريخين، و [[datetime.fromtimestamp(p.stat().st_mtime)]] وقت آخر تعديل في ملف. المناطق الزمنية و zoneinfo في درس «datetime و zoneinfo» في تاب «Python و FastAPI».`,
          example: R`from datetime import datetime, timedelta
from pathlib import Path
now = datetime.now()
print(now.strftime("%Y-%m-%d_%H%M%S"))
print(f"backup_{now:%Y%m%d}.zip")
for p in sorted(Path(".").glob("*.csv")):
    mtime = datetime.fromtimestamp(p.stat().st_mtime)
    age = now - mtime
    print(p.name, mtime.isoformat(" ", timespec="seconds"), f"{age.days} days old")
cutoff = now - timedelta(days=30)
print("cutoff:", cutoff.date())
names = ["log_2026-09-30.txt", "log_2026-10-01.txt", "log_2026-01-15.txt"]
print(sorted(names))
day = datetime.strptime("log_2026-09-30.txt", "log_%Y-%m-%d.txt").date()
print(day, day.strftime("%A"), (now.date() - day).days)
print(sorted(["5-10-2026", "30-9-2026", "1-1-2027"]))`,
          try: R`اعمل ملف قديم بـ [[touch -d "45 days ago" old_report.csv]] وشغّل السكربت. وبعدين اكتب دالة [[latest_backup(folder)]] بترجّع أحدث [[backup_*.zip]] من الاسم نفسه (مش من وقت التعديل)، وجرّبها على [[backup_2026-09-29.zip]] و [[backup_2026-10-01.zip]] و [[backup_2026-09-30.zip]].`,
          flag: "script",
          deep: {
            why: R`backup باسم ثابت بيدوس على اللي قبله. واسم زي [[30-9-2026]] مبيترتبش صح. و «أقدم من 30 يوم» محتاجة تاريخ الملف مش تاريخ النهارده بس.`,
            how: R`الشكل [[%Y-%m-%d]] (ISO) هو الوحيد اللي ترتيب الأسماء فيه هو ترتيب التواريخ، عشان السنة الأول والأرقام بأصفار ([[09]] مش [[9]]). فـ [[sorted(names)]] و [[ls]] بيرتّبوه صح من غير أي parsing.

[[%H%M%S]] من غير [[:]] لأن ويندوز مبيقبلش [[:]] في اسم الملف.

[[st_mtime]] ثواني من 1970 (Unix timestamp)، و [[fromtimestamp]] بيحوّلها لتوقيت جهازك. و [[now - mtime]] بيطلّع [[timedelta]]، و [[.days]] الأيام الكاملة (بيقرّب لتحت)، و [[total_seconds()]] للدقة. على لينكس [[st_ctime]] مش وقت الإنشاء (ده وقت تغيير الصلاحيات أو الاسم).

[[strptime]] لازم الشكل يطابق بالظبط وإلا [[ValueError]]، فاعمله في try لو الأسماء ممكن تبقى مختلفة. و [[%A]] اسم اليوم بلغة الجهاز.

[[datetime.now()]] بتوقيت الجهاز ومن غير timezone. على سيرفر (غالبًا UTC) وجهازك (القاهرة) نفس السكربت هيطلّع أسماء مختلفة، فلو ده مهم استخدم [[datetime.now(timezone.utc)]] في كل حتة.`,
            when: "أي ملف السكربت بيعمله أكتر من مرة (backup، تقرير، log)، وأي تنضيف بالعمر.",
            mistakes: R`[[%m]] (شهر) و [[%M]] (دقيقة) و [[%d]] و [[%D]]. و [[datetime.now().strftime("%Y-%m-%d %H:%M")]] في اسم ملف على ويندوز. وتقارن datetime فيه timezone بواحد من غير: [[TypeError: can't compare offset-naive and offset-aware datetimes]]. وأسماء بتنسيق [[d-m-Y]] فالترتيب يبوظ.`
          },
          lines: [
            "datetime و timedelta.",
            "Path.",
            "الوقت دلوقتي.",
            "شكل مناسب لاسم ملف، من غير :.",
            "نفس الفكرة جوه f-string.",
            "لكل ملف csv:",
            "وقت آخر تعديل كتاريخ.",
            "عمره.",
            "الاسم، والوقت مقروء، والعمر بالأيام.",
            "تاريخ من 30 يوم.",
            "اليوم بس من غير وقت.",
            "أسماء بتاريخ ISO.",
            "ترتيب النصوص = ترتيب التواريخ.",
            "طلّع التاريخ من الاسم.",
            "التاريخ، واسم اليوم، وكام يوم فات.",
            "ترتيب d-m-Y بايظ."
          ],
          sol: R`النهارده 1 أكتوبر 2026، فطلع:

[[2026-10-01_161416]] و [[backup_20261001.zip]]
[[old_report.csv 2026-08-17 16:14:16 45 days old]]
[[cutoff: 2026-09-01]]
[[['log_2026-01-15.txt', 'log_2026-09-30.txt', 'log_2026-10-01.txt'] ]]: مترتبين صح.
[[2026-09-30 Wednesday 1]]
[[['1-1-2027', '30-9-2026', '5-10-2026'] ]]: سنة 2027 جت الأول. ده سبب ISO.

[[latest_backup]] (تحت) رجّعت [[backup_2026-10-01.zip]]. من الاسم أضمن من [[st_mtime]]، لأن النسخ أو الـ download بيغيّر وقت التعديل. وملف اسمه مش ماشي على الشكل بيتجاهل بدل ما يوقّع السكربت.`,
          solCode: R`from datetime import datetime
from pathlib import Path
def latest_backup(folder: Path) -> Path | None:
    dated = []
    for p in folder.glob("backup_*.zip"):
        try:
            dated.append((datetime.strptime(p.name, "backup_%Y-%m-%d.zip"), p))
        except ValueError:
            continue
    return max(dated)[1] if dated else None
print(latest_backup(Path("backups")))`
        },
        {
          cmd: "logging بدل print",
          title: "سجل للسكربت: على الشاشة وفي ملف",
          desc: R`[[print]] للنتيجة اللي السكربت معمول عشانها. أي حاجة تانية (بدأ إمتى، عمل إيه، تحذير، error) تروح [[logging]]: كل سطر بوقته ومستواه، يتطبع على stderr، ويتكتب في ملف كمان، وتقدر تخفّي التفاصيل أو تظهرها بـ [[-v]] من غير ما تمسح سطر.

المستويات بالترتيب: [[DEBUG]] و [[INFO]] و [[WARNING]] و [[ERROR]] و [[CRITICAL]]. اللي تحت المستوى المختار مش بيظهر.`,
          example: R`import logging
import sys
log = logging.getLogger("cleaner")
def setup_logging(verbose: bool, logfile: str = "cleaner.log") -> None:
    logging.basicConfig(
        level=logging.DEBUG if verbose else logging.INFO,
        format="%(asctime)s %(levelname)-7s %(name)s: %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
        handlers=[logging.StreamHandler(), logging.FileHandler(logfile, encoding="utf-8")],
    )
setup_logging(verbose="-v" in sys.argv)
log.debug("scanning %s", "/tmp/lab")
log.info("deleted %d files, freed %.1f MB", 12, 48.31)
log.warning("skipped %s: permission denied", "secret.txt")
try:
    total = 10 / 0
except ZeroDivisionError:
    log.exception("failed to compute the ratio")
print("done")`,
          try: R`شغّله بـ [[python3 logs.py 2>/dev/null]] وشوف إيه اللي فضل. وبعدين [[python3 logs.py -v 2>&1 >/dev/null]]. وبعدين [[wc -l cleaner.log]] و [[head -3 cleaner.log]]. شغّله كمان مرة وشوف الملف كبر ولا اتمسح.`,
          flag: "script",
          deep: {
            why: R`سكربت متجدول بيشتغل الساعة 2 بالليل وانت نايم. لما يفشل، مفيش غير الـ log تعرف منه حصل إيه وإمتى. و print من غير وقت ولا مستوى، ومتلخبط مع النتيجة، ولازم تمسحه قبل ما تسلّم.`,
            how: R`[[logging.getLogger("cleaner")]] logger باسم بيظهر في كل سطر (في مشروع فيه موديولات [[getLogger(__name__)]]).

[[basicConfig]] بيظبط الـ root logger مرة واحدة: المستوى، وشكل السطر ([[%(asctime)s]] الوقت، و [[%(levelname)-7s]] المستوى بعرض 7، و [[%(message)s]] الرسالة)، والـ handlers: [[StreamHandler()]] بيكتب على stderr افتراضيًا، و [[FileHandler]] في ملف بيضيف عليه ([["a"]]) مش بيمسحه.

[[log.info("deleted %d files", 12)]] بالـ %-formatting مش f-string: الرسالة مش بتتبني أصلًا لو المستوى مقفول، والأدوات اللي بتجمّع logs بتعرف تجمّع الرسايل المتشابهة.

[[log.exception()]] جوه except بيكتب ERROR ومعاه الـ traceback كامل. ده أهم سطر في أي سكربت متجدول.

ملف log بيكبر للأبد، فـ [[logging.handlers.RotatingFileHandler(path, maxBytes=5_000_000, backupCount=3)]] بيقسمه. أو في cron سيب الـ log على stderr واعمل redirect لملف ([[>> log 2>&1]]) وخلّي logrotate يقسمه.`,
            when: "أي سكربت بيتجدول أو بيشتغل أكتر من دقيقة. و print للنتيجة اللي حد هيقراها أو هيعملها pipe.",
            mistakes: R`[[basicConfig]] بيشتغل أول مرة بس: لو أي import عمل logging قبله، الإعداد بتاعك بيتجاهل (فيه [[force=True]]). و [[log.error(e)]] بدل [[log.exception]] فالـ traceback يضيع. و f-string فيها بيانات كبيرة في [[log.debug]] بتتبني حتى والـ debug مقفول. وباسوردات أو tokens في الـ log.`
          },
          lines: [
            "logging.",
            "sys.",
            "logger باسم السكربت.",
            "الإعداد في مكان واحد:",
            "الإعداد الأساسي:",
            "DEBUG لو -v، وإلا INFO.",
            "شكل كل سطر.",
            "شكل الوقت.",
            "اكتب على stderr وفي ملف.",
            "قفلة.",
            "-v موجودة؟",
            "تفاصيل، بتظهر مع -v بس.",
            "معلومة عادية.",
            "تحذير.",
            "حاول...",
            "...حاجة هتقع.",
            "مسكتها:",
            "ERROR ومعاه الـ traceback كامل.",
            "النتيجة على stdout."
          ],
          sol: R`[[2>/dev/null]]: الشاشة عليها [[done]] بس. كل الـ logging راح stderr واتشال.

[[-v 2>&1 >/dev/null]] (stderr بس، و stdout اتشال):

[[2026-10-01 16:14:22 DEBUG   cleaner: scanning /tmp/lab]]
[[2026-10-01 16:14:22 INFO    cleaner: deleted 12 files, freed 48.3 MB]]
[[2026-10-01 16:14:22 WARNING cleaner: skipped secret.txt: permission denied]]
[[2026-10-01 16:14:22 ERROR   cleaner: failed to compute the ratio]]
[[Traceback (most recent call last):]] لحد [[ZeroDivisionError: division by zero]]

والملف بعد المرتين كان 17 سطر: المرة الأولى من غير DEBUG، والتانية بيه، والاتنين فيهم الـ traceback. يعني الملف بيكبر مع كل تشغيل ومش بيتمسح.`
        },
        {
          cmd: "subprocess.run في سكربت",
          title: "سكربت بيشغّل أوامر: git pull لكل المشاريع",
          desc: R`ساعات الأداة الصح موجودة بالفعل كأمر: [[git]] و [[pg_dump]] و [[ffmpeg]] و [[rsync]]. السكربت بيلف ويشغّلها بـ [[subprocess.run]] ويقرا النتيجة.

القواعد: الأمر list ([[["git", "-C", path, "pull"] ]]) مش string، ومن غير [[shell=True]]. و [[capture_output=True, text=True]] عشان تقرا الناتج. و [[timeout]] عشان أمر معلّق ميعلّقش السكربت كله. وتفحص [[returncode]].

التفاصيل والأمان (command injection) في درس «subprocess» في تاب «Python و FastAPI». هنا سكربت حقيقي بيعمل pull لكل المشاريع في فولدر.`,
          example: R`import shutil
import subprocess
import sys
from pathlib import Path
root = Path(sys.argv[1] if len(sys.argv) > 1 else "~/code").expanduser()
if shutil.which("git") is None:
    sys.exit("error: git is not installed")
failed = []
for repo in sorted(p.parent for p in root.glob("*/.git")):
    r = subprocess.run(
        ["git", "-C", str(repo), "pull", "--ff-only"],
        capture_output=True, text=True, timeout=120,
    )
    out = (r.stdout if r.returncode == 0 else r.stderr).strip().splitlines()
    print(f"{repo.name:<10}{'ok' if r.returncode == 0 else 'FAILED':<8}{out[-1] if out else ''}")
    if r.returncode != 0:
        failed.append(repo.name)
if failed:
    sys.exit(f"failed: {', '.join(failed)}")`,
          try: R`جهّز repos تجربة بالأوامر اللي في الحل وشغّله مرتين. وبعدين عدّله: قبل الـ pull يشغّل [[git status --porcelain]]، ولو فيه تغييرات مش متعملها commit يطبع [[SKIP]] وعدد الملفات ومايعملش pull للـ repo ده.`,
          flag: "script",
          deep: {
            why: "عندك ١٥ مشروع على الجهاز أو السيرفر، وعايز تحدّثهم كلهم الصبح وتعرف مين فشل. بإيدك: cd و git pull ١٥ مرة. بالسكربت: أمر واحد وملخص.",
            how: R`[[root.glob("*/.git")]] بيلاقي كل فولدر جواه [[.git]] في مستوى واحد، و [[.parent]] الفولدر نفسه.

[[git -C path]] بيشغّل git كأنه واقف في الفولدر ده، من غير ما السكربت يعمل cd. (أو [[cwd=repo]] في subprocess.run، نفس النتيجة.)

[[--ff-only]]: pull ينجح بس لو مفيش تعارض. لو فيه commits عندك وعلى السيرفر، يفشل بدل ما يعمل merge commit أو يفتح editor يستنى حد يكتب رسالة.

[[timeout=120]]: لو git وقف يسأل عن باسورد هيقف للأبد. الأحسن كمان تمنعه يسأل: [[env={**os.environ, "GIT_TERMINAL_PROMPT": "0"}]] فيفشل على طول برسالة.

stdout و stderr منفصلين: git بيكتب الأخطاء على stderr، فالسطر الأخير من الصح بيوضح اللي حصل.

لو هتحلل الناتج نفسه (مش تعرضه بس)، استخدم الأشكال المعمولة للبرامج زي [[--porcelain]] و [[--format]]، مش الرسايل اللي للبني آدمين: دي بتتغير بين النسخ وبتتترجم حسب لغة الجهاز.`,
            when: "لما الأداة الخارجية هي الطريقة الصح. لو فيه مكتبة Python بتعمل الحاجة (shutil بدل cp، و pathlib بدل find، و requests بدل curl)، استخدمها.",
            mistakes: R`[[subprocess.run(f"cd {repo} && git pull", shell=True)]]: فولدر فيه مسافة أو [[;]] في اسمه وكارثة. وتتجاهل [[returncode]] فالسكربت يقول تمام. وتقرا رسايل git بالإنجليزي على جهاز لغته عربي. ومن غير timeout على أمر بيكلم الشبكة.`
          },
          lines: [
            "عشان تتأكد إن git موجود.",
            "subprocess.",
            "sys.",
            "Path.",
            "الفولدر اللي فيه المشاريع.",
            "git مش متسطّب؟",
            "رسالة واضحة بدل FileNotFoundError.",
            "المشاريع اللي فشلت.",
            "كل فولدر جواه .git:",
            "شغّل:",
            "list: البرنامج وكل argument لوحده.",
            "امسك الناتج كنص، وأقصى وقت دقيقتين.",
            "قفلة.",
            "سطور stdout لو نجح، أو stderr لو فشل.",
            "الاسم والحالة وآخر سطر.",
            "فشل؟",
            "سجّله.",
            "لو فيه فشل:",
            "اخرج بـ 1 ومعاك أسماءهم."
          ],
          sol: R`بعد ما جهزت repo اسمه [[api]] فيه commit جديد على الـ origin، و [[shop]] فيه commit هنا و commit هناك (diverged)، و [[notes]] فولدر عادي:

[[api       ok      Fast-forward]]
[[shop      FAILED  fatal: Not possible to fast-forward, aborting.]]
[[failed: shop]] و exit 1.

المرة التانية [[api]] بقى [[Already up to date.]] و shop لسه FAILED. و [[notes]] ماظهرش لأنه مش repo.

بعد التعديل، ومع ملف جديد في api و commit جديد على الـ origin:

[[api       SKIP    1 uncommitted changes]]
[[shop      FAILED  fatal: Not possible to fast-forward, aborting.]]

و [[git log]] في api اتأكدت إنه ماتحدّثش.`,
          solCode: R`# setup (في فولدر تجربة):
#   for r in api shop; do git init -q -b main origin/$r && git -C origin/$r commit -q --allow-empty -m init && git clone -q origin/$r code/$r; done
#   git -C origin/api commit -q --allow-empty -m "fix login"
#   git -C origin/shop commit -q --allow-empty -m new && git -C code/shop commit -q --allow-empty -m local
import shutil
import subprocess
import sys
from pathlib import Path
def git(repo: Path, *args: str) -> subprocess.CompletedProcess:
    return subprocess.run(["git", "-C", str(repo), *args], capture_output=True, text=True, timeout=120)
root = Path(sys.argv[1] if len(sys.argv) > 1 else "~/code").expanduser()
if shutil.which("git") is None:
    sys.exit("error: git is not installed")
failed = []
for repo in sorted(p.parent for p in root.glob("*/.git")):
    changed = git(repo, "status", "--porcelain").stdout.splitlines()
    if changed:
        print(f"{repo.name:<10}{'SKIP':<8}{len(changed)} uncommitted changes")
        continue
    r = git(repo, "pull", "--ff-only")
    out = (r.stdout if r.returncode == 0 else r.stderr).strip().splitlines()
    print(f"{repo.name:<10}{'ok' if r.returncode == 0 else 'FAILED':<8}{out[-1] if out else ''}")
    if r.returncode != 0:
        failed.append(repo.name)
if failed:
    sys.exit(f"failed: {', '.join(failed)}")`
        },
        {
          cmd: "os.environ و .env",
          title: "الأسرار والإعدادات من البيئة مش من الكود",
          desc: R`توكن API أو باسورد إيميل مكتوب جوه السكربت هيوصل git، وهيتبعت لأي حد بتبعتله السكربت. المكان الصح متغيرات البيئة: [[os.environ.get("API_TOKEN")]].

وعشان متكتبش [[export]] كل مرة، ملف [[.env]] جنب السكربت فيه [[API_TOKEN=...]]، ومكتبة [[python-dotenv]] بتحمّله في [[os.environ]] بسطر واحد. والملف ده في [[.gitignore]] دايمًا.`,
          example: R`import os
import sys
from dotenv import load_dotenv
load_dotenv()
API_URL = os.environ.get("API_URL", "http://localhost:8000")
DEBUG = os.environ.get("DEBUG", "0").lower() in ("1", "true", "yes")
TIMEOUT = float(os.environ.get("TIMEOUT", "10"))
token = os.environ.get("API_TOKEN")
if not token:
    sys.exit("error: API_TOKEN is not set (put it in .env or export it)")
print(API_URL, DEBUG, TIMEOUT, token[:4] + "...")`,
          try: R`[[pip install python-dotenv]] في venv، واعمل [[.env]] فيه [[API_URL=https://api.example.com]] و [[API_TOKEN=sk_live_abc123]] و [[DEBUG=true]]. شغّل السكربت. وبعدين [[API_URL=http://staging DEBUG=0 python envs.py]]. وبعدين غيّر اسم [[.env]] وشغّله. ورجّعه وشغّل السكربت من فولدر تاني بمساره الكامل. وفي الآخر [[DEBUG=false python3 -c 'import os; print(bool(os.environ["DEBUG"]))']].`,
          flag: "script",
          deep: {
            why: R`نفس السكربت بيشتغل على جهازك (API تجربة) وعلى السيرفر (API حقيقي) من غير ما تعدّل سطر، والأسرار عمرها ما تدخل git. وأي حد بيقرا الكود يعرف السكربت محتاج إيه من الأسماء.`,
            how: R`[[os.environ]] dict فيه متغيرات البيئة، والقيم كلها نصوص. [[get(name, default)]] للاختياري، والإجباري تفحصه في الأول وتخرج برسالة واضحة بدل [[KeyError]] في نص الشغل.

الـ bool: [[bool("false")]] بـ True لأن أي نص مش فاضي True. فلازم تقارن بقايمة زي المثال. والأرقام [[int()]] أو [[float()]].

[[load_dotenv()]] بيدوّر على [[.env]] من فولدر السكربت ولفوق، وبيحمّل اللي فيه في [[os.environ]]. وأي متغير موجود فعلًا في البيئة بيكسب على اللي في الملف (إلا لو [[override=True]])، فتقدر تغيّر قيمة لتشغيلة واحدة من الترمنال.

[[.env]] في .gitignore، وجنبه [[.env.example]] فيه الأسماء من غير القيم وده اللي يدخل git.

من غير dotenv: لينكس وماك [[export API_TOKEN=...]] أو [[API_TOKEN=... python3 script.py]] لتشغيلة واحدة. PowerShell [[$env:API_TOKEN="..."]]. CMD [[set API_TOKEN=...]].

لتطبيقات أكبر (FastAPI مثلًا) [[pydantic-settings]] بيقرا ويتحقق من الأنواع (درس «pydantic-settings» في تاب «Python و FastAPI»).`,
            when: "أي توكن أو باسورد أو URL بيختلف بين جهازك والسيرفر.",
            mistakes: R`commit لـ [[.env]] (ولو اتعمل، غيّر التوكن نفسه، مسحه من git مش كفاية). وطباعة التوكن كامل في log. و [[bool(os.environ["DEBUG"])]]. وسكربت في cron مش لاقي المتغيرات لأنها في [[~/.bashrc]]، و cron مبيقراهوش.`
          },
          lines: [
            "os.",
            "sys.",
            "pip install python-dotenv.",
            "حمّل .env في os.environ.",
            "اختياري بقيمة افتراضية.",
            "bool من نص.",
            "رقم من نص.",
            "إجباري:",
            "مش موجود؟",
            "اخرج برسالة بتقول تحطه فين.",
            "اطبع، والتوكن مقصوص."
          ],
          sol: R`الناتج بالترتيب:

[[https://api.example.com True 10.0 sk_l...]]: من .env.
[[http://staging False 10.0 sk_l...]]: متغيرات الترمنال كسبت على .env.
من غير .env: [[error: API_TOKEN is not set (put it in .env or export it)]] و exit 1.
من فولدر تاني بالمسار الكامل: نفس السطر الأول. [[load_dotenv]] دوّر جنب السكربت مش في الفولدر الحالي.

و [[bool(os.environ["DEBUG"])]] مع [[DEBUG=false]] طبع [[True]].`,
          solCode: R`# .env  (ضيفه في .gitignore)
API_URL=https://api.example.com
API_TOKEN=sk_live_abc123
DEBUG=true`
        },
        {
          cmd: "requests و urllib مع timeout",
          title: "HTTP من سكربت: JSON وتحميل ملفات",
          desc: R`سكربتات كتير بتكلم الإنترنت: تجيب JSON من API، أو تحمّل ملف، أو تشيّك إن موقع شغال. فيه طريقتين:

[[urllib.request]] في المكتبة الأساسية، فالسكربت بيشتغل على أي سيرفر من غير pip.
[[requests]] ([[pip install requests]]) أسهل بكتير: [[r.json()]] و [[raise_for_status()]] و [[stream=True]] للملفات الكبيرة.

وفي الاتنين: [[timeout]] دايمًا. من غيره، سيرفر مش بيرد هيخلي السكربت مستني للأبد.`,
          example: R`import json
import urllib.error
import urllib.request
from pathlib import Path
import requests
BASE = "http://localhost:8000"
with urllib.request.urlopen(f"{BASE}/data.json", timeout=5) as r:
    print(r.status, json.load(r))
try:
    urllib.request.urlopen(f"{BASE}/missing", timeout=5)
except urllib.error.HTTPError as e:
    print("urllib:", e.code, e.reason)
r = requests.get(f"{BASE}/data.json", timeout=5)
r.raise_for_status()
print(r.status_code, r.json()["name"], r.headers["Content-Type"])
r = requests.get(f"{BASE}/missing", timeout=5)
print(r.status_code, r.ok)
with requests.get(f"{BASE}/big.bin", stream=True, timeout=(3, 30)) as r:
    r.raise_for_status()
    with open("big.bin", "wb") as f:
        for chunk in r.iter_content(chunk_size=64 * 1024):
            f.write(chunk)
print("downloaded", f"{Path('big.bin').stat().st_size:,}", "bytes")
try:
    requests.get("http://10.255.255.1", timeout=2)
except requests.RequestException as e:
    print("failed:", type(e).__name__)`,
          try: R`جهّز سيرفر محلي: [[mkdir www && echo '{"name": "terminal-study", "version": 3}' > www/data.json && head -c 3000000 /dev/urandom > www/big.bin]] وبعدين [[python3 -m http.server 8000 --directory www]] في ترمنال تاني (درس «python -m http.server»). سطّب requests في venv وشغّل السكربت، وقيس وقته بـ [[time]].`,
          flag: "script",
          deep: {
            why: R`سكربت بيسحب أسعار أو بيانات كل ساعة، وفي مرة السيرفر التاني علّق: من غير timeout السكربت بيفضل مستني، والتشغيلة اللي بعدها بتبدأ جنبه، وبعد يومين عندك ٤٨ نسخة معلّقة.`,
            how: R`urllib: [[urlopen]] بيرجّع response بتقرا منه، و [[json.load(r)]] بيقرا ويحوّل. وأي status من 400 لفوق بيرمي [[HTTPError]] (فيه [[code]] و [[reason]])، ومشاكل الاتصال (DNS، connection refused) بترمي [[URLError]].

requests: مش بيرمي على 404 لوحده. [[r.ok]] و [[r.status_code]] تفحصهم بنفسك، أو [[raise_for_status()]] يرمي [[HTTPError]]. و [[r.json()]] بيرمي لو الرد مش JSON (صفحة error بـ HTML مثلًا).

[[timeout=5]] في requests مش «أقصى وقت للطلب كله»: ده وقت الاتصال، ووقت أقصى بين أي حتتين بيانات. و [[timeout=(3, 30)]] اتصال 3 ثواني وقراية 30. ومن غير timeout خالص، requests بيستنى للأبد.

[[stream=True]] و [[iter_content]]: الملف بيتكتب حتة حتة (64KB هنا) بدل ما 3GB يتحمّلوا في الذاكرة.

[[requests.RequestException]] أبو كل الأخطاء (Timeout و ConnectionError و HTTPError)، فـ except واحد بيمسكهم.

ولو هتبعت طلبات كتير لنفس الموقع: [[requests.Session()]] بيعيد استخدام الاتصال وبيحط headers مشتركة. ولو محتاج async أو HTTP/2، [[httpx]] (درس «httpx.AsyncClient» في تاب «Python و FastAPI»). والمحاولات التانية لما الطلب يفشل في درس «retry و backoff» في المستوى ٣.`,
            when: "urllib لسكربت صغير على سيرفر من غير venv. requests لأي حاجة أكبر من طلب أو اتنين.",
            mistakes: R`من غير timeout. و [[r.json()]] من غير ما تشيّك الـ status. و [[r.content]] لملف كبير فالذاكرة تخلص. ومواقع بترفض User-Agent بتاع urllib الافتراضي ([[Python-urllib/3.12]]) بـ 403، فحط User-Agent واضح باسم السكربت.`
          },
          lines: [
            "json.",
            "أخطاء urllib.",
            "urllib.",
            "Path.",
            "pip install requests.",
            "عنوان السيرفر.",
            "اطلب، ومهلة 5 ثواني.",
            "الـ status والـ JSON.",
            "حاول...",
            "...تطلب صفحة مش موجودة.",
            "urllib بيرمي على 404:",
            "الكود والسبب.",
            "نفس الطلب بـ requests.",
            "ارمي لو status غلط.",
            "الـ status، وحقل من الـ JSON، وheader.",
            "404 بـ requests...",
            "...مش بيرمي، بتفحص بنفسك.",
            "تحميل ملف كبير حتة حتة، اتصال 3 ثواني وقراية 30.",
            "ارمي لو status غلط.",
            "افتح ملف binary.",
            "لف على الحتت (64KB).",
            "اكتب.",
            "حجم اللي اتحمّل.",
            "حاول...",
            "...تكلم IP مش بيرد.",
            "أي خطأ في requests:",
            "اسم الخطأ."
          ],
          sol: R`الناتج:

[[200 {'name': 'terminal-study', 'version': 3}]]
[[urllib: 404 File not found]]
[[200 terminal-study application/json]]
[[404 False]]
[[downloaded 3,000,000 bytes]]
[[failed: ConnectTimeout]]

و [[time]] قال حوالي 2.2 ثانية، تقريبًا كلهم الـ timeout بتاع آخر طلب. من غير [[timeout=2]] كان هيستنى لحد ما النظام نفسه يستسلم (دقيقتين أو أكتر على لينكس).

لو طلع [[ConnectionError]] أو [[Connection refused]] في أول طلب، السيرفر المحلي مش شغال أو على بورت تاني. ولو [[ModuleNotFoundError: No module named 'requests']] يبقى الـ venv مش متفعّل.`
        },
        {
          cmd: "re في السكربتات",
          title: "طلّع أرقام وإيميلات من ملفات بـ regex",
          desc: R`[[re]] بيدوّر على أشكال في النص: أرقام تليفونات، إيميلات، تواريخ، أكواد. في السكربتات استخدامه الأشهر إنك تطلّع حاجة من ملفات كتير، أو تنضّف نص.

الطريقة اللي بتشتغل مع بيانات حقيقية: خطوتين. regex واسع يلقط كل حاجة شكلها رقم، وبعدين دالة تنضّف (تشيل المسافات والشرط) وتتأكد بـ regex صارم. regex واحد عملاق بيحاول يعمل الاتنين بيبقى صعب يتقري وبيفوّت حالات.

أساسيات re (groups و findall و sub) في درس «re» في تاب «Python و FastAPI».`,
          example: R`import re
import sys
from pathlib import Path
CANDIDATE = re.compile(r"\+?\d[\d\s-]{8,15}\d")
MOBILE = re.compile(r"01[0125]\d{8}")
EMAIL = re.compile(r"[\w.+-]+@[\w-]+(?:\.[\w-]+)+")
def normalize(raw: str) -> str | None:
    digits = re.sub(r"\D", "", raw)
    if digits.startswith("20"):
        digits = "0" + digits[2:]
    return digits if MOBILE.fullmatch(digits) else None
phones, emails = set(), set()
for path in sorted(Path(sys.argv[1] if len(sys.argv) > 1 else ".").rglob("*.txt")):
    text = path.read_text(encoding="utf-8", errors="replace")
    phones.update(p for p in map(normalize, CANDIDATE.findall(text)) if p)
    emails.update(e.lower() for e in EMAIL.findall(text))
print(sorted(phones))
print(sorted(emails))
print(re.sub(r"\s+", " ", "  كلام    فيه   مسافات  ").strip())`,
          try: R`اعمل فولدر [[inbox]] فيه ملفين: الأول فيه [[01012345678]] و [[Sara.Ali@Example.com]] و [[+20 112 345 6789]]، والتاني فيه [[omar@shop.eg]] و [[0122-555-1234]] و [[0101234]] (ناقص) و [[12345678901234]] (طويل) و [[010 1234 5678]] (نفس أول رقم بمسافات). شغّل السكربت. وبعدين عدّله يطبع كل رقم ومعاه أسماء الملفات اللي ظهر فيها.`,
          flag: "script",
          deep: {
            why: R`عندك ٢٠٠ رسالة أو ملف export من نظام قديم وعايز لستة أرقام العملاء من غير تكرار. الأرقام مكتوبة بكل الأشكال: بمسافات، بشرط، بـ +20، من غير. بإيدك ساعات، والسكربت ثانية.`,
            how: R`[[r"..."]] raw string: الـ [[\d]] توصل لـ re زي ما هي من غير ما Python يفهمها escape. اكتب كل الـ patterns كده.

[[re.compile]] مرة واحدة بره الـ loop، واسم واضح للـ pattern.

[[CANDIDATE]]: [[\+?]] علامة + اختيارية، و [[\d]] رقم، و [[[\d\s-]{8,15}]] من 8 لـ 15 رقم أو مسافة أو شرطة، وآخره رقم. واسع قصد.

[[normalize]]: [[re.sub(r"\D", "", raw)]] بيشيل أي حاجة مش رقم. لو بادئ بـ [[20]] (كود مصر) بيبقى [[0]]. و [[MOBILE.fullmatch]] لازم النص كله يطابق: [[01]] وبعدها [[0]] أو [[1]] أو [[2]] أو [[5]] وبعدها 8 أرقام بالظبط. أي حاجة تانية None.

[[findall]] من غير groups بيرجّع النص اللي طابق كله. لو فيه groups بيرجّع الـ groups بس، فـ [[(?:...)]] group مش بيتحسب، زي ما في EMAIL.

[[set]] بيشيل التكرار لوحده، و [[e.lower()]] عشان [[Sara@X.com]] و [[sara@x.com]] واحد.

[[\s+]] أي عدد مسافات أو tabs أو سطور، و [[re.sub]] بيبدّلهم بمسافة واحدة.`,
            when: "تطلّع أو تتأكد من أشكال في نص. ولو الملف ليه شكل معروف (JSON و CSV و HTML)، استخدم الـ parser بتاعه مش regex.",
            mistakes: R`[["\d"]] من غير r. والنقطة من غير escape في الإيميل ([[.]] يعني أي حرف). و [[search]] بدل [[fullmatch]] في التحقق فـ [[0101234567899999]] يعدّي. و [[.*]] greedy بياكل أكتر من اللازم. و regex للـ HTML.`
          },
          lines: [
            "re.",
            "sys.",
            "Path.",
            "واسع: أي حاجة شكلها رقم تليفون.",
            "صارم: موبايل مصري 11 رقم.",
            "إيميل (والـ group مش بيتلقط).",
            "نضّف واتأكد:",
            "سيب الأرقام بس.",
            "لو بادئ بكود مصر...",
            "...خليه يبدأ بـ 0.",
            "رجّعه لو صح، وإلا None.",
            "sets عشان التكرار.",
            "كل ملفات txt:",
            "اقرا، وأي byte بايظ يتبدل.",
            "كل المرشحين، نضّفهم، وسيب الصح بس.",
            "الإيميلات بحروف صغيرة.",
            "الأرقام مترتبة.",
            "الإيميلات مترتبة.",
            "مسافات كتير بقت واحدة."
          ],
          sol: R`الناتج:

[[['01012345678', '01123456789', '01225551234'] ]]
[[['omar@shop.eg', 'sara.ali@example.com'] ]]
[[كلام فيه مسافات]]

[[+20 112 345 6789]] بقى [[01123456789]]، و [[0122-555-1234]] بقى [[01225551234]]، و [[010 1234 5678]] اتشال كتكرار. والناقص والطويل اترفضوا في [[fullmatch]].

حل التعديل: بدل set، [[found = defaultdict(set)]] وجوه الـ loop [[found[p].add(path.name)]]. وطلع:

[[01012345678 msg1.txt, msg2.txt]]
[[01123456789 msg1.txt]]
[[01225551234 msg2.txt]]`,
          solCode: R`import re
import sys
from collections import defaultdict
from pathlib import Path
CANDIDATE = re.compile(r"\+?\d[\d\s-]{8,15}\d")
MOBILE = re.compile(r"01[0125]\d{8}")
def normalize(raw: str) -> str | None:
    digits = re.sub(r"\D", "", raw)
    if digits.startswith("20"):
        digits = "0" + digits[2:]
    return digits if MOBILE.fullmatch(digits) else None
found = defaultdict(set)
for path in sorted(Path(sys.argv[1] if len(sys.argv) > 1 else ".").rglob("*.txt")):
    text = path.read_text(encoding="utf-8", errors="replace")
    for p in filter(None, map(normalize, CANDIDATE.findall(text))):
        found[p].add(path.name)
for phone, files in sorted(found.items()):
    print(phone, ", ".join(sorted(files)))`
        }
      ]
    },
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
        if not p.is_file() or p.name.startswith(".") or p.suffix.lower() in SKIP:
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
          try: R`متجربش على Downloads الحقيقي الأول. اعمل فولدر تجربة: [[mkdir -p dl/Images && cd dl && touch cv.pdf "Photo 1.JPG" logo.png setup.exe movie.mkv data.tar.gz notes.TXT song.mp3 big.iso.part .hidden Images/logo.png && cd ..]]. شغّل [[python3 organize_downloads.py dl]]، وبعدين بـ [[--apply]]، وبعدين من غير [[--apply]] تاني. وبعدين ضيف [[.mp3]] لمجموعة جديدة [[Music]].`,
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
            mistakes: R`تشغيله بالـ apply على طول على Downloads الحقيقي. ونقل ملف لسه بيتحمّل فالتحميل يفشل. وتنسى الملفات المخفية ([[.DS_Store]] و [[desktop.ini]]). والمقارنة بـ [[p.suffix]] من غير [[lower()]].`
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
            "سيب الفولدرات والمخفي والتحميلات الناقصة.",
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

ومحدش اتحرك. بعد [[--apply]] نفس السطور بـ [[move:]]، و [[big.iso.part]] و [[.hidden]] فضلوا مكانهم، و [[Images]] فيه [[logo.png]] و [[logo (1).png]] و [[Photo 1.JPG]]. والتشغيل التالت: [[0 files]].

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
          try: R`[[mkdir trip && touch trip/IMG_20260915_143210.JPG trip/IMG_20260915_150001.jpg "trip/WhatsApp Image 2026-09-16 at 10.15.jpeg" trip/notes.txt]]. شغّل [[python3 batch_rename.py trip --prefix trip --glob "*.[jJ]*" --dry-run]]، وبعدين من غير --dry-run، وبعدين تاني. وبعدين حالة صعبة: [[mkdir sw && echo A > sw/a.jpg && echo B > sw/photo_001.jpg]] و [[python3 batch_rename.py sw]] واقرا محتوى الملفين بعدها.`,
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
          try: R`جهّز: [[mkdir -p pics/2025 pics/backup && head -c 2000000 /dev/urandom > pics/2025/beach.jpg && cp pics/2025/beach.jpg "pics/backup/beach (copy).jpg" && cp pics/2025/beach.jpg pics/IMG_0001.jpg && head -c 2000000 /dev/urandom > pics/2025/other.jpg && echo hello > pics/a.txt && echo hello > pics/backup/a-old.txt && echo world > pics/b.txt && touch pics/empty1 pics/empty2]]. شغّل السكربت على [[pics]]. ليه [[b.txt]] ماظهرش مع إن حجمه زي [[a.txt]]؟ وليه [[empty1]] و [[empty2]] ماظهروش؟`,
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

الوقت على الفولدر ده 0.06 ثانية. ولو [[b.txt]] كان حجمه مختلف ماكانش اتعمله hash أصلًا.`
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
          try: R`جهّز ملفات بأعمار مختلفة: [[mkdir -p logs/old && head -c 4096 /dev/urandom > logs/app-2026-08-01.log && touch -d "61 days ago" logs/app-2026-08-01.log && head -c 2048 /dev/urandom > logs/old/worker.log && touch -d "40 days ago" logs/old/worker.log && echo x > logs/app.log && touch -d "40 days ago" logs/keep.txt]]. شغّل [[python3 clean_old_files.py logs --days 30 --pattern "*.log"]]، وبعدين بـ [[--apply]]. وجرّب على [[~]]، ومن غير [[--days]].`,
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
          try: R`اعمل [[urls.txt]] فيه [[https://example.com]] و [[https://www.python.org/]] و [[https://pypi.org/nope-404]] وسطر [[http://127.0.0.1:1/]] (بورت مقفول) و [[http://no-such-host.invalid/]]، وسطر بيبدأ بـ [[#]]. شغّله و [[echo $?]]. ولو عندك سيرفر محلي بيتأخر، جرّب رابط بيرد بعد 7 ثواني.`,
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
          sol: R`على النت الحقيقي:

[[UP    https://example.com                      200 in 184 ms]]
[[UP    https://www.python.org/                  200 in 217 ms]]
[[DOWN  https://pypi.org/nope-404                HTTP 404]]

ومع سيرفر محلي فيه رابط بيرد 500 ورابط بيتأخر 7 ثواني:

[[DOWN  http://127.0.0.1:18732/boom              HTTP 500]]
[[DOWN  http://127.0.0.1:18732/slow?s=7          error: timed out]]
[[DOWN  http://127.0.0.1:1/                      error: [Errno 111] Connection refused]]
[[DOWN  http://no-such-host.invalid/             error: [Errno -2] Name or service not known]]

وآخر سطر [[1/6 up]] و [[echo $?]] بـ 1. كل نوع فشل ليه رسالة مختلفة، ودي اللي بتقولك تبدأ تدوّر فين: DNS ولا السيرفر واقف ولا التطبيق بيرمي errors.`
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
          try: R`[[mkdir -p project/src && echo 'print("hi")' > project/src/app.py && head -c 50000 /dev/urandom > project/data.bin]]. شغّل [[python3 backup_zip.py project backups --keep 2]] تلات مرات بينهم ثانية، وبعدين [[ls backups]] و [[python3 -m zipfile -l]] على آخر واحد. وجرّب [[python3 backup_zip.py project project/backups]].`,
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
          try: R`جرّب من غير ما تبعت إيميل حقيقي: [[pip install aiosmtpd]] وفي ترمنال تاني [[python -m aiosmtpd -n -l localhost:8025]] (سيرفر بيطبع أي إيميل يوصله). وبعدين [[SMTP_HOST=localhost SMTP_PORT=8025 SMTP_TLS=0 SMTP_USER=bot@example.com MAIL_TO=you@example.com python3 notify.py "Backup ok: 3 files" "النسخة الاحتياطية خلصت" report.csv]]. وجرّب من غير [[SMTP_USER]]، وبـ [[SMTP_TLS=1]] على نفس السيرفر.`,
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
[[To: sara@example.com]]
[[Content-Type: multipart/mixed; ...]]
وجواه جزء [[Content-Type: text/plain; charset="utf-8"]] فيه [[النسخة الاحتياطية خلصت]]، وجزء [[Content-Type: text/csv]] و [[Content-Disposition: attachment; filename="report.csv"]].

من غير [[SMTP_USER]]: [[error: environment variable 'SMTP_USER' is not set]] و exit 1.
بـ TLS على السيرفر المحلي: [[error: could not send: STARTTLS extension not supported by server.]]
وبورت مقفول: [[error: could not send: [Errno 111] Connection refused]].

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
          ],
          sol: R`جربتها بـ endpoint بيرجّع [[{"client": ..., "scheme": ...}]] وبعت الطلب بـ [[X-Forwarded-For: 203.0.113.7]] و [[X-Forwarded-Proto: https]] زي ما nginx بيعمل:

مع [[--forwarded-allow-ips "*"]]: [[{"client":"203.0.113.7","scheme":"https"}]]، يعني IP المستخدم الحقيقي و https.
من غيرها، والطلب جاي من IP غير 127.0.0.1 (زي nginx في container تاني): [[{"client":"192.0.2.2","scheme":"http"}]]، يعني IP البروكسي و http، و uvicorn تجاهل الـ headers.

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
          sol: R`[[docker images]] المفروض يوريك الصورة بحجم في حدود ٢٠٠ لـ ٣٠٠ ميجا حسب المكتبات (الـ base [[python:3.12-slim]] لوحدها حوالي ١٢٠ ميجا على الديسك). لو طلعت قرب الجيجا، غالبًا نسيت [[.dockerignore]] فـ [[.venv]] و [[.git]] اتنسخوا جوه الصورة، أو استخدمت [[python:3.12]] مش slim.

[[docker compose exec app whoami]] المفروض يطبع [[app]]. لو طبع [[root]] يبقى سطر [[USER app]] مش موجود أو الـ service بيستخدم صورة قديمة (اعمل [[docker compose up -d --build]]). وبعد دقيقة [[docker ps]] يوريك [[(healthy)]]. لو [[(unhealthy)]] شوف [[docker inspect --format '{{json .State.Health}}' <id>]]: غالبًا مفيش route اسمه [[/health]].

(مقدرتش أبني الصورة هنا لأن الشبكة جوه docker build مقفولة، فالأرقام دي تقريبية.)`
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
          ],
          sol: R`الأمر الأول بيطبع ناتج pytest العادي، حاجة زي [[..... [100%]]] و [[5 passed in 0.40s]]، والـ exit code بتاعه هو بتاع pytest (0 لو كله نجح). [[--no-deps]] معناها إنه مابيشغّلش الـ db ولا أي service في [[depends_on]]، فلو اختباراتك محتاجة قاعدة بيانات هتفشل بـ connection refused، وساعتها شيل [[--no-deps]].

[[docker ps -a]] بعدها مش المفروض يوريك container اسمه زي [[project-app-run-a1b2c3]]، لأن [[--rm]] مسحه. لو لقيت واحد [[Exited]] يبقى شغّلت مرة من غير [[--rm]]، امسحه بـ [[docker rm]] أو [[docker container prune]].

(ما قدرتش أشغّلها هنا لأن بناء الصورة محتاج نت جوه docker build.)`
        }
      ]
    },
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
          sol: R`بعد [[pip install -e ./tidy-tools]] في venv، فولدر [[venv/bin]] بقى فيه [[tidy]] و [[dupes]]، و [[tidy --help]] طبع [[usage: tidy [-h] [--apply] [folder]]]، و [[dupes /tmp]] طبع [[scanning /tmp]] و exit 0. والملف [[venv/bin/tidy]] نفسه 6 سطور: [[from tidy_tools.organize import main]] و [[sys.exit(main())]].

[[pipx install ./tidy-tools]]:

[[installed package tidy-tools 0.1.0, installed using Python 3.12.3]]
[[These apps are now available]] و [[- dupes]] و [[- tidy]]

و [[uv tool install ./tidy-tools]] طلّع [[Installed 2 executables: dupes, tidy]]، وحذّرني إن الفولدر مش في الـ PATH ([[uv tool update-shell]] بيحلها).

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

[[uv run]] أول مرة بيحمّل المكتبات (عندي 7 ثواني) وبيحفظها في cache، والمرات اللي بعدها أقل من ثانية. ولو [[requires-python]] أحدث من الموجود عندك، uv ممكن يحمّل Python نفسه.

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
          sol: R`أول [[uv run]] كتب [[Downloading pygments (1.2MiB)]] و [[Installed 9 packages in 8ms]] وبعدين الجدول:

[[│ requests │  2.34.2 │]]
[[│ fastapi  │ 0.142.2 │]]
[[│ pytest   │   9.1.1 │]]

في 7.3 ثانية. التانية 0.7 ثانية من الـ cache. (النسخ هتبقى أحدث عندك.)

[[./pypi_versions.py typer no-such-pkg-xyz-123]] اشتغل من الـ shebang وطلع [[typer 0.27.2]] و [[no-such-pkg-xyz-123  HTTP 404]].

[[uv init --script new_tool.py]] عمل ملف أوله [[# /// script]] و [[# requires-python = ">=3.12"]] و [[# dependencies = []]] ودالة main. وبعد [[uv add --script new_tool.py httpx]] بقى [[#     "httpx>=0.28.1",]] جوه dependencies.

و [[python3 pypi_versions.py]] اشتغل عندي بس لأن requests و rich كانوا متسطبين على النظام بالصدفة. على جهاز نضيف هيقع بـ ModuleNotFoundError.`
        },
        {
          cmd: "cron و Task Scheduler",
          title: "شغّل السكربت لوحده كل يوم",
          desc: R`على لينكس (والسيرفرات) [[cron]]: سطر في [[crontab -e]] فيه الميعاد (دقيقة، ساعة، يوم في الشهر، شهر، يوم في الأسبوع) والأمر. على ويندوز Task Scheduler، ومن الترمنال [[schtasks]]. على ماك cron شغال، والطريقة الرسمية launchd.

وأهم حاجة: البيئة اللي cron بيشغّل فيها فقيرة جدًا. مفيش venv متفعّل، والـ PATH قصير، ومفيش [[~/.bashrc]]، والفولدر الحالي هو الـ home. فكل حاجة بمسار كامل، والناتج والأخطاء يتكتبوا في ملف.`,
          example: R`crontab -e
# كل يوم الساعة 2 بالليل:
0 2 * * * cd /home/sara/scripts && .venv/bin/python backup_zip.py /home/sara/projects /home/sara/backups >> logs/backup.log 2>&1
# كل 5 دقايق، ومتبدأش نسخة تانية لو اللي قبلها لسه شغالة:
*/5 * * * * /usr/bin/flock -n /tmp/uptime.lock /usr/bin/python3 /home/sara/scripts/uptime_check.py /home/sara/scripts/urls.txt >> /home/sara/scripts/logs/uptime.log 2>&1
crontab -l
journalctl -u cron -n 20
# ويندوز (CMD أو PowerShell):
schtasks /Create /TN "Backup" /SC DAILY /ST 02:00 /TR "C:\Users\sara\scripts\.venv\Scripts\python.exe C:\Users\sara\scripts\backup_zip.py C:\Users\sara\Documents D:\backups"
schtasks /Query /TN "Backup" /V /FO LIST
schtasks /Run /TN "Backup"`,
          try: R`حاكي بيئة cron من غير ما تستنى: من الـ home شغّل [[env -i HOME=$HOME PATH=/usr/bin:/bin /bin/sh -c "python3 uptime_check.py urls.txt"]] وشوف الرسالة. وبعدين نفس الأمر بـ [[cd /full/path && ...]]. وجرّب الـ lock: [[flock -n /tmp/u.lock sleep 30 &]] وبعدها على طول [[flock -n /tmp/u.lock echo second; echo $?]]. ولو عايز cron بجد: سطر [[* * * * * date >> /tmp/cron-test.txt]] واستنى دقيقتين.`,
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

و [[journalctl -u cron -n 20]] على أوبونتو بيطلّع سطور زي [[CRON[489168]: (sara) CMD (/usr/bin/python3 /home/sara/scripts/uptime_check.py ...)]]: يعني cron شغّل الأمر فعلًا، وأي مشكلة بعد كده هتلاقيها في الـ log بتاع السكربت نفسه.

(schtasks ماجربتهوش هنا لأني على لينكس. الشكل ده هو المعتاد، ولو حصل خطأ في الأمر، Task Scheduler من الواجهة فيه نفس الخيارات.)`
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
          try: R`محتاج سيرفر بيفشل ساعات. اعمل [[flaky.py]] بـ [[http.server]] بيرجّع 503 لأول طلبين و 200 للتالت، و 404 على [[/missing]] و 500 دايمًا على [[/boom]] (الكود في الحل). شغّل [[python3 fetch_retry.py http://localhost:8001/flaky]]، وبعدين على [[/missing]] و [[/boom]]، وبعد كل واحدة [[echo $?]].`,
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
          try: R`محتاج روابط بطيئة: سيرفر محلي فيه [[/slow]] بيستنى ثانية قبل ما يرد (عدّل [[flaky.py]] من الدرس اللي فات: [[time.sleep(1)]] لو المسار بيبدأ بـ [[/slow]]). اعمل urls.txt فيه 10 روابط [[/slow?n=1]] لـ [[/slow?n=10]] ورابط 404 ورابط على بورت مقفول. شغّل وقارن الوقتين. وبعدين غيّر [[max_workers]] لـ 2 وشوف.`,
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
          sol: R`على 10 روابط كل واحد بياخد ثانية، ورابط 404، ورابط على بورت مقفول:

النتايج طلعت بترتيب الخلصان: [[error: HTTPError]] و [[error: URLError]] طلعوا في الأول أو في النص مش في الآخر، و [[n=10]] ممكن يطلع قبل [[n=1]]. والترتيب بيتغير من تشغيل للتاني.

[[threads: 12 urls in 1.18s]]
[[one by one: 10.02s]]
[[['200', '200', '200', '200'] ]] من map بنفس ترتيب الملف.

بـ [[max_workers=2]] الوقت بيبقى حوالي 5 ثواني: 10 روابط على 2 في نفس الوقت. يعني الوقت تقريبًا (عدد الروابط البطيئة ÷ workers) × مدة الواحد.`
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
    monkeypatch.setenv("HOME", str(tmp_path))
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

[[monkeypatch.setenv("HOME", ...)]]: [[Path.home()]] بيقرا HOME على لينكس وماك، فالـ tmp_path بقى «الـ home» والسكربت لازم يرفض (درس «monkeypatch»).

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
            "خلّي tmp_path هو الـ home.",
            "ملف قديم.",
            "لازم يرجع 2...",
            "...ومحدش اتمسح.",
            "أيام مش رقم:",
            "argparse بيخرج...",
            "...بـ main بأيام غلط.",
            "بكود 2.",
            "والرسالة على stderr."
          ],
          sol: R`[[python -m pytest -q]]: [[....]] و [[4 passed in 0.05s]].

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
          example: R`find . -type f -name '*.*' -not -path './.git/*' | sed 's/.*\.//' | sort | uniq -c | sort -rn | head -5
Get-ChildItem -Recurse -File | Group-Object Extension | Sort-Object Count -Descending | Select-Object -First 5 Count, Name
python3 -c "import collections, pathlib; print(collections.Counter(p.suffix.lower() for p in pathlib.Path('.').rglob('*.*') if p.is_file() and '.git' not in p.parts).most_common(5))"`,
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
            "bash: الملفات اللي ليها امتداد بره .git، خد الامتداد، عد، رتّب، أول 5.",
            "PowerShell: كل الملفات، جمّع بالامتداد، رتّب بالعدد، أول 5.",
            "Python: Counter على امتداد كل ملف (بحروف صغيرة) بره .git، أكتر 5."
          ],
          sol: R`على نفس الفولدر:

bash: [[3 py]] و [[2 md]] و [[1 PNG]] و [[1 png]] و [[1 jpg]]: حساس لحالة الحروف، فـ PNG و png اتعدوا لوحدهم. والـ Makefile مالوش امتداد فماتعدّش.

PowerShell: [[3 .py]] و [[2 .md]] و [[2 .PNG]] و [[1]] (اسم فاضي = Makefile) و [[1 .jpg]]. [[Group-Object]] مش حساس لحالة الحروف فجمع PNG و png، وعدّ Makefile بامتداد فاضي. وماحتاجش أقوله يسيب [[.git]]: [[Get-ChildItem]] من غير [[-Force]] مبيدخلش الحاجات المخفية.

Python: [[[('.py', 3), ('.md', 2), ('.png', 2), ('.jpg', 1)] ]]: الـ [[lower()]] جمع الاتنين، و [[rglob('*.*')]] ساب Makefile، و [[.git]] اتشال بالشرط.

التلاتة صح، بس كل واحد ليه افتراضات مختلفة. وده سبب إنك تختبر سكربت التنضيف على فولدر تجربة الأول، أيًا كانت اللغة.`
        }
      ]
    }
  ]
});
