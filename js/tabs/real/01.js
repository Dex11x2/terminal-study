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

TAB("real", {
  label: "من مشاريعي",
  prompt: "deploy@vps:~$ ",
  lab: R`mkdir -p ~/lab/real && cd ~/lab/real
nano deploy.sh
bash -n deploy.sh && shellcheck deploy.sh`,
  labText: "السكربتات هنا جاية من مشاريع حقيقية، والعناوين والمفاتيح فيها وهمية. قبل ما تشغّل أي واحد: اقراه، وافحصه بـ bash -n و shellcheck، وجرّبه على سيرفر التجربة.",
  levels: {
    "1": ["على جهازك", "تشغيل المشاريع وتجهيز بيئة التطوير"],
    "2": ["النشر", "تجهيز السيرفر، والنشر، و SSL، و Nginx"],
    "3": ["التشغيل والصيانة", "باك أب، و migrations، و CI، وسكربتات الإصلاح"]
  },
  categories: [
    {
      t: "تشغيل المشروع على جهازك",
      l: 1,
      n: "من أول git init لحد ما المشروع كله شغال في Docker على ويندوز",
      items: [
        {
          cmd: "SETUP: أول يوم",
          title: "بداية أي مشروع جديد: ريبو وقاعدة بيانات",
          desc: R`السلسلة اللي بتعملها أول يوم في أي مشروع ويب فيه قاعدة بيانات: Git، وريبو private على GitHub، وربط المشروع بـ Supabase، وتطبيق الـ schema بـ migrations بدل النسخ واللصق في SQL Editor.

الفكرة إن كل خطوة تتكرر على أي جهاز أو أي بيئة بنفس الأوامر، فزميلك (أو انت بعد شهرين) يقوم المشروع من غير ما يسألك.`,
          example: R`cd myapp
git init
git add .
git commit -m "Initial project setup"
git branch -M main
git remote add origin https://github.com/you/myapp.git
git push -u origin main
# Supabase CLI من npx، مش npm install -g
npx supabase login
npx supabase init
npx supabase link --project-ref PROJECT_REF
npx supabase migration new create_courses
npx supabase db push
# آخر اليوم
git add . && git commit -m "add courses table" && git push
git tag v0.1 && git push --tags`,
          try: "في فولدر تجربة اعمل ريبو private فاضي على GitHub واربطه بالخطوات دي، وبعدين اعمل migration فيها [[create table notes (id serial primary key, body text);]] وادفعها على مشروع Supabase تجريبي مش مشروع شغل.",
          flag: "script",
          deep: {
            why: "أول يوم بيحدد شكل المشروع كله. لو الـ schema اتعمل بإيدك في SQL Editor، مفيش حد يقدر يعيده على قاعدة تانية (staging أو جهاز زميلك)، ومحدش عارف إيه اللي اتطبق وإيه لأ. الـ migrations في git بتخلي قاعدة البيانات «كود» زي باقي المشروع.",
            how: R`الجزء الأول Git عادي: [[init]] و [[add]] و [[commit]]، و [[branch -M main]] بيسمّي الفرع main، و [[push -u]] بيربط الفرع المحلي بالريموت عشان [[git push]] بعد كده يبقى من غير أسامي.

[[npx supabase]] بيشغّل الـ CLI من غير تسطيب global. [[init]] بيعمل فولدر supabase/ فيه config، و [[link]] بيربطه بمشروعك على السحابة (بيسأل على باسورد القاعدة).

[[migration new create_courses]] بيعمل ملف فاضي اسمه بيبدأ بـ timestamp زي [[supabase/migrations/20260503120000_create_courses.sql]]. تكتب فيه الـ SQL، و [[db push]] بيطبق الملفات اللي لسه متطبقتش بالترتيب، وبيسجلها في جدول جوه القاعدة عشان ميطبقهاش تاني.

ولو مش عايز الـ CLI، psql يقدر يطبّق ملف رئيسي بيستدعي الباقي: [[psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f 00_run_all.sql]] وجواه سطور [[\ir 01_extensions.sql]]. بس ده مش بيسجّل إيه اتطبق.

و [[git tag]] بيحط علامة على نقطة مهمة (نسخة خلصت) ترجعلها بعدين.`,
            when: "أي مشروع جديد فيه قاعدة بيانات. الأوامر لوحدها في تاب Git وتاب PostgreSQL (درس «Supabase CLI»).",
            mistakes: R`في مشروع حقيقي كان دليل الإعداد بيقول [[npm install -g supabase]]، ودي طريقة مش مدعومة (استخدم npx أو scoop أو brew).

وكانت ملفات الـ SQL في [[database/migrations]] بأسماء 01 و 02، و [[supabase db push]] مش بيشوفها أصلًا: لازم تبقى في [[supabase/migrations]] وأساميها timestamp.

وكان فيه ملف [[00_run_all.sql]] مكتوب إنه «للـ SQL Editor» وهو مليان [[\i]]، ودي أوامر psql بس، فبيفشل هناك. وأمر [[cat 0*.sql]] اللي بيجمّع الملفات كان بيدخّل 00_run_all نفسه في الناتج.

والـ project ref كان مكتوب في README. مش سر، بس بيكشف مشروعك لأي حد يشوف الريبو، فخليه في .env.`
          },
          lines: [
            "ادخل فولدر المشروع.",
            "ابدأ ريبو Git جديد.",
            "جهّز كل الملفات للـ commit.",
            "أول commit.",
            "سمّي الفرع main.",
            "اربط الريبو بريموت على GitHub (اعمله private الأول من الموقع).",
            "ارفع، و [[-u]] يفتكر الربط.",
            "سجّل دخول Supabase من المتصفح.",
            "اعمل فولدر supabase/ بالإعدادات.",
            "اربط الفولدر بمشروعك على السحابة.",
            "ملف migration جديد باسم بيبدأ بـ timestamp.",
            "طبّق كل الـ migrations اللي لسه متطبقتش.",
            "تقفيلة اليوم: commit ورفع في سطر.",
            "علامة على نسخة، وارفع العلامات."
          ],
          sol: R`الجزء بتاع Git: بعد [[git push -u origin main]] هتلاقي [[branch 'main' set up to track 'origin/main']] والملفات ظاهرة في الريبو على GitHub. لو ظهر [[rejected ... (fetch first)]] يبقى الريبو على GitHub مش فاضي (عملته بـ README)، اعمله فاضي خالص أو اعمل [[git pull --rebase origin main]] الأول.

جزء Supabase: [[npx supabase init]] بيعمل فولدر [[supabase/]] فيه [[config.toml]]. [[npx supabase migration new create_courses]] بيعمل ملف فاضي اسمه زي [[supabase/migrations/20260930081500_create_courses.sql]]، اكتب فيه [[create table notes (id serial primary key, body text);]]. [[npx supabase db push]] بيوريك الملفات اللي هتتطبّق ويسألك تأكيد، وبعدها الجدول بيظهر في Table Editor في الداشبورد.

لو [[db push]] قال [[Cannot find project ref]] يبقى نسيت [[link]]. ولو طلب باسورد، ده باسورد قاعدة المشروع (من Settings ثم Database) مش باسورد حسابك. واتأكد إنك عامل [[link]] على مشروع التجربة مش مشروع الشغل، لأن [[db push]] بيعدّل القاعدة الحقيقية. (ما قدرتش أجرّب جزء Supabase هنا لأنه محتاج حساب.)`
        },
        {
          cmd: "compose: Postgres محلي",
          title: "قاعدة بيانات للتطوير نفسها عند كل الفريق",
          desc: R`ملف compose فيه Postgres بس، وخمس أوامر لأول تشغيل بعد الـ clone. محدش محتاج يسطّب Postgres على جهازه، والكل عنده نفس النسخة، والبيانات محفوظة في volume.

البورت 5433 على [[127.0.0.1]] بس، عشان ميتخانقش مع أي Postgres متسطّب على الجهاز، ومحدش على الشبكة يوصله.`,
          example: R`# docker-compose.yml
services:
  db:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_USER: myapp
      POSTGRES_PASSWORD: change-me-dev-only
      POSTGRES_DB: myapp
    ports:
      - "127.0.0.1:5433:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U myapp -d myapp"]
      interval: 5s
      retries: 10
volumes:
  pgdata:
# أول مرة بعد الـ clone:
docker compose up -d --wait
cd web
pnpm install
cp .env.example .env
pnpm prisma migrate dev
pnpm dev`,
          try: "احفظ الملف في فولدر تجربة وشغّل [[docker compose up -d --wait]]، وبعدين ادخل بـ [[psql postgresql://myapp:change-me-dev-only@localhost:5433/myapp]] واعمل جدول. اعمل [[docker compose down]] و up تاني وتأكد إن الجدول لسه موجود.",
          flag: "script",
          deep: {
            why: "«سطّب Postgres 16 واعمل يوزر وقاعدة» خطوات بتاخد ساعة وكل واحد بيعملها بشكل مختلف. هنا الإعداد كله في ملف في الريبو، وأي حد يعمل clone يبقى عنده نفس القاعدة في دقيقة.",
            how: R`[[image: postgres:16-alpine]] نسخة ثابتة، مش latest، عشان الكل على نفس الإصدار. متغيرات [[POSTGRES_*]] بتعمل اليوزر والقاعدة أول مرة بس (لما الـ volume فاضي).

[[127.0.0.1:5433:5432]]: على جهازك 5433، جوه الـ container 5432. فالـ DATABASE_URL في .env بيبقى [[postgresql://myapp:...@localhost:5433/myapp]].

الـ volume [[pgdata]] هو اللي بيحفظ البيانات، فـ [[down]] و [[up]] مبيمسحوش حاجة (إلا لو [[down -v]]).

الـ healthcheck بيشغّل [[pg_isready]] كل ٥ ثواني، و [[up --wait]] بيستنى لحد ما يقول healthy. من غيره [[prisma migrate dev]] ممكن يشتغل والقاعدة لسه بتقوم ويفشل بـ connection refused.

وبعدين: [[pnpm install]]، ونسخة .env من المثال، و [[prisma migrate dev]] بيطبّق الـ migrations على القاعدة الفاضية، و [[pnpm dev]] يشغّل الموقع.`,
            when: "أي مشروع بيستخدم Postgres. نفس الفكرة لـ Redis أو Mongo. الأوامر لوحدها في تاب Docker وتاب PostgreSQL.",
            mistakes: R`في مشروع حقيقي كان البورت [[5432:5432]] على كل الواجهات، فبيتخانق مع Postgres متسطّب على ويندوز (compose يفشل بـ port is already allocated)، وكمان القاعدة بتبقى مفتوحة لأي حد على نفس الواي فاي.

وكان فيه package.json في جذر الريبو فيه dependency تايهة (نسخة من اللي في web/)، فـ [[pnpm install]] من الجذر بيعمل node_modules في المكان الغلط. شغّل الأوامر من web/.

وأكتر من ١٠٠ screenshot في جذر الريبو. متجاهلة في git بس زحمة، حطها في فولدر لوحدها.`
          },
          lines: [
            "الخدمات اللي في الملف.",
            "خدمة اسمها db.",
            "Postgres 16 بالنسخة الصغيرة.",
            "يقوم لوحده بعد restart الجهاز إلا لو وقفته بإيدك.",
            "متغيرات بتتقري أول مرة بس.",
            "اسم اليوزر.",
            "باسورد للتطوير بس، مش للإنتاج.",
            "اسم القاعدة.",
            "البورتات.",
            "5433 على جهازك بس، يروح لـ 5432 جواه.",
            "الـ volumes.",
            "البيانات تعيش في volume اسمه pgdata.",
            "فحص الصحة.",
            "الأمر اللي بيقول القاعدة جاهزة ولا لأ.",
            "كل ٥ ثواني.",
            "ولحد ١٠ محاولات قبل ما يعتبرها unhealthy.",
            "تعريف الـ volumes المسمّاة.",
            "volume البيانات.",
            "شغّل واستنى لحد ما يبقى healthy.",
            "ادخل فولدر التطبيق.",
            "سطّب المكتبات.",
            "اعمل .env من المثال (وعدّل الـ URL على 5433).",
            "طبّق الـ migrations على القاعدة الفاضية.",
            "شغّل الموقع."
          ],
          sol: R`جربته بالظبط. [[docker compose up -d --wait]] استنى لحد ما ظهر [[Container pg-db-1 Healthy]] (ده شغل الـ healthcheck مع [[--wait]]). بعدها:

[[psql postgresql://myapp:change-me-dev-only@localhost:5433/myapp -c "create table notes(...); insert ..."]] رجّع [[CREATE TABLE]] و [[INSERT 0 1]]. بعد [[docker compose down]] و [[up -d --wait]] تاني، [[table notes]] رجّع نفس الصف. البيانات فضلت لأنها في الـ volume [[pgdata]] مش جوه الـ container.

لو الجدول اختفى، غالبًا عملت [[docker compose down -v]]: الـ [[-v]] بيمسح الـ volumes. ولو psql قال [[Connection refused]] بص على البورت: [[5433]] على جهازك بيروح لـ [[5432]] جوه الـ container. ولو [[password authentication failed]] والباسورد صح، يبقى الـ volume متعمل قبل كده بباسورد تاني. [[POSTGRES_PASSWORD]] بيتقري أول مرة بس، فلازم [[down -v]] (وده بيمسح الداتا).`
        },
        {
          cmd: "compose: نسخة تانية",
          title: "نسختين من نفس المشروع شغالين جنب بعض",
          desc: R`محتاج تشغّل نسخة تانية من المشروع (عميل تاني أو فرع تاني) من غير ما توقف الأولى. اللي لازم يختلف: بورتات جهازك، واسم المشروع (عشان الـ containers والشبكة والـ volumes متتلخبطش). البورتات جوه الـ containers تفضل زي ما هي.

[[name:]] في أول الملف بتعمل ده كله: الـ containers بتتسمّى [[myapp2-backend-1]]، والشبكة [[myapp2_default]] لوحدها.`,
          example: R`# docker-compose.second.yml
#   docker compose -f docker-compose.second.yml up -d --build
#   docker compose -f docker-compose.second.yml logs -f backend
#   docker compose -f docker-compose.second.yml down
name: myapp2
services:
  redis:
    image: redis:7-alpine
    healthcheck: { test: ["CMD", "redis-cli", "ping"], interval: 10s, retries: 5 }
  backend:
    build: { context: ./backend, dockerfile: Dockerfile.dev }
    ports: ["3001:3000"]
    env_file: [./backend/.env]
    depends_on: { redis: { condition: service_healthy } }
    volumes: ["./backend/src:/app/src"]
  frontend:
    build: { context: ./frontend, dockerfile: Dockerfile.dev }
    ports: ["5174:5173"]
    environment:
      - VITE_API_BASE_URL=http://localhost:3001`,
          try: "شغّل مشروع compose عندك، وبعدين اعمل [[docker compose -p myapp2 up -d]] من نفس الفولدر بعد ما تغيّر البورتات في ملف override. اعمل [[docker ps]] وشوف المجموعتين شغالين.",
          flag: "script",
          deep: {
            why: "compose بيسمّي كل حاجة باسم الفولدر. لو شغّلت نفس الملف مرتين من نفس الفولدر، المرة التانية هتعدّل على الأولى بدل ما تعمل نسخة. ولو غيّرت الفولدر بس، البورتات هتتخانق.",
            how: R`اسم المشروع (project name) هو البادئة لكل حاجة compose بيعملها. [[name: myapp2]] في الملف، أو [[-p myapp2]] في الأمر، بيخلي النسختين منفصلين تمامًا: containers وشبكة و volumes.

redis من غير [[ports:]] خالص، يعني مش مكشوف على جهازك، والـ backend بيوصله بالاسم [[redis]] جوه شبكة المشروع.

البورتات: [[3001:3000]] يعني جهازك 3001 والتطبيق جواه لسه على 3000. والـ frontend لازم يعرف إن الـ API بقى على 3001، عشان كده [[VITE_API_BASE_URL]].

[[depends_on]] مع [[service_healthy]] بيخلي الـ backend يستنى لحد ما redis يرد على ping.

وبديل أقصر من نسخ الملف كله: ملف override فيه البورتات بس، وتشغّل [[docker compose -p myapp2 -f docker-compose.yml -f ports.second.yml up -d]].`,
            when: "تجربة فرع جنب الشغال، أو نسختين لعميلين على نفس الجهاز. الأوامر لوحدها في تاب Docker.",
            mistakes: R`في مشروع حقيقي كان الملف فيه [[image: myapp2-frontend:dev]] من غير [[build:]]، فعلى أي جهاز جديد بيفشل لحد ما حد يبني الـ image بإيده. استخدم build.

وكان فيه [[container_name]] ثابت لكل خدمة. ده بيمنع تشغيل نسخة تالتة، ولو نسيت تغيّره في النسخة التانية compose يرفض يقوم لأن الاسم محجوز. سيبه يتسمّى لوحده من اسم المشروع.`
          },
          lines: [
            "اسم المشروع: البادئة لكل الـ containers والشبكة.",
            "الخدمات.",
            "redis.",
            "صورة redis الصغيرة.",
            "فحص صحة بـ ping، ومن غير ports يعني مش مكشوف.",
            "الـ backend.",
            "يتبني من Dockerfile.dev في فولدره.",
            "جهازك 3001 بدل 3000 عشان النسخة الأولى.",
            "متغيرات البيئة من ملف.",
            "يستنى لحد ما redis يبقى healthy.",
            "الكود من جهازك جوه الـ container للـ hot reload.",
            "الـ frontend.",
            "يتبني بنفس الطريقة.",
            "جهازك 5174 بدل 5173.",
            "متغيرات البيئة.",
            "الـ API بتاع النسخة دي على 3001."
          ],
          sol: R`اسم المشروع هو اللي بيفرق بين المجموعتين. جربتها بـ service واحد: [[docker compose up -d]] من فولدر [[two]] عمل [[two-web-1]]، و [[docker compose -p myapp2 up -d]] من نفس الفولدر بعد تغيير البورت عمل [[myapp2-web-1]]. [[docker ps]] وراهم الاتنين شغالين:

[[myapp2-web-1   127.0.0.1:8102->80/tcp]]
[[two-web-1      127.0.0.1:8101->80/tcp]]

كل مشروع ليه containers و network و volumes منفصلين، فالداتا مش بتتخلط. لما جربت [[-p myapp2]] من غير ما أغيّر البورت، فشل بـ [[Bind for 127.0.0.1:8101 failed: port is already allocated]]، وده السبب إن الملف التاني في الدرس فيه بورتات مختلفة ([[3001]] و [[5174]]) و [[name: myapp2]].

خد بالك إن كل أمر بعد كده لازم يبقى معاه نفس [[-p]] أو [[-f]]. [[docker compose down]] من غيره بيقفل النسخة الأولى مش التانية. و [[docker compose ls]] بيوريك كل المشاريع الشغالة.`
        },
        {
          cmd: "Next.js dev في Docker",
          title: "بيئة تطوير Next.js جوه container على ويندوز",
          desc: R`تلات مشاكل مشهورة لما تشغّل Next.js dev جوه Docker على ويندوز: node_modules بتاعة ويندوز بتبوّظ الـ container، والـ hot reload مبيحسش بالتعديلات، والسيرفر بيسمع على localhost جوه الـ container فمحدش يوصله.

الملفات دي بتحلهم التلاتة، ومعاهم ملف للإنتاج البورت فيه على [[127.0.0.1]] بس عشان Nginx اللي على السيرفر هو اللي يوصله.`,
          example: R`# Dockerfile.dev
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]
# docker-compose.yml (للتطوير)
services:
  web:
    build: { context: ., dockerfile: Dockerfile.dev }
    ports: ["3002:3000"]
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    environment:
      - WATCHPACK_POLLING=true
      - CHOKIDAR_USEPOLLING=true
    restart: unless-stopped
# docker-compose.prod.yml (على السيرفر)
services:
  web:
    build: .
    ports: ["127.0.0.1:3010:3000"]
    env_file: [.env]
    restart: unless-stopped
# بعد ما تضيف مكتبة جديدة:
docker compose up -d --build -V`,
          try: "في مشروع Next.js تجريبي اعمل الملفين وشغّل [[docker compose up -d --build]]، وافتح localhost:3002، وعدّل كلمة في الصفحة واحفظ. لو اتغيرت من غير refresh يدوي، الـ polling شغال.",
          flag: "script",
          deep: {
            why: "الـ bind mount بيحط فولدر المشروع كله جوه الـ container، بما فيه node_modules اللي اتسطبت على ويندوز. مكتبات زي sharp و esbuild فيها ملفات مبنية لويندوز ومش هتشتغل على لينكس. وملفات ويندوز لما تتغير مبتبعتش إشعار للـ container، فـ Next مش بيعيد البناء.",
            how: R`[[- .:/app]] بيحط الكود بتاعك جوه [[/app]]، فأي تعديل يبان فورًا.

[[- /app/node_modules]] volume مجهول: بيغطي على node_modules اللي جت من جهازك، فالـ container يشوف اللي [[npm ci]] سطّبه جوه الـ image (نسخة لينكس). ونفس الفكرة لـ [[.next]] عشان الكاش بتاع ويندوز ولينكس ميتخلطوش.

[[WATCHPACK_POLLING]] (اللي Next بيستخدمه) و [[CHOKIDAR_USEPOLLING]] (أدوات تانية) بيخلوا المراقب يفحص الملفات كل شوية بدل ما يستنى إشعار مش هييجي.

[[-H 0.0.0.0]] بيخلي سيرفر Next يسمع على كل الواجهات جوه الـ container. لو سمع على localhost بتاعه، الـ port mapping مش هيوصله.

في الإنتاج مفيش mount: [[build: .]] من الـ Dockerfile العادي (standalone)، والبورت [[127.0.0.1:3010]] بيخلي Nginx على نفس السيرفر بس يوصله.

و [[-V]] (renew anon volumes) بيعمل الـ volumes المجهولة من جديد، عشان node_modules الجديدة من الـ image تظهر.`,
            when: "لما عايز الفريق كله على نفس نسخة Node، أو المشروع محتاج خدمات تانية في compose. لو لوحدك ومعاك Node، [[npm run dev]] مباشرة أسرع. تفاصيل Docker على ويندوز في تاب Docker وتاب WSL.",
            mistakes: R`في مشروع حقيقي بعد [[npm install]] لمكتبة جديدة الموقع فضل يقول Module not found: الـ volume المجهول لسه فيه node_modules القديمة. الحل [[up -d --build -V]].

وكان فيه [[container_name]] ثابت، فمينفعش تشغّل نسختين. و [[COPY . .]] في Dockerfile.dev ملوش لازمة مع الـ bind mount (بيبطّأ الـ build بس)، فاتشال هنا.

ولو الـ hot reload بطيء جدًا على ويندوز: حط المشروع جوه WSL (مش على C:) والـ polling مش هيبقى محتاج أصلًا.`
          },
          lines: [
            "صورة Node 20 الصغيرة.",
            "فولدر الشغل.",
            "ملفات المكتبات بس.",
            "سطّب نسخة لينكس من المكتبات جوه الـ image.",
            "شغّل dev وخليه يسمع على كل الواجهات.",
            "الخدمات.",
            "خدمة web.",
            "ابني من Dockerfile.dev.",
            "جهازك 3002 للموقع.",
            "الـ volumes.",
            "الكود من جهازك.",
            "node_modules بتاعة لينكس تغطي على بتاعة ويندوز.",
            "كاش .next منفصل.",
            "متغيرات البيئة.",
            "Next يفحص الملفات بنفسه.",
            "وأي أداة بتستخدم chokidar.",
            "يقوم لوحده بعد restart.",
            "ملف الإنتاج: الخدمات.",
            "خدمة web.",
            "ابني من الـ Dockerfile العادي.",
            "على 127.0.0.1 بس: Nginx يوصله، النت لأ.",
            "الأسرار من .env على السيرفر.",
            "يقوم لوحده.",
            "ابني تاني وجدّد الـ volumes المجهولة."
          ],
          sol: R`بعد [[docker compose up -d --build]] افتح [[http://localhost:3002]] هتلاقي صفحة Next.js. اللوج ([[docker compose logs -f web]]) لازم يقول [[Ready]] و [[Local: http://0.0.0.0:3000]]. الـ [[-H 0.0.0.0]] ضروري: من غيره Next بيسمع على localhost جوه الـ container بس، والمتصفح يقولك [[ERR_EMPTY_RESPONSE]].

عدّل كلمة في [[app/page.tsx]] واحفظ: خلال ثانية أو اتنين الصفحة بتتحدّث لوحدها، وفي اللوج [[Compiled]]. ده بسبب [[WATCHPACK_POLLING=true]]، لأن الملفات جاية من ويندوز عبر bind mount و inotify مش بيوصل، فـ Next لازم يسأل على الملفات بنفسه كل شوية.

لو التعديل ماظهرش غير بعد restart، الـ polling مش شغال (اتأكد من المتغيرات في [[docker compose exec web env]]). ولو ضفت مكتبة وطلع [[Module not found]]، ده عشان [[/app/node_modules]] volume قديم: [[docker compose up -d --build -V]] بيعمله من جديد. (ما شغّلتش Next.js هنا، الوصف من سلوك الإعداد ده المعروف.)`
        },
        {
          cmd: "verify-docker.ps1",
          title: "فحص قبل ما تشغّل المشروع على ويندوز",
          desc: R`سكربت PowerShell تشغّله أول ما تقعد: يتأكد إن Docker Desktop شغال، والبورتات فاضية، وبعدين يبني ويشغّل ويستنى لحد ما الخدمات تبقى healthy فعلًا، ولو فشل يطبع الحالة وآخر اللوجات.

ده النسخة المصلّحة. الأصلي كان فيه ست غلطات، مكتوبة تحت.`,
          example: R`# verify-docker.ps1
Set-Location $PSScriptRoot
docker info *> $null
if ($LASTEXITCODE -ne 0) { Write-Host "Docker Desktop is not running." -ForegroundColor Red; exit 1 }
$ErrorActionPreference = "Stop"
foreach ($port in 3000, 8000, 5433, 6379) {
    if (Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue) {
        Write-Warning "Port $port is already in use."
    }
}
Write-Host "Starting stack..." -ForegroundColor Cyan
docker compose up -d --build --wait --wait-timeout 120
if ($LASTEXITCODE -ne 0) {
    docker compose ps
    docker compose logs --tail 50
    throw "Stack failed to become healthy."
}
docker compose ps
Write-Host "Done! http://localhost:8000" -ForegroundColor Green`,
          try: "حط السكربت جنب docker-compose.yml في أي مشروع، وقفّل Docker Desktop وشغّله: لازم يقولك إن Docker مش شغال. شغّل Docker، وافتح حاجة على بورت 3000، وشغّله تاني وشوف التحذير.",
          flag: "script",
          deep: {
            why: "أغلب أخطاء «المشروع مش بيقوم» الصبح سببها واحد من تلاتة: Docker Desktop لسه مقامش، أو بورت محجوز من برنامج تاني، أو خدمة قامت ووقعت. السكربت بيكشفهم بالترتيب ويقولك السبب بدل رسالة compose الطويلة.",
            how: R`[[$PSScriptRoot]] هو فولدر السكربت نفسه، فيشتغل من أي مكان تشغّله منه.

[[docker info *> $null]] بيرمي كل المخرجات، والمهم [[$LASTEXITCODE]]: رقم خروج آخر برنامج خارجي. أي حاجة غير 0 يبقى Docker مش بيرد.

[[$ErrorActionPreference = "Stop"]] بعد فحص docker info مش قبله: في Windows PowerShell 5.1، أي برنامج خارجي بيكتب على stderr مع redirect و Stop بيتحوّل لخطأ يوقف السكربت، حتى لو كان مجرد تحذير.

[[Get-NetTCPConnection -State Listen]] بيجيب البورتات اللي فيه برنامج سامع عليها فعلًا.

[[up --wait --wait-timeout 120]] بيستنى لحد ما كل خدمة فيها healthcheck تبقى healthy (أو ١٢٠ ثانية)، ولو فشل الـ exit code مش صفر، فنطبع [[ps]] وآخر ٥٠ سطر لوج ونوقف بـ [[throw]].`,
            when: "أي مشروع compose على ويندوز بتشغّله كل يوم. الأوامر لوحدها في تاب PowerShell وتاب Docker.",
            mistakes: R`في مشروع حقيقي كان السكربت متنسخ بين مشروعين وفيه مسار مطلق لمشروع تالت، فكان بيبني المشروع الغلط. [[$PSScriptRoot]] بدل أي مسار ثابت.

وكان فيه سطر فيه مسار الفولدر لوحده من غير [[Set-Location]]، فـ PowerShell بيحاول ينفّذه كأمر ويقع، ومع Stop السكربت كله يقف.

وكان بيدوّر على فولدر dist مع إن الـ Dockerfile multi-stage بيبنيه بنفسه، وبيستخدم [[docker-compose]] القديم (v1)، و [[Start-Sleep 10]] بدل [[--wait]] (يا إما بيستنى زيادة يا إما أقل من اللازم).

و [[Get-NetTCPConnection]] من غير [[-State Listen]] كان بيطلع إنذارات كاذبة من اتصالات TIME_WAIT قديمة. والإيموجي في Write-Host بتطلع رموز غريبة في 5.1 لو الملف مش محفوظ UTF-8 with BOM.`
          },
          lines: [
            "اشتغل من فولدر السكربت، مش من مكان ثابت.",
            "اسأل Docker، وارمي المخرجات.",
            "لو مردّش: رسالة واضحة واخرج.",
            "من هنا أي خطأ يوقف السكربت.",
            "لف على البورتات اللي المشروع محتاجها.",
            "فيه برنامج سامع على البورت ده؟",
            "حذّر (ممكن يبقى نسخة قديمة من نفس المشروع).",
            "قفلة الـ if.",
            "قفلة الـ foreach.",
            "رسالة بداية.",
            "ابني وشغّل واستنى الـ healthchecks لحد دقيقتين.",
            "لو فشل:",
            "اعرض حالة كل خدمة.",
            "وآخر ٥٠ سطر لوج.",
            "ووقّف برسالة.",
            "قفلة الـ if.",
            "الحالة النهائية.",
            "الرابط."
          ],
          sol: R`وDocker Desktop مقفول، السكربت بيوقف عند أول سطر ويطبع بالأحمر [[Docker Desktop is not running.]] والـ exit code [[1]]. لاحظ إن [[docker info]] بيتنفّذ قبل [[$ErrorActionPreference = "Stop"]] عشان فشله مايرميش exception، وبنقرا [[$LASTEXITCODE]] بنفسنا.

لو في حاجة تانية فاتحة 3000 (زي [[npx serve -l 3000]])، هيطلع تحذير أصفر [[WARNING: Port 3000 is already in use.]] ويكمّل. بعدها [[docker compose up --wait]] هيفشل غالبًا بـ [[port is already allocated]]، فالسكربت هيطبع [[docker compose ps]] وآخر ٥٠ سطر لوج ويرمي [[Stack failed to become healthy.]]. ولو كله تمام، هتلاقي [[Done! http://localhost:8000]] بالأخضر.

لو PowerShell رفض يشغّله بـ [[running scripts is disabled]] شغّله بـ [[powershell -ExecutionPolicy Bypass -File .\verify-docker.ps1]]. (ما جربتوش لأن مفيش PowerShell ولا Docker Desktop هنا.)`
        }
      ]
    },
    {
      t: "الواجهة والتطبيقات",
      l: 1,
      n: "screenshots بكل المقاسات، و Electron على ويندوز، و APK من موقع React",
      items: [
        {
          cmd: "PWA محلي + screenshots",
          title: "تجرّب PWA على جهازك وتصوّرها بكل المقاسات",
          desc: R`الـ service worker مبيشتغلش من [[file://]]، فالـ PWA لازم تتفتح من سيرفر حتى وانت بتجرّب. [[python -m http.server]] كفاية.

وبدل ما تغيّر حجم المتصفح بإيدك، Playwright بيصوّر الصفحة بأي مقاس في أمر واحد، فتقارن الموبايل والتابلت والديسكتوب جنب بعض.`,
          example: R`# 1) سيرفر static (الـ service worker مبيشتغلش من file://)
cd site
python -m http.server 8791
# 2) من ترمنال تاني
npx playwright install chromium
npx playwright screenshot --viewport-size "1440,900" http://localhost:8791 shot-desktop.png
npx playwright screenshot --viewport-size "800,1000" http://localhost:8791 shot-tablet.png
npx playwright screenshot --viewport-size "390,844" --full-page http://localhost:8791 shot-mobile.png
echo "shot-*.png" >> .gitignore
# 3) لو الصفحة لسه قديمة بعد التعديل، من Console في المتصفح:
# navigator.serviceWorker.getRegistrations().then(rs => rs.forEach(r => r.unregister()))`,
          try: "اعمل فولدر فيه index.html بسيط وشغّل السيرفر، وصوّره بالتلات مقاسات وافتح الصور جنب بعض. بعدين غيّر الـ viewport لـ 360,640 (موبايل صغير) وشوف إيه اللي اتكسر.",
          deep: {
            why: "الـ PWA (manifest و sw.js) بتخلي الموقع يتسطّب زي تطبيق ويشتغل من غير نت. بس المتصفح مش بيسجّل service worker غير على https أو localhost، فلازم سيرفر. والتأكد إن التصميم سليم على كل مقاس بإيدك ممل وبيتنسي.",
            how: R`[[python -m http.server 8791]] سيرفر static من الفولدر الحالي، مفيش تسطيب. بعدها DevTools ← Application بيوريك الـ Manifest والـ Service Workers وهل اتسجلوا.

[[npx playwright install chromium]] بينزّل متصفح Chromium خاص بـ Playwright مرة واحدة.

[[playwright screenshot]] بيفتح الصفحة في متصفح من غير شاشة بالمقاس اللي في [[--viewport-size]] ويحفظ صورة. و [[--full-page]] بيصوّر الصفحة كلها بالطول مش اللي باين بس.

والـ service worker بيفضل ماسك النسخة القديمة من الملفات. الكود اللي في آخر المثال بيلغي تسجيله من Console، والحل الدائم إنك تغيّر اسم الكاش في sw.js مع كل نسخة.`,
            when: "أي موقع قبل ما ترفعه، وأي PWA وانت بتطوّرها. أوامر Python لوحدها في تاب Python، والـ DevTools في تاب المتصفح.",
            mistakes: R`في مشروع حقيقي كان sw.js بيستخدم cache-first لكل حاجة، فأي تعديل في index.html مش بيوصل للزوار إلا لو اسم الكاش اتغيّر ([[const CACHE = 'myapp-v2']]). اعمل HTML بـ network-first.

والأيقونات icon-192 و icon-512 اللي في الـ manifest مكانتش موجودة، والـ Console كان بيطلع 404 عليها وعلى favicon، فالموقع مش بيتسطّب. ووسم [[apple-mobile-web-app-capable]] قديم.

والفولدر كان مليان عشرات الـ screenshots جنب الكود. حطهم في فولدر لوحدهم أو في .gitignore.`
          },
          lines: [
            "ادخل فولدر الموقع.",
            "سيرفر static على 8791.",
            "نزّل المتصفح بتاع Playwright (مرة واحدة).",
            "صورة بمقاس ديسكتوب.",
            "صورة بمقاس تابلت.",
            "صورة موبايل بطول الصفحة كلها.",
            "متدخّلش الصور في git."
          ],
          sol: R`جربت الـ [[npx playwright screenshot]] على سيرفر محلي وطبع [[Navigating to http://localhost:8791]] و [[Capturing screenshot into shot-mobile.png]]. هتلاقي ٣ صور: [[shot-desktop.png]] بـ 1440×900، و [[shot-tablet.png]] بـ 800×1000، و [[shot-mobile.png]] بعرض 390 وطول الصفحة كلها (بسبب [[--full-page]]).

على 360×640 اللي بيتكسر عادةً: عنصر بعرض ثابت بيعمل سكرول أفقي، عنوان طويل بيخرج بره الشاشة، أزرار جنب بعض بتتزنق، أو صورة من غير [[max-width: 100%]]. ولو الصفحة كلها طالعة صغيرة جدًا، يبقى ناقص [[<meta name="viewport" content="width=device-width, initial-scale=1">]].

لو طلع [[Executable doesn't exist]] يبقى نسيت [[npx playwright install chromium]]. و [[echo "shot-*.png" >> .gitignore]] عشان الصور ماتترفعش. ولو عدّلت الصفحة وفضلت شايف القديم في المتصفح، ده الـ service worker، والسطر اللي في آخر المثال بيشيله.`
        },
        {
          cmd: "shots.ps1",
          title: "صوّر صفحات موقعك بـ Chrome من غير أي مكتبة",
          desc: R`Chrome نفسه يقدر يصوّر صفحة من غير ما يفتح شباك: [[--headless=new]] و [[--screenshot]]. السكربت ده بيعدّي على قايمة صفحات، كل واحدة بطول مختلف، ويقولك أنهي صورة نجحت.

مفيش npm install ولا Playwright، و Chrome موجود أصلًا. ومعاه تتعلم hashtables و foreach و [[Start-Process -Wait]] في شغل حقيقي.`,
          example: R`$outDir = Join-Path $env:TEMP "shots"
New-Item -ItemType Directory -Force $outDir | Out-Null
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chrome)) { $chrome = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" }
$targets = @(
  @{ file = "01_home.png";     url = "http://localhost:3000/";         h = 950 },
  @{ file = "02_checkout.png"; url = "http://localhost:3000/checkout"; h = 900 },
  @{ file = "03_contact.png";  url = "http://localhost:3000/contact";  h = 1000 }
)
foreach ($t in $targets) {
  $out = Join-Path $outDir $t.file
  Remove-Item $out -ErrorAction SilentlyContinue
  $chromeArgs = @("--headless=new", "--disable-gpu", "--no-first-run",
                  "--user-data-dir=$env:TEMP\shot-profile",
                  "--window-size=1440,$($t.h)", "--virtual-time-budget=4000",
                  "--screenshot=$out", $t.url)
  Start-Process $chrome -ArgumentList $chromeArgs -Wait
  if (Test-Path $out) { Write-Host "OK   $($t.file)" } else { Write-Host "FAIL $($t.file)" }
}
Invoke-Item $outDir`,
          try: "شغّل أي موقع على localhost:3000 وعدّل الـ targets لصفحاتك، وشغّل السكربت. بعدين غيّر 1440 لـ 390 وشوف نسخة الموبايل.",
          flag: "script",
          deep: {
            why: "محتاج صور لصفحاتك قبل الرفع، أو للـ README، أو تبعتها لعميل. تسطيب Playwright أو Puppeteer لحاجة زي دي تقيل، و Chrome على جهازك يقدر يعملها لوحده.",
            how: R`[[@( @{...}, @{...} )]] مصفوفة من hashtables: كل صفحة ليها اسم ملف ورابط وطول. و [[$t.file]] بيقرا القيمة من الـ hashtable.

[[--headless=new]] وضع headless الجديد (نفس محرك Chrome العادي). [[--user-data-dir]] بروفايل منفصل، فمش هيتخانق مع Chrome المفتوح عندك ولا يستخدم الـ extensions بتاعتك. [[--virtual-time-budget=4000]] بيدّي الصفحة ٤ ثواني «افتراضية» تحمّل الخطوط والصور والـ JavaScript قبل التصوير.

[[$($t.h)]] جوه string معناها «احسب التعبير ده وحطه هنا». من غير [[$( )]] PowerShell هيكتب [[$t]] وبعدين [[.h]] كنص.

[[Start-Process -Wait]] بيستنى Chrome يخلص قبل ما يكمّل، فـ [[Test-Path]] بعدها بيشوف الصورة فعلًا. و [[Invoke-Item]] بيفتح الفولدر في Explorer.`,
            when: "صور سريعة من غير تسطيب أي حاجة. لو محتاج تضغط زراير أو تسجّل دخول قبل الصورة، ده شغل Playwright. أساسيات PowerShell في تاب PowerShell.",
            mistakes: R`في مشروع حقيقي كانت المسارات كاملة فيها اسم اليوزر ([[C:\Users\you\...]])، فالسكربت ميشتغلش على جهاز تاني. [[$env:TEMP]] بدلها.

وكان [[--no-sandbox]] موجود، ومش محتاجه على ويندوز (ده بيقفل حماية).

ومكانش بيمسح الصورة القديمة قبل ما يصوّر، فلو التصوير فشل [[Test-Path]] بيلاقي الصورة القديمة ويقول OK. عشان كده [[Remove-Item]] الأول.

ونسخة تانية كانت بتشغّل Chrome بـ [[&]] من غير [[-Wait]] وبتعتمد على [[Start-Sleep]]. واسم المتغير كان [[$args]]، ودا متغير محجوز في PowerShell فيه arguments السكربت نفسه.`
          },
          lines: [
            "فولدر الصور في Temp، مش مسار فيه اسمك.",
            "اعمله لو مش موجود، واسكت.",
            "مكان Chrome العادي.",
            "ولو مش هناك، جرّب نسخة الـ 32 بت.",
            "قايمة الصفحات:",
            "الرئيسية بطول 950.",
            "صفحة الدفع.",
            "صفحة التواصل.",
            "قفلة القايمة.",
            "لف على كل صفحة.",
            "مسار الصورة.",
            "امسح القديمة عشان الفحص يبقى صادق.",
            "arguments بتاعة Chrome: من غير شباك.",
            "بروفايل منفصل.",
            "المقاس، ووقت للتحميل.",
            "فين يحفظ، وأي رابط.",
            "شغّل Chrome واستنى يخلص.",
            "الصورة اتعملت؟",
            "قفلة الـ foreach.",
            "افتح الفولدر."
          ],
          sol: R`السكربت بيطبع سطر لكل صفحة: [[OK   01_home.png]] لو الصورة اتعملت، و [[FAIL ...]] لو لأ، وفي الآخر بيفتح فولدر [[%TEMP%\shots]]. كل صورة عرضها 1440 وطولها الـ [[h]] اللي في الـ target.

لما تغيّر [[1440]] لـ [[390]] هتاخد نسخة الموبايل، بس خد بالك إن [[--window-size]] بيغيّر حجم النافذة بس، مش بيعمل device emulation كامل (مفيش touch ولا user agent موبايل). فالنتيجة قريبة من Device Toolbar على Responsive، مش iPhone حقيقي.

لو كل الصفحات طلعت FAIL، غالبًا مسار Chrome غلط (غيّر [[$chrome]]) أو Chrome مفتوح بنفس الـ profile. ولو الصورة بيضا أو ناقصة، زوّد [[--virtual-time-budget]] عشان JavaScript يلحق يرسم، أو الموقع مش شغال على 3000. (ما جربتوش هنا لأنه PowerShell و Chrome على ويندوز.)`
        },
        {
          cmd: "launch.sh / launch.bat",
          title: "زرار تشغيل لتطبيق Electron على لينكس وويندوز",
          desc: R`نفس المنطق بلغتين: اتأكد إن Node موجود و .env موجود، سطّب المكتبات أول مرة، ابني الواجهة لو الكود أحدث من آخر build، وشغّل Electron.

مقارنة مباشرة بين bash و batch: [[test -f .env]] قصاد [[if not exist .env]]، و [[||]] في الاتنين معناها «لو فشل».`,
          example: R`#!/usr/bin/env bash
# launch.sh (لينكس)
set -euo pipefail
cd "$(dirname "$0")"
command -v node >/dev/null || { echo "install Node first"; exit 1; }
[ -f .env ] || { echo ".env missing: cp .env.example .env"; exit 1; }
[ -d node_modules ] || npm install
SB=node_modules/electron/dist/chrome-sandbox
if [ "$(stat -c '%u %a' "$SB")" != "0 4755" ]; then
  sudo chown root:root "$SB" && sudo chmod 4755 "$SB"
fi
if [ ! -f dist/index.html ] || [ -n "$(find src -newer dist/index.html -print -quit)" ]; then
  npx vite build
fi
exec npx electron .
REM launch.bat (ويندوز): نفس الخطوات
@echo off
cd /d "%~dp0"
where node >nul 2>&1 || ( echo install Node first & pause & exit /b 1 )
if not exist .env ( echo .env missing & pause & exit /b 1 )
if not exist node_modules ( call npm install || (pause & exit /b 1) )
call npx vite build || (pause & exit /b 1)
npx electron .`,
          try: "في مشروع Electron + Vite تجريبي حط الملفين، وشغّل launch.bat بدبل كليك. امسح .env وشغّله تاني وشوف الرسالة. على لينكس عدّل ملف في src ولاحظ إنه بيعيد البناء، وشغّله تاني من غير تعديل ولاحظ إنه مبيبنيش.",
          flag: "script",
          deep: {
            why: "تطبيق Electron محتاج كذا خطوة قبل ما يقوم (مكتبات، build للواجهة، .env). لو اعتمدت إنك فاكرها، هتنسى واحدة وتضيّع وقت على «شاشة بيضا». الـ launcher بيعملها بالترتيب ويقف برسالة واضحة.",
            how: R`[[cd "$(dirname "$0")"]] و [[cd /d "%~dp0"]] نفس الفكرة: ادخل فولدر السكربت نفسه، فالدبل كليك أو التشغيل من أي مكان يشتغل.

[[command -v node]] و [[where node]] بيدوّروا على البرنامج في PATH.

chrome-sandbox على لينكس لازم يبقى ملك root وعليه setuid ([[4755]])، وإلا Electron يرفض يقوم. [[stat -c '%u %a']] بيطبع رقم المالك والصلاحيات، فنصلّحهم مرة واحدة بس.

[[find src -newer dist/index.html -print -quit]] بيطبع أول ملف في src اتعدّل بعد آخر build ويقف. لو الناتج مش فاضي ([[-n]]) يبقى محتاج build.

[[exec]] بيستبدل الـ shell بـ Electron، فإشارة الإغلاق توصله هو مباشرة. وفي batch لازم [[call]] قبل npm و npx (دول ملفات .cmd) وإلا السكربت يخلص بعدهم ومايكملش.`,
            when: "أي تطبيق Electron أو أداة داخلية بتشغّلها كل يوم أو بتديها لحد مش مبرمج. أساسيات bash و CMD في تاباتهم، و Electron نفسه في تاب Desktop و Mobile.",
            mistakes: R`في مشروع حقيقي كانت نسخة bash من غير [[set -e]]، ولو node_modules مش موجودة مكانتش بتعمل [[npm install]]، فأول تشغيل على جهاز جديد يقع.

وفحص «الكود أحدث من الـ build» كان [[-nt]] على ملفين بس، فتعديل أي ملف تاني في src ميعملش rebuild والتطبيق يفضل قديم. [[find -newer]] بيشوف الفولدر كله.

والنسخة الـ bat كانت بتبني أول مرة بس، وبعد كده عمرها ما بتعيد البناء. هنا بتبني كل مرة (Vite سريع). ومكانش فيه فحص إن Node متسطب أصلًا.`
          },
          lines: [
            "وقّف عند أي خطأ أو متغير مش معرّف.",
            "ادخل فولدر السكربت.",
            "Node موجود؟",
            ".env موجود؟",
            "سطّب المكتبات لو مش موجودة.",
            "مسار chrome-sandbox.",
            "لو مش ملك root بصلاحية 4755:",
            "صلّحه (sudo مرة واحدة).",
            "قفلة الـ if.",
            "مفيش build، أو فيه ملف في src أحدث منه:",
            "ابني الواجهة.",
            "قفلة الـ if.",
            "شغّل Electron مكان الـ shell.",
            "اخفي الأوامر نفسها من الشاشة.",
            "ادخل فولدر السكربت (حتى لو على درايف تاني).",
            "Node موجود؟",
            ".env موجود؟",
            "سطّب أول مرة.",
            "ابني الواجهة.",
            "شغّل Electron."
          ],
          sol: R`من غير [[.env]]، [[launch.bat]] بيطبع [[.env missing]] ويستنى ([[pause]]) عشان تلحق تقرا، و [[launch.sh]] بيطبع [[.env missing: cp .env.example .env]] ويخرج بـ 1. جربت نفس الفحص في سكربت شبهه ده بالظبط اللي حصل.

على لينكس، أول تشغيل ممكن يطلب باسورد sudo مرة واحدة عشان صلاحيات [[chrome-sandbox]] (لازم [[0 4755]]). جربت الشرط ده وغيّر الصلاحية من [[0 755]] لـ [[0 4755]]. وبعد كده:
لو عدّلت ملف في [[src/]]، [[find src -newer dist/index.html]] بيلاقيه، فبتشوف [[vite build]] شغال قبل ما النافذة تفتح. ولو ماعدّلتش حاجة، بيفتح على طول من غير build.

[[launch.bat]] بيعمل [[vite build]] كل مرة، لأن مفيش [[find -newer]] سهل في CMD. ولو الدبل كليك على [[launch.sh]] فتحه في محرر نصوص، اعمل [[chmod +x launch.sh]] وفعّل «Run as program» أو شغّله من الترمنال.`
        },
        {
          cmd: "Capacitor: موقع لـ APK",
          title: "تطبيق أندرويد من موقع React على جهازك",
          desc: R`Capacitor بياخد الموقع بعد الـ build (فولدر dist) ويحطه جوه تطبيق أندرويد أو آيفون. الخطوات: build، و sync، وتبني APK من الترمنال بـ gradlew، وتولّد الأيقونات من صورة واحدة.

والـ APK ده debug: ينفع للتجربة على موبايلك، مش للتوزيع.`,
          example: R`npm install
npm run build
npx cap sync android
npx @capacitor/assets generate --android --iconBackgroundColor '#0f172a' --splashBackgroundColor '#0f172a'
npx cap open android
cd android && ./gradlew assembleDebug && cd ..
# الناتج: android/app/build/outputs/apk/debug/app-debug.apk
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
# iOS: على Mac عليه Xcode بس
npm install @capacitor/ios
npx cap add ios
npx cap sync ios
npx cap open ios`,
          try: "في مشروع Vite + React تجريبي اعمل [[npm i @capacitor/core @capacitor/cli @capacitor/android]] و [[npx cap init]] و [[npx cap add android]]، وبعدين الخطوات دي، ونزّل الـ APK على موبايلك بـ adb (فعّل USB debugging الأول).",
          deep: {
            why: "عندك موقع شغال وعايز تطبيق على الموبايل من غير ما تكتب كود أندرويد. Capacitor بيلف الموقع في WebView ويديك وصول للكاميرا والإشعارات وغيرهم.",
            how: R`[[npm run build]] بيعمل dist. [[cap sync android]] بينسخ dist جوه مشروع الأندرويد (فولدر android/) وبيحدّث الـ plugins. أي تعديل في الموقع محتاج build و sync تاني، وإلا التطبيق يفضل على النسخة القديمة.

[[cap open android]] بيفتح Android Studio لو عايز تشتغل من هناك. بس مش لازم: [[./gradlew assembleDebug]] بيبني APK من الترمنال (على PowerShell [[.\gradlew.bat assembleDebug]]).

[[@capacitor/assets generate]] بياخد [[assets/icon.png]] (1024×1024) ويعمل كل مقاسات الأيقونة وشاشة البداية.

[[adb install -r]] بيسطّب على موبايل موصّل بـ USB، و [[-r]] يعني حدّث فوق النسخة الموجودة.

وفي مشروع حقيقي كان الـ APK بيترفع على السيرفر في فولدر downloads يتخدم من Nginx عشان الموظفين ينزّلوه: [[scp myapp.apk deploy@203.0.113.10:/opt/myapp/downloads/]].`,
            when: "تطبيق داخلي لموظفين، أو أول نسخة موبايل من موقع موجود. بناء الـ APK الموقّع أوتوماتيك في درس «android.yml» في المستوى التالت، والأوامر لوحدها في تاب Desktop و Mobile.",
            mistakes: R`في مشروع حقيقي كانت نسخة الـ debug بتتوزّع على الموظفين. دي مش موقّعة بمفتاح ثابت، فمينفعش تتحدّث فوقها نسخة release موقّعة بعدين: لازم يمسحوا التطبيق الأول.

ولما فولدر downloads اتضاف لـ compose بعد ما الـ container كان شغال، مكانش بيتركّب لحد [[docker compose up -d --force-recreate frontend]].

والتوزيع من برّه Play Store محتاج «تثبيت من مصادر غير معروفة» على كل موبايل، فجهّز ده للموظفين.`
          },
          lines: [
            "سطّب المكتبات.",
            "ابني الموقع لـ dist.",
            "انسخ dist جوه مشروع الأندرويد.",
            "ولّد الأيقونات وشاشة البداية من صورة واحدة (قبل البناء، عشان تدخل في الـ APK).",
            "افتح Android Studio (اختياري).",
            "ابني APK debug من الترمنال.",
            "سطّب على الموبايل الموصّل، فوق القديم.",
            "ضيف منصة iOS.",
            "اعمل مشروع Xcode.",
            "انسخ الموقع جواه.",
            "افتح Xcode."
          ],
          sol: R`جربت جزء Capacitor: [[npx cap add android]] طبع [[[success] android platform added!]] وعمل فولدر [[android/]]. [[npx cap sync android]] نقل الـ build لـ [[android/app/src/main/assets/public]] (غيّرت كلمة وتأكدت إنها وصلت هناك). وخد بالك إن [[cap init]] بيعمل [[capacitor.config.json]] لو المشروع مفيهوش TypeScript، و [[capacitor.config.ts]] لو فيه.

[[./gradlew assembleDebug]] في الآخر بيقول [[BUILD SUCCESSFUL]] والـ APK في [[android/app/build/outputs/apk/debug/app-debug.apk]]. [[adb install -r]] بيطبع [[Success]] والتطبيق بيظهر على الموبايل. لو [[adb devices]] مش شايف الموبايل أو بيقول [[unauthorized]]، وافق على رسالة USB debugging على الموبايل.

الغلط الأشهر: التطبيق بيفتح شاشة بيضا، لأن [[webDir]] مش [[dist]] أو نسيت [[npm run build]] قبل [[cap sync]]. ولو الـ API مش بيرد من الموبايل، [[localhost]] على الموبايل هو الموبايل نفسه، استخدم IP الكمبيوتر أو [[adb reverse]]. (ما قدرتش أبني الـ APK هنا، [[gradlew]] محتاج Android SDK ونت.)`
        }
      ]
    },
    {
      t: "تجهيز السيرفر",
      l: 2,
      n: "من سيرفر فاضي لسيرفر جاهز، وفحص قبل أول نشر، وخريطة لسيرفر قديم",
      items: [
        {
          cmd: "setup-vps.sh",
          title: "تجهيز VPS جديد لـ Docker من الصفر",
          desc: R`سكربت بتشغّله مرة على سيرفر Ubuntu لسه واخده: يحدّث النظام، ويسطّب Docker و compose و git و ufw و fail2ban، ويعمل يوزر للتطبيق بمفاتيح SSH بتاعتك، ويقفل الفايروول على 22 و 80 و 443.

وممكن تشغّله تاني من غير ما يبوّظ حاجة: كل خطوة بتتأكد الأول هي اتعملت ولا لأ.`,
          example: R`#!/usr/bin/env bash
# sudo bash setup-vps.sh deploy
set -euo pipefail
[ "$EUID" -eq 0 ] || { echo "run it with sudo" >&2; exit 1; }
APP_USER="$__{1:-deploy}"
KEYS="$(getent passwd "$__{SUDO_USER:-root}" | cut -d: -f6)/.ssh/authorized_keys"

apt-get update && apt-get upgrade -y
apt-get install -y ca-certificates curl git ufw fail2ban

if ! command -v docker >/dev/null; then
  curl -fsSL https://get.docker.com -o /tmp/get-docker.sh
  sh /tmp/get-docker.sh
  rm /tmp/get-docker.sh
fi
docker --version; docker compose version

if ! id "$APP_USER" >/dev/null 2>&1; then
  adduser --disabled-password --gecos "" "$APP_USER"
  install -d -m 700 -o "$APP_USER" -g "$APP_USER" "/home/$APP_USER/.ssh"
  install -m 600 -o "$APP_USER" -g "$APP_USER" "$KEYS" "/home/$APP_USER/.ssh/authorized_keys"
fi
usermod -aG docker "$APP_USER"

ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo "now, from a NEW terminal: ssh $APP_USER@203.0.113.10 docker ps"`,
          try: "على سيرفر تجربة جديد (أو VM بـ multipass) شغّله مرتين ورا بعض: التانية لازم تعدّي من غير أخطاء ومن غير ما تعمل حاجة جديدة. وبعدين من ترمنال تاني ادخل بـ [[ssh deploy@203.0.113.10]] وجرّب [[docker ps]] من غير sudo.",
          flag: "script",
          deep: {
            why: "كل سيرفر جديد محتاج نفس الـ ١٠ خطوات. لو عملتها بإيدك كل مرة هتنسى واحدة (غالبًا الفايروول)، ولو في سكربت هتبقى نفس الحاجة على كل سيرفر.",
            how: R`[[set -euo pipefail]] في الأول بيخلي أي أمر يفشل يوقف السكربت، بدل ما يكمل على سيرفر نص متجهّز.

كل خطوة «idempotent»، يعني تشغيلها مرتين زي مرة: Docker بيتسطب بس لو [[command -v docker]] ملقاهوش، واليوزر بيتعمل بس لو [[id]] ملقاهوش، و [[usermod -aG]] و [[ufw allow]] مش بيضرّوا لو اتكرروا.

سكربت get.docker.com بيتنزّل في ملف الأول بدل [[curl | sh]]، عشان لو عايز تقراه قبل ما تشغّله تقدر، ولو التنزيل وقف في النص ميتنفذش نص سكربت.

اليوزر الجديد بيتعمل من غير باسورد ([[--disabled-password]])، والدخول بالمفاتيح اللي انت داخل بيها دلوقتي: [[SUDO_USER]] هو اسم اليوزر اللي كتب sudo، و [[getent passwd]] بيجيب فولدر الـ home بتاعه. و [[install]] بيعمل الفولدر والملف بالمالك والصلاحيات الصح في خطوة واحدة (700 للفولدر و 600 للملف، وإلا SSH هيرفض المفاتيح).

خد بالك: جروب docker معناه صلاحيات root فعليًا (أي حد فيه يقدر يركّب / جوه container). فاليوزر ده للتطبيق بس، ومش محتاج sudo.

وخد بالك كمان: Docker بيكتب قواعد iptables بتاعته، فأي بورت بتنشره بـ [[-p 5432:5432]] بيبقى مفتوح للعالم حتى لو ufw قافله. عشان كده في الـ compose اربط على [[127.0.0.1]].`,
            when: "أول ما تاخد VPS جديد، قبل أي clone أو deploy. وبعد ما يخلص، اقفل الدخول بالباسورد من sshd_config بعد ما تتأكد إن الدخول بالمفتاح شغال.",
            mistakes: R`في مشروع حقيقي كان السكربت بيشتغل كله بـ root ومفيهوش يوزر للتطبيق خالص، و [[usermod -aG docker "$USER"]] وهو root كانت بتضيف root نفسه للجروب (ملهاش أي لازمة). وكان بيسطّب apt-transport-https و docker-compose-plugin على الفاضي (get.docker.com بيسطّب compose أصلًا). وكان الـ IP والدومين مكتوبين جوه السكربت، فمينفعش يتستخدم على سيرفر تاني.

وغلطة شائعة: تقفل الدخول بالباسورد وتقفل الترمنال قبل ما تجرّب الدخول بالمفتاح من ترمنال جديد، فتقفل الباب على نفسك.`
          },
          lines: [
            "أي أمر يفشل يوقف السكربت، وأي متغير مش متعرّف يبقى غلطة، وفشل أي جزء في pipe يتحسب.",
            "لو مش root (الـ [[EUID]] مش 0) اطبع رسالة واخرج.",
            "اسم يوزر التطبيق من أول argument، ولو مفيش يبقى deploy.",
            "مكان مفاتيح SSH بتاعة اليوزر اللي كتب sudo (أو root)، عشان ننسخها لليوزر الجديد.",
            "حدّث لستة الباكدجات وسطّب التحديثات.",
            "الأدوات الأساسية: شهادات و curl و git والفايروول و fail2ban.",
            "لو Docker مش متسطب...",
            "...نزّل سكربت التسطيب الرسمي في ملف.",
            "...شغّله.",
            "...وامسحه.",
            "نهاية الـ if.",
            "اتأكد إن Docker و compose شغالين (لو لأ، [[set -e]] هيوقف هنا). مفصولين بـ [[;]] مش [[&&]]، لأن فشل أول أمر في [[&&]] مش بيوقف [[set -e]].",
            "لو اليوزر مش موجود...",
            R`...اعمله من غير باسورد ومن غير أسئلة ([[--gecos ""]]).`,
            "...اعمل فولدر .ssh بتاعه بصلاحيات 700 وملكه.",
            "...وانسخ المفاتيح بصلاحيات 600.",
            "نهاية الـ if.",
            "ضيفه لجروب docker عشان يشغّل docker من غير sudo.",
            "اسمح بـ SSH قبل ما تفعّل الفايروول (وإلا هتقفل على نفسك).",
            "اسمح بـ HTTP.",
            "اسمح بـ HTTPS.",
            "فعّل الفايروول من غير ما يسألك.",
            "افكرك تجرّب الدخول باليوزر الجديد من ترمنال تاني."
          ],
          sol: R`أول تشغيل بياخد دقايق (apt upgrade و Docker) وفي الآخر بيطبع نسخة Docker و [[Docker Compose version v2...]] و [[Firewall is active and enabled on system startup]] و [[now, from a NEW terminal: ssh deploy@... docker ps]].

التشغيل التاني لازم يعدّي من غير أخطاء: [[command -v docker]] بيلاقي Docker فمش بيسطّبه تاني، و [[id deploy]] بيلاقي اليوزر فمش بيعمله، و [[ufw allow]] بيقول [[Skipping adding existing rule]]. ده معنى idempotent: تشغّله مرة ولا عشرة والنتيجة واحدة. لو [[adduser]] فشل في التانية يبقى نسيت الشرط.

من ترمنال جديد، [[ssh deploy@IP]] ثم [[docker ps]] لازم يرجّع جدول فاضي ([[CONTAINER ID   IMAGE ...]]) من غير sudo. لو طلع [[permission denied while trying to connect to the Docker daemon socket]] يبقى انت لسه في session قديمة قبل [[usermod -aG docker]]، اخرج وادخل تاني. ومتقفلش ترمنال الـ root قبل ما تتأكد إن SSH بيوزر deploy شغال. (ده بيعدّل سيرفر حقيقي فما شغّلتوش هنا.)`
        },
        {
          cmd: "preflight.sh",
          title: "فحص السيرفر قبل أول نشر، ويصلّح لو طلبت",
          desc: R`سكربت بيقرا بس ومش بيغيّر حاجة: يشوف الأنوية والمساحة والـ swap و Docker، والبورتات اللي مفروض تبقى مقفولة، والدخول بالباسورد، وإن الدومين بيشاور على السيرفر ده. وفي الآخر يطبع ملخص ويرجع exit code.

ولو شغّلته بـ [[--fix]] بيصلّح اللي ينفع يتصلّح لوحده (هنا الـ swap).`,
          example: R`#!/usr/bin/env bash
# ./preflight.sh              فحص بس، مش بيغيّر حاجة
# sudo ./preflight.sh --fix   فحص + تصليح اللي ينفع يتصلّح
set -uo pipefail
FIX=0; [ "$__{1:-}" = "--fix" ] && FIX=1
PASS=0; WARN=0; FAIL=0
ok()   { echo "  ok    $*"; PASS=$((PASS+1)); }
warn() { echo "  warn  $*"; WARN=$((WARN+1)); }
bad()  { echo "  FAIL  $*"; FAIL=$((FAIL+1)); }

CORES=$(nproc)
DISK_GB=$(df -BG --output=avail / | tail -1 | tr -dc '0-9')
[ "$CORES" -ge 2 ] && ok "$CORES cores" || bad "$CORES cores (need 2)"
[ "$DISK_GB" -ge 20 ] && ok "$DISK_GB GB free" || bad "$DISK_GB GB free (need 20)"

SWAP_MB=$(free -m | awk '/^Swap:/{print $2}')
if [ "$SWAP_MB" -ge 2048 ]; then ok "swap $SWAP_MB MB"
elif [ "$FIX" -eq 1 ]; then
  fallocate -l 4G /swapfile && chmod 600 /swapfile && mkswap -q /swapfile && swapon /swapfile
  grep -q '^/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
  ok "swap 4G created"
else warn "no swap (run again with --fix)"; fi

command -v docker >/dev/null && ok "docker installed" || bad "docker missing"
for p in 5432 6379 27017; do
  ss -ltnH "sport = :$p" | grep -qE '0\.0\.0\.0|\[::\]|\*:' && bad "port $p open to the world" || ok "port $p private"
done
sshd -T 2>/dev/null | grep -qx 'passwordauthentication no' && ok "SSH keys only" || warn "SSH password login is on"

IP=$(curl -4 -s --max-time 5 https://api.ipify.org || true)
HOST=$(grep -E '^APP_HOST=' .env 2>/dev/null | cut -d= -f2 || true)
DNS=$(getent ahostsv4 "$HOST" | awk '{print $1; exit}')
[ -n "$IP" ] && [ "$DNS" = "$IP" ] && ok "$HOST -> $DNS" || bad "APP_HOST '$HOST' -> $__{DNS:-nothing}, server is $__{IP:-unknown}"

echo "pass $PASS · warn $WARN · fail $FAIL"
[ "$FAIL" -eq 0 ]`,
          try: "شغّله من غير [[--fix]] على سيرفر التجربة واقرا النتيجة. وبعدين شغّل [[docker run -d -p 6379:6379 redis]] وأعد الفحص: لازم يطلع FAIL على 6379. امسح الـ container وأعد تاني.",
          flag: "script",
          deep: {
            why: "أغلب مشاكل أول نشر مش في الكود: سيرفر رام قليلة من غير swap فالـ build يموت، أو الدومين لسه مش بيشاور على السيرفر فـ certbot يفشل، أو قاعدة البيانات مفتوحة للإنترنت. الفحص ده بيمسكهم في ثانيتين قبل ما تضيّع ساعة.",
            how: R`السكربت مفيهوش [[set -e]] عن قصد: الفحص المفروض يكمل للآخر ويوريك كل المشاكل مرة واحدة، مش يقف عند أول واحدة. وفيه [[set -u]] عشان متغير مكتوب غلط يبان.

الـ ٣ دوال [[ok]] و [[warn]] و [[bad]] بيطبعوا ويعدّوا. والشكل [[شرط && ok || bad]] معناه «لو الشرط نجح قول ok، وإلا قول FAIL». وده آمن هنا لأن ok نفسها عمرها ما بتفشل.

البورتات: [[ss -ltnH]] بيعرض اللي بيسمع على TCP من غير عناوين أعمدة، والفلتر [[sport = :5432]] بيجيب البورت ده بس. لو العنوان [[0.0.0.0]] أو [[[::]]] يبقى مفتوح على كل الواجهات، ولو [[127.0.0.1]] يبقى جوه السيرفر بس.

SSH: [[sshd -T]] بيطبع الإعدادات «النهائية» اللي sshd شغال بيها فعلًا، بعد ما يقرا sshd_config وكل الملفات في sshd_config.d. ده أهم من grep على الملف، لأن صور Ubuntu على السحابة غالبًا فيها ملف في sshd_config.d بيرجّع الباسورد تاني. ومحتاج root، فمن غير sudo هيطلع warn.

DNS: [[getent ahostsv4]] بيجيب IPv4 بس، فالمقارنة مع IP السيرفر من ipify (اللي برضه IPv4 بـ [[-4]]) بتبقى عادلة.

وآخر سطر [[[ "$FAIL" -eq 0 ]]] هو الـ exit code بتاع السكربت كله، فتقدر تكتب [[./preflight.sh && ./deploy.sh deploy]].`,
            when: "قبل أول نشر على سيرفر جديد، وبعد أي تغيير كبير (نقل دومين، أو إضافة خدمة). وممكن يبقى أول خطوة في deploy.sh.",
            mistakes: "في مشروع حقيقي كان الفحص بيقارن ناتج [[getent hosts]] (اللي ممكن يرجع IPv6) بـ IPv4 من ipify، فيطلع «الدومين مش بيشاور هنا» وهو بيشاور. ولو ipify كان واقع، الـ IP بيبقى فاضي وكل الدومينات تفشل برسالة ملهاش معنى، فهنا بيطبع «server is unknown». وكان بيعمل grep على sshd_config بس، فيقول «keys only» والسيرفر فعليًا قابل باسورد من ملف في sshd_config.d. وكمان بيفترض Ubuntu و root من غير ما يقول."
          },
          lines: [
            "من غير [[-e]] عن قصد (الفحص يكمل للآخر)، بس المتغيرات غير المعرّفة غلطة.",
            "لو أول argument هو [[--fix]] فعّل وضع التصليح.",
            "عدّادات النتايج.",
            "دالة للنجاح: تطبع وتزوّد العدّاد.",
            "دالة للتحذير.",
            "دالة للفشل.",
            "عدد الأنوية.",
            "المساحة الفاضية على / بالجيجا، رقم بس ([[tr -dc]] يشيل أي حاجة مش رقم).",
            "أقل من نواتين يبقى فشل.",
            "أقل من 20 جيجا فاضية يبقى فشل.",
            "حجم الـ swap بالميجا من سطر Swap في [[free]].",
            "لو 2 جيجا أو أكتر: تمام.",
            "وإلا لو وضع التصليح شغال...",
            "...اعمل ملف swap بـ 4 جيجا، واقفل صلاحياته، وجهّزه، وشغّله.",
            "...وضيفه لـ fstab عشان يفضل بعد الـ reboot (لو مش موجود أصلًا).",
            "...وقول إنه اتعمل.",
            "وإلا نبّه بس.",
            "Docker متسطب؟",
            "لف على بورتات Postgres و Redis و Mongo...",
            "...لو بيسمع على كل الواجهات يبقى مكشوف للعالم، وإلا تمام.",
            "نهاية اللوب.",
            "الإعدادات الفعلية لـ sshd: هل الدخول بالباسورد مقفول؟",
            "IP السيرفر العام (IPv4)، ولو فشل يبقى فاضي من غير ما يوقع.",
            "الدومين من .env.",
            "الدومين بيشاور على أنهي IPv4.",
            "لو الاتنين متطابقين تمام، وإلا فشل برسالة فيها القيمتين.",
            "الملخص.",
            "الـ exit code: 0 لو مفيش ولا فشل."
          ],
          sol: R`شغّلته على بيئة التجربة هنا وطلع شكل الناتج ده (الأرقام هتختلف عندك):

[[ok    4 cores]]
[[FAIL  12 GB free (need 20)]]
[[warn  no swap (run again with --fix)]]
[[ok    port 6379 private]]
[[warn  SSH password login is on]]
[[pass 4 · warn 2 · fail 3]] والـ exit code [[1]].

بعد [[docker run -d -p 6379:6379 redis]] (جربتها بـ container تاني على نفس البورت) الفحص طلع [[FAIL  port 6379 open to the world]]، لأن Docker نشر البورت على [[0.0.0.0]]. بعد ما تمسح الـ container يرجع [[ok]]. والدرس هنا إن [[ufw]] مش بيحميك من ده، Docker بيتخطاه.

سطر [[APP_HOST]] بيقع لو [[.env]] مش جنب السكربت أو الدومين لسه مش بيشاور على السيرفر، وده مقصود: متنشرش قبل ما DNS يبقى صح. و [[--fix]] محتاج sudo لأنه بيعمل swap في [[/etc/fstab]].`
        },
        {
          cmd: "server-map.sh",
          title: "خريطة لسيرفر مش فاكر عليه إيه",
          desc: "سيرفر ورثته أو مدخلتهوش من سنة، وعايز تعرف: الكود فين؟ إيه اللي شغال؟ مين بيسمع على أنهي بورت؟ و Nginx موجّه لفين؟ السكربت ده بيجاوب في شاشة واحدة، ومش بيغيّر أي حاجة.",
          example: R`#!/usr/bin/env bash
# sudo bash server-map.sh 2>/dev/null | less
echo "== ports =="
ss -tlnp
echo "== docker =="
docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}'
docker compose ls
echo "== processes =="
pgrep -af 'node|python|php-fpm'
pm2 list || echo "no pm2 for this user"
systemctl list-units --type=service --state=running --no-pager
echo "== nginx =="
ls -l /etc/nginx/sites-enabled/ /etc/nginx/conf.d/
nginx -T | grep -E '^\s*(server_name|root|proxy_pass)' | sort -u
echo "== code =="
find /opt /var/www /srv /home -maxdepth 4 -not -path '*/node_modules/*' \( -name package.json -o -name 'docker-compose*.yml' -o -name compose.yml -o -name .git \)
echo "== cron =="
ls /etc/cron.d/ /var/spool/cron/crontabs/
echo "== disk =="
df -h /
du -sh /var/lib/docker /var/log`,
          try: "شغّله على سيرفر التجربة وحاول من الناتج بس ترسم: الدومين ده بيروح لـ Nginx، اللي بيعمل proxy لأنهي بورت، اللي تبع أنهي container أو بروسيس، اللي الكود بتاعه في أنهي فولدر.",
          flag: "script",
          deep: {
            why: "قبل ما تلمس سيرفر مش فاكره لازم تعرف الصورة كاملة، وإلا هتعمل deploy في فولدر غلط أو توقف خدمة حد تاني بيستخدمها.",
            how: R`ابدأ من البورتات: [[ss -tlnp]] بيقولك مين بيسمع على إيه واسم البروسيس (محتاج root عشان يطلع الاسم). ده أصدق مصدر، لأن أي حاجة شغالة فعلًا لازم تسمع على بورت.

[[docker compose ls]] بيطلع كل مشاريع compose الشغالة ومكان ملف الـ compose بتاع كل واحد. ده غالبًا أسرع طريق لـ «الكود فين».

[[pgrep -af]] بيدوّر على البروسيسات بالاسم ويطبع الأمر كامل، بدل [[ps aux | grep node | grep -v grep]]. و pm2 كل يوزر ليه قايمة لوحده، فلو شغّلت السكربت بـ sudo هتشوف قايمة root بس؛ جرّب [[sudo -u deploy pm2 list]].

[[nginx -T]] بيطبع الإعدادات كلها مجمّعة (كل الملفات المتضمَّنة)، والـ grep بيطلّع أسماء الدومينات والفولدرات والـ proxy_pass، فتعرف كل دومين رايح فين.

و [[find]] بـ [[-maxdepth 4]] وبيستبعد node_modules، ويدوّر على package.json وملفات compose وفولدرات .git في الأماكن المعتادة.

والآخر: الـ cron (مهام مجدولة ممكن تكون ناسيها) والمساحة، لأن سيرفر قديم غالبًا مليان لوجات أو images قديمة.`,
            when: "أول مرة تدخل سيرفر عميل، أو سيرفر بتاعك من زمان، أو قبل ما تنقل المشروع لسيرفر جديد.",
            mistakes: "في مشروع حقيقي كان السكربت بيدوّر على package.json من غير ما يستبعد node_modules، فبيطلع آلاف النتايج لولا [[head]]، وكان بيستخدم [[grep node | grep -v grep]]. والأهم إنه كان بيبص على pm2 و node بس، ومش بيبص على docker ولا البورتات ولا إعدادات nginx، فالصورة كانت ناقصة لأن المشروع فعليًا كان شغال في Docker."
          },
          lines: [
            "عنوان.",
            "كل البورتات اللي بيسمع عليها حاجة، واسم البروسيس.",
            "عنوان.",
            "الـ containers الشغالة في جدول: الاسم والـ image والبورتات والحالة.",
            "مشاريع compose الشغالة ومكان ملف كل واحد.",
            "عنوان.",
            "بروسيسات node و python و php بالأمر الكامل.",
            "قايمة pm2 (لليوزر الحالي بس).",
            "كل الخدمات الشغالة في systemd.",
            "عنوان.",
            "ملفات المواقع المفعّلة.",
            "الإعدادات المجمّعة، ومنها أسماء الدومينات والفولدرات والـ proxy_pass بس، من غير تكرار.",
            "عنوان.",
            "فين package.json وملفات compose وفولدرات git، من غير node_modules.",
            "عنوان.",
            "المهام المجدولة للنظام ولكل يوزر.",
            "عنوان.",
            "المساحة على /.",
            "حجم Docker واللوجات، أكبر اتنين بياكلوا المساحة عادة."
          ],
          sol: R`الإجابة النموذجية سطر لكل موقع، بالشكل ده:

[[example.com → nginx (server_name example.com) → proxy_pass http://127.0.0.1:3000 → container myapp-web-1 (0.0.0.0:3000->3000) → كوده في /opt/myapp (فيه compose.yml و .git)]]

بتجمّعها كده: من [[nginx -T]] خد الـ [[server_name]] و [[proxy_pass]] اللي تحته. البورت ده دوّر عليه في [[ss -tlnp]]: لو البرنامج [[docker-proxy]] يبقى container، وهتلاقيه في [[docker ps]] بنفس البورت. ولو [[node]] أو [[python]] يبقى process عادي، و [[pgrep -af]] بيوريك الأمر الكامل ومساره. ولو فيه [[root]] بدل [[proxy_pass]] يبقى موقع static من الفولدر ده. وبعدين [[find]] بيوريك فين الكود و compose.

لو بورت ظاهر في [[ss]] ومش لاقي ليه دومين في Nginx، يا إما حاجة قديمة منسية يا إما خدمة مكشوفة للنت من غير قصد (خصوصًا لو [[0.0.0.0]]). دوّنها في الخريطة. واقرا [[cron]] عشان متتفاجئش بباك أب أو سكربت بيشتغل بالليل.`
        }
      ]
    }
  ]
});
