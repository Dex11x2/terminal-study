# حالات من الشاتات القديمة (لسه متكتبتش دروس)

اتطلّعت يوم ٣ نوفمبر من كل الشاتات القديمة في المشاريع التانية (غير الموقع ده)، وكل بند اتفحص إنه مش موجود على الموقع، أو موجود بشكل خفيف. **كل الأسامي مخترعة** (`shop.example` و `deployer` و `10.0.0.5` و `203.0.113.9`). وكل نص خطأ لازم يتعاد في المعمل قبل ما يتكتب في درس، والبنود المكتوب عليها «يتجرّب» أو «مش متأكد» بالذات. الترتيب والحالة في `PLAN.md` قسم ٤د.

## أ. شاتين: موقع Next.js و git، ونقل مواقع بين سيرفرين
كل الأسماء هنا مخترعة: `shop.example` و `shop-api.example` و `10.0.0.5` (القديم) و `10.0.0.9` (الجديد) و `deployer` و `acme-co`. مفيش باسوردات ولا إيميلات حقيقية. كل أمر لازم يتجرّب في معمل (`docker run --rm ubuntu:24.04` أو systemd lab) قبل ما يتكتب. أي رسالة خطأ مكتوب جنبها «من الشات» اتشافت فعلاً، والباقي لازم يتولّد في المعمل.
ملحوظة عن الفحص: `grep -rl` على `js/tabs` بيوري إن الأوامر المنفردة (`pg_dump`, `mongodump`, `rsync`, `certbot renew --dry-run`, `nslookup`, `docker tag`, `ufw allow`) موجودة في دروس. اللي ناقص هو **الحالة الكاملة** والفخاخ اللي بتربط بينهم.

---

### تاب `vps` (أو `real`): نقل مواقع بين سيرفرين

- [ ] **١. قضية كاملة: «انقل كل المواقع من VPS قديم لجديد من غير downtime»** (تاب vps، درس جديد جنب `vps/11`؛ مفيش `cutover` ولا `rsync -aH` ولا `docker save|load` كنقل في أي تاب).
  - **الترتيب كله، وليه:**
    1. **جرد القديم قراءة بس.** `hostname; cat /etc/os-release | head -2; nproc; free -h; df -h /`، `systemctl list-units --type=service --state=running`، `docker ps --format "{{.Names}}: {{.Status}}"`، `ls /etc/nginx/sites-enabled`، `grep -hE "server_name|proxy_pass|root |listen" /etc/nginx/sites-available/*`، `ls /etc/letsencrypt/live`، `crontab -l`، `du -sh /var/www/* /opt/*`. الهدف: خريطة (دومين ← بورت ← container ← داتا).
    2. **فين الداتا الحقيقية؟** `docker inspect $(docker ps -q) --format '{{.Name}}: {{range .Mounts}}[{{.Type}} {{.Source}} -> {{.Destination}}] {{end}}'` (bind mounts و volumes)، و `docker inspect ... --format '{{index .Config.Labels "com.docker.compose.project.working_dir"}}'` (كل container جاي من أنهي مجلد compose)، و `docker system df -v`.
    3. **قرار «إيه اللي مش هيتنقل»** (أرشيفات قديمة وكاش build وزبالة) وتكتبه وتسأل صاحب السيرفر.
    4. **تجهيز الجديد بالإضافة بس:** `apt-get install -y nginx certbot python3-certbot-nginx rsync ufw`، وبعدين `ufw allow 22/tcp` **الأول**، وبعدها 80 و 443، وبعدها `ufw --force enable` (لو فتحت الـ firewall قبل 22 بتقفل على نفسك).
    5. **نسخ الملفات:** `rsync -aHz --info=stats1 --exclude node_modules --exclude .git -e "ssh" root@OLD:/opt/app/ /opt/app/` (`-a` أرشيف، `-H` hard links، `-z` ضغط، الشرطة المائلة في آخر المصدر مهمة). الـ `.env` بيتنسخ معاه. للتنقل الطويل: `nohup ./pull.sh > pull.log 2>&1 &` وبعدين `tail` على اللوج.
    6. **نقل الـ images من غير build:** `docker save img1 img2 | ssh new 'docker load'` (أو `docker save -o` وبعدين scp). بيضمن إن النسخة الجديدة بالظبط هي اللي شغالة.
    7. **اختبار الجديد بداتا حقيقية ومن غير ما يبعت حاجة لحد** (القضية ٣ تحت).
    8. **نسخ الشهادات والـ nginx:** `rsync -aH root@OLD:/etc/letsencrypt/ /etc/letsencrypt/` و `/etc/nginx/sites-available/`، وبعدين `ln -sf` في `sites-enabled`، و `nginx -t` قبل `reload` (قضية ٥ للشهادات).
    9. **اختبار قبل ما الـ DNS يتحرك:** `curl -sk --resolve shop.example:443:127.0.0.1 -o /dev/null -w "%{http_code}\n" https://shop.example/` على الجديد نفسه، و `--resolve shop.example:443:10.0.0.9` من بره.
    10. **Cutover:** إيقاف الـ backends على القديم بـ `docker stop` (مش `rm`) عشان مفيش نسختين على نفس الداتا، dump نهائي، مزامنة أخيرة للـ uploads، وبعدين تغيير الـ DNS (قضية ٤).
    11. **التراجع جاهز:** القديم يفضل شغال (النص الـ static) أسبوع، والرجوع = `docker start` على القديم **بعد** إيقاف الجديد (غير كده انقسام في الداتا). وبعد الأسبوع: امسح `.env` والمفاتيح من القديم قبل ما تسلّمه.
  - **تحقق:** عدد collections و documents / عدد الجداول متطابق على الاتنين، `curl` على `/health`، `docker ps` كله Up، `grep -c '" 5[0-9][0-9] ' /var/log/nginx/access.log` بعد الـ cutover = 0.
  - **اللي اتّرفض:** نقل بـ `git clone` + build من الصفر (الكود الحقيقي كان على السيرفر من غير `.git` والـ build بيجيب نسخ تانية)، وتشغيل التطبيقات على الجديد بالـ `.env` الأصلي قبل الـ cutover.

- [ ] **٢. «الكود المحلي قديم والمصدر الحقيقي على السيرفر بس»** (تاب vps أو git). العَرَض: دوّرت على صفحة في الريبو المحلي مالقيتهاش (`grep -rliE "white-friday" .` فاضي، و `git log` قديم) لكن الموقع الحي فيه الصفحة. التشخيص: `git log --oneline -3` و `git status --short` محلي، وبعدين على السيرفر `ls -a | grep -E "^\.git$" || echo no_git_on_server` (فيه `.git` ولا لأ؟)، وبعدين `grep -rliE` على السيرفر. السبب: الإنتاج اتعدّل على السيرفر مباشرة ومفيش git هناك. الحل: ماتعدّلش محلي وتتخيّل؛ خد نسخة احتياطية `mkdir -p /root/bak-DATE && cp -a file1 file2 /root/bak-DATE/`، وبعدين عدّل، ويفضّل ترجّع الكود لـ git. المنع: بعد أي تعديل على السيرفر ارفعه لريبو.

- [ ] **٣. تشغيل نسخة تجريبية من التطبيقات جنب الإنتاج من غير ما تبعت إيميلات ولا تدفع ولا تكرر مهام** (تاب docker أو real، ويوسّع `ports: !` الموجود في `docker/04`؛ `!reset` مفيش).
  - الأوامر: `grep -vE "^\s*#|^\s*$" .env | cut -d= -f1 | tr "\n" " "` (أسماء المتغيرات بس من غير قيم)، `grep -rlE "node-cron|cron\.schedule|setInterval|bull" --include=*.js --include=package.json src --exclude-dir=node_modules` (فيه مهام مجدولة؟)، `sed -E 's/^(EMAIL_HOST|EMAIL_PASS|PAYMENT_KEY)=.*/\1=/' .env > test.env` (تفضّي المفاتيح اللي بتوصل لبره)، وملف override:
    ```yaml
    services:
      db:
        ports: !reset []
      backend:
        ports: !override ["127.0.0.1:5000:5000"]
    ```
    و `docker compose --env-file test.env -f docker-compose.yml -f override.yml config` (يعرض الناتج المدموج من غير تشغيل) وبعدين `up -d --no-build`.
  - فخ: الـ volume معرّف `external: true` فالـ compose ما بيعملوش: لازم `docker volume create mongodb_data` الأول (الرسالة الحقيقية تتولّد في المعمل).
  - فخ: `docker compose up` على الجديد بنفس الـ `.env` = إيميلات وإشعارات وcron مكررة للعملاء.
  - اكتشاف جانبي: التطبيق الحقيقي كان بيشتغل على Supabase السحابي مش على Postgres المحلي، فالـ Postgres المحلي ناقص جداول وبيطلّع أخطاء. الدرس: اتأكد التطبيق بيكلّم أنهي داتابيز فعلاً (`docker exec app sh -c 'echo $DATABASE_URL | sed -E "s#//([^:/@]+):[^@]*@#//\1:***@#"'` يعرض الـ URL من غير الباسورد).

- [ ] **٤. تحويل الـ DNS: إيه اللي تغيّره وإيه اللي تسيبه، وإزاي تتأكد إنه انتشر** (تاب net أو vps؛ `nslookup` و TTL موجودين منفردين لكن مفيش الحالة).
  - الترتيب: خفّض TTL (300) قبلها بيوم. افتح لوحة الـ DNS واكتب: `A @` → الجديد، `CNAME www → @` سيبه (بيتبع الـ `@`)، `A bot/n8n/team` على IP تالت = سيرفر تاني، **سيبهم**، سجلات الإيميل (`brevo._domainkey` و `_dmarc` و TXT) **متلمسهاش**، و**أي `AAAA` (IPv6) يتمسح** وإلا الزوار على IPv6 يفضلوا يروحوا للقديم، ولو دومين ما كانش له `A api` أصلاً ما تضيفش من نفسك.
  - التحقق من كذا resolver: `for ns in 8.8.8.8 1.1.1.1; do nslookup -type=A shop.example $ns; done`. الناتج بيتذبذب بين القديم والجديد أثناء الانتشار (Google عنده كذا cache node)، فاستنى لحد ما كل الـ resolvers تثبت. حلقة مراقبة: `until [ "$(nslookup shop.example 1.1.1.1 | awk '/^Address/&&!/#/{print $2}')" = 10.0.0.9 ]; do sleep 20; done`.
  - فخ: جهازك لسه شايل الـ IP القديم في الكاش المحلي (`ipconfig /flushdns` ويندوز) فـ `curl https://shop.example` من عندك بيروح للقديم وبيطلع `000` على الباقي. الحل للاختبار: `curl --resolve shop.example:443:10.0.0.9 -o /dev/null -w "%{http_code} ip=%{remote_ip} ssl_verify=%{ssl_verify_result}\n" https://shop.example/`.
  - بعد التحويل تتأكد إن زوار حقيقيين وصلوا: `grep -v "127.0.0.1" /var/log/nginx/access.log | awk '{print $9}' | sort | uniq -c | sort -rn`.

