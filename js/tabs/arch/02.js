// تكملة تاب arch: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/arch/01.js (شرح حقول الدرس في أوله)
MORE("arch", [
    {
      t: "تصميم الداتا والـ API",
      l: 1,
      n: "الجداول والعلاقات والـ endpoints على الورق الأول، لأن تغييرها بعد ما يبقى فيه داتا غالي",
      items: [
        {
          cmd: "ERD",
          title: "ارسم الجداول والعلاقات قبل أي كود",
          desc: R`الـ ERD (Entity Relationship Diagram) رسمة للكيانات والعلاقات بينها: واحد لواحد، أو واحد لكتير، أو كتير لكتير. ارجع للـ stories: كل اسم فيها (طالب، كورس، درس، طلب) غالبًا جدول. وكل فعل (يشتري، يتفرج) غالبًا علاقة، أو جدول وسيط.

اكتبها بـ Mermaid في [[docs/erd.md]]. GitHub بيرسمها لوحده، و VS Code بإضافة Mermaid، وبتتراجع في الـ PR زي الكود.`,
          example: R`erDiagram
  USER ||--o{ ENROLLMENT : "يشترك"
  COURSE ||--o{ ENROLLMENT : "فيه طلاب"
  COURSE ||--|{ LESSON : "فيه دروس"
  USER ||--o{ ORDER : "بيطلب"
  ORDER }o--|| COURSE : "لكورس"
  USER ||--o{ COURSE : "بيدرّس"`,
          try: R`ارسم ERD لمشروعك وافتحه في GitHub أو في VS Code بإضافة Mermaid. بعدين خد كل story وامشي بيها على الرسمة: «الطالب يشتري كورس» بتكتب في أنهي جداول؟ لو محتاج جدول مش موجود، الرسمة ناقصة.`,
          flag: "script",
          deep: {
            why: "تغيير الـ schema بعد ما يبقى فيه داتا حقيقية معناه migration، والـ migration فيها خطر. الرسمة بتاخد ساعة، وبتكشف الأسئلة الصعبة بدري: الطالب يقدر يشتري نفس الكورس مرتين؟ والدفعة الفاشلة بتتسجّل فين؟",
            how: R`الرموز اسمها crow's foot. [[||]] معناها واحد بالظبط، و [[o{]] صفر أو أكتر، و [[|{]] واحد أو أكتر، و [[o|]] صفر أو واحد. وبتتقري من الناحيتين.

المستخدم والكورس بينهم علاقة كتير لكتير: الطالب عنده كورسات كتير، والكورس عنده طلاب كتير. العلاقة دي بتتعمل بجدول وسيط هو ENROLLMENT. والجدول ده عنده داتا بتاعته هو كمان: اشترك إمتى، ووصل لفين في الكورس.

ORDER منفصل عن ENROLLMENT، ودي أهم نقطة في الرسمة. الطلب معناه «محاولة دفع»: ممكن يبقى PENDING، أو FAILED، أو REFUNDED. أما الاشتراك فمعناه «عنده access». وبنفصلهم عشان في طلبات بتفشل، وفي اشتراكات من غير طلب، زي الأدمن لما يدّي كورس هدية. ولو دمجتهم، هتلاقي كورسات مفتوحة لطلبات مدفعتش.

وفيه قرارات بتتاخد هنا كمان. الفلوس بتتخزن رقم صحيح بالقرش (integer cents). والسعر بيتنسخ في الطلب وقت الشراء، لأن سعر الكورس بيتغير والطلب القديم لازم يفضل بسعره. والكورس اللي عليه طلاب مبيتمسحش، بيتعمله archive.`,
            when: "بعد الـ stories على طول، وقبل أي schema. وحدّثها مع أي ميزة بتضيف جدول.",
            mistakes: "إنك تخلط الطلب والاشتراك في جدول واحد، فتلاقي كورسات مفتوحة لطلبات فشلت. أو تربط الطلب بسعر الكورس بدل ما تنسخه، فلما السعر يتغير التقارير القديمة تبوظ. أو تخزّن الفلوس float وتلاقي 0.1 + 0.2 مش بتساوي 0.3. وفي مشروع حقيقي، العلاقات بين الأسعار والمنتجات اتعدلت ٥ مرات في migrations ورا بعض (أضف foreign key، امسحه، صلّحه، امسحه تاني). كل ده كان ممكن يتحل في ساعة رسم."
          },
          teach: R`## الرسمة مكتوبة نص

المثال مش صورة، ده نص بلغة اسمها Mermaid. GitHub بيحوّله لرسمة لوحده لما تحطه جوه بلوك كود نوعه [[mermaid]] في أي ملف [[.md]]. جرّبناه بمكتبة Mermaid 11 في المتصفح (Chromium): اتحلل من غير أخطاء ([[diagramType: "er"]]) واترسم SVG فيه كل الكيانات.

كل سطر بعد الأول شكله كده:

~~~text
USER  ||--o{  ENROLLMENT  :  "يشترك"
 1      2         3        4     5
~~~

| الرقم | الحتة | معناها |
|---|---|---|
| 1 | [[USER]] | الكيان الأول (جدول) |
| 2 | [[||--o{]] | نوع العلاقة من الناحيتين |
| 3 | [[ENROLLMENT]] | الكيان التاني |
| 4 | [[:]] | فاصل قبل الاسم، ولازم يبقى موجود |
| 5 | [["يشترك"]] | اسم العلاقة اللي هيتكتب على الخط |

---

## ١. [[erDiagram]]

أول كلمة بتقول لـ Mermaid نوع الرسمة: Entity Relationship Diagram. ولو كتبتها غلط (مثلًا [[ERdiagram]]) الرسمة مش هتظهر.

---

## ٢. رموز العلاقة (crow's foot)

الرمز بيتكون من ٣ حتت: طرف شمال، و [[--]] في النص، وطرف يمين. كل طرف حرفين: واحد بيقول أقل عدد، والتاني أكبر عدد.

| الطرف | يتقري | يعني |
|---|---|---|
| [[||]] | واحد وواحد | واحد بالظبط |
| [[o|]] أو [[|o]] | صفر وواحد | صفر أو واحد |
| [[o{]] أو [[}o]] | صفر وكتير | صفر أو أكتر |
| [[|{]] أو [[}|]] | واحد وكتير | واحد أو أكتر |

و [[{]] شكلها زي رجل الغراب (crow's foot)، ومنها جه الاسم: معناها «كتير».

والطرف بيوصف الكيان اللي **جنبه**. خد [[USER ||--o{ ENROLLMENT]]: الطرف اللي جنب ENROLLMENT هو [[o{]]، يعني «المستخدم الواحد ليه صفر أو أكتر اشتراك». والطرف اللي جنب USER هو [[||]]، يعني «كل اشتراك لمستخدم واحد بالظبط».

---

## ٣. السطور واحد واحد

### [[USER ||--o{ ENROLLMENT]] و [[COURSE ||--o{ ENROLLMENT]]

السطرين دول مع بعض هما علاقة **كتير لكتير**: الطالب في كورسات كتير، والكورس فيه طلاب كتير. في قاعدة relational مفيش عمود يشيل «كتير»، فبنعمل جدول في النص (ENROLLMENT) كل صف فيه طالب واحد وكورس واحد.

### [[COURSE ||--|{ LESSON]]

[[|{]] مش [[o{]]: الكورس فيه درس **واحد على الأقل**. ده قاعدة منتج (كورس فاضي ميتنشرش) مكتوبة في الرسمة.

### [[USER ||--o{ ORDER]] و [[ORDER }o--|| COURSE]]

الطلب لمستخدم واحد ولكورس واحد. لاحظ إن السطر التاني مكتوب بالعكس: [[}o]] على الشمال جنب ORDER، و [[||]] على اليمين جنب COURSE. والمعنى: الكورس ليه صفر أو أكتر طلب، والطلب لكورس واحد بالظبط.

### [[USER ||--o{ COURSE : "بيدرّس"]]

نفس جدول المستخدمين فيه المدرّبين. مفيش جدول INSTRUCTOR منفصل، الفرق عمود [[role]].

---

## ٤. ليه ORDER و ENROLLMENT جدولين

| | ORDER | ENROLLMENT |
|---|---|---|
| معناه | محاولة دفع | عنده access |
| حالاته | PENDING و PAID و FAILED و REFUNDED | موجود أو لأ |
| ممكن يتعمل من غير التاني؟ | أيوه: طلب فشل | أيوه: الأدمن يدّي كورس هدية |

لو دمجتهم، طلب فاشل ممكن يفتح كورس.

---

## ٥. لما الرسمة متطلعش

جرّبنا ٣ أشكال لنفس السطر في Mermaid 11:

| السطر | النتيجة |
|---|---|
| [[USER ||--o{ ORDER]] | خطأ: [[Expecting 'COLON', 'STYLE_SEPARATOR', got 'NEWLINE']] |
| [[USER ||--o{ ORDER : ""]] | بيترسم، من غير اسم على الخط |
| [[USER ||--o{ ORDER : بيطلب كتير]] | بيترسم برضه |

يعني أشهر غلطة إنك تنسى [[: "الاسم"]] في آخر السطر. والتنصيص حوالين الاسم مش إجباري في Mermaid 11، بس خليه دايمًا عشان الأسامي اللي فيها رموز.

---

## الخلاصة

- كل اسم في الـ stories غالبًا كيان، وكل فعل غالبًا علاقة.
- الرمز بيتقري من الناحيتين، والطرف بيوصف الكيان اللي جنبه.
- كتير لكتير = جدول في النص، وليه أعمدة بتاعته (إمتى اشترك).
- الطلب غير الاشتراك.
- الرسمة نص في git، بتتراجع في الـ PR زي الكود.`,
          lines: [
            "بداية رسمة ERD بـ Mermaid.",
            "المستخدم ليه صفر أو أكتر اشتراك، وكل اشتراك لمستخدم واحد بالظبط.",
            "والكورس كمان ليه اشتراكات كتير. الاتنين مع بعض علاقة كتير لكتير عن طريق جدول وسيط.",
            "الكورس فيه درس واحد على الأقل ([[|{]] معناها واحد أو أكتر).",
            "المستخدم ليه طلبات كتير، ومنها اللي فشل.",
            "كل طلب لكورس واحد، والكورس ليه طلبات كتير.",
            "نفس جدول المستخدمين فيه المدرّبين كمان، ولكل كورس مدرّب واحد."
          ],
          sol: R`لو الرسمة صح، GitHub هيعرضها صورة جوه بلوك [[mermaid]]. ولو ظهرت كنص، يبقى فيه غلطة syntax: غالبًا علاقة ناقصها [[: "الاسم"]] في آخر السطر، أو أول كلمة مش [[erDiagram]] بالظبط.

المشي بالـ stories هو الجزء المهم. في myapp، «الطالب يشتري كورس» بتكتب في ORDER (PENDING)، وبعدين الـ webhook بيحدّثه لـ PAID ويكتب في ENROLLMENT. و «أشوف الكورسات» بتقرا COURSE و LESSON بس. أول story هتكشف نقص عادةً هي «الطالب يكمّل من آخر درس وقف عنده»: محتاجة جدول LESSON_PROGRESS (userId و lessonId و completedAt) مش موجود في الرسمة. ده بالظبط اللي التجربة عايزاك تلاقيه.

غلطة شائعة إنك تحط [[courseIds]] كـ array جوه USER بدل جدول ENROLLMENT. ساعتها مفيش مكان لتاريخ الاشتراك ولا تقدر تمنع التكرار بـ unique.`,
          solCode: R`erDiagram
  USER ||--o{ ENROLLMENT : "يشترك"
  COURSE ||--o{ ENROLLMENT : "فيه طلاب"
  COURSE ||--|{ LESSON : "فيه دروس"
  USER ||--o{ ORDER : "بيطلب"
  ORDER }o--|| COURSE : "لكورس"
  USER ||--o{ COURSE : "بيدرّس"
  USER ||--o{ LESSON_PROGRESS : "بيخلّص"
  LESSON ||--o{ LESSON_PROGRESS : "اتخلّص"`
        },
        {
          cmd: "schema.prisma",
          title: "حوّل الرسمة لجداول حقيقية بقيود",
          desc: R`كل كيان في الـ ERD بيبقى model، وكل علاقة بتبقى foreign key. والقيود اللي بتحمي الداتا مكانها في الـ schema نفسها، مش في الكود بس. [[@unique]] بيمنع التكرار، و enum بيمنع أي قيمة مش متوقعة، و [[@@unique([userId, courseId])]] في Enrollment بيمنع إن الطالب يشترك في نفس الكورس مرتين.

تفاصيل Prisma والـ migrations في تاب «SQL و Prisma». هنا بنركّز على القرارات.`,
          example: R`enum OrderStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
}

model Order {
  id          String      @id @default(cuid())
  userId      String
  courseId    String
  amountCents Int
  currency    String      @default("EGP")
  status      OrderStatus @default(PENDING)
  gatewayTxId String?     @unique
  createdAt   DateTime    @default(now())
  user        User        @relation(fields: [userId], references: [id])
  course      Course      @relation(fields: [courseId], references: [id])
  @@index([userId, createdAt])
}`,
          try: R`اكتب models الـ User و Course و Enrollment و Order، واعمل migration. بعدين جرّب تعمل enrollment لنفس الطالب ونفس الكورس مرتين من Prisma Studio أو بسكربت، ولاحظ إن القاعدة رفضت (P2002).`,
          flag: "script",
          deep: {
            why: "الكود فيه bugs، والطلبات بتوصل في نفس اللحظة. القيد اللي في القاعدة هو خط الدفاع الأخير. هو اللي بيضمن إن الداتا سليمة حتى لو الكود غلط، أو حد كتب في القاعدة بسكربت.",
            how: R`خد التكرار كمثال. لو الكود بيعمل [[findFirst]] وبعدين [[create]]، وطلبين وصلوا في نفس الملّي ثانية، الاتنين هيعدّوا الـ findFirst وهيعملوا create. ده اسمه race condition. لكن القيد unique في القاعدة بيرفض التاني، وPrisma بترجّع الكود [[P2002]]، والـ error handler بيحوّله 409.

الـ id بـ [[cuid()]] بدل autoincrement. الرقم المتسلسل بيبان في الـ URL، وأي حد يقدر يجرّب [[/orders/124]] و [[/orders/125]]. ده مش حماية لوحده، والصلاحيات هي الحماية الحقيقية، بس بيقفل باب سهل.

الـ foreign key في PostgreSQL مبيعملش index لوحده. عشان كده أي عمود بتفلتر بيه لازم تعمله [[@@index]] بنفسك. والـ index المركّب [[userId, createdAt]] بيخدم صفحة «طلباتي» بالظبط، لأنها بتفلتر بالمستخدم وترتّب بالتاريخ.

و [[gatewayTxId @unique]] بيضمن إن نفس المعاملة من البوابة متتسجلش على طلبين. وفي Prisma 7 رابط القاعدة والإعدادات بقوا في [[prisma.config.ts]] بدل الـ schema، والتفاصيل في تاب «SQL و Prisma».`,
            when: "بعد الـ ERD. وأي تغيير بعد كده لازم يبقى migration جوه git، مش تعديل بإيدك على القاعدة.",
            mistakes: "إنك تعتمد على findFirst قبل create بدل unique. أو تنسى index على الأعمدة اللي بتفلتر بيها. أو تخزّن الفلوس Float. أو تستخدم id متسلسل في URL عام. وفي مشروع حقيقي، الـ schema كانت متوزعة على ملفات SQL متفرقة، وملف اسمه «نفّذ ده» في جذر المشروع، وحوالي ٤٠ ملف FIX. ساعتها محدش بيبقى عارف القاعدة الحقيقية شكلها إيه. الحل إن migrations تبقى هي المصدر الوحيد."
          },
          teach: R`## من الرسمة لجدول حقيقي

المثال جزء من ملف [[prisma/schema.prisma]]: نوع [[enum]] لحالات الطلب، و [[model Order]]. Prisma بيقرا الملف ده ويطلّع منه SQL (migration) يعمل الجداول في PostgreSQL، ويطلّع TypeScript client تكلّم بيه القاعدة. جرّبنا المثال والـ solCode كاملين بـ Prisma 7.10 و PostgreSQL 18 (في Docker) على ويندوز 11 بـ Node 24.

---

## ١. [[enum OrderStatus { PENDING PAID FAILED REFUNDED }]]

[[enum]] (اختصار enumeration، يعني «قايمة محددة») نوع ليه قيم معروفة بس. Prisma بيحوّله لنوع حقيقي في PostgreSQL:

~~~text من migration.sql
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED');
~~~

يعني لو كود فيه bug حاول يكتب [["paid"]] (small) أو [["DONE"]]، القاعدة نفسها بترفض. جرّبناها بـ psql مباشرة على الجدول:

~~~text الناتج
ERROR:  invalid input value for enum "OrderStatus": "paid"
~~~

ده أحسن من عمود [[String]] أي حاجة تتكتب فيه.

---

## ٢. [[model Order { ... }]]

كل [[model]] جدول. كل سطر جواه عمود: **الاسم، وبعده النوع، وبعده attributes** بتبدأ بـ [[@]].

### [[id String @id @default(cuid())]]

- [[String]] نوع النص ([[TEXT]] في Postgres).
- [[@id]] المفتاح الأساسي (primary key).
- [[@default(cuid())]] لو مبعتّش id، Prisma بيولّد واحد عشوائي شكله [[cmuzcoqw000020siee7iwyh2k]] (ده id حقيقي طلع عندنا). مش رقم متسلسل، فمحدش يخمّن الطلب اللي بعده من الـ URL.

### [[userId String]] و [[courseId String]]

أعمدة عادية فيها id المستخدم والكورس. هي اللي هتبقى foreign keys بالسطور اللي تحت.

### [[amountCents Int]]

الفلوس رقم صحيح بالقرش: [[49900]] يعني ٤٩٩ جنيه. ليه مش [[Float]]؟

~~~powershell
node -e "console.log(0.1 + 0.2)"
~~~

~~~text الناتج
0.30000000000000004
~~~

الـ float بيخزن تقريب، والفلوس مينفعش فيها تقريب. والسعر **منسوخ** هنا وقت الشراء، مش مربوط بسعر الكورس، عشان لو السعر اتغير الطلب القديم يفضل بسعره.

### [[currency String @default("EGP")]]

العملة، وافتراضيًا جنيه مصري.

### [[status OrderStatus @default(PENDING)]]

النوع هو الـ enum اللي فوق، وكل طلب جديد بيبدأ [[PENDING]]. الـ webhook بس هو اللي يحوّله [[PAID]].

### [[gatewayTxId String? @unique]]

- [[?]] بعد النوع معناها **اختياري** (nullable): الطلب بيتعمل قبل ما البوابة تدّينا رقم معاملة.
- [[@unique]] مفيش طلبين بنفس رقم المعاملة. وفي Postgres أكتر من صف قيمته [[NULL]] عادي، فالطلبات اللي لسه مستنية مش بتخبط في بعض.

### [[createdAt DateTime @default(now())]]

وقت الإنشاء. [[now()]] بيتحوّل لـ [[DEFAULT CURRENT_TIMESTAMP]] في القاعدة.

### [[user User @relation(fields: [userId], references: [id])]]

ده مش عمود. ده تعريف للعلاقة: «العمود [[userId]] عندي بيشاور على [[id]] في جدول User». Prisma بيطلّع منه:

~~~text من migration.sql
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
~~~

[[ON DELETE RESTRICT]] معناها القاعدة مش هتسيبك تمسح مستخدم ليه طلبات. وفي الكود بتقدر تكتب [[order.user.name]] بـ [[include]].

### [[@@index([userId, createdAt])]]

[[@@]] (اتنين) معناها attribute على الجدول كله، مش على عمود. ده index مركّب على العمودين بالترتيب ده، وبيخدم صفحة «طلباتي» ([[WHERE "userId" = ... ORDER BY "createdAt"]]). PostgreSQL مبيعملش index لوحده على الـ foreign key، عشان كده بتكتبه بإيدك:

~~~text من migration.sql
CREATE INDEX "Order_userId_createdAt_idx" ON "Order"("userId", "createdAt");
~~~

---

## ٣. التجربة: نعمل migration

جوه مشروع فيه [[prisma.config.ts]] (في Prisma 7 رابط القاعدة بيتقري منه، مش من الـ schema):

~~~powershell
npx prisma migrate dev --name init
~~~

~~~text الناتج
Applying migration $__bt20261008094445_init$__bt

The following migration(s) have been created and applied from new schema changes:

prisma\migrations/
  └─ 20261008094445_init/
    └─ migration.sql

Your database is now in sync with your schema.
~~~

- [[migrate dev]] بيقارن الـ schema بالقاعدة، ويكتب الفرق SQL في فولدر جديد اسمه التاريخ والوقت والاسم اللي اديته بـ [[--name]]، وينفّذه.
- الفولدر ده بيتعمله commit. هو التاريخ الحقيقي للقاعدة.

وفي الـ migration.sql لقينا السطر اللي الـ sol بيقول عليه:

~~~text
CREATE UNIQUE INDEX "Enrollment_userId_courseId_key" ON "Enrollment"("userId", "courseId");
~~~

ده جاي من [[@@unique([userId, courseId])]] في Enrollment (الـ solCode).

وبعدها فولدر [[src/generated/prisma]] **مكانش موجود**: في Prisma 7 الـ migrate مبقاش بيعمل generate. لازم:

~~~powershell
npx prisma generate
~~~

~~~text الناتج
✔ Generated Prisma Client (7.10.0) to .\src\generated\prisma in 68ms
~~~

---

## ٤. التجربة: نفس الاشتراك مرتين (الـ solCode)

[[src/dup.ts]] بيجيب أول طالب وأول كورس، ويعمل enrollment، وبعدين يحاول تاني جوه [[try]]:

- [[findFirstOrThrow]] زي [[findFirst]] بس بيرمي error لو ملقاش، فالـ type مبيبقاش [[null]].
- [[e instanceof Prisma.PrismaClientKnownRequestError]] بيتأكد إن ده خطأ Prisma معروف قبل ما نقرا [[e.code]]. أي خطأ تاني بيترمي تاني ([[else throw e]]).

~~~powershell
npx tsx src/dup.ts
~~~

~~~text الناتج
P2002
~~~

[[tsx]] بيشغّل ملف TypeScript على طول من غير build. و [[P2002]] كود Prisma لـ «unique اتكسر». ولما طبعنا [[e.meta]] لقينا تفاصيل القاعدة نفسها:

~~~text الناتج (مختصر)
cause: {
  originalCode: '23505',
  originalMessage: 'duplicate key value violates unique constraint "Enrollment_userId_courseId_key"',
  kind: 'UniqueConstraintViolation',
  table: 'Enrollment'
}
~~~

[[23505]] كود PostgreSQL للـ unique. والـ error handler (الدرس الجاي) بيحوّل [[P2002]] لـ 409.

---

## الخلاصة

| الحماية | في الـ schema | بتمنع إيه |
|---|---|---|
| enum | [[OrderStatus]] | حالة مش متوقعة |
| unique | [[@unique]] و [[@@unique]] | تكرار، حتى لو طلبين وصلوا في نفس اللحظة |
| foreign key | [[@relation]] | طلب لمستخدم مش موجود |
| index | [[@@index]] | بطء الصفحات اللي بتفلتر بعمود |
| cuid | [[@default(cuid())]] | تخمين الـ id اللي بعده |

الفلوس [[Int]] بالقرش، وبعد كل [[migrate dev]] في Prisma 7 اعمل [[prisma generate]].`,
          lines: [
            "حالات الطلب محددة، والقاعدة بترفض أي قيمة تانية.",
            "مستني الدفع.",
            "الدفع اتأكد من الـ webhook.",
            "الدفع فشل.",
            "الفلوس رجعت للطالب.",
            "قفلة.",
            "model الطلب. كل محاولة شراء بتتسجّل هنا، حتى اللي فشلت.",
            "id نصي عشوائي (cuid)، فمحدش يقدر يخمّن رقم الطلب اللي بعده.",
            "صاحب الطلب.",
            "الكورس.",
            "السعر وقت الشراء، بالقرش، كرقم صحيح. منسوخ من الكورس، مش مربوط بيه.",
            "العملة.",
            "كل طلب بيبدأ PENDING، والـ webhook بس هو اللي يحوّله PAID.",
            "رقم المعاملة عند البوابة، و unique عشان نفس الدفعة متتسجلش على طلبين.",
            "وقت الإنشاء.",
            "العلاقة بالمستخدم. ده foreign key حقيقي في القاعدة.",
            "العلاقة بالكورس.",
            "index لصفحة «طلباتي»: بتفلتر بالمستخدم وترتّب بالتاريخ.",
            "قفلة."
          ],
          sol: R`بعد [[npx prisma migrate dev --name init]] هتلاقي في [[migration.sql]] سطر زي [[CREATE UNIQUE INDEX "Enrollment_userId_courseId_key"]]. وفي Prisma 7 الـ migrate مبقاش بيعمل generate لوحده، فشغّل [[npx prisma generate]] بعدها، وإلا الكود هيشتغل على client قديم.

أول enrollment بيعدّي. التاني بيرمي [[PrismaClientKnownRequestError]] والـ [[code]] بتاعه [[P2002]]. في Prisma 7 مع الـ driver adapter، اسم الـ constraint مش في [[meta.target]] زي زمان، هتلاقيه جوه [[meta.driverAdapterError.cause]] ومعاه [[originalCode: '23505']] (كود PostgreSQL للـ unique) و [[table: 'Enrollment']]. عشان كده الـ error handler بيعتمد على [[err.code]] بس.

لو التاني عدّى من غير خطأ، يبقى نسيت [[@@unique([userId, courseId])]] أو معملتش migration بعد ما ضفته.`,
          solCode: R`enum Role {
  STUDENT
  INSTRUCTOR
  ADMIN
}

model User {
  id           String       @id @default(cuid())
  name         String
  email        String       @unique
  passwordHash String
  role         Role         @default(STUDENT)
  createdAt    DateTime     @default(now())
  teaching     Course[]
  enrollments  Enrollment[]
  orders       Order[]
}

model Course {
  id           String       @id @default(cuid())
  slug         String       @unique
  title        String
  priceCents   Int
  published    Boolean      @default(false)
  instructorId String
  instructor   User         @relation(fields: [instructorId], references: [id])
  enrollments  Enrollment[]
  orders       Order[]
}

model Enrollment {
  id        String   @id @default(cuid())
  userId    String
  courseId  String
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
  course    Course   @relation(fields: [courseId], references: [id])
  @@unique([userId, courseId])
  @@index([courseId])
}

// Order زي المثال بالظبط

// src/dup.ts: شغّله بـ npx tsx src/dup.ts
import { Prisma } from "./generated/prisma/client";
import { prisma } from "./db";

const s = await prisma.user.findFirstOrThrow({ where: { role: "STUDENT" } });
const c = await prisma.course.findFirstOrThrow();
await prisma.enrollment.create({ data: { userId: s.id, courseId: c.id } });
try {
  await prisma.enrollment.create({ data: { userId: s.id, courseId: c.id } });
} catch (e) {
  if (e instanceof Prisma.PrismaClientKnownRequestError) console.log(e.code); // P2002
  else throw e;
}`
        },
        {
          cmd: "قايمة الـ endpoints",
          title: "صمّم الـ API على الورق قبل ما تكتبها",
          desc: R`من كل story طلّع الـ endpoints بتاعتها: الـ method، والمسار، ومين مسموحله، وبيرجّع إيه. المسار بيبقى اسم جمع ([[courses]])، والفعل هو الـ method نفسه. القايمة دي هي العقد بين الواجهة والسيرفر، فتقدر تبني الاتنين في نفس الوقت.

تفاصيل REST و Express في تاب «Backend بـ Node». و GraphQL والـ versioning والـ OpenAPI في «APIs متقدمة».`,
          example: R`GET    /courses?q=&level=&cursor=    public   الكورسات المنشورة
GET    /courses/:slug                public   كورس ودروسه (الفيديو للمشتركين بس)
POST   /auth/signup                  public   حساب جديد
POST   /auth/login                   public   access token و refresh cookie
POST   /auth/refresh                 cookie   access token جديد
POST   /orders                       student  طلب جديد، وبيرجّع رابط الدفع
GET    /orders/:id                   owner    حالة الطلب للصفحة اللي بعد الدفع
POST   /webhooks/paymob              hmac     البوابة بتأكد الدفع
GET    /me/enrollments               student  كورساتي
POST   /admin/courses                admin    كورس جديد`,
          try: R`اعمل القايمة دي لمشروعك في [[docs/api.md]]. وبعدين عدّي على عمود «مين» سطر سطر، واسأل: لو حد مش مسموحله بعت الطلب ده، إيه اللي هيمنعه؟`,
          flag: "script",
          deep: {
            why: "لو صممت وانت بتكتب، الواجهة بتستنى الـ API، والـ API بتتغير كل شوية، وكل endpoint بيطلع بشكل مختلف. والأهم إن عمود «مين» هو جدول الصلاحيات بتاعك. لو مكتبتوش، هتنسى تحمي endpoint، وده أشهر ثغرة في أي API.",
            how: R`القواعد الأساسية بسيطة. المسار اسم جمع، والـ nesting مستوى واحد بس زي [[/courses/:slug/lessons]]. والـ status codes ليها معنى: 200 تمام، و 201 اتعمل، و 204 تمام ومفيش body، و 400 الداتا غلط، و 401 مش داخل، و 403 داخل بس مش مسموحلك، و 404 مش موجود، و 409 تعارض (زي «مشترك أصلًا»)، و 429 طلبات كتير.

الصفحات العامة بتستخدم [[slug]] بدل الـ id: [[/courses/react-basics]] أحسن للـ SEO وللمستخدم.

وكل حاجة تخص «أنا» بتبدأ بـ [[/me]]. [[GET /me/enrollments]] بياخد الـ userId من التوكن. لكن [[GET /users/:id/enrollments]] بياخده من الـ URL، واللي بيبعته هو العميل، يعني ممكن يبعت أي رقم.

الـ webhook ليه نوع حماية مختلف. مفيش مستخدم داخل، فالحماية بتبقى توقيع HMAC من البوابة. عشان كده مكتوب في العمود «hmac» مش «public».

ولما القايمة تكبر، حوّلها لملف OpenAPI. منه بيطلع توثيق تفاعلي، وتقدر تولّد منه types للواجهة. ده في تاب «APIs متقدمة».`,
            when: "قبل ما تبدأ أي ميزة، وتحدّثها لما تضيف endpoint. وخليها قدامك وانت بتكتب الواجهة.",
            mistakes: R`إنك تعمل [[GET /users/:id/orders]] وتاخد الـ id من الـ URL من غير ما تتأكد إنه نفس اليوزر اللي داخل. ده IDOR. أو تحط أفعال في المسار زي [[/createOrder]]. أو ترجّع 200 لكل حاجة ومعاها [[success: false]]، فالكاش والمراقبة والواجهة كلهم يتلخبطوا.`
          },
          teach: R`## جدول من ٤ أعمدة

المثال مش كود، ده الملف اللي بيتكتب في [[docs/api.md]] قبل أي كود. كل سطر endpoint واحد، وفيه ٤ أعمدة:

~~~text
GET    /courses/:slug    public   كورس ودروسه (الفيديو للمشتركين بس)
 1          2              3        4
~~~

| العمود | معناه |
|---|---|
| 1. الـ method | نوع الطلب: [[GET]] قراية، و [[POST]] إنشاء أو فعل |
| 2. المسار | اسم جمع ([[courses]])، و [[:slug]] جزء متغير |
| 3. مين | مين مسموحله، وده جدول الصلاحيات بتاعك |
| 4. بيرجّع إيه | الرد بالكلام |

---

## ١. العمود التاني: المسار

### [[GET /courses?q=&level=&cursor=]]

- [[/courses]] اسم جمع. الفعل هو الـ method، فمفيش [[/getCourses]].
- اللي بعد [[?]] اسمه query string: فلاتر اختيارية. [[q]] كلمة البحث، و [[level]] المستوى، و [[cursor]] علامة «كمّل من هنا» للصفحة الجاية (درس pagination).

### [[GET /courses/:slug]]

[[:slug]] معناها إن الجزء ده متغير، والسيرفر بيقراه من [[req.params.slug]]. الـ slug اسم مقروء زي [[react-basics]] بدل id عشوائي، وده أحسن للـ SEO وللي بيشارك اللينك.

### [[/auth/...]] و [[/me/...]] و [[/admin/...]] و [[/webhooks/...]]

البادئة نفسها بتقول حاجة:

| البادئة | معناها |
|---|---|
| [[/auth]] | الدخول والتسجيل والتجديد |
| [[/me]] | «أنا»: الـ userId جاي من التوكن، مش من الـ URL |
| [[/admin]] | كل اللي تحتها محتاج دور أدمن |
| [[/webhooks]] | سيرفر تاني بيكلّمنا (البوابة)، مش مستخدم |

---

## ٢. العمود التالت: «مين»

ده أهم عمود. كل قيمة فيه لازم تقابلها حاجة في الكود بتمنع اللي مش مسموحله:

| القيمة | معناها | اللي بيمنع في الكود |
|---|---|---|
| [[public]] | أي حد | مفيش، ودي مقصودة (بس محتاجة rate limit على login و signup) |
| [[cookie]] | الـ refresh cookie هي الإثبات | الـ session في القاعدة |
| [[student]] | أي حد داخل | [[requireAuth]] |
| [[owner]] | داخل **و** صاحب الحاجة دي | [[userId: req.user.id]] جوه الـ where |
| [[admin]] | دور أدمن | [[requireRole("ADMIN")]] |
| [[hmac]] | البوابة | التحقق من توقيع الطلب بسر مشترك |

الفرق بين [[student]] و [[owner]] هو أشهر ثغرة في APIs: IDOR (Insecure Direct Object Reference). خد [[GET /orders/:id]]: لو بتتأكد إنه داخل بس، أي طالب يغيّر الـ id في الـ URL ويقرا طلب غيره. عشان كده مكتوب [[owner]].

و [[GET /me/enrollments]] مكتوب [[student]] مش [[owner]] لأن الـ URL مفيهوش id أصلًا. السيرفر بياخده من التوكن، فمفيش حاجة يغيّرها.

---

## ٣. السطور كلها

| السطر | ملاحظة |
|---|---|
| [[GET /courses]] | المنشور بس، بفلاتر |
| [[GET /courses/:slug]] | روابط الفيديو مبتطلعش لغير المشترك |
| [[POST /auth/signup]] | حساب جديد، ويرجّع 201 |
| [[POST /auth/login]] | access token في الـ body، و refresh في cookie |
| [[POST /auth/refresh]] | الحماية هي الـ cookie |
| [[POST /orders]] | السيرفر بيحسب السعر، ويرجّع رابط الدفع |
| [[GET /orders/:id]] | لصاحبه بس، للصفحة اللي بعد الدفع |
| [[POST /webhooks/paymob]] | البوابة بتأكد الدفع، والحماية HMAC |
| [[GET /me/enrollments]] | كورساتي |
| [[POST /admin/courses]] | كورس جديد للأدمن |

---

## ٤. الـ status codes اللي هتستخدمها

| الكود | يعني | مثال من القايمة |
|---|---|---|
| 200 | تمام | [[GET /courses]] |
| 201 | اتعمل حاجة جديدة | [[POST /auth/signup]] |
| 204 | تمام ومفيش body | logout |
| 400 | الداتا غلط | إيميل مش إيميل |
| 401 | مش داخل | توكن ناقص أو خلص |
| 403 | داخل بس مش مسموحلك | طالب على [[/admin]] |
| 404 | مش موجود | slug غلط، أو طلب مش بتاعك |
| 409 | تعارض | مشترك أصلًا |
| 429 | طلبات كتير | login كتير ورا بعض |

---

## الخلاصة

- المسار اسم جمع، والفعل هو الـ method.
- عمود «مين» هو جدول الصلاحيات، وكل قيمة فيه لازم يقابلها سطر كود.
- [[owner]] غير [[student]]: اتأكد إن الحاجة بتاعته، مش بس إنه داخل.
- [[/me]] بياخد المستخدم من التوكن، فمبيتخترقش بتغيير الـ URL.
- القايمة دي هي العقد: الواجهة والـ API يتبنوا في نفس الوقت عليها.`,
          lines: [
            "القايمة العامة بفلاتر في الـ query string، وبترجع المنشور بس.",
            "تفاصيل كورس بالـ slug. الروابط الحقيقية للفيديوهات مبتطلعش هنا.",
            "تسجيل حساب جديد.",
            "الدخول. بيرجّع توكن قصير في الـ body، وتوكن طويل في cookie.",
            "تجديد التوكن. الحماية هنا هي الـ cookie نفسها، مش الـ header.",
            "إنشاء طلب. السيرفر بيحسب السعر وبيكلّم البوابة.",
            "حالة الطلب لصاحبه بس. الصفحة اللي بعد الدفع بتسأل هنا.",
            "البوابة بتكلّمنا. الحماية توقيع HMAC، مش مستخدم داخل.",
            "كورساتي. الـ userId جاي من التوكن مش من الـ URL.",
            "إنشاء كورس للأدمن بس."
          ],
          sol: R`الإجابة الصح لكل سطر بتبقى اسم حاجة في الكود، مش «هنتأكد». في قايمة myapp: [[public]] مفيش حاجة تمنع ودي مقصودة، بس [[GET /courses/:slug]] لازم يشيل رابط الفيديو لغير المشترك. و [[student]] بيمنعها [[requireAuth]]. و [[owner]] في [[GET /orders/:id]] مش بيمنعها الدور خالص: بيمنعها [[userId: req.user.id]] جوه الـ where (درس «ownership»). و [[hmac]] بيمنعها [[verifyPaymob]]. و [[admin]] بيمنعها [[requireRole("ADMIN")]].

أشهر حاجة هتكتشفها إن فيه endpoint عمود «مين» بتاعه [[student]] وهو في الحقيقة [[owner]]: أي طالب مسجل دخول يقدر يقرا طلب طالب تاني لو غيّر الـ id. دي اسمها IDOR، وهي أشهر ثغرة في APIs الحقيقية. وحاجة تانية: [[POST /auth/login]] و [[/auth/signup]] مكتوب قدامهم public، بس محتاجين rate limit، فاكتبه في نفس العمود.`
        },
        {
          cmd: "شكل الأخطاء",
          title: "رد واحد متوقع لأي خطأ",
          desc: R`اتفق من أول يوم على شكل واحد للخطأ: status code صح، وجسم فيه [[code]] ثابت للبرنامج و [[message]] للإنسان. الواجهة بتبني على [[code]]، تترجمه وتعرضه، ومبتبنيش على نص الرسالة. والكلام ده كله بيتعمل في error handler واحد في آخر Express، مش في كل route.`,
          example: R`import { ZodError } from "zod";

export class AppError extends Error {
  constructor(status, code, message) { super(message); this.status = status; this.code = code; }
}

export function errorHandler(err, req, res, next) {
  if (err instanceof ZodError) {
    return res.status(400).json({ error: { code: "VALIDATION", message: "البيانات مش مظبوطة", details: err.issues } });
  }
  if (err.code === "P2002") return res.status(409).json({ error: { code: "CONFLICT", message: "موجود قبل كده" } });
  if (err.code === "P2025") return res.status(404).json({ error: { code: "NOT_FOUND", message: "مش موجود" } });
  if (err.type === "entity.too.large" || err.type === "entity.parse.failed") return res.status(err.status).json({ error: { code: err.status === 413 ? "TOO_LARGE" : "BAD_JSON", message: "الطلب مش مظبوط" } });
  if (err instanceof AppError) return res.status(err.status).json({ error: { code: err.code, message: err.message } });
  (req.log ?? console).error(err);
  res.status(500).json({ error: { code: "INTERNAL", message: "حصلت مشكلة، جرّب تاني" } });
}`,
          try: R`اعمل route بيعمل [[throw new AppError(403, "FORBIDDEN", "مش مسموحلك")]]، وroute تاني بيعمل [[throw new Error("boom")]]. اطلبهم بـ curl، ولاحظ إن التاني بيرجّع 500 برسالة عامة، و "boom" بتظهر في اللوج بس.`,
          flag: "script",
          deep: {
            why: "من غير شكل موحد، كل route بيرجّع الخطأ بطريقة، والواجهة بتبقى مليانة if وelse عشان تفهم الرد. والأخطر إن رسايل الأخطاء الحقيقية بتطلع للمستخدم، وممكن يبقى فيها SQL أو مسارات ملفات.",
            how: R`Express بيعرف الـ error handler من عدد الـ parameters: لازم ٤ ([[err, req, res, next]]). ولازم يتسجّل بعد كل الـ routes. وفي Express 5، أي async handler بيرمي error أو بيرجّع promise بترفض، الـ error بيوصل هنا لوحده. في Express 4 كنت محتاج try/catch أو مكتبة.

الفكرة إن الـ services بترمي [[AppError]] بمعنى واضح ([[NOT_ENROLLED]] أو [[ALREADY_PAID]])، ومتعرفش حاجة عن HTTP. والـ handler هو اللي بيحوّل. والأخطاء المعروفة من المكتبات بتتحوّل هي كمان: Zod لـ 400، و Prisma [[P2002]] (unique) لـ 409، و [[P2025]] (مش موجود) لـ 404.

أي حاجة مش معروفة تبقى 500 برسالة عامة، والتفاصيل تروح اللوج و Sentry مع request id. متبعتش [[err.message]] للمستخدم أبدًا.

وفيه standard اسمه RFC 9457 (problem+json) بحقول زي type و title و status و detail. لو بتبني API عامة لناس تانية، استخدمه. أما لتطبيقك، الشكل البسيط اللي في المثال كفاية، المهم تلتزم بيه.

وفي الواجهة، الـ [[code]] بيبقى مفتاح ترجمة: [[errors.CONFLICT]] في ملف ar و ملف en.`,
            when: "مع أول route في المشروع. لو أضفته بعد ٣٠ route، هتلاقي ٣٠ شكل مختلف للأخطاء.",
            mistakes: "إنك ترجّع err.message أو الـ stack في الإنتاج. أو تنسى الـ parameter الرابع فـ Express يعتبره middleware عادي. أو تبني الواجهة على نص الرسالة، فأول ما تترجمها كل حاجة تبوظ. وفي مشروع حقيقي، endpoint الـ health كان بيرجّع رسالة خطأ القاعدة زي ما هي، فأي حد يعرف نوع القاعدة وسبب الوقعة."
          },
          teach: R`## ملف واحد بيقرر شكل كل خطأ

المثال ملف [[lib/errors.js]] فيه حاجتين: class اسمه [[AppError]] ترميه لما تعرف الخطأ، و [[errorHandler]] بيستلم أي خطأ في التطبيق ويحوّله رد JSON بشكل واحد. جرّبناه بـ Express 5.2 و Zod 4.6 على Node 24 (ويندوز 11)، والطلبات بـ curl من Git Bash على بورت 6017 بدل 4000.

---

## ١. [[import { ZodError } from "zod";]]

بنجيب الـ class بتاع أخطاء Zod عشان نعرفها بـ [[instanceof]] تحت. لما [[schema.parse(...)]] يفشل، Zod بيرمي object من النوع ده.

---

## ٢. [[class AppError extends Error]]

~~~text
export class AppError extends Error {
  constructor(status, code, message) { super(message); this.status = status; this.code = code; }
}
~~~

- [[extends Error]] يعني [[AppError]] نوع من [[Error]]: فيه [[message]] و [[stack]] زيه.
- [[constructor(status, code, message)]] الدالة اللي بتشتغل مع [[new AppError(403, "FORBIDDEN", "مش مسموحلك")]].
- [[super(message)]] بينادي constructor بتاع [[Error]] الأصلي عشان يحط الرسالة ويسجّل الـ stack. لازم قبل أي [[this]].
- [[this.status]] و [[this.code]] بنحفظهم على الـ object عشان الـ handler يقراهم.

الفكرة: الـ service ترمي [[new AppError(409, "ALREADY_ENROLLED", ...)]] من غير ما تعرف حاجة عن [[res]].

---

## ٣. [[function errorHandler(err, req, res, next)]]

Express بيعرف إن الدالة دي للأخطاء من **عددها**: ٤ parameters بالظبط. [[next]] مش مستخدمة جوه، بس لو شلتها الدالة بقت ٣، و Express يعتبرها middleware عادي ومش هيبعتلها الأخطاء. جرّبنا نشيلها: طلب [[/forbidden]] رجع صفحة HTML من Express نفسه:

~~~text الناتج
HTTP/1.1 403 Forbidden
Content-Security-Policy: default-src 'none'

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
~~~

الدالة بتمشي على الأخطاء من الأخص للأعم، وأول واحد يطابق بيرد بـ [[return]] فالباقي ميشتغلش.

---

## ٤. أخطاء Zod: 400 VALIDATION

~~~text
if (err instanceof ZodError) {
  return res.status(400).json({ error: { code: "VALIDATION", message: "البيانات مش مظبوطة", details: err.issues } });
}
~~~

[[err.issues]] array فيها كل حقل غلط، والواجهة بتعرض كل رسالة جنب الحقل بتاعها. جرّبنا route بيعمل [[z.object({ email: z.email() }).parse(req.body)]] وبعتنا [[{"email":"x"}]]:

~~~text الناتج (مختصر)
HTTP/1.1 400 Bad Request

{"error":{"code":"VALIDATION","message":"البيانات مش مظبوطة","details":[{"origin":"string","code":"invalid_format","format":"email","pattern":"...","path":["email"],"message":"Invalid email address"}]}}
~~~

[[path: ["email"]]] بيقول أنهي حقل.

---

## ٥. أخطاء Prisma: [[P2002]] و [[P2025]]

~~~text
if (err.code === "P2002") return res.status(409).json(...CONFLICT...);
if (err.code === "P2025") return res.status(404).json(...NOT_FOUND...);
~~~

| الكود | معناه في Prisma | الرد |
|---|---|---|
| [[P2002]] | unique اتكسر (إيميل متسجّل، اشتراك مكرر) | 409 CONFLICT |
| [[P2025]] | السجل اللي بتعدّله أو بتمسحه مش موجود ([[update]]، [[delete]]، [[findUniqueOrThrow]]) | 404 NOT_FOUND |

بنقارن بـ [[err.code]] بس، لأن في Prisma 7 مع الـ driver adapter تفاصيل الـ constraint بقت في مكان تاني (درس schema.prisma). رمينا error فيه [[code: "P2002"]]:

~~~text الناتج
HTTP/1.1 409 Conflict

{"error":{"code":"CONFLICT","message":"موجود قبل كده"}}
~~~

---

## ٦. أخطاء [[express.json()]] نفسه

~~~text
if (err.type === "entity.too.large" || err.type === "entity.parse.failed") return res.status(err.status).json(...);
~~~

[[express.json()]] بيرمي أخطاء ليها [[type]] و [[status]] جاهزين:

- [[entity.parse.failed]] (status 400): الـ body مش JSON سليم.
- [[entity.too.large]] (status 413): أكبر من الحد، وافتراضيًا 100kb.

والـ [[? :]] (ternary) بيختار الكود: لو 413 يبقى [[TOO_LARGE]]، غير كده [[BAD_JSON]].

~~~bash
curl -si -X POST -H "Content-Type: application/json" -d '{bad' localhost:6017/zod
~~~

~~~text الناتج
HTTP/1.1 400 Bad Request

{"error":{"code":"BAD_JSON","message":"الطلب مش مظبوط"}}
~~~

وبعتنا ملف JSON حجمه حوالي ٢٠٠ كيلو:

~~~text الناتج
HTTP/1.1 413 Payload Too Large
{"error":{"code":"TOO_LARGE","message":"الطلب مش مظبوط"}}
~~~

من غير السطر ده الاتنين كانوا هيوصلوا للآخر ويرجعوا 500، مع إنهم غلطة العميل.

---

## ٧. أخطاؤنا: [[err instanceof AppError]]

بيرد بالـ status والـ code والرسالة اللي اترمى بيهم. ودي الرسالة الوحيدة اللي بتوصل للمستخدم زي ما هي، لأننا اللي كاتبينها.

~~~bash
curl -i localhost:6017/forbidden
~~~

~~~text الناتج
HTTP/1.1 403 Forbidden
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 62

{"error":{"code":"FORBIDDEN","message":"مش مسموحلك"}}
~~~

[[Content-Length: 62]] بالـ bytes مش بالحروف: كل حرف عربي في UTF-8 بيتحسب ٢ byte.

---

## ٨. أي حاجة تانية: 500 من غير تفاصيل

~~~text
(req.log ?? console).error(err);
res.status(500).json({ error: { code: "INTERNAL", message: "حصلت مشكلة، جرّب تاني" } });
~~~

- [[??]] (nullish coalescing): لو [[req.log]] مش موجود ([[undefined]])، استخدم [[console]]. [[req.log]] بيتحط لو عندك pino-http (درس structured logs).
- التفاصيل كاملة في اللوج، والمستخدم ياخد رسالة عامة.

~~~bash
curl -i localhost:6017/boom
~~~

~~~text الناتج
HTTP/1.1 500 Internal Server Error

{"error":{"code":"INTERNAL","message":"حصلت مشكلة، جرّب تاني"}}
~~~

~~~text ترمنال السيرفر
Error: boom
    at file:///.../e/server.js:8:32
    at Layer.handleRequest (...\node_modules\router\lib\layer.js:152:17)
    ...
~~~

ونفس الرد بالظبط من [[/async-boom]] (دالة [[async]] بترمي): Express 5 بيمسك الـ promise المرفوضة لوحده.

---

## ٩. حاجة الكود ده مش بيغطيها

طلب لمسار مش موجود خالص مبيوصلش للـ handler، لأنه مش error. Express بيرد بنفسه:

~~~text الناتج
HTTP/1.1 404 Not Found
Content-Type: text/html; charset=utf-8

<!DOCTYPE html>
~~~

عشان يبقى JSON زي الباقي، حط قبل [[app.use(errorHandler)]] سطر زي [[app.use((req, res) => res.status(404).json({ error: { code: "NOT_FOUND", message: "مش موجود" } }))]].

---

## الخلاصة

| الخطأ | الـ status | الـ code |
|---|---|---|
| ZodError | 400 | VALIDATION ومعاه details |
| Prisma P2002 | 409 | CONFLICT |
| Prisma P2025 | 404 | NOT_FOUND |
| JSON بايظ / كبير | 400 / 413 | BAD_JSON / TOO_LARGE |
| AppError | اللي اترمى بيه | اللي اترمى بيه |
| أي حاجة تانية | 500 | INTERNAL، والتفاصيل في اللوج بس |

الـ handler بـ ٤ parameters، ومتسجّل بعد كل الـ routes، و [[err.message]] بتاع الأخطاء المجهولة عمره ما يطلع للمستخدم.`,
          lines: [
            "نوع أخطاء Zod عشان نعرفها.",
            "خطأ خاص بالتطبيق، فيه status و code.",
            "بياخد الـ status والـ code والرسالة ويحفظهم.",
            "قفلة.",
            "الـ error handler. الـ ٤ parameters هي اللي بتعرّف Express إنه للأخطاء.",
            "لو الـ validation فشل...",
            "...رد 400، ومعاه كل مشكلة في حقل (issues) عشان الفورم يعرضها.",
            "قفلة.",
            "Prisma P2002 معناها unique اتكسر، زي إيميل متسجّل قبل كده. نرد 409.",
            "Prisma P2025 معناها السجل مش موجود. نرد 404.",
            "أخطاء express.json() نفسه: body أكبر من الـ limit (413) أو JSON بايظ (400). من غير السطر ده الاتنين بيطلعوا 500.",
            "أخطاؤنا المعروفة بتطلع بالـ status والـ code بتوعها.",
            "أي حاجة تانية تروح اللوج بالتفاصيل كاملة (لوجر الطلب لو فيه pino-http، وإلا console)...",
            "...والمستخدم ياخد 500 برسالة عامة من غير أي تفاصيل داخلية.",
            "قفلة."
          ],
          sol: R`الأول يرجّع [[HTTP/1.1 403 Forbidden]] وجسمه [[{"error":{"code":"FORBIDDEN","message":"مش مسموحلك"}}]]. التاني يرجّع [[500]] وجسمه [[{"error":{"code":"INTERNAL","message":"حصلت مشكلة، جرّب تاني"}}]]، وفي ترمنال السيرفر هتلاقي [[Error: boom]] ومعاها الـ stack والملف والسطر. ولو عملت route [[async]] بيرمي، في Express 5 النتيجة نفس الـ 500 بالظبط من غير try/catch.

لو شفت صفحة HTML فيها [[Error: boom]] بدل JSON، يبقى الـ errorHandler مش متسجّل، أو متسجّل قبل الـ routes، أو ناقصه الـ parameter الرابع [[next]]. ولو شفت [[{"error":{"code":"INTERNAL","message":"boom"}}]]، يبقى انت بترجّع [[err.message]] للمستخدم، ودي بالظبط اللي الدرس بيحذّر منها. وجرّب كمان [[curl -d "{bad" -H "Content-Type: application/json"]]: لازم يرجع 400 [[BAD_JSON]] مش 500.`,
          solCode: R`import express from "express";
import { AppError, errorHandler } from "./lib/errors.js";

const app = express();
app.use(express.json());
app.get("/forbidden", () => { throw new AppError(403, "FORBIDDEN", "مش مسموحلك"); });
app.get("/boom", () => { throw new Error("boom"); });
app.get("/async-boom", async () => { throw new Error("async boom"); });
app.use(errorHandler);
app.listen(4000);

// في ترمنال تاني:
// curl -i localhost:4000/forbidden
// curl -i localhost:4000/boom
// curl -i localhost:4000/async-boom`
        }
      ]
    }
]);
