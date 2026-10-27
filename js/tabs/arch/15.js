// تكملة تاب arch: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/arch/01.js (شرح حقول الدرس في أوله)
MORE("arch", [
    {
      t: "Microservices بجد",
      l: 3,
      n: "إمتى تقسّم الـ modular monolith فعلًا، وكل خدمة تملك داتتها، وإزاي الخدمات تلاقي بعض وتكلّم بعض من ورا gateway، وإمتى الكلام يبقى HTTP وإمتى events",
      items: [
        {
          cmd: "إمتى تقسّم لـ microservices",
          title: "علامات إن الـ monolith لازم يتقسم، وعلامات إنه لأ",
          desc: R`microservice = جزء من النظام بيتنشر لوحده، وبيملك داتته، وبيكلّم الباقي من خلال API أو events بس. ده بيحل مشكلة **تنظيمية** أساسًا: فرق كتير بتتعطل على بعض في نفس الكود ونفس الـ deploy. مش مشكلة أداء.

القاعدة: ابدأ modular monolith (درس [[modular monolith أولًا]] في «أسئلة انترفيو»)، وطلّع خدمة لما يبقى فيه سبب تقدر تكتبه في سطر: فريق مستقل محتاج ينشر لوحده، أو جزء حمله أو لغته أو أمانه مختلف تمامًا. وبتطلّع module حدوده واضحة أصلًا، واحد واحد (strangler fig)، مش تقسيم كله مرة واحدة.`,
          example: R`# 1. اسأل: مين بينشر الجزء ده، وكام مرة، وبيتعطل على مين؟
git log --since=90.days --format=%an -- src/modules/payments | sort | uniq -c | sort -rn
# 2. الـ module ده بيلمس جداول مين؟ لو بيعمل JOIN على جداول modules تانية، حدوده مش جاهزة
grep -rn "prisma\.\(order\|user\|course\)\." src/modules/payments | wc -l
# 3. مين بينادي الـ module ده من برّه؟ ده اللي هيبقى الـ API بتاعه
grep -rln "from \"../payments" src/modules | grep -v "^src/modules/payments"`,
          try: R`خد مشروعك (أو أي monolith على GitHub) واختار module واحد. جاوب على الأسئلة التلاتة بالأوامر، واكتب جدول: الـ API اللي هيتعرض، والجداول اللي هيملكها، والـ events اللي هيطلّعها، والداتا اللي محتاجها من غيره، وإيه اللي هيحصل للمستخدم لو الخدمة دي وقعت ١٠ دقايق. لو ملقتش سبب حقيقي، النتيجة «متقسّمش».`,
          flag: "script",
          deep: {
            why: "التقسيم بدري من أغلى الغلطات في الـ backend: كل نداء دالة بقى طلب شبكة بيفشل، والـ transactions بقت sagas، والـ debugging بقى في ٥ لوجات، والـ deploy محتاج ترتيب. وفي نفس الوقت، monolith كبير بـ ٥٠ مطوّر بيعمل merge conflicts و deploys بتستنى بعض وأي bug بيوقّع كله. السؤال مش «إيه الأحسن»، السؤال «إمتى».",
            how: R`علامات حقيقية للتقسيم:
- **فرق**: أكتر من فريق بيعدّل في نفس الكود، وكل release بيستنى الكل (قانون Conway: شكل النظام بيطلع زي شكل الفرق).
- **حمل مختلف**: جزء محتاج ٥٠ نسخة (معالجة فيديو، بحث) والباقي نسختين. ولو بتعمل scale للـ monolith كله عشان جزء واحد، ده هدر.
- **تقنية مختلفة**: ML بـ Python، أو جزء محتاج Go للأداء.
- **أمان أو compliance**: الدفع (PCI DSS) يتعزل عشان باقي الكود ميبقاش في الـ scope.
- **معدل تغيير مختلف**: جزء بيتغير كل يوم وجزء ثابت من سنة.

علامات إنه لأ:
- فريق واحد صغير.
- الحدود مش واضحة: كل feature بتلمس كل الـ modules.
- الـ modules بتعمل JOIN على جداول بعض.
- محتاج transactions بين الجزئين في كل عملية تقريبًا.
- السبب «عشان الـ scale» من غير أرقام.

إزاي: **strangler fig**. حط gateway أو routing قدام الـ monolith، وطلّع الـ module الجديد كخدمة، ووجّه مسار واحد ليها، وزوّد تدريجيًا، والـ monolith يفضل شغال. والـ module لازم يبقى معزول **جوه** الـ monolith الأول: الـ API بتاعه واضح، ومحدش بيلمس جداوله. لو مش قادر تعزله وهو في نفس الـ process، مش هتقدر تعزله وبينهم شبكة.

الحجم: «micro» مش معناه صغير. خدمة لكل bounded context (الطلبات، والدفع، والكتالوج)، مش خدمة لكل جدول أو لكل endpoint. خدمات صغيرة جدًا = distributed monolith: كل حاجة بتنادي كل حاجة، ومينفعش تنشر واحدة من غير التانية.`,
            when: "قبل أي قرار تقسيم، وفي أسئلة system design لما الإنترفيوير يسأل «هتعملها microservices؟». الإجابة الكويسة بتبدأ بالأسباب والتمن، مش بالرسمة.",
            mistakes: R`تقسّم بالطبقات (خدمة للـ auth، وخدمة للقاعدة، وخدمة للـ business logic) بدل الميزات. خدمات بتشارك نفس القاعدة ونفس الجداول (أي تغيير في schema بيكسر الكل). تقسّم كله مرة واحدة (big bang rewrite). خدمات بتنادي بعض بالتسلسل في كل طلب (A تنادي B تنادي C) فالـ latency بتتجمع وأي واحدة تقع توقّع الكل. تقسّم قبل ما يبقى عندك CI/CD و logs مركزية و tracing.`
          },
          teach: R`## التلات أسئلة بالأوامر

مفيش أمر بيقولك «قسّم». الأوامر دي بتطلّع أرقام من الكود تجاوب بيها على الأسئلة اللي بتحدد إذا كان module جاهز يطلع خدمة. اتجرّبت في Git Bash على ويندوز 11 على repo تجربة صغير فيه [[src/modules/payments]] و [[orders]] و [[courses]] و ٤ commits من شخصين (نفس الأوامر بالظبط في لينكس والماك و WSL). الأرقام اللي تحت من الـ repo ده، وعلى مشروع حقيقي هتبقى أكبر. وأسامي الـ modules والجداول مثال: غيّرها بتاعتك.

---

## ١. مين بيعدّل في الـ module ده؟

~~~bash
git log --since=90.days --format=%an -- src/modules/payments | sort | uniq -c | sort -rn
~~~

من جوه لبرة:

| الحتة | بتعمل إيه |
|---|---|
| [[git log --since=90.days]] | الـ commits في آخر ٩٠ يوم |
| [[--format=%an]] | اطبع اسم الـ author بس (an = author name) |
| [[-- src/modules/payments]] | الـ commits اللي لمست الفولدر ده بس. الـ [[--]] بتفصل الـ options عن المسارات |
| [[sort]] | رتّب الأسامي عشان المتكرر يبقى جنب بعض |
| [[uniq -c]] | اجمع المتكرر واكتب العدد قدامه (c = count) |
| [[sort -rn]] | رتّب بالرقم (n) من الكبير للصغير (r = reverse) |

~~~text الناتج
      3 Sara
      1 Omar
~~~

لو اسم أو فريق واحد هو اللي بيلمس الـ module، وفي نفس الوقت بيتعطل على باقي الفرق في الـ deploy، دي علامة. ولو كل الفريق (٣ أشخاص) بيلمس كل حاجة: مفيش سبب تنظيمي.

## ٢. بيلمس داتا مين؟

~~~bash
grep -rn "prisma\.\(order\|user\|course\)\." src/modules/payments | wc -l
~~~

- [[grep -rn]]: دوّر في كل الملفات تحت الفولدر (r = recursive) واطبع رقم السطر (n).
- النمط: [[prisma.order.]] أو [[prisma.user.]] أو [[prisma.course.]]. الـ [[\.]] نقطة حرفية (من غير [[\]] النقطة معناها «أي حرف»)، و [[\(...\|...\)]] يعني «واحدة من دول» في grep العادي.
- [[wc -l]]: عدّ السطور (l = lines).

~~~text الناتج
2
~~~

الرقم ده = عدد الأماكن اللي الـ payments بيقرا أو بيكتب فيها جداول modules تانية مباشرة (هنا [[prisma.order.findUnique]] و [[prisma.user.findMany]]). لو مش صفر، الـ module لسه مش معزول: لازم يطلب الداتا دي من صاحبها (API أو event) **وهو جوه الـ monolith**، قبل أي تقسيم.

## ٣. مين بيناديه؟

~~~bash
grep -rln "from \"../payments" src/modules | grep -v "^src/modules/payments"
~~~

- [[-l]]: اطبع أسامي الملفات بس، مش السطور.
- [[\"]]: علامة تنصيص جوه النص اللي بين [[" "]].
- [[grep -v]]: شيل السطور اللي فيها النمط (v = invert)، و [[^]] = أول السطر. يعني شيل ملفات الـ payments نفسه.

~~~text الناتج
src/modules/courses/enroll.js
src/modules/orders/checkout.js
~~~

الملفات اللي طلعت = الـ consumers بتوع الـ module. الدوال اللي بيستوردوها هي الـ API اللي الخدمة هتعرضه. لو طلع ٤٠ ملف بيستوردوا ٣٠ دالة مختلفة: الحدود واسعة، والخدمة هتبقى «chatty» (نداءات شبكة كتير).

---

## الجدول اللي بتطلع بيه

| السؤال | جاهز للتقسيم | مش جاهز |
|---|---|---|
| مين بيعدّل | فريق واحد، وبيتعطل على غيره | الكل بيلمس الكل |
| الداتا | بيلمس جداوله بس | بيعمل JOIN مع جداول غيره |
| مين بيناديه | API صغير وواضح | عشرات الدوال من كل حتة |
| السبب | فريق، أو حمل، أو لغة، أو أمان | «عشان الـ scale» من غير أرقام |
| لو وقع | الباقي يكمل (مثلًا الطلب يتسجل والدفع يتأخر) | كل حاجة تقف |

## الخلاصة

- microservices حل لمشكلة فرق ونشر مستقل، وتمنها شبكة وداتا موزعة.
- اعزل الـ module جوه الـ monolith الأول. لو مش قادر، متقسّمش.
- طلّع خدمة واحدة بـ strangler fig، مش كله مرة واحدة.`,
          lines: [
            "عدّ الـ commits على فولدر الـ payments في آخر ٩٠ يوم لكل شخص، من الأكتر للأقل.",
            "عدّ كام مكان الـ payments بيلمس جداول modules تانية مباشرة (لازم يبقى صفر قبل التقسيم).",
            "اطبع الملفات برّه الـ payments اللي بتستورد منه: دول اللي هيكلّموا الخدمة."
          ],
          sol: R`مفيش ناتج واحد صح: المهم الجدول. مثال لإجابة كويسة على module الإيميلات في مشروع كورسات:

| | |
|---|---|
| الـ API | [[sendTemplate(to, template, data)]] بس |
| الجداول | [[email_log]] و [[email_templates]] |
| الـ events اللي بيسمعها | [[user.registered]] و [[order.paid]] و [[password.reset_requested]] |
| محتاج من غيره | اسم اليوزر وإيميله (بييجي في الـ event نفسه) |
| لو وقع ١٠ دقايق | الإيميلات تتأخر وتتبعت لما يرجع (الـ events في queue). محدش يتعطل |

والقرار هنا ممكن يبقى «يستاهل»: حدوده صغيرة وواضحة، ووقوعه مبيوقفش حاجة. أما module الطلبات اللي بيعمل JOIN مع الكورسات واليوزرز والكوبونات في كل استعلام: «لأ لسه».

(الأوامر اتجرّبت في Git Bash على ويندوز 11. القرار نفسه مفهوم، مش أمر.)`
        },
        {
          cmd: "كل خدمة تملك داتتها",
          title: "database per service: محدش يقرا جداول خدمة تانية",
          desc: R`كل خدمة ليها داتا خاصة بيها (قاعدة لوحدها، أو على الأقل schema و user لوحدهم)، ومحدش غيرها يقرا أو يكتب فيها مباشرة. لو الطلبات محتاجة حالة الدفع: يا تسأل خدمة الدفع (API)، يا تسمع الـ event بتاعها وتحفظ نسخة عندها.

من غير كده، الخدمات «منفصلة» على الورق بس: أي تغيير في جدول بيكسر خدمة تانية، ومحدش يقدر ينشر لوحده. ودي أول حاجة بتفرّق microservices حقيقية عن distributed monolith.`,
          example: R`CREATE ROLE orders_svc LOGIN PASSWORD 'o';
CREATE ROLE payments_svc LOGIN PASSWORD 'p';
CREATE SCHEMA orders AUTHORIZATION orders_svc;
CREATE SCHEMA payments AUTHORIZATION payments_svc;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
SET ROLE payments_svc;
CREATE TABLE payments.charges (id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY, order_id bigint NOT NULL, amount_cents int NOT NULL, status text NOT NULL);
INSERT INTO payments.charges (order_id, amount_cents, status) VALUES (9001, 25000, 'succeeded');
RESET ROLE;
SET ROLE orders_svc;
CREATE TABLE orders.orders (id bigint PRIMARY KEY, total_cents int NOT NULL, status text NOT NULL, payment_status text);
INSERT INTO orders.orders VALUES (9001, 25000, 'confirmed', 'succeeded');
SELECT * FROM payments.charges;`,
          try: R`شغّل [[docker run -d --name pg -e POSTGRES_PASSWORD=pw postgres:16-alpine]] ونفّذ المثال بـ [[docker exec -i pg psql -U postgres]]. آخر سطر لازم يفشل. بعدين جرّب كـ [[payments_svc]] تعمل [[SELECT * FROM orders.orders]]. وفكّر: لو صفحة «طلباتي» محتاجة تعرض حالة الدفع، الـ orders هتجيبها منين؟`,
          flag: "script",
          deep: {
            why: "الداتا المشتركة هي أقوى coupling ممكن: الجدول بقى API مش مكتوب، وأي عمود بيتغير اسمه بيكسر خدمة محدش فاكر إنها بتقراه. ومن غير ملكية واضحة، مفيش حد مسؤول عن صحة الداتا، ومينفعش تغيّر قاعدة خدمة (مثلًا من Postgres لـ MongoDB) من غير ما تكلّم الكل.",
            how: R`مستويات العزل من الأضعف للأقوى:
1. **schema لكل خدمة** في نفس السيرفر، وكل خدمة ليها user ميقدرش يلمس غير الـ schema بتاعتها (المثال). أرخص، وكويس للبداية، بس السيرفر نفسه مشترك (الحمل والـ backup والـ upgrade).
2. **database لكل خدمة** في نفس السيرفر ([[CREATE DATABASE]]): مفيش JOIN بينهم أصلًا.
3. **سيرفر لكل خدمة**: عزل كامل في الأداء والـ upgrades، وأغلى.

الصلاحيات في المثال:
- [[CREATE SCHEMA ... AUTHORIZATION role]]: الـ role ده صاحب الـ schema، يقدر يعمل فيها جداول.
- [[REVOKE ALL ON SCHEMA public FROM PUBLIC]]: محدش يقدر يعمل جداول في [[public]] (في Postgres 15+ ده الافتراضي أصلًا للـ CREATE، بس بنكتبه صريح).
- محدش اداله [[USAGE]] على schema التاني، فالـ role مش شايفها أصلًا: [[permission denied for schema payments]].

الخدمة التانية تجيب الداتا إزاي؟
- **API**: [[GET /payments?orderId=9001]] وقت الطلب. بسيط ودايمًا محدّث، بس لو خدمة الدفع واقعة الصفحة تتأثر.
- **events + نسخة محلية**: الـ orders بتسمع [[payment.succeeded]] وتحفظ [[payment_status]] في جدولها (العمود في المثال). سريع ومستقل، بس النسخة ممكن تتأخر ثواني (eventual consistency).
- **CQRS / read model**: خدمة أو جدول للقراية بس، مجمّع من events كذا خدمة (لصفحات الأدمن والتقارير).

والتقارير اللي محتاجة JOIN على كل حاجة: مكانها data warehouse بيتغذى من الخدمات (CDC أو events)، مش استعلامات مباشرة على قواعد الخدمات.`,
            when: "من أول ما تطلّع خدمة. ولو لسه monolith، اعمل نفس الحدود بـ schemas: كل module ليه schema، وممنوع JOIN بين schemas. ده بيخلي التقسيم بعدين أسهل بكتير.",
            mistakes: R`خدمتين بنفس الـ user ونفس الصلاحيات «مؤقتًا». خدمة بتكتب في جداول خدمة تانية «عشان أسرع». foreign key بين schemas خدمتين (بيربطهم للأبد). نسخ الداتا من غير ما تحدد مين الـ source of truth. تفتكر إن النسخة المحلية دايمًا محدّثة.`
          },
          teach: R`## خدمتين، schema لكل واحدة، والصلاحيات بتمنع الغش

المثال بيعمل user (role) لكل خدمة، و schema لكل واحدة صاحبها الـ role بتاعها، وجدول في كل schema، وبعدين خدمة الطلبات بتحاول تقرا جدول الدفع.

اتجرّب على PostgreSQL 16.13 في Docker ([[postgres:16-alpine]])، والـ SQL اتبعت بـ [[docker exec -i <container> psql -U postgres < own.sql]] من Git Bash على ويندوز 11.

---

## ١. الـ roles

~~~sql
CREATE ROLE orders_svc LOGIN PASSWORD 'o';
CREATE ROLE payments_svc LOGIN PASSWORD 'p';
~~~

[[ROLE]] في Postgres = user أو group. [[LOGIN]] = يقدر يتصل. كل خدمة هتتصل بالـ role بتاعها في الـ connection string ([[postgres://orders_svc:...@db/shop]]). الباسوردات هنا للتجربة بس.

## ٢. الـ schemas

~~~sql
CREATE SCHEMA orders AUTHORIZATION orders_svc;
CREATE SCHEMA payments AUTHORIZATION payments_svc;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
~~~

- [[SCHEMA]] = namespace جوه القاعدة. الجدول اسمه الكامل [[schema.table]].
- [[AUTHORIZATION role]] = الـ role ده صاحبها: يعمل ويعدّل فيها اللي هو عايزه. وغيره مالوش أي صلاحية إلا لو حد اداله.
- [[PUBLIC]] (بالكابيتال) = «كل الـ roles». فالسطر التالت بيقفل الـ schema الافتراضية [[public]] عشان محدش يحط جداول مشتركة فيها.

~~~text الناتج
CREATE ROLE
CREATE ROLE
CREATE SCHEMA
CREATE SCHEMA
REVOKE
~~~

## ٣. كل خدمة تعمل جداولها

~~~sql
SET ROLE payments_svc;
CREATE TABLE payments.charges (...);
INSERT INTO payments.charges (order_id, amount_cents, status) VALUES (9001, 25000, 'succeeded');
RESET ROLE;
~~~

[[SET ROLE]] = كمّل الجلسة كأني الـ role ده (عشان نجرب من غير ما نفتح اتصال جديد). و [[RESET ROLE]] = ارجع لـ [[postgres]]. الجدول اتعمل بصاحبه [[payments_svc]].

~~~sql
SET ROLE orders_svc;
CREATE TABLE orders.orders (id bigint PRIMARY KEY, total_cents int NOT NULL, status text NOT NULL, payment_status text);
INSERT INTO orders.orders VALUES (9001, 25000, 'confirmed', 'succeeded');
~~~

خد بالك من [[payment_status]]: الطلبات شايلة **نسخة** من حالة الدفع، اتحفظت لما سمعت event [[payment.succeeded]]. هي مش بتقرا جدول الدفع.

## ٤. المحاولة

~~~sql
SELECT * FROM payments.charges;
~~~

~~~text الناتج
ERROR:  permission denied for schema payments
LINE 1: SELECT * FROM payments.charges;
                      ^
~~~

الـ error على الـ **schema** مش على الجدول: [[orders_svc]] معندوش [[USAGE]] عليها أصلًا، فمش شايف أي حاجة جواها. وجدوله هو شغال عادي:

~~~text الناتج (SELECT * FROM orders.orders كـ orders_svc)
  id  | total_cents |  status   | payment_status
------+-------------+-----------+----------------
 9001 |       25000 | confirmed | succeeded
~~~

---

## الخلاصة

| الطريقة | الطلبات بتعرف حالة الدفع إزاي | التمن |
|---|---|---|
| JOIN على جدول الدفع | ممنوع (ده اللي بنمنعه) | coupling كامل |
| API لخدمة الدفع | تسأل وقت الطلب | لو الدفع واقع الصفحة تتأثر |
| event + نسخة محلية | [[payment_status]] في جدولها | ممكن تتأخر ثواني |

- schema و role لكل خدمة أقل حاجة. قاعدة لكل خدمة أحسن.
- كل داتا ليها صاحب واحد (source of truth)، والباقي نسخ أو APIs.`,
          lines: [
            "role لخدمة الطلبات يقدر يتصل.",
            "role لخدمة الدفع.",
            "schema للطلبات، صاحبها orders_svc.",
            "schema للدفع، صاحبها payments_svc.",
            "اقفل الـ schema المشتركة public على الكل.",
            "كمّل كأني خدمة الدفع.",
            "جدول الدفعات جوه schema الدفع.",
            "دفعة للطلب 9001.",
            "ارجع للـ superuser.",
            "كمّل كأني خدمة الطلبات.",
            "جدول الطلبات، وفيه نسخة من حالة الدفع اتحفظت من event.",
            "طلب 9001.",
            "الطلبات بتحاول تقرا جدول الدفع: لازم يفشل."
          ],
          sol: R`آخر سطر: [[ERROR:  permission denied for schema payments]]. وكـ [[payments_svc]]، [[SELECT * FROM orders.orders]] بيطلع [[ERROR:  permission denied for schema orders]] بنفس الشكل.

وصفحة «طلباتي»: الـ orders تجيب حالة الدفع من النسخة اللي عندها ([[payment_status]] اللي بيتحدّث لما تسمع [[payment.succeeded]] أو [[payment.failed]])، أو تسأل خدمة الدفع بـ API. مش بـ JOIN.

(اتجرّب على PostgreSQL 16.13 في Docker.)`,
          solCode: R`SET ROLE payments_svc;
SELECT * FROM orders.orders;`
        },
        {
          cmd: "خدمتين بـ docker compose",
          title: "orders و payments و RabbitMQ و gateway على جهازك بأمر واحد",
          desc: R`ديمو صغير بنكمّل عليه باقي الدروس: خدمة [[orders]] (بتعمل الطلب وبتحجز المخزون)، وخدمة [[payments]] (بتدفع)، و RabbitMQ بينهم، و nginx كـ gateway هو الحاجة الوحيدة اللي ليها بورت على جهازك. كل خدمة Node 24 من غير framework، وكل واحدة شايلة داتتها لوحدها (في الذاكرة هنا، وفي قاعدة بتاعتها في الحقيقة).

الطلب العادي async: orders بتحفظ الطلب [[PENDING]] وبتنشر [[order.created]] وترد [[202]]، و payments بتسمع وتدفع وتنشر [[payment.succeeded]] أو [[payment.failed]]، و orders بتسمع وتحدّث الحالة.`,
          example: R`name: aa15shop
services:
  rabbit:
    image: rabbitmq:4.4.0-management-alpine
    ports: ["127.0.0.1:15672:15672"]
    healthcheck:
      test: ["CMD", "rabbitmq-diagnostics", "-q", "ping"]
      interval: 5s
      retries: 20
  orders:
    image: node:24-alpine
    working_dir: /app
    command: node server.mjs
    volumes: ["./orders:/app:ro", "./node_modules:/node_modules:ro"]
    environment:
      AMQP_URL: amqp://guest:guest@rabbit:5672
      PAYMENTS_URL: http://payments:3000
    depends_on:
      rabbit: { condition: service_healthy }
  payments:
    image: node:24-alpine
    working_dir: /app
    command: node server.mjs
    volumes: ["./payments:/app:ro", "./node_modules:/node_modules:ro"]
    environment:
      AMQP_URL: amqp://guest:guest@rabbit:5672
    depends_on:
      rabbit: { condition: service_healthy }
  gateway:
    image: nginx:alpine
    volumes: ["./gateway.conf:/etc/nginx/conf.d/default.conf:ro"]
    ports: ["127.0.0.1:8080:80"]
    depends_on: [orders, payments]`,
          try: R`اعمل فولدر فيه [[compose.yaml]] (المثال)، و [[orders/server.mjs]] و [[payments/server.mjs]] (في الحل)، و [[gateway.conf]] (درس «API gateway و service discovery»)، واعمل [[npm i amqplib]] في الفولدر نفسه. بعدين:
[[docker compose up -d]]
[[curl -s -X POST localhost:8080/api/orders -H "content-type: application/json" -d '{"qty":1,"totalCents":25000}']]
[[curl -s localhost:8080/api/orders/9001]]
[[docker compose logs orders payments --no-log-prefix]]
وفي الآخر [[docker compose down -v]].`,
          flag: "script",
          deep: {
            why: "الكلام عن microservices من غير ما تشغّل خدمتين بيكلّموا بعض بيفضل نظري. الديمو ده صغير كفاية تقراه كله، وفيه كل المشاكل الحقيقية: شبكة، و broker، و gateway، وداتا منفصلة، وخدمة بتقع، ورسايل بتتكرر. والدروس الجاية كلها بتشتغل عليه.",
            how: R`الملفات:
- [[compose.yaml]]: ٤ services على شبكة واحدة بيعملها compose ([[aa15shop_default]]). جوه الشبكة كل service ليها اسم DNS باسمها ([[rabbit]] و [[payments]]).
- [[orders/server.mjs]]: HTTP على 3000: [[POST /orders]] و [[GET /orders/:id]]، وبتستهلك [[payment.*]].
- [[payments/server.mjs]]: بتستهلك [[order.created]]، وفيها [[POST /charges]] (للطريقة المتزامنة) و [[GET /charges/:orderId]].
- [[gateway.conf]]: nginx بيوجّه [[/api/orders]] و [[/api/payments/]].

إعدادات compose المهمة:
- [[image: node:24-alpine]] + [[volumes]]: بنشغّل الكود من الفولدر مباشرة من غير build (للتجربة). [[:ro]] = read-only. و [[./node_modules:/node_modules]]: Node بيدوّر على الـ packages في [[node_modules]] في فولدر الملف وكل الفولدرات اللي فوقه، فـ [[/node_modules]] بيتلاقي من [[/app/server.mjs]]. ([[amqplib]] JavaScript بس، فالـ node_modules اللي اتسطب على ويندوز شغال في Linux. لو فيه native modules لازم build جوه الصورة.) وفي الإنتاج: Dockerfile لكل خدمة (تاب «Docker»).
- [[depends_on]] مع [[condition: service_healthy]]: متشغّلش orders غير لما الـ healthcheck بتاع RabbitMQ ينجح ([[rabbitmq-diagnostics -q ping]] كل ٥ ثواني، لحد ٢٠ مرة). من غيرها الخدمة بتقوم قبل الـ broker والاتصال يفشل.
- الـ ports: الـ gateway بس على [[8080]]، و الـ UI بتاع RabbitMQ على [[15672]] للتجربة. الخدمات نفسها ملهاش ports برّه: مفيش طريق ليها غير من الـ gateway أو من جوه الشبكة.

الـ events على exchange واحد [[events]] من نوع topic، وكل خدمة ليها queue بتاعتها: [[payments.order-created]] و [[orders.payment-results]]. اسم الـ queue فيه اسم الخدمة: الـ queue ملك المستهلك، والـ exchange هو العقد العام.

الداتا: [[Map]] في الذاكرة لكل خدمة، للتبسيط. ده بيبان كمشكلة حقيقية في درسين جايين (الـ replica التانية مش شايفة الداتا، والـ restart بيمسحها)، وفي الحقيقة كل خدمة ليها قاعدة (درس «كل خدمة تملك داتتها»).`,
            when: "عشان تجرب أي فكرة في الدروس الجاية، أو كبداية لمشروع تدريب. مش template إنتاج.",
            mistakes: R`[[depends_on]] من غير healthcheck (الترتيب بس، مش الجاهزية). كل الخدمات ليها ports برّه فأي حد يكلّمها من غير الـ gateway. queue مشتركة بين خدمتين مختلفتين (كل رسالة هتروح لواحدة بس منهم). اسم host زي [[localhost]] جوه container بدل اسم الـ service.`
          },
          teach: R`## ٤ containers، وطلب واحد بيعدّي عليهم

المثال هو [[compose.yaml]]. الكود الكامل للخدمتين في الحل. هنفك الـ compose، ونشغّل، ونمشي ورا طلب واحد.

اتجرّب على ويندوز 11 بـ Docker Desktop و [[docker compose]]: Node 24.22.1 (صورة [[node:24-alpine]])، و RabbitMQ 4.4.0، و nginx (alpine)، و [[amqplib]] 2.2.0.

---

## ١. الـ compose

~~~yaml
name: aa15shop
~~~

اسم المشروع: كل الـ containers والشبكة بيبدأوا بيه ([[aa15shop-orders-1]] و [[aa15shop_default]]).

~~~yaml
  rabbit:
    image: rabbitmq:4.4.0-management-alpine
    healthcheck:
      test: ["CMD", "rabbitmq-diagnostics", "-q", "ping"]
~~~

الـ healthcheck: أمر بيتنفذ جوه الـ container، ولو نجح الـ container [[healthy]].

~~~yaml
  orders:
    image: node:24-alpine
    working_dir: /app
    command: node server.mjs
    volumes: ["./orders:/app:ro", "./node_modules:/node_modules:ro"]
    environment:
      AMQP_URL: amqp://guest:guest@rabbit:5672
      PAYMENTS_URL: http://payments:3000
    depends_on:
      rabbit: { condition: service_healthy }
~~~

| السطر | معناه |
|---|---|
| [[working_dir: /app]] و [[command]] | شغّل [[node server.mjs]] جوه [[/app]] |
| [[./orders:/app:ro]] | فولدر الكود على جهازك جوه الـ container، read-only |
| [[./node_modules:/node_modules:ro]] | الـ packages (Node بيدوّر في الفولدرات اللي فوق) |
| [[rabbit:5672]] و [[payments:3000]] | أسامي الـ services هي الـ hostnames جوه الشبكة |
| [[service_healthy]] | استنى لحد ما RabbitMQ يبقى healthy |

~~~yaml
  gateway:
    image: nginx:alpine
    volumes: ["./gateway.conf:/etc/nginx/conf.d/default.conf:ro"]
    ports: ["127.0.0.1:8080:80"]
~~~

الوحيد اللي على جهازك: [[localhost:8080]].

## ٢. التشغيل

~~~bash
docker compose up -d
docker compose ps --format '{{.Service}} {{.State}}'
~~~

~~~text الناتج
gateway running
orders running
payments running
rabbit running
~~~

## ٣. طلب

~~~bash
curl -s -X POST localhost:8080/api/orders -H "content-type: application/json" -d '{"qty":1,"totalCents":25000}'
~~~

~~~text الناتج
{"id":9001,"qty":1,"totalCents":25000,"status":"PENDING"}
~~~

[[202]] و [[PENDING]]: الطلب اتسجل، والدفع لسه.

~~~bash
curl -s localhost:8080/api/orders/9001
~~~

~~~text الناتج (بعد ثانية)
{"id":9001,"qty":1,"totalCents":25000,"status":"CONFIRMED","stock":4}
~~~

المخزون كان ٥ وبقى ٤، والحالة [[CONFIRMED]].

## ٤. اللوج

~~~bash
docker compose logs orders payments --no-log-prefix
~~~

~~~text الناتج (مرتّب بالوقت)
{"svc":"orders","traceId":"c7e6a242edd7f0cf2e39e11447fccaa5","msg":"order created, event published","orderId":9001,"eventId":"be4b8cc2-acd3-442d-a97b-1e30de263b5c"}
{"svc":"payments","traceId":"c7e6a242edd7f0cf2e39e11447fccaa5","msg":"charged","orderId":9001,"status":"succeeded"}
{"svc":"orders","traceId":"c7e6a242edd7f0cf2e39e11447fccaa5","msg":"payment result","orderId":9001,"event":"payment.succeeded","status":"CONFIRMED"}
~~~

- [[--no-log-prefix]] بيشيل اسم الـ container من أول كل سطر.
- ٣ خطوات في خدمتين، و [[traceId]] واحد بيربطهم (درس «tracing بين الخدمات»).

| الخطوة | مين | إيه |
|---|---|---|
| ١ | gateway | [[/api/orders]] → [[orders:3000/orders]] |
| ٢ | orders | يحجز المخزون، [[PENDING]]، ينشر [[order.created]]، يرد [[202]] |
| ٣ | payments | يستهلك، يدفع، ينشر [[payment.succeeded]] |
| ٤ | orders | يستهلك، [[CONFIRMED]] |

## ٥. التنضيف

~~~bash
docker compose down -v
~~~

[[down]] بيشيل الـ containers والشبكة، و [[-v]] الـ volumes (الـ anonymous بتاعة RabbitMQ).

---

## الخلاصة

- اسم الـ service = الـ hostname جوه الشبكة.
- الـ gateway بس ليه بورت برّه.
- [[service_healthy]] عشان الخدمات متقومش قبل الـ broker.
- الطلب async: [[202 PENDING]] ثم [[CONFIRMED]] لما الحدث يرجع.`,
          lines: [
            "اسم المشروع: بادئة لكل الـ containers والشبكة.",
            "الخدمات:",
            "RabbitMQ:",
            "الصورة بالـ management UI.",
            "الـ UI على جهازك بس للتجربة.",
            "فحص الصحة:",
            "أمر جوه الـ container بيقول الـ broker شغال ولا لأ.",
            "كل ٥ ثواني.",
            "لحد ٢٠ مرة.",
            "خدمة الطلبات:",
            "Node 24 الرسمية (alpine).",
            "الفولدر اللي هيشتغل فيه.",
            "الأمر.",
            "الكود و node_modules من جهازك، read-only.",
            "متغيرات البيئة:",
            "عنوان RabbitMQ باسم الـ service.",
            "عنوان خدمة الدفع (للطريقة المتزامنة).",
            "استنى:",
            "لحد ما RabbitMQ يبقى healthy.",
            "خدمة الدفع:",
            "نفس الصورة.",
            "نفس الفولدر.",
            "نفس الأمر.",
            "كودها هي.",
            "متغيرات البيئة:",
            "عنوان RabbitMQ.",
            "استنى:",
            "RabbitMQ healthy.",
            "الـ gateway:",
            "nginx.",
            "ملف الإعدادات مكان الـ default.",
            "البورت الوحيد للخدمات على جهازك.",
            "يقوم بعد الخدمتين."
          ],
          sol: R`[[POST]] بيرجّع [[{"id":9001,...,"status":"PENDING"}]]، وبعد ثانية [[GET /api/orders/9001]] بيرجّع [[CONFIRMED]] و [[stock: 4]]. واللوج فيه ٣ سطور بنفس الـ [[traceId]]: orders نشرت، و payments دفعت، و orders أكدت.

(اتجرّب بـ Docker Desktop على ويندوز 11.)`,
          solCode: R`// orders/server.mjs
import http from "node:http";
import { randomUUID, randomBytes } from "node:crypto";
import amqp from "amqplib";

const orders = new Map();
let nextId = 9001;
let stock = 5;
const log = (traceId, msg, extra = {}) => console.log(JSON.stringify({ svc: "orders", traceId, msg, ...extra }));
const newTraceparent = () => "00-" + randomBytes(16).toString("hex") + "-" + randomBytes(8).toString("hex") + "-01";

const conn = await amqp.connect(process.env.AMQP_URL);
const ch = await conn.createConfirmChannel();
await ch.assertExchange("events", "topic", { durable: true });
await ch.assertQueue("orders.payment-results", { durable: true, arguments: { "x-queue-type": "quorum" } });
await ch.bindQueue("orders.payment-results", "events", "payment.*");

await ch.consume("orders.payment-results", (msg) => {
  const evt = JSON.parse(msg.content);
  const traceId = msg.properties.headers.traceparent.split("-")[1];
  const order = orders.get(evt.orderId);
  if (order?.status === "PENDING") {
    if (msg.fields.routingKey === "payment.succeeded") {
      order.status = "CONFIRMED";
    } else {
      order.status = "CANCELLED";
      stock += order.qty;
      log(traceId, "compensated: stock released", { orderId: order.id, stock });
    }
  }
  log(traceId, "payment result", { orderId: evt.orderId, event: msg.fields.routingKey, status: order?.status });
  ch.ack(msg);
});

async function readJson(req) {
  let body = "";
  for await (const chunk of req) body += chunk;
  return body ? JSON.parse(body) : {};
}
const send = (res, status, data) => res.writeHead(status, { "content-type": "application/json" }).end(JSON.stringify(data) + "\n");

http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://x");
  const traceparent = req.headers.traceparent ?? newTraceparent();
  const traceId = traceparent.split("-")[1];
  if (req.method === "GET" && url.pathname === "/health") return send(res, 200, { ok: true });
  if (req.method === "GET" && url.pathname.startsWith("/orders/")) {
    const order = orders.get(Number(url.pathname.split("/")[2]));
    return order ? send(res, 200, { ...order, stock }) : send(res, 404, { error: "not found" });
  }
  if (req.method === "POST" && url.pathname === "/orders") {
    const { qty = 1, totalCents } = await readJson(req);
    if (stock < qty) return send(res, 409, { error: "out of stock" });
    stock -= qty;
    const order = { id: nextId++, qty, totalCents, status: "PENDING" };
    orders.set(order.id, order);
    if (url.searchParams.get("mode") === "sync") {
      try {
        const r = await fetch(process.env.PAYMENTS_URL + "/charges", {
          method: "POST",
          headers: { "content-type": "application/json", traceparent },
          body: JSON.stringify({ orderId: order.id, totalCents }),
          signal: AbortSignal.timeout(2000),
        });
        order.status = r.ok ? "CONFIRMED" : "CANCELLED";
      } catch (err) {
        order.status = "CANCELLED";
        stock += qty;
        log(traceId, "payments unreachable", { orderId: order.id, error: err.name });
        return send(res, 503, { error: "payments unavailable", order });
      }
      if (order.status === "CANCELLED") stock += qty;
      log(traceId, "sync order", { orderId: order.id, status: order.status });
      return send(res, order.status === "CONFIRMED" ? 201 : 402, order);
    }
    const eventId = randomUUID();
    ch.publish("events", "order.created", Buffer.from(JSON.stringify({ eventId, orderId: order.id, totalCents })), {
      persistent: true, messageId: eventId, headers: { traceparent },
    });
    await ch.waitForConfirms();
    log(traceId, "order created, event published", { orderId: order.id, eventId });
    return send(res, 202, order);
  }
  send(res, 404, { error: "no route" });
}).listen(3000, () => log(null, "listening on 3000"));

// payments/server.mjs
import http from "node:http";
import { hostname } from "node:os";
import amqp from "amqplib";

const charges = new Map();
const processed = new Set();
const log = (traceId, msg, extra = {}) => console.log(JSON.stringify({ svc: "payments", traceId, msg, ...extra }));

function charge(orderId, totalCents) {
  if (charges.has(orderId)) return { ...charges.get(orderId), duplicate: true };
  const c = { orderId, totalCents, status: totalCents > 50000 ? "declined" : "succeeded" };
  charges.set(orderId, c);
  return c;
}

const conn = await amqp.connect(process.env.AMQP_URL);
const ch = await conn.createConfirmChannel();
await ch.assertExchange("events", "topic", { durable: true });
await ch.assertQueue("payments.order-created", { durable: true, arguments: { "x-queue-type": "quorum" } });
await ch.bindQueue("payments.order-created", "events", "order.created");
await ch.prefetch(10);

await ch.consume("payments.order-created", async (msg) => {
  const evt = JSON.parse(msg.content);
  const traceparent = msg.properties.headers.traceparent;
  const traceId = traceparent.split("-")[1];
  if (processed.has(evt.eventId)) {
    log(traceId, "duplicate event skipped", { eventId: evt.eventId });
    return ch.ack(msg);
  }
  const c = charge(evt.orderId, evt.totalCents);
  const key = c.status === "succeeded" ? "payment.succeeded" : "payment.failed";
  ch.publish("events", key, Buffer.from(JSON.stringify({ orderId: evt.orderId, reason: c.status })), { persistent: true, headers: { traceparent } });
  await ch.waitForConfirms();
  processed.add(evt.eventId);
  log(traceId, "charged", { orderId: evt.orderId, status: c.status });
  ch.ack(msg);
});

http.createServer(async (req, res) => {
  const traceId = req.headers.traceparent?.split("-")[1];
  if (req.method === "GET" && req.url === "/health") return res.end('{"ok":true}\n');
  if (req.method === "GET" && req.url.startsWith("/charges/")) {
    const c = charges.get(Number(req.url.split("/")[2]));
    return res.writeHead(c ? 200 : 404, { "content-type": "application/json" }).end(JSON.stringify({ charge: c ?? null, servedBy: hostname() }) + "\n");
  }
  if (req.method === "POST" && req.url === "/charges") {
    let body = "";
    for await (const chunk of req) body += chunk;
    const { orderId, totalCents } = JSON.parse(body);
    const c = charge(orderId, totalCents);
    log(traceId, "charged (http)", { orderId, status: c.status });
    return res.writeHead(c.status === "succeeded" ? 201 : 402, { "content-type": "application/json" }).end(JSON.stringify(c) + "\n");
  }
  res.writeHead(404).end();
}).listen(3000, () => log(null, "listening on 3000"));`
        },
        {
          cmd: "API gateway و service discovery",
          title: "باب واحد من برّه، والخدمات بتلاقي بعض بالاسم",
          desc: R`الـ API gateway هو الحاجة الوحيدة اللي العميل بيكلّمها: بيوجّه كل path للخدمة بتاعتها، ومكان واحد للحاجات المشتركة (TLS، و auth، و rate limiting، و CORS، واللوج). والعميل ميعرفش عدد الخدمات ولا أماكنها.

والـ service discovery هو إزاي خدمة تلاقي عنوان التانية. في Docker Compose و Kubernetes ده DNS: اسم الـ service بيرجع IPs النسخ الشغالة، فلو عملت scale لـ ٢، الاسم بيرجع الاتنين.`,
          example: R`server {
  listen 80;
  resolver 127.0.0.11 valid=10s;
  set $orders http://orders:3000;
  set $payments http://payments:3000;
  location /api/orders { rewrite ^/api(/.*)$ $1 break; proxy_pass $orders; }
  location /api/payments/ { rewrite ^/api/payments(/.*)$ $1 break; proxy_pass $payments; }
  location / { return 404 '{"error":"no route"}\n'; }
}`,
          try: R`مع ديمو «خدمتين بـ docker compose» شغال:
1. [[curl -s localhost:8080/api/payments/charges/9001]] بعد ما تعمل طلب.
2. [[docker compose up -d --scale payments=2]]، و [[docker compose exec orders nslookup payments]].
3. كرر الـ curl الأولاني ٤ مرات وبص على [[servedBy]] و [[charge]].
4. [[curl -s localhost:8080/admin]].`,
          flag: "script",
          deep: {
            why: "من غير gateway، الـ frontend لازم يعرف عنوان كل خدمة، وكل خدمة لازم تعمل auth و CORS و rate limiting بنفسها، وأي تغيير في التقسيم بيكسر العملاء. ومن غير discovery، العناوين بتتكتب ثابتة في الإعدادات وبتبوظ مع أول scale أو restart.",
            how: R`الـ gateway هنا nginx بسيط. في الإنتاج: nginx أو Traefik أو Envoy أو Kong، أو managed (AWS API Gateway، أو Cloudflare). وظايفه:
- **routing**: path أو host → خدمة.
- **الحاجات المشتركة**: TLS، والتحقق من الـ JWT (والخدمات تثق في header زي [[x-user-id]] اللي الـ gateway حطه، بشرط إن الخدمات متتوصلش من برّه)، و rate limiting، و CORS، و request id.
- **BFF (Backend for Frontend)**: gateway لكل نوع عميل (موبايل وويب) بيجمع من كذا خدمة في رد واحد. مفيد، بس متحطش business logic في الـ gateway.

إعداد nginx:
- [[resolver 127.0.0.11 valid=10s]]: [[127.0.0.11]] هو الـ DNS الداخلي بتاع Docker في أي شبكة user-defined (زي شبكة compose). و [[valid=10s]] = اسأله تاني كل ١٠ ثواني.
- [[set $payments http://payments:3000]] ثم [[proxy_pass $payments]]: لما الـ proxy_pass فيه متغير، nginx بيحل الاسم **وقت الطلب** بالـ resolver. لو كتبت [[proxy_pass http://payments:3000]] مباشرة، nginx بيحل الاسم مرة واحدة وقت التشغيل، ولو الـ container اتعمله restart بـ IP جديد أو زاد نسخ، nginx مش هيعرف. (ولو الخدمة مش شغالة وقت تشغيل nginx، nginx نفسه مش هيقوم: [[host not found in upstream]].)
- [[rewrite ^/api/payments(/.*)$ $1 break]]: regex بيشيل البادئة: [[/api/payments/charges/9001]] → [[/charges/9001]]. [[(/.*)]] الجزء اللي بيتمسك، و [[$1]] قيمته، و [[break]] = كمّل بالـ URI الجديد جوه نفس الـ location.
- [[location /]]: أي حاجة تانية [[404]]. الـ gateway مبيعرضش حاجة مش متعرّفة.

الـ discovery:
- **DNS** (Compose، و Kubernetes Services): الأبسط. في Kubernetes، الـ Service ليها IP ثابت (ClusterIP) و kube-proxy بيوزّع، أو headless Service بترجع IPs الـ pods.
- **registry** (Consul، و Eureka): الخدمات بتسجّل نفسها، والـ clients بتسأل. أقدم، ومفيد برّه Kubernetes.
- **service mesh** (Istio، و Linkerd): sidecar جنب كل خدمة بيعمل discovery و retries و mTLS و metrics. قوي وتقيل: لما الخدمات تبقى كتير.

الـ load balancing بالـ DNS: الاسم بيرجع كذا IP، والترتيب بيتغير، والـ client بيختار. nginx مع resolver ومتغير بياخد كل العناوين ويوزّع عليهم.`,
            when: "أول ما يبقى عندك أكتر من خدمة العميل محتاج يكلّمها. وحتى مع monolith، reverse proxy قدامه بيسهّل strangler fig: تحوّل path واحد لخدمة جديدة من غير ما العميل يحس.",
            mistakes: R`business logic في الـ gateway (بيبقى monolith جديد). خدمات ليها ports برّه فحد يعدّي الـ gateway ويبعت [[x-user-id]] مزوّر. [[proxy_pass]] بـ hostname ثابت من غير resolver فالـ scale مبيبانش. عناوين IPs مكتوبة في الإعدادات. state في ذاكرة الخدمة (الـ replica التانية مش شايفاه: التجربة).`
          },
          teach: R`## nginx بيوجّه، و Docker DNS بيلاقي

المثال [[gateway.conf]] بتاع ديمو «خدمتين بـ docker compose». هنفكه سطر سطر، وبعدين نعمل scale ونشوف الـ DNS والتوزيع.

اتجرّب على ويندوز 11 بـ Docker Desktop و nginx (alpine).

---

## ١. الـ resolver

~~~nginx
resolver 127.0.0.11 valid=10s;
~~~

[[127.0.0.11]] الـ DNS server المدمج في Docker لأي شبكة user-defined. بيرد على أسامي الـ services والـ containers.

## ٢. العناوين كمتغيرات

~~~nginx
set $orders http://orders:3000;
set $payments http://payments:3000;
~~~

[[set $name value]] متغير nginx. الفايدة في الخطوة الجاية.

## ٣. الـ routes

~~~nginx
location /api/payments/ { rewrite ^/api/payments(/.*)$ $1 break; proxy_pass $payments; }
~~~

| الحتة | معناها |
|---|---|
| [[location /api/payments/]] | أي URL بيبدأ بكده |
| [[^/api/payments(/.*)$]] | regex: [[^]] أول الـ URL، و [[(/.*)]] الباقي (بيتمسك)، و [[$]] الآخر |
| [[$1]] | الجزء اللي اتمسك: [[/charges/9001]] |
| [[break]] | كمّل بالـ URL الجديد هنا |
| [[proxy_pass $payments]] | ابعته لـ [[payments:3000]]، والاسم يتحل وقت الطلب |

و [[/api/orders]] نفس الفكرة بس بيشيل [[/api]] بس: [[/api/orders/9001]] → [[/orders/9001]].

~~~nginx
location / { return 404 '{"error":"no route"}\n'; }
~~~

~~~text الناتج (curl -s localhost:8080/admin)
{"error":"no route"}
~~~

## ٤. scale لـ ٢

~~~bash
curl -s localhost:8080/api/payments/charges/9001
docker compose up -d --scale payments=2
docker compose exec orders nslookup payments
~~~

[[--scale payments=2]] = نسختين. و [[nslookup]] بيسأل الـ DNS (من جوه container الـ orders، عن طريق [[docker compose exec]]).

~~~text الناتج
{"charge":{"orderId":9001,"totalCents":25000,"status":"succeeded"},"servedBy":"8122be772df2"}
 Container aa15shop-payments-2 Started
Server:		127.0.0.11
Address:	127.0.0.11:53

Non-authoritative answer:

Non-authoritative answer:
Name:	payments
Address: 172.18.0.6
Name:	payments
Address: 172.18.0.3
~~~

الاسم [[payments]] بقى بيرجع IPين من الـ DNS server [[127.0.0.11]]: ده الـ discovery. و [[servedBy]] اسم الـ host = id الـ container.

> [[getent hosts payments]] في صورة alpine (musl) طبع IP واحد بس ([[172.18.0.3        payments  payments]])، و [[nslookup]] (من busybox) بيطبع الكل. و [[dns.promises.lookup("payments", { all: true })]] في Node رجّع الاتنين.

## ٥. التوزيع، والمشكلة

~~~bash
curl -s localhost:8080/api/payments/charges/9001
~~~

(٤ مرات)

~~~text الناتج
{"charge":null,"servedBy":"164653b0c823"}
{"charge":null,"servedBy":"164653b0c823"}
{"charge":{"orderId":9001,"totalCents":25000,"status":"succeeded"},"servedBy":"8122be772df2"}
{"charge":{"orderId":9001,"totalCents":25000,"status":"succeeded"},"servedBy":"8122be772df2"}
~~~

- nginx بعت لنسختين مختلفتين: التوزيع شغال من غير ما نعدّل أي إعداد.
- النسخة الجديدة [[164653b0c823]] ردت [[charge: null]]: الداتا في [[Map]] جوه ذاكرة النسخة الأولى. أول ما تعمل scale، أي state في الذاكرة بيبقى bug. الخدمة لازم تبقى stateless والداتا في قاعدة بتاعتها.

ورجّعنا [[--scale payments=1]].

---

## الخلاصة

| | بيعمل إيه | في الديمو |
|---|---|---|
| gateway | باب واحد، routing، وحاجات مشتركة | nginx على 8080 |
| discovery | الاسم → IPs النسخ | Docker DNS على [[127.0.0.11]] |
| [[proxy_pass $var]] + resolver | يحل الاسم وقت الطلب | بيشوف النسخة الجديدة |
| scale | نسخ أكتر ورا نفس الاسم | [[--scale payments=2]] |

- الخدمات stateless، والداتا في قاعدة: وإلا كل نسخة شايفة حاجة مختلفة.`,
          lines: [
            "server block جديد.",
            "اسمع على بورت 80 جوه الـ container.",
            "اسأل DNS بتاع Docker، وجدد الإجابة كل ١٠ ثواني.",
            "عنوان خدمة الطلبات في متغير.",
            "عنوان خدمة الدفع في متغير.",
            "/api/orders...: شيل /api وابعت لـ orders (الاسم يتحل وقت الطلب).",
            "/api/payments/...: شيل /api/payments وابعت لـ payments.",
            "أي حاجة تانية: 404.",
            "قفلة الـ server."
          ],
          sol: R`1. [[{"charge":{"orderId":9001,...,"status":"succeeded"},"servedBy":"..."}]].
2. [[nslookup payments]] بيرجّع IPين (عندنا [[172.18.0.6]] و [[172.18.0.3]]).
3. [[servedBy]] بيتغير بين النسختين، والنسخة الجديدة بترد [[charge: null]]: الداتا كانت في ذاكرة النسخة القديمة بس.
4. [[{"error":"no route"}]] بـ 404.

(اتجرّب بـ Docker Desktop على ويندوز 11.)`
        },
        {
          cmd: "HTTP ولا events بين الخدمات",
          title: "لو خدمة الدفع واقعة: الطلب يفشل، ولا يستنى؟",
          desc: R`متزامن (HTTP أو gRPC): orders بتنادي payments وتستنى الرد. بسيط ومباشر، والعميل بيعرف النتيجة على طول. بس لو payments واقعة أو بطيئة، الطلب بيفشل أو بيعلق: الخدمتين بقوا لازم يبقوا شغالين في نفس اللحظة (temporal coupling).

غير متزامن (events): orders بتنشر [[order.created]] وترد [[202]]، و payments تعمله لما تقدر. لو واقعة، الحدث بيستنى في الـ queue، والطلب بيكمل لوحده لما ترجع. التمن: النتيجة مش فورية (العميل يستنى أو يتبلّغ)، وأصعب في التتبع.`,
          example: R`curl -s -w "HTTP %{http_code} in %{time_total}s\n" -X POST "localhost:8080/api/orders?mode=sync" -H "content-type: application/json" -d '{"qty":1,"totalCents":25000}'
docker compose stop payments
curl -s -w "HTTP %{http_code} in %{time_total}s\n" -X POST "localhost:8080/api/orders?mode=sync" -H "content-type: application/json" -d '{"qty":1,"totalCents":25000}'
curl -s -w "HTTP %{http_code} in %{time_total}s\n" -X POST "localhost:8080/api/orders" -H "content-type: application/json" -d '{"qty":1,"totalCents":25000}'
curl -s localhost:8080/api/orders/9004
docker compose start payments
curl -s localhost:8080/api/orders/9004`,
          try: R`شغّل الأوامر بالترتيب على ديمو «خدمتين بـ docker compose» (بعد طلب 9001). بعدين جرّب [[docker compose pause payments]] (الـ container موجود بس متجمّد) والـ sync تاني: الوقت كام؟ وارجع [[docker compose unpause payments]]. وفكّر: لو كان مفيش [[AbortSignal.timeout(2000)]]، كان إيه هيحصل؟`,
          flag: "script",
          deep: {
            why: "ده أهم قرار في تصميم أي نظام موزع، وبيتسأل في كل انترفيو system design. الاختيار الغلط بيعمل يا cascading failures (خدمة واحدة تقع فكل اللي بينادوها يقعوا)، يا نظام async في حاجات اليوزر مستني نتيجتها فورًا.",
            how: R`متزامن، الصح:
- **timeout دايمًا**: [[AbortSignal.timeout(2000)]] بيلغي الـ fetch بعد ٢ ثانية. من غيره، الـ fetch في Node بيستنى لحد ما الـ OS يقفل الاتصال (ممكن دقايق)، وكل الطلبات المستنية بتاكل connections وذاكرة لحد ما orders نفسها تقع.
- **retry بحساب**: للأخطاء المؤقتة بس، وبـ backoff و jitter، وعلى عمليات idempotent (أو بـ Idempotency-Key: درس [[Idempotency-Key]] في المستوى ١ من التاب ده).
- **circuit breaker**: بعد عدد فشل، بطّل تنادي لفترة وارجع error فورًا، بدل ما كل طلب يستنى الـ timeout (مكتبة زي [[opossum]] في Node).
- **fallback**: لو الخدمة مش ضرورية (التوصيات)، رجّع نتيجة فاضية أو من الكاش.
- **gRPC** بدل HTTP/JSON بين الخدمات: عقد [[.proto]] بأنواع، و HTTP/2، و streaming (درس [[gRPC]] في التاب ده). نفس مشاكل التزامن بالظبط.

غير متزامن، الصح:
- الحدث يتنشر بـ outbox (مش بعد الـ commit وخلاص)، والمستهلك idempotent، و DLQ.
- العميل: [[202 Accepted]] و [[GET]] للحالة (polling)، أو SSE/WebSocket، أو إشعار.
- الأحداث بتوصف حاجة حصلت ([[order.created]])، مش أمر لخدمة معينة. فخدمة جديدة (الإيميلات) تشترك من غير ما orders تتغير.

القاعدة العملية:
- **قراية محتاجها دلوقتي** (اعرض بيانات اليوزر، أو احسب السعر): متزامن، مع timeout و fallback، أو نسخة محلية من events.
- **كتابة تقدر تكمل بعدين** (ابعت إيميل، أو اشحن، أو حدّث البحث): events.
- **عملية بتلمس كذا خدمة** (طلب + دفع + مخزون): saga بـ events (الدرس الجاي).
- اتجنّب سلاسل متزامنة طويلة: A → B → C → D. لو كل واحدة متاحة 99.9٪، السلسلة 99.6٪، والـ latency بتتجمع.`,
            when: "مع كل اتصال جديد بين خدمتين: اسأل «لو التانية واقعة ١٠ دقايق، عايز إيه يحصل؟». لو الإجابة «يستنى ويكمل»، events. لو «لازم أعرف دلوقتي»، متزامن بـ timeout.",
            mistakes: R`fetch من غير timeout. retry فوري من غير backoff على خدمة واقعة (بتزوّد الحمل عليها). retry على POST مش idempotent فالدفع يتعمل مرتين. تحوّل كل حاجة events حتى اللي اليوزر مستني نتيجتها. أحداث بأسماء أوامر ([[charge.payment]]) فالـ producer لسه عارف مين هيعمل إيه. تفتكر إن [[202]] معناه «اتعمل».`
          },
          teach: R`## نفس الطلب، مرة HTTP ومرة event، و payments واقعة

[[?mode=sync]] في orders بيخليها تنادي [[POST http://payments:3000/charges]] بـ fetch وتستنى. ومن غيره، بتنشر event. هنقارن الاتنين و payments شغالة وواقفة.

اتجرّب على ديمو «خدمتين بـ docker compose»، من Git Bash على ويندوز 11.

---

## ١. الكود المتزامن (من orders/server.mjs)

~~~js
const r = await fetch(process.env.PAYMENTS_URL + "/charges", {
  method: "POST",
  headers: { "content-type": "application/json", traceparent },
  body: JSON.stringify({ orderId: order.id, totalCents }),
  signal: AbortSignal.timeout(2000),
});
~~~

[[AbortSignal.timeout(2000)]] signal بيتلغي لوحده بعد ٢٠٠٠ms، والـ fetch بيرمي [[TimeoutError]]. وفي الـ catch: الطلب [[CANCELLED]]، والمخزون يرجع، و [[503]].

## ٢. curl بيقيس

~~~bash
curl -s -w "HTTP %{http_code} in %{time_total}s\n" -X POST "localhost:8080/api/orders?mode=sync" ...
~~~

[[-w]] (write-out): اطبع بعد الرد. [[%{http_code}]] الـ status، و [[%{time_total}]] الوقت الكلي بالثواني.

## ٣. payments شغالة

~~~text الناتج
{"id":9002,"qty":1,"totalCents":25000,"status":"CONFIRMED"}
HTTP 201 in 0.035452s
~~~

٣٥ ملّي ثانية، والعميل عرف النتيجة على طول. ده الحلو في المتزامن.

## ٤. payments واقفة، sync

~~~bash
docker compose stop payments
~~~

~~~text الناتج
{"error":"payments unavailable","order":{"id":9003,"qty":1,"totalCents":25000,"status":"CANCELLED"}}
HTTP 503 in 2.013044s
~~~

استنى الـ timeout كله (٢ ثانية) وفشل. واللوج:

~~~text الناتج (docker compose logs orders)
{"svc":"orders","traceId":"af338447e7ab2eb936c476c1cfc8b065","msg":"payments unreachable","orderId":9003,"error":"TimeoutError"}
~~~

العميل خسر الطلب. ولو كان مفيش timeout، كل طلب كان هيعلق، والطلبات تتراكم.

## ٥. payments واقفة، async

~~~text الناتج
{"id":9004,"qty":1,"totalCents":25000,"status":"PENDING"}
HTTP 202 in 0.014107s
~~~

١٤ ملّي ثانية: orders مستنتش حد. الحدث في queue [[payments.order-created]] مستني.

~~~text الناتج (GET /api/orders/9004)
{"id":9004,"qty":1,"totalCents":25000,"status":"PENDING","stock":2}
~~~

## ٦. payments رجعت

~~~bash
docker compose start payments
curl -s localhost:8080/api/orders/9004
~~~

~~~text الناتج (بعد ٤ ثواني)
{"id":9004,"qty":1,"totalCents":25000,"status":"CONFIRMED","stock":2}
~~~

payments قامت، لقت الحدث، دفعت، نشرت، و orders أكدت. محدش عمل حاجة بإيده.

> و [[stock: 2]]: بدأنا بـ ٥، و 9001 و 9002 و 9004 خدوا ٣، و 9003 اتلغى ورجّع اللي أخده.

## ٧. pause

[[docker compose pause payments]] بيجمّد الـ process (الـ container موجود والـ DNS بيرد، بس محدش بيرد على الـ TCP):

~~~text الناتج
HTTP 503 in 2.012637s
~~~

نفس الـ ٢ ثانية: ده شكل «خدمة بطيئة» أو «معلقة»، وهو أخطر من «واقعة» لأن من غير timeout مفيش حاجة بتقول لا.

---

## الخلاصة

| | payments شغالة | payments واقفة |
|---|---|---|
| sync | [[201]] في ٣٥ms، النتيجة فورية | [[503]] بعد ٢ ثانية، الطلب ضاع |
| async | [[202]] في ١٤ms، النتيجة بعدين | [[202]]، والطلب كمّل لوحده لما رجعت |

- متزامن: timeout دايمًا، و retry بحساب، و circuit breaker.
- events: للكتابة اللي تقدر تستنى، والعميل بيعرف بـ polling أو إشعار.`,
          lines: [
            "طلب متزامن و payments شغالة: اطبع الـ status والوقت.",
            "وقّف خدمة الدفع.",
            "طلب متزامن تاني: هيستنى الـ timeout ويفشل.",
            "طلب async: هيترد فورًا بـ 202.",
            "حالة الطلب: لسه PENDING.",
            "شغّل خدمة الدفع تاني.",
            "حالة الطلب: كمّل لوحده."
          ],
          sol: R`مع [[pause]]: [[HTTP 503 in 2.01s]]، و اللوج [[TimeoutError]]: الـ container موجود والـ DNS بيرد بس محدش بيرد على الاتصال، فالـ timeout هو اللي أنقذ الطلب.

ومن غير [[AbortSignal.timeout]]: الطلب كان هيفضل مستني لحد ما الاتصال يتقفل من الـ OS (ممكن دقايق)، والعميل معلق، وكل طلب جديد بيعلق جنبه.

(اتجرّب بـ Docker Desktop على ويندوز 11.)`
        },
      ]
    }
]);