- [ ] **٥. حادثة: `certbot renew --dry-run` وقّعت nginx ١٢ دقيقة** (تاب vps، يوسّع `vps/04` اللي فيه `pre_hook = systemctl stop nginx` بس من غير الحادثة).
  - **العَرَض:** بعد تحويل الـ DNS، من بره `curl https://shop.example` = `000`. الأعراض: الـ port 80/443 مقفول من بره ومفتوح محلي؟ لا، nginx نفسه واقف.
  - **التشخيص بالترتيب:** `systemctl is-active nginx` (واقف) ← `ss -tlnp | grep -E ":(80|443) "` (مفيش listener) ← `pgrep -a certbot` (certbot لسه شغال ومعلّق) ← `grep -nE "hook|authenticator|webroot" /etc/letsencrypt/renewal/*.conf` (لقينا `pre_hook = systemctl stop nginx` و `post_hook = systemctl start nginx`) ← `ufw status` (مش الفايروول) ← `nginx -t` ← `systemctl start nginx`.
  - **السبب:** أنا قتلت `certbot renew` وهو شغال بـ `pkill -f "certbot renew"`، فالـ `post_hook` ما اتنفّذش وnginx فضل واقف. وكمان `pkill -f` الأول **قتل أمر الـ ssh نفسه** لأن نص الأمر فيه نفس الباترن (سطر الأمر بتاع الـ shell اللي بينفّذ فيه الكلمة `certbot renew`). الحل: `pgrep -f "[c]ertbot renew"` (الأقواس بتخلي الـ regex مايطابقش نصه) أو `kill <PID>` برقم.
  - **الحل الدائم:** شيل `pre_hook/post_hook` وحط `/etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh` فيه `systemctl reload nginx` (+`chmod +x`)، وغيّر `authenticator = standalone` لـ `webroot` مع `webroot_path = /var/www/html,` و `[[webroot_map]]`.
  - **مشاكل ملحوظة في نفس القضية:** (أ) `dry-run` بيرجع **404** على `.net`: الـ `webroot_map` في `renewal/shop.example.conf` بيشاور على المسار القديم `/var/www/old_app` بينما nginx بيخدم `/.well-known/acme-challenge/` من `/var/www/html`، والتشخيص: اكتب ملف تجريبي `echo ok > /var/www/html/.well-known/acme-challenge/t.txt` وجرّب `curl -si --resolve shop.example:80:127.0.0.1 http://shop.example/.well-known/acme-challenge/t.txt`. (ب) على الدومين التاني مفيش `location /.well-known` أصلاً (الـ server block بيعمل redirect 301 لكل حاجة). (ج) certbot عمل hang على الدومين التاني لدقايق: `tail -n 8 /var/log/letsencrypt/letsencrypt.log` و `ps -o pid,etime,stat,cmd --ppid <PID>` و `curl -s -o /dev/null -w "%{http_code}" https://acme-staging-v02.api.letsencrypt.org/directory`، والحل `kill` برقم وإعادة بـ `certbot renew --dry-run --no-random-sleep-on-renew` (من غير الـ sleep العشوائي الافتراضي).
  - **المنع:** ماتجرّبش `renew --dry-run` بعد الـ cutover على الإنتاج من غير ما تتأكد من الـ hooks، وجرّبه **قبل** تحويل الـ DNS بـ `--resolve`.

- [ ] **٦. تصدير واستيراد Mongo و Postgres جوه containers من ssh (والفخاخ)** (تاب mongo أو docker أو real؛ الأوامر موجودة منفردة بس مفيش الفخاخ دي).
  - Postgres: `ssh old "docker exec db pg_dump -U appuser -d appdb -Fc" > appdb.pgdump` ثم `docker exec -i db pg_restore -U appuser -d appdb --clean --if-exists --no-owner < appdb.pgdump` (الـ `-i` مهم عشان الـ stdin، و`-Fc` custom format).
  - Mongo: `docker exec mongo sh -c 'mongodump -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase admin --archive --gzip' > mongo.archive.gz`.
  - **فخ ١:** الأمر فشل لما اتكتب سطر واحد جوه ssh جوه ssh بسبب `\$` والاقتباسات (shell المحلي بيوسّع المتغير أو بيسيبه فاضي)؛ الحل سكريبت صغير بـ heredoc `<<"EOF"` بيتنسخ وبيتنفّذ، ومتغيرات الـ container بتتوسّع **جوه** الـ container بـ `sh -c '...'` بـ single quotes. الرسالة الحقيقية من `mongo.err` تتولّد في المعمل.
  - **فخ ٢:** `mongorestore --drop` وقف عند collection بسبب صلاحيات لأن الأرشيف فيه database الـ `admin`؛ الحل `--nsInclude="appdb.*"`.
  - **التحقق:** `mongosh --quiet --eval 'let t=0;db.getCollectionNames().forEach(c=>t+=db[c].countDocuments());print(db.getCollectionNames().length+" collections, "+t+" docs")'` على الاتنين = نفس الأرقام. ولـ Postgres: `select count(*) from information_schema.tables where table_schema='public'`.
  - **الصحة:** استنى `healthy` بحلقة: `for i in $(seq 1 25); do s=$(docker inspect -f '{{.State.Health.Status}}' mongo); [ "$s" = healthy ] && break; sleep 4; done`.
  - dump نهائي لازم بعد إيقاف الـ backend على القديم (وإلا بيانات تتكتب بعد الـ dump تضيع).

- [ ] **٧. «الـ ports بتاعة الـ containers مفتوحة للإنترنت» — اكتشاف وإصلاح** (تاب docker أو sec أو vps؛ `DOCKER-USER` و «docker بيتجاوز ufw» مفيش في أي تاب). على القديم: `5433` (Postgres) و `3000` و `5000` و `8000` كانت `0.0.0.0` لأن compose كاتب `"5433:5432"`. `ss -tlnp` يورّي `0.0.0.0:5433`. الحل: `"127.0.0.1:5433:5432"` وnginx هو اللي بيطلع للإنترنت. اختبار من بره: `timeout 6 bash -c 'echo > /dev/tcp/10.0.0.9/5433' && echo open || echo CLOSED`. السبب إن Docker بيضيف قواعد iptables خاصة بيه فـ `ufw deny` مش بتوقفه (تأكد من ده في المعمل قبل الكتابة).

- [ ] **٨. تعديل موقع شغّال على السيرفر بأمان: tag احتياطي → build في الخلفية → تأكد إن الـ image الجديدة فيها التعديل → بدّل → رجوع في ثواني** (تاب real أو docker، يوسّع `real/08` و `tag.*pre-` الموجودين لكن من غير الأسلوب الكامل).
  - `docker tag app:latest app:pre-change-20261027` (نسخة احتياطية بالاسم)، `cd /opt/app && nohup docker compose build frontend > /root/build.log 2>&1 &`، حلقة polling: `pgrep -f "compose build" >/dev/null && echo RUNNING || echo DONE`.
  - **اتأكد إن الـ build الجديد فيه التعديل مش القديم:** `docker run --rm --entrypoint sh app:latest -c 'grep -rl "نص جديد" /usr/share/nginx/html | head -n 2' | wc -l` مقابل نفس الأمر على الـ tag القديم (يرجع 1 و 0)، و `docker inspect -f '{{.Image}}' app | cut -c8-19` (الـ container الشغال لسه على الـ image القديم لحد ما تعمل `docker compose up -d frontend`).
  - التبديل: `docker compose up -d frontend` (توقف أقل من ثانيتين). التراجع: `docker tag app:pre-change-20261027 app:latest && docker compose up -d frontend`.
  - **أسلوب الباتش الآمن:** سكريبت Python بيعمل `assert s.count(old)==1` قبل `s.replace(old, new)`. اتّوقف عندنا لأن النص موجود مرتين (سوق مصر وسوق السعودية) فمالمسش حاجة؛ وبعدين اتعدّل لـ `==2` مع التأكد إن أول ظهور قبل بلوك السعودية، و `replace(old,new,1)`. الدرس: الباتش اللي بيرفض يكتب لو الافتراض غلط أحسن من `sed -i` أعمى.
  - **بعد النشر:** `curl -s https://shop.example/api/.../plans | python -I -c 'import sys,json;...'` يتأكد إن الـ API الحي رجّع القيمة، وفحص بالمتصفح، وعدد الأخطاء 5xx بعد وقت معين: `awk '$4 >= "[07/Oct/2026:09:10" && $9 ~ /^5/' /var/log/nginx/access.log | wc -l`.
  - فخ مرتبط: السكرين شوت بيطلع أبيض أو بيتعلّق على صفحة تقيلة؛ القياس بالـ DOM (`getBoundingClientRect` عرض الليبل مقابل عرض الكارت) دليل بديل.

- [ ] **٩. «SSH بيتقفل قبل الـ banner والموقع شغال» — افصل مشكلة الدخول عن مشكلة الخدمة** (تاب sshc أو diag، جنب `MaxStartups` الموجود في `sshc/02`). العَرَض: `Connection closed` أثناء تسجيل الدخول (النص الحقيقي من الشات ما اتسجلش، يتولّد في المعمل: عادةً `kex_exchange_identification: Connection closed by remote host` أو `Error reading SSH protocol banner`). الترتيب: الأول `curl -s -o /dev/null -w "%{http_code}" https://shop.example/` (الموقع نفسه شغال؟) ← بعدين `for p in 22 80 443; do timeout 6 bash -c "echo > /dev/tcp/10.0.0.9/$p" && echo open || echo CLOSED; done` ← `ssh -vvv`. السبب المرجّح: أداتنا كانت بتفتح اتصال SSH جديد لكل أمر (عشرات الاتصالات في دقايق) فبتتخنق بـ `MaxStartups` أو `fail2ban`؛ الحل: اتصال واحد أو `ControlMaster auto` و `ControlPersist 10m`، واستنى. (هذا افتراض: الشات ما أكدش السبب.)

- [ ] **١٠. أتمتة SSH بالباسورد: ليه سيئة والبديل** (تاب sshc، `sshpass` و `paramiko` مفيش). اللي حصل: الباسوردات اتبعتت في الشات واتشغّل سكريبت `paramiko` بيدخل بالباسورد من متغير بيئة (`SSH_PW`)، وبين السيرفرين استُخدم `sshpass -e` (من `SSHPASS`). الدرس: ليه الباسورد على سطر الأمر بيتسرّب في `ps` و `history`، وليه `-e` أحسن من `-p`، والأصح: `ssh-keygen -t ed25519` و `ssh-copy-id` وبعدين `PasswordAuthentication no` في `/etc/ssh/sshd_config.d/` مع `sshd -t` قبل `reload`، وبدّل الباسورد اللي اتكتب في أي شات. وإزاي تقول للـ AI «أنا هضيف مفتاحك بدل الباسورد».

