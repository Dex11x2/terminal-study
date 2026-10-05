// تكملة تاب real: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/real/01.js (شرح حقول الدرس في أوله)
MORE("real", [
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
          ],
          sol: R`بعد [[docker compose up -d]]، [[sudo ss -tlnp]] لازم يوريك [[0.0.0.0:80]] و [[0.0.0.0:443]] بس (البرنامج [[docker-proxy]]). مفيش 3000، لأن [[app]] عليه [[expose]] مش [[ports]]: البورت متاح لـ nginx جوه شبكة compose بس. لو لقيت 3000 يبقى فيه [[ports]] قديم.

[[docker compose ps]] المفروض يوريك [[app]] بحالة [[(healthy)]] بعد أول ٣٠ ثانية. و [[docker compose exec certbot certbot renew --dry-run]] لازم يخلص بـ [[Congratulations, all simulated renewals succeeded]].

الفكرة في اللوبات: certbot بيحاول يجدّد كل ١٢ ساعة (مش بيعمل حاجة غير لو فاضل أقل من ٣٠ يوم)، و nginx بيعمل reload كل ٦ ساعات عشان ياخد أي شهادة جديدة. ولو [[exec]] قال [[service "certbot" is not running]]، اتأكد إن الـ entrypoint مكتوب صح: [[$$!]] في compose بتبقى [[$!]]. (ده محتاج دومين وشهادة حقيقية فما شغّلتوش كامل.)`
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
          ],
          sol: R`[[docker build -t myapp .]] بيعدّي بـ ٣ مراحل، و [[docker images myapp]] بيوريك حجم في حدود ٢٠٠ ميجا تقريبًا (node:22-alpine لوحدها قريب من ١٦٠ ميجا على الديسك، والباقي الـ standalone). لو طلعت أكتر من جيجا، غالبًا [[.dockerignore]] مش شغال و [[node_modules]] أو [[.next]] اتنسخوا، أو [[output: "standalone"]] مش في [[next.config.ts]] (ساعتها البناء بيقف عند [[test -f .next/standalone/server.js]]).

[[docker run --rm myapp ls public]] لازم يطبع صورك ([[logo.png]] وغيرها). لو فاضي أو [[No such file]]، يبقى فولدر [[public]] مش موجود في المشروع (اعمله حتى لو فاضي، وإلا الـ COPY بيفشل).

[[docker run --rm myapp whoami]] لازم يطبع [[nextjs]]. لو طبع [[root]] يبقى سطر [[USER nextjs]] اتشال. ولو التطبيق قام وبيرجّع 404 على الصور والـ CSS، يبقى نسيت تنسخ [[.next/static]]. (البناء محتاج مشروع Next.js ونت، فما جربتوش هنا.)`
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
          ],
          sol: R`جربت ملف الـ [[nginx.conf]] ده على nginx:alpine جنب backend بيسمع على 3000:

[[curl -I /settings]] رجّع [[200]] و [[Content-Type: text/html]]، ده [[index.html]] بسبب [[try_files ... /index.html]]، فالـ refresh على صفحة داخلية بيشتغل.
[[curl -I /index.html]] رجّع [[Cache-Control: no-cache]]، و [[/settings]] كمان بياخد [[no-cache]] لأنه بيتحوّل داخليًا لـ [[/index.html]].
[[curl -I /assets/index-abc123.js]] رجّع [[Cache-Control: public, max-age=31536000, immutable]].
[[/assets/nope.js]] رجّع [[404]] مش [[index.html]]، وده الصح عشان المتصفح مايحاولش يشغّل HTML كـ JavaScript.
[[/api/users]] وصل للـ backend بنفس المسار.

فخ جربته: لو الـ image اشتغلت من غير service اسمه [[backend]] على نفس الشبكة، nginx مابيقومش خالص: [[host not found in upstream "backend"]]. فلازم تشغّلها في compose مع الباك إند.`
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
          ],
          sol: R`ملف الـ dev: لما تعدّل سطر في [[backend/src]]، لوج الباك إند ([[docker compose -f compose.dev.yml logs -f backend]]) بيطبع [[[nodemon] restarting due to changes...]] وبعدها [[[nodemon] starting node src/server.js]]. لو مابيحصلش على ويندوز أو ماك، غالبًا الـ file events مش بتوصل عبر bind mount، استخدم [[nodemon -L]] (polling).

ملف الإنتاج: [[sudo ss -tlnp]] مش هيوريك أي بورت للمشروع، مفيش 3000 ولا 80 تبعه. اللي سامع على 80 و 443 هو container [[nginx-proxy]] بس. nginx-proxy بيكتشف [[frontend]] لوحده من [[VIRTUAL_HOST]] لأنه على شبكة [[nginx-proxy]]، و acme-companion بيطلب الشهادة من [[LETSENCRYPT_HOST]].

لو الدومين رجّع [[503]] من nginx-proxy، يبقى الـ frontend مش على شبكة [[proxy]] أو [[VIRTUAL_HOST]] مكتوب غلط. ولو [[docker compose up]] قال [[network nginx-proxy declared as external, but could not be found]] يبقى nginx-proxy مش متسطب. (ده محتاج nginx-proxy ودومين، فما جربتوش.)`
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
          ],
          sol: R`بعد [[docker compose up -d]]، [[docker compose ps]] بيوريك [[mongo]] بحالة [[(health: starting)]] لحد ٤٠ ثانية ([[start_period]])، والباك إند لسه [[Created]] مش [[Up]]. أول ما mongo يبقى [[(healthy)]] الباك إند بيقوم. ده شغل [[condition: service_healthy]].

لما شلت [[JWT_SECRET]] من [[.env]] وجربت [[docker compose config]]، compose رفض قبل ما يعمل أي حاجة:

[[error while interpolating services.backend.environment.JWT_SECRET: required variable JWT_SECRET is missing a value: set it in .env]]

وده بالظبط فايدة [[:?]]: السيرفر مايقومش بسر فاضي. وبعد ما رجّعته [[config]] عدّى، و [[JWT_EXPIRE]] خد [[7d]] الافتراضي من [[:-7d]].

لو [[up]] قال [[external volume "mongodb_data" not found]] يبقى نسيت [[docker volume create mongodb_data]]. ولو الباك إند قام وبيقول [[Authentication failed]]، الباسورد في [[MONGODB_URI]] مختلف عن [[MONGO_ROOT_PASSWORD]]، أو ناقص [[?authSource=admin]].`
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
          ],
          sol: R`جربته على Postgres في compose، وبدّلت rclone بـ [[cp]] لفولدر محلي (زي remote من نوع local). الناتج:

[[appdb: 4.0K]]
[[n8n: 4.0K]]
[[check: identical]]
[[done: myapp_2026-09-30_0806.tar.gz.enc]]

والاسترجاع على قاعدة جديدة فاضية: [[openssl enc -d ... | tar -xzf -]] طلّع [[appdb.dump]] و [[n8n.dump]]، و [[pg_restore -d appdb_restore --clean --if-exists < appdb.dump]] خلص بـ exit 0، و [[select count(*) from t]] رجّع [[100]] زي الأصل. مع rclone الحقيقي، [[rclone check]] بيطبع [[0 differences found]].

الاسترجاع هو الاختبار الحقيقي، مش إن الملف اترفع. لو [[pg_restore]] قال [[database "appdb" does not exist]] اعمل القاعدة الأول. ولو فك التشفير قال [[bad decrypt]] يبقى الـ passphrase مختلف، وخزّنها برّه السيرفر (password manager)، لأن لو السيرفر ضاع والـ passphrase عليه بس، الباك أب ملوش لازمة.`
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
          ],
          sol: R`جربت الفرق: [[false | tee x.log; echo $?]] طبع [[0]]، و [[set -o pipefail; false | tee x.log; echo $?]] طبع [[1]]. من غير pipefail، خطوة فاشلة قبل [[|]] بتبان ناجحة.

السكربت على Mongo 8 شغال: اللوج طلّع [[start: .../myapp_2026-09-30_08-06.archive.gz]] وبعدين [[ok: 4.0K]] و [[kept: 1 backups]]. بعد [[docker stop myapp-mongodb]] وتشغيله تاني: [[ERROR: mongodump failed]] و exit [[1]]، واللوج فيه سبب الخطأ ([[container ... is not running]]).

ملاحظتين من التجربة: لو شغّلته قبل ما Mongo يخلص أول تشغيل، بيفشل بـ [[Authentication failed]] لأن اليوزر root لسه بيتعمل، فاستنى ping ينجح الأول. واسم الملف بالدقيقة، فلو نسخة فشلت في نفس دقيقة نسخة ناجحة، [[rm -f "$FILE"]] بيمسح الناجحة. ده مش هيحصل في cron يومي، بس خد بالك وانت بتجرّب.`
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
          ],
          sol: R`أول تشغيل بدبل كليك: [[git pull]] وبعدين commit باسم زي [[backup 30/09/2026 10:15:02.33]] و [[git push]]، وفي الآخر [[تم الرفع بنجاح.]]. ولو مفيش تغيير، [[git diff --cached --quiet]] بيرجّع 0 فبيطبع [[مفيش تغييرات جديدة للرفع.]] ويقفل.

بعد ما تضيف [[data.json]] لـ [[.gitignore]]، بيطبع التحذير ويستنى. جربت [[git check-ignore -v data.json]]: من غير القاعدة طبع ولا حاجة وexit [[1]]، ومعاها طبع [[.gitignore:1:data.json	data.json]] وexit [[0]]. السطر ده بيقولك بالظبط أنهي ملف وأنهي سطر عامل ignore.

لو العربي طالع رموز غريبة، [[chcp 65001]] محتاج الملف يتحفظ UTF-8. ولو الـ push قال [[rejected]]، فيه تعديل على GitHub من جهاز تاني والـ [[pull --rebase]] فشل بسبب conflict، ساعتها حلّه بإيدك. (جربت أوامر git، مش الـ .bat نفسه لأنه ويندوز.)`
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
          ],
          sol: R`في [[package.json]] بتاع الجذر:

[[format:check]] = [[prettier --check .]]، [[lint]] = [[eslint . --max-warnings=0]]، [[typecheck]] = [[pnpm -r typecheck]]، [[test]] = [[pnpm -r test]]، [[build]] = [[pnpm -r build]].

بإيدك بالترتيب: [[pnpm format:check]] على كود سليم بيطبع [[All matched files use Prettier code style!]]، وكل واحد بعده بيخلص بـ exit 0. بعد ما تضيف مسافة زيادة، [[format:check]] بيطبع [[[warn] src/x.ts]] و [[Code style issues found in the above file. Run Prettier with --write to fix.]] وexit 1.

في الـ PR: الـ job بيقع في خطوة Format، وكل الخطوات بعدها عليها علامة skipped، فمادفعتش وقت build عشان مسافة. ده سبب الترتيب من الأرخص للأغلى. لو الـ CI قال [[ERR_PNPM_OUTDATED_LOCKFILE]] يبقى نسيت تعمل commit للـ [[pnpm-lock.yaml]] بعد ما ضفت مكتبة، و [[--frozen-lockfile]] رفض يعدّله.`
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
          ],
          sol: R`اعمل migration فيها غلطة، مثلًا [[ALTER TABLE "User" ADD COLUMN "age" INTEGR;]] (نوع مش موجود). في الـ PR، خطوة [[pnpm exec prisma migrate deploy]] هتقع برسالة زي:

[[Error: P3018 ... Migration name: 20260930_add_age]]
[[Database error: ERROR: type "integr" does not exist]]

والخطوات اللي بعدها (tsc و test و build) مش هتشتغل. ده بالظبط اللي كان هيحصل على سيرفر الإنتاج، بس هنا وقع في CI على قاعدة فاضية.

بعد التصليح اتأكد إنك عدّلت ملف الـ migration نفسه أو عملت واحدة جديدة، مش [[schema.prisma]] بس. ولو الـ CI قال [[Can't reach database server at localhost:5432]]، الـ service لسه بتقوم والـ health options ناقصة. ولو [[migrate deploy]] قال [[No pending migrations]] وانت ضايف واحدة، يبقى نسيت تعمل commit لفولدر [[prisma/migrations]]. (ما شغّلتش workflow على GitHub، بس جربت إن [[psql -v ON_ERROR_STOP=1]] بيقف عند غلطة SQL في درس apply-migrations.)`
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
          ],
          sol: R`جربتها بالظبط: بعد تعديل من غير commit، [[git diff --exit-code file; echo $?]] طبع الفرق:

[[@@ -1 +1,2 @@]]
[[ a]]
[[+b]]

وبعده [[1]]. بعد [[git checkout file]] نفس الأمر ماطبعش حاجة وطبع [[0]].

ده كل الفكرة في الـ workflow: بيولّد الأنواع من القاعدة الحقيقية فوق الملف المتسجّل في الريبو. لو حد عمل migration ونسي يولّد الأنواع ويعمل commit، الملف هيتغير و [[--exit-code]] يرجّع 1 فالـ CI يقع برسالة [[Types drifted. Run npm run types:generate and commit.]]. ولو الأنواع متطابقة، 0 والـ job أخضر. وخد بالك إن [[git diff]] من غير [[--exit-code]] بيرجّع 0 دايمًا حتى لو فيه فرق.`
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
          ],
          sol: R`جربت الإعداد (بـ npm بدل pnpm) في ريبو تجربة:

ملف [[a.ts]] فيه [[const   x =    {a:1,b:2}]]. بعد [[git commit -m "feat: add a"]] الـ pre-commit شغّل lint-staged ([[✔ Done running tasks for staged files!]])، والملف اتعمله commit بعد التنسيق: [[const x = { a: 1, b: 2 };]].
[[git commit --allow-empty -m "fixed stuff"]] اترفض:
[[✖   subject may not be empty [subject-empty]]]
[[✖   type may not be empty [type-empty]]]
[[husky - commit-msg script failed (code 1)]]
لازم يبقى بالشكل [[fix: ...]] أو [[feat: ...]].
[[HUSKY=0 git commit -m "wip"]] عدّى من غير hooks، وده للطوارئ بس.

لو الـ hooks مش بتشتغل خالص، اتأكد إن [[git config core.hooksPath]] بيقول [[.husky/_]] (ده اللي [[husky init]] أو [[prepare]] بيعمله). ولو [[commitlint.config.js]] بـ [[export default]] واشتكى من الـ syntax، ضيف [["type": "module"]] في package.json أو سمّيه [[.mjs]].`
        }
      ]
    }
]);
