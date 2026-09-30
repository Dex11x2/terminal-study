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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
        }
      ]
    },
    {
      t: "سكربتات النشر",
      l: 2,
      n: "سكربت بأوامر فرعية، وتحديث بيرجع لوحده لو باظ، ونشر بـ docker run و rsync و Actions واستضافة مشتركة",
      items: [
        {
          cmd: "deploy.sh",
          title: "سكربت واحد لكل أوامر السيرفر",
          desc: R`بدل ما تحفظ أوامر compose و git، سكربت واحد بأوامر فرعية: [[./deploy.sh deploy]] و [[update]] و [[ssl]] و [[logs]] و [[status]] و [[restart]] و [[stop]]. كل أمر فرعي دالة صغيرة، والاختيار بـ [[case]].

الـ deploy هنا بيبني الأول والموقع القديم لسه شغال، وبعدين يبدّل ويستنى الـ healthcheck.`,
          example: R`#!/usr/bin/env bash
# ./deploy.sh deploy | update | ssl | logs [service] | status | restart | stop
set -euo pipefail
cd "$(dirname "$0")"

require_env() {
  [ -f .env ] || { echo ".env missing: cp .env.example .env && nano .env" >&2; exit 1; }
}
deploy() {
  require_env
  docker compose build
  docker compose up -d --wait --wait-timeout 120
  docker image prune -f >/dev/null
  docker compose ps
}
update() {
  [ -z "$(git status --porcelain)" ] || { echo "local changes on server:" >&2; git status --short; exit 1; }
  git pull --ff-only origin main
  deploy
}

case "$__{1:-}" in
  deploy)  deploy ;;
  update)  update ;;
  ssl)     ./scripts/init-ssl.sh ;;
  logs)    docker compose logs -f --tail=200 $__{2:-} ;;
  status)  docker compose ps ;;
  restart) docker compose restart ;;
  stop)    docker compose down ;;
  *)       sed -n '2p' "$0" >&2; exit 1 ;;
esac`,
          try: "حطه في مشروع compose صغير على سيرفر التجربة (أي app فيها healthcheck). جرّب [[./deploy.sh]] من غير argument، وبعدين [[deploy]]، وبعدين عدّل ملف على السيرفر وجرّب [[update]]: لازم يرفض.",
          flag: "script",
          deep: {
            why: "على السيرفر إنت بتعمل نفس ٦ أو ٧ حاجات كل مرة. لو في سكربت، أي حد في الفريق يعمل deploy صح من غير ما يفتكر ترتيب الأوامر، ومتنساش خطوة وانت مستعجل.",
            how: R`[[cd "$(dirname "$0")"]] بيخلي السكربت يشتغل من فولدره هو، فمش مهم انت واقف فين لما تشغّله.

[[build]] الأول وبعدين [[up -d]]: البناء بياخد دقايق، والموقع القديم فاضل شغال طول الوقت ده. [[up]] بعد كده بيبدّل الـ containers اللي الـ image بتاعتها اتغيرت بس، في ثواني.

[[--wait]] بيخلي compose يستنى لحد ما كل الخدمات تبقى running، واللي ليها healthcheck تبقى healthy، ولو عدّى [[--wait-timeout]] يفشل. ده بدل [[sleep 5]] اللي مش بيضمن حاجة.

update: [[git status --porcelain]] بيطبع أي ملف متغيّر، ولو طبع حاجة يبقى فيه تعديل يدوي على السيرفر، فالسكربت يقف بدل ما يمسحه أو يتلخبط. و [[--ff-only]] بيرفض أي merge، فلو السيرفر عليه commit مش على GitHub هتعرف.

[[$__{2:-}]] من غير علامات تنصيص عن قصد: لو مفيش اسم خدمة بيختفي خالص، فـ [[logs]] تعرض الكل و [[logs app]] تعرض app بس.

و [[sed -n '2p' "$0"]] بيطبع السطر التاني من السكربت نفسه، اللي هو تعليق الاستخدام، فمش محتاج تكتب رسالة الاستخدام مرتين.

ومش محتاج تعمل [[export $(cat .env | xargs)]]: compose بيقرا .env اللي جنبه لوحده.`,
            when: "أي مشروع compose على VPS. ولما تضيف أمر جديد (backup مثلًا)، ضيفه هنا كدالة واسطر في الـ case.",
            mistakes: R`في مشروع حقيقي كان [[export $(cat .env | xargs)]] بيبوظ أول ما قيمة فيها مسافة أو علامة تنصيص، وكان بيعمل [[down]] وبعدين [[build --no-cache]]، فالموقع يقع طول مدة البناء كلها، وبعدين [[sleep]] ثابت بدل healthcheck. ودالة ssl كانت بتبدّل nginx.conf ولو certbot فشل [[set -e]] بيوقف السكربت والملف يفضل متبدّل، لأن مكانش فيه trap يرجّعه. و update كان بيعمل pull من غير ما يتأكد إن مفيش تعديلات. والإيميل والدومين مكتوبين جوه السكربت.

وفي مشروع تاني كان update بيعمل [[git reset --hard origin/main]]، فأي تعديل يدوي على السيرفر (إصلاح سريع مثلًا) بيتمسح من غير كلمة. وكان بيعدّل next.config.ts بـ sed على السيرفر نفسه، ومكانش فيه healthcheck بعد up.`
          },
          lines: [
            "أي فشل يوقف السكربت.",
            "اشتغل من فولدر السكربت نفسه.",
            "دالة بتتأكد إن .env موجود...",
            "...وإلا تقول تعمله إزاي وتخرج.",
            "نهاية الدالة.",
            "دالة النشر:",
            "اتأكد من .env.",
            "ابني الـ images الجديدة، والموقع القديم لسه شغال.",
            "بدّل واستنى لحد ما الخدمات تبقى healthy (أقصى حاجة دقيقتين).",
            "امسح الـ images القديمة اللي ملهاش اسم.",
            "اعرض الحالة.",
            "نهاية الدالة.",
            "دالة التحديث:",
            "لو فيه تعديلات يدوية على السيرفر، اعرضها واقف.",
            "اسحب الجديد، ولو محتاج merge ارفض.",
            "وانشر.",
            "نهاية الدالة.",
            "اختار حسب أول argument.",
            "نشر.",
            "تحديث من git ونشر.",
            "أول شهادة SSL (سكربت منفصل).",
            "اللوجات، لخدمة معينة لو اتكتبت.",
            "الحالة.",
            "restart لكل الخدمات.",
            "اقفل المشروع.",
            "أي حاجة تانية: اطبع سطر الاستخدام من السكربت نفسه واخرج بفشل.",
            "نهاية الـ case."
          ]
        },
        {
          cmd: "update.sh",
          title: "تحديث بيبني الأول، ولو الجديد باظ يرجع لوحده",
          desc: "الترتيب الصح لتحديث مشروع compose: تتأكد إن السيرفر نضيف، تسحب الجديد، تبني والقديم شغال، تبدّل وتستنى الـ healthcheck. ولو الجديد مقامش، السكربت يرجع للـ commit القديم ويبنيه ويشغّله، وبيكتب كل خطوة بالوقت.",
          example: R`#!/usr/bin/env bash
# ./update.sh   على السيرفر، من فولدر المشروع
set -euo pipefail
cd "$(dirname "$0")"
log() { echo "[$(date '+%F %T')] $*"; }

[ -z "$(git status --porcelain)" ] || { log "local changes on the server, stopping"; git status --short; exit 1; }
OLD=$(git rev-parse --short HEAD)
git fetch -q origin main
[ "$(git rev-parse HEAD)" != "$(git rev-parse origin/main)" ] || { log "already on latest ($OLD)"; exit 0; }
git merge -q --ff-only origin/main
NEW=$(git rev-parse --short HEAD)

log "building $NEW, the site is still up on $OLD"
docker compose build

if docker compose up -d --wait --wait-timeout 120; then
  log "live on $NEW"
  docker image prune -f >/dev/null
else
  log "$NEW is unhealthy, rolling back to $OLD"
  docker compose logs --tail=50
  git reset -q --hard "$OLD"
  docker compose build && docker compose up -d --wait
  exit 1
fi`,
          try: "على مشروع تجربة: اعمل commit بيخلّي الـ healthcheck يفشل (مثلًا غيّر مسار /health) وادفعه، وشغّل [[./update.sh >> ~/update.log 2>&1]] (اللوج برّه فولدر المشروع، لأن ملف جديد جوه الريبو بيخلّي [[git status --porcelain]] يوقف السكربت). لازم تلاقي في اللوج إنه رجع للـ commit القديم والموقع لسه شغال.",
          flag: "script",
          deep: {
            why: "أسوأ لحظة في النشر: الجديد مش شغال والقديم اتمسح. السكربت ده بيضمن إن فيه دايمًا نسخة شغالة: القديم فاضل شغال طول البناء، ولو الجديد فشل بيرجع لوحده.",
            how: R`[[git fetch]] وبعدين مقارنة [[HEAD]] بـ [[origin/main]] بيخلي السكربت يعرف لو مفيش جديد فيخرج بهدوء، ودا مهم لو شغّلته من cron أو Actions.

[[git merge --ff-only]] بيمشي لقدام بس. لو السيرفر عليه commit مش موجود على GitHub، هيرفض بدل ما يعمل merge commit على السيرفر.

[[docker compose build]] بيبني الـ images الجديدة والـ containers القديمة لسه شغالة. وبعدين [[up -d --wait]] بيبدّل ويستنى الـ healthcheck. لو نجح يبقى تمام، ولو فشل (أو عدّت دقيقتين) ندخل في الـ else.

الرجوع: [[git reset --hard "$OLD"]] هنا آمن لأننا اتأكدنا في الأول إن مفيش تعديلات يدوية. وإعادة البناء للقديم بتبقى سريعة لأن طبقاته لسه في الكاش.

وفي الآخر [[exit 1]] حتى بعد الرجوع الناجح، عشان اللي شغّل السكربت (انت أو Actions) يعرف إن التحديث فشل.

و [[log]] بيحط التاريخ والوقت قبل كل رسالة، فلو وجّهت الناتج لملف تعرف كل حاجة حصلت إمتى.

وخد بالك: لو التحديث فيه migration غيّرت قاعدة البيانات، الرجوع للكود القديم مش بيرجّع الداتا. خلي الـ migrations متوافقة مع النسخة اللي قبلها.`,
            when: "أي تحديث لمشروع compose على السيرفر، بإيدك أو من Actions. ولازم الخدمات يبقى ليها healthcheck، وإلا [[--wait]] هيستنى running بس.",
            mistakes: R`في مشروع حقيقي كان السكربت لو [[git pull]] فشل يطبع warning ويكمّل، فينشر الكود القديم ويقول «تم». وكان بيعمل [[docker-compose down]] قبل البناء فالموقع يقع طول الـ build، وبيمسح images بأسامي مكتوبة بإيده مش مطابقة لأسامي compose فالمسح عمليًا مكانش بيحصل، وبيبني بـ [[--no-cache --pull]] كل مرة (بطيء على الفاضي)، وبعدين [[sleep 5]] بدل healthcheck. وكان بيستخدم [[docker-compose]] القديم (v1).

ونسخة PowerShell من نفس السكربت كانت بتحط docker و git جوه [[try/catch]]، وده مش بيمسك فشل البرامج الخارجية في PowerShell 5.1؛ لازم تبص على [[$LASTEXITCODE]] بعد كل أمر.`
          },
          lines: [
            "أي فشل يوقف السكربت.",
            "اشتغل من فولدر المشروع.",
            "دالة بتطبع الرسالة ومعاها التاريخ والوقت.",
            "لو فيه تعديلات يدوية على السيرفر، اقف.",
            "احفظ الـ commit الحالي عشان نرجعله لو احتجنا.",
            "هات آخر حاجة من GitHub من غير ما تغيّر الملفات.",
            "لو احنا أصلًا على آخر نسخة، اخرج بهدوء.",
            "امشي لقدام للجديد (ومن غير merge).",
            "احفظ الـ commit الجديد.",
            "رسالة.",
            "ابني، والقديم لسه شغال.",
            "بدّل واستنى الـ healthcheck. لو نجح...",
            "...قول إنه شغال...",
            "...ونضّف الـ images القديمة.",
            "لو فشل...",
            "...قول هيرجع لأنهي نسخة.",
            "...اطبع آخر اللوجات عشان تعرف السبب.",
            "...ارجع للكود القديم.",
            "...ابنيه وشغّله.",
            "...واخرج بفشل عشان اللي شغّله يعرف.",
            "نهاية الـ if."
          ]
        },
        {
          cmd: "deploy-run.sh",
          title: "نشر container واحد من غير compose",
          desc: "لما المشروع container واحد، ممكن تنشره بـ [[docker build]] و [[docker run]] مباشرة. السكربت ده بيوريك اللي compose بيعمله من ورا الستارة: يحتفظ بالـ image القديمة باسم previous، يبني والموقع شغال، يبدّل، يستنى الـ health، ولو فشل يرجع للقديمة.",
          example: R`#!/usr/bin/env bash
set -euo pipefail
NAME=myapp
[ -f .env ] || { echo ".env missing" >&2; exit 1; }
set -a; . ./.env; set +a
run() { docker run -d --name "$NAME" -p 127.0.0.1:3000:3000 --env-file .env --restart unless-stopped "$1"; }
healthy() { for i in $(seq 1 30); do curl -fsS -o /dev/null http://127.0.0.1:3000/api/health && return 0; sleep 2; done; return 1; }

docker image inspect "$NAME:latest" >/dev/null 2>&1 && docker tag "$NAME:latest" "$NAME:previous"
docker build --build-arg NEXT_PUBLIC_API_URL="$NEXT_PUBLIC_API_URL" -t "$NAME:latest" .

docker rm -f "$NAME" 2>/dev/null || true
run "$NAME:latest"

if healthy; then
  echo "live"; docker logs --tail 20 "$NAME"
else
  echo "new image is unhealthy, back to previous" >&2
  docker logs --tail 50 "$NAME"
  docker rm -f "$NAME"; run "$NAME:previous"
  exit 1
fi`,
          try: "شغّله مرتين على سيرفر التجربة، وبعدين [[docker images myapp]]: لازم تلاقي latest و previous. بعدها بوّظ مسار /api/health في الكود وشغّله تالت: لازم يرجع للـ previous لوحده.",
          flag: "script",
          deep: {
            why: "مش كل مشروع محتاج compose. ولو فهمت الخطوات دي بإيدك، هتفهم compose بيعمل إيه، وهتعرف تصلّح لما حاجة تقف في النص.",
            how: R`[[set -a]] بيخلي أي متغير يتعرّف بعده يبقى export تلقائي، و [[. ./.env]] بيقرا الملف كأنه سكربت، و [[set +a]] بيقفل الوضع ده. كده متغيرات .env بقت متاحة للسكربت (محتاجينها للـ build-arg). وده أسلم من [[export $(cat .env | xargs)]] بس القيم اللي فيها مسافات لازم تبقى جوه علامات تنصيص في .env.

وخد بالك من فرق مهم: [[docker run --env-file]] بياخد القيم حرفيًا بعلامات التنصيص لو موجودة، عكس compose اللي بيشيلها. فلو .env فيه [[KEY="abc"]] التطبيق هيشوف القيمة بالعلامات.

[[docker tag latest previous]] قبل البناء بيحفظ النسخة الشغالة باسم تاني، فالبناء الجديد ميمسحهاش. وده الـ rollback بتاعك.

[[-p 127.0.0.1:3000:3000]] بيفتح البورت على السيرفر نفسه بس، و Nginx اللي على السيرفر هو اللي يوصله. من غير [[127.0.0.1]] البورت بيبقى مفتوح للعالم حتى لو ufw قافله.

[[healthy]] بيحاول ٣٠ مرة كل ثانيتين. [[curl -f]] بيفشل لو الرد مش 2xx.

وفيه ثواني downtime بين [[rm -f]] و [[run]]، لأن اتنين containers مينفعش ياخدوا نفس البورت. لو محتاج صفر downtime، شغّل الجديد على بورت تاني وبدّل في Nginx (درس blue-green في تاب Nginx).`,
            when: "مشروع container واحد وراه Nginx على السيرفر. ولو عندك قاعدة بيانات أو أكتر من خدمة، compose أسهل.",
            mistakes: "في مشروع حقيقي كان السكربت بيمسح الـ image القديمة قبل البناء، فلو البناء فشل مفيش حاجة ترجعلها. وكان بيوقف الـ container قبل البناء، فالموقع يقع طول مدة الـ build. وكان بيطبع قيم متغيرات قاعدة البيانات ومفاتيح الدفع على الشاشة (وبالتالي في لوجات الـ CI) عشان «يتأكد إنها موجودة»؛ اطبع الأسماء بس. وكان بيبعت أسرار السيرفر كـ [[--build-arg]]، فبتتحفظ جوه الـ image وتبان في [[docker history]]. والصح إن [[NEXT_PUBLIC_*]] بس هي اللي تتبعت وقت البناء، والباقي وقت التشغيل بـ [[--env-file]]. و [[sleep 5]] مكان health check."
          },
          lines: [
            "أي فشل يوقف السكربت.",
            "اسم الـ container والـ image.",
            "لو .env مش موجود اقف.",
            "اقرا .env وخلي كل متغيراته export، وبعدين اقفل الوضع ده.",
            "دالة بتشغّل الـ container بالـ image اللي تديهالها: على localhost بس، بمتغيرات .env، ويقوم لوحده بعد reboot.",
            "دالة بتحاول ٣٠ مرة كل ثانيتين لحد ما [[/api/health]] يرد بنجاح.",
            "لو فيه latest، احفظها باسم previous.",
            "ابني الجديدة، والمتغيرات العامة بس كـ build-arg.",
            "شيل الـ container القديم (ومن غير خطأ لو مش موجود).",
            "شغّل الجديد.",
            "لو قام...",
            "...قول واعرض آخر اللوجات.",
            "لو مقامش...",
            "...قول هيرجع.",
            "...اعرض اللوجات عشان تعرف ليه.",
            "...شيل الجديد وشغّل previous.",
            "...واخرج بفشل.",
            "نهاية الـ if."
          ]
        },
        {
          cmd: "deploy-static.sh",
          title: "نشر موقع Vite ثابت على السيرفر من جهازك",
          desc: "أبسط نشر لفرونت React أو Vite: تبني على جهازك، ترفع dist لفولدر جديد على السيرفر، وتحوّل رابط [[current]] عليه. Nginx بيقدّم من [[current]]، فالتبديل لحظي، والنسخ القديمة موجودة لو احتجت ترجع.",
          example: R`#!/usr/bin/env bash
# من جهازك، جوه فولدر الفرونت
set -euo pipefail
SERVER=deploy@203.0.113.10
SITE=/var/www/example.com
REL=$(date +%Y%m%d-%H%M%S)

npm ci
npm run build
test -f dist/index.html

ssh "$SERVER" "mkdir -p $SITE/releases/$REL"
rsync -az --chmod=D755,F644 dist/ "$SERVER:$SITE/releases/$REL/"
ssh "$SERVER" "ln -sfn $SITE/releases/$REL $SITE/current"
ssh "$SERVER" "ls -1dt $SITE/releases/*/ | tail -n +6 | xargs -r rm -rf"
curl -fsS -o /dev/null -w '%{http_code} https://example.com/\n' https://example.com/`,
          try: "على سيرفر التجربة: [[sudo install -d -o deploy /var/www/example.com]]، وخلي [[root]] في Nginx يشاور على [[/var/www/example.com/current]]. انشر مرتين، وبعدين ارجع للنسخة الأولانية بـ [[ln -sfn]] على فولدرها واعمل refresh.",
          flag: "script",
          deep: {
            why: "موقع static مش محتاج Docker ولا build على السيرفر. بس النسخ اليدوي بيسيب ملفات قديمة، ومفيهوش رجوع. الطريقة دي بتحل الاتنين.",
            how: R`كل نشر في فولدر جديد باسم الوقت جوه [[releases]]، و [[current]] مجرد symlink بيشاور على واحد منهم. [[ln -sfn]]: [[-s]] رابط، و [[-f]] استبدل الموجود، و [[-n]] اعتبر الرابط القديم ملف ومتدخلش جواه. والرجوع = نفس الأمر على فولدر أقدم.

[[rsync -az]] بيرفع بالضغط وبيحافظ على الملفات، و [[--chmod=D755,F644]] بيظبط الصلاحيات: الفولدرات 755 والملفات 644. Nginx (يوزر www-data) محتاج يقرا بس، فمش محتاج [[chown www-data]] طالما الملفات مقروءة للكل.

[[test -f dist/index.html]] بيتأكد إن البناء طلّع حاجة فعلًا قبل ما ترفع فولدر فاضي.

التنضيف: [[ls -1dt]] بيرتّب الفولدرات من الأحدث، و [[tail -n +6]] بياخد من السادس وانت نازل، يعني بيسيب آخر ٥ نسخ.

ومش محتاج reload لـ Nginx: الملفات بتتقري من الديسك مع كل طلب، والـ reload لازم بس لو غيّرت إعدادات Nginx نفسها. اللي محتاج تظبطه في Nginx مرة واحدة: [[index.html]] بـ [[Cache-Control: no-cache]] والـ assets اللي في اسمها hash بكاش سنة (درس «كاش الملفات الثابتة» في تاب Nginx)، وده اللي بيخلي الناس تشوف الجديد من غير Ctrl+F5.

على ويندوز rsync مش موجود في Git Bash، شغّل السكربت من WSL.`,
            when: "مواقع Vite أو React أو أي static site على VPS فيه Nginx. ولو عايزها أوتوماتيك، نفس الخطوات تتحط في GitHub Actions.",
            mistakes: "في مشروع حقيقي كان النشر [[scp -r dist/* root@...]]: الدخول بـ root، و [[*]] مش بتنقل الملفات المخفية، ومفيش مسح للقديم، فالفولدر بيكبر للأبد بملفات assets قديمة. وكان فيه خطوة [[chmod -R 755]] على كل حاجة، فكل الملفات بقت executable، والصح 644 للملفات و 755 للفولدرات. وكان بيمسح [[/var/cache/nginx/*]] عشان «يحل مشكلة الكاش»، وده ملوش لازمة من غير proxy_cache؛ المشكلة الحقيقية كانت في هيدرز index.html. ومكانش فيه أي نسخة ترجعلها لو البناء الجديد بايظ."
          },
          lines: [
            "أي فشل يوقف السكربت.",
            "السيرفر.",
            "فولدر الموقع.",
            "اسم النسخة: التاريخ والوقت.",
            "سطّب المكتبات بالظبط زي الـ lockfile.",
            "ابني.",
            "اتأكد إن البناء طلّع index.html.",
            "اعمل فولدر النسخة الجديدة على السيرفر.",
            "ارفع dist جواه بصلاحيات مظبوطة.",
            "حوّل current على النسخة الجديدة.",
            "امسح كل النسخ ما عدا آخر ٥.",
            "اتأكد إن الموقع بيرد، واطبع الكود."
          ]
        },
        {
          cmd: "deploy.yml (SSH)",
          title: "كل push يدخل السيرفر ويحدّث لوحده",
          desc: "أبسط CD: كل push على main، GitHub Actions يدخل السيرفر بـ SSH ويعمل pull وبناء وتشغيل، ويتأكد من الـ health. هنا البناء على السيرفر نفسه، عكس درس «deploy عبر SSH» في تاب GitHub Actions اللي بيبني image في Actions ويعمل لها pull.",
          example: R`name: deploy
on:
  push:
    branches: [main]
concurrency:
  group: production
  cancel-in-progress: false
jobs:
  deploy:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: appleboy/ssh-action@v1.0.3
        with:
          host: $__{{ secrets.DEPLOY_HOST }}
          username: deploy
          key: $__{{ secrets.DEPLOY_SSH_KEY }}
          fingerprint: $__{{ secrets.DEPLOY_HOST_FINGERPRINT }}
          script: |
            set -e
            cd /opt/myapp
            git pull --ff-only origin main
            docker compose build
            docker compose up -d --wait --wait-timeout 120
            docker image prune -f
            curl -fsS http://127.0.0.1:3000/api/health`,
          try: R`على ريبو تجربة وسيرفر تجربة: اعمل مفتاح جديد [[ssh-keygen -t ed25519 -f deploy_key -N ""]]، العام في authorized_keys بتاع deploy، والخاص في secret. هات البصمة بـ [[ssh-keyscan -t ed25519 203.0.113.10 | ssh-keygen -lf -]] وحط الجزء اللي بيبدأ بـ SHA256 في secret تاني. وبعدين ادفع commit وتابع الـ run.`,
          flag: "script",
          deep: {
            why: "بدل ما تدخل السيرفر بإيدك بعد كل push، الـ workflow بيعمل نفس الأوامر. وأي فشل بيبان أحمر في GitHub بدل ما تكتشفه من عميل.",
            how: R`[[concurrency: group: production]] بيخلي نشر واحد بس يشتغل في نفس الوقت. لو عملت push مرتين ورا بعض، التاني بيستنى الأول يخلص بدل ما الاتنين يعملوا pull وbuild على نفس الفولدر. و [[cancel-in-progress: false]] عشان متقطعش نشر في النص.

[[appleboy/ssh-action]] بيدخل السيرفر بالمفتاح اللي في secret، وينفّذ الـ script هناك. و [[fingerprint]] هو بصمة مفتاح السيرفر: من غيرها الـ action بيصدّق أي سيرفر يرد على الـ IP ده (ممكن حد يتنصّت ويعمل نفسه سيرفرك).

[[set -e]] أول سطر في الـ script عشان أي أمر يفشل يوقف ويخلّي الـ job أحمر. و [[--ff-only]] عشان لو السيرفر عليه commit محلي يرفض. و [[--wait]] بيستنى الـ healthcheck، والـ curl في الآخر تأكيد من برّه compose.

[[timeout-minutes]] عشان لو حاجة علّقت (build واقف مثلًا) الـ job يقف بعد ربع ساعة بدل ٦ ساعات.

والسيرفر محتاج يقدر يعمل pull من الريبو: deploy key (مفتاح قراية بس) مضاف في إعدادات الريبو، مش مفتاحك الشخصي.

وخد بالك: البناء على سيرفر الإنتاج بياكل CPU ورام من الموقع وقت البناء. لو السيرفر صغير، الأحسن تبني الـ image في Actions وتعمل push لـ registry والسيرفر يعمل pull بس.`,
            when: "مشروع صغير أو متوسط على VPS واحد، وعايز النشر يبقى تلقائي من غير registry.",
            mistakes: "في مشروع حقيقي كان الـ workflow مربوط بفرع جانبي مش main، فكانوا بيعملوا merge ومحدش فاهم ليه مفيش نشر. ومكانش فيه concurrency فـ pushين ورا بعض بيعملوا build في نفس الوقت على نفس الفولدر، ومفيش fingerprint، ومفيش أي healthcheck بعد [[up -d]]: الـ job بيبقى أخضر حتى لو التطبيق بيقع بعد ثانيتين."
          },
          lines: [
            "اسم الـ workflow.",
            "بيشتغل على...",
            "...push...",
            "...على main بس.",
            "نشر واحد بس في نفس الوقت:",
            "اسم المجموعة.",
            "متلغيش نشر شغال؛ الجديد يستنى.",
            "الـ jobs.",
            "job النشر.",
            "ماكينة Ubuntu من GitHub.",
            "لو عدّى ربع ساعة يقف.",
            "الخطوات.",
            "action بيدخل السيرفر بـ SSH وينفّذ أوامر.",
            "إعداداته:",
            "عنوان السيرفر من secret.",
            "اليوزر.",
            "المفتاح الخاص من secret.",
            "بصمة السيرفر عشان يتأكد إنه بيكلّم السيرفر الصح.",
            "الأوامر اللي هتتنفّذ على السيرفر:",
            "أي فشل يوقف.",
            "فولدر المشروع.",
            "اسحب الجديد، ولو محتاج merge ارفض.",
            "ابني.",
            "بدّل واستنى الـ healthcheck.",
            "نضّف الـ images القديمة.",
            "تأكيد أخير إن التطبيق بيرد."
          ]
        },
        {
          cmd: "deploy-shared.sh",
          title: "نشر على استضافة مشتركة بـ git pull وفحص سريع",
          desc: "على الاستضافة المشتركة مفيش Docker ولا CI، بس غالبًا فيه SSH و git. فالنشر: السيرفر عليه clone للريبو وبيعمل pull، وبعدين [[php -l]] يتأكد إن مفيش syntax error، و curl يتأكد إن كل صفحة مهمة بترجع الكود الصح، بما فيها إن صفحة مش موجودة بترجع 404 فعلًا.",
          example: R`#!/usr/bin/env bash
# ~/.ssh/config فيه Host shared بالـ HostName و Port و User و IdentityFile
set -euo pipefail
SITE=https://example.com
DIR=domains/example.com/public_html

ssh shared "cd $DIR && git pull -q --ff-only origin main && git log --oneline -1"
ssh shared "cd $DIR && for f in index.php login.php contact.php; do php -l \$f || exit 1; done"

fail=0
for u in / /login /contact /no-such-page; do
  code=$(curl -s -o /dev/null --max-time 10 -w '%{http_code}' "$SITE$u" || true)
  want=200; [ "$u" = /no-such-page ] && want=404
  echo "$u -> $code (want $want)"
  [ "$code" = "$want" ] || fail=1
done
exit $fail`,
          try: "لو معاك استضافة فيها SSH: اعمل clone للريبو مكان public_html (بعد باك أب)، وظبط [[Host shared]] في [[~/.ssh/config]]، وشغّل السكربت. بعدين غيّر صفحة موجودة بحيث ترجع 500 وشوف السكربت يفشل.",
          flag: "script",
          deep: {
            why: "على استضافة مشتركة الناس غالبًا بترفع بـ FTP وبتنسى ملفات. git pull بيضمن إن السيرفر نسخة من الريبو بالظبط، والفحص بيقولك في ثواني لو حاجة باظت قبل ما عميل يقولك.",
            how: R`[[ssh shared]] بيستخدم الإعدادات اللي في [[~/.ssh/config]]: العنوان والبورت (الاستضافات المشتركة غالبًا على بورت غير 22) واليوزر والمفتاح، فالسكربت ميبقاش فيه أي بيانات دخول.

الأوامر بين علامات التنصيص المزدوجة بتتفك على جهازك الأول: [[$DIR]] بتتحط قيمتها قبل ما تتبعت. أما [[\$f]] فالـ backslash بيمنع جهازك يفكها، فتوصل للسيرفر [[$f]] ويفكها هو جوه اللوب.

[[php -l]] بيفحص syntax الملف من غير ما يشغّله. و [[|| exit 1]] بيخلي أول ملف فيه غلطة يوقف الـ ssh بفشل، و [[set -e]] عندك يوقف السكربت.

[[curl -w '%{http_code}']] بيطبع كود الرد بس، و [[-o /dev/null]] بيرمي الصفحة نفسها، و [[--max-time 10]] عشان سيرفر بطيء ميعلّقش السكربت. ولو curl فشل خالص بيطبع 000، و [[|| true]] بيمنع [[set -e]] يوقف قبل ما نطبع النتيجة.

وفحص صفحة مش موجودة مهم: مواقع كتير بترجع 200 لكل حاجة (soft 404)، وده بيضر في جوجل.`,
            when: "مواقع PHP أو static على استضافة مشتركة فيها SSH و git.",
            mistakes: "في مشروع حقيقي كان الاتصال بالسيرفر عن طريق سكربت Python وسيط بالباسورد بدل ssh مباشر بمفتاح. والملفات اللي مش في git (ملف الإعدادات، والفيديوهات، وصور العملاء المرفوعة) كانت محتاجة تتظبط على السيرفر بإيدك، وقاعدة البيانات ليها باك أب منفصل من لوحة الاستضافة، فـ git pull لوحده مش «نسخة كاملة». و curl كان من غير timeout، فمرة علّق على سيرفر بطيء."
          },
          lines: [
            "أي فشل يوقف السكربت.",
            "رابط الموقع.",
            "فولدر الموقع على السيرفر (نسبة للـ home).",
            "على السيرفر: اسحب الجديد واطبع آخر commit.",
            "على السيرفر: افحص syntax كل ملف مهم، وأول غلطة توقف.",
            "عدّاد الفشل.",
            "لف على الصفحات المهمة وصفحة مش موجودة.",
            "كود الرد بس، بحد أقصى ١٠ ثواني.",
            "المتوقع 200، إلا الصفحة المش موجودة متوقع 404.",
            "اطبع النتيجة.",
            "لو مش زي المتوقع علّم إنه فشل.",
            "نهاية اللوب.",
            "اخرج بـ 0 لو كله تمام، و 1 لو فيه حاجة غلط."
          ]
        }
      ]
    },
    {
      t: "SSL و Nginx",
      l: 2,
      n: "أول شهادة وتجديدها صح، و nginx.conf للإنتاج، وتعديل config مشترك بأمان، وباسورد لكل موظف",
      items: [
        {
          cmd: "init-ssl.sh",
          title: "أول شهادة SSL لـ Nginx جوه Docker",
          desc: R`مشكلة البيضة والفرخة: Nginx مش هيقوم بإعدادات بتشاور على شهادة لسه مش موجودة، و certbot محتاج Nginx شغال عشان Let's Encrypt تتأكد إن الدومين بتاعك.

الحل بمرحلتين: تتأكد إن DNS بيشاور على السيرفر، تشغّل Nginx بإعداد HTTP بس فيه مسار التحدي، تاخد الشهادة بـ webroot، وبعدين ترجّع الإعداد الكامل.`,
          example: R`#!/usr/bin/env bash
# أول مرة جرّب:  DRY=1 ./scripts/init-ssl.sh    ولو عدّى شغّله من غير DRY
set -euo pipefail
cd "$(dirname "$0")/.."
DOMAIN=example.com
EMAIL=you@example.com

IP=$(curl -4 -s --max-time 10 https://api.ipify.org) || { echo "can't get server IP" >&2; exit 1; }
for d in "$DOMAIN" "www.$DOMAIN"; do
  got=$(getent ahostsv4 "$d" | awk '{print $1; exit}' || true)
  [ "$got" = "$IP" ] || { echo "$d -> $__{got:-nothing}, server is $IP: fix DNS first" >&2; exit 1; }
done

mkdir -p certbot/www certbot/conf
cp nginx/nginx.conf nginx/nginx.conf.full
trap 'cp nginx/nginx.conf.full nginx/nginx.conf' EXIT
cp nginx/nginx-http-only.conf nginx/nginx.conf
docker compose up -d nginx && docker compose restart nginx

docker compose run --rm --entrypoint certbot certbot certonly $__{DRY:+--dry-run} \
  --webroot -w /var/www/certbot --email "$EMAIL" --agree-tos --no-eff-email \
  --keep-until-expiring -d "$DOMAIN" -d "www.$DOMAIN"

docker compose run --rm --entrypoint test certbot -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" \
  || { echo "no certificate yet (dry run?), nginx stays on HTTP" >&2; exit 1; }
cp nginx/nginx.conf.full nginx/nginx.conf
docker compose restart nginx
curl -fsSI "https://$DOMAIN" | head -1`,
          try: "على سيرفر تجربة ودومين تجربة (أو subdomain): شغّله بـ [[DRY=1]] الأول. لو عدّى، شغّله من غير DRY وافتح الموقع بـ https. وجرّب كمان تشغّله على دومين مش بيشاور على السيرفر: لازم يقف عند فحص DNS من غير ما يكلّم Let's Encrypt.",
          flag: "script",
          deep: {
            why: "أول شهادة هي أكتر خطوة الناس بتقف فيها في نشر Docker. ولو جرّبت غلط كذا مرة، Let's Encrypt بتوقفك (حد ٥ محاولات فاشلة في الساعة، و ٥ شهادات مكررة في الأسبوع). الترتيب ده بيخلي أول محاولة حقيقية تنجح.",
            how: R`فحص DNS الأول: [[getent ahostsv4]] بيجيب IPv4 اللي الدومين بيشاور عليه، ولو مش IP السيرفر نقف فورًا بدل ما نصرف محاولة على Let's Encrypt.

[[nginx-http-only.conf]] ملف صغير فيه server على بورت 80 بس، جواه [[location /.well-known/acme-challenge/ { root /var/www/certbot; }]] وأي حاجة تانية ترجع رسالة بسيطة. مفيهوش أي ssl_certificate، فـ Nginx يقوم.

webroot: certbot بيكتب ملف تحدي في [[certbot/www]]، و Nginx بيقدّمه من نفس الفولدر (متركّب في الاتنين)، و Let's Encrypt بتطلبه من برّه. لو وصلها يبقى الدومين بتاعك. ومحتاجش توقّف Nginx، عكس [[--standalone]].

[[--entrypoint certbot]] مهمة: لو خدمة certbot في compose ليها entrypoint بلوب التجديد (زي درس compose)، [[run]] من غيرها هيشغّل اللوب مش certonly.

[[$__{DRY:+--dry-run}]] معناها: لو المتغير DRY موجود حط [[--dry-run]]، وإلا ولا حاجة. الـ dry-run بيكلّم سيرفر التجربة بتاع Let's Encrypt (حدوده أوسع بكتير) ومش بيحفظ شهادة.

[[--keep-until-expiring]] لو الشهادة موجودة وصالحة ميطلبش جديدة، فتشغيل السكربت مرتين مش بيصرف من الحد.

الـ [[trap]] بيرجّع nginx.conf الكامل لما السكربت يخلص بأي شكل، عشان الملف اللي في git ميفضلش متغيّر. و [[cp]] مش [[mv]] عشان الملف يفضل نفس الـ inode، والـ bind mount جوه الـ container يشوف التغيير.

فحص الشهادة بيتعمل جوه container (بـ [[test -f]]) لأن فولدر live بتاع certbot ملك root، ويوزر deploy مش هيقدر يشوفه من برّه.`,
            when: "مرة واحدة لكل دومين جديد، بعد ما DNS يتظبط. بعد كده التجديد بيبقى لوحده (الدرس اللي بعده).",
            mistakes: R`في مشروع حقيقي كان السكربت من غير [[set -e]]، وبيشغّل Nginx بالإعداد الكامل اللي بيشاور على شهادة لسه مش موجودة فـ Nginx يقع، وبيوقف الخدمة بـ [[docker compose down nginx]] (والصح stop)، والمتغيرات من غير علامات تنصيص، ومن غير أي تجربة staging أو dry-run الأول.

وفي مشروع تاني كان بيستخدم [[--register-unsafely-without-email]]. الإيميل مهم لحسابك عند Let's Encrypt، بس خد بالك إنهم بطّلوا يبعتوا إيميلات «شهادتك قربت تخلص» من 2025، فالمراقبة لازم تبقى عندك.

وفي مشروع تالت كانت الشهادة بتطلع بـ [[--standalone]] (certbot يسمع على بورت 80 بنفسه)، فلازم توقف Nginx وقتها، والتجديد بعدين بيورث نفس الطريقة، وده اللي وقّع التجديد (الدرس اللي بعده).`
          },
          lines: [
            "أي فشل يوقف السكربت.",
            "اشتغل من فولدر المشروع.",
            "الدومين.",
            "الإيميل لحساب Let's Encrypt.",
            "IP السيرفر العام، ولو فشل اقف برسالة.",
            "لف على الدومين و www...",
            "...هات الـ IPv4 اللي بيشاور عليه ([[|| true]]: لو الدومين مش متسجّل getent بيفشل، ومع pipefail و [[set -e]] السكربت كان هيقع ساكت من غير رسالة).",
            "...لو مش IP السيرفر اقف قبل ما تكلّم Let's Encrypt.",
            "نهاية اللوب.",
            "الفولدرات اللي هتتركّب في Nginx و certbot.",
            "احفظ نسخة من الإعداد الكامل.",
            "أيًا كان اللي يحصل، رجّع الإعداد الكامل في الآخر.",
            "حط إعداد HTTP بس (نفس الـ inode).",
            "شغّل Nginx، واعمله restart عشان يقرا الإعداد الجديد.",
            "اطلب الشهادة بـ certbot (أو dry-run لو DRY موجود)...",
            "...بطريقة webroot، والإيميل، والموافقة على الشروط...",
            "...ومتطلبش جديدة لو فيه صالحة، للدومين و www.",
            "اتأكد إن الشهادة اتحفظت (من جوه container لأن الفولدر ملك root)...",
            "...ولو مش موجودة اقف.",
            "رجّع الإعداد الكامل بالـ SSL.",
            "restart لـ Nginx عشان يقراه.",
            "اتأكد إن https بيرد."
          ]
        },
        {
          cmd: "renew-ssl.sh",
          title: "تجديد الشهادة اللي مبيفشلش في صمت",
          desc: "Let's Encrypt بتدّي شهادة ٩٠ يوم، والتجديد لازم يبقى أوتوماتيك. السكربت ده بيشتغل من cron كل يوم: يجدد لو لازم، ولو اتجددت فعلًا يعمل reload لـ Nginx، وبعدين يسأل الموقع نفسه «الشهادة اللي بتقدّمها فاضلها كام يوم؟» ويصرّخ لو أقل من ١٤.",
          example: R`#!/usr/bin/env bash
# /etc/cron.d/myapp-ssl  (كل يوم الساعة 3:17):
# 17 3 * * * deploy /opt/myapp/scripts/renew-ssl.sh >> /home/deploy/ssl-renew.log 2>&1
set -euo pipefail
cd "$(dirname "$0")/.."
DOMAIN=example.com
echo "== $(date '+%F %T')"

docker compose run --rm --entrypoint certbot certbot renew \
  --deploy-hook 'touch /etc/letsencrypt/.renewed'

if docker compose run --rm --entrypoint sh certbot -c 'test -f /etc/letsencrypt/.renewed && rm /etc/letsencrypt/.renewed'; then
  docker compose exec -T nginx nginx -t
  docker compose exec -T nginx nginx -s reload
  echo "renewed, nginx reloaded"
fi

END=$(echo | openssl s_client -connect "$DOMAIN:443" -servername "$DOMAIN" 2>/dev/null | openssl x509 -noout -enddate | cut -d= -f2) || true
[ -n "$END" ] || { echo "ALERT: $DOMAIN unreachable or no certificate served" >&2; exit 1; }
DAYS=$(( ( $(date -d "$END" +%s) - $(date +%s) ) / 86400 ))
echo "served certificate: $DAYS days left"
[ "$DAYS" -ge 14 ] || { echo "ALERT: $DOMAIN expires in $DAYS days" >&2; exit 1; }`,
          try: "على سيرفر التجربة جرّب [[docker compose run --rm --entrypoint certbot certbot renew --dry-run]] الأول: لازم يقول Congratulations. بعدين شغّل السكربت بإيدك واقرا عدد الأيام، وحطه في cron واتأكد بعد يوم إن اللوج فيه سطر جديد.",
          flag: "script",
          deep: {
            why: "الشهادة بتخلص بعد ٩٠ يوم. لو التجديد بيفشل ومحدش شايف، هتعرف لما الموقع يطلع «Not Secure» للعملاء. وحتى لو التجديد نجح، Nginx لازم يعمل reload وإلا هيفضل يقدّم الشهادة القديمة من الذاكرة لحد ما تخلص.",
            how: R`[[certbot renew]] بيعدّي على كل شهادة، وبيجدد بس اللي فاضلها أقل من ٣٠ يوم. وبيستخدم نفس الطريقة اللي الشهادة طلعت بيها أول مرة (محفوظة في [[/etc/letsencrypt/renewal/example.com.conf]]): لو طلعت بـ webroot يجدد بـ webroot، ولو بـ standalone يحاول يسمع على 80 بنفسه.

[[--deploy-hook]] أمر بيتنفذ بس لما شهادة تتجدد فعلًا. بس هو بيتنفذ جوه container بتاع certbot، ومن هناك مش هيقدر يكلّم Nginx. فبنخليه يعمل ملف علامة [[.renewed]]، وبرّه نشوف: لو الملف موجود، امسحه واعمل reload.

[[nginx -t]] قبل الـ reload: لو الإعدادات فيها غلطة، [[set -e]] يوقف قبل ما نلمس Nginx الشغال. و [[-T]] في [[exec]] عشان cron مفيهوش terminal.

الفحص الأخير أهم سطر: [[openssl s_client]] بيتصل بالموقع زي أي متصفح، ويجيب الشهادة اللي Nginx «بيقدّمها فعلًا»، مش اللي على الديسك. فلو التجديد حصل والـ reload محصلش، أو التجديد نفسه فاشل من شهور، الرقم هيقل وهيطلع ALERT. و [[exit 1]] بيخلي cron (أو أي مراقبة) يعرف.

ولو certbot متسطب على السيرفر نفسه و Nginx في container، والشهادة طلعت standalone، التجديد لازم يوقف Nginx ويشغّله: [[certbot renew --pre-hook "docker compose -f /opt/myapp/compose.yml stop nginx" --post-hook "docker compose -f /opt/myapp/compose.yml start nginx"]]. بس الأحسن تحوّلها لـ webroot.

اختار طريقة واحدة: يا السكربت ده في cron، يا لوب التجديد جوه compose (الدرس الجاي). الـ cron أحسن لأن ليه لوج وتنبيه.`,
            when: "مع أي شهادة Let's Encrypt على Docker. حطه في cron مرة أو مرتين في اليوم؛ certbot مش هيعمل حاجة لو مفيش تجديد مطلوب.",
            mistakes: R`في مشروع حقيقي الشهادة طلعت بـ [[certbot certonly --standalone]]، والـ cron كان [[certbot renew --quiet]] كل يوم. الـ renew بيحاول يسمع على بورت 80 و Nginx ماسكه، فبيفشل. و [[--quiet]] بيخبّي الفشل، والـ cron مش متوجّه لأي لوج، فمحدش عرف لحد ما الشهادة خلصت فعلًا بعد ٩٠ يوم. والنسخ لفولدر ssl والـ restart كانوا بيحصلوا كل يوم حتى من غير تجديد، ومكانهم الصح [[--deploy-hook]].

وفي مشروع تاني كان certbot بيجدد كل ١٢ ساعة جوه compose وده شغال، بس Nginx عمره ما عمل reload، فكان بيقدّم الشهادة القديمة لحد ما حد يعمل restart بالصدفة.`
          },
          lines: [
            "أي فشل يوقف السكربت.",
            "اشتغل من فولدر المشروع.",
            "الدومين اللي هنفحصه.",
            "سطر بالتاريخ في اللوج.",
            "جدد أي شهادة فاضلها أقل من ٣٠ يوم...",
            "...ولو اتجددت فعلًا اعمل ملف علامة.",
            "لو ملف العلامة موجود (امسحه)...",
            "...افحص إعدادات Nginx.",
            "...واعمل reload عشان يقرا الشهادة الجديدة.",
            "...وقول.",
            "نهاية الـ if.",
            "تاريخ انتهاء الشهادة اللي الموقع بيقدّمها فعلًا. و || true عشان لو الموقع مش بيرد، set -e ميقفلش السكربت ساكت.",
            "لو مفيش تاريخ (الموقع واقع أو مفيش شهادة)، ده في حد ذاته تنبيه: اطبعه واخرج بفشل.",
            "كام يوم فاضل.",
            "اطبعه في اللوج.",
            "لو أقل من ١٤ يوم، اطبع تنبيه واخرج بفشل."
          ]
        },
        {
          cmd: "nginx.conf (Next.js)",
          title: "إعدادات Nginx للإنتاج قدام Next.js في Docker",
          desc: "ملف nginx.conf كامل لموقع Next.js في compose: يرفض أي دومين غريب، يحوّل HTTP و www لدومين واحد بـ https، TLS و HSTS، و gzip، و rate limit، و buffers كبيرة للكوكيز، وكاش سنة لملفات [[/_next/static]].",
          example: R`events { worker_connections 1024; }
http {
  include /etc/nginx/mime.types; client_max_body_size 20M;
  gzip on; gzip_proxied any; gzip_types text/css application/javascript application/json image/svg+xml;
  limit_req_zone $binary_remote_addr zone=perip:10m rate=10r/s;
  ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

  server { listen 80 default_server; return 444; }
  server { listen 443 ssl default_server; ssl_reject_handshake on; }
  server {
    listen 80; server_name example.com www.example.com;
    location /.well-known/acme-challenge/ { root /var/www/certbot; }
    location / { return 301 https://example.com$request_uri; }
  }
  server { listen 443 ssl; http2 on; server_name www.example.com; return 301 https://example.com$request_uri; }
  server {
    listen 443 ssl; http2 on; server_name example.com;
    add_header Strict-Transport-Security "max-age=63072000" always;
    add_header X-Content-Type-Options "nosniff" always;
    location / {
      proxy_pass http://app:3000;
      proxy_set_header Host $host;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
      proxy_buffer_size 128k; proxy_buffers 4 256k; proxy_busy_buffers_size 256k;
      limit_req zone=perip burst=20 nodelay;
    }
    location /_next/static/ { proxy_pass http://app:3000; add_header Cache-Control "public, max-age=31536000, immutable"; }
  }
}`,
          try: R`بعد ما تحطه: [[docker compose exec nginx nginx -t]]، وبعدين [[curl -I http://example.com]] (لازم 301)، و [[curl -I https://www.example.com]] (لازم 301 لـ example.com)، و [[curl -I -H "Host: other.test" http://203.0.113.10]] (لازم الاتصال يتقفل من غير رد).`,
          flag: "script",
          deep: {
            why: "Next.js لوحده مش مفروض يواجه الإنترنت: Nginx قدامه بيعمل TLS، ويضغط، ويحدد عدد الطلبات، ويرفض الدومينات الغريبة، وبيقدّم الملفات الثابتة بكاش طويل.",
            how: R`الـ default servers: أي طلب بـ Host مش واحد من دوميناتك (أو بالـ IP مباشرة) بيقع في الـ server اللي عليه [[default_server]]. على 80 بيرجع [[444]] (Nginx يقفل الاتصال من غير رد). وعلى 443 [[ssl_reject_handshake on]] بيرفض الـ TLS من الأول، فمش هيدّي شهادتك لدومين غريب. ده بيحميك لو حد وجّه دومينه على الـ IP بتاعك عشان يعمل نسخة من موقعك.

الشهادة متعرّفة مرة واحدة في [[http]]، وكل server على 443 بيورثها.

التحويلات: HTTP كله لـ https، و www على https لـ الدومين من غير www، فيبقى فيه عنوان واحد (canonical) وده أحسن لجوجل. ومسار [[acme-challenge]] على 80 مستثنى عشان تجديد الشهادة يشتغل.

[[http2 on;]] هي الطريقة الجديدة (من nginx 1.25.1) بدل [[listen 443 ssl http2]]. و [[ssl_protocols]] مش مكتوبة لأن الافتراضي في النسخ الجديدة TLSv1.2 و TLSv1.3.

[[X-Forwarded-Proto]] بيقول لـ Next.js إن الطلب الأصلي كان https، وإلا الـ redirects والكوكيز الـ secure ممكن تتلخبط. والـ buffers الكبيرة عشان مكتبات الـ auth بتحط كوكيز كبيرة، ومن غيرها بيطلع [[502 upstream sent too big header]].

[[limit_req_zone]] بيعمل عدّاد لكل IP بـ ١٠ طلبات في الثانية، و [[burst=20 nodelay]] بيسمح بدفعة ٢٠ فوقهم من غير تأخير (صفحة واحدة بتطلب ملفات كتير).

فخ مشهور: [[add_header]] بيتورث من الـ server للـ location بس لو الـ location مفيهوش ولا add_header. في [[/_next/static/]] فيه Cache-Control، فالـ HSTS مش هيتبعت على الملفات دي. مش مشكلة هنا، بس افتكرها لو ضيفت هيدرز أمان مهمة.

و [[proxy_pass http://app:3000]]: [[app]] اسم الخدمة في compose. Nginx بيحوّل الاسم لـ IP وقت ما يقوم، فلو app مش موجود ساعتها Nginx هيقع بـ host not found.`,
            when: "أي تطبيق Node (Next.js أو Express) في compose وراه Nginx container ماسك 80 و 443.",
            mistakes: "في مشروع حقيقي كان مفيش default_server، فالدومين اللي عمل نسخة من الموقع اتقفل بالاسم بس (server مخصوص ليه)، ومتحط عليه شهادة الموقع الأصلي، فالمتصفح بيطلع تحذير بدل ما الاتصال يترفض. وكان فيه [[X-XSS-Protection]] وده قديم والمتصفحات بطّلت تستخدمه، ومفيش Content-Security-Policy. وكان مكتوب [[listen 443 ssl http2]] اللي بيطلع warning في النسخ الجديدة."
          },
          lines: [
            "عدد الاتصالات لكل worker.",
            "بداية إعدادات HTTP.",
            "أنواع الملفات، وأقصى حجم رفع ٢٠ ميجا.",
            "gzip للنصوص و JSON و SVG، حتى للطلبات اللي جاية من proxy.",
            "عدّاد طلبات لكل IP: ١٠ في الثانية.",
            "الشهادة، لكل server على 443.",
            "المفتاح الخاص.",
            "أي دومين غريب على 80: اقفل الاتصال من غير رد.",
            "أي دومين غريب على 443: ارفض الـ TLS من الأول.",
            "server لـ HTTP:",
            "على 80 للدومين و www.",
            "ملفات تحدي Let's Encrypt من فولدر certbot.",
            "أي حاجة تانية: حوّل لـ https على الدومين الأساسي.",
            "نهاية الـ server.",
            "www على https: حوّل للدومين من غير www.",
            "الـ server الأساسي:",
            "على 443 بـ HTTP/2 للدومين الأساسي.",
            "HSTS: المتصفح يستخدم https بس لمدة سنتين.",
            "متخمّنش نوع الملف.",
            "كل الطلبات:",
            "ابعتها لـ Next.js (اسم الخدمة في compose).",
            "ابعت الدومين الأصلي.",
            "و IP الزائر.",
            "و إن الطلب كان https.",
            "buffers كبيرة للهيدرز والكوكيز الكبيرة.",
            "طبّق الـ rate limit مع دفعة ٢٠.",
            "نهاية الـ location.",
            "ملفات Next.js الثابتة (أساميها فيها hash): كاش سنة.",
            "نهاية الـ server.",
            "نهاية http."
          ]
        },
        {
          cmd: "nginx-apply.sh",
          title: "تركيب بلوك في config مشترك من غير ما توقّع Nginx",
          desc: "لما كذا مشروع على سيرفر واحد بيشاركوا Nginx container واحد وملف nginx.conf واحد، كل مشروع يحط البلوك بتاعه بين علامتين. السكربت ده: باك أب، يشيل البلوك القديم ويحط الجديد في نسخة مؤقتة، يختبرها في container مؤقت بنفس الـ image والشبكة، ولو نجح بس يكتبها في الملف الحقيقي ويعمل reload.",
          example: R`#!/usr/bin/env bash
# deploy/nginx-apply.sh deploy/nginx/myapp-ssl.conf
set -euo pipefail
SNIPPET="$__{1:?usage: nginx-apply.sh <snippet.conf>}"
CONF=/home/deploy/shared/nginx/nginx.conf
CTR=shared-nginx
NET=shared_proxy
BEGIN="# >>> myapp (managed)"; END="# <<< myapp"

b=$(grep -cF "$BEGIN" "$CONF" || true); e=$(grep -cF "$END" "$CONF" || true)
[ "$b" = "$e" ] && [ "$b" -le 1 ] || { echo "markers broken in $CONF, fix by hand" >&2; exit 1; }
cp "$CONF" "$CONF.bak.$(date +%Y%m%d%H%M%S)"
ls -1t "$CONF".bak.* | tail -n +6 | xargs -r rm --
TMP=$(mktemp); trap 'rm -f "$TMP" "$TMP.new"' EXIT
sed "/$BEGIN/,/$END/d" "$CONF" > "$TMP"
last=$(grep -n '^}' "$TMP" | tail -1 | cut -d: -f1)
{ head -n $((last - 1)) "$TMP"; echo "    $BEGIN"; cat "$SNIPPET"; echo "    $END"; tail -n +"$last" "$TMP"; } > "$TMP.new"

IMAGE=$(docker inspect -f '{{.Config.Image}}' "$CTR")
docker run --rm --network "$NET" -v "$TMP.new:/etc/nginx/nginx.conf:ro" \
  -v /home/deploy/certbot/conf:/etc/letsencrypt:ro "$IMAGE" nginx -t \
  || { echo "nginx -t failed, $CONF not touched" >&2; exit 1; }

cat "$TMP.new" > "$CONF"
if [ "$(stat -c %i "$CONF")" = "$(docker exec "$CTR" stat -c %i /etc/nginx/nginx.conf)" ]; then
  docker exec "$CTR" nginx -s reload
else
  docker restart "$CTR" >/dev/null
fi`,
          try: "على سيرفر التجربة: شغّل nginx container بملف متركّب، وجرّب السكربت ببلوك سليم، وبعدين ببلوك فيه غلطة (امسح ; من سطر): لازم يقول failed والملف الحقيقي ميتغيّرش والموقع يفضل شغال. وبعدين افتح الملف بـ vim واحفظه، وشغّل السكربت تاني وشوف إنه عمل restart بدل reload.",
          flag: "script",
          deep: {
            why: "لو عدّلت nginx.conf مشترك بإيدك وغلطت، كل المواقع اللي على السيرفر بتقع مع أول restart. السكربت ده بيضمن إن الملف الحقيقي ميتغيّرش إلا بإعدادات اتختبرت، وإن التطبيق بتاعك يلمس البلوك بتاعه بس.",
            how: R`العلامتين [[# >>> myapp]] و [[# <<< myapp]] بيحددوا البلوك بتاعك. [[sed "/BEGIN/,/END/d"]] بيمسح كل السطور من العلامة الأولى للتانية، فالتشغيل مرتين مش بيكرر البلوك. وقبلها بنعد العلامات: لو واحدة موجودة والتانية لأ (حد مسحها بإيده)، الـ sed هيمسح لآخر الملف، فبنقف.

البلوك الجديد بيتحط قبل آخر [[}]] في الملف (قفلة [[http {}]]): [[head]] لحد قبلها، وبعدين البلوك بالعلامات، وبعدين [[tail -n +"$last"]] من القفلة للآخر.

الاختبار: [[docker run --rm]] بنفس الـ image بتاعة Nginx الشغال (نفس النسخة ونفس الـ modules)، والملف الجديد متركّب مكان nginx.conf، والشهادات متركّبة، وعلى نفس الشبكة. الشبكة مهمة لأن [[nginx -t]] بيحاول يحوّل أسامي الـ upstream زي [[app:3000]] لـ IP، ومن غير الشبكة هيفشل بـ host not found حتى لو الإعدادات سليمة.

الكتابة بـ [[cat new > CONF]] مش [[mv]] ولا [[cp]] لملف جديد: [[>]] بيكتب جوه نفس الملف (نفس الـ inode). الـ bind mount في Docker مربوط بالـ inode مش بالاسم، فلو الملف اتبدّل بملف جديد، الـ container هيفضل شايف القديم. عشان كده بنقارن رقم الـ inode برّه وجوه: لو زي بعض [[reload]] (من غير downtime)، ولو مختلفين (حد فتح الملف بـ vim أو [[sed -i]] قبل كده وبدّله) لازم [[restart]] عشان الـ container يتركّب من جديد.

والـ [[.bak]] بيتعمل كل مرة، و [[tail -n +6]] بيسيب آخر ٥ بس.`,
            when: "Nginx واحد مشترك بين كذا مشروع، وكل مشروع محتاج يضيف أو يغيّر البلوك بتاعه من سكربت النشر.",
            mistakes: R`في مشروع حقيقي كان السكربت بيفترض إن آخر [[}]] في الملف هو قفلة http، فلو فيه [[stream {}]] بعده البلوك كان هيتحط غلط (هنا [[nginx -t]] هيمسكها ويرفض). ولو حد مسح علامة النهاية بإيده، كان بيضيف بلوك مكرر، ودلوقتي بيقف. والـ [[.bak]] كانت بتتراكم من غير تنضيف.

والأحسن على المدى الطويل: Nginx المشترك يعمل [[include /etc/nginx/conf.d/*.conf;]] وكل مشروع يحط ملف لوحده، بدل ما كل مشروع يعدّل ملف مشروع تاني.`
          },
          lines: [
            "أي فشل يوقف السكربت.",
            "ملف البلوك من أول argument، ولو مش موجود اطبع طريقة الاستخدام واقف.",
            "ملف Nginx المشترك على السيرفر.",
            "اسم الـ container بتاع Nginx.",
            "الشبكة اللي Nginx والتطبيقات عليها.",
            "علامة البداية والنهاية للبلوك بتاعنا.",
            "عدّ كل علامة موجودة كام مرة.",
            "لو العدد مش متساوي أو أكتر من واحد، اقف.",
            "باك أب بالتاريخ.",
            "سيب آخر ٥ باك أب بس.",
            "ملف مؤقت، ويتمسح في الآخر مهما حصل.",
            "انسخ الملف من غير البلوك القديم.",
            "رقم سطر آخر [[}]] في الملف.",
            "اللي قبلها، والبلوك الجديد بين العلامات، وبعدين القفلة وما بعدها، في ملف جديد.",
            "اسم الـ image بتاعة Nginx الشغال.",
            "اختبر الملف الجديد في container مؤقت على نفس الشبكة...",
            "...ومعاه الشهادات...",
            "...ولو فشل اقف والملف الحقيقي زي ما هو.",
            "اكتب الجديد جوه نفس الملف (نفس الـ inode).",
            "لو الـ container شايف نفس الملف...",
            "...reload من غير downtime.",
            "وإلا...",
            "...restart عشان يتركّب الملف من جديد.",
            "نهاية الـ if."
          ]
        },
        {
          cmd: "dashboard_users.sh",
          title: "يوزر وباسورد لكل موظف على لوحة ورا Nginx",
          desc: "لوحة داخلية ورا Nginx basic auth، بس بدل باسورد واحد للكل، كل موظف ليه يوزر (الكود بتاعه) وباسورد عشوائي. السكربت بيجيب الموظفين النشطين من Postgres، يولّد باسوردات، يضيفهم لملف htpasswd، ويطبع جدول مرة واحدة تديه للموظفين.",
          example: R`#!/usr/bin/env bash
# sudo bash deploy/nginx/dashboard_users.sh           كل الموظفين النشطين
# sudo bash deploy/nginx/dashboard_users.sh ali sara  باسورد جديد لناس معينين
set -euo pipefail
AUTH=/etc/nginx/.htpasswd-dashboard
cd "$(dirname "$0")/../.."
q() { docker compose exec -T postgres psql -U app -d appdb -tAc "$1"; }
[ -f "$AUTH" ] || { echo "first time: htpasswd -cB $AUTH admin" >&2; exit 1; }

if [ $# -gt 0 ]; then CODES="$*"
else CODES=$(q "SELECT lower(code) FROM staff WHERE is_active AND code IS NOT NULL ORDER BY code"); fi

printf '%-8s %-20s %s\n' code name password
for code in $CODES; do
  [[ "$code" =~ ^[a-z0-9]+$ ]] || { echo "skip bad code: $code" >&2; continue; }
  name=$(q "SELECT display_name FROM staff WHERE lower(code) = '$code' AND is_active")
  [ -n "$name" ] || { echo "$code not active, skipped" >&2; continue; }
  pass=$(openssl rand -base64 12 | tr -d '/+=' | cut -c1-10)
  printf '%s\n' "$pass" | htpasswd -iB "$AUTH" "$code" 2>/dev/null
  printf '%-8s %-20s %s\n' "$code" "$name" "$pass"
done
nginx -t -q && systemctl reload nginx || echo "nginx -t failed, not reloaded" >&2`,
          try: "على سيرفر التجربة: [[sudo apt install apache2-utils]]، واعمل الملف بـ [[htpasswd -cB]]، وجرّب السكربت بكودين مكتوبين بإيدك. بعدين جرّب كود فيه علامة تنصيص (زي [[a'b]]): لازم يتعدّى بـ skip. وافتح اللوحة بيوزر منهم.",
          flag: "script",
          deep: {
            why: "باسورد واحد متشارك معناه إنك مش هتعرف مين عمل إيه، ولو موظف ساب لازم تغيّر الباسورد للكل. يوزر لكل واحد بيحل الاتنين، و Nginx بيبعت اسم اليوزر للتطبيق.",
            how: R`[[q]] دالة صغيرة بتشغّل SQL جوه container بتاع Postgres: [[-t]] من غير عناوين أعمدة، و [[-A]] من غير محاذاة، فالناتج قيم خام تنفع في لوب. و [[-T]] في [[exec]] عشان السكربت مش terminal.

[[$#]] عدد الـ arguments: لو كتبت أكواد، بيجدد ليهم بس، وإلا بيجيب كل النشطين.

الـ regex [[^[a-z0-9]+$]] بيقبل حروف صغيرة وأرقام بس، وده اللي بيخلي حط [[$code]] جوه SQL آمن: أي علامة تنصيص أو مسافة بتترفض قبل ما توصل للاستعلام.

[[openssl rand -base64 12]] بيطلع ١٦ حرف عشوائي، و [[tr -d '/+=']] بيشيل الرموز اللي بتلخبط لما حد ينقلها، و [[cut -c1-10]] بياخد ١٠.

[[htpasswd -iB]]: [[-i]] ياخد الباسورد من stdin بدل سطر الأوامر، و [[-B]] يشفّره بـ bcrypt. الباسورد في سطر الأوامر ([[-b]]) بيبان لأي يوزر على السيرفر في [[ps]] طول ما الأمر شغال.

[[printf '%-8s']] بيطبع النص في عمود عرضه ٨ على الشمال، فالجدول يطلع مترتب.

وفي Nginx: [[auth_basic "Dashboard"; auth_basic_user_file /etc/nginx/.htpasswd-dashboard;]] جوه location اللوحة، و [[proxy_set_header X-Remote-User $remote_user;]] عشان التطبيق يعرف مين. ولما موظف يمشي: [[htpasswd -D /etc/nginx/.htpasswd-dashboard ali]].`,
            when: "لوحة داخلية أو أداة admin لفريق صغير، ومش عايز تبني نظام تسجيل دخول كامل.",
            mistakes: "في مشروع حقيقي كان السكربت بيحط [[$code]] جوه SQL مباشرة من غير أي فحص، فلو اتبعت كـ argument وفيه علامة تنصيص يبقى SQL injection. وكان بيستخدم [[htpasswd -bB]] فالباسورد بيبان في [[ps]]. ولو [[nginx -t]] فشل مكانش بيطبع أي حاجة، فتفتكر إن كله تمام. وخد بالك إن الباسوردات بتتطبع على الشاشة وبتفضل في الـ scrollback، فبعد ما توزّعها اعمل [[clear]]."
          },
          lines: [
            "أي فشل يوقف السكربت (مع استثناءات [[||]] المقصودة).",
            "ملف اليوزرز والباسوردات بتاع Nginx.",
            "روح لفولدر المشروع (فين ما كان السكربت).",
            "دالة بتشغّل SQL في Postgres وترجع النتيجة خام.",
            "لو الملف مش موجود، قول تعمله إزاي واقف.",
            "لو كتبت أكواد، استخدمها...",
            "...وإلا هات أكواد كل الموظفين النشطين.",
            "عنوان الجدول.",
            "لف على الأكواد:",
            "لو الكود فيه أي حاجة غير حروف صغيرة وأرقام، عدّيه.",
            "هات اسم الموظف لو نشط.",
            "لو مش نشط، عدّيه.",
            "باسورد عشوائي ١٠ حروف من غير رموز.",
            "ضيفه أو حدّثه في الملف، والباسورد من stdin مش من سطر الأوامر.",
            "اطبع صف في الجدول.",
            "نهاية اللوب.",
            "لو إعدادات Nginx سليمة اعمل reload، وإلا قول."
          ]
        }
      ]
    },
    {
      t: "Docker للإنتاج",
      l: 2,
      n: "compose كامل بـ Nginx و certbot، و Dockerfile لـ Next.js و Vite، ونمط dev و prod، و Mongo",
      items: [
        {
          cmd: "compose.yml (app + nginx + certbot)",
          title: "الموقع كله في ملف واحد: التطبيق و Nginx والتجديد",
          desc: "ملف compose بيشغّل موقع كامل: التطبيق جوه الشبكة الداخلية بس، و Nginx هو الوحيد اللي ماسك 80 و 443، و certbot بيجدد كل ١٢ ساعة في فولدرات مشتركة مع Nginx، و Nginx بيعمل reload كل ٦ ساعات عشان ياخد الشهادة الجديدة.",
          example: R`services:
  app:
    build:
      context: .
      args:
        NEXT_PUBLIC_API_URL: $__{NEXT_PUBLIC_API_URL}
    env_file: .env
    environment:
      NODE_ENV: production
    expose: ["3000"]
    healthcheck:
      test: ["CMD", "node", "-e", "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1),()=>process.exit(1))"]
      interval: 30s
    restart: unless-stopped

  nginx:
    image: nginx:1.27-alpine
    ports: ["80:80", "443:443"]
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./certbot/www:/var/www/certbot:ro
      - ./certbot/conf:/etc/letsencrypt:ro
    command: /bin/sh -c 'while :; do sleep 6h; nginx -s reload; done & exec nginx -g "daemon off;"'
    depends_on: [app]
    restart: unless-stopped

  certbot:
    image: certbot/certbot
    volumes:
      - ./certbot/www:/var/www/certbot
      - ./certbot/conf:/etc/letsencrypt
    entrypoint: /bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $$!; done'
    restart: unless-stopped`,
          try: "على سيرفر التجربة بعد أول شهادة: [[docker compose up -d]]، وبعدين [[ss -tlnp]]: لازم تلاقي 80 و 443 بس، ومفيش 3000. وجرّب [[docker compose exec certbot certbot renew --dry-run]].",
          flag: "script",
          deep: {
            why: "ملف واحد تعمل بيه [[up -d]] فيقوم الموقع كله بالـ SSL والتجديد، وتقدر تنقله لسيرفر تاني كما هو.",
            how: R`[[expose]] مش [[ports]]: [[expose]] بيفتح البورت للخدمات التانية في نفس الشبكة بس (Nginx يوصله بـ [[app:3000]])، ومحدش من برّه السيرفر يقدر. لو كتبت [[ports: ["3000:3000"]]] التطبيق هيبقى مكشوف للعالم من غير Nginx، يعني من غير SSL ومن غير rate limit، و ufw مش هيمنعه لأن Docker بيعدّي منه.

[[args]] وقت البناء للحاجات العامة بس ([[NEXT_PUBLIC_*]] اللي Next.js بيحطها في الجافاسكربت اللي بيروح للمتصفح أصلًا). أي سر (مفتاح قاعدة بيانات أو دفع) يتقري وقت التشغيل من [[env_file]]، لأن الـ build args بتتحفظ في طبقات الـ image.

[[healthcheck]] بـ node نفسه ([[fetch]] موجود من Node 18)، عشان صور كتير مفيهاش curl ولا wget. وده اللي بيخلي [[docker compose up --wait]] في سكربتات النشر يعرف إن التطبيق قام فعلًا.

Nginx: الشهادات والـ webroot متركّبين [[:ro]] (قراية بس)، و certbot متركّبين عنده كتابة. الـ [[command]] بيشغّل لوب في الخلفية بيعمل [[nginx -s reload]] كل ٦ ساعات، و [[exec nginx]] بيخلي nginx هو البروسيس الأساسي. ده اللي بيخلي الشهادة الجديدة تتقري.

certbot: [[certbot renew]] كل ١٢ ساعة (مش هيعمل حاجة إلا لو فاضل أقل من ٣٠ يوم). [[sleep 12h & wait $$!]] بدل [[sleep 12h]] عادي عشان الـ [[trap]] يشتغل ويقفل فورًا مع [[docker compose stop]]. و [[$$]] في compose معناها [[$]] حرفيًا (وإلا compose هيحاول يفكها كمتغير).

ولو عايز لوج وتنبيه، استبدل اللوبين دول بسكربت التجديد في cron (الدرس «تجديد الشهادة»).`,
            when: "موقع Node أو Next.js على VPS لوحده، ومفيش Nginx تاني على السيرفر.",
            mistakes: R`في مشروع حقيقي كان certbot بيجدد كل ١٢ ساعة، بس Nginx عمره ما عمل reload، فبيفضل شغال بالشهادة القديمة من الذاكرة لحد ما حد يعمل restart، والشهادة خلصت فعلًا. وكان التطبيق عليه [[ports: "5000:3000"]] فمكشوف للعالم متخطّي Nginx والـ rate limit والـ SSL. و [[NODE_ENV=development]] في الإنتاج. وأسرار السيرفر (مفتاح الإدارة لقاعدة البيانات، و secret الدفع) كانت متبعتة كـ build args، فمحفوظة جوه الـ image لأي حد يوصلها.`
          },
          lines: [
            "الخدمات.",
            "التطبيق:",
            "يتبني...",
            "...من الفولدر الحالي...",
            "...ومعاه متغيرات وقت البناء:",
            "الـ URL العام بس (بيتقري من .env اللي جنب الملف).",
            "باقي المتغيرات (والأسرار) وقت التشغيل.",
            "ومتغيرات ثابتة:",
            "وضع الإنتاج.",
            "البورت مفتوح للشبكة الداخلية بس، مش للعالم.",
            "فحص الصحة:",
            "node يطلب [[/api/health]] ويخرج 0 لو نجح و 1 لو لأ.",
            "كل ٣٠ ثانية.",
            "يقوم لوحده لو وقع أو السيرفر عمل reboot، إلا لو وقّفته بإيدك.",
            "Nginx:",
            "نسخة محددة من الـ image.",
            "الوحيد اللي ماسك 80 و 443 على السيرفر.",
            "ملفات متركّبة:",
            "الإعدادات، قراية بس.",
            "فولدر تحدي Let's Encrypt.",
            "الشهادات.",
            "لوب في الخلفية بيعمل reload كل ٦ ساعات، و nginx نفسه هو البروسيس الأساسي.",
            "يتعمل بعد التطبيق (عشان اسم app يبقى موجود).",
            "يقوم لوحده.",
            "certbot:",
            "الـ image الرسمية.",
            "نفس الفولدرات، بصلاحية كتابة:",
            "فولدر التحدي.",
            "الشهادات.",
            "لوب: جدد، واستنى ١٢ ساعة، ويقفل فورًا مع stop.",
            "يقوم لوحده."
          ]
        },
        {
          cmd: "Dockerfile (Next.js)",
          title: "image صغيرة لـ Next.js بـ 3 مراحل ويوزر عادي",
          desc: R`Dockerfile بـ 3 مراحل: واحدة تسطّب المكتبات، وواحدة تبني، والأخيرة فيها [[server.js]] والمكتبات اللي بيستخدمها فعلًا بس (وضع standalone). النتيجة image أصغر بكتير، وبتشتغل بيوزر عادي مش root.

ومعاها .dockerignore، لأن غلطة فيه ممكن تشيل ملفات من الـ build من غير ما تحس.`,
          example: R`# next.config.ts لازم فيه:  output: "standalone"
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL NEXT_TELEMETRY_DISABLED=1
RUN npm run build && test -f .next/standalone/server.js

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]

# ---- .dockerignore ----
node_modules
.next
.env*
screenshots/`,
          try: "ابنيه: [[docker build -t myapp .]] وشوف الحجم بـ [[docker images myapp]]. وبعدين [[docker run --rm myapp ls public]]: لازم تلاقي كل صورك. وجرّب [[docker run --rm myapp whoami]]: لازم nextjs مش root.",
          flag: "script",
          deep: {
            why: "image فيها node_modules كامل وكود المصدر بتبقى ١ جيجا أو أكتر، وبتشتغل root. الـ standalone بيطلّع image بـ ١٥٠ ميجا تقريبًا فيها بس اللي بيشتغل، ولو حد اخترق التطبيق مش هيبقى root جوه الـ container.",
            how: R`المرحلة الأولى [[deps]]: بتنسخ package.json والـ lockfile بس، وبعدين [[npm ci]]. طول ما الملفين دول متغيروش، Docker بياخد الطبقة دي من الكاش، فالبناء بيبقى سريع لما تغيّر الكود بس. و [[npm ci]] بيلتزم بالـ lockfile بالظبط، عكس [[npm install]] اللي ممكن يحدّثه.

المرحلة التانية [[builder]]: بتاخد node_modules من الأولى وتنسخ الكود وتبني. [[ARG]] ثم [[ENV]] للمتغيرات العامة بس: Next.js بيحط قيم [[NEXT_PUBLIC_*]] جوه الجافاسكربت وقت البناء، فلازم تبقى موجودة هنا، ومش هتنفع لو اتحطت وقت التشغيل. و [[test -f]] بيتأكد إن standalone اتعمل (لو نسيت [[output: "standalone"]] البناء هيفشل هنا بدل ما يفشل بعدين).

المرحلة الأخيرة [[runner]]: بتبدأ من image نضيفة، وتنسخ ٣ حاجات بس: [[public]]، و [[.next/standalone]] (فيها server.js و node_modules المتصغّرة)، و [[.next/static]] (standalone مش بينسخها لوحده). [[--chown]] في الـ COPY نفسه بدل [[RUN chown -R]] اللي بيعمل طبقة تانية بنفس الحجم.

[[HOSTNAME=0.0.0.0]] عشان السيرفر يسمع على كل الواجهات جوه الـ container، وإلا Nginx مش هيوصله.

.dockerignore: node_modules و .next عشان ميتنسخوش من جهازك (ويتلخبطوا مع اللي اتبنى جوه)، و [[.env*]] عشان الأسرار متدخلش الـ image أبدًا. وخد بالك إن الـ patterns فيه مش زي .gitignore: [[*.png]] بتطابق صور الجذر بس، لكن [[**/*.png]] بتطابق كل الصور في كل الفولدرات.`,
            when: "أي مشروع Next.js هتنشره بـ Docker. والـ healthcheck حطه في compose (الدرس اللي قبله).",
            mistakes: R`في مشروع حقيقي كان الـ .dockerignore فيه [[**/*.png]] عشان يشيل الـ screenshots اللي في المشروع، فصور public (اللوجو والأيقونات) اختفت من الـ build. محليًا كل حاجة شغالة، وجوه الـ container الصور بـ 404. خلي الاستبعاد لفولدر محدد.

وفي مشروع تاني كان مفتاح الإدارة لقاعدة البيانات و secret الدفع متبعتين كـ [[ARG]] و [[ENV]] في مرحلة البناء، فمحفوظين في طبقات الـ image وبيبانوا في [[docker history]]. الصح: العام بس وقت البناء، والأسرار وقت التشغيل (أو [[RUN --mount=type=secret]] لو البناء نفسه محتاجها). وكان [[npm install --legacy-peer-deps]] بيخبّي تعارضات النسخ، و [[chown -R]] بيعمل طبقة كبيرة زيادة، ومكتبات بناء تقيلة (vips-dev) في مرحلة التشغيل. وكان الـ entrypoint بيشغّل migration على قاعدة الإنتاج مع كل تشغيل container، بتوكن إدارة كامل، وكان فيه ملفين entrypoint واحد بيشاور على .js والتاني على .mjs.`
          },
          lines: [
            "مرحلة المكتبات، من node على alpine.",
            "فولدر الشغل.",
            "انسخ ملفات المكتبات بس (عشان الكاش).",
            "سطّب بالظبط زي الـ lockfile.",
            "مرحلة البناء.",
            "فولدر الشغل.",
            "خد node_modules من المرحلة اللي قبلها.",
            "انسخ الكود كله.",
            "متغير بيتبعت وقت البناء ([[--build-arg]]).",
            "حطه في البيئة عشان Next.js يقراه، واقفل إرسال الإحصائيات.",
            "ابني، واتأكد إن server.js بتاع standalone اتعمل.",
            "مرحلة التشغيل، من image نضيفة.",
            "فولدر الشغل.",
            "وضع الإنتاج، والبورت، واسمع على كل الواجهات.",
            "اعمل جروب ويوزر عاديين.",
            "انسخ public بملكية اليوزر.",
            "انسخ السيرفر المتصغّر.",
            "انسخ الملفات الثابتة (standalone مش بينسخها لوحده).",
            "اشتغل باليوزر العادي من هنا ورايح.",
            "توثيق إن التطبيق على 3000.",
            "شغّل السيرفر.",
            ".dockerignore: متنسخش node_modules بتاعة جهازك.",
            "ولا البناء القديم.",
            "ولا أي ملف أسرار.",
            "ولا فولدر الـ screenshots بس (مش كل الصور)."
          ]
        },
        {
          cmd: "Dockerfile (Vite + nginx)",
          title: "موقع Vite و Nginx في image واحدة، و /api للباك إند",
          desc: "الفرونت يتبني بـ Node، والناتج يتحط في image بتاعة Nginx صغيرة. و Nginx نفسه بيحوّل أي طلب لـ [[/api/]] للباك إند، فالفرونت والـ API على نفس الدومين ومفيش CORS. ومعاه إعدادات كاش بحيث محدش يعلق على نسخة قديمة بعد النشر.",
          example: R`# ---- Dockerfile ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN VITE_API_BASE_URL= npm run build
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# ---- nginx.conf ----
map $http_upgrade $conn { default upgrade; '' close; }
server {
  listen 80;
  root /usr/share/nginx/html;
  client_max_body_size 100M;
  location = /index.html { add_header Cache-Control "no-cache"; }
  location /assets/ { add_header Cache-Control "public, max-age=31536000, immutable"; try_files $uri =404; }
  location / { try_files $uri $uri/ /index.html; }
  location /api/ {
    proxy_pass http://backend:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $conn;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_read_timeout 600s;
  }
}`,
          try: "ابنيه وشغّله جنب الباك إند في compose. افتح صفحة داخلية مباشرة (زي [[/settings]]) واعمل refresh: لازم تفتح مش 404. وبعدين [[curl -I localhost/index.html]] و [[curl -I localhost/assets/<اسم ملف>]] وقارن Cache-Control.",
          flag: "script",
          deep: {
            why: "SPA محتاجة ٣ حاجات من السيرفر: أي مسار يرجّع index.html، والملفات الثابتة بكاش طويل من غير ما index.html يتكاش، والـ API على نفس الدومين. الملفين دول بيعملوا التلاتة.",
            how: R`الـ Dockerfile مرحلتين: Node يبني، وبعدين [[nginx:alpine]] ياخد [[dist]] بس. Node مش موجود في الـ image النهائية خالص. ومش محتاج [[CMD]]، الـ image بتاعة nginx فيها واحد جاهز.

[[VITE_API_BASE_URL=]] (فاضي) قبل [[npm run build]] بيخلي الفرونت يطلب [[/api/...]] بروابط نسبية على نفس الدومين، و Nginx هو اللي يوصلها للباك إند. فنفس الـ image تشتغل على أي دومين.

الكاش: Vite بيحط hash في أسامي الملفات جوه [[/assets/]]، فأي تغيير = اسم جديد، فينفع تتكاش سنة. أما [[index.html]] (اللي بيشاور على الأسامي دي) [[no-cache]]، يعني المتصفح لازم يسأل كل مرة. كده بعد النشر الناس بتشوف الجديد فورًا.

[[try_files $uri $uri/ /index.html]]: لو فيه ملف بالاسم ده قدّمه، وإلا رجّع index.html والـ router بتاع React يتصرف. والـ fallback ده بيروح لـ [[location = /index.html]] فبياخد no-cache برضه.

[[proxy_pass http://backend:3000]] من غير [[/]] في الآخر: المسار بيتبعت زي ما هو، فـ [[/api/users]] توصل للباك إند [[/api/users]]. و [[backend]] اسم الخدمة في compose.

الـ [[map]] في الأول: لو الطلب فيه Upgrade (WebSocket) يبعت [[Connection: upgrade]]، ولو لأ يبعت [[close]]. ده أصح من كتابة [[upgrade]] ثابتة لكل الطلبات. والـ [[map]] لازم تبقى في [[http]]، والملف ده بيتضمَّن جوه http فينفع.

و [[client_max_body_size]] و [[proxy_read_timeout]] كبار عشان رفع الملفات الكبيرة.`,
            when: "أي فرونت React أو Vue أو Vite في compose جنب باك إند.",
            mistakes: R`في مشروع حقيقي كانت إعدادات Nginx مكتوبة بـ [[RUN echo '...']] جوه الـ Dockerfile، فالهروب من علامات التنصيص صعب ومش مقروء، وفي نفس الوقت compose كان بيركّب nginx.conf من ملف تاني فوقه. والاتنين كانوا بيسمعوا على بورتات مختلفة (8000 و 80)، فخدمة الـ staging كانت شغالة بإعدادات غير الإنتاج ومحدش واخد باله. و [[Connection "upgrade"]] كانت ثابتة لكل الطلبات بدل map، وتحويل www كان بـ [[if]] بدل server منفصل.`
          },
          lines: [
            "مرحلة البناء من Node.",
            "فولدر الشغل.",
            "ملفات المكتبات الأول (عشان الكاش).",
            "سطّب بالظبط زي الـ lockfile.",
            "انسخ الكود.",
            "ابني، والـ API بروابط نسبية.",
            "المرحلة النهائية: Nginx بس.",
            "انسخ ناتج البناء لفولدر Nginx.",
            "وإعدادات الموقع.",
            "لو الطلب WebSocket ابعت upgrade، وإلا close.",
            "الموقع:",
            "على 80 (الـ SSL قدامه، مش جواه).",
            "فولدر الملفات.",
            "رفع لحد ١٠٠ ميجا.",
            "index.html: المتصفح يسأل كل مرة.",
            "ملفات assets (أساميها فيها hash): كاش سنة، ولو مش موجودة 404.",
            "أي مسار تاني: الملف لو موجود، وإلا index.html.",
            "طلبات الـ API:",
            "ابعتها للباك إند بنفس المسار.",
            "HTTP/1.1 (لازم للـ WebSocket).",
            "ابعت Upgrade لو موجود.",
            "و Connection حسب الـ map.",
            "الدومين الأصلي.",
            "IP الزائر.",
            "و http ولا https.",
            "استنى الرد لحد ١٠ دقايق (رفع أو عمليات طويلة).",
            "نهاية الـ location.",
            "نهاية الـ server."
          ]
        },
        {
          cmd: "compose dev / prod",
          title: "نفس المشروع بملفين: hot reload محلي، و nginx-proxy في الإنتاج",
          desc: "ملف للتطوير بيركّب الكود من جهازك جوه الـ containers، فأي تعديل يبان فورًا بـ nodemon و Vite. وملف للإنتاج بيبني images نهائية، ومن غير ولا بورت مفتوح، وبيسيب nginx-proxy يوزّع الدومين ويطلّع SSL لوحده من متغيرين.",
          example: R`# ---- compose.dev.yml:  docker compose -f compose.dev.yml up --build ----
services:
  backend:
    build: { context: ./backend, dockerfile: Dockerfile.dev }
    ports: ["127.0.0.1:3000:3000"]
    env_file: ./backend/.env
    volumes: ["./backend/src:/app/src"]
    command: sh -c "npx prisma migrate deploy && npx nodemon src/server.js"
  frontend:
    build: { context: ./frontend, dockerfile: Dockerfile.dev }
    ports: ["127.0.0.1:5173:5173"]
    volumes: ["./frontend/src:/app/src"]
# ---- compose.yml (الإنتاج):  docker compose up -d --build ----
services:
  backend:
    build: ./backend
    env_file: ./backend/.env
    command: sh -c "npx prisma migrate deploy && node src/server.js"
    restart: unless-stopped
  frontend:
    build: ./frontend
    environment:
      VIRTUAL_HOST: example.com,www.example.com
      LETSENCRYPT_HOST: example.com,www.example.com
    networks: [default, proxy]
    restart: unless-stopped
networks:
  proxy: { external: true, name: nginx-proxy }`,
          try: "شغّل ملف الـ dev وعدّل سطر في backend/src: لازم nodemon يعيد التشغيل لوحده في اللوج. وبعدين على سيرفر التجربة (وعليه nginx-proxy و acme-companion) شغّل ملف الإنتاج بدومين تجربة، واتأكد بـ [[ss -tlnp]] إن مفيش بورتات للمشروع.",
          flag: "script",
          deep: {
            why: "التطوير محتاج سرعة (تعديل يبان فورًا وبورتات مفتوحة تجرّب عليها)، والإنتاج محتاج أمان (مفيش بورتات، و images ثابتة). ملف واحد للاتنين بيطلع يا بطيء في التطوير يا مكشوف في الإنتاج.",
            how: R`في الـ dev: [[volumes: ["./backend/src:/app/src"]]] بيركّب فولدر الكود من جهازك مكان الكود اللي جوه الـ image، فـ nodemon يشوف أي تعديل ويعيد التشغيل. البورتات على [[127.0.0.1]] عشان متبقاش مفتوحة على شبكة الواي فاي. و Vite لازم يشتغل بـ [[--host 0.0.0.0]] في Dockerfile.dev وإلا مش هتوصله من برّه الـ container. وعلى ويندوز، مراقبة الملفات من bind mount ساعات مبتشتغلش، فشغّل polling في إعدادات Vite ([[server.watch.usePolling]]).

[[prisma migrate deploy]] قبل تشغيل السيرفر في الاتنين: بيطبّق الـ migrations اللي في git وبس، ومش بيعمل أي تغيير من دماغه.

في الإنتاج: مفيش [[ports]] خالص. nginx-proxy (stack منفصل بيشتغل مرة واحدة على السيرفر) بيراقب Docker، وأي container عليه [[VIRTUAL_HOST]] وعلى نفس الشبكة بيعمله server block لوحده. و acme-companion بيشوف [[LETSENCRYPT_HOST]] ويطلّع الشهادة ويجددها. ولو التطبيق مش على بورت 80 ضيف [[VIRTUAL_PORT]].

الـ frontend على شبكتين: [[default]] عشان يوصل للـ backend (الـ Nginx اللي جواه بيعمل proxy لـ /api)، و [[proxy]] عشان nginx-proxy يوصله. والـ backend على default بس، فمحدش من برّه يوصله. و [[external: true]] معناها الشبكة موجودة قبل كده (اتعملت مع nginx-proxy) ومش هتتمسح مع [[down]].`,
            when: "مشروع فرونت وباك إند بتطوّره بـ Docker على جهازك وبتنشره على VPS فيه كذا موقع.",
            mistakes: R`في مشروع حقيقي كان ملف الإنتاج فاتح Postgres على 5433 و Redis على 6379 على السيرفر. Docker بيعدّي من ufw، فالاتنين كانوا مكشوفين للإنترنت، و Redis من غير باسورد. والباسورد بتاع قاعدة البيانات ضعيف ومكتوب في الـ compose نفسه، و [[DATABASE_URL]] متبعت كـ build ARG فمحفوظ في الـ image.

والأخطر: [[prisma db push --accept-data-loss]] مع كل تشغيل في الإنتاج بدل [[migrate deploy]]. ده بيخلّي الجداول زي الـ schema بالعافية، وممكن يمسح أعمدة بالداتا اللي فيها.

وكان .env متمرّر بـ env_file، وكمان متركّب جوه /app، وكمان متكرر في environment، وبلوك environment ضخم متكرر بين الملفين، فأي تعديل لازم يتعمل في ٣ أماكن.`
          },
          lines: [
            "خدمات التطوير:",
            "الباك إند:",
            "يتبني بـ Dockerfile التطوير.",
            "البورت على جهازك بس.",
            "المتغيرات من ملف.",
            "ركّب فولدر الكود من جهازك (hot reload).",
            "طبّق الـ migrations وشغّل بـ nodemon.",
            "الفرونت:",
            "Dockerfile التطوير (Vite dev server).",
            "بورت Vite على جهازك بس.",
            "ركّب فولدر الكود.",
            "خدمات الإنتاج:",
            "الباك إند:",
            "يتبني بالـ Dockerfile العادي.",
            "المتغيرات وقت التشغيل.",
            "طبّق الـ migrations وشغّل بـ node عادي.",
            "يقوم لوحده.",
            "الفرونت (image الـ Vite و Nginx):",
            "يتبني.",
            "متغيرات لـ nginx-proxy:",
            "الدومينات اللي توصل للـ container ده.",
            "والدومينات اللي تطلعلها شهادة.",
            "على الشبكة الداخلية وشبكة nginx-proxy.",
            "يقوم لوحده.",
            "الشبكات:",
            "شبكة nginx-proxy الموجودة قبل كده."
          ]
        },
        {
          cmd: "compose.yml (Mongo)",
          title: "Mongo بباسورد و healthcheck، والباك إند مستنيه",
          desc: "Stack إنتاج لتطبيق MERN: Mongo بتسجيل دخول و volume خارجي محمي من المسح، والباك إند مش بيقوم غير لما Mongo يبقى healthy، والفرونت (Nginx) بيقدّم الواجهة. وكل البورتات على [[127.0.0.1]]، و Nginx اللي على السيرفر (بالـ SSL) هو اللي بيوصلها.",
          example: R`services:
  mongo:
    image: mongo:7
    environment:
      MONGO_INITDB_ROOT_USERNAME: $__{MONGO_ROOT_USER}
      MONGO_INITDB_ROOT_PASSWORD: $__{MONGO_ROOT_PASSWORD:?set it in .env}
    volumes: ["mongodb_data:/data/db"]
    healthcheck:
      test: ["CMD", "mongosh", "--quiet", "--eval", "db.adminCommand('ping').ok"]
      interval: 30s
      retries: 5
      start_period: 40s
    restart: unless-stopped
  backend:
    build: { context: ., dockerfile: Dockerfile.backend }
    depends_on:
      mongo: { condition: service_healthy }
    ports: ["127.0.0.1:5000:5000"]
    environment:
      NODE_ENV: production
      MONGODB_URI: $__{MONGODB_URI}
      JWT_SECRET: $__{JWT_SECRET:?set it in .env}
      JWT_EXPIRE: $__{JWT_EXPIRE:-7d}
    restart: unless-stopped
  frontend:
    build: { context: ., dockerfile: Dockerfile.frontend }
    depends_on: [backend]
    ports: ["127.0.0.1:8080:80"]
    restart: unless-stopped
volumes:
  mongodb_data:
    external: true`,
          try: "على سيرفر التجربة: [[docker volume create mongodb_data]]، و .env فيه الباسورد و [[MONGODB_URI=mongodb://root:secret@mongo:27017/myapp?authSource=admin]]، وبعدين [[docker compose up -d]] وتابع [[docker compose ps]]: الباك إند مش هيقوم غير لما mongo يبقى healthy. وجرّب تشيل JWT_SECRET من .env: compose لازم يرفض يقوم.",
          flag: "script",
          deep: {
            why: "أكتر مشكلتين في Mongo على Docker: قاعدة بيانات مفتوحة للإنترنت من غير باسورد (بتتسرق في ساعات)، وباك إند بيقوم قبل Mongo فيقع أول ما السيرفر يعمل reboot. الملف ده بيحل الاتنين.",
            how: R`[[MONGO_INITDB_ROOT_USERNAME]] و [[PASSWORD]]: أول مرة الـ volume يبقى فاضي، الـ image بتعمل يوزر root بيهم وبتشغّل Mongo بتسجيل دخول إجباري. بعد كده تغييرهم في .env مش بيغيّر الباسورد (الداتا موجودة)؛ لازم تغيّره من جوه mongosh.

[[$__{VAR:?رسالة}]]: لو المتغير مش موجود أو فاضي، compose يرفض يقوم ويطبع الرسالة، بدل ما يشغّل Mongo بباسورد فاضي أو الباك إند بـ JWT secret فاضي. و [[$__{JWT_EXPIRE:-7d}]] قيمة افتراضية لو مش موجود.

الـ healthcheck: أمر [[ping]] مش محتاج تسجيل دخول، فمش لازم تحط الباسورد في الأمر. و [[start_period]] بيدّي Mongo ٤٠ ثانية يقوم فيهم قبل ما الفشل يتحسب.

[[depends_on]] بـ [[condition: service_healthy]] بيخلي compose يستنى الـ healthcheck ينجح قبل ما يشغّل الباك إند. [[depends_on]] العادي بيستنى الـ container يبدأ بس، مش إن Mongo جاهز يستقبل.

[[external: true]] للـ volume: compose مش بيعمله ومش بيمسحه، حتى مع [[docker compose down -v]]. فالداتا محمية من أمر غلط.

الـ URI جوه compose بيستخدم اسم الخدمة [[mongo]] مش localhost، ولازم [[?authSource=admin]] لأن يوزر root متعرّف في قاعدة admin.

والبورتات كلها على [[127.0.0.1]]، ومفيش بورت لـ Mongo خالص؛ لو محتاج توصله من جهازك استخدم SSH tunnel: [[ssh -L 27017:localhost:27017]] مع بورت مؤقت، أو [[docker compose exec mongo mongosh]].`,
            when: "أي تطبيق Node و Mongo على VPS واحد.",
            mistakes: "في مشروع حقيقي كان الباك إند ناشر [[5000:5000]] على كل الواجهات. Docker بيعدّي من ufw، فالـ API كان مكشوف للعالم مباشرة من غير Nginx ولا SSL. وكان [[JWT_EXPIRE]] الافتراضي [[3650d]]، يعني توكن عايش ١٠ سنين: لو اتسرق مفيش حاجة توقفه. والباسورد كان مكتوب في سطر الـ healthcheck، فبيبان لأي حد يعمل [[docker inspect]]. و [[restart: always]] على الكل، والأوضح [[unless-stopped]] عشان لو وقّفت خدمة بإيدك متقومش لوحدها بعد reboot."
          },
          lines: [
            "الخدمات.",
            "قاعدة البيانات:",
            "Mongo نسخة 7.",
            "متغيرات أول تشغيل:",
            "اسم يوزر root (من .env).",
            "الباسورد، ولو مش موجود compose يرفض يقوم.",
            "الداتا في volume باسم ثابت.",
            "فحص الصحة:",
            "ping من جوه الـ container (من غير باسورد).",
            "كل ٣٠ ثانية.",
            "٥ مرات فشل ورا بعض = unhealthy.",
            "سيبه ٤٠ ثانية يقوم الأول.",
            "يقوم لوحده.",
            "الباك إند:",
            "يتبني من Dockerfile.backend.",
            "يستنى...",
            "...لحد ما Mongo يبقى healthy.",
            "البورت على السيرفر نفسه بس.",
            "المتغيرات:",
            "وضع الإنتاج.",
            "رابط Mongo (من .env).",
            "سر التوكن، ولو مش موجود compose يرفض يقوم.",
            "مدة التوكن، والافتراضي ٧ أيام.",
            "يقوم لوحده.",
            "الفرونت (Nginx):",
            "يتبني من Dockerfile.frontend.",
            "بعد الباك إند.",
            "على السيرفر نفسه بس، و Nginx اللي برّه يوصله.",
            "يقوم لوحده.",
            "الـ volumes:",
            "volume الداتا...",
            "...موجود قبل كده، و compose مش بيعمله ولا بيمسحه."
          ]
        }
      ]
    },
    {
      t: "الباك أب",
      l: 3,
      n: "نسخة مشفّرة برّه السيرفر، و Mongo كل يوم، وملف bat لحد مش مبرمج",
      items: [
        {
          cmd: "backup_offsite.sh",
          title: "باك أب مشفّر يترفع برّه السيرفر",
          desc: R`قاعدة 3-2-1 عمليًا: dump لكل قاعدة بالصيغة المضغوطة، تشفير قبل ما الملف يسيب السيرفر، رفع لتخزين خارجي بـ rclone، تأكيد إن الرفع وصل، ومسح أي نسخة أقدم من ٩٠ يوم.

وطريقة الاسترجاع مكتوبة في آخر الملف، لأن الباك أب اللي محدش عارف يرجّعه ملوش لازمة.`,
          example: R`#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
set -a; . ./.env; set +a
: "$__{BACKUP_PASSPHRASE:?set BACKUP_PASSPHRASE in .env (openssl rand -base64 32)}"
: "$__{BACKUP_REMOTE:?set BACKUP_REMOTE in .env, e.g. remote:bucket/myapp}"
STAMP=$(date +%F_%H%M)
TMP=$(mktemp -d); trap 'rm -rf "$TMP"' EXIT
for DB in appdb n8n; do
  docker compose exec -T postgres pg_dump -U "$POSTGRES_USER" -d "$DB" -Fc > "$TMP/$DB.dump"
  echo "$DB: $(du -h "$TMP/$DB.dump" | cut -f1)"
done
ARCHIVE="myapp_$STAMP.tar.gz.enc"
tar -czf - -C "$TMP" appdb.dump n8n.dump \
  | openssl enc -aes-256-cbc -pbkdf2 -iter 200000 -salt \
      -pass env:BACKUP_PASSPHRASE -out "$TMP/$ARCHIVE"
rclone copy "$TMP/$ARCHIVE" "$BACKUP_REMOTE/"
rclone check "$TMP" "$BACKUP_REMOTE/" --one-way --include "$ARCHIVE"
rclone delete "$BACKUP_REMOTE/" --min-age 90d --include 'myapp_*.enc'
echo "done: $ARCHIVE"
# الاسترجاع (على أي جهاز معاه الـ passphrase):
#   rclone copy "$BACKUP_REMOTE/myapp_2026-09-01_0330.tar.gz.enc" .
#   openssl enc -d -aes-256-cbc -pbkdf2 -iter 200000 -pass env:BACKUP_PASSPHRASE -in myapp_2026-09-01_0330.tar.gz.enc | tar -xzf -
#   docker compose exec -T postgres pg_restore -U "$POSTGRES_USER" -d appdb --clean --if-exists < appdb.dump
# cron كل يوم 3:30 الفجر:
#   30 3 * * * cd /opt/myapp && bash scripts/backup_offsite.sh >> /var/log/myapp-backup.log 2>&1`,
          try: "على سيرفر التجربة اعمل remote في rclone لفولدر محلي ([[rclone config]] ← local)، وشغّل السكربت، وبعدين اعمل الاسترجاع كامل على قاعدة جديدة فاضية واتأكد إن الجداول والصفوف رجعت.",
          flag: "script",
          deep: {
            why: "باك أب على نفس السيرفر بيروح مع السيرفر (قرص باظ، أو حد مسح، أو الشركة قفلت الحساب). ورفعه من غير تشفير معناه إن أي حد يوصل للـ bucket معاه بيانات عملائك كلها.",
            how: R`[[set -a; . ./.env; set +a]] بيقرا .env ويعمل export لكل متغير فيه. و [[: "$__{VAR:?msg}"]] بيوقف السكربت برسالة لو المتغير فاضي.

[[mktemp -d]] فولدر مؤقت باسم عشوائي، و [[trap ... EXIT]] بيمسحه في الآخر مهما حصل، حتى لو السكربت وقع في النص.

[[pg_dump -Fc]] الصيغة المضغوطة (custom) اللي [[pg_restore]] بيقراها ويرجّع منها جدول واحد لو عايز. و [[-T]] مع exec عشان مفيش ترمنال (cron).

tar بيطلع على stdout ([[-f -]]) ويدخل على openssl مباشرة، فمفيش نسخة مش مشفّرة على القرص. [[-pbkdf2 -iter 200000]] بيخلي تخمين الـ passphrase بطيء جدًا. و [[-pass env:BACKUP_PASSPHRASE]] بياخد الباسورد من متغير بيئة مش من سطر الأوامر.

[[rclone copy]] بيرفع لأي تخزين (S3 أو Backblaze أو Google Drive)، و [[rclone check --one-way]] بيقارن الملف المحلي باللي اترفع ويفشل لو مختلفين. و [[delete --min-age 90d]] بيمسح النسخ الأقدم من ٩٠ يوم بس.

الاسترجاع بالعكس: نزّل، فك التشفير في tar، و [[pg_restore --clean --if-exists]] بيمسح الجداول الموجودة ويرجّعها.`,
            when: "أي سيرفر فيه بيانات مش عايز تخسرها، ويتربط بـ cron. pg_dump و pg_restore لوحدهم في تاب PostgreSQL، و cron في تاب VPS.",
            mistakes: R`في مشروع حقيقي كان التشفير بـ [[-pass "pass:$PASS"]]، فالباسورد بيبان في [[ps aux]] لأي يوزر على السيرفر وقت ما السكربت شغال. [[env:]] أو [[file:]] بدلها.

و [[aes-256-cbc]] من غير MAC، يعني لو حد عدّل في الملف مش هتعرف. [[age]] أو [[gpg]] أحسن لو هتبدأ من الصفر.

ومكانش فيه أي فحص إن الرفع وصل فعلًا (اتضاف [[rclone check]] هنا)، ولا تنبيه لو cron فشل. الباك أب ممكن يكون واقف من شهر ومحدش واخد باله.

ومفيش اختبار استرجاع دوري. جرّب ترجّع نسخة على قاعدة فاضية مرة كل شهر على الأقل.`
          },
          lines: [
            "أي خطأ، أو متغير مش معرّف، أو pipe فشل: وقّف.",
            "ادخل جذر المشروع (فولدر فوق السكربت).",
            "اقرا .env واعمل export لكل متغير فيه.",
            "لازم passphrase التشفير يبقى موجود.",
            "ولازم مكان الرفع.",
            "التاريخ والساعة في اسم الملف.",
            "فولدر مؤقت يتمسح مهما حصل.",
            "لكل قاعدة:",
            "dump مضغوط من جوه الـ container.",
            "اطبع الحجم (dump فاضي = مشكلة).",
            "قفلة اللوب.",
            "اسم الأرشيف المشفّر.",
            "اجمع الـ dumps في tar على stdout...",
            "...ودخّله على openssl يشفّره...",
            "...بالباسورد من متغير بيئة، واكتب الملف المشفّر.",
            "ارفع للتخزين الخارجي.",
            "اتأكد إن اللي اترفع زي المحلي.",
            "امسح النسخ الأقدم من ٩٠ يوم.",
            "خلصت."
          ]
        },
        {
          cmd: "backup_mongodb.sh",
          title: "باك أب يومي لـ MongoDB جوه Docker",
          desc: R`[[mongodump]] من جوه الـ container على طول لملف مضغوط على السيرفر، ولوج بالتاريخ، ومسح أي نسخة أقدم من ٣٠ يوم. يتربط بـ cron.

النسخة الأصلية كان فيها bug حقيقي: الفشل مكانش بيتكشف أبدًا، لأن السكربت كان بيشيك على exit code بتاع tee مش mongodump. الحل [[set -o pipefail]].`,
          example: R`#!/usr/bin/env bash
# cron: 0 3 * * * /opt/myapp/backup_mongodb.sh
set -euo pipefail
set -a; . /opt/myapp/backup.env; set +a
BACKUP_DIR=/var/backups/myapp
LOG_FILE=/var/log/myapp_backup.log
RETENTION_DAYS=30
FILE="$BACKUP_DIR/myapp_$(date +%F_%H-%M).archive.gz"
log() { echo "[$(date '+%F %T')] $1" | tee -a "$LOG_FILE"; }
mkdir -p "$BACKUP_DIR"
log "start: $FILE"
if ! docker exec -e MONGO_USER -e MONGO_PASS myapp-mongodb sh -c \
    'mongodump -u "$MONGO_USER" -p "$MONGO_PASS" --authenticationDatabase admin --db myapp --archive --gzip' \
    > "$FILE" 2>> "$LOG_FILE"; then
  log "ERROR: mongodump failed"; rm -f "$FILE"; exit 1
fi
log "ok: $(du -h "$FILE" | cut -f1)"
find "$BACKUP_DIR" -name 'myapp_*.archive.gz' -mtime +"$RETENTION_DAYS" -delete
log "kept: $(ls "$BACKUP_DIR"/myapp_*.archive.gz | wc -l) backups"
# استرجاع:
#   docker exec -i myapp-mongodb sh -c 'mongorestore -u "$MONGO_USER" -p "$MONGO_PASS" --authenticationDatabase admin --archive --gzip --drop' < FILE`,
          try: "على سيرفر التجربة جرّب الفرق بنفسك: [[false | tee x.log; echo $?]] هيطبع 0. وبعدين [[set -o pipefail; false | tee x.log; echo $?]] هيطبع 1. وبعدها شغّل السكربت على Mongo تجريبي، ووقّف الـ container وشغّله تاني وتأكد إنه قال ERROR.",
          flag: "script",
          deep: {
            why: "أخطر باك أب هو اللي بيفشل في صمت: اللوج كل يوم بيقول SUCCESS، ويوم ما تحتاجه تلاقي الملفات فاضية. ده بالظبط اللي كان ممكن يحصل في النسخة الأصلية.",
            how: R`الـ exit code بتاع pipeline ([[a | b]]) هو بتاع آخر أمر بس. الأصلي كان [[mongodump ... 2>&1 | tee -a "$LOG_FILE"]] وبعدين [[if [ $? -ne 0 ]; then]]، و tee دايمًا بينجح، فـ [[$?]] دايمًا 0. [[set -o pipefail]] بيخلي الـ pipeline يفشل لو أي أمر فيه فشل.

النسخة المصلّحة مش محتاجة pipe أصلًا: [[--archive --gzip]] بيطلّع الباك أب كله ملف واحد مضغوط على stdout، والـ redirect [[> "$FILE"]] بيكتبه على السيرفر مباشرة. مفيش [[docker cp]] ولا tar ولا فولدر مؤقت جوه الـ container. والأخطاء بتروح للّوج بـ [[2>>]].

[[docker exec -e MONGO_PASS]] من غير قيمة بياخد قيمة المتغير من السكربت، فالباسورد مش مكتوب في الملف. والـ single quotes حوالين أمر mongodump بتخلي [[$MONGO_PASS]] يتفك جوه الـ container مش برّه.

[[find -mtime +30 -delete]] بيمسح الملفات اللي آخر تعديل ليها من أكتر من ٣٠ يوم.`,
            when: "أي MongoDB على VPS. ومع نسخة برّه السيرفر زي «backup_offsite.sh». أوامر mongodump و mongorestore لوحدها في تاب MongoDB، و pipefail في تاب bash.",
            mistakes: R`في مشروع حقيقي كان [[if [ $? -ne 0 ]; then]] بعد pipe مع tee، فالفشل عمره ما اتكشف. الحل [[set -o pipefail]] أو تستغنى عن الـ pipe.

والباسورد كان مكتوب في السكربت نفسه، والسكربت مرفوع على git. لازم يتقرا من ملف env بصلاحية 600 ([[chmod 600 backup.env]]).

والباسورد بيتبعت في سطر الأوامر ([[--password]])، فبيبان في [[ps]] على السيرفر وقت الباك أب. لو ده يهمك، استخدم [[--config]] بملف فيه الباسورد جوه الـ container.

والباك أب على نفس السيرفر: لو السيرفر راح الباك أب راح. ومفيش تجربة restore دورية.`
          },
          lines: [
            "وقّف عند أي خطأ، وأي أمر في pipe يفشل يفشّل الكل.",
            "اقرا المستخدم والباسورد من ملف بصلاحية 600.",
            "فين الباك أب.",
            "فين اللوج.",
            "عدد الأيام اللي هنحتفظ بيها.",
            "اسم الملف بالتاريخ والساعة.",
            "دالة تكتب سطر بالوقت على الشاشة وفي اللوج.",
            "اعمل الفولدر لو مش موجود.",
            "سجّل البداية.",
            "لو mongodump جوه الـ container فشل...",
            "...الباك أب كله ملف واحد مضغوط على stdout...",
            "...يتكتب على السيرفر، والأخطاء للّوج:",
            "سجّل الخطأ وامسح الملف الناقص واخرج بـ 1.",
            "قفلة الـ if.",
            "سجّل النجاح بالحجم.",
            "امسح النسخ الأقدم من ٣٠ يوم.",
            "سجّل عدد النسخ الموجودة."
          ]
        },
        {
          cmd: "backup.bat",
          title: "زرار يرفع نسخة احتياطية على GitHub بدبل كليك",
          desc: R`ملف bat لحد مش مبرمج: دبل كليك، يعمل commit بالتاريخ ويرفع، ويسيب الشباك مفتوح ثواني يقرا النتيجة. عربي صح بـ [[chcp 65001]]، وبيشيك فيه تغييرات ولا لأ بـ [[git diff --cached --quiet]].

والنسخة دي بتشيك الأول إن ملف البيانات مش في .gitignore، لأن ده بالظبط اللي حصل في المشروع الأصلي: السكربت كان «شغال» شهور ومش بيرفع ولا نسخة.`,
          example: R`@echo off
chcp 65001 >nul
cd /d "%~dp0"
git check-ignore -q data.json
if %errorlevel%==0 (
  echo تحذير: data.json في .gitignore، يعني النسخة مش هتترفع!
  pause
  exit /b 1
)
git pull --rebase origin main
git add -A
git diff --cached --quiet
if %errorlevel%==0 (
  echo مفيش تغييرات جديدة للرفع.
  timeout /t 4 >nul
  exit /b 0
)
git commit -m "backup %date% %time%"
git push origin main
if %errorlevel%==0 (echo تم الرفع بنجاح.) else (echo حصل خطأ، اتأكد من النت.)
timeout /t 5 >nul`,
          try: "في ريبو private تجريبي حط data.json والسكربت، وشغّله بدبل كليك. بعدين ضيف data.json لـ .gitignore وشغّله تاني وشوف التحذير. وفي ريبو موجود اسأل: [[git check-ignore -v data.json]].",
          flag: "script",
          deep: {
            why: "برنامج صغير لمحل أو عيادة شايل بيانات في ملف JSON، وصاحبه محتاج يعمل نسخة احتياطية من غير ما يفتح ترمنال. GitHub private ببلاش وفيه تاريخ لكل نسخة.",
            how: R`[[chcp 65001]] بيحوّل الـ console لـ UTF-8 فالعربي يطلع صح (والملف نفسه لازم يتحفظ UTF-8 من غير BOM). [[%~dp0]] فولدر الملف نفسه، و [[/d]] بيغيّر الدرايف كمان.

[[git check-ignore -q data.json]] بيرجع 0 لو الملف متجاهل. هنا 0 معناها مشكلة.

[[git pull --rebase]] قبل الرفع عشان لو فيه نسخة اترفعت من جهاز تاني، الـ push ميترفضش.

[[git diff --cached --quiet]] بيرجع 0 لو مفيش فرق في اللي اتعمله add. يعني 0 هنا «مفيش جديد»، فنخرج بهدوء بدل commit فاضي يفشل.

[[%errorlevel%]] هو exit code آخر أمر، زي [[$?]] في bash. و [[timeout /t 5 >nul]] بيستنى ٥ ثواني من غير رسالة «اضغط أي زرار».`,
            when: "نسخ احتياطية بسيطة لبيانات صغيرة (مش قواعد بيانات كبيرة). أوامر CMD في تاب CMD، و git في تاب Git.",
            mistakes: R`في مشروع حقيقي كانت ملفات البيانات والنسخ ([[data.json]] و [[backups/data-*.json]]) في .gitignore. السكربت كان بيقول «تم الرفع بنجاح» كل مرة، وهو بيرفع الكود بس. محدش اكتشف ده غير لما بصّوا على الريبو. اتأكد بعينك إن الملف اللي عايز تحميه موجود على GitHub.

وكان فيه [[cd /d]] لمسار ثابت على جهاز واحد بدل [[%~dp0]]. ومفيش [[git pull]] قبل الـ push، فالرفع يترفض لو فيه جهاز تاني رفع قبله.

ولو هترفع بيانات عملاء على GitHub، الريبو لازم يبقى private، والأحسن أصلًا متتحطش في git. وشكل [[%date%]] و [[%time%]] بيتغيّر حسب لغة ويندوز.`
          },
          lines: [
            "متعرضش الأوامر نفسها.",
            "UTF-8 عشان العربي.",
            "ادخل فولدر الملف.",
            "data.json متجاهل؟",
            "لو أيوه:",
            "حذّر.",
            "استنى المستخدم يقرا.",
            "واخرج بفشل.",
            "قفلة الـ if.",
            "هات أي تحديث من الريبو الأول.",
            "جهّز كل التغييرات.",
            "فيه فرق؟",
            "لو مفيش:",
            "قول كده.",
            "استنى ٤ ثواني.",
            "واخرج بنجاح.",
            "قفلة الـ if.",
            "commit بالتاريخ والوقت.",
            "ارفع.",
            "نجح ولا لأ.",
            "استنى ٥ ثواني قبل ما الشباك يقفل."
          ]
        }
      ]
    },
    {
      t: "CI و Git hooks",
      l: 3,
      n: "كل push بيتفحص: الكود، والـ migrations على قاعدة حقيقية، والأنواع، والـ APK",
      items: [
        {
          cmd: "ci.yml: monorepo",
          title: "CI لـ monorepo بالترتيب من الأرخص للأغلى",
          desc: R`الشكل القياسي لأي مشروع: format ثم lint ثم types ثم tests ثم build. كل خطوة أرخص وأسرع من اللي بعدها، فالخطأ البسيط يطلع في ثواني بدل ما تستنى build كامل.

وكل سكربت في package.json بتاع الجذر بينادي [[pnpm -r]]، فالـ CI مش محتاج يعرف أسماء الباكدجات.`,
          example: R`name: CI
on:
  push: { branches: [main, dev] }
  pull_request: { branches: [main, dev] }
permissions: { contents: read }
concurrency: { group: ci-$__{{ github.ref }}, cancel-in-progress: true }
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: pnpm/action-setup@v6
      - uses: actions/setup-node@v7
        with: { node-version: 22, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - name: Format
        run: pnpm format:check        # prettier --check .
      - name: Lint
        run: pnpm lint                # eslint . --max-warnings=0
      - name: Typecheck
        run: pnpm typecheck           # pnpm -r typecheck
      - name: Test
        run: pnpm test                # pnpm -r test
      - name: Build
        run: pnpm build               # pnpm -r build`,
          try: "في ريبو تجريبي فيه workspace صغير اعمل السكربتات الخمسة في package.json بتاع الجذر وشغّلهم بإيدك بالترتيب. بعدين ارفع الملف، واعمل PR فيه مسافة زيادة، وشوف الـ CI يقع في Format قبل ما يوصل للـ build.",
          flag: "script",
          deep: {
            why: "من غير CI، «شغال عندي» هو الاختبار الوحيد. ومن غير ترتيب، أول غلطة تنسيق بتستنى build ٥ دقايق عشان تظهر.",
            how: R`[[pnpm/action-setup@v6]] من غير [[version]] بيقرا نسخة pnpm من [[packageManager]] في package.json، فالنسخة في مكان واحد.

[[cache: pnpm]] في setup-node بيحفظ الـ store بتاع pnpm بين الـ runs. و [[--frozen-lockfile]] بيفشل لو pnpm-lock.yaml مش متوافق مع package.json، بدل ما يعدّله في صمت.

كل step لو فشل الـ job بيقف، فالترتيب هو اللي بيحدد إنت هتستنى قد إيه عشان تعرف الغلطة.

[[permissions: contents: read]] بيقلّل صلاحيات التوكن اللي الـ workflow بياخده لأقل حاجة. و [[concurrency]] مع [[cancel-in-progress]] بيلغي الـ run القديم لو عملت push جديد على نفس الفرع.

والسكربتات في الجذر: [["lint": "eslint . --max-warnings=0"]] (أي warning يفشّل)، و [["typecheck": "pnpm -r typecheck"]] بيشغّل typecheck في كل باكدج فيها السكربت ده.`,
            when: "أي مشروع فيه أكتر من شخص أو أكتر من باكدج. الأدوات نفسها (prettier و eslint و tsc و vitest) في تاب فحص الكود، و concurrency و cache في تاب GitHub Actions.",
            mistakes: R`في مشروع حقيقي كان فيه [[version: 10]] في action-setup ومعاه packageManager في package.json. لو النسختين اختلفوا الـ action بيفشل. سيب واحد بس.

والـ CONTRIBUTING كان بيقول إن dev هو الفرع الأساسي، والـ CI بيشتغل على main بس، فالـ PRs اللي رايحة لـ dev مكانتش بتتفحص خالص.

ومكانش فيه concurrency ولا permissions. وسكربت lint في تطبيق الأدمن كان لسه [[next lint]]، ودا اتشال في Next الجديد، فالخطوة كانت هتقع أول ما حد يحدّث.`
          },
          lines: [
            "اسم الـ workflow.",
            "إمتى يشتغل:",
            "push على main أو dev.",
            "وأي PR رايح لـ main أو dev.",
            "التوكن يقرا بس.",
            "push جديد يلغي الـ run القديم على نفس الفرع.",
            "الـ jobs.",
            "job واحد اسمه quality.",
            "على لينكس.",
            "الخطوات:",
            "هات الكود.",
            "سطّب pnpm بالنسخة اللي في packageManager.",
            "سطّب Node...",
            "...22، وخزّن الـ store بتاع pnpm.",
            "سطّب بالظبط اللي في الـ lock.",
            "اسم الخطوة.",
            "التنسيق (الأرخص).",
            "اسم الخطوة.",
            "lint، وأي warning فشل.",
            "اسم الخطوة.",
            "فحص الأنواع.",
            "اسم الخطوة.",
            "الاختبارات.",
            "اسم الخطوة.",
            "الـ build (الأغلى)."
          ]
        },
        {
          cmd: "ci.yml: Postgres + Prisma",
          title: "CI بقاعدة بيانات حقيقية تجرّب الـ migrations",
          desc: R`الـ job ده بيشغّل Postgres حقيقي جنبه كـ service، ويطبّق الـ migrations على قاعدة فاضية بنفس الأمر اللي هيتشغّل في الإنتاج، وبعدين types وتست و build.

لو فيه migration مكسورة، تعرف في الـ PR، مش وانت بتعمل deploy.`,
          example: R`name: CI
on:
  push: { branches: [main] }
  pull_request:
concurrency: { group: ci-$__{{ github.ref }}, cancel-in-progress: true }
jobs:
  test:
    runs-on: ubuntu-latest
    defaults: { run: { working-directory: web } }
    services:
      postgres:
        image: postgres:16
        env: { POSTGRES_USER: ci, POSTGRES_PASSWORD: ci, POSTGRES_DB: myapp }
        ports: ["5432:5432"]
        options: >-
          --health-cmd "pg_isready -U ci" --health-interval 5s --health-retries 10
    env:
      DATABASE_URL: postgresql://ci:ci@localhost:5432/myapp
      AUTH_SECRET: ci-only-not-a-real-secret
    steps:
      - uses: actions/checkout@v7
      - uses: pnpm/action-setup@v6
        with: { package_json_file: web/package.json }
      - uses: actions/setup-node@v7
        with: { node-version: 22, cache: pnpm, cache-dependency-path: web/pnpm-lock.yaml }
      - run: pnpm install --frozen-lockfile
      - run: pnpm exec prisma generate
      - run: pnpm exec prisma migrate deploy
      - run: pnpm exec tsc --noEmit
      - run: pnpm test
      - run: pnpm run build`,
          try: "في مشروع Prisma تجريبي اعمل migration فيها غلطة SQL متعمّدة (عمود بنوع غلط) وارفعها في PR. شوف الـ CI يقع في خطوة migrate deploy، وبعدين صلّحها.",
          flag: "script",
          deep: {
            why: "[[prisma migrate dev]] على جهازك بيطبّق على قاعدة فيها تاريخك كله، فممكن migration تعدّي عندك وتفشل على قاعدة جديدة. الإنتاج هيشغّل [[migrate deploy]] على قاعدة ممكن تكون فاضية أو قديمة، فلازم تجرّب ده بالظبط.",
            how: R`[[services:]] بيشغّل container Postgres جنب الـ job، و [[ports: 5432:5432]] بيخليه على localhost بالنسبة للخطوات. والـ [[options]] دي flags لـ docker run: healthcheck بيخلي GitHub يستنى لحد ما القاعدة تقوم قبل أول step.

[[defaults.run.working-directory: web]] كل [[run:]] بيتنفّذ من web/ (التطبيق في فولدر فرعي).

[[env:]] على مستوى الـ job: [[DATABASE_URL]] للقاعدة المؤقتة، و [[AUTH_SECRET]] قيمة وهمية عشان الـ build ميقعش. دي مقبولة في YAML لأنها للـ CI بس، وأي سر حقيقي مكانه secrets.

[[package_json_file]] بيقول لـ action-setup يقرا packageManager من web/package.json. و [[cache-dependency-path]] بيقول لـ setup-node فين الـ lock عشان مفتاح الكاش.

[[prisma generate]] بيعمل الـ client، و [[migrate deploy]] بيطبّق كل الـ migrations اللي في prisma/migrations بالترتيب من غير ما يولّد جديد ومن غير ما يسأل، زي الإنتاج بالظبط.`,
            when: "أي مشروع فيه migrations. services بالتفصيل في تاب GitHub Actions، و Prisma migrate في تاب PostgreSQL.",
            mistakes: R`في مشروع حقيقي كان setup-node من غير [[cache: pnpm]]، فكل run بيحمّل كل المكتبات من الأول (دقايق زيادة في كل PR).

وكان فيه [[corepack enable]] من غير [[packageManager]] في web/package.json، فنسخة pnpm اللي بتتسطب مش متثبتة وممكن تتغير من يوم للتاني.

ومكانش فيه concurrency، فعشر pushes ورا بعض بيعملوا عشر runs كاملين.`
          },
          lines: [
            "اسم الـ workflow.",
            "إمتى يشتغل:",
            "push على main.",
            "وأي PR.",
            "push جديد يلغي القديم.",
            "الـ jobs.",
            "job اسمه test.",
            "على لينكس.",
            "كل run من فولدر web.",
            "خدمات جنب الـ job:",
            "Postgres.",
            "النسخة 16.",
            "اليوزر والباسورد والقاعدة (للـ CI بس).",
            "على localhost:5432.",
            "flags لـ docker run:",
            "healthcheck عشان يستنى القاعدة تقوم.",
            "متغيرات لكل الخطوات:",
            "رابط القاعدة المؤقتة.",
            "قيمة وهمية عشان الـ build.",
            "الخطوات:",
            "هات الكود.",
            "سطّب pnpm...",
            "...بالنسخة اللي في web/package.json.",
            "سطّب Node...",
            "...22، وكاش pnpm من الـ lock بتاع web.",
            "سطّب بالظبط اللي في الـ lock.",
            "اعمل Prisma client.",
            "طبّق الـ migrations زي الإنتاج.",
            "فحص الأنواع.",
            "الاختبارات.",
            "الـ build."
          ]
        },
        {
          cmd: "db-schema-check.yml",
          title: "CI يفشل لو الأنواع اختلفت عن قاعدة البيانات",
          desc: R`بيولّد أنواع TypeScript من الـ schema الحقيقي في Supabase، ويقارنها باللي في الريبو بـ [[git diff --exit-code]]. لو فيه فرق، حد غيّر القاعدة ومحدّثش الأنواع، والكود ممكن يقع بـ column does not exist في الإنتاج.

الأصلي كان بيطبع الفرق بس ومبيفشلش، فالـ CI كان أخضر دايمًا.`,
          example: R`name: DB Schema Check
on:
  push:
    branches: [main]
    paths: ['supabase/migrations/**', 'lib/supabase/**']
  pull_request:
    branches: [main]
jobs:
  types-drift:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: supabase/setup-cli@v1
      - run: supabase gen types typescript --project-id "$PROJECT_REF" > lib/supabase/database.types.ts
        env:
          SUPABASE_ACCESS_TOKEN: $__{{ secrets.SUPABASE_ACCESS_TOKEN }}
          PROJECT_REF: $__{{ vars.SUPABASE_PROJECT_REF }}
      - name: Fail on type drift
        run: |
          git diff --exit-code lib/supabase/database.types.ts \
            || { echo "::error::Types drifted. Run npm run types:generate and commit."; exit 1; }`,
          try: "في ريبو تجريبي اعمل ملف، واعمله commit، وعدّله من غير commit، وشغّل [[git diff --exit-code file; echo $?]]. هيطبع الفرق وبعده 1. رجّعه بـ [[git checkout file]] وجرّب تاني: 0.",
          flag: "script",
          deep: {
            why: "الأنواع المولّدة (database.types.ts) هي اللي بتخلي TypeScript يمسك [[select('instrcutor')]] الغلط. بس لو القاعدة اتغيّرت والملف متحدّثش، TypeScript بيطمّنك على schema قديم.",
            how: R`[[supabase/setup-cli@v1]] بيسطّب الـ CLI الرسمي في الـ runner. [[supabase gen types typescript --project-id]] بيقرا الـ schema من المشروع ويكتب الأنواع فوق الملف اللي في الريبو.

[[git diff --exit-code]] بيطبع الفرق زي [[git diff]] العادي، بس بيخرج بـ 1 لو فيه فرق. و [[--quiet]] نفس الفكرة من غير طباعة. فلو الملف اللي اتولّد مختلف عن اللي في الـ commit، الخطوة تفشل.

[[::error::]] سطر خاص بيطلع كـ annotation حمرا فوق الـ run في GitHub، فاللي يفتح الـ PR يشوف السبب والحل على طول.

[[secrets]] للتوكن، و [[vars]] للـ project ref (مش سر، بس مكانه إعدادات الريبو مش الكود).`,
            when: "أي مشروع بيولّد أنواع أو كود من مصدر تاني (Supabase أو Prisma أو OpenAPI). ونفس الفكرة لأي ملف مولّد: ولّد وقارن. git diff في تاب Git، و ::error:: في تاب GitHub Actions.",
            mistakes: R`في مشروع حقيقي خطوة «كشف الاختلاف» كانت بتطبع الـ diff بس، من غير [[exit 1]]، فالـ CI أخضر حتى لو فيه اختلاف. ومحدش بيقرا لوج run أخضر.

وكانت بتشتغل على push لـ main بس، يعني بعد ما الغلطة اتدمجت. هنا بتشتغل على PRs كمان. بس خد بالك: PR من fork مش بيوصله secrets، فالخطوة هتفشل هناك.

و [[npm install -g supabase]] مش مدعوم، والصح [[supabase/setup-cli@v1]]. والـ project-id كان مكتوب في package.json ومختلف عن الـ ref اللي في ملفات تانية، يعني مشروعين والأنواع بتتولّد من الغلط.

وخطوة تانية كانت بتفحص الـ schema بمفتاح service_role الحقيقي على كل PR. المفتاح ده بيعدّي RLS، فمكانه أضيق حاجة ممكنة.`
          },
          lines: [
            "اسم الـ workflow.",
            "إمتى:",
            "push...",
            "...على main...",
            "...لو اتغيّرت migrations أو كود Supabase.",
            "وأي PR...",
            "...رايح لـ main.",
            "الـ jobs.",
            "job اسمه types-drift.",
            "على لينكس.",
            "الخطوات:",
            "هات الكود.",
            "سطّب Supabase CLI.",
            "ولّد الأنواع فوق الملف اللي في الريبو.",
            "متغيرات الخطوة:",
            "توكن الحساب من secrets.",
            "الـ project ref من vars.",
            "اسم الخطوة.",
            "سكربت متعدد السطور:",
            "فيه فرق عن الـ commit؟...",
            "...رسالة حمرا في GitHub وافشل."
          ]
        },
        {
          cmd: "husky + commitlint",
          title: "Git hooks تمنع الكود المش متنسّق قبل الـ commit",
          desc: R`husky بيشغّل سكربتات قبل الـ commit: lint-staged بيعمل eslint و prettier على الملفات المتغيّرة بس، و commitlint بيرفض رسالة commit مش ماشية على الشكل المتفق عليه.

الدرس الأهم هنا من مشروع حقيقي: كل حاجة كانت متسطّبة ومتظبطة، بس ملفات الـ hooks نفسها مكانتش موجودة، فولا حاجة كانت بتشتغل.`,
          example: R`// package.json (جزء)
"scripts": { "prepare": "husky" },
"lint-staged": {
  "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md,yml,yaml}": ["prettier --write"]
},
// commitlint.config.js
export default { extends: ['@commitlint/config-conventional'] };
# الإعداد مرة واحدة، من Git Bash:
pnpm add -D husky lint-staged @commitlint/cli @commitlint/config-conventional
pnpm exec husky init
echo "pnpm exec lint-staged" > .husky/pre-commit
echo 'pnpm exec commitlint --edit "$1"' > .husky/commit-msg
ls .husky
git add .husky package.json commitlint.config.js
git commit -m "chore: add git hooks"
# جرّب:
git commit --allow-empty -m "fixed stuff"
HUSKY=0 git commit -m "wip"`,
          try: R`في ريبو تجريبي اعمل الإعداد ده، وبعدين اكتب ملف .ts فيه مسافات عشوائية واعمله commit، وشوف prettier ظبطه لوحده. وجرّب [[git commit --allow-empty -m "fixed stuff"]] وشوف commitlint يرفضه.`,
          flag: "script",
          deep: {
            why: "الـ CI بيمسك الكود المش متنسّق بعد الـ push، ودا متأخر: commit زيادة «fix lint» وانتظار. الـ hook بيمسكه على جهازك قبل ما يدخل الريبو أصلًا، وعلى الملفات اللي غيّرتها بس فمش بيبطّأك.",
            how: R`[[husky init]] بيعمل فولدر .husky وملف pre-commit، وبيضيف [["prepare": "husky"]] في package.json. [[prepare]] بيشتغل لوحده بعد أي [[pnpm install]]، فأي حد يعمل clone ويسطّب، الـ hooks بتتفعّل عنده.

husky بيعمل ده بإنه يغيّر [[core.hooksPath]] في git لفولدر [[.husky/_]]. جوه الفولدر ده ملفات صغيرة بتنادي ملفاتك انت: [[.husky/pre-commit]] و [[.husky/commit-msg]]. لو ملفاتك مش موجودة، مفيش حاجة تتشغّل ومفيش أي رسالة.

[[lint-staged]] بياخد الملفات اللي في الـ staging بس، ويشغّل عليها الأوامر حسب الامتداد، ويرجّع التعديلات للـ commit.

[[commitlint --edit "$1"]]: git بيدّي hook الـ commit-msg مسار ملف فيه الرسالة، و commitlint بيقراه. [[config-conventional]] معناها [[type: subject]] زي [[feat: add login]] أو [[fix: null user]].

و [[HUSKY=0]] بيعدّي الـ hooks مرة واحدة في الطوارئ.`,
            when: "أي ريبو فيه أكتر من شخص، أو عايز رسايل commit تتقري كـ changelog. الأوامر لوحدها في تاب فحص الكود.",
            mistakes: R`في مشروع حقيقي husky و lint-staged و commitlint كانوا متسطّبين ومتظبطين في package.json، بس فولدر .husky كان فيه [[_]] بس (اللي husky بيولّده)، ومفيش pre-commit ولا commit-msg. يعني ولا hook اشتغل يوم واحد، وكل الإعداد ميت. [[ls .husky]] بعد الإعداد وجرّب commit غلط بعينك.

ولو كتبت الـ hook بـ [[echo ... > file]] من Windows PowerShell 5.1، الملف بيتحفظ UTF-16 و git مش هيعرف يشغّله. اكتبه من Git Bash أو VS Code.

ومتنساش [[git add .husky]]: الملفات لازم تبقى في الريبو عشان الباقيين ياخدوها.`
          },
          lines: [
            "prepare بيفعّل husky بعد كل install.",
            "إعداد lint-staged:",
            "ملفات الكود: eslint يصلّح وprettier ينسّق.",
            "باقي الملفات: prettier بس.",
            "قفلة lint-staged.",
            "commitlint بالقواعد المشهورة.",
            "سطّب الأدوات dev dependencies.",
            "اعمل .husky و prepare.",
            "hook قبل الـ commit: lint-staged.",
            "hook على رسالة الـ commit: commitlint.",
            "اتأكد إن الملفين موجودين فعلًا.",
            "ضيف الإعداد للريبو.",
            "رسالة ماشية على القواعد.",
            "رسالة من غير type: هتترفض.",
            "عدّي الـ hooks مرة في الطوارئ."
          ]
        }
      ]
    },
    {
      t: "سكربتات الصيانة",
      l: 3,
      n: "migrations بالترتيب، و Makefile، و dry-run قبل أي تعديل في البيانات، وإمتى متمسحش كل حاجة",
      items: [
        {
          cmd: "apply-migrations.sh",
          title: "تطبيق ملفات SQL بالترتيب بملخص نجاح وفشل",
          desc: R`بدل ما تنسخ كل ملف SQL وتلصقه في SQL Editor بإيدك، السكربت بيعدّي على قايمة ملفات بالترتيب، وكل ملف في transaction لوحده. لو ملف فشل بيسألك تكمل ولا توقف، وفي الآخر بيطبع كام نجح وكام فشل.

الأصلي كان بيبعت الـ SQL لـ REST endpoint بمفتاح service_role. النسخة دي بتستخدم psql مباشرة، ودا الصح.`,
          example: R`#!/usr/bin/env bash
set -uo pipefail
set -a; . ./.env.local; set +a
: "$__{DATABASE_URL:?DATABASE_URL missing in .env.local}"
migrations=(
  01_add_courses_instructor_fkey.sql
  02_fix_transactions_foreign_keys.sql
  03_ensure_exams_module_id.sql
)
ok=0; fail=0
for m in "$__{migrations[@]}"; do
  f="database/migrations/$m"
  [ -f "$f" ] || { echo "missing: $f"; fail=$((fail+1)); continue; }
  echo "applying $m ..."
  if psql "$DATABASE_URL" -v ON_ERROR_STOP=1 --single-transaction -f "$f"; then
    ok=$((ok+1))
  else
    fail=$((fail+1))
    read -rp "failed. continue? (y/n): " choice
    [ "$choice" = y ] || break
  fi
done
echo "ok: $ok/$__{#migrations[@]}  failed: $fail"
[ "$fail" -eq 0 ] && docker compose restart app`,
          try: "على Postgres تجريبي اعمل تلات ملفات: الأول create table، والتاني فيه غلطة إملائية في SQL، والتالت insert. شغّل السكربت وجاوب n عند الفشل، وتأكد بـ psql إن الملف التاني مسابش أي أثر (بسبب --single-transaction).",
          flag: "script",
          deep: {
            why: "النسخ واللصق في SQL Editor بيتلخبط فيه الترتيب، وبتنسى ملف، ومفيش سجل باللي اتعمل. سكربت بقايمة ثابتة بيتكرر بنفس الشكل على staging والإنتاج.",
            how: R`[[set -uo pipefail]] من غير [[-e]] عن قصد: عايزين لو psql فشل السكربت يكمّل للـ else ويسألك، مش يقع.

[[migrations=( ... )]] array بالترتيب اللي هيتطبق بيه. و [[$__{migrations[@]}]] بين علامات تنصيص بيطلّع كل عنصر لوحده.

[[-v ON_ERROR_STOP=1]] بيخلي psql يقف عند أول خطأ ويرجع exit code غير صفر، من غيره بيكمّل الملف ويرجع 0. و [[--single-transaction]] بيلف الملف كله في BEGIN و COMMIT: يا يتطبق كله يا ولا حاجة.

[[read -rp]] بيسأل ويستنى. و [[$((ok+1))]] حساب في bash. و [[$__{#migrations[@]}]] عدد العناصر.

وآخر سطر: لو مفيش فشل، أعد تشغيل التطبيق عشان يشوف الـ schema الجديد. ولو فيه فشل، الـ exit code بتاع السكربت كله بيبقى 1.`,
            when: "مشروع عنده ملفات SQL قديمة من غير أداة migrations. لو بتبدأ جديد، استخدم [[supabase db push]] أو Prisma migrate، لأنهم بيسجّلوا اللي اتطبق. psql في تاب PostgreSQL، و arrays في تاب bash.",
            mistakes: R`في مشروع حقيقي كان السكربت بيبعت الـ SQL لـ [[/rest/v1/rpc/exec]]. الدالة دي مش موجودة في Supabase من الأول، ولو حد عملها يبقى فتح تنفيذ أي SQL من REST بمفتاح service_role. ده باب لأي حد معاه المفتاح يمسح القاعدة كلها.

والمفتاح كان ظاهر في arguments بتاعة curl، يعني [[ps]] يوريه. والـ project ref مكتوب في السكربت. ومكانش فيه ON_ERROR_STOP، و [[head -n-1]] بيشتغل على GNU بس (مش ماك).

ومفيش جدول بيسجّل الـ migrations اللي اتطبقت، فممكن ملف يتطبق مرتين. وسكربت تاني كان بيقرا connection string فيه باسورد بـ [[read]] من غير [[-s]]، فالباسورد بيظهر على الشاشة وبيتسجل في أي تسجيل للترمنال.`
          },
          lines: [
            "pipefail ومتغيرات لازم تبقى معرّفة، من غير -e عشان نسأل عند الفشل.",
            "اقرا .env.local واعمل export.",
            "لازم DATABASE_URL.",
            "القايمة بالترتيب:",
            "الملف الأول.",
            "التاني.",
            "التالت.",
            "قفلة القايمة.",
            "عدّادات.",
            "لكل ملف:",
            "المسار الكامل.",
            "مش موجود؟ اعدّه فشل وكمّل.",
            "اطبع اسمه.",
            "طبّقه في transaction واحدة ووقف عند أول خطأ.",
            "نجح: زوّد العدّاد.",
            "فشل:",
            "زوّد عدّاد الفشل.",
            "اسأل.",
            "أي حاجة غير y: وقّف.",
            "قفلة الـ if.",
            "قفلة اللوب.",
            "الملخص.",
            "كله نجح؟ أعد تشغيل التطبيق."
          ]
        },
        {
          cmd: "Makefile",
          title: "أسامي قصيرة موثّقة لكل أوامر المشروع",
          desc: R`بدل ما تفتكر [[docker compose exec -T postgres psql -v ON_ERROR_STOP=1 -U ...]]، تكتب [[make migrate]]. و [[make help]] بيطبع كل الأوامر ووصف كل واحد، من التعليقات اللي بعد [[##]].

ومع الـ Makefile هتقابل أهم مطبّات make: السطور لازم تبدأ بـ Tab، و [[$$]] بدل [[$]] للـ shell، وكل سطر بيتنفّذ في shell لوحده.`,
          example: R`SHELL := /bin/bash
COMPOSE := docker compose
DBUSER := $(shell grep -E '^POSTGRES_USER=' .env | cut -d= -f2)
PSQL := $(COMPOSE) exec -T postgres psql -v ON_ERROR_STOP=1 -U $(DBUSER) -d appdb
.PHONY: help check up down logs migrate test shell-db
help: ## القايمة دي
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN{FS=":.*?## "}{printf "  %-10s %s\n",$$1,$$2}'
check: ## ملف compose سليم؟
	$(COMPOSE) config -q && echo "compose OK"
up: ## تشغيل
	$(COMPOSE) up -d
down: ## إيقاف (البيانات بتفضل)
	$(COMPOSE) down
logs: ## متابعة لوج التطبيق
	$(COMPOSE) logs -f --tail=100 app
migrate: ## كل الهجرات بالترتيب
	@for f in db/migrations/*.sql; do echo "--> $$f"; $(PSQL) -1 -f /dev/stdin < $$f || exit 1; done
test: ## التيستات
	cd app && python -m pytest tests -q
shell-db: ## psql جوه القاعدة
	$(PSQL)`,
          try: "في مشروع compose عندك اعمل Makefile بـ help و up و down و logs بس، وشغّل [[make help]]. بعدين بدّل الـ Tab في سطر بمسافات وشغّل [[make up]] وشوف رسالة missing separator.",
          flag: "script",
          deep: {
            why: "كل مشروع فيه ١٠ أوامر طويلة بتتكتب كل يوم، ومحفوظة في دماغ شخص واحد أو في README محدش بيقراه. الـ Makefile بيحطهم في الريبو بأسامي قصيرة، والـ help بيوثّقهم لوحده.",
            how: R`المتغيرات فوق: [[:=]] بيتحسب مرة واحدة وقت القراية. و [[$(shell ...)]] بينفّذ أمر ويحط الناتج، فـ DBUSER بيتقري من .env مرة واحدة.

[[.PHONY]] بيقول لـ make إن الأسامي دي أوامر مش ملفات. من غيرها، لو فيه فولدر اسمه test، [[make test]] هيقول «up to date» ومش هيعمل حاجة.

كل target: اسمه وبعده [[:]]، والسطور اللي تحته لازم تبدأ بـ Tab حقيقي. [[@]] في أول السطر بيخفي الأمر نفسه ويطبع الناتج بس.

make بيفك [[$(VAR)]] الأول، فلو عايز [[$]] توصل للـ shell (زي [[$$f]] في اللوب) بتكتبها مرتين.

[[help]] بيعمل grep على الـ Makefile نفسه ([[$(MAKEFILE_LIST)]]) على السطور اللي فيها [[## ]]، و awk بيطبع الاسم والوصف في عمودين.

[[migrate]] بيعدّي على الملفات بترتيب الاسم، و [[-1]] بيطبّق كل ملف في transaction واحدة، و [[|| exit 1]] بيوقف عند أول فشل. وكل سطر بيتنفّذ في shell لوحده، فعشان كده [[cd app && ...]] في سطر واحد.`,
            when: "أي مشروع فيه أوامر بتتكرر، خصوصًا compose وقواعد بيانات. على ويندوز make مش موجود غير في WSL أو Git Bash (بعد تسطيبه). compose في تاب Docker، و psql في تاب PostgreSQL.",
            mistakes: R`في مشروع حقيقي كان [[DBUSER = $$(grep ...)]]. الـ [[$$]] بتوصل للـ shell كـ [[$(grep ...)]] زي ما هي، فالـ grep بيتنفّذ في كل مرة PSQL يتستخدم (جوه لوب الـ migrate يعني مع كل ملف). الصح [[$(shell ...)]] مع [[:=]]، فـ make نفسه يحسبها مرة واحدة.

ولو ملف migration فشل في النص، الهجرات اللي قبله اتطبقت خلاص، ومكانش فيه transaction لكل ملف، فالملف اللي فشل ساب نصه متطبق. [[-1]] بيحل الجزء ده.

و [[make test]] محلي كان محتاج بيئة Python مفعّلة، وإلا بيقول pytest not found. وأشهر غلطة في أي Makefile: المحرر حوّل الـ Tab لمسافات، فـ make يقول [[missing separator]]. في VS Code خلي الملف على Tabs.

وكان فيه كمان targets لربط webhook تيليجرام بـ curl، بتقرا التوكن من .env بـ [[source .env]]. فكرة حلوة تحط فيها أي أمر API بتحتاجه كل كام يوم.`
          },
          lines: [
            "كل الأوامر بـ bash مش sh.",
            "اختصار لـ docker compose.",
            "اليوزر من .env، يتحسب مرة واحدة.",
            "أمر psql كامل جوه الـ container.",
            "الأسامي دي أوامر مش ملفات.",
            "help، والوصف بعد ##.",
            "اطبع كل target ووصفه في عمودين.",
            "check.",
            "ملف compose سليم؟",
            "up.",
            "شغّل في الخلفية.",
            "down.",
            "وقّف (الـ volumes بتفضل).",
            "logs.",
            "تابع آخر ١٠٠ سطر من لوج app.",
            "migrate.",
            "كل ملف بالترتيب في transaction، ووقف عند أول فشل.",
            "test.",
            "ادخل app وشغّل pytest في نفس السطر.",
            "shell-db.",
            "افتح psql تفاعلي."
          ]
        },
        {
          cmd: "n8n_import.sh",
          title: "workflows الـ n8n من git بأسرار من .env",
          desc: R`«الإعدادات ككود»: workflows الـ n8n محفوظة في git كملفات JSON من غير أي أسرار، وفيها placeholders زي [[$__{APP_URL}]]. السكربت بيملاها من .env بـ envsubst، ويعمل ملف credentials مؤقت بصلاحيات خاصة، ويستوردهم جوه container الـ n8n.

وبينضّف الملفات المؤقتة من الجهاز ومن جوه الـ container حتى لو وقع في النص.`,
          example: R`#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
set -a; . ./.env; set +a
: "$__{INTERNAL_TOKEN:?need INTERNAL_TOKEN in .env}"
export APP_URL="$__{APP_URL:-http://app:8080}"
command -v envsubst >/dev/null || { echo "sudo apt install gettext-base"; exit 1; }
TMP="$(mktemp -d)"; chmod 700 "$TMP"
cleanup() { rm -rf "$TMP"; docker compose exec -T n8n rm -rf /tmp/wf /tmp/creds.json || true; }
trap cleanup EXIT
mkdir -p "$TMP/wf"
for f in n8n/workflows/*.json; do
  envsubst '$__{APP_URL} $__{CHAT_ID}' < "$f" > "$TMP/wf/$(basename "$f")"
done
if grep -rqE '\$\{[A-Z_]+\}' "$TMP/wf/"; then echo "unfilled placeholders"; exit 1; fi
( umask 077; jq -n '[{id:"app-internal", name:"app internal", type:"httpHeaderAuth", data:{name:"authorization", value:("Bearer " + env.INTERNAL_TOKEN)}}]' > "$TMP/creds.json" )
docker compose cp "$TMP/creds.json" n8n:/tmp/creds.json
docker compose exec -T n8n n8n import:credentials --input=/tmp/creds.json
docker compose exec -T n8n mkdir -p /tmp/wf
docker compose cp "$TMP/wf/." n8n:/tmp/wf/
docker compose exec -T n8n n8n import:workflow --separate --input=/tmp/wf
echo "imported: activate the workflows from the n8n UI"`,
          try: R`جرّب envsubst لوحده: [[echo '{"url": "$__{APP_URL}", "x": "$__{HOME}"}' | APP_URL=http://app:8080 envsubst '$__{APP_URL}']]. لاحظ إن [[$__{HOME}]] فضل زي ما هو لأنه مش في القايمة. وبعدين شغّل n8n في Docker على جهازك وصدّر workflow واستورده بالسكربت.`,
          flag: "script",
          deep: {
            why: "workflows الـ n8n بتتعمل بالماوس في الواجهة، ولو السيرفر راح أو عايز نسخة تانية بتعيدها من الأول. تصديرها لـ git بيحلها، بس الملفات فيها روابط وتوكنات ومينفعش تترفع زي ما هي.",
            how: R`[[export APP_URL="$__{APP_URL:-http://app:8080}"]] قيمة افتراضية لو مش موجودة في .env.

[[mktemp -d]] مع [[chmod 700]]: فولدر مؤقت محدش غيرك يقرا منه. و [[trap cleanup EXIT]] بتشغّل cleanup في آخر السكربت مهما حصل: بتمسح الفولدر على الجهاز، والملفات اللي اتنسخت جوه الـ container.

[[envsubst '$__{APP_URL} $__{CHAT_ID}']] بالقايمة دي بس بيبدّل المتغيرين دول. من غير قايمة، أي [[$]] في الـ JSON (و n8n بيستخدم [[$json]] كتير في expressions) هيتبدّل بفاضي ويبوّظ الـ workflow.

والـ grep بعدها بيدوّر على أي [[$__{VAR}]] لسه موجود، يعني placeholder نسيته في القايمة، ويوقف.

[[umask 077]] جوه subshell (الأقواس) بيخلي الملف اللي هيتعمل صلاحيته 600. و jq بيبني الـ JSON وبياخد التوكن من [[env.INTERNAL_TOKEN]]، فالتوكن مش بيبان في سطر الأوامر.

[[docker compose cp]] بينسخ ملف جوه الـ container، و [[n8n import:credentials]] و [[import:workflow --separate]] (ملف لكل workflow) بيستوردوا.`,
            when: "أي أداة إعداداتها JSON أو YAML وعايز تحطها في git (n8n، و Grafana dashboards، و nginx templates). trap و mktemp في تاب bash، و compose cp في تاب Docker.",
            mistakes: R`في مشروع حقيقي الـ trap كان بينضّف الجهاز بس. لو السكربت وقع بين [[cp]] و [[rm]]، ملف الـ credentials فيه التوكن كان بيفضل في /tmp جوه container الـ n8n. هنا cleanup بتمسح من الاتنين.

والـ grep بتاع الـ placeholders كان بيطبع بس ومبيوقفش، فـ workflow فيه [[$__{CHAT_ID}]] حرفيًا كان بيتستورد ويفشل بعدين وقت التشغيل.

والـ workflows بتتستورد وهي متوقفة، ولازم تفعّلها من الواجهة. السكربت بيقول كده في الآخر عشان محدش يفتكر إنها شغالة.

والنسخة الأصلية كانت بتبني الـ credentials بـ Python heredoc. jq أقصر، بس لو هتستخدمه متديلوش التوكن كـ [[--arg]] لأنه هيبان في [[ps]].`
          },
          lines: [
            "وقّف عند أي خطأ.",
            "ادخل جذر المشروع.",
            "اقرا .env واعمل export.",
            "لازم التوكن.",
            "رابط التطبيق، بقيمة افتراضية.",
            "envsubst موجود؟",
            "فولدر مؤقت محدش يقراه غيرك.",
            "دالة تنضّف الجهاز والـ container.",
            "شغّلها في الآخر مهما حصل.",
            "فولدر للـ workflows بعد التعبئة.",
            "لكل workflow:",
            "بدّل المتغيرين دول بس.",
            "قفلة اللوب.",
            "فيه placeholder لسه متملاش؟ وقّف.",
            "ملف credentials بصلاحية 600، والتوكن من البيئة.",
            "انسخه جوه الـ container.",
            "استورد الـ credentials.",
            "فولدر جوه الـ container.",
            "انسخ الـ workflows.",
            "استوردهم، ملف لكل workflow.",
            "فكّرني أفعّلهم."
          ]
        },
        {
          cmd: "normalize-phones.mjs",
          title: "سكربت يعدّل بيانات الإنتاج بأمان",
          desc: R`أي سكربت بيعدّل بيانات حقيقية لازم يوريك اللي هيحصل الأول (dry-run) من غير ما يلمس حاجة، ومينفّذش غير لما تضيف [[--apply]] بنفسك. والحالات الغامضة بيتخطاها ويبلّغ عنها بدل ما يخمّن.

والتعديلات كلها في transaction، فلو وقع في النص مفيش حاجة تتكتب.`,
          example: R`// node --env-file=.env scripts/normalize-phones.mjs          → معاينة
// node --env-file=.env scripts/normalize-phones.mjs --apply  → تنفيذ
import pg from "pg";
const normalize = p => { const d = p.replace(/\D/g, ""); return d.length === 11 && d.startsWith("01") ? "+2" + d : null; };
const APPLY = process.argv.includes("--apply");
const c = new pg.Client({ connectionString: process.env.DATABASE_URL });
await c.connect();
try {
  const { rows } = await c.query(
    "SELECT id, phone FROM users WHERE phone IS NOT NULL AND phone NOT LIKE '+%'");
  console.log(APPLY ? "APPLY" : "DRY-RUN", "candidates:", rows.length);
  let changed = 0, skipped = 0, conflicts = 0;
  await c.query("BEGIN");
  for (const u of rows) {
    const next = normalize(u.phone);
    if (!next) { skipped++; continue; }
    const clash = await c.query(
      "SELECT 1 FROM users WHERE phone=$1 AND id<>$2", [next, u.id]);
    if (clash.rowCount) { conflicts++; continue; }
    console.log(" ", u.phone, "->", next);
    await c.query("UPDATE users SET phone=$1 WHERE id=$2", [next, u.id]);
    changed++;
  }
  await c.query(APPLY ? "COMMIT" : "ROLLBACK");
  console.log({ changed, skipped, conflicts });
  if (!APPLY && changed) console.log("Run again with --apply to write.");
} catch (e) {
  await c.query("ROLLBACK"); throw e;
} finally {
  await c.end();
}`,
          try: "على Postgres تجريبي اعمل جدول users فيه أرقام بأشكال مختلفة (01012345678 و 010-1234-5678 و رقم ناقص، ورقمين هيبقوا نفس الرقم بعد التعديل). شغّل من غير [[--apply]] وراجع الناتج، وبعدين بـ [[--apply]]، وشغّله تالت مرة وتأكد إنه قال candidates: 0 للي اتعدّلوا.",
          flag: "script",
          deep: {
            why: "سكربت «يصلّح» بيانات الإنتاج من غير معاينة هو أسرع طريقة تبوّظ آلاف الصفوف في ثانية. الـ dry-run بيخليك تشوف كل تغيير قبل ما يحصل، و --apply قرار واعي منك.",
            how: R`[[node --env-file=.env]] (Node 20.6 وأحدث) بيقرا .env من غير مكتبة dotenv.

[[process.argv.includes("--apply")]]: الافتراضي معاينة. لازم تكتب --apply بإيدك عشان يكتب.

الاستعلام بيجيب المرشحين بس (أرقام مش بادئة بـ +). و [[normalize]] بترجع null لو الصيغة مش معروفة، فالسكربت يتخطاها ويعدّها في skipped بدل ما يخمّن.

قبل أي تعديل بيشيك: فيه يوزر تاني عنده نفس الرقم بعد التعديل؟ لو أيوه، ده conflict: محتاج قرار بشري، فيتسجل ويتخطى.

[[$1]] و [[$2]] parameters: القيم بتتبعت منفصلة عن الـ SQL، فمفيش SQL injection.

كل حاجة جوه [[BEGIN]]. في الـ dry-run آخرها [[ROLLBACK]]، وفي الـ apply [[COMMIT]]. ولو حصل exception في النص، الـ catch بيعمل ROLLBACK فمفيش صفوف نص متعدّلة. و [[finally]] بيقفل الاتصال في كل الحالات.

وفي الآخر ملخص بالأرقام: كام اتغيّر وكام اتخطى وكام تعارض.`,
            when: "أي تعديل جماعي على بيانات حقيقية: تنظيف أرقام، ودمج حسابات، و seed لبيانات أولية. نفس الشكل (dry-run افتراضي) لأي سكربت بيمسح أو يعدّل. BEGIN و ROLLBACK في تاب PostgreSQL، و node --env-file في تاب Node.",
            mistakes: R`في مشروع حقيقي السكربت الأصلي مكانش بيستخدم transaction، فلو وقع في النص (الاتصال اتقطع مثلًا) يسيب نص الصفوف متعدّلة ونصها لأ. اتضاف BEGIN و COMMIT هنا.

وكان بيقرا .env بـ regex يدوي بدل [[node --env-file]]، ودا بيبوظ مع القيم اللي فيها علامات تنصيص أو [[=]].

والفكرة نفسها ممتازة وكانت متكررة في سكربتات seed-admin و seed-demo في نفس المشروع. خليها قالب لأي سكربت بيعدّل بيانات.`
          },
          lines: [
            "مكتبة Postgres.",
            "حوّل الرقم لصيغة دولية، أو null لو الصيغة مش معروفة.",
            "هل المستخدم كتب --apply؟",
            "اتصال بالقاعدة من DATABASE_URL.",
            "اتصل.",
            "ابدأ try:",
            "هات المرشحين...",
            "...الأرقام اللي مش بادئة بـ +.",
            "اطبع الوضع وعدد المرشحين.",
            "عدّادات.",
            "ابدأ transaction.",
            "لكل يوزر:",
            "الرقم بعد التعديل.",
            "صيغة مش معروفة؟ اتخطاه.",
            "فيه حد تاني عنده نفس الرقم؟...",
            "...بـ parameters مش string.",
            "تعارض؟ متخمّنش، اتخطاه وعدّه.",
            "اطبع التغيير.",
            "اكتب جوه الـ transaction حتى في المعاينة، عشان رقمين بيتحولوا لنفس القيمة يبانوا تعارض من الـ dry-run. ومن غير --apply الـ ROLLBACK بيلغي كل ده.",
            "عدّه.",
            "قفلة اللوب.",
            "apply: احفظ. dry-run: ارجع في كل حاجة.",
            "الملخص.",
            "فكّر المستخدم بـ --apply.",
            "أي خطأ:",
            "ارجع في كل حاجة وارمي الخطأ.",
            "في كل الحالات:",
            "اقفل الاتصال.",
            "قفلة الـ try."
          ]
        },
        {
          cmd: "fix-docker.sh",
          title: "التعديلات مش ظاهرة: متمسحش كل حاجة",
          desc: R`سكربت «الإصلاح» المشهور: وقّف كل حاجة، امسح الـ containers والصور، [[docker system prune -f]]، وابني من غير كاش. بيشتغل أحيانًا، بس بياخد وقت، وبيمسح حاجات مش تبعك، والأسوأ إنه مش بيقولك إيه كانت المشكلة.

الصح إنك تمشي خطوة خطوة: التعديل وصل للـ image؟ وصل للـ container؟ السيرفر بيرجّعه؟ ولو لازم تبدأ من الصفر، امسح صور المشروع ده بس.`,
          example: R`# 1) ابني الخدمة اللي اتغيّرت بس، وشوف هل قامت
docker compose build --pull frontend
docker compose up -d frontend
docker compose ps
docker compose logs --tail=50 frontend
# 2) الملف الجديد جوه الـ container فعلًا؟
docker compose exec frontend ls -la /usr/share/nginx/html
# 3) السيرفر بيرجّع الجديد؟ لو أيوه يبقى كاش المتصفح
curl -sI https://example.com/ | grep -iE 'cache-control|etag|last-modified'
# 4) آخر حل: امسح صور المشروع ده بس وابني من الصفر
docker compose down --rmi local
docker compose build --no-cache
docker compose up -d`,
          try: "في مشروع compose تجريبي غيّر كلمة في الواجهة، وامشي الخطوات من ١ لـ ٣ وقف عند أول خطوة تلاقي فيها المشكلة. وبعدين افتح الموقع بـ Ctrl+Shift+R وشوف الفرق.",
          flag: "danger",
          deep: {
            why: "«امسح وابني من الصفر» بيخبّي السبب الحقيقي، فالمشكلة ترجع تاني الأسبوع الجاي وتعيد نفس الـ ١٠ دقايق. وعلى سيرفر فيه أكتر من مشروع، [[system prune]] بيمسح حاجات مش بتاعتك.",
            how: R`[[build --pull frontend]] بيبني الخدمة دي بس، و [[--pull]] بيجيب آخر نسخة من الـ base image. و [[up -d frontend]] بيعيد إنشاء الـ container لو الـ image اتغيّرت. [[ps]] و [[logs]] بيقولولك هل قام ولا وقع.

[[exec ... ls -la]] بيوريك الملفات جوه الـ container بتاريخها. لو الملف القديم لسه هناك، المشكلة في الـ build (كاش طبقة، أو .dockerignore، أو COPY من فولدر غلط).

[[curl -sI]] بيجيب الـ headers بس من السيرفر. لو الـ ETag أو Last-Modified اتغيّر، السيرفر بيرجّع الجديد والمشكلة في كاش المتصفح أو CDN، ومفيش أي حاجة في Docker محتاجة تتمسح.

ولو فعلًا لازم تبدأ من الصفر: [[down --rmi local]] بيمسح الصور اللي compose بناها للمشروع ده بس (مش الصور اللي اتنزّلت زي postgres)، والـ volumes بتفضل.`,
            when: "كل ما تلاقي نفسك بتقول «التعديل مش ظاهر». الأوامر لوحدها في تاب Docker، و curl -I في تاب التشخيص.",
            mistakes: R`في مشروع حقيقي كان السكربت من غير [[set -e]]، فلو الـ build فشل بيكمّل ويشغّل الصور القديمة (أو ولا حاجة)، ويطبع اللوج كأن كل حاجة تمام.

و [[docker system prune -f]] بيمسح كل container واقف وكل image مش مستخدمة على السيرفر كله، حتى لو تبع مشروع تاني واقف مؤقتًا.

وأسماء الصور في [[docker rmi]] كانت مكتوبة بإيدك ومختلفة عن اللي في deploy.sh (المشروع اتغيّر اسمه)، فالمسح مكانش بيمسح حاجة أصلًا. [[down --rmi local]] بيعرف الأسامي لوحده.

وفي الغالب السبب الحقيقي كان كاش المتصفح أو Nginx، مش Docker خالص. وكان بيستخدم [[docker-compose]] القديم.`
          },
          lines: [
            "ابني الخدمة دي بس بأحدث base image.",
            "شغّلها بالـ image الجديدة.",
            "قامت؟",
            "آخر ٥٠ سطر من لوجها.",
            "الملفات جوه الـ container بتاريخها.",
            "headers الكاش من السيرفر.",
            "وقّف وامسح صور المشروع ده بس (الـ volumes بتفضل).",
            "ابني من غير كاش.",
            "شغّل."
          ]
        }
      ]
    }
  ]
});