- [ ] **١١. كشف الأسرار في المخرجات أثناء الجرد** (تاب sec أو bash): `grep -vE "^\s*#|^\s*$" .env | cut -d= -f1` (أسماء بس)، و `sed -E 's/(PASSWORD|SECRET|KEY)([A-Z_]*)(: |=)[^ ]+/\1\2\3***/'` للـ compose، و `sed -E 's#//([^:/@]+):[^@]*@#//\1:***@#'` لـ URLs فيها يوزر وباسورد. الدرس: اكتب الأوامر بحيث الناتج نفسه مايحتويش سر (لأنه هيتسجّل في شات أو لوج).

- [ ] **١٢. ضغط وتسريع nginx على سيرفر شغال** (تاب nginx، `brotli` موجود في ٤ ملفات و `gzip_` في ٣، لكن مفيش التحقق من بره): قبل التعديل `cp default /root/default.bak`، و `nginx -t` **قبل** `systemctl reload nginx`، وبعدين من بره: `curl -sI --http2 -H "Accept-Encoding: br" https://shop.example/ | grep -iE "HTTP/2|content-encoding"`. (أولوية منخفضة: غالباً مغطى.)

---

### تاب `git`

- [ ] **١٣. «Vercel بيعمل Block للنشر» = إيميل الـ commit مش مربوط بحسابك — تشخيص وإصلاح** (تاب git، درس جديد؛ `reset-author` و`refs/original` مفيش، و`filter-branch` مذكور مرة واحدة).
  - **العَرَض:** منصة النشر (Vercel) بتعلّم النشر Blocked بعد push.
  - **التشخيص بالترتيب:** `git config user.name; git config user.email` (محلي) ثم `git config --global user.email` (عام) ← `git log -6 --pretty="%h | %an <%ae> | committer: %cn <%ce>"` (إيميل الـ author والـ committer لكل commit، **الاتنين** مهمين) ← `git log --pretty="%ae" | sort -u` (كام إيميل مختلف في التاريخ؟). لقينا إيميلين: واحد جديد على آخر commits وواحد قديم.
  - **السبب:** إعداد `user.email` اتغيّر (أو ضبط محلي في ريبو وعام في تاني) فالـ commits اتكتبت بإيميل مش مضاف لحساب المنصة.
  - **الإصلاح ١ (آخر commit بس):** `git config user.email "owner@acme-co.example"` ثم `git commit --amend --reset-author --no-edit` (`--reset-author` بيعيد قراءة الـ author من الإعداد الحالي، من غيره الـ amend يسيب الإيميل القديم) ثم `git push --force-with-lease origin feature-x`.
  - **الدمج في main بـ fast-forward من غير merge commit:** `git fetch origin`، `git rev-list --count origin/main..HEAD` (كام commit قدام) و `git rev-list --count HEAD..origin/main` (لازم 0 عشان fast-forward)، وبعدين `git push origin <SHA>:main` (أو `HEAD:main`). مفيش merge commit جديد فالـ tip بيفضل بالإيميل الصح.
  - **الإصلاح ٢ (كل التاريخ):** `FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch -f --env-filter 'if [ "$GIT_AUTHOR_EMAIL" = "old@x.example" ]; then export GIT_AUTHOR_EMAIL="owner@acme-co.example"; export GIT_AUTHOR_NAME="Owner"; fi; [نفس الكلام للـ COMMITTER]' -- feature-x`، وبعدين `git push --force origin feature-x` و `git push --force origin feature-x:main`. **كل الـ hashes بتتغيّر.** تنضيف النسخة الاحتياطية: `git update-ref -d refs/original/refs/heads/feature-x` و `git for-each-ref refs/original`.
  - **بدائل:** `git rebase -r --root --exec 'git commit --amend --reset-author --no-edit'` (بيشتغل لكن بطيء على تاريخ كبير)، و`git filter-repo --mailmap` (الأحدث والموصى بيه بدل filter-branch، لازم يتنصّب منفصل)، و`.mailmap` **لا** يعدّل التاريخ (بس بيغيّر شكل `git log`/`shortlog` محلياً).
  - **اتعلّمنا:** المنصة بتفحص الـ commit اللي في القمة (tip) حسب كلام الشات، لكن ده افتراض ما اتأكدش منه من وثيقة المنصة؛ اكتب «من الوثائق/لازم يتأكد» وماتجزمش. وكمان force push على فرع مشترك خطر: `--force-with-lease` أحسن من `--force`، والتاني كان على ريبو بتاعه لوحده.
  - **التحقق من بره من غير ما تفتح المتصفح:** `gh api repos/acme-co/shop/commits --jq '.[0:5][] | "\(.sha[0:7]) | \(.commit.author.email) | \(.commit.message | split("\n")[0])"'` و `gh api "repos/acme-co/shop/commits?sha=main&per_page=10" --jq '.[].commit.author.email' | sort -u` (لازم سطر واحد)، و `gh api repos/acme-co/shop/branches/main --jq '.commit.sha[0:7]'`. فخ حقيقي حصل: الـ `--jq` الأولاني فشل لأن `.[][]` على مصفوفة غلط (الرسالة الحقيقية تتولّد: `jq: error ... Cannot index object with ...`)، فاستُبدل بـ `.[]` على `?per_page`.
  - **المنع:** `git config --global user.email` مرة واحدة صح، وفي كل ريبو `git config user.email` تتأكد، و`git log -1 --pretty='%ae'` قبل أول push، و`git config user.useConfigOnly true` يجبرك تحدد الهوية لكل ريبو.

- [ ] **١٤. «أنا ورا ولا قدام الـ remote؟» قبل ما ترفع** (تاب git، يكمّل بند «إيه اللي نزل في الـ pull» المتأجل في PLAN): `git status -sb`، `git fetch origin`، `git rev-list --left-right --count origin/feature-x...HEAD` (رقمين: **المتأخر ⟵ | ⟶ المتقدم**؛ `0 0` = متزامن)، `git log origin/feature-x..HEAD --oneline` (اللي لسه ماترفعش). فخ: لو الفرع من غير upstream: `git log origin/x..HEAD 2>/dev/null || echo "no upstream tracking"`.

- [ ] **١٥. أول ريبو على GitHub من مشروع محلي من غير `gh` متسجّل** (تاب git أو tools؛ `gh auth login` و`git init -b` موجودين لكن مفيش الحالة الكاملة ولا `cmdkey`).
  - الترتيب: `git status` (مش ريبو أصلاً) ← `git init -b main` ← **ضبط الهوية قبل أول commit** `git config user.name/user.email` (أو one-off: `git -c user.name="Owner" -c user.email="owner@acme-co.example" commit -m ...`) ← `git add .` وبعدين **فحص قبل الـ commit**: `git diff --cached --name-only | grep -c "^node_modules"` و `grep -c "^\.next"` و `grep -c "^\.claude/"` و `git diff --cached --name-only | wc -l` (لازم أصفار) ← لو ظهر شيء: ضيفه لـ `.gitignore` و `git rm -r --cached <path>` ← commit ← `git remote add origin https://github.com/acme-co/shop.git` ← `git branch -M main` ← `git push -u origin main`.
  - إنشاء الريبو بدون `gh`: على github.com/new **سيب README و .gitignore و license فاضيين** (وإلا أول push يترفض لأن التاريخين مش مرتبطين).
  - **`gh` بعد `winget install --id GitHub.cli --scope user`:** الأمر بيشتغل لكن `gh` مش لاقيه في نفس الـ session لأن الـ PATH ما اتحدّثش؛ الأوامر: `where gh`، `$env:Path += ";$env:LOCALAPPDATA\Microsoft\WinGet\Links"`، أو `Get-ChildItem "$env:LOCALAPPDATA\Microsoft\WinGet\Packages" -Filter gh.exe -Recurse`، وبعدين `gh auth login` (GitHub.com ← HTTPS ← Login with a web browser). الحل الأنضف: افتح terminal جديد.
  - **هل الـ git متسجّل أصلاً؟** `git config --global credential.helper` (على ويندوز `manager`)، و`cmdkey /list | findstr /i github` (بيوري إن في credential محفوظ في Windows Credential Manager، من غير ما يعرض الباسورد). `cmdkey` مفيش في أي تاب.
  - **اسم المستخدم case في الـ URL:** `https://github.com/acme-co/...` بحروف صغيرة اشتغل بإعادة توجيه، والصح اللي GitHub بيظهره (`Acme-Co`)؛ التصحيح: `git remote set-url origin https://github.com/Acme-Co/shop.git` ثم `git remote -v` و `git branch -vv` (الـ tracking). (رسالة الـ redirect الحقيقية تتولّد في المعمل.)

- [ ] **١٦. تراجع عن شغل اتعمل في المشروع الغلط** (تاب git + node): اتثبّتت حزم `npm install three ...` في المشروع الغلط، فـ `npm uninstall three @react-three/fiber @react-three/drei @types/three`، و `git -C <proj> status --short` يتأكد إن `package.json` و`package-lock.json` رجعوا، و`git checkout -- components/navbar.tsx messages/ar.json` للملفات المتتبّعة، و`rm -rf` للمجلدات الجديدة غير المتتبّعة (قبلها `git clean -nd` تعرض بس). الدرس: `git -C <path>` بيشتغل من أي مكان من غير `cd`، و`git status` قبل التراجع دايماً.

---

### تاب `next` / `web` / `react`

- [ ] **١٧. «غيّرت الثيم/الـ CSS ومفيش حاجة اتغيّرت في المتصفح» — dev server قديم ولا كاش `.next`؟** (تاب next، جنب `proxy.ts`؛ `rm -rf .next` مفيش، `taskkill` موجود في ٦ ملفات بدون الحالة).
  - **العَرَض:** اللون لسه أزرق بعد ما غيّرت الـ tokens، حتى بعد hard reload.
  - **التشخيص:** `npm run dev` طلع «Port 3000 in use, trying 3001»، يعني **أنت شايف السيرفر القديم** (على 3001 الجديد ماحدش فاتحه). `curl -s http://localhost:3001/ar | grep -oE '/_next/static/chunks/[^"]+\.css' | head -1` ثم `curl -s "http://localhost:3001$CSS_URL" | grep -oE "(6366f1|f97316)" | sort -u` (الألوان القديمة لسه في الـ CSS الـ built؟).
  - **الحل:** اقتل القديم: Git Bash `taskkill //PID 21680 //F` (الشرطتين المضاعفتين عشان Git Bash ما يحوّلش `/PID`)، أو `pkill -f "next dev"`، وبعدين `rm -rf .next` وإعادة `npm run dev`. الرقم بيتجاب بـ `netstat -ano | findstr :3001`.
  - **ملحوظة:** الأمر `npm run dev` في background بيخرج `exit code 4` أحياناً لما البورت مشغول أو ملف `.next` مقفول (الشات: «Restart dev server clean failed with exit code 4»)؛ سبب الكود 4 ما اتأكدش، يتحقق في المعمل.

