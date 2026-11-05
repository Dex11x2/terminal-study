// تكملة تاب data: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/data/01.js (شرح حقول الدرس في أوله)
MORE("data", [
    {
      t: "PocketBase: backend في ملف واحد",
      l: 3,
      n: "برنامج واحد فيه قاعدة بيانات SQLite و API وحسابات وملفات و realtime. هنبني مكتبة كتب مخترعة: التشغيل في Docker، والجداول بـ migrations، و API rules، والحسابات، و pb_hooks، والملفات المحمية، و realtime",
      items: [
        {
          cmd: "PocketBase",
          title: "إيه هو، وإزاي تشغّله في Docker بنسخة مثبتة",
          desc: R`PocketBase برنامج واحد مكتوب بـ Go، بتشغّله فتاخد قاعدة بيانات SQLite و REST API وحسابات ورفع ملفات و realtime ولوحة إدارة، كلهم من ملف تنفيذي واحد. بياناتك كلها في فولدر [[pb_data]] جنبه.

الفرق عن Supabase في جملة: Supabase مجموعة خدمات حوالين Postgres، و PocketBase عملية واحدة حوالين ملف SQLite. المقارنة الكاملة في درس «PocketBase ولا Supabase».

الدروس دي كلها متجرّبة على نسخة [[0.40.4]]. ولسه قبل [[1.0]]، فثبّت النسخة في الـ Dockerfile واقرا الـ changelog قبل أي ترقية.`,
          example: R`docker build -t pblab:0.40.4 .
docker run -d --name pblab -p 127.0.0.1:8790:8090 -v pblab-data:/pb/pb_data pblab:0.40.4
curl -s http://127.0.0.1:8790/api/health
docker exec pblab /pb/pocketbase --version
docker exec pblab /pb/pocketbase superuser upsert owner@example.com lab-password-123
docker logs pblab`,
          try: R`اكتب الـ Dockerfile اللي في الشرح في فولدر فاضي، وجنبه فولدرين [[pb_migrations]] و [[pb_hooks]] فاضيين (حط في كل واحد ملف [[.keep]] عشان [[COPY]] يلاقي حاجة). ابني الصورة وشغّلها، وتأكد إن [[/api/health]] بيرجّع 200، وبعدين اعمل superuser وافتح [[http://127.0.0.1:8790/_/]].`,
          sol: R`هتشوف [[{"message":"API is healthy.","code":200,"data":{}}]] و [[pocketbase version 0.40.4]] و [[Successfully saved superuser "owner@example.com"!]]. والبيانات في volume اسمه [[pblab-data]]، فلو مسحت الحاوية وشغّلت واحدة جديدة بنفس الـ volume هتلاقيها زي ما هي.

لو نسيت [[-v]]، البيانات بتفضل جوه الحاوية، وأول [[docker rm]] بيمسحها كلها.`,
          deep: {
            why: "مشاريع كتير صغيرة محتاجة حسابات وجداول وملفات، ومش محتاجة فريق يدير خمس خدمات. PocketBase بيديك ده في عملية واحدة تتنسخ بنسخ فولدر، وتشتغل على أرخص سيرفر. التمن إنك مربوط بسيرفر واحد وقاعدة SQLite.",
            how: R`البرنامج ملف Go واحد جواه كل حاجة: راوتر HTTP، و SQLite مدمج، ومحرك JavaScript اسمه goja بيشغّل [[pb_hooks]]، ولوحة الإدارة على [[/_/]].

لما يقوم بيعمل [[pb_data]] لو مش موجود، وفيه [[data.db]] (بياناتك) و [[auxiliary.db]] (اللوجات)، و [[storage/]] للملفات المرفوعة، و [[types.d.ts]]، وده تعريف كل دوال الـ JavaScript للنسخة اللي شغالة بالظبط، و 24842 سطر في [[0.40.4]].

الـ superuser هو أعلى صلاحية: بيعدّي كل القواعد. مكانه الإدارة بس، مش تطبيقك.`,
            when: "مشروع شخصي، أو MVP، أو أداة داخلية، أو موقع بيبيع منتج، لما سيرفر واحد كفاية وعايز تتحكم في بياناتك. مش مناسب لو محتاج كذا سيرفر بيكتبوا في نفس القاعدة.",
            mistakes: R`تشغيله من غير volume فالبيانات تضيع مع الحاوية. وفتح [[/_/]] للإنترنت. واستخدام [[latest]] بدل نسخة مثبتة. وعلى Git Bash في ويندوز، [[docker exec x /pb/pocketbase]] بيقع لأن الشل بيحوّل المسار لـ [[C:/Program Files/Git/pb/...]]، والحل [[MSYS_NO_PATHCONV=1]] (درس الموضوع ده في تاب bash).`
          },
          teach: R`## الفكرة

بدل ما تكتب backend وتركّب قاعدة بيانات، بتشغّل برنامج واحد وتعرّف جداولك. هنشغّله في Docker عشان نفس النسخة بالظبط تشتغل على جهازك وعلى السيرفر.

---

## ١. الـ Dockerfile

~~~bash
FROM alpine:3.20

ARG PB_VERSION=0.40.4
ARG PB_SHA256=9042ec818570e79c3628dadcd0a756c1496d9e1173918ec409d133c02f82e5fa

RUN apk add --no-cache ca-certificates tzdata \
 && wget -qO /tmp/pb.zip "https://github.com/pocketbase/pocketbase/releases/download/v$__{PB_VERSION}/pocketbase_$__{PB_VERSION}_linux_amd64.zip" \
 && echo "$__{PB_SHA256}  /tmp/pb.zip" | sha256sum -c - \
 && unzip -q /tmp/pb.zip pocketbase -d /pb \
 && rm /tmp/pb.zip \
 && adduser -D -H -u 10001 pb \
 && mkdir -p /pb/pb_data \
 && chown pb /pb/pb_data

COPY pb_migrations /pb/pb_migrations
COPY pb_hooks /pb/pb_hooks

USER pb
EXPOSE 8090
HEALTHCHECK --interval=30s --timeout=5s CMD wget -qO- http://127.0.0.1:8090/api/health || exit 1

CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8090", "--dir=/pb/pb_data", "--migrationsDir=/pb/pb_migrations", "--hooksDir=/pb/pb_hooks", "--automigrate=false"]
~~~

| الجزء | بيعمل إيه وليه |
|---|---|
| [[ARG PB_SHA256]] | بصمة الملف. [[sha256sum -c -]] بيقارن الملف اللي نزل بيها، ولو اختلف البناء بيقف |
| [[adduser -u 10001 pb]] | يوزر عادي، فلو حد استغل ثغرة في البرنامج ميبقاش root جوه الحاوية |
| [[chown pb /pb/pb_data]] | اليوزر ده لازم يقدر يكتب في فولدر البيانات، وإلا البرنامج مش هيقوم |
| [[--http=0.0.0.0:8090]] | يسمع على كل واجهات الحاوية. لو سبتها على [[127.0.0.1]] جوه الحاوية محدش من بره هيوصله |
| [[--automigrate=false]] | التعديلات من لوحة الإدارة متعملش ملفات migration لوحدها (درس الجداول بيشرح ده) |

والبصمة بتحميك فعلًا. جربنا نبني بقيمة غلط:

~~~text الناتج مع بصمة غلط
sha256sum: WARNING: 1 of 1 computed checksums did NOT match
/tmp/pb.zip: FAILED
ERROR: failed to build: failed to solve: process "/bin/sh -c apk add ...
~~~

---

## ٢. التشغيل

~~~bash
docker run -d --name pblab -p 127.0.0.1:8790:8090 -v pblab-data:/pb/pb_data pblab:0.40.4
~~~

- [[-d]] يشتغل في الخلفية، و [[--name pblab]] اسم تستخدمه في باقي الأوامر.
- [[-p 127.0.0.1:8790:8090]] البورت 8790 على جهازك بس، مش على الشبكة.
- [[-v pblab-data:/pb/pb_data]] volume بيعيش بعد مسح الحاوية. ده أهم جزء في الأمر.

~~~text docker logs
Server started at http://0.0.0.0:8090
├─ REST API:  http://0.0.0.0:8090/api/
└─ Dashboard: http://0.0.0.0:8090/_/

(!) Launch the URL below in the browser if it hasn't been open already to create your first superuser account:
http://0.0.0.0:8090/_/#/pbinstall/<token>
(you can also create your first superuser by running: /pb/pocketbase superuser upsert EMAIL PASS)
~~~

---

## ٣. اتأكد إنه شغال

~~~bash
curl -s http://127.0.0.1:8790/api/health
~~~

~~~text الناتج
{"message":"API is healthy.","code":200,"data":{}}
~~~

الناتج ده معناه إن البرنامج قايم بس، مش إن مساراتك موجودة. شوف درس «حالة: health ناجح والمسار 404».

---

## ٤. أول superuser

~~~bash
docker exec pblab /pb/pocketbase superuser upsert owner@example.com lab-password-123
~~~

[[upsert]] يعني اعمله لو مش موجود، أو غيّر كلمة سره لو موجود. فلو نسيت كلمة السر، نفس الأمر بيرجّعها.

---

## ٥. شوف اللي اتعمل

~~~text pb_data
data.db          جداولك وبياناتك
auxiliary.db     اللوجات
types.d.ts       كل دوال الـ JavaScript للنسخة دي (24842 سطر)
~~~

و [[data.db-wal]] و [[data.db-shm]] ملفات مؤقتة بتاعة SQLite. لازم يتنسخوا مع القاعدة أو تستخدم الباك أب الرسمي (درس «PocketBase في الإنتاج»).

---

## الخلاصة

- برنامج واحد، وبياناتك في [[pb_data]].
- نسخة مثبتة وبصمة في الـ Dockerfile، و volume للبيانات.
- [[superuser upsert]] لأعلى صلاحية، و [[/api/health]] بيقول إنه قايم بس.`,
          lines: [
            "ابني الصورة من الـ Dockerfile اللي في الفولدر ده، وسمّيها بالنسخة.",
            "شغّل حاوية في الخلفية، البورت على جهازك بس، والبيانات في volume.",
            "اسأل السيرفر هو قايم ولا لأ.",
            "اتأكد من النسخة اللي شغالة فعلًا جوه الحاوية.",
            "اعمل أعلى حساب إدارة، أو غيّر كلمة سره لو موجود.",
            "اقرا لوج التشغيل، وفيه لينك لوحة الإدارة."
          ],
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** شغّل الصورة، وهات النسخة وناتج [[/api/health]].`, done: R`تشوف [[pocketbase version 0.40.4]] وكود 200.`, sol: R`~~~bash
docker exec pblab /pb/pocketbase --version
curl -s -i http://127.0.0.1:8790/api/health
~~~

[[-i]] بيطبع الـ headers كمان، فتشوف كود الحالة نفسه. لو على Git Bash ووقع الأمر الأول، اكتب قبله [[MSYS_NO_PATHCONV=1]].

~~~text الناتج
pocketbase version 0.40.4
HTTP/1.1 200 OK
{"message":"API is healthy.","code":200,"data":{}}
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** ادخل كـ superuser بـ [[curl]] من غير اللوحة، واطبع اسم الجدول اللي جه منه الحساب.`, done: R`تطبع [[_superusers]].`, sol: R`~~~bash
curl -s -X POST -H 'Content-Type: application/json' \
  -d '{"identity":"owner@example.com","password":"lab-password-123"}' \
  http://127.0.0.1:8790/api/collections/_superusers/auth-with-password \
  | node -pe "JSON.parse(require('fs').readFileSync(0)).record.collectionName"
~~~

الـ superusers جدول auth عادي اسمه [[_superusers]]، فبيتدخل عليه بنفس مسار أي حسابات. [[node -pe]] بيشغّل سطر JavaScript ويطبع قيمته، و [[readFileSync(0)]] بيقرا من الـ pipe.

~~~text الناتج
_superusers
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح:** زميلك شغّل [[docker run -d --name app pblab:0.40.4]] وضيف بيانات، وبعد [[docker rm -f app]] ضاع كل حاجة. إيه السبب، وإيه الأمر الصح؟`, done: R`البيانات تفضل بعد [[docker rm -f]].`, sol: R`~~~bash
docker run -d --name app -v app-data:/pb/pb_data pblab:0.40.4
docker rm -f app
docker run -d --name app -v app-data:/pb/pb_data pblab:0.40.4
~~~

من غير [[-v]] فولدر [[/pb/pb_data]] جزء من طبقة الحاوية، و [[docker rm]] بيمسحها. مع volume الداتا برة الحاوية، فأي حاوية جديدة بتركّب نفس الـ volume بتلاقيها.` },
            { lvl: 'تحدي', t: R`**قارن:** ابني الصورة بـ [[--build-arg PB_SHA256=]] متبوعة بـ 64 صفر. إيه اللي بيحصل، وليه ده أحسن من تنزيل الملف من غير فحص؟`, done: R`البناء يقف عند [[FAILED]].`, sol: R`~~~bash
docker build --no-cache --build-arg PB_SHA256=0000000000000000000000000000000000000000000000000000000000000000 -t pblab-bad:1 .
~~~

~~~text الناتج
sha256sum: WARNING: 1 of 1 computed checksums did NOT match
/tmp/pb.zip: FAILED
~~~

[[sha256sum -c -]] رجّع كود خطأ، فالـ [[&&]] وقفت باقي السطر، و Docker وقف البناء. ده معناه إن الملف لو اتغير على السيرفر بتاع التنزيل، مش هيتركب عندك من غير ما تعرف.` }
          ]
        },
        {
          cmd: "PocketBase: الجداول و migrations",
          title: "عرّف الجداول في ملف JavaScript بدل الكليك في اللوحة",
          desc: R`الجدول في PocketBase اسمه [[collection]]، وبتعرّفه في ملف migration جوه [[pb_migrations]]. الملف ده بيتحفظ في git، فأي سيرفر جديد بيطلع بنفس الجداول.

[[serve]] بيطبّق أي migration جديد لوحده وقت التشغيل، و [[migrate down]] بيرجع خطوة لورا.`,
          example: R`migrate((app) => {
  const shelves = new Collection({
    type: "base",
    name: "shelves",
    listRule: null,
    viewRule: null,
    createRule: null,
    updateRule: null,
    deleteRule: null,
    fields: [
      { name: "code", type: "text", required: true, max: 12 },
      { name: "label", type: "text" },
      { name: "created", type: "autodate", onCreate: true },
    ],
    indexes: ["CREATE UNIQUE INDEX idx_shelves_code ON shelves (code)"],
  });
  app.save(shelves);
}, (app) => {
  app.delete(app.findCollectionByNameOrId("shelves"));
});`,
          try: R`حط المثال في [[pb_migrations/1700000000_shelves.js]]، وأعد تشغيل الحاوية بـ [[-v]] للفولدر، وادخل اللوحة وتأكد إن الجدول ظهر. بعدين جرّب تضيف صفين بنفس [[code]] من اللوحة.`,
          sol: R`الجدول بيظهر من غير ما تعمل أي حاجة تانية. والصف التاني بيترفض برسالة [[Value must be unique.]] لأن الـ index فريد.

اسم الملف لازم يبدأ برقم، والأرقام بتحدد الترتيب. والملف اللي اتنفذ مرة بيتسجل في جدول [[_migrations]] ومش بيتنفذ تاني.`,
          flag: "script",
          deep: {
            why: "لو الجداول اتعملت بالكليك، السيرفر التاني مش هيبقى زي الأول، ومفيش تاريخ للتغييرات. الملف بيخلي الجدول كود: يتراجع في PR، ويتطبق على كل بيئة بنفس الشكل.",
            how: R`[[migrate(up, down)]] بياخد دالتين. [[up]] بيطبّق التغيير و [[down]] بيرجّعه، وكل واحدة بتستلم [[app]] جوه transaction.

أنواع الحقول: [[text]] و [[number]] و [[bool]] و [[email]] و [[url]] و [[date]] و [[autodate]] و [[select]] و [[json]] و [[file]] و [[relation]] و [[editor]] و [[geoPoint]].

و [[--automigrate]] الافتراضي [[true]]: أي تعديل من اللوحة بيكتب ملف migration لوحده. جربناه: إنشاء جدول [[shelves]] من الـ API عمل [[1793868262_created_shelves.js]]. مفيد على جهازك، وعلى السيرفر بنقفله بـ [[--automigrate=false]].`,
            when: "من أول يوم، حتى لو مشروع صغير. اللوحة كويسة تجرب فيها، بس التغيير النهائي مكانه ملف.",
            mistakes: R`نسيان إن الجدول الجديد مفيهوش [[created]] لوحده: لو رتبت بيه هيرجع 400 برسالة عامة. وتعديل migration اتنفذ قبل كده بدل ما تكتب واحد جديد. وتوقّع إن [[migrate down]] يفضل، مع إن [[serve]] بيرجّعه عند أول تشغيل لو الملف لسه موجود.`
          },
          teach: R`## الفكرة

الملف بيوصف الجدول، و PocketBase بيطبّقه مرة واحدة ويسجل ده.

---

## ١. [[migrate((app) => {...}, (app) => {...})]]

دالتين: الأولى للتطبيق والتانية للرجوع. وجوه الأولى [[app]] هو البرنامج نفسه، ومنه تعمل وتحفظ.

---

## ٢. القواعد الخمسة

~~~js
listRule: null,
viewRule: null,
createRule: null,
updateRule: null,
deleteRule: null,
~~~

[[null]] يعني مقفول على الكل غير الـ superuser. ابدأ بيها دايمًا، وافتح اللي محتاجه بس. درس «PocketBase: API rules» كله عن ده.

---

## ٣. الحقول

~~~js
{ name: "code", type: "text", required: true, max: 12 },
{ name: "created", type: "autodate", onCreate: true },
~~~

و [[autodate]] هو اللي بيحط وقت الإنشاء. **الجدول الجديد مفيهوش [[created]] لوحده.** وقعنا في ده فعلًا: مسار بيرتب بـ [[created]] على جدول من غيره رجّع:

~~~text الناتج
{"data":{},"message":"Something went wrong while processing your request.","status":400}
~~~

الرسالة عامة وبتقول 400 مش 500، فافتكر إن الفلتر أو الترتيب ممكن يكون بيشاور على حقل مش موجود.

---

## ٤. الـ index

~~~js
indexes: ["CREATE UNIQUE INDEX idx_shelves_code ON shelves (code)"],
~~~

ده SQL عادي بتاع SQLite. جربنا نضيف نفس الكود مرتين:

~~~text الناتج
{"data":{"code":{"code":"validation_not_unique","message":"Value must be unique."}},"message":"Something went wrong while processing your request.","status":400}
~~~

و SQLite بيدعم **partial index**، وده اللي بيحل «طلب واحد مفتوح لكل يوزر»:

~~~js
indexes: ["CREATE UNIQUE INDEX idx_tickets_open ON tickets (user) WHERE status = 'open'"],
~~~

جربناها: طلب [[open]] تاني لنفس اليوزر اترفض، وطلبات [[closed]] كتير عدّت، ويوزر تاني عدّى.

---

## ٥. الرجوع: [[migrate down]]

~~~bash
docker exec -i pblab sh -c "echo y | /pb/pocketbase migrate down 1"
~~~

الأمر بيسأل [[(y/N)]]، ومن غير رد بيقول [[The command has been cancelled]] ومبيعملش حاجة، عشان كده [[echo y]].

~~~text الناتج
Reverted 1700000000_library.js
~~~

وهنا فخ: لما عملنا restart بعدها، الجدول رجع! [[serve]] لقى الملف ولسه متطبقش، فطبّقه. لو عايز الرجوع يفضل، امسح الملف أو اكتب migration جديد بيعمل العكس.

---

## ٦. ملف جديد فاضي: [[migrate create]]

~~~text الناتج
/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  // add up queries...
}, (app) => {
  // add down queries...
})
~~~

والسطر الأول بيخلي VS Code يقرا [[types.d.ts]] ويكمّل لك الكود.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[serve]] | بيطبّق كل migration جديد لوحده |
| [[migrate up]] | نفس الكلام من غير تشغيل السيرفر |
| [[migrate down 1]] | يرجّع آخر واحد، بس [[serve]] هيرجّعه لو الملف موجود |
| [[migrate create name]] | ملف جديد برقم الوقت |
| [[migrate collections]] | ملف بصورة كل الجداول الحالية |
| [[migrate history-sync]] | ينضّف السجل من ملفات اتمسحت |`,
          lines: [
            "ابدأ migration: الدالة الأولى هي التطبيق.",
            "عرّف جدول جديد في متغير اسمه shelves.",
            "النوع base: جدول عادي، مش حسابات.",
            "اسم الجدول اللي بيظهر في مسارات الـ API.",
            "مين يقرا القايمة: null يعني الـ superuser بس.",
            "مين يفتح صف واحد: مقفول برضه.",
            "مين يضيف صف: مقفول، والإضافة هتبقى من مسار مخصوص.",
            "مين يعدّل صف: مقفول على الكل غير الـ superuser.",
            "مين يمسح صف: مقفول على الكل غير الـ superuser.",
            "من هنا بتبدأ قايمة حقول الجدول:",
            "كود الرف، إجباري ومش أطول من 12 حرف.",
            "اسم الرف بالعربي، وحقل اختياري.",
            "وقت الإنشاء، لازم تضيفه بنفسك.",
            "هنا بتخلص قايمة الحقول.",
            "index فريد: مفيش كودين زي بعض.",
            "هنا بيخلص تعريف الجدول.",
            "احفظ الجدول في القاعدة فعلًا، من غيرها مفيش حاجة بتحصل.",
            "الدالة التانية: الرجوع عن التغيير.",
            "امسح الجدول اللي عملناه.",
            "هنا بيخلص ملف الـ migration كله."
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** عملت [[migrate down 1]] وبعدين [[docker restart]] والملف لسه في [[pb_migrations]]. الجدول هيبقى موجود؟`, done: R`تشرح ليه رجع.`, sol: R`هيرجع. [[down]] شال الجدول وشال سطر الملف من [[_migrations]]، و [[serve]] وقت التشغيل بيطبّق أي ملف مش متسجل.

~~~text الناتج بعد restart
curl /api/collections/books/records  → 200
~~~

عشان يفضل محذوف: امسح الملف، أو اكتب migration جديد بيمسح الجدول.` },
            { lvl: 'تطبيق', t: R`**ابني:** جدول [[tickets]] فيه [[user]] و [[status]] (open أو closed)، بحيث كل يوزر يبقى ليه تذكرة [[open]] واحدة بس، و [[closed]] من غير حد.`, done: R`تانية [[open]] تترفض، و [[closed]] تعدّي.`, sol: R`~~~js
migrate((app) => {
  const tickets = new Collection({
    type: "base", name: "tickets",
    listRule: null, viewRule: null, createRule: null, updateRule: null, deleteRule: null,
    fields: [
      { name: "user", type: "text", required: true },
      { name: "status", type: "select", maxSelect: 1, values: ["open", "closed"], required: true },
    ],
    indexes: ["CREATE UNIQUE INDEX idx_tickets_open ON tickets (user) WHERE status = 'open'"],
  });
  app.save(tickets);
}, (app) => {
  app.delete(app.findCollectionByNameOrId("tickets"));
});
~~~

الـ [[WHERE]] بيخلي الـ index يشوف الصفوف المفتوحة بس، فالقفل على الحالة دي بس. والغلطة الشائعة [[UNIQUE (user)]] من غير شرط، فكل يوزر ياخد تذكرة واحدة في عمره.

~~~text الناتج من مسار تجربة
open  u1  200
open  u1  400 Ticket_open.
closed u1 200
closed u1 200
open  u2  200
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح:** مسار بيرجّع 400 [[Something went wrong]] لما بتطلب [[sort=-created]] على جدول [[shelves]]. دوّر على السبب وصلّحه من غير ما تعدّل migration قديم.`, done: R`الترتيب يشتغل.`, sol: R`الجدول مفيهوش حقل [[created]]. migration جديد يضيفه:

~~~js
migrate((app) => {
  const c = app.findCollectionByNameOrId("shelves");
  c.fields.add(new AutodateField({ name: "created", onCreate: true }));
  app.save(c);
}, (app) => {
  const c = app.findCollectionByNameOrId("shelves");
  c.fields.removeByName("created");
  app.save(c);
});
~~~

الملفات القديمة اتنفذت خلاص، فتعديلها مش هيغيّر حاجة على أي سيرفر. أي تغيير جديد بيبقى ملف جديد.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من [[pocketbase migrate --help]] لاقي الأمر اللي بيعمل ملف بصورة كل الجداول الحالية، وإمتى تستخدمه.`, done: R`تكتب الأمر وحالة استخدام.`, sol: R`[[pocketbase migrate collections]] وهو في قايمة الأوامر:

~~~text الناتج
- collections   - creates new migration file with snapshot of the local collections configuration
~~~

بتستخدمه لما تكون بنيت جداول بالكليك وعايز تحوّلهم ملف واحد في git قبل ما تطلع على سيرفر.` }
          ]
        },
        {
          cmd: "PocketBase: API rules",
          title: "القواعد الخمسة: مين يقرا ومين يكتب أنهي صف",
          desc: R`كل جدول ليه خمس قواعد: [[listRule]] و [[viewRule]] و [[createRule]] و [[updateRule]] و [[deleteRule]]. القيمة ليها تلات حالات: [[null]] مقفول، و [[""]] مفتوح للكل، أو شرط زي [[owner = @request.auth.id]].

ده المقابل المباشر لـ RLS في Supabase، والفرق إن القاعدة هنا جوه PocketBase مش جوه القاعدة نفسها. فلو الكود بتاعك في [[pb_hooks]] قرا الجدول، القواعد مش بتتطبق عليه.`,
          example: R`const notes = new Collection({
  type: "base",
  name: "notes",
  listRule: "owner = @request.auth.id",
  viewRule: "owner = @request.auth.id",
  createRule: "@request.auth.id != '' && owner = @request.auth.id",
  updateRule: "owner = @request.auth.id && @request.body.owner:isset = false",
  deleteRule: "owner = @request.auth.id",
  fields: [
    { name: "owner", type: "relation", collectionId: users.id, maxSelect: 1, required: true },
    { name: "body", type: "text", required: true, max: 500 },
  ],
});`,
          try: R`اعمل يوزرين، وخلي الأول يضيف ملاحظة. جرّب تقراها من التاني ومن غير login، وجرّب التاني يعدّلها، والأول يغيّر [[owner]] لنفسها.`,
          sol: R`الناتج الحقيقي:

| العملية | النتيجة |
|---|---|
| القايمة من اليوزر التاني | 200 و [[items]] فاضية |
| القايمة من غير login | 200 و [[items]] فاضية |
| فتح الصف من اليوزر التاني | 404 |
| تعديل من اليوزر التاني | 404 |
| تغيير [[owner]] من صاحب الملاحظة | 404 |
| تعديل [[body]] من صاحب الملاحظة | 200 |

لاحظ إن القايمة مش بترجّع خطأ، بترجّع فاضية، زي RLS بالظبط. والـ 404 متعمدة: مش بتقول للي بيجرب إن الصف موجود أصلًا.`,
          flag: "script",
          deep: {
            why: R`الـ API الجاهز بيخلي أي حد يكلّم جداولك من المتصفح، فالقاعدة هي السور الوحيد. غلطة في قاعدة واحدة معناها إن بيانات الناس كلها مكشوفة، زي [[listRule: ""]] على جدول فيه بيانات خاصة.`,
            how: R`القاعدة شرط بيتحول لجزء من الاستعلام. في [[list]] بيفلتر، فالصفوف اللي مش مسموحة بتختفي. وفي [[view]] و [[update]] و [[delete]] الصف لو مش مطابق يرجع 404.

و [[create]] مختلف: القاعدة بتتقيّم على الصف الجديد، ولو فشلت يرجع 400 [[Failed to create record.]].

المتغيرات: [[@request.auth.id]] و [[@request.auth.collectionName]] و [[@request.body.x]] و [[@request.query.x]]، وأي حقل في الصف، و [[@collection.other.field]] لقراءة جدول تاني.

والمعدّل [[:isset]] بيقول هل الحقل اتبعت في الطلب، فـ [[@request.body.owner:isset = false]] بيمنع تغيير الحقل ده.

و [[null]] رسالته مختلفة: 403 [[Only superusers can perform this action.]].`,
            when: "أي جدول الـ frontend بيكلّمه مباشرة. ولو المنطق معقد (سعر، موافقة، حالات) اقفل الجدول بـ null واكتب مسار في pb_hooks.",
            mistakes: R`[[""]] على جدول خاص، فالكل يقراه من غير login. ونسيان [[:isset]] في [[updateRule]]، فصاحب الصف ينقله ليوزر تاني. واختبار القواعد من حساب superuser، وده بيعدّيها كلها، فكل حاجة تبان شغالة.`
          },
          teach: R`## الفكرة

القاعدة بترد على سؤال واحد لكل طلب: الصف ده مسموح للي بيسأل؟

---

## ١. تلات حالات

| القيمة | المعنى | من غير login |
|---|---|---|
| [[null]] | الـ superuser بس | 403 |
| [[""]] | أي حد | 200 |
| شرط | اللي يحقق الشرط | حسب الشرط |

الفرق بين [[null]] و [[""]] هو الفرق بين جدول مقفول وجدول مفتوح للعالم، فراجعه كويس.

~~~text null من غير login
{"data":{},"message":"Only superusers can perform this action.","status":403}
~~~

---

## ٢. صاحب الصف

~~~js
listRule: "owner = @request.auth.id",
viewRule: "owner = @request.auth.id",
~~~

[[owner]] حقل في الصف، و [[@request.auth.id]] رقم اللي بعت الطلب. لو مبعتش توكن قيمته فاضية، فالشرط مش هيتحقق.

---

## ٣. الإضافة

~~~js
createRule: "@request.auth.id != '' && owner = @request.auth.id",
~~~

الجزء الأول يعني لازم يكون داخل، والتاني يعني ميقدرش يضيف صف باسم حد تاني. جربنا سارة تضيف ملاحظة باسم مروان:

~~~text الناتج
{"data":{},"message":"Failed to create record.","status":400}
~~~

---

## ٤. التعديل وحماية الحقل

~~~js
updateRule: "owner = @request.auth.id && @request.body.owner:isset = false",
~~~

من غير الجزء التاني، صاحب الصف يقدر يبعت [[{"owner":"..."}]] وينقله لحد تاني. مع القاعدة دي الطلب رجّع 404.

---

## ٥. موظفين بس

حسابات الموظفين في جدول auth تاني اسمه [[staff]]:

~~~js
createRule: "@request.auth.collectionName = 'staff'",
~~~

~~~text الناتج
من غير login     400 Failed to create record.
يوزر عادي        400 Failed to create record.
موظف             200
~~~

---

## ٦. فلاتر الطلب بتمشي فوق القاعدة

~~~bash
curl -s "http://127.0.0.1:8790/api/collections/books/records?filter=price%3E100&sort=-price&fields=title,price&perPage=5"
~~~

~~~text الناتج
{"totalItems":1,"totalPages":1,"items":[{"price":120,"title":"دليل الجيب"}],"page":1,"perPage":5}
~~~

- [[filter]] شرط بنفس لغة القواعد، و [[%3E]] هي [[>]] بعد التشفير في الرابط.
- [[sort=-price]] تنازلي بسبب الـ [[-]].
- [[fields]] يرجّع حقول معينة بس، و [[expand=owner]] يجيب الصف المرتبط.

الفلتر عمره ما يوسّع الصلاحية: القاعدة بتتطبق الأول.

---

## الخلاصة

- ابدأ بـ [[null]] وافتح اللي محتاجه.
- القايمة بترجع فاضية، والصف الممنوع بيرجع 404، و [[null]] بترجع 403.
- القواعد للـ API بس. الكود في [[pb_hooks]] بيعدّيها.
- اختبر من يوزر عادي، مش superuser.`,
          lines: [
            "عرّف جدول الملاحظات في متغير.",
            "النوع base: جدول بيانات عادي.",
            "اسم الجدول اللي بيظهر في الـ API.",
            "القايمة: كل واحد يشوف ملاحظاته بس.",
            "فتح صف واحد: نفس الشرط.",
            "الإضافة: لازم تكون داخل، والصف باسمك انت.",
            "التعديل: صاحب الصف بس، وميقدرش يغيّر حقل owner.",
            "المسح: صاحب الصف بس.",
            "من هنا بتبدأ قايمة الحقول:",
            "صاحب الملاحظة: رابط لجدول users.",
            "نص الملاحظة، إجباري ومش أطول من 500 حرف.",
            "قفلة الحقول.",
            "قفلة تعريف الجدول."
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** جدول قواعده [[listRule: ""]] و [[createRule: null]]. إيه رد [[GET]] و [[POST]] من غير login؟`, done: R`تكتب الكودين قبل ما تجرب.`, sol: R`[[GET]] يرجّع 200 والصفوف، و [[POST]] يرجّع 403.

~~~text الناتج
[books list anon]   200 {"items":[{"title":"دليل الجيب", ...
[books create anon] 403 {"message":"Only superusers can perform this action."}
~~~

ده الشكل المعتاد لجدول منتجات: الكل يقراه، ومحدش يكتب فيه من المتصفح.` },
            { lvl: 'تطبيق', t: R`**صلّح:** جدول [[diary]] فيه يوميات خاصة وقواعد القراية [[""]]. أثبت إن فيه تسريب، وصلّحه، وأثبت إن صاحب الصف لسه بيقرا.`, done: R`الزائر يشوف صفر، وصاحب الصف يشوف صفه.`, sol: R`~~~bash
curl -s "http://127.0.0.1:8790/api/collections/diary/records?fields=text"
~~~

~~~js
migrate((app) => {
  const c = app.findCollectionByNameOrId("diary");
  c.listRule = "owner = @request.auth.id";
  c.viewRule = "owner = @request.auth.id";
  app.save(c);
}, (app) => {
  const c = app.findCollectionByNameOrId("diary");
  c.listRule = "";
  c.viewRule = "";
  app.save(c);
});
~~~

الغلطة الشائعة تقفلها بـ [[null]]، فصاحب الصف نفسه يتمنع.

~~~text الناتج
زائر قبل التصليح   200 {"items":[{"text":"سر سارة"}], ...
زائر بعد التصليح   200 {"items":[], "totalItems":0, ...
مروان              200 {"items":[], ...
سارة               200 {"items":[{"text":"سر سارة"}], ...
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** جدول [[news]] يقراه أي حد، ومحدش يكتب فيه غير حسابات جدول [[staff]].`, done: R`الزائر واليوزر يترفضوا، والموظف ينجح.`, sol: R`~~~js
migrate((app) => {
  app.save(new Collection({
    type: "base", name: "news",
    listRule: "", viewRule: "",
    createRule: "@request.auth.collectionName = 'staff'",
    updateRule: "@request.auth.collectionName = 'staff'",
    deleteRule: "@request.auth.collectionName = 'staff'",
    fields: [{ name: "headline", type: "text", required: true }],
  }));
}, (app) => {
  app.delete(app.findCollectionByNameOrId("news"));
});
~~~

[[collectionName]] بيفرّق بين جداول الحسابات. لو كتبت [[@request.auth.id != '']] بس، أي يوزر سجل من الموقع هيكتب أخبار.

~~~text الناتج
[anon write]  400 Failed to create record.
[user write]  400 Failed to create record.
[staff write] 200 {"headline":"عنوان", ...
[anon read]   200 {"items":[{"headline":"عنوان"}], ...
~~~` },
            { lvl: 'تحدي', t: R`**قارن:** اعمل نفس قاعدة «كل يوزر يشوف ملاحظاته» كـ policy في Postgres، وقارن شكل الرفض في الاتنين.`, done: R`تكتب فرقين حقيقيين.`, sol: R`~~~sql
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY notes_select ON notes FOR SELECT TO reader USING (owner = current_setting('app.uid', true));
~~~

~~~text الناتج على Postgres 16
 owner |  body
-------+---------
 sara  | سر سارة
(1 row)
~~~

الفرق الأول: الـ policy جوه القاعدة، فبتتطبق على أي حد بيكلّمها بدور [[reader]]، والقاعدة في PocketBase بتتطبق على طلبات الـ API بس. الفرق التاني: رفض الكتابة في Postgres خطأ صريح [[new row violates row-level security policy for table "notes"]]، وفي PocketBase [[Failed to create record.]] من غير سبب. والقراية الممنوعة بترجع فاضية في الاتنين. التفاصيل في درس «نقل المنطق بين PocketBase و Supabase».` }
          ]
        },
        {
          cmd: "PocketBase: الحسابات والـ SDK",
          title: "تسجيل ودخول وتوكن، وجدولين منفصلين للعملاء والموظفين",
          desc: R`أي جدول نوعه [[auth]] فيه إيميل وكلمة سر مشفرة، ومعاه مسارات جاهزة: [[auth-with-password]] و [[auth-refresh]] و [[request-password-reset]]. جدول [[users]] موجود من الأول.

الدخول بيرجّع توكن JWT، وبتبعته في header اسمه [[Authorization]] مع كل طلب. ومن JavaScript بتستخدم مكتبة [[pocketbase]].`,
          example: R`import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8790");

const auth = await pb.collection("users").authWithPassword("sara@example.com", "testpass123");
console.log(auth.record.name, pb.authStore.isValid);

const page = await pb.collection("books").getList(1, 2, { filter: "price > 5", sort: "-price", fields: "title,price" });
console.log(page.totalItems, page.items);

const note = await pb.collection("notes").create({ owner: auth.record.id, body: "من الـ SDK" });
console.log(note.body);

pb.authStore.clear();`,
          try: R`اعمل يوزر بطلب [[POST]] على [[/api/collections/users/records]]، وادخل بـ [[curl]]، وفك الجزء الأوسط من التوكن وشوف جواه إيه. وبعدين جرّب كلمة سر غلط.`,
          sol: R`الجزء الأوسط من الـ JWT بعد فك base64:

~~~text الناتج
{ collectionId: '_pb_users_auth_', exp: 1794300096, id: '7orehy3tvlki6v8', refreshable: true, type: 'auth' }
~~~

مفيش كلمة سر جواه، والتوكن مش مشفر، ده موقّع بس، فأي حد يقدر يقراه لكن مايقدرش يغيّره. وكلمة السر الغلط بترجّع [[400 Failed to authenticate.]] من غير ما تقول الإيميل موجود ولا لأ.`,
          flag: "script",
          deep: {
            why: "كتابة حسابات من الصفر فيها تشفير كلمات سر، وتوكنات، واستعادة كلمة السر، وحدود محاولات، وأي غلطة فيها خطر. هنا كل ده جاهز، وانت بتقرر مين يسجل ومين يقرا.",
            how: R`التوكن فيه [[id]] و [[collectionId]] و [[exp]]، وموقّع بمفتاح خاص بالصف، و [[tokenKey]] جزء منه. لما كلمة السر تتغير المفتاح بيتغير، فكل التوكنات القديمة بتموت. جربناها: بعد تغيير كلمة السر، التوكن القديم رجّع 401.

والمدة الافتراضية لجدول [[users]] في [[0.40.4]] خمس أيام ([[authToken.duration]] = 432000 ثانية)، وللـ superuser يوم واحد. و [[auth-refresh]] بيرجّع توكن جديد. الـ SDK بيحفظ التوكن في [[localStorage]] في المتصفح، و [[pb.authStore.clear()]] هو الخروج.

جدولين auth منفصلين بيدوا فصل حقيقي: [[$apis.requireAuth("staff")]] بيرفض أي توكن من [[users]]. ده أوضح من حقل [[role]] في جدول واحد، لأن عميل مش هيقدر يوصل لحساب موظف بتعديل حقل.`,
            when: "أي تطبيق محتاج login. جدول تاني للموظفين لو ليهم صلاحيات مختلفة. ولو محتاج Google و Facebook، فيه OAuth2 في إعدادات الجدول.",
            mistakes: R`ترك [[createRule]] بتاع [[users]] مفتوح وانت مش عايز تسجيل عام، أو عايز تتحكم في التسجيل من مسار: اقفله بـ [[null]]. وتوقّع إن [[request-password-reset]] يقولك الإيميل مش موجود: بيرجّع 204 دايمًا عشان محدش يعرف مين مسجل. وترك لينك الإيميل على [[/_/]] لو قفلتها في nginx: غيّر [[resetPasswordTemplate]].`
          },
          teach: R`## الفكرة

تسجيل الدخول طلب بيرجّع توكن، وكل طلب بعد كده بيبعت التوكن.

---

## ١. من [[curl]]

~~~bash
curl -s -X POST -H 'Content-Type: application/json' \
  -d '{"identity":"sara@example.com","password":"testpass123"}' \
  http://127.0.0.1:8790/api/collections/users/auth-with-password
~~~

[[identity]] هو الإيميل، أو أي حقل في [[identityFields]]. الرد فيه [[token]] و [[record]].

~~~text لو كلمة السر غلط
{"data":{},"message":"Failed to authenticate.","status":400}
~~~

---

## ٢. الـ SDK

اتجرّب بـ [[pocketbase@0.26.2]] على Node 24:

~~~js
const pb = new PocketBase("http://127.0.0.1:8790");
const auth = await pb.collection("users").authWithPassword("sara@example.com", "testpass123");
~~~

بعد السطر ده [[pb.authStore]] شايل التوكن، وكل طلب بعد كده بيبعته لوحده.

~~~text الناتج
سارة true
~~~

---

## ٣. القراية

~~~js
const page = await pb.collection("books").getList(1, 2, { filter: "price > 5", sort: "-price", fields: "title,price" });
~~~

[[getList(page, perPage, options)]] صفحة واحدة، و [[getFullList]] كله.

~~~text الناتج
1 [ { title: 'دليل الجيب', price: 120 } ]
~~~

---

## ٤. الأخطاء

الـ SDK بيرمي exception، عكس [[supabase-js]] اللي بيرجّع [[{ data, error }]]، فاستخدم [[try/catch]]:

~~~js
try {
  await pb.collection("secrets").getList(1, 5);
} catch (err) {
  console.log(err.status, err.message);
}
~~~

~~~text الناتج
403 Only superusers can perform this action.
~~~

---

## ٥. مين يقدر يوصل لمسار الموظفين

~~~js
routerAdd("GET", "/api/lab/me", (e) => e.json(200, { id: e.auth.id }), $apis.requireAuth("users"));
~~~

~~~text الناتج
من غير توكن     401 The request requires valid record authorization token.
توكن users      200
توكن superuser  403 The authorized record is not allowed to perform this action.
~~~

---

## الخلاصة

- [[401]] مفيش توكن صالح، و [[403]] التوكن من جدول مش مسموح.
- التوكن موقّع مش مشفر، فمتحطش فيه أسرار.
- تغيير كلمة السر بيقتل كل التوكنات القديمة.
- موظفين في جدول منفصل.`,
          lines: [
            "هات مكتبة PocketBase من npm.",
            "اعمل client بيكلّم السيرفر على الرابط ده.",
            "ادخل، والمكتبة بتحفظ التوكن.",
            "اطبع الاسم، وهل الجلسة صالحة.",
            "هات صفحة كتب بفلتر وترتيب وحقول معينة.",
            "اطبع العدد الكلي والصفوف.",
            "أضف ملاحظة باسمك، والقاعدة بتتأكد إنها باسمك فعلًا.",
            "اطبع النص اللي اتحفظ.",
            "اخرج: امسح التوكن من الجلسة."
          ],
          practice: [
            { lvl: 'سريع', t: R`**اشرحها:** إيه الفرق بين 401 و 403 في المسارات المحمية؟`, done: R`تكتب مثال حقيقي لكل واحد.`, sol: R`[[401]]: السيرفر مش عارف انت مين، مفيش توكن صالح. [[403]]: عارف انت مين، ومش مسموح لك.

~~~text الناتج
من غير توكن على /api/lab/me      401
توكن superuser على /api/lab/me   403
~~~` },
            { lvl: 'تطبيق', t: R`**ابني:** سكربت Node يدخل بيوزر، ويضيف ملاحظة، ويقرا عدد ملاحظاته، ويطبع رسالة الخطأ لو كلمة السر غلط.`, done: R`يطبع العدد، ورسالة [[Failed to authenticate.]].`, sol: R`~~~js
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8790");
const auth = await pb.collection("users").authWithPassword("sara@example.com", "testpass123");
await pb.collection("notes").create({ owner: auth.record.id, body: "من الـ SDK" });
const all = await pb.collection("notes").getFullList({ sort: "-id" });
console.log(all.length);

try {
  await pb.collection("users").authWithPassword("sara@example.com", "wrong");
} catch (err) {
  console.log(err.status, err.message);
}
~~~

و [[getFullList]] مش محتاج فلتر باسم اليوزر، لأن [[listRule]] بيفلتر لوحده.

~~~text الناتج
1
400 Failed to authenticate.
~~~` },
            { lvl: 'تطبيق', t: R`**قارن:** اعمل مسار [[requireAuth("staff")]]، وجرّب عليه توكن عميل وتوكن موظف.`, done: R`العميل 403 والموظف 200.`, sol: R`~~~js
routerAdd("GET", "/api/drill/staff-only", (e) => e.json(200, { hi: e.auth.email() }), $apis.requireAuth("staff"));
~~~

~~~text الناتج
[user on staff route]  403 The authorized record is not allowed to perform this action.
[staff on staff route] 200 {"hi":"staff@example.com"}
~~~` },
            { lvl: 'تحدي', t: R`**اقرا وتوقّع:** طلب [[request-password-reset]] بإيميل مش موجود هيرجّع إيه، وليه؟`, done: R`تشرح السبب الأمني.`, sol: R`~~~text الناتج
[reset unknown email] 204
~~~

نفس الرد للإيميل الموجود وغير الموجود. لو رجّع 404، أي حد يقدر يجرب قايمة إيميلات ويعرف مين عنده حساب عندك.` }
          ]
        },
        {
          cmd: "pb_hooks",
          title: "اكتب مسارات ومنطق بـ JavaScript جوه السيرفر",
          desc: R`أي ملف اسمه [[*.pb.js]] في [[pb_hooks]] بيتحمّل مع التشغيل. فيه بتكتب مسارات بـ [[routerAdd]]، وبتربط منطق قبل الحفظ وبعده بـ [[onRecordCreate]]، ومهام مجدولة بـ [[cronAdd]].

ده المكان لأي حاجة ماينفعش تتساب للمتصفح، زي السعر والموافقة والترقيم. الكود هنا بيعدّي API rules، فالتحقق من الصلاحية مسؤوليتك.`,
          example: R`routerAdd("POST", "/api/lab/loans", (e) => {
  const body = e.requestInfo().body || {};
  const book = e.app.findRecordById("books", String(body.book || ""));
  let number = 0;
  try {
    e.app.runInTransaction((tx) => {
      const c = tx.findFirstRecordByFilter("counters", "id != ''");
      number = c.getInt("seq") + 1;
      c.set("seq", number);
      tx.save(c);
      const rec = new Record(tx.findCollectionByNameOrId("loans"));
      rec.set("user", e.auth.id);
      rec.set("book", book.id);
      rec.set("status", "pending");
      rec.set("number", number);
      tx.save(rec);
    });
  } catch (err) {
    if (/must be unique/i.test(String(err))) throw new BadRequestError("loan_pending");
    throw err;
  }
  return e.json(200, { number });
}, $apis.requireAuth("users"));`,
          try: R`حط المسار في [[pb_hooks/main.pb.js]]، واطلبه مرتين لنفس الكتاب ونفس اليوزر، ومرة بيوزر تاني. الجدول فيه partial index زي درس الجداول.`,
          sol: R`~~~text الناتج
[loan 1]      200 {"number":1001}
[loan dup]    400 {"message":"Loan_pending."}
[loan marwan] 200 {"number":1002}
~~~

الطلب المرفوض مسحبش رقم، لأن الـ transaction رجعت كلها، فالعداد متغيرش.`,
          flag: "script",
          deep: {
            why: "اللي بيتحسب في المتصفح يقدر أي حد يغيّره. السعر والحالة والأرقام لازم تتقرر على السيرفر. والجدول يتقفل بـ null، والمسار هو الباب الوحيد.",
            how: R`الكود بيشتغل في goja، وده محرك JavaScript مكتوب بـ Go، مش Node. فمفيش [[fetch]] ومفيش npm، وبدلهم [[$http.send]] و [[require]] لملفاتك.

وكل handler بيشتغل في **سياق معزول**، فمبيشوفش المتغيرات اللي برة منه. جربنا متغير برة الـ handler:

الرد 400 [[Something went wrong]]، والسبب الحقيقي في اللوج بس: [[ReferenceError: GREETING is not defined]]. عشان كده أي كود مشترك يتحط في [[pb_hooks/lib/tools.js]] ويتعمل [[require]] جوه الـ handler.

والأخطاء: [[BadRequestError]] و [[ForbiddenError]] و [[NotFoundError]] و [[ApiError(status, msg)]]. PocketBase بيعدّل الرسالة، فـ [[invalid_email]] بتوصل [[Invalid_email.]]، أول حرف كبير ونقطة في الآخر. والـ frontend لازم يعدّلها قبل ما يقارن. وأي [[Error]] عادي بيطلع 400 برسالة عامة، فأسرار السيرفر مبتوصلش للعميل.

والـ [[e.next()]] لازم تتنادى في الـ hooks زي [[onRecordCreate]]، من غيرها العملية بتقف.`,
            when: "أي عملية فيها أكتر من جدول، أو حسابات، أو إرسال إيميل، أو منطق ماينفعش يبقى قاعدة. أما CRUD بسيط فسيبه للقواعد.",
            mistakes: R`متغير برة الـ handler. واستخدام [[e.app]] جوه [[runInTransaction]] بدل [[tx]]، فالكتابة تطلع برة العملية. ومقارنة خطأ التكرار بكلمة [[UNIQUE]]: الخطأ بيوصل كـ [[book: Value must be unique; user: Value must be unique.]]، فالـ catch مش بيمسكه. وجربناها فعلًا ورجّع رسالة عامة. وكمان تسيب ملف فيه خطأ: السيرفر بيقوم عادي والمسارات ناقصة.`
          },
          teach: R`## الفكرة

مسار بتكتبه انت، بيقرا الطلب، ويتأكد، ويكتب في أكتر من جدول مع بعض.

---

## ١. [[routerAdd]]

~~~js
routerAdd("POST", "/api/lab/loans", (e) => {
  ...
}, $apis.requireAuth("users"));
~~~

بياخد الـ method والمسار والدالة، وبعدها middlewares. و [[$apis.requireAuth("users")]] بيخلي المسار لحسابات [[users]] بس، و [[e.auth]] جوه الدالة هو اليوزر. وفيه [[$apis.bodyLimit(10 << 20)]] بيحدد حجم الطلب (10 ميجا)، والأكبر منه بيرجع [[413 Request entity too large.]].

---

## ٢. قراية الطلب

~~~js
const body = e.requestInfo().body || {};
const name = e.request.pathValue("name");
const loud = e.requestInfo().query.loud === "1";
~~~

[[body]] بيفهم JSON و multipart. و [[pathValue]] للجزء [[{name}]] في المسار، و [[query]] للي بعد [[?]].

---

## ٣. الـ transaction

~~~js
e.app.runInTransaction((tx) => {
  ...
  tx.save(c);
  tx.save(rec);
});
~~~

كل اللي جوه ينجح مع بعض أو يرجع كله. وجوه الدالة استخدم [[tx]] بس.

الرقم والحفظ لازم يبقوا مع بعض، وإلا طلبين في نفس اللحظة ياخدوا نفس الرقم.

---

## ٤. الخطأ بالظبط

في الأول كتبنا [[/UNIQUE/.test(String(err))]] وطلع:

~~~text الناتج الغلط
{"data":{"book":{"code":"validation_not_unique","message":"Value must be unique."},"user":{...}},"message":"Something went wrong while processing your request.","status":400}
~~~

طبعنا [[String(err)]] نفسه:

~~~text الناتج
GoError: book: Value must be unique; user: Value must be unique.
~~~

يعني PocketBase بيحوّل خطأ SQLite لرسالة تحقق. لما غيّرنا الشرط لـ [[/must be unique/i]]:

~~~text الناتج
{"data":{},"message":"Loan_pending.","status":400}
~~~

---

## ٥. شكل رسالة الخطأ

~~~text الناتج
throw new BadRequestError("loan_pending")         400 "Loan_pending."
throw new ApiError(409, "loan_pending")           409 "Loan_pending."
throw new Error("secret detail from server")      400 "Something went wrong while processing your request."
~~~

فالـ frontend لازم يرجّعها لأصلها قبل ما يقارن، وده التمرين اللي في آخر الدرس.

---

## ٦. السياق المعزول

~~~js
const GREETING = "اهلا";
routerAdd("GET", "/api/lab/outer", (e) => e.json(200, { message: GREETING }));
~~~

~~~text من /api/logs
ReferenceError: GREETING is not defined at /pb.js:2:33(5)
~~~

الحل ملف مشترك:

~~~js
routerAdd("GET", "/api/lab/inner", (e) => {
  const lib = require($__bt$__{__hooks}/lib/tools.js$__bt);
  return e.json(200, { message: lib.greet("نور") });
});
~~~

[[__hooks]] مسار فولدر الـ hooks. والملفات اللي مش منتهية بـ [[.pb.js]] مبتتحمّلش لوحدها، فـ [[lib/tools.js]] مبيتنفذش غير لما تعمله [[require]].

---

## ٧. SQL مباشر

~~~js
e.app.db().newQuery(
  "INSERT INTO hits (page, n) VALUES ({:page}, 1) ON CONFLICT (page) DO UPDATE SET n = n + 1"
).bind({ page }).execute();
~~~

[[{:page}]] متغير آمن، زي [[$1]] في Postgres، فمفيش SQL injection. وأمر واحد ده مفيهوش race: 20 طلب في نفس اللحظة طلّعوا [[n = 20]] بالظبط. ولو عايز تقرا: [[new DynamicModel({ n: 0 })]] و [[.one(row)]].

---

## ٨. hooks على الحفظ، ومهام مجدولة

~~~js
onRecordCreate((e) => {
  e.record.set("title", e.record.getString("title").trim());
  e.next();
}, "books");

cronAdd("lab_cleanup", "*/5 * * * *", () => {
  $app.logger().info("cleanup ran");
});
~~~

الـ hook بيشتغل سواء الحفظ من الـ API أو من الكود. عنوان فيه مسافات اتحفظ [[كتاب بمسافات]] من غيرها. و [[/api/crons]] بيوري مهامك مع مهام PocketBase نفسها.

---

## الخلاصة

| محتاج | استخدم |
|---|---|
| مسار جديد | [[routerAdd]] مع [[requireAuth]] |
| أكتر من كتابة مع بعض | [[runInTransaction]] و [[tx]] |
| كود مشترك | [[require]] جوه الـ handler |
| خطأ بكود معروف | [[BadRequestError]] |
| منطق قبل أي حفظ | [[onRecordCreate]] مع [[e.next()]] |
| مهمة دورية | [[cronAdd]] |`,
          lines: [
            "سجّل مسار POST جديد على الرابط ده.",
            "اقرا جسم الطلب، ولو فاضي خليه object.",
            "هات الكتاب من القاعدة، ولو مش موجود يرجع 404.",
            "متغير للرقم عشان نستخدمه برة الـ transaction.",
            "امسك أي خطأ يحصل في الحفظ تحت.",
            "كل اللي جاي ينجح مع بعض أو يرجع كله.",
            "هات صف العداد من جوه العملية.",
            "احسب الرقم الجديد: القيمة الحالية زائد 1.",
            "حط القيمة الجديدة في صف العداد.",
            "احفظ العداد جوه نفس العملية بـ tx.",
            "جهّز صف طلب جديد في جدول loans.",
            "الطلب باسم اللي عامل login.",
            "اربط الطلب بالكتاب اللي جبناه من القاعدة.",
            "الحالة تبدأ pending لحد ما حد يراجعها.",
            "حط الرقم المتسلسل اللي حسبناه فوق.",
            "احفظ الطلب جوه نفس العملية بـ tx.",
            "هنا بتخلص العملية، وبتتأكد كلها مرة واحدة.",
            "لو الحفظ فشل:",
            "طلب مكرر: رجّع كود مفهوم.",
            "أي خطأ تاني يطلع زي ما هو.",
            "هنا بيخلص جزء التعامل مع الخطأ.",
            "رجّع الرقم للي طلب بكود 200.",
            "اقفل المسار، ومتسمحش غير لحسابات users."
          ],
          practice: [
            { lvl: 'سريع', t: R`**صلّح:** المسار ده بيرجّع 400 [[Something went wrong]]. ليه؟ [[const GREETING = "اهلا"; routerAdd("GET", "/x", (e) => e.json(200, { m: GREETING }));]]`, done: R`المسار يرجّع 200.`, sol: R`كل handler في سياق معزول، فمش شايف [[GREETING]]. انقله جوه الدالة، أو في ملف [[require]]:

~~~js
routerAdd("GET", "/x", (e) => {
  const GREETING = "اهلا";
  return e.json(200, { m: GREETING });
});
~~~

~~~text الناتج
قبل: [outer var] 400 Something went wrong while processing your request.
بعد: 200 {"m":"اهلا"}
~~~` },
            { lvl: 'تحدي', t: R`**مسألة:** اكتب [[codeOf(message)]] بترجّع كود الخطأ لأصله، عشان الـ frontend يقارنه.`, done: R`الاختبارات كلها تعدّي.`, sol: R`~~~js
function codeOf(message) {
  return String(message || "").toLowerCase().replace(/\.$/, "").replace(/\s+/g, "_");
}
~~~

[[\.$]] نقطة في آخر النص بس. والمسافات بتتحول لـ [[_]] عشان رسايل PocketBase نفسها، زي [[Failed to authenticate.]]، تبقى كود برضه.

~~~text الناتج
codeOf("Invalid_email.")          invalid_email
codeOf("Failed to authenticate.") failed_to_authenticate
codeOf(undefined)                 (نص فاضي)
~~~` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[if (/UNIQUE/.test(String(err))) throw new BadRequestError("loan_pending");]] مش بيمسك الطلب المكرر. لاقي السبب بنفسك من ناتج [[String(err)]].`, done: R`الرد يبقى [[Loan_pending.]].`, sol: R`~~~js
if (/must be unique/i.test(String(err))) throw new BadRequestError("loan_pending");
~~~

الخطأ مش نص SQLite الخام، ده رسالة تحقق: [[book: Value must be unique; user: Value must be unique.]]. والـ [[i]] بتتجاهل حالة الحروف. متخمنش شكل الخطأ: اطبعه.

~~~text الناتج
{"data":{},"message":"Loan_pending.","status":400}
~~~` },
            { lvl: 'تطبيق', t: R`**اقرا وتوقّع:** 20 طلب متوازي على [[INSERT ... ON CONFLICT DO UPDATE SET n = n + 1]]. أكبر [[n]] هترجع كام؟ وكان هيحصل إيه لو قريت وزوّدت وكتبت؟`, done: R`تجربها وتطلع 20.`, sol: R`~~~js
const par = await Promise.all(Array.from({ length: 20 }, () => fetch(B + "/api/lab/hit/race", { method: "POST" }).then((r) => r.json())));
console.log(Math.max(...par.map((x) => x.n)));
~~~

~~~text الناتج
parallel max 20
~~~

الأمر الواحد القاعدة بتنفذه كوحدة. أما قراية وبعدها كتابة، فطلبين ممكن يقروا نفس القيمة ويضيع واحد.` },
            { lvl: 'تحدي', t: R`**ابني:** hook يشيل المسافات من أول وآخر عنوان أي كتاب قبل الحفظ، ومسار بحد 1 كيلوبايت.`, done: R`عنوان بمسافات يتحفظ نضيف، وطلب 5000 حرف يرجّع 413.`, sol: R`~~~js
onRecordCreate((e) => {
  e.record.set("title", e.record.getString("title").trim());
  e.next();
}, "books");

routerAdd("POST", "/api/lab/small", (e) => {
  const body = e.requestInfo().body || {};
  return e.json(200, { got: String(body.a || "").length });
}, $apis.bodyLimit(1024));
~~~

نسيان [[e.next()]] بيوقف الحفظ كله.

~~~text الناتج
[onRecordCreate trims] 200 {"title":"كتاب بمسافات", ...
[small ok]      200 {"got":100}
[small too big] 413 {"message":"Request entity too large."}
~~~` }
          ],
          check: {
            lang: "js",
            starter: R`function codeOf(message) {
  // رجّع الكود: حروف صغيرة، من غير نقطة في الآخر، والمسافات _
}`,
            tests: R`test("كود بسيط", () => expect(codeOf("Invalid_email.")).toBe("invalid_email"));
test("رسالة بمسافات", () => expect(codeOf("Failed to authenticate.")).toBe("failed_to_authenticate"));
test("من غير نقطة", () => expect(codeOf("network")).toBe("network"));
test("قيمة فاضية", () => expect(codeOf(undefined)).toBe(""));`,
            solution: R`function codeOf(message) {
  return String(message || "").toLowerCase().replace(/\.$/, "").replace(/\s+/g, "_");
}`
          }
        },
        {
          cmd: "PocketBase: الملفات",
          title: "رفع ملفات، وملف عام، وملف محمي بيتقدم من مسار",
          desc: R`الملف حقل في الجدول نوعه [[file]]، والرفع بيبقى multipart. الملف العام ليه لينك مباشر، و [[protected: true]] بيخليه محتاج صلاحية.

و PocketBase بيفحص نوع الملف من محتواه مش من اسمه، فملف HTML اسمه [[x.png]] بيترفض.`,
          example: R`routerAdd("GET", "/api/lab/scan/{id}", (e) => {
  const note = e.app.findRecordById("notes", e.request.pathValue("id"));
  if (note.getString("owner") !== e.auth.id) throw new ForbiddenError("not_yours");
  const fsys = e.app.newFilesystem();
  try {
    const reader = fsys.getReader(note.baseFilesPath() + "/" + note.getString("scan"));
    try {
      e.response.header().set("Cache-Control", "private, no-store");
      e.stream(200, reader.contentType(), reader);
    } finally {
      reader.close();
    }
  } finally {
    fsys.close();
  }
}, $apis.requireAuth("users"));`,
          try: R`أضف حقل [[scan]] محمي لجدول الملاحظات، وارفع صورة، وجرّب تفتحها من اللينك المباشر، وبتوكن ملف من صاحبها، وبتوكن ملف من يوزر تاني.`,
          sol: R`~~~text الناتج
من غير توكن                  404
توكن ملف من صاحب الملاحظة    200 image/png
توكن ملف من يوزر تاني        404
المسار من صاحب الملاحظة      200 image/png  private, no-store
المسار من يوزر تاني          403 Not_yours.
~~~`,
          flag: "script",
          deep: {
            why: "إيصالات الدفع وصفحات كتاب مدفوع مايتحطوش على لينك عام. لو اللينك اتشارك، أي حد يفتحه. الملف المحمي بيربط الوصول بالصلاحية.",
            how: R`الملف بيتخزن في [[pb_data/storage/<collection>/<record>/]] باسم جديد فيه رقم عشوائي، زي [[azzpu3tf2h1_h0m13lpz0s.png]]، فالاسم مش بيتخمن ومفيش تصادم.

الملف العام على [[/api/files/<collection>/<record>/<filename>]]. أما المحمي فمحتاج [[?token=]] من [[POST /api/files/token]]، والتوكن ده عمره 3 دقايق بس (180 ثانية)، و PocketBase بيطبق [[viewRule]] بتاعة الجدول عليه.

وبديل تاني: مسار بتكتبه انت يبعت الملف بعد ما يتحقق بنفسه، ومفيش توكن في اللينك أصلًا. المتصفح بيجيب الملف بـ [[fetch]] ومعاه [[Authorization]]، ويعرضه بـ [[URL.createObjectURL]].

و [[e.stream]] بيبعت الملف من غير ما يحمّله كله في الذاكرة.

والحقل فيه [[maxSize]] و [[mimeTypes]] و [[maxSelect]]. والتعديل: [[attachments+]] يضيف، و [[attachments-]] يشيل.`,
            when: "عام: غلاف كتاب أو صورة منتج. توكن ملف: مرفق يوزر بيفتحه من لينك في صفحته. مسار: لما تحتاج منطق أكتر من viewRule، زي «اشترى الكتاب ده؟».",
            mistakes: R`نسيان [[protected: true]] على ملف خاص: جربناها على جدول كل قواعده [[null]]، والصف نفسه رجّع 403 واللينك المباشر للملف رجّع 200. والثقة في امتداد الملف أو [[Content-Type]] اللي العميل بعته. ونسيان [[reader.close()]] فالملفات تفضل مفتوحة. ورفع SVG كصورة عامة، لأن SVG ممكن يبقى فيه سكربت.`
          },
          teach: R`## الفكرة

الملف العام لينك، والمحمي صلاحية.

---

## ١. الحقل

~~~js
{ name: "cover", type: "file", maxSelect: 1, maxSize: 2097152, mimeTypes: ["image/png", "image/jpeg", "image/webp"] },
{ name: "scan", type: "file", maxSelect: 1, maxSize: 2097152, protected: true, mimeTypes: ["image/png", "application/pdf"] },
~~~

[[maxSize]] بالبايت (2097152 = 2 ميجا).

---

## ٢. الرفع

~~~bash
curl -s -X PATCH -H "Authorization: $TOKEN" -F "cover=@cover.png" http://127.0.0.1:8790/api/collections/books/records/$ID
~~~

[[-F]] بيبعت multipart، و [[@]] معناها اقرا الملف ده. والرد فيه اسم الملف الجديد.

---

## ٣. الملف العام

~~~text الناتج
GET /api/files/books/<id>/azzpu3tf2h1_h0m13lpz0s.png
200 image/png  inline; filename="azzpu3tf2h1_h0m13lpz0s.png"
~~~

---

## ٤. الفحص من المحتوى

بعتنا نص HTML باسم [[x.png]] و [[Content-Type: image/png]]:

~~~text الناتج
{"data":{"cover":{"code":"validation_invalid_mime_type","message":"\"xzcrgye6nom_4suxegmehg.png\" mime type must be one of: image/png, image/jpeg, image/webp."}},"message":"Failed to update record.","status":400}
~~~

يعني الكذب في الاسم والـ header مش بيعدّي.

---

## ٥. المحمي بتوكن ملف

~~~bash
curl -s -X POST -H "Authorization: $TOKEN" http://127.0.0.1:8790/api/files/token
~~~

بيرجّع [[{"token":"..."}]]، وبعدين [[.../file.png?token=...]]. وتوكن يوزر تاني رجّع 404، لأن [[viewRule]] رفضت.

---

## ٦. المحمي من مسار

المثال فوق بيعمل ده. سطر سطر:

~~~js
const fsys = e.app.newFilesystem();
~~~

[[newFilesystem]] بيفتح مكان التخزين، سواء ديسك أو S3، فالكود مش بيتغير.

~~~js
const reader = fsys.getReader(note.baseFilesPath() + "/" + note.getString("scan"));
~~~

[[baseFilesPath]] هو فولدر الصف، و [[getString("scan")]] اسم الملف.

~~~js
e.response.header().set("Cache-Control", "private, no-store");
e.stream(200, reader.contentType(), reader);
~~~

[[private, no-store]] يمنع أي proxy من حفظ الملف. و [[finally]] بيقفل الاتنين حتى لو حصل خطأ.

ومن المتصفح:

~~~js
const res = await fetch("/api/lab/scan/" + id, { headers: { Authorization: token } });
img.src = URL.createObjectURL(await res.blob());
~~~

[[<img src>]] مبيبعتش headers، فالصورة بتتجاب بـ [[fetch]] وتتعرض من الذاكرة.

---

## الخلاصة

| الطريقة | فيها لينك؟ | مين بيتحقق |
|---|---|---|
| ملف عام | لينك ثابت | محدش |
| محمي بتوكن ملف | لينك قصير العمر | [[viewRule]] |
| محمي من مسار | لأ، مع [[Authorization]] | الكود بتاعك |`,
          lines: [
            "مسار فيه id الملاحظة.",
            "هات الملاحظة بالـ id، ولو مش موجودة يرجع 404.",
            "لو مش بتاعتك يرجع 403.",
            "افتح مكان التخزين، ديسك أو S3 حسب الإعدادات.",
            "امسك أي خطأ عشان تقفل.",
            "افتح الملف من فولدر الصف باسمه.",
            "وبرضه امسك أي خطأ.",
            "الملف خاص، متتخزنش في أي cache.",
            "ابعت الملف بنوعه الحقيقي.",
            "لازم نقفل حتى لو حصل خطأ:",
            "اقفل الملف بعد ما يتبعت.",
            "هنا بيخلص الجزء الداخلي.",
            "والجزء الأخير بيتنفذ دايمًا كمان:",
            "اقفل اتصال مكان التخزين.",
            "هنا بيخلص الجزء الخارجي.",
            "المسار لحسابات users بس."
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** ملف [[protected: true]] في جدول [[viewRule]] بتاعه [[owner = @request.auth.id]]. طلب اللينك المباشر من غير توكن هيرجّع إيه؟`, done: R`تكتب الكود قبل ما تجرب.`, sol: R`~~~text الناتج
scan no token 404 {"message":"The requested resource wasn't found."}
~~~

404 مش 403: PocketBase مش بيقول إن الملف موجود.` },
            { lvl: 'تطبيق', t: R`**صلّح:** حد رفع ملف HTML باسم [[photo.png]] على حقل صور. اكتب تجربة تثبت إن PocketBase بيرفضه، واشرح ليه ده مهم حتى لو الاسم [[.png]].`, done: R`تشوف [[validation_invalid_mime_type]].`, sol: R`~~~js
const f = new FormData();
f.set("cover", new Blob(["<script>alert(1)</script>"], { type: "image/png" }), "photo.png");
const r = await fetch(B + "/api/collections/books/records/" + id, { method: "PATCH", headers: { Authorization: token }, body: f });
console.log(r.status, (await r.json()).data.cover.code);
~~~

~~~text الناتج
400 validation_invalid_mime_type
~~~

لو الملف ده اتقدم كصفحة من موقعك، السكربت جواه يشتغل باسم موقعك ويقرا جلسات اليوزر (XSS). عشان كده الفحص من المحتوى، مش من اللي العميل بيقوله.` },
            { lvl: 'تحدي', t: R`**ابني:** صفحة كتاب محمية: مسار يرجّع صورة الصفحة بس لو اليوزر عنده صف في [[library]].`, done: R`مالك الكتاب 200، وغيره 403.`, sol: R`~~~js
routerAdd("GET", "/api/raff/read/{slug}/{n}", (e) => {
  const book = e.app.findFirstRecordByData("books", "slug", e.request.pathValue("slug"));
  try {
    e.app.findFirstRecordByFilter("library", "user = {:u} && book = {:b}", { u: e.auth.id, b: book.id });
  } catch (err) {
    throw new ForbiddenError("not_owned");
  }
  const page = e.app.findFirstRecordByFilter("book_pages", "book = {:b} && n = {:n}", {
    b: book.id, n: parseInt(e.request.pathValue("n"), 10),
  });
  const fsys = e.app.newFilesystem();
  try {
    const reader = fsys.getReader(page.baseFilesPath() + "/" + page.getString("image"));
    try {
      e.response.header().set("Cache-Control", "private, max-age=3600");
      e.response.header().set("Vary", "Authorization");
      e.stream(200, reader.contentType(), reader);
    } finally { reader.close(); }
  } finally { fsys.close(); }
}, $apis.requireAuth("users"));
~~~

[[Vary: Authorization]] بيخلي الـ cache يعتبر كل توكن نسخة منفصلة، فيوزر تاني على نفس الجهاز ميشوفش صفحة محفوظة.

~~~text الناتج
ok   page locked before payment
ok   page opens after approve
ok   other customer locked
~~~` }
          ]
        },
        {
          cmd: "PocketBase: realtime",
          title: "الصفحة تعرف بالتغيير من غير ما تسأل",
          desc: R`PocketBase بيبعت التغييرات بـ SSE (اتصال HTTP مفتوح في اتجاه واحد): بتفتح [[/api/realtime]]، وتبعت الموضوع اللي عايزه، زي [[books/*]]، وكل إضافة أو تعديل أو مسح بيوصلك.

وقواعد [[listRule]] بتتطبق هنا كمان، فاليوزر مش بيستلم صف مش من حقه.`,
          example: R`const pb = new PocketBase("http://127.0.0.1:8790");
await pb.collection("users").authWithPassword("sara@example.com", "testpass123");

await pb.collection("notes").subscribe("*", (e) => {
  console.log(e.action, e.record.body);
});

pb.collection("notes").unsubscribe("*");`,
          try: R`افتح الاتصال بـ [[curl -N]]، وهتلاقي [[clientId]] في أول حدث. ابعته في [[POST /api/realtime]] مع [[books/*]]، وأضف كتاب من ترمنال تاني.`,
          sol: R`~~~text الناتج
id:LETb...
event:PB_CONNECT
data:{"clientId":"LETb..."}

event:books/*
data:{"record":{"collectionName":"books","price":10,"title":"كتاب جديد", ...},"action":"create"}
~~~`,
          flag: "script",
          deep: {
            why: "لوحة طلبات لازم تعرف إن فيه طلب جديد. السؤال كل ثانية بيضيع موارد، والتأخير بيبقى كبير. الاتصال المفتوح بيوصل الحدث أول ما يحصل.",
            how: R`الخطوات اتنين، وده بيلخبط أول مرة: [[GET /api/realtime]] بيفتح الاتصال وبيرجّع [[clientId]]، و [[POST /api/realtime]] بيحدد المواضيع. والتوكن بيتبعت في الـ [[POST]] ده، فالسيرفر يعرف مين صاحب الاتصال.

الموضوع: [[books/*]] كل الجدول، أو [[books/RECORD_ID]] صف واحد.

SSE في اتجاه واحد من السيرفر للمتصفح، عكس WebSocket. ده كفاية لأن الكتابة بتروح بطلبات عادية. والمتصفح بيعيد الاتصال لوحده.

في Node مفيش [[EventSource]] (على Node 24 طلعت [[undefined]])، فالـ SDK محتاج polyfill، أو استخدمه من المتصفح. عشان كده المثال اتجرّب بطلبات يدوية، والـ SDK من الوثائق.`,
            when: "لوحة تحكم، وإشعارات، وشات بسيط، ومتابعة حالة طلب. لو محتاج presence أو رسايل بين اليوزرز من غير قاعدة، Supabase Realtime عنده Broadcast و Presence جاهزين.",
            mistakes: R`نسيان [[unsubscribe]] لما الصفحة أو الـ component يتقفل، فالرسايل توصل مرتين. وفتح [[/api/realtime]] في nginx من غير ما تقفل الـ buffering، فالأحداث تتأخر. وتوقّع إن الاشتراك يتجاوز القواعد: مش بيتجاوزها.`
          },
          teach: R`## الفكرة

اتصال مفتوح، والسيرفر بيبعت عليه الأحداث.

---

## ١. افتح الاتصال

~~~bash
curl -s -N http://127.0.0.1:8790/api/realtime
~~~

[[-N]] يمنع [[curl]] من التخزين المؤقت، فكل سطر يظهر أول ما يوصل.

~~~text الناتج
id:LETbfDcjob5tDUimGNaN9XW2s8TxOZrzzYsQrIp8
event:PB_CONNECT
data:{"clientId":"LETbfDcjob5tDUimGNaN9XW2s8TxOZrzzYsQrIp8"}
~~~

---

## ٢. اشترك

~~~bash
curl -s -X POST -H 'Content-Type: application/json' \
  -d '{"clientId":"LETb...","subscriptions":["books/*"]}' \
  http://127.0.0.1:8790/api/realtime
~~~

بيرجّع 204. ولو عايز هويتك تتحسب، ابعت [[Authorization]] في الطلب ده.

---

## ٣. الحدث

بعد إضافة كتاب:

~~~text الناتج
event:books/*
data:{"record":{"collectionName":"books","price":10,"title":"كتاب جديد", ...},"action":"create"}
~~~

و [[action]] بيبقى [[create]] أو [[update]] أو [[delete]].

---

## ٤. القواعد شغالة

تلات اتصالات على [[diary/*]] والقاعدة [[owner = @request.auth.id]]، وسارة أضافت صف:

~~~text الناتج
anon events 0   sara events 1   marwan events 0
~~~

---

## ٥. من المتصفح

~~~js
await pb.collection("notes").subscribe("*", (e) => {
  console.log(e.action, e.record.body);
});
~~~

الـ SDK بيعمل الخطوتين ويعيد الاتصال، وده من وثائق PocketBase، لأن Node مفيهوش [[EventSource]].

---

## الخلاصة

- [[GET]] يفتح، و [[POST]] يشترك، والتوكن في الـ [[POST]].
- [[listRule]] بتتطبق على الأحداث.
- [[unsubscribe]] لما الصفحة تتقفل.`,
          lines: [
            "اعمل client بيكلّم السيرفر على الرابط ده.",
            "ادخل عشان القواعد تعرف انت مين.",
            "اشترك في كل صفوف notes المسموحة لك.",
            "مع كل تغيير: اطبع نوعه والنص.",
            "قفلة الاشتراك.",
            "الغي الاشتراك لما تخلص."
          ],
          practice: [
            { lvl: 'سريع', t: R`**اشرحها:** ليه PocketBase بيستخدم طلبين، [[GET]] و [[POST]]، بدل طلب واحد؟`, done: R`إجابة في ٣ سطور.`, sol: R`[[GET]] اتصال SSE مفتوح في اتجاه واحد، فمش بتقدر تبعت عليه حاجة بعد ما يفتح. فالسيرفر بيدّيك [[clientId]]، وانت بتبعت طلب عادي يحدد المواضيع ويغيّرها في أي وقت، والتوكن معاه.` },
            { lvl: 'تطبيق', t: R`**ابني:** سكربت Node يفتح [[/api/realtime]] بـ [[fetch]]، ويستنى [[PB_CONNECT]]، ويشترك، ويطبع أول حدث.`, done: R`يطبع [[action]] بتاع الحدث.`, sol: R`~~~js
const B = "http://127.0.0.1:8790";
const res = await fetch(B + "/api/realtime");
const reader = res.body.getReader();
const dec = new TextDecoder();
let buf = "", subscribed = false;
for (;;) {
  const { value, done } = await reader.read();
  if (done) break;
  buf += dec.decode(value);
  for (const m of buf.matchAll(/event:(.+)\ndata:(.+)\n/g)) {
    if (m[1] === "PB_CONNECT" && !subscribed) {
      subscribed = true;
      await fetch(B + "/api/realtime", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId: JSON.parse(m[2]).clientId, subscriptions: ["books/*"] }),
      });
    } else if (m[1] === "books/*") {
      console.log(JSON.parse(m[2]).action);
      process.exit(0);
    }
  }
}
~~~

[[res.body.getReader()]] بيقرا الرد حتة حتة بدل ما يستنى آخره، لأن الاتصال ده مش بيخلص.

~~~text الناتج بعد إضافة كتاب
create
~~~` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** أثبت إن اليوزر التاني مش بيستلم صف مش بتاعه، بتلات اتصالات.`, done: R`الأرقام: 0 و 1 و 0.`, sol: R`افتح تلات اتصالات زي التمرين اللي فات: واحد من غير توكن، وواحد لسارة، وواحد لمروان، كل واحد بـ [[Authorization]] بتاعه في طلب الاشتراك على [[diary/*]]. وبعدين خلي سارة تضيف صف، واستنى ثانية.

~~~text الناتج
sub 204 204 204
anon events 0 sara events 1 marwan events 0
~~~

الاختبار ده مهم لأن الـ 204 بتاعة الاشتراك مش معناها إنك هتستلم حاجة. القاعدة بتتطبق على كل حدث.` }
          ]
        }
      ]
    }
]);