- [ ] **١٨. «اتأكد إن التعديل وصل للـ build من غير متصفح» بـ curl + grep** (تاب web أو bash): `npm run dev > /tmp/dev.log 2>&1 &`، ثم انتظر الجاهزية: `until grep -qE "Ready in|Error|Failed to compile" /tmp/dev.log; do sleep 1; done`، ثم `curl -s -o /dev/null -w "HTTP: %{http_code}\nTIME: %{time_total}s\nSIZE: %{size_download}\n" http://localhost:3000/ar`، `curl -s http://localhost:3000/en | grep -oE "(We build|Services)" | sort -u`، و `curl -s -o /dev/null -w "ROOT: %{http_code} -> %{redirect_url}\n" http://localhost:3000/` (الـ `/` يحوّل لـ `/ar`)، و`curl -sL` تتبّع التحويلات، و`tail -50 /tmp/dev.log` و`grep -iE "error|⨯" /tmp/dev.log | tail -5` لما الصفحة ترجع 500.

- [ ] **١٩. فخ: ترقية major في مكتبة أيقونات شالت الأيقونات** (تاب react أو node). العَرَض: صفحة بترجع 500 والـ log فيه خطأ import لأيقونة براند (Github) مش موجودة (النص الحقيقي يتولّد في المعمل بنفس الإصدار). التشخيص: `npm view lucide-react versions --json | tail -20`، `cat node_modules/lucide-react/package.json | head`، `grep -iE "github" node_modules/lucide-react/dist/lucide-react.d.ts | head -5`، `ls node_modules/lucide-react/dist/icons | wc -l`. السبب: الإصدار 1.x شال أيقونات البراندات. الحل: `npm install lucide-react@0.577.0` (تثبيت دقيق)، والبديل: SVG محلي للبراند. المنع: `npm install --save-exact`، وقراءة الـ changelog قبل ترقية major، و `npm outdated`.

- [ ] **٢٠. Tailwind v4: `@utility` جوه `@supports` بيكسر الـ CSS** (تاب css): `curl` رجّع 500 بعد تعديل الـ `globals.css`؛ `tail -50 dev.log` بيوري الخطأ؛ السبب إن `@utility` لازم يبقى top-level؛ الحل: حط `@supports` جوه تعريف الـ utility مش العكس. (النص الحقيقي يتولّد في المعمل بـ Tailwind v4.)

- [ ] **٢١. Hydration mismatch من إضافات المتصفح** (تاب next، موجود في `next/17` لكن راجع إنه يشمل): الرسالة «A tree hydrated but some attributes of the server rendered HTML didn't match…» على `<html>`. التشخيص: افتح في Incognito (الإضافات مقفولة) فتختفي. الحل: `suppressHydrationWarning` على `<html>` و`<body>` **بس**، لأنه بيمسك مستوى واحد ومش بيدخل الأبناء، ومتحطوش على كمبوننت فيه `Date.now()` أو `Math.random()` لأنك هتخبّي bug حقيقي. (مغطّى جزئياً.)

- [ ] **٢٢. «الـ screenshot مش واضح/صور ناقصة» وتطلع الحكاية فيديو خارجي مؤقت** (تاب web، حالة): المعاينة بعرض 591px فبتطلع بتخطيط الموبايل (`resize` لـ 1440 قبل اللقطة)، وبعدين في network: `net::ERR_ABORTED` على فيديو الـ hero من CloudFront (طلب مجزّأ 206 بيتلغى). التشخيص: `curl -sI --max-time 20 "<url>" | head -20` (200 ولا 206، `content-length`، `content-type`)، و `readyState` للـ `<video>` من الكونسول (4 = جاهز). السبب: رابط مولّد بالـ AI ممكن ينتهي. الحل: `curl -s --max-time 120 -o public/hero.mp4 "<url>"` وربطه `/hero.mp4`، وملاحظة إن `ERR_ABORTED` على نسخة الـ crossfade الثانية طبيعي (نفس الملف بيتلغي طلبه) ومش علامة فشل. القاعدة: ماتعتمدش على URL خارجي مؤقت لأصل أساسي (وقدّر الحجم: 16MB × 2 كان بيتحمّل مرتين). ومن ناحية git: ملف 16MB في الريبو، فكّر في Git LFS أو CDN.

- [ ] **٢٣. قراءة docs النسخة المثبّتة محلياً بدل الذاكرة** (تاب next): Next 16 فيه `node_modules/next/dist/docs/01-app/...` و`AGENTS.md`. `ls node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/ | grep -iE "proxy|middleware"` و `head -60 .../proxy.md` وكده عرفنا إن `middleware.ts` اتسمّى `proxy.ts` (`mv middleware.ts proxy.ts`). الدرس: لما الإصدار جديد، docs المثبّتة هي المصدر. (مغطّى جزئياً في `next/09`.)

- [ ] **٢٤. (أولوية منخفضة، تاب css) كلمة بتتبدّل جوه عنوان من غير ما تخرّب السطر:** `GooeyText` (فلتر SVG `feColorMatrix`) بيعمل «blob» والكلمتين يتراكبوا داخل جملة. الحل `inline-grid` وكل الكلمات في نفس الخلية (`grid-area: 1/1`) فالعرض بيتحدد بأطولها، مع `aria-live="polite"`. وللعربي: `tracking-tight` بيبوّظ الوصل فتتشال، ونص الـ scramble للحروف اللاتينية بس.

---

### ملخص

العدد: vps ١٢ (٢ منهم أولوية منخفضة)، git ٤، next/web/react/css ٨ (إجمالي ٢٤).
الأنسب يتبني كـ «قضايا كاملة» في `vps` (١، ٥، ٤)، و `git` (١٣). الباقي تفاصيل تتحط جوه دروس موجودة.

## ب. خمس شاتات صغيرة (مشاريع ويب و PHP و Python و Postgres)
ملاحظات المراجعة:
- مشروع تاني متغطي بالكامل في PLAN.md (بنود «خدمة systemd واقعة» و«بسجّل ومش بيسجّل»)، فمفيش منه حاجة جديدة غير التفصيلتين دول (بند 12 و 13 تحت).
- مشروع تاني: بنود «ZIP لريبو» و«M فاضي» و«إيه اللي نزل» و«نسخ الملفات» و«?v=» متسجلة أصلاً. `node --check` و `python -m http.server` و `taskkill` و `ssh -o BatchMode` و `safe.directory` و `docker inspect ... working_dir` و `Resource is still in use` و `ON CONFLICT` و `&&` في PS 5.1 متغطيين في الموقع.
- كل الأسامي هنا مخترعة: `shop.example` و `deployer` و `10.0.0.5` و `203.0.113.7` (من نطاقات التوثيق). مفيش أي باسورد أو توكن.

### تاب git

1. **ارفع على السيرفر من نسخة قديمة = كسرت الإنتاج (ونسيت إن الكود المنسوخ مش هو الشغّال)** (الأهم؛ يتربط بدرس `git fetch` وبـ«خدمة systemd واقعة» في تاب diag)
   - الحالة: ملف `tools.py` اتنسخ بـ `scp` من الجهاز فوق نسخة السيرفر، والجهاز كان ورا الريبو بـ ٢٠+ commit. بعد `docker compose up -d --build --force-recreate brain` الاختبارات على السيرفر: ٢٢ فشل من ٦٢٩.
   - الخطأ الحقيقي: `AttributeError: module 'app.tools' has no attribute 'HANDOFFS'` (متكرر في كل الفاشلين، من `app/pipeline.py:607`).
   - التشخيص بالترتيب:
     1. الفشل كله نفس النوع؟ `make test-server 2>&1 | grep -E "^E  " | sort | uniq -c | sort -rn` (سطر واحد متكرر = سبب واحد، مش ٢٢ مشكلة).
     2. الرمز المفقود (`HANDOFFS`) بيتنادى من ملف مش اللي انا عدلته (`pipeline.py`) = ملفي أقدم من حاجة على السيرفر.
     3. ملفات اختبار على السيرفر مش عندي محليًا = نفس الإشارة.
     4. `git fetch origin && git log --oneline HEAD..origin/main` طلّع ٢٠ commit.
   - الحل: `git diff > $TEMP/my.patch`، و `cp` للملف المعدّل جنب، و `git checkout -- <ملفاتي>`، و `git merge --ff-only origin/main`، وإعادة التعديل فوق الجديد، واختبار محلي (`python -m pytest tests/x.py -q`)، وبعدين `scp` و rebuild و `make test-server | tail -4`.
   - مرفوض: ترقيع `HANDOFFS` بإيدي (بخمّن كود الآخرين).
   - الأهم في الدرس: **الملف المنسوخ مش هو الشغّال لحد ما تبني الحاجز تاني** (`--build --force-recreate`) والعكس: أول rebuild هو اللي كشف الغلطة، فالإنتاج كان بايظ من لحظتها.
   - تأكيد: `docker compose ps brain --format '{{.Status}}'` + `docker compose exec -T brain grep -c <رمز> app/<ملف>.py` + الاختبارات.
   - منع التكرار: النشر عن طريق git (push ثم pull على السيرفر) مش `scp`؛ قبل أي `scp`: `git fetch` و `git log HEAD..origin/main` لازم يكون فاضي، و `ssh host cat path | diff - local_file`.
   - معمل: فولدرين `server/` و `laptop/` من نفس الريبو، وسيرفر بيعدّي commit زيادة.

2. **اعمل commit لملفاتك بس لما الشجرة فيها حاجات مش بتاعتك** (يكمّل درس `git add`)
   - المثال: `.env` متعدّل و `notes.md` جديد و screenshot في الجذر، والمطلوب commit لـ ٨ ملفات.
   - `git status --short -uall` (يطلّع الملفات الجديدة جوه فولدرات)، و `git add <ملف>...` بالاسم، أو `git add -A -- . ':!shot.png'` (pathspec استبعاد)، و `git commit -F - <<'EOF' ... EOF` (رسالة متعددة السطور من غير escape)، و `git diff --cached --stat` قبل الـ commit، و `git status --short` بعدها (الباقي لسه ظاهر).
   - فخ: `git add -A` من الجذر بياخد `.env`. و `-c safe.directory=...` على مجلد على ديسك تاني (متغطي في git/03، اربطه).

### تاب sshc (أو start)

3. **أنا على أنهي جهاز؟ لزق أمر معاه سطر الـ prompt القديم** (يكمّل درس «الـ prompt» في start/02)
   - ٣ أخطاء حقيقية متتالية من نفس الغلطة:
     - `cd: /home/deployer/domains/shop.example/public_html: No such file or directory` (الأمر اتشغّل على سيرفر تاني).
     - `-bash: -bash:: command not found` (لزق ناتج الخطأ القديم كأنه أمر).
     - `-bash: deployer@vps1:~/app: No such file or directory` (لزق `user@host:~/app$php ...` كله، فالـ shell قرأ `user@host:~/app` كاسم مسار).
   - العلاج بالترتيب: اقرا الـ prompt (`user@host:path$`) قبل Enter، و `hostname; whoami; pwd` تقول لك انت فين، و`Ctrl+C` يمسح السطر الحالي، و`Ctrl+U` يمسح من المؤشر لأول السطر، ولزّق الأمر لوحده من غير ما تنسخ الـ prompt.
   - حالة قريبة: سطر إعداد JSON (`"Bash(ssh ...)",`) اتلزق في ترمنال السيرفر بدل ملف الإعدادات المحلي، والنتيجة نفس `No such file or directory` — الأوامر ملهاش علاقة بإعدادات الأداة.
   - وحالة تانية: أمر فيه `&&` اتلزق في **Windows PowerShell 5.1** على الجهاز بدل السيرفر. الخطأ: `The token '&&' is not a valid statement separator in this version.` (اتغطى `&&` في ps/21؛ الجديد هو إن سببه «الأمر كان للسيرفر»، فالـ prompt `PS C:\Users\you>` هو الدليل).
   - معمل: `bash -c` بنفس النصوص تتكرر الأخطاء بالنص الحقيقي.

4. **كونسول الـ VPS على موقع الاستضافة بيسأل `login:`، مش مكان تكتب فيه `ssh`** (يكمّل vps/10)
   - الأعراض: كتب `ssh user@10.0.0.5` في خانة `login:` فرفض. الكونسول بيدخلك على السيرفر نفسه (زي شاشة وكيبورد)، فبيطلب اسم يوزر بس ثم باسورد.
   - الترتيب: اكتب `user` فقط، ثم الباسورد (مش بيظهر وانت بتكتب). لكن لو الدخول عندك بالمفتاح مفيش باسورد → اعمل `ssh user@host` من ترمنال جهازك. الكونسول يفيد لما SSH نفسه واقع (فاير وول، مفتاح اتغير).
   - **أمان:** الباسورد اللي اتكتب في شات أو متخزن نصي (مثلاً `sshpass -p '...'` جوه ملف إعدادات أداة) لازم يتغيّر وتتحوّل لمفتاح: `ssh-keygen -t ed25519`، ونسخ `.pub` لـ `~/.ssh/authorized_keys`، و`ssh -i <key> -o BatchMode=yes`. `sshpass` مش مذكور في الموقع خالص (وفي الدرس يتقال إنه أسوأ من المفتاح وليه، ويتجرّب `grep -rn "sshpass" ~/.config` كطريقة تدوّر بيها على التسريب).

### تاب real (أو gha / vps)

5. **«ارفع وشوفه في البرودكشن»: مفيش نشر تلقائي، إزاي تتأكد وإزاي ترفع وتتحقق** (يكمّل gha/02 و real/04)
   - التسلسل: `git fetch origin; git status -sb; git log --format='%h %an %s' -3` (انا push فعلاً؟)، `ls .github/workflows` (مفيش CI deploy)، `gh api repos/<owner>/<repo>/hooks --jq '.[] | {url: .config.url, events: .events, active: .active}'` (مفيش webhook = ولا نشر تلقائي)، `curl -s -m 15 -o /dev/null -w "live /new-page: %{http_code}\n" "https://shop.example/new-page?nocache=$RANDOM"` (الـ 404 = لسه مش منشور؛ `?nocache=$RANDOM` يتخطى الكاش).
   - النشر: `ssh -p 65002 u123@203.0.113.7` ثم `cd ~/domains/shop.example/public_html && git pull origin main && php -l index.php && php -l new-page.php`. الـ `Fast-forward` + `|` stat معناهم كذا، و`php -l` بيتأكد إن مفيش syntax error قبل ما الزوار يفتحوا.
   - بعد النشر: حلقة `for u in / /contact /nope-404; do curl -s -o /dev/null -w "$u %{http_code} %{time_total}s\n" ...; done` وفخ: ظهور `403` مرة واحدة وسط ٦٠ طلب = حماية الاستضافة من الطلبات السريعة (مش عطل، ميتتأكدش إلا بإعادة).
   - تحقق إن ملفات الصيانة مقفولة على الزوار: `curl -w "%{http_code}"` على `/scripts/admin/migrate...php` و `/assets/php/lib.php` = 403.

6. **جرّب وتأكد من التعديل على الموقع الحي بدل ما تقول «اتغيّر»: قيمة في الداتابيز vs قيمة في الكود** (يكمّل درس `grep -rn` و `sed -i`)
   - الحالة: رقم تواصل اتغيّر. في الـ DB (جدول إعدادات) بيظهر فورًا بدون نشر، لكن في الكود فيه **نسخ احتياطية** (fallback) و JSON-LD و زرار واتساب برقم تجريبي، دي محتاجة نشر.
   - الأوامر: `grep -rn "old-number-variants" app components lib` (كل الصيغ: `+20 101 ...` و`+2010...` و`wa.me/...`)، `sed -i "s/old/new/g" f1 f2` (لكل صيغة بسطر)، و`git diff --stat` (عدد الأسطر منطقي؟)، و`grep -rn` تاني فاضي، وأخيرًا على الموقع الحي: `for p in / /contact /about; do curl -s https://shop.example$p | grep -oE 'new|old' | sort | uniq -c; done`.
   - الفخاخ: رقم **تاني لغرض تاني** (دفع) ما يتغيّرش بنفس الـ sed؛ رقم placeholder وهمي في زرار («وده معناه إن الزرار مش بيوصّل لحد»)؛ ملفات `.md` ومجلد شخص تاني تتسيب.

### تاب php

7. **شغّل PHP على ويندوز من غير تسطيب (لو الجهاز مفيهوش) واختبر الصفحات بـ router ومحاكاة قاعدة بيانات** (يكمّل php/01 و php/03 اللي فيهم `php -S`)
   - تنزيل zip في فولدر مؤقت (مش تسطيب)، `php -v`، و`php -l file.php` لكل ملف اتغيّر (`for f in $(git diff --name-only | grep '\.php$'); do php -l "$f"; done`).
   - `php -d extension_dir="$S/ext" -d extension=mbstring -d extension=curl -d extension=openssl -d curl.cainfo="$S/cacert.pem" -S 127.0.0.1:8765 -t <root> router.php` — `-d` بتفعّل extension من غير ini، و`router.php` بيخلي الـ URLs النضيفة (`/trial` من غير `.php`) تشتغل زي `.htaccess`، و`-d auto_prepend_file=mock.php` بيحقن DB وهمية قبل كل صفحة.
   - الفخ: `curl.cainfo` من غيرها: طلبات الـ HTTPS من جوه PHP بتفشل.
   - اقفل السيرفر على Windows من Git Bash: `PID=$(netstat -ano | grep "127.0.0.1:8765" | grep LISTEN | awk '{print $5}' | head -1); taskkill //PID $PID //F`. **فخ:** لازم `//` مزدوجة لأن Git Bash بيحوّل `/PID` لمسار؛ بـ `/PID` الأمر بيفشل بـ `ERROR: Invalid argument/option`. (مش مذكورة في الموقع: `//PID`.)
   - تحقق: `curl -s -m 20 -o out.html -w "[%{http_code}] %{time_total}s\n" -D hdr.txt "http://127.0.0.1:8765/"` + `tail php-errors.log`.

8. **سكربت ترقية قاعدة بيانات بيتشغّل مرتين من غير ضرر، ومن الـ CLI بدون تسجيل دخول** (يكمّل data/13 و php)
   - الحالة: ملف `migrate-2026-09.php` ورا auth أدمن؛ فتحه من متصفح مش داخل أدمن بيرفض (مقصود: ده مش عطل). من السيرفر `php scripts/admin/migrate-...php` بيشتغل مباشرة وبيطبع `OK ...` لكل جملة ثم `done` (١٤ سطر).
   - الجمل اللي تتكرر بأمان: `CREATE TABLE IF NOT EXISTS`، و`ALTER TABLE t ADD COLUMN IF NOT EXISTS c TINYINT(1) NOT NULL DEFAULT 0` (MariaDB)، و`INSERT INTO settings (...) SELECT 'k','v' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM settings WHERE key_name='k')`.
   - الترتيب: الكود الجديد ينتشر **الأول** وهو يشتغل بالقيم الافتراضية لحد ما الترقية تتنفذ (الصفحة بترجع 404 ومخفية)، وبعدين الترقية، وبعدين التفعيل من الداشبورد. أي سطر `FAIL` يتبعت زي ما هو.
   - تحقق: تشغيلها مرتين = نفس الناتج و`SELECT COUNT(*)` ثابت.

### تاب web (أو nginx / apis)

9. **السعر والعملة واللهجة حسب بلد الزائر (geo)** (يكمّل nginx/02 geo و apis/14)
   - طبقات الكشف بالترتيب: (١) هيدر من الـ CDN/السيرفر (`HTTP_CF_IPCOUNTRY` و`GEOIP_COUNTRY_CODE`)، (٢) أول IP من `X-Forwarded-For` + استعلام خارجي واحد بـ timeout قصير (١٫٨ ثانية) ومتسجل في cookie ٣٠ يوم عشان ميتكررش، (٣) المنطقة الزمنية للمتصفح كاحتياط (فخ: `Asia/Riyadh` بتشمل جيران)، (٤) `?region=sa` بيغلب كله (للتجربة وزرار تبديل).
   - الاختبار من غير سفر: `curl -s -A "$UA" -H "X-Forwarded-For: 203.0.113.7" -D hdr.txt -o out.html -w "[%{http_code}]\n" URL`، و`-H "CF-IPCountry: SA"`، و`-b "region=sa"`، وبعدين `grep -i "set-cookie: region" hdr.txt` و`grep -o 'class="price">.\{0,60\}' out.html`.
   - فخاخ: لازم تقفل الكاش العام للصفحات اللي بتتغيّر حسب البلد (`Cache-Control` / `Vary: Cookie`)، وإلا زائر يشوف سعر زائر تاني؛ الـ bots (Googlebot) متتحوّلش حسب البلد؛ الـ IP بيروح لخدمة خارجية = خصوصية ومحتاج إشارة في السياسة؛ أي نص مترجم بلهجة محتاج مراجعة ابن البلد. لازم يتنفذ بأسامي مخترعة ونطاقات IP للتوثيق (`203.0.113.0/24`).

10. **اختبار responsive بمصفوفة مقاسات، والمقاسات اللي بتتكسر فعلاً** (يكمّل درس media queries في css)
    - المقاسات: ٣٢٠ و٣٦٠ و٧٦١–١٠٢٤ (تابلت) و١١٠٠ و١٩٢٠، عربي (RTL) وإنجليزي. عن طريق Chromium headless/playwright.
    - اللي اتكسر: (أ) لوجو بيتضغط في تابلت بالإنجليزي → `flex:none` على اللوجو. (ب) النافبار الكامل بيطلّع زرار اللغة و«اشترك» برا الشاشة بين ٧٦١–١٠٠٠ بالعربي → تحويل لزرار القائمة من ١١٠٠ نازل. (ج) زرار القائمة بيخرج برا عند ٣٢٠ → `@media (max-width:359px)` بـ padding وأحجام أصغر. (د) هدف لمس صغير.
    - تحقق: مفيش scroll أفقي (`document.documentElement.scrollWidth <= innerWidth`).
    - الصراحة: Chromium مش Safari/آيفون؛ الفيديو والـ safe-area لازم جهاز حقيقي.

### تاب pg (أو docker)

11. **غيّر إعداد محفوظ في الداتابيز من على السيرفر بـ psql جوه compose، من غير تخمين اسم اليوزر** (يكمّل pg و docker/03)
    - الأمر المخمّن: `docker compose exec postgres psql -U assistant -d appdb -c "INSERT INTO settings (key,value) VALUES ('daily_cap','500') ON CONFLICT (key) DO UPDATE SET value='500';"`.
    - الخطأ الحقيقي: `psql: error: connection to server on socket "/var/run/postgresql/.s.PGSQL.5432" failed: FATAL:  role "assistant" does not exist`.
    - التشخيص: اليوزر مش اللي خمّنته → اقراه من الـ `.env` اللي بيشغّل الحاوية: `grep -E 'POSTGRES_(USER|DB)' .env | sed 's/PASSWORD=.*/PASSWORD=***/'` (إخفاء السر)، والأمر الجاهز `docker compose exec -T postgres psql -U "$(grep -E '^POSTGRES_USER=' .env | cut -d= -f2)" -d appdb -c "..."`، و`-T` عشان مفيش TTY (للسكربتات والـ ssh one-liners).
    - الناتج السليم: `INSERT 0 1`. التأكيد: `SELECT key, value FROM settings WHERE key='daily_cap';`.
    - الفكرة: الإعداد في الـ DB بيتغيّر من غير نشر ولا restart لو التطبيق بيقراه في بداية كل دورة؛ ولو في دورة شغالة هتكمل بالقديم.
    - **فخ مرتبط (الحد نفسه):** رفع الحد ٣ أضعاف من غير ما تفهم ليه كان محدود = خطر؛ ارفعه على مراحل وراقب.

12. **تكرار الرسالة لنفس العميل: منع التكرار كان جوه نفس الدورة بس** (يكمّل درس idempotency في api/13 و arch)
    - العرض: عميل جاله متابعتين في نفس اليوم بنص مختلف (دورتين: مؤجلة وأسبوعية).
    - التشخيص: نفس العميل في دورتين = الـ dedupe بيبص على `sent in this run` مش على جدول الإرسال. الحل: بص على الجدول نفسه: `WHERE NOT EXISTS (SELECT 1 FROM followups f WHERE f.client_id = c.id AND f.sent_at > now() - make_interval(days => $gap))` والـ gap إعداد (`min_gap_days` = 6).
    - مرفوض: lock في الذاكرة (بيضيع مع restart)، وتقليل الدورات.
    - تأكيد: اختبار بدورتين متتاليتين = رسالة واحدة. الدرس: مفتاح الـ dedupe لازم يعيش أطول من العملية اللي بتبعت.

### تاب python (أو git)

13. **عدّل ملفات بسكربت Python من غير ما تبوّظ CRLF** (يكمّل الدرس المتأجل «M فاضي»)
    - الغلطة الحقيقية: سكربت استبدال `s.replace(old,new)` مع `assert s.count(old)==1` فشل لأن `old` فيه `\n` والملف CRLF. محاولة تانية بتحويل `\n`→`\r\n` اتكسرت في الـ shell heredoc (الـ `\r` اتأكلت).
    - الصح: اقرا بـ `io.open(p, encoding='utf-8', newline='')` (من غير تحويل)، واعرف النوع: `b.count(b'\r\n')` مقابل `b.count(b'\n')-crlf`، وابني `CR = chr(13); LF = chr(10)` جوه السكربت بدل escape، واكتب بـ `newline=''` برضه، واعمل `assert s.count(old)==1` (يفشل لو الكود اتغيّر).
    - تحقق: `git diff --stat` (عدد الأسطر المتغيّرة منطقي؟ لو الملف كله اتغيّر يبقى نهايات الأسطر اتخلطت)، و`git diff --ignore-cr-at-eol --stat`.
    - الفخ: LF جوه ملف CRLF يظهر مخلوط في الـ diff؛ و`.gitattributes` بيحدد الأصل.

### تفاصيل صغيرة لبنود متغطية (تتضاف كفقرة، مش درس)

14. (تاب diag، بند «خدمة systemd واقعة» المتأجل) تجارب الدخول وانت بتصلّح: بعت login بباسورد حقيقي فاتسجّل نصه في `pm2 logs` — جرّب بإيميل وهمي (`nobody-test@example.invalid`) وباسورد غلط، وحط `sed -E 's/"session":"[^"]*"/"session":"<hidden>"/g'` على الناتج. وإن `pm2 list` بيوزر تاني (مثلاً اللي دخلت بيه) بيشغّل daemon فاضي بدون ما تقصد → `pm2 kill` بعدها.
15. (تاب docker) `docker compose down && build --no-cache && up -d` = الموقع واقع طول البناء. التحذير `WARN ... variable is not set. Defaulting to a blank string.` معناه إن الـ `.env` ناقص متغير (قبل التعديل مش بعده)، والـ build-arg `NEXT_PUBLIC_*` بيتحط وقت الـ build مش وقت التشغيل.

## ج. شات أداة VPN لويندوز (Xray + wintun)
كل الأسامي هنا مخترعة: كارت `vpnlab0`، سيرفر `203.0.113.9` / `vpn.example`، شبكة `192.168.1.0/24`، هوت سبوت `LabHotspot`، يوزر `deployer`. تاب `net` عنده أصلاً الأساس (`routing` فيه `0.0.0.0/1` و `/32` للسيرفر، `tun`، `leak_protection`، `kill_switch`، `ipv6`، `mtu`)، فالبنود دي «حالات تشخيص» ومهارات ناقصة، مش مفاهيم من الصفر.


ملحوظة: أي نص خطأ تحت علامته «حقيقي» ظهر في الشات؛ اللي مكتوب «يتجرّب» لازم يتشغّل في المعمل قبل ما يتكتب.

### تاب net

- [ ] **حلقة التضخيم: الحزمة اللي بترجع للكارت (TUN routing loop)** (يمتد من `tun` و `routing`): العَرَض: الأداة شغالة والـ routes صح، والنت بطيء أو بيقف، و Xray على 400% CPU وبعدها 1.2 GB رام، و15 ألف UDP socket. التشخيص بالترتيب: (١) `route print -4 | findstr "128.0.0.0 203.0.113.9"` الـ routes سليمة؟ (٢) عدّاد الكارت قبل وبعد 3 ثواني: `$a=Get-NetAdapterStatistics -Name vpnlab0; Start-Sleep 3; $b=Get-NetAdapterStatistics -Name vpnlab0` وتطرح `SentUnicastPackets`/`ReceivedUnicastPackets`/`SentBytes` وتقسم على 3 (الرقم الحقيقي: حوالي 120,000 حزمة/ثانية خارجة وحزمة واحدة راجعة، وتنزيل فعلي 100 KB/s، يعني تضخيم مش ترافيك). (٣) مين فاتح السوكتات: `Get-NetUDPEndpoint | Group-Object OwningProcess | Sort-Object Count -Descending | Select -First 3` وبعدها `Get-CimInstance Win32_Process -Filter "ProcessId=<pid>"` عشان `CommandLine`. (٤) لوج الـ proxy فيه `accepted udp:224.0.0.251:5353 [tun-in -> direct]` و `udp:10.255.0.255:137` و `udp:239.255.255.250:1900`. السبب: قاعدة بتبعت الوجهات «الخاصة» (multicast، broadcast الكارت، subnet الكارت نفسه) لـ `direct`، والنظام بيرجّعها لنفس الكارت، فتدخل تاني وتتبعت `direct` تاني. الحل: أول قاعدة توجيه **block** لأي وجهة طريقها بيرجع للنفق (`10.255.0.0/24`، `224.0.0.0/4`، `255.255.255.255`، `fe80::/10`، `ff00::/8`)، والشبكة المحلية `192.168.x` تفضل direct لأنها بتخرج من الكارت الحقيقي. بعد الإصلاح: 8 حزمة/ثانية، CPU 5%، رام 56 MB، 59 UDP socket. بدايل اترفضت: سقف رام (بيخنق ومبيعالجش السبب، انظر بند diag «GOMEMLIMIT»)، وتفعيل IPv6 على الكارت (زوّد المشكلة). التأكد: نفس القياس بعد الإصلاح + `curl -4 https://api.ipify.org`. المنع: اختبار بيتأكد إن multicast مش في قاعدة direct، وقياس packets/s كل مرة تغيّر قواعد التوجيه. الفخ العام: تلات تعديلات اتجرّبت قبلها كلها كانت بتعالج أعراض.

- [ ] **الاسم بيتحل عند السيرفر ولا عندك؟ مقارنة A/B بـ curl** (يمتد من `socks_proxy`، اللي فيه `--socks5-hostname` أصلاً): العَرَض: على نفس السيرفر، الأداة بتفتح 5 من 12 موقع بس وأداة تانية بتفتحهم كلهم. الفرضية: الـ sniffing بيقرا اسم الموقع وبيبعته للسيرفر، والسيرفر هو اللي بيحلّه بالـ DNS بتاعه (ضعيف)، بدل ما يستلم IP. التجربة (بدون أدمن، SOCKS بس): (A) `curl -x socks5h://127.0.0.1:10808 -s -o /dev/null -m 15 -w "%{http_code} %{time_total}\n" https://example.org` (الاسم يتحل عند السيرفر) مقابل (B) `curl -x socks5://127.0.0.1:10808 ...` (الاسم يتحل عندك والسيرفر ياخد IP). نعدّهم 3 مرات في `for u in ...; do ...; done` ونسجل نجاح/فشل/وقت. النتيجة: 5/12 قبل، 12/12 بالـ IP، وبعد الإصلاح 8/8. الحل: الـ sniffing يفضل للتوجيه بس (`routeOnly: true`) والاتصال يتم بالـ IP. المنع: نفس سكربت المقارنة قبل أي تغيير. يربط بدرس `dns`.

- [ ] **هوت سبوت ويندوز من كارت النفق: ليه الموبايل ماخدش النفق** (قسم جديد في `net`، ويربط بـ `nat`): الحالة: موبايل عايز يعدّي من نفق اللابتوب من غير إعداد proxy. تجربة ١: هوت سبوت عادي من Wi-Fi + الموبايل على موقع «IP بتاعي»: طلع IPv4 بتاع المزوّد (برّه النفق) و IPv6 بتاع شركة السيرفر (خليط). الاستنتاج: ويندوز بيشارك كارت الـ Wi-Fi مش النفق؛ وصفحة Settings بتعرض الكروت الحقيقية بس، والقائمة «Share my internet connection from» رمادية والهوت سبوت شغال (لازم Off الأول). الفحص من غير تغيير: `Get-NetAdapter -Physical`، `Get-Service SharedAccess, icssvc | Select Name,Status`، `Get-NetIPInterface -AddressFamily IPv4 | Select InterfaceAlias,Forwarding,InterfaceMetric`، `Get-NetNeighbor -InterfaceIndex <n>` (فيه جهاز متوصل ولا لأ؟)، `Get-DnsClientServerAddress`، `Get-WinEvent -FilterHashtable @{LogName='System';StartTime=(Get-Date).AddMinutes(-40)} | ? ProviderName -match 'SharedAccess|icssvc|WLAN'`. وبـ COM: `$m=New-Object -ComObject HNetCfg.HNetShare; foreach($c in $m.EnumEveryConnection){ $m.INetSharingConfigurationForINetConnection($c).SharingEnabled }` عشان تعرف مين المتشارك. الحل: تشغيل Mobile Hotspot من الـ API (`NetworkOperatorTetheringManager.CreateFromConnectionProfile` بـ profile كارت النفق). شرط الترتيب: الهوت سبوت يتشغّل **بعد** ما النفق يتوصل ويستقر ويتشغّل تاني بعد أي إعادة اتصال (الكارت بيتعمل من جديد والهوت سبوت بيفضل مربوط بالقديم). عَرَض أندرويد (حقيقي): `Connected without internet` وبعدها بيفصل لوحده، اختار Keep. عزل الـ DNS: افتح `http://1.1.1.1` (من غير اسم) وبعدها اسم موقع. التأكيد: عنوان الموبايل = عنوان السيرفر، و `Get-NetNeighbor` فيه جهاز. المعمل يحتاج كارت Wi-Fi بيدعم hosted network.

- [ ] **مشاركة النفق بـ proxy على الشبكة المحلية والمنفذ المقفول** (`net`، يمتد من `socks_proxy`): الأداة بتفتح HTTP على 10809 و SOCKS5 على 10810 على `0.0.0.0` والموبايل مش بيفتح حاجة. التسلسل: (١) `netstat -ano | Select-String ':10809\s'` أو `Get-NetTCPConnection -State Listen -LocalPort 10809,10810` فاضي؟ (٢) `Get-NetIPAddress -AddressFamily IPv4 | ? {$_.InterfaceAlias -notmatch 'Loopback|vpnlab0' -and $_.IPAddress -notlike '169.254*'}` عشان العنوان اللي يتكتب في الموبايل، (٣) `Get-NetFirewallRule -DisplayName 'LabShare'` و `netsh advfirewall firewall show rule name=LabShare` و `netsh advfirewall show currentprofile` و `Get-NetConnectionProfile | Select InterfaceAlias,NetworkCategory` (Public بيقفل inbound). السبب الحقيقي: الإعداد اتفعّل **والاتصال شغال من قبله**، والـ listener بيتفتح مع أول اتصال بعده (وقت `settings.json` أحدث من وقت بداية الاتصال). الحل: سؤال «إعادة الاتصال الآن؟» عند تغيير أي إعداد محتاج reconnect. التأمين: قاعدة جدار حماية `-RemoteAddress LocalSubnet` على المنفذين بس، تتضاف بعد بدء الجلسة وتتشال عند الفصل، وتوجيه بيمنع الـ proxy المشترك من الوصول لـ `127.0.0.1` وباقي أجهزة الـ LAN. على الموبايل: Wi-Fi ← تعديل الشبكة ← Proxy يدوي، ولازم ترجّعه None بعد التجربة وإلا النت يقف كل ما اللاب يتقفل.

- [ ] **أيقونة الشبكة في الـ taskbar: ليه VPN بيظهر «سلكي»** (`net`، ملحوظة في `tun`): كارت TAP (ويندوز بيشوفه Ethernet 802.3، ومعاه default `0.0.0.0/0` فأيقونة الشاشة السلكية) مقابل wintun (يظهر Unknown، ومعاه `/1`+`/1` فالأيقونة تفضل Wi-Fi). الفحص: `Get-NetConnectionProfile | Select InterfaceAlias,Name,IPv4Connectivity,NetworkCategory`، `Get-NetAdapter | ? Status -eq Up | Select Name,InterfaceDescription,MediaType,ifIndex`، `Get-NetRoute -DestinationPrefix '0.0.0.0/1','0.0.0.0/0' | Select DestinationPrefix,InterfaceAlias,NextHop,RouteMetric`. المفهوم: ويندوز بيقرر «فيه إنترنت؟» (NCSI) لكل كارت لوحده، فممكن Store/Teams يقولوا أوفلاين والمواقع شغالة. الأيقونة شكل بس، مش دليل على VPN.

- [ ] **SNI ≠ اسم الشهادة: ليه عميل بيتصل وعميل تاني لأ** (يمتد من `tls_sni`): العميل ممكن يبعت SNI باسم ويتحقق من الشهادة باسم تاني (`verifyPeerCertByName` في Xray)، وعميل تاني بيتحقق قصاد الـ SNI نفسه فيفشل الـ handshake. بدل ما تقفل التحقق (`allowInsecure`، والـ VMess نفسه يفضل مشفّر بس الطبقة الخارجية تتكشف لهجوم وسيط) الحل الأنضف إنك تعدّي الإعداد الكامل كملف JSON. التحقق من الملف: `xray run -test -config cfg.json` (خطأ حقيقي لما port يبقى نص: `cannot unmarshal string into ... port`). التأكد من الشهادة: `openssl s_client -connect 203.0.113.9:443 -servername other.example` وقراية `subject` و `Verify return code`. أمان: ملف الـ config فيه UUID فما يتحطش على Desktop لأنه متزامن مع OneDrive، و `[Environment]::GetFolderPath('Desktop')` بيورّي المسار الفعلي.

### تاب diag (قضايا كاملة)

- [ ] **ديدلوك الـ DNS: النفق محتاج يحل اسم السيرفر عن طريق النفق نفسه** (قضية «VPN شغال بس مفيش بيانات»): العَرَض: أول جلسة اشتغلت (9 Mbps) وآخر 3 جلسات: الـ routes `-> 0` و `connected` بس صفر بيانات. الفحوصات بالترتيب: routes سليمة؟ كروت؟ IPv6؟ DNS؟ `nslookup vpn.example` و `nslookup vpn.example 8.8.8.8` و `Resolve-DnsName` بعد الفصل. التفسير: أول جلسة اشتغلت لأن اسم السيرفر كان في **DNS cache** (`ipconfig /displaydns`)، وبعدها حلقة الـ multicast (بند net) غطّت، ولما اتحلّت ظهر الديدلوك: الـ proxy يحتاج يحل اسم السيرفر، والـ DNS راح للنفق، والنفق مش قايم. الحل: **حل الاسم قبل ما تغيّر أي route** وتدّي الـ proxy الـ IP مباشرة (`ServerAddressOverride`) مع إبقاء الـ SNI واسم الشهادة بالأسماء الأصلية. بدايل: تثبيت الاسم في hosts (بيتنسى ويبوّظ لما السيرفر يغيّر IP). المنع: اختبار بيتأكد إن العنوان في الـ config IP. درس عام: «اشتغلت مرة واحدة» ممكن يكون كاش.

- [ ] **فحص الصحة بيختبر الطريق الغلط** (قضية «Tunnel check failed والنفق شغال»): الأداة بتقول `Tunnel check failed` واللوج بيقول الترافيك ماشي `tun-in >> proxy`. السبب: الفحص كان بيعدّي على بورت SOCKS مش على الكارت نفسه. الحل: يفحص من خلال النفق ويطبع الـ IP الخارجي. وقاعدة تانية: 3 فحوص فاشلة ورا بعض ما تقطعش الاتصال لو **البيانات الفعلية بتعدّي** (vouched by traffic)، ويتسجل في تقرير التشخيص `tunnel checks: 112, answered 3, vouched by traffic 74, failed 35`. الأوامر: `curl -4 -s -m 10 https://api.ipify.org`، `curl -6 -s -m 5 https://api6.ipify.org || echo none` (فاضي = كويس)، `curl -s -o /dev/null -w "connect %{time_connect}s tls %{time_appconnect}s total %{time_total}s\n" https://example.org`. يربط بـ «health check passing isn't proof».

- [ ] **جلسة ماتت وسابت وراها: عملية يتيمة و routes** (قضية «النت بطيء بعد ما قفلت نافذة الأدمن»): السبب: النافذة اتقفلت من غير Ctrl+C فالأب مات والابن (`xray.exe`) فضل شغال والـ routes متركّبة، والتشغيل التاني رفض يبدأ برسالة مضللة. الفحص: `tasklist | findstr /i "xray vpnlab"`، `route print -4 | findstr "128.0.0.0 203.0.113.9"`، `ipconfig | findstr vpnlab`، و `Get-CimInstance Win32_Process -Filter "Name='xray.exe'" | % { $_.ProcessId, $_.ParentProcessId, $_.CommandLine }` (الأب مات؟). الحماية 3 طبقات: Job Object بـ kill-on-close (موت الأب يقتل الابن والكارت والـ routes يختفوا معاه)، معالج قفل الكونسول يشغّل التنظيف قبل الخروج، وملف حالة بأوامر التراجع يتكتب أول ما الاتصال يبدأ وأمر `cleanup` يقراه وينفّذه. فخ تاني: `netsh interface ipv4 add route` بيعمل route **دائم** افتراضيًا (يظهر تحت Persistent Routes في `route print`) فبعد restart النت يفضل رايح لكارت مش موجود؛ الحل `store=active`. أمر الطوارئ: `netsh interface ipv4 delete route prefix=0.0.0.0/1 interface=vpnlab0 nexthop=10.255.0.1`. التأكد: `route print` مفيهوش Persistent Routes.

- [ ] **نسختين من البرنامج بعد صحيان الجهاز (Modern Standby) ومهمة logon** (قضية «الاتصال بيقع كل شوية والنفق سليم»): العَرَض: لوج فيه سطرين `connected` بفرق 5 ملي ثانية، وخطأ `FwpmSubLayerAdd0: already exists` (حقيقي)، و `No such host is known` (حقيقي) وقت تحديث عنوان السيرفر. التضييق: `Get-ScheduledTaskInfo <task> | Select LastRunTime` (اتشغّلت 18:01 مع إن الجهاز مقلعش)، `Get-WinEvent -FilterHashtable @{LogName='System';StartTime=...}` وفيه Winlogon 7001 وقت الصحيان، `Get-Process app | Select Id,StartTime`، وعدد النسخ بـ `Get-CimInstance Win32_Process`. السبب: مهمة Task Scheduler عندها LogonTrigger بـ delay 20 ثانية، وويندوز بيرفع logon عند الصحيان من Modern Standby، فاشتغلت نسخة أدمن تانية جنب نسخة الـ tray وكتبوا قواعد فوق بعض. الحل: mutex اسمه مشتق من فولدر البيانات (اللي يتأخر يقفل نفسه)، وطلب إظهار نافذة النسخة الشغالة (`ChangeWindowMessageFilterEx` عشان UIPI)، ورقم العملية في كل سطر لوج (`[gui 8940]`) وسطر `processes:` في تقرير التشخيص. بديل اترفض: تقتل القديمة (ممكن تكون متصلة). يربط بـ `cmd/08` Modern Standby.

- [ ] **سقف الذاكرة بيخلي الـ CPU 1250%: GOMEMLIMIT** (قضية قصيرة، يربط بـ `go/11`): رام Xray 717 MB فحطّينا `GOMEMLIMIT=256MiB` فالـ GC فضل شغال طول الوقت: CPU 1,252% وتنزيل 68 KB/s. القياس: `$p=Get-Process xray; $a=$p.TotalProcessorTime.TotalSeconds; Start-Sleep 5; $p.Refresh(); (($p.TotalProcessorTime.TotalSeconds-$a)/5)*100` و `$p.WorkingSet64/1MB`. السبب الحقيقي للرام كان قاعدة `geoip:private` بتحمّل `geoip.dat` كله، والحل قائمة CIDR صريحة. الدرس: سقف أقل من الاستهلاك الفعلي بيحوّل الرام لـ CPU، فعالج مصدر الاستهلاك مش السقف.

### تاب ps

- [ ] **تجربة بتغيّر الشبكة ومحتاجة أدمن: إزاي تعملها بأمان** (طريقة، يمتد من `Start-Process -Verb RunAs` في `ps/27`): الطرف التاني (أداة/AI) ممكن ميقدرش يوافق على UAC، فبتكتب `run.ps1` فيه: مهلة فصل تلقائية (`--for 150`) عشان الشبكة ترجع لوحدها، ولوج في ملف. اللي بيشغّل: `powershell -NoProfile -ExecutionPolicy Bypass -File "C:\lab\run.ps1"` من PowerShell أدمن **مرة واحدة** (مرتين اتلخبطت الجلسات). بعدها يتأكد: `tasklist | findstr`، `route print`، IP العام. فحص أدمن: `net session >nul 2>&1 && echo ADMIN || echo not admin`.

- [ ] **قياسات PowerShell لمشكلة أداء** (يمتد من `ps/08`): معدّل حزم الكارت (فرق `Get-NetAdapterStatistics` ÷ ثواني)، CPU% من فرق `TotalProcessorTime`، `Get-NetUDPEndpoint | Group-Object OwningProcess | Sort Count -Desc`، `Get-CimInstance Win32_Process -Filter "Name='x.exe'"` لـ `CommandLine` و `ParentProcessId`، وتنسيق `"{0:N0}" -f`. يتجمع في درس «قيس قبل ما تغيّر».

- [ ] **مسار فيه مسافة: `The term 'D:\programming' is not recognized`** (فخ، نص حقيقي كامل: `The term 'D:\programming' is not recognized as the name of a cmdlet, function, script file, or operable program`): كتب `D:\programming projects\app\setup.exe` فاتفهم أمر. الحل: `& "D:\programming projects\app\setup.exe"` (call operator). التثبيت الصامت لـ Inno Setup: `/VERYSILENT /SUPPRESSMSGBOXES /NORESTART`، وملف `.iss` فيه عربي لازم UTF-8 **مع BOM**، والتثبيت `winget install --id JRSoftware.InnoSetup -e`.

- [ ] **لوج اتكتب UTF-16 وبيظهر binary** (فخ): PowerShell 5.1 `>` و `Out-File` بيكتبوا UTF-16LE. القراية من Git Bash: `iconv -f UTF-16 -t UTF-8 run.log | tr -d '\r' | grep ...`. الكتابة بـ `Set-Content -Encoding UTF8`. غلطة تانية (نص حقيقي): `out-file : Could not find a part of the path '...\Desktop\x.json'` لأن Desktop محوّل لـ OneDrive، والمسار الصح `[Environment]::GetFolderPath('Desktop')`.

- [ ] **Smart App Control بيحجب DLL اتبنت جديد** (فخ، ويندوز 11): `dotnet test` فشل بـ `An Application Control policy has blocked this file (0x800711C7)` (حقيقي) بعد ما كان شغال، لأن الملف جديد غير موقّع. الفحص: `Get-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Control\CI\Policy' | Select VerifiedAndReputablePolicyState`. الحلول: شهادة توقيع أو تعطيل SAC (**مش بيتراجع من غير إعادة تثبيت ويندوز**، فمش بنصح بيه). يتجرّب على ويندوز 11 حقيقي مش Docker.

- [ ] **Task Scheduler والمسارات اللي فيها مسافة** (يمتد من `ps/14`): `schtasks /Create /TN LabTask /TR "\"C:\Program Files\Lab\app.exe\" --autostart" /SC ONLOGON /RL HIGHEST /DELAY 0000:20 /F`. إزاي تتأكد من التنصيص من غير أدمن: مهمة تجريبية بـ `/RL LIMITED` واسم مختلف، من `[System.Diagnostics.ProcessStartInfo]` بـ `ArgumentList.Add(...)`، وبعدين `[xml](schtasks /Query /TN LabTask /XML | Out-String)` وتقرا `Task.Actions.Exec.Command` و `Arguments`، وبعدها `schtasks /Delete /TN LabTask /F`. و `Get-ScheduledTaskInfo LabTask` لـ `LastRunTime` (انظر بند diag «نسختين»).

- [ ] **اختبار واجهة ويندوز من PowerShell (UI Automation)** (متقدم، أولوية قليلة): `Add-Type -AssemblyName UIAutomationClient,UIAutomationTypes` و `[System.Windows.Automation.AutomationElement]::RootElement.FindAll(...)` بـ `PropertyCondition` على `ControlType.Window` وعلى `ProcessId`، و `InvokePattern`/`TogglePattern`/`ValuePattern`، و `WindowPattern.Current.WindowVisualState` (نافذة 199×34 = minimized)، و `CloseMainWindow()` لقفل لطيف. يتجرّب على برنامج WinForms صغير.

### تاب cmd

- [ ] **`The object already exists` في `netsh`: أوامر إعداد وتراجع تتكرر بأمان (idempotent)**: `netsh interface ipv6 add address vpnlab0 fd00::2/64` رجّع `The object already exists` (حقيقي) لأن العنوان فضل على الكارت من تجربة قبلها، والأداة عملت rollback كامل. الحل: `set address` بدل `add` (يشتغل في الحالتين) و«already exists» تتعامل كنجاح. وتقرا كود الخروج (`-> 0`) لكل أمر وتتراجع بالعكس عند أول فشل. وللـ routes: `netsh interface ipv4 add route prefix=0.0.0.0/1 interface=vpnlab0 nexthop=10.255.0.1 store=active`، و `netsh interface ipv4 set interface name=vpnlab0 metric=1` (بيخلي ويندوز يفضّل DNS الكارت لكن زوّد المشكلة في تجربتنا فبقى اختياري).

### تاب bash

- [ ] **Git Bash بيبوّظ سويتشات ويندوز: `tasklist //FI` و `taskkill //PID 123 //F`**: من Git Bash سويتش بيبدأ بـ `/` ممكن يتحوّل لمسار (MSYS path conversion)، فنكتب `//` أو `MSYS_NO_PCONV=1`. مثال: `tasklist //FI "IMAGENAME eq xray.exe"`، `taskkill //PID 49728 //F`. (نص الخطأ بدون `//` يتجرّب في Git Bash.) وحلقة الانتظار: `for i in $(seq 1 30); do tasklist | grep -qi vpnlab || break; sleep 2; done`.

### تاب git

- [ ] **ملف اتعدّل بسكربت وبقى الـ diff 122 سطر محذوف: line endings** (يمتد لبند PLAN «ملف M والـ diff فاضي»): بعد `sed -i` أو سكربت Python على ملف CRLF، `git diff --stat` بيظهر الملف كله اتغيّر. الفحص: `git diff --numstat`، `for f in $(git diff --name-only); do echo "$f $(grep -c $'\r$' "$f")/$(wc -l < "$f")"; done`، و `git show HEAD:"$f" | grep -c $'\r$'` للمقارنة. الإصلاح: تحويل الملف لـ CRLF بالكامل (`replace(b'\r\n',b'\n').replace(b'\n',b'\r\n')` على bytes)، والتأكد إن الـ diff رجع للسطور الحقيقية (14). المنع: افتح الملفات `rb/wb` أو `newline=''` في Python.

- [ ] **فحص أسرار قبل الـ commit**: `git add -A && git status --short`، `git ls-files | grep -iE "bin/|obj/|out/|\.exe|\.dll" || echo none`، `git grep --cached -nE "pattern1|pattern2"; echo "exit=$? (1 = no matches)"` (الشكل بـ `&&`/`||` لخبط الـ exit code فبدّلناه)، وبعدين `git commit -q -F - <<'EOF' ... EOF` (رسالة متعددة الأسطر)، و `git show --numstat --format=%h HEAD` للتأكد إن الـ commit فيه الملفات المقصودة بس. يتجرّب في ريبو فاضي بسر وهمي.

- [ ] **نزّل أداة من GitHub Releases وتأكد من checksum**: `gh release view -R owner/tool --json tagName,assets --jq '.tagName, (.assets[] | select(.name|test("windows-64.zip")) | .name)'`، `gh release download v1.2.3 -R owner/tool -p "tool-windows-64.zip" -p "tool-windows-64.zip.dgst" --clobber`، `grep -i SHA2-256 *.dgst` و `(Get-FileHash tool.zip -Algorithm SHA256).Hash` وتقارن، `unzip -qo`، `./tool version`. وقبل ما تضيف package: اتأكد إن إصداره عدّى عليه أسبوعين. في المعمل نستخدم repo عام صغير.

### تاب tools

- [ ] **افتح تثبيت جاهز لبرنامج .NET من غير source** (أولوية قليلة): `ls -la` على فولدر البرنامج، `cat App.exe.config`، `dotnet tool install ilspycmd --tool-path <scratch>` ثم `ilspycmd App.exe -o out`، أو `pip install dnfile` لقراية الـ metadata. ولمعرفة بيشغّل إيه: `Get-CimInstance Win32_Process -Filter "Name='engine.exe'" | Select CommandLine`. ملاحظة: على برنامج بتملكه أو مفتوح المصدر، مش لتخطي حماية.

---
ملخص: net 6، diag 5، ps 7، cmd 1، bash 1، git 3، tools 1 (24 بند). الأعلى قيمة: حلقة التضخيم، ديدلوك الـ DNS، عملية يتيمة و Persistent Routes، نسختين بعد Modern Standby، هوت سبوت من كارت النفق.
